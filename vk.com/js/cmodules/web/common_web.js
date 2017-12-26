! function(e) {
    function t(n) {
        if (o[n]) return o[n].exports;
        var i = o[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return e[n].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
    }
    var o = {};
    return t.m = e, t.c = o, t.p = "", t(0)
}([function(e, t, o) {
    e.exports = o(8)
}, function(e, t, o) {
    var n, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    ! function(t) {
        function a() {}

        function r(e, t) {
            for (var o = e.length; o--;)
                if (e[o].listener === t) return o;
            return -1
        }

        function s(e) {
            return function() {
                return this[e].apply(this, arguments)
            }
        }

        function l(e) {
            return "function" == typeof e || e instanceof RegExp ? !0 : e && "object" === ("undefined" == typeof e ? "undefined" : i(e)) ? l(e.listener) : !1
        }
        var d = a.prototype,
            c = t.EventEmitter;
        d.getListeners = function(e) {
            var t, o, n = this._getEvents();
            if (e instanceof RegExp) {
                t = {};
                for (o in n) n.hasOwnProperty(o) && e.test(o) && (t[o] = n[o])
            } else t = n[e] || (n[e] = []);
            return t
        }, d.flattenListeners = function(e) {
            var t, o = [];
            for (t = 0; t < e.length; t += 1) o.push(e[t].listener);
            return o
        }, d.getListenersAsObject = function(e) {
            var t, o = this.getListeners(e);
            return o instanceof Array && (t = {}, t[e] = o), t || o
        }, d.addListener = function(e, t) {
            if (!l(t)) throw new TypeError("listener must be a function");
            var o, n = this.getListenersAsObject(e),
                a = "object" === ("undefined" == typeof t ? "undefined" : i(t));
            for (o in n) n.hasOwnProperty(o) && -1 === r(n[o], t) && n[o].push(a ? t : {
                listener: t,
                once: !1
            });
            return this
        }, d.on = s("addListener"), d.addOnceListener = function(e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, d.once = s("addOnceListener"), d.defineEvent = function(e) {
            return this.getListeners(e), this
        }, d.defineEvents = function(e) {
            for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
            return this
        }, d.removeListener = function(e, t) {
            var o, n, i = this.getListenersAsObject(e);
            for (n in i) i.hasOwnProperty(n) && (o = r(i[n], t), -1 !== o && i[n].splice(o, 1));
            return this
        }, d.off = s("removeListener"), d.addListeners = function(e, t) {
            return this.manipulateListeners(!1, e, t)
        }, d.removeListeners = function(e, t) {
            return this.manipulateListeners(!0, e, t)
        }, d.manipulateListeners = function(e, t, o) {
            var n, a, r = e ? this.removeListener : this.addListener,
                s = e ? this.removeListeners : this.addListeners;
            if ("object" !== ("undefined" == typeof t ? "undefined" : i(t)) || t instanceof RegExp)
                for (n = o.length; n--;) r.call(this, t, o[n]);
            else
                for (n in t) t.hasOwnProperty(n) && (a = t[n]) && ("function" == typeof a ? r.call(this, n, a) : s.call(this, n, a));
            return this
        }, d.removeEvent = function(e) {
            var t, o = "undefined" == typeof e ? "undefined" : i(e),
                n = this._getEvents();
            if ("string" === o) delete n[e];
            else if (e instanceof RegExp)
                for (t in n) n.hasOwnProperty(t) && e.test(t) && delete n[t];
            else delete this._events;
            return this
        }, d.removeAllListeners = s("removeEvent"), d.emitEvent = function(e, t) {
            var o, n, i, a, r, s = this.getListenersAsObject(e);
            for (a in s)
                if (s.hasOwnProperty(a))
                    for (o = s[a].slice(0), i = 0; i < o.length; i++) n = o[i], n.once === !0 && this.removeListener(e, n.listener), r = n.listener.apply(this, t || []), r === this._getOnceReturnValue() && this.removeListener(e, n.listener);
            return this
        }, d.trigger = s("emitEvent"), d.emit = function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, d.setOnceReturnValue = function(e) {
            return this._onceReturnValue = e, this
        }, d._getOnceReturnValue = function() {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
        }, d._getEvents = function() {
            return this._events || (this._events = {})
        }, a.noConflict = function() {
            return t.EventEmitter = c, a
        }, n = function() {
            return a
        }.call(t, o, t, e), !(void 0 !== n && (e.exports = n))
    }({}), window.EventEmitter = e.exports
}, function(e, t) {
    function o(e, t, o, n, i, a) {
        if (e = ge(e), e && 3 != e.nodeType && 8 != e.nodeType) {
            var r = i ? function() {
                var e = function(e) {
                    var t = e.data;
                    e.data = i;
                    var n = o.apply(this, [e]);
                    return e.data = t, n
                };
                return e.handler = o, e
            }() : o;
            e.setInterval && e != window && (e = window);
            var l = data(e, "events") || data(e, "events", {}),
                d = data(e, "handle") || data(e, "handle", function(e) {
                    return function() {
                        s.apply(e, arguments)
                    }
                }(e));
            each(t.split(/\s+/), function(t, o) {
                l[o] || (l[o] = [], !n && e.addEventListener ? e.addEventListener(o, d, a) : !n && e.attachEvent && e.attachEvent("on" + o, d)), l[o].push(r)
            })
        }
    }

    function n(e, t, o, i) {
        if ("undefined" == typeof i && (i = !1), e = ge(e)) {
            var a = data(e, "events");
            if (a)
                if ("string" == typeof t) each(t.split(/\s+/), function(t, n) {
                    if (isArray(a[n])) {
                        var r = a[n].length;
                        if (isFunction(o)) {
                            for (var s = r - 1; s >= 0; s--)
                                if (a[n][s] && (a[n][s] === o || a[n][s].handler === o)) {
                                    a[n].splice(s, 1), r--;
                                    break
                                }
                        } else {
                            for (var s = 0; r > s; s++) delete a[n][s];
                            r = 0
                        }
                        r || (e.removeEventListener ? e.removeEventListener(n, data(e, "handle"), i) : e.detachEvent && e.detachEvent("on" + n, data(e, "handle")), delete a[n])
                    }
                }), isEmpty(a) && (removeData(e, "events"), removeData(e, "handle"));
                else
                    for (var r in a) n(e, r)
        }
    }

    function i(e, t, o, n) {
        e = ge(e);
        var i = data(e, "handle");
        if (i) {
            var a = function() {
                i.call(e, extend(o || {}, {
                    type: t,
                    target: e
                }))
            };
            n ? a() : setTimeout(a, 0)
        }
    }

    function a(e) {
        if (e = e || window.event, !e) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
    }

    function r(e) {
        if (e = e || window.event, !e) return !1;
        for (; e.originalEvent;) e = e.originalEvent;
        return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
    }

    function s(e) {
        e = l(e);
        var t = Array.prototype.slice.call(arguments);
        t[0] = e;
        var o = data(this, "events");
        if (o && "string" == typeof e.type && o[e.type] && o[e.type].length) {
            var n = (o[e.type] || []).slice();
            for (var i in n) {
                if ("mouseover" == e.type || "mouseout" == e.type) {
                    for (var r = e.relatedElement; r && r != this;) r = r.parentNode;
                    if (r == this) continue
                }
                var s = n[i].apply(this, t);
                if ((s === !1 || -1 === s) && a(e), -1 === s) return !1
            }
        }
    }

    function l(e) {
        e = e || window.event;
        var t = e;
        if (e = clone(t), e.originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement == e.target), null == e.pageX && null != e.clientX) {
            var o = document.documentElement,
                n = bodyNode;
            e.pageX = e.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o.clientLeft || 0), e.pageY = e.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o.clientTop || 0)
        }
        return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
    }

    function d(e) {
        return (e = e || window.event) && ("click" == e.type || "mousedown" == e.type || "mouseup" == e.type) && (e.which > 1 || e.button > 1 || e.ctrlKey || e.shiftKey || browser.mac && e.metaKey) || !1
    }

    function c(e) {
        if (e = l(e), !e || !e.target) return !1;
        if (!e.screenX) return !0;
        var t = getSize(e.target),
            o = getXY(e.target),
            n = e.pageX - o[0],
            i = e.pageY - o[1];
        return -1 > n || n > t[0] + 1 || -1 > i || i > t[1] + 1 ? !0 : Math.abs(e.pageX - o[0] - t[0] / 2) < 1 && Math.abs(e.pageY - o[1] - t[1] / 2) < 1
    }

    function u(e, t) {
        if (!e) return !0;
        e = e.originalEvent || e, t = t || e.target;
        var o = e.fromElement || e.relatedTarget;
        if (!o || o == t || o == t.parentNode) return !0;
        for (; o != t && o.parentNode && o.parentNode != bodyNode;) o = o.parentNode;
        return o != t
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.addEvent = o, t.removeEvent = n, t.triggerEvent = i, t.cancelEvent = a, t.stopEvent = r, t._eventHandle = s, t.normEvent = l, t.checkEvent = d, t.checkKeyboardEvent = c, t.checkOver = u, window.KEY = {
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
    }, window.addEvent = o, window.removeEvent = n, window.triggerEvent = i, window.cancelEvent = a, window.stopEvent = r, window._eventHandle = s, window.normEvent = l, window.checkEvent = d, window.checkKeyboardEvent = c, window.checkOver = u
}, function(e, t) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = t.browser = {
            version: (_ua.match(/.+(?:me|ox|on|rv|it|era|opr|ie|edge)[\/: ]([\d.]+)/) || [0, "0"])[1],
            opera: /opera/i.test(_ua) || /opr/i.test(_ua),
            vivaldi: /vivaldi/i.test(_ua),
            amigo: /amigo.*mrchrome soc/i.test(_ua),
            msie: /msie/i.test(_ua) && !/opera/i.test(_ua) || /trident\//i.test(_ua) || /edge/i.test(_ua),
            msie6: /msie 6/i.test(_ua) && !/opera/i.test(_ua),
            msie7: /msie 7/i.test(_ua) && !/opera/i.test(_ua),
            msie8: /msie 8/i.test(_ua) && !/opera/i.test(_ua),
            msie9: /msie 9/i.test(_ua) && !/opera/i.test(_ua),
            msie_edge: /edge/i.test(_ua) && !/opera/i.test(_ua),
            mozilla: /firefox/i.test(_ua),
            chrome: /chrome/i.test(_ua) && !/edge/i.test(_ua),
            safari: !/chrome/i.test(_ua) && /webkit|safari|khtml/i.test(_ua),
            iphone: /iphone/i.test(_ua),
            ipod: /ipod/i.test(_ua),
            iphone4: /iphone.*OS 4/i.test(_ua),
            ipod4: /ipod.*OS 4/i.test(_ua),
            ipad: /ipad/i.test(_ua),
            android: /android/i.test(_ua),
            bada: /bada/i.test(_ua),
            mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(_ua),
            msie_mobile: /iemobile/i.test(_ua),
            safari_mobile: /iphone|ipod|ipad/i.test(_ua),
            opera_mobile: /opera mini|opera mobi/i.test(_ua),
            opera_mini: /opera mini/i.test(_ua),
            mac: /mac/i.test(_ua),
            search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(_ua),
            smart_tv: /smart-tv|smarttv/i.test(_ua)
        },
        n = t.mobPlatforms = {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            8: 1
        },
        i = t.browserFeatures = {
            wheelEvent: "onwheel" in ce("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : o.mozilla ? "MozMousePixelScroll" : "DOMMouseScroll",
            hasBoundingClientRect: "getBoundingClientRect" in ce("div"),
            cmaEnabled: navigator.credentials && navigator.credentials.preventSilentAccess && vk.cma
        };
    window.browser = o, window.mobPlatforms = n, window.browserFeatures = i
}, function(e, t) {
    function o(e, t, o) {
        if (e = ge(e)) {
            o || elfocus(e), void 0 === data(e, "backstyle") && data(e, "backstyle", e.style.backgroundColor || "");
            var n = data(e, "back") || data(e, "back", getStyle(e, "backgroundColor")),
                i = {
                    notice: "#FFFFE0",
                    warning: "#FAEAEA"
                };
            setStyle(e, "backgroundColor", i[t] || t || i.warning), setTimeout(animate.pbind(e, {
                backgroundColor: n
            }, 300, function() {
                e.style.backgroundColor = data(e, "backstyle")
            }), 400)
        }
    }

    function n(e) {
        if (window.scrollNode && !browser.mobile && window._tbLink) {
            var t = ge("page_body"),
                o = getXY(t),
                n = scrollGetY(),
                i = bodyNode.scrollLeft,
                a = ge("side_bar"),
                r = isVisible(a);
            if (window._stlSideTop = Math.max((r ? getSize(a)[1] : 0) - n - (browser.mozilla ? getXY(pageNode)[1] : 0), o[1]), e || i != __scrLeft) {
                var s = ge("page_layout"),
                    l = vk.rtl ? s.offsetLeft + s.offsetWidth : 0,
                    d = vk.rtl ? (window.lastWindowWidth || 0) - l : s.offsetLeft;
                setStyle(_stlLeft, {
                    width: Math.max(d - 1, 0)
                });
                var c = vk.rtl ? o[0] + t.offsetWidth + 5 : d,
                    u = vk.rtl ? l - c : o[0] - 5 - c;
                setStyle(_stlSide, {
                    left: c - i,
                    width: Math.max(u, 0)
                }), __scrLeft = i
            }
            setStyle(_stlSide, {
                top: _stlSideTop,
                height: Math.max((window.lastWindowHeight || 0) - _stlSideTop, 0)
            }), __adsUpdate();
            var h = 200,
                p = _tbLink.loc || _stlWas || n > h,
                f = 0,
                w = !1,
                _ = n > 250 && cur._regBar;
            if (p) {
                1 !== _stlShown && (show(_stlLeft, _stlSide), addClass(_stlLeft, "stl_active"), addClass(_stlSide, "stl_active"), _stlShown = 1), _tbLink.loc && cur._noUpLink && (n = 0), _stlWas && n > 500 && (_stlWas = 0), n > h ? (f = (n - h) / h, (_stlWasSet || _stlBack) && (_stlWasSet = _stlBack = 0, w = 1, val(_stlText, getLang("global_to_top")), removeClass(_stlText, "down"), removeClass(_stlText, "back"))) : (f = (h - n) / h, _stlWas ? _stlWasSet || (_stlWasSet = 1, w = 0, val(_stlText, ""), addClass(_stlText, "down"), _stlBack && (_stlBack = 0, removeClass(_stlText, "back"))) : _tbLink.loc && (_stlBack || (_stlBack = 1, w = _tbLink.fast ? 1 : 0, val(_stlText, getLang("global_back")), addClass(_stlText, "back"), _stlWasSet && (_stlWasSet = 0, removeClass(_stlText, "down"))))), w !== !1 && toggleClass(_stlLeft, "over_fast", hasClass(_stlLeft, "over") && w);
                var v = {
                    opacity: Math.min(Math.max(f, 0), 1)
                };
                vk.staticheader && (v.top = -Math.min(getSize("page_header_cont")[1], n)), setStyle(_stlLeft, v)
            } else 0 !== _stlShown && (hide(_stlLeft, _stlSide), _stlShown = 0);
            vk.id || (!_regBar && _ ? (_regBar = 1, val(ge("reg_bar_content"), cur._regBar), animate(ge("reg_bar"), {
                top: 0,
                transition: Fx.Transitions.sineInOut
            }, 400), animate(ge("stl_bg"), {
                paddingTop: 60,
                transition: Fx.Transitions.sineInOut
            }, 400)) : _regBar && !_ && (_regBar = 0, animate(ge("reg_bar"), {
                top: -56,
                transition: Fx.Transitions.sineInOut
            }, 400), animate(ge("stl_bg"), {
                paddingTop: 13,
                transition: Fx.Transitions.sineInOut
            }, 400)))
        }
    }

    function i(e, t) {
        if (e = ge(e), e && !e.btnevents) {
            if (hasClass(e, "flat_button")) return void(isFunction(t) && (e.onclick = t.pbind(e)));
            var o = e.parentNode;
            if (hasClass(o, "button_blue") || hasClass(o, "button_gray")) return void(isFunction(t) && (e.onclick = t.pbind(e)));
            var n = !1;
            addEvent(e, "click mousedown mouseover mouseout", function(i) {
                if (!hasClass(o, "locked")) switch (i.type) {
                    case "click":
                        if (!n) return;
                        return e.className = "button_hover", t(e), cancelEvent(i);
                    case "mousedown":
                        e.className = "button_down";
                        break;
                    case "mouseover":
                        n = !0, e.className = "button_hover";
                        break;
                    case "mouseout":
                        e.className = "button", n = !1
                }
            }), e.btnevents = !0
        }
    }

    function a(e) {
        return (e = ge(e)) ? hasClass(e, "ui_actions_menu_item_lock") : void 0
    }

    function r(e) {
        if ((e = ge(e)) && hasClass(e, "ui_actions_menu_item") && !hasClass(e, "ui_actions_menu_item_lock")) {
            data(e, "inner", e.innerHTML), addClass(e, "ui_actions_menu_item_lock");
            var t = ce("div", {
                className: "ui_actions_menu_item_lock_text"
            });
            val(t, e.innerHTML), e.appendChild(t), showProgress(e)
        }
    }

    function s(e) {
        (e = ge(e)) && hasClass(e, "ui_actions_menu_item") && hasClass(e, "ui_actions_menu_item_lock") && (removeClass(e, "ui_actions_menu_item_lock"), e.innerHTML = data(e, "inner"))
    }

    function l(e) {
        return (e = ge(e)) ? hasClass(e, "link_lock") : void 0
    }

    function d(e) {
        (e = ge(e)) && "a" == e.tagName.toLowerCase() && !l(e) && addClass(e, "link_lock")
    }

    function c(e) {
        (e = ge(e)) && l(e) && removeClass(e, "link_lock")
    }

    function u(e) {
        if ((e = ge(e)) && ("button" == e.tagName.toLowerCase() || hasClass(e, "flat_button") || hasClass(e, "wr_header")) && !f(e)) {
            var t = getSize(e);
            addClass(e, "flat_btn_lock"), data(e, "inner", e.innerHTML), setStyle(e, {
                width: t[0],
                height: t[1]
            }), e.innerHTML = "", showProgress(e, "btn_lock")
        }
    }

    function h(e) {
        (e = ge(e)) && f(e) && (hideProgress(e), e.innerHTML = data(e, "inner"), removeClass(e, "flat_btn_lock"), setStyle(e, {
            width: null,
            height: null
        }))
    }

    function p(e) {
        return f(e)
    }

    function f(e) {
        return (e = ge(e)) ? hasClass(e, "flat_btn_lock") : void 0
    }

    function w(e, t) {
        if ((e = ge(e)) && "button" === e.tagName.toLowerCase())
            if (t) {
                if (!isVisible(e)) return;
                e.parentNode.insertBefore(ce("button", {
                    innerHTML: e.innerHTML,
                    className: e.className + " button_disabled"
                }), e), hide(e)
            } else {
                var o = domPS(e);
                o && hasClass(o, "button_disabled") && re(o), show(e)
            }
    }

    function _(e) {
        if (void 0 === window._sbWidth || e) {
            var t = ce("div", {
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

    function v(e) {
        return e = ge(e), hasClass(e, "on") ? 1 : ""
    }

    function g(e, t) {
        return e = ge(e), e && !hasClass(e, "disabled") ? (void 0 === t && (t = !v(e)), toggleClass(e, "on", t), e.setAttribute("aria-checked", t ? "true" : "false"), !1) : void 0
    }

    function m(e, t) {
        return e = ge(e), void 0 === t && (t = !hasClass(e, "disabled")), toggleClass(e, "disabled", t), "INPUT" == e.tagName && (t ? e.setAttribute("readonly", "readonly") : e.removeAttribute("readonly")), !1
    }

    function b(e) {
        return radioBtns[e] ? radioBtns[e].val : !1
    }

    function y(e, t, o) {
        return radioBtns[o] && !hasClass(e, "disabled") ? (each(radioBtns[o].els, function() {
            this == e ? (addClass(this, "on"), this.setAttribute("aria-checked", "true"), this.setAttribute("tabindex", "0")) : (removeClass(this, "on"), this.setAttribute && (this.setAttribute("aria-checked", "false"), this.setAttribute("tabindex", "-1")))
        }), radioBtns[o].val = t) : void 0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.notaBene = o, t.updSideTopLink = n, t.createButton = i, t.actionsMenuItemLocked = a, t.lockActionsMenuItem = r, t.unlockActionsMenuItem = s, t.linkLocked = l, t.lockLink = d, t.unlockLink = c, t.lockButton = u, t.unlockButton = h, t.buttonLocked = p, t.isButtonLocked = f, t.disableButton = w, t.sbWidth = _, t.isChecked = v, t.checkbox = g, t.disable = m, t.radioval = b, t.radiobtn = y, window.__scrLeft = 0, window.radioBtns = {}, window.notaBene = o, window.updSideTopLink = n, window.createButton = i, window.actionsMenuItemLocked = a, window.lockActionsMenuItem = r, window.unlockActionsMenuItem = s, window.linkLocked = l, window.lockLink = d, window.unlockLink = c, window.lockButton = u, window.unlockButton = h, window.buttonLocked = p, window.isButtonLocked = f, window.disableButton = w, window.sbWidth = _, window.isChecked = v, window.checkbox = g, window.disable = m, window.radioval = b, window.radiobtn = y
}, function(e, t) {
    function o(e, t) {
        if (this.constructor != o) throw new Error("ElementTooltip was called without 'new' operator");
        if (e = ge(e), !e || !e.nodeType) throw new Error("First argument not a DOM element");
        if (data(e, "ett")) return data(e, "ett");
        if (this._opts = extend({
                delay: 100,
                offset: [0, 0],
                shift: 0,
                type: o.TYPE_VERTICAL,
                id: "",
                cls: "",
                width: null,
                appendToParent: !1,
                autoShow: !0,
                autoHide: !1,
                noHideOnClick: !1,
                arrowSize: "normal",
                customShow: !1
            }, t), this._opts.customShow && (this._opts.autoShow = !1), this._opts.defaultSide || (this._opts.defaultSide = this._opts.type == o.TYPE_VERTICAL ? "top" : "left"), this._opts.cls += " eltt_arrow_size_" + this._opts.arrowSize, this._opts.noBorder && (this._opts.cls += " eltt_noborder"), this._opts.type != o.TYPE_VERTICAL && delete this._opts.shift, this._opts.setPos && !this._opts.forceSide) throw new Error("forceSide parameter should be set if you use setPos");
        this._opts.forceSide && (this._opts.type = inArray(this._opts.forceSide, ["top", "bottom"]) ? o.TYPE_VERTICAL : o.TYPE_HORIZONTAL), this._appendToEl = this._opts.appendTo ? this._opts.appendTo : this._opts.appendToParent ? domClosestPositioned(e, {
            noOverflow: !0
        }) : e, this._arrowSize = {
            normal: o.ARROW_SIZE_NORMAL,
            big: o.ARROW_SIZE_BIG
        }[this._opts.arrowSize], this._opts.forceSide && (this._opts.type = o.getType(this._opts.forceSide)), this._el = e, data(this._el, "ett", this), this._initEvents(e), this._clearTimeouts(), this._isShown = !1
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ElementTooltip = o, o.TYPE_VERTICAL = 0, o.TYPE_HORIZONTAL = 1, o.FADE_SPEED = 100, o.ARROW_SIZE = 6, o.ARROW_SIZE_NORMAL = 7, o.ARROW_SIZE_BIG = 16, o.prototype._initEvents = function(e) {
        this._opts.autoShow && addEvent(e, "mouseenter", this._el_me_event = this._onMouseEnter.bind(this)), (this._opts.autoShow || this._opts.autoHide) && addEvent(e, "mouseleave", this._el_ml_event = this._onMouseLeave.bind(this)), this._opts.autoShow || this._opts.customShow || addEvent(e, "click", this._el_c_event = function() {
            this._isShown && this._opts.noHideOnClick || this.toggle(!this._isShown)
        }.bind(this))
    }, o.prototype._onMouseEnter = function(e) {
        clearTimeout(this._hto), this._hto = !1, !this._isShown && this._opts.autoShow && (clearTimeout(this._reTimeout), this._reTimeout = !1, clearTimeout(this._sto), this._sto = setTimeout(this.show.bind(this), this._opts.delay))
    }, o.prototype._onMouseLeave = function(e) {
        this._clearTimeouts(), this._hto = setTimeout(this._hide.bind(this), 200)
    }, o.prototype._onMouseWindowClick = function(e) {
        for (var t = e.target; t && t != this._ttel && t != document.body && t != this._el;) t = domPN(t);
        return hasClass(e.target, "_ap_layer__close") ? void 0 : t && t != document.body ? void 0 : (this.hide(!0), cancelEvent(e))
    }, o.prototype.destroy = function() {
        this._el_me_event && removeEvent(this._el, "mouseenter", this._el_me_event), this._el_ml_event && removeEvent(this._el, "mouseleave", this._el_ml_event), this._el_c_event && removeEvent(this._el, "click", this._el_c_event), this._clearTimeouts(), removeData(this._el, "ett"), re(this._ttel), this._ev_wclick && removeEvent(document, "mousedown", this._ev_wclick);
        var e;
        this._ttel && (e = geByClass1("_eltt_content", this._ttel)), this._opts.onDestroy && this._opts.onDestroy(e)
    }, o.prototype.hide = function(e) {
        this._hide(e)
    }, o.prototype._onTooltipMouseEnter = function(e) {
        this._clearTimeouts()
    }, o.prototype._onTooltipMouseLeave = function(e) {
        this._onMouseLeave()
    }, o.prototype.build = function() {
        if (!this._ttel) {
            this._ttel = se('<div class="eltt ' + (this._opts.cls || "") + '" id="' + this._opts.id + '"><div class="eltt_arrow_back _eltt_arrow_back"><div class="eltt_arrow"></div></div><div class="eltt_content _eltt_content"></div></div>'), this._ttArrowEl = geByClass1("_eltt_arrow_back", this._ttel);
            var e = geByClass1("_eltt_content", this._ttel);
            this._opts.content && (isString(this._opts.content) ? e.innerHTML = this._opts.content : e.appendChild(this._opts.content)), this._appendToEl.appendChild(this._ttel)
        }
    }, o.prototype.show = function() {
        if (this._isShown) return void this.updatePosition();
        if (this._clearTimeouts(), this._ttel || (this.build(), (this._opts.autoShow || this._opts.autoHide) && (addEvent(this._ttel, "mouseenter", this._ev_ttenter = this._onTooltipMouseEnter.bind(this)), addEvent(this._ttel, "mouseleave", this._ev_ttleave = this._onTooltipMouseLeave.bind(this)))), this._opts.width) {
            var e = isFunction(this._opts.width) ? this._opts.width.call(this) : this._opts.width;
            setStyle(this._ttel, "width", e)
        }
        show(this._ttel);
        var t = geByClass1("_eltt_content", this._ttel);
        this._opts.onFirstTimeShow && !this._firstTimeShown && this._opts.onFirstTimeShow.call(this, t, this._ttel), this._opts.onShow && this._opts.onShow(t, !this._firstTimeShown), this._firstTimeShown = !0, this.updatePosition(), this._isShown = !0, this.updatePosition(), this._visTO = setTimeout(addClass.pbind(this._ttel, "eltt_vis"), 10), this._opts.elClassWhenShown && addClass(this._el, this._opts.elClassWhenShown), this._ev_wclick && removeEvent(document, "mousedown", this._ev_wclick), addEvent(document, "mousedown", this._ev_wclick = this._onMouseWindowClick.bind(this))
    }, o.getType = function(e) {
        switch (e) {
            case "top":
            case "bottom":
                return o.TYPE_VERTICAL;
            case "right":
            case "left":
                return o.TYPE_HORIZONTAL
        }
    }, o.prototype.getOptions = function() {
        return this._opts
    }, o.prototype.updatePosition = function() {
        function e(e, t) {
            var o = {},
                n = ["marginLeft", "marginTop"].indexOf(e);
            o[e] = Math.floor(s[n] / 2) - d - l - (t || 0), setStyle(u._ttArrowEl, o)
        }
        var t, n = this._opts.forceSide;
        if (this._opts.getTargetBoundingBox) t = this._opts.getTargetBoundingBox(this);
        else {
            var i = getXY(this._el),
                a = getSize(this._el);
            t = {
                left: i[0],
                top: i[1],
                width: a[0],
                height: a[1]
            }
        }
        var r, s = getSize(this._ttel),
            l = this._arrowSize,
            d = this._opts.noBorder ? 0 : 1,
            c = isFunction(this._opts.offset) ? this._opts.offset() : this._opts.offset,
            u = this;
        if (this._opts.setPos) r = this._opts.setPos(this) || {}, o.getType(n) == o.TYPE_VERTICAL ? void 0 !== r.arrowPosition ? setStyle(this._ttArrowEl, {
            marginLeft: r.arrowPosition
        }) : e("marginLeft") : void 0 !== r.arrowPosition ? setStyle(this._ttArrowEl, {
            marginTop: r.arrowPosition
        }) : e("marginTop");
        else {
            if (!n && this._prevSide && this._opts.preventSideChange) n = this._prevSide;
            else if (!n) {
                var h = gpeByClass("audio_layer_container", this._ttel),
                    p = h ? h : domClosestOverflowHidden(this._ttel),
                    f = p != bodyNode ? getXY(p) : [scrollGetX(), scrollGetY() + getPageHeaderHeight()],
                    w = p != bodyNode ? getSize(p) : [window.innerWidth, window.innerHeight];
                if (this._opts.type == o.TYPE_VERTICAL) {
                    var _ = hasClass(bodyNode, "body_im"),
                        v = _ ? 60 : this._opts.bottomGap || 0,
                        g = t.top - f[1] > s[1] + l - c[1],
                        m = scrollGetY() + w[1] - (t.top + t.height + l) - v > s[1];
                    n = "top" == this._opts.defaultSide ? g ? "top" : "bottom" : m ? "bottom" : "top"
                } else n = t.left - f[0] < s[0] ? "right" : "left"
            }
            var b, y = getXY(this._appendToEl),
                x = [t.left - y[0], t.top - y[1]],
                k = c[0] + x[0];
            switch (this._opts.centerShift ? (k += this._opts.centerShift || 0, b = this._opts.centerShift) : this._opts.rightShift && (b = -(s[0] / 2 - this._opts.rightShift), k += b), this._prevSide = n, n) {
                case "bottom":
                    r = {
                        left: -s[0] / 2 + t.width / 2 + k,
                        top: t.height + l - c[1] + x[1]
                    };
                    break;
                case "top":
                    r = {
                        left: -s[0] / 2 + t.width / 2 + k,
                        top: -s[1] - l + c[1] + x[1]
                    };
                    break;
                case "right":
                    r = {
                        left: t.width + l + k,
                        top: t.height / 2 - s[1] / 2 + c[1] + x[1]
                    };
                    break;
                case "left":
                    r = {
                        left: -s[0] - l + k,
                        top: t.height / 2 - s[1] / 2 + c[1] + x[1]
                    }
            }
            this._opts.type == o.TYPE_VERTICAL ? e("marginLeft", b) : e("marginTop")
        }
        each(["top", "bottom", "left", "right"], function(e, t) {
            n != t && removeClass(this._ttel, "eltt_" + t)
        }.bind(this)), addClass(this._ttel, "eltt_" + n), setStyle(this._ttel, r)
    }, o.prototype._hide = function(e) {
        if (this._isShown = !1, this._clearTimeouts(), this._reTimeout = setTimeout(function() {
                hide(this._ttel), this._opts.elClassWhenShown && removeClass(this._el, this._opts.elClassWhenShown), this._opts.onHide && this._opts.onHide(this._ttel, !!e)
            }.bind(this), o.FADE_SPEED), this._opts.onBeforeHide) try {
            this._opts.onBeforeHide(this._ttel, !!e)
        } catch (t) {}
        removeClass(this._ttel, "eltt_vis"), this._ev_wclick && removeEvent(document, "mousedown", this._ev_wclick)
    }, o.prototype.isShown = function() {
        return this._isShown
    }, o.prototype.toggle = function() {
        this.isShown() ? this.hide() : this.show()
    }, o.prototype._clearTimeouts = function() {
        this._visTO && clearTimeout(this._visTO), this._visTO = !1, this._sto && clearTimeout(this._sto), this._sto = !1, this._hto && clearTimeout(this._hto), this._hto = !1, this._reTimeout && clearTimeout(this._reTimeout), this._reTimeout = !1
    }, o.prototype.getContent = function() {
        return geByClass1("_eltt_content", this._ttel)
    }, window.ElementTooltip = o
}, function(e, t) {
    function o(e, t, o, n) {
        if (e = ge(e)) {
            var i, a = isFunction(n) ? n : function() {},
                d = extend({}, "object" == ("undefined" == typeof o ? "undefined" : l(o)) ? o : {
                    duration: o,
                    onComplete: a
                }),
                c = {},
                u = {},
                h = isVisible(e);
            d.orig = {}, t = clone(t), t.discrete && (d.discrete = 1, delete t.discrete), browser.iphone && (d.duration = 0);
            var p = data(e, "tween"),
                f = h ? "hide" : "show";
            p && p.isTweening && (d.orig = extend(d.orig, p.options.orig), p.stop(!1), p.options.show ? f = "hide" : p.options.hide && (f = "show"));
            for (i in t) {
                if (!p && ("show" == t[i] && h || "hide" == t[i] && !h)) return d.onComplete.call(this, e);
                if ("height" != i && "width" != i || !e.style || (t.overflow || (void 0 == d.orig.overflow && (d.orig.overflow = getStyle(e, "overflow")), e.style.overflow = "hidden"), hasClass(e, "inl_bl") || "TD" == e.tagName || (e.style.display = "block")), /show|hide|toggle/.test(t[i]))
                    if ("toggle" == t[i] && (t[i] = f), "show" == t[i]) {
                        var w = 0;
                        d.show = !0, void 0 == d.orig[i] && (d.orig[i] = getStyle(e, i, !1) || "", setStyle(e, i, 0));
                        var _ = d.orig[i],
                            v = e.style[i];
                        e.style[i] = _, t[i] = parseFloat(getStyle(e, i, !0)), e.style[i] = v, "height" == i && browser.msie && !t.overflow && (e.style.overflow = "hidden")
                    } else void 0 == d.orig[i] && (d.orig[i] = getStyle(e, i, !1) || ""), d.hide = !0, t[i] = 0
            }
            return d.show && !h && show(e), p = new Fx.Base(e, d), each(t, function(t, o) {
                if (/backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|borderColor|outlineColor/.test(t)) {
                    var n = "borderColor" == t ? "borderTopColor" : t;
                    if (w = s(e, n), o = r(o), void 0 === w) return
                } else {
                    var i = o.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/);
                    p.cur(t, !0) || 0, i && (o = parseFloat(i[2]), i[1] && (o = ("-=" == i[1] ? -1 : 1) * o + o)), w = p.cur(t, !0), 0 != w || "width" != t && "height" != t || (w = 1), "opacity" == t && o > 0 && !h && (setStyle(e, "opacity", 0), w = 0, show(e))
                }(w != o || isArray(w) && w.join(",") == o.join(",")) && (c[t] = w, u[t] = o)
            }), p.start(c, u), data(e, "tween", p), p
        }
    }

    function n(e, t, o, n, i, a) {
        var r, s, l, d, c, u, h = function(t) {
                var n = 1 - t;
                return 3 * n * n * t * e + 3 * n * t * t * o + t * t * t
            },
            p = function(e) {
                var o = 1 - e;
                return 3 * o * o * e * t + 3 * o * e * e * n + e * e * e
            },
            f = function(t) {
                var n = 1 - t;
                return 3 * (2 * (t - 1) * t + n * n) * e + 3 * (-t * t * t + 2 * n * t) * o
            },
            w = i;
        for (l = w, u = 0; 8 > u; u++) {
            if (d = h(l) - w, Math.abs(d) < a) return p(l);
            if (c = f(l), Math.abs(c) < 1e-6) break;
            l -= d / c
        }
        if (r = 0, s = 1, l = w, r > l) return p(r);
        if (l > s) return p(s);
        for (; s > r;) {
            if (d = h(l), Math.abs(d - w) < a) return p(l);
            w > d ? r = l : s = l, l = .5 * (s - r) + r
        }
        return p(l)
    }

    function i(e, t, n, i) {
        return o(e, {
            opacity: n
        }, t, i)
    }

    function a(e, t) {
        var o = {};
        return each(Fx.Attrs.concat.apply([], Fx.Attrs.slice(0, t)), function() {
            o[this] = e
        }), o
    }

    function r(e) {
        var t;
        return e && isArray(e) && 3 == e.length ? e : (t = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) ? [parseInt(t[1]), parseInt(t[2]), parseInt(t[3])] : (t = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e)) ? [2.55 * parseFloat(t[1]), 2.55 * parseFloat(t[2]), 2.55 * parseFloat(t[3])] : (t = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : (t = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e)) ? [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)] : void 0
    }

    function s(e, t) {
        var o;
        do {
            if (o = getStyle(e, t), o.indexOf("rgba") || (o = ""), "" != o && "transparent" != o || "body" == e.nodeName.toLowerCase()) break;
            t = "backgroundColor"
        } while (e = e.parentNode);
        return r(o)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.animate = o, t.cubicBezier = n, t.fadeTo = i, t.genFx = a, t.getRGB = r, t.getColor = s, window.Fx = {
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
            swiftOut: function(e, t, o, i) {
                return o * n(.4, 0, .22, 1, e / i, 4 / i) + t
            }
        },
        Attrs: [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity", "left", "top"]
        ],
        Timers: [],
        TimerId: null
    }, window.fx = Fx, Fx.Base = function(e, t, o) {
        this.el = ge(e), this.name = o, this.options = extend({
            onStep: function() {},
            onComplete: function() {},
            transition: t.transition || Fx.Transitions.sineInOut,
            duration: 500
        }, t || {})
    }, each({
        slideDown: a("show", 1),
        slideUp: a("hide", 1),
        slideToggle: a("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        window[e] = function(e, n, i) {
            return o(e, t, n, i)
        }
    }), Fx.Base.prototype = {
        start: function(e, t) {
            function o(e) {
                return n.step(e)
            }
            this.from = e, this.to = t, this.time = vkNow(), this.isTweening = !0;
            var n = this;
            return o.el = this.el, o() && Fx.Timers.push(o) && !Fx.TimerId && (Fx.TimerId = setInterval(function() {
                for (var e = Fx.Timers, t = e.length, o = 0; t > o; o++) e[o]() || (e.splice(o--, 1), t--);
                t || (clearInterval(Fx.TimerId), Fx.TimerId = null)
            }, 13)), this
        },
        stop: function(e) {
            for (var t = Fx.Timers, o = t.length - 1; o >= 0; o--) t[o].el == this.el && (e && t[o](!0), t.splice(o, 1));
            this.isTweening = !1
        },
        step: function(e) {
            var t = vkNow();
            if (!e && t < this.time + this.options.duration) {
                this.cTime = t - this.time, this.now = {};
                for (var o in this.to)
                    if (isArray(this.to[o])) {
                        var n, i = [];
                        for (n = 0; 3 > n; n++) {
                            if (void 0 === this.from[o] || void 0 === this.to[o]) return !1;
                            i.push(Math.min(parseInt(this.compute(this.from[o][n], this.to[o][n])), 255))
                        }
                        this.now[o] = i
                    } else this.now[o] = this.compute(this.from[o], this.to[o]), this.options.discrete && (this.now[o] = intval(this.now[o]));
                return this.update(), !0
            }
            return setTimeout(this.options.onComplete.bind(this, this.el), 10), this.now = extend(this.to, this.options.orig), this.update(), this.options.hide && hide(this.el), this.isTweening = !1, !1
        },
        compute: function(e, t) {
            var o = t - e;
            return this.options.transition(this.cTime, e, o, this.options.duration)
        },
        update: function() {
            this.options.onStep(this.now);
            for (var e in this.now) isArray(this.now[e]) ? setStyle(this.el, e, "rgb(" + this.now[e].join(",") + ")") : void 0 != this.el[e] ? this.el[e] = this.now[e] : setStyle(this.el, e, this.now[e])
        },
        cur: function(e, t) {
            return null == this.el[e] || this.el.style && null != this.el.style[e] ? parseFloat(getStyle(this.el, e, t)) || 0 : this.el[e]
        }
    }, window.animate = o, window.cubicBezier = n, window.fadeTo = i, window.genFx = a, window.getRGB = r, window.getColor = s
}, function(e, t) {
    function o() {
        var e = {};
        each(geByClass("_short_currency"), function() {
            var t = this.getAttribute("data-short") || "",
                o = winToUtf(t).length,
                n = getStyle(this, "fontFamily") || "tahoma,arial,sans-serif";
            if (!t) return !0;
            if ("undefined" == typeof e[n]) {
                for (var i = "", a = o - 1; a >= 0; a--) i += "&#8399;";
                var r = ce("div", {
                    innerHTML: "<b>" + t + "</b><b>" + i + "</b>"
                }, {
                    fontFamily: n,
                    fontSize: "24px"
                });
                ge("utils").appendChild(r), e[n] = Math.abs(r.firstChild.offsetWidth - r.lastChild.offsetWidth) >= 2 * o, re(r)
            }
            e[n] && val(this, t)
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.shortCurrency = o, window.shortCurrency = o
}, function(module, exports, __webpack_require__) {
    function jsc(e) {
        return "cmodules/" + e
    }

    function nodeUpdated(e, t) {
        setStyle(e, {
            backgroundColor: "#F5F7FA"
        }), animate(e, {
            backgroundColor: "#FFF"
        }, t || 6e3, function(e) {
            setStyle(e, {
                backgroundColor: null
            })
        })
    }

    function debugLog(e) {
        try {
            window.debuglogClient && debuglogClient(e);
            var t = "[" + ((new Date).getTime() - _logTimer) / 1e3 + "] ";
            if (window.console && console.log) {
                var o = Array.prototype.slice.call(arguments);
                o.unshift(t), browser.msie || browser.mobile ? console.log(o.join(" ")) : console.log.apply(console, o)
            }
        } catch (n) {}
    }

    function debugEl(e) {
        return e && ((e.tagName || "").toLowerCase() + (e.className ? "." + e.className.replace(/\s+/g, ".") : "") + (e.id && !/^__vk/.test(e.id) ? "#" + e.id : "") || e.toString()) || "[NULL]"
    }

    function __bf() {}

    function tnActive(e) {
        window.tnAct = e, addClass(e, "active")
    }

    function tnInactive() {
        removeClass("head_music", "head_play_down"), removeClass("top_logo_down", "tld_d"), removeClass(window.tnAct, "active")
    }

    function updateHeaderStyles(e) {
        var t = [ge("dev_top_nav_wrap"), ge("page_header_wrap")];
        each(t, function(t, o) {
            o && setStyle(o, e)
        })
    }

    function compareScrollStyles(e, t) {
        var o = clone(e),
            n = clone(t);
        return each(o, function(e, t) {
            "position" !== e && (o[e] = Math.round(t))
        }), each(n, function(e, t) {
            "position" !== e && (n[e] = Math.round(t))
        }), JSON.stringify(o) === JSON.stringify(n)
    }

    function updateNarrow() {
        cur.__narrowBar = cur.__narrowBar || {}, cur.__narrowBar.bar = cur.__narrowBar.bar || ge("narrow_column"), cur.__narrowBar.barBlock = cur.__narrowBar.bar && geByClass1("page_block", cur.__narrowBar.bar), cur.__narrowBar.wideCol = cur.__narrowBar.wideCol || ge("wide_column"), cur.__narrowBar.isBarFixed = cur.__narrowBar.isBarFixed || "fixed" === getStyle(cur.__narrowBar.bar, "position"), cur.__narrowBar.pl = cur.__narrowBar.pl || ge("page_layout");
        var e = cur.__narrowBar.bar,
            t = cur.__narrowBar.barBlock,
            o = cur.__narrowBar.wideCol,
            n = scrollGetY();
        if (!browser.mobile && e && t && o && !isVisible(boxLoader) && !isVisible(boxLayerBG) && !isVisible(layerBG)) {
            var i, a = window.lastWindowHeight || 0,
                r = Math.min(n, bodyNode.clientHeight - a),
                s = cur.__narrowBar.pl,
                l = vk.staticheader ? Math.max(0, getPageHeaderHeight() - r) : getPageHeaderHeight(),
                d = cur.__narrowBar.isBarFixed,
                c = floatval(getStyle(cur.__narrowBar.barBlock, "marginTop")),
                u = getSize(e)[1] - (d ? c : 0),
                h = getSize(o)[1],
                p = getXY(o)[1],
                f = u >= h - c,
                w = c,
                _ = r + a - h - p - w,
                v = Math.max(0, _),
                g = p - l,
                m = getXY(e)[1] + (d ? c : 0),
                b = cur.__narrowBar.lastSt || 0,
                y = cur.__narrowBar.lastStyles || {},
                x = !1,
                k = a >= l + w + u + c + v && !cur.narrowHide,
                C = 1;
            g > r - C && !(k && browser.msie && l + c > m) || f ? i = {
                marginTop: 0
            } : r - C < Math.min(b, m - l - c) || k ? (i = {
                top: l,
                marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(s)[0]))
            }, x = !0) : r + C > Math.max(b, m + u + w - a) && 0 > _ && !cur.narrowHide || cur.narrowHide && r + C > Math.max(b, m + u - l) ? (i = {
                bottom: cur.narrowHide ? a - l : w,
                marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(s)[0]))
            }, x = !0) : i = {
                marginTop: _ >= 0 ? h - u : Math.min(m - p, h - u + g)
            }, compareScrollStyles(i, y) || (each(y, function(e, t) {
                y[e] = null
            }), setStyle(e, extend(y, i)), cur.__narrowBar.lastStyles = i), x !== d && toggleClass(e, "fixed", x), cur.__narrowBar.lastSt = r, cur.__narrowBar.isBarFixed = x
        }
    }

    function updateLeftMenu(e) {
        window.__leftMenu && window.__leftMenu.handleUpdateRequest(e)
    }
    __webpack_require__(1), __webpack_require__(13), __webpack_require__(21), __webpack_require__(20), __webpack_require__(15), __webpack_require__(17), __webpack_require__(10), __webpack_require__(12), __webpack_require__(19), __webpack_require__(2), __webpack_require__(3), __webpack_require__(5), __webpack_require__(16), __webpack_require__(14), __webpack_require__(6), __webpack_require__(18), __webpack_require__(24), __webpack_require__(26), __webpack_require__(22), __webpack_require__(7), __webpack_require__(23), __webpack_require__(25), __webpack_require__(11), __webpack_require__(4), __webpack_require__(27), __webpack_require__(9);
    var vk = window.vk;
    1 == vk.al ? (location.search || "/" != location.pathname) && location.replace("/") : (3 != vk.al || history.pushState || (vk.al = 2), location.search || "/index.php" != location.pathname || location.replace("/"), vk.version = !1), window.stVersions || (window.navMap = window.stVersions = window.stTypes = {}, window._rnd = 1), window.jsc = jsc, window.NextPageID = 1, window.__debugMode = !0, window._wf = 0, window._ua || (window._ua = navigator.userAgent.toLowerCase()), window.locDomain || (window.locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0]), window.StaticFiles || (window.StaticFiles = {}), window.parseJSON = window.JSON && JSON.parse ? function(obj) {
        try {
            return JSON.parse(obj)
        } catch (e) {
            return topError("<b>parseJSON:</b> " + e.message, {
                dt: -1,
                type: 5,
                answer: obj
            }), eval("(" + obj + ")")
        }
    } : function(obj) {
        return eval("(" + obj + ")")
    }, window.vkLastNav = Date.now(), window.vkTabLoaded = Date.now(), window.cur = {
        destroy: [],
        nav: []
    }, browser.android && (setCookie("remixscreen_width", window.screen.width, 365), setCookie("remixscreen_height", window.screen.height, 365), setCookie("remixscreen_dpr", window.devicePixelRatio || 1, 365)), setCookie("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365);
    for (var i in StaticFiles) {
        var f = StaticFiles[i];
        f.t = -1 != i.indexOf(".css") ? "css" : "js", f.n = i.replace(/[\/\.]/g, "_"), f.l = 0, f.c = 0
    }
    if (window.locHost = location.host, window.locProtocol = location.protocol, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), __dev || (window.__debugMode = !1), window.locHash = location.hash.replace("#/", "").replace("#!", ""), window.locBase = location.toString().replace(/#.+$/, ""), window.nodeUpdated = nodeUpdated, window._logTimer = (new Date).getTime(), window.debugLog = debugLog, window.debugEl = debugEl, window.__bf = __bf, addEvent(window, "unload", function() {
            for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem != window && removeEvent(vkCache[e].handle.elem)
        }), addEvent(window, "DOMContentLoaded load", function() {
            vk.loaded || (vk.loaded = !0, updSideTopLink()), checkPageBlocks()
        }), window.tnActive = tnActive, window.tnInactive = tnInactive, addEvent(window, "mouseup dragstart", tnInactive), addEvent(document, "mouseup dragstart", tnInactive), __debugMode) {
        var __checkData = function() {
            var e = [];
            for (var t in vkCache) {
                var o, n = vkCache[t];
                if (n && (o = n.__elem)) {
                    var i = o.id;
                    if (i || (o.id = i = "__vk" + irand(1e6, 9999999)), ge(i) != o) {
                        var a = [];
                        for (var r in n)
                            if (!("__elem" == r || "handle" == r && n.events))
                                if ("events" == r) {
                                    var s = [];
                                    for (var l in n[r]) s.push(l + "(" + n[r][l].length + ")");
                                    a.push("{" + s.join(", ") + "}")
                                } else a.push(r);
                        e.push("<b>" + debugEl(o) + "</b>: " + a.join(", "))
                    }
                }
            }
            return e.join("<br>")
        };
        addEvent(document, "keydown", function(e) {
            120 != e.keyCode || e.charCode || showFastBox({
                title: "Debug"
            }, __checkData())
        })
    }
    addEvent(document, "mousedown", function(e) {
        _wf = 1, cur.__mdEvent = e
    }), window.updateHeaderStyles = updateHeaderStyles, window.compareScrollStyles = compareScrollStyles, window.updateNarrow = updateNarrow, window.getLmDomEles = function() {
        function e(e) {
            return e && document.body.contains(e)
        }
        var t = {};
        return function() {
            return {
                bar: t.bar = e(t.bar) ? t.bar : ge("side_bar_inner"),
                pl: t.pl = e(t.pl) ? t.pl : ge("page_layout"),
                pb: t.pb = e(t.pb) ? t.pb : ge("page_body")
            }
        }
    }(), window.updateSTL = function() {
        var e = window,
            t = document.documentElement,
            o = Math.max(intval(e.innerWidth), intval(t.clientWidth));
        toggleClass(bodyNode, "no_stl", o < vk.width + 280), toggleClass(bodyNode, "no_sett", o < vk.width + 62)
    }, window.checkPageBlocks = function() {
        var e = ge("content");
        e && (toggleClass(e, "page_block", !geByClass1("page_block", e)), updateAriaElements())
    }, window.onBodyResize = function(e) {
        var t = window,
            o = document.documentElement;
        if (t.pageNode) {
            var n = Math.max(intval(t.innerWidth), intval(o.clientWidth)),
                i = Math.max(intval(t.innerHeight), intval(o.clientHeight)),
                a = sbWidth(),
                r = !1;
            if (browser.mobile && (n = Math.max(n, intval(bodyNode.scrollWidth)), i = Math.max(i, intval(bodyNode.scrollHeight))), t.lastWindowWidth != n || e === !0) {
                r = !0, t.lastInnerWidth = t.lastWindowWidth = n, layerWrap.style.width = boxLayerWrap.style.width = n + "px";
                var s = layer.style.width = boxLayer.style.width = n - a - 2 + "px";
                if (window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.width = n + "px", mvLayer.style.width = s), window.wkLayerWrap && (wkLayerWrap.style.width = n + "px", wkLayer.style.width = s), bodyNode.offsetWidth < vk.width + a + 2 && (n = vk.width + a + 2), n)
                    for (var l = pageNode.firstChild; l; l = l.nextSibling)
                        if (l.tagName) {
                            for (var d = (t.lastInnerWidth = n - a - 1) - 1, c = l.firstChild; c; c = c.nextSibling) "scroll_fix" == c.className && (c.style.width = d + "px");
                            vk.staticheader || updateHeaderStyles({
                                width: d
                            })
                        }
            }
            if (t.lastWindowHeight != i || e === !0) {
                if (r = !0, t.lastWindowHeight = i, layerBG.style.height = boxLayerBG.style.height = layerWrap.style.height = boxLayerWrap.style.height = i + "px", window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.height = i + "px"), window.wkLayerWrap) {
                    var u = browser.mobile ? t.innerHeight : i;
                    wkLayerWrap.style.height = u + "px"
                }
                browser.mozilla && layers.visible && (pageNode.style.height = _oldScroll + i + "px")
            }
            if (vk.noSideTop || updSideTopLink(1), r && t.curRBox && t.curRBox.boxes && window.getWndInner) {
                var h = getWndInner();
                each(curRBox.boxes, function() {
                    this._wnd_resize(h[0], h[1])
                })
            }
            setTimeout(updSeenAdsInfo, 0);
            var p = getAudioPlayer();
            p.audioLayer && p.audioLayer.isShown() && p.audioLayer.updatePosition(), cur.pvShown && window.Photoview && setTimeout(Photoview.updatePhotoDimensions), window.tooltips && tooltips.rePositionAll(), cur.lSTL && setStyle(cur.lSTL, {
                width: Math.max(getXY(cur.lSTL.el)[0], 0),
                height: i - 1
            }), ge("dev_top_nav") && setStyle(ge("dev_top_nav", "left", null));
            var f = geByClass("ui_search_fixed"),
                w = ge("narrow_column");
            each(f, function() {
                redraw(this, "ui_search_fixed"), setTimeout(redraw.pbind(this, "ui_search_fixed"), 0)
            }), w && (redraw(w, "fixed"), setTimeout(redraw.pbind(w, "fixed"), 0)), updateLeftMenu(), updateNarrow(), updateSTL()
        }
    }, window.redraw = function(e, t) {
        e && "fixed" == getStyle(e, "position") && (t ? removeClass(e, t) : setStyle(e, {
            position: "relative"
        }), e.offsetLeft, t ? addClass(e, t) : setStyle(e, {
            position: "fixed"
        }))
    }, window.onBodyScroll = function() {
        if (window.pageNode) {
            var e = Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge("page_layout"))[0]));
            browser.mobile || vk.staticheader || updateHeaderStyles({
                marginLeft: e
            }), updateLeftMenu(), updateNarrow(), updSideTopLink()
        }
    }, window.onDocumentClick = function(e) {
        if (checkEvent(e)) return !0;
        if (ls.set("last_reloaded", []), !cur.onMouseClick || !cur.onMouseClick(e)) {
            if (!(e = window.event || e.originalEvent || e)) return !0;
            for (var t, o, n, i = 8, a = e.target || e.srcElement, r = window; a && a != bodyNode && "A" != a.tagName && i--;) a = a.parentNode;
            if (!a || "A" != a.tagName || a.onclick || a.onmousedown) return !0;
            if (t = a.href, t && (a.getAttribute("target") || nav.baseBlank)) {
                if (cur.hideReferrer && !browser.msie) return (blankWnd = r.open("", "_blank", "")) && (browser.msie && -1 != t.indexOf(";") && (t = "'" + t.replace(/'/g, "%27") + "'"), blankWnd.opener = null, blankWnd.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + clean(t) + '">'), blankWnd.document.close()), cancelEvent(e);
                try {
                    return r._opener.contentWindow.open(t, "_blank"), setTimeout(r._reopen, 0), cancelEvent(e)
                } catch (s) {
                    return !0
                }
            }
            if ("https:" != location.protocol && !t.indexOf("https://")) return !0;
            t = t.replace(/^https?:\/\//i, ""), t.indexOf(location.hostname) || (t = t.replace(location.hostname, "")), vk.dev && "vk.com" == location.hostname && (t = t.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/"));
            var l = {};
            (n = t.match(/^\/(.+?)#[\!\/](.+?)$/)) && !n[1].match(/^app(\d+)/) && (l.permanent = n[1], t = "/" + n[2]);
            var d = !!(a.getAttribute && a.getAttribute("data-post-click-type") && a.getAttribute("data-post-id"));
            if (t.match(/#$/) && !d) return !0;
            var c, u = t;
            if (o = t.match(/^\/(.*?)(\?|#|$)/)) o = o[1];
            else {
                if (a.hostname) c = a.hostname, o = a.pathname + a.search;
                else {
                    var h = /^([^:\/]+)?(?::(\d+))?(\/?[^#]*)(#?.*)$/i.exec(t);
                    if (!h) return !0;
                    c = h[1], o = h[3] || "/"
                }
                if (!c || !d) return !0;
                a.setAttribute("data-change-location-with-post-away", 1), u = a
            }
            if (o.indexOf(".php") > 0 || o.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images\/|utils\/|\.js|js\/|\.css|css\/|source\b)/)) {
                if (!d) return !0;
                a.setAttribute("data-change-location-with-post-away", 1), u = a
            }
            var p = a.getAttribute("hrefparams");
            p && (l.params = extend(l.params || {}, q2ajx(p)));
            try {
                return nav.go(u, e, l), cancelEvent(e)
            } catch (e) {
                return !0
            }
        }
    }, window.onEnter = function(e, t) {
        t = t || window.event, t.keyCode == KEY.ENTER && (e(), cancelEvent(t))
    }, window.onCtrlEnter = function(e, t) {
        e = e || window.event, (10 == e.keyCode || 13 == e.keyCode && (e.ctrlKey || e.metaKey && browser.mac)) && (t(), cancelEvent(e))
    }, window._stlClick = function(e) {
        return checkEvent(e) || cancelEvent(e)
    }, window._stlMousedown = function(e) {
        if (e = e || window.event, !checkEvent(e) && !__afterFocus)
            if (_stlWasSet && _stlWas) {
                var t = _stlWas;
                _stlWas = 0, scrollToY(t, 0, !0, !0), updateLeftMenu(!0)
            } else 1 === _stlBack ? _tbLink.onclick() : (_stlWas = scrollGetY(), scrollToY(0, 0, !0, !0), updateLeftMenu())
    }, window._stlMouseover = function(e) {
        var t = e ? e.originalEvent || e : window.event || {},
            o = "mouseover" == t.type && (t.pageX > 0 || t.clientX > 0);
        toggleClass(_stlLeft, "over", o), toggleClass(_stlLeft, "over_fast", o && (0 === _stlBack || _tbLink.fast) && 0 === _stlWasSet), toggleClass(_stlSide, "over", o)
    }, vk.width = 960, window.domStarted = function() {
        if (window.headNode = geByTag1("head"), extend(window, {
                icoNode: geByTag1("link", headNode),
                bodyNode: geByTag1("body"),
                htmlNode: geByTag1("html"),
                utilsNode: ge("utils"),
                _fixedNav: !1,
                _tbLink: {}
            }), addEvent(bodyNode, "resize", onBodyResize.pbind(!1)), utilsNode) {
            browser.mozilla ? addClass(bodyNode, "firefox") : browser.mobile && addClass(bodyNode, "mobfixed");
            var e = [];
            each(browser, function(t, o) {
                o && !inArray(t, ["version", "mac", "search_bot"]) && "flash" !== t.substr(0, 5) && e.push(t)
            }), e = e.join(" "), bodyNode.setAttribute("data-useragent", e);
            for (var t in StaticFiles) {
                var o = StaticFiles[t];
                o.l = 1, "css" == o.t && utilsNode.appendChild(ce("div", {
                    id: o.n
                }))
            }
            var n = ge("layer_bg"),
                i = n.nextSibling,
                a = ge("box_layer_bg"),
                r = a.nextSibling;
            if (extend(window, {
                    _reopen: function() {
                        re(window._opener), window._opener = utilsNode.appendChild(ce("iframe"))
                    },
                    layerBG: n,
                    boxLayerBG: a,
                    layerWrap: i,
                    layer: i.firstChild,
                    boxLayerWrap: r,
                    boxLayer: r.firstChild,
                    boxLoader: r.firstChild.firstChild,
                    _stlSide: ge("stl_side"),
                    _stlLeft: ge("stl_left"),
                    _stlShown: 0,
                    _stlWas: 0,
                    _stlWasSet: 0,
                    _stlBack: 0,
                    _regBar: 0,
                    __afterFocus: !1,
                    __needBlur: !1
                }), _reopen(), !browser.mobile) {
                var s = {
                    onclick: _stlClick,
                    onmousedown: _stlMousedown,
                    onmouseover: _stlMouseover,
                    onmouseout: _stlMouseover
                };
                val(_stlLeft, '<div id="stl_bg"><nobr id="stl_text">' + getLang("global_to_top") + "</nobr></div>"), extend(_stlLeft, s), extend(_stlSide, s), window._stlBg = _stlLeft.firstChild, window._stlText = _stlBg.firstChild, addEvent(window, "blur", function(e) {
                    _wf = -1, __needBlur = !1
                });
                var l = !0;
                addEvent(window, "focus", function(e) {
                    _wf = 1, __needBlur || (__afterFocus = __needBlur = !0, setTimeout(function() {
                        __afterFocus = !1
                    }, 10), l && (sbWidth(!0), onBodyResize(!0), l = !1))
                })
            }
            addEvent(boxLayerWrap, "click", __bq.hideLastCheck), window.LazyLoad && LazyLoad.watch(boxLayerWrap), extend(layers, {
                show: layers._show.pbind(n, i),
                boxshow: layers._show.pbind(a, r),
                wrapshow: layers._show.pbind(n),
                hide: layers._hide.pbind(n, i),
                boxhide: layers._hide.pbind(a, r),
                wraphide: layers._hide.pbind(n)
            }), hab.init(), window._retinaInit ? window._retinaInit() : window._initedCheck = 1
        }
    }, vk.started = vkNow(), window.domReady = function() {
        if (utilsNode) {
            updateSTL();
            var e = ge("side_bar");
            extend(window, {
                pageNode: ge("page_wrap"),
                _fixedNav: e && "fixed" === getStyle(e, "position"),
                _tbLink: ge("top_back_link")
            }), window.scrollNode = browser.chrome || browser.safari ? bodyNode : htmlNode, 1 == vk.al && showTitleProgress();
            var t = Math.max(vkNow() - vk.started, 10),
                o = intval((vk.contlen || 1) / t * 1e3);
            if (browser.mozilla && browser.version >= 4 ? o /= 2.5 : browser.mozilla ? o *= 1.5 : browser.msie && browser.version >= 7 ? o /= 1.5 : browser.msie && (o *= 2.5), __stm.lowlimit = intval(150 * Math.max(2e6 / o, 1)), __stm.highlimit = 6 * __stm.lowlimit, __stm.lowlimit = Math.min(__stm.lowlimit, 600), onBodyResize(), setTimeout(onBodyResize.pbind(!1), 0), updateAriaElements(), addEvent(window, "scroll", onBodyScroll), window.debuglogInit && debuglogInit(), !vk.id && ls.checkVersion() && ls.get("last_reloaded")) try {
                var n = ["sound_notify_off", "im_ui_notify_off"],
                    i = {};
                each(n, function() {
                    var e = ls.get(this);
                    null !== e && (i[this] = e)
                }), window.localStorage.clear(), each(i, function(e, t) {
                    ls.set(e, t)
                })
            } catch (a) {}
            if (Math.random() < 1e-4 && window.performance && performance.timing && performance.timing.navigationStart) {
                var r = (new Date).getTime() - performance.timing.navigationStart;
                statlogsValueEvent("page_load", r, "domReady")
            }
        }
    }, window.onDomReady = function(e) {
        e()
    }, window.hab = new HistoryAndBookmarks({
        onLocChange: function(e) {
            var t = {
                back: !0,
                hist: !0
            };
            3 == vk.al && history.state && isObject(history.state) && (t.scrollTop = intval(history.state.scrollTop)), nav.go("/" + e, void 0, t)
        }
    }), window.leftBlockOver = function(e) {
        var t = 1;
        e.id || (e = ge("left_hide" + e), t = 0), (t || !e.timer) && (e.showing ? removeAttr(e, "showing") : (animate(e, {
            opacity: t ? 1 : .5
        }, 200), t && (e.showing = 1))), e.timer && (clearTimeout(e.timer), removeAttr(e, "timer"))
    }, window.leftBlockOut = function(e) {
        var t = .5;
        e.id || (e = ge("left_hide" + e), t = 0), e.timer = setTimeout(function() {
            animate(e, {
                opacity: t
            }, 200), removeAttr(e, "timer")
        }, 1)
    }, window.leftBlockHide = function(e, t, o) {
        var n = {
            act: "hide_block",
            block: e,
            hash: t
        };
        o && (n.block = o), ajax.post("al_index.php", n, {
            onDone: updSeenAdsInfo
        }), hide("left_block" + e)
    }, window.hideNewsAnnounce = function(e, t) {
        var o = {
            act: "hide_block",
            block: e,
            hash: t
        };
        ajax.post("al_index.php", o), hide("news_announce_" + e)
    }, window.leftAdBlockClose = function(e, t) {
        function o(t) {
            if (t.done) {
                if ("ya_direct" == e) return animate(e, {
                    opacity: 0
                }, 200, function() {
                    re("ya_direct"), setTimeout(function() {
                        AdsLight.updateBlock("force_hard", 2)
                    }, 5e3)
                }), void(vk__adsLight.yaDirectAdActive = !1);
                var o = ge("ads_ad_close_info_" + e);
                if (!o) return !1;
                setStyle(o, {
                    opacity: 0
                }), o.style.setProperty("display", "block", "important"), setTimeout(n, 0)
            }
        }

        function n() {
            animate("ads_ad_close_info_" + e, {
                opacity: 1
            }, 200, i)
        }

        function i() {
            setStyle("ads_ad_box2_" + e, {
                visibility: "hidden"
            })
        }
        setStyle("left_hide" + e, {
            visibility: "hidden"
        }), ajax.post(t, {}, {
            noAds: !0,
            onDone: o
        })
    }, window.leftBlockFriendHide = function(e, t, o) {
        var n = ge("left_friends");
        if (n) {
            var i = geByClass("left_friend_block", n),
                a = [];
            for (var r in i) {
                var s = i[r].id.split("_");
                a.push(s[2])
            }
            var l = {
                act: "hide_block",
                block: t,
                showed: a.join(","),
                hash: o
            };
            ajax.post("al_index.php", l, {
                onDone: function(e) {
                    if (e) {
                        var t = se(e);
                        geByClass("left_friend_block", n).length >= 2 && hide(t), n.insertBefore(t, geByClass1("left_friend_all_link", n))
                    }
                    geByClass("left_friend_block", n).length || hide("left_friend_all_link")
                }
            });
            var d = ge("left_block" + e),
                c = i.pop();
            c && !isVisible(c) ? (show(c), d.parentNode.replaceChild(c, d)) : re(d)
        }
    }, window.leftBlockToggleFriend = function(e, t, o, n, i) {
        n && stManager.add(["tooltips.css", "tooltips.js"]), cur.mfid = e, ajax.post("al_friends.php", {
            act: n ? "add" : "remove",
            mid: e,
            mf_type: t,
            hash: o,
            from: "leftblock"
        }, {
            onDone: function(t, o, n) {
                if (!t) return nav.reload();
                var i = ge("left_friend_status_" + e);
                cleanElems(i.firstChild), t ? (show(i), val(i, t)) : hide(i), o && (ajax.preload("al_friends.php", {
                    act: "friend_tt",
                    mid: e
                }, [o, n]), setTimeout(leftBlockFriendTooltip, 0))
            },
            showProgress: function() {
                var t = (ge("left_friend_subscribed") || {}).tt;
                t && (t.hide({
                    fasthide: 1
                }), t.destroy()), ge("left_friend_status_" + e).innerHTML = '<img src="/images/upload' + (window.devicePixelRatio >= 2 ? "_2x" : "") + '.gif" width="32" />'
            },
            hideProgress: function() {
                hide("left_friend_status_" + e)
            },
            onFail: function(e) {
                return e ? (showFastBox({
                    title: getLang("global_error")
                }, e), !0) : void 0
            }
        }), cancelEvent(i)
    }, window.leftBlockFriendTooltip = function() {
        return showTooltip(ge("left_friend_subscribed"), {
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
    }, window.leftBlockUnpaidGiftsHide = function(e, t) {
        return showFastBox({
            title: getLang("left_delete_unpaid_gifts_title")
        }, getLang("left_delete_unpaid_gifts_text"), getLang("global_delete"), function() {
            leftBlockHide(e, t), re("payments_box_unpaid_gifts_info"), curBox().hide()
        }, getLang("global_cancel"))
    }, window.comScoreUDM = function(e, t) {
        vk.zero || (t = t || document.referrer, vkImage().src = locProtocol + "//" + ("https:" == locProtocol ? "sb" : "b") + ".scorecardresearch.com/p?c1=2&c2=13765216&c3=&c4=" + escape(e) + "&c5=&c7=" + escape(e) + "&c9=" + escape(t) + "&c15=&cv=2.0&cj=1&rn=" + Math.random())
    }, window.updateOtherCounters = function(e, t) {
        if (!vk.zero && !__dev) {
            t = t || document.referrer;
            for (var o = [new RegExp("(\\/login)(\\?).*$")], n = 0; n < o.length; ++n)
                if (e.match(o[n])) return;
            var i = [
                    [new RegExp("(\\/(?:write|mail|im|al_im.php))(\\?[a-z0-9&=\\-_]*)?$"), "$1"],
                    [new RegExp("(\\/write)(\\d*)(\\?[a-zA-Z0-9&=\\-_]*)?$"), "$1"]
                ],
                a = {
                    referrer: t,
                    url: e
                };
            each(a, function(e, t) {
                each(i, function() {
                    a[e] = a[e].replace(this[0], this[1])
                })
            }), t = a.referrer, e = a.url, vkImage().src = locProtocol + "//counter.yadro.ru/hit?r" + escape(t) + (void 0 === window.screen ? "" : ";s" + screen.width + "*" + screen.height + "*" + (screen.colorDepth ? screen.colorDepth : screen.pixelDepth)) + ";u" + escape(e) + ";" + Math.random(), vkImage().src = locProtocol + "//www.tns-counter.ru/V13a***R>" + t.replace(/\*/g, "%2a") + "*vk_com/ru/UTF-8/tmsec=vksite_total/" + Math.round(1e9 * Math.random()), "unauth" == vk.tnsPixelType ? vkImage().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184674/" + Math.round(1e9 * Math.random()) : "has_rough" == vk.tnsPixelType ? vkImage().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184675/" + Math.round(1e9 * Math.random()) : "not_has_rough" == vk.tnsPixelType && (vkImage().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184677/" + Math.round(1e9 * Math.random())), comScoreUDM(e, t), window._tmr = window._tmr || [], window._tmr.push({
                id: "2579437",
                url: e,
                referrer: t,
                type: "pageView",
                start: (new Date).getTime(),
                pid: vk.id ? vk.id : 0
            })
        }
    }, window.handlePageView = function(e) {
        var t = ge("footer_wrap"),
            o = void 0 === e.width ? vk.width : e.width,
            n = void 0 === e.width_dec ? vk.width_dec : e.width_dec,
            i = void 0 === e.width_dec_footer ? vk.width_dec_footer : e.width_dec_footer;
        if ((vk.noleftmenu != e.noleftmenu || vk.nobottommenu != e.nobottommenu || vk.width != e.width || vk.width_dec_footer != e.width_dec_footer) && (vk.noleftmenu != e.noleftmenu && e.noleftmenu && hide("side_bar"), vk.nobottommenu != e.nobottommenu && (e.nobottommenu ? hide("bottom_nav") : show("bottom_nav")), e.noleftmenu && e.nobottommenu ? t && (addClass(t, "simple"), t.style.width = "auto") : t && (removeClass(t, "simple"), t.style.width = o - i + "px")), vk.notopmenu != e.notopmenu && (e.notopmenu ? hide("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap") : show("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap")), o != vk.width || n != vk.width_dec) {
            ge("page_layout").style.width = o + "px", ge("page_header").style.width = o + "px", ge("page_body").style.width = o - n + "px", ge("ts_wrap") && hasClass(ge("ts_wrap"), "vk") && (ge("ts_wrap").style.width = o - 191 + "px"), setTimeout(updSideTopLink.pbind(!0), 0), setTimeout(updateSTL, 0);
            try {
                _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
            } catch (a) {}
        }
        vk.noleftmenu == e.noleftmenu || e.noleftmenu || show("side_bar"), vk.noleftmenu = e.noleftmenu, vk.nobottommenu = e.nobottommenu, vk.notopmenu = e.notopmenu, vk.width = o, vk.width_dec = n, vk.width_dec_footer = i, vk.body_class = e.body_class, vk.staticheader = intval(e.staticheader), vk.no_ads = e.no_ads, vk.ad_preview = e.ad_preview
    }, window.handleSetCount = function(e, t, o) {
        var n = "",
            i = "",
            a = "spr" == o ? 5 : 3,
            r = '<span class="inl_bl left_count_sign"></span>',
            s = geByClass1("left_count_wrap", e),
            l = hasClass(geByClass1("left_row", e, "a"), "left_nav_over"),
            d = geByClass1("left_count", e, "span"),
            c = val(d);
        t && (n = t.toString(), n.length > a && (i = ' title="' + stripHTML(langNumeric(t, "%s", !0)) + '"', n = ".." + n.substr(n.length - a)), n = n, r = '<span class="inl_bl left_count" ' + i + ">" + n + "</span>");
        var u = function() {
            val(s, r), (t ? removeClass : addClass)(s, "left_void"), setStyle(s, {
                opacity: ""
            })
        };
        if (c || l)
            if (n) animateCount(d, n, {
                str: "auto",
                onDone: u
            });
            else if (l) {
            var h = bodyNode.appendChild(se('<span class="left_count_wrap"><span class="inl_bl left_count_sign"></span></span>'));
            plusWidth = getSize(domFC(h))[0], re(h), c && "." == c.charAt(0) && val(d, c.replace("..", "")), animate(d, {
                width: plusWidth
            }, 100, u)
        } else animate(s, {
            opacity: 0
        }, 100, u);
        else u(), setStyle(s, {
            opacity: 0
        }), animate(s, {
            opacity: 1
        }, 100)
    }, vk.counts = {}, window.handlePageParams = function(e) {
        vk.id = e.id, e.body_class !== bodyNode.className && (bodyNode.className = e.body_class || ""), updateSTL(), updateLeftMenu(), void 0 !== e.pvbig && (vk.pvbig = e.pvbig), void 0 !== e.pvdark && (vk.pvdark = e.pvdark), cur._level = e.level, vk.id && vk.id % 1e3 == 1 && setTimeout(function() {
            window.scrollmarked = {}, statlogsValueEvent("page_scroll", 0, cur.module, "0")
        }, 300), handlePageView(e);
        var t = ge("mvk_footer_lnk");
        if (t && (t.firstChild.href = e.mvklnk || "http://m.vk.com/"), vk.nophone = intval(e.nophone), vk.staticheader = intval(e.staticheader), vk.id) {
            var o = ge("left_blocks");
            o && (o.innerHTML = e.leftblocks || "")
        }
        "leftads" in e && 0 !== e.leftads && __adsSet(e.leftads, e.ads_section || "", e.ads_can_show, e.ads_showed);
        var n = locProtocol + "//" + location.host + "/";
        e.loc && (n += "?" == e.loc.charAt(0) ? nav.strLoc : e.loc);
        var i = document.URL == n ? "" : document.URL;
        if (setTimeout(updateOtherCounters.pbind(n, i), 10), e.counters) {
            var a = (e.counters || "").split(","),
                r = "",
                s = "";
            intval(a[9]) > 0 ? (r = "adsmarket", s = "act=overview&status=-1") : intval(a[9]) < -1 ? (a[9] = 1, r = "ads", s = "act=a_comeback_office_redirect") : r = "ads?act=office&last=1";
            var l = 0,
                d = ge("l_set"),
                c = d && d.nextSibling || !1,
                u = !1,
                h = ["fr", "ph", "vid", "msg", "nts", "gr", "vkp", "wsh", "ap", "ads", "ntf", "fav", "doc", "apm", "mk"],
                p = ["friends", "albums" + vk.id, "video", "", "notes", "groups", "events", "gifts.php?act=wishlist", "apps", r, "feed" + (ge("l_nwsf") ? "?section=notifications" : ""), "pages", "docs", "apps_manage", "market"],
                f = ["", "act=added", "section=tagged", "", "act=comments", "", "tab=invitations", "", "", s, ge("l_nwsf") ? "" : "section=notifications", "", "", "", "only_friends=1"];
            if (e.handlecnts) {
                for (; l < h.length; ++l) handlePageCount(h[l], a[l], p[l], f[l]);
                for (var w = c.nextSibling; w; w = w.nextSibling) {
                    if (w.tagName && "li" == w.tagName.toLowerCase() && isVisible(w)) {
                        u = !0;
                        break
                    }
                    if (hasClass(w, "more_div")) break
                }(u ? show : hide)(c);
                for (var _ = a.length; _ > l; ++l) {
                    var v = a[l].split(":"),
                        w = ge("l_app" + intval(v[0]));
                    w && handleSetCount(w, intval(v[1]))
                }
                setTimeout(updSeenAdsInfo, 0)
            } else
                for (; l < h.length; ++l) vk.counts[h[l]] = a[l]
        }
    }, window.handlePageCount = function(e, t, o, n) {
        var i = intval(t);
        if (void 0 === vk.counts && (vk.counts = {}), vk.counts[e] !== i) {
            if (vk.counts[e] = i, "ntf" == e) return void TopNotifier.setCount(i > 0 ? i : 0);
            var a, r = ge("l_" + e),
                s = hasClass(domFC(r), "left_nav_over");
            r && (handleSetCount(r, i > 0 ? i : 0, e), n && o && (a = i > 0 && n ? "?" + n : "", r.firstChild.href = "/" + o + a)), (i >= 0 || !s) && toggle(r, i >= 0)
        }
    }, window.processDestroy = function(e) {
        if (e._back && e._back.hide && e == cur)
            for (var t in e._back.hide) try {
                e._back.hide[t]()
            } catch (o) {
                try {
                    console.log(o.stack)
                } catch (n) {}
            }
        if (e.destroy && e.destroy.length)
            for (var t in e.destroy) try {
                e.destroy[t](e)
            } catch (o) {
                try {
                    console.log(o.stack)
                } catch (n) {}
            }
    }, window.globalHistory = [], window.globalHistoryDestroy = function(e) {
        for (var t = 0, o = globalHistory.length; o > t; ++t)
            if (globalHistory[t].loc == e) {
                var n = globalHistory.splice(t, 1)[0];
                processDestroy(n.cur), n.content.innerHTML = "", --t, --o
            }
    }, window.showBackLink = function(e, t, o) {
        var n = e;
        if (e = (e || "").replace(/^\//, ""), _tbLink.loc = e, void 0 === o && (o = 0, e))
            for (var i = 0, a = globalHistory.length; a > i; ++i)
                if (globalHistory[i].loc == e) {
                    o = 1;
                    break
                }
        if (n) {
            try {
                _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
            } catch (r) {}
            extend(_tbLink, {
                href: "/" + e,
                innerHTML: t,
                fast: o
            }), show(_tbLink), _stlWas = 0
        } else hide(_tbLink);
        updSideTopLink(1)
    }, window.reloadCheckFlood = function(e) {
        e = e || {};
        var t, o = ls.get("last_reloaded") || [],
            n = 1,
            i = 5;
        return o.unshift(vkNow()), (n = o.length) > i && (o.splice(i, n - i), n = i), ls.set("last_reloaded", o), t = n == i && o[0] - o[i - 1] < 2e4, t ? (topError('<b>Reloading error</b>, please check internet connection, <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.<br>If problem remains, please <a href="/support?act=new">report it here</a>.', {
            dt: 15,
            type: 6,
            msg: "Reload error, from " + (e.from || 0) + ", forced " + (e.force || 0) + ", url " + (e.url || "") + ", query " + (e.query || "")
        }), !0) : !1
    }, window.nav = {
        getData: function(e) {
            if (e.length) {
                for (var t in navMap)
                    if ("<" != t[0]) {
                        var o = e.match(new RegExp("^" + t, "i"));
                        if (o) return {
                            url: navMap[t][0],
                            files: navMap[t][1]
                        }
                    }
                var o = e.match(/^[a-z0-9\-_]+\.php$/i);
                return o ? {
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
            if (!reloadCheckFlood(e)) {
                e = e || {};
                var t = nav.strLoc.replace(/^\/+/g, "");
                e.force ? (hab.stop(), location.href = "/" + t) : (TopNotifier.invalidate(), nav.go("/" + t, void 0, extend({
                    nocur: !0
                }, e)))
            }
        },
        link: function(e, t) {
            if (checkEvent(t) || cur.noAjaxNav) {
                var e = e.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), "");
                window.open(e)
            } else nav.go(e)
        },
        go: function go(loc, ev, opts) {
            var newLink, postParams, postOptions;
            if (opts = opts || {}, loc && loc.href && loc.getAttribute && loc.getAttribute("data-change-location-with-post-away")) {
                newLink = loc.href, postParams = nav.getPostParams(loc, !(!opts.params || !opts.params._post_click_type)), postOptions = nav.mergePostParamsOptions(postParams, opts.params);
                var extraQuery = {};
                return postOptions._post && (extraQuery.post = postOptions._post, postOptions._post_ad_data && (extraQuery.post_ad_data = postOptions._post_ad_data), newLink = "/away.php?to=" + encodeURIComponent(newLink) + "&" + ajx2q(extraQuery)), location.href = newLink, !1
            }
            if (!checkEvent(ev) && !cur.noAjaxNav) {
                if (LongView.onBeforePageChange(), loc.tagName && "a" == loc.tagName.toLowerCase()) {
                    if ("_blank" == loc.target || nav.baseBlank) return;
                    var _params = loc.getAttribute("hrefparams");
                    if (_params && (opts.params = extend(opts.params || {}, q2ajx(_params))), loc = loc.href || "", ev && !(loc || "").match(new RegExp("^" + locProtocol + "//" + locHost, "i"))) return
                }
                var strLoc = "",
                    objLoc = {},
                    changed = {};
                "string" == typeof loc ? (loc = loc.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), ""), strLoc = loc, objLoc = nav.fromStr(loc)) : (loc[0] || (loc[0] = ""), strLoc = nav.toStr(loc), objLoc = loc), statDurationsLoadImage(), statNavigationTiming();
                var ap = getAudioPlayer();
                if (ap && ap.updateCurrentPlaying(), !opts.nocur) {
                    changed = clone(objLoc);
                    for (var i in nav.objLoc) nav.objLoc[i] == changed[i] ? delete changed[i] : void 0 === changed[i] && (changed[i] = !1);
                    if (zNav(clone(changed), {
                            hist: opts.hist,
                            asBox: opts.asBox,
                            onDone: opts.onDone
                        }, objLoc) === !1) return nav.setLoc(strLoc), !1;
                    var isHandled = articleNav(strLoc, nav.toStr(nav.objLoc), opts.back);
                    if (isHandled) return nav.setLoc(strLoc), (nav.objLoc.z || nav.objLoc.w) && zNav({
                        z: nav.objLoc.z,
                        w: nav.objLoc.w
                    }, {}), !1
                }
                if (!opts.nocur && (vk.loaded || !changed[0]))
                    for (var curnav = cur.nav || [], i = curnav.length - 1; i >= 0; i--) {
                        var oldUrl = document.URL;
                        if (curnav[i](clone(changed), nav.objLoc, objLoc, opts) === !1) {
                            var currentURL = locProtocol + "//" + location.host + "/" + strLoc,
                                referrer = oldUrl == currentURL ? "" : oldUrl;
                            return setTimeout(updateOtherCounters.pbind(currentURL, referrer), 10), !1
                        }
                    }
                if (4 == vk.al || !vk.loaded && (!window.audioPlayer || !audioPlayer.player) && changed[0]) return setTimeout(function() {
                    location.href = "/" + (strLoc || "").replace("%23", "#")
                }, 0), !1;
                if (_topHeaderClose(), opts.back) {
                    if (cur._back && cur._back.onBack) return cur._back.onBack();
                    for (var i = 0, l = globalHistory.length; l > i; ++i)
                        if (globalHistory[i].loc == strLoc) {
                            var h = globalHistory.splice(i, 1)[0],
                                wNode = ge("wrap3"),
                                tNode = ge("title"),
                                onback = cur._onback;
                            return window.tooltips && tooltips.destroyAll(), hide("audio_tip_wrap"), processDestroy(cur), radioBtns = h.radioBtns, ajaxCache = h.ajaxCache, PageID = h.pid, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), showBackLink(), cur = h.cur, setTimeout(function() {
                                if (wNode.innerHTML = "", wNode.parentNode.replaceChild(h.content, wNode), (vk.width != h.width || vk.width_dec_footer != h.width_dec_footer) && handlePageView(h), scrollToY(h.scrollTop, 0), document.title = h.htitle, tNode.innerHTML = h.title, h.bodyClass !== bodyNode.className && (bodyNode.className = h.bodyClass || "", vk.body_class = h.bodyClass || ""), setStyle(tNode.parentNode, "display", h.hideHeader ? "none" : "block"), cur._back.show)
                                    for (var e = 0, t = cur._back.show.length; t > e; ++e) cur._back.show[e]();
                                if (onback)
                                    for (var e = 0, t = onback.length; t > e; ++e) onback[e]();
                                nav.setLoc(strLoc);
                                var o = h.back || {};
                                setTimeout(function() {
                                    showBackLink(o[0], o[1], o[2]), (nav.objLoc.z || nav.objLoc.w) && zNav({
                                        z: nav.objLoc.z,
                                        w: nav.objLoc.w
                                    }, {}), updateSTL(), updateLeftMenu(), updateAriaElements(), TopSearch.clear()
                                }, 10), getAudioPlayer().updateCurrentPlaying()
                            }, 10), !1
                        }
                }
                var dest = objLoc[0];
                delete objLoc[0];
                var where = nav.getData(dest);
                opts.noframe || (opts.tstat = ajax.tGetParam(), ajax.tStart = (new Date).getTime(), opts.bench = !0), opts.params && opts.params._ref || (opts.params = extend(opts.params || {}, {
                    _ref: nav.objLoc[0] || ""
                })), where.files && stManager.add(where.files), where.params = extend({
                    __query: dest,
                    al_id: vk.id
                }, objLoc, opts.params || {});
                var postParamsEl = ev && ev.target && ev.target.getAttribute ? ev.target : loc && loc.getAttribute ? loc : null;
                postParams = nav.getPostParams(postParamsEl, !!where.params._post_click_type), where.params = nav.mergePostParamsOptions(postParams, where.params), opts.cl_id && (where.params.fr_click = cur.oid + "," + opts.cl_id + "," + cur.options.fr_click), opts.tstat && (where.params._tstat = opts.tstat), opts.permanent && (where.params._permanent = opts.permanent);
                var curNavVersion = ++NextPageID,
                    done = function done(title, html, js, params) {
                        if (curNavVersion === NextPageID) {
                            try {
                                params._id = params.id
                            } catch (e) {
                                return topError(e, {
                                    dt: 15,
                                    type: 6,
                                    msg: "Error: " + e.message + ", (params undefined?), title: " + title + ", html: " + html + ", js: " + js,
                                    url: where.url,
                                    query: ajx2q(where.params),
                                    answer: arguments.length
                                })
                            }
                            if (window.lastScrollTop = scrollGetY(), opts.bench && (ajax.tProcess = (new Date).getTime()), stVersions[jsc("web/common_web.js")] > StaticFiles[jsc("web/common_web.js")].v) {
                                if (nav.setLoc(params.loc || nav.strLoc), reloadCheckFlood({
                                        force: !0,
                                        from: 4
                                    })) return;
                                return void location.reload(!0)
                            }
                            var newPage = void 0 === where.params.al_id || where.params.al_id != params.id || params.fullPage,
                                _back = cur._back,
                                wNode = ge("wrap3"),
                                tNode = ge("title"),
                                hist = !1;
                            if ((strLoc == (cur._back || {}).loc || newPage || opts.back) && (_back = !1), (opts.noback || params.level && (!cur._level || params.level <= cur._level) && opts.noback !== !1) && (_back = !1, (opts.noback || cur._level && params.level < cur._level) && showBackLink()), window.tooltips && tooltips.destroyAll(), each(geByClass("page_actions_wrap"), function() {
                                    hide(this)
                                }), hide("audio_tip_wrap"), _back) {
                                if (revertLastInlineVideo(), hist = {
                                        loc: _back.loc || nav.strLoc,
                                        cur: cur,
                                        radioBtns: radioBtns,
                                        ajaxCache: ajaxCache,
                                        pid: PageID,
                                        scrollTop: scrollGetY(),
                                        htitle: document.title.toString(),
                                        width: vk.width,
                                        width_dec: vk.width_dec,
                                        width_dec_footer: vk.width_dec_footer,
                                        noleftmenu: vk.noleftmenu,
                                        notopmenu: vk.notopmenu,
                                        nobottommenu: vk.nobottommenu,
                                        bodyClass: vk.body_class,
                                        back: _tbLink.loc ? [_tbLink.loc, val(_tbLink), _tbLink.fast] : !1
                                    }, tNode && tNode.parentNode && !isVisible(tNode.parentNode) && (hist.hideHeader = !0), globalHistoryDestroy(hist.loc), globalHistory.length > 2) {
                                    var h = globalHistory.shift();
                                    processDestroy(h.cur), h.content.innerHTML = ""
                                }
                                if (cur._back.hide)
                                    for (var i = 0, l = cur._back.hide.length; l > i; ++i) cur._back.hide[i]();
                                _back.text && showBackLink(hist.loc, _back.text, 1)
                            } else _tbLink.fast = 0, processDestroy(cur);
                            if (PageID = NextPageID, each(radioBtns, function(e, t) {
                                    t.keep || delete radioBtns[e]
                                }), ajaxCache = {}, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), cur = {
                                    destroy: [],
                                    nav: []
                                }, _stlWas = 0, newPage) {
                                for (cleanElems("quick_login_button", "quick_expire", "search_form", "top_links", "bottom_nav"); globalHistory.length;) {
                                    var h = globalHistory.shift();
                                    processDestroy(h.cur), h.content.innerHTML = ""
                                }
                                var oldTopW = ge("dev_top_nav_wrap") && getSize("dev_top_nav_wrap")[0] || ge("page_header_wrap") && getSize("page_header_wrap")[0] || 0;
                                pageNode.innerHTML = html, oldTopW && !vk.staticheader && updateHeaderStyles({
                                    width: oldTopW
                                }), _tbLink = ge("top_back_link");
                                try {
                                    _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
                                } catch (e) {}
                                browser.mobile || onBodyResize(!0)
                            } else {
                                if (_back) {
                                    var newW = ce("div", {
                                        id: "wrap3"
                                    });
                                    extend(hist, {
                                        content: wNode.parentNode.replaceChild(newW, wNode),
                                        title: tNode.innerHTML
                                    }), globalHistory.push(hist), wNode = newW
                                }
                                var oldTopW = ge("dev_top_nav_wrap") && getSize("dev_top_nav_wrap")[0] || ge("page_header_wrap") && getSize("page_header_wrap")[0] || 0;
                                wNode.innerHTML = html, oldTopW && !vk.staticheader && updateHeaderStyles({
                                    width: oldTopW
                                }), tNode.innerHTML = title, (title ? show : hide)(tNode.parentNode), getAudioPlayer().updateCurrentPlaying()
                            }
                            checkPageBlocks(), updateSTL(), updateLeftMenu(), updateAriaElements(), TopSearch.clear(), window.LazyLoad && LazyLoad.scanDelayed(), handlePageParams(params), opts.preventScroll || (opts.scrollTop > 0 ? scrollToY(opts.scrollTop, 0) : opts.noscroll || params.noscroll || scrollToTop(0)), opts.bench && (ajax.tRender = (new Date).getTime()), nav.curLoc = params.loc, js && eval("(function(){" + js + ";})()"), ajax._framenext(), opts.onDone && opts.onDone(), browser.mobile && onBodyResize(), changed.f && handleScroll(changed.f), nav.setLoc(params.loc || ""), changed[0] && (window.vkLastNav = Date.now()), lTimeout(function() {
                                getAudioPlayer().updateCurrentPlaying(), TopMenu.toggle(!1)
                            }, browser.chrome ? 100 : 50)
                        }
                    };
                return window.Page && (Page.postsSave(), Page.postsSend(), Page.postsClearTimeouts()), updSeenAdsInfo(), __adsUpdate("already"), ("im" === nav.objLoc[0] || "im" === changed[0]) && (where.params = extend({}, where.params, {
                    _full_page: !0
                })), ajax.post(where.url, where.params, {
                    onDone: function() {
                        var e = arguments;
                        if (__debugMode) done.apply(null, e);
                        else try {
                            done.apply(null, e)
                        } catch (t) {
                            topError(t, {
                                dt: 15,
                                type: 6,
                                url: where.url,
                                query: ajx2q(where.params),
                                js: e[2],
                                answer: Array.prototype.slice.call(arguments).join("<!>")
                            })
                        }
                    },
                    onFail: opts.onFail || function(e) {
                        return e ? (setTimeout(showFastBox({
                            title: getLang("global_error")
                        }, e).hide, __debugMode ? 3e4 : 3e3), !0) : void 0
                    },
                    frame: opts.noframe ? 0 : 1,
                    canReload: !0,
                    showProgress: opts.showProgress || showTitleProgress,
                    hideProgress: opts.hideProgress || hideTitleProgress,
                    cache: opts.search ? 1 : "",
                    bench: opts.bench
                }), !1
            }
        },
        setLoc: function(e) {
            "string" == typeof e ? (nav.strLoc = e, nav.objLoc = nav.fromStr(e)) : (nav.strLoc = nav.toStr(e), nav.objLoc = e), hab.setLoc(nav.strLoc)
        },
        change: function(e, t, o) {
            var n = clone(nav.objLoc);
            return each(e, function(e, t) {
                t === !1 ? delete n[e] : n[e] = t
            }), nav.go(n, t, o)
        },
        fromStr: function(e) {
            e = e.split("#");
            var t = e[0].split("?"),
                o = {
                    0: t[0] || ""
                };
            return e[1] && (o["#"] = e[1]), extend(q2ajx(t[1] || ""), o)
        },
        toStr: function(e) {
            e = clone(e);
            var t = e["#"] || "",
                o = e[0] || "";
            delete e[0], delete e["#"];
            var n = ajx2q(e);
            return (n ? o + "?" + n : o) + (t ? "#" + t : "")
        },
        init: function() {
            nav.strLoc = hab.getLoc(), nav.objLoc = nav.fromStr(nav.strLoc)
        },
        getPostParams: function(e, t) {
            var o = !(!e || !e.getAttribute),
                n = {};
            if (!o) return n;
            var i = o && e.getAttribute("data-post-id");
            i && (n.post_id = i);
            var a = e.getAttribute("data-parent-post-id");
            a && (n.parent_post_id = a);
            var r = o && e.getAttribute("data-post-click-type");
            r && (n.post_click_type = r);
            var s = !!r || t;
            if (s) {
                var l = gpeByClass("_ads_promoted_post_data_w", e),
                    d = l && l.getAttribute("data-ad"),
                    c = l && l.getAttribute("data-ad-block-uid");
                d && (n.ad_data = d), c && (n.ad_block_unique_id = c)
            }
            return n
        },
        mergePostParamsOptions: function(e, t) {
            function o(e, o, n) {
                var i = n && t[o];
                return !e || i ? !1 : (t[o] = e, !0)
            }
            return t = t || {}, e ? (o(e.post_id, "_post", !0), o(e.parent_post_id, "_parent_post", !0), o(e.post_click_type, "_post_click_type", !0), t._post_click_type && o(e.ad_data, "_post_ad_data", !0) && o(e.ad_block_unique_id, "_post_ad_block_unique_id"), t) : t
        }
    }, nav.init(), vk.time && !browser.opera_mobile && setTimeout(function() {
        var e = new Date,
            t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
        1 == t[1] && 12 == vk.time[1] ? vk.time[1] = 0 : 12 == t[1] && 1 == vk.time[1] ? t[1] = 0 : (t[1] > vk.time[1] + 1 || vk.time[1] > t[1] + 1) && (t[1] = vk.time[1] = t[2] = vk.time[2] = 0), t[1] > vk.time[1] && 1 == t[2] ? 31 == vk.time[2] || (4 == vk.time[1] || 6 == vk.time[1] || 9 == vk.time[1] || 11 == vk.time[1]) && 30 == vk.time[2] || 2 == vk.time[1] && (29 == vk.time[2] || 28 == vk.time[2] && vk.time[0] % 4) ? vk.time[2] = 0 : vk.time[2] = t[2] = 0 : vk.time[1] > t[1] && 1 == vk.time[2] && (31 == t[2] || (4 == t[1] || 6 == t[1] || 9 == t[1] || 11 == t[1]) && 30 == t[2] || 2 == t[1] && (29 == t[2] || 28 == t[2] && vk.time[0] % 4) ? t[2] = 0 : t[2] = vk.time[2] = 0), (t[2] > vk.time[2] + 1 || vk.time[2] > t[2] + 1) && (t[2] = vk.time[2] = 0);
        var o = 60 * (60 * (24 * (t[2] - vk.time[2]) + (t[3] - vk.time[3])) + (t[4] - vk.time[4])); - 55800 > o ? o += 86400 : o > 37800 && (o -= 86400);
        var n = 0,
            i = Math.abs(o),
            a = [-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13];
        for (var r in a) {
            var s = Math.round(3600 * (a[r] - 3)),
                l = Math.abs(o - s);
            i > l && (i = l, n = s)
        }
        vk.dt = n, getCookie("remixdt") != vk.dt && setCookie("remixdt", vk.dt, 365);
        var d = intval(getCookie("remixrt"));
        window.devicePixelRatio >= 2 && (!browser.iphone || getCookie("remixme")) ? 1 & d || (setCookie("remixrt", 1 | d, 365), window._retinaInit = function() {
            stManager.add(["retina.css"]), addClass(document.body, "is_2x")
        }, window._initedCheck && window._retinaInit()) : 1 & d && setCookie("remixrt", 1 ^ d, 365)
    }, 0), window.dispatchIntro = function(e, t) {
        "undefined" != typeof dispatchIntroEvent && dispatchIntroEvent(e, t)
    }, window.__phCheck = function(e, t, o, n) {
        t = t || {};
        var i = e.phshown,
            a = e.phcont,
            r = t.back,
            s = t.editable,
            l = t.phColor || "#8C8E91",
            d = t.activeColor || "#C0C8D0",
            c = t.hideBackAfter,
            u = t.timeout || 0 === t.timeout ? t.timeout : 100,
            h = t.period || 200;
        if (s) var p = (void 0 !== e.textContent ? e.textContent : e.innerText) || geByTag("img", e).length;
        else var p = e.value;
        if (i && (r && p || !r && (o && !o.type || p)) ? (hide(a), e.phshown = !1) : i || p || !r && !n || (show(a), e.phshown = !0, browser.opera && n && (e.setAttribute("placeholder", ""), e.removeAttribute("placeholder", ""))), r && !p) {
            if (o && !o.type) {
                var f = c ? hide.pbind(a.firstChild.firstChild) : null;
                clearTimeout(e.phanim), e.phanim = setTimeout(function() {
                    animate(a.firstChild.firstChild, {
                        color: d
                    }, h, f)
                }, u)
            }
            n && (clearTimeout(e.phanim), c && show(a.firstChild.firstChild), e.phanim = setTimeout(function() {
                animate(a.firstChild.firstChild, {
                    color: l
                }, h)
            }, u))
        }
    }, window.placeholderSetup = function(e, t) {
        var o, n = ge(e),
            i = !1,
            a = t ? clone(t) : {};
        if (n && (!n.phevents || a.reload) && (o = n.getAttribute ? n.getAttribute("placeholder") : n.placeholder)) {
            n.removeAttribute("placeholder");
            var r = {},
                s = ["Top", "Bottom", "Left", "Right"];
            if (a.pad) r = a.pad;
            else {
                if (a.fast) {
                    for (var l = 0; 4 > l; ++l) r["padding" + s[l]] = 3, r["margin" + s[l]] = 0, r["border" + s[l] + "Width"] = 1;
                    extend(r, a.styles || {})
                } else {
                    for (var d = [], l = 0; 4 > l; ++l) d.push("margin" + s[l]), d.push("padding" + s[l]), d.push("border" + s[l] + "Width");
                    r = getStyle(n, d)
                }
                for (var l = 0; 4 > l; ++l) {
                    var c = "margin" + s[l],
                        u = "border" + s[l] + "Width";
                    r[c] = intval(r[c]) + intval(r[u]) + "px", delete r[u]
                }
            }
            if (a.reload) {
                var h = n.previousSibling;
                h && hasClass(h, "input_back_wrap") && re(h)
            }
            var p = n.phcont = n.parentNode.insertBefore(ce("div", {
                    className: "input_back_wrap no_select",
                    innerHTML: '<div class="input_back"><div class="input_back_content' + (a.big ? " big" : "") + '" style="width: ' + (getSize(n)[0] - 20) + 'px;">' + o + "</div></div>"
                }), n),
                f = domFC(p);
            domFC(f), setStyle(f, r);
            var w = __phCheck.pbind(n, a),
                _ = browser.mobile ? w : function(e, t) {
                    setTimeout(w.pbind(e, t), 0)
                };
            browser.msie && browser.version < 8 && setStyle(f, {
                marginTop: 1
            }), n.phonfocus = function(e) {
                i || (n.focused = !0, cur.__focused = n, e === !0 && (setStyle(n, {
                    backgroundColor: "#FFF"
                }), hide(f)), _(!0, !1))
            }, n.phonblur = function() {
                i || (cur.__focused = n.focused = !1, show(f), _(!1, !0))
            }, n.phshown = !0, n.phanim = null, (n.value || a.editable && ((void 0 !== n.textContent ? n.textContent : n.innerText) || geByTag("img", n).length)) && (n.phshown = !1, hide(p)), browser.opera_mobile || (addEvent(p, "focus click", function(e) {
                i || (a.editableFocus ? (setTimeout(a.editableFocus.pbind(n), 0), n.phonfocus()) : (n.blur(), n.focus()))
            }), addEvent(n, "focus" + (a.editable ? " click" : ""), n.phonfocus), addEvent(n, "keydown paste cut input", _)), addEvent(n, "blur", n.phonblur), n.check = _, n.getValue = function() {
                return a.editable ? n.innerHTML : n.value
            }, n.setPlaceholder = function(e) {
                geByClass1("input_back_content", p).textContent = e
            }, n.setDisabled = function(e) {
                i = e
            }, n.setValue = function(e) {
                a.editable ? n.innerHTML = e : n.value = e, __phCheck(n, a)
            }, n.phevents = !0, n.phonsize = function() {}, a.global || a.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function(e) {
                for (var t = 0, o = e.length; o > t; ++t) removeData(e[t])
            }.pbind(cur.__phinputs))), cur.__phinputs.push(n))
        }
    }, window.isInputActive = function() {
        return document.activeElement && (attr(document.activeElement, "contenteditable") || "INPUT" === document.activeElement.tagName || "textarea" === document.activeElement.tagName)
    }, window.placeholderInit = function(e, t) {
        function o(e, t, o, n) {
            t = t || {};
            var i = e.phshown,
                a = e.phcont,
                r = t.editable;
            if (r) {
                var s = void 0 !== e.textContent ? e.textContent : e.innerText;
                s && browser.opera && s.match(/^[ ]+$/) && (s = ""), s || (s = geByTag("img", e).length > 0), s || (s = geByTag("br", e).length > 1), s || (s = geByTag("p", e).length > 1)
            } else var s = e.value;
            if (i && s) hide(a), e.phshown = !1;
            else if (!i && !s) {
                var l = function() {
                    show(a), e.phshown = !0, browser.opera && n && (e.setAttribute("placeholder", ""), e.removeAttribute("placeholder", ""))
                };
                browser.msie ? setTimeout(l, 0) : l()
            }
        }
        var n, i = ge(e),
            a = t ? clone(t) : {},
            r = "undefined" == typeof ce("input").placeholder || i && i.getAttribute && i.getAttribute("contenteditable");
        if (i && (!i.phevents || a.reload) && (n = i.getAttribute ? i.getAttribute("placeholder") : i.placeholder) && (i.getValue = function() {
                return a.editable ? i.innerHTML : i.value
            }, i.setValue = function(e) {
                a.editable ? i.innerHTML = e : i.value = e, r && o(i, a)
            }, i.phonfocus = function() {}, i.phonblur = function() {}, r)) {
            if (i.removeAttribute("placeholder"), a.reload) {
                var s = domNS(i);
                s && hasClass(s, "placeholder") && re(s)
            }
            var l = i.phcont = domInsertAfter(ce("div", {
                    className: "placeholder",
                    innerHTML: '<div class="ph_input"><div class="ph_content">' + n + "</div></div>"
                }), i),
                d = domFC(l),
                c = (domFC(d), o.pbind(i, a)),
                u = browser.mobile ? c : function(e, t) {
                    setTimeout(c.pbind(e, t), 0)
                };
            i.phonfocus = function(e) {
                i.focused = !0, cur.__focused = i, u(!0, !1)
            }, i.phonblur = function() {
                cur.__focused = i.focused = !1, u(!1, !0)
            }, i.phshown = !0, (i.value || a.editable && ((void 0 !== i.textContent ? i.textContent : i.innerText) || geByTag("img", i).length)) && (i.phshown = !1, hide(l)), browser.opera_mobile || (addEvent(l, "focus click contextmenu", function(e) {
                a.editableFocus ? (setTimeout(a.editableFocus.pbind(i), 0), "contextmenu" === e.type && browser.msie && a.editableFocus(i), i.phonfocus()) : (i.blur(), i.focus())
            }), addEvent(i, "focus" + (a.editable ? " click" : ""), i.phonfocus), addEvent(i, "keydown paste cut input", u)), addEvent(i, "blur", i.phonblur), i.check = u, i.phevents = !0, i.phonsize = function() {}, a.global || a.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function() {
                if (cur.__phinputs)
                    for (var e = 0, t = cur.__phinputs.length; t > e; ++e) removeData(cur.__phinputs[e])
            })), cur.__phinputs.push(i))
        }
    }, window._message_box_guid = 0, window._message_boxes = [], window._show_flash_timeout = 0, window.__bq = window.boxQueue = {
        hideAll: function(e, t) {
            if (e)
                for (; __bq.count();) __bq.hideLast();
            else {
                if (__bq.count()) {
                    var o = _message_boxes[__bq._boxes.pop()];
                    o._in_queue = !1, o._hide(!1, !1, t)
                }
                for (; __bq.count();) {
                    var o = _message_boxes[__bq._boxes.pop()];
                    o._in_queue = !1
                }
            }
        },
        hideLast: function(e, t) {
            if (__bq.count()) {
                var o = _message_boxes[__bq._boxes[__bq.count() - 1]];
                if (e === !0 && (o.changed || __bq.skip || t && t.target && t.target.tagName && "input" != t.target.tagName.toLowerCase() && cur.__mdEvent && t.target != cur.__mdEvent.target)) return void(__bq.skip = !1);
                o.hide()
            }
            return t && "click" == t.type ? cancelEvent(t) : void 0
        },
        hideBGClick: function(e) {
            e && e.target && /^box_layer/.test(e.target.id) && __bq.hideLast()
        },
        count: function() {
            return __bq._boxes.length
        },
        _show: function(e) {
            var t = _message_boxes[e];
            if (t && !t._in_queue) {
                __bq.count() ? _message_boxes[__bq._boxes[__bq.count() - 1]]._hide(!0, !0) : window.tooltips && tooltips.hideAll(), t._in_queue = !0;
                var o = __bq.count() ? !0 : !1;
                __bq.curBox = e, t._show(o || __bq.currHiding, o), __bq._boxes.push(e)
            }
        },
        _hide: function(e) {
            var t = _message_boxes[e];
            if (t && t._in_queue && __bq._boxes[__bq.count() - 1] == e && t.isVisible() && (t._in_queue = !1, __bq._boxes.pop(), t._hide(__bq.count() ? !0 : !1), __bq.count())) {
                var o = __bq._boxes[__bq.count() - 1];
                __bq.curBox = o, _message_boxes[o]._show(!0, !0, !0)
            }
        },
        _boxes: [],
        curBox: 0
    }, __bq.hideLastCheck = __bq.hideLast.pbind(!0), window.curBox = function() {
        var e = _message_boxes[__bq.curBox];
        return e && e.isVisible() ? e : null
    }, browser.mobile || vk.host.match(/snapster\.io/) || addEvent(document, "keydown", function(e) {
        if (_wf = 1, e.keyCode == KEY.ESC && __bq.count() && !cur._noEscHide) return __bq.hideLast(), -1;
        if (e.keyCode == KEY.ESC && cur.articleLayer) return cur.articleLayer.close(!0), cancelEvent(event);
        if (e.keyCode == KEY.ESC) return cancelStackPop(), cancelEvent(e);
        var t = [176, 177, 178, 179],
            o = !1;
        window.audioPlayer && (t.push(KEY.LEFT), t.push(KEY.RIGHT)), each(t, function(t, n) {
            return e.keyCode == n ? (o = !0, !1) : void 0
        }), o && getAudioPlayer().onMediaKeyPressedEvent(e), Chat.inited && 191 == e.keyCode && (e.ctrlKey || e.metaKey && browser.mac) && Chat.showFriends()
    }), window.boxRefreshCoords = function(e) {
        var t = window.innerHeight || document.documentElement.clientHeight || boxLayerBG.offsetHeight,
            o = browser.mobile ? intval(window.pageYOffset) : 0,
            n = getSize(e);
        e.style.marginTop = Math.max(10, o + (t - n[1]) / 3) + "px"
    }, window.MessageBox = function(options, dark) {
        function refreshBox() {
            boxTitleBck || (options.title ? (boxTitle.innerHTML = options.title, removeClass(boxBody, "box_no_title"), show(boxTitleWrap)) : (addClass(boxBody, "box_no_title"), hide(boxTitleWrap))), options.titleControls && (boxTitleControls.innerHTML = options.titleControls), toggleClass(boxBody, "box_no_buttons", options.hideButtons), toggleClass(boxTitleWrap, "box_grey", options.grey), boxContainer.style.width = "string" == typeof options.width ? options.width : options.width + "px", boxContainer.style.height = "string" == typeof options.height ? options.height : options.height + "px"
        }

        function _addButton(e, t, o, n) {
            ++buttonsCount;
            var o, i = "flat_button";
            "no" == o || "gray" == o ? (i += " secondary", o = "cancel") : o = "ok";
            var a = function() {
                    emitter.emit(o, retBox), t.apply(null, arguments)
                },
                r = ce("button", {
                    className: i,
                    innerHTML: e,
                    id: n
                }),
                s = boxButtons.rows[0],
                l = s.insertCell(0);
            return l.appendChild(r), createButton(r, a), btns[o].push(r), r
        }

        function setControlsText(e) {
            boxControlsText.innerHTML = e
        }

        function _removeButtons() {
            for (var e = boxButtons.rows[0]; e.cells.length;) cleanElems(e.cells[0]), e.deleteCell(0);
            btns.ok.length = btns.cancel.length = 0
        }

        function showMe(e, t, o) {
            if (!visible && _message_boxes[guid]) {
                visible = !0;
                var n = e === !0 || t ? 0 : options.animSpeed;
                if (options.hideOnBGClick && addEvent(document, "click", __bq.hideBGClick), t || layers.boxshow(), __bq.currHiding) {
                    __bq.currHiding.shOther = !0;
                    var i = __bq.currHiding.bodyNode.parentNode.parentNode;
                    data(i, "tween").stop(!0)
                }
                n > 0 ? fadeIn(boxContainer, n) : show(boxContainer), boxRefreshCoords(boxContainer), options.onShow && options.onShow(o)
            }
        }
        var defaults = {
            title: !1,
            titleControls: "",
            width: 450,
            height: "auto",
            animSpeed: 0,
            bodyStyle: "",
            grey: !1,
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
        };
        options = extend(defaults, options);
        var buttonsCount = 0,
            boxContainer, boxBG, boxLayout, boxTitleWrap, boxTitle, boxTitleControls, boxCloseButton, boxBody, boxControlsWrap, boxControls, boxButtons, boxProgress, boxControlsText, guid = _message_box_guid++,
            visible = !1,
            btns = {
                ok: [],
                cancel: []
            },
            boxTitleBck;
        options.progress || (options.progress = "box_progress" + guid);
        var controlsStyle = options.hideButtons ? ' style="display: none"' : "";
        boxContainer = ce("div", {
            className: "popup_box_container" + (options.containerClass ? " " + options.containerClass : ""),
            innerHTML: '  <div class="box_layout" onclick="__bq.skip=true;">  <div class="box_title_wrap"><div class="box_x_button" aria-label="' + getLang("global_close") + '" tabindex="0" role="button"></div><div class="box_title_controls"></div><div class="box_title"></div></div>  <div class="box_body" style="' + options.bodyStyle + '"></div>  <div class="box_controls_wrap"' + controlsStyle + '><div class="box_controls">  <table cellspacing="0" cellpadding="0" class="fl_r"><tr></tr></table>  <div class="progress" id="' + options.progress + '"></div>  <div class="box_controls_text _box_controls_text">' + (options.textControls || "") + "</div>  </div></div>  </div>"
        }, {
            display: "none"
        }), hide(boxContainer), boxLayout = domFC(boxContainer), boxTitleWrap = domFC(boxLayout), boxCloseButton = domFC(boxTitleWrap), boxTitle = domLC(boxTitleWrap), boxTitleControls = domNS(boxCloseButton), options.noCloseButton && hide(boxCloseButton), boxBody = domNS(boxTitleWrap), boxControlsWrap = domNS(boxBody), boxControls = domFC(boxControlsWrap), boxButtons = domFC(boxControls), boxProgress = domNS(boxButtons), boxControlsText = domNS(boxProgress), boxLayer.appendChild(boxContainer), boxContainer.setAttribute("tabindex", 0), boxContainer.focus(), refreshBox(), boxRefreshCoords(boxContainer);
        var emitter = new EventEmitter,
            destroyMe = function() {
                isFunction(options.onClean) && options.onClean(), isFunction(options.onDestroy) && options.onDestroy(), _removeButtons(), cleanElems(boxContainer, boxCloseButton, boxTitleWrap, boxControlsWrap), boxLayer.removeChild(boxContainer), delete _message_boxes[guid]
            },
            hideMe = function(e, t, o) {
                if (visible) {
                    visible = !1;
                    var n = e === !0 ? 0 : options.animSpeed;
                    options.hideOnBGClick && removeEvent(document, "click", __bq.hideBGClick), isFunction(options.onBeforeHide) && options.onBeforeHide(), _layerAnim && !e && layers.boxhide();
                    var i = function() {
                        __bq.currHiding == _message_boxes[guid] && (__bq.currHiding = !1), _layerAnim || _message_boxes[guid].shOther || e || layers.boxhide(), !t && options.selfDestruct ? destroyMe() : hide(boxContainer), isFunction(options.onHide) && options.onHide(o)
                    };
                    n > 0 ? (__bq.currHiding = _message_boxes[guid], fadeOut(boxContainer, n, i)) : i()
                }
            };
        addEvent(boxCloseButton, "click", __bq.hideLast);
        var retBox = _message_boxes[guid] = {
            guid: guid,
            _show: showMe,
            _hide: hideMe,
            bodyNode: boxBody,
            controlsTextNode: boxControlsText,
            titleWrap: boxTitleWrap,
            btns: btns,
            show: function() {
                return __bq._show(guid), this
            },
            progress: boxProgress,
            showCloseProgress: addClass.pbind(boxTitleWrap, "box_loading"),
            hideCloseProgress: removeClass.pbind(boxTitleWrap, "box_loading"),
            showProgress: function() {
                hide(boxControlsText), show(boxProgress)
            },
            hideProgress: function() {
                hide(boxProgress), show(boxControlsText)
            },
            hide: function(e) {
                return isFunction(options.onHideAttempt) && !options.onHideAttempt(e) ? !1 : (__bq._hide(guid), !0)
            },
            isVisible: function() {
                return visible
            },
            bodyHeight: function() {
                return getStyle(boxBody, "height")
            },
            content: function(e) {
                return options.onClean && options.onClean(), boxBody.innerHTML = e, boxRefreshCoords(boxContainer), boxContainer.focus(), refreshBox(), updateAriaElements(), this
            },
            emit: function(e, t) {
                emitter.emit(e, t)
            },
            addButton: function(e, t, o, n, i) {
                var a = _addButton(e, t ? t : this.hide, o, i);
                return n ? a : this
            },
            setButtons: function(e, t, o, n) {
                var i = this.removeButtons();
                return e ? (i.addButton(e, t), o && i.addButton(o, n, "no"), i) : i.addButton(getLang("box_close"))
            },
            setControlsText: setControlsText,
            removeButtons: function() {
                return _removeButtons(), this
            },
            setBackTitle: function(e) {
                e ? (boxTitle.innerHTML = '<div class="back">' + getLang("global_box_title_back") + "</div>", geByClass1("back", boxTitle).onclick = e, boxTitleBck = options.title, options.title = boxTitle.innerHTML) : boxTitleBck && (boxTitle.innerHTML = options.title = boxTitleBck, boxTitleBck = !1)
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
            setOptions: function(e) {
                if (options.hideOnBGClick && removeEvent(document, "click", __bq.hideBGClick), options = extend(options, e), "bodyStyle" in e)
                    for (var t = options.bodyStyle.split(";"), o = 0, n = t.length; n > o; ++o) {
                        var i = t[o].split(":");
                        i.length > 1 && i[0].length && (boxBody.style[trim(i[0])] = trim(i[1]), boxBody.style.setProperty && boxBody.style.setProperty(trim(i[0]), trim(i[1]), ""))
                    }
                return options.hideOnBGClick && addEvent(document, "click", __bq.hideBGClick), toggle(boxControlsWrap, !options.hideButtons), refreshBox(), options.noRefreshCoords || boxRefreshCoords(boxContainer), this
            },
            evalBox: function evalBox(js, url, params) {
                var scr = "((function() { return function() { var box = this; " + (js || "") + ";}; })())";
                if (__debugMode) {
                    var fn = eval(scr);
                    fn.apply(this, [url, params])
                } else try {
                    var fn = eval(scr);
                    fn.apply(this, [url, params])
                } catch (e) {
                    topError(e, {
                        dt: 15,
                        type: 7,
                        url: url,
                        query: params ? ajx2q(params) : void 0,
                        js: js
                    })
                }
            }
        };
        return retBox
    }, window.showBox = function(e, t, o, n) {
        if (checkEvent(n)) return !1;
        var i = o || {},
            a = i.params || {};
        i.containerClass && (a.containerClass = i.containerClass);
        var r = new MessageBox(a),
            s = {
                onDone: function(o, n, s, l) {
                    function d() {
                        show(boxLayerBG), addClass(bodyNode, "layers_shown"), r.setOptions({
                            title: o,
                            hideButtons: a.hideButtons || !1
                        }), i.showProgress ? r.show() : show(r.bodyNode), r.content(n), r.evalBox(s, e, t), i.onDone && i.onDone(r, l)
                    }
                    if (i.preOnDone && i.onDone && i.onDone(r), !r.isVisible()) return void(i.onDone && i.onDone(r, l));
                    if (__debugMode) d();
                    else try {
                        d()
                    } catch (c) {
                        topError(c, {
                            dt: 15,
                            type: 103,
                            url: e,
                            query: ajx2q(t),
                            answer: Array.prototype.slice.call(arguments).join("<!>")
                        }), r.isVisible() && r.hide()
                    }
                },
                onFail: function(e) {
                    return r.failed = !0, setTimeout(r.hide, 0), isFunction(i.onFail) ? i.onFail(e) : void 0
                },
                cache: i.cache,
                stat: i.stat,
                fromBox: !0
            };
        return i.prgEl && (i.showProgress = showGlobalPrg.pbind(i.prgEl, {
            cls: i.prgClass,
            w: i.prgW,
            h: i.prgH,
            hide: !0
        }), i.hideProgress = hide.pbind("global_prg")), i.showProgress ? extend(s, {
            showProgress: i.showProgress,
            hideProgress: i.hideProgress
        }) : (r.setOptions({
            title: !1,
            hideButtons: !0
        }).show(), __bq.count() < 2 && (hide(boxLayerBG), removeClass(bodyNode, "layers_shown")), hide(r.bodyNode), s.showProgress = function() {
            show(boxLoader), boxRefreshCoords(boxLoader)
        }, s.hideProgress = hide.pbind(boxLoader)), r.removeButtons().addButton(getLang("global_close")), ajax.post(e, t, s), r
    }, window.showTabbedBox = function(e, t, o, n) {
        return o = o || {}, o.stat = o.stat || [], o.stat.push("box.js", "boxes.css"), showBox(e, t, o, n)
    }, window.showFastBox = function(e, t, o, n, i, a) {
        return new MessageBox("string" == typeof e ? {
            title: e
        } : e).content(t).setButtons(o, n, i, a).show()
    }, window.showCaptchaBox = function(e, t, o, n) {
        var i = function(t) {
                if (!t || void 0 === t.keyCode || 10 == t.keyCode || 13 == t.keyCode) {
                    var i = geByTag1("input", o.bodyNode);
                    if (!trim(i.value) && t !== !0) return void elfocus(i);
                    var a = geByTag1("img", o.bodyNode),
                        r = a[0];
                    a[1], removeEvent(i), removeEvent(r), show(geByClass1("progress", o.bodyNode)), hide(i), n.onSubmit(e, i.value)
                }
            },
            a = o ? !0 : !1,
            r = intval(t) ? "" : "&s=1",
            s = n.imgSrc || "/captcha.php?sid=" + e + r;
        if (!a) {
            var l = '  <div class="captcha">    <div><img src="' + s + '"/></div>    <div><input type="text" class="big_text" maxlength="7" placeholder="' + getLang("global_captcha_input_here") + '" /><div class="progress" /></div></div>  </div>' + (n.addText || "");
            o = showFastBox({
                title: getLang("captcha_enter_code"),
                width: 305,
                onHide: n.onHide,
                onDestroy: n.onDestroy || !1
            }, l, getLang("captcha_send"), function() {
                o.submit()
            }, getLang("captcha_cancel"), function() {
                var e = geByTag1("input", o.bodyNode),
                    t = geByTag1("img", o.bodyNode);
                removeEvent(e), removeEvent(t), o.hide()
            })
        }
        o.submit = i.pbind(!0), o.changed = !0;
        var d = geByTag1("input", o.bodyNode),
            c = geByTag1("img", o.bodyNode);
        return a && (d.value = "", c.src = "/captcha.php?sid=" + e + r, hide(geByClass1("progress", o.bodyNode))), show(d), addEvent(d, "keypress", i), addEvent(c, "click", function() {
            this.src = "/captcha.php?sid=" + e + r + "&v=" + irand(1e6, 2e6)
        }), elfocus(d), o
    }, window.showReCaptchaBox = function(e, t, o, n) {
        window.recaptchaResponse = function(e) {
            n.onSubmit(e)
        };
        var i = o ? !0 : !1,
            a = !!window.grecaptcha;
        if (!i) {
            a || (window.recaptchaCallback = function() {
                var t = curBox();
                if (t) {
                    var o = geByClass1("recaptcha", t.bodyNode);
                    o && (val(o, ""), grecaptcha.render(o, {
                        sitekey: e,
                        callback: recaptchaResponse
                    }))
                }
            }, headNode.appendChild(ce("script", {
                type: "text/javascript",
                src: "https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit&hl=" + t
            })));
            var r = '  <div class="recaptcha"></div>' + (n.addText || "");
            o = showFastBox({
                title: getLang("global_recaptcha_title"),
                width: 354,
                onHide: n.onHide,
                onDestroy: n.onDestroy || !1
            }, r, getLang("captcha_cancel"));
            var s = geByClass1("recaptcha", o.bodyNode);
            s.id = "recaptcha" + (o.guid ? o.guid : "0"), showProgress(s)
        }
        return i && a ? grecaptcha.reset() : a && recaptchaCallback(), o.changed = !0, o
    }, window.checkTextLength = function(e, t, o, n, i, a, r) {
        var s = t.getValue ? t.getValue() : t.value,
            l = t.lastLen || 0;
        if (t.lastLen !== s.length || a) {
            t.lastLen = s.length;
            var d = {
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
                c = {
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
                u = {
                    1037: 1,
                    1104: 1,
                    1117: 1
                };
            i && (d[","] = 5);
            var h = function(e, t) {
                    for (var o = 0, n = 0, i = e.length; i > n; n++) {
                        var a = d[e.charAt(n)],
                            s = e.charCodeAt(n);
                        o += void 0 !== a ? a : !r && s >= 128 && (1025 > s || u[s] || s > 1119) && !c[s] && (8220 > s || s > 8222) && (8224 > s || s > 8226) ? ("&#" + s + ";").length : 1
                    }
                    return o
                },
                p = function(e, t) {
                    for (var o = 0, n = "", i = 0, a = e.length; a > i; i++) {
                        var s = e.charAt(i),
                            l = d[s],
                            h = e.charCodeAt(i);
                        if (o += void 0 !== l ? l : !r && h >= 128 && (1025 > h || u[h] || h > 1119) && !c[h] && (8220 > h || h > 8222) && (8224 > h || h > 8226) ? ("&#" + h + ";").length : 1, o > t) break;
                        n += s
                    }
                    return n
                },
                f = h(s, n);
            if (o = ge(o), f > Math.max(e - 100, .75 * e))
                if (show(o), f > e)
                    if (i) {
                        var w = val(t, p(s, Math.min(e, l)));
                        t.lastLen = w.length, o.innerHTML = getLang("text_N_symbols_remain", 0)
                    } else o.innerHTML = getLang("text_exceeds_symbol_limit", f - e);
            else o.innerHTML = getLang("text_N_symbols_remain", e - f);
            else hide(o)
        }
    }, window.autosizeSetup = function(e, t) {
        if (e = ge(e)) {
            if (e.autosize) return void e.autosize.update();
            t.minHeight = intval(t.minHeight) || intval(getStyle(e, "height")), t.maxHeight = intval(t.maxHeight);
            var o, n = getSize(e)[0] || intval(getStyle(e, "width")),
                i = getStyle(e, "fontSize");
            1 > n && (n = intval(getStyle(e, "width", !1))), i.indexOf("em") > 0 && (i = floatval(i) * vk.fs), i = intval(i);
            var a = {
                    width: n,
                    height: 10,
                    fontFamily: getStyle(e, "fontFamily"),
                    fontSize: i + "px",
                    lineHeight: o = getStyle(e, "lineHeight"),
                    boxSizing: getStyle(e, "boxSizing")
                },
                r = ["Top", "Bottom", "Left", "Right"];
            each(r, function() {
                a["padding" + this] = t.ignorePadding ? "0" : getStyle(e, "padding" + this)
            }), e.autosize = {
                options: t,
                helper: ce("textarea", {
                    className: "ashelper"
                }, a),
                handleEvent: function(t, o) {
                    var n = o.charCode ? String.fromCharCode(o.charCode) : o.charCode;
                    if (void 0 === n && (n = String.fromCharCode(o.keyCode), 10 == o.keyCode || 13 == o.keyCode ? n = "\n" : !browser.msie && o.keyCode <= 40 && (n = "")), !n) return t;
                    if (!browser.msie) return t.substr(0, e.selectionStart) + n + t.substr(e.selectionEnd);
                    var i = document.selection.createRange();
                    return i.text && (t = t.replace(i.text, "")), t + n
                },
                update: function(t) {
                    var n = e.value;
                    !t || "blur" == t.type || "keyup" == t.type || browser.msie && "keypress" != t.type || t.ctrlKey || t.altKey || t.metaKey || (n = e.autosize.handleEvent(n, t)), n || (n = " "), e.autosize.helper.value != n && (e.autosize.helper.value = n);
                    var i, a = e.autosize.options,
                        r = getSize(e, !0)[1],
                        s = e.autosize.helper.scrollHeight;
                    a.exact && (i = s % o) > 2 && (s -= i - 2), s < a.minHeight && (s = a.minHeight);
                    var l = {
                            overflow: "hidden"
                        },
                        d = getStyle(e, "overflow").indexOf("auto") > -1 ? "auto" : "hidden";
                    a.maxHeight && s > a.maxHeight && (s = a.maxHeight, extend(l, {
                        overflow: "auto",
                        overflowX: "hidden"
                    })), a.addHeight && (s += a.addHeight), (r != s || d != l.overflow) && (l.height = s, setStyle(e, l), isFunction(a.onResize) && a.onResize(s))
                }
            }, t.exact && ("normal" == o && (o = "120%"), o = intval(o.indexOf("%") > 0 ? i * intval(o) / 100 : o)), utilsNode.appendChild(e.autosize.helper), browser.opera_mobile ? (setStyle(e, {
                overflow: "hidden"
            }), e.autosize.update(), addEvent(e, "blur", e.autosize.update)) : (addEvent(e, "keydown keyup keypress", e.autosize.update), setTimeout(function() {
                setStyle(e, {
                    overflow: "hidden",
                    resize: "none"
                }), e.autosize.update();
                var t = val(e);
                val(e, " ", !0), val(e, t, !0)
            }, 0))
        }
    }, window.goAway = function(e, t, o) {
        if (-1 != (t || {}).h || checkEvent(o)) return !0;
        if (-1 != (t || {}).h) {
            var n = e.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i);
            if (n && "api." != n[1].toLowerCase()) return location.href = e, !1;
            var i = intval(getCookie("remixsettings_bits"));
            if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(locBase) || 1 & i) return window.open("/away.php?to=" + encodeURIComponent(e) + (t && void 0 !== t.h ? "&h=" + t.h : ""), "_blank"), !1
        }
        var a = extend({
            act: "a_go",
            to: e
        }, t || {});
        return !showBox("away.php", a, {}, o)
    }, window.showAudioClaimWarning = function(e, t, o) {
        var n, i, a = e.id,
            r = e.ownerId,
            s = e.title,
            l = t.id,
            d = (t.deleteHash, t.reason),
            c = t.original,
            u = {
                width: 470
            };
        "geo" == d ? (n = getLang("audio_claimed_geo"), i = getLang("audio_claim_warning_title")) : "replace" == d ? (n = getLang("audio_claimed_replacement_available"), i = getLang("audio_claim_warning_title")) : "subscription" == d ? (u.hideButtons = !0, u.bodyStyle = "padding: 0; border-radius: 4px;", u.width = 450, i = !1, n = '        <div class="audio_claim_popup">          <div class="audio_claim_popup__title">' + getLang("global_audio_only_with_subscription_title") + '</div>          <div class="audio_claim_popup__text">' + getLang("global_audio_only_with_subscription_text") + '</div>          <div class="audio_claim_popup__close" onclick="curBox().hide()"></div>          <button class="flat_button round_button" onclick="getAudioPlayer().showSubscriptionPopup()">' + getLang("global_audio_only_with_subscription_btn") + "</button>        </div>") : (n = getLang("audio_claim_warning"), i = getLang("audio_claim_warning_title")), u.title = i, n = n.replace(/\{audio\}/g, "<b>" + s + "</b>"), n = n.replace(/\{objection_link\}/g, '<a href="/help?act=cc_objection&claim=' + l + "&content=audio" + r + "_" + a + '">' + getLang("audio_claim_objection") + "</a>"), n = n.replace(/\{delete_link\}/g, '<a onclick="deleteAudioOnClaim(' + r + "," + a + '); return false;">' + getLang("audio_claim_delete") + "</a>");
        var h = [u, n],
            p = null;
        if (o && c) {
            var f = AudioUtils.drawAudio(c, "no_extra");
            h[1] = n.replace(/\{original\}/g, c[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] + " - " + c[AudioUtils.AUDIO_ITEM_INDEX_TITLE]) + "<br/><br/>" + f, h.push(getLang("audio_replace_with_original"), function() {
                lockButton(p.btns.ok[0]), o(function() {
                    p.hide()
                })
            }), u.textControls = '<a onclick="deleteAudioOnClaim(' + r + "," + a + '); return false;">' + getLang("audio_claim_delete_capital") + "</a>"
        }
        cur.claimWarning = p = showFastBox.apply(null, h)
    }, window.sureDeleteAll = function(title, text, where, objectId, toId, fromId, hash, event) {
        if (!checkEvent(event)) {
            var box = showFastBox({
                title: title
            }, text, getLang("global_delete"), function(btn) {
                ajax.post("/delete_all.php", {
                    act: where,
                    object_id: objectId,
                    to_id: toId,
                    from_id: fromId,
                    hash: hash,
                    loc: nav.objLoc[0]
                }, {
                    onDone: function onDone(res) {
                        eval(res), box.hide()
                    },
                    showProgress: lockButton.pbind(btn),
                    hideProgress: unlockButton.pbind(btn)
                })
            }, getLang("global_cancel"));
            return !1
        }
    }, window.__qlTimer = null, window.__qlClear = function() {
        clearTimeout(__qlTimer), setTimeout(function() {
            clearTimeout(__qlTimer)
        }, 2e3)
    }, window.onLoginDone = function(e, t) {
        __qlClear(), storePasswordCredential(t), nav.reload({
            force: !0,
            from: 6
        })
    }, window.onLogout = function() {
        if (__qlClear(), window.audioPlayer && audioPlayer.stop(), window.Notifier && Notifier.standby(), window.FastChat && FastChat.standby(), window.Page && Page.postsClear(), ls.checkVersion()) try {
            window.localStorage.clear()
        } catch (e) {}
        nav.reload({
            from: 5
        })
    }, window.onLoginFailed = function(e, t) {
        switch (__qlClear(), e) {
            case -1:
                location.href = location.href.replace(/^http:/, "https:");
                break;
            case 4:
                location.href = "/login?m=1" + (t.expire ? "&s=0" : "") + "&email=" + t.email;
                break;
            default:
                location.href = "/login"
        }
    }, window.onLoginCaptcha = function(e, t) {
        __qlClear(), unlockButton(window.__qfBtn), window.qloginBox = showCaptchaBox(e, t, window.qloginBox, {
            onSubmit: function(e, t) {
                ge("quick_captcha_sid").value = e, ge("quick_captcha_key").value = t, ge("quick_login_form").submit()
            },
            onHide: function() {
                window.qloginBox = !1
            }
        })
    }, window.onLoginReCaptcha = function(e, t) {
        __qlClear(), unlockButton(window.__qfBtn), window.qloginBox = showReCaptchaBox(e, t, window.qloginBox, {
            onSubmit: function(e) {
                ge("quick_recaptcha").value = e, ge("quick_login_form").submit()
            },
            onHide: function() {
                window.qloginBox = !1
            }
        })
    }, window.storePasswordCredential = function(e) {
        if (browserFeatures.cmaEnabled) {
            var t = new PasswordCredential({
                id: ge("quick_email").value,
                password: ge("quick_pass").value,
                name: e.name,
                iconURL: e.photo_50
            });
            navigator.credentials.store(t)
        }
    }, window.callHub = function(e, t) {
        this.count = t || 1, this.done = function(t) {
            this.count -= t || 1, this.count <= 0 && e()
        }
    }, window.showWriteMessageBox = function(e, t) {
        cur.onFriendMessage && cur.onFriendMessage(), stManager.add(["page.js", "wide_dd.js"]);
        var o = showBox("al_im.php", {
            act: "a_write_box",
            to: t
        }, {
            stat: ["writebox.js", "writebox.css", "wide_dd.css", "page.css", "emoji.js", "notifier.css"],
            cache: 1
        }, e);
        return o && cancelEvent(e), window.WriteBox && WriteBox.extractEmoji(), !o
    }, window.giftsBox = function(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : !showBox("al_gifts.php", {
            act: "box",
            tab: o || "received",
            mid: e
        }, {
            cache: 1,
            stat: ["gifts.css", "gifts.js"]
        }, t)
    }, window.moneyTransferBox = function(e, t, o, n, i, a, r) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (i) {
            var s = function() {
                    u ? (addClass(n.firstChild, "round_spinner"), removeClass(n.firstChild, "button")) : lockButton(n)
                },
                l = function() {
                    u ? (addClass(n.firstChild, "button"), removeClass(n.firstChild, "round_spinner")) : unlockButton(n)
                };
            if (!r) {
                var d, c;
                return 2 == i ? (d = cur.lang && cur.lang.mail_money_transfer_cancel_confirm || getLang("mail_money_transfer_cancel_confirm"), c = cur.lang && cur.lang.mail_money_transfer_cancel_btn || getLang("mail_money_transfer_cancel_btn")) : (d = cur.lang && cur.lang.mail_money_transfer_decline_confirm || getLang("news_fb_money_transfer_decline_confirm"), c = cur.lang && cur.lang.mail_money_transfer_decline_btn || getLang("news_fb_money_transfer_decline_btn")), void(cur.confirmBox = showFastBox(getLang("global_action_confirmation"), d, c, moneyTransferBox.pbind(e, t, o, n, i, !1, 1), getLang("global_cancel")))
            }
            var u = hasClass(domPN(n), "wall_postlink_preview_btn");
            return accept_btn = geByClass1("flat_button", domPN(n)), 2 !== r && (disableButton(accept_btn, !0), s(n), cur.confirmBox && cur.confirmBox.hide()), void ajax.post("al_payments.php?act=a_cancel_money_transfer", {
                tx_id: e,
                hash: t,
                from: u ? "snippet" : ""
            }, {
                onDone: function(a, r, s) {
                    return 0 === a ? void setTimeout(moneyTransferBox.pbind(e, t, o, n, i, !1, 2), 2e3) : (u ? (re(n), hasClass(accept_btn, "secondary") || domReplaceEl(accept_btn, s)) : re(domPN(n)), showDoneBox(r), void TopNotifier.invalidate())
                },
                onFail: function(e) {
                    return disableButton(accept_btn, !1), l(n), setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
                }
            })
        }
        var h;
        return h = a ? {
            act: "money_transfer_box",
            request_id: e,
            request: a,
            hash: t
        } : {
            act: "accept_money_transfer_box",
            tx_id: e,
            hash: t
        }, cur.acceptMoneyBtn = n, !showBox("al_payments.php", h, {
            stat: ["payments.css", "payments.js"],
            onFail: function(e) {
                return setTimeout(showFastBox(getLang("global_error"), e).hide, 2e3), !0
            }
        }, o)
    }, window.gSearch = new function() {
        this.on = 0;
        var e = this;
        this.hub = new callHub(function() {
            e.onShow && e.onShow()
        }, 2), this.hintsHub = new callHub(function() {
            e.showStartHints()
        }, 2), this.load = function() {
            ge("quick_search") && (this.loading || (this.loading = !0, stManager.add("qsearch.js", function() {
                e.hub.done()
            }), ajax.post("hints.php", {
                act: "a_start_hints"
            }, {
                onDone: function(t) {
                    e.startHintsText = trim(t), e.hintsHub.done()
                }
            })))
        }, this.show = function(t, o) {
            return ge("quick_search") ? this.on ? this.go(t) : (this.on = 1, show(e.sCont), placeholderSetup("search_input"), ge("search_input").setAttribute("autocomplete", "off"), addClass(ge("qsearch_link"), "active"), this.prev_content = ge("content"), this.qsearch_cont || (this.qsearch_cont = ce("div", {
                id: "content",
                innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
            })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), e.hub.done(), e.hintsHub.done(), t ? cancelEvent(t) : void 0) : void 0
        }, this.go = function(t) {
            var o = "/gsearch.php?section=" + (e.last_section || "people") + "&q=" + trim(ge("search_input").value) + "&name=1";
            return cancelEvent(t || window.event), location.href = o, !1
        }, this.hide = function(t, o) {
            if (ge("quick_search") && (!e.active || o) && e.on) {
                if (e.on = 0, toggleFlash(), e.beforeHide && e.beforeHide()) return !0;
                ge("search_input").setValue ? ge("search_input").setValue("") : ge("search_input").value = "", hide(e.sCont), removeClass(ge("qsearch_link"), "active"), e.qsearch_cont.parentNode.replaceChild(e.prev_content, e.qsearch_cont)
            }
        }, this.init = function(e) {
            this.sCont = ge("quick_search"), this.opt = e || {}
        }, this.preload = function() {}
    };
    var _cleanHide = function(e) {
        e.temphide && (removeEvent(e, "mouseout", e.temphide), removeAttr(e, "temphide"), removeAttr(e, "showing"))
    };
    window.showTooltip = function(e, t) {
            (vk.loaded || t.noload) && e && (e.temphide || (e.temphide = function() {
                e.showing = !1
            }, addEvent(e, "mouseout", e.temphide)), e.showing = !0, "loadingstat" != e.tt && (e.tt || (e.tt = "loadingstat"), domClosest("fc_tab", e) && (t.appendEl = bodyNode), cur.cancelTooltip = !1, t.stat && stManager.add(t.stat), stManager.add(["tooltips.js", "tooltips.css"], function() {
                "loadingstat" == e.tt && (e.tt = !1), e.showing && !cur.cancelTooltip && (_cleanHide(e), e.tt && e.tt.el && !t.force || (tooltips.create(e, t), t.onCreate && t.onCreate()), tooltips.show(e, t))
            })))
        }, window.showTitle = function(e, t, o, n) {
            e = ge(e);
            var i = function() {
                return t || e.getAttribute("data-title")
            };
            if (browser.msie && browser.version < 9) e.setAttribute("title", i());
            else {
                if (!o) {
                    var a = Math.round(20 - getSize(e)[0] / 2);
                    o = [a, 8]
                }
                showTooltip(e, extend({
                    text: i,
                    shift: o,
                    black: 1
                }, n || {}))
            }
        }, window.showHint = function(e, t) {
            e = ge(e), t = t || {};
            var o = function() {
                return e.getAttribute("data-title")
            };
            browser.msie && browser.version < 9 ? e.setAttribute("title", o().replace("<br>", "\n")) : showTooltip(e, extend({
                text: o,
                dir: "auto",
                width: 300,
                shift: [22, 8]
            }, t))
        }, window.reportAd = function(e) {
            showBox("/reports.php?act=a_report_ad_box", {
                ad_id: e
            }, {
                params: {
                    width: 370
                },
                stat: ["ui_controls.js", "ui_controls.css"]
            })
        }, window.updateMoney = function(e, t) {
            if (void 0 !== e && e !== !1) {
                var o = "";
                t === !0 ? (vk.balanceEx = e, o = "_ex") : vk.balance = e;
                var n = geByClass("votes_balance_nom" + o);
                for (var i in n) n[i].innerHTML = e + " " + getLang("votes_flex", e);
                var a = e * (vk.vcost || 7),
                    n = geByClass("money_balance_nom" + o);
                for (var i in n) n[i].innerHTML = getLang("global_money_amount_rub", a, !0);
                void 0 !== t && t !== !1 && t !== !0 && updateMoney(t, !0)
            }
        }, window.articleNav = function(e, t, o) {
            var n = e,
                i = /^(?:%40|@)[.a-z0-9_-]+$/,
                a = n.toLowerCase().match(i);
            if (a) return cur.articleLayer || (cur.articlePrevLoc = t), window.WkView && WkView.hide(!0), window.__bq && __bq.hideAll(), stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
                var e = cur.articleLayer;
                e && e.setFaded(), cur.articleLayer = new ArticleLayer({
                    url: n
                }), cur.articleLayer.show(function() {
                    e && e.close()
                }, !e), cur.articleSequence = (cur.articleSequence || 0) + 1
            }), !0;
            if (cur.articleLayer && cur.articleLayer.isShown()) {
                var r = function() {
                        cur.articleLayer && cur.articleLayer.close(), delete cur.articleLayer, delete cur.articleSequence
                    },
                    s = cur.articlePrevLoc;
                return delete cur.articlePrevLoc, s && !i.test(s) ? e == s ? (r(), !0) : (layers.fullhide = function() {
                    r()
                }, !1) : (r(), !0)
            }
            return !1
        }, window.articlePrepare = function(e) {
            e && stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
                ArticleLayer.prepare({
                    url: e
                })
            })
        }, window.zNav = function(e, t, o) {
            var n = e.z,
                i = e.f,
                a = e.w,
                r = (n || "").match(/^([a-z_]+)(-?\d+(?:_\d+)?)\/?(.*)/i);
            if (delete e.z, delete e.f, delete e.w, t || (t = {}), isEmpty(e)) {
                if (i && (handleScroll(i), void 0 === n)) return !1;
                if (t.hist)
                    if (n || a) {
                        if (layerQueue.back("wiki", a, (r || {})[1], (r || {})[2])) return !1
                    } else if (n === !1 && o.w && layerQueue.back("wiki", o.w)) return !1;
                if (a) {
                    if (n === !1) layers.fullhide(t.hist ? 2 : !1);
                    else {
                        if (a.match(/^story([0-9\-]+)_(\d+)/)) return showStory(a);
                        o || (o = clone(nav.objLoc)), a && (o.w = a), i && (o.f = i), delete o.z, nav.setLoc(o)
                    }
                    return showWiki({
                        w: a
                    }, "note_new" == a, !1, {
                        onLoaded: n && zNav.pbind({
                            z: n
                        }, extend(t, {
                            queue: 1
                        }))
                    }), !1
                }
                if ("giftbox" == n) return !showBox("/al_gifts.php", {
                    act: "get_gift_box",
                    mid: t.id || 0,
                    fr: t.is && t.id != vk.id ? 0 : 1,
                    link: nav.objLoc[0]
                }, {
                    stat: ["gifts.css", "ui_controls.js", "ui_controls.css"],
                    cache: 1
                }, window.event);
                if ("validatebox" == n) return !validateMobileBox({
                    closeLink: 1,
                    onDone: function() {
                        ge("change_phone_wrap").parentNode.removeChild(ge("change_phone_wrap"))
                    }
                });
                if ("upload_video" == n) return VideoUpload.showBox();
                if (n === !1 || a === !1) {
                    var s = !window.wkcur || !wkcur.shown || layers.fullhide != WkView.hide;
                    !layers.fullhide || !s && a !== !1 || t.asBox || (!t.hist || o.z || o.w || -1 !== o[0].indexOf("/") || o[0].match(/^(photo|video)(-?\d+_\d+)$/) || layerQueue.clear(), layers.fullhide(t.hist ? 2 : !1));
                    var l = curBox();
                    return l && l.wkRaw && l.hide(), !1
                }
                if (n && r) {
                    var d = function() {
                        return delete nav.objLoc.z, nav.setLoc(nav.objLoc), !0
                    };
                    switch (r[1]) {
                        case "photo":
                            return showPhoto(r[2], r[3], extend(t, {
                                onFail: d,
                                noHistory: !0
                            })), !1;
                        case "albums":
                            return showAlbums(r[2], extend(t, {
                                onFail: d,
                                noHistory: !0
                            })), !1;
                        case "album":
                            return showAlbum(r[2], extend(t, {
                                onFail: d,
                                noHistory: !0
                            })), !1;
                        case "tag":
                        case "photo_tag":
                            return showPhotoTags(r[2], extend(t, {
                                onFail: d,
                                noHistory: !0
                            })), !1;
                        case "video":
                            var c = r[3],
                                u = extend(t, {
                                    onFail: d,
                                    noLocChange: 1,
                                    focusPlay: 1
                                });
                            if (c) {
                                var h = [],
                                    p = "";
                                if (each(c.split("/"), function(e, t) {
                                        0 == t.indexOf("pl_") ? p = t : h.push(t)
                                    }), c = h.join("/"), p) {
                                    p = p.substr("pl_".length);
                                    var f = cur.currentModule ? cur.currentModule() : cur.module;
                                    u = extend(u, {
                                        playlistId: p,
                                        module: f,
                                        addParams: {
                                            force_no_repeat: 1,
                                            show_next: 1,
                                            playlist_id: p
                                        }
                                    })
                                }
                            }
                            return showVideo(r[2], c, u), !1;
                        case "single":
                            return void 0 === a && stManager.add(["single_pv.css", "single_pv.js"], ge(n).onclick), !1;
                        case "accept_money":
                            return moneyTransferBox(r[2], r[3]), !1;
                        case "audio_playlist":
                            var p = r[2].split("_");
                            return AudioUtils.showAudioPlaylist.apply(this, [p[0], p[1], r[3], void 0, void 0, t.onDone]), !1;
                        case "article_edit":
                            return openArticleEditor.apply(this, r[2].split("_")), !1
                    }
                }
            }
        }, window.handleScroll = function(e) {
            e = e.split(",");
            var t = cur.named || {},
                o = e[0] && (t[e[0]] || ge(e[0])) || !1,
                n = e[1] && (t[e[1]] || ge(e[1])) || !1;
            if (!o && !n) {
                if (o = document.getElementsByName(e[0])[0], !o) return;
                o = o.nextSibling
            }
            var i = ge("page_header_wrap") || ge("dev_top_nav_wrap");
            setTimeout(function() {
                o && scrollToY(getXY(o)[1] - (i ? getSize(i)[1] : 0), 0), n && elfocus(n)
            }, 300)
        }, window.showGlobalPrg = function(e, t) {
            var o = getXY(e),
                n = getSize(e),
                i = t || {},
                a = i.w || 32,
                r = i.h || 13,
                s = ge("global_prg");
            s.className = i.cls || "progress", setStyle(s, {
                left: o[0] + Math.floor((n[0] - a) / 2) + intval(i.shift ? i.shift[0] : 0),
                top: o[1] + Math.floor((n[1] - r) / 2) + intval(i.shift ? i.shift[1] : 0),
                width: a,
                height: r,
                display: "block",
                "z-index": i.zIndex ? i.zIndex : null
            }), i.hide && (e.style.visibility = "hidden")
        }, window.showManyPhoto = function(e, t, o, n) {
            Page.showManyPhoto(e, t, o, n)
        }, window.showPhoto = function(e, t, o, n) {
            if (cur.viewAsBox) return cur.viewAsBox();
            if (!(checkEvent(n) || cur._editMode && cur._editMode(n))) {
                var i = ["photoview.js", "photoview.css", "page.js", "page.css"],
                    a = window.Photoview;
                if (o.img && (o.showProgress = function() {
                        showProgress(o.img)
                    }, o.hideProgress = function() {
                        hideProgress(o.img)
                    }), !e) return !1;
                if (a && a.showPhoto(e, t, o) === !1) return !1;
                var r = !0;
                o.temp && !(cur.pvNoTemp || {})[e] && stManager.add(i, function() {
                    extend(cur, {
                        pvCancelLoad: function() {
                            r = !1
                        },
                        pvData: cur.pvData || {},
                        pvOptions: cur.pvOptions || {}
                    }), cur.pvData.temp = [o.temp], cur.pvOptions.temp_final = o.temp_final, cur.pvOptions.temp_summary = o.temp_summary, cur.pvOptions.queue = o.queue, Photoview.show("temp", 0)
                });
                var s = 1;
                return o && o.additional && o.additional.open_pe && (s = 0), extend(o, {
                    onDone: function(n) {
                        Photoview.list(e, t, n), o.blog_text && arguments[3] && arguments[3][0] && (arguments[3][0].album = o.blog_text), Photoview.loaded.apply(window, arguments), r && ("deleted" == n ? Photoview.showDeleted.apply(window, arguments) : Photoview.showPhoto(e, t, o, !0))
                    },
                    stat: i,
                    cache: s
                }), o.temp_final ? !1 : (ajax.post("al_photos.php", extend({
                    act: "show",
                    gid: cur.gid,
                    photo: e,
                    list: t,
                    module: cur.module || "",
                    list_info: o.list_info || null
                }, o.additional), o), !1)
            }
        }, window.showAlbums = function(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : checkEvent(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
                Photoview.showAlbums(e, t)
            }), !1)
        }, window.showAlbum = function(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : checkEvent(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
                Photoview.showAlbum(e, t)
            }), !1)
        }, window.showPhotoTags = function(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : checkEvent(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
                Photoview.showTagged(e, t)
            }), !1)
        }, window.showVideoTags = function(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : checkEvent(o) ? void 0 : (stManager.add(["video.js", "video.css", "photoview.js", "photoview.css"], function() {
                Photoview.showVideoTags(e, t)
            }), !1)
        }, window.showWiki = function(e, t, o, n) {
            if (checkEvent(o)) return !0;
            var n = n || {};
            if (0 !== cur.gid && (e.gid = cur.gid), window.wkcur && wkcur.shown && wkcur.wkRaw == e.w && e.w && !e.reply) return WkView.restoreLayer(n), cancelEvent(o);
            (window.wkcur && wkcur.hideTitle || e.hide_title) && (n.hide_title = e.hide_title = 1);
            var i = n.stat || ["wkview.js", "wkview.css", "wk.css", "wk.js"];
            t && i.push("wk_editor.js", "wk_editor.css");
            var a = {
                stat: i,
                loader: !n.noloader,
                onDone: function(e, t, i, a) {
                    WkView.show(e, t, extend(i, n), a, o)
                },
                onFail: function(e) {
                    return WkView.showError(e)
                }
            };
            if (nav.objLoc.claim && (e.claim = nav.objLoc.claim), e.w && "/query" == e.w.substr(-6)) {
                var r = clone(nav.objLoc);
                delete r[0], delete r.w, e.query = JSON.stringify(r)
            }
            return n.preload && extend(a, n.preload), ajax.post("wkview.php", extend({
                act: "show",
                loc: nav.objLoc[0]
            }, e, n.ads_params, cur.getWkviewOpts && cur.getWkviewOpts()), a), cancelEvent(o)
        }, window.videoCallback = function(e) {
            var t = e.shift();
            if (window.Videoview && Videoview.playerCallback[t]) return Videoview.playerCallback[t].apply(Videoview, e);
            throw Error("Unregistered player callback: " + t)
        }, window.showApp = function(e, t, o, n, i, a) {
            a || (a = {});
            var r = !1,
                s = extend({
                    w: "app" + t
                }, a);
            if (n && (isObject(n) ? s = extend(s, n) : s.ref = n), a.layer && (r = !0), (cur.apps && cur.apps[t] || !o) && !r) {
                delete s.w;
                var l = "app" + t + (i ? "_" + i : ""),
                    d = nav.objLoc && !nav.objLoc[1] && nav.objLoc[0] === l;
                return nav.go("/" + l + nav.toStr(s), e, {
                    nocur: d
                })
            }
            i && (s.mid = i);
            var c = {
                stat: ["wkview.js", "wkview.css", "apps.js", "apps.css"]
            };
            return a.queue && (c.queue = 1), a.urlHash && (s.url_hash = a.urlHash), showWiki(s, !1, e, c)
        }, window.showDoneBox = function(e, t) {
            t = t || {};
            var o = (t.w || 380) + 20,
                n = t.w ? ' style="width: ' + t.w + 'px;"' : "",
                i = bodyNode.offsetWidth,
                a = ce("div", {
                    className: "top_result_baloon_wrap fixed",
                    innerHTML: '<div class="top_result_baloon"' + n + ">" + e + "</div>"
                }, {
                    left: (i - o) / 2
                });
            bodyNode.insertBefore(a, pageNode);
            var r = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
                s = browser.mobile ? intval(window.pageYOffset) : 0,
                l = getSize(a);
            a.style.top = Math.max(10, s + (r - l[1]) / 3) + "px";
            var d = t.out || 2e3,
                c = new Date,
                u = function h() {
                    0 > d || (window.doneBoxTO = setTimeout(function() {
                        return t.permit && !t.permit() ? void h() : void fadeOut(a.firstChild, 500, function() {
                            re(a), t.callback && t.callback()
                        })
                    }, d))
                };
            addEvent(a, "mouseenter", function() {
                clearTimeout(window.doneBoxTO), d -= new Date - c
            }), addEvent(a, "mouseleave", function() {
                c = new Date, u()
            }), u()
        }, window.animateCount = function(e, t, o) {
            if (e = ge(e), o = o || {}, t = o.str ? trim(t.toString()) || "" : positive(t), e) {
                if (browser.mobile && !browser.safari_mobile && !browser.android) return void val(e, t || "");
                var n = data(e, "curCount"),
                    i = data(e, "nextCount");
                if ("number" == typeof i || o.str && "string" == typeof i) return void(t != i && data(e, "nextCount", t));
                if ("number" == typeof n || o.str && "string" == typeof n) return void(t != n && data(e, "nextCount", t));
                if (n = o.str ? trim(val(e).toString()) || "" : positive(val(e)), "auto" === o.str && (o.str = !n.match(/^\d+$/) || !t.match(/^\d+$/), o.str || (n = positive(n), t = positive(t))), n != t) {
                    data(e, "curCount", t);
                    var a, r, s, l = o.str ? n.length == t.length ? t > n : n.length < t.length : t > n,
                        d = (l ? t : n).toString(),
                        c = (l ? n : t).toString(),
                        u = [],
                        h = [],
                        p = "",
                        f = "";
                    for (o.str || (c = new Array(d.length - c.length + 1).join("0") + c), a = 0, r = d.length; r > a && (s = d.charAt(a)) === c.charAt(a); a++) u.push(s);
                    if (p = d.substr(a), f = c.substr(a), o.str) {
                        for (a = p.length; a > 0 && (s = p.charAt(a)) === f.charAt(a); a--) h.unshift(s);
                        h.length && (p = p.substr(0, a + 1), f = f.substr(0, a + 1))
                    }
                    u = u.join("").replace(/\s$/, "&nbsp;"), h = h.join("").replace(/^\s/, "&nbsp;"), trim(val(e)) || val(e, "&nbsp;");
                    var w = e.clientHeight || e.offsetHeight;
                    val(e, '<div class="counter_wrap inl_bl"></div>');
                    var _, v, g, m, b = e.firstChild,
                        y = !0;
                    u.length && b.appendChild(_ = ce("div", {
                        className: "counter_const inl_bl",
                        innerHTML: u
                    })), u.length || (f = f.replace(/^0+/, "")), (!f || "0" == f && !u.length) && (f = "&nbsp;", y = u.length ? !0 : !1), b.appendChild(g = ce("div", {
                        className: "counter_anim_wrap inl_bl"
                    })), g.appendChild(m = ce("div", {
                        className: "counter_anim " + (l ? "counter_anim_inc" : "counter_anim_dec"),
                        innerHTML: '<div class="counter_anim_big"><span class="counter_anim_big_c">' + p + "</span></div>" + (y ? '<div class="counter_anim_small"><span class="counter_anim_small_c">' + f + "</span></div>" : "")
                    }, y ? {
                        marginTop: l ? -w : 0
                    } : {
                        right: 0
                    })), o.str && setStyle(m, {
                        textAlign: "right",
                        right: 0
                    });
                    var x = getSize(geByClass1("counter_anim_big_c", m, "span"))[0],
                        k = y ? "&nbsp;" == f ? x : getSize(geByClass1("counter_anim_small_c", m, "span"))[0] : 0;
                    if (h.length && b.appendChild(v = ce("div", {
                            className: "counter_const inl_bl",
                            innerHTML: h
                        })), o.noWrapWidth || setStyle(b, {
                            width: (_ && getSize(_)[0] || 0) + (v && getSize(v)[0] || 0) + x + 0
                        }), void 0 === browser.csstransitions) {
                        var C = browser,
                            T = floatval(C.version);
                        browser.csstransitions = C.chrome && T >= 9 || C.mozilla && T >= 4 || C.opera && T >= 10.5 || C.safari && T >= 3.2 || C.safari_mobile || C.android
                    }
                    var L = browser.csstransitions;
                    setStyle(g, {
                        width: l ? k : x
                    });
                    var S = function() {
                            val(e, t || " ");
                            var n = data(e, "nextCount");
                            data(e, "curCount", !1), data(e, "nextCount", !1), ("number" == typeof n || o.str && "string" == typeof n) && setTimeout(animateCount.pbind(e, n, o), 0), o.onDone && o.onDone()
                        },
                        E = y ? {
                            marginTop: l ? 0 : -w
                        } : {
                            marginRight: l ? -k : 0
                        };
                    L ? (getStyle(g, "width"), addClass(g, "counter_css_anim_wrap"), x != k && setStyle(g, {
                        width: l ? x : k
                    }), y && setStyle(m, E), setTimeout(S, 300), o.fadeMode && (setStyle(geByClass1("counter_anim_big", e), "opacity", 1), setStyle(geByClass1("counter_anim_small", e), "opacity", 0))) : (x != k && animate(g, {
                        width: l ? x : k
                    }, {
                        duration: 100
                    }), y ? animate(m, E, {
                        duration: 300,
                        transition: Fx.Transitions.easeOutCirc,
                        onComplete: S
                    }) : setTimeout(S, 300))
                }
            }
        }, window.Chat = {
            maxHeight: 300,
            tabs: {},
            counters: {},
            showFriends: function() {
                curFastChat.clistBox.visible ? curFastChat.clistBox.options.fixed ? FastChat.clistHide() : curFastChat.clistBox.show() : (FastChat.clistShow(), Chat.cont.tt && Chat.cont.tt.destroy && Chat.cont.tt.destroy())
            },
            showTT: function() {
                hasClass(Chat.wrap, "chat_active") || hasClass(Chat.wrap, "chat_expand") || showTooltip(Chat.cont, {
                    text: getLang("head_fr_online_tip") + " (" + (browser.mac ? "Cmd" : "Ctrl") + "+?)",
                    shift: [-2, 4, 0],
                    showdt: 0,
                    black: 1
                })
            },
            init: function() {
                Chat.wrap = ce("div", {
                    id: "chat_onl_wrap",
                    className: "chat_onl_wrap",
                    innerHTML: '<div class="chat_tt_wrap"></div><div class="chat_onl_inner"><div class="chat_cont_scrolling"><div class="chat_onl_height"></div></div><div class="chat_cont_sh_top"></div><div class="chat_cont_sh_bottom"></div><a class="chat_tab_wrap" id="chat_tab_wrap" onclick="Chat.showFriends()" onmouseover="Chat.showTT();"><div class="chat_onl_cont"><div class="chat_onl" id="chat_onl"></div></div></a></div>'
                }), utilsNode.appendChild(Chat.wrap), Chat.scrollNode = geByClass1("chat_cont_scrolling", Chat.wrap), Chat.ttNode = geByClass1("chat_tt_wrap", Chat.wrap), Chat.itemsCont = Chat.scrollNode.firstChild, Chat.onl = ge("chat_onl"), Chat.cont = Chat.onl.parentNode.parentNode, hide(Chat.wrap), Chat.inited = !0, stManager._addCss(".layers_shown .chat_onl_wrap {margin-right: " + sbWidth() + "px;}")
            }
        }, window.TopMenu = {
            init: function() {
                if (this.inited) return !1;
                var e = ge("top_profile_link"),
                    t = ge("top_profile_menu");
                return e && t ? (addEvent(e, "mousedown", TopMenu.clicked), void(this.inited = !0)) : !1
            },
            clicked: function(e) {
                return checkEvent(e) || "mousedown" == e.type && checkKeyboardEvent(e) ? !1 : (TopMenu.toggle(), !1)
            },
            toggle: function(e) {
                var t = ge("top_profile_link"),
                    o = ge("top_profile_menu"),
                    n = hasClass(o, "shown");
                (void 0 === e || n != e) && (void 0 === e && (e = !n), toggleClass(t, "active", e), toggleClass(o, "shown", e), e ? (cancelStackPush("top_menu", TopMenu.toggle.bind(this, !1), !0), cur.introExitTooltipHide && (cur.introExitTooltipHide(), delete cur.introExitTooltipHide)) : cancelStackFilter("top_menu", !0))
            },
            show: function() {
                TopMenu.hidetimer && (clearTimeout(TopMenu.hidetimer), TopMenu.hidetimer = 0), TopMenu.toggle(!0)
            },
            hide: function() {
                TopMenu.hidetimer || (TopMenu.hidetimer = setTimeout(function() {
                    TopMenu.toggle(!1), TopMenu.hidetimer = 0
                }, 200))
            },
            select: function(e, t) {
                return checkEvent(t) ? !0 : (TopMenu.toggle(!1), nav.go(e, t, {
                    noback: !0
                }))
            }
        }, window.TopNotifier = {
            preload: function() {
                var e = ["notifier.js", "notifier.css"];
                stManager.add(e, function() {
                    TopNotifier.preload()
                })
            },
            show: function(e) {
                if (checkEvent(e) !== !0) {
                    var t = ["notifier.js", "notifier.css"];
                    return stManager.add(t, function() {
                        TopNotifier.show(id)
                    }), cancelEvent(e)
                }
            },
            showTooltip: function(e) {
                var t = ["notifier.js", "notifier.css"];
                stManager.add(t, function() {
                    TopNotifier.showTooltip(e)
                })
            },
            invalidate: __bf,
            setCount: __bf
        }, window.TopSearch = {
            cache: {},
            lists: {},
            maxItems: 8,
            init: function() {
                if (this.inited) return !1;
                var e = ge("ts_input"),
                    t = (ge("ts_wrap"), ge("ts_cont_wrap"));
                return vk.id && Chat.init(), e ? (addEvent(e, "focus", function() {
                    TopSearch.deselect(), trim(val(this)) && addClass(t.firstChild, "active"), TopSearch.toggleInput(!0)
                }), addEvent(e, "keydown", function(o) {
                    switch (o.keyCode) {
                        case KEY.DOWN:
                        case KEY.UP:
                            TopSearch.moveSelection(o.keyCode), cancelEvent(o);
                            break;
                        case KEY.ENTER:
                            var n = geByClass1("active", t);
                            if (n) TopSearch.select(n, o);
                            else {
                                var i = trim(val(this));
                                i && (e.blur(), TopSearch.clear(), TopSearch.toggle(!1), nav.go("/search?c[section]=auto&c[q]=" + encodeURIComponent(i)))
                            }
                            cancelEvent(o);
                            break;
                        case KEY.TAB:
                            TopSearch.clear(), TopSearch.toggleInput(!1), cancelStackFilter("top_search", !0)
                    }
                }), void(vk.id && (addEvent(e, "keyup", function(e) {
                    switch (e.keyCode) {
                        case KEY.DOWN:
                        case KEY.UP:
                        case KEY.ENTER:
                        case KEY.ESC:
                            cancelEvent(e);
                            break;
                        default:
                            TopSearch.prepareRows(trim(val(this)))
                    }
                }), addEvent(e, "paste", function() {
                    setTimeout(function() {
                        TopSearch.prepareRows(trim(val(e)))
                    }, 10)
                }), addEvent(document, "mousedown", function(e) {
                    checkKeyboardEvent(e) || domClosest("_audio_page_layout", e.target) || domClosest("_ap_layer__close", e.target) || domClosest("layer_wrap", e.target) || _topHeaderClose()
                }), this.inited = !0))) : !1
            },
            clear: function() {
                window.tooltips && tooltips.destroyAll(ge("ts_cont_wrap"));
                var e = ge("ts_input");
                e && e.phonblur && (val(e, ""), e.blur(), e.phonblur(), this.prepareRows())
            },
            select: function(e, t, o) {
                if (checkEvent(t)) return !0;
                var n = (ge("ts_cont_wrap"), ge("ts_input")),
                    i = trim(val(n)).length,
                    a = e.getAttribute("hinttype");
                if (this.clear(), _topHeaderClose(), i || n.blur(), o && hasClass(t.target, "ts_contact_status")) return ajax.post("al_search.php", {
                    act: "save_metrics",
                    ql: i,
                    mk: "chat_box"
                }), this.writeBox(o), !1;
                var r = nav.go(e, t);
                return ajax.post("al_search.php", {
                    act: "save_metrics",
                    ql: i,
                    mk: a
                }), r
            },
            deselect: function() {
                var e = ge("ts_cont_wrap");
                each(geByClass("active", e), function(e, t) {
                    removeClass(t, "active")
                })
            },
            itemOver: function(e, t, o) {
                1 == t && TopSearch.deselect();
                var n = inArray(e.getAttribute("hintType"), ["h_friends", "h_correspondents", "h_chats"]);
                toggleClass(e, "write", n), toggleClass(e, "active", t)
            },
            moveSelection: function(e) {
                var t, o = ge("ts_cont_wrap"),
                    n = geByClass1("active", o);
                switch (e) {
                    case KEY.UP:
                        t = n ? this.getNextNode(n, -1, "a") || n : !1;
                        break;
                    case KEY.DOWN:
                        t = n ? this.getNextNode(n, 1, "a") || n : o.firstChild
                }
                return this.deselect(), t && addClass(t, "active"), !1
            },
            getNextNode: function(e, t, o) {
                for (var n = e, i = domPN(e);;) {
                    if (n = t > 0 ? domNS(n) : domPS(n), n || (n = t > 0 ? domFC(i) : domLC(i)), o && n.tagName && n.tagName.toLowerCase() == o || !o && n) return n;
                    if (n === e) return !1
                }
            },
            toggleInput: function(e) {
                e = !!e;
                var t = ge("ts_cont_wrap");
                isVisible(t) != e && (toggle("ts_cont_wrap", e), e && cancelStackPush("top_search", function() {
                    var e = ge("ts_input");
                    TopSearch.toggleInput(!1), e.blur()
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
                var e = this;
                if (e.friendsLoaded) return !1;
                if (cur.initingFL || vk.isBanned || !vk.id) return !1;
                var t = function(e) {
                        for (var t in e) return !1;
                        return !0
                    },
                    o = function() {
                        cur.initingFL = !0, ajax.post("al_search.php", {
                            act: "get_top_friends"
                        }, {
                            cache: 1,
                            onDone: function(t) {
                                delete cur.initingFL, e.topFriends = t, e.updateCache("friends"), e.forceUpdate = !0, e.prepareRows(cur.tsStr || ""), n()
                            },
                            onFail: function() {
                                delete cur.initingFL
                            }
                        })
                    },
                    n = function() {
                        return e.friendsLoaded ? !1 : (cur.initingFL = !0, void ajax.post("al_search.php", {
                            act: "get_pages"
                        }, {
                            cache: 1,
                            onDone: function(t) {
                                delete cur.initingFL, e.friendsLoaded || (each(t, function(t, o) {
                                    e.lists[t] = o, "onlines" != t && e.updateCache(t)
                                }), e.friendsLoaded = !0, val("ts_input") || e.prepareRows(""))
                            },
                            onFail: function() {
                                delete cur.initingFL
                            }
                        }))
                    },
                    i = e.getList("friends");
                t(i) ? o() : (e.updateCache("friends"), e.forceUpdate = !0, e.prepareRows(cur.tsStr || ""), n())
            },
            getSimilarQueries: function(e) {
                e = e.toLowerCase();
                var t, o = [e];
                return (t = parseLatin(e)) && o.push(t), (t = parseLatKeys(e)) && o.push(t), (t = parseCyr(e)) && o.push(t), o
            },
            searchCache: function(e, t) {
                var o = TopSearch.getList(e);
                if (!t) return !1;
                var n, i, a, r, s, l, d, c = this.getSimilarQueries(t);
                if (void 0 !== this.cache[e][t]) return c;
                d = this.cache[e][t] = {};
                for (var i in c)
                    if (n = c[i], r = this.cache[e][" " + n.charAt(0).toLowerCase()]) {
                        s = new RegExp("(^|[\\s\\-\\(\\)\\.,;|:]+)" + escapeRE(n), "gi");
                        for (a in r) l = o[a + "_"], isArray(l) && null !== l[0].match(s) && (d[a] = 1)
                    }
                a = 0;
                for (var i in d) a++;
                return d._num = a, c
            },
            updateCache: function(e, t, o) {
                var n, i, a, r = t || this.getList(e);
                this.cache[e] = o && this.cache[e] || {};
                for (var s in r) {
                    n = r[s][0], s = intval(s), a = n.split(/[\s\-\(\)\.,;|:]+/);
                    for (var l in a) i = " " + a[l].charAt(0).toLowerCase(), this.cache[e][i] = this.cache[e][i] || {}, this.cache[e][i][s] = 1
                }
            },
            listSearch: function(e, t, o, n) {
                var i = TopSearch,
                    a = [],
                    r = {};
                return t ? (i.searchCache(e, t), r = i.cache[e] && i.cache[e][t] || {}) : each(i.getList(e), function(e) {
                    var t = intval(e);
                    r[t] = 1
                }), each(i.getList(e), function(e) {
                    var t = intval(e),
                        i = r[t];
                    return n && n[t] || !i ? void 0 : o-- ? void a.push([t, this]) : !1
                }), a
            },
            row: function(e, t, o, n, i, a, r, s, l) {
                var d = 0;
                if (a && (n = n.replace(a, '$1<em class="ts_clist_hl">$2</em>')), inArray(r, ["h_friends", "h_correspondents", "h_chats"]) && (d = e), s || (s = ""), l = intval(l)) {
                    var c = "";
                    1 & l && (c += "page_verified "), 2 & l && (c += "page_top_author "), -128932034 == e ? c += "ph_verified " : -29246653 == e && (c += "pg_verified "), l = '<div class="' + c + '" onmouseover="pageVerifiedTip(this, {type: ' + l + ", oid: " + e + '})"></div>'
                } else l = "";
                return '<a href="' + t + '" class="ts_contact clear_fix" id="ts_contact' + e + '" onclick="return TopSearch.select(this, event, ' + d + ');" onmousedown="event.cancelBubble = true;" onmouseover="TopSearch.itemOver(this, 1, event);"  onmouseout="TopSearch.itemOver(this, 0, event);" hinttype="' + r + '"><span class="ts_contact_photo ' + onlinePlatformClass(i) + '"><img class="ts_contact_img" src="' + o + '"/></span><span class="ts_contact_name fl_l"><div class="ts_contact_title_wrap' + (l ? " is_verified" : "") + '"><span class="ts_contact_title">' + n + "</span></div>" + l + '<div class="ts_contact_info">' + s + '</div></span><div class="ts_contact_status"></div></a>'
            },
            searchLists: function(e) {
                var t = TopSearch,
                    o = {};
                return o = e ? {
                    friends: {
                        order: 0,
                        count: t.maxItems - 1,
                        label: getLang("global_friends")
                    },
                    groups: {
                        order: 1,
                        count: 4,
                        label: getLang("global_communities")
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
                        label: getLang("global_apps")
                    },
                    chats: {
                        order: 3,
                        count: t.maxItems - 1,
                        label: getLang("global_chats")
                    },
                    search: {
                        order: 4,
                        count: t.maxItems - 1,
                        label: getLang("head_search_results")
                    }
                } : {
                    friends: {
                        order: 0,
                        count: t.maxItems,
                        label: getLang("global_friends")
                    }
                }
            },
            initListsHtml: function() {
                TopSearch.listsHtml = []
            },
            addToListsHtml: function(e, t, o) {
                var n = TopSearch,
                    i = n.searchLists(o),
                    a = (i[e] || {}).parent || e,
                    r = i[a] || {},
                    s = r.order || 0,
                    l = r.label || "";
                n.listsHtml[s] = n.listsHtml[s] || (o && l ? ['<div class="ts_search_sep">' + l + "</div>"] : []), n.listsHtml[s].push(t)
            },
            htmlRows: function(e) {
                var t = TopSearch,
                    o = [],
                    n = "";
                for (var i in t.listsHtml) o.push(t.listsHtml[i].join(""));
                if (e) {
                    var a = (e.length > 27 ? e.substr(0, 25) + ".." : e, "#" == e[0] ? "statuses" : "auto"),
                        r = "#" == e[0] ? getLang("global_news_search_results") : getLang("global_show_all_results");
                    n += '<a href="/search?c[section]=' + a + "&c[q]=" + encodeURIComponent(e) + '" class="ts_search_link clear_fix active" id="ts_search_link" onclick="return TopSearch.select(this, event);" onmousedown="event.cancelBubble = true;" onmouseover="TopSearch.itemOver(this, 1, event);"  onmouseout="TopSearch.itemOver(this, 0, event);" ><span class="ts_contact_name fl_l">' + r + '</span><div class="ts_contact_status "></div></a>'
                }
                return n + o.join("")
            },
            prepareRows: function(e) {
                var t = TopSearch,
                    o = "",
                    n = t.maxItems,
                    i = ge("ts_cont_wrap");
                if (geByClass1("active", i), !i || !vk.id) return !1;
                if (cur.tsStr && cur.tsStr == e && !t.forceUpdate) return !1;
                delete t.forceUpdate, t.initListsHtml();
                var a, r = {};
                e && (a = [], each(this.getSimilarQueries(e), function() {
                    a.push(escapeRE(this))
                }), a = new RegExp("([ -]|^|s|&nbsp;|\b)(" + a.join("|") + ")", "gi"), cur.lastRe = a, n--), each(t.searchLists(e), function(o, i) {
                    if (t.cache[o]) {
                        var s = i.count,
                            l = t.listSearch(o, e, s, r),
                            d = [],
                            c = 0;
                        if (!isEmpty(l)) {
                            for (var u in l) {
                                if (!n || c >= s) break;
                                d.push(l[u]), n--, c++
                            }
                            if (d.length)
                                for (var u in d) {
                                    var h, p = d[u][1],
                                        f = intval(d[u][0]),
                                        w = f > 0 ? t.onlines()[f] : !1,
                                        _ = p[0],
                                        v = p[2],
                                        g = p[4],
                                        m = p[5],
                                        b = "search" == o ? p[3] : "h_" + o;
                                    h = t.row(f, v, p[1], _, w, a, b, g, m), t.addToListsHtml(o, h, e), r[f] = 1
                                }
                        }
                    }
                }), i.innerHTML = t.htmlRows(e), n && e && "#" != e[0] && this.hintsSearch(e, cur.lastRe || !1), (o || e) && (cur.tsStr = e)
            },
            hintsSearch: function(e, t) {
                var o, n, i, a = TopSearch,
                    r = ge("ts_input"),
                    s = ge("ts_cont_wrap");
                ajax.post("al_search.php", {
                    act: "get_pages_hints",
                    q: e
                }, {
                    cache: 1,
                    onDone: function(l) {
                        if (trim(val(r)) != e) return !1;
                        if (!l) return !1;
                        var d = a.maxItems - geByClass("ts_contact", s).length - 1,
                            c = {};
                        each(l, function(o) {
                            var n = intval(o),
                                r = this[0],
                                s = this[2],
                                l = this[3],
                                u = this[4],
                                h = this[5],
                                p = a.searchLists(e),
                                f = l.replace("h_", ""),
                                w = (p[f] || {}).parent || f;
                            if (void 0 === p[w] && (w = "search"), c[w] = c[w] || {}, c[w][o] = this, a.lists[w] = a.lists[w] || {}, a.lists[w][o] = this, ge("ts_contact" + n)) return !0;
                            if (!d--) return !1;
                            var _ = a.row(n, s, this[1], r, !1, t, l, u, h);
                            return a.addToListsHtml(w, _, e), i = !0, !0
                        });
                        for (var u in c) a.updateCache(u, c[u], !0);
                        i && (o = geByClass1("active", s), n = o ? o.id : "", s.innerHTML = a.htmlRows(e), n && ge(n) && addClass(ge(n), "active"))
                    }
                })
            },
            writeBox: function(e) {
                window.curFastChat && curFastChat.inited && window.FastChat ? FastChat.selectPeer(e) : e > 0 && 2e9 > e ? showWriteMessageBox(!1, e) : nav.go("/im?sel=" + e)
            }
        }, window._topHeaderClose = function(e) {
            window.headerDestroy && window.headerDestroy(), window.headerDestroy = e
        }, window._topHeaderClearClose = function() {
            delete window.headerDestroy
        }, window.mentionOver = function(e, t) {
            t = t || {}, showTooltip(e, {
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
                appendEl: domClosest("im-page-history-w", e) || domClosest("rb_box_wrap", e) || domClosest("wk_cont", e) || domClosest("scroll_fix_wrap", e)
            })
        }, window.mentionClick = function(e, t, o) {
            e && e.tt && e.tt.hide && e.tt.hide({
                fasthide: 1
            });
            var n = e,
                i = !1;
            if (n.tagName && "a" == n.tagName.toLowerCase() && !n.getAttribute("target") && !nav.baseBlank) {
                o = o || {};
                var a = n.getAttribute("hrefparams");
                a && (o.params = extend(o.params || {}, q2ajx(a))), n = n.href || "", n = n.replace(/^https?:\/\//i, ""), n.indexOf(location.hostname) || (n = n.replace(location.hostname, "")), n = n.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/");
                var r;
                n.match(/#$/) || !(r = n.match(/^\/(.*?)(\?|#|$)/)) ? i = !0 : (r = r[1], (r.indexOf(".php") > 0 || r.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images|utils|\.js|js\/|\.css|css\/)/)) && (i = !0))
            }
            if (i) {
                var s = !!(o && o.params && o.params._post && o.params._post_click_type);
                if (!s) return !0;
                e.setAttribute("data-change-location-with-post-away", 1), n = e
            }
            return nav.go(n, t, o)
        }, window.headPlayPause = function(e) {
            var t = currentAudioId();
            if (t || (t = ls.get("audio_id"), t && (window.padPlClicked = !0)), t) playAudioNew(t);
            else {
                var o = padAudioPlaylist();
                o && o.start ? playAudioNew(o.start) : (addClass(ge("head_play_btn"), "playing"), window.onPlaylistLoaded = function() {
                    var e = padAudioPlaylist();
                    e && e.start && playAudioNew(e.start)
                })
            }
            e && cancelEvent(e)
        }, window.menuSettings = function(e) {
            return showTabbedBox("al_settings.php", {
                act: "menu_box",
                type: e
            })
        }, window._postsSeen = {}, window._postsSaved = {}, window._postsSaveTimer = void 0, window._postsSendTimer = void 0, window._postsCleanTimer = void 0, window._postsSeenModules = {}, window._postsExtras = {}, window.mobilePromo = showBox.pbind("al_login.php", {
            act: "mobile",
            box: 1
        }), window.mobileOnlineTip = function(e, t) {
            var o = t.asrtl ? 0 : t.right ? 289 : 35,
                n = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
            return showTooltip(e, {
                url: "al_login.php",
                params: {
                    act: "mobile_tt",
                    mid: t.mid,
                    was: t.was,
                    vk_mobile: t.vk_mobile
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
                className: "mobile_tt" + n
            })
        }, window.pageVerifiedTip = function(e, t) {
            return showTooltip(e, {
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
        }, window.cssAnim = function(e, t, o, n) {
            var i = intval(browser.version);
            if (e && (browser.chrome && i > 14 || browser.mozilla && i > 13 || browser.opera && i > 2)) {
                var a, r = "all " + o.duration + "ms " + (o.func || "ease-out");
                e.style.WebkitTransition = r, e.style.MozTransition = r, e.style.OTransition = r, e.style.transition = r;
                var a = function s() {
                    return browser.opera && intval(browser.version) <= 12 ? e.removeEventListener("oTransitionEnd", s) : removeEvent(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", s), e.style.WebkitTransition = "", e.style.MozTransition = "", e.style.OTransition = "", e.style.transition = "", n && n(), !1
                };
                n && (browser.opera && intval(browser.version) <= 12 ? e.addEventListener("oTransitionEnd", a) : addEvent(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", a)), setTimeout(setStyle.pbind(e, t), 0)
            } else animate(e, t, extend(o, {
                onComplete: n
            }))
        }, window.imagesLoader = function(e, t) {
            function o(e, t) {
                a[e] && (--r, delete a[e]), t || d.processLoad()
            }

            function n(t) {
                var o = 0,
                    n = t;
                if (n && n.offsetParent)
                    do
                        if (o += n.offsetTop, e && n.offsetParent === e) break; while (n = n.offsetParent);
                return o
            }
            var i = {
                    top_load: 0,
                    bottom_load: 2,
                    load_limit: 10,
                    need_load_class: "__need_load",
                    skip_process_load: !1,
                    use_iframe: !1
                },
                a = [],
                r = 0,
                s = null,
                l = extend(i, t),
                d = {};
            return d.processLoad = function() {
                for (var t in a) {
                    var i = a[t],
                        c = i[0],
                        u = i[1];
                    (u.width || u.height || vkNow() - c > 2e4) && a[t] && o.call(u, t, !0)
                }
                if (clearTimeout(s), r && (s = setTimeout(d.processLoad, 500)), !(r >= l.load_limit)) {
                    var h = geByClass(l.need_load_class, e || bodyNode),
                        p = [];
                    if (e && h.length) var f = e.offsetHeight,
                        w = e.scrollTop - f * l.top_load,
                        _ = e.scrollTop + f * l.bottom_load;
                    for (var v = 0, g = h.length; g > v && r < l.load_limit; v++) {
                        var u = h[v];
                        if ("IMG" == u.tagName) {
                            var t = u.getAttribute("data-src");
                            if (t) {
                                if (e) {
                                    var m = n(u),
                                        b = m + u.parentNode.offsetHeight;
                                    if (m > _) continue;
                                    if (w > b) continue
                                }
                                p.push([u, t])
                            }
                        }
                    }
                    each(p, function() {
                        var e = this[0],
                            t = this[1];
                        d.iloader && d.iloader.add(t, o, e), e.src = t, e.removeAttribute("data-src"), removeClass(e, l.need_load_class), a[t] || (++r, a[t] = [vkNow(), e])
                    }), clearTimeout(s), r && (s = setTimeout(d.processLoad, 500))
                }
            }, d.destroy = function() {
                a = [], r = 0, clearTimeout(s)
            }, l.use_iframe && window.IframeLoader && (d.iloader = new IframeLoader), l.skip_process_load || d.processLoad(), d
        }, window.IframeLoader = function() {
            function e(e) {
                if (browser.mozilla) return !1;
                try {
                    return e.contentDocument ? e.contentDocument : e.contentWindow && e.contentWindow.document ? e.contentWindow.document : e.document
                } catch (t) {}
                return !1
            }

            function t(e) {
                return l && l.body ? '<img id="___img' + e + '" />' : '<img class="___img' + e + '" />'
            }

            function o(e) {
                return l && l.body ? l.getElementById("___img" + e) : geByClass1("___img" + e, d)
            }

            function n() {
                s = utilsNode.appendChild(ce("iframe")), l = e(s), d = l && l.body ? l.body : utilsNode.appendChild(ce("div", {}, {
                    display: "none"
                })), c = 0, u = []
            }

            function i(e, n, i) {
                var a = c++;
                u[a] = {
                    src: e,
                    onLoad: n,
                    that: i
                }, d.appendChild(ce("div", {
                    innerHTML: t(a)
                }));
                var r = o(a);
                return r.src = e, r.onload = function() {
                    var e = u[a];
                    e && (e.onLoad && e.onLoad.call(e.that || window, e.src), delete u[a], d.removeChild(o(a).parentNode))
                }, r
            }

            function a() {
                re(s), h = [];
                for (var e in u) h.push(u[e]);
                n()
            }

            function r(e) {
                if (!h) return [];
                var t = [];
                for (var o in h) {
                    var n = h[o];
                    i(n.src, n.onLoad, n.that), t.push(n.that)
                }
                if (h = null, e) {
                    var a = [];
                    each(t, function() {
                        a.push([this, this.src]), this.src = "", hide(this)
                    }), setTimeout(function() {
                        each(a, function() {
                            var e = this[0],
                                t = this[1];
                            e.src = t, show(e)
                        })
                    }, 10)
                }
                return t
            }
            var s, l, d, c, u, h;
            return n(), {
                add: i,
                abort: a,
                repeat: r
            }
        }, window.getCaretBoundingRect = function(e) {
            var t = e.getBoundingClientRect(),
                o = null,
                n = null;
            if (t.top === t.bottom) return {
                left: 0,
                top: 0,
                bottom: 0
            };
            if (document.selection) n = document.selection.createRange(), o = n.getClientRects() || [], o.length || (n.text = "_", n.moveStart("character", -1), o = n.getClientRects(), n.text = ""), o = o[o.length - 1];
            else if (window.getSelection) {
                var i = getSelection();
                if (n = i.getRangeAt(0), n.collapsed) {
                    var a = n.startOffset;
                    n.setStart(n.startContainer, 0), o = n.getClientRects(), n.setStart(n.startContainer, a)
                }
                o = o && o.length ? o[o.length - 1] : {
                    right: t.left,
                    top: t.top,
                    bottom: t.top
                }
            }
            return {
                left: o.right - t.left,
                top: o.top - t.top,
                bottom: o.bottom - t.top
            }
        }, window.getSelectionText = function() {
            var e = "";
            return window.getSelection ? e = window.getSelection().toString() : document.selection && "Control" != document.selection.type && (e = document.selection.createRange().text), e
        }, window.aquireLock = function(e, t, o) {
            var n = "lockkk_" + e;
            if (ls.get(n) !== !0) {
                ls.set(n, !0);
                try {
                    t()
                } catch (i) {}
                return void ls.set(n, !1)
            }
            ls.checkVersion() ? o || setTimeout(aquireLock.pbind(e, t, !0), 100) : t()
        }, window.statNavigationTiming = function() {
            if (window.clientStatsInitedNT) return !1;
            if (window.performance && performance.timing) {
                if (Math.random() > .001 && !__dev) return !1;
                var e = {},
                    t = window.cur && window.cur.module;
                performance.timing.redirectStart && performance.timing.redirectEnd && (e.redirect = performance.timing.redirectEnd - performance.timing.redirectStart), performance.timing.domainLookupStart && performance.timing.domainLookupEnd && (e.domainLookup = performance.timing.domainLookupEnd - performance.timing.domainLookupStart), performance.timing.connectStart && performance.timing.connectEnd && (e.connect = performance.timing.connectEnd - performance.timing.connectStart, performance.timing.secureConnectionStart && (e.secureConnection = performance.timing.connectEnd - performance.timing.secureConnectionStart)), performance.timing.requestStart && performance.timing.responseStart && (e.request = performance.timing.responseStart - performance.timing.requestStart, performance.timing.responseEnd && (e.response = performance.timing.responseEnd - performance.timing.responseStart)), performance.timing.unloadEventStart && performance.timing.unloadEventEnd && (e.unloadEvent = performance.timing.unloadEventEnd - performance.timing.unloadEventStart), performance.timing.domLoading && performance.timing.domComplete && (e.processing = performance.timing.domComplete - performance.timing.domLoading), performance.timing.domContentLoadedEventStart && performance.timing.domContentLoadedEventEnd && (e.domContentLoadedEvent = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart), performance.timing.loadEventStart && performance.timing.loadEventEnd && (e.loadEvent = performance.timing.loadEventEnd - performance.timing.loadEventStart), performance.timing.loadEventEnd && performance.timing.responseEnd && (e.resource = performance.timing.loadEventEnd - performance.timing.responseEnd);
                for (var o in e) statlogsValueEvent("navigation_timing", e[o], o, t);
                window.clientStatsInitedNT = !0
            }
        }, window.statDurationsLoadImage = function() {
            if (Math.random() < .001 && window.performance && window.performance.getEntriesByType) {
                if (window.clientStatsInited) return !1;
                var e = window.performance.getEntriesByType("resource");
                if (!e) return !1;
                for (var t = {}, o = {}, n = 0; n < e.length; n++)
                    if (e[n] && "img" == e[n].initiatorType)
                        if (e[n].duration < 100) t["<100"] = (t["<100"] || 0) + 1;
                        else if (e[n].duration < 250) t["100-250"] = (t["100-250"] || 0) + 1;
                else if (e[n].duration < 500) t["250-500"] = (t["250-500"] || 0) + 1;
                else if (e[n].duration < 1e3) t["500-1000"] = (t["500-1000"] || 0) + 1;
                else if (e[n].duration < 2e3) t["1000-2000"] = (t["1000-2000"] || 0) + 1;
                else if (e[n].duration < 5e3) t["2000-5000"] = (t["2000-5000"] || 0) + 1;
                else if (t[">5000"] = (t[">5000"] || 0) + 1, e[n].name && e[n].name.indexOf("pp.vk.me") > 0) {
                    var i = "";
                    i = e[n].name, i = i.substr(i.indexOf("pp.vk.me") + 9), i.indexOf("/") > 0 && (i = i.substr(0, i.indexOf("/")), o[i] = (o[i] || 0) + 1)
                }
                for (var a in t) statlogsValueEvent("img_load", t[a], a);
                for (var a in o) statlogsValueEvent("img_slow", o[a], a);
                window.clientStatsInited = !0
            }
        }, window.getProgressBarEl = function(e) {
            return geByClass1("ui_progress_bar", e)
        }, window.onLoaded = function(e) {
            vk.loaded ? e() : addEvent(window, "load", e)
        }, window.currentModule = function() {
            return cur.currentModule ? cur.currentModule() : cur.module
        }, window.formatTime = function(e, t) {
            var o, n, i;
            return e = Math.max(e, 0), n = Math.floor(e % 60), o = 10 > n ? "0" + n : n, e = Math.floor(e / 60), i = e % 60, o = i + ":" + o, e = Math.floor(e / 60), (e > 0 || t) && (10 > i && (o = "0" + o), o = e + ":" + o), o
        }, window.debounce = function(e, t, o) {
            var n;
            return function() {
                var i = this,
                    a = arguments,
                    r = function() {
                        n = null, o || e.apply(i, a)
                    },
                    s = o && !n;
                clearTimeout(n), n = setTimeout(r, t), s && e.apply(i, a)
            }
        }, window.throttle = function(e, t) {
            var o;
            return function() {
                o || (e.apply(this, arguments), o = setTimeout(function() {
                    o = !1
                }, t))
            }
        }, window.shuffle = function(e) {
            for (var t, o, n = e.length; n > 0;) o = Math.floor(Math.random() * n), n--, t = e[n], e[n] = e[o], e[o] = t;
            return e
        }, window.getProgressHtml = function(e, t) {
            return rs(vk.pr_tpl, {
                id: e || "",
                cls: t || ""
            })
        }, window.showProgress = function(e, t, o, n) {
            if (e = ge(e)) {
                var i;
                return hasClass(e, "pr") ? i = e : (i = se(rs(vk.pr_tpl, {
                    id: t || "",
                    cls: o || ""
                })), n ? domInsertBefore(i, e) : e.appendChild(i)), setTimeout(function() {
                    setStyle(i, {
                        opacity: 1
                    })
                }), i
            }
        }, window.hideProgress = function(e) {
            e && (hasClass(e, "pr") ? setStyle(e, {
                opacity: 0
            }) : re(geByClass1("pr", e)))
        }, window.disableEl = function(e) {
            setStyle(e, "pointer-events", "none")
        }, window.enableEl = function(e) {
            setStyle(e, "pointer-events", "")
        }, window.isToday = function(e) {
            var t = new Date;
            return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
        }, window.isYesterday = function(e) {
            var t = new Date(e.getTime() + 864e5);
            return isToday(t)
        }, window.isTomorrow = function(e) {
            var t = new Date(e.getTime() - 864e5);
            return isToday(t)
        }, window.isSameDate = function(e, t) {
            var o = new Date(e),
                n = new Date(t);
            return o.getFullYear() === n.getFullYear() && o.getMonth() === n.getMonth() && o.getDate() === n.getDate()
        }, window.leadingZero = function(e) {
            return e >= 10 ? e : "0" + e
        }, window.hashCode = function(e) {
            var t = 0;
            if (0 === e.length) return t;
            for (var o = 0, n = e.length; n > o; o++) {
                var i = e.charCodeAt(o);
                t = (t << 5) - t + i, t |= 0
            }
            return t
        }, window.onlinePlatformClass = function(e) {
            var t = " _online";
            return e && (t += " online"), mobPlatforms[e] && (t += " mobile"), updateOnlineText(), t
        }, window.toggleOnline = function(e, t) {
            var o = ["online", "mobile", "_online"],
                n = onlinePlatformClass(t).split(" "),
                i = [];
            o.forEach(function(t) {
                inArray(t, n) && !hasClass(e, t) ? i.push(t) : !inArray(t, n) && hasClass(e, t) && removeClass(e, t)
            }), i.length > 0 && addClass(e, i.join(" "))
        }, window.updateAriaElements = function() {
            updateOnlineText(), updateAriaCheckboxes(), updateAriaRadioBtns()
        }, window.updateOnlineText = function() {
            clearTimeout(cur.updateOnlineTO), cur.updateOnlineTO = setTimeout(function() {
                each(geByClass("_online"), function() {
                    var e, t = geByClass1("_online_reader", this) || this,
                        o = hasClass(this, "online"),
                        n = hasClass(this, "mobile"),
                        i = geByTag("img", t),
                        a = "",
                        r = function(e) {
                            var t = domClosest("_post", e),
                                o = t && domByClass(t, "author");
                            return o ? o.innerText || o.textContent : ""
                        };
                    o ? (each(i, function() {
                        e = attr(this, "alt") || attr(this, "data-alt") || r(this), e && (a = trim(a + " " + e), this.setAttribute("data-alt", e), this.removeAttribute("alt"))
                    }), a = trim(a + " " + (n ? getLang("global_user_is_online_mobile") : getLang("global_user_is_online"))), t.setAttribute("aria-label", a)) : (each(i, function() {
                        e = attr(this, "data-alt") || r(this), e && (this.setAttribute("alt", e), this.removeAttribute("data-alt"))
                    }), t.removeAttribute("aria-label"))
                })
            }, 100)
        }, window.updateAriaCheckboxes = function() {
            clearTimeout(cur.updateChkBoxTO), cur.updateChkBoxTO = setTimeout(function() {
                var e = ["checkbox", "checkbox_pic"],
                    t = [];
                each(e, function() {
                    t = t.concat(geByClass(this))
                }), each(t, function() {
                    "DIV" !== this.tagName || this.getAttribute("role") || (this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", isChecked(this) ? "true" : "false"), this.setAttribute("tabindex", 0))
                })
            }, 100)
        }, window.updateAriaRadioBtns = function() {
            clearTimeout(cur.updateRadioBtnsTO), cur.updateRadioBtnsTO = setTimeout(function() {
                var e = [],
                    t = geByClass("radiobtn");
                each(t, function() {
                    if ("DIV" === this.tagName && !this.getAttribute("role")) {
                        var t = isChecked(this);
                        this.setAttribute("role", "radio"), this.setAttribute("aria-checked", t ? "true" : "false"), this.setAttribute("tabindex", t ? 0 : -1);
                        var o = getRadioBtnWrap(this);
                        ~e.indexOf(o) || e.push(o)
                    }
                }), each(e, function() {
                    var e = geByClass("on", this);
                    if (!e.length) {
                        var t = geByClass("radiobtn", this);
                        t.length && t[0].setAttribute("tabindex", 0)
                    }
                })
            }, 100)
        }, window.getRadioBtnWrap = function(e) {
            for (var t = e, o = 0, n = 5; n > o && t !== document;) {
                t = domPN(t);
                var i = geByClass("radiobtn", t);
                if (i.length > 1) break;
                o++
            }
            return t
        }, window.isFullScreen = function() {
            return !!(document.fullscreenElement || document.fullScreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || cur.pvPartScreen)
        }, window.extractPercentile = function(e, t) {
            for (var o = 0; o < t.length; o++) {
                var n = t[o];
                if (">" === n) n = ">" + t[o - 1];
                else {
                    if (1e3 * n > e) {
                        n = "<" + n;
                        break
                    }
                    n = !1
                }
            }
            return n
        }, window.collectMemtoryStats = function() {
            var e = {},
                t = [15, 60, 300, 1500, 5e3, 1e4, 15e3, 2e4, 25e3, 3e4],
                o = [300, 1500, 5e3, 3e4, 6e4, 12e4, ">"],
                n = !1;
            setInterval(function() {
                var i = window.cur && window.cur.module;
                i !== n && (e = {}, n = i);
                var a = window.vkLastNav;
                if (i && a) {
                    var r = (Date.now() - a, extractPercentile(Date.now() - a, t));
                    if (r && !e[r]) {
                        var s = extractPercentile(Date.now() - window.vkTabLoaded, o);
                        e[r] = !0;
                        var l = performance.memory.usedJSHeapSize;
                        statlogsValueEvent("js_memory_stats_modules", l, i, r, s)
                    }
                }
            }, 5e3)
        }, window.performance && window.performance.memory && rand(0, 100) < 5 && collectMemtoryStats(), window.isPhotoeditor3Available = function() {
            return browser.msie ? parseInt(browser.version) > 10 : !0
        }, window.cancelStackFilter = function(e, t) {
            var o = window.cancelStack || [];
            return t && _topHeaderClearClose(), window.cancelStack = o.filter(function(t) {
                return t.name !== e
            }), window.cancelStack
        }, window.cancelStackPush = function(e, t, o) {
            return o && _topHeaderClose(function() {
                t(), cancelStackFilter(e)
            }), window.cancelStack || [], window.cancelStack = cancelStackFilter(e).concat([{
                func: t,
                name: e,
                dclick: o
            }]), window.cancelStack
        }, window.cancelStackPop = function() {
            var e = window.cancelStack || [];
            _topHeaderClearClose(), e.length > 0 && e.pop().func();
            var t = e[e.length - 1];
            return t && t.dclick && _topHeaderClose(function() {
                t.func(), cancelStackFilter(t.name)
            }), window.cancelStack = e, window.cancelStack
        }, window.hasAccessibilityMode = function() {
            return !(!window.vk || !vk.a11y)
        }, window.AudioMessagePlayer = {
            loaded: !1,
            togglePlay: function(e, t) {
                stManager.add("voice_message_player.js", function() {
                    window.AudioMessagePlayer.togglePlay(e, t)
                })
            },
            detachPlayer: function(e) {
                stManager.add("voice_message_player.js", function() {
                    window.AudioMessagePlayer.detachPlayer(e)
                })
            }
        }, window.repaintFixedElements = function(e) {
            var t = "safari-repaint";
            e.forEach(function(e) {
                hasClass(e, t) && removeClass(e, t), addClass(e, t)
            }), setTimeout(function() {
                e.forEach(function(e) {
                    removeClass(e, t)
                })
            }, 100)
        }, window.setWorkerTimeout = function(e, t) {
            if (window.Worker && window.Blob) {
                var o = new Blob(["         var timeout;         onmessage = function(e) {           clearTimeout(timeout);           if (e.data == 'start') {             timeout = setTimeout(function() { postMessage({}); }, " + t + ");           }         }       "]);
                try {
                    var n = new Worker(window.URL.createObjectURL(o));
                    n.onmessage = function() {
                        n.terminate(), e()
                    }, n.postMessage("start")
                } catch (i) {
                    return setTimeout(e, t)
                }
                return n
            }
            return setTimeout(e, t)
        }, window.clearWorkerTimeout = function(e) {
            return e ? void(isNumeric(e) ? clearTimeout(e) : e.terminate()) : !1
        }, window.getStatusExportHash = function() {
            return vk.statusExportHash
        }, window.getPageHeaderHeight = function() {
            var e;
            return function() {
                return e = e || ge("page_header").offsetHeight
            }
        }(),
        function() {
            function e() {
                de ? (addEvent(window, "blur", r), addEvent(window, "focus", s), onDomReady(function() {
                    setTimeout(t, 500)
                }), window.LongView = {
                    register: n,
                    onScroll: throttle(i, 50),
                    onBeforePageChange: l,
                    clearElemsCache: o,
                    _debug: function() {
                        return {
                            started: ue,
                            tracking: ce,
                            viewedData: he,
                            viewIndexes: xe,
                            blindTop: fe,
                            blindBottom: we
                        }
                    }
                }) : window.LongView = {
                    register: function() {},
                    onScroll: function() {},
                    onBeforePageChange: function() {},
                    clearElemsCache: function() {}
                }
            }

            function t() {
                var e = T();
                e.length && (m(e), L())
            }

            function o() {
                ce.forEach(function(e) {
                    e[te] = !1
                })
            }

            function n(e, t) {
                "im" === t && !e[$] && y(e) && (e[$] = b(e), e[Q] = t, ce.push(e))
            }

            function i(e, t) {
                var o = i,
                    n = e || scrollGetY(),
                    r = t || window.innerHeight;
                d(n, r), _e ? (clearTimeout(o.timer), o.timer = setTimeout(a, 150)) : (_e = !0, u(), E())
            }

            function a() {
                u(), c(), _e = !1
            }

            function r() {
                u(), g()
            }

            function s() {
                he = [], ue.forEach(function(e) {
                    e[J] = Date.now()
                }), x(null), k(null), c()
            }

            function l() {
                u(), g(), he = [], ue = [], x(null), k(null)
            }

            function d(e, t) {
                var o = [];
                ce.forEach(function(n) {
                    return I(n) ? void o.push(n) : void(h(n, e, t) ? (n[J] = Date.now(), ue.push(n)) : p(n, e, t) && (n[Z] ? delete n[Z] : (H(ue, n), he = he.concat(N(n))), delete n[J]))
                }), o.forEach(function(e) {
                    H(ce, e)
                })
            }

            function c() {
                ve = setTimeout(f, z), me = setTimeout(w, Y), be = setTimeout(_, U), ye = setTimeout(v, G)
            }

            function u() {
                clearTimeout(ve), clearTimeout(me), clearTimeout(be), clearTimeout(ye)
            }

            function h(e, t, o) {
                return !e[J] && B(e, q, t, o)
            }

            function p(e, t, o) {
                return e[J] && !B(e, O, t, o)
            }

            function f() {
                he.length && x(he)
            }

            function w() {
                m(he), he = [], x(null)
            }

            function _() {
                ue.length && (k(P(ue, !0, !0)), be = setTimeout(_, K))
            }

            function v() {
                clearTimeout(be), m(P(ue)), ue.forEach(function(e) {
                    e[Z] = !0
                }), ue = [], k(null)
            }

            function g() {
                m(he.concat(P(ue)))
            }

            function m(e) {
                e && e.length && ajax.post("/al_page.php", {
                    act: "seen",
                    data: A(e),
                    long_view: 1
                })
            }

            function b(e) {
                var t = e && domFC(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? re : ae
            }

            function y(e) {
                if (hasClass(e, "im-mess--post")) return !0;
                var t = e && domFC(e);
                return !t || "ads_feed_placeholder" === t.getAttribute("id") || hasClass(e, "no_posts") ? !1 : !0
            }

            function x(e) {
                C(se, e)
            }

            function k(e) {
                C(le, e)
            }

            function C(e, t) {
                var o = ls.get(e) || {};
                t ? o[pe] = t : delete o[pe], ls.set(e, o)
            }

            function T() {
                var e = T,
                    t = [],
                    o = ls.get(se) || {},
                    n = ls.get(le) || {};
                return e.iterator || (e.iterator = function(e) {
                    return function(o) {
                        S(o) && (t = t.concat(e[o]))
                    }
                }), Object.keys(o).forEach(e.iterator(o)), Object.keys(n).forEach(e.iterator(n)), t
            }

            function L() {
                var e = L,
                    t = ls.get(se) || {},
                    o = ls.get(le) || {};
                e.iterator || (e.iterator = function(e) {
                    return function(t) {
                        S(t) && delete e[t]
                    }
                }), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), ls.set(se, t), ls.set(le, o)
            }

            function S(e) {
                var t = Number(e);
                return t !== pe && Date.now() - t >= X
            }

            function E() {
                if ("/im" === location.pathname) {
                    var e = geByClass1("im-page--chat-header"),
                        t = geByClass1("im-page--chat-input");
                    fe = e.getBoundingClientRect().top + e.offsetHeight, we = window.innerHeight - t.getBoundingClientRect().top
                } else fe = ge("page_header").offsetHeight, we = 0
            }

            function B(e, t, o, n) {
                if (!e) return !1;
                e[te] || (e[te] = !0, e[oe] = e.offsetHeight, e[ne] = o + e.getBoundingClientRect().top, e[ie] = e[ne] + e[oe]);
                var i = n - fe - we,
                    a = o + fe,
                    r = o + n - we,
                    s = e[oe],
                    l = e[ne],
                    d = e[ie],
                    c = d > a && r > l ? Math.min(r, d) - Math.max(a, l) : 0;
                return c >= Math.min(i * t, s * t)
            }

            function A(e) {
                var t = {},
                    o = [];
                e.forEach(function(e) {
                    var o = e.ownerId,
                        n = "ad" === o ? "" : ":" + e.duration + ":" + e.index;
                    t[o] || (t[o] = []), t[o].push(e.module + e.postId + n + (e.sessionId ? ":" + e.sessionId : "") + (e.q ? ":" + e.q : "") + (":" + e.viewIndex))
                });
                for (var n in t) o.push(n + "_" + t[n].join(","));
                return o.join(";")
            }

            function P(e, t, o) {
                var n = [];
                return e.forEach(function(e) {
                    n = n.concat(N(e, t, o))
                }), n
            }

            function N(e, t, o) {
                if (I(e)) return [];
                var n = Math.min(W, Date.now() - e[J]);
                if (e[$] === ae && V > n || e[$] === re && R > n) return [];
                o || (e[ee] = !0);
                var i, a, r, s, l = M(e),
                    d = j(l.module),
                    c = cur.feed_session_id || "na",
                    u = [];
                for (s in l)
                    if ("index" !== s && "module" !== s && "q" !== s) {
                        if (r = s.split("_"), i = r[0], a = r[1], "ads" === i && a === r[3], /^post\d+$/.test(i) && (i = r[1], a = r[2]), !t) {
                            var h = i + "_" + a;
                            xe[h] || (xe[h] = 0), xe[h]++
                        }
                        u.push("ad" === i ? {
                            ownerId: "ad",
                            postId: a,
                            module: d,
                            viewIndex: xe[h]
                        } : "ads" === i ? {
                            ownerId: "ads",
                            postId: a,
                            module: d,
                            index: l.index,
                            duration: n,
                            sessionId: c,
                            viewIndex: xe[h]
                        } : {
                            ownerId: i,
                            postId: (1 === l[s] ? "" : "-") + a,
                            module: d,
                            index: l.index,
                            duration: n,
                            sessionId: c,
                            q: l.q || null,
                            viewIndex: xe[h]
                        })
                    }
                return u
            }

            function M(e) {
                var t = e[Q];
                if ("im" === t) {
                    var o = attr(e, "data-post-id"),
                        n = attr(e, "data-copy"),
                        i = {
                            index: -1,
                            module: "im"
                        };
                    return o && (i[o] = -1), n && (i[n] = -1), i
                }
                try {
                    return window[t].postsGetRaws(e)
                } catch (a) {
                    return console.error("Unable to extract data from elem", e), []
                }
            }

            function j(e) {
                var t = "feed_other" === e ? "feed_" + cur.section : e;
                return {
                    feed: "f",
                    "public": "c",
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
                }[t] || "u"
            }

            function I(e) {
                return "page_view" === de && e[ee] || !document.body.contains(e)
            }

            function H(e, t) {
                var o = e.indexOf(t);
                o >= 0 && e.splice(o, 1)
            }
            var F = 1e3,
                D = 60 * F,
                q = .5,
                O = .25,
                V = .3 * F,
                R = 1 * F,
                W = 5 * D,
                z = 2.5 * F,
                Y = 5 * F,
                U = 6 * F,
                G = 20 * F,
                K = 1 * F,
                X = 6 * D,
                $ = "_longViewType",
                Z = "_longViewIdled",
                Q = "_longViewModule",
                J = "_longViewStarted",
                ee = "_longViewProcessed",
                te = "_longViewCached",
                oe = "_longViewHeight",
                ne = "_longViewTop",
                ie = "_longViewBottom",
                ae = "REGULAR",
                re = "AUTOPLAY_AD",
                se = "LongView.viewed",
                le = "LongView.idled",
                de = vk.longViewTestGroup,
                ce = [],
                ue = [],
                he = [],
                pe = Date.now(),
                fe = 0,
                we = 0,
                _e = !1,
                ve = null,
                me = null,
                be = null,
                ye = null,
                xe = {};
            e()
        }(), window.parallel = function() {
            var e = [].slice.call(arguments),
                t = e.pop(),
                o = new callHub(t, e.length);
            each(e, function(e, t) {
                t(function() {
                    o.done()
                })
            })
        }, window.shareAudioPlaylist = function(e, t, o, n) {
            return showBox("like.php", {
                act: "publish_box",
                object: "audio_playlist" + t + "_" + o,
                list: n
            }, {
                stat: ["wide_dd.js", "wide_dd.css", "sharebox.js"]
            }), cancelEvent(e)
        }, window.audioSearchPerformer = function(e, t) {
            var o = gpeByClass("_audio_row", e),
                n = AudioUtils.getAudioFromEl(o, !0),
                i = window.AudioPage ? currentAudioPage(o) : !1,
                a = window.AudioPage && currentAudioPage(o) || cur.audioPage;
            return layers.fullhide && layers.fullhide(!0), setTimeout(function() {
                if (a) {
                    var o = unclean(n.performer).replace(/<em>|<\/em>/g, "");
                    nav.change({
                        q: o,
                        performer: 1
                    }, t, {
                        searchPerformer: !0,
                        nav: !0,
                        isLayer: i.isLayer()
                    })
                } else nav.go(e, t)
            }, 50), cancelEvent(t)
        }, window.getAudioPlayer = function() {
            return window.AudioPlayer ? (window.ap = window.ap || new AudioPlayer, window.ap) : {}
        }, window.audioShowActionTooltip = function(e, t, o) {
            if (!cur._addRestoreInProgress) {
                var n = gpeByClass("_audio_row", e),
                    i = AudioUtils.getAudioFromEl(n, !0),
                    a = domData(e, "action"),
                    r = AudioUtils.getRowActionName(a, i, n),
                    s = {
                        text: function() {
                            return r
                        },
                        black: 1,
                        shift: t ? t : [7, 4, 0],
                        needLeft: !0,
                        forcetodown: o
                    };
                gpeByClass("_im_mess_stack", e) ? (s.appendParentCls = "_im_mess_stack", s.shift = [7, 10, 0], s.noZIndex = !0) : gpeByClass("top_notify_wrap", e) ? s.appendParentCls = "top_notify_wrap" : gpeByClass("_ape_audio_item", e) && (s.appendParentCls = "_ape_audio_item"), showTooltip(e, s)
            }
        }, window.deleteAudioOnClaim = function(e, t) {
            var o = e + "_" + t,
                n = geByClass1("_audio_row_" + o);
            AudioUtils.deleteAudio(n, AudioUtils.getAudioFromEl(n, !0)), cur.claimWarning && cur.claimWarning.hide()
        }, window.initTopAudioPlayer = function() {
            stManager.add(["audioplayer.js"], function() {
                TopAudioPlayer.init()
            })
        }, window.toggleAudioLyrics = function(e, t, o, n) {
            if (!n) return !1;
            var i = gpeByClass("_audio_row", t),
                a = geByClass1("_audio_lyrics_wrap", i);
            return a.innerHTML ? (toggle(a), cancelEvent(e), !1) : (n = intval(n), n && (addClass(i, "audio_loading"), showProgress(i), ajax.post("al_audio.php", {
                act: "get_lyrics",
                aid: o,
                lid: n
            }, {
                onDone: function(e) {
                    hideProgress(i), removeClass(i, "audio_loading"), a.innerHTML = e, show(a)
                }
            }), cancelEvent(e)), !1)
        }, window.openArticleEditor = function(e, t) {
            if (cur.articleEditorLayer) return void cur.articleEditorLayer.open(e, t);
            var o = [jsc("web/article_editor_layer.js"), "article.css", "article_editor.css"];
            stManager.add(o, function() {}), ajax.post("al_articles.php", {
                act: "open_editor",
                article_owner_id: e,
                article_id: t
            }, {
                loader: !0,
                onDone: function(e, t, n, i) {
                    window.WkView && WkView.hide(), window.__bq && __bq.hideAll(), stManager.add(o, function() {
                        layers.fullhide = function() {
                            cur.articleEditorLayer && cur.articleEditorLayer.hide()
                        }, cur.articleEditorLayer = new ArticleEditorLayer(e, t, n, i, function() {
                            delete cur.articleEditorLayer
                        })
                    })
                }
            })
        }, window.showStory = function(e, t) {
            return cur.storiesNotSupported ? showFastBox(getLang("global_error"), getLang("stories_bad_browser")) : (t = t || {}, delete cur.storiesLastSnippetId, clearTimeout(cur.storiesStaticLoadTimer), cur.storiesStaticLoadTimer = setTimeout(function() {
                bodyNode.appendChild(ce("div", {
                    id: "stories_loader",
                    innerHTML: getProgressHtml("stories_loader_pr", "pr_baw pr_medium") + '<div class="back"></div>'
                }))
            }, 1e3), void stManager.add(["stories.js", "stories.css"], function() {
                clearTimeout(cur.storiesStaticLoadTimer), re("stories_loader"), Stories.show(e, t)
            }))
        }, window.storiesPreloadStatic = function() {
            cur.storiesPreloadStaticStart || cur.storiesNotSupported || (cur.storiesPreloadStaticStart = !0, stManager.add(["stories.js", "stories.css"]))
        }, window.toggleFastChats = function(e) {
            var t = !e;
            toggleClass(ge("chat_onl_wrap"), "fast_chats_toggle_hide", t), toggleClass(ge("rb_box_fc_clist"), "fast_chats_toggle_hide", t), each(geByClass("rb_box_wrap"), function() {
                toggleClass(this, "fast_chats_toggle_hide", t)
            })
        }, debugLog("common module enabled"), stManager.done(jsc("web/common_web.js"))
}, function(e, t) {
    function o(e, t) {
        function o(e) {
            l.readyState && "loaded" != l.readyState && "complete" != l.readyState || (i(), r && r())
        }

        function n(e) {
            i(), s && s()
        }

        function i() {
            clearTimeout(d), l.removeEventListener("load", o), l.removeEventListener("readystatechange", o), l.removeEventListener("error", n)
        }
        var a = t.timeout,
            r = t.onLoad,
            s = t.onError,
            l = document.createElement("script");
        l.addEventListener("load", o), l.addEventListener("readystatechange", o), l.addEventListener("error", n), l.src = e, document.head.appendChild(l);
        var d = void 0;
        return a && (d = setTimeout(n, a)), {
            destroy: function() {
                i()
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.loadScript = o, window.loadScript = o
}, function(e, t) {
    function o() {
        var e = (getXY("ads_left", !0) || {})[1];
        if (e && vk.id) {
            var t = getXYRect(geByTag1("ol", ge("side_bar_inner")), !0),
                o = t ? t.height : 0,
                n = getXYRect(ge("left_blocks"), !0),
                i = n ? n.height : 0,
                a = Math.max(Math.floor(((window.lastWindowHeight || 0) - o - i - 42 - 10) / 260), 0);
            __seenAds = intval(getCookie("remixseenads")), __seenAds !== a && (__seenAds = a, setCookie("remixseenads", a, 30))
        }
    }

    function n(e, o) {
        if (window.noAdsAtAll) return !1;
        t.__adsGetAjaxParams = n = function() {
            return window.AdsLight && AdsLight.getAjaxParams.apply(AdsLight.getAjaxParams, arguments) || {
                al_ad: null
            }
        };
        var i = stManager.add(["aes_light.js"], n.pbind(e, o));
        return i || {
            al_ad: null
        }
    }

    function i(e) {
        return window.noAdsAtAll ? !1 : (t.__adsUpdate = i = function() {
            window.AdsLight && AdsLight.updateBlock.apply(AdsLight.updateBlock, arguments)
        }, void stManager.add(["aes_light.js"], i.pbind(e)))
    }

    function a(e, o, n, i, r) {
        return window.noAdsAtAll ? !1 : (t.__adsSet = a = function() {
            var e = "";
            arguments && arguments[0] && (e = arguments[0]), "<!--criteo" === e.slice(0, "<!--criteo".length) && Math.random() < .05 && (window.AdsLight && AdsLight.setNewBlock ? ajax.post("/wkview.php?act=mlet&mt=750", {}, {
                onFail: function() {
                    return !0
                }
            }) : ajax.post("/wkview.php?act=mlet&mt=751", {}, {
                onFail: function() {
                    return !0
                }
            })), window.AdsLight && AdsLight.setNewBlock.apply(AdsLight.setNewBlock, arguments)
        }, void stManager.add(["aes_light.js"], a.pbind(e, o, n, i, r)))
    }

    function r(e) {
        return window.noAdsAtAll ? !1 : (t.__adsUpdateExternalStats = r = function() {
            window.AdsLight && AdsLight.updateExternalStats.apply(AdsLight.updateExternalStats, arguments)
        }, void stManager.add(["aes_light.js"], r.pbind(e)))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.updSeenAdsInfo = o, t.__adsGetAjaxParams = n, t.__adsUpdate = i, t.__adsSet = a, t.__adsUpdateExternalStats = r, window.__seenAds = intval(getCookie("remixseenads")), window.__adsLoaded = vkNow(), window.updSeenAdsInfo = o, window.__adsGetAjaxParams = n, window.__adsUpdate = i, window.__adsSet = a, window.__adsUpdateExternalStats = r
}, function(e, t) {
    function o(e, t, o, n, i) {
        if ("undefined" != typeof e && "undefined" != typeof t) {
            var a, r = "remixsts",
                s = [].slice.apply(arguments, [2, 5]);
            aquireLock("stats_cookie_lock", function() {
                try {
                    a = JSON.parse(getCookie(r)), a = a.data
                } catch (o) {
                    a = []
                }
                for (a.push([Math.round(Date.now() / 1e3), e, t].concat(s)); a.length > 100;) a.shift();
                var n = Math.round(rand(0, 1e9));
                setCookie(r, JSON.stringify({
                    data: a,
                    uniqueId: n
                }), .01)
            })
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.statlogsValueEvent = o, window.statlogsValueEvent = o
}, function(module, exports) {
    function ajx2q(e, t) {
        var o = [],
            n = function(e) {
                if (window._decodeEr && _decodeEr[e]) return e;
                try {
                    return encodeURIComponent(e)
                } catch (t) {
                    return ""
                }
            };
        for (var i in e)
            if (null != e[i] && !isFunction(e[i]))
                if (isArray(e[i]))
                    for (var a = 0, r = 0, s = e[i].length; s > a; ++a) null == e[i][a] || isFunction(e[i][a]) || (o.push(n(i) + "[" + r + "]=" + n(e[i][a])), ++r);
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
                    return window._decodeEr = window._decodeEr || {}, _decodeEr[e] = 1, e
                }
            };
        return e = e.split("&"), each(e, function(e, n) {
            var i = n.split("=");
            if (i[0]) {
                var a = o(i[1] + "");
                if ("[]" == i[0].substr(i.length - 2)) {
                    var r = o(i[0].substr(0, i.length - 2));
                    t[r] || (t[r] = []), t[r].push(a)
                } else t[o(i[0])] = a
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
        return requestBox(showBox("activation.php", {
            act: "activate_mobile_box",
            hash: e.hash
        }), function() {
            vk.nophone = 0, e.onDone()
        }, e.onFail)
    }

    function validateMobileBox(e) {
        return requestBox(showBox("activation.php", {
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
        return requestBox(showBox("activation.php", {
            act: "pass_validate_box",
            hash: e.hash
        }, {
            stat: ["uncommon.css"]
        }), e.onDone, e.onFail)
    }

    function photoCaptchaBox(e) {
        return requestBox(showBox("pcaptcha.php", {
            act: "box"
        }, {
            stat: ["pcaptcha.css", "pcaptcha.js"]
        }), e.onDone, e.onFail)
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports.ajx2q = ajx2q, exports.q2ajx = q2ajx, exports.requestBox = requestBox, exports.activateMobileBox = activateMobileBox, exports.validateMobileBox = validateMobileBox, exports.validatePassBox = validatePassBox, exports.photoCaptchaBox = photoCaptchaBox, window.ajaxCache = {}, window.globalAjaxCache = {}, window.iframeTO = 0;
    var ajax = exports.ajax = {
        _init: function() {
            var e = !1;
            try {
                if (e = new XMLHttpRequest) return void(ajax._req = function() {
                    return new XMLHttpRequest
                })
            } catch (t) {}
            ajax._req || browser.search_bot || location.replace("/badbrowser.php")
        },
        _getreq: function() {
            return ajax._req || ajax._init(), ajax._req()
        },
        _frameover: function(e, t) {
            if (window.iframeTransport) {
                var o = iframeTransport.parentNode;
                o.innerHTML = "", utilsNode.removeChild(o), iframeTransport = !1, (e || t) && ajax.framegot(!1, !1, e, t), ajax.framegot(!1), cur.onFrameBlocksDone && cur.onFrameBlocksDone(), ajax.tOver = (new Date).getTime()
            }
        },
        _receive: function _receive(cont, html, js, bench, params) {
            var c = cont && ge(cont);
            if (c && html && (c.firstChild ? c.appendChild(cf(html)) : val(c, html)), js) {
                var scr = "(function(){" + js + ";})()";
                if (__debugMode) eval(scr);
                else try {
                    eval(scr)
                } catch (e) {
                    topError(e, {
                        dt: 15,
                        type: 8,
                        url: ajax._frameurl,
                        js: js,
                        answer: Array.prototype.slice.call(arguments).join("<!>")
                    })
                }
                bench && (ajax.tModule = cur.module)
            }
            params && "leftads" in params && window.__adsSet && __adsSet(params.leftads, params.ads_section || "", params.ads_can_show, params.ads_showed), ajax._framenext()
        },
        framedata: !1,
        _framenext: function() {
            if ((ajax.framedata || {}).length) {
                var e = ajax.framedata.shift();
                e === !0 ? ajax._framenext() : e === !1 ? (ajax.framedata = !1, cur.onFrameBlocksDone && cur.onFrameBlocksDone()) : iframeTO = lTimeout(ajax._receive.pbind(e[0], e[1], e[2], !0, e[3]), 0)
            }
        },
        framegot: function(e, t, o, n) {
            ajax.framedata && (ajax.framedata.push(void 0 === t && void 0 === o && void 0 === n ? e : [e, t, o, n]), 1 == ajax.framedata.length && ajax._framenext())
        },
        framepost: function(e, t, o, n) {
            clearTimeout(iframeTO), window.iframeTransport && ajax._frameover(), window.iframeTransport = utilsNode.appendChild(ce("div", {
                innerHTML: "<iframe></iframe>"
            })).firstChild, ajax._framedone = o, ajax.framedata = [!0], e += "?" + ("string" != typeof t ? ajx2q(t, n && n.noSort) : t), e += ("?" != e.charAt(e.length - 1) ? "&" : "") + "_rndVer=" + irand(0, 99999), ajax._frameurl = iframeTransport.src = e
        },
        plainpost: function(e, t, o, n, i, a, r) {
            var s = ajax._getreq(),
                l = "string" != typeof t ? ajx2q(t, r && r.noSort) : t;
            s.onreadystatechange = function() {
                4 == s.readyState && (s.status >= 200 && s.status < 300 ? o && o(s.responseText, s) : n && n(s.responseText, s));
            };
            try {
                s.open("POST", e, !0)
            } catch (d) {
                return !1
            }
            return a && each(a, function(e, t) {
                s[e] = t
            }), i || (s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s.setRequestHeader("X-Requested-With", "XMLHttpRequest")), s.send(l), s
        },
        post: function(e, t, o) {
            "/" != e.substr(0, 1) && "http" != e.substr(0, 4) && (e = "/" + e);
            var n = extend({
                    _captcha: !1,
                    _box: !1
                }, o || {}),
                i = extend({
                    al: n.frame ? -1 : 1
                }, t),
                a = vkNow(),
                r = vk.spentLastSendTS ? Math.round((a - vk.spentLastSendTS) / 1e3) : 0;
            if (vk.sampleUser >= 0 && window.cur && cur.module && r >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (i = extend({
                    _smt: cur.module + ":" + r
                }, i)), vk.spentLastSendTS = a), n.progress && (n.showProgress || (n.showProgress = function() {
                    var e = ge(n.progress);
                    hasClass(e, "pr") && setStyle(e, "opacity", 1), show(e)
                }), n.hideProgress || (n.hideProgress = function() {
                    var e = ge(n.progress);
                    hasClass(e, "pr") && setStyle(e, "opacity", 0), hide(e)
                })), n.loader) {
                var s = isVisible(boxLayerWrap);
                n.showProgress = function() {
                    boxRefreshCoords(boxLoader), show(boxLoader), s || show(boxLayerWrap)
                }, n.hideProgress = function() {
                    hide(boxLoader), s || hide(boxLayerWrap)
                }
            }
            return ajax._post(e, i, n)
        },
        preload: function(e, t, o) {
            "/" != e.substr(0, 1) && (e = "/" + e), ajaxCache[e + "#" + ajx2q(t)] = o
        },
        invalidate: function(e, t) {
            void 0 === e ? ajaxCache = {} : delete ajaxCache[ajax._getCacheKey(e, t)]
        },
        _getCacheKey: function(e, t, o) {
            var n = clone(t);
            return delete n.al, delete n.al_ad, delete n.ads_section, delete n.ads_showed, delete n.captcha_sid, delete n.captcha_key, delete n._smt, delete n._preload, e + "#" + ajx2q(n, o && o.noSort)
        },
        _debugLog: function(e, t) {
            window.debuglogGot && debuglogGot(t, e)
        },
        _parseRes: function(e, t) {
            window._updateDebug = !1;
            for (var o = e.length - 1; o >= 0; --o) {
                var n = e[o];
                if ("<!" == n.substr(0, 2)) {
                    var i = n.indexOf(">"),
                        a = n.substr(2, i - 2);
                    switch (n = n.substr(i + 1), a) {
                        case "json":
                            e[o] = parseJSON(n);
                            break;
                        case "int":
                            e[o] = intval(n);
                            break;
                        case "float":
                            e[o] = floatval(n);
                            break;
                        case "bool":
                            e[o] = intval(n) ? !0 : !1;
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
        _post: function _post(url, q, o) {
            !q.captcha_sid && o.showProgress && o.showProgress();
            var cacheKey = !1;
            window.__adsGetAjaxParams && extend(q, __adsGetAjaxParams(q, o)), o.cache && (cacheKey = ajax._getCacheKey(url, q, o));
            var hideBoxes = function() {
                    for (var e = 0, t = arguments.length; t > e; ++e) {
                        var o = arguments[e];
                        o && o.isVisible() && (o.setOptions({
                            onHide: !1,
                            onDestroy: !1
                        }), o.hide())
                    }
                    return !1
                },
                fail = function(e, t) {
                    return o.hideProgress && o.hideProgress(), o._suggest && cleanElems(o._suggest), o._suggest = o._captcha = o._box = hideBoxes(o._captcha, o._box), -1 != e.indexOf("The page is temporarily unavailable") && __dev && inArray(vk.id, [100]) ? (ajax._post(url, q, o), !1) : void(o.onFail && o.onFail(e) === !0 || topError(e, {
                        dt: 5,
                        type: 3,
                        status: t.status,
                        url: url,
                        query: q && ajx2q(q, o.noSort)
                    }))
                };
            if (o.local && (fail = vkLocal(fail)), o.stat) {
                var statAct = !1;
                stManager.add(o.stat, function() {
                    statAct && statAct(), o.stat = !1
                })
            }
            var _processResponse = function processResponse(code, answer) {
                if (o.cache) {
                    var answ = ajaxCache[cacheKey];
                    answ && answ._loading && (setTimeout(function() {
                        for (var e in answ._callbacks) answ._callbacks[e](code, answer)
                    }, 0), delete ajaxCache[cacheKey])
                }
                if (o.stat) return o.stat = !1, statAct = _processResponse.pbind(code, answer), !1;
                switch (o.cache && !o.forceGlobalCache && (code || (ajaxCache[cacheKey] = answer)), o.hideProgress && o.hideProgress(), 2 != code && (o._captcha && (o._suggest && cleanElems(o._suggest), o._suggest = o._captcha = hideBoxes(o._captcha)), o._box = hideBoxes(o._box)), code) {
                    case 1:
                        showFastBox({
                            width: 520,
                            title: answer[0],
                            onDestroy: o.onFail
                        }, answer[1]);
                        break;
                    case 2:
                        var addText = "";
                        if (2 === intval(answer[1])) {
                            var resend = function(e) {
                                var t = extend(q, {
                                        recaptcha: e
                                    }),
                                    n = o.cache ? extend(o, {
                                        cache: -1
                                    }) : o;
                                ajax._post(url, t, n)
                            };
                            o._captcha = showReCaptchaBox(answer[0], answer[2], o._captcha, {
                                onSubmit: resend,
                                addText: addText,
                                onDestroy: function() {
                                    o.onFail && o.onFail()
                                }
                            })
                        } else {
                            var resend = function(e, t) {
                                var n = extend(q, {
                                        captcha_sid: e,
                                        captcha_key: t
                                    }),
                                    i = o.cache ? extend(o, {
                                        cache: -1
                                    }) : o;
                                ajax._post(url, n, i)
                            };
                            o._captcha = showCaptchaBox(answer[0], intval(answer[1]), o._captcha, {
                                onSubmit: resend,
                                addText: addText,
                                onDestroy: function() {
                                    o.onFail && o.onFail()
                                }
                            })
                        }
                        o._suggest = geByClass1("phone_validation_link", o._captcha.bodyNode), o._suggest && addEvent(o._suggest, "click", function() {
                            o._box = validateMobileBox({
                                onDone: o._captcha.submit
                            })
                        });
                        break;
                    case 11:
                    case 12:
                        var no = o.cache ? extend(o, {
                            cache: -1
                        }) : o;
                        o._box = validateMobileBox({
                            acceptCaptcha: 11 == code,
                            onDone: function(e, t) {
                                vk.nophone = 0, e && (o._captcha = curBox()), ajax._post(url, e ? extend(q, {
                                    captcha_sid: e,
                                    captcha_key: t
                                }) : q, no)
                            },
                            onFail: o.onFail,
                            hash: answer[0],
                            ahash: answer[1]
                        });
                        break;
                    case 14:
                        var no = o.cache ? extend(o, {
                            cache: -1
                        }) : o;
                        o._box = photoCaptchaBox({
                            onDone: ajax._post.pbind(url, q, no),
                            onFail: o.onFail
                        });
                        break;
                    case 15:
                        var no = o.cache ? extend(o, {
                            cache: -1
                        }) : o;
                        o._box = validatePassBox({
                            onDone: ajax._post.pbind(url, q, no),
                            onFail: o.onFail,
                            hash: answer[0]
                        });
                        break;
                    case 3:
                        var no = o.cache ? extend(o, {
                            cache: -1
                        }) : o;
                        window.onReLoginDone = ajax._post.pbind(url, q, no), window.onReLoginFailed = function(e) {
                            -1 === e ? location.href = location.href.replace(/^http:/, "https:") : e ? nav.go("/") : window.onReLoginDone()
                        }, utilsNode.appendChild(ce("iframe", {
                            src: vk.loginscheme + "://login.vk.com/?" + ajx2q({
                                role: "al_frame",
                                _origin: locProtocol + "//" + locHost,
                                ip_h: answer[0] || vk.ip_h
                            })
                        }));
                        break;
                    case 4:
                        intval(answer[1]) ? nav.go(answer[0], !1, {
                            nocur: "2" === answer[1],
                            noback: answer[1] === !0 ? !0 : !1,
                            showProgress: o.showProgress,
                            hideProgress: o.hideProgress
                        }) : (hab.stop(), location.href = answer[0]);
                        break;
                    case 5:
                        nav.reload({
                            force: intval(answer[0]),
                            from: 1,
                            url: url,
                            query: q && ajx2q(q)
                        });
                        break;
                    case 6:
                        var no = o.cache ? extend(o, {
                            cache: -1
                        }) : o;
                        o._box = activateMobileBox({
                            onDone: ajax._post.pbind(url, q, no),
                            onFail: o.onFail,
                            hash: answer[0]
                        });
                        break;
                    case 7:
                        o.onFail && o.onFail(), topMsg(answer[0], 10);
                        break;
                    case 8:
                        if (o.onFail && o.onFail(answer[0])) return;
                        topError(answer[0] + (answer[2] ? " #" + answer[2] : ""), {
                            dt: answer[1] ? 0 : 10,
                            type: 4,
                            url: url,
                            query: q && ajx2q(q)
                        });
                        break;
                    case 9:
                        if ((o.fromBox || o.forceDone) && (o.onDone && o.onDone.apply(window, answer), o.fromBox)) break;
                        o._box = showFastBox({
                            title: trim(answer[0])
                        }, answer[1]);
                        var no = extend(clone(o), {
                            showProgress: o._box.showProgress,
                            hideProgress: o._box.hideProgress
                        });
                        o.cache && (no.cache = -1), o._box = requestBox(o._box, function(e) {
                            isVisible(o._box.progress) || (e || (e = {
                                _votes_ok: 1
                            }), ajax._post(url, extend(q, e), no))
                        }, o.onFail), o._box.evalBox(answer[2]);
                        break;
                    case 10:
                        o._box = showFastBox({
                            title: answer[0] || getLang("global_charged_zone_title"),
                            onHide: o.onFail
                        }, answer[1], getLang("global_charged_zone_continue"), function() {
                            var e = extend(q, {
                                charged_confirm: answer[3]
                            });
                            ajax._post(url, e, o)
                        }, getLang("global_cancel"));
                        break;
                    case 13:
                        eval("(function(){" + answer[0] + ";})()");
                        break;
                    default:
                        if (-1 == code || -2 == code) {
                            var adsShowed = answer.pop(),
                                adsCanShow = answer.pop(),
                                adsHtml = answer.pop();
                            window.__adsSet && __adsSet(adsHtml, null, adsCanShow, adsShowed)
                        }
                        o.onDone && o.onDone.apply(window, answer)
                }
                window._updateDebug && _updateDebug(), window.LazyLoad && LazyLoad.scanDelayed()
            };
            o.local && (_processResponse = vkLocal(_processResponse));
            var done = function(e, t) {
                o.bench && (ajax.tDone = (new Date).getTime()), e = e.replace(/^<!--/, "").replace(/-<>-(!?)>/g, "--$1>"), trim(e).length || (t = [8, getLang("global_unknown_error")], e = stVersions.nav + "<!><!>" + vk.lang + "<!>" + stVersions.lang + "<!>8<!>" + t[1]);
                var n = e.split("<!>"),
                    i = clone(n);
                each(i, function(e, t) {
                    i[e] = t.substr(0, 100)
                }), ajax.lastResp = i.join("<!>");
                var a = intval(n.shift());
                if (!a) return fail("<pre>" + e + "</pre>", {
                    status: -1
                });
                if (vk.version && vk.version != a) return void(a && n.length > 4 ? nav.reload({
                    force: !0,
                    from: 2,
                    url: url,
                    query: q && ajx2q(q)
                }) : nav.strLoc ? location.replace(locBase) : topError("Server error.", {
                    type: 100
                }));
                vk.version = !1;
                var r = n.shift(),
                    s = intval(n.shift()),
                    l = intval(n.shift());
                o.frame && (n = t);
                var d = intval(n.shift());
                if (vk.lang != s && o.canReload) return void nav.reload({
                    force: !0,
                    from: 3,
                    url: url,
                    query: q && ajx2q(q)
                });
                var c = function() {
                    var e = ["common.css"];
                    if (r) {
                        r = r.split(",");
                        for (var t = 0, i = r.length; i > t; ++t) e.push(r[t])
                    }
                    if (stVersions.lang < l) {
                        stVersions.lang = l;
                        for (var t in StaticFiles) /^lang\d/i.test(t) && e.push(t)
                    }
                    if (!o.frame) try {
                        ajax._parseRes(n, o._reqid)
                    } catch (a) {
                        topError("<b>JSON Error:</b> " + a.message, {
                            type: 5,
                            answer: n.join("<!>"),
                            url: url,
                            query: q && ajx2q(q)
                        })
                    }
                    stManager.add(e, _processResponse.pbind(d, n))
                };
                if (window.stVersions) {
                    if (a == stVersions.nav) return c();
                    headNode.appendChild(ce("script", {
                        type: "text/javascript",
                        src: "/js/loader_nav" + a + "_" + vk.lang + ".js"
                    })), setTimeout(function u() {
                        return a == stVersions.nav ? c() : void setTimeout(u, 100)
                    }, 0)
                }
            };
            if (o.local && (done = vkLocal(done)), o.cache > 0 || o.forceGlobalCache) {
                var answer = ajaxCache[cacheKey];
                if (answer && answer._loading) return void answer._callbacks.push(_processResponse);
                if (answer && !o.forceGlobalCache) return _processResponse(0, answer), void(3 === o.cache && delete ajaxCache[cacheKey]);
                if (answer = globalAjaxCache[cacheKey]) return -1 == answer || isFunction(answer) ? globalAjaxCache[cacheKey] = o.onDone : o.onDone.apply(window, answer), void(o.hideProgress && o.hideProgress())
            }
            ajaxCache[cacheKey] = {
                _loading: 1,
                _callbacks: []
            }, window.debuglogSent ? (o._reqid = debuglogSent(url + (q ? ": " + ajx2q(q, o.noSort).replace(/&/g, "&amp;") : "")), o.frame && (window._lfrid = o._reqid)) : o._reqid = 0;
            var xhrOptions = {};
            return o.timeout && (xhrOptions.timeout = o.timeout), o.frame ? ajax.framepost(url, q, done, o) : ajax.plainpost(url, q, done, fail, !1, xhrOptions, o)
        },
        tGetParam: function() {
            if (ajax.tStart && ajax.tModule) {
                var e = ajax.tDone - ajax.tStart,
                    t = ajax.tProcess - ajax.tDone,
                    o = ajax.tRender - ajax.tProcess,
                    n = ajax.tOver - ajax.tStart,
                    i = [e, t, o, n, ajax.tModule];
                for (var a in i) {
                    if (i[a] < 0) return !1;
                    if (!i[a] && 0 !== i[a]) return !1
                }
                return ajax.tStart = !1, i.join(",")
            }
        }
    };
    window.ajax = ajax, window.ajx2q = ajx2q, window.q2ajx = q2ajx, window.requestBox = requestBox, window.activateMobileBox = activateMobileBox, window.validateMobileBox = validateMobileBox, window.validatePassBox = validatePassBox, window.photoCaptchaBox = photoCaptchaBox
}, function(e, t, o) {
    var n;
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, ! function(i) {
        var a = i.HTMLCanvasElement && i.HTMLCanvasElement.prototype,
            r = i.Blob && function() {
                try {
                    return Boolean(new Blob)
                } catch (e) {
                    return !1
                }
            }(),
            s = r && i.Uint8Array && function() {
                try {
                    return 100 === new Blob([new Uint8Array(100)]).size
                } catch (e) {
                    return !1
                }
            }(),
            l = i.BlobBuilder || i.WebKitBlobBuilder || i.MozBlobBuilder || i.MSBlobBuilder,
            d = /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
            c = (r || l) && i.atob && i.ArrayBuffer && i.Uint8Array && function(e) {
                var t, o, n, i, a, c, u, h, p;
                if (t = e.match(d), !t) throw new Error("invalid data URI");
                for (o = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), n = !!t[4], i = e.slice(t[0].length), a = n ? atob(i) : decodeURIComponent(i), c = new ArrayBuffer(a.length), u = new Uint8Array(c), h = 0; h < a.length; h += 1) u[h] = a.charCodeAt(h);
                return r ? new Blob([s ? u : c], {
                    type: o
                }) : (p = new l, p.append(c), p.getBlob(o))
            };
        i.HTMLCanvasElement && !a.toBlob && (a.mozGetAsFile ? a.toBlob = function(e, t, o) {
            e(o && a.toDataURL && c ? c(this.toDataURL(t, o)) : this.mozGetAsFile("blob", t))
        } : a.toDataURL && c && (a.toBlob = function(e, t, o) {
            e(c(this.toDataURL(t, o)))
        })), n = function() {
            return c
        }.call(t, o, t, e), !(void 0 !== n && (e.exports = n))
    }(window)
}, function(e, t) {
    function o(e, t) {
        if (clearTimeout(hfTimeout), t > 0) return void(hfTimeout = setTimeout(function() {
            o(e, 0)
        }, t));
        var n = e ? "visible" : "hidden";
        triggerEvent(document, e ? "unblock" : "block");
        var i = function() {
            this.getAttribute("preventhide") || "internal/link" == this.getAttribute("type") || ("flash_app" == this.id && browser.msie ? e ? setStyle(this, {
                position: "static",
                top: 0
            }) : setStyle(this, {
                position: "absolute",
                top: "-5000px"
            }) : this.style.visibility = n)
        };
        each(geByTag("embed"), i), each(geByTag("object"), i)
    }

    function n(e, t, o, n) {
        if (!t.url || !t.id) return !1;
        t = extend({
            version: 9,
            width: 1,
            height: 1
        }, t);
        var i = t.url;
        return stVersions[i] || (stVersions[i] = ""), __debugMode && stVersions[i] < 1e6 && (stVersions[i] += irand(1e6, 2e6)), stVersions[i] && (t.url += (-1 == t.url.indexOf("?") ? "?" : "&") + "_stV=" + stVersions[i]), o = extend({
            quality: "high",
            flashvars: ajx2q(n)
        }, o), browser.flash < t.version ? !1 : (ge(e).innerHTML = browser.flashwrap(t, o), !0)
    }
    Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.toggleFlash = o, t.renderFlash = n,
        function() {
            var e = [0, 0, 0],
                t = "ShockwaveFlash.ShockwaveFlash",
                o = "embed",
                n = 'type="application/x-shockwave-flash" ',
                i = function(e) {
                    return e.toString().replace("&", "&amp;").replace('"', "&quot;")
                };
            if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
                var a = navigator.plugins["Shockwave Flash"];
                if (a && a.description)
                    for (var r = a.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."), s = 0; 3 > s; ++s) e[s] = r[s] || 0
            } else {
                if (_ua.indexOf("Windows CE") >= 0)
                    for (var l = !0, r = 6; l;) try {
                        ++r, l = new ActiveXObject(t + "." + r), e[0] = r
                    } catch (d) {} else try {
                        var l = new ActiveXObject(t + ".7");
                        e = l.GetVariable("$version").split(" ")[1].split(",")
                    } catch (d) {}
                o = "object", n = 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
            }
            browser.flashwrap = "embed" == o ? function(e, t) {
                t = extend({
                    id: e.id,
                    name: e.id,
                    width: e.width,
                    height: e.height,
                    style: e.style,
                    preventhide: e.preventhide
                }, t), browser.flash >= e.version ? t.src = e.url : t.src = e.express;
                var o = [];
                for (var a in t) {
                    var r = t[a];
                    void 0 !== r && null !== r && o.push(a + '="' + i(r) + '" ')
                }
                return "<embed " + n + o.join("") + "/>"
            } : function(e, t) {
                browser.flash >= e.version ? t.movie = e.url : t.movie = e.express;
                var o = {
                        id: e.id,
                        width: e.width,
                        height: e.height,
                        style: e.style,
                        preventhide: e.preventhide
                    },
                    a = [];
                for (var r in o) {
                    var s = o[r];
                    void 0 !== s && null !== s && a.push(r + '="' + i(s) + '" ')
                }
                var l = [];
                for (var r in t) {
                    var s = t[r];
                    void 0 !== s && null !== s && l.push('<param name="' + r + '" value="' + i(s) + '" />')
                }
                return "<object " + n + a.join("") + ">" + l.join("") + "</object>"
            }, e[0] < 7 && (e = [0, 0, 0]), browser.flash = intval(e[0]), browser.flashfull = {
                major: browser.flash,
                minor: intval(e[1]),
                rev: intval(e[2])
            }, setCookie("remixflash", intval(e[0]) + "." + intval(e[1]) + "." + intval(e[2]), 30)
        }(), window.hfTimeout = 0, window.toggleFlash = o, window.renderFlash = n
}, function(e, t) {
    function o() {
        _cookies = {};
        for (var e = document.cookie.split(";"), t = /^[\s]*([^\s]+?)$/i, o = 0, n = e.length; n > o; o++) {
            var i = e[o].split("=");
            2 == i.length && (_cookies[i[0].match(t)[1]] = unescape(i[1].match(t) ? i[1].match(t)[1] : ""))
        }
    }

    function n(e) {
        return o(), _cookies[e]
    }

    function i(e, t, o, n) {
        var i = "";
        if (o) {
            var a = new Date;
            a.setTime(a.getTime() + 24 * o * 60 * 60 * 1e3), i = "; expires=" + a.toGMTString()
        }
        var r = locDomain;
        document.cookie = e + "=" + escape(t) + i + "; path=/" + (r ? "; domain=." + r : "") + (n && "https:" == locProtocol ? "; secure" : "")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t._initCookies = o, t.getCookie = n, t.setCookie = i, window._cookies = {}, window._initCookies = o, window.getCookie = n, window.setCookie = i
}, function(e, t) {
    function o(e, t) {
        if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") != e || t)) {
            var o = ce("link", {
                rel: "shortcut icon",
                type: "image/gif",
                href: e
            });
            headNode.replaceChild(o, icoNode), icoNode = o
        }
    }
    Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.setFavIcon = o, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "",
        function() {
            var e, t, n = 1,
                i = !1;
            browser.mozilla ? i = function() {
                o("/images/icons/prgicon.gif")
            } : (browser.chrome || browser.opera && !browser.opera_mobile) && (i = function() {
                n = n % 4 + 1, o("/images/icons/prgicon" + n + ".gif"), e = setTimeout(arguments.callee, 250)
            }), window.showTitleProgress = function(o) {
                return browser.mozilla || browser.chrome ? void 0 : o > 0 ? void(t = setTimeout(showTitleProgress.pbind(!1), o)) : void(e || (document.body && (document.body.style.cursor = "progress"), i && i()))
            }, window.hideTitleProgress = function() {
                browser.mozilla || browser.chrome || (clearTimeout(t), document.body.style.cursor = "default", e && (clearTimeout(e), e = !1), (browser.mozilla || browser.chrome || browser.opera && !browser.opera_mobile) && o("/images/favicon" + (vk.intnat ? "_vk" : "new") + _iconAdd + ".ico?" + stVersions.favicon))
            }
        }(), window.setFavIcon = o
}, function(e, t) {
    function o(e) {
        var t = PageID;
        return function() {
            t == PageID && e.apply(this, arguments)
        }
    }

    function n(e, t) {
        return setTimeout(o(e), t)
    }

    function i(e, t) {
        return Math.random() * (t - e + 1) + e
    }

    function a(e, t) {
        return Math.floor(i(e, t))
    }

    function r(e) {
        return "undefined" == typeof e
    }

    function s(e) {
        return e && "[object Function]" === Object.prototype.toString.call(e)
    }

    function l(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }

    function d(e) {
        return "string" == typeof e
    }

    function c(e) {
        return "[object Object]" === Object.prototype.toString.call(e)
    }

    function u(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
        for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
        return !0
    }

    function h() {
        return +new Date
    }

    function p() {
        return window.Image ? new Image : ce("img")
    }

    function f(e) {
        return (e || "").replace(/^\s+|\s+$/g, "")
    }

    function w(e) {
        return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
    }

    function _(e) {
        return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
    }

    function v(e) {
        return e === !0 ? 1 : parseInt(e) || 0
    }

    function g(e) {
        return e === !0 ? 1 : parseFloat(e) || 0
    }

    function m(e) {
        return e = v(e), 0 > e ? 0 : e
    }

    function b(e) {
        return !isNaN(e)
    }

    function y(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return t = v(t), t >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function x(e) {
        return se("<textarea>" + (e || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value
    }

    function k(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function C(e) {
        return x(e.replace(/\t/g, "\n"))
    }

    function T(e, t) {
        if (c(e) || "undefined" == typeof e.length) {
            for (var o in e)
                if (Object.prototype.hasOwnProperty.call(e, o) && t.call(e[o], o, e[o]) === !1) break
        } else
            for (var n = 0, i = e.length; i > n; n++) {
                var a = e[n];
                if (t.call(a, n, a) === !1) break
            }
        return e
    }

    function L(e, t, o) {
        for (var n = o || 0, i = (e || []).length; i > n; n++)
            if (e[n] == t) return n;
        return -1
    }

    function S(e, t) {
        return -1 != L(t, e)
    }

    function E(e, t) {
        var o = c(e) || "undefined" == typeof e.length ? {} : [];
        for (var n in e)(!/webkit/i.test(_ua) || "layerX" != n && "layerY" != n && "webkitMovementX" != n && "webkitMovementY" != n) && (t && "object" === H(e[n]) && "prototype" !== n && null !== e[n] ? o[n] = E(e[n]) : o[n] = e[n]);
        return o
    }

    function B(e) {
        var t, o, n = {},
            i = 1,
            a = arguments.length,
            r = arguments;
        for (t in e) {
            for (o = !1, i = 1; a > i; i++) r[i][t] && r[i][t] == e[t] && (o = !0);
            o || (n[t] = e[t])
        }
        return n
    }

    function A() {
        var e, t = arguments,
            o = t[0] || {},
            n = 1,
            i = t.length,
            a = !1;
        for ("boolean" == typeof o && (a = o, o = t[1] || {}, n = 2), "object" === ("undefined" == typeof o ? "undefined" : H(o)) || s(o) || (o = {}); i > n; ++n)
            if (null != (e = t[n]))
                for (var r in e) {
                    var l = o[r],
                        d = e[r];
                    o !== d && (a && d && "object" === ("undefined" == typeof d ? "undefined" : H(d)) && !d.nodeType ? o[r] = A(a, l || (null != d.length ? [] : {}), d) : void 0 !== d && (o[r] = d))
                }
        return o
    }

    function P(e) {
        window.templates = window.templates || {}, A(window.templates, e)
    }

    function N(e, t) {
        var o = window.templates = window.templates || {},
            n = o[e];
        return "function" == typeof n && (n = n()), n && t ? rs(n, t) : n || ""
    }

    function M(e) {
        if ("object" != ("undefined" == typeof e ? "undefined" : H(e))) return !1;
        var t = {},
            o = function(t) {
                return geByTag(t, e)
            },
            n = function(o, n) {
                if (n.name)
                    if ("text" != n.type && n.type)
                        if (n.getAttribute("bool")) {
                            var i = val(n);
                            if (!i || "0" === i) return;
                            t[n.name] = 1
                        } else t[n.name] = browser.msie && !n.value && e[n.name] ? e[n.name].value : n.value;
                else t[n.name] = val(n)
            };
        return T(o("input"), function(e, t) {
            return "radio" != t.type && "checkbox" != t.type || t.checked ? n(e, t) : void 0
        }), T(o("select"), n), T(o("textarea"), n), t
    }

    function j(e, t) {
        for (var o, n = t ? D : F, i = []; e && (o = e.match(n));) {
            e = e.substr(o.index + o[0].length);
            var a = 0;
            o[4] || (a = 7), i.push({
                url: o[2 + a],
                query: o[5 + a] || "",
                domain: o[4 + a]
            })
        }
        return i
    }

    function I() {
        return window.devicePixelRatio >= 2
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var H = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.vkLocal = o, t.lTimeout = n, t.rand = i, t.irand = a, t.isUndefined = r, t.isFunction = s, t.isArray = l, t.isString = d, t.isObject = c, t.isEmpty = u, t.vkNow = h, t.vkImage = p, t.trim = f, t.stripHTML = w, t.escapeRE = _, t.intval = v, t.floatval = g, t.positive = m, t.isNumeric = b, t.winToUtf = y, t.replaceEntities = x, t.clean = k, t.unclean = C, t.each = T, t.indexOf = L, t.inArray = S, t.clone = E, t.arrayKeyDiff = B, t.extend = A, t.addTemplates = P, t.getTemplate = N, t.serializeForm = M, t.extractUrls = j, t.isRetina = I, window.PageID = window.PageID || 1;
    var F = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
        D = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;
    window.isRetina = I, window.extractUrls = j, window.serializeForm = M, window.addTemplates = P, window.getTemplate = N, window.rand = i, window.irand = a, window.isUndefined = r, window.isFunction = s, window.isArray = l, window.isString = d, window.isObject = c, window.isEmpty = u, window.vkNow = h, window.vkImage = p, window.trim = f, window.stripHTML = w, window.escapeRE = _, window.intval = v, window.floatval = g, window.positive = m, window.isNumeric = b, window.winToUtf = y, window.replaceEntities = x, window.clean = k, window.unclean = C, window.each = T, window.indexOf = L, window.inArray = S, window.clone = E, window.arrayKeyDiff = B, window.extend = A, window.vkLocal = o, window.lTimeout = n
}, function(e, t) {
    function o(e) {
        var t, o = function(e) {
                var t = e.split("#"),
                    o = t[0].split("?");
                return o[0] + (o[1] ? "?" + ajx2q(q2ajx(o[1])) : "") + (t[1] ? "#" + t[1] : "")
            },
            n = extend({
                onLocChange: function() {}
            }, e),
            i = function() {
                var e = "";
                return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "", e.substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || ""))), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), o(e.replace(/^(\/|!)/, ""))
            },
            a = i(!0),
            r = function(e) {
                a = o(e);
                var t = (location.toString().match(/#(.*)/) || {})[1] || "";
                if (!t && vk.al > 1 && (t = (location.pathname || "") + (location.search || "")), t = o(t), t = t.replace(/^(\/|!)/, ""), t != a) {
                    if (3 == vk.al) try {
                        return window.saveScrollTopOnBack && (delete window.saveScrollTopOnBack, history.replaceState({
                            scrollTop: window.lastScrollTop,
                            preventScroll: window.preventLocationScroll
                        }, "", "/" + t), window.preventLocationScroll && delete window.preventLocationScroll), void history.pushState({}, "", "/" + a)
                    } catch (n) {}
                    window.chHashFlag = !0, location.hash = "#" + vk.navPrefix + a
                }
            },
            s = function(e) {
                var t = i();
                (t != a || e === !0) && (n.onLocChange(t), a = t)
            },
            l = function() {
                1 == vk.al && s(!0), 3 == vk.al ? (addEvent(window, "popstate", s), browser.safari && addEvent(window, "hashchange", s)) : "onhashchange" in window ? addEvent(window, "hashchange", function() {
                    window.chHashFlag ? window.chHashFlag = !1 : s()
                }) : t = setInterval(s, 200)
            };
        return {
            setLoc: r,
            getLoc: i,
            init: l,
            setOptions: function(e) {
                n = extend(n, e)
            },
            checker: s,
            stop: function() {
                vk.al < 3 ? clearInterval(t) : 3 == vk.al && removeEvent(window, "popstate", s)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.HistoryAndBookmarks = o, window.HistoryAndBookmarks = o
}, function(e, t, o) {
    function n(e) {
        return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
    }

    function i(e, t) {
        return t = n(t) || document, t.getElementsByTagName(e)
    }

    function a(e, t) {
        return t = n(t) || document, t.querySelector && t.querySelector(e) || i(e, t)[0]
    }

    function r(e, t, o) {
        t = n(t) || document, o = o || "*";
        var a = [];
        if (t.querySelectorAll && "*" != o) return t.querySelectorAll(o + "." + e);
        if (t.getElementsByClassName) {
            var r = t.getElementsByClassName(e);
            if ("*" != o) {
                o = o.toUpperCase();
                for (var s = 0, l = r.length; l > s; ++s) r[s].tagName.toUpperCase() == o && a.push(r[s])
            } else a = Array.prototype.slice.call(r);
            return a
        }
        for (var d = i(o, t), c = new RegExp("(^|\\s)" + e + "(\\s|$)"), s = 0, l = d.length; l > s; ++s) c.test(d[s].className) && a.push(d[s]);
        return a
    }

    function s(e, t, o) {
        return t = n(t) || document, o = o || "*", t.querySelector && t.querySelector(o + "." + e) || r(e, t, o)[0]
    }

    function l(e, t, o) {
        if (t = n(t), !t) return null;
        for (; o !== t && (t = t.parentNode);)
            if (Q(t, e)) return t;
        return null
    }

    function d(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function c(e, t) {
        return (t || document).querySelector(e)
    }

    function u(e, t) {
        return Q(t, e) ? t : l(e, t)
    }

    function h(e, t, o) {
        var n = document.createElement(e);
        return t && extend(n, t), o && se(n, o), n
    }

    function p(e) {
        return e = n(e), e && e.parentNode && e.parentNode.removeChild(e), e
    }

    function f(e) {
        return x(h("div", {
            innerHTML: e
        }))
    }

    function w(e) {
        return T(h("div", {
            innerHTML: e
        }))
    }

    function _(e, t) {
        return each(t, function(t, o) {
            e = e.replace(new RegExp("%" + t + "%", "g"), ("undefined" == typeof o ? "" : o).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function v(e) {
        return "https:" != locProtocol ? e : (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3"), e = e.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/"), e = e.replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/"))
    }

    function g(e, t) {
        return isString(t) && (t = f(t)), C(e).replaceChild(t, e), t
    }

    function m(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }

    function b(e) {
        return m((e || {}).nextSibling)
    }

    function y(e) {
        return m((e || {}).previousSibling, 1)
    }

    function x(e) {
        return m((e || {}).firstChild)
    }

    function k(e) {
        return m((e || {}).lastChild, 1)
    }

    function C(e) {
        return (e || {}).parentNode
    }

    function T(e) {
        for (var t = [], o = e.childNodes, n = 0; n < o.length; n++) o[n].tagName && t.push(o[n]);
        return t
    }

    function L(e, t) {
        var o = C(t);
        return o && o.insertBefore(e, t)
    }

    function S(e, t) {
        var o = C(t);
        return o && o.insertBefore(e, b(t))
    }

    function E(e, t) {
        return e ? s(t, e) : e
    }

    function B(e, t, o) {
        return e ? "undefined" != typeof o ? (null === o ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, o), o) : e.getAttribute("data-" + t) : null
    }

    function A(e) {
        for (var t = 0; null != (e = y(e));) t++;
        return t
    }

    function P(e, t) {
        do e = C(e); while (e && !M(e, t));
        return e
    }

    function N(e, t, o) {
        for (var n = null; null === n && e;) e = -1 === o ? y(e) : b(e), e && M(e, t) && (n = e);
        return n
    }

    function M(e, t) {
        if (e = n(e), !e || e == document) return !1;
        var o = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function(e) {
            for (var t = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(e), o = t.length; --o >= 0 && t[o] !== this;);
            return o > -1
        };
        return o.call(e, t)
    }

    function j(e) {
        return M(e, ":hover")
    }

    function I(e, t) {
        var o = n(e);
        if (t = n(t), !e || !t) return !1;
        for (; o = o.parentNode;)
            if (o == t) return !0;
        return !1
    }

    function H() {
        var e = browser.msie6 ? n("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function F(e, t) {
        t = t || {};
        for (var o = t.fromEl || C(e), n = t.positions || ["relative", "absolute", "fixed"]; o && o != bodyNode;) {
            var i = re(o, "position");
            if (inArray(i, n) && (!t.noOverflow || "hidden" != re(o, "overflow"))) break;
            o = C(o)
        }
        return o
    }

    function D(e, t) {
        e = n(e);
        for (var o, i, a, r, s = e; s && s.tagName && s !== bodyNode && (o = re(s, "position"), i = re(s, "overflow"), a = re(s, "transform"), !t || !browser.mozilla || "page_wrap" == s.id || s === e || "visible" === i || ("static" === o ? r && "relative" !== r : "fixed" === r));) "none" !== a ? r = void 0 : "static" !== o && "fixed" !== r && (r = o), s = C(s);
        return s
    }

    function q(e) {
        var t = arguments.length;
        if (t > 1)
            for (var o = 0; t > o; o++) q(arguments[o]);
        else if (e = n(e), e && e.style) {
            var i = e.olddisplay,
                a = "block",
                r = e.tagName.toLowerCase();
            e.style.display = i || "", "none" === re(e, "display") && (a = Q(e, "inline") || Q(e, "_inline") ? "inline" : Q(e, "_inline_block") ? "inline-block" : "tr" !== r || browser.msie ? "table" !== r || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = a)
        }
    }

    function O(e) {
        var t = arguments.length;
        if (t > 1)
            for (var o = 0; t > o; o++) O(arguments[o]);
        else if (e = n(e), e && e.style) {
            var i = re(e, "display");
            e.olddisplay = "none" != i ? i : "", e.style.display = "none"
        }
    }

    function V(e) {
        return e = n(e), e && e.style ? "none" != re(e, "display") : !1
    }

    function R() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function W(e, t, o) {
        e = n(e), o = o || 0;
        var i = G(e)[1],
            a = X(e)[1],
            r = window,
            s = document.documentElement,
            l = Math.max(intval(r.innerHeight), intval(s.clientHeight)),
            d = n("page_header_cont"),
            c = s.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            u = vk.staticheader ? Math.max(0, X(d)[1] - c) : X(d)[1];
        if (t) {
            if (c + u + o > i + a) return i + a - c - u - o;
            if (i > c + l - o) return i - c - l + o
        } else {
            if (c + u + o > i) return i - c - u - o;
            if (i + a > c + l - o) return i + a - c - l + o
        }
        return 0
    }

    function z(e, t) {
        return void 0 === t && (t = !V(e)), t ? q(e) : O(e), t
    }

    function Y(e) {
        return "undefined" != typeof e.getBoundingClientRect
    }

    function U(e, t) {
        var o;
        if (t && "inline" == re(e, "display")) {
            var n = e.getClientRects();
            o = n && n[0] || e.getBoundingClientRect()
        } else o = e.getBoundingClientRect();
        return o
    }

    function G(e, t) {
        if (e = n(e), !e) return [0, 0];
        var o, i, a = {
                top: 0,
                left: 0
            },
            r = e.ownerDocument;
        return r ? (o = r.documentElement, Y(e) && (a = U(e, !0)), i = r == r.window ? r : 9 === r.nodeType ? r.defaultView || r.parentWindow : !1, [a.left + (t ? 0 : i.pageXOffset || o.scrollLeft) - (o.clientLeft || 0), a.top + (t ? 0 : i.pageYOffset || o.scrollTop) - (o.clientTop || 0)]) : [0, 0]
    }

    function K(e) {
        return null != e && e === e.window
    }

    function X(e, t, o) {
        e = n(e);
        var i, a = [0, 0],
            r = document.documentElement;
        if (t && "border-box" === re(e, "boxSizing") && (t = !1), e == document) a = [Math.max(r.clientWidth, bodyNode.scrollWidth, r.scrollWidth, bodyNode.offsetWidth, r.offsetWidth), Math.max(r.clientHeight, bodyNode.scrollHeight, r.scrollHeight, bodyNode.offsetHeight, r.offsetHeight)];
        else if (e) {
            var s = function() {
                a = Y(e) && (i = U(e, o)) && void 0 !== i.width ? [i.width, i.height] : [e.offsetWidth, e.offsetHeight], t && each(a, function(t, o) {
                    var n = t ? ["Top", "Bottom"] : ["Left", "Right"];
                    each(n, function() {
                        a[t] -= parseFloat(re(e, "padding" + this)) || 0, a[t] -= parseFloat(re(e, "border" + this + "Width")) || 0
                    })
                })
            };
            if (V(e)) s();
            else {
                var l = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    d = {},
                    c = !1;
                e.style.cssText.indexOf("!important") > -1 && (c = e.style.cssText), each(l, function(t, o) {
                    d[t] = e.style[t], e.style[t] = o
                }), s(), each(l, function(t, o) {
                    e.style[t] = d[t]
                }), c && (e.style.cssText = c)
            }
        }
        return a
    }

    function $(e) {
        return X(e)[0]
    }

    function Z(e) {
        return X(e)[1]
    }

    function Q(e, t) {
        return e = n(e), e && 1 === e.nodeType && (" " + e.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0 ? !0 : !1
    }

    function J(e, t) {
        (e = n(e)) && !Q(e, t) && (e.className = (e.className ? e.className + " " : "") + t)
    }

    function ee(e, t) {
        return setTimeout(J.pbind(e, t), 0)
    }

    function te(e, t) {
        (e = n(e)) && (e.className = trim((e.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
    }

    function oe(e, t) {
        return setTimeout(te.pbind(e, t), 0)
    }

    function ne(e, t, o) {
        return void 0 === o && (o = !Q(e, t)), (o ? J : te)(e, t), o
    }

    function ie(e, t, o) {
        return void 0 === o && (o = !Q(e, t)), (o ? ee : oe)(e, t), o
    }

    function ae(e, t, o) {
        te(e, t), J(e, o)
    }

    function re(e, t, o) {
        if (e = n(e), isArray(t)) {
            var i = {};
            return each(t, function(t, o) {
                i[o] = re(e, o)
            }), i
        }
        if (!e) return "";
        if (void 0 === o && (o = !0), !o && "opacity" == t && browser.msie) {
            var a = e.style.filter;
            return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!o && e.style && (e.style[t] || "height" == t)) return e.style[t];
        var r, s = document.defaultView || window;
        if (s.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var l = s.getComputedStyle(e, null);
            l && (r = l.getPropertyValue(t))
        } else if (e.currentStyle) {
            if ("opacity" == t && browser.msie) {
                var a = e.currentStyle.filter;
                return a && a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var d = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            r = e.currentStyle[t] || e.currentStyle[d], "auto" == r && (r = 0), r = (r + "").split(" "), each(r, function(t, o) {
                if (!/^\d+(px)?$/i.test(o) && /^\d/.test(o)) {
                    var n = e.style,
                        i = n.left,
                        a = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, n.left = o || 0, r[t] = n.pixelLeft + "px", n.left = i, e.runtimeStyle.left = a
                }
            }), r = r.join(" ")
        }
        if (o && ("width" == t || "height" == t)) {
            var c = X(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            r = (intval(r) ? Math.max(floatval(r), c) : c) + "px"
        }
        return r
    }

    function se(e, t, o) {
        if (e = n(e)) {
            if ("object" == ("undefined" == typeof t ? "undefined" : be(t))) return each(t, function(t, o) {
                se(e, t, o)
            });
            if ("opacity" == t) browser.msie && ((o + "").length ? 1 !== o ? e.style.filter = "alpha(opacity=" + 100 * o + ")" : e.style.filter = "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== o && (e.style.opacity = o);
            else try {
                var i = "number" == typeof o;
                i && /height|width/i.test(t) && (o = Math.abs(o)),
                    o = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? o + "px" : o, e.style[t] !== o && (e.style[t] = o)
            } catch (a) {
                debugLog("setStyle error: ", [t, o], a)
            }
        }
    }

    function le(e, t, o) {
        setTimeout(se.pbind(e, t, o), 0)
    }

    function de(e, t, o) {
        var i = ce(e, "pseudo-id");
        i || (ce(e, "pseudo-id", i = irand(1e8, 999999999)), J(e, "_pseudo_" + i));
        var a = t + "-style-" + i,
            r = n(a),
            s = "._pseudo_" + i + ":" + t + "{";
        r || (r = headNode.appendChild(h("style", {
            id: a,
            type: "text/css"
        }))), each(o, function(e, t) {
            s += e + ": " + t + " !important;"
        }), s += "}", r.sheet ? (r.sheet.cssRules.length && r.sheet.deleteRule(0), r.sheet.insertRule(s, 0)) : r.styleSheet && (r.styleSheet.cssText = s)
    }

    function ce(e, t, o) {
        if (!e) return !1;
        var n, i = e[vkExpand];
        return i || (i = e[vkExpand] = ++vkUUID), o !== n && (vkCache[i] || (vkCache[i] = {}, __debugMode && (vkCache[i].__elem = e)), vkCache[i][t] = o), t ? vkCache[i] && vkCache[i][t] : i
    }

    function ue(e, t, o) {
        return e = n(e), "undefined" == typeof o ? e.getAttribute(t) : (e.setAttribute(t, o), o)
    }

    function he(e) {
        for (var t = 0, o = arguments.length; o > t; ++t) {
            var n = arguments[t];
            if (void 0 !== e[n]) try {
                delete e[n]
            } catch (i) {
                try {
                    e.removeAttribute(n)
                } catch (i) {}
            }
        }
    }

    function pe(e, t) {
        var o = e ? e[vkExpand] : !1;
        if (o)
            if (t) {
                if (vkCache[o]) {
                    delete vkCache[o][t], t = "";
                    var n = 0;
                    for (t in vkCache[o])
                        if ("__elem" !== t) {
                            n++;
                            break
                        }
                    n || pe(e)
                }
            } else removeEvent(e), he(e, vkExpand), delete vkCache[o]
    }

    function fe() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var o = n(e[t]);
            o && (pe(o), he(o, "btnevents"))
        }
    }

    function we(e, t, o) {
        if (e = n(e), e && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", o || e.innerText || e.textContent);
            else {
                var i = a("b", e);
                i && i.scrollWidth > i.clientWidth ? e.setAttribute("title", o || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function _e() {
        var e = n("zoom_test_1") || document.body.appendChild(h("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            })),
            t = n("zoom_test_2") || document.body.appendChild(h("div", {
                id: "zoom_test_2"
            }, {
                left: e.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }));
        return t.offsetLeft / e.offsetLeft
    }

    function ve(e, t, o) {
        return (e = n(e)) ? (void 0 !== t && (e.setValue ? (e.setValue(t), !o && e.phonblur && e.phonblur()) : "INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !o && triggerEvent(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" == e.tagName || "TEXTAREA" == e.tagName ? e.value : e.innerHTML) || "") : void 0
    }

    function ge(e, t, o) {
        e = n(e);
        try {
            if (e.focus(), (void 0 === t || t === !1) && (t = e.value.length), (void 0 === o || o === !1) && (o = t), e.createTextRange) {
                var i = e.createTextRange();
                i.collapse(!0), i.moveEnd("character", o), i.moveStart("character", t), i.select()
            } else e.setSelectionRange && e.setSelectionRange(t, o)
        } catch (a) {}
    }

    function me(e, t, o) {
        for (e = n(e), o = o || 999; e && !t(e);) {
            if (o--, 0 == o) return !1;
            try {
                if (e = C(e), e == document) break
            } catch (i) {
                e = !1
            }
        }
        return e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var be = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.ge = n, t.geByTag = i, t.geByTag1 = a, t.geByClass = r, t.geByClass1 = s, t.gpeByClass = l, t.domQuery = d, t.domQuery1 = c, t.domClosest = u, t.ce = h, t.re = p, t.se = f, t.sech = w, t.rs = _, t.psr = v, t.domReplaceEl = g, t.domEL = m, t.domNS = b, t.domPS = y, t.domFC = x, t.domLC = k, t.domPN = C, t.domChildren = T, t.domInsertBefore = L, t.domInsertAfter = S, t.domByClass = E, t.domData = B, t.domChildIndex = A, t.domCA = P, t.domClosestSibling = N, t.matchesSelector = M, t.isHover = j, t.isAncestor = I, t.getScroll = H, t.domClosestPositioned = F, t.domClosestOverflowHidden = D, t.show = q, t.hide = O, t.isVisible = V, t.clientHeight = R, t.getClientRectOffsetY = W, t.toggle = z, t.boundingRectEnabled = Y, t.getXYRect = U, t.getXY = G, t.isWindow = K, t.getSize = X, t.getW = $, t.getH = Z, t.hasClass = Q, t.addClass = J, t.addClassDelayed = ee, t.removeClass = te, t.removeClassDelayed = oe, t.toggleClass = ne, t.toggleClassDelayed = ie, t.replaceClass = ae, t.getStyle = re, t.setStyle = se, t.setStyleDelayed = le, t.setPseudoStyle = de, t.data = ce, t.attr = ue, t.removeAttr = he, t.removeData = pe, t.cleanElems = fe, t.setTitle = we, t.getZoom = _e, t.val = ve, t.elfocus = ge, t.traverseParent = me;
    var ye = o(17);
    window.cf = function(e) {
        var t = e.createDocumentFragment(),
            o = e.createElement("div"),
            n = e.createRange && e.createRange();
        return t.appendChild(o), n && n.selectNodeContents(o), n && n.createContextualFragment ? function(t) {
            return t ? n.createContextualFragment(t) : e.createDocumentFragment()
        } : function(t) {
            if (!t) return e.createDocumentFragment();
            o.innerHTML = t;
            for (var n = e.createDocumentFragment(); o.firstChild;) n.appendChild(o.firstChild);
            return n
        }
    }(document), window.whitespaceRegex = /[\t\r\n\f]/g, window.cssTransformProp = function() {
        var e = document.createElement("div");
        if (null == e.style.transform) {
            var t = ["Webkit", "Moz", "ms"];
            for (var o in t)
                if (void 0 !== e.style[t[o] + "Transform"]) return t[o] + "Transform"
        }
        return "transform"
    }(), window.vkExpand = window.vkExpand || "VK" + (0, ye.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}, window.ge = n, window.geByTag = i, window.geByTag1 = a, window.geByClass = r, window.geByClass1 = s, window.gpeByClass = l, window.domQuery = d, window.domQuery1 = c, window.domClosest = u, window.ce = h, window.re = p, window.se = f, window.sech = w, window.rs = _, window.psr = v, window.domReplaceEl = g, window.domEL = m, window.domNS = b, window.domPS = y, window.domFC = x, window.domLC = k, window.domPN = C, window.domChildren = T, window.domInsertBefore = L, window.domInsertAfter = S, window.domByClass = E, window.domData = B, window.domChildIndex = A, window.domCA = P, window.domClosestSibling = N, window.matchesSelector = M, window.isHover = j, window.isAncestor = I, window.getScroll = H, window.domClosestPositioned = F, window.domClosestOverflowHidden = D, window.show = q, window.hide = O, window.isVisible = V, window.clientHeight = R, window.getClientRectOffsetY = W, window.toggle = z, window.boundingRectEnabled = Y, window.getXYRect = U, window.getXY = G, window.isWindow = K, window.getSize = X, window.hasClass = Q, window.addClass = J, window.addClassDelayed = ee, window.removeClass = te, window.removeClassDelayed = oe, window.toggleClass = ne, window.toggleClassDelayed = ie, window.replaceClass = ae, window.getStyle = re, window.setStyle = se, window.setStyleDelayed = le, window.setPseudoStyle = de, window.data = ce, window.attr = ue, window.removeAttr = he, window.removeData = pe, window.cleanElems = fe, window.setTitle = we, window.getZoom = _e, window.val = ve, window.elfocus = ge, window.traverseParent = me, window.getH = Z, window.getW = $
}, function(module, exports) {
    function topMsg(e, t, o) {
        if (o || (o = "#D6E5F7"), e) {
            clearTimeout(window.topMsgTimer);
            var n = ge("system_msg");
            n.style.backgroundColor = o, n.innerHTML = e, show(n), t && (window.topMsgTimer = setTimeout(topMsg.pbind(!1), 1e3 * t))
        } else hide("system_msg")
    }

    function topError(text, opts) {
        if (opts || (opts = {}), text.message) {
            var e = text;
            text = "<b>JavaScript error:</b> " + e.message, opts.stack = e.stack, e.stack && __debugMode && (text += "<br/>" + e.stack.replace(/\n/g, "<br/>"));
            try {
                console.log(e.stack)
            } catch (e2) {}
        }
        if (!opts.stack) try {
            eval("0 = 1")
        } catch (e) {
            opts.stack = e.stack
        } - 1 != opts.dt && topMsg(text, opts.dt, "#FFB4A3"), __dev || ge("debuglogwrap") || (delete opts.dt, ajax.plainpost("/errors.php", extend(opts, {
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
        n && (i += " msg_appear"), e = ge(e);
        var a = geByClass1(o, e),
            r = a ? a : domFC(e),
            s = e.insertBefore(ce("div", {
                className: i,
                innerHTML: '<div class="msg_text">' + t + "</div>"
            }), r);
        a && re(a), setTimeout(removeClass.pbind(s, "msg_appear"), 0)
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports.topMsg = topMsg, exports.topError = topError, exports.showMsg = showMsg, window.topMsg = topMsg, window.showMsg = showMsg, window.topError = topError
}, function(e, t) {
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
}, function(e, t) {
    window.ls = {
        checkVersion: function() {
            return void 0 !== window.localStorage && void 0 !== window.JSON
        },
        set: function(e, t) {
            this.remove(e);
            try {
                return ls.checkVersion() ? localStorage.setItem(e, JSON.stringify(t)) : !1
            } catch (o) {
                return !1
            }
        },
        get: function(e) {
            if (!ls.checkVersion()) return !1;
            try {
                return JSON.parse(localStorage.getItem(e))
            } catch (t) {
                return !1
            }
        },
        remove: function(e) {
            try {
                localStorage.removeItem(e)
            } catch (t) {}
        }
    }
}, function(e, t) {
    function o(e, t, n, r) {
        void 0 == t && (t = 400);
        var s = "ontouchstart" in document.documentElement;
        if (s && (t = 0), r || (e = Math.max(0, e - (vk.staticheader ? 0 : getSize("page_header_cont")[1]))), data(bodyNode, "tween") && data(bodyNode, "tween").stop(!1), data(htmlNode, "tween") && data(htmlNode, "tween").stop(!1), window.scrollAnimation = !1, t) {
            var l = function() {
                window.scrollAnimation = !1, 2 === n && ("profile" != cur.module && "public" != cur.module && "group" != cur.module && "groups" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, void 0, !0), updSideTopLink())
            };
            window.scrollAnimation = !0, animate(htmlNode, {
                scrollTop: e
            }, {
                duration: t,
                transition: Fx.Transitions.sineInOut,
                onComplete: l
            }), animate(bodyNode, {
                scrollTop: e
            }, {
                duration: t,
                transition: Fx.Transitions.sineInOut,
                onComplete: l
            })
        } else {
            if (n && 2 !== n) {
                "profile" != cur.module && "public" != cur.module && "group" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, e, !0);
                var d = a() - e;
                return Math.abs(d) > 6 && o(e + (d > 0 ? 6 : -6), 0, 2, !0), updSideTopLink(), clearTimeout(window.scrlToTO), void(window.scrlToTO = setTimeout(o.pbind(e, 100, 2, !0), 0))
            }
            window.scroll(i(), e), n || updSideTopLink()
        }
    }

    function n(e) {
        return o(0, e)
    }

    function i() {
        return window.pageXOffset || scrollNode.scrollLeft || document.documentElement.scrollLeft
    }

    function a() {
        return window.pageYOffset || scrollNode.scrollTop || document.documentElement.scrollTop
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.scrollToY = o, t.scrollToTop = n, t.scrollGetX = i, t.scrollGetY = a, window.scrollToY = o, window.scrollToTop = n, window.scrollGetX = i, window.scrollGetY = a
}, function(e, t) {
    function o(e) {
        for (var t = e, o = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], i = 0, a = o.length; a > i; i++) t = t.split(o[i]).join(n[i]);
        for (var r = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", s = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", i = 0, a = r.length; a > i; i++) t = t.split(r.charAt(i)).join(s.charAt(i));
        return t == e ? null : t
    }

    function n(e) {
        var t, o = e,
            n = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"],
            i = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"],
            a = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ",
            r = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ";
        for (t = 0; t < i.length; t++) o = o.split(i[t]).join(n[t]);
        for (t = 0; t < r.length; t++) o = o.split(r.charAt(t)).join(a.charAt(t));
        return o == e ? null : o
    }

    function i(e) {
        var t, o = e,
            n = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`",
            i = "йцукенгшщзхъфывапролджэячсмитьбю.ё";
        for (t = 0; t < n.length; t++) o = o.split(n.charAt(t)).join(i.charAt(t));
        return o == e ? null : o
    }

    function a(e, t, o) {
        if (!t || !window.langConfig) return e;
        var n;
        if (isArray(t) ? (n = t[1], e != Math.floor(e) ? n = t[langConfig.numRules["float"]] : each(langConfig.numRules["int"], function(o, i) {
                if ("*" == i[0]) return n = t[i[2]], !1;
                var a = i[0] ? e % i[0] : e;
                return -1 != indexOf(i[1], a) ? (n = t[i[2]], !1) : void 0
            })) : n = t, o) {
            for (var i = e.toString().split("."), a = [], r = i[0].length - 3; r > -3; r -= 3) a.unshift(i[0].slice(r > 0 ? r : 0, r + 3));
            i[0] = a.join(langConfig.numDel), e = i.join(langConfig.numDec)
        }
        return n = (n || "%s").replace("%s", e)
    }

    function r(e, t) {
        if (!isArray(t)) return t;
        var o = t[1];
        return window.langConfig ? (each(langConfig.sexRules, function(n, i) {
            return "*" == i[0] ? (o = t[i[1]], !1) : e == i[0] && t[i[1]] ? (o = t[i[1]], !1) : void 0
        }), o) : o
    }

    function s(e) {
        for (var t = e + "", o = arguments, n = o.length, i = 1; n > i; i += 2) {
            var a = "%" == o[i][0] ? o[i] : "{" + o[i] + "}";
            t = t.replace(a, o[i + 1])
        }
        return t
    }

    function l(e, t) {
        var o = t ? window : window.cur;
        o.lang ? extend(o.lang, e) : o.lang = e
    }

    function d() {
        try {
            var e = Array.prototype.slice.call(arguments),
                t = e.shift();
            if (!t) return "...";
            var o = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
            if (!o) {
                var n = t.split("_");
                return n.shift(), n.join(" ")
            }
            return isFunction(o) ? o.apply(null, e) : void 0 === e[0] && !isArray(o) || "raw" === e[0] ? o : a(e[0], o, e[1])
        } catch (i) {
            debugLog("lang error:" + i.message + "(" + Array.prototype.slice.call(arguments).join(", ") + ")")
        }
    }

    function c(e, t, o, n, i, a) {
        var r;
        if (a || (a = ""), isArray(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += o, r = new Date(e)) : r = e, i) t = t[1];
        else {
            var s = "";
            s = isToday(r) ? t[3] : isYesterday(r) ? t[2] : isTomorrow(r) ? t[4] : t[1], !s && t[1] && (s = t[1]), t = s
        }
        var l = "",
            d = {
                hours: r.getHours(),
                minutes: r.getMinutes(),
                seconds: r.getSeconds(),
                day: r.getDate(),
                month: r.getMonth() + 1,
                year: r.getFullYear()
            };
        switch (3 === vk.lang && (l = r.getHours() > 11 ? "pm" : "am", d.hours = r.getHours() % 12 == 0 ? 12 : r.getHours() % 12), vk.lang) {
            case 1:
                switch (r.getHours()) {
                    case 11:
                        t = t.replace(" о ", " об ");
                        break;
                    case 0:
                        t = t.replace(" о ", " в ")
                }
                break;
            case 3:
                !isToday(r) || isYesterday(r) || isTomorrow(r) || (t = a + t);
                break;
            case 12:
            case 73:
                1 == r.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
        }
        return 68 === vk.lang && (d.year = d.year + 543), t.replace("{hour}", d.hours).replace("{num_hour}", leadingZero(d.hours)).replace("{minute}", leadingZero(d.minutes)).replace("{day}", d.day).replace("{num_day}", leadingZero(d.day)).replace("{month}", n[d.month]).replace("{year}", d.year).replace("{short_year}", d.year % 100).replace("{second}", leadingZero(d.seconds)).replace("{am_pm}", l)
    }

    function u(e, t, o, n, i) {
        e *= 1e3, "undefined" == typeof o && (o = !0), "undefined" == typeof n && (n = d("months_of", "raw")), t *= 1e3;
        var a = Date.now(),
            r = new Date(a),
            s = new Date(e + t);
        return !i && e > a && 864e5 > e - a && r.getDate() == s.getDate() ? c(e, "{hour}:{minute} {am_pm}", t, [], !o) : s.getYear() != r.getYear() || a - 157248e5 > e ? c(e, d("global_date", "raw"), t, n, !o) : c(e, d("global_short_date", "raw"), t, n, !o)
    }

    function h(e, t, o, n) {
        return isToday(new Date(1e3 * e + 1e3 * t)) ? c(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !o) : u(e, t, o, n)
    }

    function p(e, t, o) {
        return isArray(t) && e < t.length ? t[e] : a(e, o)
    }

    function f(e, t) {
        var o = "";
        e += t;
        var n = parseInt(Date.now() / 1e3) - e;
        if (60 > n) o = d("global_just_now");
        else if (3600 > n) {
            var i = intval(n / 60);
            o = p(i, d("global_word_mins_ago", "raw"), d("global_mins_ago", "raw"))
        } else if (14400 > n) {
            var a = intval(n / 3600);
            o = p(a, d("global_word_hours_ago", "raw"), d("global_hours_ago", "raw"))
        } else o = w(e, 0, !0, "_l");
        return o
    }

    function w(e, t, o, n) {
        "undefined" == typeof o && (o = !0), "undefined" == typeof t && (t = 0), "undefined" == typeof n && (n = ""), t *= 1e3;
        var i = new Date(1e3 * e),
            a = new Date;
        return i.getFullYear() != a.getFullYear() && i.getTime() < a.getTime() - 1728e5 || Math.abs(i.getTime() - a.getTime()) > 157248e5 ? c(1e3 * e, d("global_date", "raw"), t, d("months_sm_of"), !o) : c(1e3 * e, d("global_short_date_time" + n, "raw"), t, d("months_sm_of"), !o)
    }

    function _(e, t, o) {
        "undefined" == typeof o && (o = !0), "undefined" == typeof t && (t = 0);
        var n = new Date,
            i = n.getFullYear(),
            a = n.getMonth(),
            r = new Date(1e3 * e),
            s = r.getFullYear(),
            l = r.getMonth();
        return i > s && (a > 1 || 9 > l || i - s >= 2) ? c(1e3 * e, d("global_date", "raw"), t, d("months_sm_of", "raw"), !o) : c(1e3 * e, d("global_short_date_time", "raw"), t, d("months_sm_of", "raw"), !o)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.parseLatin = o, t.parseCyr = n, t.parseLatKeys = i, t.langNumeric = a, t.langSex = r, t.langStr = s, t.addLangKeys = l, t.getLang = d, t.langDate = c, t.getShortDate = u, t.getShortDateOrTime = h, t.langWordNumeric = p, t.getDateText = f, t.getBigDateNew = w, t.getSmDate = _, window.parseLatin = o, window.parseCyr = n, window.parseLatKeys = i, window.langNumeric = a, window.langSex = r, window.langStr = s, window.addLangKeys = l, window.getLang = d, window.langDate = c, window.getShortDate = u, window.getShortDateOrTime = h, window.langWordNumeric = p, window.getDateText = f, window.getBigDateNew = w, window.getSmDate = _
}, function(e, t) {
    window.stManager = {
        _waiters: [],
        _wait: function() {
            var e = __stm._waiters.length,
                t = {},
                o = [];
            if (!e) return clearInterval(__stm._waitTimer), void(__stm._waitTimer = !1);
            for (var n = 0; e > n; ++n) {
                for (var i = __stm._waiters[n][0], a = 0, r = i.length; r > a; ++a) {
                    var s = i[a];
                    if (!t[s])
                        if (StaticFiles[s].l || "css" != StaticFiles[s].t || "none" != getStyle(StaticFiles[s].n, "display") || __stm.done(s), StaticFiles[s].l) t[s] = 1;
                        else if (t[s] = -1, vk.loaded) {
                        var l = ++StaticFiles[s].c;
                        (l > __stm.lowlimit && stVersions[s] > 0 || l > __stm.highlimit) && (stVersions[s] < 0 ? (topError("<b>Error:</b> Could not load <b>" + s + "</b>.", {
                            dt: 5,
                            type: 1,
                            msg: "Failed to load with " + __stm.lowlimit + "/" + __stm.highlimit + " limits (" + (vkNow() - vk.started) / 100 + " ticks passed)",
                            file: s
                        }), StaticFiles[s].l = 1, t[s] = 1) : (topMsg("Some problems with loading <b>" + s + "</b>...", 5), stVersions[s] = irand(-1e4, -1), __stm._add(s, StaticFiles[s])))
                    }
                    t[s] > 0 && (i.splice(a, 1), --a, --r)
                }
                i.length || (o.push(__stm._waiters.splice(n, 1)[0][1]), --n, --e)
            }
            for (var n = 0, e = o.length; e > n; ++n) o[n]()
        },
        _addCss: function(e, t) {
            var o = ce("style", {
                    type: "text/css",
                    media: "screen"
                }),
                n = domNS(t);
            return n ? headNode.insertBefore(o, n) : headNode.appendChild(o), o.sheet ? o.sheet.insertRule(e, 0) : o.styleSheet && (o.styleSheet.cssText = e), o
        },
        _srcPrefix: function(e, t) {
            if (!vk.stDomains || __dev || -1 == e.indexOf(".js") && -1 == e.indexOf(".css") || -1 != e.indexOf("lang") || -1 != e.indexOf("dyn-") || -1 != e.indexOf("loader_nav") || "https:" == location.protocol) return "";
            if (-1 != e.indexOf(".css")) return "http://st0.vk.me";
            e = e.replace(/[^a-z\d\.\-_]/gi, "");
            var o, n = intval(t),
                i = e.length;
            for (o = 0; i > o; o++) n += e.charCodeAt(o);
            return "http://st" + (n % vk.stDomains + 1) + ".vk.me"
        },
        _add: function(e, t) {
            var o = e.replace(/[\/\.]/g, "_"),
                n = stVersions[e],
                i = e + "?" + n,
                a = stManager._srcPrefix(e, n);
            if (StaticFiles[e] = {
                    v: n,
                    n: o,
                    l: 0,
                    c: 0
                }, -1 != e.indexOf(".js")) {
                var r = "/js/";
                if (stTypes.fromLib[e] ? r += "lib/" : stTypes.fromCompiled && stTypes.fromCompiled[e] ? r += jsc("web/") : /^lang\d/i.test(e) || stTypes.fromRoot[e] || -1 != e.indexOf("/") || (r += "al/"), StaticFiles[e].t = "js", e == jsc("web/common_web.js")) setTimeout(stManager.done.bind(stManager).pbind(jsc("web/common_web.js")), 0);
                else {
                    var s = a + r + i;
                    __stm._insertNode(s, e), StaticFiles[e].src = s
                }
            } else if (-1 != e.indexOf(".css")) {
                var r = "/css/" + (vk.css_dir || "") + (stTypes.fromRoot[e] || -1 != e.indexOf("/") ? "" : "al/"),
                    s = a + r + i;
                t && t.l && "css" == t.t && (StaticFiles[e].styleNode = __stm._addCss("#" + o + " {display: block; }", __stm._getOldNode(s))), __stm._insertNode(s, e), StaticFiles[e].t = "css", StaticFiles[e].src = s, ge(o) || utilsNode.appendChild(ce("div", {
                    id: o
                }))
            }
        },
        _getOldNode: function(e) {
            if (!headNode.querySelector) return !1;
            e = e.split("?")[0];
            var t;
            return t = e.match(/\.css$/) ? headNode.querySelector('link[href^="' + e + '"]') : headNode.querySelector('script[src^="' + e + '"]')
        },
        _insertNode: function(e, t) {
            var o = e.split("?")[0],
                n = o.match(/\.css$/),
                i = __stm._getOldNode(e);
            n && StaticFiles[t] && StaticFiles[t].styleNode ? i = domNS(StaticFiles[t].styleNode) : i && (i = domNS(i));
            var a;
            n ? (a = ce("link", {
                type: "text/css",
                rel: "stylesheet",
                href: e
            }), a.onload = function() {
                __stm._removeDuplicateNodes(t)
            }) : a = ce("script", {
                type: "text/javascript",
                src: e
            }), i ? headNode.insertBefore(a, i) : headNode.appendChild(a)
        },
        _removeDuplicateNodes: function(e) {
            var t = StaticFiles[e];
            if (t && t.src) {
                var o = t.src.split("?")[0],
                    n = __stm._getOldNode(o);
                if (n) {
                    t.styleNode && (re(t.styleNode), delete StaticFiles[e].styleNode);
                    for (var i = o.match(/\.css$/); n && (n = domNS(n));) {
                        var a = i ? n.href : n.src;
                        if (!a) break;
                        a = a.replace(/^(https?:\/\/([a-z0-9\-\.\_]+))?vk\.com/, "");
                        var r = a.split("?")[0];
                        if (r !== o) break;
                        re(domPS(n))
                    }
                }
            }
        },
        add: function(e, t, o) {
            var n = [],
                i = document.documentElement;
            isArray(e) || (e = [e]);
            for (var a in e) {
                var r = e[a];
                if (r) {
                    -1 != r.indexOf("?") && (r = r.split("?")[0]), /^lang\d/i.test(r) ? stVersions[r] = stVersions.lang : stVersions[r] || (stVersions[r] = 1);
                    var s = browser.opera && 768 == i.clientHeight && 1024 == i.clientWidth;
                    (s || __debugMode) && !browser.iphone && !browser.ipad && r != jsc("web/common_web.js") && "common.css" != r && stVersions[r] > 0 && stVersions[r] < 1e9 && (stVersions[r] += irand(1e9, 2e9));
                    var l = StaticFiles[r];
                    l && l.v == stVersions[r] || __stm._add(r, l), t && !StaticFiles[r].l && n.push(r)
                }
            }
            if (t) {
                if (!n.length) return o === !0 ? setTimeout(t, 0) : t();
                __stm._waiters.push([n, t]), __stm._waitTimer || (__stm._waitTimer = setInterval(__stm._wait, 100))
            }
        },
        done: function(e) {
            stVersions[e] < 0 && topMsg('<b>Warning:</b> Something is bad, please <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.', 10), StaticFiles[e].l = 1, "js" === StaticFiles[e].t && __stm._removeDuplicateNodes(e)
        }
    }, window.__stm = stManager
}, function(e, t) {
    window._layerAnim = !1, window.layers = {
        sh: !_layerAnim || browser.msie || browser.iphone ? function(e, t) {
            show(e), t && t()
        } : function(e, t) {
            fadeIn(e, 200, t)
        },
        hd: !_layerAnim || browser.msie || browser.iphone ? function(e, t) {
            hide(e), t && t()
        } : function(e, t) {
            fadeOut(e, 200, t)
        },
        visible: !1,
        _show: function(e, t, o, n) {
            var i = "layers" + (__bq.count() + 1);
            cancelStackPush(i, function() {}), setStyle(e, {
                opacity: o || "",
                backgroundColor: n || ""
            }), layers.visible || (toggleFlash(), browser.mozilla ? (window._oldScroll = htmlNode.scrollTop, pageNode.style.height = _oldScroll + (window.lastWindowHeight || 0) + "px", pageNode.style.marginTop = -_oldScroll + "px") : bodyNode.style.overflow = "hidden"), layers.visible = !0, addClass(bodyNode, "layers_shown"), t.visibilityHide ? removeClass(t, "box_layer_hidden") : show(t), layers.sh(e), pauseLastInlineVideo(), window.updateWndVScroll && updateWndVScroll()
        },
        _hide: function(e, t) {
            var o = function() {
                var e = "layers" + (__bq.count() + 1);
                cancelStackFilter(e), t && t.visibilityHide ? addClass(t, "box_layer_hidden") : hide(t), isVisible(layerWrap) || cur._inLayer || isVisible(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !isVisible(window.mvLayerWrap)) || isVisible(window.wkLayerWrap) || (layers.visible = !1, removeClass(bodyNode, "layers_shown"), toggleFlash(!0), browser.mozilla ? (pageNode.style.height = "auto", pageNode.style.marginTop = "0px", window._oldScroll && (htmlNode.scrollTop = _oldScroll)) : bodyNode.style.overflow = "auto"), window.updateWndVScroll && updateWndVScroll()
            };
            layers.hd(e, o)
        }
    }, window.__lq = window.layerQueue = {
        push: function(e) {
            var t, o = __lq.count() ? __lq._layers[__lq._layers.length - 1] : !1;
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
                VideoPlaylist.getCurListId() && (i = extend(i, {
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
                myLoc: wkcur.myLoc
            }];
            else {
                if (!cur.storyLayer) return !1;
                t = ["stories", cur.storyLayer.getList()]
            }
            return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || __lq._layers.push(t), __lq.skipVideo = !1, !0
        },
        noHistory: function() {
            for (var e = __lq._layers, t = e.length; t > 0; --t) "photo" == e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" == e[t - 1][0] && (e[t - 1][3].noHistory = 1)
        },
        hide: function(e) {
            function t() {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function() {
            __lq._bl = !0, window.WkView && layers.fullhide == WkView.hide ? (hide(wkLayerWrap), clearTimeout(wkcur.showT)) : layers.fullhide && layers.fullhide(!0, !0), setTimeout(layerQueue.unblock, 5)
        }),
        unblock: function() {
            __lq._bl = !1
        },
        pop: function() {
            if (__lq.count() && !__lq._bl) {
                var e = __lq._layers.pop();
                return __lq.skipVideo && (__lq.skipVideo = !1, "video" == e[0]) ? (__lq._layers.push(e), void(__lq.skipVideo = !1)) : void("photo" == e[0] ? (extend(e[3], {
                    fromQueue: !0
                }), showPhoto(e[1], e[2], e[3], !1)) : "video" == e[0] ? (extend(e[3], {
                    fromQueue: !0
                }), showVideo(e[1], e[2], e[3], !1)) : "wiki" == e[0] ? showWiki({
                    w: e[1]
                }, !1, !1, e[3]) : "stories" == e[0] && showStory(e[1]))
            }
        },
        back: function(e, t, o, n) {
            for (var i = __lq._layers, a = i.length; a > 0; --a)
                if (i[a - 1][0] == e && i[a - 1][1] == t || i[a - 1][0] == o && i[a - 1][1] == n) return __lq._layers = i.slice(0, a), __lq.pop(), !0;
            return !1
        },
        count: function() {
            return __lq._layers.length
        },
        clear: function() {
            __lq._layers = []
        },
        _layers: []
    }
}, function(module, exports) {
    function showVideo(e, t, o, n) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (!checkEvent(n)) {
            if (window.mvcur && mvcur.mvShown && mvcur.minimized && mvcur.videoRaw == e) return Videoview.unminimize(), !1;
            o || (o = {});
            var i = nav.objLoc.claim,
                a = ["videoview.js", "videoview.css", "page.js", "page.css"],
                r = o.addParams && /^-?\d+_\d+$/.test(o.addParams.post_id) ? o.addParams.post_id : !1;
            if (!o.playlistId && r && (/^public|groups|profile$/.test(cur.module) && hasClass("post" + r, "own") ? o.playlistId = "wall_" + cur.oid : o.playlistId = "post_" + o.addParams.post_id), o.playlistId && (o.addParams = extend(o.addParams, {
                    playlist_id: o.playlistId
                }), !window.VideoPlaylist || !VideoPlaylist.getList(o.playlistId)))
                if (/^wall_/.test(o.playlistId)) {
                    var s = cur.wallVideos && cur.wallVideos[o.playlistId];
                    o.addParams.load_playlist = s && s.list.length >= 50 ? 0 : 1
                } else o.addParams.load_playlist = !/^(?:post_)?-?\d+_-?\d+$/.test(o.playlistId) || cur.pageVideosList && cur.pageVideosList[o.playlistId] ? 0 : 1;
            !o.expandPlayer && cur.videoInlinePlayer && cur.videoInlinePlayer.getVideoId() == e && cur.videoInlinePlayer.canExpand() && (o.expandPlayer = cur.videoInlinePlayer), o.expandPlayer && (o.addParams = extend(o.addParams, {
                expand_player: 1
            }), delete cur.videoInlinePlayer);
            var l = new callHub(function() {
                o.hidden ? o.hidden(l.data, o, t, e) : Videoview.showVideo.apply(Videoview, l.data)
            }, 2);
            stManager.add(a, function() {
                l.failed || (o.hidden || (revertLastInlineVideo(), Videoview.show(n, e, t, o)), l.done())
            }), extend(o, {
                onDone: function() {
                    var t = Array.prototype.slice.call(arguments);
                    t.unshift(e), l.data = t, l.done()
                },
                onFail: function(t) {
                    if (l.failed = 1, !o.hidden) {
                        if (window.mvcur && mvcur.mvShown) Videoview.hide();
                        else {
                            var n = clone(nav.objLoc);
                            n.z == "video" + e && delete n.z, n[0] == "video" + e && (n[0] = "videos" + e.split("_")[0]), nav.setLoc(n)
                        }
                        showFastBox(getLang("global_error"), t || getLang("global_error_occured"))
                    }
                    return !0
                },
                cache: "status" != t
            });
            var d = o.params;
            return d || (d = {
                act: "show",
                video: e,
                list: t,
                autoplay: o.autoplay ? 1 : 0,
                ad_video: o.ad_video,
                module: o.module || currentModule() || "",
                svids: o.svids
            }), o.addParams && (d = extend(d, o.addParams)), trim(d.module) || extend(d, {
                _nol: JSON.stringify(nav.objLoc)
            }), i && (d.claim = i), ajax.post("al_video.php", d, o), vkImage().src = locProtocol + "//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-", cur.articleLayer && cur.articleLayer.videoOpened(), !1
        }
    }

    function showInlineVideo(videoId, listId, options, ev, thumb) {
        function onDone(title, html, js, opts) {
            revertLastInlineVideo(), hide(thumb);
            var videoWrap = ce("div", {
                innerHTML: html
            }, {
                width: w,
                height: h
            });
            if (_videoLastInlined = [videoWrap, thumb], thumb.parentNode.appendChild(videoWrap), cur.mvOpts = opts && opts.mvData ? opts.mvData : !1, opts.player) {
                var container = domByClass(videoWrap, "video_box_wrap");
                isFunction(onLoaded) && (opts.player.params[0].onPlayerLoaded = onLoaded), VideoInitializer.initPlayer(container, opts.player.type, opts.player.params)
            }
            try {
                eval("(function () {" + js + "})();")
            } catch (e) {}
            if (!params.from_autoplay) {
                var _n = window.Notifier,
                    _a = window.audioPlayer;
                _n && setTimeout(function() {
                    _n.lcSend("video_start")
                }, 0);
                var ap = window.ap;
                ap && ap.isPlaying() && (ap.pause(), ap.pausedByVideo = vkNow())
            }
            thumb.setAttribute("data-playing", 1)
        }

        function onFail(e) {
            params.from_autoplay || showFastBox(getLang("global_error"), e || getLang("global_error_occured"))
        }

        function showProgress() {
            thumb.setAttribute("data-loading", 1), options.no_progress || (addClass(btn, "page_post_video_play_inline_loading"), val(btn, getProgressHtml()))
        }

        function hideProgress() {
            thumb.removeAttribute("data-loading"), options.no_progress || (removeClass(btn, "page_post_video_play_inline_loading"), val(btn, ""))
        }
        if (checkEvent(ev)) return !0;
        if (window.mvcur && mvcur.mvShown) return showVideo(videoId, listId, options, ev);
        if (attr(thumb, "data-loading")) return !1;
        options = options || {};
        var h = thumb.clientHeight,
            w = thumb.clientWidth,
            btn = domByClass(thumb, "page_post_video_play_inline"),
            onLoaded = options.onLoaded;
        onLoaded && delete options.onLoaded;
        var params = {
            video: videoId,
            list: listId,
            autoplay: options.autoplay,
            module: options.module
        };
        return domData(thumb, "stretch-vertical") && (params.stretch_vertical = 1), extend(params, options.addParams), showProgress(), loadInlineVideo(params, function(e, t) {
            hideProgress(), e ? onDone.apply(null, t) : onFail.apply(null, t)
        }, options.cache), cur.videoInlinePlayerDestroyerSet || (cur.destroy.push(destroyInlineVideoPlayer), cur.videoInlinePlayerDestroyerSet = 1), vkImage().src = "//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-", !1
    }

    function loadInlineVideo(e, t, o) {
        function n(e, o) {
            isFunction(t) && t(e, o)
        }
        var e = extend({
            autoplay: 0,
            module: cur.module
        }, e);
        trim(e.module) || (e._nol = JSON.stringify(nav.objLoc));
        var i = ["videoview.js"];
        e.from_autoplay && i.push("videoplayer.js", "videoplayer.css", "hls.min.js"), ajax.post("al_video.php?act=show_inline", e, {
            onDone: function() {
                var e = [].slice.call(arguments);
                n(!0, e)
            },
            onFail: function() {
                var e = [].slice.call(arguments);
                return n(!1, e), !0
            },
            stat: i,
            local: 1,
            cache: o
        })
    }

    function revertLastInlineVideo(e) {
        if (_videoLastInlined) {
            var t, o = !1;
            if ((e = ge(e)) && (t = _videoLastInlined[0])) {
                for (; t = t.parentNode;)
                    if (t == e) {
                        o = !0;
                        break
                    }
                if (!o) return
            }
            re(_videoLastInlined[0]), show(_videoLastInlined[1]), _videoLastInlined[1].removeAttribute("data-playing"), _videoLastInlined = !1, destroyInlineVideoPlayer(), delete cur.mvOpts
        }
    }

    function destroyInlineVideoPlayer() {
        cur.videoInlinePlayer && (cur.videoInlinePlayer.destroy(), delete cur.videoInlinePlayer)
    }

    function pauseLastInlineVideo() {
        if (_videoLastInlined) {
            var e = cur.videoInlinePlayer || ge("video_player") || ge("video_yt") && window.VideoYoutube;
            e && (e.togglePlay ? e.togglePlay(!1) : e.playVideo && e.playVideo(!1))
        }
    }

    function checkMp4(e) {
        function t(t, o) {
            if (!i) {
                i = !0;
                var r = t ? window.localStorage : window.sessionStorage;
                try {
                    r.setItem("video_can_play_mp4", intval(t))
                } catch (s) {}
                e(t, o), clearTimeout(n), a.src = "", a.load(), a = a.onloadedmetadata = a.onerror = null
            }
        }
        if (browser.smart_tv) return void e(!0);
        if (ls.get("video_can_play_mp4")) return void e(!0);
        var o = window.sessionStorage && sessionStorage.getItem("video_can_play_mp4");
        if (null != o) return void e(!!intval(o));
        var n, i, a = ce("video");
        a.canPlayType && a.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"').replace("no", "") ? (a.onloadedmetadata = t.pbind(!0), a.onerror = function() {
            t(!1, "error_" + a.error.code)
        }, a.src = "/images/blank.mp4", a.load(), n = setTimeout(t.pbind(!1, "timeout"), 3e3)) : t(!1, "video_type")
    }
    Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.showVideo = showVideo, exports.showInlineVideo = showInlineVideo, exports.loadInlineVideo = loadInlineVideo, exports.revertLastInlineVideo = revertLastInlineVideo, exports.destroyInlineVideoPlayer = destroyInlineVideoPlayer, exports.pauseLastInlineVideo = pauseLastInlineVideo, exports.checkMp4 = checkMp4, window._videoLastInlined = !1, window.VideoConstants = {
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
        }, window.showVideo = showVideo, window.showInlineVideo = showInlineVideo, window.loadInlineVideo = loadInlineVideo, window.revertLastInlineVideo = revertLastInlineVideo, window.destroyInlineVideoPlayer = destroyInlineVideoPlayer, window.pauseLastInlineVideo = pauseLastInlineVideo,
        window.checkMp4 = checkMp4
}]);