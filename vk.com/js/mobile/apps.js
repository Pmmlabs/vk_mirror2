! function(t) {
    var e = {};

    function n(o) {
        if (e[o]) return e[o].exports;
        var i = e[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = t, n.c = e, n.d = function(t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: o
        })
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function(t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var i in t) n.d(o, i, function(e) {
                return t[e]
            }.bind(null, i));
        return o
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 4)
}({
    16: function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = function(t) {
            function e(t, e) {
                return t << e | t >>> 32 - e
            }

            function n(t, e) {
                var n = void 0,
                    o = void 0,
                    i = void 0,
                    r = void 0,
                    a = void 0;
                return i = 2147483648 & t, r = 2147483648 & e, a = (1073741823 & t) + (1073741823 & e), (n = 1073741824 & t) & (o = 1073741824 & e) ? 2147483648 ^ a ^ i ^ r : n | o ? 1073741824 & a ? 3221225472 ^ a ^ i ^ r : 1073741824 ^ a ^ i ^ r : a ^ i ^ r
            }

            function o(t, o, i, r, a, s, c) {
                return n(e(t = n(t, n(n(function(t, e, n) {
                    return t & e | ~t & n
                }(o, i, r), a), c)), s), o)
            }

            function i(t, o, i, r, a, s, c) {
                return n(e(t = n(t, n(n(function(t, e, n) {
                    return t & n | e & ~n
                }(o, i, r), a), c)), s), o)
            }

            function r(t, o, i, r, a, s, c) {
                return n(e(t = n(t, n(n(function(t, e, n) {
                    return t ^ e ^ n
                }(o, i, r), a), c)), s), o)
            }

            function a(t, o, i, r, a, s, c) {
                return n(e(t = n(t, n(n(function(t, e, n) {
                    return e ^ (t | ~n)
                }(o, i, r), a), c)), s), o)
            }

            function s(t) {
                var e = "",
                    n = "",
                    o = void 0;
                for (o = 0; o <= 3; o++) n = "0" + (t >>> 8 * o & 255).toString(16), e += n.substr(n.length - 2, 2);
                return e
            }
            var c = Array(),
                p = void 0,
                l = void 0,
                u = void 0,
                d = void 0,
                h = void 0,
                f = void 0,
                v = void 0,
                w = void 0,
                m = void 0;
            for (t = function(t) {
                    t = t.replace(/\r\n/g, "\n");
                    for (var e = "", n = 0; n < t.length; n++) {
                        var o = t.charCodeAt(n);
                        o < 128 ? e += String.fromCharCode(o) : o > 127 && o < 2048 ? (e += String.fromCharCode(o >> 6 | 192), e += String.fromCharCode(63 & o | 128)) : (e += String.fromCharCode(o >> 12 | 224), e += String.fromCharCode(o >> 6 & 63 | 128), e += String.fromCharCode(63 & o | 128))
                    }
                    return e
                }(t), c = function(t) {
                    for (var e = void 0, n = t.length, o = n + 8, i = 16 * ((o - o % 64) / 64 + 1), r = Array(i - 1), a = 0, s = 0; s < n;) a = s % 4 * 8, r[e = (s - s % 4) / 4] = r[e] | t.charCodeAt(s) << a, s++;
                    return a = s % 4 * 8, r[e = (s - s % 4) / 4] = r[e] | 128 << a, r[i - 2] = n << 3, r[i - 1] = n >>> 29, r
                }(t), f = 1732584193, v = 4023233417, w = 2562383102, m = 271733878, p = 0; p < c.length; p += 16) l = f, u = v, d = w, h = m, f = o(f, v, w, m, c[p + 0], 7, 3614090360), m = o(m, f, v, w, c[p + 1], 12, 3905402710), w = o(w, m, f, v, c[p + 2], 17, 606105819), v = o(v, w, m, f, c[p + 3], 22, 3250441966), f = o(f, v, w, m, c[p + 4], 7, 4118548399), m = o(m, f, v, w, c[p + 5], 12, 1200080426), w = o(w, m, f, v, c[p + 6], 17, 2821735955), v = o(v, w, m, f, c[p + 7], 22, 4249261313), f = o(f, v, w, m, c[p + 8], 7, 1770035416), m = o(m, f, v, w, c[p + 9], 12, 2336552879), w = o(w, m, f, v, c[p + 10], 17, 4294925233), v = o(v, w, m, f, c[p + 11], 22, 2304563134), f = o(f, v, w, m, c[p + 12], 7, 1804603682), m = o(m, f, v, w, c[p + 13], 12, 4254626195), w = o(w, m, f, v, c[p + 14], 17, 2792965006), v = o(v, w, m, f, c[p + 15], 22, 1236535329), f = i(f, v, w, m, c[p + 1], 5, 4129170786), m = i(m, f, v, w, c[p + 6], 9, 3225465664), w = i(w, m, f, v, c[p + 11], 14, 643717713), v = i(v, w, m, f, c[p + 0], 20, 3921069994), f = i(f, v, w, m, c[p + 5], 5, 3593408605), m = i(m, f, v, w, c[p + 10], 9, 38016083), w = i(w, m, f, v, c[p + 15], 14, 3634488961), v = i(v, w, m, f, c[p + 4], 20, 3889429448), f = i(f, v, w, m, c[p + 9], 5, 568446438), m = i(m, f, v, w, c[p + 14], 9, 3275163606), w = i(w, m, f, v, c[p + 3], 14, 4107603335), v = i(v, w, m, f, c[p + 8], 20, 1163531501), f = i(f, v, w, m, c[p + 13], 5, 2850285829), m = i(m, f, v, w, c[p + 2], 9, 4243563512), w = i(w, m, f, v, c[p + 7], 14, 1735328473), v = i(v, w, m, f, c[p + 12], 20, 2368359562), f = r(f, v, w, m, c[p + 5], 4, 4294588738), m = r(m, f, v, w, c[p + 8], 11, 2272392833), w = r(w, m, f, v, c[p + 11], 16, 1839030562), v = r(v, w, m, f, c[p + 14], 23, 4259657740), f = r(f, v, w, m, c[p + 1], 4, 2763975236), m = r(m, f, v, w, c[p + 4], 11, 1272893353), w = r(w, m, f, v, c[p + 7], 16, 4139469664), v = r(v, w, m, f, c[p + 10], 23, 3200236656), f = r(f, v, w, m, c[p + 13], 4, 681279174), m = r(m, f, v, w, c[p + 0], 11, 3936430074), w = r(w, m, f, v, c[p + 3], 16, 3572445317), v = r(v, w, m, f, c[p + 6], 23, 76029189), f = r(f, v, w, m, c[p + 9], 4, 3654602809), m = r(m, f, v, w, c[p + 12], 11, 3873151461), w = r(w, m, f, v, c[p + 15], 16, 530742520), v = r(v, w, m, f, c[p + 2], 23, 3299628645), f = a(f, v, w, m, c[p + 0], 6, 4096336452), m = a(m, f, v, w, c[p + 7], 10, 1126891415), w = a(w, m, f, v, c[p + 14], 15, 2878612391), v = a(v, w, m, f, c[p + 5], 21, 4237533241), f = a(f, v, w, m, c[p + 12], 6, 1700485571), m = a(m, f, v, w, c[p + 3], 10, 2399980690), w = a(w, m, f, v, c[p + 10], 15, 4293915773), v = a(v, w, m, f, c[p + 1], 21, 2240044497), f = a(f, v, w, m, c[p + 8], 6, 1873313359), m = a(m, f, v, w, c[p + 15], 10, 4264355552), w = a(w, m, f, v, c[p + 6], 15, 2734768916), v = a(v, w, m, f, c[p + 13], 21, 1309151649), f = a(f, v, w, m, c[p + 4], 6, 4149444226), m = a(m, f, v, w, c[p + 11], 10, 3174756917), w = a(w, m, f, v, c[p + 2], 15, 718787259), v = a(v, w, m, f, c[p + 9], 21, 3951481745), f = n(f, l), v = n(v, u), w = n(w, d), m = n(m, h);
            return (s(f) + s(v) + s(w) + s(m)).toLowerCase()
        }
    },
    173: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.VKApp = void 0;
        var _md = __webpack_require__(16),
            _md2 = _interopRequireDefault(_md);

        function _interopRequireDefault(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        __webpack_require__(261);
        var _window = window,
            trim = _window.trim,
            evalJs = _window.evalJs,
            obj2qs = _window.obj2qs,
            fastXDM = _window.fastXDM,
            Btn = _window.Btn,
            VKApp = exports.VKApp = function(t, e, n, o) {
                if (n = n || {}, e = e || {}, window.parent && window.parent != window && !e.checking) return !1;
                var i = this;
                if (this.cont = ge(t), this.cont) {
                    if (n.hash = n.hash || "", -1 != n.hash.indexOf("#")) {
                        var r = n.hash.split("#").pop();
                        (r || "").substr(0, 1) == vk.navPrefix ? n.hash = "" : n.hash = r
                    }
                    this.params = n, this.onReady = [];
                    var a = e.src;
                    if (1 == e.type) {
                        var s = [];
                        for (var c in n) "hash" == c ? s.push(c + "=" + encodeURIComponent(n[c])) : s.push(c + "=" + n[c]);
                        a += (-1 == a.indexOf("?") ? "?" : "&") + s.join("&")
                    }
                    if (i.options = extend({
                            heightMax: 4500
                        }, e), this.funcs = {
                            onInit: function() {
                                return e.heightSync && i.RPC.callMethod("getHeight", function(t) {
                                    i.setHeight(t)
                                }), i.inited || (i.inited = !0, o && o(), i.inlineApp || i.onAppReady()), !0
                            },
                            ApiCall: function(t, e) {
                                var n = t.shift();
                                i.api(n, t[0], e)
                            },
                            _getAppInfo: function(t) {
                                t([i.params.api_id, window.location.hash])
                            },
                            api: function(t, e, n) {
                                i.api(e, n, function(e) {
                                    i.apiCallback(t, e)
                                })
                            },
                            getLocationProtocol: function(t) {
                                t(location.protocol)
                            },
                            setLocation: function(t, e) {
                                t = t.toString(), cur.appLoc = t, e && cur.app.runCallback("onLocationChanged", t), nav.setLoc(extend(nav.objLoc, {
                                    "#": t
                                }))
                            },
                            showSettingsBox: function(t) {
                                if (!cur.settingsBoxShown) {
                                    cur.onSettingsEventSended = !1, cur.canSendOnSettingsEventFromHide = !0, cur.onSettingsChange = function(t, e) {
                                        cur.onSettingsEventSended || (cur.onSettingsEventSended = !0, "ok" === t ? cur.app.runCallback("onSettingsChanged", e) : cur.app.runCallback("onSettingsCancel"))
                                    }, cur.settingsBoxShown = !0;
                                    var n = {
                                        act: "show_settings",
                                        api_hash: cur.api_hash,
                                        aid: e.aid,
                                        mask: t
                                    };
                                    cur.lang_id && (n.lang = cur.lang_id), e.gid && (n.gid = e.gid), ajax.post("/apps.php", n, {
                                        onDone: function(t, e) {
                                            showAppsBox(t, e)
                                        }
                                    })
                                }
                            },
                            showAllowMessagesFromCommunityBox: function(t) {
                                if (!cur.allowMessagesFromCommunityBox) {
                                    cur.allowMessagesFromCommunityBox = !0, cur.onAllowMessagesFromCommunity = function(t) {
                                        "ok" === t ? cur.app.runCallback("onAllowMessagesFromCommunity") : cur.app.runCallback("onAllowMessagesFromCommunityCancel")
                                    };
                                    var n = {
                                        act: "allow_messages_from_community_box",
                                        aid: e.aid,
                                        api_hash: cur.api_hash
                                    };
                                    e.gid ? n.gid = e.gid : n.gid = t, ajax.post("/apps.php", n, {
                                        onDone: function(t, e) {
                                            showAppsBox(t, e)
                                        }
                                    })
                                }
                            },
                            shareBox: function(t, n, o, i) {
                                if (!t) return !1;
                                var r = {
                                    act: "share_box",
                                    aid: e.aid,
                                    api_hash: cur.api_hash
                                };
                                t && (r.url = t), n && (r.image = n), o && (r.title = o), i && (r.description = i), e.gid && (r.gid = e.gid), ajax.post("/apps.php", r, {
                                    onDone: function(t, e) {
                                        showAppsBox(t, e)
                                    }
                                })
                            },
                            debug: function() {
                                window.debugLog && debugLog(1 == arguments.length ? arguments[0] : arguments)
                            },
                            openExternalApp: function(t, n) {
                                if (t) {
                                    var o = i.isNativeClientWebView(),
                                        r = ["pay-to-user", "transfer-to-user"],
                                        a = ["pay-to-group", "transfer-to-group"],
                                        s = [],
                                        c = "";
                                    if (n && ~["pay-to-user", "pay-to-service", "pay-to-group", "transfer-to-user", "transfer-to-group", "open-service", "add-card"].indexOf(n.action))
                                        if (!~r.indexOf(n.action) || n.user_id)
                                            if (!~a.indexOf(n.action) || n.group_id)
                                                if ("open-service" !== n.action || i.params.is_vkpay) {
                                                    for (var p in n.aid = e.aid, n)
                                                        if (n.hasOwnProperty(p) && (!o || "action" !== p)) {
                                                            var l = "";
                                                            void 0 !== n[p] && (l = encodeURIComponent(n[p])), s.push(encodeURIComponent(p) + "=" + l)
                                                        }
                                                    if (o && (t += "/" + n.action, i.isNativeIosWebView() && !/^https?:\/\//.test(c) && (t = "https://" + t)), c = t + "?" + s.join("&"), o) i.callNativeClientMethod("openExternalUrl", c);
                                                    else {
                                                        var u = {
                                                                act: "open_external_app",
                                                                url: t,
                                                                query: s.join("&"),
                                                                aid: e.aid
                                                            },
                                                            d = window.open("", "_blank");
                                                        ajax.post("/apps.php", u, {
                                                            onDone: function(t) {
                                                                try {
                                                                    t = JSON.parse(t)
                                                                } catch (e) {
                                                                    t = {
                                                                        error: {
                                                                            error_code: 1,
                                                                            error_msg: "Unknown error"
                                                                        }
                                                                    }
                                                                }
                                                                if (t.error || !t.url) return i.runCallback("onExternalAppFail", t.error), void d.close();
                                                                d ? (cur.onExternalAppDone = function(t) {
                                                                    this.runCallback("onExternalAppDone", t)
                                                                }.bind(i), cur.onExternalAppListener = function(t) {
                                                                    /https:\/\/(m|0)\.vk\.com/.test(t.origin) && t.isTrusted && cur.onExternalAppDone && ("externalAppDone" !== t.data.method && "externalAppFail" !== t.data.method || (window.focus(), "externalAppDone" === t.data.method ? cur.onExternalAppDone(t.data.params) : i.runCallback("onExternalAppFail", t.data.error), cur.onExternalAppDone = null, window.removeEventListener("message", cur.onExternalAppListener), cur.onExternalAppListener = null))
                                                                }, window.addEventListener("message", cur.onExternalAppListener), d.location.href = t.url) : window.location.href = t.url
                                                            }
                                                        })
                                                    }
                                                } else i.runCallback("onExternalAppFail", {
                                                    error_msg: "Invalid action",
                                                    error_code: 100
                                                });
                                    else i.runCallback("onExternalAppFail", {
                                        error_msg: "Missing required param group_id",
                                        error_code: 100
                                    });
                                    else i.runCallback("onExternalAppFail", {
                                        error_msg: "Missing required param user_id",
                                        error_code: 100
                                    });
                                    else i.runCallback("onExternalAppFail", {
                                        error_msg: "Invalid action",
                                        error_code: 100
                                    })
                                }
                            },
                            externalAppDone: function(t) {
                                if (window.opener) {
                                    var e = {
                                        method: "externalAppDone",
                                        params: t
                                    };
                                    window.opener.postMessage(e, location.origin), window.close()
                                }
                            },
                            externalAppFail: function(t) {
                                if (!isObject(t)) try {
                                    t = JSON.parse(t)
                                } catch (e) {
                                    t = {
                                        error_msg: "Unknown error",
                                        error_code: 1
                                    }
                                }
                                if (i.isNativeAndroidWebView()) i.callNativeClientMethod("externalAppFail", t);
                                else if (window.opener) {
                                    var e = {
                                        method: "externalAppFail",
                                        error: t
                                    };
                                    window.opener.postMessage(e, location.origin), window.close()
                                }
                            },
                            closeApp: function() {
                                cur.app.callNativeClientMethod("close")
                            },
                            openQRReader: function() {
                                cur.app.isNativeClientWebView() && cur.app.callNativeClientMethod("VKWebAppOpenQR")
                            },
                            sendStats: function(t) {
                                (isObject(t) || isArray(t)) && (t = JSON.stringify(t)), ajax.post("/apps.php", {
                                    act: "save_stats",
                                    data: t,
                                    hash: cur.app.params.stats_hash,
                                    app_id: cur.aid
                                }, {
                                    onDone: function() {
                                        cur.app.runCallback("onSendStatsDone")
                                    },
                                    onFail: function() {
                                        return cur.app.runCallback("onSendStatsFail"), !0
                                    }
                                })
                            },
                            showWallPostBox: function(t) {
                                if (!cur.wallPostBoxSubmit) {
                                    if ((t = t || {}).attachments = cur.app.getValidPostAttachments(t.attachments || t.attachment), !(t.message || t.attachments && t.attachments.length)) {
                                        var e = {
                                            error_code: 100,
                                            error_msg: "One of the parameters specified was missing or invalid"
                                        };
                                        return cur.app.runCallback("onShowWallPostBoxCancel", e), void(cur.wallPostBoxCallback && cur.wallPostBoxCallback({
                                            error: e
                                        }))
                                    }
                                    if (cur.app.isNativeClientWebView() && cur.app.nativeClientHasMethod("showWallPostBox")) return t = cur.app.isNativeAndroidWebView() ? obj2qs(t) : t, void cur.app.callNativeClientMethod("showWallPostBox", t);
                                    t.app_id = cur.aid, t.act = "show_wall_post_box", t.api_hash = cur.api_hash, cur.showWallPostBoxErrorHandler = function(t) {
                                        cur.app.runCallback("onShowWallPostBoxCancel", t), cur.wallPostBoxCallback && cur.wallPostBoxCallback({
                                            error: t
                                        }), hideAppsBox()
                                    }, ajax.post("/apps.php", t, {
                                        onDone: function(t, e) {
                                            showAppsBox(t, e)
                                        },
                                        onFail: function() {
                                            cur.showWallPostBoxErrorHandler({
                                                error_code: 1,
                                                error_message: "Unknown network error occurred"
                                            })
                                        }
                                    })
                                }
                            },
                            startHandleDeviceOrientation: function(t, e) {
                                var n = void 0,
                                    o = void 0;
                                void 0 !== window.DeviceMotionEvent || void 0 !== window.DeviceOrientationEvent ? (void 0 !== window.DeviceOrientationEvent && t && (o = function(t) {
                                    i.runCallback("onDeviceOrientation", t.absolute, t.beta, t.gamma, t.alpha)
                                }, addEvent(window, "deviceorientation", o)), void 0 !== window.DeviceMotionEvent && e && (n = function(t) {
                                    i.runCallback("onDeviceMotion", t.accelerationIncludingGravity.x, t.accelerationIncludingGravity.y, t.accelerationIncludingGravity.z)
                                }, addEvent(window, "devicemotion", n)), window.cur && isArray(cur.destroy) && cur.destroy.push(function() {
                                    o && removeEvent(window, "deviceorientation", o), n && removeEvent(window, "devicemotion", n)
                                })) : i.runCallback("onDeviceOrientationNotSupported")
                            }
                        }, i.options.no_init) return !1;
                    switch (i.options.rotate_handler && initOrientationHandler(), i.options.type) {
                        case 1:
                            this.RPC = new fastXDM.Server(this.funcs);
                            var p = document.body.scrollHeight;
                            cur.with_header && (p -= 44);
                            var l = {
                                src: a,
                                width: "100%",
                                height: p + "px",
                                overflow: "hidden"
                            };
                            i.options.height && (l.height = "100%"), this.frame = this.RPC.append(i.cont, l, 'webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true" allow="geolocation; microphone; camera"'), this.frame.style.display = "block"
                    }
                    cur.destroy.push(function() {
                        this.RPC && this.RPC.destroy(), this._nativeClientCallbackListener && removeEvent(window, "VKWebAppEvent", this._nativeClientCallbackListener)
                    }.bind(this)), this.isNativeClientWebView() && this.initNativeClientCallbackListener()
                }
            };

        function showAppsBox(t, e) {
            var n = ge("apps_box");
            return hide(ge("apps_test_id")), n.innerHTML = t, show(n), e && evalJs(e), n
        }

        function hideAppsBox(t) {
            var e = ge("apps_box");
            hide(e), e.innerHTML = "", show(ge("apps_test_id"))
        }

        function initOrientationHandler() {
            onBodyResize(function() {
                var t = window.innerHeight;
                cur.with_header && (t -= 44), t += "px";
                var e = geByTag1("iframe");
                e && (e.height = t)
            })
        }
        VKApp.prototype.onAppReady = function() {
            for (var t in this.onReady) this.onReady.hasOwnProperty(t) && this.onReady[t]()
        }, VKApp.prototype.initWallPostBox = function(t) {
            var e = geByClass1("appHeader__back"),
                n = void 0,
                o = void 0;
            t = t || {};
            var i = function(t) {
                hideAppsBox(), t && this.runCallback("onShowWallPostBoxCancel"), cur.wallPostBoxSubmit = null, e && o && n && (e.onclick = n)
            }.bind(this);
            if (window.history) {
                window.history.pushState({}, "", "");
                var r = i.bind(this, !0);
                addEvent(window, "popstate", r)
            }
            e && (o = function(t) {
                return cancelEvent(t), i(!0), !1
            }, n = e.onclick, e.onclick = o), cur.wallPostBoxSubmit = function(e, n) {
                delete t.act, Btn.setLoading(n.$btn, !0), this.api("wall.post", extend(t, {
                    method_access: e
                }), function(t) {
                    cur.wallPostBoxCallback && cur.wallPostBoxCallback(t), t.error ? this.runCallback("onShowWallPostBoxCancel", t.error) : this.runCallback("onShowWallPostBoxDone", t.response.post_id), i()
                }.bind(this))
            }.bind(this)
        }, VKApp.prototype.submitWallPostBox = function(t, e) {
            cur.wallPostBoxSubmit && cur.wallPostBoxSubmit(t, e)
        }, VKApp.prototype.getValidPostAttachments = function(t) {
            var e = /(^https?:\/\/)|(^(poll|album|photo|video|doc|audio|page|note)-?\d+_-?\d+)$/,
                n = [];
            return t = t || [], isString(t) && (t = t.split(",")), each(t, function() {
                var t = this.trim();
                e.test(t) && n.push(t)
            }), n.join(",")
        }, VKApp.prototype.runCallback = function() {
            var t = Array.prototype.slice.call(arguments),
                e = t[0],
                n = void 0,
                o = "customEvent";
            switch (-1 != "onLocationChanged,onMerchantPaymentSuccess,onBalanceChanged,onWindowResized,onSettingsChanged".indexOf(e) ? (o = e, n = t.slice(1)) : n = t.slice(), this.options.type) {
                case 1:
                    if (this.RPC.callMethod("runCallback", t), !this.options.widget && !browser.iphone && !browser.ipad) try {
                        this.externalFrame[o](n)
                    } catch (t) {}
                    break;
                case 2:
                case 3:
                    try {
                        this.externalFrame[o](n)
                    } catch (t) {}
            }
        }, VKApp.prototype.apiCallback = function(t, e) {
            try {
                this.externalFrame.apiCallback(t, e)
            } catch (t) {}
        }, VKApp.prototype.setHeight = function(t) {
            if (t) {
                this.inlineApp && t > this.options.heightMax && (t = this.options.heightMax);
                var e = t + "px";
                this.frame.style.height = e, this.options.boxed || (this.cont.style.height = e), this.options.onResize && this.options.onResize()
            }
        }, VKApp.prototype.checkMethod = function(t, e, n) {
            return "wall.post" !== t.toLowerCase() || (cur.wallPostBoxCallback = n, this.funcs.showWallPostBox(e), !1)
        }, VKApp.prototype.checkMethodResult = function(t, e, n, o) {
            switch (t) {
                case "photos.saveProfilePhoto":
                    if (!n.error) return cur.profilePhotoBoxCallback = function(t) {
                        o(t ? {
                            response: {
                                photo_src: n.response.photo_src
                            }
                        } : {
                            error: {
                                error_code: 10007,
                                error_msg: "Operation denied by user"
                            }
                        }), window.profilePhotoBoxCallback = !1
                    }, cur.app.funcs.showProfilePhotoBox(n.response.photo_hash), !1
            }
            return !0
        }, VKApp.prototype.onLocChanged = function(t) {
            t || (t = ""), cur.appLoc != t && (cur.appLoc = t, this.runCallback("onLocationChanged", t))
        }, VKApp.prototype.api = function(method, inputParams, callback, captcha) {
            var self = this;
            if (2 == arguments.length && (callback = params, inputParams = {}), inputParams || (inputParams = {}), captcha || inputParams.method_access || inputParams.method_force || this.checkMethod(method, inputParams, callback)) {
                delete inputParams.callback, delete inputParams.access_token;
                var params = {
                    v: "3.0",
                    api_id: this.params.api_id,
                    method: method,
                    format: "json",
                    rnd: parseInt(1e4 * Math.random())
                };
                if (inputParams)
                    for (var i in inputParams) i = trim(i), /^(rnd|format|api[\s.\[_]id|method|callback|access[\s.\[_]token)(\s*\[|$)/.test(i) || (params[i] = inputParams[i]);
                var lParams = [];
                for (var _i in params) lParams.push([_i, params[_i]]);
                lParams.sort(sName);
                var sig = this.params.viewer_id;
                for (var _i2 in lParams) sig += lParams[_i2][0] + "=" + lParams[_i2][1];
                sig += this.params.secret, params.sid = this.params.sid, params.sig = (0, _md2.default)(sig);
                var done = function done(text) {
                        var response = eval("(" + text + ")");
                        if (response.error && 14 == response.error.error_code) throw Error("You call api often. You can try call from server");
                        self.checkMethodResult(method, inputParams, response, callback) && callback && callback(response)
                    },
                    fail = function() {
                        callback && callback({
                            error: {
                                error_code: 1,
                                error_message: "Unknown network error occurred"
                            }
                        })
                    };
                ajax.plainpost(self.params.api_script, params, done, fail)
            }

            function sName(t, e) {
                return t[0] > e[0] ? 1 : t[0] < e[0] ? -1 : 0
            }
        }, VKApp.prototype.callNativeClientMethod = function(t, e) {
            if (window.AndroidBridge) window.AndroidBridge.callMethod(t, e);
            else {
                var n = window.webkit && window.webkit.messageHandlers;
                n && n[t].postMessage(e)
            }
        }, VKApp.prototype.isNativeClientWebView = function() {
            return this.isNativeIosWebView() || this.isNativeAndroidWebView()
        }, VKApp.prototype.nativeClientHasMethod = function(t) {
            return !this.isNativeIosWebView() || !!window.webkit.messageHandlers[t]
        }, VKApp.prototype.isNativeIosWebView = function() {
            return window.webkit && window.webkit.messageHandlers
        }, VKApp.prototype.isNativeAndroidWebView = function() {
            return window.AndroidBridge
        }, VKApp.prototype.initNativeClientCallbackListener = function() {
            this._nativeClientCallbackListener = function(t) {
                var e = t.detail || {};
                this[e.type] && this[e.type].call(this, e)
            }.bind(this), addEvent(window, "VKWebAppEvent", this._nativeClientCallbackListener)
        }, VKApp.prototype.appRunCallback = function(t) {
            this.runCallback(t.event, t.data)
        }, VKApp.prototype.VKWebAppQRDone = function(t) {
            this.runCallback("onQRReaderDone", t.data)
        }, VKApp.prototype.VKWebAppQRClosed = function(t) {
            this.runCallback("onQRReadeClosed", t.data)
        }, VKApp.prototype.VKWebAppShowWallPostBoxDone = function(t) {
            this.runCallback("onShowWallPostBoxDone", t.data), cur.wallPostBoxCallback && cur.wallPostBoxCallback({
                response: {
                    post_id: t.data
                }
            })
        }, VKApp.prototype.VKWebAppShowWallPostBoxCancel = function(t) {
            this.runCallback("onShowWallPostBoxCancel", t.data), cur.wallPostBoxCallback && cur.wallPostBoxCallback({
                error: t.data
            })
        }, VKApp.prototype.VKWebExternalAppClose = function() {
            this.runCallback("onExternalAppClose")
        }, VKApp.callNativeClientMethod = VKApp.prototype.callNativeClientMethod
    },
    261: function(t, e, n) {
        "use strict";
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        ! function(t) {
            if (!t.fastXDM) {
                var e = {},
                    n = [],
                    i = {};
                t.fastXDM = {
                    _id: 0,
                    helperUrl: "https://vk.com/js/api/xdmHelper.js",
                    Server: function(n, o, i) {
                        this.methods = n || {}, this.filter = o, this.options = i || {}, this.id = t.fastXDM._id++, this.key = function() {
                            for (var t = "", e = 0; e < 5; e++) t += Math.ceil(15 * Math.random()).toString(16);
                            return t
                        }(), this.frameName = "fXD" + this.key, this.server = !0, this.methods["%init%"] = this.methods.__fxdm_i = function() {
                            t.fastXDM.run(this.id), this.methods.onInit && this.methods.onInit()
                        }, e[this.key] = [l, this]
                    },
                    Client: function(n, o) {
                        if (this.methods = n || {}, this.options = o || {}, this.id = t.fastXDM._id++, this.client = !0, t.fastXDM.run(this.id), 0 !== window.name.indexOf("fXD")) throw Error("Wrong window.name property.");
                        this.key = window.name.substr(3), this.caller = window.parent, e[this.key] = [l, this], t.fastXDM.on("helper", function() {
                            t.fastXDM.onClientStart(this)
                        }, this), c(function(t) {
                            t.send(this, t.json.stringify(["%init%"]));
                            var e = this.methods;
                            setTimeout(function() {
                                e.onInit && e.onInit()
                            }, 0)
                        }, this)
                    },
                    onMessage: function(t) {
                        if (t.origin != document.origin && cur) {
                            var n = cur.app && cur.app.options && cur.app.options.src ? cur.app.options.src : "";
                            if (!n) return !1;
                            t.origin != n && t.origin + "/" != n.substring(0, t.origin.length + 1) && window.debugLog && debugLog("Warning: message from " + t.origin + " will be disable in future")
                        }
                        var o = t.data;
                        if (!o) return !1;
                        if ("string" != typeof o && !(o instanceof String)) return !1;
                        var i = o.substr(0, 5);
                        if (e[i]) {
                            var r = e[i][1];
                            !r || r.filter && !r.filter(t.origin) || e[i][0](o.substr(6), r)
                        }
                    },
                    setJSON: function(t) {
                        i.json = t
                    },
                    getJSON: function(t) {
                        if (!t) return i.json;
                        c(function(e) {
                            t(e.json)
                        })
                    },
                    setEnv: function(t) {
                        for (var e in t) t.hasOwnProperty(e) && (i[e] = t[e]);
                        p()
                    },
                    _q: {},
                    on: function(t, e, n) {
                        this._q[t] || (this._q[t] = []), -1 == this._q[t] ? e.apply(n) : this._q[t].push([e, n])
                    },
                    run: function(t) {
                        for (var e = (this._q[t] || []).length, n = 0; n < e; n++) this._q[t][n][0].apply(this._q[t][n][1]);
                        this._q[t] = -1
                    },
                    waitFor: r
                }, t.fastXDM.Server.prototype.start = function(e, n) {
                    if (e.contentWindow) this.caller = e.contentWindow, this.frame = e, t.fastXDM.on("helper", function() {
                        t.fastXDM.onServerStart(this)
                    }, this);
                    else {
                        var o = this;
                        (n = n || 0) < 50 && setTimeout(function() {
                            o.start.apply(o, [e, n + 1])
                        }, 100)
                    }
                }, t.fastXDM.Server.prototype.destroy = function() {
                    delete e[this.key]
                }, t.fastXDM.Server.prototype.append = function(t, e, n) {
                    var i = document.createElement("DIV");
                    i.innerHTML = '<iframe name="' + this.frameName + '" ' + (n || "") + "></iframe>";
                    var r = i.firstChild,
                        a = this,
                        s = function() {
                            r.frameBorder = "0", e && function t(e, n) {
                                for (var i in n) e[i] && "object" === o(e[i]) ? t(e[i], n[i]) : e[i] = n[i]
                            }(r, e), t.insertBefore(r, t.firstChild), a.start(r)
                        };
                    return a.options.layer ? s() : setTimeout(function() {
                        s()
                    }, 0), r
                }, t.fastXDM.Client.prototype.callMethod = t.fastXDM.Server.prototype.callMethod = function() {
                    for (var e = this, n = Array.prototype.slice.call(arguments), o = n.shift(), i = 0, a = n.length; i < a; i++) "function" == typeof n[i] ? function() {
                        e.funcsCount = (e.funcsCount || 0) + 1;
                        var t = n[i],
                            o = "_func" + e.funcsCount;
                        e.methods[o] = function() {
                            t.apply(this, arguments), delete this.methods[o]
                        }, n[i] = {
                            _func: e.funcsCount
                        }
                    }() : this.options.safe && (n[i] = s(n[i], !1));
                    r(this, "caller", function() {
                        t.fastXDM.on(this.id, function() {
                            c(function(t) {
                                t.send(this, t.json.stringify([o, n]))
                            }, this)
                        }, this)
                    }, this)
                }, t.JSON && "object" === o(t.JSON) && t.JSON.parse && t.JSON.stringify && '{"a":[1,2,3]}' === t.JSON.stringify({
                    a: [1, 2, 3]
                }).replace(/ /g, "") ? i.json = {
                    parse: t.JSON.parse,
                    stringify: t.JSON.stringify
                } : t.fastXDM._needJSON = !0, t.postMessage ? (i.protocol = "p", i.send = function(t, e) {
                    var n = t.frame ? t.frame.contentWindow : t.caller;
                    if (n) try {
                        n.postMessage(t.key + ":" + e, "*")
                    } catch (o) {
                        window.postMessage.call(n, t.key + ":" + e, "*")
                    }
                }, t.addEventListener ? t.addEventListener("message", t.fastXDM.onMessage, !1) : t.attachEvent("onmessage", t.fastXDM.onMessage), t.fastXDM._needJSON ? (t.fastXDM._onlyJSON = !0, a()) : p()) : a()
            }

            function r(t, e, n, o, i) {
                t[e] ? n.apply(o) : (i = i || 0) < 1e3 && setTimeout(function() {
                    r(t, e, n, o, i + 1)
                }, 0)
            }

            function a(e) {
                setTimeout(function() {
                    var n = document.createElement("script");
                    n.type = "text/javascript", n.src = e || t.fastXDM.helperUrl, r(document, "body", function() {
                        document.getElementsByTagName("HEAD")[0].appendChild(n)
                    })
                }, 0)
            }

            function s(t, e) {
                var n = void 0;
                switch (void 0 === t ? "undefined" : o(t)) {
                    case "string":
                        n = e ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : t.replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
                        break;
                    case "object":
                        if ("[object Array]" === Object.prototype.toString.apply(t)) {
                            n = [];
                            for (var i = 0, r = t.length; i < r; i++) n[i] = s(t[i], e)
                        } else
                            for (var a in n = {}, t) Object.hasOwnProperty.call(t, a) && (n[a] = s(t[a], e));
                        break;
                    default:
                        n = t
                }
                return n
            }

            function c(t, e) {
                i.loaded ? t.apply(e, [i]) : n.push([e, t])
            }

            function p() {
                i.loaded = !0;
                for (var t = 0, e = n.length; t < e; t++) n[t][1].apply(n[t][0], [i])
            }

            function l(t, e) {
                c(function(n) {
                    var o = n.json.parse(t);
                    if (o[0]) {
                        o[1] || (o[1] = []);
                        for (var i = 0, r = o[1].length; i < r; i++) o[1][i] && o[1][i]._func ? function() {
                            var t = o[1][i]._func;
                            o[1][i] = function() {
                                var n = Array.prototype.slice.call(arguments);
                                n.unshift("_func" + t), e.callMethod.apply(e, n)
                            }
                        }() : e.options.safe && (o[1][i] = s(o[1][i], !0));
                        setTimeout(function() {
                            if (!e.methods[o[0]]) throw Error("fastXDM: Method " + o[0] + " is undefined");
                            e.methods[o[0]].apply(e, o[1])
                        }, 0)
                    }
                })
            }
        }(window)
    },
    4: function(t, e, n) {
        t.exports = n(64)
    },
    64: function(t, e, n) {
        "use strict";
        var o = function() {
            return function(t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function(t, e) {
                    var n = [],
                        o = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = t[Symbol.iterator](); !(o = (a = s.next()).done) && (n.push(a.value), !e || n.length !== e); o = !0);
                    } catch (t) {
                        i = !0, r = t
                    } finally {
                        try {
                            !o && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return n
                }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        n(261);
        var i = n(173),
            r = window,
            a = r.cur,
            s = r.nav,
            c = r.Btn;
        if ("/vkpay" === location.pathname || "/vkpay_music" === location.pathname || "/vk_pay_music" === location.pathname || 0 === location.pathname.indexOf("/app6217559") || 0 === location.pathname.indexOf("/app6460535")) {
            var p = o(location.href.split("#"), 2)[1];
            p && "unsubscribe" === p || (location.href = location.href.replace("m.", "").replace("act=app_r", ""))
        }
        window._iconAdd || (window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "");
        var l = {
            initAppView: function(t, e) {
                var n = function(t) {
                    "block" == t.type ? a.app.runCallback("onWindowBlur") : a.app.runCallback("onWindowFocus")
                };
                a.app.onReady.push(function() {
                    a.app.onLocChanged(t.hash), addEvent(document, "block unblock", n, !0), a.destroy.push(function() {
                        removeEvent(document, "block unblock", n)
                    })
                }), e.icon && (setFavIcon(e.icon), a.destroy.push(function() {
                    setFavIcon("/images/favicon" + (vk.intnat ? "_vk" : "new") + window._iconAdd + ".ico")
                }))
            },
            runUnverified: function(t, e) {
                c.setLoading(t, !0), s.hash && (e += "#" + s.hash), s.go(e)
            },
            showUnverifiedBackBtn: function() {
                var t = void 0;
                window.history && window.history.length > 2 && (t = geByClass1("apps_unverifiedAppWarning__btn_back")) && addClass(t, "apps_unverifiedAppWarning__btn_active")
            },
            unverifiedGoBack: function() {
                return window.history.back(), !1
            }
        };
        window.Apps = l, window.vkApp = i.VKApp
    }
});