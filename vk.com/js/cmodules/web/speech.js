! function(t) {
    function e(i) {
        if (n[i]) return n[i].exports;
        var o = n[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return t[i].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
    }
    var n = {};
    return e.m = t, e.c = n, e.p = "", e(0)
}({
    0: function(t, e, n) {
        t.exports = n(153)
    },
    3: function(t, e) {
        "use strict";

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        if (Object.defineProperty(e, "__esModule", {
                value: !0
            }), "function" != typeof window.CustomEvent) {
            var i = function(t, e) {
                e = e || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var n = document.createEvent("CustomEvent");
                return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
            };
            i.prototype = window.Event.prototype, window.CustomEvent = i
        }
        var o = 4096;
        e.BaseRecorder = function() {
            function t(e, i) {
                var r = this;
                n(this, t), this._ctx = new AudioContext, this.eventTarget = document.createDocumentFragment(), this._options = i, this._stream = e, this._worker = null;
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
    15: function(t, e) {
        t.exports = function() {
            throw new Error("define cannot be used indirect")
        }
    },
    23: function(t, e) {
        function n() {
            u = !1, s.length ? c = s.concat(c) : h = -1, c.length && i()
        }

        function i() {
            if (!u) {
                var t = setTimeout(n);
                u = !0;
                for (var e = c.length; e;) {
                    for (s = c, c = []; ++h < e;) s && s[h].run();
                    h = -1, e = c.length
                }
                s = null, u = !1, clearTimeout(t)
            }
        }

        function o(t, e) {
            this.fun = t, this.array = e
        }

        function r() {}
        var s, a = t.exports = {},
            c = [],
            u = !1,
            h = -1;
        a.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            c.push(new o(t, e)), 1 !== c.length || u || setTimeout(i, 0)
        }, o.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", a.versions = {}, a.on = r, a.addListener = r, a.once = r, a.off = r, a.removeListener = r, a.removeAllListeners = r, a.emit = r, a.binding = function(t) {
            throw new Error("process.binding is not supported")
        }, a.cwd = function() {
            return "/"
        }, a.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }, a.umask = function() {
            return 0
        }
    },
    31: function(t, e) {
        "use strict";

        function n() {
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
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.initFailBack = n
    },
    32: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Wave = void 0;
        var o = n(66),
            r = {
                blockWidth: 2,
                spacing: 1,
                visTime: 8,
                color: "#fff"
            };
        e.Wave = function() {
            function t(e, n, r) {
                i(this, t), this._accum = 0, this._source = e, this._canvas = n;
                var s = n.getBoundingClientRect();
                n.width = s.right - s.left, n.height = s.bottom - s.top, this._width = n.width, this._height = n.height, this._ratio = (0, o.canvasGetRatio)(n), this._ctx = n.getContext("2d"), this._options = r || {}, this._accumNode = this._createWaveNode(e)
            }
            return t.prototype._getOption = function(t) {
                return this._options[t] || r[t]
            }, t.prototype._createWaveNode = function(t) {
                var e = this,
                    n = parseInt(this._width / (this._getOption("blockWidth") + this._getOption("spacing"))),
                    i = this._getOption("visTime") / n,
                    o = 0,
                    r = t.context.createScriptProcessor(2048, 1, 1);
                return r.onaudioprocess = function(t) {
                    for (var n = t.inputBuffer.getChannelData(0), r = t.inputBuffer.duration / n.length, s = 0; s < n.length; s++) o += r, e._accum = Math.min(1, Math.max(e._accum, Math.abs(n[s]))), o > i && (++e.timeAccumIndex > e.timeAccumItems.length - 1 && (e.timeAccumIndex = 0), e.timeAccumItems[e.timeAccumIndex] = e._accum, e._accum = 0, o = 0)
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
        }()
    },
    43: function(t, e) {
        "use strict";

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = {
            lineWidth: 2,
            color: "#6287AE"
        };
        e.Time = function() {
            function t(e, i, o) {
                n(this, t), this._source = e, this._canvas = i, this._ctx = i.getContext("2d"), this._options = o || {}, this._node = this._createNode(e)
            }
            return t.prototype._getOption = function(t) {
                return this._options[t] || i[t]
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
                    s = 1 * n / this._node.frequencyBinCount;
                this._ctx.beginPath();
                for (var a = 0; a < this._node.frequencyBinCount; a++) {
                    var c = o[a] / 128,
                        u = c * i / 2;
                    0 === a ? this._ctx.moveTo(r, u) : this._ctx.lineTo(r, u), r += s
                }
                this._ctx.stroke(), this._stopped || window.requestAnimationFrame(function() {
                    t._draw()
                })
            }, t.prototype.stop = function() {
                this._stopped = !0
            }, t
        }()
    },
    66: function(t, e) {
        "use strict";

        function n(t) {
            var e = t.getContext("2d"),
                n = e.backingStorePixelRatio || e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1,
                i = (window.devicePixelRatio || 1) / n;
            return i > 1 && (t.style.height = t.height + "px", t.style.width = t.width + "px", t.width *= i, t.height *= i), i
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.canvasGetRatio = n
    },
    75: function(t, e) {
        "use strict";

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = {
            blockWidth: 3,
            spacing: 2,
            color: "#6287AE"
        };
        e.Frequency = function() {
            function t(e, i, o) {
                n(this, t), this._source = e, this._canvas = i, this._ctx = i.getContext("2d"), this._options = o || {}, this._node = this._createNode(e)
            }
            return t.prototype._getOption = function(t) {
                return this._options[t] || i[t]
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
                    s = Math.round(o / e),
                    a = new Uint8Array(this._node.frequencyBinCount);
                this._node.getByteFrequencyData(a), this._ctx.clearRect(0, 0, o, r), this._ctx.fillStyle = "#F6D565", this._ctx.lineCap = "round";
                var c = this._node.frequencyBinCount / s,
                    u = this._getOption("color");
                "HSL" !== u && (this._ctx.fillStyle = u);
                for (var h = 0; s > h; ++h) {
                    for (var p = 0, l = Math.floor(h * c), f = 0; c > f; f++) p += a[l + f] / 256;
                    p /= Math.ceil(c), "HSL" == u && (this._ctx.fillStyle = "hsl( " + Math.round(360 * h / s) + ", " + (50 + 50 * p) + "%, 50%)"), this._ctx.fillRect(h * (e + n), r, n, -p * r)
                }
                this._stopped || window.requestAnimationFrame(function() {
                    t._draw()
                })
            }, t.prototype.stop = function() {
                this._stopped = !0
            }, t
        }()
    },
    82: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function o(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function r(t, e) {
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
        }), e.Mp3Recorder = void 0;
        var s = n(3);
        e.Mp3Recorder = function(t) {
            function e() {
                return i(this, e), o(this, t.apply(this, arguments))
            }
            return r(e, t), e.prototype._createWorker = function() {
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
    93: function(t, e) {
        "use strict";

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = {
            pulseRate: 20
        };
        e.Pulse = function() {
            function t(e, i, o) {
                n(this, t), this._accum = 0, this._source = e, this._options = o || {}, this._node = this._createWaveNode(e)
            }
            return t.prototype._getOption = function(t) {
                return this._options[t] || i[t]
            }, t.prototype._createWaveNode = function(t) {
                var e = this,
                    n = 1 / this._getOption("pulseRate"),
                    i = 0,
                    o = t.context.createScriptProcessor(2048, 1, 1);
                return o.onaudioprocess = function(t) {
                    for (var o = t.inputBuffer.getChannelData(0), r = t.inputBuffer.duration / o.length, s = 0; s < o.length; s++) i += r, e._accum = Math.min(1, Math.max(e._accum, Math.abs(o[s]))), i > n && (i -= n, e._stopped ? setStyle(e._getOption("el"), {
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
    },
    108: function(t, e) {
        "use strict";

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.AverageAlgorithm = function() {
            function t() {
                n(this, t), this.clear()
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
    120: function(t, e, n) {
        "use strict";

        function i(t, e, n, i) {
            if (c[t]) {
                if (e instanceof HTMLMediaElement) {
                    var o = new AudioContext;
                    e = o.createMediaElementSource(e), e.connect(o.destination)
                }
                return new c[t](e, n, i)
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.createVisualization = i;
        var o = n(32),
            r = n(75),
            s = n(43),
            a = n(93),
            c = {
                wave: o.Wave,
                frequency: r.Frequency,
                time: s.Time,
                pulse: a.Pulse
            }
    },
    153: function(t, e, n) {
        "use strict";
        var i = n(176),
            o = n(169),
            r = n(209),
            s = n(120),
            a = {
                isSupport: function() {
                    return !(!window.AudioContext || !(navigator.getUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia))
                },
                getAvailableMicrophones: function() {
                    return o.AudioRecorder.isSupport() ? o.AudioRecorder.getAvailableMicrophones() : i.Promise.resolve([])
                },
                newRecorder: function() {
                    return window.Promise || (window.Promise = i.Promise), new o.AudioRecorder
                },
                resample: function(t, e, n) {
                    return (0, r.fastResample)(t, e, n)
                },
                createVisualization: s.createVisualization
            };
        window.Speech = a;
        try {
            stManager.done("speech.js")
        } catch (c) {}
    },
    169: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.AudioRecorder = void 0;
        var o = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var i = e[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }
                return function(e, n, i) {
                    return n && t(e.prototype, n), i && t(e, i), e
                }
            }(),
            r = n(31),
            s = n(202),
            a = n(82),
            c = n(209);
        (0, r.initFailBack)(), e.AudioRecorder = function() {
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
                return window.MediaRecorder && o.mimeType ? n = new MediaRecorder(this._stream, o) : (o.mimeType || (o.mimeType = "audio/ogg;codecs=opus"), n = "audio/ogg;codecs=opus" == o.mimeType ? new s.OpusRecorder(this._stream, o) : new a.Mp3Recorder(this._stream, o)), this._mimeType = o.mimeType, n.addEventListener("dataavailable", function(t) {
                    e.duration = Math.round((Date.now() - e._start) / 1e3), e.eventTarget.dispatchEvent(new Event("progress")), i.push(t.detail || t.data)
                }), n.addEventListener("start", function() {
                    e._start = Date.now()
                }), n.addEventListener("stop", function() {
                    e.isRecording = !1, e.buffer = new Blob(i, {
                        type: o.mimeType
                    }), e.wave = (0, c.fastResample)(e._waveData, 256), e.eventTarget.dispatchEvent(new Event("finish"))
                }), n
            }, t.prototype._createResampler = function() {
                var t = this;
                if (!this._resampler) {
                    this._resampler = new c.Resampler({
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
            }, o(t, [{
                key: "mimeType",
                get: function() {
                    return this._mimeType
                }
            }]), t
        }()
    },
    176: function(t, e, n) {
        var i;
        (function(t, o, r) {
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
                        t.nextTick(_)
                    }
                }

                function p() {
                    return function() {
                        V(_)
                    }
                }

                function l() {
                    var t = 0,
                        e = new tt(_),
                        n = document.createTextNode("");
                    return e.observe(n, {
                            characterData: !0
                        }),
                        function() {
                            n.data = t = ++t % 2
                        }
                }

                function f() {
                    var t = new MessageChannel;
                    return t.port1.onmessage = _,
                        function() {
                            t.port2.postMessage(0)
                        }
                }

                function d() {
                    return function() {
                        setTimeout(_, 1)
                    }
                }

                function _() {
                    for (var t = 0; K > t; t += 2) {
                        var e = it[t],
                            n = it[t + 1];
                        e(n), it[t] = void 0, it[t + 1] = void 0
                    }
                    K = 0
                }

                function m() {
                    try {
                        var t = n(229);
                        return V = t.runOnLoop || t.runOnContext, p()
                    } catch (e) {
                        return d()
                    }
                }

                function v(t, e) {
                    var n = this,
                        i = n._state;
                    if (i === at && !t || i === ct && !e) return this;
                    var o = new this.constructor(y),
                        r = n._result;
                    if (i) {
                        var s = arguments[i - 1];
                        X(function() {
                            q(i, o, s, r)
                        })
                    } else O(n, o, t, e);
                    return o
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

                function A(t, e, n, i) {
                    try {
                        t.call(e, n, i)
                    } catch (o) {
                        return o
                    }
                }

                function M(t, e, n) {
                    X(function(t) {
                        var i = !1,
                            o = A(n, e, function(n) {
                                i || (i = !0, e !== n ? S(t, n) : C(t, n))
                            }, function(e) {
                                i || (i = !0, P(t, e))
                            }, "Settle: " + (t._label || " unknown promise"));
                        !i && o && (i = !0, P(t, o))
                    }, t)
                }

                function R(t, e) {
                    e._state === at ? C(t, e._result) : e._state === ct ? P(t, e._result) : O(e, void 0, function(e) {
                        S(t, e)
                    }, function(e) {
                        P(t, e)
                    })
                }

                function T(t, e, n) {
                    e.constructor === t.constructor && n === ot && constructor.resolve === rt ? R(t, e) : n === ut ? P(t, ut.error) : void 0 === n ? C(t, e) : a(n) ? M(t, e, n) : C(t, e)
                }

                function S(t, e) {
                    t === e ? P(t, w()) : s(e) ? T(t, e, x(e)) : C(t, e)
                }

                function E(t) {
                    t._onerror && t._onerror(t._result), k(t)
                }

                function C(t, e) {
                    t._state === st && (t._result = e, t._state = at, 0 !== t._subscribers.length && X(k, t))
                }

                function P(t, e) {
                    t._state === st && (t._state = ct, t._result = e, X(E, t))
                }

                function O(t, e, n, i) {
                    var o = t._subscribers,
                        r = o.length;
                    t._onerror = null, o[r] = e, o[r + at] = n, o[r + ct] = i, 0 === r && t._state && X(k, t)
                }

                function k(t) {
                    var e = t._subscribers,
                        n = t._state;
                    if (0 !== e.length) {
                        for (var i, o, r = t._result, s = 0; s < e.length; s += 3) i = e[s], o = e[s + n], i ? q(n, i, o, r) : o(r);
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
                    var o, r, s, c, u = a(n);
                    if (u) {
                        if (o = D(n, i), o === ht ? (c = !0, r = o.error, o = null) : s = !0, e === o) return void P(e, b())
                    } else o = i, s = !0;
                    e._state !== st || (u && s ? S(e, o) : c ? P(e, r) : t === at ? C(e, o) : t === ct && P(e, o))
                }

                function B(t, e) {
                    try {
                        e(function(e) {
                            S(t, e)
                        }, function(e) {
                            P(t, e)
                        })
                    } catch (n) {
                        P(t, n)
                    }
                }

                function W(t) {
                    return new mt(this, t).promise
                }

                function L(t) {
                    function e(t) {
                        S(o, t)
                    }

                    function n(t) {
                        P(o, t)
                    }
                    var i = this,
                        o = new i(y);
                    if (!J(t)) return P(o, new TypeError("You must pass an array to race.")), o;
                    for (var r = t.length, s = 0; o._state === st && r > s; s++) O(i.resolve(t[s]), void 0, e, n);
                    return o
                }

                function z(t) {
                    var e = this,
                        n = new e(y);
                    return P(n, t), n
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
                    this._instanceConstructor = t, this.promise = new t(y), Array.isArray(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? C(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && C(this.promise, this._result))) : P(this.promise, this._validationError())
                }

                function G() {
                    var t;
                    if ("undefined" != typeof o) t = o;
                    else if ("undefined" != typeof self) t = self;
                    else try {
                        t = Function("return this")()
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                    var n = t.Promise;
                    (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (t.Promise = _t)
                }
                var H;
                H = Array.isArray ? Array.isArray : function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                };
                var V, Y, Q, J = H,
                    K = 0,
                    X = function(t, e) {
                        it[K] = t, it[K + 1] = e, K += 2, 2 === K && (Y ? Y(_) : Q())
                    },
                    Z = "undefined" != typeof window ? window : void 0,
                    $ = Z || {},
                    tt = $.MutationObserver || $.WebKitMutationObserver,
                    et = "undefined" != typeof t && "[object process]" === {}.toString.call(t),
                    nt = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                    it = new Array(1e3);
                Q = et ? h() : tt ? l() : nt ? f() : void 0 === Z ? m() : d();
                var ot = v,
                    rt = g,
                    st = void 0,
                    at = 1,
                    ct = 2,
                    ut = new j,
                    ht = new j,
                    pt = W,
                    lt = L,
                    ft = z,
                    dt = 0,
                    _t = F;
                F.all = pt, F.race = lt, F.resolve = rt, F.reject = ft, F._setScheduler = c, F._setAsap = u, F._asap = X, F.prototype = {
                    constructor: F,
                    then: ot,
                    "catch": function(t) {
                        return this.then(null, t)
                    }
                };
                var mt = U;
                U.prototype._validationError = function() {
                    return new Error("Array Methods must be provided an Array")
                }, U.prototype._enumerate = function() {
                    for (var t = this.length, e = this._input, n = 0; this._state === st && t > n; n++) this._eachEntry(e[n], n)
                }, U.prototype._eachEntry = function(t, e) {
                    var n = this._instanceConstructor,
                        i = n.resolve;
                    if (i === rt) {
                        var o = x(t);
                        if (o === ot && t._state !== st) this._settledAt(t._state, e, t._result);
                        else if ("function" != typeof o) this._remaining--, this._result[e] = t;
                        else if (n === _t) {
                            var r = new n(y);
                            T(r, t, o), this._willSettleAt(r, e)
                        } else this._willSettleAt(new n(function(e) {
                            e(t)
                        }), e)
                    } else this._willSettleAt(i(t), e)
                }, U.prototype._settledAt = function(t, e, n) {
                    var i = this.promise;
                    i._state === st && (this._remaining--, t === ct ? P(i, n) : this._result[e] = n), 0 === this._remaining && C(i, this._result)
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
                        Promise: _t,
                        polyfill: vt
                    };
                n(15).amd ? (i = function() {
                    return gt
                }.call(e, n, e, r), !(void 0 !== i && (r.exports = i))) : "undefined" != typeof r && r.exports ? r.exports = gt : "undefined" != typeof this && (this.ES6Promise = gt), vt()
            }).call(this)
        }).call(e, n(23), function() {
            return this
        }(), n(192)(t))
    },
    192: function(t, e) {
        t.exports = function(t) {
            return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children = [], t.webpackPolyfill = 1), t
        }
    },
    202: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function o(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function r(t, e) {
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
        }), e.OpusRecorder = void 0;
        var s = n(3);
        e.OpusRecorder = function(t) {
            function e() {
                return i(this, e), o(this, t.apply(this, arguments))
            }
            return r(e, t), e.prototype._createWorker = function(t) {
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
    209: function(t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function o(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "peak";
            return new u({
                srcSampleRate: t.length,
                dstSampleRate: e,
                normalizeAlgorithm: n,
                truncateTo: 0
            }).push(t)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Resampler = void 0, e.fastResample = o;
        var r = n(108),
            s = n(230),
            a = n(213),
            c = {
                avg: r.AverageAlgorithm,
                peak: s.PeakAlgorithm,
                quad: a.QuadAlgorithm
            },
            u = e.Resampler = function() {
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
                        var o = this._normalizeAlgorithm.get();
                        if (this._normalizeAlgorithm.clear(), o > 0)
                            for (var r = 0; r < e.length; r++) e[r] = e[r] / o, this._truncateTo > 0 && (e[r] = Math.min(this._truncateTo, Math.abs(e[r])))
                    }
                    return e
                }, t
            }()
    },
    213: function(t, e) {
        "use strict";

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.QuadAlgorithm = function() {
            function t() {
                n(this, t), this.clear()
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
    229: function(t, e) {},
    230: function(t, e) {
        "use strict";

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.PeakAlgorithm = function() {
            function t() {
                n(this, t), this.clear()
            }
            return t.prototype.push = function(t) {
                this._max = Math.max(this._max, Math.abs(t))
            }, t.prototype.get = function() {
                return this._max
            }, t.prototype.clear = function() {
                this._max = 0
            }, t
        }()
    }
});