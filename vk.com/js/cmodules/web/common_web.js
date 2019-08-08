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
        var n = o("ryw6"),
            r = o("kMSP"),
            a = (o("91GP"), o("KKXr"), o("cGUQ")),
            s = o("jE6c"),
            d = o("W9Tc"),
            c = o("t7n3"),
            w = o("zxIV"),
            _ = o("2QOe");
        o("VRzm");

        function l(e, t, o, i, n, r, a) {
            var s = arguments.length > 7 && void 0 !== arguments[7] && arguments[7],
                d = u(e, t, {
                    xhrOptions: r,
                    sortQueryStringParams: a && !a.noSort,
                    noExtraHeaders: s,
                    urlOnly: n,
                    cancellationToken: a && a.cancellationToken
                }),
                c = d._getXhr();
            return d.then(e => o && o(e.data, c.status)).catch(e => i && i(e, c.status)), c
        }

        function u(e, t, o) {
            var i = o.xhrOptions,
                n = o.urlOnly,
                r = void 0 !== n && n,
                s = o.sortQueryStringParams,
                d = void 0 === s || s,
                c = o.noExtraHeaders,
                w = void 0 !== c && c,
                _ = o.cancellationToken,
                l = void 0 === _ ? null : _,
                u = new XMLHttpRequest;
            l && l._setCancelCb(() => u.abort());
            var h = new Promise(function(o, n) {
                var s = "string" != typeof t ? Object(a.toQueryString)(t, !d) : t;
                u.onreadystatechange = function() {
                    if (u.readyState === XMLHttpRequest.DONE)
                        if (u.status >= 200 && u.status < 300) try {
                            o({
                                data: u.responseText,
                                code: u.status
                            })
                        } catch (e) {
                            n({
                                data: u.responseText,
                                code: -1
                            })
                        } else n({
                            data: u.responseText,
                            code: u.status
                        })
                };
                try {
                    u.open("POST", e, !0)
                } catch (e) {
                    n({
                        data: e,
                        code: -1
                    })
                }
                i && each(i, function(e, t) {
                    u[e] = t
                }), r || (u.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), w || u.setRequestHeader("X-Requested-With", "XMLHttpRequest")), u.send(s)
            });
            return h._getXhr = (() => u), h
        }
        var h = o("+MXk"),
            p = o("4+be"),
            b = o("aong");
        class f {
            parseResponse(e) {
                var t = [];
                e instanceof Array && (t = e[1], e = e[0]);
                var o = e.replace(/^<!--/, "").replace(/-<>-(!?)>/g, "--$1>");
                trim(o).length || (data = [8, Object(p.d)("global_unknown_error")], o = stVersions.nav + "<!><!>" + vk.lang + "<!>" + stVersions.lang + "<!>8<!>" + data[1]);
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
                                o[i] = Object(b.l)(n);
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
        class m {
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
        var g, v, O, y, E, j, P, k = 1,
            S = 2;
        class T {
            constructor(e) {
                this._switchProto(e)
            }
            parseResponse(e) {
                return this.impl instanceof f && this._isNewProto(e) && this._switchProto(S), this.impl instanceof m && this._isOldProto(e) && this._switchProto(k), this.impl.parseResponse(e)
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
                    case k:
                        this.impl = new f;
                        break;
                    case S:
                        this.impl = new m;
                        break;
                    default:
                        Object(n.c)("Fallback to legacy protocol.", {
                            type: 204
                        }), this.impl = new f
                }
            }
        }

        function x() {
            return (x = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = arguments[t];
                    for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i])
                }
                return e
            }).apply(this, arguments)
        }
        class R {
            static post(e, t, o) {
                R._protoAdapter = new T(Object(d.a)("web_ajax_json_object") ? S : k), "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
                var i = x({}, o || {}, {
                        _captcha: !1,
                        _box: !1,
                        no_ads_params: !1
                    }),
                    n = x({}, t, {
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
                return new R(e, n, i)._post()
            }
            constructor(e, t, o) {
                this._url = e, this._options = x({}, o), this._query = t, this._additionalStaticLoader = null, o.local && (this.onDone = Object(c.K)(this.onDone), this.onFail = Object(c.K)(this.onFail), this.processResponse = Object(c.K)(this.processResponse)), this._cacheKey = null, this._options.cache && (this._cacheKey = L(this._url, this._query, this._options)), this.onDone = this.onDone.bind(this), this.onFail = this.onFail.bind(this), this.processResponse = this.processResponse.bind(this)
            }
            _post() {
                if (!this._query.captcha_sid && this._options.showProgress && this._options.showProgress(), window.__adsGetAjaxParams && !this._options.no_ads_params && (this._query = x({}, this._query, window.__adsGetAjaxParams(this._query, this._options))), this._options.stat && (this._additionalStaticLoader = null, stManager.add(this._options.stat, () => {
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
                }, this._options.resend = ((e, t) => new R(this._url, e, t)._post()), window.debuglogSent ? (this._reqid = window.debuglogSent(this._url + (this._query ? ": " + Object(a.toQueryString)(this._query, this._options.noSort).replace(/&/g, "&amp;") : "")), this._options.frame && (window._lfrid = this._reqid)) : this._reqid = 0;
                var t = {};
                return this._options.timeout && (t.timeout = this._options.timeout), this._options.frame ? _.a.request(this._url, this._query, this.onDone, this._options) : l(this._url, this._query, this.onDone, this.onFail, !1, t, this._options)
            }
            processResponse(e, t) {
                if (this._options.cache) {
                    var o = window.ajaxCache[this._cacheKey];
                    o && o._loading && (setTimeout(function() {
                        for (var i in o._callbacks) o._callbacks.hasOwnProperty(i) && o._callbacks[i](e, t)
                    }, 0), delete window.ajaxCache[this._cacheKey])
                }
                if (this._options.stat) return this._options.stat = !1, void(this._additionalStaticLoader = this.processResponse.pbind(e, t));
                this._options.cache && !this._options.forceGlobalCache && (e || (window.ajaxCache[this._cacheKey] = t)), this._options.hideProgress && this._options.hideProgress(), 2 !== e && (this._options._captcha && (this._options._suggest && Object(w.g)(this._options._suggest), this._options._captcha = C(this._options._captcha), this._options._suggest = this._options._captcha), this._options._box = C(this._options._box)),
                    function(e) {
                        switch (e) {
                            case 1:
                                return h.c;
                            case 2:
                                return h.k;
                            case 3:
                                return h.a;
                            case 4:
                                return h.e;
                            case 5:
                                return h.j;
                            case 6:
                                return h.f;
                            case 7:
                                return h.m;
                            case 8:
                                return h.l;
                            case 9:
                                return h.n;
                            case 10:
                                return h.o;
                            case 11:
                            case 12:
                                return Object(h.g)(e);
                            case 13:
                                return h.d;
                            case 14:
                                return h.h;
                            case 15:
                                return h.i;
                            default:
                                return Object(h.b)(e)
                        }
                    }(e)(this._options, t, this._query, this._url), window.LazyLoad && window.LazyLoad.scanDelayed()
            }
            onFail(e, t) {
                this._options.hideProgress && this._options.hideProgress(), this._options._suggest && Object(w.g)(this._options._suggest);
                var o = t instanceof XMLHttpRequest ? t.status : t;
                this._options._box = C(this._options._captcha, this._options._box), this._options._captcha = this._options._box, this._options._suggest = this._options._captcha, "string" == typeof e && -1 !== e.indexOf("The page is temporarily unavailable") && __dev && Object(c.o)(vk.id, [100]) ? this._post() : this._options.onFail && !0 === this._options.onFail(e) || Object(n.c)(e, {
                    dt: 5,
                    type: 3,
                    status: o,
                    url: this._url,
                    query: this._query && Object(a.toQueryString)(this._query, this._options.noSort)
                })
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
                this._options.bench && (v = (new Date).getTime()), D("OnDone Req:", e);
                var o, i = t instanceof XMLHttpRequest ? t.status : t;
                try {
                    o = R._protoAdapter.parseResponse(e)
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
                (Object(c.f)(m, (e, t) => m[e] = ("string" == typeof t ? t : JSON.stringify(t)).substr(0, 100)), P = JSON.stringify(m), _) ? vk.version && vk.version !== _ ? _ && b.length > 4 ? this.doReload(2) : nav.strLoc ? location.replace(s.j) : Object(n.c)("Server error.", {
                    type: 100
                }) : (vk.version = !1, this._options.frame && (r = b), vk.lang !== u && this._options.canReload ? this.doReload(3) : function(e, t, o, i, n) {
                    if (!window.stVersions) return;
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
                        r = R._protoAdapter.parseStaticPayload(b, this._reqid), f && M(f, this._reqid)
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

        function D() {
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

        function L(e, t, o) {
            var i = Object(c.d)(t);
            return delete i.al, delete i.al_ad, delete i.ads_section, delete i.ads_showed, delete i.captcha_sid, delete i.captcha_key, delete i._smt, delete i._preload, e + "#" + Object(a.toQueryString)(i, o && o.noSort)
        }

        function M(e, t) {
            window.debuglogGot && window.debuglogGot(t, e)
        }

        function C() {
            for (var e = 0, t = arguments.length; e < t; ++e) {
                var o = arguments[e];
                o && o.isVisible() && (o.setOptions({
                    onHide: !1,
                    onDestroy: !1
                }), o.hide())
            }
            return !1
        }
        _.a.frame.setHandlers(e => j = e, e => E = e, D);
        var I = {
                enabled: function() {
                    try {
                        return !!new XMLHttpRequest
                    } catch (e) {
                        return !1
                    }
                }(),
                get lastResp() {
                    return P
                },
                set tStart(e) {
                    g = e
                },
                set tProcess(e) {
                    O = e
                },
                plainpost: l,
                post: R.post,
                framepost: _.a.request,
                _getreq: function() {
                    return new XMLHttpRequest
                },
                request: u,
                preload: function(e, t, o) {
                    "/" !== e.substr(0, 1) && (e = "/" + e), window.ajaxCache[e + "#" + Object(a.toQueryString)(t)] = o
                },
                invalidate: function(e, t) {
                    void 0 === e ? window.ajaxCache = {} : delete window.ajaxCache[L(e, t)]
                },
                tGetParam: function() {
                    if (g && E) {
                        var e = [v - g, O - v, y - O, j - g, E];
                        for (var t in e)
                            if (e.hasOwnProperty(t)) {
                                if (e[t] < 0) return !1;
                                if (!e[t] && 0 !== e[t]) return !1
                            }
                        return g = !1, e.join(",")
                    }
                },
                AjaxRequest: R,
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
                _debugLog: M
            },
            A = o("eQf/"),
            B = o("gdug"),
            N = o("k487");

        function q(e, t) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
                var o = Object(w.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(o, icoNode), icoNode = o
            }
        }
        var U = o("HhI8"),
            F = o("7jxN"),
            W = (o("rE2o"), o("ioFf"), o("a1Th"), o("Egk5"));

        function H(e, t) {
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

        function K() {
            return new function(e) {
                var t, o = function(e) {
                        var t = H(e.split("#"), 2),
                            o = t[0],
                            i = t[1],
                            n = H(o.split("?"), 2),
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
                        1 == vk.al && s(!0), 3 == vk.al ? (Object(W.b)(window, "popstate", s), B.a.safari && Object(W.b)(window, "hashchange", s)) : "onhashchange" in window ? Object(W.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : s()
                        }) : t = setInterval(s, 200)
                    },
                    setOptions: function(e) {
                        i = Object(c.i)(i, e)
                    },
                    checker: s,
                    stop: function() {
                        vk.al < 3 ? clearInterval(t) : 3 == vk.al && Object(W.h)(window, "popstate", s)
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
        var V = o("lXE5"),
            G = o("Ia1d"),
            Q = o("XuKo"),
            z = o("ErRf"),
            X = o("/PiP"),
            Y = {
                sh: function(e, t) {
                    Object(w.vb)(e), Object(c.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(w.X)(e), Object(c.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, o, i) {
                    var n = "layers" + (boxQueue.count() + 1);
                    Object(z.c)(n, function() {}), Object(w.sb)(e, {
                        opacity: o || "",
                        backgroundColor: i || ""
                    }), Y.visible || (Object(U.c)(), Object(V.a)()), Y.visible || Object(G.f)(), Y.visible = !0, Object(w.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(w.ib)(t, "box_layer_hidden") : Object(w.vb)(t), Y.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    Y.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(z.a)(e), t && t.visibilityHide ? Object(w.a)(t, "box_layer_hidden") : Object(w.X)(t), Object(w.bb)(layerWrap) || cur._inLayer || Object(w.bb)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(w.bb)(window.mvLayerWrap)) || Object(w.bb)(window.wkLayerWrap) || (Y.visible = !1, Object(w.ib)(bodyNode, "layers_shown"), Object(U.c)(!0), Object(V.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), Y.visible || Object(G.g)()
                }
            },
            J = {
                push: function(e) {
                    var t, o = !!J.count() && J._layers[J._layers.length - 1];
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
                    return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || J._layers.push(t), J.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = J._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    J._bl = !0, window.WkView && Y.fullhide == WkView.hide ? (Object(w.X)(wkLayerWrap), clearTimeout(wkcur.showT)) : Y.fullhide && Y.fullhide(!0, !0), setTimeout(J.unblock, 5)
                },
                unblock: function() {
                    J._bl = !1
                },
                pop: function() {
                    if (J.count() && !J._bl) {
                        var e = J._layers.pop();
                        if (J.skipVideo && (J.skipVideo = !1, "video" == e[0])) return J._layers.push(e), void(J.skipVideo = !1);
                        "photo" === e[0] ? (Object(c.i)(e[3], {
                            fromQueue: !0
                        }), Object(X.y)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(c.i)(e[3], {
                            fromQueue: !0
                        }), Object(G.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(X.C)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(Q.c)(e[1]) : "podcast" === e[0] && Object(X.A)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, o, i) {
                    for (var n = J._layers, r = n.length; r > 0; --r)
                        if (n[r - 1][0] == e && n[r - 1][1] == t || n[r - 1][0] == o && n[r - 1][1] == i) return J._layers = n.slice(0, r), J.pop(), !0;
                    return !1
                },
                count: function() {
                    return J._layers.length
                },
                clear: function() {
                    J._layers = []
                },
                _layers: []
            };
        var $ = o("Xrg9");

        function Z() {
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
        var ee = o("0gG3"),
            te = o("XzvV"),
            oe = o("v+DW"),
            ie = o("lkNA");
        var ne = class {
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
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(W.c)(e) : void 0
                }
                go(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(c.H)(Object(w.G)("search_input").value) + "&name=1";
                    return Object(W.c)(e || window.event), location.href = t, !1
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
            re = o("Bszp"),
            ae = o("MSYF"),
            se = o("kHqu");

        function de(e, t) {
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
        var ce = "remixjsp";

        function we() {
            ! function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("paint").forEach(e => {
                    "first-contentful-paint" === e.name && pe(e.startTime, "TTFCP")
                })
            }(),
            function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(e => {
                    if ("navigation" === e.initiatorType) {
                        var t = e.domComplete,
                            o = e.domContentLoadedEventEnd,
                            i = e.loadEventEnd;
                        pe(t, "domComplete"), pe(o, "domContentLoadedEventEnd"), pe(i, "loadEventEnd")
                    }
                })
            }(), ue()
        }
        var _e = [],
            le = !1;

        function ue() {
            if (le) {
                var e = window.performance,
                    t = _e[_e.length - 1];
                if (!t) return le = !1, void pe(-1);
                var o = t.startTime + t.duration;
                e.now() - o >= 3e3 ? pe(o, "TTI") : setTimeout(ue, 3e3)
            }
        }
        var he = [];

        function pe(e, t) {
            var o = Math.floor(e);
            if (-1 !== e && (he.push([o, t]), !(le ? "TTI" === t : he.length > 2))) return;
            var i = "unknown",
                n = navigator.connection;
            n && n.effectiveType && (i = n.effectiveType);
            var a = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            he.forEach(e => {
                var t = de(e, 2),
                    o = t[0],
                    n = t[1];
                return a.events.push([n, o, cur.module, i, window.vk.rv])
            }), Object(r.d)(ce, JSON.stringify(a), .01)
        }

        function be() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(e => {
                _e = _e.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), le = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout(we, 0)
            }) : we()
        }
        var fe = {
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
            me = o("1BRX"),
            ge = o("98sY"),
            ve = o("El3O"),
            Oe = o("EasH"),
            ye = o("kcIO"),
            Ee = o("MiCK"),
            je = o("Ieup"),
            Pe = o("FWc3"),
            ke = o("t/FQ"),
            Se = .5,
            Te = .25,
            xe = 300,
            Re = 1e3,
            De = 3e5,
            Le = 2500,
            Me = 5e3,
            Ce = 6e3,
            Ie = 2e4,
            Ae = 1e3,
            Be = 36e4,
            Ne = "_longViewType",
            qe = "_longViewIdled",
            Ue = "_longViewModule",
            Fe = "_longViewStarted",
            We = "_longViewProcessed",
            He = "_longViewCached",
            Ke = "_longViewHeight",
            Ve = "_longViewTop",
            Ge = "_longViewBottom",
            Qe = "REGULAR",
            ze = "AUTOPLAY_AD",
            Xe = "LongView.viewed",
            Ye = "LongView.idled",
            Je = vk.longViewTestGroup,
            $e = [],
            Ze = [],
            et = [],
            tt = Date.now(),
            ot = 0,
            it = 0,
            nt = !1,
            rt = null,
            at = null,
            st = null,
            dt = null,
            ct = {};

        function wt() {
            var e = xt();
            e.length && (Pt(e), Rt())
        }

        function _t() {
            $e.forEach(function(e) {
                e[He] = !1
            })
        }

        function lt(e, t) {
            "im" === t && !e[Ne] && function(e) {
                if (Object(w.W)(e, "im-mess--post")) return !0;
                var t = e && Object(w.v)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(w.W)(e, "no_posts"))
            }(e) && (e[Ne] = function(e) {
                var t = e && Object(w.v)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? ze : Qe
            }(e), e[Ue] = t, $e.push(e))
        }

        function ut(e, t) {
            var o = ut;
            ! function(e, t) {
                var o = [];
                $e.forEach(function(i) {
                    It(i) ? o.push(i) : ! function(e, t, o) {
                        return !e[Fe] && Lt(e, Se, t, o)
                    }(i, e, t) ? function(e, t, o) {
                        return e[Fe] && !Lt(e, Te, t, o)
                    }(i, e, t) && (i[qe] ? delete i[qe] : (At(Ze, i), et = et.concat(Ct(i))), delete i[Fe]) : (i[Fe] = Date.now(), Ze.push(i))
                }), o.forEach(function(e) {
                    At($e, e)
                })
            }(e || Object(V.e)(), t || window.innerHeight), nt ? (clearTimeout(o.timer), o.timer = setTimeout(ht, 150)) : (nt = !0, gt(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(w.I)("im-page--chat-header"),
                        t = Object(w.I)("im-page--chat-input");
                    ot = e.getBoundingClientRect().top + e.offsetHeight, it = window.innerHeight - t.getBoundingClientRect().top
                } else ot = Object(w.G)("page_header").offsetHeight, it = 0
            }())
        }

        function ht() {
            gt(), mt(), nt = !1
        }

        function pt() {
            gt(), jt()
        }

        function bt() {
            et = [], Ze.forEach(e => e[Fe] = Date.now()), kt(null), St(null), mt()
        }

        function ft() {
            gt(), jt(), et = [], Ze = [], kt(null), St(null)
        }

        function mt() {
            rt = setTimeout(vt, Le), at = setTimeout(Ot, Me), st = setTimeout(yt, Ce), dt = setTimeout(Et, Ie)
        }

        function gt() {
            clearTimeout(rt), clearTimeout(at), clearTimeout(st), clearTimeout(dt)
        }

        function vt() {
            et.length && kt(et)
        }

        function Ot() {
            Pt(et), et = [], kt(null)
        }

        function yt() {
            Ze.length && (St(Mt(Ze, !0, !0)), st = setTimeout(yt, Ae))
        }

        function Et() {
            clearTimeout(st), Pt(Mt(Ze)), Ze.forEach(e => e[qe] = !0), Ze = [], St(null)
        }

        function jt() {
            Pt(et.concat(Mt(Ze)))
        }

        function Pt(e) {
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

        function kt(e) {
            Tt(Xe, e)
        }

        function St(e) {
            Tt(Ye, e)
        }

        function Tt(e, t) {
            var o = $.a.get(e) || {};
            t ? o[tt] = t : delete o[tt], $.a.set(e, o)
        }

        function xt() {
            var e = xt,
                t = [],
                o = $.a.get(Xe) || {},
                i = $.a.get(Ye) || {};
            return e.iterator || (e.iterator = (e => o => {
                Dt(o) && (t = t.concat(e[o]))
            })), Object.keys(o).forEach(e.iterator(o)), Object.keys(i).forEach(e.iterator(i)), t
        }

        function Rt() {
            var e = Rt,
                t = $.a.get(Xe) || {},
                o = $.a.get(Ye) || {};
            e.iterator || (e.iterator = (e => t => {
                Dt(t) && delete e[t]
            })), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), $.a.set(Xe, t), $.a.set(Ye, o)
        }

        function Dt(e) {
            var t = Number(e);
            return t !== tt && Date.now() - t >= Be
        }

        function Lt(e, t, o, i) {
            if (!e) return !1;
            e[He] || (e[He] = !0, e[Ke] = e.offsetHeight, e[Ve] = o + e.getBoundingClientRect().top, e[Ge] = e[Ve] + e[Ke]);
            var n = i - ot - it,
                r = o + ot,
                a = o + i - it,
                s = e[Ke],
                d = e[Ve],
                c = e[Ge];
            return (c > r && d < a ? Math.min(a, c) - Math.max(r, d) : 0) >= Math.min(n * t, s * t)
        }

        function Mt(e, t, o) {
            return e.map(e => Ct(e, t, o))
        }

        function Ct(e, t, o) {
            if (It(e)) return [];
            var i = Math.min(De, Date.now() - e[Fe]);
            if (e[Ne] === Qe && i < xe || e[Ne] === ze && i < Re) return [];
            o || (e[We] = !0);
            var n = function(e) {
                    var t = e[Ue];
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
                    t || (ct[u = _ + "_" + l] || (ct[u] = 0), ct[u]++), s.push("ad" === _ ? {
                        ownerId: "ad",
                        postId: l,
                        module: r,
                        viewIndex: ct[u]
                    } : "ads" === _ ? {
                        ownerId: "ads",
                        postId: l,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        viewIndex: ct[u]
                    } : {
                        ownerId: _,
                        postId: (1 === n[d] ? "" : "-") + l,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        q: n.q || null,
                        viewIndex: ct[u]
                    })
                }
            return s
        }

        function It(e) {
            return "page_view" === Je && e[We] || !document.body.contains(e)
        }

        function At(e, t) {
            var o = e.indexOf(t);
            o >= 0 && e.splice(o, 1)
        }
        var Bt = o("QGEU"),
            Nt = o("eNQP"),
            qt = o("o7bv"),
            Ut = o("wetz"),
            Ft = o("BJj/"),
            Wt = o("i6oL"),
            Ht = o("m0N1");
        o("/8Fb");
        var Kt = o("W0P9"),
            Vt = 5e3,
            Gt = "push_notifier_endpoint",
            Qt = "push_notifier_subscribed_ts",
            zt = 6e4,
            Xt = 432e6;
        class Yt {
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
                return $.a.get(Gt + vk.id) || !1
            }
            saveEndpoint(e) {
                $.a.set(Gt + vk.id, e || !1)
            }
            action(e, t) {
                return this.sw.action(e, t)
            }
            _needupdate(e) {
                var t = Date.now(),
                    o = this.loadEndpoint(),
                    i = $.a.get(Qt + vk.id),
                    n = !1;
                return (o !== e.endpoint || !i || t - i > zt) && ($.a.set(Qt + vk.id, t), n = !0), n
            }
            listenPermission() {
                Object(d.a)("push_notifier") && navigator.permissions && navigator.permissions.query && navigator.permissions.query({
                    name: "notifications"
                }).then(e => {
                    e.onchange = (() => this.update())
                })
            }
            update() {
                return this.updatePermission().then(e => e === Yt.PUSH_NOTIFIER_PERMISSION_GRANTED ? this.subscribe().catch(e => {
                    e !== Yt.SUBSCRIBE_ERROR_NETWORK && e("can not update subscribe")
                }) : Promise.reject("premession_not_granted")).catch(Kt.a)
            }
            updatePermission() {
                var e = Yt.getPermission();
                if (e !== Yt.PUSH_NOTIFIER_PERMISSION_GRANTED) {
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
                    }(Yt.SERVER_KEY)
                })
            }
            setupSubscription() {
                return new Promise((e, t) => {
                    var o = Yt.getPermission(),
                        i = () => {
                            this.subscribe(!0).then(() => {
                                e()
                            }).catch(() => {
                                t()
                            })
                        };
                    o !== Yt.PUSH_NOTIFIER_PERMISSION_DENIED ? o !== Yt.PUSH_NOTIFIER_PERMISSION_GRANTED ? o === Yt.PUSH_NOTIFIER_PERMISSION_DEFAULT && this.requestPermission().then(e => {
                        e === Yt.PUSH_NOTIFIER_PERMISSION_GRANTED ? i() : t()
                    }) : i() : t(Yt.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS)
                })
            }
            subscribe(e) {
                return this.sw.register().then(e => {
                    var t = e.pushManager;
                    return t.getSubscription().then(e => {
                        if (e) {
                            var o = e.expirationTime;
                            return o && Date.now() > o - Xt ? this.unsubscribe(this.loadEndpoint()).then(() => this.processSubscribe(t)) : e
                        }
                        return this.processSubscribe(t)
                    })
                }).then(t => new Promise((o, i) => {
                    if (e || this._needupdate(t)) {
                        var n = t.getKey("p256dh"),
                            r = t.getKey("auth");
                        window.ajax.post(Yt.SERVER_URL, {
                            act: "a_subscribe",
                            endpoint: t.endpoint,
                            key: n ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("p256dh")))) : null,
                            token: r ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("auth")))) : null
                        }, {
                            onDone: e => {
                                e ? (this.saveEndpoint(t.endpoint), o()) : i()
                            },
                            onFail: () => (i(Yt.SUBSCRIBE_ERROR_NETWORK), !0)
                        })
                    } else o()
                }))
            }
            unsubscribe(e) {
                return this.sw.register().then(t => t.pushManager.getSubscription().then(t => t ? t.unsubscribe().then(t => t ? new Promise((t, o) => {
                    ajax.post(Yt.SERVER_URL, {
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
                var e = Yt.getPermission();
                return e === Yt.PUSH_NOTIFIER_PERMISSION_DEFAULT ? new Promise(function(e, t) {
                    var o = Notification.requestPermission(function(t) {
                        e(t)
                    });
                    o instanceof Promise && o.then(e, t)
                }) : Promise.resolve(e)
            }
            checkMessageState() {
                return new Promise(e => setTimeout(e, Vt)).then(() => this.action("getMessagesMetaData")).then(e => "object" == typeof e && Object.keys(e).length ? new Promise((t, o) => {
                    window.ajax.post(Yt.SERVER_URL, {
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
                }).then(e => this.action("updateMessageNotifications", e)).catch(e => Object(Kt.a)(e))
            }
        }
        Yt.SERVER_KEY = "BPrntRk2W1_ISFwlgY-vz9tQDg9i1oSQ3-N8xyjdbNAbIOdZIGFdh5FlO7zn730UwU9Sayoec-Fpqq4JZFTyv60", Yt.SERVER_URL = "push_notifier", Yt.PUSH_NOTIFIER_PERMISSION_GRANTED = "granted", Yt.PUSH_NOTIFIER_PERMISSION_DEFAULT = "default", Yt.PUSH_NOTIFIER_PERMISSION_DENIED = "denied", Yt.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS = "BLOCKED_BY_BROWSER_SETTINGS", Yt.SUBSCRIBE_ERROR_NETWORK = "SUBSCRIBE_ERROR_NETWORK";
        var Jt = Yt;
        var $t = class extends Jt {
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
                    var o = Object(ye.b)();
                    o && Object(w.X)(o.bodyNode), this.setupSubscription().then(() => this.setState(e, t)).then(() => {
                        o && o.hide(), e ? Object(te.d)("push_notifier_subscribe_via_popup", "msg") : Object(te.d)("push_notifier_subscribe_via_popup", "all")
                    }).catch(e => {
                        Jt.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === e ? (Object(w.vb)(o().bodyNode), this.showPopupAllowNotification()) : Object(Oe.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                    })
                }
                closePopup() {
                    var e = Object(ye.b)();
                    e && e.hide(), Object(te.d)("push_notifier_subscribe_via_popup", "close")
                }
                showPopupAllowNotification() {
                    var e = Object(Oe.b)(Jt.SERVER_URL, {
                        act: "popup_allow_notification"
                    }, {
                        params: {
                            hideButtons: !0
                        },
                        containerClass: "PushNotifierPopup__popup-box_type--allow-notification",
                        onFail: () => {
                            e ? e.hide() : Object(Oe.d)(getLang("global_error"), getLang("notifications_native_common_error"))
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
                        ajax.post(Jt.SERVER_URL, {
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
            Zt = "sw";

        function eo(e) {
            return {
                type: Zt,
                data: e
            }
        }

        function to(e) {
            return ("" === e.origin || e.origin.match(/^https:\/\/([a-zA-Z0-9\-\.]+\.)?vk\.com$/)) && e.data && e.data.data && e.data.type === Zt
        }

        function oo(e, t) {
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
        var io = "/js/cmodules/sw/sw.js",
            no = "/";
        class ro {
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
                return ro.isSupported() ? this.registration ? Promise.resolve(this.registration) : navigator.serviceWorker.register(ro.addVersion(io), {
                    scope: no
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
                        to(e) ? t(e.data.data) : o(new Error("ServiceWorker message is incorrect"))
                    }, this.registration.active.postMessage(eo(e), [i.port2])
                }))
            }
            _onmessage(e) {
                if (to(e)) {
                    var t = e.data.data;
                    if (t.actions && Array.isArray(t.actions)) {
                        var o = [];
                        t.actions.forEach(t => {
                            var i = oo(t, 2),
                                n = i[0],
                                r = i[1],
                                a = "action_" + n;
                            o.push(Promise.resolve(this[a] ? this[a](r, e) : void 0))
                        }), Promise.all(o).then(function(t) {
                            var o = {};
                            t.forEach((e, t) => {
                                void 0 !== e && (o[t] = e)
                            }), Object.keys(o).length && e.ports[0].postMessage(eo({
                                answers: o
                            }))
                        })
                    }
                }
            }
        }
        var ao = window.isMVK ? "mvk" : "web",
            so = {
                start: function(e, t) {
                    if (t.stopPropagation(), t.preventDefault(), this.id = window.domData(e, "id"), this.id && (window.statlogsValueEvent("special_event", "click", ao, this.id), !this.timeoutHandle)) {
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
                            e.stop(), e.destroy(), this.frame.style.display = "none", this.timeoutHandle = null, window.statlogsValueEvent("special_event", "showed", ao, this.id)
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
            co = o("B3ia");
        o.d(t, "initAjax", function() {
            return _o
        });
        var wo = window.vk;

        function _o() {
            window.ajaxCache = {}, window.globalAjaxCache = {}, window.ajax = I, Object(d.a)("web_ajax_json_object") && (window.ajax.enabled || B.a.search_bot || location.replace("/badbrowser.php"))
        }

        function lo() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, wo.width = 960, wo.started = Object(c.L)(), wo.counts = {}, B.a.android && (Object(r.d)("remixscreen_width", window.screen.width, 365), Object(r.d)("remixscreen_height", window.screen.height, 365), Object(r.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(r.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(r.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(se.e)(), Object(ee.b)(), Object(W.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(W.h)(vkCache[e].handle.elem)
            }), Object(W.b)(window, "DOMContentLoaded load", function() {
                wo.loaded || (wo.loaded = !0, Object(oe.y)()), Object(ve.c)()
            }), Object(W.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(W.b)(document, "keydown", Ut.a)
        }
        var uo = 0;

        function ho() {
            if (window.headNode = Object(w.K)("head"), window.icoNode = Object(w.K)("link", headNode), window.bodyNode = Object(w.K)("body"), window.htmlNode = Object(w.K)("html"), window.utilsNode = Object(w.G)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(W.b)(bodyNode, "resize", ve.j.pbind(!1)), utilsNode) {
                B.a.mozilla ? Object(w.a)(bodyNode, "firefox") : B.a.mobile && Object(w.a)(bodyNode, "mobfixed"), Object(ke.f)(), Object(ee.a)();
                var e = Object(w.G)("layer_bg"),
                    t = e.nextSibling,
                    o = Object(w.G)("box_layer_bg"),
                    i = o.nextSibling;
                window.layerBG = e, window.boxLayerBG = o, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(w.G)("stl_side"), window._stlLeft = Object(w.G)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, B.a.mobile || Object(Wt.a)(), Object(W.b)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, t, o, i) {
                    return window.layerQueue = J, Object(c.i)(Y, {
                        show: Y._show.pbind(e, t),
                        boxshow: Y._show.pbind(o, i),
                        wrapshow: Y._show.pbind(e),
                        hide: Y._hide.pbind(e, t),
                        boxhide: Y._hide.pbind(o, i),
                        wraphide: Y._hide.pbind(e)
                    }), Y
                }(e, t, o, i), hab.init(), window._retinaInit ? window._retinaInit() : uo = 1, wo.disableSW || (window.PushNotifier = $t, window.sw = new ro, window.sw.register().then(() => {
                    window.pushNotifier = new $t(window.sw, ro)
                }))
            }
        }

        function po() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: () => cur.module,
                    getOID: () => cur.oid,
                    doesScrollTriggerIdle: !0
                })), Object(Wt.b)();
                var e = Object(w.G)("side_bar");
                window.pageNode = Object(w.G)("page_wrap"), window._fixedNav = e && "fixed" === Object(w.P)(e, "position"), window._tbLink = Object(w.G)("top_back_link"), B.a.chrome || B.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = B.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(c.L)() - wo.started, 10),
                    o = Object(c.r)((wo.contlen || 1) / t * 1e3);
                B.a.mozilla && B.a.version >= 4 ? o /= 2.5 : B.a.mozilla ? o *= 1.5 : B.a.msie && B.a.version >= 7 ? o /= 1.5 : B.a.msie && (o *= 2.5);
                var i = Object(c.r)(150 * Math.max(2e6 / o, 1));
                if (ee.d.highlimit = 6 * i, ee.d.lowlimit = Math.min(i, 600), Object(ve.j)(), setTimeout(ve.j.pbind(!1), 0), Object(Bt.c)(), window.addEventListener("scroll", ve.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !wo.id && $.a.checkVersion() && $.a.get("last_reloaded")) try {
                    var n = {};
                    Object(c.f)(["sound_notify_off", "im_ui_notify_off"], (e, t) => {
                        var o = $.a.get(t);
                        null !== o && (n[t] = o)
                    }), window.localStorage.clear(), Object(c.f)(n, (e, t) => $.a.set(e, t))
                } catch (e) {}
            }
        }
        class bo {
            constructor(e, t) {
                this.count = t || 1, this.func = e
            }
            done() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                this.count -= e, this.count <= 0 && this.func()
            }
        }

        function fo(e) {
            wo.loaded ? e() : Object(W.b)(window, "load", e)
        }

        function mo() {
            window.showWriteMessageBox = je.g, window.giftsBox = je.a, window.moneyTransferBox = je.d, window.reportAd = je.e, window.mobilePromo = je.c, window.showAudioClaimWarning = je.f, window.menuSettings = je.b, window.sureDeleteAll = je.h, window.TopNotifier = Object(X.m)(), window.showPhoto = X.y, window.showManyPhoto = X.x, window.showAlbums = X.v, window.showAlbum = X.u, window.showPhotoTags = X.z, window.isPhotoeditor3Available = X.p, window.AudioMessagePlayer = X.a, window.showVideoTags = X.B, window.videoCallback = X.D, window.showWiki = X.C, window.showApp = X.w, window.showPodcast = X.A, window.podcastStartFrom = X.s, window.articlePrepare = X.b, window.isArticleLayerOpen = X.o, window.isArticleEditorAvailable = X.n, window.openArticleEditor = X.r, window.mentionOver = Ee.c, window.mentionClick = X.q, window.mobileOnlineTip = Ee.d, window.pageVerifiedTip = Ee.e, window.audioShowActionTooltip = Ee.a, window.shareAudioPlaylist = X.t, window.getAudioPlayer = X.k, window.deleteAudioOnClaim = X.j, window.initTopAudioPlayer = X.l, window.bookmark = X.c, window.bookmarkPost = X.i, window.bookmarkArticle = X.d, window.bookmarkLink = X.f, window.bookmarkPodcast = X.h, window.bookmarkNarrative = X.g, window.bookmarkEvent = X.e, window.bookmarkTooltip = Ee.b, window.showStory = Q.c, window.showNarrative = Q.b, window.storiesPreloadStatic = Q.d, window.sendMask = Q.a
        }
        window.constants = {
            Groups: fe
        }, window.partConfigEnabled = d.a, Object(w.Y)(), window.ge = w.G, window.geByTag = w.J, window.geByTag1 = w.K, window.geByClass = w.H, window.geByClass1 = w.I, window.gpeByClass = w.U, window.domQuery = w.C, window.domQuery1 = w.D, window.domClosest = w.o, window.ce = w.e, window.cf = w.f, window.re = w.gb, window.se = w.nb, window.sech = w.ob, window.rs = w.mb, window.psr = w.fb, window.domReplaceEl = w.E, window.domEL = w.u, window.domNS = w.z, window.domPS = w.B, window.domFC = w.v, window.domLC = w.y, window.domPN = w.A, window.domChildren = w.n, window.domInsertBefore = w.x, window.domInsertAfter = w.w, window.domByClass = w.k, window.domData = w.t, window.domChildIndex = w.m, window.domCA = w.l, window.domClosestSibling = w.s, window.matchesSelector = w.eb, window.isHover = w.ab, window.isAncestor = w.Z, window.getScroll = w.N, window.domClosestPositioned = w.r, window.domClosestOverflowHidden = w.q, window.show = w.vb, window.hide = w.X, window.isVisible = w.bb, window.clientHeight = w.h, window.getClientRectOffsetY = w.L, window.toggle = w.wb, window.boundingRectEnabled = w.d, window.getXYRect = w.S, window.getXY = w.R, window.isWindow = w.cb, window.getSize = w.O, window.hasClass = w.W, window.addClass = w.a, window.addClassDelayed = w.b, window.removeClass = w.ib, window.removeClassDelayed = w.jb, window.toggleClass = w.xb, window.toggleClassDelayed = w.yb, window.replaceClass = w.lb, window.getStyle = w.P, window.setStyle = w.sb, window.setStyleDelayed = w.tb, window.setPseudoStyle = w.rb, window.data = w.j, window.attr = w.c, window.removeAttr = w.hb, window.removeData = w.kb, window.cleanElems = w.g, window.setTitle = w.ub, window.getZoom = w.T, window.val = w.Ab, window.elfocus = w.F, window.traverseParent = w.zb, window.getH = w.M, window.getW = w.Q, window.domClosestByTag = w.p, window.setDocumentTitle = w.pb, window.lockDocumentTitle = w.db, window.KEY = W.a, window.addEvent = W.b, window.removeEvent = W.h, window.triggerEvent = W.j, window.cancelEvent = W.c, window.stopEvent = W.i, window.normEvent = W.g, window.checkEvent = W.d, window.checkKeyboardEvent = W.e, window.checkOver = W.f, Object(c.q)(), window.isRetina = c.y, window.extractUrls = c.j, window.serializeForm = c.F, window.addTemplates = c.a, window.getTemplate = c.n, window.rand = c.D, window.irand = c.s, window.isUndefined = c.A, window.isFunction = c.v, window.isArray = c.t, window.isString = c.z, window.isObject = c.x, window.isEmpty = c.u, window.vkNow = c.L, window.vkImage = c.J, window.trim = c.H, window.stripHTML = c.G, window.escapeRE = c.h, window.intval = c.r, window.floatval = c.k, window.positive = c.C, window.isNumeric = c.w, window.winToUtf = c.M, window.replaceEntities = c.E, window.clean = c.c, window.unclean = c.I, window.each = c.f, window.indexOf = c.p, window.inArray = c.o, window.clone = c.d, window.arrayKeyDiff = c.b, window.extend = c.i, window.vkLocal = c.K, window.lTimeout = c.B, window.getCaretCharacterOffsetWithin = c.m, window.formatCount = c.l, window.encodeHtml = c.g, window.decodeHtml = c.e, _o(), window.AjaxConvert = a, window.ajx2q = a.toQueryString, window.q2ajx = a.fromQueryString, window.requestBox = A.b, window.activateMobileBox = A.a, window.validateMobileBox = A.c, window.validatePassBox = A.e, Object(r.c)(), window.getCookie = r.a, window.setCookie = r.d, window.hideCookiesPolicy = r.b, Object(ge.d)(), window.debugLog = ge.c, window.debugEl = ge.b, window.isToday = me.d, window.isYesterday = me.f, window.isTomorrow = me.e, window.isSameDate = me.c, window.leadingZero = me.g, window.formatTime = me.a, window.getServerTime = me.b, window.parseLatin = p.o, window.parseCyr = p.m, window.parseLatKeys = p.n, window.langNumeric = p.i, window.langSex = p.j, window.langStr = p.k, window.addLangKeys = p.a, window.getLang = p.d, window.langDate = p.h, window.getShortDate = p.e, window.getShortDateOrTime = p.f, window.langWordNumeric = p.l, window.getDateText = p.c, window.getBigDateNew = p.b, window.getSmDate = p.g, window.scrollToY = V.g, window.scrollToTop = V.f, window.scrollGetX = V.d, window.scrollGetY = V.e, window.disableBodyScroll = V.a, window.enableBodyScroll = V.b, window.Chat = ke.a, window.__qlTimer = null, window.__qlClear = ke.b, window.onLoginDone = ke.m, window.onLoginFailed = ke.n, window.onLoginCaptcha = ke.l, window.onLoginReCaptcha = ke.o, window.storePasswordCredential = ke.p, window.cssAnim = ke.c, window.imagesLoader = ke.e, window.nodeUpdated = ke.k, window.hideNewsAnnounce = ke.d, window.leftAdBlockClose = ke.h, window.leftBlockToggleFriend = ke.j, window.leftBlockFriendTooltip = ke.i, window.placeholderSetup = qt.c, window.placeholderInit = qt.b, window.isInputActive = qt.a, window.showTooltip = Pe.c, window.showTitle = Pe.b, window.showHint = Pe.a, window.topMsg = n.d, window.showMsg = n.b, window.topError = n.c, window.showGlobalPrg = n.a, window.checkTextLength = b.b, window.getSelectionText = b.d, window.goAway = b.e, window.debounce = Ft.a, window.hashCode = b.g, window.isFullScreen = b.h, window.parallel = b.k, window.parseJSON = b.l, window.shuffle = b.m, window.throttle = b.n, window.toggleOnline = b.q, window.updateMoney = b.s, window.onlinePlatformClass = b.j, window.Fx = F.a, window.fx = F.a, window.animate = F.b, window.cubicBezier = F.d, window.fadeTo = F.g, window.genFx = F.i, window.getRGB = F.k, window.getColor = F.j, window.slideDown = F.l, window.slideUp = F.n, window.slideToggle = F.m, window.fadeIn = F.e, window.fadeOut = F.f, window.fadeToggle = F.h, window.animateCount = F.c, window.updateAriaElements = Bt.c, window.updateAriaCheckboxes = Bt.b, window.hasAccessibilityMode = Bt.a, window.cancelStackFilter = z.a, window.cancelStackPush = z.c, window.cancelStackPop = z.b, Object(co.a)(), window.ElementTooltip = N.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = q, 1 === wo.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== wo.al || history.pushState || (wo.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), wo.version = !1), Object(ee.c)(), window.stManager = ee.d, Object(B.c)(), window.browser = B.a, window.mobPlatforms = B.d, window.browserFeatures = B.b, Object(U.a)(), window.toggleFlash = U.c, window.renderFlash = U.b, lo(), window.updateHeaderStyles = se.i, window.updateNarrow = ve.m, window.checkPageBlocks = ve.c, window.redraw = ve.l, window.onBodyResize = ve.j, window.onBodyScroll = ve.k, window.leftBlockOver = ve.i, window.leftBlockOut = ve.h, window.leftBlockHide = ve.g, window.onDocumentClick = Ut.c, window.onEnter = Ut.d, window.onCtrlEnter = Ut.b, window.logLeftMenuClicks = te.a, window.autosizeSetup = ve.b, window.getProgressBarEl = ve.e, window.getProgressHtml = ve.f, Object(Ht.b)(), be(), window.onDomReady = (e => e()), window.currentModule = (() => cur.currentModule ? cur.currentModule() : cur.module), window.hab = K(), window.ls = $.a, window.shortCurrency = Z, window.statlogsValueEvent = te.d, window.saveSearchAttemptStats = te.c, window.removeSearchPositionTracker = te.b, window.callHub = bo, window.CallHub = bo, window.gSearch = new ne, window.zNav = se.l, window.handlePageView = se.d, window.handlePageParams = se.c, window.handlePageCount = se.b, window.updateOtherCounters = se.k, window.processDestroy = se.f, window.globalHistoryDestroy = se.a, window.showBackLink = se.h, window.nav = ae.a, nav.init(), wo.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === t[1] && 12 === wo.time[1] ? wo.time[1] = 0 : 12 === t[1] && 1 === wo.time[1] ? t[1] = 0 : (t[1] > wo.time[1] + 1 || wo.time[1] > t[1] + 1) && (t[1] = wo.time[1] = t[2] = wo.time[2] = 0), t[1] > wo.time[1] && 1 === t[2] ? 31 === wo.time[2] || (4 === wo.time[1] || 6 === wo.time[1] || 9 === wo.time[1] || 11 === wo.time[1]) && 30 === wo.time[2] || 2 === wo.time[1] && (29 === wo.time[2] || 28 === wo.time[2] && wo.time[0] % 4) ? wo.time[2] = 0 : wo.time[2] = t[2] = 0 : wo.time[1] > t[1] && 1 === wo.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && wo.time[0] % 4) ? t[2] = 0 : t[2] = wo.time[2] = 0), (t[2] > wo.time[2] + 1 || wo.time[2] > t[2] + 1) && (t[2] = wo.time[2] = 0);
            var o = 60 * (60 * (24 * (t[2] - wo.time[2]) + (t[3] - wo.time[3])) + (t[4] - wo.time[4]));
            o < -55800 ? o += 86400 : o > 37800 && (o -= 86400);
            var i = new Date,
                n = Date.UTC(i.getFullYear(), i.getMonth(), i.getDate(), i.getHours(), i.getMinutes(), i.getSeconds()) / 1e3 - Object(me.b)();
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
            }), Object(te.d)("timeoffset_new_method", 1, _, a), Object(d.a)("timezone_new_method") ? wo.dt = a : wo.dt = _, Object(r.a)("remixdt") !== wo.dt && Object(r.d)("remixdt", wo.dt, 365);
            var u = Object(c.r)(Object(r.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!B.a.iphone || Object(r.a)("remixme")) ? 1 & u || (Object(r.d)("remixrt", 1 | u, 365), window._retinaInit = function() {
                ee.d.add(["retina.css"]), Object(w.a)(document.body, "is_2x")
            }, uo && window._retinaInit()) : 1 & u && Object(r.d)("remixrt", 1 ^ u, 365)
        }, 0), window.boxQueue = Object(ye.c)(), window.__bq = boxQueue, window.curBox = ye.b, Object(ye.d)(), window.boxRefreshCoords = ye.a, window.MessageBox = Oe.a, window.showBox = Oe.b, window.showTabbedBox = Oe.f, window.showFastBox = Oe.d, window.showCaptchaBox = Oe.c, window.showReCaptchaBox = Oe.e, window.showDoneBox = ye.e, window.TopMenu = ve.a, window.TopSearch = re.a, window.handleScroll = b.f, window.loadScript = ie.a, window.SpecialEvent = so, Object(oe.j)(), window.notaBene = oe.q, window.updSideTopLink = oe.y, window.createButton = oe.d, window.actionsMenuItemLocked = oe.a, window.lockActionsMenuItem = oe.n, window.unlockActionsMenuItem = oe.v, window.linkLocked = oe.m, window.lockLink = oe.p, window.unlockLink = oe.x, window.lockButton = oe.o, window.unlockButton = oe.w, window.buttonLocked = oe.b, window.isButtonLocked = oe.k, window.disableButton = oe.f, window.sbWidth = oe.t, window.isChecked = oe.l, window.checkbox = oe.c, window.disable = oe.e, window.radioval = oe.s, window.radiobtn = oe.r, window.showProgress = oe.u, window.hideProgress = oe.i, window.disableEl = oe.g, window.enableEl = oe.h, Object(G.d)(), window.VideoConstants = G.a, window.showVideo = G.j, window.showInlineVideo = G.i, window.loadInlineVideo = G.e, window.revertLastInlineVideo = G.h, window.destroyInlineVideoPlayer = G.c, window.pauseLastInlineVideo = G.f, window.playLastInlineVideo = G.g, window.checkMp4 = G.b, window.performance && window.performance.memory && Object(c.D)(0, 100) < 5 && Object(Nt.a)(), Je ? (Object(W.b)(window, "blur", pt), Object(W.b)(window, "focus", bt), onDomReady(() => setTimeout(wt, 500)), window.LongView = {
            register: lt,
            onScroll: Object(b.n)(ut, 50),
            onBeforePageChange: ft,
            clearElemsCache: _t,
            _debug: function() {
                return {
                    started: Ze,
                    tracking: $e,
                    viewedData: et,
                    viewIndexes: ct,
                    blindTop: ot,
                    blindBottom: it
                }
            }
        }) : window.LongView = {
            register: () => {},
            onScroll: () => {},
            onBeforePageChange: () => {},
            clearElemsCache: () => {}
        }, Object(ke.g)(), mo(), window.onLoaded = fo, window.domStarted = ho, window.domReady = po, Object(ge.c)("common module enabled"), ee.d.done(jsc("web/common_web.js"))
    }
});