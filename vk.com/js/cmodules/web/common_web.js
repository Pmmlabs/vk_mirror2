! function(e) {
    function t(t) {
        for (var i, a, s = t[0], d = t[1], c = t[2], _ = 0, l = []; _ < s.length; _++) a = s[_], n[a] && l.push(n[a][0]), n[a] = 0;
        for (i in d) Object.prototype.hasOwnProperty.call(d, i) && (e[i] = d[i]);
        for (w && w(t); l.length;) l.shift()();
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
    var w = d;
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
                    var t, a, s, d, c, w, _, l, u;
                    if (!(t = e.match(r))) throw new Error("invalid data URI");
                    for (a = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), s = !!t[4], d = e.slice(t[0].length), c = s ? atob(d) : decodeURIComponent(d), w = new ArrayBuffer(c.length), _ = new Uint8Array(w), l = 0; l < c.length; l += 1) _[l] = c.charCodeAt(l);
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
        for (var n = o("ryw6"), r = o("kMSP"), a = (o("91GP"), o("KKXr"), o("cGUQ")), s = o("jE6c"), d = o("W9Tc"), c = o("t7n3"), w = o("zxIV"), _ = o("2QOe"), l = (o("VRzm"), o("nCnK"), new Uint32Array(256)), u = 256; u--;) {
            for (var h = u, p = 8; p--;) h = 1 & h ? 3988292384 ^ h >>> 1 : h >>> 1;
            l[u] = h
        }

        function b(e, t, o, i, n, r, a) {
            var s = arguments.length > 7 && void 0 !== arguments[7] && arguments[7],
                d = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : null,
                c = f(e, t, {
                    xhrOptions: r,
                    sortQueryStringParams: a && !a.noSort,
                    noExtraHeaders: s,
                    urlOnly: n,
                    cancellationToken: a && a.cancellationToken,
                    logger: d
                }),
                w = c._getXhr();
            return c.then(e => o && o(e.data, w.status)).catch(e => i && i(e, w.status)), w
        }

        function f(e, t, o) {
            var i, n = o.xhrOptions,
                r = o.urlOnly,
                s = void 0 !== r && r,
                d = o.sortQueryStringParams,
                w = void 0 === d || d,
                _ = o.noExtraHeaders,
                u = void 0 !== _ && _,
                h = o.cancellationToken,
                p = void 0 === h ? null : h,
                b = o.logger,
                f = void 0 === b ? null : b;
            f && (i = function(e) {
                for (var t = -1, o = 0, i = e.length; o < i; o++) t = t >>> 8 ^ l[255 & t ^ e[o]];
                return (-1 ^ t) >>> 0
            }(e + JSON.stringify(t)), f(`Initialized request #${i} with URL ${e} and query ${JSON.stringify(t)}`));
            var m = new XMLHttpRequest;
            p && p._setCancelCb(() => {
                f && f(`Aborting request #${i}`), m.abort()
            });
            var g = new Promise(function(o, r) {
                var d = "string" != typeof t ? Object(a.toQueryString)(t, !w) : t;
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
                n && Object(c.f)(n, function(e, t) {
                    m[e] = t
                }), s || (m.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), u || m.setRequestHeader("X-Requested-With", "XMLHttpRequest")), f && f(`Sending data for request #${i}`), m.send(d)
            });
            return g._getXhr = (() => m), g
        }
        var m = o("+MXk"),
            g = o("4+be"),
            v = o("aong");
        class O {
            parseResponse(e) {
                var t = [];
                e instanceof Array && (t = e[1], e = e[0]);
                var o = e.replace(/^<!--/, "").replace(/-<>-(!?)>/g, "--$1>");
                Object(c.H)(o).length || (data = [8, Object(g.d)("global_unknown_error")], o = stVersions.nav + "<!><!>" + vk.lang + "<!>" + stVersions.lang + "<!>8<!>" + data[1]);
                var i = o.split("<!>"),
                    n = Object(c.r)(i.shift()),
                    r = i.shift(),
                    a = Object(c.r)(i.shift()),
                    s = Object(c.r)(i.shift());
                return t && (i = i.concat(t)), {
                    navVersion: n,
                    newStatic: r,
                    langId: a,
                    langVer: s,
                    code: Object(c.r)(i.shift()),
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
                                o[i] = Object(v.l)(n);
                                break;
                            case "int":
                                o[i] = Object(c.r)(n);
                                break;
                            case "float":
                                o[i] = Object(c.k)(n);
                                break;
                            case "bool":
                                o[i] = !!Object(c.r)(n);
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
        class y {
            parseResponse(e) {
                var t = this.parseStaticPayload(e);
                return {
                    navVersion: Object(c.r)(t.loaderVersion),
                    newStatic: t.static,
                    langId: Object(c.r)(t.langPack),
                    langVer: Object(c.r)(t.langVersion),
                    code: Object(c.r)(t.payload[0]),
                    payload: t.payload[1],
                    debugLog: t.debugLog
                }
            }
            parseStaticPayload(e, t) {
                var o = e;
                return e && "string" == typeof e && (o = JSON.parse(e)), o.payload && o.payload[0] > 0 && (o.payload[1] = o.payload[1].map(e => "string" == typeof e ? JSON.parse(e) : e)), o
            }
        }
        var E = 1,
            j = 2;
        class P {
            constructor(e) {
                this._switchProto(e)
            }
            parseResponse(e) {
                return this.impl instanceof O && this._isNewProto(e) && this._switchProto(j), this.impl instanceof y && this._isOldProto(e) && this._switchProto(E), this.impl.parseResponse(e)
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
                    case E:
                        this.impl = new O;
                        break;
                    case j:
                        this.impl = new y;
                        break;
                    default:
                        Object(n.c)("Fallback to legacy protocol.", {
                            type: 204
                        }), this.impl = new O
                }
            }
        }
        var k, S, T, x, R, D, L, M = o("98sY");

        function C() {
            return (C = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = arguments[t];
                    for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i])
                }
                return e
            }).apply(this, arguments)
        }
        class I {
            static post(e, t, o) {
                I._protoAdapter = new P(Object(d.a)("web_ajax_json_object") ? j : E), "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
                var i = C({}, o || {}, {
                        _captcha: !1,
                        _box: !1,
                        no_ads_params: !1
                    }),
                    n = C({}, t, {
                        al: i.frame ? -1 : 1
                    }),
                    r = Object(c.L)(),
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
                return new I(e, n, i)._post()
            }
            constructor(e, t, o) {
                this._url = e, this._options = C({}, o), this._query = t, this._additionalStaticLoader = null, o.local && (this.onDone = Object(c.K)(this.onDone), this.onFail = Object(c.K)(this.onFail), this.processResponse = Object(c.K)(this.processResponse)), this._cacheKey = null, this._options.cache && (this._cacheKey = B(this._url, this._query, this._options)), this.onDone = this.onDone.bind(this), this.onFail = this.onFail.bind(this), this.processResponse = this.processResponse.bind(this)
            }
            _post() {
                if (!this._query.captcha_sid && this._options.showProgress && this._options.showProgress(), window.__adsGetAjaxParams && !this._options.no_ads_params && (this._query = C({}, this._query, window.__adsGetAjaxParams(this._query, this._options))), this._options.stat && (this._additionalStaticLoader = null, stManager.add(this._options.stat, () => {
                        this._additionalStaticLoader && this._additionalStaticLoader(), this._options.stat = !1
                    })), this._options.cache > 0 || this._options.forceGlobalCache) {
                    var e = window.ajaxCache[this._cacheKey];
                    if (e && e._loading) return void e._callbacks.push(this.processResponse);
                    if (e && !this._options.forceGlobalCache) return this.processResponse(0, e), void(3 === this._options.cache && delete window.ajaxCache[this._cacheKey]);
                    if (e = window.globalAjaxCache[this._cacheKey]) return -1 === e || Object(c.v)(e) ? window.globalAjaxCache[this._cacheKey] = this._options.onDone : this._options.onDone.apply(window, e), void(this._options.hideProgress && this._options.hideProgress())
                }
                window.ajaxCache[this._cacheKey] = {
                    _loading: 1,
                    _callbacks: []
                }, this._options.resend = ((e, t) => new I(this._url, e, t)._post()), window.debuglogSent ? (this._reqid = window.debuglogSent(this._url + (this._query ? ": " + Object(a.toQueryString)(this._query, this._options.noSort).replace(/&/g, "&amp;") : "")), this._options.frame && (window._lfrid = this._reqid)) : this._reqid = 0;
                var t = {};
                return this._options.timeout && (t.timeout = this._options.timeout), this._options.frame ? _.a.request(this._url, this._query, this.onDone, this._options) : b(this._url, this._query, this.onDone, this.onFail, !1, t, this._options, !1, Object(d.a)("client_debug_log") ? e => console.log("+ XHR Transport: " + e) : null)
            }
            processResponse(e, t) {
                if (this._options.cache) {
                    var o = window.ajaxCache[this._cacheKey];
                    o && o._loading && (setTimeout(function() {
                        for (var i in o._callbacks) o._callbacks.hasOwnProperty(i) && o._callbacks[i](e, t)
                    }, 0), delete window.ajaxCache[this._cacheKey])
                }
                if (this._options.stat) return this._options.stat = !1, void(this._additionalStaticLoader = this.processResponse.pbind(e, t));
                this._options.cache && !this._options.forceGlobalCache && (e || (window.ajaxCache[this._cacheKey] = t)), this._options.hideProgress && this._options.hideProgress(), 2 !== e && (this._options._captcha && (this._options._suggest && Object(w.g)(this._options._suggest), this._options._captcha = q(this._options._captcha), this._options._suggest = this._options._captcha), this._options._box = q(this._options._box)),
                    function(e) {
                        switch (e) {
                            case 1:
                                return m.c;
                            case 2:
                                return m.k;
                            case 3:
                                return m.a;
                            case 4:
                                return m.e;
                            case 5:
                                return m.j;
                            case 6:
                                return m.f;
                            case 7:
                                return m.m;
                            case 8:
                                return m.l;
                            case 9:
                                return m.n;
                            case 10:
                                return m.o;
                            case 11:
                            case 12:
                                return Object(m.g)(e);
                            case 13:
                                return m.d;
                            case 14:
                                return m.h;
                            case 15:
                                return m.i;
                            default:
                                return Object(m.b)(e)
                        }
                    }(e)(this._options, t, this._query, this._url), window.LazyLoad && window.LazyLoad.scanDelayed()
            }
            onFail(e, t) {
                this._options.hideProgress && this._options.hideProgress(), this._options._suggest && Object(w.g)(this._options._suggest);
                var o = t instanceof XMLHttpRequest ? t.status : t;
                if (this._options._box = q(this._options._captcha, this._options._box), this._options._captcha = this._options._box, this._options._suggest = this._options._captcha, "string" == typeof e && -1 !== e.indexOf("The page is temporarily unavailable") && __dev && Object(c.o)(vk.id, [100])) this._post();
                else if (!this._options.onFail || !0 !== this._options.onFail(e)) {
                    var i = JSON.stringify(e).substr(0, 300),
                        n = this._query.act,
                        r = this._query && Object(a.toQueryString)(this._query, this._options.noSort),
                        s = this._url,
                        d = {
                            message: "Uncaught ajax error",
                            status: o,
                            data: {
                                url: s,
                                query: r
                            }
                        },
                        _ = [`url: ${s}`, n && `act: ${n}`, i && `text: ${i}`].filter(e => e).join(", ");
                    Object(M.e)(_, {
                        environment: "uncaughtAjaxRequestError",
                        breadcrumb: d
                    }), __debugMode ? console.error("Uncaught Ajax request error:", i, d) : console.log("Uncaught Ajax request error:", i, d)
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
                this._options.bench && (S = (new Date).getTime()), this._options.frame && A("OnDone Req:", e);
                var o, i = t instanceof XMLHttpRequest ? t.status : t;
                try {
                    o = I._protoAdapter.parseResponse(e)
                } catch (t) {
                    return void this.onFail(e, i)
                }
                var r, d = o,
                    _ = d.navVersion,
                    l = d.newStatic,
                    u = d.langId,
                    h = d.langVer,
                    p = d.code,
                    b = d.payload,
                    f = d.debugLog,
                    m = Object(c.d)(b);
                (Object(c.f)(m, (e, t) => m[e] = ("string" == typeof t ? t : JSON.stringify(t)).substr(0, 100)), L = JSON.stringify(m), _) ? vk.version && vk.version !== _ ? _ && b.length > 4 ? this.doReload(2) : nav.strLoc ? location.replace(s.j) : Object(n.c)("Server error.", {
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
                        r = I._protoAdapter.parseStaticPayload(b, this._reqid), f && N(f, this._reqid)
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

        function A() {
            if (Object(d.a)("client_debug_log")) {
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

        function B(e, t, o) {
            var i = Object(c.d)(t);
            return delete i.al, delete i.al_ad, delete i.ads_section, delete i.ads_showed, delete i.captcha_sid, delete i.captcha_key, delete i._smt, delete i._preload, e + "#" + Object(a.toQueryString)(i, o && o.noSort)
        }

        function N(e, t) {
            window.debuglogGot && window.debuglogGot(t, e)
        }

        function q() {
            for (var e = 0, t = arguments.length; e < t; ++e) {
                var o = arguments[e];
                o && o.isVisible() && (o.setOptions({
                    onHide: !1,
                    onDestroy: !1
                }), o.hide())
            }
            return !1
        }
        _.a.frame.setHandlers(e => D = e, e => R = e, A);
        var U = {
                enabled: function() {
                    try {
                        return !!new XMLHttpRequest
                    } catch (e) {
                        return !1
                    }
                }(),
                get lastResp() {
                    return L
                },
                set tStart(e) {
                    k = e
                },
                set tProcess(e) {
                    T = e
                },
                plainpost: b,
                post: I.post,
                framepost: _.a.request,
                _getreq: function() {
                    return new XMLHttpRequest
                },
                request: f,
                preload: function(e, t, o) {
                    "/" !== e.substr(0, 1) && (e = "/" + e), window.ajaxCache[e + "#" + Object(a.toQueryString)(t)] = o
                },
                invalidate: function(e, t) {
                    void 0 === e ? window.ajaxCache = {} : delete window.ajaxCache[B(e, t)]
                },
                tGetParam: function() {
                    if (k && R) {
                        var e = [S - k, T - S, x - T, D - k, R];
                        for (var t in e)
                            if (e.hasOwnProperty(t)) {
                                if (e[t] < 0) return !1;
                                if (!e[t] && 0 !== e[t]) return !1
                            }
                        return k = !1, e.join(",")
                    }
                },
                AjaxRequest: I,
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
                _debugLog: N
            },
            F = o("eQf/"),
            W = o("gdug"),
            H = o("k487");

        function K(e, t) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
                var o = Object(w.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(o, icoNode), icoNode = o
            }
        }
        var V = o("HhI8"),
            G = o("7jxN"),
            Q = (o("rE2o"), o("ioFf"), o("a1Th"), o("Egk5"));

        function z(e, t) {
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

        function X() {
            return new function(e) {
                var t, o = function(e) {
                        var t = z(e.split("#"), 2),
                            o = t[0],
                            i = t[1],
                            n = z(o.split("?"), 2),
                            r = n[0],
                            s = n[1];
                        return r + (s ? "?" + Object(a.toQueryString)(Object(a.fromQueryString)(s)) : "") + (i ? "#" + i : "")
                    },
                    i = Object(c.i)({
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
                        1 == vk.al && s(!0), 3 == vk.al ? (Object(Q.b)(window, "popstate", s), W.a.safari && Object(Q.b)(window, "hashchange", s)) : "onhashchange" in window ? Object(Q.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : s()
                        }) : t = setInterval(s, 200)
                    },
                    setOptions: function(e) {
                        i = Object(c.i)(i, e)
                    },
                    checker: s,
                    stop: function() {
                        vk.al < 3 ? clearInterval(t) : 3 == vk.al && Object(Q.h)(window, "popstate", s)
                    }
                }
            }({
                onLocChange: function(e) {
                    var t = {
                        back: !0,
                        hist: !0
                    };
                    3 === vk.al && history.state && Object(c.x)(history.state) && (t.scrollTop = Object(c.r)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
                }
            })
        }
        var $ = o("lXE5"),
            J = o("Ia1d"),
            Y = o("XuKo"),
            Z = o("ErRf"),
            ee = o("/PiP"),
            te = {
                sh: function(e, t) {
                    Object(w.vb)(e), Object(c.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(w.X)(e), Object(c.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, o, i) {
                    var n = "layers" + (boxQueue.count() + 1);
                    Object(Z.c)(n, function() {}), Object(w.sb)(e, {
                        opacity: o || "",
                        backgroundColor: i || ""
                    }), te.visible || (Object(V.c)(), Object($.a)()), te.visible || Object(J.f)(), te.visible = !0, Object(w.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(w.ib)(t, "box_layer_hidden") : Object(w.vb)(t), te.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    te.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(Z.a)(e), t && t.visibilityHide ? Object(w.a)(t, "box_layer_hidden") : Object(w.X)(t), Object(w.bb)(layerWrap) || cur._inLayer || Object(w.bb)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(w.bb)(window.mvLayerWrap)) || Object(w.bb)(window.wkLayerWrap) || (te.visible = !1, Object(w.ib)(bodyNode, "layers_shown"), Object(V.c)(!0), Object($.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), te.visible || Object(J.g)()
                }
            },
            oe = {
                push: function(e) {
                    var t, o = !!oe.count() && oe._layers[oe._layers.length - 1];
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
                        VideoPlaylist.getCurListId() && (n = Object(c.i)(n, {
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
                    return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || oe._layers.push(t), oe.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = oe._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    oe._bl = !0, window.WkView && te.fullhide == WkView.hide ? (Object(w.X)(wkLayerWrap), clearTimeout(wkcur.showT)) : te.fullhide && te.fullhide(!0, !0), setTimeout(oe.unblock, 5)
                },
                unblock: function() {
                    oe._bl = !1
                },
                pop: function() {
                    if (oe.count() && !oe._bl) {
                        var e = oe._layers.pop();
                        if (oe.skipVideo && (oe.skipVideo = !1, "video" == e[0])) return oe._layers.push(e), void(oe.skipVideo = !1);
                        "photo" === e[0] ? (Object(c.i)(e[3], {
                            fromQueue: !0
                        }), Object(ee.y)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(c.i)(e[3], {
                            fromQueue: !0
                        }), Object(J.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(ee.C)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(Y.c)(e[1]) : "podcast" === e[0] && Object(ee.A)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, o, i) {
                    for (var n = oe._layers, r = n.length; r > 0; --r)
                        if (n[r - 1][0] == e && n[r - 1][1] == t || n[r - 1][0] == o && n[r - 1][1] == i) return oe._layers = n.slice(0, r), oe.pop(), !0;
                    return !1
                },
                count: function() {
                    return oe._layers.length
                },
                clear: function() {
                    oe._layers = []
                },
                _layers: []
            };
        var ie = o("Xrg9");

        function ne() {
            var e = {};
            Object(c.f)(Object(w.H)("_short_currency"), function() {
                var t = Object(w.t)(this, "short") || "";
                if (!t) return !0;
                var o = this.innerHTML,
                    i = Object(c.M)(o).length,
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
        var re = o("0gG3"),
            ae = o("XzvV"),
            se = o("v+DW"),
            de = o("lkNA");
        var ce = class {
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
                            this.startHintsText = Object(c.H)(e), this.hintsHub.done()
                        }
                    }))
                }
                show(e) {
                    var t = window.placeholderSetup;
                    if (Object(w.G)("quick_search") && !this.on) return this.on = 1, Object(w.vb)(this.sCont), t("search_input"), Object(w.G)("search_input").setAttribute("autocomplete", "off"), Object(w.a)(Object(w.G)("qsearch_link"), "active"), this.prev_content = Object(w.G)("content"), this.qsearch_cont || (this.qsearch_cont = Object(w.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(Q.c)(e) : void 0
                }
                go(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(c.H)(Object(w.G)("search_input").value) + "&name=1";
                    return Object(Q.c)(e || window.event), location.href = t, !1
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
            we = o("Bszp"),
            _e = o("MSYF"),
            le = o("kHqu");

        function ue(e, t) {
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
        var he = "remixjsp";

        function pe() {
            ! function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("paint").forEach(e => {
                    "first-contentful-paint" === e.name && ve(e.startTime, "TTFCP")
                })
            }(),
            function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(e => {
                    if ("navigation" === e.initiatorType) {
                        var t = e.domComplete,
                            o = e.domContentLoadedEventEnd,
                            i = e.loadEventEnd;
                        ve(t, "domComplete"), ve(o, "domContentLoadedEventEnd"), ve(i, "loadEventEnd")
                    }
                })
            }(), me()
        }
        var be = [],
            fe = !1;

        function me() {
            if (fe) {
                var e = window.performance,
                    t = be[be.length - 1];
                if (!t) return fe = !1, void ve(-1);
                var o = t.startTime + t.duration;
                e.now() - o >= 3e3 ? ve(o, "TTI") : setTimeout(me, 3e3)
            }
        }
        var ge = [];

        function ve(e, t) {
            var o = Math.floor(e);
            if (-1 !== e && (ge.push([o, t]), !(fe ? "TTI" === t : ge.length > 2))) return;
            var i = "unknown",
                n = navigator.connection;
            n && n.effectiveType && (i = n.effectiveType);
            var a = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            ge.forEach(e => {
                var t = ue(e, 2),
                    o = t[0],
                    n = t[1];
                return a.events.push([n, o, cur.module, i, window.vk.rv])
            }), Object(r.d)(he, JSON.stringify(a), .01)
        }

        function Oe() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(e => {
                be = be.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), fe = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout(pe, 0)
            }) : pe()
        }
        var ye = {
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
            Ee = o("1BRX"),
            je = o("El3O"),
            Pe = o("EasH"),
            ke = o("kcIO"),
            Se = o("MiCK"),
            Te = o("Ieup"),
            xe = o("FWc3"),
            Re = o("t/FQ"),
            De = .5,
            Le = .25,
            Me = 300,
            Ce = 1e3,
            Ie = 3e5,
            Ae = 2500,
            Be = 5e3,
            Ne = 6e3,
            qe = 2e4,
            Ue = 1e3,
            Fe = 36e4,
            We = "_longViewType",
            He = "_longViewIdled",
            Ke = "_longViewModule",
            Ve = "_longViewStarted",
            Ge = "_longViewProcessed",
            Qe = "_longViewCached",
            ze = "_longViewHeight",
            Xe = "_longViewTop",
            $e = "_longViewBottom",
            Je = "REGULAR",
            Ye = "AUTOPLAY_AD",
            Ze = "LongView.viewed",
            et = "LongView.idled",
            tt = vk.longViewTestGroup,
            ot = [],
            it = [],
            nt = [],
            rt = Date.now(),
            at = 0,
            st = 0,
            dt = !1,
            ct = null,
            wt = null,
            _t = null,
            lt = null,
            ut = {};

        function ht() {
            var e = Mt();
            e.length && (xt(e), Ct())
        }

        function pt() {
            ot.forEach(function(e) {
                e[Qe] = !1
            })
        }

        function bt(e, t) {
            "im" === t && !e[We] && function(e) {
                if (Object(w.W)(e, "im-mess--post")) return !0;
                var t = e && Object(w.v)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(w.W)(e, "no_posts"))
            }(e) && (e[We] = function(e) {
                var t = e && Object(w.v)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? Ye : Je
            }(e), e[Ke] = t, ot.push(e))
        }

        function ft(e, t) {
            var o = ft;
            ! function(e, t) {
                var o = [];
                ot.forEach(function(i) {
                    qt(i) ? o.push(i) : ! function(e, t, o) {
                        return !e[Ve] && At(e, De, t, o)
                    }(i, e, t) ? function(e, t, o) {
                        return e[Ve] && !At(e, Le, t, o)
                    }(i, e, t) && (i[He] ? delete i[He] : (Ut(it, i), nt = nt.concat(Nt(i))), delete i[Ve]) : (i[Ve] = Date.now(), it.push(i))
                }), o.forEach(function(e) {
                    Ut(ot, e)
                })
            }(e || Object($.e)(), t || window.innerHeight), dt ? (clearTimeout(o.timer), o.timer = setTimeout(mt, 150)) : (dt = !0, Et(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(w.I)("im-page--chat-header"),
                        t = Object(w.I)("im-page--chat-input");
                    at = e.getBoundingClientRect().top + e.offsetHeight, st = window.innerHeight - t.getBoundingClientRect().top
                } else at = Object(w.G)("page_header").offsetHeight, st = 0
            }())
        }

        function mt() {
            Et(), yt(), dt = !1
        }

        function gt() {
            Et(), Tt()
        }

        function vt() {
            nt = [], it.forEach(e => e[Ve] = Date.now()), Rt(null), Dt(null), yt()
        }

        function Ot() {
            Et(), Tt(), nt = [], it = [], Rt(null), Dt(null)
        }

        function yt() {
            ct = setTimeout(jt, Ae), wt = setTimeout(Pt, Be), _t = setTimeout(kt, Ne), lt = setTimeout(St, qe)
        }

        function Et() {
            clearTimeout(ct), clearTimeout(wt), clearTimeout(_t), clearTimeout(lt)
        }

        function jt() {
            nt.length && Rt(nt)
        }

        function Pt() {
            xt(nt), nt = [], Rt(null)
        }

        function kt() {
            it.length && (Dt(Bt(it, !0, !0)), _t = setTimeout(kt, Ue))
        }

        function St() {
            clearTimeout(_t), xt(Bt(it)), it.forEach(e => e[He] = !0), it = [], Dt(null)
        }

        function Tt() {
            xt(nt.concat(Bt(it)))
        }

        function xt(e) {
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
                    return Object(c.f)(t, (e, t) => o.push(e + "_" + t.join(","))), o.join(";")
                }(e),
                long_view: 1
            })
        }

        function Rt(e) {
            Lt(Ze, e)
        }

        function Dt(e) {
            Lt(et, e)
        }

        function Lt(e, t) {
            var o = ie.a.get(e) || {};
            t ? o[rt] = t : delete o[rt], ie.a.set(e, o)
        }

        function Mt() {
            var e = Mt,
                t = [],
                o = ie.a.get(Ze) || {},
                i = ie.a.get(et) || {};
            return e.iterator || (e.iterator = (e => o => {
                It(o) && (t = t.concat(e[o]))
            })), Object.keys(o).forEach(e.iterator(o)), Object.keys(i).forEach(e.iterator(i)), t
        }

        function Ct() {
            var e = Ct,
                t = ie.a.get(Ze) || {},
                o = ie.a.get(et) || {};
            e.iterator || (e.iterator = (e => t => {
                It(t) && delete e[t]
            })), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), ie.a.set(Ze, t), ie.a.set(et, o)
        }

        function It(e) {
            var t = Number(e);
            return t !== rt && Date.now() - t >= Fe
        }

        function At(e, t, o, i) {
            if (!e) return !1;
            e[Qe] || (e[Qe] = !0, e[ze] = e.offsetHeight, e[Xe] = o + e.getBoundingClientRect().top, e[$e] = e[Xe] + e[ze]);
            var n = i - at - st,
                r = o + at,
                a = o + i - st,
                s = e[ze],
                d = e[Xe],
                c = e[$e];
            return (c > r && d < a ? Math.min(a, c) - Math.max(r, d) : 0) >= Math.min(n * t, s * t)
        }

        function Bt(e, t, o) {
            return e.map(e => Nt(e, t, o))
        }

        function Nt(e, t, o) {
            if (qt(e)) return [];
            var i = Math.min(Ie, Date.now() - e[Ve]);
            if (e[We] === Je && i < Me || e[We] === Ye && i < Ce) return [];
            o || (e[Ge] = !0);
            var n = function(e) {
                    var t = e[Ke];
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
            for (var d in n)
                if ("index" !== d && "module" !== d && "q" !== d) {
                    var c = d.split("_"),
                        _ = c[0],
                        l = c[1];
                    "ads" === _ && (l = c[3]), /^post\d+$/.test(_) && (_ = c[1], l = c[2]);
                    var u = void 0;
                    t || (ut[u = _ + "_" + l] || (ut[u] = 0), ut[u]++), s.push("ad" === _ ? {
                        ownerId: "ad",
                        postId: l,
                        module: r,
                        viewIndex: ut[u]
                    } : "ads" === _ ? {
                        ownerId: "ads",
                        postId: l,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        viewIndex: ut[u]
                    } : {
                        ownerId: _,
                        postId: (1 === n[d] ? "" : "-") + l,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        q: n.q || null,
                        viewIndex: ut[u]
                    })
                }
            return s
        }

        function qt(e) {
            return "page_view" === tt && e[Ge] || !document.body.contains(e)
        }

        function Ut(e, t) {
            var o = e.indexOf(t);
            o >= 0 && e.splice(o, 1)
        }
        var Ft = o("QGEU"),
            Wt = o("eNQP"),
            Ht = o("o7bv"),
            Kt = o("wetz"),
            Vt = o("BJj/"),
            Gt = o("i6oL"),
            Qt = o("m0N1");
        o("/8Fb");
        var zt = o("W0P9"),
            Xt = 5e3,
            $t = "push_notifier_endpoint",
            Jt = "push_notifier_subscribed_ts",
            Yt = 6e4,
            Zt = 432e6;
        class eo {
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
                return ie.a.get($t + vk.id) || !1
            }
            saveEndpoint(e) {
                ie.a.set($t + vk.id, e || !1)
            }
            action(e, t) {
                return this.sw.action(e, t)
            }
            _needupdate(e) {
                var t = Date.now(),
                    o = this.loadEndpoint(),
                    i = ie.a.get(Jt + vk.id),
                    n = !1;
                return (o !== e.endpoint || !i || t - i > Yt) && (ie.a.set(Jt + vk.id, t), n = !0), n
            }
            listenPermission() {
                Object(d.a)("push_notifier") && navigator.permissions && navigator.permissions.query && navigator.permissions.query({
                    name: "notifications"
                }).then(e => {
                    e.onchange = (() => this.update())
                })
            }
            update() {
                return this.updatePermission().then(e => e === eo.PUSH_NOTIFIER_PERMISSION_GRANTED ? this.subscribe().catch(e => {
                    e !== eo.SUBSCRIBE_ERROR_NETWORK && e("can not update subscribe")
                }) : Promise.reject("premession_not_granted")).catch(zt.a)
            }
            updatePermission() {
                var e = eo.getPermission();
                if (e !== eo.PUSH_NOTIFIER_PERMISSION_GRANTED) {
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
                    }(eo.SERVER_KEY)
                })
            }
            setupSubscription() {
                return new Promise((e, t) => {
                    var o = eo.getPermission(),
                        i = () => {
                            this.subscribe(!0).then(() => {
                                e()
                            }).catch(() => {
                                t()
                            })
                        };
                    o !== eo.PUSH_NOTIFIER_PERMISSION_DENIED ? o !== eo.PUSH_NOTIFIER_PERMISSION_GRANTED ? o === eo.PUSH_NOTIFIER_PERMISSION_DEFAULT && this.requestPermission().then(e => {
                        e === eo.PUSH_NOTIFIER_PERMISSION_GRANTED ? i() : t()
                    }) : i() : t(eo.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS)
                })
            }
            subscribe(e) {
                return this.sw.register().then(e => {
                    var t = e.pushManager;
                    return t.getSubscription().then(e => {
                        if (e) {
                            var o = e.expirationTime;
                            return o && Date.now() > o - Zt ? this.unsubscribe(this.loadEndpoint()).then(() => this.processSubscribe(t)) : e
                        }
                        return this.processSubscribe(t)
                    })
                }).then(t => new Promise((o, i) => {
                    if (e || this._needupdate(t)) {
                        var n = t.getKey("p256dh"),
                            r = t.getKey("auth");
                        window.ajax.post(eo.SERVER_URL, {
                            act: "a_subscribe",
                            endpoint: t.endpoint,
                            key: n ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("p256dh")))) : null,
                            token: r ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("auth")))) : null
                        }, {
                            onDone: e => {
                                e ? (this.saveEndpoint(t.endpoint), o()) : i()
                            },
                            onFail: () => (i(eo.SUBSCRIBE_ERROR_NETWORK), !0)
                        })
                    } else o()
                }))
            }
            unsubscribe(e) {
                return this.sw.register().then(t => t.pushManager.getSubscription().then(t => t ? t.unsubscribe().then(t => t ? new Promise((t, o) => {
                    ajax.post(eo.SERVER_URL, {
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
                var e = eo.getPermission();
                return e === eo.PUSH_NOTIFIER_PERMISSION_DEFAULT ? new Promise(function(e, t) {
                    var o = Notification.requestPermission(function(t) {
                        e(t)
                    });
                    o instanceof Promise && o.then(e, t)
                }) : Promise.resolve(e)
            }
            checkMessageState() {
                return new Promise(e => setTimeout(e, Xt)).then(() => this.action("getMessagesMetaData")).then(e => "object" == typeof e && Object.keys(e).length ? new Promise((t, o) => {
                    window.ajax.post(eo.SERVER_URL, {
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
                }).then(e => this.action("updateMessageNotifications", e)).catch(e => Object(zt.a)(e))
            }
        }
        eo.SERVER_KEY = "BPrntRk2W1_ISFwlgY-vz9tQDg9i1oSQ3-N8xyjdbNAbIOdZIGFdh5FlO7zn730UwU9Sayoec-Fpqq4JZFTyv60", eo.SERVER_URL = "push_notifier", eo.PUSH_NOTIFIER_PERMISSION_GRANTED = "granted", eo.PUSH_NOTIFIER_PERMISSION_DEFAULT = "default", eo.PUSH_NOTIFIER_PERMISSION_DENIED = "denied", eo.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS = "BLOCKED_BY_BROWSER_SETTINGS", eo.SUBSCRIBE_ERROR_NETWORK = "SUBSCRIBE_ERROR_NETWORK";
        var to = eo;
        var oo = class extends to {
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
                    var o = Object(ke.b)();
                    o && Object(w.X)(o.bodyNode), this.setupSubscription().then(() => this.setState(e, t)).then(() => {
                        o && o.hide(), e ? Object(ae.d)("push_notifier_subscribe_via_popup", "msg") : Object(ae.d)("push_notifier_subscribe_via_popup", "all")
                    }).catch(e => {
                        to.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === e ? (Object(w.vb)(o().bodyNode), this.showPopupAllowNotification()) : Object(Pe.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                    })
                }
                closePopup() {
                    var e = Object(ke.b)();
                    e && e.hide(), Object(ae.d)("push_notifier_subscribe_via_popup", "close")
                }
                showPopupAllowNotification() {
                    var e = Object(Pe.b)(to.SERVER_URL, {
                        act: "popup_allow_notification"
                    }, {
                        params: {
                            hideButtons: !0
                        },
                        containerClass: "PushNotifierPopup__popup-box_type--allow-notification",
                        onFail: () => {
                            e ? e.hide() : Object(Pe.d)(getLang("global_error"), getLang("notifications_native_common_error"))
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
                        ajax.post(to.SERVER_URL, {
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
            io = "sw";

        function no(e) {
            return {
                type: io,
                data: e
            }
        }

        function ro(e) {
            return ("" === e.origin || e.origin.match(/^https:\/\/([a-zA-Z0-9\-\.]+\.)?vk\.com$/)) && e.data && e.data.data && e.data.type === io
        }

        function ao(e, t) {
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
        var so = "/js/cmodules/sw/sw.js",
            co = "/";
        class wo {
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
                return wo.isSupported() ? this.registration ? Promise.resolve(this.registration) : navigator.serviceWorker.register(wo.addVersion(so), {
                    scope: co
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
                        ro(e) ? t(e.data.data) : o(new Error("ServiceWorker message is incorrect"))
                    }, this.registration.active.postMessage(no(e), [i.port2])
                }))
            }
            _onmessage(e) {
                if (ro(e)) {
                    var t = e.data.data;
                    if (t.actions && Array.isArray(t.actions)) {
                        var o = [];
                        t.actions.forEach(t => {
                            var i = ao(t, 2),
                                n = i[0],
                                r = i[1],
                                a = "action_" + n;
                            o.push(Promise.resolve(this[a] ? this[a](r, e) : void 0))
                        }), Promise.all(o).then(function(t) {
                            var o = {};
                            t.forEach((e, t) => {
                                void 0 !== e && (o[t] = e)
                            }), Object.keys(o).length && e.ports[0].postMessage(no({
                                answers: o
                            }))
                        })
                    }
                }
            }
        }
        var _o = window.isMVK ? "mvk" : "web",
            lo = {
                start: function(e, t) {
                    if (t.stopPropagation(), t.preventDefault(), this.id = window.domData(e, "id"), this.id && (window.statlogsValueEvent("special_event", "click", _o, this.id), !this.timeoutHandle)) {
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
                            e.stop(), e.destroy(), this.frame.style.display = "none", this.timeoutHandle = null, window.statlogsValueEvent("special_event", "showed", _o, this.id)
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
            uo = o("B3ia");
        o.d(t, "initAjax", function() {
            return po
        });
        var ho = window.vk;

        function po() {
            window.ajaxCache = {}, window.globalAjaxCache = {}, window.ajax = U, Object(d.a)("web_ajax_json_object") && (window.ajax.enabled || W.a.search_bot || location.replace("/badbrowser.php"))
        }

        function bo() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, ho.width = 960, ho.started = Object(c.L)(), ho.counts = {}, W.a.android && (Object(r.d)("remixscreen_width", window.screen.width, 365), Object(r.d)("remixscreen_height", window.screen.height, 365), Object(r.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(r.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(r.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(le.e)(), Object(re.b)(), Object(Q.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(Q.h)(vkCache[e].handle.elem)
            }), Object(Q.b)(window, "DOMContentLoaded load", function() {
                ho.loaded || (ho.loaded = !0, Object(se.y)()), Object(je.c)()
            }), Object(Q.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(Q.b)(document, "keydown", Kt.a)
        }
        var fo = 0;

        function mo() {
            if (window.headNode = Object(w.K)("head"), window.icoNode = Object(w.K)("link", headNode), window.bodyNode = Object(w.K)("body"), window.htmlNode = Object(w.K)("html"), window.utilsNode = Object(w.G)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(Q.b)(bodyNode, "resize", je.j.pbind(!1)), utilsNode) {
                W.a.mozilla ? Object(w.a)(bodyNode, "firefox") : W.a.mobile && Object(w.a)(bodyNode, "mobfixed"), Object(Re.f)(), Object(re.a)();
                var e = Object(w.G)("layer_bg"),
                    t = e.nextSibling,
                    o = Object(w.G)("box_layer_bg"),
                    i = o.nextSibling;
                window.layerBG = e, window.boxLayerBG = o, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(w.G)("stl_side"), window._stlLeft = Object(w.G)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, W.a.mobile || Object(Gt.a)(), Object(Q.b)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, t, o, i) {
                    return window.layerQueue = oe, Object(c.i)(te, {
                        show: te._show.pbind(e, t),
                        boxshow: te._show.pbind(o, i),
                        wrapshow: te._show.pbind(e),
                        hide: te._hide.pbind(e, t),
                        boxhide: te._hide.pbind(o, i),
                        wraphide: te._hide.pbind(e)
                    }), te
                }(e, t, o, i), hab.init(), window._retinaInit ? window._retinaInit() : fo = 1, ho.disableSW || (window.PushNotifier = oo, window.sw = new wo, window.sw.register().then(() => {
                    window.pushNotifier = new oo(window.sw, wo)
                }))
            }
        }

        function go() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: () => cur.module,
                    getOID: () => cur.oid,
                    doesScrollTriggerIdle: !0
                })), Object(Gt.b)();
                var e = Object(w.G)("side_bar");
                window.pageNode = Object(w.G)("page_wrap"), window._fixedNav = e && "fixed" === Object(w.P)(e, "position"), window._tbLink = Object(w.G)("top_back_link"), W.a.chrome || W.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = W.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(c.L)() - ho.started, 10),
                    o = Object(c.r)((ho.contlen || 1) / t * 1e3);
                W.a.mozilla && W.a.version >= 4 ? o /= 2.5 : W.a.mozilla ? o *= 1.5 : W.a.msie && W.a.version >= 7 ? o /= 1.5 : W.a.msie && (o *= 2.5);
                var i = Object(c.r)(150 * Math.max(2e6 / o, 1));
                if (re.d.highlimit = 6 * i, re.d.lowlimit = Math.min(i, 600), Object(je.j)(), setTimeout(je.j.pbind(!1), 0), Object(Ft.c)(), window.addEventListener("scroll", je.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !ho.id && ie.a.checkVersion() && ie.a.get("last_reloaded")) try {
                    var n = {};
                    Object(c.f)(["sound_notify_off", "im_ui_notify_off"], (e, t) => {
                        var o = ie.a.get(t);
                        null !== o && (n[t] = o)
                    }), window.localStorage.clear(), Object(c.f)(n, (e, t) => ie.a.set(e, t))
                } catch (e) {}
            }
        }
        class vo {
            constructor(e, t) {
                this.count = t || 1, this.func = e
            }
            done() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                this.count -= e, this.count <= 0 && this.func()
            }
        }

        function Oo(e) {
            ho.loaded ? e() : Object(Q.b)(window, "load", e)
        }

        function yo() {
            window.showWriteMessageBox = Te.g, window.giftsBox = Te.a, window.moneyTransferBox = Te.d, window.reportAd = Te.e, window.mobilePromo = Te.c, window.showAudioClaimWarning = Te.f, window.menuSettings = Te.b, window.sureDeleteAll = Te.h, window.TopNotifier = Object(ee.m)(), window.showPhoto = ee.y, window.showManyPhoto = ee.x, window.showAlbums = ee.v, window.showAlbum = ee.u, window.showPhotoTags = ee.z, window.isPhotoeditor3Available = ee.p, window.AudioMessagePlayer = ee.a, window.showVideoTags = ee.B, window.videoCallback = ee.D, window.showWiki = ee.C, window.showApp = ee.w, window.showPodcast = ee.A, window.podcastStartFrom = ee.s, window.articlePrepare = ee.b, window.isArticleLayerOpen = ee.o, window.isArticleEditorAvailable = ee.n, window.openArticleEditor = ee.r, window.mentionOver = Se.c, window.mentionClick = ee.q, window.mobileOnlineTip = Se.d, window.pageVerifiedTip = Se.e, window.audioShowActionTooltip = Se.a, window.shareAudioPlaylist = ee.t, window.getAudioPlayer = ee.k, window.deleteAudioOnClaim = ee.j, window.initTopAudioPlayer = ee.l, window.bookmark = ee.c, window.bookmarkPost = ee.i, window.bookmarkArticle = ee.d, window.bookmarkLink = ee.f, window.bookmarkPodcast = ee.h, window.bookmarkNarrative = ee.g, window.bookmarkEvent = ee.e, window.bookmarkTooltip = Se.b, window.showStory = Y.c, window.showNarrative = Y.b, window.storiesPreloadStatic = Y.d, window.sendMask = Y.a
        }
        window.constants = {
            Groups: ye
        }, window.partConfigEnabled = d.a, Object(w.Y)(), window.ge = w.G, window.geByTag = w.J, window.geByTag1 = w.K, window.geByClass = w.H, window.geByClass1 = w.I, window.gpeByClass = w.U, window.domQuery = w.C, window.domQuery1 = w.D, window.domClosest = w.o, window.ce = w.e, window.cf = w.f, window.re = w.gb, window.se = w.nb, window.sech = w.ob, window.rs = w.mb, window.psr = w.fb, window.domReplaceEl = w.E, window.domEL = w.u, window.domNS = w.z, window.domPS = w.B, window.domFC = w.v, window.domLC = w.y, window.domPN = w.A, window.domChildren = w.n, window.domInsertBefore = w.x, window.domInsertAfter = w.w, window.domByClass = w.k, window.domData = w.t, window.domChildIndex = w.m, window.domCA = w.l, window.domClosestSibling = w.s, window.matchesSelector = w.eb, window.isHover = w.ab, window.isAncestor = w.Z, window.getScroll = w.N, window.domClosestPositioned = w.r, window.domClosestOverflowHidden = w.q, window.show = w.vb, window.hide = w.X, window.isVisible = w.bb, window.clientHeight = w.h, window.getClientRectOffsetY = w.L, window.toggle = w.wb, window.boundingRectEnabled = w.d, window.getXYRect = w.S, window.getXY = w.R, window.isWindow = w.cb, window.getSize = w.O, window.hasClass = w.W, window.addClass = w.a, window.addClassDelayed = w.b, window.removeClass = w.ib, window.removeClassDelayed = w.jb, window.toggleClass = w.xb, window.toggleClassDelayed = w.yb, window.replaceClass = w.lb, window.getStyle = w.P, window.setStyle = w.sb, window.setStyleDelayed = w.tb, window.setPseudoStyle = w.rb, window.data = w.j, window.attr = w.c, window.removeAttr = w.hb, window.removeData = w.kb, window.cleanElems = w.g, window.setTitle = w.ub, window.getZoom = w.T, window.val = w.Ab, window.elfocus = w.F, window.traverseParent = w.zb, window.getH = w.M, window.getW = w.Q, window.domClosestByTag = w.p, window.setDocumentTitle = w.pb, window.lockDocumentTitle = w.db, window.KEY = Q.a, window.addEvent = Q.b, window.removeEvent = Q.h, window.triggerEvent = Q.j, window.cancelEvent = Q.c, window.stopEvent = Q.i, window.normEvent = Q.g, window.checkEvent = Q.d, window.checkKeyboardEvent = Q.e, window.checkOver = Q.f, Object(c.q)(), window.isRetina = c.y, window.extractUrls = c.j, window.serializeForm = c.F, window.addTemplates = c.a, window.getTemplate = c.n, window.rand = c.D, window.irand = c.s, window.isUndefined = c.A, window.isFunction = c.v, window.isArray = c.t, window.isString = c.z, window.isObject = c.x, window.isEmpty = c.u, window.vkNow = c.L, window.vkImage = c.J, window.trim = c.H, window.stripHTML = c.G, window.escapeRE = c.h, window.intval = c.r, window.floatval = c.k, window.positive = c.C, window.isNumeric = c.w, window.winToUtf = c.M, window.replaceEntities = c.E, window.clean = c.c, window.unclean = c.I, window.each = c.f, window.indexOf = c.p, window.inArray = c.o, window.clone = c.d, window.arrayKeyDiff = c.b, window.extend = c.i, window.vkLocal = c.K, window.lTimeout = c.B, window.getCaretCharacterOffsetWithin = c.m, window.formatCount = c.l, window.encodeHtml = c.g, window.decodeHtml = c.e, po(), window.AjaxConvert = a, window.ajx2q = a.toQueryString, window.q2ajx = a.fromQueryString, window.requestBox = F.b, window.activateMobileBox = F.a, window.validateMobileBox = F.c, window.validatePassBox = F.e, Object(r.c)(), window.getCookie = r.a, window.setCookie = r.d, window.hideCookiesPolicy = r.b, Object(M.d)(), window.debugLog = M.c, window.debugEl = M.b, window.isToday = Ee.d, window.isYesterday = Ee.f, window.isTomorrow = Ee.e, window.isSameDate = Ee.c, window.leadingZero = Ee.g, window.formatTime = Ee.a, window.getServerTime = Ee.b, window.parseLatin = g.o, window.parseCyr = g.m, window.parseLatKeys = g.n, window.langNumeric = g.i, window.langSex = g.j, window.langStr = g.k, window.addLangKeys = g.a, window.getLang = g.d, window.langDate = g.h, window.getShortDate = g.e, window.getShortDateOrTime = g.f, window.langWordNumeric = g.l, window.getDateText = g.c, window.getBigDateNew = g.b, window.getSmDate = g.g, window.scrollToY = $.g, window.scrollToTop = $.f, window.scrollGetX = $.d, window.scrollGetY = $.e, window.disableBodyScroll = $.a, window.enableBodyScroll = $.b, window.Chat = Re.a, window.__qlTimer = null, window.__qlClear = Re.b, window.onLoginDone = Re.m, window.onLoginFailed = Re.n, window.onLoginCaptcha = Re.l, window.onLoginReCaptcha = Re.o, window.storePasswordCredential = Re.p, window.cssAnim = Re.c, window.imagesLoader = Re.e, window.nodeUpdated = Re.k, window.hideNewsAnnounce = Re.d, window.leftAdBlockClose = Re.h, window.leftBlockToggleFriend = Re.j, window.leftBlockFriendTooltip = Re.i, window.placeholderSetup = Ht.c, window.placeholderInit = Ht.b, window.isInputActive = Ht.a, window.showTooltip = xe.c, window.showTitle = xe.b, window.showHint = xe.a, window.topMsg = n.d, window.showMsg = n.b, window.topError = n.c, window.showGlobalPrg = n.a, window.checkTextLength = v.b, window.getSelectionText = v.d, window.goAway = v.e, window.debounce = Vt.a, window.hashCode = v.g, window.isFullScreen = v.h, window.parallel = v.k, window.parseJSON = v.l, window.shuffle = v.m, window.throttle = v.n, window.toggleOnline = v.q, window.updateMoney = v.s, window.onlinePlatformClass = v.j, window.Fx = G.a, window.fx = G.a, window.animate = G.b, window.cubicBezier = G.d, window.fadeTo = G.g, window.genFx = G.i, window.getRGB = G.k, window.getColor = G.j, window.slideDown = G.l, window.slideUp = G.n, window.slideToggle = G.m, window.fadeIn = G.e, window.fadeOut = G.f, window.fadeToggle = G.h, window.animateCount = G.c, window.updateAriaElements = Ft.c, window.updateAriaCheckboxes = Ft.b, window.hasAccessibilityMode = Ft.a, window.cancelStackFilter = Z.a, window.cancelStackPush = Z.c, window.cancelStackPop = Z.b, Object(uo.a)(), window.ElementTooltip = H.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = K, 1 === ho.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== ho.al || history.pushState || (ho.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), ho.version = !1), Object(re.c)(), window.stManager = re.d, Object(W.c)(), window.browser = W.a, window.mobPlatforms = W.d, window.browserFeatures = W.b, Object(V.a)(), window.toggleFlash = V.c, window.renderFlash = V.b, bo(), window.updateHeaderStyles = le.i, window.updateNarrow = je.m, window.checkPageBlocks = je.c, window.redraw = je.l, window.onBodyResize = je.j, window.onBodyScroll = je.k, window.leftBlockOver = je.i, window.leftBlockOut = je.h, window.leftBlockHide = je.g, window.onDocumentClick = Kt.c, window.onEnter = Kt.d, window.onCtrlEnter = Kt.b, window.logLeftMenuClicks = ae.a, window.autosizeSetup = je.b, window.getProgressBarEl = je.e, window.getProgressHtml = je.f, Object(Qt.b)(), Oe(), window.onDomReady = (e => e()), window.currentModule = (() => cur.currentModule ? cur.currentModule() : cur.module), window.hab = X(), window.ls = ie.a, window.shortCurrency = ne, window.statlogsValueEvent = ae.d, window.saveSearchAttemptStats = ae.c, window.removeSearchPositionTracker = ae.b, window.callHub = vo, window.CallHub = vo, window.gSearch = new ce, window.zNav = le.l, window.handlePageView = le.d, window.handlePageParams = le.c, window.handlePageCount = le.b, window.updateOtherCounters = le.k, window.processDestroy = le.f, window.globalHistoryDestroy = le.a, window.showBackLink = le.h, window.nav = _e.a, nav.init(), ho.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === t[1] && 12 === ho.time[1] ? ho.time[1] = 0 : 12 === t[1] && 1 === ho.time[1] ? t[1] = 0 : (t[1] > ho.time[1] + 1 || ho.time[1] > t[1] + 1) && (t[1] = ho.time[1] = t[2] = ho.time[2] = 0), t[1] > ho.time[1] && 1 === t[2] ? 31 === ho.time[2] || (4 === ho.time[1] || 6 === ho.time[1] || 9 === ho.time[1] || 11 === ho.time[1]) && 30 === ho.time[2] || 2 === ho.time[1] && (29 === ho.time[2] || 28 === ho.time[2] && ho.time[0] % 4) ? ho.time[2] = 0 : ho.time[2] = t[2] = 0 : ho.time[1] > t[1] && 1 === ho.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && ho.time[0] % 4) ? t[2] = 0 : t[2] = ho.time[2] = 0), (t[2] > ho.time[2] + 1 || ho.time[2] > t[2] + 1) && (t[2] = ho.time[2] = 0);
            var o = 60 * (60 * (24 * (t[2] - ho.time[2]) + (t[3] - ho.time[3])) + (t[4] - ho.time[4]));
            o < -55800 ? o += 86400 : o > 37800 && (o -= 86400);
            var i = new Date,
                n = Date.UTC(i.getFullYear(), i.getMonth(), i.getDate(), i.getHours(), i.getMinutes(), i.getSeconds()) / 1e3 - Object(Ee.b)();
            n -= 10800, n = (n /= 60).toFixed(0), (n *= 60) < -55800 ? n += 86400 : n > 37800 && (n -= 86400);
            var a = 0,
                s = Math.abs(n);
            Object(c.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], (e, t) => {
                var o = Math.round(3600 * (t - 3)),
                    i = Math.abs(n - o);
                i < s && (s = i, a = o)
            });
            var _ = 0,
                l = Math.abs(o);
            Object(c.f)([-12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2, -1, 0, 1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12, 12.75, 13, 14], (e, t) => {
                var i = Math.round(3600 * (t - 3)),
                    n = Math.abs(o - i);
                n < l && (l = n, _ = i)
            }), Object(ae.d)("timeoffset_new_method", 1, _, a), Object(d.a)("timezone_new_method") ? ho.dt = a : ho.dt = _, Object(r.a)("remixdt") !== ho.dt && Object(r.d)("remixdt", ho.dt, 365);
            var u = Object(c.r)(Object(r.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!W.a.iphone || Object(r.a)("remixme")) ? 1 & u || (Object(r.d)("remixrt", 1 | u, 365), window._retinaInit = function() {
                re.d.add(["retina.css"]), Object(w.a)(document.body, "is_2x")
            }, fo && window._retinaInit()) : 1 & u && Object(r.d)("remixrt", 1 ^ u, 365)
        }, 0), window.boxQueue = Object(ke.c)(), window.__bq = boxQueue, window.curBox = ke.b, Object(ke.d)(), window.boxRefreshCoords = ke.a, window.MessageBox = Pe.a, window.showBox = Pe.b, window.showTabbedBox = Pe.f, window.showFastBox = Pe.d, window.showCaptchaBox = Pe.c, window.showReCaptchaBox = Pe.e, window.showDoneBox = ke.e, window.TopMenu = je.a, window.TopSearch = we.a, window.handleScroll = v.f, window.loadScript = de.a, window.SpecialEvent = lo, Object(se.j)(), window.notaBene = se.q, window.updSideTopLink = se.y, window.createButton = se.d, window.actionsMenuItemLocked = se.a, window.lockActionsMenuItem = se.n, window.unlockActionsMenuItem = se.v, window.linkLocked = se.m, window.lockLink = se.p, window.unlockLink = se.x, window.lockButton = se.o, window.unlockButton = se.w, window.buttonLocked = se.b, window.isButtonLocked = se.k, window.disableButton = se.f, window.sbWidth = se.t, window.isChecked = se.l, window.checkbox = se.c, window.disable = se.e, window.radioval = se.s, window.radiobtn = se.r, window.showProgress = se.u, window.hideProgress = se.i, window.disableEl = se.g, window.enableEl = se.h, Object(J.d)(), window.VideoConstants = J.a, window.showVideo = J.j, window.showInlineVideo = J.i, window.loadInlineVideo = J.e, window.revertLastInlineVideo = J.h, window.destroyInlineVideoPlayer = J.c, window.pauseLastInlineVideo = J.f, window.playLastInlineVideo = J.g, window.checkMp4 = J.b, window.performance && window.performance.memory && Object(c.D)(0, 100) < 5 && Object(Wt.a)(), tt ? (Object(Q.b)(window, "blur", gt), Object(Q.b)(window, "focus", vt), onDomReady(() => setTimeout(ht, 500)), window.LongView = {
            register: bt,
            onScroll: Object(v.n)(ft, 50),
            onBeforePageChange: Ot,
            clearElemsCache: pt,
            _debug: function() {
                return {
                    started: it,
                    tracking: ot,
                    viewedData: nt,
                    viewIndexes: ut,
                    blindTop: at,
                    blindBottom: st
                }
            }
        }) : window.LongView = {
            register: () => {},
            onScroll: () => {},
            onBeforePageChange: () => {},
            clearElemsCache: () => {}
        }, Object(Re.g)(), yo(), window.onLoaded = Oo, window.domStarted = mo, window.domReady = go, Object(M.c)("common module enabled"), re.d.done(jsc("web/common_web.js"))
    },
    nCnK: function(e, t, o) {
        o("7DDg")("Uint32", 4, function(e) {
            return function(t, o, i) {
                return e(this, t, o, i)
            }
        })
    }
});