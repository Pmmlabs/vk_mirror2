! function(t) {
    function e(e) {
        for (var i, a, s = e[0], c = e[1], u = e[2], p = 0, d = []; p < s.length; p++) a = s[p], o[a] && d.push(o[a][0]), o[a] = 0;
        for (i in c) Object.prototype.hasOwnProperty.call(c, i) && (t[i] = c[i]);
        for (h && h(e); d.length;) d.shift()();
        return r.push.apply(r, u || []), n()
    }

    function n() {
        for (var t, e = 0; e < r.length; e++) {
            for (var n = r[e], i = !0, s = 1; s < n.length; s++) {
                var c = n[s];
                0 !== o[c] && (i = !1)
            }
            i && (r.splice(e--, 1), t = a(a.s = n[0]))
        }
        return t
    }
    var i = {},
        o = {
            "web/speech": 0
        },
        r = [];

    function a(e) {
        if (i[e]) return i[e].exports;
        var n = i[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(n.exports, n, n.exports, a), n.l = !0, n.exports
    }
    a.m = t, a.c = i, a.d = function(t, e, n) {
        a.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, a.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, a.t = function(t, e) {
        if (1 & e && (t = a(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (a.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var i in t) a.d(n, i, function(e) {
                return t[e]
            }.bind(null, i));
        return n
    }, a.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return a.d(e, "a", e), e
    }, a.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, a.p = "";
    var s = window.webpackJsonp = window.webpackJsonp || [],
        c = s.push.bind(s);
    s.push = e, s = s.slice();
    for (var u = 0; u < s.length; u++) e(s[u]);
    var h = c;
    r.push([117, "common"]), n()
}({
    117: function(t, e, n) {
        t.exports = n("IOlP")
    },
    IOlP: function(t, e, n) {
        "use strict";
        n.r(e);
        var i = n("E2g8"),
            o = n("g6Ay");
        if ("function" != typeof window.CustomEvent) {
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
        var a = 4096,
            s = function() {
                function t(e, n) {
                    var i = this;
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this._ctx = new AudioContext, this.eventTarget = document.createDocumentFragment(), this._options = n, this._stream = e, this._worker = null;
                    var o = this._ctx.createMediaStreamSource(e),
                        r = o.context.createScriptProcessor(a, 1, 1);
                    r.addEventListener("audioprocess", function(t) {
                        if (i._worker) {
                            for (var e = [], n = 0; n < t.inputBuffer.numberOfChannels; n++) e[n] = t.inputBuffer.getChannelData(n);
                            i._worker.postMessage({
                                command: "encode",
                                buffers: e
                            })
                        }
                    }), o.connect(r), r.connect(o.context.destination), this.node = r
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
            }();
        var c = function(t) {
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
            }(e, t), e.prototype._createWorker = function(t) {
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
        }(s);
        var u = function(t) {
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
                }(e, t), e.prototype._createWorker = function() {
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
            }(s),
            h = n("i/qW"),
            p = function() {
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
        Object(o.a)();
        var d = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this._ctx = new AudioContext, this.eventTarget = document.createDocumentFragment(), this._stream = void 0, this._aquireing = !1, this.buffer = null, this.duration = 0, this.isRecording = !1, this._mimeType = ""
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
                        navigator.mediaDevices && (this._aquirePromise = navigator.mediaDevices.getUserMedia({
                            audio: {
                                mandatory: {},
                                optional: []
                            }
                        }).then(function(e) {
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
                    for (var n = ["audio/ogg;codecs=opus", "audio/mpeg"], i = document.createElement("audio"), o = 0; o < n.length; o++)
                        if (i.canPlayType(n[o])) return n[o];
                return !1
            }, t.prototype._createMediaRecorder = function() {
                var e = this,
                    n = void 0,
                    i = [],
                    o = {
                        bitsPerSecond: 16e3,
                        mimeType: t.selectMimeType()
                    };
                return window.MediaRecorder && o.mimeType ? n = new MediaRecorder(this._stream, o) : (o.mimeType || (o.mimeType = "audio/ogg;codecs=opus"), n = "audio/ogg;codecs=opus" == o.mimeType ? new c(this._stream, o) : new u(this._stream, o)), this._mimeType = o.mimeType, n.addEventListener("dataavailable", function(t) {
                    e.duration = Math.round((Date.now() - e._start) / 1e3), e.eventTarget.dispatchEvent(new Event("progress")), i.push(t.detail || t.data)
                }), n.addEventListener("start", function() {
                    e._start = Date.now()
                }), n.addEventListener("stop", function() {
                    e.isRecording = !1, e.buffer = new Blob(i, {
                        type: o.mimeType
                    }), e.wave = Object(h.b)(e._waveData, 256), e.eventTarget.dispatchEvent(new Event("finish"))
                }), n
            }, t.prototype._createResampler = function() {
                var t = this;
                if (!this._resampler) {
                    this._resampler = new h.a({
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
            }, p(t, [{
                key: "mimeType",
                get: function() {
                    return this._mimeType
                }
            }]), t
        }();
        var l = {
            blockWidth: 2,
            spacing: 1,
            visTime: 8,
            color: "#fff"
        };
        var f = {
            blockWidth: 3,
            spacing: 2,
            color: "#6287AE"
        };
        var m = {
            lineWidth: 2,
            color: "#6287AE"
        };
        var _ = {
                pulseRate: 20
            },
            v = {
                wave: function() {
                    function t(e, n, i) {
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), this._accum = 0, this._source = e, this._canvas = n;
                        var o = n.getBoundingClientRect();
                        n.width = o.right - o.left, n.height = o.bottom - o.top, this._width = n.width, this._height = n.height, this._ratio = function(t) {
                            var e = t.getContext("2d"),
                                n = e.backingStorePixelRatio || e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1,
                                i = (window.devicePixelRatio || 1) / n;
                            return i > 1 && (t.style.height = t.height + "px", t.style.width = t.width + "px", t.width *= i, t.height *= i), i
                        }(n), this._ctx = n.getContext("2d"), this._options = i || {}, this._accumNode = this._createWaveNode(e)
                    }
                    return t.prototype._getOption = function(t) {
                        return this._options[t] || l[t]
                    }, t.prototype._createWaveNode = function(t) {
                        var e = this,
                            n = parseInt(this._width / (this._getOption("blockWidth") + this._getOption("spacing"))),
                            i = this._getOption("visTime") / n,
                            o = 0,
                            r = t.context.createScriptProcessor(2048, 1, 1);
                        return r.onaudioprocess = function(t) {
                            for (var n = t.inputBuffer.getChannelData(0), r = t.inputBuffer.duration / n.length, a = 0; a < n.length; a++) o += r, e._accum = Math.min(1, Math.max(e._accum, Math.abs(n[a]))), o > i && (++e.timeAccumIndex > e.timeAccumItems.length - 1 && (e.timeAccumIndex = 0), e.timeAccumItems[e.timeAccumIndex] = e._accum, e._accum = 0, o = 0)
                        }, this.timeAccumItems = new Array(n), this.timeAccumIndex = 0, t.connect(r), r.connect(t.context.destination), r
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
                                o = void 0;
                            this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._ctx.fillStyle = this._getOption("color");
                            for (var r = 0; r < this.timeAccumItems.length; r++, e++) e >= this.timeAccumItems.length && (e = 0), n = this.timeAccumItems[e] * (this._height - 2) + 2, i = r * (this._getOption("blockWidth") + this._getOption("spacing")), o = (this._height - n) / 2, this._ctx.fillRect(i * this._ratio, o * this._ratio, this._getOption("blockWidth") * this._ratio, n * this._ratio);
                            window.requestAnimationFrame(function() {
                                t._draw()
                            })
                        }
                    }, t.prototype.stop = function() {
                        this._stopped = !0
                    }, t
                }(),
                frequency: function() {
                    function t(e, n, i) {
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), this._source = e, this._canvas = n, this._ctx = n.getContext("2d"), this._options = i || {}, this._node = this._createNode(e)
                    }
                    return t.prototype._getOption = function(t) {
                        return this._options[t] || f[t]
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
                            o = i.right - i.left,
                            r = i.bottom - i.top,
                            a = Math.round(o / e),
                            s = new Uint8Array(this._node.frequencyBinCount);
                        this._node.getByteFrequencyData(s), this._ctx.clearRect(0, 0, o, r), this._ctx.fillStyle = "#F6D565", this._ctx.lineCap = "round";
                        var c = this._node.frequencyBinCount / a,
                            u = this._getOption("color");
                        "HSL" !== u && (this._ctx.fillStyle = u);
                        for (var h = 0; h < a; ++h) {
                            for (var p = 0, d = Math.floor(h * c), l = 0; l < c; l++) p += s[d + l] / 256;
                            p /= Math.ceil(c), "HSL" == u && (this._ctx.fillStyle = "hsl( " + Math.round(360 * h / a) + ", " + (50 + 50 * p) + "%, 50%)"), this._ctx.fillRect(h * (e + n), r, n, -p * r)
                        }
                        this._stopped || window.requestAnimationFrame(function() {
                            t._draw()
                        })
                    }, t.prototype.stop = function() {
                        this._stopped = !0
                    }, t
                }(),
                time: function() {
                    function t(e, n, i) {
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), this._source = e, this._canvas = n, this._ctx = n.getContext("2d"), this._options = i || {}, this._node = this._createNode(e)
                    }
                    return t.prototype._getOption = function(t) {
                        return this._options[t] || m[t]
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
                            o = new Uint8Array(this._node.frequencyBinCount);
                        this._node.getByteTimeDomainData(o), this._ctx.clearRect(0, 0, n, i), this._ctx.strokeStyle = this._getOption("color"), this._ctx.lineWidth = this._getOption("lineWidth"), this._ctx.lineCap = "round";
                        var r = 0,
                            a = 1 * n / this._node.frequencyBinCount;
                        this._ctx.beginPath();
                        for (var s = 0; s < this._node.frequencyBinCount; s++) {
                            var c = o[s] / 128 * i / 2;
                            0 === s ? this._ctx.moveTo(r, c) : this._ctx.lineTo(r, c), r += a
                        }
                        this._ctx.stroke(), this._stopped || window.requestAnimationFrame(function() {
                            t._draw()
                        })
                    }, t.prototype.stop = function() {
                        this._stopped = !0
                    }, t
                }(),
                pulse: function() {
                    function t(e, n, i) {
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), this._accum = 0, this._source = e, this._options = i || {}, this._node = this._createWaveNode(e)
                    }
                    return t.prototype._getOption = function(t) {
                        return this._options[t] || _[t]
                    }, t.prototype._createWaveNode = function(t) {
                        var e = this,
                            n = 1 / this._getOption("pulseRate"),
                            i = 0,
                            o = t.context.createScriptProcessor(2048, 1, 1);
                        return o.onaudioprocess = function(t) {
                            for (var o = t.inputBuffer.getChannelData(0), r = t.inputBuffer.duration / o.length, a = 0; a < o.length; a++) i += r, e._accum = Math.min(1, Math.max(e._accum, Math.abs(o[a]))), i > n && (i -= n, e._stopped ? setStyle(e._getOption("el"), {
                                transform: "scale(0.8)"
                            }) : setStyle(e._getOption("el"), {
                                transform: "scale(" + (.8 + .95 * Math.sqrt(e._accum)) + ")"
                            }), e._accum = 0, i = 0)
                        }, t.connect(o), o.connect(t.context.destination), o
                    }, t.prototype.destroy = function() {
                        this.stop(), this._source.disconnect(), this._node.disconnect(), this._node = null
                    }, t.prototype.start = function() {
                        this._stopped = !1
                    }, t.prototype.stop = function() {
                        this._stopped = !0
                    }, t
                }()
            };
        var g = i.Promise,
            w = {
                isSupport: function() {
                    return !(!window.AudioContext || !(navigator.getUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia))
                },
                getAvailableMicrophones: function() {
                    return d.isSupport() ? d.getAvailableMicrophones() : g.resolve([])
                },
                newRecorder: function() {
                    return window.Promise || (window.Promise = g), new d
                },
                resample: function(t, e, n) {
                    return Object(h.b)(t, e, n)
                },
                createVisualization: function(t, e, n, i) {
                    if (v[t]) {
                        if (e instanceof HTMLMediaElement) {
                            var o = new AudioContext;
                            (e = o.createMediaElementSource(e)).connect(o.destination)
                        }
                        return new v[t](e, n, i)
                    }
                }
            };
        window.Speech = w;
        try {
            stManager.done("speech.js")
        } catch (t) {}
    },
    g6Ay: function(t, e, n) {
        "use strict";

        function i() {
            var t = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.MediaDevices && window.MediaDevices.getUserMedia;
            t && !navigator.mediaDevices && (navigator.mediaDevices = navigator.mediaDevices || {}), navigator.mediaDevices && (navigator.mediaDevices.getUserMedia || (navigator.mediaDevices.getUserMedia = function(e) {
                return new Promise(function(n, i) {
                    t ? t.call(navigator, e, n, i) : i(new Error("NotSupported"))
                })
            }), navigator.mediaDevices.enumerateDevices || (navigator.mediaDevices.enumerateDevices = function() {
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
            })), window.AudioContext = window.AudioContext || window.webkitAudioContext, window.AudioContext && (window.AudioContext.prototype.createScriptProcessor = window.AudioContext.prototype.createScriptProcessor || window.AudioContext.prototype.createJavaScriptNode)
        }
        n.d(e, "a", function() {
            return i
        })
    },
    "i/qW": function(t, e, n) {
        "use strict";
        var i = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.clear()
            }
            return t.prototype.push = function(t) {
                this._count++, this._accum += t
            }, t.prototype.get = function() {
                return this._accum / this._count
            }, t.prototype.clear = function() {
                this._count = 0, this._accum = 0
            }, t
        }();
        var o = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.clear()
            }
            return t.prototype.push = function(t) {
                this._max = Math.max(this._max, Math.abs(t))
            }, t.prototype.get = function() {
                return this._max
            }, t.prototype.clear = function() {
                this._max = 0
            }, t
        }();
        var r = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.clear()
            }
            return t.prototype.push = function(t) {
                this._count++, this._accum += t, this._accum_q += t * t
            }, t.prototype.get = function() {
                return 1 == this._count ? this._accum : Math.sqrt((this._accum_q - this._accum * this._accum / this._count) / this._count)
            }, t.prototype.clear = function() {
                this._count = 0, this._accum = 0, this._accum_q = 0
            }, t
        }();
        n.d(e, "a", function() {
            return s
        }), n.d(e, "b", function() {
            return c
        });
        var a = {
                avg: i,
                peak: o,
                quad: r
            },
            s = function() {
                function t(e) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this._normalizeAlgorithm = !1, a[e.normalizeAlgorithm] && (this._normalizeAlgorithm = new a[e.normalizeAlgorithm]), this._srcSampleRate = parseInt(e.srcSampleRate || 0), this._dstSampleRate = parseInt(e.dstSampleRate || 0), this._truncateTo = 1, void 0 !== e.truncateTo && (this._truncateTo = e.truncateTo), this._dstSampleRate > 0 ? this._sampleRate = this._srcSampleRate / this._dstSampleRate : this._sampleRate = 0, a[e.algorithm] || (e.algorithm = "peak"), this._algorithm = new a[e.algorithm], this._sampleCount = 0, this._data = []
                }
                return t.prototype.push = function(t) {
                    if (this._sampleRate <= 0) return [];
                    for (var e = [], n = void 0, i = 0; i < t.length; i++)
                        if (this._truncateTo > 0 && (t[i] = Math.min(this._truncateTo, Math.abs(t[i]))), this._sampleCount += 1, this._sampleCount >= this._sampleRate)
                            for (; this._sampleCount >= this._sampleRate;) this._sampleCount -= this._sampleRate, this._sampleCount <= .8 && this._algorithm.push(t[i]), n = this._algorithm.get(), e.push(n), this._normalizeAlgorithm && this._normalizeAlgorithm.push(n), this._algorithm.clear(), this._sampleCount > .2 && this._algorithm.push(t[i]);
                        else this._algorithm.push(t[i]);
                    if (this._normalizeAlgorithm) {
                        var o = this._normalizeAlgorithm.get();
                        if (this._normalizeAlgorithm.clear(), o > 0)
                            for (var r = 0; r < e.length; r++) e[r] = e[r] / o, this._truncateTo > 0 && (e[r] = Math.min(this._truncateTo, Math.abs(e[r])))
                    }
                    return e
                }, t
            }();

        function c(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "peak";
            return new s({
                srcSampleRate: t.length,
                dstSampleRate: e,
                normalizeAlgorithm: n,
                truncateTo: 0
            }).push(t)
        }
    }
});