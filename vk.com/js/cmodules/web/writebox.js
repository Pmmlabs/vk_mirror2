! function(e) {
    function t(t) {
        for (var r, a, c = t[0], u = t[1], s = t[2], d = 0, l = []; d < c.length; d++) a = c[d], o[a] && l.push(o[a][0]), o[a] = 0;
        for (r in u) Object.prototype.hasOwnProperty.call(u, r) && (e[r] = u[r]);
        for (_ && _(t); l.length;) l.shift()();
        return i.push.apply(i, s || []), n()
    }

    function n() {
        for (var e, t = 0; t < i.length; t++) {
            for (var n = i[t], r = !0, c = 1; c < n.length; c++) {
                var u = n[c];
                0 !== o[u] && (r = !1)
            }
            r && (i.splice(t--, 1), e = a(a.s = n[0]))
        }
        return e
    }
    var r = {},
        o = {
            "web/writebox": 0
        },
        i = [];

    function a(t) {
        if (r[t]) return r[t].exports;
        var n = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, a), n.l = !0, n.exports
    }
    a.m = e, a.c = r, a.d = function(e, t, n) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
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
        var n = Object.create(null);
        if (a.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) a.d(n, r, function(t) {
                return e[t]
            }.bind(null, r));
        return n
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
    var c = window.webpackJsonp = window.webpackJsonp || [],
        u = c.push.bind(c);
    c.push = t, c = c.slice();
    for (var s = 0; s < c.length; s++) t(c[s]);
    var _ = u;
    i.push([140, "7f81047508570d6456c7d33e2e3c0bc3", "b459a6fdd4abe926f4e4ca100471ca63", "075e72e66ff59d27b023e4956acea75e"]), n()
}({
    140: function(e, t, n) {
        e.exports = n("rUY3")
    },
    "1y80": function(e, t, n) {
        "use strict";

        function r(e, t, n, r, o) {
            return window.statlogsValueEvent(e, t, n, r, o)
        }

        function o(e) {
            return Math.random() < e
        }

        function i(e, t, n, i, a, c) {
            o(e) && r(t, n, i, a, c)
        }
        n.d(t, "c", function() {
            return r
        }), n.d(t, "a", function() {
            return o
        }), n.d(t, "b", function() {
            return i
        })
    },
    "86+7": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return o
        }), n.d(t, "c", function() {
            return i
        }), n.d(t, "a", function() {
            return a
        });
        var r = n("aong");

        function o(e, t) {
            return t in Object(r.r)(e).oCache
        }

        function i(e, t) {
            var n = Object(r.r)(e).oCache[t];
            return n && !n._n && (! function(e) {
                if (!e.first_name) {
                    var t = e.name.split(" ", 2);
                    e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
                }
                e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
            }(n), n._n = 1), n
        }

        function a(e, t) {
            var n = Object(r.r)(e);
            n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
        }
    },
    BxOC: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return i
        }), n.d(t, "a", function() {
            return a
        });
        var r = window.ajax,
            o = 2;

        function i(e, t, n) {
            return t && (t.im_v = o), new Promise(function(o, i) {
                r.post(e, t, {
                    timeout: n,
                    onDone: function() {
                        o.apply(null, [
                            [].concat(Array.prototype.slice.call(arguments))
                        ])
                    },
                    onFail: function() {
                        return i.apply(null, arguments), !0
                    }
                })
            })
        }

        function a(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                o = void 0;
            return o = window.XDomainRequest ? new XDomainRequest : r._getreq(), {
                request: new Promise(function(r, i) {
                    var a = void 0,
                        c = Date.now(),
                        u = n.timeout || 60,
                        s = ajx2q(t);
                    if (window.XDomainRequest) o.open("get", e + "?" + s), o.ontimeout = function(e) {
                        i([e, {}])
                    }, o.onerror = function(e) {
                        i([e, {}])
                    }, o.onload = function() {
                        r([o.responseText, {}])
                    }, setTimeout(function() {
                        o.send()
                    }, 0);
                    else {
                        o.onreadystatechange = function() {
                            4 == o.readyState && (clearInterval(a), o.status >= 200 && o.status < 300 ? r([o.responseText, o]) : i([o.responseText, o]))
                        };
                        try {
                            o.open("GET", e + "?" + s, !0)
                        } catch (e) {
                            return i([e, o])
                        }
                        o.send()
                    }
                    a = setInterval(function() {
                        Date.now() - c > 1e3 * u && (i(["", {}]), clearInterval(a))
                    }, 1e3)
                }),
                cancel: function() {
                    o.abort()
                }
            }
        }
    },
    DM26: function(e, t, n) {
        "use strict";

        function r(e, t) {
            return new Promise(function(n) {
                setTimeout(n.bind(null, t), 1e3 * e)
            })
        }

        function o(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                o = 0;
            return function i() {
                for (var a = arguments.length, c = Array(a), u = 0; u < a; u++) c[u] = arguments[u];
                return Promise.resolve().then(function() {
                    return e.apply(void 0, c)
                }).catch(function(e) {
                    if (++o <= t) {
                        var a = "function" == typeof n ? n(o) : 0;
                        return 0 === a ? i.apply(void 0, c) : r(a).then(function() {
                            return i.apply(void 0, c)
                        })
                    }
                    throw e
                })
            }
        }

        function i(e, t, n) {
            var r = void 0,
                o = void 0;
            return function() {
                for (var i = arguments.length, a = Array(i), c = 0; c < i; c++) a[c] = arguments[c];
                return new Promise(function(e, i) {
                    var c = n && !r;
                    clearTimeout(r), o && o.reject("debounce"), r = setTimeout(function() {
                        r = null, o = null, n || e(a)
                    }, t), c ? e(a) : n && i("debounce"), o = {
                        resolve: e,
                        reject: i
                    }
                }).then(function(t) {
                    return e.apply(void 0, function(e) {
                        if (Array.isArray(e)) {
                            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                            return n
                        }
                        return Array.from(e)
                    }(t))
                })
            }
        }

        function a(e, t) {
            var n = void 0,
                r = new Promise(function(r) {
                    n = r, setTimeout(r.bind(null, t), 1e3 * e)
                });
            return {
                pause: function() {
                    return r
                },
                abort: function() {
                    n(t)
                }
            }
        }
        n.d(t, "c", function() {
            return r
        }), n.d(t, "d", function() {
            return o
        }), n.d(t, "b", function() {
            return i
        }), n.d(t, "a", function() {
            return a
        })
    },
    ERyv: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return s
        }), n.d(t, "b", function() {
            return _
        }), n.d(t, "a", function() {
            return d
        }), n.d(t, "d", function() {
            return l
        }), n.d(t, "e", function() {
            return f
        });
        var r = n("BxOC"),
            o = n("DM26"),
            i = void 0,
            a = 1;

        function c(e, t, n, r, o) {
            if ("Script error." !== e) {
                var a = o ? o.stack || o.message : null;
                _("unhandled_error", a ? {
                    err: e,
                    stack: a
                } : {
                    err: e
                })
            }
            i && i.apply(this, arguments)
        }

        function u(e) {
            e.preventDefault()
        }

        function s() {
            return !!window.imwl
        }

        function _(e, t) {
            var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            s() && (n && window.console && (console.error(e, t), console.trace && console.trace()), Object(o.d)(r.b, 3, function() {
                return 2
            })("al_im.php", {
                act: "a_weird_log",
                kind: e,
                data: JSON.stringify(extend({
                    errIdx: a++,
                    ua: navigator.userAgent
                }, t))
            }))
        }

        function d(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return _(e, extend({
                err: t && t.message || t
            }, n)), Promise.reject(t)
        }

        function l() {
            i = window.onerror, window.onerror = c, window.addEventListener("unhandledrejection", u)
        }

        function f() {
            window.onerror = i, i = void 0, window.removeEventListener("unhandledrejection", u)
        }
    },
    EasH: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return MessageBox
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return showBox
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return showTabbedBox
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return showFastBox
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return showCaptchaBox
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return showReCaptchaBox
        });
        var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("v+DW"),
            _debug_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("98sY"),
            _dom_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Egk5"),
            _ui_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ryw6"),
            _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("zxIV"),
            _fx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7jxN"),
            _utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("t7n3"),
            _lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("4+be"),
            _ajax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("Kngp"),
            _box_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("kcIO"),
            _accessibility__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("QGEU");

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
                options = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.i)(defaults, _options),
                guid = window._message_box_guid++,
                visible = !1,
                btns = {
                    ok: [],
                    cancel: []
                },
                boxTitleBck = void 0;
            options.progress || (options.progress = "box_progress" + guid);
            var controlsStyle = options.hideButtons ? ' style="display: none"' : "",
                boxContainer = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.e)("div", {
                    className: "popup_box_container" + (options.containerClass ? " " + options.containerClass : ""),
                    innerHTML: '\n<div class="box_layout" onclick="boxQueue.skip=true;">\n<div class="box_title_wrap">\n  <div class="box_x_button" aria-label="' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_close") + '" tabindex="0" role="button"></div>\n  <div class="box_title_controls"></div>\n  <div class="box_title"></div>\n</div>\n<div class="box_body" style="' + options.bodyStyle + '"></div>\n<div class="box_controls_wrap" ' + controlsStyle + '><div class="box_controls">\n<table cellspacing="0" cellpadding="0" class="fl_r"><tr></tr></table>\n<div class="progress" id="' + options.progress + '"></div>\n<div class="box_controls_text _box_controls_text">' + (options.textControls || "") + "</div>\n</div></div>\n</div>"
                }, {
                    display: "none"
                });
            Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxContainer);
            var boxLayout = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.u)(boxContainer),
                boxTitleWrap = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.u)(boxLayout),
                boxCloseButton = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.u)(boxTitleWrap),
                boxTitle = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.x)(boxTitleWrap),
                boxTitleControls = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.y)(boxCloseButton);
            options.noCloseButton && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxCloseButton);
            var boxBody = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.y)(boxTitleWrap),
                boxControlsWrap = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.y)(boxBody),
                boxControls = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.u)(boxControlsWrap),
                boxButtons = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.u)(boxControls),
                boxProgress = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.y)(boxButtons),
                boxControlsText = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.y)(boxProgress);
            boxLayer.appendChild(boxContainer), boxContainer.setAttribute("tabindex", 0), boxContainer.focus(), refreshBox(), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxContainer);
            var emitter = new EventEmitter;

            function refreshBox() {
                boxTitleBck || (options.title ? (boxTitle.innerHTML = options.title, Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ha)(boxBody, "box_no_title"), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxTitleWrap)) : (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.a)(boxBody, "box_no_title"), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxTitleWrap))), options.titleControls && (boxTitleControls.innerHTML = options.titleControls), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Va)(boxBody, "box_no_buttons", options.hideButtons), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Va)(boxTitleWrap, "box_grey", options.grey), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Va)(boxTitleWrap, "box_white", options.white), boxContainer.style.width = "string" == typeof options.width ? options.width : options.width + "px", boxContainer.style.height = "string" == typeof options.height ? options.height : options.height + "px"
            }

            function _addButton(e, t, n, r) {
                var o = "flat_button";
                "no" === n || "gray" === n ? (o += " secondary", n = "cancel") : n = "ok";
                var i = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.e)("button", {
                    className: o,
                    innerHTML: e,
                    id: r
                });
                return boxButtons.rows[0].insertCell(0).appendChild(i), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.d)(i, function() {
                    emitter.emit(n, retBox), t.apply(null, arguments)
                }), btns[n].push(i), i
            }

            function setControlsText(e) {
                boxControlsText.innerHTML = e
            }

            function _removeButtons() {
                for (var e = boxButtons.rows[0]; e.cells.length;) Object(_dom__WEBPACK_IMPORTED_MODULE_4__.g)(e.cells[0]), e.deleteCell(0);
                btns.ok.length = btns.cancel.length = 0
            }
            var destroyMe = function() {
                    Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onClean) && options.onClean(), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onDestroy) && options.onDestroy(), _removeButtons(), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.g)(boxContainer, boxCloseButton, boxTitleWrap, boxControlsWrap), boxLayer.removeChild(boxContainer), delete window._message_boxes[guid]
                },
                hideMe = function(e, t, n) {
                    if (visible) {
                        visible = !1;
                        var r = !0 === e ? 0 : options.animSpeed;
                        options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(document, "click", boxQueue.hideBGClick), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onBeforeHide) && options.onBeforeHide();
                        var o = function() {
                            boxQueue.currHiding === _message_boxes[guid] && (boxQueue.currHiding = !1), _message_boxes[guid].shOther || e || layers.boxhide(), !t && options.selfDestruct ? destroyMe() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxContainer), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onHide) && options.onHide(n)
                        };
                        r > 0 ? (boxQueue.currHiding = _message_boxes[guid], Object(_fx__WEBPACK_IMPORTED_MODULE_5__.f)(boxContainer, r, o)) : o()
                    }
                };

            function showMe(e, t, n) {
                if (!visible && window._message_boxes[guid]) {
                    visible = !0;
                    var r = !0 === e || t ? 0 : options.animSpeed;
                    if (options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(document, "click", boxQueue.hideBGClick), t || layers.boxshow(), boxQueue.currHiding) {
                        boxQueue.currHiding.shOther = !0;
                        var o = boxQueue.currHiding.bodyNode.parentNode.parentNode;
                        Object(_dom__WEBPACK_IMPORTED_MODULE_4__.i)(o, "tween").stop(!0)
                    }
                    r > 0 ? Object(_fx__WEBPACK_IMPORTED_MODULE_5__.e)(boxContainer, r) : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxContainer), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxContainer), options.onShow && options.onShow(n)
                }
            }
            Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(boxCloseButton, "click", boxQueue.hideLast);
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
                showCloseProgress: _dom__WEBPACK_IMPORTED_MODULE_4__.a.pbind(boxTitleWrap, "box_loading"),
                hideCloseProgress: _dom__WEBPACK_IMPORTED_MODULE_4__.Ha.pbind(boxTitleWrap, "box_loading"),
                showProgress: function() {
                    Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxControlsText), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxProgress)
                },
                hideProgress: function() {
                    Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxProgress), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxControlsText)
                },
                hide: function(e) {
                    return !(Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onHideAttempt) && !options.onHideAttempt(e)) && (boxQueue._hide(guid), !0)
                },
                isVisible: function() {
                    return visible
                },
                bodyHeight: function() {
                    return Object(_dom__WEBPACK_IMPORTED_MODULE_4__.O)(boxBody, "height")
                },
                content: function(e) {
                    return options.onClean && options.onClean(), boxBody.innerHTML = e, Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxContainer), boxContainer.focus(), refreshBox(), Object(_accessibility__WEBPACK_IMPORTED_MODULE_10__.c)(), this
                },
                emit: function(e, t) {
                    emitter.emit(e, t)
                },
                addButton: function(e, t, n, r, o) {
                    var i = _addButton(e, t || this.hide, n, o);
                    return r ? i : this
                },
                setButtons: function(e, t, n, r) {
                    var o = this.removeButtons();
                    return e ? (o.addButton(e, t), n && o.addButton(n, r, "no"), o) : o.addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("box_close"))
                },
                setControlsText: setControlsText,
                removeButtons: function() {
                    return _removeButtons(), this
                },
                setBackTitle: function(e) {
                    e ? (boxTitle.innerHTML = '<div class="back">' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_box_title_back") + "</div>", Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("back", boxTitle).onclick = e, boxTitleBck = options.title, options.title = boxTitle.innerHTML) : boxTitleBck && (boxTitle.innerHTML = options.title = boxTitleBck, boxTitleBck = !1)
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
                    Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxContainer)
                },
                setOptions: function(e) {
                    if (options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(document, "click", boxQueue.hideBGClick), options = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.i)(options, e), "bodyStyle" in e)
                        for (var t = options.bodyStyle.split(";"), n = 0, r = t.length; n < r; n++) {
                            var o = t[n].split(":");
                            o.length > 1 && o[0].length && (boxBody.style[Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(o[0])] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(o[1]), boxBody.style.setProperty && boxBody.style.setProperty(Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(o[0]), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(o[1]), ""))
                        }
                    return options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(document, "click", boxQueue.hideBGClick), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ua)(boxControlsWrap, !options.hideButtons), refreshBox(), options.noRefreshCoords || Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxContainer), this
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
                        Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.c)(e, {
                            dt: 15,
                            type: 7,
                            url: url,
                            query: params ? Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.b)(params) : void 0,
                            js: js
                        }), Object(_debug_tools__WEBPACK_IMPORTED_MODULE_1__.d)(e, scr)
                    }
                }
            };
            return retBox
        }

        function showBox(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                r = arguments[3];
            if (Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.d)(r)) return !1;
            var o = n.params || {};
            n.containerClass && (o.containerClass = n.containerClass);
            var i = new MessageBox(o),
                a = {
                    onDone: function(r, a, c, u) {
                        if (n.preOnDone && n.onDone && n.onDone(i), i.isVisible())
                            if (__debugMode) s();
                            else try {
                                s()
                            } catch (n) {
                                Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.c)(n, {
                                    dt: 15,
                                    type: 103,
                                    url: e,
                                    query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.b)(t),
                                    answer: Array.prototype.slice.call(arguments).join("<!>")
                                }), i.isVisible() && i.hide()
                            } else n.onDone && n.onDone(i, u);

                        function s() {
                            Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.a)(bodyNode, "layers_shown"), i.setOptions({
                                title: r,
                                hideButtons: o.hideButtons || !1
                            }), n.showProgress ? i.show() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(i.bodyNode), i.content(a), i.evalBox(c, e, t), n.onDone && n.onDone(i, u)
                        }
                    },
                    onFail: function(e) {
                        if (i.failed = !0, setTimeout(i.hide, 0), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(n.onFail)) return n.onFail(e)
                    },
                    cache: n.cache,
                    stat: n.stat,
                    fromBox: !0
                };
            return n.prgEl && (n.showProgress = _ui_util__WEBPACK_IMPORTED_MODULE_3__.a.pbind(n.prgEl, {
                cls: n.prgClass,
                w: n.prgW,
                h: n.prgH,
                hide: !0
            }), n.hideProgress = _dom__WEBPACK_IMPORTED_MODULE_4__.W.pbind("global_prg")), n.showProgress ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.i)(a, {
                showProgress: n.showProgress,
                hideProgress: n.hideProgress
            }) : (i.setOptions({
                title: !1,
                hideButtons: !0
            }).show(), boxQueue.count() < 2 && (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ha)(bodyNode, "layers_shown")), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(i.bodyNode), a.showProgress = function() {
                Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxLoader), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxLoader)
            }, a.hideProgress = _dom__WEBPACK_IMPORTED_MODULE_4__.W.pbind(boxLoader)), i.removeButtons().addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_close")), ajax.post(e, t, a), i
        }

        function showTabbedBox(e, t, n, r) {
            return (n = n || {}).stat = n.stat || [], n.stat.push("box.js", "boxes.css"), showBox(e, t, n, r)
        }

        function showFastBox(e, t, n, r, o, i) {
            return new MessageBox("string" == typeof e ? {
                title: e
            } : e).content(t).setButtons(n, r, o, i).show()
        }

        function showCaptchaBox(e, t, n, r) {
            var o = function(t) {
                    if (!t || void 0 === t.keyCode || 10 === t.keyCode || 13 === t.keyCode) {
                        var o = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("input", n.bodyNode);
                        if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(o.value) || !0 === t) {
                            var i = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("img", n.bodyNode)[0];
                            Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(o), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(i), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("progress", n.bodyNode)), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(o), r.onSubmit(e, o.value)
                        } else Object(_dom__WEBPACK_IMPORTED_MODULE_4__.E)(o)
                    }
                },
                i = !!n,
                a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.r)(t) ? "" : "&s=1",
                c = r.imgSrc || "/captcha.php?sid=" + e + a;
            if (!i) {
                var u = '\n<div class="captcha">\n  <div><img src="' + c + '"/></div>\n  <div>\n    <input type="text" class="big_text" maxlength="7" placeholder="' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_captcha_input_here") + '" />\n    <div class="progress" /></div>\n  </div>\n</div>' + (r.addText || "");
                n = showFastBox({
                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_enter_code"),
                    width: 305,
                    onHide: r.onHide,
                    onDestroy: r.onDestroy || !1
                }, u, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_send"), function() {
                    n.submit()
                }, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_cancel"), function() {
                    var e = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("input", n.bodyNode),
                        t = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("img", n.bodyNode);
                    Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(e), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(t), n.hide()
                })
            }
            n.submit = o.pbind(!0), n.changed = !0;
            var s = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("input", n.bodyNode),
                _ = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("img", n.bodyNode);
            return i && (s.value = "", _.src = "/captcha.php?sid=" + e + a, Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("progress", n.bodyNode))), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(s), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(s, "keypress", o), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(_, "click", function() {
                this.src = "/captcha.php?sid=" + e + a + "&v=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.s)(1e6, 2e6)
            }), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.E)(s), n
        }

        function showReCaptchaBox(e, t, n, r) {
            window.recaptchaResponse = function(e) {
                r.onSubmit(e)
            };
            var o = !!n,
                i = !!window.grecaptcha;
            if (!o) {
                i || (window.recaptchaCallback = function() {
                    var t = Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.b)();
                    if (t) {
                        var n = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("recaptcha", t.bodyNode);
                        n && (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ya)(n, ""), window.grecaptcha.render(n, {
                            sitekey: e,
                            callback: window.recaptchaResponse
                        }))
                    }
                }, headNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.e)("script", {
                    type: "text/javascript",
                    src: "https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit&hl=" + t
                })));
                var a = '<div class="recaptcha"></div>' + (r.addText || "");
                n = showFastBox({
                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_recaptcha_title"),
                    width: 354,
                    onHide: r.onHide,
                    onDestroy: r.onDestroy || !1
                }, a, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_cancel"));
                var c = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("recaptcha", n.bodyNode);
                c.id = "recaptcha" + (n.guid ? n.guid : "0"), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.u)(c)
            }
            return o && i ? window.grecaptcha.reset() : i && window.recaptchaCallback(), n.changed = !0, n
        }
    },
    Kngp: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return locBase
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return ajx2q
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return q2ajx
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return requestBox
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return activateMobileBox
        }), __webpack_require__.d(__webpack_exports__, "h", function() {
            return validateMobileBox
        }), __webpack_require__.d(__webpack_exports__, "i", function() {
            return validatePassBox
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return photoCaptchaBox
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return initAjax
        });
        var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("t7n3"),
            _debug_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("98sY"),
            _browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("gdug"),
            _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("zxIV"),
            _dom_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Egk5"),
            _message_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("EasH"),
            _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("aong"),
            _ui_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("ryw6"),
            _box_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("kcIO"),
            _lang__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("4+be"),
            locBase = location.toString().replace(/#.+$/, ""),
            decodeErors = {},
            iframeTransport = void 0,
            iframeTO = 0;

        function ajx2q(e, t) {
            var n = [],
                r = function(e) {
                    if (decodeErors[e]) return e;
                    try {
                        return encodeURIComponent(e)
                    } catch (e) {
                        return ""
                    }
                };
            for (var o in e)
                if (null != e[o] && !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.v)(e[o]))
                    if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.t)(e[o]))
                        for (var i = 0, a = 0, c = e[o].length; i < c; ++i) null == e[o][i] || Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.v)(e[o][i]) || (n.push(r(o) + "[" + a + "]=" + r(e[o][i])), ++a);
                    else n.push(r(o) + "=" + r(e[o]));
            return t || n.sort(), n.join("&")
        }

        function q2ajx(e) {
            if (!e) return {};
            var t = {},
                n = function(e) {
                    try {
                        return decodeURIComponent(e)
                    } catch (t) {
                        return decodeErors[e] = 1, e
                    }
                };
            return e = e.split("&"), Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(e, function(e, r) {
                var o = r.split("=");
                if (o[0]) {
                    var i = n(o[1] + "");
                    if ("[]" === o[0].substr(o.length - 2)) {
                        var a = n(o[0].substr(0, o.length - 2));
                        t[a] || (t[a] = []), t[a].push(i)
                    } else t[n(o[0])] = i
                }
            }), t
        }

        function requestBox(e, t, n) {
            return e.setOptions({
                onDestroy: n
            }), e.onDone = function() {
                t && t.apply(null, arguments)
            }, e
        }

        function activateMobileBox(e) {
            return requestBox(Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.b)("activation.php", {
                act: "activate_mobile_box",
                hash: e.hash
            }), function() {
                vk.nophone = 0, e.onDone()
            }, e.onFail)
        }

        function validateMobileBox(e) {
            return requestBox(Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.b)("activation.php", {
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
            return requestBox(Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.b)("activation.php", {
                act: "pass_validate_box",
                hash: e.hash
            }, {
                stat: ["uncommon.css"]
            }), e.onDone, e.onFail)
        }

        function photoCaptchaBox(e) {
            return requestBox(Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.b)("pcaptcha.php", {
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
                ajax._req || _browser__WEBPACK_IMPORTED_MODULE_2__.a.search_bot || location.replace("/badbrowser.php")
            },
            _getreq: function() {
                return ajax._req || ajax._init(), ajax._req()
            },
            _frameover: function(e, t) {
                if (iframeTransport) {
                    var n = iframeTransport.parentNode;
                    n.innerHTML = "", utilsNode.removeChild(n), iframeTransport = !1, (e || t) && ajax.framegot(!1, !1, e, t), ajax.framegot(!1), cur.onFrameBlocksDone && cur.onFrameBlocksDone(), ajax.tOver = (new Date).getTime()
                }
            },
            _receive: function _receive(cont, html, js, bench, params) {
                var container = cont && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)(cont);
                if (container && html && (container.firstChild ? container.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.f)(html)) : Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ya)(container, html)), js) {
                    var scr = "(function(){" + js + ";})()";
                    if (__debugMode) eval(scr);
                    else try {
                        eval(scr)
                    } catch (e) {
                        Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)(e, {
                            dt: 15,
                            type: 8,
                            url: ajax._frameurl,
                            js: js,
                            answer: Array.prototype.slice.call(arguments).join("<!>")
                        }), Object(_debug_tools__WEBPACK_IMPORTED_MODULE_1__.d)(e, scr)
                    }
                    bench && (ajax.tModule = cur.module)
                }
                params && "leftads" in params && window.__adsSet && __adsSet(params.leftads, params.ads_section || "", params.ads_can_show, params.ads_showed), ajax._framenext()
            },
            framedata: !1,
            _framenext: function() {
                if ((ajax.framedata || {}).length) {
                    var e = ajax.framedata.shift();
                    !0 === e ? ajax._framenext() : !1 === e ? (ajax.framedata = !1, cur.onFrameBlocksDone && cur.onFrameBlocksDone()) : iframeTO = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.B)(ajax._receive.pbind(e[0], e[1], e[2], !0, e[3]), 0)
                }
            },
            framegot: function(e, t, n, r) {
                ajax.framedata && (ajax.framedata.push(void 0 === t && void 0 === n && void 0 === r ? e : [e, t, n, r]), 1 == ajax.framedata.length && ajax._framenext())
            },
            framepost: function(e, t, n, r) {
                clearTimeout(iframeTO), iframeTransport && ajax._frameover(), iframeTransport = utilsNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.e)("div", {
                    innerHTML: "<iframe></iframe>"
                })).firstChild, ajax._framedone = n, ajax.framedata = [!0], e += "?" + ("string" != typeof t ? ajx2q(t, r && r.noSort) : t), e += ("?" != e.charAt(e.length - 1) ? "&" : "") + "_rndVer=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.s)(0, 99999), ajax._frameurl = iframeTransport.src = e
            },
            plainpost: function(e, t, n, r, o, i, a, c) {
                var u = ajax._getreq(),
                    s = "string" != typeof t ? ajx2q(t, a && a.noSort) : t;
                u.onreadystatechange = function() {
                    4 === u.readyState && (u.status >= 200 && u.status < 300 ? n && n(u.responseText, u) : r && r(u.responseText, u))
                };
                try {
                    u.open("POST", e, !0)
                } catch (e) {
                    return !1
                }
                return i && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(i, function(e, t) {
                    u[e] = t
                }), o || (u.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), c || u.setRequestHeader("X-Requested-With", "XMLHttpRequest")), u.send(s), u
            },
            post: function(e, t, n) {
                "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
                var r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)({
                        _captcha: !1,
                        _box: !1
                    }, n || {}),
                    o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)({
                        al: r.frame ? -1 : 1
                    }, t),
                    i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.L)(),
                    a = vk.spentLastSendTS ? Math.round((i - vk.spentLastSendTS) / 1e3) : 0;
                if (vk.sampleUser >= 0 && window.cur && cur.module && a >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (o._smt = cur.module + ":" + a), vk.spentLastSendTS = i), r.progress && (r.showProgress || (r.showProgress = function() {
                        var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)(r.progress);
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.V)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Qa)(e, "opacity", 1), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(e)
                    }), r.hideProgress || (r.hideProgress = function() {
                        var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)(r.progress);
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.V)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Qa)(e, "opacity", 0), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(e)
                    })), r.loader) {
                    var c = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Aa)(boxLayerWrap);
                    r.showProgress = function() {
                        boxRefreshCoords(boxLoader), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(boxLoader), c || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(boxLayerWrap)
                    }, r.hideProgress = function() {
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(boxLoader), c || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(boxLayerWrap)
                    }
                }
                return ajax._post(e, o, r)
            },
            preload: function(e, t, n) {
                "/" !== e.substr(0, 1) && (e = "/" + e), ajaxCache[e + "#" + ajx2q(t)] = n
            },
            invalidate: function(e, t) {
                void 0 === e ? ajaxCache = {} : delete ajaxCache[ajax._getCacheKey(e, t)]
            },
            _getCacheKey: function(e, t, n) {
                var r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.d)(t);
                return delete r.al, delete r.al_ad, delete r.ads_section, delete r.ads_showed, delete r.captcha_sid, delete r.captcha_key, delete r._smt, delete r._preload, e + "#" + ajx2q(r, n && n.noSort)
            },
            _debugLog: function(e, t) {
                window.debuglogGot && window.debuglogGot(t, e)
            },
            _parseRes: function(e, t) {
                for (var n = e.length - 1; n >= 0; --n) {
                    var r = e[n];
                    if ("<!" === r.substr(0, 2)) {
                        var o = r.indexOf(">"),
                            i = r.substr(2, o - 2);
                        switch (r = r.substr(o + 1), i) {
                            case "json":
                                e[n] = Object(_utils__WEBPACK_IMPORTED_MODULE_6__.l)(r);
                                break;
                            case "int":
                                e[n] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(r);
                                break;
                            case "float":
                                e[n] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.k)(r);
                                break;
                            case "bool":
                                e[n] = !!Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(r);
                                break;
                            case "null":
                                e[n] = null;
                                break;
                            case "pageview_candidate":
                                e.pop();
                                break;
                            case "debug":
                                ajax._debugLog(r, t), e.pop()
                        }
                    }
                }
            },
            _post: function _post(url, query, options) {
                !query.captcha_sid && options.showProgress && options.showProgress();
                var cacheKey = !1,
                    statAct = void 0;
                window.__adsGetAjaxParams && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(query, __adsGetAjaxParams(query, options)), options.cache && (cacheKey = ajax._getCacheKey(url, query, options));
                var hideBoxes = function() {
                        for (var e = 0, t = arguments.length; e < t; ++e) {
                            var n = arguments[e];
                            n && n.isVisible() && (n.setOptions({
                                onHide: !1,
                                onDestroy: !1
                            }), n.hide())
                        }
                        return !1
                    },
                    fail = function(e, t) {
                        if (options.hideProgress && options.hideProgress(), options._suggest && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.g)(options._suggest), options._box = hideBoxes(options._captcha, options._box), options._captcha = options._box, options._suggest = options._captcha, -1 !== e.indexOf("The page is temporarily unavailable") && __dev && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.o)(vk.id, [100])) return ajax._post(url, query, options), !1;
                        options.onFail && !0 === options.onFail(e) || Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)(e, {
                            dt: 5,
                            type: 3,
                            status: t.status,
                            url: url,
                            query: query && ajx2q(query, options.noSort)
                        })
                    };
                options.local && (fail = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.K)(fail)), options.stat && (statAct = !1, stManager.add(options.stat, function() {
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
                    switch (options.cache && !options.forceGlobalCache && (code || (ajaxCache[cacheKey] = answer)), options.hideProgress && options.hideProgress(), 2 !== code && (options._captcha && (options._suggest && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.g)(options._suggest), options._captcha = hideBoxes(options._captcha), options._suggest = options._captcha), options._box = hideBoxes(options._box)), code) {
                        case 1:
                            Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.d)({
                                width: 520,
                                title: answer[0],
                                onDestroy: options.onFail
                            }, answer[1]);
                            break;
                        case 2:
                            var addText = "";
                            if (2 === Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(answer[1])) {
                                var resend = function(e) {
                                    var t = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(query, {
                                            recaptcha: e
                                        }),
                                        n = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                            cache: -1
                                        }) : options;
                                    ajax._post(url, t, n)
                                };
                                options._captcha = Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.e)(answer[0], answer[2], options._captcha, {
                                    onSubmit: resend,
                                    addText: addText,
                                    onDestroy: function() {
                                        options.onFail && options.onFail()
                                    }
                                })
                            } else {
                                var _resend = function(e, t) {
                                    var n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(query, {
                                            captcha_sid: e,
                                            captcha_key: t
                                        }),
                                        r = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                            cache: -1
                                        }) : options;
                                    ajax._post(url, n, r)
                                };
                                options._captcha = Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.c)(answer[0], Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(answer[1]), options._captcha, {
                                    onSubmit: _resend,
                                    addText: addText,
                                    onDestroy: function() {
                                        options.onFail && options.onFail()
                                    }
                                })
                            }
                            options._suggest = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.H)("phone_validation_link", options._captcha.bodyNode), options._suggest && Object(_dom_events__WEBPACK_IMPORTED_MODULE_4__.b)(options._suggest, "click", function() {
                                options._box = validateMobileBox({
                                    onDone: options._captcha.submit
                                })
                            });
                            break;
                        case 11:
                        case 12:
                            var newOptions = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                cache: -1
                            }) : options;
                            options._box = validateMobileBox({
                                acceptCaptcha: 11 === code,
                                onDone: function(e, t) {
                                    vk.nophone = 0, e && (options._captcha = Object(_box_utils__WEBPACK_IMPORTED_MODULE_8__.b)());
                                    var n = e ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(query, {
                                        captcha_sid: e,
                                        captcha_key: t
                                    }) : query;
                                    ajax._post(url, n, newOptions)
                                },
                                onFail: options.onFail,
                                hash: answer[0],
                                ahash: answer[1]
                            });
                            break;
                        case 14:
                            var _newOptions = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                cache: -1
                            }) : options;
                            options._box = photoCaptchaBox({
                                onDone: ajax._post.pbind(url, query, _newOptions),
                                onFail: options.onFail
                            });
                            break;
                        case 15:
                            var _newOptions2 = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                cache: -1
                            }) : options;
                            options._box = validatePassBox({
                                onDone: ajax._post.pbind(url, query, _newOptions2),
                                onFail: options.onFail,
                                hash: answer[0]
                            });
                            break;
                        case 3:
                            var _newOptions3 = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                cache: -1
                            }) : options;
                            window.onReLoginDone = ajax._post.pbind(url, query, _newOptions3), window.onReLoginFailed = function(e, t) {
                                t ? nav.go(t) : -1 === e ? location.href = location.href.replace(/^http:/, "https:") : e ? nav.go("/") : window.onReLoginDone()
                            }, utilsNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.e)("iframe", {
                                src: vk.loginscheme + "://login.vk.com/?" + ajx2q({
                                    role: "al_frame",
                                    _origin: locProtocol + "//" + locHost,
                                    ip_h: answer[0] || vk.ip_h,
                                    to: answer[1] || ""
                                })
                            }));
                            break;
                        case 4:
                            Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(answer[1]) ? nav.go(answer[0], !1, {
                                nocur: "2" === answer[1],
                                noback: !0 === answer[1],
                                showProgress: options.showProgress,
                                hideProgress: options.hideProgress
                            }) : (hab.stop(), location.href = answer[0]);
                            break;
                        case 5:
                            nav.reload({
                                force: Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(answer[0]),
                                from: 1,
                                url: url,
                                query: query && ajx2q(query)
                            });
                            break;
                        case 6:
                            var _newOptions4 = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                cache: -1
                            }) : options;
                            options._box = activateMobileBox({
                                onDone: ajax._post.pbind(url, query, _newOptions4),
                                onFail: options.onFail,
                                hash: answer[0]
                            });
                            break;
                        case 7:
                            options.onFail && options.onFail(), Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.d)(answer[0], 10);
                            break;
                        case 8:
                            if (options.onFail && options.onFail(answer[0])) return;
                            Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)(answer[0] + (answer[2] ? " #" + answer[2] : ""), {
                                dt: answer[1] ? 0 : 10,
                                type: 4,
                                url: url,
                                query: query && ajx2q(query)
                            });
                            break;
                        case 9:
                            if ((options.fromBox || options.forceDone) && (options.onDone && options.onDone.apply(window, answer), options.fromBox)) break;
                            options._box = Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.d)({
                                title: Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.H)(answer[0])
                            }, answer[1]);
                            var _newOptions5 = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.d)(options), {
                                showProgress: options._box.showProgress,
                                hideProgress: options._box.hideProgress
                            });
                            options.cache && (_newOptions5.cache = -1), options._box = requestBox(options._box, function(e) {
                                Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Aa)(options._box.progress) || (e || (e = {
                                    _votes_ok: 1
                                }), ajax._post(url, Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(query, e), _newOptions5))
                            }, options.onFail), options._box.evalBox(answer[2]);
                            break;
                        case 10:
                            options._box = Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.d)({
                                title: answer[0] || Object(_lang__WEBPACK_IMPORTED_MODULE_9__.d)("global_charged_zone_title"),
                                onHide: options.onFail
                            }, answer[1], Object(_lang__WEBPACK_IMPORTED_MODULE_9__.d)("global_charged_zone_continue"), function() {
                                var e = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(query, {
                                    charged_confirm: answer[3]
                                });
                                ajax._post(url, e, options)
                            }, Object(_lang__WEBPACK_IMPORTED_MODULE_9__.d)("global_cancel"));
                            break;
                        case 13:
                            var evalString = "(function(){" + answer[0] + ";})()";
                            if (__debugMode) eval(evalString);
                            else try {
                                eval(evalString)
                            } catch (e) {
                                Object(_debug_tools__WEBPACK_IMPORTED_MODULE_1__.d)(e, evalString)
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
                options.local && (_processResponse = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.K)(_processResponse));
                var done = function(e, t) {
                    options.bench && (ajax.tDone = (new Date).getTime()), e = e.replace(/^<!--/, "").replace(/-<>-(!?)>/g, "--$1>"), Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.H)(e).length || (t = [8, Object(_lang__WEBPACK_IMPORTED_MODULE_9__.d)("global_unknown_error")], e = stVersions.nav + "<!><!>" + vk.lang + "<!>" + stVersions.lang + "<!>8<!>" + t[1]);
                    var n = e.split("<!>"),
                        r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.d)(n);
                    Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(r, function(e, t) {
                        return r[e] = t.substr(0, 100)
                    }), ajax.lastResp = r.join("<!>");
                    var o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n.shift());
                    if (!o) return fail("<pre>" + e + "</pre>", {
                        status: -1
                    });
                    if (vk.version && vk.version !== o) o && n.length > 4 ? nav.reload({
                        force: !0,
                        from: 2,
                        url: url,
                        query: query && ajx2q(query)
                    }) : nav.strLoc ? location.replace(locBase) : Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)("Server error.", {
                        type: 100
                    });
                    else {
                        vk.version = !1;
                        var i = n.shift(),
                            a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n.shift()),
                            c = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n.shift());
                        options.frame && (n = t);
                        var u = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n.shift());
                        if (vk.lang !== a && options.canReload) nav.reload({
                            force: !0,
                            from: 3,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        else {
                            var s = function() {
                                var e = ["common.css"];
                                if (i)
                                    for (var t = 0, r = (i = i.split(",")).length; t < r; ++t) e.push(i[t]);
                                if (stVersions.lang < c)
                                    for (var o in stVersions.lang = c, StaticFiles) /^lang\d/i.test(o) && e.push(o);
                                if (!options.frame) try {
                                    ajax._parseRes(n, options._reqid)
                                } catch (e) {
                                    Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)("<b>JSON Error:</b> " + e.message, {
                                        type: 5,
                                        answer: n.join("<!>"),
                                        url: url,
                                        query: query && ajx2q(query)
                                    })
                                }
                                stManager.add(e, _processResponse.pbind(u, n))
                            };
                            if (window.stVersions) {
                                if (o === stVersions.nav) return s();
                                headNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.e)("script", {
                                    type: "text/javascript",
                                    src: "/js/loader_nav" + o + "_" + vk.lang + ".js"
                                })), setTimeout(function e() {
                                    if (o === stVersions.nav) return s();
                                    setTimeout(e, 100)
                                }, 0)
                            }
                        }
                    }
                };
                if (options.local && (done = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.K)(done)), options.cache > 0 || options.forceGlobalCache) {
                    var answer = ajaxCache[cacheKey];
                    if (answer && answer._loading) return void answer._callbacks.push(_processResponse);
                    if (answer && !options.forceGlobalCache) return _processResponse(0, answer), void(3 === options.cache && delete ajaxCache[cacheKey]);
                    if (answer = window.globalAjaxCache[cacheKey]) return -1 == answer || Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.v)(answer) ? window.globalAjaxCache[cacheKey] = options.onDone : options.onDone.apply(window, answer), void(options.hideProgress && options.hideProgress())
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
    },
    MhhX: function(e, t, n) {
        "use strict";
        n.d(t, "n", function() {
            return i
        }), n.d(t, "l", function() {
            return a
        }), n.d(t, "e", function() {
            return c
        }), n.d(t, "k", function() {
            return u
        }), n.d(t, "c", function() {
            return s
        }), n.d(t, "g", function() {
            return d
        }), n.d(t, "d", function() {
            return l
        }), n.d(t, "m", function() {
            return f
        }), n.d(t, "f", function() {
            return b
        }), n.d(t, "i", function() {
            return m
        }), n.d(t, "j", function() {
            return p
        }), n.d(t, "o", function() {
            return h
        }), n.d(t, "h", function() {
            return g
        }), n.d(t, "b", function() {
            return v
        }), n.d(t, "a", function() {
            return O
        }), n.d(t, "p", function() {
            return j
        });
        var r = n("f01n"),
            o = n("aong");

        function i(e, t) {
            return "number" != typeof t.messageId || (u(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to)
        }

        function a(e) {
            return e.kludges && void 0 !== e.kludges.source_act
        }

        function c(e) {
            return "call" == e.kludges.attach1_type
        }

        function u(e) {
            return e.flags & r.m
        }

        function s(e) {
            var t = e.attaches.filter(function(e) {
                return "mail" === e.type
            }).length > 0;
            return e.attaches.filter(function(e) {
                return "reply" === e.type
            }).length > 0 || e.flags & r.k && t
        }

        function _(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                r = e.attaches[0];
            return r && (r.type === t || r.type === n)
        }

        function d(e) {
            return _(e, "doc") && "graffiti" === e.attaches[0].kind
        }

        function l(e) {
            return Boolean(e.attaches.find(function(e) {
                return "doc" === e.type && "audiomsg" === e.kind
            }))
        }

        function f(e) {
            return Boolean(e.attaches.find(function(e) {
                return "sticker" === e.type
            }))
        }

        function b(e) {
            return _(e, "gift")
        }

        function m(e) {
            return _(e, "money_transfer", "money_request")
        }

        function p(e) {
            return _(e, "money_request")
        }

        function h(e) {
            return _(e, "link", "vkpay") && 6217559 == e.kludges.attach1_app_id
        }

        function g(e) {
            return e.flags & r.l
        }

        function v(e) {
            return u(e) ? vk.id : e.userId
        }

        function O(e, t) {
            var n = Object(o.r)(e);
            return u(t) ? n.id : t.userId
        }

        function j(e) {
            return e.update_time > 0
        }
    },
    N1NS: function(e, t, n) {
        "use strict";
        var r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && c.return && c.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            o = new window.Map;

        function i(e) {
            var t = o.get(e.currentTarget);
            if (t) {
                var n = t[e.type];
                if (n)
                    for (var i = void 0, a = 0; a < n.length; a++) {
                        var c = r(n[a], 2),
                            u = c[0],
                            s = c[1],
                            _ = void 0;
                        if (hasClass(e.target, u) ? _ = s(e, e.target) : (i = gpeByClass(u, e.target, e.currentTarget)) && (_ = s(e, i)), !1 === _) break
                    }
            }
        }

        function a(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        n.d(t, "b", function() {
            return _
        }), n.d(t, "a", function() {
            return l
        }), n.d(t, "c", function() {
            return f
        });
        var c = window,
            u = c.addEvent,
            s = c.removeEvent;

        function _(e) {
            return {
                callMutations: function() {
                    if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                    return e
                },
                bindMutations: function() {
                    if ("function" != typeof e) throw console.trace(), new Error("Mutations are already initialized");
                    return e = e.apply(void 0, arguments)
                }
            }
        }

        function d(e, t, n, r, a) {
            ! function(e, t, n, r) {
                var a = o.get(e);
                a || (o.set(e, {}), a = o.get(e));
                for (var c = t.split(" "), u = 0; u < c.length; u++) {
                    var s = c[u];
                    a[s] || (a[s] = [], addEvent(e, s, i)), a[s].push([n, r])
                }
            }(t, n, r, a), e._registeredHandlers.push(["delegate", t, n, r, a])
        }

        function l(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(function(e, t, n, r) {
                u(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
            }.bind(null, t), d.bind(null, t)), t
        }

        function f(e) {
            e._registeredHandlers.forEach(function(e) {
                var t = e.slice(1);
                "delegate" === e[0] ? function(e, t, n, r) {
                    var a = o.get(e);
                    a && (t.split(" ").forEach(function(t) {
                        a[t] && (a[t] = a[t].filter(function(e) {
                            return e[0] !== n || e[1] !== r
                        }), 0 === a[t].length && removeEvent(e, t, i))
                    }), 0 === Object.keys(a).map(function(e) {
                        return a[e].length
                    }).reduce(function(e, t) {
                        return e + t
                    }) && o.delete(e))
                }.apply(void 0, a(t)) : s.apply(void 0, a(t))
            }), e._registeredHandlers = []
        }
    },
    O8ze: function(e, t, n) {
        "use strict";
        n.d(t, "e", function() {
            return a
        }), n.d(t, "g", function() {
            return c
        }), n.d(t, "d", function() {
            return u
        }), n.d(t, "f", function() {
            return s
        }), n.d(t, "k", function() {
            return d
        }), n.d(t, "m", function() {
            return l
        }), n.d(t, "l", function() {
            return f
        }), n.d(t, "h", function() {
            return b
        }), n.d(t, "i", function() {
            return p
        }), n.d(t, "j", function() {
            return h
        }), n.d(t, "c", function() {
            return g
        }), n.d(t, "b", function() {
            return v
        }), n.d(t, "a", function() {
            return O
        });
        var r = n("1y80"),
            o = n("aong"),
            i = {};

        function a(e) {
            Object(r.b)(.1, "im_forward_stat", _(e), !!e.get().gid)
        }

        function c(e, t) {
            Object(r.b)(.1, "im_forward_from_community_stat", _(e), !!e.get().gid, +t)
        }

        function u() {
            Object(r.b)(1, "im_apply_community_template_stat", 1)
        }

        function s() {
            Object(r.b)(1, "messages_channel_forward_click", 1)
        }

        function _(e) {
            var t = e.get().pendingForward;
            return +(t && t.msgIds && t.msgIds.length)
        }

        function d(e, t, n) {
            var o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (!Object(r.a)(1)) return function() {};
            var i = +new Date,
                a = m(e);
            return function() {
                var e = +new Date - i;
                Object(r.c)("messages_send_time_web", e, t, n, a, o)
            }
        }

        function l(e, t, n, r) {
            if (t.messageId && -1 !== String(t.messageId).indexOf("rid")) {
                var o = [t.messageId.replace("rid", ""), n, r].join("_"),
                    a = t.attaches.length > 0;
                i[o] = d(e, n, r, a)
            }
        }

        function f(e, t, n, r) {
            var o = [t.randomId, n, r].join("_"),
                a = i[o];
            a && (a(), delete i[o])
        }

        function b(e, t, n, o) {
            var i = m(e),
                a = "" === t ? "network" : "unknown";
            Object(r.a)(1) && Object(r.c)("messages_send_errors_web", a, n, o, i)
        }

        function m(e) {
            var t = Object(o.r)(e);
            return Boolean(t.longpoll && t.longpoll.isEnabled && t.longpoll.isEnabled())
        }

        function p(e) {
            var t = Object(o.r)(e),
                n = t.imQueue(t.peer).length;
            Object(r.a)(1) && Object(r.c)("messages_send_queue_size", n)
        }

        function h(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "unknown";
            Object(r.a)(1) && Object(r.c)("messages_send_retry", 1, t, e)
        }

        function g() {
            var e = "im_browser_notifications_users";
            ls.get(e) || ls.get("im_ui_notify_off") || (ls.set(e, 1), Object(r.c)(e, 1))
        }

        function v() {
            Object(r.b)(1, "im_browser_notifications_on", 1)
        }

        function O() {
            Object(r.b)(1, "im_browser_notifications_off", 1)
        }
    },
    P13b: function(e, t, n) {
        "use strict";
        var r = n("f01n"),
            o = n("h++7"),
            i = n("nyd8"),
            a = n("rHUl"),
            c = n("MhhX"),
            u = n("p3re"),
            s = n("eTng"),
            _ = n("vT4u"),
            d = n("N1NS"),
            l = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && c.return && c.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            f = "_im_join_chat";

        function b(e, t) {
            var n = Object(d.a)({
                handlers: function(n, o) {
                    o(e, "click", f, function(e) {
                        return function(e, t) {
                            var n = domData(t, "chat-id"),
                                o = domData(t, "hash");
                            return lockButton(t), Object(_.Z)(n, o, e.get()).then(function(n) {
                                var o = l(n, 1)[0];
                                unlockButton(t), e.get().longpoll.push([Object(r.Ba)(o)])
                            }).catch(function(e) {
                                showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
                            })
                        }(t, e.target)
                    })
                }
            });
            return {
                unmount: function() {
                    Object(d.c)(n)
                }
            }
        }
        var m = n("aong"),
            p = n("86+7"),
            h = n("Wu9C"),
            g = n("wSs/"),
            v = n("ERyv"),
            O = n("lJdi"),
            j = n("t7n3");
        n.d(t, "t", function() {
            return k
        }), n.d(t, "l", function() {
            return P
        }), n.d(t, "s", function() {
            return D
        }), n.d(t, "v", function() {
            return M
        }), n.d(t, "j", function() {
            return I
        }), n.d(t, "g", function() {
            return T
        }), n.d(t, "b", function() {
            return C
        }), n.d(t, "c", function() {
            return B
        }), n.d(t, "e", function() {
            return A
        }), n.d(t, "d", function() {
            return L
        }), n.d(t, "f", function() {
            return R
        }), n.d(t, "h", function() {
            return W
        }), n.d(t, "a", function() {
            return U
        }), n.d(t, "k", function() {
            return K
        }), n.d(t, "o", function() {
            return q
        }), n.d(t, "m", function() {
            return S
        }), n.d(t, "n", function() {
            return H
        }), n.d(t, "p", function() {
            return N
        }), n.d(t, "i", function() {
            return F
        }), n.d(t, "u", function() {
            return z
        }), n.d(t, "q", function() {
            return V
        }), n.d(t, "r", function() {
            return G
        }), n.d(t, "U", function() {
            return Je
        }), n.d(t, "Jb", function() {
            return Xe
        }), n.d(t, "L", function() {
            return Ze
        }), n.d(t, "y", function() {
            return Ye
        }), n.d(t, "G", function() {
            return $e
        }), n.d(t, "Fa", function() {
            return tt
        }), n.d(t, "Eb", function() {
            return nt
        }), n.d(t, "gb", function() {
            return rt
        }), n.d(t, "Q", function() {
            return ot
        }), n.d(t, "I", function() {
            return at
        }), n.d(t, "jc", function() {
            return ct
        }), n.d(t, "J", function() {
            return ut
        }), n.d(t, "vb", function() {
            return _t
        }), n.d(t, "K", function() {
            return dt
        }), n.d(t, "x", function() {
            return ft
        }), n.d(t, "Hb", function() {
            return bt
        }), n.d(t, "jb", function() {
            return mt
        }), n.d(t, "Db", function() {
            return pt
        }), n.d(t, "La", function() {
            return ht
        }), n.d(t, "Ua", function() {
            return gt
        }), n.d(t, "Pa", function() {
            return vt
        }), n.d(t, "bb", function() {
            return Ot
        }), n.d(t, "cb", function() {
            return jt
        }), n.d(t, "H", function() {
            return Pt
        }), n.d(t, "hc", function() {
            return xt
        }), n.d(t, "bc", function() {
            return Dt
        }), n.d(t, "D", function() {
            return Mt
        }), n.d(t, "xb", function() {
            return Bt
        }), n.d(t, "qb", function() {
            return At
        }), n.d(t, "wb", function() {
            return Lt
        }), n.d(t, "sb", function() {
            return Rt
        }), n.d(t, "zb", function() {
            return Wt
        }), n.d(t, "rb", function() {
            return Ut
        }), n.d(t, "Ab", function() {
            return Kt
        }), n.d(t, "Kb", function() {
            return qt
        }), n.d(t, "dc", function() {
            return St
        }), n.d(t, "mb", function() {
            return Ht
        }), n.d(t, "ob", function() {
            return Ft
        }), n.d(t, "nb", function() {
            return zt
        }), n.d(t, "Gb", function() {
            return Vt
        }), n.d(t, "O", function() {
            return Gt
        }), n.d(t, "hb", function() {
            return Qt
        }), n.d(t, "tb", function() {
            return Xt
        }), n.d(t, "Ib", function() {
            return Zt
        }), n.d(t, "Bb", function() {
            return Yt
        }), n.d(t, "w", function() {
            return $t
        }), n.d(t, "Fb", function() {
            return en
        }), n.d(t, "ab", function() {
            return tn
        }), n.d(t, "Zb", function() {
            return nn
        }), n.d(t, "lc", function() {
            return rn
        }), n.d(t, "ec", function() {
            return on
        }), n.d(t, "E", function() {
            return an
        }), n.d(t, "ub", function() {
            return cn
        }), n.d(t, "Pb", function() {
            return un
        }), n.d(t, "Rb", function() {
            return sn
        }), n.d(t, "Xb", function() {
            return _n
        }), n.d(t, "Tb", function() {
            return dn
        }), n.d(t, "F", function() {
            return ln
        }), n.d(t, "Ea", function() {
            return fn
        }), n.d(t, "gc", function() {
            return bn
        }), n.d(t, "Yb", function() {
            return mn
        }), n.d(t, "C", function() {
            return pn
        }), n.d(t, "Qa", function() {
            return hn
        }), n.d(t, "db", function() {
            return gn
        }), n.d(t, "Va", function() {
            return vn
        }), n.d(t, "Xa", function() {
            return On
        }), n.d(t, "Wa", function() {
            return jn
        }), n.d(t, "z", function() {
            return En
        }), n.d(t, "Wb", function() {
            return yn
        }), n.d(t, "W", function() {
            return wn
        }), n.d(t, "V", function() {
            return kn
        }), n.d(t, "Mb", function() {
            return xn
        }), n.d(t, "Lb", function() {
            return Dn
        }), n.d(t, "S", function() {
            return Mn
        }), n.d(t, "Ob", function() {
            return In
        }), n.d(t, "Ma", function() {
            return Tn
        }), n.d(t, "kc", function() {
            return Cn
        }), n.d(t, "pb", function() {
            return Bn
        }), n.d(t, "Ta", function() {
            return An
        }), n.d(t, "Ca", function() {
            return Ln
        }), n.d(t, "Aa", function() {
            return Rn
        }), n.d(t, "Ba", function() {
            return Wn
        }), n.d(t, "Da", function() {
            return Un
        }), n.d(t, "Cb", function() {
            return Kn
        }), n.d(t, "ib", function() {
            return Sn
        }), n.d(t, "ic", function() {
            return Hn
        }), n.d(t, "yb", function() {
            return Nn
        }), n.d(t, "Sb", function() {
            return Fn
        }), n.d(t, "Nb", function() {
            return zn
        }), n.d(t, "Y", function() {
            return Vn
        }), n.d(t, "A", function() {
            return Gn
        }), n.d(t, "Ub", function() {
            return Qn
        }), n.d(t, "Vb", function() {
            return Jn
        }), n.d(t, "eb", function() {
            return Xn
        }), n.d(t, "P", function() {
            return Zn
        }), n.d(t, "kb", function() {
            return Yn
        }), n.d(t, "lb", function() {
            return $n
        }), n.d(t, "cc", function() {
            return er
        }), n.d(t, "Sa", function() {
            return tr
        }), n.d(t, "Qb", function() {
            return nr
        }), n.d(t, "ac", function() {
            return rr
        }), n.d(t, "B", function() {
            return or
        }), n.d(t, "T", function() {
            return ir
        }), n.d(t, "N", function() {
            return ar
        }), n.d(t, "M", function() {
            return cr
        }), n.d(t, "X", function() {
            return ur
        }), n.d(t, !1, function() {
            return a.h
        }), n.d(t, !1, function() {
            return a.K
        }), n.d(t, !1, function() {
            return a.o
        }), n.d(t, !1, function() {
            return a.f
        }), n.d(t, !1, function() {
            return a.j
        }), n.d(t, "Z", function() {
            return a.t
        }), n.d(t, !1, function() {
            return a.g
        }), n.d(t, !1, function() {
            return a.s
        }), n.d(t, !1, function() {
            return a.n
        }), n.d(t, !1, function() {
            return a.b
        }), n.d(t, !1, function() {}), n.d(t, !1, function() {
            return a.J
        }), n.d(t, !1, function() {
            return a.l
        }), n.d(t, !1, function() {
            return a.k
        }), n.d(t, !1, function() {
            return a.P
        }), n.d(t, !1, function() {
            return a.d
        }), n.d(t, !1, function() {
            return a.m
        }), n.d(t, !1, function() {
            return a.q
        }), n.d(t, "Ia", function() {
            return a.z
        }), n.d(t, "Ra", function() {
            return a.G
        }), n.d(t, "Na", function() {
            return a.D
        }), n.d(t, "Ja", function() {
            return a.B
        }), n.d(t, !1, function() {
            return a.y
        }), n.d(t, "R", function() {
            return a.e
        }), n.d(t, "Za", function() {
            return a.I
        }), n.d(t, "Oa", function() {
            return a.E
        }), n.d(t, !1, function() {
            return a.O
        }), n.d(t, !1, function() {
            return a.F
        }), n.d(t, !1, function() {
            return a.w
        }), n.d(t, !1, function() {
            return a.N
        }), n.d(t, "Ka", function() {
            return a.C
        }), n.d(t, !1, function() {
            return a.A
        }), n.d(t, !1, function() {
            return a.a
        }), n.d(t, !1, function() {
            return a.L
        }), n.d(t, !1, function() {
            return a.r
        }), n.d(t, !1, function() {
            return a.M
        }), n.d(t, !1, function() {
            return a.H
        }), n.d(t, !1, function() {
            return a.p
        }), n.d(t, !1, function() {
            return a.c
        }), n.d(t, "Ga", function() {
            return a.x
        }), n.d(t, !1, function() {
            return a.i
        }), n.d(t, !1, function() {
            return a.u
        }), n.d(t, !1, function() {
            return a.v
        }), n.d(t, "fc", function() {
            return a.Q
        }), n.d(t, !1, function() {
            return a.R
        }), n.d(t, "Ha", function() {
            return s.b
        }), n.d(t, "fb", function() {
            return s.d
        }), n.d(t, "Ya", function() {
            return s.c
        });
        var E = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && c.return && c.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };

        function w(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var k = "_im_mess_sending",
            P = "_im_mess_failed",
            x = "_im_mess_original",
            D = "_im_mess_restore",
            M = "_im_typing",
            I = "chat_create",
            T = "chat_title_update",
            C = "chat_invite_user",
            B = "chat_kick_user",
            A = "chat_photo_update",
            L = "chat_photo_remove",
            R = "chat_pin_message",
            W = "chat_unpin_message",
            U = "chat_invite_user_by_link",
            K = "_im_deselect_all",
            q = "_im_top_notice_hide",
            S = "_im_aside_notice_hide",
            H = "_im_aside_promo_block_hide",
            N = "_im_vkadmin_promo_link",
            F = "_im_clear_recent",
            z = "_im_toggle_mr_tab",
            V = "_im_mess_search",
            G = "_im_pinned",
            Q = window,
            J = Q.vk,
            X = Q.ls,
            Z = Q.se,
            Y = Q.re,
            $ = Q.rs,
            ee = Q.sech,
            te = Q.inArray,
            ne = Q.intval,
            re = Q.trim,
            oe = Q.stripHTML,
            ie = Q.domFC,
            ae = Q.domPS,
            ce = Q.domLC,
            ue = Q.domChildren,
            se = Q.domClosestSibling,
            _e = Q.domData,
            de = Q.geByClass,
            le = Q.geByClass1,
            fe = Q.gpeByClass,
            be = Q.addClass,
            me = Q.removeClass,
            pe = Q.toggleClass,
            he = Q.hasClass,
            ge = Q.attr,
            ve = Q.setStyle,
            Oe = Q.val,
            je = Q.getTemplate,
            Ee = Q.getLang,
            ye = Q.langSex,
            we = Q.langDate,
            ke = Q.langNumeric,
            Pe = Q.getDateText,
            xe = Q.getSmDate,
            De = Q.getShortDate,
            Me = Q.isSameDate,
            Ie = Q.isToday,
            Te = Q.ajax,
            Ce = Q.showBox,
            Be = Q.showFastBox,
            Ae = Q.showTabbedBox,
            Le = Q.showTooltip,
            Re = Q.mobPlatforms,
            We = Q.onlinePlatformClass,
            Ue = Q.AudioMessagePlayer,
            Ke = Q.Emoji,
            qe = Q.slideUp,
            Se = Q.fadeOut,
            He = Q.cancelEvent,
            Ne = Q.fifaReplaceText,
            Fe = 4096,
            ze = 100,
            Ve = 8,
            Ge = 52,
            Qe = "chatPosition";

        function Je() {
            return X.get(Qe) || 0
        }

        function Xe(e) {
            e >= window.clientHeight() - 30 && (e = 0), X.set(Qe, e)
        }

        function Ze(e, t) {
            var n = le(e, t);
            n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight && ve(n.firstElementChild, {
                height: n.parentNode.offsetHeight
            })
        }

        function Ye(e, t) {
            e && e.innerHTML !== t && (e.innerHTML = t)
        }

        function $e(e, t, n, r) {
            var o = t && !n ? 1 : !t && n ? -1 : 0;
            o && !Object(a.z)(e) && r().compensateHistoryHeightChange(o)
        }

        function et(e, t, n, r) {
            var o = window.devicePixelRatio >= 2 ? "256" : "128",
                i = "animation" === n,
                a = "im_gift";
            i && (a += " sticker_img");
            var c = '<img height="128" class="' + a + '" src="' + Stickers.getStickerUrl(ne(e), o) + '"/>';
            if (i) {
                var u = "animatedSticker" + r;
                c = '<div id="' + u + '" data-loop-count=3 data-animation-path="' + ("/stickers.php?act=proxy_animation&product_id=" + t + "&sticker_id=" + e) + '" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="' + r + '" data-sticker-id="' + ne(e) + '" class="sticker_animation sticker_animation_128 im_gift">' + c + "</div>";
                var s = !1;
                browser.msie ? (0 ^ r) === r && (s = !0) : s = Number.isInteger(r), s && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(u, 10)
            }
            return t && (c = '<a onmouseover="return Emoji.stickerOver(' + ne(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + ne(t) + ', this, event);">' + c + "</a>"), c = '<div class="im_sticker_row">' + c + "</div>"
        }

        function tt(e, t, n) {
            var r = e.get ? e.get() : e;
            if (Ot(r, t)) {
                var o = r.tabs[t].deleted || [];
                return te(n, o)
            }
            return !1
        }

        function nt(e, t, n) {
            var r = n.randomId,
                o = le("_im_mess_rid" + r, t);
            return o && (t = ft(e, n, t = Nt([o], t), !0, !1)), t
        }

        function rt(e) {
            var t = Object(a.a)(e);
            return browser.mobile && browser.safari ? Promise.resolve(!1) : void 0 !== t ? Promise.resolve(t) : ot().then(function(e) {
                return e.length > 0
            }).catch(function(e) {
                return !1
            })
        }

        function ot() {
            return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
                for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
                return t
            }) : Promise.reject(new Error("NotSupported"))
        }

        function it(e) {
            return je("im_preloader", {
                preloader: $(J.pr_tpl, {
                    id: ""
                }),
                cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
            })
        }

        function at(e) {
            var t = e.split(".");
            return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
        }

        function ct(e, t, n) {
            var r = _e(n, "msgid"),
                o = le("_im_mess_" + r, t),
                i = n.cloneNode(!0);
            return o && (o.parentNode.replaceChild(i, o), dt(t)), t
        }

        function ut(e, t, n) {
            var r = st(e, t),
                o = le("_im_mess_" + t.messageId, n);
            return o && (o.parentNode.replaceChild(Z(r), o), dt(n)), n
        }

        function st(e, t) {
            var n = ["_im_mess"],
                r = Object(c.n)(e.tabs[t.peerId], t),
                o = Object(c.c)(t) ? je("im_message_media", {
                    type: "reply",
                    messageId: t.messageId,
                    attaches: it("reply"),
                    text: ""
                }) : "";
            Object(c.k)(t) && r && n.push("im-mess_unread _im_mess_unread"), Object(c.k)(t) && n.push("im-mess_out"), Object(c.p)(t) && n.push("im-mess_was_edited"), Object(g.a)(e, t) && n.push("im-mess_editable"), Object(c.h)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
            var i = Date.now() - 1e3 * t.date > 1e3;
            t.local && i && n.push("im-mess_sending"), t.local && n.push("" + k), t.local && Object(c.p)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push("im-mess_failed " + P), Object(c.f)(t) && n.push("im-mess_gift");
            var _ = _t(t),
                d = function(e, t) {
                    var n = "",
                        r = Object(m.r)(e).sourceEnabled && t.kludges && t.kludges.from_widget && t.kludges.ref_source;
                    Object(c.p)(t) && (n += je("sImLblWasEdited", {
                        update_time: t.update_time
                    }));
                    if (Object(a.B)(e) && r) {
                        var o = t.kludges.ref_source,
                            i = {};
                        try {
                            (i = JSON.parse(Object(j.I)(o))).link && i.info && (i.link = Object(u.e)(Object(j.c)(i.link), u.b.bind(null, !1)), i = Object(j.c)(langStr(Ee("mail_source_info"), "link", i.link, "info", Object(j.c)(i.info))), n += je("sImLblWasSourceInfo", {
                                source: i
                            }))
                        } catch (e) {}
                    }
                    return n
                }(e, t),
                l = o + kt(e, t.text, t.kludges, !1, t.peerId);
            "" != l && (l += d), t.subject && "..." !== t.subject.trim() && !Object(s.b)(t.peerId) && (l = je("im_topic", {
                topic: t.subject
            }) + l);
            var f = je("im_message_media", {
                type: "media",
                messageId: t.messageId,
                attaches: _.join(""),
                text: Object(c.f)(t) ? '<div class="im-mess--gift-lbl">' + l + "</div>" : ""
            });
            return Object(c.f)(t) || (f = l + f), "" == l && (f += d), je("im_msg_row", {
                msg_id: t.messageId,
                from_id: t.peerId,
                aria_hidden: t.local && !t.failed ? "true" : "false",
                ts: t.date,
                marker_params: t.failed ? 'aria-label="' + Ee("mail_send_message_error") + '" role="link"' : "",
                unread_params: r ? 'aria-label="' + Ee("mail_unread_message") + '"' : "",
                cls: n.join(" ")
            }).replace("%text%", function() {
                return f
            })
        }

        function _t(e) {
            return e.attaches.reduce(function(t, n) {
                return !Object(c.c)(e) || "mail" !== n.type && "reply" !== n.type ? ("sticker" === n.type ? e.messageId ? t.push(et(n.id, n.productId, n.kind, e.messageId)) : t.push(et(n.id, n.productId)) : t.push(it(n.type)), t) : t
            }, [])
        }

        function dt(e) {
            for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) he(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", je("sImHistoryRowActions")), me(t[n], "_im_mess_noa")
        }

        function lt(e, t, n) {
            var r, o, i, a, c, u = J.id,
                s = e.attaches[0],
                _ = s.initiatorId,
                d = s.state,
                l = s.receiverId,
                f = void 0;
            switch (d) {
                case "reached":
                    f = Ee(u === _ ? "mail_call_outgoing" : "mail_call_incoming");
                    var b = t ? "" : (r = s.duration, o = Math.floor(r / 3600), i = Math.floor(r / 60) - 60 * o, a = !1, c = !1, [o, i, r - 3600 * o - 60 * i].reduce(function(e, t) {
                        return 0 !== t || c ? (a && (t = t < 10 ? "0" + t : t), a = !0, c = !0, e + ("" !== e ? ":" : "") + t) : (c = !0, e)
                    }, ""));
                    f = f.replace("{duration}", b);
                    break;
                case "canceled_by_initiator":
                    f = Ee(u === _ ? "mail_call_canceled" : "mail_call_missed");
                    break;
                case "canceled_by_receiver":
                    if (u === _) {
                        if (t) return Ee("mail_call_declined");
                        var m = Object(p.c)(n, l);
                        return m ? ye(m.sex, Ee("mail_call_declined_by", "raw")).replace("{user_name}", m.first_name) : Ee("mail_call_declined")
                    }
                    return Ee("mail_call_canceled");
                default:
                    f = Ee("mail_added_call")
            }
            return je("im_calls_link", {
                text: f
            })
        }

        function ft(e, t, n) {
            !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            var r = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                o = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
                i = Date.now() - 1e3 * t.date > 1e3,
                u = e.tabs[t.peerId];
            if (!n || le("_im_mess", n) || le("_im_bar_date", n) || (n.innerHTML = ""), u.skipped > 0) return n;
            var _ = [];
            t.local || (_ = e.imQueue(t.peerId, r)), _.length > 0 && Nt(_.map(function(e) {
                return le("_im_mess_rid" + e.rid, n)
            }, n).filter(function(e) {
                return e
            }));
            var d = st(e, t),
                l = ce(n);
            he(l, "_im_mess_stack") || (l = se(l, "._im_mess_stack", -1));
            for (var f = Object(a.k)(e, t.peerId, t.messageId); t.peerId === e.peer && f && !le("_im_mess_" + f.messageId);) f = Object(a.k)(e, t.peerId, f.messageId);
            var b = le("_im_unread_bar_row", n),
                h = Object(c.b)(t),
                g = f ? Et(f.date, e) : 0;
            if (!f || yt(u, f, t, e, o)) {
                var v = "",
                    O = !1;
                if (b && Object(c.k)(t) && Bn(e, n, t.peerId), 1 === u.unread && !Object(c.k)(t) && o && (v += je("im_mess_bar", {}), O = !0, Bn(e, n, t.peerId)), !Ie(new Date(g))) {
                    var j = new Date,
                        E = O ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                    v += je("im_day_bar", {
                        day: De(t.date, e.timeshift, !0, Ee("months_of", "raw"), !0),
                        date: t.date,
                        day_class: j.getDate() + j.getMonth() + j.getFullYear() + " " + E
                    })
                }
                if (Object(c.l)(t)) v += je("im_service_row", {
                    text: Yt(e, t, u),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else if (Object(c.e)(t)) v += je("im_service_row", {
                    text: Zt("", lt(t, !1, e), ""),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else {
                    var y = e.gid && Object(c.k)(t) ? ne(t.kludges.from_admin) || -e.gid : 0,
                        w = Object(p.c)(e, y ? -e.gid : h) || u,
                        P = Object(s.b)(t.peerId) ? w.name : w.first_name,
                        x = w.link || u.href,
                        D = je("im_mess_stack_name", {
                            name: P,
                            link: x,
                            class: Object(c.i)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                        });
                    if (Object(c.f)(t)) {
                        var M = Ee("mail_gift_message_sent", "raw");
                        D += ' <span class="im-mess-stack--gift">' + ye(w.sex || 0, M) + "</span>"
                    }
                    if (Object(c.i)(t)) {
                        var I = Object(c.j)(t) ? Ee("mail_money_request_message_sent", "raw") : Ee("mail_money_tranfer_message_sent", "raw");
                        D += ' <span class="im-mess-stack--money-transfer">' + ye(w.sex || 0, I) + "</span>"
                    }
                    var T = e.gid ? "/gim" + e.gid : "/im",
                        C = void 0;
                    if (C = t.local ? wt(t.date, e.timeshift) : je("im_stack_date", {
                            date: wt(t.date, e.timeshift),
                            link: T + "?sel=" + t.peerId + "&msgid=" + t.messageId
                        }), y && e.admins[y]) {
                        var B = e.admins[y],
                            A = y === J.id ? Ee("mail_by_you") : B[0];
                        C = C + " " + je("im_admin_link", {
                            name: A,
                            href: B[1]
                        })
                    }
                    v += je("im_mess_stack", {
                        photo: w.photo,
                        href: x,
                        cls: "",
                        date_attr: "",
                        link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                        name: oe(D),
                        stack_name: D,
                        peerId: h,
                        date: C,
                        messages: d,
                        admin: t.kludges.from_admin || 0
                    })
                }
                Object(m.p)(ee(v)).forEach(function(e) {
                    return n && n.appendChild(e)
                })
            } else b && e.peer === t.peerId && !u.inplaceSearch && Object(c.k)(t) && Bn(e, n, t.peerId), le("_im_stack_messages", l).appendChild(Z(d));
            return Object(c.k)(t) && !i && setTimeout(function() {
                var e = le("_im_mess_" + t.messageId, n);
                he(e, k) && be(e, "im-mess_sending")
            }, 500), _ = _.filter(function(e) {
                return e.rid !== t.randomId
            }), dt(n), bt(_, e, n)
        }

        function bt(e, t, n) {
            var r = void 0;
            return (r = "object" === (void 0 === e ? "undefined" : y(e)) ? e : t.imQueue(e, !1)).length > 0 && r.map(function(e) {
                return e.mess.failed = !!e.failed, e.mess
            }).filter(function(e) {
                return Object(a.m)(t, e.peerId, e.messageId)
            }).forEach(function(e) {
                return ft(t, e, n, !1)
            }), n
        }

        function mt(e, t, n) {
            var r = e.tabs[t];
            return Object(m.p)(de("_im_mess_unread", n)).forEach(function(e) {
                var t, n = ne(_e(e, "msgid"));
                n > 0 && r.out_up_to >= n && (me(e, "_im_mess_unread"), me(e, "im-mess_unread"), (t = le("_im_mess_blind_unread_marker", e)) && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex")))
            }), n
        }

        function pt(e, t, n) {
            var r = t.peerId,
                o = t.messageId,
                i = le("_im_msg_reply" + o, e),
                a = le("_im_msg_media" + o, e),
                c = n.tabs[r].mediacontent[o][0];
            return i && (i.innerHTML = c[0]), a && (a.innerHTML = c[1]), e
        }

        function ht(e, t) {
            if (!Object(a.E)(t, e.peerId)) return 0;
            var n = t.tabs[e.peerId];
            return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
        }

        function gt(e, t) {
            return e === t.peer
        }

        function vt(e, t) {
            return Object(O.m)(Object(a.t)(e, t), 1024)
        }

        function Ot(e, t) {
            return !!e.tabs[t]
        }

        function jt(e, t) {
            return !!Ot(e, t) && null !== e.tabs[t].lastmsg
        }

        function Et(e, t) {
            return 1e3 * e + 1e3 * t.timeshift
        }

        function yt(e, t, n, r, o) {
            if (Object(c.b)(t) !== Object(c.b)(n)) return !0;
            var i = Et(t.date, r),
                u = Et(n.date, r);
            return !Me(i, u) || (!(!Object(a.B)(r) || ne(t.kludges.from_admin) === ne(n.kludges.from_admin)) || (n.date - t.date > 300 || (!(!Object(c.l)(t) && !Object(c.l)(n)) || (!(!Object(c.e)(n) && !Object(c.e)(t)) || (!(!Object(c.f)(t) && !Object(c.f)(n)) || (!(!Object(c.g)(t) && !Object(c.g)(n)) || (!!Object(c.c)(n) || !(Object(c.n)(e, t) === Object(c.n)(e, n) || !o || Object(c.k)(n) || tn(n.peerId, r.gid)))))))))
        }

        function wt(e, t) {
            return we(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
        }

        function kt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                i = Math.round(1e9 * Math.random()).toString(16),
                c = {},
                s = 0;
            return t = (t = Object(u.e)(t || "", u.b.bind(null, r))).replace(/(<a.+?<\/a>)/gi, function(e) {
                var t = "!link_" + s + "_" + i + "!";
                return c[t] = e, s++, t
            }), t = Object(u.f)(t), t = Object(u.c)(t), t = Object(u.d)(t, function(t) {
                var n = Object(a.i)(e);
                return '<a href="/' + (n ? "gim" + n : "im") + "?sel=" + (o || Object(a.o)(e)) + "&st=" + encodeURIComponent(t) + '">' + t + "</a>"
            }), Object.keys(c).forEach(function(e) {
                t = t.replace(e, function() {
                    return c[e]
                })
            }), n.emoji && (t = Ke.emojiToHTML(t, !0)), Ne && (t = Ne(t)), t
        }

        function Pt(e) {
            return Object(s.b)(e) ? "c" + (e - 2e9) : e < -2e9 ? "e" + Math.abs(e + 2e9) : function(e) {
                return e > 19e8 && e < 2e9
            }(e) ? "mr" + (e - 19e8) : e
        }

        function xt(e) {
            switch (e.substr(0, 1)) {
                case "e":
                    return -2e9 - ne(e.substr(1));
                case "c":
                    return 2e9 + ne(e.substr(1));
                default:
                    return ne(e)
            }
        }

        function Dt(e) {
            return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
        }

        function Mt(e, t) {
            return {
                search: {
                    name: Ee("mail_im_peer_search"),
                    icon: "search"
                },
                block_community: {
                    icon: "block",
                    name: Ee("mail_block_comm_messages")
                },
                allow_community: {
                    icon: "unblock",
                    name: Ee("mail_allow_comm_messages")
                },
                clear: {
                    name: e.peer < -2e9 ? Ee("mail_im_delete_email_contact") : Ee("mail_im_delete_all_history"),
                    icon: "clear"
                },
                chat: {
                    name: Ee("mail_im_create_chat_with"),
                    icon: "invite"
                },
                mute: {
                    name: Ee("mail_im_mute"),
                    icon: "mute"
                },
                unmute: {
                    name: Ee("mail_im_unmute"),
                    icon: "unmute"
                },
                photos: {
                    name: e.gid ? Ee("mail_im_show_media_history_group") : Ee("mail_im_show_media_history"),
                    icon: "media"
                },
                avatar: {
                    icon: "avatar",
                    name: Ee("mail_update_photo_red")
                },
                block: {
                    icon: "block",
                    name: Ee("mail_block_user")
                },
                invite: {
                    icon: "invite",
                    name: Ee("mail_im_create_chat_with")
                },
                invite_link: {
                    icon: "invite-link",
                    name: Ee(t ? "mail_vkcomgroup_invite_link" : "mail_chat_invite_link")
                },
                leave: {
                    icon: "leave",
                    name: Ee(t ? "mail_leave_channel" : "mail_leave_chat")
                },
                topic: {
                    icon: "topic",
                    name: Ee("mail_change_topic")
                },
                return: {
                    icon: "return",
                    name: Ee(t ? "mail_return_to_vkcomgroup" : "mail_return_to_chat")
                },
                pin_hide: {
                    icon: "pin_hide",
                    name: Ee("mail_menu_pin_hide")
                },
                pin_unhide: {
                    icon: "pin_unhide",
                    name: Ee("mail_menu_pin_show")
                },
                unpin: {
                    icon: "unpin",
                    name: Ee("mail_menu_unpin")
                },
                settings: {
                    icon: "settings",
                    name: Ee(t ? "mail_vkcomgroup_settings" : "mail_settings")
                }
            }
        }

        function It(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
            return t && (n = je("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
        }

        function Tt(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
            return t && (n = je("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
        }

        function Ct(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
            switch (e.length) {
                case 1:
                    return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
                case 2:
                    return e.map(function(e, n) {
                        return It(e, t[n])
                    }).join("");
                case 3:
                    return It(e[0], t[0]) + e.slice(1).map(function(e, n) {
                        return Tt(e, t[n + 1])
                    }).join("");
                case 4:
                    return e.map(function(e, n) {
                        return Tt(e, t[n])
                    }).join("")
            }
        }

        function Bt(e, t, n) {
            if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
            if (Object(s.b)(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
            if (Array.isArray(t.photo)) return Ct(t.photo);
            var r = t.data.active.slice(0, 4).map(p.c.bind(null, e));
            return Ct(r.map(function(e) {
                return e.photo
            }), n ? [] : r.map(function(e) {
                return e.link
            }))
        }

        function At(e) {
            var t = e.get().gid ? Ee("mail_search_only_messages_comm") : Ee("mail_search_only_messages");
            return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + V + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
        }

        function Lt() {
            return '<li class="im-search-results-head">' + Ee("mail_search_messages") + "</li>"
        }

        function Rt() {
            return '<li class="im-search-results-head">' + Ee("mail_search_conversations_sep") + "</li>"
        }

        function Wt() {
            return '<li class="im-search-results-head">' + Ee("mail_search_dialogs_sep") + "</li>"
        }

        function Ut() {
            return '<li class="im-search-results-head _im_recent_bar">\n    ' + Ee("mail_recent_searches") + '\n    <button type="button" class="' + F + ' im-page--clear-recent">' + Ee("mail_clear_recent") + "</button>\n  </li>"
        }

        function Kt(e) {
            var t = e.get().popular_sugg,
                n = Object(a.z)(e) ? 8 : 5;
            return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(function(t) {
                var n = t.peerId,
                    r = Object(p.c)(e, n) || t,
                    o = e.get().tabs[n] || t,
                    i = (e.get().mutedPeers || []).indexOf(n) >= 0;
                return '<div class="' + ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + n, o.unread > 0 && "sugg-is_unread", i && "sugg-is_muted"].filter(function(e) {
                    return !!e
                }).join(" ") + '" data-peer="' + n + '">\n    <a class="im-popular--avatar-w ' + We(o.online) + '" href="' + r.link + '"><img class="im-popular--avatar" src="' + r.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + r.link + '">' + (r.first_name || r.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + Dt(o.unread) + "</span>\n</div>"
            }).join("") + "</li>"
        }

        function qt(e, t, n) {
            var r = le("_im_mess_" + t.messageId, n);
            if (r) {
                ge(r, "aria-hidden", "false"), be(r, "im-mess_failed " + P);
                var o = le("_im_mess_marker", r);
                ge(o, "aria-label", Ee("mail_send_message_error")), ge(o, "role", "link")
            }
            return n
        }

        function St(e, t, n) {
            var r = le("_im_mess_" + t, n);
            if (r) {
                me(r, "im-mess_failed"), ge(r, "aria-hidden", "true"), me(r, P);
                var o = le("_im_mess_marker", r);
                ge(o, "aria-label", ""), ge(o, "role", "")
            }
            return n
        }

        function Ht(e, t) {
            return Nt(e.map(function(e) {
                return le("_im_mess_" + e, t)
            }).filter(function(e) {
                return e
            }), t)
        }

        function Nt(e, t) {
            var n = e.filter(function(e) {
                return !he(e, "im-mess_srv")
            }).map(function(e) {
                return e.parentNode
            });
            return e.forEach(function(e) {
                he(e, "im-mess_srv") ? e.parentNode.parentNode.removeChild(e.parentNode) : e.parentNode.removeChild(e)
            }), n.filter(function(e) {
                return 0 === ue(e).length
            }).map(function(e) {
                return fe("_im_mess_stack", e)
            }).forEach(function(e) {
                he(ae(e), "_im_bar_date") && Y(ae(e)), he(ae(e), "_im_unread_bar_row") && Y(ae(e)), Y(e)
            }), t
        }

        function Ft(e) {
            for (var t = e; t;) {
                var n = t;
                if (null === (t = t.previousElementSibling)) {
                    he(n, "mess_srv") && (t = n.parentNode);
                    var r = fe("_im_mess_stack", n);
                    r && (t = r.previousElementSibling, 1 === ue(n.parentNode).length && r.parentNode.removeChild(r))
                }
                he(n, "_im_unread_bar_row") || n.parentNode.removeChild(n)
            }
        }

        function zt(e, t, n, r) {
            return e.map(function(e) {
                return le("_im_mess_" + e, r)
            }).filter(function(e) {
                return e
            }).forEach(function(e) {
                Oe(e, function(e, t, n) {
                    var r = t.innerHTML;
                    return '<div class="im-mess--text">\n    ' + Ee("delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam") + ' <button type="button" data-peer="' + e + '" class="' + D + ' im-mess--btn">' + Ee("mail_restore") + '</button>\n    <div class="' + x + ' im-mess--original">' + r + "</div>\n  </div>"
                }(t, e, n)), be(e, "im-mess_light")
            }), r
        }

        function Vt(e, t, n) {
            var r = le("_im_mess_" + e, n);
            if (r) {
                var o = le(x, r);
                Oe(r, o.innerHTML), me(r, "im-mess_light")
            }
            return n
        }

        function Gt() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1],
                n = arguments[2],
                r = arguments[3],
                o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2;
            if (arguments.length > 5 && void 0 !== arguments[5] && arguments[5]) return Jt(e, t, n, r, !0, o);
            var i = Jt(e, t, n, r, !1, o);
            return i.length > 60 ? Jt(e, t, n, r, !0, o) : i
        }

        function Qt(e) {
            var t, n = (w(t = {}, _.d, 1), w(t, _.c, 2), t),
                r = Object.keys(e).sort(function(e, t) {
                    return n[t] - n[e]
                }),
                o = {},
                i = r.reduce(function(t, n) {
                    var r = (e[n] || {}).userIds;
                    return (void 0 === r ? [] : r).forEach(function(e) {
                        o[e] || (o[e] = !0, t[n] = !0)
                    }), t
                }, {}),
                a = r.filter(function(e) {
                    return !!i[e]
                });
            return a.length > 1 ? "" : a[0]
        }

        function Jt(e, t, n, r, o, i) {
            var c = function(e, t, n) {
                var r = [],
                    o = {};
                return Object.keys(t).map(function(n) {
                    ((t[n] || {}).userIds || []).forEach(function(t) {
                        Object(p.b)(e, t) ? parseInt(t, 10) !== e.id && (o[t] = n) : r.push(t)
                    })
                }), r.length && Object(_.Ha)(w({}, n, r), e), Object.keys(o).sort(function(e, n) {
                    return t[o[e]].ts - t[o[n]].ts
                })
            }(r, e, t);
            if (0 === c.length) return "";
            var u = Object(s.d)(t) || Object(a.C)(t) ? "first_name" : o ? "short_name" : "name",
                d = Qt(e),
                l = "";
            d === _.c ? l = Ee("mail_recording_audio_several", c.length) : d === _.d && (l = Ee("mail_typing_several", c.length));
            var f = c.slice(0, Math.min(c.length - 1, i)),
                b = f.map(function(e) {
                    return Object(p.c)(r, e)[u]
                }).join(", ");
            if (c.length > i + 1) {
                var m = function(e) {
                    var t = {};
                    return Object.keys(e).forEach(function(n) {
                        var r = e[n].userIds;
                        (void 0 === r ? [] : r).forEach(function(e) {
                            t[e] = 1
                        })
                    }), Object.keys(t).length
                }(e);
                b += " " + Ee("mail_and_peer").replace("{count}", m - i).replace("{typing}", l)
            } else {
                if (c.length > 1 && (b += " " + Ee("mail_and_peer_one")), !Object(s.b)(t) && n) b += " " + l;
                else b += " " + Object(p.c)(r, c[f.length])[u] + " " + l
            }
            return b.trim()
        }

        function Xt() {
            return '<div class="im-page--chat-search-empty">\n    ' + Ee("mail_im_search_empty") + "\n  </div>"
        }

        function Zt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return n ? '<a class="im_srv_lnk ' + r + '" target="_blank" href="' + e + '">' + t + "</a>" : '<span class="' + r + '">' + t + "</span>"
        }

        function Yt(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                o = t.kludges,
                i = o.source_act,
                a = ne(o.source_mid),
                c = t.userId,
                u = Object(p.c)(e, c),
                s = "",
                _ = c === a;
            switch (i) {
                case I:
                    s = "mail_im_chat_created";
                    break;
                case T:
                    s = o.source_is_channel ? "mail_im_title_updated_channel" : "mail_im_title_updated_dot";
                    break;
                case C:
                    s = _ ? "mail_im_returned_to_chat" : "mail_im_invited";
                    break;
                case B:
                    s = _ ? "mail_im_left" : "mail_im_kicked_from_chat";
                    break;
                case A:
                    s = "mail_im_photo_set";
                    break;
                case L:
                    s = o.source_is_channel ? "mail_im_photo_removed_channel" : "mail_im_photo_removed";
                    break;
                case R:
                    s = o.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                    break;
                case W:
                    s = o.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                    break;
                case U:
                    s = "mail_im_invite_by_link";
                    break;
                default:
                    return "mail_no_support"
            }
            if (s = (s = ye(u.sex, Ee(s, "raw"))).replace("{from}", Zt(u.link, u.name, r)), a && a !== c) {
                var d = o.source_email;
                if (d) s = s.replace("{user}", Zt("/im?email=" + encodeURIComponent(d), "email", r));
                else {
                    var l = Object(p.c)(e, a),
                        f = i === B ? l.inv_name : l.kick_name;
                    s = s.replace("{user}", Zt(l.link, f, r))
                }
            }
            if (o.source_text) {
                var b = o.source_old_text ? '«<b class="im_srv_lnk">' + o.source_old_text + "</b>» &rarr; " : "";
                s = s.replace("{title}", b + '«<b class="im_srv_lnk">' + o.source_text + "</b>»")
            }
            if (o.source_act === R || o.source_act === W)
                if (o.source_message) {
                    var m = Zt("", en(Ke.emojiToHTML(oe(o.source_message.replace(/<br\s?\/?>/gi, " ")), !0)), !1, "im_srv_mess_link");
                    s = s.replace("{msg}", m)
                } else s = s.replace(/{link}(.+){\/link}/i, function(e, t) {
                    return Zt("", t, !1, "im_srv_mess_link")
                });
            return s
        }

        function $t(e, t, n, r) {
            if (t === A) {
                var o = le("_im_mess_" + e.messageId, r);
                if (o) {
                    var i = n.tabs[e.peerId];
                    o.parentNode.innerHTML = je("im_msg_row", {
                        msg_id: e.messageId,
                        from_id: e.peerId,
                        text: Yt(n, e, i) + n.chat_photo_msg,
                        ts: e.date,
                        cls: "im-mess_srv"
                    })
                }
            }
            return r
        }

        function en(e) {
            return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(o.r, "$1$4")
        }

        function tn(e, t) {
            return !t && e === J.id
        }

        function nn(e, t) {
            return Le(e, {
                url: Object(a.C)(t) ? "al_groups.php" : "al_profile.php",
                params: {
                    act: "verified_tt",
                    mid: t,
                    gid: t
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

        function rn(e) {
            return function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    o = Z(je("im_preloader", {
                        preloader: $(J.pr_tpl, {
                            id: ""
                        }),
                        cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", r].join(" ")
                    })),
                    i = !1;

                function a() {
                    i = !0, me(o, "im-preloader_visible"), o.parentNode && o.parentNode.removeChild(o)
                }
                setTimeout(function() {
                    i || ("bottom" === n ? e.appendChild(o) : e.insertBefore(o, ie(e)), be(o, "im-preloader_visible"))
                }, 0), t.then(a).catch(function(e) {
                    Object(v.a)("wrapLoading", e), a()
                })
            }
        }

        function on(e, t) {
            return {
                0: {
                    msgs: e.reduce(function(e, t) {
                        return e[t] = [t, r.l, 0, 0, "", {}, {}, 0, 0, 0], e
                    }, {}),
                    hash: t,
                    history: 1
                }
            }
        }

        function an(e, t) {
            if (!t && !e) return !1;
            var n = e.target || e.srcElement,
                r = Ve,
                o = !1,
                i = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
            do {
                if (!n || n.onclick || n.onmousedown || "A" == n.tagName || he(n, "_im_no_select") || he(n, "im_msg_media_link") || "IMG" == n.tagName && !he(n, "_im_graffiti") && !he(n, "emoji") && !he(n, "emoji_css") && !he(n, "im_gift") || "TEXTAREA" == n.tagName || he(n, "play_new") || he(n, "videoplayer") || (o = i.test(n.className))) break
            } while (r-- && (n = n.parentNode));
            return !o || !!re((window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || "").toString())
        }

        function cn(e, t) {
            return '<div class="im-mess--text">\n      <span>' + Ee("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + Pt(e) + "&msgid=" + t + '">' + Ee("mail_im_goto_conversation") + "</a>\n    </div>"
        }

        function un(e, t, n) {
            var r = Ee("mail_deleteall1"),
                o = Ee("mail_sure_to_delete_all"),
                i = Ee("mail_delete");
            return Object(s.b)(t) && (Object(O.m)(e, 1024) ? (r = Ee("mail_leave_channel"), o = Ee("mail_unfollow_channel_confirmation"), i = Ee("mail_unfollow_channel")) : o = Ee("mail_chat_sure_to_delete_all")), Object(a.C)(t) && (o = Ee("mail_group_sure_to_delete_all")), Be(r, o, i, n, Ee("global_cancel"))
        }

        function sn(e, t, n) {
            var r = Object(a.t)(e, t),
                o = Object(s.b)(t),
                i = o && Object(O.m)(r, 1024),
                c = Ee("mail_deleteall1"),
                u = Ee("mail_sure_to_delete_all"),
                _ = Ee("mail_delete");
            if (o) {
                if (r.data.closed || r.data.kicked) return un(r, t, n.bind(null, !0));
                i ? (c = Ee("mail_leave_channel"), u = Ee("mail_vkcomgroup_leave_confirm"), _ = Ee("mail_leave_channel")) : (c = Ee("mail_leave_chat"), u = Ee("mail_chat_leave_confirm"), _ = Ee("mail_leave_chat"))
            }
            Object(a.C)(t) && (u = Ee("mail_group_sure_to_delete_all"));
            var d = new MessageBox({
                title: c,
                width: i ? 450 : 500
            }).content(u).setButtons(_, function() {
                return n(!!isChecked(le("_check_is_delete")) || !o)
            }, Ee("global_cancel")).show();
            return o && !i && d.setControlsText('<div class="checkbox im-delete-forall-checkbox _check_is_delete" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + Ee("mail_deleteall1") + "</div>"), d
        }

        function _n(e) {
            return Be(Ee("mail_unpin_title"), Ee("mail_unpin_text"), Ee("mail_unpin"), e, Ee("global_cancel"))
        }

        function dn(e, t, n, r) {
            var o = Ee("mail_dialog_msg_delete_N", t),
                i = Be(Ee("mail_dialog_msg_delete_title"), o, Ee("mail_delete"), function() {
                    return r(isChecked(le("_check_forall")))
                }, Ee("global_cancel")),
                a = "",
                c = !1;
            return n && (a = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + Ee("mail_delete_for_all") + "</div>", c = cur.imDb.selectByKey("del_forall_checked")), i.setControlsText(a), c && checkbox(le("_check_forall")), i
        }

        function ln(e, t, n, r, o) {
            t.showProgress(), e.set(r.bind(null, o)).then(function() {
                t.hideProgress(), t.hide(), n().removePeer(e, o), n().updateDialogFilters(e)
            })
        }

        function fn(e, t, n, r) {
            var o = e.get().tabs[t].memberIds;
            e.set(r.bind(null, "add_member", o)).then(n().showCreation)
        }

        function bn(e, t, n) {
            var r = e.get();
            if (r.active_tab === o.h && 0 === r.message_requests_cnt) return !1;
            var i = r.active_tab === o.k ? o.h : o.k;
            return e.set(n.bind(null, i)).then(function(e) {
                t().restoreDialogs(e, !0)
            })
        }

        function mn(e, t, n) {
            if (e.get().active_tab === o.h && 0 === e.get().unread_cnt) return !1;
            var r = e.get().active_tab === o.m ? o.h : o.m;
            return e.set(n.bind(null, r)).then(function(e) {
                t().restoreDialogs(e, !0)
            })
        }

        function pn(e, t, n, r) {
            if (t.get().active_tab === e) return Promise.resolve(t);
            var o = Object(a.I)(t);
            return t.set(r.bind(null, e)).then(function(e) {
                return n().restoreDialogs(e, !0, o !== Object(a.I)(e)), e
            })
        }

        function hn(e, t) {
            void 0 === t && (t = e.get().peer);
            var n = e.get().tabs[t];
            return o.j[o.i] & n.folders
        }

        function gn(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (void 0 === t && (t = e.get().peer), !Object(a.D)(e)) return !1;
            var r = n || e.get().tabs[t];
            return o.j[o.n] & r.folders
        }

        function vn(e, t) {
            return !1 === ((t.get().block_states || {})[e] || {}).free
        }

        function On(e) {
            return null != e.get().pendingForward
        }

        function jn(e, t) {
            return (t.get().block_states[e] || {}).who === J.id
        }

        function En(e, t) {
            var n = e.get().block_states;
            Object.keys(n).forEach(function(o) {
                n[o].time ? !1 === n[o].free && Date.now() - n[o].time >= 5e4 && t.push([r.Na([, 1, "gim" + e.get().gid, o, 0, ""])]) : n[o].time = Date.now()
            })
        }

        function yn(e, t, n) {
            var r = void 0;
            return !Ae("al_im.php", {
                act: "a_spam",
                offset: "0",
                gid: e.get().gid
            }, {
                onDone: function(n, o) {
                    o && (r = t(n, e, o))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Ue.loaded && Ue.detachPlayer(!0), r.unmount()
                    }
                }
            }, n)
        }

        function wn(e, t) {
            return kn(e.get(), t, Object(a.t)(e, t).last_seen)
        }

        function kn(e, t, n, r) {
            if (n[0]) return Ee("mail_header_online_status") + (Re[n[0]] ? Pn(t, !1, !1, !0) : "");
            if (!n[1]) return "";
            var o = Pe(n[1], e.timeshift),
                i = ye(Object(p.c)(e, t).sex, Ee("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", o);
            return n[2] && (i += Pn(t, !1, !1, r)), i
        }

        function Pn(e, t, n, r) {
            var o = {
                mid: e
            };
            n || (o.was = 1), t ? o.forcetoup = !0 : o.forcetodown = !0, o = Object.assign(o, r);
            var i = JSON.stringify(o).slice(1, -1).replace(/"/g, "&quot;");
            return je("im_wrap_mobile", {
                class: "im_status_mob_onl",
                params: i
            })
        }

        function xn(e, t) {
            var n = t.get().tabs[e];
            return Ce("al_settings.php", {
                act: "blacklist_box",
                q: n.href
            }, {
                stat: ["settings.js", "settings.css"],
                dark: 1
            })
        }

        function Dn(e, t) {
            return Ce("groupsedit.php", {
                act: "bl_edit",
                name: "/id" + e,
                gid: t.get().gid
            }, {
                stat: ["page.css", "ui_controls.js", "ui_controls.css"],
                dark: 1
            })
        }

        function Mn(e) {
            return e.get().gid ? "/gim" + e.get().gid : "/im"
        }

        function In(e, t, n, r) {
            var o = void 0;
            Gn(Ae("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: function(r, i) {
                    i && (o = n(r, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Ue.loaded && Ue.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        o && o.unmount()
                    }
                }
            }, r), e)
        }

        function Tn() {
            var e = document.activeElement;
            return null !== e && ("INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable"))
        }

        function Cn(e, t, n) {
            var r = le("_im_mess_" + e, n);
            return r && pe(r, "im-mess_fav", t), n
        }

        function Bn(e, t, n) {
            var r = le("_im_unread_bar_row", t);
            if (!r) return t;
            var o, i = se(r, "._im_mess_stack", -1),
                c = se(r, "._im_mess_stack"),
                u = i ? de("_im_mess", i).pop() : null,
                s = c ? le("_im_mess", c) : null;
            if (Y(r), (o = le("_im_invisible_bar", t)) && (me(o, "_im_invisible_bar"), me(o, "im-page--history-new-bar_hide")), !s || !u) return t;
            var _ = _e(s, "msgid"),
                d = Object(a.q)(e, n, _),
                l = Object(a.m)(e, n, _);
            if (!d || yt(e.tabs[n], d, l, e)) return t;
            var f = le("_im_stack_messages", i),
                b = le("_im_stack_messages", c).children;
            return Object(m.p)(b).forEach(function(e) {
                Y(e), f.appendChild(e)
            }), Y(c), t
        }

        function An(e, t, n) {
            var r = Object(a.h)(e, e.get().peer);
            if (!r) return [!1, 0];
            var o = le("_im_mess_" + r, t);
            if (!o) {
                var i = Object(a.k)(e, e.get().peer, r);
                if (!i) return [!0, 0];
                o = le("_im_mess_" + i.messageId, t)
            }
            var c = he(o, "_im_mess_srv") ? o : fe("_im_mess_stack", o);
            if (!c) return [!0, 0];
            var u = o ? o.offsetTop : 0,
                s = c.offsetTop + u,
                _ = n.contHeight();
            return s <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, _ - s)]
        }

        function Ln(e, t, n) {
            He(t);
            var r = fe("_im_top_notice", n);
            Se(r, 200, Y.pbind(r));
            var o = fe("_im_page_dialogs", r);
            o && he(o, "im-page--dialogs-notice") && me(o, "im-page--dialogs-notice"), Te.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Rn(e, t, n) {
            He(t);
            var r = fe("_im_aside_notice", n);
            qe(r, 200, Y.pbind(r)), Te.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Wn(e, t) {
            He(e);
            var n = fe("_im_aside_promo_block", t);
            qe(n, 200, Y.pbind(n)), Te.post("al_im.php", {
                act: "a_hide_promo_block",
                type: n.getAttribute("data-type"),
                hash: n.getAttribute("data-hash")
            })
        }

        function Un(e, t) {
            fe("_im_aside_promo_block", t).classList.add("--action-called"), Te.post("al_im.php", {
                act: "a_vkadmin_app_install",
                hash: _e(t, "hash"),
                platform: _e(t, "platform")
            })
        }

        function Kn(e, t, n, r, o) {
            return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = Object(u.f)(n, function(e, t, n, r, o) {
                return o
            }), r && (n = Ke.emojiToHTML(n, !0)), t && "..." !== t.trim() && !Object(s.b)(e) && (n = je("im_topic", {
                topic: t,
                cls: "im-topic_dialog"
            }) + n), !n && o.length > 0 && (n = je("im_dialog_media", {
                name: qn(o[0], o)
            })), n
        }

        function qn(e, t) {
            var n = {
                photo: Ee("mail_added_photos", "raw"),
                video: Ee("mail_added_videos", "raw"),
                audio: Ee("mail_added_audios", "raw")
            };
            switch (e.type) {
                case "mail":
                case "respond":
                    var r = e.object ? e.object.fwd_count : e.id.split(";").length;
                    return ke(r, Ee("mail_fwd_msgs", "raw"), !0);
                case "photo":
                case "video":
                case "audio":
                    var o = t.filter(function(t) {
                        return t.type === e.type
                    }).length;
                    return ke(o, n[e.type], !0);
                case "audio_playlist":
                    return "audio_album" === e.kind ? Ee("mail_added_audio_album") : Ee("mail_added_audio_playlist");
                case "artist":
                    return Ee("mail_added_artist");
                case "doc":
                    switch (e.kind) {
                        case "graffiti":
                            return Ee("mail_added_graffiti");
                        case "audiomsg":
                            return Ee("mail_added_audiomsg");
                        default:
                            return Ee("mail_added_docs")
                    }
                case "geo":
                case "map":
                    return Ee("mail_added_geo");
                case "wall":
                    return Ee("mail_added_wall");
                case "wall_reply":
                    return Ee("mail_added_wall_reply");
                case "gift":
                    return Ee("mail_added_gift");
                case "link":
                case "share":
                    return Ee("mail_added_link");
                case "sticker":
                    return Ee("mail_added_sticker");
                case "market":
                    return Ee("mail_added_market_item");
                case "money_transfer":
                    return Ee("mail_added_money_transfer");
                case "money_request":
                    return Ee("mail_added_money_request");
                case "story":
                    return Ee("mail_added_story");
                case "mask":
                    return Ee("mail_added_mask");
                case "article":
                    return Ee("mail_added_article");
                case "call":
                    return Ee("mail_added_call");
                case "poll":
                    return Ee("mail_added_poll");
                case "podcast":
                    return Ee("mail_added_podcast");
                default:
                    return Ee("mail_added_" + e.type)
            }
            return ""
        }

        function Sn(e) {
            be(e, "im-send-btn_loading")
        }

        function Hn(e) {
            me(e, "im-send-btn_loading")
        }

        function Nn(e) {
            var t = e.get(),
                n = Object(a.p)(e);
            if (!n || !Object(h.a)(e, Object(a.o)(e))) return "";
            var r = Object(p.c)(e, n.userId);
            if (!r) return "";
            var o = function(e, t) {
                var n = "";
                if (t && Object(c.j)(t) && void 0 !== t.kludges.attach1_tr_amount) {
                    var r = "%s " + t.kludges.attach1_currency;
                    if ("RUB" === t.kludges.attach1_currency && (r = Ee("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                        var o = ke(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                            i = ke(t.kludges.attach1_total_amount / 1e3, r, !0);
                        n = Ee("mail_money_request_collected_amount_from").replace("{amount}", o).replace("{total_amount}", i)
                    } else {
                        var a = ke(t.kludges.attach1_tr_amount / 1e3, r, !0);
                        n = Ee("mail_money_request_collected_amount").replace("{amount}", a)
                    }
                    if (ne(t.kludges.attach1_held_amount)) {
                        var u = ke(t.kludges.attach1_held_amount / 1e3, r, !0);
                        n += " " + Ee("mail_money_request_held_amount").replace("{amount}", u)
                    }
                    t.text && (n += '<span class="divider"></span>' + kt(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += je("im_pinned_message_media_bar", {
                        percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
                    }))
                }
                return n
            }(e, n);
            return o || (o = !(o = n.text) && n.attaches.length ? je("im_pinned_message_media", {
                text: qn(n.attaches[0], n.attaches)
            }) : kt(e, o, n && n.kludges || {}) || ""), o = o.replace(/<br\s?\/?>/gi, " "), je("im_pinned_message", {
                date: xe(n.date, t.timeshift),
                content: o,
                link: r.link,
                name: r.name
            })
        }

        function Fn(e, t, n) {
            var r = n.getAttribute("data-info");
            r && Le(n, {
                text: r,
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                hidedt: 1e3,
                shift: [0, 4]
            })
        }

        function zn(e, t, n) {
            var r = +n.getAttribute("data-time");
            r && Le(n, {
                text: Ee("mail_message_edited") + " " + xe(r, e.get().timeshift),
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                shift: [0, 4]
            })
        }

        function Vn() {
            var e = getSize(le(G))[1];
            return e || (e = Ge), e
        }

        function Gn(e, t) {
            e.bodyNode.addEventListener("mouseover", function(e) {
                he(e.target, "_im_edit_time") ? zn(t, 0, e.target) : he(e.target, "_im_page_info") && Fn(0, 0, e.target)
            })
        }

        function Qn(e, t, n, r, o) {
            var i = e.get(),
                a = void 0;
            Gn(Ae("al_im.php", {
                act: "a_get_pinned_message_box",
                chat: n,
                gid: e.get().gid,
                hash: i.tabs[n].hash
            }, {
                onDone: function(n, o) {
                    o && (a = r(n, e, t, o))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Ue.loaded && Ue.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        a && a.unmount()
                    }
                }
            }, o), e)
        }

        function Jn(e, t, n) {
            var r = e.get();
            Gn(Ae("al_im.php", {
                act: "a_get_replied_message_box",
                chat: r.peer,
                msgid: t,
                gid: r.gid,
                hash: r.tabs[r.peer].hash
            }, {
                onDone: function(e, t) {},
                params: {
                    width: 638,
                    onHide: function() {
                        Ue.loaded && Ue.detachPlayer(!0)
                    },
                    onDestroy: function() {}
                }
            }, n), e)
        }

        function Xn(e, t) {
            return !(!Object(s.b)(e.peerId) || !e.memberIds) && e.memberIds.indexOf(t) >= 0
        }

        function Zn(e) {
            return !Object(s.b)(e.peerId) || e.data.kicked ? 0 : e.membersCount
        }

        function Yn(e, t) {
            var n = Object(p.c)(e, t.peerId),
                r = Object(a.t)(e, t.peerId) || {};
            return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, Object(s.b)(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
        }

        function $n(e, t) {
            for (var n in t) t.hasOwnProperty(n) && Yn(e, t[n])
        }

        function er(e, t) {
            var n = [],
                r = t.find(function(e) {
                    return "mail" === e[0]
                }),
                o = r ? r[1].split(";") : [];
            for (o.length > ze && (r[1] = o.slice(0, ze).join(";")); e.length > Fe;) {
                var i = e.substr(0, Fe).lastIndexOf(" "); - 1 == i && (i = Fe), n.push({
                    msgText: re(e.substr(0, i))
                }), e = re(e.substr(i))
            }
            for (e.length && n.push({
                    msgText: e,
                    attaches: t
                }), n.length || n.push({
                    attaches: t
                }), o = o.slice(ze); o.length; o = o.slice(ze)) n.push({
                attaches: [
                    ["mail", o.slice(0, ze).join(";")]
                ]
            });
            return n
        }

        function tr(e) {
            return e.length > Fe
        }

        function nr(e, t, n) {
            var r = !1;
            Ce("al_im.php", {
                act: "a_chat_preview",
                chat_id: t.invite_chat_id,
                hash: t.invite_hash
            }, {
                stat: ["boxes.css"],
                params: {
                    dark: 1,
                    hideButtons: !0,
                    onHide: function() {
                        e.set(n), r && r.unmount()
                    }
                },
                onFail: function(e) {
                    return setTimeout(function() {
                        return Be(Ee("global_error"), e)
                    }, 0), !0
                },
                onDone: function(t, n) {
                    r = b(t.bodyNode, e)
                }
            }, {})
        }

        function rr() {
            Be(Ee("global_error"), Ee("mail_message_wait_until_uploaded"))
        }

        function or(e, t) {
            var n = Object(a.t)(e, t.peerId) || {};
            if (!t || !Object(c.k)(t)) return !1;
            if (333 == t.peerId) return !1;
            if (Date.now() / 1e3 - t.date > 86400) return !1;
            if (tt(e, t.peerId, t.messageId)) return !1;
            if (Object(s.b)(t.peerId)) {
                if (n.data.kicked || n.data.closed) return !1
            } else if (n.block_error > 0) return !1;
            return !0
        }

        function ir(e, t) {
            return t.map(function(t) {
                return Object(p.c)(e, t)
            })
        }

        function ar(e, t) {
            if ("number" != typeof e || 0 === e) return "";
            var n, r = e,
                o = [];
            if ([
                    [31536e3, Ee(t ? "global_years_accusative" : "global_age_years", "raw")],
                    [2592e3, Ee(t ? "global_months_accusative" : "global_age_months", "raw")],
                    [604800, Ee(t ? "global_weeks_accusative" : "global_age_weeks", "raw")],
                    [86400, Ee(t ? "global_days_accusative" : "global_age_days", "raw")],
                    [3600, Ee(t ? "global_hours_accusative" : "global_hours", "raw")],
                    [60, Ee(t ? "global_minutes_accusative" : "global_minutes", "raw")],
                    [1, Ee(t ? "global_seconds_accusative" : "global_age_seconds", "raw")]
                ].forEach(function(e) {
                    var t = E(e, 2),
                        n = t[0],
                        i = t[1],
                        a = Math.floor(r / n);
                    r %= n, a >= 1 && o.push(ke(a, i))
                }), 1 === (n = o.length)) return o.pop();
            var i = o.slice(0, n - 1).join(", "),
                a = o.pop();
            return Ee("global_and").replace(/{before}/gi, i).replace(/{after}/gi, a)
        }

        function cr(e, t, n, o) {
            o && !tt(e, n, o) && (Object(a.m)(e, n, o) ? (e.setState({
                msgid: o
            }), Object(i.b)({
                msgid: o
            }), t()) : e.get().longpoll.push([Object(r.Ba)(n, o)]))
        }

        function ur(e) {
            var t = le("im-mess_is_editing");
            if (!t) return null;
            var n = e.get().tabs[e.get().peer],
                r = Object(a.P)(n.msgs[_e(t, "msgid")]);
            return r && r.peerId == e.get().peer ? r : null
        }
    },
    QGEU: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c
        }), n.d(t, "d", function() {
            return u
        }), n.d(t, "b", function() {
            return s
        }), n.d(t, "c", function() {
            return d
        });
        var r = n("v+DW"),
            o = n("t7n3"),
            i = n("zxIV"),
            a = n("4+be");

        function c() {
            return !(!window.vk || !vk.a11y)
        }

        function u() {
            clearTimeout(cur.updateOnlineTO), cur.updateOnlineTO = setTimeout(function() {
                Object(o.f)(Object(i.G)("_online"), function() {
                    var e = Object(i.H)("_online_reader", this) || this,
                        t = Object(i.V)(this, "online"),
                        n = Object(i.V)(this, "mobile"),
                        r = Object(i.I)("img", e),
                        c = function(e) {
                            var t = Object(i.n)("_post", e),
                                n = t && Object(i.j)(t, "author");
                            return n ? n.innerText || n.textContent : ""
                        };
                    if (t) {
                        var u = "";
                        Object(o.f)(r, function() {
                            var e = Object(i.c)(this, "alt") || Object(i.c)(this, "data-alt") || c(this);
                            e && (u = Object(o.H)(u + " " + e), this.setAttribute("data-alt", e), this.removeAttribute("alt"))
                        }), u = Object(o.H)(u + " " + (n ? Object(a.d)("global_user_is_online_mobile") : Object(a.d)("global_user_is_online"))), e.setAttribute("aria-label", u)
                    } else Object(o.f)(r, function() {
                        var e = Object(i.c)(this, "data-alt") || c(this);
                        e && (this.setAttribute("alt", e), this.removeAttribute("data-alt"))
                    }), e.removeAttribute("aria-label")
                })
            }, 100)
        }

        function s() {
            clearTimeout(cur.updateChkBoxTO), cur.updateChkBoxTO = setTimeout(function() {
                var e = [];
                Object(o.f)(["checkbox", "checkbox_pic"], function() {
                    e = e.concat(Object(i.G)(this))
                }), Object(o.f)(e, function() {
                    "DIV" !== this.tagName || this.getAttribute("role") || (this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", Object(r.l)(this) ? "true" : "false"), this.setAttribute("tabindex", 0))
                })
            }, 100)
        }

        function _() {
            clearTimeout(cur.updateRadioBtnsTO), cur.updateRadioBtnsTO = setTimeout(function() {
                var e = [],
                    t = Object(i.G)("radiobtn");
                Object(o.f)(t, function() {
                    if ("DIV" === this.tagName && !this.getAttribute("role")) {
                        var t = Object(r.l)(this);
                        this.setAttribute("role", "radio"), this.setAttribute("aria-checked", t ? "true" : "false"), this.setAttribute("tabindex", t ? 0 : -1);
                        var n = function(e) {
                            var t = 0,
                                n = e;
                            for (; t < 5 && n !== document;) {
                                n = Object(i.z)(n);
                                var r = Object(i.G)("radiobtn", n);
                                if (r.length > 1) break;
                                t++
                            }
                            return n
                        }(this);
                        ~e.indexOf(n) || e.push(n)
                    }
                }), Object(o.f)(e, function() {
                    if (!Object(i.G)("on", this).length) {
                        var e = Object(i.G)("radiobtn", this);
                        e.length && e[0].setAttribute("tabindex", 0)
                    }
                })
            }, 100)
        }

        function d() {
            u(), s(), _()
        }
    },
    Wu9C: function(e, t, n) {
        "use strict";
        var r = n("N1NS"),
            o = n("vT4u");

        function i(e) {
            return {
                unmount: function() {
                    Object(r.c)(e)
                }
            }
        }

        function a(e, t, n) {
            return (0, Object(r.b)(i).bindMutations)(Object(r.a)({
                handlers: function(e, t) {}
            }))
        }
        var c = n("P13b"),
            u = n("rHUl"),
            s = n("aong"),
            _ = n("uytb");
        n.d(t, "a", function() {
            return f
        }), n.d(t, "c", function() {
            return b
        }), n.d(t, "d", function() {
            return m
        }), n.d(t, "e", function() {
            return p
        }), n.d(t, "b", function() {
            return v
        });
        var d = "_im_pin_hide",
            l = "_im_pinned_message";

        function f(e, t) {
            if (Object(s.r)(e).searchShown) return !1;
            var n = Object(u.t)(e, t),
                r = n && Object(u.P)(n.pinned);
            return !!r && n.pinHideId != r.chat_local_id
        }

        function b(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                o = Object(u.t)(e, t),
                i = o && Object(u.P)(o.pinned);
            o && i && (o.pinHideId = i.chat_local_id, cur.imDb.update(_.a, [o.peerId, o.pinHideId]), h(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 1,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "hide"))
        }

        function m(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                o = Object(u.t)(e, t);
            o && o.pinHideId && (delete o.pinHideId, cur.imDb.update(_.a, [o.peerId, void 0]), h(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 0,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "show"))
        }

        function p(e, t, n) {
            var r = h.bind(null, n, t),
                i = Object(c.Xb)(function() {
                    i.hideProgress(), i.hide(), e.set(o.nc.bind(null, t)).then(r).then(function(e) {
                        return e.set(o.mc.bind(null, t))
                    }).then(r)
                })
        }

        function h(e, t, n) {
            return e().updateChatTopic(t, n), Object(o.Ob)(n.get()), e().updateActions(n), n
        }

        function g(e) {
            return {
                unmount: function() {
                    Object(r.c)(e)
                }
            }
        }

        function v(e, t, n) {
            var o = Object(r.b)(g).bindMutations,
                i = function(e, t, n) {
                    var r = e.get().peer,
                        o = Object(u.P)(Object(u.t)(e, r).pinned);
                    if (n.target.classList.contains(d)) o && b(e, r, t);
                    else if ("A" !== n.target.tagName) {
                        var i = o && o.messageId;
                        i && !Object(c.Fa)(e, r, i) ? Object(c.M)(e, t().focusOnMessage, r, i) : Object(c.Ub)(e, t, r, a, n), statlogsValueEvent("im_pinned_messages", "open")
                    }
                }.bind(null, t, n),
                s = function(e) {
                    showTooltip(e.target, {
                        text: getLang("mail_hide_unpin_hover"),
                        black: 1,
                        needLeft: 1,
                        shift: [8, 4],
                        forcetoup: !0,
                        className: "_im_pinned_tt",
                        appendEl: bodyNode
                    })
                }.bind(null);
            return o(Object(r.a)({
                handlers: function(t, n) {
                    n(e, "click", l, i), n(e, "mouseover", d, s)
                }
            }))
        }
    },
    aong: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "o", function() {
            return throttleAccumulate
        }), __webpack_require__.d(__webpack_exports__, "i", function() {
            return lplog
        }), __webpack_require__.d(__webpack_exports__, "p", function() {
            return toArray
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return arrayUnique
        }), __webpack_require__.d(__webpack_exports__, "r", function() {
            return unpackStore
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return debounce
        }), __webpack_require__.d(__webpack_exports__, "n", function() {
            return throttle
        }), __webpack_require__.d(__webpack_exports__, "m", function() {
            return shuffle
        }), __webpack_require__.d(__webpack_exports__, "k", function() {
            return parallel
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return hashCode
        }), __webpack_require__.d(__webpack_exports__, "l", function() {
            return parseJSON
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return checkTextLength
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return getSelectionText
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return goAway
        }), __webpack_require__.d(__webpack_exports__, "h", function() {
            return isFullScreen
        }), __webpack_require__.d(__webpack_exports__, "s", function() {
            return updateMoney
        }), __webpack_require__.d(__webpack_exports__, "q", function() {
            return toggleOnline
        }), __webpack_require__.d(__webpack_exports__, "j", function() {
            return onlinePlatformClass
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return handleScroll
        });
        var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("t7n3"),
            _ui_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ryw6"),
            _debug_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("98sY"),
            _cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("kMSP"),
            _ajax__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Kngp"),
            _message_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("EasH"),
            _dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("zxIV"),
            _lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("4+be"),
            _browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("gdug"),
            _accessibility__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("QGEU"),
            _dom_events__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("Egk5"),
            _scroll__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("lXE5");

        function throttleAccumulate(e, t) {
            var n = [],
                r = 0;
            return function(o) {
                n.push(o), r || (r = setTimeout(function() {
                    r = !1, e(n), n = []
                }, t))
            }
        }

        function executionStackPop(e) {
            return e.length > 0 && e.pop().func(), e
        }

        function lplog(e, t) {
            var n = void 0,
                r = void 0;
            if (window.__debugMode) {
                switch (t) {
                    case "error":
                        n = "color: red", r = "background: red; color: white";
                        break;
                    case "success":
                        n = "color: green", r = "background: green; color: white";
                        break;
                    default:
                        n = "color: blue;", r = "background: #000; color: #fff;"
                }
                try {
                    var o = new Date;
                    console.debug("%cLP:[" + o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds() + ":" + o.getMilliseconds() + "]%c " + e, r, n)
                } catch (e) {}
            }
        }

        function toArray(e) {
            var t = [];
            if (void 0 === e.length) return Object.keys(e).map(function(t) {
                return e[t]
            });
            for (var n = 0; n < e.length; n++) t.push(e[n]);
            return t
        }

        function arrayUnique(e) {
            for (var t = {}, n = [], r = 0; r < e.length; r++) t[e[r]] || (n.push(e[r]), t[n[r]] = 1);
            return n
        }

        function unpackStore(e) {
            return e.get ? e.get() : e
        }

        function debounce(e, t, n) {
            var r = void 0;
            return function() {
                var o = this,
                    i = arguments,
                    a = n && !r;
                clearTimeout(r), r = setTimeout(function() {
                    r = null, n || e.apply(o, i)
                }, t), a && e.apply(this, i)
            }
        }

        function throttle(e, t) {
            var n = void 0;
            return function() {
                n || (e.apply(this, arguments), n = setTimeout(function() {
                    n = !1
                }, t))
            }
        }

        function shuffle(e) {
            for (var t = e.length; t > 0;) {
                var n = Math.floor(Math.random() * t),
                    r = e[--t];
                e[t] = e[n], e[n] = r
            }
            return e
        }

        function parallel() {
            var e = [].slice.call(arguments),
                t = e.pop(),
                n = new CallHub(t, e.length);
            Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(e, function(e, t) {
                return t(function() {
                    return n.done()
                })
            })
        }

        function hashCode(e) {
            var t = 0;
            if (0 === e.length) return t;
            for (var n = 0, r = e.length; n < r; n++) {
                t = (t << 5) - t + e.charCodeAt(n), t |= 0
            }
            return t
        }

        function parseJSON(obj) {
            if (window.JSON && JSON.parse) try {
                return JSON.parse(obj)
            } catch (e) {
                Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__.c)("<b>parseJSON:</b> " + e.message, {
                    dt: -1,
                    type: 5,
                    answer: obj
                });
                var evalString = "(" + obj + ")";
                try {
                    return eval(evalString)
                } catch (e) {
                    if (__debugMode) throw e;
                    Object(_debug_tools__WEBPACK_IMPORTED_MODULE_2__.d)(e, evalString)
                }
            } else {
                var _evalString = "(" + obj + ")";
                try {
                    return eval(_evalString)
                } catch (e) {
                    if (__debugMode) throw e;
                    Object(_debug_tools__WEBPACK_IMPORTED_MODULE_2__.d)(e, _evalString)
                }
            }
        }

        function checkTextLength(e, t, n, r, o, i, a) {
            var c = t.getValue ? t.getValue() : t.value,
                u = t.lastLen || 0;
            if (t.lastLen !== c.length || i) {
                t.lastLen = c.length;
                var s = {
                        "&": 5,
                        "<": 4,
                        ">": 4,
                        '"': 6,
                        "\n": r ? 1 : 4,
                        "\r": 0,
                        "!": 5,
                        "'": 5,
                        $: 6,
                        "\\": 6
                    },
                    _ = {
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
                o && (s[","] = 5);
                var l = function(e) {
                    for (var t = 0, n = 0, r = e.length; n < r; n++) {
                        var o = s[e.charAt(n)],
                            i = e.charCodeAt(n);
                        t += void 0 !== o ? o : !a && i >= 128 && (i < 1025 || d[i] || i > 1119) && !_[i] && (i < 8220 || i > 8222) && (i < 8224 || i > 8226) ? ("&#" + i + ";").length : 1
                    }
                    return t
                }(c);
                if (n = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)(n), l > Math.max(e - 100, .75 * e))
                    if (Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Ta)(n), l > e)
                        if (o) {
                            var f = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Ya)(t, function(e, t) {
                                for (var n = 0, r = "", o = 0, i = e.length; o < i; o++) {
                                    var c = e.charAt(o),
                                        u = s[c],
                                        l = e.charCodeAt(o);
                                    if ((n += void 0 !== u ? u : !a && l >= 128 && (l < 1025 || d[l] || l > 1119) && !_[l] && (l < 8220 || l > 8222) && (l < 8224 || l > 8226) ? ("&#" + l + ";").length : 1) > t) break;
                                    r += c
                                }
                                return r
                            }(c, Math.min(e, u)));
                            t.lastLen = f.length, n.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("text_N_symbols_remain", 0)
                        } else n.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("text_exceeds_symbol_limit", l - e);
                else n.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("text_N_symbols_remain", e - l);
                else Object(_dom__WEBPACK_IMPORTED_MODULE_6__.W)(n)
            }
        }

        function getSelectionText() {
            var e = "";
            return window.getSelection ? e = window.getSelection().toString() : document.selection && "Control" !== document.selection.type && (e = document.selection.createRange().text), e
        }

        function goAway(e, t, n) {
            if (-1 !== (t || {}).h || Object(_dom_events__WEBPACK_IMPORTED_MODULE_10__.d)(n)) return !0;
            if (-1 !== (t || {}).h) {
                var r = e.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i);
                if (r && "api." !== r[1].toLowerCase()) return location.href = e, !1;
                var o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(Object(_cookies__WEBPACK_IMPORTED_MODULE_3__.a)("remixsettings_bits"));
                if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(_ajax__WEBPACK_IMPORTED_MODULE_4__.d) || 1 & o) return window.open("/away.php?to=" + encodeURIComponent(e) + (t && void 0 !== t.h ? "&h=" + t.h : ""), "_blank"), !1
            }
            var i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)({
                act: "a_go",
                to: e
            }, t || {});
            return !Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.b)("away.php", i, {}, n)
        }

        function isFullScreen() {
            return !!(document.fullscreenElement || document.fullScreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || cur.pvPartScreen)
        }

        function updateMoney(e, t) {
            if (void 0 !== e && !1 !== e) {
                var n = "";
                !0 === t ? (vk.balanceEx = e, n = "_ex") : vk.balance = e;
                var r = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.G)("votes_balance_nom" + n);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(r, function(t, n) {
                    return n.innerHTML = e + " " + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("votes_flex", e)
                });
                var o = e * (vk.vcost || 7),
                    i = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.G)("money_balance_nom" + n);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(i, function(e, t) {
                    return t.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_money_amount_rub", o, !0)
                }), void 0 !== t && !1 !== t && !0 !== t && updateMoney(t, !0)
            }
        }

        function toggleOnline(e, t) {
            var n = onlinePlatformClass(t).split(" "),
                r = [];
            ["online", "mobile", "_online"].forEach(function(t) {
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.o)(t, n) && !Object(_dom__WEBPACK_IMPORTED_MODULE_6__.V)(e, t) ? r.push(t) : !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.o)(t, n) && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.V)(e, t) && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Ha)(e, t)
            }), r.length > 0 && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.a)(e, r.join(" "))
        }

        function onlinePlatformClass(e) {
            var t = " _online";
            return e && (t += " online"), _browser__WEBPACK_IMPORTED_MODULE_8__.d[e] && (t += " mobile"), Object(_accessibility__WEBPACK_IMPORTED_MODULE_9__.d)(), t
        }

        function handleScroll(e) {
            e = e.split(",");
            var t = cur.named || {},
                n = e[0] && (t[e[0]] || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)(e[0])) || !1,
                r = e[1] && (t[e[1]] || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)(e[1])) || !1;
            if (!n && !r) {
                if (!(n = document.getElementsByName(e[0])[0])) return;
                n = n.nextSibling
            }
            var o = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)("page_header_wrap") || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)("dev_top_nav_wrap");
            setTimeout(function() {
                n && Object(_scroll__WEBPACK_IMPORTED_MODULE_11__.g)(Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Q)(n)[1] - (o ? Object(_dom__WEBPACK_IMPORTED_MODULE_6__.N)(o)[1] : 0), 0), r && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.E)(r)
            }, 300)
        }
    },
    eTng: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return u
        }), n.d(t, "c", function() {
            return s
        }), n.d(t, "d", function() {
            return _
        }), n.d(t, "b", function() {
            return d
        });
        var r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && c.return && c.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            o = window.intval;

        function i(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                n = e.split("_"),
                o = r(n, 2);
            return [o[0], o[1], t]
        }
        var a = {};

        function c(e) {
            if (a[e]) return a[e];
            for (var t = e ? e.length : 0, n = [], o = [], c = "", u = 0; u < t; u++) {
                var s = e[u],
                    _ = s.charCodeAt(0);
                _ >= 48 && _ <= 57 || "_" === s || "-" === s ? c += s : "(" !== s && ")" !== s && ":" !== s && "," !== s || ("" !== c && (o.push(c), n.push("id"), c = ""), o.push(s), n.push(s))
            }
            c.length > 0 && (o.push(c), n.push("id"));
            var d = function e(t, n) {
                    var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    if (a > 50) return [
                        [], t.length
                    ];
                    for (var c = [], u = ""; o < t.length;) {
                        var s = t[o];
                        if ("id" === s) u = n[o];
                        else if ("," === s && u) c.push(i(u)), u = "";
                        else if ("(" === s) {
                            var _ = e(t, n, o + 1, a + 1),
                                d = r(_, 2),
                                l = d[0];
                            o = d[1], c.push(i(u, l)), u = ""
                        } else if (")" === s) return "" !== u && c.push(i(u)), [c, o];
                        o++
                    }
                    return u && c.push(i(u)), [c, o]
                }(n, o),
                l = r(d, 1)[0];
            return Object.keys(a).length > 300 && (a = {}), a[e] = l, l
        }

        function u(e, t) {
            var n = [];
            e.fwd_count ? n.push({
                type: "mail",
                id: -t,
                object: {
                    fwd_count: e.fwd_count
                }
            }) : e.fwd && n.push({
                type: "mail",
                id: -t,
                object: {
                    fwd_count: c(e.fwd).length
                }
            });
            for (var r = 1; e["attach" + r + "_type"]; ++r) "call" === e["attach" + r + "_type"] ? n.push({
                type: e["attach" + r + "_type"],
                id: e["attach" + r],
                initiatorId: o(e["attach" + r + "_call_initiator_id"]),
                state: e["attach" + r + "_call_state"],
                duration: o(e["attach" + r + "_call_duration"]),
                receiverId: o(e["attach" + r + "_call_receiver_id"])
            }) : n.push({
                type: e["attach" + r + "_type"],
                id: e["attach" + r],
                kind: e["attach" + r + "_kind"],
                productId: e["attach" + r + "_product_id"]
            });
            return e.geo && n.push({
                type: "geo",
                id: e.geo
            }), n
        }

        function s(e) {
            return 0 == e
        }

        function _(e) {
            return e > 0 && e < 2e9
        }

        function d(e) {
            return e > 2e9
        }
    },
    f01n: function(e, t, n) {
        "use strict";
        n.d(t, "U", function() {
            return a
        }), n.d(t, "M", function() {
            return c
        }), n.d(t, "Q", function() {
            return u
        }), n.d(t, "a", function() {
            return s
        }), n.d(t, "H", function() {
            return _
        }), n.d(t, "I", function() {
            return d
        }), n.d(t, "s", function() {
            return l
        }), n.d(t, "r", function() {
            return f
        }), n.d(t, "d", function() {
            return b
        }), n.d(t, "e", function() {
            return m
        }), n.d(t, "W", function() {
            return p
        }), n.d(t, "J", function() {
            return h
        }), n.d(t, "Y", function() {
            return g
        }), n.d(t, "X", function() {
            return v
        }), n.d(t, "G", function() {
            return O
        }), n.d(t, "h", function() {
            return j
        }), n.d(t, "P", function() {
            return E
        }), n.d(t, "L", function() {
            return y
        }), n.d(t, "T", function() {
            return w
        }), n.d(t, "S", function() {
            return k
        }), n.d(t, "K", function() {
            return P
        }), n.d(t, "V", function() {
            return x
        }), n.d(t, "R", function() {
            return D
        }), n.d(t, "F", function() {
            return M
        }), n.d(t, "b", function() {
            return I
        }), n.d(t, "c", function() {
            return T
        }), n.d(t, "i", function() {
            return C
        }), n.d(t, "O", function() {
            return B
        }), n.d(t, "f", function() {
            return A
        }), n.d(t, "g", function() {
            return L
        }), n.d(t, "N", function() {
            return R
        }), n.d(t, "m", function() {
            return U
        }), n.d(t, "l", function() {
            return K
        }), n.d(t, "n", function() {
            return q
        }), n.d(t, "j", function() {
            return S
        }), n.d(t, "o", function() {
            return H
        }), n.d(t, "k", function() {
            return N
        }), n.d(t, "q", function() {
            return F
        }), n.d(t, "p", function() {
            return z
        }), n.d(t, "B", function() {
            return V
        }), n.d(t, "v", function() {
            return G
        }), n.d(t, "t", function() {
            return Q
        }), n.d(t, "x", function() {
            return J
        }), n.d(t, "A", function() {
            return X
        }), n.d(t, "C", function() {
            return Z
        }), n.d(t, "E", function() {
            return Y
        }), n.d(t, "D", function() {
            return $
        }), n.d(t, "u", function() {
            return ee
        }), n.d(t, "w", function() {
            return te
        }), n.d(t, "y", function() {
            return ne
        }), n.d(t, "z", function() {
            return re
        }), n.d(t, "Ga", function() {
            return oe
        }), n.d(t, "Va", function() {
            return ie
        }), n.d(t, "db", function() {
            return ae
        }), n.d(t, "Za", function() {
            return ce
        }), n.d(t, "Z", function() {
            return ue
        }), n.d(t, "Ha", function() {
            return se
        }), n.d(t, "Wa", function() {
            return _e
        }), n.d(t, "Ia", function() {
            return de
        }), n.d(t, "Pa", function() {
            return le
        }), n.d(t, "Qa", function() {
            return fe
        }), n.d(t, "Ma", function() {
            return be
        }), n.d(t, "La", function() {
            return me
        }), n.d(t, "Ya", function() {
            return pe
        }), n.d(t, "Ua", function() {
            return he
        }), n.d(t, "cb", function() {
            return ge
        }), n.d(t, "Fa", function() {
            return ve
        }), n.d(t, "Da", function() {
            return Oe
        }), n.d(t, "Ea", function() {
            return je
        }), n.d(t, "fb", function() {
            return Ee
        }), n.d(t, "Ra", function() {
            return ye
        }), n.d(t, "hb", function() {
            return we
        }), n.d(t, "gb", function() {
            return ke
        }), n.d(t, "Oa", function() {
            return Pe
        }), n.d(t, "Ta", function() {
            return xe
        }), n.d(t, "Aa", function() {
            return De
        }), n.d(t, "Ja", function() {
            return Me
        }), n.d(t, "eb", function() {
            return Ie
        }), n.d(t, "bb", function() {
            return Te
        }), n.d(t, "Sa", function() {
            return Ce
        }), n.d(t, "ab", function() {
            return Be
        }), n.d(t, "Ba", function() {
            return Ae
        }), n.d(t, "Ca", function() {
            return Le
        }), n.d(t, "Ka", function() {
            return Re
        }), n.d(t, "Na", function() {
            return We
        }), n.d(t, "Xa", function() {
            return Ue
        });
        var r = n("eTng"),
            o = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && c.return && c.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = "event_delete",
            a = "event_set_flags",
            c = "event_replace_flags",
            u = "event_reset_flags",
            s = "event_add_message",
            _ = "event_read_inbound",
            d = "event_read_outbound",
            l = "event_got_online",
            f = "event_got_offline",
            b = "event_chat_changed",
            m = "event_chat_updated",
            p = "event_typing",
            h = "event_recoding_audio",
            g = "event_video_call",
            v = "event_unread_count",
            O = "event_notify_settings_changed",
            j = "event_empty",
            E = "event_reset_directories",
            y = "event_replace_directories",
            w = "event_set_directories",
            k = "event_resync",
            P = "event_refresh_lp_key",
            x = "transition_event",
            D = "reset_peer",
            M = "mutex",
            I = "change_peer",
            T = "event_change_tab",
            C = "event_failed_message",
            B = "event_resend",
            A = "event_delete_dialog",
            L = "event_edit_message",
            R = "event_replace_message",
            W = "event_audio_start",
            U = 2,
            K = 8,
            q = 64,
            S = 128,
            H = 65536,
            N = 1 << 21,
            F = 1,
            z = 8,
            V = 1,
            G = 2,
            Q = 3,
            J = 4,
            X = 5,
            Z = 6,
            Y = 7,
            $ = 8,
            ee = 9,
            te = 10,
            ne = 11,
            re = 12;

        function oe(e) {
            var t = o(e, 2)[1];
            return {
                type: i,
                localId: t
            }
        }

        function ie(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: c,
                messageId: n,
                mask: r,
                peerId: i
            }
        }

        function ae(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: a,
                messageId: n,
                flags: r,
                peerId: i
            }
        }

        function ce(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: u,
                messageId: n,
                flags: r,
                peerId: i
            }
        }

        function ue(e) {
            var t = o(e, 11),
                n = t[1],
                i = t[2],
                a = t[3],
                c = t[4],
                u = t[5],
                _ = t[6],
                d = t[7],
                l = t[8],
                f = t[9],
                b = t[10],
                m = extend(_, d || void 0);
            return {
                type: s,
                messageId: intval(n),
                flags: intval(i),
                peerId: intval(a),
                date: intval(c),
                attaches: Object(r.a)(m, n),
                subject: _.title || "",
                text: u,
                kludges: m,
                randomId: intval(l),
                userId: Object(r.b)(a) ? intval(m.from) : intval(a),
                update_time: b,
                chat_local_id: f
            }
        }

        function se(e) {
            var t = ue(e);
            return t.type = L, t
        }

        function _e(e) {
            var t = ue(e);
            return t.type = R, t
        }

        function de(e) {
            return extend({}, e, {
                type: L
            })
        }

        function le(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: _,
                peerId: n,
                upToId: r,
                unread: i
            }
        }

        function fe(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: d,
                peerId: n,
                upToId: r,
                unread: i
            }
        }

        function be(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: l,
                userId: -n,
                platform: r,
                lastSeenTs: i
            }
        }

        function me(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: f,
                userId: -n,
                reason: r,
                lastSeenTs: i
            }
        }

        function pe(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: E,
                peerId: n,
                mask: r,
                local: void 0 !== i && i
            }
        }

        function he(e) {
            var t = o(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: y,
                peerId: n,
                mask: r
            }
        }

        function ge(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: w,
                peerId: n,
                mask: r,
                local: void 0 !== i && i
            }
        }

        function ve(e) {
            var t = o(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: A,
                peerId: n,
                localId: r
            }
        }

        function Oe(e) {
            var t = o(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: b,
                chatId: n,
                self: r
            }
        }

        function je(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: m,
                peerId: r,
                updateType: n,
                updateArg: i
            }
        }

        function Ee(e) {
            var t = o(e, 5),
                n = t[1],
                r = t[2],
                i = t[3],
                a = t[4];
            return {
                type: p,
                peerId: n,
                userIds: r,
                totalCount: i,
                ts: a
            }
        }

        function ye(e) {
            var t = o(e, 5),
                n = t[1],
                r = t[2],
                i = t[3],
                a = t[4];
            return {
                type: h,
                peerId: n,
                userIds: r,
                totalCount: i,
                ts: a
            }
        }

        function we(e) {
            var t = o(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: g,
                userId: n,
                callId: r
            }
        }

        function ke(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: v,
                count: n,
                countNotMuted: r,
                showOnlyNotMuted: i
            }
        }

        function Pe(e) {
            var t = o(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: O,
                peerId: n.peer_id,
                sound: n.sound,
                disabledUntil: n.disabled_until
            }
        }

        function xe(e) {
            var t = o(e, 2)[1],
                n = void 0 === t ? {} : t,
                r = ue([!1, n.id, n.flags, n.peer_id, n.date, n.message, extend(n.kludges, {
                    title: n.title || ""
                }), {}, n.random_id, n.chat_local_id, n.update_time]);
            return r.type = L, r
        }

        function De(e) {
            var t = o(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: W,
                uuid: n.uuid,
                deviceName: n.device_name || ""
            }
        }

        function Me(e) {
            return {
                type: j,
                params: e
            }
        }

        function Ie(e) {
            return {
                type: x,
                state: e
            }
        }

        function Te() {
            return {
                type: k
            }
        }

        function Ce(e) {
            var t = o(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: P,
                key: n,
                url: r
            }
        }

        function Be() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return {
                type: D,
                cancelSearch: e,
                removeActivePeer: t
            }
        }

        function Ae(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
            return {
                type: I,
                peerId: e,
                msgid: t,
                forward: n,
                cancelSearch: r,
                entryPoint: o
            }
        }

        function Le(e) {
            return {
                type: T,
                tab: e
            }
        }

        function Re(e, t, n) {
            return {
                type: C,
                message: t,
                peer: e,
                error: n
            }
        }

        function We(e) {
            var t = o(e, 6),
                n = (t[0], t[1]),
                r = t[2],
                i = t[3],
                a = t[4],
                c = t[5];
            return {
                type: M,
                free: !!intval(n) || intval(a) === vk.id,
                resource: r,
                peerId: intval(i),
                who: intval(a),
                name: c
            }
        }

        function Ue(e, t) {
            return {
                type: B,
                message: t,
                peerId: e
            }
        }
    },
    "h++7": function(e, t, n) {
        "use strict";
        var r;

        function o(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        n.d(t, "t", function() {
            return i
        }), n.d(t, "f", function() {
            return a
        }), n.d(t, "B", function() {
            return c
        }), n.d(t, "q", function() {
            return u
        }), n.d(t, "r", function() {
            return s
        }), n.d(t, "b", function() {
            return _
        }), n.d(t, "a", function() {
            return d
        }), n.d(t, "v", function() {
            return l
        }), n.d(t, "u", function() {
            return f
        }), n.d(t, "d", function() {
            return b
        }), n.d(t, "o", function() {
            return m
        }), n.d(t, "e", function() {
            return p
        }), n.d(t, "z", function() {
            return h
        }), n.d(t, "A", function() {
            return g
        }), n.d(t, "w", function() {
            return v
        }), n.d(t, "m", function() {
            return O
        }), n.d(t, "h", function() {
            return j
        }), n.d(t, "n", function() {
            return E
        }), n.d(t, "i", function() {
            return y
        }), n.d(t, "k", function() {
            return w
        }), n.d(t, "l", function() {
            return k
        }), n.d(t, "g", function() {
            return P
        }), n.d(t, "j", function() {
            return x
        }), n.d(t, "y", function() {
            return D
        }), n.d(t, "p", function() {
            return M
        }), n.d(t, "c", function() {
            return I
        }), n.d(t, "s", function() {
            return T
        }), n.d(t, "x", function() {
            return C
        });
        var i = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
            a = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,
            c = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/,
            u = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g,
            s = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g,
            _ = 38,
            d = 40,
            l = 33,
            f = 34,
            b = 35,
            m = 36,
            p = 13,
            h = [_, d, l, f, p, 27, b, m],
            g = [l, f, d, _, m, b],
            v = "printable",
            O = "unread",
            j = "all",
            E = "unrespond",
            y = "important",
            w = "mr",
            k = "mr_rejected",
            P = [j, O, E, y, w],
            x = (o(r = {}, E, 2), o(r, y, 1), o(r, w, 256), o(r, k, 512), r),
            D = [].concat("aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw".split(","), "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр".split(","), "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e".split(",").map(function(e) {
                return "xn--" + e
            })),
            M = D.reduce(function(e, t) {
                return Math.max(e, t.length)
            }, 0),
            I = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})))", "ig"),
            T = new RegExp("(https?:\\/\\/)?(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})(?:\\:(\\d{2,5}))?)(([\\/?#])(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*[\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј\\—\\-\\_@#%?+\\/\\$.~=;:'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ　-〿＀-￯*]+|(?:\\(|\\[)[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\d&#%;,]+(?:\\)|\\])){0,200})?", "ig"),
            C = "(^|[s.,:'\";>)(]?)((#(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)){0,100}(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?))(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)){0,100}))(@((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?))?(?=$|[s.,:'\"&;?<)(]?)"
    },
    kMSP: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        }), n.d(t, "d", function() {
            return i
        }), n.d(t, "b", function() {
            return a
        }), n.d(t, "c", function() {
            return c
        });
        var r = n("zxIV");

        function o(e) {
            return function() {
                window._cookies = {};
                for (var e = document.cookie.split(";"), t = /^[\s]*([^\s]+?)$/i, n = 0, r = e.length; n < r; n++) {
                    var o = e[n].split("=");
                    2 === o.length && (_cookies[o[0].match(t)[1]] = unescape(o[1].match(t) ? o[1].match(t)[1] : ""))
                }
            }(), _cookies[e]
        }

        function i(e, t, n, r) {
            var o = "";
            if (n) {
                var i = new Date;
                i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3), o = "; expires=" + i.toGMTString()
            }
            var a = window.locDomain;
            document.cookie = e + "=" + escape(t) + o + "; path=/" + (a ? "; domain=." + a : "") + (r && "https:" === locProtocol ? "; secure" : "")
        }

        function a() {
            Object(r.Fa)("cookies_policy_wrap"), ajax.post("/settings", {
                act: "a_hide_cookies_policy"
            })
        }

        function c() {
            window._cookies = {}
        }
    },
    kcIO: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return s
        }), n.d(t, "d", function() {
            return _
        }), n.d(t, "a", function() {
            return d
        }), n.d(t, "e", function() {
            return l
        }), n.d(t, "c", function() {
            return f
        });
        var r = n("Egk5"),
            o = n("t7n3"),
            i = n("zxIV"),
            a = n("7jxN"),
            c = n("gdug"),
            u = {
                hideAll: function(e, t) {
                    if (e)
                        for (; u.count();) u.hideLast();
                    else {
                        if (u.count()) {
                            var n = _message_boxes[u._boxes.pop()];
                            n._in_queue = !1, n._hide(!1, !1, t)
                        }
                        for (; u.count();) {
                            _message_boxes[u._boxes.pop()]._in_queue = !1
                        }
                    }
                },
                hideLast: function(e, t) {
                    if (u.count()) {
                        var n = window._message_boxes[u._boxes[u.count() - 1]];
                        if (!0 === e && (n.changed || u.skip || t && t.target && t.target.tagName && "input" !== t.target.tagName.toLowerCase() && cur.__mdEvent && t.target !== cur.__mdEvent.target)) return void(u.skip = !1);
                        n.hide()
                    }
                    if (t && "click" === t.type) return Object(r.c)(t)
                },
                hideBGClick: function(e) {
                    e && e.target && /^box_layer/.test(e.target.id) && u.hideLast()
                },
                count: function() {
                    return u._boxes.length
                },
                _show: function(e) {
                    var t = _message_boxes[e];
                    if (t && !t._in_queue) {
                        u.count() ? _message_boxes[u._boxes[u.count() - 1]]._hide(!0, !0) : window.tooltips && tooltips.hideAll(), t._in_queue = !0;
                        var n = !!u.count();
                        u.curBox = e, t._show(n || u.currHiding, n), u._boxes.push(e)
                    }
                },
                _hide: function(e) {
                    var t = _message_boxes[e];
                    if (t && t._in_queue && u._boxes[u.count() - 1] === e && t.isVisible() && (t._in_queue = !1, u._boxes.pop(), t._hide(!!u.count()), u.count())) {
                        var n = u._boxes[u.count() - 1];
                        u.curBox = n, _message_boxes[n]._show(!0, !0, !0)
                    }
                },
                _boxes: [],
                curBox: 0
            };

        function s() {
            var e = window._message_boxes[u.curBox];
            return e && e.isVisible() ? e : null
        }

        function _() {
            u.hideLastCheck = u.hideLast.pbind(!0), window._message_box_guid = 0, window._message_boxes = []
        }

        function d(e) {
            var t = window.innerHeight || document.documentElement.clientHeight || boxLayerBG.offsetHeight,
                n = c.a.mobile ? Object(o.r)(window.pageYOffset) : 0,
                r = Object(i.N)(e);
            e.style.marginTop = Math.max(10, n + (t - r[1]) / 3) + "px"
        }

        function l(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = (t.w || 380) + 20,
                u = t.w ? ' style="width: ' + t.w + 'px;"' : "",
                s = bodyNode.offsetWidth,
                _ = Object(i.e)("div", {
                    className: "top_result_baloon_wrap fixed " + (t.className || ""),
                    innerHTML: '<div class="top_result_baloon"' + u + ">" + e + "</div>"
                }, {
                    left: (s - n) / 2
                });
            t.parentEl ? Object(i.H)(t.parentEl).appendChild(_) : bodyNode.insertBefore(_, pageNode);
            var d = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
                l = c.a.mobile ? Object(o.r)(window.pageYOffset) : 0,
                f = Object(i.N)(_);
            _.style.top = Math.max(10, l + (d - f[1]) / 3) + "px";
            var b = t.out || 2e3,
                m = new Date,
                p = function e() {
                    b < 0 || (window.doneBoxTO = setTimeout(function() {
                        !t.permit || t.permit() ? Object(a.f)(_.firstChild, 500, function() {
                            Object(i.Fa)(_), t.callback && t.callback()
                        }) : e()
                    }, b))
                };
            return Object(r.b)(_, "mouseenter", function() {
                clearTimeout(window.doneBoxTO), b -= new Date - m
            }), Object(r.b)(_, "mouseleave", function() {
                m = new Date, p()
            }), p(), _
        }

        function f() {
            return u
        }
    },
    lJdi: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return u
        }), n.d(t, "d", function() {
            return s
        }), n.d(t, "b", function() {
            return _
        }), n.d(t, "a", function() {
            return d
        }), n.d(t, "l", function() {
            return O
        }), n.d(t, "f", function() {
            return j
        }), n.d(t, "e", function() {
            return E
        }), n.d(t, "h", function() {
            return y
        }), n.d(t, "i", function() {
            return w
        }), n.d(t, "j", function() {
            return k
        }), n.d(t, "g", function() {
            return P
        }), n.d(t, "k", function() {
            return x
        }), n.d(t, "m", function() {
            return M
        }), n.d(t, "n", function() {
            return T
        });
        var r, o = n("rHUl"),
            i = n("aong"),
            a = n("P13b");

        function c(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var u = 1,
            s = 4,
            _ = 8,
            d = 16,
            l = "see_invite_link",
            f = "change_invite_link",
            b = "invite_user",
            m = "pin_unpin",
            p = "change_title",
            h = "add_admin",
            g = (c(r = {}, l, 32), c(r, f, 32), c(r, h, d), c(r, b, u), c(r, m, s), c(r, p, _), r),
            v = 1;

        function O(e, t, n) {
            return D(e, l, t, n)
        }

        function j(e, t, n) {
            return D(e, f, t, n)
        }

        function E(e, t, n, r) {
            var a = Object(i.r)(e);
            return !T(Object(o.t)(a, n || a.peer), t) && D(e, h, n, r)
        }

        function y(e, t, n) {
            return D(e, b, t, n)
        }

        function w(e, t, n, r) {
            var c = Object(i.r)(e);
            if (function(e, t) {
                    var n = Object(i.r)(e);
                    return void 0 !== n.service && (n.service & t) > 0
                }(e, v)) return !0;
            var u = Object(o.t)(c, n || c.peer);
            return !(u.data.kicked && !u.data.closed) && (!Object(a.Pa)(e, n) && (!T(u, t) && (!!T(u, r = void 0 === r ? window.vk.id : r) || (I(u, r) ? !I(u, t) : function(e, t) {
                return -1 !== e.invitedByMe.indexOf(t)
            }(u, t) && !I(u, t)))))
        }

        function k(e, t, n) {
            return D(e, m, t, n)
        }

        function P(e, t, n) {
            return D(e, p, t, n)
        }

        function x(e, t, n) {
            return !Object(o.C)(n) || !!Object(o.t)(e, t).caccess[n]
        }

        function D(e, t, n, r) {
            var c = Object(i.r)(e);
            r = void 0 === r ? window.vk.id : r, n = void 0 === n ? c.peer : n;
            var u = Object(o.t)(c, n),
                s = !u.data.kicked && !u.data.closed,
                _ = g[t];
            if (Object(a.Pa)(e, n)) switch (t) {
                case h:
                case b:
                    return !1;
                case l:
                    return s;
                default:
                    return c.gid > 0
            }
            switch (t) {
                case l:
                case f:
                case h:
                    return M(u, _) ? I(u, r) && s : T(u, r);
                case b:
                case m:
                case p:
                    return M(u, _) ? I(u, r) && s : s
            }
            return !1
        }

        function M(e, t) {
            return ((e && e.data && e.data.flags || 0) & t) > 0
        }

        function I(e, t) {
            return (e && e.adminIds || []).indexOf(+t) > -1
        }

        function T(e, t) {
            return e.ownerId === t
        }
    },
    nyd8: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return a
        }), n.d(t, "a", function() {
            return c
        });
        var r = window,
            o = r.nav,
            i = r.extend;

        function a(e) {
            var t = i({}, o.objLoc, e);
            Object.keys(t).filter(function(e) {
                return "" === t[e]
            }).forEach(function(e) {
                delete t[e]
            });
            var n = o.toStr(t);
            o.setLoc(n)
        }

        function c() {
            var e = {};
            return {
                scheduleNav: function(t) {
                    e = i(e, t)
                },
                commitNav: function() {
                    a(e), e = {}
                },
                scheduleNavWithTimeOut: function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                    e = i(e, t), setTimeout(function() {
                        a(e), e = {}
                    }, n)
                }
            }
        }
    },
    p3re: function(e, t, n) {
        "use strict";
        n.d(t, "e", function() {
            return s
        }), n.d(t, "c", function() {
            return _
        }), n.d(t, "f", function() {
            return d
        }), n.d(t, "d", function() {
            return b
        }), n.d(t, "a", function() {
            return m
        }), n.d(t, "b", function() {
            return p
        });
        var r = n("h++7"),
            o = void 0,
            i = window,
            a = i.clean,
            c = i.replaceEntities,
            u = i.statlogsValueEvent;

        function s(e, t) {
            for (var n = void 0, o = 0, i = e; null !== (n = r.s.exec(e));) {
                var a = (n = l(n))[0].length,
                    c = n.index + a,
                    u = e[n.index - 1],
                    s = e[c - 1],
                    _ = void 0 !== u && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(u),
                    d = void 0 !== s && /([:;$])/i.test(s);
                if (!_ && !d) {
                    var b = f(n),
                        m = b.domain.toLowerCase();
                    if (m.length <= r.p && -1 !== r.y.indexOf(m)) {
                        var p = t(b);
                        i = i.slice(0, n.index + o) + p + i.slice(c + o), o += p.length - a
                    }
                }
            }
            return i
        }

        function _(e, t) {
            return e.replace(r.c, t || function(e) {
                return '<a href="mailto:' + e + '">' + e + "</a>"
            })
        }

        function d(e, t) {
            return e.replace(r.q, t || function(e, t, n, r, o) {
                return '<a href="/' + (t + n) + '" class="mem_link" mention="' + a(r || "") + '" mention_id="' + a(t + n) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + o + "</a>"
            })
        }

        function l(e) {
            if (!e[0] || !e[6]) return e;
            var t = e[0].length - 1,
                n = e[6].length - 1;
            return "." === e[0][t] && "." === e[6][n] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, n)), e
        }

        function f(e) {
            return {
                full: e[0],
                protocol: e[1] || "http://",
                url: e[2],
                domain: e[4],
                query: e[6] || ""
            }
        }

        function b(e, t) {
            return e.replace((o || (o = new RegExp(r.x, "ig")), o), function(e, n, r, o, i, a) {
                return (n || "") + t(r + (i || ""))
            })
        }

        function m(e) {
            u("ttl_message_confirm_delivery", e)
        }

        function p(e, t) {
            var n = t.protocol,
                o = t.url,
                i = t.query,
                u = t.domain,
                s = t.full;
            try {
                s = decodeURIComponent(s)
            } catch (e) {}
            if (s.length > 55 && (s = s.substr(0, 53) + ".."), s = a(s).replace(/&amp;/g, "&"), !e && u.match(r.t)) {
                var _, d = o = c(o).replace(r.f, encodeURIComponent),
                    l = o.indexOf("#/"),
                    f = "";
                return l >= 0 ? d = o.substr(l + 1) : (l = o.indexOf("#!")) >= 0 && (d = "/" + o.substr(l + 2).replace(/^\//, "")), (_ = d.match(r.B)) && _[1].length < 32 && (f = ' mention_id="' + _[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + function(e) {
                    return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }(n + o + i) + '" target="_blank"' + f + ">" + s + "</a>"
            }
            return '<a href="' + ("away.php?utf=1&to=" + encodeURIComponent(n + c(o + i))) + '" target="_blank" onclick="' + ("return goAway('" + a((n + o + i).replace(/'/g, "\\'")) + "', {}, event);") + '">' + s + "</a>"
        }
    },
    rHUl: function(e, t, n) {
        "use strict";
        n.d(t, "h", function() {
            return _
        }), n.d(t, "K", function() {
            return d
        }), n.d(t, "o", function() {
            return l
        }), n.d(t, "f", function() {
            return f
        }), n.d(t, "j", function() {
            return b
        }), n.d(t, "t", function() {
            return m
        }), n.d(t, "g", function() {
            return p
        }), n.d(t, "s", function() {
            return h
        }), n.d(t, "n", function() {
            return g
        }), n.d(t, "b", function() {
            return v
        }), n.d(t, "J", function() {
            return O
        }), n.d(t, "l", function() {
            return j
        }), n.d(t, "k", function() {
            return E
        }), n.d(t, "P", function() {
            return y
        }), n.d(t, "d", function() {
            return w
        }), n.d(t, "m", function() {
            return k
        }), n.d(t, "q", function() {
            return P
        }), n.d(t, "z", function() {
            return x
        }), n.d(t, "G", function() {
            return D
        }), n.d(t, "D", function() {
            return M
        }), n.d(t, "B", function() {
            return I
        }), n.d(t, "y", function() {
            return T
        }), n.d(t, "e", function() {
            return C
        }), n.d(t, "I", function() {
            return B
        }), n.d(t, "E", function() {
            return A
        }), n.d(t, "O", function() {
            return L
        }), n.d(t, "F", function() {
            return R
        }), n.d(t, "w", function() {
            return W
        }), n.d(t, "N", function() {
            return U
        }), n.d(t, "C", function() {
            return K
        }), n.d(t, "A", function() {
            return q
        }), n.d(t, "a", function() {
            return S
        }), n.d(t, "L", function() {
            return H
        }), n.d(t, "r", function() {
            return N
        }), n.d(t, "M", function() {
            return F
        }), n.d(t, "H", function() {
            return z
        }), n.d(t, "p", function() {
            return V
        }), n.d(t, "c", function() {
            return G
        }), n.d(t, "x", function() {
            return Q
        }), n.d(t, "i", function() {
            return J
        }), n.d(t, "u", function() {
            return X
        }), n.d(t, "v", function() {
            return Z
        }), n.d(t, "Q", function() {
            return Y
        }), n.d(t, "R", function() {
            return $
        });
        var r = n("MhhX"),
            o = n("f01n"),
            i = n("h++7"),
            a = n("86+7"),
            c = n("rjmT"),
            u = n("aong"),
            s = n("lJdi");

        function _(e, t) {
            var n = Object(u.r)(e),
                o = n.tabs[n.peer];
            return Object.keys(o.msgs).filter(function(n) {
                var i = k(e, t, n);
                return !Object(r.k)(i) && intval(n) > o.in_up_to
            })[0]
        }

        function d(e) {
            return Object(u.r)(e).searchShown
        }

        function l(e) {
            return Object(u.r)(e).peer
        }

        function f(e) {
            return b(e, l(e))
        }

        function b(e, t) {
            return (m(e, t) || {}).keyboard
        }

        function m(e, t) {
            var n = Object(u.r)(e);
            return n.tabs && n.tabs[t]
        }

        function p(e) {
            var t = Object(u.r)(e);
            return t.peer ? t.tabs[t.peer] : null
        }

        function h(e) {
            return Object(u.r)(e).selectedMessages
        }

        function g(e, t, n) {
            var o = m(e, t),
                i = h(e)[0];
            if (void 0 === i) return [n];
            var a = Math.min(n, i),
                c = Math.max(n, i);
            return Object.keys(o.msgs).filter(function(e) {
                return e >= a && e <= c
            }).filter(function(t) {
                var n = k(e, e.get().peer, t);
                return !Object(r.l)(n) && !Object(r.e)(n)
            }).map(intval)
        }

        function v(e, t) {
            var n = m(Object(u.r)(t), e),
                o = 0;
            for (var i in n.msgs)
                if (n.msgs.hasOwnProperty(i)) {
                    var a = k(t, e, i);
                    Object(r.k)(a) || (o += Object(r.n)(n, a) ? 1 : 0)
                }
            return o
        }

        function O(e, t, n) {
            return !! function(e, t, n) {
                var r = m(e, t);
                return Object.keys(r.msgs).filter(function(r) {
                    return intval(k(e, t, r).randomId) === n
                }).length > 0
            }(e, t, n)
        }

        function j(e, t) {
            var n = Object(u.r)(e),
                r = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
            return void 0 !== r ? 2e9 + r : t
        }

        function E(e, t, n) {
            var r = m(e, t),
                i = k(e, t, n),
                a = Object.keys(r.msgs).filter(function(n) {
                    var r = k(e, t, n),
                        a = r.local && r.type !== o.g;
                    return !(!i.local && a) && (!(!i.local || a) || j(e, i.messageId) > j(e, r.messageId))
                }).pop();
            return a ? k(e, t, a) : null
        }

        function y(e) {
            return e && e.length > 0 ? o.Z([0].concat(e)) : e
        }

        function w(e, t, n) {
            var o = m(e, t),
                i = k(e, t, n),
                c = Object(u.r)(e);
            return Object(r.k)(i) ? Object(a.c)(e, c.id).name : i.userId !== i.peerId ? !!Object(a.b)(e, i.userId) && Object(a.c)(e, i.userId).name : o.tab
        }

        function k(e, t, n) {
            var r = m(e, t),
                o = r && r.msgs && r.msgs[n];
            return o ? y(o) : null
        }

        function P(e, t, n) {
            var r = m(e, t),
                o = r && r.msgs && Object.keys(r.msgs).sort(function(e, t) {
                    return +e - t
                });
            if (!o) return null;
            var i = o && o.indexOf("" + n),
                a = i > -1 ? o[i - 1] : null;
            return r.msgs[a]
        }

        function x(e) {
            var t = Object(u.r)(e);
            return t.gid || t.isClassic
        }

        function D(e) {
            return Object(u.r)(e).gid
        }

        function M(e) {
            return Object(u.r)(e).gid
        }

        function I(e) {
            return !!Object(u.r)(e).gid
        }

        function T(e, t) {
            return !!(t.peerId > 2e9 && Object(s.m)(t, 1024))
        }

        function C(e, t) {
            var n = Object(u.r)(t);
            return n.tabs[e] || n.mapped_index[e]
        }

        function B(e) {
            var t = Object(u.r)(e);
            return !!I(e) && ((19542789 === t.gid || 103416369 == t.gid) && (t.active_tab === i.n || t.active_tab === i.m))
        }

        function A(e, t) {
            var n = (e = Object(u.r)(e)).tabs;
            return !(!n || !n[t] || void 0 === n[t].history || !n[t].msgs)
        }

        function L(e, t) {
            var n = m(e, t);
            n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
        }

        function R(e) {
            var t = e.get().go_to_end_visible;
            return !!t && t[0]
        }

        function W(e) {
            var t = e.get().go_to_end_visible;
            return t ? t[1] : 0
        }

        function U(e) {
            return !Object(u.r)(e).lockedSending
        }

        function K(e) {
            return e > -2e9 && e < 0
        }

        function q(e, t) {
            return !!K(t) && !!m(e, t).blocked_community
        }

        function S(e) {
            return Object(u.r)(e).voice_message_available
        }

        function H(e) {
            var t = Object(u.r)(e);
            return !(!N(t) && !t.recentSearch)
        }

        function N(e) {
            return Object(u.r)(e).searchText
        }

        function F(e, t) {
            var n = Object(u.r)(e);
            return !!(t && t !== N(e) || n.recentSearch)
        }

        function z(e) {
            return Object(u.r)(e).recentSearch
        }

        function V(e) {
            var t = p(e);
            return t && t.pinned && y(t.pinned)
        }

        function G(e) {
            var t = e.get().popular_sugg;
            return t && t.length > 0
        }

        function Q(e) {
            return 1 == Object(u.r)(e).isEditing
        }

        function J(e) {
            return Object(u.r)(e).gid
        }

        function X(e) {
            return e.draft || (e.draft = Object(c.b)(cur.imDb, e.peerId)), e.draft
        }

        function Z(e) {
            return (Object(u.r)(e).templates || []).filter(function(e) {
                return !e.deleted
            })
        }

        function Y(e) {
            return e.is_message_request || e.folders & i.j[i.k] || e.folders & i.j[i.l]
        }

        function $(e) {
            return e.peerId > 19e8 && e.peerId < 2e9
        }
    },
    rUY3: function(e, t, n) {
        "use strict";
        n.r(t);
        var r = n("uytb"),
            o = n("rjmT"),
            i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            a = window.WriteBox = {
                mrg: function(e) {
                    return vk.rtl ? {
                        marginRight: e
                    } : {
                        marginLeft: e
                    }
                },
                show: function(e, t) {
                    var n = t.toData[0],
                        o = t.toData[7];
                    if (e.setOptions({
                            hideButtons: !0,
                            width: 502,
                            bodyStyle: "padding: 0px; border: 0px;",
                            title: t.title,
                            titleControls: ('<a class="mail_box_header_link" href="/im?sel=' + n + '" onclick="return WriteBox.toFull(event, ' + n + ')">' + t.mail_go_to_dialog + "</a>").replace("%s", o)
                        }), e.removeButtons(), cur.lang = extend(cur.lang || {}, t.lang), extend(cur, {
                            mbTxtInp: {},
                            mbEditable: t.editable,
                            mbSmile: ge("mbe_smile"),
                            toData: t.toData,
                            mbEmoji: t.emoji,
                            mbMedia: null,
                            mbField: ge(t.editable ? "mail_box_editable" : "mail_box_text"),
                            mbAva: ge("mail_box_ava"),
                            mbMediaTypes: t.mediaTypes,
                            mbTo: t.toData,
                            mbHash: t.hash,
                            mbBannedHim: t.bannedhim,
                            ldb: Object(r.c)(vk.id)
                        }), t.emojiRcnt && !cur.mbRcntEmoji) {
                        for (var i = [], c = t.emojiRcnt, u = 0, s = c.length; u < s; ++u) {
                            var _ = c[u];
                            _ && i.push('<a id="mbe_rc_em_' + _ + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + _ + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(_, !1, !0) + "</a>")
                        }
                        cur.mbRcntEmoji = i.join("")
                    }
                    cur.nav.push(function() {
                        cur.ldb.unmount()
                    }), val("mbe_rcemoji", cur.mbRcntEmoji || ""), cur.peer = a.getPeer(), cur.sharedImWrite = {}, cur.emojiWId = Emoji.init(cur.mbField, {
                        ttDiff: 1,
                        controlsCont: ge("mbe_emoji_wrap"),
                        shouldFocus: !0,
                        onSend: a.send,
                        rPointer: !0,
                        noEnterSend: 1,
                        ref: "writebox",
                        noStickers: !!t.checkedRecipent,
                        forceTxt: !t.editable,
                        sharedTT: cur.sharedImWrite,
                        txt: ge("mail_box_editable"),
                        checkEditable: a.checkEditable,
                        saveDraft: a.saveDraft,
                        rceCont: ge("mbe_rcemoji_cont"),
                        addMediaBtn: ge("mail_box_add_row"),
                        sendWrap: ge("mail_box_controls"),
                        onKeyAction: function(e) {
                            clearTimeout(cur.saveWriteBoxDraft);
                            var t = "paste" == e.type ? 0 : 300;
                            cur.saveWriteBoxDraft = setTimeout(a.saveDraft, t)
                        },
                        onStickerSend: function(e, t) {
                            var n = trim(Emoji.editableVal(cur.mbField)),
                                r = cur.mbMedia.getMedias(),
                                o = cur.toData[0];
                            ajax.post("/al_im.php", {
                                act: "a_send_box",
                                to_ids: o,
                                chas: cur.mbHash,
                                msg: "",
                                ts: cur.ts,
                                media: "sticker:" + e,
                                send_sticker: 1,
                                from: "box",
                                sticker_referrer: t
                            }, {
                                onDone: function(e, t) {
                                    n || r.length ? a.send(!1) : (t && ls.set("im_draft" + vk.id + "_" + t, !1), curBox().hide(), showDoneBox(e))
                                },
                                showProgress: lockButton.pbind("mail_box_send"),
                                hideProgress: unlockButton.pbind("mail_box_send"),
                                onFail: function(e) {
                                    var t = showFastBox(getLang("global_error"), e).hide;
                                    return setTimeout(t, 3e3), !0
                                }
                            })
                        },
                        onRecentEmojiUpdate: function() {
                            a.extractEmoji()
                        }
                    }), Emoji.emojiLoadMore(cur.emojiWId), cur.mbTo[0] ? cur.mbHidden = !1 : cur.mbHidden = !0, cur.imwEmoji = -1;
                    var d = cur.postTo;
                    cur.postTo = !1, e.setOptions({
                        onHide: function() {
                            removeEvent(document, "keydown", a.onKey), cur.mbEmojiShown && Emoji.ttClick(cur.emojiWId, cur.mbSmile, !0), cur.mbOnMouseClick && (cur.onMouseClick = cur.mbOnMouseClick, cur.mbOnMouseClick = !1), browser.mozilla
                        },
                        onShow: function() {
                            addEvent(document, "keydown", a.onKey), cur.mbOnMouseClick || (cur.mbOnMouseClick = cur.onMouseClick), browser.mozilla, cur.sorterClbk && (cur.sorterClbk(), delete cur.sorterClbk)
                        },
                        onClean: function() {
                            clearTimeout(cur.mbSaveDraftTO), delete cur.mbSaveDraftTO, delete cur.mbField, cur.postTo = d, cur.mbEmojiScroll = cur.mbEmojiExpanded = !1, cur.mbForceAttach = !1, window.WideDropdown && WideDropdown.deinit("mail_box_dd")
                        }
                    }), addEvent(document, "keydown", a.onKey), cur.mbOnMouseClick || (cur.mbOnMouseClick = cur.onMouseClick), stManager.add(["page.js", "page.css"], function() {
                        var t = {
                            mail: 1,
                            nocl: 1,
                            editable: 1,
                            sortable: 1,
                            teWidth: 150,
                            teHeight: 100,
                            toggleLnk: !0
                        };
                        cur.mbForceAttach && "market" == cur.mbForceAttach[0] && (t.onMediaAdd = function() {
                            for (var e in cur.mbMedia.chosenMedias)
                                if ("market" == cur.mbMedia.chosenMedias[e][0]) {
                                    var t = cur.mbMedia.chosenMedias[e][2];
                                    hide(geByClass1("page_media_x_wrap", t))
                                }
                        }), cur.mbMedia = new MediaSelector("mail_box_add_link", "mail_box_added_row", cur.mbMediaTypes, t), cur.mbMedia.onChange = function() {
                            e.changed = !0, setTimeout(function() {
                                a.saveDraft()
                            }, 100)
                        }, ls.checkVersion() && cur.mbTo[0] && a.restoreDraft(cur.mbTo[0])
                    })
                },
                getPeer: function() {
                    return intval(cur.toData[0])
                },
                restoreDraft: function(e) {
                    var t = a.getPeer();
                    if (!(!t || e && t != intval(e) || browser.mobile) && cur.mbMedia) {
                        var n = Object(o.b)(cur.ldb, t);
                        cur.mbForceAttach && "market" == cur.mbForceAttach[0] && (n.setText(unclean(getLang("mail_market_tmpl")).replace(/<br>/g, "\n")), n.removeAllAttaches(), n.addAttach("market", cur.mbForceAttach[1])), a.editableHasVal(cur.mbField) || (cur.mbEditable ? (Emoji.val(cur.mbField, clean(n.dData.txt)), window.Emoji && Emoji.editableFocus(cur.mbField, !1, !0)) : val(cur.mbField, clean(n.dData.txt))), n.prepareObjects().then(function() {
                            if (cur.mbField && a.getPeer() == t)
                                for (var e = n.dData.attaches, r = 0; r < e.length; r++) cur.mbMedia.chooseMedia(e[r].type, e[r].id, e[r].object || {}, null, !0)
                        }), a.checkEditable(cur.emojiWId, cur.mbField), a.checkLen(cur.mbField)
                    }
                },
                saveDraft: function() {
                    var e = a.getPeer();
                    if (e && cur.mbField) {
                        var t = Object(o.b)(cur.ldb, e);
                        t.setText(unclean(trim(Emoji.val(cur.mbField)))), t.removeAllAttaches(), cur.mbMedia.getMedias().forEach(function(e) {
                            return t.addAttach(e[0], e[1])
                        }), t.destroy()
                    }
                },
                toFull: function(e, t) {
                    if (!checkEvent(e)) {
                        var n = {
                                0: "im",
                                sel: t
                            },
                            r = trim(Emoji.editableVal(cur.mbField));
                        if (r && (n.message = r), cur.mbMedia.chosenMedias) {
                            for (var o = cur.mbMedia.getMedias(), a = [], c = 0, u = o.length; c < u; ++c) {
                                var s = o[c],
                                    _ = [];
                                for (var d in s) "object" != i(s[d]) && _.push(s[d]);
                                a.push(_.join(","))
                            }
                            n.media = a.join("*")
                        }
                        return nav.go(n, null, {
                            noback: !0
                        }), !1
                    }
                },
                send: function(e) {
                    if (!buttonLocked("mail_box_send")) {
                        var t = trim(Emoji.editableVal(cur.mbField)),
                            n = cur.mbMedia.getMedias();
                        cur.mbEditable && a.extractEmoji();
                        var r = {
                            act: "a_send_box",
                            chas: cur.mbHash,
                            message: t,
                            title: isVisible("mail_box_title_wrap") && val("mail_box_title") || "",
                            from: "box",
                            entrypoint: "friends" === cur.module ? "friends" : "writebox",
                            media: [],
                            to_ids: []
                        };
                        cur.mbForceAttach && (r.attach1_type = cur.mbForceAttach[0], r.attach1 = cur.mbForceAttach[1], r.attach1_hash = cur.mbForceAttach[2]);
                        for (var i, c = 0, u = n.length; c < u; ++c)(i = n[c]) && r.media.push(i[0] + ":" + i[1]);
                        if (r.media = r.media.join(","), !t && !r.media) return cur.mbEditable ? Emoji.editableFocus(cur.mbField) : elfocus(cur.mbField);
                        r.to_ids = cur.toData[0], cur.mbBannedHim != r.to_ids || !0 === e ? ajax.post("al_im.php", r, {
                            onDone: function(e, t) {
                                if (t) {
                                    var n = Object(o.b)(cur.ldb, t);
                                    n.clear(), n.destroy()
                                }
                                curBox().hide(), showDoneBox(e)
                            },
                            showProgress: lockButton.pbind("mail_box_send"),
                            hideProgress: unlockButton.pbind("mail_box_send")
                        }) : showBox("al_profile.php", {
                            act: "banned_him",
                            action: "mail",
                            mid: cur.mbBannedHim
                        }, {
                            dark: 1
                        }).onContinue = a.send.pbind(!0)
                    }
                },
                checkLen: function(e) {
                    cur.mbTxtInp.value = Emoji.editableVal(e), checkTextLength(4096, cur.mbTxtInp, "mail_box_warn"), toggle("mail_box_title_wrap", cur.mbTxtInp.lastLen > 200)
                },
                codeToChr: function(e) {
                    for (var t = e.length / 4, n = "", r = 0; t--;) n += String.fromCharCode(parseInt(e.substr(r, 4), 16)), r += 4;
                    return n
                },
                editableHasVal: function(e) {
                    return !!e && ("TEXTAREA" == e.tagName ? !!val(e) : !(!geByTag1("IMG", e) && !stripHTML(val(e)).replace(/[\s\xa0]/g, "").length))
                },
                checkEditable: function(e, t) {
                    cur.mbEditable && Emoji.checkEditable(e, t, {
                        height: 180
                    })
                },
                cssAnimation: function() {
                    var e = intval(browser.version);
                    return !!(browser.chrome && e > 14 || browser.mozilla && e > 13 || browser.opera && e > 2)
                },
                onKey: function(e) {
                    var t = "INPUT" == e.target.tagName || "TEXTAREA" == e.target.tagName || "mail_box_editable" == e.target.id;
                    if (!isInputActive()) {
                        if (e.keyCode > 40 && !e.ctrlKey && !e.metaKey && !t)
                            if (cur.mbEditable) Emoji.editableFocus(cur.mbField, !1, !0);
                            else {
                                var n = cur.mbField;
                                !n.active && elfocus(n)
                            }
                        return !0
                    }
                },
                extractEmoji: function() {
                    var e = ge("mbe_rcemoji");
                    if (e) {
                        var t = "",
                            n = Emoji.getRecentEmojiSorted().slice(0, 7);
                        for (var r in n)
                            if (n.hasOwnProperty(r)) {
                                var o = n[r];
                                t += '<a id="mbe_rc_em_' + o + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + o + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(o, !1, !0) + "</a>"
                            }
                        val(e, t)
                    }
                }
            };
        try {
            stManager.done("writebox.js")
        } catch (e) {}
    },
    rjmT: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c
        }), n.d(t, "b", function() {
            return s
        });
        var r = n("BxOC"),
            o = n("f01n"),
            i = n("vT4u"),
            a = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && c.return && c.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function c(e, t) {
            this._db = e, this._key = t, this.dData = {
                txt: "",
                attaches: [],
                urlBinds: [],
                cancelled: []
            }, this.load()
        }

        function u(e) {
            switch (e.type) {
                case "mail":
                case "reply":
                    return e.id < 0 && 1 == e.object.fwd_count;
                default:
                    return !e.object
            }
        }

        function s(e, t) {
            return new c(e, "draft_" + t)
        }
        c.prototype.dump = function() {
            var e;
            this._key && this._db.updateByKey(this._key, {
                txt: (e = this.dData).txt,
                attaches: e.attaches.length ? e.attaches : void 0,
                urlBinds: e.urlBinds.length ? e.urlBinds : void 0,
                cancelled: e.cancelled.length ? e.cancelled : void 0
            })
        }, c.prototype.load = function() {
            if (this._key) {
                var e = this._db.selectByKey(this._key);
                e && (this.dData = function(e) {
                    return {
                        txt: e.txt,
                        attaches: e.attaches || [],
                        urlBinds: e.urlBinds || [],
                        cancelled: e.cancelled || []
                    }
                }(e))
            }
        }, c.prototype.clear = function() {
            this.dData = {
                txt: "",
                attaches: [],
                urlBinds: [],
                cancelled: []
            }, this.dump()
        }, c.prototype.setText = function(e) {
            this.dData.txt = trim(e), this.dump()
        }, c.prototype.addAttach = function(e, t, n) {
            if ("share" === e && this.removeAttachByType(e), "mail" !== e && "reply" !== e || (this.removeAttachByType("mail"), this.removeAttachByType("reply")), !e || !t && "poll" !== e) return !1;
            var r = this.dData.attaches.findIndex(function(n) {
                return n.type === e && n.id === t
            }); - 1 === r ? (this.dData.attaches.push({
                type: e,
                id: t,
                object: n
            }), this.dump()) : "video" !== e && "poll" !== e || (this.dData.attaches[r] = {
                type: e,
                id: t,
                object: n
            }, this.dump())
        }, c.prototype.syncWithSelector = function(e) {
            var t = this,
                n = this.getFwdRaw();
            this.dData.attaches = (n ? [n] : []).concat(e.getMedias().map(function(e) {
                var n = a(e, 2),
                    r = n[0],
                    o = n[1];
                return t.dData.attaches.find(function(e) {
                    return e.type == r && e.id == o
                }) || {
                    type: r,
                    id: o
                }
            })), this.dump()
        }, c.prototype.removeAttachByType = function(e) {
            for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
            this.dump()
        }, c.prototype.removeAllAttaches = function() {
            this.dData.attaches = [], this.dData.cancelled = [], this.dump()
        }, c.prototype.addBindUrl = function(e, t, n) {
            this.getBoundAttach(e) || (this.dData.urlBinds.push({
                url: e,
                type: t,
                id: n
            }), this.dump())
        }, c.prototype.getBoundAttach = function(e) {
            var t = this.dData.urlBinds.find(function(t) {
                return t.url === e
            });
            return t && this.dData.attaches.find(function(e) {
                return e.type === t.type && e.id === t.id
            }) || null
        }, c.prototype.getShareUrl = function() {
            var e = this.dData.attaches.find(function(e) {
                return "share" === e.type
            });
            if (e && e.object) return e.object.url
        }, c.prototype.hasOnlyReplies = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return e ? e.flags & o.k && !this.dData.attaches.find(function(e) {
                return "mail" !== e.type
            }) : this.hasAttaches() && !this.dData.attaches.find(function(e) {
                return "reply" !== e.type
            })
        }, c.prototype.getCancelledShares = function() {
            return this.dData.cancelled.length ? this.dData.cancelled : void 0
        }, c.prototype.hasAttaches = function() {
            return this.dData.attaches.length > 0
        }, c.prototype.destroy = function() {
            this.dData = {}, this._key = this._db = null
        }, c.prototype.prepareObjects = function(e, t) {
            var n = this;
            return this.dData.attaches.find(u) ? Object(r.b)(i.e, {
                act: "draft_medias",
                gid: e,
                messageId: t || 0,
                media: t ? void 0 : this.dData.attaches.map(function(e) {
                    return [e.type, e.id]
                }).join("*")
            }).then(function(e) {
                var t = a(e, 1)[0];
                n.dData.attaches = t.map(function(e) {
                    return {
                        type: e[0],
                        id: e[1],
                        object: e[2]
                    }
                })
            }) : Promise.resolve()
        }, c.prototype.getFwdRaw = function() {
            return this.dData.attaches.find(function(e) {
                return "mail" === e.type || "reply" === e.type
            })
        }, c.prototype.getFwdCount = function() {
            var e = this.getFwdRaw();
            return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
        }
    },
    ryw6: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return topMsg
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return topError
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return showMsg
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return showGlobalPrg
        });
        var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zxIV"),
            _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("t7n3");

        function topMsg(e, t, n) {
            if (n || (n = "#D6E5F7"), e) {
                clearTimeout(window.topMsgTimer);
                var r = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)("system_msg");
                r.style.backgroundColor = n, r.innerHTML = e, Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Ta)(r), t && (window.topMsgTimer = setTimeout(topMsg.pbind(!1), 1e3 * t))
            } else Object(_dom__WEBPACK_IMPORTED_MODULE_0__.W)("system_msg")
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
            } - 1 != opts.dt && topMsg(text, opts.dt, "#FFB4A3"), __dev || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)("debuglogwrap") || (delete opts.dt, ajax.plainpost("/errors.php", Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.i)(opts, {
                msg: opts.msg || text,
                module: (window.cur || {}).module,
                id: vk.id,
                host: locHost,
                lang: vk.lang,
                loc: (window.nav || {}).strLoc,
                realloc: location.toString()
            })))
        }

        function showMsg(e, t, n, r) {
            var o = "msg" + ("msg" !== n ? " " + n : "");
            r && (o += " msg_appear"), e = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)(e);
            var i = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.H)(n, e),
                a = i || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.u)(e),
                c = e.insertBefore(Object(_dom__WEBPACK_IMPORTED_MODULE_0__.e)("div", {
                    className: o,
                    innerHTML: '<div class="msg_text">' + t + "</div>"
                }), a);
            i && Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Fa)(i), setTimeout(_dom__WEBPACK_IMPORTED_MODULE_0__.Ha.pbind(c, "msg_appear"), 0)
        }

        function showGlobalPrg(e, t) {
            var n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Q)(e),
                r = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.N)(e),
                o = t || {},
                i = o.w,
                a = void 0 === i ? 32 : i,
                c = o.h,
                u = void 0 === c ? 13 : c,
                s = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)("global_prg");
            s.className = o.cls || "progress", Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Qa)(s, {
                left: n[0] + Math.floor((r[0] - a) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.r)(o.shift ? o.shift[0] : 0),
                top: n[1] + Math.floor((r[1] - u) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.r)(o.shift ? o.shift[1] : 0),
                width: a,
                height: u,
                display: "block",
                "z-index": o.zIndex ? o.zIndex : null
            }), o.hide && (e.style.visibility = "hidden")
        }
    },
    uytb: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return o
        }), n.d(t, "a", function() {
            return i
        }), n.d(t, "c", function() {
            return s
        });
        var r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && c.return && c.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            o = "recent_search",
            i = "pin_hide";

        function a(e) {
            return "im_store_" + e
        }

        function c(e) {
            return ls.get(a(e)) || {}
        }

        function u(e, t, n) {
            if (ls.checkVersion()) {
                var r = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", r.length), n(a(e), r)
            }
        }

        function s(e) {
            var t = debounce(function(e, t) {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && function(e, t) {
                for (var n = ["fwd", "draft", "bind_attach"], r = c(e), o = !1, i = n.length; i--;) n[i] in r && (delete r[n[i]], o = !0);
                o && u(e, r, t)
            }(e, t);
            var n = {
                    db: c(e),
                    checkTime: Date.now()
                },
                s = function(e, t, n) {
                    n.key === a(e) && (t.db = JSON.parse(n.newValue), t.checkTime = Date.now())
                }.bind(null, e, n);
            return window.addEventListener("storage", s, !1), {
                select: function(t, r) {
                    return Date.now() - n.checkTime > 1e3 && (n.db = c(e)),
                        function(e, t, n) {
                            return t === o ? e[t] || [] : t === i ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
                        }(n.db, t, r)
                },
                selectByKey: function(t) {
                    return Date.now() - n.checkTime > 1e3 && (n.db = c(e)), n.db[t]
                },
                update: function(a, c) {
                    var s = function(e, t, n) {
                        switch (e[t] || (e[t] = {}), t) {
                            case o:
                                var a = n;
                                a && a.length > 0 ? e[t] = a : delete e[t];
                                break;
                            case i:
                                var c = r(n, 2),
                                    u = c[0],
                                    s = c[1];
                                s ? e[t][u] = +s : delete e[t][u]
                        }
                        return e
                    }(n.db, a, c);
                    return n.db = s, n.checkTime = Date.now(), u(e, s, t)
                },
                updateByKey: function(r, o) {
                    return n.db[r] = o, n.checkTime = Date.now(), u(e, n.db, t)
                },
                unmount: function() {
                    window.removeEventListener("storage", s, !1)
                }
            }
        }
    },
    vT4u: function(e, t, n) {
        "use strict";
        n.d(t, "e", function() {
            return y
        }), n.d(t, "b", function() {
            return w
        }), n.d(t, "d", function() {
            return k
        }), n.d(t, "c", function() {
            return P
        }), n.d(t, "a", function() {
            return T
        }), n.d(t, "Ja", function() {
            return C
        }), n.d(t, "bc", function() {
            return R
        }), n.d(t, "oc", function() {
            return W
        }), n.d(t, "Sa", function() {
            return U
        }), n.d(t, "vb", function() {
            return K
        }), n.d(t, "jb", function() {
            return q
        }), n.d(t, "Jb", function() {
            return H
        }), n.d(t, "Kb", function() {
            return F
        }), n.d(t, "p", function() {
            return z
        }), n.d(t, "yc", function() {
            return V
        }), n.d(t, "Ob", function() {
            return G
        }), n.d(t, "Qa", function() {
            return Q
        }), n.d(t, "Ma", function() {
            return J
        }), n.d(t, "fb", function() {
            return Z
        }), n.d(t, "Na", function() {
            return Y
        }), n.d(t, "Oa", function() {
            return $
        }), n.d(t, "Xb", function() {
            return ee
        }), n.d(t, "qb", function() {
            return te
        }), n.d(t, "Ec", function() {
            return ie
        }), n.d(t, "F", function() {
            return ae
        }), n.d(t, "h", function() {
            return ce
        }), n.d(t, "Wa", function() {
            return _e
        }), n.d(t, "Xa", function() {
            return de
        }), n.d(t, "T", function() {
            return le
        }), n.d(t, "eb", function() {
            return fe
        }), n.d(t, "Ya", function() {
            return be
        }), n.d(t, "zc", function() {
            return me
        }), n.d(t, "Pb", function() {
            return pe
        }), n.d(t, "Gc", function() {
            return he
        }), n.d(t, "Lb", function() {
            return Oe
        }), n.d(t, "D", function() {
            return je
        }), n.d(t, "C", function() {
            return Ee
        }), n.d(t, "j", function() {
            return ye
        }), n.d(t, "t", function() {
            return we
        }), n.d(t, "E", function() {
            return ke
        }), n.d(t, "pb", function() {
            return Pe
        }), n.d(t, "Pa", function() {
            return xe
        }), n.d(t, "g", function() {
            return De
        }), n.d(t, "Sb", function() {
            return Me
        }), n.d(t, "Vb", function() {
            return Ie
        }), n.d(t, "Rb", function() {
            return Te
        }), n.d(t, "Cb", function() {
            return Ce
        }), n.d(t, "Db", function() {
            return Be
        }), n.d(t, "Ua", function() {
            return Ae
        }), n.d(t, "Ib", function() {
            return Re
        }), n.d(t, "Eb", function() {
            return We
        }), n.d(t, "Fb", function() {
            return Ue
        }), n.d(t, "bb", function() {
            return Ke
        }), n.d(t, "Ia", function() {
            return qe
        }), n.d(t, "Gb", function() {
            return Se
        }), n.d(t, "X", function() {
            return He
        }), n.d(t, "Y", function() {
            return Ne
        }), n.d(t, "m", function() {
            return Fe
        }), n.d(t, "v", function() {
            return ze
        }), n.d(t, "Hb", function() {
            return Ge
        }), n.d(t, "Ka", function() {
            return Qe
        }), n.d(t, "Ea", function() {
            return Je
        }), n.d(t, "nb", function() {
            return Xe
        }), n.d(t, "mb", function() {
            return Ze
        }), n.d(t, "lb", function() {
            return Ye
        }), n.d(t, "ob", function() {
            return $e
        }), n.d(t, "wb", function() {
            return et
        }), n.d(t, "xb", function() {
            return tt
        }), n.d(t, "f", function() {
            return rt
        }), n.d(t, "gb", function() {
            return ot
        }), n.d(t, "Nb", function() {
            return it
        }), n.d(t, "Mb", function() {
            return at
        }), n.d(t, "K", function() {
            return ct
        }), n.d(t, "cb", function() {
            return ut
        }), n.d(t, "B", function() {
            return st
        }), n.d(t, "I", function() {
            return _t
        }), n.d(t, "qc", function() {
            return dt
        }), n.d(t, "Ga", function() {
            return lt
        }), n.d(t, "i", function() {
            return ft
        }), n.d(t, "Ha", function() {
            return bt
        }), n.d(t, "s", function() {
            return mt
        }), n.d(t, "Ra", function() {
            return pt
        }), n.d(t, "pc", function() {
            return ht
        }), n.d(t, "Ca", function() {
            return vt
        }), n.d(t, "zb", function() {
            return Ot
        }), n.d(t, "kc", function() {
            return jt
        }), n.d(t, "Yb", function() {
            return Et
        }), n.d(t, "Ub", function() {
            return yt
        }), n.d(t, "G", function() {
            return wt
        }), n.d(t, "sc", function() {
            return kt
        }), n.d(t, "xc", function() {
            return Pt
        }), n.d(t, "Ta", function() {
            return xt
        }), n.d(t, "J", function() {
            return Dt
        }), n.d(t, "Qb", function() {
            return Mt
        }), n.d(t, "P", function() {
            return It
        }), n.d(t, "db", function() {
            return Tt
        }), n.d(t, "w", function() {
            return Ct
        }), n.d(t, "yb", function() {
            return Bt
        }), n.d(t, "lc", function() {
            return At
        }), n.d(t, "Tb", function() {
            return Lt
        }), n.d(t, "V", function() {
            return Rt
        }), n.d(t, "Dc", function() {
            return Wt
        }), n.d(t, "q", function() {
            return Ut
        }), n.d(t, "rc", function() {
            return Kt
        }), n.d(t, "Ab", function() {
            return qt
        }), n.d(t, "H", function() {
            return St
        }), n.d(t, "o", function() {
            return Ht
        }), n.d(t, "uc", function() {
            return Ft
        }), n.d(t, "ic", function() {
            return zt
        }), n.d(t, "Va", function() {
            return Vt
        }), n.d(t, "O", function() {
            return Gt
        }), n.d(t, "hb", function() {
            return Qt
        }), n.d(t, "gc", function() {
            return Jt
        }), n.d(t, "y", function() {
            return Xt
        }), n.d(t, "ub", function() {
            return Zt
        }), n.d(t, "ac", function() {
            return Yt
        }), n.d(t, "Bc", function() {
            return $t
        }), n.d(t, "W", function() {
            return en
        }), n.d(t, "u", function() {
            return tn
        }), n.d(t, "cc", function() {
            return nn
        }), n.d(t, "vc", function() {
            return rn
        }), n.d(t, "fc", function() {
            return on
        }), n.d(t, "wc", function() {
            return an
        }), n.d(t, "l", function() {
            return cn
        }), n.d(t, "Zb", function() {
            return un
        }), n.d(t, "hc", function() {
            return sn
        }), n.d(t, "Ac", function() {
            return _n
        }), n.d(t, "U", function() {
            return dn
        }), n.d(t, "Z", function() {
            return ln
        }), n.d(t, "M", function() {
            return fn
        }), n.d(t, "rb", function() {
            return bn
        }), n.d(t, "Da", function() {
            return mn
        }), n.d(t, "Bb", function() {
            return pn
        }), n.d(t, "sb", function() {
            return hn
        }), n.d(t, "kb", function() {
            return gn
        }), n.d(t, "ab", function() {
            return vn
        }), n.d(t, "nc", function() {
            return On
        }), n.d(t, "Za", function() {
            return jn
        }), n.d(t, "mc", function() {
            return En
        }), n.d(t, "Q", function() {
            return yn
        }), n.d(t, "N", function() {
            return wn
        }), n.d(t, "L", function() {
            return Pn
        }), n.d(t, "tc", function() {
            return xn
        }), n.d(t, "ib", function() {
            return Dn
        }), n.d(t, "Ba", function() {
            return Mn
        }), n.d(t, "Aa", function() {
            return In
        }), n.d(t, "ec", function() {
            return Tn
        }), n.d(t, "dc", function() {
            return Cn
        }), n.d(t, "r", function() {
            return Bn
        }), n.d(t, "R", function() {
            return An
        }), n.d(t, "Fc", function() {
            return Ln
        }), n.d(t, "S", function() {
            return Rn
        }), n.d(t, "k", function() {
            return Wn
        }), n.d(t, "Fa", function() {
            return Un
        }), n.d(t, "Wb", function() {
            return Kn
        }), n.d(t, "z", function() {
            return qn
        }), n.d(t, "jc", function() {
            return Sn
        }), n.d(t, "La", function() {
            return Hn
        }), n.d(t, "n", function() {
            return Nn
        }), n.d(t, "A", function() {
            return Fn
        }), n.d(t, "x", function() {
            return zn
        }), n.d(t, "Cc", function() {
            return Vn
        }), n.d(t, "tb", function() {
            return Gn
        });
        var r = n("BxOC"),
            o = n("nyd8"),
            i = n("f01n"),
            a = n("DM26"),
            c = n("aong"),
            u = n("uytb"),
            s = n("P13b"),
            _ = n("h++7"),
            d = n("rHUl"),
            l = n("MhhX"),
            f = n("86+7"),
            b = n("ERyv"),
            m = n("Wu9C"),
            p = n("lJdi"),
            h = n("O8ze"),
            g = n("zxIV"),
            v = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            },
            O = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && c.return && c.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function j(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function E(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        var y = "al_im.php",
            w = 5,
            k = "typing",
            P = "audiomessage",
            x = Object(o.a)(),
            D = x.scheduleNav,
            M = x.commitNav,
            I = x.scheduleNavWithTimeOut;
        var T = {
            settings: 0,
            block: 1,
            fav: 1,
            chat: 2,
            invite: 2,
            invite_link: 3,
            topic: 3,
            avatar: 4,
            photos: 5,
            search: 6,
            pin_hide: 7,
            pin_unhide: 7,
            unpin: 8,
            mute: 10,
            unmute: 10,
            clear: 11,
            leave: 12,
            return: 12,
            block_community: 12,
            allow_community: 12
        };

        function C(e, t, n) {
            return Object(r.b)(y, {
                act: "a_renew_hash",
                peers: e.join(","),
                gid: t.hidegid ? void 0 : n.gid
            })
        }

        function B(e, t, n) {
            return function(e) {
                return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
            }(e).then(function(r) {
                return r ? t.apply(void 0, E(n)) : function(e) {
                    if (!e.renew_hashes) {
                        var t = e.last_hashes_update || 0;
                        if (Date.now() - t < 1e4) return Promise.resolve();
                        var n = Object.keys(e.tabs).filter(function(t) {
                            return Object(s.Oa)(e, t)
                        });
                        e.renew_hashes = C(n, {}, e).then(function(t) {
                            var r = O(t, 2),
                                o = r[0],
                                i = r[1];
                            return n.forEach(function(t) {
                                e.tabs[t].hash = o[t]
                            }), e.writeHash = i, delete e.renew_hashes, e.last_hashes_update = Date.now(), e
                        })
                    }
                    return e.renew_hashes
                }(e).then(function(e) {
                    return t.apply(void 0, E(n))
                })
            })
        }

        function A(e) {
            return function() {
                var t = arguments,
                    n = t[t.length - 1];
                return e.apply(void 0, E(t)).catch(function(r) {
                    if (r && r.match && r.match(/1001;/)) return B(n, e, t);
                    throw r
                })
            }
        }

        function L(e) {
            return "string" == typeof e ? se("<div>" + e + "</div>") : e
        }

        function R(e) {
            return "string" == typeof e ? e : e.innerHTML
        }

        function W(e, t) {
            return t.block_states = extend(t.block_states, e), Promise.resolve(t)
        }

        function U(e, t, n, o, i) {
            return i.tabHistoryNotChanged = !1, Object(a.d)(r.b, 3, function(e) {
                return e - 1
            })(y, {
                act: "a_start",
                peer: e,
                msgid: n,
                history: t,
                prevpeer: i.prevPeer,
                gid: i.gid,
                block: o
            }).then(function(t) {
                var r = O(t, 5),
                    o = r[0],
                    a = r[1],
                    c = r[2],
                    u = r[3],
                    _ = r[4];
                if (a.forEach(function(e) {
                        return Object(f.a)(i, e)
                    }), i.tabs || (i.tabs = {}), i.dialog_tab_cts = _, i.tabs[e] || (i.tabs[e] = Object(s.kb)(i, o)), W(u, i), n) {
                    if (i.tabs[e]) {
                        var d = i.tabs[e].lastmsg,
                            l = i.tabs[e].lastmsg_meta;
                        extend(i.tabs[e], o), i.tabs[e].lastmsg = d, i.tabs[e].lastmsg_meta = l
                    }
                } else extend(i.tabs[e], o);
                return i.admins = extend(i.admins, c), i.imQueue(e, !1), Ln(), K(e, i)
            }).catch(function(e) {
                return Object(b.a)("loadPeer", e)
            })
        }

        function K(e, t) {
            var n = t.imQueue(e, !1),
                r = t.tabs[e],
                o = n.filter(function(n) {
                    return !Object(d.J)(t, e, n.rid)
                });
            return r.msgs = o.reduce(function(e, t) {
                return e["rid" + t.rid] = t.mess, e
            }, r.msgs), t.imQueueSet(e, o), t.tabs[e].history = Object(s.Hb)(o, t, L(t.tabs[e].history)), Promise.resolve(t)
        }

        function q(e, t, n) {
            var r = n.imQueue(e, !1).filter(function(e) {
                return e.failed && e.mess.messageId !== t
            });
            return n.imQueueSet(e, r), n.tabs[e].history = Object(s.mb)([t], L(n.tabs[e].history)), Promise.resolve(n)
        }

        function S(e, t) {
            return !1 === (t.block_states[e] || {}).free ? Promise.resolve(t) : Object(r.b)(y, {
                act: "a_block",
                peer: e,
                prevPeer: t.prevPeer,
                gid: t.gid
            }).then(function(e) {
                return W(O(e, 1)[0], t)
            })
        }

        function H(e, t) {
            var n = t.peer;
            return Promise.resolve(t).then(function(t) {
                return t.tabHistoryNotChanged = !1, Object(s.Oa)(t, n) && !t.tabs[n].msgid ? (t.gid && S(n, t), Promise.resolve(t).then(G)) : (Object(s.Oa)(t, n) && (t.tabs[n].msgid = !1), U(n, e, !1, !0, t))
            }).then(G).then(N.bind(null, n))
        }

        function N(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return Object(s.bb)(t, e) && (t.tabs[e].last_touched = Date.now()), Object(s.bb)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
        }

        function F(e, t, n) {
            var r = n.msgid,
                o = n.peer;
            return !e && Object(s.Oa)(n, o) && n.tabs[o].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && S(o, n), Promise.resolve(n).then(G).then(N.bind(null, o))) : U(o, !0, r, !0, n).then(G).then(function() {
                return Object(d.t)(n, o).msgid = r, n
            }).then(N.bind(null, o))
        }

        function z(e, t, n, r) {
            if (Rt(r)) throw Object(s.ac)(), new Error("Cant change peer while loading something");
            var o = r.gid ? "gim" + r.gid : "im";
            if (r.prevPeer = r.peer, r.peer = e, r.msgid = t || "", r.currentEntryPoint = n, cur.peer = e, D({
                    sel: e ? Object(s.H)(e) : null,
                    msgid: r.msgid,
                    email: "",
                    0: o
                }), 0 != r.prevPeer && N(r.prevPeer, r, !0), 0 !== e) {
                Object(s.bb)(r, e) && N(e, r, !0), $t(r.tabbedPeers.map(function(e) {
                    return e.peer
                }).indexOf(e) < 0 ? [{
                    peer: e,
                    type: "perm"
                }].concat(r.tabbedPeers) : r.tabbedPeers.map(function(t) {
                    return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
                }), !1, r)
            } else $t(r.tabbedPeers, !1, r);
            return M(), Fe(r.prevPeer, r)
        }

        function V(e) {
            cur.wallMentions = function() {
                return new Promise(function(t, n) {
                    if (cur.wallMentions = [], !Object(s.Ha)(e.peer) || !Object(s.Oa)(e, e.peer) || Object(s.Pa)(e, e.peer)) return n();
                    var r = e.tabs[e.peer];

                    function o() {
                        var n = [];
                        Object.keys(r.msgs || {}).reverse().forEach(function(e) {
                            var t = Object(d.P)(r.msgs[e]),
                                o = t && t.userId;
                            o && o != vk.id && -1 === n.indexOf(o) && Object(s.eb)(r, o) && n.push(o)
                        }), (r.memberIds || []).forEach(function(e) {
                            -1 === n.indexOf(e) && n.push(e)
                        });
                        var o = [];
                        n.forEach(function(t) {
                            if (Object(f.b)(e, t)) {
                                var n = Object(f.c)(e, t),
                                    r = n.link.substring(1);
                                o.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                            }
                        }), t(o)
                    }
                    r.membersLoaded ? o() : kn(e.peer, e).then(o)
                })
            }
        }

        function G(e) {
            var t = e.peer;
            if (0 === t) return Promise.resolve(e);
            var n = e.tabs[t],
                r = [],
                o = Object(s.Ha)(t) && (n.data.closed || n.data.kicked),
                i = Object(s.Pa)(e, t);
            n.offset && r.push("photos"), n.offset && r.push("search"), (t < -2e9 || n.offset) && !i && r.push("clear"), Object(s.Ja)(e) && !i && r.push("block"), i && !o && r.push("settings"), Object(s.Ka)(t) && (n.blocked_community ? r.push("allow_community") : r.push("block_community")), (Object(s.Ha)(t) || Object(s.fb)(t) || Object(s.Ka)(t)) && !Object(s.Ja)(e) && (Object(s.Ha)(t) && (n.data.kicked || n.data.closed) || (inArray(t, e.mutedPeers) ? r.push("unmute") : r.push("mute"))), Object(s.fb)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), Object(s.Ha)(t) && !o && (Object(p.h)(e) && r.push("invite"), e.gid || r.push("leave")), Object(s.Ha)(t) && n.data.closed && !n.data.kicked && r.push("return"), Object(s.Ha)(t) && n.pinned && (r.push(Object(m.a)(e, t) ? "pin_hide" : "pin_unhide"), Object(p.j)(e) && r.push("unpin"));
            var a = Object(s.D)(e, i);
            return e.curActions = r.sort(function(e, t) {
                return T[e] - T[t]
            }).reduce(function(e, t) {
                return e[t] = a[t], e
            }, {}), Promise.resolve(e)
        }

        function Q(e, t, n) {
            var o = n.tabs[n.peer];
            return Object(r.b)(y, {
                peer: n.peer,
                whole: e,
                act: "a_history",
                offset: o.offset + (o.skipped || 0),
                toend: t,
                gid: n.gid
            }).then(function(e) {
                var t = O(e, 4),
                    r = t[0],
                    i = t[1],
                    a = t[2],
                    c = t[3];
                return o.allShown = a, n.admins = extend(n.admins, c), o.history = r + R(o.history), o.historyToAppend = r, o.offset += Object.keys(i).length, o.msgs = extend(o.msgs, i), n
            })
        }

        function J(e) {
            var t = e.tabs[e.peer];
            return Object(r.b)(y, {
                peer: e.peer,
                act: "a_history",
                rev: 1,
                offset: t.skipped,
                gid: e.gid
            }).then(function(n) {
                var r = O(n, 5),
                    o = r[0],
                    i = r[1],
                    a = r[2];
                r[3], r[4];
                t.allShown = t.allShown || a, t.history = R(t.history) + o, t.historyToAppend = o;
                var c = Object.keys(i).length;
                return t.skipped -= c, t.offset += c, t.msgs = extend(t.msgs, i), e
            })
        }

        function X(e, t, n, r) {
            var o = e.tabs[t];
            return r === i.m && o.out_up_to > n ? e : (r === i.m ? o.out_up_to = n : o.in_up_to = n, e)
        }
        var Z = A(function(e, t) {
            if (Object(s.fc)(t.tabs[e])) return Promise.resolve(t);
            var n = t.tabs[e],
                o = n.msgs || {},
                a = Object.keys(o).map(function(n) {
                    return Object(d.m)(t, e, n)
                }).filter(function(e) {
                    return !Object(l.k)(e)
                }).map(function(e) {
                    return e.messageId
                }).sort(function(e, t) {
                    return t - e
                });
            return n.skipped > 0 && (a = a.filter(function(e) {
                return intval(e) <= n.lastmsg - n.skipped
            })), (a = intval(a.shift())) <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([i.Pa([6, e, a])]), Object(r.b)(y, {
                peer: e,
                ids: [a],
                hash: n.hash,
                act: "a_mark_read",
                gid: t.gid
            }).then(function() {
                return X(t, e, a, i.m)
            }))
        });

        function Y(e) {
            return Object(r.b)(y, {
                act: "a_get_key",
                uid: e.id,
                gid: e.gid
            }).then(function(t) {
                var n = O(t, 3),
                    r = n[0],
                    o = n[1],
                    i = n[2];
                return extend({}, e, {
                    imKey: r,
                    imUrl: o,
                    imPart: i
                })
            })
        }

        function $(e) {
            return Object(r.b)(y, {
                act: "a_get_ts",
                gid: e.gid
            }).then(function(t) {
                var n = O(t, 1)[0];
                return extend({}, e, {
                    imTs: n
                })
            })
        }

        function ee(e, t, n) {
            var r = n.tabs[e];
            return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = Object(s.Kb)(e, t, L(r.history))), Promise.resolve(n)
        }

        function te(e, t, n, r) {
            var o = r.tabs[e];
            return o.msgs[t] && (o.msgs[t].errored = 0, o.lastmsg_meta = n, o.lastmsg = t, o.history = Object(s.dc)(e, t, L(o.history))), Promise.resolve(r)
        }

        function ne(e, t, n, r) {
            var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, i) {
                return !n && !St(i)(t) || o && !o(i, e[i], t) || (e[i] = Object(c.a)(r(e[i], i))), e
            }, e.dialog_tabs))
        }

        function re(e, t) {
            if (!inArray(e, t.tabbedPeers.map(function(e) {
                    return e.peer
                })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
                var n = {
                    peer: e,
                    type: "temp"
                };
                $t(t.tabbedPeers.concat([n]), !1, t)
            }
        }

        function oe(e, t, n) {
            return Object(s.Za)(n) ? t.concat([e]) : [e].concat(t)
        }

        function ie(e, t) {
            var n = e.get().peer,
                r = Object(d.t)(e, n);
            if (Object(s.Oa)(e, n)) {
                var o = L(r.history);
                r.history = Object(s.jc)(e, o, t)
            }
        }

        function ae(e, t) {
            var n = Object(d.t)(t, e.peerId);
            if (Object(s.Oa)(t, e.peerId)) {
                var r = L(n.history);
                n.msgs[e.messageId] = extend(!0, {}, e), n.history = Object(s.J)(t, e, r)
            }
            n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
            var o = n && n.pinned && Object(d.P)(n.pinned);
            return o && o.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
        }

        function ce(e, t) {
            var n = e.flags & i.m,
                r = e.peerId;
            if (Object(s.bb)(t, r)) {
                var o = t.tabs[r];
                if (o.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = j({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? o.unread = 0 : (o.lastmsg == e.messageId && o.unread ? ue(t, 1, e.peerId) : (!o.unread && ue(t, 1, e.peerId), o.unread++), re(e.peerId, t)), Object(s.Oa)(t, r)) {
                    var a = L(o.history);
                    o.skipped > 0 && o.skipped++, o.offset++, o.msgs[e.messageId] = extend(!0, {}, e), o.history = Object(s.x)(t, e, a, !0, !0, !0), Object(l.k)(e) && (o.blocked_community = 0, G(t))
                }
                if (o.typing) {
                    var c = o.typing.userIds.indexOf(e.userId);
                    c >= 0 && o.typing.userIds.splice(c, 1)
                }
                return o.lastmsg = e.messageId, o.lastmsg_meta = e, N(e.peerId, t), ne(t, o, !1, oe.bind(null, r), Nt.bind(null, t)), Promise.resolve(t)
            }
            return U(r, 0, 0, 0, t).then(function(t) {
                return ne(t, t.tabs[r], !1, oe.bind(null, r), Nt.bind(null, t)), N(e.peerId, t), n || re(e.peerId, t), t
            })
        }

        function ue(e, t, n) {
            e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
        }

        function _e(e, t) {
            if (Object(s.Oa)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = n.unread;
                if (t = X(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : Object(d.b)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && ue(t, -1, e.peerId), !n.skipped) {
                    var o = L(n.history);
                    n.history = Object(s.pb)(t, o, e.peerId)
                }
            } else Object(s.bb)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && ue(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
            return Object(s.bb)(t, e.peerId) && (t.dialog_tabs[_.m] = t.dialog_tabs[_.m].filter(function(t) {
                return intval(t) !== e.peerId
            })), 0 !== t.unread_cnt || t.active_tab !== _.m || t.gid ? Promise.resolve(t) : Ht(_.h, t)
        }

        function de(e, t) {
            var n = t.tabs[e.peerId];
            if (Object(s.bb)(t, e.peerId) && X(t, e.peerId, e.upToId, i.m), Object(s.Oa)(t, e.peerId)) {
                var r = L(n.history);
                n.history = Object(s.jb)(t, e.peerId, r)
            }
            return Promise.resolve(t)
        }

        function le(e, t, n, r, o) {
            return o.text = {}, o.imQueue = e, o.imQueueResend = t, o.imQueueSet = n, o.imQueueComplete = r, Promise.resolve(o)
        }

        function fe(e, t, n) {
            function r(e, t) {
                return {
                    id: e.messageId,
                    text: e.text,
                    date: e.date,
                    kludges: e.kludges,
                    authorName: t
                }
            }
            if (1 === e.length) {
                var o = e[0],
                    i = Object(d.m)(n, t, o),
                    a = Object(d.d)(n, t, o);
                return !1 === a ? n.set(bt.bind(null, j({}, t, [i.userId]))).then(function(n) {
                    var a = Object(d.d)(n, t, o);
                    return {
                        msgIds: e,
                        object: r(i, a)
                    }
                }) : Promise.resolve({
                    msgIds: e,
                    object: r(i, a)
                })
            }
            return Promise.resolve({
                msgIds: e
            })
        }

        function be(e, t) {
            Object(s.lb)(t, e);
            var n = t.tabs[t.peer];
            return t.tabs = Object.keys(e).reduce(function(n, r) {
                var o = t.tabs[r] ? t.tabs[r].msgs : {},
                    i = extend({}, o || {}, e[r].msgs || {});
                return n[r] = extend(t.tabs[r] || {}, e[r]), i && (n[r].msgs = i), e[r].lastmsg || (n[r].lastmsg = !1), n
            }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
        }

        function me(e, t, n, r) {
            var o = Object(d.t)(r, e);
            if (o) {
                var i = !1 !== t ? mobPlatforms[t] ? 1 : 0 : o.last_seen[2];
                o.online = t, o.last_seen = [t, n || o.last_seen[1], i]
            }
            return Promise.resolve(r)
        }

        function pe(e, t, n) {
            var r = Object(d.t)(n, e.peerId);
            return r && (e.ts = Date.now() / 1e3, r.activity || (r.activity = {}), r.activity[t] = e, r.typing === k && (r.typing = e)), Promise.resolve(n)
        }

        function he(e, t, n) {
            var r = e.peerId;
            return Object(a.c)(w + 2).then(function() {
                if (Object(s.bb)(n, r)) {
                    var e = n.tabs[r];
                    if ((e.activity || {})[t]) Date.now() - 1e3 * e.activity[t].ts >= 1e3 * w && (delete e.activity[t], 0 === Object.keys(e.activity) && delete e.activity);
                    if (e.typing) Date.now() - 1e3 * e.typing.ts >= 1e3 * w && (e.typing = void 0)
                }
                return n
            })
        }

        function ge(e) {
            var t = {},
                n = e.find(function(e) {
                    return "poll" === e[0]
                });
            if (n) {
                var r = O(n, 3)[2];
                Object.assign(t, r)
            }
            return t
        }

        function ve(e) {
            return e.map(function(e) {
                var t = "audiomsg" === e[2] ? "audio_message" : e[2];
                return e[0] + ":" + e[1] + ":" + t
            }).join(",")
        }
        var Oe = function(e, t, n, o) {
                var i = Date.now() + rand(0, 100).toFixed(0),
                    a = o.ref_id,
                    c = o.ref_source;
                o.ref_source = void 0, o.ref_id = void 0, (c || a) && (D({
                    ref_source: null,
                    ref: null
                }), M()), Object(h.i)(o);
                var u = t.attaches.length > 0,
                    s = Object(h.k)(o, "send", "server", u),
                    _ = Object.assign({
                        act: "a_send",
                        to: e,
                        hash: n.hash,
                        ref_source: c,
                        ref: a,
                        msg: t.message,
                        payload: t.payload,
                        media: ve(t.attaches),
                        guid: i,
                        share_url: t.share_url,
                        cancelled_shares: t.cancelled_shares,
                        random_id: t.rid,
                        gid: n.hidegid ? void 0 : o.gid,
                        entrypoint: o.currentEntryPoint || "",
                        sticker_referrer: t.sticker_referrer
                    }, n.external, ge(t.attaches));
                return Object(r.b)(y, _, 2e4).then(function(e) {
                    var t = O(e, 1)[0];
                    return s(), o.version !== t.version && nav.reload({
                        force: !0
                    }), o.currentEntryPoint = "", o
                }).catch(function(e) {
                    throw Object(h.h)(o, e, "send", "server_send"), e
                })
            },
            je = A(function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = arguments[3],
                    o = r.tabs[e];
                return Oe(e, t, v({
                    hash: o.hash
                }, n), r)
            }),
            Ee = A(function(e, t, n) {
                var o = t.attaches.length > 0,
                    i = Object(h.k)(n, "edit", "server", o);
                return Object(r.b)(y, Object.assign({
                    act: "a_edit_message",
                    hash: e.hash,
                    id: t.messageId,
                    peerId: e.peerId,
                    gid: n.gid,
                    msg: t.origText,
                    media: ve(t.attaches),
                    share_url: t.share_url,
                    cancelled_shares: t.cancelled_shares
                }, ge(t.attaches)), 2e4).then(function(e) {
                    O(e, 1)[0];
                    return i(), n
                }).catch(function(e) {
                    throw Object(h.h)(n, e, "edit", "server_send"), e
                })
            });

        function ye(e, t) {
            if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
                return t !== e[0]
            });
            else {
                var n = t.selectedMessages.concat(e);
                t.selectedMessages = Object(c.a)(n).sort(function(e, t) {
                    return e - t
                })
            }
            return Promise.resolve(t)
        }

        function we(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function ke(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function Pe(e, t) {
            if (Object(s.Oa)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = t.imQueue(e.peerId).filter(function(t) {
                        return t.failed && t.rid !== e.randomId
                    });
                t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId, n.msgs["rid" + e.randomId] && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = Object(s.Eb)(t, L(n.history), e)
            }
            return Promise.resolve(t)
        }

        function xe(e, t) {
            var n = Object(h.k)(t, "unknown", "attach"),
                o = {
                    act: "a_get_media",
                    id: e.messageId,
                    gid: t.gid
                };
            return Object(a.d)(r.b, 3, function(e) {
                return e * e
            })(y, o).then(function(r) {
                return n(), De(e, r, t)
            }).catch(function(n) {
                return Object(h.h)(t, n, "unknown", "server_load_attach"), De(e, null, t)
            })
        }

        function De(e, t, n) {
            var r = n.tabs[e.peerId];
            return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")],
                function(e, t) {
                    var n = t.tabs[e.peerId];
                    return n.history = Object(s.Db)(L(n.history), e, t), Promise.resolve(t)
                }(e, n)
        }

        function Me(e, t, n) {
            var r = Object(s.I)(t),
                o = n.tabs[e];
            return o.searchDay = r, o.searchOffset = 0, o.searchAllLoaded = !1, Promise.resolve(n)
        }

        function Ie(e, t, n) {
            return n.tabs[t].searchText = e, Ve(t, n), n
        }

        function Te(e, t, n) {
            if (t) {
                var r = n.tabs[t];
                r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
            } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
            return Promise.resolve(n)
        }

        function Ce(e, t, n, o, i) {
            return Object(r.b)(y, {
                act: "a_hints",
                str: e,
                gid: o.hidegid ? 0 : i.gid,
                query: n,
                peerIds: t.join(",")
            }).then(function(e) {
                var t = O(e, 3),
                    n = t[0],
                    r = t[1];
                return W(t[2], i), r.forEach(function(e) {
                    return Object(f.a)(i, e)
                }), be(n, i), Object.keys(n).sort(function(e, t) {
                    return n[e].order - n[t].order
                }).map(function(e) {
                    return n[e]
                })
            })
        }

        function Be(e, t, n, r) {
            return Ce(e, t, n, {}, r).then(function(e) {
                return e.map(function(e) {
                    return {
                        peerId: e.peerId,
                        name: e.tab,
                        photo: e.photo,
                        online: e.online,
                        is_friend: "friends" === n
                    }
                })
            })
        }

        function Ae(e) {
            var t = {
                peerId: e[0],
                name: e[1],
                tab: e[1],
                photo: e[2],
                href: e[3],
                online: e[4],
                is_friend: e[5],
                local_index: !0
            };
            return e[6] && (t.data = {
                flags: e[6]
            }), t
        }

        function Le(e) {
            return function(t, n) {
                return e(n).then(function(e) {
                    var r = (t ? e.search(t) : e.list).map(Ae);
                    return n.mapped_index || (n.mapped_index = {}), r.forEach(function(e) {
                        n.mapped_index[e.peerId] = e
                    }), r
                })
            }
        }
        var Re = Le(function(e) {
                return e.topConvTree
            }),
            We = Le(function(e) {
                return e.imTopConvTree
            }),
            Ue = Le(function(e) {
                return e.hintsTree
            });

        function Ke(e, t) {
            var n = void 0,
                o = void 0,
                i = void 0;
            t.topConvTree = new Promise(function(e) {
                n = e
            }), t.hintsTree = new Promise(function(e) {
                o = e
            }), t.imTopConvTree = new Promise(function(e) {
                i = e
            });
            var c = e.select(u.b);
            return Object(a.d)(r.b, 1, function() {
                return 4
            })(y, {
                act: "a_dialogs_preload",
                rs: c.join(","),
                gid: t.gid
            }).catch(function(e) {
                return [
                    [],
                    [],
                    []
                ]
            }).then(function(e) {
                var r = O(e, 4),
                    a = r[0],
                    c = r[1],
                    u = r[2],
                    s = r[3];
                return t.popular_sugg = u, new vkIndexer(a, function(e) {
                    return e[1]
                }, n), new vkIndexer(c, function(e) {
                    return e[1]
                }, o), s && s.length > 0 ? new vkIndexer(s, function(e) {
                    return e[1]
                }, i) : i(), t
            })
        }

        function qe(e) {
            var t = e.active_tab,
                n = void 0;
            return n = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
                return e.tabs[t].lastmsg
            })) : 0, Object(r.b)(y, {
                act: "a_get_dialogs",
                start_message_id: n,
                tab: t,
                gid: e.gid
            }).then(function(n) {
                var r = O(n, 4),
                    o = r[0],
                    i = r[1],
                    a = r[2],
                    c = r[3];
                return a.forEach(function(t) {
                    return Object(f.a)(e, t)
                }), W(c, e), be(i, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(i).map(intval)), e.dialog_tabs_all[t] = !o.has_more, Promise.resolve(e)
            })
        }
        var Se = A(function(e, t) {
            return Object(r.b)(y, {
                act: "a_search",
                q: e,
                from: "all",
                gid: t.gid,
                hash: t.writeHash,
                offset: t.searchOffset || 0
            }).then(function(n) {
                var r = O(n, 5),
                    o = r[0],
                    i = r[1],
                    a = r[2],
                    c = r[3],
                    u = r[4];
                return i.forEach(function(e) {
                    return Object(f.a)(t, e)
                }), Object(s.lb)(t, o), e === t.searchText && (t.searchOffset = c, t.searchAllLoaded = u), Object.keys(o).filter(function(e) {
                    return !t.tabs[e]
                }).forEach(function(e) {
                    t.tabs[e] = o[e]
                }), [o, a]
            })
        });

        function He(e, t) {
            return t.tabs[e].searchAllLoaded
        }

        function Ne(e, t) {
            return !(t.peer !== e || !Object(s.Oa)(t, e)) && t.tabs[e].inplaceSearch
        }

        function Fe(e, t) {
            if (Object(s.Oa)(t, e)) {
                var n = t.tabs[e];
                delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, D({
                    st: ""
                }), M()
            }
            return Promise.resolve(t)
        }

        function ze(e, t) {
            if (Object(s.Oa)(t, e)) {
                var n = t.tabs[e];
                delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
            }
            return Promise.resolve(t)
        }

        function Ve(e, t) {
            return t.tabs[e].inplaceSearch = !0, Promise.resolve(t)
        }
        var Ge = A(function(e, t) {
            var n = t.tabs[e],
                o = "";
            if (Ve(e, t), n.searchDay && (o = "day:" + n.searchDay), !o && !n.searchText) return Promise.reject();
            var i = "in:" + e + " " + o + " " + (n.searchText || "");
            return D({
                st: n.searchText
            }), M(), Object(r.b)(y, {
                act: "a_search",
                q: i,
                from: "in",
                gid: t.gid,
                hash: t.writeHash,
                offset: n.searchOffset || 0
            }).then(function(e) {
                var t = O(e, 3),
                    r = t[0],
                    o = t[1],
                    i = t[2];
                return n.searchOffset = o, n.searchAllLoaded = i, r
            })
        });

        function Qe(e) {
            return Object(r.b)(y, {
                act: "a_important",
                offset: e,
                part: e > 0
            })
        }

        function Je(e, t) {
            var n = Object(d.t)(e, t);
            return Object(r.b)(y, {
                act: "a_load_lastmsg",
                peerId: t,
                gid: e.get().gid
            }).then(function(r) {
                var o = O(r, 2),
                    i = o[0],
                    a = o[1];
                n.lastmsg = i[0] || !1, n.lastmsg_meta = i;
                var c = O(a, 3);
                n.unread = c[0], n.in_up_to = c[1], n.out_up_to = c[2], n.unread || (e.get().dialog_tabs[_.m] = e.get().dialog_tabs[_.m].filter(function(e) {
                    return e != t
                })), ne(e.get(), n, !1, oe.bind(null, t), Nt.bind(null, e.get()))
            })
        }

        function Xe(e, t, n) {
            if (Object(s.Oa)(n, t)) {
                var r = n.tabs[t];
                r.deleted = r.deleted ? r.deleted.concat(e) : e
            }
            return Promise.resolve(n)
        }

        function Ze(e, t, n) {
            if (Object(s.Oa)(n, t)) {
                var r = n.tabs[t];
                r.history = Object(s.mb)(e, L(r.history)), r.offset -= e.filter(function(e) {
                    return r.msgs[e]
                }).length, e.forEach(function(e) {
                    return delete r.msgs[e]
                }), e.forEach(function(e) {
                    var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
                })
            }
            return Promise.resolve(n)
        }
        var Ye = A(function(e, t, n, o, i) {
            return Object(r.b)(y, {
                act: "a_mark",
                peer: t,
                hash: n || i.tabs[t].hash,
                gid: i.gid,
                msgs_ids: e.join(","),
                mark: o
            })
        });

        function $e(e, t, n, r) {
            if (Object(s.Oa)(r, t)) {
                var o = r.tabs[t];
                o.deleted = o.deleted ? o.deleted.concat(e) : e, o.history = Object(s.nb)(e, t, n, L(o.history)), o.offset -= e.filter(function(e) {
                    return o.msgs[e]
                }).length
            }
            return Promise.resolve(r)
        }

        function et(e, t, n) {
            if (Object(s.Oa)(n, t)) {
                var r = n.tabs[t];
                r.deleted && (r.deleted = r.deleted.filter(function(t) {
                    return t !== e
                })), r.history = Object(s.Gb)(e, t, L(r.history)), r.offset++
            }
            return Promise.resolve(n)
        }

        function tt(e, t, n, o) {
            return Object(r.b)(y, {
                act: "a_restore",
                id: e,
                peer: t,
                hash: n,
                gid: o
            })
        }
        var nt = A(function(e, t, n) {
                return Object(s.fc)(n.tabs[e]) ? Promise.resolve(n) : (n.tabs[e].lastTyping = Date.now(), Object(r.b)(y, {
                    act: "a_activity",
                    type: t,
                    peer: e,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(function() {
                    return n
                }, function() {
                    return n
                }))
            }),
            rt = A(function(e, t) {
                return Object(r.b)(y, {
                    act: "a_accept_message_request",
                    user_id: e,
                    hash: t.tabs[e].hash
                }).then(function() {
                    t.tabs[e].is_message_request = !1
                }).then(function() {
                    return t
                })
            }),
            ot = A(function(e, t) {
                return Object(r.b)(y, {
                    act: "a_reject_message_request",
                    user_id: e,
                    hash: t.tabs[e].hash
                }).then(function() {
                    return ne(t, t.tabs[e], !0, function(t) {
                        return t.filter(function(t) {
                            return t !== e
                        })
                    }), $t(t.tabbedPeers.filter(function(t) {
                        return t.peer !== e
                    }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null, t
                })
            }),
            it = A(function(e, t) {
                return nt(e, k, t)
            }),
            at = A(function(e, t) {
                return nt(e, P, t)
            });

        function ct(e, t, n, r) {
            return t && (r.pendingForward = null, e || (e = {
                msgIds: []
            }), t.addAttach(n ? "reply" : "mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(r)
        }

        function ut(e, t) {
            return t.pendingForward = e, Promise.resolve(t)
        }

        function st(e, t, n) {
            if (Object(s.bb)(n, e)) {
                n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, ne(n, n.tabs[e], !0, function(t) {
                    return t.filter(function(t) {
                        return t !== e
                    })
                }), n.tabs[e].unread > 0 && ue(n, -1, e);
                var r = n.tabs[e];
                return r.deletedDialog = !0, $t(n.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, n), t.then(function(t) {
                    var o = O(t, 2);
                    o[0], o[1];
                    return delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
                })
            }
        }
        var _t = A(function(e, t) {
                return st(e, Object(r.b)("al_im.php", {
                    act: "a_flush_history",
                    id: e,
                    from: "im",
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }), t)
            }),
            dt = A(function(e, t, n) {
                return Object(r.b)(y, {
                    act: "a_set_chat_title",
                    peer: e,
                    new_title: t,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(function() {
                    return n
                })
            }),
            lt = A(function(e, t) {
                return Object(r.b)(y, {
                    act: "a_load_chat_info",
                    peer: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(n) {
                    var r = O(n, 1)[0];
                    return t.tabs[e] = extend(t.tabs[e], r), t
                })
            });
        var ft = A(function(e, t, n) {
            return Object(r.b)(y, {
                act: "a_add_chat_members",
                peer: e,
                new_peer: t.join(","),
                gid: n.gid,
                hash: n.tabs[e].hash
            }).then(function(e) {
                return n
            })
        });

        function bt(e, t) {
            if (isEmpty(e)) return Promise.resolve(t);
            var n = Object.keys(e).map(function(t) {
                return t + ":" + e[t].join(",")
            }).join(";");
            return Object(r.b)(y, {
                act: "a_load_member",
                need: n
            }).then(function(e) {
                return O(e, 1)[0].forEach(function(e) {
                    return Object(f.a)(t, e)
                }), t
            })
        }

        function mt(e, t, n) {
            var r = {},
                o = n.get();

            function a(e, t) {
                Object(s.Ha)(e) && t && !Object(f.b)(o, t) && (r[e] ? -1 === r[e].indexOf(t) && r[e].push(t) : r[e] = [t])
            }
            var c = t.filter(function(e) {
                return !Object(s.bb)(o, e.peerId)
            }).map(function(e) {
                return e.peerId
            });
            t.forEach(function(e) {
                a(e.peerId, e.userId)
            }), e.forEach(function(e) {
                a(e.peerId, +e.kludges.source_mid)
            });
            var u = t.filter(function(e) {
                return e.flags & i.m && !e.local
            }).map(function(e) {
                return e.kludges.from_admin
            }).filter(function(e) {
                return e && !o.admins[e]
            });
            return 0 === Object.keys(r).length && 0 === u.length && 0 === c.length ? Promise.resolve(o) : {
                shouldLoad: Object.keys(r).length > 0 || u.length > 0 || c.length > 0,
                needMembers: r,
                needAdminIds: u,
                needPeers: c
            }
        }

        function pt(e, t, n) {
            var o = e.needMembers,
                i = e.needAdminIds,
                a = e.needPeers;
            return t.pause(), Promise.all([bt(o, n), function(e, t) {
                return 0 === e.length ? Promise.resolve(t) : Object(r.b)(y, {
                    act: "a_get_admin",
                    admins: e.join(","),
                    gid: t.gid
                }).then(function(e) {
                    var n = O(e, 1)[0];
                    return t.admins = extend(t.admins, n), t
                })
            }(i, n), Promise.all(a.map(function(e) {
                return U(e, 0, 0, 0, n)
            }))]).catch(function() {
                return n
            }).then(function() {
                return t.resume()
            }).then(function() {
                return n
            })
        }
        var ht = A(function(e, t) {
            return e.kludges.source_act === s.d ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : Object(r.b)(y, {
                act: "a_get_chat_photo",
                msg_id: e.messageId
            }).then(function(n) {
                var r = O(n, 2),
                    o = r[0],
                    i = r[1];
                t.chat_photo_msg = i;
                var a = t.tabs[e.peerId];
                if (t.tabs[e.peerId].photo = o[0], t.tabs[e.peerId].photoLarge = o[1], Object(s.Oa)(t, e.peerId)) {
                    var c = e.kludges.source_act;
                    a.history = Object(s.w)(e, c, t, L(a.history))
                }
                return t
            })
        });

        function gt(e, t, n, r) {
            return t !== vk.id ? Promise.resolve(r) : (Object(s.bb)(r, n) && r.peer == n && (r = G(r)), Promise.resolve(r))
        }
        var vt = A(function(e, t) {
                return Object(r.b)(y, {
                    act: "a_leave_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(gt.bind(null, s.c, vk.id, e, t))
            }),
            Ot = A(function(e, t) {
                return Object(r.b)(y, {
                    act: "a_return_to_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(gt.bind(null, s.b, vk.id, e, t))
            }),
            jt = A(function(e, t, n) {
                return Object(r.b)(y, {
                    act: "a_mute",
                    peer: e,
                    hash: n.tabs[e].hash,
                    gid: n.gid,
                    value: t ? 1 : 0
                }).then(function() {
                    var r = t ? "mute" : "unmute";
                    return window.Notifier && Notifier.lcSend("im", {
                        act: r,
                        peer: e
                    }), n
                }).then(Et.bind(null, e, t))
            });

        function Et(e, t, n) {
            var r = n.mutedPeers.filter(function(t) {
                return t !== e
            });
            return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, G(n)
        }

        function yt(e, t) {
            return t.stack = e, Promise.resolve(t)
        }
        var wt = A(function(e, t, n, o) {
            return kt(e, n, t, o), Object(r.b)(y, {
                act: "a_mark_important",
                ids: e,
                val: t ? 1 : 0,
                from: "im",
                gid: o.gid,
                peer: n,
                hash: o.tabs[n].hash
            }).then(function() {
                return o
            })
        });

        function kt(e, t, n, r) {
            if (Object(s.Oa)(r, t)) {
                var o = r.tabs[t];
                e.filter(function(e) {
                    return o.msgs[e]
                }).forEach(function(e) {
                    var a = Object(d.m)(r, t, e),
                        c = n ? a.flags | i.l : a.flags & ~i.l;
                    a.flags = c, o.msgs[e] = a, o.history = Object(s.kc)(e, n, L(o.history))
                })
            }
            return Promise.resolve(r)
        }

        function Pt(e, t, n) {
            return n.importants || (n.importants = {}), (n.importants[t] || 0) !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
        }

        function xt(e, t) {
            return Object(r.b)(y, {
                act: "a_spam",
                offset: e,
                gid: t,
                part: e > 0
            })
        }

        function Dt(e, t) {
            return Object(r.b)(y, {
                act: "a_flush_spam",
                gid: t,
                hash: e
            })
        }

        function Mt(e, t, n) {
            return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
        }

        function It(e, t) {
            return Object(r.b)(y, {
                act: "a_owner_photo",
                photo: JSON.parse(e).data[0],
                peer: t
            })
        }

        function Tt(e, t) {
            return t.next_chat_avatar = e, Promise.resolve(t)
        }
        var Ct = A(function(e, t, n, o) {
            return o.creating = !0, o.longpoll.pause(), Object(r.b)(y, {
                act: "a_multi_start",
                hash: o.writeHash,
                peers: t.join(","),
                title: n
            }).then(function(e) {
                var t = O(e, 1)[0];
                return o.next_peer = t.peerId, o.tabs[t.peerId] = t, ne(o, t, !1, function(e) {
                    return [t.peerId].concat(e)
                }), o.longpoll.resume(), o
            }).then(function(t) {
                return e ? function(e, t, n) {
                    return Object(r.b)("al_page.php", {
                        act: "owner_photo_save",
                        peer: e,
                        _query: t
                    }).then(function(e) {
                        return n
                    })
                }(t.next_peer, e, t) : t
            }).then(function(e) {
                return e.creating = !1, e
            }).catch(function(e) {
                throw o.creating = !1, o.longpoll.resume(), e
            })
        });

        function Bt(e) {
            var t = void 0;
            e.resync_in_process = new Promise(function(e) {
                t = e
            });
            var n = Object.keys(e.tabs).length,
                o = e.active_tab;
            return Object(r.b)(y, {
                act: "a_resync",
                sel: e.peer,
                gid: e.gid,
                loaded: n,
                tab: o,
                add_peers: e.tabbedPeers.map(function(e) {
                    return e.peer
                }).join(",")
            }).then(function(n) {
                var r = O(n, 5),
                    i = r[0],
                    a = r[1],
                    u = r[2],
                    d = r[3],
                    l = r[4];
                a.forEach(function(t) {
                    return Object(f.a)(e, t)
                }), Object(s.lb)(e, i), u.user_unread && handlePageCount("msg", u.user_unread), Object(c.i)("Resync success", "success");
                var b = e.peer,
                    m = void 0;
                if (Object(s.Ya)(b)) m = Promise.resolve(!1);
                else {
                    var p = {
                        tabs: j({}, b, e.tabs[b]),
                        oCache: {}
                    };
                    m = be(j({}, b, i[b]), p)
                }
                return m.then(function(n) {
                    e.tabs = i, e.admins = extend(e.admins, d), n && (e.tabs[b] = n.tabs[b], e.tabs[b].history = Object(s.Hb)(b, e, L(e.tabs[b].history))), e.loadingDialogs = !1, e.mutedPeers = u.mutedPeers, e.lastDialogsOptions = {
                        has_more: u.has_more
                    }, e.dialog_tab_cts = u.folder_cts, e.dialog_tabs[o] = l.map(intval);
                    var r = e.dialog_tabs[o].map(function(t) {
                        return e.tabs[t]
                    });
                    return Object.keys(e.dialog_tabs).filter(function(e) {
                        return e != o
                    }).forEach(function(t) {
                        o == _.h ? e.dialog_tabs[t] = r.filter(St(t)).map(function(e) {
                            return e.peerId
                        }) : e.dialog_tabs[t] = []
                    }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), Wt(intval(u.unread), e)
                })
            }).catch(function(t) {
                return Object(c.i)("Resync error: " + t.message + " " + t.stack, "error"), Object(a.c)(2).then(Bt.bind(null, e))
            })
        }

        function At(e, t) {
            return t.lockedSending = e, Promise.resolve(t)
        }

        function Lt(e, t, n) {
            return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
        }

        function Rt(e) {
            return !!e.textMediaSelector.urlAttachmentLoading || !!(window.Upload && Upload.options && Upload.isSomethingUploading) && Object.keys(Upload.options).filter(function(e) {
                return Upload.isSomethingUploading(e)
            }).length > 0
        }

        function Wt(e, t) {
            return t.unread_cnt = e, t.dialog_tab_cts[_.m] = e, Promise.resolve(t)
        }

        function Ut(e, t) {
            return t.ctrl_submit = !!e, Object(r.b)(y, {
                act: "a_save_ctrl_submit",
                to: t.peer,
                hash: t.tabs[t.peer].hash,
                value: e ? 1 : 0
            }).then(function(e) {
                return t
            })
        }

        function Kt(e, t, n) {
            n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
            var r = document.title,
                o = window.devicePixelRatio >= 2 ? "_2x" : "";
            if (t && !n.update_title_to) {
                var i = function(e, t, n) {
                    return function() {
                        n.update_old_title = e;
                        var r = Object.keys(n.cur_unread_cnt).length;
                        if (0 === r) return Object(g.Oa)(e || document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
                        e ? (Object(g.Oa)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1) : (e = document.title, setFavIcon("/images/icons/favicons/fav_im" + (r > 9 ? 10 : r) + t + ".ico"), Object(g.Oa)(winToUtf(getLang("mail_im_new_messages", r))))
                    }
                }(r, o, n);
                n.update_title_to = setInterval(i, 1e3), i()
            } else !t && n.update_old_title && (Object(g.Oa)(n.update_old_title), n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + o + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
            return Promise.resolve(n)
        }

        function qt(e, t, n, r, o) {
            return Object(s.Oa)(o, e) && (o.tabs[e].scrollTop = intval(t), o.tabs[e].scrollBottom = intval(n), o.tabs[e].contHeight = intval(r)), Promise.resolve(o)
        }

        function St(e) {
            return e === _.h ? function(e) {
                return !Object(s.fc)(e)
            } : e === _.m ? function(e) {
                return e.unread > 0
            } : function(t) {
                return t.folders & _.j[e]
            }
        }

        function Ht(e, t) {
            t.active_tab = e, Object(o.b)({
                tab: e === _.h ? null : e
            });
            var n = [];
            if (e !== _.h && !Object(s.Za)(t)) {
                var r = t.dialog_tabs[e];
                n = t.dialog_tabs[_.h].map(function(e) {
                    return t.tabs[e]
                }).filter(St(e)).map(function(e) {
                    return e.peerId
                }), t.dialog_tabs[e] = r.length >= n.length ? r : n
            }
            return Promise.resolve(t)
        }

        function Nt(e, t, n, r) {
            var o = e.dialog_tabs_all;
            return !(!o[_.h] && !o[t]) || (n.filter(function(e) {
                return e === r.peerId
            }).length > 0 || ("r" === r.lastmsg[0] || n.map(function(t) {
                return e.tabs[t.toString()]
            }).filter(function(t) {
                return Object(s.Za)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
            }).length > 0))
        }

        function Ft(e, t, n, r, o) {
            if (Object(s.bb)(o, e)) {
                var a = o.tabs[e];
                return n === i.L && (t ^= a.folders),
                    function(e, t, n) {
                        return !(e === i.T && n.folders & t || !(e !== i.P || n.folders & t))
                    }(n, t, a) && Object.keys(_.j).filter(function(e) {
                        return _.j[e] & t
                    }).forEach(function(e) {
                        o.dialog_tab_cts[e] += function(e, t, n) {
                            return t !== i.P || e.folders & _.j[n] ? t === i.L ? e.folders & _.j[n] ? -1 : 1 : t === i.T ? 1 : -1 : 0
                        }(a, n, e)
                    }), n === i.T ? o.tabs[e].folders |= t : n === i.P ? o.tabs[e].folders &= ~t : o.tabs[e].folders = t ^= a.folders, ne(o, o.tabs[e], !0, function(t, n) {
                        return t.concat([e]).map(function(e) {
                            return o.tabs[e]
                        }).filter(St(n)).map(function(e) {
                            return e.peerId
                        })
                    }, Nt.bind(null, o)), Promise.resolve(o)
            }
            return U(e, 0, 0, 0, o).then(Ft.bind(null, e, t, n, o))
        }
        var zt = A(function(e, t) {
                var n = _.j[_.i],
                    o = t.tabs[e].folders & n,
                    a = o ? i.Ya : i.cb;
                return t.longpoll.push([a([0, e, n, !0])]), Object(r.b)(y, {
                    act: "a_dialog_star",
                    val: o ? 0 : 1,
                    peer: e,
                    hash: t.tabs[e].hash,
                    gid: t.gid
                }).then(function() {
                    return t
                })
            }),
            Vt = A(function(e, t, n) {
                var o = _.j[_.n];
                return n.longpoll.push([i.Ya([0, e, o, !0]), i.Pa([6, e, t])]), Object(r.b)(y, {
                    act: "a_mark_answered",
                    peer: e,
                    lastmsg: t,
                    hash: n.tabs[e].hash,
                    gid: n.gid
                }).then(function() {
                    return n
                })
            });

        function Gt(e) {
            return Object(r.b)(y, {
                act: "a_get_mutex_key",
                gid: e
            })
        }

        function Qt(e, t) {
            return W(j({}, e, {
                free: !0
            }), t), Object(r.b)(y, {
                act: "a_block_release",
                peer: e,
                gid: t.gid
            }).then(function() {
                return t
            })
        }

        function Jt(e, t) {
            var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
            return e && (n ^= 1), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
        }
        var Xt = A(function(e, t) {
            return ne(t, t.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), t.tabs[e].deletedDialog = !0, Object(r.b)(y, {
                act: "a_delete_dialog",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(n) {
                return n[0] ? ($t(t.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, ne(t, t.tabs[e], !1, oe.bind(null, e), Nt.bind(null, t))), n
            })
        });

        function Zt(e, t, n, o) {
            return Object(r.b)(y, {
                act: "a_restore_dialog",
                hash: t,
                gid: o.gid,
                spam: n ? 1 : 0,
                peer: e
            }).then(function(t) {
                return o.tabs[e].deletedDialog = !1, ne(o, o.tabs[e], !1, function(t) {
                    return [e].concat(t)
                }), o.tabs[e].unread = t, o
            })
        }

        function Yt(e, t, n) {
            return Object(r.b)(y, {
                act: "a_spam_dialog",
                peer: e,
                gid: n.gid,
                hash: t
            })
        }

        function $t(e, t, n) {
            return n.tabbedPeers = e, Object(s.Ia)(n) && (D({
                peers: n.tabbedPeers.filter(function(e) {
                    var t = e.peer,
                        r = e.type;
                    return t !== n.peer && "perm" === r
                }).map(function(e) {
                    return Object(s.R)(e.peer, n)
                }).filter(function(e) {
                    return !e.deletedDialog
                }).map(function(e) {
                    return e.peerId
                }).map(s.H).join("_")
            }), t && M()), Promise.resolve(n)
        }

        function en(e) {
            return !e.peer || (Ne(e.peer, e) ? He(e.peer, e) : !!Object(s.Oa)(e, e.peer) && e.tabs[e.peer].allShown)
        }

        function tn(e, t) {
            var n = t.tabs[e];
            return Object(s.Oa)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
        }

        function nn(e, t) {
            var n = t.tabs[e];
            return Object(s.Oa)(t, e) && (n.history = R(n.history)), Promise.resolve(t)
        }

        function rn(e, t) {
            return t.go_to_end_visible = e, Promise.resolve(t)
        }

        function on(e, t, n) {
            if (!Object(s.Ka)(t)) return Promise.resolve(n);
            var o = Object(d.t)(n, t);
            return o.blocked_community = !e, Object(r.b)(y, {
                act: "a_toggle_community",
                peer_id: t,
                hash: o.hash,
                state: e ? 1 : 0
            }).then(function() {
                return G(n)
            })
        }

        function an(e, t) {
            if (0 !== t.peer && Object(s.Oa)(t, t.peer)) {
                var n = Object(d.t)(t, t.peer);
                n.history = L(n.history), e(n.history)
            }
            return Promise.resolve(t)
        }

        function cn(e) {
            return e.audio_msg.isRecording = !1, Promise.resolve(e)
        }

        function un(e, t) {
            return t.voice_message_available = e, Promise.resolve(t)
        }

        function sn(e) {
            D({
                act: e ? "create" : null
            }), M()
        }

        function _n() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            D({
                q: e
            }), M()
        }

        function dn(e) {
            return void 0 === e.chatResizeInitialized && (e.chatResizeInitialized = !0, Object(s.U)() > window.clientHeight() && Object(s.Jb)(0)), Promise.resolve(e)
        }
        var ln = A(function(e, t, n) {
            return Object(r.b)(y, {
                act: "a_join_chat",
                chat_id: e,
                hash: t,
                write_hash: n.writeHash
            }).then(function(e) {
                var t = O(e, 4),
                    r = t[0],
                    o = t[1],
                    i = t[2],
                    a = t[3];
                return i.forEach(function(e) {
                    return Object(f.a)(n, e)
                }), n.tabs[r] = o, ne(n, o, !1, oe.bind(null, r), Nt.bind(null, n)), n.admins = extend(n.admins, a), [r]
            })
        });

        function fn(e, t) {
            return Object(r.b)(y, {
                act: "a_get_link",
                gid: t.gid,
                chat_id: e
            })
        }
        var bn = A(function(e, t) {
            var n = t.tabs[e];
            return Object(r.b)(y, {
                act: "a_reset_link",
                chat_id: e - 2e9,
                write_hash: t.writeHash
            }).then(function(e) {
                return n.inviteLink = e[0], e
            })
        });

        function mn(e) {
            return I({
                invite_chat_id: null,
                invite_hash: null
            }), e.invitation = void 0, Promise.resolve(e)
        }

        function pn(e, t) {
            var n = Object(c.a)([e].concat(t.select(u.b))).slice(0, 500);
            t.update(u.b, n)
        }

        function hn(e) {
            e.update(u.b, [])
        }

        function gn(e, t) {
            var n = t.select(u.b).filter(function(t) {
                return t !== e
            });
            return t.update(u.b, n), n
        }

        function vn(e, t, n) {
            var r = n.tabs[t],
                o = Object(d.m)(n, t, e);
            return r.data.kicked || r.data.closed || o.kludges.source_act || (r.pinned = o), Promise.resolve(n)
        }

        function On(e, t) {
            return t.tabs[e].pinned = null, Promise.resolve(t)
        }
        var jn = A(function(e, t, n) {
                var o = n.tabs[t];
                return o.data.kicked || o.data.closed ? Promise.resolve(n) : Object(r.b)(y, {
                    act: "a_pin_message",
                    msgid: e,
                    chat: t,
                    gid: n.gid,
                    hash: n.tabs[t].hash
                }).then(function(e) {
                    var r = O(e, 1)[0];
                    return n.tabs[t] = Object.assign({}, o, r), n
                })
            }),
            En = A(function(e, t) {
                var n = t.tabs[e];
                return n.data.kicked || n.data.closed ? Promise.resolve(t) : Object(r.b)(y, {
                    act: "a_unpin_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(r) {
                    var o = O(r, 1)[0];
                    return t.tabs[e] = Object.assign({}, n, o), t
                })
            }),
            yn = A(function(e, t) {
                var n = t.tabs[e];
                return Object(r.b)(y, {
                    act: "a_get_pinned_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(e) {
                    var r = O(e, 1)[0];
                    return n.pinned = r || null, t
                })
            }),
            wn = A(function(e, t, n) {
                var o = n.tabs[e];
                return Object(r.b)(y, {
                    act: "a_get_message_local_id",
                    chat: e,
                    chat_local_id: t,
                    hash: o.hash
                })
            }),
            kn = A(function(e, t) {
                var n = t.tabs[e];
                return n.membersLoaded ? Promise.resolve(t) : Object(r.b)(y, {
                    act: "a_get_chat_members",
                    chat: e,
                    gid: t.gid,
                    hash: n.hash
                }).then(function(e) {
                    var r = O(e, 1),
                        o = O(r[0], 3),
                        i = o[0],
                        a = o[1],
                        c = o[2];
                    return n.memberIds = i, n.adminIds = a, c.forEach(function(e) {
                        return Object(f.a)(t, e)
                    }), n.membersLoaded = !0, t
                })
            }),
            Pn = A(function(e, t) {
                return Promise.all([kn(e, t), function(e, t) {
                    var n = t.tabs[e];
                    return Object(r.b)(y, {
                        act: "a_get_chat_details",
                        chat: e,
                        gid: t.gid,
                        hash: n.hash
                    }).then(function(e) {
                        var r = O(e, 1)[0];
                        return n.photoGrid = r.grid, n.photoLarge = r.photo, n.membersLastSeen = r.lastSeen || null, n.inviters = r.inviters, n.caccess = r.caccess, n.invitedByMe = r.invitedByMe || [], n.inviteLink = r.link || null, n.serverSettings = r.serverSettings || null, t
                    })
                }(e, t)]).then(function() {
                    return t
                })
            }),
            xn = A(function(e, t, n) {
                var o = n.tabs[e];
                return Object(r.b)(y, {
                    act: "a_update_flags",
                    chat: e,
                    hash: o.hash,
                    flags: t
                })
            }),
            Dn = A(function(e, t) {
                var n = t.tabs[e];
                return Object(r.b)("al_page.php", {
                    act: "owner_photo_remove",
                    oid: e,
                    gid: t.gid,
                    hash: n.photoHash
                }).then(function() {
                    return n.photo = null, n.photoLarge = null, t
                })
            });

        function Mn(e, t, n) {
            var r = n.tabs[e];
            return r.memberIds = r.memberIds.filter(function(e) {
                return e !== t
            }), r.adminIds = r.adminIds.filter(function(e) {
                return e !== t
            }), r.membersCount = r.memberIds.length, Promise.resolve(n)
        }
        var In = A(function(e, t, n) {
            var o = n.tabs[e];
            return Object(r.b)(y, {
                act: "a_kick_user",
                chat: e,
                hash: o.hash,
                mid: t
            }).then(function() {
                return o.memberIds = o.memberIds.filter(function(e) {
                    return e !== t
                }), o.adminIds = o.adminIds.filter(function(e) {
                    return e !== t
                }), o.membersCount = o.memberIds.length, n
            })
        });

        function Tn(e, t, n, r) {
            var o = r.tabs[e];
            return o.adminIds = n ? [].concat(o.adminIds, t).filter(function(e, t, n) {
                return n.indexOf(e) === t
            }) : o.adminIds.filter(function(e) {
                return e !== t
            }), Promise.resolve(r)
        }
        var Cn = A(function(e, t, n, o) {
            var i = o.tabs[e];
            return Object(r.b)(y, {
                act: "a_toggle_admin",
                chat: e,
                hash: i.hash,
                mid: t,
                is_admin: +n
            }).then(function() {
                return Tn(e, t, n, o)
            })
        });

        function Bn(e, t, n, r) {
            var o = Object(d.m)(e, n, t).userId;
            return Object(f.c)(r, o) ? Promise.resolve(r) : bt(j({}, n, [o]), r)
        }

        function An() {
            ajax.post("al_im.php", {
                act: "a_hide_promo_tooltip"
            })
        }

        function Ln() {
            cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
        }
        var Rn = A(function(e, t) {
                return t.tabs[e].top_banner = void 0, Object(r.b)(y, {
                    act: "a_hide_banner",
                    peer_id: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function() {
                    return t
                })
            }),
            Wn = A(function(e, t, n) {
                n.tabs[e].top_banner = void 0;
                var o = n.tabs[e];
                return Object(r.b)(y, {
                    act: "a_callback_banner",
                    peer_id: e,
                    callback_data: t,
                    hash: o.hash
                }).then(function() {
                    return n
                })
            });

        function Un(e, t) {
            return Object(r.b)(y, {
                act: "a_load_banner",
                peer_id: e,
                gid: t.gid
            }).then(function(n) {
                var r = O(n, 1)[0];
                return t.tabs[e].top_banner = r, t
            })
        }

        function Kn(e, t, n) {
            return n.tabs[e].keyboard = t && t.buttons ? t : null, Sn(e, !1, !0, n)
        }

        function qn(e, t) {
            return Kn(e, null, t)
        }

        function Sn(e, t, n, r) {
            return ((r.tabs || {})[e] || {}).keyboard && (r.tabs[e].keyboard.hide = t, n && ls.set("is_keyboards_hide", Object.assign(ls.get("is_keyboards_hide") || {}, j({}, e, t)))), Promise.resolve(r)
        }
        var Hn = A(function(e, t) {
            var n = t.tabs[e];
            return Object(r.b)(y, {
                act: "a_get_keyboard",
                peer_id: e,
                hash: n.hash
            }).then(function(n) {
                var r = O(n, 1)[0];
                return Kn(e, r, t)
            })
        });

        function Nn(e, t, n, o) {
            var i = o.tabs[e];
            return i.caccess[t] = n, Object(r.b)(y, {
                act: "a_change_caccess",
                peer_id: e,
                member_id: t,
                hash: i.hash,
                access: n ? 1 : 0
            }).then(function() {
                return o
            }).catch(function(e) {
                throw i.caccess[t] = !n, e
            })
        }
        var Fn = A(function(e, t) {
            var n = t.tabs[t.peer];
            return Object(r.b)(y, {
                act: "a_delete_template",
                template_id: e,
                hash: n.hash,
                gid: t.gid,
                peer_id: t.peer
            }).then(function() {
                var n = t.templates.find(function(t) {
                    return t.id === e
                });
                return n && (n.deleted = !0), t
            })
        });

        function zn(e, t, n) {
            var o = n.tabs[n.peer];
            return Object(r.b)(y, {
                act: "a_create_template",
                hash: o.hash,
                gid: n.gid,
                peer_id: n.peer,
                name: e,
                text: t
            }).then(function(e) {
                return n.templates.unshift(e[0]), n
            })
        }

        function Vn(e, t, n, o) {
            var i = o.tabs[o.peer];
            return Object(r.b)(y, {
                act: "a_update_template",
                template_id: e,
                hash: i.hash,
                gid: o.gid,
                peer_id: o.peer,
                group_id: o.gid,
                name: t,
                text: n
            }).then(function(t) {
                var n = o.templates.find(function(t) {
                    return t.id === e
                });
                return n && Object.assign(n, t[0]), o
            })
        }

        function Gn(e, t) {
            if (Object(s.Oa)(t, e)) {
                var n = Object(d.t)(t, e);
                n.allShown = !1, n.lastReset = Date.now()
            }
            return t
        }
    },
    "wSs/": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return u
        }), n.d(t, "b", function() {
            return s
        }), n.d(t, "c", function() {
            return _
        }), n.d(t, "e", function() {
            return d
        }), n.d(t, "d", function() {
            return l
        });
        var r = n("rHUl"),
            o = n("MhhX"),
            i = n("P13b"),
            a = n("eTng"),
            c = n("aong");

        function u(e, t) {
            t = Object(r.P)(t);
            var n = vk.id == t.peerId && !Object(c.r)(e).gid;
            return 333 != t.peerId && (!(!n && !Object(o.k)(t)) && (!Object(o.l)(t) && (!(Date.now() / 1e3 - t.date > 86400) && (!(Object(o.f)(t) || Object(o.m)(t) || Object(o.d)(t) || Object(o.g)(t) || Object(o.i)(t) || Object(o.o)(t)) && !Object(i.Fa)(e, t.peerId, t.messageId)))))
        }

        function s(e) {
            var t = document.createElement("div");
            return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, function() {
                var e = arguments.length <= 1 ? void 0 : arguments[1],
                    t = arguments.length <= 3 ? void 0 : arguments[3];
                return /^\@/.test(t) ? t : "@" + e + " (" + t + ")"
            }), t.innerHTML = e, Emoji.val(t)
        }

        function _(e, t) {
            return +(t && t.msgs ? Object.keys(t.msgs) : []).filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return t - e
            }).find(function(n) {
                return u(e, t.msgs[n])
            }) || null
        }

        function d(e, t, n) {
            var r = Object(a.a)(t.kludges, t.messageId),
                o = n.dData.attaches;
            if (s(t.text) !== n.dData.txt || r.length !== o.length) return !0;
            for (var i = r.length; i--;) {
                var c = r[i],
                    u = o[i];
                if (c.id != u.id || c.type != u.type || "poll" == c.type && u.object && u.object.poll_is_edited) return !0
            }
            return !1
        }

        function l(e, t, n, r, o, a) {
            t.origText = n, t.text = Object(i.Fb)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = o, t.cancelled_shares = a, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
        }
    }
});