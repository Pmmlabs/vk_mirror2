! function(e) {
    function t(t) {
        for (var i, a, s = t[0], c = t[1], d = t[2], _ = 0, l = []; _ < s.length; _++) a = s[_], n[a] && l.push(n[a][0]), n[a] = 0;
        for (i in c) Object.prototype.hasOwnProperty.call(c, i) && (e[i] = c[i]);
        for (w && w(t); l.length;) l.shift()();
        return r.push.apply(r, d || []), o()
    }

    function o() {
        for (var e, t = 0; t < r.length; t++) {
            for (var o = r[t], i = !0, s = 1; s < o.length; s++) {
                var c = o[s];
                0 !== n[c] && (i = !1)
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
        c = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var d = 0; d < s.length; d++) t(s[d]);
    var w = c;
    r.push([82, "bundles/audioplayer", "bundles/common"]), o()
}({
    "+MXk": function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return emailNotConfirmed
        }), __webpack_require__.d(__webpack_exports__, "k", function() {
            return showCaptcha
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return mobileValidationRequired
        }), __webpack_require__.d(__webpack_exports__, "i", function() {
            return passwordValidationRequired
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return authFailed
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return makeRedirect
        }), __webpack_require__.d(__webpack_exports__, "j", function() {
            return reload
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return mobileActivationRequired
        }), __webpack_require__.d(__webpack_exports__, "m", function() {
            return showMessage
        }), __webpack_require__.d(__webpack_exports__, "l", function() {
            return showError
        }), __webpack_require__.d(__webpack_exports__, "n", function() {
            return votesPayment
        }), __webpack_require__.d(__webpack_exports__, "h", function() {
            return otpBox
        }), __webpack_require__.d(__webpack_exports__, "o", function() {
            return zeroZone
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return evalCode
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
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
            Object(_web_lib_message_box__WEBPACK_IMPORTED_MODULE_4__.d)({
                width: 520,
                title: t[0],
                onDestroy: e.onFail
            }, t[1])
        }

        function showCaptcha(e, t, o) {
            2 === Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.r)(t[1]) ? e._captcha = Object(_web_lib_message_box__WEBPACK_IMPORTED_MODULE_4__.e)(t[0], t[2], e._captcha, {
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
            }) : e._captcha = Object(_web_lib_message_box__WEBPACK_IMPORTED_MODULE_4__.c)(t[0], Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.r)(t[1]), e._captcha, {
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
            }), e._suggest = Object(_web_lib_dom__WEBPACK_IMPORTED_MODULE_5__.I)("phone_validation_link", e._captcha.bodyNode), e._suggest && addEvent(e._suggest, "click", function() {
                e._box = Object(_modal_box__WEBPACK_IMPORTED_MODULE_9__.c)({
                    onDone: e._captcha.submit
                })
            })
        }
        var mobileValidationRequired = e => (t, o, i) => {
            t._box = Object(_modal_box__WEBPACK_IMPORTED_MODULE_9__.c)({
                acceptCaptcha: 11 === e,
                onDone: function(e, o) {
                    vk.nophone = 0, e && (t._captcha = Object(_web_lib_box_utils__WEBPACK_IMPORTED_MODULE_8__.b)());
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
            e._box = Object(_modal_box__WEBPACK_IMPORTED_MODULE_9__.e)({
                onDone: () => e.resend(o, resetOptionsCache(e)),
                onFail: e.onFail,
                hash: t[0]
            })
        }

        function authFailed(e, t, o) {
            window.onReLoginDone = (() => e.resend(o, resetOptionsCache(e))), window.onReLoginFailed = function(e, t) {
                t ? nav.go(t) : -1 === e ? location.href = location.href.replace(/^http:/, "https:") : e ? nav.go("/") : window.onReLoginDone()
            }, window.utilsNode.appendChild(Object(_web_lib_dom__WEBPACK_IMPORTED_MODULE_5__.e)("iframe", {
                src: window.vk.loginscheme + "://login.vk.com/?" + Object(_shared_lib_convert__WEBPACK_IMPORTED_MODULE_2__.toQueryString)({
                    role: "al_frame",
                    _origin: window.locProtocol + "//" + window.locHost,
                    ip_h: t[0] || window.vk.ip_h,
                    to: t[1] || ""
                })
            }))
        }

        function makeRedirect(e, t) {
            Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.r)(t[1]) ? nav.go(t[0], !1, {
                nocur: "2" === t[1],
                noback: !0 === t[1],
                showProgress: e.showProgress,
                hideProgress: e.hideProgress
            }) : (hab.stop(), location.href = t[0])
        }

        function reload(e, t, o, i) {
            nav.reload({
                force: Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.r)(t[0]),
                from: 1,
                url: i,
                query: o && Object(_shared_lib_convert__WEBPACK_IMPORTED_MODULE_2__.toQueryString)(o)
            })
        }

        function mobileActivationRequired(e, t, o) {
            e._box = Object(_modal_box__WEBPACK_IMPORTED_MODULE_9__.a)({
                onDone: e.resend(o, resetOptionsCache(e)),
                onFail: e.onFail,
                hash: t[0]
            })
        }

        function showMessage(e, t) {
            e.onFail && e.onFail(), Object(_web_lib_ui_util__WEBPACK_IMPORTED_MODULE_7__.d)(t[0], 10)
        }

        function showError(e, t, o, i) {
            e.onFail && e.onFail(t[0]) || Object(_web_lib_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)(t[0] + (t[2] ? " #" + t[2] : ""), {
                dt: t[1] ? 0 : 10,
                type: 4,
                url: i,
                query: o && Object(_shared_lib_convert__WEBPACK_IMPORTED_MODULE_2__.toQueryString)(o)
            })
        }

        function votesPayment(e, t, o) {
            if (!e.fromBox && !e.forceDone || (e.onDone && e.onDone.apply(window, t), !e.fromBox)) {
                e._box = Object(_web_lib_message_box__WEBPACK_IMPORTED_MODULE_4__.d)({
                    title: Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.H)(t[0])
                }, t[1]);
                var i = Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.i)(Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.d)(e), {
                    showProgress: e._box.showProgress,
                    hideProgress: e._box.hideProgress
                });
                e.cache && (i.cache = -1), e._box = Object(_modal_box__WEBPACK_IMPORTED_MODULE_9__.b)(e._box, function(t) {
                    Object(_web_lib_dom__WEBPACK_IMPORTED_MODULE_5__.bb)(e._box.progress) || (t || (t = {
                        _votes_ok: 1
                    }), e.resend(Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_3__.i)(o, t), i))
                }, e.onFail), e._box.evalBox(t[2])
            }
        }

        function otpBox(e, t, o) {
            e._box = Object(_modal_box__WEBPACK_IMPORTED_MODULE_9__.d)({
                onDone: () => e.resend(o, resetOptionsCache(e)),
                onFail: e.onFail,
                hash: t[0]
            })
        }

        function zeroZone(e, t, o) {
            e._box = Object(_web_lib_message_box__WEBPACK_IMPORTED_MODULE_4__.d)({
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
                Object(_web_lib_debug_tools__WEBPACK_IMPORTED_MODULE_6__.f)(e, evalString)
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
        __webpack_require__.d(__webpack_exports__, "a", function() {
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
                this.frameDataQueue = [], this.frameTimeout = null, this.frame = null, this.queueReady = !1, this.fulfilled = !1, this._debug = (() => {})
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
                t && e.html && (t.firstChild ? t.appendChild(Object(_web_lib_dom__WEBPACK_IMPORTED_MODULE_5__.f)(e.html)) : val(t, e.html)), e.js && (_runJs(e.js, (t, o) => {
                    Object(_web_lib_ui_util__WEBPACK_IMPORTED_MODULE_3__.c)(t, {
                        dt: 15,
                        type: 8,
                        url: this.frameUrl,
                        js: o,
                        answer: JSON.stringify(e)
                    }), Object(_web_lib_debug_tools__WEBPACK_IMPORTED_MODULE_4__.f)(t, o)
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
                    _rndVer: Object(_web_lib_utils_common__WEBPACK_IMPORTED_MODULE_2__.s)(0, 99999)
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
    82: function(e, t, o) {
        e.exports = o("g42W")
    },
    g42W: function(e, t, o) {
        "use strict";
        o.r(t);
        o("OG14"), o("pIFo"), o("SRfc"), o("NO8f");
        ! function(e) {
            var t = e.HTMLCanvasElement && e.HTMLCanvasElement.prototype,
                o = e.Blob && function() {
                    try {
                        return Boolean(new Blob)
                    } catch (e) {
                        return !1
                    }
                }(),
                i = o && e.Uint8Array && function() {
                    try {
                        return 100 === new Blob([new Uint8Array(100)]).size
                    } catch (e) {
                        return !1
                    }
                }(),
                n = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder,
                r = /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
                a = (o || n) && e.atob && e.ArrayBuffer && e.Uint8Array && function(e) {
                    var t, a, s, c, d, w, _, l, u;
                    if (!(t = e.match(r))) throw new Error("invalid data URI");
                    for (a = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), s = !!t[4], c = e.slice(t[0].length), d = s ? atob(c) : decodeURIComponent(c), w = new ArrayBuffer(d.length), _ = new Uint8Array(w), l = 0; l < d.length; l += 1) _[l] = d.charCodeAt(l);
                    return o ? new Blob([i ? _ : w], {
                        type: a
                    }) : ((u = new n).append(w), u.getBlob(a))
                };
            e.HTMLCanvasElement && !t.toBlob && (t.mozGetAsFile ? t.toBlob = function(e, o, i) {
                e(i && t.toDataURL && a ? a(this.toDataURL(o, i)) : this.mozGetAsFile("blob", o))
            } : t.toDataURL && a && (t.toBlob = function(e, t, o) {
                e(a(this.toDataURL(t, o)))
            })), "function" == typeof define && define.amd ? define(function() {
                return a
            }) : "object" == typeof module && module.exports ? module.exports = a : e.dataURLtoBlob = a
        }(window);
        o("uQjJ"), o("rGqo"), o("Btvt");

        function i(e) {
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
        }), i(window.NodeList), i(window.HTMLCollection);
        var n = o("ryw6"),
            r = o("kMSP"),
            a = (o("91GP"), o("KKXr"), o("cGUQ")),
            s = o("jE6c"),
            c = o("W9Tc"),
            d = o("t7n3"),
            w = o("zxIV"),
            _ = o("2QOe");

        function l() {
            return (l = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = arguments[t];
                    for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i])
                }
                return e
            }).apply(this, arguments)
        }
        class u {
            static getInstance(e, t) {
                var o = u.makeCacheKey(e, t);
                return u._instances[o] || (u._instances[o] = new u(o)), u._instances[o]
            }
            constructor(e) {
                u.ensureCachesInitialized(), this._cacheKey = e
            }
            getFromCache(e, t, o) {
                var i = o.cacheLevel,
                    n = void 0 === i ? 0 : i,
                    r = o.forceGlobalCache,
                    a = void 0 !== r && r,
                    s = o.onAnswerProcessed,
                    c = void 0 === s ? () => {} : s;
                if (n > 0 || a) {
                    var w = window.ajaxCache[this._cacheKey];
                    if (w && w._loading) return w._callbacks.push(e), !1;
                    if (w && !a) return e(0, w), 3 === n && delete window.ajaxCache[this._cacheKey], !1;
                    if (w = window.globalAjaxCache[this._cacheKey]) return -1 === w || Object(d.v)(w) ? window.globalAjaxCache[this._cacheKey] = t : t.apply(window, w), c && c(), !1
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
                var o = l({}, t);
                return ["al", "al_ad", "ads_section", "ads_showed", "captcha_sid", "captcha_key", "_smt", "_preload"].forEach(e => delete o[e]), e + "#" + Object(a.toQueryString)(o)
            }
            static preload(e, t, o) {
                u.ensureCachesInitialized(), "/" !== e.substr(0, 1) && (e = "/" + e), window.ajaxCache[u.makeCacheKey(e, t)] = o
            }
            static invalidate(e, t) {
                u.ensureCachesInitialized(), void 0 === e ? window.ajaxCache = {} : delete window.ajaxCache[u.makeCacheKey(e, t)]
            }
        }
        u._instances = {};
        o("VRzm"), o("nCnK");
        for (var h = new Uint32Array(256), p = 256; p--;) {
            for (var b = p, f = 8; f--;) b = 1 & b ? 3988292384 ^ b >>> 1 : b >>> 1;
            h[p] = b
        }

        function m(e, t, o, i, n, r, a) {
            var s = arguments.length > 7 && void 0 !== arguments[7] && arguments[7],
                c = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : null,
                d = g(e, t, {
                    xhrOptions: r,
                    sortQueryStringParams: a && !a.noSort,
                    noExtraHeaders: s,
                    urlOnly: n,
                    cancellationToken: a && a.cancellationToken,
                    logger: c
                }),
                w = d._getXhr();
            return d.then(e => o && o(e.data, w.status)).catch(e => i && i(e, w.status)), w
        }

        function g(e, t, o) {
            var i, n = o.xhrOptions,
                r = o.urlOnly,
                s = void 0 !== r && r,
                c = o.sortQueryStringParams,
                w = void 0 === c || c,
                _ = o.noExtraHeaders,
                l = void 0 !== _ && _,
                u = o.cancellationToken,
                p = void 0 === u ? null : u,
                b = o.logger,
                f = void 0 === b ? null : b;
            f && (i = function(e) {
                for (var t = -1, o = 0, i = e.length; o < i; o++) t = t >>> 8 ^ h[255 & t ^ e[o]];
                return (-1 ^ t) >>> 0
            }(e + JSON.stringify(t)), f(`Initialized request #${i} with URL ${e} and query ${JSON.stringify(t)}`));
            var m = new XMLHttpRequest;
            p && p._setCancelCb(() => {
                f && f(`Aborting request #${i}`), m.abort()
            });
            var g = new Promise(function(o, r) {
                var c = "string" != typeof t ? Object(a.toQueryString)(t, !w) : t;
                m.onreadystatechange = function() {
                    if (m.readyState === XMLHttpRequest.DONE)
                        if (f && f(`Request readyState -> DONE with status ${m.status} #${i}`), m.status >= 200 && m.status < 300) try {
                            o({
                                data: m.responseText,
                                code: m.status
                            }), f && f(`Success handler finished for request #${i}`)
                        } catch (e) {
                            f && f(`Success handler failed for request #${i}`), r({
                                data: m.responseText,
                                code: -1
                            }), f && f(`Failure handler finished for request #${i} [1]`)
                        } else r({
                            data: m.responseText,
                            code: m.status
                        }), f && f(`Failure handler finished for request #${i} [2]`)
                };
                try {
                    f && f(`Starting request #${i}`), m.open("POST", e, !0)
                } catch (e) {
                    f && f(`Request #${i} failed`), r({
                        data: e,
                        code: -1
                    }), f && f(`Failure handler finished for request #${i} [3]`)
                }
                n && Object(d.f)(n, function(e, t) {
                    m[e] = t
                }), s || (m.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), l || m.setRequestHeader("X-Requested-With", "XMLHttpRequest")), f && f(`Sending data for request #${i}`), m.send(c)
            });
            return g._getXhr = (() => m), g
        }
        var v = o("+MXk"),
            O = o("4+be"),
            y = o("aong");
        class E {
            parseResponse(e) {
                var t = [];
                e instanceof Array && (t = e[1], e = e[0]);
                var o = e.replace(/^<!--/, "").replace(/-<>-(!?)>/g, "--$1>");
                Object(d.H)(o).length || (data = [8, Object(O.d)("global_unknown_error")], o = stVersions.nav + "<!><!>" + vk.lang + "<!>" + stVersions.lang + "<!>8<!>" + data[1]);
                var i = o.split("<!>"),
                    n = Object(d.r)(i.shift()),
                    r = i.shift(),
                    a = Object(d.r)(i.shift()),
                    s = Object(d.r)(i.shift());
                return t && (i = i.concat(t)), {
                    navVersion: n,
                    newStatic: r,
                    langId: a,
                    langVer: s,
                    code: Object(d.r)(i.shift()),
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
                                o[i] = Object(y.l)(n);
                                break;
                            case "int":
                                o[i] = Object(d.r)(n);
                                break;
                            case "float":
                                o[i] = Object(d.k)(n);
                                break;
                            case "bool":
                                o[i] = !!Object(d.r)(n);
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
        class j {
            parseResponse(e) {
                var t = this.parseStaticPayload(e);
                return {
                    navVersion: Object(d.r)(t.loaderVersion),
                    newStatic: t.static,
                    langId: Object(d.r)(t.langPack),
                    langVer: Object(d.r)(t.langVersion),
                    code: Object(d.r)(t.payload[0]),
                    payload: t.payload[1],
                    debugLog: t.debugLog
                }
            }
            parseStaticPayload(e, t) {
                var o = e;
                return e && "string" == typeof e && (o = JSON.parse(e)), o.payload && o.payload[0] > 0 && (o.payload[1] = o.payload[1].map(e => "string" == typeof e ? JSON.parse(e) : e)), o
            }
        }
        var P = 1,
            k = 2;
        class S {
            constructor(e) {
                this._switchProto(e)
            }
            parseResponse(e) {
                return this.impl instanceof E && this._isNewProto(e) && this._switchProto(k), this.impl instanceof j && this._isOldProto(e) && this._switchProto(P), this.impl.parseResponse(e)
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
                    case P:
                        this.impl = new E;
                        break;
                    case k:
                        this.impl = new j;
                        break;
                    default:
                        Object(n.c)("Fallback to legacy protocol.", {
                            type: 204
                        }), this.impl = new E
                }
            }
        }
        var x, T, R, C, D, L, M, I = o("98sY");

        function A() {
            return (A = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = arguments[t];
                    for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i])
                }
                return e
            }).apply(this, arguments)
        }
        class B {
            static post(e, t, o) {
                B._protoAdapter = new S(Object(c.a)("web_ajax_json_object") ? k : P), "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
                var i = A({}, o || {}, {
                        _captcha: !1,
                        _box: !1,
                        no_ads_params: !1
                    }),
                    n = A({}, t, {
                        al: i.frame ? -1 : 1
                    }),
                    r = Object(d.L)(),
                    a = vk.spentLastSendTS ? Math.round((r - vk.spentLastSendTS) / 1e3) : 0;
                if (vk.sampleUser >= 0 && window.cur && cur.module && a >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (n._smt = cur.module + ":" + a), vk.spentLastSendTS = r), i.progress && (i.showProgress || (i.showProgress = function() {
                        var e = Object(w.G)(i.progress);
                        Object(w.W)(e, "pr") && Object(w.sb)(e, "opacity", 1), Object(w.vb)(e)
                    }), i.hideProgress || (i.hideProgress = function() {
                        var e = Object(w.G)(i.progress);
                        Object(w.W)(e, "pr") && Object(w.sb)(e, "opacity", 0), Object(w.X)(e)
                    })), i.loader) {
                    var s = Object(w.bb)(window.boxLayerWrap);
                    i.showProgress = function() {
                        boxRefreshCoords(window.boxLoader), Object(w.vb)(window.boxLoader), s || Object(w.vb)(window.boxLayerWrap)
                    }, i.hideProgress = function() {
                        Object(w.X)(window.boxLoader), s || Object(w.X)(window.boxLayerWrap)
                    }
                }
                return new B(e, n, i)._post()
            }
            constructor(e, t, o) {
                this._url = e, this._options = A({}, o), this._query = t, this._additionalStaticLoader = null, this._cacheClient = null, o.local && (this.onDone = Object(d.K)(this.onDone), this.onFail = Object(d.K)(this.onFail), this.processResponse = Object(d.K)(this.processResponse)), this._options.cache && (this._cacheClient = u.getInstance(this._url, this._query)), this.onDone = this.onDone.bind(this), this.onFail = this.onFail.bind(this), this.processResponse = this.processResponse.bind(this)
            }
            _post() {
                if (!this._query.captcha_sid && this._options.showProgress && this._options.showProgress(), window.__adsGetAjaxParams && !this._options.no_ads_params && (this._query = A({}, this._query, window.__adsGetAjaxParams(this._query, this._options))), this._options.stat && (this._additionalStaticLoader = null, stManager.add(this._options.stat, () => {
                        this._additionalStaticLoader && this._additionalStaticLoader(), this._options.stat = !1
                    })), !this._cacheClient || this._cacheClient.getFromCache(this.processResponse, this._options.onDone, {
                        cacheLevel: this._options.cache,
                        forceGlobalCache: this._options.forceGlobalCache,
                        onAnswerProcessed: this._options.hideProgress
                    })) {
                    this._options.resend = ((e, t) => new B(this._url, e, t)._post()), window.debuglogSent ? (this._reqid = window.debuglogSent(this._url + (this._query ? ": " + Object(a.toQueryString)(this._query, this._options.noSort).replace(/&/g, "&amp;") : "")), this._options.frame && (window._lfrid = this._reqid)) : this._reqid = 0;
                    var e = {};
                    return this._options.timeout && (e.timeout = this._options.timeout), this._options.frame ? _.a.request(this._url, this._query, this.onDone, this._options) : m(this._url, this._query, this.onDone, this.onFail, !1, e, this._options, !1, Object(c.a)("client_debug_log") ? e => console.log("+ XHR Transport: " + e) : null)
                }
            }
            processResponse(e, t) {
                if (this._options.cache && this._cacheClient && this._cacheClient.processExistingCache(e, t), this._options.stat) return this._options.stat = !1, void(this._additionalStaticLoader = this.processResponse.pbind(e, t));
                this._options.cache && !this._options.forceGlobalCache && !e && this._cacheClient && this._cacheClient.cacheResponse(t), this._options.hideProgress && this._options.hideProgress(), 2 !== e && (this._options._captcha && (this._options._suggest && Object(w.g)(this._options._suggest), this._options._captcha = U(this._options._captcha), this._options._suggest = this._options._captcha), this._options._box = U(this._options._box)),
                    function(e) {
                        switch (e) {
                            case 1:
                                return v.c;
                            case 2:
                                return v.k;
                            case 3:
                                return v.a;
                            case 4:
                                return v.e;
                            case 5:
                                return v.j;
                            case 6:
                                return v.f;
                            case 7:
                                return v.m;
                            case 8:
                                return v.l;
                            case 9:
                                return v.n;
                            case 10:
                                return v.o;
                            case 11:
                            case 12:
                                return Object(v.g)(e);
                            case 13:
                                return v.d;
                            case 14:
                                return v.h;
                            case 15:
                                return v.i;
                            default:
                                return Object(v.b)(e)
                        }
                    }(e)(this._options, t, this._query, this._url), window.LazyLoad && window.LazyLoad.scanDelayed()
            }
            onFail(e, t) {
                this._options.hideProgress && this._options.hideProgress(), this._options._suggest && Object(w.g)(this._options._suggest);
                var o = t instanceof XMLHttpRequest ? t.status : t;
                if (this._options._box = U(this._options._captcha, this._options._box), this._options._captcha = this._options._box, this._options._suggest = this._options._captcha, "string" == typeof e && -1 !== e.indexOf("The page is temporarily unavailable") && __dev && Object(d.o)(vk.id, [100])) this._post();
                else if (!this._options.onFail || !0 !== this._options.onFail(e)) {
                    var i = JSON.stringify(e).substr(0, 300),
                        n = this._query.act,
                        r = this._query && Object(a.toQueryString)(this._query, this._options.noSort),
                        s = this._url,
                        c = {
                            message: "Uncaught ajax error",
                            status: o,
                            data: {
                                url: s,
                                query: r
                            }
                        },
                        _ = [`url: ${s}`, n && `act: ${n}`, i && `text: ${i}`].filter(e => e).join(", ");
                    Object(I.e)(_, {
                        environment: "uncaughtAjaxRequestError",
                        breadcrumb: c
                    }), __debugMode ? console.error("Uncaught Ajax request error:", i, c) : console.log("Uncaught Ajax request error:", i, c)
                }
            }
            doReload(e) {
                nav.reload({
                    force: !0,
                    from: e,
                    url: this._url,
                    query: this._query && Object(a.toQueryString)(this._query)
                })
            }
            onDone(e, t) {
                this._options.bench && (T = (new Date).getTime()), this._options.frame && N("OnDone Req:", e);
                var o, i = t instanceof XMLHttpRequest ? t.status : t;
                try {
                    o = B._protoAdapter.parseResponse(e)
                } catch (t) {
                    return void this.onFail(e, i)
                }
                var r, c = o,
                    _ = c.navVersion,
                    l = c.newStatic,
                    u = c.langId,
                    h = c.langVer,
                    p = c.code,
                    b = c.payload,
                    f = c.debugLog,
                    m = Object(d.d)(b);
                (Object(d.f)(m, (e, t) => m[e] = ("string" == typeof t ? t : JSON.stringify(t)).substr(0, 100)), M = JSON.stringify(m), _) ? vk.version && vk.version !== _ ? _ && b.length > 4 ? this.doReload(2) : nav.strLoc ? location.replace(s.j) : Object(n.c)("Server error.", {
                    type: 100
                }) : (vk.version = !1, this._options.frame && (r = b), vk.lang !== u && this._options.canReload ? this.doReload(3) : function(e, t, o, i, n) {
                    if (!window.stVersions) return void n();
                    var r = () => {
                        if (e === window.stVersions.nav) return function(e, t, o, i) {
                            var n = ["common.css"];
                            if (e)
                                for (var r = 0, a = (e = e.split(",")).length; r < a; ++r) n.push(e[r]);
                            if (stVersions.lang < o)
                                for (var s in stVersions.lang = o, StaticFiles) StaticFiles.hasOwnProperty(s) && /^lang\d/i.test(s) && n.push(s);
                            stManager.add(n, i, !0)
                        }(t, 0, i, n);
                        setTimeout(r, 100)
                    };
                    e !== window.stVersions.nav && headNode.appendChild(Object(w.e)("script", {
                        type: "text/javascript",
                        src: `/js/loader_nav${e}_${vk.lang}.js`
                    }));
                    setTimeout(r, 0)
                }(_, l, 0, h, () => {
                    if (!this._options.frame) try {
                        r = B._protoAdapter.parseStaticPayload(b, this._reqid), f && q(f, this._reqid)
                    } catch (e) {
                        Object(n.c)("<b>JSON Error:</b> " + e.message, {
                            type: 5,
                            answer: b,
                            url: this._url,
                            query: this._query && Object(a.toQueryString)(this._query)
                        })
                    }
                    this.processResponse(p, r)
                })): this.onFail(`<pre>${e}</pre>`, {
                    status: -1
                })
            }
        }

        function N() {
            if (Object(c.a)("client_debug_log")) {
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

        function q(e, t) {
            window.debuglogGot && window.debuglogGot(t, e)
        }

        function U() {
            for (var e = 0, t = arguments.length; e < t; ++e) {
                var o = arguments[e];
                o && o.isVisible() && (o.setOptions({
                    onHide: !1,
                    onDestroy: !1
                }), o.hide())
            }
            return !1
        }
        _.a.frame.setHandlers(e => L = e, e => D = e, N);
        var F = {
                enabled: function() {
                    try {
                        return !!new XMLHttpRequest
                    } catch (e) {
                        return !1
                    }
                }(),
                get lastResp() {
                    return M
                },
                set tStart(e) {
                    x = e
                },
                set tProcess(e) {
                    R = e
                },
                plainpost: m,
                post: B.post,
                framepost: _.a.request,
                _getreq: function() {
                    return new XMLHttpRequest
                },
                request: g,
                preload: u.preload,
                invalidate: u.invalidate,
                tGetParam: function() {
                    if (x && D) {
                        var e = [T - x, R - T, C - R, L - x, D];
                        for (var t in e)
                            if (e.hasOwnProperty(t)) {
                                if (e[t] < 0) return !1;
                                if (!e[t] && 0 !== e[t]) return !1
                            }
                        return x = !1, e.join(",")
                    }
                },
                AjaxRequest: B,
                AjaxCancellationToken: class {
                    _setCancelCb(e) {
                        this._cancel = e
                    }
                    cancel() {
                        this._cancel && this._cancel()
                    }
                },
                frame: _.a.frame,
                _framenext: () => _.a.frame._nextQueueItem(),
                framegot: (e, t, o) => _.a.frame.useAjaxBlock(e, t, o),
                _frameover: (e, t) => _.a.frame.finalize(e, t),
                _framedone: (e, t) => _.a.frame.onReady([e, t]),
                _debugLog: q
            },
            W = o("eQf/"),
            H = o("gdug"),
            K = o("k487");

        function V(e, t) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
                var o = Object(w.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(o, icoNode), icoNode = o
            }
        }
        var G = o("HhI8"),
            Q = o("7jxN"),
            z = (o("rE2o"), o("ioFf"), o("a1Th"), o("Egk5"));

        function X(e, t) {
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

        function $() {
            return new function(e) {
                var t, o = function(e) {
                        var t = X(e.split("#"), 2),
                            o = t[0],
                            i = t[1],
                            n = X(o.split("?"), 2),
                            r = n[0],
                            s = n[1];
                        return r + (s ? "?" + Object(a.toQueryString)(Object(a.fromQueryString)(s)) : "") + (i ? "#" + i : "")
                    },
                    i = Object(d.i)({
                        onLocChange: () => {}
                    }, e),
                    n = function() {
                        var e = "";
                        return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), o(e.replace(/^(\/|!)/, ""))
                    },
                    r = n(),
                    s = function(e) {
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
                        1 == vk.al && s(!0), 3 == vk.al ? (Object(z.b)(window, "popstate", s), H.a.safari && Object(z.b)(window, "hashchange", s)) : "onhashchange" in window ? Object(z.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : s()
                        }) : t = setInterval(s, 200)
                    },
                    setOptions: function(e) {
                        i = Object(d.i)(i, e)
                    },
                    checker: s,
                    stop: function() {
                        vk.al < 3 ? clearInterval(t) : 3 == vk.al && Object(z.h)(window, "popstate", s)
                    }
                }
            }({
                onLocChange: function(e) {
                    var t = {
                        back: !0,
                        hist: !0
                    };
                    3 === vk.al && history.state && Object(d.x)(history.state) && (t.scrollTop = Object(d.r)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
                }
            })
        }
        var J = o("lXE5"),
            Y = o("Ia1d"),
            Z = o("XuKo"),
            ee = o("ErRf"),
            te = o("/PiP"),
            oe = {
                sh: function(e, t) {
                    Object(w.vb)(e), Object(d.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(w.X)(e), Object(d.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, o, i) {
                    var n = "layers" + (boxQueue.count() + 1);
                    Object(ee.c)(n, function() {}), Object(w.sb)(e, {
                        opacity: o || "",
                        backgroundColor: i || ""
                    }), oe.visible || (Object(G.c)(), Object(J.a)()), oe.visible || Object(Y.e)(), oe.visible = !0, Object(w.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(w.ib)(t, "box_layer_hidden") : Object(w.vb)(t), oe.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    oe.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(ee.a)(e), t && t.visibilityHide ? Object(w.a)(t, "box_layer_hidden") : Object(w.X)(t), Object(w.bb)(layerWrap) || cur._inLayer || Object(w.bb)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(w.bb)(window.mvLayerWrap)) || Object(w.bb)(window.wkLayerWrap) || (oe.visible = !1, Object(w.ib)(bodyNode, "layers_shown"), Object(G.c)(!0), Object(J.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), oe.visible || Object(Y.f)()
                }
            },
            ie = {
                push: function(e) {
                    var t, o = !!ie.count() && ie._layers[ie._layers.length - 1];
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
                        VideoPlaylist.getCurListId() && (n = Object(d.i)(n, {
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
                    return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || ie._layers.push(t), ie.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = ie._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    ie._bl = !0, window.WkView && oe.fullhide == WkView.hide ? (Object(w.X)(wkLayerWrap), clearTimeout(wkcur.showT)) : oe.fullhide && oe.fullhide(!0, !0), setTimeout(ie.unblock, 5)
                },
                unblock: function() {
                    ie._bl = !1
                },
                pop: function() {
                    if (ie.count() && !ie._bl) {
                        var e = ie._layers.pop();
                        if (ie.skipVideo && (ie.skipVideo = !1, "video" == e[0])) return ie._layers.push(e), void(ie.skipVideo = !1);
                        "photo" === e[0] ? (Object(d.i)(e[3], {
                            fromQueue: !0
                        }), Object(te.y)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(d.i)(e[3], {
                            fromQueue: !0
                        }), Object(Y.i)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(te.C)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(Z.c)(e[1]) : "podcast" === e[0] && Object(te.A)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, o, i) {
                    for (var n = ie._layers, r = n.length; r > 0; --r)
                        if (n[r - 1][0] == e && n[r - 1][1] == t || n[r - 1][0] == o && n[r - 1][1] == i) return ie._layers = n.slice(0, r), ie.pop(), !0;
                    return !1
                },
                count: function() {
                    return ie._layers.length
                },
                clear: function() {
                    ie._layers = []
                },
                _layers: []
            };
        var ne = o("Xrg9");

        function re() {
            var e = {};
            Object(d.f)(Object(w.H)("_short_currency"), function() {
                var t = Object(w.t)(this, "short") || "";
                if (!t) return !0;
                var o = this.innerHTML,
                    i = Object(d.M)(o).length,
                    n = Object(w.P)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[n]) {
                    for (var r = "", a = i - 1; a >= 0; a--) r += "&#8399;";
                    var s = Object(w.e)("div", {
                        innerHTML: `<b>${o}</b><b>${r}</b>`
                    }, {
                        fontFamily: n,
                        fontSize: "24px"
                    });
                    Object(w.G)("utils").appendChild(s), e[n] = Math.abs(s.firstChild.offsetWidth - s.lastChild.offsetWidth) >= 2 * i, Object(w.gb)(s)
                }!1 === e[n] && Object(w.Ab)(this, t)
            })
        }
        var ae = o("0gG3"),
            se = o("XzvV"),
            ce = o("v+DW"),
            de = o("lkNA");
        var we = class {
                constructor() {
                    var e = window.CallHub;
                    this.on = 0, this.hub = new e(() => {
                        this.onShow && this.onShow()
                    }, 2), this.hintsHub = new e(() => this.showStartHints(), 2)
                }
                load() {
                    Object(w.G)("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", () => this.hub.done()), ajax.post("hints.php", {
                        act: "a_start_hints"
                    }, {
                        onDone: e => {
                            this.startHintsText = Object(d.H)(e), this.hintsHub.done()
                        }
                    }))
                }
                show(e) {
                    var t = window.placeholderSetup;
                    if (Object(w.G)("quick_search") && !this.on) return this.on = 1, Object(w.vb)(this.sCont), t("search_input"), Object(w.G)("search_input").setAttribute("autocomplete", "off"), Object(w.a)(Object(w.G)("qsearch_link"), "active"), this.prev_content = Object(w.G)("content"), this.qsearch_cont || (this.qsearch_cont = Object(w.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(z.c)(e) : void 0
                }
                go(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(d.H)(Object(w.G)("search_input").value) + "&name=1";
                    return Object(z.c)(e || window.event), location.href = t, !1
                }
                init(e) {
                    this.sCont = Object(w.G)("quick_search"), this.opt = e || {}
                }
                hide(e, t) {
                    if (Object(w.G)("quick_search") && (!this.active || t) && this.on) {
                        var o = window.toggleFlash;
                        if (this.on = 0, o(), this.beforeHide && this.beforeHide()) return !0;
                        Object(w.G)("search_input").setValue ? Object(w.G)("search_input").setValue("") : Object(w.G)("search_input").value = "", Object(w.X)(this.sCont), Object(w.ib)(Object(w.G)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }
                preload() {}
            },
            _e = o("Bszp"),
            le = o("MSYF"),
            ue = o("kHqu");

        function he(e, t) {
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
        var pe = "remixjsp";

        function be() {
            ! function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("paint").forEach(e => {
                    "first-contentful-paint" === e.name && Oe(e.startTime, "TTFCP")
                })
            }(),
            function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(e => {
                    if ("navigation" === e.initiatorType) {
                        var t = e.domComplete,
                            o = e.domContentLoadedEventEnd,
                            i = e.loadEventEnd;
                        Oe(t, "domComplete"), Oe(o, "domContentLoadedEventEnd"), Oe(i, "loadEventEnd")
                    }
                })
            }(), ge()
        }
        var fe = [],
            me = !1;

        function ge() {
            if (me) {
                var e = window.performance,
                    t = fe[fe.length - 1];
                if (!t) return me = !1, void Oe(-1);
                var o = t.startTime + t.duration;
                e.now() - o >= 3e3 ? Oe(o, "TTI") : setTimeout(ge, 3e3)
            }
        }
        var ve = [];

        function Oe(e, t) {
            var o = Math.floor(e);
            if (-1 !== e && (ve.push([o, t]), !(me ? "TTI" === t : ve.length > 2))) return;
            var i = "unknown",
                n = navigator.connection;
            n && n.effectiveType && (i = n.effectiveType);
            var a = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            ve.forEach(e => {
                var t = he(e, 2),
                    o = t[0],
                    n = t[1];
                return a.events.push([n, o, cur.module, i, window.vk.rv])
            }), Object(r.d)(pe, JSON.stringify(a), .01)
        }

        function ye() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(e => {
                fe = fe.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), me = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout(be, 0)
            }) : be()
        }
        var Ee = {
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
            je = o("1BRX"),
            Pe = o("El3O"),
            ke = o("EasH"),
            Se = o("kcIO"),
            xe = o("MiCK"),
            Te = o("Ieup"),
            Re = o("FWc3"),
            Ce = o("t/FQ"),
            De = .5,
            Le = .25,
            Me = 300,
            Ie = 1e3,
            Ae = 3e5,
            Be = 2500,
            Ne = 5e3,
            qe = 6e3,
            Ue = 2e4,
            Fe = 1e3,
            We = 36e4,
            He = "_longViewType",
            Ke = "_longViewIdled",
            Ve = "_longViewModule",
            Ge = "_longViewStarted",
            Qe = "_longViewProcessed",
            ze = "_longViewCached",
            Xe = "_longViewHeight",
            $e = "_longViewTop",
            Je = "_longViewBottom",
            Ye = "REGULAR",
            Ze = "AUTOPLAY_AD",
            et = "LongView.viewed",
            tt = "LongView.idled",
            ot = vk.longViewTestGroup,
            it = [],
            nt = [],
            rt = [],
            at = Date.now(),
            st = 0,
            ct = 0,
            dt = !1,
            wt = null,
            _t = null,
            lt = null,
            ut = null,
            ht = {};

        function pt() {
            var e = Mt();
            e.length && (Rt(e), It())
        }

        function bt() {
            it.forEach(function(e) {
                e[ze] = !1
            })
        }

        function ft(e, t) {
            "im" === t && !e[He] && function(e) {
                if (Object(w.W)(e, "im-mess--post")) return !0;
                var t = e && Object(w.v)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(w.W)(e, "no_posts"))
            }(e) && (e[He] = function(e) {
                var t = e && Object(w.v)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? Ze : Ye
            }(e), e[Ve] = t, it.push(e))
        }

        function mt(e, t) {
            var o = mt;
            ! function(e, t) {
                var o = [];
                it.forEach(function(i) {
                    Ut(i) ? o.push(i) : ! function(e, t, o) {
                        return !e[Ge] && Bt(e, De, t, o)
                    }(i, e, t) ? function(e, t, o) {
                        return e[Ge] && !Bt(e, Le, t, o)
                    }(i, e, t) && (i[Ke] ? delete i[Ke] : (Ft(nt, i), rt = rt.concat(qt(i))), delete i[Ge]) : (i[Ge] = Date.now(), nt.push(i))
                }), o.forEach(function(e) {
                    Ft(it, e)
                })
            }(e || Object(J.e)(), t || window.innerHeight), dt ? (clearTimeout(o.timer), o.timer = setTimeout(gt, 150)) : (dt = !0, jt(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(w.I)("im-page--chat-header"),
                        t = Object(w.I)("im-page--chat-input");
                    st = e.getBoundingClientRect().top + e.offsetHeight, ct = window.innerHeight - t.getBoundingClientRect().top
                } else st = Object(w.G)("page_header").offsetHeight, ct = 0
            }())
        }

        function gt() {
            jt(), Et(), dt = !1
        }

        function vt() {
            jt(), Tt()
        }

        function Ot() {
            rt = [], nt.forEach(e => e[Ge] = Date.now()), Ct(null), Dt(null), Et()
        }

        function yt() {
            jt(), Tt(), rt = [], nt = [], Ct(null), Dt(null)
        }

        function Et() {
            wt = setTimeout(Pt, Be), _t = setTimeout(kt, Ne), lt = setTimeout(St, qe), ut = setTimeout(xt, Ue)
        }

        function jt() {
            clearTimeout(wt), clearTimeout(_t), clearTimeout(lt), clearTimeout(ut)
        }

        function Pt() {
            rt.length && Ct(rt)
        }

        function kt() {
            Rt(rt), rt = [], Ct(null)
        }

        function St() {
            nt.length && (Dt(Nt(nt, !0, !0)), lt = setTimeout(St, Fe))
        }

        function xt() {
            clearTimeout(lt), Rt(Nt(nt)), nt.forEach(e => e[Ke] = !0), nt = [], Dt(null)
        }

        function Tt() {
            Rt(rt.concat(Nt(nt)))
        }

        function Rt(e) {
            e && e.length && ajax.post("/al_page.php", {
                act: "seen",
                data: function(e) {
                    var t = {};
                    e.forEach(function(e) {
                        var o = e.ownerId,
                            i = "ad" === o ? "" : ":" + e.duration + ":" + e.index;
                        t[o] || (t[o] = []), t[o].push(e.module + e.postId + i + (e.sessionId ? ":" + e.sessionId : "") + (e.q ? ":" + e.q : "") + ":" + e.viewIndex)
                    });
                    var o = [];
                    return Object(d.f)(t, (e, t) => o.push(e + "_" + t.join(","))), o.join(";")
                }(e),
                long_view: 1
            })
        }

        function Ct(e) {
            Lt(et, e)
        }

        function Dt(e) {
            Lt(tt, e)
        }

        function Lt(e, t) {
            var o = ne.a.get(e) || {};
            t ? o[at] = t : delete o[at], ne.a.set(e, o)
        }

        function Mt() {
            var e = Mt,
                t = [],
                o = ne.a.get(et) || {},
                i = ne.a.get(tt) || {};
            return e.iterator || (e.iterator = (e => o => {
                At(o) && (t = t.concat(e[o]))
            })), Object.keys(o).forEach(e.iterator(o)), Object.keys(i).forEach(e.iterator(i)), t
        }

        function It() {
            var e = It,
                t = ne.a.get(et) || {},
                o = ne.a.get(tt) || {};
            e.iterator || (e.iterator = (e => t => {
                At(t) && delete e[t]
            })), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), ne.a.set(et, t), ne.a.set(tt, o)
        }

        function At(e) {
            var t = Number(e);
            return t !== at && Date.now() - t >= We
        }

        function Bt(e, t, o, i) {
            if (!e) return !1;
            e[ze] || (e[ze] = !0, e[Xe] = e.offsetHeight, e[$e] = o + e.getBoundingClientRect().top, e[Je] = e[$e] + e[Xe]);
            var n = i - st - ct,
                r = o + st,
                a = o + i - ct,
                s = e[Xe],
                c = e[$e],
                d = e[Je];
            return (d > r && c < a ? Math.min(a, d) - Math.max(r, c) : 0) >= Math.min(n * t, s * t)
        }

        function Nt(e, t, o) {
            return e.map(e => qt(e, t, o))
        }

        function qt(e, t, o) {
            if (Ut(e)) return [];
            var i = Math.min(Ae, Date.now() - e[Ge]);
            if (e[He] === Ye && i < Me || e[He] === Ze && i < Ie) return [];
            o || (e[Qe] = !0);
            var n = function(e) {
                    var t = e[Ve];
                    if ("im" === t) {
                        var o = Object(w.c)(e, "data-post-id"),
                            i = Object(w.c)(e, "data-copy"),
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
                r = function(e) {
                    return {
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
                    }["feed_other" === e ? `feed_${cur.section}` : e] || "u"
                }(n.module),
                a = cur.feed_session_id || "na",
                s = [];
            for (var c in n)
                if ("index" !== c && "module" !== c && "q" !== c) {
                    var d = c.split("_"),
                        _ = d[0],
                        l = d[1];
                    "ads" === _ && (l = d[3]), /^post\d+$/.test(_) && (_ = d[1], l = d[2]);
                    var u = void 0;
                    t || (ht[u = _ + "_" + l] || (ht[u] = 0), ht[u]++), s.push("ad" === _ ? {
                        ownerId: "ad",
                        postId: l,
                        module: r,
                        viewIndex: ht[u]
                    } : "ads" === _ ? {
                        ownerId: "ads",
                        postId: l,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        viewIndex: ht[u]
                    } : {
                        ownerId: _,
                        postId: (1 === n[c] ? "" : "-") + l,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        q: n.q || null,
                        viewIndex: ht[u]
                    })
                }
            return s
        }

        function Ut(e) {
            return "page_view" === ot && e[Qe] || !document.body.contains(e)
        }

        function Ft(e, t) {
            var o = e.indexOf(t);
            o >= 0 && e.splice(o, 1)
        }
        var Wt = o("QGEU"),
            Ht = o("eNQP"),
            Kt = o("o7bv"),
            Vt = o("wetz"),
            Gt = o("BJj/"),
            Qt = o("i6oL"),
            zt = o("m0N1");
        o("/8Fb");
        var Xt = o("W0P9"),
            $t = 5e3,
            Jt = "push_notifier_endpoint",
            Yt = "push_notifier_subscribed_ts",
            Zt = 6e4,
            eo = 432e6;
        class to {
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
                return ne.a.get(Jt + vk.id) || !1
            }
            saveEndpoint(e) {
                ne.a.set(Jt + vk.id, e || !1)
            }
            action(e, t) {
                return this.sw.action(e, t)
            }
            _needupdate(e) {
                var t = Date.now(),
                    o = this.loadEndpoint(),
                    i = ne.a.get(Yt + vk.id),
                    n = !1;
                return (o !== e.endpoint || !i || t - i > Zt) && (ne.a.set(Yt + vk.id, t), n = !0), n
            }
            listenPermission() {
                Object(c.a)("push_notifier") && navigator.permissions && navigator.permissions.query && navigator.permissions.query({
                    name: "notifications"
                }).then(e => {
                    e.onchange = (() => this.update())
                })
            }
            update() {
                return this.updatePermission().then(e => e === to.PUSH_NOTIFIER_PERMISSION_GRANTED ? this.subscribe().catch(e => {
                    e !== to.SUBSCRIBE_ERROR_NETWORK && e("can not update subscribe")
                }) : Promise.reject("premession_not_granted")).catch(Xt.a)
            }
            updatePermission() {
                var e = to.getPermission();
                if (e !== to.PUSH_NOTIFIER_PERMISSION_GRANTED) {
                    var t = this.loadEndpoint();
                    if (t) return this.unsubscribe(t).then(() => e)
                }
                return Promise.resolve(e)
            }
            processSubscribe(e) {
                return e.subscribe({
                    userVisibleOnly: !0,
                    applicationServerKey: function(e) {
                        for (var t = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), o = window.atob(t), i = new Uint8Array(o.length), n = 0; n < o.length; ++n) i[n] = o.charCodeAt(n);
                        return i
                    }(to.SERVER_KEY)
                })
            }
            setupSubscription() {
                return new Promise((e, t) => {
                    var o = to.getPermission(),
                        i = () => {
                            this.subscribe(!0).then(() => {
                                e()
                            }).catch(() => {
                                t()
                            })
                        };
                    o !== to.PUSH_NOTIFIER_PERMISSION_DENIED ? o !== to.PUSH_NOTIFIER_PERMISSION_GRANTED ? o === to.PUSH_NOTIFIER_PERMISSION_DEFAULT && this.requestPermission().then(e => {
                        e === to.PUSH_NOTIFIER_PERMISSION_GRANTED ? i() : t()
                    }) : i() : t(to.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS)
                })
            }
            subscribe(e) {
                return this.sw.register().then(e => {
                    var t = e.pushManager;
                    return t.getSubscription().then(e => {
                        if (e) {
                            var o = e.expirationTime;
                            return o && Date.now() > o - eo ? this.unsubscribe(this.loadEndpoint()).then(() => this.processSubscribe(t)) : e
                        }
                        return this.processSubscribe(t)
                    })
                }).then(t => new Promise((o, i) => {
                    if (e || this._needupdate(t)) {
                        var n = t.getKey("p256dh"),
                            r = t.getKey("auth");
                        window.ajax.post(to.SERVER_URL, {
                            act: "a_subscribe",
                            endpoint: t.endpoint,
                            key: n ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("p256dh")))) : null,
                            token: r ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("auth")))) : null
                        }, {
                            onDone: e => {
                                e ? (this.saveEndpoint(t.endpoint), o()) : i()
                            },
                            onFail: () => (i(to.SUBSCRIBE_ERROR_NETWORK), !0)
                        })
                    } else o()
                }))
            }
            unsubscribe(e) {
                return this.sw.register().then(t => t.pushManager.getSubscription().then(t => t ? t.unsubscribe().then(t => t ? new Promise((t, o) => {
                    ajax.post(to.SERVER_URL, {
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
                var e = to.getPermission();
                return e === to.PUSH_NOTIFIER_PERMISSION_DEFAULT ? new Promise(function(e, t) {
                    var o = Notification.requestPermission(function(t) {
                        e(t)
                    });
                    o instanceof Promise && o.then(e, t)
                }) : Promise.resolve(e)
            }
            checkMessageState() {
                return new Promise(e => setTimeout(e, $t)).then(() => this.action("getMessagesMetaData")).then(e => "object" == typeof e && Object.keys(e).length ? new Promise((t, o) => {
                    window.ajax.post(to.SERVER_URL, {
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
                }).then(e => this.action("updateMessageNotifications", e)).catch(e => Object(Xt.a)(e))
            }
        }
        to.SERVER_KEY = "BPrntRk2W1_ISFwlgY-vz9tQDg9i1oSQ3-N8xyjdbNAbIOdZIGFdh5FlO7zn730UwU9Sayoec-Fpqq4JZFTyv60", to.SERVER_URL = "push_notifier", to.PUSH_NOTIFIER_PERMISSION_GRANTED = "granted", to.PUSH_NOTIFIER_PERMISSION_DEFAULT = "default", to.PUSH_NOTIFIER_PERMISSION_DENIED = "denied", to.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS = "BLOCKED_BY_BROWSER_SETTINGS", to.SUBSCRIBE_ERROR_NETWORK = "SUBSCRIBE_ERROR_NETWORK";
        var oo = to;
        var io = class extends oo {
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
                    var o = Object(Se.b)();
                    o && Object(w.X)(o.bodyNode), this.setupSubscription().then(() => this.setState(e, t)).then(() => {
                        o && o.hide(), e ? Object(se.d)("push_notifier_subscribe_via_popup", "msg") : Object(se.d)("push_notifier_subscribe_via_popup", "all")
                    }).catch(e => {
                        oo.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === e ? (Object(w.vb)(o().bodyNode), this.showPopupAllowNotification()) : Object(ke.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                    })
                }
                closePopup() {
                    var e = Object(Se.b)();
                    e && e.hide(), Object(se.d)("push_notifier_subscribe_via_popup", "close")
                }
                showPopupAllowNotification() {
                    var e = Object(ke.b)(oo.SERVER_URL, {
                        act: "popup_allow_notification"
                    }, {
                        params: {
                            hideButtons: !0
                        },
                        containerClass: "PushNotifierPopup__popup-box_type--allow-notification",
                        onFail: () => {
                            e ? e.hide() : Object(ke.d)(getLang("global_error"), getLang("notifications_native_common_error"))
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
                        ajax.post(oo.SERVER_URL, {
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
            no = "sw";

        function ro(e) {
            return {
                type: no,
                data: e
            }
        }

        function ao(e) {
            return ("" === e.origin || e.origin.match(/^https:\/\/([a-zA-Z0-9\-\.]+\.)?vk\.com$/)) && e.data && e.data.data && e.data.type === no
        }

        function so(e, t) {
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
        var co = "/js/cmodules/sw/sw.js",
            wo = "/";
        class _o {
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
                return _o.isSupported() ? this.registration ? Promise.resolve(this.registration) : navigator.serviceWorker.register(_o.addVersion(co), {
                    scope: wo
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
                        ao(e) ? t(e.data.data) : o(new Error("ServiceWorker message is incorrect"))
                    }, this.registration.active.postMessage(ro(e), [i.port2])
                }))
            }
            _onmessage(e) {
                if (ao(e)) {
                    var t = e.data.data;
                    if (t.actions && Array.isArray(t.actions)) {
                        var o = [];
                        t.actions.forEach(t => {
                            var i = so(t, 2),
                                n = i[0],
                                r = i[1],
                                a = "action_" + n;
                            o.push(Promise.resolve(this[a] ? this[a](r, e) : void 0))
                        }), Promise.all(o).then(function(t) {
                            var o = {};
                            t.forEach((e, t) => {
                                void 0 !== e && (o[t] = e)
                            }), Object.keys(o).length && e.ports[0].postMessage(ro({
                                answers: o
                            }))
                        })
                    }
                }
            }
        }
        var lo = window.isMVK ? "mvk" : "web",
            uo = {
                start: function(e, t) {
                    if (t.stopPropagation(), t.preventDefault(), this.id = window.domData(e, "id"), this.id && (window.statlogsValueEvent("special_event", "click", lo, this.id), !this.timeoutHandle)) {
                        var o = Number(window.domData(e, "v")) || 0;
                        this.duration || (this.duration = Number(window.domData(e, "duration")) || 0), this.duration && (!this.animationData || !this.animationData.v || "number" == typeof this.v && this.v !== o ? (this.v = o, this._getAnimation().then(e => (this.animationData = JSON.parse(e), this._loadBodymovin())).then(() => this._play())) : this._play())
                    }
                },
                _getAnimation: function() {
                    return new Promise(e => {
                        var t = new XMLHttpRequest;
                        t.open("GET", `/images/stickers/special/${this.id}/animation.json?v=${this.v}`, !0), t.send(), t.onreadystatechange = (() => {
                            4 === t.readyState && e(t.responseText)
                        })
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
                            e.stop(), e.destroy(), this.frame.style.display = "none", this.timeoutHandle = null, window.statlogsValueEvent("special_event", "showed", lo, this.id)
                        }, this.duration)
                    }
                },
                _loadBodymovin: function() {
                    return new Promise(e => {
                        if (window.bodymovin) e();
                        else if (window.isMVK) {
                            var t = document.createElement("script");
                            t.src = "/js/cmodules/web/bodymovin.js", t.onload = (() => e()), document.head.appendChild(t)
                        } else stManager.add([jsc("web/bodymovin.js")], e)
                    })
                }
            },
            ho = o("B3ia");
        o.d(t, "initAjax", function() {
            return bo
        });
        var po = window.vk;

        function bo() {
            window.ajaxCache = {}, window.globalAjaxCache = {}, window.ajax = F, Object(c.a)("web_ajax_json_object") && (window.ajax.enabled || H.a.search_bot || location.replace("/badbrowser.php"))
        }

        function fo() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, po.width = 960, po.started = Object(d.L)(), po.counts = {}, H.a.android && (Object(r.d)("remixscreen_width", window.screen.width, 365), Object(r.d)("remixscreen_height", window.screen.height, 365), Object(r.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(r.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(r.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(ue.e)(), Object(ae.b)(), Object(z.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(z.h)(vkCache[e].handle.elem)
            }), Object(z.b)(window, "DOMContentLoaded load", function() {
                po.loaded || (po.loaded = !0, Object(ce.y)()), Object(Pe.c)()
            }), Object(z.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(z.b)(document, "keydown", Vt.a)
        }
        var mo = 0;

        function go() {
            if (window.headNode = Object(w.K)("head"), window.icoNode = Object(w.K)("link", headNode), window.bodyNode = Object(w.K)("body"), window.htmlNode = Object(w.K)("html"), window.utilsNode = Object(w.G)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(z.b)(bodyNode, "resize", Pe.j.pbind(!1)), utilsNode) {
                H.a.mozilla ? Object(w.a)(bodyNode, "firefox") : H.a.mobile && Object(w.a)(bodyNode, "mobfixed"), Object(Ce.f)(), Object(ae.a)();
                var e = Object(w.G)("layer_bg"),
                    t = e.nextSibling,
                    o = Object(w.G)("box_layer_bg"),
                    i = o.nextSibling;
                window.layerBG = e, window.boxLayerBG = o, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(w.G)("stl_side"), window._stlLeft = Object(w.G)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, H.a.mobile || Object(Qt.a)(), Object(z.b)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, t, o, i) {
                    return window.layerQueue = ie, Object(d.i)(oe, {
                        show: oe._show.pbind(e, t),
                        boxshow: oe._show.pbind(o, i),
                        wrapshow: oe._show.pbind(e),
                        hide: oe._hide.pbind(e, t),
                        boxhide: oe._hide.pbind(o, i),
                        wraphide: oe._hide.pbind(e)
                    }), oe
                }(e, t, o, i), hab.init(), window._retinaInit ? window._retinaInit() : mo = 1, po.disableSW || (window.PushNotifier = io, window.sw = new _o, window.sw.register().then(() => {
                    window.pushNotifier = new io(window.sw, _o)
                }))
            }
        }

        function vo() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: () => cur.module,
                    getOID: () => cur.oid,
                    doesScrollTriggerIdle: !0
                })), Object(Qt.b)();
                var e = Object(w.G)("side_bar");
                window.pageNode = Object(w.G)("page_wrap"), window._fixedNav = e && "fixed" === Object(w.P)(e, "position"), window._tbLink = Object(w.G)("top_back_link"), H.a.chrome || H.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = H.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(d.L)() - po.started, 10),
                    o = Object(d.r)((po.contlen || 1) / t * 1e3);
                H.a.mozilla && H.a.version >= 4 ? o /= 2.5 : H.a.mozilla ? o *= 1.5 : H.a.msie && H.a.version >= 7 ? o /= 1.5 : H.a.msie && (o *= 2.5);
                var i = Object(d.r)(150 * Math.max(2e6 / o, 1));
                if (ae.d.highlimit = 6 * i, ae.d.lowlimit = Math.min(i, 600), Object(Pe.j)(), setTimeout(Pe.j.pbind(!1), 0), Object(Wt.c)(), window.addEventListener("scroll", Pe.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !po.id && ne.a.checkVersion() && ne.a.get("last_reloaded")) try {
                    var n = {};
                    Object(d.f)(["sound_notify_off", "im_ui_notify_off"], (e, t) => {
                        var o = ne.a.get(t);
                        null !== o && (n[t] = o)
                    }), window.localStorage.clear(), Object(d.f)(n, (e, t) => ne.a.set(e, t))
                } catch (e) {}
            }
        }
        class Oo {
            constructor(e, t) {
                this.count = t || 1, this.func = e
            }
            done() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                this.count -= e, this.count <= 0 && this.func()
            }
        }

        function yo(e) {
            po.loaded ? e() : Object(z.b)(window, "load", e)
        }

        function Eo() {
            window.showWriteMessageBox = Te.g, window.giftsBox = Te.a, window.moneyTransferBox = Te.d, window.reportAd = Te.e, window.mobilePromo = Te.c, window.showAudioClaimWarning = Te.f, window.menuSettings = Te.b, window.sureDeleteAll = Te.h, window.TopNotifier = Object(te.m)(), window.showPhoto = te.y, window.showManyPhoto = te.x, window.showAlbums = te.v, window.showAlbum = te.u, window.showPhotoTags = te.z, window.isPhotoeditor3Available = te.p, window.AudioMessagePlayer = te.a, window.showVideoTags = te.B, window.videoCallback = te.D, window.showWiki = te.C, window.showApp = te.w, window.showPodcast = te.A, window.podcastStartFrom = te.s, window.articlePrepare = te.b, window.isArticleLayerOpen = te.o, window.isArticleEditorAvailable = te.n, window.openArticleEditor = te.r, window.mentionOver = xe.c, window.mentionClick = te.q, window.mobileOnlineTip = xe.d, window.pageVerifiedTip = xe.e, window.audioShowActionTooltip = xe.a, window.shareAudioPlaylist = te.t, window.getAudioPlayer = te.k, window.deleteAudioOnClaim = te.j, window.initTopAudioPlayer = te.l, window.bookmark = te.c, window.bookmarkPost = te.i, window.bookmarkArticle = te.d, window.bookmarkLink = te.f, window.bookmarkPodcast = te.h, window.bookmarkNarrative = te.g, window.bookmarkEvent = te.e, window.bookmarkTooltip = xe.b, window.showStory = Z.c, window.showNarrative = Z.b, window.storiesPreloadStatic = Z.d, window.sendMask = Z.a
        }
        window.constants = {
            Groups: Ee
        }, window.partConfigEnabled = c.a, Object(w.Y)(), window.ge = w.G, window.geByTag = w.J, window.geByTag1 = w.K, window.geByClass = w.H, window.geByClass1 = w.I, window.gpeByClass = w.U, window.domQuery = w.C, window.domQuery1 = w.D, window.domClosest = w.o, window.ce = w.e, window.cf = w.f, window.re = w.gb, window.se = w.nb, window.sech = w.ob, window.rs = w.mb, window.psr = w.fb, window.domReplaceEl = w.E, window.domEL = w.u, window.domNS = w.z, window.domPS = w.B, window.domFC = w.v, window.domLC = w.y, window.domPN = w.A, window.domChildren = w.n, window.domInsertBefore = w.x, window.domInsertAfter = w.w, window.domByClass = w.k, window.domData = w.t, window.domChildIndex = w.m, window.domCA = w.l, window.domClosestSibling = w.s, window.matchesSelector = w.eb, window.isHover = w.ab, window.isAncestor = w.Z, window.getScroll = w.N, window.domClosestPositioned = w.r, window.domClosestOverflowHidden = w.q, window.show = w.vb, window.hide = w.X, window.isVisible = w.bb, window.clientHeight = w.h, window.getClientRectOffsetY = w.L, window.toggle = w.wb, window.boundingRectEnabled = w.d, window.getXYRect = w.S, window.getXY = w.R, window.isWindow = w.cb, window.getSize = w.O, window.hasClass = w.W, window.addClass = w.a, window.addClassDelayed = w.b, window.removeClass = w.ib, window.removeClassDelayed = w.jb, window.toggleClass = w.xb, window.toggleClassDelayed = w.yb, window.replaceClass = w.lb, window.getStyle = w.P, window.setStyle = w.sb, window.setStyleDelayed = w.tb, window.setPseudoStyle = w.rb, window.data = w.j, window.attr = w.c, window.removeAttr = w.hb, window.removeData = w.kb, window.cleanElems = w.g, window.setTitle = w.ub, window.getZoom = w.T, window.val = w.Ab, window.elfocus = w.F, window.traverseParent = w.zb, window.getH = w.M, window.getW = w.Q, window.domClosestByTag = w.p, window.setDocumentTitle = w.pb, window.lockDocumentTitle = w.db, window.KEY = z.a, window.addEvent = z.b, window.removeEvent = z.h, window.triggerEvent = z.j, window.cancelEvent = z.c, window.stopEvent = z.i, window.normEvent = z.g, window.checkEvent = z.d, window.checkKeyboardEvent = z.e, window.checkOver = z.f, Object(d.q)(), window.isRetina = d.y, window.extractUrls = d.j, window.serializeForm = d.F, window.addTemplates = d.a, window.getTemplate = d.n, window.rand = d.D, window.irand = d.s, window.isUndefined = d.A, window.isFunction = d.v, window.isArray = d.t, window.isString = d.z, window.isObject = d.x, window.isEmpty = d.u, window.vkNow = d.L, window.vkImage = d.J, window.trim = d.H, window.stripHTML = d.G, window.escapeRE = d.h, window.intval = d.r, window.floatval = d.k, window.positive = d.C, window.isNumeric = d.w, window.winToUtf = d.M, window.replaceEntities = d.E, window.clean = d.c, window.unclean = d.I, window.each = d.f, window.indexOf = d.p, window.inArray = d.o, window.clone = d.d, window.arrayKeyDiff = d.b, window.extend = d.i, window.vkLocal = d.K, window.lTimeout = d.B, window.getCaretCharacterOffsetWithin = d.m, window.formatCount = d.l, window.encodeHtml = d.g, window.decodeHtml = d.e, bo(), window.AjaxConvert = a, window.ajx2q = a.toQueryString, window.q2ajx = a.fromQueryString, window.requestBox = W.b, window.activateMobileBox = W.a, window.validateMobileBox = W.c, window.validatePassBox = W.e, Object(r.c)(), window.getCookie = r.a, window.setCookie = r.d, window.hideCookiesPolicy = r.b, Object(I.d)(), window.debugLog = I.c, window.debugEl = I.b, window.isToday = je.d, window.isYesterday = je.f, window.isTomorrow = je.e, window.isSameDate = je.c, window.leadingZero = je.g, window.formatTime = je.a, window.getServerTime = je.b, window.parseLatin = O.o, window.parseCyr = O.m, window.parseLatKeys = O.n, window.langNumeric = O.i, window.langSex = O.j, window.langStr = O.k, window.addLangKeys = O.a, window.getLang = O.d, window.langDate = O.h, window.getShortDate = O.e, window.getShortDateOrTime = O.f, window.langWordNumeric = O.l, window.getDateText = O.c, window.getBigDateNew = O.b, window.getSmDate = O.g, window.scrollToY = J.g, window.scrollToTop = J.f, window.scrollGetX = J.d, window.scrollGetY = J.e, window.disableBodyScroll = J.a, window.enableBodyScroll = J.b, window.Chat = Ce.a, window.__qlTimer = null, window.__qlClear = Ce.b, window.onLoginDone = Ce.m, window.onLoginFailed = Ce.n, window.onLoginCaptcha = Ce.l, window.onLoginReCaptcha = Ce.o, window.storePasswordCredential = Ce.p, window.cssAnim = Ce.c, window.imagesLoader = Ce.e, window.nodeUpdated = Ce.k, window.hideNewsAnnounce = Ce.d, window.leftAdBlockClose = Ce.h, window.leftBlockToggleFriend = Ce.j, window.leftBlockFriendTooltip = Ce.i, window.placeholderSetup = Kt.c, window.placeholderInit = Kt.b, window.isInputActive = Kt.a, window.showTooltip = Re.c, window.showTitle = Re.b, window.showHint = Re.a, window.topMsg = n.d, window.showMsg = n.b, window.topError = n.c, window.showGlobalPrg = n.a, window.checkTextLength = y.b, window.getSelectionText = y.d, window.goAway = y.e, window.debounce = Gt.a, window.hashCode = y.g, window.isFullScreen = y.h, window.parallel = y.k, window.parseJSON = y.l, window.shuffle = y.m, window.throttle = y.n, window.toggleOnline = y.q, window.updateMoney = y.s, window.onlinePlatformClass = y.j, window.Fx = Q.a, window.fx = Q.a, window.animate = Q.b, window.cubicBezier = Q.d, window.fadeTo = Q.g, window.genFx = Q.i, window.getRGB = Q.k, window.getColor = Q.j, window.slideDown = Q.l, window.slideUp = Q.n, window.slideToggle = Q.m, window.fadeIn = Q.e, window.fadeOut = Q.f, window.fadeToggle = Q.h, window.animateCount = Q.c, window.updateAriaElements = Wt.c, window.updateAriaCheckboxes = Wt.b, window.hasAccessibilityMode = Wt.a, window.cancelStackFilter = ee.a, window.cancelStackPush = ee.c, window.cancelStackPop = ee.b, Object(ho.a)(), window.ElementTooltip = K.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = V, 1 === po.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== po.al || history.pushState || (po.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), po.version = !1), Object(ae.c)(), window.stManager = ae.d, Object(H.c)(), window.browser = H.a, window.mobPlatforms = H.d, window.browserFeatures = H.b, Object(G.a)(), window.toggleFlash = G.c, window.renderFlash = G.b, fo(), window.updateHeaderStyles = ue.i, window.updateNarrow = Pe.m, window.checkPageBlocks = Pe.c, window.redraw = Pe.l, window.onBodyResize = Pe.j, window.onBodyScroll = Pe.k, window.leftBlockOver = Pe.i, window.leftBlockOut = Pe.h, window.leftBlockHide = Pe.g, window.onDocumentClick = Vt.c, window.onEnter = Vt.d, window.onCtrlEnter = Vt.b, window.logLeftMenuClicks = se.a, window.autosizeSetup = Pe.b, window.getProgressBarEl = Pe.e, window.getProgressHtml = Pe.f, Object(zt.b)(), ye(), window.onDomReady = (e => e()), window.currentModule = (() => cur.currentModule ? cur.currentModule() : cur.module), window.hab = $(), window.ls = ne.a, window.shortCurrency = re, window.statlogsValueEvent = se.d, window.saveSearchAttemptStats = se.c, window.removeSearchPositionTracker = se.b, window.callHub = Oo, window.CallHub = Oo, window.gSearch = new we, window.zNav = ue.l, window.handlePageView = ue.d, window.handlePageParams = ue.c, window.handlePageCount = ue.b, window.updateOtherCounters = ue.k, window.processDestroy = ue.f, window.globalHistoryDestroy = ue.a, window.showBackLink = ue.h, window.nav = le.a, nav.init(), po.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds()) / 1e3 - Object(je.b)();
            t -= 10800, t = (t /= 60).toFixed(0), (t *= 60) < -55800 ? t += 86400 : t > 37800 && (t -= 86400);
            var o = 0,
                i = Math.abs(t);
            Object(d.f)([-12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2, -1, 0, 1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12, 12.75, 13, 14], (e, n) => {
                var r = Math.round(3600 * (n - 3)),
                    a = Math.abs(t - r);
                a < i && (i = a, o = r)
            }), po.dt = o, Object(r.a)("remixdt") !== po.dt && Object(r.d)("remixdt", po.dt, 365)
        }, 0), setTimeout(function() {
            var e = Object(d.r)(Object(r.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!H.a.iphone || Object(r.a)("remixme")) ? 1 & e || (Object(r.d)("remixrt", 1 | e, 365), window._retinaInit = function() {
                ae.d.add(["retina.css"]), Object(w.a)(document.body, "is_2x")
            }, mo && window._retinaInit()) : 1 & e && Object(r.d)("remixrt", 1 ^ e, 365)
        }, 0), window.boxQueue = Object(Se.c)(), window.__bq = boxQueue, window.curBox = Se.b, Object(Se.d)(), window.boxRefreshCoords = Se.a, window.MessageBox = ke.a, window.showBox = ke.b, window.showTabbedBox = ke.f, window.showFastBox = ke.d, window.showCaptchaBox = ke.c, window.showReCaptchaBox = ke.e, window.showDoneBox = Se.e, window.TopMenu = Pe.a, window.TopSearch = _e.a, window.handleScroll = y.f, window.loadScript = de.a, window.SpecialEvent = uo, Object(ce.j)(), window.notaBene = ce.q, window.updSideTopLink = ce.y, window.createButton = ce.d, window.actionsMenuItemLocked = ce.a, window.lockActionsMenuItem = ce.n, window.unlockActionsMenuItem = ce.v, window.linkLocked = ce.m, window.lockLink = ce.p, window.unlockLink = ce.x, window.lockButton = ce.o, window.unlockButton = ce.w, window.buttonLocked = ce.b, window.isButtonLocked = ce.k, window.disableButton = ce.f, window.sbWidth = ce.t, window.isChecked = ce.l, window.checkbox = ce.c, window.disable = ce.e, window.radioval = ce.s, window.radiobtn = ce.r, window.showProgress = ce.u, window.hideProgress = ce.i, window.disableEl = ce.g, window.enableEl = ce.h, Object(Y.c)(), window.VideoConstants = Y.a, window.showVideo = Y.i, window.showInlineVideo = Y.h, window.loadInlineVideo = Y.d, window.revertLastInlineVideo = Y.g, window.pauseLastInlineVideo = Y.e, window.playLastInlineVideo = Y.f, window.checkMp4 = Y.b, window.performance && window.performance.memory && Object(d.D)(0, 100) < 5 && Object(Ht.a)(), ot ? (Object(z.b)(window, "blur", vt), Object(z.b)(window, "focus", Ot), onDomReady(() => setTimeout(pt, 500)), window.LongView = {
            register: ft,
            onScroll: Object(y.n)(mt, 50),
            onBeforePageChange: yt,
            clearElemsCache: bt,
            _debug: function() {
                return {
                    started: nt,
                    tracking: it,
                    viewedData: rt,
                    viewIndexes: ht,
                    blindTop: st,
                    blindBottom: ct
                }
            }
        }) : window.LongView = {
            register: () => {},
            onScroll: () => {},
            onBeforePageChange: () => {},
            clearElemsCache: () => {}
        }, Object(Ce.g)(), Eo(), window.onLoaded = yo, window.domStarted = go, window.domReady = vo, Object(I.c)("common module enabled"), ae.d.done(jsc("web/common_web.js"))
    },
    nCnK: function(e, t, o) {
        o("7DDg")("Uint32", 4, function(e) {
            return function(t, o, i) {
                return e(this, t, o, i)
            }
        })
    }
});