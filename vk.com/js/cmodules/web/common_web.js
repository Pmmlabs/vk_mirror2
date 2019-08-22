! function(e) {
    function t(t) {
        for (var i, a, s = t[0], d = t[1], c = t[2], w = 0, _ = []; w < s.length; w++) a = s[w], n[a] && _.push(n[a][0]), n[a] = 0;
        for (i in d) Object.prototype.hasOwnProperty.call(d, i) && (e[i] = d[i]);
        for (l && l(t); _.length;) _.shift()();
        return r.push.apply(r, c || []), o()
    }

    function o() {
        for (var e, t = 0; t < r.length; t++) {
            for (var o = r[t], i = !0, s = 1; s < o.length; s++) {
                var d = o[s];
                0 !== n[d] && (i = !1)
            }
            i && (r.splice(t--, 1), e = a(a.s = o[0]))
        }
        return e
    }
    var i = {},
        n = {
            "web/common_web": 0
        },
        r = [];

    function a(t) {
        if (i[t]) return i[t].exports;
        var o = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, a), o.l = !0, o.exports
    }
    a.m = e, a.c = i, a.d = function(e, t, o) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        })
    }, a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, a.t = function(e, t) {
        if (1 & t && (e = a(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (a.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) a.d(o, i, function(t) {
                return e[t]
            }.bind(null, i));
        return o
    }, a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return a.d(t, "a", t), t
    }, a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, a.p = "";
    var s = window.webpackJsonp = window.webpackJsonp || [],
        d = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var c = 0; c < s.length; c++) t(s[c]);
    var l = d;
    r.push([83, "bundles/audioplayer", "bundles/common"]), o()
}({
    "+MXk": function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "emailNotConfirmed", function() {
            return emailNotConfirmed
        }), __webpack_require__.d(__webpack_exports__, "showCaptcha", function() {
            return showCaptcha
        }), __webpack_require__.d(__webpack_exports__, "mobileValidationRequired", function() {
            return mobileValidationRequired
        }), __webpack_require__.d(__webpack_exports__, "passwordValidationRequired", function() {
            return passwordValidationRequired
        }), __webpack_require__.d(__webpack_exports__, "authFailed", function() {
            return authFailed
        }), __webpack_require__.d(__webpack_exports__, "makeRedirect", function() {
            return makeRedirect
        }), __webpack_require__.d(__webpack_exports__, "reload", function() {
            return reload
        }), __webpack_require__.d(__webpack_exports__, "mobileActivationRequired", function() {
            return mobileActivationRequired
        }), __webpack_require__.d(__webpack_exports__, "showMessage", function() {
            return showMessage
        }), __webpack_require__.d(__webpack_exports__, "showError", function() {
            return showError
        }), __webpack_require__.d(__webpack_exports__, "votesPayment", function() {
            return votesPayment
        }), __webpack_require__.d(__webpack_exports__, "otpBox", function() {
            return otpBox
        }), __webpack_require__.d(__webpack_exports__, "zeroZone", function() {
            return zeroZone
        }), __webpack_require__.d(__webpack_exports__, "evalCode", function() {
            return evalCode
        }), __webpack_require__.d(__webpack_exports__, "defaultHandler", function() {
            return defaultHandler
        });
        var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("91GP"),
            core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("pIFo"),
            _shared_lib_convert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cGUQ"),
            _web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("t7n3"),
            _web_lib_message_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("EasH"),
            _web_lib_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("zxIV"),
            _web_lib_debug_tools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("98sY"),
            _web_lib_ui_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("ryw6"),
            _web_lib_box_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("kcIO"),
            _modal_box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("eQf/");

        function _extends() {
            return (_extends = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = arguments[t];
                    for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i])
                }
                return e
            }).apply(this, arguments)
        }

        function resetOptionsCache(e) {
            return e.cache ? _extends({}, e, {
                cache: -1
            }) : e
        }

        function emailNotConfirmed(e, t) {
            Object(_web_lib_message_box__WEBPACK_IMPORTED_MODULE_4__.showFastBox)({
                width: 520,
                title: t[0],
                onDestroy: e.onFail
            }, t[1])
        }

        function showCaptcha(e, t, o) {
            2 === Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.intval)(t[1]) ? e._captcha = Object(_web_lib_message_box__WEBPACK_IMPORTED_MODULE_4__.showReCaptchaBox)(t[0], t[2], e._captcha, {
                onSubmit: function(t) {
                    var i = _extends({}, o, {
                        recaptcha: t,
                        captcha_sid: null,
                        captcha_key: null
                    });
                    e.resend(i, resetOptionsCache(e))
                },
                onDestroy: function() {
                    e.onFail && e.onFail()
                }
            }) : e._captcha = Object(_web_lib_message_box__WEBPACK_IMPORTED_MODULE_4__.showCaptchaBox)(t[0], Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.intval)(t[1]), e._captcha, {
                onSubmit: function(t, i) {
                    var n = _extends({}, o, {
                        captcha_sid: t,
                        captcha_key: i
                    });
                    e.resend(n, resetOptionsCache(e))
                },
                onDestroy: function() {
                    e.onFail && e.onFail()
                }
            }), e._suggest = Object(_web_lib_dom__WEBPACK_IMPORTED_MODULE_5__.geByClass1)("phone_validation_link", e._captcha.bodyNode), e._suggest && addEvent(e._suggest, "click", function() {
                e._box = Object(_modal_box__WEBPACK_IMPORTED_MODULE_9__.validateMobileBox)({
                    onDone: e._captcha.submit
                })
            })
        }
        var mobileValidationRequired = e => (t, o, i) => {
            t._box = Object(_modal_box__WEBPACK_IMPORTED_MODULE_9__.validateMobileBox)({
                acceptCaptcha: 11 === e,
                onDone: function(e, o) {
                    vk.nophone = 0, e && (t._captcha = Object(_web_lib_box_utils__WEBPACK_IMPORTED_MODULE_8__.curBox)());
                    var n = e ? _extends({}, i, {
                        captcha_sid: e,
                        captcha_key: o
                    }) : i;
                    t.resend(n, resetOptionsCache(t))
                },
                onFail: t.onFail,
                hash: o[0],
                ahash: o[1]
            })
        };

        function passwordValidationRequired(e, t, o) {
            e._box = Object(_modal_box__WEBPACK_IMPORTED_MODULE_9__.validatePassBox)({
                onDone: () => e.resend(o, resetOptionsCache(e)),
                onFail: e.onFail,
                hash: t[0]
            })
        }

        function authFailed(e, t, o) {
            window.onReLoginDone = () => e.resend(o, resetOptionsCache(e)), window.onReLoginFailed = function(e, t) {
                t ? nav.go(t) : -1 === e ? location.href = location.href.replace(/^http:/, "https:") : e ? nav.go("/") : window.onReLoginDone()
            }, window.utilsNode.appendChild(Object(_web_lib_dom__WEBPACK_IMPORTED_MODULE_5__.ce)("iframe", {
                src: window.vk.loginscheme + "://login.vk.com/?" + Object(_shared_lib_convert__WEBPACK_IMPORTED_MODULE_2__.toQueryString)({
                    role: "al_frame",
                    _origin: window.locProtocol + "//" + window.locHost,
                    ip_h: t[0] || window.vk.ip_h,
                    to: t[1] || ""
                })
            }))
        }

        function makeRedirect(e, t) {
            Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.intval)(t[1]) ? nav.go(t[0], !1, {
                nocur: "2" === t[1],
                noback: !0 === t[1],
                showProgress: e.showProgress,
                hideProgress: e.hideProgress
            }) : (hab.stop(), location.href = t[0])
        }

        function reload(e, t, o, i) {
            nav.reload({
                force: Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.intval)(t[0]),
                from: 1,
                url: i,
                query: o && Object(_shared_lib_convert__WEBPACK_IMPORTED_MODULE_2__.toQueryString)(o)
            })
        }

        function mobileActivationRequired(e, t, o) {
            e._box = Object(_modal_box__WEBPACK_IMPORTED_MODULE_9__.activateMobileBox)({
                onDone: e.resend(o, resetOptionsCache(e)),
                onFail: e.onFail,
                hash: t[0]
            })
        }

        function showMessage(e, t) {
            e.onFail && e.onFail(), Object(_web_lib_ui_util__WEBPACK_IMPORTED_MODULE_7__.topMsg)(t[0], 10)
        }

        function showError(e, t, o, i) {
            e.onFail && e.onFail(t[0]) || Object(_web_lib_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)(t[0] + (t[2] ? " #" + t[2] : ""), {
                dt: t[1] ? 0 : 10,
                type: 4,
                url: i,
                query: o && Object(_shared_lib_convert__WEBPACK_IMPORTED_MODULE_2__.toQueryString)(o)
            })
        }

        function votesPayment(e, t, o) {
            if (!e.fromBox && !e.forceDone || (e.onDone && e.onDone.apply(window, t), !e.fromBox)) {
                e._box = Object(_web_lib_message_box__WEBPACK_IMPORTED_MODULE_4__.showFastBox)({
                    title: Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.trim)(t[0])
                }, t[1]);
                var i = Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.extend)(Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.clone)(e), {
                    showProgress: e._box.showProgress,
                    hideProgress: e._box.hideProgress
                });
                e.cache && (i.cache = -1), e._box = Object(_modal_box__WEBPACK_IMPORTED_MODULE_9__.requestBox)(e._box, function(t) {
                    Object(_web_lib_dom__WEBPACK_IMPORTED_MODULE_5__.isVisible)(e._box.progress) || (t || (t = {
                        _votes_ok: 1
                    }), e.resend(Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.extend)(o, t), i))
                }, e.onFail), e._box.evalBox(t[2])
            }
        }

        function otpBox(e, t, o) {
            e._box = Object(_modal_box__WEBPACK_IMPORTED_MODULE_9__.validateOtpBox)({
                onDone: () => e.resend(o, resetOptionsCache(e)),
                onFail: e.onFail,
                hash: t[0]
            })
        }

        function zeroZone(e, t, o) {
            e._box = Object(_web_lib_message_box__WEBPACK_IMPORTED_MODULE_4__.showFastBox)({
                title: t[0] || getLang("global_charged_zone_title"),
                onHide: e.onFail
            }, t[1], getLang("global_charged_zone_continue"), function() {
                e.resend(_extends({}, o, {
                    charged_confirm: t[3]
                }), e)
            }, getLang("global_cancel"))
        }

        function evalCode(options, answer) {
            var evalString = `(function(){${answer[0]};})()`;
            if (__debugMode) eval(evalString);
            else try {
                eval(evalString)
            } catch (e) {
                Object(_web_lib_debug_tools__WEBPACK_IMPORTED_MODULE_6__.logEvalError)(e, evalString)
            }
        }
        var defaultHandler = e => (t, o) => {
            if (-1 === e || -2 === e || -3 === e) {
                var i, n = o.pop(),
                    r = o.pop(),
                    a = o.pop(); - 3 === e && (i = o.pop()), window.__adsSet && __adsSet(a, null, r, n, null, i)
            }
            t.onDone && t.onDone.apply(window, o)
        }
    },
    "2QOe": function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "FrameTransport", function() {
            return FrameTransport
        });
        var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("91GP"),
            _shared_lib_convert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cGUQ"),
            _web_lib_utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("t7n3"),
            _web_lib_ui_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ryw6"),
            _web_lib_debug_tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("98sY"),
            _web_lib_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("zxIV");

        function _extends() {
            return (_extends = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = arguments[t];
                    for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i])
                }
                return e
            }).apply(this, arguments)
        }
        var _queueStartMarker = {
                type: "start"
            },
            _queueEndMarker = {
                type: "end"
            };
        class FrameTransport {
            constructor() {
                this.frameDataQueue = [], this.frameTimeout = null, this.frame = null, this.queueReady = !1, this.fulfilled = !1, this._debug = () => {}
            }
            setHandlers() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : () => {},
                    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : () => {};
                this._onEnd = e, this._onModuleEvaluated = t, this._debug = o
            }
            run(e, t) {
                return this._debug("Run ", e, this.frameDataQueue), this.frameUrl = e, this.onReady = t, this.fulfilled = !1, this.queueReady = !1, this.frameDataQueue = [_queueStartMarker], clearTimeout(this.frameTimeout), this.frameTimeout = !1, this.frame && this._cleanup(), this.frame = ce("div", {
                    innerHTML: "<iframe></iframe>"
                }), utilsNode.appendChild(this.frame), this.frame.firstChild.src = this.frameUrl, this
            }
            useMeta(e) {
                this._debug("Metainfo: ", e), this.onReady(e)
            }
            useAjaxBlock(e, t, o) {
                this._debug("Ajax block: ", e, t, o, this.fulfilled, this.frameDataQueue), this.fulfilled || (this.frameDataQueue.push(FrameTransport._makeQueueBlock(e, t, o)), 1 === this.frameDataQueue.length && this._nextQueueItem())
            }
            finalize(e, t) {
                this._debug("Finalize: ", e), this._cleanup(), e && this.frameDataQueue.push(FrameTransport._makeQueueBlock(!1, !1, e, t)), this.queueReady = !0, this.frameDataQueue.push(_queueEndMarker), window.cur.onFrameBlocksDone && window.cur.onFrameBlocksDone(), this._onEnd && this._onEnd((new Date).getTime())
            }
            _nextQueueItem() {
                if (this.frameTimeout && clearTimeout(this.frameTimeout), this.queueReady)
                    if (this._debug("Next queue item: ", this.fulfilled, this.frameDataQueue), this.fulfilled || 0 === this.frameDataQueue.length) this.frameTimeout = !1;
                    else {
                        var e = this.frameDataQueue.shift();
                        switch (e.type) {
                            case _queueStartMarker.type:
                                this._nextQueueItem();
                                break;
                            case _queueEndMarker.type:
                                this.fulfilled = !0;
                                break;
                            default:
                                this.frameTimeout = setTimeout(() => this._onReceived(e), 0)
                        }
                    }
                else this.frameTimeout = setTimeout(() => this._nextQueueItem(), 100)
            }
            _onReceived(e) {
                var t = e.container && ge(e.container);
                t && e.html && (t.firstChild ? t.appendChild(Object(_web_lib_dom__WEBPACK_IMPORTED_MODULE_5__.cf)(e.html)) : val(t, e.html)), e.js && (_runJs(e.js, (t, o) => {
                    Object(_web_lib_ui_util__WEBPACK_IMPORTED_MODULE_3__.topError)(t, {
                        dt: 15,
                        type: 8,
                        url: this.frameUrl,
                        js: o,
                        answer: JSON.stringify(e)
                    }), Object(_web_lib_debug_tools__WEBPACK_IMPORTED_MODULE_4__.logEvalError)(t, o)
                }), this._onModuleEvaluated && this._onModuleEvaluated(cur.module)), e.params && "leftads" in e.params && window.__adsSet && __adsSet(e.params.leftads, e.params.ads_section || "", e.params.ads_can_show, e.params.ads_showed), this._nextQueueItem()
            }
            _cleanup() {
                this._debug("Cleanup: ", this.frameDataQueue), this.frame && (this.frame.innerHTML = "", utilsNode.removeChild(this.frame), this.frame = null)
            }
            abort() {
                clearTimeout(this.frameTimeout), this.frameTimeout = !1, this._cleanup()
            }
            static get frame() {
                return FrameTransport.__frame || (FrameTransport.__frame = new FrameTransport), FrameTransport.__frame
            }
            static request(e, t, o, i) {
                return FrameTransport.frame.run(FrameTransport.makeUrl(e, t, !(i && i.noSort)), o)
            }
            static _makeQueueBlock(e, t, o, i) {
                return {
                    type: "block",
                    container: e,
                    html: t,
                    js: o,
                    params: i
                }
            }
            static makeUrl(e, t) {
                var o = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                    i = t;
                return "string" == typeof t && (i = Object(_shared_lib_convert__WEBPACK_IMPORTED_MODULE_1__.fromQueryString)(t)), e + "?" + (i = Object(_shared_lib_convert__WEBPACK_IMPORTED_MODULE_1__.toQueryString)(_extends({}, i, {
                    _rndVer: Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_2__.irand)(0, 99999)
                }), !o))
            }
        }

        function _runJs(js, onError) {
            var script = "(function(){" + js + ";})()";
            if (__debugMode) eval(script);
            else try {
                eval(script)
            } catch (e) {
                onError && onError(e, script)
            }
        }
    },
    83: function(e, t, o) {
        e.exports = o("g42W")
    },
    g42W: function(e, t, o) {
        "use strict";
        o.r(t);
        var i, n, r, a, s, d, c;
        o("OG14"), o("pIFo"), o("SRfc"), o("NO8f");
        i = window, n = i.HTMLCanvasElement && i.HTMLCanvasElement.prototype, r = i.Blob && function() {
            try {
                return Boolean(new Blob)
            } catch (e) {
                return !1
            }
        }(), a = r && i.Uint8Array && function() {
            try {
                return 100 === new Blob([new Uint8Array(100)]).size
            } catch (e) {
                return !1
            }
        }(), s = i.BlobBuilder || i.WebKitBlobBuilder || i.MozBlobBuilder || i.MSBlobBuilder, d = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, c = (r || s) && i.atob && i.ArrayBuffer && i.Uint8Array && function(e) {
            var t, o, i, n, c, l, w, _, u;
            if (!(t = e.match(d))) throw new Error("invalid data URI");
            for (o = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), i = !!t[4], n = e.slice(t[0].length), c = i ? atob(n) : decodeURIComponent(n), l = new ArrayBuffer(c.length), w = new Uint8Array(l), _ = 0; _ < c.length; _ += 1) w[_] = c.charCodeAt(_);
            return r ? new Blob([a ? w : l], {
                type: o
            }) : ((u = new s).append(l), u.getBlob(o))
        }, i.HTMLCanvasElement && !n.toBlob && (n.mozGetAsFile ? n.toBlob = function(e, t, o) {
            e(o && n.toDataURL && c ? c(this.toDataURL(t, o)) : this.mozGetAsFile("blob", t))
        } : n.toDataURL && c && (n.toBlob = function(e, t, o) {
            e(c(this.toDataURL(t, o)))
        })), "function" == typeof define && define.amd ? define(function() {
            return c
        }) : "object" == typeof module && module.exports ? module.exports = c : i.dataURLtoBlob = c;
        o("uQjJ"), o("rGqo"), o("Btvt");

        function l(e) {
            e && !e.prototype.forEach && (Array.prototype.forEach ? e.prototype.forEach = Array.prototype.forEach : e.prototype.forEach = function(e, t) {
                t = t || window;
                for (var o = 0; o < this.length; o++) e.call(t, this[o], o, this)
            })
        }
        Function.prototype.pbind = function() {
            var e = Array.prototype.slice.call(arguments);
            return e.unshift(window), this.bind.apply(this, e)
        }, Function.prototype.rpbind = function() {
            var e = Array.prototype.slice.call(arguments);
            return e.unshift(window), this.rbind.apply(this, e)
        }, Function.prototype.rbind = function() {
            var e = this,
                t = Array.prototype.slice.call(arguments),
                o = t.shift(),
                i = t.shift();
            return function() {
                var n = Array.prototype.slice.call(arguments);
                return e.apply(o, t.concat(n)), i
            }
        }, Function.prototype.bind || (Function.prototype.bind = function() {
            var e = this,
                t = Array.prototype.slice.call(arguments),
                o = t.shift();
            return function() {
                var i = Array.prototype.slice.call(arguments);
                return e.apply(o, t.concat(i))
            }
        }), Object.keys || (Object.keys = function(e) {
            var t = [];
            for (var o in e) e.hasOwnProperty(o) && t.push(o);
            return t
        }), l(window.NodeList), l(window.HTMLCollection);
        var w = o("ryw6"),
            _ = o("kMSP"),
            u = (o("91GP"), o("KKXr"), o("cGUQ")),
            h = o("jE6c"),
            p = o("W9Tc"),
            b = o("t7n3"),
            f = o("zxIV"),
            g = o("2QOe");

        function m() {
            return (m = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = arguments[t];
                    for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i])
                }
                return e
            }).apply(this, arguments)
        }
        class v {
            static getInstance(e, t) {
                var o = v.makeCacheKey(e, t);
                return v._instances[o] || (v._instances[o] = new v(o)), v._instances[o]
            }
            constructor(e) {
                v.ensureCachesInitialized(), this._cacheKey = e
            }
            getFromCache(e, t, o) {
                var i = o.cacheLevel,
                    n = void 0 === i ? 0 : i,
                    r = o.forceGlobalCache,
                    a = void 0 !== r && r,
                    s = o.onAnswerProcessed,
                    d = void 0 === s ? () => {} : s;
                if (n > 0 || a) {
                    var c = window.ajaxCache[this._cacheKey];
                    if (c && c._loading) return c._callbacks.push(e), !1;
                    if (c && !a) return e(0, c), 3 === n && delete window.ajaxCache[this._cacheKey], !1;
                    if (c = window.globalAjaxCache[this._cacheKey]) return -1 === c || Object(b.isFunction)(c) ? window.globalAjaxCache[this._cacheKey] = t : t.apply(window, c), d && d(), !1
                }
                return window.ajaxCache[this._cacheKey] = {
                    _loading: 1,
                    _callbacks: []
                }, !0
            }
            processExistingCache(e, t) {
                var o = window.ajaxCache[this._cacheKey];
                o && o._loading && (setTimeout(function() {
                    for (var i in o._callbacks) o._callbacks.hasOwnProperty(i) && o._callbacks[i](e, t)
                }, 0), delete window.ajaxCache[this._cacheKey])
            }
            cacheResponse(e) {
                window.ajaxCache[this._cacheKey] = e
            }
            static ensureCachesInitialized() {
                window.ajaxCache || (window.ajaxCache = {}), window.globalAjaxCache || (window.globalAjaxCache = {})
            }
            static makeCacheKey(e, t) {
                var o = m({}, t);
                return ["al", "al_ad", "ads_section", "ads_showed", "captcha_sid", "captcha_key", "_smt", "_preload"].forEach(e => delete o[e]), e + "#" + Object(u.toQueryString)(o)
            }
            static preload(e, t, o) {
                v.ensureCachesInitialized(), "/" !== e.substr(0, 1) && (e = "/" + e), window.ajaxCache[v.makeCacheKey(e, t)] = o
            }
            static invalidate(e, t) {
                v.ensureCachesInitialized(), void 0 === e ? window.ajaxCache = {} : delete window.ajaxCache[v.makeCacheKey(e, t)]
            }
        }
        v._instances = {};
        o("VRzm"), o("nCnK");
        for (var O = new Uint32Array(256), y = 256; y--;) {
            for (var E = y, k = 8; k--;) E = 1 & E ? 3988292384 ^ E >>> 1 : E >>> 1;
            O[y] = E
        }

        function j(e, t, o, i, n, r, a) {
            var s = arguments.length > 7 && void 0 !== arguments[7] && arguments[7],
                d = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : null,
                c = P(e, t, {
                    xhrOptions: r,
                    sortQueryStringParams: a && !a.noSort,
                    noExtraHeaders: s,
                    urlOnly: n,
                    cancellationToken: a && a.cancellationToken,
                    logger: d
                }),
                l = c._getXhr();
            return c.then(e => o && o(e.data, l.status)).catch(e => i && i(e, l.status)), l
        }

        function P(e, t, o) {
            var i, n = o.xhrOptions,
                r = o.urlOnly,
                a = void 0 !== r && r,
                s = o.sortQueryStringParams,
                d = void 0 === s || s,
                c = o.noExtraHeaders,
                l = void 0 !== c && c,
                w = o.cancellationToken,
                _ = void 0 === w ? null : w,
                h = o.logger,
                p = void 0 === h ? null : h;
            p && (i = function(e) {
                for (var t = -1, o = 0, i = e.length; o < i; o++) t = t >>> 8 ^ O[255 & t ^ e[o]];
                return (-1 ^ t) >>> 0
            }(e + JSON.stringify(t)), p(`Initialized request #${i} with URL ${e} and query ${JSON.stringify(t)}`));
            var f = new XMLHttpRequest;
            _ && _._setCancelCb(() => {
                p && p(`Aborting request #${i}`), f.abort()
            });
            var g = new Promise(function(o, r) {
                var s = "string" != typeof t ? Object(u.toQueryString)(t, !d) : t;
                f.onreadystatechange = function() {
                    if (f.readyState === XMLHttpRequest.DONE)
                        if (p && p(`Request readyState -> DONE with status ${f.status} #${i}`), f.status >= 200 && f.status < 300) try {
                            o({
                                data: f.responseText,
                                code: f.status
                            }), p && p(`Success handler finished for request #${i}`)
                        } catch (e) {
                            p && p(`Success handler failed for request #${i}`), r({
                                data: f.responseText,
                                code: -1
                            }), p && p(`Failure handler finished for request #${i} [1]`)
                        } else r({
                            data: f.responseText,
                            code: f.status
                        }), p && p(`Failure handler finished for request #${i} [2]`)
                };
                try {
                    p && p(`Starting request #${i}`), f.open("POST", e, !0)
                } catch (e) {
                    p && p(`Request #${i} failed`), r({
                        data: e,
                        code: -1
                    }), p && p(`Failure handler finished for request #${i} [3]`)
                }
                n && Object(b.each)(n, function(e, t) {
                    f[e] = t
                }), a || (f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), l || f.setRequestHeader("X-Requested-With", "XMLHttpRequest")), p && p(`Sending data for request #${i}`), f.send(s)
            });
            return g._getXhr = () => f, g
        }
        var C = o("+MXk"),
            S = o("4+be"),
            T = o("aong");
        class x {
            parseResponse(e) {
                var t = [];
                e instanceof Array && (t = e[1], e = e[0]);
                var o = e.replace(/^<!--/, "").replace(/-<>-(!?)>/g, "--$1>");
                Object(b.trim)(o).length || (data = [8, Object(S.getLang)("global_unknown_error")], o = stVersions.nav + "<!><!>" + vk.lang + "<!>" + stVersions.lang + "<!>8<!>" + data[1]);
                var i = o.split("<!>"),
                    n = Object(b.intval)(i.shift()),
                    r = i.shift(),
                    a = Object(b.intval)(i.shift()),
                    s = Object(b.intval)(i.shift());
                return t && (i = i.concat(t)), {
                    navVersion: n,
                    newStatic: r,
                    langId: a,
                    langVer: s,
                    code: Object(b.intval)(i.shift()),
                    payload: i
                }
            }
            parseStaticPayload(e, t) {
                for (var o = [].concat(e), i = o.length - 1; i >= 0; --i) {
                    var n = o[i];
                    if ("<!" === n.substr(0, 2)) {
                        var r = n.indexOf(">"),
                            a = n.substr(2, r - 2);
                        switch (n = n.substr(r + 1), a) {
                            case "json":
                                o[i] = Object(T.parseJSON)(n);
                                break;
                            case "int":
                                o[i] = Object(b.intval)(n);
                                break;
                            case "float":
                                o[i] = Object(b.floatval)(n);
                                break;
                            case "bool":
                                o[i] = !!Object(b.intval)(n);
                                break;
                            case "null":
                                o[i] = null;
                                break;
                            case "pageview_candidate":
                                o.pop();
                                break;
                            case "debug":
                                window.debuglogGot && window.debuglogGot(t, n), o.pop()
                        }
                    }
                }
                return o
            }
        }
        class L {
            parseResponse(e) {
                var t = this.parseStaticPayload(e);
                return {
                    navVersion: Object(b.intval)(t.loaderVersion),
                    newStatic: t.static,
                    langId: Object(b.intval)(t.langPack),
                    langVer: Object(b.intval)(t.langVersion),
                    code: Object(b.intval)(t.payload[0]),
                    payload: t.payload[1],
                    debugLog: t.debugLog
                }
            }
            parseStaticPayload(e, t) {
                var o = e;
                return e && "string" == typeof e && (o = JSON.parse(e)), o.payload && o.payload[0] > 0 && (o.payload[1] = o.payload[1].map(e => "string" == typeof e ? JSON.parse(e) : e)), o
            }
        }
        var R = 1,
            D = 2;
        class B {
            constructor(e) {
                this._switchProto(e)
            }
            parseResponse(e) {
                return this.impl instanceof x && this._isNewProto(e) && this._switchProto(D), this.impl instanceof L && this._isOldProto(e) && this._switchProto(R), this.impl.parseResponse(e)
            }
            _isNewProto(e) {
                return "object" == typeof e || "{" === e[0]
            }
            _isOldProto(e) {
                return "string" == typeof e && "{" !== e[0] && -1 !== e.substr(0, 40).indexOf("<!>") || e instanceof Array && this._isOldProto(e[0])
            }
            parseStaticPayload(e, t) {
                return this.impl.parseStaticPayload(e, t)
            }
            _switchProto(e) {
                switch (e) {
                    case R:
                        this.impl = new x;
                        break;
                    case D:
                        this.impl = new L;
                        break;
                    default:
                        Object(w.topError)("Fallback to legacy protocol.", {
                            type: 204
                        }), this.impl = new x
                }
            }
        }
        var M, I, A, N, F, q, U, V = o("98sY");

        function W() {
            return (W = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = arguments[t];
                    for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i])
                }
                return e
            }).apply(this, arguments)
        }
        class H {
            static post(e, t, o) {
                H._protoAdapter = new B(Object(p.partConfigEnabled)("web_ajax_json_object") ? D : R), "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
                var i = W({}, o || {}, {
                        _captcha: !1,
                        _box: !1,
                        no_ads_params: !1
                    }),
                    n = W({}, t, {
                        al: i.frame ? -1 : 1
                    }),
                    r = Object(b.vkNow)(),
                    a = vk.spentLastSendTS ? Math.round((r - vk.spentLastSendTS) / 1e3) : 0;
                if (vk.sampleUser >= 0 && window.cur && cur.module && a >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (n._smt = cur.module + ":" + a), vk.spentLastSendTS = r), i.progress && (i.showProgress || (i.showProgress = function() {
                        var e = Object(f.ge)(i.progress);
                        Object(f.hasClass)(e, "pr") && Object(f.setStyle)(e, "opacity", 1), Object(f.show)(e)
                    }), i.hideProgress || (i.hideProgress = function() {
                        var e = Object(f.ge)(i.progress);
                        Object(f.hasClass)(e, "pr") && Object(f.setStyle)(e, "opacity", 0), Object(f.hide)(e)
                    })), i.loader) {
                    var s = Object(f.isVisible)(window.boxLayerWrap);
                    i.showProgress = function() {
                        boxRefreshCoords(window.boxLoader), Object(f.show)(window.boxLoader), s || Object(f.show)(window.boxLayerWrap)
                    }, i.hideProgress = function() {
                        Object(f.hide)(window.boxLoader), s || Object(f.hide)(window.boxLayerWrap)
                    }
                }
                return new H(e, n, i)._post()
            }
            constructor(e, t, o) {
                this._url = e, this._options = W({}, o), this._query = t, this._additionalStaticLoader = null, this._cacheClient = null, o.local && (this.onDone = Object(b.vkLocal)(this.onDone), this.onFail = Object(b.vkLocal)(this.onFail), this.processResponse = Object(b.vkLocal)(this.processResponse)), this._options.cache && (this._cacheClient = v.getInstance(this._url, this._query)), this.onDone = this.onDone.bind(this), this.onFail = this.onFail.bind(this), this.processResponse = this.processResponse.bind(this)
            }
            _post() {
                if (!this._query.captcha_sid && this._options.showProgress && this._options.showProgress(), window.__adsGetAjaxParams && !this._options.no_ads_params && (this._query = W({}, this._query, window.__adsGetAjaxParams(this._query, this._options))), this._options.stat && (this._additionalStaticLoader = null, stManager.add(this._options.stat, () => {
                        this._additionalStaticLoader && this._additionalStaticLoader(), this._options.stat = !1
                    })), !this._cacheClient || this._cacheClient.getFromCache(this.processResponse, this._options.onDone, {
                        cacheLevel: this._options.cache,
                        forceGlobalCache: this._options.forceGlobalCache,
                        onAnswerProcessed: this._options.hideProgress
                    })) {
                    this._options.resend = (e, t) => new H(this._url, e, t)._post(), window.debuglogSent ? (this._reqid = window.debuglogSent(this._url + (this._query ? ": " + Object(u.toQueryString)(this._query, this._options.noSort).replace(/&/g, "&amp;") : "")), this._options.frame && (window._lfrid = this._reqid)) : this._reqid = 0;
                    var e = {};
                    return this._options.timeout && (e.timeout = this._options.timeout), this._options.frame ? g.FrameTransport.request(this._url, this._query, this.onDone, this._options) : j(this._url, this._query, this.onDone, this.onFail, !1, e, this._options, !1, Object(p.partConfigEnabled)("client_debug_log") ? e => console.log("+ XHR Transport: " + e) : null)
                }
            }
            processResponse(e, t) {
                if (this._options.cache && this._cacheClient && this._cacheClient.processExistingCache(e, t), this._options.stat) return this._options.stat = !1, void(this._additionalStaticLoader = this.processResponse.pbind(e, t));
                this._options.cache && !this._options.forceGlobalCache && !e && this._cacheClient && this._cacheClient.cacheResponse(t), this._options.hideProgress && this._options.hideProgress(), 2 !== e && (this._options._captcha && (this._options._suggest && Object(f.cleanElems)(this._options._suggest), this._options._captcha = z(this._options._captcha), this._options._suggest = this._options._captcha), this._options._box = z(this._options._box)),
                    function(e) {
                        switch (e) {
                            case 1:
                                return C.emailNotConfirmed;
                            case 2:
                                return C.showCaptcha;
                            case 3:
                                return C.authFailed;
                            case 4:
                                return C.makeRedirect;
                            case 5:
                                return C.reload;
                            case 6:
                                return C.mobileActivationRequired;
                            case 7:
                                return C.showMessage;
                            case 8:
                                return C.showError;
                            case 9:
                                return C.votesPayment;
                            case 10:
                                return C.zeroZone;
                            case 11:
                            case 12:
                                return Object(C.mobileValidationRequired)(e);
                            case 13:
                                return C.evalCode;
                            case 14:
                                return C.otpBox;
                            case 15:
                                return C.passwordValidationRequired;
                            default:
                                return Object(C.defaultHandler)(e)
                        }
                    }(e)(this._options, t, this._query, this._url), window.LazyLoad && window.LazyLoad.scanDelayed()
            }
            onFail(e, t) {
                this._options.hideProgress && this._options.hideProgress(), this._options._suggest && Object(f.cleanElems)(this._options._suggest);
                var o = t instanceof XMLHttpRequest ? t.status : t;
                if (this._options._box = z(this._options._captcha, this._options._box), this._options._captcha = this._options._box, this._options._suggest = this._options._captcha, "string" == typeof e && -1 !== e.indexOf("The page is temporarily unavailable") && __dev && Object(b.inArray)(vk.id, [100])) this._post();
                else if (!this._options.onFail || !0 !== this._options.onFail(e)) {
                    var i = JSON.stringify(e).substr(0, 300),
                        n = this._query.act,
                        r = this._query && Object(u.toQueryString)(this._query, this._options.noSort),
                        a = this._url,
                        s = {
                            message: "Uncaught ajax error",
                            status: o,
                            data: {
                                url: a,
                                query: r
                            }
                        },
                        d = [`url: ${a}`, n && `act: ${n}`, i && `text: ${i}`].filter(e => e).join(", ");
                    Object(V.logError)(d, {
                        environment: "uncaughtAjaxRequestError",
                        breadcrumb: s
                    }), __debugMode ? console.error("Uncaught Ajax request error:", i, s) : console.log("Uncaught Ajax request error:", i, s)
                }
            }
            doReload(e) {
                nav.reload({
                    force: !0,
                    from: e,
                    url: this._url,
                    query: this._query && Object(u.toQueryString)(this._query)
                })
            }
            onDone(e, t) {
                this._options.bench && (I = (new Date).getTime()), this._options.frame && K("OnDone Req:", e);
                var o, i = t instanceof XMLHttpRequest ? t.status : t;
                try {
                    o = H._protoAdapter.parseResponse(e)
                } catch (t) {
                    return void this.onFail(e, i)
                }
                var n, r = o,
                    a = r.navVersion,
                    s = r.newStatic,
                    d = r.langId,
                    c = r.langVer,
                    l = r.code,
                    _ = r.payload,
                    p = r.debugLog,
                    g = Object(b.clone)(_);
                (Object(b.each)(g, (e, t) => g[e] = ("string" == typeof t ? t : JSON.stringify(t)).substr(0, 100)), U = JSON.stringify(g), a) ? vk.version && vk.version !== a ? a && _.length > 4 ? this.doReload(2) : nav.strLoc ? location.replace(h.locBase) : Object(w.topError)("Server error.", {
                    type: 100
                }) : (vk.version = !1, this._options.frame && (n = _), vk.lang !== d && this._options.canReload ? this.doReload(3) : function(e, t, o, i, n) {
                    if (!window.stVersions) return void n();
                    var r = () => {
                        if (e === window.stVersions.nav) return function(e, t, o, i) {
                            var n = ["common.css"];
                            if (e) {
                                e = e.split(",");
                                for (var r = 0, a = e.length; r < a; ++r) n.push(e[r])
                            }
                            if (stVersions.lang < o)
                                for (var s in stVersions.lang = o, StaticFiles) StaticFiles.hasOwnProperty(s) && /^lang\d/i.test(s) && n.push(s);
                            stManager.add(n, i, !0)
                        }(t, 0, i, n);
                        setTimeout(r, 100)
                    };
                    e !== window.stVersions.nav && headNode.appendChild(Object(f.ce)("script", {
                        type: "text/javascript",
                        src: `/js/loader_nav${e}_${vk.lang}.js`
                    }));
                    setTimeout(r, 0)
                }(a, s, 0, c, () => {
                    if (!this._options.frame) try {
                        n = H._protoAdapter.parseStaticPayload(_, this._reqid), p && Q(p, this._reqid)
                    } catch (e) {
                        Object(w.topError)("<b>JSON Error:</b> " + e.message, {
                            type: 5,
                            answer: _,
                            url: this._url,
                            query: this._query && Object(u.toQueryString)(this._query)
                        })
                    }
                    this.processResponse(l, n)
                })): this.onFail(`<pre>${e}</pre>`, {
                    status: -1
                })
            }
        }

        function K() {
            if (Object(p.partConfigEnabled)("client_debug_log")) {
                var e;
                try {
                    throw new Error
                } catch (t) {
                    e = t.stack
                }
                var t = "+ Frame transport: " + arguments[0];
                console.groupCollapsed(t), [].slice.call(arguments, 1).forEach(e => console.log(JSON.stringify(e))), console.log(e), console.groupEnd()
            }
        }

        function Q(e, t) {
            window.debuglogGot && window.debuglogGot(t, e)
        }

        function z() {
            for (var e = 0, t = arguments.length; e < t; ++e) {
                var o = arguments[e];
                o && o.isVisible() && (o.setOptions({
                    onHide: !1,
                    onDestroy: !1
                }), o.hide())
            }
            return !1
        }
        g.FrameTransport.frame.setHandlers(e => q = e, e => F = e, K);
        var G = {
                enabled: function() {
                    try {
                        return !!new XMLHttpRequest
                    } catch (e) {
                        return !1
                    }
                }(),
                get lastResp() {
                    return U
                },
                set tStart(e) {
                    M = e
                },
                set tProcess(e) {
                    A = e
                },
                plainpost: j,
                post: H.post,
                framepost: g.FrameTransport.request,
                _getreq: function() {
                    return new XMLHttpRequest
                },
                request: P,
                preload: v.preload,
                invalidate: v.invalidate,
                tGetParam: function() {
                    if (M && F) {
                        var e = [I - M, A - I, N - A, q - M, F];
                        for (var t in e)
                            if (e.hasOwnProperty(t)) {
                                if (e[t] < 0) return !1;
                                if (!e[t] && 0 !== e[t]) return !1
                            }
                        return M = !1, e.join(",")
                    }
                },
                AjaxRequest: H,
                AjaxCancellationToken: class {
                    _setCancelCb(e) {
                        this._cancel = e
                    }
                    cancel() {
                        this._cancel && this._cancel()
                    }
                },
                frame: g.FrameTransport.frame,
                _framenext: () => g.FrameTransport.frame._nextQueueItem(),
                framegot: (e, t, o) => g.FrameTransport.frame.useAjaxBlock(e, t, o),
                _frameover: (e, t) => g.FrameTransport.frame.finalize(e, t),
                _framedone: (e, t) => g.FrameTransport.frame.onReady([e, t]),
                _debugLog: Q
            },
            $ = o("eQf/"),
            Y = o("gdug"),
            X = o("k487");

        function J(e, t) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
                var o = Object(f.ce)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(o, icoNode), icoNode = o
            }
        }
        var Z = o("HhI8"),
            ee = o("7jxN"),
            te = (o("rE2o"), o("ioFf"), o("a1Th"), o("Egk5"));

        function oe(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var o = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); i = !0);
                } catch (e) {
                    n = !0, r = e
                } finally {
                    try {
                        i || null == s.return || s.return()
                    } finally {
                        if (n) throw r
                    }
                }
                return o
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function ie(e) {
            var t, o = function(e) {
                    var t = oe(e.split("#"), 2),
                        o = t[0],
                        i = t[1],
                        n = oe(o.split("?"), 2),
                        r = n[0],
                        a = n[1];
                    return r + (a ? "?" + Object(u.toQueryString)(Object(u.fromQueryString)(a)) : "") + (i ? "#" + i : "")
                },
                i = Object(b.extend)({
                    onLocChange: () => {}
                }, e),
                n = function() {
                    var e = "";
                    return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), o(e.replace(/^(\/|!)/, ""))
                },
                r = n(),
                a = function(e) {
                    var t = n();
                    t === r && !0 !== e || (i.onLocChange(t), r = t)
                };
            return {
                setLoc: function(e) {
                    r = o(e);
                    var t = (location.toString().match(/#(.*)/) || {})[1] || "";
                    if (!t && vk.al > 1 && (t = (location.pathname || "") + (location.search || "")), (t = (t = o(t)).replace(/^(\/|!)/, "")) !== r) {
                        if (3 == vk.al) try {
                            return window.saveScrollTopOnBack && (delete window.saveScrollTopOnBack, history.replaceState({
                                scrollTop: window.lastScrollTop,
                                preventScroll: window.preventLocationScroll
                            }, "", `/${t}`), window.preventLocationScroll && delete window.preventLocationScroll), void history.pushState({}, "", `/${r}`)
                        } catch (e) {}
                        window.chHashFlag = !0, location.hash = "#" + vk.navPrefix + r
                    }
                },
                getLoc: n,
                init: function() {
                    1 == vk.al && a(!0), 3 == vk.al ? (Object(te.addEvent)(window, "popstate", a), Y.browser.safari && Object(te.addEvent)(window, "hashchange", a)) : "onhashchange" in window ? Object(te.addEvent)(window, "hashchange", function() {
                        window.chHashFlag ? window.chHashFlag = !1 : a()
                    }) : t = setInterval(a, 200)
                },
                setOptions: function(e) {
                    i = Object(b.extend)(i, e)
                },
                checker: a,
                stop: function() {
                    vk.al < 3 ? clearInterval(t) : 3 == vk.al && Object(te.removeEvent)(window, "popstate", a)
                }
            }
        }
        var ne = o("lXE5"),
            re = o("Ia1d"),
            ae = o("XuKo"),
            se = o("ErRf"),
            de = o("/PiP"),
            ce = {
                sh: function(e, t) {
                    Object(f.show)(e), Object(b.isFunction)(t) && t()
                },
                hd: function(e, t) {
                    Object(f.hide)(e), Object(b.isFunction)(t) && t()
                },
                visible: !1,
                _show: function(e, t, o, i) {
                    var n = "layers" + (boxQueue.count() + 1);
                    Object(se.cancelStackPush)(n, function() {}), Object(f.setStyle)(e, {
                        opacity: o || "",
                        backgroundColor: i || ""
                    }), ce.visible || (Object(Z.toggleFlash)(), Object(ne.disableBodyScroll)()), ce.visible || Object(re.pauseLastInlineVideo)(), ce.visible = !0, Object(f.addClass)(bodyNode, "layers_shown"), t.visibilityHide ? Object(f.removeClass)(t, "box_layer_hidden") : Object(f.show)(t), ce.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    ce.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(se.cancelStackFilter)(e), t && t.visibilityHide ? Object(f.addClass)(t, "box_layer_hidden") : Object(f.hide)(t), Object(f.isVisible)(layerWrap) || cur._inLayer || Object(f.isVisible)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(f.isVisible)(window.mvLayerWrap)) || Object(f.isVisible)(window.wkLayerWrap) || (ce.visible = !1, Object(f.removeClass)(bodyNode, "layers_shown"), Object(Z.toggleFlash)(!0), Object(ne.enableBodyScroll)()), window.updateWndVScroll && updateWndVScroll()
                    }), ce.visible || Object(re.playLastInlineVideo)()
                }
            },
            le = {
                push: function(e) {
                    var t, o = !!le.count() && le._layers[le._layers.length - 1];
                    if (cur.pvShown && "temp" != cur.pvListId) t = ["photo", cur.pvData[cur.pvListId][cur.pvIndex].id, cur.pvListId, {
                        onHide: cur.pvOptions.onHide,
                        scroll: cur.pvNarrowScrollbar ? cur.pvNarrowScrollbar.data.scrollTop : 0,
                        onShow: e,
                        noHistory: !!cur.pvNoHistory,
                        histLen: cur.pvHistoryLength
                    }];
                    else if (window.mvcur && mvcur.mvShown && !mvcur.minimized) {
                        var i = mvcur.options && (mvcur.options.autoplay || mvcur.options.focusPlay),
                            n = {
                                scroll: mvLayerWrap.scrollTop,
                                noHistory: !!mvcur.noHistory,
                                nomin: 1,
                                autoplay: i,
                                prevLoc: mvcur.mvPrevLoc
                            };
                        VideoPlaylist.getCurListId() && (n = Object(b.extend)(n, {
                            playlistId: VideoPlaylist.getCurListId(),
                            module: Videoview.getVideoModule(),
                            addParams: {
                                force_no_repeat: 1,
                                show_next: 1
                            }
                        })), t = ["video", mvcur.videoRaw, mvcur.listId, n]
                    } else if (window.wkcur && wkcur.shown) t = ["wiki", wkcur.wkRaw, !1, {
                        toScroll: wkLayerWrap.scrollTop,
                        prevLoc: wkcur.prevLoc,
                        myLoc: wkcur.myLoc,
                        onHide: wkcur.onHide
                    }];
                    else if (cur.storyLayer) t = ["stories", cur.storyLayer.getList()];
                    else {
                        if (!cur.podcastEpisode || !cur.podcastEpisode.shown) return !1;
                        t = ["podcast", cur.podcastEpisode.getEpisodeId()]
                    }
                    return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || le._layers.push(t), le.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = le._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    le._bl = !0, window.WkView && ce.fullhide == WkView.hide ? (Object(f.hide)(wkLayerWrap), clearTimeout(wkcur.showT)) : ce.fullhide && ce.fullhide(!0, !0), setTimeout(le.unblock, 5)
                },
                unblock: function() {
                    le._bl = !1
                },
                pop: function() {
                    if (le.count() && !le._bl) {
                        var e = le._layers.pop();
                        if (le.skipVideo && (le.skipVideo = !1, "video" == e[0])) return le._layers.push(e), void(le.skipVideo = !1);
                        "photo" === e[0] ? (Object(b.extend)(e[3], {
                            fromQueue: !0
                        }), Object(de.showPhoto)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(b.extend)(e[3], {
                            fromQueue: !0
                        }), Object(re.showVideo)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(de.showWiki)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(ae.showStory)(e[1]) : "podcast" === e[0] && Object(de.showPodcast)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, o, i) {
                    for (var n = le._layers, r = n.length; r > 0; --r)
                        if (n[r - 1][0] == e && n[r - 1][1] == t || n[r - 1][0] == o && n[r - 1][1] == i) return le._layers = n.slice(0, r), le.pop(), !0;
                    return !1
                },
                count: function() {
                    return le._layers.length
                },
                clear: function() {
                    le._layers = []
                },
                _layers: []
            };
        var we = o("Xrg9");

        function _e() {
            var e = {};
            Object(b.each)(Object(f.geByClass)("_short_currency"), function() {
                var t = Object(f.domData)(this, "short") || "";
                if (!t) return !0;
                var o = this.innerHTML,
                    i = Object(b.winToUtf)(o).length,
                    n = Object(f.getStyle)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[n]) {
                    for (var r = "", a = i - 1; a >= 0; a--) r += "&#8399;";
                    var s = Object(f.ce)("div", {
                        innerHTML: `<b>${o}</b><b>${r}</b>`
                    }, {
                        fontFamily: n,
                        fontSize: "24px"
                    });
                    Object(f.ge)("utils").appendChild(s), e[n] = Math.abs(s.firstChild.offsetWidth - s.lastChild.offsetWidth) >= 2 * i, Object(f.re)(s)
                }!1 === e[n] && Object(f.val)(this, t)
            })
        }
        var ue = o("0gG3"),
            he = o("XzvV"),
            pe = o("v+DW"),
            be = o("lkNA");
        var fe = class {
                constructor() {
                    var e = window.CallHub;
                    this.on = 0, this.hub = new e(() => {
                        this.onShow && this.onShow()
                    }, 2), this.hintsHub = new e(() => this.showStartHints(), 2)
                }
                load() {
                    Object(f.ge)("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", () => this.hub.done()), ajax.post("hints.php", {
                        act: "a_start_hints"
                    }, {
                        onDone: e => {
                            this.startHintsText = Object(b.trim)(e), this.hintsHub.done()
                        }
                    }))
                }
                show(e) {
                    var t = window.placeholderSetup;
                    if (Object(f.ge)("quick_search") && !this.on) return this.on = 1, Object(f.show)(this.sCont), t("search_input"), Object(f.ge)("search_input").setAttribute("autocomplete", "off"), Object(f.addClass)(Object(f.ge)("qsearch_link"), "active"), this.prev_content = Object(f.ge)("content"), this.qsearch_cont || (this.qsearch_cont = Object(f.ce)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(te.cancelEvent)(e) : void 0
                }
                go(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(b.trim)(Object(f.ge)("search_input").value) + "&name=1";
                    return Object(te.cancelEvent)(e || window.event), location.href = t, !1
                }
                init(e) {
                    this.sCont = Object(f.ge)("quick_search"), this.opt = e || {}
                }
                hide(e, t) {
                    if (Object(f.ge)("quick_search") && (!this.active || t) && this.on) {
                        var o = window.toggleFlash;
                        if (this.on = 0, o(), this.beforeHide && this.beforeHide()) return !0;
                        Object(f.ge)("search_input").setValue ? Object(f.ge)("search_input").setValue("") : Object(f.ge)("search_input").value = "", Object(f.hide)(this.sCont), Object(f.removeClass)(Object(f.ge)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }
                preload() {}
            },
            ge = o("Bszp"),
            me = o("MSYF"),
            ve = o("kHqu");

        function Oe(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var o = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); i = !0);
                } catch (e) {
                    n = !0, r = e
                } finally {
                    try {
                        i || null == s.return || s.return()
                    } finally {
                        if (n) throw r
                    }
                }
                return o
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var ye = "remixjsp";

        function Ee() {
            var e;
            (e = window.performance) && e.getEntriesByType && e.getEntriesByType("paint").forEach(e => {
                    "first-contentful-paint" === e.name && Se(e.startTime, "TTFCP")
                }),
                function() {
                    var e = window.performance;
                    e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(e => {
                        if ("navigation" === e.initiatorType) {
                            var t = e.domComplete,
                                o = e.domContentLoadedEventEnd,
                                i = e.loadEventEnd;
                            Se(t, "domComplete"), Se(o, "domContentLoadedEventEnd"), Se(i, "loadEventEnd")
                        }
                    })
                }(), Pe()
        }
        var ke = [],
            je = !1;

        function Pe() {
            if (je) {
                var e = window.performance,
                    t = ke[ke.length - 1];
                if (!t) return je = !1, void Se(-1);
                var o = t.startTime + t.duration;
                e.now() - o >= 3e3 ? Se(o, "TTI") : setTimeout(Pe, 3e3)
            }
        }
        var Ce = [];

        function Se(e, t) {
            var o = Math.floor(e);
            if (-1 !== e && (Ce.push([o, t]), !(je ? "TTI" === t : Ce.length > 2))) return;
            var i = "unknown",
                n = navigator.connection;
            n && n.effectiveType && (i = n.effectiveType);
            var r = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            Ce.forEach(e => {
                var t = Oe(e, 2),
                    o = t[0],
                    n = t[1];
                return r.events.push([n, o, cur.module, i, window.vk.rv])
            }), Object(_.setCookie)(ye, JSON.stringify(r), .01)
        }

        function Te() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(e => {
                ke = ke.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), je = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout(Ee, 0)
            }) : Ee()
        }
        var xe = {
                GROUPS_ADMIN_LEVEL_USER: 0,
                GROUPS_ADMIN_LEVEL_MODERATOR: 1,
                GROUPS_ADMIN_LEVEL_EDITOR: 2,
                GROUPS_ADMIN_LEVEL_ADMINISTRATOR: 3,
                GROUPS_ADMIN_LEVEL_HOST: 4,
                GROUPS_ADMIN_LEVEL_EVENT_CREATOR: 5,
                GROUPS_ADMIN_LEVEL_CREATOR: 6,
                GROUPS_ADMIN_PSEUDO_LEVEL_ADVERTISER: 100,
                GROUPS_ADMIN_FLAG_ADS: 8
            },
            Le = o("1BRX"),
            Re = o("El3O"),
            De = o("EasH"),
            Be = o("kcIO"),
            Me = o("MiCK"),
            Ie = o("Ieup"),
            Ae = o("FWc3"),
            Ne = o("t/FQ"),
            Fe = .5,
            qe = .25,
            Ue = 300,
            Ve = 1e3,
            We = 3e5,
            He = 2500,
            Ke = 5e3,
            Qe = 6e3,
            ze = 2e4,
            Ge = 1e3,
            $e = 36e4,
            Ye = "_longViewType",
            Xe = "_longViewIdled",
            Je = "_longViewModule",
            Ze = "_longViewStarted",
            et = "_longViewProcessed",
            tt = "_longViewCached",
            ot = "_longViewHeight",
            it = "_longViewTop",
            nt = "_longViewBottom",
            rt = "REGULAR",
            at = "AUTOPLAY_AD",
            st = "LongView.viewed",
            dt = "LongView.idled",
            ct = vk.longViewTestGroup,
            lt = [],
            wt = [],
            _t = [],
            ut = Date.now(),
            ht = 0,
            pt = 0,
            bt = !1,
            ft = null,
            gt = null,
            mt = null,
            vt = null,
            Ot = {};

        function yt() {
            var e = Ut();
            e.length && (At(e), Vt())
        }

        function Et() {
            lt.forEach(function(e) {
                e[tt] = !1
            })
        }

        function kt(e, t) {
            "im" === t && !e[Ye] && function(e) {
                if (Object(f.hasClass)(e, "im-mess--post")) return !0;
                var t = e && Object(f.domFC)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(f.hasClass)(e, "no_posts"))
            }(e) && (e[Ye] = function(e) {
                var t = e && Object(f.domFC)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? at : rt
            }(e), e[Je] = t, lt.push(e))
        }

        function jt(e, t) {
            var o = jt;
            ! function(e, t) {
                var o = [];
                lt.forEach(function(i) {
                    Gt(i) ? o.push(i) : ! function(e, t, o) {
                        return !e[Ze] && Ht(e, Fe, t, o)
                    }(i, e, t) ? function(e, t, o) {
                        return e[Ze] && !Ht(e, qe, t, o)
                    }(i, e, t) && (i[Xe] ? delete i[Xe] : ($t(wt, i), _t = _t.concat(zt(i))), delete i[Ze]) : (i[Ze] = Date.now(), wt.push(i))
                }), o.forEach(function(e) {
                    $t(lt, e)
                })
            }(e || Object(ne.scrollGetY)(), t || window.innerHeight), bt ? (clearTimeout(o.timer), o.timer = setTimeout(Pt, 150)) : (bt = !0, Lt(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(f.geByClass1)("im-page--chat-header"),
                        t = Object(f.geByClass1)("im-page--chat-input");
                    ht = e.getBoundingClientRect().top + e.offsetHeight, pt = window.innerHeight - t.getBoundingClientRect().top
                } else ht = Object(f.ge)("page_header").offsetHeight, pt = 0
            }())
        }

        function Pt() {
            Lt(), xt(), bt = !1
        }

        function Ct() {
            Lt(), It()
        }

        function St() {
            _t = [], wt.forEach(e => e[Ze] = Date.now()), Nt(null), Ft(null), xt()
        }

        function Tt() {
            Lt(), It(), _t = [], wt = [], Nt(null), Ft(null)
        }

        function xt() {
            ft = setTimeout(Rt, He), gt = setTimeout(Dt, Ke), mt = setTimeout(Bt, Qe), vt = setTimeout(Mt, ze)
        }

        function Lt() {
            clearTimeout(ft), clearTimeout(gt), clearTimeout(mt), clearTimeout(vt)
        }

        function Rt() {
            _t.length && Nt(_t)
        }

        function Dt() {
            At(_t), _t = [], Nt(null)
        }

        function Bt() {
            wt.length && (Ft(Qt(wt, !0, !0)), mt = setTimeout(Bt, Ge))
        }

        function Mt() {
            clearTimeout(mt), At(Qt(wt)), wt.forEach(e => e[Xe] = !0), wt = [], Ft(null)
        }

        function It() {
            At(_t.concat(Qt(wt)))
        }

        function At(e) {
            e && e.length && ajax.post("/al_page.php", {
                act: "seen",
                data: Kt(e),
                long_view: 1
            })
        }

        function Nt(e) {
            qt(st, e)
        }

        function Ft(e) {
            qt(dt, e)
        }

        function qt(e, t) {
            var o = we.default.get(e) || {};
            t ? o[ut] = t : delete o[ut], we.default.set(e, o)
        }

        function Ut() {
            var e = Ut,
                t = [],
                o = we.default.get(st) || {},
                i = we.default.get(dt) || {};
            return e.iterator || (e.iterator = e => o => {
                Wt(o) && (t = t.concat(e[o]))
            }), Object.keys(o).forEach(e.iterator(o)), Object.keys(i).forEach(e.iterator(i)), t
        }

        function Vt() {
            var e = Vt,
                t = we.default.get(st) || {},
                o = we.default.get(dt) || {};
            e.iterator || (e.iterator = e => t => {
                Wt(t) && delete e[t]
            }), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), we.default.set(st, t), we.default.set(dt, o)
        }

        function Wt(e) {
            var t = Number(e);
            return t !== ut && Date.now() - t >= $e
        }

        function Ht(e, t, o, i) {
            if (!e) return !1;
            e[tt] || (e[tt] = !0, e[ot] = e.offsetHeight, e[it] = o + e.getBoundingClientRect().top, e[nt] = e[it] + e[ot]);
            var n = i - ht - pt,
                r = o + ht,
                a = o + i - pt,
                s = e[ot],
                d = e[it],
                c = e[nt];
            return (c > r && d < a ? Math.min(a, c) - Math.max(r, d) : 0) >= Math.min(n * t, s * t)
        }

        function Kt(e) {
            var t = {};
            e.forEach(function(e) {
                var o = e.ownerId,
                    i = "ad" === o ? "" : ":" + e.duration + ":" + e.index;
                t[o] || (t[o] = []), t[o].push(e.module + e.postId + i + (e.sessionId ? ":" + e.sessionId : "") + (e.q ? ":" + e.q : "") + ":" + e.viewIndex)
            });
            var o = [];
            return Object(b.each)(t, (e, t) => o.push(e + "_" + t.join(","))), o.join(";")
        }

        function Qt(e, t, o) {
            return e.map(e => zt(e, t, o))
        }

        function zt(e, t, o) {
            if (Gt(e)) return [];
            var i = Math.min(We, Date.now() - e[Ze]);
            if (e[Ye] === rt && i < Ue || e[Ye] === at && i < Ve) return [];
            o || (e[et] = !0);
            var n, r = function(e) {
                    var t = e[Je];
                    if ("im" === t) {
                        var o = Object(f.attr)(e, "data-post-id"),
                            i = Object(f.attr)(e, "data-copy"),
                            n = {
                                index: -1,
                                module: "im"
                            };
                        return o && (n[o] = -1), i && (n[i] = -1), n
                    }
                    try {
                        return window[t].postsGetRaws(e)
                    } catch (t) {
                        return console.error("Unable to extract data from elem", e), []
                    }
                }(e),
                a = {
                    feed: "f",
                    public: "c",
                    groups: "c",
                    profile: "p",
                    im: "m",
                    feed_search: "s",
                    feed_news_recent: "r",
                    feed_news: "r",
                    feed_news_top: "t",
                    feed_recommended: "d",
                    feed_recommended_recent: "d",
                    feed_recommended_top: "e",
                    feed_photos: "h",
                    feed_videos: "v",
                    feed_friends: "n",
                    feed_likes: "k",
                    feed_list: "z",
                    feed_other: "o"
                }["feed_other" === (n = r.module) ? `feed_${cur.section}` : n] || "u",
                s = cur.feed_session_id || "na",
                d = [];
            for (var c in r)
                if ("index" !== c && "module" !== c && "q" !== c) {
                    var l = c.split("_"),
                        w = l[0],
                        _ = l[1];
                    "ads" === w && (_ = l[3]), /^post\d+$/.test(w) && (w = l[1], _ = l[2]);
                    var u = void 0;
                    t || (Ot[u = w + "_" + _] || (Ot[u] = 0), Ot[u]++), d.push("ad" === w ? {
                        ownerId: "ad",
                        postId: _,
                        module: a,
                        viewIndex: Ot[u]
                    } : "ads" === w ? {
                        ownerId: "ads",
                        postId: _,
                        module: a,
                        index: r.index,
                        duration: i,
                        sessionId: s,
                        viewIndex: Ot[u]
                    } : {
                        ownerId: w,
                        postId: (1 === r[c] ? "" : "-") + _,
                        module: a,
                        index: r.index,
                        duration: i,
                        sessionId: s,
                        q: r.q || null,
                        viewIndex: Ot[u]
                    })
                }
            return d
        }

        function Gt(e) {
            return "page_view" === ct && e[et] || !document.body.contains(e)
        }

        function $t(e, t) {
            var o = e.indexOf(t);
            o >= 0 && e.splice(o, 1)
        }
        var Yt = o("QGEU"),
            Xt = o("eNQP"),
            Jt = o("o7bv"),
            Zt = o("wetz"),
            eo = o("BJj/"),
            to = o("i6oL"),
            oo = o("m0N1");
        o("/8Fb");

        function io(e) {
            for (var t = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), o = window.atob(t), i = new Uint8Array(o.length), n = 0; n < o.length; ++n) i[n] = o.charCodeAt(n);
            return i
        }
        var no = o("W0P9"),
            ro = 5e3,
            ao = "push_notifier_endpoint",
            so = "push_notifier_subscribed_ts",
            co = 6e4,
            lo = 432e6;
        class wo {
            constructor(e, t) {
                this.sw = e, this.SWClient = t, vk.id && this.canBeEnabled().then(e => {
                    e && (this.listenPermission(), this.loadEndpoint() && this.update().then(this.checkMessageState.bind(this)))
                })
            }
            static getPermission() {
                return Notification.permission
            }
            cleanNotification() {
                this.sw.action("cleanNotification")
            }
            canBeEnabled() {
                return Promise.resolve(this.isSupported())
            }
            isSupported() {
                return "PushManager" in window && "Notification" in window && this.SWClient.isSupported()
            }
            loadEndpoint() {
                return we.default.get(ao + vk.id) || !1
            }
            saveEndpoint(e) {
                we.default.set(ao + vk.id, e || !1)
            }
            action(e, t) {
                return this.sw.action(e, t)
            }
            _needupdate(e) {
                var t = Date.now(),
                    o = this.loadEndpoint(),
                    i = we.default.get(so + vk.id),
                    n = !1;
                return (o !== e.endpoint || !i || t - i > co) && (we.default.set(so + vk.id, t), n = !0), n
            }
            listenPermission() {
                Object(p.partConfigEnabled)("push_notifier") && navigator.permissions && navigator.permissions.query && navigator.permissions.query({
                    name: "notifications"
                }).then(e => {
                    e.onchange = () => this.update()
                })
            }
            update() {
                return this.updatePermission().then(e => e === wo.PUSH_NOTIFIER_PERMISSION_GRANTED ? this.subscribe().catch(e => {
                    e !== wo.SUBSCRIBE_ERROR_NETWORK && e("can not update subscribe")
                }) : Promise.reject("premession_not_granted")).catch(no.error)
            }
            updatePermission() {
                var e = wo.getPermission();
                if (e !== wo.PUSH_NOTIFIER_PERMISSION_GRANTED) {
                    var t = this.loadEndpoint();
                    if (t) return this.unsubscribe(t).then(() => e)
                }
                return Promise.resolve(e)
            }
            processSubscribe(e) {
                return e.subscribe({
                    userVisibleOnly: !0,
                    applicationServerKey: io(wo.SERVER_KEY)
                })
            }
            setupSubscription() {
                return new Promise((e, t) => {
                    var o = wo.getPermission(),
                        i = () => {
                            this.subscribe(!0).then(() => {
                                e()
                            }).catch(() => {
                                t()
                            })
                        };
                    o !== wo.PUSH_NOTIFIER_PERMISSION_DENIED ? o !== wo.PUSH_NOTIFIER_PERMISSION_GRANTED ? o === wo.PUSH_NOTIFIER_PERMISSION_DEFAULT && this.requestPermission().then(e => {
                        e === wo.PUSH_NOTIFIER_PERMISSION_GRANTED ? i() : t()
                    }) : i() : t(wo.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS)
                })
            }
            subscribe(e) {
                return this.sw.register().then(e => {
                    var t = e.pushManager;
                    return t.getSubscription().then(e => {
                        if (e) {
                            var o = e.expirationTime;
                            return o && Date.now() > o - lo ? this.unsubscribe(this.loadEndpoint()).then(() => this.processSubscribe(t)) : e
                        }
                        return this.processSubscribe(t)
                    })
                }).then(t => new Promise((o, i) => {
                    if (e || this._needupdate(t)) {
                        var n = t.getKey("p256dh"),
                            r = t.getKey("auth");
                        window.ajax.post(wo.SERVER_URL, {
                            act: "a_subscribe",
                            endpoint: t.endpoint,
                            key: n ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("p256dh")))) : null,
                            token: r ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("auth")))) : null
                        }, {
                            onDone: e => {
                                e ? (this.saveEndpoint(t.endpoint), o()) : i()
                            },
                            onFail: () => (i(wo.SUBSCRIBE_ERROR_NETWORK), !0)
                        })
                    } else o()
                }))
            }
            unsubscribe(e) {
                return this.sw.register().then(t => t.pushManager.getSubscription().then(t => t ? t.unsubscribe().then(t => t ? new Promise((t, o) => {
                    ajax.post(wo.SERVER_URL, {
                        act: "a_unsubscribe",
                        endpoint: e
                    }, {
                        onDone: e => {
                            e ? (this.saveEndpoint(!1), t()) : o()
                        }
                    })
                }) : Promise.reject("ERROR: can not unsubscribe")) : (this.saveEndpoint(!1), Promise.reject("ERROR: no subscription"))))
            }
            requestPermission() {
                var e = wo.getPermission();
                return e === wo.PUSH_NOTIFIER_PERMISSION_DEFAULT ? new Promise(function(e, t) {
                    var o = Notification.requestPermission(function(t) {
                        e(t)
                    });
                    o instanceof Promise && o.then(e, t)
                }) : Promise.resolve(e)
            }
            checkMessageState() {
                return new Promise(e => setTimeout(e, ro)).then(() => this.action("getMessagesMetaData")).then(e => "object" == typeof e && Object.keys(e).length ? new Promise((t, o) => {
                    window.ajax.post(wo.SERVER_URL, {
                        act: "a_update_messages_state",
                        data: Object.entries(e)
                    }, {
                        onDone: e => {
                            e ? t(e) : o("ERROR: act error")
                        },
                        onFail: () => (o("ERROR: network error"), !0)
                    })
                }) : Promise.resolve({})).then(e => {
                    try {
                        return JSON.parse(e)
                    } catch (e) {
                        return {}
                    }
                }).then(e => this.action("updateMessageNotifications", e)).catch(e => Object(no.error)(e))
            }
        }
        wo.SERVER_KEY = "BPrntRk2W1_ISFwlgY-vz9tQDg9i1oSQ3-N8xyjdbNAbIOdZIGFdh5FlO7zn730UwU9Sayoec-Fpqq4JZFTyv60", wo.SERVER_URL = "push_notifier", wo.PUSH_NOTIFIER_PERMISSION_GRANTED = "granted", wo.PUSH_NOTIFIER_PERMISSION_DEFAULT = "default", wo.PUSH_NOTIFIER_PERMISSION_DENIED = "denied", wo.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS = "BLOCKED_BY_BROWSER_SETTINGS", wo.SUBSCRIBE_ERROR_NETWORK = "SUBSCRIBE_ERROR_NETWORK";
        var _o = wo;
        var uo = class extends _o {
                constructor(e, t) {
                    super(e, t), this.canBeEnabled().then(e => {
                        e && (addClass(document.head, "push_notifier_supported"), this.handlerMessagesLP = this.handlerMessagesLP.bind(this))
                    })
                }
                isSupported() {
                    return super.isSupported() && (browser.chrome || browser.mozilla)
                }
                handlerMessagesLP() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.type,
                        o = e.peerId,
                        i = e.upToId;
                    "event_read_inbound" === t && this.sw.action("removeMessageNotification", {
                        peerId: o,
                        msgId: i
                    })
                }
                handlerPopup(e, t) {
                    var o = Object(Be.curBox)();
                    o && Object(f.hide)(o.bodyNode), this.setupSubscription().then(() => this.setState(e, t)).then(() => {
                        o && o.hide(), e ? Object(he.statlogsValueEvent)("push_notifier_subscribe_via_popup", "msg") : Object(he.statlogsValueEvent)("push_notifier_subscribe_via_popup", "all")
                    }).catch(e => {
                        _o.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === e ? (Object(f.show)(o().bodyNode), this.showPopupAllowNotification()) : Object(De.showFastBox)(getLang("global_error"), getLang("notifications_native_common_error"))
                    })
                }
                closePopup() {
                    var e = Object(Be.curBox)();
                    e && e.hide(), Object(he.statlogsValueEvent)("push_notifier_subscribe_via_popup", "close")
                }
                showPopupAllowNotification() {
                    var e = Object(De.showBox)(_o.SERVER_URL, {
                        act: "popup_allow_notification"
                    }, {
                        params: {
                            hideButtons: !0
                        },
                        containerClass: "PushNotifierPopup__popup-box_type--allow-notification",
                        onFail: () => {
                            e ? e.hide() : Object(De.showFastBox)(getLang("global_error"), getLang("notifications_native_common_error"))
                        }
                    })
                }
                _removeLongPollListener() {
                    this.lp && this.lp.offData(this.handlerMessagesLP), this.lp = null
                }
                _addLongPollListener() {
                    !this.lp && window.Notifier && (this.lp = Notifier.getLpInstance(), this.lp && this.lp.onData(this.handlerMessagesLP))
                }
                setState(e, t) {
                    return new Promise((o, i) => {
                        ajax.post(_o.SERVER_URL, {
                            act: "a_toggle_state",
                            state: e,
                            hash: t
                        }, {
                            onDone: e => e ? o() : i(),
                            onFail: i
                        })
                    })
                }
                update() {
                    return super.update().then(() => this._addLongPollListener())
                }
                unsubscribe(e) {
                    return super.unsubscribe(e).then(() => this._removeLongPollListener())
                }
            },
            ho = "sw";

        function po(e) {
            return {
                type: ho,
                data: e
            }
        }

        function bo(e) {
            return ("" === e.origin || e.origin.match(/^https:\/\/([a-zA-Z0-9\-\.]+\.)?vk\.com$/)) && e.data && e.data.data && e.data.type === ho
        }

        function fo(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var o = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); i = !0);
                } catch (e) {
                    n = !0, r = e
                } finally {
                    try {
                        i || null == s.return || s.return()
                    } finally {
                        if (n) throw r
                    }
                }
                return o
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var go = "/js/cmodules/sw/sw.js",
            mo = "/";
        class vo {
            constructor() {
                this.registration = null, this._handlers = []
            }
            static addVersion(e) {
                return vk && vk.sw_version ? e + "?v=" + vk.sw_version : e
            }
            static isSupported() {
                return "serviceWorker" in navigator
            }
            register() {
                return vo.isSupported() ? this.registration ? Promise.resolve(this.registration) : navigator.serviceWorker.register(vo.addVersion(go), {
                    scope: mo
                }).then(this._onactive.bind(this)).then(e => (this.registration || (this.registration = e, this._addEventListener(navigator.serviceWorker, "message", this._onmessage.bind(this), !1)), e)) : Promise.reject("serviceWorker is unavailable")
            }
            unregister() {
                this.registration && this.registration.unregister(), this._handlers.forEach(e => e[0].removeEventListener(e[1], e[2])), this._handlers = []
            }
            update() {
                this.registration && this.registration.update()
            }
            _addEventListener(e, t, o) {
                var i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                    n = !1;
                this._handlers.forEach(function(i) {
                    i[0] === e && i[1] === t && i[2] === o && (n = !0)
                }), n && !i || (this._handlers.push([e, t, o]), e.addEventListener(t, o))
            }
            _onactive(e) {
                return e.active ? Promise.resolve(e) : new Promise(t => {
                    this._addEventListener(e.installing, "statechange", o => {
                        "activated" === o.currentTarget.state && t(e)
                    })
                })
            }
            action_devicePixelRatio() {
                return window.devicePixelRatio
            }
            action(e, t) {
                var o = Array.isArray(e) ? e : [
                    [e, t]
                ];
                return this._message({
                    actions: o
                }).then(e => e.answers ? Promise.resolve(1 === o.length ? e.answers[0] : e.answers) : Promise.reject(new Error("ServiceWorker answer is incorrect")))
            }
            _message(e) {
                return this.register().then(() => new Promise((t, o) => {
                    var i = new MessageChannel;
                    i.port1.onmessage = function(e) {
                        bo(e) ? t(e.data.data) : o(new Error("ServiceWorker message is incorrect"))
                    }, this.registration.active.postMessage(po(e), [i.port2])
                }))
            }
            _onmessage(e) {
                if (bo(e)) {
                    var t = e.data.data;
                    if (t.actions && Array.isArray(t.actions)) {
                        var o = [];
                        t.actions.forEach(t => {
                            var i = fo(t, 2),
                                n = i[0],
                                r = i[1],
                                a = "action_" + n;
                            o.push(Promise.resolve(this[a] ? this[a](r, e) : void 0))
                        }), Promise.all(o).then(function(t) {
                            var o = {};
                            t.forEach((e, t) => {
                                void 0 !== e && (o[t] = e)
                            }), Object.keys(o).length && e.ports[0].postMessage(po({
                                answers: o
                            }))
                        })
                    }
                }
            }
        }
        var Oo = window.isMVK ? "mvk" : "web",
            yo = {
                start: function(e, t) {
                    if (t.stopPropagation(), t.preventDefault(), this.id = window.domData(e, "id"), this.id && (window.statlogsValueEvent("special_event", "click", Oo, this.id), !this.timeoutHandle)) {
                        var o = Number(window.domData(e, "v")) || 0;
                        this.duration || (this.duration = Number(window.domData(e, "duration")) || 0), this.duration && (!this.animationData || !this.animationData.v || "number" == typeof this.v && this.v !== o ? (this.v = o, this._getAnimation().then(e => (this.animationData = JSON.parse(e), this._loadBodymovin())).then(() => this._play())) : this._play())
                    }
                },
                _getAnimation: function() {
                    return new Promise(e => {
                        var t = new XMLHttpRequest;
                        t.open("GET", `/images/stickers/special/${this.id}/animation.json?v=${this.v}`, !0), t.send(), t.onreadystatechange = () => {
                            4 === t.readyState && e(t.responseText)
                        }
                    })
                },
                _play: function() {
                    if (window.bodymovin) {
                        this.frame || (this.frame = document.createElement("div"), this.frame.className = "special_event_frame", document.body.appendChild(this.frame)), this.frame.style.display = "block";
                        var e = window.bodymovin.loadAnimation({
                            container: this.frame,
                            renderer: "svg",
                            loop: !0,
                            autoplay: !0,
                            animationData: this.animationData
                        });
                        this.timeoutHandle = setTimeout(() => {
                            e.stop(), e.destroy(), this.frame.style.display = "none", this.timeoutHandle = null, window.statlogsValueEvent("special_event", "showed", Oo, this.id)
                        }, this.duration)
                    }
                },
                _loadBodymovin: function() {
                    return new Promise(e => {
                        if (window.bodymovin) e();
                        else if (window.isMVK) {
                            var t = document.createElement("script");
                            t.src = "/js/cmodules/mobile/bodymovin.js", t.onload = () => e(), document.head.appendChild(t)
                        } else stManager.add([jsc("web/bodymovin.js")], e)
                    })
                }
            },
            Eo = o("B3ia");
        o.d(t, "initAjax", function() {
            return jo
        });
        var ko = window.vk;

        function jo() {
            window.ajaxCache = {}, window.globalAjaxCache = {}, window.ajax = G, Object(p.partConfigEnabled)("web_ajax_json_object") && (window.ajax.enabled || Y.browser.search_bot || location.replace("/badbrowser.php"))
        }

        function Po() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, ko.width = 960, ko.started = Object(b.vkNow)(), ko.counts = {}, Y.browser.android && (Object(_.setCookie)("remixscreen_width", window.screen.width, 365), Object(_.setCookie)("remixscreen_height", window.screen.height, 365), Object(_.setCookie)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(_.setCookie)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(_.setCookie)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(ve.initNavCounters)(), Object(ue.fillStaticFilesData)(), Object(te.addEvent)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(te.removeEvent)(vkCache[e].handle.elem)
            }), Object(te.addEvent)(window, "DOMContentLoaded load", function() {
                ko.loaded || (ko.loaded = !0, Object(pe.updSideTopLink)()), Object(Re.checkPageBlocks)()
            }), Object(te.addEvent)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(te.addEvent)(document, "keydown", Zt.handleGlobalEsc)
        }
        var Co = 0;

        function So() {
            if (window.headNode = Object(f.geByTag1)("head"), window.icoNode = Object(f.geByTag1)("link", headNode), window.bodyNode = Object(f.geByTag1)("body"), window.htmlNode = Object(f.geByTag1)("html"), window.utilsNode = Object(f.ge)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(te.addEvent)(bodyNode, "resize", Re.onBodyResize.pbind(!1)), utilsNode) {
                Y.browser.mozilla ? Object(f.addClass)(bodyNode, "firefox") : Y.browser.mobile && Object(f.addClass)(bodyNode, "mobfixed"), Object(Ne.initLegacyBrowserDetectionInAttribute)(), Object(ue.appendCssFiles)();
                var e = Object(f.ge)("layer_bg"),
                    t = e.nextSibling,
                    o = Object(f.ge)("box_layer_bg"),
                    i = o.nextSibling;
                window.layerBG = e, window.boxLayerBG = o, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(f.ge)("stl_side"), window._stlLeft = Object(f.ge)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, Y.browser.mobile || Object(to.initStl)(), Object(te.addEvent)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, t, o, i) {
                    return window.layerQueue = le, Object(b.extend)(ce, {
                        show: ce._show.pbind(e, t),
                        boxshow: ce._show.pbind(o, i),
                        wrapshow: ce._show.pbind(e),
                        hide: ce._hide.pbind(e, t),
                        boxhide: ce._hide.pbind(o, i),
                        wraphide: ce._hide.pbind(e)
                    }), ce
                }(e, t, o, i), hab.init(), window._retinaInit ? window._retinaInit() : Co = 1, ko.disableSW || (window.PushNotifier = uo, window.sw = new vo, window.sw.register().then(() => {
                    window.pushNotifier = new uo(window.sw, vo)
                }))
            }
        }

        function To() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: () => cur.module,
                    getOID: () => cur.oid,
                    doesScrollTriggerIdle: !0
                })), Object(to.updateSTL)();
                var e = Object(f.ge)("side_bar");
                window.pageNode = Object(f.ge)("page_wrap"), window._fixedNav = e && "fixed" === Object(f.getStyle)(e, "position"), window._tbLink = Object(f.ge)("top_back_link"), Y.browser.chrome || Y.browser.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = Y.browser.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(b.vkNow)() - ko.started, 10),
                    o = Object(b.intval)((ko.contlen || 1) / t * 1e3);
                Y.browser.mozilla && Y.browser.version >= 4 ? o /= 2.5 : Y.browser.mozilla ? o *= 1.5 : Y.browser.msie && Y.browser.version >= 7 ? o /= 1.5 : Y.browser.msie && (o *= 2.5);
                var i = Object(b.intval)(150 * Math.max(2e6 / o, 1));
                if (ue.stManager.highlimit = 6 * i, ue.stManager.lowlimit = Math.min(i, 600), Object(Re.onBodyResize)(), ko.dt = Object(p.calculateTimeOffsets)(), setTimeout(Re.onBodyResize.pbind(!1), 0), Object(Yt.updateAriaElements)(), window.addEventListener("scroll", Re.onBodyScroll, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !ko.id && we.default.checkVersion() && we.default.get("last_reloaded")) try {
                    var n = {};
                    Object(b.each)(["sound_notify_off", "im_ui_notify_off"], (e, t) => {
                        var o = we.default.get(t);
                        null !== o && (n[t] = o)
                    }), window.localStorage.clear(), Object(b.each)(n, (e, t) => we.default.set(e, t))
                } catch (e) {}
            }
        }
        class xo {
            constructor(e, t) {
                this.count = t || 1, this.func = e
            }
            done() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                this.count -= e, this.count <= 0 && this.func()
            }
        }

        function Lo(e) {
            ko.loaded ? e() : Object(te.addEvent)(window, "load", e)
        }

        function Ro() {
            window.showWriteMessageBox = Ie.showWriteMessageBox, window.giftsBox = Ie.giftsBox, window.moneyTransferBox = Ie.moneyTransferBox, window.reportAd = Ie.reportAd, window.mobilePromo = Ie.mobilePromo, window.showAudioClaimWarning = Ie.showAudioClaimWarning, window.menuSettings = Ie.menuSettings, window.sureDeleteAll = Ie.sureDeleteAll, window.TopNotifier = Object(de.initTopNotifier)(), window.showPhoto = de.showPhoto, window.showManyPhoto = de.showManyPhoto, window.showAlbums = de.showAlbums, window.showAlbum = de.showAlbum, window.showPhotoTags = de.showPhotoTags, window.isPhotoeditor3Available = de.isPhotoeditor3Available, window.AudioMessagePlayer = de.AudioMessagePlayer, window.showVideoTags = de.showVideoTags, window.videoCallback = de.videoCallback, window.showWiki = de.showWiki, window.showApp = de.showApp, window.showPodcast = de.showPodcast, window.podcastStartFrom = de.podcastStartFrom, window.articlePrepare = de.articlePrepare, window.isArticleLayerOpen = de.isArticleLayerOpen, window.isArticleEditorAvailable = de.isArticleEditorAvailable, window.openArticleEditor = de.openArticleEditor, window.mentionOver = Me.mentionOver, window.mentionClick = de.mentionClick, window.mobileOnlineTip = Me.mobileOnlineTip, window.pageVerifiedTip = Me.pageVerifiedTip, window.audioShowActionTooltip = Me.audioShowActionTooltip, window.shareAudioPlaylist = de.shareAudioPlaylist, window.getAudioPlayer = de.getAudioPlayer, window.deleteAudioOnClaim = de.deleteAudioOnClaim, window.initTopAudioPlayer = de.initTopAudioPlayer, window.bookmark = de.bookmark, window.bookmarkPost = de.bookmarkPost, window.bookmarkArticle = de.bookmarkArticle, window.bookmarkLink = de.bookmarkLink, window.bookmarkPodcast = de.bookmarkPodcast, window.bookmarkNarrative = de.bookmarkNarrative, window.bookmarkEvent = de.bookmarkEvent, window.bookmarkTooltip = Me.bookmarkTooltip, window.showStory = ae.showStory, window.showNarrative = ae.showNarrative, window.storiesPreloadStatic = ae.storiesPreloadStatic, window.sendMask = ae.sendMask
        }
        window.constants = {
            Groups: xe
        }, window.partConfigEnabled = p.partConfigEnabled, Object(f.initDomScripts)(), window.ge = f.ge, window.geByTag = f.geByTag, window.geByTag1 = f.geByTag1, window.geByClass = f.geByClass, window.geByClass1 = f.geByClass1, window.gpeByClass = f.gpeByClass, window.domQuery = f.domQuery, window.domQuery1 = f.domQuery1, window.domClosest = f.domClosest, window.ce = f.ce, window.cf = f.cf, window.re = f.re, window.se = f.se, window.sech = f.sech, window.rs = f.rs, window.psr = f.psr, window.domReplaceEl = f.domReplaceEl, window.domEL = f.domEL, window.domNS = f.domNS, window.domPS = f.domPS, window.domFC = f.domFC, window.domLC = f.domLC, window.domPN = f.domPN, window.domChildren = f.domChildren, window.domInsertBefore = f.domInsertBefore, window.domInsertAfter = f.domInsertAfter, window.domByClass = f.domByClass, window.domData = f.domData, window.domChildIndex = f.domChildIndex, window.domCA = f.domCA, window.domClosestSibling = f.domClosestSibling, window.matchesSelector = f.matchesSelector, window.isHover = f.isHover, window.isAncestor = f.isAncestor, window.getScroll = f.getScroll, window.domClosestPositioned = f.domClosestPositioned, window.domClosestOverflowHidden = f.domClosestOverflowHidden, window.show = f.show, window.hide = f.hide, window.isVisible = f.isVisible, window.clientHeight = f.clientHeight, window.getClientRectOffsetY = f.getClientRectOffsetY, window.toggle = f.toggle, window.boundingRectEnabled = f.boundingRectEnabled, window.getXYRect = f.getXYRect, window.getXY = f.getXY, window.isWindow = f.isWindow, window.getSize = f.getSize, window.hasClass = f.hasClass, window.addClass = f.addClass, window.addClassDelayed = f.addClassDelayed, window.removeClass = f.removeClass, window.removeClassDelayed = f.removeClassDelayed, window.toggleClass = f.toggleClass, window.toggleClassDelayed = f.toggleClassDelayed, window.replaceClass = f.replaceClass, window.getStyle = f.getStyle, window.setStyle = f.setStyle, window.setStyleDelayed = f.setStyleDelayed, window.setPseudoStyle = f.setPseudoStyle, window.data = f.data, window.attr = f.attr, window.removeAttr = f.removeAttr, window.removeData = f.removeData, window.cleanElems = f.cleanElems, window.setTitle = f.setTitle, window.getZoom = f.getZoom, window.val = f.val, window.elfocus = f.elfocus, window.traverseParent = f.traverseParent, window.getH = f.getH, window.getW = f.getW, window.domClosestByTag = f.domClosestByTag, window.setDocumentTitle = f.setDocumentTitle, window.lockDocumentTitle = f.lockDocumentTitle, window.KEY = te.KEY, window.addEvent = te.addEvent, window.removeEvent = te.removeEvent, window.triggerEvent = te.triggerEvent, window.cancelEvent = te.cancelEvent, window.stopEvent = te.stopEvent, window.normEvent = te.normEvent, window.checkEvent = te.checkEvent, window.checkKeyboardEvent = te.checkKeyboardEvent, window.checkOver = te.checkOver, Object(b.initUtilsCommon)(), window.isRetina = b.isRetina, window.extractUrls = b.extractUrls, window.serializeForm = b.serializeForm, window.addTemplates = b.addTemplates, window.getTemplate = b.getTemplate, window.rand = b.rand, window.irand = b.irand, window.isUndefined = b.isUndefined, window.isFunction = b.isFunction, window.isArray = b.isArray, window.isString = b.isString, window.isObject = b.isObject, window.isEmpty = b.isEmpty, window.vkNow = b.vkNow, window.vkImage = b.vkImage, window.trim = b.trim, window.stripHTML = b.stripHTML, window.escapeRE = b.escapeRE, window.intval = b.intval, window.floatval = b.floatval, window.positive = b.positive, window.isNumeric = b.isNumeric, window.winToUtf = b.winToUtf, window.replaceEntities = b.replaceEntities, window.clean = b.clean, window.unclean = b.unclean, window.each = b.each, window.indexOf = b.indexOf, window.inArray = b.inArray, window.clone = b.clone, window.arrayKeyDiff = b.arrayKeyDiff, window.extend = b.extend, window.vkLocal = b.vkLocal, window.lTimeout = b.lTimeout, window.getCaretCharacterOffsetWithin = b.getCaretCharacterOffsetWithin, window.formatCount = b.formatCount, window.encodeHtml = b.encodeHtml, window.decodeHtml = b.decodeHtml, jo(), window.AjaxConvert = u, window.ajx2q = u.toQueryString, window.q2ajx = u.fromQueryString, window.requestBox = $.requestBox, window.activateMobileBox = $.activateMobileBox, window.validateMobileBox = $.validateMobileBox, window.validatePassBox = $.validatePassBox, Object(_.initCookies)(), window.getCookie = _.getCookie, window.setCookie = _.setCookie, window.hideCookiesPolicy = _.hideCookiesPolicy, Object(V.initDebugTools)(), window.debugLog = V.debugLog, window.debugEl = V.debugEl, window.isToday = Le.isToday, window.isYesterday = Le.isYesterday, window.isTomorrow = Le.isTomorrow, window.isSameDate = Le.isSameDate, window.leadingZero = Le.leadingZero, window.formatTime = Le.formatTime, window.getServerTime = Le.getServerTime, window.parseLatin = S.parseLatin, window.parseCyr = S.parseCyr, window.parseLatKeys = S.parseLatKeys, window.langNumeric = S.langNumeric, window.langSex = S.langSex, window.langStr = S.langStr, window.addLangKeys = S.addLangKeys, window.getLang = S.getLang, window.langDate = S.langDate, window.getShortDate = S.getShortDate, window.getShortDateOrTime = S.getShortDateOrTime, window.langWordNumeric = S.langWordNumeric, window.getDateText = S.getDateText, window.getBigDateNew = S.getBigDateNew, window.getSmDate = S.getSmDate, window.scrollToY = ne.scrollToY, window.scrollToTop = ne.scrollToTop, window.scrollGetX = ne.scrollGetX, window.scrollGetY = ne.scrollGetY, window.disableBodyScroll = ne.disableBodyScroll, window.enableBodyScroll = ne.enableBodyScroll, window.Chat = Ne.Chat, window.__qlTimer = null, window.__qlClear = Ne.__qlClear, window.onLoginDone = Ne.onLoginDone, window.onLoginFailed = Ne.onLoginFailed, window.onLoginCaptcha = Ne.onLoginCaptcha, window.onLoginReCaptcha = Ne.onLoginReCaptcha, window.storePasswordCredential = Ne.storePasswordCredential, window.cssAnim = Ne.cssAnim, window.imagesLoader = Ne.imagesLoader, window.nodeUpdated = Ne.nodeUpdated, window.hideNewsAnnounce = Ne.hideNewsAnnounce, window.leftAdBlockClose = Ne.leftAdBlockClose, window.leftBlockToggleFriend = Ne.leftBlockToggleFriend, window.leftBlockFriendTooltip = Ne.leftBlockFriendTooltip, window.placeholderSetup = Jt.placeholderSetup, window.placeholderInit = Jt.placeholderInit, window.isInputActive = Jt.isInputActive, window.showTooltip = Ae.showTooltip, window.showTitle = Ae.showTitle, window.showHint = Ae.showHint, window.topMsg = w.topMsg, window.showMsg = w.showMsg, window.topError = w.topError, window.showGlobalPrg = w.showGlobalPrg, window.checkTextLength = T.checkTextLength, window.getSelectionText = T.getSelectionText, window.goAway = T.goAway, window.debounce = eo.debounce, window.hashCode = T.hashCode, window.isFullScreen = T.isFullScreen, window.parallel = T.parallel, window.parseJSON = T.parseJSON, window.shuffle = T.shuffle, window.throttle = T.throttle, window.toggleOnline = T.toggleOnline, window.updateMoney = T.updateMoney, window.onlinePlatformClass = T.onlinePlatformClass, window.Fx = ee.Fx, window.fx = ee.Fx, window.animate = ee.animate, window.cubicBezier = ee.cubicBezier, window.fadeTo = ee.fadeTo, window.genFx = ee.genFx, window.getRGB = ee.getRGB, window.getColor = ee.getColor, window.slideDown = ee.slideDown, window.slideUp = ee.slideUp, window.slideToggle = ee.slideToggle, window.fadeIn = ee.fadeIn, window.fadeOut = ee.fadeOut, window.fadeToggle = ee.fadeToggle, window.animateCount = ee.animateCount, window.updateAriaElements = Yt.updateAriaElements, window.updateAriaCheckboxes = Yt.updateAriaCheckboxes, window.hasAccessibilityMode = Yt.hasAccessibilityMode, window.cancelStackFilter = se.cancelStackFilter, window.cancelStackPush = se.cancelStackPush, window.cancelStackPop = se.cancelStackPop, Object(Eo.init)(), window.ElementTooltip = X.default, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = J, 1 === ko.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== ko.al || history.pushState || (ko.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), ko.version = !1), Object(ue.initStaticManager)(), window.stManager = ue.stManager, Object(Y.initBrowserUtils)(), window.browser = Y.browser, window.mobPlatforms = Y.mobPlatforms, window.browserFeatures = Y.browserFeatures, Object(Z.initFlashUtils)(), window.toggleFlash = Z.toggleFlash, window.renderFlash = Z.renderFlash, Po(), window.updateHeaderStyles = ve.updateHeaderStyles, window.updateNarrow = Re.updateNarrow, window.checkPageBlocks = Re.checkPageBlocks, window.redraw = Re.redraw, window.onBodyResize = Re.onBodyResize, window.onBodyScroll = Re.onBodyScroll, window.leftBlockOver = Re.leftBlockOver, window.leftBlockOut = Re.leftBlockOut, window.leftBlockHide = Re.leftBlockHide, window.onDocumentClick = Zt.onDocumentClick, window.onEnter = Zt.onEnter, window.onCtrlEnter = Zt.onCtrlEnter, window.logLeftMenuClicks = he.logLeftMenuClicks, window.autosizeSetup = Re.autosizeSetup, window.getProgressBarEl = Re.getProgressBarEl, window.getProgressHtml = Re.getProgressHtml, Object(oo.initAds)(), Te(), window.onDomReady = e => e(), window.currentModule = () => cur.currentModule ? cur.currentModule() : cur.module, window.hab = new ie({
            onLocChange: function(e) {
                var t = {
                    back: !0,
                    hist: !0
                };
                3 === vk.al && history.state && Object(b.isObject)(history.state) && (t.scrollTop = Object(b.intval)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
            }
        }), window.ls = we.default, window.shortCurrency = _e, window.statlogsValueEvent = he.statlogsValueEvent, window.saveSearchAttemptStats = he.saveSearchAttemptStats, window.removeSearchPositionTracker = he.removeSearchPositionTracker, window.callHub = xo, window.CallHub = xo, window.gSearch = new fe, window.zNav = ve.zNav, window.handlePageView = ve.handlePageView, window.handlePageParams = ve.handlePageParams, window.handlePageCount = ve.handlePageCount, window.updateOtherCounters = ve.updateOtherCounters, window.processDestroy = ve.processDestroy, window.globalHistoryDestroy = ve.globalHistoryDestroy, window.showBackLink = ve.showBackLink, window.nav = me.default, nav.init(), setTimeout(function() {
            var e = Object(b.intval)(Object(_.getCookie)("remixrt"));
            window.devicePixelRatio >= 2 && (!Y.browser.iphone || Object(_.getCookie)("remixme")) ? 1 & e || (Object(_.setCookie)("remixrt", 1 | e, 365), window._retinaInit = function() {
                ue.stManager.add(["retina.css"]), Object(f.addClass)(document.body, "is_2x")
            }, Co && window._retinaInit()) : 1 & e && Object(_.setCookie)("remixrt", 1 ^ e, 365)
        }, 0), window.boxQueue = Object(Be.getBoxQueue)(), window.__bq = boxQueue, window.curBox = Be.curBox, Object(Be.initBoxQueue)(), window.boxRefreshCoords = Be.boxRefreshCoords, window.MessageBox = De.MessageBox, window.showBox = De.showBox, window.showTabbedBox = De.showTabbedBox, window.showFastBox = De.showFastBox, window.showCaptchaBox = De.showCaptchaBox, window.showReCaptchaBox = De.showReCaptchaBox, window.showDoneBox = Be.showDoneBox, window.TopMenu = Re.TopMenu, window.TopSearch = ge.default, window.handleScroll = T.handleScroll, window.loadScript = be.loadScript, window.SpecialEvent = yo, Object(pe.initUiHelpers)(), window.notaBene = pe.notaBene, window.updSideTopLink = pe.updSideTopLink, window.createButton = pe.createButton, window.actionsMenuItemLocked = pe.actionsMenuItemLocked, window.lockActionsMenuItem = pe.lockActionsMenuItem, window.unlockActionsMenuItem = pe.unlockActionsMenuItem, window.linkLocked = pe.linkLocked, window.lockLink = pe.lockLink, window.unlockLink = pe.unlockLink, window.lockButton = pe.lockButton, window.unlockButton = pe.unlockButton, window.buttonLocked = pe.buttonLocked, window.isButtonLocked = pe.isButtonLocked, window.disableButton = pe.disableButton, window.sbWidth = pe.sbWidth, window.isChecked = pe.isChecked, window.checkbox = pe.checkbox, window.disable = pe.disable, window.radioval = pe.radioval, window.radiobtn = pe.radiobtn, window.showProgress = pe.showProgress, window.hideProgress = pe.hideProgress, window.disableEl = pe.disableEl, window.enableEl = pe.enableEl, Object(re.initVideo)(), window.VideoConstants = re.VideoConstants, window.showVideo = re.showVideo, window.showInlineVideo = re.showInlineVideo, window.loadInlineVideo = re.loadInlineVideo, window.revertLastInlineVideo = re.revertLastInlineVideo, window.pauseLastInlineVideo = re.pauseLastInlineVideo, window.playLastInlineVideo = re.playLastInlineVideo, window.checkMp4 = re.checkMp4, window.performance && window.performance.memory && Object(b.rand)(0, 100) < 5 && Object(Xt.collectMemoryStats)(), ct ? (Object(te.addEvent)(window, "blur", Ct), Object(te.addEvent)(window, "focus", St), onDomReady(() => setTimeout(yt, 500)), window.LongView = {
            register: kt,
            onScroll: Object(T.throttle)(jt, 50),
            onBeforePageChange: Tt,
            clearElemsCache: Et,
            _debug: function() {
                return {
                    started: wt,
                    tracking: lt,
                    viewedData: _t,
                    viewIndexes: Ot,
                    blindTop: ht,
                    blindBottom: pt
                }
            }
        }) : window.LongView = {
            register: () => {},
            onScroll: () => {},
            onBeforePageChange: () => {},
            clearElemsCache: () => {}
        }, Object(Ne.initPostsLegacyVars)(), Ro(), window.onLoaded = Lo, window.domStarted = So, window.domReady = To, Object(V.debugLog)("common module enabled"), ue.stManager.done(jsc("web/common_web.js"))
    },
    nCnK: function(e, t, o) {
        o("7DDg")("Uint32", 4, function(e) {
            return function(t, o, i) {
                return e(this, t, o, i)
            }
        })
    }
});