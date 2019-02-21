! function(e) {
    function t(t) {
        for (var o, a, _ = t[0], r = t[1], c = t[2], l = 0, u = []; l < _.length; l++) a = _[l], s[a] && u.push(s[a][0]), s[a] = 0;
        for (o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
        for (d && d(t); u.length;) u.shift()();
        return i.push.apply(i, c || []), n()
    }

    function n() {
        for (var e, t = 0; t < i.length; t++) {
            for (var n = i[t], o = !0, _ = 1; _ < n.length; _++) {
                var r = n[_];
                0 !== s[r] && (o = !1)
            }
            o && (i.splice(t--, 1), e = a(a.s = n[0]))
        }
        return e
    }
    var o = {},
        s = {
            "web/ads_edit_easy": 0
        },
        i = [];

    function a(t) {
        if (o[t]) return o[t].exports;
        var n = o[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, a), n.l = !0, n.exports
    }
    a.m = e, a.c = o, a.d = function(e, t, n) {
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
            for (var o in e) a.d(n, o, function(t) {
                return e[t]
            }.bind(null, o));
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
    var _ = window.webpackJsonp = window.webpackJsonp || [],
        r = _.push.bind(_);
    _.push = t, _ = _.slice();
    for (var c = 0; c < _.length; c++) t(_[c]);
    var d = r;
    i.push([45, "7f81047508570d6456c7d33e2e3c0bc3", "b459a6fdd4abe926f4e4ca100471ca63", "075e72e66ff59d27b023e4956acea75e"]), n()
}({
    "0DAA": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o
        });
        var o = {
            checkVersion: function() {
                return void 0 !== window.localStorage && void 0 !== window.JSON
            },
            set: function(e, t) {
                this.remove(e);
                try {
                    return !!o.checkVersion() && localStorage.setItem(e, JSON.stringify(t))
                } catch (e) {
                    return !1
                }
            },
            get: function(e) {
                if (!o.checkVersion()) return !1;
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
    },
    45: function(e, t, n) {
        e.exports = n("x625")
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

            function _addButton(e, t, n, o) {
                var s = "flat_button";
                "no" === n || "gray" === n ? (s += " secondary", n = "cancel") : n = "ok";
                var i = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.e)("button", {
                    className: s,
                    innerHTML: e,
                    id: o
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
                        var o = !0 === e ? 0 : options.animSpeed;
                        options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(document, "click", boxQueue.hideBGClick), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onBeforeHide) && options.onBeforeHide();
                        var s = function() {
                            boxQueue.currHiding === _message_boxes[guid] && (boxQueue.currHiding = !1), _message_boxes[guid].shOther || e || layers.boxhide(), !t && options.selfDestruct ? destroyMe() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxContainer), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onHide) && options.onHide(n)
                        };
                        o > 0 ? (boxQueue.currHiding = _message_boxes[guid], Object(_fx__WEBPACK_IMPORTED_MODULE_5__.f)(boxContainer, o, s)) : s()
                    }
                };

            function showMe(e, t, n) {
                if (!visible && window._message_boxes[guid]) {
                    visible = !0;
                    var o = !0 === e || t ? 0 : options.animSpeed;
                    if (options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(document, "click", boxQueue.hideBGClick), t || layers.boxshow(), boxQueue.currHiding) {
                        boxQueue.currHiding.shOther = !0;
                        var s = boxQueue.currHiding.bodyNode.parentNode.parentNode;
                        Object(_dom__WEBPACK_IMPORTED_MODULE_4__.i)(s, "tween").stop(!0)
                    }
                    o > 0 ? Object(_fx__WEBPACK_IMPORTED_MODULE_5__.e)(boxContainer, o) : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxContainer), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxContainer), options.onShow && options.onShow(n)
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
                addButton: function(e, t, n, o, s) {
                    var i = _addButton(e, t || this.hide, n, s);
                    return o ? i : this
                },
                setButtons: function(e, t, n, o) {
                    var s = this.removeButtons();
                    return e ? (s.addButton(e, t), n && s.addButton(n, o, "no"), s) : s.addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("box_close"))
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
                        for (var t = options.bodyStyle.split(";"), n = 0, o = t.length; n < o; n++) {
                            var s = t[n].split(":");
                            s.length > 1 && s[0].length && (boxBody.style[Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(s[0])] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(s[1]), boxBody.style.setProperty && boxBody.style.setProperty(Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(s[0]), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(s[1]), ""))
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
                o = arguments[3];
            if (Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.d)(o)) return !1;
            var s = n.params || {};
            n.containerClass && (s.containerClass = n.containerClass);
            var i = new MessageBox(s),
                a = {
                    onDone: function(o, a, _, r) {
                        if (n.preOnDone && n.onDone && n.onDone(i), i.isVisible())
                            if (__debugMode) c();
                            else try {
                                c()
                            } catch (n) {
                                Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.c)(n, {
                                    dt: 15,
                                    type: 103,
                                    url: e,
                                    query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.b)(t),
                                    answer: Array.prototype.slice.call(arguments).join("<!>")
                                }), i.isVisible() && i.hide()
                            } else n.onDone && n.onDone(i, r);

                        function c() {
                            Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.a)(bodyNode, "layers_shown"), i.setOptions({
                                title: o,
                                hideButtons: s.hideButtons || !1
                            }), n.showProgress ? i.show() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(i.bodyNode), i.content(a), i.evalBox(_, e, t), n.onDone && n.onDone(i, r)
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

        function showTabbedBox(e, t, n, o) {
            return (n = n || {}).stat = n.stat || [], n.stat.push("box.js", "boxes.css"), showBox(e, t, n, o)
        }

        function showFastBox(e, t, n, o, s, i) {
            return new MessageBox("string" == typeof e ? {
                title: e
            } : e).content(t).setButtons(n, o, s, i).show()
        }

        function showCaptchaBox(e, t, n, o) {
            var s = function(t) {
                    if (!t || void 0 === t.keyCode || 10 === t.keyCode || 13 === t.keyCode) {
                        var s = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("input", n.bodyNode);
                        if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(s.value) || !0 === t) {
                            var i = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("img", n.bodyNode)[0];
                            Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(s), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(i), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("progress", n.bodyNode)), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(s), o.onSubmit(e, s.value)
                        } else Object(_dom__WEBPACK_IMPORTED_MODULE_4__.E)(s)
                    }
                },
                i = !!n,
                a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.r)(t) ? "" : "&s=1",
                _ = o.imgSrc || "/captcha.php?sid=" + e + a;
            if (!i) {
                var r = '\n<div class="captcha">\n  <div><img src="' + _ + '"/></div>\n  <div>\n    <input type="text" class="big_text" maxlength="7" placeholder="' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_captcha_input_here") + '" />\n    <div class="progress" /></div>\n  </div>\n</div>' + (o.addText || "");
                n = showFastBox({
                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_enter_code"),
                    width: 305,
                    onHide: o.onHide,
                    onDestroy: o.onDestroy || !1
                }, r, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_send"), function() {
                    n.submit()
                }, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_cancel"), function() {
                    var e = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("input", n.bodyNode),
                        t = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("img", n.bodyNode);
                    Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(e), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(t), n.hide()
                })
            }
            n.submit = s.pbind(!0), n.changed = !0;
            var c = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("input", n.bodyNode),
                d = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("img", n.bodyNode);
            return i && (c.value = "", d.src = "/captcha.php?sid=" + e + a, Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("progress", n.bodyNode))), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(c), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(c, "keypress", s), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(d, "click", function() {
                this.src = "/captcha.php?sid=" + e + a + "&v=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.s)(1e6, 2e6)
            }), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.E)(c), n
        }

        function showReCaptchaBox(e, t, n, o) {
            window.recaptchaResponse = function(e) {
                o.onSubmit(e)
            };
            var s = !!n,
                i = !!window.grecaptcha;
            if (!s) {
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
                var a = '<div class="recaptcha"></div>' + (o.addText || "");
                n = showFastBox({
                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_recaptcha_title"),
                    width: 354,
                    onHide: o.onHide,
                    onDestroy: o.onDestroy || !1
                }, a, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_cancel"));
                var _ = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("recaptcha", n.bodyNode);
                _.id = "recaptcha" + (n.guid ? n.guid : "0"), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.u)(_)
            }
            return s && i ? window.grecaptcha.reset() : i && window.recaptchaCallback(), n.changed = !0, n
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
                o = function(e) {
                    if (decodeErors[e]) return e;
                    try {
                        return encodeURIComponent(e)
                    } catch (e) {
                        return ""
                    }
                };
            for (var s in e)
                if (null != e[s] && !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.v)(e[s]))
                    if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.t)(e[s]))
                        for (var i = 0, a = 0, _ = e[s].length; i < _; ++i) null == e[s][i] || Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.v)(e[s][i]) || (n.push(o(s) + "[" + a + "]=" + o(e[s][i])), ++a);
                    else n.push(o(s) + "=" + o(e[s]));
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
            return e = e.split("&"), Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(e, function(e, o) {
                var s = o.split("=");
                if (s[0]) {
                    var i = n(s[1] + "");
                    if ("[]" === s[0].substr(s.length - 2)) {
                        var a = n(s[0].substr(0, s.length - 2));
                        t[a] || (t[a] = []), t[a].push(i)
                    } else t[n(s[0])] = i
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
            framegot: function(e, t, n, o) {
                ajax.framedata && (ajax.framedata.push(void 0 === t && void 0 === n && void 0 === o ? e : [e, t, n, o]), 1 == ajax.framedata.length && ajax._framenext())
            },
            framepost: function(e, t, n, o) {
                clearTimeout(iframeTO), iframeTransport && ajax._frameover(), iframeTransport = utilsNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.e)("div", {
                    innerHTML: "<iframe></iframe>"
                })).firstChild, ajax._framedone = n, ajax.framedata = [!0], e += "?" + ("string" != typeof t ? ajx2q(t, o && o.noSort) : t), e += ("?" != e.charAt(e.length - 1) ? "&" : "") + "_rndVer=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.s)(0, 99999), ajax._frameurl = iframeTransport.src = e
            },
            plainpost: function(e, t, n, o, s, i, a, _) {
                var r = ajax._getreq(),
                    c = "string" != typeof t ? ajx2q(t, a && a.noSort) : t;
                r.onreadystatechange = function() {
                    4 === r.readyState && (r.status >= 200 && r.status < 300 ? n && n(r.responseText, r) : o && o(r.responseText, r))
                };
                try {
                    r.open("POST", e, !0)
                } catch (e) {
                    return !1
                }
                return i && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(i, function(e, t) {
                    r[e] = t
                }), s || (r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), _ || r.setRequestHeader("X-Requested-With", "XMLHttpRequest")), r.send(c), r
            },
            post: function(e, t, n) {
                "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
                var o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)({
                        _captcha: !1,
                        _box: !1
                    }, n || {}),
                    s = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)({
                        al: o.frame ? -1 : 1
                    }, t),
                    i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.L)(),
                    a = vk.spentLastSendTS ? Math.round((i - vk.spentLastSendTS) / 1e3) : 0;
                if (vk.sampleUser >= 0 && window.cur && cur.module && a >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (s._smt = cur.module + ":" + a), vk.spentLastSendTS = i), o.progress && (o.showProgress || (o.showProgress = function() {
                        var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)(o.progress);
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.V)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Qa)(e, "opacity", 1), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(e)
                    }), o.hideProgress || (o.hideProgress = function() {
                        var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)(o.progress);
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.V)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Qa)(e, "opacity", 0), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(e)
                    })), o.loader) {
                    var _ = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Aa)(boxLayerWrap);
                    o.showProgress = function() {
                        boxRefreshCoords(boxLoader), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(boxLoader), _ || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(boxLayerWrap)
                    }, o.hideProgress = function() {
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(boxLoader), _ || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(boxLayerWrap)
                    }
                }
                return ajax._post(e, s, o)
            },
            preload: function(e, t, n) {
                "/" !== e.substr(0, 1) && (e = "/" + e), ajaxCache[e + "#" + ajx2q(t)] = n
            },
            invalidate: function(e, t) {
                void 0 === e ? ajaxCache = {} : delete ajaxCache[ajax._getCacheKey(e, t)]
            },
            _getCacheKey: function(e, t, n) {
                var o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.d)(t);
                return delete o.al, delete o.al_ad, delete o.ads_section, delete o.ads_showed, delete o.captcha_sid, delete o.captcha_key, delete o._smt, delete o._preload, e + "#" + ajx2q(o, n && n.noSort)
            },
            _debugLog: function(e, t) {
                window.debuglogGot && window.debuglogGot(t, e)
            },
            _parseRes: function(e, t) {
                for (var n = e.length - 1; n >= 0; --n) {
                    var o = e[n];
                    if ("<!" === o.substr(0, 2)) {
                        var s = o.indexOf(">"),
                            i = o.substr(2, s - 2);
                        switch (o = o.substr(s + 1), i) {
                            case "json":
                                e[n] = Object(_utils__WEBPACK_IMPORTED_MODULE_6__.l)(o);
                                break;
                            case "int":
                                e[n] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(o);
                                break;
                            case "float":
                                e[n] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.k)(o);
                                break;
                            case "bool":
                                e[n] = !!Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(o);
                                break;
                            case "null":
                                e[n] = null;
                                break;
                            case "pageview_candidate":
                                e.pop();
                                break;
                            case "debug":
                                ajax._debugLog(o, t), e.pop()
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
                                        o = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                            cache: -1
                                        }) : options;
                                    ajax._post(url, n, o)
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
                        o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.d)(n);
                    Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(o, function(e, t) {
                        return o[e] = t.substr(0, 100)
                    }), ajax.lastResp = o.join("<!>");
                    var s = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n.shift());
                    if (!s) return fail("<pre>" + e + "</pre>", {
                        status: -1
                    });
                    if (vk.version && vk.version !== s) s && n.length > 4 ? nav.reload({
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
                            _ = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n.shift());
                        options.frame && (n = t);
                        var r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n.shift());
                        if (vk.lang !== a && options.canReload) nav.reload({
                            force: !0,
                            from: 3,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        else {
                            var c = function() {
                                var e = ["common.css"];
                                if (i)
                                    for (var t = 0, o = (i = i.split(",")).length; t < o; ++t) e.push(i[t]);
                                if (stVersions.lang < _)
                                    for (var s in stVersions.lang = _, StaticFiles) /^lang\d/i.test(s) && e.push(s);
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
                                stManager.add(e, _processResponse.pbind(r, n))
                            };
                            if (window.stVersions) {
                                if (s === stVersions.nav) return c();
                                headNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.e)("script", {
                                    type: "text/javascript",
                                    src: "/js/loader_nav" + s + "_" + vk.lang + ".js"
                                })), setTimeout(function e() {
                                    if (s === stVersions.nav) return c();
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
    QGEU: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return _
        }), n.d(t, "d", function() {
            return r
        }), n.d(t, "b", function() {
            return c
        }), n.d(t, "c", function() {
            return l
        });
        var o = n("v+DW"),
            s = n("t7n3"),
            i = n("zxIV"),
            a = n("4+be");

        function _() {
            return !(!window.vk || !vk.a11y)
        }

        function r() {
            clearTimeout(cur.updateOnlineTO), cur.updateOnlineTO = setTimeout(function() {
                Object(s.f)(Object(i.G)("_online"), function() {
                    var e = Object(i.H)("_online_reader", this) || this,
                        t = Object(i.V)(this, "online"),
                        n = Object(i.V)(this, "mobile"),
                        o = Object(i.I)("img", e),
                        _ = function(e) {
                            var t = Object(i.n)("_post", e),
                                n = t && Object(i.j)(t, "author");
                            return n ? n.innerText || n.textContent : ""
                        };
                    if (t) {
                        var r = "";
                        Object(s.f)(o, function() {
                            var e = Object(i.c)(this, "alt") || Object(i.c)(this, "data-alt") || _(this);
                            e && (r = Object(s.H)(r + " " + e), this.setAttribute("data-alt", e), this.removeAttribute("alt"))
                        }), r = Object(s.H)(r + " " + (n ? Object(a.d)("global_user_is_online_mobile") : Object(a.d)("global_user_is_online"))), e.setAttribute("aria-label", r)
                    } else Object(s.f)(o, function() {
                        var e = Object(i.c)(this, "data-alt") || _(this);
                        e && (this.setAttribute("alt", e), this.removeAttribute("data-alt"))
                    }), e.removeAttribute("aria-label")
                })
            }, 100)
        }

        function c() {
            clearTimeout(cur.updateChkBoxTO), cur.updateChkBoxTO = setTimeout(function() {
                var e = [];
                Object(s.f)(["checkbox", "checkbox_pic"], function() {
                    e = e.concat(Object(i.G)(this))
                }), Object(s.f)(e, function() {
                    "DIV" !== this.tagName || this.getAttribute("role") || (this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", Object(o.l)(this) ? "true" : "false"), this.setAttribute("tabindex", 0))
                })
            }, 100)
        }

        function d() {
            clearTimeout(cur.updateRadioBtnsTO), cur.updateRadioBtnsTO = setTimeout(function() {
                var e = [],
                    t = Object(i.G)("radiobtn");
                Object(s.f)(t, function() {
                    if ("DIV" === this.tagName && !this.getAttribute("role")) {
                        var t = Object(o.l)(this);
                        this.setAttribute("role", "radio"), this.setAttribute("aria-checked", t ? "true" : "false"), this.setAttribute("tabindex", t ? 0 : -1);
                        var n = function(e) {
                            var t = 0,
                                n = e;
                            for (; t < 5 && n !== document;) {
                                n = Object(i.z)(n);
                                var o = Object(i.G)("radiobtn", n);
                                if (o.length > 1) break;
                                t++
                            }
                            return n
                        }(this);
                        ~e.indexOf(n) || e.push(n)
                    }
                }), Object(s.f)(e, function() {
                    if (!Object(i.G)("on", this).length) {
                        var e = Object(i.G)("radiobtn", this);
                        e.length && e[0].setAttribute("tabindex", 0)
                    }
                })
            }, 100)
        }

        function l() {
            r(), c(), d()
        }
    },
    XzvV: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return a
        });
        var o = n("kMSP"),
            s = n("t7n3"),
            i = n("0DAA");

        function a(e, t) {
            if (void 0 !== e && void 0 !== t) {
                var n = Array.from(arguments).slice(2),
                    a = void 0;
                ! function e(t, n, o) {
                    var s = "lockkk_" + t;
                    if (!0 === i.a.get(s)) i.a.checkVersion() ? o || setTimeout(e.pbind(t, n, !0), 100) : n();
                    else {
                        i.a.set(s, !0);
                        try {
                            n()
                        } catch (e) {}
                        i.a.set(s, !1)
                    }
                }("stats_cookie_lock", function() {
                    try {
                        a = (a = JSON.parse(Object(o.a)("remixsts"))).data
                    } catch (e) {
                        a = []
                    }
                    for (a.push([Math.round(Date.now() / 1e3), e, t].concat(n)); a.length > 100;) a.shift();
                    var i = Math.round(Object(s.D)(0, 1e9));
                    Object(o.d)("remixsts", JSON.stringify({
                        data: a,
                        uniqueId: i
                    }), .01)
                })
            }
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
                o = 0;
            return function(s) {
                n.push(s), o || (o = setTimeout(function() {
                    o = !1, e(n), n = []
                }, t))
            }
        }

        function executionStackPop(e) {
            return e.length > 0 && e.pop().func(), e
        }

        function lplog(e, t) {
            var n = void 0,
                o = void 0;
            if (window.__debugMode) {
                switch (t) {
                    case "error":
                        n = "color: red", o = "background: red; color: white";
                        break;
                    case "success":
                        n = "color: green", o = "background: green; color: white";
                        break;
                    default:
                        n = "color: blue;", o = "background: #000; color: #fff;"
                }
                try {
                    var s = new Date;
                    console.debug("%cLP:[" + s.getHours() + ":" + s.getMinutes() + ":" + s.getSeconds() + ":" + s.getMilliseconds() + "]%c " + e, o, n)
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
            for (var t = {}, n = [], o = 0; o < e.length; o++) t[e[o]] || (n.push(e[o]), t[n[o]] = 1);
            return n
        }

        function unpackStore(e) {
            return e.get ? e.get() : e
        }

        function debounce(e, t, n) {
            var o = void 0;
            return function() {
                var s = this,
                    i = arguments,
                    a = n && !o;
                clearTimeout(o), o = setTimeout(function() {
                    o = null, n || e.apply(s, i)
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
                    o = e[--t];
                e[t] = e[n], e[n] = o
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
            for (var n = 0, o = e.length; n < o; n++) {
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

        function checkTextLength(e, t, n, o, s, i, a) {
            var _ = t.getValue ? t.getValue() : t.value,
                r = t.lastLen || 0;
            if (t.lastLen !== _.length || i) {
                t.lastLen = _.length;
                var c = {
                        "&": 5,
                        "<": 4,
                        ">": 4,
                        '"': 6,
                        "\n": o ? 1 : 4,
                        "\r": 0,
                        "!": 5,
                        "'": 5,
                        $: 6,
                        "\\": 6
                    },
                    d = {
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
                    l = {
                        1037: 1,
                        1104: 1,
                        1117: 1
                    };
                s && (c[","] = 5);
                var u = function(e) {
                    for (var t = 0, n = 0, o = e.length; n < o; n++) {
                        var s = c[e.charAt(n)],
                            i = e.charCodeAt(n);
                        t += void 0 !== s ? s : !a && i >= 128 && (i < 1025 || l[i] || i > 1119) && !d[i] && (i < 8220 || i > 8222) && (i < 8224 || i > 8226) ? ("&#" + i + ";").length : 1
                    }
                    return t
                }(_);
                if (n = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)(n), u > Math.max(e - 100, .75 * e))
                    if (Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Ta)(n), u > e)
                        if (s) {
                            var p = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Ya)(t, function(e, t) {
                                for (var n = 0, o = "", s = 0, i = e.length; s < i; s++) {
                                    var _ = e.charAt(s),
                                        r = c[_],
                                        u = e.charCodeAt(s);
                                    if ((n += void 0 !== r ? r : !a && u >= 128 && (u < 1025 || l[u] || u > 1119) && !d[u] && (u < 8220 || u > 8222) && (u < 8224 || u > 8226) ? ("&#" + u + ";").length : 1) > t) break;
                                    o += _
                                }
                                return o
                            }(_, Math.min(e, r)));
                            t.lastLen = p.length, n.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("text_N_symbols_remain", 0)
                        } else n.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("text_exceeds_symbol_limit", u - e);
                else n.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("text_N_symbols_remain", e - u);
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
                var o = e.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i);
                if (o && "api." !== o[1].toLowerCase()) return location.href = e, !1;
                var s = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(Object(_cookies__WEBPACK_IMPORTED_MODULE_3__.a)("remixsettings_bits"));
                if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(_ajax__WEBPACK_IMPORTED_MODULE_4__.d) || 1 & s) return window.open("/away.php?to=" + encodeURIComponent(e) + (t && void 0 !== t.h ? "&h=" + t.h : ""), "_blank"), !1
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
                var o = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.G)("votes_balance_nom" + n);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(o, function(t, n) {
                    return n.innerHTML = e + " " + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("votes_flex", e)
                });
                var s = e * (vk.vcost || 7),
                    i = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.G)("money_balance_nom" + n);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(i, function(e, t) {
                    return t.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_money_amount_rub", s, !0)
                }), void 0 !== t && !1 !== t && !0 !== t && updateMoney(t, !0)
            }
        }

        function toggleOnline(e, t) {
            var n = onlinePlatformClass(t).split(" "),
                o = [];
            ["online", "mobile", "_online"].forEach(function(t) {
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.o)(t, n) && !Object(_dom__WEBPACK_IMPORTED_MODULE_6__.V)(e, t) ? o.push(t) : !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.o)(t, n) && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.V)(e, t) && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Ha)(e, t)
            }), o.length > 0 && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.a)(e, o.join(" "))
        }

        function onlinePlatformClass(e) {
            var t = " _online";
            return e && (t += " online"), _browser__WEBPACK_IMPORTED_MODULE_8__.d[e] && (t += " mobile"), Object(_accessibility__WEBPACK_IMPORTED_MODULE_9__.d)(), t
        }

        function handleScroll(e) {
            e = e.split(",");
            var t = cur.named || {},
                n = e[0] && (t[e[0]] || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)(e[0])) || !1,
                o = e[1] && (t[e[1]] || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)(e[1])) || !1;
            if (!n && !o) {
                if (!(n = document.getElementsByName(e[0])[0])) return;
                n = n.nextSibling
            }
            var s = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)("page_header_wrap") || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)("dev_top_nav_wrap");
            setTimeout(function() {
                n && Object(_scroll__WEBPACK_IMPORTED_MODULE_11__.g)(Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Q)(n)[1] - (s ? Object(_dom__WEBPACK_IMPORTED_MODULE_6__.N)(s)[1] : 0), 0), o && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.E)(o)
            }, 300)
        }
    },
    kMSP: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s
        }), n.d(t, "d", function() {
            return i
        }), n.d(t, "b", function() {
            return a
        }), n.d(t, "c", function() {
            return _
        });
        var o = n("zxIV");

        function s(e) {
            return function() {
                window._cookies = {};
                for (var e = document.cookie.split(";"), t = /^[\s]*([^\s]+?)$/i, n = 0, o = e.length; n < o; n++) {
                    var s = e[n].split("=");
                    2 === s.length && (_cookies[s[0].match(t)[1]] = unescape(s[1].match(t) ? s[1].match(t)[1] : ""))
                }
            }(), _cookies[e]
        }

        function i(e, t, n, o) {
            var s = "";
            if (n) {
                var i = new Date;
                i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3), s = "; expires=" + i.toGMTString()
            }
            var a = window.locDomain;
            document.cookie = e + "=" + escape(t) + s + "; path=/" + (a ? "; domain=." + a : "") + (o && "https:" === locProtocol ? "; secure" : "")
        }

        function a() {
            Object(o.Fa)("cookies_policy_wrap"), ajax.post("/settings", {
                act: "a_hide_cookies_policy"
            })
        }

        function _() {
            window._cookies = {}
        }
    },
    kcIO: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return c
        }), n.d(t, "d", function() {
            return d
        }), n.d(t, "a", function() {
            return l
        }), n.d(t, "e", function() {
            return u
        }), n.d(t, "c", function() {
            return p
        });
        var o = n("Egk5"),
            s = n("t7n3"),
            i = n("zxIV"),
            a = n("7jxN"),
            _ = n("gdug"),
            r = {
                hideAll: function(e, t) {
                    if (e)
                        for (; r.count();) r.hideLast();
                    else {
                        if (r.count()) {
                            var n = _message_boxes[r._boxes.pop()];
                            n._in_queue = !1, n._hide(!1, !1, t)
                        }
                        for (; r.count();) {
                            _message_boxes[r._boxes.pop()]._in_queue = !1
                        }
                    }
                },
                hideLast: function(e, t) {
                    if (r.count()) {
                        var n = window._message_boxes[r._boxes[r.count() - 1]];
                        if (!0 === e && (n.changed || r.skip || t && t.target && t.target.tagName && "input" !== t.target.tagName.toLowerCase() && cur.__mdEvent && t.target !== cur.__mdEvent.target)) return void(r.skip = !1);
                        n.hide()
                    }
                    if (t && "click" === t.type) return Object(o.c)(t)
                },
                hideBGClick: function(e) {
                    e && e.target && /^box_layer/.test(e.target.id) && r.hideLast()
                },
                count: function() {
                    return r._boxes.length
                },
                _show: function(e) {
                    var t = _message_boxes[e];
                    if (t && !t._in_queue) {
                        r.count() ? _message_boxes[r._boxes[r.count() - 1]]._hide(!0, !0) : window.tooltips && tooltips.hideAll(), t._in_queue = !0;
                        var n = !!r.count();
                        r.curBox = e, t._show(n || r.currHiding, n), r._boxes.push(e)
                    }
                },
                _hide: function(e) {
                    var t = _message_boxes[e];
                    if (t && t._in_queue && r._boxes[r.count() - 1] === e && t.isVisible() && (t._in_queue = !1, r._boxes.pop(), t._hide(!!r.count()), r.count())) {
                        var n = r._boxes[r.count() - 1];
                        r.curBox = n, _message_boxes[n]._show(!0, !0, !0)
                    }
                },
                _boxes: [],
                curBox: 0
            };

        function c() {
            var e = window._message_boxes[r.curBox];
            return e && e.isVisible() ? e : null
        }

        function d() {
            r.hideLastCheck = r.hideLast.pbind(!0), window._message_box_guid = 0, window._message_boxes = []
        }

        function l(e) {
            var t = window.innerHeight || document.documentElement.clientHeight || boxLayerBG.offsetHeight,
                n = _.a.mobile ? Object(s.r)(window.pageYOffset) : 0,
                o = Object(i.N)(e);
            e.style.marginTop = Math.max(10, n + (t - o[1]) / 3) + "px"
        }

        function u(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = (t.w || 380) + 20,
                r = t.w ? ' style="width: ' + t.w + 'px;"' : "",
                c = bodyNode.offsetWidth,
                d = Object(i.e)("div", {
                    className: "top_result_baloon_wrap fixed " + (t.className || ""),
                    innerHTML: '<div class="top_result_baloon"' + r + ">" + e + "</div>"
                }, {
                    left: (c - n) / 2
                });
            t.parentEl ? Object(i.H)(t.parentEl).appendChild(d) : bodyNode.insertBefore(d, pageNode);
            var l = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
                u = _.a.mobile ? Object(s.r)(window.pageYOffset) : 0,
                p = Object(i.N)(d);
            d.style.top = Math.max(10, u + (l - p[1]) / 3) + "px";
            var m = t.out || 2e3,
                h = new Date,
                g = function e() {
                    m < 0 || (window.doneBoxTO = setTimeout(function() {
                        !t.permit || t.permit() ? Object(a.f)(d.firstChild, 500, function() {
                            Object(i.Fa)(d), t.callback && t.callback()
                        }) : e()
                    }, m))
                };
            return Object(o.b)(d, "mouseenter", function() {
                clearTimeout(window.doneBoxTO), m -= new Date - h
            }), Object(o.b)(d, "mouseleave", function() {
                h = new Date, g()
            }), g(), d
        }

        function p() {
            return r
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
                var o = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)("system_msg");
                o.style.backgroundColor = n, o.innerHTML = e, Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Ta)(o), t && (window.topMsgTimer = setTimeout(topMsg.pbind(!1), 1e3 * t))
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

        function showMsg(e, t, n, o) {
            var s = "msg" + ("msg" !== n ? " " + n : "");
            o && (s += " msg_appear"), e = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)(e);
            var i = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.H)(n, e),
                a = i || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.u)(e),
                _ = e.insertBefore(Object(_dom__WEBPACK_IMPORTED_MODULE_0__.e)("div", {
                    className: s,
                    innerHTML: '<div class="msg_text">' + t + "</div>"
                }), a);
            i && Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Fa)(i), setTimeout(_dom__WEBPACK_IMPORTED_MODULE_0__.Ha.pbind(_, "msg_appear"), 0)
        }

        function showGlobalPrg(e, t) {
            var n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Q)(e),
                o = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.N)(e),
                s = t || {},
                i = s.w,
                a = void 0 === i ? 32 : i,
                _ = s.h,
                r = void 0 === _ ? 13 : _,
                c = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)("global_prg");
            c.className = s.cls || "progress", Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Qa)(c, {
                left: n[0] + Math.floor((o[0] - a) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.r)(s.shift ? s.shift[0] : 0),
                top: n[1] + Math.floor((o[1] - r) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.r)(s.shift ? s.shift[1] : 0),
                width: a,
                height: r,
                display: "block",
                "z-index": s.zIndex ? s.zIndex : null
            }), s.hide && (e.style.visibility = "hidden")
        }
    },
    x625: function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n("aong"),
            s = n("XzvV"),
            i = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            o = !0,
                            s = !1,
                            i = void 0;
                        try {
                            for (var a, _ = e[Symbol.iterator](); !(o = (a = _.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0);
                        } catch (e) {
                            s = !0, i = e
                        } finally {
                            try {
                                !o && _.return && _.return()
                            } finally {
                                if (s) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        window.AdsEditEasyPromote = function() {
            function e(t, n) {
                var o = this;
                if (function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.onGeoEditorLoaded = function() {
                        var e = this.getCriteriaPreset(this.audienceDropdown.val())[0];
                        e.geo_near && this.geoEditor.setPointsFromString(e.geo_near), this.geoEditor.updateMap()
                    }, t && n) {
                    this.box = t, this.boxBodyNode = t.bodyNode, this.boxControlsTextNode = t.controlsTextNode, this.imageElement = geByClass1(this.classname("image"), this.boxBodyNode), this.screensContainerElement = geByClass1(this.classname("screens-container"), this.boxBodyNode), this.headerElement = geByClass1(this.classname("header"), this.boxBodyNode), this.acceptTermsCheckboxInput = geByClass1(this.classname("accept-terms"), this.boxControlsTextNode), this.imageLayer1Element = geByClass1(this.classname("image-layer_1"), this.imageElement), this.imageLayer2Element = geByClass1(this.classname("image-layer_2"), this.imageElement), this.screensWrapperElement = geByClass1(this.classname("screens-wrapper"), this.screensContainerElement), this.introScreenElement = geByClass1(this.classname("screen_intro"), this.screensWrapperElement), this.settingsScreenElement = geByClass1(this.classname("screen_settings"), this.screensWrapperElement), this.paymentScreenElement = geByClass1(this.classname("screen_payment"), this.screensWrapperElement), this.cardPaymentScreenElement = geByClass1(this.classname("screen_card-payment"), this.screensWrapperElement), this.paymentResultScreenElement = geByClass1(this.classname("screen_payment-result"), this.screensWrapperElement), this.moreSettingsScreenElement = geByClass1(this.classname("screen_more-settings"), this.screensWrapperElement), this.settingsScreenElement && (this.totalBudgetElement = geByClass1(this.classname("row-content_total-budget"), this.settingsScreenElement), this.expectedReachValueElement = geByClass1(this.classname("expected-reach-value"), this.settingsScreenElement), this.expectedReachLimitElement = geByClass1(this.classname("expected-reach-limit"), this.settingsScreenElement), this.expectedReachBarValueElement = geByClass1(this.classname("expected-reach-bar-value"), this.settingsScreenElement), this.expectedReachHintElement = geByClass1(this.classname("expected-reach-hint"), this.settingsScreenElement), this.audienceSettingsElement = geByClass1(this.classname("audience-settings"), this.settingsScreenElement), this.editAudienceLinkWrapperElement = geByClass1(this.classname("edit-audience-link"), this.settingsScreenElement), this.editAudienceNameLinksWrapperElement = geByClass1(this.classname("edit-audience-name-links"), this.settingsScreenElement), this.budgetTitleRowElement = geByClass1(this.classname("row_budget-title"), this.settingsScreenElement), this.geoContainerPointsElement = geByClass1(this.classname("geo-container_points"), this.settingsScreenElement), this.geoContainerRegionsElement = geByClass1(this.classname("geo-container_regions"), this.settingsScreenElement), this.expectedReachRowElement = geByClass1(this.classname("row_expected-reach"), this.settingsScreenElement), this.updateTargetParamsProgressElement = geByClass1(this.classname("update-progress"), this.settingsScreenElement), this.audienceMenuDotsElement = geByClass1(this.classname("audience-menu-dots"), this.settingsScreenElement), this.audienceMenuSaveElement = geByClass1(this.classname("audience-menu-item_save"), this.audienceMenuDotsElement), this.audienceMenuSaveNewElement = geByClass1(this.classname("audience-menu-item_save_new"), this.audienceMenuDotsElement), this.audienceMenuDeleteElement = geByClass1(this.classname("audience-menu-item_delete"), this.audienceMenuDotsElement), this.audienceProgressElement = geByClass1(this.classname("audience-menu-progress"), this.settingsScreenElement), this.audienceNameInput = geByClass1(this.classname("audience-name-input"), this.settingsScreenElement), this.settingsErrorElement = geByClass1(this.classname("settings-error"), this.settingsScreenElement)), this.paymentScreenElement && (this.paymentTotalBudgetElement = geByClass1(this.classname("payments-total-budget"), this.paymentScreenElement), this.paymentUnionBudgetElement = geByClass1(this.classname("payments-union-budget"), this.paymentScreenElement), this.paymentTotalBudgetInput = geByClass1(this.classname("payments-input-amount"), this.paymentScreenElement), this.paymentAmountCurrencyElement = geByClass1(this.classname("payments-amount-currency"), this.paymentScreenElement), this.paymentSystemsElement = geByClass1(this.classname("payments-systems"), this.paymentScreenElement), this.paymentContinueElement = geByClass1(this.classname("payments-continue"), this.paymentScreenElement), this.paymentErrorElement = geByClass1(this.classname("payments-error"), this.paymentScreenElement), this.paymentIntroElement = geByClass1(this.classname("payments-intro"), this.paymentScreenElement)), this.cardPaymentScreenElement && (this.cardPaymentIframeContainerElement = geByClass1(this.classname("card-payment-iframe-container"), this.cardPaymentScreenElement), this.paymentSystemsFormElement = geByClass1(this.classname("card-payment-form"), this.cardPaymentScreenElement)), this.paymentResultScreenElement && (this.paymentResultElement = geByClass1(this.classname("payment-result"), this.paymentResultScreenElement), this.paymentResultTitleElement = geByClass1(this.classname("payment-result-title"), this.paymentResultScreenElement), this.paymentResultSubtitleElement = geByClass1(this.classname("payment-result-subtitle"), this.paymentResultScreenElement), this.paymentResultIconContainerElement = geByClass1(this.classname("payment-result-icon-container"), this.paymentResultScreenElement), this.paymentResultButtonContainerElement = geByClass1(this.classname("payment-result-button-container"), this.paymentResultScreenElement), this.paymentResultButtonElement = geByClass1(this.classname("payment-result-button"), this.paymentResultScreenElement)), this.moreSettingsScreenElement && (this.moreSettingsOfficeSwitcherRowElement = geByClass1(this.classname("row_office-switcher"), this.moreSettingsScreenElement), this.moreSettingsCategoryIdRowElement = geByClass1(this.classname("row_category-id"), this.moreSettingsScreenElement), this.moreSettingsSubtitleElement = geByClass1(this.classname("more-settings-subtitle"), this.moreSettingsScreenElement), this.moreSettingsOfficeLabelElement = geByClass1(this.classname("more-settings-office-label"), this.moreSettingsScreenElement), this.moreSettingsCategoryLabelElement = geByClass1(this.classname("more-settings-category-label"), this.moreSettingsScreenElement));
                    var s = this.box.getOptions();
                    s && s.lang && (cur.lang = extend(cur.lang || {}, s.lang)), t.setOptions({
                        onDestroy: function() {
                            Radiobutton.destroy("ads_targeting_criterion_geo_type"), Radiobutton.destroy("ads_targeting_criterion_sex"), cur.isPaymentProcess = !1
                        }
                    }), this.options = n, this.currentScreen = this.introScreenElement, this.options.already_promoted_ad_id ? (this.setPaymentResultScreen(getLang("ads_edit_easy_promote_already_promoted_title"), getLang("ads_edit_easy_promote_already_promoted_description"), "success"), this.setPaymentResultScreenButton(getLang("ads_edit_easy_promote_go_to_ad"), "https://vk.com/ads?act=office&union_id=" + this.options.already_promoted_ad_id), this.setBoxOptions({
                        showBackButton: !1,
                        noBottomControls: !0,
                        noRefreshCoords: !1
                    }), this.currentScreen = this.paymentResultScreenElement) : this.options.union_payment ? (this.currentScreen = this.paymentScreenElement, this.box.changed = !0, this.setBoxOptions({
                        showBackButton: !1,
                        noBottomControls: !0,
                        noRefreshCoords: !1
                    })) : this.options.no_intro_screen && (this.currentScreen = this.settingsScreenElement, this.box.changed = !0), removeClass(this.currentScreen, "unshown"), removeClass(this.currentScreen, this.classname("screen_hidden")), this.mouseInitialY = !1, this.lastMouseMoveEvent = +new Date, this.editingAudience = !1, this.updateTargetLastRequestID = 0, this.updateTargetCounter = 0, this.box.removeButtons(), this.continueButton = this.box.addButton(getLang("global_continue"), this.onContinueButtonClicked.bind(this), void 0, !0), setTimeout(removeClass.pbind(this.imageElement, this.classname("image_animated")), 200), setTimeout(removeClass.pbind(this.headerElement, this.classname("header_animated")), 3e3);
                    for (var i = 1; i <= 3; ++i) setTimeout(removeClass.pbind(geByClass1(this.classname("intro-block_" + i), this.boxBodyNode), this.classname("intro-block_animated")), 3e3 + 600 * i);
                    if (addEvent(this.paymentTotalBudgetInput, "blur change", this.updatePaymentAmount.bind(this)), addEvent(this.paymentScreenElement, "click", this.onPaymentScreenClicked.bind(this)), addEvent(this.paymentContinueElement, "click", this.onPaymentCompleted.bind(this)), this.paymentCardsTurnedOver = !1, !this.options.union_payment) {
                        this.settingsScreenInitialized = !1, this.initSettingsScreen(), this.initMoreSettingsScreen();
                        var a = langStr(getLang("ads_edit_easy_promote_accept_terms"), "link", '<a href="https://vk.com/ads?act=office_help&terms=1" target="_blank" onclick="event && event.stopPropagation()">', "/link", "</a>");
                        this.acceptTermsCheckbox = new Checkbox(this.acceptTermsCheckboxInput, {
                            checked: !0,
                            inline: !0,
                            width: "auto",
                            containerClass: this.classname("accept-terms-checkbox"),
                            label: a,
                            onChange: function() {
                                o.updateContinueButton()
                            }
                        })
                    }
                    cur.paymentComplete || (cur.paymentComplete = function(e, t) {
                        cur.paymentCompleteParams = t, cur.isPaymentComplete = !0
                    }), cur.paymentCanceled || (cur.paymentCanceled = function(e) {
                        e ? cur.isPaymentFailed = !0 : cur.isPaymentCanceled = !0
                    }), window.aep = this
                }
            }
            return e.prototype.classname = function(e) {
                return "ads_edit_easy_promote_box__" + e
            }, e.prototype.onContinueButtonClicked = function(e) {
                var t = this.currentScreen == this.settingsScreenElement,
                    n = this.currentScreen == this.moreSettingsScreenElement;
                t ? this.moreSettingsRequired(t) ? (this.updateMoreSettingsScreen(t), this.goToScreen(this.moreSettingsScreenElement, !1, {
                    showBackButton: !0
                })) : this.createAd(e) : n ? this.moreSettingsRequired(t) || this.createAd(e) : this.nextScreen()
            }, e.prototype.onBoxBodyMouseMoved = function(e) {
                if (!(+new Date - this.lastMouseMoveEvent < 70)) {
                    this.lastMouseMoveEvent = +new Date, !1 === this.mouseInitialY && (this.mouseInitialY = e.screenY);
                    var t = -(this.mouseInitialY - e.screenY) / 600 * 10;
                    setStyle(this.imageLayer1Element, {
                        transform: "translateY(" + Math.round(t / 2) + "px)"
                    }), setStyle(this.imageLayer2Element, {
                        transform: "translateY(" + Math.round(t / 1) + "px)"
                    })
                }
            }, e.prototype.onGeoInputPointAdded = function(e, t) {
                var n = e[0].split(","),
                    o = this.geoEditor.addPoint(n[0], n[1], n[2], n[3], e[1]);
                this.geoEditor.updateMap(o)
            }, e.prototype.onGeoEditorPointAdded = function(e) {
                this.geoPlacesList.addTagData([e.id, e.caption, "", 1, "", this.options.geo.radius_selector]), this.geoPlacesList.updateInput();
                var t = this.geoPlacesList.getTokenById(e.id);
                this.updateDropdownTokenRadiusText(t, e.radius), this.updateTargetParams()
            }, e.prototype.onGeoInputPointRemoved = function(e, t) {
                this.geoEditor.removePoint(e[0]), this.geoEditor.updateMap()
            }, e.prototype.onGeoEditorPointRemoved = function(e) {
                this.geoPlacesList.removeTagData(e), this.updateTargetParams()
            }, e.prototype.onGeoEditorPointUpdated = function(e, t, n) {
                var o = this.geoPlacesList.replaceTagID(e, t.id);
                n.caption && this.geoPlacesList.replaceTagText(t.id, t.caption), n.radius && this.updateDropdownTokenRadiusText(o, t.radius), (n.coords || n.radius || n.mask) && this.updateTargetParams()
            }, e.prototype.onUpdateTargetParamsDone = function(e) {
                if (!this.updateTargetLastRequestID || !e.request_id || e.request_id == this.updateTargetLastRequestID) {
                    if (this.haveTargetingParamsResponse = !0, "planner_reach" in e && "total_reach" in e && (this.options.expected_reach.value = e.planner_reach, this.options.expected_reach.limit = e.total_reach, this.updateExpectedReach()), "planner_price" in e) {
                        var t = e.planner_price / 1e3;
                        t = Math.max(this.options.cost_per_click_min, t), t = Math.min(this.options.cost_per_click_max, t), this.options.save_params.cost_per_click = t.toFixed(2)
                    }
                    if ("suggested_criteria_data" in e && (this.setCriteriaData(e.suggested_criteria_data), this.options.suggested_criteria_data = e.suggested_criteria_data), "suggested_criteria" in e && e.suggested_criteria && (this.options.suggested_criteria = e.suggested_criteria, this.editingAudience || 0 != this.audienceDropdown.val() || this.setTargetingParams(e.suggested_criteria)), "category_suggestions" in e) {
                        this.options.category_suggestions = e.category_suggestions;
                        var n = this.options.category_suggestions[0];
                        if (n) {
                            var o = n[1] ? n[1] : n[0];
                            this.moreSettingsCategoryDropdown.selectItem(o)
                        }
                    }
                    "cities_data" in e && (this.options.big_cities[e.cities_data_country] = e.cities_data, this.updateGeoRegionDropdown())
                }
            }, e.prototype.onUpdateTargetParamsFailed = function(e) {
                return debugLog("Get target params failed: ", e), this.options.expected_reach.value = 0, this.options.expected_reach.limit = 0, this.updateExpectedReach(), !0
            }, e.prototype.onPaymentScreenClicked = function(e) {
                if (hasClass(e.target, this.classname("payments-systems-item")) && hasClass(e.target, this.classname("payments-systems-item_clickable")))
                    if (intval(val(this.paymentTotalBudgetInput).replace(/\D+/g, "")) < intval(this.options.payment_min_amount)) notaBene(this.paymentTotalBudgetInput, null, !0);
                    else if (hide(this.paymentErrorElement), window.tooltips && tooltips.destroy(this.paymentTotalBudgetInput), hasClass(e.target, this.classname("payments-systems-item_inverse"))) {
                    e.target.getAttribute("data-inverse-type");
                    var t = e.target.getAttribute("data-inverse-link");
                    t && window.open(t, "_blank")
                } else {
                    var n = e.target.getAttribute("data-type");
                    switch (cur.isPaymentProcess = !0, n) {
                        case "webmoney":
                        case "kiwipurse":
                            this.doNontransactionalPayment(n, cur.ps_list[n]);
                            break;
                        case "paypal_ipn":
                        case "mailmoney_vkpay":
                        case "card":
                            this.doTransactionalPayment(n, cur.ps_list[n]);
                            break;
                        case "yandexmoney":
                            1 === cur.ps_list[n].new_api ? this.doTransactionalPayment(n, cur.ps_list[n]) : this.doNontransactionalPayment(n, cur.ps_list[n]);
                            break;
                        case "terminals":
                            this.paymentCardsTurnOver()
                    }
                }
            }, e.prototype.onPaymentCompleted = function() {
                this.options.union_payment ? (this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_done"), getLang("ads_payments_success_subtitle"), "success"), this.goToScreen(this.paymentResultScreenElement, !1, {
                    showBackButton: !0
                })) : this.enableAd()
            }, e.prototype.onPaymentFailed = function(e, t) {
                this.setPaymentResultScreen(t || getLang("ads_edit_easy_promote_payment_failed"), e || getLang("ads_edit_easy_promote_payment_failed_description"), "error"), this.goToScreen(this.paymentResultScreenElement, !1, {
                    showBackButton: !0
                })
            }, e.prototype.onPaymentWaiting = function() {
                this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_payment"), "wait")
            }, e.prototype.onPaymentCheckDone = function(e, t, n, o, s) {
                if (e) switch (intval(n)) {
                    case 0:
                        setTimeout(this.waitForPaymentResult.bind(this, t), 1e3);
                        break;
                    case 1:
                        this.onPaymentCompleted();
                        break;
                    case 8:
                        var i = void 0;
                        if (!t.redirectDone) {
                            this.paymentSystemsFormElement.innerHTML = "", this.paymentSystemsFormElement.action = o.action, this.paymentSystemsFormElement.method = "get", this.paymentSystemsFormElement.innerHTML = Object.keys(o.params).reduce(function(e, t) {
                                return e + '<input type="hidden" autocomplete="off" name="' + t + '" value="' + o.params[t] + '"/>'
                            }, "");
                            var a = '<form action="' + this.paymentSystemsFormElement.action + '" method="' + this.paymentSystemsFormElement.method + '" id="popup_payment_form" accept-charset="UTF-8">' + this.paymentSystemsFormElement.innerHTML + "</form>",
                                _ = getLang("payment_redirect").replace("%s", t.paymentSystemData.title);
                            if (cur._popup_text = cur.paymentsPopupHtml(_, a, "document.getElementById('popup_payment_form').submit()"), t.paymentPopup) i = t.paymentPopup;
                            else {
                                i = window.open("", "_blank", "scrollbars=1, resizable=1, menubar=1, left=0, top=0, toolbar=1, status=1")
                            }
                            cur.paymentsPopupWrite(i)
                        }
                        setTimeout(this.waitForPaymentResult.bind(this, extend(t, {
                            paymentPopup: t.paymentPopup || i,
                            redirectDone: !0
                        })), 1e3);
                        break;
                    case 2:
                    default:
                        this.onPaymentFailed(o, s)
                } else this.onPaymentFailed(n, s);
                return !0
            }, e.prototype.updateAudienceActions = function() {
                var e = this.audienceDropdown.val();
                toggleClass(this.audienceMenuDeleteElement, "ui_actions_menu_item_disabled", 0 == e), toggleClass(this.audienceMenuSaveElement, "ui_actions_menu_item_disabled", 0 == e)
            }, e.prototype.getCriteriaPreset = function(e) {
                var t = !1,
                    n = !1;
                return 0 == e && this.options.suggested_criteria ? (t = this.options.suggested_criteria, this.options.suggested_criteria_data && (n = this.options.suggested_criteria_data)) : this.options.criteria_presets[e] && (t = this.options.criteria_presets[e].criteria_raw, this.options.criteria_presets_data[e] && (n = this.options.criteria_presets_data[e])), [t, n]
            }, e.prototype.onCriteriaPresetChanged = function(e) {
                if ("" !== e) {
                    var t = this.getCriteriaPreset(e),
                        n = i(t, 2),
                        o = n[0],
                        s = n[1];
                    this.updateAudienceActions(), o && (s && this.setCriteriaData(s), this.setTargetingParams(o), this.lastCriteriaPresetID = e)
                } else this.audienceDropdown.selectItem(this.lastCriteriaPresetID || 0)
            }, e.prototype.onCreateAdFailed = function(e) {
                domFC(this.settingsErrorElement).innerHTML = e.error_msg || e.error_msg_eng || getLang("global_unknown_error"), show(this.settingsErrorElement), this.goToScreen(this.settingsScreenElement, !0)
            }, e.prototype.onCreateAdDone = function(e, t) {
                if (!e || t.error_msg || t.error_msg_eng) this.onCreateAdFailed(t);
                else if (t.ad_id && (this.options.created_ad_id = t.ad_id), t.update_options && (this.options = extend(this.options, t.update_options)), this.options.payment_available && this.options.selected_union_id == this.options.payment_union_id) {
                    this.paymentIntroElement.innerHTML = langStr(getLang("ads_edit_easy_promote_payments_intro"), "link", '<a href="/ads?act=office&union_id=' + this.options.created_ad_id + '">', "/link", "</a>");
                    var n = this.options.user_offices[this.options.payment_union_id];
                    n && "budget_result" in n && (this.paymentUnionBudgetElement.innerHTML = langNumeric(n.budget_result, getLang("global_money_amount_rub", "raw"), !0)), this.goToScreen(this.paymentScreenElement)
                } else this.onPaymentCompleted();
                return !0
            }, e.prototype.onEnableAdDone = function(e, t) {
                return t.info && "ok" === t.info ? this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_done"), getLang("ads_edit_easy_promote_payment_done_subtitle"), "success") : this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_failed"), getLang("ads_edit_easy_promote_enable_failed") + (t.error ? " " + t.error : ""), "error"), this.options.created_ad_id && this.setPaymentResultScreenButton(getLang("ads_edit_easy_promote_go_to_ad"), "/ads?act=office&union_id=" + this.options.created_ad_id), this.goToScreen(this.paymentResultScreenElement), !0
            }, e.prototype.onAudienceMenuItemClicked = function(e) {
                var t = e.target;
                if (!hasClass(t, this.classname("audience-menu-item"))) return !1;
                var n = this.audienceDropdown.val(),
                    o = n.split("_"),
                    s = i(o, 2),
                    a = s[0],
                    _ = s[1];
                _ = intval(_);
                var r = t.getAttribute("data-action");
                if (hasClass(t, "ui_actions_menu_item_disabled")) return !1;
                switch (r) {
                    case "save-to-current":
                        if (0 == n) return !1;
                        if (_ <= 0) return !1;
                        this.editCriteriaPreset(a, _, "", 0);
                        break;
                    case "save-to-new":
                        this.isEditingAudienceName = !0, hide(this.audienceDropdown.container), show(this.audienceNameInput), show(this.editAudienceNameLinksWrapperElement), this.editingAudience || hide(this.editAudienceLinkWrapperElement), hide(this.audienceMenuDotsElement), val(this.audienceNameInput, ""), elfocus(this.audienceNameInput);
                        break;
                    case "delete-current":
                        if (_ <= 0) return !1;
                        this.editCriteriaPreset(a, _, "", 1)
                }
                return !1
            }, e.prototype.goToScreen = function(t, n, o) {
                if (!t) return !1;
                if (o = extend({}, {
                        noBottomControls: t === this.cardPaymentScreenElement || t === this.paymentScreenElement || t === this.paymentResultScreenElement
                    }, o || {}), t == this.currentScreen) return this.setBoxOptions(o), !1;
                t === this.settingsScreenElement && (this.box.changed = !0), window.removeEventListener("message", e.frameMessage, !1), addClass(this.boxBodyNode, "ads_edit_easy_promote_box_overflow-hidden"), setStyle(this.screensContainerElement, {
                    height: this.screensContainerElement.clientHeight
                }), n && (addClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), this.screensWrapperElement.clientHeight, cur.isPaymentProcess = !1), removeClass(t, "unshown"), removeClass(t, this.classname("screen_hidden")), t.scrollTop = 0;
                var s = n ? t.offsetTop + t.clientHeight : this.currentScreen.offsetTop + this.currentScreen.clientHeight;
                return setStyle(this.screensWrapperElement, {
                    transform: "translateY(-" + s + "px)"
                }), addClass(this.currentScreen, this.classname("screen_hidden")), n && (this.screensWrapperElement.clientHeight, removeClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), this.screensWrapperElement.clientHeight, setStyle(this.screensWrapperElement, {
                    transform: "translateY(0)"
                })), this.screensContainerElement.clientHeight, setStyle(this.screensContainerElement, {
                    height: t.clientHeight
                }), this.setBoxOptions(o), setTimeout(function(e) {
                    addClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), this.screensWrapperElement.clientHeight, setStyle(this.screensWrapperElement, {
                        transform: "translateY(0)"
                    }), addClass(e, "unshown"), setStyle(this.screensContainerElement, {
                        height: "auto"
                    }), this.screensWrapperElement.clientHeight, removeClass(this.screensWrapperElement, this.classname("screens-wrapper_transition-disabled")), removeClass(this.boxBodyNode, "ads_edit_easy_promote_box_overflow-hidden")
                }.bind(this, this.currentScreen), 600), this.currentScreen = t, this.currentScreen === this.settingsScreenElement && this.updateExpectedReach(), !1
            }, e.prototype.nextScreen = function(e) {
                var t = (e ? domPS : domNS)(this.currentScreen),
                    n = {};
                return t == this.cardPaymentScreenElement && (e && (t = domPS(t)), n.showBackButton = !0), this.goToScreen(t, e, n)
            }, e.prototype.paymentCardsTurnOver = function(e) {
                var t = this,
                    n = 0;
                geByClass(this.classname("payments-systems-item"), this.paymentScreenElement).map(function(o) {
                    var s = o.getAttribute("data-type"),
                        i = o.getAttribute("data-inverse-type");
                    setTimeout(function() {
                        addClass(o, t.classname("payments-systems-item_rotated")), setTimeout(function() {
                            addClass(o, t.classname("payments-systems-item_no-transition")), o.clientHeight, (e ? removeClass : addClass)(o, t.classname("payments-systems-item_inverse")), addClass(o, t.classname("payments-systems-item_rotated-inv")), removeClass(o, t.classname("payments-systems-item_rotated")), toggleClass(o, t.classname("payments-systems-item_") + s, e), toggleClass(o, t.classname("payments-systems-item_") + i, !e), toggleClass(o, t.classname("payments-systems-item_clickable"), e ? !!s : !!i), o.clientHeight, removeClass(o, t.classname("payments-systems-item_no-transition")), o.clientHeight, removeClass(o, t.classname("payments-systems-item_rotated-inv"))
                        }, 200)
                    }, 50 * n), n++
                }), this.paymentCardsTurnedOver = !e, this.setBoxOptions({
                    showBackButton: this.paymentCardsTurnedOver,
                    noBottomControls: !0
                })
            }, e.prototype.goBack = function() {
                return this.paymentCardsTurnedOver ? this.paymentCardsTurnOver(!0) : this.nextScreen(!0), !1
            }, e.prototype.setBoxOptions = function(e) {
                if (e) {
                    this.box.setOptions({
                        title: e.showBackButton ? '<a class="back ads_edit_easy_promote_box__back">' + getLang("global_box_title_back") + "</a>" : this.options.box_title,
                        hideButtons: !!e.noBottomControls,
                        noRefreshCoords: !("noRefreshCoords" in e) || e.noRefreshCoords
                    });
                    var t = geByClass1(this.classname("back"), this.box.titleWrap);
                    t && (removeEvent(t, "click", this.goBack.bind(this)), addEvent(t, "click", this.goBack.bind(this)))
                }
            }, e.prototype.updateDropdownTokenRadiusText = function(e, t) {
                geByClass1("ads_edit_geo_place_radius_selector_text", e).innerHTML = langNumeric(t, "%s", !0) + " " + getLang("ads_edit_ad_geo_radius_unit_meters")
            }, e.prototype.getTextWidth = function(e) {
                var t = ce("span", {
                    innerHTML: e
                });
                document.body.appendChild(t);
                var n = getSize(t);
                return re(t), n[0]
            }, e.prototype.getAgeSelectorData = function(e, t, n) {
                for (var o = [
                        [0, getLang("ads_age_any")]
                    ], s = e; s <= t; ++s) o.push([s, langNumeric(s, n)]);
                return o
            }, e.prototype.getGeoRegionURL = function() {
                return "/select.php?act=acity&autocomplete=1&show_regions=1&country=" + this.geoCountryDropdown.val()
            }, e.prototype.updateGeoRegionDropdown = function() {
                this.geoRegionDropdown.setURL(this.getGeoRegionURL()), this.geoRegionDropdown.disable(0 == this.geoCountryDropdown.val() && !this.geoRegionDropdown.val());
                var e = this.options.big_cities[this.geoCountryDropdown.val()];
                this.geoRegionDropdown.setOptions({
                    defaultItems: e || []
                }), e || this.updateTargetParams(!1, {
                    need_cities_data: !0
                })
            }, e.prototype.updateGeoPlacesList = function() {
                var e = !1,
                    t = "";
                this.geoEditor.inited && (e = this.geoEditor.map.getCenter(), t += "&radius=" + this.geoEditor.options.defaultRadius), e && (t += "&lat=" + e.lat + "&lon=" + e.lon);
                var n = "/adsedit?act=search_geo" + t;
                this.geoPlacesList.setURL(n)
            }, e.prototype.updateSettingsScreenFixedRow = function() {
                var e = this.settingsScreenElement.scrollHeight - this.settingsScreenElement.scrollTop - this.settingsScreenElement.clientHeight,
                    t = e > 0,
                    n = domPN(this.durationDropdown.container).offsetTop + this.durationDropdown.container.clientHeight,
                    o = domPN(this.dailyLimitDropdown.container).offsetTop + this.dailyLimitDropdown.container.clientHeight;
                this.durationDropdown.select.isVisible() && e > this.settingsScreenElement.scrollHeight - n - this.expectedReachRowElement.clientHeight && this.durationDropdown.select.hide(), this.dailyLimitDropdown.select.isVisible() && e > this.settingsScreenElement.scrollHeight - o - this.expectedReachRowElement.clientHeight && this.dailyLimitDropdown.select.hide(), this.expectedReachRowElement.fixed !== t && (t && !this.expectedReachRowDummyElement && (this.expectedReachRowDummyElement = ce("div", {
                    className: this.classname("row ads_edit_easy_promote_box__row_expected-reach")
                }, {
                    height: this.expectedReachRowElement.clientHeight - 20
                }), this.settingsScreenElement.appendChild(this.expectedReachRowDummyElement)), t || (re(this.expectedReachRowDummyElement), delete this.expectedReachRowDummyElement), toggleClass(this.expectedReachRowElement, this.classname("row_fixed"), t), this.expectedReachRowElement.fixed = t)
            }, e.prototype.updatePaymentAmount = function() {
                var e = intval(val(this.paymentTotalBudgetInput).replace(/\D+/g, ""));
                e < intval(this.options.payment_min_amount) ? (showTooltip(this.paymentTotalBudgetInput, {
                    text: langNumeric(this.options.payment_min_amount, getLang("ads_minimum_payment", "raw"), !0),
                    dir: "auto",
                    shift: [0, 6, 0]
                }), addClass(this.paymentSystemsElement, this.classname("payments-systems_disabled"))) : removeClass(this.paymentSystemsElement, this.classname("payments-systems_disabled")), val(this.paymentTotalBudgetInput, stripHTML(langNumeric(e, "%s", !0))), this.paymentAmountCurrencyElement.innerHTML = langNumeric(e, getLang("global_money_amount_rub_text", "raw"), !0)
            }, e.prototype.updateTotalBudget = function() {
                var e = this.durationDropdown.val() * this.dailyLimitDropdown.val();
                this.options.totalBudget = e, this.totalBudgetElement.innerHTML = langNumeric(e, getLang("global_money_amount_rub", "raw"), !0), this.paymentTotalBudgetElement.innerHTML = langNumeric(e, getLang("global_money_amount_rub", "raw"), !0), val(this.paymentTotalBudgetInput, e), this.updatePaymentAmount()
            }, e.prototype.updateExpectedReach = function() {
                var e = 0;
                if (this.options.expected_reach.limit ? (e = Math.min(100, Math.round(this.options.expected_reach.value / this.options.expected_reach.limit * 100)), this.expectedReachValueElement.innerHTML = langNumeric(this.options.expected_reach.value, getLang("global_X_people", "raw"), !0), this.expectedReachLimitElement.innerHTML = langNumeric(this.options.expected_reach.limit, getLang("ads_edit_easy_promote_expected_reach_possible", "raw"), !0)) : (this.expectedReachValueElement.innerHTML = "&mdash;", this.expectedReachLimitElement.innerHTML = ""), setStyle(this.expectedReachBarValueElement, {
                        width: e + "%"
                    }), toggleClass(this.expectedReachBarValueElement, this.classname("expected-reach-bar-value_red"), e < 20), toggleClass(this.expectedReachBarValueElement, this.classname("expected-reach-bar-value_green"), e > 80), this.haveTargetingParamsResponse) {
                    var t = this.options.expected_reach.limit <= this.options.audience_limit_min,
                        n = this.options.expected_reach.limit >= this.options.audience_limit_max;
                    this.expectedReachHintElement.innerHTML = n ? getLang("ads_edit_easy_promote_audience_too_large") : t ? getLang("ads_edit_easy_promote_audience_too_small") : getLang("ads_edit_easy_promote_expected_reach_hint"), toggleClass(this.expectedReachHintElement, this.classname("expected-reach-hint_warning"), n || t), this.updateContinueButton()
                }
            }, e.prototype.updateContinueButton = function() {
                var e = this.options.expected_reach.limit <= this.options.audience_limit_min,
                    t = this.options.expected_reach.limit >= this.options.audience_limit_max,
                    n = this.acceptTermsCheckbox.val();
                disableButton(this.continueButton, (t || e) && this.currentScreen === this.settingsScreenElement || !n)
            }, e.prototype.updateAgeSelectors = function() {
                var e = intval(this.ageFromDropdown.val()),
                    t = intval(this.ageToDropdown.val());
                this.ageFromDropdown.setData(this.getAgeSelectorData(this.options.ages.min, t || this.options.ages.max, getLang("ads_age_from"))), this.ageToDropdown.setData(this.getAgeSelectorData(e || this.options.ages.min, this.options.ages.max, getLang("ads_age_to")))
            }, e.prototype.updateTargetParams = function(e, t) {
                var n = this;
                if (this.updateTargetParamsOptions = this.updateTargetParamsOptions || {}, t && (this.updateTargetParamsOptions = extend({}, this.updateTargetParamsOptions, t)), this.settingsScreenInitialized) {
                    if (!e) {
                        return this.updateTargetParamsTimer && clearTimeout(this.updateTargetParamsTimer), void(this.updateTargetParamsTimer = setTimeout(this.updateTargetParams.bind(this, !0, this.updateTargetParamsOptions), 500))
                    }
                    var o = this.getUpdateTargetParams(this.updateTargetParamsOptions);
                    this.updateTargetParamsOptions = {}, this.updateTargetLastRequestID = o.request_id, ajax.post("/adsedit?act=get_target_params", o, {
                        onDone: this.onUpdateTargetParamsDone.bind(this),
                        onFail: this.onUpdateTargetParamsFailed.bind(this),
                        showProgress: function(e) {
                            function t() {
                                return e.apply(this, arguments)
                            }
                            return t.toString = function() {
                                return e.toString()
                            }, t
                        }(function() {
                            n.updateTargetCounter || (showProgress(n.updateTargetParamsProgressElement), lockButton(n.continueButton)), n.updateTargetCounter++
                        }),
                        hideProgress: function(e) {
                            function t() {
                                return e.apply(this, arguments)
                            }
                            return t.toString = function() {
                                return e.toString()
                            }, t
                        }(function() {
                            n.updateTargetCounter--, n.updateTargetCounter || (hideProgress(n.updateTargetParamsProgressElement), unlockButton(n.continueButton))
                        })
                    })
                }
            }, e.prototype.getUpdateTargetParams = function(e) {
                e = e || {};
                var t = "",
                    n = this.getCriteriaPreset(this.audienceDropdown.val()),
                    o = i(n, 1)[0];
                this.geoEditor.inited ? t = this.geoEditor.savePointsToString() : o && (t = o.geo_near);
                var s = {
                    geo_type: Radiobutton.val("ads_targeting_criterion_geo_type"),
                    geo_mask: this.options.geo.mask,
                    country: this.geoCountryDropdown.val(),
                    cities: this.geoRegionDropdown.val(),
                    sex: Radiobutton.val("ads_targeting_criterion_sex"),
                    age_from: this.ageFromDropdown.val(),
                    age_to: this.ageToDropdown.val(),
                    interest_categories: this.interestsDropdown.val(),
                    groups: this.groupsDropdown.val(),
                    geo_near: t,
                    planner_duration: this.durationDropdown.val(),
                    planner_daily_budget: this.dailyLimitDropdown.val()
                };
                if (1 == s.geo_type ? (s.country = "", s.cities = "") : 0 == s.geo_type && (s.geo_near = "", s.geo_mask = ""), 0 == s.retargeting_groups && (s.retargeting_groups = ""), s.country && e.need_cities_data && (s.need_cities_data = 1), this.options.suggested_criteria || (s.need_suggested_criteria = 1), this.options.category_selected) s.category1_id = this.options.category_selected;
                else if (this.options.category_suggestions) {
                    var a = this.options.category_suggestions[0];
                    a && (s.category1_id = a[1] ? a[1] : a[0])
                } else s.need_link_post = 1;
                return s.request_id = +new Date, extend({}, this.options.target_params, s)
            }, e.prototype.setCriteriaData = function(e) {
                "groups" in e && e.groups && this.groupsDropdown.setOptions({
                    defaultItems: e.groups
                }), "cities" in e && e.cities && this.geoRegionDropdown.setOptions({
                    defaultItems: e.cities
                })
            }, e.prototype.setTargetingParams = function(e) {
                var t = this;
                this.ageFromDropdown.selectItem(0), this.ageToDropdown.selectItem(0), e.age_from && this.ageFromDropdown.selectItem(e.age_from), e.age_to && this.ageToDropdown.selectItem(e.age_to), Radiobutton.select("ads_targeting_criterion_sex", e.sex ? e.sex : 0), this.groupsDropdown.clear(), e.groups && (e.groups.split(",").map(function(e) {
                    e && t.groupsDropdown.selectItem(e)
                }), this.showGroupsDropdown()), this.geoRegionDropdown.clear(), e.cities && (e.cities.split(",").map(function(e) {
                    e && t.geoRegionDropdown.selectItem(e)
                }), this.updateGeoRegionDropdown()), this.geoCountryDropdown.selectItem(e.country ? e.country : 0), this.interestsDropdown.clear(), e.interest_categories && (e.interest_categories.split(",").map(function(e) {
                    e && t.interestsDropdown.selectItem(e)
                }), this.showInterestsDropdown()), e.geo_near ? (this.geoEditor && this.geoEditor.inited && this.geoEditor.setPointsFromString(e.geo_near), Radiobutton.select("ads_targeting_criterion_geo_type", 1)) : Radiobutton.select("ads_targeting_criterion_geo_type", 0), this.updateTargetParams()
            }, e.prototype.showGroupsDropdown = function() {
                return hide(this.groupShowerLink), show(this.groupsDropdown.container), removeClass(gpeByClass(this.classname("row-content"), this.groupsDropdown.container), this.classname("row-content_simple")), this.groupsDropdown.updateInput(), !1
            }, e.prototype.showInterestsDropdown = function() {
                return hide(this.interestsShowerLink), show(this.interestsDropdown.container), removeClass(gpeByClass(this.classname("row-content"), this.interestsDropdown.container), this.classname("row-content_simple")), this.interestsDropdown.updateInput(), !1
            }, e.prototype.editCriteriaPreset = function(e, t, n, o) {
                var s = this;
                if (!(e = intval(e) || this.options.selected_union_id)) return !1;
                var i = this.getUpdateTargetParams();
                if (!t && !o) {
                    var a = e + "_" + -i.request_id;
                    this.options.audiences[a] = [a, clean(n), getLang("ads_edit_easy_promote_audience_saving")], this.audienceDropdown.setOptions({
                        defaultItems: Object.values(this.options.audiences)
                    }), this.audienceDropdown.selectItem(a)
                }
                ajax.post("/adsedit?act=a_edit_criteria_preset", extend({}, i, {
                    client_id: e,
                    criteria_preset_id: t,
                    criteria_preset_title: n,
                    hash: this.options.save_audience_hash,
                    do_delete: intval(o),
                    source: "easy_promote"
                }), {
                    onDone: function(n) {
                        if ("criteria_preset_id" in n)
                            if (t || o) {
                                if (t && !o) {
                                    var a = e + "_" + t;
                                    "description" in n && (s.options.audiences[a][2] = n.description), s.audienceDropdown.setOptions({
                                        defaultItems: Object.values(s.options.audiences)
                                    })
                                }
                            } else {
                                var _ = e + "_" + -i.request_id,
                                    r = e + "_" + n.criteria_preset_id;
                                s.options.audiences[r] = s.options.audiences[_], s.options.audiences[r][0] = r, "description" in n && (s.options.audiences[r][2] = n.description), delete s.options.audiences[_], s.audienceDropdown.setOptions({
                                    defaultItems: Object.values(s.options.audiences)
                                }), s.audienceDropdown.selectItem(r)
                            }
                        if (o) {
                            var c = e + "_" + t;
                            delete s.options.audiences[c], s.audienceDropdown.setOptions({
                                defaultItems: Object.values(s.options.audiences)
                            }), s.audienceDropdown.selectItem(0)
                        }
                    },
                    onFail: function() {},
                    showProgress: function(e) {
                        function t() {
                            return e.apply(this, arguments)
                        }
                        return t.toString = function() {
                            return e.toString()
                        }, t
                    }(function() {
                        hide(s.audienceMenuDotsElement), show(s.audienceProgressElement), showProgress(s.audienceProgressElement)
                    }),
                    hideProgress: function(e) {
                        function t() {
                            return e.apply(this, arguments)
                        }
                        return t.toString = function() {
                            return e.toString()
                        }, t
                    }(function() {
                        show(s.audienceMenuDotsElement), hideProgress(s.audienceProgressElement), hide(show(s.audienceProgressElement))
                    })
                })
            }, e.prototype.createAd = function(e) {
                var t = this.getUpdateTargetParams(),
                    n = extend({}, t, this.options.save_params, {
                        client_id: this.options.selected_union_id,
                        day_limit: this.dailyLimitDropdown.val(),
                        duration: this.durationDropdown.val(),
                        all_limit: this.options.totalBudget,
                        criteria_preset_id: this.audienceDropdown.val(),
                        planner_reach: this.options.expected_reach.value,
                        total_reach: this.options.expected_reach.limit,
                        suggested_criteria: this.isSuggestedCriteria(t) ? 1 : 0
                    });
                ajax.post("/adsedit?act=save_ad", n, {
                    onDone: this.onCreateAdDone.bind(this, !0),
                    onFail: this.onCreateAdDone.bind(this, !1),
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e)
                })
            }, e.prototype.enableAd = function() {
                this.setPaymentResultScreen(getLang("ads_edit_easy_promote_enabling_ad"), "", "wait"), this.hidePaymentResultScreenButton(), this.goToScreen(this.paymentResultScreenElement);
                var e = {
                    enable: 1,
                    hash: this.options.enable_ad_hash,
                    union_id: this.options.created_ad_id
                };
                ajax.post("/ads?act=a_union_change_status", e, {
                    onDone: this.onEnableAdDone.bind(this, !0),
                    onFail: this.onEnableAdDone.bind(this, !1)
                })
            }, e.prototype.waitForPaymentResult = function(e) {
                var t = e.paymentPopup,
                    n = e.ajaxParams,
                    o = !1,
                    s = !1;
                t && t.closed && (o = !0, e.paymentPopupClosedTime || (e.paymentPopupClosedTime = +new Date), s = +new Date - e.paymentPopupClosedTime > 1e4);
                if (!o || s || e.paymentWaiting || (this.onPaymentWaiting(), e.paymentWaiting = !0), cur.isPaymentComplete) return this.onPaymentCheckDone(!0, e, cur.paymentCompleteParams), void delete cur.isPaymentComplete;
                if (cur.isPaymentCanceled || s) return this.onPaymentCheckDone(!1, e, void 0, void 0, getLang("ads_edit_easy_promote_payment_cancelled")), void delete cur.isPaymentCanceled;
                if (cur.isPaymentFailed) return this.onPaymentCheckDone(!1, e), void delete cur.isPaymentFailed;
                if (cur.isPaymentProcess) {
                    var i = extend({}, n, {
                        act: "a_getvotes_check"
                    });
                    ajax.post("al_payments.php", i, {
                        onDone: this.onPaymentCheckDone.bind(this, !0, e),
                        onFail: this.onPaymentCheckDone.bind(this, !1, e)
                    })
                }
            }, e.prototype.doTransactionalPayment = function(t, n) {
                var o = this,
                    s = void 0;
                if (n && n.provider) {
                    s = window.open("", "_blank", "scrollbars=1, resizable=1, menubar=1, left=0, top=0, toolbar=1, status=1");
                    var i = getLang("payment_redirect").replace("%s", cur.ps_list[t].title);
                    cur._popup_text = cur.paymentsPopupHtml(i, "", ""), cur.paymentsPopupWrite(s)
                }
                var a = {
                    act: "a_getvotes_charge",
                    type: t,
                    payment_account_id: this.options.payment_union_id,
                    hash: this.options.payment_hash,
                    account_hash: this.options.payment_ads_hash,
                    amount: val(this.paymentTotalBudgetInput).replace(/\D+/g, ""),
                    source: "ads_easy_promote"
                };
                ajax.post("al_payments.php", a, {
                    onDone: function(i, a) {
                        if ("mailmoney_vkpay" == t) return o.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), o.goToScreen(o.paymentResultScreenElement), o.box._hide(!1, !0), showWiki({
                            w: i
                        }, !1, !1, {
                            noLocChange: 1,
                            skipBoxesHide: 1,
                            noClickHide: 1
                        }), cur.promoteBox = o.box, cur.onExternalAppDone = function(e) {
                            e.status || (cur.isPaymentCanceled = !0), cur.promoteBox._show(), cur.promoteBox = null, cur.onExternalAppDone = null, window.WkView && WkView.hide(!1, !0)
                        }, void o.waitForPaymentResult({
                            ajaxParams: {
                                source: "ads",
                                ads_union_id: o.options.payment_union_id,
                                type: t,
                                hash: n.check_hash
                            },
                            paymentSystemData: n
                        });
                        a ? (o.setPaymentIFrameHtml(a), o.nextScreen(), window.addEventListener("message", e.frameMessage, !1)) : (o.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), o.goToScreen(o.paymentResultScreenElement));
                        var _ = {
                            ajaxParams: extend({}, i, {
                                type: t
                            }),
                            paymentSystemData: n
                        };
                        s && (_.paymentPopup = s), o.waitForPaymentResult(_)
                    },
                    onFail: function(e) {
                        return domFC(o.paymentErrorElement).innerHTML = e, show(o.paymentErrorElement), !0
                    },
                    showProgress: addClass.pbind(this.paymentSystemsElement, this.classname("payments-systems_disabled")),
                    hideProgress: removeClass.pbind(this.paymentSystemsElement, this.classname("payments-systems_disabled"))
                })
            }, e.prototype.doNontransactionalPayment = function(e, t) {
                if (window.cur && cur.ps_list && cur.ps_list[e] && cur.submitPaymentSystemsForm) {
                    var n = ce("input", {
                            value: val(this.paymentTotalBudgetInput).replace(/\D+/g, ""),
                            id: "amount_" + e,
                            type: "hidden"
                        }),
                        o = ce("div", {
                            className: "_ps_wrap"
                        }, {
                            display: "none"
                        });
                    o.appendChild(n), this.boxBodyNode.appendChild(o), this.paymentSystemsFormElement.innerHTML = "", cur.isAdsPayment = !0, cur.paymentAccountId = this.options.payment_union_id;
                    var i = cur.submitPaymentSystemsForm(e, t.request_without_fee ? 0 : t.fee, !0);
                    Object(s.a)("payments", "", "ads", e, "start"), this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), this.goToScreen(this.paymentResultScreenElement), this.waitForPaymentResult({
                        ajaxParams: {
                            source: "ads",
                            ads_union_id: this.options.payment_union_id,
                            type: e,
                            hash: t.check_hash
                        },
                        paymentPopup: i
                    }), re(n), re(o)
                }
            }, e.prototype.setPaymentResultScreen = function(e, t, n) {
                var o = this;
                this.paymentResultTitleElement.innerHTML = e, this.paymentResultSubtitleElement.innerHTML = t;
                var s = geByClass1(this.classname("payment-result-icon_visible"), this.paymentResultElement),
                    i = geByClass1(this.classname("payment-result-icon_hidden"), this.paymentResultElement);
                if (!hasClass(s, this.classname("payment-result-icon_") + n)) {
                    ["success", "error", "wait"].map(function(e) {
                        removeClass(i, o.classname("payment-result-icon_") + e)
                    }), addClass(i, this.classname("payment-result-icon_") + n), removeClass(i, this.classname("payment-result-icon_hidden")), addClass(i, this.classname("payment-result-icon_visible")), addClass(s, this.classname("payment-result-icon_hidden")), removeClass(s, this.classname("payment-result-icon_visible")), toggleClass(this.paymentResultIconContainerElement, this.classname("payment-result-icon-container_animated"), "wait" === n)
                }
                this.hidePaymentResultScreenButton()
            }, e.prototype.setPaymentResultScreenButton = function(e, t) {
                e || t ? (this.paymentResultButtonElement.innerHTML = e, this.paymentResultButtonElement.href = t, show(this.paymentResultButtonContainerElement)) : hide(this.paymentResultButtonContainerElement)
            }, e.prototype.hidePaymentResultScreenButton = function() {
                this.setPaymentResultScreenButton()
            }, e.frameMessage = function(t) {
                if (!t.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?paymentgate\.ru$/) && !t.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?money\.mail\.ru$/)) return !1;
                var n = {};
                t.data && "{" === t.data.substr(0, 1) && "billing" !== (n = Object(o.l)(t.data)).type || ("submit" === t.data || "3dsPage" === n.action ? setTimeout(e.setCardFrameHeight.pbind(600), 200) : "3dsFinish" === n.action ? e.setCardFrameHeight() : "resizeFrame" === n.action && setTimeout(e.setCardFrameHeight.pbind(n.action_params.height), 200))
            }, e.prototype.setPaymentIFrameHtml = function(e) {
                var t = ce("iframe", {
                    id: "card_iframe",
                    name: "card_iframe"
                }, {
                    border: 0,
                    width: "100%",
                    height: "404px",
                    overflowX: "hidden",
                    overflowY: "hidden"
                });
                t.frameBorder = 0, this.cardPaymentIframeContainerElement.innerHTML = "", this.cardPaymentIframeContainerElement.appendChild(t), t.contentWindow.document.open("text/html", "replace"), t.contentWindow.document.write(e), t.contentWindow.document.close()
            }, e.setCardFrameHeight = function(e) {
                var t = ge("card_iframe");
                e ? (e = Math.max(e, 250) + 15, cur.prevFrameHeight = t.style.height, t.style.height = e + "px") : t.style.height = cur.prevFrameHeight
            }, e.prototype.initSettingsScreen = function() {
                var e = this,
                    t = void 0,
                    n = void 0;
                t = geByClass1(this.classname("input-duration"), this.settingsScreenElement), n = [], this.options.days.map(function(e) {
                    return n.push([e, langNumeric(e, getLang("ads_edit_easy_promote_settings_duration", "raw"), !0)])
                }), this.durationDropdown = new Dropdown(t, n, {
                    width: 320,
                    height: 125,
                    selectedItem: this.options.duration_selected,
                    big: !0,
                    onChange: function() {
                        e.updateTotalBudget(), e.updateTargetParams()
                    }
                }), t = geByClass1(this.classname("input-daily-limit"), this.settingsScreenElement), n = [], this.options.daily_limits.map(function(e) {
                    return n.push([e, langNumeric(e, getLang("global_money_amount_rub", "raw"), !0)])
                }), this.dailyLimitDropdown = new Dropdown(t, n, {
                    width: 320,
                    height: 125,
                    selectedItem: this.options.daily_limit_selected,
                    big: !0,
                    onChange: function() {
                        e.updateTotalBudget(), e.updateTargetParams()
                    }
                }), t = geByClass1(this.classname("input-audience"), this.settingsScreenElement), this.audienceDropdown = new Dropdown(t, Object.values(this.options.audiences), {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    introText: getLang("ads_edit_easy_promote_select_audience"),
                    placeholder: getLang("ads_edit_easy_promote_select_audience"),
                    selectedItem: this.options.audience_selected,
                    onChange: this.onCriteriaPresetChanged.bind(this)
                }), t = geByClass1(this.classname("link-edit-audience"), this.settingsScreenElement), addEvent(t, "click", this.editAudience.bind(this)), t = geByClass1(this.classname("link-edit-audience-save"), this.settingsScreenElement), addEvent(t, "click", this.editAudienceName.bind(this, !0)), t = geByClass1(this.classname("link-edit-audience-cancel"), this.settingsScreenElement), addEvent(t, "click", this.editAudienceName.bind(this, !1));
                var o = {
                    0: getLang("ads_geo_type_regions"),
                    1: getLang("ads_geo_type_points")
                };
                geByClass(this.classname("geo-type-checkbox"), this.settingsScreenElement).map(function(t) {
                    var n = t.getAttribute("value"),
                        s = o[n];
                    new Radiobutton(t, {
                        width: e.getTextWidth(s) + 25,
                        label: s,
                        onSelect: function(t) {
                            toggle(e.geoContainerRegionsElement, 0 == t), toggle(e.geoContainerPointsElement, 1 == t), e.geoEditor && !e.geoEditor.inited && 1 == t && e.geoEditorInitBound(), e.updateTargetParams()
                        }
                    })
                }), Radiobutton.select("ads_targeting_criterion_geo_type", this.options.geo_type_selected), t = geByClass1(this.classname("input-geo-country"), this.settingsScreenElement), this.geoCountryDropdown = new Dropdown(t, this.options.countries, {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    selectedItem: this.options.country_selected,
                    onChange: function(t) {
                        e.updateGeoRegionDropdown(), e.updateTargetParams()
                    }
                }), t = geByClass1(this.classname("input-geo-region"), this.settingsScreenElement), this.geoRegionDropdown = new Autocomplete(t, this.getGeoRegionURL(), {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    maxItems: 100,
                    introText: getLang("ads_starttypingname_city_region"),
                    placeholder: getLang("ads_starttypingname_city_region"),
                    disabledText: getLang("ads_first_select_country"),
                    onTagAdd: this.updateTargetParams.bind(this, !1),
                    onTagRemove: function() {
                        e.updateGeoRegionDropdown(), e.updateTargetParams()
                    }
                }), this.updateGeoRegionDropdown();
                var s = {
                    0: getLang("search_adv_any_sex"),
                    1: getLang("Sex_fm"),
                    2: getLang("Sex_m")
                };
                geByClass(this.classname("sex-checkbox"), this.settingsScreenElement).map(function(t) {
                    var n = s[t.getAttribute("value")];
                    new Radiobutton(t, {
                        width: e.getTextWidth(n) + 25,
                        label: n,
                        onSelect: e.updateTargetParams.bind(e, !1)
                    })
                }), Radiobutton.select("ads_targeting_criterion_sex", this.options.sex_selected), t = geByClass1(this.classname("input-age-from"), this.settingsScreenElement), this.ageFromDropdown = new Dropdown(t, this.getAgeSelectorData(this.options.ages.min, this.options.ages.to_selected || this.options.ages.max, getLang("ads_age_from")), {
                    width: 155,
                    big: !0,
                    selectedItem: this.options.ages.from_selected,
                    onChange: function() {
                        e.updateAgeSelectors(), e.updateTargetParams()
                    }
                }), t = geByClass1(this.classname("input-age-to"), this.settingsScreenElement), this.ageToDropdown = new Dropdown(t, this.getAgeSelectorData(this.options.ages.from_selected || this.options.ages.min, this.options.ages.max, getLang("ads_age_to")), {
                    width: 155,
                    big: !0,
                    selectedItem: this.options.ages.to_selected,
                    onChange: function() {
                        e.updateAgeSelectors(), e.updateTargetParams()
                    }
                }), t = geByClass1(this.classname("input-interests"), this.settingsScreenElement), this.interestsDropdown = new Autocomplete(t, this.options.interests, {
                    width: 320,
                    big: !0,
                    autocomplete: !0,
                    maxItems: 100,
                    introText: getLang("ads_select_interest_category"),
                    placeholder: getLang("ads_select_interest_category"),
                    onTagAdd: this.updateTargetParams.bind(this, !1),
                    onTagRemove: this.updateTargetParams.bind(this, !1)
                }), hide(this.interestsDropdown.container), addClass(gpeByClass(this.classname("row-content"), this.interestsDropdown.container), this.classname("row-content_simple")), this.interestsShowerLink = geByClass1(this.classname("input-interests-show"), this.settingsScreenElement), show(this.interestsShowerLink), addEvent(this.interestsShowerLink, "click", this.showInterestsDropdown.bind(this)), t = geByClass1(this.classname("input-groups"), this.settingsScreenElement), this.groupsDropdown = new Autocomplete(t, "/adsedit?act=search_user_objects&section=groups&group_purpose=criteria", {
                    width: 320,
                    big: !0,
                    withIcons: !0,
                    introText: getLang("ads_type_community"),
                    placeholder: getLang("ads_type_community"),
                    autocomplete: !0,
                    maxItems: 100,
                    onTagAdd: this.updateTargetParams.bind(this, !1),
                    onTagRemove: this.updateTargetParams.bind(this, !1)
                }), this.groupsDropdown.setOptions({
                    defaultItems: this.options.groups_default
                }), hide(this.groupsDropdown.container), addClass(gpeByClass(this.classname("row-content"), this.groupsDropdown.container), this.classname("row-content_simple")), this.groupShowerLink = geByClass1(this.classname("input-groups-show"), this.settingsScreenElement), show(this.groupShowerLink), addEvent(this.groupShowerLink, "click", this.showGroupsDropdown.bind(this)), this.geoEditor = new AdsGeoEditor;
                var i = {
                        defaultRadius: this.options.geo.default_radius,
                        expandMapButton: !1,
                        allowedRadiuses: this.options.geo.allowed_radiuses,
                        locale: this.options.geo.locale,
                        defaultMask: this.options.geo.mask,
                        defaultMapCenter: {
                            lat: this.options.geo.default_center[0],
                            lon: this.options.geo.default_center[1]
                        }
                    },
                    a = {
                        onPointAdded: this.onGeoEditorPointAdded.bind(this),
                        onPointRemoved: this.onGeoEditorPointRemoved.bind(this),
                        onPointUpdated: this.onGeoEditorPointUpdated.bind(this),
                        onLoaded: this.onGeoEditorLoaded.bind(this)
                    },
                    _ = geByClass1(this.classname("geo-map"), this.settingsScreenElement);
                this.geoEditorInitBound = this.geoEditor.init.bind(this.geoEditor, _, i, a), t = geByClass1(this.classname("input-geo-places"), this.settingsScreenElement), this.geoPlacesList = new Autocomplete(t, "", {
                    width: 320,
                    big: !0,
                    withIcons: !1,
                    introText: getLang("ads_edit_ad_geo_map_address_placeholder"),
                    placeholder: getLang("ads_edit_ad_geo_map_address_placeholder"),
                    nativePlaceholder: !0,
                    hidePlaceholderOnSelected: !1,
                    dropdown: !1,
                    listStyle: !0,
                    limitedListHeight: !0,
                    selectable: !1,
                    autocomplete: !0,
                    maxItems: 100,
                    selectedItemsDelimiter: ";",
                    onTagAdd: this.onGeoInputPointAdded.bind(this),
                    onTagRemove: this.onGeoInputPointRemoved.bind(this)
                }), this.updateGeoPlacesList(), this.geoPlacesList.updateInput(), addEvent(this.audienceSettingsElement, "click", function(t) {
                    if (hasClass(t.target, "ui_actions_menu_item")) {
                        var n = t.target.getAttribute("data-radius"),
                            o = gpeByClass("token", data(gpeByClass("ui_actions_menu_dummy_wrap", t.target), "origMenu"));
                        e.geoEditor.setPointRadius(o.getAttribute("data-id"), n), e.geoEditor.updateMap(o.getAttribute("data-id"))
                    }
                }), this.updateTotalBudget(), this.updateExpectedReach(), addEvent(this.settingsScreenElement, "scroll", requestAnimationFrame.pbind(this.updateSettingsScreenFixedRow.bind(this))), this.updateSettingsScreenFixedRow(), Object.keys(this.options.user_offices).length > 0 ? (addEvent(this.audienceMenuDotsElement, "click", this.onAudienceMenuItemClicked.bind(this)), addEvent(this.audienceNameInput, "keydown", function(t) {
                    if (t.which == KEY.ENTER) return e.editAudienceName(!0), !1
                })) : hide(this.audienceMenuDotsElement), this.settingsScreenInitialized = !0, this.onCriteriaPresetChanged(this.audienceDropdown.val()), this.updateTargetParams()
            }, e.prototype.initMoreSettingsScreen = function() {
                var e = this,
                    t = void 0;
                if (Object.keys(this.options.user_offices).length > 1) {
                    t = geByClass1(this.classname("input-union-id"), this.moreSettingsScreenElement);
                    var n = [];
                    Object.keys(this.options.user_offices).map(function(t) {
                        var o = e.options.user_offices[t],
                            s = [t, stripHTML(o.name), 0, 0];
                        "budget_result" in o && (s[2] = langNumeric(intval(o.budget_result), getLang("global_money_amount_rub", "raw"), !0)), o.child_offices ? (s[3] = "label", s[5] = "1", n.push(s), o.child_offices.map(function(e) {
                            n.push([e.union_id, stripHTML(e.name)])
                        })) : n.push(s)
                    }), this.moreSettingsOfficeDropdown = new Dropdown(t, n, {
                        width: 320,
                        big: !0,
                        autocomplete: !0,
                        introText: getLang("ads_select_office"),
                        placeholder: getLang("ads_select_office"),
                        includeLabelsOnMatch: !0,
                        preventDuplicates: !0,
                        selectedItem: this.options.selected_union_id,
                        onChange: function(t) {
                            "" !== t ? e.options.selected_union_id = t : e.moreSettingsOfficeDropdown.selectItem(e.options.selected_union_id || e.options.selected_union_id)
                        }
                    })
                }
                t = geByClass1(this.classname("input-category-id"), this.moreSettingsScreenElement), this.moreSettingsCategoryDropdown = new Dropdown(t, this.options.categories, {
                    introText: getLang("ads_select_category"),
                    placeholder: getLang("ads_select_category"),
                    big: !0,
                    autocomplete: !0,
                    indexkeys: [1, 4],
                    includeLabelsOnMatch: !0,
                    preventDuplicates: !0,
                    width: 320,
                    onChange: function(t) {
                        e.options.category_selected = t
                    }
                })
            }, e.prototype.updateMoreSettingsScreen = function(e) {
                var t = this.moreSettingsRequiredComponents(e),
                    n = t.categoryRequired,
                    o = t.officeRequired;
                toggle(this.moreSettingsCategoryIdRowElement, n), toggle(this.moreSettingsOfficeSwitcherRowElement, o), this.moreSettingsSubtitleElement.innerHTML = "", this.moreSettingsOfficeLabelElement.innerHTML = "", this.moreSettingsCategoryLabelElement.innerHTML = "", n && o ? (this.moreSettingsSubtitleElement.innerHTML = getLang("ads_edit_easy_promote_more_settings_subtitle"), this.moreSettingsOfficeLabelElement.innerHTML = getLang("ads_edit_easy_promote_choose_office_short"), this.moreSettingsCategoryLabelElement.innerHTML = getLang("ads_edit_easy_promote_choose_category_short")) : n ? this.moreSettingsSubtitleElement.innerHTML = getLang("ads_edit_easy_promote_choose_category") : o && (this.moreSettingsSubtitleElement.innerHTML = getLang("ads_edit_easy_promote_choose_office"))
            }, e.prototype.moreSettingsRequiredComponents = function(e) {
                var t = this.getUpdateTargetParams();
                return {
                    categoryRequired: !t.category1_id && !t.category2_id,
                    officeRequired: Object.keys(this.options.user_offices).length > 1 && e
                }
            }, e.prototype.moreSettingsRequired = function(e) {
                var t = this.moreSettingsRequiredComponents(e),
                    n = t.categoryRequired;
                return t.officeRequired || n
            }, e.prototype.editAudience = function() {
                return addClass(this.imageElement, this.classname("image_animated")), setTimeout(addClass.pbind(this.imageElement, this.classname("image_hidden")), 700), setTimeout(addClass.pbind(this.settingsScreenElement, this.classname("screen_settings-tall")), 700), hide(this.editAudienceLinkWrapperElement), show(this.audienceSettingsElement), show(this.budgetTitleRowElement), this.updateSettingsScreenFixedRow(), this.geoEditor.inited || 1 != Radiobutton.val("ads_targeting_criterion_geo_type") || this.geoEditorInitBound(), this.editingAudience = !0, !1
            }, e.prototype.editAudienceName = function(e) {
                var t = val(this.audienceNameInput).trim();
                if (e && !t) return notaBene(this.audienceNameInput), elfocus(this.audienceNameInput), !1;
                if (hide(this.audienceNameInput), show(this.audienceDropdown.container), show(this.audienceMenuDotsElement), hide(this.editAudienceNameLinksWrapperElement), this.editingAudience || show(this.editAudienceLinkWrapperElement), e) {
                    var n = this.audienceDropdown.val().split("_"),
                        o = i(n, 2),
                        s = o[0];
                    o[1];
                    this.editCriteriaPreset(s, 0, t, 0)
                }
                return this.isEditingAudienceName = !1, !1
            }, e.prototype.isSuggestedCriteria = function(e) {
                if (!this.options.suggested_criteria) return !1;
                for (var t = ["sex", "age_from", "age_to", "cities", "country", "interest_categories", "geo_near", "groups"], n = 0; n < t.length; n++) {
                    var o = t[n],
                        s = this.options.suggested_criteria[o];
                    if (s || (s = !1), s != e[o]) return !1
                }
                return !0
            }, e
        }();
        try {
            stManager.done(jsc("web/ads_edit_easy.js"))
        } catch (e) {}
    }
});