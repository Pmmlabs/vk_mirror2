! function(t) {
    function e(e) {
        for (var s, o, n = e[0], c = e[1], h = e[2], d = 0, l = []; d < n.length; d++) o = n[d], r[o] && l.push(r[o][0]), r[o] = 0;
        for (s in c) Object.prototype.hasOwnProperty.call(c, s) && (t[s] = c[s]);
        for (u && u(e); l.length;) l.shift()();
        return a.push.apply(a, h || []), i()
    }

    function i() {
        for (var t, e = 0; e < a.length; e++) {
            for (var i = a[e], s = !0, n = 1; n < i.length; n++) {
                var c = i[n];
                0 !== r[c] && (s = !1)
            }
            s && (a.splice(e--, 1), t = o(o.s = i[0]))
        }
        return t
    }
    var s = {},
        r = {
            "web/speech": 0
        },
        a = [];

    function o(e) {
        if (s[e]) return s[e].exports;
        var i = s[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    o.m = t, o.c = s, o.d = function(t, e, i) {
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
            for (var s in t) o.d(i, s, function(e) {
                return t[e]
            }.bind(null, s));
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
    var n = window.webpackJsonp = window.webpackJsonp || [],
        c = n.push.bind(n);
    n.push = e, n = n.slice();
    for (var h = 0; h < n.length; h++) e(n[h]);
    var u = c;
    a.push([150, "bundles/common"]), i()
}({
    150: function(t, e, i) {
        t.exports = i("IOlP")
    },
    IOlP: function(t, e, i) {
        "use strict";
        i.r(e);
        var s = i("E2g8"),
            r = (i("VRzm"), i("Btvt"), i("g6Ay"));
        if ("function" != typeof window.CustomEvent) {
            function a(t, e) {
                e = e || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var i = document.createEvent("CustomEvent");
                return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i
            }
            a.prototype = window.Event.prototype, window.CustomEvent = a
        }
        var o = 4096;
        class n {
            addEventListener(t, e, i) {
                this.eventTarget.addEventListener(t, e, i)
            }
            removeEventListener(t, e, i) {
                this.eventTarget.removeEventListener(t, e, i)
            }
            constructor(t, e) {
                this._ctx = new AudioContext, this.eventTarget = document.createDocumentFragment(), this._options = e, this._stream = t, this._worker = null;
                var i = this._ctx.createMediaStreamSource(t),
                    s = i.context.createScriptProcessor(o, 1, 1);
                s.addEventListener("audioprocess", t => {
                    if (this._worker) {
                        for (var e = [], i = 0; i < t.inputBuffer.numberOfChannels; i++) e[i] = t.inputBuffer.getChannelData(i);
                        this._worker.postMessage({
                            command: "encode",
                            buffers: e
                        })
                    }
                }), i.connect(s), s.connect(i.context.destination), this.node = s
            }
            _createWorker() {
                return !1
            }
            start(t) {
                this._worker = this._createWorker(t), this.eventTarget.dispatchEvent(new Event("start"))
            }
            stop() {
                this._worker.postMessage({
                    command: "done"
                })
            }
        }
        class c extends n {
            _createWorker(t) {
                var e = {
                        command: "init",
                        numberOfChannels: 1,
                        originalSampleRate: this._ctx.sampleRate,
                        encoderSampleRate: this._options.bitsPerSecond,
                        maxBuffersPerPage: 10,
                        encoderApplication: 2048
                    },
                    i = new Worker(`/js/${jsc("web/speech_worker_opus.js")}`);
                return i.addEventListener("message", t => {
                    this.eventTarget.dispatchEvent(new a("dataavailable", {
                        detail: t.data
                    })), 4 & t.data[5] && this.eventTarget.dispatchEvent(new Event("stop"))
                }), i.postMessage(e), i
            }
        }
        class h extends n {
            _createWorker() {
                var t = {
                        command: "init",
                        numberOfChannels: 1,
                        originalSampleRate: this._ctx.sampleRate
                    },
                    e = new Worker(`/js/${jsc("web/speech_worker_mp3.js")}`);
                return e.addEventListener("message", t => {
                    var e = t.data;
                    e.buffer && this.eventTarget.dispatchEvent(new a("dataavailable", {
                        detail: e.buffer
                    })), "finish" == e.type && this.eventTarget.dispatchEvent(new Event("stop"))
                }), e.postMessage(t), e
            }
        }
        var u = i("i/qW");
        Object(r.initFailBack)();
        class d {
            addEventListener(t, e, i) {
                this.eventTarget.addEventListener(t, e, i)
            }
            removeEventListener(t, e, i) {
                this.eventTarget.removeEventListener(t, e, i)
            }
            _onCreateStream(t) {
                return this._stream = t, this.source = this._ctx.createMediaStreamSource(t), this._aquireing = !1, this.source
            }
            constructor() {
                this._ctx = new AudioContext, this.eventTarget = document.createDocumentFragment(), this._stream = void 0, this._aquireing = !1, this.buffer = null, this.duration = 0, this.isRecording = !1, this._mimeType = ""
            }
            get mimeType() {
                return this._mimeType
            }
            aquireMicrophone() {
                if (!this._stream) {
                    if (!this._aquireing) {
                        this._aquireing = !0;
                        navigator.mediaDevices && (this._aquirePromise = navigator.mediaDevices.getUserMedia({
                            audio: {
                                mandatory: {},
                                optional: []
                            }
                        }).then(t => this._onCreateStream(t)))
                    }
                    return this._aquirePromise
                }
                return Promise.resolve(this._stream)
            }
            releaseMicrophone() {
                this._aquirePromise && (this._aquirePromise = null), this._stream && (this._stream.getTracks()[0].stop(), this._stream = null)
            }
            static selectMimeType() {
                if (window.MediaRecorder && window.MediaRecorder.isTypeSupported) {
                    for (var t = ["audio/webm;codec=opus", "audio/webm;codec=vorbis", "audio/ogg;codec=opus", "audio/ogg;codec=vorbis", "audio/webm", "audio/ogg", "audio/mpeg"], e = 0; e < t.length; e++)
                        if (window.MediaRecorder.isTypeSupported(t[e])) return t[e]
                } else
                    for (var i = ["audio/ogg;codecs=opus", "audio/mpeg"], s = document.createElement("audio"), r = 0; r < i.length; r++)
                        if (s.canPlayType(i[r])) return i[r];
                return !1
            }
            _createMediaRecorder() {
                var t, e = [],
                    i = {
                        bitsPerSecond: 16e3,
                        mimeType: d.selectMimeType()
                    };
                return window.MediaRecorder && i.mimeType ? t = new MediaRecorder(this._stream, i) : (i.mimeType || (i.mimeType = "audio/ogg;codecs=opus"), t = "audio/ogg;codecs=opus" == i.mimeType ? new c(this._stream, i) : new h(this._stream, i)), this._mimeType = i.mimeType, t.addEventListener("dataavailable", t => {
                    this.duration = Math.round((Date.now() - this._start) / 1e3), this.eventTarget.dispatchEvent(new Event("progress")), e.push(t.detail || t.data)
                }), t.addEventListener("start", () => {
                    this._start = Date.now()
                }), t.addEventListener("stop", () => {
                    this.isRecording = !1, this.buffer = new Blob(e, {
                        type: i.mimeType
                    }), this.wave = Object(u.fastResample)(this._waveData, 256), this.eventTarget.dispatchEvent(new Event("finish"))
                }), t
            }
            _createResampler() {
                if (!this._resampler) {
                    this._resampler = new u.Resampler({
                        srcSampleRate: this._ctx.sampleRate,
                        dstSampleRate: 1e3 / 60
                    });
                    var t = this.source.context.createScriptProcessor(4096, 1, 1);
                    t.onaudioprocess = t => {
                        var e = t.inputBuffer.getChannelData(0),
                            i = this._resampler.push(e);
                        i.length && (this._waveData = this._waveData.concat(i))
                    }, this._resamplerNode = t
                }
                this.source.connect(this._resamplerNode), this._resamplerNode.connect(this._ctx.destination), this._waveData = []
            }
            record() {
                return this.aquireMicrophone().then(() => {
                    this.isRecording = !0, this.buffer = null, this.duration = 0, this.mediaRecorder = this._createMediaRecorder(), this._createResampler(), this.mediaRecorder.start(1e3)
                })
            }
            stop() {
                this.mediaRecorder && (this.mediaRecorder.stop(), this.mediaRecorder = null, this.releaseMicrophone())
            }
            static isSupport() {
                return !(!window.AudioContext || !navigator.mediaDevices)
            }
        }
        var l = {
            blockWidth: 2,
            spacing: 1,
            visTime: 8,
            color: "#fff"
        };
        i("NO8f");
        var m = {
            blockWidth: 3,
            spacing: 2,
            color: "#6287AE"
        };
        var p = {
            lineWidth: 2,
            color: "#6287AE"
        };
        var _ = {
            pulseRate: 20
        };
        var g = {
            wave: class {
                _getOption(t) {
                    return this._options[t] || l[t]
                }
                _createWaveNode(t) {
                    var e = parseInt(this._width / (this._getOption("blockWidth") + this._getOption("spacing"))),
                        i = this._getOption("visTime") / e,
                        s = 0,
                        r = t.context.createScriptProcessor(2048, 1, 1);
                    return r.onaudioprocess = t => {
                        for (var e = t.inputBuffer.getChannelData(0), r = t.inputBuffer.duration / e.length, a = 0; a < e.length; a++) s += r, this._accum = Math.min(1, Math.max(this._accum, Math.abs(e[a]))), s > i && (++this.timeAccumIndex > this.timeAccumItems.length - 1 && (this.timeAccumIndex = 0), this.timeAccumItems[this.timeAccumIndex] = this._accum, this._accum = 0, s = 0)
                    }, this.timeAccumItems = new Array(e), this.timeAccumIndex = 0, t.connect(r), r.connect(t.context.destination), r
                }
                constructor(t, e, i) {
                    this._accum = 0, this._source = t, this._canvas = e;
                    var s = e.getBoundingClientRect();
                    e.width = s.right - s.left, e.height = s.bottom - s.top, this._width = e.width, this._height = e.height, this._ratio = function(t) {
                        var e = t.getContext("2d"),
                            i = e.backingStorePixelRatio || e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1,
                            s = (window.devicePixelRatio || 1) / i;
                        return s > 1 && (t.style.height = t.height + "px", t.style.width = t.width + "px", t.width *= s, t.height *= s), s
                    }(e), this._ctx = e.getContext("2d"), this._options = i || {}, this._accumNode = this._createWaveNode(t)
                }
                destroy() {
                    this.stop(), this._accumNode.disconnect(), this._source.connect(this._source.context.destination), this._node = null, this._canvas = null, this._source = null, this._ctx = null
                }
                start() {
                    this._stopped = !1, this._draw()
                }
                _draw() {
                    if (!this._stopped) {
                        var t, e, i = this.timeAccumIndex + 1,
                            s = 0;
                        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._ctx.fillStyle = this._getOption("color");
                        for (var r = 0; r < this.timeAccumItems.length; r++, i++) i >= this.timeAccumItems.length && (i = 0), s = this.timeAccumItems[i] * (this._height - 2) + 2, t = r * (this._getOption("blockWidth") + this._getOption("spacing")), e = (this._height - s) / 2, this._ctx.fillRect(t * this._ratio, e * this._ratio, this._getOption("blockWidth") * this._ratio, s * this._ratio);
                        window.requestAnimationFrame(() => {
                            this._draw()
                        })
                    }
                }
                stop() {
                    this._stopped = !0
                }
            },
            frequency: class {
                _getOption(t) {
                    return this._options[t] || m[t]
                }
                _createNode(t) {
                    var e = t.context.createAnalyser();
                    return e.fftSize = 1024, t.connect(e), e
                }
                constructor(t, e, i) {
                    this._source = t, this._canvas = e, this._ctx = e.getContext("2d"), this._options = i || {}, this._node = this._createNode(t)
                }
                destroy() {
                    this.stop(), this._source.disconnect(), this._node.disconnect(), this._node = null
                }
                start() {
                    this._stopped = !1, this._draw()
                }
                _draw() {
                    var t = this._getOption("spacing"),
                        e = this._getOption("blockWidth"),
                        i = this._canvas.getBoundingClientRect(),
                        s = i.right - i.left,
                        r = i.bottom - i.top,
                        a = Math.round(s / t),
                        o = new Uint8Array(this._node.frequencyBinCount);
                    this._node.getByteFrequencyData(o), this._ctx.clearRect(0, 0, s, r), this._ctx.fillStyle = "#F6D565", this._ctx.lineCap = "round";
                    var n = this._node.frequencyBinCount / a,
                        c = this._getOption("color");
                    "HSL" !== c && (this._ctx.fillStyle = c);
                    for (var h = 0; h < a; ++h) {
                        for (var u = 0, d = Math.floor(h * n), l = 0; l < n; l++) u += o[d + l] / 256;
                        u /= Math.ceil(n), "HSL" == c && (this._ctx.fillStyle = "hsl( " + Math.round(360 * h / a) + ", " + (50 + 50 * u) + "%, 50%)"), this._ctx.fillRect(h * (t + e), r, e, -u * r)
                    }
                    this._stopped || window.requestAnimationFrame(() => {
                        this._draw()
                    })
                }
                stop() {
                    this._stopped = !0
                }
            },
            time: class {
                _getOption(t) {
                    return this._options[t] || p[t]
                }
                _createNode(t) {
                    var e = t.context.createAnalyser();
                    return e.fftSize = 1024, t.connect(e), e
                }
                constructor(t, e, i) {
                    this._source = t, this._canvas = e, this._ctx = e.getContext("2d"), this._options = i || {}, this._node = this._createNode(t)
                }
                destroy() {
                    this.stop(), this._source.disconnect(), this._node.disconnect(), this._node = null
                }
                start() {
                    this._stopped = !1, this._draw()
                }
                _draw() {
                    var t = this._canvas.getBoundingClientRect(),
                        e = t.right - t.left,
                        i = t.bottom - t.top,
                        s = new Uint8Array(this._node.frequencyBinCount);
                    this._node.getByteTimeDomainData(s), this._ctx.clearRect(0, 0, e, i), this._ctx.strokeStyle = this._getOption("color"), this._ctx.lineWidth = this._getOption("lineWidth"), this._ctx.lineCap = "round";
                    var r = 0,
                        a = 1 * e / this._node.frequencyBinCount;
                    this._ctx.beginPath();
                    for (var o = 0; o < this._node.frequencyBinCount; o++) {
                        var n = s[o] / 128 * i / 2;
                        0 === o ? this._ctx.moveTo(r, n) : this._ctx.lineTo(r, n), r += a
                    }
                    this._ctx.stroke(), this._stopped || window.requestAnimationFrame(() => {
                        this._draw()
                    })
                }
                stop() {
                    this._stopped = !0
                }
            },
            pulse: class {
                _getOption(t) {
                    return this._options[t] || _[t]
                }
                _createWaveNode(t) {
                    var e = 1 / this._getOption("pulseRate"),
                        i = 0,
                        s = t.context.createScriptProcessor(2048, 1, 1);
                    return s.onaudioprocess = t => {
                        for (var s = t.inputBuffer.getChannelData(0), r = t.inputBuffer.duration / s.length, a = 0; a < s.length; a++) i += r, this._accum = Math.min(1, Math.max(this._accum, Math.abs(s[a]))), i > e && (i -= e, this._stopped ? setStyle(this._getOption("el"), {
                            transform: "scale(0.8)"
                        }) : setStyle(this._getOption("el"), {
                            transform: "scale(" + (.8 + .95 * Math.sqrt(this._accum)) + ")"
                        }), this._accum = 0, i = 0)
                    }, t.connect(s), s.connect(t.context.destination), s
                }
                constructor(t, e, i) {
                    this._accum = 0, this._source = t, this._options = i || {}, this._node = this._createWaveNode(t)
                }
                destroy() {
                    this.stop(), this._source.disconnect(), this._node.disconnect(), this._node = null
                }
                start() {
                    this._stopped = !1
                }
                stop() {
                    this._stopped = !0
                }
            }
        };
        var v = s.Promise,
            f = {
                isSupport: () => !(!window.AudioContext || !(navigator.getUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia)),
                getAvailableMicrophones: () => d.isSupport() ? d.getAvailableMicrophones() : v.resolve([]),
                newRecorder: () => (window.Promise || (window.Promise = v), new d),
                resample: (t, e, i) => Object(u.fastResample)(t, e, i),
                createVisualization: function(t, e, i, s) {
                    if (g[t]) {
                        if (e instanceof HTMLMediaElement) {
                            var r = new AudioContext;
                            (e = r.createMediaElementSource(e)).connect(r.destination)
                        }
                        return new g[t](e, i, s)
                    }
                }
            };
        window.Speech = f;
        try {
            stManager.done("speech.js")
        } catch (t) {}
    },
    g6Ay: function(t, e, i) {
        "use strict";
        i.r(e), i.d(e, "initFailBack", function() {
            return s
        });
        i("VRzm"), i("Btvt");

        function s() {
            var t = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.MediaDevices && window.MediaDevices.getUserMedia;
            t && !navigator.mediaDevices && (navigator.mediaDevices = navigator.mediaDevices || {}), navigator.mediaDevices && (navigator.mediaDevices.getUserMedia || (navigator.mediaDevices.getUserMedia = function(e) {
                return new Promise(function(i, s) {
                    t ? t.call(navigator, e, i, s) : s(new Error("NotSupported"))
                })
            }), navigator.mediaDevices.enumerateDevices || (navigator.mediaDevices.enumerateDevices = function() {
                return new Promise(function(t, e) {
                    if (MediaStreamTrack && MediaStreamTrack.getSources) {
                        var i = {
                            audio: "audioinput",
                            video: "videoinput"
                        };
                        return MediaStreamTrack.getSources(function(e) {
                            t(e.map(function(t) {
                                return {
                                    label: t.label,
                                    kind: i[t.kind],
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
    },
    "i/qW": function(t, e, i) {
        "use strict";
        i.r(e);
        i.d(e, "Resampler", function() {
            return r
        }), i.d(e, "fastResample", function() {
            return a
        });
        var s = {
            avg: class {
                constructor() {
                    this.clear()
                }
                push(t) {
                    this._count++, this._accum += t
                }
                get() {
                    return this._accum / this._count
                }
                clear() {
                    this._count = 0, this._accum = 0
                }
            },
            peak: class {
                constructor() {
                    this.clear()
                }
                push(t) {
                    this._max = Math.max(this._max, Math.abs(t))
                }
                get() {
                    return this._max
                }
                clear() {
                    this._max = 0
                }
            },
            quad: class {
                constructor() {
                    this.clear()
                }
                push(t) {
                    this._count++, this._accum += t, this._accum_q += t * t
                }
                get() {
                    return 1 == this._count ? this._accum : Math.sqrt((this._accum_q - this._accum * this._accum / this._count) / this._count)
                }
                clear() {
                    this._count = 0, this._accum = 0, this._accum_q = 0
                }
            }
        };
        class r {
            constructor(t) {
                this._normalizeAlgorithm = !1, s[t.normalizeAlgorithm] && (this._normalizeAlgorithm = new s[t.normalizeAlgorithm]), this._srcSampleRate = parseInt(t.srcSampleRate || 0), this._dstSampleRate = parseInt(t.dstSampleRate || 0), this._truncateTo = 1, void 0 !== t.truncateTo && (this._truncateTo = t.truncateTo), this._dstSampleRate > 0 ? this._sampleRate = this._srcSampleRate / this._dstSampleRate : this._sampleRate = 0, s[t.algorithm] || (t.algorithm = "peak"), this._algorithm = new s[t.algorithm], this._sampleCount = 0, this._data = []
            }
            push(t) {
                if (this._sampleRate <= 0) return [];
                for (var e, i = [], s = 0; s < t.length; s++)
                    if (this._truncateTo > 0 && (t[s] = Math.min(this._truncateTo, Math.abs(t[s]))), this._sampleCount += 1, this._sampleCount >= this._sampleRate)
                        for (; this._sampleCount >= this._sampleRate;) this._sampleCount -= this._sampleRate, this._sampleCount <= .8 && this._algorithm.push(t[s]), e = this._algorithm.get(), i.push(e), this._normalizeAlgorithm && this._normalizeAlgorithm.push(e), this._algorithm.clear(), this._sampleCount > .2 && this._algorithm.push(t[s]);
                    else this._algorithm.push(t[s]);
                if (this._normalizeAlgorithm) {
                    var r = this._normalizeAlgorithm.get();
                    if (this._normalizeAlgorithm.clear(), r > 0)
                        for (var a = 0; a < i.length; a++) i[a] = i[a] / r, this._truncateTo > 0 && (i[a] = Math.min(this._truncateTo, Math.abs(i[a])))
                }
                return i
            }
        }

        function a(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "peak";
            return new r({
                srcSampleRate: t.length,
                dstSampleRate: e,
                normalizeAlgorithm: i,
                truncateTo: 0
            }).push(t)
        }
    }
});