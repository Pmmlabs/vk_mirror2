! function(e) {
    function t(t) {
        for (var r, o, s = t[0], c = t[1], u = t[2], _ = 0, l = []; _ < s.length; _++) o = s[_], i[o] && l.push(i[o][0]), i[o] = 0;
        for (r in c) Object.prototype.hasOwnProperty.call(c, r) && (e[r] = c[r]);
        for (d && d(t); l.length;) l.shift()();
        return a.push.apply(a, u || []), n()
    }

    function n() {
        for (var e, t = 0; t < a.length; t++) {
            for (var n = a[t], r = !0, s = 1; s < n.length; s++) {
                var c = n[s];
                0 !== i[c] && (r = !1)
            }
            r && (a.splice(t--, 1), e = o(o.s = n[0]))
        }
        return e
    }
    var r = {},
        i = {
            "web/notifier": 0
        },
        a = [];

    function o(t) {
        if (r[t]) return r[t].exports;
        var n = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, o), n.l = !0, n.exports
    }
    o.m = e, o.c = r, o.d = function(e, t, n) {
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
            for (var r in e) o.d(n, r, function(t) {
                return e[t]
            }.bind(null, r));
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
    }, o.p = "";
    var s = window.webpackJsonp = window.webpackJsonp || [],
        c = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var u = 0; u < s.length; u++) t(s[u]);
    var d = c;
    a.push([100, "7f81047508570d6456c7d33e2e3c0bc3", "b459a6fdd4abe926f4e4ca100471ca63", "075e72e66ff59d27b023e4956acea75e"]), n()
}({
    100: function(e, t, n) {
        e.exports = n("8S/u")
    },
    "1y80": function(e, t, n) {
        "use strict";

        function r(e, t, n, r, i) {
            return window.statlogsValueEvent(e, t, n, r, i)
        }

        function i(e) {
            return Math.random() < e
        }

        function a(e, t, n, a, o, s) {
            i(e) && r(t, n, a, o, s)
        }
        n.d(t, "c", function() {
            return r
        }), n.d(t, "a", function() {
            return i
        }), n.d(t, "b", function() {
            return a
        })
    },
    "86+7": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return i
        }), n.d(t, "c", function() {
            return a
        }), n.d(t, "a", function() {
            return o
        });
        var r = n("aong");

        function i(e, t) {
            return t in Object(r.r)(e).oCache
        }

        function a(e, t) {
            var n = Object(r.r)(e).oCache[t];
            return n && !n._n && (! function(e) {
                if (!e.first_name) {
                    var t = e.name.split(" ", 2);
                    e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
                }
                e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
            }(n), n._n = 1), n
        }

        function o(e, t) {
            var n = Object(r.r)(e);
            n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
        }
    },
    "8S/u": function(e, t, n) {
        "use strict";

        function r(e) {
            this.started = !1, this.is_idle = !0, this.is_activated = !1, this.activeTimeStart = null, this.cbActiveB = this.cbActive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.opts = extend({
                triggerEvents: "mousemove keydown",
                onIdleCb: function() {},
                onUnIdleCb: function() {},
                focusElement: e.element,
                element: null,
                idleTimeout: 3e4
            }, e)
        }

        function i(e, t) {
            var n = !1,
                r = void 0,
                i = void 0;
            if (!e) throw new Error("Undefined filename");
            t = t || {};
            try {
                n = !!(i = ce("audio")).canPlayType, "no" != i.canPlayType("audio/mpeg") && "" != i.canPlayType("audio/mpeg") ? r = ".mp3?1" : "no" == i.canPlayType('audio/ogg; codecs="vorbis"') || "" == i.canPlayType('audio/ogg; codecs="vorbis"') || t.forceMp3 ? n = !1 : r = ".ogg?1"
            } catch (e) {}
            var a = t.forcePath || "/" + e + r;
            if (n) {
                i.src = a;
                var o = !1;
                i.addEventListener("ended", function() {
                    o = !0
                }, !0), i.load(), this.playSound = function() {
                    o && i.load();
                    try {
                        var e = i.play();
                        e && e.catch(function(e) {
                            debugLog(e)
                        })
                    } catch (e) {}
                    o = !1
                }, this.pauseSound = function() {
                    var e = i.pause();
                    e && e.catch(function(e) {
                        debugLog(e)
                    })
                }
            } else {
                cur.__sound_guid = cur.__sound_guid || 0;
                var s = ge("flash_sounds_wrap") || utilsNode.appendChild(ce("span", {
                        id: "flash_sounds_wrap"
                    })),
                    c = "flash_sound_" + cur.__sound_guid++;
                if (renderFlash(s, {
                        url: "/swf/audio_lite.swf?4",
                        id: c
                    }, {
                        swliveconnect: "true",
                        allowscriptaccess: "always",
                        wmode: "opaque"
                    }, {})) {
                    var u = browser.msie ? window[c] : document[c],
                        d = !1,
                        _ = setInterval(function() {
                            if (u && u.paused) try {
                                u.setVolume(1), u.loadAudio(a), u.pauseAudio()
                            } catch (e) {
                                debugLog(e)
                            }
                            d = !0, clearInterval(_)
                        }, 300);
                    this.playSound = function() {
                        d && u.playAudio(0)
                    }, this.pauseSound = function() {
                        d && u.pauseAudio()
                    }
                }
            }
        }
        n.r(t), extend(r.prototype, EventEmitter.prototype), extend(r.prototype, {
            stop: function() {
                this.started = !1, removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), removeEvent(this.opts.focusElement, "focus", this.cbActiveB), removeEvent(this.opts.focusElement, "blur", this.cbInactiveB), clearTimeout(this.setIdleTo), clearTimeout(this.checkIdleCbTo), clearTimeout(this.sendCbTO), this.is_idle = !0, this.opts.parentManager && this.opts.parentManager.off("idle", this.cbInactiveB)
            },
            idle: function(e) {
                this.is_idle = !0, e || this.opts.onIdleCb(), this.emit("idle")
            },
            unidle: function(e) {
                this.is_idle = !1, e || this.opts.onUnIdleCb(), this.emit("unidle")
            },
            activate: function() {
                this.is_idle = !1, this.is_activated = !0
            },
            start: function() {
                this.started = !0, browser.mobile || (this.opts.parentManager && this.opts.parentManager.on("idle", this.cbInactiveB), addEvent(this.opts.focusElement, "focus", this.cbActiveB), addEvent(this.opts.focusElement, "blur", this.cbInactiveB), clearTimeout(this.checkIdleCbTo), this.checkIdleCb(), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
            },
            checkIdleCb: function() {
                this.started && (addEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.setIdleTo), this.setIdleTo = setTimeout(this.cbInactiveB, this.opts.idleTimeout))
            },
            cbActive: function() {
                this.started && (this.activeTimeStart = (new Date).getTime(), clearTimeout(this.setIdleTo), this.is_idle && (this.is_idle = !1, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                    this.emit("unidle"), this.opts.onUnIdleCb && this.opts.onUnIdleCb()
                }.bind(this), 100)), removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.checkIdleCbTo), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
            },
            cbInactive: function() {
                this.started && (this.activeTimeStart = null, this.is_idle || (this.is_idle = !0, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                    this.emit("idle"), this.opts.onIdleCb && this.opts.onIdleCb()
                }.bind(this), 100)), clearTimeout(this.checkIdleCbTo), removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), addEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), this.checkIdleCbTo = setTimeout(this.checkIdleCb, this.opts.idleTimeout))
            },
            getActiveTime: function() {
                return !this.is_idle && this.activeTimeStart ? (new Date).getTime() - this.activeTimeStart : 0
            }
        }), window.IdleManager = r, i.prototype = {
            play: function() {
                try {
                    this.playSound()
                } catch (e) {}
            },
            pause: function() {
                try {
                    this.pauseSound()
                } catch (e) {}
            }
        }, window.Sound = i, window.curRBox || (window.curRBox = {
            guid: 0,
            active: !1,
            focused: [],
            tabs: {}
        });

        function a(e, t) {
            var n = this;
            n.options = t = extend({
                minH: 50,
                minW: 50
            }, t), n.content = e;
            var r = n.id = "rb_box_" + (t.id || curRBox.guid++);
            n.wrap = ce("div", {
                id: r,
                className: "rb_box_wrap fixed" + (t.fixed ? " fc_fixed" : "")
            });
            var i = {};
            n.toBottom = n.toRight = !1, t.fixed ? (i.bottom = 0, i.right = 72) : (void 0 !== t.startTop ? i.top = t.startTop : void 0 !== t.startBottom && (i.bottom = t.startBottom), void 0 !== t.startLeft ? i.left = t.startLeft : void 0 !== t.startRight && (i.right = t.startRight)), setStyle(n.wrap, i), t.movable && addEvent(t.movable, "mousedown", n._head_mdown.bind(n)), n.resizeableH = t.resizeableH || e, t.startHeight && setStyle(n.resizeableH, "height", t.startHeight), n.resizeableW = t.resizeableW || e, t.startWidth && setStyle(n.resizeableW, "width", t.startWidth), addEvent(e, "mousedown", n._cont_mdown.bind(n)), t.closer && (addEvent(t.closer, "mousedown", n._close_mdown.bind(n)), addEvent(t.closer, "click", n._close_click.bind(n))), t.hider && (addEvent(t.hider, "mousedown", n._close_mdown.bind(n)), addEvent(t.hider, "click", n._hide_click.bind(n))), t.minimizer && !0 !== t.minimizer && (addEvent(t.minimizer, "mousedown", n._close_mdown.bind(n)), addEvent(t.minimizer, "click", n._min_toggle.bind(n))), n.wrap.appendChild(e), !1 !== t.resize && (n.resizeWrap = ce("div", {
                className: "rb_resize_wrap",
                innerHTML: '<div class="chats_sp rb_resize"></div>'
            }), n.wrap.appendChild(n.resizeWrap), addEvent(n.resizeWrap, "mousedown", n._resize_mdown.bind(n))), t.minimized && (addClass(n.wrap, "rb_minimized"), n.minimized = !0), bodyNode.insertBefore(n.wrap, ge("page_wrap"));
            var a = getStyle(n.wrap, "top"),
                o = getStyle(n.wrap, "bottom"),
                s = getStyle(n.wrap, "left"),
                c = getStyle(n.wrap, "right");
            this.toBottom = ("auto" === a || "" === a || browser.msie && 0 === a) && "auto" != o && "" !== o && !(browser.msie && 0 === o), this.toRight = ("auto" === s || "" === s || browser.msie && 0 === s) && "auto" != c && "" !== c && !(browser.msie && 0 === c), this.toRight && setStyle(n.wrap, {
                marginRight: lastWndScroll[0] ? sbWidth() : 0
            }), (t.nofocus || t.noshow) && addClass(n.wrap, "rb_inactive"), this.toBottom && (setStyle(n.wrap, {
                marginRight: lastWndScroll[0] ? sbWidth() : 0
            }), addClass(n.wrap, "fc_tobottom")), this.options.marginFixedToLayer && setStyle(n.wrap, {
                marginRight: hasClass(document.body, "layers_shown") ? sbWidth() : 0
            }), curRBox.tabs[r] = n, n.pos = !1, t.noshow ? (setStyle(n.wrap, {
                visibility: "hidden",
                display: "block"
            }), n._update_pos(), setStyle(n.wrap, {
                visibility: "",
                display: ""
            })) : n.show(!1, t.nofocus)
        }
        extend(a.prototype, {
            show: function(e) {
                function t(t, n) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t) {
                var n = this;
                void 0 === e && (e = 0), e ? (setStyle(n.wrap, {
                    opacity: 0,
                    display: "block"
                }), n.visible = !0, !t && n.focus(), animate(n.wrap, {
                    opacity: 1
                }, e, function() {
                    setStyle(n.wrap, browser.msie ? {
                        filter: "none"
                    } : {
                        opacity: ""
                    }), n._update_pos()
                })) : (show(n.wrap), n.visible = !0, !t && n.focus(), n._update_pos()), n.options.onShow && n.options.onShow()
            }),
            hide: function(e) {
                function t(t, n, r) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t, n) {
                var r = this;
                if (!t && r.options.onBeforeHide && r.options.onBeforeHide()) return !0;
                void 0 === e && (e = 0), e ? (setStyle(r.wrap, {
                    opacity: 1,
                    display: "block"
                }), animate(r.wrap, {
                    opacity: 0
                }, e, function() {
                    hide(r.wrap), setStyle(r.wrap, browser.msie ? {
                        filter: "none"
                    } : {
                        opacity: ""
                    })
                })) : hide(r.wrap), r.visible = !1, !t && r.options.onHide && r.options.onHide(n || {})
            }),
            _head_mdown: function(e) {
                if (!checkEvent(e)) {
                    (e.originalEvent || e).cancelBubble = !0;
                    var t, n, r = this,
                        i = e.target,
                        a = getWndInner(),
                        o = curRBox.active == r.id,
                        s = e.pageY,
                        c = e.pageX,
                        u = r.wrap.offsetHeight,
                        d = r.wrap.offsetWidth,
                        _ = 0,
                        l = 0,
                        f = a[0] - u,
                        h = a[1] - d,
                        p = browser.msie ? "selectstart" : "mousedown";
                    r.options.fixed && FastChat.pinTab(r.options.peer || -1, e, !0), o || r.focus(e), r.toBottom ? (r.toBottom = !1, t = a[0] - intval(getStyle(r.wrap, "bottom")) - u, setStyle(r.wrap, {
                        top: t,
                        bottom: "auto"
                    }), removeClass(r.wrap, "fc_tobottom")) : t = intval(getStyle(r.wrap, "top")), r.toRight ? (r.toRight = !1, n = a[1] - intval(getStyle(r.wrap, "right")) - d, setStyle(r.wrap, {
                        left: n,
                        right: "auto"
                    })) : n = intval(getStyle(r.wrap, "left")), _ = t, l = n, cur._fcdrag = 1;
                    var m = function(e) {
                        return _ = Math.max(0, Math.min(f, t + e.pageY - s)), f - _ < 10 ? _ = f : _ < 10 && (_ = 0), r.wrap.style.top = _ + "px", l = Math.max(0, Math.min(h, n + e.pageX - c)), h - l < 10 ? l = h : l < 10 && (l = 0), r.wrap.style.left = l + "px", cancelEvent(e)
                    };
                    return addEvent(document, "mousemove", m), addEvent(document, "mouseup", function e(t) {
                        cur._fcdrag = 0, removeEvent(document, "mousemove", m), removeEvent(document, "mouseup", e), removeEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(i, "cursor", ""), (r.toBottom = _ >= f - 5) && (setStyle(r.wrap, {
                            top: "auto",
                            bottom: 0
                        }), addClass(r.wrap, "fc_tobottom")), (r.toRight = l >= h - 5) && setStyle(r.wrap, {
                            left: "auto",
                            right: 0,
                            marginRight: lastWndScroll[0] ? sbWidth() : 0
                        }), r._update_pos();
                        var n = Math.abs(t.pageY - s) < 3 && Math.abs(t.pageX - c) < 3;
                        cur._fcpromo > 0 ? cur._fcpromo = n ? 0 : -1 : r.options.minimizer && n ? !r.minimized && o ? r.minimize(!0) : r.minimized && r.unminimize(!0) : r.options.onDragEnd && r.options.onDragEnd(r.toBottom ? -1 : _ / a[0], r.toRight ? -1 : l / a[1])
                    }), addEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(i, "cursor", "move"), !1
                }
            },
            _resize_mdown: function(e) {
                if (!checkEvent(e)) {
                    this.focus(e);
                    var t, n, r = this,
                        i = e.target,
                        a = getWndInner(),
                        o = e.pageY,
                        s = e.pageX,
                        c = r.wrap.offsetHeight,
                        u = r.wrap.offsetWidth,
                        d = 0,
                        _ = 0,
                        l = r.resizeableH.clientHeight - intval(getStyle(r.resizeableH, "paddingBottom")) - intval(getStyle(r.resizeableH, "paddingTop")),
                        f = r.resizeableW.clientWidth - intval(getStyle(r.resizeableW, "paddingRight")) - intval(getStyle(r.resizeableW, "paddingLeft")),
                        h = browser.msie ? "selectstart" : "mousedown",
                        p = !browser.msie && r.options.onResize || !1;
                    r.toBottom ? (r.toBottom = !1, t = a[0] - intval(getStyle(r.wrap, "bottom")) - c, setStyle(r.wrap, {
                        top: t,
                        bottom: "auto"
                    }), removeClass(r.wrap, "fc_tobottom")) : t = intval(getStyle(r.wrap, "top")), r.toRight ? (r.toRight = !1, n = a[1] - intval(getStyle(r.wrap, "right")) - u, setStyle(r.wrap, {
                        left: n,
                        right: "auto"
                    })) : n = intval(getStyle(r.wrap, "left")), r.options.onResizeStart && r.options.onResizeStart(l, f);
                    var m = l + a[0] - t - c,
                        b = f + a[1] - n - u,
                        g = function(e) {
                            return d = Math.max(r.options.minH, Math.min(m, l + e.pageY - o)), m - d < 10 && (d = m), r.resizeableH.style.height = d + "px", _ = Math.max(r.options.minW, Math.min(b, f + e.pageX - s)), b - _ < 10 && (_ = b), r.resizeableW.style.width = _ + "px", p && p(d, _), cancelEvent(e)
                        };
                    return addEvent(document, "mousemove", g), addEvent(document, "mouseup", function e(t) {
                        removeEvent(document, "mousemove", g), removeEvent(document, "mouseup", e), removeEvent(document, h, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(i, "cursor", ""), (r.toBottom = d == m) && (setStyle(r.wrap, {
                            top: "auto",
                            bottom: 0
                        }), addClass(r.wrap, "fc_tobottom")), (r.toRight = _ == b) && setStyle(r.wrap, {
                            left: "auto",
                            right: 0,
                            marginRight: lastWndScroll[0] ? sbWidth() : 0
                        }), r._update_pos(), r.options.onResizeEnd && r.options.onResizeEnd(d, _, a[0], a[1], r.toBottom, r.toRight)
                    }), addEvent(document, h, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(i, "cursor", "move"), !1
                }
            },
            _update_pos: function() {
                var e = this;
                e.pos = [e.wrap.offsetTop, e.wrap.offsetLeft, e.wrap.offsetHeight, e.wrap.offsetWidth]
            },
            _wnd_resize: function(e, t, n) {
                var r = this;
                r.toBottom && (r.pos[0] = r.wrap.offsetTop), r.toRight && (r.pos[1] = r.wrap.offsetLeft);
                var i = {},
                    a = !1,
                    o = !1,
                    s = r.pos[0] + r.pos[2] - e,
                    c = r.pos[0],
                    u = r.resizeableH.clientHeight - r.options.minH,
                    d = r.pos[1] + r.pos[3] - t,
                    _ = r.pos[1],
                    l = !1 !== r.options.resize ? r.resizeableW.clientWidth - r.options.minW : 0;
                n && (l < 0 && setStyle(r.resizeableW, r.options.minW), u < 0 && setStyle(r.resizeableH, r.options.minH)), (s <= 0 || c <= 0 && u <= 0) && (d <= 0 || _ <= 0 && l <= 0) || (s > 0 && c > 0 && (s -= c = Math.min(s, c), i.top = r.pos[0] - c, i.bottom = ""), s > 0 && u > 0 && (u = Math.min(s, u), a = r.resizeableH.clientHeight - u), d > 0 && _ > 0 && (d -= _ = Math.min(d, _), i.left = r.pos[1] - _, i.right = ""), d > 0 && l > 0 && (l = Math.min(d, l), o = r.resizeableW.clientWidth - l), !1 !== o && setStyle(r.resizeableW, "width", o), !1 !== a && setStyle(r.resizeableH, "height", a), setStyle(r.wrap, i), r._update_pos(), r.options.onResize && r.options.onResize(r.resizeableH.clientHeight, r.resizeableW.clientWidth))
            },
            _cont_mdown: function(e) {
                if (curRBox.active != this.id && (this.focus(e), !hasClass(e.target, "fc_editable"))) return cancelEvent(e)
            },
            _focus: function() {
                var e = this,
                    t = indexOf(curRBox.focused, e.id),
                    n = curRBox.active,
                    r = n && curRBox.tabs[n];
                if (n != e.id) {
                    r && isFunction(r.options.onBlur) && r.options.onBlur(), -1 != t && curRBox.focused.splice(t, 1), curRBox.focused.unshift(e.id);
                    var i = 1e4 + curRBox.focused.length,
                        a = !0;
                    each(curRBox.focused, function(e, t) {
                        var n = curRBox.tabs[t].wrap;
                        a ? (addClass(n, "rb_active"), removeClass(n, "rb_inactive"), curRBox.active = t, a = !1) : (removeClass(n, "rb_active"), addClass(n, "rb_inactive")), setStyle(n, "zIndex", i), i--
                    })
                }
            },
            _hide_click: function() {
                this.hide()
            },
            minimize: function(e) {
                var t = this,
                    n = t.wrap;
                if (t.options.fixed) return !1;
                addClass(n, "rb_minimized"), t.minimized = !0, t._update_pos(), e && t.options.onMinimize && t.options.onMinimize(0)
            },
            unminimize: function(e) {
                var t = this,
                    n = t.wrap,
                    r = getWndInner();
                removeClass(n, "rb_minimized"), t.minimized = !1, t._update_pos(), t._wnd_resize(r[0], r[1], !0), curRBox.active = !1, t.focus(), e && t.options.onMinimize && t.options.onMinimize(1)
            },
            _min_toggle: function(e) {
                var t = this;
                setTimeout(function() {
                    t.minimized ? t.unminimize(!0) : t.minimize(!0)
                }, 50)
            },
            destroy: function() {
                var e = this,
                    t = indexOf(curRBox.focused, e.id); - 1 != t && curRBox.focused.splice(t, 1), cleanElems(e.wrap, e.resizeWrap, e.content, e.options.movable, e.options.closer, e.options.hider), re(e.wrap), delete curRBox.tabs[e.id]
            },
            _close_mdown: function(e) {
                (e.originalEvent || e).cancelBubble = !0
            },
            _close_click: function(e) {
                this.close()
            },
            _close: function(e) {
                this.destroy(), curRBox.focused[0] && !0 !== e && curRBox.tabs[curRBox.focused[0]].focus()
            },
            focus: function(e) {
                var t = this,
                    n = curRBox.active != t.id || !0;
                return t._focus(), n && isFunction(t.options.onFocus) && t.options.onFocus(e), n
            },
            close: function() {
                var e = this,
                    t = e.pos;
                e._close(), isFunction(e.options.onClose) && e.options.onClose(t)
            }
        }), window.RBox = a;
        n("zNZe");
        var o = n("uytb"),
            s = n("rjmT"),
            c = n("p3re"),
            u = n("f01n"),
            d = n("hOuX"),
            _ = n("BxOC"),
            l = n("DM26"),
            f = n("MhhX"),
            h = n("P13b"),
            p = n("vT4u"),
            m = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function b() {
            return !curFastChat.version || !curFastChat.tabs
        }
        window.curFastChat || (window.curFastChat = {}), window.FastChat = {
            init: function(e) {
                var t = this;
                0 !== vk.id && (extend(curFastChat, {
                    tabs: {},
                    needPeers: {},
                    gotPeers: {},
                    needMedia: {},
                    gotMedia: {},
                    ldb: Object(o.c)(vk.id),
                    myTypingEvents: {},
                    typingEvents: {},
                    inited: !0,
                    options: e,
                    posSeq: 0,
                    error_timeout: 1,
                    lpInstance: Notifier.getLpInstance()
                }), delete curFastChat.standby, delete curFastChat.standbyTO, curFastChat.lpInstance.onData(function() {
                    for (var e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                    var i = t.getResourcesThatShouldBeLoaded(n);
                    (i.shouldLoad ? t.loadResources(i) : Promise.resolve()).then(function() {
                        n.forEach(function(e) {
                            switch (e.type) {
                                case u.W:
                                    var n = t.getTab(e.peerId);
                                    t.setTyping(e), n && (t.updateTypings(), t.waitTyping(e).then(t.updateTypings)), t.blinkTyping(e.peerId);
                                    break;
                                case u.a:
                                    var r = t.getTab(e.peerId);
                                    t.setTyping(e), r && (t.addMessage(t.prepareMessageData(e)), t.scroll(e.peerId), t.blinkTab(e.peerId), t.updateTypings(), t.waitTyping(e).then(t.updateTypings)), t.updateTabUnreadCounter(r, e);
                                    break;
                                case u.g:
                                case u.N:
                                    var i = e.peerId,
                                        a = e.messageId,
                                        o = t.getTab(i);
                                    o && o.msgs[a] && (delete curFastChat.gotMedia[a], t.editMessage(t.prepareMessageData(e)));
                                    break;
                                case u.M:
                                case u.U:
                                case u.Q:
                                    e.flags & u.j && t.deleteMessage(t.prepareMessageData(e));
                                    break;
                                case u.H:
                                case u.I:
                                    t.markMessagesAsRead(e);
                                    break;
                                case u.d:
                                case u.e:
                                    var s = t.getTab(e.peerId);
                                    t.handleEventChatUpdated(s, e);
                                    break;
                                case u.Y:
                                case u.X:
                                case u.G:
                                case u.h:
                                case u.S:
                                case u.K:
                                case u.V:
                                case u.R:
                                case u.F:
                                case u.b:
                                case u.c:
                                case u.i:
                                case u.O:
                                case u.f:
                            }
                        })
                    })
                }), Notifier.addRecvClbk("fastchat", 0, FastChat.lcRecv, !0), Notifier.addRecvClbk("logged_off", 0, FastChat.standby, !0), FastChat.lcSend("needSettings", {
                    version: e.version,
                    lang_id: langConfig.id
                }), clearTimeout(curFastChat.getSettingsTO), curFastChat.getSettingsTO = setTimeout(FastChat.getSettings, 300))
            },
            getSettings: function() {
                var e = ls.get("fcFriends" + vk.id);
                ajax.post("al_im.php", {
                    act: "a_get_fast_chat",
                    friends: e && e.version,
                    cache_time: FastChat.cachedStickersKeywordsTime()
                }, {
                    onDone: function(t) {
                        -1 == t.friends ? (t.friends_version = e.version, t.friends = e.list) : ls.set("fcFriends" + vk.id, {
                            version: t.friends_version,
                            list: t.friends
                        }), FastChat.gotSettings(t), FastChat.sendSettings()
                    },
                    onFail: function() {
                        return !0
                    }
                })
            },
            cachedStickersKeywordsTime: function() {
                var e = ls.get("stickers_keywords");
                return e && e.time ? Math.floor(e.time / 1e3) : 0
            },
            gotSettings: function(e) {
                e.emoji_stickers && (window.emojiStickers = e.emoji_stickers), window.Emoji && Emoji.updateTabs(), e.autoplay_animations && window.StickersSettings.setAutoplay(e.autoplay_animations), clearTimeout(curFastChat.getSettingsTO), window.lang = extend(window.lang || {}, e.lang), extend(curFastChat, e, {
                    lang_id: langConfig.id
                }), curFastChat.friendsCnt = Object.keys(curFastChat.friends), setTimeout(FastChat.clistCache.pbind(!1), 10), FastChat.initUI()
            },
            sendSettings: function() {
                clearTimeout(curFastChat.sendSettingsTO);
                var e = ["friends", "friends_version", "onlines", "tpl", "lang", "me", "version"].reduce(function(e, t) {
                    return e[t] = curFastChat[t], e
                }, {});
                curFastChat.sendSettingsTO = setTimeout(function() {
                    FastChat.lcSend("settings", {
                        settings: e
                    })
                }, curNotifier.is_server ? 0 : irand(50, 100))
            },
            destroy: function() {
                return !!curFastChat.inited && (curFastChat.ldb.unmount(), each(curFastChat.tabs || {}, function(e, t) {
                    t.box.destroy()
                }), curFastChat.clistBox && curFastChat.clistBox.destroy(), each(curFastChat.el || {}, function() {
                    cleanElems(this)
                }), clearInterval(curFastChat.updateFriendsInt), clearTimeout(curFastChat.correspondentsTO), clearTimeout(curFastChat.lp_error_to), curFastChat = {
                    inited: !1
                }, !0)
            },
            isChatOpen: function(e) {
                return !!(window.curFastChat && curFastChat.inited && e && (curFastChat.tabs && curFastChat.tabs[e] && curFastChat.tabs[e].box.visible || curFastChat.clistBox && curFastChat.clistBox.visible))
            },
            standby: function(e) {
                FastChat.destroy(), curFastChat.standby = !0;
                var t = 1;
                ! function n() {
                    if (!curNotifier.is_server) return clearTimeout(curFastChat.standbyTO), void(curFastChat.standbyTO = setTimeout(n, 1e3 * t));
                    ajax.post("notifier.php?act=a_get_reload", {
                        version: e
                    }, {
                        onDone: function(e, t) {
                            FastChat.lcSend("gotConfig", {
                                navVersion: e,
                                config: t
                            }), FastChat.gotConfig(e, t)
                        },
                        onFail: function() {
                            return t *= 2, clearTimeout(curFastChat.standbyTO), curFastChat.standbyTO = setTimeout(n, 1e3 * t), !0
                        }
                    })
                }()
            },
            gotConfig: function(e, t) {
                clearTimeout(curFastChat.standbyTO), curFastChat.standby && setTimeout(function() {
                    e > stVersions.nav && (debugLog("appending al loader"), headNode.appendChild(ce("script", {
                        type: "text/javascript",
                        src: "/js/loader_nav" + e + "_" + vk.lang + ".js"
                    }))), setTimeout(function() {
                        e <= stVersions.nav ? stManager.add(["notifier.js", "notifier.css", jsc("web/emoji.js")], function() {
                            FastChat.init(t)
                        }) : setTimeout(arguments.callee, 100)
                    }, 0)
                }, curNotifier.is_server ? 0 : irand(1e3, 2e3))
            },
            updateVersion: function(e) {
                FastChat.lcSend("standby", {
                    version: e
                }), FastChat.standby(e)
            },
            lcSend: function(e, t) {
                Notifier.lcSend("fastchat", extend({
                    act: e,
                    __id: curFastChat.me && curFastChat.me.id || vk.id
                }, t))
            },
            lcRecv: function(e) {
                if (!isEmpty(e)) {
                    var t = e.act;
                    e.__id == (curFastChat.me && curFastChat.me.id || vk.id) && (delete e.act, delete e.__id, FastChat.lcFeed(t, e))
                }
            },
            lcFeed: function(e, t) {
                switch (e) {
                    case "needSettings":
                        curFastChat.version < t.version || t.lang_id == curFastChat.lang_id && FastChat.sendSettings();
                        break;
                    case "settings":
                        !curFastChat.version && curFastChat.options && t.settings.version == curFastChat.options.version && FastChat.gotSettings(t.settings), clearTimeout(curFastChat.sendSettingsTO);
                        break;
                    case "standby":
                        if (b()) break;
                        FastChat.standby(t.version);
                        break;
                    case "gotConfig":
                        FastChat.gotConfig(t.navVersion, t.config);
                        break;
                    case "clistOnlines":
                        if (b()) break;
                        FastChat.clistGotOnlines(t);
                        break;
                    case "needPeer":
                        if (b()) break;
                        var n = t.id,
                            r = curFastChat.tabs[n],
                            i = !1,
                            a = void 0;
                        if (void 0 !== r)
                            for (var o in i = {
                                    name: r.name,
                                    photo: r.photo,
                                    fname: r.fname,
                                    hash: r.hash,
                                    sex: r.sex,
                                    data: r.data,
                                    online: r.online
                                }, r.msgs) {
                                i.history = [r.log.innerHTML, r.msgs];
                                break
                            } else(a = curFastChat.friends[n + "_"]) && (i = {
                                name: a[0],
                                photo: a[1],
                                fname: a[2],
                                hash: a[3],
                                data: a[4],
                                online: curFastChat.onlines[n]
                            });
                        if (!1 === i) break;
                        curFastChat.gotPeers[n] = setTimeout(function() {
                            var e = {};
                            e[n] = i, FastChat.lcSend("gotPeers", e)
                        }, curNotifier.is_server ? 0 : irand(50, 100));
                        break;
                    case "fetchingPeers":
                        if (b()) break;
                        each(t, function(e, t) {
                            var n = curFastChat.needPeers[e];
                            n && (t & n[0]) == n[0] && clearTimeout(n[2])
                        });
                        break;
                    case "gotPeers":
                        if (b()) break;
                        FastChat.gotPeers(t);
                        break;
                    case "stateChange":
                        if (b()) break;
                        FastChat.onStateChanged(t);
                        break;
                    case "needMedia":
                        var s = t.msgId;
                        if (void 0 === (u = curFastChat.gotMedia[s]) || 0 === u) break;
                        curFastChat.gotMedia[s][3] = setTimeout(function() {
                            FastChat.lcSend("gotMedia", {
                                msgId: s,
                                peer: u[0],
                                text: u[1],
                                msgOpts: u[2]
                            })
                        }, curNotifier.is_server ? 0 : irand(50, 100));
                        break;
                    case "fetchingMedia":
                        s = t.msgId;
                        var c = curFastChat.needMedia[s];
                        if (void 0 === c || 0 === curFastChat.gotMedia[s]) break;
                        clearTimeout(c[1]), c[1] = setTimeout(FastChat.loadMsgMedia.pbind(c[0], s), 1e3);
                        break;
                    case "gotMedia":
                        s = t.msgId;
                        var u = curFastChat.gotMedia[s];
                        isArray(u) && clearTimeout(u[3]), FastChat.gotMsgMedia(t.peer, s, t.text, t.msgOpts)
                }
            },
            getResourcesThatShouldBeLoaded: function(e) {
                var t = this,
                    n = {},
                    r = e.filter(function(e) {
                        return e.type === u.a
                    }),
                    i = e.filter(f.l),
                    a = r.filter(function(e) {
                        return !t.isTabLoaded(e.peerId)
                    }).map(function(e) {
                        return e.peerId
                    });

                function o(e, t) {
                    var r = FastChat.getTab(e);
                    Object(h.Ha)(e) && t && r && !r.data.members[t] && (n[e] ? -1 === n[e].indexOf(t) && n[e].push(t) : n[e] = [t])
                }
                return r.forEach(function(e) {
                    t.isTabLoaded(e.peerId) && o(e.peerId, e.userId)
                }), i.forEach(function(e) {
                    o(e.peerId, +e.kludges.source_mid)
                }), {
                    shouldLoad: Object.keys(n).length > 0 || a.length > 0,
                    needPeers: a,
                    needMembers: n
                }
            },
            loadResources: function(e) {
                var t = e.needMembers,
                    n = curFastChat.lpInstance;
                return n.pause(), this.loadMembers(t).then(function() {
                    return n.resume()
                })
            },
            loadMembers: function(e) {
                var t = this;
                if (0 === Object.keys(e).length) return Promise.resolve();
                var n = Object.keys(e).map(function(t) {
                    return t + ":" + e[t].join(",")
                }).join(";");
                return Object(_.b)(p.e, {
                    act: "a_load_member",
                    need: n
                }).then(function(n) {
                    var r = m(n, 1)[0];
                    Object.keys(e).forEach(function(n) {
                        var i = t.getTab(n);
                        i && i.data && i.data.members && (i.data.members = e[n].reduce(function(e, t) {
                            var n = r.find(function(e) {
                                return e.id === t
                            });
                            return e[t] = Object.assign({
                                name_inv_case: n.inv_name,
                                name_kick_case: n.kick_name
                            }, n), e
                        }, i.data.members))
                    })
                })
            },
            handleEventChatUpdated: function(e, t) {
                var n = this;
                switch (t.updateType) {
                    case u.B:
                    case u.v:
                        var r = [t.peerId, 0].join(",");
                        this.loadPeers(r, function(e) {
                            n.updateChatInfo(t.peerId, e)
                        });
                        break;
                    case u.t:
                    case u.x:
                    case u.A:
                    case u.C:
                    case u.E:
                    case u.D:
                    case u.u:
                    case u.w:
                    case u.y:
                }
            },
            updateChatInfo: function(e, t) {
                var n = this.getTab(e),
                    r = t[e],
                    i = r.photo,
                    a = r.grid,
                    o = r.name,
                    s = document.querySelector("#chat_tab_icon_" + e + " .chat_tab_img"),
                    c = document.createElement(i ? "img" : "div"),
                    u = n && n.unread ? " (" + n.unread + ")" : "";
                n && n.title && (n.name = o, n.title.innerHTML = o + u), c.classList.add("chat_tab_img"), a ? c.innerHTML = '<div class="chat_tab_grid">' + a + "</div>" : i && (c.id = "im_dialog_ph" + (e - 2e9), c.src = i), s && s.parentNode.replaceChild(c, s)
            },
            blinkEl: function(e, t, n) {
                if (t > 10) return n(), !1;
                t % 2 == 0 ? animate(e, {
                    opacity: 0
                }, 400, function() {
                    FastChat.blinkEl(e, t + 1, n)
                }) : animate(e, {
                    opacity: 1
                }, 400, function() {
                    setTimeout(function() {
                        FastChat.blinkEl(e, t + 1, n)
                    }, 400)
                })
            },
            blinkTyping: function(e) {
                var t = ge("chat_tab_icon_" + e);
                if (t) {
                    var n = geByClass1("chat_tab_typing_wrap", t);
                    fadeIn(n, 150, function() {
                        FastChat.blinkEl(n.firstChild, 0, function() {
                            fadeOut(n, 150)
                        })
                    })
                }
            },
            imFeed: function(e, t) {
                var n = this.getTab(e);
                if (!n) return !1;
                n.auto && !n.unread && (n.box._close(!0), delete curFastChat.tabs[e])
            },
            tabNotify: function(e, t, n) {
                var r = curFastChat.tabs[e],
                    i = void 0;
                if (e > 0 && e < 2e9 && isFunction(cur.onPeerStatusChanged) && cur.onPeerStatusChanged(e, t, n), !(e <= 0) && r && r.box && !r.box.minimized) {
                    switch (clearTimeout(r.hideNotifyTO), t) {
                        case "online":
                            i = getLang("mail_im_user_became_online", 3 - r.sex), FastChat.blinkTab(e);
                            break;
                        case "offline":
                            i = getLang("mail_im_user_became_offline", 3 - r.sex), FastChat.blinkTab(e);
                            break;
                        case "unavail":
                            i = getLang("mail_im_not_online", 3 - r.sex).replace(/\.$/, "")
                    }
                    i = i.replace("{user}", r.fname), val(r.notify, '<div class="fc_tab_notify fc_tab_notify_' + t + '">' + i + "</div>");
                    var a = r.notify.firstChild;
                    clearTimeout(r.hideNotifyTO), r.hideNotifyTO = setTimeout(function() {
                        fadeOut(a, 200, function() {
                            val(r.notify, "")
                        })
                    }, 5e3)
                }
            },
            hideChatCtrl: function() {
                removeClass(Chat.wrap, "chat_active"), removeEvent(document, "mousedown", FastChat.onDocClick)
            },
            showChatCtrl: function() {
                addClass(Chat.wrap, "chat_active"), setTimeout(function() {
                    addEvent(document, "mousedown", FastChat.onDocClick)
                }, 0)
            },
            hideUI: function() {
                addClass(bodyNode, "chat_onl_hidden")
            },
            showUI: function() {
                removeClass(bodyNode, "chat_onl_hidden")
            },
            initUI: function() {
                if (curFastChat.options) {
                    var e = curFastChat.el = {},
                        t = getWndInner();
                    re("rb_box_fc_clist"), e.clistWrap = se(curFastChat.tpl.clist), e.clist = geByClass1("fc_contacts", e.clistWrap, "div"), e.clistTitle = geByClass1("fc_tab_title", e.clistWrap, "div"), e.clistOnline = geByClass1("fc_clist_online", e.clistWrap, "div");
                    var n = curFastChat.options.state || !1,
                        r = !curFastChat.friendsCnt || (n && void 0 !== n.clist.min ? n.clist.min : t[1] < 1200 || curFastChat.friendsCnt < 5);
                    curFastChat.clistW = 270, curFastChat.clistH = 299;
                    var i = {
                        id: "fc_clist",
                        movable: geByClass1("fc_tab_head", e.clistWrap),
                        hider: geByClass1("fc_tab_close_wrap", e.clistWrap, "a"),
                        startHeight: curFastChat.clistH,
                        startWidth: curFastChat.clistW,
                        resizeableH: e.clist,
                        resize: !1,
                        minH: 150,
                        fixed: r,
                        onHide: function(t) {
                            val("fc_clist_filter", curFastChat.q = ""), addClass(curFastChat.clistBox.wrap, "fc_fixed"), curFastChat.clistBox.fixed = !0, FastChat.stateChange({
                                op: "clist_toggled",
                                val: 0
                            }), setStyle(curFastChat.clistBox.wrap, {
                                top: "auto",
                                bottom: 0,
                                right: 72,
                                left: "auto"
                            }), show(e.topLink), FastChat.hideChatCtrl()
                        },
                        onShow: function() {
                            FastChat.showChatCtrl()
                        },
                        onDragEnd: function(e, t) {
                            FastChat.stateChange({
                                op: "clist_moved",
                                y: e,
                                x: t
                            })
                        },
                        onResize: function(e, t) {
                            curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update(!1, !0)
                        }
                    };
                    n && !r && (!1 !== n.clist.x && (-1 == n.clist.x ? i.startRight = 0 : i.startLeft = t[1] * n.clist.x), !1 !== n.clist.y && (-1 == n.clist.y ? i.startBottom = 0 : i.startTop = t[0] * n.clist.y)), r && (i.noshow = !0), void 0 === i.startTop && void 0 === i.startBottom && (i.startTop = t[0] < 800 ? 0 : .1 * t[0]), void 0 === i.startLeft && void 0 === i.startRight && (i.startRight = 0), curFastChat.clistBox = new RBox(e.clistWrap, i), i.noshow || void 0 === i.startLeft && void 0 === i.startTop || curFastChat.clistBox._wnd_resize(t[0], t[1], !0), curFastChat.clistBoxScroll = new Scrollbar(e.clist, {
                        prefix: "fc_",
                        scrollChange: FastChat.clistShowMore,
                        nomargin: !0,
                        global: !0,
                        nokeys: !0,
                        right: vk.rtl ? "auto" : 1,
                        left: vk.rtl ? 1 : "auto"
                    }), curFastChat.updateFriendsInt = setInterval(FastChat.clistUpdate, 18e4);
                    var a, o = ge("fc_clist_filter");
                    if (placeholderInit(o, {
                            global: !0
                        }), curFastChat.q = "", addEvent(o, "keyup " + (browser.opera ? "keypress" : "keydown"), function(e) {
                            if (e.keyCode == KEY.ESC) return FastChat.clistHide(), cancelEvent(e);
                            var t = FastChat.clistFilterKey(e);
                            if (void 0 !== t) return t;
                            curFastChat.q = trim(val(this)), FastChat.clistRender()
                        }), e.clistOnline) bodyNode.appendChild(a = ce("nobr", {
                        className: "fl_l",
                        innerHTML: getLang("mail_im_clist_onlines")
                    }, {
                        visibility: "hidden",
                        position: "absolute"
                    })), re(a), addEvent(e.clistOnline, "mouseover", function(t) {
                        showTooltip(this, {
                            text: getLang("mail_im_clist_onlines"),
                            forcetoup: 1,
                            shift: [12, 4, 3],
                            className: "tt_fc_onlines",
                            init: function() {
                                browser.msie && (e.clistOnline.tt.isFixed = !1)
                            },
                            black: 1
                        })
                    }), addEvent(e.clistOnline, "click", function(e) {
                        (e.originalEvent || e).cancelBubble = !0, FastChat.clistToggleOnlines(), FastChat.clistRender()
                    }), n && n.clist && n.clist.onlines && FastChat.clistToggleOnlines(!0);
                    r ? FastChat.clistUpdateTitle() : FastChat.clistRender(), curFastChat.ready = !0, n && n.tabs && each(n.tabs, function(e, n) {
                        e = intval(e);
                        var r = {
                            nofocus: 1
                        };
                        this.min && (r.minimized = !0), this.h && (r.startHeight = this.h * t[0]), this.w && (r.startWidth = this.w * t[1]), void 0 !== this.x && this.x <= 1 && (this.x < 0 ? r.startRight = 0 : r.startLeft = t[1] * this.x), void 0 !== this.y && this.y <= 1 && (this.y < 0 ? r.startBottom = 0 : r.startTop = t[0] * this.y), n.fx ? (r.fixedLoad = !0, FastChat.prepareTabIcon(e, r, !0)) : (r.noAnim = !0, FastChat.addPeer(e, !1, !1, r))
                    }), addEvent(Chat.itemsCont, "mousemove mouseover", FastChat.itemsTT), addEvent(Chat.itemsCont, "mouseout", FastChat.itemsOut)
                }
            },
            itemsOffset: 12,
            itemsTT: function(e) {
                for (var t = e.target, n = !1; t && t != Chat.itemsCont;) {
                    if (hasClass(t, "chat_tab_wrap")) {
                        n = t;
                        break
                    }
                    t = t.parentNode
                }
                if (!n) return clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, !1;
                var r = n.id.split("_")[3],
                    i = Chat.tabs[r];
                return !!i && (curFastChat.activeBox && curFastChat.activeBox.visible && curFastChat.activeBox.options.peer == r ? (FastChat.itemsOut(), !1) : (clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, showTooltip(n, {
                    text: i.name,
                    slideX: 15,
                    black: 1,
                    asrtl: 1,
                    appendEl: Chat.ttNode,
                    className: "tt_black_side",
                    shift: [-58, -37, 0]
                }), void(Chat.ttPeer = n)))
            },
            itemsOut: function() {
                if (Chat.ttOutTimeout) return !1;
                Chat.ttOutTimeout = setTimeout(function() {
                    if (Chat.ttOutTimeout = !1, !Chat.ttPeer) return !1;
                    triggerEvent(Chat.ttPeer, "mouseout"), Chat.ttPeer = !1
                }, 0)
            },
            stateChange: function(e) {
                ajax.post("al_im.php", extend({
                    act: "a_state_fc",
                    hash: curFastChat.options.state_hash || ""
                }, e), {
                    onFail: function() {
                        return !0
                    }
                }), FastChat.lcSend("stateChange", e)
            },
            onStateChanged: function(e) {
                var t = !!e.peer && curFastChat.tabs[e.peer],
                    n = e.peer ? t && t.box : curFastChat.clistBox,
                    r = getWndInner();
                switch (e.op) {
                    case "added":
                        if (t) {
                            delete t.auto;
                            break
                        }
                        e.fixed ? FastChat.prepareTabIcon(e.peer, {
                            fixedLoad: !0
                        }) : FastChat.addPeer(e.peer);
                        break;
                    case "unfixed":
                        var i = {
                            startHeight: intval(r[0] * e.h),
                            startWidth: intval(r[1] * e.w)
                        }; - 1 == e.y ? i.startBottom = 0 : i.startTop = intval(r[0] * e.y), -1 == e.x ? i.startRight = 0 : i.startLeft = intval(r[1] * e.x), FastChat.addPeer(e.peer, !1, !1, i);
                        break;
                    case "closed":
                        if (Chat.tabs[e.peer] && FastChat.closeTabIcon(e.peer), !t || !n) break;
                        n.close();
                        break;
                    case "hidden":
                        if (!t || !n) break;
                        n.close();
                        break;
                    case "minimized":
                        if (!t || !n) break;
                        e.val ? n.unminimize() : n.minimize();
                        break;
                    case "moved":
                        setStyle(n.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(r[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(r[1] * e.x) : "auto"
                        }), n.toBottom = -1 == e.y, n.toRight = -1 == e.x;
                        break;
                    case "resized":
                        setStyle(n.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(r[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(r[1] * e.x) : "auto"
                        }), n.toBottom = -1 == e.y, n.toRight = -1 == e.x;
                        var a = intval(r[1] * e.w);
                        setStyle(n.resizeableH, "height", intval(r[0] * e.h)), setStyle(n.resizeableW, "width", a), FastChat.fixResized(t, a);
                        break;
                    case "clist_toggled":
                        e.val ? n.show(0, !0) : n.hide(0, !0), toggle(curFastChat.el.topLink, !e.val);
                        break;
                    case "clist_moved":
                        setStyle(n.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(r[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(r[1] * e.x) : "auto"
                        }), n.toBottom = -1 == e.y, n.toRight = -1 == e.x;
                        break;
                    case "onlines_toggled":
                        FastChat.clistToggleOnlines(e.val), FastChat.clistRender()
                }
            },
            onUnidle: function() {
                curNotifier.version && curFastChat.clistBox && (curFastChat.clistBox.visible && (curFastChat.el.clist.scrollTop < 100 || curRBox.active != curFastChat.clistBox.id) ? FastChat.clistRender() : FastChat.clistUpdateTitle(), each(curFastChat.tabs, function(e) {
                    FastChat.restoreDraft(e)
                }))
            },
            clistUpdate: function() {
                var e = vkNow();
                if (curNotifier.is_server && !(curFastChat.clistUpdatedTs && e - curFastChat.clistUpdatedTs < 6e4)) {
                    curFastChat.clistUpdatedTs = e;
                    var t, n = [];
                    for (t in curFastChat.tabs) n.push(t);
                    for (t in Chat.tabs) n.push(t);
                    ajax.post("al_im.php", {
                        act: "a_onlines",
                        peer: n.join(",")
                    }, {
                        onDone: function(e) {
                            FastChat.clistGotOnlines(e), FastChat.lcSend("clistOnlines", e)
                        }
                    })
                }
            },
            clistGotOnlines: function(e) {
                var t = curFastChat.onlines,
                    n = [];
                curFastChat.onlines = e, curNotifier.idle_manager && curNotifier.idle_manager.is_idle || !curFastChat.tabs && Chat.tabs || (each(curFastChat.tabs, function(r) {
                    curFastChat.onlines[r] != t[r] && (FastChat.tabNotify(r, e[r] ? "online" : "offline", e[r]), e[r] || (n[r] = 1))
                }), each(Chat.tabs, function(n) {
                    if (curFastChat.onlines[n] != t[n]) {
                        var r = geByClass1("_chat_tab_image", ge("chat_tab_icon_" + n));
                        toggleClass(r, "online", e[n]), toggleClass(r, "mobile", e[n] && mobPlatforms[e[n]])
                    }
                }), n = arrayKeyDiff(t, e, n), each(n, function(e) {
                    FastChat.tabNotify(e, "offline")
                }), FastChat.clistRender())
            },
            clistShow: function() {
                var e = hasClass(Chat.wrap, "chat_active");
                FastChat.clistRender(), curFastChat.clistBox.visible ? curFastChat.clistBox.focus() : (curFastChat.activeBox && curFastChat.activeBox != curFastChat.clistBox && curFastChat.activeBox.hide(), curFastChat.clistBox.show(), FastChat.setActive(curFastChat.clistBox), curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update(!1, !0), curFastChat.el.topLink && hide(curFastChat.el.topLink)), elfocus("fc_clist_filter"), FastChat.movePointer(!1, e)
            },
            clistHide: function() {
                curFastChat.clistBox.hide(), curFastChat.activeBox == curFastChat.clistBox && FastChat.setActive(!1)
            },
            clistRender: function(e) {
                var t = [],
                    n = !e,
                    r = 1 + (e ? 40 : 20),
                    i = curFastChat.q,
                    a = !1,
                    o = !1,
                    s = !1;
                if (i ? (s = [], each(FastChat.clistCache(i), function() {
                        s.push(escapeRE(this))
                    }), s = new RegExp("([ -]|^|s|&nbsp;|\b)(" + s.join("|") + ")", "gi"), a = curFastChat.clistCache[i] || {}) : curFastChat.clOnlines && (a = curFastChat.onlines), curFastChat.clHasMore = !1, each(curFastChat.friends, function(e) {
                        var i = intval(e),
                            c = !a || a[i];
                        if (n) {
                            if (c) {
                                if (!--r) return curFastChat.clHasMore = !0, !1;
                                t.push(FastChat.clistWrapPeer(i, this, s)), o = i
                            }
                        } else i == curFastChat.clOffset && (n = !0)
                    }), !1 !== o || e || i ? i && !curFastChat.clHasMore && t.push(FastChat.getCorrespondents(i, s, !1 === o)) : t.push('<div class="fc_clist_empty">' + getLang(i ? "mail_im_clist_notfound" : "mail_im_clist_empty") + "</div>"), curFastChat.clOffset = o, e) {
                    for (var c = ce("div", {
                            innerHTML: t.join("")
                        }), u = document.createDocumentFragment(); c.firstChild;) u.appendChild(c.firstChild);
                    curFastChat.el.clist.appendChild(u), curFastChat.clHasMore || FastChat.clistUpdateTitle(!0)
                } else val(curFastChat.el.clist, t.join("")), FastChat.clistUpdateTitle(!0), (browser.chrome || browser.safari) && setTimeout(function() {
                    setStyle(curFastChat.el.clist.firstChild, {
                        width: curFastChat.el.clist.firstChild.clientWidth
                    }), setTimeout(function() {
                        setStyle(curFastChat.el.clist.firstChild, {
                            width: ""
                        })
                    }, 0)
                }, 0);
                if (curFastChat.clSel) {
                    (d = ge("fc_contact" + curFastChat.clSel)) ? FastChat.clistPeerOver(d, 1): curFastChat.clSel = !1
                } else {
                    var d = geByClass1("fc_contact", curFastChat.el.clist);
                    FastChat.clistPeerOver(d, 1)
                }
                curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
            },
            clistWrapPeer: function(e, t, n) {
                var r, i, a = curFastChat.tabs[e] ? curFastChat.tabs[e].unread : 0,
                    o = curFastChat.onlines[e],
                    s = onlinePlatformClass(o),
                    c = (t[0] || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                if (n && (c = c.replace(n, '$1<em class="fc_clist_hl">$2</em>')), e > 0 && e < 2e9 ? (r = "/id" + e, i = 'onmousemove="FastChat.clistPeerOver(this.parentNode, 2);"  onmouseout="FastChat.clistPeerOver(this.parentNode, 1);"') : (r = "/im?sel=" + e, i = ""), e > 2e9 && t[3]) var u = t[3];
                else u = '<img src="' + Notifier.fixPhoto(t[1]) + '" class="fc_contact_photo"/>';
                return '<a href="' + r + '" class="fc_contact clear_fix" id="fc_contact' + e + '" onclick="return FastChat.selectPeer(' + e + ', event, { entrypoint: \'fastchat_search\' });" onmousedown="event.cancelBubble = true;" onmouseover="FastChat.clistPeerOver(this, 1, event);"  onmouseout="FastChat.clistPeerOver(this, 0, event);"><span class="fc_contact_photo' + s + '" ' + i + ">" + u + '</span><span class="fc_contact_status"></span><span class="fc_contact_name">' + c + '<span id="fc_contact_unread' + e + '" class="fc_contact_unread">' + (a ? " <b>+" + a + "</b>" : "") + "</span></span></a>"
            },
            clistPeerOver: function(e, t, n) {
                if (e && checkOver(n, e)) {
                    var r = e.id.substr(10);
                    curFastChat.clSel && t && curFastChat.clSel != r && FastChat.clistPeerOver(ge("fc_contact" + curFastChat.clSel), 0), toggleClass(e, "fc_contact_over", t), t ? curFastChat.clSel = r : curFastChat.clSel == r && (curFastChat.clSel = !1)
                }
            },
            authorOver: function(e, t) {
                var n = e.getAttribute("data-title"),
                    r = gpeByClass("fc_tab_log", e),
                    i = !1;
                if (e.getBoundingClientRect().top - r.getBoundingClientRect().top < 10 && (i = !0), n) {
                    var a = e.getAttribute("data-date");
                    a && (n += "<br>" + a), showTooltip(e, {
                        text: '<div class="fc_author_tt">' + n + "</div>",
                        black: 1,
                        center: 1,
                        forcetodown: i,
                        shift: [1, 8, 0]
                    })
                }
            },
            getCorrespondents: function(e, t, n) {
                return clearTimeout(curFastChat.correspondentsTO), curFastChat.correspondents && void 0 !== curFastChat.correspondents[e] ? FastChat.wrapCorrespondents(curFastChat.correspondents[e]) || n && '<div class="fc_clist_empty">' + getLang("mail_im_clist_notfound") + "</div>" || "" : (curFastChat.correspondentsTO = setTimeout(FastChat.loadCorrespondents.pbind(e, t), 100), '<div id="fc_correspondents"></div>')
            },
            loadCorrespondents: function(e, t) {
                e == curFastChat.q && ajax.post("hints.php", {
                    act: "a_json_friends",
                    str: e,
                    from: "fc",
                    allow_multi: 1
                }, {
                    onDone: function(n) {
                        curFastChat.correspondents || (curFastChat.correspondents = {});
                        var r, i = {};
                        if (each(n, function() {
                                r = this[3] + "_", curFastChat.friends[r] || (i[r] = [this[1], this[2], this[3], this[4] || ""])
                            }), curFastChat.correspondents[e] = i, e == curFastChat.q) {
                            var a = ge("fc_correspondents");
                            if (a) {
                                var o = a.parentNode,
                                    s = ce("div", {
                                        innerHTML: FastChat.wrapCorrespondents(i, t)
                                    }),
                                    c = document.createDocumentFragment();
                                if (s.firstChild)
                                    for (; s.firstChild;) c.appendChild(s.firstChild);
                                else o.firstChild == a && c.appendChild(ce("div", {
                                    className: "fc_clist_empty",
                                    innerHTML: getLang("mail_im_clist_notfound")
                                }));
                                o.replaceChild(c, a), FastChat.clistUpdateTitle(!0), curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
                            }
                        }
                    }
                })
            },
            wrapCorrespondents: function(e, t) {
                var n = [];
                return each(e, function(e) {
                    n.push(FastChat.clistWrapPeer(intval(e), this, t))
                }), n.join("")
            },
            updateFriends: function(e) {
                if (window.Chat && Chat.inited) {
                    var t = Chat.onl;
                    t && (e > 0 ? (val(t, e), show(Chat.wrap)) : hide(Chat.wrap))
                }
            },
            onDocClick: function(e) {
                if (curFastChat.activeBox) {
                    var t = e.target;
                    if (curBox()) return !0;
                    for (; t;) {
                        if ("fc_tab_wrap" == t.className || "chat_onl_wrap" == t.id || "custom_menu_cont" == t.id || "layer_wrap" == t.id || "box_layer_wrap" == t.id || "wk_layer_wrap" == t.id) return !0;
                        t = t.parentNode
                    }
                    var n = curFastChat.tabs[curFastChat.activeBox.options.peer];
                    if (n && (trim(Emoji.editableVal(n.txt)) || n.imMedia && n.imMedia.getMedias().length)) return !0;
                    curFastChat.activeBox.hide()
                }
            },
            clistCache: function(e) {
                if (e) {
                    var t, n, r, i, a, o, s, c, u = [e];
                    if ((n = parseLatin(e)) && u.push(n), (n = parseLatKeys(e)) && u.push(n), (n = parseCyr(e)) && u.push(n), void 0 !== curFastChat.clistCache[e]) return u;
                    for (r in c = curFastChat.clistCache[e] = {}, u)
                        if (t = u[r], a = curFastChat.clistCache[" " + t.charAt(0).toLowerCase()])
                            for (i in o = new RegExp("(^|\\s|\\()" + escapeRE(t), "gi"), a) s = curFastChat.friends[i + "_"], isArray(s) && null !== s[0].match(o) && (c[i] = 1);
                    for (r in i = 0, c) i++;
                    return c._num = i, u
                }
                var d, _, l;
                for (r in curFastChat.clistCache = {}, curFastChat.friends)
                    for (d = curFastChat.friends[r][0], r = intval(r), _ = 0; l = " " + d.charAt(_).toLowerCase(), curFastChat.clistCache[l] || (curFastChat.clistCache[l] = {}), curFastChat.clistCache[l][r] = 1, -1 != (_ = d.indexOf(" ", _ + 1));) ++_
            },
            clistShowMore: function() {
                if (curFastChat.clHasMore) {
                    var e = curFastChat.el.clist;
                    e.scrollTop + 3 * e.clientHeight > e.scrollHeight && FastChat.clistRender(!0)
                }
            },
            clistUpdateTitle: function(e) {
                var t, n = 0,
                    r = 0;
                for (t in curFastChat.friends) curFastChat.onlines[intval(t)] ? (r++, n++) : curFastChat.clOnlines || n++;
                var i = window.newVal = (r ? getLang("mail_im_X_onlines_title", r) : getLang("mail_im_onlines_title")).toString();
                FastChat.updateFriends(r), val(curFastChat.el.clistTitle, i), val(curFastChat.el.topLink, i.toLowerCase()), curFastChat.clistBoxScroll && (!curFastChat.clHasMore && e ? n = curFastChat.el.clist.childNodes.length : curFastChat.q && (n = intval((curFastChat.clistCache[curFastChat.q] || {})._num)), curFastChat.clistBoxScroll.options.contHeight = 50 * n)
            },
            clistToggleOnlines: function(e) {
                void 0 === e && (e = !curFastChat.clOnlines, FastChat.stateChange({
                    op: "onlines_toggled",
                    val: e ? 1 : 0
                })), toggleClass(curFastChat.el.clistOnline, "fc_clist_online_active", e), curFastChat.clOnlines = e
            },
            clistFilterKey: function(e) {
                var t;
                switch (e.keyCode) {
                    case KEY.DOWN:
                    case KEY.UP:
                        if ("keyup" != e.type) {
                            if (t = curFastChat.clSel && ge("fc_contact" + curFastChat.clSel)) {
                                var n = e.keyCode == KEY.DOWN ? "nextSibling" : "previousSibling",
                                    r = t;
                                do {
                                    r = r[n]
                                } while (r && (1 != r.nodeType || !hasClass(r, "fc_contact")))
                            } else curFastChat.clSel || e.keyCode != KEY.DOWN || (r = geByClass1("fc_contact", curFastChat.el.clist, "a"));
                            if (r && r != t) {
                                FastChat.clistPeerOver(r, 1);
                                var i = curFastChat.el.clist;
                                r.offsetTop + 16 > i.clientHeight + i.scrollTop ? (i.scrollTop = r.offsetTop + 16 - i.clientHeight, curFastChat.clistBoxScroll.update()) : r.offsetTop - 36 < i.scrollTop && (i.scrollTop = r.offsetTop - 36, curFastChat.clistBoxScroll.update())
                            }
                        }
                        break;
                    case KEY.LEFT:
                    case KEY.RIGHT:
                        return !0;
                    case KEY.ENTER:
                        if ("keyup" == e.type || !(t = curFastChat.clSel && ge("fc_contact" + curFastChat.clSel))) break;
                        e.ctrlKey || e.metaKey && browser.mac ? nav.go(t.href.match(/\b(vkontakte\.ru|vk\.com)(\/[^\/]+?)$/)[2]) : FastChat.selectPeer(curFastChat.clSel);
                    case KEY.ESC:
                        if ("keyup" != e.type) {
                            var a = ge("fc_clist_filter"),
                                o = val(a) || curFastChat.clSel;
                            a.blur(), val(a, curFastChat.q = ""), curFastChat.clSel = !1, o && FastChat.clistRender()
                        }
                        break;
                    default:
                        return
                }
                return cancelEvent(e)
            },
            prepareTabIcon: function(e, t, n) {
                var r = curFastChat.friends && curFastChat.friends[e + "_"];
                if (r) {
                    var i = {
                        name: r[0],
                        photo: r[1],
                        online: curFastChat.onlines[e]
                    };
                    FastChat.addTabIcon(e, i, n)
                } else {
                    curFastChat.needPeers[e] = [3, !1, setTimeout(FastChat.getPeers, irand(150, 200)), t]
                }
            },
            addTabIcon: function(e, t, n) {
                if (Chat.itemsCont && !Chat.tabs[e]) {
                    if (e > 2e9) var r = t.data.members_grid_fc || "";
                    else r = '<img class="chat_tab_img" src="' + t.photo + '"/>';
                    if (e > 2e9) var i = "im?sel=c" + (e - 2e9);
                    else i = t.alink || "/id" + e;
                    var a = onlinePlatformClass(t.online),
                        o = se('<a class="chat_tab_wrap' + (n ? "" : " chat_tab_beforeanim") + '" id="chat_tab_icon_' + e + '" href="' + i + '" onclick="FastChat.itemsOut();return FastChat.togglePeer(' + e + ', event);"><div class="chat_tab_imgcont _chat_tab_image' + a + '"><div class="chat_tab_close" onclick="return FastChat.closeTabIcon(' + e + ', event)"></div>' + r + '</div><div class="chat_tab_typing_wrap"><div class="chats_sp chat_tab_typing_icon"></div></div><div class="chat_tab_counter"></div></a>');
                    Chat.itemsCont.insertBefore(o, Chat.itemsCont.firstChild), Chat.tabs[e] = {
                        el: o,
                        name: t.name
                    }, addClass(Chat.wrap, "chat_expand"), n || removeClass(o, "chat_tab_beforeanim"), FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = 0
                }
            },
            checkChatHeight: function() {
                var e = getSize(Chat.itemsCont)[1];

                function t() {
                    addEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap)
                }

                function n() {
                    removeEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap)
                }
                Chat.lastHeight = e, e > Chat.maxHeight ? (Chat.fixH || (Chat.fixH = !0, addClass(Chat.scrollNode, "chat_fix_height"), setStyle(Chat.scrollNode, {
                    height: Chat.maxHeight
                }), addEvent(Chat.scrollNode, "mouseenter", t), addEvent(Chat.scrollNode, "mouseleave", n), FastChat.checkShadow()), Chat.scrollNode.scrollTop = e - Chat.maxHeight) : Chat.fixH && (Chat.fixH = !1, removeClass(Chat.scrollNode, "chat_fix_height"), setStyle(Chat.scrollNode, {
                    height: "auto"
                }), removeEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap), removeEvent(Chat.scrollNode, "mouseenter", t), removeEvent(Chat.scrollNode, "mouseleave", n), FastChat.checkShadow())
            },
            checkShadow: function() {
                var e = intval(Chat.scrollNode.scrollTop);
                e && Chat.fixH ? Chat.shadowTop || (addClass(Chat.wrap, "chat_scroll_top"), fadeIn(geByClass1("chat_cont_sh_top", Chat.wrap), 200), Chat.shadowTop = !0) : Chat.shadowTop && (fadeOut(geByClass1("chat_cont_sh_top", Chat.wrap), 200), Chat.shadowTop = !1), Chat.lastHeight - e > Chat.maxHeight && Chat.fixH ? Chat.shadowBottom || (fadeIn(geByClass1("chat_cont_sh_bottom", Chat.wrap), 200), Chat.shadowBottom = !0) : Chat.shadowBottom && (fadeOut(geByClass1("chat_cont_sh_bottom", Chat.wrap), 200), Chat.shadowBottom = !1)
            },
            scrollWrap: function(e) {
                e || (e = window.event);
                var t = 0;
                return e.wheelDeltaY || e.wheelDelta ? t = (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && (t = 10 * -e.detail), Chat.scrollNode.scrollTop -= t, curFastChat.activeBox == curFastChat.clistBox ? (curFastChat.pointerMargin = 0, FastChat.setPointer(!1, curFastChat.pointerMargin, curFastChat.prevPointer)) : (curFastChat.pointerMargin = -Chat.scrollNode.scrollTop, FastChat.setPointer(!0, curFastChat.pointerMargin, curFastChat.prevPointer)), FastChat.checkShadow(), setStyle(Chat.ttNode, {
                    top: -Chat.scrollNode.scrollTop
                }), cancelEvent(e)
            },
            togglePeer: function(e, t) {
                return curFastChat.activeBox && curFastChat.activeBox.options.peer == e ? (curFastChat.activeBox.hide(), FastChat.setActive(!1), !1) : FastChat.selectPeer(e, t, {
                    entrypoint: "fastchat_icon"
                })
            },
            selectPeer: function(e, t, n) {
                if (checkEvent(t)) return !0;
                var r = hasClass(Chat.wrap, "chat_active");
                if (curFastChat.tabs && curFastChat.tabs[e]) {
                    var i = curFastChat.tabs[e].box;
                    i.minimized && i.unminimize(!0), FastChat.activateTab(e), FastChat.movePointer(e, r)
                } else n || (n = {}), n.fixed = !0, n.onPeerAdded = function() {
                    FastChat.movePointer(e, r)
                }, n.onHistoryLoaded = FastChat.readLastMessages.pbind(e), FastChat.addPeer(e, !1, !0, n);
                return curFastChat.tabs[e] && curFastChat.tabs[e].iman && (curFastChat.tabs[e].entrypoint = n && n.entrypoint, curFastChat.tabs[e].iman.unidle()), !1
            },
            closeTabIcon: function(e, t, n) {
                curFastChat.activeBox && curFastChat.activeBox.options.peer == e && !n && (curFastChat.activeBox.hide(), FastChat.setActive(!1));
                var r = ge("chat_tab_icon_" + e);
                addClass(r, "chat_tab_hiding"), delete Chat.tabs[e], curFastChat.tabs[e] && curFastChat.tabs[e].box.options.fixed && (curFastChat.tabs[e].iman.stop(), delete curFastChat.tabs[e]);
                return animate(r, {
                    height: 0,
                    opacity: 0
                }, {
                    duration: 100,
                    onComplete: function() {
                        re(r), r && (r = !1, curFastChat.activeBox && FastChat.movePointer(curFastChat.activeBox.options.peer, !0));
                        var e = Chat.scrollNode.scrollTop;
                        FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = e
                    }
                }), n || FastChat.stateChange({
                    op: "closed",
                    peer: e
                }), Object.keys(Chat.tabs).length || removeClass(Chat.wrap, "chat_expand"), FastChat.itemsOut(), cancelEvent(t)
            },
            getPointerShift: function(e, t, n) {
                var r = n - t,
                    i = Chat.maxHeight + 32;
                return e && r < 62 ? r - 62 : e && r > i ? r - i : 0
            },
            setPointer: function(e, t, n) {
                if (!curFastChat.activeBox) return !1;
                var r = FastChat.getPointerShift(e, t, n),
                    i = geByClass1("fc_tab_pointer", curFastChat.activeBox.wrap);
                return setStyle(i, {
                    marginTop: t + r
                }), r
            },
            movePointer: function(e, t) {
                if (!curFastChat.activeBox) return !1;
                var n = geByClass1("fc_pointer_offset", curFastChat.activeBox.wrap);
                if (e) {
                    var r = ge("chat_tab_icon_" + e);
                    if (!r) return !1;
                    if (!Chat.fixH && r.nextSibling) var i = getXY(r.nextSibling)[1] - 50;
                    else if (r.nextSibling || Chat.fixH) i = getXY(r)[1] + Chat.scrollNode.scrollTop;
                    else i = getXY(ge("chat_tab_wrap"))[1] - 50;
                    var a = 23 + getXY(Chat.cont)[1] - i,
                        o = -Chat.scrollNode.scrollTop
                } else a = 28, o = 0;
                var s = FastChat.setPointer(e, o, a);
                if (t) {
                    if (curFastChat.prevPointer) {
                        var c = FastChat.getPointerShift(!0, o + s, curFastChat.prevPointer);
                        setStyle(n, {
                            bottom: curFastChat.prevPointer - c + s
                        })
                    }
                    animate(n, {
                        bottom: a
                    }, {
                        duration: 100
                    })
                } else setStyle(n, {
                    bottom: a
                });
                curFastChat.prevPointer = a
            },
            setActive: function(e) {
                curFastChat.activeBox = e, e && FastChat.moveBoxesLeft(e.pos[1])
            },
            moveBoxesLeft: function(e, t) {
                e -= 8;
                var n = !1,
                    r = 0;
                for (var i in curFastChat.tabs) {
                    var a = curFastChat.tabs[i];
                    if (t || (a.box.movedLeft = !1), a && !a.box.options.fixed && a.box.toBottom && !a.box.movedLeft && !a.box.noMove) {
                        var o = a.box.pos;
                        o[1] + o[3] >= e && o[1] > r && (n = a, r = o[1])
                    }
                }
                if (n) {
                    var s = e - n.box.pos[3],
                        c = n.box.pos[0];
                    s < 0 && (s = 0), n.box.movedLeft = !0, animate(n.box.wrap, {
                        left: s
                    }, 200), n.box.pos = [c, s, n.box.pos[2], n.box.pos[3]];
                    var u = getWndInner();
                    FastChat.stateChange({
                        op: "moved",
                        peer: n.box.options.peer,
                        y: c / u[0],
                        x: s / u[1]
                    }), s && FastChat.moveBoxesLeft(s, !0)
                } else FastChat.moveLeftY = 0
            },
            moveBoxAway: function(e, t) {
                for (var n = t - e.pos[3] - 20, r = e.pos[3], i = e.pos[0], a = !1; n > 0 && !a;)
                    for (var o in a = !0, curFastChat.tabs) {
                        var s = curFastChat.tabs[o].box.pos;
                        s[0] + s[2] / 2 > i && s[1] + s[3] > n && s[1] < n + r && (n -= s[3], a = !1)
                    }
                n < 0 && (n = positive(Math.random() * t)), animate(e.wrap, {
                    left: n
                }, 300);
                var c = getWndInner();
                FastChat.stateChange({
                    op: "moved",
                    peer: e.options.peer,
                    y: i / c[0],
                    x: n / c[1]
                })
            },
            pinTab: function(e, t, n) {
                if (-1 == e) var r = curFastChat.clistBox;
                else r = curFastChat.tabs[e].box;
                r.options.fixed = !1, removeClass(r.wrap, "fc_fixed"), FastChat.hideChatCtrl(), FastChat.setActive(!1);
                var i = r.wrap.offsetTop,
                    a = r.wrap.offsetLeft - 10;
                setStyle(r.wrap, {
                    left: r.wrap.offsetLeft,
                    top: r.wrap.offsetTop,
                    right: "auto",
                    bottom: "auto"
                }), n || animate(r.wrap, {
                    left: a,
                    top: i
                }, 300), r.pos = [i, a, r.pos[2], r.pos[3]], r.toRight = !1, r.toBottom = !0, addClass(r.wrap, "fc_tobottom");
                var o = r.resizeableW.clientWidth - intval(getStyle(r.resizeableW, "paddingRight")) - intval(getStyle(r.resizeableW, "paddingLeft")),
                    s = r.resizeableH.clientHeight - intval(getStyle(r.resizeableH, "paddingBottom")) - intval(getStyle(r.resizeableH, "paddingTop")),
                    c = getWndInner(); - 1 == e ? FastChat.stateChange({
                    op: "clist_toggled",
                    val: 1,
                    y: r.toBottom ? -1 : r.pos[0] / c[0],
                    x: r.toRight ? -1 : r.pos[1] / c[1]
                }) : FastChat.stateChange({
                    op: "unfixed",
                    peer: e,
                    y: r.toBottom ? -1 : r.pos[0] / c[0],
                    x: r.toRight ? -1 : r.pos[1] / c[1],
                    h: s / c[0],
                    w: o / c[1]
                }), r.noMove = !0, FastChat.moveBoxesLeft(a), r.noMove = !1
            },
            addPeer: function(e, t, n, r) {
                r || (r = {});
                var i = curFastChat.friends && curFastChat.friends[e + "_"],
                    a = 0;
                if (n ? FastChat.stateChange({
                        op: "added",
                        peer: e,
                        fixed: r.fixed
                    }) : curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && t && (n = !0), i) {
                    var o = {
                        name: i[0],
                        photo: i[1],
                        fname: i[2],
                        hash: i[3],
                        online: curFastChat.onlines[e],
                        sex: i[4]
                    };
                    FastChat.addTabIcon(e, o, r.noAnim), FastChat.addBox(e, o, r), t ? (curFastChat.tabs[e].auto = 1, FastChat.imFeed(e, t)) : (r && r.nofocus || FastChat.activateTab(e), curFastChat.onlines[e] || FastChat.tabNotify(e, "unavail"), a |= 2)
                } else a = 3;
                a && (n ? (curFastChat.needPeers[e] = [a, t, !1, r], FastChat.getPeers()) : (curFastChat.needPeers[e] = [a, t, setTimeout(FastChat.getPeers, irand(150, 200)), r], FastChat.lcSend("needPeer", {
                    id: e,
                    mask: a
                })))
            },
            getPeers: function() {
                var e = [],
                    t = {};
                Object.keys(curFastChat.needPeers || {}).forEach(function(n) {
                    var r = m(curFastChat.needPeers[n], 3),
                        i = r[0],
                        a = r[2];
                    e.push(n, i), a && clearTimeout(a), t[n] = i
                }), e.length && (FastChat.lcSend("fetchingPeers", t), FastChat.loadPeers(e.join(","), function(e) {
                    FastChat.gotPeers(e), FastChat.lcSend("gotPeers", e)
                }))
            },
            gotPeers: function(e) {
                b() || each(curFastChat.needPeers, function(t) {
                    if (e[t]) {
                        e[t] < 2e9 && (curFastChat.friends[t + "_"] = [e[t].name, e[t].photo, e[t].fname, e[t].hash, intval(e[t].sex)]);
                        var n = this[1],
                            r = this[3];
                        2 & this[0] && void 0 === e[t].history || (clearTimeout(this[2]), delete curFastChat.needPeers[t]), curFastChat.tabs[t] ? FastChat.gotHistory(t, e[t].history) : r.fixedLoad ? FastChat.addTabIcon(t, e[t]) : (FastChat.addTabIcon(t, e[t]), FastChat.addBox(t, e[t], r), n ? (curFastChat.tabs[t].auto = 1, FastChat.imFeed(t, n)) : (2 & this[0] && FastChat.gotHistory(t, e[t].history), r && r.nofocus || FastChat.activateTab(t))), r.onHistoryLoaded && r.onHistoryLoaded()
                    }
                })
            },
            gotHistory: function(e, t) {
                if (isArray(t) && t.length && t[0]) {
                    var n = curFastChat.tabs[e],
                        r = t[0],
                        i = t[1];
                    n.offset = t[2], extend(n.msgs, i), each(i, function(e, t) {
                        !t[0] && t[1] && n.unread++
                    }), val(n.log, r), n.logWrap.scrollTop = n.logWrap.scrollHeight, setTimeout(function() {
                        n.logWrap.scrollTop = n.logWrap.scrollHeight, n.scroll && n.scroll.update(!1, !0)
                    }, 10)
                }
            },
            decHashCb: function(e) {
                var t;
                t = e, curFastChat.decodedHashes[t] = function(e) {
                    for (var t = ge ? "" : "___", n = 0; n < e.length; ++n) t += e.charAt(e.length - n - 1);
                    return geByClass ? t : "___"
                }(t.substr(t.length - 5) + t.substr(4, t.length - 12))
            },
            decodehash: function(e) {
                return curFastChat.decodedHashes || (curFastChat.decodedHashes = {}), curFastChat.decodedHashes[e] || FastChat.decHashCb(e), curFastChat.decodedHashes[e]
            },
            loadPeers: function(e, t) {
                ajax.post("al_im.php", {
                    act: "a_get_fc_peers",
                    peers: e
                }, {
                    onDone: t
                })
            },
            sendTyping: function(e) {
                var t = intval(e),
                    n = this.getTab(t),
                    r = Date.now();
                t <= -2e9 || !n || curFastChat.myTypingEvents[t] && r - curFastChat.myTypingEvents[t] < 5e3 || (curFastChat.myTypingEvents[t] = r, ajax.post("al_im.php", {
                    act: "a_activity",
                    type: "typing",
                    peer: t,
                    hash: n.sendhash,
                    from: "fc"
                }))
            },
            setTyping: function(e) {
                var t = this.getTab(e.peerId),
                    n = e.type === u.a;
                if (t && t.typing && n) {
                    var r = t.typing.userIds.filter(function(t, n) {
                        return t !== e.userId
                    });
                    0 === r.length ? delete t.typing : t.typing = Object.assign(t.typing, {
                        userIds: r
                    })
                } else t && !n && (e.ts = Date.now() / 1e3, t.typing = Object.assign(e, {
                    userIds: (e.userIds || []).filter(function(e, t) {
                        return e !== vk.id
                    })
                }))
            },
            waitTyping: function(e) {
                var t = this;
                return Object(l.c)(p.b + 2).then(function() {
                    var n = t.getTab(e.peerId);
                    n && n.typing && (Date.now() - 1e3 * n.typing.ts >= 1e3 * p.b && delete n.typing)
                })
            },
            updateTypings: function() {
                var e = curFastChat.tabs || {};
                Object.keys(e).forEach(function(e) {
                    FastChat.updateTyping(e)
                })
            },
            updateTyping: function(e, t) {
                var n = this.getTab(e),
                    r = ge("fc_tab_typing" + e),
                    i = geByClass1("_fc_tab_typing_progress", r),
                    a = geByClass1("_fc_tab_typing_name", r);
                if (n.typing && n.typing.userIds.length > 0) {
                    var o = this.formatTyping(n.typing);
                    val(a, o), show(i)
                } else val(a, ""), hide(i);
                t ? setStyle(r, "opacity", 1) : fadeTo(r, 200, 1)
            },
            formatTyping: function(e) {
                var t = e.peerId,
                    n = e.userIds,
                    r = this.getTab(t),
                    i = n[0],
                    a = Object(h.Ha)(t) ? r.data.members[i] : r,
                    o = function(e) {
                        return e.fname || e.name || ""
                    };
                if (1 === n.length || !Object(h.Ha)(t)) return langSex(a.sex, getLang("mail_im_typing")).replace("{user}", o(a));
                var s = n[n.length - 1],
                    c = Object(h.Ha)(t) ? r.data.members[s] : r;
                return getLang("mail_im_multi_typing").replace("{users}", o(a)).replace("{last_user}", o(c))
            },
            markMessagesAsRead: function(e) {
                var t = e.type,
                    n = e.peerId,
                    r = e.upToId,
                    i = e.unread,
                    a = this.getTab(n);
                a && (t === u.H && (a.inUpTo = r), t === u.I && (a.outUpTo = r), a.unread = i, this.updateUnreadMessagesInTab(n, r, t === u.I)), this.updateTabUnreadCounterElement(a || {
                    unread: 0
                }, n)
            },
            updateUnreadMessagesInTab: function(e, t, n) {
                var r = this.getTab(e),
                    i = n ? ".fc_msgs_unread.fc_msgs_out" : ".fc_msgs_unread:not(.fc_msgs_out)";
                if (r && r.log) {
                    var a = r.log.querySelectorAll(i);
                    Array.prototype.forEach.call(a, function(e) {
                        +e.getAttribute("data-message-id") <= t && e.classList.remove("fc_msgs_unread")
                    })
                }
            },
            readLastMessages: function(e) {
                var t = FastChat.getTab(e);
                if (e && t) {
                    if (!t.markingRead && t.unread) {
                        var n = [];
                        for (var r in t.msgs) !t.msgs[r][0] && t.msgs[r][1] && n.push(r);
                        n.length > 0 && FastChat.markRead(e, n)
                    }
                    t.unread = 0, FastChat.updateTabUnreadCounterElement(t, e)
                }
            },
            markRead: function(e, t) {
                var n = this.getTab(e);
                n.markingRead = !0, ajax.post("al_im.php", {
                    act: "a_mark_read",
                    peer: e,
                    ids: t,
                    hash: n.sendhash,
                    from: "fc"
                }, {
                    onDone: function(r) {
                        for (var i in n.markingRead = !1, t) {
                            var a = t[i],
                                o = ge("fc_msg" + a),
                                s = o && o.parentNode;
                            o && (n.msgs[a] && n.msgs[a][1] && (n.msgs[a][1] = 0, n.msgs[a][0] || n.unread--), removeClass(o, "fc_msg_unread"), hasClass(s.parentNode, "fc_msgs_unread") && each(s.childNodes, function() {
                                if (!hasClass(this, "fc_msg_unread")) return removeClass(s.parentNode, "fc_msgs_unread"), !1
                            }))
                        }
                        n.unread = 0, FastChat.updateTabUnreadCounterElement(n, e)
                    },
                    onFail: function() {
                        n.markingRead = !1
                    }
                })
            },
            getMessageText: function(e, t) {
                var n = e || "";
                return n = Object(c.e)(n, c.b.bind(null, !1)), n = Object(c.f)(n), n = Object(c.c)(n), n = Object(c.d)(n, function(e) {
                    return '<a href="/im?sel=' + t + "&st=" + encodeURIComponent(e) + '">' + e + "</a>"
                }), n = Emoji.emojiToHTML(n, 1)
            },
            getEditCont: function(e) {
                return stManager.add([jsc("web/emoji.js")]), '<div class="emoji_cont _emoji_field_wrap">' + Emoji.tplSmile(getLang("mail_emoji_hint")) + '<div class="fc_editable dark" tabindex="0" contenteditable="true" placeholder="' + getLang("mail_chat_placeholder") + '"></div></div>'
            },
            getInputValue: function(e) {
                return Emoji ? Emoji.editableVal(e) : ""
            },
            onTxtResize: function(e) {
                var t = curFastChat.tabs[e],
                    n = geByClass1("fc_tab_txt", t.wrap),
                    r = getSize(n)[1];
                if (r > 40) {
                    var i = positive(r - 40);
                    (a = intval(getSize(t.box.resizeableH)[1])) + t.hDiff - i < 40 && (i = a + t.hDiff - 40), setStyle(t.box.resizeableH, {
                        height: a + (t.hDiff || 0) - i
                    }), t.hDiff = i, FastChat.fixResized(t, t.wrap.clientWidth, !0)
                } else if (t.hDiff) {
                    var a = intval(getSize(t.box.resizeableH)[1]);
                    setStyle(t.box.resizeableH, {
                        height: a + t.hDiff
                    }), t.hDiff = 0, FastChat.fixResized(t, t.wrap.clientWidth, !0)
                }
            },
            initTab: function(e, t, n) {
                var r = geByClass1("fc_editable", n),
                    i = curFastChat.tabs[e] = {
                        name: t.name,
                        fname: t.fname,
                        photo: t.photo,
                        link: t.alink || "/id" + e,
                        hash: t.hash,
                        sendhash: FastChat.decodehash(t.hash),
                        sex: t.sex || 0,
                        data: t.data || {},
                        online: t.online,
                        msgs: {},
                        msgscount: 0,
                        unread: 0,
                        box: !1,
                        wrap: n,
                        editable: 1,
                        txt: r,
                        txtWrap: r.parentNode.parentNode,
                        logWrap: geByClass1("fc_tab_log", n),
                        log: geByClass1("fc_tab_log_msgs", n),
                        notify: geByClass1("fc_tab_notify_wrap", n),
                        title: geByClass1("fc_tab_title", n)
                    },
                    a = 30;
                if (i.addMediaBtn = geByClass1("fc_tab_attach", n), i.editable) cur.t = i, i.emojiId = Emoji.init(i.txt, {
                    controlsCont: geByClass1("fc_tab_txt_wrap", n),
                    ttDiff: -46,
                    ttShift: 0,
                    rPointer: !0,
                    global: !0,
                    noRce: !0,
                    peer: e,
                    isChat: !0,
                    noCtrlSend: !0,
                    ref: "fast_chat",
                    onSend: FastChat.send.pbind(e),
                    checkEditable: FastChat.checkEditable,
                    onResize: function() {
                        FastChat.onTxtResize(e)
                    },
                    addMediaBtn: i.addMediaBtn,
                    onShow: function() {
                        cssAnim(i.scroll.scrollbar, {
                            opacity: 0
                        }, {
                            duration: 400
                        })
                    },
                    onHide: function() {
                        cssAnim(i.scroll.scrollbar, {
                            opacity: 1
                        }, {
                            duration: 400
                        })
                    },
                    onEsc: function(e) {
                        return i.box.hide(), cancelEvent(e)
                    },
                    onStickerSend: function(t, n) {
                        FastChat.send(e, t, n)
                    }
                });
                else {
                    autosizeSetup(i.txt, {
                        minHeight: 15,
                        maxHeight: 42
                    }), i.txt.autosize.options.onResize = function(e) {
                        if (!i.box.minimized) {
                            var t = 42 == e ? 42 : 15;
                            t != e && setStyle(i.txt, "height", t), t != a && (setStyle(i.logWrap, "height", i.logWrap.clientHeight - t + a), a = t, i.scroll && i.scroll.update(!1, !0))
                        }
                    }
                }
                return i.imPeerMedias = {}, i.imSortedMedias = {}, i.previewEl = geByClass1("fc_tab_preview", n), stManager.add(["page.js", "page.css", jsc("web/ui_media_selector.js"), "ui_media_selector.css"], function() {
                    i.imMedia = new MediaSelector(i.addMediaBtn, i.previewEl, [
                        ["photo", getLang("profile_wall_photo")],
                        ["video", getLang("profile_wall_video")],
                        ["audio", getLang("profile_wall_audio")],
                        ["doc", getLang("profile_wall_doc")],
                        ["map", getLang("profile_wall_map")]
                    ], {
                        limit: 10,
                        hideAfterCount: 0,
                        maxShown: 0,
                        mail: 1,
                        tooltip: 1,
                        topOffset: 0,
                        forceUp: 1,
                        global: 1,
                        toId: vk.id
                    }), i.imMedia.onChange = setTimeout.pbind(function() {
                        if (curFastChat.sendOnUpload) FastChat.send(curFastChat.sendOnUpload), curFastChat.sendOnUpload = void 0;
                        else {
                            var t = Object(s.b)(curFastChat.ldb, e);
                            t.removeAllAttaches(), i.imMedia.getMedias().forEach(function(e) {
                                return t.addAttach(e[0], e[1])
                            }), t.destroy()
                        }
                        FastChat.onTxtResize(e)
                    }, 0)
                }), i
            },
            addBox: function(e, t, n) {
                if (void 0 === curFastChat.tabs[e]) {
                    var r = FastChat.getEditCont(Emoji.last);
                    n = n || {}, curFastChat.tabs[e] = {};
                    var i = se(rs(FastChat.tplBox, {
                        id: e,
                        name: t.name,
                        myphoto: Notifier.fixPhoto(curFastChat.me.photo, !0),
                        cont: r
                    }));
                    n.fixed && curFastChat.activeBox && curFastChat.activeBox.hide(0, !1, {
                        noState: !0
                    });
                    var a = FastChat.initTab(e, t, i),
                        o = getWndInner(),
                        s = {
                            id: "fc_peer" + e,
                            marginFixedToLayer: !0,
                            peer: e,
                            movable: geByClass1("fc_tab_head", i),
                            closer: geByClass1("fc_tab_close_wrap", i, "a"),
                            resizeableH: a.logWrap,
                            startHeight: 250,
                            startWidth: 270,
                            fixed: n.fixed,
                            minH: 150,
                            minW: 270,
                            nofocus: !0,
                            onFocus: function(t) {
                                a.auto && (FastChat.stateChange({
                                    op: "added",
                                    peer: e
                                }), delete a.auto), FastChat.restoreDraft(e), a.editable ? Emoji.editableFocus(a.txt, !1, !0) : elfocus(a.txt), a.wrap.clientWidth && setStyle(a.title, {
                                    maxWidth: a.wrap.clientWidth - 71
                                }), a.editable || setStyle(a.txt.autosize.helper, {
                                    width: getStyle(a.txt, "width", !1)
                                }), a.scroll && a.scroll.update(!1, !0), setTimeout(elfocus.pbind(a.txt), 10)
                            },
                            onHide: function() {
                                n.fixed && FastChat.hideChatCtrl(), curFastChat.activeBox && e == curFastChat.activeBox.options.peer && FastChat.setActive(!1)
                            },
                            onClose: function(t) {
                                AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(), this.onHide(), n && n.beforeClose && n.beforeClose();
                                var r = curFastChat.tabs,
                                    i = r[e].posSeq;
                                if (delete r[e], curNotifier.isIdle || FastChat.stateChange({
                                        op: "hidden",
                                        peer: e
                                    }), i) {
                                    var a, o, s, c, u, d = {},
                                        _ = [];
                                    for (each(r, function() {
                                            this.posSeq > i && (d[this.posSeq] = this, _.push(this.posSeq))
                                        }), _.unshift(i), _.sort(), u = !browser.msie && _.length < 10, a = 1; a < _.length; a++) o = _[a], s = d[o].box, c = a > 1 ? d[_[a - 1]].box.pos : t, u ? animate(s.wrap, {
                                        left: c[1]
                                    }, 100, function(e) {
                                        e._update_pos()
                                    }.pbind(s)) : setStyle(s.wrap, {
                                        left: c[1]
                                    });
                                    if (!u)
                                        for (a = 1; a < _.length; a++)(s = d[_[a]].box)._update_pos()
                                }
                            },
                            onMinimize: function(t) {
                                FastChat.stateChange({
                                    op: "minimized",
                                    peer: e,
                                    val: t
                                }), FastChat.fixResized(a, a.wrap.clientWidth, !0), t || (a.txt.blur(), FastChat.restoreDraft(e))
                            },
                            onResizeEnd: function(t, n) {
                                var r = getWndInner(),
                                    i = a.box.pos;
                                a.scroll && a.scroll.show(), FastChat.fixResized(a, n, !0), FastChat.stateChange({
                                    op: "resized",
                                    peer: e,
                                    h: t / r[0],
                                    w: n / r[1],
                                    y: a.box.toBottom ? -1 : i[0] / r[0],
                                    x: a.box.toRight ? -1 : i[1] / r[1]
                                })
                            },
                            onResize: function(e, t) {
                                FastChat.fixResized(a, t);
                                var n = geByClass1("fc_tab_title", a.box.content);
                                setStyle(n, {
                                    width: t - 78
                                })
                            },
                            onResizeStart: function() {
                                delete a.posSeq, a.scroll && a.scroll.hide(), val(a.notify, ""), clearTimeout(a.hideNotifyTO)
                            },
                            onDragEnd: function(t, n) {
                                delete a.posSeq, FastChat.stateChange({
                                    op: "moved",
                                    peer: e,
                                    y: t,
                                    x: n
                                })
                            }
                        };
                    if (n && extend(s, n), void 0 === s.startLeft && void 0 === s.startRight) {
                        var c = [],
                            u = o[0] - 350,
                            d = curFastChat.clistBox.pos,
                            _ = !1;
                        if (window.Call && (Call.box || Call.invitation)) {
                            var l = Call.calcBoxPos();
                            c.push([l.x, l.x + l.w]), _ = !0
                        }
                        d[0] + d[2] > u && (curFastChat.clistBox.visible || !_) && c.push([d[1], d[1] + d[3]]), each(curFastChat.tabs, function(t) {
                            (d = this.box && this.box.pos) && t != e && d[0] + d[2] > u && c.push([d[1], d[1] + d[3]])
                        });
                        var f, h, p, m = lastWindowWidth - 262 - sbWidth(),
                            b = !1,
                            g = !1,
                            v = 0 > m ? 1 : -1;
                        for (f = m; v * f < 0 * v; f += 135 * v) {
                            for (h = 0, p = 0; p < c.length; p++) f > c[p][0] - 260 && f < c[p][1] && h++, f > c[p][0] - 10 && f < c[p][0] + 10 && (h += 1.1);
                            (!1 === b || h < g) && (b = f, g = h)
                        }
                        _ && g && (b = m), extend(s, {
                            startBottom: 0,
                            startLeft: b
                        })
                    }
                    var y, O = !0;
                    for (y in n || {})
                        if ("nofocus" != y) {
                            O = !1;
                            break
                        }
                    O && (a.posSeq = ++curFastChat.posSeq), s.fixed && (s.startHeight = curFastChat.clistH, s.startWidth = curFastChat.clistW, s.onShow = FastChat.showChatCtrl), a.box = new RBox(i, s), a.iman = new IdleManager({
                        id: "tab" + e,
                        element: a.box.content,
                        onUnIdleCb: function() {
                            FastChat.readLastMessages(e)
                        },
                        parentManager: curNotifier.idle_manager,
                        idleTimeout: 1e4
                    }), curFastChat.tabs[e].iman.start(), s.fixed && FastChat.setActive(a.box), a.scroll = new Scrollbar(a.logWrap, {
                        prefix: "fc_",
                        nomargin: !0,
                        nokeys: !0,
                        global: !0,
                        right: vk.rtl ? "auto" : 1,
                        left: vk.rtl ? 1 : "auto",
                        onScroll: FastChat.onScroll.pbind(a)
                    }), s.minimized || !n || void 0 === n.startLeft && void 0 === n.startTop && void 0 === n.startWidth && void 0 === n.startHeight || a.box._wnd_resize(o[0], o[1], !0), a.wrap.clientWidth && setStyle(a.title, {
                        maxWidth: a.wrap.clientWidth - 71
                    }), addEvent(a.txt, "keydown", this.onInputKeydown.bind(this, a)), addEvent(a.txt, "keyup", this.onInputKeyUp.bind(this, a, e)), addEvent(a.txt, "focus", this.onInputFocus.bind(this, e)), FastChat.restoreDraft(e), s.onPeerAdded && s.onPeerAdded()
                }
            },
            onInputFocus: function(e) {
                curFastChat.peer = e
            },
            onInputKeydown: function(e, t) {
                if (t.ctrlKey && t.keyCode === KEY.RETURN) {
                    var n = t.target,
                        r = n.value;
                    if ("number" == typeof n.selectionStart && "number" == typeof n.selectionEnd) {
                        var i = n.selectionStart;
                        n.value = r.slice(0, i) + "\n" + r.slice(n.selectionEnd), n.selectionStart = n.selectionEnd = i + 1
                    } else if (document.selection && document.selection.createRange) {
                        n.focus(t);
                        var a = document.selection.createRange();
                        a.text = "\r\n", a.collapse(!1), browser.opera && (a.moveEnd("character", 0), a.moveStart("character", 0)), a.select()
                    }
                    e.editable ? this.checkEditable(e.emojiId, e.txt) : (e.txt.autosize.update(), setTimeout(function() {
                        return e.txt.autosize.update()
                    }, 0))
                }
            },
            onInputKeyUp: function(e, t) {
                var n = e.lastValue || "",
                    r = this.getInputValue(e.txt);
                r.length === n.length && r === n || (r && this.sendTyping(t), e.lastValue = r), clearTimeout(e.saveDraftTO), e.saveDraftTO = setTimeout(this.saveDraft.pbind(t), r.length ? 300 : 0), this.checkEditable(e.emojiId, e.txt)
            },
            onScroll: function(e) {
                var t = e.scroll.obj.scrollTop,
                    n = geByClass1("_fc_msgs_more", e.logWrap);
                t < 200 && isVisible(n) && n.click()
            },
            loadMore: function(e, t) {
                var n = curFastChat.tabs[e],
                    r = n.offset;
                if (n.moreLoading) return !1;
                n.moreLoading = !0, ajax.post("al_im.php", {
                    act: "a_history",
                    peer: e,
                    offset: r,
                    from: "fc"
                }, {
                    onDone: function(e) {
                        e[3] || hide(t);
                        var r = t.parentNode,
                            i = r.clientHeight;
                        r.insertBefore(cf(e[0]), t.nextSibling);
                        var a = r.clientHeight - i;
                        a && (n.logWrap.scrollTop += a), n.scroll.update(), n.offset = e[2], n.moreLoading = !1, FastChat.onScroll(n)
                    },
                    onFail: function() {
                        n.moreLoading = !1
                    },
                    showProgress: lockButton.pbind(t),
                    hideProgress: unlockButton.pbind(t)
                })
            },
            sendOnResponse: function(e, t, n) {
                if (e.version && intval(e.version) > curFastChat.version) FastChat.updateVersion(e.version);
                else {
                    var r = ge("fc_msg" + t),
                        i = e.msg_id,
                        a = indexOf(t, n.newmsgs);
                    if (r) {
                        if (e.media) {
                            var o = {
                                sticker: intval(e.sticker)
                            };
                            FastChat.lcSend("gotMedia", {
                                msgId: t,
                                peer: n.box.options.peer,
                                text: e.media,
                                msgOpts: o
                            }), FastChat.gotMsgMedia(n.box.options.peer, t, e.media, o)
                        }++n.msgscount, -1 != a && n.newmsgs.splice(a, 1), r.id = "fc_msg" + i, n.msgs[i] = [1, 1]
                    }
                }
            },
            checkEditable: function(e, t) {
                Emoji.checkEditable(e, t, {
                    height: 52
                })
            },
            fixResized: function(e, t, n) {
                e && (e.logWrap.scrollTop = e.logWrap.scrollHeight, t > 0 && setStyle(e.title, {
                    maxWidth: t - 71
                }), n && (e.editable || setStyle(e.txt.autosize.helper, {
                    width: getStyle(e.txt, "width", !1)
                }), e.scroll && e.scroll.update(!1, !0)))
            },
            activateTab: function(e) {
                var t = curFastChat.tabs[e].box;
                curFastChat.activeBox && curFastChat.activeBox != t && curFastChat.activeBox.hide(0, !1, {
                    noState: !0
                }), t.show(), t.options.fixed && FastChat.setActive(t)
            },
            blinkTab: function(e) {
                var t = this.getTab(e);
                if (!t.blinking && curFastChat.peer != e) {
                    t.blinking = !0, clearTimeout(t.blinkingTO);
                    var n = t.box.wrap,
                        r = n.className,
                        i = Math.min(1e4, intval(getStyle(n, "zIndex")));
                    setStyle(n, {
                        zIndex: 1e4
                    }), removeClass(n, "rb_inactive"), t.blinkingTO = setTimeout(function() {
                        delete t.blinking, delete t.blinkingTO, 1e4 == getStyle(n, "zIndex") && (setStyle(n, {
                            zIndex: i
                        }), n.className = r)
                    }, 2e3)
                }
            },
            createProgress: function(e, t, n) {
                var r = ce("span", {
                    innerHTML: rs(vk.pr_tpl, {
                        id: "",
                        cls: ""
                    }),
                    className: "fc_msg_progress",
                    id: "fc_msg_progress" + t
                });
                return e.insertBefore(r, n), r
            },
            removeProgress: function(e) {
                re("fc_msg_progress" + e)
            },
            send: function(e, t, n) {
                var r = curFastChat.tabs[e],
                    i = trim(r.editable ? Emoji.editableVal(r.txt) : val(r.txt)),
                    a = "";
                t ? (a = [
                    ["sticker", t]
                ], i = "") : a = r.imMedia ? r.imMedia.getMedias() : [];
                var o = ge("fc_tab_typing" + e),
                    s = geByClass1("page_progress_preview", r.wrap);
                if (s && s.childNodes.length > 0) {
                    curFastChat.sendOnUpload = e;
                    var c = geByClass("fc_tab_log", r.wrap)[0];
                    return FastChat.createProgress(c, e, c.lastChild), void(o.style.visibility = "hidden")
                }
                if (curFastChat.sendOnUpload = !1, FastChat.removeProgress(e), o.style.visibility = "visible", i || a.length) {
                    var u = Object(d.a)(),
                        _ = {
                            act: "a_send",
                            to: e,
                            hash: r.sendhash,
                            msg: i,
                            from: "fc",
                            entrypoint: curFastChat.tabs[e].entrypoint,
                            media: [],
                            random_id: u
                        };
                    n && (_.sticker_referrer = n);
                    for (var l, f = 0, h = a.length; f < h; ++f)(l = a[f]) && _.media.push(l[0] + ":" + l[1]);
                    _.media = _.media.join(","), r.sending = !0, Emoji.ttHide(r.emojiId), curFastChat.tabs[e].entrypoint = !1, ajax.post("al_im.php", _, {
                        onDone: function(t) {
                            clearTimeout(r.saveDraftTO), FastChat.saveDraft(e), FastChat.sendOnResponse(t, u, r)
                        },
                        onFail: function(t) {
                            FastChat.error(e, t || getLang("global_unknown_error")), elfocus(r.txt), val(r.txt, i), r.editable ? FastChat.checkEditable(r.emojiId, r.txt) : r.txt.autosize.update();
                            var n = ge("fc_msg" + u);
                            if (n) return n.appendChild(ce("span", {
                                className: "fc_msg_error",
                                innerHTML: getLang("global_error")
                            })), FastChat.scroll(e), !0
                        },
                        showProgress: function() {
                            r.sending = !0, r.sendProgressTO = setTimeout(function() {
                                var e = ge("fc_msg" + u);
                                e && FastChat.createProgress(e, u, e.firstChild)
                            }, 2e3)
                        },
                        hideProgress: function() {
                            r.sending = !1, clearTimeout(r.sendProgressTO), FastChat.removeProgress(u)
                        }
                    }), re("fc_error" + e), t || (val(r.txt, ""), r.imMedia && r.imMedia.unchooseMedia()), FastChat.addMessage(FastChat.prepareMessageData({
                        messageId: u,
                        text: clean(i).replace(/\n/g, "<br>"),
                        peerId: e,
                        flags: 3,
                        randomId: _.random_id,
                        attaches: []
                    })), delete curFastChat.myTypingEvents[e], r.editable ? FastChat.checkEditable(r.emojiId, r.txt) : r.txt.autosize.update(!1, !0), elfocus(r.txt), FastChat.scroll(e)
                } else r.editable ? Emoji.editableFocus(r.txt, !1, !0) : elfocus(r.txt)
            },
            saveDraft: function(e) {
                var t = curFastChat.tabs[e],
                    n = (t || {}).txt;
                if (n && t) {
                    var r = Emoji.editableVal(n),
                        i = Object(s.b)(curFastChat.ldb, e);
                    i.setText(trim(r) || ""), i.destroy()
                }
            },
            restoreDraft: function(e) {
                var t = curFastChat.tabs[e],
                    n = t.txt,
                    r = Object(s.b)(curFastChat.ldb, e);
                return !(!n || !t || val(n).length > r.dData.txt.length && !r.hasAttaches()) && (t.editable ? n.innerHTML = Emoji.emojiToHTML(clean(r.dData.txt), 1) : val(n, clean(r.dData.txt)), setTimeout(function() {
                    for (var e = r.dData.attaches, n = 0; n < e.length; n++) t.imMedia && t.imMedia.chooseMedia(e[n].type, e[n].id, e[n].object || {});
                    r.destroy()
                }, 40), FastChat.checkEditable(t.emojiId, n), setTimeout(function() {
                    n.scrollTop = n.scrollHeight
                }, 10), !0)
            },
            error: function(e, t) {
                e = e || curFastChat.peer;
                var n = curFastChat.tabs[e];
                re("fc_error" + e), n.log.appendChild(ce("div", {
                    id: "fc_error" + e,
                    className: "fc_msgs_error",
                    innerHTML: t || getLang("global_error")
                })), FastChat.scroll(e)
            },
            scroll: function(e) {
                e = e || curFastChat.peer;
                var t = curFastChat.tabs[e];
                t && (t.logWrap.scrollTop = t.logWrap.scrollHeight, t.scroll && t.scroll.update(!1, !0))
            },
            mkdate: function(e) {
                var t = new Date(1e3 * e),
                    n = new Date,
                    r = function(e) {
                        return (e + "").length < 2 ? "0" + e : e
                    };
                if (t.getDay() == n.getDay()) return r(t.getHours()) + ":" + r(t.getMinutes());
                var i = r(t.getDate()) + "." + r(t.getMonth() + 1);
                return t.getFullYear() != n.getFullYear() && (i += "." + (t.getFullYear() + "").substr(2)), i
            },
            prepareMessageData: function(e) {
                var t = e.peerId,
                    n = e.flags,
                    r = e.messageId,
                    i = e.text,
                    a = e.date,
                    o = Object(f.b)(e),
                    s = this.getMessageMedia(e),
                    c = m(s, 2),
                    u = c[0],
                    d = c[1],
                    _ = "",
                    l = e.randomId;
                return Object(f.l)(e) && (_ = this.renderServiceMessage(e)), -1 !== String(r).indexOf("rid") && (l = Number(r.slice(3))), Object.assign({
                    id: r,
                    peer: t,
                    from_id: o,
                    text: Object(f.l)(e) ? _ : this.getMessageText(i, t) + u,
                    out: Object(f.k)(e),
                    unread: Boolean(1 & n),
                    date: a,
                    date_str: FastChat.mkdate(a),
                    randomId: l,
                    isServiceMessage: Object(f.l)(e)
                }, this.getMessageAuthor(e), d)
            },
            getMessageAuthor: function(e) {
                var t = e.peerId,
                    n = Object(f.b)(e),
                    r = this.getTab(e.peerId);
                if (!r || !n) return {};
                var i = Object(f.k)(e) ? curFastChat.me : Object(h.Ha)(t) ? r.data.members[n] : r,
                    a = i.name,
                    o = i.link,
                    s = i.photo,
                    c = i.fname,
                    u = i.first_name;
                return {
                    fname: Object(h.Ha)(t) ? c || u : "",
                    name: a,
                    link: o,
                    photo: s,
                    from_id: n
                }
            },
            getMessageMedia: function(e) {
                var t = this,
                    n = e.peerId,
                    r = e.messageId,
                    i = "",
                    a = {};
                return !Object(f.l)(e) && Array.isArray(e.attaches) && (e.attaches.forEach(function(e) {
                    switch (e.type) {
                        case "sticker":
                            i += r ? t.renderSticker(e.id, e.productId, e.kind, r) : t.renderSticker(e.id, e.productId), a.sticker = !0;
                            break;
                        case "mail":
                            var o = e.object ? e.object.fwd_count : e.id.split(";").length;
                            i += rs(curFastChat.tpl.msg_fwd, {
                                msg_id: r,
                                peerId_nice: Object(h.H)(n),
                                label: getLang(o > 1 ? "mail_im_fwd_msgs" : "mail_im_fwd_msg")
                            });
                            break;
                        default:
                            i += rs(vk.pr_tpl, {
                                id: "",
                                cls: ""
                            }), r > 0 && setTimeout(FastChat.needMsgMedia.pbind(n, r), 5)
                    }
                }), i && (i = '<div class="fc_msg_attachments" id="fc_msg_attachments' + r + '">' + i + "</div>")), [i, a]
            },
            renderSticker: function(e, t, n, r) {
                var i = window.devicePixelRatio >= 2 ? "256" : "128",
                    a = void 0;
                return "animation" === n ? (a = rs(curFastChat.tpl.animatedSticker, {
                    id: e,
                    size: i,
                    productId: t,
                    messageId: r
                }), Number.isInteger(r) && this.loadStickersModuleIfNeed().then(function() {
                    window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer("animatedSticker" + r, 10)
                })) : a = rs(curFastChat.tpl.sticker, {
                    id: e,
                    size: i
                }), a
            },
            loadStickersModuleIfNeed: function() {
                return new Promise(function(e) {
                    var t = Boolean(window.StickersSettings && window.StickersAnimation);
                    curFastChat.stickersLoading || t ? e() : (curFastChat.stickersLoading = !0, stManager.add([jsc("web/stickers.js")], function() {
                        curFastChat.stickersLoading = !1, e()
                    }))
                })
            },
            renderServiceMessage: function(e) {
                var t = e.kludges,
                    n = e.peerId,
                    r = e.userId,
                    i = t.source_act,
                    a = Number(t.source_mid),
                    o = this.getMember(n, r),
                    s = "",
                    c = r === a;
                switch (i) {
                    case h.j:
                        s = "mail_im_chat_created";
                        break;
                    case h.g:
                        s = t.source_is_channel ? "mail_im_title_updated_channel" : "mail_im_title_updated_dot";
                        break;
                    case h.b:
                        s = c ? "mail_im_returned_to_chat" : "mail_im_invited";
                        break;
                    case h.c:
                        s = c ? "mail_im_left" : "mail_im_kicked_from_chat";
                        break;
                    case h.e:
                        s = "mail_im_photo_set";
                        break;
                    case h.d:
                        s = t.source_is_channel ? "mail_im_photo_removed_channel" : "mail_im_photo_removed";
                        break;
                    case h.f:
                        s = t.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                        break;
                    case h.h:
                        s = t.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                        break;
                    case h.a:
                        s = "mail_im_invite_by_link";
                        break;
                    default:
                        return "mail_no_support"
                }
                if (s = (s = langSex(o.sex, getLang(s, "raw"))).replace("{from}", Object(h.Ib)(o.link, o.name, !0)), a && a !== r) {
                    var u = t.source_email;
                    if (u) s = s.replace("{user}", Object(h.Ib)("/im?email=" + encodeURIComponent(u), "email", !0));
                    else {
                        var d = this.getMember(n, a) || {
                                name_inv_case: "",
                                name_kick_case: "",
                                link: ""
                            },
                            _ = i === h.c ? d.name_kick_case : d.name_inv_case;
                        s = s.replace("{user}", Object(h.Ib)(d.link, _, !0))
                    }
                }
                if (t.source_text) {
                    var l = t.source_old_text ? '«<b class="im_srv_lnk">' + t.source_old_text + "</b>» &rarr; " : "";
                    s = s.replace("{title}", l + '«<b class="im_srv_lnk">' + t.source_text + "</b>»")
                }
                if (t.source_act === h.f || t.source_act === h.h)
                    if (t.source_message) {
                        var f = Object(h.Fb)(Emoji.emojiToHTML(stripHTML(t.source_message.replace(/<br\s?\/?>/gi, " ")), !0)),
                            p = Object(h.Ib)("", f, !1, "im_srv_mess_link");
                        s = s.replace("{msg}", p)
                    } else s = s.replace(/{link}(.+){\/link}/i, function(e, t) {
                        return Object(h.Ib)("", t, !1, "im_srv_mess_link")
                    });
                return s
            },
            getMember: function(e, t) {
                var n = this.getTab(e);
                return Object(h.Ha)(e) && n ? n.data.members[t] : n || null
            },
            needMsgMedia: function(e, t) {
                t <= 0 || (FastChat.lcSend("needMedia", {
                    msgId: t
                }), curFastChat.needMedia[t] = [e, setTimeout(FastChat.loadMsgMedia.pbind(e, t), curNotifier.is_server ? 0 : irand(150, 250))])
            },
            loadMsgMedia: function(e, t) {
                t <= 0 || void 0 !== curFastChat.gotMedia[t] && 0 !== curFastChat.gotMedia[t] || (FastChat.lcSend("fetchingMedia", {
                    msgId: t
                }), curFastChat.gotMedia[t] = 0, ajax.post("al_im.php", {
                    act: "a_get_media",
                    id: t,
                    from: "fc"
                }, {
                    onDone: function(n, r, i) {
                        FastChat.lcSend("gotMedia", {
                            msgId: t,
                            peer: e,
                            text: n[1],
                            msgOpts: i
                        }), FastChat.gotMsgMedia(e, t, n[1], i)
                    }
                }))
            },
            gotMsgMedia: function(e, t, n, r) {
                if (val("fc_msg_attachments" + t, n), r && r.sticker) {
                    var i = ge("fc_msg" + t),
                        a = i && i.parentNode;
                    i && addClass(a.parentNode, "fc_msg_sticker"), window.StickersAnimation && window.StickersAnimation.checkSettingsAndLoadInWeb(t, !1, !1, !0)
                }
                FastChat.scroll(e), curFastChat.gotMedia[t] = [e, n, r], r.stickers && window.Emoji && Emoji.updateTabs(r.stickers, r.keywords), void 0 !== curFastChat.needMedia[t] && (clearTimeout(curFastChat.needMedia[t][1]), delete curFastChat.needMedia[t])
            },
            replaceSpecialSymbols: function(e) {
                return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(/(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, "$1$4")
            },
            addMessage: function(e) {
                var t = e.peer,
                    n = this.getTab(t),
                    r = n.log,
                    i = void 0;
                if (!n || e.out || !n.box.visible || n.iman.is_idle || curNotifier.idle_manager.is_idle || (e.unread = !1, FastChat.markRead(e.peer, [e.id])), e.randomId && re(document.querySelector('[data-random-id="' + e.randomId + '"]')), n.msgs[e.id] = [e.out, e.unread], this.isNewStack(e)) {
                    re("fc_log_empty" + t);
                    var a = (e.out ? "fc_msgs_out " : "") + (e.unread ? "fc_msgs_unread" : "");
                    e.sticker && (a += " fc_msg_sticker"), e.isServiceMessage && (a += " fc_srv_msg");
                    var o = e.isServiceMessage ? curFastChat.tpl.msgs_service : e.out ? curFastChat.tpl.msgs_out : curFastChat.tpl.msgs;
                    i = se(rs(o, {
                        from_id: e.from_id,
                        link: e.link,
                        photo: Notifier.fixPhoto(e.photo),
                        name: e.from_id == curFastChat.me.id ? getLang("mail_im_thats_u") : stripHTML(e.name),
                        classname: a,
                        date: e.date,
                        date_str: e.date_str,
                        msgs: "",
                        randomId: e.randomId || 0,
                        messageId: e.id
                    })), r.appendChild(i)
                } else e.unread || removeClass(i, "fc_msgs_unread");
                var s = geByClass1("fc_msgs_list", i, "div"),
                    c = geByClass1("fc_msgs_date", s),
                    u = geByClass1("fc_msg_last", s);
                u && removeClass(u, "fc_msg_last");
                var d = se(rs(curFastChat.tpl.msg, {
                    msg_id: e.id,
                    classname: (e.unread ? "fc_msg_unread" : "") + (e.isServiceMessage ? " fc_srv_msg" : "") + " fc_msg_last",
                    text: FastChat.replaceSpecialSymbols(e.text)
                }));
                domFC(s) && "BR" == domFC(s).tagName && re(domFC(s)), c ? s.insertBefore(d, c) : s.appendChild(d), vk.id != e.from_id && (delete curFastChat.typingEvents[t], FastChat.updateTyping(t, 1)), n.scroll && n.scroll.update()
            },
            getTab: function(e) {
                return curFastChat.tabs[e]
            },
            isTabLoaded: function(e) {
                return Boolean(curFastChat.tabs && this.getTab(e))
            },
            isNewStack: function(e) {
                var t = this.getTab(e.peer).log.lastChild;
                return t && "fc_msgs_error" == t.className && (t = t.previousSibling), !t || (!hasClass(t, "fc_msgs_wrap") || (!hasClass(t, "fc_msgs_unread") && !0 === e.unread || (t.getAttribute("data-from") !== e.from_id || (e.date - intval(t.getAttribute("data-date")) >= 300 || !(!e.sticker && !hasClass(t, "fc_msg_sticker"))))))
            },
            editMessage: function(e) {
                var t = e.id,
                    n = ge("fc_msg" + t);
                if (n) {
                    var r = se(rs(curFastChat.tpl.msg, {
                        msg_id: t,
                        classname: n.getAttribute("class"),
                        text: FastChat.replaceSpecialSymbols(e.text)
                    }));
                    n.parentNode.replaceChild(r, n)
                }
            },
            deleteMessage: function(e) {
                var t = e.id,
                    n = ge("fc_msg" + t);
                if (n) {
                    var r = !domNS(n) && !domPS(n),
                        i = domClosest("fc_tab_log_msgs", n);
                    for (re(r ? domClosest("fc_msgs_wrap", n) : n); hasClass(domLC(i), "fc_msgs_date");) re(domLC(i))
                }
            },
            updateTabUnreadCounter: function(e, t) {
                if (!e) {
                    var n = document.querySelector("#chat_tab_icon_" + t.peerId),
                        r = n && n.querySelector(".chat_tab_counter");
                    e = {
                        unread: r && Math.max(+r.innerHTML, 0) || 0
                    }
                }
                Object(f.k)(t) ? e.unread = 0 : e.unread++, this.updateTabUnreadCounterElement(e, t.peerId)
            },
            updateTabUnreadCounterElement: function(e, t) {
                if (e) {
                    var n = document.querySelector("#chat_tab_icon_" + t),
                        r = n && n.querySelector(".chat_tab_counter");
                    r && (r.innerHTML = e.unread > 0 ? e.unread : ""), e.title && e.name && (val(e.title, e.name + (e.unread ? ' <span class="fc_tab_count">(' + e.unread + ")</span>" : "")), val("fc_contact_unread" + t, e.unread ? " <b>+" + e.unread + "</b>" : ""))
                }
            },
            showMsgFwd: function(e) {
                return !showBox("al_im.php", {
                    act: "a_show_forward_box",
                    id: vk.id + "_" + e,
                    from: "mail"
                }, {
                    stat: ["im.css"],
                    dark: 1,
                    params: {
                        onHide: function() {
                            AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(!0)
                        }
                    }
                })
            },
            closeTab: function(e) {
                curFastChat.tabs[e].box.close()
            },
            updateQueueKeys: function() {
                location.reload(!0)
            },
            toggleFastChats: function(e) {
                var t = this,
                    n = !e;
                toggleClass(ge("chat_onl_wrap"), "fast_chats_toggle_hide", n), toggleClass(ge("rb_box_fc_clist"), "fast_chats_toggle_hide", n), each(geByClass("rb_box_wrap"), function() {
                    return toggleClass(t, "fast_chats_toggle_hide", n)
                })
            },
            tplBox: '<div class="fc_tab_wrap"><div class="fc_tab_head clear_fix"><a class="fc_tab_close_wrap"><div class="chats_sp fc_tab_close"></div></a><a class="fc_tab_max_wrap" href="/im?sel=%id%" onmousedown="event.cancelBubble = true;" onclick="return nav.go(this, event);"><div class="chats_sp fc_tab_max"></div></a><a class="fc_tab_pin_wrap" onmousedown="event.cancelBubble = true;" onclick="return FastChat.pinTab(%id%, event);"><div class="chats_sp fc_tab_pin"></div></a><div class="fc_tab_title noselect">%name%</div></div><div class="fc_tab"><div class="fc_tab_log_wrap"><div class="fc_tab_notify_wrap"></div><div class="fc_tab_log"><div class="fc_tab_log_msgs"></div><div class="fc_tab_typing" id="fc_tab_typing%id%"><div class="pr fc_tab_typing_icon _fc_tab_typing_progress" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><div class="fc_tab_typing_name _fc_tab_typing_name"></div></div></div></div><div class="fc_tab_txt_wrap"><a class="fc_tab_attach"></a><div class="fc_tab_txt">%cont%<div class="fc_tab_preview"></div></div></div></div><div class="fc_pointer_offset"><div class="fc_tab_pointer fc_tab_pointer_peer"></div></div></div>',
            tplTab: '<div class="fc_tab_log_wrap"><div class="fc_tab_notify_wrap"></div><div class="fc_tab_log"><div class="fc_tab_log_msgs"></div><div class="fc_tab_typing" id="fc_tab_typing%id%"><div class="pr fc_tab_typing_icon _fc_tab_typing_progress" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><div class="fc_tab_typing_name _fc_tab_typing_name"></div></div></div></div><div class="fc_tab_txt_wrap"><div class="fc_tab_txt">%cont%</div></div>'
        }, window.DesktopNotifications = {
            supported: function() {
                return !(!window.webkitNotifications && !window.Notification)
            },
            checkPermission: function() {
                return window.webkitNotifications ? webkitNotifications.checkPermission() : "granted" == Notification.permission ? 0 : 1
            },
            requestPermission: function(e) {
                (window.webkitNotifications || window.Notification).requestPermission(e)
            },
            createNotification: function(e, t, n) {
                var r = void 0;
                return window.webkitNotifications ? r = webkitNotifications.createNotification(e, t, n) : ((r = new Notification(t, {
                    icon: e,
                    body: n
                })).cancel = function() {
                    this.close()
                }, r.show = function() {}), vk.id % 100 < 10 && statlogsValueEvent("browser_notification", 0), r
            }
        };
        n("j0Lq");
        window.getWndInner = function() {
            var e = lastWindowWidth,
                t = lastWindowHeight,
                n = sbWidth();
            return (!1 !== lastWndScroll[0] ? lastWndScroll[0] : htmlNode.scrollHeight > htmlNode.clientHeight) && (e -= n + (n ? 1 : 0)), [t, e]
        }, window.lastWndScroll = [!1, !1], window.updateWndVScroll = function() {
            var e = window,
                t = !1;
            t = e.boxLayerWrap && isVisible(boxLayerWrap) ? boxLayerWrap.scrollHeight > boxLayerWrap.clientHeight ? 1 : 0 : e.layerWrap && isVisible(layerWrap) ? layerWrap.scrollHeight > layerWrap.clientHeight ? 1 : 0 : !(!e.mvLayerWrap || !isVisible(mvLayerWrap)) && (mvLayerWrap.scrollHeight > mvLayerWrap.clientHeight ? 1 : 0), each(curRBox.tabs, function(e) {
                this.options.marginFixedToLayer && setStyle(this.wrap, {
                    marginRight: hasClass(document.body, "layers_shown") ? sbWidth() : 0
                })
            }), t !== lastWndScroll[0] && (lastWndScroll[0] = t, each(curRBox.tabs, function(e) {
                this.toRight && !this.options.marginFixedToLayer && setStyle(this.wrap, {
                    marginRight: t ? sbWidth() : 0
                })
            }))
        }, window.defBox = function(e, t) {
            var n = '<div class="' + (e.subClass || "") + '"><div class="fc_tab_head"><a class="fc_tab_close_wrap fl_r"><div class="chats_sp fc_tab_close"></div></a><div class="fc_tab_title noselect">%title%</div></div><div id="fc_ctabs_cont"><div class="fc_ctab fc_ctab_active">%content%</div></div></div></div>',
                r = void 0;
            r = e.content ? '<div class="fc_content_wrap"><div class="fc_content">' + e.content + "</div></div>" : e.innerHTML;
            var i = se(rs(n, {
                title: e.title,
                content: r
            }));
            r = geByClass1("fc_content", i, "div");
            var a = {
                    movable: geByClass1("fc_tab_head", i),
                    hider: geByClass1("fc_tab_close_wrap", i, "a"),
                    startLeft: e.x,
                    startTop: e.y,
                    startHeight: e.height,
                    startWidth: e.width,
                    resizeableH: r,
                    resize: !1,
                    minH: e.minH,
                    onBeforeHide: e.onBeforeHide || function() {},
                    onHide: e.onHide || function() {},
                    onDragEnd: function(e, t) {},
                    onResize: function(e, t) {}
                },
                o = new RBox(i, extend(a, e)),
                s = void 0;
            return e.content && (s = new Scrollbar(r, {
                prefix: "fc_",
                more: debugLog,
                nomargin: !0,
                global: !0,
                nokeys: !0,
                right: vk.rtl ? "auto" : 0,
                left: vk.rtl ? 0 : "auto",
                onHold: e.onHold
            })), t({
                id: o.id,
                cont: r,
                update: function() {
                    s && s.update()
                }
            }), o
        };
        try {
            stManager.done("notifier.js")
        } catch (e) {}
    },
    BxOC: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return a
        }), n.d(t, "a", function() {
            return o
        });
        var r = window.ajax,
            i = 2;

        function a(e, t, n) {
            return t && (t.im_v = i), new Promise(function(i, a) {
                r.post(e, t, {
                    timeout: n,
                    onDone: function() {
                        i.apply(null, [
                            [].concat(Array.prototype.slice.call(arguments))
                        ])
                    },
                    onFail: function() {
                        return a.apply(null, arguments), !0
                    }
                })
            })
        }

        function o(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                i = void 0;
            return i = window.XDomainRequest ? new XDomainRequest : r._getreq(), {
                request: new Promise(function(r, a) {
                    var o = void 0,
                        s = Date.now(),
                        c = n.timeout || 60,
                        u = ajx2q(t);
                    if (window.XDomainRequest) i.open("get", e + "?" + u), i.ontimeout = function(e) {
                        a([e, {}])
                    }, i.onerror = function(e) {
                        a([e, {}])
                    }, i.onload = function() {
                        r([i.responseText, {}])
                    }, setTimeout(function() {
                        i.send()
                    }, 0);
                    else {
                        i.onreadystatechange = function() {
                            4 == i.readyState && (clearInterval(o), i.status >= 200 && i.status < 300 ? r([i.responseText, i]) : a([i.responseText, i]))
                        };
                        try {
                            i.open("GET", e + "?" + u, !0)
                        } catch (e) {
                            return a([e, i])
                        }
                        i.send()
                    }
                    o = setInterval(function() {
                        Date.now() - s > 1e3 * c && (a(["", {}]), clearInterval(o))
                    }, 1e3)
                }),
                cancel: function() {
                    i.abort()
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

        function i(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                i = 0;
            return function a() {
                for (var o = arguments.length, s = Array(o), c = 0; c < o; c++) s[c] = arguments[c];
                return Promise.resolve().then(function() {
                    return e.apply(void 0, s)
                }).catch(function(e) {
                    if (++i <= t) {
                        var o = "function" == typeof n ? n(i) : 0;
                        return 0 === o ? a.apply(void 0, s) : r(o).then(function() {
                            return a.apply(void 0, s)
                        })
                    }
                    throw e
                })
            }
        }

        function a(e, t, n) {
            var r = void 0,
                i = void 0;
            return function() {
                for (var a = arguments.length, o = Array(a), s = 0; s < a; s++) o[s] = arguments[s];
                return new Promise(function(e, a) {
                    var s = n && !r;
                    clearTimeout(r), i && i.reject("debounce"), r = setTimeout(function() {
                        r = null, i = null, n || e(o)
                    }, t), s ? e(o) : n && a("debounce"), i = {
                        resolve: e,
                        reject: a
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

        function o(e, t) {
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
            return i
        }), n.d(t, "b", function() {
            return a
        }), n.d(t, "a", function() {
            return o
        })
    },
    ERyv: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return u
        }), n.d(t, "b", function() {
            return d
        }), n.d(t, "a", function() {
            return _
        }), n.d(t, "d", function() {
            return l
        }), n.d(t, "e", function() {
            return f
        });
        var r = n("BxOC"),
            i = n("DM26"),
            a = void 0,
            o = 1;

        function s(e, t, n, r, i) {
            if ("Script error." !== e) {
                var o = i ? i.stack || i.message : null;
                d("unhandled_error", o ? {
                    err: e,
                    stack: o
                } : {
                    err: e
                })
            }
            a && a.apply(this, arguments)
        }

        function c(e) {
            e.preventDefault()
        }

        function u() {
            return !!window.imwl
        }

        function d(e, t) {
            var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            u() && (n && window.console && (console.error(e, t), console.trace && console.trace()), Object(i.d)(r.b, 3, function() {
                return 2
            })("al_im.php", {
                act: "a_weird_log",
                kind: e,
                data: JSON.stringify(extend({
                    errIdx: o++,
                    ua: navigator.userAgent
                }, t))
            }))
        }

        function _(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return d(e, extend({
                err: t && t.message || t
            }, n)), Promise.reject(t)
        }

        function l() {
            a = window.onerror, window.onerror = s, window.addEventListener("unhandledrejection", c)
        }

        function f() {
            window.onerror = a, a = void 0, window.removeEventListener("unhandledrejection", c)
        }
    },
    EUzL: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return a
        });
        var r = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();

        function i(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }

        function a(e, t, n) {
            var a = 0,
                o = e,
                s = [],
                c = !1;

            function u() {
                !s.length || a > 0 || c || (t(s), s = [])
            }
            return {
                pause: function() {
                    a++
                },
                resume: function() {
                    a > 0 && (a--, u())
                },
                onLp: function(e, t, a) {
                    var d;
                    c || (o >= e ? (o = t, (d = s).push.apply(d, i(a)), u()) : n && (c = !0, n(o).then(function(e) {
                        var t, n = r(e, 3),
                            a = (n[0], n[1]),
                            d = n[2];
                        o = a, c = !1, (t = s).push.apply(t, i(d)), u()
                    })))
                }
            }
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
                var i = "flat_button";
                "no" === n || "gray" === n ? (i += " secondary", n = "cancel") : n = "ok";
                var a = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.e)("button", {
                    className: i,
                    innerHTML: e,
                    id: r
                });
                return boxButtons.rows[0].insertCell(0).appendChild(a), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.d)(a, function() {
                    emitter.emit(n, retBox), t.apply(null, arguments)
                }), btns[n].push(a), a
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
                        var i = function() {
                            boxQueue.currHiding === _message_boxes[guid] && (boxQueue.currHiding = !1), _message_boxes[guid].shOther || e || layers.boxhide(), !t && options.selfDestruct ? destroyMe() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxContainer), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onHide) && options.onHide(n)
                        };
                        r > 0 ? (boxQueue.currHiding = _message_boxes[guid], Object(_fx__WEBPACK_IMPORTED_MODULE_5__.f)(boxContainer, r, i)) : i()
                    }
                };

            function showMe(e, t, n) {
                if (!visible && window._message_boxes[guid]) {
                    visible = !0;
                    var r = !0 === e || t ? 0 : options.animSpeed;
                    if (options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(document, "click", boxQueue.hideBGClick), t || layers.boxshow(), boxQueue.currHiding) {
                        boxQueue.currHiding.shOther = !0;
                        var i = boxQueue.currHiding.bodyNode.parentNode.parentNode;
                        Object(_dom__WEBPACK_IMPORTED_MODULE_4__.i)(i, "tween").stop(!0)
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
                addButton: function(e, t, n, r, i) {
                    var a = _addButton(e, t || this.hide, n, i);
                    return r ? a : this
                },
                setButtons: function(e, t, n, r) {
                    var i = this.removeButtons();
                    return e ? (i.addButton(e, t), n && i.addButton(n, r, "no"), i) : i.addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("box_close"))
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
                            var i = t[n].split(":");
                            i.length > 1 && i[0].length && (boxBody.style[Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(i[0])] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(i[1]), boxBody.style.setProperty && boxBody.style.setProperty(Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(i[0]), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(i[1]), ""))
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
            var i = n.params || {};
            n.containerClass && (i.containerClass = n.containerClass);
            var a = new MessageBox(i),
                o = {
                    onDone: function(r, o, s, c) {
                        if (n.preOnDone && n.onDone && n.onDone(a), a.isVisible())
                            if (__debugMode) u();
                            else try {
                                u()
                            } catch (n) {
                                Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.c)(n, {
                                    dt: 15,
                                    type: 103,
                                    url: e,
                                    query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.b)(t),
                                    answer: Array.prototype.slice.call(arguments).join("<!>")
                                }), a.isVisible() && a.hide()
                            } else n.onDone && n.onDone(a, c);

                        function u() {
                            Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.a)(bodyNode, "layers_shown"), a.setOptions({
                                title: r,
                                hideButtons: i.hideButtons || !1
                            }), n.showProgress ? a.show() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(a.bodyNode), a.content(o), a.evalBox(s, e, t), n.onDone && n.onDone(a, c)
                        }
                    },
                    onFail: function(e) {
                        if (a.failed = !0, setTimeout(a.hide, 0), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(n.onFail)) return n.onFail(e)
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
            }), n.hideProgress = _dom__WEBPACK_IMPORTED_MODULE_4__.W.pbind("global_prg")), n.showProgress ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.i)(o, {
                showProgress: n.showProgress,
                hideProgress: n.hideProgress
            }) : (a.setOptions({
                title: !1,
                hideButtons: !0
            }).show(), boxQueue.count() < 2 && (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ha)(bodyNode, "layers_shown")), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(a.bodyNode), o.showProgress = function() {
                Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxLoader), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxLoader)
            }, o.hideProgress = _dom__WEBPACK_IMPORTED_MODULE_4__.W.pbind(boxLoader)), a.removeButtons().addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_close")), ajax.post(e, t, o), a
        }

        function showTabbedBox(e, t, n, r) {
            return (n = n || {}).stat = n.stat || [], n.stat.push("box.js", "boxes.css"), showBox(e, t, n, r)
        }

        function showFastBox(e, t, n, r, i, a) {
            return new MessageBox("string" == typeof e ? {
                title: e
            } : e).content(t).setButtons(n, r, i, a).show()
        }

        function showCaptchaBox(e, t, n, r) {
            var i = function(t) {
                    if (!t || void 0 === t.keyCode || 10 === t.keyCode || 13 === t.keyCode) {
                        var i = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("input", n.bodyNode);
                        if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(i.value) || !0 === t) {
                            var a = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("img", n.bodyNode)[0];
                            Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(i), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(a), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("progress", n.bodyNode)), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(i), r.onSubmit(e, i.value)
                        } else Object(_dom__WEBPACK_IMPORTED_MODULE_4__.E)(i)
                    }
                },
                a = !!n,
                o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.r)(t) ? "" : "&s=1",
                s = r.imgSrc || "/captcha.php?sid=" + e + o;
            if (!a) {
                var c = '\n<div class="captcha">\n  <div><img src="' + s + '"/></div>\n  <div>\n    <input type="text" class="big_text" maxlength="7" placeholder="' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_captcha_input_here") + '" />\n    <div class="progress" /></div>\n  </div>\n</div>' + (r.addText || "");
                n = showFastBox({
                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_enter_code"),
                    width: 305,
                    onHide: r.onHide,
                    onDestroy: r.onDestroy || !1
                }, c, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_send"), function() {
                    n.submit()
                }, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_cancel"), function() {
                    var e = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("input", n.bodyNode),
                        t = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("img", n.bodyNode);
                    Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(e), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(t), n.hide()
                })
            }
            n.submit = i.pbind(!0), n.changed = !0;
            var u = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("input", n.bodyNode),
                d = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("img", n.bodyNode);
            return a && (u.value = "", d.src = "/captcha.php?sid=" + e + o, Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("progress", n.bodyNode))), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(u), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(u, "keypress", i), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(d, "click", function() {
                this.src = "/captcha.php?sid=" + e + o + "&v=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.s)(1e6, 2e6)
            }), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.E)(u), n
        }

        function showReCaptchaBox(e, t, n, r) {
            window.recaptchaResponse = function(e) {
                r.onSubmit(e)
            };
            var i = !!n,
                a = !!window.grecaptcha;
            if (!i) {
                a || (window.recaptchaCallback = function() {
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
                var o = '<div class="recaptcha"></div>' + (r.addText || "");
                n = showFastBox({
                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_recaptcha_title"),
                    width: 354,
                    onHide: r.onHide,
                    onDestroy: r.onDestroy || !1
                }, o, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_cancel"));
                var s = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("recaptcha", n.bodyNode);
                s.id = "recaptcha" + (n.guid ? n.guid : "0"), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.u)(s)
            }
            return i && a ? window.grecaptcha.reset() : a && window.recaptchaCallback(), n.changed = !0, n
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
            for (var i in e)
                if (null != e[i] && !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.v)(e[i]))
                    if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.t)(e[i]))
                        for (var a = 0, o = 0, s = e[i].length; a < s; ++a) null == e[i][a] || Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.v)(e[i][a]) || (n.push(r(i) + "[" + o + "]=" + r(e[i][a])), ++o);
                    else n.push(r(i) + "=" + r(e[i]));
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
                var i = r.split("=");
                if (i[0]) {
                    var a = n(i[1] + "");
                    if ("[]" === i[0].substr(i.length - 2)) {
                        var o = n(i[0].substr(0, i.length - 2));
                        t[o] || (t[o] = []), t[o].push(a)
                    } else t[n(i[0])] = a
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
            plainpost: function(e, t, n, r, i, a, o, s) {
                var c = ajax._getreq(),
                    u = "string" != typeof t ? ajx2q(t, o && o.noSort) : t;
                c.onreadystatechange = function() {
                    4 === c.readyState && (c.status >= 200 && c.status < 300 ? n && n(c.responseText, c) : r && r(c.responseText, c))
                };
                try {
                    c.open("POST", e, !0)
                } catch (e) {
                    return !1
                }
                return a && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(a, function(e, t) {
                    c[e] = t
                }), i || (c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s || c.setRequestHeader("X-Requested-With", "XMLHttpRequest")), c.send(u), c
            },
            post: function(e, t, n) {
                "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
                var r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)({
                        _captcha: !1,
                        _box: !1
                    }, n || {}),
                    i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)({
                        al: r.frame ? -1 : 1
                    }, t),
                    a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.L)(),
                    o = vk.spentLastSendTS ? Math.round((a - vk.spentLastSendTS) / 1e3) : 0;
                if (vk.sampleUser >= 0 && window.cur && cur.module && o >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (i._smt = cur.module + ":" + o), vk.spentLastSendTS = a), r.progress && (r.showProgress || (r.showProgress = function() {
                        var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)(r.progress);
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.V)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Qa)(e, "opacity", 1), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(e)
                    }), r.hideProgress || (r.hideProgress = function() {
                        var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)(r.progress);
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.V)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Qa)(e, "opacity", 0), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(e)
                    })), r.loader) {
                    var s = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Aa)(boxLayerWrap);
                    r.showProgress = function() {
                        boxRefreshCoords(boxLoader), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(boxLoader), s || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(boxLayerWrap)
                    }, r.hideProgress = function() {
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(boxLoader), s || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(boxLayerWrap)
                    }
                }
                return ajax._post(e, i, r)
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
                        var i = r.indexOf(">"),
                            a = r.substr(2, i - 2);
                        switch (r = r.substr(i + 1), a) {
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
                    var i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n.shift());
                    if (!i) return fail("<pre>" + e + "</pre>", {
                        status: -1
                    });
                    if (vk.version && vk.version !== i) i && n.length > 4 ? nav.reload({
                        force: !0,
                        from: 2,
                        url: url,
                        query: query && ajx2q(query)
                    }) : nav.strLoc ? location.replace(locBase) : Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)("Server error.", {
                        type: 100
                    });
                    else {
                        vk.version = !1;
                        var a = n.shift(),
                            o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n.shift()),
                            s = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n.shift());
                        options.frame && (n = t);
                        var c = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n.shift());
                        if (vk.lang !== o && options.canReload) nav.reload({
                            force: !0,
                            from: 3,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        else {
                            var u = function() {
                                var e = ["common.css"];
                                if (a)
                                    for (var t = 0, r = (a = a.split(",")).length; t < r; ++t) e.push(a[t]);
                                if (stVersions.lang < s)
                                    for (var i in stVersions.lang = s, StaticFiles) /^lang\d/i.test(i) && e.push(i);
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
                                stManager.add(e, _processResponse.pbind(c, n))
                            };
                            if (window.stVersions) {
                                if (i === stVersions.nav) return u();
                                headNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.e)("script", {
                                    type: "text/javascript",
                                    src: "/js/loader_nav" + i + "_" + vk.lang + ".js"
                                })), setTimeout(function e() {
                                    if (i === stVersions.nav) return u();
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
            return a
        }), n.d(t, "l", function() {
            return o
        }), n.d(t, "e", function() {
            return s
        }), n.d(t, "k", function() {
            return c
        }), n.d(t, "c", function() {
            return u
        }), n.d(t, "g", function() {
            return _
        }), n.d(t, "d", function() {
            return l
        }), n.d(t, "m", function() {
            return f
        }), n.d(t, "f", function() {
            return h
        }), n.d(t, "i", function() {
            return p
        }), n.d(t, "j", function() {
            return m
        }), n.d(t, "o", function() {
            return b
        }), n.d(t, "h", function() {
            return g
        }), n.d(t, "b", function() {
            return v
        }), n.d(t, "a", function() {
            return y
        }), n.d(t, "p", function() {
            return O
        });
        var r = n("f01n"),
            i = n("aong");

        function a(e, t) {
            return "number" != typeof t.messageId || (c(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to)
        }

        function o(e) {
            return e.kludges && void 0 !== e.kludges.source_act
        }

        function s(e) {
            return "call" == e.kludges.attach1_type
        }

        function c(e) {
            return e.flags & r.m
        }

        function u(e) {
            var t = e.attaches.filter(function(e) {
                return "mail" === e.type
            }).length > 0;
            return e.attaches.filter(function(e) {
                return "reply" === e.type
            }).length > 0 || e.flags & r.k && t
        }

        function d(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                r = e.attaches[0];
            return r && (r.type === t || r.type === n)
        }

        function _(e) {
            return d(e, "doc") && "graffiti" === e.attaches[0].kind
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

        function h(e) {
            return d(e, "gift")
        }

        function p(e) {
            return d(e, "money_transfer", "money_request")
        }

        function m(e) {
            return d(e, "money_request")
        }

        function b(e) {
            return d(e, "link", "vkpay") && 6217559 == e.kludges.attach1_app_id
        }

        function g(e) {
            return e.flags & r.l
        }

        function v(e) {
            return c(e) ? vk.id : e.userId
        }

        function y(e, t) {
            var n = Object(i.r)(e);
            return c(t) ? n.id : t.userId
        }

        function O(e) {
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
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = new window.Map;

        function a(e) {
            var t = i.get(e.currentTarget);
            if (t) {
                var n = t[e.type];
                if (n)
                    for (var a = void 0, o = 0; o < n.length; o++) {
                        var s = r(n[o], 2),
                            c = s[0],
                            u = s[1],
                            d = void 0;
                        if (hasClass(e.target, c) ? d = u(e, e.target) : (a = gpeByClass(c, e.target, e.currentTarget)) && (d = u(e, a)), !1 === d) break
                    }
            }
        }

        function o(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        n.d(t, "b", function() {
            return d
        }), n.d(t, "a", function() {
            return l
        }), n.d(t, "c", function() {
            return f
        });
        var s = window,
            c = s.addEvent,
            u = s.removeEvent;

        function d(e) {
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

        function _(e, t, n, r, o) {
            ! function(e, t, n, r) {
                var o = i.get(e);
                o || (i.set(e, {}), o = i.get(e));
                for (var s = t.split(" "), c = 0; c < s.length; c++) {
                    var u = s[c];
                    o[u] || (o[u] = [], addEvent(e, u, a)), o[u].push([n, r])
                }
            }(t, n, r, o), e._registeredHandlers.push(["delegate", t, n, r, o])
        }

        function l(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(function(e, t, n, r) {
                c(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
            }.bind(null, t), _.bind(null, t)), t
        }

        function f(e) {
            e._registeredHandlers.forEach(function(e) {
                var t = e.slice(1);
                "delegate" === e[0] ? function(e, t, n, r) {
                    var o = i.get(e);
                    o && (t.split(" ").forEach(function(t) {
                        o[t] && (o[t] = o[t].filter(function(e) {
                            return e[0] !== n || e[1] !== r
                        }), 0 === o[t].length && removeEvent(e, t, a))
                    }), 0 === Object.keys(o).map(function(e) {
                        return o[e].length
                    }).reduce(function(e, t) {
                        return e + t
                    }) && i.delete(e))
                }.apply(void 0, o(t)) : u.apply(void 0, o(t))
            }), e._registeredHandlers = []
        }
    },
    O8ze: function(e, t, n) {
        "use strict";
        n.d(t, "e", function() {
            return o
        }), n.d(t, "g", function() {
            return s
        }), n.d(t, "d", function() {
            return c
        }), n.d(t, "f", function() {
            return u
        }), n.d(t, "k", function() {
            return _
        }), n.d(t, "m", function() {
            return l
        }), n.d(t, "l", function() {
            return f
        }), n.d(t, "h", function() {
            return h
        }), n.d(t, "i", function() {
            return m
        }), n.d(t, "j", function() {
            return b
        }), n.d(t, "c", function() {
            return g
        }), n.d(t, "b", function() {
            return v
        }), n.d(t, "a", function() {
            return y
        });
        var r = n("1y80"),
            i = n("aong"),
            a = {};

        function o(e) {
            Object(r.b)(.1, "im_forward_stat", d(e), !!e.get().gid)
        }

        function s(e, t) {
            Object(r.b)(.1, "im_forward_from_community_stat", d(e), !!e.get().gid, +t)
        }

        function c() {
            Object(r.b)(1, "im_apply_community_template_stat", 1)
        }

        function u() {
            Object(r.b)(1, "messages_channel_forward_click", 1)
        }

        function d(e) {
            var t = e.get().pendingForward;
            return +(t && t.msgIds && t.msgIds.length)
        }

        function _(e, t, n) {
            var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (!Object(r.a)(1)) return function() {};
            var a = +new Date,
                o = p(e);
            return function() {
                var e = +new Date - a;
                Object(r.c)("messages_send_time_web", e, t, n, o, i)
            }
        }

        function l(e, t, n, r) {
            if (t.messageId && -1 !== String(t.messageId).indexOf("rid")) {
                var i = [t.messageId.replace("rid", ""), n, r].join("_"),
                    o = t.attaches.length > 0;
                a[i] = _(e, n, r, o)
            }
        }

        function f(e, t, n, r) {
            var i = [t.randomId, n, r].join("_"),
                o = a[i];
            o && (o(), delete a[i])
        }

        function h(e, t, n, i) {
            var a = p(e),
                o = "" === t ? "network" : "unknown";
            Object(r.a)(1) && Object(r.c)("messages_send_errors_web", o, n, i, a)
        }

        function p(e) {
            var t = Object(i.r)(e);
            return Boolean(t.longpoll && t.longpoll.isEnabled && t.longpoll.isEnabled())
        }

        function m(e) {
            var t = Object(i.r)(e),
                n = t.imQueue(t.peer).length;
            Object(r.a)(1) && Object(r.c)("messages_send_queue_size", n)
        }

        function b(e) {
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

        function y() {
            Object(r.b)(1, "im_browser_notifications_off", 1)
        }
    },
    "P+eJ": function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return a
        }), n.d(t, "a", function() {
            return l
        });
        var r = n("ERyv");

        function i(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }

        function a(e, t) {
            var n;
            if (window.vk.lpConfig.debug) {
                for (var r = "background: " + e + "; color: white", i = new Date, a = function(e) {
                        return e < 10 ? "0" + e : e
                    }, o = arguments.length, s = Array(o > 2 ? o - 2 : 0), c = 2; c < o; c++) s[c - 2] = arguments[c];
                (n = console).log.apply(n, ["%c " + i.getHours() + ":" + a(i.getMinutes()) + ":" + a(i.getSeconds()) + ":" + i.getMilliseconds() + " " + t + " ", r].concat(s))
            }
        }

        function o() {
            return window.lpBufferFc || (window.lpBufferFc = []), window.lpBufferFc
        }

        function s() {
            return window.lpBufferIm || (window.lpBufferIm = []), window.lpBufferIm
        }

        function c(e, t) {
            window.lpWeird || (window.lpWeird = []), window.lpWeird.push({
                msg: e,
                ev: t,
                is_master: window.curNotifier.is_server
            }), setTimeout(u, 1e4)
        }

        function u() {
            window.lpWeird.length && (Object(r.b)("fc_im_differ", {
                diff: window.lpWeird
            }, !1), window.lpWeird = [])
        }

        function d() {
            return "im" === window.cur.module && window.store && window.store.get().longpoll && !window.store.get().stopped
        }

        function _() {
            var e;
            d() && (s().forEach(function(e) {
                !o().find(function(t) {
                    return e.ev === t.ev
                }) && e.time < Date.now() - 1e3 && !e.warned && (e.warned = !0, a("red", "im not fc", e.ev), Object(r.c)() && c("im not fc", e.ev))
            }), o().forEach(function(e) {
                var t = s().find(function(t) {
                    return t.ev === e.ev
                });
                t && t.warned && !e.warned && (e.warned = !0, a("red", "now fc like im", e.ev), Object(r.c)() && c("now fc like im", e.ev))
            })), e = Date.now() - 3e4, window.lpBufferFc = o().filter(function(t) {
                return t.time > e
            }), window.lpBufferIm = s().filter(function(t) {
                return t.time > e
            })
        }

        function l(e) {
            var t;
            d() && ((t = o()).push.apply(t, i(e.map(function(e) {
                return {
                    time: Date.now(),
                    ev: JSON.stringify(e),
                    warned: !1
                }
            }))), setTimeout(_, 0));
            a.apply(void 0, ["green", "fc"].concat(i(e)))
        }
        window.longpollTesting_onImEvents = function(e) {
            var t;
            d() && ((t = s()).push.apply(t, i(e.map(function(e) {
                return {
                    time: Date.now(),
                    ev: JSON.stringify(e),
                    warned: !1
                }
            }))), setTimeout(_, 1100)), a.apply(void 0, ["blue", "im"].concat(i(e)))
        }
    },
    P13b: function(e, t, n) {
        "use strict";
        var r = n("f01n"),
            i = n("h++7"),
            a = n("nyd8"),
            o = n("rHUl"),
            s = n("MhhX"),
            c = n("p3re"),
            u = n("eTng"),
            d = n("vT4u"),
            _ = n("N1NS"),
            l = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            f = "_im_join_chat";

        function h(e, t) {
            var n = Object(_.a)({
                handlers: function(n, i) {
                    i(e, "click", f, function(e) {
                        return function(e, t) {
                            var n = domData(t, "chat-id"),
                                i = domData(t, "hash");
                            return lockButton(t), Object(d.Z)(n, i, e.get()).then(function(n) {
                                var i = l(n, 1)[0];
                                unlockButton(t), e.get().longpoll.push([Object(r.Ba)(i)])
                            }).catch(function(e) {
                                showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
                            })
                        }(t, e.target)
                    })
                }
            });
            return {
                unmount: function() {
                    Object(_.c)(n)
                }
            }
        }
        var p = n("aong"),
            m = n("86+7"),
            b = n("Wu9C"),
            g = n("wSs/"),
            v = n("ERyv"),
            y = n("lJdi"),
            O = n("t7n3");
        n.d(t, "t", function() {
            return E
        }), n.d(t, "l", function() {
            return x
        }), n.d(t, "s", function() {
            return T
        }), n.d(t, "v", function() {
            return P
        }), n.d(t, "j", function() {
            return M
        }), n.d(t, "g", function() {
            return N
        }), n.d(t, "b", function() {
            return D
        }), n.d(t, "c", function() {
            return I
        }), n.d(t, "e", function() {
            return B
        }), n.d(t, "d", function() {
            return F
        }), n.d(t, "f", function() {
            return L
        }), n.d(t, "h", function() {
            return S
        }), n.d(t, "a", function() {
            return A
        }), n.d(t, "k", function() {
            return R
        }), n.d(t, "o", function() {
            return W
        }), n.d(t, "m", function() {
            return U
        }), n.d(t, "n", function() {
            return K
        }), n.d(t, "p", function() {
            return q
        }), n.d(t, "i", function() {
            return H
        }), n.d(t, "u", function() {
            return z
        }), n.d(t, "q", function() {
            return V
        }), n.d(t, "r", function() {
            return G
        }), n.d(t, "U", function() {
            return Je
        }), n.d(t, "Jb", function() {
            return Ye
        }), n.d(t, "L", function() {
            return Xe
        }), n.d(t, "y", function() {
            return Ze
        }), n.d(t, "G", function() {
            return $e
        }), n.d(t, "Fa", function() {
            return tt
        }), n.d(t, "Eb", function() {
            return nt
        }), n.d(t, "gb", function() {
            return rt
        }), n.d(t, "Q", function() {
            return it
        }), n.d(t, "I", function() {
            return ot
        }), n.d(t, "jc", function() {
            return st
        }), n.d(t, "J", function() {
            return ct
        }), n.d(t, "vb", function() {
            return dt
        }), n.d(t, "K", function() {
            return _t
        }), n.d(t, "x", function() {
            return ft
        }), n.d(t, "Hb", function() {
            return ht
        }), n.d(t, "jb", function() {
            return pt
        }), n.d(t, "Db", function() {
            return mt
        }), n.d(t, "La", function() {
            return bt
        }), n.d(t, "Ua", function() {
            return gt
        }), n.d(t, "Pa", function() {
            return vt
        }), n.d(t, "bb", function() {
            return yt
        }), n.d(t, "cb", function() {
            return Ot
        }), n.d(t, "H", function() {
            return xt
        }), n.d(t, "hc", function() {
            return jt
        }), n.d(t, "bc", function() {
            return Tt
        }), n.d(t, "D", function() {
            return Pt
        }), n.d(t, "xb", function() {
            return It
        }), n.d(t, "qb", function() {
            return Bt
        }), n.d(t, "wb", function() {
            return Ft
        }), n.d(t, "sb", function() {
            return Lt
        }), n.d(t, "zb", function() {
            return St
        }), n.d(t, "rb", function() {
            return At
        }), n.d(t, "Ab", function() {
            return Rt
        }), n.d(t, "Kb", function() {
            return Wt
        }), n.d(t, "dc", function() {
            return Ut
        }), n.d(t, "mb", function() {
            return Kt
        }), n.d(t, "ob", function() {
            return Ht
        }), n.d(t, "nb", function() {
            return zt
        }), n.d(t, "Gb", function() {
            return Vt
        }), n.d(t, "O", function() {
            return Gt
        }), n.d(t, "hb", function() {
            return Qt
        }), n.d(t, "tb", function() {
            return Yt
        }), n.d(t, "Ib", function() {
            return Xt
        }), n.d(t, "Bb", function() {
            return Zt
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
            return an
        }), n.d(t, "E", function() {
            return on
        }), n.d(t, "ub", function() {
            return sn
        }), n.d(t, "Pb", function() {
            return cn
        }), n.d(t, "Rb", function() {
            return un
        }), n.d(t, "Xb", function() {
            return dn
        }), n.d(t, "Tb", function() {
            return _n
        }), n.d(t, "F", function() {
            return ln
        }), n.d(t, "Ea", function() {
            return fn
        }), n.d(t, "gc", function() {
            return hn
        }), n.d(t, "Yb", function() {
            return pn
        }), n.d(t, "C", function() {
            return mn
        }), n.d(t, "Qa", function() {
            return bn
        }), n.d(t, "db", function() {
            return gn
        }), n.d(t, "Va", function() {
            return vn
        }), n.d(t, "Xa", function() {
            return yn
        }), n.d(t, "Wa", function() {
            return On
        }), n.d(t, "z", function() {
            return Cn
        }), n.d(t, "Wb", function() {
            return wn
        }), n.d(t, "W", function() {
            return kn
        }), n.d(t, "V", function() {
            return En
        }), n.d(t, "Mb", function() {
            return jn
        }), n.d(t, "Lb", function() {
            return Tn
        }), n.d(t, "S", function() {
            return Pn
        }), n.d(t, "Ob", function() {
            return Mn
        }), n.d(t, "Ma", function() {
            return Nn
        }), n.d(t, "kc", function() {
            return Dn
        }), n.d(t, "pb", function() {
            return In
        }), n.d(t, "Ta", function() {
            return Bn
        }), n.d(t, "Ca", function() {
            return Fn
        }), n.d(t, "Aa", function() {
            return Ln
        }), n.d(t, "Ba", function() {
            return Sn
        }), n.d(t, "Da", function() {
            return An
        }), n.d(t, "Cb", function() {
            return Rn
        }), n.d(t, "ib", function() {
            return Un
        }), n.d(t, "ic", function() {
            return Kn
        }), n.d(t, "yb", function() {
            return qn
        }), n.d(t, "Sb", function() {
            return Hn
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
            return Yn
        }), n.d(t, "P", function() {
            return Xn
        }), n.d(t, "kb", function() {
            return Zn
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
            return ir
        }), n.d(t, "T", function() {
            return ar
        }), n.d(t, "N", function() {
            return or
        }), n.d(t, "M", function() {
            return sr
        }), n.d(t, "X", function() {
            return cr
        }), n.d(t, !1, function() {
            return o.h
        }), n.d(t, !1, function() {
            return o.K
        }), n.d(t, !1, function() {
            return o.o
        }), n.d(t, !1, function() {
            return o.f
        }), n.d(t, !1, function() {
            return o.j
        }), n.d(t, "Z", function() {
            return o.t
        }), n.d(t, !1, function() {
            return o.g
        }), n.d(t, !1, function() {
            return o.s
        }), n.d(t, !1, function() {
            return o.n
        }), n.d(t, !1, function() {
            return o.b
        }), n.d(t, !1, function() {}), n.d(t, !1, function() {
            return o.J
        }), n.d(t, !1, function() {
            return o.l
        }), n.d(t, !1, function() {
            return o.k
        }), n.d(t, !1, function() {
            return o.P
        }), n.d(t, !1, function() {
            return o.d
        }), n.d(t, !1, function() {
            return o.m
        }), n.d(t, !1, function() {
            return o.q
        }), n.d(t, "Ia", function() {
            return o.z
        }), n.d(t, "Ra", function() {
            return o.G
        }), n.d(t, "Na", function() {
            return o.D
        }), n.d(t, "Ja", function() {
            return o.B
        }), n.d(t, !1, function() {
            return o.y
        }), n.d(t, "R", function() {
            return o.e
        }), n.d(t, "Za", function() {
            return o.I
        }), n.d(t, "Oa", function() {
            return o.E
        }), n.d(t, !1, function() {
            return o.O
        }), n.d(t, !1, function() {
            return o.F
        }), n.d(t, !1, function() {
            return o.w
        }), n.d(t, !1, function() {
            return o.N
        }), n.d(t, "Ka", function() {
            return o.C
        }), n.d(t, !1, function() {
            return o.A
        }), n.d(t, !1, function() {
            return o.a
        }), n.d(t, !1, function() {
            return o.L
        }), n.d(t, !1, function() {
            return o.r
        }), n.d(t, !1, function() {
            return o.M
        }), n.d(t, !1, function() {
            return o.H
        }), n.d(t, !1, function() {
            return o.p
        }), n.d(t, !1, function() {
            return o.c
        }), n.d(t, "Ga", function() {
            return o.x
        }), n.d(t, !1, function() {
            return o.i
        }), n.d(t, !1, function() {
            return o.u
        }), n.d(t, !1, function() {
            return o.v
        }), n.d(t, "fc", function() {
            return o.Q
        }), n.d(t, !1, function() {
            return o.R
        }), n.d(t, "Ha", function() {
            return u.b
        }), n.d(t, "fb", function() {
            return u.d
        }), n.d(t, "Ya", function() {
            return u.c
        });
        var C = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };

        function k(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var E = "_im_mess_sending",
            x = "_im_mess_failed",
            j = "_im_mess_original",
            T = "_im_mess_restore",
            P = "_im_typing",
            M = "chat_create",
            N = "chat_title_update",
            D = "chat_invite_user",
            I = "chat_kick_user",
            B = "chat_photo_update",
            F = "chat_photo_remove",
            L = "chat_pin_message",
            S = "chat_unpin_message",
            A = "chat_invite_user_by_link",
            R = "_im_deselect_all",
            W = "_im_top_notice_hide",
            U = "_im_aside_notice_hide",
            K = "_im_aside_promo_block_hide",
            q = "_im_vkadmin_promo_link",
            H = "_im_clear_recent",
            z = "_im_toggle_mr_tab",
            V = "_im_mess_search",
            G = "_im_pinned",
            Q = window,
            J = Q.vk,
            Y = Q.ls,
            X = Q.se,
            Z = Q.re,
            $ = Q.rs,
            ee = Q.sech,
            te = Q.inArray,
            ne = Q.intval,
            re = Q.trim,
            ie = Q.stripHTML,
            ae = Q.domFC,
            oe = Q.domPS,
            se = Q.domLC,
            ce = Q.domChildren,
            ue = Q.domClosestSibling,
            de = Q.domData,
            _e = Q.geByClass,
            le = Q.geByClass1,
            fe = Q.gpeByClass,
            he = Q.addClass,
            pe = Q.removeClass,
            me = Q.toggleClass,
            be = Q.hasClass,
            ge = Q.attr,
            ve = Q.setStyle,
            ye = Q.val,
            Oe = Q.getTemplate,
            Ce = Q.getLang,
            we = Q.langSex,
            ke = Q.langDate,
            Ee = Q.langNumeric,
            xe = Q.getDateText,
            je = Q.getSmDate,
            Te = Q.getShortDate,
            Pe = Q.isSameDate,
            Me = Q.isToday,
            Ne = Q.ajax,
            De = Q.showBox,
            Ie = Q.showFastBox,
            Be = Q.showTabbedBox,
            Fe = Q.showTooltip,
            Le = Q.mobPlatforms,
            Se = Q.onlinePlatformClass,
            Ae = Q.AudioMessagePlayer,
            Re = Q.Emoji,
            We = Q.slideUp,
            Ue = Q.fadeOut,
            Ke = Q.cancelEvent,
            qe = Q.fifaReplaceText,
            He = 4096,
            ze = 100,
            Ve = 8,
            Ge = 52,
            Qe = "chatPosition";

        function Je() {
            return Y.get(Qe) || 0
        }

        function Ye(e) {
            e >= window.clientHeight() - 30 && (e = 0), Y.set(Qe, e)
        }

        function Xe(e, t) {
            var n = le(e, t);
            n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight && ve(n.firstElementChild, {
                height: n.parentNode.offsetHeight
            })
        }

        function Ze(e, t) {
            e && e.innerHTML !== t && (e.innerHTML = t)
        }

        function $e(e, t, n, r) {
            var i = t && !n ? 1 : !t && n ? -1 : 0;
            i && !Object(o.z)(e) && r().compensateHistoryHeightChange(i)
        }

        function et(e, t, n, r) {
            var i = window.devicePixelRatio >= 2 ? "256" : "128",
                a = "animation" === n,
                o = "im_gift";
            a && (o += " sticker_img");
            var s = '<img height="128" class="' + o + '" src="' + Stickers.getStickerUrl(ne(e), i) + '"/>';
            if (a) {
                var c = "animatedSticker" + r;
                s = '<div id="' + c + '" data-loop-count=3 data-animation-path="' + ("/stickers.php?act=proxy_animation&product_id=" + t + "&sticker_id=" + e) + '" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="' + r + '" data-sticker-id="' + ne(e) + '" class="sticker_animation sticker_animation_128 im_gift">' + s + "</div>";
                var u = !1;
                browser.msie ? (0 ^ r) === r && (u = !0) : u = Number.isInteger(r), u && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(c, 10)
            }
            return t && (s = '<a onmouseover="return Emoji.stickerOver(' + ne(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + ne(t) + ', this, event);">' + s + "</a>"), s = '<div class="im_sticker_row">' + s + "</div>"
        }

        function tt(e, t, n) {
            var r = e.get ? e.get() : e;
            if (yt(r, t)) {
                var i = r.tabs[t].deleted || [];
                return te(n, i)
            }
            return !1
        }

        function nt(e, t, n) {
            var r = n.randomId,
                i = le("_im_mess_rid" + r, t);
            return i && (t = ft(e, n, t = qt([i], t), !0, !1)), t
        }

        function rt(e) {
            var t = Object(o.a)(e);
            return browser.mobile && browser.safari ? Promise.resolve(!1) : void 0 !== t ? Promise.resolve(t) : it().then(function(e) {
                return e.length > 0
            }).catch(function(e) {
                return !1
            })
        }

        function it() {
            return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
                for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
                return t
            }) : Promise.reject(new Error("NotSupported"))
        }

        function at(e) {
            return Oe("im_preloader", {
                preloader: $(J.pr_tpl, {
                    id: ""
                }),
                cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
            })
        }

        function ot(e) {
            var t = e.split(".");
            return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
        }

        function st(e, t, n) {
            var r = de(n, "msgid"),
                i = le("_im_mess_" + r, t),
                a = n.cloneNode(!0);
            return i && (i.parentNode.replaceChild(a, i), _t(t)), t
        }

        function ct(e, t, n) {
            var r = ut(e, t),
                i = le("_im_mess_" + t.messageId, n);
            return i && (i.parentNode.replaceChild(X(r), i), _t(n)), n
        }

        function ut(e, t) {
            var n = ["_im_mess"],
                r = Object(s.n)(e.tabs[t.peerId], t),
                i = Object(s.c)(t) ? Oe("im_message_media", {
                    type: "reply",
                    messageId: t.messageId,
                    attaches: at("reply"),
                    text: ""
                }) : "";
            Object(s.k)(t) && r && n.push("im-mess_unread _im_mess_unread"), Object(s.k)(t) && n.push("im-mess_out"), Object(s.p)(t) && n.push("im-mess_was_edited"), Object(g.a)(e, t) && n.push("im-mess_editable"), Object(s.h)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
            var a = Date.now() - 1e3 * t.date > 1e3;
            t.local && a && n.push("im-mess_sending"), t.local && n.push("" + E), t.local && Object(s.p)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push("im-mess_failed " + x), Object(s.f)(t) && n.push("im-mess_gift");
            var d = dt(t),
                _ = function(e, t) {
                    var n = "",
                        r = Object(p.r)(e).sourceEnabled && t.kludges && t.kludges.from_widget && t.kludges.ref_source;
                    Object(s.p)(t) && (n += Oe("sImLblWasEdited", {
                        update_time: t.update_time
                    }));
                    if (Object(o.B)(e) && r) {
                        var i = t.kludges.ref_source,
                            a = {};
                        try {
                            (a = JSON.parse(Object(O.I)(i))).link && a.info && (a.link = Object(c.e)(Object(O.c)(a.link), c.b.bind(null, !1)), a = Object(O.c)(langStr(Ce("mail_source_info"), "link", a.link, "info", Object(O.c)(a.info))), n += Oe("sImLblWasSourceInfo", {
                                source: a
                            }))
                        } catch (e) {}
                    }
                    return n
                }(e, t),
                l = i + Et(e, t.text, t.kludges, !1, t.peerId);
            "" != l && (l += _), t.subject && "..." !== t.subject.trim() && !Object(u.b)(t.peerId) && (l = Oe("im_topic", {
                topic: t.subject
            }) + l);
            var f = Oe("im_message_media", {
                type: "media",
                messageId: t.messageId,
                attaches: d.join(""),
                text: Object(s.f)(t) ? '<div class="im-mess--gift-lbl">' + l + "</div>" : ""
            });
            return Object(s.f)(t) || (f = l + f), "" == l && (f += _), Oe("im_msg_row", {
                msg_id: t.messageId,
                from_id: t.peerId,
                aria_hidden: t.local && !t.failed ? "true" : "false",
                ts: t.date,
                marker_params: t.failed ? 'aria-label="' + Ce("mail_send_message_error") + '" role="link"' : "",
                unread_params: r ? 'aria-label="' + Ce("mail_unread_message") + '"' : "",
                cls: n.join(" ")
            }).replace("%text%", function() {
                return f
            })
        }

        function dt(e) {
            return e.attaches.reduce(function(t, n) {
                return !Object(s.c)(e) || "mail" !== n.type && "reply" !== n.type ? ("sticker" === n.type ? e.messageId ? t.push(et(n.id, n.productId, n.kind, e.messageId)) : t.push(et(n.id, n.productId)) : t.push(at(n.type)), t) : t
            }, [])
        }

        function _t(e) {
            for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) be(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", Oe("sImHistoryRowActions")), pe(t[n], "_im_mess_noa")
        }

        function lt(e, t, n) {
            var r, i, a, o, s, c = J.id,
                u = e.attaches[0],
                d = u.initiatorId,
                _ = u.state,
                l = u.receiverId,
                f = void 0;
            switch (_) {
                case "reached":
                    f = Ce(c === d ? "mail_call_outgoing" : "mail_call_incoming");
                    var h = t ? "" : (r = u.duration, i = Math.floor(r / 3600), a = Math.floor(r / 60) - 60 * i, o = !1, s = !1, [i, a, r - 3600 * i - 60 * a].reduce(function(e, t) {
                        return 0 !== t || s ? (o && (t = t < 10 ? "0" + t : t), o = !0, s = !0, e + ("" !== e ? ":" : "") + t) : (s = !0, e)
                    }, ""));
                    f = f.replace("{duration}", h);
                    break;
                case "canceled_by_initiator":
                    f = Ce(c === d ? "mail_call_canceled" : "mail_call_missed");
                    break;
                case "canceled_by_receiver":
                    if (c === d) {
                        if (t) return Ce("mail_call_declined");
                        var p = Object(m.c)(n, l);
                        return p ? we(p.sex, Ce("mail_call_declined_by", "raw")).replace("{user_name}", p.first_name) : Ce("mail_call_declined")
                    }
                    return Ce("mail_call_canceled");
                default:
                    f = Ce("mail_added_call")
            }
            return Oe("im_calls_link", {
                text: f
            })
        }

        function ft(e, t, n) {
            !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            var r = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                i = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
                a = Date.now() - 1e3 * t.date > 1e3,
                c = e.tabs[t.peerId];
            if (!n || le("_im_mess", n) || le("_im_bar_date", n) || (n.innerHTML = ""), c.skipped > 0) return n;
            var d = [];
            t.local || (d = e.imQueue(t.peerId, r)), d.length > 0 && qt(d.map(function(e) {
                return le("_im_mess_rid" + e.rid, n)
            }, n).filter(function(e) {
                return e
            }));
            var _ = ut(e, t),
                l = se(n);
            be(l, "_im_mess_stack") || (l = ue(l, "._im_mess_stack", -1));
            for (var f = Object(o.k)(e, t.peerId, t.messageId); t.peerId === e.peer && f && !le("_im_mess_" + f.messageId);) f = Object(o.k)(e, t.peerId, f.messageId);
            var h = le("_im_unread_bar_row", n),
                b = Object(s.b)(t),
                g = f ? Ct(f.date, e) : 0;
            if (!f || wt(c, f, t, e, i)) {
                var v = "",
                    y = !1;
                if (h && Object(s.k)(t) && In(e, n, t.peerId), 1 === c.unread && !Object(s.k)(t) && i && (v += Oe("im_mess_bar", {}), y = !0, In(e, n, t.peerId)), !Me(new Date(g))) {
                    var O = new Date,
                        C = y ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                    v += Oe("im_day_bar", {
                        day: Te(t.date, e.timeshift, !0, Ce("months_of", "raw"), !0),
                        date: t.date,
                        day_class: O.getDate() + O.getMonth() + O.getFullYear() + " " + C
                    })
                }
                if (Object(s.l)(t)) v += Oe("im_service_row", {
                    text: Zt(e, t, c),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else if (Object(s.e)(t)) v += Oe("im_service_row", {
                    text: Xt("", lt(t, !1, e), ""),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else {
                    var w = e.gid && Object(s.k)(t) ? ne(t.kludges.from_admin) || -e.gid : 0,
                        k = Object(m.c)(e, w ? -e.gid : b) || c,
                        x = Object(u.b)(t.peerId) ? k.name : k.first_name,
                        j = k.link || c.href,
                        T = Oe("im_mess_stack_name", {
                            name: x,
                            link: j,
                            class: Object(s.i)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                        });
                    if (Object(s.f)(t)) {
                        var P = Ce("mail_gift_message_sent", "raw");
                        T += ' <span class="im-mess-stack--gift">' + we(k.sex || 0, P) + "</span>"
                    }
                    if (Object(s.i)(t)) {
                        var M = Object(s.j)(t) ? Ce("mail_money_request_message_sent", "raw") : Ce("mail_money_tranfer_message_sent", "raw");
                        T += ' <span class="im-mess-stack--money-transfer">' + we(k.sex || 0, M) + "</span>"
                    }
                    var N = e.gid ? "/gim" + e.gid : "/im",
                        D = void 0;
                    if (D = t.local ? kt(t.date, e.timeshift) : Oe("im_stack_date", {
                            date: kt(t.date, e.timeshift),
                            link: N + "?sel=" + t.peerId + "&msgid=" + t.messageId
                        }), w && e.admins[w]) {
                        var I = e.admins[w],
                            B = w === J.id ? Ce("mail_by_you") : I[0];
                        D = D + " " + Oe("im_admin_link", {
                            name: B,
                            href: I[1]
                        })
                    }
                    v += Oe("im_mess_stack", {
                        photo: k.photo,
                        href: j,
                        cls: "",
                        date_attr: "",
                        link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                        name: ie(T),
                        stack_name: T,
                        peerId: b,
                        date: D,
                        messages: _,
                        admin: t.kludges.from_admin || 0
                    })
                }
                Object(p.p)(ee(v)).forEach(function(e) {
                    return n && n.appendChild(e)
                })
            } else h && e.peer === t.peerId && !c.inplaceSearch && Object(s.k)(t) && In(e, n, t.peerId), le("_im_stack_messages", l).appendChild(X(_));
            return Object(s.k)(t) && !a && setTimeout(function() {
                var e = le("_im_mess_" + t.messageId, n);
                be(e, E) && he(e, "im-mess_sending")
            }, 500), d = d.filter(function(e) {
                return e.rid !== t.randomId
            }), _t(n), ht(d, e, n)
        }

        function ht(e, t, n) {
            var r = void 0;
            return (r = "object" === (void 0 === e ? "undefined" : w(e)) ? e : t.imQueue(e, !1)).length > 0 && r.map(function(e) {
                return e.mess.failed = !!e.failed, e.mess
            }).filter(function(e) {
                return Object(o.m)(t, e.peerId, e.messageId)
            }).forEach(function(e) {
                return ft(t, e, n, !1)
            }), n
        }

        function pt(e, t, n) {
            var r = e.tabs[t];
            return Object(p.p)(_e("_im_mess_unread", n)).forEach(function(e) {
                var t, n = ne(de(e, "msgid"));
                n > 0 && r.out_up_to >= n && (pe(e, "_im_mess_unread"), pe(e, "im-mess_unread"), (t = le("_im_mess_blind_unread_marker", e)) && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex")))
            }), n
        }

        function mt(e, t, n) {
            var r = t.peerId,
                i = t.messageId,
                a = le("_im_msg_reply" + i, e),
                o = le("_im_msg_media" + i, e),
                s = n.tabs[r].mediacontent[i][0];
            return a && (a.innerHTML = s[0]), o && (o.innerHTML = s[1]), e
        }

        function bt(e, t) {
            if (!Object(o.E)(t, e.peerId)) return 0;
            var n = t.tabs[e.peerId];
            return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
        }

        function gt(e, t) {
            return e === t.peer
        }

        function vt(e, t) {
            return Object(y.m)(Object(o.t)(e, t), 1024)
        }

        function yt(e, t) {
            return !!e.tabs[t]
        }

        function Ot(e, t) {
            return !!yt(e, t) && null !== e.tabs[t].lastmsg
        }

        function Ct(e, t) {
            return 1e3 * e + 1e3 * t.timeshift
        }

        function wt(e, t, n, r, i) {
            if (Object(s.b)(t) !== Object(s.b)(n)) return !0;
            var a = Ct(t.date, r),
                c = Ct(n.date, r);
            return !Pe(a, c) || (!(!Object(o.B)(r) || ne(t.kludges.from_admin) === ne(n.kludges.from_admin)) || (n.date - t.date > 300 || (!(!Object(s.l)(t) && !Object(s.l)(n)) || (!(!Object(s.e)(n) && !Object(s.e)(t)) || (!(!Object(s.f)(t) && !Object(s.f)(n)) || (!(!Object(s.g)(t) && !Object(s.g)(n)) || (!!Object(s.c)(n) || !(Object(s.n)(e, t) === Object(s.n)(e, n) || !i || Object(s.k)(n) || tn(n.peerId, r.gid)))))))))
        }

        function kt(e, t) {
            return ke(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
        }

        function Et(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                a = Math.round(1e9 * Math.random()).toString(16),
                s = {},
                u = 0;
            return t = (t = Object(c.e)(t || "", c.b.bind(null, r))).replace(/(<a.+?<\/a>)/gi, function(e) {
                var t = "!link_" + u + "_" + a + "!";
                return s[t] = e, u++, t
            }), t = Object(c.f)(t), t = Object(c.c)(t), t = Object(c.d)(t, function(t) {
                var n = Object(o.i)(e);
                return '<a href="/' + (n ? "gim" + n : "im") + "?sel=" + (i || Object(o.o)(e)) + "&st=" + encodeURIComponent(t) + '">' + t + "</a>"
            }), Object.keys(s).forEach(function(e) {
                t = t.replace(e, function() {
                    return s[e]
                })
            }), n.emoji && (t = Re.emojiToHTML(t, !0)), qe && (t = qe(t)), t
        }

        function xt(e) {
            return Object(u.b)(e) ? "c" + (e - 2e9) : e < -2e9 ? "e" + Math.abs(e + 2e9) : function(e) {
                return e > 19e8 && e < 2e9
            }(e) ? "mr" + (e - 19e8) : e
        }

        function jt(e) {
            switch (e.substr(0, 1)) {
                case "e":
                    return -2e9 - ne(e.substr(1));
                case "c":
                    return 2e9 + ne(e.substr(1));
                default:
                    return ne(e)
            }
        }

        function Tt(e) {
            return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
        }

        function Pt(e, t) {
            return {
                search: {
                    name: Ce("mail_im_peer_search"),
                    icon: "search"
                },
                block_community: {
                    icon: "block",
                    name: Ce("mail_block_comm_messages")
                },
                allow_community: {
                    icon: "unblock",
                    name: Ce("mail_allow_comm_messages")
                },
                clear: {
                    name: e.peer < -2e9 ? Ce("mail_im_delete_email_contact") : Ce("mail_im_delete_all_history"),
                    icon: "clear"
                },
                chat: {
                    name: Ce("mail_im_create_chat_with"),
                    icon: "invite"
                },
                mute: {
                    name: Ce("mail_im_mute"),
                    icon: "mute"
                },
                unmute: {
                    name: Ce("mail_im_unmute"),
                    icon: "unmute"
                },
                photos: {
                    name: e.gid ? Ce("mail_im_show_media_history_group") : Ce("mail_im_show_media_history"),
                    icon: "media"
                },
                avatar: {
                    icon: "avatar",
                    name: Ce("mail_update_photo_red")
                },
                block: {
                    icon: "block",
                    name: Ce("mail_block_user")
                },
                invite: {
                    icon: "invite",
                    name: Ce("mail_im_create_chat_with")
                },
                invite_link: {
                    icon: "invite-link",
                    name: Ce(t ? "mail_vkcomgroup_invite_link" : "mail_chat_invite_link")
                },
                leave: {
                    icon: "leave",
                    name: Ce(t ? "mail_leave_channel" : "mail_leave_chat")
                },
                topic: {
                    icon: "topic",
                    name: Ce("mail_change_topic")
                },
                return: {
                    icon: "return",
                    name: Ce(t ? "mail_return_to_vkcomgroup" : "mail_return_to_chat")
                },
                pin_hide: {
                    icon: "pin_hide",
                    name: Ce("mail_menu_pin_hide")
                },
                pin_unhide: {
                    icon: "pin_unhide",
                    name: Ce("mail_menu_pin_show")
                },
                unpin: {
                    icon: "unpin",
                    name: Ce("mail_menu_unpin")
                },
                settings: {
                    icon: "settings",
                    name: Ce(t ? "mail_vkcomgroup_settings" : "mail_settings")
                }
            }
        }

        function Mt(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
            return t && (n = Oe("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
        }

        function Nt(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
            return t && (n = Oe("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
        }

        function Dt(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
            switch (e.length) {
                case 1:
                    return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
                case 2:
                    return e.map(function(e, n) {
                        return Mt(e, t[n])
                    }).join("");
                case 3:
                    return Mt(e[0], t[0]) + e.slice(1).map(function(e, n) {
                        return Nt(e, t[n + 1])
                    }).join("");
                case 4:
                    return e.map(function(e, n) {
                        return Nt(e, t[n])
                    }).join("")
            }
        }

        function It(e, t, n) {
            if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
            if (Object(u.b)(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
            if (Array.isArray(t.photo)) return Dt(t.photo);
            var r = t.data.active.slice(0, 4).map(m.c.bind(null, e));
            return Dt(r.map(function(e) {
                return e.photo
            }), n ? [] : r.map(function(e) {
                return e.link
            }))
        }

        function Bt(e) {
            var t = e.get().gid ? Ce("mail_search_only_messages_comm") : Ce("mail_search_only_messages");
            return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + V + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
        }

        function Ft() {
            return '<li class="im-search-results-head">' + Ce("mail_search_messages") + "</li>"
        }

        function Lt() {
            return '<li class="im-search-results-head">' + Ce("mail_search_conversations_sep") + "</li>"
        }

        function St() {
            return '<li class="im-search-results-head">' + Ce("mail_search_dialogs_sep") + "</li>"
        }

        function At() {
            return '<li class="im-search-results-head _im_recent_bar">\n    ' + Ce("mail_recent_searches") + '\n    <button type="button" class="' + H + ' im-page--clear-recent">' + Ce("mail_clear_recent") + "</button>\n  </li>"
        }

        function Rt(e) {
            var t = e.get().popular_sugg,
                n = Object(o.z)(e) ? 8 : 5;
            return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(function(t) {
                var n = t.peerId,
                    r = Object(m.c)(e, n) || t,
                    i = e.get().tabs[n] || t,
                    a = (e.get().mutedPeers || []).indexOf(n) >= 0;
                return '<div class="' + ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + n, i.unread > 0 && "sugg-is_unread", a && "sugg-is_muted"].filter(function(e) {
                    return !!e
                }).join(" ") + '" data-peer="' + n + '">\n    <a class="im-popular--avatar-w ' + Se(i.online) + '" href="' + r.link + '"><img class="im-popular--avatar" src="' + r.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + r.link + '">' + (r.first_name || r.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + Tt(i.unread) + "</span>\n</div>"
            }).join("") + "</li>"
        }

        function Wt(e, t, n) {
            var r = le("_im_mess_" + t.messageId, n);
            if (r) {
                ge(r, "aria-hidden", "false"), he(r, "im-mess_failed " + x);
                var i = le("_im_mess_marker", r);
                ge(i, "aria-label", Ce("mail_send_message_error")), ge(i, "role", "link")
            }
            return n
        }

        function Ut(e, t, n) {
            var r = le("_im_mess_" + t, n);
            if (r) {
                pe(r, "im-mess_failed"), ge(r, "aria-hidden", "true"), pe(r, x);
                var i = le("_im_mess_marker", r);
                ge(i, "aria-label", ""), ge(i, "role", "")
            }
            return n
        }

        function Kt(e, t) {
            return qt(e.map(function(e) {
                return le("_im_mess_" + e, t)
            }).filter(function(e) {
                return e
            }), t)
        }

        function qt(e, t) {
            var n = e.filter(function(e) {
                return !be(e, "im-mess_srv")
            }).map(function(e) {
                return e.parentNode
            });
            return e.forEach(function(e) {
                be(e, "im-mess_srv") ? e.parentNode.parentNode.removeChild(e.parentNode) : e.parentNode.removeChild(e)
            }), n.filter(function(e) {
                return 0 === ce(e).length
            }).map(function(e) {
                return fe("_im_mess_stack", e)
            }).forEach(function(e) {
                be(oe(e), "_im_bar_date") && Z(oe(e)), be(oe(e), "_im_unread_bar_row") && Z(oe(e)), Z(e)
            }), t
        }

        function Ht(e) {
            for (var t = e; t;) {
                var n = t;
                if (null === (t = t.previousElementSibling)) {
                    be(n, "mess_srv") && (t = n.parentNode);
                    var r = fe("_im_mess_stack", n);
                    r && (t = r.previousElementSibling, 1 === ce(n.parentNode).length && r.parentNode.removeChild(r))
                }
                be(n, "_im_unread_bar_row") || n.parentNode.removeChild(n)
            }
        }

        function zt(e, t, n, r) {
            return e.map(function(e) {
                return le("_im_mess_" + e, r)
            }).filter(function(e) {
                return e
            }).forEach(function(e) {
                ye(e, function(e, t, n) {
                    var r = t.innerHTML;
                    return '<div class="im-mess--text">\n    ' + Ce("delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam") + ' <button type="button" data-peer="' + e + '" class="' + T + ' im-mess--btn">' + Ce("mail_restore") + '</button>\n    <div class="' + j + ' im-mess--original">' + r + "</div>\n  </div>"
                }(t, e, n)), he(e, "im-mess_light")
            }), r
        }

        function Vt(e, t, n) {
            var r = le("_im_mess_" + e, n);
            if (r) {
                var i = le(j, r);
                ye(r, i.innerHTML), pe(r, "im-mess_light")
            }
            return n
        }

        function Gt() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1],
                n = arguments[2],
                r = arguments[3],
                i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2;
            if (arguments.length > 5 && void 0 !== arguments[5] && arguments[5]) return Jt(e, t, n, r, !0, i);
            var a = Jt(e, t, n, r, !1, i);
            return a.length > 60 ? Jt(e, t, n, r, !0, i) : a
        }

        function Qt(e) {
            var t, n = (k(t = {}, d.d, 1), k(t, d.c, 2), t),
                r = Object.keys(e).sort(function(e, t) {
                    return n[t] - n[e]
                }),
                i = {},
                a = r.reduce(function(t, n) {
                    var r = (e[n] || {}).userIds;
                    return (void 0 === r ? [] : r).forEach(function(e) {
                        i[e] || (i[e] = !0, t[n] = !0)
                    }), t
                }, {}),
                o = r.filter(function(e) {
                    return !!a[e]
                });
            return o.length > 1 ? "" : o[0]
        }

        function Jt(e, t, n, r, i, a) {
            var s = function(e, t, n) {
                var r = [],
                    i = {};
                return Object.keys(t).map(function(n) {
                    ((t[n] || {}).userIds || []).forEach(function(t) {
                        Object(m.b)(e, t) ? parseInt(t, 10) !== e.id && (i[t] = n) : r.push(t)
                    })
                }), r.length && Object(d.Ha)(k({}, n, r), e), Object.keys(i).sort(function(e, n) {
                    return t[i[e]].ts - t[i[n]].ts
                })
            }(r, e, t);
            if (0 === s.length) return "";
            var c = Object(u.d)(t) || Object(o.C)(t) ? "first_name" : i ? "short_name" : "name",
                _ = Qt(e),
                l = "";
            _ === d.c ? l = Ce("mail_recording_audio_several", s.length) : _ === d.d && (l = Ce("mail_typing_several", s.length));
            var f = s.slice(0, Math.min(s.length - 1, a)),
                h = f.map(function(e) {
                    return Object(m.c)(r, e)[c]
                }).join(", ");
            if (s.length > a + 1) {
                var p = function(e) {
                    var t = {};
                    return Object.keys(e).forEach(function(n) {
                        var r = e[n].userIds;
                        (void 0 === r ? [] : r).forEach(function(e) {
                            t[e] = 1
                        })
                    }), Object.keys(t).length
                }(e);
                h += " " + Ce("mail_and_peer").replace("{count}", p - a).replace("{typing}", l)
            } else {
                if (s.length > 1 && (h += " " + Ce("mail_and_peer_one")), !Object(u.b)(t) && n) h += " " + l;
                else h += " " + Object(m.c)(r, s[f.length])[c] + " " + l
            }
            return h.trim()
        }

        function Yt() {
            return '<div class="im-page--chat-search-empty">\n    ' + Ce("mail_im_search_empty") + "\n  </div>"
        }

        function Xt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return n ? '<a class="im_srv_lnk ' + r + '" target="_blank" href="' + e + '">' + t + "</a>" : '<span class="' + r + '">' + t + "</span>"
        }

        function Zt(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = t.kludges,
                a = i.source_act,
                o = ne(i.source_mid),
                s = t.userId,
                c = Object(m.c)(e, s),
                u = "",
                d = s === o;
            switch (a) {
                case M:
                    u = "mail_im_chat_created";
                    break;
                case N:
                    u = i.source_is_channel ? "mail_im_title_updated_channel" : "mail_im_title_updated_dot";
                    break;
                case D:
                    u = d ? "mail_im_returned_to_chat" : "mail_im_invited";
                    break;
                case I:
                    u = d ? "mail_im_left" : "mail_im_kicked_from_chat";
                    break;
                case B:
                    u = "mail_im_photo_set";
                    break;
                case F:
                    u = i.source_is_channel ? "mail_im_photo_removed_channel" : "mail_im_photo_removed";
                    break;
                case L:
                    u = i.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                    break;
                case S:
                    u = i.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                    break;
                case A:
                    u = "mail_im_invite_by_link";
                    break;
                default:
                    return "mail_no_support"
            }
            if (u = (u = we(c.sex, Ce(u, "raw"))).replace("{from}", Xt(c.link, c.name, r)), o && o !== s) {
                var _ = i.source_email;
                if (_) u = u.replace("{user}", Xt("/im?email=" + encodeURIComponent(_), "email", r));
                else {
                    var l = Object(m.c)(e, o),
                        f = a === I ? l.inv_name : l.kick_name;
                    u = u.replace("{user}", Xt(l.link, f, r))
                }
            }
            if (i.source_text) {
                var h = i.source_old_text ? '«<b class="im_srv_lnk">' + i.source_old_text + "</b>» &rarr; " : "";
                u = u.replace("{title}", h + '«<b class="im_srv_lnk">' + i.source_text + "</b>»")
            }
            if (i.source_act === L || i.source_act === S)
                if (i.source_message) {
                    var p = Xt("", en(Re.emojiToHTML(ie(i.source_message.replace(/<br\s?\/?>/gi, " ")), !0)), !1, "im_srv_mess_link");
                    u = u.replace("{msg}", p)
                } else u = u.replace(/{link}(.+){\/link}/i, function(e, t) {
                    return Xt("", t, !1, "im_srv_mess_link")
                });
            return u
        }

        function $t(e, t, n, r) {
            if (t === B) {
                var i = le("_im_mess_" + e.messageId, r);
                if (i) {
                    var a = n.tabs[e.peerId];
                    i.parentNode.innerHTML = Oe("im_msg_row", {
                        msg_id: e.messageId,
                        from_id: e.peerId,
                        text: Zt(n, e, a) + n.chat_photo_msg,
                        ts: e.date,
                        cls: "im-mess_srv"
                    })
                }
            }
            return r
        }

        function en(e) {
            return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(i.r, "$1$4")
        }

        function tn(e, t) {
            return !t && e === J.id
        }

        function nn(e, t) {
            return Fe(e, {
                url: Object(o.C)(t) ? "al_groups.php" : "al_profile.php",
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
                    i = X(Oe("im_preloader", {
                        preloader: $(J.pr_tpl, {
                            id: ""
                        }),
                        cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", r].join(" ")
                    })),
                    a = !1;

                function o() {
                    a = !0, pe(i, "im-preloader_visible"), i.parentNode && i.parentNode.removeChild(i)
                }
                setTimeout(function() {
                    a || ("bottom" === n ? e.appendChild(i) : e.insertBefore(i, ae(e)), he(i, "im-preloader_visible"))
                }, 0), t.then(o).catch(function(e) {
                    Object(v.a)("wrapLoading", e), o()
                })
            }
        }

        function an(e, t) {
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

        function on(e, t) {
            if (!t && !e) return !1;
            var n = e.target || e.srcElement,
                r = Ve,
                i = !1,
                a = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
            do {
                if (!n || n.onclick || n.onmousedown || "A" == n.tagName || be(n, "_im_no_select") || be(n, "im_msg_media_link") || "IMG" == n.tagName && !be(n, "_im_graffiti") && !be(n, "emoji") && !be(n, "emoji_css") && !be(n, "im_gift") || "TEXTAREA" == n.tagName || be(n, "play_new") || be(n, "videoplayer") || (i = a.test(n.className))) break
            } while (r-- && (n = n.parentNode));
            return !i || !!re((window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || "").toString())
        }

        function sn(e, t) {
            return '<div class="im-mess--text">\n      <span>' + Ce("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + xt(e) + "&msgid=" + t + '">' + Ce("mail_im_goto_conversation") + "</a>\n    </div>"
        }

        function cn(e, t, n) {
            var r = Ce("mail_deleteall1"),
                i = Ce("mail_sure_to_delete_all"),
                a = Ce("mail_delete");
            return Object(u.b)(t) && (Object(y.m)(e, 1024) ? (r = Ce("mail_leave_channel"), i = Ce("mail_unfollow_channel_confirmation"), a = Ce("mail_unfollow_channel")) : i = Ce("mail_chat_sure_to_delete_all")), Object(o.C)(t) && (i = Ce("mail_group_sure_to_delete_all")), Ie(r, i, a, n, Ce("global_cancel"))
        }

        function un(e, t, n) {
            var r = Object(o.t)(e, t),
                i = Object(u.b)(t),
                a = i && Object(y.m)(r, 1024),
                s = Ce("mail_deleteall1"),
                c = Ce("mail_sure_to_delete_all"),
                d = Ce("mail_delete");
            if (i) {
                if (r.data.closed || r.data.kicked) return cn(r, t, n.bind(null, !0));
                a ? (s = Ce("mail_leave_channel"), c = Ce("mail_vkcomgroup_leave_confirm"), d = Ce("mail_leave_channel")) : (s = Ce("mail_leave_chat"), c = Ce("mail_chat_leave_confirm"), d = Ce("mail_leave_chat"))
            }
            Object(o.C)(t) && (c = Ce("mail_group_sure_to_delete_all"));
            var _ = new MessageBox({
                title: s,
                width: a ? 450 : 500
            }).content(c).setButtons(d, function() {
                return n(!!isChecked(le("_check_is_delete")) || !i)
            }, Ce("global_cancel")).show();
            return i && !a && _.setControlsText('<div class="checkbox im-delete-forall-checkbox _check_is_delete" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + Ce("mail_deleteall1") + "</div>"), _
        }

        function dn(e) {
            return Ie(Ce("mail_unpin_title"), Ce("mail_unpin_text"), Ce("mail_unpin"), e, Ce("global_cancel"))
        }

        function _n(e, t, n, r) {
            var i = Ce("mail_dialog_msg_delete_N", t),
                a = Ie(Ce("mail_dialog_msg_delete_title"), i, Ce("mail_delete"), function() {
                    return r(isChecked(le("_check_forall")))
                }, Ce("global_cancel")),
                o = "",
                s = !1;
            return n && (o = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + Ce("mail_delete_for_all") + "</div>", s = cur.imDb.selectByKey("del_forall_checked")), a.setControlsText(o), s && checkbox(le("_check_forall")), a
        }

        function ln(e, t, n, r, i) {
            t.showProgress(), e.set(r.bind(null, i)).then(function() {
                t.hideProgress(), t.hide(), n().removePeer(e, i), n().updateDialogFilters(e)
            })
        }

        function fn(e, t, n, r) {
            var i = e.get().tabs[t].memberIds;
            e.set(r.bind(null, "add_member", i)).then(n().showCreation)
        }

        function hn(e, t, n) {
            var r = e.get();
            if (r.active_tab === i.h && 0 === r.message_requests_cnt) return !1;
            var a = r.active_tab === i.k ? i.h : i.k;
            return e.set(n.bind(null, a)).then(function(e) {
                t().restoreDialogs(e, !0)
            })
        }

        function pn(e, t, n) {
            if (e.get().active_tab === i.h && 0 === e.get().unread_cnt) return !1;
            var r = e.get().active_tab === i.m ? i.h : i.m;
            return e.set(n.bind(null, r)).then(function(e) {
                t().restoreDialogs(e, !0)
            })
        }

        function mn(e, t, n, r) {
            if (t.get().active_tab === e) return Promise.resolve(t);
            var i = Object(o.I)(t);
            return t.set(r.bind(null, e)).then(function(e) {
                return n().restoreDialogs(e, !0, i !== Object(o.I)(e)), e
            })
        }

        function bn(e, t) {
            void 0 === t && (t = e.get().peer);
            var n = e.get().tabs[t];
            return i.j[i.i] & n.folders
        }

        function gn(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (void 0 === t && (t = e.get().peer), !Object(o.D)(e)) return !1;
            var r = n || e.get().tabs[t];
            return i.j[i.n] & r.folders
        }

        function vn(e, t) {
            return !1 === ((t.get().block_states || {})[e] || {}).free
        }

        function yn(e) {
            return null != e.get().pendingForward
        }

        function On(e, t) {
            return (t.get().block_states[e] || {}).who === J.id
        }

        function Cn(e, t) {
            var n = e.get().block_states;
            Object.keys(n).forEach(function(i) {
                n[i].time ? !1 === n[i].free && Date.now() - n[i].time >= 5e4 && t.push([r.Na([, 1, "gim" + e.get().gid, i, 0, ""])]) : n[i].time = Date.now()
            })
        }

        function wn(e, t, n) {
            var r = void 0;
            return !Be("al_im.php", {
                act: "a_spam",
                offset: "0",
                gid: e.get().gid
            }, {
                onDone: function(n, i) {
                    i && (r = t(n, e, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Ae.loaded && Ae.detachPlayer(!0), r.unmount()
                    }
                }
            }, n)
        }

        function kn(e, t) {
            return En(e.get(), t, Object(o.t)(e, t).last_seen)
        }

        function En(e, t, n, r) {
            if (n[0]) return Ce("mail_header_online_status") + (Le[n[0]] ? xn(t, !1, !1, !0) : "");
            if (!n[1]) return "";
            var i = xe(n[1], e.timeshift),
                a = we(Object(m.c)(e, t).sex, Ce("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", i);
            return n[2] && (a += xn(t, !1, !1, r)), a
        }

        function xn(e, t, n, r) {
            var i = {
                mid: e
            };
            n || (i.was = 1), t ? i.forcetoup = !0 : i.forcetodown = !0, i = Object.assign(i, r);
            var a = JSON.stringify(i).slice(1, -1).replace(/"/g, "&quot;");
            return Oe("im_wrap_mobile", {
                class: "im_status_mob_onl",
                params: a
            })
        }

        function jn(e, t) {
            var n = t.get().tabs[e];
            return De("al_settings.php", {
                act: "blacklist_box",
                q: n.href
            }, {
                stat: ["settings.js", "settings.css"],
                dark: 1
            })
        }

        function Tn(e, t) {
            return De("groupsedit.php", {
                act: "bl_edit",
                name: "/id" + e,
                gid: t.get().gid
            }, {
                stat: ["page.css", "ui_controls.js", "ui_controls.css"],
                dark: 1
            })
        }

        function Pn(e) {
            return e.get().gid ? "/gim" + e.get().gid : "/im"
        }

        function Mn(e, t, n, r) {
            var i = void 0;
            Gn(Be("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: function(r, a) {
                    a && (i = n(r, e, t, a))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Ae.loaded && Ae.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        i && i.unmount()
                    }
                }
            }, r), e)
        }

        function Nn() {
            var e = document.activeElement;
            return null !== e && ("INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable"))
        }

        function Dn(e, t, n) {
            var r = le("_im_mess_" + e, n);
            return r && me(r, "im-mess_fav", t), n
        }

        function In(e, t, n) {
            var r = le("_im_unread_bar_row", t);
            if (!r) return t;
            var i, a = ue(r, "._im_mess_stack", -1),
                s = ue(r, "._im_mess_stack"),
                c = a ? _e("_im_mess", a).pop() : null,
                u = s ? le("_im_mess", s) : null;
            if (Z(r), (i = le("_im_invisible_bar", t)) && (pe(i, "_im_invisible_bar"), pe(i, "im-page--history-new-bar_hide")), !u || !c) return t;
            var d = de(u, "msgid"),
                _ = Object(o.q)(e, n, d),
                l = Object(o.m)(e, n, d);
            if (!_ || wt(e.tabs[n], _, l, e)) return t;
            var f = le("_im_stack_messages", a),
                h = le("_im_stack_messages", s).children;
            return Object(p.p)(h).forEach(function(e) {
                Z(e), f.appendChild(e)
            }), Z(s), t
        }

        function Bn(e, t, n) {
            var r = Object(o.h)(e, e.get().peer);
            if (!r) return [!1, 0];
            var i = le("_im_mess_" + r, t);
            if (!i) {
                var a = Object(o.k)(e, e.get().peer, r);
                if (!a) return [!0, 0];
                i = le("_im_mess_" + a.messageId, t)
            }
            var s = be(i, "_im_mess_srv") ? i : fe("_im_mess_stack", i);
            if (!s) return [!0, 0];
            var c = i ? i.offsetTop : 0,
                u = s.offsetTop + c,
                d = n.contHeight();
            return u <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, d - u)]
        }

        function Fn(e, t, n) {
            Ke(t);
            var r = fe("_im_top_notice", n);
            Ue(r, 200, Z.pbind(r));
            var i = fe("_im_page_dialogs", r);
            i && be(i, "im-page--dialogs-notice") && pe(i, "im-page--dialogs-notice"), Ne.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Ln(e, t, n) {
            Ke(t);
            var r = fe("_im_aside_notice", n);
            We(r, 200, Z.pbind(r)), Ne.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Sn(e, t) {
            Ke(e);
            var n = fe("_im_aside_promo_block", t);
            We(n, 200, Z.pbind(n)), Ne.post("al_im.php", {
                act: "a_hide_promo_block",
                type: n.getAttribute("data-type"),
                hash: n.getAttribute("data-hash")
            })
        }

        function An(e, t) {
            fe("_im_aside_promo_block", t).classList.add("--action-called"), Ne.post("al_im.php", {
                act: "a_vkadmin_app_install",
                hash: de(t, "hash"),
                platform: de(t, "platform")
            })
        }

        function Rn(e, t, n, r, i) {
            return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = Object(c.f)(n, function(e, t, n, r, i) {
                return i
            }), r && (n = Re.emojiToHTML(n, !0)), t && "..." !== t.trim() && !Object(u.b)(e) && (n = Oe("im_topic", {
                topic: t,
                cls: "im-topic_dialog"
            }) + n), !n && i.length > 0 && (n = Oe("im_dialog_media", {
                name: Wn(i[0], i)
            })), n
        }

        function Wn(e, t) {
            var n = {
                photo: Ce("mail_added_photos", "raw"),
                video: Ce("mail_added_videos", "raw"),
                audio: Ce("mail_added_audios", "raw")
            };
            switch (e.type) {
                case "mail":
                case "respond":
                    var r = e.object ? e.object.fwd_count : e.id.split(";").length;
                    return Ee(r, Ce("mail_fwd_msgs", "raw"), !0);
                case "photo":
                case "video":
                case "audio":
                    var i = t.filter(function(t) {
                        return t.type === e.type
                    }).length;
                    return Ee(i, n[e.type], !0);
                case "audio_playlist":
                    return "audio_album" === e.kind ? Ce("mail_added_audio_album") : Ce("mail_added_audio_playlist");
                case "artist":
                    return Ce("mail_added_artist");
                case "doc":
                    switch (e.kind) {
                        case "graffiti":
                            return Ce("mail_added_graffiti");
                        case "audiomsg":
                            return Ce("mail_added_audiomsg");
                        default:
                            return Ce("mail_added_docs")
                    }
                case "geo":
                case "map":
                    return Ce("mail_added_geo");
                case "wall":
                    return Ce("mail_added_wall");
                case "wall_reply":
                    return Ce("mail_added_wall_reply");
                case "gift":
                    return Ce("mail_added_gift");
                case "link":
                case "share":
                    return Ce("mail_added_link");
                case "sticker":
                    return Ce("mail_added_sticker");
                case "market":
                    return Ce("mail_added_market_item");
                case "money_transfer":
                    return Ce("mail_added_money_transfer");
                case "money_request":
                    return Ce("mail_added_money_request");
                case "story":
                    return Ce("mail_added_story");
                case "mask":
                    return Ce("mail_added_mask");
                case "article":
                    return Ce("mail_added_article");
                case "call":
                    return Ce("mail_added_call");
                case "poll":
                    return Ce("mail_added_poll");
                case "podcast":
                    return Ce("mail_added_podcast");
                default:
                    return Ce("mail_added_" + e.type)
            }
            return ""
        }

        function Un(e) {
            he(e, "im-send-btn_loading")
        }

        function Kn(e) {
            pe(e, "im-send-btn_loading")
        }

        function qn(e) {
            var t = e.get(),
                n = Object(o.p)(e);
            if (!n || !Object(b.a)(e, Object(o.o)(e))) return "";
            var r = Object(m.c)(e, n.userId);
            if (!r) return "";
            var i = function(e, t) {
                var n = "";
                if (t && Object(s.j)(t) && void 0 !== t.kludges.attach1_tr_amount) {
                    var r = "%s " + t.kludges.attach1_currency;
                    if ("RUB" === t.kludges.attach1_currency && (r = Ce("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                        var i = Ee(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                            a = Ee(t.kludges.attach1_total_amount / 1e3, r, !0);
                        n = Ce("mail_money_request_collected_amount_from").replace("{amount}", i).replace("{total_amount}", a)
                    } else {
                        var o = Ee(t.kludges.attach1_tr_amount / 1e3, r, !0);
                        n = Ce("mail_money_request_collected_amount").replace("{amount}", o)
                    }
                    if (ne(t.kludges.attach1_held_amount)) {
                        var c = Ee(t.kludges.attach1_held_amount / 1e3, r, !0);
                        n += " " + Ce("mail_money_request_held_amount").replace("{amount}", c)
                    }
                    t.text && (n += '<span class="divider"></span>' + Et(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += Oe("im_pinned_message_media_bar", {
                        percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
                    }))
                }
                return n
            }(e, n);
            return i || (i = !(i = n.text) && n.attaches.length ? Oe("im_pinned_message_media", {
                text: Wn(n.attaches[0], n.attaches)
            }) : Et(e, i, n && n.kludges || {}) || ""), i = i.replace(/<br\s?\/?>/gi, " "), Oe("im_pinned_message", {
                date: je(n.date, t.timeshift),
                content: i,
                link: r.link,
                name: r.name
            })
        }

        function Hn(e, t, n) {
            var r = n.getAttribute("data-info");
            r && Fe(n, {
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
            r && Fe(n, {
                text: Ce("mail_message_edited") + " " + je(r, e.get().timeshift),
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
                be(e.target, "_im_edit_time") ? zn(t, 0, e.target) : be(e.target, "_im_page_info") && Hn(0, 0, e.target)
            })
        }

        function Qn(e, t, n, r, i) {
            var a = e.get(),
                o = void 0;
            Gn(Be("al_im.php", {
                act: "a_get_pinned_message_box",
                chat: n,
                gid: e.get().gid,
                hash: a.tabs[n].hash
            }, {
                onDone: function(n, i) {
                    i && (o = r(n, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Ae.loaded && Ae.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        o && o.unmount()
                    }
                }
            }, i), e)
        }

        function Jn(e, t, n) {
            var r = e.get();
            Gn(Be("al_im.php", {
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
                        Ae.loaded && Ae.detachPlayer(!0)
                    },
                    onDestroy: function() {}
                }
            }, n), e)
        }

        function Yn(e, t) {
            return !(!Object(u.b)(e.peerId) || !e.memberIds) && e.memberIds.indexOf(t) >= 0
        }

        function Xn(e) {
            return !Object(u.b)(e.peerId) || e.data.kicked ? 0 : e.membersCount
        }

        function Zn(e, t) {
            var n = Object(m.c)(e, t.peerId),
                r = Object(o.t)(e, t.peerId) || {};
            return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, Object(u.b)(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
        }

        function $n(e, t) {
            for (var n in t) t.hasOwnProperty(n) && Zn(e, t[n])
        }

        function er(e, t) {
            var n = [],
                r = t.find(function(e) {
                    return "mail" === e[0]
                }),
                i = r ? r[1].split(";") : [];
            for (i.length > ze && (r[1] = i.slice(0, ze).join(";")); e.length > He;) {
                var a = e.substr(0, He).lastIndexOf(" "); - 1 == a && (a = He), n.push({
                    msgText: re(e.substr(0, a))
                }), e = re(e.substr(a))
            }
            for (e.length && n.push({
                    msgText: e,
                    attaches: t
                }), n.length || n.push({
                    attaches: t
                }), i = i.slice(ze); i.length; i = i.slice(ze)) n.push({
                attaches: [
                    ["mail", i.slice(0, ze).join(";")]
                ]
            });
            return n
        }

        function tr(e) {
            return e.length > He
        }

        function nr(e, t, n) {
            var r = !1;
            De("al_im.php", {
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
                        return Ie(Ce("global_error"), e)
                    }, 0), !0
                },
                onDone: function(t, n) {
                    r = h(t.bodyNode, e)
                }
            }, {})
        }

        function rr() {
            Ie(Ce("global_error"), Ce("mail_message_wait_until_uploaded"))
        }

        function ir(e, t) {
            var n = Object(o.t)(e, t.peerId) || {};
            if (!t || !Object(s.k)(t)) return !1;
            if (333 == t.peerId) return !1;
            if (Date.now() / 1e3 - t.date > 86400) return !1;
            if (tt(e, t.peerId, t.messageId)) return !1;
            if (Object(u.b)(t.peerId)) {
                if (n.data.kicked || n.data.closed) return !1
            } else if (n.block_error > 0) return !1;
            return !0
        }

        function ar(e, t) {
            return t.map(function(t) {
                return Object(m.c)(e, t)
            })
        }

        function or(e, t) {
            if ("number" != typeof e || 0 === e) return "";
            var n, r = e,
                i = [];
            if ([
                    [31536e3, Ce(t ? "global_years_accusative" : "global_age_years", "raw")],
                    [2592e3, Ce(t ? "global_months_accusative" : "global_age_months", "raw")],
                    [604800, Ce(t ? "global_weeks_accusative" : "global_age_weeks", "raw")],
                    [86400, Ce(t ? "global_days_accusative" : "global_age_days", "raw")],
                    [3600, Ce(t ? "global_hours_accusative" : "global_hours", "raw")],
                    [60, Ce(t ? "global_minutes_accusative" : "global_minutes", "raw")],
                    [1, Ce(t ? "global_seconds_accusative" : "global_age_seconds", "raw")]
                ].forEach(function(e) {
                    var t = C(e, 2),
                        n = t[0],
                        a = t[1],
                        o = Math.floor(r / n);
                    r %= n, o >= 1 && i.push(Ee(o, a))
                }), 1 === (n = i.length)) return i.pop();
            var a = i.slice(0, n - 1).join(", "),
                o = i.pop();
            return Ce("global_and").replace(/{before}/gi, a).replace(/{after}/gi, o)
        }

        function sr(e, t, n, i) {
            i && !tt(e, n, i) && (Object(o.m)(e, n, i) ? (e.setState({
                msgid: i
            }), Object(a.b)({
                msgid: i
            }), t()) : e.get().longpoll.push([Object(r.Ba)(n, i)]))
        }

        function cr(e) {
            var t = le("im-mess_is_editing");
            if (!t) return null;
            var n = e.get().tabs[e.get().peer],
                r = Object(o.P)(n.msgs[de(t, "msgid")]);
            return r && r.peerId == e.get().peer ? r : null
        }
    },
    QGEU: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s
        }), n.d(t, "d", function() {
            return c
        }), n.d(t, "b", function() {
            return u
        }), n.d(t, "c", function() {
            return _
        });
        var r = n("v+DW"),
            i = n("t7n3"),
            a = n("zxIV"),
            o = n("4+be");

        function s() {
            return !(!window.vk || !vk.a11y)
        }

        function c() {
            clearTimeout(cur.updateOnlineTO), cur.updateOnlineTO = setTimeout(function() {
                Object(i.f)(Object(a.G)("_online"), function() {
                    var e = Object(a.H)("_online_reader", this) || this,
                        t = Object(a.V)(this, "online"),
                        n = Object(a.V)(this, "mobile"),
                        r = Object(a.I)("img", e),
                        s = function(e) {
                            var t = Object(a.n)("_post", e),
                                n = t && Object(a.j)(t, "author");
                            return n ? n.innerText || n.textContent : ""
                        };
                    if (t) {
                        var c = "";
                        Object(i.f)(r, function() {
                            var e = Object(a.c)(this, "alt") || Object(a.c)(this, "data-alt") || s(this);
                            e && (c = Object(i.H)(c + " " + e), this.setAttribute("data-alt", e), this.removeAttribute("alt"))
                        }), c = Object(i.H)(c + " " + (n ? Object(o.d)("global_user_is_online_mobile") : Object(o.d)("global_user_is_online"))), e.setAttribute("aria-label", c)
                    } else Object(i.f)(r, function() {
                        var e = Object(a.c)(this, "data-alt") || s(this);
                        e && (this.setAttribute("alt", e), this.removeAttribute("data-alt"))
                    }), e.removeAttribute("aria-label")
                })
            }, 100)
        }

        function u() {
            clearTimeout(cur.updateChkBoxTO), cur.updateChkBoxTO = setTimeout(function() {
                var e = [];
                Object(i.f)(["checkbox", "checkbox_pic"], function() {
                    e = e.concat(Object(a.G)(this))
                }), Object(i.f)(e, function() {
                    "DIV" !== this.tagName || this.getAttribute("role") || (this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", Object(r.l)(this) ? "true" : "false"), this.setAttribute("tabindex", 0))
                })
            }, 100)
        }

        function d() {
            clearTimeout(cur.updateRadioBtnsTO), cur.updateRadioBtnsTO = setTimeout(function() {
                var e = [],
                    t = Object(a.G)("radiobtn");
                Object(i.f)(t, function() {
                    if ("DIV" === this.tagName && !this.getAttribute("role")) {
                        var t = Object(r.l)(this);
                        this.setAttribute("role", "radio"), this.setAttribute("aria-checked", t ? "true" : "false"), this.setAttribute("tabindex", t ? 0 : -1);
                        var n = function(e) {
                            var t = 0,
                                n = e;
                            for (; t < 5 && n !== document;) {
                                n = Object(a.z)(n);
                                var r = Object(a.G)("radiobtn", n);
                                if (r.length > 1) break;
                                t++
                            }
                            return n
                        }(this);
                        ~e.indexOf(n) || e.push(n)
                    }
                }), Object(i.f)(e, function() {
                    if (!Object(a.G)("on", this).length) {
                        var e = Object(a.G)("radiobtn", this);
                        e.length && e[0].setAttribute("tabindex", 0)
                    }
                })
            }, 100)
        }

        function _() {
            c(), u(), d()
        }
    },
    Wu9C: function(e, t, n) {
        "use strict";
        var r = n("N1NS"),
            i = n("vT4u");

        function a(e) {
            return {
                unmount: function() {
                    Object(r.c)(e)
                }
            }
        }

        function o(e, t, n) {
            return (0, Object(r.b)(a).bindMutations)(Object(r.a)({
                handlers: function(e, t) {}
            }))
        }
        var s = n("P13b"),
            c = n("rHUl"),
            u = n("aong"),
            d = n("uytb");
        n.d(t, "a", function() {
            return f
        }), n.d(t, "c", function() {
            return h
        }), n.d(t, "d", function() {
            return p
        }), n.d(t, "e", function() {
            return m
        }), n.d(t, "b", function() {
            return v
        });
        var _ = "_im_pin_hide",
            l = "_im_pinned_message";

        function f(e, t) {
            if (Object(u.r)(e).searchShown) return !1;
            var n = Object(c.t)(e, t),
                r = n && Object(c.P)(n.pinned);
            return !!r && n.pinHideId != r.chat_local_id
        }

        function h(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = Object(c.t)(e, t),
                a = i && Object(c.P)(i.pinned);
            i && a && (i.pinHideId = a.chat_local_id, cur.imDb.update(d.a, [i.peerId, i.pinHideId]), b(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 1,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "hide"))
        }

        function p(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = Object(c.t)(e, t);
            i && i.pinHideId && (delete i.pinHideId, cur.imDb.update(d.a, [i.peerId, void 0]), b(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 0,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "show"))
        }

        function m(e, t, n) {
            var r = b.bind(null, n, t),
                a = Object(s.Xb)(function() {
                    a.hideProgress(), a.hide(), e.set(i.nc.bind(null, t)).then(r).then(function(e) {
                        return e.set(i.mc.bind(null, t))
                    }).then(r)
                })
        }

        function b(e, t, n) {
            return e().updateChatTopic(t, n), Object(i.Ob)(n.get()), e().updateActions(n), n
        }

        function g(e) {
            return {
                unmount: function() {
                    Object(r.c)(e)
                }
            }
        }

        function v(e, t, n) {
            var i = Object(r.b)(g).bindMutations,
                a = function(e, t, n) {
                    var r = e.get().peer,
                        i = Object(c.P)(Object(c.t)(e, r).pinned);
                    if (n.target.classList.contains(_)) i && h(e, r, t);
                    else if ("A" !== n.target.tagName) {
                        var a = i && i.messageId;
                        a && !Object(s.Fa)(e, r, a) ? Object(s.M)(e, t().focusOnMessage, r, a) : Object(s.Ub)(e, t, r, o, n), statlogsValueEvent("im_pinned_messages", "open")
                    }
                }.bind(null, t, n),
                u = function(e) {
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
            return i(Object(r.a)({
                handlers: function(t, n) {
                    n(e, "click", l, a), n(e, "mouseover", _, u)
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
            return function(i) {
                n.push(i), r || (r = setTimeout(function() {
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
                    var i = new Date;
                    console.debug("%cLP:[" + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds() + ":" + i.getMilliseconds() + "]%c " + e, r, n)
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
                var i = this,
                    a = arguments,
                    o = n && !r;
                clearTimeout(r), r = setTimeout(function() {
                    r = null, n || e.apply(i, a)
                }, t), o && e.apply(this, a)
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

        function checkTextLength(e, t, n, r, i, a, o) {
            var s = t.getValue ? t.getValue() : t.value,
                c = t.lastLen || 0;
            if (t.lastLen !== s.length || a) {
                t.lastLen = s.length;
                var u = {
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
                    _ = {
                        1037: 1,
                        1104: 1,
                        1117: 1
                    };
                i && (u[","] = 5);
                var l = function(e) {
                    for (var t = 0, n = 0, r = e.length; n < r; n++) {
                        var i = u[e.charAt(n)],
                            a = e.charCodeAt(n);
                        t += void 0 !== i ? i : !o && a >= 128 && (a < 1025 || _[a] || a > 1119) && !d[a] && (a < 8220 || a > 8222) && (a < 8224 || a > 8226) ? ("&#" + a + ";").length : 1
                    }
                    return t
                }(s);
                if (n = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)(n), l > Math.max(e - 100, .75 * e))
                    if (Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Ta)(n), l > e)
                        if (i) {
                            var f = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Ya)(t, function(e, t) {
                                for (var n = 0, r = "", i = 0, a = e.length; i < a; i++) {
                                    var s = e.charAt(i),
                                        c = u[s],
                                        l = e.charCodeAt(i);
                                    if ((n += void 0 !== c ? c : !o && l >= 128 && (l < 1025 || _[l] || l > 1119) && !d[l] && (l < 8220 || l > 8222) && (l < 8224 || l > 8226) ? ("&#" + l + ";").length : 1) > t) break;
                                    r += s
                                }
                                return r
                            }(s, Math.min(e, c)));
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
                var i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(Object(_cookies__WEBPACK_IMPORTED_MODULE_3__.a)("remixsettings_bits"));
                if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(_ajax__WEBPACK_IMPORTED_MODULE_4__.d) || 1 & i) return window.open("/away.php?to=" + encodeURIComponent(e) + (t && void 0 !== t.h ? "&h=" + t.h : ""), "_blank"), !1
            }
            var a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)({
                act: "a_go",
                to: e
            }, t || {});
            return !Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.b)("away.php", a, {}, n)
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
                var i = e * (vk.vcost || 7),
                    a = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.G)("money_balance_nom" + n);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(a, function(e, t) {
                    return t.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_money_amount_rub", i, !0)
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
            var i = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)("page_header_wrap") || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)("dev_top_nav_wrap");
            setTimeout(function() {
                n && Object(_scroll__WEBPACK_IMPORTED_MODULE_11__.g)(Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Q)(n)[1] - (i ? Object(_dom__WEBPACK_IMPORTED_MODULE_6__.N)(i)[1] : 0), 0), r && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.E)(r)
            }, 300)
        }
    },
    eTng: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c
        }), n.d(t, "c", function() {
            return u
        }), n.d(t, "d", function() {
            return d
        }), n.d(t, "b", function() {
            return _
        });
        var r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = window.intval;

        function a(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                n = e.split("_"),
                i = r(n, 2);
            return [i[0], i[1], t]
        }
        var o = {};

        function s(e) {
            if (o[e]) return o[e];
            for (var t = e ? e.length : 0, n = [], i = [], s = "", c = 0; c < t; c++) {
                var u = e[c],
                    d = u.charCodeAt(0);
                d >= 48 && d <= 57 || "_" === u || "-" === u ? s += u : "(" !== u && ")" !== u && ":" !== u && "," !== u || ("" !== s && (i.push(s), n.push("id"), s = ""), i.push(u), n.push(u))
            }
            s.length > 0 && (i.push(s), n.push("id"));
            var _ = function e(t, n) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    if (o > 50) return [
                        [], t.length
                    ];
                    for (var s = [], c = ""; i < t.length;) {
                        var u = t[i];
                        if ("id" === u) c = n[i];
                        else if ("," === u && c) s.push(a(c)), c = "";
                        else if ("(" === u) {
                            var d = e(t, n, i + 1, o + 1),
                                _ = r(d, 2),
                                l = _[0];
                            i = _[1], s.push(a(c, l)), c = ""
                        } else if (")" === u) return "" !== c && s.push(a(c)), [s, i];
                        i++
                    }
                    return c && s.push(a(c)), [s, i]
                }(n, i),
                l = r(_, 1)[0];
            return Object.keys(o).length > 300 && (o = {}), o[e] = l, l
        }

        function c(e, t) {
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
                    fwd_count: s(e.fwd).length
                }
            });
            for (var r = 1; e["attach" + r + "_type"]; ++r) "call" === e["attach" + r + "_type"] ? n.push({
                type: e["attach" + r + "_type"],
                id: e["attach" + r],
                initiatorId: i(e["attach" + r + "_call_initiator_id"]),
                state: e["attach" + r + "_call_state"],
                duration: i(e["attach" + r + "_call_duration"]),
                receiverId: i(e["attach" + r + "_call_receiver_id"])
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

        function u(e) {
            return 0 == e
        }

        function d(e) {
            return e > 0 && e < 2e9
        }

        function _(e) {
            return e > 2e9
        }
    },
    f01n: function(e, t, n) {
        "use strict";
        n.d(t, "U", function() {
            return o
        }), n.d(t, "M", function() {
            return s
        }), n.d(t, "Q", function() {
            return c
        }), n.d(t, "a", function() {
            return u
        }), n.d(t, "H", function() {
            return d
        }), n.d(t, "I", function() {
            return _
        }), n.d(t, "s", function() {
            return l
        }), n.d(t, "r", function() {
            return f
        }), n.d(t, "d", function() {
            return h
        }), n.d(t, "e", function() {
            return p
        }), n.d(t, "W", function() {
            return m
        }), n.d(t, "J", function() {
            return b
        }), n.d(t, "Y", function() {
            return g
        }), n.d(t, "X", function() {
            return v
        }), n.d(t, "G", function() {
            return y
        }), n.d(t, "h", function() {
            return O
        }), n.d(t, "P", function() {
            return C
        }), n.d(t, "L", function() {
            return w
        }), n.d(t, "T", function() {
            return k
        }), n.d(t, "S", function() {
            return E
        }), n.d(t, "K", function() {
            return x
        }), n.d(t, "V", function() {
            return j
        }), n.d(t, "R", function() {
            return T
        }), n.d(t, "F", function() {
            return P
        }), n.d(t, "b", function() {
            return M
        }), n.d(t, "c", function() {
            return N
        }), n.d(t, "i", function() {
            return D
        }), n.d(t, "O", function() {
            return I
        }), n.d(t, "f", function() {
            return B
        }), n.d(t, "g", function() {
            return F
        }), n.d(t, "N", function() {
            return L
        }), n.d(t, "m", function() {
            return A
        }), n.d(t, "l", function() {
            return R
        }), n.d(t, "n", function() {
            return W
        }), n.d(t, "j", function() {
            return U
        }), n.d(t, "o", function() {
            return K
        }), n.d(t, "k", function() {
            return q
        }), n.d(t, "q", function() {
            return H
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
            return Y
        }), n.d(t, "C", function() {
            return X
        }), n.d(t, "E", function() {
            return Z
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
            return ie
        }), n.d(t, "Va", function() {
            return ae
        }), n.d(t, "db", function() {
            return oe
        }), n.d(t, "Za", function() {
            return se
        }), n.d(t, "Z", function() {
            return ce
        }), n.d(t, "Ha", function() {
            return ue
        }), n.d(t, "Wa", function() {
            return de
        }), n.d(t, "Ia", function() {
            return _e
        }), n.d(t, "Pa", function() {
            return le
        }), n.d(t, "Qa", function() {
            return fe
        }), n.d(t, "Ma", function() {
            return he
        }), n.d(t, "La", function() {
            return pe
        }), n.d(t, "Ya", function() {
            return me
        }), n.d(t, "Ua", function() {
            return be
        }), n.d(t, "cb", function() {
            return ge
        }), n.d(t, "Fa", function() {
            return ve
        }), n.d(t, "Da", function() {
            return ye
        }), n.d(t, "Ea", function() {
            return Oe
        }), n.d(t, "fb", function() {
            return Ce
        }), n.d(t, "Ra", function() {
            return we
        }), n.d(t, "hb", function() {
            return ke
        }), n.d(t, "gb", function() {
            return Ee
        }), n.d(t, "Oa", function() {
            return xe
        }), n.d(t, "Ta", function() {
            return je
        }), n.d(t, "Aa", function() {
            return Te
        }), n.d(t, "Ja", function() {
            return Pe
        }), n.d(t, "eb", function() {
            return Me
        }), n.d(t, "bb", function() {
            return Ne
        }), n.d(t, "Sa", function() {
            return De
        }), n.d(t, "ab", function() {
            return Ie
        }), n.d(t, "Ba", function() {
            return Be
        }), n.d(t, "Ca", function() {
            return Fe
        }), n.d(t, "Ka", function() {
            return Le
        }), n.d(t, "Na", function() {
            return Se
        }), n.d(t, "Xa", function() {
            return Ae
        });
        var r = n("eTng"),
            i = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            a = "event_delete",
            o = "event_set_flags",
            s = "event_replace_flags",
            c = "event_reset_flags",
            u = "event_add_message",
            d = "event_read_inbound",
            _ = "event_read_outbound",
            l = "event_got_online",
            f = "event_got_offline",
            h = "event_chat_changed",
            p = "event_chat_updated",
            m = "event_typing",
            b = "event_recoding_audio",
            g = "event_video_call",
            v = "event_unread_count",
            y = "event_notify_settings_changed",
            O = "event_empty",
            C = "event_reset_directories",
            w = "event_replace_directories",
            k = "event_set_directories",
            E = "event_resync",
            x = "event_refresh_lp_key",
            j = "transition_event",
            T = "reset_peer",
            P = "mutex",
            M = "change_peer",
            N = "event_change_tab",
            D = "event_failed_message",
            I = "event_resend",
            B = "event_delete_dialog",
            F = "event_edit_message",
            L = "event_replace_message",
            S = "event_audio_start",
            A = 2,
            R = 8,
            W = 64,
            U = 128,
            K = 65536,
            q = 1 << 21,
            H = 1,
            z = 8,
            V = 1,
            G = 2,
            Q = 3,
            J = 4,
            Y = 5,
            X = 6,
            Z = 7,
            $ = 8,
            ee = 9,
            te = 10,
            ne = 11,
            re = 12;

        function ie(e) {
            var t = i(e, 2)[1];
            return {
                type: a,
                localId: t
            }
        }

        function ae(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: s,
                messageId: n,
                mask: r,
                peerId: a
            }
        }

        function oe(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: o,
                messageId: n,
                flags: r,
                peerId: a
            }
        }

        function se(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: c,
                messageId: n,
                flags: r,
                peerId: a
            }
        }

        function ce(e) {
            var t = i(e, 11),
                n = t[1],
                a = t[2],
                o = t[3],
                s = t[4],
                c = t[5],
                d = t[6],
                _ = t[7],
                l = t[8],
                f = t[9],
                h = t[10],
                p = extend(d, _ || void 0);
            return {
                type: u,
                messageId: intval(n),
                flags: intval(a),
                peerId: intval(o),
                date: intval(s),
                attaches: Object(r.a)(p, n),
                subject: d.title || "",
                text: c,
                kludges: p,
                randomId: intval(l),
                userId: Object(r.b)(o) ? intval(p.from) : intval(o),
                update_time: h,
                chat_local_id: f
            }
        }

        function ue(e) {
            var t = ce(e);
            return t.type = F, t
        }

        function de(e) {
            var t = ce(e);
            return t.type = L, t
        }

        function _e(e) {
            return extend({}, e, {
                type: F
            })
        }

        function le(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: d,
                peerId: n,
                upToId: r,
                unread: a
            }
        }

        function fe(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: _,
                peerId: n,
                upToId: r,
                unread: a
            }
        }

        function he(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: l,
                userId: -n,
                platform: r,
                lastSeenTs: a
            }
        }

        function pe(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: f,
                userId: -n,
                reason: r,
                lastSeenTs: a
            }
        }

        function me(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: C,
                peerId: n,
                mask: r,
                local: void 0 !== a && a
            }
        }

        function be(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: w,
                peerId: n,
                mask: r
            }
        }

        function ge(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: k,
                peerId: n,
                mask: r,
                local: void 0 !== a && a
            }
        }

        function ve(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: B,
                peerId: n,
                localId: r
            }
        }

        function ye(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: h,
                chatId: n,
                self: r
            }
        }

        function Oe(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: p,
                peerId: r,
                updateType: n,
                updateArg: a
            }
        }

        function Ce(e) {
            var t = i(e, 5),
                n = t[1],
                r = t[2],
                a = t[3],
                o = t[4];
            return {
                type: m,
                peerId: n,
                userIds: r,
                totalCount: a,
                ts: o
            }
        }

        function we(e) {
            var t = i(e, 5),
                n = t[1],
                r = t[2],
                a = t[3],
                o = t[4];
            return {
                type: b,
                peerId: n,
                userIds: r,
                totalCount: a,
                ts: o
            }
        }

        function ke(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: g,
                userId: n,
                callId: r
            }
        }

        function Ee(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: v,
                count: n,
                countNotMuted: r,
                showOnlyNotMuted: a
            }
        }

        function xe(e) {
            var t = i(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: y,
                peerId: n.peer_id,
                sound: n.sound,
                disabledUntil: n.disabled_until
            }
        }

        function je(e) {
            var t = i(e, 2)[1],
                n = void 0 === t ? {} : t,
                r = ce([!1, n.id, n.flags, n.peer_id, n.date, n.message, extend(n.kludges, {
                    title: n.title || ""
                }), {}, n.random_id, n.chat_local_id, n.update_time]);
            return r.type = F, r
        }

        function Te(e) {
            var t = i(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: S,
                uuid: n.uuid,
                deviceName: n.device_name || ""
            }
        }

        function Pe(e) {
            return {
                type: O,
                params: e
            }
        }

        function Me(e) {
            return {
                type: j,
                state: e
            }
        }

        function Ne() {
            return {
                type: E
            }
        }

        function De(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: x,
                key: n,
                url: r
            }
        }

        function Ie() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return {
                type: T,
                cancelSearch: e,
                removeActivePeer: t
            }
        }

        function Be(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
            return {
                type: M,
                peerId: e,
                msgid: t,
                forward: n,
                cancelSearch: r,
                entryPoint: i
            }
        }

        function Fe(e) {
            return {
                type: N,
                tab: e
            }
        }

        function Le(e, t, n) {
            return {
                type: D,
                message: t,
                peer: e,
                error: n
            }
        }

        function Se(e) {
            var t = i(e, 6),
                n = (t[0], t[1]),
                r = t[2],
                a = t[3],
                o = t[4],
                s = t[5];
            return {
                type: P,
                free: !!intval(n) || intval(o) === vk.id,
                resource: r,
                peerId: intval(a),
                who: intval(o),
                name: s
            }
        }

        function Ae(e, t) {
            return {
                type: I,
                message: t,
                peerId: e
            }
        }
    },
    gQAo: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return h
        }), n.d(t, "c", function() {
            return p
        }), n.d(t, "d", function() {
            return m
        }), n.d(t, "b", function() {
            return b
        });
        var r = n("iN1s"),
            i = n("EUzL"),
            a = n("P+eJ"),
            o = n("ERyv"),
            s = window.vk,
            c = window.lpConnect,
            u = window.lpInstance;

        function d() {
            return s.id > 0
        }

        function _() {
            return window.curNotifier && window.curNotifier.lp_connected
        }

        function l() {
            return window.curNotifier && window.curNotifier.is_server || window.browser.safari
        }

        function f(e, t, n) {
            u.onLp(e, t, n), _() && l() && (e != t || n.length) && function(e, t, n) {
                window.Notifier.lcSend("lp_data", {
                    tsOld: e,
                    tsNow: t,
                    evs: n
                }), Object(a.b)("silver", "broadcast to others", e, t, n)
            }(e, t, n)
        }

        function h() {
            return d() ? (u || (s.lpConfig.id = s.id, window.lpConnect = c = Object(r.a)(s.lpConfig, f), e = Object(i.a)(s.lpConfig.ts, function(e) {
                Object(a.a)(e), t.trigger("data", e)
            }, g), t = new window.EventEmitter, window.lpInstance = u = {
                onData: function(e) {
                    t.on("data", e)
                },
                offData: function(e) {
                    t.off("data", e)
                },
                pause: function() {
                    e.pause()
                },
                resume: function() {
                    e.resume()
                },
                push: function(e) {
                    t.trigger("data", e)
                },
                abortWaiting: function() {
                    c.abortWaiting()
                },
                onLp: function(t, n, r) {
                    e.onLp(t, n, r)
                },
                isEnabled: function() {
                    return !(!c || c.isStopped())
                }
            }), u) : null;
            var e, t
        }

        function p() {
            d() && (Object(a.b)("orange", "init longpoll connection on load"), h(), window.curNotifier.idle_manager.on("unidle", function() {
                c.abortWaiting()
            }), m())
        }

        function m() {
            d() && (_() ? c.isStopped() && l() ? (Object(a.b)("orange", "now master, init connection"), Object(o.b)("fc_longpoll_master", {}, !1), c.reinitConnection()) : c.isStopped() || l() || (Object(a.b)("orange", "now slave, stop connection"), Object(o.b)("fc_longpoll_slave", {}, !1), c.stopConnection()) : setTimeout(m, 500))
        }

        function b(e) {
            _() && !l() && d() && (Object(a.b)("silver", "recv from master", e.tsOld, e.tsNow, e.evs), c.onLp(e.tsOld, e.tsNow, e.evs))
        }

        function g(e) {
            var t = window.extend({}, window.lpConnect.options, {
                ts: e
            });
            return Object(a.b)("orange", "createLongpoll to load from", e), new Promise(function(e) {
                var n = Object(r.a)(t, function(t, r, i) {
                    Object(a.b)("orange", "Loaded [" + t + "," + r + ")"), n.stopConnection(), e([t, r, i])
                })
            })
        }
    },
    "h++7": function(e, t, n) {
        "use strict";
        var r;

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        n.d(t, "t", function() {
            return a
        }), n.d(t, "f", function() {
            return o
        }), n.d(t, "B", function() {
            return s
        }), n.d(t, "q", function() {
            return c
        }), n.d(t, "r", function() {
            return u
        }), n.d(t, "b", function() {
            return d
        }), n.d(t, "a", function() {
            return _
        }), n.d(t, "v", function() {
            return l
        }), n.d(t, "u", function() {
            return f
        }), n.d(t, "d", function() {
            return h
        }), n.d(t, "o", function() {
            return p
        }), n.d(t, "e", function() {
            return m
        }), n.d(t, "z", function() {
            return b
        }), n.d(t, "A", function() {
            return g
        }), n.d(t, "w", function() {
            return v
        }), n.d(t, "m", function() {
            return y
        }), n.d(t, "h", function() {
            return O
        }), n.d(t, "n", function() {
            return C
        }), n.d(t, "i", function() {
            return w
        }), n.d(t, "k", function() {
            return k
        }), n.d(t, "l", function() {
            return E
        }), n.d(t, "g", function() {
            return x
        }), n.d(t, "j", function() {
            return j
        }), n.d(t, "y", function() {
            return T
        }), n.d(t, "p", function() {
            return P
        }), n.d(t, "c", function() {
            return M
        }), n.d(t, "s", function() {
            return N
        }), n.d(t, "x", function() {
            return D
        });
        var a = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
            o = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,
            s = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/,
            c = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g,
            u = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g,
            d = 38,
            _ = 40,
            l = 33,
            f = 34,
            h = 35,
            p = 36,
            m = 13,
            b = [d, _, l, f, m, 27, h, p],
            g = [l, f, _, d, p, h],
            v = "printable",
            y = "unread",
            O = "all",
            C = "unrespond",
            w = "important",
            k = "mr",
            E = "mr_rejected",
            x = [O, y, C, w, k],
            j = (i(r = {}, C, 2), i(r, w, 1), i(r, k, 256), i(r, E, 512), r),
            T = [].concat("aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw".split(","), "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр".split(","), "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e".split(",").map(function(e) {
                return "xn--" + e
            })),
            P = T.reduce(function(e, t) {
                return Math.max(e, t.length)
            }, 0),
            M = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})))", "ig"),
            N = new RegExp("(https?:\\/\\/)?(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})(?:\\:(\\d{2,5}))?)(([\\/?#])(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*[\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј\\—\\-\\_@#%?+\\/\\$.~=;:'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ　-〿＀-￯*]+|(?:\\(|\\[)[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\d&#%;,]+(?:\\)|\\])){0,200})?", "ig"),
            D = "(^|[s.,:'\";>)(]?)((#(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)){0,100}(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?))(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)){0,100}))(@((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?))?(?=$|[s.,:'\"&;?<)(]?)"
    },
    hOuX: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return i
        });
        var r = 2147483647;

        function i() {
            try {
                if (window.crypto) {
                    var e = new Int32Array(1);
                    return crypto.getRandomValues(e), Math.abs(e.reduce(function(e, t) {
                        return e + t
                    }))
                }
            } catch (e) {}
            return intval(rand(0, r).toFixed(0))
        }
    },
    iN1s: function(e, t, n) {
        "use strict";
        var r = n("DM26"),
            i = n("BxOC"),
            a = n("f01n"),
            o = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            s = 202,
            c = 6,
            u = 4;

        function d(e, t) {
            e.waitAbortFns.push(t)
        }

        function _(e) {
            if (e.isStoppedFn()) return Promise.resolve({
                ts: 0,
                updates: []
            });
            var t = Object(i.a)(e.url, {
                    act: "a_check",
                    key: e.key,
                    version: e.version,
                    ts: e.ts,
                    wait: 25,
                    mode: e.mode
                }),
                n = t.request,
                a = t.cancel;
            return e.stopFn = a, n.then(function(t) {
                var n = o(t, 2),
                    r = n[0],
                    i = n[1];
                return e.onData(e, i), e.waitTimeout = 2, JSON.parse(r)
            }).catch(function(t) {
                var n = o(t, 2),
                    r = (n[0], n[1]);
                throw e.onData(e, r), ""
            }).then(function(t) {
                return function(e, t) {
                    var n = t.failed ? Object(r.a)(u, null) : {},
                        i = n.abort,
                        a = n.pause;
                    switch (t.failed) {
                        case 1:
                            return d(e, i), e.onHistoryLost(e, t).then(function() {
                                return e.onResult({
                                    ts: t.ts,
                                    updates: [
                                        [-1]
                                    ]
                                })
                            }).then(a).then(function() {
                                return _(e)
                            });
                        case 2:
                            return d(e, i), e.onKeyExpired(e, t).then(function(t) {
                                var n = o(t, 4),
                                    r = n[0],
                                    i = n[1],
                                    a = n[2],
                                    s = n[3];
                                return e.onResult({
                                    ts: +s,
                                    updates: [
                                        [-2, r, i + "/" + a],
                                        [-1]
                                    ]
                                })
                            }).then(a).then(function() {
                                return _(e)
                            });
                        case 3:
                            return e.onLpBroken(e, t);
                        default:
                            return t
                    }
                }(e, t)
            })
        }

        function l(e) {
            e.isStoppedFn() || _(e).then(e.onResult).catch(function(t) {
                return function(e, t) {
                    if (e.isStoppedFn()) return;
                    e.onRequestError(t), e.waitTimeout = Math.min(64, 2 * e.waitTimeout);
                    var n = Object(r.a)(e.waitTimeout, null),
                        i = n.abort,
                        a = n.pause;
                    return d(e, i), a()
                }(e, t)
            }).then(function() {
                return l(e)
            })
        }

        function f(e, t) {
            var n = !!e.stopped,
                r = {
                    id: e.id,
                    key: e.key,
                    ts: e.ts,
                    url: e.url,
                    lpstat: e.lpstat || 0,
                    version: e.version || c,
                    mode: s,
                    waitTimeout: 2,
                    waitAbortFns: [],
                    isStoppedFn: function() {
                        return n
                    },
                    onResult: function(e) {
                        e.ts && o(r.ts, e.ts, e.updates.map(function(e) {
                            switch (e[0]) {
                                case 0:
                                    return a.Ga(e);
                                case 1:
                                    return a.Va(e);
                                case 2:
                                    return a.db(e);
                                case 3:
                                    return a.Za(e);
                                case 4:
                                    return a.Z(e);
                                case 5:
                                    return a.Ha(e);
                                case 6:
                                    return a.Pa(e);
                                case 7:
                                    return a.Qa(e);
                                case 8:
                                    return a.Ma(e);
                                case 9:
                                    return a.La(e);
                                case 10:
                                    return a.Ya(e);
                                case 11:
                                    return a.Ua(e);
                                case 12:
                                    return a.cb(e);
                                case 13:
                                    return a.Fa(e);
                                case 18:
                                    return a.Wa(e);
                                case 51:
                                    return a.Da(e);
                                case 52:
                                    return a.Ea(e);
                                case 63:
                                    return a.fb(e);
                                case 64:
                                    return a.Ra(e);
                                case 70:
                                    return a.hb(e);
                                case 80:
                                    return a.gb(e);
                                case 114:
                                    return a.Oa(e);
                                case 116:
                                    return a.Ta(e);
                                case 117:
                                    return a.Aa(e);
                                case -1:
                                    return a.bb();
                                case -2:
                                    return a.Sa(e);
                                default:
                                    return a.Ja(e)
                            }
                        }))
                    },
                    onData: h(t.onData),
                    onRequestError: h(t.onRequestError),
                    onHistoryLost: p(t.onHistoryLost),
                    onKeyExpired: p(t.onKeyExpired),
                    onLpBroken: p(t.onHistoryLost)
                },
                i = t.onEvents;

            function o(e, t, n) {
                r.ts = t;
                for (var o = 0; o < n.length; ++o) n[o].type === a.K && (r.key = n[o].key, r.url = n[o].url);
                i(e, t, n)
            }
            var u = {
                options: r,
                isStopped: function() {
                    return n
                },
                stopConnection: function() {
                    n = !0, r.stopFn && r.stopFn(), r.stopFn = void 0, this.abortWaiting()
                },
                reinitConnection: function() {
                    this.stopConnection(), n = !1, l(r)
                },
                abortWaiting: function() {
                    r.waitAbortFns.forEach(function(e) {
                        return e()
                    }), r.waitAbortFns = [], r.waitTimeout = 2
                },
                onLp: o
            };
            return l(r), u
        }

        function h(e) {
            return e || function() {}
        }

        function p(e) {
            return e ? function() {
                return Promise.resolve(e.apply(void 0, arguments))
            } : function() {
                return Promise.reject()
            }
        }
        var m = n("P+eJ"),
            b = n("vT4u");

        function g(e, t) {
            return f(e, {
                onEvents: t,
                onData: C,
                onRequestError: w,
                onHistoryLost: k,
                onKeyExpired: E,
                onLpBroken: x
            })
        }
        n.d(t, "a", function() {
            return g
        });
        var v = 3e4,
            y = {},
            O = Date.now();

        function C(e, t) {
            if (t && t.status && e.lpstat) {
                var n = Math.floor(t.status / 100);
                t.status >= 500 && t.status < 600 && statlogsValueEvent("fc_longpoll", 1, n + "0x", t.getResponseHeader("x-frontend")), y[n] = n in y ? y[n] + 1 : 1, Date.now() - O >= v && (Object.keys(y).forEach(function(e) {
                    statlogsValueEvent("fc_longpoll", y[e], e + "0x", t.getResponseHeader("x-frontend"))
                }), y = {}, O = Date.now())
            }
        }

        function w(e) {
            Object(m.b)("red", "LP error", e.message || "no message (probably browser reset)")
        }

        function k(e, t) {
            Object(m.b)("red", "LP failed: old timestamp; resync, next ts", t.ts)
        }

        function E(e) {
            return Object(m.b)("red", "LP failed: key is incorrect; refresh key"), Object(i.b)(b.e, {
                act: "a_get_key",
                uid: e.id,
                gid: e.id < 0 ? -e.id : 0
            })
        }

        function x() {
            throw window.nav.reload({
                force: !0
            }), new Error("ts is very wrong")
        }
    },
    j0Lq: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        var _lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("98sY");
        window.TopNotifierCur || (window.TopNotifierCur = {
            link: "top_notify_btn",
            count: "top_notify_count",
            _qParams: {
                section: "notifications",
                _tb: 1,
                list: ""
            },
            loaded: !1,
            loading: !1,
            from: ""
        }), window.TopNotifier = {
            onBellMouseDown: function(e) {
                return !checkKeyboardEvent(e) && TopNotifier.show(e)
            },
            onBellClick: function(e) {
                return !!checkEvent(e) || !!checkKeyboardEvent(e) && TopNotifier.show(e)
            },
            onLoad: function onLoad(rows, js, from, header) {
                if (TopNotifierCur.loading = !1, !from || TopNotifierCur.from !== from) {
                    void 0 !== rows && "undefined" !== rows || ajax.plainpost("/errors.php", {
                        msg: ajax.lastResp || "TopNotifier load undefinded response",
                        module: "top_notify",
                        id: vk.id,
                        host: locHost,
                        lang: vk.lang,
                        loc: (window.nav || {}).strLoc,
                        realloc: location.toString()
                    });
                    var evalExpr = "(function(){" + js + ";})()";
                    try {
                        eval(evalExpr)
                    } catch (e) {
                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__.d)(e, evalExpr)
                    }
                    TopNotifierCur.loaded = !0, val(TopNotifier.getContentNode(), rows), TopNotifier.refreshHeader(header), TopNotifier.cleanCount(), TopNotifier.refreshCounters(), TopNotifierCur.from = from
                }
            },
            refreshHeader: function(e) {
                var t = void 0,
                    n = geByClass1("_notify_unread"),
                    r = e && !geByClass1("_top_notify_header"),
                    i = n && n.offsetHeight;
                if (r ? (TopNotifierCur.header = se(e), t = ce("div", {
                        className: "top_notify_header_label"
                    }), TopNotifierCur.header.appendChild(t)) : t = geByClass1("top_notify_header_label", TopNotifierCur.header), 1 === cur.groupNotify_enabled) {
                    if (r) {
                        val(t, "");
                        var a = "";
                        TopNotifierCur.notify_sources.forEach(function(e) {
                            "" !== e.list && e.list === TopNotifierCur._qParams.list && (a = e.name)
                        }), "" === a && (a = getLang("global_notifications_user"));
                        var o, s = ce("div", {
                                className: "top_notify_header_sup_label"
                            }),
                            c = ce("span", {
                                className: "top_notify_header_label_user",
                                innerHTML: a
                            }),
                            u = ce("span", {
                                className: "top_notify_header_label_groups"
                            }),
                            d = ce("a", {
                                onmouseover: function(e) {
                                    TopNotifier.getSourcesTip(this, e)
                                },
                                className: "top_notify_header_label_groups_link",
                                innerHTML: getLang("global_notifications_groups")
                            });
                        if (u.appendChild(d), o = ce("span", {
                                className: "top_notify_header_label_groups_counter",
                                innerHTML: ""
                            }), s.appendChild(c), cur.user_has_admined_groups > 0 && (s.appendChild(u), s.appendChild(o)), t.appendChild(s), i) {
                            var _ = ce("div", {
                                className: "top_notify_header_sub_label",
                                innerHTML: getLang("global_viewed_notifications")
                            });
                            t.appendChild(_)
                        }
                    }
                } else if (i) {
                    if (r || !geByClass1("top_notify_header_sup_label", t)) {
                        var l = ce("div", {
                                className: "top_notify_header_sup_label",
                                innerHTML: getLang("global_unread_notifications")
                            }),
                            f = ce("div", {
                                className: "top_notify_header_sub_label",
                                innerHTML: getLang("global_viewed_notifications")
                            });
                        val(t, ""), t.appendChild(l), t.appendChild(f)
                    }
                } else(r || geByClass1("top_notify_header_sup_label", t)) && val(t, getLang("global_notifitications"));
                r && TopNotifierCur.wrapper.insertBefore(TopNotifierCur.header, TopNotifierCur.wrapper.firstChild), TopNotifierCur.header_unread = geByClass1("_notify_header"), TopNotifierCur.header_unread && (i ? (TopNotifierCur.header_unread_hidden && slideDown(TopNotifierCur.header_unread, 100), TopNotifierCur.header_unread_hidden = !1, TopNotifierCur.header_unread_handler || (TopNotifierCur.header_unread_height = TopNotifierCur.header_unread.offsetHeight, TopNotifierCur.header_unread_handler = function(e) {
                    if (TopNotifierCur.header_unread) {
                        var t = TopNotifierCur.header_unread.offsetTop + TopNotifierCur.header_unread_height < e.data.scrollTop;
                        t != TopNotifierCur.swaped && (toggleClass(TopNotifierCur.header, "top_notify_header_swap_labels", t), TopNotifierCur.swaped = t)
                    }
                }, TopNotifierCur.scrollbar.emitter.addListener("update", TopNotifierCur.header_unread_handler))) : (TopNotifierCur.header_unread_hidden || slideUp(TopNotifierCur.header_unread, 100), TopNotifierCur.header_unread_hidden = !0, TopNotifierCur.header_unread_handler && (TopNotifierCur.scrollbar.emitter.removeListener("update", TopNotifierCur.header_unread_handler), TopNotifierCur.header_unread_handler = null)))
            },
            preload: function() {
                TopNotifier.shown() || vk.isBanned || TopNotifierCur.loaded || ajax.post("/al_feed.php", extend(clone(TopNotifierCur._qParams), {
                    _preload: 1
                }), {
                    cache: 1,
                    onDone: function(e, t, n, r) {
                        TopNotifier.shown() && geByClass1("pr", "top_notify_cont") && (TopNotifier.onLoad(e, t, n, r), TopNotifierCur.loaded = !0)
                    },
                    stat: ["feed.css", "page.css", "post.css"]
                })
            },
            loadMore: function loadMore() {
                var btn = ge("ui_top_notify_load_more");
                btn && !isButtonLocked(btn) && (TopNotifierCur.ajax = ajax.post("/al_feed.php", extend(clone(TopNotifierCur._qParams), {
                    from: TopNotifierCur.from,
                    more: 1,
                    need_header: intval(!(geByClass1("_notify_header") || !geByClass1("_notify_sticky") && !geByClass1("_notify_unread")))
                }), {
                    onDone: function onDone(rows, js, newFrom) {
                        if (TopNotifierCur.scrollbar) {
                            var evalExpr = "(function(){" + js + ";})()";
                            try {
                                eval(evalExpr)
                            } catch (e) {
                                Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__.d)(e, evalExpr)
                            }
                            if (rows) {
                                for (var row = null, cont = TopNotifier.getContentNode(), au = cf(rows); row = au.firstChild;) cont.insertBefore(row, btn);
                                TopNotifier.refreshHeader()
                            }
                            newFrom ? TopNotifierCur.from = newFrom : re(btn)
                        }
                    },
                    showProgress: function() {
                        show(btn), lockButton(btn)
                    },
                    hideProgress: function() {
                        hide(btn), unlockButton(btn)
                    }
                }))
            },
            updateTimes: function(e) {
                each(geByClass("rel_date_needs_update", e, "span"), function(e, t) {
                    if (t) {
                        var n = intval(t.getAttribute("time")),
                            r = 60 * ((new Date).getTimezoneOffset() + 180),
                            i = getDateText(n, r);
                        !0 === hasClass(this, "ucfirst") && (i = i.charAt(0).toUpperCase() + i.slice(1)), t.innerHTML = i
                    }
                })
            },
            show: function(e) {
                if (gpeByClass("top_notify_cont", e.target)) return !0;
                if (!0 !== checkEvent(e) && !vk.isBanned) {
                    if (TopNotifier.shown()) return gpeByClass("top_notify_wrap", e.target, ge("top_nav")) || TopNotifier.hide(), cancelEvent(e);
                    var t = ge(TopNotifierCur.link),
                        n = ge("top_notify_cont");
                    TopNotifier.updateTimes(n), TopNotifierCur.timeUpdateInt = setInterval(function() {
                        TopNotifier.updateTimes(n)
                    }, 1e4), cur.introNotifyTooltipHide && (cur.introNotifyTooltipHide(), delete cur.introNotifyTooltipHide), t.tt && t.tt.hide && t.tt.hide(), n || (TopNotifierCur.wrapper = ce("div", {
                        innerHTML: '<div id="top_notify_cont" class="top_notify_cont wall_module" ontouchstart="event.cancelBubble = true;" onmousedown="event.cancelBubble = true;"></div><a href="/feed?section=notifications' + (TopNotifierCur._qParams.list ? "&list=" + TopNotifierCur._qParams.list : "") + '" class="top_notify_show_all" onmousedown="event.cancelBubble = true;" onclick="TopNotifier.hide(); return nav.go(this, event);">' + getLang("global_notify_show_all") + "</a>",
                        id: "top_notify_wrap",
                        className: "scroll_fix_wrap top_notify_wrap"
                    }), t.appendChild(TopNotifierCur.wrapper), n = ge("top_notify_cont"));
                    var r = window.innerHeight || document.documentElement.clientHeight;
                    setStyle(n, {
                        maxHeight: Math.min(Math.max(r - 200, 300), 600)
                    }), addClass(TopNotifierCur.link, "active");
                    var i = uiScroll;
                    return TopNotifierCur.scrollbar && TopNotifierCur.scrollbar.container.__uiScroll__ || (TopNotifierCur.scrollbar = new i(n, {
                        global: !0,
                        stopScrollPropagationAlways: !0,
                        onmore: TopNotifier.loadMore
                    })), TopNotifierCur.loaded || TopNotifier.refresh(), cancelStackPush("top_notifier", TopNotifier.hide.bind(TopNotifier), !0), cancelEvent(e)
                }
            },
            hide: function() {
                TopNotifier.shown() && (removeClass(TopNotifierCur.link, "active"), clearInterval(TopNotifierCur.timeUpdateInt), cancelStackFilter("top_notifier", !0), 1 === cur.groupNotify_enabled && "" !== TopNotifierCur._qParams.list && (TopNotifierCur._qParams.list = "", TopNotifier.invalidate()))
            },
            shown: function() {
                return hasClass(TopNotifierCur.link, "active")
            },
            getContentNode: function() {
                return TopNotifierCur.scrollbar && TopNotifierCur.scrollbar.content && TopNotifierCur.scrollbar.container.__uiScroll__ ? TopNotifierCur.scrollbar.content : ge("top_notify_cont")
            },
            showProgress: function(e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function() {
                var e = TopNotifier.getContentNode();
                geByClass1("pr", e) || (val(e, ""), showProgress(e))
            }),
            hideProgress: function(e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function() {
                var e = TopNotifier.getContentNode();
                val(e, ""), hideProgress(e)
            }),
            showTooltip: function(e) {
                function t(t, n) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t) {
                if (!TopNotifier.shown() && !isVisible("dev_top_nav")) {
                    var n = ge(TopNotifierCur.link),
                        r = {};
                    if (n) {
                        if ("shownow" == n.tt && removeAttr(n, "tt"), e) r.text = function() {
                            return e
                        }, t && (r.onHide = o.pbind(t));
                        else {
                            n.tt && n.tt.destroy && n.tt.destroy();
                            var i = ls.get("ntfseen") || {},
                                a = [];
                            each(i, function(e, t) {
                                a.push(e + ":" + t)
                            }), r = extend(r, {
                                url: "al_feed.php",
                                params: {
                                    act: "a_last_notify",
                                    seen: a.join(";")
                                },
                                ajaxdt: 2e3,
                                noload: 1,
                                onHide: o
                            })
                        }
                        showTooltip(n, extend(r, {
                            typeClass: "top_notify_tt",
                            dir: "up",
                            width: 250,
                            shift: [0, 0],
                            nohideover: 1,
                            nohide: 1,
                            onShowStart: function(e) {
                                TopNotifier.shown() && (e.opts.onHide = !1, e.hide()), addEvent(e.container, "mousedown", function(e) {
                                        if (!e || !inArray(e.target.tagName, ["A", "IMG"])) return TopNotifier.show(e), cancelEvent(e)
                                    }),
                                    function e(t) {
                                        setTimeout(function() {
                                            window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle ? e(t) : (t && t.hide(), Notifier.lcSend("hide_notify_tt"))
                                        }, 6e3)
                                    }(e), Notifier.setRecvClbk("hide_notify_tt", e.hide)
                            }
                        }))
                    }
                }

                function o(e) {
                    if (!e && cur.topNotifyTTKey && (e = cur.topNotifyTTKey, delete cur.topNotifyTTKey), e) {
                        var t = e.split(":"),
                            n = ls.get("ntfseen") || {};
                        2 == t.length && (n[0] = parseInt((new Date).getTime() / 1e3), n[t[0]] = t[1], ls.set("ntfseen", n))
                    }
                }
            }),
            invalidate: function() {
                TopNotifierCur.loaded = !1, ajax.invalidate("/al_feed.php", TopNotifierCur._qParams), TopNotifierCur.ajax && TopNotifierCur.ajax.abort()
            },
            setCount: function(e, t) {
                isString(e) && (e = trim(e)), parseInt(e) >= 100 && (e = "+99"), hasClass(TopNotifierCur.link, "has_notify") && e ? animateCount(TopNotifierCur.count, e, {
                    str: "auto"
                }) : val(TopNotifierCur.count, e), toggleClass(TopNotifierCur.link, "has_notify", !!e), t || TopNotifier.invalidate()
            },
            cleanCount: function() {
                cur.topNotifyHash && (1 === cur.groupNotify_enabled && TopNotifierCur.notify_sources.forEach(function(e, t) {
                    var n = parseInt(e.list.replace("group-", ""));
                    e.list !== TopNotifierCur._qParams.list && -1 === cur.groupNotify_readGids.indexOf(n) || (TopNotifierCur.notify_sources[t].counter = 0)
                }), ajax.post("/al_feed.php", {
                    act: "a_clean_notify",
                    hash: cur.topNotifyHash,
                    list: TopNotifierCur._qParams.list,
                    gn_readGids: cur.groupNotify_readGids
                }))
            },
            refresh: function() {
                TopNotifier.invalidate(), TopNotifierCur.wrapper && !TopNotifierCur.loading && (TopNotifierCur.loading = !0, re(geByClass1("_notify_header")), re(geByClass1("_top_notify_header")), TopNotifierCur.from = 0, ajax.post("/al_feed.php", TopNotifierCur._qParams, {
                    cache: 1,
                    onDone: TopNotifier.onLoad,
                    showProgress: TopNotifier.showProgress,
                    stat: ["feed.css"],
                    onFail: function() {
                        TopNotifierCur.loading = !1, TopNotifier.hideProgress(), val(ge("top_notify_cont"), '<div class="top_notify_empty no_rows">' + getLang("global_error_occured") + "</div>")
                    }
                }))
            },
            unifiedDeleteRow: function(e, t, n, r) {
                cancelEvent(e);
                var i = gpeByClass("feedback_row_wrap", r),
                    a = domPN(i),
                    o = geByClass1("post_actions", a);
                ajax.post("al_feed.php", {
                    act: "a_feedback_unified_delete",
                    query: t,
                    hash: n,
                    from: "top_notifier"
                }, {
                    onDone: function(e) {
                        var t = geByClass1("_post_content", i),
                            n = geByClass1("_feedback_deleted", a);
                        n ? (n.innerHTML = '<span class="dld_inner">' + e + "</span>", show(n)) : a.appendChild(ce("div", {
                            className: "feedback_row dld _feedback_deleted _top_feedback_deleted",
                            innerHTML: '<span class="dld_inner">' + e + "</span>"
                        })), hide(t), hasClass(a, "feedback_row_clickable") && addClass(a, "feedback_row_touched")
                    },
                    showProgress: addClass.pbind(o, "post_actions_progress"),
                    hideProgress: removeClass.pbind(o, "post_actions_progress")
                })
            },
            checkClick: function(e, t) {
                if (t = t || window.event, !e || !t) return !0;
                var n = t.target || t.srcElement,
                    r = 8,
                    i = !1,
                    a = /(feedback_sticky_text|feedback_sticky_icon|feedback_row)/;
                do {
                    if (!n || n == e || n.onclick || n.onmousedown || inArray(n.tagName, ["A", "IMG", "TEXTAREA", "EMBED", "OBJECT"]) || (i = n.className.match(a))) break
                } while (r-- && (n = n.parentNode));
                if (!i) return !1;
                if (n && n.className) {
                    var o = n.className.split(" "),
                        s = "unknown",
                        c = -1,
                        u = geByClass("feedback_row");
                    for (r = 0; r < o.length; ++r) {
                        var d = o[r].match("feedback_(.+)_row");
                        if (o[r] && d && d[1]) {
                            s = d[1];
                            break
                        }
                    }
                    for (r = 0; r < u.length; ++r)
                        if (u[r] == n) {
                            c = r;
                            break
                        }
                    hasClass(e, "feed_row_from_group") ? statlogsValueEvent("feed_group_notify", 0, "click", s, c) : statlogsValueEvent("feed_top_notify", 0, "click", s, c)
                }
                return n || !0
            },
            ungroup: function ungroup(item, event) {
                var el = ge("top_feedback_row" + item);
                if (event = event || window.event, el && !hasClass(el, "feedback_row_expanded") && !checkEvent(event) && TopNotifier.checkClick(el, event)) {
                    var hid = domNS(domPN(el)),
                        names = geByClass1("_header", el),
                        text = domData(names, "text");
                    show(hid), removeClass(el, "feedback_row_grouped"), addClass(el, "feedback_row_expanded"), val(names, text);
                    var evalExpr = "(function(){ if (!TopNotifier.checkClick(this, event)) return; " + unclean(domData(names, "click")) + ";})";
                    try {
                        el.onclick = eval(evalExpr)
                    } catch (e) {
                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__.d)(e, evalExpr)
                    }
                }
            },
            ungroupUnified: function(e, t) {
                var n = ge("top_feedback_row" + e);
                if (t = t || window.event, n && !hasClass(n, "feedback_row_expanded") && !checkEvent(t) && TopNotifier.checkClick(n, t)) {
                    var r = domNS(domPN(n));
                    show(r), re(domPN(n)), t.stopPropagation(), t.preventDefault()
                }
            },
            showActionsMenu: function(e) {
                var t = !1,
                    n = domClosest("_feed_row", e),
                    r = domPN(n);
                hasClass(r, "_notify_unread") && (r = domPN(r)), r.lastChild != n || hasClass(r, "feed_row_fb_hidden") || hasClass(r, "feedback_sticky_rows") && domPN(r).lastChild != r || (t = {
                    appendParentCls: "top_notify_wrap",
                    processHoverCls: hasClass(domPN(e), "post_actions") ? "feedback_row" : "feedback_sticky_row"
                }), uiActionsMenu.show(e, !1, t)
            },
            hideActionsMenu: function(e) {
                uiActionsMenu.hide(e)
            },
            frProcess: function(e, t, n, r) {
                var i;
                isButtonLocked(n) || (i = r ? {
                    act: "add",
                    mid: e,
                    hash: t,
                    request: 1,
                    from: "top_notifier"
                } : {
                    act: "remove",
                    mid: e,
                    hash: t,
                    report_spam: 1,
                    from: "top_notifier"
                }, statlogsValueEvent("feed_top_notify", 0, "friends", i.act), ajax.post("/al_friends.php", i, {
                    onDone: function(t) {
                        var i = domPN(n);
                        val(i, t), addClass(i, "feedback_buttons_response"), "friends" == cur.module && window.Friends && (val("request_controls_" + e, t), window.Friends.processRequest(e, r))
                    },
                    onFail: function(e) {
                        if (e) return setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0
                    },
                    showProgress: lockButton.pbind(n),
                    hideProgress: unlockButton.pbind(n)
                }))
            },
            apiCallProcess: function(e, t, n, r, i, a, o) {
                if (isButtonLocked(o)) return !1;
                var s = function() {
                    ajax.post("/al_feed.php", {
                        act: "a_api_call",
                        hash: cur.topNotifyHash,
                        query: e
                    }, {
                        onDone: function(e) {
                            var r = domPN(o);
                            val(r, '<div class="feedback_apicallText">' + (n ? '<div class="feedback_apicallIcon ' + n + 'Icon"></div>' : "") + t + "</div>")
                        },
                        onFail: function(e) {
                            if (e) return setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0
                        },
                        showProgress: lockButton.pbind(o),
                        hideProgress: unlockButton.pbind(o)
                    })
                };
                return r ? cur.confirmBox = showFastBox(getLang("global_action_confirmation"), r, i, function() {
                    s(), cur.confirmBox.hide()
                }, a) : s(), !0
            },
            grProcess: function(e, t, n, r) {
                if (!(hasClass(n, "flat_button") && isButtonLocked(n) || domFC(n) && "progress_inline" == domFC(n))) {
                    var i = -2 == r ? "spam" : r ? "enter" : "leave",
                        a = -1 == r ? "_decline" : "";
                    ajax.post("/al_groups.php", {
                        act: i,
                        gid: e,
                        hash: t,
                        from: "top_notifier",
                        context: a
                    }, {
                        onDone: function(e) {
                            var t = domPN(n);
                            val(t, e), addClass(t, "feedback_buttons_response")
                        },
                        onFail: function(e) {
                            if (e) return setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0
                        },
                        showProgress: function() {
                            if (-2 == r) {
                                n.oldhtml = n.innerHTML;
                                var e = getSize(n)[0];
                                n.innerHTML = '<span class="progress_inline"></span>', setStyle(domFC(n), {
                                    width: e
                                })
                            } else lockButton(n)
                        },
                        hideProgress: function() {
                            -2 == r ? n.innerHTML = n.oldhtml : unlockButton(n)
                        }
                    })
                }
            },
            gn_grProcess: function(e, t, n, r, i, a) {
                return i.stopPropagation(), (!hasClass(r, "flat_button") || !isButtonLocked(r)) && ((!domFC(r) || "progress_inline" != domFC(r)) && (ajax.post("groupsedit.php", {
                    act: "user_action",
                    id: e,
                    addr: t,
                    hash: n,
                    from: "top_notifier",
                    action: a
                }, {
                    onDone: function(e) {
                        var t = domPN(r);
                        return val(t, e), addClass(t, "feedback_buttons_response"), !1
                    },
                    onFail: function(e) {
                        return !!e && (setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !1)
                    },
                    showProgress: function() {
                        lockButton(r)
                    },
                    hideProgress: function() {
                        unlockButton(r)
                    }
                }), !1))
            },
            showGiftBox: function(e, t, n) {
                return !showBox("al_gifts.php", {
                    act: "get_gift_box",
                    fids: e,
                    fr: 1,
                    ref: n
                }, {
                    stat: ["gifts.css", "wide_dd.js", "wide_dd.css"],
                    cache: 1,
                    dark: 1
                }, t)
            },
            getSourcesTip: function(e, t) {
                return cancelEvent(t), showTooltip(e, {
                    url: "/al_page.php",
                    params: {
                        act: "notify_get_sources",
                        cur_list: TopNotifierCur._qParams.list
                    },
                    slide: 15,
                    ajxdt: 200,
                    hidedt: 200,
                    dir: "bottom",
                    shift: [100, 10],
                    id: "notify_sources",
                    className: "notify_sources",
                    onShowStart: function() {
                        TopNotifierCur.notify_sources.forEach(function(e) {
                            val(geByClass1("notify_tooltip_counter" + e.list), e.counter > 0 ? e.counter : "")
                        }), TopNotifier.refreshTooltip()
                    }
                }), !1
            },
            changeSource: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                null !== n && cancelEvent(n), e !== TopNotifierCur._qParams.list ? (re(geByClass1("notify_sources")), t && val(geByClass1("ui_rmenu_count", t), ""), geByClass1("top_notify_show_all") && attr(geByClass1("top_notify_show_all"), "href", "/feed?section=notifications" + (e ? "&list=" + e : "")), TopNotifierCur._qParams.list = e, TopNotifier.refresh()) : hide(geByClass1("notify_sources"))
            },
            changeSourceFullCallback: function() {
                if (1 === cur.groupNotify_enabled) {
                    TopNotifier.refreshCounters(), TopNotifierCur.notify_sources.forEach(function(e) {
                        e.list && val(geByClass1("ui_rmenu_count", geByClass1("feed_section_" + e.list)), e.counter > 0 ? e.counter : "")
                    });
                    var e = geByTag1("a", geByClass1("header_side_link", geByClass1("feed_notifications")));
                    "" === TopNotifierCur.settings_url ? hide(e) : (show(e), attr(e, "href", TopNotifierCur.settings_url)), TopNotifierCur.source_name || (TopNotifierCur.source_name = getLang("news_title_notifications")), val(geByClass1("page_block_header_inner", geByClass1("feed_notifications")), TopNotifierCur.source_name)
                }
            },
            hideBanner: function(e, t, n) {
                ajax.post("al_feed.php", {
                    act: "a_feedback_hide_banner",
                    group_id: n,
                    hash: t
                }), hide(ge("internal_notification131"))
            },
            addNewSource: function(e, t, n) {
                return ajax.post("al_settings.php", {
                    act: "a_group_notify_add_source",
                    gid: e,
                    from: n,
                    hash: t
                }, {
                    onDone: function(t) {
                        nav.go("/settings?act=group_notify&gid=" + e), TopNotifier.changeSource("group-" + e, null, null)
                    },
                    showProgress: lockButton.pbind(cur.popupSubmitBtnEl),
                    hideProgress: unlockButton.pbind(cur.popupSubmitBtnEl)
                }), !0
            },
            refreshCounters: function() {
                var e = 0,
                    t = 0,
                    n = 0,
                    r = geByClass1("top_notify_header_label_groups_counter");
                1 === cur.groupNotify_enabled && TopNotifierCur.notify_sources.forEach(function(r) {
                    "" !== r.list && r.counter > 0 && (1 === r.unmuted ? (t++, n++) : e++), "" === r.list && (n += r.counter)
                }), vk.counts.ntf = n, TopNotifier.setCount(n, !0), t > 0 ? (addClass(r, "unmuted"), val(r, t)) : (removeClass(r, "unmuted"), val(r, e > 0 ? e : ""))
            },
            refreshTooltip: function() {
                var e = [],
                    t = [],
                    n = geByClass1("groups", geByClass1("notify_sources")),
                    r = ce("div");
                n && (geByClass("line_cell", n).forEach(function(n, r) {
                    val(geByClass1("ui_rmenu_count", n)) > 0 ? e.push(n) : t.push(n)
                }), e.concat(t).forEach(function(e) {
                    r.appendChild(e)
                }), val(n, ""), n.appendChild(r))
            }
        }
    },
    kMSP: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return i
        }), n.d(t, "d", function() {
            return a
        }), n.d(t, "b", function() {
            return o
        }), n.d(t, "c", function() {
            return s
        });
        var r = n("zxIV");

        function i(e) {
            return function() {
                window._cookies = {};
                for (var e = document.cookie.split(";"), t = /^[\s]*([^\s]+?)$/i, n = 0, r = e.length; n < r; n++) {
                    var i = e[n].split("=");
                    2 === i.length && (_cookies[i[0].match(t)[1]] = unescape(i[1].match(t) ? i[1].match(t)[1] : ""))
                }
            }(), _cookies[e]
        }

        function a(e, t, n, r) {
            var i = "";
            if (n) {
                var a = new Date;
                a.setTime(a.getTime() + 24 * n * 60 * 60 * 1e3), i = "; expires=" + a.toGMTString()
            }
            var o = window.locDomain;
            document.cookie = e + "=" + escape(t) + i + "; path=/" + (o ? "; domain=." + o : "") + (r && "https:" === locProtocol ? "; secure" : "")
        }

        function o() {
            Object(r.Fa)("cookies_policy_wrap"), ajax.post("/settings", {
                act: "a_hide_cookies_policy"
            })
        }

        function s() {
            window._cookies = {}
        }
    },
    kcIO: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return u
        }), n.d(t, "d", function() {
            return d
        }), n.d(t, "a", function() {
            return _
        }), n.d(t, "e", function() {
            return l
        }), n.d(t, "c", function() {
            return f
        });
        var r = n("Egk5"),
            i = n("t7n3"),
            a = n("zxIV"),
            o = n("7jxN"),
            s = n("gdug"),
            c = {
                hideAll: function(e, t) {
                    if (e)
                        for (; c.count();) c.hideLast();
                    else {
                        if (c.count()) {
                            var n = _message_boxes[c._boxes.pop()];
                            n._in_queue = !1, n._hide(!1, !1, t)
                        }
                        for (; c.count();) {
                            _message_boxes[c._boxes.pop()]._in_queue = !1
                        }
                    }
                },
                hideLast: function(e, t) {
                    if (c.count()) {
                        var n = window._message_boxes[c._boxes[c.count() - 1]];
                        if (!0 === e && (n.changed || c.skip || t && t.target && t.target.tagName && "input" !== t.target.tagName.toLowerCase() && cur.__mdEvent && t.target !== cur.__mdEvent.target)) return void(c.skip = !1);
                        n.hide()
                    }
                    if (t && "click" === t.type) return Object(r.c)(t)
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
                        var n = !!c.count();
                        c.curBox = e, t._show(n || c.currHiding, n), c._boxes.push(e)
                    }
                },
                _hide: function(e) {
                    var t = _message_boxes[e];
                    if (t && t._in_queue && c._boxes[c.count() - 1] === e && t.isVisible() && (t._in_queue = !1, c._boxes.pop(), t._hide(!!c.count()), c.count())) {
                        var n = c._boxes[c.count() - 1];
                        c.curBox = n, _message_boxes[n]._show(!0, !0, !0)
                    }
                },
                _boxes: [],
                curBox: 0
            };

        function u() {
            var e = window._message_boxes[c.curBox];
            return e && e.isVisible() ? e : null
        }

        function d() {
            c.hideLastCheck = c.hideLast.pbind(!0), window._message_box_guid = 0, window._message_boxes = []
        }

        function _(e) {
            var t = window.innerHeight || document.documentElement.clientHeight || boxLayerBG.offsetHeight,
                n = s.a.mobile ? Object(i.r)(window.pageYOffset) : 0,
                r = Object(a.N)(e);
            e.style.marginTop = Math.max(10, n + (t - r[1]) / 3) + "px"
        }

        function l(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = (t.w || 380) + 20,
                c = t.w ? ' style="width: ' + t.w + 'px;"' : "",
                u = bodyNode.offsetWidth,
                d = Object(a.e)("div", {
                    className: "top_result_baloon_wrap fixed " + (t.className || ""),
                    innerHTML: '<div class="top_result_baloon"' + c + ">" + e + "</div>"
                }, {
                    left: (u - n) / 2
                });
            t.parentEl ? Object(a.H)(t.parentEl).appendChild(d) : bodyNode.insertBefore(d, pageNode);
            var _ = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
                l = s.a.mobile ? Object(i.r)(window.pageYOffset) : 0,
                f = Object(a.N)(d);
            d.style.top = Math.max(10, l + (_ - f[1]) / 3) + "px";
            var h = t.out || 2e3,
                p = new Date,
                m = function e() {
                    h < 0 || (window.doneBoxTO = setTimeout(function() {
                        !t.permit || t.permit() ? Object(o.f)(d.firstChild, 500, function() {
                            Object(a.Fa)(d), t.callback && t.callback()
                        }) : e()
                    }, h))
                };
            return Object(r.b)(d, "mouseenter", function() {
                clearTimeout(window.doneBoxTO), h -= new Date - p
            }), Object(r.b)(d, "mouseleave", function() {
                p = new Date, m()
            }), m(), d
        }

        function f() {
            return c
        }
    },
    lJdi: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
            return c
        }), n.d(t, "d", function() {
            return u
        }), n.d(t, "b", function() {
            return d
        }), n.d(t, "a", function() {
            return _
        }), n.d(t, "l", function() {
            return y
        }), n.d(t, "f", function() {
            return O
        }), n.d(t, "e", function() {
            return C
        }), n.d(t, "h", function() {
            return w
        }), n.d(t, "i", function() {
            return k
        }), n.d(t, "j", function() {
            return E
        }), n.d(t, "g", function() {
            return x
        }), n.d(t, "k", function() {
            return j
        }), n.d(t, "m", function() {
            return P
        }), n.d(t, "n", function() {
            return N
        });
        var r, i = n("rHUl"),
            a = n("aong"),
            o = n("P13b");

        function s(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var c = 1,
            u = 4,
            d = 8,
            _ = 16,
            l = "see_invite_link",
            f = "change_invite_link",
            h = "invite_user",
            p = "pin_unpin",
            m = "change_title",
            b = "add_admin",
            g = (s(r = {}, l, 32), s(r, f, 32), s(r, b, _), s(r, h, c), s(r, p, u), s(r, m, d), r),
            v = 1;

        function y(e, t, n) {
            return T(e, l, t, n)
        }

        function O(e, t, n) {
            return T(e, f, t, n)
        }

        function C(e, t, n, r) {
            var o = Object(a.r)(e);
            return !N(Object(i.t)(o, n || o.peer), t) && T(e, b, n, r)
        }

        function w(e, t, n) {
            return T(e, h, t, n)
        }

        function k(e, t, n, r) {
            var s = Object(a.r)(e);
            if (function(e, t) {
                    var n = Object(a.r)(e);
                    return void 0 !== n.service && (n.service & t) > 0
                }(e, v)) return !0;
            var c = Object(i.t)(s, n || s.peer);
            return !(c.data.kicked && !c.data.closed) && (!Object(o.Pa)(e, n) && (!N(c, t) && (!!N(c, r = void 0 === r ? window.vk.id : r) || (M(c, r) ? !M(c, t) : function(e, t) {
                return -1 !== e.invitedByMe.indexOf(t)
            }(c, t) && !M(c, t)))))
        }

        function E(e, t, n) {
            return T(e, p, t, n)
        }

        function x(e, t, n) {
            return T(e, m, t, n)
        }

        function j(e, t, n) {
            return !Object(i.C)(n) || !!Object(i.t)(e, t).caccess[n]
        }

        function T(e, t, n, r) {
            var s = Object(a.r)(e);
            r = void 0 === r ? window.vk.id : r, n = void 0 === n ? s.peer : n;
            var c = Object(i.t)(s, n),
                u = !c.data.kicked && !c.data.closed,
                d = g[t];
            if (Object(o.Pa)(e, n)) switch (t) {
                case b:
                case h:
                    return !1;
                case l:
                    return u;
                default:
                    return s.gid > 0
            }
            switch (t) {
                case l:
                case f:
                case b:
                    return P(c, d) ? M(c, r) && u : N(c, r);
                case h:
                case p:
                case m:
                    return P(c, d) ? M(c, r) && u : u
            }
            return !1
        }

        function P(e, t) {
            return ((e && e.data && e.data.flags || 0) & t) > 0
        }

        function M(e, t) {
            return (e && e.adminIds || []).indexOf(+t) > -1
        }

        function N(e, t) {
            return e.ownerId === t
        }
    },
    nyd8: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return o
        }), n.d(t, "a", function() {
            return s
        });
        var r = window,
            i = r.nav,
            a = r.extend;

        function o(e) {
            var t = a({}, i.objLoc, e);
            Object.keys(t).filter(function(e) {
                return "" === t[e]
            }).forEach(function(e) {
                delete t[e]
            });
            var n = i.toStr(t);
            i.setLoc(n)
        }

        function s() {
            var e = {};
            return {
                scheduleNav: function(t) {
                    e = a(e, t)
                },
                commitNav: function() {
                    o(e), e = {}
                },
                scheduleNavWithTimeOut: function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                    e = a(e, t), setTimeout(function() {
                        o(e), e = {}
                    }, n)
                }
            }
        }
    },
    p3re: function(e, t, n) {
        "use strict";
        n.d(t, "e", function() {
            return u
        }), n.d(t, "c", function() {
            return d
        }), n.d(t, "f", function() {
            return _
        }), n.d(t, "d", function() {
            return h
        }), n.d(t, "a", function() {
            return p
        }), n.d(t, "b", function() {
            return m
        });
        var r = n("h++7"),
            i = void 0,
            a = window,
            o = a.clean,
            s = a.replaceEntities,
            c = a.statlogsValueEvent;

        function u(e, t) {
            for (var n = void 0, i = 0, a = e; null !== (n = r.s.exec(e));) {
                var o = (n = l(n))[0].length,
                    s = n.index + o,
                    c = e[n.index - 1],
                    u = e[s - 1],
                    d = void 0 !== c && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(c),
                    _ = void 0 !== u && /([:;$])/i.test(u);
                if (!d && !_) {
                    var h = f(n),
                        p = h.domain.toLowerCase();
                    if (p.length <= r.p && -1 !== r.y.indexOf(p)) {
                        var m = t(h);
                        a = a.slice(0, n.index + i) + m + a.slice(s + i), i += m.length - o
                    }
                }
            }
            return a
        }

        function d(e, t) {
            return e.replace(r.c, t || function(e) {
                return '<a href="mailto:' + e + '">' + e + "</a>"
            })
        }

        function _(e, t) {
            return e.replace(r.q, t || function(e, t, n, r, i) {
                return '<a href="/' + (t + n) + '" class="mem_link" mention="' + o(r || "") + '" mention_id="' + o(t + n) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + i + "</a>"
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

        function h(e, t) {
            return e.replace((i || (i = new RegExp(r.x, "ig")), i), function(e, n, r, i, a, o) {
                return (n || "") + t(r + (a || ""))
            })
        }

        function p(e) {
            c("ttl_message_confirm_delivery", e)
        }

        function m(e, t) {
            var n = t.protocol,
                i = t.url,
                a = t.query,
                c = t.domain,
                u = t.full;
            try {
                u = decodeURIComponent(u)
            } catch (e) {}
            if (u.length > 55 && (u = u.substr(0, 53) + ".."), u = o(u).replace(/&amp;/g, "&"), !e && c.match(r.t)) {
                var d, _ = i = s(i).replace(r.f, encodeURIComponent),
                    l = i.indexOf("#/"),
                    f = "";
                return l >= 0 ? _ = i.substr(l + 1) : (l = i.indexOf("#!")) >= 0 && (_ = "/" + i.substr(l + 2).replace(/^\//, "")), (d = _.match(r.B)) && d[1].length < 32 && (f = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + function(e) {
                    return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }(n + i + a) + '" target="_blank"' + f + ">" + u + "</a>"
            }
            return '<a href="' + ("away.php?utf=1&to=" + encodeURIComponent(n + s(i + a))) + '" target="_blank" onclick="' + ("return goAway('" + o((n + i + a).replace(/'/g, "\\'")) + "', {}, event);") + '">' + u + "</a>"
        }
    },
    rHUl: function(e, t, n) {
        "use strict";
        n.d(t, "h", function() {
            return d
        }), n.d(t, "K", function() {
            return _
        }), n.d(t, "o", function() {
            return l
        }), n.d(t, "f", function() {
            return f
        }), n.d(t, "j", function() {
            return h
        }), n.d(t, "t", function() {
            return p
        }), n.d(t, "g", function() {
            return m
        }), n.d(t, "s", function() {
            return b
        }), n.d(t, "n", function() {
            return g
        }), n.d(t, "b", function() {
            return v
        }), n.d(t, "J", function() {
            return y
        }), n.d(t, "l", function() {
            return O
        }), n.d(t, "k", function() {
            return C
        }), n.d(t, "P", function() {
            return w
        }), n.d(t, "d", function() {
            return k
        }), n.d(t, "m", function() {
            return E
        }), n.d(t, "q", function() {
            return x
        }), n.d(t, "z", function() {
            return j
        }), n.d(t, "G", function() {
            return T
        }), n.d(t, "D", function() {
            return P
        }), n.d(t, "B", function() {
            return M
        }), n.d(t, "y", function() {
            return N
        }), n.d(t, "e", function() {
            return D
        }), n.d(t, "I", function() {
            return I
        }), n.d(t, "E", function() {
            return B
        }), n.d(t, "O", function() {
            return F
        }), n.d(t, "F", function() {
            return L
        }), n.d(t, "w", function() {
            return S
        }), n.d(t, "N", function() {
            return A
        }), n.d(t, "C", function() {
            return R
        }), n.d(t, "A", function() {
            return W
        }), n.d(t, "a", function() {
            return U
        }), n.d(t, "L", function() {
            return K
        }), n.d(t, "r", function() {
            return q
        }), n.d(t, "M", function() {
            return H
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
            return Y
        }), n.d(t, "v", function() {
            return X
        }), n.d(t, "Q", function() {
            return Z
        }), n.d(t, "R", function() {
            return $
        });
        var r = n("MhhX"),
            i = n("f01n"),
            a = n("h++7"),
            o = n("86+7"),
            s = n("rjmT"),
            c = n("aong"),
            u = n("lJdi");

        function d(e, t) {
            var n = Object(c.r)(e),
                i = n.tabs[n.peer];
            return Object.keys(i.msgs).filter(function(n) {
                var a = E(e, t, n);
                return !Object(r.k)(a) && intval(n) > i.in_up_to
            })[0]
        }

        function _(e) {
            return Object(c.r)(e).searchShown
        }

        function l(e) {
            return Object(c.r)(e).peer
        }

        function f(e) {
            return h(e, l(e))
        }

        function h(e, t) {
            return (p(e, t) || {}).keyboard
        }

        function p(e, t) {
            var n = Object(c.r)(e);
            return n.tabs && n.tabs[t]
        }

        function m(e) {
            var t = Object(c.r)(e);
            return t.peer ? t.tabs[t.peer] : null
        }

        function b(e) {
            return Object(c.r)(e).selectedMessages
        }

        function g(e, t, n) {
            var i = p(e, t),
                a = b(e)[0];
            if (void 0 === a) return [n];
            var o = Math.min(n, a),
                s = Math.max(n, a);
            return Object.keys(i.msgs).filter(function(e) {
                return e >= o && e <= s
            }).filter(function(t) {
                var n = E(e, e.get().peer, t);
                return !Object(r.l)(n) && !Object(r.e)(n)
            }).map(intval)
        }

        function v(e, t) {
            var n = p(Object(c.r)(t), e),
                i = 0;
            for (var a in n.msgs)
                if (n.msgs.hasOwnProperty(a)) {
                    var o = E(t, e, a);
                    Object(r.k)(o) || (i += Object(r.n)(n, o) ? 1 : 0)
                }
            return i
        }

        function y(e, t, n) {
            return !! function(e, t, n) {
                var r = p(e, t);
                return Object.keys(r.msgs).filter(function(r) {
                    return intval(E(e, t, r).randomId) === n
                }).length > 0
            }(e, t, n)
        }

        function O(e, t) {
            var n = Object(c.r)(e),
                r = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
            return void 0 !== r ? 2e9 + r : t
        }

        function C(e, t, n) {
            var r = p(e, t),
                a = E(e, t, n),
                o = Object.keys(r.msgs).filter(function(n) {
                    var r = E(e, t, n),
                        o = r.local && r.type !== i.g;
                    return !(!a.local && o) && (!(!a.local || o) || O(e, a.messageId) > O(e, r.messageId))
                }).pop();
            return o ? E(e, t, o) : null
        }

        function w(e) {
            return e && e.length > 0 ? i.Z([0].concat(e)) : e
        }

        function k(e, t, n) {
            var i = p(e, t),
                a = E(e, t, n),
                s = Object(c.r)(e);
            return Object(r.k)(a) ? Object(o.c)(e, s.id).name : a.userId !== a.peerId ? !!Object(o.b)(e, a.userId) && Object(o.c)(e, a.userId).name : i.tab
        }

        function E(e, t, n) {
            var r = p(e, t),
                i = r && r.msgs && r.msgs[n];
            return i ? w(i) : null
        }

        function x(e, t, n) {
            var r = p(e, t),
                i = r && r.msgs && Object.keys(r.msgs).sort(function(e, t) {
                    return +e - t
                });
            if (!i) return null;
            var a = i && i.indexOf("" + n),
                o = a > -1 ? i[a - 1] : null;
            return r.msgs[o]
        }

        function j(e) {
            var t = Object(c.r)(e);
            return t.gid || t.isClassic
        }

        function T(e) {
            return Object(c.r)(e).gid
        }

        function P(e) {
            return Object(c.r)(e).gid
        }

        function M(e) {
            return !!Object(c.r)(e).gid
        }

        function N(e, t) {
            return !!(t.peerId > 2e9 && Object(u.m)(t, 1024))
        }

        function D(e, t) {
            var n = Object(c.r)(t);
            return n.tabs[e] || n.mapped_index[e]
        }

        function I(e) {
            var t = Object(c.r)(e);
            return !!M(e) && ((19542789 === t.gid || 103416369 == t.gid) && (t.active_tab === a.n || t.active_tab === a.m))
        }

        function B(e, t) {
            var n = (e = Object(c.r)(e)).tabs;
            return !(!n || !n[t] || void 0 === n[t].history || !n[t].msgs)
        }

        function F(e, t) {
            var n = p(e, t);
            n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
        }

        function L(e) {
            var t = e.get().go_to_end_visible;
            return !!t && t[0]
        }

        function S(e) {
            var t = e.get().go_to_end_visible;
            return t ? t[1] : 0
        }

        function A(e) {
            return !Object(c.r)(e).lockedSending
        }

        function R(e) {
            return e > -2e9 && e < 0
        }

        function W(e, t) {
            return !!R(t) && !!p(e, t).blocked_community
        }

        function U(e) {
            return Object(c.r)(e).voice_message_available
        }

        function K(e) {
            var t = Object(c.r)(e);
            return !(!q(t) && !t.recentSearch)
        }

        function q(e) {
            return Object(c.r)(e).searchText
        }

        function H(e, t) {
            var n = Object(c.r)(e);
            return !!(t && t !== q(e) || n.recentSearch)
        }

        function z(e) {
            return Object(c.r)(e).recentSearch
        }

        function V(e) {
            var t = m(e);
            return t && t.pinned && w(t.pinned)
        }

        function G(e) {
            var t = e.get().popular_sugg;
            return t && t.length > 0
        }

        function Q(e) {
            return 1 == Object(c.r)(e).isEditing
        }

        function J(e) {
            return Object(c.r)(e).gid
        }

        function Y(e) {
            return e.draft || (e.draft = Object(s.b)(cur.imDb, e.peerId)), e.draft
        }

        function X(e) {
            return (Object(c.r)(e).templates || []).filter(function(e) {
                return !e.deleted
            })
        }

        function Z(e) {
            return e.is_message_request || e.folders & a.j[a.k] || e.folders & a.j[a.l]
        }

        function $(e) {
            return e.peerId > 19e8 && e.peerId < 2e9
        }
    },
    rjmT: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s
        }), n.d(t, "b", function() {
            return u
        });
        var r = n("BxOC"),
            i = n("f01n"),
            a = n("vT4u"),
            o = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function s(e, t) {
            this._db = e, this._key = t, this.dData = {
                txt: "",
                attaches: [],
                urlBinds: [],
                cancelled: []
            }, this.load()
        }

        function c(e) {
            switch (e.type) {
                case "mail":
                case "reply":
                    return e.id < 0 && 1 == e.object.fwd_count;
                default:
                    return !e.object
            }
        }

        function u(e, t) {
            return new s(e, "draft_" + t)
        }
        s.prototype.dump = function() {
            var e;
            this._key && this._db.updateByKey(this._key, {
                txt: (e = this.dData).txt,
                attaches: e.attaches.length ? e.attaches : void 0,
                urlBinds: e.urlBinds.length ? e.urlBinds : void 0,
                cancelled: e.cancelled.length ? e.cancelled : void 0
            })
        }, s.prototype.load = function() {
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
        }, s.prototype.clear = function() {
            this.dData = {
                txt: "",
                attaches: [],
                urlBinds: [],
                cancelled: []
            }, this.dump()
        }, s.prototype.setText = function(e) {
            this.dData.txt = trim(e), this.dump()
        }, s.prototype.addAttach = function(e, t, n) {
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
        }, s.prototype.syncWithSelector = function(e) {
            var t = this,
                n = this.getFwdRaw();
            this.dData.attaches = (n ? [n] : []).concat(e.getMedias().map(function(e) {
                var n = o(e, 2),
                    r = n[0],
                    i = n[1];
                return t.dData.attaches.find(function(e) {
                    return e.type == r && e.id == i
                }) || {
                    type: r,
                    id: i
                }
            })), this.dump()
        }, s.prototype.removeAttachByType = function(e) {
            for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
            this.dump()
        }, s.prototype.removeAllAttaches = function() {
            this.dData.attaches = [], this.dData.cancelled = [], this.dump()
        }, s.prototype.addBindUrl = function(e, t, n) {
            this.getBoundAttach(e) || (this.dData.urlBinds.push({
                url: e,
                type: t,
                id: n
            }), this.dump())
        }, s.prototype.getBoundAttach = function(e) {
            var t = this.dData.urlBinds.find(function(t) {
                return t.url === e
            });
            return t && this.dData.attaches.find(function(e) {
                return e.type === t.type && e.id === t.id
            }) || null
        }, s.prototype.getShareUrl = function() {
            var e = this.dData.attaches.find(function(e) {
                return "share" === e.type
            });
            if (e && e.object) return e.object.url
        }, s.prototype.hasOnlyReplies = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return e ? e.flags & i.k && !this.dData.attaches.find(function(e) {
                return "mail" !== e.type
            }) : this.hasAttaches() && !this.dData.attaches.find(function(e) {
                return "reply" !== e.type
            })
        }, s.prototype.getCancelledShares = function() {
            return this.dData.cancelled.length ? this.dData.cancelled : void 0
        }, s.prototype.hasAttaches = function() {
            return this.dData.attaches.length > 0
        }, s.prototype.destroy = function() {
            this.dData = {}, this._key = this._db = null
        }, s.prototype.prepareObjects = function(e, t) {
            var n = this;
            return this.dData.attaches.find(c) ? Object(r.b)(a.e, {
                act: "draft_medias",
                gid: e,
                messageId: t || 0,
                media: t ? void 0 : this.dData.attaches.map(function(e) {
                    return [e.type, e.id]
                }).join("*")
            }).then(function(e) {
                var t = o(e, 1)[0];
                n.dData.attaches = t.map(function(e) {
                    return {
                        type: e[0],
                        id: e[1],
                        object: e[2]
                    }
                })
            }) : Promise.resolve()
        }, s.prototype.getFwdRaw = function() {
            return this.dData.attaches.find(function(e) {
                return "mail" === e.type || "reply" === e.type
            })
        }, s.prototype.getFwdCount = function() {
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
            var i = "msg" + ("msg" !== n ? " " + n : "");
            r && (i += " msg_appear"), e = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)(e);
            var a = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.H)(n, e),
                o = a || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.u)(e),
                s = e.insertBefore(Object(_dom__WEBPACK_IMPORTED_MODULE_0__.e)("div", {
                    className: i,
                    innerHTML: '<div class="msg_text">' + t + "</div>"
                }), o);
            a && Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Fa)(a), setTimeout(_dom__WEBPACK_IMPORTED_MODULE_0__.Ha.pbind(s, "msg_appear"), 0)
        }

        function showGlobalPrg(e, t) {
            var n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Q)(e),
                r = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.N)(e),
                i = t || {},
                a = i.w,
                o = void 0 === a ? 32 : a,
                s = i.h,
                c = void 0 === s ? 13 : s,
                u = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)("global_prg");
            u.className = i.cls || "progress", Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Qa)(u, {
                left: n[0] + Math.floor((r[0] - o) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.r)(i.shift ? i.shift[0] : 0),
                top: n[1] + Math.floor((r[1] - c) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.r)(i.shift ? i.shift[1] : 0),
                width: o,
                height: c,
                display: "block",
                "z-index": i.zIndex ? i.zIndex : null
            }), i.hide && (e.style.visibility = "hidden")
        }
    },
    uytb: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return i
        }), n.d(t, "a", function() {
            return a
        }), n.d(t, "c", function() {
            return u
        });
        var r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = "recent_search",
            a = "pin_hide";

        function o(e) {
            return "im_store_" + e
        }

        function s(e) {
            return ls.get(o(e)) || {}
        }

        function c(e, t, n) {
            if (ls.checkVersion()) {
                var r = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", r.length), n(o(e), r)
            }
        }

        function u(e) {
            var t = debounce(function(e, t) {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && function(e, t) {
                for (var n = ["fwd", "draft", "bind_attach"], r = s(e), i = !1, a = n.length; a--;) n[a] in r && (delete r[n[a]], i = !0);
                i && c(e, r, t)
            }(e, t);
            var n = {
                    db: s(e),
                    checkTime: Date.now()
                },
                u = function(e, t, n) {
                    n.key === o(e) && (t.db = JSON.parse(n.newValue), t.checkTime = Date.now())
                }.bind(null, e, n);
            return window.addEventListener("storage", u, !1), {
                select: function(t, r) {
                    return Date.now() - n.checkTime > 1e3 && (n.db = s(e)),
                        function(e, t, n) {
                            return t === i ? e[t] || [] : t === a ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
                        }(n.db, t, r)
                },
                selectByKey: function(t) {
                    return Date.now() - n.checkTime > 1e3 && (n.db = s(e)), n.db[t]
                },
                update: function(o, s) {
                    var u = function(e, t, n) {
                        switch (e[t] || (e[t] = {}), t) {
                            case i:
                                var o = n;
                                o && o.length > 0 ? e[t] = o : delete e[t];
                                break;
                            case a:
                                var s = r(n, 2),
                                    c = s[0],
                                    u = s[1];
                                u ? e[t][c] = +u : delete e[t][c]
                        }
                        return e
                    }(n.db, o, s);
                    return n.db = u, n.checkTime = Date.now(), c(e, u, t)
                },
                updateByKey: function(r, i) {
                    return n.db[r] = i, n.checkTime = Date.now(), c(e, n.db, t)
                },
                unmount: function() {
                    window.removeEventListener("storage", u, !1)
                }
            }
        }
    },
    vT4u: function(e, t, n) {
        "use strict";
        n.d(t, "e", function() {
            return w
        }), n.d(t, "b", function() {
            return k
        }), n.d(t, "d", function() {
            return E
        }), n.d(t, "c", function() {
            return x
        }), n.d(t, "a", function() {
            return N
        }), n.d(t, "Ja", function() {
            return D
        }), n.d(t, "bc", function() {
            return L
        }), n.d(t, "oc", function() {
            return S
        }), n.d(t, "Sa", function() {
            return A
        }), n.d(t, "vb", function() {
            return R
        }), n.d(t, "jb", function() {
            return W
        }), n.d(t, "Jb", function() {
            return K
        }), n.d(t, "Kb", function() {
            return H
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
            return X
        }), n.d(t, "Na", function() {
            return Z
        }), n.d(t, "Oa", function() {
            return $
        }), n.d(t, "Xb", function() {
            return ee
        }), n.d(t, "qb", function() {
            return te
        }), n.d(t, "Ec", function() {
            return ae
        }), n.d(t, "F", function() {
            return oe
        }), n.d(t, "h", function() {
            return ce
        }), n.d(t, "Wa", function() {
            return de
        }), n.d(t, "Xa", function() {
            return _e
        }), n.d(t, "T", function() {
            return le
        }), n.d(t, "eb", function() {
            return fe
        }), n.d(t, "Ya", function() {
            return he
        }), n.d(t, "zc", function() {
            return pe
        }), n.d(t, "Pb", function() {
            return me
        }), n.d(t, "Gc", function() {
            return be
        }), n.d(t, "Lb", function() {
            return ye
        }), n.d(t, "D", function() {
            return Oe
        }), n.d(t, "C", function() {
            return Ce
        }), n.d(t, "j", function() {
            return we
        }), n.d(t, "t", function() {
            return ke
        }), n.d(t, "E", function() {
            return Ee
        }), n.d(t, "pb", function() {
            return xe
        }), n.d(t, "Pa", function() {
            return je
        }), n.d(t, "g", function() {
            return Te
        }), n.d(t, "Sb", function() {
            return Pe
        }), n.d(t, "Vb", function() {
            return Me
        }), n.d(t, "Rb", function() {
            return Ne
        }), n.d(t, "Cb", function() {
            return De
        }), n.d(t, "Db", function() {
            return Ie
        }), n.d(t, "Ua", function() {
            return Be
        }), n.d(t, "Ib", function() {
            return Le
        }), n.d(t, "Eb", function() {
            return Se
        }), n.d(t, "Fb", function() {
            return Ae
        }), n.d(t, "bb", function() {
            return Re
        }), n.d(t, "Ia", function() {
            return We
        }), n.d(t, "Gb", function() {
            return Ue
        }), n.d(t, "X", function() {
            return Ke
        }), n.d(t, "Y", function() {
            return qe
        }), n.d(t, "m", function() {
            return He
        }), n.d(t, "v", function() {
            return ze
        }), n.d(t, "Hb", function() {
            return Ge
        }), n.d(t, "Ka", function() {
            return Qe
        }), n.d(t, "Ea", function() {
            return Je
        }), n.d(t, "nb", function() {
            return Ye
        }), n.d(t, "mb", function() {
            return Xe
        }), n.d(t, "lb", function() {
            return Ze
        }), n.d(t, "ob", function() {
            return $e
        }), n.d(t, "wb", function() {
            return et
        }), n.d(t, "xb", function() {
            return tt
        }), n.d(t, "f", function() {
            return rt
        }), n.d(t, "gb", function() {
            return it
        }), n.d(t, "Nb", function() {
            return at
        }), n.d(t, "Mb", function() {
            return ot
        }), n.d(t, "K", function() {
            return st
        }), n.d(t, "cb", function() {
            return ct
        }), n.d(t, "B", function() {
            return ut
        }), n.d(t, "I", function() {
            return dt
        }), n.d(t, "qc", function() {
            return _t
        }), n.d(t, "Ga", function() {
            return lt
        }), n.d(t, "i", function() {
            return ft
        }), n.d(t, "Ha", function() {
            return ht
        }), n.d(t, "s", function() {
            return pt
        }), n.d(t, "Ra", function() {
            return mt
        }), n.d(t, "pc", function() {
            return bt
        }), n.d(t, "Ca", function() {
            return vt
        }), n.d(t, "zb", function() {
            return yt
        }), n.d(t, "kc", function() {
            return Ot
        }), n.d(t, "Yb", function() {
            return Ct
        }), n.d(t, "Ub", function() {
            return wt
        }), n.d(t, "G", function() {
            return kt
        }), n.d(t, "sc", function() {
            return Et
        }), n.d(t, "xc", function() {
            return xt
        }), n.d(t, "Ta", function() {
            return jt
        }), n.d(t, "J", function() {
            return Tt
        }), n.d(t, "Qb", function() {
            return Pt
        }), n.d(t, "P", function() {
            return Mt
        }), n.d(t, "db", function() {
            return Nt
        }), n.d(t, "w", function() {
            return Dt
        }), n.d(t, "yb", function() {
            return It
        }), n.d(t, "lc", function() {
            return Bt
        }), n.d(t, "Tb", function() {
            return Ft
        }), n.d(t, "V", function() {
            return Lt
        }), n.d(t, "Dc", function() {
            return St
        }), n.d(t, "q", function() {
            return At
        }), n.d(t, "rc", function() {
            return Rt
        }), n.d(t, "Ab", function() {
            return Wt
        }), n.d(t, "H", function() {
            return Ut
        }), n.d(t, "o", function() {
            return Kt
        }), n.d(t, "uc", function() {
            return Ht
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
            return Yt
        }), n.d(t, "ub", function() {
            return Xt
        }), n.d(t, "ac", function() {
            return Zt
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
            return an
        }), n.d(t, "wc", function() {
            return on
        }), n.d(t, "l", function() {
            return sn
        }), n.d(t, "Zb", function() {
            return cn
        }), n.d(t, "hc", function() {
            return un
        }), n.d(t, "Ac", function() {
            return dn
        }), n.d(t, "U", function() {
            return _n
        }), n.d(t, "Z", function() {
            return ln
        }), n.d(t, "M", function() {
            return fn
        }), n.d(t, "rb", function() {
            return hn
        }), n.d(t, "Da", function() {
            return pn
        }), n.d(t, "Bb", function() {
            return mn
        }), n.d(t, "sb", function() {
            return bn
        }), n.d(t, "kb", function() {
            return gn
        }), n.d(t, "ab", function() {
            return vn
        }), n.d(t, "nc", function() {
            return yn
        }), n.d(t, "Za", function() {
            return On
        }), n.d(t, "mc", function() {
            return Cn
        }), n.d(t, "Q", function() {
            return wn
        }), n.d(t, "N", function() {
            return kn
        }), n.d(t, "L", function() {
            return xn
        }), n.d(t, "tc", function() {
            return jn
        }), n.d(t, "ib", function() {
            return Tn
        }), n.d(t, "Ba", function() {
            return Pn
        }), n.d(t, "Aa", function() {
            return Mn
        }), n.d(t, "ec", function() {
            return Nn
        }), n.d(t, "dc", function() {
            return Dn
        }), n.d(t, "r", function() {
            return In
        }), n.d(t, "R", function() {
            return Bn
        }), n.d(t, "Fc", function() {
            return Fn
        }), n.d(t, "S", function() {
            return Ln
        }), n.d(t, "k", function() {
            return Sn
        }), n.d(t, "Fa", function() {
            return An
        }), n.d(t, "Wb", function() {
            return Rn
        }), n.d(t, "z", function() {
            return Wn
        }), n.d(t, "jc", function() {
            return Un
        }), n.d(t, "La", function() {
            return Kn
        }), n.d(t, "n", function() {
            return qn
        }), n.d(t, "A", function() {
            return Hn
        }), n.d(t, "x", function() {
            return zn
        }), n.d(t, "Cc", function() {
            return Vn
        }), n.d(t, "tb", function() {
            return Gn
        });
        var r = n("BxOC"),
            i = n("nyd8"),
            a = n("f01n"),
            o = n("DM26"),
            s = n("aong"),
            c = n("uytb"),
            u = n("P13b"),
            d = n("h++7"),
            _ = n("rHUl"),
            l = n("MhhX"),
            f = n("86+7"),
            h = n("ERyv"),
            p = n("Wu9C"),
            m = n("lJdi"),
            b = n("O8ze"),
            g = n("zxIV"),
            v = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            },
            y = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function O(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function C(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        var w = "al_im.php",
            k = 5,
            E = "typing",
            x = "audiomessage",
            j = Object(i.a)(),
            T = j.scheduleNav,
            P = j.commitNav,
            M = j.scheduleNavWithTimeOut;
        var N = {
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

        function D(e, t, n) {
            return Object(r.b)(w, {
                act: "a_renew_hash",
                peers: e.join(","),
                gid: t.hidegid ? void 0 : n.gid
            })
        }

        function I(e, t, n) {
            return function(e) {
                return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
            }(e).then(function(r) {
                return r ? t.apply(void 0, C(n)) : function(e) {
                    if (!e.renew_hashes) {
                        var t = e.last_hashes_update || 0;
                        if (Date.now() - t < 1e4) return Promise.resolve();
                        var n = Object.keys(e.tabs).filter(function(t) {
                            return Object(u.Oa)(e, t)
                        });
                        e.renew_hashes = D(n, {}, e).then(function(t) {
                            var r = y(t, 2),
                                i = r[0],
                                a = r[1];
                            return n.forEach(function(t) {
                                e.tabs[t].hash = i[t]
                            }), e.writeHash = a, delete e.renew_hashes, e.last_hashes_update = Date.now(), e
                        })
                    }
                    return e.renew_hashes
                }(e).then(function(e) {
                    return t.apply(void 0, C(n))
                })
            })
        }

        function B(e) {
            return function() {
                var t = arguments,
                    n = t[t.length - 1];
                return e.apply(void 0, C(t)).catch(function(r) {
                    if (r && r.match && r.match(/1001;/)) return I(n, e, t);
                    throw r
                })
            }
        }

        function F(e) {
            return "string" == typeof e ? se("<div>" + e + "</div>") : e
        }

        function L(e) {
            return "string" == typeof e ? e : e.innerHTML
        }

        function S(e, t) {
            return t.block_states = extend(t.block_states, e), Promise.resolve(t)
        }

        function A(e, t, n, i, a) {
            return a.tabHistoryNotChanged = !1, Object(o.d)(r.b, 3, function(e) {
                return e - 1
            })(w, {
                act: "a_start",
                peer: e,
                msgid: n,
                history: t,
                prevpeer: a.prevPeer,
                gid: a.gid,
                block: i
            }).then(function(t) {
                var r = y(t, 5),
                    i = r[0],
                    o = r[1],
                    s = r[2],
                    c = r[3],
                    d = r[4];
                if (o.forEach(function(e) {
                        return Object(f.a)(a, e)
                    }), a.tabs || (a.tabs = {}), a.dialog_tab_cts = d, a.tabs[e] || (a.tabs[e] = Object(u.kb)(a, i)), S(c, a), n) {
                    if (a.tabs[e]) {
                        var _ = a.tabs[e].lastmsg,
                            l = a.tabs[e].lastmsg_meta;
                        extend(a.tabs[e], i), a.tabs[e].lastmsg = _, a.tabs[e].lastmsg_meta = l
                    }
                } else extend(a.tabs[e], i);
                return a.admins = extend(a.admins, s), a.imQueue(e, !1), Fn(), R(e, a)
            }).catch(function(e) {
                return Object(h.a)("loadPeer", e)
            })
        }

        function R(e, t) {
            var n = t.imQueue(e, !1),
                r = t.tabs[e],
                i = n.filter(function(n) {
                    return !Object(_.J)(t, e, n.rid)
                });
            return r.msgs = i.reduce(function(e, t) {
                return e["rid" + t.rid] = t.mess, e
            }, r.msgs), t.imQueueSet(e, i), t.tabs[e].history = Object(u.Hb)(i, t, F(t.tabs[e].history)), Promise.resolve(t)
        }

        function W(e, t, n) {
            var r = n.imQueue(e, !1).filter(function(e) {
                return e.failed && e.mess.messageId !== t
            });
            return n.imQueueSet(e, r), n.tabs[e].history = Object(u.mb)([t], F(n.tabs[e].history)), Promise.resolve(n)
        }

        function U(e, t) {
            return !1 === (t.block_states[e] || {}).free ? Promise.resolve(t) : Object(r.b)(w, {
                act: "a_block",
                peer: e,
                prevPeer: t.prevPeer,
                gid: t.gid
            }).then(function(e) {
                return S(y(e, 1)[0], t)
            })
        }

        function K(e, t) {
            var n = t.peer;
            return Promise.resolve(t).then(function(t) {
                return t.tabHistoryNotChanged = !1, Object(u.Oa)(t, n) && !t.tabs[n].msgid ? (t.gid && U(n, t), Promise.resolve(t).then(G)) : (Object(u.Oa)(t, n) && (t.tabs[n].msgid = !1), A(n, e, !1, !0, t))
            }).then(G).then(q.bind(null, n))
        }

        function q(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return Object(u.bb)(t, e) && (t.tabs[e].last_touched = Date.now()), Object(u.bb)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
        }

        function H(e, t, n) {
            var r = n.msgid,
                i = n.peer;
            return !e && Object(u.Oa)(n, i) && n.tabs[i].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && U(i, n), Promise.resolve(n).then(G).then(q.bind(null, i))) : A(i, !0, r, !0, n).then(G).then(function() {
                return Object(_.t)(n, i).msgid = r, n
            }).then(q.bind(null, i))
        }

        function z(e, t, n, r) {
            if (Lt(r)) throw Object(u.ac)(), new Error("Cant change peer while loading something");
            var i = r.gid ? "gim" + r.gid : "im";
            if (r.prevPeer = r.peer, r.peer = e, r.msgid = t || "", r.currentEntryPoint = n, cur.peer = e, T({
                    sel: e ? Object(u.H)(e) : null,
                    msgid: r.msgid,
                    email: "",
                    0: i
                }), 0 != r.prevPeer && q(r.prevPeer, r, !0), 0 !== e) {
                Object(u.bb)(r, e) && q(e, r, !0), $t(r.tabbedPeers.map(function(e) {
                    return e.peer
                }).indexOf(e) < 0 ? [{
                    peer: e,
                    type: "perm"
                }].concat(r.tabbedPeers) : r.tabbedPeers.map(function(t) {
                    return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
                }), !1, r)
            } else $t(r.tabbedPeers, !1, r);
            return P(), He(r.prevPeer, r)
        }

        function V(e) {
            cur.wallMentions = function() {
                return new Promise(function(t, n) {
                    if (cur.wallMentions = [], !Object(u.Ha)(e.peer) || !Object(u.Oa)(e, e.peer) || Object(u.Pa)(e, e.peer)) return n();
                    var r = e.tabs[e.peer];

                    function i() {
                        var n = [];
                        Object.keys(r.msgs || {}).reverse().forEach(function(e) {
                            var t = Object(_.P)(r.msgs[e]),
                                i = t && t.userId;
                            i && i != vk.id && -1 === n.indexOf(i) && Object(u.eb)(r, i) && n.push(i)
                        }), (r.memberIds || []).forEach(function(e) {
                            -1 === n.indexOf(e) && n.push(e)
                        });
                        var i = [];
                        n.forEach(function(t) {
                            if (Object(f.b)(e, t)) {
                                var n = Object(f.c)(e, t),
                                    r = n.link.substring(1);
                                i.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                            }
                        }), t(i)
                    }
                    r.membersLoaded ? i() : En(e.peer, e).then(i)
                })
            }
        }

        function G(e) {
            var t = e.peer;
            if (0 === t) return Promise.resolve(e);
            var n = e.tabs[t],
                r = [],
                i = Object(u.Ha)(t) && (n.data.closed || n.data.kicked),
                a = Object(u.Pa)(e, t);
            n.offset && r.push("photos"), n.offset && r.push("search"), (t < -2e9 || n.offset) && !a && r.push("clear"), Object(u.Ja)(e) && !a && r.push("block"), a && !i && r.push("settings"), Object(u.Ka)(t) && (n.blocked_community ? r.push("allow_community") : r.push("block_community")), (Object(u.Ha)(t) || Object(u.fb)(t) || Object(u.Ka)(t)) && !Object(u.Ja)(e) && (Object(u.Ha)(t) && (n.data.kicked || n.data.closed) || (inArray(t, e.mutedPeers) ? r.push("unmute") : r.push("mute"))), Object(u.fb)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), Object(u.Ha)(t) && !i && (Object(m.h)(e) && r.push("invite"), e.gid || r.push("leave")), Object(u.Ha)(t) && n.data.closed && !n.data.kicked && r.push("return"), Object(u.Ha)(t) && n.pinned && (r.push(Object(p.a)(e, t) ? "pin_hide" : "pin_unhide"), Object(m.j)(e) && r.push("unpin"));
            var o = Object(u.D)(e, a);
            return e.curActions = r.sort(function(e, t) {
                return N[e] - N[t]
            }).reduce(function(e, t) {
                return e[t] = o[t], e
            }, {}), Promise.resolve(e)
        }

        function Q(e, t, n) {
            var i = n.tabs[n.peer];
            return Object(r.b)(w, {
                peer: n.peer,
                whole: e,
                act: "a_history",
                offset: i.offset + (i.skipped || 0),
                toend: t,
                gid: n.gid
            }).then(function(e) {
                var t = y(e, 4),
                    r = t[0],
                    a = t[1],
                    o = t[2],
                    s = t[3];
                return i.allShown = o, n.admins = extend(n.admins, s), i.history = r + L(i.history), i.historyToAppend = r, i.offset += Object.keys(a).length, i.msgs = extend(i.msgs, a), n
            })
        }

        function J(e) {
            var t = e.tabs[e.peer];
            return Object(r.b)(w, {
                peer: e.peer,
                act: "a_history",
                rev: 1,
                offset: t.skipped,
                gid: e.gid
            }).then(function(n) {
                var r = y(n, 5),
                    i = r[0],
                    a = r[1],
                    o = r[2];
                r[3], r[4];
                t.allShown = t.allShown || o, t.history = L(t.history) + i, t.historyToAppend = i;
                var s = Object.keys(a).length;
                return t.skipped -= s, t.offset += s, t.msgs = extend(t.msgs, a), e
            })
        }

        function Y(e, t, n, r) {
            var i = e.tabs[t];
            return r === a.m && i.out_up_to > n ? e : (r === a.m ? i.out_up_to = n : i.in_up_to = n, e)
        }
        var X = B(function(e, t) {
            if (Object(u.fc)(t.tabs[e])) return Promise.resolve(t);
            var n = t.tabs[e],
                i = n.msgs || {},
                o = Object.keys(i).map(function(n) {
                    return Object(_.m)(t, e, n)
                }).filter(function(e) {
                    return !Object(l.k)(e)
                }).map(function(e) {
                    return e.messageId
                }).sort(function(e, t) {
                    return t - e
                });
            return n.skipped > 0 && (o = o.filter(function(e) {
                return intval(e) <= n.lastmsg - n.skipped
            })), (o = intval(o.shift())) <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([a.Pa([6, e, o])]), Object(r.b)(w, {
                peer: e,
                ids: [o],
                hash: n.hash,
                act: "a_mark_read",
                gid: t.gid
            }).then(function() {
                return Y(t, e, o, a.m)
            }))
        });

        function Z(e) {
            return Object(r.b)(w, {
                act: "a_get_key",
                uid: e.id,
                gid: e.gid
            }).then(function(t) {
                var n = y(t, 3),
                    r = n[0],
                    i = n[1],
                    a = n[2];
                return extend({}, e, {
                    imKey: r,
                    imUrl: i,
                    imPart: a
                })
            })
        }

        function $(e) {
            return Object(r.b)(w, {
                act: "a_get_ts",
                gid: e.gid
            }).then(function(t) {
                var n = y(t, 1)[0];
                return extend({}, e, {
                    imTs: n
                })
            })
        }

        function ee(e, t, n) {
            var r = n.tabs[e];
            return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = Object(u.Kb)(e, t, F(r.history))), Promise.resolve(n)
        }

        function te(e, t, n, r) {
            var i = r.tabs[e];
            return i.msgs[t] && (i.msgs[t].errored = 0, i.lastmsg_meta = n, i.lastmsg = t, i.history = Object(u.dc)(e, t, F(i.history))), Promise.resolve(r)
        }

        function ne(e, t, n, r) {
            var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, a) {
                return !n && !Ut(a)(t) || i && !i(a, e[a], t) || (e[a] = Object(s.a)(r(e[a], a))), e
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

        function ie(e, t, n) {
            return Object(u.Za)(n) ? t.concat([e]) : [e].concat(t)
        }

        function ae(e, t) {
            var n = e.get().peer,
                r = Object(_.t)(e, n);
            if (Object(u.Oa)(e, n)) {
                var i = F(r.history);
                r.history = Object(u.jc)(e, i, t)
            }
        }

        function oe(e, t) {
            var n = Object(_.t)(t, e.peerId);
            if (Object(u.Oa)(t, e.peerId)) {
                var r = F(n.history);
                n.msgs[e.messageId] = extend(!0, {}, e), n.history = Object(u.J)(t, e, r)
            }
            n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
            var i = n && n.pinned && Object(_.P)(n.pinned);
            return i && i.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
        }

        function ce(e, t) {
            var n = e.flags & a.m,
                r = e.peerId;
            if (Object(u.bb)(t, r)) {
                var i = t.tabs[r];
                if (i.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = O({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? i.unread = 0 : (i.lastmsg == e.messageId && i.unread ? ue(t, 1, e.peerId) : (!i.unread && ue(t, 1, e.peerId), i.unread++), re(e.peerId, t)), Object(u.Oa)(t, r)) {
                    var o = F(i.history);
                    i.skipped > 0 && i.skipped++, i.offset++, i.msgs[e.messageId] = extend(!0, {}, e), i.history = Object(u.x)(t, e, o, !0, !0, !0), Object(l.k)(e) && (i.blocked_community = 0, G(t))
                }
                if (i.typing) {
                    var s = i.typing.userIds.indexOf(e.userId);
                    s >= 0 && i.typing.userIds.splice(s, 1)
                }
                return i.lastmsg = e.messageId, i.lastmsg_meta = e, q(e.peerId, t), ne(t, i, !1, ie.bind(null, r), qt.bind(null, t)), Promise.resolve(t)
            }
            return A(r, 0, 0, 0, t).then(function(t) {
                return ne(t, t.tabs[r], !1, ie.bind(null, r), qt.bind(null, t)), q(e.peerId, t), n || re(e.peerId, t), t
            })
        }

        function ue(e, t, n) {
            e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
        }

        function de(e, t) {
            if (Object(u.Oa)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = n.unread;
                if (t = Y(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : Object(_.b)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && ue(t, -1, e.peerId), !n.skipped) {
                    var i = F(n.history);
                    n.history = Object(u.pb)(t, i, e.peerId)
                }
            } else Object(u.bb)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && ue(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
            return Object(u.bb)(t, e.peerId) && (t.dialog_tabs[d.m] = t.dialog_tabs[d.m].filter(function(t) {
                return intval(t) !== e.peerId
            })), 0 !== t.unread_cnt || t.active_tab !== d.m || t.gid ? Promise.resolve(t) : Kt(d.h, t)
        }

        function _e(e, t) {
            var n = t.tabs[e.peerId];
            if (Object(u.bb)(t, e.peerId) && Y(t, e.peerId, e.upToId, a.m), Object(u.Oa)(t, e.peerId)) {
                var r = F(n.history);
                n.history = Object(u.jb)(t, e.peerId, r)
            }
            return Promise.resolve(t)
        }

        function le(e, t, n, r, i) {
            return i.text = {}, i.imQueue = e, i.imQueueResend = t, i.imQueueSet = n, i.imQueueComplete = r, Promise.resolve(i)
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
                var i = e[0],
                    a = Object(_.m)(n, t, i),
                    o = Object(_.d)(n, t, i);
                return !1 === o ? n.set(ht.bind(null, O({}, t, [a.userId]))).then(function(n) {
                    var o = Object(_.d)(n, t, i);
                    return {
                        msgIds: e,
                        object: r(a, o)
                    }
                }) : Promise.resolve({
                    msgIds: e,
                    object: r(a, o)
                })
            }
            return Promise.resolve({
                msgIds: e
            })
        }

        function he(e, t) {
            Object(u.lb)(t, e);
            var n = t.tabs[t.peer];
            return t.tabs = Object.keys(e).reduce(function(n, r) {
                var i = t.tabs[r] ? t.tabs[r].msgs : {},
                    a = extend({}, i || {}, e[r].msgs || {});
                return n[r] = extend(t.tabs[r] || {}, e[r]), a && (n[r].msgs = a), e[r].lastmsg || (n[r].lastmsg = !1), n
            }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
        }

        function pe(e, t, n, r) {
            var i = Object(_.t)(r, e);
            if (i) {
                var a = !1 !== t ? mobPlatforms[t] ? 1 : 0 : i.last_seen[2];
                i.online = t, i.last_seen = [t, n || i.last_seen[1], a]
            }
            return Promise.resolve(r)
        }

        function me(e, t, n) {
            var r = Object(_.t)(n, e.peerId);
            return r && (e.ts = Date.now() / 1e3, r.activity || (r.activity = {}), r.activity[t] = e, r.typing === E && (r.typing = e)), Promise.resolve(n)
        }

        function be(e, t, n) {
            var r = e.peerId;
            return Object(o.c)(k + 2).then(function() {
                if (Object(u.bb)(n, r)) {
                    var e = n.tabs[r];
                    if ((e.activity || {})[t]) Date.now() - 1e3 * e.activity[t].ts >= 1e3 * k && (delete e.activity[t], 0 === Object.keys(e.activity) && delete e.activity);
                    if (e.typing) Date.now() - 1e3 * e.typing.ts >= 1e3 * k && (e.typing = void 0)
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
                var r = y(n, 3)[2];
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
        var ye = function(e, t, n, i) {
                var a = Date.now() + rand(0, 100).toFixed(0),
                    o = i.ref_id,
                    s = i.ref_source;
                i.ref_source = void 0, i.ref_id = void 0, (s || o) && (T({
                    ref_source: null,
                    ref: null
                }), P()), Object(b.i)(i);
                var c = t.attaches.length > 0,
                    u = Object(b.k)(i, "send", "server", c),
                    d = Object.assign({
                        act: "a_send",
                        to: e,
                        hash: n.hash,
                        ref_source: s,
                        ref: o,
                        msg: t.message,
                        payload: t.payload,
                        media: ve(t.attaches),
                        guid: a,
                        share_url: t.share_url,
                        cancelled_shares: t.cancelled_shares,
                        random_id: t.rid,
                        gid: n.hidegid ? void 0 : i.gid,
                        entrypoint: i.currentEntryPoint || "",
                        sticker_referrer: t.sticker_referrer
                    }, n.external, ge(t.attaches));
                return Object(r.b)(w, d, 2e4).then(function(e) {
                    var t = y(e, 1)[0];
                    return u(), i.version !== t.version && nav.reload({
                        force: !0
                    }), i.currentEntryPoint = "", i
                }).catch(function(e) {
                    throw Object(b.h)(i, e, "send", "server_send"), e
                })
            },
            Oe = B(function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = arguments[3],
                    i = r.tabs[e];
                return ye(e, t, v({
                    hash: i.hash
                }, n), r)
            }),
            Ce = B(function(e, t, n) {
                var i = t.attaches.length > 0,
                    a = Object(b.k)(n, "edit", "server", i);
                return Object(r.b)(w, Object.assign({
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
                    y(e, 1)[0];
                    return a(), n
                }).catch(function(e) {
                    throw Object(b.h)(n, e, "edit", "server_send"), e
                })
            });

        function we(e, t) {
            if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
                return t !== e[0]
            });
            else {
                var n = t.selectedMessages.concat(e);
                t.selectedMessages = Object(s.a)(n).sort(function(e, t) {
                    return e - t
                })
            }
            return Promise.resolve(t)
        }

        function ke(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function Ee(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function xe(e, t) {
            if (Object(u.Oa)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = t.imQueue(e.peerId).filter(function(t) {
                        return t.failed && t.rid !== e.randomId
                    });
                t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId, n.msgs["rid" + e.randomId] && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = Object(u.Eb)(t, F(n.history), e)
            }
            return Promise.resolve(t)
        }

        function je(e, t) {
            var n = Object(b.k)(t, "unknown", "attach"),
                i = {
                    act: "a_get_media",
                    id: e.messageId,
                    gid: t.gid
                };
            return Object(o.d)(r.b, 3, function(e) {
                return e * e
            })(w, i).then(function(r) {
                return n(), Te(e, r, t)
            }).catch(function(n) {
                return Object(b.h)(t, n, "unknown", "server_load_attach"), Te(e, null, t)
            })
        }

        function Te(e, t, n) {
            var r = n.tabs[e.peerId];
            return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")],
                function(e, t) {
                    var n = t.tabs[e.peerId];
                    return n.history = Object(u.Db)(F(n.history), e, t), Promise.resolve(t)
                }(e, n)
        }

        function Pe(e, t, n) {
            var r = Object(u.I)(t),
                i = n.tabs[e];
            return i.searchDay = r, i.searchOffset = 0, i.searchAllLoaded = !1, Promise.resolve(n)
        }

        function Me(e, t, n) {
            return n.tabs[t].searchText = e, Ve(t, n), n
        }

        function Ne(e, t, n) {
            if (t) {
                var r = n.tabs[t];
                r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
            } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
            return Promise.resolve(n)
        }

        function De(e, t, n, i, a) {
            return Object(r.b)(w, {
                act: "a_hints",
                str: e,
                gid: i.hidegid ? 0 : a.gid,
                query: n,
                peerIds: t.join(",")
            }).then(function(e) {
                var t = y(e, 3),
                    n = t[0],
                    r = t[1];
                return S(t[2], a), r.forEach(function(e) {
                    return Object(f.a)(a, e)
                }), he(n, a), Object.keys(n).sort(function(e, t) {
                    return n[e].order - n[t].order
                }).map(function(e) {
                    return n[e]
                })
            })
        }

        function Ie(e, t, n, r) {
            return De(e, t, n, {}, r).then(function(e) {
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

        function Be(e) {
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

        function Fe(e) {
            return function(t, n) {
                return e(n).then(function(e) {
                    var r = (t ? e.search(t) : e.list).map(Be);
                    return n.mapped_index || (n.mapped_index = {}), r.forEach(function(e) {
                        n.mapped_index[e.peerId] = e
                    }), r
                })
            }
        }
        var Le = Fe(function(e) {
                return e.topConvTree
            }),
            Se = Fe(function(e) {
                return e.imTopConvTree
            }),
            Ae = Fe(function(e) {
                return e.hintsTree
            });

        function Re(e, t) {
            var n = void 0,
                i = void 0,
                a = void 0;
            t.topConvTree = new Promise(function(e) {
                n = e
            }), t.hintsTree = new Promise(function(e) {
                i = e
            }), t.imTopConvTree = new Promise(function(e) {
                a = e
            });
            var s = e.select(c.b);
            return Object(o.d)(r.b, 1, function() {
                return 4
            })(w, {
                act: "a_dialogs_preload",
                rs: s.join(","),
                gid: t.gid
            }).catch(function(e) {
                return [
                    [],
                    [],
                    []
                ]
            }).then(function(e) {
                var r = y(e, 4),
                    o = r[0],
                    s = r[1],
                    c = r[2],
                    u = r[3];
                return t.popular_sugg = c, new vkIndexer(o, function(e) {
                    return e[1]
                }, n), new vkIndexer(s, function(e) {
                    return e[1]
                }, i), u && u.length > 0 ? new vkIndexer(u, function(e) {
                    return e[1]
                }, a) : a(), t
            })
        }

        function We(e) {
            var t = e.active_tab,
                n = void 0;
            return n = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
                return e.tabs[t].lastmsg
            })) : 0, Object(r.b)(w, {
                act: "a_get_dialogs",
                start_message_id: n,
                tab: t,
                gid: e.gid
            }).then(function(n) {
                var r = y(n, 4),
                    i = r[0],
                    a = r[1],
                    o = r[2],
                    s = r[3];
                return o.forEach(function(t) {
                    return Object(f.a)(e, t)
                }), S(s, e), he(a, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(a).map(intval)), e.dialog_tabs_all[t] = !i.has_more, Promise.resolve(e)
            })
        }
        var Ue = B(function(e, t) {
            return Object(r.b)(w, {
                act: "a_search",
                q: e,
                from: "all",
                gid: t.gid,
                hash: t.writeHash,
                offset: t.searchOffset || 0
            }).then(function(n) {
                var r = y(n, 5),
                    i = r[0],
                    a = r[1],
                    o = r[2],
                    s = r[3],
                    c = r[4];
                return a.forEach(function(e) {
                    return Object(f.a)(t, e)
                }), Object(u.lb)(t, i), e === t.searchText && (t.searchOffset = s, t.searchAllLoaded = c), Object.keys(i).filter(function(e) {
                    return !t.tabs[e]
                }).forEach(function(e) {
                    t.tabs[e] = i[e]
                }), [i, o]
            })
        });

        function Ke(e, t) {
            return t.tabs[e].searchAllLoaded
        }

        function qe(e, t) {
            return !(t.peer !== e || !Object(u.Oa)(t, e)) && t.tabs[e].inplaceSearch
        }

        function He(e, t) {
            if (Object(u.Oa)(t, e)) {
                var n = t.tabs[e];
                delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, T({
                    st: ""
                }), P()
            }
            return Promise.resolve(t)
        }

        function ze(e, t) {
            if (Object(u.Oa)(t, e)) {
                var n = t.tabs[e];
                delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
            }
            return Promise.resolve(t)
        }

        function Ve(e, t) {
            return t.tabs[e].inplaceSearch = !0, Promise.resolve(t)
        }
        var Ge = B(function(e, t) {
            var n = t.tabs[e],
                i = "";
            if (Ve(e, t), n.searchDay && (i = "day:" + n.searchDay), !i && !n.searchText) return Promise.reject();
            var a = "in:" + e + " " + i + " " + (n.searchText || "");
            return T({
                st: n.searchText
            }), P(), Object(r.b)(w, {
                act: "a_search",
                q: a,
                from: "in",
                gid: t.gid,
                hash: t.writeHash,
                offset: n.searchOffset || 0
            }).then(function(e) {
                var t = y(e, 3),
                    r = t[0],
                    i = t[1],
                    a = t[2];
                return n.searchOffset = i, n.searchAllLoaded = a, r
            })
        });

        function Qe(e) {
            return Object(r.b)(w, {
                act: "a_important",
                offset: e,
                part: e > 0
            })
        }

        function Je(e, t) {
            var n = Object(_.t)(e, t);
            return Object(r.b)(w, {
                act: "a_load_lastmsg",
                peerId: t,
                gid: e.get().gid
            }).then(function(r) {
                var i = y(r, 2),
                    a = i[0],
                    o = i[1];
                n.lastmsg = a[0] || !1, n.lastmsg_meta = a;
                var s = y(o, 3);
                n.unread = s[0], n.in_up_to = s[1], n.out_up_to = s[2], n.unread || (e.get().dialog_tabs[d.m] = e.get().dialog_tabs[d.m].filter(function(e) {
                    return e != t
                })), ne(e.get(), n, !1, ie.bind(null, t), qt.bind(null, e.get()))
            })
        }

        function Ye(e, t, n) {
            if (Object(u.Oa)(n, t)) {
                var r = n.tabs[t];
                r.deleted = r.deleted ? r.deleted.concat(e) : e
            }
            return Promise.resolve(n)
        }

        function Xe(e, t, n) {
            if (Object(u.Oa)(n, t)) {
                var r = n.tabs[t];
                r.history = Object(u.mb)(e, F(r.history)), r.offset -= e.filter(function(e) {
                    return r.msgs[e]
                }).length, e.forEach(function(e) {
                    return delete r.msgs[e]
                }), e.forEach(function(e) {
                    var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
                })
            }
            return Promise.resolve(n)
        }
        var Ze = B(function(e, t, n, i, a) {
            return Object(r.b)(w, {
                act: "a_mark",
                peer: t,
                hash: n || a.tabs[t].hash,
                gid: a.gid,
                msgs_ids: e.join(","),
                mark: i
            })
        });

        function $e(e, t, n, r) {
            if (Object(u.Oa)(r, t)) {
                var i = r.tabs[t];
                i.deleted = i.deleted ? i.deleted.concat(e) : e, i.history = Object(u.nb)(e, t, n, F(i.history)), i.offset -= e.filter(function(e) {
                    return i.msgs[e]
                }).length
            }
            return Promise.resolve(r)
        }

        function et(e, t, n) {
            if (Object(u.Oa)(n, t)) {
                var r = n.tabs[t];
                r.deleted && (r.deleted = r.deleted.filter(function(t) {
                    return t !== e
                })), r.history = Object(u.Gb)(e, t, F(r.history)), r.offset++
            }
            return Promise.resolve(n)
        }

        function tt(e, t, n, i) {
            return Object(r.b)(w, {
                act: "a_restore",
                id: e,
                peer: t,
                hash: n,
                gid: i
            })
        }
        var nt = B(function(e, t, n) {
                return Object(u.fc)(n.tabs[e]) ? Promise.resolve(n) : (n.tabs[e].lastTyping = Date.now(), Object(r.b)(w, {
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
            rt = B(function(e, t) {
                return Object(r.b)(w, {
                    act: "a_accept_message_request",
                    user_id: e,
                    hash: t.tabs[e].hash
                }).then(function() {
                    t.tabs[e].is_message_request = !1
                }).then(function() {
                    return t
                })
            }),
            it = B(function(e, t) {
                return Object(r.b)(w, {
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
            at = B(function(e, t) {
                return nt(e, E, t)
            }),
            ot = B(function(e, t) {
                return nt(e, x, t)
            });

        function st(e, t, n, r) {
            return t && (r.pendingForward = null, e || (e = {
                msgIds: []
            }), t.addAttach(n ? "reply" : "mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(r)
        }

        function ct(e, t) {
            return t.pendingForward = e, Promise.resolve(t)
        }

        function ut(e, t, n) {
            if (Object(u.bb)(n, e)) {
                n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, ne(n, n.tabs[e], !0, function(t) {
                    return t.filter(function(t) {
                        return t !== e
                    })
                }), n.tabs[e].unread > 0 && ue(n, -1, e);
                var r = n.tabs[e];
                return r.deletedDialog = !0, $t(n.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, n), t.then(function(t) {
                    var i = y(t, 2);
                    i[0], i[1];
                    return delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
                })
            }
        }
        var dt = B(function(e, t) {
                return ut(e, Object(r.b)("al_im.php", {
                    act: "a_flush_history",
                    id: e,
                    from: "im",
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }), t)
            }),
            _t = B(function(e, t, n) {
                return Object(r.b)(w, {
                    act: "a_set_chat_title",
                    peer: e,
                    new_title: t,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(function() {
                    return n
                })
            }),
            lt = B(function(e, t) {
                return Object(r.b)(w, {
                    act: "a_load_chat_info",
                    peer: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(n) {
                    var r = y(n, 1)[0];
                    return t.tabs[e] = extend(t.tabs[e], r), t
                })
            });
        var ft = B(function(e, t, n) {
            return Object(r.b)(w, {
                act: "a_add_chat_members",
                peer: e,
                new_peer: t.join(","),
                gid: n.gid,
                hash: n.tabs[e].hash
            }).then(function(e) {
                return n
            })
        });

        function ht(e, t) {
            if (isEmpty(e)) return Promise.resolve(t);
            var n = Object.keys(e).map(function(t) {
                return t + ":" + e[t].join(",")
            }).join(";");
            return Object(r.b)(w, {
                act: "a_load_member",
                need: n
            }).then(function(e) {
                return y(e, 1)[0].forEach(function(e) {
                    return Object(f.a)(t, e)
                }), t
            })
        }

        function pt(e, t, n) {
            var r = {},
                i = n.get();

            function o(e, t) {
                Object(u.Ha)(e) && t && !Object(f.b)(i, t) && (r[e] ? -1 === r[e].indexOf(t) && r[e].push(t) : r[e] = [t])
            }
            var s = t.filter(function(e) {
                return !Object(u.bb)(i, e.peerId)
            }).map(function(e) {
                return e.peerId
            });
            t.forEach(function(e) {
                o(e.peerId, e.userId)
            }), e.forEach(function(e) {
                o(e.peerId, +e.kludges.source_mid)
            });
            var c = t.filter(function(e) {
                return e.flags & a.m && !e.local
            }).map(function(e) {
                return e.kludges.from_admin
            }).filter(function(e) {
                return e && !i.admins[e]
            });
            return 0 === Object.keys(r).length && 0 === c.length && 0 === s.length ? Promise.resolve(i) : {
                shouldLoad: Object.keys(r).length > 0 || c.length > 0 || s.length > 0,
                needMembers: r,
                needAdminIds: c,
                needPeers: s
            }
        }

        function mt(e, t, n) {
            var i = e.needMembers,
                a = e.needAdminIds,
                o = e.needPeers;
            return t.pause(), Promise.all([ht(i, n), function(e, t) {
                return 0 === e.length ? Promise.resolve(t) : Object(r.b)(w, {
                    act: "a_get_admin",
                    admins: e.join(","),
                    gid: t.gid
                }).then(function(e) {
                    var n = y(e, 1)[0];
                    return t.admins = extend(t.admins, n), t
                })
            }(a, n), Promise.all(o.map(function(e) {
                return A(e, 0, 0, 0, n)
            }))]).catch(function() {
                return n
            }).then(function() {
                return t.resume()
            }).then(function() {
                return n
            })
        }
        var bt = B(function(e, t) {
            return e.kludges.source_act === u.d ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : Object(r.b)(w, {
                act: "a_get_chat_photo",
                msg_id: e.messageId
            }).then(function(n) {
                var r = y(n, 2),
                    i = r[0],
                    a = r[1];
                t.chat_photo_msg = a;
                var o = t.tabs[e.peerId];
                if (t.tabs[e.peerId].photo = i[0], t.tabs[e.peerId].photoLarge = i[1], Object(u.Oa)(t, e.peerId)) {
                    var s = e.kludges.source_act;
                    o.history = Object(u.w)(e, s, t, F(o.history))
                }
                return t
            })
        });

        function gt(e, t, n, r) {
            return t !== vk.id ? Promise.resolve(r) : (Object(u.bb)(r, n) && r.peer == n && (r = G(r)), Promise.resolve(r))
        }
        var vt = B(function(e, t) {
                return Object(r.b)(w, {
                    act: "a_leave_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(gt.bind(null, u.c, vk.id, e, t))
            }),
            yt = B(function(e, t) {
                return Object(r.b)(w, {
                    act: "a_return_to_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(gt.bind(null, u.b, vk.id, e, t))
            }),
            Ot = B(function(e, t, n) {
                return Object(r.b)(w, {
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
                }).then(Ct.bind(null, e, t))
            });

        function Ct(e, t, n) {
            var r = n.mutedPeers.filter(function(t) {
                return t !== e
            });
            return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, G(n)
        }

        function wt(e, t) {
            return t.stack = e, Promise.resolve(t)
        }
        var kt = B(function(e, t, n, i) {
            return Et(e, n, t, i), Object(r.b)(w, {
                act: "a_mark_important",
                ids: e,
                val: t ? 1 : 0,
                from: "im",
                gid: i.gid,
                peer: n,
                hash: i.tabs[n].hash
            }).then(function() {
                return i
            })
        });

        function Et(e, t, n, r) {
            if (Object(u.Oa)(r, t)) {
                var i = r.tabs[t];
                e.filter(function(e) {
                    return i.msgs[e]
                }).forEach(function(e) {
                    var o = Object(_.m)(r, t, e),
                        s = n ? o.flags | a.l : o.flags & ~a.l;
                    o.flags = s, i.msgs[e] = o, i.history = Object(u.kc)(e, n, F(i.history))
                })
            }
            return Promise.resolve(r)
        }

        function xt(e, t, n) {
            return n.importants || (n.importants = {}), (n.importants[t] || 0) !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
        }

        function jt(e, t) {
            return Object(r.b)(w, {
                act: "a_spam",
                offset: e,
                gid: t,
                part: e > 0
            })
        }

        function Tt(e, t) {
            return Object(r.b)(w, {
                act: "a_flush_spam",
                gid: t,
                hash: e
            })
        }

        function Pt(e, t, n) {
            return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
        }

        function Mt(e, t) {
            return Object(r.b)(w, {
                act: "a_owner_photo",
                photo: JSON.parse(e).data[0],
                peer: t
            })
        }

        function Nt(e, t) {
            return t.next_chat_avatar = e, Promise.resolve(t)
        }
        var Dt = B(function(e, t, n, i) {
            return i.creating = !0, i.longpoll.pause(), Object(r.b)(w, {
                act: "a_multi_start",
                hash: i.writeHash,
                peers: t.join(","),
                title: n
            }).then(function(e) {
                var t = y(e, 1)[0];
                return i.next_peer = t.peerId, i.tabs[t.peerId] = t, ne(i, t, !1, function(e) {
                    return [t.peerId].concat(e)
                }), i.longpoll.resume(), i
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
                throw i.creating = !1, i.longpoll.resume(), e
            })
        });

        function It(e) {
            var t = void 0;
            e.resync_in_process = new Promise(function(e) {
                t = e
            });
            var n = Object.keys(e.tabs).length,
                i = e.active_tab;
            return Object(r.b)(w, {
                act: "a_resync",
                sel: e.peer,
                gid: e.gid,
                loaded: n,
                tab: i,
                add_peers: e.tabbedPeers.map(function(e) {
                    return e.peer
                }).join(",")
            }).then(function(n) {
                var r = y(n, 5),
                    a = r[0],
                    o = r[1],
                    c = r[2],
                    _ = r[3],
                    l = r[4];
                o.forEach(function(t) {
                    return Object(f.a)(e, t)
                }), Object(u.lb)(e, a), c.user_unread && handlePageCount("msg", c.user_unread), Object(s.i)("Resync success", "success");
                var h = e.peer,
                    p = void 0;
                if (Object(u.Ya)(h)) p = Promise.resolve(!1);
                else {
                    var m = {
                        tabs: O({}, h, e.tabs[h]),
                        oCache: {}
                    };
                    p = he(O({}, h, a[h]), m)
                }
                return p.then(function(n) {
                    e.tabs = a, e.admins = extend(e.admins, _), n && (e.tabs[h] = n.tabs[h], e.tabs[h].history = Object(u.Hb)(h, e, F(e.tabs[h].history))), e.loadingDialogs = !1, e.mutedPeers = c.mutedPeers, e.lastDialogsOptions = {
                        has_more: c.has_more
                    }, e.dialog_tab_cts = c.folder_cts, e.dialog_tabs[i] = l.map(intval);
                    var r = e.dialog_tabs[i].map(function(t) {
                        return e.tabs[t]
                    });
                    return Object.keys(e.dialog_tabs).filter(function(e) {
                        return e != i
                    }).forEach(function(t) {
                        i == d.h ? e.dialog_tabs[t] = r.filter(Ut(t)).map(function(e) {
                            return e.peerId
                        }) : e.dialog_tabs[t] = []
                    }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), St(intval(c.unread), e)
                })
            }).catch(function(t) {
                return Object(s.i)("Resync error: " + t.message + " " + t.stack, "error"), Object(o.c)(2).then(It.bind(null, e))
            })
        }

        function Bt(e, t) {
            return t.lockedSending = e, Promise.resolve(t)
        }

        function Ft(e, t, n) {
            return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
        }

        function Lt(e) {
            return !!e.textMediaSelector.urlAttachmentLoading || !!(window.Upload && Upload.options && Upload.isSomethingUploading) && Object.keys(Upload.options).filter(function(e) {
                return Upload.isSomethingUploading(e)
            }).length > 0
        }

        function St(e, t) {
            return t.unread_cnt = e, t.dialog_tab_cts[d.m] = e, Promise.resolve(t)
        }

        function At(e, t) {
            return t.ctrl_submit = !!e, Object(r.b)(w, {
                act: "a_save_ctrl_submit",
                to: t.peer,
                hash: t.tabs[t.peer].hash,
                value: e ? 1 : 0
            }).then(function(e) {
                return t
            })
        }

        function Rt(e, t, n) {
            n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
            var r = document.title,
                i = window.devicePixelRatio >= 2 ? "_2x" : "";
            if (t && !n.update_title_to) {
                var a = function(e, t, n) {
                    return function() {
                        n.update_old_title = e;
                        var r = Object.keys(n.cur_unread_cnt).length;
                        if (0 === r) return Object(g.Oa)(e || document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
                        e ? (Object(g.Oa)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1) : (e = document.title, setFavIcon("/images/icons/favicons/fav_im" + (r > 9 ? 10 : r) + t + ".ico"), Object(g.Oa)(winToUtf(getLang("mail_im_new_messages", r))))
                    }
                }(r, i, n);
                n.update_title_to = setInterval(a, 1e3), a()
            } else !t && n.update_old_title && (Object(g.Oa)(n.update_old_title), n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + i + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
            return Promise.resolve(n)
        }

        function Wt(e, t, n, r, i) {
            return Object(u.Oa)(i, e) && (i.tabs[e].scrollTop = intval(t), i.tabs[e].scrollBottom = intval(n), i.tabs[e].contHeight = intval(r)), Promise.resolve(i)
        }

        function Ut(e) {
            return e === d.h ? function(e) {
                return !Object(u.fc)(e)
            } : e === d.m ? function(e) {
                return e.unread > 0
            } : function(t) {
                return t.folders & d.j[e]
            }
        }

        function Kt(e, t) {
            t.active_tab = e, Object(i.b)({
                tab: e === d.h ? null : e
            });
            var n = [];
            if (e !== d.h && !Object(u.Za)(t)) {
                var r = t.dialog_tabs[e];
                n = t.dialog_tabs[d.h].map(function(e) {
                    return t.tabs[e]
                }).filter(Ut(e)).map(function(e) {
                    return e.peerId
                }), t.dialog_tabs[e] = r.length >= n.length ? r : n
            }
            return Promise.resolve(t)
        }

        function qt(e, t, n, r) {
            var i = e.dialog_tabs_all;
            return !(!i[d.h] && !i[t]) || (n.filter(function(e) {
                return e === r.peerId
            }).length > 0 || ("r" === r.lastmsg[0] || n.map(function(t) {
                return e.tabs[t.toString()]
            }).filter(function(t) {
                return Object(u.Za)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
            }).length > 0))
        }

        function Ht(e, t, n, r, i) {
            if (Object(u.bb)(i, e)) {
                var o = i.tabs[e];
                return n === a.L && (t ^= o.folders),
                    function(e, t, n) {
                        return !(e === a.T && n.folders & t || !(e !== a.P || n.folders & t))
                    }(n, t, o) && Object.keys(d.j).filter(function(e) {
                        return d.j[e] & t
                    }).forEach(function(e) {
                        i.dialog_tab_cts[e] += function(e, t, n) {
                            return t !== a.P || e.folders & d.j[n] ? t === a.L ? e.folders & d.j[n] ? -1 : 1 : t === a.T ? 1 : -1 : 0
                        }(o, n, e)
                    }), n === a.T ? i.tabs[e].folders |= t : n === a.P ? i.tabs[e].folders &= ~t : i.tabs[e].folders = t ^= o.folders, ne(i, i.tabs[e], !0, function(t, n) {
                        return t.concat([e]).map(function(e) {
                            return i.tabs[e]
                        }).filter(Ut(n)).map(function(e) {
                            return e.peerId
                        })
                    }, qt.bind(null, i)), Promise.resolve(i)
            }
            return A(e, 0, 0, 0, i).then(Ht.bind(null, e, t, n, i))
        }
        var zt = B(function(e, t) {
                var n = d.j[d.i],
                    i = t.tabs[e].folders & n,
                    o = i ? a.Ya : a.cb;
                return t.longpoll.push([o([0, e, n, !0])]), Object(r.b)(w, {
                    act: "a_dialog_star",
                    val: i ? 0 : 1,
                    peer: e,
                    hash: t.tabs[e].hash,
                    gid: t.gid
                }).then(function() {
                    return t
                })
            }),
            Vt = B(function(e, t, n) {
                var i = d.j[d.n];
                return n.longpoll.push([a.Ya([0, e, i, !0]), a.Pa([6, e, t])]), Object(r.b)(w, {
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
            return Object(r.b)(w, {
                act: "a_get_mutex_key",
                gid: e
            })
        }

        function Qt(e, t) {
            return S(O({}, e, {
                free: !0
            }), t), Object(r.b)(w, {
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
        var Yt = B(function(e, t) {
            return ne(t, t.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), t.tabs[e].deletedDialog = !0, Object(r.b)(w, {
                act: "a_delete_dialog",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(n) {
                return n[0] ? ($t(t.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, ne(t, t.tabs[e], !1, ie.bind(null, e), qt.bind(null, t))), n
            })
        });

        function Xt(e, t, n, i) {
            return Object(r.b)(w, {
                act: "a_restore_dialog",
                hash: t,
                gid: i.gid,
                spam: n ? 1 : 0,
                peer: e
            }).then(function(t) {
                return i.tabs[e].deletedDialog = !1, ne(i, i.tabs[e], !1, function(t) {
                    return [e].concat(t)
                }), i.tabs[e].unread = t, i
            })
        }

        function Zt(e, t, n) {
            return Object(r.b)(w, {
                act: "a_spam_dialog",
                peer: e,
                gid: n.gid,
                hash: t
            })
        }

        function $t(e, t, n) {
            return n.tabbedPeers = e, Object(u.Ia)(n) && (T({
                peers: n.tabbedPeers.filter(function(e) {
                    var t = e.peer,
                        r = e.type;
                    return t !== n.peer && "perm" === r
                }).map(function(e) {
                    return Object(u.R)(e.peer, n)
                }).filter(function(e) {
                    return !e.deletedDialog
                }).map(function(e) {
                    return e.peerId
                }).map(u.H).join("_")
            }), t && P()), Promise.resolve(n)
        }

        function en(e) {
            return !e.peer || (qe(e.peer, e) ? Ke(e.peer, e) : !!Object(u.Oa)(e, e.peer) && e.tabs[e.peer].allShown)
        }

        function tn(e, t) {
            var n = t.tabs[e];
            return Object(u.Oa)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
        }

        function nn(e, t) {
            var n = t.tabs[e];
            return Object(u.Oa)(t, e) && (n.history = L(n.history)), Promise.resolve(t)
        }

        function rn(e, t) {
            return t.go_to_end_visible = e, Promise.resolve(t)
        }

        function an(e, t, n) {
            if (!Object(u.Ka)(t)) return Promise.resolve(n);
            var i = Object(_.t)(n, t);
            return i.blocked_community = !e, Object(r.b)(w, {
                act: "a_toggle_community",
                peer_id: t,
                hash: i.hash,
                state: e ? 1 : 0
            }).then(function() {
                return G(n)
            })
        }

        function on(e, t) {
            if (0 !== t.peer && Object(u.Oa)(t, t.peer)) {
                var n = Object(_.t)(t, t.peer);
                n.history = F(n.history), e(n.history)
            }
            return Promise.resolve(t)
        }

        function sn(e) {
            return e.audio_msg.isRecording = !1, Promise.resolve(e)
        }

        function cn(e, t) {
            return t.voice_message_available = e, Promise.resolve(t)
        }

        function un(e) {
            T({
                act: e ? "create" : null
            }), P()
        }

        function dn() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            T({
                q: e
            }), P()
        }

        function _n(e) {
            return void 0 === e.chatResizeInitialized && (e.chatResizeInitialized = !0, Object(u.U)() > window.clientHeight() && Object(u.Jb)(0)), Promise.resolve(e)
        }
        var ln = B(function(e, t, n) {
            return Object(r.b)(w, {
                act: "a_join_chat",
                chat_id: e,
                hash: t,
                write_hash: n.writeHash
            }).then(function(e) {
                var t = y(e, 4),
                    r = t[0],
                    i = t[1],
                    a = t[2],
                    o = t[3];
                return a.forEach(function(e) {
                    return Object(f.a)(n, e)
                }), n.tabs[r] = i, ne(n, i, !1, ie.bind(null, r), qt.bind(null, n)), n.admins = extend(n.admins, o), [r]
            })
        });

        function fn(e, t) {
            return Object(r.b)(w, {
                act: "a_get_link",
                gid: t.gid,
                chat_id: e
            })
        }
        var hn = B(function(e, t) {
            var n = t.tabs[e];
            return Object(r.b)(w, {
                act: "a_reset_link",
                chat_id: e - 2e9,
                write_hash: t.writeHash
            }).then(function(e) {
                return n.inviteLink = e[0], e
            })
        });

        function pn(e) {
            return M({
                invite_chat_id: null,
                invite_hash: null
            }), e.invitation = void 0, Promise.resolve(e)
        }

        function mn(e, t) {
            var n = Object(s.a)([e].concat(t.select(c.b))).slice(0, 500);
            t.update(c.b, n)
        }

        function bn(e) {
            e.update(c.b, [])
        }

        function gn(e, t) {
            var n = t.select(c.b).filter(function(t) {
                return t !== e
            });
            return t.update(c.b, n), n
        }

        function vn(e, t, n) {
            var r = n.tabs[t],
                i = Object(_.m)(n, t, e);
            return r.data.kicked || r.data.closed || i.kludges.source_act || (r.pinned = i), Promise.resolve(n)
        }

        function yn(e, t) {
            return t.tabs[e].pinned = null, Promise.resolve(t)
        }
        var On = B(function(e, t, n) {
                var i = n.tabs[t];
                return i.data.kicked || i.data.closed ? Promise.resolve(n) : Object(r.b)(w, {
                    act: "a_pin_message",
                    msgid: e,
                    chat: t,
                    gid: n.gid,
                    hash: n.tabs[t].hash
                }).then(function(e) {
                    var r = y(e, 1)[0];
                    return n.tabs[t] = Object.assign({}, i, r), n
                })
            }),
            Cn = B(function(e, t) {
                var n = t.tabs[e];
                return n.data.kicked || n.data.closed ? Promise.resolve(t) : Object(r.b)(w, {
                    act: "a_unpin_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(r) {
                    var i = y(r, 1)[0];
                    return t.tabs[e] = Object.assign({}, n, i), t
                })
            }),
            wn = B(function(e, t) {
                var n = t.tabs[e];
                return Object(r.b)(w, {
                    act: "a_get_pinned_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(e) {
                    var r = y(e, 1)[0];
                    return n.pinned = r || null, t
                })
            }),
            kn = B(function(e, t, n) {
                var i = n.tabs[e];
                return Object(r.b)(w, {
                    act: "a_get_message_local_id",
                    chat: e,
                    chat_local_id: t,
                    hash: i.hash
                })
            }),
            En = B(function(e, t) {
                var n = t.tabs[e];
                return n.membersLoaded ? Promise.resolve(t) : Object(r.b)(w, {
                    act: "a_get_chat_members",
                    chat: e,
                    gid: t.gid,
                    hash: n.hash
                }).then(function(e) {
                    var r = y(e, 1),
                        i = y(r[0], 3),
                        a = i[0],
                        o = i[1],
                        s = i[2];
                    return n.memberIds = a, n.adminIds = o, s.forEach(function(e) {
                        return Object(f.a)(t, e)
                    }), n.membersLoaded = !0, t
                })
            }),
            xn = B(function(e, t) {
                return Promise.all([En(e, t), function(e, t) {
                    var n = t.tabs[e];
                    return Object(r.b)(w, {
                        act: "a_get_chat_details",
                        chat: e,
                        gid: t.gid,
                        hash: n.hash
                    }).then(function(e) {
                        var r = y(e, 1)[0];
                        return n.photoGrid = r.grid, n.photoLarge = r.photo, n.membersLastSeen = r.lastSeen || null, n.inviters = r.inviters, n.caccess = r.caccess, n.invitedByMe = r.invitedByMe || [], n.inviteLink = r.link || null, n.serverSettings = r.serverSettings || null, t
                    })
                }(e, t)]).then(function() {
                    return t
                })
            }),
            jn = B(function(e, t, n) {
                var i = n.tabs[e];
                return Object(r.b)(w, {
                    act: "a_update_flags",
                    chat: e,
                    hash: i.hash,
                    flags: t
                })
            }),
            Tn = B(function(e, t) {
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

        function Pn(e, t, n) {
            var r = n.tabs[e];
            return r.memberIds = r.memberIds.filter(function(e) {
                return e !== t
            }), r.adminIds = r.adminIds.filter(function(e) {
                return e !== t
            }), r.membersCount = r.memberIds.length, Promise.resolve(n)
        }
        var Mn = B(function(e, t, n) {
            var i = n.tabs[e];
            return Object(r.b)(w, {
                act: "a_kick_user",
                chat: e,
                hash: i.hash,
                mid: t
            }).then(function() {
                return i.memberIds = i.memberIds.filter(function(e) {
                    return e !== t
                }), i.adminIds = i.adminIds.filter(function(e) {
                    return e !== t
                }), i.membersCount = i.memberIds.length, n
            })
        });

        function Nn(e, t, n, r) {
            var i = r.tabs[e];
            return i.adminIds = n ? [].concat(i.adminIds, t).filter(function(e, t, n) {
                return n.indexOf(e) === t
            }) : i.adminIds.filter(function(e) {
                return e !== t
            }), Promise.resolve(r)
        }
        var Dn = B(function(e, t, n, i) {
            var a = i.tabs[e];
            return Object(r.b)(w, {
                act: "a_toggle_admin",
                chat: e,
                hash: a.hash,
                mid: t,
                is_admin: +n
            }).then(function() {
                return Nn(e, t, n, i)
            })
        });

        function In(e, t, n, r) {
            var i = Object(_.m)(e, n, t).userId;
            return Object(f.c)(r, i) ? Promise.resolve(r) : ht(O({}, n, [i]), r)
        }

        function Bn() {
            ajax.post("al_im.php", {
                act: "a_hide_promo_tooltip"
            })
        }

        function Fn() {
            cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
        }
        var Ln = B(function(e, t) {
                return t.tabs[e].top_banner = void 0, Object(r.b)(w, {
                    act: "a_hide_banner",
                    peer_id: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function() {
                    return t
                })
            }),
            Sn = B(function(e, t, n) {
                n.tabs[e].top_banner = void 0;
                var i = n.tabs[e];
                return Object(r.b)(w, {
                    act: "a_callback_banner",
                    peer_id: e,
                    callback_data: t,
                    hash: i.hash
                }).then(function() {
                    return n
                })
            });

        function An(e, t) {
            return Object(r.b)(w, {
                act: "a_load_banner",
                peer_id: e,
                gid: t.gid
            }).then(function(n) {
                var r = y(n, 1)[0];
                return t.tabs[e].top_banner = r, t
            })
        }

        function Rn(e, t, n) {
            return n.tabs[e].keyboard = t && t.buttons ? t : null, Un(e, !1, !0, n)
        }

        function Wn(e, t) {
            return Rn(e, null, t)
        }

        function Un(e, t, n, r) {
            return ((r.tabs || {})[e] || {}).keyboard && (r.tabs[e].keyboard.hide = t, n && ls.set("is_keyboards_hide", Object.assign(ls.get("is_keyboards_hide") || {}, O({}, e, t)))), Promise.resolve(r)
        }
        var Kn = B(function(e, t) {
            var n = t.tabs[e];
            return Object(r.b)(w, {
                act: "a_get_keyboard",
                peer_id: e,
                hash: n.hash
            }).then(function(n) {
                var r = y(n, 1)[0];
                return Rn(e, r, t)
            })
        });

        function qn(e, t, n, i) {
            var a = i.tabs[e];
            return a.caccess[t] = n, Object(r.b)(w, {
                act: "a_change_caccess",
                peer_id: e,
                member_id: t,
                hash: a.hash,
                access: n ? 1 : 0
            }).then(function() {
                return i
            }).catch(function(e) {
                throw a.caccess[t] = !n, e
            })
        }
        var Hn = B(function(e, t) {
            var n = t.tabs[t.peer];
            return Object(r.b)(w, {
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
            var i = n.tabs[n.peer];
            return Object(r.b)(w, {
                act: "a_create_template",
                hash: i.hash,
                gid: n.gid,
                peer_id: n.peer,
                name: e,
                text: t
            }).then(function(e) {
                return n.templates.unshift(e[0]), n
            })
        }

        function Vn(e, t, n, i) {
            var a = i.tabs[i.peer];
            return Object(r.b)(w, {
                act: "a_update_template",
                template_id: e,
                hash: a.hash,
                gid: i.gid,
                peer_id: i.peer,
                group_id: i.gid,
                name: t,
                text: n
            }).then(function(t) {
                var n = i.templates.find(function(t) {
                    return t.id === e
                });
                return n && Object.assign(n, t[0]), i
            })
        }

        function Gn(e, t) {
            if (Object(u.Oa)(t, e)) {
                var n = Object(_.t)(t, e);
                n.allShown = !1, n.lastReset = Date.now()
            }
            return t
        }
    },
    "wSs/": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c
        }), n.d(t, "b", function() {
            return u
        }), n.d(t, "c", function() {
            return d
        }), n.d(t, "e", function() {
            return _
        }), n.d(t, "d", function() {
            return l
        });
        var r = n("rHUl"),
            i = n("MhhX"),
            a = n("P13b"),
            o = n("eTng"),
            s = n("aong");

        function c(e, t) {
            t = Object(r.P)(t);
            var n = vk.id == t.peerId && !Object(s.r)(e).gid;
            return 333 != t.peerId && (!(!n && !Object(i.k)(t)) && (!Object(i.l)(t) && (!(Date.now() / 1e3 - t.date > 86400) && (!(Object(i.f)(t) || Object(i.m)(t) || Object(i.d)(t) || Object(i.g)(t) || Object(i.i)(t) || Object(i.o)(t)) && !Object(a.Fa)(e, t.peerId, t.messageId)))))
        }

        function u(e) {
            var t = document.createElement("div");
            return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, function() {
                var e = arguments.length <= 1 ? void 0 : arguments[1],
                    t = arguments.length <= 3 ? void 0 : arguments[3];
                return /^\@/.test(t) ? t : "@" + e + " (" + t + ")"
            }), t.innerHTML = e, Emoji.val(t)
        }

        function d(e, t) {
            return +(t && t.msgs ? Object.keys(t.msgs) : []).filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return t - e
            }).find(function(n) {
                return c(e, t.msgs[n])
            }) || null
        }

        function _(e, t, n) {
            var r = Object(o.a)(t.kludges, t.messageId),
                i = n.dData.attaches;
            if (u(t.text) !== n.dData.txt || r.length !== i.length) return !0;
            for (var a = r.length; a--;) {
                var s = r[a],
                    c = i[a];
                if (s.id != c.id || s.type != c.type || "poll" == s.type && c.object && c.object.poll_is_edited) return !0
            }
            return !1
        }

        function l(e, t, n, r, i, o) {
            t.origText = n, t.text = Object(a.Fb)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = i, t.cancelled_shares = o, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
        }
    },
    zNZe: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        var _helpers_im_shared_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("p3re"),
            _longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("gQAo"),
            _lib_debug_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("98sY"),
            ACTIVE_TAB_SWITCH_SERVER_TIMEOUT = browser.safari ? 3e3 : 1e4,
            LC_SERVER_SWITCH_TO_ACTIVE_FLAG = "lc_server_switch_to_active_flag";

        function showEventThumb(e) {
            var t = "",
                n = "";
            return e.author_photo && (t = "video_process_ready" === e.type ? '<div class="notifier_video_thumb" style="background-image: url(\'' + Notifier.fixPhoto(e.author_photo) + "')\"></div>" : '<img alt="" src="' + Notifier.fixPhoto(e.author_photo) + '" class="notifier_image" />', e.icon_type && (t = '<div class="feedback_photo_icon"></div>' + t, n = " feedback_" + e.icon_type + "_row"), e.author_link && (t = '<a href="' + e.author_link + '">' + t + "</a>"), t = '<div class="notifier_image_wrap' + n + '">' + t + "</div>"), t
        }

        function showEventAddPhoto(e) {
            var t = "";
            return e.add_photo && (t = '<div class="notifier_add_image_wrap"><img src="' + e.add_photo + '" class="notifier_add_image"></div>'), t
        }
        window.curNotifier || (window.curNotifier = {
            addQueues: {},
            recvClbks: {},
            recvData: {},
            onConnectionId: []
        }), window.Notifier = {
            debug: !1,
            init: function(e) {
                if (!window.curNotifier || !curNotifier.connection_id) {
                    if (Notifier.notificationsGc(), curNotifier = extend({
                            q_events: [],
                            q_shown: [],
                            q_closed: [],
                            negotiations: {},
                            currentIm: {},
                            q_max: 3,
                            uiNotifications: [],
                            q_idle_max: 5,
                            browser_shown: {},
                            done_events: {},
                            addQueues: curNotifier.addQueues || {},
                            recvClbks: curNotifier.recvClbks || {},
                            recvData: curNotifier.recvData || {},
                            error_timeout: 1,
                            request_timeout: 1e3,
                            sound: new Sound("mp3/bb1"),
                            sound_im: new Sound("mp3/bb2"),
                            sound_im_current: new Sound("mp3/bb3"),
                            onConnectionId: []
                        }, e), !this.initFrameTransport()) return !1;
                    this.initIdleMan(), this.initCommunityQueues(), Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__.c)(), (curNotifier.cont = ge("notifiers_wrap")) || bodyNode.insertBefore(curNotifier.cont = ce("div", {
                        id: "notifiers_wrap",
                        className: "fixed"
                    }), ge("page_wrap"))
                }
            },
            initCommunityQueues: function(e) {
                var t = ls.get("im_m_comms_key"),
                    n = t && t.split ? t.split(";") : [];
                if ("empty" === n[0] && n[1] && Date.now() - n[1] < 6e4 ? t = "empty" : "empty" === n[0] && (t = !1), t) return Notifier.proccessCommunityQueues(t, e || 0);
                ajax.post("al_im.php", {
                    act: "a_get_comms_key"
                }, {
                    onDone: function(t) {
                        "empty" === t ? t += ";" + Date.now() : Notifier.proccessCommunityQueues(t, e || 0), ls.set("im_m_comms_key", t)
                    },
                    onFail: function() {
                        return !0
                    }
                })
            },
            notificationsGc: function() {
                curNotifier.uiGcTo = setTimeout(function() {
                    for (var e = curNotifier.uiNotifications, t = [], n = 0; n < e.length; n++) {
                        var r = e[n];
                        vkNow() - r[1] > 1e4 ? r[0].close() : t.push(r)
                    }
                    curNotifier.uiNotifications = t, Notifier.notificationsGc()
                }, 5e3)
            },
            resetCommConnection: function(e) {
                var t = ls.get("im_m_comms_key");
                t && delete curNotifier.addQueues[t.queue], ls.set("im_m_comms_key", !1), Notifier.initCommunityQueues(e || 0)
            },
            proccessCommunityQueues: function(e, t) {
                if ("empty" === e || !e) return !1;
                Notifier.addKey(e, function(e, n) {
                    if (n.failed) ++t < 50 && setTimeout(Notifier.resetCommConnection.pbind(t), 100);
                    else {
                        (e = ls.get("im_m_comms_key")) && (e.ts = n.ts, ls.set("im_m_comms_key", e));
                        var r = n.events;
                        r && r.map(function(e) {
                            return e.split("<!>")
                        }).forEach(function(e) {
                            if ("update_cnt" === e[1]) {
                                var t = e[5],
                                    n = e[4];
                                handlePageCount("mgid" + t, n)
                            }
                        })
                    }
                })
            },
            destroy: function() {
                Notifier.hideAllEvents(), curNotifier.idle_manager.stop(), curNotifier.uiGcTo && clearTimeout(curNotifier.uiGcTo), curNotifier = {}, re("notifiers_wrap"), re("queue_transport_wrap")
            },
            reinit: function() {
                ajax.post("notifier.php?act=a_get_params", {}, {
                    onDone: function(e) {
                        e ? (curNotifier.error_timeout = 1, this.init(e)) : (curNotifier.error_timeout = curNotifier.error_timeout || 1, setTimeout(this.reinit.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 256 && (curNotifier.error_timeout *= 2))
                    }.bind(this),
                    onFail: function() {
                        return curNotifier.error_timeout = curNotifier.error_timeout || 1, setTimeout(this.reinit.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 256 && (curNotifier.error_timeout *= 2), !0
                    }.bind(this)
                })
            },
            standby: function(e) {
                this.destroy(), curNotifier.error_timeout = e || 1, setTimeout(this.reinit.bind(this), 1e3 * curNotifier.error_timeout)
            },
            freezeEvents: function() {
                curNotifier.frozen = !0, each(curNotifier.q_shown, function() {
                    clearTimeout(this.fadeTO), getStyle(this.baloonEl, "opacity") < 1 && animate(this.baloonEl, {
                        opacity: 1
                    }, 100)
                })
            },
            unfreezeEvents: function() {
                curNotifier.frozen = !1, each(curNotifier.q_shown, function() {
                    this.fadeTO = setTimeout(this.startFading, hasAccessibilityMode() ? 3e4 : 5e3)
                })
            },
            getTransportWrap: function() {
                return ge("queue_transport_wrap") || utilsNode.appendChild(ce("div", {
                    id: "queue_transport_wrap"
                }))
            },
            setFocus: function(e) {
                var t = (e ? "1" : "0") + curNotifier.instance_id;
                "flash" == curNotifier.transport && curNotifier.flash_transport ? curNotifier.flash_transport.setInstanceFocused(t) : "frame" == curNotifier.transport && (Notifier.lcSend("focus", {
                    instance_id: t
                }), this.onInstanceFocus(t))
            },
            initIdleMan: function() {
                curNotifier.idle_manager && curNotifier.idle_manager.started || (curNotifier.idle_manager = new IdleManager({
                    onIdleCb: function() {
                        Notifier.freezeEvents(), Notifier.setFocus(0), cur.onIdle && each(cur.onIdle, function(e, t) {
                            t()
                        })
                    },
                    onUnIdleCb: function() {
                        Notifier.unfreezeEvents(), Notifier.setFocus(1), cur.onUnidle && each(cur.onUnidle, function(e, t) {
                            t()
                        }), FastChat && FastChat.onUnidle(), vk.spentLastSendTS = vkNow()
                    },
                    id: "window",
                    element: document,
                    focusElement: window
                }), curNotifier.idle_manager.start())
            },
            initFrameTransport: function() {
                if (!ls.checkVersion() || browser.msie8 || !("onmessage" in window || "postMessage" in window)) return !1;
                curNotifier.connection_id = "queue_connection_" + curNotifier.queue_id, curNotifier.lc_prev_value = "", curNotifier.is_server = !1, curNotifier.lp_connected = !1, curNotifier.error_timeout = 1;
                var e = browser.version.split("."),
                    t = intval(e[0]),
                    n = intval(e[1]);
                for (var r in curNotifier.post_message = Notifier.debug || !(browser.opera && intval(browser.version) < 15 || browser.msie || browser.mozilla && t >= 31 || browser.safari && (t > 7 || 7 == t && n >= 1)), curNotifier.transport = "frame", this.lcInit(), curNotifier.onConnectionId) curNotifier.onConnectionId[r]();
                return curNotifier.onConnectionId = [], !0
            },
            onActivated: function() {
                curNotifier.idle_manager && !curNotifier.idle_manager.is_activated ? curNotifier.idle_manager.activate() : curNotifier.idle_manager && curNotifier.idle_manager.is_idle || Notifier.setFocus(1), removeEvent(document, "mousemove keydown touchstart", Notifier.onActivated)
            },
            onConnectionInit: function() {
                addEvent(document, "mousemove keydown touchstart", Notifier.onActivated)
            },
            onConnectionFailed: function() {},
            onRelogin: function() {
                setTimeout(function() {
                    Notifier.standby()
                }, 0)
            },
            onMessage: function onMessage(msg) {
                if (!curNotifier.focus_instance || curNotifier.focus_instance == curNotifier.instance_id) try {
                    var events = eval("(" + msg + ")");
                    Notifier.pushEvents(events)
                } catch (e) {
                    debugLog(e.message)
                }
            },
            onInstanceFocus: function(e) {
                var t = e.charAt(0);
                e = e.substr(1), "1" == t ? (curNotifier.focus_instance = e, e != curNotifier.instance_id && (curNotifier.idle_manager.is_idle || curNotifier.idle_manager.idle(), Notifier.hideAllEvents())) : curNotifier.focus_instance == e && (curNotifier.focus_instance = "")
            },
            onInstanceServer: function(e) {
                curNotifier.is_server = !!e, Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__.d)()
            },
            getLpInstance: function() {
                return Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__.a)()
            },
            pushEvents: function(e, t) {
                var n = 0;
                each(e, function(e, r) {
                    n |= Notifier.pushEvent(r, t)
                }), n && !ls.get("sound_notify_off") && curNotifier.is_server && (2 & n ? curNotifier.sound_im.play() : curNotifier.sound.play())
            },
            pushEvent: function pushEvent(msg, cnt) {
                if ("nop" != msg) {
                    var ev;
                    msg = JSON.parse(msg), ev = msg.version ? msg : {
                        version: msg[0],
                        type: msg[1],
                        title: msg[2],
                        author_photo: psr(msg[3] || ""),
                        author_link: msg[4] || "",
                        text: psr(msg[5]),
                        add_photo: psr(msg[6] || ""),
                        link: msg[7],
                        onclick: msg[8],
                        add: msg[9],
                        id: msg[10],
                        author_id: msg[11],
                        top_count: msg[12],
                        _eval: msg[13],
                        icon_type: msg[14]
                    };
                    var push = cnt ? 0 : 1;
                    if (ev.version !== curNotifier.version) return debugLog("Notifier old version: " + ev.version + " !== " + curNotifier.version), !1;
                    if ("update_cnt" === ev.type) return "nws" === ev.author_photo ? (handlePageCount("ntf", ev.add), 0) : (handlePageCount(ev.author_photo, ev.author_link, ev.text, ev.add_photo), 0);
                    if (ev._eval) {
                        var evalExpr = "(" + ev._eval + ")";
                        try {
                            ev.custom = eval(evalExpr)
                        } catch (e) {
                            Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_2__.d)(e, evalExpr)
                        }
                    }
                    if (!curNotifier.done_events[ev.id]) {
                        switch (curNotifier.done_events[ev.id] = 1, void 0 !== ev.top_count && -1 != ev.top_count && handlePageCount("ntf", ev.top_count), ev.type) {
                            case "video_process_ready":
                                if (ev.add.video_raw && window.Video && Video.isVideoPlayerOpen(ev.add.video_raw)) return;
                                if (ev.add && window.Video && Video.isVideoPlayerOpen(ev.add)) return;
                                break;
                            case "mail":
                                handlePageCount("msg", ev.add);
                                break;
                            case "friend_request":
                                ev.add.fr_count ? handlePageCount("fr", ev.add.fr_count) : handlePageCount("fr", ev.add);
                                break;
                            case "ach_achieved":
                                ev.add.cnt && handlePageCount("ach", ev.add.cnt);
                                break;
                            case "ach_achieved_upd":
                                handlePageCount("ach", ev.add), push = 0;
                                break;
                            case "bt_upd":
                                if (ev.add.cnt) {
                                    handlePageCount("bt", ev.add.cnt);
                                    var bt = ge("bt_tab_updates");
                                    bt && val(geByClass1("ui_tab_count", bt), ev.add.cnt > 0 ? ev.add.cnt : "")
                                }
                                break;
                            case "bt_upd_upd":
                                handlePageCount("bt", ev.add, ev.custom[0], ev.custom[1]), push = 0;
                                var bt = ge("bt_tab_updates");
                                bt && val(geByClass1("ui_tab_count", bt), ev.add > 0 ? ev.add : "");
                                break;
                            case "push_settings":
                                push = 0;
                                var muted = JSON.parse(ev.add);
                                curNotifier.mutedPeers = curNotifier.mutedPeers.filter(function(e) {
                                    return e !== muted.peer_id
                                }), 0 !== muted.disabled_until && curNotifier.mutedPeers.push(muted.peer_id);
                                break;
                            case "mail_cnt":
                                handlePageCount("msg", ev.add), push = 0;
                                break;
                            case "clear_notify":
                                TopNotifier && TopNotifier.invalidate(), Notifier.hideAllEvents(), push = 0;
                                break;
                            case "support_reply":
                                handlePageCount("spr", ev.add, "support", ev.author_id ? "act=show&id=" + ev.author_id : "act=show"), toggle("l_spr", ev.add > 0);
                                break;
                            case "support_cnt":
                                handlePageCount("spr", ev.add, "support", ev.author_id ? "act=show&id=" + ev.author_id : "act=show"), toggle("l_spr", ev.add > 0), push = 0;
                                break;
                            case "balance_changed":
                                parseInt(ev.add.balance) ? updateMoney(parseInt(ev.add.balance)) : parseInt(ev.add) && updateMoney(parseInt(ev.add)), ev.custom && "app" == ev.custom[0] && cur.app && cur.app.params.api_id == ev.custom[1] && cur.app.balanceUpdated(ev.custom[2]);
                                break;
                            case "gift_sent":
                                re("left_block10_0");
                                var left_block = ev.add;
                                if (left_block) {
                                    var leftBlocksElem = ge("left_blocks"),
                                        left_unpaid_gifts = se(left_block);
                                    leftBlocksElem && (leftBlocksElem.firstChild ? leftBlocksElem.insertBefore(left_unpaid_gifts, leftBlocksElem.firstChild) : leftBlocksElem.appendChild(left_unpaid_gifts))
                                }
                                break;
                            case "notify_tt":
                            case "login_attempt":
                                if (ev.add.text && ev.add.key) {
                                    var evalText = "(" + ev.add + ")";
                                    try {
                                        ev.add = eval(evalText), TopNotifier.showTooltip(ev.add.text, ev.add.key)
                                    } catch (e) {
                                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_2__.d)(e, evalText)
                                    }
                                    push = 0
                                }
                                break;
                            case "reload_stickers":
                                window.Emoji && window.Emoji.stickers && (Emoji.stickers = !1), push = 0;
                                break;
                            case "reload_stickers_keywords":
                                window.stickersKeywordsData = null, ls.remove("stickers_keywords"), window.Emoji && Emoji.updateTabs(), push = 0
                        }
                        if ("mail" === ev.type && (push = this.sendMailNotification(ev)), ev.add && ev.add.tooltip_text) {
                            var html = '<div class="notify_tt_wrap">' + (ev.author_photo ? '<img class="notify_tt_img" src="' + ev.author_photo + '" />' : '<div class="notify_tt_thumb"></div>') + '<h4 class="notify_tt_text">' + ev.add.tooltip_text + "</h4></div>";
                            TopNotifier.showTooltip(html, 0), push = 0
                        }
                        return 1 & push && (curNotifier.q_events.push(ev), curNotifier.q_events.length > 30 && curNotifier.q_events.splice(0, curNotifier.q_events.length - 30), this.checkEvents()), push
                    }
                }
            },
            isActive: function() {
                return window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle
            },
            sendImProxy: function(e) {
                e.text = winToUtf(e.text), curNotifier.browser_shown[e.id] || (curNotifier.browser_shown[e.id] = !0, Notifier.trySendBrowserNotification(e, !0), setTimeout(function() {
                    curNotifier.browser_shown[e.id] = void 0
                }, 2e3))
            },
            shouldShowNotification: function(e) {
                return "im" !== cur.module && !FastChat.isChatOpen(e.author_id)
            },
            sendSimpleNotification: function(e) {
                return Notifier.playSound(e), Notifier.shouldShowNotification(e) ? 3 : 0
            },
            sendBrowserNotification: function(e) {
                "im" !== cur.module ? Notifier.negotiate({
                    message: "send_im_notification",
                    onSuccess: function(t) {
                        Notifier.lcSend("negotiate_back", {
                            token: t.msg,
                            ev: e
                        })
                    },
                    onFail: function() {
                        Notifier.showBrowserNotification(e)
                    }
                }) : (e.onclick = "IMBRIDGE.activateTab(" + e.author_id + ");", Notifier.showBrowserNotification(e))
            },
            shouldPlaySound: function(e) {
                return !ls.get("sound_notify_off") && Notifier.shouldDisturb(e)
            },
            shouldDisturb: function(e) {
                return !cur.noDisturbMode && (cur.focused != e.author_id && !inArray(e.author_id, cur.mutedPeers) && !inArray(e.author_id, curNotifier.mutedPeers))
            },
            shouldPlayCurrentSound: function(e) {
                return !ls.get("sound_notify_off") && cur.focused == e.author_id && hasAccessibilityMode() && !inArray(e.author_id, cur.mutedPeers)
            },
            playSound: function(e) {
                curNotifier.sound_im && curNotifier.sound_im.play && Notifier.shouldPlaySound(e) ? e.author_id == cur.peer && hasAccessibilityMode() ? curNotifier.sound_im_current.play() : curNotifier.sound_im.play() : Notifier.shouldPlayCurrentSound(e) && curNotifier.sound_im_current && curNotifier.sound_im_current.play()
            },
            trySendBrowserNotification: function(e, t) {
                Notifier.negotiate({
                    message: "who_is_active",
                    msg: e.author_id,
                    onFail: function() {
                        !Notifier.canNotifyUi() || cur.peer == e.author_id && Notifier.isActive() ? t ? Notifier.playSound(e) : (Notifier.lcSend("show_notification", e), Notifier.shouldShowNotification(e) && Notifier.showEvent(e, !0), Notifier.playSound(e)) : Notifier.sendBrowserNotification(e)
                    }
                })
            },
            showBrowserNotification: function(e) {
                Notifier.showEventUi(e), Notifier.playSound(e)
            },
            proxyIm: function(e) {
                if (this.isActive()) return this.playSound(e), void(Notifier.canNotifyUi() && cur.peer != e.author_id && Notifier.shouldDisturb(e) && (e.onclick = "IMBRIDGE.activateTab(" + e.author_id + ");", Notifier.showEventUi(e)));
                curNotifier.is_server ? (e.onclick = "IMBRIDGE.activateTab(" + e.author_id + ");", this.sendImProxy(e)) : curNotifier.is_server || this.lcSend("message_from_im", e)
            },
            sendMailNotification: function(e) {
                if (e.custom.is_call) return 0;
                if ("im" == cur.module ? e.onclick = "IMBRIDGE.activateTab('" + e.author_id + "');" : e.onclick = "FastChat.selectPeer('" + e.author_id + "');", this.isActive() && Notifier.canNotifyUi()) this.playSound(e), this.shouldDisturb(e) && cur.peer != e.author_id && this.showEventUi(e);
                else {
                    if (this.isActive() && this.shouldDisturb(e)) return this.sendSimpleNotification(e);
                    curNotifier.is_server && this.shouldDisturb(e) && this.trySendBrowserNotification(e)
                }
                return 0
            },
            checkEvents: function() {
                if (!(!curNotifier.q_events.length || curNotifier.q_shown.length >= (curNotifier.idle_manager.is_idle ? curNotifier.q_idle_max : curNotifier.q_max) || !curNotifier.idle_manager.is_idle && curNotifier.frozen || cur.noDisturbMode)) {
                    var e = curNotifier.q_events.shift();
                    this.showEvent(e)
                }
            },
            showEvent: function showEvent(ev, force) {
                ev.custom && ev.custom.ttl && Object(_helpers_im_shared_helpers__WEBPACK_IMPORTED_MODULE_0__.a)(ev.custom.id), "mail" !== ev.type && Math.random() < .1 && statlogsValueEvent("feed_top_notify_popup", 1, "show", ev.type), curNotifier.q_shown.push(ev);
                var thumbEl = showEventThumb(ev),
                    addPhoto = showEventAddPhoto(ev);
                ev.baloonWrapEl = ce("div", {
                    className: "notifier_baloon_wrap",
                    innerHTML: '\n        <div class="notifier_baloon notifier_type_' + ev.type + '">\n          <div class="notifier_baloon_head clear_fix">\n            <a class="notifier_close_wrap" role="link" title="' + getLang("global_close") + '" aria-label="' + getLang("global_close") + '"></a>\n            <h4 class="notifier_baloon_title">' + ev.title + '</h4>\n          </div>\n          <div class="notifier_baloon_body clear_fix">\n            ' + thumbEl + "\n            " + addPhoto + '\n            <div class="notifier_baloon_msg wrapped">' + ev.text + "</div>\n          </div>\n        </div>"
                }), !ge("notifier_popup_icon_mask") && ev.icon_type && (utilsNode.appendChild(document.createElement("div")).outerHTML = '<svg style="display: block;" width="0" height="0"><defs><clipPath id="notifier_popup_icon_mask"><path d="M48.254 34.197A9.958 9.958 0 0 0 42 32c-5.523 0-10 4.477-10 10 0 2.367.822 4.542 2.197 6.254A24.934 24.934 0 0 1 25 50C11.193 50 0 38.807 0 25S11.193 0 25 0s25 11.193 25 25c0 3.247-.62 6.35-1.746 9.197z"/></clipPath></defs></svg>'), ev.baloonEl = geByClass1("notifier_baloon", ev.baloonWrapEl), ev.closeEl = geByClass1("notifier_close_wrap", ev.baloonEl), addEvent(ev.baloonEl, "mouseover mouseout", function(e) {
                    ev.over = "mouseover" == e.type, ev.over ? Notifier.freezeEvents() : Notifier.unfreezeEvents()
                }), addEvent(ev.baloonEl, "mousedown click", function(event) {
                    event = event.originalEvent || event || window.event;
                    var btn = event.which,
                        nohide = !1;
                    if (1 == btn && (event.ctrlKey || browser.mac && event.metaKey) && (btn = 2, browser.mac && (nohide = !0)), "A" != (event.target || event.srcElement).tagName) {
                        switch ("mail" !== ev.type && Math.random() < .1 && statlogsValueEvent("feed_top_notify_popup", 1, "click", ev.type), btn) {
                            case 1:
                                try {
                                    eval(ev.onclick)
                                } catch (e) {
                                    Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_2__.d)(e, ev.onclick)
                                }
                                Notifier.trackEvent("click", {
                                    event_id: ev.id
                                }), Notifier.hideEvent(ev);
                                break;
                            case 2:
                                var wnd = window.open(ev.link, "_blank");
                                try {
                                    wnd.blur(), window.focus()
                                } catch (e) {}
                                Notifier.trackEvent("click", {
                                    event_id: ev.id
                                }), nohide || Notifier.hideEvent(ev);
                                break;
                            case 3:
                                if (browser.mozilla) return
                        }
                        return cancelEvent(event)
                    }
                }), addEvent(ev.baloonEl, "contextmenu", function(e) {
                    return setTimeout(function() {
                        Notifier.hideEvent(ev, !1, !1, !0)
                    }, 10), cancelEvent(e)
                }), addEvent(ev.closeEl, "mousedown click", function(e) {
                    return Notifier.hideEvent(ev, !1, !1, !0), cancelEvent(e)
                }), ev.startFading = function() {
                    ev.fading = animate(ev.baloonEl, {
                        opacity: 0
                    }, 1e3, Notifier.hideEvent.bind(Notifier).pbind(ev, !1)), ev.over && ev.fading.stop()
                }, curNotifier.cont.insertBefore(ev.baloonWrapEl, curNotifier.cont.firstChild);
                var h = ev.baloonWrapEl.offsetHeight;
                re(ev.baloonWrapEl), curNotifier.cont.appendChild(ev.baloonWrapEl), setStyle(curNotifier.cont, {
                    bottom: -h
                }), setStyle(ev.baloonWrapEl, {
                    visibility: "visible"
                }), animate(curNotifier.cont, {
                    bottom: 0
                }, 200), curNotifier.idle_manager.is_idle && !force || (ev.fadeTO = setTimeout(ev.startFading, hasAccessibilityMode() ? 35e3 : 7e3))
            },
            trackEvent: function(e, t) {
                ajax.post("al_feed.php", extend({
                    act: "a_feedback_track_event",
                    event: e
                }, t || {}))
            },
            canNotifyUi: function() {
                return !ls.get("im_ui_notify_off") && DesktopNotifications.supported() && DesktopNotifications.checkPermission() <= 0 && !cur.noDisturbMode
            },
            showEventUi: function showEventUi(ev) {
                if (!this.canNotifyUi()) return !1;
                var title, text;
                if (ev.custom && ev.custom.ttl && Object(_helpers_im_shared_helpers__WEBPACK_IMPORTED_MODULE_0__.a)(ev.custom.id), "mail" === ev.type) {
                    var div = ce("div");
                    div.innerHTML = ev.text, title = div.firstChild.textContent.trim(), text = stripHTML(replaceEntities(ev.text.replace(/<br\/?>/g, "\n")).replace(/<span class='notifier_author_quote'.*<\/span>(.*?)/, "$1").replace(/<img.*?alt="(.*?)".*?>/gi, "$1")).replace(/&laquo;|&raquo;/gi, '"').trim()
                } else title = ev.title, text = ev.text;
                var notification = ev.uiNotification = DesktopNotifications.createNotification(ev.author_photo, title, text);
                return curNotifier.uiNotifications.push([notification, vkNow()]), notification.onclick = function(e) {
                    if (window.focus(), ev.onclick || ("im" === cur.module ? ev.onclick = "IMBRIDGE.activateTab(" + ev.author_id + ");" : ev.onclick = "FastChat.selectPeer('" + ev.author_id + "');"), "IM" === ev.onclick.substr(0, 2) && "im" !== cur.module) FastChat.selectPeer(intval(ev.author_id));
                    else try {
                        eval(ev.onclick)
                    } catch (e) {
                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_2__.d)(e, ev.onclick)
                    }
                    Notifier.hideEvent(ev)
                }, notification.onclose = function() {
                    Notifier.hideEvent(ev, !0)
                }, notification.show(), ev.closeTO = setTimeout(Notifier.hideEvent.bind(Notifier).pbind(ev), 5e3), !0
            },
            hideEvent: function(e, t, n, r) {
                clearTimeout(e.closeTO), clearTimeout(e.fadeTO), e.fading && e.fading.stop();
                var i, a = indexOf(curNotifier.q_shown, e); - 1 != a && curNotifier.q_shown.splice(a, 1), Notifier.unfreezeEvents(), t || (e.baloonWrapEl ? (cleanElems(e.closeEl, e.baloonEl), re(e.baloonWrapEl)) : e.uiNotification && e.uiNotification.cancel()), !0 === r && isArray(curNotifier.q_closed) && (curNotifier.q_closed.unshift(vkNow()), (i = curNotifier.q_closed.length) > 3 && (curNotifier.q_closed.splice(3, i - 3), i = 3), 3 == i && curNotifier.q_closed[0] - curNotifier.q_closed[2] < 700 && Notifier.hideAllEvents()), -1 != r && this.checkEvents(), "frame" != curNotifier.transport || n || this.lcSend("hide", {
                    event_id: e.id
                }), !0 !== r && curNotifier.idle_manager.is_idle || curNotifier.q_events.length || curNotifier.q_shown.length || ajax.post("notifier.php", {
                    act: "a_clear_notifier"
                })
            },
            hideAllEvents: function() {
                curNotifier.q_events = [], each(clone(curNotifier.q_shown), function() {
                    Notifier.hideEvent(this, !1, !0, -1)
                }), curNotifier.q_shown = [], curNotifier.q_closed = []
            },
            onEventHide: function(e) {
                e && (each(curNotifier.q_shown, function() {
                    if (this.id == e) return Notifier.hideEvent(this, !1, !0), !1
                }), each(curNotifier.q_events, function(t) {
                    if (this.id == e) return curNotifier.q_events.splice(t, 1), !1
                }))
            },
            lcInit: function() {
                if (curNotifier.post_message) {
                    addEvent(window, "message", this.lcOnMessage.bind(this));
                    var e = curNotifier.storage_el = ce("iframe", {
                        id: "queue_storage_frame",
                        name: "queue_storage_frame",
                        src: "/notifier.php?act=storage_frame&from=" + location.host + (Notifier.debug ? "&debug=" + vkNow() : "&4") + "#" + curNotifier.connection_id
                    });
                    Notifier.getTransportWrap().appendChild(e), curNotifier.storage_frame = e.contentWindow, curNotifier.storage_frame_origin = location.protocol + "//" + locHost
                } else browser.msie && intval(browser.version) < 9 ? addEvent(document, "storage", this.lcOnStorage.bind(this)) : addEvent(window, "storage", this.lcOnStorage.bind(this)), this.lcStart()
            },
            lcStart: function() {
                Notifier.lcCheckServer() ? this.lcServer() : (this.lcSend("check"), clearTimeout(curNotifier.becomeServerTO), curNotifier.becomeServerTO = setTimeout(this.lcServer.bind(this).pbind(!0), 500)), curNotifier.checkServerInt = setInterval(function() {
                    curNotifier.is_server || (!curNotifier.idle_manager.is_idle && curNotifier.idle_manager.getActiveTime() > ACTIVE_TAB_SWITCH_SERVER_TIMEOUT && (Notifier.debug && debugLog("this tab wants to become server"), ls.set(LC_SERVER_SWITCH_TO_ACTIVE_FLAG, !0), this.lcServer(!0)), vkNow() - curNotifier.last_succ > 8e3 && Notifier.lcCheckServer() && (Notifier.debug && debugLog("timeout"), this.lcServer(!0)))
                }.bind(this), 1e3 + intval(rand(-100, 100))), curNotifier.isServerBroadcastInt = setInterval(function() {
                    curNotifier.is_server && (Notifier.lcCheckServer() ? this.lcSend("check_ok") : (Notifier.debug && debugLog("no server from server broadcast"), this.lcNoServer()))
                }.bind(this), 5e3 + intval(rand(-100, 100))), void 0 !== curNotifier.fc && stManager.add([jsc("web/emoji.js")], function() {
                    FastChat.init(curNotifier.fc)
                })
            },
            lcStop: function() {
                clearInterval(curNotifier.isServerBroadcastInt), clearInterval(curNotifier.checkServerInt), clearTimeout(curNotifier.becomeServerTO)
            },
            lcSend: function(e, t) {
                if (!curNotifier.connection_id) return curNotifier.onConnectionId.push(Notifier.lcSend.pbind(e, t)), !1;
                Notifier.debug && debugLog(curNotifier.instance_id + ": sending", e, t || "");
                var n = extend({
                    __client: curNotifier.instance_id,
                    __act: e,
                    __rnd: Math.random()
                }, t || {});
                if (curNotifier.post_message) try {
                    curNotifier.storage_frame.postMessage(curNotifier.connection_id + ":" + JSON.stringify(n), curNotifier.storage_frame_origin)
                } catch (e) {
                    debugLog(e, e.message, e.stack)
                } else ls.set(curNotifier.connection_id, n)
            },
            lcRecv: function(e) {
                if (!isEmpty(e) && e.__client != curNotifier.instance_id) {
                    var t = e.__act;
                    switch (delete e.__client, delete e.__act, delete e.__rnd, Notifier.debug && debugLog(curNotifier.instance_id + ": recv", t, e), t) {
                        case "new_server":
                            curNotifier.last_succ = vkNow() + 1e3;
                            break;
                        case "feed":
                            curNotifier.timestamp = e.ts, curNotifier.key = e.key, Notifier.pushEvents(e.events, !e.full);
                            break;
                        case "addfeed":
                            Notifier.addFeed(e[0], e[1]);
                            break;
                        case "new_key":
                            debugLog("new key", e), curNotifier.timestamp = e.ts, curNotifier.key = e.key;
                            break;
                        case "new_addkey":
                            var n = e.queue || e.key,
                                r = curNotifier.addQueues[n],
                                i = !r && curNotifier.is_server;
                            r ? r[0] = vkNow() : curNotifier.addQueues[n] = [vkNow(), e.ts, e.key], i && Notifier.lpReset(Notifier.lpCheck.bind(Notifier));
                            break;
                        case "clear_addkeys":
                            curNotifier.addQueues = {};
                            break;
                        case "check_ok":
                            curNotifier.last_succ = vkNow(), curNotifier.becomeServerTO && (clearTimeout(curNotifier.becomeServerTO), curNotifier.becomeServerTO = !1), curNotifier.lp_connected || (curNotifier.lp_connected = !0, Notifier.onConnectionInit());
                            break;
                        case "focus":
                            Notifier.onInstanceFocus(e.instance_id);
                            break;
                        case "hide":
                            Notifier.onEventHide(e.event_id);
                            break;
                        case "check_playlist":
                            var a = ls.get("pad_playlist");
                            a && a.instance == curNotifier.instance_id && ls.set("pad_pltime", vkNow());
                            break;
                        case "who_is_active":
                            Notifier.isActive() && (intval(e.msg) > 2e9 && "im" === cur.module || intval(e.msg) < 2e9) && this.lcSend("negotiate_back", e);
                            break;
                        case "show_notification":
                            Notifier.shouldShowNotification(e) && Notifier.showEvent(e, !0);
                            break;
                        case "send_im_notification":
                            if ("im" === cur.module) {
                                var o = Notifier.createNegotiationSlot({
                                    onSuccess: function(e) {
                                        e.ev.onclick = "IMBRIDGE.activateTab(" + e.ev.author_id + ");", Notifier.showBrowserNotification(e.ev)
                                    }
                                });
                                Notifier.lcSend("negotiate_back", {
                                    msg: o.token,
                                    token: e.token
                                })
                            }
                            break;
                        case "negotiate_back":
                            Notifier.endNegotiation(e);
                            break;
                        case "recent_emoji_set":
                            window.Emoji && Emoji.setRecentEmojiList(e);
                            break;
                        case "lp_data":
                            Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_1__.b)(e);
                            break;
                        default:
                            if (curNotifier.recvClbks && curNotifier.recvClbks[t])
                                for (var s in curNotifier.recvClbks[t]) curNotifier.recvClbks[t][s](e);
                            else curNotifier.recvData[t] = e
                    }
                    if (curNotifier.is_server) switch (t) {
                        case "new_server":
                        case "new_key":
                        case "check_ok":
                            Notifier.debug && debugLog("no server from lcRecv", t), Notifier.lcNoServer();
                            break;
                        case "check":
                            this.lcSend("check_ok");
                            break;
                        case "message_from_im":
                            Notifier.sendImProxy(e)
                    }
                }
            },
            negotiate: function(e) {
                e = this.createNegotiationSlot(e), this.lcSend(e.message, {
                    token: e.token,
                    msg: e.msg
                })
            },
            createNegotiationSlot: function(e) {
                var t = "negotiations_" + Date.now() + Math.round(rand(0, 1e4));
                return e = extend({
                    timeout: 3e3,
                    token: t,
                    msg: ""
                }, e), curNotifier.negotiations[e.token] = {}, curNotifier.negotiations[e.token].timer = setTimeout(function() {
                    e.onFail && e.onFail(), curNotifier.negotiations[e.token] && (curNotifier.negotiations[e.token] = void 0)
                }, e.timeout), curNotifier.negotiations[e.token].success = e.onSuccess, e
            },
            endNegotiation: function(e) {
                var t = e.token,
                    n = curNotifier.negotiations[t];
                n && (clearTimeout(n.timer), curNotifier.negotiations[t].success && curNotifier.negotiations[t].success(e), curNotifier.negotiations[t] = void 0)
            },
            lcOnStorage: function(e) {
                e = e || window.event, Notifier.debug && debugLog("onstorage", e.key, e.newValue, e);
                var t = e.key,
                    n = e.newValue;
                if (n) {
                    if (t) {
                        if (e.key != curNotifier.connection_id) return
                    } else {
                        if (t = curNotifier.connection_id, (n = localStorage.getItem(t)) == curNotifier.lc_prev_value) return;
                        curNotifier.lc_prev_value = n
                    }
                    this.lcRecv(JSON.parse(n) || {})
                }
            },
            lcOnMessage: function(e) {
                if (e = e || window.event, Notifier.debug && debugLog("onmessage", e.data, e.origin, e), !(e.origin && e.origin != curNotifier.storage_frame_origin || "string" != typeof e.data || e.data.indexOf("q_st"))) {
                    var t, n = e.data.substr(4);
                    if ("ready" == n) curNotifier.storage_frame = e.source, this.lcStart();
                    else {
                        if (-1 == (t = n.indexOf(":")) || n.substr(0, t) != curNotifier.connection_id || !n.substr(t + 1)) return;
                        this.lcRecv(JSON.parse(n.substr(t + 1)))
                    }
                }
            },
            lcServer: function(e) {
                Notifier.debug && debugLog("becoming server"), this.lpInit(), this.lcSend("new_server"), Notifier.lcCheckServer(!0), Notifier.onInstanceServer(1), curNotifier.lp_connected || (curNotifier.lp_connected = !0, Notifier.onConnectionInit()), this.lpStop(), e ? this.lpReset(this.lpStart.bind(this)) : this.lpStart()
            },
            lcNoServer: function() {
                this.lpStop(), curNotifier.is_server && (Notifier.debug && debugLog("not server now"), this.onInstanceServer(0))
            },
            lcCheckServer: function(e) {
                var t, n = "server_" + curNotifier.connection_id,
                    r = vkNow();
                return !(!e && isArray(t = ls.get(n)) && t[0] != curNotifier.instance_id && r - t[1] < 8e3) && (ls.set(n, [curNotifier.instance_id, r]), !0)
            },
            lpInit: function() {
                curNotifier.lpMakeRequest || (delete curNotifier.lpMakeRequest, re("queue_transport_frame"), Notifier.getTransportWrap().appendChild(ce("iframe", {
                    id: "queue_transport_frame",
                    name: "queue_transport_frame",
                    src: curNotifier.frame_path
                })))
            },
            lpStart: function() {
                curNotifier.lp_started = !0, curNotifier.lpInvalid ? Notifier.lpGetKey() : Notifier.lpCheck()
            },
            lpStop: function() {
                curNotifier.lp_started = !1, clearTimeout(curNotifier.lp_check_to), clearTimeout(curNotifier.lp_error_to), clearTimeout(curNotifier.lp_req_check_to)
            },
            lpCheck: function lpCheck() {
                if (curNotifier.lp_started && !curNotifier.lpActive && !curNotifier.lpInvalid) {
                    if (!curNotifier.lpMakeRequest) return clearTimeout(curNotifier.lp_check_to), void(curNotifier.lp_check_to = setTimeout(this.lpCheck.bind(this), 1e3));
                    if (!Notifier.lcCheckServer()) return Notifier.debug && debugLog("no server from check"), void this.lcNoServer();
                    var now = vkNow(),
                        add_queues = [],
                        completed = !1,
                        params = {
                            act: "a_check",
                            ts: curNotifier.timestamp,
                            key: curNotifier.key,
                            id: curNotifier.uid,
                            wait: 25
                        };
                    each(curNotifier.addQueues, function(e, t) {
                        if (now - t[0] > 3e4 && !e.match(/nccts/)) return debugLog("drop key", e, now - t[0]), void delete curNotifier.addQueues[e];
                        add_queues.push(e), params.ts += "_" + t[1], params.key += t[2]
                    });
                    var onFail = function(e) {
                        completed || (completed = !0, curNotifier.lpActive = !1, clearTimeout(curNotifier.lp_req_check_to), curNotifier.error_timeout = curNotifier.error_timeout || 1, clearTimeout(curNotifier.lp_error_to), curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), 1e3 * curNotifier.error_timeout + irand(1e3, 1e4)), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2))
                    }.bind(this);
                    curNotifier.lpActive = !0, clearTimeout(curNotifier.lp_req_check_to), curNotifier.lp_req_check_to = setTimeout(onFail, 1e3 * (params.wait + 5)), curNotifier.lpMakeRequest(curNotifier.frame_url, params, function(text) {
                        if (!completed && (completed = !0, curNotifier.lpActive = !1, curNotifier.lp_started)) {
                            this.lcSend("check_ok");
                            try {
                                var response = eval("(" + text + ")"),
                                    main_response = response,
                                    add_response, add_queue, busy = 0;
                                if (isArray(response))
                                    for (main_response = response.shift();
                                        (add_response = response.shift()) && (add_queue = add_queues.shift(), add_queue);) 2 != add_response.failed || 4 != add_response.err ? (this.lcSend("addfeed", [add_queue, add_response]), this.addFeed(add_queue, add_response), add_response.failed && delete curNotifier.addQueues[add_queue]) : (Notifier.debug && debugLog("!!notifier key busy!! " + curNotifier.instance_id), busy |= 1);
                                else if (response.failed) {
                                    for (; add_queue = add_queues.shift();) this.lcSend("addfeed", [add_queue, response]), this.addFeed(add_queue, response), delete curNotifier.addQueues[add_queue];
                                    this.lcSend("clear_addkeys")
                                }
                                switch (this.lpChecked(main_response)) {
                                    case 0:
                                        break;
                                    case 1:
                                        return;
                                    case 2:
                                        busy |= 2;
                                        break;
                                    default:
                                        return
                                }
                                busy ? ls.get(LC_SERVER_SWITCH_TO_ACTIVE_FLAG) ? ls.remove(LC_SERVER_SWITCH_TO_ACTIVE_FLAG) : this.lcNoServer() : (clearTimeout(curNotifier.lpCheckTO), curNotifier.lpCheckTO = setTimeout(this.lpCheck.bind(this), curNotifier.request_timeout || 1e3), curNotifier.error_timeout = Math.max(1, (curNotifier.error_timeout || 1) / 1.5))
                            } catch (e) {
                                text && -1 == text.indexOf("Ad Muncher") && (topError("Notifier error: " + e.message, {
                                    dt: -1,
                                    type: 5,
                                    stack: e.stack,
                                    answer: text + "\n\nbusy:" + busy + "\nserver:" + curNotifier.is_server + "\ninstance:" + curNotifier.instance_id,
                                    url: curNotifier.frame_url,
                                    query: params && ajx2q(params)
                                }), debugLog(e.message, e.stack, e)), curNotifier.error_timeout = curNotifier.error_timeout || 1, clearTimeout(curNotifier.lp_error_to), curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2)
                            }
                        }
                    }.bind(this), onFail)
                }
            },
            lpChecked: function(e) {
                var t = e.failed;
                if (2 == t) return 4 == e.err ? 2 : (curNotifier.lpInvalid = !0, debugLog("notifier lpCheck error", e), clearTimeout(curNotifier.lp_error_to), curNotifier.lp_error_to = setTimeout(this.lpGetKey.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2), 1 == e.err ? 1 : 3);
                if (t) throw getLang("global_unknown_error");
                return this.lcSend("feed", extend({
                    full: curNotifier.idle_manager && curNotifier.idle_manager.is_idle && !this.canNotifyUi(),
                    key: curNotifier.key
                }, e)), curNotifier.timestamp = e.ts, Notifier.pushEvents(e.events), 0
            },
            lpOnReset: function() {
                curNotifier.lpOnReset && curNotifier.lpOnReset()
            },
            lpReset: function(e) {
                curNotifier.lpOnReset = e, clearTimeout(curNotifier.resetTO), curNotifier.resetTO = setTimeout(function() {
                    if (!curNotifier.is_server || curNotifier.lp_started)
                        if (curNotifier.lpMakeRequest && !curNotifier.lpInvalid) {
                            var e = curNotifier.key,
                                t = curNotifier.timestamp;
                            each(curNotifier.addQueues, function(n, r) {
                                e += r[2], t += "_" + r[1]
                            }), curNotifier.lpMakeRequest(curNotifier.frame_url, {
                                act: "a_release",
                                key: e,
                                ts: t,
                                id: curNotifier.uid,
                                wait: 25
                            }, Notifier.lpOnReset, Notifier.lpOnReset)
                        } else ajax.post("notifier.php?act=a_reset", !1, {
                            onDone: Notifier.lpOnReset,
                            onFail: function() {
                                return Notifier.lpOnReset(), !0
                            }
                        });
                    else Notifier.lpStart()
                }, 100)
            },
            lpGetKey: function() {
                ajax.post("notifier.php?act=a_get_key", {
                    id: curNotifier.uid
                }, {
                    onDone: function(e, t) {
                        curNotifier.timestamp = t, curNotifier.key = e, curNotifier.lpInvalid = !1, debugLog("notifier lpGetKey done"), this.lcSend("new_key", {
                            ts: t,
                            key: e
                        }), this.lpCheck()
                    }.bind(this),
                    onFail: function(e) {
                        switch (debugLog("notifier lpGetKey fail", e), e) {
                            case 1:
                            case 3:
                                return void Notifier.standby();
                            case 4:
                                return void Notifier.standby(300);
                            case 2:
                                return void Notifier.onRelogin()
                        }
                        return curNotifier.error_timeout = 64, clearTimeout(this.lp_error_to), this.lp_error_to = setTimeout(this.lpGetKey.bind(this), 1e3 * curNotifier.error_timeout), !0
                    }.bind(this)
                })
            },
            addKey: function(e, t, n) {
                if (curNotifier.flash_transport || !e) return !1;
                var r = e.queue || e.key,
                    i = curNotifier.addQueues[r],
                    a = !i && curNotifier.is_server;
                return i ? (i[0] = vkNow(), i[3] = t, i[4] = n) : curNotifier.addQueues[r] = [vkNow(), e.ts, e.key, t, n], n || Notifier.lcSend("new_addkey", e), a && Notifier.lpReset(Notifier.lpCheck.bind(Notifier)), !0
            },
            addFeed: function(e, t) {
                var n = curNotifier.addQueues[e];
                isArray(n) && n.length && (n[1] = t.ts, isFunction(n[3]) && n[3](e, t))
            },
            addRecvClbk: function(e, t, n, r) {
                curNotifier.recvClbks || (curNotifier.recvClbks = {}), curNotifier.recvClbks[e] || (curNotifier.recvClbks[e] = {}), curNotifier.recvClbks[e][t] && !r || (curNotifier.recvClbks[e][t] = n)
            },
            setRecvClbk: function(e, t) {
                curNotifier.recvClbks || (curNotifier.recvClbks = {}), curNotifier.recvClbks[e] = [t]
            },
            fixPhoto: function(e, t) {
                return -1 == (e = clean(e)).indexOf("question_c.gif") ? e : t ? "/images/question_inv_xc.png" : "/images/question_inv_c.png"
            }
        }
    }
});