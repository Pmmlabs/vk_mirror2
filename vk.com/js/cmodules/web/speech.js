! function(t) {
    function e(i) {
        if (n[i]) return n[i].exports;
        var r = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports
    }
    var n = {};
    return e.m = t, e.c = n, e.d = function(t, n, i) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: i
        })
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t["default"]
        } : function() {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 56)
}({
    119: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function r(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function o(t, e) {
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
        n.r(e), n.d(e, "OpusRecorder", function() {
            return a
        });
        var s = n(16),
            a = function(t) {
                function e() {
                    return i(this, e), r(this, t.apply(this, arguments))
                }
                return o(e, t), e.prototype._createWorker = function(t) {
                    var e = this,
                        n = {
                            command: "init",
                            numberOfChannels: 1,
                            originalSampleRate: this._ctx.sampleRate,
                            encoderSampleRate: this._options.bitsPerSecond,
                            maxBuffersPerPage: 10,
                            encoderApplication: 2048
                        },
                        i = new Worker("/js/" + jsc("web/speech_worker_opus.js"));
                    return i.addEventListener("message", function(t) {
                        e.eventTarget.dispatchEvent(new CustomEvent("dataavailable", {
                            detail: t.data
                        })), 4 & t.data[5] && e.eventTarget.dispatchEvent(new Event("stop"))
                    }), i.postMessage(n), i
                }, e
            }(s.BaseRecorder)
    },
    12: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        n.r(e), n.d(e, "PeakAlgorithm", function() {
            return r
        });
        var r = function() {
            function t() {
                i(this, t), this.clear()
            }
            return t.prototype.push = function(t) {
                this._max = Math.max(this._max, Math.abs(t))
            }, t.prototype.get = function() {
                return this._max
            }, t.prototype.clear = function() {
                this._max = 0
            }, t
        }()
    },
    123: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        n.r(e), n.d(e, "QuadAlgorithm", function() {
            return r
        });
        var r = function() {
            function t() {
                i(this, t), this.clear()
            }
            return t.prototype.push = function(t) {
                this._count++, this._accum += t, this._accum_q += t * t
            }, t.prototype.get = function() {
                return 1 == this._count ? this._accum : Math.sqrt((this._accum_q - this._accum * this._accum / this._count) / this._count)
            }, t.prototype.clear = function() {
                this._count = 0, this._accum = 0, this._accum_q = 0
            }, t
        }()
    },
    16: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        if (n.r(e), n.d(e, "BaseRecorder", function() {
                return s
            }), "function" != typeof window.CustomEvent) {
            var r = function(t, e) {
                e = e || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var n = document.createEvent("CustomEvent");
                return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
            };
            r.prototype = window.Event.prototype, window.CustomEvent = r
        }
        var o = 4096,
            s = function() {
                function t(e, n) {
                    var r = this;
                    i(this, t), this._ctx = new AudioContext, this.eventTarget = document.createDocumentFragment(), this._options = n, this._stream = e, this._worker = null;
                    var s = this._ctx.createMediaStreamSource(e),
                        a = s.context.createScriptProcessor(o, 1, 1);
                    a.addEventListener("audioprocess", function(t) {
                        if (r._worker) {
                            for (var e = [], n = 0; n < t.inputBuffer.numberOfChannels; n++) e[n] = t.inputBuffer.getChannelData(n);
                            r._worker.postMessage({
                                command: "encode",
                                buffers: e
                            })
                        }
                    }), s.connect(a), a.connect(s.context.destination), this.node = a
                }
                return t.prototype.addEventListener = function(t, e, n) {
                    this.eventTarget.addEventListener(t, e, n)
                }, t.prototype.removeEventListener = function(t, e, n) {
                    this.eventTarget.removeEventListener(t, e, n)
                }, t.prototype._createWorker = function() {
                    return !1
                }, t.prototype.start = function(t) {
                    this._worker = this._createWorker(t), this.eventTarget.dispatchEvent(new Event("start"))
                }, t.prototype.stop = function() {
                    this._worker.postMessage({
                        command: "done"
                    })
                }, t
            }()
    },
    172: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        n.r(e), n.d(e, "AverageAlgorithm", function() {
            return r
        });
        var r = function() {
            function t() {
                i(this, t), this.clear()
            }
            return t.prototype.push = function(t) {
                this._count++, this._accum += t
            }, t.prototype.get = function() {
                return this._accum / this._count
            }, t.prototype.clear = function() {
                this._count = 0, this._accum = 0
            }, t
        }()
    },
    197: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function r(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "peak";
            return new u({
                srcSampleRate: t.length,
                dstSampleRate: e,
                normalizeAlgorithm: n,
                truncateTo: 0
            }).push(t)
        }
        n.r(e), n.d(e, "Resampler", function() {
            return u
        }), n.d(e, "fastResample", function() {
            return r
        });
        var o = n(172),
            s = n(12),
            a = n(123),
            c = {
                avg: o.AverageAlgorithm,
                peak: s.PeakAlgorithm,
                quad: a.QuadAlgorithm
            },
            u = function() {
                function t(e) {
                    i(this, t), this._normalizeAlgorithm = !1, c[e.normalizeAlgorithm] && (this._normalizeAlgorithm = new c[e.normalizeAlgorithm]), this._srcSampleRate = parseInt(e.srcSampleRate || 0), this._dstSampleRate = parseInt(e.dstSampleRate || 0), this._truncateTo = 1, "undefined" != typeof e.truncateTo && (this._truncateTo = e.truncateTo), this._dstSampleRate > 0 ? this._sampleRate = this._srcSampleRate / this._dstSampleRate : this._sampleRate = 0, c[e.algorithm] || (e.algorithm = "peak"), this._algorithm = new c[e.algorithm], this._sampleCount = 0, this._data = []
                }
                return t.prototype.push = function(t) {
                    if (this._sampleRate <= 0) return [];
                    for (var e = [], n = void 0, i = 0; i < t.length; i++)
                        if (this._truncateTo > 0 && (t[i] = Math.min(this._truncateTo, Math.abs(t[i]))), this._sampleCount += 1, this._sampleCount >= this._sampleRate)
                            for (; this._sampleCount >= this._sampleRate;) this._sampleCount -= this._sampleRate, this._sampleCount <= .8 && this._algorithm.push(t[i]), n = this._algorithm.get(), e.push(n), this._normalizeAlgorithm && this._normalizeAlgorithm.push(n), this._algorithm.clear(), this._sampleCount > .2 && this._algorithm.push(t[i]);
                        else this._algorithm.push(t[i]);
                    if (this._normalizeAlgorithm) {
                        var r = this._normalizeAlgorithm.get();
                        if (this._normalizeAlgorithm.clear(), r > 0)
                            for (var o = 0; o < e.length; o++) e[o] = e[o] / r, this._truncateTo > 0 && (e[o] = Math.min(this._truncateTo, Math.abs(e[o])))
                    }
                    return e
                }, t
            }()
    },
    222: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        n.r(e), n.d(e, "Wave", function() {
            return s
        });
        var r = n(48),
            o = {
                blockWidth: 2,
                spacing: 1,
                visTime: 8,
                color: "#fff"
            },
            s = function() {
                function t(e, n, o) {
                    i(this, t), this._accum = 0, this._source = e, this._canvas = n;
                    var s = n.getBoundingClientRect();
                    n.width = s.right - s.left, n.height = s.bottom - s.top, this._width = n.width, this._height = n.height, this._ratio = Object(r.canvasGetRatio)(n), this._ctx = n.getContext("2d"), this._options = o || {}, this._accumNode = this._createWaveNode(e)
                }
                return t.prototype._getOption = function(t) {
                    return this._options[t] || o[t]
                }, t.prototype._createWaveNode = function(t) {
                    var e = this,
                        n = parseInt(this._width / (this._getOption("blockWidth") + this._getOption("spacing"))),
                        i = this._getOption("visTime") / n,
                        r = 0,
                        o = t.context.createScriptProcessor(2048, 1, 1);
                    return o.onaudioprocess = function(t) {
                        for (var n = t.inputBuffer.getChannelData(0), o = t.inputBuffer.duration / n.length, s = 0; s < n.length; s++) r += o, e._accum = Math.min(1, Math.max(e._accum, Math.abs(n[s]))), r > i && (++e.timeAccumIndex > e.timeAccumItems.length - 1 && (e.timeAccumIndex = 0), e.timeAccumItems[e.timeAccumIndex] = e._accum, e._accum = 0, r = 0)
                    }, this.timeAccumItems = new Array(n), this.timeAccumIndex = 0, t.connect(o), o.connect(t.context.destination), o
                }, t.prototype.destroy = function() {
                    this.stop(), this._accumNode.disconnect(), this._source.connect(this._source.context.destination), this._node = null, this._canvas = null, this._source = null, this._ctx = null
                }, t.prototype.start = function() {
                    this._stopped = !1, this._draw()
                }, t.prototype._draw = function() {
                    var t = this;
                    if (!this._stopped) {
                        var e = this.timeAccumIndex + 1,
                            n = 0,
                            i = void 0,
                            r = void 0;
                        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._ctx.fillStyle = this._getOption("color");
                        for (var o = 0; o < this.timeAccumItems.length; o++, e++) e >= this.timeAccumItems.length && (e = 0), n = this.timeAccumItems[e] * (this._height - 2) + 2, i = o * (this._getOption("blockWidth") + this._getOption("spacing")), r = (this._height - n) / 2, this._ctx.fillRect(i * this._ratio, r * this._ratio, this._getOption("blockWidth") * this._ratio, n * this._ratio);
                        window.requestAnimationFrame(function() {
                            t._draw()
                        })
                    }
                }, t.prototype.stop = function() {
                    this._stopped = !0
                }, t
            }()
    },
    223: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        n.r(e), n.d(e, "Pulse", function() {
            return o
        });
        var r = {
                pulseRate: 20
            },
            o = function() {
                function t(e, n, r) {
                    i(this, t), this._accum = 0, this._source = e, this._options = r || {}, this._node = this._createWaveNode(e)
                }
                return t.prototype._getOption = function(t) {
                    return this._options[t] || r[t]
                }, t.prototype._createWaveNode = function(t) {
                    var e = this,
                        n = 1 / this._getOption("pulseRate"),
                        i = 0,
                        r = t.context.createScriptProcessor(2048, 1, 1);
                    return r.onaudioprocess = function(t) {
                        for (var r = t.inputBuffer.getChannelData(0), o = t.inputBuffer.duration / r.length, s = 0; s < r.length; s++) i += o, e._accum = Math.min(1, Math.max(e._accum, Math.abs(r[s]))), i > n && (i -= n, e._stopped ? setStyle(e._getOption("el"), {
                            transform: "scale(0.8)"
                        }) : setStyle(e._getOption("el"), {
                            transform: "scale(" + (.8 + .95 * Math.sqrt(e._accum)) + ")"
                        }), e._accum = 0, i = 0)
                    }, t.connect(r), r.connect(t.context.destination), r
                }, t.prototype.destroy = function() {
                    this.stop(), this._source.disconnect(), this._node.disconnect(), this._node = null
                }, t.prototype.start = function() {
                    this._stopped = !1
                }, t.prototype.stop = function() {
                    this._stopped = !0
                }, t
            }()
    },
    224: function(t, e, n) {
        "use strict";

        function i() {
            var t = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.MediaDevices && window.MediaDevices.getUserMedia,
                e = function(e) {
                    return new Promise(function(n, i) {
                        t ? t.call(navigator, e, n, i) : i(new Error("NotSupported"))
                    })
                },
                n = function() {
                    return new Promise(function(t, e) {
                        if (MediaStreamTrack && MediaStreamTrack.getSources) {
                            var n = {
                                audio: "audioinput",
                                video: "videoinput"
                            };
                            return MediaStreamTrack.getSources(function(e) {
                                t(e.map(function(t) {
                                    return {
                                        label: t.label,
                                        kind: n[t.kind],
                                        deviceId: t.id,
                                        groupId: ""
                                    }
                                }))
                            })
                        }
                        e(new Error("NotSupported"))
                    })
                };
            t && !navigator.mediaDevices && (navigator.mediaDevices = navigator.mediaDevices || {}), navigator.mediaDevices && (navigator.mediaDevices.getUserMedia || (navigator.mediaDevices.getUserMedia = e), navigator.mediaDevices.enumerateDevices || (navigator.mediaDevices.enumerateDevices = n)), window.AudioContext = window.AudioContext || window.webkitAudioContext, window.AudioContext && (window.AudioContext.prototype.createScriptProcessor = window.AudioContext.prototype.createScriptProcessor || window.AudioContext.prototype.createJavaScriptNode)
        }
        n.r(e), n.d(e, "initFailBack", function() {
            return i
        })
    },
    237: function(t, e) {},
    24: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        n.r(e), n.d(e, "Frequency", function() {
            return o
        });
        var r = {
                blockWidth: 3,
                spacing: 2,
                color: "#6287AE"
            },
            o = function() {
                function t(e, n, r) {
                    i(this, t), this._source = e, this._canvas = n, this._ctx = n.getContext("2d"), this._options = r || {}, this._node = this._createNode(e)
                }
                return t.prototype._getOption = function(t) {
                    return this._options[t] || r[t]
                }, t.prototype._createNode = function(t) {
                    var e = t.context.createAnalyser();
                    return e.fftSize = 1024, t.connect(e), e
                }, t.prototype.destroy = function() {
                    this.stop(), this._source.disconnect(), this._node.disconnect(), this._node = null
                }, t.prototype.start = function() {
                    this._stopped = !1, this._draw()
                }, t.prototype._draw = function() {
                    var t = this,
                        e = this._getOption("spacing"),
                        n = this._getOption("blockWidth"),
                        i = this._canvas.getBoundingClientRect(),
                        r = i.right - i.left,
                        o = i.bottom - i.top,
                        s = Math.round(r / e),
                        a = new Uint8Array(this._node.frequencyBinCount);
                    this._node.getByteFrequencyData(a), this._ctx.clearRect(0, 0, r, o), this._ctx.fillStyle = "#F6D565", this._ctx.lineCap = "round";
                    var c = this._node.frequencyBinCount / s,
                        u = this._getOption("color");
                    "HSL" !== u && (this._ctx.fillStyle = u);
                    for (var h = 0; s > h; ++h) {
                        for (var p = 0, f = Math.floor(h * c), l = 0; c > l; l++) p += a[f + l] / 256;
                        p /= Math.ceil(c), "HSL" == u && (this._ctx.fillStyle = "hsl( " + Math.round(360 * h / s) + ", " + (50 + 50 * p) + "%, 50%)"), this._ctx.fillRect(h * (e + n), o, n, -p * o)
                    }
                    this._stopped || window.requestAnimationFrame(function() {
                        t._draw()
                    })
                }, t.prototype.stop = function() {
                    this._stopped = !0
                }, t
            }()
    },
    245: function(t, e, n) {
        "use strict";
        n.r(e);
        var i = n(322),
            r = n(328),
            o = n(197),
            s = n(316),
            a = i.Promise,
            c = {
                isSupport: function() {
                    return !(!window.AudioContext || !(navigator.getUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia))
                },
                getAvailableMicrophones: function() {
                    return r.AudioRecorder.isSupport() ? r.AudioRecorder.getAvailableMicrophones() : a.resolve([])
                },
                newRecorder: function() {
                    return window.Promise || (window.Promise = a), new r.AudioRecorder
                },
                resample: function(t, e, n) {
                    return Object(o.fastResample)(t, e, n)
                },
                createVisualization: s.createVisualization
            };
        window.Speech = c;
        try {
            stManager.done("speech.js")
        } catch (u) {}
    },
    281: function(t, e) {
        function n() {
            throw new Error("setTimeout has not been defined")
        }

        function i() {
            throw new Error("clearTimeout has not been defined")
        }

        function r(t) {
            if (h === setTimeout) return setTimeout(t, 0);
            if ((h === n || !h) && setTimeout) return h = setTimeout, setTimeout(t, 0);
            try {
                return h(t, 0)
            } catch (e) {
                try {
                    return h.call(null, t, 0)
                } catch (e) {
                    return h.call(this, t, 0)
                }
            }
        }

        function o(t) {
            if (p === clearTimeout) return clearTimeout(t);
            if ((p === i || !p) && clearTimeout) return p = clearTimeout, clearTimeout(t);
            try {
                return p(t)
            } catch (e) {
                try {
                    return p.call(null, t)
                } catch (e) {
                    return p.call(this, t)
                }
            }
        }

        function s() {
            m && l && (m = !1, l.length ? d = l.concat(d) : _ = -1, d.length && a())
        }

        function a() {
            if (!m) {
                var t = r(s);
                m = !0;
                for (var e = d.length; e;) {
                    for (l = d, d = []; ++_ < e;) l && l[_].run();
                    _ = -1, e = d.length
                }
                l = null, m = !1, o(t)
            }
        }

        function c(t, e) {
            this.fun = t, this.array = e
        }

        function u() {}
        var h, p, f = t.exports = {};
        ! function() {
            try {
                h = "function" == typeof setTimeout ? setTimeout : n
            } catch (t) {
                h = n
            }
            try {
                p = "function" == typeof clearTimeout ? clearTimeout : i
            } catch (t) {
                p = i
            }
        }();
        var l, d = [],
            m = !1,
            _ = -1;
        f.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            d.push(new c(t, e)), 1 !== d.length || m || r(a)
        }, c.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {}, f.on = u, f.addListener = u, f.once = u, f.off = u, f.removeListener = u, f.removeAllListeners = u, f.emit = u, f.prependListener = u, f.prependOnceListener = u, f.listeners = function(t) {
            return []
        }, f.binding = function(t) {
            throw new Error("process.binding is not supported")
        }, f.cwd = function() {
            return "/"
        }, f.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }, f.umask = function() {
            return 0
        }
    },
    316: function(t, e, n) {
        "use strict";

        function i(t, e, n, i) {
            if (c[t]) {
                if (e instanceof HTMLMediaElement) {
                    var r = new AudioContext;
                    e = r.createMediaElementSource(e), e.connect(r.destination)
                }
                return new c[t](e, n, i)
            }
        }
        n.r(e), n.d(e, "createVisualization", function() {
            return i
        });
        var r = n(222),
            o = n(24),
            s = n(60),
            a = n(223),
            c = {
                wave: r.Wave,
                frequency: o.Frequency,
                time: s.Time,
                pulse: a.Pulse
            }
    },
    322: function(t, e, n) {
        (function(i, r) {
            var o;
            (function() {
                "use strict";

                function s(t) {
                    return "function" == typeof t || "object" == typeof t && null !== t
                }

                function a(t) {
                    return "function" == typeof t
                }

                function c(t) {
                    Y = t
                }

                function u(t) {
                    X = t
                }

                function h() {
                    return function() {
                        i.nextTick(m)
                    }
                }

                function p() {
                    return function() {
                        V(m)
                    }
                }

                function f() {
                    var t = 0,
                        e = new tt(m),
                        n = document.createTextNode("");
                    return e.observe(n, {
                            characterData: !0
                        }),
                        function() {
                            n.data = t = ++t % 2
                        }
                }

                function l() {
                    var t = new MessageChannel;
                    return t.port1.onmessage = m,
                        function() {
                            t.port2.postMessage(0)
                        }
                }

                function d() {
                    return function() {
                        setTimeout(m, 1)
                    }
                }

                function m() {
                    for (var t = 0; K > t; t += 2) {
                        var e = it[t],
                            n = it[t + 1];
                        e(n), it[t] = void 0, it[t + 1] = void 0
                    }
                    K = 0
                }

                function _() {
                    try {
                        var t = n(237);
                        return V = t.runOnLoop || t.runOnContext, p()
                    } catch (e) {
                        return d()
                    }
                }

                function v(t, e) {
                    var n = this,
                        i = n._state;
                    if (i === at && !t || i === ct && !e) return this;
                    var r = new this.constructor(y),
                        o = n._result;
                    if (i) {
                        var s = arguments[i - 1];
                        X(function() {
                            q(i, r, s, o)
                        })
                    } else O(n, r, t, e);
                    return r
                }

                function g(t) {
                    var e = this;
                    if (t && "object" == typeof t && t.constructor === e) return t;
                    var n = new e(y);
                    return S(n, t), n
                }

                function y() {}

                function w() {
                    return new TypeError("You cannot resolve a promise with itself")
                }

                function b() {
                    return new TypeError("A promises callback cannot return that same promise.")
                }

                function x(t) {
                    try {
                        return t.then
                    } catch (e) {
                        return ut.error = e, ut
                    }
                }

                function T(t, e, n, i) {
                    try {
                        t.call(e, n, i)
                    } catch (r) {
                        return r
                    }
                }

                function A(t, e, n) {
                    X(function(t) {
                        var i = !1,
                            r = T(n, e, function(n) {
                                i || (i = !0, e !== n ? S(t, n) : C(t, n))
                            }, function(e) {
                                i || (i = !0, k(t, e))
                            }, "Settle: " + (t._label || " unknown promise"));
                        !i && r && (i = !0, k(t, r))
                    }, t)
                }

                function R(t, e) {
                    e._state === at ? C(t, e._result) : e._state === ct ? k(t, e._result) : O(e, void 0, function(e) {
                        S(t, e)
                    }, function(e) {
                        k(t, e)
                    })
                }

                function E(t, e, n) {
                    e.constructor === t.constructor && n === rt && constructor.resolve === ot ? R(t, e) : n === ut ? k(t, ut.error) : void 0 === n ? C(t, e) : a(n) ? A(t, e, n) : C(t, e)
                }

                function S(t, e) {
                    t === e ? k(t, w()) : s(e) ? E(t, e, x(e)) : C(t, e)
                }

                function M(t) {
                    t._onerror && t._onerror(t._result), P(t)
                }

                function C(t, e) {
                    t._state === st && (t._result = e, t._state = at, 0 !== t._subscribers.length && X(P, t))
                }

                function k(t, e) {
                    t._state === st && (t._state = ct, t._result = e, X(M, t))
                }

                function O(t, e, n, i) {
                    var r = t._subscribers,
                        o = r.length;
                    t._onerror = null, r[o] = e, r[o + at] = n, r[o + ct] = i, 0 === o && t._state && X(P, t)
                }

                function P(t) {
                    var e = t._subscribers,
                        n = t._state;
                    if (0 !== e.length) {
                        for (var i, r, o = t._result, s = 0; s < e.length; s += 3) i = e[s], r = e[s + n], i ? q(n, i, r, o) : r(o);
                        t._subscribers.length = 0
                    }
                }

                function j() {
                    this.error = null
                }

                function D(t, e) {
                    try {
                        return t(e)
                    } catch (n) {
                        return ht.error = n, ht
                    }
                }

                function q(t, e, n, i) {
                    var r, o, s, c, u = a(n);
                    if (u) {
                        if (r = D(n, i), r === ht ? (c = !0, o = r.error, r = null) : s = !0, e === r) return void k(e, b())
                    } else r = i, s = !0;
                    e._state !== st || (u && s ? S(e, r) : c ? k(e, o) : t === at ? C(e, r) : t === ct && k(e, r))
                }

                function B(t, e) {
                    try {
                        e(function(e) {
                            S(t, e)
                        }, function(e) {
                            k(t, e)
                        })
                    } catch (n) {
                        k(t, n)
                    }
                }

                function L(t) {
                    return new _t(this, t).promise
                }

                function W(t) {
                    function e(t) {
                        S(r, t)
                    }

                    function n(t) {
                        k(r, t)
                    }
                    var i = this,
                        r = new i(y);
                    if (!J(t)) return k(r, new TypeError("You must pass an array to race.")), r;
                    for (var o = t.length, s = 0; r._state === st && o > s; s++) O(i.resolve(t[s]), void 0, e, n);
                    return r
                }

                function z(t) {
                    var e = this,
                        n = new e(y);
                    return k(n, t), n
                }

                function N() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }

                function I() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }

                function F(t) {
                    this._id = dt++, this._state = void 0, this._result = void 0, this._subscribers = [], y !== t && ("function" != typeof t && N(), this instanceof F ? B(this, t) : I())
                }

                function U(t, e) {
                    this._instanceConstructor = t, this.promise = new t(y), Array.isArray(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? C(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && C(this.promise, this._result))) : k(this.promise, this._validationError())
                }

                function G() {
                    var t;
                    if ("undefined" != typeof r) t = r;
                    else if ("undefined" != typeof self) t = self;
                    else try {
                        t = Function("return this")()
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                    var n = t.Promise;
                    (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (t.Promise = mt)
                }
                var H;
                H = Array.isArray ? Array.isArray : function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                };
                var V, Y, Q, J = H,
                    K = 0,
                    X = function(t, e) {
                        it[K] = t, it[K + 1] = e, K += 2, 2 === K && (Y ? Y(m) : Q())
                    },
                    Z = "undefined" != typeof window ? window : void 0,
                    $ = Z || {},
                    tt = $.MutationObserver || $.WebKitMutationObserver,
                    et = "undefined" != typeof i && "[object process]" === {}.toString.call(i),
                    nt = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                    it = new Array(1e3);
                Q = et ? h() : tt ? f() : nt ? l() : void 0 === Z ? _() : d();
                var rt = v,
                    ot = g,
                    st = void 0,
                    at = 1,
                    ct = 2,
                    ut = new j,
                    ht = new j,
                    pt = L,
                    ft = W,
                    lt = z,
                    dt = 0,
                    mt = F;
                F.all = pt, F.race = ft, F.resolve = ot, F.reject = lt, F._setScheduler = c, F._setAsap = u, F._asap = X, F.prototype = {
                    constructor: F,
                    then: rt,
                    "catch": function(t) {
                        return this.then(null, t)
                    }
                };
                var _t = U;
                U.prototype._validationError = function() {
                    return new Error("Array Methods must be provided an Array")
                }, U.prototype._enumerate = function() {
                    for (var t = this.length, e = this._input, n = 0; this._state === st && t > n; n++) this._eachEntry(e[n], n)
                }, U.prototype._eachEntry = function(t, e) {
                    var n = this._instanceConstructor,
                        i = n.resolve;
                    if (i === ot) {
                        var r = x(t);
                        if (r === rt && t._state !== st) this._settledAt(t._state, e, t._result);
                        else if ("function" != typeof r) this._remaining--, this._result[e] = t;
                        else if (n === mt) {
                            var o = new n(y);
                            E(o, t, r), this._willSettleAt(o, e)
                        } else this._willSettleAt(new n(function(e) {
                            e(t)
                        }), e)
                    } else this._willSettleAt(i(t), e)
                }, U.prototype._settledAt = function(t, e, n) {
                    var i = this.promise;
                    i._state === st && (this._remaining--, t === ct ? k(i, n) : this._result[e] = n), 0 === this._remaining && C(i, this._result)
                }, U.prototype._willSettleAt = function(t, e) {
                    var n = this;
                    O(t, void 0, function(t) {
                        n._settledAt(at, e, t)
                    }, function(t) {
                        n._settledAt(ct, e, t)
                    })
                };
                var vt = G,
                    gt = {
                        Promise: mt,
                        polyfill: vt
                    };
                o = function() {
                    return gt
                }.call(e, n, e, t), !(void 0 !== o && (t.exports = o)), vt()
            }).call(this)
        }).call(this, n(281), n(7))
    },
    328: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        n.r(e), n.d(e, "AudioRecorder", function() {
            return u
        });
        var r = n(224),
            o = n(119),
            s = n(333),
            a = n(197),
            c = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var i = e[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }
                return function(e, n, i) {
                    return n && t(e.prototype, n), i && t(e, i), e
                }
            }();
        Object(r.initFailBack)();
        var u = function() {
            function t() {
                i(this, t), this._ctx = new AudioContext, this.eventTarget = document.createDocumentFragment(), this._stream = void 0, this._aquireing = !1, this.buffer = null, this.duration = 0, this.isRecording = !1, this._mimeType = ""
            }
            return t.prototype.addEventListener = function(t, e, n) {
                this.eventTarget.addEventListener(t, e, n)
            }, t.prototype.removeEventListener = function(t, e, n) {
                this.eventTarget.removeEventListener(t, e, n)
            }, t.prototype._onCreateStream = function(t) {
                return this._stream = t, this.source = this._ctx.createMediaStreamSource(t), this._aquireing = !1, this.source
            }, t.prototype.aquireMicrophone = function() {
                var t = this;
                if (!this._stream) {
                    if (!this._aquireing) {
                        this._aquireing = !0;
                        var e = {
                            audio: {
                                mandatory: {},
                                optional: []
                            }
                        };
                        navigator.mediaDevices && (this._aquirePromise = navigator.mediaDevices.getUserMedia(e).then(function(e) {
                            return t._onCreateStream(e)
                        }))
                    }
                    return this._aquirePromise
                }
                return Promise.resolve(this._stream)
            }, t.prototype.releaseMicrophone = function() {
                this._aquirePromise && (this._aquirePromise = null), this._stream && (this._stream.getTracks()[0].stop(), this._stream = null)
            }, t.selectMimeType = function() {
                if (window.MediaRecorder && window.MediaRecorder.isTypeSupported) {
                    for (var t = ["audio/webm;codec=opus", "audio/webm;codec=vorbis", "audio/ogg;codec=opus", "audio/ogg;codec=vorbis", "audio/webm", "audio/ogg", "audio/mpeg"], e = 0; e < t.length; e++)
                        if (window.MediaRecorder.isTypeSupported(t[e])) return t[e]
                } else
                    for (var n = ["audio/ogg;codecs=opus", "audio/mpeg"], i = document.createElement("audio"), r = 0; r < n.length; r++)
                        if (i.canPlayType(n[r])) return n[r];
                return !1
            }, t.prototype._createMediaRecorder = function() {
                var e = this,
                    n = void 0,
                    i = [],
                    r = {
                        bitsPerSecond: 16e3,
                        mimeType: t.selectMimeType()
                    };
                return window.MediaRecorder && r.mimeType ? n = new MediaRecorder(this._stream, r) : (r.mimeType || (r.mimeType = "audio/ogg;codecs=opus"), n = "audio/ogg;codecs=opus" == r.mimeType ? new o.OpusRecorder(this._stream, r) : new s.Mp3Recorder(this._stream, r)), this._mimeType = r.mimeType, n.addEventListener("dataavailable", function(t) {
                    e.duration = Math.round((Date.now() - e._start) / 1e3), e.eventTarget.dispatchEvent(new Event("progress")), i.push(t.detail || t.data)
                }), n.addEventListener("start", function() {
                    e._start = Date.now()
                }), n.addEventListener("stop", function() {
                    e.isRecording = !1, e.buffer = new Blob(i, {
                        type: r.mimeType
                    }), e.wave = Object(a.fastResample)(e._waveData, 256), e.eventTarget.dispatchEvent(new Event("finish"))
                }), n
            }, t.prototype._createResampler = function() {
                var t = this;
                if (!this._resampler) {
                    this._resampler = new a.Resampler({
                        srcSampleRate: this._ctx.sampleRate,
                        dstSampleRate: 1e3 / 60
                    });
                    var e = this.source.context.createScriptProcessor(4096, 1, 1);
                    e.onaudioprocess = function(e) {
                        var n = e.inputBuffer.getChannelData(0),
                            i = t._resampler.push(n);
                        i.length && (t._waveData = t._waveData.concat(i))
                    }, this._resamplerNode = e
                }
                this.source.connect(this._resamplerNode), this._resamplerNode.connect(this._ctx.destination), this._waveData = []
            }, t.prototype.record = function() {
                var t = this;
                return this.aquireMicrophone().then(function() {
                    t.isRecording = !0, t.buffer = null, t.duration = 0, t.mediaRecorder = t._createMediaRecorder(), t._createResampler(), t.mediaRecorder.start(1e3)
                })
            }, t.prototype.stop = function() {
                this.mediaRecorder && (this.mediaRecorder.stop(), this.mediaRecorder = null, this.releaseMicrophone())
            }, t.isSupport = function() {
                return !(!window.AudioContext || !navigator.mediaDevices)
            }, c(t, [{
                key: "mimeType",
                get: function() {
                    return this._mimeType
                }
            }]), t
        }()
    },
    333: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function r(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function o(t, e) {
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
        n.r(e), n.d(e, "Mp3Recorder", function() {
            return a
        });
        var s = n(16),
            a = function(t) {
                function e() {
                    return i(this, e), r(this, t.apply(this, arguments))
                }
                return o(e, t), e.prototype._createWorker = function() {
                    var t = this,
                        e = {
                            command: "init",
                            numberOfChannels: 1,
                            originalSampleRate: this._ctx.sampleRate
                        },
                        n = new Worker("/js/" + jsc("web/speech_worker_mp3.js"));
                    return n.addEventListener("message", function(e) {
                        var n = e.data;
                        n.buffer && t.eventTarget.dispatchEvent(new CustomEvent("dataavailable", {
                            detail: n.buffer
                        })), "finish" == n.type && t.eventTarget.dispatchEvent(new Event("stop"))
                    }), n.postMessage(e), n
                }, e
            }(s.BaseRecorder)
    },
    48: function(t, e, n) {
        "use strict";

        function i(t) {
            var e = t.getContext("2d"),
                n = e.backingStorePixelRatio || e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1,
                i = (window.devicePixelRatio || 1) / n;
            return i > 1 && (t.style.height = t.height + "px", t.style.width = t.width + "px", t.width *= i, t.height *= i), i
        }
        n.r(e), n.d(e, "canvasGetRatio", function() {
            return i
        })
    },
    56: function(t, e, n) {
        t.exports = n(245)
    },
    60: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        n.r(e), n.d(e, "Time", function() {
            return o
        });
        var r = {
                lineWidth: 2,
                color: "#6287AE"
            },
            o = function() {
                function t(e, n, r) {
                    i(this, t), this._source = e, this._canvas = n, this._ctx = n.getContext("2d"), this._options = r || {}, this._node = this._createNode(e)
                }
                return t.prototype._getOption = function(t) {
                    return this._options[t] || r[t]
                }, t.prototype._createNode = function(t) {
                    var e = t.context.createAnalyser();
                    return e.fftSize = 1024, t.connect(e), e
                }, t.prototype.destroy = function() {
                    this.stop(), this._source.disconnect(), this._node.disconnect(), this._node = null
                }, t.prototype.start = function() {
                    this._stopped = !1, this._draw()
                }, t.prototype._draw = function() {
                    var t = this,
                        e = this._canvas.getBoundingClientRect(),
                        n = e.right - e.left,
                        i = e.bottom - e.top,
                        r = new Uint8Array(this._node.frequencyBinCount);
                    this._node.getByteTimeDomainData(r), this._ctx.clearRect(0, 0, n, i), this._ctx.strokeStyle = this._getOption("color"), this._ctx.lineWidth = this._getOption("lineWidth"), this._ctx.lineCap = "round";
                    var o = 0,
                        s = 1 * n / this._node.frequencyBinCount;
                    this._ctx.beginPath();
                    for (var a = 0; a < this._node.frequencyBinCount; a++) {
                        var c = r[a] / 128,
                            u = c * i / 2;
                        0 === a ? this._ctx.moveTo(o, u) : this._ctx.lineTo(o, u), o += s
                    }
                    this._ctx.stroke(), this._stopped || window.requestAnimationFrame(function() {
                        t._draw()
                    })
                }, t.prototype.stop = function() {
                    this._stopped = !0
                }, t
            }()
    },
    7: function(t, e) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || Function("return this")() || (1, eval)("this")
        } catch (i) {
            "object" == typeof window && (n = window)
        }
        t.exports = n
    }
});