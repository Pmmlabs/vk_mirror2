! function(e) {
    function t(t) {
        for (var a, s, n = t[0], c = t[1], l = t[2], u = 0, f = []; u < n.length; u++) s = n[u], o[s] && f.push(o[s][0]), o[s] = 0;
        for (a in c) Object.prototype.hasOwnProperty.call(c, a) && (e[a] = c[a]);
        for (d && d(t); f.length;) f.shift()();
        return r.push.apply(r, l || []), i()
    }

    function i() {
        for (var e, t = 0; t < r.length; t++) {
            for (var i = r[t], a = !0, n = 1; n < i.length; n++) {
                var c = i[n];
                0 !== o[c] && (a = !1)
            }
            a && (r.splice(t--, 1), e = s(s.s = i[0]))
        }
        return e
    }
    var a = {},
        o = {
            "web/notifier": 0
        },
        r = [];

    function s(t) {
        if (a[t]) return a[t].exports;
        var i = a[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, s), i.l = !0, i.exports
    }
    s.m = e, s.c = a, s.d = function(e, t, i) {
        s.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, s.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, s.t = function(e, t) {
        if (1 & t && (e = s(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (s.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var a in e) s.d(i, a, function(t) {
                return e[t]
            }.bind(null, a));
        return i
    }, s.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return s.d(t, "a", t), t
    }, s.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, s.p = "";
    var n = window.webpackJsonp = window.webpackJsonp || [],
        c = n.push.bind(n);
    n.push = t, n = n.slice();
    for (var l = 0; l < n.length; l++) t(n[l]);
    var d = c;
    r.push([119, "bundles/common", "bundles/62cd2d13cb8ff40d482130982a5033c8", "bundles/37d6fe1fee6fb6accf5867cbca2cda9c"]), i()
}({
    119: function(e, t, i) {
        e.exports = i("8S/u")
    },
    "8S/u": function(e, t, i) {
        "use strict";
        i.r(t);
        var a = i("gF8j");

        function o(e, t) {
            var i, a, o = !1;
            if (!e) throw new Error("Undefined filename");
            t = t || {};
            try {
                o = !!(a = ce("audio")).canPlayType, "no" != a.canPlayType("audio/mpeg") && "" != a.canPlayType("audio/mpeg") ? i = ".mp3?1" : "no" == a.canPlayType('audio/ogg; codecs="vorbis"') || "" == a.canPlayType('audio/ogg; codecs="vorbis"') || t.forceMp3 ? o = !1 : i = ".ogg?1"
            } catch (e) {}
            var r = t.forcePath || "/" + e + i;
            if (o) {
                a.src = r;
                var s = !1;
                a.addEventListener("ended", function() {
                    s = !0
                }, !0), a.load(), this.playSound = function() {
                    s && a.load();
                    try {
                        var e = a.play();
                        e && e.catch(e => {
                            debugLog(e)
                        })
                    } catch (e) {}
                    s = !1
                }, this.pauseSound = function() {
                    var e = a.pause();
                    e && e.catch(e => {
                        debugLog(e)
                    })
                }
            } else {
                cur.__sound_guid = cur.__sound_guid || 0;
                var n = ge("flash_sounds_wrap") || utilsNode.appendChild(ce("span", {
                        id: "flash_sounds_wrap"
                    })),
                    c = "flash_sound_" + cur.__sound_guid++;
                if (renderFlash(n, {
                        url: "/swf/audio_lite.swf?4",
                        id: c
                    }, {
                        swliveconnect: "true",
                        allowscriptaccess: "always",
                        wmode: "opaque"
                    }, {})) {
                    var l = browser.msie ? window[c] : document[c],
                        d = !1,
                        u = setInterval(function() {
                            if (l && l.paused) try {
                                l.setVolume(1), l.loadAudio(r), l.pauseAudio()
                            } catch (e) {
                                debugLog(e)
                            }
                            d = !0, clearInterval(u)
                        }, 300);
                    this.playSound = function() {
                        d && l.playAudio(0)
                    }, this.pauseSound = function() {
                        d && l.pauseAudio()
                    }
                }
            }
        }
        o.prototype = {
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
        }, window.Sound = o;
        i("a1Th"), i("Btvt"), i("0mN4");
        window.curRBox || (window.curRBox = {
            guid: 0,
            active: !1,
            focused: [],
            tabs: {}
        });

        function r(e, t) {
            var i = this;
            i.options = t = extend({
                minH: 50,
                minW: 50
            }, t), i.content = e;
            var a = i.id = "rb_box_" + (t.id || curRBox.guid++);
            i.wrap = ce("div", {
                id: a,
                className: "rb_box_wrap fixed" + (t.fixed ? " fc_fixed" : "")
            });
            var o = {};
            i.toBottom = i.toRight = !1, t.fixed ? (o.bottom = 0, o.right = 72) : (void 0 !== t.startTop ? o.top = t.startTop : void 0 !== t.startBottom && (o.bottom = t.startBottom), void 0 !== t.startLeft ? o.left = t.startLeft : void 0 !== t.startRight && (o.right = t.startRight)), setStyle(i.wrap, o), t.movable && addEvent(t.movable, "mousedown", i._head_mdown.bind(i)), i.resizeableH = t.resizeableH || e, t.startHeight && setStyle(i.resizeableH, "height", t.startHeight), i.resizeableW = t.resizeableW || e, t.startWidth && setStyle(i.resizeableW, "width", t.startWidth), addEvent(e, "mousedown", i._cont_mdown.bind(i)), t.closer && (addEvent(t.closer, "mousedown", i._close_mdown.bind(i)), addEvent(t.closer, "click", i._close_click.bind(i))), t.hider && (addEvent(t.hider, "mousedown", i._close_mdown.bind(i)), addEvent(t.hider, "click", i._hide_click.bind(i))), t.minimizer && !0 !== t.minimizer && (addEvent(t.minimizer, "mousedown", i._close_mdown.bind(i)), addEvent(t.minimizer, "click", i._min_toggle.bind(i))), i.wrap.appendChild(e), !1 !== t.resize && (i.resizeWrap = ce("div", {
                className: "rb_resize_wrap",
                innerHTML: '<div class="chats_sp rb_resize"></div>'
            }), i.wrap.appendChild(i.resizeWrap), addEvent(i.resizeWrap, "mousedown", i._resize_mdown.bind(i))), t.minimized && (addClass(i.wrap, "rb_minimized"), i.minimized = !0), bodyNode.insertBefore(i.wrap, ge("page_wrap"));
            var r = getStyle(i.wrap, "top"),
                s = getStyle(i.wrap, "bottom"),
                n = getStyle(i.wrap, "left"),
                c = getStyle(i.wrap, "right");
            this.toBottom = ("auto" === r || "" === r || browser.msie && 0 === r) && "auto" != s && "" !== s && !(browser.msie && 0 === s), this.toRight = ("auto" === n || "" === n || browser.msie && 0 === n) && "auto" != c && "" !== c && !(browser.msie && 0 === c), this.toRight && setStyle(i.wrap, {
                marginRight: lastWndScroll[0] ? sbWidth() : 0
            }), (t.nofocus || t.noshow) && addClass(i.wrap, "rb_inactive"), this.toBottom && (setStyle(i.wrap, {
                marginRight: lastWndScroll[0] ? sbWidth() : 0
            }), addClass(i.wrap, "fc_tobottom")), this.options.marginFixedToLayer && setStyle(i.wrap, {
                marginRight: hasClass(document.body, "layers_shown") ? sbWidth() : 0
            }), curRBox.tabs[a] = i, i.pos = !1, t.noshow ? (setStyle(i.wrap, {
                visibility: "hidden",
                display: "block"
            }), i._update_pos(), setStyle(i.wrap, {
                visibility: "",
                display: ""
            })) : i.show(!1, t.nofocus)
        }
        extend(r.prototype, {
            show: function(e) {
                function t(t, i) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t) {
                var i = this;
                void 0 === e && (e = 0), e ? (setStyle(i.wrap, {
                    opacity: 0,
                    display: "block"
                }), i.visible = !0, !t && i.focus(), animate(i.wrap, {
                    opacity: 1
                }, e, function() {
                    setStyle(i.wrap, browser.msie ? {
                        filter: "none"
                    } : {
                        opacity: ""
                    }), i._update_pos()
                })) : (show(i.wrap), i.visible = !0, !t && i.focus(), i._update_pos()), i.options.onShow && i.options.onShow()
            }),
            hide: function(e) {
                function t(t, i, a) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t, i) {
                var a = this;
                if (!t && a.options.onBeforeHide && a.options.onBeforeHide()) return !0;
                void 0 === e && (e = 0), e ? (setStyle(a.wrap, {
                    opacity: 1,
                    display: "block"
                }), animate(a.wrap, {
                    opacity: 0
                }, e, function() {
                    hide(a.wrap), setStyle(a.wrap, browser.msie ? {
                        filter: "none"
                    } : {
                        opacity: ""
                    })
                })) : hide(a.wrap), a.visible = !1, !t && a.options.onHide && a.options.onHide(i || {})
            }),
            _head_mdown: function(e) {
                if (!checkEvent(e)) {
                    (e.originalEvent || e).cancelBubble = !0;
                    var t, i, a = this,
                        o = e.target,
                        r = getWndInner(),
                        s = curRBox.active == a.id,
                        n = e.pageY,
                        c = e.pageX,
                        l = a.wrap.offsetHeight,
                        d = a.wrap.offsetWidth,
                        u = 0,
                        f = 0,
                        h = r[0] - l,
                        _ = r[1] - d,
                        p = browser.msie ? "selectstart" : "mousedown";
                    a.options.fixed && FastChat.pinTab(a.options.peer || -1, e, !0), s || a.focus(e), a.toBottom ? (a.toBottom = !1, t = r[0] - intval(getStyle(a.wrap, "bottom")) - l, setStyle(a.wrap, {
                        top: t,
                        bottom: "auto"
                    }), removeClass(a.wrap, "fc_tobottom")) : t = intval(getStyle(a.wrap, "top")), a.toRight ? (a.toRight = !1, i = r[1] - intval(getStyle(a.wrap, "right")) - d, setStyle(a.wrap, {
                        left: i,
                        right: "auto"
                    })) : i = intval(getStyle(a.wrap, "left")), u = t, f = i, cur._fcdrag = 1;
                    var v = function(e) {
                        return u = Math.max(0, Math.min(h, t + e.pageY - n)), h - u < 10 ? u = h : u < 10 && (u = 0), a.wrap.style.top = u + "px", f = Math.max(0, Math.min(_, i + e.pageX - c)), _ - f < 10 ? f = _ : f < 10 && (f = 0), a.wrap.style.left = f + "px", cancelEvent(e)
                    };
                    return addEvent(document, "mousemove", v), addEvent(document, "mouseup", function e(t) {
                        cur._fcdrag = 0, removeEvent(document, "mousemove", v), removeEvent(document, "mouseup", e), removeEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(o, "cursor", ""), (a.toBottom = u >= h - 5) && (setStyle(a.wrap, {
                            top: "auto",
                            bottom: 0
                        }), addClass(a.wrap, "fc_tobottom")), (a.toRight = f >= _ - 5) && setStyle(a.wrap, {
                            left: "auto",
                            right: 0,
                            marginRight: lastWndScroll[0] ? sbWidth() : 0
                        }), a._update_pos();
                        var i = Math.abs(t.pageY - n) < 3 && Math.abs(t.pageX - c) < 3;
                        cur._fcpromo > 0 ? cur._fcpromo = i ? 0 : -1 : a.options.minimizer && i ? !a.minimized && s ? a.minimize(!0) : a.minimized && a.unminimize(!0) : a.options.onDragEnd && a.options.onDragEnd(a.toBottom ? -1 : u / r[0], a.toRight ? -1 : f / r[1])
                    }), addEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(o, "cursor", "move"), !1
                }
            },
            _resize_mdown: function(e) {
                if (!checkEvent(e)) {
                    this.focus(e);
                    var t, i, a = this,
                        o = e.target,
                        r = getWndInner(),
                        s = e.pageY,
                        n = e.pageX,
                        c = a.wrap.offsetHeight,
                        l = a.wrap.offsetWidth,
                        d = 0,
                        u = 0,
                        f = a.resizeableH.clientHeight - intval(getStyle(a.resizeableH, "paddingBottom")) - intval(getStyle(a.resizeableH, "paddingTop")),
                        h = a.resizeableW.clientWidth - intval(getStyle(a.resizeableW, "paddingRight")) - intval(getStyle(a.resizeableW, "paddingLeft")),
                        _ = browser.msie ? "selectstart" : "mousedown",
                        p = !browser.msie && a.options.onResize || !1;
                    a.toBottom ? (a.toBottom = !1, t = r[0] - intval(getStyle(a.wrap, "bottom")) - c, setStyle(a.wrap, {
                        top: t,
                        bottom: "auto"
                    }), removeClass(a.wrap, "fc_tobottom")) : t = intval(getStyle(a.wrap, "top")), a.toRight ? (a.toRight = !1, i = r[1] - intval(getStyle(a.wrap, "right")) - l, setStyle(a.wrap, {
                        left: i,
                        right: "auto"
                    })) : i = intval(getStyle(a.wrap, "left")), a.options.onResizeStart && a.options.onResizeStart(f, h);
                    var v = f + r[0] - t - c,
                        m = h + r[1] - i - l,
                        g = function(e) {
                            return d = Math.max(a.options.minH, Math.min(v, f + e.pageY - s)), v - d < 10 && (d = v), a.resizeableH.style.height = d + "px", u = Math.max(a.options.minW, Math.min(m, h + e.pageX - n)), m - u < 10 && (u = m), a.resizeableW.style.width = u + "px", p && p(d, u), cancelEvent(e)
                        };
                    return addEvent(document, "mousemove", g), addEvent(document, "mouseup", function e(t) {
                        removeEvent(document, "mousemove", g), removeEvent(document, "mouseup", e), removeEvent(document, _, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(o, "cursor", ""), (a.toBottom = d == v) && (setStyle(a.wrap, {
                            top: "auto",
                            bottom: 0
                        }), addClass(a.wrap, "fc_tobottom")), (a.toRight = u == m) && setStyle(a.wrap, {
                            left: "auto",
                            right: 0,
                            marginRight: lastWndScroll[0] ? sbWidth() : 0
                        }), a._update_pos(), a.options.onResizeEnd && a.options.onResizeEnd(d, u, r[0], r[1], a.toBottom, a.toRight)
                    }), addEvent(document, _, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(o, "cursor", "move"), !1
                }
            },
            _update_pos: function() {
                var e = this;
                e.pos = [e.wrap.offsetTop, e.wrap.offsetLeft, e.wrap.offsetHeight, e.wrap.offsetWidth]
            },
            _wnd_resize: function(e, t, i) {
                var a = this;
                a.toBottom && (a.pos[0] = a.wrap.offsetTop), a.toRight && (a.pos[1] = a.wrap.offsetLeft);
                var o = {},
                    r = !1,
                    s = !1,
                    n = a.pos[0] + a.pos[2] - e,
                    c = a.pos[0],
                    l = a.resizeableH.clientHeight - a.options.minH,
                    d = a.pos[1] + a.pos[3] - t,
                    u = a.pos[1],
                    f = !1 !== a.options.resize ? a.resizeableW.clientWidth - a.options.minW : 0;
                i && (f < 0 && setStyle(a.resizeableW, a.options.minW), l < 0 && setStyle(a.resizeableH, a.options.minH)), (n <= 0 || c <= 0 && l <= 0) && (d <= 0 || u <= 0 && f <= 0) || (n > 0 && c > 0 && (n -= c = Math.min(n, c), o.top = a.pos[0] - c, o.bottom = ""), n > 0 && l > 0 && (l = Math.min(n, l), r = a.resizeableH.clientHeight - l), d > 0 && u > 0 && (d -= u = Math.min(d, u), o.left = a.pos[1] - u, o.right = ""), d > 0 && f > 0 && (f = Math.min(d, f), s = a.resizeableW.clientWidth - f), !1 !== s && setStyle(a.resizeableW, "width", s), !1 !== r && setStyle(a.resizeableH, "height", r), setStyle(a.wrap, o), a._update_pos(), a.options.onResize && a.options.onResize(a.resizeableH.clientHeight, a.resizeableW.clientWidth))
            },
            _cont_mdown: function(e) {
                if (curRBox.active != this.id && (this.focus(e), !hasClass(e.target, "fc_editable"))) return cancelEvent(e)
            },
            _focus: function() {
                var e = this,
                    t = indexOf(curRBox.focused, e.id),
                    i = curRBox.active,
                    a = i && curRBox.tabs[i];
                if (i != e.id) {
                    a && isFunction(a.options.onBlur) && a.options.onBlur(), -1 != t && curRBox.focused.splice(t, 1), curRBox.focused.unshift(e.id);
                    var o = 1e4 + curRBox.focused.length,
                        r = !0;
                    each(curRBox.focused, function(e, t) {
                        var i = curRBox.tabs[t].wrap;
                        r ? (addClass(i, "rb_active"), removeClass(i, "rb_inactive"), curRBox.active = t, r = !1) : (removeClass(i, "rb_active"), addClass(i, "rb_inactive")), setStyle(i, "zIndex", o), o--
                    })
                }
            },
            _hide_click: function() {
                this.hide()
            },
            minimize: function(e) {
                var t = this,
                    i = t.wrap;
                if (t.options.fixed) return !1;
                addClass(i, "rb_minimized"), t.minimized = !0, t._update_pos(), e && t.options.onMinimize && t.options.onMinimize(0)
            },
            unminimize: function(e) {
                var t = this,
                    i = t.wrap,
                    a = getWndInner();
                removeClass(i, "rb_minimized"), t.minimized = !1, t._update_pos(), t._wnd_resize(a[0], a[1], !0), curRBox.active = !1, t.focus(), e && t.options.onMinimize && t.options.onMinimize(1)
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
                    i = curRBox.active != t.id || !0;
                return t._focus(), i && isFunction(t.options.onFocus) && t.options.onFocus(e), i
            },
            close: function() {
                var e = this,
                    t = e.pos;
                e._close(), isFunction(e.options.onClose) && e.options.onClose(t)
            }
        }), window.RBox = r;
        i("zNZe"), i("rE2o"), i("ioFf"), i("tUrg"), i("Vd3H"), i("SRfc"), i("Oyvg"), i("KKXr"), i("pIFo"), i("91GP"), i("rGqo"), i("OEbY"), i("VRzm");
        var s = i("uytb"),
            n = i("rjmT"),
            c = i("p3re"),
            l = i("f01n"),
            d = i("hOuX"),
            u = i("BxOC"),
            f = i("DM26"),
            h = i("XzvV"),
            _ = i("MhhX"),
            p = i("P13b"),
            v = i("vT4u");

        function m(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var i = [],
                    a = !0,
                    o = !1,
                    r = void 0;
                try {
                    for (var s, n = e[Symbol.iterator](); !(a = (s = n.next()).done) && (i.push(s.value), !t || i.length !== t); a = !0);
                } catch (e) {
                    o = !0, r = e
                } finally {
                    try {
                        a || null == n.return || n.return()
                    } finally {
                        if (o) throw r
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function g() {
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
                    ldb: Object(s.c)(vk.id),
                    myTypingEvents: {},
                    typingEvents: {},
                    inited: !0,
                    options: e,
                    posSeq: 0,
                    error_timeout: 1,
                    lpInstance: Notifier.getLpInstance()
                }), delete curFastChat.standby, delete curFastChat.standbyTO, curFastChat.lpInstance.onData(function() {
                    for (var e = arguments.length, i = new Array(e), a = 0; a < e; a++) i[a] = arguments[a];
                    var o = t.getResourcesThatShouldBeLoaded(i);
                    (o.shouldLoad ? t.loadResources(o) : Promise.resolve()).then(() => {
                        i.forEach(e => {
                            switch (e.type) {
                                case l.ab:
                                    var i = t.getTab(e.peerId);
                                    t.setTyping(e), i && (t.updateTypings(), t.waitTyping(e).then(t.updateTypings)), t.blinkTyping(e.peerId);
                                    break;
                                case l.a:
                                    var a = t.getTab(e.peerId);
                                    t.setTyping(e), a && (t.addMessage(t.prepareMessageData(e)), t.scroll(e.peerId), t.blinkTab(e.peerId), t.updateTypings(), t.waitTyping(e).then(t.updateTypings)), t.updateTabUnreadCounter(a, e);
                                    break;
                                case l.g:
                                case l.R:
                                    var o = e.peerId,
                                        r = e.messageId,
                                        s = t.getTab(o);
                                    s && s.msgs[r] && (delete curFastChat.gotMedia[r], t.editMessage(t.prepareMessageData(e)));
                                    break;
                                case l.Q:
                                case l.Y:
                                case l.U:
                                    e.flags & l.j && t.deleteMessage(t.prepareMessageData(e));
                                    break;
                                case l.J:
                                case l.K:
                                    t.markMessagesAsRead(e);
                                    break;
                                case l.d:
                                case l.e:
                                    var n = t.getTab(e.peerId);
                                    t.handleEventChatUpdated(n, e);
                                    break;
                                case l.cb:
                                case l.bb:
                                case l.I:
                                case l.h:
                                case l.W:
                                case l.O:
                                case l.Z:
                                case l.V:
                                case l.H:
                                case l.b:
                                case l.c:
                                case l.i:
                                case l.S:
                                case l.f:
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
                var e = ["friends", "friends_version", "onlines", "tpl", "lang", "me", "version"].reduce((e, t) => (e[t] = curFastChat[t], e), {});
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
                ! function i() {
                    if (!curNotifier.is_server) return clearTimeout(curFastChat.standbyTO), void(curFastChat.standbyTO = setTimeout(i, 1e3 * t));
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
                            return t *= 2, clearTimeout(curFastChat.standbyTO), curFastChat.standbyTO = setTimeout(i, 1e3 * t), !0
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
                        if (g()) break;
                        FastChat.standby(t.version);
                        break;
                    case "gotConfig":
                        FastChat.gotConfig(t.navVersion, t.config);
                        break;
                    case "clistOnlines":
                        if (g()) break;
                        FastChat.clistGotOnlines(t);
                        break;
                    case "needPeer":
                        if (g()) break;
                        var i, a = t.id,
                            o = curFastChat.tabs[a],
                            r = !1;
                        if (void 0 !== o)
                            for (var s in r = {
                                    name: o.name,
                                    photo: o.photo,
                                    fname: o.fname,
                                    hash: o.hash,
                                    sex: o.sex,
                                    data: o.data,
                                    online: o.online
                                }, o.msgs) {
                                r.history = [o.log.innerHTML, o.msgs];
                                break
                            } else(i = curFastChat.friends[a + "_"]) && (r = {
                                name: i[0],
                                photo: i[1],
                                fname: i[2],
                                hash: i[3],
                                data: i[4],
                                online: curFastChat.onlines[a]
                            });
                        if (!1 === r) break;
                        curFastChat.gotPeers[a] = setTimeout(function() {
                            var e = {};
                            e[a] = r, FastChat.lcSend("gotPeers", e)
                        }, curNotifier.is_server ? 0 : irand(50, 100));
                        break;
                    case "fetchingPeers":
                        if (g()) break;
                        each(t, function(e, t) {
                            var i = curFastChat.needPeers[e];
                            i && (t & i[0]) == i[0] && clearTimeout(i[2])
                        });
                        break;
                    case "gotPeers":
                        if (g()) break;
                        FastChat.gotPeers(t);
                        break;
                    case "stateChange":
                        if (g()) break;
                        FastChat.onStateChanged(t);
                        break;
                    case "needMedia":
                        var n = t.msgId;
                        if (void 0 === (l = curFastChat.gotMedia[n]) || 0 === l) break;
                        curFastChat.gotMedia[n][3] = setTimeout(function() {
                            FastChat.lcSend("gotMedia", {
                                msgId: n,
                                peer: l[0],
                                text: l[1],
                                msgOpts: l[2]
                            })
                        }, curNotifier.is_server ? 0 : irand(50, 100));
                        break;
                    case "fetchingMedia":
                        n = t.msgId;
                        var c = curFastChat.needMedia[n];
                        if (void 0 === c || 0 === curFastChat.gotMedia[n]) break;
                        clearTimeout(c[1]), c[1] = setTimeout(FastChat.loadMsgMedia.pbind(c[0], n), 1e3);
                        break;
                    case "gotMedia":
                        n = t.msgId;
                        var l = curFastChat.gotMedia[n];
                        isArray(l) && clearTimeout(l[3]), FastChat.gotMsgMedia(t.peer, n, t.text, t.msgOpts)
                }
            },
            getResourcesThatShouldBeLoaded(e) {
                var t = {},
                    i = e.filter(e => e.type === l.a),
                    a = e.filter(_.l),
                    o = i.filter(e => !this.isTabLoaded(e.peerId)).map(e => e.peerId);

                function r(e, i) {
                    var a = FastChat.getTab(e);
                    Object(p.ib)(e) && i && a && !a.data.members[i] && (t[e] ? -1 === t[e].indexOf(i) && t[e].push(i) : t[e] = [i])
                }
                return i.forEach(e => {
                    this.isTabLoaded(e.peerId) && r(e.peerId, e.userId)
                }), a.forEach(e => {
                    r(e.peerId, +e.kludges.source_mid)
                }), {
                    shouldLoad: Object.keys(t).length > 0 || o.length > 0,
                    needPeers: o,
                    needMembers: t
                }
            },
            loadResources(e) {
                var t = e.needMembers,
                    i = curFastChat.lpInstance;
                return i.pause(), this.loadMembers(t).then(() => i.resume())
            },
            loadMembers(e) {
                if (0 === Object.keys(e).length) return Promise.resolve();
                var t = Object.keys(e).map(t => `${t}:${e[t].join(",")}`).join(";");
                return Object(u.b)(v.e, {
                    act: "a_load_member",
                    need: t
                }).then(t => {
                    var i = m(t, 1)[0];
                    Object.keys(e).forEach(t => {
                        var a = this.getTab(t);
                        a && a.data && a.data.members && (a.data.members = e[t].reduce((e, t) => {
                            var a = i.find(e => e.id === t);
                            return e[t] = Object.assign({
                                name_inv_case: a.inv_name,
                                name_kick_case: a.kick_name
                            }, a), e
                        }, a.data.members))
                    })
                })
            },
            handleEventChatUpdated(e, t) {
                switch (t.updateType) {
                    case l.C:
                    case l.v:
                        var i = [t.peerId, 0].join(",");
                        this.loadPeers(i, e => {
                            this.updateChatInfo(t.peerId, e)
                        });
                        break;
                    case l.t:
                    case l.y:
                    case l.B:
                    case l.D:
                    case l.F:
                    case l.E:
                    case l.u:
                    case l.w:
                    case l.z:
                }
            },
            updateChatInfo(e, t) {
                var i = this.getTab(e),
                    a = t[e],
                    o = a.photo,
                    r = a.grid,
                    s = a.name,
                    n = document.querySelector(`#chat_tab_icon_${e} .chat_tab_img`),
                    c = document.createElement(o ? "img" : "div"),
                    l = i && i.unread ? " (" + i.unread + ")" : "";
                i && i.title && (i.name = s, i.title.innerHTML = s + l), c.classList.add("chat_tab_img"), r ? c.innerHTML = `<div class="chat_tab_grid">${r}</div>` : o && (c.id = `im_dialog_ph${e-2e9}`, c.src = o), n && n.parentNode.replaceChild(c, n)
            },
            blinkEl: function(e, t, i) {
                if (t > 10) return i(), !1;
                t % 2 == 0 ? animate(e, {
                    opacity: 0
                }, 400, function() {
                    FastChat.blinkEl(e, t + 1, i)
                }) : animate(e, {
                    opacity: 1
                }, 400, function() {
                    setTimeout(function() {
                        FastChat.blinkEl(e, t + 1, i)
                    }, 400)
                })
            },
            blinkTyping: function(e) {
                var t = ge("chat_tab_icon_" + e);
                if (t) {
                    var i = geByClass1("chat_tab_typing_wrap", t);
                    fadeIn(i, 150, function() {
                        FastChat.blinkEl(i.firstChild, 0, function() {
                            fadeOut(i, 150)
                        })
                    })
                }
            },
            imFeed: function(e, t) {
                var i = this.getTab(e);
                if (!i) return !1;
                i.auto && !i.unread && (i.box._close(!0), delete curFastChat.tabs[e])
            },
            tabNotify: function(e, t, i) {
                var a, o = curFastChat.tabs[e];
                if (e > 0 && e < 2e9 && isFunction(cur.onPeerStatusChanged) && cur.onPeerStatusChanged(e, t, i), !(e <= 0) && o && o.box && !o.box.minimized) {
                    switch (clearTimeout(o.hideNotifyTO), t) {
                        case "online":
                            a = getLang("mail_im_user_became_online", 3 - o.sex), FastChat.blinkTab(e);
                            break;
                        case "offline":
                            a = getLang("mail_im_user_became_offline", 3 - o.sex), FastChat.blinkTab(e);
                            break;
                        case "unavail":
                            a = getLang("mail_im_not_online", 3 - o.sex).replace(/\.$/, "")
                    }
                    a = a.replace("{user}", o.fname), val(o.notify, '<div class="fc_tab_notify fc_tab_notify_' + t + '">' + a + "</div>");
                    var r = o.notify.firstChild;
                    clearTimeout(o.hideNotifyTO), o.hideNotifyTO = setTimeout(function() {
                        fadeOut(r, 200, function() {
                            val(o.notify, "")
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
                    var i = curFastChat.options.state || !1,
                        a = !curFastChat.friendsCnt || (i && void 0 !== i.clist.min ? i.clist.min : t[1] < 1200 || curFastChat.friendsCnt < 5);
                    curFastChat.clistW = 270, curFastChat.clistH = 299;
                    var o = {
                        id: "fc_clist",
                        movable: geByClass1("fc_tab_head", e.clistWrap),
                        hider: geByClass1("fc_tab_close_wrap", e.clistWrap, "a"),
                        startHeight: curFastChat.clistH,
                        startWidth: curFastChat.clistW,
                        resizeableH: e.clist,
                        resize: !1,
                        minH: 150,
                        fixed: a,
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
                    i && !a && (!1 !== i.clist.x && (-1 == i.clist.x ? o.startRight = 0 : o.startLeft = t[1] * i.clist.x), !1 !== i.clist.y && (-1 == i.clist.y ? o.startBottom = 0 : o.startTop = t[0] * i.clist.y)), a && (o.noshow = !0), void 0 === o.startTop && void 0 === o.startBottom && (o.startTop = t[0] < 800 ? 0 : .1 * t[0]), void 0 === o.startLeft && void 0 === o.startRight && (o.startRight = 0), curFastChat.clistBox = new RBox(e.clistWrap, o), o.noshow || void 0 === o.startLeft && void 0 === o.startTop || curFastChat.clistBox._wnd_resize(t[0], t[1], !0), curFastChat.clistBoxScroll = new Scrollbar(e.clist, {
                        prefix: "fc_",
                        scrollChange: FastChat.clistShowMore,
                        nomargin: !0,
                        global: !0,
                        nokeys: !0,
                        right: vk.rtl ? "auto" : 1,
                        left: vk.rtl ? 1 : "auto"
                    }), curFastChat.updateFriendsInt = setInterval(FastChat.clistUpdate, 18e4);
                    var r, s = ge("fc_clist_filter");
                    if (placeholderInit(s, {
                            global: !0
                        }), curFastChat.q = "", addEvent(s, "keyup " + (browser.opera ? "keypress" : "keydown"), function(e) {
                            if (e.keyCode == KEY.ESC) return FastChat.clistHide(), cancelEvent(e);
                            var t = FastChat.clistFilterKey(e);
                            if (void 0 !== t) return t;
                            curFastChat.q = trim(val(this)), FastChat.clistRender()
                        }), e.clistOnline) bodyNode.appendChild(r = ce("nobr", {
                        className: "fl_l",
                        innerHTML: getLang("mail_im_clist_onlines")
                    }, {
                        visibility: "hidden",
                        position: "absolute"
                    })), re(r), addEvent(e.clistOnline, "mouseover", function(t) {
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
                    }), i && i.clist && i.clist.onlines && FastChat.clistToggleOnlines(!0);
                    a ? FastChat.clistUpdateTitle() : FastChat.clistRender(), curFastChat.ready = !0, i && i.tabs && each(i.tabs, function(e, i) {
                        e = intval(e);
                        var a = {
                            nofocus: 1
                        };
                        this.min && (a.minimized = !0), this.h && (a.startHeight = this.h * t[0]), this.w && (a.startWidth = this.w * t[1]), void 0 !== this.x && this.x <= 1 && (this.x < 0 ? a.startRight = 0 : a.startLeft = t[1] * this.x), void 0 !== this.y && this.y <= 1 && (this.y < 0 ? a.startBottom = 0 : a.startTop = t[0] * this.y), i.fx ? (a.fixedLoad = !0, FastChat.prepareTabIcon(e, a, !0)) : (a.noAnim = !0, FastChat.addPeer(e, !1, !1, a))
                    }), addEvent(Chat.itemsCont, "mousemove mouseover", FastChat.itemsTT), addEvent(Chat.itemsCont, "mouseout", FastChat.itemsOut)
                }
            },
            itemsOffset: 12,
            itemsTT: function(e) {
                for (var t = e.target, i = !1; t && t != Chat.itemsCont;) {
                    if (hasClass(t, "chat_tab_wrap")) {
                        i = t;
                        break
                    }
                    t = t.parentNode
                }
                if (!i) return clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, !1;
                var a = i.id.split("_")[3],
                    o = Chat.tabs[a];
                return !!o && (curFastChat.activeBox && curFastChat.activeBox.visible && curFastChat.activeBox.options.peer == a ? (FastChat.itemsOut(), !1) : (clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, showTooltip(i, {
                    text: o.name,
                    slideX: 15,
                    black: 1,
                    asrtl: 1,
                    appendEl: Chat.ttNode,
                    className: "tt_black_side",
                    shift: [-58, -37, 0]
                }), void(Chat.ttPeer = i)))
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
                    i = e.peer ? t && t.box : curFastChat.clistBox,
                    a = getWndInner();
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
                        var o = {
                            startHeight: intval(a[0] * e.h),
                            startWidth: intval(a[1] * e.w)
                        }; - 1 == e.y ? o.startBottom = 0 : o.startTop = intval(a[0] * e.y), -1 == e.x ? o.startRight = 0 : o.startLeft = intval(a[1] * e.x), FastChat.addPeer(e.peer, !1, !1, o);
                        break;
                    case "closed":
                        if (Chat.tabs[e.peer] && FastChat.closeTabIcon(e.peer), !t || !i) break;
                        i.close();
                        break;
                    case "hidden":
                        if (!t || !i) break;
                        i.close();
                        break;
                    case "minimized":
                        if (!t || !i) break;
                        e.val ? i.unminimize() : i.minimize();
                        break;
                    case "moved":
                        setStyle(i.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(a[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(a[1] * e.x) : "auto"
                        }), i.toBottom = -1 == e.y, i.toRight = -1 == e.x;
                        break;
                    case "resized":
                        setStyle(i.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(a[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(a[1] * e.x) : "auto"
                        }), i.toBottom = -1 == e.y, i.toRight = -1 == e.x;
                        var r = intval(a[1] * e.w);
                        setStyle(i.resizeableH, "height", intval(a[0] * e.h)), setStyle(i.resizeableW, "width", r), FastChat.fixResized(t, r);
                        break;
                    case "clist_toggled":
                        e.val ? i.show(0, !0) : i.hide(0, !0), toggle(curFastChat.el.topLink, !e.val);
                        break;
                    case "clist_moved":
                        setStyle(i.wrap, {
                            bottom: -1 == e.y ? 0 : "auto",
                            top: -1 != e.y ? intval(a[0] * e.y) : "auto",
                            right: -1 == e.x ? 0 : "auto",
                            left: -1 != e.x ? intval(a[1] * e.x) : "auto"
                        }), i.toBottom = -1 == e.y, i.toRight = -1 == e.x;
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
                    var t, i = [];
                    for (t in curFastChat.tabs) i.push(t);
                    for (t in Chat.tabs) i.push(t);
                    ajax.post("al_im.php", {
                        act: "a_onlines",
                        peer: i.join(",")
                    }, {
                        onDone: function(e) {
                            FastChat.clistGotOnlines(e), FastChat.lcSend("clistOnlines", e)
                        },
                        onFail: () => !0
                    })
                }
            },
            clistGotOnlines: function(e) {
                var t = curFastChat.onlines,
                    i = [];
                curFastChat.onlines = e, curNotifier.idle_manager && curNotifier.idle_manager.is_idle || !curFastChat.tabs && Chat.tabs || (each(curFastChat.tabs, function(a) {
                    curFastChat.onlines[a] != t[a] && (FastChat.tabNotify(a, e[a] ? "online" : "offline", e[a]), e[a] || (i[a] = 1))
                }), each(Chat.tabs, function(i) {
                    if (curFastChat.onlines[i] != t[i]) {
                        var a = geByClass1("_chat_tab_image", ge("chat_tab_icon_" + i));
                        toggleClass(a, "online", e[i]), toggleClass(a, "mobile", e[i] && mobPlatforms[e[i]])
                    }
                }), i = arrayKeyDiff(t, e, i), each(i, function(e) {
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
                    i = !e,
                    a = 1 + (e ? 40 : 20),
                    o = curFastChat.q,
                    r = !1,
                    s = !1,
                    n = !1;
                if (o ? (n = [], each(FastChat.clistCache(o), function() {
                        n.push(escapeRE(this))
                    }), n = new RegExp("([ -]|^|s|&nbsp;|\b)(" + n.join("|") + ")", "gi"), r = curFastChat.clistCache[o] || {}) : curFastChat.clOnlines && (r = curFastChat.onlines), curFastChat.clHasMore = !1, each(curFastChat.friends, function(e) {
                        var o = intval(e),
                            c = !r || r[o];
                        if (i) {
                            if (c) {
                                if (!--a) return curFastChat.clHasMore = !0, !1;
                                t.push(FastChat.clistWrapPeer(o, this, n)), s = o
                            }
                        } else o == curFastChat.clOffset && (i = !0)
                    }), !1 !== s || e || o ? o && !curFastChat.clHasMore && t.push(FastChat.getCorrespondents(o, n, !1 === s)) : t.push('<div class="fc_clist_empty">' + getLang(o ? "mail_im_clist_notfound" : "mail_im_clist_empty") + "</div>"), curFastChat.clOffset = s, e) {
                    for (var c = ce("div", {
                            innerHTML: t.join("")
                        }), l = document.createDocumentFragment(); c.firstChild;) l.appendChild(c.firstChild);
                    curFastChat.el.clist.appendChild(l), curFastChat.clHasMore || FastChat.clistUpdateTitle(!0)
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
            clistWrapPeer: function(e, t, i) {
                var a, o, r = curFastChat.tabs[e] ? curFastChat.tabs[e].unread : 0,
                    s = curFastChat.onlines[e],
                    n = onlinePlatformClass(s),
                    c = (t[0] || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                if (i && (c = c.replace(i, '$1<em class="fc_clist_hl">$2</em>')), e > 0 && e < 2e9 ? (a = "/id" + e, o = 'onmousemove="FastChat.clistPeerOver(this.parentNode, 2);"  onmouseout="FastChat.clistPeerOver(this.parentNode, 1);"') : (a = "/im?sel=" + e, o = ""), e > 2e9 && t[3]) var l = t[3];
                else l = '<img src="' + Notifier.fixPhoto(t[1]) + '" class="fc_contact_photo"/>';
                return '<a href="' + a + '" class="fc_contact clear_fix" id="fc_contact' + e + '" onclick="return FastChat.selectPeer(' + e + ', event, { entrypoint: \'fastchat_search\' });" onmousedown="event.cancelBubble = true;" onmouseover="FastChat.clistPeerOver(this, 1, event);"  onmouseout="FastChat.clistPeerOver(this, 0, event);"><span class="fc_contact_photo' + n + '" ' + o + ">" + l + '</span><span class="fc_contact_status"></span><span class="fc_contact_name">' + c + '<span id="fc_contact_unread' + e + '" class="fc_contact_unread">' + (r ? " <b>+" + r + "</b>" : "") + "</span></span></a>"
            },
            clistPeerOver: function(e, t, i) {
                if (e && checkOver(i, e)) {
                    var a = e.id.substr(10);
                    curFastChat.clSel && t && curFastChat.clSel != a && FastChat.clistPeerOver(ge("fc_contact" + curFastChat.clSel), 0), toggleClass(e, "fc_contact_over", t), t ? curFastChat.clSel = a : curFastChat.clSel == a && (curFastChat.clSel = !1)
                }
            },
            authorOver: function(e, t) {
                var i = e.getAttribute("data-title"),
                    a = gpeByClass("fc_tab_log", e),
                    o = !1;
                if (e.getBoundingClientRect().top - a.getBoundingClientRect().top < 10 && (o = !0), i) {
                    var r = e.getAttribute("data-date");
                    r && (i += "<br>" + r), showTooltip(e, {
                        text: '<div class="fc_author_tt">' + i + "</div>",
                        black: 1,
                        center: 1,
                        forcetodown: o,
                        shift: [1, 8, 0]
                    })
                }
            },
            getCorrespondents: function(e, t, i) {
                return clearTimeout(curFastChat.correspondentsTO), curFastChat.correspondents && void 0 !== curFastChat.correspondents[e] ? FastChat.wrapCorrespondents(curFastChat.correspondents[e]) || i && '<div class="fc_clist_empty">' + getLang("mail_im_clist_notfound") + "</div>" || "" : (curFastChat.correspondentsTO = setTimeout(FastChat.loadCorrespondents.pbind(e, t), 100), '<div id="fc_correspondents"></div>')
            },
            loadCorrespondents: function(e, t) {
                e == curFastChat.q && ajax.post("hints.php", {
                    act: "a_json_friends",
                    str: e,
                    from: "fc",
                    allow_multi: 1
                }, {
                    onDone: function(i) {
                        curFastChat.correspondents || (curFastChat.correspondents = {});
                        var a, o = {};
                        if (each(i, function() {
                                a = this[3] + "_", curFastChat.friends[a] || (o[a] = [this[1], this[2], this[3], this[4] || ""])
                            }), curFastChat.correspondents[e] = o, e == curFastChat.q) {
                            var r = ge("fc_correspondents");
                            if (r) {
                                var s = r.parentNode,
                                    n = ce("div", {
                                        innerHTML: FastChat.wrapCorrespondents(o, t)
                                    }),
                                    c = document.createDocumentFragment();
                                if (n.firstChild)
                                    for (; n.firstChild;) c.appendChild(n.firstChild);
                                else s.firstChild == r && c.appendChild(ce("div", {
                                    className: "fc_clist_empty",
                                    innerHTML: getLang("mail_im_clist_notfound")
                                }));
                                s.replaceChild(c, r), FastChat.clistUpdateTitle(!0), curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
                            }
                        }
                    }
                })
            },
            wrapCorrespondents: function(e, t) {
                var i = [];
                return each(e, function(e) {
                    i.push(FastChat.clistWrapPeer(intval(e), this, t))
                }), i.join("")
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
                    var i = curFastChat.tabs[curFastChat.activeBox.options.peer];
                    if (i && (trim(Emoji.editableVal(i.txt)) || i.imMedia && i.imMedia.getMedias().length)) return !0;
                    curFastChat.activeBox.hide()
                }
            },
            clistCache: function(e) {
                if (e) {
                    var t, i, a, o, r, s, n, c, l = [e];
                    if ((i = parseLatin(e)) && l.push(i), (i = parseLatKeys(e)) && l.push(i), (i = parseCyr(e)) && l.push(i), void 0 !== curFastChat.clistCache[e]) return l;
                    for (a in c = curFastChat.clistCache[e] = {}, l)
                        if (t = l[a], r = curFastChat.clistCache[" " + t.charAt(0).toLowerCase()])
                            for (o in s = new RegExp("(^|\\s|\\()" + escapeRE(t), "gi"), r) n = curFastChat.friends[o + "_"], isArray(n) && null !== n[0].match(s) && (c[o] = 1);
                    for (a in o = 0, c) o++;
                    return c._num = o, l
                }
                var d, u, f;
                for (a in curFastChat.clistCache = {}, curFastChat.friends)
                    for (d = curFastChat.friends[a][0], a = intval(a), u = 0; f = " " + d.charAt(u).toLowerCase(), curFastChat.clistCache[f] || (curFastChat.clistCache[f] = {}), curFastChat.clistCache[f][a] = 1, -1 != (u = d.indexOf(" ", u + 1));) ++u
            },
            clistShowMore: function() {
                if (curFastChat.clHasMore) {
                    var e = curFastChat.el.clist;
                    e.scrollTop + 3 * e.clientHeight > e.scrollHeight && FastChat.clistRender(!0)
                }
            },
            clistUpdateTitle: function(e) {
                var t, i = 0,
                    a = 0;
                for (t in curFastChat.friends) curFastChat.onlines[intval(t)] ? (a++, i++) : curFastChat.clOnlines || i++;
                var o = window.newVal = (a ? getLang("mail_im_X_onlines_title", a) : getLang("mail_im_onlines_title")).toString();
                FastChat.updateFriends(a), val(curFastChat.el.clistTitle, o), val(curFastChat.el.topLink, o.toLowerCase()), curFastChat.clistBoxScroll && (!curFastChat.clHasMore && e ? i = curFastChat.el.clist.childNodes.length : curFastChat.q && (i = intval((curFastChat.clistCache[curFastChat.q] || {})._num)), curFastChat.clistBoxScroll.options.contHeight = 50 * i)
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
                                var i = e.keyCode == KEY.DOWN ? "nextSibling" : "previousSibling",
                                    a = t;
                                do {
                                    a = a[i]
                                } while (a && (1 != a.nodeType || !hasClass(a, "fc_contact")))
                            } else curFastChat.clSel || e.keyCode != KEY.DOWN || (a = geByClass1("fc_contact", curFastChat.el.clist, "a"));
                            if (a && a != t) {
                                FastChat.clistPeerOver(a, 1);
                                var o = curFastChat.el.clist;
                                a.offsetTop + 16 > o.clientHeight + o.scrollTop ? (o.scrollTop = a.offsetTop + 16 - o.clientHeight, curFastChat.clistBoxScroll.update()) : a.offsetTop - 36 < o.scrollTop && (o.scrollTop = a.offsetTop - 36, curFastChat.clistBoxScroll.update())
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
                            var r = ge("fc_clist_filter"),
                                s = val(r) || curFastChat.clSel;
                            r.blur(), val(r, curFastChat.q = ""), curFastChat.clSel = !1, s && FastChat.clistRender()
                        }
                        break;
                    default:
                        return
                }
                return cancelEvent(e)
            },
            prepareTabIcon: function(e, t, i) {
                var a = curFastChat.friends && curFastChat.friends[e + "_"];
                if (a) {
                    var o = {
                        name: a[0],
                        photo: a[1],
                        online: curFastChat.onlines[e]
                    };
                    FastChat.addTabIcon(e, o, i)
                } else {
                    curFastChat.needPeers[e] = [3, !1, setTimeout(FastChat.getPeers, irand(150, 200)), t]
                }
            },
            addTabIcon: function(e, t, i) {
                if (Chat.itemsCont && !Chat.tabs[e]) {
                    if (e > 2e9) var a = t.data.members_grid_fc || "";
                    else a = '<img class="chat_tab_img" src="' + t.photo + '"/>';
                    if (e > 2e9) var o = "im?sel=c" + (e - 2e9);
                    else o = t.alink || "/id" + e;
                    var r = onlinePlatformClass(t.online),
                        s = se('<a class="chat_tab_wrap' + (i ? "" : " chat_tab_beforeanim") + '" id="chat_tab_icon_' + e + '" href="' + o + '" onclick="FastChat.itemsOut();return FastChat.togglePeer(' + e + ', event);"><div class="chat_tab_imgcont _chat_tab_image' + r + '"><div class="chat_tab_close" onclick="return FastChat.closeTabIcon(' + e + ', event)"></div>' + a + '</div><div class="chat_tab_typing_wrap"><div class="chats_sp chat_tab_typing_icon"></div></div><div class="chat_tab_counter"></div></a>');
                    Chat.itemsCont.insertBefore(s, Chat.itemsCont.firstChild), Chat.tabs[e] = {
                        el: s,
                        name: t.name
                    }, addClass(Chat.wrap, "chat_expand"), i || removeClass(s, "chat_tab_beforeanim"), FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = 0
                }
            },
            checkChatHeight: function() {
                var e = getSize(Chat.itemsCont)[1];

                function t() {
                    addEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap)
                }

                function i() {
                    removeEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap)
                }
                Chat.lastHeight = e, e > Chat.maxHeight ? (Chat.fixH || (Chat.fixH = !0, addClass(Chat.scrollNode, "chat_fix_height"), setStyle(Chat.scrollNode, {
                    height: Chat.maxHeight
                }), addEvent(Chat.scrollNode, "mouseenter", t), addEvent(Chat.scrollNode, "mouseleave", i), FastChat.checkShadow()), Chat.scrollNode.scrollTop = e - Chat.maxHeight) : Chat.fixH && (Chat.fixH = !1, removeClass(Chat.scrollNode, "chat_fix_height"), setStyle(Chat.scrollNode, {
                    height: "auto"
                }), removeEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap), removeEvent(Chat.scrollNode, "mouseenter", t), removeEvent(Chat.scrollNode, "mouseleave", i), FastChat.checkShadow())
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
            selectPeer: function(e, t, i) {
                if (checkEvent(t)) return !0;
                var a = hasClass(Chat.wrap, "chat_active");
                if (curFastChat.tabs && curFastChat.tabs[e]) {
                    var o = curFastChat.tabs[e].box;
                    o.minimized && o.unminimize(!0), FastChat.activateTab(e), FastChat.movePointer(e, a)
                } else i || (i = {}), i.fixed = !0, i.onPeerAdded = function() {
                    FastChat.movePointer(e, a)
                }, i.onHistoryLoaded = FastChat.readLastMessages.pbind(e), FastChat.addPeer(e, !1, !0, i);
                return curFastChat.tabs[e] && curFastChat.tabs[e].iman && (curFastChat.tabs[e].entrypoint = i && i.entrypoint, curFastChat.tabs[e].iman.unidle()), FastChat.trackActivity("open"), !1
            },
            closeTabIcon: function(e, t, i) {
                curFastChat.activeBox && curFastChat.activeBox.options.peer == e && !i && (curFastChat.activeBox.hide(), FastChat.setActive(!1));
                var a = ge("chat_tab_icon_" + e);
                addClass(a, "chat_tab_hiding"), delete Chat.tabs[e], curFastChat.tabs[e] && curFastChat.tabs[e].box.options.fixed && (curFastChat.tabs[e].iman.stop(), delete curFastChat.tabs[e]);
                return animate(a, {
                    height: 0,
                    opacity: 0
                }, {
                    duration: 100,
                    onComplete: function() {
                        re(a), a && (a = !1, curFastChat.activeBox && FastChat.movePointer(curFastChat.activeBox.options.peer, !0));
                        var e = Chat.scrollNode.scrollTop;
                        FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = e
                    }
                }), i || FastChat.stateChange({
                    op: "closed",
                    peer: e
                }), Object.keys(Chat.tabs).length || removeClass(Chat.wrap, "chat_expand"), FastChat.itemsOut(), cancelEvent(t)
            },
            getPointerShift: function(e, t, i) {
                var a = i - t,
                    o = Chat.maxHeight + 32;
                return e && a < 62 ? a - 62 : e && a > o ? a - o : 0
            },
            setPointer: function(e, t, i) {
                if (!curFastChat.activeBox) return !1;
                var a = FastChat.getPointerShift(e, t, i),
                    o = geByClass1("fc_tab_pointer", curFastChat.activeBox.wrap);
                return setStyle(o, {
                    marginTop: t + a
                }), a
            },
            movePointer: function(e, t) {
                if (!curFastChat.activeBox) return !1;
                var i = geByClass1("fc_pointer_offset", curFastChat.activeBox.wrap);
                if (e) {
                    var a = ge("chat_tab_icon_" + e);
                    if (!a) return !1;
                    if (!Chat.fixH && a.nextSibling) var o = getXY(a.nextSibling)[1] - 50;
                    else if (a.nextSibling || Chat.fixH) o = getXY(a)[1] + Chat.scrollNode.scrollTop;
                    else o = getXY(ge("chat_tab_wrap"))[1] - 50;
                    var r = 23 + getXY(Chat.cont)[1] - o,
                        s = -Chat.scrollNode.scrollTop
                } else r = 28, s = 0;
                var n = FastChat.setPointer(e, s, r);
                if (t) {
                    if (curFastChat.prevPointer) {
                        var c = FastChat.getPointerShift(!0, s + n, curFastChat.prevPointer);
                        setStyle(i, {
                            bottom: curFastChat.prevPointer - c + n
                        })
                    }
                    animate(i, {
                        bottom: r
                    }, {
                        duration: 100
                    })
                } else setStyle(i, {
                    bottom: r
                });
                curFastChat.prevPointer = r
            },
            setActive: function(e) {
                curFastChat.activeBox = e, e && FastChat.moveBoxesLeft(e.pos[1])
            },
            moveBoxesLeft: function(e, t) {
                e -= 8;
                var i = !1,
                    a = 0;
                for (var o in curFastChat.tabs) {
                    var r = curFastChat.tabs[o];
                    if (t || (r.box.movedLeft = !1), r && !r.box.options.fixed && r.box.toBottom && !r.box.movedLeft && !r.box.noMove) {
                        var s = r.box.pos;
                        s[1] + s[3] >= e && s[1] > a && (i = r, a = s[1])
                    }
                }
                if (i) {
                    var n = e - i.box.pos[3],
                        c = i.box.pos[0];
                    n < 0 && (n = 0), i.box.movedLeft = !0, animate(i.box.wrap, {
                        left: n
                    }, 200), i.box.pos = [c, n, i.box.pos[2], i.box.pos[3]];
                    var l = getWndInner();
                    FastChat.stateChange({
                        op: "moved",
                        peer: i.box.options.peer,
                        y: c / l[0],
                        x: n / l[1]
                    }), n && FastChat.moveBoxesLeft(n, !0)
                } else FastChat.moveLeftY = 0
            },
            moveBoxAway: function(e, t) {
                for (var i = t - e.pos[3] - 20, a = e.pos[3], o = e.pos[0], r = !1; i > 0 && !r;)
                    for (var s in r = !0, curFastChat.tabs) {
                        var n = curFastChat.tabs[s].box.pos;
                        n[0] + n[2] / 2 > o && n[1] + n[3] > i && n[1] < i + a && (i -= n[3], r = !1)
                    }
                i < 0 && (i = positive(Math.random() * t)), animate(e.wrap, {
                    left: i
                }, 300);
                var c = getWndInner();
                FastChat.stateChange({
                    op: "moved",
                    peer: e.options.peer,
                    y: o / c[0],
                    x: i / c[1]
                })
            },
            pinTab: function(e, t, i) {
                if (-1 == e) var a = curFastChat.clistBox;
                else a = curFastChat.tabs[e].box;
                a.options.fixed = !1, removeClass(a.wrap, "fc_fixed"), FastChat.hideChatCtrl(), FastChat.setActive(!1);
                var o = a.wrap.offsetTop,
                    r = a.wrap.offsetLeft - 10;
                setStyle(a.wrap, {
                    left: a.wrap.offsetLeft,
                    top: a.wrap.offsetTop,
                    right: "auto",
                    bottom: "auto"
                }), i || animate(a.wrap, {
                    left: r,
                    top: o
                }, 300), a.pos = [o, r, a.pos[2], a.pos[3]], a.toRight = !1, a.toBottom = !0, addClass(a.wrap, "fc_tobottom");
                var s = a.resizeableW.clientWidth - intval(getStyle(a.resizeableW, "paddingRight")) - intval(getStyle(a.resizeableW, "paddingLeft")),
                    n = a.resizeableH.clientHeight - intval(getStyle(a.resizeableH, "paddingBottom")) - intval(getStyle(a.resizeableH, "paddingTop")),
                    c = getWndInner(); - 1 == e ? FastChat.stateChange({
                    op: "clist_toggled",
                    val: 1,
                    y: a.toBottom ? -1 : a.pos[0] / c[0],
                    x: a.toRight ? -1 : a.pos[1] / c[1]
                }) : FastChat.stateChange({
                    op: "unfixed",
                    peer: e,
                    y: a.toBottom ? -1 : a.pos[0] / c[0],
                    x: a.toRight ? -1 : a.pos[1] / c[1],
                    h: n / c[0],
                    w: s / c[1]
                }), a.noMove = !0, FastChat.moveBoxesLeft(r), a.noMove = !1
            },
            addPeer: function(e, t, i, a) {
                a || (a = {});
                var o = curFastChat.friends && curFastChat.friends[e + "_"],
                    r = 0;
                if (i ? FastChat.stateChange({
                        op: "added",
                        peer: e,
                        fixed: a.fixed
                    }) : curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && t && (i = !0), o) {
                    var s = {
                        name: o[0],
                        photo: o[1],
                        fname: o[2],
                        hash: o[3],
                        online: curFastChat.onlines[e],
                        sex: o[4]
                    };
                    FastChat.addTabIcon(e, s, a.noAnim), FastChat.addBox(e, s, a), t ? (curFastChat.tabs[e].auto = 1, FastChat.imFeed(e, t)) : (a && a.nofocus || FastChat.activateTab(e), curFastChat.onlines[e] || FastChat.tabNotify(e, "unavail"), r |= 2)
                } else r = 3;
                r && (i ? (curFastChat.needPeers[e] = [r, t, !1, a], FastChat.getPeers()) : (curFastChat.needPeers[e] = [r, t, setTimeout(FastChat.getPeers, irand(150, 200)), a], FastChat.lcSend("needPeer", {
                    id: e,
                    mask: r
                })))
            },
            getPeers() {
                var e = [],
                    t = {};
                Object.keys(curFastChat.needPeers || {}).forEach(i => {
                    var a = m(curFastChat.needPeers[i], 3),
                        o = a[0],
                        r = a[2];
                    e.push(i, o), r && clearTimeout(r), t[i] = o
                }), e.length && (FastChat.lcSend("fetchingPeers", t), FastChat.loadPeers(e.join(","), function(e) {
                    FastChat.gotPeers(e), FastChat.lcSend("gotPeers", e)
                }))
            },
            gotPeers: function(e) {
                g() || each(curFastChat.needPeers, function(t) {
                    if (e[t]) {
                        e[t] < 2e9 && (curFastChat.friends[t + "_"] = [e[t].name, e[t].photo, e[t].fname, e[t].hash, intval(e[t].sex)]);
                        var i = this[1],
                            a = this[3];
                        2 & this[0] && void 0 === e[t].history || (clearTimeout(this[2]), delete curFastChat.needPeers[t]), curFastChat.tabs[t] ? FastChat.gotHistory(t, e[t].history) : a.fixedLoad ? FastChat.addTabIcon(t, e[t]) : (FastChat.addTabIcon(t, e[t]), FastChat.addBox(t, e[t], a), i ? (curFastChat.tabs[t].auto = 1, FastChat.imFeed(t, i)) : (2 & this[0] && FastChat.gotHistory(t, e[t].history), a && a.nofocus || FastChat.activateTab(t))), a.onHistoryLoaded && a.onHistoryLoaded()
                    }
                })
            },
            gotHistory: function(e, t) {
                if (isArray(t) && t.length && t[0]) {
                    var i = curFastChat.tabs[e],
                        a = t[0],
                        o = t[1];
                    i.offset = t[2], extend(i.msgs, o), each(o, function(e, t) {
                        !t[0] && t[1] && i.unread++
                    }), val(i.log, a), i.logWrap.scrollTop = i.logWrap.scrollHeight, setTimeout(function() {
                        i.logWrap.scrollTop = i.logWrap.scrollHeight, i.scroll && i.scroll.update(!1, !0)
                    }, 10)
                }
            },
            decHashCb: function(e) {
                ! function(e) {
                    curFastChat.decodedHashes[e] = function(e) {
                        for (var t = ge ? "" : "___", i = 0; i < e.length; ++i) t += e.charAt(e.length - i - 1);
                        return geByClass ? t : "___"
                    }(e.substr(e.length - 5) + e.substr(4, e.length - 12))
                }(e)
            },
            decodehash: function(e) {
                return curFastChat.decodedHashes || (curFastChat.decodedHashes = {}), curFastChat.decodedHashes[e] || FastChat.decHashCb(e), curFastChat.decodedHashes[e]
            },
            loadPeers(e, t) {
                ajax.post("al_im.php", {
                    act: "a_get_fc_peers",
                    peers: e
                }, {
                    onDone: t
                })
            },
            sendTyping: function(e) {
                var t = intval(e),
                    i = this.getTab(t),
                    a = Date.now();
                t <= -2e9 || !i || curFastChat.myTypingEvents[t] && a - curFastChat.myTypingEvents[t] < 5e3 || (curFastChat.myTypingEvents[t] = a, ajax.post("al_im.php", {
                    act: "a_activity",
                    type: "typing",
                    peer: t,
                    hash: i.sendhash,
                    from: "fc"
                }))
            },
            setTyping(e) {
                var t = this.getTab(e.peerId),
                    i = e.type === l.a;
                if (t && t.typing && i) {
                    var a = t.typing.userIds.filter((t, i) => t !== e.userId);
                    0 === a.length ? delete t.typing : t.typing = Object.assign(t.typing, {
                        userIds: a
                    })
                } else t && !i && (e.ts = Date.now() / 1e3, t.typing = Object.assign(e, {
                    userIds: (e.userIds || []).filter((e, t) => e !== vk.id)
                }))
            },
            waitTyping(e) {
                return Object(f.c)(v.b + 2).then(() => {
                    var t = this.getTab(e.peerId);
                    t && t.typing && (Date.now() - 1e3 * t.typing.ts >= 1e3 * v.b && delete t.typing)
                })
            },
            updateTypings() {
                var e = curFastChat.tabs || {};
                Object.keys(e).forEach(e => {
                    FastChat.updateTyping(e)
                })
            },
            updateTyping(e, t) {
                var i = this.getTab(e),
                    a = ge("fc_tab_typing" + e),
                    o = geByClass1("_fc_tab_typing_progress", a),
                    r = geByClass1("_fc_tab_typing_name", a);
                if (i.typing && i.typing.userIds.length > 0) {
                    var s = this.formatTyping(i.typing);
                    val(r, s), show(o)
                } else val(r, ""), hide(o);
                t ? setStyle(a, "opacity", 1) : fadeTo(a, 200, 1)
            },
            formatTyping(e) {
                var t = e.peerId,
                    i = e.userIds,
                    a = this.getTab(t),
                    o = i[0],
                    r = Object(p.ib)(t) ? a.data.members[o] : a,
                    s = e => e.fname || e.name || "";
                if (1 === i.length || !Object(p.ib)(t)) return langSex(r.sex, getLang("mail_im_typing")).replace("{user}", s(r));
                var n = i[i.length - 1],
                    c = Object(p.ib)(t) ? a.data.members[n] : a;
                return getLang("mail_im_multi_typing").replace("{users}", s(r)).replace("{last_user}", s(c))
            },
            markMessagesAsRead(e) {
                var t = e.type,
                    i = e.peerId,
                    a = e.upToId,
                    o = e.unread,
                    r = this.getTab(i);
                r && (t === l.J && (r.inUpTo = a), t === l.K && (r.outUpTo = a), r.unread = o, this.updateUnreadMessagesInTab(i, a, t === l.K)), this.updateTabUnreadCounterElement(r || {
                    unread: 0
                }, i)
            },
            updateUnreadMessagesInTab(e, t, i) {
                var a = this.getTab(e),
                    o = i ? ".fc_msgs_unread.fc_msgs_out" : ".fc_msgs_unread:not(.fc_msgs_out)";
                if (a && a.log) {
                    var r = a.log.querySelectorAll(o);
                    Array.prototype.forEach.call(r, e => {
                        +e.getAttribute("data-message-id") <= t && e.classList.remove("fc_msgs_unread")
                    })
                }
            },
            readLastMessages(e) {
                var t = FastChat.getTab(e);
                if (e && t) {
                    if (!t.markingRead && t.unread) {
                        var i = [];
                        for (var a in t.msgs) !t.msgs[a][0] && t.msgs[a][1] && i.push(a);
                        i.length > 0 && FastChat.markRead(e, i)
                    }
                    t.unread = 0, FastChat.updateTabUnreadCounterElement(t, e)
                }
            },
            markRead: function(e, t) {
                var i = this.getTab(e);
                i.markingRead = !0, ajax.post("al_im.php", {
                    act: "a_mark_read",
                    peer: e,
                    ids: t,
                    hash: i.sendhash,
                    from: "fc"
                }, {
                    onDone: function(a) {
                        for (var o in i.markingRead = !1, t) {
                            var r = t[o],
                                s = ge("fc_msg" + r),
                                n = s && s.parentNode;
                            s && (i.msgs[r] && i.msgs[r][1] && (i.msgs[r][1] = 0, i.msgs[r][0] || i.unread--), removeClass(s, "fc_msg_unread"), hasClass(n.parentNode, "fc_msgs_unread") && each(n.childNodes, function() {
                                if (!hasClass(this, "fc_msg_unread")) return removeClass(n.parentNode, "fc_msgs_unread"), !1
                            }))
                        }
                        i.unread = 0, FastChat.updateTabUnreadCounterElement(i, e)
                    },
                    onFail: function() {
                        i.markingRead = !1
                    }
                })
            },
            getMessageText(e, t) {
                var i = e || "";
                return i = Object(c.e)(i, c.b.bind(null, !1)), i = Object(c.f)(i), i = Object(c.c)(i), i = Object(c.d)(i, e => `<a href="/im?sel=${t}&st=${encodeURIComponent(e)}">${e}</a>`), i = Emoji.emojiToHTML(i, 1)
            },
            getEditCont: function(e) {
                return stManager.add([jsc("web/emoji.js")]), '<div class="emoji_cont _emoji_field_wrap">' + Emoji.tplSmile(getLang("mail_emoji_hint")) + '<div class="fc_editable dark" tabindex="0" contenteditable="true" placeholder="' + getLang("mail_chat_placeholder") + '"></div></div>'
            },
            getInputValue: function(e) {
                return Emoji ? Emoji.editableVal(e) : ""
            },
            onTxtResize: function(e) {
                var t = curFastChat.tabs[e],
                    i = geByClass1("fc_tab_txt", t.wrap),
                    a = getSize(i)[1];
                if (a > 40) {
                    var o = positive(a - 40);
                    (r = intval(getSize(t.box.resizeableH)[1])) + t.hDiff - o < 40 && (o = r + t.hDiff - 40), setStyle(t.box.resizeableH, {
                        height: r + (t.hDiff || 0) - o
                    }), t.hDiff = o, FastChat.fixResized(t, t.wrap.clientWidth, !0)
                } else if (t.hDiff) {
                    var r = intval(getSize(t.box.resizeableH)[1]);
                    setStyle(t.box.resizeableH, {
                        height: r + t.hDiff
                    }), t.hDiff = 0, FastChat.fixResized(t, t.wrap.clientWidth, !0)
                }
            },
            initTab: function(e, t, i) {
                var a = geByClass1("fc_editable", i),
                    o = curFastChat.tabs[e] = {
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
                        wrap: i,
                        editable: 1,
                        txt: a,
                        txtWrap: a.parentNode.parentNode,
                        logWrap: geByClass1("fc_tab_log", i),
                        log: geByClass1("fc_tab_log_msgs", i),
                        notify: geByClass1("fc_tab_notify_wrap", i),
                        title: geByClass1("fc_tab_title", i)
                    },
                    r = 30;
                if (o.addMediaBtn = geByClass1("fc_tab_attach", i), o.editable) cur.t = o, o.emojiId = Emoji.init(o.txt, {
                    controlsCont: geByClass1("fc_tab_txt_wrap", i),
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
                    addMediaBtn: o.addMediaBtn,
                    onShow: function() {
                        cssAnim(o.scroll.scrollbar, {
                            opacity: 0
                        }, {
                            duration: 400
                        })
                    },
                    onHide: function() {
                        cssAnim(o.scroll.scrollbar, {
                            opacity: 1
                        }, {
                            duration: 400
                        })
                    },
                    onEsc: function(e) {
                        return o.box.hide(), cancelEvent(e)
                    },
                    onStickerSend: function(t, i) {
                        FastChat.send(e, t, i)
                    }
                });
                else {
                    autosizeSetup(o.txt, {
                        minHeight: 15,
                        maxHeight: 42
                    }), o.txt.autosize.options.onResize = function(e) {
                        if (!o.box.minimized) {
                            var t = 42 == e ? 42 : 15;
                            t != e && setStyle(o.txt, "height", t), t != r && (setStyle(o.logWrap, "height", o.logWrap.clientHeight - t + r), r = t, o.scroll && o.scroll.update(!1, !0))
                        }
                    }
                }
                return o.imPeerMedias = {}, o.imSortedMedias = {}, o.previewEl = geByClass1("fc_tab_preview", i), stManager.add(["page.js", "page.css", jsc("web/ui_media_selector.js"), "ui_media_selector.css"], function() {
                    o.imMedia = new MediaSelector(o.addMediaBtn, o.previewEl, [
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
                    }), o.imMedia.onChange = setTimeout.pbind(function() {
                        if (curFastChat.sendOnUpload) FastChat.send(curFastChat.sendOnUpload), curFastChat.sendOnUpload = void 0;
                        else {
                            var t = Object(n.b)(curFastChat.ldb, e);
                            t.removeAllAttaches(), o.imMedia.getMedias().forEach(e => t.addAttach(e[0], e[1])), t.destroy()
                        }
                        FastChat.onTxtResize(e)
                    }, 0)
                }), o
            },
            addBox: function(e, t, i) {
                if (void 0 === curFastChat.tabs[e]) {
                    var o = FastChat.getEditCont(Emoji.last);
                    i = i || {}, curFastChat.tabs[e] = {};
                    var r = se(rs(FastChat.tplBox, {
                        id: e,
                        name: t.name,
                        myphoto: Notifier.fixPhoto(curFastChat.me.photo, !0),
                        cont: o
                    }));
                    i.fixed && curFastChat.activeBox && curFastChat.activeBox.hide(0, !1, {
                        noState: !0
                    });
                    var s = FastChat.initTab(e, t, r),
                        n = getWndInner(),
                        c = {
                            id: "fc_peer" + e,
                            marginFixedToLayer: !0,
                            peer: e,
                            movable: geByClass1("fc_tab_head", r),
                            closer: geByClass1("fc_tab_close_wrap", r, "a"),
                            resizeableH: s.logWrap,
                            startHeight: 250,
                            startWidth: 270,
                            fixed: i.fixed,
                            minH: 150,
                            minW: 270,
                            nofocus: !0,
                            onFocus: function(t) {
                                s.auto && (FastChat.stateChange({
                                    op: "added",
                                    peer: e
                                }), delete s.auto), FastChat.restoreDraft(e), s.editable ? Emoji.editableFocus(s.txt, !1, !0) : elfocus(s.txt), s.wrap.clientWidth && setStyle(s.title, {
                                    maxWidth: s.wrap.clientWidth - 71
                                }), s.editable || setStyle(s.txt.autosize.helper, {
                                    width: getStyle(s.txt, "width", !1)
                                }), s.scroll && s.scroll.update(!1, !0), setTimeout(elfocus.pbind(s.txt), 10)
                            },
                            onHide: function() {
                                i.fixed && FastChat.hideChatCtrl(), curFastChat.activeBox && e == curFastChat.activeBox.options.peer && FastChat.setActive(!1)
                            },
                            onClose: function(t) {
                                AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(), this.onHide(), i && i.beforeClose && i.beforeClose();
                                var a = curFastChat.tabs,
                                    o = a[e].posSeq;
                                if (delete a[e], curNotifier.isIdle || FastChat.stateChange({
                                        op: "hidden",
                                        peer: e
                                    }), o) {
                                    var r, s, n, c, l, d = {},
                                        u = [];
                                    for (each(a, function() {
                                            this.posSeq > o && (d[this.posSeq] = this, u.push(this.posSeq))
                                        }), u.unshift(o), u.sort(), l = !browser.msie && u.length < 10, r = 1; r < u.length; r++) s = u[r], n = d[s].box, c = r > 1 ? d[u[r - 1]].box.pos : t, l ? animate(n.wrap, {
                                        left: c[1]
                                    }, 100, function(e) {
                                        e._update_pos()
                                    }.pbind(n)) : setStyle(n.wrap, {
                                        left: c[1]
                                    });
                                    if (!l)
                                        for (r = 1; r < u.length; r++)(n = d[u[r]].box)._update_pos()
                                }
                            },
                            onMinimize: function(t) {
                                FastChat.stateChange({
                                    op: "minimized",
                                    peer: e,
                                    val: t
                                }), FastChat.fixResized(s, s.wrap.clientWidth, !0), t || (s.txt.blur(), FastChat.restoreDraft(e))
                            },
                            onResizeEnd: function(t, i) {
                                var a = getWndInner(),
                                    o = s.box.pos;
                                s.scroll && s.scroll.show(), FastChat.fixResized(s, i, !0), FastChat.stateChange({
                                    op: "resized",
                                    peer: e,
                                    h: t / a[0],
                                    w: i / a[1],
                                    y: s.box.toBottom ? -1 : o[0] / a[0],
                                    x: s.box.toRight ? -1 : o[1] / a[1]
                                })
                            },
                            onResize: function(e, t) {
                                FastChat.fixResized(s, t);
                                var i = geByClass1("fc_tab_title", s.box.content);
                                setStyle(i, {
                                    width: t - 78
                                })
                            },
                            onResizeStart: function() {
                                delete s.posSeq, s.scroll && s.scroll.hide(), val(s.notify, ""), clearTimeout(s.hideNotifyTO)
                            },
                            onDragEnd: function(t, i) {
                                delete s.posSeq, FastChat.stateChange({
                                    op: "moved",
                                    peer: e,
                                    y: t,
                                    x: i
                                })
                            }
                        };
                    if (i && extend(c, i), void 0 === c.startLeft && void 0 === c.startRight) {
                        var l = [],
                            d = n[0] - 350,
                            u = curFastChat.clistBox.pos,
                            f = !1;
                        if (window.Call && (Call.box || Call.invitation)) {
                            var h = Call.calcBoxPos();
                            l.push([h.x, h.x + h.w]), f = !0
                        }
                        u[0] + u[2] > d && (curFastChat.clistBox.visible || !f) && l.push([u[1], u[1] + u[3]]), each(curFastChat.tabs, function(t) {
                            (u = this.box && this.box.pos) && t != e && u[0] + u[2] > d && l.push([u[1], u[1] + u[3]])
                        });
                        var _, p, v, m = lastWindowWidth - 262 - sbWidth(),
                            g = !1,
                            b = !1,
                            C = 0 > m ? 1 : -1;
                        for (_ = m; C * _ < 0 * C; _ += 135 * C) {
                            for (p = 0, v = 0; v < l.length; v++) _ > l[v][0] - 260 && _ < l[v][1] && p++, _ > l[v][0] - 10 && _ < l[v][0] + 10 && (p += 1.1);
                            (!1 === g || p < b) && (g = _, b = p)
                        }
                        f && b && (g = m), extend(c, {
                            startBottom: 0,
                            startLeft: g
                        })
                    }
                    var w, N = !0;
                    for (w in i || {})
                        if ("nofocus" != w) {
                            N = !1;
                            break
                        }
                    N && (s.posSeq = ++curFastChat.posSeq), c.fixed && (c.startHeight = curFastChat.clistH, c.startWidth = curFastChat.clistW, c.onShow = FastChat.showChatCtrl), s.box = new RBox(r, c), s.iman = new a.a({
                        id: "tab" + e,
                        element: s.box.content,
                        onUnIdleCb: function() {
                            FastChat.readLastMessages(e)
                        },
                        parentManager: curNotifier.idle_manager,
                        idleTimeout: 1e4
                    }), curFastChat.tabs[e].iman.start(), c.fixed && FastChat.setActive(s.box), s.scroll = new Scrollbar(s.logWrap, {
                        prefix: "fc_",
                        nomargin: !0,
                        nokeys: !0,
                        global: !0,
                        right: vk.rtl ? "auto" : 1,
                        left: vk.rtl ? 1 : "auto",
                        onScroll: FastChat.onScroll.pbind(s)
                    }), c.minimized || !i || void 0 === i.startLeft && void 0 === i.startTop && void 0 === i.startWidth && void 0 === i.startHeight || s.box._wnd_resize(n[0], n[1], !0), s.wrap.clientWidth && setStyle(s.title, {
                        maxWidth: s.wrap.clientWidth - 71
                    }), addEvent(s.txt, "keydown", this.onInputKeydown.bind(this, s)), addEvent(s.txt, "keyup", this.onInputKeyUp.bind(this, s, e)), addEvent(s.txt, "focus", this.onInputFocus.bind(this, e)), FastChat.restoreDraft(e), c.onPeerAdded && c.onPeerAdded()
                }
            },
            onInputFocus(e) {
                curFastChat.peer = e
            },
            onInputKeydown(e, t) {
                if (t.ctrlKey && t.keyCode === KEY.RETURN) {
                    var i = t.target,
                        a = i.value;
                    if ("number" == typeof i.selectionStart && "number" == typeof i.selectionEnd) {
                        var o = i.selectionStart;
                        i.value = a.slice(0, o) + "\n" + a.slice(i.selectionEnd), i.selectionStart = i.selectionEnd = o + 1
                    } else if (document.selection && document.selection.createRange) {
                        i.focus(t);
                        var r = document.selection.createRange();
                        r.text = "\r\n", r.collapse(!1), browser.opera && (r.moveEnd("character", 0), r.moveStart("character", 0)), r.select()
                    }
                    e.editable ? this.checkEditable(e.emojiId, e.txt) : (e.txt.autosize.update(), setTimeout(() => e.txt.autosize.update(), 0))
                }
            },
            onInputKeyUp(e, t) {
                var i = e.lastValue || "",
                    a = this.getInputValue(e.txt);
                a.length === i.length && a === i || (a && this.sendTyping(t), e.lastValue = a), clearTimeout(e.saveDraftTO), e.saveDraftTO = setTimeout(this.saveDraft.pbind(t), a.length ? 300 : 0), this.checkEditable(e.emojiId, e.txt)
            },
            onScroll: function(e) {
                var t = e.scroll.obj.scrollTop,
                    i = geByClass1("_fc_msgs_more", e.logWrap);
                t < 200 && isVisible(i) && i.click()
            },
            loadMore: function(e, t) {
                var i = curFastChat.tabs[e],
                    a = i.offset;
                if (i.moreLoading) return !1;
                i.moreLoading = !0, ajax.post("al_im.php", {
                    act: "a_history",
                    peer: e,
                    offset: a,
                    from: "fc"
                }, {
                    onDone: function(e) {
                        e[3] || hide(t);
                        var a = t.parentNode,
                            o = a.clientHeight;
                        a.insertBefore(cf(e[0]), t.nextSibling);
                        var r = a.clientHeight - o;
                        r && (i.logWrap.scrollTop += r), i.scroll.update(), i.offset = e[2], i.moreLoading = !1, FastChat.onScroll(i)
                    },
                    onFail: function() {
                        i.moreLoading = !1
                    },
                    showProgress: lockButton.pbind(t),
                    hideProgress: unlockButton.pbind(t)
                })
            },
            sendOnResponse: function(e, t, i) {
                if (e.version && intval(e.version) > curFastChat.version) FastChat.updateVersion(e.version);
                else {
                    var a = ge("fc_msg" + t),
                        o = e.msg_id,
                        r = indexOf(t, i.newmsgs);
                    if (a) {
                        if (e.media) {
                            var s = {
                                sticker: intval(e.sticker)
                            };
                            FastChat.lcSend("gotMedia", {
                                msgId: t,
                                peer: i.box.options.peer,
                                text: e.media,
                                msgOpts: s
                            }), FastChat.gotMsgMedia(i.box.options.peer, t, e.media, s)
                        }++i.msgscount, -1 != r && i.newmsgs.splice(r, 1), a.id = "fc_msg" + o, i.msgs[o] = [1, 1]
                    }
                }
            },
            checkEditable: function(e, t) {
                Emoji.checkEditable(e, t, {
                    height: 52
                })
            },
            fixResized: function(e, t, i) {
                e && (e.logWrap.scrollTop = e.logWrap.scrollHeight, t > 0 && setStyle(e.title, {
                    maxWidth: t - 71
                }), i && (e.editable || setStyle(e.txt.autosize.helper, {
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
                    var i = t.box.wrap,
                        a = i.className,
                        o = Math.min(1e4, intval(getStyle(i, "zIndex")));
                    setStyle(i, {
                        zIndex: 1e4
                    }), removeClass(i, "rb_inactive"), t.blinkingTO = setTimeout(function() {
                        delete t.blinking, delete t.blinkingTO, 1e4 == getStyle(i, "zIndex") && (setStyle(i, {
                            zIndex: o
                        }), i.className = a)
                    }, 2e3)
                }
            },
            createProgress: function(e, t, i) {
                var a = ce("span", {
                    innerHTML: rs(vk.pr_tpl, {
                        id: "",
                        cls: ""
                    }),
                    className: "fc_msg_progress",
                    id: "fc_msg_progress" + t
                });
                return e.insertBefore(a, i), a
            },
            removeProgress: function(e) {
                re("fc_msg_progress" + e)
            },
            send: function(e, t, i) {
                var a = curFastChat.tabs[e],
                    o = trim(a.editable ? Emoji.editableVal(a.txt) : val(a.txt)),
                    r = "";
                t ? (r = [
                    ["sticker", t]
                ], o = "") : r = a.imMedia ? a.imMedia.getMedias() : [];
                var s = ge("fc_tab_typing" + e),
                    n = geByClass1("page_progress_preview", a.wrap);
                if (n && n.childNodes.length > 0) {
                    curFastChat.sendOnUpload = e;
                    var c = geByClass("fc_tab_log", a.wrap)[0];
                    return FastChat.createProgress(c, e, c.lastChild), void(s.style.visibility = "hidden")
                }
                if (curFastChat.sendOnUpload = !1, FastChat.removeProgress(e), s.style.visibility = "visible", o || r.length) {
                    var l = Object(d.a)(),
                        u = {
                            act: "a_send",
                            to: e,
                            hash: a.sendhash,
                            msg: o,
                            from: "fc",
                            entrypoint: curFastChat.tabs[e].entrypoint,
                            media: [],
                            random_id: l
                        };
                    i && (u.sticker_referrer = i);
                    for (var f, h = 0, _ = r.length; h < _; ++h)(f = r[h]) && u.media.push(f[0] + ":" + f[1]);
                    u.media = u.media.join(","), a.sending = !0, Emoji.ttHide(a.emojiId), curFastChat.tabs[e].entrypoint = !1, ajax.post("al_im.php", u, {
                        onDone: function(t) {
                            clearTimeout(a.saveDraftTO), FastChat.saveDraft(e), FastChat.sendOnResponse(t, l, a)
                        },
                        onFail: function(t) {
                            FastChat.error(e, t || getLang("global_unknown_error")), elfocus(a.txt), val(a.txt, o), a.editable ? FastChat.checkEditable(a.emojiId, a.txt) : a.txt.autosize.update();
                            var i = ge("fc_msg" + l);
                            if (i) return i.appendChild(ce("span", {
                                className: "fc_msg_error",
                                innerHTML: getLang("global_error")
                            })), FastChat.scroll(e), !0
                        },
                        showProgress: function() {
                            a.sending = !0, a.sendProgressTO = setTimeout(function() {
                                var e = ge("fc_msg" + l);
                                e && FastChat.createProgress(e, l, e.firstChild)
                            }, 2e3)
                        },
                        hideProgress: function() {
                            a.sending = !1, clearTimeout(a.sendProgressTO), FastChat.removeProgress(l)
                        }
                    }), re("fc_error" + e), t || (val(a.txt, ""), a.imMedia && a.imMedia.unchooseMedia()), FastChat.addMessage(FastChat.prepareMessageData({
                        messageId: l,
                        text: clean(o).replace(/\n/g, "<br>"),
                        peerId: e,
                        flags: 3,
                        randomId: u.random_id,
                        attaches: []
                    })), delete curFastChat.myTypingEvents[e], a.editable ? FastChat.checkEditable(a.emojiId, a.txt) : a.txt.autosize.update(!1, !0), elfocus(a.txt), FastChat.scroll(e), FastChat.trackActivity("send")
                } else a.editable ? Emoji.editableFocus(a.txt, !1, !0) : elfocus(a.txt)
            },
            saveDraft: function(e) {
                var t = curFastChat.tabs[e],
                    i = (t || {}).txt;
                if (i && t) {
                    var a = Emoji.editableVal(i),
                        o = Object(n.b)(curFastChat.ldb, e);
                    o.setText(trim(a) || ""), o.destroy()
                }
            },
            restoreDraft: function(e) {
                var t = curFastChat.tabs[e],
                    i = t.txt,
                    a = Object(n.b)(curFastChat.ldb, e);
                return !(!i || !t || val(i).length > a.dData.txt.length && !a.hasAttaches()) && (t.editable ? i.innerHTML = Emoji.emojiToHTML(clean(a.dData.txt), 1) : val(i, clean(a.dData.txt)), setTimeout(() => {
                    for (var e = a.dData.attaches, i = 0; i < e.length; i++) t.imMedia && t.imMedia.chooseMedia(e[i].type, e[i].id, e[i].object || {});
                    a.destroy()
                }, 40), FastChat.checkEditable(t.emojiId, i), setTimeout(function() {
                    i.scrollTop = i.scrollHeight
                }, 10), !0)
            },
            error: function(e, t) {
                e = e || curFastChat.peer;
                var i = curFastChat.tabs[e];
                re("fc_error" + e), i.log.appendChild(ce("div", {
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
                    i = new Date,
                    a = function(e) {
                        return (e + "").length < 2 ? "0" + e : e
                    };
                if (t.getDay() == i.getDay()) return a(t.getHours()) + ":" + a(t.getMinutes());
                var o = a(t.getDate()) + "." + a(t.getMonth() + 1);
                return t.getFullYear() != i.getFullYear() && (o += "." + (t.getFullYear() + "").substr(2)), o
            },
            prepareMessageData(e) {
                var t = e.peerId,
                    i = e.flags,
                    a = e.messageId,
                    o = e.text,
                    r = e.date,
                    s = Object(_.b)(e),
                    n = m(this.getMessageMedia(e), 2),
                    c = n[0],
                    l = n[1],
                    d = "",
                    u = e.randomId;
                return Object(_.l)(e) && (d = this.renderServiceMessage(e)), -1 !== String(a).indexOf("rid") && (u = Number(a.slice(3))), Object.assign({
                    id: a,
                    peer: t,
                    from_id: s,
                    text: Object(_.l)(e) ? d : this.getMessageText(o, t) + c,
                    out: Object(_.k)(e),
                    unread: Boolean(1 & i),
                    date: r,
                    date_str: FastChat.mkdate(r),
                    randomId: u,
                    isServiceMessage: Object(_.l)(e)
                }, this.getMessageAuthor(e), l)
            },
            getMessageAuthor(e) {
                var t = e.peerId,
                    i = Object(_.b)(e),
                    a = this.getTab(e.peerId);
                if (!a || !i) return {};
                var o = Object(_.k)(e) ? curFastChat.me : Object(p.ib)(t) ? a.data.members[i] : a,
                    r = o.name,
                    s = o.link,
                    n = o.photo,
                    c = o.fname,
                    l = o.first_name;
                return {
                    fname: Object(p.ib)(t) ? c || l : "",
                    name: r,
                    link: s,
                    photo: n,
                    from_id: i
                }
            },
            getMessageMedia(e) {
                var t = e.peerId,
                    i = e.messageId,
                    a = "",
                    o = {};
                return !Object(_.l)(e) && Array.isArray(e.attaches) && (e.attaches.forEach(e => {
                    switch (e.type) {
                        case "sticker":
                            a += i ? this.renderSticker(e.id, e.productId, e.kind, i) : this.renderSticker(e.id, e.productId), o.sticker = !0;
                            break;
                        case "mail":
                            var r = e.object ? e.object.fwd_count : e.id.split(";").length;
                            a += rs(curFastChat.tpl.msg_fwd, {
                                msg_id: i,
                                peerId_nice: Object(p.I)(t),
                                label: getLang(r > 1 ? "mail_im_fwd_msgs" : "mail_im_fwd_msg")
                            });
                            break;
                        default:
                            a += rs(vk.pr_tpl, {
                                id: "",
                                cls: ""
                            }), i > 0 && setTimeout(FastChat.needMsgMedia.pbind(t, i), 5)
                    }
                }), a && (a = `<div class="fc_msg_attachments" id="fc_msg_attachments${i}">${a}</div>`)), [a, o]
            },
            renderSticker(e, t, i, a) {
                var o, r = window.devicePixelRatio >= 2 ? "256" : "128";
                return "animation" === i ? (o = rs(curFastChat.tpl.animatedSticker, {
                    id: e,
                    size: r,
                    productId: t,
                    messageId: a
                }), Number.isInteger(a) && this.loadStickersModuleIfNeed().then(() => {
                    window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer("animatedSticker" + a, 10)
                })) : o = rs(curFastChat.tpl.sticker, {
                    id: e,
                    size: r
                }), o
            },
            loadStickersModuleIfNeed: () => new Promise(e => {
                var t = Boolean(window.StickersSettings && window.StickersAnimation);
                curFastChat.stickersLoading || t ? e() : (curFastChat.stickersLoading = !0, stManager.add([jsc("web/stickers.js")], () => {
                    curFastChat.stickersLoading = !1, e()
                }))
            }),
            renderServiceMessage(e) {
                var t = e.kludges,
                    i = e.peerId,
                    a = e.userId,
                    o = t.source_act,
                    r = Number(t.source_mid),
                    s = this.getMember(i, a),
                    n = "",
                    c = a === r;
                switch (o) {
                    case p.j:
                        n = "mail_im_chat_created";
                        break;
                    case p.g:
                        n = t.source_is_channel ? "mail_im_title_updated_channel" : "mail_im_title_updated_dot";
                        break;
                    case p.b:
                        n = c ? "mail_im_returned_to_chat" : "mail_im_invited";
                        break;
                    case p.c:
                        n = c ? "mail_im_left" : "mail_im_kicked_from_chat";
                        break;
                    case p.e:
                        n = "mail_im_photo_set";
                        break;
                    case p.d:
                        n = t.source_is_channel ? "mail_im_photo_removed_channel" : "mail_im_photo_removed";
                        break;
                    case p.f:
                        n = t.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                        break;
                    case p.h:
                        n = t.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                        break;
                    case p.a:
                        n = "mail_im_invite_by_link";
                        break;
                    default:
                        return "mail_no_support"
                }
                if (n = (n = langSex(s.sex, getLang(n, "raw"))).replace("{from}", Object(p.kc)(s.link, s.name, !0)), r && r !== a) {
                    var l = t.source_email;
                    if (l) n = n.replace("{user}", Object(p.kc)(`/im?email=${encodeURIComponent(l)}`, "email", !0));
                    else {
                        var d = this.getMember(i, r) || {
                                name_inv_case: "",
                                name_kick_case: "",
                                link: ""
                            },
                            u = o === p.c ? d.name_kick_case : d.name_inv_case;
                        n = n.replace("{user}", Object(p.kc)(d.link, u, !0))
                    }
                }
                if (t.source_text) {
                    var f = t.source_old_text ? `«<b class="im_srv_lnk">${t.source_old_text}</b>» &rarr; ` : "";
                    n = n.replace("{title}", f + `«<b class="im_srv_lnk">${t.source_text}</b>»`)
                }
                if (t.source_act === p.f || t.source_act === p.h)
                    if (t.source_message) {
                        var h = Object(p.hc)(Emoji.emojiToHTML(stripHTML(t.source_message.replace(/<br\s?\/?>/gi, " ")), !0)),
                            _ = Object(p.kc)("", h, !1, "im_srv_mess_link");
                        n = n.replace("{msg}", _)
                    } else n = n.replace(/{link}(.+){\/link}/i, (e, t) => Object(p.kc)("", t, !1, "im_srv_mess_link"));
                return n
            },
            getMember(e, t) {
                var i = this.getTab(e);
                return Object(p.ib)(e) && i ? i.data.members[t] : i || null
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
                    onDone: function(i) {
                        var a = m(i, 4),
                            o = (a[0], a[1]),
                            r = (a[2], a[3]);
                        FastChat.lcSend("gotMedia", {
                            msgId: t,
                            peer: e,
                            text: o,
                            msgOpts: r
                        }), FastChat.gotMsgMedia(e, t, o, r)
                    }
                }))
            },
            gotMsgMedia: function(e, t, i, a) {
                if (val("fc_msg_attachments" + t, i), a && a.sticker) {
                    var o = ge("fc_msg" + t),
                        r = o && o.parentNode;
                    o && addClass(r.parentNode, "fc_msg_sticker"), window.StickersAnimation && window.StickersAnimation.checkSettingsAndLoadInWeb(t, !1, !1, !0)
                }
                FastChat.scroll(e), curFastChat.gotMedia[t] = [e, i, a], a.stickers && window.Emoji && Emoji.updateTabs(a.stickers, a.keywords), void 0 !== curFastChat.needMedia[t] && (clearTimeout(curFastChat.needMedia[t][1]), delete curFastChat.needMedia[t])
            },
            replaceSpecialSymbols: function(e) {
                return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(/(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, "$1$4")
            },
            addMessage: function(e) {
                var t, i = e.peer,
                    a = this.getTab(i),
                    o = a.log;
                if (!a || e.out || !a.box.visible || a.iman.is_idle || curNotifier.idle_manager.is_idle || (e.unread = !1, FastChat.markRead(e.peer, [e.id])), e.randomId && re(document.querySelector(`[data-random-id="${e.randomId}"]`)), a.msgs[e.id] = [e.out, e.unread], this.isNewStack(e)) {
                    re("fc_log_empty" + i);
                    var r = (e.out ? "fc_msgs_out " : "") + (e.unread ? "fc_msgs_unread" : "");
                    e.sticker && (r += " fc_msg_sticker"), e.isServiceMessage && (r += " fc_srv_msg");
                    var s = e.isServiceMessage ? curFastChat.tpl.msgs_service : e.out ? curFastChat.tpl.msgs_out : curFastChat.tpl.msgs;
                    t = se(rs(s, {
                        from_id: e.from_id,
                        link: e.link,
                        photo: Notifier.fixPhoto(e.photo),
                        name: e.from_id == curFastChat.me.id ? getLang("mail_im_thats_u") : stripHTML(e.name),
                        classname: r,
                        date: e.date,
                        date_str: e.date_str,
                        msgs: "",
                        randomId: e.randomId || 0,
                        messageId: e.id
                    })), o.appendChild(t)
                } else e.unread || removeClass(t, "fc_msgs_unread");
                var n = geByClass1("fc_msgs_list", t, "div"),
                    c = geByClass1("fc_msgs_date", n),
                    l = geByClass1("fc_msg_last", n);
                l && removeClass(l, "fc_msg_last");
                var d = se(rs(curFastChat.tpl.msg, {
                    msg_id: e.id,
                    classname: (e.unread ? "fc_msg_unread" : "") + (e.isServiceMessage ? " fc_srv_msg" : "") + " fc_msg_last",
                    text: FastChat.replaceSpecialSymbols(e.text)
                }));
                domFC(n) && "BR" == domFC(n).tagName && re(domFC(n)), c ? n.insertBefore(d, c) : n.appendChild(d), vk.id != e.from_id && (delete curFastChat.typingEvents[i], FastChat.updateTyping(i, 1)), a.scroll && a.scroll.update()
            },
            getTab: e => curFastChat.tabs[e],
            isTabLoaded(e) {
                return Boolean(curFastChat.tabs && this.getTab(e))
            },
            isNewStack(e) {
                var t = this.getTab(e.peer).log.lastChild;
                return t && "fc_msgs_error" == t.className && (t = t.previousSibling), !t || (!hasClass(t, "fc_msgs_wrap") || (!hasClass(t, "fc_msgs_unread") && !0 === e.unread || (t.getAttribute("data-from") !== e.from_id || (e.date - intval(t.getAttribute("data-date")) >= 300 || !(!e.sticker && !hasClass(t, "fc_msg_sticker"))))))
            },
            editMessage(e) {
                var t = e.id,
                    i = ge("fc_msg" + t);
                if (i) {
                    var a = se(rs(curFastChat.tpl.msg, {
                        msg_id: t,
                        classname: i.getAttribute("class"),
                        text: FastChat.replaceSpecialSymbols(e.text)
                    }));
                    i.parentNode.replaceChild(a, i)
                }
            },
            deleteMessage(e) {
                var t = e.id,
                    i = ge("fc_msg" + t);
                if (i) {
                    var a = !domNS(i) && !domPS(i),
                        o = domClosest("fc_tab_log_msgs", i);
                    for (re(a ? domClosest("fc_msgs_wrap", i) : i); hasClass(domLC(o), "fc_msgs_date");) re(domLC(o))
                }
            },
            updateTabUnreadCounter(e, t) {
                if (!e) {
                    var i = document.querySelector(`#chat_tab_icon_${t.peerId}`),
                        a = i && i.querySelector(".chat_tab_counter");
                    e = {
                        unread: a && Math.max(+a.innerHTML, 0) || 0
                    }
                }
                Object(_.k)(t) ? e.unread = 0 : e.unread++, this.updateTabUnreadCounterElement(e, t.peerId)
            },
            updateTabUnreadCounterElement(e, t) {
                if (e) {
                    var i = document.querySelector(`#chat_tab_icon_${t}`),
                        a = i && i.querySelector(".chat_tab_counter");
                    a && (a.innerHTML = e.unread > 0 ? e.unread : ""), e.title && e.name && (val(e.title, e.name + (e.unread ? ' <span class="fc_tab_count">(' + e.unread + ")</span>" : "")), val("fc_contact_unread" + t, e.unread ? " <b>+" + e.unread + "</b>" : ""))
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
            trackActivity(e) {
                Object(h.d)("im_fastchat_location", e, window.cur.module)
            },
            toggleFastChats(e) {
                var t = !e;
                toggleClass(ge("chat_onl_wrap"), "fast_chats_toggle_hide", t), toggleClass(ge("rb_box_fc_clist"), "fast_chats_toggle_hide", t), each(geByClass("rb_box_wrap"), () => toggleClass(this, "fast_chats_toggle_hide", t))
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
            createNotification: function(e, t, i) {
                var a;
                return window.webkitNotifications ? a = webkitNotifications.createNotification(e, t, i) : ((a = new Notification(t, {
                    icon: e,
                    body: i
                })).cancel = function() {
                    this.close()
                }, a.show = function() {}), vk.id % 100 < 10 && statlogsValueEvent("browser_notification", 0), a
            }
        };
        i("j0Lq");
        window.getWndInner = function() {
            var e = lastWindowWidth,
                t = lastWindowHeight,
                i = sbWidth();
            return (!1 !== lastWndScroll[0] ? lastWndScroll[0] : htmlNode.scrollHeight > htmlNode.clientHeight) && (e -= i + (i ? 1 : 0)), [t, e]
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
            var i, a = '<div class="' + (e.subClass || "") + '"><div class="fc_tab_head"><a class="fc_tab_close_wrap fl_r"><div class="chats_sp fc_tab_close"></div></a><div class="fc_tab_title noselect">%title%</div></div><div id="fc_ctabs_cont"><div class="fc_ctab fc_ctab_active">%content%</div></div></div></div>';
            i = e.content ? '<div class="fc_content_wrap"><div class="fc_content">' + e.content + "</div></div>" : e.innerHTML;
            var o = se(rs(a, {
                title: e.title,
                content: i
            }));
            i = geByClass1("fc_content", o, "div");
            var r, s = {
                    movable: geByClass1("fc_tab_head", o),
                    hider: geByClass1("fc_tab_close_wrap", o, "a"),
                    startLeft: e.x,
                    startTop: e.y,
                    startHeight: e.height,
                    startWidth: e.width,
                    resizeableH: i,
                    resize: !1,
                    minH: e.minH,
                    onBeforeHide: e.onBeforeHide || function() {},
                    onHide: e.onHide || function() {},
                    onDragEnd: function(e, t) {},
                    onResize: function(e, t) {}
                },
                n = new RBox(o, extend(s, e));
            return e.content && (r = new Scrollbar(i, {
                prefix: "fc_",
                more: debugLog,
                nomargin: !0,
                global: !0,
                nokeys: !0,
                right: vk.rtl ? "auto" : 0,
                left: vk.rtl ? 0 : "auto",
                onHold: e.onHold
            })), t({
                id: n.id,
                cont: i,
                update: function() {
                    r && r.update()
                }
            }), n
        };
        try {
            stManager.done("notifier.js")
        } catch (e) {}
    },
    EUzL: function(e, t, i) {
        "use strict";
        i.d(t, "a", function() {
            return o
        });
        i("rE2o"), i("ioFf"), i("rGqo");

        function a(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var i = [],
                    a = !0,
                    o = !1,
                    r = void 0;
                try {
                    for (var s, n = e[Symbol.iterator](); !(a = (s = n.next()).done) && (i.push(s.value), !t || i.length !== t); a = !0);
                } catch (e) {
                    o = !0, r = e
                } finally {
                    try {
                        a || null == n.return || n.return()
                    } finally {
                        if (o) throw r
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function o(e, t, i) {
            var o = 0,
                r = e,
                s = [],
                n = !1;

            function c() {
                !s.length || o > 0 || n || (t(s), s = [])
            }
            return {
                pause() {
                    o++
                },
                resume() {
                    o > 0 && (o--, c())
                },
                onLp(e, t, o) {
                    n || (r >= e ? (r = t, s.push(...o), c()) : i && (n = !0, i(r).then(e => {
                        var t = a(e, 3),
                            i = (t[0], t[1]),
                            o = t[2];
                        r = i, n = !1, s.push(...o), c()
                    })))
                }
            }
        }
    },
    "P+eJ": function(e, t, i) {
        "use strict";
        i.d(t, "b", function() {
            return o
        }), i.d(t, "a", function() {
            return u
        });
        var a = i("ERyv");

        function o(e, t) {
            if (window.vk.lpConfig.debug) {
                for (var i = `background: ${e}; color: white`, a = new Date, o = e => e < 10 ? "0" + e : e, r = arguments.length, s = new Array(r > 2 ? r - 2 : 0), n = 2; n < r; n++) s[n - 2] = arguments[n];
                console.log(`%c ${a.getHours()}:${o(a.getMinutes())}:${o(a.getSeconds())}:${a.getMilliseconds()} ${t} `, i, ...s)
            }
        }

        function r() {
            return window.lpBufferFc || (window.lpBufferFc = []), window.lpBufferFc
        }

        function s() {
            return window.lpBufferIm || (window.lpBufferIm = []), window.lpBufferIm
        }

        function n(e, t) {
            window.lpWeird || (window.lpWeird = []), window.lpWeird.push({
                msg: e,
                ev: t,
                is_master: window.curNotifier.is_server
            }), setTimeout(c, 1e4)
        }

        function c() {
            window.lpWeird.length && (Object(a.b)("fc_im_differ", {
                diff: window.lpWeird
            }, !1), window.lpWeird = [])
        }

        function l() {
            return "im" === window.cur.module && window.store && window.store.get().longpoll && !window.store.get().stopped
        }

        function d() {
            l() && (s().forEach(e => {
                    !r().find(t => e.ev === t.ev) && e.time < Date.now() - 1e3 && !e.warned && (e.warned = !0, o("red", "im not fc", e.ev), Object(a.c)() && n("im not fc", e.ev))
                }), r().forEach(e => {
                    var t = s().find(t => t.ev === e.ev);
                    t && t.warned && !e.warned && (e.warned = !0, o("red", "now fc like im", e.ev), Object(a.c)() && n("now fc like im", e.ev))
                })),
                function() {
                    var e = Date.now() - 3e4;
                    window.lpBufferFc = r().filter(t => t.time > e), window.lpBufferIm = s().filter(t => t.time > e)
                }()
        }

        function u(e) {
            l() && (r().push(...e.map(e => ({
                time: Date.now(),
                ev: JSON.stringify(e),
                warned: !1
            }))), setTimeout(d, 0)), o("green", "fc", ...e)
        }
        window.longpollTesting_onImEvents = function(e) {
            l() && (s().push(...e.map(e => ({
                time: Date.now(),
                ev: JSON.stringify(e),
                warned: !1
            }))), setTimeout(d, 1100)), o("blue", "im", ...e)
        }
    },
    gF8j: function(e, t, i) {
        "use strict";
        var a = i("uQjJ");

        function o() {
            return !!window.isMVK
        }
        i.d(t, "a", function() {
            return s
        });
        var r = browser.iphone || browser.ipad || browser.ipod;

        function s(e) {
            this.started = !1, this.is_idle = !0, this.activeTimeStart = null, this.cbActiveB = this.cbActive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.onVisiblityChange = this.onVisiblityChange.bind(this), this.opts = extend({
                triggerEvents: "mousemove keydown",
                onIdleCb: function() {},
                onUnIdleCb: function() {},
                focusElement: e.element,
                element: null,
                idleTimeout: 3e4
            }, e)
        }

        function n(e, t, i) {
            o() ? window.addEvent(e, t, i, {
                passive: !0
            }) : window.addEvent(e, t, i)
        }

        function c(e, t, i) {
            o() ? window.removeEvent(e, t, i, {
                passive: !0
            }) : window.removeEvent(e, t, i)
        }

        function l() {
            return document.visibilityState || document.webkitVisibilityState
        }

        function d() {
            var e = "visibilitychange";
            return document.visibilityState || (document.webkitVisibilityState ? e += "webkit" : e = ""), e
        }
        extend(s.prototype, a.a.prototype), extend(s.prototype, {
            stop: function() {
                this.started = !1, c(this.opts.element, this.opts.triggerEvents, this.cbActiveB), o() && this._isTopLevel() && d() && c(document, d(), this.onVisiblityChange), o() && r || (c(this.opts.focusElement, "focus", this.cbActiveB), c(this.opts.focusElement, "blur", this.cbInactiveB)), clearTimeout(this.setIdleTo), clearTimeout(this.checkIdleCbTo), clearTimeout(this.sendCbTO), this.is_idle = !0, this.opts.parentManager && this.opts.parentManager.off("idle", this.cbInactiveB)
            },
            idle: function(e) {
                this.is_idle = !0, e || this.opts.onIdleCb(), this.emit("idle")
            },
            unidle: function(e) {
                this.is_idle = !1, e || this.opts.onUnIdleCb(), this.emit("unidle")
            },
            start: function() {
                this.started = !0, !o() && browser.mobile || (this.is_idle = !this._isFocused(), this.opts.parentManager && this.opts.parentManager.on("idle", this.cbInactiveB), o() && this._isTopLevel() && d() && n(document, d(), this.onVisiblityChange), o() && r || (n(this.opts.focusElement, "focus", this.cbActiveB), n(this.opts.focusElement, "blur", this.cbInactiveB)), clearTimeout(this.checkIdleCbTo), this.checkIdleCb(), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
            },
            checkIdleCb: function() {
                this.started && (n(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.setIdleTo), this.setIdleTo = setTimeout(this.cbInactiveB, this.opts.idleTimeout))
            },
            cbActive: function() {
                this.started && (this.activeTimeStart = (new Date).getTime(), clearTimeout(this.setIdleTo), this.is_idle && (this.is_idle = !1, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                    this.emit("unidle"), this.opts.onUnIdleCb && this.opts.onUnIdleCb()
                }.bind(this), 100)), c(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.checkIdleCbTo), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
            },
            cbInactive: function() {
                this.started && (this.activeTimeStart = null, this.is_idle || (this.is_idle = !0, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                    this.emit("idle"), this.opts.onIdleCb && this.opts.onIdleCb()
                }.bind(this), 100)), clearTimeout(this.checkIdleCbTo), c(this.opts.element, this.opts.triggerEvents, this.cbActiveB), n(this.opts.element, this.opts.triggerEvents, this.cbActiveB), this.checkIdleCbTo = setTimeout(this.checkIdleCb, this.opts.idleTimeout))
            },
            getActiveTime() {
                return !this.is_idle && this.activeTimeStart ? (new Date).getTime() - this.activeTimeStart : 0
            },
            onVisiblityChange() {
                "visible" === l() ? this.cbActiveB() : this.cbInactiveB()
            },
            _isTopLevel() {
                var e = this.opts.focusElement;
                return e === window || e === document
            },
            _isFocused() {
                var e = this.opts.focusElement;
                if (this._isTopLevel()) {
                    var t = l();
                    return "string" == typeof t && "visible" === t
                }
                return document.activeElement === e
            }
        })
    },
    gQAo: function(e, t, i) {
        "use strict";
        i.d(t, "a", function() {
            return _
        }), i.d(t, "c", function() {
            return p
        }), i.d(t, "d", function() {
            return v
        }), i.d(t, "b", function() {
            return m
        });
        i("VRzm"), i("Btvt");
        var a = i("iN1s"),
            o = i("EUzL"),
            r = i("P+eJ"),
            s = i("ERyv"),
            n = window.vk,
            c = window.lpConnect,
            l = window.lpInstance;

        function d() {
            return n.id > 0
        }

        function u() {
            return window.curNotifier && window.curNotifier.lp_connected
        }

        function f() {
            return window.curNotifier && window.curNotifier.is_server || window.browser.safari
        }

        function h(e, t, i) {
            l.onLp(e, t, i), u() && f() && (e != t || i.length) && function(e, t, i) {
                window.Notifier.lcSend("lp_data", {
                    tsOld: e,
                    tsNow: t,
                    evs: i
                }), Object(r.b)("silver", "broadcast to others", e, t, i)
            }(e, t, i)
        }

        function _() {
            return d() ? (l || (n.lpConfig.id = n.id, window.lpConnect = c = Object(a.a)(n.lpConfig, h), function() {
                var e = Object(o.a)(n.lpConfig.ts, e => {
                        Object(r.a)(e), t.trigger("data", e)
                    }, g),
                    t = new window.EventEmitter;
                window.lpInstance = l = {
                    onData(e) {
                        t.on("data", e)
                    },
                    offData(e) {
                        t.off("data", e)
                    },
                    pause() {
                        e.pause()
                    },
                    resume() {
                        e.resume()
                    },
                    push(e) {
                        t.trigger("data", e)
                    },
                    abortWaiting() {
                        c.abortWaiting()
                    },
                    onLp(t, i, a) {
                        e.onLp(t, i, a)
                    },
                    isEnabled: () => !(!c || c.isStopped())
                }
            }()), l) : null
        }

        function p() {
            d() && (Object(r.b)("orange", "init longpoll connection on load"), _(), window.curNotifier.idle_manager.on("unidle", () => {
                c.abortWaiting()
            }), v())
        }

        function v() {
            d() && (u() ? c.isStopped() && f() ? (Object(r.b)("orange", "now master, init connection"), Object(s.b)("fc_longpoll_master", {}, !1), c.reinitConnection()) : c.isStopped() || f() || (Object(r.b)("orange", "now slave, stop connection"), Object(s.b)("fc_longpoll_slave", {}, !1), c.stopConnection()) : setTimeout(v, 500))
        }

        function m(e) {
            u() && !f() && d() && (Object(r.b)("silver", "recv from master", e.tsOld, e.tsNow, e.evs), c.onLp(e.tsOld, e.tsNow, e.evs))
        }

        function g(e) {
            var t = window.extend({}, window.lpConnect.options, {
                ts: e
            });
            return Object(r.b)("orange", "createLongpoll to load from", e), new Promise(e => {
                var i = Object(a.a)(t, (t, a, o) => {
                    Object(r.b)("orange", `Loaded [${t},${a})`), i.stopConnection(), e([t, a, o])
                })
            })
        }
    },
    hOuX: function(e, t, i) {
        "use strict";
        i.d(t, "a", function() {
            return o
        });
        i("tuSo");
        var a = 2147483647;

        function o() {
            try {
                if (window.crypto) {
                    var e = new Int32Array(1);
                    return crypto.getRandomValues(e), Math.abs(e.reduce((e, t) => e + t))
                }
            } catch (e) {}
            return intval(rand(0, a).toFixed(0))
        }
    },
    iN1s: function(e, t, i) {
        "use strict";
        i("rGqo"), i("Btvt"), i("rE2o"), i("ioFf"), i("VRzm");
        var a = i("DM26"),
            o = i("BxOC"),
            r = i("f01n");

        function s(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var i = [],
                    a = !0,
                    o = !1,
                    r = void 0;
                try {
                    for (var s, n = e[Symbol.iterator](); !(a = (s = n.next()).done) && (i.push(s.value), !t || i.length !== t); a = !0);
                } catch (e) {
                    o = !0, r = e
                } finally {
                    try {
                        a || null == n.return || n.return()
                    } finally {
                        if (o) throw r
                    }
                }
                return i
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var n = 202,
            c = 7,
            l = 4,
            d = -3,
            u = -4,
            f = -5;

        function h(e, t) {
            e.waitAbortFns.push(t)
        }

        function _(e) {
            if (e.isStoppedFn()) return Promise.resolve({
                ts: 0,
                updates: []
            });
            var t = Object(o.a)(e.url, {
                    act: "a_check",
                    key: e.key,
                    version: e.version,
                    ts: e.ts,
                    wait: 25,
                    mode: e.mode
                }),
                i = t.request,
                r = t.cancel;
            return e.stopFn = r, i.then(t => {
                var i = s(t, 2),
                    a = i[0],
                    o = i[1];
                return e.onData(e, o), e.waitTimeout = 2, JSON.parse(a)
            }).catch(t => {
                var i = s(t, 2),
                    a = (i[0], i[1]);
                throw e.onData(e, a), ""
            }).then(t => (function(e, t) {
                var i = t.failed ? Object(a.a)(l, null) : {},
                    o = i.abort,
                    r = i.pause;
                switch (t.failed) {
                    case 1:
                        return h(e, o), e.onHistoryLost(e, t).then(() => e.onResult({
                            ts: t.ts,
                            updates: [
                                [-1]
                            ]
                        })).then(r).then(() => _(e));
                    case 2:
                        return h(e, o), e.onKeyExpired(e, t).then(t => {
                            var i = s(t, 4),
                                a = i[0],
                                o = i[1],
                                r = i[2],
                                n = i[3];
                            return e.onResult({
                                ts: +n,
                                updates: [
                                    [-2, a, `${o}/${r}`],
                                    [-1]
                                ]
                            })
                        }).then(r).then(() => _(e));
                    case 3:
                        return e.onLpBroken(e, t);
                    default:
                        return t
                }
            })(e, t))
        }

        function p(e) {
            e.isStoppedFn() || _(e).then(e.onResult).then(() => e.isReconnecting && v(e, f)).catch(t => (function(e, t) {
                if (e.isStoppedFn()) return;
                e.onRequestError(t), e.waitTimeout = Math.min(60, 2 * e.waitTimeout), v(e, d);
                var i = Object(a.a)(e.waitTimeout, null),
                    o = i.abort,
                    r = i.pause;
                return h(e, o), r().then(() => v(e, u))
            })(e, t)).then(() => p(e))
        }

        function v(e, t) {
            e.isReconnecting = t === u, e.onResult({
                ts: e.ts,
                updates: [
                    [t, e.waitTimeout]
                ]
            })
        }

        function m(e, t) {
            var i = !!e.stopped,
                a = {
                    id: e.id,
                    key: e.key,
                    ts: e.ts,
                    url: e.url,
                    lpstat: e.lpstat || 0,
                    version: e.version || c,
                    mode: n,
                    waitTimeout: 2,
                    waitAbortFns: [],
                    isStoppedFn: () => i,
                    onResult: e => {
                        e.ts && s(a.ts, e.ts, function(e) {
                            return e.map(e => {
                                switch (e[0]) {
                                    case 0:
                                        return r.lb(e);
                                    case 1:
                                        return r.Cb(e);
                                    case 2:
                                        return r.Kb(e);
                                    case 3:
                                        return r.Gb(e);
                                    case 4:
                                        return r.eb(e);
                                    case 5:
                                        return r.mb(e);
                                    case 6:
                                        return r.ub(e);
                                    case 7:
                                        return r.vb(e);
                                    case 8:
                                        return r.rb(e);
                                    case 9:
                                        return r.qb(e);
                                    case 10:
                                        return r.Fb(e);
                                    case 11:
                                        return r.Bb(e);
                                    case 12:
                                        return r.Jb(e);
                                    case 13:
                                        return r.kb(e);
                                    case 18:
                                        return r.Db(e);
                                    case 51:
                                        return r.ib(e);
                                    case 52:
                                        return r.jb(e);
                                    case 63:
                                        return r.Mb(e);
                                    case 64:
                                        return r.yb(e);
                                    case 70:
                                        return r.Ob(e);
                                    case 80:
                                        return r.Nb(e);
                                    case 114:
                                        return r.tb(e);
                                    case 116:
                                        return r.Ab(e);
                                    case 117:
                                        return r.fb(e);
                                    case -1:
                                        return r.Ib();
                                    case -2:
                                        return r.zb(e);
                                    case d:
                                        return r.Pb(e);
                                    case u:
                                        return r.xb();
                                    case f:
                                        return r.wb();
                                    default:
                                        return r.ob(e)
                                }
                            })
                        }(e.updates))
                    },
                    onData: g(t.onData),
                    onRequestError: g(t.onRequestError),
                    onHistoryLost: b(t.onHistoryLost),
                    onKeyExpired: b(t.onKeyExpired),
                    onLpBroken: b(t.onHistoryLost)
                },
                o = t.onEvents;

            function s(e, t, i) {
                a.ts = t;
                for (var s = 0; s < i.length; ++s) i[s].type === r.O && (a.key = i[s].key, a.url = i[s].url);
                o(e, t, i)
            }
            var l = {
                options: a,
                isStopped: () => i,
                stopConnection() {
                    i = !0, a.stopFn && a.stopFn(), a.stopFn = void 0, this.abortWaiting()
                },
                reinitConnection() {
                    this.stopConnection(), v(a, u), i = !1, p(a)
                },
                abortWaiting() {
                    a.waitAbortFns.forEach(e => e()), a.waitAbortFns = [], a.waitTimeout = 2
                },
                onLp: s
            };
            return p(a), l
        }

        function g(e) {
            return e || (() => {})
        }

        function b(e) {
            return e ? function() {
                return Promise.resolve(e(...arguments))
            } : () => Promise.reject()
        }
        var C = i("P+eJ"),
            w = i("vT4u");

        function N(e, t) {
            return m(e, {
                onEvents: t,
                onData: k,
                onRequestError: E,
                onHistoryLost: x,
                onKeyExpired: S,
                onLpBroken: B
            })
        }
        i.d(t, "a", function() {
            return N
        });
        var y = 3e4,
            T = {},
            F = Date.now();

        function k(e, t) {
            if (t && t.status && e.lpstat) {
                var i = t.status;
                t.status >= 500 && t.status < 600 && statlogsValueEvent("fc_longpoll", 1, i, t.getResponseHeader("x-frontend")), T[i] = i in T ? T[i] + 1 : 1, Date.now() - F >= y && (Object.keys(T).forEach(e => {
                    statlogsValueEvent("fc_longpoll", T[e], e, t.getResponseHeader("x-frontend"))
                }), T = {}, F = Date.now())
            }
        }

        function E(e) {
            Object(C.b)("red", "LP error", e.message || "no message (probably browser reset)")
        }

        function x(e, t) {
            Object(C.b)("red", "LP failed: old timestamp; resync, next ts", t.ts)
        }

        function S(e) {
            return Object(C.b)("red", "LP failed: key is incorrect; refresh key"), Object(o.b)(w.e, {
                act: "a_get_key",
                uid: e.id,
                gid: e.id < 0 ? -e.id : 0
            })
        }

        function B() {
            throw window.nav.reload({
                force: !0
            }), new Error("ts is very wrong")
        }
    },
    j0Lq: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("SRfc"),
            core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("pIFo"),
            core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KKXr"),
            core_js_modules_es6_string_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("tUrg"),
            core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("a1Th"),
            core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Btvt"),
            _lib_debug_tools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("98sY"),
            _shared_user_user_env__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("W9Tc");
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
            from: "",
            viewsObserver: null,
            viewedNotifications: []
        }), window.TopNotifier = {
            onBellMouseDown: function(e) {
                return !checkKeyboardEvent(e) && TopNotifier.show(e)
            },
            onBellClick: function(e) {
                return !!checkEvent(e) || !!checkKeyboardEvent(e) && TopNotifier.show(e)
            },
            onLoad: function onLoad(rows, js, from, header) {
                if (!from || TopNotifierCur.from !== from) {
                    void 0 !== rows && "undefined" !== rows || ajax.plainpost("/errors.php", {
                        msg: ajax.lastResp || "TopNotifier load undefinded response",
                        module: "top_notify",
                        id: vk.id,
                        host: locHost,
                        lang: vk.lang,
                        loc: (window.nav || {}).strLoc,
                        realloc: location.toString()
                    });
                    var evalExpr = `(function(){${js};})()`;
                    try {
                        eval(evalExpr)
                    } catch (e) {
                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_6__.f)(e, evalExpr)
                    }
                    TopNotifierCur.loaded = !0, val(TopNotifier.getContentNode(), rows), TopNotifier.trackViews(), show(geByClass1("top_notify_show_all")), TopNotifier.refreshHeader(header), TopNotifier.cleanCount(), TopNotifier.refreshCounters(), TopNotifierCur.from = from
                }
            },
            trackViews: function() {
                var e = ge("top_notify_cont");
                "IntersectionObserver" in window && (TopNotifierCur.viewsObserver && TopNotifierCur.viewsObserver.disconnect(), TopNotifierCur.viewsObserver = new IntersectionObserver(function(e) {
                    e.forEach(e => {
                        var t = e.target.parentNode.dataset.notification_id;
                        e.isIntersecting && -1 === TopNotifierCur.viewedNotifications.indexOf(t) && (TopNotifierCur.viewedNotifications.push(t), statlogsValueEvent("notifications_views", t))
                    })
                }, {
                    root: e,
                    threshold: .6
                }), geByClass("feedback_row", e).forEach(function(e) {
                    TopNotifierCur.viewsObserver.observe(e)
                }))
            },
            refreshHeader: function(e) {
                var t, i = geByClass1("_notify_unread"),
                    a = e && !geByClass1("_top_notify_header"),
                    o = i && i.offsetHeight;
                if (a ? (TopNotifierCur.header = se(e), t = ce("div", {
                        className: "top_notify_header_label"
                    }), TopNotifierCur.header.appendChild(t)) : t = geByClass1("top_notify_header_label", TopNotifierCur.header), a) {
                    val(t, "");
                    var r = "";
                    TopNotifierCur.notify_sources.forEach(function(e) {
                        "" !== e.list && e.list === TopNotifierCur._qParams.list && (r = e.name)
                    }), "" === r && (r = getLang("global_notifications_user"));
                    var s, n = ce("div", {
                            className: "top_notify_header_sup_label"
                        }),
                        c = ce("span", {
                            className: "top_notify_header_label_user",
                            innerHTML: r
                        }),
                        l = ce("span", {
                            className: "top_notify_header_label_groups"
                        }),
                        d = ce("a", {
                            onmouseover: function(e) {
                                TopNotifier.getSourcesTip(this, e)
                            },
                            className: "top_notify_header_label_groups_link",
                            innerHTML: getLang("global_notifications_groups")
                        });
                    if (l.appendChild(d), s = ce("span", {
                            className: "top_notify_header_label_groups_counter",
                            innerHTML: ""
                        }), n.appendChild(c), cur.user_has_admined_groups > 0 && (n.appendChild(l), n.appendChild(s)), t.appendChild(n), o) {
                        var u = ce("div", {
                            className: "top_notify_header_sub_label",
                            innerHTML: getLang("global_viewed_notifications")
                        });
                        t.appendChild(u)
                    }
                }
                a && TopNotifierCur.wrapper.insertBefore(TopNotifierCur.header, TopNotifierCur.wrapper.firstChild), TopNotifierCur.header_unread = geByClass1("_notify_header"), TopNotifierCur.header_unread && (o ? (TopNotifierCur.header_unread_hidden && slideDown(TopNotifierCur.header_unread, 100), TopNotifierCur.header_unread_hidden = !1, TopNotifierCur.header_unread_handler || (TopNotifierCur.header_unread_height = TopNotifierCur.header_unread.offsetHeight, TopNotifierCur.header_unread_handler = function(e) {
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
                    onDone: function(e, t, i, a) {
                        TopNotifier.shown() && geByClass1("pr", "top_notify_cont") && (TopNotifier.onLoad(e, t, i, a), TopNotifierCur.loaded = !0)
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
                            var evalExpr = `(function(){${js};})()`;
                            try {
                                eval(evalExpr)
                            } catch (e) {
                                Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_6__.f)(e, evalExpr)
                            }
                            if (rows) {
                                for (var row = null, cont = TopNotifier.getContentNode(), au = cf(rows); row = au.firstChild;) cont.insertBefore(row, btn);
                                TopNotifier.refreshHeader(), TopNotifier.trackViews()
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
            updateTime: function(e) {
                each(geByClass("rel_date_needs_update", e, "span"), function(e, t) {
                    if (t) {
                        var i = intval(t.getAttribute("time")),
                            a = 60 * ((new Date).getTimezoneOffset() + 180),
                            o = getDateText(i, a);
                        !0 === hasClass(this, "ucfirst") && (o = o.charAt(0).toUpperCase() + o.slice(1)), t.innerHTML = o
                    }
                })
            },
            createNewEventsBox: function(e) {
                if (Object(_shared_user_user_env__WEBPACK_IMPORTED_MODULE_7__.a)("notify_new_events_box")) {
                    var t = TopNotifier.getContentNode();
                    if (t) {
                        var i = geByClass1("notifications_new_events", t);
                        e > 0 ? (i || ((i = document.createElement("div")).className = "feed_row _feed_row notifications_new_events", i.onclick = function(e) {
                            i.onclick = null, showProgress(i), TopNotifierCur._qParams.list = "", TopNotifier.refresh(e, !1)
                        }), i.innerHTML = langStr(getLang("notifications_new_events", e), "count", e), t.insertBefore(i, t.children[0])) : i && !TopNotifierCur.loading && re(i)
                    }
                }
            },
            show: function(e) {
                if (gpeByClass("top_notify_cont", e.target)) return !0;
                if (!0 !== checkEvent(e) && !vk.isBanned) {
                    if (TopNotifier.shown()) return gpeByClass("top_notify_wrap", e.target, ge("top_nav")) || TopNotifier.hide(), cancelEvent(e);
                    var t = ge(TopNotifierCur.link),
                        i = ge("top_notify_cont");
                    TopNotifier.updateTime(i), TopNotifierCur.timeUpdateInt = setInterval(function() {
                        TopNotifier.updateTime(i)
                    }, 1e4), cur.introNotifyTooltipHide && (cur.introNotifyTooltipHide(), delete cur.introNotifyTooltipHide), t.tt && t.tt.hide && t.tt.hide(), i || (TopNotifierCur.wrapper = ce("div", {
                        innerHTML: '<div id="top_notify_cont" class="top_notify_cont wall_module" ontouchstart="event.cancelBubble = true;" onmousedown="event.cancelBubble = true;"></div><a href="/feed?section=notifications' + (TopNotifierCur._qParams.list ? "&list=" + TopNotifierCur._qParams.list : "") + '" class="top_notify_show_all" onmousedown="event.cancelBubble = true;" onclick="TopNotifier.hide(); return nav.go(this, event);">' + getLang("global_notify_show_all") + "</a>",
                        id: "top_notify_wrap",
                        className: "scroll_fix_wrap top_notify_wrap"
                    }), t.appendChild(TopNotifierCur.wrapper), i = ge("top_notify_cont"));
                    var a = window.innerHeight || document.documentElement.clientHeight;
                    setStyle(i, {
                        maxHeight: Math.min(Math.max(a - 200, 300), 600)
                    }), addClass(TopNotifierCur.link, "active");
                    var o = uiScroll;
                    return TopNotifierCur.scrollbar && TopNotifierCur.scrollbar.container.__uiScroll__ || (TopNotifierCur.scrollbar = new o(i, {
                        global: !0,
                        stopScrollPropagationAlways: !0,
                        onmore: TopNotifier.loadMore
                    })), TopNotifierCur.loaded ? TopNotifier.trackViews() : TopNotifier.refresh(), window.pushNotifier && window.pushNotifier.cleanNotification(), cancelStackPush("top_notifier", TopNotifier.hide.bind(TopNotifier), !0), cancelEvent(e)
                }
            },
            hide: function() {
                TopNotifier.shown() && (TopNotifierCur.viewedNotifications = [], removeClass(TopNotifierCur.link, "active"), clearInterval(TopNotifierCur.timeUpdateInt), cancelStackFilter("top_notifier", !0), "" !== TopNotifierCur._qParams.list && (TopNotifierCur._qParams.list = "", TopNotifier.invalidate()))
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
                function t(t, i) {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function(e, t) {
                if (!TopNotifier.shown() && !isVisible("dev_top_nav")) {
                    var i = ge(TopNotifierCur.link),
                        a = {};
                    if (i) {
                        if ("shownow" == i.tt && removeAttr(i, "tt"), e) a.text = function() {
                            return e
                        }, t && (a.onHide = s.pbind(t));
                        else {
                            i.tt && i.tt.destroy && i.tt.destroy();
                            var o = ls.get("ntfseen") || {},
                                r = [];
                            each(o, function(e, t) {
                                r.push(e + ":" + t)
                            }), a = extend(a, {
                                url: "al_feed.php",
                                params: {
                                    act: "a_last_notify",
                                    seen: r.join(";")
                                },
                                ajaxdt: 2e3,
                                noload: 1,
                                onHide: s
                            })
                        }
                        showTooltip(i, extend(a, {
                            typeClass: "top_notify_tt",
                            dir: "up",
                            width: 250,
                            shift: [1, 0],
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

                function s(e) {
                    if (!e && cur.topNotifyTTKey && (e = cur.topNotifyTTKey, delete cur.topNotifyTTKey), e) {
                        var t = e.split(":"),
                            i = ls.get("ntfseen") || {};
                        2 === t.length && (i[0] = parseInt((new Date).getTime() / 1e3), i[t[0]] = t[1], ls.set("ntfseen", i))
                    }
                }
            }),
            invalidate: function() {
                TopNotifierCur.loaded = !1, TopNotifierCur.from = "", ajax.invalidate("/al_feed.php", TopNotifierCur._qParams), TopNotifierCur.ajax && TopNotifierCur.ajax.abort()
            },
            setCount: function(e, t) {
                isString(e) && (e = trim(e)), parseInt(e) >= 100 && (e = "+99"), hasClass(TopNotifierCur.link, "has_notify") && e ? animateCount(TopNotifierCur.count, e, {
                    str: "auto"
                }) : val(TopNotifierCur.count, e), toggleClass(TopNotifierCur.link, "has_notify", !!e), t || TopNotifier.invalidate()
            },
            cleanCount: function() {
                if (cur.topNotifyHash) {
                    var e = cur.groupNotify_readGids || [];
                    cur.groupNotify_readGids = [], TopNotifierCur.notify_sources.forEach(function(t, i) {
                        var a = parseInt(t.list.replace("group-", ""));
                        t.list !== TopNotifierCur._qParams.list && -1 === e.indexOf(a) || (TopNotifierCur.notify_sources[i].counter = 0)
                    }), ajax.post("/al_feed.php", {
                        act: "a_clean_notify",
                        hash: cur.topNotifyHash,
                        list: TopNotifierCur._qParams.list,
                        gn_readGids: e
                    })
                }
            },
            refresh: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                    t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                null !== e && cancelEvent(e), TopNotifier.invalidate(), TopNotifierCur.wrapper && !TopNotifierCur.loading && (TopNotifierCur.loading = !0, t && (re(geByClass1("_notify_header")), re(geByClass1("_top_notify_header"))), TopNotifierCur.from = 0, ajax.post("/al_feed.php", TopNotifierCur._qParams, {
                    cache: 1,
                    onDone: (e, t, i, a) => {
                        TopNotifierCur.loading = !1, TopNotifier.onLoad(e, t, i, a)
                    },
                    showProgress: () => {
                        t && TopNotifier.showProgress()
                    },
                    stat: ["feed.css"],
                    onFail() {
                        TopNotifierCur.loading = !1, hide(geByClass1("top_notify_show_all")), TopNotifier.hideProgress(), val(TopNotifier.getContentNode(), '<div class="top_notify_empty no_rows error_message"><div>' + getLang("global_notify_error_occured") + '</div><button class="flat_button button_small secondary" onclick="TopNotifier.refresh(event);">' + getLang("global_notify_refresh") + "</button></div>")
                    },
                    no_ads_params: !0
                }))
            },
            unifiedDeleteRow: function(e, t, i, a, o) {
                cancelEvent(e);
                var r = gpeByClass("feed_row", o),
                    s = geByClass1("post_actions", r),
                    n = geByClass1("feedback_row_wrap", r);
                ajax.post("al_feed.php", {
                    act: "a_feedback_unified_delete",
                    query: t,
                    hash: i,
                    from: "top_notifier"
                }, {
                    onDone: function(e) {
                        "." !== a.substr(-1) && (a += ".");
                        var o = getLang("global_cancel"),
                            s = `${a} <a onclick="TopNotifier.unifiedRestoreRow('${t}', '${i}', this);return cancelEvent(event);">${o}</a>`;
                        e && (s += "<br>" + e);
                        var c = ce("div", {
                            className: "feedback_deleted_container"
                        });
                        c.appendChild(ce("div", {
                            className: "feedback_row dld _feedback_deleted _top_feedback_deleted",
                            innerHTML: s
                        })), r.appendChild(c), hide(n), hasClass(r, "feedback_row_clickable") && addClass(r, "feedback_row_touched")
                    },
                    showProgress: addClass.pbind(s, "post_actions_progress"),
                    hideProgress: removeClass.pbind(s, "post_actions_progress")
                })
            },
            unifiedRestoreRow: function(e, t, i) {
                var a = gpeByClass("feed_row", i),
                    o = gpeByClass("feedback_deleted_container", geByClass1("_feedback_deleted", a)),
                    r = geByClass1("feedback_row_wrap", a);
                if (o && r) {
                    var s = ce("span", {
                        className: "progress_inline"
                    });
                    ajax.post("al_feed.php", {
                        act: "a_feedback_unified_restore",
                        query: e,
                        hash: t,
                        from: "top_notifier"
                    }, {
                        onDone: function() {
                            show(r), re(o), removeClass(a, "feedback_row_touched")
                        },
                        showProgress: () => i.parentNode.replaceChild(s, i),
                        hideProgress: () => s.parentNode.replaceChild(i, s)
                    })
                }
            },
            notifyMarkSpam: function(e, t) {
                ajax.post("al_feed.php", {
                    act: "a_feedback_mark_spam",
                    item: e,
                    hash: t
                }, {
                    onDone: function(t) {
                        ge("notify_mark_spam_" + e).innerHTML = t
                    }
                })
            },
            notifyDeleteAll: function(e, t, i, a) {
                if (cur.notifyDeletingAll || (cur.notifyDeletingAll = {}), !cur.notifyDeletingAll[e]) {
                    cur.notifyDeletingAll[e] = 1;
                    var o = ce("span", {
                        className: "progress_inline"
                    });
                    ajax.post("al_feed.php", {
                        act: "a_feedback_delete_all",
                        uid: e,
                        item: i,
                        hash: t
                    }, {
                        onDone: function(t, i) {
                            var o = gpeByClass("_feedback_deleted", a);
                            if (1 != i) {
                                var r, s = !1;
                                if ((s = hasClass(o, "_top_feedback_deleted") ? ge("top_notify_cont") : cur.rowsCont) && (r = s.firstChild)) {
                                    var n, c, l = !1,
                                        d = scrollGetY();
                                    do {
                                        r.className && hasClass(r, "_feed_row") && r.firstChild && e == r.firstChild.getAttribute("author") && (n = r.offsetHeight, c = r.offsetTop, !1 === l && (l = getXY(r.offsetParent)[1]), hide(r), c + l < d && (d -= n, scrollToY(d, 0)))
                                    } while (r = r.nextSibling);
                                    (0 === cur.wasScroll || cur.wasScroll > 0) && (cur.wasScroll = d)
                                }
                                o.innerHTML = '<span class="dld_inner">' + t + "</span>"
                            } else re(gpeByClass("_feed_row", o))
                        },
                        showProgress: function() {
                            a && "button" === a.tagName.toLowerCase() ? lockButton(a) : a.parentNode.replaceChild(o, a)
                        },
                        hideProgress: function() {
                            a && "button" === a.tagName.toLowerCase() ? unlockButton(a) : o.parentNode.replaceChild(a, o)
                        }
                    })
                }
            },
            checkClick: function(e, t) {
                if (t = t || window.event, !e || !t) return !0;
                var i = t.target || t.srcElement,
                    a = 8,
                    o = !1,
                    r = /(feedback_sticky_text|feedback_sticky_icon|feedback_row)/;
                do {
                    if (!i || i === e || i.onclick || i.onmousedown || inArray(i.tagName, ["A", "IMG", "TEXTAREA", "EMBED", "OBJECT"]) || (o = i.className.match(r))) break
                } while (a-- && (i = i.parentNode));
                if (!o) return !1;
                if (i && i.className) {
                    var s = i.className.split(" "),
                        n = "unknown",
                        c = -1,
                        l = geByClass("feedback_row"),
                        d = domPN(i);
                    for (a = 0; a < s.length; ++a) {
                        var u = s[a].match("feedback_(.+)_row");
                        if (s[a] && u && u[1]) {
                            n = u[1];
                            break
                        }
                    }
                    for (a = 0; a < l.length; ++a)
                        if (l[a] === i) {
                            c = a;
                            break
                        }
                    hasClass(e, "feed_row_from_group") ? statlogsValueEvent("feed_group_notify", 0, "click", n, c, d.dataset.notification_id) : statlogsValueEvent("feed_top_notify", 0, "click", n, c, d.dataset.notification_id)
                }
                return i || !0
            },
            ungroupUnified: function(e, t) {
                e = domClosest("_feed_row", e), show(domNS(e)), re(e), t.stopPropagation(), t.preventDefault()
            },
            showActionsMenu: function(e) {
                var t = !1,
                    i = domClosest("_feed_row", e),
                    a = domPN(i);
                hasClass(a, "_notify_unread") && (a = domPN(a)), a.lastChild != i || hasClass(a, "feed_row_fb_hidden") || hasClass(a, "feedback_sticky_rows") && domPN(a).lastChild != a || (t = {
                    appendParentCls: "top_notify_wrap",
                    processHoverCls: hasClass(domPN(e), "post_actions") ? "feedback_row" : "feedback_sticky_row"
                }), uiActionsMenu.show(e, !1, t)
            },
            hideActionsMenu: function(e) {
                uiActionsMenu.hide(e)
            },
            frProcess: function(e, t, i, a) {
                var o;
                isButtonLocked(i) || (o = a ? {
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
                }, statlogsValueEvent("feed_top_notify", 0, "friends", o.act), ajax.post("/al_friends.php", o, {
                    onDone: function(t) {
                        var o = domPN(i);
                        val(o, t), addClass(o, "feedback_buttons_response"), "friends" == cur.module && window.Friends && (val("request_controls_" + e, t), window.Friends.processRequest(e, a))
                    },
                    onFail: function(e) {
                        if (e) return setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0
                    },
                    showProgress: lockButton.pbind(i),
                    hideProgress: unlockButton.pbind(i)
                }))
            },
            apiCallProcess: function(e, t, i, a, o, r, s, n) {
                if (isButtonLocked(n)) return !1;
                var c = function() {
                    ajax.post("/al_feed.php", {
                        act: "a_api_call",
                        hash: cur.topNotifyHash,
                        query: e
                    }, {
                        onDone: function(e) {
                            var a = domPN(n),
                                o = `<div class="feedback_apicallText">${i?`<div class="feedback_apicallIcon ${i}Icon"></div>`:""}${t}</div>`;
                            val(a, o)
                        },
                        onFail: function(e) {
                            if (e) return setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0
                        },
                        showProgress: lockButton.pbind(n),
                        hideProgress: unlockButton.pbind(n)
                    })
                };
                return o ? (a = a || getLang("global_action_confirmation"), cur.confirmBox = showFastBox(a, o, r, function() {
                    c(), cur.confirmBox.hide()
                }, s)) : c(), !0
            },
            grProcess: function(e, t, i, a) {
                if (!(hasClass(i, "flat_button") && isButtonLocked(i) || domFC(i) && "progress_inline" == domFC(i))) {
                    var o = -2 == a ? "spam" : a ? "enter" : "leave",
                        r = -1 == a ? "_decline" : "";
                    ajax.post("/al_groups.php", {
                        act: o,
                        gid: e,
                        hash: t,
                        from: "top_notifier",
                        context: r
                    }, {
                        onDone: function(e) {
                            var t = domPN(i);
                            val(t, e), addClass(t, "feedback_buttons_response")
                        },
                        onFail: function(e) {
                            if (e) return setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0
                        },
                        showProgress: function() {
                            if (-2 == a) {
                                i.oldhtml = i.innerHTML;
                                var e = getSize(i)[0];
                                i.innerHTML = '<span class="progress_inline"></span>', setStyle(domFC(i), {
                                    width: e
                                })
                            } else lockButton(i)
                        },
                        hideProgress: function() {
                            -2 == a ? i.innerHTML = i.oldhtml : unlockButton(i)
                        }
                    })
                }
            },
            gn_grProcess: function(e, t, i, a, o, r) {
                return o.stopPropagation(), (!hasClass(a, "flat_button") || !isButtonLocked(a)) && ((!domFC(a) || "progress_inline" != domFC(a)) && (ajax.post("groupsedit.php", {
                    act: "user_action",
                    id: e,
                    addr: t,
                    hash: i,
                    from: "top_notifier",
                    action: r
                }, {
                    onDone: function(e) {
                        var t = domPN(a);
                        return val(t, e), addClass(t, "feedback_buttons_response"), !1
                    },
                    onFail: function(e) {
                        return !!e && (setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !1)
                    },
                    showProgress: function() {
                        lockButton(a)
                    },
                    hideProgress: function() {
                        unlockButton(a)
                    }
                }), !1))
            },
            showGiftBox: function(e, t, i) {
                return !showBox("al_gifts.php", {
                    act: "get_gift_box",
                    fids: e,
                    fr: 1,
                    ref: i
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
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                null !== i && cancelEvent(i), e !== TopNotifierCur._qParams.list ? (re(geByClass1("notify_sources")), t && val(geByClass1("ui_rmenu_count", t), ""), geByClass1("top_notify_show_all") && attr(geByClass1("top_notify_show_all"), "href", "/feed?section=notifications" + (e ? "&list=" + e : "")), TopNotifierCur._qParams.list = e, TopNotifier.refresh()) : hide(geByClass1("notify_sources"))
            },
            changeSourceFullCallback: function() {
                TopNotifier.refreshCounters(), TopNotifierCur.notify_sources.forEach(function(e) {
                    e.list && val(geByClass1("ui_rmenu_count", geByClass1("feed_section_" + e.list)), e.counter > 0 ? e.counter : "")
                });
                var e = geByTag1("a", geByClass1("header_side_link", geByClass1("feed_notifications")));
                "" === TopNotifierCur.settings_url ? hide(e) : (show(e), attr(e, "href", TopNotifierCur.settings_url)), TopNotifierCur.source_name || (TopNotifierCur.source_name = getLang("news_title_notifications")), val(geByClass1("page_block_header_inner", geByClass1("feed_notifications")), TopNotifierCur.source_name)
            },
            hideBanner: function(e, t, i) {
                ajax.post("al_feed.php", {
                    act: "a_feedback_hide_banner",
                    group_id: i,
                    hash: t
                }), hide(ge("internal_notification131"))
            },
            addNewSource: function(e, t, i) {
                return ajax.post("al_settings.php", {
                    act: "a_group_notify_add_source",
                    gid: e,
                    from: i,
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
                    i = 0,
                    a = geByClass1("top_notify_header_label_groups_counter");
                TopNotifierCur.notify_sources.forEach(function(a) {
                    "" !== a.list && a.counter > 0 && (1 === a.unmuted ? t++ : e++), "" === a.list && (i = a.counter)
                }), vk.counts.ntf = i + t, TopNotifier.setCount(i + t, !0), TopNotifier.createNewEventsBox(i), t > 0 ? (addClass(a, "unmuted"), val(a, t)) : (removeClass(a, "unmuted"), val(a, e > 0 ? e : ""))
            },
            refreshTooltip: function() {
                var e = geByClass1("groups", geByClass1("notify_sources")),
                    t = [],
                    i = [],
                    a = ce("div");
                e && (geByClass("line_cell", e).forEach(function(e, a) {
                    val(geByClass1("ui_rmenu_count", e)) > 0 ? t.push(e) : i.push(e)
                }), t.concat(i).forEach(function(e) {
                    a.appendChild(e)
                }), val(e, ""), e.appendChild(a))
            },
            showCommonFriendsBox: function(e, t) {
                return showTabbedBox("al_page.php", {
                    act: "box",
                    oid: t,
                    tab: "common"
                }, {
                    cache: 1
                }, e), !1
            }
        }
    },
    tuSo: function(e, t, i) {
        i("7DDg")("Int32", 4, function(e) {
            return function(t, i, a) {
                return e(this, t, i, a)
            }
        })
    },
    zNZe: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("SRfc"),
            core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("pIFo"),
            core_js_modules_es6_string_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("tUrg"),
            core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("KKXr"),
            _helpers_im_shared_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("p3re"),
            _longpoll_singleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("gQAo"),
            _lib_debug_tools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("98sY"),
            _shared_user_user_env__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("W9Tc"),
            _shared_lib_idle_manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("gF8j"),
            _shared_lib_convert__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("cGUQ"),
            ACTIVE_TAB_SWITCH_SERVER_TIMEOUT = browser.safari ? 3e3 : 1e4,
            LC_SERVER_SWITCH_TO_ACTIVE_FLAG = "lc_server_switch_to_active_flag",
            NOTIFICATION_FADE_TIMEOUT = 7e3,
            NOTIFICATION_FADE_TIMEOUT_ACCESSIBILITY_MODE = 35e3,
            NOTIFICATION_FADE_TIMEOUT_AFTER_UNFREEZE = 5e3,
            NOTIFICATION_FADE_TIMEOUT_ACCESSIBILITY_MODE_AFTER_UNFREEZE = 3e4,
            FEATURE_SHOW_DONE_BOX_NEW = "show_done_box_new";

        function showEventThumb(e) {
            var t = "",
                i = "";
            return e.author_photo && (t = "video_process_ready" === e.type ? `<div class="notifier_video_thumb" style="background-image: url('${Notifier.fixPhoto(e.author_photo)}')"></div>` : `<img alt="" src="${Notifier.fixPhoto(e.author_photo)}" class="notifier_image" />`, e.icon_type && (t = `<div class="feedback_photo_icon"></div>${t}`, i = ` feedback_${e.icon_type}_row`), e.author_link && (t = `<a href="${e.author_link}">${t}</a>`), t = `<div class="notifier_image_wrap${i}">${t}</div>`), t
        }

        function showEventAddPhoto(e) {
            var t = "";
            return e.add_photo && (t = `<div class="notifier_add_image_wrap"><img src="${e.add_photo}" class="notifier_add_image"></div>`), t
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
                            q_prior_events: [],
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
                            onConnectionId: [],
                            showDoneBoxLastId: -1
                        }, e), !this.initFrameTransport()) return !1;
                    this.initIdleMan(), this.initCommunityQueues(), Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_5__.c)(), (curNotifier.cont = ge("notifiers_wrap")) || bodyNode.insertBefore(curNotifier.cont = ce("div", {
                        id: "notifiers_wrap",
                        className: "fixed"
                    }), ge("page_wrap"))
                }
            },
            initCommunityQueues: function(e) {
                var t = ls.get("im_m_comms_key"),
                    i = t && t.split ? t.split(";") : [];
                if ("empty" === i[0] && i[1] && Date.now() - i[1] < 6e4 ? t = "empty" : "empty" === i[0] && (t = !1), t) return Notifier.proccessCommunityQueues(t, e || 0);
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
                    for (var e = curNotifier.uiNotifications, t = [], i = 0; i < e.length; i++) {
                        var a = e[i];
                        vkNow() - a[1] > 1e4 ? a[0].close() : t.push(a)
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
                Notifier.addKey(e, function(e, i) {
                    if (i.failed) ++t < 50 && setTimeout(Notifier.resetCommConnection.pbind(t), 100);
                    else {
                        (e = ls.get("im_m_comms_key")) && (e.ts = i.ts, ls.set("im_m_comms_key", e));
                        var a = i.events;
                        a && a.map(function(e) {
                            return e.split("<!>")
                        }).forEach(function(e) {
                            if ("update_cnt" === e[1]) {
                                var t = e[5],
                                    i = e[4];
                                handlePageCount("mgid" + t, i)
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
                curNotifier.frozen = !0, curNotifier.unfreezeAfterTooltipHide = !1, each(curNotifier.q_shown, function() {
                    clearTimeout(this.fadeTO), getStyle(this.baloonEl, "opacity") < 1 && animate(this.baloonEl, {
                        opacity: 1
                    }, 100)
                })
            },
            unfreezeEvents: function() {
                curNotifier.tooltipShown ? curNotifier.unfreezeAfterTooltipHide = !0 : (curNotifier.frozen = !1, each(curNotifier.q_shown, function(e, t) {
                    Object(_shared_user_user_env__WEBPACK_IMPORTED_MODULE_7__.a)(FEATURE_SHOW_DONE_BOX_NEW) && t.timeoutConf ? t.fadeTO = setTimeout(t.startFading, hasAccessibilityMode() ? t.timeoutConf.unfreeze_am : t.timeoutConf.unfreeze) : t.fadeTO = setTimeout(t.startFading, hasAccessibilityMode() ? 3e4 : 5e3)
                }))
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
                curNotifier.idle_manager && curNotifier.idle_manager.started || (curNotifier.idle_manager = new _shared_lib_idle_manager__WEBPACK_IMPORTED_MODULE_8__.a({
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
                    i = intval(e[1]);
                for (var a in curNotifier.post_message = Notifier.debug || !(browser.opera && intval(browser.version) < 15 || browser.msie || browser.mozilla && t >= 31 || browser.safari && (t > 7 || 7 == t && i >= 1)), curNotifier.transport = "frame", this.lcInit(), curNotifier.onConnectionId) curNotifier.onConnectionId[a]();
                return curNotifier.onConnectionId = [], !0
            },
            onActivated: function() {
                curNotifier.idle_manager && curNotifier.idle_manager.is_idle ? curNotifier.idle_manager.is_idle = !1 : curNotifier.idle_manager && curNotifier.idle_manager.is_idle || Notifier.setFocus(1), removeEvent(document, "mousemove keydown touchstart", Notifier.onActivated)
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
                curNotifier.is_server = !!e, Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_5__.d)()
            },
            getLpInstance: () => Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_5__.a)(),
            pushEvents: function(e, t) {
                var i = 0;
                each(e, function(e, a) {
                    i |= Notifier.pushEvent(a, t)
                }), i && !ls.get("sound_notify_off") && curNotifier.is_server && (2 & i ? curNotifier.sound_im.play() : curNotifier.sound.play())
            },
            pushEvent: function pushEvent(ev, cnt) {
                if ("nop" !== ev) {
                    if ("string" == typeof ev) try {
                        ev = JSON.parse(ev)
                    } catch (e) {
                        return void Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_6__.f)(e, ev)
                    }
                    Object(_shared_user_user_env__WEBPACK_IMPORTED_MODULE_7__.a)(FEATURE_SHOW_DONE_BOX_NEW) && (ev.timeoutConf = {
                        default: ev.timeout ? ev.timeout : NOTIFICATION_FADE_TIMEOUT,
                        default_am: ev.timeout ? 5 * ev.timeout : NOTIFICATION_FADE_TIMEOUT_ACCESSIBILITY_MODE,
                        unfreeze: ev.timeout ? .7 * ev.timeout : NOTIFICATION_FADE_TIMEOUT_AFTER_UNFREEZE,
                        unfreeze_am: ev.timeout ? 4.4 * ev.timeout : NOTIFICATION_FADE_TIMEOUT_ACCESSIBILITY_MODE_AFTER_UNFREEZE
                    });
                    var push = cnt ? 0 : 1,
                        push_prioritized = !1;
                    if (ev.version !== curNotifier.version && -1 !== ev.version) return debugLog("Notifier old version: " + ev.version + " !== " + curNotifier.version), !1;
                    if ("update_cnt" === ev.type) return ev.add && ev.add.section && handlePageCount(ev.add.section_id, ev.add.count, ev.add.section_link, ev.add.section_add), 0;
                    if (!curNotifier.done_events[ev.id]) {
                        switch (curNotifier.done_events[ev.id] = 1, void 0 !== ev.top_count && -1 !== ev.top_count && handlePageCount("ntf", ev.top_count), ev.type) {
                            case "video_process_ready":
                                if (ev.add.video_raw && window.Video && Video.isVideoPlayerOpen(ev.add.video_raw)) return;
                                if (ev.add && window.Video && Video.isVideoPlayerOpen(ev.add)) return;
                                break;
                            case "mail":
                                ev.add && null !== ev.add.count && void 0 !== ev.add.count && handlePageCount("msg", ev.add.count);
                                break;
                            case "friend_request":
                                ev.add.fr_count ? handlePageCount("fr", ev.add.fr_count) : handlePageCount("fr", ev.add);
                                break;
                            case "friend_request_counter":
                                handlePageCount("fr", ev.add.fr_count), push = 0;
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
                                ev.add && ev.add.section && handlePageCount("bt", ev.add.count, ev.add.section, ev.add.prefix), push = 0;
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
                                parseInt(ev.add.balance) ? updateMoney(parseInt(ev.add.balance)) : parseInt(ev.add) && updateMoney(parseInt(ev.add));
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
                                    var evalText = `(${ev.add})`;
                                    try {
                                        ev.add = eval(evalText), TopNotifier.showTooltip(ev.add.text, ev.add.key)
                                    } catch (e) {
                                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_6__.f)(e, evalText)
                                    }
                                    push = 0
                                }
                                break;
                            case "reload_stickers":
                                window.Emoji && window.Emoji.stickers && (Emoji.stickers = !1), push = 0;
                                break;
                            case "reload_stickers_keywords":
                                window.stickersKeywordsData = null, ls.remove("stickers_keywords"), window.Emoji && Emoji.updateTabs(), push = 0;
                                break;
                            case "any_counter":
                                handlePageCount(ev.add.section_id, ev.add.count, ev.add.link, ev.add.add), push = 0;
                                break;
                            case "done_box":
                                push = 0, push_prioritized = !0
                        }
                        if ("mail" === ev.type && (push = this.sendMailNotification(ev)), ev.add && ev.add.tooltip_text) {
                            var html = '<div class="notify_tt_wrap">' + (ev.author_photo ? `<img class="notify_tt_img" src="${ev.author_photo}" />` : '<div class="notify_tt_thumb"></div>') + '<h4 class="notify_tt_text">' + ev.add.tooltip_text + "</h4></div>";
                            TopNotifier.showTooltip(html, 0), push = 0
                        }
                        return 1 & push && (curNotifier.q_events.push(ev), curNotifier.q_events.length > 30 && curNotifier.q_events.splice(0, curNotifier.q_events.length - 30), this.checkEvents()), push_prioritized && (curNotifier.q_prior_events.push(ev), curNotifier.q_prior_events.length > 5 && curNotifier.q_prior_events.splice(0, curNotifier.q_prior_events.length - 5), this.checkEvents()), push
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
            shouldDisturb: e => !cur.noDisturbMode && (cur.focused != e.author_id && !inArray(e.author_id, cur.mutedPeers) && !inArray(e.author_id, curNotifier.mutedPeers)),
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
                if (e.add.is_call) return 0;
                if ("im" == cur.module ? e.onclick = "IMBRIDGE.activateTab('" + e.author_id + "');" : e.onclick = "FastChat.selectPeer('" + e.author_id + "');", this.isActive() && Notifier.canNotifyUi()) this.playSound(e), this.shouldDisturb(e) && cur.peer != e.author_id && this.showEventUi(e);
                else {
                    if (this.isActive() && this.shouldDisturb(e)) return this.sendSimpleNotification(e);
                    curNotifier.is_server && this.shouldDisturb(e) && this.trySendBrowserNotification(e)
                }
                return 0
            },
            checkEvents: function() {
                var e;
                (!curNotifier.q_events.length || curNotifier.q_shown.length >= (curNotifier.idle_manager.is_idle ? curNotifier.q_idle_max : curNotifier.q_max)) && !curNotifier.q_prior_events.length || !curNotifier.idle_manager.is_idle && curNotifier.frozen || (cur.noDisturbMode || (e = curNotifier.q_prior_events.length ? curNotifier.q_prior_events.shift() : curNotifier.q_events.shift()) && this.showEvent(e))
            },
            showEvent: function showEvent(ev, force) {
                ev.add && ev.add.ttl && Object(_helpers_im_shared_helpers__WEBPACK_IMPORTED_MODULE_4__.a)(ev.add.id), "mail" !== ev.type && Math.random() < .1 && statlogsValueEvent("feed_top_notify_popup", 1, "show", ev.type), curNotifier.q_shown.push(ev);
                var thumbEl = showEventThumb(ev),
                    addPhoto = showEventAddPhoto(ev);
                ev.baloonWrapEl = ce("div", {
                    className: "notifier_baloon_wrap",
                    innerHTML: `\n        <div class="notifier_baloon notifier_type_${ev.type}">\n          <div class="notifier_baloon_head clear_fix">\n            <a class="notifier_close_wrap" role="link" title="${getLang("global_close")}" aria-label="${getLang("global_close")}"></a>\n            <h4 class="notifier_baloon_title">${ev.title||""}</h4>\n          </div>\n          <div class="notifier_baloon_body clear_fix">\n            ${thumbEl}\n            ${addPhoto}\n            <div class="notifier_baloon_msg wrapped">${ev.text||""}</div>\n          </div>\n        </div>`
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
                                    Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_6__.f)(e, ev.onclick)
                                }
                                Notifier.trackEvent("click", {
                                    event_id: ev.id
                                }), ev.preventHideByClick || Notifier.hideEvent(ev);
                                break;
                            case 2:
                                if (!ev.link) return;
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
                }, 200), curNotifier.idle_manager.is_idle && !force || (Object(_shared_user_user_env__WEBPACK_IMPORTED_MODULE_7__.a)(FEATURE_SHOW_DONE_BOX_NEW) && ev.timeoutConf ? ev.fadeTO = setTimeout(ev.startFading, hasAccessibilityMode() ? ev.timeoutConf.default_am : ev.timeoutConf.default) : ev.fadeTO = setTimeout(ev.startFading, hasAccessibilityMode() ? NOTIFICATION_FADE_TIMEOUT_ACCESSIBILITY_MODE : NOTIFICATION_FADE_TIMEOUT)), isFunction(ev.tooltipHandler) && ev.tooltipHandler(ev.baloonWrapEl)
            },
            trackEvent: function(e, t) {
                ajax.post("al_feed.php", extend({
                    act: "a_feedback_track_event",
                    event: e
                }, t || {}))
            },
            canNotifyUi: function() {
                if (window.pushNotifier && window.pushNotifier.loadEndpoint()) return !1;
                var e = !ls.get("im_ui_notify_off") && DesktopNotifications.supported() && DesktopNotifications.checkPermission() <= 0;
                return !ls.get("im_notify_flag") && e && ls.set("im_notify_flag", 1), e && !cur.noDisturbMode
            },
            showEventUi: function showEventUi(ev) {
                if (!this.canNotifyUi()) return !1;
                var title, text;
                if (ev.add && ev.add.ttl && Object(_helpers_im_shared_helpers__WEBPACK_IMPORTED_MODULE_4__.a)(ev.add.id), "mail" === ev.type) {
                    var div = ce("div");
                    div.innerHTML = ev.text, title = div.firstChild.textContent.trim(), text = stripHTML(replaceEntities(ev.text.replace(/<br\/?>/g, "\n")).replace(/<span class='notifier_author_quote'.*<\/span>(.*?)/, "$1").replace(/<img.*?alt="(.*?)".*?>/gi, "$1")).replace(/&laquo;|&raquo;/gi, '"').trim()
                } else title = ev.title, text = ev.text;
                var notification = ev.uiNotification = DesktopNotifications.createNotification(ev.author_photo, title, text);
                return curNotifier.uiNotifications.push([notification, vkNow()]), notification.onclick = function(e) {
                    if (window.focus(), ev.onclick || ("im" === cur.module ? ev.onclick = "IMBRIDGE.activateTab(" + ev.author_id + ");" : ev.onclick = "FastChat.selectPeer('" + ev.author_id + "');"), "IM" === ev.onclick.substr(0, 2) && "im" !== cur.module) FastChat.selectPeer(intval(ev.author_id));
                    else try {
                        eval(ev.onclick)
                    } catch (e) {
                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_6__.f)(e, ev.onclick)
                    }
                    Notifier.hideEvent(ev)
                }, notification.onclose = function() {
                    Notifier.hideEvent(ev, !0)
                }, notification.show(), ev.closeTO = setTimeout(Notifier.hideEvent.bind(Notifier).pbind(ev), 5e3), !0
            },
            hideEvent: function(e, t, i, a) {
                clearTimeout(e.closeTO), clearTimeout(e.fadeTO), e.fading && e.fading.stop();
                var o, r = indexOf(curNotifier.q_shown, e); - 1 != r && curNotifier.q_shown.splice(r, 1), Notifier.unfreezeEvents(), t || (e.baloonWrapEl ? (cleanElems(e.closeEl, e.baloonEl), re(e.baloonWrapEl)) : e.uiNotification && e.uiNotification.cancel()), !0 === a && isArray(curNotifier.q_closed) && (curNotifier.q_closed.unshift(vkNow()), (o = curNotifier.q_closed.length) > 3 && (curNotifier.q_closed.splice(3, o - 3), o = 3), 3 == o && curNotifier.q_closed[0] - curNotifier.q_closed[2] < 700 && Notifier.hideAllEvents()), -1 != a && this.checkEvents(), "frame" != curNotifier.transport || i || this.lcSend("hide", {
                    event_id: e.id
                }), !0 !== a && curNotifier.idle_manager.is_idle || curNotifier.q_events.length || curNotifier.q_shown.length || ajax.post("notifier.php", {
                    act: "a_clear_notifier"
                }), isFunction(e.onHide) && Object(_shared_user_user_env__WEBPACK_IMPORTED_MODULE_7__.a)(FEATURE_SHOW_DONE_BOX_NEW) && e.onHide()
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
                var i = extend({
                    __client: curNotifier.instance_id,
                    __act: e,
                    __rnd: Math.random()
                }, t || {});
                if (curNotifier.post_message) try {
                    curNotifier.storage_frame.postMessage(curNotifier.connection_id + ":" + JSON.stringify(i), curNotifier.storage_frame_origin)
                } catch (e) {
                    debugLog(e, e.message, e.stack)
                } else ls.set(curNotifier.connection_id, i)
            },
            lcRecv: function(e) {
                if (e && !isEmpty(e) && e.__client != curNotifier.instance_id) {
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
                            var i = e.queue || e.key,
                                a = curNotifier.addQueues[i],
                                o = !a && curNotifier.is_server;
                            a ? a[0] = vkNow() : curNotifier.addQueues[i] = [vkNow(), e.ts, e.key], o && Notifier.lpReset(Notifier.lpCheck.bind(Notifier));
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
                            var r = ls.get("pad_playlist");
                            r && r.instance == curNotifier.instance_id && ls.set("pad_pltime", vkNow());
                            break;
                        case "who_is_active":
                            Notifier.isActive() && (intval(e.msg) > 2e9 && "im" === cur.module || intval(e.msg) < 2e9) && this.lcSend("negotiate_back", e);
                            break;
                        case "show_notification":
                            Notifier.shouldShowNotification(e) && Notifier.showEvent(e, !0);
                            break;
                        case "send_im_notification":
                            if ("im" === cur.module) {
                                var s = Notifier.createNegotiationSlot({
                                    onSuccess: function(e) {
                                        e.ev.onclick = "IMBRIDGE.activateTab(" + e.ev.author_id + ");", Notifier.showBrowserNotification(e.ev)
                                    }
                                });
                                Notifier.lcSend("negotiate_back", {
                                    msg: s.token,
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
                            Object(_longpoll_singleton__WEBPACK_IMPORTED_MODULE_5__.b)(e);
                            break;
                        default:
                            if (curNotifier.recvClbks && curNotifier.recvClbks[t])
                                for (var n in curNotifier.recvClbks[t]) curNotifier.recvClbks[t][n](e);
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
                    i = curNotifier.negotiations[t];
                i && (clearTimeout(i.timer), curNotifier.negotiations[t].success && curNotifier.negotiations[t].success(e), curNotifier.negotiations[t] = void 0)
            },
            lcOnStorage: function(e) {
                e = e || window.event, Notifier.debug && debugLog("onstorage", e.key, e.newValue, e);
                var t = e.key,
                    i = e.newValue;
                if (i) {
                    if (t) {
                        if (e.key != curNotifier.connection_id) return
                    } else {
                        if (t = curNotifier.connection_id, (i = localStorage.getItem(t)) == curNotifier.lc_prev_value) return;
                        curNotifier.lc_prev_value = i
                    }
                    this.lcRecv(JSON.parse(i) || {})
                }
            },
            lcOnMessage: function(e) {
                if (e = e || window.event, Notifier.debug && debugLog("onmessage", e.data, e.origin, e), !(e.origin && e.origin != curNotifier.storage_frame_origin || "string" != typeof e.data || e.data.indexOf("q_st"))) {
                    var t, i = e.data.substr(4);
                    if ("ready" == i) curNotifier.storage_frame = e.source, this.lcStart();
                    else {
                        if (-1 == (t = i.indexOf(":")) || i.substr(0, t) != curNotifier.connection_id || !i.substr(t + 1)) return;
                        this.lcRecv(JSON.parse(i.substr(t + 1)))
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
                var t, i = "server_" + curNotifier.connection_id,
                    a = vkNow();
                return !(!e && isArray(t = ls.get(i)) && t[0] != curNotifier.instance_id && a - t[1] < 8e3) && (ls.set(i, [curNotifier.instance_id, a]), !0)
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
                                    query: params && Object(_shared_lib_convert__WEBPACK_IMPORTED_MODULE_9__.toQueryString)(params)
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
                            each(curNotifier.addQueues, function(i, a) {
                                e += a[2], t += "_" + a[1]
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
            addKey: function(e, t, i) {
                if (curNotifier.flash_transport || !e) return !1;
                var a = e.queue || e.key,
                    o = curNotifier.addQueues[a],
                    r = !o && curNotifier.is_server;
                return o ? (o[0] = vkNow(), o[3] = t, o[4] = i) : curNotifier.addQueues[a] = [vkNow(), e.ts, e.key, t, i], i || Notifier.lcSend("new_addkey", e), r && Notifier.lpReset(Notifier.lpCheck.bind(Notifier)), !0
            },
            addFeed: function(e, t) {
                var i = curNotifier.addQueues[e];
                isArray(i) && i.length && (i[1] = t.ts, isFunction(i[3]) && i[3](e, t))
            },
            addRecvClbk: function(e, t, i, a) {
                curNotifier.recvClbks || (curNotifier.recvClbks = {}), curNotifier.recvClbks[e] || (curNotifier.recvClbks[e] = {}), curNotifier.recvClbks[e][t] && !a || (curNotifier.recvClbks[e][t] = i)
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