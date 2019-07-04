! function(e) {
    function t(t) {
        for (var s, l, n = t[0], o = t[1], h = t[2], u = 0, c = []; u < n.length; u++) l = n[u], a[l] && c.push(a[l][0]), a[l] = 0;
        for (s in o) Object.prototype.hasOwnProperty.call(o, s) && (e[s] = o[s]);
        for (d && d(t); c.length;) c.shift()();
        return r.push.apply(r, h || []), i()
    }

    function i() {
        for (var e, t = 0; t < r.length; t++) {
            for (var i = r[t], s = !0, n = 1; n < i.length; n++) {
                var o = i[n];
                0 !== a[o] && (s = !1)
            }
            s && (r.splice(t--, 1), e = l(l.s = i[0]))
        }
        return e
    }
    var s = {},
        a = {
            "web/videoplayer": 0
        },
        r = [];

    function l(t) {
        if (s[t]) return s[t].exports;
        var i = s[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, l), i.l = !0, i.exports
    }
    l.m = e, l.c = s, l.d = function(e, t, i) {
        l.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, l.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, l.t = function(e, t) {
        if (1 & t && (e = l(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (l.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var s in e) l.d(i, s, function(t) {
                return e[t]
            }.bind(null, s));
        return i
    }, l.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return l.d(t, "a", t), t
    }, l.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, l.p = "";
    var n = window.webpackJsonp = window.webpackJsonp || [],
        o = n.push.bind(n);
    n.push = t, n = n.slice();
    for (var h = 0; h < n.length; h++) t(n[h]);
    var d = o;
    r.push([161, "bundles/common"]), i()
}({
    161: function(e, t, i) {
        e.exports = i("bvfi")
    },
    QOPk: function(e, t, i) {
        "use strict";
        i.d(t, "a", function() {
            return s
        });
        var s = function() {
            var e = function() {
                    for (var e, t, i = [
                            ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                            ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                            ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                            ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                        ], s = 0, a = i.length, r = {}; s < a; s++)
                        if ((e = i[s]) && e[1] in document) {
                            for (s = 0, t = e.length; s < t; s++) r[i[0][s]] = e[s];
                            return r
                        }
                    return !1
                }(),
                t = {
                    request: function(t) {
                        var i = e.requestFullscreen;
                        (t = t || document.documentElement)[i]()
                    },
                    exit: function() {
                        document[e.exitFullscreen]()
                    },
                    toggle: function(e) {
                        this.isFullscreen ? this.exit() : this.request(e)
                    },
                    raw: e
                };
            return !!e && (Object.defineProperties(t, {
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
            }), t)
        }()
    },
    bvfi: function(e, t, i) {
        "use strict";
        i.r(t);
        var s = {};
        i.r(s), i.d(s, "_INIT_VIDEO", function() {
            return l
        }), i.d(s, "_DEINIT_VIDEO", function() {
            return n
        }), i.d(s, "_RESIZE", function() {
            return o
        }), i.d(s, "_DESTROY", function() {
            return h
        }), i.d(s, "STATE_CHANGE", function() {
            return d
        }), i.d(s, "QUALITIES_LIST_CHANGE", function() {
            return u
        }), i.d(s, "SUBTITLES_LIST_CHANGED", function() {
            return c
        }), i.d(s, "QUALITY_CHANGE", function() {
            return p
        }), i.d(s, "SUBTITLE_TRACK_CHANGED", function() {
            return g
        }), i.d(s, "SUBTITLE_CUE_CHANGE", function() {
            return v
        }), i.d(s, "FULLSCREEN_CHANGE", function() {
            return _
        }), i.d(s, "SEEK", function() {
            return m
        }), i.d(s, "EXPANDED", function() {
            return y
        }), i.d(s, "NEXT_TIMER_RESET", function() {
            return b
        }), i.d(s, "NEXT_TIMER_START", function() {
            return f
        }), i.d(s, "VIDEO_LIKE", function() {
            return S
        }), i.d(s, "VIDEO_SHARE", function() {
            return L
        }), i.d(s, "VIDEO_ADD", function() {
            return k
        }), i.d(s, "VIDEO_BOOKMARK", function() {
            return w
        }), i.d(s, "SUBSCRIBED", function() {
            return C
        }), i.d(s, "LIVE_PHASE_CHANGE", function() {
            return T
        }), i.d(s, "LIVE_DONATION", function() {
            return E
        }), i.d(s, "MEDIA_TIMEUPDATE", function() {
            return A
        }), i.d(s, "MEDIA_PROGRESS", function() {
            return P
        }), i.d(s, "MEDIA_VOLUMECHANGE", function() {
            return V
        }), i.d(s, "MEDIA_DURATIONCHANGE", function() {
            return x
        }), i.d(s, "MEDIA_WAITING", function() {
            return I
        }), i.d(s, "MEDIA_PLAYING", function() {
            return D
        }), i.d(s, "MEDIA_PAUSE", function() {
            return M
        }), i.d(s, "MEDIA_ENDED", function() {
            return R
        }), i.d(s, "MEDIA_ERROR", function() {
            return B
        }), i.d(s, "MEDIA_SEEKING", function() {
            return F
        }), i.d(s, "MEDIA_SEEKED", function() {
            return N
        }), i.d(s, "MEDIA_PROVIDER_CHANGE", function() {
            return H
        }), i.d(s, "MEDIA_LIVE_WARNING", function() {
            return O
        }), i.d(s, "MEDIA_HLS_LEVEL_LOADED", function() {
            return U
        }), i.d(s, "MEDIA_HLS_FRAG_LOADED", function() {
            return $
        }), i.d(s, "UI_SEEKSTART", function() {
            return z
        }), i.d(s, "UI_SEEKEND", function() {
            return Q
        }), i.d(s, "UI_CONTROLS_HIDE", function() {
            return q
        }), i.d(s, "UI_CONTROLS_SHOW", function() {
            return W
        }), i.d(s, "UI_STICKERS_PROMO_EVENT", function() {
            return G
        }), i.d(s, "UI_SUBTITLES_ENABLED_FROM_BTN", function() {
            return Y
        }), i.d(s, "UI_ACTION_BUTTON_CLICKED", function() {
            return K
        }), i.d(s, "UI_ACTION_BUTTON_SHOWN", function() {
            return j
        }), i.d(s, "ADS_WAITING", function() {
            return X
        }), i.d(s, "ADS_TIME_REMAINED", function() {
            return J
        }), i.d(s, "ADS_LINEAR_STARTED", function() {
            return Z
        }), i.d(s, "ADS_LINEAR_COMPLETED", function() {
            return ee
        }), i.d(s, "ADS_OVERLAY_STARTED", function() {
            return te
        }), i.d(s, "ADS_OVERLAY_COMPLETED", function() {
            return ie
        });
        var a = {};
        i.r(a), i.d(a, "WAITING", function() {
            return ae
        }), i.d(a, "STARTED", function() {
            return le
        }), i.d(a, "ENDED", function() {
            return ne
        }), i.d(a, "FAILED", function() {
            return oe
        }), i.d(a, "UPCOMING", function() {
            return he
        });
        i("pIFo"), i("KKXr"), i("a1Th"), i("Btvt");
        var r = i("qOki"),
            l = "_initVideo",
            n = "_deinitVideo",
            o = "_resize",
            h = "_destroy",
            d = "stateChange",
            u = "qualitiesListChange",
            c = "subtitlesListChanged",
            p = "qualityChange",
            g = "subtitleTrackChanged",
            v = "subtitleCueChange",
            _ = "fullscreenChange",
            m = "seek",
            y = "expanded",
            b = "nextTimerReset",
            f = "nextTimerStart",
            S = "videoLike",
            L = "videoShare",
            k = "videoAdd",
            w = "videoBookmark",
            C = "subscribed",
            T = "livePhaseChange",
            E = "liveDonation",
            A = "media.timeupdate",
            P = "media.progress",
            V = "media.volumechange",
            x = "media.durationchange",
            I = "media.waiting",
            D = "media.playing",
            M = "media.pause",
            R = "media.ended",
            B = "media.error",
            F = "media.seeking",
            N = "media.seeked",
            H = "media.providerChange",
            O = "media.liveWarning",
            U = "media.hlsLevelLoaded",
            $ = "media.hlsFragLoaded",
            z = "ui.seekstart",
            Q = "ui.seekend",
            q = "ui.controlsHide",
            W = "ui.controlsShow",
            G = "ui.stickersPromoEvent",
            Y = "ui.subtitlesEnabledFromBtn",
            K = "ui.actionButtonClicked",
            j = "ui.actionButtonShown",
            X = "ads.waiting",
            J = "ads.timeRemained",
            Z = "ads.linearStarted",
            ee = "ads.linearCompleted",
            te = "ads.overlayStarted",
            ie = "ads.overlayCompleted",
            ae = 1,
            le = 2,
            ne = 3,
            oe = 4,
            he = 5,
            de = -1,
            ue = 480,
            pe = 480,
            ve = 720,
            _e = [{
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

        function me(e, t) {
            for (var i of _e)
                if (e <= i.width && t <= i.height) return i.height;
            return t
        }

        function ye(e) {
            var t = _e[e];
            return t ? t.height : 0
        }
        i("rGqo"), i("Vd3H"), i("Oyvg");
        var be = function(e, t = {}) {
            var i = new XMLHttpRequest,
                s = new Promise((t, s) => {
                    i.onload = (() => {
                        t({
                            response: i.responseText,
                            details: i
                        })
                    }), i.onerror = (() => {
                        s(new Error("Request failed"))
                    }), i.onabort = (() => {
                        s(new Error("Request aborted"))
                    }), i.open("GET", e), i.send()
                });
            s.catch(e => {});
            return {
                promise: s,
                abort: () => {
                    i.abort()
                }
            }
        };
        class fe {
            constructor(e) {
                this._componentPlayerListeners = [], this._componentDomListeners = [], this._componentTimeouts = [], this._componentRequests = [], this.player = e, this.playerListen(l, (...e) => {
                    this.initVideo && this.initVideo(...e)
                }), this.playerListen(n, () => {
                    this.deinitVideo && this.deinitVideo()
                }), this.playerListen(o, (...e) => {
                    this.resize && this.resize(...e)
                }), this.playerListen(h, this.destroy)
            }
            domListen(e, t, i, {
                useCapture: s,
                context: a,
                once: r
            } = {}) {
                if (e && t && i && !(Se(this._componentDomListeners, e, t, i, s) > -1)) {
                    isString(e) && (e = domByClass(this.el, e));
                    var l = r ? r => (this.domUnlisten(e, t, i, {
                        useCapture: s
                    }), i.call(a || this, r)) : i.bind(a || this);
                    e.addEventListener(t, l, s), this._componentDomListeners.push({
                        elem: e,
                        type: t,
                        handler: i,
                        useCapture: s,
                        realHandler: l
                    })
                }
            }
            domListenOnce(e, t, i, s = {}) {
                return s.once = !0, this.domListen(e, t, i, s)
            }
            domUnlisten(e, t, i, {
                useCapture: s
            } = {}) {
                if (i && t) {
                    var a = Se(this._componentDomListeners, e, t, i, s);
                    Le(this._componentDomListeners, a)
                } else
                    for (var r = 0; this._componentDomListeners[r];) {
                        var l = this._componentDomListeners[r];
                        e !== l.elem || t && t !== l.type ? r++ : Le(this._componentDomListeners, r)
                    }
            }
            domUnlistenAll() {
                for (var e; e = this._componentDomListeners[0];) this.domUnlisten(e.elem, e.type, e.handler, {
                    useCapture: e.useCapture
                })
            }
            get tooltip() {
                return this.player.ui.playerTooltip
            }
            attachTooltip(e) {
                var t;
                isString(e.el) && (e.el = domByClass(this.el, e.el)), this.domListen(e.el, "mouseenter", () => {
                    this.tooltip.isVisible() || Date.now() - this.tooltip.lastShown < 100 ? this.tooltip.show(e) : t = setTimeout(() => this.tooltip.show(e), 1e3)
                }), this.domListen(e.el, "mouseleave", i => {
                    clearTimeout(t), e.hideDelay ? this.tooltip.hideWithDelay(e.hideDelay) : this.tooltip.hide()
                }), this.domListen(e.el, "click", i => {
                    clearTimeout(t), e.hideOnClick ? this.tooltip.hide() : setTimeout(() => this.tooltip.show(e), 0)
                })
            }
            playerListen(e, t, i = this) {
                var s = t.bind(i);
                this.player.on(e, s), this._componentPlayerListeners.push({
                    type: e,
                    handler: t,
                    realHandler: s
                })
            }
            playerUnlisten(e, t) {
                var i = function(e, t, i) {
                    var s = -1;
                    return each(e, (e, a) => {
                        if (a.type === t && a.handler === i) return s = e, !1
                    }), s
                }(this._componentPlayerListeners, e, t);
                if (!(i < 0)) {
                    var s = this._componentPlayerListeners[i];
                    this.player.off(e, s.realHandler), this._componentPlayerListeners.splice(i, 1)
                }
            }
            playerUnlistenAll() {
                for (var e; e = this._componentPlayerListeners[0];) this.playerUnlisten(e.type, e.handler)
            }
            getLang(e, t = {}, i = {}) {
                var s = this.player.langVars[e];
                return s ? (i.sex && (s = langSex(i.sex, s)), t && each(t, (e, t) => {
                    s = s.replace(new RegExp("{" + e + "}", "g"), t)
                }), s) : ""
            }
            getVars() {
                return this.player.vars || {}
            }
            getVar(e) {
                return this.getVars()[e]
            }
            delay(e, t, ...i) {
                var s = setTimeout(() => {
                    e.apply(this, i)
                }, t);
                return this._componentTimeouts.push(s), s
            }
            undelay(e) {
                if (e) {
                    clearTimeout(e);
                    var t = this._componentTimeouts.indexOf(e);
                    t >= 0 && this._componentTimeouts.splice(t, 1)
                }
            }
            request(e, t, i = !0) {
                var s = be(e, t);
                if (i) {
                    this._componentRequests.push(s);
                    var a = () => {
                        var e = this._componentRequests.indexOf(s);
                        e >= 0 && this._componentRequests.splice(e, 1)
                    };
                    s.promise.then(a).catch(a)
                }
                return s
            }
            clearComponentTimeouts() {
                each(this._componentTimeouts, (e, t) => {
                    clearTimeout(t)
                }), this._componentTimeouts = []
            }
            abortAllRequests() {
                each(this._componentRequests, (e, t) => {
                    t.abort()
                }), this._componentRequests = []
            }
            destroy() {
                this.playerUnlistenAll(), this.domUnlistenAll(), this.clearComponentTimeouts(), this.abortAllRequests()
            }
        }

        function Se(e, t, i, s, a) {
            var r = -1;
            return each(e, (e, l) => {
                if (l.elem === t && l.type === i && l.handler === s && l.useCapture === a) return r = e, !1
            }), r
        }

        function Le(e, t) {
            var i = e[t];
            i && (i.elem.removeEventListener(i.type, i.realHandler, i.useCapture), e.splice(t, 1))
        }

        function ke(e, t, i, s, a, r, l) {
            try {
                var n = e[r](l),
                    o = n.value
            } catch (e) {
                return void i(e)
            }
            n.done ? t(o) : Promise.resolve(o).then(s, a)
        }
        var we = "stats.vk-portal.net",
            Ce = "5d04",
            Te = "5d05",
            Ee = "5d10",
            Ae = "5d31",
            Pe = "5d41",
            Ve = ["play", "pause", "resume", "stop", "seek", "buf_start", "buf_stop", "heartbeat", "bitrate_change", "error"],
            xe = 100,
            Ie = 3e4;
        class De {
            constructor(e, t) {
                this.player = e, this.media = t, this.gotNetworkStatus = !1, this.supported = !0, this.paused = !1, this.stopped = !0, this.eventsQueue = []
            }
            init(e, t, i, s) {
                this.svcid = t ? s ? Ae : Te : i ? Ee : s ? Pe : Ce, this.inited || (this.cid = e, this.inited = !0, this.getNetworkStatus().then(e => {
                    this.onNetworkStatusReceived(e.supported)
                }).catch(() => {
                    this.onNetworkStatusReceived(!1)
                }))
            }
            reset() {
                this.flushEventsQueue(), this.stopHeartbeats(), this.paused = !1, this.stopped = !0, this.bufStarted = 0
            }
            enable(e) {
                this.enabled = e
            }
            getNetworkStatus() {
                var e = this;
                return function(e) {
                    return function() {
                        var t = this,
                            i = arguments;
                        return new Promise(function(s, a) {
                            var r = e.apply(t, i);

                            function l(e) {
                                ke(r, s, a, l, n, "next", e)
                            }

                            function n(e) {
                                ke(r, s, a, l, n, "throw", e)
                            }
                            l(void 0)
                        })
                    }
                }(function*() {
                    var t = e.sendRequest("network_status", {
                            svcid: e.svcid,
                            cid: e.cid,
                            client: e.getClientData()
                        }),
                        {
                            response: i
                        } = yield t.promise;
                    return JSON.parse(i)
                })()
            }
            onNetworkStatusReceived(e) {
                this.supported = e, this.gotNetworkStatus = !0, e ? this.flushEventsQueue() : this.clearEventsQueue()
            }
            triggerEvent(e) {
                if (this.supported && this.enabled && inArray(e, Ve) && this.player.isInited() && (!this.stopped || "play" == e)) {
                    "play" != e || this.stopped || (e = "resume");
                    var t = null;
                    switch (e) {
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
                            t = Date.now() - this.bufStarted, this.bufStarted = 0
                    }
                    var i = this.paramString({
                        type: e,
                        seq: ++this.seq,
                        ts: Date.now(),
                        tz: -60 * (new Date).getTimezoneOffset(),
                        pos: this.media.curTime(),
                        buffer: this.media.getBufferPercent(),
                        bytes: this.media.getLoadedBytes(),
                        bitrate: this.media.getBitrate(),
                        buf_num: "buf_start" == e ? ++this.buf_num : "buf_stop" == e ? this.buf_num : null,
                        buf_time: t,
                        load_state: this.bufStarted ? "buffering" : null,
                        err: "error" == e ? this.media.getErrorCode() : null
                    });
                    this.eventsQueue.push(i), this.gotNetworkStatus && (clearTimeout(this.flushTimeout), this.eventsQueue.length > 10 || "bitrate_change" == e ? this.flushEventsQueue() : this.flushTimeout = setTimeout(this.flushEventsQueue.bind(this), xe))
                }
            }
            flushEventsQueue() {
                this.gotNetworkStatus && this.supported && this.eventsQueue.length && this.sendRequest("notify", {
                    svcid: this.svcid,
                    cid: this.cid,
                    wid: this.wid,
                    client: this.getClientData(),
                    co: this.getContentData(),
                    ev: this.eventsQueue
                }), this.clearEventsQueue()
            }
            clearEventsQueue() {
                this.eventsQueue.length = 0
            }
            startHeartbeats() {
                clearInterval(this.heartbeatInterval), this.heartbeatInterval = setInterval(() => {
                    this.triggerEvent("heartbeat")
                }, Ie)
            }
            stopHeartbeats() {
                clearInterval(this.heartbeatInterval)
            }
            sendRequest(e, t) {
                var i = `https://${we}/uxzoom/1/${e}?` + this.queryString(t);
                return be(i)
            }
            getClientData() {
                return this.paramString({
                    player: "HTML5"
                })
            }
            getContentData() {
                return this.paramString({
                    duration: this.media.getDuration() || this.player.vars.duration,
                    quality: this.player.isAutoQualityEnabled() ? 100 : 2 + this.player.getQualityIndex(),
                    host: this.media.getContentHost(),
                    id: this.player.getVideoId()
                })
            }
            paramString(e) {
                var t = [];
                return each(e, (e, i) => {
                    null != i && t.push(e + "=" + i)
                }), t.join(",")
            }
            queryString(e) {
                var t = [];
                return each(e, (e, i) => {
                    isArray(i) || (i = [i]), each(i, (i, s) => {
                        t.push(encodeURIComponent(e) + "=" + encodeURIComponent(s))
                    })
                }), t.join("&")
            }
            destroy() {
                this.reset()
            }
        }
        class Me extends fe {
            constructor(e) {
                super(e);
                var t = e.getVars();
                this.el = this.buildEl(t), this.initListeners(), this._delaySeek = 0
            }
            buildEl(e) {
                var t = ce("video", {
                    preload: e.is_embed ? "none" : "metadata",
                    className: "videoplayer_media_provider"
                });
                return attr(t, "tabindex", -1), attr(t, "aria-hidden", "true"), t
            }
            initListeners() {
                this.domListen(this.el, "loadedmetadata", () => {
                    this._delaySeek && (this.currentTime = this._delaySeek, this._delaySeek = 0)
                })
            }
            play() {
                var e = this.el.play();
                e && e.catch(e => {
                    e && "NotAllowedError" == e.name && this.player.pause()
                })
            }
            pause() {
                this.el.pause()
            }
            set src(e) {
                this.el.src = e
            }
            get src() {
                return this.el.src
            }
            get currentSrc() {
                return this.el.currentSrc || this.src
            }
            get error() {
                return this.el.error
            }
            load() {
                return this.el.load()
            }
            set currentTime(e) {
                this.el.readyState ? this.el.currentTime = e : this._delaySeek = e
            }
            get currentTime() {
                return this.el.readyState ? this.el.currentTime : this._delaySeek
            }
            get duration() {
                return this.el.duration
            }
            set volume(e) {
                this.el.muted = !e, this.el.volume = e
            }
            get volume() {
                return this.el.volume
            }
            set loop(e) {
                this.el.loop = e
            }
            get loop() {
                return this.el.loop
            }
            canChangePlaybackRate() {
                return !!this.el.playbackRate
            }
            set playbackRate(e) {
                this.el.playbackRate = e
            }
            get playbackRate() {
                return this.el.playbackRate
            }
            get videoRatio() {
                if (this.el.videoWidth && this.el.videoHeight) return this.el.videoWidth / this.el.videoHeight
            }
            get readyState() {
                return this.el.readyState
            }
            get buffered() {
                return this.el.buffered
            }
            get played() {
                return this.el.played
            }
            reset() {
                this.el.pause(), this.el.src = "", this.el.load()
            }
            destroy() {
                super.destroy(), this.reset()
            }
        }
        var Re = {
                set(e, t) {
                    try {
                        localStorage.setItem(e, JSON.stringify(t))
                    } catch (e) {}
                },
                get(e) {
                    try {
                        return JSON.parse(localStorage.getItem(e))
                    } catch (e) {
                        return null
                    }
                },
                getByPrefix(e) {
                    for (var t = {}, i = localStorage.length, s = 0; s < i; s++) {
                        var a = localStorage.key(s);
                        0 === a.indexOf(e) && (t[a] = this.get(a))
                    }
                    return t
                },
                remove(e) {
                    try {
                        localStorage.removeItem(e)
                    } catch (e) {}
                },
                savePref(e, t) {
                    for (var i = this.getPref("*"), s = i, a = e.split(".");;) {
                        var r = a.shift();
                        if (!a.length) {
                            s[r] = t;
                            break
                        }
                        null == s[r] && (s[r] = {}), s = s[r]
                    }
                    this.set("videoplayer_prefs", i)
                },
                deletePref(e) {
                    this.savePref(e, void 0)
                },
                getPref(e = "*") {
                    var t = this.get("videoplayer_prefs") || {};
                    if ("*" === e) return t;
                    for (var i = t, s = e.split(".");;) {
                        if (i = i[s.shift()], !s.length || !i) break
                    }
                    return i
                }
            },
            Be = 5e3,
            Fe = 5,
            Ne = 1,
            He = 2,
            Oe = 6e3,
            Ue = 3e3;
        class $e extends Me {
            constructor(e) {
                super(e), this._fragLoadedBytes = this._fragLoadingBytes = 0, this._fragsTracksFlags = [], this._fragLoopErrorCount = 0, this._curFragSeqNum = 0, this._errors = [], this._duration = 0, this.initHls(), this.initHlsLoadStat(), this.initFragLoadingStuckHandler(), this.initTracksChangeHandler()
            }
            initListeners() {
                this.domListen(this.el, "error", this.onVideoError), this.domListen(this.el, "loadedmetadata", this.onDurationChange.bind(this, "meta")), this.domListen(this.el, "durationchange", this.onDurationChange.bind(this, "change"))
            }
            initHls() {
                var e = {
                    autoStartLoad: !1,
                    capLevelToPlayerSize: !0,
                    debug: !!window.nav.objLoc.video_debug
                };
                this.getVar("hls_candy_server") && window.Candy ? this.hls = new window.Candy.hlsjsWrapper(Hls, e, {
                    server: this.getVar("hls_candy_server"),
                    videoId: this.player.getVideoId()
                }) : this.hls = new Hls(e), this.hls.attachMedia(this.el), this.hls.on(Hls.Events.MANIFEST_LOADED, this.onManifestLoaded.bind(this)), this.hls.on(Hls.Events.LEVEL_SWITCHED, this.onLevelSwitch.bind(this)), this.hls.on(Hls.Events.ERROR, this.onHlsError.bind(this)), this.hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated.bind(this)), this.hls.on(Hls.Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch.bind(this))
            }
            initHlsLoadStat() {
                this.hls.on(Hls.Events.LEVEL_LOADED, (e, t) => {
                    var i = Math.round(t.stats.tload - t.stats.trequest) / 1e3,
                        s = this.hls.levels[t.level],
                        a = me(s.width, s.height),
                        r = t.details.url.split("?")[0];
                    this.player.trigger(U, {
                        time: i,
                        quality: a,
                        url: r
                    })
                }), this.hls.on(Hls.Events.FRAG_LOADED, (e, t) => {
                    if ("main" === t.frag.type) {
                        var i = Math.round(t.stats.tload - t.stats.trequest) / 1e3,
                            s = this.hls.levels[t.frag.level],
                            a = me(s.width, s.height),
                            r = (t.networkDetails.responseURL || t.frag._url).split("?")[0];
                        this.player.trigger($, {
                            time: i,
                            quality: a,
                            url: r
                        })
                    }
                })
            }
            initFragLoadingStuckHandler() {
                this.hls.on(Hls.Events.FRAG_LOAD_PROGRESS, (e, t) => {
                    "main" === t.frag.type && (this._fragLoadingBytes = t.frag.loaded, this.undelayRecoverNetwork(), this._ignoreFragLoadStuck || this.delayRecoverNetwork(Be))
                }), this.hls.on(Hls.Events.FRAG_LOADED, (e, t) => {
                    "main" === t.frag.type && (this._fragLoadedBytes += t.frag.loaded, this._fragLoadingBytes = 0, this.undelayRecoverNetwork())
                })
            }
            initTracksChangeHandler() {
                this.hls.on(Hls.Events.FRAG_PARSING_DATA, (e, t) => {
                    this._fragsTracksFlags[t.frag.sn] || (this._fragsTracksFlags[t.frag.sn] = 0), "video" == t.type && (this._fragsTracksFlags[t.frag.sn] |= Ne), "audio" == t.type && (this._fragsTracksFlags[t.frag.sn] |= He)
                }), this.hls.on(Hls.Events.FRAG_CHANGED, (e, t) => {
                    this._fragsTracksFlags[this._curFragSeqNum] && this._fragsTracksFlags[t.frag.sn] && this._fragsTracksFlags[this._curFragSeqNum] != this._fragsTracksFlags[t.frag.sn] && (this.player.debugLog("switching to fragment with different tracks", {
                        force: !0
                    }), this.recoverMedia()), this._curFragSeqNum = t.frag.sn
                })
            }
            onManifestLoaded(e, t) {
                var i = this.player.getAvailableQualities();
                if (this.player.trigger(u, i), !this.manifestLoaded && i.length) {
                    this.manifestLoaded = !0;
                    var s = this.player.preferredQuality,
                        a = Re.getPref("abr_disabled") && !this.player.isFromAutoplay() || this.getVar("hd_def") >= 0;
                    if (!a) {
                        var r = this.player.getPreloadedQuality(),
                            l = Re.getPref("abr_quality");
                        s = r || l || s, this.getVar("is_inline") && (s = Math.min(s, pe))
                    }
                    var n = Math.max(...i);
                    s = Math.min(s, n);
                    var o = this.getLevelIndexForQuality(s);
                    this.hls.startLevel = o, a && this.setCurrentLevel(o), this.player.onQualityChanged(s), this.getVar("live") && this.hls.levels.length > 1 && this.capLiveLevels(), this.needLoad && this.load(), a || this.player.isActiveLive() || this.forceNextLevel(o)
                }
            }
            onLevelSwitch(e, t) {
                var i = this.hls.levels[t.level],
                    s = me(i.width, i.height);
                if (this.player.onQualityChanged(s), this.hls.autoLevelEnabled && this.hls.levels.length > 1 && s) {
                    var a = Re.getPref("abr_quality");
                    (s < Math.max(...this.getAvailableQualities()) || s > a) && Re.savePref("abr_quality", s)
                }
            }
            onVideoError(e) {
                var t = this.el.error;
                t.code === t.MEDIA_ERR_DECODE && (this.recoverMedia() || this.onFatalError())
            }
            onHlsError(e, t) {
                var i = [Hls.ErrorDetails.BUFFER_APPENDING_ERROR],
                    s = [Hls.ErrorDetails.BUFFER_STALLED_ERROR, Hls.ErrorDetails.BUFFER_SEEK_OVER_HOLE],
                    a = t.fatal || inArray(t.details, i);
                if (!a && t.details == Hls.ErrorDetails.FRAG_LOOP_LOADING_ERROR && ++this._fragLoopErrorCount > Fe && (a = !0, this._fragLoopErrorCount = 0), inArray(t.details, s) || this.player.debugLog(["hls", t.type, t.details], {
                        force: !0,
                        type: a ? "error" : "warn"
                    }), this._errors.push(`[${this.currentTime}] ${t.details}`), t.details === Hls.ErrorDetails.FRAG_LOAD_ERROR && this.undelayRecoverNetwork(), a) {
                    var r = !1;
                    this.player.isActiveLive() ? (r = !0, t.type === Hls.ErrorTypes.MEDIA_ERROR ? this.delay(this.recoverMedia, Oe) : t.type === Hls.ErrorTypes.NETWORK_ERROR && this.delayRecoverNetwork(Oe)) : r = this.recoverMedia(), r || this.onFatalError(t)
                }
            }
            onFatalError(e) {
                this.getVar("live") && !this.getVar("postlive_mp4") ? this.player.media.onError() : (e && ajax.post("al_video.php?act=hls_fail_stat", {
                    hash: this.getVar("action_hash"),
                    video: this.player.getVideoId(),
                    error: e.details,
                    response_code: e.response ? e.response.code : "",
                    url: e.frag && e.frag.url || e.context && e.context.url
                }, {}), this.player.debugLog("reinit without hls", {
                    force: !0
                }), this.player.reinitWithoutHls())
            }
            recoverMedia() {
                return !(Date.now() - intval(this._lastMediaRecoverTry) < Ue) && (this._lastMediaRecoverTry = Date.now(), this.player.debugLog("trying to recover hls media", {
                    force: !0
                }), this.player.isActiveLive() ? this.restartLive() : this.hls.recoverMediaError(), this.player.media.isPlayingMedia() && this.play(), !0)
            }
            recoverNetwork() {
                return !(Date.now() - intval(this._lastNetworkRecoverTry) < Ue) && (this._lastNetworkRecoverTry = Date.now(), this.player.debugLog("trying to recover hls network", {
                    force: !0
                }), this.player.isActiveLive() ? this.restartLive() : this.hls.startLoad(), this.player.media.isPlayingMedia() && this.play(), !0)
            }
            delayRecoverNetwork(e = 0) {
                this.recoverNetworkTimeoutId || (this.recoverNetworkTimeoutId = this.delay(() => {
                    delete this.recoverNetworkTimeoutId, this.recoverNetwork()
                }, e))
            }
            undelayRecoverNetwork() {
                this.undelay(this.recoverNetworkTimeoutId), delete this.recoverNetworkTimeoutId
            }
            restartLive() {
                var e = this.hls.url || this._src;
                e && (this.reset(), this.src = e)
            }
            setCurrentLevel(e) {
                this.hls.currentLevel = e
            }
            filterLiveLevels(e) {
                var t;
                return each(e, (e, i) => {
                    var s = i.url && i.url[0];
                    if (/source/.test(s)) return t = i, !1
                }), t && (e = e.filter(e => e.height < t.height)).push(t), e
            }
            capLiveLevels() {
                each(this.hls.levels, (e, t) => {
                    var i = t.url && t.url[0];
                    if (/source/.test(i)) return this.hls.autoLevelCapping = e, !1
                })
            }
            forceNextLevel(e) {
                var t = this.hls;
                t.on(Hls.Events.FRAG_LOADED, function i(s, a) {
                    "main" === a.frag.type && ((a.frag.sn > 2 || !t.autoLevelEnabled) && t.off(Hls.Events.FRAG_LOADED, i), t.autoLevelEnabled && a.frag.level == e && (t.nextLoadLevel = e))
                })
            }
            setQuality(e) {
                e == de ? (this.setCurrentLevel(-1), Re.deletePref("abr_disabled")) : (this.setCurrentLevel(this.getLevelIndexForQuality(e)), Re.savePref("abr_disabled", 1))
            }
            getQuality() {
                if (this.hls.levels) {
                    var e = this.hls,
                        t = e.levels,
                        i = t[e.currentLevel] || t[e.loadLevel] || t[e.startLevel];
                    if (i && i.width && i.height) return me(i.width, i.height)
                }
                return 0
            }
            getAvailableQualities() {
                var e = this.hls.levels || [];
                return this.getVar("live") && (e = this.filterLiveLevels(e)), e.length > 1 && (e = e.filter(e => e.width && e.height)), e.map(e => me(e.width, e.height))
            }
            isAutoQualityAvailable() {
                return this.hls.levels && this.hls.levels.length > 1
            }
            isAutoQualityEnabled() {
                return this.hls.autoLevelEnabled
            }
            getLevelIndexForQuality(e) {
                var t = -1;
                return each(this.hls.levels || [], (i, s) => {
                    if (me(s.width, s.height) == e) return t = i, !1
                }), t
            }
            getAvailableSubtitleTracksInfo() {
                return this.hls.subtitleTrackController.tracks || []
            }
            getSubtitleTrack() {
                return this.hls.subtitleTrack
            }
            switchSubtitleTrack({
                trackId: e
            }) {
                this.hls.subtitleTrack = e
            }
            onSubtitleTracksUpdated(e, t) {
                var i = t.subtitleTracks;
                this.player.trigger(c, i)
            }
            onSubtitleTrackSwitch(e, t) {
                var i = t.id,
                    s = this.getAvailableSubtitleTracksInfo(),
                    a = null;
                if (-1 !== i)
                    for (var r of (this.el.textTracks[i].mode = "hidden", this.el.textTracks[i].oncuechange = (e => {
                            this.player.trigger(v, e.target.activeCues)
                        }), s))
                        if (i === r.id) {
                            a = r;
                            break
                        }
                this.player.trigger(g, s, a)
            }
            set src(e) {
                this._src = e, this.hls.loadSource(e)
            }
            load() {
                this.startedLoading || (this.manifestLoaded ? (this.hls.startLoad(this._delaySeek || -1), this.hls.config.autoStartLoad = !0, this.startedLoading = !0) : this.needLoad = !0)
            }
            play() {
                this.startedLoading || this.load(), super.play()
            }
            pauseLoad() {
                this.hls.stopLoad()
            }
            resumeLoad() {
                this.hls.startLoad(), this.hls.detachMedia(), this.hls.attachMedia(this.el)
            }
            reset() {
                this._ignoreFragLoadStuck = !0, this.undelayRecoverNetwork(), this.hls.detachMedia(), super.reset(), this.hls.attachMedia(this.el)
            }
            destroy() {
                super.destroy(), this.hls.destroy(), this.hls = null
            }
            getLoadedBytes() {
                return intval(this._fragLoadedBytes) + intval(this._fragLoadingBytes)
            }
            getCurLevel() {
                if (this.hls.levels) {
                    var e = 0;
                    return this.hls.levels.length > 1 && (e = this.getLevelIndexForQuality(this.player.getQuality())), this.hls.levels[e]
                }
            }
            getBitrate() {
                var e = this.getCurLevel();
                if (e) return e.bitrate / 1e3
            }
            getContentUrl() {
                var e = this.getCurLevel();
                if (e) return e.url[0]
            }
            getErrorsLog() {
                return this._errors.join(", ")
            }
            onDurationChange(e) {
                var t = this.el.duration;
                if (browser.safari && this._duration && "change" === e && parseInt((t - this._duration) / t * 100) > 10) return;
                this._duration = t
            }
            get duration() {
                return this._duration
            }
        }

        function ze(e, t, i = 0, s = e.length) {
            if (Array.prototype.fill) return Array.prototype.fill.call(e, t, i, s);
            i = i < 0 ? Math.max(e.length + i, 0) : Math.min(i, e.length), s = s < 0 ? Math.max(e.length + s, 0) : Math.min(s, e.length);
            for (var a = i; a < s; ++a) e[a] = t;
            return e
        }

        function Qe(e, t) {
            "textContent" in Node.prototype ? e.textContent = t : e.innerText = t
        }

        function qe(e) {
            var t = ce("div");
            if ("string" == typeof t.style[e]) return e;
            for (var i, s = ["webkit", "moz", "ms"], a = e.charAt(0).toUpperCase() + e.slice(1), r = 0; i = s[r]; r++) {
                var l = i + a;
                if ("string" == typeof t.style[l]) return l
            }
            return null
        }
        var We = function(e) {
            return function(t) {
                return t + e++
            }
        }(0);
        class Ge extends Me {
            constructor(e) {
                super(e), this._delaySrc = !1, this._delaySeek = 0, this._volume = 1, this._currentTime = 0, this._duration = 0, this._loop = !1, this._played = []
            }
            buildEl(e) {
                var t = ce("div");
                renderFlash(t, {
                    url: "/swf/video_lite.swf",
                    id: We("flashprovider"),
                    version: 11,
                    preventhide: 1
                }, {
                    bgcolor: "#000000",
                    allowscriptaccess: "always",
                    allowfullscreen: "true",
                    wmode: "opaque"
                });
                var i = domFC(t);
                return addClass(i, "videoplayer_media_provider"), i
            }
            initListeners() {
                this.domListen(this.el, "load", () => {
                    this.delay(() => {
                        !1 !== this._delaySrc && this._delayPlay && (this.src = this._delaySrc, this._delaySrc = !1), this._delayPlay && (this.play(), this._delayPlay = !1)
                    }, 0)
                }), this.domListen(this.el, "durationchange", () => {
                    this._duration = this.el.getDuration(), this.volume = this.volume, this.loop = this.loop, this._delaySeek && (this.currentTime = this._delaySeek, this._delaySeek = 0)
                }), this.domListen(this.el, "loadeddata", () => {
                    this.volume = this.volume
                }), this.domListen(this.el, "timeupdate", () => {
                    var e = this.el.getCurrentTime();
                    this.updatePlayed(this._currentTime, e), this._currentTime = e
                }), this.domListen(this.el, "error", () => {
                    this.player.debugLog("Flash error", {
                        force: !0
                    })
                })
            }
            isFlashReady() {
                return !!this.el.play
            }
            get duration() {
                return this._duration
            }
            get currentTime() {
                return this.el.getCurrentTime ? this.el.getCurrentTime() : this._currentTime
            }
            set currentTime(e) {
                this._currentTime = e, this.el.seek && this.duration ? this.el.seek(e) : this._delaySeek = e
            }
            get volume() {
                return this._volume
            }
            set volume(e) {
                this._volume = e, this.el.setVolume && this.el.setVolume(e)
            }
            set src(e) {
                this.el.load ? (this.reset(), this.el.load(e), this.volume = this._volume) : this._delaySrc = e, this._src = e
            }
            get src() {
                return this._src || ""
            }
            play() {
                this.el.play ? (!1 !== this._delaySrc && (this.src = this._delaySrc), this.el.play()) : this._delayPlay = !0
            }
            get loop() {
                return this._loop
            }
            set loop(e) {
                this._loop = e, this.el.setLoop && this.el.setLoop(e)
            }
            pause() {
                this.el.pause ? this.el.pause() : this._delayPlay = !1
            }
            get readyState() {
                return this.el.getReadyState ? this.el.getReadyState() : 0
            }
            get networkState() {
                return this.el.getNetworkState ? this.el.getNetworkState() : 0
            }
            get buffered() {
                return {
                    length: 1,
                    start: () => 0,
                    end: () => this.el.getBuffered ? this.el.getBuffered() : 0
                }
            }
            get played() {
                var e = this._played.slice();
                return {
                    length: e.length / 2,
                    start: t => e[2 * t],
                    end: t => e[2 * t + 1]
                }
            }
            updatePlayed(e, t) {
                if (e != t && !(Math.abs(t - e) > 1)) {
                    e > t && ([e, t] = [t, e]);
                    for (var i = this._played, s = i.length, a = 0;; a += 2) {
                        var r = i[a],
                            l = i[a + 1];
                        if (a >= s || t < r) return void i.splice(a, 0, e, t);
                        if (e <= l) {
                            for (var n = Math.min(i[a], e), o = Math.max(i[a + 1], t), h = 2, d = a + 2;; d += 2) {
                                var u = i[d],
                                    c = i[d + 1];
                                if (d >= s || o < u) break;
                                o = Math.max(o, c), h += 2
                            }
                            return void i.splice(a, h, n, o)
                        }
                    }
                }
            }
            load() {}
            reset() {
                this.el.clear && document.body.contains(this.el) && (this.el.clear(), this.el.init()), this._currentTime = 0, this._duration = 0, this._played = []
            }
            recoverNetwork() {
                this.el.load && this._src && (this.el.clear(), this.el.init(), this.el.load(this._src), this.player.getState() === r.PLAYING && this.el.play())
            }
        }
        i("SRfc");
        var Ye = {
            fromString(e) {
                var t = "string" == typeof e ? e.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/) : null;
                return t ? (3600 * t[1] || 0) + (60 * t[2] || 0) + (+t[3] || 0) : 0
            },
            toString(e) {
                var t = "";
                return e >= 3600 && (t += Math.floor(e / 3600) + "h", e %= 3600), e >= 60 && (t += Math.floor(e / 60) + "m", e %= 60), e > 0 && (t += Math.floor(e) + "s"), t
            }
        };

        function Ke(e, t, i, s, a, r, l) {
            try {
                var n = e[r](l),
                    o = n.value
            } catch (e) {
                return void i(e)
            }
            n.done ? t(o) : Promise.resolve(o).then(s, a)
        }

        function je(e) {
            return function() {
                var t = this,
                    i = arguments;
                return new Promise(function(s, a) {
                    var r = e.apply(t, i);

                    function l(e) {
                        Ke(r, s, a, l, n, "next", e)
                    }

                    function n(e) {
                        Ke(r, s, a, l, n, "throw", e)
                    }
                    l(void 0)
                })
            }
        }
        var Xe = 3e3,
            Je = 15e3,
            Ze = 2e3,
            et = 2e3;
        class tt extends fe {
            constructor(e) {
                super(e), this.el = ce("div", {
                    className: "videoplayer_media"
                }), this.playerListen(z, this.onUiSeekStart), this.playerListen(Q, this.onUiSeekEnd), this.playerListen(I, this.onWaitingChange), this.playerListen(d, this.onStateChange), this.playerListen(p, this.onQualityChange), this.playerListen(y, this.updateAspectRatio), this.playerListen(_, this.updateAspectRatio), this._interruptionCheckerInterval = setInterval(this.checkInterruption.bind(this), 200), this.vigoStats = new De(this.player, this)
            }
            initVideo(e) {
                if (e.live !== oe) {
                    var t;
                    switch (this.providerType()) {
                        case "hls":
                            t = new $e(this.player);
                            break;
                        case "base":
                            t = new Me(this.player);
                            break;
                        case "flash":
                            t = new Ge(this.player);
                            break;
                        default:
                            return void this.player.trigger(B, {
                                message: this.getLang("load_error")
                            })
                    }
                    this.attachProvider(t);
                    var i = this.getInitialSrc(e);
                    i ? e.live === he || e.live === ae || e.live === le ? this.checkLiveStarted(i) : t.src = i : this.setQuality(this.getInitialQuality(e));
                    var s = this.getInitialTime(e);
                    s > 0 && (t.currentTime = s, this.player.trigger(A, s)), this.setVolume(this.getInitialVolume()), this.toggleLoop(!!e.repeat), this.rotateVideo(!1, !0), this.updateAspectRatio(), this.vigoStats.init(e.vigo_cid, !!e.hls, !!e.extra, !!e.from_autoplay), this.vigoStats.enable(!e.live), this.filterSavedVideosPositions()
                } else this.onLiveFailed()
            }
            updateAspectRatio() {
                var e = this.getVar("stretch_vertical"),
                    t = this.getVar("is_inline"),
                    i = this.getVar("aspect_ratio"),
                    s = this.player.isFullscreen(),
                    a = "",
                    r = "",
                    l = "";
                e && t && !s && i && i < 1 && (a = r = -(1 / i - 1) / 2 * 100 + "%", l = "auto"), setStyle(this.el, {
                    top: a || "",
                    bottom: r || "",
                    height: l || ""
                })
            }
            getInitialSrc(e) {
                var t = this.providerType();
                return e.rtmp && "flash" == t ? e.rtmp : "hls" == t ? e.hls_raw && window.URL && window.Blob ? URL.createObjectURL(new Blob([e.hls_raw], {
                    type: "application/vnd.apple.mpegurl"
                })) : e.hls : void 0
            }
            getInitialVolume() {
                return this.player.isMuted() ? 0 : this.player.getVolume()
            }
            getInitialQuality(e) {
                var t = this.player.preferredQuality;
                e.is_inline && (t = Math.min(pe, t));
                var i = ye(e.hd);
                return Math.min(t, i)
            }
            getInitialTime(e) {
                if (this.player.isActiveLive()) return 0;
                if (e.t) {
                    var t = Ye.fromString(e.t);
                    if (t < e.duration) return t
                } else {
                    var i = Re.getPref("position." + this.player.getVideoId());
                    if (i && e.duration - i.pos > 30) return i.pos
                }
                return 0
            }
            providerType() {
                return this.provider instanceof $e ? "hls" : this.provider instanceof Ge ? "flash" : this.provider instanceof Me ? "base" : this.chooseProvider()
            }
            chooseProvider() {
                if (this.player.isInited()) {
                    var e = this.player.getVars(),
                        t = e.hls && this.player.isHlsSupported(),
                        i = e.can_play_mp4 && (!e.live || e.postlive_mp4),
                        s = this.player.isFlashSupported() && (!e.live || e.rtmp || e.postlive_mp4),
                        a = e.is_flv || e.force_rtmp && s && !e.from_autoplay,
                        r = e.direct_mp4;
                    return !t || r || a ? i && !a ? "base" : s ? "flash" : void 0 : "hls"
                }
            }
            attachProvider(e) {
                this.provider && this.destroyProvider(), this.provider = e, this.el.appendChild(e.el), this.domListen(e.el, "timeupdate", this.onTimeupdate), this.domListen(e.el, "progress", this.onProgress), this.domListen(e.el, "volumechange", this.onVolumechange), this.domListen(e.el, "durationchange", () => {
                    this.player.trigger(x, this.getDuration())
                }), this.domListen(e.el, "loadeddata", e => {
                    this.buffering = !1
                }), this.domListen(e.el, "playing", () => {
                    this.buffering = !1, this.provider.el.paused || this.player.trigger(D)
                }), this.domListen(e.el, "pause", () => {
                    this._ui_seeking || this._disabled || this.player.getState() === r.ERROR || this.player.trigger(M)
                }), this.domListen(e.el, "ended", () => {
                    this.player.trigger(R)
                }), this.domListen(e.el, "error", this.onError), this.player.trigger(H, {
                    type: this.providerType()
                })
            }
            destroyProvider() {
                this.provider && (this.domUnlisten(this.provider.el), re(this.provider.el), this.provider.destroy(), this.provider = null)
            }
            deinitVideo() {
                this._disabled = !1, this.buffering = !1, this.interrupted = !1, this.aborted = !1, this.preloadRequested = !1, this.bufEndReached = !1, this.lastNetworkRecoveryTry = 0, this.vigoStats.reset(), this.destroyProvider(), this.undelay(this.liveStartCheckTimeout), this.undelay(this.liveEndCheckTimeout), this.liveHlsCheckRequest && (this.liveHlsCheckRequest.abort(), delete this.liveHlsCheckRequest), delete this.postLiveCheckCount
            }
            checkLiveStarted(e) {
                var t = this,
                    i = this.player.getVideoId(),
                    s = !!this.getVar("live_preparing"),
                    a = !1,
                    l = () => {
                        this.player.getVideoId() == i && this.player.checkLivePhase(e => {
                            if (e.live_preparing) s = !0;
                            else if ((s || this.player.getLivePhase() === he && e.phase !== he) && (s = !1, this.onLiveStarted(), !this.player.isInited())) return;
                            switch (e.phase) {
                                case le:
                                    a ? s && this.delay(l, Xe) : n();
                                    break;
                                case ae:
                                case he:
                                    a && (a = !1, this.player.changeLivePhase(e.phase));
                                    var t = this.player.getLivePhase() !== he || s ? Xe : Je;
                                    this.liveStartCheckTimeout = this.delay(l, t)
                            }
                            this.onLiveWaiting(e.stream_error_text, e.stream_error_level)
                        })
                    },
                    n = function() {
                        var i = je(function*() {
                            var i;
                            try {
                                i = "hls" === t.providerType() ? yield t.checkHlsManifestValidity(e) : yield t.checkRtmpRedirect(e)
                            } finally {
                                i ? o(i) : t.delay(l, Xe)
                            }
                        });
                        return function() {
                            return i.apply(this, arguments)
                        }
                    }(),
                    o = e => {
                        this.player.getVideoId() == i && (this.player.getState() == r.ERROR && this.player.changeState(this.player.prevState), this.player.changeLivePhase(le), this.provider.src = e, this.provider.load(), this.player.getState() === r.PLAYING && this.play(), a = !0, s && this.delay(l, Xe))
                    };
                this.player.getLivePhase() == le ? n() : l()
            }
            checkHlsManifestValidity(e) {
                var t = this;
                return je(function*() {
                    var {
                        response: i
                    } = yield t.request(e).promise;
                    return (i.indexOf("#EXT-X-STREAM-INF:") > 0 || i.indexOf("#EXTINF:") > 0) && e
                })()
            }
            checkRtmpRedirect(e) {
                var t = this;
                return je(function*() {
                    for (var i = 0; i < 10; i++) {
                        if ("string" != typeof e) return !1;
                        if (0 === e.indexOf("rtmp")) return e;
                        e += (e.indexOf("?") > -1 ? "&" : "?") + "get_redirect_url=1";
                        var {
                            response: s
                        } = yield t.request(e).promise;
                        e = trim(s)
                    }
                    return !1
                })()
            }
            checkLiveEnded() {
                this.player.checkLivePhase(e => {
                    switch (this.undelay(this.liveEndCheckTimeout), delete this.liveEndCheckTimeout, e.phase) {
                        case ne:
                            this.onLiveEnded(e);
                            break;
                        case oe:
                            this.onLiveFailed(e);
                            break;
                        case ae:
                            this.liveEndCheckTimeout = this.delay(this.checkLiveEnded, et);
                            break;
                        case le:
                            this.player.getState() == r.ERROR && this.player.changeState(this.player.prevState), this.isWaiting() && (e.media_url ? (this.provider.reset(), this.provider.src = e.media_url) : this.provider.delayRecoverNetwork && this.provider.delayRecoverNetwork()), this.player.getState() === r.PLAYING && this.provider.play(), this.liveEndCheckTimeout = this.delay(this.checkLiveEnded, et)
                    }
                    this.onLiveWaiting(e.stream_error_text, e.stream_error_level)
                })
            }
            onLiveStarted() {
                this.player.externalCall("onLiveStarted", this.player.getVideoId())
            }
            onLiveEnded(e) {
                this.player.vars.duration = e.duration, e.jpg && (this.player.vars.jpg = e.jpg), this.player.trigger(R), this.switchToPostLive(e), this.player.externalCall("onLiveEnded", this.player.getVideoId(), e.deleted)
            }
            onLiveFailed() {
                this.destroyProvider(), this.player.trigger(B, {
                    message: this.getLang("live_failed")
                })
            }
            onLiveWaiting(e, t) {
                this.player.trigger(O, {
                    message: "warning" == t && e
                }), "fatal" == t && (this.player.trigger(B, {
                    message: e,
                    waiting: !0
                }), this.pause())
            }
            checkPostlive() {
                var e = this.player.getVideoId();
                ajax.post("al_video.php?act=check_postlive", {
                    oid: this.getVar("oid"),
                    vid: this.getVar("vid"),
                    hash: this.getVar("action_hash")
                }, {
                    onDone: t => {
                        this.player.getVideoId() == e && (t.hls || t.postlive_mp4 ? this.switchToPostLive(t) : t.deleted || this.checkPostliveDelayed())
                    },
                    onFail: () => {
                        if (this.player.getVideoId() == e) return this.checkPostliveDelayed(), !0
                    }
                })
            }
            checkPostliveDelayed() {
                this._postLiveCheckCount = (this._postLiveCheckCount || 0) + 1;
                var e = 100 * this._postLiveCheckCount;
                this.delay(this.checkPostlive, 3e3 + e)
            }
            switchToPostLive({
                hls: e,
                rtmp: t,
                postlive_mp4: i
            }) {
                var s, a;
                this.undelay(this.liveStartCheckTimeout), this.destroyProvider(), e && this.player.isHlsSupported() ? (s = new $e(this.player), a = e) : i && this.getVar("can_play_mp4") ? (s = new Me(this.player), a = i) : i && this.player.isFlashSupported() && (s = new Ge(this.player), a = i), s && a ? (this.player.changeLivePhase(ne), this.player.changeState(r.ENDED), this.attachProvider(s), s.src = a, s.volume = this.getInitialVolume(), !this.player.isStartedPlaying() && this.getVar("autoplay") && this.player.play()) : (this.player.trigger(B, {
                    message: this.getLang("live_wait_record"),
                    waiting: !0
                }), this.checkPostliveDelayed())
            }
            getAvailableQualities() {
                var e = [];
                if (this.provider && this.provider.getAvailableQualities) e = this.provider.getAvailableQualities();
                else
                    for (var t = this.getVar("hd") || 0, i = 0; i <= t; ++i) {
                        var s = ye(i);
                        s && this.getMp4Url(s) && e.push(s)
                    }
                return e.sort((e, t) => t - e)
            }
            isAutoQualityAvailable() {
                return this.provider && this.provider.isAutoQualityAvailable && this.provider.isAutoQualityAvailable() || !1
            }
            isAutoQualityEnabled() {
                return this.provider && this.provider.isAutoQualityEnabled && this.provider.isAutoQualityEnabled() || !1
            }
            getQuality() {
                return this.provider && this.provider.getQuality ? this.provider.getQuality() : 0
            }
            getAvailableSubtitleTracksInfo() {
                var e = [];
                return this.provider && this.provider.getAvailableSubtitleTracksInfo && (e = this.provider.getAvailableSubtitleTracksInfo()), e
            }
            getSubtitleTrack() {
                return this.provider && this.provider.getSubtitleTrack ? this.provider.getSubtitleTrack() : -1
            }
            onTimeupdate() {
                var e = this.curTime();
                this.player.trigger(A, e), this.player.isActiveLive() || Re.savePref("position." + this.player.getVideoId(), {
                    date: Date.now(),
                    pos: e
                })
            }
            filterSavedVideosPositions() {
                var e, t = Re.getPref("position") || {},
                    i = Object.keys(t);
                i.length > 3 && (i.forEach(i => {
                    (!e || t[i].date < t[e].date) && (e = i)
                }), Re.deletePref("position." + e))
            }
            onProgress() {
                var e = this.getBufferedRanges(),
                    t = this.curTime();
                if (e.length) {
                    for (var i = 0; i < e.length; ++i)
                        if (!(e.end(i) <= t)) {
                            if (e.start(i) - t > 30) break;
                            t = e.end(i)
                        }
                    this.player.trigger(P, t / this.getDuration()), this.bufEndReached || e.end(e.length - 1) !== this.getDuration() || (this.bufEndReached = !0, this.player.getState() === r.PLAYING && this.vigoStats.triggerEvent("heartbeat"))
                }
            }
            onVolumechange() {
                this.player.trigger(V, this.getVolume())
            }
            onError(e) {
                if (!e || "hls" != this.providerType()) {
                    var t = this.getErrorCode();
                    if (this.player.debugLog(`media error: ${t}`, {
                            force: !0
                        }), t == MediaError.MEDIA_ERR_NETWORK && Date.now() - intval(this.lastNetworkRecoveryTry) > 5e3) {
                        this.lastNetworkRecoveryTry = Date.now();
                        var i = this.player.getQuality();
                        this.setQuality(i)
                    } else {
                        if (t != MediaError.MEDIA_ERR_ABORTED && "hls" != this.providerType()) {
                            var s = this.player.getQuality(),
                                a = this.getVar(`cache${s}`);
                            if (a && this.provider.currentSrc == a) return void this.setQuality(s, {
                                ignoreCacheServer: !0
                            })
                        }
                        if (t == MediaError.MEDIA_ERR_ABORTED) this.aborted = !0;
                        else {
                            var r = this.getVar("extra") && !this.getVar("live") ? this.getLang("external_service_file_not_found") : this.getLang("load_error");
                            if (t) {
                                var l = this.getErrorCodeDescription(t);
                                l && (l = ` (${l})`), r += "<br><small>" + this.getLang("err_code", {
                                    code: t
                                }) + l + "</small>"
                            }
                            this.player.trigger(B, {
                                message: r
                            }), this.vigoStats.triggerEvent("error"), ajax.post("al_video.php?act=player_error_stat", {
                                provider: this.providerType(),
                                code: t,
                                host: this.getContentHost(),
                                quality: this.player.getQuality(),
                                is_auto_quality: this.isAutoQualityEnabled() ? 1 : 0,
                                hash: this.getVar("error_stat_hash")
                            }, {})
                        }
                    }
                }
            }
            onStateChange(e, t) {
                switch (this.updateVisibility(), e) {
                    case r.PLAYING:
                        this._disabled || (this.play(), this.vigoStats.triggerEvent("play"));
                        break;
                    case r.PAUSED:
                        this._disabled || (this.pause(), this.vigoStats.triggerEvent("pause"));
                        break;
                    case r.ENDED:
                        this.vigoStats.triggerEvent("stop")
                }
            }
            onQualityChange(e, t, i) {
                this.vigoStats.triggerEvent(i ? "heartbeat" : "bitrate_change")
            }
            onWaitingChange(e, t) {
                this.updateVisibility(), this.vigoStats.triggerEvent(e ? "buf_start" : "buf_stop"), this.player.getLivePhase() === le && (e ? this.liveEndCheckTimeout || (this.liveEndCheckTimeout = this.delay(this.checkLiveEnded, Ze)) : (this.undelay(this.liveEndCheckTimeout), delete this.liveEndCheckTimeout))
            }
            onUiSeekStart(e) {
                this._ui_seeking = !0, this._frame_seeking = e, this.pause()
            }
            onUiSeekEnd() {
                setTimeout(() => {
                    this._ui_seeking = !1, this._frame_seeking = !1, this.player.getState() !== r.PLAYING || this.provider.el.ended || this.play()
                })
            }
            updateVisibility() {
                var e = this.buffering || this._disabled || !this.player.isInited() || this.aborted || this.player.getState() === r.ERROR;
                setStyle(this.el, {
                    visibility: e && "flash" != this.providerType() ? "hidden" : ""
                })
            }
            get buffering() {
                return !!this._buffering
            }
            set buffering(e) {
                if (e != this._buffering) {
                    var t = this.isWaiting();
                    this._buffering = e;
                    var i = this.isWaiting();
                    t != i && this.player.trigger(I, i, !1)
                }
            }
            get interrupted() {
                return !!this._interrupted
            }
            set interrupted(e) {
                if (e != this._interrupted) {
                    var t = this.isWaiting();
                    this._interrupted = e;
                    var i = this.isWaiting();
                    t != i && this.player.trigger(I, i, !0)
                }
            }
            isWaiting() {
                return this.buffering || this.interrupted
            }
            curTime() {
                return this.provider && this.provider.currentTime || 0
            }
            getDuration() {
                return this.provider && this.provider.duration || 0
            }
            setQuality(e, {
                ignoreCacheServer: t = !1
            } = {}) {
                if (this.provider.setQuality) return this.provider.setQuality(e), void(e == de && this.vigoStats.triggerEvent("bitrate_change"));
                var i = this.getMp4Url(e, t),
                    s = this.curTime();
                this.provider.src = i, this.player.onQualityChanged(e), this.player.getState() !== r.UNSTARTED && (this.vigoStats.triggerEvent("bitrate_change"), this.provider.load(), this.provider.currentTime = s, this.player.getState() === r.PLAYING && this.play(), this.buffering = !0, this._lastInterruptionCheckTime = null)
            }
            switchSubtitleTrack({
                trackId: e
            }) {
                this.provider.switchSubtitleTrack && this.provider.switchSubtitleTrack({
                    trackId: e
                })
            }
            seekTo(e) {
                this._frame_seeking || this.vigoStats.triggerEvent("heartbeat"), this.provider.currentTime = Math.max(0, Math.min(this.player.getDuration(), e)), this._frame_seeking || this.vigoStats.triggerEvent("seek");
                var t = this.isInBufferedArea(e);
                t || (this.buffering = !0), this.player.trigger(F, t), this.domListenOnce(this.provider.el, "seeked", e => {
                    this.buffering = !1, this.player.trigger(N, t)
                }), this._lastInterruptionCheckTime = null, this.onProgress()
            }
            getVolume() {
                return this.provider ? this.provider.volume : 0
            }
            setVolume(e) {
                this.provider && (this.provider.volume = e)
            }
            isLooped() {
                return !!this.provider && this.provider.loop
            }
            toggleLoop(e) {
                return !!this.provider && (this.provider.loop = e)
            }
            canChangePlaybackRate() {
                return !!this.provider && this.provider.canChangePlaybackRate()
            }
            setPlaybackRate(e) {
                this.provider && (this.provider.playbackRate = e)
            }
            getPlaybackRate() {
                return this.provider ? this.provider.playbackRate : 1
            }
            getVideoRatio() {
                return this.provider && this.provider.videoRatio || this.getVar("aspect_ratio") || 16 / 9
            }
            canRotateVideo() {
                return !(this.getVar("stretch_vertical") && this.getVar("is_inline"))
            }
            rotateVideo(e, t = !1) {
                this._rotateAlpha = !1 === e ? 0 : (this._rotateAlpha || 0) + e;
                var i = this._rotateAlpha % 180 ? 1 / this.getVideoRatio() : 1;
                t && (addClass(this.el, "no_transition"), removeClassDelayed(this.el, "no_transition")), setStyle(this.el, {
                    transform: this._rotateAlpha ? `rotate(${this._rotateAlpha}deg) scale(${i})` : ""
                })
            }
            isPiPModeAvailable() {
                var e = this.provider && this.provider.el;
                if (e) {
                    if (document.pictureInPictureEnabled) return !0;
                    if ("function" == typeof e.webkitSetPresentationMode) return !0
                }
                return !1
            }
            togglePiPMode() {
                var e = this.provider.el;
                if (document.pictureInPictureEnabled) document.pictureInPictureElement === e ? document.exitPictureInPicture() : e.requestPictureInPicture();
                else if ("function" == typeof e.webkitSetPresentationMode) {
                    var t = "picture-in-picture" === e.webkitPresentationMode ? "inline" : "picture-in-picture";
                    e.webkitSetPresentationMode(t)
                }
            }
            preload() {
                this.provider && this.player.getState() === r.UNSTARTED && (this.preloadRequested || (this.preloadRequested = !0, this.vigoStats.triggerEvent("play"), this.provider.readyState || (this.buffering = !0), this.vigoStats.triggerEvent("pause"), this.provider.load()))
            }
            play() {
                this.provider && (this._disabled || this.player.getLivePhase() !== he && (this.provider.readyState || (this.buffering = !0), this.provider.play(), this._lastInterruptionCheckTime = null))
            }
            pause() {
                this.provider && !this._disabled && this.provider.pause()
            }
            disablePlayback() {
                this._disabled || (this.pause(), this.player.isActiveLive() && this.provider.pauseLoad && this.provider.pauseLoad(), this._disabled = !0, this.updateVisibility(), this.vigoStats.triggerEvent("pause"))
            }
            enablePlayback() {
                this._disabled && (this._disabled = !1, this.updateVisibility(), this.player.getState() === r.PLAYING && (this.player.isActiveLive() && this.provider.resumeLoad && this.provider.resumeLoad(), this.play(), this.vigoStats.triggerEvent("play")))
            }
            isPlayingMedia() {
                return this.player.getState() === r.PLAYING && !this._disabled
            }
            getMp4Url(e, t = !1) {
                return this.getVar("direct_mp4") || this.getVar("postlive_mp4") || this.getVar("extra_data") || !t && this.getVar(`cache${e}`) || this.getVar(`url${e}`)
            }
            getBufferedRanges() {
                return this.provider ? this.provider.buffered : []
            }
            getPlayedRanges() {
                return this.provider ? this.provider.played : []
            }
            getPlayedRangesString() {
                for (var e = this.getPlayedRanges(), t = [], i = 0; i < e.length; ++i) {
                    var s = Math.round(e.start(i)) + "-" + Math.round(e.end(i));
                    t.push(s)
                }
                return t.join(",")
            }
            getPlayedSeconds() {
                for (var e = this.getPlayedRanges(), t = 0, i = 0; i < e.length; ++i) t += e.end(i) - e.start(i);
                return t
            }
            isInBufferedArea(e) {
                for (var t = this.getBufferedRanges(), i = 0; i < t.length; ++i)
                    if (t.start(i) <= e && e <= t.end(i)) return !0;
                return !1
            }
            getBufferPercent() {
                var e = this.curTime(),
                    t = this.getDuration(),
                    i = this.getBufferedRanges();
                if (!i.length) return 0;
                for (var s = 0; s < i.length; ++s) {
                    var a = i.start(s),
                        r = i.end(s);
                    if (a <= e && e <= r) return (r - a) / t * 100
                }
                return 0
            }
            getLoadedBytes() {
                if (this.provider && this.provider.getLoadedBytes) return this.provider.getLoadedBytes()
            }
            getBitrate() {
                if (this.provider && this.provider.getBitrate) return this.provider.getBitrate()
            }
            getContentUrl() {
                if (this.provider) return this.provider.getContentUrl ? this.provider.getContentUrl() : this.provider.currentSrc
            }
            getContentHost() {
                var e = this.getContentUrl();
                if (e) return ce("a", {
                    href: e
                }).hostname
            }
            getErrorCode() {
                return this.provider && this.provider.error && this.provider.error.code || null
            }
            getErrorCodeDescription(e) {
                switch (e) {
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
            }
            getErrorsLog() {
                return this.provider && this.provider.getErrorsLog && this.provider.getErrorsLog() || null
            }
            checkInterruption() {
                if (this.player.getState() !== r.PLAYING || this.player.getLivePhase() === he || this._ui_seeking || this._disabled || this.buffering || !this.provider) !this.interrupted || this.provider && this.provider.readyState !== HTMLMediaElement.HAVE_ENOUGH_DATA || (this.interrupted = !1);
                else {
                    if (null != this._lastInterruptionCheckTime) {
                        var e = this.provider.currentTime;
                        if (e - this._lastInterruptionCheckTime) this.interrupted = this.buffering = !1;
                        else this.player.isAutoplay() && !e || (this.interrupted = !0)
                    }
                    this._lastInterruptionCheckTime = this.provider.currentTime
                }
            }
            destroy() {
                clearInterval(this._interruptionCheckerInterval), super.destroy()
            }
        }

        function it(e = "") {
            return `\n<svg class="${e}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <g fill="none" fill-rule="evenodd">\n    <g fill-rule="nonzero">\n      <path class="_pause" d="m0 0h24v24h-24z"/>\n      <path class="_pause" d="m7.14520205 5h1.7095959c.39821169 0 .54261289.04664487.68819313.13423418.14558024.08758932.25983248.21612308.33768965.37990085.07785716.16377778.11931927.32622912.11931927.77421728v11.42329539c0 .4479882-.04146211.6104395-.11931927.7742173-.07785717.1637777-.19210941.2923115-.33768965.3799008s-.28998144.1342342-.68819313.1342342h-1.7095959c-.39821169 0-.54261289-.0466449-.68819313-.1342342s-.25983248-.2161231-.33768965-.3799008c-.07785716-.1637778-.11931927-.3262291-.11931927-.7742173v-11.42329539c0-.44798816.04146211-.6104395.11931927-.77421728.07785717-.16377777.19210941-.29231153.33768965-.37990085.14558024-.08758931.28998144-.13423418.68819313-.13423418zm7.99999995 0h1.709596c.3982117 0 .5426128.04664487.6881931.13423418.1455802.08758932.2598325.21612308.3376896.37990085.0778572.16377778.1193193.32622912.1193193.77421728v11.42329539c0 .4479882-.0414621.6104395-.1193193.7742173-.0778571.1637777-.1921094.2923115-.3376896.3799008-.1455803.0875893-.2899814.1342342-.6881931.1342342h-1.709596c-.3982117 0-.5426128-.0466449-.6881931-.1342342-.1455802-.0875893-.2598325-.2161231-.3376896-.3799008-.0778572-.1637778-.1193193-.3262291-.1193193-.7742173v-11.42329539c0-.44798816.0414621-.6104395.1193193-.77421728.0778571-.16377777.1921094-.29231153.3376896-.37990085.1455803-.08758931.2899814-.13423418.6881931-.13423418z" fill="#fff"/>\n      <path class="_play" d="m8.13340613 5.10548415 10.49681277 6.24354325c.3559987.2117494.472936.6720001.2611866 1.0279989-.0638111.1072809-.1533894.1969388-.2606135.2608453l-10.4968128 6.256187c-.35581027.2120659-.81616483.095538-1.02823068-.2602722-.06921066-.1161237-.10574852-.2487949-.10574852-.3839792v-12.49973035c0-.41421357.33578644-.75.75-.75.13495801 0 .26741554.03641567.38340613.1054073z" fill="#fff"/>\n    </g>\n    <path class="_replay" d="m12 4.5000003c4.418278 0 8 3.581722 8 8s-3.581722 8-8 8-8-3.581722-8-8c0-.5522847.44771525-1 1-1s1 .4477153 1 1c0 3.3137085 2.6862915 6 6 6s6-2.6862915 6-6-2.6862915-6-6-6v3.09577928c0 .09950642-.0370887.19544034-.104024.26906913-.1486028.16346309-.4015821.17550969-.5650451.02690691l-4.28830818-3.89846194c-.01565124-.0142284-.03061645-.02919361-.04484485-.04484485-.24767129-.27243841-.22759356-.69407063.04484485-.94174191l4.28830818-3.89846194c.0736287-.06693527.1695627-.10402398.2690691-.10402398.2209139 0 .4.17908611.4.40000002z" fill="#fff"/>\n  </g>\n</svg>\n  `
        }
        class st extends fe {
            constructor(e, t) {
                super(e), this.el = this.buildEl(), this._transformProp = qe("transform"), this._loaded = domByClass(this.el, "_loaded"), this._filled = domByClass(this.el, "_filled"), this._handle = domByClass(this.el, "_handle"), this._handleWrap = domByClass(this.el, "_handle_wrap"), this._callbacks = t || {}, this.domListen(this.el, "mousemove", this.onMove), this.domListen(this.el, "mouseleave", this.onOut), this.domListen(this.el, "mousedown", this.onMouseDown), this.domListen(this.el, "keydown", this.onKeydown)
            }
            buildEl() {
                return se('\n<div class="videoplayer_slider" tabindex="0" role="slider">\n  <div class="_bars_wrap">\n    <div class="_loaded"></div>\n    <div class="_filled"></div>\n  </div>\n  <div class="_handle_wrap">\n    <div class="_handle"></div>\n  </div>\n</div>\n    ')
            }
            initAria(e) {
                attr(this.el, "aria-label", e.label), attr(this.el, "aria-valuemin", e.valuemin), attr(this.el, "aria-valuemax", e.valuemax), this._ariaValues = e, this.updateAriaValue(this._filledPercent || 0)
            }
            updateAriaValue(e) {
                if (this._ariaValues) {
                    var t = this._ariaValues,
                        i = t.valuemin + Math.round((t.valuemax - t.valuemin) * e),
                        s = t.valuetext(i, t.valuemin, t.valuemax);
                    attr(this.el, "aria-valuenow", i), attr(this.el, "aria-valuetext", s)
                }
            }
            setLoaded(e) {
                var t, i;
                e = Math.min(1, Math.max(0, e)), this._transformProp ? (t = this._transformProp, i = `translateX(${100*e}%)`) : (t = "marginLeft", i = 100 * e + "%"), setStyle(this._loaded, t, i)
            }
            setFilled(e, t = !0) {
                var i, s;
                e = Math.min(1, Math.max(0, e)), this._transformProp ? (i = this._transformProp, s = `translateX(${100*e}%)`) : (i = "marginLeft", s = 100 * e + "%"), setStyle(this._filled, i, s), setStyle(this._handleWrap, i, s), this._filledPercent = e, t && this.updateAriaValue(e)
            }
            disable() {
                this._disabled = !0, addClass(this.el, "_disabled")
            }
            enable() {
                this._disabled = !1, removeClass(this.el, "_disabled")
            }
            onMove(e) {
                if (!this._disabled) {
                    var t = this._getMouseProgress(e);
                    this._callbacks.mousemove && this._callbacks.mousemove(t)
                }
            }
            onOut(e) {
                this._disabled || this._callbacks.mouseout && this._callbacks.mouseout()
            }
            onMouseDown(e) {
                if (!this._disabled) {
                    this.dragging = !0, addClass(this.el, "_dragging"), this.domListen(window, "mousemove", this.onMouseMove), this.domListen(document, "selectstart", this.onSelectStart), this.domListenOnce(window, "mouseup", this.onMouseUp);
                    var t = this._getMouseProgress(e);
                    this.setFilled(t);
                    var i = e.target == this._handle;
                    this._callbacks.dragStart && this._callbacks.dragStart(t, i), this.player.onTouchedByUser()
                }
            }
            onMouseMove(e) {
                if (!this._disabled) {
                    var t = this._getMouseProgress(e);
                    this.setFilled(t), this._callbacks.drag && this._callbacks.drag(t), e.preventDefault()
                }
            }
            onMouseUp(e) {
                if (!this._disabled) {
                    this.dragging = !1, removeClass(this.el, "_dragging"), this.domUnlisten(window, "mousemove", this.onMouseMove), this.domUnlisten(document, "selectstart", this.onSelectStart);
                    var t = this._getMouseProgress(e);
                    this.setFilled(t), this.hidden && this.toggleVisibility(!1), this._callbacks.dragEnd && this._callbacks.dragEnd(t)
                }
            }
            onSelectStart(e) {
                e.preventDefault()
            }
            _getMouseProgress(e) {
                var t, i = this.el.getBoundingClientRect();
                if (this.vertical) {
                    var s = e.pageY - window.scrollGetY();
                    t = (i.height - (s - i.top)) / i.height
                } else t = (e.pageX - window.scrollGetX() - i.left) / i.width;
                return Math.max(0, Math.min(1, t))
            }
            onKeydown(e) {
                var t;
                switch (e.keyCode) {
                    case KEY.LEFT:
                    case KEY.DOWN:
                        t = -1;
                        break;
                    case KEY.RIGHT:
                    case KEY.UP:
                        t = 1;
                        break;
                    default:
                        return
                }
                this._callbacks.keyboardSlide && this._callbacks.keyboardSlide(t, e.altKey)
            }
            setVertical(e) {
                this.vertical = e, toggleClass(this.el, "_vertical", e)
            }
            toggleVisibility(e) {
                this.hidden = !e, this.dragging || toggleClass(this.el, "hidden", !e)
            }
        }
        class at extends st {
            constructor(e, t, i) {
                var s;
                super(e, {
                    mousemove: e => {
                        this.showPreviewAt(e)
                    },
                    mouseout: e => {
                        this.preview.hide(), this.tooltip.hide()
                    },
                    dragStart: (e, t) => {
                        this.player.trigger(z), t || this.player.seekToPercent(e), this.showPreviewAt(e), s = e
                    },
                    drag: e => {
                        var t = e * this.player.getDuration();
                        this.controls.updateTime(t), this.showPreviewAt(e)
                    },
                    dragEnd: e => {
                        this.player.trigger(Q), e != s ? this.player.seekToPercent(e) : this.controls.updateTime(this.player.curTime()), this.preview.hide(), this.tooltip.hide()
                    }
                }), this.controls = t, this.preview = i, addClass(this.el, "videoplayer_timeline_slider"), this.updateAria()
            }
            updateAria() {
                this.initAria({
                    label: this.getLang("aria_timeline_slider"),
                    valuemin: 0,
                    valuemax: this.player.getDuration(),
                    valuetext: (e, t, i) => this.getLang("aria_timeline_value", {
                        time: formatTime(e, !0),
                        duration: formatTime(i, !0)
                    })
                })
            }
            showPreviewAt(e) {
                if (this.player.isInited()) {
                    var t = formatTime(this.player.getDuration() * e);
                    this.getVar("timeline_thumbs") ? this.preview.show({
                        sliderEl: this.el,
                        progress: e,
                        text: t
                    }) : this.tooltip.show({
                        el: this.el,
                        text: t,
                        offsetXpercent: e,
                        offsetY: 16
                    })
                }
            }
            disable() {
                super.disable(), this.preview.hide()
            }
        }
        var rt = 150;
        class lt extends fe {
            constructor(e) {
                super(e), this.el = ce("div", {
                    className: "videoplayer_timeline_preview",
                    innerHTML: '\n<div class="_preview"></div>\n<div class="_text"></div>\n<div class="_arrow"></div>\n      '
                }, {
                    display: "none"
                }), this._preview = domByClass(this.el, "_preview"), this._text = domByClass(this.el, "_text"), this._arrow = domByClass(this.el, "_arrow")
            }
            initVideo(e) {
                if (e.timeline_thumbs) {
                    var t = this.getThumbsData(),
                        i = t.frameWidth,
                        s = t.frameHeight;
                    i > rt ? (s = s / i * rt, i = rt) : s > rt && (i = i / s * rt, s = rt), this.frameWidth = i, this.frameHeight = s, setStyle(this._preview, {
                        width: `${i}px`,
                        height: `${s}px`
                    }), this._imgUrls = t.links, this._imgUrls.forEach(e => vkImage().src = e)
                }
            }
            getThumbsData() {
                var [e, t, i, s, a, r] = this.getVar("timeline_thumbs").split("|");
                return {
                    frameWidth: e,
                    frameHeight: t,
                    countPerRow: i,
                    countPerImage: s,
                    countTotal: a,
                    links: r.split(",")
                }
            }
            show({
                sliderEl: e,
                progress: t,
                text: i
            }) {
                var s = this.getThumbsData(),
                    a = Math.min(s.countTotal, Math.max(0, Math.floor(s.countTotal * t - .5))),
                    r = Math.floor(a / s.countPerImage),
                    l = Math.floor(a % s.countPerImage / s.countPerRow),
                    n = a % s.countPerRow,
                    o = Math.floor(s.countPerImage / s.countPerRow);
                r === Math.floor(s.countTotal / s.countPerImage) && (o = Math.floor(s.countTotal % s.countPerImage / s.countPerRow), s.countTotal % s.countPerImage % s.countPerRow > 0 && o++);
                var h = s.countPerRow;
                r === Math.floor(s.countTotal / s.countPerImage) && s.countTotal % s.countPerImage > 0 && (h = Math.min(s.countPerRow, s.countTotal % s.countPerImage));
                var d = this.frameWidth * h,
                    u = this.frameHeight * o,
                    c = -n * this.frameWidth,
                    p = -l * this.frameHeight;
                setStyle(this._preview, {
                    backgroundImage: `url(${this._imgUrls[r]})`,
                    backgroundSize: `${d}px ${u}px`,
                    backgroundPosition: `${c}px ${p}px`
                });
                var g = this.player.el.getBoundingClientRect(),
                    v = e.getBoundingClientRect(),
                    _ = v.left - g.left + v.width * t,
                    m = 0;
                (_ -= Math.round(this.frameWidth / 2) + 3) < 7 && (m = _ - 7 - 3.5, _ = 7), setStyle(this.el, {
                    left: _ + "px"
                }), setStyle(this._arrow, {
                    marginLeft: m ? m + "px" : null
                }), val(this._text, i), show(this.el)
            }
            hide() {
                hide(this.el)
            }
        }
        class nt extends st {
            constructor(e) {
                var t = e => {
                    this.player.setVolume(e), this.vertical || this.tooltip.show({
                        el: this.el,
                        text: Math.round(100 * e) + "%",
                        offsetXpercent: e,
                        offsetY: 16
                    })
                };
                super(e, {
                    dragStart: t,
                    drag: t,
                    dragEnd: e => {
                        this.tooltip.hide()
                    }
                }), addClass(this.el, "videoplayer_volume_slider"), this.initAria({
                    label: this.getLang("aria_volume_slider"),
                    valuemin: 0,
                    valuemax: 100,
                    valuetext: (e, t, i) => {
                        var s = Math.round(100 * this.player.getVolume()) + "%";
                        return this.player.isMuted() && (s += " (" + this.getLang("aria_volume_muted") + ")"), s
                    }
                })
            }
        }
        class ot extends fe {
            constructor(e, t) {
                super(e, t), this.el = this._buildEl(t.title, t.items), this.domListen(this.el, "click", e => {
                    this._onClick(e, t.onItemClick)
                }), this.domListen(domByClass(this.el, "videoplayer_settings_menu_sublist_header"), "click", () => {
                    this._onClose(t.onSublistClose)
                }), setTimeout(() => {
                    this.el.style.width = `${this.el.offsetWidth}px`, this._scroll = new uiScroll(domByClass(this.el, "videoplayer_settings_menu_sublist_items"), {
                        global: !0,
                        theme: "dark"
                    })
                })
            }
            _buildEl(e, t) {
                var i = "";
                i += `<div class="videoplayer_settings_menu_sublist_header">${e}</div>`, i += '<div class="videoplayer_settings_menu_sublist_divider"></div>';
                var s = "";
                for (var a of t) s += `\n        <div class="videoplayer_settings_menu_sublist_item ${a.additionalClasses?a.additionalClasses:""}"\n             data-value="${a.value}"\n             data-setting="${a.setting}"\n             role="menuitemradio"\n             tabindex="0">\n            ${a.title}\n        </div>\n      `;
                return i += `<div class="videoplayer_settings_menu_sublist_items">${s}</div>`, se(`<div class="videoplayer_settings_menu_sublist">${i}</div>`)
            }
            _onClick(e, t) {
                (this.destroy(), t) && t(attr(e.target, "data-setting"), +attr(e.target, "data-value"))
            }
            _onClose(e) {
                this.destroy(), e && e()
            }
            destroy() {
                super.destroy(), this._scroll && (this._scroll.destroy(), this._scroll = null), re(this.el)
            }
        }
        var ht = 1e3,
            dt = 1e3,
            ut = .25,
            ct = 2,
            pt = .25,
            gt = "quality",
            vt = "subtitles",
            _t = "playback_speed";
        class mt extends fe {
            constructor(e, t) {
                var i;
                super(e), i = this, this.el = se('\n<div class="videoplayer_settings">\n  <div class="videoplayer_settings_menu_list hidden" role="menu"></div>\n</div>\n    ');
                var s = [gt, vt, _t];
                this._settingsList = {};
                var a = function(e) {
                    i._settingsList[e] = {
                        ariaLabel: "",
                        initialValue: "",
                        onClick: () => {
                            i._openSublist(e)
                        },
                        title: i.getLang(e),
                        type: e
                    }
                };
                for (var r of s) a(r);
                this._settingsList[gt].initialValue = this.player.getQuality(), this._settingsList[_t].initialValue = this.getLang("playback_speed_normal"), this._settingsList[_t].titleShort = this.getLang("playback_speed_short"), this._btn = t, this._menu = domByClass(this.el, "videoplayer_settings_menu_list"), this.domListen(this.el, "keydown", this._onKeyDown), this.domListen(this.el, "mouseenter", this._onMouseEnter), this.domListen(this.el, "mouseleave", this._onMouseLeave), this.domListen(this._btn, "keydown", this._onKeyDown), this.domListen(this._btn, "mouseenter", this._onMouseEnter), this.domListen(this._btn, "mouseleave", this._onMouseLeave), this.domListen(this._btn, "click", this._onBtnClick), this.playerListen(c, this._updateSubtitles), this.playerListen(g, this._updateSubtitles), this.playerListen(u, this._updateQualities), this.playerListen(p, this._updateQualities), this.playerListen(d, this._onPlayerStateChange)
            }
            initVideo(e) {
                this._buildMenu(this._settingsList), this._updateQualities(), this._subtitleLangs = e.subtitles_langs
            }
            _buildMenu(e) {
                var t = "";
                each(e, (e, i) => {
                    this._isControlAvailable(i.type) && (t += `\n        <div class="videoplayer_settings_menu_list_item videoplayer_settings_menu_list_item_${i.type}" role="menuitemradio" tabindex="0">\n          <div class="videoplayer_settings_menu_list_icon videoplayer_settings_menu_list_icon_${i.type}"></div>\n          <div class="videoplayer_settings_menu_list_title">${i.title}</div>\n          <div class="videoplayer_settings_menu_list_value">${i.initialValue}</div>\n        </div>\n      `)
                }), val(this._menu, t), each(e, (e, t) => {
                    var i = domByClass(this._menu, `videoplayer_settings_menu_list_item_${t.type}`);
                    this._toggleControl(i, this._isControlVisible(t.type)), this.domListen(i, "click", t.onClick)
                }), this._menuItems = geByClass("videoplayer_settings_menu_list_item", this._menu)
            }
            _getPlaybackRates() {
                for (var e = [], t = ut; t <= ct; t += pt) {
                    var i = "";
                    this.player.getPlaybackRate() === t && (i += " active"), e.push({
                        additionalClasses: i,
                        setting: _t,
                        title: this._getPlaybackRateText(t),
                        value: t
                    })
                }
                return e
            }
            _getPlaybackRateText(e) {
                return 1 === e ? this.getLang("playback_speed_normal") : langNumeric(e, "%s", !0) + "x"
            }
            _getQualities() {
                var e = [],
                    t = this.player.isAutoQualityEnabled();
                if (this.player.isAutoQualityAvailable()) {
                    var i = "";
                    t && (i += " active"), e.push({
                        additionalClasses: i,
                        setting: gt,
                        title: this.getLang("quality_auto"),
                        value: -1
                    })
                }
                for (var s of this.player.getAvailableQualities()) {
                    var a = "";
                    this.player.getQuality() !== s || t || (a += " active"), this._isQualityHD(s) && (a += " label_hd"), e.push({
                        additionalClasses: a,
                        setting: gt,
                        title: `${s}p`,
                        value: s
                    })
                }
                return e
            }
            _getSubtitles() {
                var e = [],
                    t = "";
                for (var i of (-1 === this.player.getSubtitleTrack() && (t += " active"), e.push({
                        additionalClasses: t,
                        setting: vt,
                        title: this.getLang("subtitles_off"),
                        value: -1
                    }), this.player.getAvailableSubtitleTracksInfo())) {
                    var s = "";
                    this.player.getSubtitleTrack() === i.id && (s += " active"), e.push({
                        additionalClasses: s,
                        setting: vt,
                        title: this._getSubtitleTitle(i),
                        value: i.id
                    })
                }
                return e
            }
            _getSettingItems(e) {
                switch (e) {
                    case _t:
                        return this._getPlaybackRates();
                    case gt:
                        return this._getQualities();
                    case vt:
                        return this._getSubtitles()
                }
                return []
            }
            _getSubtitleTitle(e) {
                return e ? this._subtitleLangs[e.lang].name : ""
            }
            _isControlAvailable(e) {
                switch (e) {
                    case _t:
                        return !this.player.isActiveLive() && this.player.canChangePlaybackRate()
                }
                return !0
            }
            _isControlVisible(e) {
                switch (e) {
                    case _t:
                        var t = this.player.getLivePhase();
                        return this.player.getState() !== r.ERROR && (!t || t === ne)
                }
                return !1
            }
            _isQualityHD(e) {
                return e >= ve
            }
            _onBtnClick(e) {
                this._disabled || e.target === this._menu || isAncestor(e.target, this._menu) || (this._currentSublist ? this._onSublistClose() : this.toggle(!this.isOpen()))
            }
            _onPlayerStateChange(e, t) {
                var i = domByClass(this.el, `videoplayer_settings_menu_list_item_${_t}`),
                    s = domByClass(this.el, `videoplayer_settings_menu_list_item_${vt}`);
                e === r.ERROR ? (this._toggleControl(i, !1), this._toggleControl(s, !1)) : t === r.ERROR && (this._toggleControl(i, !0), this._toggleControl(s, this.player.getAvailableSubtitleTracksInfo().length))
            }
            _onKeyDown(e) {
                switch (e.keyCode) {
                    case KEY.UP:
                    case KEY.DOWN:
                        if (this.isOpen() || this._currentSublist) {
                            var t = this._currentSublist ? geByClass("videoplayer_settings_menu_sublist_item", this._currentSublist.el) : this._menuItems,
                                i = t.length,
                                s = e.keyCode === KEY.DOWN ? 1 : -1;
                            t[(i + indexOf(t, e.target) + s) % i].focus()
                        } else this.toggle(!0);
                        e.preventDefault(), e.stopPropagation();
                        break;
                    case KEY.ESC:
                        this.isOpen() ? (this.toggle(!1), e.preventDefault(), e.stopPropagation()) : this._currentSublist && (this._onSublistClose(), e.preventDefault(), e.stopPropagation())
                }
            }
            _onMouseEnter() {
                this._disabled || (clearTimeout(this._hideTimeout), this.isOpen() || (Date.now() - this.tooltip.lastShown < 50 ? this.showTooltip() : this._tooltipTimeout = setTimeout(this.showTooltip.bind(this), dt)))
            }
            _onMouseLeave() {
                this._hideTimeout = setTimeout(this.toggle.bind(this, !1), ht), this.tooltip.hide(), clearTimeout(this._tooltipTimeout)
            }
            _onChangeSetting(e, t) {
                switch (e) {
                    case _t:
                        this.player.setPlaybackRate(t), this._updatePlaybackRate();
                        break;
                    case gt:
                        this.player.setQuality(t);
                        break;
                    case vt:
                        this.player.switchSubtitleTrack(t)
                }
            }
            _onSublistClose(e = !1) {
                if (this._currentSublist) {
                    if (e) return toggleClass(this._currentSublist.el, "hidden", !0), void setTimeout(() => {
                        this._currentSublist.destroy(), this._currentSublist = null
                    }, 250);
                    this._currentSublist.destroy(), this._currentSublist = null, setTimeout(() => {
                        this.isOpen() ? this._menuItems[0].focus() : this._btn.focus()
                    }, 100)
                }
            }
            _openSublist(e) {
                if (this._settingsList && this._settingsList[e]) {
                    this.toggle(), this._currentSublist = new ot(this.player, {
                        items: this._getSettingItems(e),
                        onItemClick: (e, t) => {
                            this._onChangeSetting(e, t), this._onSublistClose()
                        },
                        onSublistClose: () => {
                            this.toggle(), this._onSublistClose()
                        },
                        title: this._settingsList[e].titleShort || this._settingsList[e].title
                    }), this.el.appendChild(this._currentSublist.el);
                    var t = this._currentSublist.el;
                    domByClass(t, "active").focus()
                }
            }
            _toggleControl(e, t) {
                setStyle(e, {
                    display: t ? "" : "none"
                })
            }
            _updatePlaybackRate() {
                var e = this._getPlaybackRateText(this.player.getPlaybackRate()),
                    t = domByClass(this.el, `videoplayer_settings_menu_list_item_${_t}`),
                    i = domByClass(t, "videoplayer_settings_menu_list_value");
                val(i, e)
            }
            _updateQualities() {
                if (this._menu) {
                    var e = domByClass(this._menu, `videoplayer_settings_menu_list_item_${gt}`),
                        t = domByClass(e, "videoplayer_settings_menu_list_value");
                    this._toggleControl(e, this.player.getAvailableQualities().length > 1);
                    var i = this.player.getQuality(),
                        s = this.player.isAutoQualityEnabled() ? `${this.getLang("quality_auto")} ${i}p` : `${i}p`;
                    val(t, s), toggleClass(e, "label_hd", this._isQualityHD(i)), toggleClass(this._btn, "videoplayer_btn_settings_hd", this._isQualityHD(i))
                }
            }
            _updateSubtitles(e, t) {
                var i = domByClass(this.el, `videoplayer_settings_menu_list_item_${vt}`),
                    s = domByClass(i, "videoplayer_settings_menu_list_value");
                this._toggleControl(i, e.length);
                var a = this._getSubtitleTitle(t) || this.getLang("subtitles_off");
                val(s, a)
            }
            disable() {
                this.toggle(!1), this._disabled = !0, setStyle(this._wrap, {
                    cursor: "default"
                })
            }
            enable() {
                this._disabled = !1, setStyle(this._wrap, {
                    cursor: ""
                })
            }
            isOpen() {
                return !hasClass(this._menu, "hidden")
            }
            isSublistOpen() {
                return !!this._currentSublist
            }
            showTooltip() {
                this._disabled || this.isOpen() || this.isSublistOpen() || this.tooltip.show({
                    el: this._btn,
                    text: () => this.getLang("open_settings"),
                    offsetY: 10
                })
            }
            toggle(e = !this.isOpen()) {
                e || this._onSublistClose(!0), e !== this.isOpen() && (toggleClass(this._menu, "hidden", !e), attr(this._menu, "aria-hidden", !e), e ? (this.tooltip.hide(), attr(this._btn, "tabindex", -1), setTimeout(() => this._menuItems[0].focus(), 100)) : (attr(this._btn, "tabindex", 0), domPN(document.activeElement) === this._menu && this._btn.focus()), attr(this._btn, "aria-expanded", e))
            }
        }
        var yt = i("QOPk");
        class bt extends fe {
            constructor(e) {
                super(e), this.buildEl(), this.buildTimelineSlider(), this.buildVolumeSlider(), this.buildSettingsMenu(), this._isTimeReversed = !!Re.getPref("time_reversed"), this.playerListen(d, this.onStateChange), this.playerListen(_, this.onFullscreenChange), this.playerListen(A, this.onMediaTimeupdate), this.playerListen(P, this.updateBuffered), this.playerListen(V, this.updateVolume), this.playerListen(x, this.updateDuration), this.playerListen(m, this.onSeek), this.playerListen(y, () => {
                    this.toggleControl(this.btnExpand, !1)
                }), this.playerListen(Z, this.onLinearAdStarted), this.playerListen(ee, this.onLinearAdCompleted), this.playerListen(J, (e, t, i) => {
                    this.updateTime(e)
                }), this.playerListen(T, this.onLivePhaseChange), this.playerListen(c, e => {
                    this.toggleControl(this.btnSubtitles, this.isControlAvailable("subtitles"))
                }), this.playerListen(g, () => {
                    var e = this.player.getSubtitleTrack();
                    toggleClass(this.btnSubtitles, "active", e > -1), e > -1 ? attr(this.btnSubtitles, "aria-label", this.getLang("disable_subtitles")) : attr(this.btnSubtitles, "aria-label", this.getLang("enable_subtitles"))
                })
            }
            buildEl() {
                this.el = se(`\n<div class="videoplayer_controls">\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_play" role="button" tabindex="0" aria-label="${this.getLang("play")}">\n    ${it("videoplayer_btn_icon videoplayer_play_icon")}\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_next" role="button" tabindex="0" aria-label="${this.getLang("next")}">\n    <div class="videoplayer_btn_icon videoplayer_next_icon"></div>\n  </div>\n  <div class="videoplayer_controls_item videoplayer_live" style="display:none;">\n    ${function(e=""){return`\n<svg class="${e}" viewBox="84 14 42 20" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <g fill="none" fill-rule="evenodd" transform="translate(84 14)">\n    <rect fill="#F75148" width="42" height="20" rx="2"/>\n    <path d="M26.874 6.486l-2.464 7.562c-.17.523-.756.952-1.307.952h-.206c-.552 0-1.136-.426-1.307-.952l-2.464-7.562c-.06-.11-.103-.233-.12-.363L19 6.1h.005C19.002 6.067 19 6.034 19 6c0-.552.448-1 1-1 .52 0 .945.395.995.9H21l2 6.4 2-6.4h.005c.05-.505.476-.9.995-.9.552 0 1 .448 1 1 0 .034-.002.067-.005.1H27l-.007.023c-.016.13-.058.253-.12.363zM31 9V7h3.01c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1h-4.02c-.268 0-.515.11-.696.29-.184.184-.294.432-.294.705v8.01c0 .268.11.516.29.697.18.188.428.298.7.298h4.02c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1H31v-2h3.01c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1H31zM9 13V5.995C9 5.455 8.552 5 8 5c-.556 0-1 .446-1 .995v8.01c0 .268.11.516.29.697.18.188.428.298.7.298h4.02c.54 0 .99-.448.99-1 0-.556-.444-1-.99-1H9zm6-7.005c0-.55.444-.995 1-.995.552 0 1 .456 1 .995v8.01c0 .55-.444.995-1 .995-.552 0-1-.456-1-.995v-8.01z" fill="#F0F2F5"/>\n  </g>\n</svg>\n  `}("videoplayer_btn_icon videoplayer_live_icon")}\n  </div>\n  <div class="videoplayer_controls_item videoplayer_timeline"></div>\n  <div class="videoplayer_controls_item videoplayer_time">\n    <span class="_time_current"></span><span class="_time_duration"></span>\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_mute" role="button" tabindex="0" aria-label="${this.getLang("volume_off")}">\n    ${function(e=""){return`\n<svg class="${e}" xmlns="http://www.w3.org/2000/svg">\n  <g fill="#fff" fill-rule="evenodd">\n    <path class="_wave2" d="M12.980843 18.8227621c-.032051 1.2070086-.6704932 1.608931-1.8287519.6202507-1.7185995-1.4687545-3.60887471-3.1942931-4.24215929-3.7215065-.63217937-.528454-1.64491897-.6202511-3.07284859-.6202511-1.42682441 0-1.81505873-.6202511-1.81505873-1.2405016s-.01369327-1.8288162-.01369327-2.001246c0-.0549443.00464608-.085056.01369327-.1291845.01954957-.0953551-.05817756-.9728525 0-1.591076.08510106-.90556663.38823432-1.24050252 1.81505873-1.24050252 1.42792962 0 2.44066922-.09179716 3.07284859-.62025109.63328458-.52845393 2.52355979-2.25275186 4.24215929-3.72150644 1.1582587-.98868024 1.7967003-.58675756 1.8287514.62025106.0431031 1.60645033 5e-7 3.85020301 5e-7 6.68226949 0 2.8295855.0431032 5.3568042 0 6.9632545zm2.9004386-8.7040437c-.3417088-.34170872-.3417088-.89572808 0-1.23743683.3417087-.34170876.8957281-.34170876 1.2374368 0 .1762598.17625972.4111566.46988072.6409943.87209686C18.1429358 10.4240187 18.375 11.1782274 18.375 12s-.2320642 1.5759813-.6152873 2.2466216c-.2298377.4022161-.4647345.6958371-.6409943.8720968-.3417087.3417088-.8957281.3417088-1.2374368 0-.3417088-.3417087-.3417088-.8957281 0-1.2374368.0737402-.0737403.2138434-.2488693.3590057-.5029032C16.4820642 12.9552687 16.625 12.4907274 16.625 12s-.1429358-.9552687-.3847127-1.3783784c-.1451623-.2540339-.2852655-.4291629-.3590057-.5029032zm3-1.99999997c-.3417088-.34170875-.3417088-.89572811 0-1.23743686.3417087-.34170876.8957281-.34170876 1.2374368 0 .2637116.26371158.6207023.73969919.9665078 1.43131016.5167785 1.03355701.842501 2.25503497.8892639 3.71655167-.0467629 1.4032299-.3724854 2.6247079-.8892639 3.6582649-.3458055.6916109-.7027962 1.1675985-.9665078 1.4313101-.3417087.3417088-.8957281.3417088-1.2374368 0-.3417088-.3417087-.3417088-.8957281 0-1.2374368.1375896-.1375897.3825507-.4642045.638697-.9764971.4071252-.8142505.6673665-1.7901701.7054825-2.8756411-.038116-1.1437578-.2983573-2.11967743-.7054825-2.93392787-.2561463-.51229266-.5011074-.83890747-.638697-.9764971z"/>\n    <path class="_wave1" d="M12.980843 18.8227621c-.032051 1.2070086-.6704932 1.608931-1.8287519.6202507-1.7185995-1.4687545-3.60887471-3.1942931-4.24215929-3.7215065-.63217937-.528454-1.64491897-.6202511-3.07284859-.6202511-1.42682441 0-1.81505873-.6202511-1.81505873-1.2405016s-.01369327-1.8288162-.01369327-2.001246c0-.0549443.00464608-.085056.01369327-.1291845.01954957-.0953551-.05817756-.9728525 0-1.591076.08510106-.90556663.38823432-1.24050252 1.81505873-1.24050252 1.42792962 0 2.44066922-.09179716 3.07284859-.62025109.63328458-.52845393 2.52355979-2.25275186 4.24215929-3.72150644 1.1582587-.98868024 1.7967003-.58675756 1.8287514.62025106.0431031 1.60645033 5e-7 3.85020301 5e-7 6.68226949 0 2.8295855.0431032 5.3568042 0 6.9632545zm2.9004386-8.7040437c-.3417088-.34170872-.3417088-.89572808 0-1.23743683.3417087-.34170876.8957281-.34170876 1.2374368 0 .1762598.17625972.4111566.46988072.6409943.87209686C18.1429358 10.4240187 18.375 11.1782274 18.375 12s-.2320642 1.5759813-.6152873 2.2466216c-.2298377.4022161-.4647345.6958371-.6409943.8720968-.3417087.3417088-.8957281.3417088-1.2374368 0-.3417088-.3417087-.3417088-.8957281 0-1.2374368.0737402-.0737403.2138434-.2488693.3590057-.5029032C16.4820642 12.9552687 16.625 12.4907274 16.625 12s-.1429358-.9552687-.3847127-1.3783784c-.1451623-.2540339-.2852655-.4291629-.3590057-.5029032z"/>\n    <path class="_cross" d="M20 10.7625631l2.3812816-2.38128153c.3417087-.34170876.8957281-.34170876 1.2374368 0 .3417088.34170875.3417088.89572811 0 1.23743686L21.2374369 12l2.3812815 2.3812816c.3417088.3417087.3417088.8957281 0 1.2374368-.3417087.3417088-.8957281.3417088-1.2374368 0L20 13.2374369l-2.3812816 2.3812815c-.3417087.3417088-.8957281.3417088-1.2374368 0-.3417088-.3417087-.3417088-.8957281 0-1.2374368L18.7625631 12l-2.3812815-2.38128157c-.3417088-.34170875-.3417088-.89572811 0-1.23743686.3417087-.34170876.8957281-.34170876 1.2374368 0zm-7.019157 8.060199c-.032051 1.2070086-.6704932 1.608931-1.8287519.6202507-1.7185995-1.4687545-3.60887471-3.1942931-4.24215929-3.7215065-.63217937-.528454-1.64491897-.6202511-3.07284859-.6202511-1.42682441 0-1.81505873-.6202511-1.81505873-1.2405016s-.01369327-1.8288162-.01369327-2.001246c0-.0549443.00464608-.085056.01369327-.1291845.01954957-.0953551-.05817756-.9728525 0-1.591076.08510106-.90556663.38823432-1.24050252 1.81505873-1.24050252 1.42792962 0 2.44066922-.09179716 3.07284859-.62025109.63328458-.52845393 2.52355979-2.25275186 4.24215929-3.72150644 1.1582587-.98868024 1.7967003-.58675756 1.8287514.62025106.0431031 1.60645033 5e-7 3.85020301 5e-7 6.68226949 0 2.8295855.0431032 5.3568042 0 6.9632545z"/>\n  </g>\n</svg>\n  `}("videoplayer_btn_icon videoplayer_volume_icon")}\n  </div>\n  <div class="videoplayer_controls_item videoplayer_volume"></div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_expand" style="display:none;" role="button" tabindex="0" aria-label="${this.getLang("expand")}">\n    ${function(e=""){return`\n<svg class="${e}" viewBox="729 480 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M729 481.994c0-1.1.895-1.994 1.994-1.994h12.012c1.1 0 1.994.895 1.994 1.994v12.012c0 1.1-.895 1.994-1.994 1.994h-12.012c-1.1 0-1.994-.895-1.994-1.994v-12.012zm2 4.004c0-.55.456-.998 1.002-.998h9.996c.553 0 1.002.446 1.002.998v7.004c0 .55-.456.998-1.002.998h-9.996c-.553 0-1.002-.446-1.002-.998v-7.004z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  `}("videoplayer_btn_icon videoplayer_expand_icon")}\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_subtitles" role="button" tabindex="0" aria-haspopup="true" aria-label="${this.getLang("enable_subtitles")}">\n    <div class="videoplayer_btn_icon videoplayer_subtitles_icon"></div>\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_settings" role="button" tabindex="0" aria-haspopup="true" aria-label="${this.getLang("aria_open_settings")}">\n    <div class="videoplayer_btn_icon videoplayer_settings_icon"></div>\n  </div>\n  <div class="videoplayer_controls_item videoplayer_btn videoplayer_btn_fullscreen" role="button" tabindex="0" aria-label="${this.getLang("aria_enter_fullscreen")}">\n    ${function(e=""){return`\n<svg class="${e}" xmlns="http://www.w3.org/2000/svg">\n  <g fill="#fff" fill-rule="evenodd">\n    <path class="_enter" d="M10.5 19c0 .5522847-.4477153 1-1 1H5c-.55228475 0-1-.4477153-1-1v-4.5c0-.5522847.44771525-1 1-1s1 .4477153 1 1v2.0715l3.36290054-3.3643932.00012963-.0001296c.39052429-.3905243 1.02368923-.3905243 1.41421353 0l.0157791.0157791.0001297.0001296c.3904527.3905959.3903366 1.0237609-.0002593 1.4142136L7.4285 18H9.5c.5522847 0 1 .4477153 1 1zM18 7.4285l-3.3629005 3.3643932c-.0000432.0000432-.0000865.0000864-.0001297.0001296-.3905243.3905243-1.0236892.3905243-1.4142135 0l-.0157791-.0157791c-.0000433-.0000432-.0000865-.0000864-.0001297-.0001296-.3904527-.3905959-.3903366-1.02376087.0002593-1.41421356L16.5715 6H14.5c-.5522847 0-1-.44771525-1-1s.4477153-1 1-1H19c.5522847 0 1 .44771525 1 1v4.5c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1z"/>\n    <path class="_exit" d="M4.57969048 13.9787492c0-.5464165.44295809-.9893746.9893746-.9893746h4.45218572c.5464165 0 .9893746.4429581.9893746.9893746v4.4521857c0 .5464165-.4429581.9893746-.9893746.9893746-.54641651 0-.98937461-.4429581-.98937461-.9893746v-2.0494895l-3.3196551 3.3211319-.00012963.0001297c-.39052429.3905243-1.02368927.3905243-1.41421356 0l-.00058487-.0005849-.00012964-.0001297c-.39045268-.3905958-.3903366-1.0237608.00025929-1.4142135l3.32113189-3.3196551H5.56906508c-.54641651 0-.9893746-.4429581-.9893746-.9893746zM14.9681238 7.61855457l3.3196551-3.32113189.0001296-.00012966c.3905243-.39052429 1.0236893-.39052429 1.4142136 0l.0005849.00058488.0001296.00012965c.3904527.39059589.3903366 1.02376086-.0002593 1.41421354l-3.3211319 3.3196551h2.0494895c.5464165 0 .9893746.4429581.9893746.98937461 0 .5464165-.4429581.9893746-.9893746.9893746h-4.4415603c-.5522847 0-1-.4477153-1-1V5.56906508c0-.54641651.4429581-.9893746.9893746-.9893746s.9893746.44295809.9893746.9893746z"/>\n  </g>\n</svg>\n  `}("videoplayer_btn_icon videoplayer_fullscreen_icon")}\n  </div>\n  \x3c!--<div class="videoplayer_controls_item videoplayer_quality" role="button" tabindex="0" aria-haspopup="true" aria-label="${this.getLang("hdsd")}"></div>--\x3e\n  <a class="videoplayer_controls_item videoplayer_btn videoplayer_btn_vk" style="display:none;" target="_blank" rel="noopener" aria-label="${this.getLang("goto_orig_video")}">\n    ${function(e=""){return`\n<svg class="${e}" viewBox="916 568 28 16" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M938.55 575.79s3.6-5.068 3.974-6.79c.188-.625-.187-1-.813-1h-3.065c-.75 0-1.064.313-1.252.75 0 0-1.5 3.66-3.63 6.04-.687.687-1 .906-1.375.906-.188 0-.47-.22-.47-.844v-5.85c0-.752-.094-1.002-.72-1.002h-4.817c-.47 0-.688.264-.688.594 0 .712 1.064.876 1.064 2.88v4.348c0 .813-.063 1.126-.438 1.126-1 0-3.436-3.677-4.88-7.884-.284-.818-.59-1.064-1.346-1.064h-3.13c-.5 0-.812.313-.812.75 0 .783 1 4.663 4.662 9.793 2.44 3.504 5.756 5.32 8.885 5.32 1.877 0 2.315-.314 2.315-1.065v-2.628c0-.563.094-1.032.688-1.032.438 0 1.19.22 2.94 1.908 2.004 2.003 2.19 2.816 3.318 2.816h3.504c.375 0 .688-.188.688-.75 0-.814-1.064-2.19-2.565-3.88-.69-.814-1.72-1.69-2.034-2.128-.437-.563-.312-.813 0-1.314" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  `}("videoplayer_btn_icon videoplayer_vk_icon")}\n  </a>\n</div>\n    `), this.btnSettings = domByClass(this.el, "videoplayer_btn_settings"), this.btnSubtitles = domByClass(this.el, "videoplayer_btn_subtitles"), this.btnPlay = domByClass(this.el, "videoplayer_btn_play"), this.btnNext = domByClass(this.el, "videoplayer_btn_next"), this.btnMute = domByClass(this.el, "videoplayer_btn_mute"), this.btnMuteIcon = domByClass(this.el, "videoplayer_volume_icon"), this.btnExpand = domByClass(this.el, "videoplayer_btn_expand"), this.btnFullscreen = domByClass(this.el, "videoplayer_btn_fullscreen"), this.btnLogo = domByClass(this.el, "videoplayer_btn_vk"), this.liveLabel = domByClass(this.el, "videoplayer_live"), this.timeLabel = domByClass(this.el, "videoplayer_time"), this.timeLabelCurrent = domByClass(this.timeLabel, "_time_current"), this.timeLabelDuration = domByClass(this.timeLabel, "_time_duration"), this.timelineContainer = domByClass(this.el, "videoplayer_timeline"), this.volumeContainer = domByClass(this.el, "videoplayer_volume"), this.domListen(this.btnPlay, "click", () => this.player.togglePlay()), this.domListen(this.btnNext, "click", () => this.player.nextVideo()), this.domListen(this.btnMute, "click", () => this.player.toggleMute()), this.domListen(this.btnMute, "mouseenter", this.onVolumeOver), this.domListen(this.btnMute, "mouseleave", this.onVolumeOut), this.domListen(this.btnExpand, "click", () => this.player.expand()), this.domListen(this.btnFullscreen, "click", () => this.player.toggleFullscreen()), this.domListen(this.btnSubtitles, "click", () => this.player.switchSubtitleTrack(null, !0)), this.domListen(this.timeLabel, "click", () => this.toggleTime()), this.domListen(this.volumeContainer, "mouseenter", this.onVolumeOver), this.domListen(this.volumeContainer, "mouseleave", this.onVolumeOut), this.attachTooltip({
                    el: this.btnNext,
                    text: this.getLang("next"),
                    offsetY: -4
                }), this.attachTooltip({
                    el: this.btnMute,
                    text: () => this._minSize ? "" : this.getLang(this.player.isMuted() ? "volume_on" : "volume_off"),
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
                    text: () => this.getLang(-1 === this.player.getSubtitleTrack() ? "enable_subtitles" : "disable_subtitles"),
                    offsetY: -2,
                    hideOnClick: !0
                }), this.attachTooltip({
                    el: this.btnLogo,
                    text: this.getLang("goto_orig_video"),
                    offsetY: -4
                }), yt.a.enabled || this.toggleControl(this.btnFullscreen, !1)
            }
            buildTimelineSlider() {
                this.timelinePreview = new lt(this.player), this.timelineContainer.appendChild(this.timelinePreview.el), this.timelineSlider = new at(this.player, this, this.timelinePreview), this.timelineContainer.appendChild(this.timelineSlider.el)
            }
            buildVolumeSlider() {
                this.volumeSlider = new nt(this.player), this.volumeContainer.appendChild(this.volumeSlider.el), this.delay(() => {
                    this.updateVolume(this.player.isMuted() ? 0 : this.player.getVolume())
                }, 0)
            }
            buildSettingsMenu() {
                this.settingsMenu = new mt(this.player, this.btnSettings), this.el.appendChild(this.settingsMenu.el)
            }
            initVideo(e) {
                Qe(this.timeLabelCurrent, formatTime(0)), Qe(this.timeLabelDuration, formatTime(this.player.getDuration())), this.toggleControl(this.timelineSlider.el, this.isControlAvailable("timeline")), this.toggleControl(this.timeLabel, this.isControlAvailable("time_label")), this.toggleControl(this.liveLabel, this.isControlAvailable("live_label")), this.toggleControl(this.btnPlay, this.isControlAvailable("play")), this.toggleControl(this.btnNext, this.isControlAvailable("next")), this.toggleControl(this.btnExpand, this.isControlAvailable("expand")), this.toggleControl(this.btnFullscreen, this.isControlAvailable("fullscreen")), this.toggleControl(this.btnLogo, this.isControlAvailable("logo")), this.toggleControl(this.btnSubtitles, !1), this.toggleControl(this.btnSettings, this.isControlAvailable("settings")), attr(this.btnLogo, "href", `/video${e.oid}_${e.vid}`), this.toggleControl(this.btnSettings, this.isControlAvailable("settings")), toggleClass(this.el, "_lite_controls", !!e.app_promo), toggleClass(this.el, "_has_logo", this.isControlAvailable("logo")), toggleClass(this.el, "_has_fullscreen", this.isControlAvailable("fullscreen")), toggleClass(this.btnSubtitles, "active", !1), this.timelineSlider.enable(), this.settingsMenu.enable(), this.getVar("ads_snippet_video") && !this._isTimeReversed && this.toggleTime(!0, !0), this.startTimelineAnimation()
            }
            deinitVideo() {
                Qe(this.timeLabelCurrent, formatTime(0)), Qe(this.timeLabelDuration, formatTime(0)), this.stopTimelineAnimation(), this.timelineSlider.setLoaded(0), this.timelineSlider.setFilled(0), this.timelineSlider.disable(), this.timelinePreview.hide(), this.settingsMenu.disable()
            }
            toggleControl(e, t) {
                setStyle(e, {
                    display: t ? "" : "none"
                })
            }
            isControlAvailable(e) {
                var t = this.player.getVars();
                switch (e) {
                    case "play":
                        return !t.ads_snippet_video;
                    case "next":
                        return !!t.show_next && !this.player.isActiveLive() && !t.ads_snippet_video;
                    case "timeline":
                        return (!t.live || this.player.getLivePhase() == ne) && !t.ads_snippet_video || t.force_timeline;
                    case "time_label":
                        return !t.live || this.player.getLivePhase() == ne;
                    case "live_label":
                        return this.player.isActiveLive();
                    case "expand":
                        return !!t.is_inline && !t.app_promo && !t.ads_snippet_video;
                    case "fullscreen":
                        return !!yt.a.enabled && !t.app_promo && !t.ads_snippet_video;
                    case "settings":
                        return !t.app_promo && !t.ads_snippet_video && (!this.player.isActiveLive() || this.player.getAvailableQualities().length > 1);
                    case "subtitles":
                        return !t.live && this.player.getAvailableSubtitleTracksInfo().length;
                    case "logo":
                        return !!t.is_embed && !t.no_logo;
                    default:
                        return !1
                }
            }
            toggle(e) {
                this._hidden = !e, toggleClass(this.el, "hidden", this._hidden)
            }
            show() {
                this.toggle(!0)
            }
            hide() {
                this.toggle(!1)
            }
            onStateChange(e, t) {
                var i = this.getLang(this.player.getState() === r.PLAYING ? "pause" : "play");
                attr(this.btnPlay, "aria-label", i), this.toggleControl(this.btnPlay, this.isControlAvailable("play")), e === r.ERROR ? this.timelineSlider.disable() : t === r.ERROR && this.timelineSlider.enable()
            }
            onFullscreenChange() {
                var e = this.getLang(this.player.isFullscreen() ? "aria_exit_fullscreen" : "aria_enter_fullscreen");
                attr(this.btnFullscreen, "aria-label", e)
            }
            onMediaTimeupdate(e) {
                this.timelineSlider.dragging || this.updateTime(e)
            }
            startTimelineAnimation() {
                if (!this._timelineAnimationRequestId && window.cancelAnimationFrame) {
                    var e = () => {
                        if (!this._hidden && this.player.getState() === r.PLAYING && !this.player.isActiveLive() && !this.timelineSlider.dragging) {
                            var t = this.player.curTime(),
                                i = this.player.getDuration();
                            if (t && i) {
                                var s = t / i;
                                this.timelineSlider.setFilled(s, !1)
                            }
                        }
                        this._timelineAnimationRequestId = requestAnimationFrame(e)
                    };
                    e()
                }
            }
            stopTimelineAnimation() {
                this._timelineAnimationRequestId && (cancelAnimationFrame(this._timelineAnimationRequestId), this._timelineAnimationRequestId = null)
            }
            updateBuffered(e) {
                this.timelineSlider.setLoaded(e)
            }
            updateVolume(e) {
                var t;
                this.volumeSlider.dragging || this.volumeSlider.setFilled(e), t = e > .5 ? "max" : e > .2 ? "mid" : e > 0 ? "min" : "off", attr(this.btnMuteIcon, "data-value", t);
                var i = this.getLang(e ? "volume_off" : "volume_on");
                attr(this.btnMute, "aria-label", i)
            }
            updateDuration(e) {
                this.player.isPlayingLinearAd() || (this.timelineSlider.updateAria(), Qe(this.timeLabelDuration, formatTime(e)), this.delay(() => {
                    this.resize(...this.player.getSize())
                }, 0))
            }
            updateTime(e) {
                var t = this.player.getDuration(),
                    i = e / t;
                this.timelineSlider.setFilled(i);
                var s = formatTime(this._minSize && this._isTimeReversed ? t - e : e);
                this.timeLabelCurrent.textContent = s
            }
            updateTimeWidth() {
                var e = val(this.timeLabelCurrent),
                    t = formatTime(this.player.getDuration()).replace(/\d/g, "8");
                setStyle(this.timeLabel, {
                    minWidth: ""
                }), Qe(this.timeLabelCurrent, t), setStyle(this.timeLabel, {
                    minWidth: getStyle(this.timeLabel, "width")
                }), Qe(this.timeLabelCurrent, e)
            }
            toggleTime(e, t) {
                (this._minSize || e) && (this._isTimeReversed = !this._isTimeReversed, t || Re.savePref("time_reversed", this._isTimeReversed ? 1 : 0), toggleClass(this.timeLabelCurrent, "_reversed", this._isTimeReversed), this.updateTime(this.player.curTime()))
            }
            resize(e, t) {
                this._minSize = e < 550, setStyle(this.timeLabel, {
                    cursor: this._minSize ? "pointer" : ""
                }), toggle(this.timeLabelDuration, !this._minSize), toggleClass(this.timeLabelCurrent, "_reversed", this._isTimeReversed && this._minSize), this.updateTime(this.player.curTime()), this.updateTimeWidth();
                var i = this._minSize;
                setStyle(this.volumeContainer, {
                    padding: i ? "0" : ""
                }), this.volumeSlider.setVertical(i), this.volumeSlider.toggleVisibility(!i);
                var s = [this.btnMute];
                this.player.isInited() && (this.isControlAvailable("timeline") && s.unshift(this.timelineSlider.el), this.isControlAvailable("time_label") && s.unshift(this.timeLabel), this.isControlAvailable("subtitles") && s.unshift(this.btnSubtitles), this.isControlAvailable("settings") && (s.unshift(this.btnSettings), s.unshift(this.settingsMenu.el))), each(s, (e, t) => show(t)), each(s, (e, t) => {
                    if (this.el.offsetWidth <= this.player.el.offsetWidth) return !1;
                    this.toggleControl(t, !1)
                })
            }
            isActive() {
                return this.timelineSlider.dragging || this.volumeSlider.dragging || this.settingsMenu.isOpen() || this.settingsMenu.isSublistOpen()
            }
            onVolumeOver() {
                this._minSize && (this.volumeSlider.toggleVisibility(!0), this.undelay(this._hideVolumeSliderTimeout))
            }
            onVolumeOut() {
                this._minSize && (this._hideVolumeSliderTimeout = this.delay(() => {
                    this.volumeSlider.toggleVisibility(!1)
                }, 100))
            }
            onLivePhaseChange(e) {
                toggle(this.timelineSlider.el, this.isControlAvailable("timeline")), toggle(this.timeLabel, this.isControlAvailable("time_label")), toggle(this.liveLabel, this.isControlAvailable("live_label"))
            }
            onSeek(e) {
                var t = e / this.player.getDuration();
                this.timelineSlider.setFilled(t), Qe(this.timeLabelCurrent, formatTime(e))
            }
            onLinearAdStarted(e, {
                duration: t
            }) {
                this.timelineSlider.disable(), this.timelinePreview.hide(), this.settingsMenu.disable(), Qe(this.timeLabelDuration, formatTime(intval(t))), this.updateTime(0), this.delay(() => {
                    this.resize(...this.player.getSize())
                }, 0)
            }
            onLinearAdCompleted(e) {
                this.timelineSlider.enable(), this.settingsMenu.enable(), Qe(this.timeLabelDuration, formatTime(this.player.getDuration())), this.updateTime(this.player.curTime()), this.delay(() => {
                    this.resize(...this.player.getSize())
                }, 0)
            }
        }
        var ft = 1,
            St = 2,
            Lt = 3;
        class kt extends fe {
            constructor(e) {
                super(e), this.el = se('\n<div class="videoplayer_share_actions">\n  <div class="_donate"></div>\n  <div class="_like"></div>\n  <div class="_share"></div>\n  <div class="_bookmark"></div>\n  <div class="_add"></div>\n</div>\n    '), this._like = domByClass(this.el, "_like"), this._share = domByClass(this.el, "_share"), this._add = domByClass(this.el, "_add"), this._donate = domByClass(this.el, "_donate"), this._bookmark = domByClass(this.el, "_bookmark"), this.domListen(this._like, "click", e => {
                    this.player.likeVideo(t())
                }), this.attachTooltip({
                    el: this._like,
                    text: this.getLang("like"),
                    toDown: !0,
                    hideDelay: 200
                }), this.domListen(this._share, "click", e => {
                    this.player.shareVideo(t())
                }), this.attachTooltip({
                    el: this._share,
                    text: this.getLang("share"),
                    toDown: !0,
                    hideDelay: 200
                }), this.domListen(this._add, "click", e => {
                    this.player.addVideo(t())
                }), this.attachTooltip({
                    el: this._add,
                    text: () => this.getLang(this.player.videoAdded ? "added" : "add"),
                    toDown: !0,
                    hideDelay: 200
                }), this.domListen(this._donate, "click", e => {
                    this.player.donate(t())
                }), this.attachTooltip({
                    el: this._donate,
                    text: this.getLang("donate"),
                    toDown: !0,
                    hideDelay: 200
                }), this.domListen(this._bookmark, "click", () => {
                    this.player.bookmark(t())
                }), this.attachTooltip({
                    el: this._bookmark,
                    text: () => this.getLang(this.player.videoBookmarked ? "delete_bookmark" : "add_bookmark"),
                    toDown: !0,
                    hideDelay: 200
                });
                var t = () => this.player.getState() === r.ENDED ? St : ft;
                e.on(S, e => {
                    this.setLiked(e)
                }).on(k, e => {
                    this.setAdded(e)
                }).on(w, e => {
                    this.setBookmarked(e)
                })
            }
            initVideo(e) {
                this.setLiked(!!e.liked), this.setAdded(!!e.added), this.setBookmarked(!!e.bookmarked), toggle(this._add, !!e.can_add), toggle(this._donate, !!e.can_donate), toggle(this._bookmark, !!e.can_bookmark), this.updateVisibility()
            }
            setLiked(e) {
                toggleClass(this._like, "_liked", e)
            }
            setAdded(e) {
                toggleClass(this._add, "_added", e)
            }
            setBookmarked(e) {
                toggleClass(this._bookmark, "_bookmarked", e)
            }
            show() {
                removeClass(this.el, "hidden")
            }
            hide() {
                addClass(this.el, "hidden")
            }
            updateVisibility(e = !1) {
                var t = !this.getVar("nolikes"),
                    i = this.getVar("ads_snippet_video"),
                    s = e || !this.player.isPlayingLinearAd() && this.player.getState() !== r.ENDED && !i;
                toggle(this.el, t && s)
            }
        }
        var wt = {
            get supported() {
                return !!document.queryCommandSupported && document.queryCommandSupported("copy")
            },
            copy(e, t = window.utilsNode) {
                var i = !1,
                    s = ce("textarea", {
                        value: e
                    }, {
                        position: "absolute",
                        top: -9999,
                        zIndex: 2
                    });
                t.appendChild(s), browser.msie ? s.setSelectionRange(0, e.length) : s.select();
                try {
                    i = document.execCommand("copy")
                } catch (e) {
                    i = !1
                }
                return re(s), i
            }
        };
        class Ct extends fe {
            constructor(e) {
                super(e), this.el = se(`\n<div class="videoplayer_context_menu hidden">\n  <div class="_item" data-action="copy_link">${this.getLang("cmenu_copy_video_link")}</div>\n  <div class="_item" data-action="copy_timecoded_link">${this.getLang("cmenu_copy_timecode_link")}</div>\n  <div class="_item" data-action="copy_embed_code">${this.getLang("cmenu_copy_embed_code")}</div>\n  <div class="_item" data-action="toggle_pip">${this.getLang("cmenu_enable_pip_mode")}</div>\n  <div class="_item" data-action="toggle_loop">${this.getLang("cmenu_enable_loop")}</div>\n  \x3c!--<div class="_item" data-action="playback_rate">${this.getLang("cmenu_playback_speed")}</div>--\x3e\n  <div class="_item" data-action="rotate_video">${this.getLang("cmenu_rotate")}</div>\n  <a class="_item" href="/support?act=new&from=v" target="_blank">${this.getLang("cmenu_report_error")}</a>\n  <div class="_item" data-action="copy_debug_data">${this.getLang("cmenu_copy_debug")}</div>\n</div>\n    `), this.domListen(this.player.el, "contextmenu", this.onContextmenu), this.domListen(this.el, "click", this.onMenuClick), this.domListen(document.body, "click", this.onLostFocus), this.domListen(this.player.el, "click", this.onLostFocus), this.domListen(window, "blur", this.onLostFocus), this.playerListen(y, this.updateButtonsVisibility), this.playerListen(T, this.updateButtonsVisibility), this.playerListen(H, this.updateButtonsVisibility)
            }
            initVideo(e) {
                this.updateLoopControl(!!e.repeat), this.updateButtonsVisibility()
            }
            updateButtonsVisibility() {
                var e = this.player.getLivePhase() == he,
                    t = e || this.player.isActiveLive();
                toggle(this.el.querySelector("[data-action=copy_timecoded_link]"), !t), toggle(this.el.querySelector("[data-action=copy_embed_code]"), !this.getVar("is_private")), toggle(this.el.querySelector("[data-action=toggle_pip]"), this.player.media.isPiPModeAvailable()), toggle(this.el.querySelector("[data-action=toggle_loop]"), !t), toggle(this.el.querySelector("[data-action=rotate_video]"), !e && this.player.canRotateVideo())
            }
            updateLoopControl(e) {
                var t = this.el.querySelector("[data-action=toggle_loop]");
                val(t, this.getLang(e ? "cmenu_disable_loop" : "cmenu_enable_loop"))
            }
            onMenuClick(e) {
                switch (e.target.getAttribute("data-action")) {
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
                        var t = this.player.toggleLoop();
                        this.delay(() => {
                            this.updateLoopControl(t)
                        }, 200);
                        break;
                    case "rotate_video":
                        e.stopPropagation(), this.player.rotateVideo();
                        break;
                    case "copy_debug_data":
                        var i = this.player.getDebugData();
                        this.copyToClipboard(i)
                }
            }
            copyToClipboard(e) {
                wt.copy(e, this.player.el)
            }
            onContextmenu(e) {
                var t = 5,
                    i = e.target;
                do {
                    if ("A" == i.nodeName) return void this.hide()
                } while (--t && (i = domPN(i)));
                e.preventDefault();
                var s = this.player.el.getBoundingClientRect(),
                    a = this.el.getBoundingClientRect(),
                    r = e.pageX - s.left + 1,
                    l = e.pageY - window.scrollGetY() - s.top + 1;
                r + a.width > s.width && (r = Math.max(0, s.width - a.width)), l + a.height > s.height && (l = Math.max(0, s.height - a.height)), this.show(r, l), this.player.onTouchedByUser()
            }
            onLostFocus(e) {
                this.delay(() => {
                    this.isVisible() && this.hide()
                }, 0)
            }
            show(e, t) {
                setStyle(this.el, {
                    left: e + "px",
                    top: t + "px"
                }), removeClass(this.el, "hidden"), this._visible = !0
            }
            hide() {
                addClass(this.el, "hidden"), this._visible = !1
            }
            isVisible() {
                return !!this._visible
            }
        }
        class Tt extends fe {
            constructor(e) {
                super(e), this.el = se(`\n<div class="videoplayer_end_screen">\n  <div class="videoplayer_end_actions">\n    <div class="_like">\n      ${this.getLang("like")}\n    </div>\n    <div class="_share">\n      ${this.getLang("share")}\n    </div>\n    <div class="_add">\n      ${this.getLang("add")}\n    </div>\n  </div>\n</div>\n    `), this.getVar("md_author") && this.getVar("author_photo") && this.getVar("author_href") && (this._info = se(`\n<div class="videoplayer_end_info">\n  <a href="${this.getVar("author_href")}" target="_blank" rel="noopener">\n    <img class="videoplayer_end_info_author_photo" src="${this.getVar("author_photo")}"/>\n  </a>\n  <div class="videoplayer_end_info_title">${this.getVar("md_title")}</div>\n  <div class="videoplayer_end_info_author_name">\n    <a href="${this.getVar("author_href")}" target="_blank" rel="noopener" class="videoplayer_end_info_author_link">${this.getVar("md_author")}</a>\n    <div class="videoplayer_end_info_subscribe">${function(e=""){return`\n<svg class="${e}" viewBox="0 2 12 8" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M7 5V2H5v3H2v2h3v3h2V7h3V5H7z" fill="#FFF" fill-rule="evenodd" class="_plus"/>\n  <path stroke="#FFF" stroke-width="1.5" fill="none" d="M2 6l2.5 2.5L10 3" class="_mark"/>\n  <path d="M3 3l6 6M9 3L3 9" stroke="#FFF" stroke-width="1.5" fill="none" class="_cancel"/>\n</svg>\n  `}("_icon_subscribe")}</div>\n  </div>\n</div>\n      `), this._subscribeBtn = domByClass(this._info, "videoplayer_end_info_subscribe"), this.el.appendChild(this._info)), this._actions = domByClass(this.el, "videoplayer_end_actions"), this.setLiked(!!e.videoLiked), this.setAdded(!!e.videoAdded), this.setSubscribed(!!e.isSubscribed), this.domListen(this.el, "click", e => {
                    e.target === this.el && this.player.togglePlay()
                }), this.domListen("_like", "click", () => {
                    e.likeVideo(this._largeActions ? Lt : St)
                }), this.domListen("_share", "click", () => {
                    e.shareVideo(this._largeActions ? Lt : St)
                }), this.domListen("_add", "click", () => {
                    e.addVideo(this._largeActions ? Lt : St)
                }), this.domListen(this._subscribeBtn, "click", () => {
                    e.subscribeToAuthor(this._largeActions ? Lt : St)
                }), this.attachTooltip({
                    el: "_like",
                    text: () => this._largeActions ? null : this.getLang("like"),
                    hideDelay: 200
                }), this.attachTooltip({
                    el: "_share",
                    text: () => this._largeActions ? null : this.getLang("share"),
                    hideDelay: 200
                }), this.attachTooltip({
                    el: "_add",
                    text: () => this.getLang(this.player.videoAdded ? "added" : "add"),
                    hideDelay: 200
                }), this.attachTooltip({
                    el: this._subscribeBtn,
                    text: () => this.getLang(this.player.isSubscribed ? "subscribed" : "subscribe"),
                    toDown: !0
                }), this.getVar("can_add") || addClass(this._actions, "_no_add"), this.updateShareActionsVisibility(), toggle(this._subscribeBtn, !!this.getVar("can_subscribe")), this.playerListen(S, e => {
                    this.setLiked(e)
                }), this.playerListen(k, e => {
                    this.setAdded(e)
                }), this.playerListen(C, e => {
                    this.setSubscribed(e)
                })
            }
            setLiked(e) {
                toggleClass(domByClass(this.el, "_like"), "_liked", e)
            }
            setAdded(e) {
                toggleClass(domByClass(this.el, "_add"), "_added", e)
            }
            setSubscribed(e) {
                toggleClass(this._subscribeBtn, "_subscribed", e)
            }
            resize(e, t) {
                this._largeActions = e > 250 && t > 200, toggleClass(this._actions, "_large", this._largeActions)
            }
            updateShareActionsVisibility(e = !0) {
                toggle(this._actions, !this.getVar("nolikes") && e)
            }
            isStretchMode() {
                return !1
            }
        }
        var Et = 5e3;
        class At extends Tt {
            constructor(e, t, i, s) {
                super(e), this._nextVideosData = t, this._fromSuggestions = s, setStyle(this._actions, {
                    marginTop: "-110px"
                }), i && (this.buildNextBlock(), e.nextTimerStopped || this.startTimer()), this.buildSuggestionsBlock(), i || this.showSuggestions(), this.playerListen(b, this.resetTimer), this.playerListen(f, this.startTimer)
            }
            buildNextBlock() {
                var e = this._nextVideosData[0];
                this._nextBlock = se(`\n<div class="videoplayer_end_next_block">\n  <div class="_caption">${this.getLang("next")}</div>\n  <div class="_thumb" style="background-image:url(${e.thumb})"></div>\n  <div class="_thumb_darken"></div>\n  <div class="_timer">\n    <canvas class="_timer_canvas" width="100" height="100"></canvas>\n    ${it("_timer_play_icon")}\n  </div>\n  <div class="_description">\n    <div class="_title">${e.title}</div>\n    <div class="_views">${e.views}</div>\n  </div>\n  <div class="_cancel"></div>\n</div>\n    `), this.domListen(this._nextBlock, "click", this.onNextClick), this.domListen(domByClass(this._nextBlock, "_cancel"), "click", this.onNextCancelClick), this.el.appendChild(this._nextBlock)
            }
            buildSuggestionsBlock() {
                var e = this.player.getVideoId();
                this._suggestionsBlock = ce("div", {
                    className: "videoplayer_end_suggestions _before_intro"
                }), each(this._nextVideosData, (t, i) => {
                    var s = i.href || "/video" + i.vid,
                        a = se(`\n<a class="_item" href="${s}">\n  <div class="_item_thumb" style="background-image:url(${i.thumb});"></div>\n  <div class="_item_title">${i.title}</div>\n  <div class="_item_views">${i.views}</div>\n</a>\n      `);
                    i.vid == e && domByClass(a, "_item_thumb").appendChild(se(`\n<div class="_item_replay">\n  <div class="_item_replay_text">${it("_item_replay_icon")}${this.getLang("replay")}</div>\n</div>\n        `)), this.domListen(a, "click", this.onSuggestionClick.bind(this, i.vid, t + 1)), this._suggestionsBlock.appendChild(a)
                }), this.el.appendChild(this._suggestionsBlock)
            }
            startTimer() {
                if (this._nextBlock && !this.minMode && window.CanvasRenderingContext2D) {
                    var e = domByClass(this._nextBlock, "_timer_canvas"),
                        t = e.getContext("2d");
                    t.lineWidth = 6, t.lineCap = "round", t.strokeStyle = "#fff";
                    var i = Date.now(),
                        s = () => {
                            var e = (Date.now() - i) / Et;
                            e < 1 ? (t.clearRect(0, 0, 100, 100), t.beginPath(), t.arc(50, 50, 47, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * e), t.stroke(), this._nextTO = setTimeout(s, 16)) : this.player.nextVideo(this._nextVideosData[0].vid, !0, !0)
                        };
                    show(e), this.timerInProgress = !0, s()
                }
            }
            resetTimer() {
                this._nextBlock && window.CanvasRenderingContext2D && (clearTimeout(this._nextTO), this.timerInProgress = !1, hide(domByClass(this._nextBlock, "_timer_canvas")))
            }
            showSuggestions() {
                removeClass(this._suggestionsBlock, "_before_intro");
                var e = this.isStretchMode(...this.player.getSize());
                this.player.onSuggestionsShown(e, this._fromSuggestions)
            }
            onNextClick() {
                var e = this._nextVideosData[0];
                this.player.nextVideo(e.vid, !0)
            }
            onNextCancelClick(e) {
                e.stopPropagation(), this.resetTimer(), re(this._nextBlock), this._nextBlock = null, this.showSuggestions()
            }
            onSuggestionClick(e, t, i) {
                i.ctrlKey || browser.mac && i.metaKey || (i.preventDefault(), i.stopPropagation(), this.player.getVideoId() == e ? (this.player.onTouchedByUser(), this.player.onSuggestionsReplayClicked()) : e && (this.getVar("is_embed") ? window.open(i.currentTarget.href, "_blank") : this._fromSuggestions ? this.player.onSuggestionClicked(e, this._stretchMode, t) : this.player.nextVideo(e)), this.player.el.focus())
            }
            resize(e, t) {
                var i = e < 600 || t < 350;
                if (this.minMode = i, toggle(this._nextBlock, !i), this._suggestionsBlock) {
                    var s = this.isStretchMode(e, t),
                        a = s ? 4 : 10,
                        r = s ? Math.floor((e - 6) / 3 - 2 * a) : 180,
                        l = s ? Math.round(r / 1.777) : 100;
                    each(geByClass("_item", this._suggestionsBlock), (e, t) => {
                        setStyle(t, {
                            width: r + "px",
                            padding: `0 ${a}px`
                        }), setStyle(domFC(t), {
                            height: l + "px"
                        })
                    }), setStyle(this._suggestionsBlock, {
                        marginTop: s ? -Math.round(l / 2) + "px" : ""
                    }), toggle(this._suggestionsBlock, !i || s), this.updateShareActionsVisibility(!s), toggleClass(this._info, "_right_offset", s && !this.getVar("nolikes")), this._stretchMode = s
                }
                setStyle(this._actions, {
                    marginTop: i ? "" : "-110px"
                }), i && this.timerInProgress ? this.resetTimer() : this.timerInProgress || this.player.nextTimerStopped || this.startTimer()
            }
            isStretchMode(e, t) {
                return !!this._suggestionsBlock && 400 <= e && e <= 600 && 250 <= t && t <= 510
            }
            destroy() {
                super.destroy(), this.resetTimer()
            }
        }
        class Pt extends fe {
            constructor(e) {
                super(e), this.el = se(`\n<div class="videoplayer_end_screen">\n  <div class="videoplayer_end_actions">\n    <div class="_replay">\n    </div>\n    <a class="_go" ${this.getVar("link_attr")}>\n      <div class="go_button_title">${this.getVar("ads_snippet_video_button_title")}</div>\n      <div class="go_button_domain">${this.getVar("ads_snippet_video_button_domain")}</div>\n    </a>\n  </div>\n</div>\n    `), this.domListen("_replay", "click", () => {
                    e.play()
                })
            }
            resize() {}
            isStretchMode() {
                return !1
            }
        }
        var Vt = 10,
            xt = 6,
            It = 3e3;
        class Dt extends fe {
            constructor(e) {
                super(e), this.el = se('\n<div class="videoplayer_tooltip">\n  <div class="_text"></div>\n  <div class="_arrow"></div>\n</div>\n    '), this._text = domByClass(this.el, "_text"), this._arrow = domByClass(this.el, "_arrow"), this._shown = !1
            }
            show({
                el: e,
                text: t,
                toDown: i = !1,
                offsetXpercent: s = .5,
                offsetY: a = 9
            }) {
                if (t = isFunction(t) ? t() : t) {
                    show(this.el), val(this._text, t);
                    var r, l = this.player.el.getBoundingClientRect(),
                        n = e.getBoundingClientRect(),
                        o = this.el.getBoundingClientRect(),
                        h = n.left - l.left + Math.round(n.width * s) - Math.round(o.width / 2),
                        d = (i ? n.bottom : n.top) - l.top - (i ? 0 : o.height) + a * (i ? 1 : -1);
                    h < Vt ? (r = h - Vt - xt, h = Vt) : h + o.width > l.width - Vt && (r = h + o.width - (l.width - Vt) - xt, h = l.width - o.width - Vt), setStyle(this.el, {
                        left: h + "px",
                        top: d + "px"
                    }), setStyle(this._arrow, {
                        marginLeft: r ? r + "px" : null
                    }), toggleClass(this._arrow, "_arrow_up", i), this.undelay(this._hideDelayedTimeout), this.undelay(this._hideTimeout), this._hideTimeout = this.delay(this.hide, It), this._shown = !0
                }
            }
            hide() {
                this._shown && (this._shown = !1, hide(this.el), this.lastShown = Date.now())
            }
            hideWithDelay(e = 0) {
                this._shown && (this._hideDelayedTimeout = this.delay(this.hide, e))
            }
            isVisible() {
                return this._shown
            }
        }
        var Mt = 5e3,
            Rt = 3;
        class Bt extends fe {
            constructor(e) {
                super(e), this.el = ce("div", {
                    className: "videoplayer_donations_layer"
                }), this._currentItems = [], this._queuedItems = [], this._supportsTransitions = "transition" == qe("transition"), this.resize(...e.getSize()), this.playerListen(E, this.pushDonation), this.playerListen(d, this.onStateChange)
            }
            pushDonation(e, t) {
                if (!this._hidden) {
                    var i;
                    switch (e) {
                        case "gift":
                            i = this.giftTpl(t);
                            break;
                        case "comment":
                            if (!t.commentText) return;
                            i = this.commentTpl(t)
                    }
                    if (i) {
                        var s = {
                            el: se(i),
                            type: e,
                            senderId: t.senderId,
                            giftId: t.giftId,
                            count: 1,
                            inserted: !1
                        };
                        this.queueItem(s)
                    }
                }
            }
            queueItem(e) {
                if ("gift" == e.type) {
                    var t = this.findSenderGift(e.senderId, e.giftId);
                    if (t) return void this.increaseGiftCount(t)
                }
                if (this._currentItems.length >= Rt) this._queuedItems.push(e);
                else if (this._currentItems.push(e), "gift" == e.type) {
                    var i = new Image;
                    i.onload = (() => this.insertItem(e)), i.src = this.giftImgSrc(e.giftId)
                } else this.insertItem(e)
            }
            insertItem(e) {
                e.timeout = this.delay(() => this.removeItem(e), Mt), e.inserted = !0, this.el.insertBefore(e.el, domFC(this.el)), this._supportsTransitions && (setStyle(e.el, {
                    transition: "none",
                    opacity: 0,
                    marginTop: -e.el.offsetHeight + "px",
                    marginBottom: 0
                }), e.el.offsetHeight, setStyle(e.el, {
                    transition: "",
                    opacity: "",
                    marginTop: "",
                    marginBottom: ""
                }))
            }
            checkQueue() {
                for (; this._currentItems.length < Rt && this._queuedItems.length;) {
                    var e = this._queuedItems.shift();
                    this.queueItem(e)
                }
            }
            findSenderGift(e, t) {
                for (var i of this._currentItems)
                    if (i.senderId === e && i.giftId === t && i.count < 9) return i
            }
            increaseGiftCount(e) {
                e.count += 1;
                var t = domByClass(e.el, "_gift_count");
                val(t, function(e, t = "") {
                    var i = "";
                    switch (e) {
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
                    return `\n<svg class="${t}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <g fill="none" fill-rule="evenodd">\n    <path d="M8.832 19.334c-.2 0-.38-.08-.54-.24-.17-.168-.253-.35-.253-.546 0-.215.088-.406.266-.575l1.6-1.6-1.6-1.6c-.178-.186-.267-.382-.267-.587 0-.196.074-.37.225-.52.155-.154.33-.232.526-.232.21 0 .404.09.582.267l1.607 1.6 1.59-1.592c.184-.183.38-.274.59-.274.195 0 .375.082.54.246.16.16.238.34.238.54 0 .21-.088.404-.266.582l-1.6 1.6 1.6 1.606c.182.177.273.37.273.58 0 .192-.077.365-.232.52-.155.155-.33.233-.526.233-.21 0-.404-.088-.582-.266l-1.6-1.606-1.6 1.6c-.176.177-.368.266-.573.266z" fill="#000"/>\n    <path d="${i}" fill="#000"/>\n  </g>\n</svg>\n  `
                }(e.count, "_gift_count_icon")), e.inserted && (this._supportsTransitions && !this._hidden && (setStyle(t, {
                    transform: "scale(1.5)"
                }), this.domListenOnce(t, "transitionend", () => {
                    setStyle(t, {
                        transform: ""
                    })
                })), this.undelay(e.timeout), e.timeout = this.delay(() => this.removeItem(e), Mt))
            }
            removeItem(e) {
                var t = indexOf(this._currentItems, e),
                    i = this.getItemVerticalMargin(t),
                    s = Math.max(i, this.getItemVerticalMargin(t - 1)),
                    a = Math.max(i, this.getItemVerticalMargin(t + 1));
                this._currentItems.splice(t, 1), this._supportsTransitions && !this._hidden ? (setStyle(e.el, {
                    opacity: 0,
                    marginTop: s + "px",
                    marginBottom: -(e.el.offsetHeight + Math.max(s, a)) + "px",
                    marginLeft: "-150%"
                }), this.domListenOnce(e.el, "transitionend", () => re(e.el))) : re(e.el), this.checkQueue()
            }
            getItemVerticalMargin(e) {
                var t = this._currentItems[e];
                if (t) {
                    if ("gift" == t.type) return 32;
                    if ("comment" === t.type) return 15
                }
                return 0
            }
            donationTpl(e, t, i, s) {
                return `\n<div class="videoplayer_donation videoplayer_donation_${e}">\n  <div class="_sender_info_wrap">\n    <img class="_sender_photo" src="${t.senderPhoto}"/>\n    <div class="_sender_name">${t.senderName}</div>\n    <div class="_sender_event">${i}</div>\n  </div>\n  ${s}\n</div>\n    `
            }
            commentTpl(e) {
                var t = this.getLang("live_user_sent_supercomment", !1, {
                        sex: e.senderSex
                    }) + function(e = "") {
                        return `\n<svg class="${e}" viewBox="230 33 12 16" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <g fill="#99C5FF" fill-rule="evenodd">\n    <path d="M234.665 47.746c-.367.416-.563.32-.435-.22L236.006 40h4.478c.556 0 .712.333.34.754l-6.16 6.992z"/>\n    <path d="M237.337 34.254c.366-.416.56-.32.433.22L235.998 42h-4.466c-.554 0-.7-.344-.34-.754l6.145-6.992z"/>\n  </g>\n</svg>\n  `
                    }("_comment_icon"),
                    i = `<div class="_comment_text">${e.commentText}</div>`;
                return this.donationTpl("comment", e, t, i)
            }
            giftTpl(e) {
                var t = this.getLang("live_user_sent_gift", !1, {
                        sex: e.senderSex
                    }),
                    i = `<img class="_gift_img" src="${this.giftImgSrc(e.giftId)}"/><div class="_gift_count"></div>`;
                return this.donationTpl("gift", e, t, i)
            }
            giftImgSrc(e) {
                return `/images/gift/${e}/${isRetina()?256:96}.png`
            }
            updateVisibility() {
                var [e, t] = this.player.getSize(), i = this.player.getState();
                this._hidden = e < 640 || t < 360 || i !== r.PLAYING && i !== r.PAUSED, toggle(this.el, !this._hidden)
            }
            resize() {
                this.updateVisibility()
            }
            onStateChange() {
                this.updateVisibility()
            }
            destroy() {
                super.destroy(), each(this._currentItems, (e, t) => this.undelay(t.timeout)), this._currentItems = null, this._queuedItems = null, re(this.el)
            }
        }
        class Ft extends fe {
            constructor(e) {
                super(e), this.el = ce("div", {
                    className: "videoplayer_timed_buttons_conatainer"
                }), this.playerListen(A, this.onTimeupdate), this.playerListen(d, this.onStatChange)
            }
            initVideo(e) {
                var t = this.player.getVideoId();
                "-107437894_456239018" === t ? this._timings = [{
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
                }] : "-132124064_456239166" === t && (this._timings = [{
                    timeShow: 0,
                    timeHide: 134,
                    type: "link",
                    text: "checkin",
                    url: "https://vk.cc/6Nnalx"
                }])
            }
            deinitVideo() {
                this._timings = null, this.hideButton()
            }
            onTimeupdate(e) {
                if (this._timings) {
                    if (null != this._curIndex) {
                        var t = this._timings[this._curIndex];
                        if (t.timeShow <= e && e <= t.timeHide) return;
                        this.hideButton()
                    }
                    for (var i = 0; i < this._timings.length; ++i) {
                        var s = this._timings[i];
                        if (s.timeShow <= e && e <= s.timeHide) {
                            this.showButton(i, s);
                            break
                        }
                    }
                }
            }
            onStatChange(e, t) {
                e !== r.ENDED && e !== r.ERROR || this.hideButton()
            }
            showButton(e, t) {
                this.hideButton(), this._curIndex = e;
                var i = this.getLang("timed_button_" + t.text);
                "link" === t.type && (i = function(e = "") {
                    return `\n<svg class="${e}" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M2.587 2.587L0 0h7v7L4.61 4.61c-.564.644-1.144 1.47-1.408 2.367C2.865 8.652 4.135 10 4.135 10S1 9.66 1 5.965c0-1.355.797-2.538 1.587-3.378z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  `
                }("_link_icon") + i), this._curButton = ce("a", {
                    className: "videoplayer_timed_button hidden",
                    innerHTML: i,
                    href: "/away.php?to=" + encodeURIComponent(t.url),
                    target: "_blank"
                }), this.domListen(this._curButton, "click", e => {
                    ! function(e, t = {
                        blank: !0,
                        throughAway: !0
                    }) {
                        t.throughAway && !/\/away\.php/.test(e) && (e = "/away.php?to=" + encodeURIComponent(e)), window.open(e, t.blank ? "_blank" : "").opener = null
                    }(e.currentTarget.href), this.player.pause(), e.preventDefault(), e.stopPropagation()
                }), this.el.appendChild(this._curButton), this._curButton.offsetHeight, removeClass(this._curButton, "hidden")
            }
            hideButton() {
                if (null != this._curIndex) {
                    var e = this._curButton;
                    this._curButton = this._curIndex = null, addClass(e, "hidden"), setTimeout(() => re(e), 150)
                }
            }
        }
        var Nt = "bottom",
            Ht = "top";
        class Ot extends fe {
            constructor(e) {
                super(e), this.el = se('\n<div class="videoplayer_subtitle_layer">\n    <div class="videoplayer_subtitle_layer__region_top"></div>\n    <div class="videoplayer_subtitle_layer__region_bottom"></div>\n</div>\n    '), this._bottomRegion = domByClass(this.el, `videoplayer_subtitle_layer__region_${Nt}`), this._topRegion = domByClass(this.el, `videoplayer_subtitle_layer__region_${Ht}`), this.playerListen(Y, this._showTip), this.playerListen(q, this._updateMargins), this.playerListen(W, this._updateMargins), this.playerListen(F, () => {
                    this.clear()
                }), this.playerListen(N, () => {
                    this.clear()
                }), this.playerListen(g, () => {
                    this.clear()
                }), this._updateMargins(), this.resize(...this.player.getSize())
            }
            _addToRegion(e, t = Nt) {
                var i = this._getRegionEl(t);
                i && i.appendChild(e)
            }
            _buildCueEl(e) {
                return se(`\n      <div>\n        <span class="videoplayer_subtitle_layer__cue">${e.text}</span>\n      </div>\n    `)
            }
            _getRegionEl(e) {
                var t = null;
                switch (e) {
                    case Nt:
                        t = this._bottomRegion;
                        break;
                    case Ht:
                        t = this._topRegion
                }
                return t
            }
            _showTip(e) {
                if (e) {
                    var t = clean(e.name).replace(/&amp;/g, "&");
                    if (e.lang) {
                        var i = this.getVar("subtitles_langs")[e.lang].name;
                        i !== e.name && (t = `${i} (${t})`)
                    }
                    var s = this.getLang("subtitles_enabled_tip");
                    s = (s = s.replace("{current}", t)).replace("{icon}", '<span class="videoplayer_subtitle_layer__tip_icon"></span>');
                    var a = this._buildCueEl({
                        text: s
                    });
                    this.clear(Ht), this._addToRegion(a, Ht), setTimeout(() => {
                        this.clear(Ht)
                    }, 2e3)
                }
            }
            _updateMargins() {
                toggleClass(this._bottomRegion, "_controls_offset", this.player.isControlsVisible())
            }
            clear(e = Nt) {
                var t = this._getRegionEl(e);
                t && val(t, "")
            }
            update(e) {
                if (this.clear(), e.length) {
                    for (var t = document.createDocumentFragment(), i = 0; i < e.length; i++) {
                        var s = e[i];
                        t.appendChild(this._buildCueEl(s))
                    }
                    this._addToRegion(t)
                }
            }
            destroy() {
                super.destroy(), re(this.el)
            }
            resize(e, t) {
                var i = Math.floor(29 * Math.max(0, e - 350) / 1650),
                    s = Math.min(40, 11 + i),
                    a = .5 * Math.max(0, 2e3 - e) / 1650,
                    r = Math.min(1.9, 1.4 + a);
                setStyle(this.el, {
                    fontSize: `${s}px`,
                    lineHeight: `${r}`
                })
            }
        }
        var Ut = 500;
        class $t extends fe {
            constructor(e) {
                super(e), this.el = se('\n<a class="videoplayer_action_button" target="_blank" href=""></a>\n    '), hide(this.el), this.playerListen(q, this._updateMargins), this.playerListen(W, this._updateMargins), this.domListen(this.el, "click", () => {
                    this._onLinkOpened()
                })
            }
            deinitVideo() {
                hide(this.el)
            }
            initVideo(e) {
                var t = e.action_button;
                this.setLink(t), this._updateMargins()
            }
            setLink(e) {
                if (this.domUnlisten(this.el, "mouseenter"), this.domUnlisten(this.el, "mouseleave"), removeClass(this.el, "_opened"), e) {
                    switch (e.type) {
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
                    val(this.el, this._linkTitle), this.el.setAttribute("href", e.url), show(this.el), this.player.trigger(j, {
                        data: e
                    })
                } else hide(this.el)
            }
            _onLinkOpened() {
                this.player.trigger(K), hasClass(this.el, "_opened") || (addClass(this.el, "_opened"), this.attachTooltip())
            }
            _onMouseEnter() {
                Date.now() - this.tooltip.lastShown < 50 ? this._showTooltip() : this._tooltipTimeout = setTimeout(this._showTooltip.bind(this), Ut)
            }
            _onMouseLeave() {
                this.tooltip.hide(), clearTimeout(this._tooltipTimeout)
            }
            _showTooltip() {
                this.tooltip.show({
                    el: this.el,
                    text: () => this._linkTitle,
                    offsetY: 10
                })
            }
            _updateMargins() {
                toggleClass(this.el, "_controls_offset", this.player.isControlsVisible())
            }
        }
        var zt = 3e3,
            Qt = 10,
            qt = 1 / 24,
            Wt = .05,
            Gt = .05;
        class Yt extends fe {
            constructor(e) {
                super(e), this.el = ce("div", {
                    className: "videoplayer_ui"
                }), this.waiting = se(getProgressHtml("", "videoplayer_waiting pr_big")), this.el.appendChild(this.waiting), this.title = ce("div", {
                    className: "videoplayer_title"
                }), this.titleLink = ce("a", {
                    className: "videoplayer_title_link",
                    target: "_blank"
                }), this.title.appendChild(this.titleLink), this.el.appendChild(this.title), this.error = ce("div", {
                    className: "videoplayer_error hidden"
                }), attr(this.error, "role", "alert"), this.el.appendChild(this.error), this.liveWaiting = ce("div", {
                    className: "videoplayer_live_waiting hidden"
                }), this.el.appendChild(this.liveWaiting), this.thumb = ce("div", {
                    className: "videoplayer_thumb hidden",
                    innerHTML: `<div class="videoplayer_big_play_btn"><div class="videoplayer_big_play_btn_bg"></div>${it("videoplayer_big_play_icon")}</div>`
                }), this.el.appendChild(this.thumb), this.controls = new bt(e), this.el.appendChild(this.controls.el), this.shareActions = new kt(e), this.el.appendChild(this.shareActions.el), this.contextMenu = new Ct(e), this.el.appendChild(this.contextMenu.el), this.playerTooltip = new Dt(e), this.el.appendChild(this.playerTooltip.el), this.actionButton = new $t(this.player), this.el.appendChild(this.actionButton.el), this.autoplayTimer = ce("div", {
                    className: "videoplayer_autoplay_timer hidden",
                    innerHTML: '<div class="videoplayer_autoplay_timer_equalizer" style="display:none;"><div class="_col"></div><div class="_col"></div><div class="_col"></div></div><span class="videoplayer_autoplay_timer_text"></span>'
                }), this.autoplayTimerEqualizer = domByClass(this.autoplayTimer, "videoplayer_autoplay_timer_equalizer"), this.autoplayTimerText = domByClass(this.autoplayTimer, "videoplayer_autoplay_timer_text"), this.el.appendChild(this.autoplayTimer), this.autoplayHint = ce("div", {
                    className: "videoplayer_autoplay_hint hidden"
                }), this.el.appendChild(this.autoplayHint), this.timedButtons = new Ft(e), this.el.appendChild(this.timedButtons.el), this.domListen(e.el, "keydown", this.onKeyDown), this.domListen(e.el, "keyup", this.onKeyUp), this.domListen(e.el, "blur", this.onBlur), this.domListen(e.el, "mousedown", this.onMouseDown), this.domListen(e.el, "click", this.onClick), this.domListen(e.el, "dblclick", this.onDoubleClick), this.domListen(e.el, "mouseenter", this.onMouseEnter), this.domListen(e.el, "mousemove", this.onMouseMove), this.domListen(e.el, "mouseleave", this.onMouseLeave), this.playerListen(d, this.onStateChange), this.playerListen(_, this.onFullscreenChange), this.playerListen(T, this.onLivePhaseChange), this.playerListen(D, this.onMediaPlaying), this.playerListen(A, this.onMediaTimeupdate), this.playerListen(I, this.updateWaiting), this.playerListen(O, this.showLiveWarning), this.playerListen(X, this.updateWaiting), this.playerListen(Z, this.onLinearAdStarted), this.playerListen(ee, this.onLinearAdCompleted), this.playerListen(y, this.onPlayerExpanded), this.playerListen(v, this._onSubtitleCueChange), this.playerListen(g, this._onSubtitlesSwitched), this.playerListen(c, this._showSubtitlesIntro), this._mouseInside = !1, this._lastUserActivity = Date.now(), this._checkUserActivityInterval = setInterval(this.checkUserActivity.bind(this), 100)
            }
            initVideo(e) {
                if (setStyle(this.thumb, {
                        backgroundImage: `url(${this.player.getThumbSrc()})`
                    }), e.stretch_vertical && !e.is_aurora) {
                    var t = this.calculateBackgroundSizeForVerticalThumb();
                    setStyle(this.thumb, {
                        backgroundSize: t
                    })
                }
                if (this.updateTitle(e.md_title, e.explicit), toggleClass(this.titleLink, "_right_offset", !e.nolikes), toggleClass(this.titleLink, "_clickable", !!e.is_embed), e.live && this.onLivePhaseChange(e.live), e.stickers_promo && this.buildStickersPromo(...e.stickers_promo.split("|")), this._mouseInside = isHover(this.el), this._lastUserActivity = Date.now(), this.updateWaiting(), this.player.isAutoplay()) {
                    var i = this.player.isActiveLive() ? '<span class="videoplayer_autoplay_timer_live_icon"></span>' : formatTime(this.player.getDuration());
                    val(this.autoplayTimerText, i), toggleClass(this.autoplayTimer, "_live", this.player.isActiveLive()), e.ads_snippet_video || val(this.autoplayHint, this.getLang("autoplay_expand_hint")), this._mouseInside || this.player.getState() !== r.PLAYING || this.hideUI({
                        noTransition: !0
                    })
                }
                "apps_slider" === e.module && (this._uiDisabled = !0, this.hideUI({
                    hideCursor: !1,
                    noTransition: !0
                })), ["story", "ads_intro"].includes(e.module) && (this._uiDisabled = !0, this.hideUI({
                    hideCursor: !1,
                    noTransition: !0
                }), this.controls.destroy(), this.shareActions.destroy(), this.contextMenu.destroy(), re(this.controls.el), re(this.shareActions.el)), e.is_aurora && this.player.isActiveLive() && (this.donationsLayer = new Bt(this.player), this.el.appendChild(this.donationsLayer.el)), this.adsClickOverlay && re(this.adsClickOverlay), e.ads_snippet_video && (this._adsSnippetsVideo = !0, addClass(this.el, "no_gradient"), this.adsClickOverlay = se(`<a class="videoplayer_ads_click_overlay" ${e.link_attr}></a>`), this.el.appendChild(this.adsClickOverlay)), this._ignoreNoticeTypes = [], this._ignoreLiveWarning = !1
            }
            deinitVideo() {
                this.endScreen && this.removeEndScreen(), this.donationsLayer && (clearTimeout(this._randDonationTimeout), this.donationsLayer.destroy(), this.donationsLayer = null), this._subtitleLayer && (this._subtitleLayer.destroy(), this._subtitleLayer = null), this.tooltip.hide(), this.toggleLiveDummy(!1), this.updateWaiting(), this.removeStickersPromo(), this.removeNotice(), this.hideLiveWarning(), this.undelay(this._featureSubtitlesTimeout)
            }
            _showSubtitlesIntro(e = this.player.getAvailableSubtitleTracksInfo()) {
                if (this.player.isInLayer() && e.length) {
                    var t = Re.getPref("video_feature_subtitles") || 0;
                    t >= 5 || (this.showUI(), this._featureSubtitlesTimeout = this.delay(() => {
                        if (cur.featurePlayerSubtitlesTT || this.player.isMinimized() || this.player.isFullscreen()) return this._featureSubtitlesTimeout = null, this.hideUI(), !1;
                        Re.savePref("video_feature_subtitles", ++t), this.player.externalCall("showSubtitlesIntro", domByClass(this.el, "videoplayer_btn_subtitles"), this.getLang("subtitles_intro_tooltip"))
                    }, 2500))
                }
            }
            onTouchedByUser() {
                addClass(this.autoplayHint, "hidden"), addClass(this.autoplayTimer, "hidden"), setStyle(this.player.el, {
                    cursor: ""
                })
            }
            onMouseDown(e) {
                this.onKeyboardFocus(!1), this._clickTarget = e.target
            }
            onClick(e) {
                if (e.stopPropagation(), this._lastUserActivity = Date.now(), !this.contextMenu.isVisible() && !this._uiDisabled) {
                    var t = this.isBackgroundElement(this._clickTarget);
                    this.player.isAutoplay() && !this._adsSnippetsVideo ? (t && this.player.expand(), this.player.onTouchedByUser()) : t && this.player.togglePlay()
                }
            }
            onDoubleClick(e) {
                e.target != this.player.el && e.target != this.player.media.el || this._adsSnippetsVideo || this.player.toggleFullscreen()
            }
            onKeyDown(e) {
                var t = inArray(attr(e.target, "role"), ["button", "menuitemradio"]);
                switch (e.keyCode) {
                    case KEY.TAB:
                        this.onKeyboardFocus(!0);
                        break;
                    case KEY.SPACE:
                    case KEY.ENTER:
                        t && this._keyboardFocus ? (this._clickTarget = e.target, e.target.click()) : e.keyCode == KEY.SPACE && this.player.togglePlay(), e.preventDefault();
                        break;
                    case KEY.UP:
                    case KEY.DOWN:
                        var i = e.keyCode == KEY.UP ? 1 : -1;
                        this._keyboardFocus ? (this.onKeyboardFocus(!0), e.target === this.controls.btnSettings.el || e.target === this.controls.timelineSlider.el && this.keyboardSlideProgress(i, e.altKey)) : this.keyboardSlideVolume(i), e.preventDefault();
                        break;
                    case KEY.LEFT:
                    case KEY.RIGHT:
                        var s = e.keyCode == KEY.RIGHT ? 1 : -1;
                        e.target === this.controls.volumeSlider.el && this._keyboardFocus ? (this.onKeyboardFocus(!0), this.keyboardSlideVolume(s, e.altKey)) : this.keyboardSlideProgress(s, e.altKey), e.preventDefault();
                        break;
                    case 70:
                        this.player.toggleFullscreen(), e.preventDefault();
                        break;
                    case 77:
                        this.player.toggleMute(), e.preventDefault()
                }
                this._lastUserActivity = Date.now(), this.tooltip.hide(), this.showUI(), this.player.onTouchedByUser()
            }
            isBackgroundElement(e) {
                return e === this.player.el || e === this.controls.el || e === this.title || e === this.player.media.el || this.player.media.el.contains(e) || e === this.thumb
            }
            keyboardSlideProgress(e, t = !1) {
                if (t && !this.frameSeeking && (this.frameSeeking = !0, this.player.trigger(z, !0)), this.player.getState() != r.UNSTARTED && !this.player.isPlayingLinearAd()) {
                    var i = t ? qt : Qt;
                    this.player.seekBy(i * e)
                }
            }
            keyboardSlideVolume(e) {
                var t = Wt * e;
                this.player.setVolume(this.player.getVolume() + t)
            }
            onKeyUp(e) {
                e.keyCode == KEY.ALT && this.frameSeeking && (this.frameSeeking = !1, this.player.trigger(Q))
            }
            onKeyboardFocus(e) {
                this._keyboardFocus = e, toggleClass(this.el, "_keyboard_focus", e)
            }
            onBlur(e) {
                this.frameSeeking && (this.frameSeeking = !1, this.player.trigger(Q))
            }
            onMouseEnter(e) {
                this._mouseInside = !0, this.showUI()
            }
            onMouseLeave(e) {
                this._mouseInside = !1;
                var t = this.player.getState() === r.PLAYING,
                    i = this.player.getState() == r.PAUSED && this.player.isAutoplay();
                !t && !i || this.controls.isActive() || this._adsSnippetsVideo || this.hideUI()
            }
            onMouseMove(e) {
                if (this._lastUserActivity = Date.now(), this.showUI(), !this._uiDisabled && this.player.isAutoplay()) {
                    var t = this.player.getState();
                    t !== r.ENDED && t !== r.ERROR && toggleClass(this.autoplayHint, "hidden", !this.isBackgroundElement(e.target))
                }
            }
            onWheel(e) {
                if (!browser.mac && this.player.isFullscreen()) {
                    var t = e.deltaY > 0 ? -1 : 1;
                    this.player.setVolume(this.player.getVolume() + Gt * t), this._lastUserActivity = Date.now(), this.showUI()
                }
            }
            hideUI({
                hideCursor: e = !0,
                noTransition: t = !1
            } = {}) {
                this._featureSubtitlesTimeout || domByClass(ge("mv_box"), "feature_intro_subtitles") || this._controlsHidden || (t && (addClass(this.el, "no_transition"), removeClassDelayed(this.el, "no_transition")), this.shareActions.hide(), this.controls.hide(), addClass(this.title, "hidden"), this.player.isAutoplay() && (removeClass(this.autoplayTimer, "hidden"), addClass(this.autoplayHint, "hidden")), this.toggleStickersPromo(!1), setStyle(this.player.el, {
                    cursor: e ? "none" : ""
                }), this._controlsHidden = !0, this.player.trigger(q))
            }
            showUI() {
                this._uiDisabled || this._controlsHiddenByAd || !this._controlsHidden || (this.shareActions.show(), this.controls.show(), removeClass(this.title, "hidden"), this.player.isAutoplay() ? (addClass(this.autoplayTimer, "hidden"), removeClass(this.autoplayHint, "hidden"), setStyle(this.player.el, {
                    cursor: "pointer"
                })) : setStyle(this.player.el, {
                    cursor: ""
                }), this.toggleStickersPromo(!0), this._controlsHidden = !1, this.player.trigger(W))
            }
            updateWaiting() {
                var e = this.player,
                    t = (!e.isInited() || e.isBuffering() || e.isLoadingAds()) && !e.isPlayingLinearAd() && this.player.getState() !== r.ERROR && e.getLivePhase() !== he;
                toggle(this.waiting, t), attr(this.player.el, "aria-busy", t ? "true" : "false")
            }
            updateTitle(e, t) {
                void 0 !== e && (toggleClass(this.title, "videoplayer_title_explicit", Boolean(t)), val(this.titleLink, e), attr(this.titleLink, "href", "/video" + this.player.getVideoId()));
                var i = this.player.isInited(),
                    s = this.player.isPlayingLinearAd(),
                    a = this.player.isFullscreen(),
                    r = this.getVar("is_embed") || this.getVar("is_inline") && "videocat" == this.getVar("module"),
                    l = i && !this.getVar("no_title") && !s && !this.endScreen && (a || r);
                toggle(this.title, !!l)
            }
            showError({
                message: e,
                waiting: t = !1
            }) {
                var i = "";
                i += t ? getProgressHtml("", "_error_progress_icon pr_big") : '<div class="_error_icon"></div>', i = `<div class="_error_msg">${i+=`<div class="_text">${e}</div>`}</div>`, i = `<div class="_background" style="background-image:url(${this.getVar("first_frame_800")||this.getVar("first_frame_320")||this.getVar("jpg")||""})"></div>` + i, val(this.error, i), removeClass(this.error, "hidden"), attr(this.error, "aria-hidden", !1)
            }
            hideError() {
                addClass(this.error, "hidden"), attr(this.error, "aria-hidden", !0)
            }
            showLiveWarning({
                message: e
            }) {
                this.hideLiveWarning(), !this._ignoreLiveWarning && e && (this.warning = ce("div", {
                    className: "videoplayer_warning",
                    innerHTML: e + '<span class="videoplayer_warning_close"></span>'
                }), this.domListen(domByClass(this.warning, "videoplayer_warning_close"), "click", () => {
                    this.hideLiveWarning(), this._ignoreLiveWarning = !0
                }), this.el.appendChild(this.warning))
            }
            hideLiveWarning() {
                this.warning && (this.domUnlisten(domByClass(this.warning, "videoplayer_warning_close")), re(this.warning), this.warning = null)
            }
            onStateChange(e, t) {
                domData(this.el, "state", e);
                var i = this.player.isAutoplay();
                if (e === r.PLAYING || i && e == r.PAUSED || this.showUI(), e !== r.PLAYING || !i || this._mouseInside || this._adsSnippetsVideo || this.hideUI({
                        noTransition: !0
                    }), this.endScreen && e !== r.ENDED && (this.removeEndScreen(), this._controlsHidden || this.controls.show()), e === r.ENDED && this.canShowEndScreen() && this.buildEndScreen(), i && !this.player.isStartedPlaying()) {
                    var s = e === r.ENDED && !this.endScreen;
                    this.toggleThumb(!0, s)
                } else {
                    var a = e === r.UNSTARTED && !this.getVar("autoplay") || e === r.ENDED,
                        l = !this.endScreen;
                    this.toggleThumb(a, l)
                }
                if (i) {
                    var n = e !== r.ENDED && e !== r.ERROR;
                    toggle(this.autoplayTimer, n), toggle(this.autoplayHint, n)
                }
                e === r.ERROR ? (this.showError(this.player.getErrorData()), this.showUI(), this.toggleThumb(!1), this.toggleLiveDummy(!1), addClass(this.autoplayHint, "hidden")) : this.hideError(), this.updateTitle(), this.updateWaiting(), this.updateShareActions()
            }
            toggleThumb(e, t = !0) {
                toggleClass(this.thumb, "hidden", !e), e && toggle(domByClass(this.thumb, "videoplayer_big_play_btn"), t)
            }
            onFullscreenChange(e) {
                if (toggleClass(this.el, "_fullscreen", e), this.updateTitle(), browser.mac || (e ? this.domListen(this.player.el, "wheel", this.onWheel) : this.domUnlisten(this.player.el, "wheel", this.onWheel)), this.player.isInited()) {
                    var t = this.player.getVars();
                    if (t.stretch_vertical && !t.is_aurora) {
                        var i = this.calculateBackgroundSizeForVerticalThumb(e);
                        setStyle(this.thumb, {
                            backgroundSize: i
                        })
                    }
                }
            }
            onLivePhaseChange(e) {
                var t = !1;
                e == he && this.getVar("live_start"), e == he ? (val(this.liveWaiting, this.getLang("live_starting_soon")), t = !0) : t = !1, this.player.getState() === r.ERROR && (t = !1), this.toggleLiveDummy(t), this.updateWaiting(), this.player.isAutoplay() && !this.player.isActiveLive() && (removeClass(this.autoplayTimer, "_live"), val(this.autoplayTimerText, formatTime(this.player.getDuration())), this.resizeAutoplayTimer())
            }
            toggleLiveDummy(e) {
                toggleClass(this.liveWaiting, "hidden", !e)
            }
            onMediaPlaying() {
                this.player.isFromAutoplay() && (this.toggleThumb(!1), this.player.isTouchedByUser() || this.resizeAutoplayTimer())
            }
            onMediaTimeupdate(e) {
                if (this.player.isAutoplay() && !this.player.isActiveLive()) {
                    var t = positive(this.player.getDuration() - e);
                    val(this.autoplayTimerText, formatTime(t))
                }
            }
            resizeAutoplayTimer() {
                if (!this.player.isActiveLive()) {
                    var e = formatTime(this.player.getDuration()),
                        t = val(this.autoplayTimerText);
                    Qe(this.autoplayTimerText, e.replace(/\d/g, "8")), setStyle(this.autoplayTimerText, {
                        minWidth: this.autoplayTimerText.offsetWidth + "px"
                    }), Qe(this.autoplayTimerText, t)
                }
                setStyle(this.autoplayTimerEqualizer, {
                    display: ""
                })
            }
            onLinearAdStarted(e, {
                duration: t,
                hideControls: i
            }) {
                this.updateTitle(), this.updateShareActions(), this.player.isAutoplay() && (hide(this.autoplayTimer), hide(this.autoplayHint)), i && (this._controlsHiddenByAd = !0, this.hideUI({
                    hideCursor: !1
                })), this.updateWaiting()
            }
            onLinearAdCompleted(e) {
                this.updateTitle(), this.updateShareActions(), this.player.isAutoplay() && (show(this.autoplayTimer), show(this.autoplayHint)), this._controlsHiddenByAd && (this._controlsHiddenByAd = !1, this.showUI()), this.updateWaiting()
            }
            checkUserActivity() {
                if (!this._controlsHidden) {
                    var e = this.player;
                    this.player.getState() !== r.PLAYING || this._mouseInside && !e.isFullscreen() || !(() => Date.now() - this._lastUserActivity > zt)() || (() => this.controls.isActive() || isHover(this.controls.el) || isHover(this.shareActions.el))() || this._adsSnippetsVideo || this.hideUI({
                        hideCursor: this.player.isFullscreen()
                    })
                }
            }
            canShowEndScreen() {
                return !!this._adsSnippetsVideo || (!this.getVar("live") || this.getVar("live") === ne) && (!this.getVar("nolikes") || (this.getVar("show_next") && this.player.getNextVideos().length || this.getVar("show_suggestions") && this.player.getSuggestions().length))
            }
            buildEndScreen() {
                var e = [],
                    t = !1,
                    i = !1;
                (e = this.player.getNextVideos()).length && (t = this.player.nextTimerEnabled()), this.getVar("show_suggestions") && !e.length && (e = this.player.getSuggestions(), i = !0, t = !1), this._adsSnippetsVideo ? this.endScreen = new Pt(this.player) : e.length ? this.endScreen = new At(this.player, e, t, i) : this.endScreen = new Tt(this.player), this.el.appendChild(this.endScreen.el);
                var s = this.player.getSize();
                this.endScreen.resize(...s), this.endScreen.isStretchMode(...s) && this.controls.hide()
            }
            removeEndScreen() {
                re(this.endScreen.el), this.endScreen.destroy(), delete this.endScreen
            }
            buildStickersPromo(e, t, i, s) {
                var a = `/images/gift/-${e}/${isRetina()?256:96}.png`;
                this.stickersPromo = ce("div", {
                    className: "videoplayer_stickers_promo"
                }), domData(this.stickersPromo, "pack-id", e);
                var r = se(`\n<a href="/stickers/${t}" target="_blank" class="videoplayer_stickers_promo__link">\n  <div class="videoplayer_stickers_promo__title">${i}</div>\n  <div class="videoplayer_stickers_promo__price">${s}</div>\n  <img src="${a}" class="videoplayer_stickers_promo__img"/>\n</a>`);
                this.domListen(r, "click", this.onStickersPromoClick.bind(this, e, t));
                var l = ce("div", {
                    className: "videoplayer_sticker_promo__close"
                });
                this.domListen(l, "click", this.removeStickersPromo), this.stickersPromo.appendChild(r), this.stickersPromo.appendChild(l), this.el.appendChild(this.stickersPromo)
            }
            toggleStickersPromo(e, t = !1) {
                if (this.stickersPromo && (t ? toggleClass(this.stickersPromo, "unshown", !e) : toggleClass(this.stickersPromo, "hidden", !e), !domData(this.stickersPromo, "shown") && !hasClass(this.stickersPromo, "unshown") && !hasClass(this.stickersPromo, "hidden"))) {
                    var i = domData(this.stickersPromo, "pack-id");
                    this.player.trigger(G, {
                        packId: i,
                        event: "show"
                    }), domData(this.stickersPromo, "shown", 1)
                }
            }
            onStickersPromoClick(e, t, i) {
                this.player.isFullscreen() && this.player.toggleFullscreen(), Emoji.previewSticker(e, this, {
                    name: t,
                    sticker_referrer: "video_live"
                }, i), this.player.trigger(G, {
                    packId: e,
                    event: "click"
                })
            }
            onStickersPurchased(e) {
                domData(this.stickersPromo, "pack-id") == e && (this.removeStickersPromo(), this.player.trigger(G, {
                    packId: e,
                    event: "purchase"
                }))
            }
            removeStickersPromo() {
                this.stickersPromo && (re(this.stickersPromo), this.domUnlisten(domFC(this.stickersPromo)), this.domUnlisten(domLC(this.stickersPromo)), delete this.stickersPromo)
            }
            pushNotice({
                type: e,
                image: t,
                text: i
            }) {
                if (!inArray(e, this._ignoreNoticeTypes) && this.player.isActiveLive()) {
                    var [s, a] = this.player.getSize();
                    if (!(s <= 510 || a <= 287)) {
                        this.removeNotice(), this._noticeEl = se(`\n<div class="videoplayer_notice hidden">\n  <img src="${t}" class="videoplayer_notice__image"/>\n  <div class="videoplayer_notice__text">${i}</div>\n  ${function(e=""){return`\n<svg class="${e}" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path d="M5 3.69L1.578.27C1.22-.09.635-.09.273.272-.09.637-.09 1.22.27 1.578L3.69 5 .27 8.422c-.358.357-.358.943.003 1.305.364.364.946.363 1.305.004L5 6.31l3.422 3.42c.357.358.943.358 1.305-.003.364-.364.363-.946.004-1.305L6.31 5l3.42-3.422c.358-.357.358-.943-.003-1.305C9.363-.09 8.78-.09 8.422.27L5 3.69z" fill="#FFF" fill-rule="evenodd"/>\n</svg>\n  `}("videoplayer_notice__close")}\n</div>\n    `), this.domListen(this._noticeEl, "mouseenter", () => {
                            var e = domData(this._noticeEl, "timeoutId");
                            this.undelay(e)
                        }), this.domListen(this._noticeEl, "mouseleave", () => {
                            var e = this.delay(this.removeNotice, 2e3);
                            domData(this._noticeEl, "timeoutId", e)
                        }), this.domListen(domByClass(this._noticeEl, "videoplayer_notice__close"), "click", () => {
                            this.removeNotice(), this._ignoreNoticeTypes.push(e)
                        }), this.el.appendChild(this._noticeEl), this._noticeEl.offsetHeight, removeClass(this._noticeEl, "hidden");
                        var r = this.delay(this.removeNotice, 5e3);
                        domData(this._noticeEl, "timeoutId", r)
                    }
                }
            }
            removeNotice() {
                var e = this._noticeEl;
                if (e) {
                    this._noticeEl = null, this.domUnlisten(e), this.domUnlisten(domByClass(e, "videoplayer_notice__close"));
                    var t = domData(e, "timeoutId");
                    this.undelay(t), addClass(e, "hidden"), setTimeout(function() {
                        re(e)
                    }, 200)
                }
            }
            isControlsVisible() {
                return !this._controlsHidden
            }
            resize(e, t) {
                if (toggleClass(this.el, "_minimized", this.player.isMinimized()), toggleClass(this.error, "_min_size", e < 720 || t < 405), toggleClass(this.liveWaiting, "_min_size", e < 720 || t < 405), this.updateShareActions(), this.endScreen && (this.endScreen.isStretchMode(e, t) ? this.controls.hide() : this.controls.show()), this.stickersPromo) {
                    var i = e >= 640 && t >= 360;
                    this.toggleStickersPromo(i, !0)
                }
            }
            updateShareActions() {
                var e = !!this.endScreen && this.endScreen.isStretchMode(...this.player.getSize());
                this.shareActions.updateVisibility(e)
            }
            onPlayerExpanded() {
                this._showSubtitlesIntro(), this.updateTitle(), setStyle(this.thumb, {
                    backgroundImage: `url(${this.player.getThumbSrc()})`,
                    backgroundSize: "cover"
                })
            }
            _onSubtitleCueChange(e) {
                e && e.length || this._subtitleLayer.clear(), this._subtitleLayer.update(e)
            }
            _onSubtitlesSwitched(e, t) {
                t ? (this._subtitleLayer = new Ot(this.player), this.el.appendChild(this._subtitleLayer.el), this.undelay(this._featureSubtitlesTimeout)) : this._subtitleLayer && this._subtitleLayer.destroy()
            }
            destroy() {
                super.destroy(), clearInterval(this._checkUserActivityInterval)
            }
            calculateBackgroundSizeForVerticalThumb(e) {
                var t = this.player.getVars();
                return t.is_inline && !e && t.thumb_ratio && t.aspect_ratio ? `${t.thumb_ratio*(1/t.aspect_ratio)*100+2}%` : "cover"
            }
        }
        var Kt = 6531,
            jt = 2e3;
        class Xt extends fe {
            constructor(e) {
                super(e), this.el = ce("div", {
                    className: "videoplayer_ads"
                }), this.videoEl = ce("video", {
                    className: "videoplayer_ads_media_el"
                }), this.el.appendChild(this.videoEl), this.pauseLayer = ce("div", {
                    className: "videoplayer_ads_pause_layer"
                }), this.domListen(this.pauseLayer, "click", () => this.player.play()), this.el.appendChild(this.pauseLayer), this.buildActions(), this.playerListen(y, this.onPlayerExpanded), this.playerListen(_, this.onFullscreenChange), this.playerListen(d, this.onStateChange), this.playerListen(q, this.updateOverlay), this.playerListen(W, this.updateOverlay)
            }
            buildActions() {
                this.actions = se('\n<div class="videoplayer_ads_actions">\n  <div class="videoplayer_ads_timer"></div>\n  <div class="videoplayer_ads_skip"></div>\n</div>\n    '), this.actionsTimer = domByClass(this.actions, "videoplayer_ads_timer"), this.actionsSkip = domByClass(this.actions, "videoplayer_ads_skip"), this.domListen(this.actionsSkip, "click", this.onSkipClick), this.el.appendChild(this.actions)
            }
            initVideo(e) {
                e.no_ads || window.AdmanHTML || !this._admanLoader || this.loadAdman()
            }
            deinitVideo() {
                this.cancelAds()
            }
            cancelAds() {
                this.adman && (this.adman.destroy(), this.adman = null), this._needInit = !1, this._sectionToPlay = null, this._sectionCallback = null, this._adsReady = !1
            }
            destroy() {
                this._admanLoader && (this._admanLoader.destroy(), this._admanLoader = null)
            }
            loadAdman() {
                this._admanLoader = loadScript("//ad.mail.ru/static/admanhtml/rbadman-html5.min.js", {
                    timeout: jt,
                    onLoad: () => this.onAdmanLoaded(),
                    onError: () => this.onAdmanLoadingError()
                }), this.player.stats.sendAdsEvent("AdmanLoadStart")
            }
            onAdmanLoaded() {
                window.AdmanHTML ? (this._admanLoader = null, this._needInit && this.initAdman(), this.player.stats.sendAdsEvent("AdmanLoaded")) : this.onAdmanLoadingError()
            }
            onAdmanLoadingError() {
                this._admanLoader = null, this._admanLoadingError = !0, this._sectionCallback && (this._sectionCallback(), this._sectionCallback = null), this.player.trigger(X, !1), this.player.stats.sendAdsEvent("AdmanLoadError")
            }
            initAdman() {
                var e = this.player.getVars(),
                    t = this.player.getSize(),
                    i = {
                        _SITEZONE: e.ads_sitezone || "",
                        vk_catid: e.ads_cat || "",
                        vk_id: e.viewer_id || "",
                        pl: e.ads_pl,
                        video_id: e.ads_eid1 || "",
                        content_id: function(e, t) {
                            var i = (e >>> 0).toString(16),
                                s = t.toString(16);
                            for (; s.length < 8;) s = "0" + s;
                            return i + s
                        }(e.oid, e.vid),
                        dl: encodeURIComponent(e.embed_referer || function(e) {
                            if ("string" != typeof e) return e;
                            return e.replace(new RegExp("(\\/(?:write|mail|im|al_im.php))(\\?[a-z0-9&=\\-_]*)?$"), "$1").replace(new RegExp("(\\/write)(\\d*)(\\?[a-zA-Z0-9&=\\-_]*)?$"), "$1")
                        }(document.URL)),
                        duration: e.duration,
                        g: e.g,
                        a: e.a,
                        os: e.target_mob_os || "no",
                        lang: 3 == vk.lang && e.cis ? 1 : 0,
                        autoplay: this.player.isAutoplay() ? 1 : 0,
                        player_width: t[0],
                        player_height: t[1],
                        puid1: e.ads_puid1 || "",
                        puid2: e.ads_puid2 || "",
                        puid3: this._isLiveMidroll ? 2 : 1,
                        puid4: e.ads_puid4 || "",
                        puid5: e.ads_puid5 || "",
                        puid6: e.ads_puid6 || "",
                        puid7: e.ads_puid7 || 1,
                        puid8: e.ads_puid8 || "",
                        puid9: function(e) {
                            return e.is_embed ? e.autoplay ? 3 : 1 : 0
                        }(e),
                        puid10: function(e, t) {
                            return e < 400 || t < 225 ? 5 : e < 640 || t < 360 ? 0 : e < 960 || t < 540 ? 1 : e < 1280 || t < 720 ? 2 : 3
                        }(...t),
                        puid11: this.player.isFullscreen() ? 0 : 1,
                        puid12: 16,
                        puid13: function(e) {
                            return 1 == e ? 2 : 2 == e ? 1 : 3
                        }(e.g),
                        puid14: function(e) {
                            return e < 18 ? 1 : e < 22 ? 2 : e < 25 ? 3 : e < 28 ? 4 : e < 31 ? 5 : e < 35 ? 6 : e < 40 ? 7 : e < 45 ? 8 : e < 50 ? 9 : e < 55 ? 10 : 11
                        }(e.a),
                        puid15: e.ads_puid15 || "",
                        puid18: e.ads_puid18 || 0,
                        puid21: e.ads_puid21 || "",
                        puid22: e.ads_puid22 || ""
                    }; - 1 == e.ads_type && (i.is_xz_video = 1);
                var s = Re.getPref("preroll_progress");
                s && (Re.deletePref("preroll_progress"), this.player.getVideoId() === s.video && s.time > Date.now() - 6e4 && (i.refr = 1)), nav.objLoc.preview && (i.preview = intval(nav.objLoc.preview));
                var a = {
                    slot: Kt,
                    wrapper: this.el,
                    videoEl: this.videoEl,
                    videoQuality: t[1],
                    params: i,
                    browser: Jt,
                    config: Zt
                };
                this.adman && this.adman.destroy(), this.adman = new window.AdmanHTML, this.adman.setDebug(!1), this.adman.onReady(this.onAdsReady.bind(this)), this.adman.onStarted(this.onAdStarted.bind(this)), this.adman.onPaused(this.onAdPaused.bind(this)), this.adman.onPlayed(this.onAdPlayed.bind(this)), this.adman.onCompleted(this.onAdCompleted.bind(this)), this.adman.onTimeRemained(this.onAdTimeRemained.bind(this)), this.adman.onClicked(this.onAdClicked.bind(this)), this.adman.onClosed(this.onAdClosed.bind(this)), this.adman.onError(this.onAdError.bind(this)), this.adman.init(a), this.player.stats.sendAdsLoadStarted(), this.player.stats.sendAdsEvent("AdmanInit")
            }
            start(e, t) {
                this.player.isInited() && !this._admanLoadingError ? ("_live_midroll" == e ? (this.cancelAds(), e = "preroll", this._isLiveMidroll = !0) : this._isLiveMidroll = !1, this._sectionToPlay = e, this._sectionCallback = t, window.AdmanHTML ? this._adsReady ? this.adman.start(e) : this.adman || this.initAdman() : (this._needInit = !0, this._admanLoader || this.loadAdman()), this.player.trigger(X, !0)) : t && t()
            }
            play() {
                this.adman && this.adman.resume()
            }
            pause() {
                this.adman && this.adman.pause()
            }
            stop() {
                this.adman && this.adman.stop()
            }
            setVolume(e) {
                this.isPlayingLinear() && this.adman.setVolume(e)
            }
            onAdsReady() {
                this._adsReady = !0, this._sectionToPlay && this.adman.start(this._sectionToPlay), this.player.trigger(X, !1), this.player.stats.sendAdsEvent("AdmanReady")
            }
            onAdStarted(e, t) {
                this._curSection = e, this._curBanner = t, show(this.el), "preroll" == e || "postroll" == e ? (this._actionsInited = !1, "VPAID" == t.apiFramework && "application/javascript" != t.type || show(this.videoEl), this.player.trigger(Z, e, {
                    duration: t.duration,
                    hideControls: !1 === t.showControls
                }), this.adman.setVolume(this.player.isMuted() ? 0 : this.player.getVolume())) : (addClass(this.el, "no_transition"), addClass(this.el, "_overlay"), removeClassDelayed(this.el, "no_transition"), this.updateOverlay(), this.player.trigger(te)), "preroll" == e && Re.savePref("preroll_progress", {
                    video: this.player.getVideoId(),
                    time: Date.now()
                }), this.player.stats.sendAdShown(e, "start"), this.player.stats.sendAdsEvent("AdmanAdStarted", e)
            }
            onAdPaused() {
                this.player.pause()
            }
            onAdPlayed() {
                this.player.play()
            }
            onAdCompleted() {
                var e = this._curSection,
                    t = this._sectionToPlay;
                this._curSection = null, this._sectionToPlay = null, this._curBanner = null, this._curTime = null, e ? (hide(this.el), "preroll" == e || "postroll" == e ? (hide(this.videoEl), hide(this.actions), hide(this.pauseLayer), this.player.trigger(ee, e)) : (removeClass(this.el, "_overlay"), this.player.trigger(ie)), this.player.stats.sendAdShown(e, "end"), this.player.stats.sendAdsEvent("AdmanAdCompleted", e)) : this.player.stats.sendAdsEvent("AdmanAdEmpty", t), "preroll" == e && Re.deletePref("preroll_progress"), this._sectionCallback && (this._sectionCallback(), this._sectionCallback = null), this.player.play()
            }
            onAdTimeRemained({
                currentTime: e,
                duration: t,
                remained: i
            }) {
                var s = this._curBanner,
                    a = this._curSection;
                if (this._curTime = e, s && !1 !== s.showControls && -1 !== e) {
                    i = intval(i), val(this.actionsTimer, `<span class="_caption">${this.getLang("ads")}</span> <span class="_remained">${formatTime(i)}</span>`);
                    var r = !1;
                    if (s.allowClose && (e < s.allowCloseDelay ? (val(this.actionsSkip, this.getLang("ads_skip_time", {
                            time: `<b>${Math.ceil(s.allowCloseDelay-e)}</b>`
                        })), removeClass(this.actionsSkip, "_can_skip")) : (val(this.actionsSkip, `<span class="_skip_text">${this.getLang("ads_skip")}</span>` + function(e = "") {
                            return `\n<svg class="${e}" viewBox="163 11 8 15" xmlns="http://www.w3.org/2000/svg" focusable="false">\n  <path stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M165 13l5 5.5-5 5.5"/>\n</svg>\n  `
                        }("_skip_icon")), addClass(this.actionsSkip, "_can_skip"), r = !0)), "preroll" == a && r && Re.deletePref("preroll_progress"), !this._actionsInited) {
                        show(this.actions);
                        var l = s.allowClose && s.allowCloseDelay < t && i < t;
                        toggleClass(this.actionsSkip, "unshown", !l), this._actionsInited = !0
                    }
                    this.player.trigger(J, e, t, i)
                }
            }
            onAdClicked() {
                this.player.stats.sendAdsEvent("AdmanClicked", this._curSection), this.player.pause()
            }
            onAdClosed() {
                this.player.stats.sendAdsEvent("AdmanClosed", this._curSection), this.onAdCompleted()
            }
            onAdError() {
                debugLog("video ad error"), this.player.stats.sendAdsEvent("AdmanError"), this._adsReady = !0, this.onAdCompleted()
            }
            onSkipClick(e) {
                hasClass(this.actionsSkip, "_can_skip") && this.adman.skip()
            }
            isLoading() {
                return !!this._sectionToPlay && !this._admanLoadingError && (this._admanLoader || !this._adsReady)
            }
            isPlayingLinear() {
                return "preroll" == this._curSection || "postroll" == this._curSection
            }
            isPlayingOverlay() {
                return "overlay" == this._curSection
            }
            curTime() {
                return this._curTime || 0
            }
            getDuration() {
                return intval(this._curBanner && this._curBanner.duration)
            }
            resize(e, t) {
                toggleClass(this.actions, "_min_size", e < 400), this.updateOverlay()
            }
            canShowOverlay() {
                var e = this.player.getSize(),
                    t = e[0] >= 500 && e[1] >= 280,
                    i = this.player.getState() === r.PLAYING,
                    s = this.player.isControlsVisible();
                return t && i && s
            }
            updateOverlay() {
                this.canShowOverlay() ? (this.isPlayingOverlay() && this.adman.resume(), removeClass(this.el, "_overlay_hidden")) : (this.isPlayingOverlay() && this.adman.pause(), addClass(this.el, "_overlay_hidden"))
            }
            onPlayerExpanded() {
                this.adman && this.adman.resume()
            }
            onFullscreenChange(e) {
                (this.isPlayingLinear() || this.isPlayingOverlay()) && this.adman.setFullscreen(e)
            }
            onStateChange(e) {
                this.updateOverlay(), this.isPlayingLinear() && toggle(this.pauseLayer, e !== r.PLAYING)
            }
        }
        var Jt = {
                mobile: browser.mobile,
                FLASH_BLOCKED: 0,
                FLASH_READY: 1,
                FLASH_UNKNOWN: 2,
                checkFlashStatus: function(e) {
                    e(browser.flash ? this.FLASH_READY : this.FLASH_BLOCKED)
                }
            },
            Zt = {
                vpaidJsInterface: locProtocol + "//ad.mail.ru/static/vpaid-js-interface.swf"
            };

        function ei() {
            return (ei = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s])
                }
                return e
            }).apply(this, arguments)
        }
        var ti = 500,
            ii = 30,
            si = 5e3,
            ai = "videoplayer_track_events";
        class ri extends fe {
            constructor(e) {
                super(e), this.playerListen(g, this._onSubtitleTrackChanged), this.playerListen(K, this._onActionButtonClicked), this.playerListen(j, this._onActionButtonShown), this._storageKey = ai + irand(1, 1e9)
            }
            initVideo(e) {
                this._flushStorageEvents(), e.embed_referer ? this._refDomain = ce("a", {
                    href: e.embed_referer
                }).hostname : this._refDomain = ""
            }
            _onSubtitleTrackChanged(e, t) {
                var i = t && t.lang || "undefined",
                    s = t ? i : "off",
                    a = {};
                t && !this._subtitlesFirstEnabled && (this._subtitlesFirstEnabled = !0, a.first = !0), this.trackPlayerEvent("subtitles", s, a)
            }
            _onActionButtonClicked() {
                this.trackLiveAction("open_link")
            }
            _onActionButtonShown({
                data: e
            }) {
                this.trackLiveAction("show_link", {
                    link: e.url,
                    link_type: e.type
                })
            }
            trackVideoPlay(e) {
                var t = {
                    position: e
                };
                this._pushEvent("video_play", t)
            }
            trackPlayerEvent(e, t, i = {}) {
                var s = ei({
                    event: e,
                    value: t
                }, i);
                this._pushEvent("video_event", s)
            }
            trackLiveAction(e, t = {}) {
                var i = ei({
                    action_type: e
                }, t);
                this._pushEvent("live_action", i)
            }
            _pushEvent(e, t) {
                var i = this.player,
                    s = this.getVars(),
                    a = ei({
                        ts: Math.round(Date.now() / 1e3),
                        video_id: i.getVideoId(),
                        position: i.curTime(),
                        player_type: i.getEnvLayoutType(),
                        ref: s.module || i.getEnvModule(),
                        volume: Math.round(100 * i.getVolume()) / 100,
                        quality: i.getQuality(),
                        speed: i.getPlaybackRate(),
                        e: e
                    }, t);
                i.isFromAutoplay() && (a.autoplay = 1), s.post_id && (a.post_id = s.post_id), this._refDomain && (a.ref_domain = this._refDomain);
                var r = this._getFromStorage();
                r.push(a), this._saveToStorage(r);
                var l = () => {
                    this._sendEvents(r), this._saveToStorage([])
                };
                clearTimeout(this._flushTimeout), r.length >= ii ? l() : this._flushTimeout = setTimeout(l, ti)
            }
            _sendEvents(e) {
                var t = this.getVars(),
                    i = [t.action_hash, t.oid, t.vid, t.viewer_id].join("_");
                ajax.post("al_video.php?act=track_player_events", {
                    events: JSON.stringify(e),
                    sig: i
                })
            }
            _saveToStorage(e) {
                this._storageKey && (e.length ? Re.set(this._storageKey, {
                    events: e,
                    updated: Date.now()
                }) : Re.remove(this._storageKey))
            }
            _getFromStorage() {
                if (this._storageKey) {
                    var e = Re.get(this._storageKey);
                    if (e) return e.events
                }
                return []
            }
            _flushStorageEvents() {
                var e = Re.getByPrefix(ai);
                each(e, (e, t) => {
                    t.updated + si < Date.now() && (this._sendEvents(t.events, t.hash), Re.remove(e))
                })
            }
        }
        class li extends fe {
            constructor(e) {
                super(e), this.trackEvents = new ri(e), this.playerListen(A, this.onMediaTimeupdate), this.playerListen(D, this.onMediaPlaying), this.playerListen(I, this.onMediaWaiting), this.playerListen(F, this.onMediaSeeking), this.playerListen(N, this.onMediaSeeked), this.playerListen(R, this.onMediaEnded), this.playerListen(V, this.onMediaVolumeChange), this.playerListen(U, this.onMediaHlsLevelLoaded), this.playerListen($, this.onMediaHlsFragLoaded), this.playerListen(_, this.onFullscreenChange), this.playerListen(p, this.onQualityChange), this.playerListen(d, this.onStateChange), this.playerListen(Z, this.onLinearAdStarted), this.playerListen(ee, this.onLinearAdCompleted), this.playerListen(G, this.onUiStickersPromoEvent)
            }
            initVideo(e) {
                this.initTime = Date.now(), this.viewCounterIncremented = !1, this.lastPlayProgressSent = 0, this.needViewSegments = !(!e.vsegs_size || !e.vsegs_hash), this.playFinishedSent = !1, this.requestedPlay = 0, this.startedPlay = 0, this.startQuality = 0, this.pausedBeforeStart = !1, this.stallsCount = 0, this.seekDurations = [], this.hlsFirstLevelLoadTime = 0, this.hlsFirstFragLoadTime = 0, this.collectWatchStat = !0, this.maxTimePosition = 0, this.maxTimePercent = 0, this.lastVolume = this.player.isMuted() ? 0 : this.player.getVolume(), this.liveHeartbeatEventsQueue = [], this.ownerId = e.oid, this.videoId = e.vid, this.initViewSegments(e), this.flushWatchData(), this.flushCandyData(), this.sendTnsStat("init")
            }
            deinitVideo() {
                this._bigTvTimeout && (clearTimeout(this._bigTvTimeout), this._bigTvTimeout = null), this.flushWatchData(), this.flushCandyData()
            }
            initViewSegments(e) {
                this.curSegments = e.vsegs ? e.vsegs.split("|").pop() : ""
            }
            initBigTvStats() {
                var e = this.getVar("stats_bigtv");
                if (e) {
                    var t = () => {
                        var i = Math.floor(this.player.isActiveLive() ? Date.now() / 1e3 - this.getVar("date") : this.player.curTime()),
                            s = Math.floor(Date.now() / 1e3);
                        vkImage().src = e.replace("FTS", i).replace("VTS", s), this._bigTvTimeout = this.delay(t, 3e4)
                    };
                    t()
                }
            }
            saveWatchData() {
                this.collectWatchStat && this.requestedPlay && this.startedPlay && Re.set("video_last_watch_stat", {
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
                    is_active_live: this.getVar("live") && this.getVar("live") != ne ? 1 : 0,
                    last_pos: this.player.curTime(),
                    post_id: this.getVar("post_id"),
                    module: this.getVar("module"),
                    ad_data: this.getVar("ad_data"),
                    hls_candy: "hls" == this.player.getMediaProviderType() && this.getVar("hls_candy_server") ? 1 : 0
                })
            }
            flushWatchData() {
                var e = Re.get("video_last_watch_stat");
                e && (ajax.post("al_video.php?act=watch_stat", e, {}), this.clearWatchData())
            }
            clearWatchData() {
                Re.remove("video_last_watch_stat")
            }
            flushCandyData() {
                var e = Re.get("video_live_candy_stat");
                e && (ajax.post("al_video.php?act=live_candy_stat", e, {}), Re.remove("video_live_candy_stat"))
            }
            onMediaPlaying() {
                if (!this.startedPlay) {
                    this.startedPlay = Date.now(), this.getVar("hls") || (this.startQuality = this.player.getQuality());
                    var e = this.player.curTime(),
                        t = this.player.isActiveLive();
                    t && this.addLiveHeartbeatStatsEvent("play_started");
                    var i = e < 1 || t ? "start" : "continue";
                    this.trackEvents.trackVideoPlay(i), this.saveWatchData(), this.sendPlayStarted(), this.sendPladformStat(), this.sendAdPostStatEvent("video_start"), this.sendTnsStat("started"), this.sendMediascopeStat("started"), this.initBigTvStats()
                }
            }
            onMediaWaiting(e, t) {
                e && t && (this.stallsCount++, this.saveWatchData(), this.player.isActiveLive() && this.addLiveHeartbeatStatsEvent("stall"))
            }
            onMediaSeeking(e) {
                this.seekingStarted = Date.now()
            }
            onMediaSeeked(e) {
                if (this.seekingStarted && !e) {
                    var t = Date.now() - this.seekingStarted;
                    this.seekDurations.push(t + "," + this.player.getQuality()), this.saveWatchData()
                }
            }
            onMediaEnded() {
                this.playFinishedSent || (this.playFinishedSent = !0, this.sendPlayFinished(), this.sendTnsStat("ended"), this.sendMediascopeStat("ended")), this.saveWatchData()
            }
            onMediaTimeupdate(e) {
                if (this.viewCounterIncremented || this.player.isPlayingLinearAd() || (this.player.getPlayedSeconds() > 5 || this.player.getDuration() < 5) && (this.sendIncViewCounter(), this.viewCounterIncremented = !0), !this.player.isActiveLive() && Date.now() - this.lastPlayProgressSent > 1e3 && (this.lastPlayProgressSent = Date.now(), this.sendPlayProgress(e), this.saveWatchData(), this.needViewSegments)) {
                    var t = this.getViewSegments();
                    t != this.curSegments && (this.curSegments = t, this.sendViewSegments(t))
                }
                if (!this.player.isActiveLive() && e > this.maxTimePosition) {
                    var i = this.player.getDuration() || 1,
                        s = this.maxTimePosition,
                        a = this.maxTimePercent,
                        r = e / i * 100;
                    this.player.isLooped() && i - e < .5 && (r = 100), e >= 3 && s < 3 && (this.trackEvents.trackVideoPlay("3s"), this.sendAdPostStatEvent("video_play_3s")), e >= 10 && s < 10 && (this.trackEvents.trackVideoPlay("10s"), this.sendAdPostStatEvent("video_play_10s")), each([25, 50, 75, 95, 100], (e, t) => {
                        r >= t && a < t && (this.trackEvents.trackVideoPlay(t), this.sendAdPostStatEvent("video_play_" + t), this.sendMediascopeStat(t + "%"))
                    }), this.maxTimePosition = e, this.maxTimePercent = r
                }
            }
            onMediaVolumeChange(e) {
                this.player.isTouchedByUser() && (e ? e && !this.lastVolume && this.sendAdPostStatEvent("video_volume_on") : this.sendAdPostStatEvent("video_volume_off")), this.lastVolume = e
            }
            onMediaHlsLevelLoaded({
                time: e,
                quality: t,
                url: i
            }) {
                this.hlsFirstLevelLoadTime || (this.hlsFirstLevelLoadTime = e, this.saveWatchData()), this.player.isActiveLive() && this.addLiveHeartbeatStatsEvent("level_loaded", {
                    time: e,
                    quality: t,
                    url: i
                })
            }
            onMediaHlsFragLoaded({
                time: e,
                quality: t,
                url: i
            }) {
                this.hlsFirstFragLoadTime || (this.hlsFirstFragLoadTime = e, this.startQuality = t, this.saveWatchData()), this.player.isActiveLive() && this.addLiveHeartbeatStatsEvent("frag_loaded", {
                    time: e,
                    quality: t,
                    url: i
                })
            }
            onLiveCandyStat(e) {
                var t = Re.get("video_live_candy_stat") || {
                    p2p_bytes: 0,
                    cdn_bytes: 0,
                    video: this.player.getVideoId(),
                    hash: this.getVar("action_hash")
                };
                t.p2p_bytes += e.p2pBytes, t.cdn_bytes += e.cdnBytes, Re.set("video_live_candy_stat", t)
            }
            onStateChange(e, t) {
                this.requestedPlay || e !== r.PLAYING || (this.requestedPlay = Date.now()), this.startedPlay || e != r.PAUSED || (this.collectWatchStat = !1, this.pausedBeforeStart = !0), this.player.isTouchedByUser() && (e === r.PAUSED && this.sendAdPostStatEvent("video_pause"), e === r.PLAYING && t === r.PAUSED && this.sendAdPostStatEvent("video_resume"))
            }
            onQualityChange() {
                this.player.externalCall("onVideoResolutionChanged", this.getVar("oid"), this.getVar("vid"), this.getVar("action_hash"), this.player.getQualityIndex())
            }
            onFullscreenChange(e) {
                this.sendAdPostStatEvent(e ? "video_fullscreen_on" : "video_fullscreen_off")
            }
            onLinearAdStarted(e) {
                this.sendAdsPlayStarted(), "preroll" == e && (this.clearWatchData(), this.collectWatchStat = !1)
            }
            onLinearAdCompleted() {
                this.sendAdsPlayFinished()
            }
            onUiStickersPromoEvent({
                packId: e,
                event: t
            }) {
                ajax.post("video?act=player_stickers_promo_event", {
                    event: t,
                    pack_id: e,
                    owner_id: this.getVar("oid"),
                    video_id: this.getVar("vid"),
                    hash: this.getVar("action_hash")
                })
            }
            sendAdPostStatEvent(e) {
                var t = this.getVar("ad_block_id") || this.getVar("post_id");
                t && this.player.externalCall("onAdStat", t, e)
            }
            sendPladformStat() {
                var e = !!this.getVar("ads_eid1") && !this.player.isFromAutoplay() && 0 == vk.lang;
                if (this.getVar("pladform_views_stat_hash") && ajax.post("al_video.php?act=pladform_views_stat", {
                        owner_id: this.getVar("oid"),
                        video_id: this.getVar("vid"),
                        sent: intval(e),
                        autoplay: intval(this.player.isFromAutoplay()),
                        hash: this.getVar("pladform_views_stat_hash")
                    }), e) {
                    var t = this.getVar("ads_pl"),
                        i = this.getVar("ads_eid1"),
                        s = this.player.getVideoId();
                    vkImage().src = `//stat.pladform.ru/video/start?pl=${t}&videoid=${i}&vkvideoid=${s}`
                }
            }
            sendTnsStat(e) {
                var t = this.getVar("stats_tns");
                if (t) {
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
                    i[t] && i[t][e] && (vkImage().src = i[t][e] + irand(1, 1e9))
                }
            }
            sendMediascopeStat(e) {
                var t = {
                    "-169824905_456239043": "86529522-456239302",
                    "-169824905_456239042": "86529522-456239303",
                    "-169824905_456239041": "86529522-456239304",
                    "-169824905_456239039": "86529522-456239305",
                    "-169824905_456239040": "86529522-456239306"
                }[this.player.getVideoId()];
                if (t) {
                    var i = {
                        started: 1,
                        "25%": 2,
                        "50%": 3,
                        "75%": 4,
                        "100%": 5
                    }[e];
                    i && (vkImage().src = `https://www.tns-counter.ru/V13a****vk_test/ru/CP1251/tmsec=vkvideo_${t}-${i}/` + irand(1, 1e9))
                }
            }
            getViewSegments() {
                if (this.getVar("vsegs_size")) {
                    var e = this.player.getPlayedRanges(),
                        t = this.getVar("vsegs_size"),
                        i = Math.ceil(this.getVar("duration") / t),
                        s = ze(new Array(i), 0);
                    this.curSegments && this.unpackViewSegments(this.curSegments, s);
                    for (var a = 0; a < e.length; ++a)
                        for (var r = Math.round(e.start(a)), l = Math.round(e.end(a)), n = Math.floor(r / t), o = Math.floor(l / t), h = n; h <= o; ++h) {
                            var d = t * h,
                                u = Math.min(this.getVar("duration"), d + t);
                            s[h] += (Math.min(u, l) - Math.max(d, r)) / (u - d)
                        }
                    return this.packViewSegments(s)
                }
            }
            packViewSegments(e) {
                for (var t = [], i = 0, s = !0, a = 0; a < e.length; ++a) {
                    var r = e[a] >= .5;
                    r == s ? ++i : (t.push(i), s = r, i = 1)
                }
                s && t.push(i);
                var l = t.join(",");
                return "0" === l ? "" : l
            }
            unpackViewSegments(e, t) {
                e = e.split(",");
                for (var i = 0, s = 0; i < e.length; ++i) {
                    var a = i % 2 == 0,
                        r = +e[i];
                    ze(t, a ? 1 : 0, s, s + r), s += r
                }
                return t
            }
            sendIncViewCounter() {
                var e = this.getVars();
                this.player.externalCall("incViewCounter", e.oid, e.vid, e.view_hash, this.player.getQualityIndex(), e.hd, "html5")
            }
            sendPlayProgress(e) {
                var t = this.getVars();
                this.player.externalCall("onVideoPlayProgress", t.oid, t.vid, t.view_hash, e, t.duration)
            }
            sendPlayStarted() {
                var e = this.getVars(),
                    t = e.hls ? e.live ? "live_hls" : "hls" : e.live ? "live_mp4" : "mp4",
                    i = !!this.pausedBeforeStart;
                this.player.externalCall("onVideoPlayStarted", e.oid, e.vid, e.view_hash, t, i)
            }
            sendPlayFinished() {
                this.player.externalCall("onVideoPlayFinished")
            }
            sendAdsLoadStarted() {
                this.player.externalCall("onVideoAdsLoadStarted")
            }
            sendAdsPlayStarted() {
                this.player.externalCall("onVideoAdsPlayStarted")
            }
            sendAdsPlayFinished() {
                this.player.externalCall("onVideoAdsPlayFinished")
            }
            sendAdsEvent(e, t = "") {
                if (this.player.isInited()) {
                    var i = this.getVar("ads_stat_hash") || "",
                        s = this.getVar("pl_type") || "";
                    "postroll" == t && (e = "post-" + e);
                    var a = "preroll" == t || "postroll" == t ? "linear" : t;
                    this.player.externalCall("onVideoAdEvent", this.getVar("oid"), this.getVar("vid"), i, e, a, "", s)
                }
            }
            sendAdShown(e, t) {
                if (this.player.isInited()) {
                    var i = e;
                    "preroll" == e ? i = "pre" : "postroll" == e && (i = "post"), this.player.externalCall("onVideoAdShown", this.getVar("oid"), this.getVar("vid"), i, t)
                }
            }
            sendViewSegments(e) {
                var t = this.getVars();
                t.vsegs_hash && this.player.externalCall("onViewSegmentsChanged", t.oid, t.vid, e, t.vsegs_hash)
            }
            addLiveHeartbeatStatsEvent(e, t) {
                var i = {
                    type: e,
                    details: t,
                    ts: Math.floor(Date.now() / 1e3),
                    view_time: (Date.now() - this.initTime) / 1e3
                };
                this.liveHeartbeatEventsQueue.push(i)
            }
            getLiveHeartbeatEventsQueue() {
                var e = this.liveHeartbeatEventsQueue;
                return this.liveHeartbeatEventsQueue = [], e
            }
            getLiveHeartbeatStats() {
                var e = {
                    init_ts: Math.floor(this.initTime / 1e3),
                    current_ts: Math.floor(Date.now() / 1e3),
                    view_time: (Date.now() - this.initTime) / 1e3,
                    events: this.getLiveHeartbeatEventsQueue()
                };
                if ("hls" === this.player.getMediaProviderType()) {
                    var t = this.player.getQuality();
                    t && (e.selected_quality = t, e.is_auto_quality = this.player.isAutoQualityEnabled(), e.available_qualities = this.player.getAvailableQualities()), e.upfront_buffer = this.getUpfrontBufferSeconds()
                }
                return "flash" === this.player.getMediaProviderType() && (e.rtmp = this.player.media.getContentUrl()), e
            }
            getUpfrontBufferSeconds() {
                if ("flash" === this.player.getMediaProviderType()) return 0;
                var e = this.player.getBufferedRanges();
                return e.length ? e.end(e.length - 1) - this.player.curTime() : 0
            }
        }

        function ni(e, t, i, s, a, r, l) {
            try {
                var n = e[r](l),
                    o = n.value
            } catch (e) {
                return void i(e)
            }
            n.done ? t(o) : Promise.resolve(o).then(s, a)
        }
        var oi = 1;
        class hi {
            constructor(e) {
                e = clone(e), this.setLangVars(e), this.el = ce("div", {
                    className: "videoplayer"
                }), attr(this.el, "tabindex", -1), attr(this.el, "role", "complementary"), attr(this.el, "aria-label", this.langVars.aria_videoplayer), this.state = r.EMPTY, this._volume = this.preferredVolume, this._muted = !this._volume, this._events = new EventEmitter, this.media = new tt(this), this.el.appendChild(this.media.el), this.ads = new Xt(this), this.el.appendChild(this.ads.el), this.ui = new Yt(this), this.el.appendChild(this.ui.el), this.stats = new li(this), this.on(D, this.onMediaPlaying.bind(this)).on(M, this.onMediaPause.bind(this)).on(A, this.checkSuggestionQuarterWatched.bind(this)).on(R, this.onEnded.bind(this)).on(B, this.onError.bind(this)).on(z, this.onUiSeekStart.bind(this)).on(Z, this.onLinearAdsStarted.bind(this)).on(ee, this.onLinearAdsCompleted.bind(this)), window.addEventListener("resize", this._resizeHandler = this.resize.bind(this)), yt.a && document.addEventListener(yt.a.raw.fullscreenchange, this._fsChangeHandler = this.onFullscreenChange.bind(this)), VideoPlayer._instances && VideoPlayer._instances.add(this), this.initVideo(e)
            }
            initVideo(e) {
                e = clone(e, !0), this.vars = e, this.changeState(r.UNSTARTED, !0), this.videoLiked = e.liked, this.videoAdded = e.added, this.isSubscribed = e.is_subscribed, this._livePhase = e.live, this.videoBookmarked = e.bookmarked, this.trigger(l, e), e.from_autoplay && this.toggleMute(!0, !1), this.isActiveLive() && this.startLiveHeartbeat(), e.show_suggestions && this.loadSuggestions(), (window.requestAnimationFrame || window.setTimeout)(() => {
                    this.externalCall("onInitialized"), this.resize(), e.autoplay && this.play()
                }, 0)
            }
            deinitVideo() {
                this.stopLiveHeartbeat(), this.changeState(r.EMPTY), this._quality = null, this._livePhase = null, this._startedPlaying = !1, this._didEnded = !1, this._suggestions = null, this._suggestionsQid = null, this.trigger(n), this.vars = null
            }
            reinitWithoutHls() {
                var e = this.vars;
                this.deinitVideo(), delete e.hls, this.initVideo(e)
            }
            setLangVars(e) {
                this.langVars = {}, each(e, (e, t) => {
                    "lang_" === e.substr(0, 5) && (this.langVars[e.substr(5)] = t)
                })
            }
            get preferredVolume() {
                var e = Re.getPref("volume");
                return "number" == typeof e ? Math.min(1, Math.max(0, e)) : oi
            }
            set preferredVolume(e) {
                Re.savePref("volume", e)
            }
            get preferredQuality() {
                return this.vars && this.vars.hd_def >= 0 ? ye(this.vars.hd_def) : Re.getPref("quality") || ue
            }
            set preferredQuality(e) {
                Re.savePref("quality", e)
            }
            loadSuggestions() {
                var e = this;
                return function(e) {
                    return function() {
                        var t = this,
                            i = arguments;
                        return new Promise(function(s, a) {
                            var r = e.apply(t, i);

                            function l(e) {
                                ni(r, s, a, l, n, "next", e)
                            }

                            function n(e) {
                                ni(r, s, a, l, n, "throw", e)
                            }
                            l(void 0)
                        })
                    }
                }(function*() {
                    var t = e.getVideoId(),
                        i = e.vars.suggestions_sig;
                    if (i) {
                        var s = {
                                id: t,
                                t_sex: e.vars.g || null,
                                t_age: e.vars.a || null,
                                uid: e.vars.viewer_id || null,
                                sig: i
                            },
                            a = be("//vk.go.mail.ru/vk/video_recommend?" + ajx2q(s)),
                            {
                                response: r
                            } = yield a.promise,
                            l = JSON.parse(r);
                        if (e.getVideoId() === t && l && l.results && l.results.length) {
                            e._suggestionsQid = l.qid;
                            var n = l.results,
                                o = !(!e.vars.is_inline && !e.vars.is_embed);
                            e.externalCall("fetchSuggestions", n.join(","), o)
                        }
                    }
                })()
            }
            checkSuggestionQuarterWatched(e) {
                this.isInited() && this.vars.suggestions_qid && !this._suggestionQuartedWatched && !this.isPlayingLinearAd() && e / this.getDuration() > .25 && (this._suggestionQuartedWatched = !0, this.onSuggestionQuarterWatched())
            }
            isInited() {
                return this.getState() !== r.EMPTY
            }
            getVars() {
                return this.vars ? clone(this.vars) : null
            }
            getVideoId() {
                return this.isInited() ? `${this.vars.oid}_${this.vars.vid}` : null
            }
            getVideoLink(e = !1) {
                var t = "https://vk.com/video" + this.getVideoId();
                return e && (t += "?t=" + Ye.toString(this.curTime())), t
            }
            getEmbedCode() {
                var e = this.vars;
                return `<iframe src="${`https://vk.com/video_ext.php?oid=${e.oid}&id=${e.vid}&hash=${e.embed_hash}`}" width="640" height="360" frameborder="0" allowfullscreen></iframe>`
            }
            getDuration() {
                return this.isInited() ? this.isPlayingLinearAd() ? this.ads.getDuration() : this.media.getDuration() || intval(this.vars && this.vars.duration) : 0
            }
            getAvailableQualities() {
                return this.media.getAvailableQualities()
            }
            isAutoQualityAvailable() {
                return this.media.isAutoQualityAvailable()
            }
            isAutoQualityEnabled() {
                return this.media.isAutoQualityEnabled()
            }
            getQuality() {
                return this._quality || this.media.getQuality()
            }
            getQualityIndex() {
                return function(e) {
                    for (var t = 0; t < _e.length; t++)
                        if (e <= _e[t].height) return t;
                    return _e.length - 1
                }(this.getQuality())
            }
            setQuality(e, {
                setPreferred: t = !0
            } = {}) {
                if ((inArray(e, this.getAvailableQualities()) || e === de) && (e !== de || !this.isAutoQualityEnabled()) && (e !== this._quality || this.isAutoQualityEnabled())) {
                    if (this.media.setQuality(e), this.onQualityChanged(e === de ? this.getQuality() : e), e !== de && t)(e < Math.max.apply(Math, this.getAvailableQualities()) || e > this.preferredQuality) && (this.preferredQuality = e);
                    this.getState() === r.ERROR && this.changeState(r.PLAYING)
                }
            }
            onQualityChanged(e) {
                var t = this.isAutoQualityEnabled(),
                    i = this._quality;
                this._quality = e, this.trigger(p, e, i, t)
            }
            getAvailableSubtitleTracksInfo() {
                return this.media.getAvailableSubtitleTracksInfo()
            }
            getSubtitleTrack() {
                return this.media.getSubtitleTrack()
            }
            get preferredSubtitleLang() {
                return Re.getPref("subtitle_lang")
            }
            set preferredSubtitleLang(e) {
                Re.savePref("subtitle_lang", e)
            }
            getPreferredSubtitleTrack() {
                var e = this.getAvailableSubtitleTracksInfo();
                if (!e.length) return null;
                if (1 === e.length) return e[0];
                var t = this.vars.subtitles_langs,
                    i = this.preferredSubtitleLang,
                    s = vk.lang,
                    a = null,
                    r = null,
                    l = null,
                    n = null;
                for (var o of e) {
                    var h = o.lang;
                    a || 3 !== t[h].lang_id || (a = o), r || 0 !== t[h].lang_id || (r = o), l || t[h].lang_id !== i || (l = o), n || t[h].lang_id !== s || (n = o)
                }
                return l || n || this.vars.cis && r || a || e[0]
            }
            switchSubtitleTrack(e = null, t = !1) {
                var i = this.getAvailableSubtitleTracksInfo();
                if (i.length)
                    if (-1 === e || null === e && this.getSubtitleTrack() > -1) this.media.switchSubtitleTrack({
                        trackId: -1
                    });
                    else
                        for (var s of (null === e && (e = this.getPreferredSubtitleTrack().id), i))
                            if (e === s.id) {
                                var a = this.vars.subtitles_langs[s.lang].lang_id;
                                return this.media.switchSubtitleTrack({
                                    trackId: e
                                }), this.preferredSubtitleLang = a, void(t && this.trigger(Y, s))
                            }
            }
            play() {
                this.getState() !== r.PLAYING && this.getState() !== r.ERROR && this.isInited() && (this.getState() === r.UNSTARTED && this.requestPlayAds(), this.changeState(r.PLAYING), this.isPlayingLinearAd() ? this.ads.play() : this.media.play(), this.externalCall("onVideoStreamPlaying", this.vars.oid, this.vars.vid))
            }
            pause() {
                this.getState() === r.PLAYING && this.getState() !== r.ERROR && (this.isPlayingLinearAd() ? this.ads.pause() : this.media.pause(), this.changeState(r.PAUSED))
            }
            isBuffering() {
                return this.media.isWaiting()
            }
            getBufferedRanges() {
                return this.media.getBufferedRanges()
            }
            getThumbSrc() {
                var e = this.vars;
                if (e.stretch_vertical && e.is_inline && e.is_aurora) {
                    var t = e.first_frame_800 || e.first_frame_320 || e.first_frame_160 || e.first_frame_130;
                    if (t) return t
                }
                return e.jpg || ""
            }
            getLivePhase() {
                return this._livePhase
            }
            changeLivePhase(e) {
                if (e != this._livePhase) {
                    var t = this._livePhase;
                    this._livePhase = e, this.trigger(T, e, t), this.isActiveLive() || this.stopLiveHeartbeat()
                }
            }
            isActiveLive() {
                var e = this.getLivePhase();
                return e == ae || e == le
            }
            isInLayer() {
                return !!this.externalCall("isInLayer", this.getVideoId())
            }
            startLiveHeartbeat() {
                var e = [],
                    t = {},
                    i = () => {
                        var s = this.isInLayer(),
                            a = this.stats.getLiveHeartbeatStats();
                        ajax.post("al_video.php?act=live_heartbeat", {
                            oid: this.vars.oid,
                            vid: this.vars.vid,
                            user_id: this.vars.viewer_id,
                            need_friends: s ? 1 : 0,
                            shown_friends: e.join(","),
                            stats: a ? JSON.stringify(a) : null,
                            hash: this.vars.action_hash
                        }, {
                            onDone: (i, s) => {
                                s && (s = s.map(e => t[e.id] || (t[e.id] = e)), e = s.map(e => e.id)), this.externalCall("onLiveViewersCountChange", this.getVideoId(), i, s)
                            },
                            onFail: () => !0
                        }), this._liveHeartbeatTimeout = setTimeout(i, 5e3)
                    };
                i()
            }
            stopLiveHeartbeat() {
                this._liveHeartbeatTimeout && (clearTimeout(this._liveHeartbeatTimeout), this._liveHeartbeatTimeout = null, ajax.post("al_video.php?act=live_stop_heartbeat", {
                    oid: this.vars.oid,
                    vid: this.vars.vid,
                    user_id: this.vars.viewer_id,
                    hash: this.vars.action_hash
                }, {
                    onFail: () => !0
                }))
            }
            checkLivePhase(e) {
                var t = this.getVideoId();
                ajax.post("al_video.php?act=check_live_phase", {
                    oid: this.vars.oid,
                    vid: this.vars.vid,
                    hash: this.vars.action_hash,
                    media_url: this.media.getContentUrl()
                }, {
                    onDone: i => {
                        this.getVideoId() == t && e(i)
                    },
                    onFail: () => (setTimeout(() => {
                        this.getVideoId() == t && this.checkLivePhase(e)
                    }, 3e3), !0)
                })
            }
            togglePlay(e) {
                void 0 === e && (e = this.getState() !== r.PLAYING), e ? this.play() : this.pause()
            }
            getMediaProviderType() {
                return this.media.providerType()
            }
            requestPlayAds() {
                var e = this.vars.live && this.vars.live != ne;
                this.canShowAds() && !e && (this.media.preload(), this.media.disablePlayback(), this.ads.start("preroll", () => {
                    this.isInited() && setTimeout(() => {
                        this.media.enablePlayback(), this.ads.start("overlay")
                    })
                }))
            }
            onMediaPlaying() {
                this._startedPlaying = !0, this.changeState(r.PLAYING)
            }
            onMediaPause() {
                this.changeState(r.PAUSED)
            }
            onEnded() {
                this.isPlayingOverlayAd() && this.ads.stop();
                var e = this.vars.live && this.vars.live != ne;
                !this.canShowAds() || e || this._didEnded ? (this.changeState(r.ENDED), cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler(null, !0)) : (this.media.disablePlayback(), this.ads.start("postroll", () => {
                    this.changeState(r.ENDED), this.media.enablePlayback()
                })), this._didEnded = !0
            }
            onError(e) {
                this.errorData = e, this.changeState(r.ERROR), this.ads.cancelAds(), this.externalCall("onVideoPlayError")
            }
            onUiSeekStart() {
                this.getState() === r.ENDED && this.changeState(r.PAUSED)
            }
            canShowAds() {
                var e = browser.msie && browser.version <= 10;
                return !this.vars.no_ads && !e && this.getLivePhase() !== he
            }
            curTime() {
                return this.isInited() ? this.isPlayingLinearAd() ? this.ads.curTime() : this.media.curTime() : 0
            }
            seekTo(e, t = !0) {
                if (this.getState() !== r.ERROR) {
                    var i = this.getLivePhase();
                    i && i !== ne || (e = Math.max(0, Math.min(this.getDuration(), e))) !== this.media.curTime() && (this.media.seekTo(e), this.trigger(m, e), t && this.getState() === r.UNSTARTED && this.play(), this.getState() === r.ENDED && this.changeState(r.PAUSED))
                }
            }
            seekToPercent(e) {
                var t = this.getDuration() * e;
                return this.seekTo(t)
            }
            seekBy(e) {
                return this.seekTo(this.curTime() + e)
            }
            getVolume() {
                return this._volume
            }
            setVolume(e, t = !0) {
                e = Math.max(0, Math.min(1, e)), this.media.setVolume(e), this.ads.setVolume(e), this._volume = e, this._muted = !e, t && (this.preferredVolume = e)
            }
            toggleMute(e = !this.isMuted(), t = !0) {
                var i = e ? 0 : this._volume || oi;
                this.media.setVolume(i), this.ads.setVolume(i), this._muted = e, t && (this.preferredVolume = i)
            }
            isMuted() {
                return !!this._muted
            }
            toggleLoop(e = !this.isLooped()) {
                return this.media.toggleLoop(e)
            }
            isLooped() {
                return this.media.isLooped()
            }
            setPlaybackRate(e) {
                this.media.setPlaybackRate(e)
            }
            getPlaybackRate() {
                return this.media.getPlaybackRate()
            }
            canRotateVideo() {
                return this.media.canRotateVideo()
            }
            rotateVideo(e = -90) {
                this.media.rotateVideo(e)
            }
            isStartedPlaying() {
                return !!this._startedPlaying
            }
            getPlayedRanges() {
                return this.media.getPlayedRanges()
            }
            getPlayedRangesString() {
                return this.media.getPlayedRangesString()
            }
            getPlayedSeconds() {
                return this.media.getPlayedSeconds()
            }
            canChangePlaybackRate() {
                return "flash" != this.media.providerType()
            }
            canExpand() {
                return "flash" != this.media.providerType() && !(this.isActiveLive() && this.vars.force_rtmp && this.isFlashSupported())
            }
            expand() {
                this.isAutoplay() && (this.expandFromAutoplay = !0, this.pause());
                var e = this.vars.list_id,
                    t = Ye.toString(this.curTime());
                this.externalCall("onOpenInPopup", this.getVideoId(), e, t)
            }
            onExpanded() {
                var e = this.expandFromAutoplay || this.isAutoplay();
                this.vars.is_inline = 0, setTimeout(() => {
                    this.onTouchedByUser(), this.resize(), this.isPlayingLinearAd() ? this.ads.play() : this.media.play(), this.play(), this.trigger(y), e && this.vars.autoplay_expand_restart && !this.isActiveLive() && (this.ads.cancelAds(), this.seekTo(0), this.requestPlayAds())
                }, 0)
            }
            toggleFullscreen() {
                yt.a && (this.isFullscreen() ? yt.a.exit() : yt.a.request(this.el))
            }
            isFullscreen() {
                return yt.a.element === this.el
            }
            onFullscreenChange() {
                this.trigger(_, this.isFullscreen()), this.resize(), this.externalCall("fullscreen", this.isFullscreen())
            }
            getSize(e = !1) {
                if (!this._size || e) {
                    var t = this.el.getBoundingClientRect();
                    this._size = [t.width, t.height]
                }
                return this._size
            }
            resize() {
                addClass(this.el, "no_transition");
                var e = this.getSize(!0);
                this.trigger(o, ...e), removeClassDelayed(this.el, "no_transition")
            }
            isMinimized() {
                return !(!window.Videoview || !Videoview.isMinimized())
            }
            getEnvLayoutType() {
                return window.Videoview ? Videoview.getLayoutType() : ""
            }
            getEnvModule() {
                if (window.Videoview) {
                    var e = Videoview.getVideoModule(this.getVideoId());
                    if (e) return e
                }
                return cur.module || ""
            }
            isControlsVisible() {
                return this.ui.isControlsVisible()
            }
            isLoadingAds() {
                return this.ads.isLoading()
            }
            onLinearAdsStarted() {
                this.media.disablePlayback()
            }
            onLinearAdsCompleted() {
                this.media.enablePlayback()
            }
            isPlayingLinearAd() {
                return this.ads.isPlayingLinear()
            }
            isPlayingOverlayAd() {
                return this.ads.isPlayingOverlay()
            }
            isAutoplay() {
                return this.isFromAutoplay() && !this.isTouchedByUser()
            }
            isFromAutoplay() {
                return this.isInited() && !!this.vars.from_autoplay
            }
            onTouchedByUser() {
                this.isTouchedByUser() || (this.touchedByUser = !0, this.isFromAutoplay() && (this.ui.onTouchedByUser(), this.externalCall("onPlayerTouchedByUser"), setTimeout(() => {
                    this.toggleMute(!1), this.getState() === r.PLAYING && this.externalCall("onVideoStreamPlaying", this.vars.oid, this.vars.vid)
                }, 0)))
            }
            isTouchedByUser() {
                return !!this.touchedByUser
            }
            onSuggestionsShown(e = !1, t = !1) {
                var i = t ? this._suggestionsQid : null;
                this.externalCall("onSuggestionsShown", i, this.getVideoId(), e)
            }
            onSuggestionClicked(e, t = !1, i = 1, s = 0) {
                this.externalCall("onSuggestionClick", e, this._suggestionsQid, i, s, t)
            }
            onSuggestionQuarterWatched() {
                this.externalCall("onSuggestionQuarterWatched", this.vars.suggestions_qid, this.getVideoId(), this.curTime())
            }
            onSuggestionsReplayClicked() {
                this.togglePlay(), this.externalCall("onSuggestionsReplayClicked")
            }
            nextVideo(e, t, i) {
                this.externalCall("onVideoNext", e, t, i)
            }
            likeVideo(e) {
                this.onLiked(!this.videoLiked), this.externalCall("onLike", e)
            }
            onLiked(e) {
                this.videoLiked = !!e, this.trigger(S, this.videoLiked)
            }
            shareVideo(e) {
                this.isFullscreen() && this.toggleFullscreen(), this.externalCall("onShare", e)
            }
            addVideo(e) {
                this.onAdded(), this.videoAdded ? this.externalCall("onAdd", this.getVideoId(), this.vars.add_hash, e) : this.externalCall("onRemove", e)
            }
            donate(e) {
                this.isFullscreen() && this.toggleFullscreen(), this.externalCall("onDonate", e)
            }
            bookmark(e) {
                this.videoBookmarked ? this.externalCall("onRemoveBookmark", e) : this.externalCall("onAddBookmark", e), this.onBookmarked()
            }
            onBookmarked() {
                this.videoBookmarked = !this.videoBookmarked, this.trigger(w, this.videoBookmarked)
            }
            onAdded() {
                this.videoAdded = !this.videoAdded, this.trigger(k, this.videoAdded)
            }
            subscribeToAuthor(e) {
                var t = !this.isSubscribed;
                this.externalCall("onSubscribe", t, e)
            }
            onSubscribed(e) {
                this.isSubscribed = !!e, this.trigger(C, this.isSubscribed)
            }
            nextTimerReset() {
                this.nextTimerStopped || (this.nextTimerStopped = !0, this.trigger(b))
            }
            nextTimerStart() {
                this.nextTimerStopped && (this.nextTimerStopped = !1, this.trigger(f))
            }
            setSuggestions(e) {
                this._suggestions = e
            }
            pushDonation(e, t) {
                this.isActiveLive() && this.trigger(E, e, t)
            }
            pushNotice(e) {
                this.ui.pushNotice(e)
            }
            pushLiveMidroll(e) {
                this.canShowAds() && this.isActiveLive() && (e ? this.ads.cancelAds() : this.ads.start("_live_midroll"))
            }
            onStickersPurchased(e) {
                this.ui.onStickersPurchased(e)
            }
            getSuggestions() {
                return this._suggestions || []
            }
            getNextVideos() {
                return window.Videoview ? Videoview.getNextVideosData() : []
            }
            nextTimerEnabled() {
                return !!window.VideoPlaylist && VideoPlaylist.isAutoplayEnabled()
            }
            externalCall(e, ...t) {
                try {
                    return window.videoCallback && videoCallback([e, ...t])
                } catch (t) {
                    this.debugLog(["error calling callback " + e, t], {
                        type: "warn"
                    })
                }
            }
            debugLog(e, {
                type: t = "log",
                force: i = !1
            } = {}) {
                if (this.isInited() && (window.__dev || i)) try {
                    console[t](...["%c videoplayer ", "background:#9ddcf7;"].concat(e))
                } catch (e) {}
            }
            changeState(e, t = !1) {
                if (this.isInited() || t)
                    if (e) {
                        if (e === this.state) {
                            if (e != r.ERROR) return
                        } else this.prevState = this.state, this.state = e, e != r.ERROR && (this.errorData = null);
                        this.trigger(d, e, this.prevState)
                    } else this.debugLog("trying to change state to undefined", {
                        type: "warn"
                    })
            }
            getState() {
                return this.state
            }
            getErrorData() {
                return this.errorData || ""
            }
            trigger(e, ...t) {
                void 0 !== e ? this._events.emit(e, ...t) : this.debugLog("trying to trigger undefined event", {
                    type: "warn"
                })
            }
            on(e, t) {
                if (void 0 !== e) return this._events.on(e, t);
                this.debugLog("trying to set listener to undefined event", {
                    type: "warn"
                })
            }
            off(e, t) {
                if (void 0 !== e) return this._events.off(e, t);
                this.debugLog("trying to unset listener from undefined event", {
                    type: "warn"
                })
            }
            destroy() {
                this.deinitVideo(), this.trigger(h), this._events.removeAllListeners(), window.removeEventListener("resize", this._resizeHandler), yt.a && document.removeEventListener(yt.a.raw.fullscreenchange, this._fsChangeHandler)
            }
            getDebugData() {
                if (!this.isInited()) return "";
                var e = [];
                return e.push(["Video ID", this.getVideoId()]), e.push(["Content host", this.media.getContentHost()]), e.push(["Media provider", this.media.providerType() || "none"]), e.push(["Quality", this.getQuality()]), e.push(["Auto quality", this.isAutoQualityAvailable() ? this.isAutoQualityEnabled() ? "enabled" : "disabled" : null]), e.push(["Position", this.curTime()]), e.push(["Player state", this.getState()]), e.push(["Live Phase", this.getLivePhase()]), e.push(["Player size", this.getSize().join("x")]), e.push(["Module", window.Videoview ? Videoview.getVideoModule() : cur.module]), e.push(["Error code", this.media.getErrorCode()]), e.push(["Errors log", this.media.getErrorsLog()]), this.vars.live ? (e.push(["Live HLS", this.vars.hls]), e.push(["Live RTMP", this.vars.rtmp]), e.push(["Postlive MP4", this.vars.postlive_mp4])) : e.push(["Hls manifest", this.vars.hls]), e.filter(([e, t]) => null != t).map(e => e.join(": ")).join("\n")
            }
            isHlsSupported() {
                return window.MediaSource && MediaSource.isTypeSupported && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
            }
            isFlashSupported() {
                return browser.flash >= 24
            }
            getPreloadedQuality() {
                return di[this.getVideoId()]
            }
            setActionButton(e) {
                this.ui.actionButton.setLink(e)
            }
            static get Events() {
                return s
            }
            static get States() {
                return r
            }
            static get LivePhases() {
                return a
            }
            static preload(e) {
                var t = `${e.oid}_${e.vid}`;
                if (e.hls_raw && !di[t]) {
                    for (var i, s = [], a = {}, r = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g; i = r.exec(e.hls_raw);) {
                        var [, l, n] = i;
                        if ((l = m(l)).RESOLUTION) {
                            var [o, h] = l.RESOLUTION.split("x"), d = me(+o, +h);
                            s.push(d), a[d] = n
                        }
                    }
                    if (s.length) {
                        var u = Math.min(...s),
                            c = Math.max(...s),
                            p = Re.getPref("abr_quality") || ue,
                            g = Math.max(u, Math.min(p, c, ue)),
                            v = a[g];
                        if (v) {
                            var _ = v.replace(/index-(.+).m3u8/, "seg-1-$1.ts");
                            be(v), be(_), di[t] = g
                        }
                    }
                }

                function m(e) {
                    var t = {};
                    return e.split(",").forEach(e => {
                        var [i, s] = e.split("=");
                        t[i] = s
                    }), t
                }
            }
            static dispatchEventFromId(e, t, i) {
                var s, a = ge(e);
                if (a) {
                    try {
                        s = new Event(t)
                    } catch (e) {
                        (s = document.createEvent("Event")).initEvent(t, !1, !1)
                    }
                    a.dispatchEvent(s)
                }
            }
        }
        window.WeakSet && (hi._instances = new window.WeakSet);
        var di = {};
        window.VideoPlayer = hi;
        try {
            stManager.done("videoplayer.js")
        } catch (e) {}
    }
});