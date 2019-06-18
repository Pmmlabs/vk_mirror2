! function(t) {
    function e(e) {
        for (var s, r, n = e[0], l = e[1], h = e[2], d = 0, _ = []; d < n.length; d++) r = n[d], a[r] && _.push(a[r][0]), a[r] = 0;
        for (s in l) Object.prototype.hasOwnProperty.call(l, s) && (t[s] = l[s]);
        for (u && u(e); _.length;) _.shift()();
        return o.push.apply(o, h || []), i()
    }

    function i() {
        for (var t, e = 0; e < o.length; e++) {
            for (var i = o[e], s = !0, n = 1; n < i.length; n++) {
                var l = i[n];
                0 !== a[l] && (s = !1)
            }
            s && (o.splice(e--, 1), t = r(r.s = i[0]))
        }
        return t
    }
    var s = {},
        a = {
            "web/voice_message_player": 0
        },
        o = [];

    function r(e) {
        if (s[e]) return s[e].exports;
        var i = s[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, r), i.l = !0, i.exports
    }
    r.m = t, r.c = s, r.d = function(t, e, i) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
        })
    }, r.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, r.t = function(t, e) {
        if (1 & e && (t = r(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (r.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var s in t) r.d(i, s, function(e) {
                return t[e]
            }.bind(null, s));
        return i
    }, r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return r.d(e, "a", e), e
    }, r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "";
    var n = window.webpackJsonp = window.webpackJsonp || [],
        l = n.push.bind(n);
    n.push = e, n = n.slice();
    for (var h = 0; h < n.length; h++) e(n[h]);
    var u = l;
    o.push([162, "bundles/common"]), i()
}({
    162: function(t, e, i) {
        t.exports = i("3KRu")
    },
    "3KRu": function(t, e, i) {
        "use strict";
        i.r(e);
        i("KKXr"), i("Btvt"), i("pIFo");
        var s = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";
        class a {
            static isSupported(t) {
                var e = document.createElement("audio");
                return !!e.canPlayType && (t = t || 'audio/mpeg; codecs="mp3"', !!e.canPlayType(t).replace(/no/, ""))
            }
            constructor(t) {
                this.opts = t || {}, this._trackOptions = {}, this._audioNodes = [], this._currentAudioEl = this._createAudioNode(), this._prefetchAudioEl = this._createAudioNode()
            }
            get type() {
                return "html5"
            }
            get loaded() {
                return !0
            }
            destroy() {}
            getPlayedTime() {
                for (var t = this._currentAudioEl.played, e = 0, i = 0; i < t.length; i++) e += t.end(i) - t.start(i);
                return e
            }
            _setAudioNodeUrl(t, e) {
                window.data && data(t, "setUrlTimesetUrlTime", e == s ? 0 : vkNow()), t.src = e
            }
            _createAudioNode(t) {
                var e = new Audio,
                    i = this;
                return this.opts.onBufferUpdate && addEvent(e, "progress", function() {
                    i._currentAudioEl == e && i.opts.onBufferUpdate(i.getCurrentBuffered());
                    var t = e.buffered;
                    t.length;
                    1 == t.length && 0 == t.start(0) && t.end(0) == e.duration && (e._fullyLoaded = !0)
                }), addEvent(e, "stalled", function() {
                    i._currentAudioEl == e && i._isInvalidDuration() && i._currentAudioEl.currentTime >= i.duration - 1 && i._currentAudioEl.dispatchEvent(new Event("ended"))
                }), this.opts.onProgressUpdate && addEvent(e, "timeupdate", function() {
                    i._currentAudioEl == e && i.opts.onProgressUpdate(i.getCurrentProgress())
                }), this.opts.onEnd && addEvent(e, "ended", function() {
                    i._currentAudioEl == e && i.opts.onEnd()
                }), this.opts.onSeeked && addEvent(e, "seeked", function() {
                    i._currentAudioEl == e && i.opts.onSeeked()
                }), this.opts.onSeek && addEvent(e, "seeking", function() {
                    i._currentAudioEl == e && i.opts.onSeek()
                }), addEvent(e, "error", function() {
                    i._prefetchAudioEl == e ? i._prefetchAudioEl = i._createAudioNode() : i._currentAudioEl == e && i.opts.onFail && i.opts.onFail()
                }), addEvent(e, "canplay", function() {
                    if (window.data) {
                        var t = data(e, "setUrlTime");
                        t && (cur.audioLoadTimings = cur.audioLoadTimings || [], cur.audioLoadTimings.push(vkNow() - t), data(e, "setUrlTime", 0))
                    }
                    i._prefetchAudioEl, i._currentAudioEl == e && (i.opts.onCanPlay && i.opts.onCanPlay(), i._seekOnReady && (i.seek(i._seekOnReady), i._seekOnReady = !1))
                }), t && (this._setAudioNodeUrl(e, t), e.preload = "auto", e.volume = this._volume || 1, e.load()), this._audioNodes.push(e), e
            }
            onReady(t) {
                t(!0)
            }
            prefetch(t) {
                this._prefetchAudioEl && this._setAudioNodeUrl(this._prefetchAudioEl, s), this._prefetchAudioEl = this._createAudioNode(t)
            }
            seek(t) {
                var e = this._currentAudioEl;
                this.duration ? e.currentTime = this.duration * t : this._seekOnReady = t
            }
            setVolume(t) {
                void 0 === t && (t = this._currentAudioEl.volume), this._currentAudioEl.volume = t, this._prefetchAudioEl && (this._prefetchAudioEl.volume = t), this._volume = t
            }
            _isInvalidDuration() {
                var t = this._currentAudioEl;
                return isNaN(t.duration) || t.duration == 1 / 0 || 0 == t.duration
            }
            get duration() {
                var t = this._currentAudioEl,
                    e = isNaN(t.duration) || t.duration == 1 / 0 ? 0 : t.duration;
                return !e && this._trackOptions.duration && (e = parseInt(this._trackOptions.duration)), e
            }
            getCurrentProgress() {
                var t = this._currentAudioEl;
                return this.duration ? Math.max(0, Math.min(1, t.currentTime / this.duration)) : 0
            }
            getCurrentBuffered() {
                var t = this._currentAudioEl;
                return t && t.buffered.length ? Math.min(1, t.buffered.end(0) / t.duration) : 0
            }
            isFullyLoaded() {
                return this._currentAudioEl._fullyLoaded
            }
            setUrl(t, e) {
                var i = this._currentAudioEl;
                if (this._seekOnReady = !1, this._trackOptions = {}, e && "object" == typeof e && (this._trackOptions = e, e = e.callback), i.src == t) return this.opts.onCanPlay && this.opts.onCanPlay(), e && e(!0);
                if (this._prefetchAudioEl && this._prefetchAudioEl.readyState > a.STATE_HAVE_NOTHING)
                    if (this._prefetchAudioEl.src == t) {
                        this._currentAudioEl.pause(0), this._setAudioNodeUrl(this._currentAudioEl, s);
                        var o = this;
                        this._prefetchAudioEl.readyState >= a.STATE_HAVE_FUTURE_DATA && setTimeout(function() {
                            o.opts.onCanPlay && o.opts.onCanPlay()
                        }), i = this._currentAudioEl = this._prefetchAudioEl, this._prefetchAudioEl = !1
                    } else this._prefetchAudioEl.src && this._setAudioNodeUrl(this._prefetchAudioEl, s);
                return i.src != t && (this._setAudioNodeUrl(i, t), i.load()), e && e(!0)
            }
            play(t) {
                this._prefetchAudioEl.src == t && this._prefetchAudioEl.readyState > a.STATE_HAVE_NOTHING && (this._setAudioNodeUrl(this._currentAudioEl, s), this._currentAudioEl = this._prefetchAudioEl, this._prefetchAudioEl = this._createAudioNode(), this.opts.onCanPlay && this.opts.onCanPlay());
                var e = this._currentAudioEl;
                if (e.src) try {
                    e.play()
                } catch (t) {
                    debugLog("Audio: url set failed (html5 impl)")
                }
            }
            pause() {
                var t = this._currentAudioEl;
                t.src && t.pause()
            }
            stop() {
                var t = this._currentAudioEl;
                this._setAudioNodeUrl(t, s)
            }
            _setFadeVolumeInterval(t) {
                if (t) {
                    if (!this._fadeVolumeWorker && window.Worker && window.Blob) {
                        var e = new Blob(["         var interval;         onmessage = function(e) {           clearInterval(interval);           if (e.data == 'start') {             interval = setInterval(function() { postMessage({}); }, 20);           }         }       "]);
                        try {
                            this._fadeVolumeWorker = new Worker(window.URL.createObjectURL(e))
                        } catch (t) {
                            this._fadeVolumeWorker = !1
                        }
                    }
                    this._fadeVolumeWorker ? (this._fadeVolumeWorker.onmessage = t, this._fadeVolumeWorker.postMessage("start")) : this._fadeVolumeInterval = setInterval(t, 60)
                } else this._fadeVolumeWorker && (this._fadeVolumeWorker.terminate(), this._fadeVolumeWorker = null), this._fadeVolumeInterval && clearInterval(this._fadeVolumeInterval)
            }
            fadeVolume(t, e) {
                t = Math.max(0, Math.min(1, t));
                var i = this._currentAudioEl,
                    s = 0;
                if (s = t < i.volume ? -.04 : .001, Math.abs(t - i.volume) <= .001) return this._setFadeVolumeInterval(), e && e();
                var a = i.volume;
                this._setFadeVolumeInterval(function() {
                    s > 0 && (s *= 1.2), a += s;
                    if (s < 0 ? a <= t : a >= t) return this.setVolume(t), this._setFadeVolumeInterval(), e && e();
                    this.setVolume(a)
                }.bind(this))
            }
        }
        a.STATE_HAVE_NOTHING = 0, a.STATE_HAVE_FUTURE_DATA = 3, a.HAVE_ENOUGH_DATA = 4, a.AUDIO_EL_ID = "ap_audio";
        class o {
            constructor(t) {
                this.opts = t || {}, window._flashVoiceInstance = this
            }
            fadeVolume(t, e) {
                return this.setVolume(t), e()
            }
            get type() {
                return "flash"
            }
            destroy() {
                re(o.PLAYER_EL_ID)
            }
            get loaded() {
                return !!this._player
            }
            onReady(t) {
                if (this._player) return t(!0);
                if (!1 === this._player) return t(!1);
                this._onReady = t;
                ge(o.PLAYER_EL_ID) || document.body.appendChild(ce("div", {
                    id: o.PLAYER_EL_ID,
                    className: "fixed"
                }));
                var e = this;
                renderFlash(o.PLAYER_EL_ID, {
                    url: "/swf/audio_lite.swf",
                    id: "flash_voice_player",
                    height: 2
                }, {
                    swliveconnect: "true",
                    allowscriptaccess: "always",
                    wmode: "opaque"
                }, {
                    onPlayFinish: "VoicePlayerFlash.onAudioFinishCallback",
                    onLoadProgress: "VoicePlayerFlash.onAudioLoadProgressCallback",
                    onPlayProgress: "VoicePlayerFlash.onAudioProgressCallback"
                }) && setTimeout(function() {
                    e._checkFlashLoaded()
                }, 50)
            }
            setUrl(t, e) {
                this._trackOptions = {}, e && "object" == typeof e && (this._trackOptions = e, e = e.callback), this._url != t ? (this._url = t, this._player && this._player.loadAudio(t), e && e(!0)) : e && e(!0)
            }
            setVolume(t) {
                this._player && this._player.setVolume && this._player.setVolume(t)
            }
            play() {
                this._player && this._player.playAudio()
            }
            seek(t) {
                var e = (this._total || 0) * t;
                this._player && this._player.playAudio(e)
            }
            pause() {
                this._player && this._player.pauseAudio()
            }
            isFullyLoaded() {
                return !1
            }
            getPlayedTime() {
                return 0
            }
            getCurrentProgress() {
                return this._currProgress || 0
            }
            getCurrentBuffered() {
                return this._currBuffered || 0
            }
            stop() {
                this._player && this._player.stopAudio()
            }
            _checkFlashLoaded() {
                var t = ge("flash_voice_player");
                if (this._checks = this._checks || 0, this._checks++, this._checks > 10) return this._player = !1, (e = this._onReady) && e(!1);
                if (t && t.paused) {
                    var e;
                    this._player = t, (e = this._onReady) && e(!0), this._onReady = null
                } else {
                    var i = this;
                    setTimeout(function() {
                        i._checkFlashLoaded()
                    }, 100)
                }
            }
            static onAudioFinishCallback() {
                var t = window._flashVoiceInstance;
                t.opts.onEnd && t.opts.onEnd()
            }
            static onAudioProgressCallback(t, e) {
                var i = window._flashVoiceInstance;
                e && (i._total = e, i._currProgress = t / e, i.opts.onProgressUpdate && i.opts.onProgressUpdate(i._currProgress))
            }
            static onAudioLoadProgressCallback(t, e) {
                var i = window._flashVoiceInstance;
                i._currBuffered = t / e, i.opts.onBufferUpdate && i.opts.onBufferUpdate(i._currBuffered)
            }
        }
        window.VoicePlayerFlash = o, o.PLAYER_EL_ID = "flash_voice";
        var r = 35;
        void 0 === window.isTouch && (window.isTouch = !1);
        class n {
            constructor(t, e) {
                if (!t) throw new Error("No element was provided for Slider");
                t = ge(t), this.options = e || {
                    size: 1
                }, void 0 === this.options.logfbase && (this.options.logfbase = r), this.options.backValue = this.options.backValue || 0;
                var i = 100 * this.options.backValue,
                    s = '<div class="slider_slide"><div class="slider_loading_bar" style="opacity: 0; display: none;"></div> ' + (this.options.withBackLine ? '<div class="slider_back" style="width:' + i + '%"></div>' : "") + ' <div class="slider_amount"></div> <div class="slider_handler"></div> </div>';
                this._el = ce("div", {
                    innerHTML: s,
                    className: "slider",
                    id: t.getAttribute("id") || ""
                });
                var a = this;
                if (t.classList)
                    for (var o = t.classList, n = 0, l = o.length; n < l; n++) addClass(this._el, o[n]);
                else this._el.className = t.className;
                each(this._el.attributes, function(t, e) {
                    "id" == e.name && "class" == e.name || a._el.setAttribute(e.name, e.value)
                }), t.parentNode.replaceChild(this._el, t), this._amountEl = geByClass1("slider_amount", this._el), this._handlerEl = geByClass1("slider_handler", this._el), this._slideEl = geByClass1("slider_slide", this._el), this._backEl = geByClass1("slider_back", this._el), this._progressEl = geByClass1("slider_loading_bar", this._el), this.options.color && (setStyle(this._amountEl, {
                    backgroundColor: this.options.color
                }), setStyle(this._handlerEl, {
                    backgroundColor: this.options.color
                })), this.options.backColor && setStyle(this._slideEl, {
                    backgroundColor: this.options.backColor
                }), addClass(this._el, "slider_size_" + this.options.size), this.options.debounce && (this._onValueChangeDebounced = debounce(this._onValueChange, this.options.debounce)), !isTouch && e.formatHint && (addEvent(this._el, "mousemove", this._ev_onMouseOver = this._onMouseOver.bind(this)), addEvent(this._el, "mouseleave", this._ev_onMouseLeave = this._onMouseLeave.bind(this))), addEvent(this._el, isTouch ? "touchstart" : "mousedown", this._ev_onMouseDown = this._onMouseDown.bind(this)), addEvent(this._el, "click", cancelEvent), this.setValue(this.options.value || 0, !this.options.fireChangeEventOnInit, !1), this.setBackValue(this.options.backValue)
            }
            toggleLoading(t) {
                t = !!t, toggle(this._progressEl, t), setStyle(this._progressEl, "opacity", t ? 1 : 0)
            }
            destroy() {
                !isTouch && this.options.formatHint && (removeEvent(this._el, "mousemove", this._ev_onMouseOver), removeEvent(this._el, "mouseleave", this._ev_onMouseLeave), removeEvent(this._el, "mousedown", this._ev_onMouseDown));
                var t = window.re || window.remove;
                t(this._el), t(this._currHintEl)
            }
            _updateHint(t, e) {
                this._currHintEl || (this._currHintEl = ce("div", {
                    className: "slider_hint",
                    id: "slider_hint"
                }), this.options.hintClass && addClass(this._currHintEl, this.options.hintClass), this._el.appendChild(this._currHintEl));
                var i = this._getPos(),
                    s = Math.round((t.pageX || t.touches[0].pageX) - i[0]),
                    a = this._width;
                if ((s = e ? Math.min(Math.max(0, s), a) : s) >= 0 && s <= a) {
                    var o = s / a;
                    this._currHintEl.innerHTML = this.options.formatHint ? this.options.formatHint.call(this, o) : o;
                    var r = this._currHintEl.getBoundingClientRect();
                    setStyle(this._currHintEl, {
                        left: this._slideEl.offsetLeft + s - (r.right - r.left) / 2,
                        top: this._slideEl.offsetTop - (r.bottom - r.top) - 10
                    }), !e && this._toggleHint(!0)
                } else !e && this._toggleHint(!1);
                this.options.formatHint || this._toggleHint(!1)
            }
            _toggleHint(t) {
                toggleClass(this._currHintEl, "visible", t)
            }
            _onMouseOver(t) {
                n._currenSliderDrag || hasClass(this._el, "active") || this._updateHint(t)
            }
            _onMouseLeave(t) {
                hasClass(this._el, "active") || this._toggleHint(!1)
            }
            get _width() {
                if (!this._widthCache) {
                    var t = this._el.getBoundingClientRect();
                    this._widthCache = t.right - t.left
                }
                return this._widthCache
            }
            _onMouseDown(t) {
                (0 == t.button || t.touches) && (delete cur._sliderMouseUpNowEl, addEvent(window, isTouch ? "touchmove" : "mousemove", this._ev_onMouseMove = this._onMouseMove.bind(this)), addEvent(window, isTouch ? "touchend touchcancel" : "mouseup", this._ev_onMouseUp = this._onMouseUp.bind(this)), this._onMouseMove(t), n._currenSliderDrag = this, addClass(this._el, "active"), cancelEvent(t))
            }
            _onMouseUp(t) {
                cur._sliderMouseUpNowEl = this._el, removeEvent(window, isTouch ? "touchmove" : "mousemove", this._ev_onMouseMove), removeEvent(window, isTouch ? "touchend touchcancel" : "mouseup", this._ev_onMouseUp), this._onValueChange(), removeClass(this._el, "active"), n._currenSliderDrag = !1, this._toggleHint(!1), this.options.onEndDragging && this.options.onEndDragging(this._currValue), cancelEvent(t)
            }
            _onMouseMove(t) {
                var e = this._getPos(),
                    i = e[0];
                i = void 0 !== t.touches && t.touches.length > 0 ? t.touches[0].pageX : t.pageX, i = Math.max(i, e[0]), i = Math.min(i, e[0] + this._width), i -= e[0], this.setValue(i / this._width, !0, !0), this._onValueChangeDebounced ? this._onValueChangeDebounced() : this._onValueChange(), this._toggleHint(!0), this._updateHint(t, !0), cancelEvent(t)
            }
            _getPos() {
                return this._slidePos = getXY(this._slideEl)
            }
            _logf(t) {
                if (!this.options.log) return t;
                var e = this.options.logfbase;
                return (Math.pow(e, t) - 1) / (e - 1)
            }
            _unlogf(t) {
                if (!this.options.log) return t;
                var e = this.options.logfbase;
                return function(t, e) {
                    return Math.log(e) / Math.log(t)
                }(e, 1 + t * (e - 1))
            }
            setValue(t, e, i) {
                if (!hasClass(this._el, "active") || i) {
                    var s = i ? this._logf(t) : t;
                    if (this._currValue != s) {
                        this._currValue = s;
                        var a = i ? t : this._unlogf(t);
                        a = 100 * a + "%", setStyle(this._amountEl, {
                            width: a
                        }), setStyle(this._handlerEl, {
                            left: a
                        }), !e && this._onValueChange()
                    }
                }
            }
            setBackValue(t) {
                toggleClass(this._backEl, "slider_back_transition", t > this._backValue), this._backValue = t;
                var e = 100 * t + "%";
                setStyle(this._backEl, {
                    width: e
                })
            }
            _onValueChange() {
                this._lastValue = this._lastValue || 0, this._lastValue != this._currValue && (this._lastValue = this._currValue, this.options.onChange && this.options.onChange(this._currValue))
            }
        }
        var l, h = i("rEJs"),
            u = !1,
            d = '<div class="audio-msg-player audio-msg-track"><button class="audio-msg-track--btn"></button><div class="audio-msg-track--duration"></div><div class="audio-msg-track--wave-wrapper"><div class="audio-msg-track--slider"></div></div></div>';
        class _ {
            constructor({
                onListened: t
            } = {}) {
                this._reattach = !1, this._audioEl = null, this._playing = !1, this._timer = null, this._duration = 0, this._detaching = !1;
                var e = {
                    onEnd: () => {
                        this.detach()
                    },
                    onFail: () => {
                        e.onEnd()
                    },
                    onCanPlay: () => {},
                    onProgressUpdate: t => {
                        this._updateProgress(t)
                    }
                };
                l = !1, a.isSupported() ? (a.isSupported('audio/ogg;codecs="opus"') && !a.isSupported('audio/ogg;codecs="codec_check"') && (l = !0), this._impl = new a(e)) : browser.flash && window.renderFlash && (this._impl = new o(e)), this.onPlayPause = (t => (cancelEvent(t), this.toggle())), this.onDurationClick = (t => {
                    this.durationType = !this.durationType, cancelEvent(t)
                }), this._onListened = (() => {
                    t && t(this._audioEl)
                }), this._initEvents()
            }
            _updateProgress(t) {
                this._duration * t >= 1 && this._audioEl && !this._audioEl._listened && (this._audioEl._listened = !0, this._onListened()), this._durationEl && (this.durationType ? this._durationEl.innerHTML = "-" + formatTime(Math.round(this._duration * (1 - t))) : this._durationEl.innerHTML = formatTime(Math.round(this._duration * t))), this._progressSlider && this._progressSlider.setValue(t)
            }
            get type() {
                return this._impl.type
            }
            get durationType() {
                return window.AudioPlayer ? !!ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE) : "1" == lsGet("audio_time_left")
            }
            set durationType(t) {
                window.AudioPlayer ? ls.set(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE, !!t) : lsSet("audio_time_left", t ? "1" : "0")
            }
            _initInterface() {
                this._el = ce("div", {
                    innerHTML: d
                }).firstChild, window.getLang && attr(this._el, "aria-label", getLang("mail_audio_message")), this._playBtn = geByClass1("audio-msg-track--btn", this._el), window.getLang && attr(this._playBtn, "aria-label", getLang("global_audio_play")), this._durationEl = geByClass1("audio-msg-track--duration", this._el), this._durationEl.innerHTML = formatTime(this._duration), this._progressSlider = new n(geByClass1("audio-msg-track--slider", this._el), {
                    value: 0,
                    size: 0,
                    hintClass: "audio_player_hint",
                    formatHint: t => formatTime(Math.round(t * this._duration)),
                    onEndDragging: t => {
                        this._impl.seek(t)
                    }
                });
                var t = geByClass1("audio-msg-track--wave-wrapper", this._audioEl).children[0];
                geByClass1("slider_slide", this._el).appendChild(t.cloneNode(!0)), geByClass1("slider_amount", this._el).appendChild(t.cloneNode(!0)), addEvent(this._playBtn, "click", this.onPlayPause), addEvent(this._durationEl, "click", this.onDurationClick), this._audioEl.parentNode.appendChild(this._el)
            }
            _destroyInterface() {
                hide(this._el), this._audioEl.parentNode.removeChild(this._el), removeEvent(this._playBtn, "click", this.onPlayPause), this._progressSlider && (this._progressSlider.destroy(), this._progressSlider = null), this._playBtn = null, this._durationEl = null, this._el = null
            }
            attachTo(t) {
                if (this._audioEl != t) {
                    null != this._audioEl && (this._reattach = !0), this.detach(), this._audioEl = t, addClass(this._audioEl, "audio-msg-track_player-attached"), this._duration = attr(t, "data-duration"), this._initInterface();
                    var e = this._audioEl.id.split("_");
                    if (e && e.length > 1 && (this._owner_id = e[1]), this._reattach = !1, !this._impl.loaded) return new Promise((e, i) => {
                        this._impl.onReady(() => {
                            this._impl.setUrl(attr(t, l ? "data-ogg" : "data-mp3"), {
                                duration: this._duration,
                                callback: e
                            })
                        })
                    });
                    this._impl.setUrl(attr(t, l ? "data-ogg" : "data-mp3"), {
                        duration: this._duration
                    })
                }
                return !0
            }
            detach(t = !1) {
                if (this._audioEl && this._el && !this._detaching) {
                    if (t && this.isAttached()) return;
                    this._detaching = !0, this.stop(), this._destroyInterface(), removeClass(this._audioEl, "audio-msg-track_player-attached"), this._audioEl._listened = !1, this._audioEl = null
                }
                this._detaching = !1
            }
            play() {
                this._audioEl && (this._reattach || _.pauseGlobalMedia(), addClass(this._el, "audio-msg-track_playing"), window.getLang && attr(this._playBtn, "aria-label", getLang("global_audio_pause")), this._playing = !0, this._createTimer(), this._owner_id && statlogsValueEvent("audio_message_play", this._owner_id), this._impl.play())
            }
            pause() {
                this._audioEl && (!this._reattach && this._playing && _.resumeGlobalMedia(), window.getLang && attr(this._playBtn, "aria-label", getLang("global_audio_play")), removeClass(this._el, "audio-msg-track_playing"), this._playing = !1, this._impl.pause(), this._killTimer())
            }
            stop() {
                this.pause(), this._impl.stop()
            }
            toggle() {
                this._playing ? this.pause() : this.play()
            }
            _createTimer() {
                this._duration > 0 && (this._killTimer(), this._timer = setInterval(() => {
                    var t = this._impl.getCurrentProgress();
                    this._updateProgress(t)
                }, 100))
            }
            _killTimer() {
                this._timer && (clearInterval(this._timer), this._timer = null)
            }
            _initEvents() {
                window.ap ? ap.on(this, h.a.PLAY, () => {
                    delete ap.pausedByMsg, this.pause()
                }) : window.audio && audio.onPlay(() => {
                    delete audio.pausedByMsg, this.pause()
                }), window.Notifier && (Notifier.addRecvClbk("audio_start", "audio_msg", () => {
                    this.pause()
                }), Notifier.addRecvClbk("video_start", "audio_msg", () => {
                    this.pause()
                }))
            }
            isAttached() {
                if (this._audioEl) {
                    for (var t = this._audioEl; t.parentNode;) t = t.parentNode;
                    return !!t.body
                }
                return !1
            }
            static pauseGlobalMedia() {
                window.Notifier && (u = !0, Notifier.lcSend("video_start")), window.ap && ap.isPlaying() ? (ap.pause(), ap.pausedByMsg = !0) : window.audio && audio.playing && audio.playing() && (audio.pause(), audio.pausedByMsg = !0)
            }
            static resumeGlobalMedia() {
                window.Notifier && u && (u = !1, Notifier.lcSend("video_hide")), window.ap && ap.pausedByMsg ? (ap.play(), delete ap.pausedByMsg) : window.audio && audio.playing && audio.pausedByMsg && (audio.play(), delete audio.pausedByMsg)
            }
        }
        var c = i("i/qW"),
            p = null;

        function g(t) {
            for (var e = geByClass("audio-msg-track--wave-wrapper", t), i = 0, s = 0; s < e.length; s++) {
                try {
                    i = parseInt(window.getComputedStyle(e[s], null).getPropertyValue("width"))
                } catch (t) {
                    i = parseInt(e[s].currentStyle.width)
                }
                if (i > 0) break
            }
            return i
        }

        function m(t, e) {
            e = Math.round(e), t.length != e && (t = Object(c.b)(t, e));
            for (var i = "", s = 0, a = 0; a < t.length; a++) 0 == (s = Math.floor(10 * t[a] * .95)) && (s = .5), i += "M" + (3 * a + 1) + "," + (10 - s) + "v" + 2 * s + "Z";
            return `<svg class="audio-msg-track--wave" width="${3*t.length}px"><path d="${i}"></path></svg>`
        }

        function v() {
            for (var t = geByClass("audio-msg-track"), e = 0; e < t.length; e++) {
                var i = attr(t[e], "data-wave");
                hasClass(t[e], "audio-msg-player") && e > 0 && (i = attr(t[e - 1], "data-wave"));
                var s = g(t[e]);
                if (i && s) {
                    i = i.split(",");
                    for (var a = geByClass("audio-msg-track--wave", t[e]), o = m(i, s / 3), r = 0; r < a.length; r++) {
                        var n = ce("div", {
                            innerHTML: o
                        }).firstChild;
                        a[r].parentNode.replaceChild(n, a[r])
                    }
                }
            }
        }

        function f() {
            return p || (p = new _({
                onListened: t => {
                    AudioMessagePlayer.events.emit("listened", t)
                }
            })), p
        }
        addEvent(window, "orientationchange", () => setTimeout(v, 500)), window.mail && window.mail.onMessagesRepainted && (onDOMReady(v), window.mail.onMessagesRepainted(v)), window.AudioMessagePlayer = {
            loaded: !0,
            events: new EventEmitter,
            togglePlay: function(t, e) {
                var i = f(),
                    s = i.attachTo(t);
                !0 === s ? i.play() : s.then(() => {
                    i.play()
                })
            },
            detachPlayer: function(t) {
                f().detach(t)
            },
            pauseGlobalMedia: function() {
                _.pauseGlobalMedia()
            },
            resumeGlobalMedia: function() {
                _.resumeGlobalMedia()
            },
            redrawWaves: v,
            getWave: m
        };
        try {
            stManager.done("voice_message_player.js")
        } catch (t) {}
    },
    "i/qW": function(t, e, i) {
        "use strict";
        i.d(e, "a", function() {
            return a
        }), i.d(e, "b", function() {
            return o
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
        class a {
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
                    var a = this._normalizeAlgorithm.get();
                    if (this._normalizeAlgorithm.clear(), a > 0)
                        for (var o = 0; o < i.length; o++) i[o] = i[o] / a, this._truncateTo > 0 && (i[o] = Math.min(this._truncateTo, Math.abs(i[o])))
                }
                return i
            }
        }

        function o(t, e, i = "peak") {
            return new a({
                srcSampleRate: t.length,
                dstSampleRate: e,
                normalizeAlgorithm: i,
                truncateTo: 0
            }).push(t)
        }
    }
});