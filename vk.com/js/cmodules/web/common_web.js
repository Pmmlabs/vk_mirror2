! function(e) {
    var t = {};

    function o(n) {
        if (t[n]) return t[n].exports;
        var i = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    o.m = e, o.c = t, o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.t = function(e, t) {
        if (1 & t && (e = o(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (o.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) o.d(n, i, function(t) {
                return e[t]
            }.bind(null, i));
        return n
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, o.p = "", o(o.s = 47)
}([, function(e, t, o) {
    "use strict";
    var n = o(45),
        i = o(48),
        r = o(121),
        a = o(30),
        s = o(138),
        c = o(27),
        _ = o(163),
        l = o(166),
        d = o(29),
        u = o(146)("iterator"),
        p = !([].keys && "next" in [].keys()),
        f = function() {
            return this
        };
    e.exports = function(e, t, o, b, h, w, m) {
        _(o, t, b);
        var v, O, g, E = function(e) {
                if (!p && e in M) return M[e];
                switch (e) {
                    case "keys":
                    case "values":
                        return function() {
                            return new o(this, e)
                        }
                }
                return function() {
                    return new o(this, e)
                }
            },
            j = t + " Iterator",
            y = "values" == h,
            P = !1,
            M = e.prototype,
            C = M[u] || M["@@iterator"] || h && M[h],
            D = C || E(h),
            T = h ? y ? E("entries") : D : void 0,
            k = "Array" == t && M.entries || C;
        if (k && (g = d(k.call(new e))) !== Object.prototype && (l(g, j, !0), n || s(g, u) || a(g, u, f)), y && C && "values" !== C.name && (P = !0, D = function() {
                return C.call(this)
            }), n && !m || !p && !P && M[u] || a(M, u, D), c[t] = D, c[j] = f, h)
            if (v = {
                    values: y ? D : E("values"),
                    keys: w ? D : E("keys"),
                    entries: T
                }, m)
                for (O in v) O in M || r(M, O, v[O]);
            else i(i.P + i.F * (p || P), t, v);
        return v
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "locBase", function() {
        return locBase
    }), __webpack_require__.d(__webpack_exports__, "ajx2q", function() {
        return ajx2q
    }), __webpack_require__.d(__webpack_exports__, "q2ajx", function() {
        return q2ajx
    }), __webpack_require__.d(__webpack_exports__, "requestBox", function() {
        return requestBox
    }), __webpack_require__.d(__webpack_exports__, "activateMobileBox", function() {
        return activateMobileBox
    }), __webpack_require__.d(__webpack_exports__, "validateMobileBox", function() {
        return validateMobileBox
    }), __webpack_require__.d(__webpack_exports__, "validatePassBox", function() {
        return validatePassBox
    }), __webpack_require__.d(__webpack_exports__, "photoCaptchaBox", function() {
        return photoCaptchaBox
    }), __webpack_require__.d(__webpack_exports__, "initAjax", function() {
        return initAjax
    });
    var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80),
        _debug_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9),
        _browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(58),
        _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(89),
        _dom_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(177),
        _message_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(168),
        _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(61),
        _ui_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(137),
        _box_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(95),
        _lang__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(153),
        locBase = location.toString().replace(/#.+$/, ""),
        decodeErors = {},
        iframeTransport = void 0,
        iframeTO = 0;

    function ajx2q(e, t) {
        var o = [],
            n = function(e) {
                if (decodeErors[e]) return e;
                try {
                    return encodeURIComponent(e)
                } catch (e) {
                    return ""
                }
            };
        for (var i in e)
            if (null != e[i] && !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.isFunction)(e[i]))
                if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.isArray)(e[i]))
                    for (var r = 0, a = 0, s = e[i].length; r < s; ++r) null == e[i][r] || Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.isFunction)(e[i][r]) || (o.push(n(i) + "[" + a + "]=" + n(e[i][r])), ++a);
                else o.push(n(i) + "=" + n(e[i]));
        return t || o.sort(), o.join("&")
    }

    function q2ajx(e) {
        if (!e) return {};
        var t = {},
            o = function(e) {
                try {
                    return decodeURIComponent(e)
                } catch (t) {
                    return decodeErors[e] = 1, e
                }
            };
        return e = e.split("&"), Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(e, function(e, n) {
            var i = n.split("=");
            if (i[0]) {
                var r = o(i[1] + "");
                if ("[]" === i[0].substr(i.length - 2)) {
                    var a = o(i[0].substr(0, i.length - 2));
                    t[a] || (t[a] = []), t[a].push(r)
                } else t[o(i[0])] = r
            }
        }), t
    }

    function requestBox(e, t, o) {
        return e.setOptions({
            onDestroy: o
        }), e.onDone = function() {
            t && t.apply(null, arguments)
        }, e
    }

    function activateMobileBox(e) {
        return requestBox(Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showBox)("activation.php", {
            act: "activate_mobile_box",
            hash: e.hash
        }), function() {
            vk.nophone = 0, e.onDone()
        }, e.onFail)
    }

    function validateMobileBox(e) {
        return requestBox(Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showBox)("activation.php", {
            act: "validate_box",
            captcha: e.acceptCaptcha ? 1 : "",
            skip_push: e.skip_push ? e.skip_push : "",
            from: e.from || "",
            hash: e.hash,
            ahash: e.ahash
        }, {
            stat: ["uncommon.css"]
        }), e.onDone, e.onFail)
    }

    function validatePassBox(e) {
        return requestBox(Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showBox)("activation.php", {
            act: "pass_validate_box",
            hash: e.hash
        }, {
            stat: ["uncommon.css"]
        }), e.onDone, e.onFail)
    }

    function photoCaptchaBox(e) {
        return requestBox(Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showBox)("pcaptcha.php", {
            act: "box"
        }, {
            stat: ["pcaptcha.css", "pcaptcha.js"]
        }), e.onDone, e.onFail)
    }
    var ajax = {
        _init: function() {
            try {
                if (new XMLHttpRequest) return void(ajax._req = function() {
                    return new XMLHttpRequest
                })
            } catch (e) {}
            ajax._req || _browser__WEBPACK_IMPORTED_MODULE_2__.browser.search_bot || location.replace("/badbrowser.php")
        },
        _getreq: function() {
            return ajax._req || ajax._init(), ajax._req()
        },
        _frameover: function(e, t) {
            if (iframeTransport) {
                var o = iframeTransport.parentNode;
                o.innerHTML = "", utilsNode.removeChild(o), iframeTransport = !1, (e || t) && ajax.framegot(!1, !1, e, t), ajax.framegot(!1), cur.onFrameBlocksDone && cur.onFrameBlocksDone(), ajax.tOver = (new Date).getTime()
            }
        },
        _receive: function _receive(cont, html, js, bench, params) {
            var container = cont && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ge)(cont);
            if (container && html && (container.firstChild ? container.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.cf)(html)) : Object(_dom__WEBPACK_IMPORTED_MODULE_3__.val)(container, html)), js) {
                var scr = "(function(){" + js + ";})()";
                if (__debugMode) eval(scr);
                else try {
                    eval(scr)
                } catch (e) {
                    Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)(e, {
                        dt: 15,
                        type: 8,
                        url: ajax._frameurl,
                        js: js,
                        answer: Array.prototype.slice.call(arguments).join("<!>")
                    }), Object(_debug_tools__WEBPACK_IMPORTED_MODULE_1__.logEvalError)(e, scr)
                }
                bench && (ajax.tModule = cur.module)
            }
            params && "leftads" in params && window.__adsSet && __adsSet(params.leftads, params.ads_section || "", params.ads_can_show, params.ads_showed), ajax._framenext()
        },
        framedata: !1,
        _framenext: function() {
            if ((ajax.framedata || {}).length) {
                var e = ajax.framedata.shift();
                !0 === e ? ajax._framenext() : !1 === e ? (ajax.framedata = !1, cur.onFrameBlocksDone && cur.onFrameBlocksDone()) : iframeTO = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.lTimeout)(ajax._receive.pbind(e[0], e[1], e[2], !0, e[3]), 0)
            }
        },
        framegot: function(e, t, o, n) {
            ajax.framedata && (ajax.framedata.push(void 0 === t && void 0 === o && void 0 === n ? e : [e, t, o, n]), 1 == ajax.framedata.length && ajax._framenext())
        },
        framepost: function(e, t, o, n) {
            clearTimeout(iframeTO), iframeTransport && ajax._frameover(), iframeTransport = utilsNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ce)("div", {
                innerHTML: "<iframe></iframe>"
            })).firstChild, ajax._framedone = o, ajax.framedata = [!0], e += "?" + ("string" != typeof t ? ajx2q(t, n && n.noSort) : t), e += ("?" != e.charAt(e.length - 1) ? "&" : "") + "_rndVer=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.irand)(0, 99999), ajax._frameurl = iframeTransport.src = e
        },
        plainpost: function(e, t, o, n, i, r, a, s) {
            var c = ajax._getreq(),
                _ = "string" != typeof t ? ajx2q(t, a && a.noSort) : t;
            c.onreadystatechange = function() {
                4 === c.readyState && (c.status >= 200 && c.status < 300 ? o && o(c.responseText, c) : n && n(c.responseText, c))
            };
            try {
                c.open("POST", e, !0)
            } catch (e) {
                return !1
            }
            return r && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(r, function(e, t) {
                c[e] = t
            }), i || (c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s || c.setRequestHeader("X-Requested-With", "XMLHttpRequest")), c.send(_), c
        },
        post: function(e, t, o) {
            "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
            var n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)({
                    _captcha: !1,
                    _box: !1
                }, o || {}),
                i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)({
                    al: n.frame ? -1 : 1
                }, t),
                r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.vkNow)(),
                a = vk.spentLastSendTS ? Math.round((r - vk.spentLastSendTS) / 1e3) : 0;
            if (vk.sampleUser >= 0 && window.cur && cur.module && a >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (i._smt = cur.module + ":" + a), vk.spentLastSendTS = r), n.progress && (n.showProgress || (n.showProgress = function() {
                    var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ge)(n.progress);
                    Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hasClass)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.setStyle)(e, "opacity", 1), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.show)(e)
                }), n.hideProgress || (n.hideProgress = function() {
                    var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ge)(n.progress);
                    Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hasClass)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.setStyle)(e, "opacity", 0), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hide)(e)
                })), n.loader) {
                var s = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.isVisible)(boxLayerWrap);
                n.showProgress = function() {
                    boxRefreshCoords(boxLoader), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.show)(boxLoader), s || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.show)(boxLayerWrap)
                }, n.hideProgress = function() {
                    Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hide)(boxLoader), s || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hide)(boxLayerWrap)
                }
            }
            return ajax._post(e, i, n)
        },
        preload: function(e, t, o) {
            "/" !== e.substr(0, 1) && (e = "/" + e), ajaxCache[e + "#" + ajx2q(t)] = o
        },
        invalidate: function(e, t) {
            void 0 === e ? ajaxCache = {} : delete ajaxCache[ajax._getCacheKey(e, t)]
        },
        _getCacheKey: function(e, t, o) {
            var n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.clone)(t);
            return delete n.al, delete n.al_ad, delete n.ads_section, delete n.ads_showed, delete n.captcha_sid, delete n.captcha_key, delete n._smt, delete n._preload, e + "#" + ajx2q(n, o && o.noSort)
        },
        _debugLog: function(e, t) {
            window.debuglogGot && window.debuglogGot(t, e)
        },
        _parseRes: function(e, t) {
            for (var o = e.length - 1; o >= 0; --o) {
                var n = e[o];
                if ("<!" === n.substr(0, 2)) {
                    var i = n.indexOf(">"),
                        r = n.substr(2, i - 2);
                    switch (n = n.substr(i + 1), r) {
                        case "json":
                            e[o] = Object(_utils__WEBPACK_IMPORTED_MODULE_6__.parseJSON)(n);
                            break;
                        case "int":
                            e[o] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(n);
                            break;
                        case "float":
                            e[o] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.floatval)(n);
                            break;
                        case "bool":
                            e[o] = !!Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(n);
                            break;
                        case "null":
                            e[o] = null;
                            break;
                        case "pageview_candidate":
                            e.pop();
                            break;
                        case "debug":
                            ajax._debugLog(n, t), e.pop()
                    }
                }
            }
        },
        _post: function _post(url, query, options) {
            !query.captcha_sid && options.showProgress && options.showProgress();
            var cacheKey = !1,
                statAct = void 0;
            window.__adsGetAjaxParams && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(query, __adsGetAjaxParams(query, options)), options.cache && (cacheKey = ajax._getCacheKey(url, query, options));
            var hideBoxes = function() {
                    for (var e = 0, t = arguments.length; e < t; ++e) {
                        var o = arguments[e];
                        o && o.isVisible() && (o.setOptions({
                            onHide: !1,
                            onDestroy: !1
                        }), o.hide())
                    }
                    return !1
                },
                fail = function(e, t) {
                    if (options.hideProgress && options.hideProgress(), options._suggest && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.cleanElems)(options._suggest), options._box = hideBoxes(options._captcha, options._box), options._captcha = options._box, options._suggest = options._captcha, -1 !== e.indexOf("The page is temporarily unavailable") && __dev && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.inArray)(vk.id, [100])) return ajax._post(url, query, options), !1;
                    options.onFail && !0 === options.onFail(e) || Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)(e, {
                        dt: 5,
                        type: 3,
                        status: t.status,
                        url: url,
                        query: query && ajx2q(query, options.noSort)
                    })
                };
            options.local && (fail = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.vkLocal)(fail)), options.stat && (statAct = !1, stManager.add(options.stat, function() {
                statAct && statAct(), options.stat = !1
            }));
            var _processResponse = function processResponse(code, answer) {
                if (options.cache) {
                    var answ = ajaxCache[cacheKey];
                    answ && answ._loading && (setTimeout(function() {
                        for (var e in answ._callbacks) answ._callbacks.hasOwnProperty(e) && answ._callbacks[e](code, answer)
                    }, 0), delete ajaxCache[cacheKey])
                }
                if (options.stat) return options.stat = !1, statAct = _processResponse.pbind(code, answer), !1;
                switch (options.cache && !options.forceGlobalCache && (code || (ajaxCache[cacheKey] = answer)), options.hideProgress && options.hideProgress(), 2 !== code && (options._captcha && (options._suggest && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.cleanElems)(options._suggest), options._captcha = hideBoxes(options._captcha), options._suggest = options._captcha), options._box = hideBoxes(options._box)), code) {
                    case 1:
                        Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showFastBox)({
                            width: 520,
                            title: answer[0],
                            onDestroy: options.onFail
                        }, answer[1]);
                        break;
                    case 2:
                        var addText = "";
                        if (2 === Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(answer[1])) {
                            var resend = function(e) {
                                var t = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(query, {
                                        recaptcha: e
                                    }),
                                    o = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(options, {
                                        cache: -1
                                    }) : options;
                                ajax._post(url, t, o)
                            };
                            options._captcha = Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showReCaptchaBox)(answer[0], answer[2], options._captcha, {
                                onSubmit: resend,
                                addText: addText,
                                onDestroy: function() {
                                    options.onFail && options.onFail()
                                }
                            })
                        } else {
                            var _resend = function(e, t) {
                                var o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(query, {
                                        captcha_sid: e,
                                        captcha_key: t
                                    }),
                                    n = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(options, {
                                        cache: -1
                                    }) : options;
                                ajax._post(url, o, n)
                            };
                            options._captcha = Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showCaptchaBox)(answer[0], Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(answer[1]), options._captcha, {
                                onSubmit: _resend,
                                addText: addText,
                                onDestroy: function() {
                                    options.onFail && options.onFail()
                                }
                            })
                        }
                        options._suggest = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.geByClass1)("phone_validation_link", options._captcha.bodyNode), options._suggest && Object(_dom_events__WEBPACK_IMPORTED_MODULE_4__.addEvent)(options._suggest, "click", function() {
                            options._box = validateMobileBox({
                                onDone: options._captcha.submit
                            })
                        });
                        break;
                    case 11:
                    case 12:
                        var newOptions = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(options, {
                            cache: -1
                        }) : options;
                        options._box = validateMobileBox({
                            acceptCaptcha: 11 === code,
                            onDone: function(e, t) {
                                vk.nophone = 0, e && (options._captcha = Object(_box_utils__WEBPACK_IMPORTED_MODULE_8__.curBox)());
                                var o = e ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(query, {
                                    captcha_sid: e,
                                    captcha_key: t
                                }) : query;
                                ajax._post(url, o, newOptions)
                            },
                            onFail: options.onFail,
                            hash: answer[0],
                            ahash: answer[1]
                        });
                        break;
                    case 14:
                        var _newOptions = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(options, {
                            cache: -1
                        }) : options;
                        options._box = photoCaptchaBox({
                            onDone: ajax._post.pbind(url, query, _newOptions),
                            onFail: options.onFail
                        });
                        break;
                    case 15:
                        var _newOptions2 = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(options, {
                            cache: -1
                        }) : options;
                        options._box = validatePassBox({
                            onDone: ajax._post.pbind(url, query, _newOptions2),
                            onFail: options.onFail,
                            hash: answer[0]
                        });
                        break;
                    case 3:
                        var _newOptions3 = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(options, {
                            cache: -1
                        }) : options;
                        window.onReLoginDone = ajax._post.pbind(url, query, _newOptions3), window.onReLoginFailed = function(e, t) {
                            t ? nav.go(t) : -1 === e ? location.href = location.href.replace(/^http:/, "https:") : e ? nav.go("/") : window.onReLoginDone()
                        }, utilsNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ce)("iframe", {
                            src: vk.loginscheme + "://login.vk.com/?" + ajx2q({
                                role: "al_frame",
                                _origin: locProtocol + "//" + locHost,
                                ip_h: answer[0] || vk.ip_h,
                                to: answer[1] || ""
                            })
                        }));
                        break;
                    case 4:
                        Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(answer[1]) ? nav.go(answer[0], !1, {
                            nocur: "2" === answer[1],
                            noback: !0 === answer[1],
                            showProgress: options.showProgress,
                            hideProgress: options.hideProgress
                        }) : (hab.stop(), location.href = answer[0]);
                        break;
                    case 5:
                        nav.reload({
                            force: Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(answer[0]),
                            from: 1,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        break;
                    case 6:
                        var _newOptions4 = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(options, {
                            cache: -1
                        }) : options;
                        options._box = activateMobileBox({
                            onDone: ajax._post.pbind(url, query, _newOptions4),
                            onFail: options.onFail,
                            hash: answer[0]
                        });
                        break;
                    case 7:
                        options.onFail && options.onFail(), Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topMsg)(answer[0], 10);
                        break;
                    case 8:
                        if (options.onFail && options.onFail(answer[0])) return;
                        Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)(answer[0] + (answer[2] ? " #" + answer[2] : ""), {
                            dt: answer[1] ? 0 : 10,
                            type: 4,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        break;
                    case 9:
                        if ((options.fromBox || options.forceDone) && (options.onDone && options.onDone.apply(window, answer), options.fromBox)) break;
                        options._box = Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showFastBox)({
                            title: Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.trim)(answer[0])
                        }, answer[1]);
                        var _newOptions5 = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.clone)(options), {
                            showProgress: options._box.showProgress,
                            hideProgress: options._box.hideProgress
                        });
                        options.cache && (_newOptions5.cache = -1), options._box = requestBox(options._box, function(e) {
                            Object(_dom__WEBPACK_IMPORTED_MODULE_3__.isVisible)(options._box.progress) || (e || (e = {
                                _votes_ok: 1
                            }), ajax._post(url, Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(query, e), _newOptions5))
                        }, options.onFail), options._box.evalBox(answer[2]);
                        break;
                    case 10:
                        options._box = Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showFastBox)({
                            title: answer[0] || Object(_lang__WEBPACK_IMPORTED_MODULE_9__.getLang)("global_charged_zone_title"),
                            onHide: options.onFail
                        }, answer[1], Object(_lang__WEBPACK_IMPORTED_MODULE_9__.getLang)("global_charged_zone_continue"), function() {
                            var e = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(query, {
                                charged_confirm: answer[3]
                            });
                            ajax._post(url, e, options)
                        }, Object(_lang__WEBPACK_IMPORTED_MODULE_9__.getLang)("global_cancel"));
                        break;
                    case 13:
                        var evalString = "(function(){" + answer[0] + ";})()";
                        if (__debugMode) eval(evalString);
                        else try {
                            eval(evalString)
                        } catch (e) {
                            Object(_debug_tools__WEBPACK_IMPORTED_MODULE_1__.logEvalError)(e, evalString)
                        }
                        break;
                    default:
                        if (-1 === code || -2 === code || -3 === code) {
                            var adsShowed = answer.pop(),
                                adsCanShow = answer.pop(),
                                adsHtml = answer.pop(),
                                adsProps = void 0; - 3 === code && (adsProps = answer.pop()), window.__adsSet && __adsSet(adsHtml, null, adsCanShow, adsShowed, null, adsProps)
                        }
                        options.onDone && options.onDone.apply(window, answer)
                }
                window.LazyLoad && LazyLoad.scanDelayed()
            };
            options.local && (_processResponse = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.vkLocal)(_processResponse));
            var done = function(e, t) {
                options.bench && (ajax.tDone = (new Date).getTime()), e = e.replace(/^<!--/, "").replace(/-<>-(!?)>/g, "--$1>"), Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.trim)(e).length || (t = [8, Object(_lang__WEBPACK_IMPORTED_MODULE_9__.getLang)("global_unknown_error")], e = stVersions.nav + "<!><!>" + vk.lang + "<!>" + stVersions.lang + "<!>8<!>" + t[1]);
                var o = e.split("<!>"),
                    n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.clone)(o);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(n, function(e, t) {
                    return n[e] = t.substr(0, 100)
                }), ajax.lastResp = n.join("<!>");
                var i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(o.shift());
                if (!i) return fail("<pre>" + e + "</pre>", {
                    status: -1
                });
                if (vk.version && vk.version !== i) i && o.length > 4 ? nav.reload({
                    force: !0,
                    from: 2,
                    url: url,
                    query: query && ajx2q(query)
                }) : nav.strLoc ? location.replace(locBase) : Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)("Server error.", {
                    type: 100
                });
                else {
                    vk.version = !1;
                    var r = o.shift(),
                        a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(o.shift()),
                        s = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(o.shift());
                    options.frame && (o = t);
                    var c = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(o.shift());
                    if (vk.lang !== a && options.canReload) nav.reload({
                        force: !0,
                        from: 3,
                        url: url,
                        query: query && ajx2q(query)
                    });
                    else {
                        var _ = function() {
                            var e = ["common.css"];
                            if (r)
                                for (var t = 0, n = (r = r.split(",")).length; t < n; ++t) e.push(r[t]);
                            if (stVersions.lang < s)
                                for (var i in stVersions.lang = s, StaticFiles) /^lang\d/i.test(i) && e.push(i);
                            if (!options.frame) try {
                                ajax._parseRes(o, options._reqid)
                            } catch (e) {
                                Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)("<b>JSON Error:</b> " + e.message, {
                                    type: 5,
                                    answer: o.join("<!>"),
                                    url: url,
                                    query: query && ajx2q(query)
                                })
                            }
                            stManager.add(e, _processResponse.pbind(c, o))
                        };
                        if (window.stVersions) {
                            if (i === stVersions.nav) return _();
                            headNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ce)("script", {
                                type: "text/javascript",
                                src: "/js/loader_nav" + i + "_" + vk.lang + ".js"
                            })), setTimeout(function e() {
                                if (i === stVersions.nav) return _();
                                setTimeout(e, 100)
                            }, 0)
                        }
                    }
                }
            };
            if (options.local && (done = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.vkLocal)(done)), options.cache > 0 || options.forceGlobalCache) {
                var answer = ajaxCache[cacheKey];
                if (answer && answer._loading) return void answer._callbacks.push(_processResponse);
                if (answer && !options.forceGlobalCache) return _processResponse(0, answer), void(3 === options.cache && delete ajaxCache[cacheKey]);
                if (answer = window.globalAjaxCache[cacheKey]) return -1 == answer || Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.isFunction)(answer) ? window.globalAjaxCache[cacheKey] = options.onDone : options.onDone.apply(window, answer), void(options.hideProgress && options.hideProgress())
            }
            ajaxCache[cacheKey] = {
                _loading: 1,
                _callbacks: []
            }, window.debuglogSent ? (options._reqid = debuglogSent(url + (query ? ": " + ajx2q(query, options.noSort).replace(/&/g, "&amp;") : "")), options.frame && (window._lfrid = options._reqid)) : options._reqid = 0;
            var xhrOptions = {};
            return options.timeout && (xhrOptions.timeout = options.timeout), options.frame ? ajax.framepost(url, query, done, options) : ajax.plainpost(url, query, done, fail, !1, xhrOptions, options)
        },
        tGetParam: function() {
            if (ajax.tStart && ajax.tModule) {
                var e = [ajax.tDone - ajax.tStart, ajax.tProcess - ajax.tDone, ajax.tRender - ajax.tProcess, ajax.tOver - ajax.tStart, ajax.tModule];
                for (var t in e)
                    if (e.hasOwnProperty(t)) {
                        if (e[t] < 0) return !1;
                        if (!e[t] && 0 !== e[t]) return !1
                    }
                return ajax.tStart = !1, e.join(",")
            }
        }
    };

    function initAjax() {
        window.ajaxCache = {}, window.globalAjaxCache = {}, window.ajax = ajax
    }
}, function(e, t, o) {
    var n = o(20),
        i = o(156);
    e.exports = function(e) {
        return n(i(e))
    }
}, , function(e, t, o) {
    var n = o(121);
    e.exports = function(e, t, o) {
        for (var i in t) n(e, i, t[i], o);
        return e
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "scrollToY", function() {
        return a
    }), o.d(t, "scrollToTop", function() {
        return s
    }), o.d(t, "scrollGetX", function() {
        return c
    }), o.d(t, "scrollGetY", function() {
        return _
    }), o.d(t, "disableBodyScroll", function() {
        return l
    }), o.d(t, "enableBodyScroll", function() {
        return d
    }), o.d(t, "isBodyScrollEnabled", function() {
        return u
    });
    var n = o(25),
        i = o(113),
        r = o(89);

    function a(e, t, o, s) {
        if (void 0 == t && (t = 400), "ontouchstart" in document.documentElement && (t = 0), s || (e = Math.max(0, e - (vk.staticheader ? 0 : Object(r.getSize)("page_header_cont")[1]))), Object(r.data)(bodyNode, "tween") && Object(r.data)(bodyNode, "tween").stop(!1), Object(r.data)(htmlNode, "tween") && Object(r.data)(htmlNode, "tween").stop(!1), window.scrollAnimation = !1, t) {
            var l = function() {
                window.scrollAnimation = !1, 2 === o && ("profile" != cur.module && "public" != cur.module && "group" != cur.module && "groups" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, void 0, !0), Object(n.updSideTopLink)())
            };
            window.scrollAnimation = !0, Object(i.animate)(htmlNode, {
                scrollTop: e
            }, {
                duration: t,
                transition: i.Fx.Transitions.sineInOut,
                onComplete: l
            }), Object(i.animate)(bodyNode, {
                scrollTop: e
            }, {
                duration: t,
                transition: i.Fx.Transitions.sineInOut,
                onComplete: l
            })
        } else {
            if (o && 2 !== o) {
                "profile" != cur.module && "public" != cur.module && "group" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, e, !0);
                var d = _() - e;
                return Math.abs(d) > 6 && a(e + (d > 0 ? 6 : -6), 0, 2, !0), Object(n.updSideTopLink)(), clearTimeout(window.scrlToTO), void(window.scrlToTO = setTimeout(a.pbind(e, 100, 2, !0), 0))
            }
            window.scroll(c(), e), o || Object(n.updSideTopLink)()
        }
    }

    function s(e) {
        return a(0, e)
    }

    function c() {
        return window.pageXOffset || scrollNode.scrollLeft || document.documentElement.scrollLeft
    }

    function _() {
        return window.pageYOffset || scrollNode.scrollTop || document.documentElement.scrollTop
    }

    function l() {
        bodyNode.style.overflow = "hidden"
    }

    function d() {
        bodyNode.style.overflow = "auto"
    }

    function u() {
        return "hidden" !== bodyNode.style.overflow
    }
}, , , function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "initDebugTools", function() {
        return i
    }), o.d(t, "logEvalError", function() {
        return r
    }), o.d(t, "debugLog", function() {
        return a
    }), o.d(t, "debugEl", function() {
        return s
    });
    var n = o(58);

    function i() {
        window._logTimer = (new Date).getTime()
    }

    function r(e, t) {
        window.Raven && (t && t.length > 350 && (t = t.slice(0, 150) + "..." + t.slice(-150)), e.message += ": " + t, Raven.captureException(e))
    }

    function a(e) {
        try {
            window.debuglogClient && debuglogClient(e);
            var t = "[" + ((new Date).getTime() - window._logTimer) / 1e3 + "] ";
            if (window.console && console.log) {
                var o = Array.prototype.slice.call(arguments);
                o.unshift(t), n.browser.msie || n.browser.mobile ? console.log(o.join(" ")) : console.log.apply(console, o)
            }
        } catch (e) {}
    }

    function s(e) {
        if (!e) return !1;
        var t = e.tagName,
            o = e.id,
            n = e.className,
            i = (t || "").toLowerCase();
        return n && (i += "." + e.className.replace(/\s+/g, ".")), o && !/^__vk/.test(o) && (i += "#" + e.id), i || (e.toString() || "[NULL]")
    }
}, function(e, t, o) {
    var n = o(19),
        i = o(155),
        r = o(17),
        a = o(57)("IE_PROTO"),
        s = function() {},
        c = function() {
            var e, t = o(60)("iframe"),
                n = r.length;
            for (t.style.display = "none", o(176).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; n--;) delete c.prototype[r[n]];
            return c()
        };
    e.exports = Object.create || function(e, t) {
        var o;
        return null !== e ? (s.prototype = n(e), o = new s, s.prototype = null, o[a] = e) : o = c(), void 0 === t ? o : i(o, t)
    }
}, function(e, t, o) {
    (function(n, i) {
        var r;
        (function() {
            "use strict";

            function a(e) {
                return "function" == typeof e
            }
            var s, c, _ = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                l = 0,
                d = function(e, t) {
                    j[l] = e, j[l + 1] = t, 2 === (l += 2) && (c ? c(y) : m())
                };
            var u = "undefined" != typeof window ? window : void 0,
                p = u || {},
                f = p.MutationObserver || p.WebKitMutationObserver,
                b = void 0 !== n && "[object process]" === {}.toString.call(n),
                h = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

            function w() {
                return function() {
                    setTimeout(y, 1)
                }
            }
            var m, v, O, g, E, j = new Array(1e3);

            function y() {
                for (var e = 0; e < l; e += 2) {
                    (0, j[e])(j[e + 1]), j[e] = void 0, j[e + 1] = void 0
                }
                l = 0
            }
            b ? m = function() {
                n.nextTick(y)
            } : f ? (O = 0, g = new f(y), E = document.createTextNode(""), g.observe(E, {
                characterData: !0
            }), m = function() {
                E.data = O = ++O % 2
            }) : h ? ((v = new MessageChannel).port1.onmessage = y, m = function() {
                v.port2.postMessage(0)
            }) : m = void 0 === u ? function() {
                try {
                    var e = o(169);
                    return s = e.runOnLoop || e.runOnContext,
                        function() {
                            s(y)
                        }
                } catch (e) {
                    return w()
                }
            }() : w();
            var P = function(e, t) {
                var o = this._state;
                if (o === T && !e || o === k && !t) return this;
                var n = new this.constructor(C),
                    i = this._result;
                if (o) {
                    var r = arguments[o - 1];
                    d(function() {
                        F(o, n, r, i)
                    })
                } else W(this, n, e, t);
                return n
            };
            var M = function(e) {
                if (e && "object" == typeof e && e.constructor === this) return e;
                var t = new this(C);
                return B(t, e), t
            };

            function C() {}
            var D = void 0,
                T = 1,
                k = 2,
                L = new K;

            function x(e) {
                try {
                    return e.then
                } catch (e) {
                    return L.error = e, L
                }
            }

            function A(e, t, o) {
                t.constructor === e.constructor && o === P && constructor.resolve === M ? function(e, t) {
                    t._state === T ? S(e, t._result) : t._state === k ? R(e, t._result) : W(t, void 0, function(t) {
                        B(e, t)
                    }, function(t) {
                        R(e, t)
                    })
                }(e, t) : o === L ? R(e, L.error) : void 0 === o ? S(e, t) : a(o) ? function(e, t, o) {
                    d(function(e) {
                        var n = !1,
                            i = function(e, t, o, n) {
                                try {
                                    e.call(t, o, n)
                                } catch (e) {
                                    return e
                                }
                            }(o, t, function(o) {
                                n || (n = !0, t !== o ? B(e, o) : S(e, o))
                            }, function(t) {
                                n || (n = !0, R(e, t))
                            }, e._label);
                        !n && i && (n = !0, R(e, i))
                    }, e)
                }(e, t, o) : S(e, t)
            }

            function B(e, t) {
                var o;
                e === t ? R(e, new TypeError("You cannot resolve a promise with itself")) : "function" == typeof(o = t) || "object" == typeof o && null !== o ? A(e, t, x(t)) : S(e, t)
            }

            function I(e) {
                e._onerror && e._onerror(e._result), U(e)
            }

            function S(e, t) {
                e._state === D && (e._result = t, e._state = T, 0 !== e._subscribers.length && d(U, e))
            }

            function R(e, t) {
                e._state === D && (e._state = k, e._result = t, d(I, e))
            }

            function W(e, t, o, n) {
                var i = e._subscribers,
                    r = i.length;
                e._onerror = null, i[r] = t, i[r + T] = o, i[r + k] = n, 0 === r && e._state && d(U, e)
            }

            function U(e) {
                var t = e._subscribers,
                    o = e._state;
                if (0 !== t.length) {
                    for (var n, i, r = e._result, a = 0; a < t.length; a += 3) n = t[a], i = t[a + o], n ? F(o, n, i, r) : i(r);
                    e._subscribers.length = 0
                }
            }

            function K() {
                this.error = null
            }
            var N = new K;

            function F(e, t, o, n) {
                var i, r, s, c, _ = a(o);
                if (_) {
                    if ((i = function(e, t) {
                            try {
                                return e(t)
                            } catch (e) {
                                return N.error = e, N
                            }
                        }(o, n)) === N ? (c = !0, r = i.error, i = null) : s = !0, t === i) return void R(t, new TypeError("A promises callback cannot return that same promise."))
                } else i = n, s = !0;
                t._state !== D || (_ && s ? B(t, i) : c ? R(t, r) : e === T ? S(t, i) : e === k && R(t, i))
            }
            var H = function(e) {
                return new X(this, e).promise
            };
            var q = function(e) {
                var t = new this(C);
                if (!_(e)) return R(t, new TypeError("You must pass an array to race.")), t;
                var o = e.length;

                function n(e) {
                    B(t, e)
                }

                function i(e) {
                    R(t, e)
                }
                for (var r = 0; t._state === D && r < o; r++) W(this.resolve(e[r]), void 0, n, i);
                return t
            };
            var V = function(e) {
                    var t = new this(C);
                    return R(t, e), t
                },
                z = 0;
            var G = Y;

            function Y(e) {
                this._id = z++, this._state = void 0, this._result = void 0, this._subscribers = [], C !== e && ("function" != typeof e && function() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }(), this instanceof Y ? function(e, t) {
                    try {
                        t(function(t) {
                            B(e, t)
                        }, function(t) {
                            R(e, t)
                        })
                    } catch (t) {
                        R(e, t)
                    }
                }(this, e) : function() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }())
            }
            Y.all = H, Y.race = q, Y.resolve = M, Y.reject = V, Y._setScheduler = function(e) {
                c = e
            }, Y._setAsap = function(e) {
                d = e
            }, Y._asap = d, Y.prototype = {
                constructor: Y,
                then: P,
                catch: function(e) {
                    return this.then(null, e)
                }
            };
            var X = Q;

            function Q(e, t) {
                this._instanceConstructor = e, this.promise = new e(C), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? S(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && S(this.promise, this._result))) : R(this.promise, this._validationError())
            }
            Q.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, Q.prototype._enumerate = function() {
                for (var e = this.length, t = this._input, o = 0; this._state === D && o < e; o++) this._eachEntry(t[o], o)
            }, Q.prototype._eachEntry = function(e, t) {
                var o = this._instanceConstructor,
                    n = o.resolve;
                if (n === M) {
                    var i = x(e);
                    if (i === P && e._state !== D) this._settledAt(e._state, t, e._result);
                    else if ("function" != typeof i) this._remaining--, this._result[t] = e;
                    else if (o === G) {
                        var r = new o(C);
                        A(r, e, i), this._willSettleAt(r, t)
                    } else this._willSettleAt(new o(function(t) {
                        t(e)
                    }), t)
                } else this._willSettleAt(n(e), t)
            }, Q.prototype._settledAt = function(e, t, o) {
                var n = this.promise;
                n._state === D && (this._remaining--, e === k ? R(n, o) : this._result[t] = o), 0 === this._remaining && S(n, this._result)
            }, Q.prototype._willSettleAt = function(e, t) {
                var o = this;
                W(e, void 0, function(e) {
                    o._settledAt(T, t, e)
                }, function(e) {
                    o._settledAt(k, t, e)
                })
            };
            var $ = function() {
                    var e;
                    if (void 0 !== i) e = i;
                    else if ("undefined" != typeof self) e = self;
                    else try {
                        e = Function("return this")()
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                    var t = e.Promise;
                    t && "[object Promise]" === Object.prototype.toString.call(t.resolve()) && !t.cast || (e.Promise = G)
                },
                Z = {
                    Promise: G,
                    polyfill: $
                };
            void 0 === (r = function() {
                return Z
            }.call(t, o, t, e)) || (e.exports = r), $()
        }).call(this)
    }).call(this, o(127), o(183))
}, function(e, t, o) {
    for (var n = o(79), i = o(121), r = o(143), a = o(30), s = o(27), c = o(146), _ = c("iterator"), l = c("toStringTag"), d = s.Array, u = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], p = 0; p < 5; p++) {
        var f, b = u[p],
            h = r[b],
            w = h && h.prototype;
        if (w)
            for (f in w[_] || a(w, _, d), w[l] || a(w, l, b), s[b] = d, n) w[f] || i(w, f, n[f], !0)
    }
}, , , function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "topHeaderClose", function() {
        return l
    }), o.d(t, "topHeaderClearClose", function() {
        return d
    });
    var n = o(89),
        i = o(177),
        r = o(80),
        a = o(18),
        s = o(153),
        c = o(61),
        _ = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();

    function l(e) {
        window.headerDestroy && window.headerDestroy(), window.headerDestroy = e
    }

    function d() {
        delete window.headerDestroy
    }
    var u = {
        cache: {},
        lists: {},
        maxItems: 8,
        init: function() {
            if (this.inited) return !1;
            var e = Object(n.ge)("ts_input"),
                t = Object(n.ge)("ts_cont_wrap");
            if (vk.id && Chat.init(), !e) return !1;
            Object(i.addEvent)(e, "focus", function() {
                u.deselect(), Object(r.trim)(Object(n.val)(this)) && Object(n.addClass)(t.firstChild, "active"), u.toggleInput(!0)
            }), Object(i.addEvent)(e, "keydown", function(o) {
                switch (o.keyCode) {
                    case i.KEY.DOWN:
                    case i.KEY.UP:
                        u.moveSelection(o.keyCode), Object(i.cancelEvent)(o);
                        break;
                    case i.KEY.ENTER:
                        var s = Object(n.geByClass1)("active", t);
                        if (s) u.select(s, o);
                        else {
                            var c = Object(r.trim)(Object(n.val)(this));
                            c && (e.blur(), u.clear(), u.toggle(!1), nav.go("/search?c[section]=auto&c[q]=" + encodeURIComponent(c)))
                        }
                        Object(i.cancelEvent)(o);
                        break;
                    case i.KEY.TAB:
                        u.clear(), u.toggleInput(!1), Object(a.cancelStackFilter)("top_search", !0)
                }
            }), vk.id && (Object(i.addEvent)(e, "keyup", function(e) {
                switch (e.keyCode) {
                    case i.KEY.DOWN:
                    case i.KEY.UP:
                    case i.KEY.ENTER:
                    case i.KEY.ESC:
                        Object(i.cancelEvent)(e);
                        break;
                    default:
                        u.prepareRows(Object(r.trim)(Object(n.val)(this)))
                }
            }), Object(i.addEvent)(e, "paste", function() {
                setTimeout(function() {
                    u.prepareRows(Object(r.trim)(Object(n.val)(e)))
                }, 10)
            }), Object(i.addEvent)(document, "mousedown", function(e) {
                Object(i.checkKeyboardEvent)(e) || Object(n.domClosest)("_audio_page_layout", e.target) || Object(n.domClosest)("_ap_layer__close", e.target) || Object(n.domClosest)("layer_wrap", e.target) || l()
            }), this.inited = !0)
        },
        clear: function() {
            window.tooltips && tooltips.destroyAll(Object(n.ge)("ts_cont_wrap"));
            var e = Object(n.ge)("ts_input");
            e && e.phonblur && (Object(n.val)(e, ""), e.blur(), e.phonblur(), this.prepareRows())
        },
        select: function(e, t, o) {
            if (Object(i.checkEvent)(t)) return !0;
            var a = Object(n.ge)("ts_input"),
                s = Object(r.trim)(Object(n.val)(a)).length,
                c = e.getAttribute("hinttype");
            if (this.clear(), l(), s || a.blur(), o && Object(n.hasClass)(t.target, "ts_contact_status")) return ajax.post("al_search.php", {
                act: "save_metrics",
                ql: s,
                mk: "chat_box"
            }), this.writeBox(o), !1;
            var _ = nav.go(e, t);
            return ajax.post("al_search.php", {
                act: "save_metrics",
                ql: s,
                mk: c
            }), _
        },
        deselect: function() {
            var e = Object(n.ge)("ts_cont_wrap");
            Object(r.each)(Object(n.geByClass)("active", e), function(e, t) {
                return Object(n.removeClass)(t, "active")
            })
        },
        itemOver: function(e, t, o) {
            1 === t && u.deselect();
            var i = Object(r.inArray)(e.getAttribute("hintType"), ["h_friends", "h_correspondents", "h_chats"]);
            Object(n.toggleClass)(e, "write", i), Object(n.toggleClass)(e, "active", t)
        },
        moveSelection: function(e) {
            var t = Object(n.ge)("ts_cont_wrap"),
                o = Object(n.geByClass1)("active", t),
                r = void 0;
            switch (e) {
                case i.KEY.UP:
                    r = !!o && (this.getNextNode(o, -1, "a") || o);
                    break;
                case i.KEY.DOWN:
                    r = o ? this.getNextNode(o, 1, "a") || o : t.firstChild
            }
            return this.deselect(), r && Object(n.addClass)(r, "active"), !1
        },
        getNextNode: function(e, t, o) {
            for (var i = e, r = Object(n.domPN)(e);;) {
                if ((i = t > 0 ? Object(n.domNS)(i) : Object(n.domPS)(i)) || (i = t > 0 ? Object(n.domFC)(r) : Object(n.domLC)(r)), o && i.tagName && i.tagName.toLowerCase() === o || !o && i) return i;
                if (i === e) return !1
            }
        },
        toggleInput: function(e) {
            e = !!e;
            var t = Object(n.ge)("ts_cont_wrap");
            Object(n.isVisible)(t) !== e && (Object(n.toggle)("ts_cont_wrap", e), e && Object(a.cancelStackPush)("top_search", function() {
                var e = Object(n.ge)("ts_input");
                u.toggleInput(!1), e.blur()
            }, !0))
        },
        getList: function(e) {
            switch (e) {
                case "friends":
                    return this.lists.friends || this.topFriends || {};
                case "publics":
                case "events":
                case "groups":
                case "apps":
                case "chats":
                case "search":
                    return this.lists[e] || {}
            }
            return {}
        },
        onlines: function() {
            return window.curFastChat && curFastChat.onlines || this.lists.onlines || {}
        },
        initFriendsList: function() {
            if (u.friendsLoaded) return !1;
            if (cur.initingFL || vk.isBanned || !vk.id) return !1;
            var e = function() {
                    if (u.friendsLoaded) return !1;
                    cur.initingFL = !0, ajax.post("al_search.php", {
                        act: "get_pages"
                    }, {
                        cache: 1,
                        onDone: function(e) {
                            delete cur.initingFL, u.friendsLoaded || (Object(r.each)(e, function(e, t) {
                                u.lists[e] = t, "onlines" !== e && u.updateCache(e)
                            }), u.friendsLoaded = !0, Object(n.val)("ts_input") || u.prepareRows(""))
                        },
                        onFail: function() {
                            delete cur.initingFL
                        }
                    })
                },
                t = u.getList("friends");
            Object(r.isEmpty)(t) ? (cur.initingFL = !0, ajax.post("al_search.php", {
                act: "get_top_friends"
            }, {
                cache: 1,
                onDone: function(t) {
                    delete cur.initingFL, u.topFriends = t, u.updateCache("friends"), u.forceUpdate = !0, u.prepareRows(cur.tsStr || ""), e()
                },
                onFail: function() {
                    delete cur.initingFL
                }
            })) : (u.updateCache("friends"), u.forceUpdate = !0, u.prepareRows(cur.tsStr || ""), e())
        },
        getSimilarQueries: function(e) {
            var t = [e = e.toLowerCase()],
                o = void 0;
            return (o = Object(s.parseLatin)(e)) && t.push(o), (o = Object(s.parseLatKeys)(e)) && t.push(o), (o = Object(s.parseCyr)(e)) && t.push(o), t
        },
        searchCache: function(e, t) {
            var o = this,
                n = u.getList(e);
            if (!t) return !1;
            var i = this.getSimilarQueries(t);
            if (void 0 !== this.cache[e][t]) return i;
            var a = this.cache[e][t] = {};
            Object(r.each)(i, function(t, i) {
                var s = o.cache[e][" " + i.charAt(0).toLowerCase()];
                if (s) {
                    var c = new RegExp("(^|[\\s\\-\\(\\)\\.,;|:]+)" + Object(r.escapeRE)(i), "gi");
                    Object(r.each)(s, function(e) {
                        var t = n[e + "_"];
                        if (!Object(r.isArray)(t)) return !0;
                        null !== t[0].match(c) && (a[e] = 1)
                    })
                }
            });
            var s = 0;
            return Object(r.each)(a, function() {
                return s++
            }), a._num = s, i
        },
        updateCache: function(e, t, o) {
            var n = this,
                i = t || this.getList(e);
            this.cache[e] = o && this.cache[e] || {}, Object(r.each)(i, function(t, o) {
                var i = o[0],
                    a = Object(r.intval)(t),
                    s = i.split(/[\s\-\(\)\.,;|:]+/);
                Object(r.each)(s, function(t, o) {
                    var i = " " + o.charAt(0).toLowerCase();
                    n.cache[e][i] = n.cache[e][i] || {}, n.cache[e][i][a] = 1
                })
            })
        },
        listSearch: function(e, t, o, n) {
            var i = [],
                a = {};
            return t ? (u.searchCache(e, t), a = u.cache[e] && u.cache[e][t] || {}) : Object(r.each)(u.getList(e), function(e) {
                var t = Object(r.intval)(e);
                a[t] = 1
            }), Object(r.each)(u.getList(e), function(e) {
                var t = Object(r.intval)(e),
                    s = a[t];
                if ((!n || !n[t]) && s) return !!o-- && void i.push([t, this])
            }), i
        },
        row: function(e, t, o, n, i, a, s, _, l) {
            var d = 0;
            if (a && (n = n.replace(a, '$1<em class="ts_clist_hl">$2</em>')), Object(r.inArray)(s, ["h_friends", "h_correspondents", "h_chats"]) && (d = e), _ || (_ = ""), l = Object(r.intval)(l)) {
                var u = "";
                1 & l && (u += "page_verified "), 2 & l && (u += "page_top_author "), -128932034 === e ? u += "ph_verified " : -29246653 === e && (u += "pg_verified "), l = '<div class="' + u + '" onmouseover="pageVerifiedTip(this, {type: ' + l + ", oid: " + e + '})"></div>'
            } else l = "";
            return '\n<a href="' + t + '" class="ts_contact clear_fix" id="ts_contact' + e + '" onclick="return TopSearch.select(this, event, ' + d + ');" onmousedown="event.cancelBubble = true;"\n      onmouseover="TopSearch.itemOver(this, 1, event);"  onmouseout="TopSearch.itemOver(this, 0, event);" hinttype="' + s + '">\n  <span class="ts_contact_photo ' + Object(c.onlinePlatformClass)(i) + '">\n    <img class="ts_contact_img" src="' + o + '"/>\n  </span>\n  <span class="ts_contact_name fl_l">\n    <div class="ts_contact_title_wrap' + (l ? " is_verified" : "") + '">\n      <span class="ts_contact_title">' + n + "</span>\n    </div>" + l + '\n    <div class="ts_contact_info">' + _ + '</div>\n  </span>\n  <div class="ts_contact_status"></div>\n</a>'
        },
        searchLists: function(e) {
            return e ? {
                friends: {
                    order: 0,
                    count: u.maxItems - 1,
                    label: Object(s.getLang)("global_friends")
                },
                groups: {
                    order: 1,
                    count: 4,
                    label: Object(s.getLang)("global_communities")
                },
                publics: {
                    count: 2,
                    parent: "groups"
                },
                events: {
                    count: 1,
                    parent: "groups"
                },
                apps: {
                    order: 2,
                    count: 1,
                    label: Object(s.getLang)("global_apps")
                },
                vk_apps: {
                    order: 2,
                    count: 1,
                    label: Object(s.getLang)("global_apps")
                },
                chats: {
                    order: 3,
                    count: u.maxItems - 1,
                    label: Object(s.getLang)("global_chats")
                },
                search: {
                    order: 4,
                    count: u.maxItems - 1,
                    label: Object(s.getLang)("head_search_results")
                }
            } : {
                friends: {
                    order: 0,
                    count: u.maxItems,
                    label: Object(s.getLang)("global_friends")
                }
            }
        },
        initListsHtml: function() {
            u.listsHtml = []
        },
        addToListsHtml: function(e, t, o) {
            var n = u.searchLists(o),
                i = n[(n[e] || {}).parent || e] || {},
                r = i.order || 0,
                a = i.label || "";
            u.listsHtml[r] = u.listsHtml[r] || (o && a ? ['<div class="ts_search_sep">' + a + "</div>"] : []), u.listsHtml[r].push(t)
        },
        htmlRows: function(e) {
            var t = "",
                o = u.listsHtml.map(function(e) {
                    return e.join("")
                });
            if (e) {
                var n = "#" === e[0] ? "statuses" : "auto",
                    i = "#" === e[0] ? Object(s.getLang)("global_news_search_results") : Object(s.getLang)("global_show_all_results");
                t += '\n<a href="/search?c[section]=' + n + "&c[q]=" + encodeURIComponent(e) + '" class="ts_search_link clear_fix active" id="ts_search_link"\n    onclick="return TopSearch.select(this, event);" onmousedown="event.cancelBubble = true;" onmouseover="TopSearch.itemOver(this, 1, event);"\n    onmouseout="TopSearch.itemOver(this, 0, event);" >\n  <span class="ts_contact_name fl_l">' + i + '</span>\n  <div class="ts_contact_status "></div>\n</a>'
            }
            return t + o.join("")
        },
        prepareRows: function(e) {
            var t = u.maxItems,
                o = Object(n.ge)("ts_cont_wrap");
            if (!o || !vk.id) return !1;
            if (cur.tsStr && cur.tsStr === e && !u.forceUpdate) return !1;
            delete u.forceUpdate, u.initListsHtml();
            var i = {};
            if (e) {
                var a = [];
                Object(r.each)(this.getSimilarQueries(e), function() {
                    a.push(Object(r.escapeRE)(this))
                }), cur.lastRe = new RegExp("([ -]|^|s|&nbsp;|\b)(" + a.join("|") + ")", "gi"), t--
            }
            Object(r.each)(u.searchLists(e), function(o, a) {
                if (u.cache[o]) {
                    var s = a.count,
                        c = u.listSearch(o, e, s, i),
                        l = [],
                        d = 0;
                    Object(r.isEmpty)(c) || (Object(r.each)(c, function(e, o) {
                        if (!t || d >= s) return !1;
                        l.push(o), t--, d++
                    }), l.length && Object(r.each)(l, function(t, a) {
                        var s = a[1],
                            c = Object(r.intval)(a[0]),
                            l = c > 0 && u.onlines()[c],
                            d = _(s, 6),
                            p = d[0],
                            f = d[1],
                            b = d[2],
                            h = d[3],
                            w = d[4],
                            m = d[5],
                            v = "search" === o ? h : "h_" + o,
                            O = u.row(c, b, f, p, l, n.re, v, w, m);
                        u.addToListsHtml(o, O, e), i[c] = 1
                    }))
                }
            }), o.innerHTML = u.htmlRows(e), t && e && "#" !== e[0] && this.hintsSearch(e, cur.lastRe || !1), e && (cur.tsStr = e)
        },
        hintsSearch: function(e, t) {
            var o = Object(n.ge)("ts_input"),
                i = Object(n.ge)("ts_cont_wrap"),
                a = void 0;
            ajax.post("al_search.php", {
                act: "get_pages_hints",
                q: e
            }, {
                cache: 1,
                onDone: function(s) {
                    if (Object(r.trim)(Object(n.val)(o)) !== e) return !1;
                    if (!s) return !1;
                    var c = u.maxItems - Object(n.geByClass)("ts_contact", i).length - 1,
                        l = {};
                    if (Object(r.each)(s, function(o, i) {
                            var s = Object(r.intval)(o),
                                d = _(i, 6),
                                p = d[0],
                                f = d[1],
                                b = d[2],
                                h = d[3],
                                w = d[4],
                                m = d[5],
                                v = u.searchLists(e),
                                O = h.replace("h_", ""),
                                g = (v[O] || {}).parent || O;
                            if (void 0 === v[g] && (g = "search"), l[g] = l[g] || {}, l[g][o] = i, u.lists[g] = u.lists[g] || {}, u.lists[g][o] = i, Object(n.ge)("ts_contact" + s)) return !0;
                            if (!c--) return !1;
                            var E = u.row(s, b, f, p, !1, t, h, w, m);
                            return u.addToListsHtml(g, E, e), a = !0, !0
                        }), Object(r.each)(l, function(e, t) {
                            return u.updateCache(e, t, !0)
                        }), a) {
                        var d = Object(n.geByClass1)("active", i),
                            p = d ? d.id : "";
                        i.innerHTML = u.htmlRows(e), p && Object(n.ge)(p) && Object(n.addClass)(Object(n.ge)(p), "active")
                    }
                }
            })
        },
        writeBox: function(e) {
            window.curFastChat && curFastChat.inited && window.FastChat ? FastChat.selectPeer(e, !1, {
                entrypoint: "fastchat_global_search"
            }) : e > 0 && e < 2e9 ? window.showWriteMessageBox(!1, e) : nav.go("/im?sel=" + e)
        }
    };
    t.default = u
}, , function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "cancelStackFilter", function() {
        return i
    }), o.d(t, "cancelStackPush", function() {
        return r
    }), o.d(t, "cancelStackPop", function() {
        return a
    });
    var n = o(15);

    function i(e, t) {
        var o = window.cancelStack || [];
        return t && Object(n.topHeaderClearClose)(), window.cancelStack = o.filter(function(t) {
            return t.name !== e
        }), window.cancelStack
    }

    function r(e, t, o) {
        return o && Object(n.topHeaderClose)(function() {
            t(), i(e)
        }), window.cancelStack = i(e).concat([{
            func: t,
            name: e,
            dclick: o
        }]), window.cancelStack
    }

    function a() {
        var e = window.cancelStack || [];
        Object(n.topHeaderClearClose)(), e.length > 0 && e.pop().func();
        var t = e[e.length - 1];
        return t && t.dclick && Object(n.topHeaderClose)(function() {
            t.func(), i(t.name)
        }), window.cancelStack = e, window.cancelStack
    }
}, function(e, t, o) {
    var n = o(134);
    e.exports = function(e) {
        if (!n(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t, o) {
    var n = o(22);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == n(e) ? e.split("") : Object(e)
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "updSeenAdsInfo", function() {
        return a
    }), o.d(t, "__adsGetAjaxParams", function() {
        return s
    }), o.d(t, "__adsUpdate", function() {
        return c
    }), o.d(t, "__adsSet", function() {
        return _
    }), o.d(t, "__adsUpdateExternalStats", function() {
        return l
    }), o.d(t, "initAds", function() {
        return d
    });
    var n = o(187),
        i = o(80),
        r = o(89);

    function a() {
        if ((Object(r.getXY)("ads_left", !0) || {})[1] && vk.id) {
            var e = Object(r.getXYRect)(Object(r.geByTag1)("ol", Object(r.ge)("side_bar_inner")), !0),
                t = e ? e.height : 0,
                o = Object(r.getXYRect)(Object(r.ge)("left_blocks"), !0),
                a = o ? o.height : 0,
                s = Math.max(Math.floor(((window.lastWindowHeight || 0) - t - a - 42 - 10) / 260), 0);
            window.__seenAds = Object(i.intval)(Object(n.getCookie)("remixseenads")), __seenAds !== s && (window.__seenAds = s, Object(n.setCookie)("remixseenads", s, 30))
        }
    }

    function s(e, t) {
        return !window.noAdsAtAll && (s = function() {
            return window.AdsLight && AdsLight.getAjaxParams.apply(AdsLight.getAjaxParams, arguments) || {
                al_ad: null
            }
        }, stManager.add(["aes_light.js"], s.pbind(e, t)) || {
            al_ad: null
        })
    }

    function c(e) {
        if (window.noAdsAtAll) return !1;
        c = function() {
            window.AdsLight && AdsLight.updateBlock.apply(AdsLight.updateBlock, arguments)
        }, stManager.add(["aes_light.js"], c.pbind(e))
    }

    function _(e, t, o, n, i, r) {
        if (window.noAdsAtAll) return !1;
        _ = function() {
            var e = "";
            arguments && arguments[0] && (e = arguments[0]), "\x3c!--criteo" === e.slice(0, "\x3c!--criteo".length) && Math.random() < .05 && (window.AdsLight && AdsLight.setNewBlock ? ajax.post("/wkview.php?act=mlet&mt=750", {}, {
                onFail: function() {
                    return !0
                }
            }) : ajax.post("/wkview.php?act=mlet&mt=751", {}, {
                onFail: function() {
                    return !0
                }
            })), window.AdsLight && AdsLight.setNewBlock.apply(AdsLight.setNewBlock, arguments)
        }, stManager.add(["aes_light.js"], _.pbind(e, t, o, n, i, r))
    }

    function l(e) {
        if (window.noAdsAtAll) return !1;
        l = function() {
            window.AdsLight && AdsLight.updateExternalStats.apply(AdsLight.updateExternalStats, arguments)
        }, stManager.add(["aes_light.js"], l.pbind(e))
    }

    function d() {
        window.__seenAds = Object(i.intval)(Object(n.getCookie)("remixseenads")), window.__adsUpdate = c, window.__adsSet = _, window.__adsGetAjaxParams = s, window.__adsUpdateExternalStats = l
    }
    window.__adsLoaded = Object(i.vkNow)()
}, function(e, t) {
    var o = {}.toString;
    e.exports = function(e) {
        return o.call(e).slice(8, -1)
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "mobileOnlineTip", function() {
        return r
    }), o.d(t, "pageVerifiedTip", function() {
        return a
    }), o.d(t, "audioShowActionTooltip", function() {
        return s
    }), o.d(t, "mentionOver", function() {
        return c
    }), o.d(t, "bookmarkTooltip", function() {
        return _
    });
    var n = o(164),
        i = o(89);

    function r(e, t) {
        var o = t.asrtl ? 0 : t.right ? 289 : 35,
            i = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
        return Object(n.showTooltip)(e, {
            url: "al_login.php",
            params: {
                act: "mobile_tt",
                mid: t.mid,
                was: t.was
            },
            slide: 15,
            ajxdt: 200,
            showdt: 200,
            hidedt: 200,
            forcetoup: t.forcetoup,
            toup: !1,
            dir: "auto",
            asrtl: t.asrtl,
            appendParentCls: t.appendParentCls,
            shift: [o, 8, 7],
            className: "mobile_tt" + i
        })
    }

    function a(e, t) {
        return Object(n.showTooltip)(e, {
            url: "/al_page.php",
            params: {
                act: "verified_tt",
                type: t.type,
                oid: t.oid
            },
            slide: 15,
            ajxdt: 200,
            showdt: 200,
            hidedt: 200,
            dir: "auto",
            shift: [94, 7, 7],
            className: "verified_tt"
        })
    }

    function s(e, t, o) {
        if (!cur._addRestoreInProgress) {
            var r = Object(i.gpeByClass)("_audio_row", e),
                a = AudioUtils.getAudioFromEl(r, !0),
                s = Object(i.domData)(e, "action"),
                c = AudioUtils.getRowActionName(s, a, r),
                _ = {
                    text: function() {
                        return c
                    },
                    black: 1,
                    shift: t || [7, 4, 0],
                    needLeft: !0,
                    forcetodown: o
                };
            Object(i.gpeByClass)("_im_mess_stack", e) ? (_.appendParentCls = "_im_mess_stack", _.shift = [7, 10, 0], _.noZIndex = !0) : Object(i.gpeByClass)("top_notify_wrap", e) ? _.appendParentCls = "top_notify_wrap" : Object(i.gpeByClass)("_ape_audio_item", e) && (_.appendParentCls = "_ape_audio_item"), Object(n.showTooltip)(e, _)
        }
    }

    function c(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        Object(n.showTooltip)(e, {
            url: "al_wall.php",
            params: {
                act: "mention_tt",
                mention: e.getAttribute("mention_id"),
                from: "wall"
            },
            shift: t.shift || [52, 7, 7],
            hidedt: 500,
            showdt: 500,
            slide: 15,
            checkLeft: !0,
            reverseOffset: t.reverseOffset || 112,
            dir: "auto",
            appendEl: Object(i.domClosest)("im-page-history-w", e) || Object(i.domClosest)("rb_box_wrap", e) || Object(i.domClosest)("wk_cont", e) || Object(i.domClosest)("scroll_fix_wrap", e)
        })
    }

    function _(e) {
        var t = "";
        Object(i.gpeByClass)("_im_mess_stack", e) && (t = "_im_mess_stack"), Object(n.showTooltip)(e, {
            className: "bookmarks_tt ",
            shift: [32, 8],
            text: function() {
                return "1" === Object(i.domData)(e, "state") ? Object(i.domData)(e, "remove") : Object(i.domData)(e, "add")
            },
            black: 1,
            appendParentCls: t
        })
    }
}, , function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "notaBene", function() {
        return l
    }), o.d(t, "updSideTopLink", function() {
        return d
    }), o.d(t, "createButton", function() {
        return u
    }), o.d(t, "actionsMenuItemLocked", function() {
        return p
    }), o.d(t, "lockActionsMenuItem", function() {
        return f
    }), o.d(t, "unlockActionsMenuItem", function() {
        return b
    }), o.d(t, "linkLocked", function() {
        return h
    }), o.d(t, "lockLink", function() {
        return w
    }), o.d(t, "unlockLink", function() {
        return m
    }), o.d(t, "lockButton", function() {
        return v
    }), o.d(t, "unlockButton", function() {
        return O
    }), o.d(t, "buttonLocked", function() {
        return g
    }), o.d(t, "isButtonLocked", function() {
        return E
    }), o.d(t, "disableButton", function() {
        return j
    }), o.d(t, "sbWidth", function() {
        return y
    }), o.d(t, "isChecked", function() {
        return P
    }), o.d(t, "checkbox", function() {
        return M
    }), o.d(t, "disable", function() {
        return C
    }), o.d(t, "radioval", function() {
        return D
    }), o.d(t, "radiobtn", function() {
        return T
    }), o.d(t, "showProgress", function() {
        return k
    }), o.d(t, "hideProgress", function() {
        return L
    }), o.d(t, "disableEl", function() {
        return x
    }), o.d(t, "enableEl", function() {
        return A
    }), o.d(t, "initUiHelpers", function() {
        return B
    });
    var n = o(89),
        i = o(177),
        r = o(80),
        a = o(6),
        s = o(113),
        c = o(58),
        _ = o(153);

    function l(e, t, o) {
        if (e = Object(n.ge)(e)) {
            o || Object(n.elfocus)(e), void 0 === Object(n.data)(e, "backstyle") && Object(n.data)(e, "backstyle", e.style.backgroundColor || "");
            var i = Object(n.data)(e, "back") || Object(n.data)(e, "back", Object(n.getStyle)(e, "backgroundColor")),
                r = {
                    notice: "#FFFFE0",
                    warning: "#FAEAEA"
                };
            Object(n.setStyle)(e, "backgroundColor", r[t] || t || r.warning), setTimeout(s.animate.pbind(e, {
                backgroundColor: i
            }, 300, function() {
                e.style.backgroundColor = Object(n.data)(e, "backstyle")
            }), 400)
        }
    }

    function d(e) {
        if (window.scrollNode && !c.browser.mobile && window._tbLink) {
            var t = Object(n.ge)("page_body"),
                o = Object(n.getXY)(t),
                i = Object(a.scrollGetY)(),
                r = bodyNode.scrollLeft,
                l = Object(n.ge)("side_bar"),
                d = Object(n.isVisible)(l);
            if (window._stlSideTop = Math.max((d ? Object(n.getSize)(l)[1] : 0) - i - (c.browser.mozilla ? Object(n.getXY)(pageNode)[1] : 0), o[1]), e || r != __scrLeft) {
                var u = Object(n.ge)("page_layout"),
                    p = vk.rtl ? u.offsetLeft + u.offsetWidth : 0,
                    f = vk.rtl ? (window.lastWindowWidth || 0) - p : u.offsetLeft;
                Object(n.setStyle)(_stlLeft, {
                    width: Math.max(f - 1, 0)
                });
                var b = vk.rtl ? o[0] + t.offsetWidth + 5 : f,
                    h = vk.rtl ? p - b : o[0] - 5 - b;
                Object(n.setStyle)(_stlSide, {
                    left: b - r,
                    width: Math.max(h, 0)
                }), __scrLeft = r
            }
            Object(n.setStyle)(_stlSide, {
                top: _stlSideTop,
                height: Math.max((window.lastWindowHeight || 0) - _stlSideTop, 0)
            }), __adsUpdate();
            var w = _tbLink.loc || _stlWas || i > 200,
                m = i > 250 && cur._regBar,
                v = 0,
                O = !1;
            if (w) {
                1 !== _stlShown && (Object(n.show)(_stlLeft, _stlSide), Object(n.addClass)(_stlLeft, "stl_active"), Object(n.addClass)(_stlSide, "stl_active"), _stlShown = 1), _tbLink.loc && cur._noUpLink && (i = 0), _stlWas && i > 500 && (_stlWas = 0), i > 200 ? (v = (i - 200) / 200, (_stlWasSet || _stlBack) && (_stlWasSet = _stlBack = 0, O = 1, Object(n.val)(_stlText, Object(_.getLang)("global_to_top")), Object(n.removeClass)(_stlText, "down"), Object(n.removeClass)(_stlText, "back"))) : (v = (200 - i) / 200, _stlWas ? _stlWasSet || (_stlWasSet = 1, O = 0, Object(n.val)(_stlText, ""), Object(n.addClass)(_stlText, "down"), _stlBack && (_stlBack = 0, Object(n.removeClass)(_stlText, "back"))) : _tbLink.loc && (_stlBack || (_stlBack = 1, O = _tbLink.fast ? 1 : 0, Object(n.val)(_stlText, Object(_.getLang)("global_back")), Object(n.addClass)(_stlText, "back"), _stlWasSet && (_stlWasSet = 0, Object(n.removeClass)(_stlText, "down"))))), !1 !== O && Object(n.toggleClass)(_stlLeft, "over_fast", Object(n.hasClass)(_stlLeft, "over") && O);
                var g = {
                    opacity: Math.min(Math.max(v, 0), 1)
                };
                vk.staticheader && (g.top = -Math.min(Object(n.getSize)("page_header_cont")[1], i)), Object(n.setStyle)(_stlLeft, g)
            } else 0 !== _stlShown && (Object(n.hide)(_stlLeft, _stlSide), _stlShown = 0);
            vk.id || (!_regBar && m ? (_regBar = 1, Object(n.val)(Object(n.ge)("reg_bar_content"), cur._regBar), Object(s.animate)(Object(n.ge)("reg_bar"), {
                top: 0,
                transition: s.Fx.Transitions.sineInOut
            }, 400), Object(s.animate)(Object(n.ge)("stl_bg"), {
                paddingTop: 60,
                transition: s.Fx.Transitions.sineInOut
            }, 400)) : _regBar && !m && (_regBar = 0, Object(s.animate)(Object(n.ge)("reg_bar"), {
                top: -56,
                transition: s.Fx.Transitions.sineInOut
            }, 400), Object(s.animate)(Object(n.ge)("stl_bg"), {
                paddingTop: 13,
                transition: s.Fx.Transitions.sineInOut
            }, 400)))
        }
    }

    function u(e, t) {
        if ((e = Object(n.ge)(e)) && !e.btnevents)
            if (Object(n.hasClass)(e, "flat_button")) Object(r.isFunction)(t) && (e.onclick = t.pbind(e));
            else {
                var o = e.parentNode;
                if (Object(n.hasClass)(o, "button_blue") || Object(n.hasClass)(o, "button_gray")) Object(r.isFunction)(t) && (e.onclick = t.pbind(e));
                else {
                    var a = !1;
                    Object(i.addEvent)(e, "click mousedown mouseover mouseout", function(r) {
                        if (!Object(n.hasClass)(o, "locked")) switch (r.type) {
                            case "click":
                                if (!a) return;
                                return e.className = "button_hover", t(e), Object(i.cancelEvent)(r);
                            case "mousedown":
                                e.className = "button_down";
                                break;
                            case "mouseover":
                                a = !0, e.className = "button_hover";
                                break;
                            case "mouseout":
                                e.className = "button", a = !1
                        }
                    }), e.btnevents = !0
                }
            }
    }

    function p(e) {
        var t = Object(n.ge)(e);
        if (t) return Object(n.hasClass)(t, "ui_actions_menu_item_lock")
    }

    function f(e) {
        if ((e = Object(n.ge)(e)) && Object(n.hasClass)(e, "ui_actions_menu_item") && !Object(n.hasClass)(e, "ui_actions_menu_item_lock")) {
            Object(n.data)(e, "inner", e.innerHTML), Object(n.addClass)(e, "ui_actions_menu_item_lock");
            var t = Object(n.ce)("div", {
                className: "ui_actions_menu_item_lock_text"
            });
            Object(n.val)(t, e.innerHTML), e.appendChild(t), k(e)
        }
    }

    function b(e) {
        (e = Object(n.ge)(e)) && Object(n.hasClass)(e, "ui_actions_menu_item") && Object(n.hasClass)(e, "ui_actions_menu_item_lock") && (Object(n.removeClass)(e, "ui_actions_menu_item_lock"), e.innerHTML = Object(n.data)(e, "inner"))
    }

    function h(e) {
        var t = Object(n.ge)(e);
        if (t) return Object(n.hasClass)(t, "link_lock")
    }

    function w(e, t) {
        var o = Object(n.ge)(e);
        o && "a" === o.tagName.toLowerCase() && !h(o) && (Object(n.addClass)(o, "link_lock"), t && Object(r.each)(t, function(e, t) {
            return Object(n.addClass)(o, t)
        }))
    }

    function m(e, t) {
        var o = Object(n.ge)(e);
        !o && h(o) && (Object(n.removeClass)(o, "link_lock"), t && Object(r.each)(t, function(e, t) {
            return Object(n.removeClass)(o, t)
        }))
    }

    function v(e) {
        var t = Object(n.ge)(e);
        if (t && ("button" === t.tagName.toLowerCase() || Object(n.hasClass)(t, "flat_button") || Object(n.hasClass)(t, "wr_header")) && !E(t)) {
            var o = Object(n.getSize)(t);
            Object(n.addClass)(t, "flat_btn_lock"), Object(n.data)(t, "inner", t.innerHTML), Object(n.setStyle)(t, {
                width: o[0],
                height: o[1]
            }), t.innerHTML = "", k(t, "btn_lock")
        }
    }

    function O(e) {
        var t = Object(n.ge)(e);
        t && E(t) && (L(t), t.innerHTML = Object(n.data)(t, "inner"), Object(n.removeClass)(t, "flat_btn_lock"), Object(n.setStyle)(t, {
            width: null,
            height: null
        }))
    }

    function g(e) {
        return E(e)
    }

    function E(e) {
        var t = Object(n.ge)(e);
        if (t) return Object(n.hasClass)(t, "flat_btn_lock")
    }

    function j(e, t) {
        var o = Object(n.ge)(e);
        if (o && "button" === o.tagName.toLowerCase())
            if (t) {
                if (!Object(n.isVisible)(o)) return;
                o.parentNode.insertBefore(Object(n.ce)("button", {
                    innerHTML: o.innerHTML,
                    className: o.className + " button_disabled"
                }), o), Object(n.hide)(o)
            } else {
                var i = Object(n.domPS)(o);
                i && Object(n.hasClass)(i, "button_disabled") && Object(n.re)(i), Object(n.show)(o)
            }
    }

    function y(e) {
        if (void 0 === window._sbWidth || e) {
            var t = Object(n.ce)("div", {
                innerHTML: '<div style="height: 75px;">1<br>1</div>'
            }, {
                overflowY: "scroll",
                position: "absolute",
                width: "50px",
                height: "50px"
            });
            bodyNode.appendChild(t), window._sbWidth = Math.max(0, t.offsetWidth - t.firstChild.offsetWidth - 1), bodyNode.removeChild(t)
        }
        return window._sbWidth
    }

    function P(e) {
        return e = Object(n.ge)(e), Object(n.hasClass)(e, "on") ? 1 : ""
    }

    function M(e, t) {
        var o = Object(n.ge)(e);
        if (o && !Object(n.hasClass)(o, "disabled")) return void 0 === t && (t = !P(o)), Object(n.toggleClass)(o, "on", t), o.setAttribute("aria-checked", t ? "true" : "false"), !1
    }

    function C(e, t) {
        return e = Object(n.ge)(e), void 0 === t && (t = !Object(n.hasClass)(e, "disabled")), Object(n.toggleClass)(e, "disabled", t), "INPUT" === e.tagName && (t ? e.setAttribute("readonly", "readonly") : e.removeAttribute("readonly")), !1
    }

    function D(e) {
        return !!radioBtns[e] && radioBtns[e].val
    }

    function T(e, t, o) {
        if (radioBtns[o] && !Object(n.hasClass)(e, "disabled")) return Object(r.each)(radioBtns[o].els, function() {
            this == e ? (Object(n.addClass)(this, "on"), this.setAttribute("aria-checked", "true"), this.setAttribute("tabindex", "0")) : (Object(n.removeClass)(this, "on"), this.setAttribute && (this.setAttribute("aria-checked", "false"), this.setAttribute("tabindex", "-1")))
        }), radioBtns[o].val = t
    }

    function k(e, t, o, i) {
        if (e = Object(n.ge)(e)) {
            var r = void 0;
            return Object(n.hasClass)(e, "pr") ? r = e : (r = Object(n.se)(Object(n.rs)(vk.pr_tpl, {
                id: t || "",
                cls: o || ""
            })), i ? Object(n.domInsertBefore)(r, e) : e.appendChild(r)), setTimeout(function() {
                Object(n.setStyle)(r, {
                    opacity: 1
                })
            }), r
        }
    }

    function L(e) {
        e && (Object(n.hasClass)(e, "pr") ? Object(n.setStyle)(e, {
            opacity: 0
        }) : Object(n.re)(Object(n.geByClass1)("pr", e)))
    }

    function x(e) {
        Object(n.setStyle)(e, "pointer-events", "none")
    }

    function A(e) {
        Object(n.setStyle)(e, "pointer-events", "")
    }

    function B() {
        window.__scrLeft = 0, window.radioBtns = {}
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "initStl", function() {
        return p
    }), o.d(t, "updateSTL", function() {
        return w
    });
    var n = o(25),
        i = o(54),
        r = o(159),
        a = o(177),
        s = o(6),
        c = o(89),
        _ = o(80),
        l = o(153),
        d = !1,
        u = !0;

    function p() {
        var e = {
            onclick: f,
            onmousedown: b,
            onmouseover: h,
            onmouseout: h
        };
        Object(c.val)(_stlLeft, '<div id="stl_bg"><nobr id="stl_text">' + Object(l.getLang)("global_to_top") + "</nobr></div>"), Object(_.extend)(_stlLeft, e), Object(_.extend)(_stlSide, e), window._stlBg = _stlLeft.firstChild, window._stlText = window._stlBg.firstChild, Object(a.addEvent)(window, "blur", function() {
            window._wf = -1, d = !1
        }), Object(a.addEvent)(window, "focus", function() {
            window._wf = 1, d || (window.__afterFocus = !0, d = !0, setTimeout(function() {
                window.__afterFocus = !1
            }, 10), u && (Object(n.sbWidth)(!0), Object(i.onBodyResize)(!0), u = !1))
        })
    }

    function f(e) {
        return Object(a.checkEvent)(e) || Object(a.cancelEvent)(e)
    }

    function b(e) {
        if (e = e || window.event, !Object(a.checkEvent)(e) && !__afterFocus)
            if (_stlWasSet && _stlWas) {
                var t = _stlWas;
                window._stlWas = 0, Object(s.scrollToY)(t, 0, !0, !0), Object(r.updateLeftMenu)(!0)
            } else 1 === _stlBack ? _tbLink.onclick() : (window._stlWas = Object(s.scrollGetY)(), Object(s.scrollToY)(0, 0, !0, !0), Object(r.updateLeftMenu)())
    }

    function h(e) {
        var t = e ? e.originalEvent || e : window.event || {},
            o = "mouseover" === t.type && (t.pageX > 0 || t.clientX > 0);
        Object(c.toggleClass)(_stlLeft, "over", o), Object(c.toggleClass)(_stlLeft, "over_fast", o && (0 === _stlBack || _tbLink.fast) && 0 === _stlWasSet), Object(c.toggleClass)(_stlSide, "over", o)
    }

    function w() {
        var e = window.innerWidth,
            t = document.documentElement.clientWidth,
            o = Math.max(Object(_.intval)(e), Object(_.intval)(t));
        Object(c.toggleClass)(bodyNode, "no_stl", o < vk.width + 280), Object(c.toggleClass)(bodyNode, "no_sett", o < vk.width + 62)
    }
}, function(e, t) {
    e.exports = {}
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var _top_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15),
        _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80),
        _ads__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21),
        _debug_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9),
        _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(89),
        _dom_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(177),
        _scroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6),
        _ui_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(137),
        _ajax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2),
        _nav_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(159),
        _layout_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(54),
        _video__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(172),
        _legacy_performance_stats__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(43),
        _browser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(58),
        _feature_entries__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(171),
        _accessibility__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(76),
        _stl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(26),
        _utils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(61),
        _message_box__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(168),
        _lang__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(153),
        _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        Nav = {
            getData: function(e) {
                if (e.length) {
                    for (var t in navMap) {
                        if (navMap.hasOwnProperty(t))
                            if ("<" !== t[0])
                                if (e.match(new RegExp("^" + t, "i"))) return {
                                    url: navMap[t][0],
                                    files: navMap[t][1]
                                }
                    }
                    return e.match(/^[a-z0-9\-_]+\.php$/i) ? {
                        url: e
                    } : {
                        url: navMap["<other>"][0],
                        files: navMap["<other>"][1]
                    }
                }
                return {
                    url: navMap["<void>"][0],
                    files: navMap["<void>"][1]
                }
            },
            reload: function(e) {
                if (!Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.reloadCheckFlood)(e)) {
                    e = e || {};
                    var t = Nav.strLoc.replace(/^\/+/g, "");
                    e.force ? (hab.stop(), location.href = "/" + t) : (TopNotifier.invalidate(), Nav.go("/" + t, void 0, Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.extend)({
                        nocur: !0
                    }, e)))
                }
            },
            link: function(e, t) {
                if (Object(_dom_events__WEBPACK_IMPORTED_MODULE_5__.checkEvent)(t) || cur.noAjaxNav) {
                    var o = e.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), "");
                    window.open(o)
                } else Nav.go(e)
            },
            go: function go(loc, ev) {
                var opts = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                if (loc && loc.href && loc.getAttribute && loc.getAttribute("data-change-location-with-post-away")) {
                    var newLink = loc.href,
                        _postParams = Nav.getPostParams(loc, !(!opts.params || !opts.params._post_click_type)),
                        postOptions = Nav.mergePostParamsOptions(_postParams, opts.params),
                        extraQuery = {};
                    return postOptions._post && (extraQuery.post = postOptions._post, postOptions._post_ad_data && (extraQuery.post_ad_data = postOptions._post_ad_data), postOptions._post_click_cc_key && (extraQuery.cc_key = postOptions._post_click_cc_key), newLink = "/away.php?to=" + encodeURIComponent(newLink) + "&" + Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.ajx2q)(extraQuery)), location.href = newLink, !1
                }
                if (!Object(_dom_events__WEBPACK_IMPORTED_MODULE_5__.checkEvent)(ev) && !cur.noAjaxNav) {
                    if (LongView.onBeforePageChange(), loc.tagName && "a" === loc.tagName.toLowerCase()) {
                        if ("_blank" === loc.target || Nav.baseBlank) return;
                        var _params = loc.getAttribute("hrefparams");
                        if (_params && (opts.params = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.extend)(opts.params || {}, Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.q2ajx)(_params))), loc = loc.href || "", ev && !(loc || "").match(new RegExp("^" + locProtocol + "//" + locHost, "i"))) return
                    }
                    var strLoc = "",
                        objLoc = {},
                        changed = {};
                    "string" == typeof loc ? (loc = loc.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), ""), strLoc = loc, objLoc = Nav.fromStr(loc)) : (loc[0] || (loc[0] = ""), strLoc = Nav.toStr(loc), objLoc = loc), Object(_legacy_performance_stats__WEBPACK_IMPORTED_MODULE_12__.statDurationsLoadImage)(), Object(_legacy_performance_stats__WEBPACK_IMPORTED_MODULE_12__.statNavigationTiming)();
                    var ap = Object(_feature_entries__WEBPACK_IMPORTED_MODULE_14__.getAudioPlayer)();
                    if (ap && ap.updateCurrentPlaying && ap.updateCurrentPlaying(), !opts.nocur) {
                        for (var i in changed = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.clone)(objLoc), Nav.objLoc) Nav.objLoc.hasOwnProperty(i) && (Nav.objLoc[i] === changed[i] ? delete changed[i] : void 0 === changed[i] && (changed[i] = !1));
                        if (!1 === Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.zNav)(Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.clone)(changed), {
                                hist: opts.hist,
                                asBox: opts.asBox,
                                onDone: opts.onDone
                            }, objLoc)) return Nav.setLoc(strLoc), !1;
                        var isHandled = articleNav(strLoc, Nav.toStr(Nav.objLoc), opts.back, opts.postId);
                        if (isHandled) return Nav.setLoc(strLoc), (Nav.objLoc.z || Nav.objLoc.w) && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.zNav)({
                            z: Nav.objLoc.z,
                            w: Nav.objLoc.w
                        }, {}), !1;
                        var isHandledAuthorPage = authorPageNav(strLoc, Nav.toStr(Nav.objLoc), opts.back, opts.postId);
                        if (isHandledAuthorPage) return cur._hardNav ? (window.location.href = strLoc, !1) : (Nav.setLoc(strLoc), (Nav.objLoc.z || Nav.objLoc.w) && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.zNav)({
                            z: Nav.objLoc.z,
                            w: Nav.objLoc.w
                        }, {}), !1)
                    }
                    if (!opts.nocur && (vk.loaded || !changed[0]))
                        for (var curnav = cur.nav || [], _i = curnav.length - 1; _i >= 0; _i--) {
                            var oldUrl = document.URL;
                            if (!1 === curnav[_i](Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.clone)(changed), Nav.objLoc, objLoc, opts)) {
                                var currentURL = locProtocol + "//" + location.host + "/" + strLoc,
                                    referrer = oldUrl === currentURL ? "" : oldUrl;
                                return setTimeout(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateOtherCounters.pbind(currentURL, referrer), 10), !1
                            }
                        }
                    if (4 === vk.al || !vk.loaded && (!window.audioPlayer || !audioPlayer.player) && changed[0]) return setTimeout(function() {
                        location.href = "/" + (strLoc || "").replace("%23", "#")
                    }, 0), !1;
                    if (window.Upload && Upload.terminateAllUploads(), Object(_top_search__WEBPACK_IMPORTED_MODULE_0__.topHeaderClose)(), opts.back) {
                        if (cur._back && cur._back.onBack) return cur._back.onBack();
                        for (var _i2 = 0, l = globalHistory.length; _i2 < l; _i2++)
                            if (globalHistory[_i2].loc === strLoc) {
                                var _ret = function() {
                                    var e = globalHistory.splice(_i2, 1)[0],
                                        t = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("wrap3"),
                                        o = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("title"),
                                        n = cur._onback;
                                    return window.tooltips && tooltips.destroyAll(), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)("audio_tip_wrap"), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.processDestroy)(cur), window.radioBtns = e.radioBtns, window.ajaxCache = e.ajaxCache, window.PageID = e.pid, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.showBackLink)(), window.cur = e.cur, setTimeout(function() {
                                        if (t.innerHTML = "", t.parentNode.replaceChild(e.content, t), vk.width === e.width && vk.width_dec_footer === e.width_dec_footer || Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.handlePageView)(e), Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollToY)(e.scrollTop, 0), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.setDocumentTitle)(e.htitle), o.innerHTML = e.title, e.bodyClass !== bodyNode.className && (bodyNode.className = e.bodyClass || "", vk.body_class = e.bodyClass || ""), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.setStyle)(o.parentNode, "display", e.hideHeader ? "none" : "block"), cur._back.show)
                                            for (var i = 0, r = cur._back.show.length; i < r; i++) cur._back.show[i]();
                                        if (n)
                                            for (var a = 0, s = n.length; a < s; a++) n[a]();
                                        Nav.setLoc(strLoc);
                                        var c = e.back || {};
                                        setTimeout(function() {
                                            Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.showBackLink)(c[0], c[1], c[2]), (Nav.objLoc.z || Nav.objLoc.w) && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.zNav)({
                                                z: Nav.objLoc.z,
                                                w: Nav.objLoc.w
                                            }, {}), Object(_stl__WEBPACK_IMPORTED_MODULE_16__.updateSTL)(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateLeftMenu)(), Object(_accessibility__WEBPACK_IMPORTED_MODULE_15__.updateAriaElements)(), _top_search__WEBPACK_IMPORTED_MODULE_0__.default.clear()
                                        }, 10), Object(_feature_entries__WEBPACK_IMPORTED_MODULE_14__.getAudioPlayer)().updateCurrentPlaying()
                                    }, 10), {
                                        v: !1
                                    }
                                }();
                                if ("object" === (void 0 === _ret ? "undefined" : _typeof(_ret))) return _ret.v
                            }
                    }
                    var dest = objLoc[0];
                    delete objLoc[0];
                    var where = Nav.getData(dest);
                    opts.noframe || (opts.tstat = ajax.tGetParam(), ajax.tStart = (new Date).getTime(), opts.bench = !0), opts.params && opts.params._ref || (opts.params = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.extend)(opts.params || {}, {
                        _ref: Nav.objLoc[0] || ""
                    })), where.files && stManager.add(where.files), where.params = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.extend)({
                        __query: dest,
                        al_id: vk.id
                    }, objLoc, opts.params || {});
                    var postParamsEl = ev && ev.target && ev.target.getAttribute ? ev.target : loc && loc.getAttribute ? loc : null,
                        postParams = Nav.getPostParams(postParamsEl, !!where.params._post_click_type);
                    where.params = Nav.mergePostParamsOptions(postParams, where.params), opts.cl_id && (where.params.fr_click = cur.oid + "," + opts.cl_id + "," + cur.options.fr_click), opts.tstat && (where.params._tstat = opts.tstat), opts.permanent && (where.params._permanent = opts.permanent);
                    var curNavVersion = ++NextPageID,
                        done = function done(title, html, js, params) {
                            if (curNavVersion === NextPageID) {
                                try {
                                    params._id = params.id
                                } catch (e) {
                                    return Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)(e, {
                                        dt: 15,
                                        type: 6,
                                        msg: "Error: " + e.message + ", (params undefined?), title: " + title + ", html: " + html + ", js: " + js,
                                        url: where.url,
                                        query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.ajx2q)(where.params),
                                        answer: arguments.length
                                    })
                                }
                                if (window.lastScrollTop = Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollGetY)(), opts.bench && (ajax.tProcess = (new Date).getTime()), stVersions[jsc("web/common_web.js")] > StaticFiles[jsc("web/common_web.js")].v) {
                                    if (Nav.setLoc(params.loc || Nav.strLoc), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.reloadCheckFlood)({
                                            force: !0,
                                            from: 4
                                        })) return;
                                    location.reload(!0)
                                } else {
                                    var newPage = void 0 === where.params.al_id || where.params.al_id != params.id || params.fullPage,
                                        tNode = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("title"),
                                        wNode = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("wrap3"),
                                        _back = cur._back,
                                        hist = !1;
                                    if ((strLoc === (cur._back || {}).loc || newPage || opts.back) && (_back = !1), (opts.noback || params.level && (!cur._level || params.level <= cur._level) && !1 !== opts.noback) && (_back = !1, (opts.noback || cur._level && params.level < cur._level) && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.showBackLink)()), window.tooltips && tooltips.destroyAll(), Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass)("page_actions_wrap"), function(e, t) {
                                            return Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(t)
                                        }), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)("audio_tip_wrap"), _back) {
                                        if (Object(_video__WEBPACK_IMPORTED_MODULE_11__.revertLastInlineVideo)(), hist = {
                                                loc: _back.loc || Nav.strLoc,
                                                cur: cur,
                                                radioBtns: radioBtns,
                                                ajaxCache: ajaxCache,
                                                pid: PageID,
                                                scrollTop: Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollGetY)(),
                                                htitle: document.title.toString(),
                                                width: vk.width,
                                                width_dec: vk.width_dec,
                                                width_dec_footer: vk.width_dec_footer,
                                                noleftmenu: vk.noleftmenu,
                                                notopmenu: vk.notopmenu,
                                                nobottommenu: vk.nobottommenu,
                                                bodyClass: vk.body_class,
                                                back: !!_tbLink.loc && [_tbLink.loc, Object(_dom__WEBPACK_IMPORTED_MODULE_4__.val)(_tbLink), _tbLink.fast]
                                            }, tNode && tNode.parentNode && !Object(_dom__WEBPACK_IMPORTED_MODULE_4__.isVisible)(tNode.parentNode) && (hist.hideHeader = !0), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.globalHistoryDestroy)(hist.loc), globalHistory.length > 2) {
                                            var h = globalHistory.shift();
                                            Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.processDestroy)(h.cur), h.content.innerHTML = ""
                                        }
                                        if (cur._back.hide)
                                            for (var _i5 = 0, _l3 = cur._back.hide.length; _i5 < _l3; _i5++) cur._back.hide[_i5]();
                                        _back.text && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.showBackLink)(hist.loc, _back.text, 1)
                                    } else _tbLink && (_tbLink.fast = 0), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.processDestroy)(cur);
                                    if (PageID = NextPageID, Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(radioBtns, function(e, t) {
                                            t.keep || delete radioBtns[e]
                                        }), window.ajaxCache = {}, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), window.cur = {
                                            destroy: [],
                                            nav: []
                                        }, window._stlWas = 0, newPage) {
                                        for (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.cleanElems)("quick_login_button", "quick_expire", "search_form", "top_links", "bottom_nav"); globalHistory.length;) {
                                            var _h = globalHistory.shift();
                                            Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.processDestroy)(_h.cur), _h.content.innerHTML = ""
                                        }
                                        var oldTopW = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("dev_top_nav_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getSize)("dev_top_nav_wrap")[0] || Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("page_header_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getSize)("page_header_wrap")[0] || 0;
                                        pageNode.innerHTML = html, oldTopW && !vk.staticheader && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateHeaderStyles)({
                                            width: oldTopW
                                        }), window._tbLink = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("top_back_link");
                                        try {
                                            _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
                                        } catch (e) {}
                                        _browser__WEBPACK_IMPORTED_MODULE_13__.browser.mobile || Object(_layout_utils__WEBPACK_IMPORTED_MODULE_10__.onBodyResize)(!0)
                                    } else {
                                        if (_back) {
                                            var newW = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ce)("div", {
                                                id: "wrap3"
                                            });
                                            Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.extend)(hist, {
                                                content: wNode.parentNode.replaceChild(newW, wNode),
                                                title: tNode.innerHTML
                                            }), globalHistory.push(hist), wNode = newW
                                        }
                                        var _oldTopW = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("dev_top_nav_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getSize)("dev_top_nav_wrap")[0] || Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("page_header_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getSize)("page_header_wrap")[0] || 0;
                                        wNode && (wNode.innerHTML = html), _oldTopW && !vk.staticheader && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateHeaderStyles)({
                                            width: _oldTopW
                                        }), tNode && (tNode.innerHTML = title), (title ? _dom__WEBPACK_IMPORTED_MODULE_4__.show : _dom__WEBPACK_IMPORTED_MODULE_4__.hide)(tNode.parentNode), Object(_feature_entries__WEBPACK_IMPORTED_MODULE_14__.getAudioPlayer)().updateCurrentPlaying()
                                    }
                                    if (Object(_layout_utils__WEBPACK_IMPORTED_MODULE_10__.checkPageBlocks)(), Object(_stl__WEBPACK_IMPORTED_MODULE_16__.updateSTL)(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateLeftMenu)(), Object(_accessibility__WEBPACK_IMPORTED_MODULE_15__.updateAriaElements)(), _top_search__WEBPACK_IMPORTED_MODULE_0__.default.clear(), window.LazyLoad && LazyLoad.scanDelayed(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.handlePageParams)(params), opts.preventScroll || (opts.scrollTop > 0 ? Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollToY)(opts.scrollTop, 0) : opts.noscroll || params.noscroll || Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollToTop)(0)), opts.bench && (ajax.tRender = (new Date).getTime()), Nav.curLoc = params.loc, js) {
                                        var evalString = "(function(){" + js + ";})()";
                                        if (__debugMode) eval(evalString);
                                        else try {
                                            eval(evalString)
                                        } catch (e) {
                                            Object(_debug_tools__WEBPACK_IMPORTED_MODULE_3__.logEvalError)(e, evalString)
                                        }
                                    }
                                    ajax._framenext(), opts.onDone && opts.onDone(), _browser__WEBPACK_IMPORTED_MODULE_13__.browser.mobile && Object(_layout_utils__WEBPACK_IMPORTED_MODULE_10__.onBodyResize)(), changed.f && Object(_utils__WEBPACK_IMPORTED_MODULE_17__.handleScroll)(changed.f), Nav.setLoc(params.loc || ""), changed[0] && (window.vkLastNav = Date.now()), Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.lTimeout)(function() {
                                        Object(_feature_entries__WEBPACK_IMPORTED_MODULE_14__.getAudioPlayer)().updateCurrentPlaying(), TopMenu.toggle(!1)
                                    }, _browser__WEBPACK_IMPORTED_MODULE_13__.browser.chrome ? 100 : 50)
                                }
                            }
                        };
                    return window.Page && (Page.postsSave(), Page.postsSend(), Page.postsClearTimeouts()), Object(_ads__WEBPACK_IMPORTED_MODULE_2__.updSeenAdsInfo)(), Object(_ads__WEBPACK_IMPORTED_MODULE_2__.__adsUpdate)("already"), "im" !== Nav.objLoc[0] && "im" !== changed[0] || (where.params = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.extend)({}, where.params, {
                        _full_page: !0
                    })), ajax.post(where.url, where.params, {
                        onDone: function() {
                            var e = arguments;
                            if (__debugMode) done.apply(null, e);
                            else try {
                                done.apply(null, e)
                            } catch (t) {
                                Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)(t, {
                                    dt: 15,
                                    type: 6,
                                    url: where.url,
                                    query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.ajx2q)(where.params),
                                    js: e[2],
                                    answer: Array.prototype.slice.call(arguments).join("<!>")
                                })
                            }
                        },
                        onFail: opts.onFail || function(e) {
                            if (e) return setTimeout(Object(_message_box__WEBPACK_IMPORTED_MODULE_18__.showFastBox)({
                                title: Object(_lang__WEBPACK_IMPORTED_MODULE_19__.getLang)("global_error")
                            }, e).hide, __debugMode ? 3e4 : 3e3), !0
                        },
                        frame: opts.noframe ? 0 : 1,
                        canReload: !0,
                        showProgress: opts.showProgress,
                        hideProgress: opts.hideProgress,
                        cache: opts.search ? 1 : "",
                        bench: opts.bench
                    }), !1
                }
            },
            setLoc: function(e) {
                "string" == typeof e ? (Nav.strLoc = e, Nav.objLoc = Nav.fromStr(e)) : (Nav.strLoc = Nav.toStr(e), Nav.objLoc = e), hab.setLoc(Nav.strLoc)
            },
            change: function(e, t, o) {
                var n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.clone)(Nav.objLoc);
                return Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(e, function(e, t) {
                    !1 === t ? delete n[e] : n[e] = t
                }), Nav.go(n, t, o)
            },
            fromStr: function(e) {
                var t = (e = e.split("#"))[0].split("?"),
                    o = {
                        0: t[0] || ""
                    };
                return e[1] && (o["#"] = e[1]), Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.extend)(Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.q2ajx)(t[1] || ""), o)
            },
            toStr: function(e) {
                var t = (e = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.clone)(e))["#"] || "",
                    o = e[0] || "";
                delete e[0], delete e["#"];
                var n = Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.ajx2q)(e);
                return (n ? o + "?" + n : o) + (t ? "#" + t : "")
            },
            init: function() {
                window.globalHistory = [], Nav.strLoc = hab.getLoc(), Nav.objLoc = Nav.fromStr(Nav.strLoc)
            },
            getPostParams: function(e, t) {
                var o = {};
                if (!!(!e || !e.getAttribute)) return o;
                var n = e.getAttribute("data-post-id");
                n && (o.post_id = n);
                var i = e.getAttribute("data-parent-post-id");
                i && (o.parent_post_id = i);
                var r = e.getAttribute("data-post-click-type");
                r && (o.post_click_type = r);
                var a = e.getAttribute("mention_id");
                a && (o.post_click_mention_id = a);
                var s = e.getAttribute("data-post-click-cc-key");
                s && (o.post_click_cc_key = s);
                var c = [e.getAttribute("href"), e.getAttribute("data-href")];
                if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(c, function(e, t) {
                        if (t && "#" !== t) return o.post_click_url = t, !1
                    }), !!r || t) {
                    var _ = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.gpeByClass)("_ads_block_data_w", e),
                        l = (_ = _ || Object(_dom__WEBPACK_IMPORTED_MODULE_4__.gpeByClass)("_ads_promoted_post_data_w", e)) && _.getAttribute("data-ad"),
                        d = _ && _.getAttribute("data-ad-block-uid");
                    l && (o.ad_data = l), d && (o.ad_block_unique_id = d)
                }
                return o
            },
            mergePostParamsOptions: function(e, t) {
                if (t = t || {}, !e) return t;

                function o(e, o, n) {
                    var i = n && t[o];
                    return !(!e || i) && (t[o] = e, !0)
                }
                return o(e.post_id, "_post", !0), o(e.parent_post_id, "_parent_post", !0), o(e.post_click_type, "_post_click_type", !0), t._post_click_type && (o(e.post_click_mention_id, "_post_click_mention_id", !0), o(e.post_click_cc_key, "_post_click_cc_key", !0), o(e.post_click_url, "_post_click_url", !0), o(e.ad_data, "_post_ad_data", !0) && o(e.ad_block_unique_id, "_post_ad_block_unique_id")), t
            }
        };

    function authorPageNav(e, t, o) {
        if (o && cur.backFromAuthorPage) return delete cur.backFromAuthorPage, !0;
        var n = e.toLowerCase();
        if (/^(?:%40|@)-?[.a-z0-9_]+(?:\?\w+)?$/.test(n)) return boxRefreshCoords(boxLoader), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxLoader), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxLayerWrap), stManager.add([jsc("web/author_page.js"), jsc("web/article_layer.js"), "author_page.css", "ui_controls.js", "ui_controls.css"], function() {
            window.AuthorPage.showLayer(n)
        }), !0;
        if (window.AuthorPage && window.AuthorPage.isOpen()) {
            if (o && window.AuthorPage.isStandalone()) return window.location.reload(!0), !0;
            var i = window.AuthorPage.close(!0);
            return void 0 !== i ? i : !!o
        }
    }

    function articleNav(e, t, o, n) {
        var i = e.toLowerCase(),
            r = /^(?:%40|@)-?[.a-z0-9_]+-[a-z0-9-]+(?:\?\w+)?$/;
        if (r.test(i)) return window.isArticleLayerOpen() || (cur.articlePrevLoc = t), window.WkView && WkView.hide(!0), window.boxQueue && boxQueue.hideAll(), stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
            ArticleLayer.show(i, !0), cur.articleSequence = (cur.articleSequence || 0) + (o ? -1 : 1)
        }), !0;
        if (window.isArticleLayerOpen()) {
            if (o && ArticleLayer.isStandalone()) return window.location.reload(!0), !0;
            var a = function() {
                    ArticleLayer.close(), delete cur.articleSequence
                },
                s = cur.articlePrevLoc;
            return delete cur.articlePrevLoc, s && !r.test(s) ? e === s ? (a(), !0) : (layers.fullhide = function() {
                a()
            }, !1) : (a(), !0)
        }
        return !1
    }
    __webpack_exports__.default = Nav
}, function(e, t, o) {
    var n = o(138),
        i = o(105),
        r = o(57)("IE_PROTO"),
        a = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = i(e), n(e, r) ? e[r] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null
    }
}, function(e, t, o) {
    var n = o(99),
        i = o(73);
    e.exports = o(83) ? function(e, t, o) {
        return n.f(e, t, i(1, o))
    } : function(e, t, o) {
        return e[t] = o, e
    }
}, function(e, t, o) {
    "use strict";

    function n(e, t) {
        var o = t.timeout,
            n = t.onLoad,
            i = t.onError,
            r = document.createElement("script");
        r.addEventListener("load", s), r.addEventListener("readystatechange", s), r.addEventListener("error", c), r.src = e, document.head.appendChild(r);
        var a = void 0;

        function s(e) {
            r.readyState && "loaded" != r.readyState && "complete" != r.readyState || (_(), n && n())
        }

        function c(e) {
            _(), i && i()
        }

        function _() {
            clearTimeout(a), r.removeEventListener("load", s), r.removeEventListener("readystatechange", s), r.removeEventListener("error", c)
        }
        return o && (a = setTimeout(c, o)), {
            destroy: function() {
                _()
            }
        }
    }
    o.r(t), o.d(t, "loadScript", function() {
        return n
    })
}, function(e, t, o) {
    var n = o(152),
        i = o(146)("iterator"),
        r = o(27);
    e.exports = o(36).getIteratorMethod = function(e) {
        if (void 0 != e) return e[i] || e["@@iterator"] || r[n(e)]
    }
}, function(e, t, o) {
    var n = o(112),
        i = Math.max,
        r = Math.min;
    e.exports = function(e, t) {
        return (e = n(e)) < 0 ? i(e + t, 0) : r(e, t)
    }
}, , function(e, t, o) {
    var n = o(134);
    e.exports = function(e, t) {
        if (!n(e)) return e;
        var o, i;
        if (t && "function" == typeof(o = e.toString) && !n(i = o.call(e))) return i;
        if ("function" == typeof(o = e.valueOf) && !n(i = o.call(e))) return i;
        if (!t && "function" == typeof(o = e.toString) && !n(i = o.call(e))) return i;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t) {
    var o = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = o)
}, function(e, t, o) {
    "use strict";
    o.r(t);
    var n = o(147);
    window.EventEmitter = n, t.default = n
}, function(e, t, o) {
    "use strict";
    o.r(t), Number.isInteger = Number.isInteger || function(e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e
    }
}, , function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, , function(e, t, o) {
    "use strict";
    var n = o(143),
        i = o(99),
        r = o(83),
        a = o(146)("species");
    e.exports = function(e) {
        var t = n[e];
        r && t && !t[a] && i.f(t, a, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "collectMemoryStats", function() {
        return a
    }), o.d(t, "statDurationsLoadImage", function() {
        return s
    }), o.d(t, "statNavigationTiming", function() {
        return c
    });
    var n = o(82),
        i = o(80);

    function r(e, t) {
        for (var o = void 0, n = 0; n < t.length; n++)
            if (">" === (o = t[n])) o = ">" + t[n - 1];
            else {
                if (1e3 * o > e) {
                    o = "<" + o;
                    break
                }
                o = !1
            }
        return o
    }

    function a() {
        var e = {},
            t = [15, 60, 300, 1500, 5e3, 1e4, 15e3, 2e4, 25e3, 3e4],
            o = [300, 1500, 5e3, 3e4, 6e4, 12e4, ">"],
            i = !1;
        setInterval(function() {
            var a = window.cur && window.cur.module;
            a !== i && (e = {}, i = a);
            var s = window.vkLastNav;
            if (a && s) {
                var c = r(Date.now() - s, t);
                if (c && !e[c]) {
                    var _ = r(Date.now() - window.vkTabLoaded, o);
                    e[c] = !0;
                    var l = performance.memory.usedJSHeapSize;
                    Object(n.statlogsValueEvent)("js_memory_stats_modules", l, a, c, _)
                }
            }
        }, 5e3)
    }

    function s() {
        if (Math.random() < .001 && window.performance && window.performance.getEntriesByType) {
            if (window.clientStatsInited) return !1;
            var e = window.performance.getEntriesByType("resource");
            if (!e) return !1;
            for (var t = {}, o = {}, r = 0; r < e.length; r++)
                if (e[r] && "img" === e[r].initiatorType)
                    if (e[r].duration < 100) t["<100"] = (t["<100"] || 0) + 1;
                    else if (e[r].duration < 250) t["100-250"] = (t["100-250"] || 0) + 1;
            else if (e[r].duration < 500) t["250-500"] = (t["250-500"] || 0) + 1;
            else if (e[r].duration < 1e3) t["500-1000"] = (t["500-1000"] || 0) + 1;
            else if (e[r].duration < 2e3) t["1000-2000"] = (t["1000-2000"] || 0) + 1;
            else if (e[r].duration < 5e3) t["2000-5000"] = (t["2000-5000"] || 0) + 1;
            else if (t[">5000"] = (t[">5000"] || 0) + 1, e[r].name && e[r].name.indexOf("pp.vk.me") > 0) {
                var a = "";
                (a = (a = e[r].name).substr(a.indexOf("pp.vk.me") + 9)).indexOf("/") > 0 && (o[a = a.substr(0, a.indexOf("/"))] = (o[a] || 0) + 1)
            }
            Object(i.each)(t, function(e, t) {
                return Object(n.statlogsValueEvent)("img_load", t, e)
            }), Object(i.each)(o, function(e, t) {
                return Object(n.statlogsValueEvent)("img_slow", t, e)
            }), window.clientStatsInited = !0
        }
    }

    function c() {
        if (window.clientStatsInitedNT) return !1;
        if (window.performance && performance.timing) {
            if (Math.random() > .001 && !__dev) return !1;
            var e = {},
                t = window.cur && window.cur.module;
            performance.timing.redirectStart && performance.timing.redirectEnd && (e.redirect = performance.timing.redirectEnd - performance.timing.redirectStart), performance.timing.domainLookupStart && performance.timing.domainLookupEnd && (e.domainLookup = performance.timing.domainLookupEnd - performance.timing.domainLookupStart), performance.timing.connectStart && performance.timing.connectEnd && (e.connect = performance.timing.connectEnd - performance.timing.connectStart, performance.timing.secureConnectionStart && (e.secureConnection = performance.timing.connectEnd - performance.timing.secureConnectionStart)), performance.timing.requestStart && performance.timing.responseStart && (e.request = performance.timing.responseStart - performance.timing.requestStart, performance.timing.responseEnd && (e.response = performance.timing.responseEnd - performance.timing.responseStart)), performance.timing.unloadEventStart && performance.timing.unloadEventEnd && (e.unloadEvent = performance.timing.unloadEventEnd - performance.timing.unloadEventStart), performance.timing.domLoading && performance.timing.domComplete && (e.processing = performance.timing.domComplete - performance.timing.domLoading), performance.timing.domContentLoadedEventStart && performance.timing.domContentLoadedEventEnd && (e.domContentLoadedEvent = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart), performance.timing.loadEventStart && performance.timing.loadEventEnd && (e.loadEvent = performance.timing.loadEventEnd - performance.timing.loadEventStart), performance.timing.loadEventEnd && performance.timing.responseEnd && (e.resource = performance.timing.loadEventEnd - performance.timing.responseEnd), Object(i.each)(e, function(e, o) {
                return Object(n.statlogsValueEvent)("navigation_timing", o, e, t)
            }), window.clientStatsInitedNT = !0
        }
    }
}, function(e, t, o) {
    "use strict";
    o.r(t);
    var n = o(89),
        i = o(80),
        r = o(177),
        a = o(6),
        s = o(54);
    var c = function() {
        function e(t, o) {
            if (function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.constructor !== e) throw new Error("ElementTooltip was called without 'new' operator");
            if (!(t = Object(n.ge)(t)) || !t.nodeType) throw new Error("First argument not a DOM element");
            if (Object(n.data)(t, "ett")) return Object(n.data)(t, "ett");
            if (this._opts = Object(i.extend)({
                    delay: 100,
                    offset: [0, 0],
                    shift: 0,
                    type: e.TYPE_VERTICAL,
                    id: "",
                    cls: "",
                    width: null,
                    appendToParent: !1,
                    autoShow: !0,
                    autoHide: !1,
                    noHideOnClick: !1,
                    arrowSize: "normal",
                    customShow: !1,
                    align: e.ALIGN_CENTER
                }, o), this._opts.customShow && (this._opts.autoShow = !1), this._opts.defaultSide || (this._opts.defaultSide = this._opts.type === e.TYPE_VERTICAL ? "top" : "left"), this._opts.cls += " eltt_arrow_size_" + this._opts.arrowSize, this._opts.cls += " eltt_align_" + this._opts.align, this._opts.noBorder && (this._opts.cls += " eltt_noborder"), this._opts.type !== e.TYPE_VERTICAL && delete this._opts.shift, this._opts.setPos && !this._opts.forceSide) throw new Error("forceSide parameter should be set if you use setPos");
            this._opts.forceSide && (this._opts.type = Object(i.inArray)(this._opts.forceSide, ["top", "bottom"]) ? e.TYPE_VERTICAL : e.TYPE_HORIZONTAL), this._appendToEl = this._opts.appendTo ? this._opts.appendTo : this._opts.appendToParent ? Object(n.domClosestPositioned)(t, {
                noOverflow: !0
            }) : t, this._arrowSize = {
                mini: e.ARROW_SIZE_MINI,
                normal: e.ARROW_SIZE_NORMAL,
                big: e.ARROW_SIZE_BIG
            }[this._opts.arrowSize], this._opts.forceSide && (this._opts.type = e.getType(this._opts.forceSide)), this._el = t, Object(n.data)(this._el, "ett", this), this._initEvents(t), this._clearTimeouts(), this._isShown = !1
        }
        return e.prototype._initEvents = function(e) {
            var t = this;
            this._opts.autoShow && (this._el_me_event = this._onMouseEnter.bind(this), Object(r.addEvent)(e, "mouseenter", this._el_me_event)), (this._opts.autoShow || this._opts.autoHide) && (this._el_ml_event = this._onMouseLeave.bind(this), Object(r.addEvent)(e, "mouseleave", this._el_ml_event)), this._opts.autoShow || this._opts.customShow || (this._el_c_event = function() {
                t._isShown && t._opts.noHideOnClick || t.toggle(!t._isShown)
            }, Object(r.addEvent)(e, "click", this._el_c_event))
        }, e.prototype._onMouseEnter = function(e) {
            clearTimeout(this._hto), this._hto = !1, !this._isShown && this._opts.autoShow && (clearTimeout(this._reTimeout), this._reTimeout = !1, clearTimeout(this._sto), this._sto = setTimeout(this.show.bind(this), this._opts.delay))
        }, e.prototype._onMouseLeave = function(e) {
            this._clearTimeouts(), this._hto = setTimeout(this._hide.bind(this), 200)
        }, e.prototype._onMouseWindowClick = function(e) {
            if (!this._opts.noAutoHideOnWindowClick) {
                for (var t = e.target; t && t !== this._ttel && t !== document.body && t !== this._el;) t = Object(n.domPN)(t);
                if (!Object(n.hasClass)(e.target, "_ap_layer__close")) return t && t !== document.body ? void 0 : Object(i.isFunction)(this._opts.onWindowClick) ? (this._opts.onWindowClick(), Object(r.cancelEvent)(e)) : (this.hide(!0), Object(r.cancelEvent)(e))
            }
        }, e.prototype.destroy = function() {
            this._el_me_event && Object(r.removeEvent)(this._el, "mouseenter", this._el_me_event), this._el_ml_event && Object(r.removeEvent)(this._el, "mouseleave", this._el_ml_event), this._el_c_event && Object(r.removeEvent)(this._el, "click", this._el_c_event), this._clearTimeouts(), Object(n.removeData)(this._el, "ett"), Object(n.re)(this._ttel), this._ev_wclick && Object(r.removeEvent)(document, "mousedown", this._ev_wclick);
            var e = void 0;
            this._ttel && (e = Object(n.geByClass1)("_eltt_content", this._ttel)), this._opts.onDestroy && this._opts.onDestroy(e)
        }, e.prototype.hide = function(e) {
            this._hide(e)
        }, e.prototype._onTooltipMouseEnter = function(e) {
            this._clearTimeouts()
        }, e.prototype._onTooltipMouseLeave = function(e) {
            this._onMouseLeave()
        }, e.prototype.build = function() {
            if (!this._ttel) {
                this._ttel = Object(n.se)('\n        <div class="eltt ' + (this._opts.cls || "") + '" id="' + this._opts.id + '">\n          <div class="eltt_arrow_back _eltt_arrow_back">\n            <div class="eltt_arrow"></div>\n          </div>\n          <div class="eltt_content _eltt_content"></div>\n        </div>'), this._ttArrowEl = Object(n.geByClass1)("_eltt_arrow_back", this._ttel);
                var e = Object(n.geByClass1)("_eltt_content", this._ttel);
                this._opts.content && (Object(i.isString)(this._opts.content) ? e.innerHTML = this._opts.content : e.appendChild(this._opts.content)), this._appendToEl.appendChild(this._ttel)
            }
        }, e.prototype.show = function() {
            if (this._isShown) this.updatePosition();
            else {
                if (this._clearTimeouts(), this._ttel || (this.build(), (this._opts.autoShow || this._opts.autoHide) && (this._ev_ttenter = this._onTooltipMouseEnter.bind(this), this._ev_ttleave = this._onTooltipMouseLeave.bind(this), Object(r.addEvent)(this._ttel, "mouseenter", this._ev_ttenter), Object(r.addEvent)(this._ttel, "mouseleave", this._ev_ttleave))), this._opts.width) {
                    var e = Object(i.isFunction)(this._opts.width) ? this._opts.width.call(this) : this._opts.width;
                    Object(n.setStyle)(this._ttel, "width", e)
                }
                Object(n.show)(this._ttel);
                var t = Object(n.geByClass1)("_eltt_content", this._ttel);
                this._opts.onFirstTimeShow && !this._firstTimeShown && this._opts.onFirstTimeShow.call(this, t, this._ttel), this._opts.onShow && this._opts.onShow(t, !this._firstTimeShown), this._firstTimeShown = !0, this.updatePosition(), this._isShown = !0, this._visTO = setTimeout(n.addClass.pbind(this._ttel, "eltt_vis"), 10), this._opts.elClassWhenShown && Object(n.addClass)(this._el, this._opts.elClassWhenShown), this._ev_wclick && Object(r.removeEvent)(document, "mousedown", this._ev_wclick), this._ev_wclick = this._onMouseWindowClick.bind(this), Object(r.addEvent)(document, "mousedown", this._ev_wclick)
            }
        }, e.getType = function(t) {
            switch (t) {
                case "top":
                case "bottom":
                    return e.TYPE_VERTICAL;
                case "right":
                case "left":
                    return e.TYPE_HORIZONTAL
            }
        }, e.prototype.getOptions = function() {
            return this._opts
        }, e.prototype.updatePosition = function() {
            var t = this,
                o = this._opts.forceSide,
                r = !!this._opts.getTargetBoundingBox && this._opts.getTargetBoundingBox(this);
            if (!r) {
                var c = Object(n.getXY)(this._el),
                    _ = Object(n.getSize)(this._el);
                r = {
                    left: c[0],
                    top: c[1],
                    width: _[0],
                    height: _[1]
                }
            }
            var l = Object(n.gpeByClass)("audio_layer_container", this._ttel),
                d = l || Object(n.domClosestOverflowHidden)(this._ttel),
                u = d !== bodyNode ? Object(n.getXY)(d) : [Object(a.scrollGetX)(), Object(a.scrollGetY)() + Object(s.getPageHeaderHeight)()],
                p = d !== bodyNode ? Object(n.getSize)(d) : [window.innerWidth, window.innerHeight],
                f = Object(n.getSize)(this._ttel),
                b = this._arrowSize,
                h = this._opts.noBorder ? 0 : 1,
                w = Object(i.isFunction)(this._opts.offset) ? this._opts.offset() : this._opts.offset,
                m = void 0,
                v = function(o, i) {
                    var a = {},
                        s = [vk.rtl ? "marginRight" : "marginLeft", "marginTop"].indexOf(o),
                        c = void 0;
                    c = t._opts.align === (vk.rtl ? e.ALIGN_LEFT : e.ALIGN_RIGHT) ? f[s] - Math.max(h + b + (i || 0), Math.min(f[s], r[s ? "height" : "width"]) / 2) : t._opts.align === (vk.rtl ? e.ALIGN_RIGHT : e.ALIGN_LEFT) ? Math.max(h + b + (i || 0), Math.min(f[s], r[s ? "height" : "width"]) / 2) : f[s] / 2, a[o] = Math.floor(c) - h - b - (i || 0), Object(n.setStyle)(t._ttArrowEl, a)
                };
            if (this._opts.setPos) m = this._opts.setPos(this) || {}, e.getType(o) === e.TYPE_VERTICAL ? void 0 !== m.arrowPosition ? Object(n.setStyle)(this._ttArrowEl, {
                marginLeft: m.arrowPosition
            }) : vk.rtl ? v("marginRight") : v("marginLeft") : void 0 !== m.arrowPosition ? Object(n.setStyle)(this._ttArrowEl, {
                marginTop: m.arrowPosition
            }) : v("marginTop");
            else {
                if (!o && this._prevSide && this._opts.preventSideChange) o = this._prevSide;
                else if (!o)
                    if (this._opts.type === e.TYPE_VERTICAL) {
                        var O = Object(n.hasClass)(bodyNode, "body_im") ? 60 : this._opts.bottomGap || 0,
                            g = r.top - u[1] > f[1] + b - w[1],
                            E = Object(a.scrollGetY)() + p[1] - (r.top + r.height + b) - O > f[1];
                        o = "top" === this._opts.defaultSide ? g ? "top" : "bottom" : E ? "bottom" : "top"
                    } else o = r.left - u[0] < f[0] ? "right" : "left";
                var j = Object(n.getXY)(this._appendToEl),
                    y = [r.left - j[0], r.top - j[1]],
                    P = void 0,
                    M = w[0] + y[0];
                this._opts.centerShift ? (M += this._opts.centerShift || 0, P = this._opts.centerShift) : this._opts.rightShift && (M += P = -(f[0] / 2 - this._opts.rightShift)), this._prevSide = o;
                var C = void 0,
                    D = void 0,
                    T = void 0,
                    k = void 0,
                    L = void 0;
                switch (this._opts.align === (vk.rtl ? e.ALIGN_LEFT : e.ALIGN_RIGHT) ? (C = r.width - f[0], D = r.height - f[1]) : this._opts.align === (vk.rtl ? e.ALIGN_RIGHT : e.ALIGN_LEFT) ? (C = 0, D = 0) : (C = -f[0] / 2 + r.width / 2, D = r.height / 2 - f[1] / 2), o) {
                    case "bottom":
                        k = C + M, L = r.height + b - w[1] + y[1], P || ((T = C + r.left + w[0] + f[0] + 20 - (u[0] + p[0])) < 0 && (T = 0), k -= T, P = -T), m = {
                            left: k,
                            top: L
                        };
                        break;
                    case "top":
                        k = C + M, L = -f[1] - b + w[1] + y[1], P || ((T = C + r.left + w[0] + f[0] + 20 - (u[0] + p[0])) < 0 && (T = 0), k -= T, P = -T), m = {
                            left: k,
                            top: L
                        };
                        break;
                    case "right":
                        k = r.width + b + M, L = D + w[1] + y[1], P || ((T = D + r.top + w[1] - (u[1] + 20)) > 0 && (T = 0), L -= T, P = -T), m = {
                            left: k,
                            top: L
                        };
                        break;
                    case "left":
                        k = -f[0] - b + M, L = D + w[1] + y[1], P || ((T = D + r.top + w[1] - (u[1] + 20)) > 0 && (T = 0), L -= T, P = -T), m = {
                            left: k,
                            top: L
                        }
                }
                this._opts.type === e.TYPE_VERTICAL ? vk.rtl ? v("marginRight", P) : v("marginLeft", P) : v("marginTop", P)
            }
            Object(i.each)(["top", "bottom", "left", "right"], function(e, t) {
                o !== t && Object(n.removeClass)(this._ttel, "eltt_" + t)
            }.bind(this)), Object(n.addClass)(this._ttel, "eltt_" + o), Object(n.setStyle)(this._ttel, m)
        }, e.prototype._hide = function(t) {
            if (this._isShown = !1, this._clearTimeouts(), this._reTimeout = setTimeout(function() {
                    Object(n.hide)(this._ttel), this._opts.elClassWhenShown && Object(n.removeClass)(this._el, this._opts.elClassWhenShown), this._opts.onHide && this._opts.onHide(this._ttel, !!t)
                }.bind(this), e.FADE_SPEED), this._opts.onBeforeHide) try {
                this._opts.onBeforeHide(this._ttel, !!t)
            } catch (e) {}
            Object(n.removeClass)(this._ttel, "eltt_vis"), this._ev_wclick && Object(r.removeEvent)(document, "mousedown", this._ev_wclick)
        }, e.prototype.isShown = function() {
            return this._isShown
        }, e.prototype.toggle = function() {
            this.isShown() ? this.hide() : this.show()
        }, e.prototype._clearTimeouts = function() {
            this._visTO && clearTimeout(this._visTO), this._visTO = !1, this._sto && clearTimeout(this._sto), this._sto = !1, this._hto && clearTimeout(this._hto), this._hto = !1, this._reTimeout && clearTimeout(this._reTimeout), this._reTimeout = !1
        }, e.prototype.getContent = function() {
            return Object(n.geByClass1)("_eltt_content", this._ttel)
        }, e
    }();
    c.TYPE_VERTICAL = 0, c.TYPE_HORIZONTAL = 1, c.FADE_SPEED = 100, c.ARROW_SIZE_MINI = 9, c.ARROW_SIZE_NORMAL = 8, c.ARROW_SIZE_BIG = 16, c.ALIGN_LEFT = "left", c.ALIGN_CENTER = "center", c.ALIGN_RIGHT = "right", t.default = c
}, function(e, t) {
    e.exports = !1
}, function(e, t, o) {
    "use strict";
    o.r(t);
    var n = o(89),
        i = o(80),
        r = o(177);
    var a = function() {
        function e() {
            var t = this;
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var o = window.CallHub;
            this.on = 0, this.hub = new o(function() {
                t.onShow && t.onShow()
            }, 2), this.hintsHub = new o(function() {
                return t.showStartHints()
            }, 2)
        }
        return e.prototype.load = function() {
            var e = this;
            Object(n.ge)("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", function() {
                return e.hub.done()
            }), ajax.post("hints.php", {
                act: "a_start_hints"
            }, {
                onDone: function(t) {
                    e.startHintsText = Object(i.trim)(t), e.hintsHub.done()
                }
            }))
        }, e.prototype.show = function(e) {
            var t = window.placeholderSetup;
            if (Object(n.ge)("quick_search") && !this.on) return this.on = 1, Object(n.show)(this.sCont), t("search_input"), Object(n.ge)("search_input").setAttribute("autocomplete", "off"), Object(n.addClass)(Object(n.ge)("qsearch_link"), "active"), this.prev_content = Object(n.ge)("content"), this.qsearch_cont || (this.qsearch_cont = Object(n.ce)("div", {
                id: "content",
                innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
            })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(r.cancelEvent)(e) : void 0
        }, e.prototype.go = function(e) {
            var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(i.trim)(Object(n.ge)("search_input").value) + "&name=1";
            return Object(r.cancelEvent)(e || window.event), location.href = t, !1
        }, e.prototype.init = function(e) {
            this.sCont = Object(n.ge)("quick_search"), this.opt = e || {}
        }, e.prototype.hide = function(e, t) {
            if (Object(n.ge)("quick_search") && (!this.active || t) && this.on) {
                var o = window.toggleFlash;
                if (this.on = 0, o(), this.beforeHide && this.beforeHide()) return !0;
                Object(n.ge)("search_input").setValue ? Object(n.ge)("search_input").setValue("") : Object(n.ge)("search_input").value = "", Object(n.hide)(this.sCont), Object(n.removeClass)(Object(n.ge)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
            }
        }, e.prototype.preload = function() {}, e
    }();
    t.default = a
}, function(e, t, o) {
    e.exports = o(133)
}, function(e, t, o) {
    var n = o(143),
        i = o(36),
        r = o(30),
        a = o(121),
        s = o(114),
        c = function(e, t, o) {
            var _, l, d, u, p = e & c.F,
                f = e & c.G,
                b = e & c.S,
                h = e & c.P,
                w = e & c.B,
                m = f ? n : b ? n[t] || (n[t] = {}) : (n[t] || {}).prototype,
                v = f ? i : i[t] || (i[t] = {}),
                O = v.prototype || (v.prototype = {});
            for (_ in f && (o = t), o) d = ((l = !p && m && void 0 !== m[_]) ? m : o)[_], u = w && l ? s(d, n) : h && "function" == typeof d ? s(Function.call, d) : d, m && a(m, _, d, e & c.U), v[_] != d && r(v, _, u), h && O[_] != d && (O[_] = d)
        };
    n.core = i, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
}, , , function(e, t, o) {
    "use strict";
    o.r(t);
    var n, i, r, a, s, c, _, l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    n = window, i = n.HTMLCanvasElement && n.HTMLCanvasElement.prototype, r = n.Blob && function() {
        try {
            return Boolean(new Blob)
        } catch (e) {
            return !1
        }
    }(), a = r && n.Uint8Array && function() {
        try {
            return 100 === new Blob([new Uint8Array(100)]).size
        } catch (e) {
            return !1
        }
    }(), s = n.BlobBuilder || n.WebKitBlobBuilder || n.MozBlobBuilder || n.MSBlobBuilder, c = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, _ = (r || s) && n.atob && n.ArrayBuffer && n.Uint8Array && function(e) {
        var t, o, n, i, _, l, d, u, p;
        if (!(t = e.match(c))) throw new Error("invalid data URI");
        for (o = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), n = !!t[4], i = e.slice(t[0].length), _ = n ? atob(i) : decodeURIComponent(i), l = new ArrayBuffer(_.length), d = new Uint8Array(l), u = 0; u < _.length; u += 1) d[u] = _.charCodeAt(u);
        return r ? new Blob([a ? d : l], {
            type: o
        }) : ((p = new s).append(l), p.getBlob(o))
    }, n.HTMLCanvasElement && !i.toBlob && (i.mozGetAsFile ? i.toBlob = function(e, t, o) {
        e(o && i.toDataURL && _ ? _(this.toDataURL(t, o)) : this.mozGetAsFile("blob", t))
    } : i.toDataURL && _ && (i.toBlob = function(e, t, o) {
        e(_(this.toDataURL(t, o)))
    })), "function" == typeof define && define.amd ? define(function() {
        return _
    }) : "object" == ("undefined" == typeof module ? "undefined" : l(module)) && module.exports ? module.exports = _ : n.dataURLtoBlob = _
}, , , function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "getPageHeaderHeight", function() {
        return h
    }), o.d(t, "updateNarrow", function() {
        return w
    }), o.d(t, "checkPageBlocks", function() {
        return m
    }), o.d(t, "redraw", function() {
        return v
    }), o.d(t, "onBodyScroll", function() {
        return O
    }), o.d(t, "onBodyResize", function() {
        return g
    }), o.d(t, "leftBlockOver", function() {
        return E
    }), o.d(t, "leftBlockOut", function() {
        return j
    }), o.d(t, "leftBlockHide", function() {
        return y
    }), o.d(t, "autosizeSetup", function() {
        return P
    }), o.d(t, "TopMenu", function() {
        return M
    }), o.d(t, "getProgressHtml", function() {
        return C
    }), o.d(t, "getProgressBarEl", function() {
        return D
    });
    var n = o(80),
        i = o(89),
        r = o(6),
        a = o(159),
        s = o(25),
        c = o(21),
        _ = o(113),
        l = o(177),
        d = o(26),
        u = o(58),
        p = o(18),
        f = o(171),
        b = void 0;

    function h() {
        var e = Object(i.ge)("page_header");
        return b = b || (e ? e.offsetHeight : 0)
    }

    function w() {
        cur.__narrowBar = cur.__narrowBar || {}, cur.__narrowBar.bar = cur.__narrowBar.bar || Object(i.ge)("narrow_column"), cur.__narrowBar.barBlock = cur.__narrowBar.bar && Object(i.geByClass1)("page_block", cur.__narrowBar.bar), cur.__narrowBar.wideCol = cur.__narrowBar.wideCol || Object(i.ge)("wide_column"), cur.__narrowBar.isBarFixed = cur.__narrowBar.isBarFixed || "fixed" === Object(i.getStyle)(cur.__narrowBar.bar, "position"), cur.__narrowBar.pl = cur.__narrowBar.pl || Object(i.ge)("page_layout");
        var e = cur.__narrowBar.bar,
            t = cur.__narrowBar.barBlock,
            o = cur.__narrowBar.wideCol,
            a = Object(r.scrollGetY)();
        if (!u.browser.mobile && e && t && o && !Object(i.isVisible)(boxLoader) && !Object(i.isVisible)(boxLayerBG) && !Object(i.isVisible)(layerBG)) {
            var s = window.lastWindowHeight || 0,
                c = Math.min(a, bodyNode.clientHeight - s),
                _ = cur.__narrowBar.pl,
                l = vk.staticheader ? Math.max(0, h() - c) : h(),
                d = cur.__narrowBar.isBarFixed,
                p = Object(n.floatval)(Object(i.getStyle)(cur.__narrowBar.barBlock, "marginTop")),
                f = Object(i.getSize)(e)[1] - (d ? p : 0),
                b = Object(i.getSize)(o)[1],
                w = Object(i.getXY)(o)[1],
                m = f >= b - p,
                v = p,
                O = c + s - b - w - v,
                g = Math.max(0, O),
                E = w - l,
                j = Object(i.getXY)(e)[1] + (d ? p : 0),
                y = cur.__narrowBar.lastSt || 0,
                P = cur.__narrowBar.lastStyles || {},
                M = l + v + f + p + g <= s && !cur.narrowHide,
                C = !1,
                D = void 0;
            c - 1 < E && !(M && u.browser.msie && j < l + p) || m ? D = {
                    marginTop: 0
                } : c - 1 < Math.min(y, j - l - p) || M ? (D = {
                    top: l,
                    marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - Object(i.getSize)(_)[0]))
                }, C = !0) : c + 1 > Math.max(y, j + f + v - s) && O < 0 && !cur.narrowHide || cur.narrowHide && c + 1 > Math.max(y, j + f - l) ? (D = {
                    bottom: cur.narrowHide ? s - l : v,
                    marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - Object(i.getSize)(_)[0]))
                }, C = !0) : D = {
                    marginTop: O >= 0 ? b - f : Math.min(j - w, b - f + E)
                },
                function(e, t) {
                    var o = Object(n.clone)(e),
                        i = Object(n.clone)(t);
                    return Object(n.each)(o, function(e, t) {
                        "position" !== e && (o[e] = Math.round(t))
                    }), Object(n.each)(i, function(e, t) {
                        "position" !== e && (i[e] = Math.round(t))
                    }), JSON.stringify(o) === JSON.stringify(i)
                }(D, P) || (Object(n.each)(P, function(e) {
                    P[e] = null
                }), Object(i.setStyle)(e, Object(n.extend)(P, D)), cur.__narrowBar.lastStyles = D), C !== d && Object(i.toggleClass)(e, "fixed", C), cur.__narrowBar.lastSt = c, cur.__narrowBar.isBarFixed = C
        }
    }

    function m() {
        var e = Object(i.ge)("content");
        e && (Object(i.toggleClass)(e, "page_block", !Object(i.geByClass1)("page_block", e)), window.updateAriaElements())
    }

    function v(e, t) {
        e && "fixed" === Object(i.getStyle)(e, "position") && (t ? Object(i.removeClass)(e, t) : Object(i.setStyle)(e, {
            position: "relative"
        }), e.offsetLeft, t ? Object(i.addClass)(e, t) : Object(i.setStyle)(e, {
            position: "fixed"
        }))
    }

    function O() {
        if (window.pageNode) {
            var e = Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - Object(i.getSize)(Object(i.ge)("page_layout"))[0]));
            u.browser.mobile || vk.staticheader || Object(a.updateHeaderStyles)({
                marginLeft: e
            }), Object(a.updateLeftMenu)(), w(), Object(s.updSideTopLink)()
        }
    }

    function g(e) {
        if (window.pageNode) {
            var t = document.documentElement,
                o = t.clientWidth,
                r = t.clientHeight,
                _ = Object(s.sbWidth)(),
                l = Math.max(Object(n.intval)(window.innerWidth), Object(n.intval)(o)),
                p = Math.max(Object(n.intval)(window.innerHeight), Object(n.intval)(r)),
                b = !1;
            if (u.browser.mobile && (l = Math.max(l, Object(n.intval)(bodyNode.scrollWidth)), p = Math.max(p, Object(n.intval)(bodyNode.scrollHeight))), window.lastWindowWidth !== l || !0 === e) {
                b = !0, window.lastInnerWidth = window.lastWindowWidth = l, layerWrap.style.width = boxLayerWrap.style.width = l + "px";
                var h = layer.style.width = boxLayer.style.width = l - _ - 2 + "px";
                if (window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.width = l + "px", mvLayer.style.width = h), window.wkLayerWrap && (wkLayerWrap.style.width = l + "px", wkLayer.style.width = h), bodyNode.offsetWidth < vk.width + _ + 2 && (l = vk.width + _ + 2), l)
                    for (var m = pageNode.firstChild; m; m = m.nextSibling)
                        if (m.tagName) {
                            for (var O = (window.lastInnerWidth = l - _ - 1) - 1, g = m.firstChild; g; g = g.nextSibling) "scroll_fix" === g.className && (g.style.width = O + "px");
                            vk.staticheader || Object(a.updateHeaderStyles)({
                                width: O
                            })
                        }
            }
            if ((window.lastWindowHeight !== p || !0 === e) && (b = !0, window.lastWindowHeight = p, layerBG.style.height = boxLayerBG.style.height = layerWrap.style.height = boxLayerWrap.style.height = p + "px", window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.height = p + "px"), window.wkLayerWrap)) {
                var E = u.browser.mobile ? window.innerHeight : p;
                wkLayerWrap.style.height = E + "px"
            }
            if (vk.noSideTop || Object(s.updSideTopLink)(1), b && window.curRBox && window.curRBox.boxes && window.getWndInner) {
                var j = getWndInner();
                Object(n.each)(curRBox.boxes, function(e, t) {
                    return t._wnd_resize(j[0], j[1])
                })
            }
            setTimeout(c.updSeenAdsInfo, 0);
            var y = Object(f.getAudioPlayer)();
            y.audioLayer && y.audioLayer.isShown() && y.audioLayer.updatePosition(), cur.pvShown && window.Photoview && setTimeout(Photoview.updatePhotoDimensions), window.tooltips && tooltips.rePositionAll(), cur.lSTL && Object(i.setStyle)(cur.lSTL, {
                width: Math.max(Object(i.getXY)(cur.lSTL.el)[0], 0),
                height: p - 1
            }), Object(i.ge)("dev_top_nav") && Object(i.setStyle)(Object(i.ge)("dev_top_nav", "left", null));
            var P = Object(i.geByClass)("ui_search_fixed"),
                M = Object(i.ge)("narrow_column");
            Object(n.each)(P, function() {
                v(this, "ui_search_fixed"), setTimeout(v.pbind(this, "ui_search_fixed"), 0)
            }), M && (v(M, "fixed"), setTimeout(v.pbind(M, "fixed"), 0)), Object(a.updateLeftMenu)(), w(), Object(d.updateSTL)()
        }
    }

    function E(e) {
        var t = 1;
        e.id || (e = Object(i.ge)("left_hide" + e), t = 0), !t && e.timer || (e.showing ? Object(i.removeAttr)(e, "showing") : (Object(_.animate)(e, {
            opacity: t ? 1 : .5
        }, 200), t && (e.showing = 1))), e.timer && (clearTimeout(e.timer), Object(i.removeAttr)(e, "timer"))
    }

    function j(e) {
        var t = .5;
        e.id || (e = Object(i.ge)("left_hide" + e), t = 0), e.timer = setTimeout(function() {
            Object(_.animate)(e, {
                opacity: t
            }, 200), Object(i.removeAttr)(e, "timer")
        }, 1)
    }

    function y(e, t, o) {
        var n = {
            act: "hide_block",
            block: e,
            hash: t
        };
        o && (n.block = o), ajax.post("al_index.php", n, {
            onDone: c.updSeenAdsInfo
        }), Object(i.hide)("left_block" + e)
    }

    function P(e, t) {
        if (e = Object(i.ge)(e))
            if (e.autosize) e.autosize.update();
            else {
                t.minHeight = Object(n.intval)(t.minHeight) || Object(n.intval)(Object(i.getStyle)(e, "height")), t.maxHeight = Object(n.intval)(t.maxHeight);
                var o = Object(i.getSize)(e)[0] || Object(n.intval)(Object(i.getStyle)(e, "width")),
                    r = Object(i.getStyle)(e, "fontSize"),
                    a = Object(i.getStyle)(e, "lineHeight");
                o < 1 && (o = Object(n.intval)(Object(i.getStyle)(e, "width", !1))), r.indexOf("em") > 0 && (r = Object(n.floatval)(r) * vk.fs), r = Object(n.intval)(r);
                var s = {
                    width: o,
                    height: 10,
                    fontFamily: Object(i.getStyle)(e, "fontFamily"),
                    fontSize: r + "px",
                    lineHeight: a,
                    boxSizing: Object(i.getStyle)(e, "boxSizing")
                };
                Object(n.each)(["Top", "Bottom", "Left", "Right"], function() {
                    s["padding" + this] = Object(i.getStyle)(e, "padding" + this)
                }), e.autosize = {
                    options: t,
                    helper: Object(i.ce)("textarea", {
                        className: "ashelper"
                    }, s),
                    handleEvent: function(t, o) {
                        var n = o.charCode ? String.fromCharCode(o.charCode) : o.charCode;
                        if (void 0 === n && (n = String.fromCharCode(o.keyCode), 10 === o.keyCode || 13 === o.keyCode ? n = "\n" : !u.browser.msie && o.keyCode <= 40 && (n = "")), !n) return t;
                        if (!u.browser.msie) return t.substr(0, e.selectionStart) + n + t.substr(e.selectionEnd);
                        var i = document.selection.createRange();
                        return i.text && (t = t.replace(i.text, "")), t + n
                    },
                    update: function(t) {
                        var o = e.value;
                        !t || "blur" === t.type || "keyup" === t.type || u.browser.msie && "keypress" !== t.type || t.ctrlKey || t.altKey || t.metaKey || (o = e.autosize.handleEvent(o, t)), o || (o = " "), e.autosize.helper.value !== o && (e.autosize.helper.value = o);
                        var r = e.autosize.options,
                            s = Object(i.getSize)(e, !0)[1],
                            c = e.autosize.helper.scrollHeight,
                            _ = c % a;
                        r.exact && _ > 2 && (c -= _ - 2), c < r.minHeight && (c = r.minHeight);
                        var l = {
                                overflow: "hidden"
                            },
                            d = Object(i.getStyle)(e, "overflow").indexOf("auto") > -1 ? "auto" : "hidden";
                        r.maxHeight && c > r.maxHeight && (c = r.maxHeight, Object(n.extend)(l, {
                            overflow: "auto",
                            overflowX: "hidden"
                        })), r.addHeight && (c += r.addHeight), s === c && d === l.overflow || (l.height = c, Object(i.setStyle)(e, l), Object(n.isFunction)(r.onResize) && r.onResize(c))
                    }
                }, t.exact && ("normal" === a && (a = "120%"), a.indexOf("%") > 0 && (a = r * Object(n.intval)(a) / 100)), utilsNode.appendChild(e.autosize.helper), u.browser.opera_mobile ? (Object(i.setStyle)(e, {
                    overflow: "hidden"
                }), e.autosize.update(), Object(l.addEvent)(e, "blur", e.autosize.update)) : (Object(l.addEvent)(e, "keydown keyup keypress change", e.autosize.update), setTimeout(function() {
                    Object(i.setStyle)(e, {
                        overflow: "hidden",
                        resize: "none"
                    }), e.autosize.update();
                    var t = Object(i.val)(e);
                    Object(i.val)(e, " ", !0), Object(i.val)(e, t, !0)
                }, 0))
            }
    }
    var M = {
        init: function() {
            if (this.inited) return !1;
            var e = Object(i.ge)("top_profile_link"),
                t = Object(i.ge)("top_profile_menu");
            if (!e || !t) return !1;
            Object(l.addEvent)(e, "mousedown", M.clicked), this.inited = !0
        },
        clicked: function(e) {
            return !(Object(l.checkEvent)(e) || "mousedown" === e.type && Object(l.checkKeyboardEvent)(e)) && (M.toggle(), !1)
        },
        toggle: function(e) {
            var t = Object(i.ge)("top_profile_link"),
                o = Object(i.ge)("top_profile_menu"),
                n = Object(i.hasClass)(o, "shown");
            void 0 !== e && n === e || (void 0 === e && (e = !n), Object(i.toggleClass)(t, "active", e), Object(i.toggleClass)(o, "shown", e), e ? (Object(p.cancelStackPush)("top_menu", M.toggle.bind(this, !1), !0), cur.introExitTooltipHide && (cur.introExitTooltipHide(), delete cur.introExitTooltipHide)) : Object(p.cancelStackFilter)("top_menu", !0))
        },
        show: function() {
            M.hidetimer && (clearTimeout(M.hidetimer), M.hidetimer = 0), M.toggle(!0)
        },
        hide: function() {
            M.hidetimer || (M.hidetimer = setTimeout(function() {
                M.toggle(!1), M.hidetimer = 0
            }, 200))
        },
        select: function(e, t) {
            return !!Object(l.checkEvent)(t) || (M.toggle(!1), nav.go(e, t, {
                noback: !0
            }))
        }
    };

    function C(e, t) {
        return Object(i.rs)(vk.pr_tpl, {
            id: e || "",
            cls: t || ""
        })
    }

    function D(e) {
        return Object(i.geByClass1)("ui_progress_bar", e)
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "setFavIcon", function() {
        return i
    }), o.d(t, "initFavIcon", function() {
        return r
    });
    var n = o(89);

    function i(e, t) {
        if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
            var o = Object(n.ce)("link", {
                rel: "shortcut icon",
                type: "image/gif",
                href: e
            });
            headNode.replaceChild(o, icoNode), icoNode = o
        }
    }

    function r() {
        window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : ""
    }
}, , function(e, t, o) {
    var n = o(141)("keys"),
        i = o(81);
    e.exports = function(e) {
        return n[e] || (n[e] = i(e))
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "browser", function() {
        return r
    }), o.d(t, "mobPlatforms", function() {
        return a
    }), o.d(t, "browserFeatures", function() {
        return s
    }), o.d(t, "initBrowserUtils", function() {
        return c
    });
    var n = o(89),
        i = navigator.userAgent.toLowerCase(),
        r = {
            version: (i.match(/.+(?:me|ox|on|rv|it|era|opr|ie|edge)[\/: ]([\d.]+)/) || [0, "0"])[1],
            opera: /opera/i.test(i) || /opr/i.test(i),
            vivaldi: /vivaldi/i.test(i),
            amigo: /amigo.*mrchrome soc/i.test(i),
            msie: /msie/i.test(i) && !/opera/i.test(i) || /trident\//i.test(i) || /edge/i.test(i),
            msie6: /msie 6/i.test(i) && !/opera/i.test(i),
            msie7: /msie 7/i.test(i) && !/opera/i.test(i),
            msie8: /msie 8/i.test(i) && !/opera/i.test(i),
            msie9: /msie 9/i.test(i) && !/opera/i.test(i),
            msie_edge: /edge/i.test(i) && !/opera/i.test(i),
            mozilla: /firefox/i.test(i),
            chrome: /chrome/i.test(i) && !/edge/i.test(i),
            safari: !/chrome/i.test(i) && /webkit|safari|khtml/i.test(i),
            iphone: /iphone/i.test(i),
            ipod: /ipod/i.test(i),
            iphone4: /iphone.*OS 4/i.test(i),
            ipod4: /ipod.*OS 4/i.test(i),
            ipad: /ipad/i.test(i),
            android: /android/i.test(i),
            bada: /bada/i.test(i),
            mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(i),
            msie_mobile: /iemobile/i.test(i),
            safari_mobile: /iphone|ipod|ipad/i.test(i),
            opera_mobile: /opera mini|opera mobi/i.test(i),
            opera_mini: /opera mini/i.test(i),
            mac: /mac/i.test(i),
            windows7: /windows nt 6.1/i.test(i),
            windowsVista: /windows nt 6.0/i.test(i),
            windowsXp: /windows nt (5.2|5.1)/i.test(i),
            search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(i),
            smart_tv: /smart-tv|smarttv/i.test(i)
        },
        a = {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            8: 1
        },
        s = {
            wheelEvent: "onwheel" in Object(n.ce)("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : r.mozilla ? "MozMousePixelScroll" : "DOMMouseScroll",
            hasBoundingClientRect: "getBoundingClientRect" in Object(n.ce)("div"),
            cmaEnabled: navigator.credentials && navigator.credentials.preventSilentAccess && vk.cma
        };

    function c() {
        window._ua || (window._ua = navigator.userAgent.toLowerCase()), window.locDomain || (window.locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0]), window.locHost = location.host, window.locProtocol = location.protocol, window.locHash = location.hash.replace("#/", "").replace("#!", "")
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "isInputActive", function() {
        return c
    }), o.d(t, "placeholderSetup", function() {
        return l
    }), o.d(t, "placeholderInit", function() {
        return d
    });
    var n = o(89),
        i = o(177),
        r = o(113),
        a = o(80),
        s = o(58);

    function c() {
        return document.activeElement && (Object(n.attr)(document.activeElement, "contenteditable") || "INPUT" === document.activeElement.tagName || "textarea" === document.activeElement.tagName)
    }

    function _(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = arguments[2],
            i = arguments[3],
            a = e.phshown,
            c = e.phcont,
            _ = t.back,
            l = t.editable,
            d = t.hideBackAfter,
            u = t.timeout,
            p = t.phColor,
            f = void 0 === p ? "#8C8E91" : p,
            b = t.activeColor,
            h = void 0 === b ? "#C0C8D0" : b,
            w = u || 0 === u ? u : 100,
            m = t.period || 200,
            v = void 0;
        if (v = l ? (void 0 !== e.textContent ? e.textContent : e.innerText) || Object(n.geByTag)("img", e).length : e.value, a && (_ && v || !_ && (o && !o.type || v)) ? (Object(n.hide)(c), e.phshown = !1) : a || v || !_ && !i || (Object(n.show)(c), e.phshown = !0, s.browser.opera && i && (e.setAttribute("placeholder", ""), e.removeAttribute("placeholder", ""))), _ && !v) {
            if (o && !o.type) {
                var O = d ? n.hide.pbind(c.firstChild.firstChild) : null;
                clearTimeout(e.phanim), e.phanim = setTimeout(function() {
                    Object(r.animate)(c.firstChild.firstChild, {
                        color: h
                    }, m, O)
                }, w)
            }
            i && (clearTimeout(e.phanim), d && Object(n.show)(c.firstChild.firstChild), e.phanim = setTimeout(function() {
                Object(r.animate)(c.firstChild.firstChild, {
                    color: f
                }, m)
            }, w))
        }
    }

    function l(e, t) {
        var o = Object(n.ge)(e),
            r = t ? Object(a.clone)(t) : {};
        if (o && (!o.phevents || r.reload)) {
            var c = o.getAttribute ? o.getAttribute("placeholder") : o.placeholder;
            if (c) {
                o.removeAttribute("placeholder");
                var l = {},
                    d = !1,
                    u = ["Top", "Bottom", "Left", "Right"];
                if (r.pad) l = r.pad;
                else {
                    if (r.fast) {
                        for (var p = 0; p < 4; p++) l["padding" + u[p]] = 3, l["margin" + u[p]] = 0, l["border" + u[p] + "Width"] = 1;
                        Object(a.extend)(l, r.styles || {})
                    } else {
                        for (var f = [], b = 0; b < 4; b++) f.push("margin" + u[b]), f.push("padding" + u[b]), f.push("border" + u[b] + "Width");
                        l = Object(n.getStyle)(o, f)
                    }
                    for (var h = 0; h < 4; h++) {
                        var w = "margin" + u[h],
                            m = "border" + u[h] + "Width";
                        l[w] = Object(a.intval)(l[w]) + Object(a.intval)(l[m]) + "px", delete l[m]
                    }
                }
                if (r.reload) {
                    var v = o.previousSibling;
                    v && Object(n.hasClass)(v, "input_back_wrap") && Object(n.re)(v)
                }
                var O = r.big ? " big" : "",
                    g = Object(n.getSize)(o)[0] - 20,
                    E = o.phcont = o.parentNode.insertBefore(Object(n.ce)("div", {
                        className: "input_back_wrap no_select",
                        innerHTML: '<div class="input_back"><div class="input_back_content' + O + '" style="width: ' + g + 'px;">' + c + "</div></div>"
                    }), o),
                    j = Object(n.domFC)(E);
                Object(n.setStyle)(j, l);
                var y = _.pbind(o, r),
                    P = s.browser.mobile ? y : function(e, t) {
                        return setTimeout(y.pbind(e, t), 0)
                    };
                s.browser.msie && s.browser.version < 8 && Object(n.setStyle)(j, {
                    marginTop: 1
                }), o.phonfocus = function(e) {
                    d || (o.focused = !0, cur.__focused = o, !0 === e && (Object(n.setStyle)(o, {
                        backgroundColor: "#FFF"
                    }), Object(n.hide)(j)), P(!0, !1))
                }, o.phonblur = function() {
                    d || (cur.__focused = o.focused = !1, Object(n.show)(j), P(!1, !0))
                }, o.phshown = !0, o.phanim = null, (o.value || r.editable && ((void 0 !== o.textContent ? o.textContent : o.innerText) || Object(n.geByTag)("img", o).length)) && (o.phshown = !1, Object(n.hide)(E)), s.browser.opera_mobile || (Object(i.addEvent)(E, "focus click", function(e) {
                    d || (r.editableFocus ? (setTimeout(r.editableFocus.pbind(o), 0), o.phonfocus()) : (o.blur(), o.focus()))
                }), Object(i.addEvent)(o, "focus" + (r.editable ? " click" : ""), o.phonfocus), Object(i.addEvent)(o, "keydown paste cut input", P)), Object(i.addEvent)(o, "blur", o.phonblur), o.check = P, o.getValue = function() {
                    return r.editable ? o.innerHTML : o.value
                }, o.setPlaceholder = function(e) {
                    return Object(n.geByClass1)("input_back_content", E).textContent = e
                }, o.setDisabled = function(e) {
                    return d = e
                }, o.setValue = function(e) {
                    r.editable ? o.innerHTML = e : o.value = e, _(o, r)
                }, o.phevents = !0, o.phonsize = function() {}, r.global || r.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function(e) {
                    for (var t = 0, o = e.length; t < o; t++) Object(n.removeData)(e[t])
                }.pbind(cur.__phinputs))), cur.__phinputs.push(o))
            }
        }
    }

    function d(e, t) {
        var o = Object(n.ge)(e),
            r = t ? Object(a.clone)(t) : {},
            c = void 0 === Object(n.ce)("input").placeholder || o && o.getAttribute && o.getAttribute("contenteditable");
        if (o && (!o.phevents || r.reload)) {
            var _ = o.getAttribute ? o.getAttribute("placeholder") : o.placeholder;
            if (_ && (o.getValue = function() {
                    return r.editable ? o.innerHTML : o.value
                }, o.setValue = function(e) {
                    r.editable ? o.innerHTML = e : o.value = e, c && f(o, r)
                }, o.phonfocus = function() {}, o.phonblur = function() {}, c)) {
                if (o.removeAttribute("placeholder"), r.reload) {
                    var l = Object(n.domNS)(o);
                    l && Object(n.hasClass)(l, "placeholder") && Object(n.re)(l)
                }
                var d = o.phcont = Object(n.domInsertAfter)(Object(n.ce)("div", {
                        className: "placeholder",
                        innerHTML: '<div class="ph_input"><div class="ph_content">' + _ + "</div></div>"
                    }), o),
                    u = f.pbind(o, r),
                    p = s.browser.mobile ? u : function(e, t) {
                        return setTimeout(u.pbind(e, t), 0)
                    };
                o.phonfocus = function() {
                    o.focused = !0, cur.__focused = o, p(!0, !1)
                }, o.phonblur = function() {
                    cur.__focused = o.focused = !1, p(!1, !0)
                }, o.phshown = !0, (o.value || r.editable && ((void 0 !== o.textContent ? o.textContent : o.innerText) || Object(n.geByTag)("img", o).length)) && (o.phshown = !1, Object(n.hide)(d)), s.browser.opera_mobile || (Object(i.addEvent)(d, "focus click contextmenu", function(e) {
                    r.editableFocus ? (setTimeout(r.editableFocus.pbind(o), 0), "contextmenu" === e.type && s.browser.msie && r.editableFocus(o), o.phonfocus()) : (o.blur(), o.focus())
                }), Object(i.addEvent)(o, "focus" + (r.editable ? " click" : ""), o.phonfocus), Object(i.addEvent)(o, "keydown paste cut input", p)), Object(i.addEvent)(o, "blur", o.phonblur), o.check = p, o.phevents = !0, o.phonsize = function() {}, r.global || r.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function() {
                    if (cur.__phinputs)
                        for (var e = 0, t = cur.__phinputs.length; e < t; ++e) Object(n.removeData)(cur.__phinputs[e])
                })), cur.__phinputs.push(o))
            }
        }

        function f(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                o = e.phshown,
                i = e.phcont,
                r = void 0;
            t.editable ? ((r = void 0 !== e.textContent ? e.textContent : e.innerText) && s.browser.opera && r.match(/^[ ]+$/) && (r = ""), r || (r = Object(n.geByTag)("img", e).length > 0), r || (r = Object(n.geByTag)("br", e).length > 1), r || (r = Object(n.geByTag)("p", e).length > 1)) : r = e.value, o && r ? (Object(n.hide)(i), e.phshown = !1) : o || r || (Object(n.show)(i), e.phshown = !0)
        }
    }
}, function(e, t, o) {
    var n = o(134),
        i = o(143).document,
        r = n(i) && n(i.createElement);
    e.exports = function(e) {
        return r ? i.createElement(e) : {}
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "throttleAccumulate", function() {
        return throttleAccumulate
    }), __webpack_require__.d(__webpack_exports__, "executionStackPop", function() {
        return executionStackPop
    }), __webpack_require__.d(__webpack_exports__, "lplog", function() {
        return lplog
    }), __webpack_require__.d(__webpack_exports__, "toArray", function() {
        return toArray
    }), __webpack_require__.d(__webpack_exports__, "arrayUnique", function() {
        return arrayUnique
    }), __webpack_require__.d(__webpack_exports__, "unpackStore", function() {
        return unpackStore
    }), __webpack_require__.d(__webpack_exports__, "debounce", function() {
        return debounce
    }), __webpack_require__.d(__webpack_exports__, "throttle", function() {
        return throttle
    }), __webpack_require__.d(__webpack_exports__, "shuffle", function() {
        return shuffle
    }), __webpack_require__.d(__webpack_exports__, "parallel", function() {
        return parallel
    }), __webpack_require__.d(__webpack_exports__, "hashCode", function() {
        return hashCode
    }), __webpack_require__.d(__webpack_exports__, "parseJSON", function() {
        return parseJSON
    }), __webpack_require__.d(__webpack_exports__, "checkTextLength", function() {
        return checkTextLength
    }), __webpack_require__.d(__webpack_exports__, "getSelectionText", function() {
        return getSelectionText
    }), __webpack_require__.d(__webpack_exports__, "goAway", function() {
        return goAway
    }), __webpack_require__.d(__webpack_exports__, "isFullScreen", function() {
        return isFullScreen
    }), __webpack_require__.d(__webpack_exports__, "updateMoney", function() {
        return updateMoney
    }), __webpack_require__.d(__webpack_exports__, "toggleOnline", function() {
        return toggleOnline
    }), __webpack_require__.d(__webpack_exports__, "onlinePlatformClass", function() {
        return onlinePlatformClass
    }), __webpack_require__.d(__webpack_exports__, "handleScroll", function() {
        return handleScroll
    });
    var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80),
        _ui_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(137),
        _debug_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9),
        _cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(187),
        _ajax__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2),
        _message_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(168),
        _dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(89),
        _lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(153),
        _browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(58),
        _accessibility__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76),
        _dom_events__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(177),
        _scroll__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6);

    function throttleAccumulate(e, t) {
        var o = [],
            n = 0;
        return function(i) {
            o.push(i), n || (n = setTimeout(function() {
                n = !1, e(o), o = []
            }, t))
        }
    }

    function executionStackPop(e) {
        return e.length > 0 && e.pop().func(), e
    }

    function lplog(e, t) {
        var o = void 0,
            n = void 0;
        if (window.__debugMode) {
            switch (t) {
                case "error":
                    o = "color: red", n = "background: red; color: white";
                    break;
                case "success":
                    o = "color: green", n = "background: green; color: white";
                    break;
                default:
                    o = "color: blue;", n = "background: #000; color: #fff;"
            }
            try {
                var i = new Date;
                console.debug("%cLP:[" + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds() + ":" + i.getMilliseconds() + "]%c " + e, n, o)
            } catch (e) {}
        }
    }

    function toArray(e) {
        var t = [];
        if (void 0 === e.length) return Object.keys(e).map(function(t) {
            return e[t]
        });
        for (var o = 0; o < e.length; o++) t.push(e[o]);
        return t
    }

    function arrayUnique(e) {
        for (var t = {}, o = [], n = 0; n < e.length; n++) t[e[n]] || (o.push(e[n]), t[o[n]] = 1);
        return o
    }

    function unpackStore(e) {
        return e.get ? e.get() : e
    }

    function debounce(e, t, o) {
        var n = void 0;
        return function() {
            var i = this,
                r = arguments,
                a = o && !n;
            clearTimeout(n), n = setTimeout(function() {
                n = null, o || e.apply(i, r)
            }, t), a && e.apply(this, r)
        }
    }

    function throttle(e, t) {
        var o = void 0;
        return function() {
            o || (e.apply(this, arguments), o = setTimeout(function() {
                o = !1
            }, t))
        }
    }

    function shuffle(e) {
        for (var t = e.length; t > 0;) {
            var o = Math.floor(Math.random() * t),
                n = e[--t];
            e[t] = e[o], e[o] = n
        }
        return e
    }

    function parallel() {
        var e = [].slice.call(arguments),
            t = e.pop(),
            o = new CallHub(t, e.length);
        Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(e, function(e, t) {
            return t(function() {
                return o.done()
            })
        })
    }

    function hashCode(e) {
        var t = 0;
        if (0 === e.length) return t;
        for (var o = 0, n = e.length; o < n; o++) {
            t = (t << 5) - t + e.charCodeAt(o), t |= 0
        }
        return t
    }

    function parseJSON(obj) {
        if (window.JSON && JSON.parse) try {
            return JSON.parse(obj)
        } catch (e) {
            Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__.topError)("<b>parseJSON:</b> " + e.message, {
                dt: -1,
                type: 5,
                answer: obj
            });
            var evalString = "(" + obj + ")";
            try {
                return eval(evalString)
            } catch (e) {
                if (__debugMode) throw e;
                Object(_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, evalString)
            }
        } else {
            var _evalString = "(" + obj + ")";
            try {
                return eval(_evalString)
            } catch (e) {
                if (__debugMode) throw e;
                Object(_debug_tools__WEBPACK_IMPORTED_MODULE_2__.logEvalError)(e, _evalString)
            }
        }
    }

    function checkTextLength(e, t, o, n, i, r, a) {
        var s = t.getValue ? t.getValue() : t.value,
            c = t.lastLen || 0;
        if (t.lastLen !== s.length || r) {
            t.lastLen = s.length;
            var _ = {
                    "&": 5,
                    "<": 4,
                    ">": 4,
                    '"': 6,
                    "\n": n ? 1 : 4,
                    "\r": 0,
                    "!": 5,
                    "'": 5,
                    $: 6,
                    "\\": 6
                },
                l = {
                    1168: 1,
                    1169: 1,
                    8211: 1,
                    8212: 1,
                    8216: 1,
                    8217: 1,
                    8218: 1,
                    8230: 1,
                    8240: 1,
                    8249: 1,
                    8250: 1,
                    8364: 1,
                    8470: 1,
                    8482: 1,
                    65533: 1
                },
                d = {
                    1037: 1,
                    1104: 1,
                    1117: 1
                };
            i && (_[","] = 5);
            var u = function(e) {
                for (var t = 0, o = 0, n = e.length; o < n; o++) {
                    var i = _[e.charAt(o)],
                        r = e.charCodeAt(o);
                    t += void 0 !== i ? i : !a && r >= 128 && (r < 1025 || d[r] || r > 1119) && !l[r] && (r < 8220 || r > 8222) && (r < 8224 || r > 8226) ? ("&#" + r + ";").length : 1
                }
                return t
            }(s);
            if (o = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)(o), u > Math.max(e - 100, .75 * e))
                if (Object(_dom__WEBPACK_IMPORTED_MODULE_6__.show)(o), u > e)
                    if (i) {
                        var p = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.val)(t, function(e, t) {
                            for (var o = 0, n = "", i = 0, r = e.length; i < r; i++) {
                                var s = e.charAt(i),
                                    c = _[s],
                                    u = e.charCodeAt(i);
                                if ((o += void 0 !== c ? c : !a && u >= 128 && (u < 1025 || d[u] || u > 1119) && !l[u] && (u < 8220 || u > 8222) && (u < 8224 || u > 8226) ? ("&#" + u + ";").length : 1) > t) break;
                                n += s
                            }
                            return n
                        }(s, Math.min(e, c)));
                        t.lastLen = p.length, o.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("text_N_symbols_remain", 0)
                    } else o.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("text_exceeds_symbol_limit", u - e);
            else o.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("text_N_symbols_remain", e - u);
            else Object(_dom__WEBPACK_IMPORTED_MODULE_6__.hide)(o)
        }
    }

    function getSelectionText() {
        var e = "";
        return window.getSelection ? e = window.getSelection().toString() : document.selection && "Control" !== document.selection.type && (e = document.selection.createRange().text), e
    }

    function goAway(e, t, o) {
        if (-1 !== (t || {}).h || Object(_dom_events__WEBPACK_IMPORTED_MODULE_10__.checkEvent)(o)) return !0;
        if (-1 !== (t || {}).h) {
            var n = e.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i);
            if (n && "api." !== n[1].toLowerCase()) return location.href = e, !1;
            var i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(Object(_cookies__WEBPACK_IMPORTED_MODULE_3__.getCookie)("remixsettings_bits"));
            if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(_ajax__WEBPACK_IMPORTED_MODULE_4__.locBase) || 1 & i) return window.open("/away.php?to=" + encodeURIComponent(e) + (t && void 0 !== t.h ? "&h=" + t.h : ""), "_blank"), !1
        }
        var r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)({
            act: "a_go",
            to: e
        }, t || {});
        return !Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showBox)("away.php", r, {}, o)
    }

    function isFullScreen() {
        return !!(document.fullscreenElement || document.fullScreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || cur.pvPartScreen)
    }

    function updateMoney(e, t) {
        if (void 0 !== e && !1 !== e) {
            var o = "";
            !0 === t ? (vk.balanceEx = e, o = "_ex") : vk.balance = e;
            var n = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.geByClass)("votes_balance_nom" + o);
            Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(n, function(t, o) {
                return o.innerHTML = e + " " + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("votes_flex", e)
            });
            var i = e * (vk.vcost || 7),
                r = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.geByClass)("money_balance_nom" + o);
            Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(r, function(e, t) {
                return t.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_money_amount_rub", i, !0)
            }), void 0 !== t && !1 !== t && !0 !== t && updateMoney(t, !0)
        }
    }

    function toggleOnline(e, t) {
        var o = onlinePlatformClass(t).split(" "),
            n = [];
        ["online", "mobile", "_online"].forEach(function(t) {
            Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.inArray)(t, o) && !Object(_dom__WEBPACK_IMPORTED_MODULE_6__.hasClass)(e, t) ? n.push(t) : !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.inArray)(t, o) && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.hasClass)(e, t) && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.removeClass)(e, t)
        }), n.length > 0 && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.addClass)(e, n.join(" "))
    }

    function onlinePlatformClass(e) {
        var t = " _online";
        return e && (t += " online"), _browser__WEBPACK_IMPORTED_MODULE_8__.mobPlatforms[e] && (t += " mobile"), Object(_accessibility__WEBPACK_IMPORTED_MODULE_9__.updateOnlineText)(), t
    }

    function handleScroll(e) {
        e = e.split(",");
        var t = cur.named || {},
            o = e[0] && (t[e[0]] || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)(e[0])) || !1,
            n = e[1] && (t[e[1]] || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)(e[1])) || !1;
        if (!o && !n) {
            if (!(o = document.getElementsByName(e[0])[0])) return;
            o = o.nextSibling
        }
        var i = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)("page_header_wrap") || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)("dev_top_nav_wrap");
        setTimeout(function() {
            o && Object(_scroll__WEBPACK_IMPORTED_MODULE_11__.scrollToY)(Object(_dom__WEBPACK_IMPORTED_MODULE_6__.getXY)(o)[1] - (i ? Object(_dom__WEBPACK_IMPORTED_MODULE_6__.getSize)(i)[1] : 0), 0), n && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.elfocus)(n)
        }, 300)
    }
}, function(e, t, o) {
    "use strict";
    var n, i, r, a;
    o.r(t), String.fromCodePoint || (n = function() {
        try {
            var e = {},
                t = Object.defineProperty,
                o = t(e, e, e) && t
        } catch (e) {}
        return o
    }(), i = String.fromCharCode, r = Math.floor, a = function(e) {
        var t, o, n = [],
            a = -1,
            s = arguments.length;
        if (!s) return "";
        for (var c = ""; ++a < s;) {
            var _ = Number(arguments[a]);
            if (!isFinite(_) || _ < 0 || _ > 1114111 || r(_) != _) throw RangeError("Invalid code point: " + _);
            _ <= 65535 ? n.push(_) : (t = 55296 + ((_ -= 65536) >> 10), o = _ % 1024 + 56320, n.push(t, o)), (a + 1 == s || n.length > 16384) && (c += i.apply(null, n), n.length = 0)
        }
        return c
    }, n ? n(String, "fromCodePoint", {
        value: a,
        configurable: !0,
        writable: !0
    }) : String.fromCodePoint = a)
}, , , function(e, t, o) {
    o(130), o(175), o(12), o(118), e.exports = o(36).Map
}, , , , function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "initLayers", function() {
        return p
    });
    var n = o(104),
        i = o(89),
        r = o(6),
        a = o(172),
        s = o(123),
        c = o(80),
        _ = o(18),
        l = o(171),
        d = {
            sh: function(e, t) {
                Object(i.show)(e), Object(c.isFunction)(t) && t()
            },
            hd: function(e, t) {
                Object(i.hide)(e), Object(c.isFunction)(t) && t()
            },
            visible: !1,
            _show: function(e, t, o, s) {
                var c = "layers" + (boxQueue.count() + 1);
                Object(_.cancelStackPush)(c, function() {}), Object(i.setStyle)(e, {
                    opacity: o || "",
                    backgroundColor: s || ""
                }), d.visible || (Object(n.toggleFlash)(), Object(r.disableBodyScroll)()), d.visible || Object(a.pauseLastInlineVideo)(), d.visible = !0, Object(i.addClass)(bodyNode, "layers_shown"), t.visibilityHide ? Object(i.removeClass)(t, "box_layer_hidden") : Object(i.show)(t), d.sh(e), window.updateWndVScroll && updateWndVScroll()
            },
            _hide: function(e, t) {
                d.hd(e, function() {
                    var e = "layers" + (boxQueue.count() + 1);
                    Object(_.cancelStackFilter)(e), t && t.visibilityHide ? Object(i.addClass)(t, "box_layer_hidden") : Object(i.hide)(t), Object(i.isVisible)(layerWrap) || cur._inLayer || Object(i.isVisible)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(i.isVisible)(window.mvLayerWrap)) || Object(i.isVisible)(window.wkLayerWrap) || (d.visible = !1, Object(i.removeClass)(bodyNode, "layers_shown"), Object(n.toggleFlash)(!0), Object(r.enableBodyScroll)()), window.updateWndVScroll && updateWndVScroll()
                }), d.visible || Object(a.playLastInlineVideo)()
            }
        },
        u = {
            push: function(e) {
                var t = void 0,
                    o = !!u.count() && u._layers[u._layers.length - 1];
                if (cur.pvShown && "temp" != cur.pvListId) t = ["photo", cur.pvData[cur.pvListId][cur.pvIndex].id, cur.pvListId, {
                    onHide: cur.pvOptions.onHide,
                    scroll: cur.pvNarrowScrollbar ? cur.pvNarrowScrollbar.data.scrollTop : 0,
                    onShow: e,
                    noHistory: !!cur.pvNoHistory,
                    histLen: cur.pvHistoryLength
                }];
                else if (window.mvcur && mvcur.mvShown && !mvcur.minimized) {
                    var n = mvcur.options && (mvcur.options.autoplay || mvcur.options.focusPlay),
                        i = {
                            scroll: mvLayerWrap.scrollTop,
                            noHistory: !!mvcur.noHistory,
                            nomin: 1,
                            autoplay: n,
                            prevLoc: mvcur.mvPrevLoc
                        };
                    VideoPlaylist.getCurListId() && (i = Object(c.extend)(i, {
                        playlistId: VideoPlaylist.getCurListId(),
                        module: Videoview.getVideoModule(),
                        addParams: {
                            force_no_repeat: 1,
                            show_next: 1
                        }
                    })), t = ["video", mvcur.videoRaw, mvcur.listId, i]
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
                return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || u._layers.push(t), u.skipVideo = !1, !0
            },
            noHistory: function() {
                for (var e = u._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
            },
            hide: function() {
                u._bl = !0, window.WkView && d.fullhide == WkView.hide ? (Object(i.hide)(wkLayerWrap), clearTimeout(wkcur.showT)) : d.fullhide && d.fullhide(!0, !0), setTimeout(u.unblock, 5)
            },
            unblock: function() {
                u._bl = !1
            },
            pop: function() {
                if (u.count() && !u._bl) {
                    var e = u._layers.pop();
                    if (u.skipVideo && (u.skipVideo = !1, "video" == e[0])) return u._layers.push(e), void(u.skipVideo = !1);
                    "photo" === e[0] ? (Object(c.extend)(e[3], {
                        fromQueue: !0
                    }), Object(l.showPhoto)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(c.extend)(e[3], {
                        fromQueue: !0
                    }), Object(a.showVideo)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(l.showWiki)({
                        w: e[1]
                    }, !1, !1, e[3]) : "stories" === e[0] ? Object(s.showStory)(e[1]) : "podcast" === e[0] && Object(l.showPodcast)(null, e[1], null, "layer_back")
                }
            },
            back: function(e, t, o, n) {
                for (var i = u._layers, r = i.length; r > 0; --r)
                    if (i[r - 1][0] == e && i[r - 1][1] == t || i[r - 1][0] == o && i[r - 1][1] == n) return u._layers = i.slice(0, r), u.pop(), !0;
                return !1
            },
            count: function() {
                return u._layers.length
            },
            clear: function() {
                u._layers = []
            },
            _layers: []
        };

    function p(e, t, o, n) {
        return window.layerQueue = u, Object(c.extend)(d, {
            show: d._show.pbind(e, t),
            boxshow: d._show.pbind(o, n),
            wrapshow: d._show.pbind(e),
            hide: d._hide.pbind(e, t),
            boxhide: d._hide.pbind(o, n),
            wraphide: d._hide.pbind(e)
        }), d
    }
}, , , , function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t, o) {
    var n = o(146)("iterator"),
        i = !1;
    try {
        var r = [7][n]();
        r.return = function() {
            i = !0
        }, Array.from(r, function() {
            throw 2
        })
    } catch (e) {}
    e.exports = function(e, t) {
        if (!t && !i) return !1;
        var o = !1;
        try {
            var r = [7],
                a = r[n]();
            a.next = function() {
                o = !0
            }, r[n] = function() {
                return a
            }, e(r)
        } catch (e) {}
        return o
    }
}, , function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "hasAccessibilityMode", function() {
        return s
    }), o.d(t, "updateOnlineText", function() {
        return c
    }), o.d(t, "updateAriaCheckboxes", function() {
        return _
    }), o.d(t, "updateAriaRadioBtns", function() {
        return l
    }), o.d(t, "updateAriaElements", function() {
        return d
    });
    var n = o(25),
        i = o(80),
        r = o(89),
        a = o(153);

    function s() {
        return !(!window.vk || !vk.a11y)
    }

    function c() {
        clearTimeout(cur.updateOnlineTO), cur.updateOnlineTO = setTimeout(function() {
            Object(i.each)(Object(r.geByClass)("_online"), function() {
                var e = Object(r.geByClass1)("_online_reader", this) || this,
                    t = Object(r.hasClass)(this, "online"),
                    o = Object(r.hasClass)(this, "mobile"),
                    n = Object(r.geByTag)("img", e),
                    s = function(e) {
                        var t = Object(r.domClosest)("_post", e),
                            o = t && Object(r.domByClass)(t, "author");
                        return o ? o.innerText || o.textContent : ""
                    };
                if (t) {
                    var c = "";
                    Object(i.each)(n, function() {
                        var e = Object(r.attr)(this, "alt") || Object(r.attr)(this, "data-alt") || s(this);
                        e && (c = Object(i.trim)(c + " " + e), this.setAttribute("data-alt", e), this.removeAttribute("alt"))
                    }), c = Object(i.trim)(c + " " + (o ? Object(a.getLang)("global_user_is_online_mobile") : Object(a.getLang)("global_user_is_online"))), e.setAttribute("aria-label", c)
                } else Object(i.each)(n, function() {
                    var e = Object(r.attr)(this, "data-alt") || s(this);
                    e && (this.setAttribute("alt", e), this.removeAttribute("data-alt"))
                }), e.removeAttribute("aria-label")
            })
        }, 100)
    }

    function _() {
        clearTimeout(cur.updateChkBoxTO), cur.updateChkBoxTO = setTimeout(function() {
            var e = [];
            Object(i.each)(["checkbox", "checkbox_pic"], function() {
                e = e.concat(Object(r.geByClass)(this))
            }), Object(i.each)(e, function() {
                "DIV" !== this.tagName || this.getAttribute("role") || (this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", Object(n.isChecked)(this) ? "true" : "false"), this.setAttribute("tabindex", 0))
            })
        }, 100)
    }

    function l() {
        clearTimeout(cur.updateRadioBtnsTO), cur.updateRadioBtnsTO = setTimeout(function() {
            var e = [],
                t = Object(r.geByClass)("radiobtn");
            Object(i.each)(t, function() {
                if ("DIV" === this.tagName && !this.getAttribute("role")) {
                    var t = Object(n.isChecked)(this);
                    this.setAttribute("role", "radio"), this.setAttribute("aria-checked", t ? "true" : "false"), this.setAttribute("tabindex", t ? 0 : -1);
                    var o = function(e) {
                        var t = 0,
                            o = e;
                        for (; t < 5 && o !== document;) {
                            o = Object(r.domPN)(o);
                            var n = Object(r.geByClass)("radiobtn", o);
                            if (n.length > 1) break;
                            t++
                        }
                        return o
                    }(this);
                    ~e.indexOf(o) || e.push(o)
                }
            }), Object(i.each)(e, function() {
                if (!Object(r.geByClass)("on", this).length) {
                    var e = Object(r.geByClass)("radiobtn", this);
                    e.length && e[0].setAttribute("tabindex", 0)
                }
            })
        }, 100)
    }

    function d() {
        c(), _(), l()
    }
}, , , function(e, t, o) {
    "use strict";
    var n = o(165),
        i = o(40),
        r = o(27),
        a = o(3);
    e.exports = o(1)(Array, "Array", function(e, t) {
        this._t = a(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            o = this._i++;
        return !e || o >= e.length ? (this._t = void 0, i(1)) : i(0, "keys" == t ? o : "values" == t ? e[o] : [o, e[o]])
    }, "values"), r.Arguments = r.Array, n("keys"), n("values"), n("entries")
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "vkLocal", function() {
        return c
    }), o.d(t, "lTimeout", function() {
        return _
    }), o.d(t, "rand", function() {
        return l
    }), o.d(t, "irand", function() {
        return d
    }), o.d(t, "isUndefined", function() {
        return u
    }), o.d(t, "isFunction", function() {
        return p
    }), o.d(t, "isArray", function() {
        return f
    }), o.d(t, "isString", function() {
        return b
    }), o.d(t, "isObject", function() {
        return h
    }), o.d(t, "isEmpty", function() {
        return w
    }), o.d(t, "vkNow", function() {
        return m
    }), o.d(t, "vkImage", function() {
        return v
    }), o.d(t, "trim", function() {
        return O
    }), o.d(t, "stripHTML", function() {
        return g
    }), o.d(t, "escapeRE", function() {
        return E
    }), o.d(t, "intval", function() {
        return j
    }), o.d(t, "floatval", function() {
        return y
    }), o.d(t, "positive", function() {
        return P
    }), o.d(t, "isNumeric", function() {
        return M
    }), o.d(t, "winToUtf", function() {
        return C
    }), o.d(t, "replaceEntities", function() {
        return D
    }), o.d(t, "clean", function() {
        return T
    }), o.d(t, "unclean", function() {
        return k
    }), o.d(t, "each", function() {
        return L
    }), o.d(t, "indexOf", function() {
        return x
    }), o.d(t, "inArray", function() {
        return A
    }), o.d(t, "clone", function() {
        return B
    }), o.d(t, "arrayKeyDiff", function() {
        return I
    }), o.d(t, "extend", function() {
        return S
    }), o.d(t, "addTemplates", function() {
        return R
    }), o.d(t, "getTemplate", function() {
        return W
    }), o.d(t, "serializeForm", function() {
        return U
    }), o.d(t, "extractUrls", function() {
        return K
    }), o.d(t, "isRetina", function() {
        return N
    }), o.d(t, "getCaretCharacterOffsetWithin", function() {
        return F
    }), o.d(t, "formatCount", function() {
        return H
    }), o.d(t, "encodeHtml", function() {
        return z
    }), o.d(t, "decodeHtml", function() {
        return G
    }), o.d(t, "initUtilsCommon", function() {
        return Y
    });
    var n = o(89),
        i = o(153),
        r = o(58),
        a = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };

    function c(e) {
        var t = PageID;
        return function() {
            t === PageID && e.apply(this, arguments)
        }
    }

    function _(e, t) {
        return setTimeout(c(e), t)
    }
    var l = function(e, t) {
            return Math.random() * (t - e + 1) + e
        },
        d = function(e, t) {
            return Math.floor(l(e, t))
        },
        u = function(e) {
            return void 0 === e
        },
        p = function(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e)
        },
        f = function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        },
        b = function(e) {
            return "string" == typeof e
        },
        h = function(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        };

    function w(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
        for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
        return !0
    }
    var m = function() {
            return +new Date
        },
        v = function() {
            return window.Image ? new Image : Object(n.ce)("img")
        },
        O = function(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        },
        g = function(e) {
            return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
        },
        E = function(e) {
            return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        };

    function j(e) {
        return !0 === e ? 1 : parseInt(e) || 0
    }

    function y(e) {
        return !0 === e ? 1 : parseFloat(e) || 0
    }

    function P(e) {
        return (e = j(e)) < 0 ? 0 : e
    }

    function M(e) {
        return !isNaN(e)
    }

    function C(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return (t = j(t)) >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function D() {
        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        return Object(n.se)("<textarea>" + e + "</textarea>").value
    }

    function T(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function k(e) {
        return D(e.replace(/\t/g, "\n"))
    }

    function L(e, t) {
        if (h(e) || void 0 === e.length) {
            for (var o in e)
                if (Object.prototype.hasOwnProperty.call(e, o) && !1 === t.call(e[o], o, e[o])) break
        } else
            for (var n = 0, i = e.length; n < i; n++) {
                var r = e[n];
                if (!1 === t.call(r, n, r)) break
            }
        return e
    }

    function x(e, t, o) {
        for (var n = o || 0, i = (e || []).length; n < i; n++)
            if (e[n] == t) return n;
        return -1
    }

    function A(e, t) {
        return -1 !== x(t, e)
    }

    function B(e, t) {
        var o = h(e) || void 0 === e.length ? {} : [];
        for (var n in e)(!/webkit/i.test(_ua) || "layerX" != n && "layerY" != n && "webkitMovementX" != n && "webkitMovementY" != n) && (t && "object" === s(e[n]) && "prototype" !== n && null !== e[n] ? o[n] = B(e[n]) : o[n] = e[n]);
        return o
    }

    function I(e) {
        var t = {},
            o = arguments.length,
            n = arguments;
        for (var i in e)
            if (e.hasOwnProperty(i)) {
                for (var r = !1, a = 1; a < o; a++) n[a][i] && n[a][i] === e[i] && (r = !0);
                r || (t[i] = e[i])
            }
        return t
    }

    function S() {
        var e = arguments,
            t = e.length,
            o = e[0] || {},
            n = 1,
            i = !1;
        for ("boolean" == typeof o && (i = o, o = e[1] || {}, n = 2), "object" === (void 0 === o ? "undefined" : s(o)) || p(o) || (o = {}); n < t; n++) {
            var r = e[n];
            if (null != r)
                for (var a in r)
                    if (r.hasOwnProperty(a)) {
                        var c = o[a],
                            _ = r[a];
                        o !== _ && (i && _ && "object" === (void 0 === _ ? "undefined" : s(_)) && !_.nodeType ? o[a] = S(i, c || (null != _.length ? [] : {}), _) : void 0 !== _ && (o[a] = _))
                    }
        }
        return o
    }

    function R(e) {
        window.templates = window.templates || {}, S(window.templates, e)
    }

    function W(e, t) {
        var o = (window.templates = window.templates || {})[e];
        return "function" == typeof o && (o = o()), o && t ? Object(n.rs)(o, t) : o || ""
    }

    function U(e) {
        if ("object" !== (void 0 === e ? "undefined" : s(e))) return !1;
        var t = {},
            o = function(t) {
                return Object(n.geByTag)(t, e)
            },
            i = function(o, i) {
                if (i.name)
                    if ("text" !== i.type && i.type)
                        if (i.getAttribute("bool")) {
                            var a = Object(n.val)(i);
                            if (!a || "0" === a) return;
                            t[i.name] = 1
                        } else t[i.name] = r.browser.msie && !i.value && e[i.name] ? e[i.name].value : i.value;
                else t[i.name] = Object(n.val)(i)
            };
        return L(o("input"), function(e, t) {
            if ("radio" !== t.type && "checkbox" !== t.type || t.checked) return i(0, t)
        }), L(o("select"), i), L(o("textarea"), i), t
    }

    function K(e, t) {
        for (var o = t ? /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i : /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i, n = void 0, i = []; e && (n = e.match(o));) {
            e = e.substr(n.index + n[0].length);
            var r = 0;
            n[4] || (r = 7), i.push({
                url: n[2 + r],
                query: n[5 + r] || "",
                domain: n[4 + r]
            })
        }
        return i
    }
    var N = function() {
        return window.devicePixelRatio >= 2
    };

    function F(e) {
        var t = 0,
            o = 0,
            n = e.ownerDocument || e.document,
            i = n.defaultView || n.parentWindow;
        if (i.getSelection().rangeCount > 0) {
            var r = i.getSelection().getRangeAt(0),
                a = r.cloneRange();
            a.selectNodeContents(e), a.setEnd(r.startContainer, r.startOffset), t = a.toString().length, a.setEnd(r.endContainer, r.endOffset), o = a.toString().length
        }
        return [t, o]
    }

    function H(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = t.kLimit || 1e3;
        return e >= (t.mLimit || 1e6) && !t.noCheck ? H(e = (e = j(e / 1e5)) > 1e3 ? j(e / 10) : e / 10, S(t, {
            noCheck: !0
        }), !0) + "M" : e >= o && !t.noCheck ? H(e = (e = j(e / 100)) > 100 ? j(e / 10) : e / 10, S(t, {
            noCheck: !0
        }), !0) + "K" : Object(i.langNumeric)(e, "%s", !0).replace(/,/g, ".")
    }
    var q, V = a((q = null, [function(e) {
            return q || (q = Object(n.se)("<span> </span>")), q.innerText = e, q.innerHTML
        }, function(e) {
            return q || (q = Object(n.se)("<span> </span>")), q.innerHTML = e.replace(/<br\s*\/?>/gim, "\n"), q.innerText
        }]), 2),
        z = V[0],
        G = V[1];

    function Y() {
        window.PageID = window.PageID || 1
    }
}, function(e, t) {
    var o = 0,
        n = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++o + n).toString(36))
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "statlogsValueEvent", function() {
        return a
    });
    var n = o(187),
        i = o(80),
        r = o(129);

    function a(e, t, o, a, s) {
        if (void 0 !== e && void 0 !== t) {
            var c = Array.from(arguments).slice(2, 5),
                _ = void 0;
            ! function e(t, o, n) {
                var i = "lockkk_" + t;
                if (!0 === r.ls.get(i)) r.ls.checkVersion() ? n || setTimeout(e.pbind(t, o, !0), 100) : o();
                else {
                    r.ls.set(i, !0);
                    try {
                        o()
                    } catch (e) {}
                    r.ls.set(i, !1)
                }
            }("stats_cookie_lock", function() {
                try {
                    _ = (_ = JSON.parse(Object(n.getCookie)("remixsts"))).data
                } catch (e) {
                    _ = []
                }
                for (_.push([Math.round(Date.now() / 1e3), e, t].concat(c)); _.length > 100;) _.shift();
                var o = Math.round(Object(i.rand)(0, 1e9));
                Object(n.setCookie)("remixsts", JSON.stringify({
                    data: _,
                    uniqueId: o
                }), .01)
            })
        }
    }
}, function(e, t, o) {
    e.exports = !o(131)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, , function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "stManager", function() {
        return c
    }), o.d(t, "fillStaticFilesData", function() {
        return _
    }), o.d(t, "appendCssFiles", function() {
        return l
    }), o.d(t, "initStaticManager", function() {
        return d
    });
    var n = o(89),
        i = o(137),
        r = o(80),
        a = o(58),
        s = function(e) {
            return "cmodules/" + e
        },
        c = {
            _waiters: [],
            _wait: function() {
                var e = c._waiters.length,
                    t = {},
                    o = [];
                if (!e) return clearInterval(c._waitTimer), void(c._waitTimer = !1);
                for (var a = 0; a < e; ++a) {
                    for (var s = c._waiters[a][0], _ = 0, l = s.length; _ < l; ++_) {
                        var d = s[_];
                        if (!t[d])
                            if (StaticFiles[d].l || "css" !== StaticFiles[d].t || "none" !== Object(n.getStyle)(StaticFiles[d].n, "display") || c.done(d), StaticFiles[d].l) t[d] = 1;
                            else if (t[d] = -1, vk.loaded) {
                            var u = ++StaticFiles[d].c;
                            (u > c.lowlimit && stVersions[d] > 0 || u > c.highlimit) && (stVersions[d] < 0 ? (Object(i.topError)("<b>Error:</b> Could not load <b>" + d + "</b>.", {
                                dt: 5,
                                type: 1,
                                msg: "Failed to load with " + c.lowlimit + "/" + c.highlimit + " limits (" + (Object(r.vkNow)() - vk.started) / 100 + " ticks passed)",
                                file: d
                            }), StaticFiles[d].waitersLength = 1, t[d] = 1) : (Object(i.topMsg)("Some problems with loading <b>" + d + "</b>...", 5), stVersions[d] = Object(r.irand)(-1e4, -1), c._add(d, StaticFiles[d])))
                        }
                        t[d] > 0 && (s.splice(_, 1), --_, --l)
                    }
                    s.length || (o.push(c._waiters.splice(a, 1)[0][1]), a--, e--)
                }
                for (var p = 0, f = o.length; p < f; ++p) o[p]()
            },
            _addCss: function(e, t) {
                var o = Object(n.ce)("style", {
                        type: "text/css",
                        media: "screen"
                    }),
                    i = Object(n.domNS)(t);
                return i ? headNode.insertBefore(o, i) : headNode.appendChild(o), o.sheet ? o.sheet.insertRule(e, 0) : o.styleSheet && (o.styleSheet.cssText = e), o
            },
            _srcPrefix: function(e, t) {
                return -1 === e.indexOf(".js") && -1 === e.indexOf(".css") || function(e) {
                    for (var t = 0; t < vk.stExcludedMasks.length; t++)
                        if (-1 !== e.indexOf(vk.stExcludedMasks[t])) return !0;
                    return !1
                }(e) ? "" : vk.stDomain || ""
            },
            _add: function(e, t) {
                var o = e.replace(/[\/\.]/g, "_"),
                    i = stVersions[e],
                    r = e + "?" + i,
                    a = c._srcPrefix(e, i);
                if (StaticFiles[e] = {
                        v: i,
                        n: o,
                        l: 0,
                        c: 0
                    }, -1 !== e.indexOf(".js")) {
                    var _ = "/js/";
                    if (stTypes.fromLib[e] ? _ += "lib/" : stTypes.fromCompiled && stTypes.fromCompiled[e] ? _ += s("web/") : /^lang\d/i.test(e) || stTypes.fromRoot[e] || -1 !== e.indexOf("/") || (_ += "al/"), StaticFiles[e].t = "js", e === s("web/common_web.js")) setTimeout(c.done.bind(c).pbind(s("web/common_web.js")), 0);
                    else {
                        var l = a + _ + r;
                        c._insertNode(l, e), StaticFiles[e].src = l
                    }
                } else if (-1 !== e.indexOf(".css")) {
                    var d = a + ("/css/" + (vk.css_dir || "") + (stTypes.fromRoot[e] || -1 !== e.indexOf("/") ? "" : "al/")) + r;
                    t && t.l && "css" === t.t && (StaticFiles[e].styleNode = c._addCss("#" + o + " {display: block; }", c._getOldNode(d))), c._insertNode(d, e), StaticFiles[e].t = "css", StaticFiles[e].src = d, Object(n.ge)(o) || utilsNode.appendChild(Object(n.ce)("div", {
                        id: o
                    }))
                }
            },
            _getOldNode: function(e) {
                return !!headNode.querySelector && ((e = e.split("?")[0]).match(/\.css$/) ? headNode.querySelector('link[href^="' + e + '"]') : headNode.querySelector('script[src^="' + e + '"]'))
            },
            _insertNode: function(e, t) {
                var o = e.split("?")[0].match(/\.css$/),
                    i = c._getOldNode(e);
                o && StaticFiles[t] && StaticFiles[t].styleNode ? i = Object(n.domNS)(StaticFiles[t].styleNode) : i && (i = Object(n.domNS)(i));
                var r = void 0;
                o ? (r = Object(n.ce)("link", {
                    type: "text/css",
                    rel: "stylesheet",
                    href: e
                })).onload = function() {
                    c._removeDuplicateNodes(t)
                } : r = Object(n.ce)("script", {
                    type: "text/javascript",
                    src: e
                }), i ? headNode.insertBefore(r, i) : headNode.appendChild(r)
            },
            _removeDuplicateNodes: function(e) {
                var t = StaticFiles[e];
                if (t && t.src) {
                    var o = t.src.split("?")[0],
                        i = c._getOldNode(o);
                    if (i) {
                        t.styleNode && (Object(n.re)(t.styleNode), delete StaticFiles[e].styleNode);
                        for (var r = o.match(/\.css$/); i && (i = Object(n.domNS)(i));) {
                            var a = r ? i.href : i.src;
                            if (!a) break;
                            if ((a = a.replace(/^(https?:\/\/([a-z0-9\-\.\_]+))?vk\.com/, "")).split("?")[0] !== o) break;
                            Object(n.re)(Object(n.domPS)(i))
                        }
                    }
                }
            },
            add: function(e, t, o) {
                var n = [],
                    i = document.documentElement;
                for (var _ in Object(r.isArray)(e) || (e = [e]), e)
                    if (e.hasOwnProperty(_)) {
                        var l = e[_];
                        if (l) {
                            -1 !== l.indexOf("?") && (l = l.split("?")[0]), /^lang\d/i.test(l) ? stVersions[l] = stVersions.lang : stVersions[l] || (stVersions[l] = 1), (a.browser.opera && 768 == i.clientHeight && 1024 == i.clientWidth || __debugMode) && !a.browser.iphone && !a.browser.ipad && l !== s("web/common_web.js") && "common.css" !== l && stVersions[l] > 0 && stVersions[l] < 1e9 && (stVersions[l] += Object(r.irand)(1e9, 2e9));
                            var d = StaticFiles[l];
                            d && d.v == stVersions[l] || c._add(l, d), t && !StaticFiles[l].l && n.push(l)
                        }
                    }
                if (t) {
                    if (!n.length) return !0 === o ? setTimeout(t, 0) : t();
                    c._waiters.push([n, t]), c._waitTimer || (c._waitTimer = setInterval(c._wait, 100))
                }
            },
            done: function(e) {
                stVersions[e] < 0 && Object(i.topMsg)('<b>Warning:</b> Something is bad, please <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.', 10), StaticFiles[e].l = 1, "js" === StaticFiles[e].t && c._removeDuplicateNodes(e)
            }
        };

    function _() {
        Object(r.each)(StaticFiles, function(e, t) {
            t.t = -1 !== e.indexOf(".css") ? "css" : "js", t.n = e.replace(/[\/\.]/g, "_"), t.l = 0, t.c = 0
        })
    }

    function l() {
        Object(r.each)(StaticFiles, function(e, t) {
            t.l = 1, "css" === t.t && utilsNode.appendChild(Object(n.ce)("div", {
                id: t.n
            }))
        })
    }

    function d() {
        window.jsc = s, window.stVersions || (window.stVersions = {}, window.stTypes = {}, window.navMap = {}), window.StaticFiles || (window.StaticFiles = {})
    }
}, , function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "initHub", function() {
        return c
    });
    var n = o(177),
        i = o(80),
        r = o(2),
        a = o(58),
        s = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();

    function c() {
        return new function(e) {
            var t = function(e) {
                    var t = e.split("#"),
                        o = s(t, 2),
                        n = o[0],
                        i = o[1],
                        a = n.split("?"),
                        c = s(a, 2),
                        _ = c[0],
                        l = c[1];
                    return _ + (l ? "?" + Object(r.ajx2q)(Object(r.q2ajx)(l)) : "") + (i ? "#" + i : "")
                },
                o = Object(i.extend)({
                    onLocChange: function() {}
                }, e),
                c = function() {
                    var e = "";
                    return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), t(e.replace(/^(\/|!)/, ""))
                },
                _ = c(),
                l = function(e) {
                    var t = c();
                    t === _ && !0 !== e || (o.onLocChange(t), _ = t)
                },
                d = void 0;
            return {
                setLoc: function(e) {
                    _ = t(e);
                    var o = (location.toString().match(/#(.*)/) || {})[1] || "";
                    if (!o && vk.al > 1 && (o = (location.pathname || "") + (location.search || "")), (o = (o = t(o)).replace(/^(\/|!)/, "")) !== _) {
                        if (3 == vk.al) try {
                            return window.saveScrollTopOnBack && (delete window.saveScrollTopOnBack, history.replaceState({
                                scrollTop: window.lastScrollTop,
                                preventScroll: window.preventLocationScroll
                            }, "", "/" + o), window.preventLocationScroll && delete window.preventLocationScroll), void history.pushState({}, "", "/" + _)
                        } catch (e) {}
                        window.chHashFlag = !0, location.hash = "#" + vk.navPrefix + _
                    }
                },
                getLoc: c,
                init: function() {
                    1 == vk.al && l(!0), 3 == vk.al ? (Object(n.addEvent)(window, "popstate", l), a.browser.safari && Object(n.addEvent)(window, "hashchange", l)) : "onhashchange" in window ? Object(n.addEvent)(window, "hashchange", function() {
                        window.chHashFlag ? window.chHashFlag = !1 : l()
                    }) : d = setInterval(l, 200)
                },
                setOptions: function(e) {
                    o = Object(i.extend)(o, e)
                },
                checker: l,
                stop: function() {
                    vk.al < 3 ? clearInterval(d) : 3 == vk.al && Object(n.removeEvent)(window, "popstate", l)
                }
            }
        }({
            onLocChange: function(e) {
                var t = {
                    back: !0,
                    hist: !0
                };
                3 === vk.al && history.state && Object(i.isObject)(history.state) && (t.scrollTop = Object(i.intval)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
            }
        })
    }
}, function(e, t, o) {
    var n = o(112),
        i = Math.min;
    e.exports = function(e) {
        return e > 0 ? i(n(e), 9007199254740991) : 0
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "ge", function() {
        return s
    }), o.d(t, "geByTag", function() {
        return c
    }), o.d(t, "geByTag1", function() {
        return _
    }), o.d(t, "geByClass", function() {
        return l
    }), o.d(t, "geByClass1", function() {
        return d
    }), o.d(t, "gpeByClass", function() {
        return u
    }), o.d(t, "domQuery", function() {
        return p
    }), o.d(t, "domQuery1", function() {
        return f
    }), o.d(t, "domClosest", function() {
        return b
    }), o.d(t, "domClosestByTag", function() {
        return h
    }), o.d(t, "gpeByTag", function() {
        return w
    }), o.d(t, "ce", function() {
        return m
    }), o.d(t, "cf", function() {
        return j
    }), o.d(t, "re", function() {
        return y
    }), o.d(t, "se", function() {
        return P
    }), o.d(t, "sech", function() {
        return M
    }), o.d(t, "rs", function() {
        return C
    }), o.d(t, "psr", function() {
        return D
    }), o.d(t, "domReplaceEl", function() {
        return T
    }), o.d(t, "domEL", function() {
        return k
    }), o.d(t, "domNS", function() {
        return L
    }), o.d(t, "domPS", function() {
        return x
    }), o.d(t, "domFC", function() {
        return A
    }), o.d(t, "domLC", function() {
        return B
    }), o.d(t, "domPN", function() {
        return I
    }), o.d(t, "domChildren", function() {
        return S
    }), o.d(t, "domInsertBefore", function() {
        return R
    }), o.d(t, "domInsertAfter", function() {
        return W
    }), o.d(t, "domByClass", function() {
        return U
    }), o.d(t, "domData", function() {
        return K
    }), o.d(t, "domChildIndex", function() {
        return N
    }), o.d(t, "domCA", function() {
        return F
    }), o.d(t, "domClosestSibling", function() {
        return H
    }), o.d(t, "matchesSelector", function() {
        return q
    }), o.d(t, "isHover", function() {
        return V
    }), o.d(t, "isAncestor", function() {
        return z
    }), o.d(t, "getScroll", function() {
        return G
    }), o.d(t, "domClosestPositioned", function() {
        return Y
    }), o.d(t, "domClosestOverflowHidden", function() {
        return X
    }), o.d(t, "show", function() {
        return Q
    }), o.d(t, "hide", function() {
        return $
    }), o.d(t, "isVisible", function() {
        return Z
    }), o.d(t, "clientHeight", function() {
        return J
    }), o.d(t, "getClientRectOffsetY", function() {
        return ee
    }), o.d(t, "toggle", function() {
        return te
    }), o.d(t, "boundingRectEnabled", function() {
        return oe
    }), o.d(t, "getXYRect", function() {
        return ne
    }), o.d(t, "getXY", function() {
        return ie
    }), o.d(t, "isWindow", function() {
        return re
    }), o.d(t, "getSize", function() {
        return ae
    }), o.d(t, "getW", function() {
        return se
    }), o.d(t, "getH", function() {
        return ce
    }), o.d(t, "hasClass", function() {
        return _e
    }), o.d(t, "addClass", function() {
        return le
    }), o.d(t, "addClassDelayed", function() {
        return de
    }), o.d(t, "removeClass", function() {
        return ue
    }), o.d(t, "removeClassDelayed", function() {
        return pe
    }), o.d(t, "toggleClass", function() {
        return fe
    }), o.d(t, "toggleClassDelayed", function() {
        return be
    }), o.d(t, "replaceClass", function() {
        return he
    }), o.d(t, "getStyle", function() {
        return we
    }), o.d(t, "setStyle", function() {
        return me
    }), o.d(t, "setStyleDelayed", function() {
        return ve
    }), o.d(t, "setPseudoStyle", function() {
        return Oe
    }), o.d(t, "data", function() {
        return ge
    }), o.d(t, "attr", function() {
        return Ee
    }), o.d(t, "removeAttr", function() {
        return je
    }), o.d(t, "removeData", function() {
        return ye
    }), o.d(t, "cleanElems", function() {
        return Pe
    }), o.d(t, "setTitle", function() {
        return Me
    }), o.d(t, "getZoom", function() {
        return Ce
    }), o.d(t, "val", function() {
        return De
    }), o.d(t, "elfocus", function() {
        return Te
    }), o.d(t, "traverseParent", function() {
        return ke
    }), o.d(t, "setDocumentTitle", function() {
        return xe
    }), o.d(t, "lockDocumentTitle", function() {
        return Ae
    }), o.d(t, "initDomScripts", function() {
        return Be
    });
    var n = o(80),
        i = o(177),
        r = o(58),
        a = o(9),
        s = function(e) {
            return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
        };

    function c(e, t) {
        return (t = s(t) || document).getElementsByTagName(e)
    }

    function _(e, t) {
        return (t = s(t) || document).querySelector && t.querySelector(e) || c(e, t)[0]
    }

    function l(e, t, o) {
        return t = s(t) || document, o = o || "*", e = ("." + e).replace(/\s+/gm, "."), Array.prototype.slice.call(t.querySelectorAll(o + e))
    }

    function d(e, t, o) {
        return t = s(t) || document, o = o || "*", t.querySelector && t.querySelector(o + ("." + e).replace(/\s+/gm, ".")) || l(e, t, o)[0]
    }

    function u(e, t, o) {
        if (!(t = s(t))) return null;
        for (; o !== t && (t = t.parentNode);)
            if (_e(t, e)) return t;
        return null
    }

    function p(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function f(e, t) {
        return (t || document).querySelector(e)
    }

    function b(e, t) {
        return _e(t, e) ? t : u(e, t)
    }

    function h(e, t) {
        return e = e.toUpperCase(), t.nodeType === Node.ELEMENT_NODE && t.tagName.toUpperCase() === e ? t : w(e, t)
    }

    function w(e, t) {
        if (!(t = s(t))) return null;
        for (e = e.toUpperCase(); t = t.parentNode;)
            if (t.tagName && t.tagName.toUpperCase() === e) return t;
        return null
    }

    function m(e, t, o) {
        var i = document.createElement(e);
        return t && Object(n.extend)(i, t), o && me(i, o), i
    }
    var v, O, g, E, j = (v = document, O = v.createDocumentFragment(), g = v.createElement("div"), E = v.createRange && v.createRange(), O.appendChild(g), E && E.selectNodeContents(g), E && E.createContextualFragment ? function(e) {
        return e ? E.createContextualFragment(e) : v.createDocumentFragment()
    } : function(e) {
        if (!e) return v.createDocumentFragment();
        g.innerHTML = e;
        for (var t = v.createDocumentFragment(); g.firstChild;) t.appendChild(g.firstChild);
        return t
    });

    function y(e) {
        return (e = s(e)) && e.parentNode && e.parentNode.removeChild(e), e
    }
    var P = function(e) {
            return A(m("div", {
                innerHTML: e
            }))
        },
        M = function(e) {
            return S(m("div", {
                innerHTML: e
            }))
        };

    function C(e, t) {
        return Object(n.each)(t, function(t, o) {
            e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === o ? "" : o).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function D(e) {
        return "https:" !== locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
    }

    function T(e, t) {
        return Object(n.isString)(t) && (t = P(t)), I(e).replaceChild(t, e), t
    }

    function k(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }
    var L = function(e) {
            return k((e || {}).nextSibling)
        },
        x = function(e) {
            return k((e || {}).previousSibling, 1)
        },
        A = function(e) {
            return k((e || {}).firstChild)
        },
        B = function(e) {
            return k((e || {}).lastChild, 1)
        },
        I = function(e) {
            return (e || {}).parentNode
        };

    function S(e) {
        for (var t = [], o = e.childNodes, n = 0; n < o.length; n++) o[n].tagName && t.push(o[n]);
        return t
    }

    function R(e, t) {
        var o = I(t);
        return o && o.insertBefore(e, t)
    }

    function W(e, t) {
        var o = I(t);
        return o && o.insertBefore(e, L(t))
    }

    function U(e, t) {
        return e ? d(t, e) : e
    }

    function K(e, t, o) {
        return e ? void 0 !== o ? (null === o ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, o), o) : e.getAttribute("data-" + t) : null
    }

    function N(e) {
        for (var t = 0; null != (e = x(e));) t++;
        return t
    }

    function F(e, t) {
        do {
            e = I(e)
        } while (e && !q(e, t));
        return e
    }

    function H(e, t, o) {
        for (var n = null; null === n && e;)(e = -1 === o ? x(e) : L(e)) && q(e, t) && (n = e);
        return n
    }

    function q(e, t) {
        return !(!(e = s(e)) || e === document) && (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function(e) {
            for (var t = (this.document || this.ownerDocument).querySelectorAll(e), o = t.length; --o >= 0 && t.item(o) !== this;);
            return o > -1
        }).call(e, t)
    }

    function V(e) {
        return q(e, ":hover")
    }

    function z(e, t) {
        var o = s(e);
        if (t = s(t), !e || !t) return !1;
        for (; o = o.parentNode;)
            if (o === t) return !0;
        return !1
    }

    function G() {
        var e = r.browser.msie6 ? s("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function Y(e, t) {
        for (var o = (t = t || {}).fromEl || I(e), i = t.positions || ["relative", "absolute", "fixed"]; o && o !== bodyNode;) {
            var r = we(o, "position");
            if (Object(n.inArray)(r, i) && (!t.noOverflow || "hidden" !== we(o, "overflow"))) break;
            o = I(o)
        }
        return o
    }

    function X(e, t) {
        for (var o = e = s(e), n = void 0, i = void 0, a = void 0, c = !1; o && o.tagName && o !== bodyNode;) {
            if (n = we(o, "position"), i = we(o, "overflow"), a = we(o, "transform"), t && r.browser.mozilla) {
                if ("page_wrap" != o.id && o !== e && "visible" !== i && ("static" === n ? !c || "relative" === c : "fixed" !== c)) break
            } else if (o !== e && "visible" !== i && ("static" === n ? !c || "relative" === c : "fixed" !== c)) break;
            "none" !== a ? c = void 0 : "static" !== n && "fixed" !== c && (c = n), o = I(o)
        }
        return o
    }

    function Q(e) {
        var t = arguments.length;
        if (t > 1)
            for (var o = 0; o < t; o++) Q(arguments[o]);
        else if ((e = s(e)) && e.style) {
            var n = e.olddisplay,
                i = e.tagName.toLowerCase(),
                a = "block";
            e.style.display = n || "", "none" === we(e, "display") && (a = _e(e, "inline") || _e(e, "_inline") ? "inline" : _e(e, "_inline_block") ? "inline-block" : "tr" !== i || r.browser.msie ? "table" !== i || r.browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = a)
        }
    }

    function $(e) {
        var t = arguments.length;
        if (t > 1)
            for (var o = 0; o < t; o++) $(arguments[o]);
        else if ((e = s(e)) && e.style) {
            var n = we(e, "display");
            e.olddisplay = "none" !== n ? n : "", e.style.display = "none"
        }
    }

    function Z(e) {
        return !(!(e = s(e)) || !e.style) && "none" !== we(e, "display")
    }

    function J() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function ee(e, t, o) {
        e = s(e), o = o || 0;
        var i = ie(e)[1],
            r = ae(e)[1],
            a = window,
            c = document.documentElement,
            _ = Math.max(Object(n.intval)(a.innerHeight), Object(n.intval)(c.clientHeight)),
            l = s("page_header_cont"),
            d = c.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            u = vk.staticheader ? Math.max(0, ae(l)[1] - d) : ae(l)[1];
        if (t) {
            if (i + r < d + u + o) return i + r - d - u - o;
            if (i > d + _ - o) return i - d - _ + o
        } else {
            if (i < d + u + o) return i - d - u - o;
            if (i + r > d + _ - o) return i + r - d - _ + o
        }
        return 0
    }

    function te(e, t) {
        return void 0 === t && (t = !Z(e)), t ? Q(e) : $(e), t
    }

    function oe(e) {
        return void 0 !== e.getBoundingClientRect
    }

    function ne(e, t) {
        var o = void 0;
        if (t && "inline" === we(e, "display")) {
            var n = e.getClientRects();
            o = n && n[0] || e.getBoundingClientRect()
        } else o = e.getBoundingClientRect();
        return o
    }

    function ie(e, t) {
        if (!(e = s(e))) return [0, 0];
        var o = e.ownerDocument,
            n = {
                top: 0,
                left: 0
            };
        if (!o) return [0, 0];
        var i = o.documentElement;
        oe(e) && (n = ne(e, !0));
        var r = o === o.window ? o : 9 === o.nodeType && (o.defaultView || o.parentWindow);
        return [n.left + (t ? 0 : r.pageXOffset || i.scrollLeft) - (i.clientLeft || 0), n.top + (t ? 0 : r.pageYOffset || i.scrollTop) - (i.clientTop || 0)]
    }

    function re(e) {
        return null != e && e === e.window
    }

    function ae(e, t, o) {
        e = s(e);
        var i = document.documentElement,
            r = [0, 0],
            a = void 0;
        if (t && "border-box" === we(e, "boxSizing") && (t = !1), e === document) r = [Math.max(i.clientWidth, bodyNode.scrollWidth, i.scrollWidth, bodyNode.offsetWidth, i.offsetWidth), Math.max(i.clientHeight, bodyNode.scrollHeight, i.scrollHeight, bodyNode.offsetHeight, i.offsetHeight)];
        else if (e) {
            var c = function() {
                r = oe(e) && (a = ne(e, o)) && void 0 !== a.width ? [a.width, a.height] : [e.offsetWidth, e.offsetHeight], t && Object(n.each)(r, function(t, o) {
                    var i = t ? ["Top", "Bottom"] : ["Left", "Right"];
                    Object(n.each)(i, function() {
                        r[t] -= parseFloat(we(e, "padding" + this)) || 0, r[t] -= parseFloat(we(e, "border" + this + "Width")) || 0
                    })
                })
            };
            if (Z(e)) c();
            else {
                var _ = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    l = {},
                    d = !1;
                e.style.cssText.indexOf("!important") > -1 && (d = e.style.cssText), Object(n.each)(_, function(t, o) {
                    l[t] = e.style[t], e.style[t] = o
                }), c(), Object(n.each)(_, function(t, o) {
                    e.style[t] = l[t]
                }), d && (e.style.cssText = d)
            }
        }
        return r
    }

    function se(e) {
        return ae(e)[0]
    }

    function ce(e) {
        return ae(e)[1]
    }

    function _e(e, t) {
        var o = s(e);
        return o && 1 === o.nodeType && (" " + o.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0
    }

    function le(e, t) {
        var o = s(e);
        o && !_e(o, t) && (o.className = (o.className ? o.className + " " : "") + t)
    }
    window.whitespaceRegex = /[\t\r\n\f]/g;
    var de = function(e, t, o) {
        o = Object(n.positive)(o), setTimeout(le.pbind(e, t), o)
    };

    function ue(e, t) {
        var o = s(e);
        o && (o.className = Object(n.trim)((o.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
    }
    var pe = function(e, t, o) {
        o = Object(n.positive)(o), setTimeout(ue.pbind(e, t), o)
    };

    function fe(e, t, o) {
        return void 0 === o && (o = !_e(e, t)), (o ? le : ue)(e, t), o
    }

    function be(e, t, o, i) {
        return i = Object(n.positive)(i), void 0 === o && (o = !_e(e, t)), (o ? de : pe)(e, t, i), o
    }

    function he(e, t, o) {
        ue(e, t), le(e, o)
    }

    function we(e, t, o) {
        if (e = s(e), Object(n.isArray)(t)) {
            var i = {};
            return Object(n.each)(t, function(t, o) {
                return i[o] = we(e, o)
            }), i
        }
        if (!e) return "";
        if (void 0 === o && (o = !0), !o && "opacity" === t && r.browser.msie) {
            var a = e.style.filter;
            return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!o && e.style && (e.style[t] || "height" === t)) return e.style[t];
        var c = void 0,
            _ = document.defaultView || window;
        if (_.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var l = _.getComputedStyle(e, null);
            l && (c = l.getPropertyValue(t))
        } else if (e.currentStyle) {
            if ("opacity" === t && r.browser.msie) {
                var d = e.currentStyle.filter;
                return d && d.indexOf("opacity=") >= 0 ? parseFloat(d.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var u = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            "auto" === (c = e.currentStyle[t] || e.currentStyle[u]) && (c = 0), c = (c + "").split(" "), Object(n.each)(c, function(t, o) {
                if (!/^\d+(px)?$/i.test(o) && /^\d/.test(o)) {
                    var n = e.style,
                        i = n.left,
                        r = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, n.left = o || 0, c[t] = n.pixelLeft + "px", n.left = i, e.runtimeStyle.left = r
                }
            }), c = c.join(" ")
        }
        if (o && ("width" === t || "height" === t)) {
            var p = ae(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            c = (Object(n.intval)(c) ? Math.max(Object(n.floatval)(c), p) : p) + "px"
        }
        return c
    }

    function me(e, t, o) {
        if (e = s(e))
            if (Object(n.isObject)(t)) Object(n.each)(t, function(t, o) {
                return me(e, t, o)
            });
            else if ("opacity" === t) r.browser.msie && ((o + "").length ? e.style.filter = 1 !== o ? "alpha(opacity=" + 100 * o + ")" : "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== o && (e.style.opacity = o);
        else try {
            var i = "number" == typeof o;
            i && /height|width/i.test(t) && (o = Math.abs(o)), o = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? o + "px" : o, e.style[t] !== o && (e.style[t] = o)
        } catch (e) {
            Object(a.debugLog)("setStyle error: ", [t, o], e)
        }
    }
    window.cssTransformProp = function() {
        var e = document.createElement("div");
        if (null == e.style.transform) {
            var t = ["Webkit", "Moz", "ms"];
            for (var o in t)
                if (void 0 !== e.style[t[o] + "Transform"]) return t[o] + "Transform"
        }
        return "transform"
    }();
    var ve = function(e, t, o) {
        return setTimeout(me.pbind(e, t, o), 0)
    };

    function Oe(e, t, o) {
        var i = ge(e, "pseudo-id");
        i || (ge(e, "pseudo-id", i = Object(n.irand)(1e8, 999999999)), le(e, "_pseudo_" + i));
        var r = t + "-style-" + i,
            a = s(r),
            c = "._pseudo_" + i + ":" + t + "{";
        a || (a = headNode.appendChild(m("style", {
            id: r,
            type: "text/css"
        }))), Object(n.each)(o, function(e, t) {
            c += e + ": " + t + " !important;"
        }), c += "}", a.sheet ? (a.sheet.cssRules.length && a.sheet.deleteRule(0), a.sheet.insertRule(c, 0)) : a.styleSheet && (a.styleSheet.cssText = c)
    }

    function ge(e, t, o) {
        if (!e) return !1;
        var n = e[vkExpand];
        return n || (n = e[vkExpand] = ++vkUUID), void 0 !== o && (vkCache[n] || (vkCache[n] = {}, window.__debugMode && (vkCache[n].__elem = e)), vkCache[n][t] = o), t ? vkCache[n] && vkCache[n][t] : n
    }

    function Ee(e, t, o) {
        return e = s(e), void 0 === o ? e.getAttribute(t) : (e.setAttribute(t, o), o)
    }

    function je(e) {
        for (var t = 0, o = arguments.length; t < o; ++t) {
            var n = arguments[t];
            if (void 0 !== e[n]) try {
                delete e[n]
            } catch (t) {
                try {
                    e.removeAttribute(n)
                } catch (e) {}
            }
        }
    }

    function ye(e, t) {
        var o = !!e && e[vkExpand];
        if (o)
            if (t) {
                if (vkCache[o]) {
                    delete vkCache[o][t], t = "";
                    var n = 0;
                    for (var r in vkCache[o])
                        if ("__elem" !== r) {
                            n++;
                            break
                        }
                    n || ye(e)
                }
            } else Object(i.removeEvent)(e), je(e, vkExpand), delete vkCache[o]
    }

    function Pe() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var o = s(e[t]);
            o && (ye(o), je(o, "btnevents"))
        }
    }

    function Me(e, t, o) {
        if ((e = s(e)) && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth || t.scrollHeight > t.clientHeight) e.setAttribute("title", o || e.innerText || e.textContent);
            else {
                var n = _("b", e);
                n && (n.scrollWidth > n.clientWidth || n.scrollHeight > n.clientHeight) ? e.setAttribute("title", o || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function Ce() {
        var e = s("zoom_test_1") || document.body.appendChild(m("div", {
            id: "zoom_test_1"
        }, {
            left: "10%",
            position: "absolute",
            visibility: "hidden"
        }));
        return (s("zoom_test_2") || document.body.appendChild(m("div", {
            id: "zoom_test_2"
        }, {
            left: e.offsetLeft + "px",
            position: "absolute",
            visibility: "hidden"
        }))).offsetLeft / e.offsetLeft
    }

    function De(e, t, o) {
        if (e = s(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !o && e.phonblur && e.phonblur()) : "INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !o && Object(i.triggerEvent)(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value : e.innerHTML) || ""
    }

    function Te(e, t, o) {
        e = s(e);
        try {
            if (e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== o && !1 !== o || (o = t), e.setSelectionRange) e.setSelectionRange(t, o);
            else if (window.getSelection && document.createRange) {
                var n = document.createRange();
                n.selectNodeContents(e), n.collapse(!1);
                var i = window.getSelection();
                i.removeAllRanges(), i.addRange(n)
            }
        } catch (e) {}
    }

    function ke(e, t, o) {
        for (e = s(e), o = o || 999; e && !t(e);) {
            if (0 === --o) return !1;
            try {
                if ((e = I(e)) === document) break
            } catch (t) {
                e = !1
            }
        }
        return e
    }
    var Le = !1;

    function xe(e) {
        if (!Le) return window.document.title = Object(n.replaceEntities)(e)
    }

    function Ae(e) {
        Le = e, e && window.cur && window.cur.destroy.push(function() {
            Ae(!1)
        })
    }

    function Be() {
        window.vkExpand = window.vkExpand || "VK" + Object(n.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}
    }
}, , function(e, t, o) {
    var n = o(158),
        i = o(17);
    e.exports = Object.keys || function(e) {
        return n(e, i)
    }
}, , function(e, t, o) {
    var n = o(3),
        i = o(88),
        r = o(33);
    e.exports = function(e) {
        return function(t, o, a) {
            var s, c = n(t),
                _ = i(c.length),
                l = r(a, _);
            if (e && o != o) {
                for (; _ > l;)
                    if ((s = c[l++]) != s) return !0
            } else
                for (; _ > l; l++)
                    if ((e || l in c) && c[l] === o) return e || l;
            return !e && -1
        }
    }
}, function(e, t, o) {
    var n = o(27),
        i = o(146)("iterator"),
        r = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (n.Array === e || r[i] === e)
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "curBox", function() {
        return _
    }), o.d(t, "initBoxQueue", function() {
        return l
    }), o.d(t, "boxRefreshCoords", function() {
        return d
    }), o.d(t, "showDoneBox", function() {
        return u
    }), o.d(t, "getBoxQueue", function() {
        return p
    });
    var n = o(177),
        i = o(80),
        r = o(89),
        a = o(113),
        s = o(58),
        c = {
            hideAll: function(e, t) {
                if (e)
                    for (; c.count();) c.hideLast();
                else {
                    if (c.count()) {
                        var o = _message_boxes[c._boxes.pop()];
                        o._in_queue = !1, o._hide(!1, !1, t)
                    }
                    for (; c.count();) {
                        _message_boxes[c._boxes.pop()]._in_queue = !1
                    }
                }
            },
            hideLast: function(e, t) {
                if (c.count()) {
                    var o = window._message_boxes[c._boxes[c.count() - 1]];
                    if (!0 === e && (o.changed || c.skip || t && t.target && t.target.tagName && "input" !== t.target.tagName.toLowerCase() && cur.__mdEvent && t.target !== cur.__mdEvent.target)) return void(c.skip = !1);
                    o.hide()
                }
                if (t && "click" === t.type) return Object(n.cancelEvent)(t)
            },
            hideBGClick: function(e) {
                e && e.target && /^box_layer/.test(e.target.id) && c.hideLast()
            },
            count: function() {
                return c._boxes.length
            },
            _show: function(e) {
                var t = _message_boxes[e];
                if (t && !t._in_queue) {
                    c.count() ? _message_boxes[c._boxes[c.count() - 1]]._hide(!0, !0) : window.tooltips && tooltips.hideAll(), t._in_queue = !0;
                    var o = !!c.count();
                    c.curBox = e, t._show(o || c.currHiding, o), c._boxes.push(e)
                }
            },
            _hide: function(e) {
                var t = _message_boxes[e];
                if (t && t._in_queue && c._boxes[c.count() - 1] === e && t.isVisible() && (t._in_queue = !1, c._boxes.pop(), t._hide(!!c.count()), c.count())) {
                    var o = c._boxes[c.count() - 1];
                    c.curBox = o, _message_boxes[o]._show(!0, !0, !0)
                }
            },
            _boxes: [],
            curBox: 0
        };

    function _() {
        var e = window._message_boxes[c.curBox];
        return e && e.isVisible() ? e : null
    }

    function l() {
        c.hideLastCheck = c.hideLast.pbind(!0), window._message_box_guid = 0, window._message_boxes = []
    }

    function d(e) {
        var t = window.innerHeight || document.documentElement.clientHeight || boxLayerBG.offsetHeight,
            o = s.browser.mobile ? Object(i.intval)(window.pageYOffset) : 0,
            n = Object(r.getSize)(e);
        e.style.marginTop = Math.max(10, o + (t - n[1]) / 3) + "px"
    }

    function u(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = (t.w || 380) + 20,
            c = t.w ? ' style="width: ' + t.w + 'px;"' : "",
            _ = bodyNode.offsetWidth,
            l = Object(r.ce)("div", {
                className: "top_result_baloon_wrap fixed " + (t.className || ""),
                innerHTML: '<div class="top_result_baloon"' + c + ">" + e + "</div>"
            }, {
                left: (_ - o) / 2
            });
        t.parentEl ? Object(r.geByClass1)(t.parentEl).appendChild(l) : bodyNode.insertBefore(l, pageNode);
        var d = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
            u = s.browser.mobile ? Object(i.intval)(window.pageYOffset) : 0,
            p = Object(r.getSize)(l);
        l.style.top = Math.max(10, u + (d - p[1]) / 3) + "px";
        var f = t.out || 2e3,
            b = new Date,
            h = function e() {
                f < 0 || (window.doneBoxTO = setTimeout(function() {
                    !t.permit || t.permit() ? Object(a.fadeOut)(l.firstChild, 500, function() {
                        Object(r.re)(l), t.callback && t.callback()
                    }) : e()
                }, f))
            };
        return Object(n.addEvent)(l, "mouseenter", function() {
            clearTimeout(window.doneBoxTO), f -= new Date - b
        }), Object(n.addEvent)(l, "mouseleave", function() {
            b = new Date, h()
        }), h(), l
    }

    function p() {
        return c
    }
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, , function(e, t) {
    e.exports = function(e, t, o, n) {
        if (!(e instanceof t) || void 0 !== n && n in e) throw TypeError(o + ": incorrect invocation!");
        return e
    }
}, function(e, t, o) {
    var n = o(19),
        i = o(111),
        r = o(35),
        a = Object.defineProperty;
    t.f = o(83) ? Object.defineProperty : function(e, t, o) {
        if (n(e), t = r(t, !0), n(o), i) try {
            return a(e, t, o)
        } catch (e) {}
        if ("get" in o || "set" in o) throw TypeError("Accessors not supported!");
        return "value" in o && (e[t] = o.value), e
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "initLongView", function() {
        return z
    });
    var n = o(89),
        i = o(177),
        r = o(129),
        a = o(61),
        s = o(6),
        c = o(80),
        _ = .5,
        l = .25,
        d = 300,
        u = 1e3,
        p = 3e5,
        f = 2500,
        b = 5e3,
        h = 6e3,
        w = 2e4,
        m = 1e3,
        v = 36e4,
        O = "_longViewType",
        g = "_longViewIdled",
        E = "_longViewModule",
        j = "_longViewStarted",
        y = "_longViewProcessed",
        P = "_longViewCached",
        M = "_longViewHeight",
        C = "_longViewTop",
        D = "_longViewBottom",
        T = "REGULAR",
        k = "AUTOPLAY_AD",
        L = "LongView.viewed",
        x = "LongView.idled",
        A = vk.longViewTestGroup,
        B = [],
        I = [],
        S = [],
        R = Date.now(),
        W = 0,
        U = 0,
        K = !1,
        N = null,
        F = null,
        H = null,
        q = null,
        V = {};

    function z() {
        A ? (Object(i.addEvent)(window, "blur", Z), Object(i.addEvent)(window, "focus", J), onDomReady(function() {
            return setTimeout(G, 500)
        }), window.LongView = {
            register: X,
            onScroll: Object(a.throttle)(Q, 50),
            onBeforePageChange: ee,
            clearElemsCache: Y,
            _debug: function() {
                return {
                    started: I,
                    tracking: B,
                    viewedData: S,
                    viewIndexes: V,
                    blindTop: W,
                    blindBottom: U
                }
            }
        }) : window.LongView = {
            register: function() {},
            onScroll: function() {},
            onBeforePageChange: function() {},
            clearElemsCache: function() {}
        }
    }

    function G() {
        var e = ue();
        e.length && (ce(e), pe())
    }

    function Y() {
        B.forEach(function(e) {
            e[P] = !1
        })
    }

    function X(e, t) {
        "im" === t && !e[O] && function(e) {
            if (Object(n.hasClass)(e, "im-mess--post")) return !0;
            var t = e && Object(n.domFC)(e);
            return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(n.hasClass)(e, "no_posts"))
        }(e) && (e[O] = function(e) {
            var t = e && Object(n.domFC)(e);
            return t && t.hasAttribute("data-ad-video-autoplay") ? k : T
        }(e), e[E] = t, B.push(e))
    }

    function Q(e, t) {
        var o = Q;
        ! function(e, t) {
            var o = [];
            B.forEach(function(n) {
                me(n) ? o.push(n) : ! function(e, t, o) {
                    return !e[j] && be(e, _, t, o)
                }(n, e, t) ? function(e, t, o) {
                    return e[j] && !be(e, l, t, o)
                }(n, e, t) && (n[g] ? delete n[g] : (ve(I, n), S = S.concat(we(n))), delete n[j]) : (n[j] = Date.now(), I.push(n))
            }), o.forEach(function(e) {
                ve(B, e)
            })
        }(e || Object(s.scrollGetY)(), t || window.innerHeight), K ? (clearTimeout(o.timer), o.timer = setTimeout($, 150)) : (K = !0, oe(), function() {
            if ("/im" === location.pathname) {
                var e = Object(n.geByClass1)("im-page--chat-header"),
                    t = Object(n.geByClass1)("im-page--chat-input");
                W = e.getBoundingClientRect().top + e.offsetHeight, U = window.innerHeight - t.getBoundingClientRect().top
            } else W = Object(n.ge)("page_header").offsetHeight, U = 0
        }())
    }

    function $() {
        oe(), te(), K = !1
    }

    function Z() {
        oe(), se()
    }

    function J() {
        S = [], I.forEach(function(e) {
            return e[j] = Date.now()
        }), _e(null), le(null), te()
    }

    function ee() {
        oe(), se(), S = [], I = [], _e(null), le(null)
    }

    function te() {
        N = setTimeout(ne, f), F = setTimeout(ie, b), H = setTimeout(re, h), q = setTimeout(ae, w)
    }

    function oe() {
        clearTimeout(N), clearTimeout(F), clearTimeout(H), clearTimeout(q)
    }

    function ne() {
        S.length && _e(S)
    }

    function ie() {
        ce(S), S = [], _e(null)
    }

    function re() {
        I.length && (le(he(I, !0, !0)), H = setTimeout(re, m))
    }

    function ae() {
        clearTimeout(H), ce(he(I)), I.forEach(function(e) {
            return e[g] = !0
        }), I = [], le(null)
    }

    function se() {
        ce(S.concat(he(I)))
    }

    function ce(e) {
        e && e.length && ajax.post("/al_page.php", {
            act: "seen",
            data: function(e) {
                var t = {};
                e.forEach(function(e) {
                    var o = e.ownerId,
                        n = "ad" === o ? "" : ":" + e.duration + ":" + e.index;
                    t[o] || (t[o] = []), t[o].push(e.module + e.postId + n + (e.sessionId ? ":" + e.sessionId : "") + (e.q ? ":" + e.q : "") + ":" + e.viewIndex)
                });
                var o = [];
                return Object(c.each)(t, function(e, t) {
                    return o.push(e + "_" + t.join(","))
                }), o.join(";")
            }(e),
            long_view: 1
        })
    }

    function _e(e) {
        de(L, e)
    }

    function le(e) {
        de(x, e)
    }

    function de(e, t) {
        var o = r.ls.get(e) || {};
        t ? o[R] = t : delete o[R], r.ls.set(e, o)
    }

    function ue() {
        var e = ue,
            t = [],
            o = r.ls.get(L) || {},
            n = r.ls.get(x) || {};
        return e.iterator || (e.iterator = function(e) {
            return function(o) {
                fe(o) && (t = t.concat(e[o]))
            }
        }), Object.keys(o).forEach(e.iterator(o)), Object.keys(n).forEach(e.iterator(n)), t
    }

    function pe() {
        var e = pe,
            t = r.ls.get(L) || {},
            o = r.ls.get(x) || {};
        e.iterator || (e.iterator = function(e) {
            return function(t) {
                fe(t) && delete e[t]
            }
        }), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), r.ls.set(L, t), r.ls.set(x, o)
    }

    function fe(e) {
        var t = Number(e);
        return t !== R && Date.now() - t >= v
    }

    function be(e, t, o, n) {
        if (!e) return !1;
        e[P] || (e[P] = !0, e[M] = e.offsetHeight, e[C] = o + e.getBoundingClientRect().top, e[D] = e[C] + e[M]);
        var i = n - W - U,
            r = o + W,
            a = o + n - U,
            s = e[M],
            c = e[C],
            _ = e[D];
        return (_ > r && c < a ? Math.min(a, _) - Math.max(r, c) : 0) >= Math.min(i * t, s * t)
    }

    function he(e, t, o) {
        return e.map(function(e) {
            return we(e, t, o)
        })
    }

    function we(e, t, o) {
        if (me(e)) return [];
        var i = Math.min(p, Date.now() - e[j]);
        if (e[O] === T && i < d || e[O] === k && i < u) return [];
        o || (e[y] = !0);
        var r, a = function(e) {
                var t = e[E];
                if ("im" === t) {
                    var o = Object(n.attr)(e, "data-post-id"),
                        i = Object(n.attr)(e, "data-copy"),
                        r = {
                            index: -1,
                            module: "im"
                        };
                    return o && (r[o] = -1), i && (r[i] = -1), r
                }
                try {
                    return window[t].postsGetRaws(e)
                } catch (t) {
                    return console.error("Unable to extract data from elem", e), []
                }
            }(e),
            s = {
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
            }["feed_other" === (r = a.module) ? "feed_" + cur.section : r] || "u",
            c = cur.feed_session_id || "na",
            _ = [];
        for (var l in a)
            if ("index" !== l && "module" !== l && "q" !== l) {
                var f = l.split("_"),
                    b = f[0],
                    h = f[1];
                "ads" === b && (h = f[3]), /^post\d+$/.test(b) && (b = f[1], h = f[2]);
                var w = void 0;
                t || (V[w = b + "_" + h] || (V[w] = 0), V[w]++), _.push("ad" === b ? {
                    ownerId: "ad",
                    postId: h,
                    module: s,
                    viewIndex: V[w]
                } : "ads" === b ? {
                    ownerId: "ads",
                    postId: h,
                    module: s,
                    index: a.index,
                    duration: i,
                    sessionId: c,
                    viewIndex: V[w]
                } : {
                    ownerId: b,
                    postId: (1 === a[l] ? "" : "-") + h,
                    module: s,
                    index: a.index,
                    duration: i,
                    sessionId: c,
                    q: a.q || null,
                    viewIndex: V[w]
                })
            }
        return _
    }

    function me(e) {
        return "page_view" === A && e[y] || !document.body.contains(e)
    }

    function ve(e, t) {
        var o = e.indexOf(t);
        o >= 0 && e.splice(o, 1)
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "menuSettings", function() {
        return menuSettings
    }), __webpack_require__.d(__webpack_exports__, "showWriteMessageBox", function() {
        return showWriteMessageBox
    }), __webpack_require__.d(__webpack_exports__, "giftsBox", function() {
        return giftsBox
    }), __webpack_require__.d(__webpack_exports__, "moneyTransferBox", function() {
        return moneyTransferBox
    }), __webpack_require__.d(__webpack_exports__, "reportAd", function() {
        return reportAd
    }), __webpack_require__.d(__webpack_exports__, "mobilePromo", function() {
        return mobilePromo
    }), __webpack_require__.d(__webpack_exports__, "showAudioClaimWarning", function() {
        return showAudioClaimWarning
    }), __webpack_require__.d(__webpack_exports__, "sureDeleteAll", function() {
        return sureDeleteAll
    });
    var _message_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(168),
        _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25),
        _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89),
        _dom_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(177),
        _lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(153),
        _debug_tools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9),
        _box_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(95);

    function menuSettings(e) {
        return Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.showTabbedBox)("al_settings.php", {
            act: "menu_box",
            type: e
        })
    }

    function showWriteMessageBox(e, t) {
        cur.onFriendMessage && cur.onFriendMessage(), stManager.add(["page.js", "wide_dd.js"]);
        var o = Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.showBox)("al_im.php", {
            act: "a_write_box",
            to: t
        }, {
            stat: ["writebox.js", "writebox.css", "wide_dd.css", "page.css", jsc("web/emoji.js"), "notifier.css"],
            cache: 1
        }, e);
        return o && Object(_dom_events__WEBPACK_IMPORTED_MODULE_3__.cancelEvent)(e), window.WriteBox && WriteBox.extractEmoji(), !o
    }

    function giftsBox(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : !Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.showBox)("al_gifts.php", {
            act: "box",
            tab: o || "received",
            mid: e
        }, {
            cache: 1,
            stat: ["gifts.css", "gifts.js"]
        }, t)
    }

    function moneyTransferBox(e, t, o, n, i, r, a) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (i) {
            if (!a) {
                var s = void 0,
                    c = void 0;
                return 2 === i ? (s = cur.lang && cur.lang.mail_money_transfer_cancel_confirm || Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("mail_money_transfer_cancel_confirm"), c = cur.lang && cur.lang.mail_money_transfer_cancel_btn || Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("mail_money_transfer_cancel_btn")) : (s = cur.lang && cur.lang.mail_money_transfer_decline_confirm || Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("news_fb_money_transfer_decline_confirm"), c = cur.lang && cur.lang.mail_money_transfer_decline_btn || Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("news_fb_money_transfer_decline_btn")), void(cur.confirmBox = Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.showFastBox)(Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_action_confirmation"), s, c, moneyTransferBox.pbind(e, t, o, n, i, !1, 1), Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_cancel")))
            }
            var _ = Object(_dom__WEBPACK_IMPORTED_MODULE_2__.hasClass)(Object(_dom__WEBPACK_IMPORTED_MODULE_2__.domPN)(n), "wall_postlink_preview_btn"),
                l = Object(_dom__WEBPACK_IMPORTED_MODULE_2__.geByClass1)("flat_button", Object(_dom__WEBPACK_IMPORTED_MODULE_2__.domPN)(n));
            return 2 !== a && (Object(_ui__WEBPACK_IMPORTED_MODULE_1__.disableButton)(l, !0), _ ? (Object(_dom__WEBPACK_IMPORTED_MODULE_2__.addClass)(n.firstChild, "round_spinner"), Object(_dom__WEBPACK_IMPORTED_MODULE_2__.removeClass)(n.firstChild, "button")) : Object(_ui__WEBPACK_IMPORTED_MODULE_1__.lockButton)(n), cur.confirmBox && cur.confirmBox.hide()), void ajax.post("al_payments.php?act=a_cancel_money_transfer", {
                tx_id: e,
                hash: t,
                from: _ ? "snippet" : ""
            }, {
                onDone: function(r, a, s) {
                    0 !== r ? (_ ? (Object(_dom__WEBPACK_IMPORTED_MODULE_2__.re)(n), Object(_dom__WEBPACK_IMPORTED_MODULE_2__.hasClass)(l, "secondary") || Object(_dom__WEBPACK_IMPORTED_MODULE_2__.domReplaceEl)(l, s)) : Object(_dom__WEBPACK_IMPORTED_MODULE_2__.re)(Object(_dom__WEBPACK_IMPORTED_MODULE_2__.domPN)(n)), Object(_box_utils__WEBPACK_IMPORTED_MODULE_6__.showDoneBox)(a), window.TopNotifier.invalidate()) : setTimeout(moneyTransferBox.pbind(e, t, o, n, i, !1, 2), 2e3)
                },
                onFail: function(e) {
                    return Object(_ui__WEBPACK_IMPORTED_MODULE_1__.disableButton)(l, !1), _ ? (Object(_dom__WEBPACK_IMPORTED_MODULE_2__.addClass)(n.firstChild, "button"), Object(_dom__WEBPACK_IMPORTED_MODULE_2__.removeClass)(n.firstChild, "round_spinner")) : Object(_ui__WEBPACK_IMPORTED_MODULE_1__.unlockButton)(n), setTimeout(Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.showFastBox)(Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_error"), e).hide, 2e3), !0
                }
            })
        }
        var d = void 0;
        return d = r ? {
            act: "money_transfer_box",
            request_id: e,
            request: r,
            hash: t
        } : {
            act: "accept_money_transfer_box",
            tx_id: e,
            hash: t
        }, cur.acceptMoneyBtn = n, !Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.showBox)("al_payments.php", d, {
            stat: ["payments.css", "payments.js"],
            onFail: function(e) {
                return setTimeout(Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.showFastBox)(Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_error"), e).hide, 2e3), !0
            }
        }, o)
    }

    function reportAd(e) {
        Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.showBox)("/reports.php?act=a_report_ad_box", {
            ad_id: e
        }, {
            params: {
                width: 370
            },
            stat: ["ui_controls.js", "ui_controls.css"]
        })
    }
    var mobilePromo = _message_box__WEBPACK_IMPORTED_MODULE_0__.showBox.pbind("al_login.php", {
        act: "mobile",
        box: 1
    });

    function showAudioClaimWarning(e, t, o) {
        var n = e.id,
            i = e.ownerId,
            r = e.title,
            a = t.id,
            s = t.reason,
            c = t.original,
            _ = {
                width: 470
            },
            l = void 0,
            d = void 0;
        if (e.restrictionStatus) return AudioUtils.showAudioRestriction(e);
        "geo" === s ? (l = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("audio_claimed_geo"), d = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("audio_claim_warning_title")) : "site_rules_violation" === s ? (l = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("audio_site_rules_violation_warning"), d = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("audio_site_rules_violation_header")) : "replace" === s ? (l = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("audio_claimed_replacement_available"), d = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("audio_claim_warning_title")) : "subscription" === s ? (_.hideButtons = !0, _.bodyStyle = "padding: 0; border-radius: 4px;", _.width = 450, d = !1, l = '\n      <div class="audio_claim_popup">\n        <div class="audio_claim_popup__title">' + Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_audio_only_with_subscription_title") + '</div>\n        <div class="audio_claim_popup__text">' + Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_audio_only_with_subscription_text") + '</div>\n        <div class="audio_claim_popup__close" onclick="curBox().hide()"></div>\n        <button class="flat_button round_button" onclick="getAudioPlayer().showSubscriptionPopup()">' + Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_audio_only_with_subscription_btn") + "</button>\n      </div>") : (l = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("audio_claim_warning"), d = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("audio_claim_warning_title")), _.title = d;
        var u = [_, l = (l = (l = l.replace(/\{audio\}/g, "<b>" + r + "</b>")).replace(/\{objection_link\}/g, '<a href="/help?act=cc_objection&claim=' + a + "&content=audio" + i + "_" + n + '">' + Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("audio_claim_objection") + "</a>")).replace(/\{delete_link\}/g, '<a onclick="deleteAudioOnClaim(' + i + ", " + n + '); return false;">' + Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("audio_claim_delete") + "</a>")],
            p = null;
        if (o && c) {
            var f = AudioUtils.drawAudio(c, "no_extra");
            u[1] = l.replace(/\{original\}/g, c[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] + " - " + c[AudioUtils.AUDIO_ITEM_INDEX_TITLE]) + "<br/><br/>" + f, u.push(Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("audio_replace_with_original"), function() {
                Object(_ui__WEBPACK_IMPORTED_MODULE_1__.lockButton)(p.btns.ok[0]), o(function() {
                    return p.hide()
                })
            }), _.textControls = '<a onclick="deleteAudioOnClaim(' + i + ", " + n + '); return false;">' + Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("audio_claim_delete_capital") + "</a>"
        }
        cur.claimWarning = p = _message_box__WEBPACK_IMPORTED_MODULE_0__.showFastBox.apply(null, u)
    }

    function sureDeleteAll(title, text, where, objectId, toId, fromId, hash, event) {
        if (!Object(_dom_events__WEBPACK_IMPORTED_MODULE_3__.checkEvent)(event)) {
            var box = Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.showFastBox)({
                title: title
            }, text, Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_delete"), function(btn) {
                ajax.post("/delete_all.php", {
                    act: where,
                    object_id: objectId,
                    to_id: toId,
                    from_id: fromId,
                    hash: hash,
                    loc: nav.objLoc[0]
                }, {
                    onDone: function onDone(res) {
                        if (__debugMode) eval(res);
                        else try {
                            eval(res)
                        } catch (e) {
                            Object(_debug_tools__WEBPACK_IMPORTED_MODULE_5__.logEvalError)(e, res)
                        }
                        box.hide()
                    },
                    showProgress: _ui__WEBPACK_IMPORTED_MODULE_1__.lockButton.pbind(btn),
                    hideProgress: _ui__WEBPACK_IMPORTED_MODULE_1__.unlockButton.pbind(btn)
                })
            }, Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_cancel"));
            return !1
        }
    }
}, function(e, t, o) {
    "use strict";
    var n = o(143),
        i = o(48),
        r = o(121),
        a = o(5),
        s = o(161),
        c = o(188),
        _ = o(98),
        l = o(134),
        d = o(131),
        u = o(74),
        p = o(166),
        f = o(178);
    e.exports = function(e, t, o, b, h, w) {
        var m = n[e],
            v = m,
            O = h ? "set" : "add",
            g = v && v.prototype,
            E = {},
            j = function(e) {
                var t = g[e];
                r(g, e, "delete" == e ? function(e) {
                    return !(w && !l(e)) && t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return !(w && !l(e)) && t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return w && !l(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, o) {
                    return t.call(this, 0 === e ? 0 : e, o), this
                })
            };
        if ("function" == typeof v && (w || g.forEach && !d(function() {
                (new v).entries().next()
            }))) {
            var y = new v,
                P = y[O](w ? {} : -0, 1) != y,
                M = d(function() {
                    y.has(1)
                }),
                C = u(function(e) {
                    new v(e)
                }),
                D = !w && d(function() {
                    for (var e = new v, t = 5; t--;) e[O](t, t);
                    return !e.has(-0)
                });
            C || ((v = t(function(t, o) {
                _(t, v, e);
                var n = f(new m, t, v);
                return void 0 != o && c(o, h, n[O], n), n
            })).prototype = g, g.constructor = v), (M || D) && (j("delete"), j("has"), h && j("get")), (D || P) && j(O), w && g.clear && delete g.clear
        } else v = b.getConstructor(t, e, h, O), a(v.prototype, o), s.NEED = !0;
        return p(v, e), E[e] = v, i(i.G + i.W + i.F * (v != m), E), w || b.setStrong(v, e, h), v
    }
}, , function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "initFlashUtils", function() {
        return _
    }), o.d(t, "toggleFlash", function() {
        return d
    }), o.d(t, "renderFlash", function() {
        return u
    });
    var n = o(80),
        i = o(89),
        r = o(177),
        a = o(187),
        s = o(58),
        c = o(2);

    function _() {
        var e = "ShockwaveFlash.ShockwaveFlash",
            t = [0, 0, 0],
            o = "embed",
            i = 'type="application/x-shockwave-flash" ',
            r = function(e) {
                return e.toString().replace("&", "&amp;").replace('"', "&quot;")
            };
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            var c = navigator.plugins["Shockwave Flash"];
            if (c && c.description)
                for (var _ = c.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."), l = 0; l < 3; ++l) t[l] = _[l] || 0
        } else {
            if (_ua.indexOf("Windows CE") >= 0)
                for (var d = !0, u = 6; d;) try {
                    ++u, d = new ActiveXObject(e + "." + u), t[0] = u
                } catch (e) {} else try {
                    t = new ActiveXObject(e + ".7").GetVariable("$version").split(" ")[1].split(",")
                } catch (e) {}
            o = "object", i = 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
        }
        s.browser.flashwrap = "embed" === o ? function(e, t) {
            t = Object(n.extend)({
                id: e.id,
                name: e.id,
                width: e.width,
                height: e.height,
                style: e.style,
                preventhide: e.preventhide
            }, t), s.browser.flash >= e.version ? t.src = e.url : t.src = e.express;
            var o = [];
            for (var a in t)
                if (t.hasOwnProperty(a)) {
                    var c = t[a];
                    void 0 !== c && null !== c && o.push(a + '="' + r(c) + '" ')
                }
            return "<embed " + (i + o.join("")) + "/>"
        } : function(e, t) {
            s.browser.flash >= e.version ? t.movie = e.url : t.movie = e.express;
            var o = {
                    id: e.id,
                    width: e.width,
                    height: e.height,
                    style: e.style,
                    preventhide: e.preventhide
                },
                n = [];
            for (var a in o)
                if (o.hasOwnProperty(a)) {
                    var c = o[a];
                    void 0 !== c && null !== c && n.push(a + '="' + r(c) + '" ')
                }
            var _ = [];
            for (var l in t)
                if (t.hasOwnProperty(l)) {
                    var d = t[l];
                    void 0 !== d && null !== d && _.push('<param name="' + l + '" value="' + r(d) + '" />')
                }
            return "<object " + (i + n.join("")) + ">" + _.join("") + "</object>"
        }, t[0] < 7 && (t = [0, 0, 0]), s.browser.flash = Object(n.intval)(t[0]), s.browser.flashfull = {
            major: s.browser.flash,
            minor: Object(n.intval)(t[1]),
            rev: Object(n.intval)(t[2])
        }, Object(a.setCookie)("remixflash", Object(n.intval)(t[0]) + "." + Object(n.intval)(t[1]) + "." + Object(n.intval)(t[2]), 30)
    }
    var l = 0;

    function d(e, t) {
        if (clearTimeout(l), t > 0) l = setTimeout(function() {
            return d(e, 0)
        }, t);
        else {
            var o = e ? "visible" : "hidden";
            Object(r.triggerEvent)(document, e ? "unblock" : "block");
            var a = function(t, n) {
                n.getAttribute("preventhide") || "internal/link" === n.getAttribute("type") || ("flash_app" === n.id && s.browser.msie ? e ? Object(i.setStyle)(n, {
                    position: "static",
                    top: 0
                }) : Object(i.setStyle)(n, {
                    position: "absolute",
                    top: "-5000px"
                }) : n.style.visibility = o)
            };
            Object(n.each)(Object(i.geByTag)("embed"), a), Object(n.each)(Object(i.geByTag)("object"), a)
        }
    }

    function u(e, t, o, r) {
        if (!t.url || !t.id) return !1;
        var a = (t = Object(n.extend)({
            version: 9,
            width: 1,
            height: 1
        }, t)).url;
        return stVersions[a] || (stVersions[a] = ""), __debugMode && stVersions[a] < 1e6 && (stVersions[a] += Object(n.irand)(1e6, 2e6)), stVersions[a] && (t.url += (-1 === t.url.indexOf("?") ? "?" : "&") + "_stV=" + stVersions[a]), o = Object(n.extend)({
            quality: "high",
            flashvars: Object(c.ajx2q)(r)
        }, o), !(s.browser.flash < t.version) && (Object(i.ge)(e).innerHTML = s.browser.flashwrap(t, o), !0)
    }
}, function(e, t, o) {
    var n = o(156);
    e.exports = function(e) {
        return Object(n(e))
    }
}, , , , function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, , function(e, t, o) {
    e.exports = !o(83) && !o(131)(function() {
        return 7 != Object.defineProperty(o(60)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t) {
    var o = Math.ceil,
        n = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? n : o)(e)
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "animate", function() {
        return s
    }), o.d(t, "cubicBezier", function() {
        return c
    }), o.d(t, "fadeTo", function() {
        return _
    }), o.d(t, "FxBase", function() {
        return l
    }), o.d(t, "Fx", function() {
        return d
    }), o.d(t, "genFx", function() {
        return u
    }), o.d(t, "slideDown", function() {
        return p
    }), o.d(t, "slideUp", function() {
        return f
    }), o.d(t, "slideToggle", function() {
        return b
    }), o.d(t, "fadeIn", function() {
        return h
    }), o.d(t, "fadeOut", function() {
        return w
    }), o.d(t, "fadeToggle", function() {
        return m
    }), o.d(t, "getRGB", function() {
        return v
    }), o.d(t, "getColor", function() {
        return O
    }), o.d(t, "animateCount", function() {
        return g
    });
    var n = o(80),
        i = o(89),
        r = o(58),
        a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };

    function s(e, t, o, s) {
        if (e = Object(i.ge)(e)) {
            var c = Object(n.isFunction)(s) ? s : function() {},
                _ = Object(n.extend)({}, "object" === (void 0 === o ? "undefined" : a(o)) ? o : {
                    duration: o,
                    onComplete: c
                }),
                d = {},
                u = {},
                p = Object(i.isVisible)(e),
                f = void 0;
            _.orig = {}, (t = Object(n.clone)(t)).discrete && (_.discrete = 1, delete t.discrete), r.browser.iphone && (_.duration = 0);
            var b = Object(i.data)(e, "tween"),
                h = p ? "hide" : "show";
            for (var w in b && b.isTweening && (_.orig = Object(n.extend)(_.orig, b.options.orig), b.stop(!1), b.options.show ? h = "hide" : b.options.hide && (h = "show")), t)
                if (t.hasOwnProperty(w)) {
                    if (!b && ("show" === t[w] && p || "hide" === t[w] && !p)) return _.onComplete.call(this, e);
                    if ("height" !== w && "width" !== w || !e.style || (t.overflow || (void 0 === _.orig.overflow && (_.orig.overflow = Object(i.getStyle)(e, "overflow")), e.style.overflow = "hidden"), Object(i.hasClass)(e, "inl_bl") || "TD" === e.tagName || (e.style.display = "block")), /show|hide|toggle/.test(t[w]))
                        if ("toggle" === t[w] && (t[w] = h), "show" === t[w]) {
                            f = 0, _.show = !0, void 0 === _.orig[w] && (_.orig[w] = Object(i.getStyle)(e, w, !1) || "", Object(i.setStyle)(e, w, 0));
                            var m = e.style[w];
                            e.style[w] = _.orig[w], t[w] = parseFloat(Object(i.getStyle)(e, w, !0)), e.style[w] = m, "height" === w && r.browser.msie && !t.overflow && (e.style.overflow = "hidden")
                        } else void 0 === _.orig[w] && (_.orig[w] = Object(i.getStyle)(e, w, !1) || ""), _.hide = !0, t[w] = 0
                }
            return _.show && !p && Object(i.show)(e), b = new l(e, _), Object(n.each)(t, function(t, o) {
                if (/backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|borderColor|outlineColor/.test(t)) {
                    if (f = O(e, "borderColor" === t ? "borderTopColor" : t), o = v(o), void 0 === f) return
                } else {
                    var r = o.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/);
                    r && (o = parseFloat(r[2]), r[1] && (o = ("-=" == r[1] ? -1 : 1) * o + o)), 0 != (f = b.cur(t, !0)) || "width" !== t && "height" !== t || (f = 1), "opacity" === t && o > 0 && !p && (Object(i.setStyle)(e, "opacity", 0), f = 0, Object(i.show)(e))
                }(f != o || Object(n.isArray)(f) && f.join(",") === o.join(",")) && (d[t] = f, u[t] = o)
            }), b.start(d, u), Object(i.data)(e, "tween", b), b
        }
    }

    function c(e, t, o, n, i, r) {
        var a = function(t) {
                var n = 1 - t;
                return 3 * n * n * t * e + 3 * n * t * t * o + t * t * t
            },
            s = function(e) {
                var o = 1 - e;
                return 3 * o * o * e * t + 3 * o * e * e * n + e * e * e
            },
            c = function(t) {
                var n = 1 - t;
                return 3 * (2 * (t - 1) * t + n * n) * e + 3 * (-t * t * t + 2 * n * t) * o
            },
            _ = i,
            l = void 0,
            d = void 0;
        for (l = _, d = 0; d < 8; d++) {
            var u = a(l) - _;
            if (Math.abs(u) < r) return s(l);
            var p = c(l);
            if (Math.abs(p) < 1e-6) break;
            l -= u / p
        }
        var f = 0,
            b = 1;
        if ((l = _) < f) return s(f);
        if (l > b) return s(b);
        for (; f < b;) {
            var h = a(l);
            if (Math.abs(h - _) < r) return s(l);
            _ > h ? f = l : b = l, l = .5 * (b - f) + f
        }
        return s(l)
    }

    function _(e, t, o, n) {
        return s(e, {
            opacity: o
        }, t, n)
    }
    var l = function() {
            function e(t, o, r) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.el = Object(i.ge)(t), this.name = r, this.options = Object(n.extend)({
                    onStep: function() {},
                    onComplete: function() {},
                    transition: o.transition || d.Transitions.sineInOut,
                    duration: 500
                }, o || {})
            }
            return e.prototype.start = function(e, t) {
                var o = this;
                this.from = e, this.to = t, this.time = Object(n.vkNow)(), this.isTweening = !0;
                var i = function(e) {
                    return o.step(e)
                };
                return i.el = this.el, i() && d.Timers.push(i) && !d.TimerId && (d.TimerId = setInterval(function() {
                    for (var e = d.Timers, t = e.length, o = 0; o < t; o++) e[o]() || (e.splice(o--, 1), t--);
                    t || (clearInterval(d.TimerId), d.TimerId = null)
                }, 13)), this
            }, e.prototype.stop = function(e) {
                for (var t = d.Timers, o = t.length - 1; o >= 0; o--) t[o].el === this.el && (e && t[o](!0), t.splice(o, 1));
                this.isTweening = !1
            }, e.prototype.step = function(e) {
                var t = Object(n.vkNow)();
                if (!e && t < this.time + this.options.duration) {
                    for (var o in this.cTime = t - this.time, this.now = {}, this.to)
                        if (Object(n.isArray)(this.to[o])) {
                            for (var r = [], a = 0; a < 3; a++) {
                                if (void 0 === this.from[o] || void 0 === this.to[o]) return !1;
                                r.push(Math.min(parseInt(this.compute(this.from[o][a], this.to[o][a])), 255))
                            }
                            this.now[o] = r
                        } else this.now[o] = this.compute(this.from[o], this.to[o]), this.options.discrete && (this.now[o] = Object(n.intval)(this.now[o]));
                    return this.update(), !0
                }
                return setTimeout(this.options.onComplete.bind(this, this.el), 10), this.now = Object(n.extend)(this.to, this.options.orig), this.update(), this.options.hide && Object(i.hide)(this.el), this.isTweening = !1, !1
            }, e.prototype.compute = function(e, t) {
                var o = t - e;
                return this.options.transition(this.cTime, e, o, this.options.duration)
            }, e.prototype.update = function() {
                for (var e in this.options.onStep(this.now), this.now) Object(n.isArray)(this.now[e]) ? Object(i.setStyle)(this.el, e, "rgb(" + this.now[e].join(",") + ")") : void 0 !== this.el[e] ? this.el[e] = this.now[e] : Object(i.setStyle)(this.el, e, this.now[e])
            }, e.prototype.cur = function(e, t) {
                return null == this.el[e] || this.el.style && null != this.el.style[e] ? parseFloat(Object(i.getStyle)(this.el, e, t)) || 0 : this.el[e]
            }, e
        }(),
        d = {
            Base: l,
            Transitions: {
                linear: function(e, t, o, n) {
                    return o * e / n + t
                },
                sineInOut: function(e, t, o, n) {
                    return -o / 2 * (Math.cos(Math.PI * e / n) - 1) + t
                },
                halfSine: function(e, t, o, n) {
                    return o * Math.sin(Math.PI * (e / n) / 2) + t
                },
                easeOutBack: function(e, t, o, n) {
                    var i = 1.70158;
                    return o * ((e = e / n - 1) * e * ((i + 1) * e + i) + 1) + t
                },
                easeInCirc: function(e, t, o, n) {
                    return -o * (Math.sqrt(1 - (e /= n) * e) - 1) + t
                },
                easeOutCirc: function(e, t, o, n) {
                    return o * Math.sqrt(1 - (e = e / n - 1) * e) + t
                },
                easeInQuint: function(e, t, o, n) {
                    return o * (e /= n) * e * e * e * e + t
                },
                easeOutQuint: function(e, t, o, n) {
                    return o * ((e = e / n - 1) * e * e * e * e + 1) + t
                },
                easeOutCubic: function(e, t, o, n) {
                    return o * ((e = e / n - 1) * e * e + 1) + t
                },
                swiftOut: function(e, t, o, n) {
                    return o * c(.4, 0, .22, 1, e / n, 4 / n) + t
                }
            },
            Attrs: [
                ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
                ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
                ["opacity", "left", "top"]
            ],
            Timers: [],
            TimerId: null
        };

    function u(e, t) {
        var o = {};
        return Object(n.each)(d.Attrs.concat.apply([], d.Attrs.slice(0, t)), function() {
            o[this] = e
        }), o
    }
    var p = function(e, t, o) {
            return s(e, u("show", 1), t, o)
        },
        f = function(e, t, o) {
            return s(e, u("hide", 1), t, o)
        },
        b = function(e, t, o) {
            return s(e, u("toggle", 1), t, o)
        },
        h = function(e, t, o) {
            return s(e, {
                opacity: "show"
            }, t, o)
        },
        w = function(e, t, o) {
            return s(e, {
                opacity: "hide"
            }, t, o)
        },
        m = function(e, t, o) {
            return s(e, {
                opacity: "toggle"
            }, t, o)
        };

    function v(e) {
        var t = void 0;
        return e && Object(n.isArray)(e) && 3 == e.length ? e : (t = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) ? [parseInt(t[1]), parseInt(t[2]), parseInt(t[3])] : (t = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e)) ? [2.55 * parseFloat(t[1]), 2.55 * parseFloat(t[2]), 2.55 * parseFloat(t[3])] : (t = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : (t = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e)) ? [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)] : void 0
    }

    function O(e, t) {
        var o = void 0;
        do {
            if (0 === (o = Object(i.getStyle)(e, t)).indexOf("rgba") && (o = ""), "" != o && "transparent" !== o || "body" === e.nodeName.toLowerCase()) break;
            t = "backgroundColor", e = e.parentNode
        } while (e);
        return v(o)
    }

    function g(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (e = Object(i.ge)(e), t = o.str ? Object(n.trim)(t.toString()) || "" : Object(n.positive)(t), e)
            if (!r.browser.mobile || r.browser.safari_mobile || r.browser.android) {
                var a = Object(i.data)(e, "curCount"),
                    c = Object(i.data)(e, "nextCount");
                if ("number" == typeof c || o.str && "string" == typeof c) t != c && Object(i.data)(e, "nextCount", t);
                else if ("number" == typeof a || o.str && "string" == typeof a) t !== a && Object(i.data)(e, "nextCount", t);
                else if (a = o.str ? Object(n.trim)(Object(i.val)(e).toString()) || "" : Object(n.positive)(Object(i.val)(e)), "auto" === o.str && (o.str = !a.match(/^\d+$/) || !t.match(/^\d+$/), o.str || (a = Object(n.positive)(a), t = Object(n.positive)(t))), a !== t) {
                    Object(i.data)(e, "curCount", t);
                    var _, l = o.str ? a.length === t.length ? a < t : a.length < t.length : a < t,
                        u = (l ? t : a).toString(),
                        p = (l ? a : t).toString(),
                        f = void 0,
                        b = [],
                        h = [];
                    for (o.str || (p = new Array(u.length - p.length + 1).join("0") + p), f = 0, _ = u.length; f < _; f++) {
                        var w = u.charAt(f);
                        if (w !== p.charAt(f)) break;
                        b.push(w)
                    }
                    var m = u.substr(f),
                        v = p.substr(f);
                    if (o.str) {
                        for (f = m.length; f > 0; f--) {
                            var O = m.charAt(f);
                            if (O !== v.charAt(f)) break;
                            h.unshift(O)
                        }
                        h.length && (m = m.substr(0, f + 1), v = v.substr(0, f + 1))
                    }
                    b = b.join("").replace(/\s$/, "&nbsp;"), h = h.join("").replace(/^\s/, "&nbsp;"), Object(n.trim)(Object(i.val)(e)) || o.noSpaceIfEmpty || Object(i.val)(e, "&nbsp;");
                    var E = e.clientHeight || e.offsetHeight;
                    Object(i.val)(e, '<div class="counter_wrap inl_bl"></div>');
                    var j, y = e.firstChild,
                        P = void 0,
                        M = void 0,
                        C = void 0,
                        D = !0;
                    b.length && y.appendChild(P = Object(i.ce)("div", {
                        className: "counter_const inl_bl",
                        innerHTML: b
                    })), b.length || (v = v.replace(/^0+/, "")), v && ("0" !== v || b.length) || (v = o.noSpaceIfEmpty ? "" : "&nbsp;", D = !!b.length), y.appendChild(C = Object(i.ce)("div", {
                        className: "counter_anim_wrap inl_bl"
                    })), C.appendChild(j = Object(i.ce)("div", {
                        className: "counter_anim " + (l ? "counter_anim_inc" : "counter_anim_dec"),
                        innerHTML: '<div class="counter_anim_big"><span class="counter_anim_big_c">' + m + "</span></div>" + (D ? '<div class="counter_anim_small"><span class="counter_anim_small_c">' + v + "</span></div>" : "")
                    }, D ? {
                        marginTop: l ? -E : 0
                    } : {
                        right: 0
                    })), o.str && Object(i.setStyle)(j, {
                        textAlign: "right",
                        right: 0
                    });
                    var T = Object(i.getSize)(Object(i.geByClass1)("counter_anim_big_c", j, "span"))[0],
                        k = D ? "&nbsp;" === v ? T : Object(i.getSize)(Object(i.geByClass1)("counter_anim_small_c", j, "span"))[0] : 0;
                    !v && o.noSpaceIfEmpty && (k = 0), h.length && y.appendChild(M = Object(i.ce)("div", {
                        className: "counter_const inl_bl",
                        innerHTML: h
                    })), o.noWrapWidth || Object(i.setStyle)(y, {
                        width: (P && Object(i.getSize)(P)[0] || 0) + (M && Object(i.getSize)(M)[0] || 0) + T + 0
                    }), void 0 === r.browser.csstransitions && (r.browser.csstransitions = r.browser.chrome && r.browser.version >= 9 || r.browser.mozilla && r.browser.version >= 4 || r.browser.opera && r.browser.version >= 10.5 || r.browser.safari && r.browser.version >= 3.2 || r.browser.safari_mobile || r.browser.android);
                    var L = r.browser.csstransitions;
                    Object(i.setStyle)(C, {
                        width: l ? k : T
                    });
                    var x = function() {
                            Object(i.val)(e, t || (o.noSpaceIfEmpty ? "" : " "));
                            var n = Object(i.data)(e, "nextCount");
                            Object(i.data)(e, "curCount", !1), Object(i.data)(e, "nextCount", !1), ("number" == typeof n || o.str && "string" == typeof n) && setTimeout(g.pbind(e, n, o), 0), o.onDone && o.onDone()
                        },
                        A = D ? {
                            marginTop: l ? 0 : -E
                        } : {
                            marginRight: l ? -k : 0
                        };
                    L ? (Object(i.getStyle)(C, "width"), Object(i.addClass)(C, "counter_css_anim_wrap"), T !== k && Object(i.setStyle)(C, {
                        width: l ? T : k
                    }), D && Object(i.setStyle)(j, A), setTimeout(x, 300), o.fadeMode && (Object(i.setStyle)(Object(i.geByClass1)("counter_anim_big", e), "opacity", 1), Object(i.setStyle)(Object(i.geByClass1)("counter_anim_small", e), "opacity", 0))) : (T !== k && s(C, {
                        width: l ? T : k
                    }, {
                        duration: 100
                    }), D ? s(j, A, {
                        duration: 300,
                        transition: d.Transitions.easeOutCirc,
                        onComplete: x
                    }) : setTimeout(x, 300))
                }
            } else Object(i.val)(e, t || "")
    }
}, function(e, t, o) {
    var n = o(109);
    e.exports = function(e, t, o) {
        if (n(e), void 0 === t) return e;
        switch (o) {
            case 1:
                return function(o) {
                    return e.call(t, o)
                };
            case 2:
                return function(o, n) {
                    return e.call(t, o, n)
                };
            case 3:
                return function(o, n, i) {
                    return e.call(t, o, n, i)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), Object.assign || Object.defineProperty(Object, "assign", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: function(e, t) {
            if (void 0 === e || null === e) throw new TypeError("Cannot convert first argument to object");
            for (var o = Object(e), n = 1; n < arguments.length; n++) {
                var i = arguments[n];
                if (void 0 !== i && null !== i)
                    for (var r = Object.keys(Object(i)), a = 0, s = r.length; a < s; a++) {
                        var c = r[a],
                            _ = Object.getOwnPropertyDescriptor(i, c);
                        void 0 !== _ && _.enumerable && (o[c] = i[c])
                    }
            }
            return o
        }
    })
}, function(e, t, o) {
    "use strict";
    var n = o(162);
    e.exports = o(102)("Set", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        add: function(e) {
            return n.def(this, e = 0 === e ? 0 : e, e)
        }
    }, n)
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "shortCurrency", function() {
        return r
    });
    var n = o(80),
        i = o(89);

    function r() {
        var e = {};
        Object(n.each)(Object(i.geByClass)("_short_currency"), function() {
            var t = Object(i.domData)(this, "short") || "";
            if (!t) return !0;
            var o = this.innerHTML,
                r = Object(n.winToUtf)(o).length,
                a = Object(i.getStyle)(this, "fontFamily") || "tahoma,arial,sans-serif";
            if (void 0 === e[a]) {
                for (var s = "", c = r - 1; c >= 0; c--) s += "&#8399;";
                var _ = Object(i.ce)("div", {
                    innerHTML: "<b>" + o + "</b><b>" + s + "</b>"
                }, {
                    fontFamily: a,
                    fontSize: "24px"
                });
                Object(i.ge)("utils").appendChild(_), e[a] = Math.abs(_.firstChild.offsetWidth - _.lastChild.offsetWidth) >= 2 * r, Object(i.re)(_)
            }!1 === e[a] && Object(i.val)(this, t)
        })
    }
}, function(e, t, o) {
    "use strict";
    var n = o(162);
    e.exports = o(102)("Map", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        get: function(e) {
            var t = n.getEntry(this, e);
            return t && t.v
        },
        set: function(e, t) {
            return n.def(this, 0 === e ? 0 : e, t)
        }
    }, n, !0)
}, function(e, t, o) {
    "use strict";

    function n(e) {
        var t = new Date;
        return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
    }

    function i(e) {
        return n(new Date(e.getTime() + 864e5))
    }

    function r(e) {
        return n(new Date(e.getTime() - 864e5))
    }

    function a(e, t) {
        var o = new Date(e),
            n = new Date(t);
        return o.getFullYear() === n.getFullYear() && o.getMonth() === n.getMonth() && o.getDate() === n.getDate()
    }

    function s(e) {
        return e >= 10 ? e : "0" + e
    }

    function c(e, t) {
        var o = void 0;
        e = Math.max(e, 0);
        var n = Math.floor(e % 60);
        o = n < 10 ? "0" + n : n;
        var i = (e = Math.floor(e / 60)) % 60;
        return o = i + ":" + o, ((e = Math.floor(e / 60)) > 0 || t) && (i < 10 && (o = "0" + o), o = e + ":" + o), o
    }
    o.r(t), o.d(t, "isToday", function() {
        return n
    }), o.d(t, "isYesterday", function() {
        return i
    }), o.d(t, "isTomorrow", function() {
        return r
    }), o.d(t, "isSameDate", function() {
        return a
    }), o.d(t, "leadingZero", function() {
        return s
    }), o.d(t, "formatTime", function() {
        return c
    })
}, , function(e, t, o) {
    var n = o(143),
        i = o(30),
        r = o(138),
        a = o(81)("src"),
        s = Function.toString,
        c = ("" + s).split("toString");
    o(36).inspectSource = function(e) {
        return s.call(e)
    }, (e.exports = function(e, t, o, s) {
        var _ = "function" == typeof o;
        _ && (r(o, "name") || i(o, "name", t)), e[t] !== o && (_ && (r(o, a) || i(o, a, e[t] ? "" + e[t] : c.join(String(t)))), e === n ? e[t] = o : s ? e[t] ? e[t] = o : i(e, t, o) : (delete e[t], i(e, t, o)))
    })(Function.prototype, "toString", function() {
        return "function" == typeof this && this[a] || s.call(this)
    })
}, function(e, t, o) {
    var n = o(112),
        i = o(156);
    e.exports = function(e) {
        return function(t, o) {
            var r, a, s = String(i(t)),
                c = n(o),
                _ = s.length;
            return c < 0 || c >= _ ? e ? "" : void 0 : (r = s.charCodeAt(c)) < 55296 || r > 56319 || c + 1 === _ || (a = s.charCodeAt(c + 1)) < 56320 || a > 57343 ? e ? s.charAt(c) : r : e ? s.slice(c, c + 2) : a - 56320 + (r - 55296 << 10) + 65536
        }
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "showStory", function() {
        return l
    }), o.d(t, "showNarrative", function() {
        return d
    }), o.d(t, "storiesPreloadStatic", function() {
        return p
    }), o.d(t, "sendMask", function() {
        return b
    });
    var n = o(168),
        i = o(95),
        r = o(153),
        a = o(54),
        s = o(89),
        c = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        _ = !1;

    function l(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (cur.storiesNotSupported) return Object(n.showFastBox)(Object(r.getLang)("global_error"), Object(r.getLang)("stories_bad_browser"));
        Object(i.curBox)() && Object(i.curBox)().bodyNode.contains(t.fromEl) && (Object(i.curBox)().hide(), t.fromEl = null), clearTimeout(_), _ = setTimeout(function() {
            bodyNode.appendChild(Object(s.ce)("div", {
                id: "stories_loader",
                innerHTML: Object(a.getProgressHtml)("stories_loader_pr", "pr_baw pr_medium") + '<div class="back"></div>'
            }))
        }, 1e3), stManager.add(["stories.js", "stories.css", jsc("web/emoji.js")], function() {
            var o = window.Stories;
            clearTimeout(_), Object(s.re)("stories_loader"), o.show(e, t)
        })
    }

    function d(e, t) {
        var o = e.split("_"),
            n = c(o, 2),
            r = n[0],
            a = n[1];
        if (r && a) {
            if (Object(i.curBox)() || window.wkcur && window.wkcur.shown) return window.open("/narrative" + e);
            l(r + "/narrative" + e, t)
        }
    }
    var u = !1;

    function p() {
        u || cur.storiesNotSupported || (u = !0, stManager.add(["stories.js", "stories.css"]))
    }
    var f = !1;

    function b(e, t) {
        f || (f = !0, ajax.post("al_stories.php", {
            act: "send_mask",
            mask_id: e,
            hash: t
        }, {
            loader: !0,
            onDone: function(e, t, o, a) {
                "cant_send" === e ? Object(n.showFastBox)({
                    title: t,
                    width: 460
                }, o, a) : Object(i.showDoneBox)(Object(r.getLang)("stories_mask_sent")), f = !1
            },
            onFail: function() {
                return f = !1, Object(n.showFastBox)({
                    title: Object(r.getLang)("global_box_error_title")
                }, Object(r.getLang)("global_unknown_error")), !0
            }
        }))
    }
}, , , , function(e, t) {
    var o, n, i = e.exports = {};

    function r() {
        throw new Error("setTimeout has not been defined")
    }

    function a() {
        throw new Error("clearTimeout has not been defined")
    }

    function s(e) {
        if (o === setTimeout) return setTimeout(e, 0);
        if ((o === r || !o) && setTimeout) return o = setTimeout, setTimeout(e, 0);
        try {
            return o(e, 0)
        } catch (t) {
            try {
                return o.call(null, e, 0)
            } catch (t) {
                return o.call(this, e, 0)
            }
        }
    }! function() {
        try {
            o = "function" == typeof setTimeout ? setTimeout : r
        } catch (e) {
            o = r
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : a
        } catch (e) {
            n = a
        }
    }();
    var c, _ = [],
        l = !1,
        d = -1;

    function u() {
        l && c && (l = !1, c.length ? _ = c.concat(_) : d = -1, _.length && p())
    }

    function p() {
        if (!l) {
            var e = s(u);
            l = !0;
            for (var t = _.length; t;) {
                for (c = _, _ = []; ++d < t;) c && c[d].run();
                d = -1, t = _.length
            }
            c = null, l = !1,
                function(e) {
                    if (n === clearTimeout) return clearTimeout(e);
                    if ((n === a || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
                    try {
                        n(e)
                    } catch (t) {
                        try {
                            return n.call(null, e)
                        } catch (t) {
                            return n.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function f(e, t) {
        this.fun = e, this.array = t
    }

    function b() {}
    i.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
        _.push(new f(e, t)), 1 !== _.length || l || s(p)
    }, f.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = b, i.addListener = b, i.once = b, i.off = b, i.removeListener = b, i.removeAllListeners = b, i.emit = b, i.prependListener = b, i.prependOnceListener = b, i.listeners = function(e) {
        return []
    }, i.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, i.cwd = function() {
        return "/"
    }, i.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, i.umask = function() {
        return 0
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), Function.prototype.pbind = function() {
        var e = Array.prototype.slice.call(arguments);
        return e.unshift(window), this.bind.apply(this, e)
    }, Function.prototype.rpbind = function() {
        var e = Array.prototype.slice.call(arguments);
        return e.unshift(window), this.rbind.apply(this, e)
    }, Function.prototype.rbind = function() {
        var e = this,
            t = Array.prototype.slice.call(arguments),
            o = t.shift(),
            n = t.shift();
        return function() {
            var i = Array.prototype.slice.call(arguments);
            return e.apply(o, t.concat(i)), n
        }
    }, Function.prototype.bind || (Function.prototype.bind = function() {
        var e = this,
            t = Array.prototype.slice.call(arguments),
            o = t.shift();
        return function() {
            var n = Array.prototype.slice.call(arguments);
            return e.apply(o, t.concat(n))
        }
    }), Object.keys || (Object.keys = function(e) {
        var t = [];
        for (var o in e) e.hasOwnProperty(o) && t.push(o);
        return t
    })
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "ls", function() {
        return n
    });
    var n = {
        checkVersion: function() {
            return void 0 !== window.localStorage && void 0 !== window.JSON
        },
        set: function(e, t) {
            this.remove(e);
            try {
                return !!n.checkVersion() && localStorage.setItem(e, JSON.stringify(t))
            } catch (e) {
                return !1
            }
        },
        get: function(e) {
            if (!n.checkVersion()) return !1;
            try {
                return JSON.parse(localStorage.getItem(e))
            } catch (e) {
                return !1
            }
        },
        remove: function(e) {
            try {
                localStorage.removeItem(e)
            } catch (e) {}
        }
    }
}, function(e, t, o) {
    "use strict";
    var n = o(152),
        i = {};
    i[o(146)("toStringTag")] = "z", i + "" != "[object z]" && o(121)(Object.prototype, "toString", function() {
        return "[object " + n(this) + "]"
    }, !0)
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (e) {
            return !0
        }
    }
}, function(e, t, o) {
    var n = o(134),
        i = o(19),
        r = function(e, t) {
            if (i(e), !n(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, n) {
            try {
                (n = o(114)(Function.call, o(144).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
            } catch (e) {
                t = !0
            }
            return function(e, o) {
                return r(e, o), t ? e.__proto__ = o : n(e, o), e
            }
        }({}, !1) : void 0),
        check: r
    }
}, function(e, t, o) {
    "use strict";
    o.r(t);
    var n = o(65),
        i = o(148),
        r = (o(62), o(170), o(136), o(115), o(38), o(51), o(11)),
        a = (o(37), o(128), o(137)),
        s = o(187),
        c = o(2),
        _ = o(58),
        l = o(44),
        d = o(55),
        u = o(104),
        p = o(113),
        f = o(87),
        b = o(153),
        h = o(69),
        w = o(129),
        m = o(117),
        v = o(6),
        O = o(85),
        g = o(82),
        E = o(25),
        j = o(172),
        y = o(31),
        P = o(46),
        M = o(15),
        C = o(28),
        D = o(159),
        T = o(179),
        k = o(160),
        L = o(119),
        x = o(9),
        A = o(54),
        B = o(168),
        I = o(95),
        S = o(23),
        R = o(101),
        W = o(171),
        U = o(164),
        K = o(154),
        N = o(100),
        F = o(76),
        H = o(43),
        q = o(59),
        V = o(142),
        z = o(61),
        G = o(18),
        Y = o(89),
        X = o(26),
        Q = o(80),
        $ = o(177),
        Z = o(21),
        J = o(123);
    r.polyfill(), window.Map = n, window.Set = i;
    var ee = window.vk;

    function te() {
        window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
            destroy: [],
            nav: []
        }, ee.width = 960, ee.started = Object(Q.vkNow)(), ee.counts = {}, _.browser.android && (Object(s.setCookie)("remixscreen_width", window.screen.width, 365), Object(s.setCookie)("remixscreen_height", window.screen.height, 365), Object(s.setCookie)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(s.setCookie)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(s.setCookie)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(D.initNavCounters)(), Object(O.fillStaticFilesData)(), Object($.addEvent)(window, "unload", function() {
            for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object($.removeEvent)(vkCache[e].handle.elem)
        }), Object($.addEvent)(window, "DOMContentLoaded load", function() {
            ee.loaded || (ee.loaded = !0, Object(E.updSideTopLink)()), Object(A.checkPageBlocks)()
        }), Object($.addEvent)(document, "mousedown", function(e) {
            window._wf = 1, cur.__mdEvent = e
        }), window.browser.mobile || Object($.addEvent)(document, "keydown", V.handleGlobalEsc)
    }
    var oe = 0;

    function ne() {
        if (window.headNode = Object(Y.geByTag1)("head"), window.icoNode = Object(Y.geByTag1)("link", headNode), window.bodyNode = Object(Y.geByTag1)("body"), window.htmlNode = Object(Y.geByTag1)("html"), window.utilsNode = Object(Y.ge)("utils"), window._fixedNav = !1, window._tbLink = {}, Object($.addEvent)(bodyNode, "resize", A.onBodyResize.pbind(!1)), utilsNode) {
            _.browser.mozilla ? Object(Y.addClass)(bodyNode, "firefox") : _.browser.mobile && Object(Y.addClass)(bodyNode, "mobfixed"), Object(K.initLegacyBrowserDetectionInAttribute)(), Object(O.appendCssFiles)();
            var e = Object(Y.ge)("layer_bg"),
                t = e.nextSibling,
                o = Object(Y.ge)("box_layer_bg"),
                n = o.nextSibling;
            window.layerBG = e, window.boxLayerBG = o, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = n, window.boxLayer = n.firstChild, window.boxLoader = n.firstChild.firstChild, window._stlSide = Object(Y.ge)("stl_side"), window._stlLeft = Object(Y.ge)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, _.browser.mobile || Object(X.initStl)(), Object($.addEvent)(n, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(n), window.layers = Object(h.initLayers)(e, t, o, n), hab.init(), window._retinaInit ? window._retinaInit() : oe = 1
        }
    }

    function ie() {
        if (utilsNode) {
            Object(X.updateSTL)();
            var e = Object(Y.ge)("side_bar");
            window.pageNode = Object(Y.ge)("page_wrap"), window._fixedNav = e && "fixed" === Object(Y.getStyle)(e, "position"), window._tbLink = Object(Y.ge)("top_back_link"), _.browser.chrome || _.browser.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = _.browser.safari ? bodyNode : htmlNode;
            var t = Math.max(Object(Q.vkNow)() - ee.started, 10),
                o = Object(Q.intval)((ee.contlen || 1) / t * 1e3);
            _.browser.mozilla && _.browser.version >= 4 ? o /= 2.5 : _.browser.mozilla ? o *= 1.5 : _.browser.msie && _.browser.version >= 7 ? o /= 1.5 : _.browser.msie && (o *= 2.5);
            var n = Object(Q.intval)(150 * Math.max(2e6 / o, 1));
            if (O.stManager.highlimit = 6 * n, O.stManager.lowlimit = Math.min(n, 600), Object(A.onBodyResize)(), setTimeout(A.onBodyResize.pbind(!1), 0), Object(F.updateAriaElements)(), window.addEventListener("scroll", A.onBodyScroll, {
                    passive: !0
                }), window.debuglogInit && debuglogInit(), !ee.id && w.ls.checkVersion() && w.ls.get("last_reloaded")) try {
                var i = {};
                Object(Q.each)(["sound_notify_off", "im_ui_notify_off"], function(e, t) {
                    var o = w.ls.get(t);
                    null !== o && (i[t] = o)
                }), window.localStorage.clear(), Object(Q.each)(i, function(e, t) {
                    return w.ls.set(e, t)
                })
            } catch (e) {}
        }
    }
    var re = function() {
        function e(t, o) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.count = o || 1, this.func = t
        }
        return e.prototype.done = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.count -= e, this.count <= 0 && this.func()
        }, e
    }();

    function ae(e) {
        ee.loaded ? e() : Object($.addEvent)(window, "load", e)
    }

    function se() {
        window.showWriteMessageBox = R.showWriteMessageBox, window.giftsBox = R.giftsBox, window.moneyTransferBox = R.moneyTransferBox, window.reportAd = R.reportAd, window.mobilePromo = R.mobilePromo, window.showAudioClaimWarning = R.showAudioClaimWarning, window.menuSettings = R.menuSettings, window.sureDeleteAll = R.sureDeleteAll, window.TopNotifier = Object(W.initTopNotifier)(), window.showPhoto = W.showPhoto, window.showManyPhoto = W.showManyPhoto, window.showAlbums = W.showAlbums, window.showAlbum = W.showAlbum, window.showPhotoTags = W.showPhotoTags, window.isPhotoeditor3Available = W.isPhotoeditor3Available, window.AudioMessagePlayer = W.AudioMessagePlayer, window.showVideoTags = W.showVideoTags, window.videoCallback = W.videoCallback, window.showWiki = W.showWiki, window.showApp = W.showApp, window.showPodcast = W.showPodcast, window.podcastStartFrom = W.podcastStartFrom, window.articlePrepare = W.articlePrepare, window.isArticleLayerOpen = W.isArticleLayerOpen, window.isArticleEditorAvailable = W.isArticleEditorAvailable, window.openArticleEditor = W.openArticleEditor, window.mentionOver = S.mentionOver, window.mentionClick = W.mentionClick, window.mobileOnlineTip = S.mobileOnlineTip, window.pageVerifiedTip = S.pageVerifiedTip, window.audioShowActionTooltip = S.audioShowActionTooltip, window.shareAudioPlaylist = W.shareAudioPlaylist, window.getAudioPlayer = W.getAudioPlayer, window.deleteAudioOnClaim = W.deleteAudioOnClaim, window.initTopAudioPlayer = W.initTopAudioPlayer, window.bookmark = W.bookmark, window.bookmarkPost = W.bookmarkPost, window.bookmarkArticle = W.bookmarkArticle, window.bookmarkLink = W.bookmarkLink, window.bookmarkPodcast = W.bookmarkPodcast, window.bookmarkNarrative = W.bookmarkNarrative, window.bookmarkTooltip = S.bookmarkTooltip, window.showStory = J.showStory, window.showNarrative = J.showNarrative, window.storiesPreloadStatic = J.storiesPreloadStatic, window.sendMask = J.sendMask
    }
    window.constants = {
        Groups: k.default
    }, Object(Y.initDomScripts)(), window.ge = Y.ge, window.geByTag = Y.geByTag, window.geByTag1 = Y.geByTag1, window.geByClass = Y.geByClass, window.geByClass1 = Y.geByClass1, window.gpeByClass = Y.gpeByClass, window.domQuery = Y.domQuery, window.domQuery1 = Y.domQuery1, window.domClosest = Y.domClosest, window.ce = Y.ce, window.cf = Y.cf, window.re = Y.re, window.se = Y.se, window.sech = Y.sech, window.rs = Y.rs, window.psr = Y.psr, window.domReplaceEl = Y.domReplaceEl, window.domEL = Y.domEL, window.domNS = Y.domNS, window.domPS = Y.domPS, window.domFC = Y.domFC, window.domLC = Y.domLC, window.domPN = Y.domPN, window.domChildren = Y.domChildren, window.domInsertBefore = Y.domInsertBefore, window.domInsertAfter = Y.domInsertAfter, window.domByClass = Y.domByClass, window.domData = Y.domData, window.domChildIndex = Y.domChildIndex, window.domCA = Y.domCA, window.domClosestSibling = Y.domClosestSibling, window.matchesSelector = Y.matchesSelector, window.isHover = Y.isHover, window.isAncestor = Y.isAncestor, window.getScroll = Y.getScroll, window.domClosestPositioned = Y.domClosestPositioned, window.domClosestOverflowHidden = Y.domClosestOverflowHidden, window.show = Y.show, window.hide = Y.hide, window.isVisible = Y.isVisible, window.clientHeight = Y.clientHeight, window.getClientRectOffsetY = Y.getClientRectOffsetY, window.toggle = Y.toggle, window.boundingRectEnabled = Y.boundingRectEnabled, window.getXYRect = Y.getXYRect, window.getXY = Y.getXY, window.isWindow = Y.isWindow, window.getSize = Y.getSize, window.hasClass = Y.hasClass, window.addClass = Y.addClass, window.addClassDelayed = Y.addClassDelayed, window.removeClass = Y.removeClass, window.removeClassDelayed = Y.removeClassDelayed, window.toggleClass = Y.toggleClass, window.toggleClassDelayed = Y.toggleClassDelayed, window.replaceClass = Y.replaceClass, window.getStyle = Y.getStyle, window.setStyle = Y.setStyle, window.setStyleDelayed = Y.setStyleDelayed, window.setPseudoStyle = Y.setPseudoStyle, window.data = Y.data, window.attr = Y.attr, window.removeAttr = Y.removeAttr, window.removeData = Y.removeData, window.cleanElems = Y.cleanElems, window.setTitle = Y.setTitle, window.getZoom = Y.getZoom, window.val = Y.val, window.elfocus = Y.elfocus, window.traverseParent = Y.traverseParent, window.getH = Y.getH, window.getW = Y.getW, window.domClosestByTag = Y.domClosestByTag, window.setDocumentTitle = Y.setDocumentTitle, window.lockDocumentTitle = Y.lockDocumentTitle, window.KEY = $.KEY, window.addEvent = $.addEvent, window.removeEvent = $.removeEvent, window.triggerEvent = $.triggerEvent, window.cancelEvent = $.cancelEvent, window.stopEvent = $.stopEvent, window.normEvent = $.normEvent, window.checkEvent = $.checkEvent, window.checkKeyboardEvent = $.checkKeyboardEvent, window.checkOver = $.checkOver, Object(Q.initUtilsCommon)(), window.isRetina = Q.isRetina, window.extractUrls = Q.extractUrls, window.serializeForm = Q.serializeForm, window.addTemplates = Q.addTemplates, window.getTemplate = Q.getTemplate, window.rand = Q.rand, window.irand = Q.irand, window.isUndefined = Q.isUndefined, window.isFunction = Q.isFunction, window.isArray = Q.isArray, window.isString = Q.isString, window.isObject = Q.isObject, window.isEmpty = Q.isEmpty, window.vkNow = Q.vkNow, window.vkImage = Q.vkImage, window.trim = Q.trim, window.stripHTML = Q.stripHTML, window.escapeRE = Q.escapeRE, window.intval = Q.intval, window.floatval = Q.floatval, window.positive = Q.positive, window.isNumeric = Q.isNumeric, window.winToUtf = Q.winToUtf, window.replaceEntities = Q.replaceEntities, window.clean = Q.clean, window.unclean = Q.unclean, window.each = Q.each, window.indexOf = Q.indexOf, window.inArray = Q.inArray, window.clone = Q.clone, window.arrayKeyDiff = Q.arrayKeyDiff, window.extend = Q.extend, window.vkLocal = Q.vkLocal, window.lTimeout = Q.lTimeout, window.getCaretCharacterOffsetWithin = Q.getCaretCharacterOffsetWithin, window.formatCount = Q.formatCount, window.encodeHtml = Q.encodeHtml, window.decodeHtml = Q.decodeHtml, Object(c.initAjax)(), window.ajx2q = c.ajx2q, window.q2ajx = c.q2ajx, window.requestBox = c.requestBox, window.activateMobileBox = c.activateMobileBox, window.validateMobileBox = c.validateMobileBox, window.validatePassBox = c.validatePassBox, window.photoCaptchaBox = c.photoCaptchaBox, Object(s.initCookies)(), window.getCookie = s.getCookie, window.setCookie = s.setCookie, window.hideCookiesPolicy = s.hideCookiesPolicy, Object(x.initDebugTools)(), window.debugLog = x.debugLog, window.debugEl = x.debugEl, window.isToday = L.isToday, window.isYesterday = L.isYesterday, window.isTomorrow = L.isTomorrow, window.isSameDate = L.isSameDate, window.leadingZero = L.leadingZero, window.formatTime = L.formatTime, window.parseLatin = b.parseLatin, window.parseCyr = b.parseCyr, window.parseLatKeys = b.parseLatKeys, window.langNumeric = b.langNumeric, window.langSex = b.langSex, window.langStr = b.langStr, window.addLangKeys = b.addLangKeys, window.getLang = b.getLang, window.langDate = b.langDate, window.getShortDate = b.getShortDate, window.getShortDateOrTime = b.getShortDateOrTime, window.langWordNumeric = b.langWordNumeric, window.getDateText = b.getDateText, window.getBigDateNew = b.getBigDateNew, window.getSmDate = b.getSmDate, window.scrollToY = v.scrollToY, window.scrollToTop = v.scrollToTop, window.scrollGetX = v.scrollGetX, window.scrollGetY = v.scrollGetY, window.disableBodyScroll = v.disableBodyScroll, window.enableBodyScroll = v.enableBodyScroll, window.Chat = K.Chat, window.__qlTimer = null, window.__qlClear = K.__qlClear, window.onLoginDone = K.onLoginDone, window.onLoginFailed = K.onLoginFailed, window.onLoginCaptcha = K.onLoginCaptcha, window.onLoginReCaptcha = K.onLoginReCaptcha, window.storePasswordCredential = K.storePasswordCredential, window.cssAnim = K.cssAnim, window.imagesLoader = K.imagesLoader, window.nodeUpdated = K.nodeUpdated, window.hideNewsAnnounce = K.hideNewsAnnounce, window.leftAdBlockClose = K.leftAdBlockClose, window.leftBlockToggleFriend = K.leftBlockToggleFriend, window.leftBlockFriendTooltip = K.leftBlockFriendTooltip, window.fifaReplaceText = K.fifaReplaceText, window.placeholderSetup = q.placeholderSetup, window.placeholderInit = q.placeholderInit, window.isInputActive = q.isInputActive, window.showTooltip = U.showTooltip, window.showTitle = U.showTitle, window.showHint = U.showHint, window.topMsg = a.topMsg, window.showMsg = a.showMsg, window.topError = a.topError, window.showGlobalPrg = a.showGlobalPrg, window.checkTextLength = z.checkTextLength, window.getSelectionText = z.getSelectionText, window.goAway = z.goAway, window.debounce = z.debounce, window.hashCode = z.hashCode, window.isFullScreen = z.isFullScreen, window.parallel = z.parallel, window.parseJSON = z.parseJSON, window.shuffle = z.shuffle, window.throttle = z.throttle, window.toggleOnline = z.toggleOnline, window.updateMoney = z.updateMoney, window.onlinePlatformClass = z.onlinePlatformClass, window.Fx = p.Fx, window.fx = p.Fx, window.animate = p.animate, window.cubicBezier = p.cubicBezier, window.fadeTo = p.fadeTo, window.genFx = p.genFx, window.getRGB = p.getRGB, window.getColor = p.getColor, window.slideDown = p.slideDown, window.slideUp = p.slideUp, window.slideToggle = p.slideToggle, window.fadeIn = p.fadeIn, window.fadeOut = p.fadeOut, window.fadeToggle = p.fadeToggle, window.animateCount = p.animateCount, window.updateAriaElements = F.updateAriaElements, window.updateAriaCheckboxes = F.updateAriaCheckboxes, window.hasAccessibilityMode = F.hasAccessibilityMode, window.cancelStackFilter = G.cancelStackFilter, window.cancelStackPush = G.cancelStackPush, window.cancelStackPop = G.cancelStackPop, window.ElementTooltip = l.default, Object(d.initFavIcon)(), window.setFavIcon = d.setFavIcon, 1 === ee.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== ee.al || history.pushState || (ee.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), ee.version = !1), Object(O.initStaticManager)(), window.stManager = O.stManager, Object(_.initBrowserUtils)(), window.browser = _.browser, window.mobPlatforms = _.mobPlatforms, window.browserFeatures = _.browserFeatures, Object(u.initFlashUtils)(), window.toggleFlash = u.toggleFlash, window.renderFlash = u.renderFlash, te(), window.updateHeaderStyles = D.updateHeaderStyles, window.updateNarrow = A.updateNarrow, window.checkPageBlocks = A.checkPageBlocks, window.redraw = A.redraw, window.onBodyResize = A.onBodyResize, window.onBodyScroll = A.onBodyScroll, window.leftBlockOver = A.leftBlockOver, window.leftBlockOut = A.leftBlockOut, window.leftBlockHide = A.leftBlockHide, window.onDocumentClick = V.onDocumentClick, window.onEnter = V.onEnter, window.onCtrlEnter = V.onCtrlEnter, window.autosizeSetup = A.autosizeSetup, window.getProgressBarEl = A.getProgressBarEl, window.getProgressHtml = A.getProgressHtml, Object(Z.initAds)(), Object(T.subscribePerformanceLoggerCollectors)(), window.onDomReady = function(e) {
        return e()
    }, window.currentModule = function() {
        return cur.currentModule ? cur.currentModule() : cur.module
    }, window.hab = Object(f.initHub)(), window.ls = w.ls, window.shortCurrency = m.shortCurrency, window.statlogsValueEvent = g.statlogsValueEvent, window.callHub = re, window.CallHub = re, window.gSearch = new P.default, window.zNav = D.zNav, window.handlePageView = D.handlePageView, window.handlePageParams = D.handlePageParams, window.handlePageCount = D.handlePageCount, window.comScoreUDM = D.comScoreUDM, window.updateOtherCounters = D.updateOtherCounters, window.processDestroy = D.processDestroy, window.globalHistoryDestroy = D.globalHistoryDestroy, window.showBackLink = D.showBackLink, window.nav = C.default, nav.init(), ee.time && !window.browser.opera_mobile && setTimeout(function() {
        var e = new Date,
            t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
        1 === t[1] && 12 === ee.time[1] ? ee.time[1] = 0 : 12 === t[1] && 1 === ee.time[1] ? t[1] = 0 : (t[1] > ee.time[1] + 1 || ee.time[1] > t[1] + 1) && (t[1] = ee.time[1] = t[2] = ee.time[2] = 0), t[1] > ee.time[1] && 1 === t[2] ? 31 === ee.time[2] || (4 === ee.time[1] || 6 === ee.time[1] || 9 === ee.time[1] || 11 === ee.time[1]) && 30 === ee.time[2] || 2 === ee.time[1] && (29 === ee.time[2] || 28 === ee.time[2] && ee.time[0] % 4) ? ee.time[2] = 0 : ee.time[2] = t[2] = 0 : ee.time[1] > t[1] && 1 === ee.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && ee.time[0] % 4) ? t[2] = 0 : t[2] = ee.time[2] = 0), (t[2] > ee.time[2] + 1 || ee.time[2] > t[2] + 1) && (t[2] = ee.time[2] = 0);
        var o = 60 * (60 * (24 * (t[2] - ee.time[2]) + (t[3] - ee.time[3])) + (t[4] - ee.time[4]));
        o < -55800 ? o += 86400 : o > 37800 && (o -= 86400);
        var n = 0,
            i = Math.abs(o);
        Object(Q.each)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], function(e, t) {
            var r = Math.round(3600 * (t - 3)),
                a = Math.abs(o - r);
            a < i && (i = a, n = r)
        }), ee.dt = n, Object(s.getCookie)("remixdt") !== ee.dt && Object(s.setCookie)("remixdt", ee.dt, 365);
        var r = Object(Q.intval)(Object(s.getCookie)("remixrt"));
        window.devicePixelRatio >= 2 && (!_.browser.iphone || Object(s.getCookie)("remixme")) ? 1 & r || (Object(s.setCookie)("remixrt", 1 | r, 365), window._retinaInit = function() {
            O.stManager.add(["retina.css"]), Object(Y.addClass)(document.body, "is_2x")
        }, oe && window._retinaInit()) : 1 & r && Object(s.setCookie)("remixrt", 1 ^ r, 365)
    }, 0), window.boxQueue = Object(I.getBoxQueue)(), window.__bq = boxQueue, window.curBox = I.curBox, Object(I.initBoxQueue)(), window.boxRefreshCoords = I.boxRefreshCoords, window.MessageBox = B.MessageBox, window.showBox = B.showBox, window.showTabbedBox = B.showTabbedBox, window.showFastBox = B.showFastBox, window.showCaptchaBox = B.showCaptchaBox, window.showReCaptchaBox = B.showReCaptchaBox, window.showDoneBox = I.showDoneBox, window.TopMenu = A.TopMenu, window.TopSearch = M.default, window.handleScroll = z.handleScroll, window.loadScript = y.loadScript, Object(E.initUiHelpers)(), window.notaBene = E.notaBene, window.updSideTopLink = E.updSideTopLink, window.createButton = E.createButton, window.actionsMenuItemLocked = E.actionsMenuItemLocked, window.lockActionsMenuItem = E.lockActionsMenuItem, window.unlockActionsMenuItem = E.unlockActionsMenuItem, window.linkLocked = E.linkLocked, window.lockLink = E.lockLink, window.unlockLink = E.unlockLink, window.lockButton = E.lockButton, window.unlockButton = E.unlockButton, window.buttonLocked = E.buttonLocked, window.isButtonLocked = E.isButtonLocked, window.disableButton = E.disableButton, window.sbWidth = E.sbWidth, window.isChecked = E.isChecked, window.checkbox = E.checkbox, window.disable = E.disable, window.radioval = E.radioval, window.radiobtn = E.radiobtn, window.showProgress = E.showProgress, window.hideProgress = E.hideProgress, window.disableEl = E.disableEl, window.enableEl = E.enableEl, Object(j.initVideo)(), window.VideoConstants = j.VideoConstants, window.showVideo = j.showVideo, window.showInlineVideo = j.showInlineVideo, window.loadInlineVideo = j.loadInlineVideo, window.revertLastInlineVideo = j.revertLastInlineVideo, window.destroyInlineVideoPlayer = j.destroyInlineVideoPlayer, window.pauseLastInlineVideo = j.pauseLastInlineVideo, window.playLastInlineVideo = j.playLastInlineVideo, window.checkMp4 = j.checkMp4, window.performance && window.performance.memory && Object(Q.rand)(0, 100) < 5 && Object(H.collectMemoryStats)(), Object(N.initLongView)(), Object(K.initPostsLegacyVars)(), se(), window.onLoaded = ae, window.domStarted = ne, window.domReady = ie, Object(x.debugLog)("common module enabled"), O.stManager.done(jsc("web/common_web.js"))
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, , function(e, t, o) {
    "use strict";
    o.r(t), Array.from || (Array.from = function(e) {
        return [].slice.call(e)
    })
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "topMsg", function() {
        return topMsg
    }), __webpack_require__.d(__webpack_exports__, "topError", function() {
        return topError
    }), __webpack_require__.d(__webpack_exports__, "showMsg", function() {
        return showMsg
    }), __webpack_require__.d(__webpack_exports__, "showGlobalPrg", function() {
        return showGlobalPrg
    });
    var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(89),
        _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80);

    function topMsg(e, t, o) {
        if (o || (o = "#D6E5F7"), e) {
            clearTimeout(window.topMsgTimer);
            var n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("system_msg");
            n.style.backgroundColor = o, n.innerHTML = e, Object(_dom__WEBPACK_IMPORTED_MODULE_0__.show)(n), t && (window.topMsgTimer = setTimeout(topMsg.pbind(!1), 1e3 * t))
        } else Object(_dom__WEBPACK_IMPORTED_MODULE_0__.hide)("system_msg")
    }

    function topError(text, opts) {
        if (opts || (opts = {}), text.message) {
            var error = text;
            text = "<b>JavaScript error:</b> " + error.message, opts.stack = error.stack, error.stack && __debugMode && (text += "<br/>" + error.stack.replace(/\n/g, "<br/>"));
            try {
                console.log(error.stack)
            } catch (e) {}
        }
        if (!opts.stack) try {
            eval("0 = 1")
        } catch (e) {
            opts.stack = e.stack
        } - 1 != opts.dt && topMsg(text, opts.dt, "#FFB4A3"), __dev || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("debuglogwrap") || (delete opts.dt, ajax.plainpost("/errors.php", Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.extend)(opts, {
            msg: opts.msg || text,
            module: (window.cur || {}).module,
            id: vk.id,
            host: locHost,
            lang: vk.lang,
            loc: (window.nav || {}).strLoc,
            realloc: location.toString()
        })))
    }

    function showMsg(e, t, o, n) {
        var i = "msg" + ("msg" !== o ? " " + o : "");
        n && (i += " msg_appear"), e = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)(e);
        var r = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.geByClass1)(o, e),
            a = r || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.domFC)(e),
            s = e.insertBefore(Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ce)("div", {
                className: i,
                innerHTML: '<div class="msg_text">' + t + "</div>"
            }), a);
        r && Object(_dom__WEBPACK_IMPORTED_MODULE_0__.re)(r), setTimeout(_dom__WEBPACK_IMPORTED_MODULE_0__.removeClass.pbind(s, "msg_appear"), 0)
    }

    function showGlobalPrg(e, t) {
        var o = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.getXY)(e),
            n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.getSize)(e),
            i = t || {},
            r = i.w,
            a = void 0 === r ? 32 : r,
            s = i.h,
            c = void 0 === s ? 13 : s,
            _ = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("global_prg");
        _.className = i.cls || "progress", Object(_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(_, {
            left: o[0] + Math.floor((n[0] - a) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.intval)(i.shift ? i.shift[0] : 0),
            top: o[1] + Math.floor((n[1] - c) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.intval)(i.shift ? i.shift[1] : 0),
            width: a,
            height: c,
            display: "block",
            "z-index": i.zIndex ? i.zIndex : null
        }), i.hide && (e.style.visibility = "hidden")
    }
}, function(e, t) {
    var o = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return o.call(e, t)
    }
}, , , function(e, t, o) {
    var n = o(143),
        i = n["__core-js_shared__"] || (n["__core-js_shared__"] = {});
    e.exports = function(e) {
        return i[e] || (i[e] = {})
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "reopen", function() {
        return u
    }), o.d(t, "onDocumentClick", function() {
        return p
    }), o.d(t, "onEnter", function() {
        return f
    }), o.d(t, "onCtrlEnter", function() {
        return b
    }), o.d(t, "handleGlobalEsc", function() {
        return h
    });
    var n = o(177),
        i = o(89),
        r = o(80),
        a = o(171),
        s = o(154),
        c = o(58),
        _ = o(129),
        l = o(18),
        d = o(2),
        u = function() {
            Object(i.re)(window._opener), window._opener = utilsNode.appendChild(Object(i.ce)("iframe"))
        };

    function p(e) {
        if (Object(n.checkEvent)(e)) return !0;
        if (_.ls.set("last_reloaded", []), !cur.onMouseClick || !cur.onMouseClick(e)) {
            if (!(e = window.event || e.originalEvent || e)) return !0;
            for (var t = 8, o = e.target || e.srcElement, a = void 0, s = void 0, l = void 0; o && o !== bodyNode && "A" !== o.tagName && t--;) o = o.parentNode;
            if (!o || "A" !== o.tagName || o.onclick || o.onmousedown) return !0;
            var p = o.href;
            if (p && (o.getAttribute("target") || nav.baseBlank)) {
                if (cur.hideReferrer && !c.browser.msie) return (l = window.open("", "_blank", "")) && (c.browser.msie && -1 !== p.indexOf(";") && (p = "'" + p.replace(/'/g, "%27") + "'"), l.opener = null, l.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + Object(r.clean)(p) + '">'), l.document.close()), Object(n.cancelEvent)(e);
                try {
                    return window._opener || u(), window._opener.contentWindow.open(p, "_blank"), setTimeout(u, 0), Object(n.cancelEvent)(e)
                } catch (e) {
                    return !0
                }
            }
            if ("https:" !== location.protocol && !p.indexOf("https://")) return !0;
            (p = p.replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (p = p.replace(location.hostname, "")), vk.dev && "vk.com" === location.hostname && (p = p.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/"));
            var f = {};
            (s = p.match(/^\/(.+?)#[\!\/](.+?)$/)) && !s[1].match(/^app(\d+)/) && (f.permanent = s[1], p = "/" + s[2]);
            var b = !!(o.getAttribute && o.getAttribute("data-post-click-type") && o.getAttribute("data-post-id"));
            if (p.match(/#$/) && !b) return !0;
            var h = Object(i.domData)(o, "post-id");
            h && (f.postId = h);
            var w = void 0,
                m = p;
            if (a = p.match(/^\/(.*?)(\?|#|$)/)) a = a[1];
            else {
                if (o.hostname) w = o.hostname, a = o.pathname + o.search;
                else {
                    var v = /^([^:\/]+)?(?::(\d+))?(\/?[^#]*)(#?.*)$/i.exec(p);
                    if (!v) return !0;
                    w = v[1], a = v[3] || "/"
                }
                if (!w || !b) return !0;
                o.setAttribute("data-change-location-with-post-away", 1), m = o
            }
            if ("add_community_app" === a) return Object(i.attr)(o, "target", "_blank"), !0;
            if (a.indexOf(".php") > 0 || a.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images\/|utils\/|\.js|js\/|\.css|css\/|source\b)/)) {
                if (!b) return !0;
                o.setAttribute("data-change-location-with-post-away", 1), m = o
            }
            var O = o.getAttribute("hrefparams");
            O && (f.params = Object(r.extend)(f.params || {}, Object(d.q2ajx)(O)));
            try {
                return nav.go(m, e, f), Object(n.cancelEvent)(e)
            } catch (e) {
                return !0
            }
        }
    }

    function f(e, t) {
        (t = t || window.event).keyCode === n.KEY.ENTER && (e(), Object(n.cancelEvent)(t))
    }

    function b(e, t) {
        (10 === (e = e || window.event).keyCode || 13 === e.keyCode && (e.ctrlKey || e.metaKey && c.browser.mac)) && (t(), Object(n.cancelEvent)(e))
    }

    function h(e) {
        if (window._wf = 1, e.keyCode === n.KEY.ESC && boxQueue.count() && !cur._noEscHide) return boxQueue.hideLast(), -1;
        if (e.keyCode === n.KEY.ESC && window.articleCloseImageFullSize && window.articleCloseImageFullSize()) return Object(n.cancelEvent)(event);
        if (e.keyCode === n.KEY.ESC && window.isArticleLayerOpen && window.isArticleLayerOpen()) return window.ArticleLayer.close(!0), Object(n.cancelEvent)(event);
        if (e.keyCode === n.KEY.ESC && window.AuthorPage) return window.AuthorPage.close(), Object(n.cancelEvent)(event);
        if (e.keyCode === n.KEY.ESC) return Object(l.cancelStackPop)(), Object(n.cancelEvent)(e);
        var t = [176, 177, 178, 179],
            o = !1;
        window.audioPlayer && (t.push(n.KEY.LEFT), t.push(n.KEY.RIGHT)), Object(r.each)(t, function(t, n) {
            if (e.keyCode === n) return o = !0, !1
        }), o && Object(a.getAudioPlayer)().onMediaKeyPressedEvent(e), s.Chat.inited && 191 === e.keyCode && (e.ctrlKey || e.metaKey && c.browser.mac) && s.Chat.showFriends()
    }
}, function(e, t) {
    var o = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = o)
}, function(e, t, o) {
    var n = o(96),
        i = o(73),
        r = o(3),
        a = o(35),
        s = o(138),
        c = o(111),
        _ = Object.getOwnPropertyDescriptor;
    t.f = o(83) ? _ : function(e, t) {
        if (e = r(e), t = a(t, !0), c) try {
            return _(e, t)
        } catch (e) {}
        if (s(e, t)) return i(!n.f.call(e, t), e[t])
    }
}, , function(e, t, o) {
    var n = o(141)("wks"),
        i = o(81),
        r = o(143).Symbol,
        a = "function" == typeof r;
    e.exports = function(e) {
        return n[e] || (n[e] = a && r[e] || (a ? r : i)("Symbol." + e))
    }
}, function(e, t, o) {
    var n;
    ! function(t) {
        "use strict";

        function i() {}
        var r = i.prototype,
            a = t.EventEmitter;

        function s(e, t) {
            for (var o = e.length; o--;)
                if (e[o].listener === t) return o;
            return -1
        }

        function c(e) {
            return function() {
                return this[e].apply(this, arguments)
            }
        }
        r.getListeners = function(e) {
            var t, o, n = this._getEvents();
            if (e instanceof RegExp)
                for (o in t = {}, n) n.hasOwnProperty(o) && e.test(o) && (t[o] = n[o]);
            else t = n[e] || (n[e] = []);
            return t
        }, r.flattenListeners = function(e) {
            var t, o = [];
            for (t = 0; t < e.length; t += 1) o.push(e[t].listener);
            return o
        }, r.getListenersAsObject = function(e) {
            var t, o = this.getListeners(e);
            return o instanceof Array && ((t = {})[e] = o), t || o
        }, r.addListener = function(e, t) {
            if (! function e(t) {
                    return "function" == typeof t || t instanceof RegExp || !(!t || "object" != typeof t) && e(t.listener)
                }(t)) throw new TypeError("listener must be a function");
            var o, n = this.getListenersAsObject(e),
                i = "object" == typeof t;
            for (o in n) n.hasOwnProperty(o) && -1 === s(n[o], t) && n[o].push(i ? t : {
                listener: t,
                once: !1
            });
            return this
        }, r.on = c("addListener"), r.addOnceListener = function(e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, r.once = c("addOnceListener"), r.defineEvent = function(e) {
            return this.getListeners(e), this
        }, r.defineEvents = function(e) {
            for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
            return this
        }, r.removeListener = function(e, t) {
            var o, n, i = this.getListenersAsObject(e);
            for (n in i) i.hasOwnProperty(n) && -1 !== (o = s(i[n], t)) && i[n].splice(o, 1);
            return this
        }, r.off = c("removeListener"), r.addListeners = function(e, t) {
            return this.manipulateListeners(!1, e, t)
        }, r.removeListeners = function(e, t) {
            return this.manipulateListeners(!0, e, t)
        }, r.manipulateListeners = function(e, t, o) {
            var n, i, r = e ? this.removeListener : this.addListener,
                a = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (n = o.length; n--;) r.call(this, t, o[n]);
            else
                for (n in t) t.hasOwnProperty(n) && (i = t[n]) && ("function" == typeof i ? r.call(this, n, i) : a.call(this, n, i));
            return this
        }, r.removeEvent = function(e) {
            var t, o = typeof e,
                n = this._getEvents();
            if ("string" === o) delete n[e];
            else if (e instanceof RegExp)
                for (t in n) n.hasOwnProperty(t) && e.test(t) && delete n[t];
            else delete this._events;
            return this
        }, r.removeAllListeners = c("removeEvent"), r.emitEvent = function(e, t) {
            var o, n, i, r, a = this.getListenersAsObject(e);
            for (r in a)
                if (a.hasOwnProperty(r))
                    for (o = a[r].slice(0), i = 0; i < o.length; i++) !0 === (n = o[i]).once && this.removeListener(e, n.listener), n.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, n.listener);
            return this
        }, r.trigger = c("emitEvent"), r.emit = function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, r.setOnceReturnValue = function(e) {
            return this._onceReturnValue = e, this
        }, r._getOnceReturnValue = function() {
            return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
        }, r._getEvents = function() {
            return this._events || (this._events = {})
        }, i.noConflict = function() {
            return t.EventEmitter = a, i
        }, void 0 === (n = function() {
            return i
        }.call(t, o, t, e)) || (e.exports = n)
    }(this || {})
}, function(e, t, o) {
    o(130), o(175), o(12), o(116), e.exports = o(36).Set
}, , , , function(e, t, o) {
    var n = o(22),
        i = o(146)("toStringTag"),
        r = "Arguments" == n(function() {
            return arguments
        }());
    e.exports = function(e) {
        var t, o, a;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(o = function(e, t) {
            try {
                return e[t]
            } catch (e) {}
        }(t = Object(e), i)) ? o : r ? n(t) : "Object" == (a = n(t)) && "function" == typeof t.callee ? "Arguments" : a
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "parseLatin", function() {
        return a
    }), o.d(t, "parseCyr", function() {
        return s
    }), o.d(t, "parseLatKeys", function() {
        return c
    }), o.d(t, "langNumeric", function() {
        return _
    }), o.d(t, "langSex", function() {
        return l
    }), o.d(t, "langStr", function() {
        return d
    }), o.d(t, "addLangKeys", function() {
        return u
    }), o.d(t, "getLang", function() {
        return p
    }), o.d(t, "langDate", function() {
        return f
    }), o.d(t, "getShortDate", function() {
        return b
    }), o.d(t, "getShortDateOrTime", function() {
        return h
    }), o.d(t, "langWordNumeric", function() {
        return w
    }), o.d(t, "getDateText", function() {
        return m
    }), o.d(t, "getBigDateNew", function() {
        return v
    }), o.d(t, "getSmDate", function() {
        return O
    });
    var n = o(119),
        i = o(80),
        r = o(9);

    function a(e) {
        for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], o = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], n = e, i = 0, r = t.length; i < r; i++) n = n.split(t[i]).join(o[i]);
        for (var a = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", s = 0, c = a.length; s < c; s++) n = n.split(a.charAt(s)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(s));
        return n === e ? null : n
    }

    function s(e) {
        for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], o = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], n = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", i = e, r = 0; r < o.length; r++) i = i.split(o[r]).join(t[r]);
        for (var a = 0; a < n.length; a++) i = i.split(n.charAt(a)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(a));
        return i === e ? null : i
    }

    function c(e) {
        for (var t = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", o = e, n = 0; n < t.length; n++) o = o.split(t.charAt(n)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(n));
        return o == e ? null : o
    }

    function _(e, t, o) {
        if (!t || !window.langConfig) return e;
        var n = void 0;
        if (Object(i.isArray)(t) ? (n = t[1], e != Math.floor(e) ? n = t[langConfig.numRules.float] : Object(i.each)(langConfig.numRules.int, function(o, r) {
                if ("*" == r[0]) return n = t[r[2]], !1;
                var a = r[0] ? e % r[0] : e;
                return -1 != Object(i.indexOf)(r[1], a) ? (n = t[r[2]], !1) : void 0
            })) : n = t, o) {
            for (var r = e.toString().split("."), a = [], s = r[0].length - 3; s > -3; s -= 3) a.unshift(r[0].slice(s > 0 ? s : 0, s + 3));
            r[0] = a.join(langConfig.numDel), e = r.join(langConfig.numDec)
        }
        return n = (n || "%s").replace("%s", e)
    }

    function l(e, t) {
        if (!Object(i.isArray)(t)) return t;
        var o = t[1];
        return window.langConfig ? (Object(i.each)(langConfig.sexRules, function(n, i) {
            return "*" == i[0] ? (o = t[i[1]], !1) : e == i[0] && t[i[1]] ? (o = t[i[1]], !1) : void 0
        }), o) : o
    }

    function d(e) {
        for (var t = arguments, o = t.length, n = e + "", i = 1; i < o; i += 2) {
            var r = "%" === t[i][0] ? t[i] : "{" + t[i] + "}";
            n = n.replace(r, t[i + 1])
        }
        return n
    }

    function u(e, t) {
        var o = t ? window : window.cur;
        o.lang ? Object(i.extend)(o.lang, e) : o.lang = e
    }

    function p() {
        try {
            var e = Array.from(arguments),
                t = e.shift();
            if (!t) return "...";
            var o = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
            if (!o) {
                var n = t.split("_");
                return n.shift(), n.join(" ")
            }
            return Object(i.isFunction)(o) ? o.apply(null, e) : void 0 === e[0] && !Object(i.isArray)(o) || "raw" === e[0] ? o : _(e[0], o, e[1])
        } catch (e) {
            Object(r.debugLog)("lang error:" + e.message + "(" + Array.from(arguments).join(", ") + ")")
        }
    }

    function f(e, t, o, r, a, s) {
        var c = void 0;
        if (s || (s = ""), Object(i.isArray)(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += o, c = new Date(e)) : c = e, a) t = t[1];
        else {
            var _ = "";
            !(_ = Object(n.isToday)(c) ? t[3] : Object(n.isYesterday)(c) ? t[2] : Object(n.isTomorrow)(c) ? t[4] : t[1]) && t[1] && (_ = t[1]), t = _
        }
        var l = {
                hours: c.getHours(),
                minutes: c.getMinutes(),
                seconds: c.getSeconds(),
                day: c.getDate(),
                month: c.getMonth() + 1,
                year: c.getFullYear()
            },
            d = "";
        switch (3 === vk.lang && (d = c.getHours() > 11 ? "pm" : "am", l.hours = c.getHours() % 12 == 0 ? 12 : c.getHours() % 12), vk.lang) {
            case 1:
                switch (c.getHours()) {
                    case 11:
                        t = t.replace(" о ", " об ");
                        break;
                    case 0:
                        t = t.replace(" о ", " в ")
                }
                break;
            case 3:
                !Object(n.isToday)(c) || Object(n.isYesterday)(c) || Object(n.isTomorrow)(c) || (t = s + t);
                break;
            case 12:
            case 73:
                1 == c.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
        }
        return 68 === vk.lang && (l.year = l.year + 543), t.replace("{hour}", l.hours).replace("{num_hour}", Object(n.leadingZero)(l.hours)).replace("{minute}", Object(n.leadingZero)(l.minutes)).replace("{day}", l.day).replace("{num_day}", Object(n.leadingZero)(l.day)).replace("{month}", r[l.month]).replace("{year}", l.year).replace("{short_year}", l.year % 100).replace("{second}", Object(n.leadingZero)(l.seconds)).replace("{am_pm}", d)
    }

    function b(e, t, o, n, i) {
        e *= 1e3, void 0 === o && (o = !0), void 0 === n && (n = p("months_of", "raw")), t *= 1e3;
        var r = Date.now(),
            a = new Date(r),
            s = new Date(e + t);
        return !i && e > r && e - r < 864e5 && a.getDate() === s.getDate() ? f(e, "{hour}:{minute} {am_pm}", t, [], !o) : s.getYear() !== a.getYear() || e < r - 157248e5 ? f(e, p("global_date", "raw"), t, n, !o) : f(e, p("global_short_date", "raw"), t, n, !o)
    }

    function h(e, t, o, i) {
        return Object(n.isToday)(new Date(1e3 * e + 1e3 * t)) ? f(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !o) : b(e, t, o, i)
    }

    function w(e, t, o) {
        return Object(i.isArray)(t) && e < t.length ? t[e] : _(e, o)
    }

    function m(e, t) {
        e += t;
        var o = parseInt(Date.now() / 1e3) - e,
            n = "";
        if (o < 60) n = p("global_just_now");
        else if (o < 3600) {
            n = w(Object(i.intval)(o / 60), p("global_word_mins_ago", "raw"), p("global_mins_ago", "raw"))
        } else if (o < 14400) {
            n = w(Object(i.intval)(o / 3600), p("global_word_hours_ago", "raw"), p("global_hours_ago", "raw"))
        } else n = v(e, 0, !0, "_l");
        return n
    }

    function v(e, t, o, n) {
        void 0 === o && (o = !0), void 0 === t && (t = 0), void 0 === n && (n = ""), t *= 1e3;
        var i = new Date(1e3 * e),
            r = new Date;
        return i.getFullYear() !== r.getFullYear() && i.getTime() < r.getTime() - 1728e5 || Math.abs(i.getTime() - r.getTime()) > 157248e5 ? f(1e3 * e, p("global_date", "raw"), t, p("months_sm_of"), !o) : f(1e3 * e, p("global_short_date_time" + n, "raw"), t, p("months_sm_of"), !o)
    }

    function O(e, t, o) {
        void 0 === o && (o = !0), void 0 === t && (t = 0);
        var n = new Date,
            i = n.getFullYear(),
            r = n.getMonth(),
            a = new Date(1e3 * e),
            s = a.getFullYear(),
            c = a.getMonth();
        return f(1e3 * e, p(s < i && (r > 1 || c < 9 || i - s >= 2) ? "global_date" : "global_short_date_time", "raw"), t, p("months_sm_of", "raw"), !o)
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "Chat", function() {
        return p
    }), o.d(t, "cssAnim", function() {
        return f
    }), o.d(t, "fifaReplaceText", function() {
        return b
    }), o.d(t, "imagesLoader", function() {
        return h
    }), o.d(t, "hideNewsAnnounce", function() {
        return w
    }), o.d(t, "leftAdBlockClose", function() {
        return m
    }), o.d(t, "leftBlockToggleFriend", function() {
        return v
    }), o.d(t, "leftBlockFriendTooltip", function() {
        return O
    }), o.d(t, "initLegacyBrowserDetectionInAttribute", function() {
        return g
    }), o.d(t, "__qlClear", function() {
        return E
    }), o.d(t, "storePasswordCredential", function() {
        return j
    }), o.d(t, "onLoginDone", function() {
        return y
    }), o.d(t, "onLoginFailed", function() {
        return P
    }), o.d(t, "onLoginCaptcha", function() {
        return M
    }), o.d(t, "onLoginReCaptcha", function() {
        return C
    }), o.d(t, "nodeUpdated", function() {
        return D
    }), o.d(t, "initPostsLegacyVars", function() {
        return T
    });
    var n = o(164),
        i = o(25),
        r = o(89),
        a = o(113),
        s = o(177),
        c = o(80),
        _ = o(168),
        l = o(58),
        d = o(153),
        u = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
    var p = {
        maxHeight: 300,
        tabs: {},
        counters: {},
        showFriends: function() {
            curFastChat.clistBox.visible ? curFastChat.clistBox.options.fixed ? FastChat.clistHide() : curFastChat.clistBox.show() : (FastChat.clistShow(), p.cont.tt && p.cont.tt.destroy && p.cont.tt.destroy())
        },
        showTT: function() {
            if (!Object(r.hasClass)(p.wrap, "chat_active") && !Object(r.hasClass)(p.wrap, "chat_expand")) {
                var e = l.browser.mac ? "Cmd" : "Ctrl";
                Object(n.showTooltip)(p.cont, {
                    text: Object(d.getLang)("head_fr_online_tip") + " (" + e + "+?)",
                    shift: [-2, 4, 0],
                    showdt: 0,
                    black: 1
                })
            }
        },
        init: function() {
            p.wrap = Object(r.ce)("div", {
                id: "chat_onl_wrap",
                className: "chat_onl_wrap",
                innerHTML: '\n<div class="chat_tt_wrap"></div>\n<div class="chat_onl_inner">\n  <div class="chat_cont_scrolling"><div class="chat_onl_height"></div></div>\n  <div class="chat_cont_sh_top"></div>\n  <div class="chat_cont_sh_bottom"></div>\n  <a class="chat_tab_wrap" id="chat_tab_wrap" onclick="Chat.showFriends()" onmouseover="Chat.showTT();">\n    <div class="chat_onl_cont">\n      <div class="chat_onl" id="chat_onl"></div>\n    </div>\n  </a>\n</div>'
            }), utilsNode.appendChild(p.wrap), p.scrollNode = Object(r.geByClass1)("chat_cont_scrolling", p.wrap), p.ttNode = Object(r.geByClass1)("chat_tt_wrap", p.wrap), p.itemsCont = p.scrollNode.firstChild, p.onl = Object(r.ge)("chat_onl"), p.cont = p.onl.parentNode.parentNode, Object(r.hide)(p.wrap), p.inited = !0, stManager._addCss(".layers_shown .chat_onl_wrap {margin-right: " + Object(i.sbWidth)() + "px;}")
        }
    };

    function f(e, t, o, n) {
        var i = Object(c.intval)(l.browser.version);
        if (e && (l.browser.chrome && i > 14 || l.browser.mozilla && i > 13 || l.browser.opera && i > 2)) {
            var _ = "all " + o.duration + "ms " + (o.func || "ease-out");
            e.style.WebkitTransition = _, e.style.MozTransition = _, e.style.OTransition = _, e.style.transition = _;
            var d = function t() {
                return l.browser.opera && Object(c.intval)(l.browser.version) <= 12 ? e.removeEventListener("oTransitionEnd", t) : Object(s.removeEvent)(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", t), e.style.WebkitTransition = "", e.style.MozTransition = "", e.style.OTransition = "", e.style.transition = "", n && n(), !1
            };
            n && (l.browser.opera && Object(c.intval)(l.browser.version) <= 12 ? e.addEventListener("oTransitionEnd", d) : Object(s.addEvent)(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", d)), setTimeout(r.setStyle.pbind(e, t), 0)
        } else Object(a.animate)(e, t, Object(c.extend)(o, {
            onComplete: n
        }))
    }

    function b(e) {
        return cur.fifaConfettiEnabled && window.Fifa2018 ? /\w+=["']+[^"']*([Гг][Оо]+[Лл]|go+a+l).*["']+/gi.test(e) ? e : (e = e.replace(/&#33;/g, "!")).replace(/(^|[^a-zа-яА-ЯёЁ0-9])((?:[Гг][Оо]+[Лл]|go+a+l)[\!]*)(?=[^a-zа-яА-ЯёЁ0-9]+?|$)([\!])?/gi, function(e) {
            return ((arguments.length <= 1 ? void 0 : arguments[1]) || "") + '<span class="fifa_confettiLink" onclick="Fifa2018.startFlapper(this); return false;">' + (((arguments.length <= 2 ? void 0 : arguments[2]) || "") + ((arguments.length <= 3 ? void 0 : arguments[3]) || "")) + "</span>"
        }) : e
    }

    function h(e, t) {
        var o = [],
            n = 0,
            i = null,
            a = Object(c.extend)({
                top_load: 0,
                bottom_load: 2,
                load_limit: 10,
                need_load_class: "__need_load",
                skip_process_load: !1,
                use_iframe: !1
            }, t),
            s = {};

        function _(e, t) {
            o[e] && (--n, delete o[e]), t || s.processLoad()
        }

        function d(t) {
            var o = 0,
                n = t;
            if (n && n.offsetParent)
                do {
                    if (o += n.offsetTop, e && n.offsetParent === e) break
                } while (n = n.offsetParent);
            return o
        }
        return s.processLoad = function() {
            if (Object(c.each)(o, function(e, t) {
                    var n = u(t, 2),
                        i = n[0],
                        r = n[1];
                    (r.width || r.height || Object(c.vkNow)() - i > 2e4) && o[e] && _.call(r, e, !0)
                }), clearTimeout(i), n && (i = setTimeout(s.processLoad, 500)), !(n >= a.load_limit)) {
                var t = Object(r.geByClass)(a.need_load_class, e || bodyNode),
                    l = [],
                    p = void 0,
                    f = void 0;
                if (e && t.length) {
                    var b = e.offsetHeight;
                    p = e.scrollTop - b * a.top_load, f = e.scrollTop + b * a.bottom_load
                }
                for (var h = 0, w = t.length; h < w && n < a.load_limit; h++) {
                    var m = t[h];
                    if ("IMG" === m.tagName) {
                        var v = m.getAttribute("data-src");
                        if (v) {
                            if (e) {
                                var O = d(m),
                                    g = O + m.parentNode.offsetHeight;
                                if (O > f) continue;
                                if (g < p) continue
                            }
                            l.push([m, v])
                        }
                    }
                }
                Object(c.each)(l, function(e, t) {
                    var i = u(t, 2),
                        l = i[0],
                        d = i[1];
                    s.iloader && s.iloader.add(d, _, l), l.src = d, l.removeAttribute("data-src"), Object(r.removeClass)(l, a.need_load_class), o[d] || (n++, o[d] = [Object(c.vkNow)(), l])
                }), clearTimeout(i), n && (i = setTimeout(s.processLoad, 500))
            }
        }, s.destroy = function() {
            o = [], n = 0, clearTimeout(i)
        }, a.use_iframe && (s.iloader = new function() {
            var e = void 0,
                t = void 0,
                o = void 0,
                n = void 0,
                i = void 0,
                a = void 0;

            function s(e) {
                return t && t.body ? t.getElementById("___img" + e) : Object(r.geByClass1)("___img" + e, o)
            }

            function _() {
                e = utilsNode.appendChild(Object(r.ce)("iframe")), t = function(e) {
                    if (l.browser.mozilla) return !1;
                    try {
                        return e.contentDocument ? e.contentDocument : e.contentWindow && e.contentWindow.document ? e.contentWindow.document : e.document
                    } catch (e) {}
                    return !1
                }(e), o = t && t.body ? t.body : utilsNode.appendChild(Object(r.ce)("div", {}, {
                    display: "none"
                })), n = 0, i = []
            }

            function d(e, a, c) {
                var _ = n++;
                i[_] = {
                    src: e,
                    onLoad: a,
                    that: c
                }, o.appendChild(Object(r.ce)("div", {
                    innerHTML: function(e) {
                        return t && t.body ? '<img id="___img' + e + '" />' : '<img class="___img' + e + '" />'
                    }(_)
                }));
                var l = s(_);
                return l.src = e, l.onload = function() {
                    var e = i[_];
                    e && (e.onLoad && e.onLoad.call(e.that || window, e.src), delete i[_], o.removeChild(s(_).parentNode))
                }, l
            }
            return _(), {
                add: d,
                abort: function() {
                    Object(r.re)(e), a = [].concat(function(e) {
                        if (Array.isArray(e)) {
                            for (var t = 0, o = Array(e.length); t < e.length; t++) o[t] = e[t];
                            return o
                        }
                        return Array.from(e)
                    }(i.filter(function(e) {
                        return void 0 !== e
                    }))), _()
                },
                repeat: function(e) {
                    if (!a) return [];
                    var t = [];
                    if (Object(c.each)(a, function(e, o) {
                            d(o.src, o.onLoad, o.that), t.push(o.that)
                        }), a = null, e) {
                        var o = [];
                        Object(c.each)(t, function() {
                            o.push([this, this.src]), this.src = "", Object(r.hide)(this)
                        }), setTimeout(function() {
                            Object(c.each)(o, function(e, t) {
                                var o = u(t, 2),
                                    n = o[0],
                                    i = o[1];
                                n.src = i, Object(r.show)(n)
                            })
                        }, 10)
                    }
                    return t
                }
            }
        }), a.skip_process_load || s.processLoad(), s
    }

    function w(e, t) {
        var o = {
            act: "hide_block",
            block: e,
            hash: t
        };
        ajax.post("al_index.php", o), Object(r.hide)("news_announce_" + e)
    }

    function m(e, t) {
        function o() {
            Object(a.animate)("ads_ad_close_info_" + e, {
                opacity: 1
            }, 200, n)
        }

        function n() {
            Object(r.setStyle)("ads_ad_box2_" + e, {
                visibility: "hidden"
            })
        }
        Object(r.setStyle)("left_hide" + e, {
            visibility: "hidden"
        }), ajax.post(t, {}, {
            noAds: !0,
            onDone: function(t) {
                if (!t.done) return;
                if ("ya_direct" === e) return Object(a.animate)(e, {
                    opacity: 0
                }, 200, function() {
                    Object(r.re)("ya_direct"), setTimeout(function() {
                        AdsLight.updateBlock("force_hard", 2)
                    }, 5e3)
                }), void(window.vk__adsLight.yaDirectAdActive = !1);
                var n = Object(r.ge)("ads_ad_close_info_" + e);
                if (!n) return !1;
                Object(r.setStyle)(n, {
                    opacity: 0
                }), n.style.setProperty("display", "block", "important"), setTimeout(o, 0)
            }
        })
    }

    function v(e, t, o, n, i) {
        n && stManager.add(["tooltips.css", "tooltips.js"]), cur.mfid = e, ajax.post("al_friends.php", {
            act: n ? "add" : "remove",
            mid: e,
            mf_type: t,
            hash: o,
            from: "leftblock"
        }, {
            onDone: function(t, o, n) {
                if (!t) return nav.reload();
                var i = Object(r.ge)("left_friend_status_" + e);
                Object(r.cleanElems)(i.firstChild), t ? (Object(r.show)(i), Object(r.val)(i, t)) : Object(r.hide)(i), o && (ajax.preload("al_friends.php", {
                    act: "friend_tt",
                    mid: e
                }, [o, n]), setTimeout(O, 0))
            },
            showProgress: function() {
                var t = (Object(r.ge)("left_friend_subscribed") || {}).tt;
                t && (t.hide({
                    fasthide: 1
                }), t.destroy()), Object(r.ge)("left_friend_status_" + e).innerHTML = '<img src="/images/upload' + (window.devicePixelRatio >= 2 ? "_2x" : "") + '.gif" width="32" />'
            },
            hideProgress: function() {
                return Object(r.hide)("left_friend_status_" + e)
            },
            onFail: function(e) {
                if (e) return Object(_.showFastBox)({
                    title: Object(d.getLang)("global_error")
                }, e), !0
            }
        }), Object(s.cancelEvent)(i)
    }

    function O() {
        return Object(n.showTooltip)(Object(r.ge)("left_friend_subscribed"), {
            url: "al_friends.php",
            params: {
                act: "friend_tt",
                mid: cur.mfid,
                from: "leftblock"
            },
            slide: 15,
            hidedt: 500,
            shift: [40, -1, 3],
            className: "preq_tt",
            forcetodown: !0
        })
    }

    function g() {
        var e = [];
        Object(c.each)(l.browser, function(t, o) {
            o && !Object(c.inArray)(t, ["version", "mac", "search_bot"]) && "flash" !== t.substr(0, 5) && e.push(t)
        }), e = e.join(" "), bodyNode.setAttribute("data-useragent", e)
    }

    function E() {
        clearTimeout(window.__qlTimer), setTimeout(function() {
            return clearTimeout(window.__qlTimer)
        }, 2e3)
    }

    function j(e) {
        if (l.browserFeatures.cmaEnabled && window.ResizeObserver && Object(r.val)("quick_email")) {
            var t = new PasswordCredential({
                id: Object(r.ge)("quick_email").value,
                password: Object(r.ge)("quick_pass").value,
                name: e.name,
                iconURL: e.photo_50
            });
            navigator.credentials.store(t)
        }
    }

    function y(e, t) {
        E(), j(t), nav.reload({
            force: !0,
            from: 6
        })
    }

    function P(e, t) {
        switch (E(), e) {
            case -1:
                location.href = location.href.replace(/^http:/, "https:");
                break;
            case 4:
                var o = "/login?m=1" + (t.expire ? "&s=0" : "");
                Object(c.each)(["email", "ul", "pch"], function(e, n) {
                    t[n] && (o += "&" + n + "=" + t[n])
                }), location.href = o;
                break;
            default:
                location.href = "/login"
        }
    }

    function M(e, t) {
        E(), Object(i.unlockButton)(window.__qfBtn), window.qloginBox = Object(_.showCaptchaBox)(e, t, window.qloginBox, {
            onSubmit: function(e, t) {
                Object(r.ge)("quick_captcha_sid").value = e, Object(r.ge)("quick_captcha_key").value = t, Object(r.ge)("quick_login_form").submit()
            },
            onHide: function() {
                return window.qloginBox = !1
            }
        })
    }

    function C(e, t) {
        E(), Object(i.unlockButton)(window.__qfBtn), window.qloginBox = Object(_.showReCaptchaBox)(e, t, window.qloginBox, {
            onSubmit: function(e) {
                Object(r.ge)("quick_recaptcha").value = e, Object(r.ge)("quick_login_form").submit()
            },
            onHide: function() {
                return window.qloginBox = !1
            }
        })
    }

    function D(e, t) {
        Object(r.setStyle)(e, {
            backgroundColor: "#F5F7FA"
        }), Object(a.animate)(e, {
            backgroundColor: "#FFF"
        }, t || 6e3, function(e) {
            Object(r.setStyle)(e, {
                backgroundColor: null
            })
        })
    }

    function T() {
        window._postsSeen = {}, window._postsSaved = {}, window._postsSaveTimer = void 0, window._postsSendTimer = void 0, window._postsCleanTimer = void 0, window._postsSeenModules = {}, window._postsExtras = {}
    }
}, function(e, t, o) {
    var n = o(99),
        i = o(19),
        r = o(91);
    e.exports = o(83) ? Object.defineProperties : function(e, t) {
        i(e);
        for (var o, a = r(t), s = a.length, c = 0; s > c;) n.f(e, o = a[c++], t[o]);
        return e
    }
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, , function(e, t, o) {
    var n = o(138),
        i = o(3),
        r = o(93)(!1),
        a = o(57)("IE_PROTO");
    e.exports = function(e, t) {
        var o, s = i(e),
            c = 0,
            _ = [];
        for (o in s) o != a && n(s, o) && _.push(o);
        for (; t.length > c;) n(s, o = t[c++]) && (~r(_, o) || _.push(o));
        return _
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "initNavCounters", function() {
        return E
    }), o.d(t, "updateHeaderStyles", function() {
        return j
    }), o.d(t, "updateLeftMenu", function() {
        return y
    }), o.d(t, "handlePageCount", function() {
        return M
    }), o.d(t, "handlePageParams", function() {
        return C
    }), o.d(t, "updateOtherCounters", function() {
        return D
    }), o.d(t, "comScoreUDM", function() {
        return T
    }), o.d(t, "reloadCheckFlood", function() {
        return k
    }), o.d(t, "globalHistoryDestroy", function() {
        return L
    }), o.d(t, "showBackLink", function() {
        return x
    }), o.d(t, "processDestroy", function() {
        return A
    }), o.d(t, "handlePageView", function() {
        return B
    }), o.d(t, "zNav", function() {
        return I
    });
    var n = o(89),
        i = o(80),
        r = o(153),
        a = o(113),
        s = o(82),
        c = o(21),
        _ = o(137),
        l = o(25),
        d = o(123),
        u = o(168),
        p = o(2),
        f = o(95),
        b = o(171),
        h = o(172),
        w = o(101),
        m = o(26),
        v = o(61),
        O = o(129),
        g = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();

    function E() {
        window.vkLastNav = Date.now(), window.vkTabLoaded = Date.now()
    }

    function j(e) {
        var t = [Object(n.ge)("dev_top_nav_wrap"), Object(n.ge)("page_header_wrap")];
        Object(i.each)(t, function(t, o) {
            o && Object(n.setStyle)(o, e)
        })
    }

    function y(e) {
        window.__leftMenu && window.__leftMenu.handleUpdateRequest(e)
    }

    function P(e, t, o) {
        var s = "",
            c = "",
            _ = '<span class="inl_bl left_count_sign"></span>',
            l = "reqs" === o || o && o.substr && "spr" === o.substr(0, 3) ? 5 : 3,
            d = Object(n.geByClass1)("left_count_wrap", e),
            u = Object(n.hasClass)(Object(n.geByClass1)("left_row", e, "a"), "left_nav_over"),
            p = Object(n.geByClass1)("left_count", e, "span"),
            f = Object(n.val)(p);
        t && ((s = t.toString()).length > l && (c = ' title="' + Object(i.stripHTML)(Object(r.langNumeric)(t, "%s", !0)) + '"', s = ".." + s.substr(s.length - l)), _ = '<span class="inl_bl left_count" ' + c + ">" + s + "</span>");
        var b = function() {
            Object(n.val)(d, _), (t ? n.removeClass : n.addClass)(d, "left_void"), Object(n.setStyle)(d, {
                opacity: ""
            })
        };
        if (f || u)
            if (s) Object(a.animateCount)(p, s, {
                str: "auto",
                onDone: b
            });
            else if (u) {
            var h = bodyNode.appendChild(Object(n.se)('<span class="left_count_wrap"><span class="inl_bl left_count_sign"></span></span>')),
                w = Object(n.getSize)(Object(n.domFC)(h))[0];
            Object(n.re)(h), f && "." === f.charAt(0) && Object(n.val)(p, f.replace("..", "")), Object(a.animate)(p, {
                width: w
            }, 100, b)
        } else Object(a.animate)(d, {
            opacity: 0
        }, 100, b);
        else b(), Object(n.setStyle)(d, {
            opacity: 0
        }), Object(a.animate)(d, {
            opacity: 1
        }, 100)
    }

    function M(e, t, o, r) {
        var a = Object(i.intval)(t);
        if (void 0 === vk.counts && (vk.counts = {}), vk.counts[e] !== a)
            if (vk.counts[e] = a, "ntf" !== e) {
                var s = Object(n.ge)("l_" + e),
                    c = Object(n.hasClass)(Object(n.domFC)(s), "left_nav_over"),
                    _ = void 0;
                s && (P(s, a > 0 ? a : 0, e), r && o && (_ = a > 0 && r ? "?" + r : "", s.firstChild.href = "/" + o + _)), (a >= 0 || !c) && Object(n.toggle)(s, a >= 0)
            } else window.TopNotifier.setCount(a > 0 ? a : 0)
    }

    function C(e) {
        vk.id = e.id, e.body_class !== bodyNode.className && (bodyNode.className = e.body_class || ""), Object(m.updateSTL)(), y(), void 0 !== e.pvbig && (vk.pvbig = e.pvbig), void 0 !== e.pvdark && (vk.pvdark = e.pvdark), cur._level = e.level, vk.id && vk.id % 1e3 == 1 && setTimeout(function() {
            window.scrollmarked = {}, Object(s.statlogsValueEvent)("page_scroll", 0, cur.module, "0")
        }, 300), B(e);
        var t = Object(n.ge)("mvk_footer_lnk");
        if (t && (t.firstChild.href = e.mvklnk || "http://m.vk.com/"), vk.nophone = Object(i.intval)(e.nophone), vk.staticheader = Object(i.intval)(e.staticheader), vk.id) {
            var o = Object(n.ge)("left_blocks");
            o && (o.innerHTML = e.leftblocks || "")
        }
        "leftads" in e && 0 !== e.leftads && window.__adsSet(e.leftads, e.ads_section || "", e.ads_can_show, e.ads_showed);
        var r = locProtocol + "//" + location.host + "/";
        e.loc && ("?" === e.loc.charAt(0) ? r += nav.strLoc : r += e.loc);
        var a = document.URL === r ? "" : document.URL;
        if (setTimeout(D.pbind(r, a), 10), e.counters) {
            var _ = (e.counters || "").split(","),
                l = "",
                d = "";
            Object(i.intval)(_[9]) > 0 ? (l = "adsmarket", d = "act=overview&status=-1") : Object(i.intval)(_[9]) < -1 ? (_[9] = 1, l = "ads", d = "act=a_comeback_office_redirect") : l = "ads?act=office&last=1";
            var u = Object(n.ge)("l_set"),
                p = u && u.nextSibling || !1,
                f = ["fr", "ph", "vid", "msg", "nts", "gr", "vkp", "wsh", "ap", "ads", "ntf", "fav", "doc", "apm", "mk"],
                b = ["friends", "albums" + vk.id, "video", "", "notes", "groups", "vkpay", "gifts.php?act=wishlist", "apps", l, "feed" + (Object(n.ge)("l_nwsf") ? "?section=notifications" : ""), "pages", "docs", "apps_manage", "market"],
                h = ["", "act=added", "section=tagged", "", "act=comments", "", "tab=invitations", "", "", d, Object(n.ge)("l_nwsf") ? "" : "section=notifications", "", "", "", "only_friends=1"],
                w = !1;
            if (e.handlecnts) {
                for (var v = 0; v < f.length; v++) M(f[v], _[v], b[v], h[v]);
                for (var O = p.nextSibling; O; O = O.nextSibling) {
                    if (O.tagName && "li" === O.tagName.toLowerCase() && Object(n.isVisible)(O)) {
                        w = !0;
                        break
                    }
                    if (Object(n.hasClass)(O, "more_div")) break
                }(w ? n.show : n.hide)(p);
                for (var g = _.length; v < g; v++) {
                    var E = _[v].split(":"),
                        j = Object(n.ge)("l_app" + Object(i.intval)(E[0]));
                    j && P(j, Object(i.intval)(E[1]))
                }
                setTimeout(c.updSeenAdsInfo, 0)
            } else
                for (var C = 0; C < f.length; C++) vk.counts[f[C]] = _[C]
        }
    }

    function D(e, t) {
        if (!vk.zero && !__dev) {
            t = t || document.referrer;
            for (var o = [new RegExp("(\\/login)(\\?).*$")], n = 0; n < o.length; n++)
                if (e.match(o[n])) return;
            var r = [
                    [new RegExp("(\\/(?:write|mail|im|al_im.php))(\\?[a-z0-9&=\\-_]*)?$"), "$1"],
                    [new RegExp("(\\/write)(\\d*)(\\?[a-zA-Z0-9&=\\-_]*)?$"), "$1"]
                ],
                a = {
                    referrer: t,
                    url: e
                };
            Object(i.each)(a, function(e) {
                Object(i.each)(r, function() {
                    a[e] = a[e].replace(this[0], this[1])
                })
            }), t = a.referrer, e = a.url;
            var s = void 0 === window.screen ? "" : ";s" + screen.width + "*" + screen.height + "*" + (screen.colorDepth ? screen.colorDepth : screen.pixelDepth);
            Object(i.vkImage)().src = locProtocol + "//counter.yadro.ru/hit?r" + escape(t) + s + ";u" + escape(e) + ";" + Math.random(), Object(i.vkImage)().src = locProtocol + "//www.tns-counter.ru/V13a***R>" + t.replace(/\*/g, "%2a") + "*vk_com/ru/UTF-8/tmsec=vksite_total/" + Math.round(1e9 * Math.random()), "unauth" === vk.tnsPixelType ? Object(i.vkImage)().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184674/" + Math.round(1e9 * Math.random()) : "has_rough" === vk.tnsPixelType ? Object(i.vkImage)().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184675/" + Math.round(1e9 * Math.random()) : "not_has_rough" === vk.tnsPixelType && (Object(i.vkImage)().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184677/" + Math.round(1e9 * Math.random())), T(e, t), window._tmr = window._tmr || [], window._tmr.push({
                id: "2579437",
                url: e,
                referrer: t,
                type: "pageView",
                start: (new Date).getTime(),
                pid: vk.id ? vk.id : 0
            })
        }
    }

    function T(e, t) {
        if (!vk.zero) {
            t = t || document.referrer;
            var o = "https:" === locProtocol ? "sb" : "b",
                n = escape(e),
                r = escape(t),
                a = Math.random();
            Object(i.vkImage)().src = locProtocol + "//" + o + ".scorecardresearch.com/p?c1=2&c2=13765216&c3=&c4=" + n + "&c5=&c7=" + n + "&c9=" + r + "&c15=&cv=2.0&cj=1&rn=" + a
        }
    }

    function k(e) {
        e = e || {};
        var t = O.ls.get("last_reloaded") || [];
        t.unshift(Object(i.vkNow)());
        var o = t.length;
        return o > 5 && (t.splice(5, o - 5), o = 5), O.ls.set("last_reloaded", t), !!(5 === o && t[0] - t[4] < 2e4) && (Object(_.topError)('<b>Reloading error</b>, please check internet connection, <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.<br>If problem remains, please <a href="/support?act=new">report it here</a>.', {
            dt: 15,
            type: 6,
            msg: "Reload error, from " + (e.from || 0) + ", forced " + (e.force || 0) + ", url " + (e.url || "") + ", query " + (e.query || "")
        }), !0)
    }

    function L(e) {
        for (var t = 0, o = globalHistory.length; t < o; t++)
            if (globalHistory[t].loc === e) {
                var n = globalHistory.splice(t, 1)[0];
                A(n.cur), n.content.innerHTML = "", --t, --o
            }
    }

    function x(e, t, o) {
        var r = e;
        if (e = (e || "").replace(/^\//, ""), _tbLink.loc = e, void 0 === o && (o = 0, e))
            for (var a = 0, s = globalHistory.length; a < s; a++)
                if (globalHistory[a].loc === e) {
                    o = 1;
                    break
                }
        if (r) {
            try {
                _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
            } catch (e) {}
            Object(i.extend)(_tbLink, {
                href: "/" + e,
                innerHTML: t,
                fast: o
            }), Object(n.show)(_tbLink), window._stlWas = 0
        } else Object(n.hide)(_tbLink);
        Object(l.updSideTopLink)(1)
    }

    function A(e) {
        if (e._back && e._back.hide && e === cur)
            for (var t in e._back.hide)
                if (e._back.hide.hasOwnProperty(t)) try {
                    e._back.hide[t]()
                } catch (e) {
                    try {
                        console.log(e.stack)
                    } catch (e) {}
                }
        if (e.destroy && e.destroy.length)
            for (var o in e.destroy)
                if (e.destroy.hasOwnProperty(o)) try {
                    e.destroy[o](e)
                } catch (e) {
                    try {
                        console.log(e.stack)
                    } catch (e) {}
                }
    }

    function B(e) {
        var t = Object(n.ge)("footer_wrap"),
            o = Object(n.ge)("page_layout"),
            r = Object(n.geByClass1)("top_home_link"),
            a = void 0 === e.width ? vk.width : e.width,
            s = void 0 === e.width_dec ? vk.width_dec : e.width_dec,
            c = void 0 === e.width_dec_footer ? vk.width_dec_footer : e.width_dec_footer;
        if (vk.noleftmenu === e.noleftmenu && vk.nobottommenu === e.nobottommenu && vk.width === e.width && vk.width_dec_footer === e.width_dec_footer || (vk.noleftmenu !== e.noleftmenu && e.noleftmenu && Object(n.hide)("side_bar"), vk.nobottommenu !== e.nobottommenu && (e.nobottommenu ? Object(n.hide)("bottom_nav") : Object(n.show)("bottom_nav")), e.noleftmenu && e.nobottommenu ? t && (Object(n.addClass)(t, "simple"), t.style.width = "auto") : t && (Object(n.removeClass)(t, "simple"), t.style.width = a - c + "px")), vk.notopmenu !== e.notopmenu && (e.notopmenu ? Object(n.hide)("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap") : Object(n.show)("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap")), r && vk.top_home_link_class !== e.top_home_link_class && (r.className = e.top_home_link_class), o && (a !== vk.width || s !== vk.width_dec)) {
            o.style.width = a + "px", Object(n.ge)("page_header").style.width = a + "px", Object(n.ge)("page_body").style.width = a - s + "px", Object(n.ge)("ts_wrap") && Object(n.hasClass)(Object(n.ge)("ts_wrap"), "vk") && (Object(n.ge)("ts_wrap").style.width = a - 191 + "px"), setTimeout(l.updSideTopLink.pbind(!0), 0), setTimeout(m.updateSTL, 0);
            try {
                _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
            } catch (e) {}
        }
        vk.noleftmenu === e.noleftmenu || e.noleftmenu || Object(n.show)("side_bar"), vk.noleftmenu = e.noleftmenu, vk.nobottommenu = e.nobottommenu, vk.top_home_link_class = e.top_home_link_class, vk.notopmenu = e.notopmenu, vk.width = a, vk.width_dec = s, vk.width_dec_footer = c, vk.body_class = e.body_class, vk.staticheader = Object(i.intval)(e.staticheader), vk.no_ads = e.no_ads, vk.ad_preview = e.ad_preview
    }

    function I(e, t, o) {
        var r = e.z,
            a = e.f,
            s = e.w,
            c = (r || "").match(/^([a-z_]+)(-?\d+(?:_\d+)?)\/?(.*)/i);
        if (delete e.z, delete e.f, delete e.w, t || (t = {}), Object(i.isEmpty)(e)) {
            if (a && (Object(v.handleScroll)(a), void 0 === r)) return !1;
            if (t.hist)
                if (r || s) {
                    if (layerQueue.back("wiki", s, (c || {})[1], (c || {})[2])) return !1
                } else if (!1 === r && o.w && layerQueue.back("wiki", o.w)) return !1;
            if (s) {
                if (!1 === r) layers.fullhide(!!t.hist && 2);
                else {
                    if (s.match(/^story([0-9\-]+)_(\d+)/)) return Object(d.showStory)(s);
                    if (s.match(/^narrative([0-9\-]+)_(\d+)/)) return Object(d.showNarrative)(s.split(/narrative/)[1], {
                        source: "narrative_link"
                    });
                    o || (o = Object(i.clone)(nav.objLoc)), s && (o.w = s), a && (o.f = a), delete o.z, nav.setLoc(o)
                }
                return Object(b.showWiki)({
                    w: s
                }, "note_new" === s, !1, {
                    onLoaded: r && I.pbind({
                        z: r
                    }, Object(i.extend)(t, {
                        queue: 1
                    })),
                    isZnav: 1
                }), !1
            }
            if ("giftbox" === r) return !Object(u.showBox)("/al_gifts.php", {
                act: "get_gift_box",
                mid: t.id || 0,
                fr: t.is && t.id !== vk.id ? 0 : 1,
                link: nav.objLoc[0]
            }, {
                stat: ["gifts.css", "ui_controls.js", "ui_controls.css"],
                cache: 1
            }, window.event);
            if ("validatebox" === r) return !Object(p.validateMobileBox)({
                closeLink: 1,
                onDone: function() {
                    return Object(n.ge)("change_phone_wrap").parentNode.removeChild(Object(n.ge)("change_phone_wrap"))
                }
            });
            if ("upload_video" === r) return VideoUpload.showBox();
            if (!1 === r || !1 === s) {
                var _ = !window.wkcur || !wkcur.shown || layers.fullhide !== WkView.hide;
                !layers.fullhide || !_ && !1 !== s || t.asBox || (!t.hist || o.z || o.w || -1 !== o[0].indexOf("/") || o[0].match(/^(photo|video)(-?\d+_\d+)$/) || layerQueue.clear(), layers.fullhide(!!t.hist && 2));
                var l = Object(f.curBox)();
                return l && l.wkRaw && l.hide(), !1
            }
            if (r && c) {
                var m = function() {
                    return delete nav.objLoc.z, nav.setLoc(nav.objLoc), !0
                };
                switch (c[1]) {
                    case "photo":
                        return Object(b.showPhoto)(c[2], c[3], Object(i.extend)(t, {
                            onFail: m,
                            noHistory: !0
                        })), !1;
                    case "albums":
                        return Object(b.showAlbums)(c[2], Object(i.extend)(t, {
                            onFail: m,
                            noHistory: !0
                        })), !1;
                    case "album":
                        return Object(b.showAlbum)(c[2], Object(i.extend)(t, {
                            onFail: m,
                            noHistory: !0
                        })), !1;
                    case "tag":
                    case "photo_tag":
                        return Object(b.showPhotoTags)(c[2], Object(i.extend)(t, {
                            onFail: m,
                            noHistory: !0
                        })), !1;
                    case "video":
                        var O = c[3],
                            E = Object(i.extend)(t, {
                                onFail: m,
                                noLocChange: 1,
                                focusPlay: 1
                            });
                        if (O) {
                            var j = [],
                                y = "";
                            if (Object(i.each)(O.split("/"), function(e, t) {
                                    0 === t.indexOf("pl_") ? y = t : j.push(t)
                                }), O = j.join("/"), y) {
                                y = y.substr("pl_".length);
                                var P = cur.currentModule ? cur.currentModule() : cur.module;
                                E = Object(i.extend)(E, {
                                    playlistId: y,
                                    module: P,
                                    addParams: {
                                        force_no_repeat: 1,
                                        show_next: 1,
                                        playlist_id: y
                                    }
                                })
                            }
                        }
                        return Object(h.showVideo)(c[2], O, E), !1;
                    case "single":
                        return void 0 === s && stManager.add(["single_pv.css", "single_pv.js"], Object(n.ge)(r).onclick), !1;
                    case "accept_money":
                        return Object(w.moneyTransferBox)(c[2], c[3]), !1;
                    case "audio_playlist":
                        var M = c[2].split("_"),
                            C = g(M, 2),
                            D = C[0],
                            T = C[1];
                        return AudioUtils.showAudioPlaylist(D, T, c[3], void 0, void 0, t.onDone), !1;
                    case "article_edit":
                        return b.openArticleEditor.apply(null, c[2].split("_")), !1;
                    case "podcast":
                        return stManager.add([jsc("web/podcast.js"), "page.css"], function() {
                            Podcast.show(null, c[2], null, "url")
                        }), !1
                }
            }
        }
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "GROUPS_ADMIN_LEVEL_USER", function() {
        return n
    }), o.d(t, "GROUPS_ADMIN_LEVEL_MODERATOR", function() {
        return i
    }), o.d(t, "GROUPS_ADMIN_LEVEL_EDITOR", function() {
        return r
    }), o.d(t, "GROUPS_ADMIN_LEVEL_ADMINISTRATOR", function() {
        return a
    }), o.d(t, "GROUPS_ADMIN_LEVEL_HOST", function() {
        return s
    }), o.d(t, "GROUPS_ADMIN_LEVEL_EVENT_CREATOR", function() {
        return c
    }), o.d(t, "GROUPS_ADMIN_LEVEL_CREATOR", function() {
        return _
    }), o.d(t, "GROUPS_ADMIN_PSEUDO_LEVEL_ADVERTISER", function() {
        return l
    }), o.d(t, "GROUPS_ADMIN_FLAG_ADS", function() {
        return d
    });
    var n = 0,
        i = 1,
        r = 2,
        a = 3,
        s = 4,
        c = 5,
        _ = 6,
        l = 100,
        d = 8;
    t.default = {
        GROUPS_ADMIN_LEVEL_USER: n,
        GROUPS_ADMIN_LEVEL_MODERATOR: i,
        GROUPS_ADMIN_LEVEL_EDITOR: r,
        GROUPS_ADMIN_LEVEL_ADMINISTRATOR: a,
        GROUPS_ADMIN_LEVEL_HOST: s,
        GROUPS_ADMIN_LEVEL_EVENT_CREATOR: c,
        GROUPS_ADMIN_LEVEL_CREATOR: _,
        GROUPS_ADMIN_PSEUDO_LEVEL_ADVERTISER: l,
        GROUPS_ADMIN_FLAG_ADS: d
    }
}, function(e, t, o) {
    var n = o(81)("meta"),
        i = o(134),
        r = o(138),
        a = o(99).f,
        s = 0,
        c = Object.isExtensible || function() {
            return !0
        },
        _ = !o(131)(function() {
            return c(Object.preventExtensions({}))
        }),
        l = function(e) {
            a(e, n, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        d = e.exports = {
            KEY: n,
            NEED: !1,
            fastKey: function(e, t) {
                if (!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                if (!r(e, n)) {
                    if (!c(e)) return "F";
                    if (!t) return "E";
                    l(e)
                }
                return e[n].i
            },
            getWeak: function(e, t) {
                if (!r(e, n)) {
                    if (!c(e)) return !0;
                    if (!t) return !1;
                    l(e)
                }
                return e[n].w
            },
            onFreeze: function(e) {
                return _ && d.NEED && c(e) && !r(e, n) && l(e), e
            }
        }
}, function(e, t, o) {
    "use strict";
    var n = o(99).f,
        i = o(10),
        r = (o(30), o(5)),
        a = o(114),
        s = o(98),
        c = o(156),
        _ = o(188),
        l = o(1),
        d = o(40),
        u = o(42),
        p = o(83),
        f = o(161).fastKey,
        b = p ? "_s" : "size",
        h = function(e, t) {
            var o, n = f(t);
            if ("F" !== n) return e._i[n];
            for (o = e._f; o; o = o.n)
                if (o.k == t) return o
        };
    e.exports = {
        getConstructor: function(e, t, o, l) {
            var d = e(function(e, n) {
                s(e, d, t, "_i"), e._i = i(null), e._f = void 0, e._l = void 0, e[b] = 0, void 0 != n && _(n, o, e[l], e)
            });
            return r(d.prototype, {
                clear: function() {
                    for (var e = this._i, t = this._f; t; t = t.n) t.r = !0, t.p && (t.p = t.p.n = void 0), delete e[t.i];
                    this._f = this._l = void 0, this[b] = 0
                },
                delete: function(e) {
                    var t = h(this, e);
                    if (t) {
                        var o = t.n,
                            n = t.p;
                        delete this._i[t.i], t.r = !0, n && (n.n = o), o && (o.p = n), this._f == t && (this._f = o), this._l == t && (this._l = n), this[b]--
                    }
                    return !!t
                },
                forEach: function(e) {
                    s(this, d, "forEach");
                    for (var t, o = a(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                        for (o(t.v, t.k, this); t && t.r;) t = t.p
                },
                has: function(e) {
                    return !!h(this, e)
                }
            }), p && n(d.prototype, "size", {
                get: function() {
                    return c(this[b])
                }
            }), d
        },
        def: function(e, t, o) {
            var n, i, r = h(e, t);
            return r ? r.v = o : (e._l = r = {
                i: i = f(t, !0),
                k: t,
                v: o,
                p: n = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = r), n && (n.n = r), e[b]++, "F" !== i && (e._i[i] = r)), e
        },
        getEntry: h,
        setStrong: function(e, t, o) {
            l(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this._k, t = this._l; t && t.r;) t = t.p;
                return this._t && (this._l = t = t ? t.n : this._t._f) ? d(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = void 0, d(1))
            }, o ? "entries" : "values", !o, !0), u(t)
        }
    }
}, function(e, t, o) {
    "use strict";
    var n = o(10),
        i = o(73),
        r = o(166),
        a = {};
    o(30)(a, o(146)("iterator"), function() {
        return this
    }), e.exports = function(e, t, o) {
        e.prototype = n(a, {
            next: i(1, o)
        }), r(e, t + " Iterator")
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "showTooltip", function() {
        return a
    }), o.d(t, "showTitle", function() {
        return s
    }), o.d(t, "showHint", function() {
        return c
    });
    var n = o(89),
        i = o(177),
        r = o(80);

    function a(e, t) {
        (vk.loaded || t.noload) && e && (e.temphide || (e.temphide = function() {
            e.showing = !1
        }, Object(i.addEvent)(e, "mouseout", e.temphide)), e.showing = !0, "loadingstat" !== e.tt && (e.tt || (e.tt = "loadingstat"), Object(n.domClosest)("fc_tab", e) && (t.appendEl = bodyNode), cur.cancelTooltip = !1, t.stat && stManager.add(t.stat), stManager.add(["tooltips.js", "tooltips.css"], function() {
            "loadingstat" === e.tt && (e.tt = !1), e.showing && !cur.cancelTooltip && (! function(e) {
                e.temphide && (Object(i.removeEvent)(e, "mouseout", e.temphide), Object(n.removeAttr)(e, "temphide"), Object(n.removeAttr)(e, "showing"))
            }(e), e.tt && e.tt.el && !t.force || (tooltips.create(e, t), t.onCreate && t.onCreate()), tooltips.show(e, t))
        })))
    }

    function s(e, t, o, i) {
        e = Object(n.ge)(e);
        o || (o = [Math.round(20 - Object(n.getSize)(e)[0] / 2), 8]);
        a(e, Object(r.extend)({
            text: function() {
                return t || e.getAttribute("data-title")
            },
            shift: o,
            black: 1
        }, i || {}))
    }

    function c(e, t) {
        e = Object(n.ge)(e), t = t || {};
        a(e, Object(r.extend)({
            text: function() {
                return e.getAttribute("data-title")
            },
            dir: "auto",
            width: 300,
            shift: [22, 8]
        }, t))
    }
}, function(e, t, o) {
    var n = o(146)("unscopables"),
        i = Array.prototype;
    void 0 == i[n] && o(30)(i, n, {}), e.exports = function(e) {
        i[n][e] = !0
    }
}, function(e, t, o) {
    var n = o(99).f,
        i = o(138),
        r = o(146)("toStringTag");
    e.exports = function(e, t, o) {
        e && !i(e = o ? e : e.prototype, r) && n(e, r, {
            configurable: !0,
            value: t
        })
    }
}, , function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "MessageBox", function() {
        return MessageBox
    }), __webpack_require__.d(__webpack_exports__, "showBox", function() {
        return showBox
    }), __webpack_require__.d(__webpack_exports__, "showTabbedBox", function() {
        return showTabbedBox
    }), __webpack_require__.d(__webpack_exports__, "showFastBox", function() {
        return showFastBox
    }), __webpack_require__.d(__webpack_exports__, "showCaptchaBox", function() {
        return showCaptchaBox
    }), __webpack_require__.d(__webpack_exports__, "showReCaptchaBox", function() {
        return showReCaptchaBox
    });
    var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25),
        _debug_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9),
        _dom_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(177),
        _ui_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(137),
        _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(89),
        _fx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(113),
        _utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(80),
        _lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(153),
        _ajax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2),
        _box_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(95),
        _accessibility__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(76);

    function MessageBox(_options) {
        var defaults = {
                title: !1,
                titleControls: "",
                width: 450,
                height: "auto",
                animSpeed: 0,
                bodyStyle: "",
                grey: !1,
                white: !1,
                selfDestruct: !0,
                progress: !1,
                hideOnBGClick: !1,
                hideButtons: !1,
                onShow: !1,
                onHideAttempt: !1,
                onBeforeHide: !1,
                onHide: !1,
                onClean: !1,
                onDestroy: !1
            },
            options = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.extend)(defaults, _options),
            guid = window._message_box_guid++,
            visible = !1,
            btns = {
                ok: [],
                cancel: []
            },
            boxTitleBck = void 0;
        options.progress || (options.progress = "box_progress" + guid);
        var controlsStyle = options.hideButtons ? ' style="display: none"' : "",
            boxContainer = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ce)("div", {
                className: "popup_box_container" + (options.containerClass ? " " + options.containerClass : ""),
                innerHTML: '\n<div class="box_layout" onclick="boxQueue.skip=true;">\n<div class="box_title_wrap">\n  <div class="box_x_button" aria-label="' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_close") + '" tabindex="0" role="button"></div>\n  <div class="box_title_controls"></div>\n  <div class="box_title"></div>\n</div>\n<div class="box_body" style="' + options.bodyStyle + '"></div>\n<div class="box_controls_wrap" ' + controlsStyle + '><div class="box_controls">\n<table cellspacing="0" cellpadding="0" class="fl_r"><tr></tr></table>\n<div class="progress" id="' + options.progress + '"></div>\n<div class="box_controls_text _box_controls_text">' + (options.textControls || "") + "</div>\n</div></div>\n</div>"
            }, {
                display: "none"
            });
        Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(boxContainer);
        var boxLayout = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxContainer),
            boxTitleWrap = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxLayout),
            boxCloseButton = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxTitleWrap),
            boxTitle = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domLC)(boxTitleWrap),
            boxTitleControls = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxCloseButton);
        options.noCloseButton && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(boxCloseButton);
        var boxBody = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxTitleWrap),
            boxControlsWrap = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxBody),
            boxControls = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxControlsWrap),
            boxButtons = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxControls),
            boxProgress = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxButtons),
            boxControlsText = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxProgress);
        boxLayer.appendChild(boxContainer), boxContainer.setAttribute("tabindex", 0), boxContainer.focus(), refreshBox(), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.boxRefreshCoords)(boxContainer);
        var emitter = new EventEmitter;

        function refreshBox() {
            boxTitleBck || (options.title ? (boxTitle.innerHTML = options.title, Object(_dom__WEBPACK_IMPORTED_MODULE_4__.removeClass)(boxBody, "box_no_title"), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxTitleWrap)) : (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.addClass)(boxBody, "box_no_title"), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(boxTitleWrap))), options.titleControls && (boxTitleControls.innerHTML = options.titleControls), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(boxBody, "box_no_buttons", options.hideButtons), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(boxTitleWrap, "box_grey", options.grey), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(boxTitleWrap, "box_white", options.white), boxContainer.style.width = "string" == typeof options.width ? options.width : options.width + "px", boxContainer.style.height = "string" == typeof options.height ? options.height : options.height + "px"
        }

        function _addButton(e, t, o, n) {
            var i = "flat_button";
            "no" === o || "gray" === o ? (i += " secondary", o = "cancel") : o = "ok";
            var r = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ce)("button", {
                className: i,
                innerHTML: e,
                id: n
            });
            return boxButtons.rows[0].insertCell(0).appendChild(r), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.createButton)(r, function() {
                emitter.emit(o, retBox), t.apply(null, arguments)
            }), btns[o].push(r), r
        }

        function setControlsText(e) {
            boxControlsText.innerHTML = e
        }

        function _removeButtons() {
            for (var e = boxButtons.rows[0]; e.cells.length;) Object(_dom__WEBPACK_IMPORTED_MODULE_4__.cleanElems)(e.cells[0]), e.deleteCell(0);
            btns.ok.length = btns.cancel.length = 0
        }
        var destroyMe = function() {
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onClean) && options.onClean(), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onDestroy) && options.onDestroy(), _removeButtons(), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.cleanElems)(boxContainer, boxCloseButton, boxTitleWrap, boxControlsWrap), boxLayer.removeChild(boxContainer), delete window._message_boxes[guid]
            },
            hideMe = function(e, t, o) {
                if (visible) {
                    visible = !1;
                    var n = !0 === e ? 0 : options.animSpeed;
                    options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(document, "click", boxQueue.hideBGClick), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onBeforeHide) && options.onBeforeHide();
                    var i = function() {
                        boxQueue.currHiding === _message_boxes[guid] && (boxQueue.currHiding = !1), _message_boxes[guid].shOther || e || layers.boxhide(), !t && options.selfDestruct ? destroyMe() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(boxContainer), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onHide) && options.onHide(o)
                    };
                    n > 0 ? (boxQueue.currHiding = _message_boxes[guid], Object(_fx__WEBPACK_IMPORTED_MODULE_5__.fadeOut)(boxContainer, n, i)) : i()
                }
            };

        function showMe(e, t, o) {
            if (!visible && window._message_boxes[guid]) {
                visible = !0;
                var n = !0 === e || t ? 0 : options.animSpeed;
                if (options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.addEvent)(document, "click", boxQueue.hideBGClick), t || layers.boxshow(), boxQueue.currHiding) {
                    boxQueue.currHiding.shOther = !0;
                    var i = boxQueue.currHiding.bodyNode.parentNode.parentNode;
                    Object(_dom__WEBPACK_IMPORTED_MODULE_4__.data)(i, "tween").stop(!0)
                }
                n > 0 ? Object(_fx__WEBPACK_IMPORTED_MODULE_5__.fadeIn)(boxContainer, n) : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxContainer), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.boxRefreshCoords)(boxContainer), options.onShow && options.onShow(o)
            }
        }
        Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.addEvent)(boxCloseButton, "click", boxQueue.hideLast);
        var retBox = window._message_boxes[guid] = {
            guid: guid,
            _show: showMe,
            _hide: hideMe,
            bodyNode: boxBody,
            controlsTextNode: boxControlsText,
            titleWrap: boxTitleWrap,
            btns: btns,
            show: function() {
                return boxQueue._show(guid), this
            },
            progress: boxProgress,
            showCloseProgress: _dom__WEBPACK_IMPORTED_MODULE_4__.addClass.pbind(boxTitleWrap, "box_loading"),
            hideCloseProgress: _dom__WEBPACK_IMPORTED_MODULE_4__.removeClass.pbind(boxTitleWrap, "box_loading"),
            showProgress: function() {
                Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(boxControlsText), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxProgress)
            },
            hideProgress: function() {
                Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(boxProgress), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxControlsText)
            },
            hide: function(e) {
                return !(Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onHideAttempt) && !options.onHideAttempt(e)) && (boxQueue._hide(guid), !0)
            },
            isVisible: function() {
                return visible
            },
            bodyHeight: function() {
                return Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getStyle)(boxBody, "height")
            },
            content: function(e) {
                return options.onClean && options.onClean(), boxBody.innerHTML = e, Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.boxRefreshCoords)(boxContainer), boxContainer.focus(), refreshBox(), Object(_accessibility__WEBPACK_IMPORTED_MODULE_10__.updateAriaElements)(), this
            },
            emit: function(e, t) {
                emitter.emit(e, t)
            },
            addButton: function(e, t, o, n, i) {
                var r = _addButton(e, t || this.hide, o, i);
                return n ? r : this
            },
            setButtons: function(e, t, o, n) {
                var i = this.removeButtons();
                return e ? (i.addButton(e, t), o && i.addButton(o, n, "no"), i) : i.addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("box_close"))
            },
            setControlsText: setControlsText,
            removeButtons: function() {
                return _removeButtons(), this
            },
            setBackTitle: function(e) {
                e ? (boxTitle.innerHTML = '<div class="back">' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_box_title_back") + "</div>", Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass1)("back", boxTitle).onclick = e, boxTitleBck = options.title, options.title = boxTitle.innerHTML) : boxTitleBck && (boxTitle.innerHTML = options.title = boxTitleBck, boxTitleBck = !1)
            },
            destroy: destroyMe,
            getOptions: function() {
                return options
            },
            on: function(e, t) {
                emitter.on(e, t)
            },
            once: function(e, t) {
                emitter.once(e, t)
            },
            updateBoxCoords: function() {
                Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.boxRefreshCoords)(boxContainer)
            },
            setOptions: function(e) {
                if (options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(document, "click", boxQueue.hideBGClick), options = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.extend)(options, e), "bodyStyle" in e)
                    for (var t = options.bodyStyle.split(";"), o = 0, n = t.length; o < n; o++) {
                        var i = t[o].split(":");
                        i.length > 1 && i[0].length && (boxBody.style[Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.trim)(i[0])] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.trim)(i[1]), boxBody.style.setProperty && boxBody.style.setProperty(Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.trim)(i[0]), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.trim)(i[1]), ""))
                    }
                return options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.addEvent)(document, "click", boxQueue.hideBGClick), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.toggle)(boxControlsWrap, !options.hideButtons), refreshBox(), options.noRefreshCoords || Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.boxRefreshCoords)(boxContainer), this
            },
            evalBox: function evalBox(js, url, params) {
                var scr = "((function() { return function() { var box = this; " + (js || "") + ";}; })())";
                if (__debugMode) {
                    var fn = eval(scr);
                    fn.apply(this, [url, params])
                } else try {
                    var _fn = eval(scr);
                    _fn.apply(this, [url, params])
                } catch (e) {
                    Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.topError)(e, {
                        dt: 15,
                        type: 7,
                        url: url,
                        query: params ? Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.ajx2q)(params) : void 0,
                        js: js
                    }), Object(_debug_tools__WEBPACK_IMPORTED_MODULE_1__.logEvalError)(e, scr)
                }
            }
        };
        return retBox
    }

    function showBox(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            n = arguments[3];
        if (Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.checkEvent)(n)) return !1;
        var i = o.params || {};
        o.containerClass && (i.containerClass = o.containerClass);
        var r = new MessageBox(i),
            a = {
                onDone: function(n, a, s, c) {
                    if (o.preOnDone && o.onDone && o.onDone(r), r.isVisible())
                        if (__debugMode) _();
                        else try {
                            _()
                        } catch (o) {
                            Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.topError)(o, {
                                dt: 15,
                                type: 103,
                                url: e,
                                query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.ajx2q)(t),
                                answer: Array.prototype.slice.call(arguments).join("<!>")
                            }), r.isVisible() && r.hide()
                        } else o.onDone && o.onDone(r, c);

                    function _() {
                        Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.addClass)(bodyNode, "layers_shown"), r.setOptions({
                            title: n,
                            hideButtons: i.hideButtons || !1
                        }), o.showProgress ? r.show() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(r.bodyNode), r.content(a), r.evalBox(s, e, t), o.onDone && o.onDone(r, c)
                    }
                },
                onFail: function(e) {
                    if (r.failed = !0, setTimeout(r.hide, 0), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(o.onFail)) return o.onFail(e)
                },
                cache: o.cache,
                stat: o.stat,
                fromBox: !0
            };
        return o.prgEl && (o.showProgress = _ui_util__WEBPACK_IMPORTED_MODULE_3__.showGlobalPrg.pbind(o.prgEl, {
            cls: o.prgClass,
            w: o.prgW,
            h: o.prgH,
            hide: !0
        }), o.hideProgress = _dom__WEBPACK_IMPORTED_MODULE_4__.hide.pbind("global_prg")), o.showProgress ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.extend)(a, {
            showProgress: o.showProgress,
            hideProgress: o.hideProgress
        }) : (r.setOptions({
            title: !1,
            hideButtons: !0
        }).show(), boxQueue.count() < 2 && (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.removeClass)(bodyNode, "layers_shown")), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(r.bodyNode), a.showProgress = function() {
            Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxLoader), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.boxRefreshCoords)(boxLoader)
        }, a.hideProgress = _dom__WEBPACK_IMPORTED_MODULE_4__.hide.pbind(boxLoader)), r.removeButtons().addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_close")), ajax.post(e, t, a), r
    }

    function showTabbedBox(e, t, o, n) {
        return (o = o || {}).stat = o.stat || [], o.stat.push("box.js", "boxes.css"), showBox(e, t, o, n)
    }

    function showFastBox(e, t, o, n, i, r) {
        return new MessageBox("string" == typeof e ? {
            title: e
        } : e).content(t).setButtons(o, n, i, r).show()
    }

    function showCaptchaBox(e, t, o, n) {
        var i = function(t) {
                if (!t || void 0 === t.keyCode || 10 === t.keyCode || 13 === t.keyCode) {
                    var i = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", o.bodyNode);
                    if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.trim)(i.value) || !0 === t) {
                        var r = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", o.bodyNode)[0];
                        Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(i), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(r), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass1)("progress", o.bodyNode)), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(i), n.onSubmit(e, i.value)
                    } else Object(_dom__WEBPACK_IMPORTED_MODULE_4__.elfocus)(i)
                }
            },
            r = !!o,
            a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.intval)(t) ? "" : "&s=1",
            s = n.imgSrc || "/captcha.php?sid=" + e + a;
        if (!r) {
            var c = '\n<div class="captcha">\n  <div><img src="' + s + '"/></div>\n  <div>\n    <input type="text" class="big_text" maxlength="7" placeholder="' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_captcha_input_here") + '" />\n    <div class="progress" /></div>\n  </div>\n</div>' + (n.addText || "");
            o = showFastBox({
                title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("captcha_enter_code"),
                width: 305,
                onHide: n.onHide,
                onDestroy: n.onDestroy || !1
            }, c, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("captcha_send"), function() {
                o.submit()
            }, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("captcha_cancel"), function() {
                var e = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", o.bodyNode),
                    t = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", o.bodyNode);
                Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(e), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(t), o.hide()
            })
        }
        o.submit = i.pbind(!0), o.changed = !0;
        var _ = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", o.bodyNode),
            l = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", o.bodyNode);
        return r && (_.value = "", l.src = "/captcha.php?sid=" + e + a, Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass1)("progress", o.bodyNode))), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(_), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.addEvent)(_, "keypress", i), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.addEvent)(l, "click", function() {
            this.src = "/captcha.php?sid=" + e + a + "&v=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.irand)(1e6, 2e6)
        }), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.elfocus)(_), o
    }

    function showReCaptchaBox(e, t, o, n) {
        window.recaptchaResponse = function(e) {
            n.onSubmit(e)
        };
        var i = !!o,
            r = !!window.grecaptcha;
        if (!i) {
            r || (window.recaptchaCallback = function() {
                var t = Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.curBox)();
                if (t) {
                    var o = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass1)("recaptcha", t.bodyNode);
                    o && (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.val)(o, ""), window.grecaptcha.render(o, {
                        sitekey: e,
                        callback: window.recaptchaResponse
                    }))
                }
            }, headNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ce)("script", {
                type: "text/javascript",
                src: "https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit&hl=" + t
            })));
            var a = '<div class="recaptcha"></div>' + (n.addText || "");
            o = showFastBox({
                title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_recaptcha_title"),
                width: 354,
                onHide: n.onHide,
                onDestroy: n.onDestroy || !1
            }, a, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("captcha_cancel"));
            var s = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass1)("recaptcha", o.bodyNode);
            s.id = "recaptcha" + (o.guid ? o.guid : "0"), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.showProgress)(s)
        }
        return i && r ? window.grecaptcha.reset() : r && window.recaptchaCallback(), o.changed = !0, o
    }
}, function(e, t) {}, function(e, t, o) {
    "use strict";
    o.r(t), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(e, t) {
            for (var o = 0; o < this.length; ++o)
                if (e.call(t, this[o], o, this)) return o;
            return -1
        }
    }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(e, t) {
            for (var o = 0; o < this.length; ++o)
                if (e.call(t, this[o], o, this)) return this[o]
        }
    })
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "initTopNotifier", function() {
        return u
    }), o.d(t, "isPhotoeditor3Available", function() {
        return p
    }), o.d(t, "showPhoto", function() {
        return f
    }), o.d(t, "showManyPhoto", function() {
        return b
    }), o.d(t, "showAlbums", function() {
        return h
    }), o.d(t, "showAlbum", function() {
        return w
    }), o.d(t, "showPhotoTags", function() {
        return m
    }), o.d(t, "showVideoTags", function() {
        return v
    }), o.d(t, "videoCallback", function() {
        return O
    }), o.d(t, "showWiki", function() {
        return g
    }), o.d(t, "showApp", function() {
        return E
    }), o.d(t, "showPodcast", function() {
        return j
    }), o.d(t, "podcastStartFrom", function() {
        return y
    }), o.d(t, "articlePrepare", function() {
        return P
    }), o.d(t, "isArticleEditorAvailable", function() {
        return M
    }), o.d(t, "openArticleEditor", function() {
        return C
    }), o.d(t, "bookmark", function() {
        return D
    }), o.d(t, "bookmarkPost", function() {
        return T
    }), o.d(t, "bookmarkArticle", function() {
        return k
    }), o.d(t, "bookmarkLink", function() {
        return L
    }), o.d(t, "bookmarkPodcast", function() {
        return x
    }), o.d(t, "bookmarkNarrative", function() {
        return A
    }), o.d(t, "shareAudioPlaylist", function() {
        return B
    }), o.d(t, "getAudioPlayer", function() {
        return I
    }), o.d(t, "deleteAudioOnClaim", function() {
        return S
    }), o.d(t, "initTopAudioPlayer", function() {
        return R
    }), o.d(t, "AudioMessagePlayer", function() {
        return W
    }), o.d(t, "mentionClick", function() {
        return U
    }), o.d(t, "isArticleLayerOpen", function() {
        return K
    });
    var n = o(177),
        i = o(80),
        r = o(168),
        a = o(89),
        s = o(58),
        c = o(25),
        _ = o(153),
        l = o(2),
        d = o(95);

    function u() {
        var e = ["notifier.js", "notifier.css"];
        return {
            preload: function() {
                stManager.add(e, function() {
                    return window.TopNotifier.preload()
                })
            },
            show: function(t) {
                if (!0 !== Object(n.checkEvent)(t)) return stManager.add(e, function() {
                    return window.TopNotifier.show(t)
                }), Object(n.cancelEvent)(t)
            },
            showTooltip: function(t) {
                stManager.add(e, function() {
                    return window.TopNotifier.showTooltip(t)
                })
            },
            invalidate: function() {},
            setCount: function() {}
        }
    }

    function p() {
        return !s.browser.msie || parseInt(s.browser.version) > 10
    }

    function f(e, t, o, r) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (!(Object(n.checkEvent)(r) || cur._editMode && cur._editMode(r))) {
            var a = ["photoview.js", "photoview.css", "page.js", "page.css"];
            if (o.img && (o.showProgress = function() {
                    Object(c.showProgress)(o.img)
                }, o.hideProgress = function() {
                    Object(c.hideProgress)(o.img)
                }), !e) return !1;
            if (window.Photoview && !1 === Photoview.showPhoto(e, t, o)) return !1;
            var s = !0;
            o.temp && !(cur.pvNoTemp || {})[e] && stManager.add(a, function() {
                Object(i.extend)(cur, {
                    pvCancelLoad: function() {
                        s = !1
                    },
                    pvData: cur.pvData || {},
                    pvOptions: cur.pvOptions || {}
                }), cur.pvData.temp = [o.temp], cur.pvOptions.temp_final = o.temp_final, cur.pvOptions.temp_summary = o.temp_summary, cur.pvOptions.queue = o.queue, Photoview.show("temp", 0)
            });
            var _ = 1;
            return o && o.additional && o.additional.open_pe && (_ = 0), Object(i.extend)(o, {
                onDone: function(n) {
                    Photoview.list(e, t, n), o.blog_text && arguments[3] && arguments[3][0] && (arguments[3][0].album = o.blog_text), Photoview.loaded.apply(window, arguments), s && ("deleted" === n ? Photoview.showDeleted.apply(window, arguments) : Photoview.showPhoto(e, t, o, !0))
                },
                stat: a,
                cache: _
            }), o.temp_final ? !1 : (ajax.post("al_photos.php", Object(i.extend)({
                act: "show",
                gid: cur.gid,
                photo: e,
                list: t,
                module: cur.module || "",
                list_info: o.list_info || null
            }, o.additional), o), !1)
        }
    }

    function b(e, t, o, n) {
        Page.showManyPhoto(e, t, o, n)
    }

    function h(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : Object(n.checkEvent)(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
            Photoview.showAlbums(e, t)
        }), !1)
    }

    function w(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : Object(n.checkEvent)(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
            Photoview.showAlbum(e, t)
        }), !1)
    }

    function m(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : Object(n.checkEvent)(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
            Photoview.showTagged(e, t)
        }), !1)
    }

    function v(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : Object(n.checkEvent)(o) ? void 0 : (stManager.add(["video.js", "video.css", "photoview.js", "photoview.css"], function() {
            Photoview.showVideoTags(e, t)
        }), !1)
    }

    function O(e) {
        var t = e.shift();
        if (window.Videoview && Videoview.playerCallback[t]) return Videoview.playerCallback[t].apply(Videoview, e);
        throw Error("Unregistered player callback: " + t)
    }

    function g(e, t, o) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        if (Object(n.checkEvent)(o)) return !0;
        if (0 !== cur.gid && (e.gid = cur.gid), window.wkcur && wkcur.shown && wkcur.wkRaw === e.w && e.w && !e.reply) return WkView.restoreLayer(r), Object(n.cancelEvent)(o);
        (window.wkcur && wkcur.hideTitle || e.hide_title) && (r.hide_title = e.hide_title = 1);
        var a = r.stat || ["wkview.js", "wkview.css", "wk.css", "wk.js"];
        t && a.push("wk_editor.js", "wk_editor.css");
        var s = {
            stat: a,
            loader: !r.noloader,
            onDone: function(e, t, n, a) {
                WkView.show(e, t, Object(i.extend)(n, r), a, o)
            },
            onFail: function(e) {
                return WkView.showError(e)
            }
        };
        if (nav.objLoc.claim && (e.claim = nav.objLoc.claim), e.w && "/query" === e.w.substr(-6)) {
            var c = Object(i.clone)(nav.objLoc);
            delete c[0], delete c.w, e.query = JSON.stringify(c)
        }
        r.preload && Object(i.extend)(s, r.preload);
        var _ = void 0,
            l = void 0;
        return r.ads_params && (_ = r.ads_params, (l = nav.getPostParams(o && o.target)).post_click_url && (_._post_click_url = l.post_click_url)), ajax.post("wkview.php", Object(i.extend)({
            act: "show",
            loc: nav.objLoc[0],
            is_znav: r.isZnav
        }, e, _, cur.getWkviewOpts && cur.getWkviewOpts()), s), Object(n.cancelEvent)(o)
    }

    function E(e, t, o, n, r, a) {
        a || (a = {});
        var s = !1,
            c = Object(i.extend)({
                w: "app" + t
            }, a);
        if (o = Object(i.intval)(o), n && (Object(i.isObject)(n) ? c = Object(i.extend)(c, n) : c.ref = n), a.layer && (s = !0), (cur.apps && cur.apps[t] || !o) && !s) {
            delete c.w;
            var _ = "app" + t + (r ? "_" + r : ""),
                l = nav.objLoc && !nav.objLoc[1] && nav.objLoc[0] === _;
            return nav.go("/" + _ + nav.toStr(c), e, {
                nocur: l
            })
        }
        r && (c.mid = r);
        var d = {
            stat: ["wkview.js", "wkview.css", "apps.js", "apps.css"]
        };
        return a.queue && (d.queue = 1), a.urlHash && (c.url_hash = a.urlHash), g(c, !1, e, d)
    }

    function j(e, t, o, i, r) {
        if (!vk.widget) return Object(a.show)(boxLoader), Object(a.show)(boxLayerWrap), Object(d.boxRefreshCoords)(boxLoader), stManager.add([jsc("web/podcast.js")], function() {
            Podcast.show(e, t, null, i, r)
        }), o && Object(n.cancelEvent)(o)
    }

    function y(e, t, o, i) {
        return stManager.add([jsc("web/podcast.js")], function() {
            Podcast.goToTime(e, t, o, i)
        }), o && Object(n.cancelEvent)(o)
    }

    function P(e) {
        e && !vk.isBanned && stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
            window.ArticleLayer.prepare(e)
        })
    }

    function M() {
        return !(s.browser.msie && parseInt(s.browser.version) <= 11)
    }

    function C(e, t, o) {
        if (cur.articleEditorLayer) cur.articleEditorLayer.open(e, t);
        else {
            var n = [jsc("web/article_editor_layer.js"), "article.css", "article_editor.css"];
            stManager.add(n, function() {}), ajax.post("al_articles.php", {
                act: "open_editor",
                article_owner_id: e,
                article_id: t,
                from_post_convert: o ? 1 : 0,
                post_data_medias: o ? o.medias.join(",") : ""
            }, {
                loader: !0,
                onFail: function(e) {
                    return Object(r.showFastBox)(Object(_.getLang)("global_error"), e), !0
                },
                onDone: function(e, t, i, r) {
                    window.WkView && WkView.hide(), window.boxQueue && boxQueue.hideAll(), o && (r.postData = o), r.articleOwnerId ? stManager.add(n, function() {
                        layers.fullhide = function() {
                            cur.articleEditorLayer && cur.articleEditorLayer.hide()
                        }, cur.articleEditorLayer = new ArticleEditorLayer(e, t, i, r, function() {
                            return delete cur.articleEditorLayer
                        })
                    }) : nav.change({
                        z: !1
                    })
                }
            })
        }
    }

    function D(e, t, o, n) {
        var r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "";
        ajax.post("al_bookmarks.php", {
            act: "bookmark",
            owner_id: e,
            object_id: t,
            type: o,
            state: r ? 1 : 0,
            hash: n,
            item_access_hash: s
        }, {
            onDone: function(o, n, r, s) {
                if (o) {
                    var c = window.showDoneBox(o),
                        _ = Object(a.geByClass1)("bookmarks_tag_set", c);
                    if (_ && !isEmpty(n)) {
                        var l = [];
                        each(n, function(e, t) {
                            l.push(t)
                        }), l.sort(function(e, t) {
                            return e.order - t.order
                        });
                        for (var d = '<div class="bookmarks_tags_list">', u = 0; u < l.length; u++) {
                            var p = l[u];
                            d += '<div class="bookmarks_tags_list_item" data-id="' + p.id + '">' + p.name + "</div>"
                        }
                        d += "</div>", (d = se(d)).addEventListener("click", function(o) {
                            var n = domClosest("bookmarks_tags_list_item", o.target);
                            if (n) {
                                var c = Object(a.domData)(n, "id"),
                                    _ = toggleClass(n, "bookmarks_tags_list_item--selected");
                                ajax.post("al_bookmarks.php", {
                                    act: "set_tag",
                                    item_type: r,
                                    item_oid: e,
                                    item_id: t,
                                    hash: s,
                                    tag_id: c,
                                    is_tagged: Object(i.intval)(!_)
                                })
                            }
                        }), cur.setBookmarksTagTooltip && cur.setBookmarksTagTooltip.destroy(), stManager.add(["ui_common.css", "ui_common.js"], function() {}), cur.setBookmarksTagTooltip = new ElementTooltip(_, {
                            content: d,
                            appendToParent: !0,
                            cls: "bookmarks_tag_set_tt",
                            offset: [0, -26],
                            onFirstTimeShow: function(e) {
                                stManager.add(["ui_common.css", "ui_common.js"], function() {
                                    cur.setBookmarksTagTooltipScroll = new uiScroll(domFC(e), {
                                        theme: "dark"
                                    })
                                })
                            }
                        }), cur.destroy.push(function() {
                            cur.setBookmarksTagTooltip.destroy()
                        })
                    }
                }
            }
        })
    }

    function T(e, t, o, n, r, s) {
        if (Object(i.isObject)(window.cur) && Object(i.isFunction)(window.cur.viewAsBox)) return window.cur.viewAsBox();
        var c = parseInt(Object(a.domData)(e, "state"));
        e.innerHTML = c ? Object(a.domData)(e, "add") : Object(a.domData)(e, "remove"), Object(a.domData)(e, "state", c ? 0 : 1), D(t, o, n, r, c, s)
    }

    function k(e, t, o, i, r, s, c) {
        return t && (c = parseInt(Object(a.domData)(t, "state")), Object(a.domData)(t, "state", c ? 0 : 1)), D(o, i, r, s, c), each(geByClass("_article_" + o + "_" + i), function(e, t) {
            var o = Object(a.geByClass1)("_bookmark_btn", t);
            Object(a.domData)(o, "state", c ? 0 : 1)
        }), Object(n.cancelEvent)(e)
    }

    function L(e, t, o) {
        var i = parseInt(Object(a.domData)(t, "state"));
        return Object(a.domData)(t, "state", i ? 0 : 1), ajax.post("al_bookmarks.php", {
            act: "bookmark_link",
            state: i ? 1 : 0,
            hash: o,
            url: Object(a.domData)(t, "link-url"),
            img: Object(a.domData)(t, "link-img"),
            title: Object(a.domData)(t, "link-title")
        }, {
            onDone: function(e) {
                e && window.showDoneBox(e)
            }
        }), Object(n.cancelEvent)(e)
    }

    function x(e, t, o, i, r) {
        return stManager.add([jsc("web/podcast.js")], function() {
            Podcast.toggleFave(e, t, o, r)
        }), i && Object(n.cancelEvent)(i)
    }

    function A(e, t, o, i, r, s) {
        var c = parseInt(Object(a.domData)(t, "state"));
        return Object(a.domData)(t, "state", c ? 0 : 1), D(o, i, r, s, c), Object(n.cancelEvent)(e)
    }

    function B(e, t, o, i) {
        return Object(r.showBox)("like.php", {
            act: "publish_box",
            object: "audio_playlist" + t + "_" + o,
            list: i
        }, {
            stat: ["wide_dd.js", "wide_dd.css", "sharebox.js"]
        }), Object(n.cancelEvent)(e)
    }

    function I() {
        return window.AudioPlayer ? (window.ap = window.ap || new AudioPlayer, window.ap) : vk && vk.audioPlayerStub ? (I.run || Object(i.extend)(I, {
            queue: [],
            run: function() {
                window.ap = new AudioPlayer;
                for (var e = void 0; e = I.queue.shift();) ap[e.name].apply(ap, e.args)
            },
            pushQueue: function(e) {
                for (var t = arguments.length, o = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) o[n - 1] = arguments[n];
                if (vk && vk.widget && !vk.id) return Widgets.oauth(), !1;
                I.queue.push({
                    name: e,
                    args: o
                })
            },
            wrapper: {
                toggleAudio: function() {
                    for (var e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                    I.pushQueue.apply(I, ["toggleAudio"].concat(t))
                },
                updateCurrentPlaying: function() {
                    for (var e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                    I.pushQueue.apply(I, ["updateCurrentPlaying"].concat(t))
                },
                playPlaylist: function() {
                    for (var e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                    I.pushQueue.apply(I, ["playPlaylist"].concat(t))
                },
                showHQLabel: function() {
                    return !1
                },
                isPlaying: function() {
                    return !1
                }
            }
        }), stManager.add(["audioplayer.js", "audioplayer.css", "ui_common.js", "ui_common.css"], I.run), I.wrapper) : {}
    }

    function S(e, t) {
        var o = e + "_" + t,
            n = Object(a.geByClass1)("_audio_row_" + o);
        AudioUtils.deleteAudio(n, AudioUtils.getAudioFromEl(n, !0)), cur.claimWarning && cur.claimWarning.hide()
    }

    function R() {
        stManager.add(["audioplayer.js"], function() {
            window.TopAudioPlayer.init()
        })
    }
    var W = {
        loaded: !1,
        togglePlay: function(e, t) {
            stManager.add("voice_message_player.js", function() {
                return window.AudioMessagePlayer.togglePlay(e, t)
            })
        },
        detachPlayer: function(e) {
            stManager.add("voice_message_player.js", function() {
                return window.AudioMessagePlayer.detachPlayer(e)
            })
        }
    };

    function U(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        e && e.tt && e.tt.hide && e.tt.hide({
            fasthide: 1
        });
        var n = e,
            r = !1;
        if (K() && ArticleLayer.isStandalone() && (r = !0), n.tagName && "a" === n.tagName.toLowerCase() && !n.getAttribute("target") && !nav.baseBlank) {
            var a = n.getAttribute("hrefparams");
            a && (o.params = Object(i.extend)(o.params || {}, Object(l.q2ajx)(a))), (n = (n = n.href || "").replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (n = n.replace(location.hostname, ""));
            var s = void 0;
            (n = n.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/")).match(/#$/) || !(s = n.match(/^\/(.*?)(\?|#|$)/)) ? r = !0 : ((s = s[1]).indexOf(".php") > 0 || s.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images|utils|\.js|js\/|\.css|css\/)/)) && (r = !0)
        }
        if (r) {
            if (!!!(o && o.params && o.params._post && o.params._post_click_type)) return !0;
            e.setAttribute("data-change-location-with-post-away", 1), n = e
        }
        return nav.go(n, t, o)
    }

    function K() {
        return window.ArticleLayer && window.ArticleLayer.isShown()
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "showVideo", function() {
        return showVideo
    }), __webpack_require__.d(__webpack_exports__, "showInlineVideo", function() {
        return showInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "loadInlineVideo", function() {
        return loadInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "revertLastInlineVideo", function() {
        return revertLastInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "destroyInlineVideoPlayer", function() {
        return destroyInlineVideoPlayer
    }), __webpack_require__.d(__webpack_exports__, "pauseLastInlineVideo", function() {
        return pauseLastInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "playLastInlineVideo", function() {
        return playLastInlineVideo
    }), __webpack_require__.d(__webpack_exports__, "checkMp4", function() {
        return checkMp4
    }), __webpack_require__.d(__webpack_exports__, "VideoConstants", function() {
        return VideoConstants
    }), __webpack_require__.d(__webpack_exports__, "initVideo", function() {
        return initVideo
    });
    var _videoplayer_lib_player_states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(181),
        _dom_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(177),
        _utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80),
        _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(89),
        _lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(153),
        _message_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(168),
        _layout_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(54),
        _browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(58),
        _ls__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(129);

    function showVideo(e, t, o, n) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (!Object(_dom_events__WEBPACK_IMPORTED_MODULE_1__.checkEvent)(n)) {
            if (window.mvcur && mvcur.mvShown && mvcur.minimized && mvcur.videoRaw == e) return Videoview.unminimize(), !1;
            o || (o = {});
            var i = nav.objLoc.claim,
                r = !(!o.addParams || !/^-?\d+_\d+$/.test(o.addParams.post_id)) && o.addParams.post_id;
            if (!o.playlistId && r && (/^public|groups|profile$/.test(cur.module) && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hasClass)("post" + r, "own") ? o.playlistId = "wall_" + cur.oid : o.playlistId = "post_" + o.addParams.post_id), o.playlistId && (o.addParams = Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.extend)(o.addParams, {
                    playlist_id: o.playlistId
                }), !window.VideoPlaylist || !VideoPlaylist.getList(o.playlistId)))
                if (/^wall_/.test(o.playlistId)) {
                    var a = cur.wallVideos && cur.wallVideos[o.playlistId];
                    o.addParams.load_playlist = a && a.list.length >= 50 ? 0 : 1
                } else o.addParams.load_playlist = !/^(?:post_)?-?\d+_-?\d+$/.test(o.playlistId) || cur.pageVideosList && cur.pageVideosList[o.playlistId] ? 0 : 1;
            !o.expandPlayer && cur.videoInlinePlayer && cur.videoInlinePlayer.getVideoId() == e && cur.videoInlinePlayer.canExpand() && (o.expandPlayer = cur.videoInlinePlayer), o.expandPlayer && (o.addParams = Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.extend)(o.addParams, {
                expand_player: 1
            }), delete cur.videoInlinePlayer);
            var s = new CallHub(function() {
                o.hidden ? o.hidden(s.data, o, t, e) : Videoview.showVideo.apply(Videoview, s.data)
            }, 2);
            stManager.add(["videoview.js", "videoview.css", "page.js", "page.css"], function() {
                s.failed || (o.hidden || (revertLastInlineVideo(), Videoview.show(n, e, t, o)), s.done())
            }), Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.extend)(o, {
                onDone: function() {
                    var t = Array.prototype.slice.call(arguments);
                    t.unshift(e), s.data = t, s.done()
                },
                onFail: function(t) {
                    if (s.failed = 1, !o.hidden) {
                        if (window.mvcur && mvcur.mvShown) Videoview.hide();
                        else {
                            var n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.clone)(nav.objLoc);
                            n.z == "video" + e && delete n.z, n[0] == "video" + e && (n[0] = "videos" + e.split("_")[0]), nav.setLoc(n)
                        }
                        Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showFastBox)(Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_error"), t || Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_error_occured"))
                    }
                    return !0
                },
                cache: "status" != t
            });
            var c = o.params;
            return c || (c = {
                act: "show",
                video: e,
                list: t,
                autoplay: o.autoplay ? 1 : 0,
                ad_video: o.ad_video,
                module: o.module || currentModule() || "",
                svids: o.svids
            }), o.addParams && (c = Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.extend)(c, o.addParams)), Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.trim)(c.module) || Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.extend)(c, {
                _nol: JSON.stringify(nav.objLoc)
            }), i && (c.claim = i), ajax.post("al_video.php", c, o), Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.vkImage)().src = locProtocol + "//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-", window.isArticleLayerOpen() && ArticleLayer.videoOpened(), !1
        }
    }

    function showInlineVideo(videoId, listId, options, ev, thumb) {
        if (Object(_dom_events__WEBPACK_IMPORTED_MODULE_1__.checkEvent)(ev)) return !0;
        if (window.mvcur && mvcur.mvShown) return showVideo(videoId, listId, options, ev);
        if (Object(_dom__WEBPACK_IMPORTED_MODULE_3__.attr)(thumb, "data-loading")) return !1;
        options = options || {};
        var h = thumb.clientHeight,
            w = thumb.clientWidth,
            btn = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.domByClass)(thumb, "page_post_video_play_inline"),
            onLoaded = options.onLoaded;
        onLoaded && delete options.onLoaded;
        var params = {
            video: videoId,
            list: listId,
            autoplay: options.autoplay,
            module: options.module
        };
        return Object(_dom__WEBPACK_IMPORTED_MODULE_3__.domData)(thumb, "stretch-vertical") && (params.stretch_vertical = 1), Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.extend)(params, options.addParams), showProgress(), loadInlineVideo(params, function(e, t) {
            hideProgress(), e ? onDone.apply(null, t) : onFail.apply(null, t)
        }, options.cache), cur.videoInlinePlayerDestroyerSet || (cur.destroy.push(destroyInlineVideoPlayer), cur.videoInlinePlayerDestroyerSet = 1), Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.vkImage)().src = "//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-", !1;

        function onDone(title, html, js, opts) {
            revertLastInlineVideo(), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hide)(thumb);
            var videoWrap = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ce)("div", {
                innerHTML: html,
                className: "inline_video_wrap"
            }, {
                width: w,
                height: h
            });
            if (window._videoLastInlined = [videoWrap, thumb], thumb.parentNode.appendChild(videoWrap), cur.mvOpts = !(!opts || !opts.mvData) && opts.mvData, opts.player) {
                var container = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.domByClass)(videoWrap, "video_box_wrap");
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.isFunction)(onLoaded) && (opts.player.params[0].onPlayerLoaded = onLoaded);
                var linkAttr = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.attr)(thumb, "data-link-attr");
                linkAttr && (opts.player.params[0].link_attr = linkAttr), VideoInitializer.initPlayer(container, opts.player.type, opts.player.params)
            }
            try {
                eval("(function () {" + js + "})();")
            } catch (e) {}
            if (!params.from_autoplay) {
                var notifier = window.Notifier;
                notifier && setTimeout(function() {
                    return notifier.lcSend("video_start")
                }, 0);
                var audioPlayer = window.ap;
                audioPlayer && audioPlayer.isPlaying() && (audioPlayer.pause(), audioPlayer.pausedByVideo = Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.vkNow)())
            }
            thumb.setAttribute("data-playing", 1)
        }

        function onFail(e) {
            params.from_autoplay || Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showFastBox)(Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_error"), e || Object(_lang__WEBPACK_IMPORTED_MODULE_4__.getLang)("global_error_occured"))
        }

        function showProgress() {
            thumb.setAttribute("data-loading", 1), options.no_progress || (Object(_dom__WEBPACK_IMPORTED_MODULE_3__.addClass)(btn, "page_post_video_play_inline_loading"), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.val)(btn, Object(_layout_utils__WEBPACK_IMPORTED_MODULE_6__.getProgressHtml)()))
        }

        function hideProgress() {
            thumb.removeAttribute("data-loading"), options.no_progress || (Object(_dom__WEBPACK_IMPORTED_MODULE_3__.removeClass)(btn, "page_post_video_play_inline_loading"), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.val)(btn, ""))
        }
    }

    function loadInlineVideo(e, t, o) {
        var n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.extend)({
            autoplay: 0,
            module: cur.module
        }, e);
        Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.trim)(n.module) || (n._nol = JSON.stringify(nav.objLoc));
        var i = ["videoview.js"];

        function r(e, o) {
            Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.isFunction)(t) && t(e, o)
        }
        n.from_autoplay && i.push("videoplayer.js", "videoplayer.css", "hls.min.js"), ajax.post("al_video.php?act=show_inline", n, {
            onDone: function() {
                r(!0, [].slice.call(arguments))
            },
            onFail: function() {
                return r(!1, [].slice.call(arguments)), !0
            },
            stat: i,
            local: 1,
            cache: o
        })
    }

    function revertLastInlineVideo(e) {
        if (_videoLastInlined) {
            var t = void 0,
                o = !1,
                n = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ge)(e);
            if (n && (t = _videoLastInlined[0])) {
                for (; t = t.parentNode;)
                    if (t == n) {
                        o = !0;
                        break
                    }
                if (!o) return
            }
            Object(_dom__WEBPACK_IMPORTED_MODULE_3__.re)(_videoLastInlined[0]), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.show)(_videoLastInlined[1]), _videoLastInlined[1].removeAttribute("data-playing"), _videoLastInlined = !1, destroyInlineVideoPlayer(), delete cur.mvOpts
        }
    }

    function destroyInlineVideoPlayer() {
        cur.videoInlinePlayer && (cur.videoInlinePlayer.destroy(), delete cur.videoInlinePlayer)
    }

    function pauseLastInlineVideo() {
        if (_videoLastInlined) {
            var e = cur.videoInlinePlayer || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ge)("video_yt") && window.VideoYoutube;
            if (e) {
                if (e.isActiveLive && e.isActiveLive()) return;
                cur.mvOpts.lastPlayerState = e.getState(), e.togglePlay(!1)
            }
        }
    }

    function playLastInlineVideo() {
        if (_videoLastInlined && cur.mvOpts && cur.mvOpts.lastPlayerState === _videoplayer_lib_player_states__WEBPACK_IMPORTED_MODULE_0__.PLAYING) {
            var e = cur.videoInlinePlayer || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ge)("video_yt") && window.VideoYoutube;
            e && e.togglePlay(!0)
        }
    }

    function checkMp4(e) {
        if (_browser__WEBPACK_IMPORTED_MODULE_7__.browser.smart_tv) e(!0);
        else if (_ls__WEBPACK_IMPORTED_MODULE_8__.ls.get("video_can_play_mp4")) e(!0);
        else {
            var t = window.sessionStorage && sessionStorage.getItem("video_can_play_mp4");
            if (null == t) {
                var o = void 0,
                    n = void 0,
                    i = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ce)("video");
                i.canPlayType && i.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"').replace("no", "") ? (i.onloadedmetadata = r.pbind(!0), i.onerror = function() {
                    r(!1, "error_" + i.error.code)
                }, i.src = "/images/blank.mp4", i.load(), o = setTimeout(r.pbind(!1, "timeout"), 3e3)) : r(!1, "video_type")
            } else e(!!Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.intval)(t))
        }

        function r(t, r) {
            if (!n) {
                n = !0;
                var a = t ? window.localStorage : window.sessionStorage;
                try {
                    a.setItem("video_can_play_mp4", Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.intval)(t))
                } catch (e) {}
                e(t, r), clearTimeout(o), i.src = "", i.load(), i.onerror = null, i.onloadedmetadata = null, i = null
            }
        }
    }
    var VideoConstants = {
        VIDEO_ITEM_INDEX_OWNER_ID: 0,
        VIDEO_ITEM_INDEX_ID: 1,
        VIDEO_ITEM_INDEX_THUMB: 2,
        VIDEO_ITEM_INDEX_TITLE: 3,
        VIDEO_ITEM_INDEX_FLAGS: 4,
        VIDEO_ITEM_INDEX_DURATION: 5,
        VIDEO_ITEM_INDEX_HASH: 6,
        VIDEO_ITEM_INDEX_MODER_ACTS: 7,
        VIDEO_ITEM_INDEX_OWNER: 8,
        VIDEO_ITEM_INDEX_DATE: 9,
        VIDEO_ITEM_INDEX_VIEWS: 10,
        VIDEO_ITEM_INDEX_PLATFORM: 11,
        VIDEO_ITEM_INDEX_BLOCKED: 12,
        VIDEO_ITEM_FLAG_EXTERNAL: 1,
        VIDEO_ITEM_FLAG_ACTIVE_LIVE: 2,
        VIDEO_ITEM_FLAG_CAN_EDIT: 64,
        VIDEO_ITEM_FLAG_CAN_DELETE: 128,
        VIDEO_ITEM_FLAG_CAN_ADD: 256,
        VIDEO_ITEM_FLAG_PRIVATE: 512,
        VIDEO_ITEM_FLAG_NO_AUTOPLAY: 1024,
        VIDEO_ITEM_FLAG_ADDED: 2048,
        VIDEO_ITEM_FLAG_SKIP_THUMB_LOAD: 4096,
        VIDEO_ITEM_FLAG_NEED_SIGN_IN: 8192,
        VIDEO_ITEM_FLAG_HD: 16384
    };

    function initVideo() {
        window._videoLastInlined = !1
    }
}, , , function(e, t, o) {
    "use strict";
    var n = o(122)(!0);
    o(1)(String, "String", function(e) {
        this._t = String(e), this._i = 0
    }, function() {
        var e, t = this._t,
            o = this._i;
        return o >= t.length ? {
            value: void 0,
            done: !0
        } : (e = n(t, o), this._i += e.length, {
            value: e,
            done: !1
        })
    })
}, function(e, t, o) {
    e.exports = o(143).document && document.documentElement
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "KEY", function() {
        return a
    }), o.d(t, "addEvent", function() {
        return s
    }), o.d(t, "removeEvent", function() {
        return c
    }), o.d(t, "triggerEvent", function() {
        return _
    }), o.d(t, "cancelEvent", function() {
        return l
    }), o.d(t, "stopEvent", function() {
        return d
    }), o.d(t, "normEvent", function() {
        return u
    }), o.d(t, "checkEvent", function() {
        return p
    }), o.d(t, "checkKeyboardEvent", function() {
        return f
    }), o.d(t, "checkOver", function() {
        return b
    });
    var n = o(89),
        i = o(80),
        r = o(58),
        a = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DEL: 8,
            TAB: 9,
            RETURN: 13,
            ENTER: 13,
            ESC: 27,
            PAGEUP: 33,
            PAGEDOWN: 34,
            SPACE: 32,
            CTRL: 17,
            ALT: 18,
            SHIFT: 16
        };

    function s(e, t, o, r, a, s) {
        if ((e = Object(n.ge)(e)) && 3 != e.nodeType && 8 != e.nodeType) {
            var c, _ = a ? ((c = function(e) {
                var t = e.data;
                e.data = a;
                var n = o.apply(this, [e]);
                return e.data = t, n
            }).handler = o, c) : o;
            e.setInterval && e !== window && (e = window);
            var d = Object(n.data)(e, "events") || Object(n.data)(e, "events", {}),
                p = Object(n.data)(e, "handle") || Object(n.data)(e, "handle", function(e) {
                    return function() {
                        (function(e) {
                            e = u(e);
                            var t = Array.from(arguments);
                            t[0] = e;
                            var o = Object(n.data)(this, "events");
                            if (!o || "string" != typeof e.type || !o[e.type] || !o[e.type].length) return;
                            var i = (o[e.type] || []).slice();
                            for (var r in i)
                                if (i.hasOwnProperty(r)) {
                                    if ("mouseover" === e.type || "mouseout" === e.type) {
                                        for (var a = e.relatedElement; a && a !== this;) a = a.parentNode;
                                        if (a === this) continue
                                    }
                                    var s = i[r].apply(this, t);
                                    if (!1 !== s && -1 !== s || l(e), -1 === s) return !1
                                }
                        }).apply(e, arguments)
                    }
                }(e));
            Object(i.each)(t.split(/\s+/), function(t, o) {
                d[o] || (d[o] = [], !r && e.addEventListener ? e.addEventListener(o, p, s) : !r && e.attachEvent && e.attachEvent("on" + o, p)), d[o].push(_)
            })
        }
    }

    function c(e, t, o, r) {
        if (void 0 === r && (r = !1), e = Object(n.ge)(e)) {
            var a = Object(n.data)(e, "events");
            if (a)
                if ("string" == typeof t) Object(i.each)(t.split(/\s+/), function(t, s) {
                    if (Object(i.isArray)(a[s])) {
                        var c = a[s].length;
                        if (Object(i.isFunction)(o)) {
                            for (var _ = c - 1; _ >= 0; _--)
                                if (a[s][_] && (a[s][_] === o || a[s][_].handler === o)) {
                                    a[s].splice(_, 1), c--;
                                    break
                                }
                        } else {
                            for (var l = 0; l < c; l++) delete a[s][l];
                            c = 0
                        }
                        c || (e.removeEventListener ? e.removeEventListener(s, Object(n.data)(e, "handle"), r) : e.detachEvent && e.detachEvent("on" + s, Object(n.data)(e, "handle")), delete a[s])
                    }
                }), Object(i.isEmpty)(a) && (Object(n.removeData)(e, "events"), Object(n.removeData)(e, "handle"));
                else
                    for (var s in a) a.hasOwnProperty(s) && c(e, s)
        }
    }

    function _(e, t, o, r) {
        e = Object(n.ge)(e);
        var a = Object(n.data)(e, "handle");
        if (a) {
            var s = function() {
                return a.call(e, Object(i.extend)(o || {}, {
                    type: t,
                    target: e
                }))
            };
            r ? s() : setTimeout(s, 0)
        }
    }

    function l(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
    }

    function d(e) {
        if (!(e = e || window.event)) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
    }

    function u(e) {
        var t = e = e || window.event;
        if ((e = Object(i.clone)(t)).originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target), null == e.pageX && null != e.clientX) {
            var o = document.documentElement,
                n = bodyNode;
            e.pageX = e.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o.clientLeft || 0), e.pageY = e.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o.clientTop || 0)
        }
        return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && r.browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
    }

    function p(e) {
        var t = e || window.event;
        return t && ("click" === t.type || "mousedown" === t.type || "mouseup" === t.type) && (t.which > 1 || t.button > 1 || t.ctrlKey || t.shiftKey || r.browser.mac && t.metaKey) || !1
    }

    function f(e) {
        if (!(e = u(e)) || !e.target) return !1;
        if (!e.screenX) return !0;
        var t = Object(n.getSize)(e.target),
            o = Object(n.getXY)(e.target),
            i = e.pageX - o[0],
            r = e.pageY - o[1];
        return i < -1 || i > t[0] + 1 || r < -1 || r > t[1] + 1 || Math.abs(e.pageX - o[0] - t[0] / 2) < 1 && Math.abs(e.pageY - o[1] - t[1] / 2) < 1
    }

    function b(e, t) {
        if (!e) return !0;
        e = e.originalEvent || e, t = t || e.target;
        var o = e.fromElement || e.relatedTarget;
        if (!o || o === t || o === t.parentNode) return !0;
        for (; o !== t && o.parentNode && o.parentNode !== bodyNode;) o = o.parentNode;
        return o !== t
    }
}, function(e, t, o) {
    var n = o(134),
        i = o(132).set;
    e.exports = function(e, t, o) {
        var r, a = t.constructor;
        return a !== o && "function" == typeof a && (r = a.prototype) !== o.prototype && n(r) && i && i(e, r), e
    }
}, function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "subscribePerformanceLoggerCollectors", function() {
        return u
    });
    var n = o(187),
        i = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !n && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        r = "remixjsp";

    function a() {
        var e;
        (e = window.performance) && e.getEntriesByType && e.getEntriesByType("paint").forEach(function(e) {
                "first-contentful-paint" === e.name && d(e.startTime, "TTFCP")
            }),
            function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(function(e) {
                    if ("navigation" === e.initiatorType) {
                        var t = e.domComplete,
                            o = e.domContentLoadedEventEnd,
                            n = e.loadEventEnd;
                        d(t, "domComplete"), d(o, "domContentLoadedEventEnd"), d(n, "loadEventEnd")
                    }
                })
            }(), _()
    }
    var s = [],
        c = !1;

    function _() {
        if (c) {
            var e = window.performance,
                t = s[s.length - 1];
            if (!t) return c = !1, void d(-1);
            var o = t.startTime + t.duration;
            e.now() - o >= 3e3 ? d(o, "TTI") : setTimeout(_, 3e3)
        }
    }
    var l = [];

    function d(e, t) {
        var o = Math.floor(e);
        if (-1 !== e && (l.push([o, t]), !(c ? "TTI" === t : l.length > 2))) return;
        var a = "unknown",
            s = navigator.connection;
        s && s.effectiveType && (a = s.effectiveType);
        var _ = {
            id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
            loc: location.href,
            events: []
        };
        l.forEach(function(e) {
            var t = i(e, 2),
                o = t[0],
                n = t[1];
            return _.events.push([n, o, cur.module, a, window.vk.rv])
        }), Object(n.setCookie)(r, JSON.stringify(_), .01)
    }

    function u() {
        window.PerformanceLongTaskTiming && (new PerformanceObserver(function(e) {
            s = s.concat(e.getEntries())
        }).observe({
            entryTypes: ["longtask"]
        }), c = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
            setTimeout(a, 0)
        }) : a()
    }
}, , function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "EMPTY", function() {
        return n
    }), o.d(t, "UNSTARTED", function() {
        return i
    }), o.d(t, "PLAYING", function() {
        return r
    }), o.d(t, "PAUSED", function() {
        return a
    }), o.d(t, "ENDED", function() {
        return s
    }), o.d(t, "ERROR", function() {
        return c
    });
    var n = "empty",
        i = "unstarted",
        r = "playing",
        a = "paused",
        s = "ended",
        c = "error"
}, , function(e, t) {
    var o;
    o = function() {
        return this
    }();
    try {
        o = o || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" == typeof window && (o = window)
    }
    e.exports = o
}, , function(e, t, o) {
    var n = o(19);
    e.exports = function(e, t, o, i) {
        try {
            return i ? t(n(o)[0], o[1]) : t(o)
        } catch (t) {
            var r = e.return;
            throw void 0 !== r && n(r.call(e)), t
        }
    }
}, , function(e, t, o) {
    "use strict";
    o.r(t), o.d(t, "getCookie", function() {
        return i
    }), o.d(t, "setCookie", function() {
        return r
    }), o.d(t, "hideCookiesPolicy", function() {
        return a
    }), o.d(t, "initCookies", function() {
        return s
    });
    var n = o(89);

    function i(e) {
        return function() {
            window._cookies = {};
            for (var e = document.cookie.split(";"), t = /^[\s]*([^\s]+?)$/i, o = 0, n = e.length; o < n; o++) {
                var i = e[o].split("=");
                2 === i.length && (_cookies[i[0].match(t)[1]] = unescape(i[1].match(t) ? i[1].match(t)[1] : ""))
            }
        }(), _cookies[e]
    }

    function r(e, t, o, n) {
        var i = "";
        if (o) {
            var r = new Date;
            r.setTime(r.getTime() + 24 * o * 60 * 60 * 1e3), i = "; expires=" + r.toGMTString()
        }
        var a = window.locDomain;
        document.cookie = e + "=" + escape(t) + i + "; path=/" + (a ? "; domain=." + a : "") + (n && "https:" === locProtocol ? "; secure" : "")
    }

    function a() {
        Object(n.re)("cookies_policy_wrap"), ajax.post("/settings", {
            act: "a_hide_cookies_policy"
        })
    }

    function s() {
        window._cookies = {}
    }
}, function(e, t, o) {
    var n = o(114),
        i = o(185),
        r = o(94),
        a = o(19),
        s = o(88),
        c = o(32);
    e.exports = function(e, t, o, _, l) {
        var d, u, p, f = l ? function() {
                return e
            } : c(e),
            b = n(o, _, t ? 2 : 1),
            h = 0;
        if ("function" != typeof f) throw TypeError(e + " is not iterable!");
        if (r(f))
            for (d = s(e.length); d > h; h++) t ? b(a(u = e[h])[0], u[1]) : b(e[h]);
        else
            for (p = f.call(e); !(u = p.next()).done;) i(p, b, u.value, t)
    }
}]);