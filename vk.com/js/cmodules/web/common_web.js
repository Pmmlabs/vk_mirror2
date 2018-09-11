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
    }, o.p = "", o(o.s = 46)
}([function(e, t, o) {
    'eat script';

    function n() {
        window._logTimer = (new Date).getTime()
    }

    function i(e, t) {
        window.Raven && (t && t.length > 350 && (t = t.slice(0, 150) + "..." + t.slice(-150)), e.message += ": " + t, Raven.captureException(e))
    }

    function r(e) {
        try {
            window.debuglogClient && debuglogClient(e);
            var t = "[" + ((new Date).getTime() - window._logTimer) / 1e3 + "] ";
            if (window.console && console.log) {
                var o = Array.prototype.slice.call(arguments);
                o.unshift(t), browser.msie || browser.mobile ? console.log(o.join(" ")) : console.log.apply(console, o)
            }
        } catch (e) {}
    }

    function a(e) {
        if (!e) return !1;
        var t = e.tagName,
            o = e.id,
            n = e.className,
            i = (t || "").toLowerCase();
        return n && (i += "." + e.className.replace(/\s+/g, ".")), o && !/^__vk/.test(o) && (i += "#" + e.id), i || (e.toString() || "[NULL]")
    }
    o.r(t), o.d(t, "initDebugTools", function() {
        return n
    }), o.d(t, "logEvalError", function() {
        return i
    }), o.d(t, "debugLog", function() {
        return r
    }), o.d(t, "debugEl", function() {
        return a
    })
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = o(109),
        i = o(95),
        r = o(11),
        a = o(119);
    var s = function() {
        function e(t, o) {
            if (function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.constructor !== e) throw new Error("ElementTooltip was called without 'new' operator");
            if (!(t = ge(t)) || !t.nodeType) throw new Error("First argument not a DOM element");
            if (Object(n.data)(t, "ett")) return Object(n.data)(t, "ett");
            if (this._opts = extend({
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
            this._opts.autoShow && (this._el_me_event = this._onMouseEnter.bind(this), addEvent(e, "mouseenter", this._el_me_event)), (this._opts.autoShow || this._opts.autoHide) && (this._el_ml_event = this._onMouseLeave.bind(this), addEvent(e, "mouseleave", this._el_ml_event)), this._opts.autoShow || this._opts.customShow || (this._el_c_event = function() {
                t._isShown && t._opts.noHideOnClick || t.toggle(!t._isShown)
            }, addEvent(e, "click", this._el_c_event))
        }, e.prototype._onMouseEnter = function(e) {
            clearTimeout(this._hto), this._hto = !1, !this._isShown && this._opts.autoShow && (clearTimeout(this._reTimeout), this._reTimeout = !1, clearTimeout(this._sto), this._sto = setTimeout(this.show.bind(this), this._opts.delay))
        }, e.prototype._onMouseLeave = function(e) {
            this._clearTimeouts(), this._hto = setTimeout(this._hide.bind(this), 200)
        }, e.prototype._onMouseWindowClick = function(e) {
            if (!this._opts.noAutoHideOnWindowClick) {
                for (var t = e.target; t && t !== this._ttel && t !== document.body && t !== this._el;) t = Object(n.domPN)(t);
                if (!hasClass(e.target, "_ap_layer__close")) return t && t !== document.body ? void 0 : (this.hide(!0), Object(r.cancelEvent)(e))
            }
        }, e.prototype.destroy = function() {
            this._el_me_event && Object(r.removeEvent)(this._el, "mouseenter", this._el_me_event), this._el_ml_event && Object(r.removeEvent)(this._el, "mouseleave", this._el_ml_event), this._el_c_event && Object(r.removeEvent)(this._el, "click", this._el_c_event), this._clearTimeouts(), Object(n.removeData)(this._el, "ett"), Object(n.re)(this._ttel), this._ev_wclick && Object(r.removeEvent)(document, "mousedown", this._ev_wclick);
            var e = void 0;
            this._ttel && (e = geByClass1("_eltt_content", this._ttel)), this._opts.onDestroy && this._opts.onDestroy(e)
        }, e.prototype.hide = function(e) {
            this._hide(e)
        }, e.prototype._onTooltipMouseEnter = function(e) {
            this._clearTimeouts()
        }, e.prototype._onTooltipMouseLeave = function(e) {
            this._onMouseLeave()
        }, e.prototype.build = function() {
            if (!this._ttel) {
                this._ttel = Object(n.se)('\n        <div class="eltt ' + (this._opts.cls || "") + '" id="' + this._opts.id + '">\n          <div class="eltt_arrow_back _eltt_arrow_back">\n            <div class="eltt_arrow"></div>\n          </div>\n          <div class="eltt_content _eltt_content"></div>\n        </div>'), this._ttArrowEl = geByClass1("_eltt_arrow_back", this._ttel);
                var e = geByClass1("_eltt_content", this._ttel);
                this._opts.content && (isString(this._opts.content) ? e.innerHTML = this._opts.content : e.appendChild(this._opts.content)), this._appendToEl.appendChild(this._ttel)
            }
        }, e.prototype.show = function() {
            if (this._isShown) this.updatePosition();
            else {
                if (this._clearTimeouts(), this._ttel || (this.build(), (this._opts.autoShow || this._opts.autoHide) && (this._ev_ttenter = this._onTooltipMouseEnter.bind(this), this._ev_ttleave = this._onTooltipMouseLeave.bind(this), addEvent(this._ttel, "mouseenter", this._ev_ttenter), addEvent(this._ttel, "mouseleave", this._ev_ttleave))), this._opts.width) {
                    var e = Object(i.isFunction)(this._opts.width) ? this._opts.width.call(this) : this._opts.width;
                    Object(n.setStyle)(this._ttel, "width", e)
                }
                Object(n.show)(this._ttel);
                var t = geByClass1("_eltt_content", this._ttel);
                this._opts.onFirstTimeShow && !this._firstTimeShown && this._opts.onFirstTimeShow.call(this, t, this._ttel), this._opts.onShow && this._opts.onShow(t, !this._firstTimeShown), this._firstTimeShown = !0, this.updatePosition(), this._isShown = !0, this.updatePosition(), this._visTO = setTimeout(addClass.pbind(this._ttel, "eltt_vis"), 10), this._opts.elClassWhenShown && addClass(this._el, this._opts.elClassWhenShown), this._ev_wclick && Object(r.removeEvent)(document, "mousedown", this._ev_wclick), this._ev_wclick = this._onMouseWindowClick.bind(this), addEvent(document, "mousedown", this._ev_wclick)
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
                var s = Object(n.getXY)(this._el),
                    c = Object(n.getSize)(this._el);
                r = {
                    left: s[0],
                    top: s[1],
                    width: c[0],
                    height: c[1]
                }
            }
            var l = Object(n.gpeByClass)("audio_layer_container", this._ttel),
                d = l || Object(n.domClosestOverflowHidden)(this._ttel),
                _ = d !== bodyNode ? Object(n.getXY)(d) : [Object(a.scrollGetX)(), Object(a.scrollGetY)() + getPageHeaderHeight()],
                u = d !== bodyNode ? Object(n.getSize)(d) : [window.innerWidth, window.innerHeight],
                p = Object(n.getSize)(this._ttel),
                f = this._arrowSize,
                h = this._opts.noBorder ? 0 : 1,
                w = Object(i.isFunction)(this._opts.offset) ? this._opts.offset() : this._opts.offset,
                v = void 0,
                b = function(o, i) {
                    var a = {},
                        s = [vk.rtl ? "marginRight" : "marginLeft", "marginTop"].indexOf(o),
                        c = void 0;
                    c = t._opts.align === (vk.rtl ? e.ALIGN_LEFT : e.ALIGN_RIGHT) ? p[s] - Math.max(h + f + (i || 0), Math.min(p[s], r[s ? "height" : "width"]) / 2) : t._opts.align === (vk.rtl ? e.ALIGN_RIGHT : e.ALIGN_LEFT) ? Math.max(h + f + (i || 0), Math.min(p[s], r[s ? "height" : "width"]) / 2) : p[s] / 2, a[o] = Math.floor(c) - h - f - (i || 0), Object(n.setStyle)(t._ttArrowEl, a)
                };
            if (this._opts.setPos) v = this._opts.setPos(this) || {}, e.getType(o) === e.TYPE_VERTICAL ? void 0 !== v.arrowPosition ? Object(n.setStyle)(this._ttArrowEl, {
                marginLeft: v.arrowPosition
            }) : vk.rtl ? b("marginRight") : b("marginLeft") : void 0 !== v.arrowPosition ? Object(n.setStyle)(this._ttArrowEl, {
                marginTop: v.arrowPosition
            }) : b("marginTop");
            else {
                if (!o && this._prevSide && this._opts.preventSideChange) o = this._prevSide;
                else if (!o)
                    if (this._opts.type === e.TYPE_VERTICAL) {
                        var g = hasClass(bodyNode, "body_im") ? 60 : this._opts.bottomGap || 0,
                            m = r.top - _[1] > p[1] + f - w[1],
                            y = Object(a.scrollGetY)() + u[1] - (r.top + r.height + f) - g > p[1];
                        o = "top" === this._opts.defaultSide ? m ? "top" : "bottom" : y ? "bottom" : "top"
                    } else o = r.left - _[0] < p[0] ? "right" : "left";
                var O = Object(n.getXY)(this._appendToEl),
                    E = [r.left - O[0], r.top - O[1]],
                    k = void 0,
                    x = w[0] + E[0];
                this._opts.centerShift ? (x += this._opts.centerShift || 0, k = this._opts.centerShift) : this._opts.rightShift && (x += k = -(p[0] / 2 - this._opts.rightShift)), this._prevSide = o;
                var C = void 0,
                    T = void 0,
                    j = void 0,
                    L = void 0,
                    P = void 0;
                switch (this._opts.align === (vk.rtl ? e.ALIGN_LEFT : e.ALIGN_RIGHT) ? (C = r.width - p[0], T = r.height - p[1]) : this._opts.align === (vk.rtl ? e.ALIGN_RIGHT : e.ALIGN_LEFT) ? (C = 0, T = 0) : (C = -p[0] / 2 + r.width / 2, T = r.height / 2 - p[1] / 2), o) {
                    case "bottom":
                        L = C + x, P = r.height + f - w[1] + E[1], k || ((j = C + r.left + w[0] + p[0] + 20 - (_[0] + u[0])) < 0 && (j = 0), L -= j, k = -j), v = {
                            left: L,
                            top: P
                        };
                        break;
                    case "top":
                        L = C + x, P = -p[1] - f + w[1] + E[1], k || ((j = C + r.left + w[0] + p[0] + 20 - (_[0] + u[0])) < 0 && (j = 0), L -= j, k = -j), v = {
                            left: L,
                            top: P
                        };
                        break;
                    case "right":
                        L = r.width + f + x, P = T + w[1] + E[1], k || ((j = T + r.top + w[1] - (_[1] + 20)) > 0 && (j = 0), P -= j, k = -j), v = {
                            left: L,
                            top: P
                        };
                        break;
                    case "left":
                        L = -p[0] - f + x, P = T + w[1] + E[1], k || ((j = T + r.top + w[1] - (_[1] + 20)) > 0 && (j = 0), P -= j, k = -j), v = {
                            left: L,
                            top: P
                        }
                }
                this._opts.type === e.TYPE_VERTICAL ? vk.rtl ? b("marginRight", k) : b("marginLeft", k) : b("marginTop", k)
            }
            Object(i.each)(["top", "bottom", "left", "right"], function(e, t) {
                o !== t && removeClass(this._ttel, "eltt_" + t)
            }.bind(this)), addClass(this._ttel, "eltt_" + o), Object(n.setStyle)(this._ttel, v)
        }, e.prototype._hide = function(t) {
            if (this._isShown = !1, this._clearTimeouts(), this._reTimeout = setTimeout(function() {
                    hide(this._ttel), this._opts.elClassWhenShown && removeClass(this._el, this._opts.elClassWhenShown), this._opts.onHide && this._opts.onHide(this._ttel, !!t)
                }.bind(this), e.FADE_SPEED), this._opts.onBeforeHide) try {
                this._opts.onBeforeHide(this._ttel, !!t)
            } catch (e) {}
            removeClass(this._ttel, "eltt_vis"), this._ev_wclick && Object(r.removeEvent)(document, "mousedown", this._ev_wclick)
        }, e.prototype.isShown = function() {
            return this._isShown
        }, e.prototype.toggle = function() {
            this.isShown() ? this.hide() : this.show()
        }, e.prototype._clearTimeouts = function() {
            this._visTO && clearTimeout(this._visTO), this._visTO = !1, this._sto && clearTimeout(this._sto), this._sto = !1, this._hto && clearTimeout(this._hto), this._hto = !1, this._reTimeout && clearTimeout(this._reTimeout), this._reTimeout = !1
        }, e.prototype.getContent = function() {
            return geByClass1("_eltt_content", this._ttel)
        }, e
    }();
    s.TYPE_VERTICAL = 0, s.TYPE_HORIZONTAL = 1, s.FADE_SPEED = 100, s.ARROW_SIZE_MINI = 9, s.ARROW_SIZE_NORMAL = 8, s.ARROW_SIZE_BIG = 16, s.ALIGN_LEFT = "left", s.ALIGN_CENTER = "center", s.ALIGN_RIGHT = "right", window.ElementTooltip = s
}, function(e, t, o) {
    var n = o(22);
    e.exports = function(e) {
        return Object(n(e))
    }
}, function(e, t, o) {
    e.exports = !o(87)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, o) {
    var n = o(80),
        i = o(115);
    e.exports = Object.keys || function(e) {
        return n(e, i)
    }
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = o(85);
    window.EventEmitter = n, t.default = n
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "notaBene", function() {
        return c
    }), o.d(t, "updSideTopLink", function() {
        return l
    }), o.d(t, "createButton", function() {
        return d
    }), o.d(t, "actionsMenuItemLocked", function() {
        return _
    }), o.d(t, "lockActionsMenuItem", function() {
        return u
    }), o.d(t, "unlockActionsMenuItem", function() {
        return p
    }), o.d(t, "linkLocked", function() {
        return f
    }), o.d(t, "lockLink", function() {
        return h
    }), o.d(t, "unlockLink", function() {
        return w
    }), o.d(t, "lockButton", function() {
        return v
    }), o.d(t, "unlockButton", function() {
        return b
    }), o.d(t, "buttonLocked", function() {
        return g
    }), o.d(t, "isButtonLocked", function() {
        return m
    }), o.d(t, "disableButton", function() {
        return y
    }), o.d(t, "sbWidth", function() {
        return O
    }), o.d(t, "isChecked", function() {
        return E
    }), o.d(t, "checkbox", function() {
        return k
    }), o.d(t, "disable", function() {
        return x
    }), o.d(t, "radioval", function() {
        return C
    }), o.d(t, "radiobtn", function() {
        return T
    });
    var n = o(109),
        i = o(11),
        r = o(95),
        a = o(119),
        s = o(43);

    function c(e, t, o) {
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

    function l(e) {
        if (window.scrollNode && !browser.mobile && window._tbLink) {
            var t = Object(n.ge)("page_body"),
                o = Object(n.getXY)(t),
                i = Object(a.scrollGetY)(),
                r = bodyNode.scrollLeft,
                c = Object(n.ge)("side_bar"),
                l = Object(n.isVisible)(c);
            if (window._stlSideTop = Math.max((l ? Object(n.getSize)(c)[1] : 0) - i - (browser.mozilla ? Object(n.getXY)(pageNode)[1] : 0), o[1]), e || r != __scrLeft) {
                var d = Object(n.ge)("page_layout"),
                    _ = vk.rtl ? d.offsetLeft + d.offsetWidth : 0,
                    u = vk.rtl ? (window.lastWindowWidth || 0) - _ : d.offsetLeft;
                Object(n.setStyle)(_stlLeft, {
                    width: Math.max(u - 1, 0)
                });
                var p = vk.rtl ? o[0] + t.offsetWidth + 5 : u,
                    f = vk.rtl ? _ - p : o[0] - 5 - p;
                Object(n.setStyle)(_stlSide, {
                    left: p - r,
                    width: Math.max(f, 0)
                }), __scrLeft = r
            }
            Object(n.setStyle)(_stlSide, {
                top: _stlSideTop,
                height: Math.max((window.lastWindowHeight || 0) - _stlSideTop, 0)
            }), __adsUpdate();
            var h = _tbLink.loc || _stlWas || i > 200,
                w = i > 250 && cur._regBar,
                v = 0,
                b = !1;
            if (h) {
                1 !== _stlShown && (Object(n.show)(_stlLeft, _stlSide), Object(n.addClass)(_stlLeft, "stl_active"), Object(n.addClass)(_stlSide, "stl_active"), _stlShown = 1), _tbLink.loc && cur._noUpLink && (i = 0), _stlWas && i > 500 && (_stlWas = 0), i > 200 ? (v = (i - 200) / 200, (_stlWasSet || _stlBack) && (_stlWasSet = _stlBack = 0, b = 1, Object(n.val)(_stlText, getLang("global_to_top")), Object(n.removeClass)(_stlText, "down"), Object(n.removeClass)(_stlText, "back"))) : (v = (200 - i) / 200, _stlWas ? _stlWasSet || (_stlWasSet = 1, b = 0, Object(n.val)(_stlText, ""), Object(n.addClass)(_stlText, "down"), _stlBack && (_stlBack = 0, Object(n.removeClass)(_stlText, "back"))) : _tbLink.loc && (_stlBack || (_stlBack = 1, b = _tbLink.fast ? 1 : 0, Object(n.val)(_stlText, getLang("global_back")), Object(n.addClass)(_stlText, "back"), _stlWasSet && (_stlWasSet = 0, Object(n.removeClass)(_stlText, "down"))))), !1 !== b && Object(n.toggleClass)(_stlLeft, "over_fast", Object(n.hasClass)(_stlLeft, "over") && b);
                var g = {
                    opacity: Math.min(Math.max(v, 0), 1)
                };
                vk.staticheader && (g.top = -Math.min(Object(n.getSize)("page_header_cont")[1], i)), Object(n.setStyle)(_stlLeft, g)
            } else 0 !== _stlShown && (Object(n.hide)(_stlLeft, _stlSide), _stlShown = 0);
            vk.id || (!_regBar && w ? (_regBar = 1, Object(n.val)(Object(n.ge)("reg_bar_content"), cur._regBar), Object(s.animate)(Object(n.ge)("reg_bar"), {
                top: 0,
                transition: Fx.Transitions.sineInOut
            }, 400), Object(s.animate)(Object(n.ge)("stl_bg"), {
                paddingTop: 60,
                transition: Fx.Transitions.sineInOut
            }, 400)) : _regBar && !w && (_regBar = 0, Object(s.animate)(Object(n.ge)("reg_bar"), {
                top: -56,
                transition: Fx.Transitions.sineInOut
            }, 400), Object(s.animate)(Object(n.ge)("stl_bg"), {
                paddingTop: 13,
                transition: Fx.Transitions.sineInOut
            }, 400)))
        }
    }

    function d(e, t) {
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

    function _(e) {
        var t = Object(n.ge)(e);
        if (t) return Object(n.hasClass)(t, "ui_actions_menu_item_lock")
    }

    function u(e) {
        if ((e = Object(n.ge)(e)) && Object(n.hasClass)(e, "ui_actions_menu_item") && !Object(n.hasClass)(e, "ui_actions_menu_item_lock")) {
            Object(n.data)(e, "inner", e.innerHTML), Object(n.addClass)(e, "ui_actions_menu_item_lock");
            var t = Object(n.ce)("div", {
                className: "ui_actions_menu_item_lock_text"
            });
            Object(n.val)(t, e.innerHTML), e.appendChild(t), showProgress(e)
        }
    }

    function p(e) {
        (e = Object(n.ge)(e)) && Object(n.hasClass)(e, "ui_actions_menu_item") && Object(n.hasClass)(e, "ui_actions_menu_item_lock") && (Object(n.removeClass)(e, "ui_actions_menu_item_lock"), e.innerHTML = Object(n.data)(e, "inner"))
    }

    function f(e) {
        var t = Object(n.ge)(e);
        if (t) return Object(n.hasClass)(t, "link_lock")
    }

    function h(e, t) {
        var o = Object(n.ge)(e);
        o && "a" === o.tagName.toLowerCase() && !f(o) && (Object(n.addClass)(o, "link_lock"), t && Object(r.each)(t, function(e, t) {
            return Object(n.addClass)(o, t)
        }))
    }

    function w(e, t) {
        var o = Object(n.ge)(e);
        !o && f(o) && (Object(n.removeClass)(o, "link_lock"), t && Object(r.each)(t, function(e, t) {
            return Object(n.removeClass)(o, t)
        }))
    }

    function v(e) {
        var t = Object(n.ge)(e);
        if (t && ("button" === t.tagName.toLowerCase() || Object(n.hasClass)(t, "flat_button") || Object(n.hasClass)(t, "wr_header")) && !m(t)) {
            var o = Object(n.getSize)(t);
            Object(n.addClass)(t, "flat_btn_lock"), Object(n.data)(t, "inner", t.innerHTML), Object(n.setStyle)(t, {
                width: o[0],
                height: o[1]
            }), t.innerHTML = "", showProgress(t, "btn_lock")
        }
    }

    function b(e) {
        var t = Object(n.ge)(e);
        t && m(t) && (hideProgress(t), t.innerHTML = Object(n.data)(t, "inner"), Object(n.removeClass)(t, "flat_btn_lock"), Object(n.setStyle)(t, {
            width: null,
            height: null
        }))
    }

    function g(e) {
        return m(e)
    }

    function m(e) {
        var t = Object(n.ge)(e);
        if (t) return Object(n.hasClass)(t, "flat_btn_lock")
    }

    function y(e, t) {
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

    function O(e) {
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

    function E(e) {
        return e = Object(n.ge)(e), Object(n.hasClass)(e, "on") ? 1 : ""
    }

    function k(e, t) {
        var o = Object(n.ge)(e);
        if (o && !Object(n.hasClass)(o, "disabled")) return void 0 === t && (t = !E(o)), Object(n.toggleClass)(o, "on", t), o.setAttribute("aria-checked", t ? "true" : "false"), !1
    }

    function x(e, t) {
        return e = Object(n.ge)(e), void 0 === t && (t = !Object(n.hasClass)(e, "disabled")), Object(n.toggleClass)(e, "disabled", t), "INPUT" === e.tagName && (t ? e.setAttribute("readonly", "readonly") : e.removeAttribute("readonly")), !1
    }

    function C(e) {
        return !!radioBtns[e] && radioBtns[e].val
    }

    function T(e, t, o) {
        if (radioBtns[o] && !Object(n.hasClass)(e, "disabled")) return Object(r.each)(radioBtns[o].els, function() {
            this == e ? (Object(n.addClass)(this, "on"), this.setAttribute("aria-checked", "true"), this.setAttribute("tabindex", "0")) : (Object(n.removeClass)(this, "on"), this.setAttribute && (this.setAttribute("aria-checked", "false"), this.setAttribute("tabindex", "-1")))
        }), radioBtns[o].val = t
    }
    window.__scrLeft = 0, window.radioBtns = {}, window.notaBene = c, window.updSideTopLink = l, window.createButton = d, window.actionsMenuItemLocked = _, window.lockActionsMenuItem = u, window.unlockActionsMenuItem = p, window.linkLocked = f, window.lockLink = h, window.unlockLink = w, window.lockButton = v, window.unlockButton = b, window.buttonLocked = g, window.isButtonLocked = m, window.disableButton = y, window.sbWidth = O, window.isChecked = E, window.checkbox = k, window.disable = x, window.radioval = C, window.radiobtn = T
}, function(e, t, o) {
    var n = o(48),
        i = o(111),
        r = o(4);
    e.exports = o(3) ? Object.defineProperties : function(e, t) {
        i(e);
        for (var o, a = r(t), s = a.length, c = 0; s > c;) n.f(e, o = a[c++], t[o]);
        return e
    }
}, function(e, t) {
    var o = {}.toString;
    e.exports = function(e) {
        return o.call(e).slice(8, -1)
    }
}, function(e, t, o) {
    var n = o(33),
        i = o(82),
        r = o(10),
        a = o(111),
        s = o(42),
        c = o(17);
    e.exports = function(e, t, o, l, d) {
        var _, u, p, f = d ? function() {
                return e
            } : c(e),
            h = n(o, l, t ? 2 : 1),
            w = 0;
        if ("function" != typeof f) throw TypeError(e + " is not iterable!");
        if (r(f))
            for (_ = s(e.length); _ > w; w++) t ? h(a(u = e[w])[0], u[1]) : h(e[w]);
        else
            for (p = f.call(e); !(u = p.next()).done;) i(p, h, u.value, t)
    }
}, function(e, t, o) {
    var n = o(25),
        i = o(79)("iterator"),
        r = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (n.Array === e || r[i] === e)
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "KEY", function() {
        return r
    }), o.d(t, "addEvent", function() {
        return a
    }), o.d(t, "removeEvent", function() {
        return s
    }), o.d(t, "triggerEvent", function() {
        return c
    }), o.d(t, "cancelEvent", function() {
        return l
    }), o.d(t, "stopEvent", function() {
        return d
    }), o.d(t, "normEvent", function() {
        return _
    }), o.d(t, "checkEvent", function() {
        return u
    }), o.d(t, "checkKeyboardEvent", function() {
        return p
    }), o.d(t, "checkOver", function() {
        return f
    });
    var n = o(109),
        i = o(95),
        r = {
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

    function a(e, t, o, r, a, s) {
        if ((e = Object(n.ge)(e)) && 3 != e.nodeType && 8 != e.nodeType) {
            var c, d = a ? ((c = function(e) {
                var t = e.data;
                e.data = a;
                var n = o.apply(this, [e]);
                return e.data = t, n
            }).handler = o, c) : o;
            e.setInterval && e !== window && (e = window);
            var u = Object(n.data)(e, "events") || Object(n.data)(e, "events", {}),
                p = Object(n.data)(e, "handle") || Object(n.data)(e, "handle", function(e) {
                    return function() {
                        (function(e) {
                            e = _(e);
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
                u[o] || (u[o] = [], !r && e.addEventListener ? e.addEventListener(o, p, s) : !r && e.attachEvent && e.attachEvent("on" + o, p)), u[o].push(d)
            })
        }
    }

    function s(e, t, o, r) {
        if (void 0 === r && (r = !1), e = Object(n.ge)(e)) {
            var a = Object(n.data)(e, "events");
            if (a)
                if ("string" == typeof t) Object(i.each)(t.split(/\s+/), function(t, s) {
                    if (Object(i.isArray)(a[s])) {
                        var c = a[s].length;
                        if (Object(i.isFunction)(o)) {
                            for (var l = c - 1; l >= 0; l--)
                                if (a[s][l] && (a[s][l] === o || a[s][l].handler === o)) {
                                    a[s].splice(l, 1), c--;
                                    break
                                }
                        } else {
                            for (var d = 0; d < c; d++) delete a[s][d];
                            c = 0
                        }
                        c || (e.removeEventListener ? e.removeEventListener(s, Object(n.data)(e, "handle"), r) : e.detachEvent && e.detachEvent("on" + s, Object(n.data)(e, "handle")), delete a[s])
                    }
                }), Object(i.isEmpty)(a) && (Object(n.removeData)(e, "events"), Object(n.removeData)(e, "handle"));
                else
                    for (var c in a) a.hasOwnProperty(c) && s(e, c)
        }
    }

    function c(e, t, o, r) {
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

    function _(e) {
        var t = e = e || window.event;
        if ((e = Object(i.clone)(t)).originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target), null == e.pageX && null != e.clientX) {
            var o = document.documentElement,
                n = bodyNode;
            e.pageX = e.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o.clientLeft || 0), e.pageY = e.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o.clientTop || 0)
        }
        return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
    }

    function u(e) {
        var t = e || window.event;
        return t && ("click" === t.type || "mousedown" === t.type || "mouseup" === t.type) && (t.which > 1 || t.button > 1 || t.ctrlKey || t.shiftKey || browser.mac && t.metaKey) || !1
    }

    function p(e) {
        if (!(e = _(e)) || !e.target) return !1;
        if (!e.screenX) return !0;
        var t = Object(n.getSize)(e.target),
            o = Object(n.getXY)(e.target),
            i = e.pageX - o[0],
            r = e.pageY - o[1];
        return i < -1 || i > t[0] + 1 || r < -1 || r > t[1] + 1 || Math.abs(e.pageX - o[0] - t[0] / 2) < 1 && Math.abs(e.pageY - o[1] - t[1] / 2) < 1
    }

    function f(e, t) {
        if (!e) return !0;
        e = e.originalEvent || e, t = t || e.target;
        var o = e.fromElement || e.relatedTarget;
        if (!o || o === t || o === t.parentNode) return !0;
        for (; o !== t && o.parentNode && o.parentNode !== bodyNode;) o = o.parentNode;
        return o !== t
    }
    window.KEY = r, window.addEvent = a, window.removeEvent = s, window.triggerEvent = c, window.cancelEvent = l, window.stopEvent = d, window.normEvent = _, window.checkEvent = u, window.checkKeyboardEvent = p, window.checkOver = f
}, function(e, t, o) {
    'eat script';
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
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "parseLatin", function() {
        return r
    }), o.d(t, "parseCyr", function() {
        return a
    }), o.d(t, "parseLatKeys", function() {
        return s
    }), o.d(t, "langNumeric", function() {
        return c
    }), o.d(t, "langSex", function() {
        return l
    }), o.d(t, "langStr", function() {
        return d
    }), o.d(t, "addLangKeys", function() {
        return _
    }), o.d(t, "getLang", function() {
        return u
    }), o.d(t, "langDate", function() {
        return p
    }), o.d(t, "getShortDate", function() {
        return f
    }), o.d(t, "getShortDateOrTime", function() {
        return h
    }), o.d(t, "langWordNumeric", function() {
        return w
    }), o.d(t, "getDateText", function() {
        return v
    }), o.d(t, "getBigDateNew", function() {
        return b
    }), o.d(t, "getSmDate", function() {
        return g
    });
    var n = o(56),
        i = o(95);

    function r(e) {
        for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], o = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], n = e, i = 0, r = t.length; i < r; i++) n = n.split(t[i]).join(o[i]);
        for (var a = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", s = 0, c = a.length; s < c; s++) n = n.split(a.charAt(s)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(s));
        return n === e ? null : n
    }

    function a(e) {
        for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], o = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], n = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", i = e, r = 0; r < o.length; r++) i = i.split(o[r]).join(t[r]);
        for (var a = 0; a < n.length; a++) i = i.split(n.charAt(a)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(a));
        return i === e ? null : i
    }

    function s(e) {
        for (var t = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", o = e, n = 0; n < t.length; n++) o = o.split(t.charAt(n)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(n));
        return o == e ? null : o
    }

    function c(e, t, o) {
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

    function _(e, t) {
        var o = t ? window : window.cur;
        o.lang ? Object(i.extend)(o.lang, e) : o.lang = e
    }

    function u() {
        try {
            var e = Array.from(arguments),
                t = e.shift();
            if (!t) return "...";
            var o = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
            if (!o) {
                var n = t.split("_");
                return n.shift(), n.join(" ")
            }
            return Object(i.isFunction)(o) ? o.apply(null, e) : void 0 === e[0] && !Object(i.isArray)(o) || "raw" === e[0] ? o : c(e[0], o, e[1])
        } catch (e) {
            debugLog("lang error:" + e.message + "(" + Array.from(arguments).join(", ") + ")")
        }
    }

    function p(e, t, o, r, a, s) {
        var c = void 0;
        if (s || (s = ""), Object(i.isArray)(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += o, c = new Date(e)) : c = e, a) t = t[1];
        else {
            var l = "";
            !(l = Object(n.isToday)(c) ? t[3] : Object(n.isYesterday)(c) ? t[2] : Object(n.isTomorrow)(c) ? t[4] : t[1]) && t[1] && (l = t[1]), t = l
        }
        var d = {
                hours: c.getHours(),
                minutes: c.getMinutes(),
                seconds: c.getSeconds(),
                day: c.getDate(),
                month: c.getMonth() + 1,
                year: c.getFullYear()
            },
            _ = "";
        switch (3 === vk.lang && (_ = c.getHours() > 11 ? "pm" : "am", d.hours = c.getHours() % 12 == 0 ? 12 : c.getHours() % 12), vk.lang) {
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
        return 68 === vk.lang && (d.year = d.year + 543), t.replace("{hour}", d.hours).replace("{num_hour}", Object(n.leadingZero)(d.hours)).replace("{minute}", Object(n.leadingZero)(d.minutes)).replace("{day}", d.day).replace("{num_day}", Object(n.leadingZero)(d.day)).replace("{month}", r[d.month]).replace("{year}", d.year).replace("{short_year}", d.year % 100).replace("{second}", Object(n.leadingZero)(d.seconds)).replace("{am_pm}", _)
    }

    function f(e, t, o, n, i) {
        e *= 1e3, void 0 === o && (o = !0), void 0 === n && (n = u("months_of", "raw")), t *= 1e3;
        var r = Date.now(),
            a = new Date(r),
            s = new Date(e + t);
        return !i && e > r && e - r < 864e5 && a.getDate() === s.getDate() ? p(e, "{hour}:{minute} {am_pm}", t, [], !o) : s.getYear() !== a.getYear() || e < r - 157248e5 ? p(e, u("global_date", "raw"), t, n, !o) : p(e, u("global_short_date", "raw"), t, n, !o)
    }

    function h(e, t, o, i) {
        return Object(n.isToday)(new Date(1e3 * e + 1e3 * t)) ? p(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !o) : f(e, t, o, i)
    }

    function w(e, t, o) {
        return Object(i.isArray)(t) && e < t.length ? t[e] : c(e, o)
    }

    function v(e, t) {
        e += t;
        var o = parseInt(Date.now() / 1e3) - e,
            n = "";
        if (o < 60) n = u("global_just_now");
        else if (o < 3600) {
            n = w(Object(i.intval)(o / 60), u("global_word_mins_ago", "raw"), u("global_mins_ago", "raw"))
        } else if (o < 14400) {
            n = w(Object(i.intval)(o / 3600), u("global_word_hours_ago", "raw"), u("global_hours_ago", "raw"))
        } else n = b(e, 0, !0, "_l");
        return n
    }

    function b(e, t, o, n) {
        void 0 === o && (o = !0), void 0 === t && (t = 0), void 0 === n && (n = ""), t *= 1e3;
        var i = new Date(1e3 * e),
            r = new Date;
        return i.getFullYear() !== r.getFullYear() && i.getTime() < r.getTime() - 1728e5 || Math.abs(i.getTime() - r.getTime()) > 157248e5 ? p(1e3 * e, u("global_date", "raw"), t, u("months_sm_of"), !o) : p(1e3 * e, u("global_short_date_time" + n, "raw"), t, u("months_sm_of"), !o)
    }

    function g(e, t, o) {
        void 0 === o && (o = !0), void 0 === t && (t = 0);
        var n = new Date,
            i = n.getFullYear(),
            r = n.getMonth(),
            a = new Date(1e3 * e),
            s = a.getFullYear(),
            c = a.getMonth();
        return p(1e3 * e, u(s < i && (r > 1 || c < 9 || i - s >= 2) ? "global_date" : "global_short_date_time", "raw"), t, u("months_sm_of", "raw"), !o)
    }
    window.parseLatin = r, window.parseCyr = a, window.parseLatKeys = s, window.langNumeric = c, window.langSex = l, window.langStr = d, window.addLangKeys = _, window.getLang = u, window.langDate = p, window.getShortDate = f, window.getShortDateOrTime = h, window.langWordNumeric = w, window.getDateText = v, window.getBigDateNew = b, window.getSmDate = g
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "topHeaderClose", function() {
        return r
    }), o.d(t, "topHeaderClearClose", function() {
        return a
    });
    var n = o(11),
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
        }();

    function r(e) {
        window.headerDestroy && window.headerDestroy(), window.headerDestroy = e
    }

    function a() {
        delete window.headerDestroy
    }
    var s = {
        cache: {},
        lists: {},
        maxItems: 8,
        init: function() {
            if (this.inited) return !1;
            var e = ge("ts_input"),
                t = ge("ts_cont_wrap");
            if (vk.id && Chat.init(), !e) return !1;
            addEvent(e, "focus", function() {
                s.deselect(), trim(val(this)) && addClass(t.firstChild, "active"), s.toggleInput(!0)
            }), addEvent(e, "keydown", function(o) {
                switch (o.keyCode) {
                    case KEY.DOWN:
                    case KEY.UP:
                        s.moveSelection(o.keyCode), cancelEvent(o);
                        break;
                    case KEY.ENTER:
                        var n = geByClass1("active", t);
                        if (n) s.select(n, o);
                        else {
                            var i = trim(val(this));
                            i && (e.blur(), s.clear(), s.toggle(!1), nav.go("/search?c[section]=auto&c[q]=" + encodeURIComponent(i)))
                        }
                        cancelEvent(o);
                        break;
                    case KEY.TAB:
                        s.clear(), s.toggleInput(!1), cancelStackFilter("top_search", !0)
                }
            }), vk.id && (addEvent(e, "keyup", function(e) {
                switch (e.keyCode) {
                    case KEY.DOWN:
                    case KEY.UP:
                    case KEY.ENTER:
                    case KEY.ESC:
                        cancelEvent(e);
                        break;
                    default:
                        s.prepareRows(trim(val(this)))
                }
            }), addEvent(e, "paste", function() {
                setTimeout(function() {
                    s.prepareRows(trim(val(e)))
                }, 10)
            }), addEvent(document, "mousedown", function(e) {
                Object(n.checkKeyboardEvent)(e) || domClosest("_audio_page_layout", e.target) || domClosest("_ap_layer__close", e.target) || domClosest("layer_wrap", e.target) || r()
            }), this.inited = !0)
        },
        clear: function() {
            window.tooltips && tooltips.destroyAll(ge("ts_cont_wrap"));
            var e = ge("ts_input");
            e && e.phonblur && (val(e, ""), e.blur(), e.phonblur(), this.prepareRows())
        },
        select: function(e, t, o) {
            if (checkEvent(t)) return !0;
            var n = ge("ts_input"),
                i = trim(val(n)).length,
                a = e.getAttribute("hinttype");
            if (this.clear(), r(), i || n.blur(), o && hasClass(t.target, "ts_contact_status")) return ajax.post("al_search.php", {
                act: "save_metrics",
                ql: i,
                mk: "chat_box"
            }), this.writeBox(o), !1;
            var s = nav.go(e, t);
            return ajax.post("al_search.php", {
                act: "save_metrics",
                ql: i,
                mk: a
            }), s
        },
        deselect: function() {
            var e = ge("ts_cont_wrap");
            each(geByClass("active", e), function(e, t) {
                return removeClass(t, "active")
            })
        },
        itemOver: function(e, t, o) {
            1 === t && s.deselect();
            var n = inArray(e.getAttribute("hintType"), ["h_friends", "h_correspondents", "h_chats"]);
            toggleClass(e, "write", n), toggleClass(e, "active", t)
        },
        moveSelection: function(e) {
            var t = ge("ts_cont_wrap"),
                o = geByClass1("active", t),
                n = void 0;
            switch (e) {
                case KEY.UP:
                    n = !!o && (this.getNextNode(o, -1, "a") || o);
                    break;
                case KEY.DOWN:
                    n = o ? this.getNextNode(o, 1, "a") || o : t.firstChild
            }
            return this.deselect(), n && addClass(n, "active"), !1
        },
        getNextNode: function(e, t, o) {
            for (var n = e, i = domPN(e);;) {
                if ((n = t > 0 ? domNS(n) : domPS(n)) || (n = t > 0 ? domFC(i) : domLC(i)), o && n.tagName && n.tagName.toLowerCase() === o || !o && n) return n;
                if (n === e) return !1
            }
        },
        toggleInput: function(e) {
            e = !!e;
            var t = ge("ts_cont_wrap");
            isVisible(t) !== e && (toggle("ts_cont_wrap", e), e && cancelStackPush("top_search", function() {
                var e = ge("ts_input");
                s.toggleInput(!1), e.blur()
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
            if (s.friendsLoaded) return !1;
            if (cur.initingFL || vk.isBanned || !vk.id) return !1;
            var e = function() {
                    if (s.friendsLoaded) return !1;
                    cur.initingFL = !0, ajax.post("al_search.php", {
                        act: "get_pages"
                    }, {
                        cache: 1,
                        onDone: function(e) {
                            delete cur.initingFL, s.friendsLoaded || (each(e, function(e, t) {
                                s.lists[e] = t, "onlines" !== e && s.updateCache(e)
                            }), s.friendsLoaded = !0, val("ts_input") || s.prepareRows(""))
                        },
                        onFail: function() {
                            delete cur.initingFL
                        }
                    })
                },
                t = s.getList("friends");
            isEmpty(t) ? (cur.initingFL = !0, ajax.post("al_search.php", {
                act: "get_top_friends"
            }, {
                cache: 1,
                onDone: function(t) {
                    delete cur.initingFL, s.topFriends = t, s.updateCache("friends"), s.forceUpdate = !0, s.prepareRows(cur.tsStr || ""), e()
                },
                onFail: function() {
                    delete cur.initingFL
                }
            })) : (s.updateCache("friends"), s.forceUpdate = !0, s.prepareRows(cur.tsStr || ""), e())
        },
        getSimilarQueries: function(e) {
            var t = [e = e.toLowerCase()],
                o = void 0;
            return (o = parseLatin(e)) && t.push(o), (o = parseLatKeys(e)) && t.push(o), (o = parseCyr(e)) && t.push(o), t
        },
        searchCache: function(e, t) {
            var o = this,
                n = s.getList(e);
            if (!t) return !1;
            var i = this.getSimilarQueries(t);
            if (void 0 !== this.cache[e][t]) return i;
            var r = this.cache[e][t] = {};
            each(i, function(t, i) {
                var a = o.cache[e][" " + i.charAt(0).toLowerCase()];
                if (a) {
                    var s = new RegExp("(^|[\\s\\-\\(\\)\\.,;|:]+)" + escapeRE(i), "gi");
                    each(a, function(e) {
                        var t = n[e + "_"];
                        if (!isArray(t)) return !0;
                        null !== t[0].match(s) && (r[e] = 1)
                    })
                }
            });
            var a = 0;
            return each(r, function() {
                return a++
            }), r._num = a, i
        },
        updateCache: function(e, t, o) {
            var n = this,
                i = t || this.getList(e);
            this.cache[e] = o && this.cache[e] || {}, each(i, function(t, o) {
                var i = o[0],
                    r = intval(t),
                    a = i.split(/[\s\-\(\)\.,;|:]+/);
                each(a, function(t, o) {
                    var i = " " + o.charAt(0).toLowerCase();
                    n.cache[e][i] = n.cache[e][i] || {}, n.cache[e][i][r] = 1
                })
            })
        },
        listSearch: function(e, t, o, n) {
            var i = [],
                r = {};
            return t ? (s.searchCache(e, t), r = s.cache[e] && s.cache[e][t] || {}) : each(s.getList(e), function(e) {
                var t = intval(e);
                r[t] = 1
            }), each(s.getList(e), function(e) {
                var t = intval(e),
                    a = r[t];
                if ((!n || !n[t]) && a) return !!o-- && void i.push([t, this])
            }), i
        },
        row: function(e, t, o, n, i, r, a, s, c) {
            var l = 0;
            if (r && (n = n.replace(r, '$1<em class="ts_clist_hl">$2</em>')), inArray(a, ["h_friends", "h_correspondents", "h_chats"]) && (l = e), s || (s = ""), c = intval(c)) {
                var d = "";
                1 & c && (d += "page_verified "), 2 & c && (d += "page_top_author "), -128932034 === e ? d += "ph_verified " : -29246653 === e && (d += "pg_verified "), c = '<div class="' + d + '" onmouseover="pageVerifiedTip(this, {type: ' + c + ", oid: " + e + '})"></div>'
            } else c = "";
            return '\n<a href="' + t + '" class="ts_contact clear_fix" id="ts_contact' + e + '" onclick="return TopSearch.select(this, event, ' + l + ');" onmousedown="event.cancelBubble = true;"\n      onmouseover="TopSearch.itemOver(this, 1, event);"  onmouseout="TopSearch.itemOver(this, 0, event);" hinttype="' + a + '">\n  <span class="ts_contact_photo ' + onlinePlatformClass(i) + '">\n    <img class="ts_contact_img" src="' + o + '"/>\n  </span>\n  <span class="ts_contact_name fl_l">\n    <div class="ts_contact_title_wrap' + (c ? " is_verified" : "") + '">\n      <span class="ts_contact_title">' + n + "</span>\n    </div>\n    " + c + '\n    <div class="ts_contact_info">' + s + '</div>\n  </span>\n  <div class="ts_contact_status"></div>\n</a>'
        },
        searchLists: function(e) {
            return e ? {
                friends: {
                    order: 0,
                    count: s.maxItems - 1,
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
                    count: s.maxItems - 1,
                    label: getLang("global_chats")
                },
                search: {
                    order: 4,
                    count: s.maxItems - 1,
                    label: getLang("head_search_results")
                }
            } : {
                friends: {
                    order: 0,
                    count: s.maxItems,
                    label: getLang("global_friends")
                }
            }
        },
        initListsHtml: function() {
            s.listsHtml = []
        },
        addToListsHtml: function(e, t, o) {
            var n = s.searchLists(o),
                i = n[(n[e] || {}).parent || e] || {},
                r = i.order || 0,
                a = i.label || "";
            s.listsHtml[r] = s.listsHtml[r] || (o && a ? ['<div class="ts_search_sep">' + a + "</div>"] : []), s.listsHtml[r].push(t)
        },
        htmlRows: function(e) {
            var t = "",
                o = s.listsHtml.map(function(e) {
                    return e.join("")
                });
            if (e) {
                var n = "#" === e[0] ? "statuses" : "auto",
                    i = "#" === e[0] ? getLang("global_news_search_results") : getLang("global_show_all_results");
                t += '\n<a href="/search?c[section]=' + n + "&c[q]=" + encodeURIComponent(e) + '" class="ts_search_link clear_fix active" id="ts_search_link"\n    onclick="return TopSearch.select(this, event);" onmousedown="event.cancelBubble = true;" onmouseover="TopSearch.itemOver(this, 1, event);"\n    onmouseout="TopSearch.itemOver(this, 0, event);" >\n  <span class="ts_contact_name fl_l">' + i + '</span>\n  <div class="ts_contact_status "></div>\n</a>'
            }
            return t + o.join("")
        },
        prepareRows: function(e) {
            var t = s.maxItems,
                o = ge("ts_cont_wrap");
            if (!o || !vk.id) return !1;
            if (cur.tsStr && cur.tsStr === e && !s.forceUpdate) return !1;
            delete s.forceUpdate, s.initListsHtml();
            var n = {};
            if (e) {
                var r = [];
                each(this.getSimilarQueries(e), function() {
                    r.push(escapeRE(this))
                }), cur.lastRe = new RegExp("([ -]|^|s|&nbsp;|\b)(" + r.join("|") + ")", "gi"), t--
            }
            each(s.searchLists(e), function(o, r) {
                if (s.cache[o]) {
                    var a = r.count,
                        c = s.listSearch(o, e, a, n),
                        l = [],
                        d = 0;
                    isEmpty(c) || (each(c, function(e, o) {
                        if (!t || d >= a) return !1;
                        l.push(o), t--, d++
                    }), l.length && each(l, function(t, r) {
                        var a = r[1],
                            c = intval(r[0]),
                            l = c > 0 && s.onlines()[c],
                            d = i(a, 6),
                            _ = d[0],
                            u = d[1],
                            p = d[2],
                            f = d[3],
                            h = d[4],
                            w = d[5],
                            v = "search" === o ? f : "h_" + o,
                            b = s.row(c, p, u, _, l, re, v, h, w);
                        s.addToListsHtml(o, b, e), n[c] = 1
                    }))
                }
            }), o.innerHTML = s.htmlRows(e), t && e && "#" !== e[0] && this.hintsSearch(e, cur.lastRe || !1), e && (cur.tsStr = e)
        },
        hintsSearch: function(e, t) {
            var o = ge("ts_input"),
                n = ge("ts_cont_wrap"),
                r = void 0;
            ajax.post("al_search.php", {
                act: "get_pages_hints",
                q: e
            }, {
                cache: 1,
                onDone: function(a) {
                    if (trim(val(o)) !== e) return !1;
                    if (!a) return !1;
                    var c = s.maxItems - geByClass("ts_contact", n).length - 1,
                        l = {};
                    if (each(a, function(o, n) {
                            var a = intval(o),
                                d = i(n, 6),
                                _ = d[0],
                                u = d[1],
                                p = d[2],
                                f = d[3],
                                h = d[4],
                                w = d[5],
                                v = s.searchLists(e),
                                b = f.replace("h_", ""),
                                g = (v[b] || {}).parent || b;
                            if (void 0 === v[g] && (g = "search"), l[g] = l[g] || {}, l[g][o] = n, s.lists[g] = s.lists[g] || {}, s.lists[g][o] = n, ge("ts_contact" + a)) return !0;
                            if (!c--) return !1;
                            var m = s.row(a, p, u, _, !1, t, f, h, w);
                            return s.addToListsHtml(g, m, e), r = !0, !0
                        }), each(l, function(e, t) {
                            return s.updateCache(e, t, !0)
                        }), r) {
                        var d = geByClass1("active", n),
                            _ = d ? d.id : "";
                        n.innerHTML = s.htmlRows(e), _ && ge(_) && addClass(ge(_), "active")
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
    t.default = s
}, function(e, t, o) {
    'eat script';
    var n = o(73),
        i = o(74),
        r = o(30),
        a = o(60),
        s = o(106),
        c = o(25),
        l = o(34),
        d = o(81),
        _ = o(86),
        u = o(79)("iterator"),
        p = !([].keys && "next" in [].keys()),
        f = function() {
            return this
        };
    e.exports = function(e, t, o, h, w, v, b) {
        l(o, t, h);
        var g, m, y, O = function(e) {
                if (!p && e in C) return C[e];
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
            E = t + " Iterator",
            k = "values" == w,
            x = !1,
            C = e.prototype,
            T = C[u] || C["@@iterator"] || w && C[w],
            j = T || O(w),
            L = w ? k ? O("entries") : j : void 0,
            P = "Array" == t && C.entries || T;
        if (P && (y = _(P.call(new e))) !== Object.prototype && (d(y, E, !0), n || s(y, u) || a(y, u, f)), k && T && "values" !== T.name && (x = !0, j = function() {
                return T.call(this)
            }), n && !b || !p && !x && C[u] || a(C, u, j), c[t] = j, c[E] = f, w)
            if (g = {
                    values: k ? j : O("values"),
                    keys: v ? j : O("keys"),
                    entries: L
                }, b)
                for (m in g) m in C || r(C, m, g[m]);
            else i(i.P + i.F * (p || x), t, g);
        return g
    }
}, function(e, t) {
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
}, function(e, t, o) {
    var n = o(75),
        i = o(79)("iterator"),
        r = o(25);
    e.exports = o(84).getIteratorMethod = function(e) {
        if (void 0 != e) return e[i] || e["@@iterator"] || r[n(e)]
    }
}, function(e, t, o) {
    o(94), o(118), o(53), o(114), e.exports = o(84).Map
}, function(e, t) {
    e.exports = function(e, t, o, n) {
        if (!(e instanceof t) || void 0 !== n && n in e) throw TypeError(o + ": incorrect invocation!");
        return e
    }
}, function(e, t, o) {
    'eat script';

    function n(e, t) {
        if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
            var o = ce("link", {
                rel: "shortcut icon",
                type: "image/gif",
                href: e
            });
            headNode.replaceChild(o, icoNode), icoNode = o
        }
    }
    o.r(t), o.d(t, "setFavIcon", function() {
        return n
    }), window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.showTitleProgress = function() {}, window.hideTitleProgress = function() {}, window.setFavIcon = n
}, function(e, t, o) {
    'eat script';
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
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t, o) {
    'eat script';
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
    };
    window.ls = n
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "showWriteMessageBox", function() {
        return s
    }), o.d(t, "giftsBox", function() {
        return c
    }), o.d(t, "moneyTransferBox", function() {
        return l
    });
    var n = o(76),
        i = o(6),
        r = o(109),
        a = o(11);

    function s(e, t) {
        cur.onFriendMessage && cur.onFriendMessage(), stManager.add(["page.js", "wide_dd.js"]);
        var o = Object(n.showBox)("al_im.php", {
            act: "a_write_box",
            to: t
        }, {
            stat: ["writebox.js", "writebox.css", "wide_dd.css", "page.css", jsc("web/emoji.js"), "notifier.css"],
            cache: 1
        }, e);
        return o && Object(a.cancelEvent)(e), window.WriteBox && WriteBox.extractEmoji(), !o
    }

    function c(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : !Object(n.showBox)("al_gifts.php", {
            act: "box",
            tab: o || "received",
            mid: e
        }, {
            cache: 1,
            stat: ["gifts.css", "gifts.js"]
        }, t)
    }

    function l(e, t, o, a, s, c, d) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (s) {
            if (!d) {
                var _ = void 0,
                    u = void 0;
                return 2 === s ? (_ = cur.lang && cur.lang.mail_money_transfer_cancel_confirm || getLang("mail_money_transfer_cancel_confirm"), u = cur.lang && cur.lang.mail_money_transfer_cancel_btn || getLang("mail_money_transfer_cancel_btn")) : (_ = cur.lang && cur.lang.mail_money_transfer_decline_confirm || getLang("news_fb_money_transfer_decline_confirm"), u = cur.lang && cur.lang.mail_money_transfer_decline_btn || getLang("news_fb_money_transfer_decline_btn")), void(cur.confirmBox = Object(n.showFastBox)(getLang("global_action_confirmation"), _, u, l.pbind(e, t, o, a, s, !1, 1), getLang("global_cancel")))
            }
            var p = hasClass(Object(r.domPN)(a), "wall_postlink_preview_btn"),
                f = geByClass1("flat_button", Object(r.domPN)(a));
            return 2 !== d && (Object(i.disableButton)(f, !0), p ? (addClass(a.firstChild, "round_spinner"), removeClass(a.firstChild, "button")) : Object(i.lockButton)(a), cur.confirmBox && cur.confirmBox.hide()), void ajax.post("al_payments.php?act=a_cancel_money_transfer", {
                tx_id: e,
                hash: t,
                from: p ? "snippet" : ""
            }, {
                onDone: function(n, i, c) {
                    0 !== n ? (p ? (Object(r.re)(a), hasClass(f, "secondary") || Object(r.domReplaceEl)(f, c)) : Object(r.re)(Object(r.domPN)(a)), showDoneBox(i), window.TopNotifier.invalidate()) : setTimeout(l.pbind(e, t, o, a, s, !1, 2), 2e3)
                },
                onFail: function(e) {
                    return Object(i.disableButton)(f, !1), p ? (addClass(a.firstChild, "button"), removeClass(a.firstChild, "round_spinner")) : Object(i.unlockButton)(a), setTimeout(Object(n.showFastBox)(getLang("global_error"), e).hide, 2e3), !0
                }
            })
        }
        var h = void 0;
        return h = c ? {
            act: "money_transfer_box",
            request_id: e,
            request: c,
            hash: t
        } : {
            act: "accept_money_transfer_box",
            tx_id: e,
            hash: t
        }, cur.acceptMoneyBtn = a, !Object(n.showBox)("al_payments.php", h, {
            stat: ["payments.css", "payments.js"],
            onFail: function(e) {
                return setTimeout(Object(n.showFastBox)(getLang("global_error"), e).hide, 2e3), !0
            }
        }, o)
    }
}, function(e, t) {
    e.exports = {}
}, function(e, t) {}, function(e, t, o) {
    (function(n, i) {
        var r;
        (function() {
            'eat script';

            function a(e) {
                return "function" == typeof e
            }
            var s, c, l = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                d = 0,
                _ = function(e, t) {
                    E[d] = e, E[d + 1] = t, 2 === (d += 2) && (c ? c(k) : b())
                };
            var u = "undefined" != typeof window ? window : void 0,
                p = u || {},
                f = p.MutationObserver || p.WebKitMutationObserver,
                h = void 0 !== n && "[object process]" === {}.toString.call(n),
                w = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

            function v() {
                return function() {
                    setTimeout(k, 1)
                }
            }
            var b, g, m, y, O, E = new Array(1e3);

            function k() {
                for (var e = 0; e < d; e += 2) {
                    (0, E[e])(E[e + 1]), E[e] = void 0, E[e + 1] = void 0
                }
                d = 0
            }
            h ? b = function() {
                n.nextTick(k)
            } : f ? (m = 0, y = new f(k), O = document.createTextNode(""), y.observe(O, {
                characterData: !0
            }), b = function() {
                O.data = m = ++m % 2
            }) : w ? ((g = new MessageChannel).port1.onmessage = k, b = function() {
                g.port2.postMessage(0)
            }) : b = void 0 === u ? function() {
                try {
                    var e = o(26);
                    return s = e.runOnLoop || e.runOnContext,
                        function() {
                            s(k)
                        }
                } catch (e) {
                    return v()
                }
            }() : v();
            var x = function(e, t) {
                var o = this._state;
                if (o === L && !e || o === P && !t) return this;
                var n = new this.constructor(T),
                    i = this._result;
                if (o) {
                    var r = arguments[o - 1];
                    _(function() {
                        K(o, n, r, i)
                    })
                } else N(this, n, e, t);
                return n
            };
            var C = function(e) {
                if (e && "object" == typeof e && e.constructor === this) return e;
                var t = new this(T);
                return A(t, e), t
            };

            function T() {}
            var j = void 0,
                L = 1,
                P = 2,
                M = new U;

            function D(e) {
                try {
                    return e.then
                } catch (e) {
                    return M.error = e, M
                }
            }

            function B(e, t, o) {
                t.constructor === e.constructor && o === x && constructor.resolve === C ? function(e, t) {
                    t._state === L ? I(e, t._result) : t._state === P ? R(e, t._result) : N(t, void 0, function(t) {
                        A(e, t)
                    }, function(t) {
                        R(e, t)
                    })
                }(e, t) : o === M ? R(e, M.error) : void 0 === o ? I(e, t) : a(o) ? function(e, t, o) {
                    _(function(e) {
                        var n = !1,
                            i = function(e, t, o, n) {
                                try {
                                    e.call(t, o, n)
                                } catch (e) {
                                    return e
                                }
                            }(o, t, function(o) {
                                n || (n = !0, t !== o ? A(e, o) : I(e, o))
                            }, function(t) {
                                n || (n = !0, R(e, t))
                            }, e._label);
                        !n && i && (n = !0, R(e, i))
                    }, e)
                }(e, t, o) : I(e, t)
            }

            function A(e, t) {
                var o;
                e === t ? R(e, new TypeError("You cannot resolve a promise with itself")) : "function" == typeof(o = t) || "object" == typeof o && null !== o ? B(e, t, D(t)) : I(e, t)
            }

            function S(e) {
                e._onerror && e._onerror(e._result), W(e)
            }

            function I(e, t) {
                e._state === j && (e._result = t, e._state = L, 0 !== e._subscribers.length && _(W, e))
            }

            function R(e, t) {
                e._state === j && (e._state = P, e._result = t, _(S, e))
            }

            function N(e, t, o, n) {
                var i = e._subscribers,
                    r = i.length;
                e._onerror = null, i[r] = t, i[r + L] = o, i[r + P] = n, 0 === r && e._state && _(W, e)
            }

            function W(e) {
                var t = e._subscribers,
                    o = e._state;
                if (0 !== t.length) {
                    for (var n, i, r = e._result, a = 0; a < t.length; a += 3) n = t[a], i = t[a + o], n ? K(o, n, i, r) : i(r);
                    e._subscribers.length = 0
                }
            }

            function U() {
                this.error = null
            }
            var F = new U;

            function K(e, t, o, n) {
                var i, r, s, c, l = a(o);
                if (l) {
                    if ((i = function(e, t) {
                            try {
                                return e(t)
                            } catch (e) {
                                return F.error = e, F
                            }
                        }(o, n)) === F ? (c = !0, r = i.error, i = null) : s = !0, t === i) return void R(t, new TypeError("A promises callback cannot return that same promise."))
                } else i = n, s = !0;
                t._state !== j || (l && s ? A(t, i) : c ? R(t, r) : e === L ? I(t, i) : e === P && R(t, i))
            }
            var H = function(e) {
                return new X(this, e).promise
            };
            var q = function(e) {
                var t = new this(T);
                if (!l(e)) return R(t, new TypeError("You must pass an array to race.")), t;
                var o = e.length;

                function n(e) {
                    A(t, e)
                }

                function i(e) {
                    R(t, e)
                }
                for (var r = 0; t._state === j && r < o; r++) N(this.resolve(e[r]), void 0, n, i);
                return t
            };
            var V = function(e) {
                    var t = new this(T);
                    return R(t, e), t
                },
                z = 0;
            var G = Y;

            function Y(e) {
                this._id = z++, this._state = void 0, this._result = void 0, this._subscribers = [], T !== e && ("function" != typeof e && function() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }(), this instanceof Y ? function(e, t) {
                    try {
                        t(function(t) {
                            A(e, t)
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
            Y.all = H, Y.race = q, Y.resolve = C, Y.reject = V, Y._setScheduler = function(e) {
                c = e
            }, Y._setAsap = function(e) {
                _ = e
            }, Y._asap = _, Y.prototype = {
                constructor: Y,
                then: x,
                catch: function(e) {
                    return this.then(null, e)
                }
            };
            var X = $;

            function $(e, t) {
                this._instanceConstructor = e, this.promise = new e(T), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? I(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && I(this.promise, this._result))) : R(this.promise, this._validationError())
            }
            $.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, $.prototype._enumerate = function() {
                for (var e = this.length, t = this._input, o = 0; this._state === j && o < e; o++) this._eachEntry(t[o], o)
            }, $.prototype._eachEntry = function(e, t) {
                var o = this._instanceConstructor,
                    n = o.resolve;
                if (n === C) {
                    var i = D(e);
                    if (i === x && e._state !== j) this._settledAt(e._state, t, e._result);
                    else if ("function" != typeof i) this._remaining--, this._result[t] = e;
                    else if (o === G) {
                        var r = new o(T);
                        B(r, e, i), this._willSettleAt(r, t)
                    } else this._willSettleAt(new o(function(t) {
                        t(e)
                    }), t)
                } else this._willSettleAt(n(e), t)
            }, $.prototype._settledAt = function(e, t, o) {
                var n = this.promise;
                n._state === j && (this._remaining--, e === P ? R(n, o) : this._result[t] = o), 0 === this._remaining && I(n, this._result)
            }, $.prototype._willSettleAt = function(e, t) {
                var o = this;
                N(e, void 0, function(e) {
                    o._settledAt(L, t, e)
                }, function(e) {
                    o._settledAt(P, t, e)
                })
            };
            var Z = function() {
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
                Q = {
                    Promise: G,
                    polyfill: Z
                };
            void 0 === (r = function() {
                return Q
            }.call(t, o, t, e)) || (e.exports = r), Z()
        }).call(this)
    }).call(this, o(44), o(16))
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "topMsg", function() {
        return topMsg
    }), __webpack_require__.d(__webpack_exports__, "topError", function() {
        return topError
    }), __webpack_require__.d(__webpack_exports__, "showMsg", function() {
        return showMsg
    }), __webpack_require__.d(__webpack_exports__, "showGlobalPrg", function() {
        return showGlobalPrg
    });
    var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(109),
        _ajax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47),
        _utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95);

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
        } - 1 != opts.dt && topMsg(text, opts.dt, "#FFB4A3"), __dev || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("debuglogwrap") || (delete opts.dt, _ajax__WEBPACK_IMPORTED_MODULE_1__.ajax.plainpost("/errors.php", Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.extend)(opts, {
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
            l = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("global_prg");
        l.className = i.cls || "progress", Object(_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(l, {
            left: o[0] + Math.floor((n[0] - a) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.intval)(i.shift ? i.shift[0] : 0),
            top: o[1] + Math.floor((n[1] - c) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.intval)(i.shift ? i.shift[1] : 0),
            width: a,
            height: c,
            display: "block",
            "z-index": i.zIndex ? i.zIndex : null
        }), i.hide && (e.style.visibility = "hidden")
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "subscribePerformanceLoggerCollectors", function() {
        return u
    });
    var n = o(104),
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
                "first-contentful-paint" === e.name && _(e.startTime, "TTFCP")
            }),
            function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(function(e) {
                    if ("navigation" === e.initiatorType) {
                        var t = e.domComplete,
                            o = e.domContentLoadedEventEnd,
                            n = e.loadEventEnd;
                        _(t, "domComplete"), _(o, "domContentLoadedEventEnd"), _(n, "loadEventEnd")
                    }
                })
            }(), l()
    }
    var s = [],
        c = !1;

    function l() {
        if (c) {
            var e = window.performance,
                t = s[s.length - 1];
            if (!t) return c = !1, void _(-1);
            var o = t.startTime + t.duration;
            e.now() - o >= 3e3 ? _(o, "TTI") : setTimeout(l, 3e3)
        }
    }
    var d = [];

    function _(e, t) {
        var o = Math.floor(e);
        if (-1 !== e && (d.push([o, t]), !(c ? "TTI" === t : d.length > 2))) return;
        var a = "unknown",
            s = navigator.connection;
        s && s.effectiveType && (a = s.effectiveType);
        var l = {
            id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
            loc: location.href,
            events: []
        };
        d.forEach(function(e) {
            var t = i(e, 2),
                o = t[0],
                n = t[1];
            return l.events.push([n, o, cur.module, a, window.vk.rv])
        }), Object(n.setCookie)(r, JSON.stringify(l), .01)
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
}, function(e, t, o) {
    var n = o(59),
        i = o(60),
        r = o(106),
        a = o(41)("src"),
        s = Function.toString,
        c = ("" + s).split("toString");
    o(84).inspectSource = function(e) {
        return s.call(e)
    }, (e.exports = function(e, t, o, s) {
        var l = "function" == typeof o;
        l && (r(o, "name") || i(o, "name", t)), e[t] !== o && (l && (r(o, a) || i(o, a, e[t] ? "" + e[t] : c.join(String(t)))), e === n ? e[t] = o : s ? e[t] ? e[t] = o : i(e, t, o) : (delete e[t], i(e, t, o)))
    })(Function.prototype, "toString", function() {
        return "function" == typeof this && this[a] || s.call(this)
    })
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "shortCurrency", function() {
        return r
    });
    var n = o(95),
        i = o(109);

    function r() {
        var e = {};
        Object(n.each)(Object(i.geByClass)("_short_currency"), function() {
            var t = Object(i.domData)(this, "short") || "";
            if (!t) return !0;
            var o = Object(n.winToUtf)(t).length,
                r = Object(i.getStyle)(this, "fontFamily") || "tahoma,arial,sans-serif";
            if (void 0 === e[r]) {
                for (var a = "", s = o - 1; s >= 0; s--) a += "&#8399;";
                var c = Object(i.ce)("div", {
                    innerHTML: "<b>" + t + "</b><b>" + a + "</b>"
                }, {
                    fontFamily: r,
                    fontSize: "24px"
                });
                Object(i.ge)("utils").appendChild(c), e[r] = Math.abs(c.firstChild.offsetWidth - c.lastChild.offsetWidth) >= 2 * o, Object(i.re)(c)
            }!1 === e[r] && val(this, t)
        })
    }
    window.shortCurrency = r
}, function(e, t, o) {
    var n = o(41)("meta"),
        i = o(100),
        r = o(106),
        a = o(48).f,
        s = 0,
        c = Object.isExtensible || function() {
            return !0
        },
        l = !o(87)(function() {
            return c(Object.preventExtensions({}))
        }),
        d = function(e) {
            a(e, n, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        _ = e.exports = {
            KEY: n,
            NEED: !1,
            fastKey: function(e, t) {
                if (!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                if (!r(e, n)) {
                    if (!c(e)) return "F";
                    if (!t) return "E";
                    d(e)
                }
                return e[n].i
            },
            getWeak: function(e, t) {
                if (!r(e, n)) {
                    if (!c(e)) return !0;
                    if (!t) return !1;
                    d(e)
                }
                return e[n].w
            },
            onFreeze: function(e) {
                return l && _.NEED && c(e) && !r(e, n) && d(e), e
            }
        }
}, function(e, t, o) {
    var n = o(92);
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
    'eat script';
    var n = o(103),
        i = o(68),
        r = o(81),
        a = {};
    o(60)(a, o(79)("iterator"), function() {
        return this
    }), e.exports = function(e, t, o) {
        e.prototype = n(a, {
            next: i(1, o)
        }), r(e, t + " Iterator")
    }
}, function(e, t, o) {
    var n = o(89),
        i = o(22);
    e.exports = function(e) {
        return function(t, o) {
            var r, a, s = String(i(t)),
                c = n(o),
                l = s.length;
            return c < 0 || c >= l ? e ? "" : void 0 : (r = s.charCodeAt(c)) < 55296 || r > 56319 || c + 1 === l || (a = s.charCodeAt(c + 1)) < 56320 || a > 57343 ? e ? s.charAt(c) : r : e ? s.slice(c, c + 2) : a - 56320 + (r - 55296 << 10) + 65536
        }
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__);
    var core_js_es6_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18),
        core_js_es6_set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65),
        _polyfill_from_code_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(98),
        _polyfill_array_find_polyfill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54),
        _polyfill_array_from_polyfill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(71),
        _polyfill_object_assign_polyfill__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40),
        _polyfill_number_isinteger_polyfill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(45),
        _polyfill_canvas_to_blob__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(121),
        es6_promise__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(27),
        _lib_ee__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5),
        _lib_polyfills__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(21),
        _lib_ui_util__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(28),
        _lib_cookies__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(104),
        _lib_utils_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(95),
        _lib_ajax__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(47),
        _lib_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(109),
        _lib_dom_events__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(11),
        _lib_browser__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(52),
        _lib_element_tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(1),
        _lib_favicon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(20),
        _lib_flash__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(39),
        _lib_fx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(43),
        _lib_history_and_bookmarks__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(49),
        _lib_lang__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(13),
        _lib_layers__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(78),
        _lib_ls__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(23),
        _lib_market__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(31),
        _lib_scroll__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(119),
        _lib_static_manager__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(101),
        _lib_stats__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(70),
        _lib_ui__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(6),
        _lib_video__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(107),
        _lib_scripts__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(77),
        _lib_global_search__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(97),
        _lib_top_search__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(14),
        _lib_nav__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(91),
        _lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(99),
        _lib_perfomance_logger__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(29),
        _shared_constants_groups__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(102),
        _lib_date__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(56),
        _lib_debug_tools__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(0),
        _lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(55),
        _lib_message_box__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(76),
        _lib_box_utils__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(58),
        _lib_feature_boxes__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(24),
        _lib_feature_entries__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(96),
        _slicedToArray = function() {
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

    function _toConsumableArray(e) {
        if (Array.isArray(e)) {
            for (var t = 0, o = Array(e.length); t < e.length; t++) o[t] = e[t];
            return o
        }
        return Array.from(e)
    }

    function _classCallCheck(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    es6_promise__WEBPACK_IMPORTED_MODULE_8__.polyfill(), window.Map = core_js_es6_map__WEBPACK_IMPORTED_MODULE_0__, window.Set = core_js_es6_set__WEBPACK_IMPORTED_MODULE_1__;
    var _window = window,
        vk = _window.vk;

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
    1 === vk.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== vk.al || history.pushState || (vk.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), vk.version = !1), window.stVersions || (window.navMap = window.stVersions = window.stTypes = {}, window._rnd = 1), window.jsc = function(e) {
        return "cmodules/" + e
    }, window.NextPageID = 1, window.__debugMode = !0, window._wf = 0, window._ua || (window._ua = navigator.userAgent.toLowerCase()), window.locDomain || (window.locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0]), window.StaticFiles || (window.StaticFiles = {}), window.parseJSON = window.JSON && JSON.parse ? function(obj) {
        try {
            return JSON.parse(obj)
        } catch (e) {
            Object(_lib_ui_util__WEBPACK_IMPORTED_MODULE_11__.topError)("<b>parseJSON:</b> " + e.message, {
                dt: -1,
                type: 5,
                answer: obj
            });
            var evalString = "(" + obj + ")";
            try {
                return eval(evalString)
            } catch (e) {
                if (__debugMode) throw e;
                Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_40__.logEvalError)(e, evalString)
            }
        }
    } : function(obj) {
        var evalString = "(" + obj + ")";
        try {
            return eval(evalString)
        } catch (e) {
            if (__debugMode) throw e;
            Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_40__.logEvalError)(e, evalString)
        }
    }, window.vkLastNav = Date.now(), window.vkTabLoaded = Date.now(), window.cur = {
        destroy: [],
        nav: []
    }, window.browser.android && (setCookie("remixscreen_width", window.screen.width, 365), setCookie("remixscreen_height", window.screen.height, 365), setCookie("remixscreen_dpr", window.devicePixelRatio || 1, 365)), setCookie("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), each(StaticFiles, function(e, t) {
        t.t = -1 !== e.indexOf(".css") ? "css" : "js", t.n = e.replace(/[\/\.]/g, "_"), t.l = 0, t.c = 0
    }), window.locHost = location.host, window.locProtocol = location.protocol, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window.locHash = location.hash.replace("#/", "").replace("#!", ""), window.nodeUpdated = nodeUpdated, Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_40__.initDebugTools)(), window.debugLog = _lib_debug_tools__WEBPACK_IMPORTED_MODULE_40__.debugLog, window.debugEl = _lib_debug_tools__WEBPACK_IMPORTED_MODULE_40__.debugEl;
    var reopen = function() {
        re(window._opener), window._opener = utilsNode.appendChild(ce("iframe"))
    };

    function tnActive(e) {
        window.tnAct = e, addClass(e, "active")
    }

    function tnInactive() {
        removeClass("head_music", "head_play_down"), removeClass("top_logo_down", "tld_d"), removeClass(window.tnAct, "active")
    }

    function _stlClick(e) {
        return checkEvent(e) || cancelEvent(e)
    }

    function _stlMousedown(e) {
        if (e = e || window.event, !checkEvent(e) && !__afterFocus)
            if (_stlWasSet && _stlWas) {
                var t = _stlWas;
                _stlWas = 0, scrollToY(t, 0, !0, !0), Object(_lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.updateLeftMenu)(!0)
            } else 1 === _stlBack ? _tbLink.onclick() : (_stlWas = scrollGetY(), scrollToY(0, 0, !0, !0), Object(_lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.updateLeftMenu)())
    }

    function _stlMouseover(e) {
        var t = e ? e.originalEvent || e : window.event || {},
            o = "mouseover" === t.type && (t.pageX > 0 || t.clientX > 0);
        toggleClass(_stlLeft, "over", o), toggleClass(_stlLeft, "over_fast", o && (0 === _stlBack || _tbLink.fast) && 0 === _stlWasSet), toggleClass(_stlSide, "over", o)
    }
    addEvent(window, "unload", function() {
        for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && removeEvent(vkCache[e].handle.elem)
    }), addEvent(window, "DOMContentLoaded load", function() {
        vk.loaded || (vk.loaded = !0, Object(_lib_ui__WEBPACK_IMPORTED_MODULE_30__.updSideTopLink)()), Object(_lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.checkPageBlocks)()
    }), window.tnActive = tnActive, addEvent(window, "mouseup dragstart", tnInactive), addEvent(document, "mouseup dragstart", tnInactive), addEvent(document, "mousedown", function(e) {
        window._wf = 1, cur.__mdEvent = e
    }), window.updateHeaderStyles = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.updateHeaderStyles, window.updateNarrow = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.updateNarrow, window.checkPageBlocks = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.checkPageBlocks, window.redraw = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.redraw, window.onBodyResize = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.onBodyResize, window.onBodyScroll = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.onBodyScroll, window.onDocumentClick = function(e) {
        if (checkEvent(e)) return !0;
        if (ls.set("last_reloaded", []), !cur.onMouseClick || !cur.onMouseClick(e)) {
            if (!(e = window.event || e.originalEvent || e)) return !0;
            for (var t = 8, o = e.target || e.srcElement, n = void 0, i = void 0, r = void 0; o && o !== bodyNode && "A" !== o.tagName && t--;) o = o.parentNode;
            if (!o || "A" !== o.tagName || o.onclick || o.onmousedown) return !0;
            var a = o.href;
            if (a && (o.getAttribute("target") || nav.baseBlank)) {
                if (cur.hideReferrer && !browser.msie) return (r = window.open("", "_blank", "")) && (browser.msie && -1 !== a.indexOf(";") && (a = "'" + a.replace(/'/g, "%27") + "'"), r.opener = null, r.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + clean(a) + '">'), r.document.close()), cancelEvent(e);
                try {
                    return window._opener.contentWindow.open(a, "_blank"), setTimeout(reopen, 0), cancelEvent(e)
                } catch (e) {
                    return !0
                }
            }
            if ("https:" !== location.protocol && !a.indexOf("https://")) return !0;
            (a = a.replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (a = a.replace(location.hostname, "")), vk.dev && "vk.com" === location.hostname && (a = a.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/"));
            var s = {};
            (i = a.match(/^\/(.+?)#[\!\/](.+?)$/)) && !i[1].match(/^app(\d+)/) && (s.permanent = i[1], a = "/" + i[2]);
            var c = !!(o.getAttribute && o.getAttribute("data-post-click-type") && o.getAttribute("data-post-id"));
            if (a.match(/#$/) && !c) return !0;
            var l = domData(o, "post-id");
            l && (s.postId = l);
            var d = void 0,
                _ = a;
            if (n = a.match(/^\/(.*?)(\?|#|$)/)) n = n[1];
            else {
                if (o.hostname) d = o.hostname, n = o.pathname + o.search;
                else {
                    var u = /^([^:\/]+)?(?::(\d+))?(\/?[^#]*)(#?.*)$/i.exec(a);
                    if (!u) return !0;
                    d = u[1], n = u[3] || "/"
                }
                if (!d || !c) return !0;
                o.setAttribute("data-change-location-with-post-away", 1), _ = o
            }
            if ("add_community_app" === n) return attr(o, "target", "_blank"), !0;
            if (n.indexOf(".php") > 0 || n.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images\/|utils\/|\.js|js\/|\.css|css\/|source\b)/)) {
                if (!c) return !0;
                o.setAttribute("data-change-location-with-post-away", 1), _ = o
            }
            var p = o.getAttribute("hrefparams");
            p && (s.params = extend(s.params || {}, q2ajx(p)));
            try {
                return nav.go(_, e, s), cancelEvent(e)
            } catch (e) {
                return !0
            }
        }
    }, window.onEnter = function(e, t) {
        (t = t || window.event).keyCode === KEY.ENTER && (e(), cancelEvent(t))
    }, window.onCtrlEnter = function(e, t) {
        (10 === (e = e || window.event).keyCode || 13 === e.keyCode && (e.ctrlKey || e.metaKey && browser.mac)) && (t(), cancelEvent(e))
    }, vk.width = 960;
    var initedCheck = 0,
        needBlur = !1;

    function onDomReady(e) {
        e()
    }
    window.domStarted = function() {
        if (window.headNode = geByTag1("head"), extend(window, {
                icoNode: geByTag1("link", headNode),
                bodyNode: geByTag1("body"),
                htmlNode: geByTag1("html"),
                utilsNode: ge("utils"),
                _fixedNav: !1,
                _tbLink: {}
            }), addEvent(bodyNode, "resize", _lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.onBodyResize.pbind(!1)), utilsNode) {
            browser.mozilla ? addClass(bodyNode, "firefox") : browser.mobile && addClass(bodyNode, "mobfixed");
            var e = [];
            each(browser, function(t, o) {
                o && !inArray(t, ["version", "mac", "search_bot"]) && "flash" !== t.substr(0, 5) && e.push(t)
            }), e = e.join(" "), bodyNode.setAttribute("data-useragent", e), each(StaticFiles, function(e, t) {
                t.l = 1, "css" === t.t && utilsNode.appendChild(ce("div", {
                    id: t.n
                }))
            });
            var t = ge("layer_bg"),
                o = t.nextSibling,
                n = ge("box_layer_bg"),
                i = n.nextSibling;
            if (extend(window, {
                    layerBG: t,
                    boxLayerBG: n,
                    layerWrap: o,
                    layer: o.firstChild,
                    boxLayerWrap: i,
                    boxLayer: i.firstChild,
                    boxLoader: i.firstChild.firstChild,
                    _stlSide: ge("stl_side"),
                    _stlLeft: ge("stl_left"),
                    _stlShown: 0,
                    _stlWas: 0,
                    _stlWasSet: 0,
                    _stlBack: 0,
                    _regBar: 0,
                    __afterFocus: !1
                }), reopen(), !browser.mobile) {
                var r = {
                    onclick: _stlClick,
                    onmousedown: _stlMousedown,
                    onmouseover: _stlMouseover,
                    onmouseout: _stlMouseover
                };
                val(_stlLeft, '<div id="stl_bg"><nobr id="stl_text">' + getLang("global_to_top") + "</nobr></div>"), extend(_stlLeft, r), extend(_stlSide, r), window._stlBg = _stlLeft.firstChild, window._stlText = window._stlBg.firstChild, addEvent(window, "blur", function() {
                    window._wf = -1, needBlur = !1
                });
                var a = !0;
                addEvent(window, "focus", function() {
                    window._wf = 1, needBlur || (window.__afterFocus = needBlur = !0, setTimeout(function() {
                        window.__afterFocus = !1
                    }, 10), a && (sbWidth(!0), Object(_lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.onBodyResize)(!0), a = !1))
                })
            }
            addEvent(boxLayerWrap, "click", __bq.hideLastCheck), window.LazyLoad && LazyLoad.watch(boxLayerWrap), extend(layers, {
                show: layers._show.pbind(t, o),
                boxshow: layers._show.pbind(n, i),
                wrapshow: layers._show.pbind(t),
                hide: layers._hide.pbind(t, o),
                boxhide: layers._hide.pbind(n, i),
                wraphide: layers._hide.pbind(t)
            }), hab.init(), window._retinaInit ? window._retinaInit() : initedCheck = 1
        }
    }, vk.started = vkNow(), window.domReady = function() {
        if (utilsNode) {
            Object(_lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.updateSTL)();
            var e = ge("side_bar");
            extend(window, {
                pageNode: ge("page_wrap"),
                _fixedNav: e && "fixed" === getStyle(e, "position"),
                _tbLink: ge("top_back_link")
            }), browser.chrome || browser.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = browser.safari ? bodyNode : htmlNode;
            var t = Math.max(vkNow() - vk.started, 10),
                o = intval((vk.contlen || 1) / t * 1e3);
            if (browser.mozilla && browser.version >= 4 ? o /= 2.5 : browser.mozilla ? o *= 1.5 : browser.msie && browser.version >= 7 ? o /= 1.5 : browser.msie && (o *= 2.5), stManager.lowlimit = intval(150 * Math.max(2e6 / o, 1)), stManager.highlimit = 6 * stManager.lowlimit, stManager.lowlimit = Math.min(stManager.lowlimit, 600), Object(_lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.onBodyResize)(), setTimeout(_lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.onBodyResize.pbind(!1), 0), updateAriaElements(), window.addEventListener("scroll", _lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.onBodyScroll, {
                    passive: !0
                }), window.debuglogInit && debuglogInit(), !vk.id && ls.checkVersion() && ls.get("last_reloaded")) try {
                var n = {};
                each(["sound_notify_off", "im_ui_notify_off"], function(e, t) {
                    var o = ls.get(t);
                    null !== o && (n[t] = o)
                }), window.localStorage.clear(), each(n, function(e, t) {
                    return ls.set(e, t)
                })
            } catch (e) {}
        }
    }, Object(_lib_perfomance_logger__WEBPACK_IMPORTED_MODULE_37__.subscribePerformanceLoggerCollectors)(), window.onDomReady = onDomReady;
    var hab = new window.HistoryAndBookmarks({
        onLocChange: function(e) {
            var t = {
                back: !0,
                hist: !0
            };
            3 === vk.al && history.state && isObject(history.state) && (t.scrollTop = intval(history.state.scrollTop)), nav.go("/" + e, void 0, t)
        }
    });

    function leftBlockFriendTooltip() {
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
    }

    function __phCheck(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = arguments[2],
            n = arguments[3],
            i = e.phshown,
            r = e.phcont,
            a = t.back,
            s = t.editable,
            c = t.hideBackAfter,
            l = t.timeout,
            d = t.phColor,
            _ = void 0 === d ? "#8C8E91" : d,
            u = t.activeColor,
            p = void 0 === u ? "#C0C8D0" : u,
            f = l || 0 === l ? l : 100,
            h = t.period || 200,
            w = void 0;
        if (w = s ? (void 0 !== e.textContent ? e.textContent : e.innerText) || geByTag("img", e).length : e.value, i && (a && w || !a && (o && !o.type || w)) ? (hide(r), e.phshown = !1) : i || w || !a && !n || (show(r), e.phshown = !0, browser.opera && n && (e.setAttribute("placeholder", ""), e.removeAttribute("placeholder", ""))), a && !w) {
            if (o && !o.type) {
                var v = c ? hide.pbind(r.firstChild.firstChild) : null;
                clearTimeout(e.phanim), e.phanim = setTimeout(function() {
                    animate(r.firstChild.firstChild, {
                        color: p
                    }, h, v)
                }, f)
            }
            n && (clearTimeout(e.phanim), c && show(r.firstChild.firstChild), e.phanim = setTimeout(function() {
                animate(r.firstChild.firstChild, {
                    color: _
                }, h)
            }, f))
        }
    }

    function __qlClear() {
        clearTimeout(window.__qlTimer), setTimeout(function() {
            return clearTimeout(window.__qlTimer)
        }, 2e3)
    }

    function storePasswordCredential(e) {
        if (browserFeatures.cmaEnabled && window.ResizeObserver) {
            var t = new PasswordCredential({
                id: ge("quick_email").value,
                password: ge("quick_pass").value,
                name: e.name,
                iconURL: e.photo_50
            });
            navigator.credentials.store(t)
        }
    }
    window.hab = hab, window.leftBlockOver = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.leftBlockOver, window.leftBlockOut = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.leftBlockOut, window.leftBlockHide = _lib_layout_utils__WEBPACK_IMPORTED_MODULE_41__.leftBlockHide, window.hideNewsAnnounce = function(e, t) {
        var o = {
            act: "hide_block",
            block: e,
            hash: t
        };
        ajax.post("al_index.php", o), hide("news_announce_" + e)
    }, window.leftAdBlockClose = function(e, t) {
        function o() {
            animate("ads_ad_close_info_" + e, {
                opacity: 1
            }, 200, n)
        }

        function n() {
            setStyle("ads_ad_box2_" + e, {
                visibility: "hidden"
            })
        }
        setStyle("left_hide" + e, {
            visibility: "hidden"
        }), ajax.post(t, {}, {
            noAds: !0,
            onDone: function(t) {
                if (!t.done) return;
                if ("ya_direct" === e) return animate(e, {
                    opacity: 0
                }, 200, function() {
                    re("ya_direct"), setTimeout(function() {
                        AdsLight.updateBlock("force_hard", 2)
                    }, 5e3)
                }), void(window.vk__adsLight.yaDirectAdActive = !1);
                var n = ge("ads_ad_close_info_" + e);
                if (!n) return !1;
                setStyle(n, {
                    opacity: 0
                }), n.style.setProperty("display", "block", "important"), setTimeout(o, 0)
            }
        })
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
                return hide("left_friend_status_" + e)
            },
            onFail: function(e) {
                if (e) return Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showFastBox)({
                    title: getLang("global_error")
                }, e), !0
            }
        }), cancelEvent(i)
    }, window.leftBlockFriendTooltip = leftBlockFriendTooltip, vk.counts = {}, window.handlePageView = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.handlePageView, window.handlePageParams = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.handlePageParams, window.handlePageCount = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.handlePageCount, window.comScoreUDM = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.comScoreUDM, window.updateOtherCounters = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.updateOtherCounters, window.processDestroy = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.processDestroy, window.globalHistoryDestroy = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.globalHistoryDestroy, window.showBackLink = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.showBackLink, window.nav = _lib_nav__WEBPACK_IMPORTED_MODULE_35__.default, nav.init(), vk.time && !window.browser.opera_mobile && setTimeout(function() {
        var e = new Date,
            t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
        1 === t[1] && 12 === vk.time[1] ? vk.time[1] = 0 : 12 === t[1] && 1 === vk.time[1] ? t[1] = 0 : (t[1] > vk.time[1] + 1 || vk.time[1] > t[1] + 1) && (t[1] = vk.time[1] = t[2] = vk.time[2] = 0), t[1] > vk.time[1] && 1 === t[2] ? 31 === vk.time[2] || (4 === vk.time[1] || 6 === vk.time[1] || 9 === vk.time[1] || 11 === vk.time[1]) && 30 === vk.time[2] || 2 === vk.time[1] && (29 === vk.time[2] || 28 === vk.time[2] && vk.time[0] % 4) ? vk.time[2] = 0 : vk.time[2] = t[2] = 0 : vk.time[1] > t[1] && 1 === vk.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && vk.time[0] % 4) ? t[2] = 0 : t[2] = vk.time[2] = 0), (t[2] > vk.time[2] + 1 || vk.time[2] > t[2] + 1) && (t[2] = vk.time[2] = 0);
        var o = 60 * (60 * (24 * (t[2] - vk.time[2]) + (t[3] - vk.time[3])) + (t[4] - vk.time[4]));
        o < -55800 ? o += 86400 : o > 37800 && (o -= 86400);
        var n = 0,
            i = Math.abs(o);
        each([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], function(e, t) {
            var r = Math.round(3600 * (t - 3)),
                a = Math.abs(o - r);
            a < i && (i = a, n = r)
        }), vk.dt = n, getCookie("remixdt") !== vk.dt && setCookie("remixdt", vk.dt, 365);
        var r = intval(getCookie("remixrt"));
        window.devicePixelRatio >= 2 && (!browser.iphone || getCookie("remixme")) ? 1 & r || (setCookie("remixrt", 1 | r, 365), window._retinaInit = function() {
            stManager.add(["retina.css"]), addClass(document.body, "is_2x")
        }, initedCheck && window._retinaInit()) : 1 & r && setCookie("remixrt", 1 ^ r, 365)
    }, 0), window.__phCheck = __phCheck, window.placeholderSetup = function(e, t) {
        var o = ge(e),
            n = t ? clone(t) : {};
        if (o && (!o.phevents || n.reload)) {
            var i = o.getAttribute ? o.getAttribute("placeholder") : o.placeholder;
            if (i) {
                o.removeAttribute("placeholder");
                var r = {},
                    a = !1,
                    s = ["Top", "Bottom", "Left", "Right"];
                if (n.pad) r = n.pad;
                else {
                    if (n.fast) {
                        for (var c = 0; c < 4; c++) r["padding" + s[c]] = 3, r["margin" + s[c]] = 0, r["border" + s[c] + "Width"] = 1;
                        extend(r, n.styles || {})
                    } else {
                        for (var l = [], d = 0; d < 4; d++) l.push("margin" + s[d]), l.push("padding" + s[d]), l.push("border" + s[d] + "Width");
                        r = getStyle(o, l)
                    }
                    for (var _ = 0; _ < 4; _++) {
                        var u = "margin" + s[_],
                            p = "border" + s[_] + "Width";
                        r[u] = intval(r[u]) + intval(r[p]) + "px", delete r[p]
                    }
                }
                if (n.reload) {
                    var f = o.previousSibling;
                    f && hasClass(f, "input_back_wrap") && re(f)
                }
                var h = n.big ? " big" : "",
                    w = getSize(o)[0] - 20,
                    v = o.phcont = o.parentNode.insertBefore(ce("div", {
                        className: "input_back_wrap no_select",
                        innerHTML: '<div class="input_back"><div class="input_back_content' + h + '" style="width: ' + w + 'px;">' + i + "</div></div>"
                    }), o),
                    b = domFC(v);
                setStyle(b, r);
                var g = __phCheck.pbind(o, n),
                    m = browser.mobile ? g : function(e, t) {
                        return setTimeout(g.pbind(e, t), 0)
                    };
                browser.msie && browser.version < 8 && setStyle(b, {
                    marginTop: 1
                }), o.phonfocus = function(e) {
                    a || (o.focused = !0, cur.__focused = o, !0 === e && (setStyle(o, {
                        backgroundColor: "#FFF"
                    }), hide(b)), m(!0, !1))
                }, o.phonblur = function() {
                    a || (cur.__focused = o.focused = !1, show(b), m(!1, !0))
                }, o.phshown = !0, o.phanim = null, (o.value || n.editable && ((void 0 !== o.textContent ? o.textContent : o.innerText) || geByTag("img", o).length)) && (o.phshown = !1, hide(v)), browser.opera_mobile || (addEvent(v, "focus click", function(e) {
                    a || (n.editableFocus ? (setTimeout(n.editableFocus.pbind(o), 0), o.phonfocus()) : (o.blur(), o.focus()))
                }), addEvent(o, "focus" + (n.editable ? " click" : ""), o.phonfocus), addEvent(o, "keydown paste cut input", m)), addEvent(o, "blur", o.phonblur), o.check = m, o.getValue = function() {
                    return n.editable ? o.innerHTML : o.value
                }, o.setPlaceholder = function(e) {
                    return geByClass1("input_back_content", v).textContent = e
                }, o.setDisabled = function(e) {
                    return a = e
                }, o.setValue = function(e) {
                    n.editable ? o.innerHTML = e : o.value = e, __phCheck(o, n)
                }, o.phevents = !0, o.phonsize = function() {}, n.global || n.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function(e) {
                    for (var t = 0, o = e.length; t < o; t++) removeData(e[t])
                }.pbind(cur.__phinputs))), cur.__phinputs.push(o))
            }
        }
    }, window.isInputActive = function() {
        return document.activeElement && (attr(document.activeElement, "contenteditable") || "INPUT" === document.activeElement.tagName || "textarea" === document.activeElement.tagName)
    }, window.placeholderInit = function(e, t) {
        var o = ge(e),
            n = t ? clone(t) : {},
            i = void 0 === ce("input").placeholder || o && o.getAttribute && o.getAttribute("contenteditable");
        if (o && (!o.phevents || n.reload)) {
            var r = o.getAttribute ? o.getAttribute("placeholder") : o.placeholder;
            if (r && (o.getValue = function() {
                    return n.editable ? o.innerHTML : o.value
                }, o.setValue = function(e) {
                    n.editable ? o.innerHTML = e : o.value = e, i && d(o, n)
                }, o.phonfocus = function() {}, o.phonblur = function() {}, i)) {
                if (o.removeAttribute("placeholder"), n.reload) {
                    var a = domNS(o);
                    a && hasClass(a, "placeholder") && re(a)
                }
                var s = o.phcont = Object(_lib_dom__WEBPACK_IMPORTED_MODULE_15__.domInsertAfter)(ce("div", {
                        className: "placeholder",
                        innerHTML: '<div class="ph_input"><div class="ph_content">' + r + "</div></div>"
                    }), o),
                    c = d.pbind(o, n),
                    l = browser.mobile ? c : function(e, t) {
                        return setTimeout(c.pbind(e, t), 0)
                    };
                o.phonfocus = function() {
                    o.focused = !0, cur.__focused = o, l(!0, !1)
                }, o.phonblur = function() {
                    cur.__focused = o.focused = !1, l(!1, !0)
                }, o.phshown = !0, (o.value || n.editable && ((void 0 !== o.textContent ? o.textContent : o.innerText) || geByTag("img", o).length)) && (o.phshown = !1, hide(s)), browser.opera_mobile || (addEvent(s, "focus click contextmenu", function(e) {
                    n.editableFocus ? (setTimeout(n.editableFocus.pbind(o), 0), "contextmenu" === e.type && browser.msie && n.editableFocus(o), o.phonfocus()) : (o.blur(), o.focus())
                }), addEvent(o, "focus" + (n.editable ? " click" : ""), o.phonfocus), addEvent(o, "keydown paste cut input", l)), addEvent(o, "blur", o.phonblur), o.check = l, o.phevents = !0, o.phonsize = function() {}, n.global || n.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function() {
                    if (cur.__phinputs)
                        for (var e = 0, t = cur.__phinputs.length; e < t; ++e) removeData(cur.__phinputs[e])
                })), cur.__phinputs.push(o))
            }
        }

        function d(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                o = e.phshown,
                n = e.phcont,
                i = void 0;
            t.editable ? ((i = void 0 !== e.textContent ? e.textContent : e.innerText) && browser.opera && i.match(/^[ ]+$/) && (i = ""), i || (i = geByTag("img", e).length > 0), i || (i = geByTag("br", e).length > 1), i || (i = geByTag("p", e).length > 1)) : i = e.value, o && i ? (hide(n), e.phshown = !1) : o || i || (show(n), e.phshown = !0)
        }
    }, window.__bq = _lib_box_utils__WEBPACK_IMPORTED_MODULE_43__.boxQueue, window.boxQueue = _lib_box_utils__WEBPACK_IMPORTED_MODULE_43__.boxQueue, window.curBox = _lib_box_utils__WEBPACK_IMPORTED_MODULE_43__.curBox, Object(_lib_box_utils__WEBPACK_IMPORTED_MODULE_43__.initBoxQueue)(), window.browser.mobile || addEvent(document, "keydown", function(e) {
        if (window._wf = 1, e.keyCode === KEY.ESC && __bq.count() && !cur._noEscHide) return __bq.hideLast(), -1;
        if (e.keyCode === KEY.ESC && window.articleCloseImageFullSize && articleCloseImageFullSize()) return cancelEvent(event);
        if (e.keyCode === KEY.ESC && cur.articleLayer) return cur.articleLayer.close(!0), cancelEvent(event);
        if (e.keyCode === KEY.ESC) return cancelStackPop(), cancelEvent(e);
        var t = [176, 177, 178, 179],
            o = !1;
        window.audioPlayer && (t.push(KEY.LEFT), t.push(KEY.RIGHT)), each(t, function(t, n) {
            if (e.keyCode === n) return o = !0, !1
        }), o && getAudioPlayer().onMediaKeyPressedEvent(e), Chat.inited && 191 === e.keyCode && (e.ctrlKey || e.metaKey && browser.mac) && Chat.showFriends()
    }), window.boxRefreshCoords = _lib_box_utils__WEBPACK_IMPORTED_MODULE_43__.boxRefreshCoords, window.MessageBox = _lib_message_box__WEBPACK_IMPORTED_MODULE_42__.MessageBox, window.showBox = _lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showBox, window.showTabbedBox = _lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showTabbedBox, window.showFastBox = _lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showFastBox, window.showCaptchaBox = _lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showCaptchaBox, window.showReCaptchaBox = _lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showReCaptchaBox, window.checkTextLength = function(e, t, o, n, i, r, a) {
        var s = t.getValue ? t.getValue() : t.value,
            c = t.lastLen || 0;
        if (t.lastLen !== s.length || r) {
            t.lastLen = s.length;
            var l = {
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
            i && (l[","] = 5);
            var u = function(e, t) {
                for (var o = 0, n = 0, i = e.length; n < i; n++) {
                    var r = l[e.charAt(n)],
                        s = e.charCodeAt(n);
                    o += void 0 !== r ? r : !a && s >= 128 && (s < 1025 || _[s] || s > 1119) && !d[s] && (s < 8220 || s > 8222) && (s < 8224 || s > 8226) ? ("&#" + s + ";").length : 1
                }
                return o
            }(s);
            if (o = ge(o), u > Math.max(e - 100, .75 * e))
                if (show(o), u > e)
                    if (i) {
                        var p = val(t, function(e, t) {
                            for (var o = 0, n = "", i = 0, r = e.length; i < r; i++) {
                                var s = e.charAt(i),
                                    c = l[s],
                                    u = e.charCodeAt(i);
                                if ((o += void 0 !== c ? c : !a && u >= 128 && (u < 1025 || _[u] || u > 1119) && !d[u] && (u < 8220 || u > 8222) && (u < 8224 || u > 8226) ? ("&#" + u + ";").length : 1) > t) break;
                                n += s
                            }
                            return n
                        }(s, Math.min(e, c)));
                        t.lastLen = p.length, o.innerHTML = getLang("text_N_symbols_remain", 0)
                    } else o.innerHTML = getLang("text_exceeds_symbol_limit", u - e);
            else o.innerHTML = getLang("text_N_symbols_remain", e - u);
            else hide(o)
        }
    }, window.autosizeSetup = function(e, t) {
        if (e = ge(e))
            if (e.autosize) e.autosize.update();
            else {
                t.minHeight = intval(t.minHeight) || intval(getStyle(e, "height")), t.maxHeight = intval(t.maxHeight);
                var o = getSize(e)[0] || intval(getStyle(e, "width")),
                    n = getStyle(e, "fontSize"),
                    i = getStyle(e, "lineHeight");
                o < 1 && (o = intval(getStyle(e, "width", !1))), n.indexOf("em") > 0 && (n = floatval(n) * vk.fs), n = intval(n);
                var r = {
                    width: o,
                    height: 10,
                    fontFamily: getStyle(e, "fontFamily"),
                    fontSize: n + "px",
                    lineHeight: i,
                    boxSizing: getStyle(e, "boxSizing")
                };
                each(["Top", "Bottom", "Left", "Right"], function() {
                    r["padding" + this] = getStyle(e, "padding" + this)
                }), e.autosize = {
                    options: t,
                    helper: ce("textarea", {
                        className: "ashelper"
                    }, r),
                    handleEvent: function(t, o) {
                        var n = o.charCode ? String.fromCharCode(o.charCode) : o.charCode;
                        if (void 0 === n && (n = String.fromCharCode(o.keyCode), 10 === o.keyCode || 13 === o.keyCode ? n = "\n" : !browser.msie && o.keyCode <= 40 && (n = "")), !n) return t;
                        if (!browser.msie) return t.substr(0, e.selectionStart) + n + t.substr(e.selectionEnd);
                        var i = document.selection.createRange();
                        return i.text && (t = t.replace(i.text, "")), t + n
                    },
                    update: function(t) {
                        var o = e.value;
                        !t || "blur" === t.type || "keyup" === t.type || browser.msie && "keypress" !== t.type || t.ctrlKey || t.altKey || t.metaKey || (o = e.autosize.handleEvent(o, t)), o || (o = " "), e.autosize.helper.value !== o && (e.autosize.helper.value = o);
                        var n = e.autosize.options,
                            r = getSize(e, !0)[1],
                            a = e.autosize.helper.scrollHeight,
                            s = a % i;
                        n.exact && s > 2 && (a -= s - 2), a < n.minHeight && (a = n.minHeight);
                        var c = {
                                overflow: "hidden"
                            },
                            l = getStyle(e, "overflow").indexOf("auto") > -1 ? "auto" : "hidden";
                        n.maxHeight && a > n.maxHeight && (a = n.maxHeight, extend(c, {
                            overflow: "auto",
                            overflowX: "hidden"
                        })), n.addHeight && (a += n.addHeight), r === a && l === c.overflow || (c.height = a, setStyle(e, c), isFunction(n.onResize) && n.onResize(a))
                    }
                }, t.exact && ("normal" === i && (i = "120%"), i.indexOf("%") > 0 && (i = n * intval(i) / 100)), utilsNode.appendChild(e.autosize.helper), browser.opera_mobile ? (setStyle(e, {
                    overflow: "hidden"
                }), e.autosize.update(), addEvent(e, "blur", e.autosize.update)) : (addEvent(e, "keydown keyup keypress change", e.autosize.update), setTimeout(function() {
                    setStyle(e, {
                        overflow: "hidden",
                        resize: "none"
                    }), e.autosize.update();
                    var t = val(e);
                    val(e, " ", !0), val(e, t, !0)
                }, 0))
            }
    }, window.goAway = function(e, t, o) {
        if (-1 !== (t || {}).h || checkEvent(o)) return !0;
        if (-1 !== (t || {}).h) {
            var n = e.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i);
            if (n && "api." !== n[1].toLowerCase()) return location.href = e, !1;
            var i = intval(getCookie("remixsettings_bits"));
            if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(_lib_ajax__WEBPACK_IMPORTED_MODULE_14__.locBase) || 1 & i) return window.open("/away.php?to=" + encodeURIComponent(e) + (t && void 0 !== t.h ? "&h=" + t.h : ""), "_blank"), !1
        }
        var r = extend({
            act: "a_go",
            to: e
        }, t || {});
        return !Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showBox)("away.php", r, {}, o)
    }, window.showAudioClaimWarning = function(e, t, o) {
        var n = e.id,
            i = e.ownerId,
            r = e.title,
            a = t.id,
            s = t.reason,
            c = t.original,
            l = {
                width: 470
            },
            d = void 0,
            _ = void 0;
        "geo" === s ? (d = getLang("audio_claimed_geo"), _ = getLang("audio_claim_warning_title")) : "site_rules_violation" == s ? (d = getLang("audio_site_rules_violation_warning"), _ = getLang("audio_site_rules_violation_header")) : "replace" === s ? (d = getLang("audio_claimed_replacement_available"), _ = getLang("audio_claim_warning_title")) : "subscription" === s ? (l.hideButtons = !0, l.bodyStyle = "padding: 0; border-radius: 4px;", l.width = 450, _ = !1, d = '\n      <div class="audio_claim_popup">\n        <div class="audio_claim_popup__title">' + getLang("global_audio_only_with_subscription_title") + '</div>\n        <div class="audio_claim_popup__text">' + getLang("global_audio_only_with_subscription_text") + '</div>\n        <div class="audio_claim_popup__close" onclick="curBox().hide()"></div>\n        <button class="flat_button round_button" onclick="getAudioPlayer().showSubscriptionPopup()">' + getLang("global_audio_only_with_subscription_btn") + "</button>\n      </div>") : (d = getLang("audio_claim_warning"), _ = getLang("audio_claim_warning_title")), l.title = _;
        var u = [l, d = (d = (d = d.replace(/\{audio\}/g, "<b>" + r + "</b>")).replace(/\{objection_link\}/g, '<a href="/help?act=cc_objection&claim=' + a + "&content=audio" + i + "_" + n + '">' + getLang("audio_claim_objection") + "</a>")).replace(/\{delete_link\}/g, '<a onclick="deleteAudioOnClaim(' + i + ", " + n + '); return false;">' + getLang("audio_claim_delete") + "</a>")],
            p = null;
        if (o && c) {
            var f = AudioUtils.drawAudio(c, "no_extra");
            u[1] = d.replace(/\{original\}/g, c[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] + " - " + c[AudioUtils.AUDIO_ITEM_INDEX_TITLE]) + "<br/><br/>" + f, u.push(getLang("audio_replace_with_original"), function() {
                lockButton(p.btns.ok[0]), o(function() {
                    return p.hide()
                })
            }), l.textControls = '<a onclick="deleteAudioOnClaim(' + i + ", " + n + '); return false;">' + getLang("audio_claim_delete_capital") + "</a>"
        }
        cur.claimWarning = p = _lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showFastBox.apply(null, u)
    }, window.sureDeleteAll = function(title, text, where, objectId, toId, fromId, hash, event) {
        if (!checkEvent(event)) {
            var box = Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showFastBox)({
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
                        if (__debugMode) eval(res);
                        else try {
                            eval(res)
                        } catch (e) {
                            Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_40__.logEvalError)(e, res)
                        }
                        box.hide()
                    },
                    showProgress: lockButton.pbind(btn),
                    hideProgress: unlockButton.pbind(btn)
                })
            }, getLang("global_cancel"));
            return !1
        }
    }, window.__qlTimer = null, window.__qlClear = __qlClear, window.onLoginDone = function(e, t) {
        __qlClear(), storePasswordCredential(t), nav.reload({
            force: !0,
            from: 6
        })
    }, window.onLogout = function() {
        if (__qlClear(), audioPlayer && audioPlayer.stop(), window.Notifier && Notifier.standby(), window.FastChat && FastChat.standby(), window.Page && Page.postsClear(), ls.checkVersion()) try {
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
        __qlClear(), unlockButton(window.__qfBtn), window.qloginBox = Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showCaptchaBox)(e, t, window.qloginBox, {
            onSubmit: function(e, t) {
                ge("quick_captcha_sid").value = e, ge("quick_captcha_key").value = t, ge("quick_login_form").submit()
            },
            onHide: function() {
                return window.qloginBox = !1
            }
        })
    }, window.onLoginReCaptcha = function(e, t) {
        __qlClear(), unlockButton(window.__qfBtn), window.qloginBox = Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showReCaptchaBox)(e, t, window.qloginBox, {
            onSubmit: function(e) {
                ge("quick_recaptcha").value = e, ge("quick_login_form").submit()
            },
            onHide: function() {
                return window.qloginBox = !1
            }
        })
    }, window.storePasswordCredential = storePasswordCredential;
    var CallHub = function() {
        function e(t, o) {
            _classCallCheck(this, e), this.count = o || 1, this.func = t
        }
        return e.prototype.done = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.count -= e, this.count <= 0 && this.func()
        }, e
    }();
    window.callHub = CallHub, window.CallHub = CallHub, window.showWriteMessageBox = _lib_feature_boxes__WEBPACK_IMPORTED_MODULE_44__.showWriteMessageBox, window.giftsBox = _lib_feature_boxes__WEBPACK_IMPORTED_MODULE_44__.giftsBox, window.moneyTransferBox = _lib_feature_boxes__WEBPACK_IMPORTED_MODULE_44__.moneyTransferBox, window.gSearch = new _lib_global_search__WEBPACK_IMPORTED_MODULE_33__.default;
    var _cleanHide = function(e) {
        e.temphide && (removeEvent(e, "mouseout", e.temphide), removeAttr(e, "temphide"), removeAttr(e, "showing"))
    };

    function handleScroll(e) {
        e = e.split(",");
        var t = cur.named || {},
            o = e[0] && (t[e[0]] || ge(e[0])) || !1,
            n = e[1] && (t[e[1]] || ge(e[1])) || !1;
        if (!o && !n) {
            if (!(o = document.getElementsByName(e[0])[0])) return;
            o = o.nextSibling
        }
        var i = ge("page_header_wrap") || ge("dev_top_nav_wrap");
        setTimeout(function() {
            o && scrollToY(getXY(o)[1] - (i ? getSize(i)[1] : 0), 0), n && elfocus(n)
        }, 300)
    }
    window.showTooltip = function(e, t) {
        (vk.loaded || t.noload) && e && (e.temphide || (e.temphide = function() {
            e.showing = !1
        }, addEvent(e, "mouseout", e.temphide)), e.showing = !0, "loadingstat" !== e.tt && (e.tt || (e.tt = "loadingstat"), domClosest("fc_tab", e) && (t.appendEl = bodyNode), cur.cancelTooltip = !1, t.stat && stManager.add(t.stat), stManager.add(["tooltips.js", "tooltips.css"], function() {
            "loadingstat" === e.tt && (e.tt = !1), e.showing && !cur.cancelTooltip && (_cleanHide(e), e.tt && e.tt.el && !t.force || (tooltips.create(e, t), t.onCreate && t.onCreate()), tooltips.show(e, t))
        })))
    }, window.showTitle = function(e, t, o, n) {
        e = ge(e);
        o || (o = [Math.round(20 - getSize(e)[0] / 2), 8]);
        showTooltip(e, extend({
            text: function() {
                return t || e.getAttribute("data-title")
            },
            shift: o,
            black: 1
        }, n || {}))
    }, window.showHint = function(e, t) {
        e = ge(e), t = t || {};
        showTooltip(e, extend({
            text: function() {
                return e.getAttribute("data-title")
            },
            dir: "auto",
            width: 300,
            shift: [22, 8]
        }, t))
    }, window.reportAd = function(e) {
        Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showBox)("/reports.php?act=a_report_ad_box", {
            ad_id: e
        }, {
            params: {
                width: 370
            },
            stat: ["ui_controls.js", "ui_controls.css"]
        })
    }, window.updateMoney = function(e, t) {
        if (void 0 !== e && !1 !== e) {
            var o = "";
            !0 === t ? (vk.balanceEx = e, o = "_ex") : vk.balance = e;
            var n = geByClass("votes_balance_nom" + o);
            each(n, function(t, o) {
                return o.innerHTML = e + " " + getLang("votes_flex", e)
            });
            var i = e * (vk.vcost || 7),
                r = geByClass("money_balance_nom" + o);
            each(r, function(e, t) {
                return t.innerHTML = getLang("global_money_amount_rub", i, !0)
            }), void 0 !== t && !1 !== t && !0 !== t && updateMoney(t, !0)
        }
    }, window.articlePrepare = function(e) {
        e && !vk.isBanned && stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
            window.ArticleLayer.prepare(e)
        })
    }, window.zNav = _lib_nav_utils__WEBPACK_IMPORTED_MODULE_36__.zNav, window.handleScroll = handleScroll, window.topMsg = _lib_ui_util__WEBPACK_IMPORTED_MODULE_11__.topMsg, window.showMsg = _lib_ui_util__WEBPACK_IMPORTED_MODULE_11__.showMsg, window.topError = _lib_ui_util__WEBPACK_IMPORTED_MODULE_11__.topError, window.showGlobalPrg = _lib_ui_util__WEBPACK_IMPORTED_MODULE_11__.showGlobalPrg, window.showPhoto = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_45__.showPhoto, window.showManyPhoto = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_45__.showManyPhoto, window.showAlbums = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_45__.showAlbums, window.showAlbum = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_45__.showAlbum, window.showPhotoTags = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_45__.showPhotoTags, window.showVideoTags = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_45__.showVideoTags, window.videoCallback = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_45__.videoCallback, window.showWiki = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_45__.showWiki, window.showApp = _lib_feature_entries__WEBPACK_IMPORTED_MODULE_45__.showApp, window.showDoneBox = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = (t.w || 380) + 20,
            n = t.w ? ' style="width: ' + t.w + 'px;"' : "",
            i = bodyNode.offsetWidth,
            r = ce("div", {
                className: "top_result_baloon_wrap fixed " + (t.className || ""),
                innerHTML: '<div class="top_result_baloon"' + n + ">" + e + "</div>"
            }, {
                left: (i - o) / 2
            });
        t.parentEl ? geByClass1(t.parentEl).appendChild(r) : bodyNode.insertBefore(r, pageNode);
        var a = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
            s = browser.mobile ? intval(window.pageYOffset) : 0,
            c = getSize(r);
        r.style.top = Math.max(10, s + (a - c[1]) / 3) + "px";
        var l = t.out || 2e3,
            d = new Date,
            _ = function e() {
                l < 0 || (window.doneBoxTO = setTimeout(function() {
                    !t.permit || t.permit() ? fadeOut(r.firstChild, 500, function() {
                        re(r), t.callback && t.callback()
                    }) : e()
                }, l))
            };
        addEvent(r, "mouseenter", function() {
            clearTimeout(window.doneBoxTO), l -= new Date - d
        }), addEvent(r, "mouseleave", function() {
            d = new Date, _()
        }), _()
    }, window.animateCount = function(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (e = ge(e), t = o.str ? trim(t.toString()) || "" : positive(t), e)
            if (!browser.mobile || browser.safari_mobile || browser.android) {
                var n = data(e, "curCount"),
                    i = data(e, "nextCount");
                if ("number" == typeof i || o.str && "string" == typeof i) t != i && data(e, "nextCount", t);
                else if ("number" == typeof n || o.str && "string" == typeof n) t !== n && data(e, "nextCount", t);
                else if (n = o.str ? trim(val(e).toString()) || "" : positive(val(e)), "auto" === o.str && (o.str = !n.match(/^\d+$/) || !t.match(/^\d+$/), o.str || (n = positive(n), t = positive(t))), n !== t) {
                    data(e, "curCount", t);
                    var r, a = o.str ? n.length === t.length ? n < t : n.length < t.length : n < t,
                        s = (a ? t : n).toString(),
                        c = (a ? n : t).toString(),
                        l = void 0,
                        d = [],
                        _ = [];
                    for (o.str || (c = new Array(s.length - c.length + 1).join("0") + c), l = 0, r = s.length; l < r; l++) {
                        var u = s.charAt(l);
                        if (u !== c.charAt(l)) break;
                        d.push(u)
                    }
                    var p = s.substr(l),
                        f = c.substr(l);
                    if (o.str) {
                        for (l = p.length; l > 0; l--) {
                            var h = p.charAt(l);
                            if (h !== f.charAt(l)) break;
                            _.unshift(h)
                        }
                        _.length && (p = p.substr(0, l + 1), f = f.substr(0, l + 1))
                    }
                    d = d.join("").replace(/\s$/, "&nbsp;"), _ = _.join("").replace(/^\s/, "&nbsp;"), trim(val(e)) || o.noSpaceIfEmpty || val(e, "&nbsp;");
                    var w = e.clientHeight || e.offsetHeight;
                    val(e, '<div class="counter_wrap inl_bl"></div>');
                    var v, b = e.firstChild,
                        g = void 0,
                        m = void 0,
                        y = void 0,
                        O = !0;
                    d.length && b.appendChild(g = ce("div", {
                        className: "counter_const inl_bl",
                        innerHTML: d
                    })), d.length || (f = f.replace(/^0+/, "")), f && ("0" !== f || d.length) || (f = o.noSpaceIfEmpty ? "" : "&nbsp;", O = !!d.length), b.appendChild(y = ce("div", {
                        className: "counter_anim_wrap inl_bl"
                    })), y.appendChild(v = ce("div", {
                        className: "counter_anim " + (a ? "counter_anim_inc" : "counter_anim_dec"),
                        innerHTML: '<div class="counter_anim_big"><span class="counter_anim_big_c">' + p + "</span></div>" + (O ? '<div class="counter_anim_small"><span class="counter_anim_small_c">' + f + "</span></div>" : "")
                    }, O ? {
                        marginTop: a ? -w : 0
                    } : {
                        right: 0
                    })), o.str && setStyle(v, {
                        textAlign: "right",
                        right: 0
                    });
                    var E = getSize(geByClass1("counter_anim_big_c", v, "span"))[0],
                        k = O ? "&nbsp;" === f ? E : getSize(geByClass1("counter_anim_small_c", v, "span"))[0] : 0;
                    !f && o.noSpaceIfEmpty && (k = 0), _.length && b.appendChild(m = ce("div", {
                        className: "counter_const inl_bl",
                        innerHTML: _
                    })), o.noWrapWidth || setStyle(b, {
                        width: (g && getSize(g)[0] || 0) + (m && getSize(m)[0] || 0) + E + 0
                    }), void 0 === browser.csstransitions && (browser.csstransitions = browser.chrome && browser.version >= 9 || browser.mozilla && browser.version >= 4 || browser.opera && browser.version >= 10.5 || browser.safari && browser.version >= 3.2 || browser.safari_mobile || browser.android);
                    var x = browser.csstransitions;
                    setStyle(y, {
                        width: a ? k : E
                    });
                    var C = function() {
                            val(e, t || (o.noSpaceIfEmpty ? "" : " "));
                            var n = data(e, "nextCount");
                            data(e, "curCount", !1), data(e, "nextCount", !1), ("number" == typeof n || o.str && "string" == typeof n) && setTimeout(animateCount.pbind(e, n, o), 0), o.onDone && o.onDone()
                        },
                        T = O ? {
                            marginTop: a ? 0 : -w
                        } : {
                            marginRight: a ? -k : 0
                        };
                    x ? (getStyle(y, "width"), addClass(y, "counter_css_anim_wrap"), E !== k && setStyle(y, {
                        width: a ? E : k
                    }), O && setStyle(v, T), setTimeout(C, 300), o.fadeMode && (setStyle(geByClass1("counter_anim_big", e), "opacity", 1), setStyle(geByClass1("counter_anim_small", e), "opacity", 0))) : (E !== k && animate(y, {
                        width: a ? E : k
                    }, {
                        duration: 100
                    }), O ? animate(v, T, {
                        duration: 300,
                        transition: Fx.Transitions.easeOutCirc,
                        onComplete: C
                    }) : setTimeout(C, 300))
                }
            } else val(e, t || "")
    }, window.Chat = {
        maxHeight: 300,
        tabs: {},
        counters: {},
        showFriends: function() {
            curFastChat.clistBox.visible ? curFastChat.clistBox.options.fixed ? FastChat.clistHide() : curFastChat.clistBox.show() : (FastChat.clistShow(), Chat.cont.tt && Chat.cont.tt.destroy && Chat.cont.tt.destroy())
        },
        showTT: function() {
            if (!hasClass(Chat.wrap, "chat_active") && !hasClass(Chat.wrap, "chat_expand")) {
                var e = browser.mac ? "Cmd" : "Ctrl";
                showTooltip(Chat.cont, {
                    text: getLang("head_fr_online_tip") + " (" + e + "+?)",
                    shift: [-2, 4, 0],
                    showdt: 0,
                    black: 1
                })
            }
        },
        init: function() {
            Chat.wrap = ce("div", {
                id: "chat_onl_wrap",
                className: "chat_onl_wrap",
                innerHTML: '\n<div class="chat_tt_wrap"></div>\n<div class="chat_onl_inner">\n  <div class="chat_cont_scrolling"><div class="chat_onl_height"></div></div>\n  <div class="chat_cont_sh_top"></div>\n  <div class="chat_cont_sh_bottom"></div>\n  <a class="chat_tab_wrap" id="chat_tab_wrap" onclick="Chat.showFriends()" onmouseover="Chat.showTT();">\n    <div class="chat_onl_cont">\n      <div class="chat_onl" id="chat_onl"></div>\n    </div>\n  </a>\n</div>'
            }), utilsNode.appendChild(Chat.wrap), Chat.scrollNode = geByClass1("chat_cont_scrolling", Chat.wrap), Chat.ttNode = geByClass1("chat_tt_wrap", Chat.wrap), Chat.itemsCont = Chat.scrollNode.firstChild, Chat.onl = ge("chat_onl"), Chat.cont = Chat.onl.parentNode.parentNode, hide(Chat.wrap), Chat.inited = !0, stManager._addCss(".layers_shown .chat_onl_wrap {margin-right: " + sbWidth() + "px;}")
        }
    };
    var TopMenu = window.TopMenu = {
            init: function() {
                if (this.inited) return !1;
                var e = ge("top_profile_link"),
                    t = ge("top_profile_menu");
                if (!e || !t) return !1;
                addEvent(e, "mousedown", TopMenu.clicked), this.inited = !0
            },
            clicked: function(e) {
                return !(checkEvent(e) || "mousedown" === e.type && Object(_lib_dom_events__WEBPACK_IMPORTED_MODULE_16__.checkKeyboardEvent)(e)) && (TopMenu.toggle(), !1)
            },
            toggle: function(e) {
                var t = ge("top_profile_link"),
                    o = ge("top_profile_menu"),
                    n = hasClass(o, "shown");
                void 0 !== e && n === e || (void 0 === e && (e = !n), toggleClass(t, "active", e), toggleClass(o, "shown", e), e ? (cancelStackPush("top_menu", TopMenu.toggle.bind(this, !1), !0), cur.introExitTooltipHide && (cur.introExitTooltipHide(), delete cur.introExitTooltipHide)) : cancelStackFilter("top_menu", !0))
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
                return !!checkEvent(t) || (TopMenu.toggle(!1), nav.go(e, t, {
                    noback: !0
                }))
            }
        },
        topNotifierSt = ["notifier.js", "notifier.css"],
        cached;

    function IframeLoader() {
        var e = void 0,
            t = void 0,
            o = void 0,
            n = void 0,
            i = void 0,
            r = void 0;

        function a(e) {
            return t && t.body ? t.getElementById("___img" + e) : geByClass1("___img" + e, o)
        }

        function s() {
            e = utilsNode.appendChild(ce("iframe")), t = function(e) {
                if (browser.mozilla) return !1;
                try {
                    return e.contentDocument ? e.contentDocument : e.contentWindow && e.contentWindow.document ? e.contentWindow.document : e.document
                } catch (e) {}
                return !1
            }(e), o = t && t.body ? t.body : utilsNode.appendChild(ce("div", {}, {
                display: "none"
            })), n = 0, i = []
        }

        function c(e, r, s) {
            var c = n++;
            i[c] = {
                src: e,
                onLoad: r,
                that: s
            }, o.appendChild(ce("div", {
                innerHTML: function(e) {
                    return t && t.body ? '<img id="___img' + e + '" />' : '<img class="___img' + e + '" />'
                }(c)
            }));
            var l = a(c);
            return l.src = e, l.onload = function() {
                var e = i[c];
                e && (e.onLoad && e.onLoad.call(e.that || window, e.src), delete i[c], o.removeChild(a(c).parentNode))
            }, l
        }
        return s(), {
            add: c,
            abort: function() {
                re(e), r = [].concat(_toConsumableArray(i.filter(function(e) {
                    return void 0 !== e
                }))), s()
            },
            repeat: function(e) {
                if (!r) return [];
                var t = [];
                if (each(r, function(e, o) {
                        c(o.src, o.onLoad, o.that), t.push(o.that)
                    }), r = null, e) {
                    var o = [];
                    each(t, function() {
                        o.push([this, this.src]), this.src = "", hide(this)
                    }), setTimeout(function() {
                        each(o, function(e, t) {
                            var o = _slicedToArray(t, 2),
                                n = o[0],
                                i = o[1];
                            n.src = i, show(n)
                        })
                    }, 10)
                }
                return t
            }
        }
    }

    function statNavigationTiming() {
        if (window.clientStatsInitedNT) return !1;
        if (window.performance && performance.timing) {
            if (Math.random() > .001 && !__dev) return !1;
            var e = {},
                t = window.cur && window.cur.module;
            performance.timing.redirectStart && performance.timing.redirectEnd && (e.redirect = performance.timing.redirectEnd - performance.timing.redirectStart), performance.timing.domainLookupStart && performance.timing.domainLookupEnd && (e.domainLookup = performance.timing.domainLookupEnd - performance.timing.domainLookupStart), performance.timing.connectStart && performance.timing.connectEnd && (e.connect = performance.timing.connectEnd - performance.timing.connectStart, performance.timing.secureConnectionStart && (e.secureConnection = performance.timing.connectEnd - performance.timing.secureConnectionStart)), performance.timing.requestStart && performance.timing.responseStart && (e.request = performance.timing.responseStart - performance.timing.requestStart, performance.timing.responseEnd && (e.response = performance.timing.responseEnd - performance.timing.responseStart)), performance.timing.unloadEventStart && performance.timing.unloadEventEnd && (e.unloadEvent = performance.timing.unloadEventEnd - performance.timing.unloadEventStart), performance.timing.domLoading && performance.timing.domComplete && (e.processing = performance.timing.domComplete - performance.timing.domLoading), performance.timing.domContentLoadedEventStart && performance.timing.domContentLoadedEventEnd && (e.domContentLoadedEvent = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart), performance.timing.loadEventStart && performance.timing.loadEventEnd && (e.loadEvent = performance.timing.loadEventEnd - performance.timing.loadEventStart), performance.timing.loadEventEnd && performance.timing.responseEnd && (e.resource = performance.timing.loadEventEnd - performance.timing.responseEnd), each(e, function(e, o) {
                return statlogsValueEvent("navigation_timing", o, e, t)
            }), window.clientStatsInitedNT = !0
        }
    }

    function statDurationsLoadImage() {
        if (Math.random() < .001 && window.performance && window.performance.getEntriesByType) {
            if (window.clientStatsInited) return !1;
            var e = window.performance.getEntriesByType("resource");
            if (!e) return !1;
            for (var t = {}, o = {}, n = 0; n < e.length; n++)
                if (e[n] && "img" === e[n].initiatorType)
                    if (e[n].duration < 100) t["<100"] = (t["<100"] || 0) + 1;
                    else if (e[n].duration < 250) t["100-250"] = (t["100-250"] || 0) + 1;
            else if (e[n].duration < 500) t["250-500"] = (t["250-500"] || 0) + 1;
            else if (e[n].duration < 1e3) t["500-1000"] = (t["500-1000"] || 0) + 1;
            else if (e[n].duration < 2e3) t["1000-2000"] = (t["1000-2000"] || 0) + 1;
            else if (e[n].duration < 5e3) t["2000-5000"] = (t["2000-5000"] || 0) + 1;
            else if (t[">5000"] = (t[">5000"] || 0) + 1, e[n].name && e[n].name.indexOf("pp.vk.me") > 0) {
                var i = "";
                (i = (i = e[n].name).substr(i.indexOf("pp.vk.me") + 9)).indexOf("/") > 0 && (o[i = i.substr(0, i.indexOf("/"))] = (o[i] || 0) + 1)
            }
            each(t, function(e, t) {
                return statlogsValueEvent("img_load", t, e)
            }), each(o, function(e, t) {
                return statlogsValueEvent("img_slow", t, e)
            }), window.clientStatsInited = !0
        }
    }

    function updateAriaElements() {
        updateOnlineText(), updateAriaCheckboxes(), updateAriaRadioBtns()
    }

    function updateOnlineText() {
        clearTimeout(cur.updateOnlineTO), cur.updateOnlineTO = setTimeout(function() {
            each(geByClass("_online"), function() {
                var e = geByClass1("_online_reader", this) || this,
                    t = hasClass(this, "online"),
                    o = hasClass(this, "mobile"),
                    n = geByTag("img", e),
                    i = function(e) {
                        var t = domClosest("_post", e),
                            o = t && domByClass(t, "author");
                        return o ? o.innerText || o.textContent : ""
                    };
                if (t) {
                    var r = "";
                    each(n, function() {
                        var e = attr(this, "alt") || attr(this, "data-alt") || i(this);
                        e && (r = trim(r + " " + e), this.setAttribute("data-alt", e), this.removeAttribute("alt"))
                    }), r = trim(r + " " + (o ? getLang("global_user_is_online_mobile") : getLang("global_user_is_online"))), e.setAttribute("aria-label", r)
                } else each(n, function() {
                    var e = attr(this, "data-alt") || i(this);
                    e && (this.setAttribute("alt", e), this.removeAttribute("data-alt"))
                }), e.removeAttribute("aria-label")
            })
        }, 100)
    }

    function updateAriaCheckboxes() {
        clearTimeout(cur.updateChkBoxTO), cur.updateChkBoxTO = setTimeout(function() {
            var e = [];
            each(["checkbox", "checkbox_pic"], function() {
                e = e.concat(geByClass(this))
            }), each(e, function() {
                "DIV" !== this.tagName || this.getAttribute("role") || (this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", isChecked(this) ? "true" : "false"), this.setAttribute("tabindex", 0))
            })
        }, 100)
    }

    function updateAriaRadioBtns() {
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
                if (!geByClass("on", this).length) {
                    var e = geByClass("radiobtn", this);
                    e.length && e[0].setAttribute("tabindex", 0)
                }
            })
        }, 100)
    }

    function getRadioBtnWrap(e) {
        for (var t = 0, o = e; t < 5 && o !== document;) {
            if (o = domPN(o), geByClass("radiobtn", o).length > 1) break;
            t++
        }
        return o
    }

    function extractPercentile(e, t) {
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

    function collectMemoryStats() {
        var e = {},
            t = [15, 60, 300, 1500, 5e3, 1e4, 15e3, 2e4, 25e3, 3e4],
            o = [300, 1500, 5e3, 3e4, 6e4, 12e4, ">"],
            n = !1;
        setInterval(function() {
            var i = window.cur && window.cur.module;
            i !== n && (e = {}, n = i);
            var r = window.vkLastNav;
            if (i && r) {
                var a = extractPercentile(Date.now() - r, t);
                if (a && !e[a]) {
                    var s = extractPercentile(Date.now() - window.vkTabLoaded, o);
                    e[a] = !0;
                    var c = performance.memory.usedJSHeapSize;
                    statlogsValueEvent("js_memory_stats_modules", c, i, a, s)
                }
            }
        }, 5e3)
    }

    function cancelStackPop() {
        var e = window.cancelStack || [];
        Object(_lib_top_search__WEBPACK_IMPORTED_MODULE_34__.topHeaderClearClose)(), e.length > 0 && e.pop().func();
        var t = e[e.length - 1];
        return t && t.dclick && Object(_lib_top_search__WEBPACK_IMPORTED_MODULE_34__.topHeaderClose)(function() {
            t.func(), cancelStackFilter(t.name)
        }), window.cancelStack = e, window.cancelStack
    }

    function openArticleEditor(e, t, o) {
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
                    return Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showFastBox)(getLang("global_error"), e), !0
                },
                onDone: function(e, t, i, r) {
                    window.WkView && WkView.hide(), window.__bq && __bq.hideAll(), o && (r.postData = o), r.articleOwnerId ? stManager.add(n, function() {
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

    function bookmark(e, t, o, n) {
        var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        ajax.post("al_bookmarks.php", {
            act: "bookmark",
            owner_id: e,
            object_id: t,
            type: o,
            state: i ? 1 : 0,
            hash: n
        })
    }
    window.TopNotifier = {
            preload: function() {
                stManager.add(topNotifierSt, function() {
                    return window.TopNotifier.preload()
                })
            },
            show: function(e) {
                if (!0 !== checkEvent(e)) return stManager.add(topNotifierSt, function() {
                    return window.TopNotifier.show(e)
                }), cancelEvent(e)
            },
            showTooltip: function(e) {
                stManager.add(topNotifierSt, function() {
                    return window.TopNotifier.showTooltip(e)
                })
            },
            invalidate: function() {},
            setCount: function() {}
        }, window.TopSearch = _lib_top_search__WEBPACK_IMPORTED_MODULE_34__.default, window.mentionOver = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            showTooltip(e, {
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
        }, window.mentionClick = function(e, t) {
            var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            e && e.tt && e.tt.hide && e.tt.hide({
                fasthide: 1
            });
            var n = e,
                i = !1;
            if (cur.articleLayer && cur.articleLayer.isStandalone() && (i = !0), n.tagName && "a" === n.tagName.toLowerCase() && !n.getAttribute("target") && !nav.baseBlank) {
                var r = n.getAttribute("hrefparams");
                r && (o.params = extend(o.params || {}, q2ajx(r))), (n = (n = n.href || "").replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (n = n.replace(location.hostname, ""));
                var a = void 0;
                (n = n.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/")).match(/#$/) || !(a = n.match(/^\/(.*?)(\?|#|$)/)) ? i = !0 : ((a = a[1]).indexOf(".php") > 0 || a.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images|utils|\.js|js\/|\.css|css\/)/)) && (i = !0)
            }
            if (i) {
                if (!!!(o && o.params && o.params._post && o.params._post_click_type)) return !0;
                e.setAttribute("data-change-location-with-post-away", 1), n = e
            }
            return nav.go(n, t, o)
        }, window.menuSettings = function(e) {
            return Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showTabbedBox)("al_settings.php", {
                act: "menu_box",
                type: e
            })
        }, window._postsSeen = {}, window._postsSaved = {}, window._postsSaveTimer = void 0, window._postsSendTimer = void 0, window._postsCleanTimer = void 0, window._postsSeenModules = {}, window._postsExtras = {}, window.mobilePromo = _lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showBox.pbind("al_login.php", {
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
                var r = "all " + o.duration + "ms " + (o.func || "ease-out");
                e.style.WebkitTransition = r, e.style.MozTransition = r, e.style.OTransition = r, e.style.transition = r;
                var a = function t() {
                    return browser.opera && intval(browser.version) <= 12 ? e.removeEventListener("oTransitionEnd", t) : removeEvent(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", t), e.style.WebkitTransition = "", e.style.MozTransition = "", e.style.OTransition = "", e.style.transition = "", n && n(), !1
                };
                n && (browser.opera && intval(browser.version) <= 12 ? e.addEventListener("oTransitionEnd", a) : addEvent(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", a)), setTimeout(setStyle.pbind(e, t), 0)
            } else animate(e, t, extend(o, {
                onComplete: n
            }))
        }, window.imagesLoader = function(e, t) {
            var o = [],
                n = 0,
                i = null,
                r = extend({
                    top_load: 0,
                    bottom_load: 2,
                    load_limit: 10,
                    need_load_class: "__need_load",
                    skip_process_load: !1,
                    use_iframe: !1
                }, t),
                a = {};

            function s(e, t) {
                o[e] && (--n, delete o[e]), t || a.processLoad()
            }

            function c(t) {
                var o = 0,
                    n = t;
                if (n && n.offsetParent)
                    do {
                        if (o += n.offsetTop, e && n.offsetParent === e) break
                    } while (n = n.offsetParent);
                return o
            }
            return a.processLoad = function() {
                if (each(o, function(e, t) {
                        var n = _slicedToArray(t, 2),
                            i = n[0],
                            r = n[1];
                        (r.width || r.height || vkNow() - i > 2e4) && o[e] && s.call(r, e, !0)
                    }), clearTimeout(i), n && (i = setTimeout(a.processLoad, 500)), !(n >= r.load_limit)) {
                    var t = geByClass(r.need_load_class, e || bodyNode),
                        l = [],
                        d = void 0,
                        _ = void 0;
                    if (e && t.length) {
                        var u = e.offsetHeight;
                        d = e.scrollTop - u * r.top_load, _ = e.scrollTop + u * r.bottom_load
                    }
                    for (var p = 0, f = t.length; p < f && n < r.load_limit; p++) {
                        var h = t[p];
                        if ("IMG" === h.tagName) {
                            var w = h.getAttribute("data-src");
                            if (w) {
                                if (e) {
                                    var v = c(h),
                                        b = v + h.parentNode.offsetHeight;
                                    if (v > _) continue;
                                    if (b < d) continue
                                }
                                l.push([h, w])
                            }
                        }
                    }
                    each(l, function(e, t) {
                        var i = _slicedToArray(t, 2),
                            c = i[0],
                            l = i[1];
                        a.iloader && a.iloader.add(l, s, c), c.src = l, c.removeAttribute("data-src"), removeClass(c, r.need_load_class), o[l] || (n++, o[l] = [vkNow(), c])
                    }), clearTimeout(i), n && (i = setTimeout(a.processLoad, 500))
                }
            }, a.destroy = function() {
                o = [], n = 0, clearTimeout(i)
            }, r.use_iframe && window.IframeLoader && (a.iloader = new IframeLoader), r.skip_process_load || a.processLoad(), a
        }, window.IframeLoader = IframeLoader, window.getCaretBoundingRect = function(e) {
            var t = e.getBoundingClientRect(),
                o = null,
                n = null;
            if (t.top === t.bottom) return {
                left: 0,
                top: 0,
                bottom: 0
            };
            if (document.selection)(o = (n = document.selection.createRange()).getClientRects() || []).length || (n.text = "_", n.moveStart("character", -1), o = n.getClientRects(), n.text = ""), o = o[o.length - 1];
            else if (window.getSelection) {
                var i = getSelection();
                if (i.anchorNode) {
                    if ((n = i.getRangeAt(0)).collapsed) {
                        var r = n.startOffset;
                        n.setStart(n.startContainer, 0), o = n.getClientRects(), n.setStart(n.startContainer, r)
                    }
                    o = o && o.length ? o[o.length - 1] : {
                        right: t.left,
                        top: t.top,
                        bottom: t.top
                    }
                } else o = {
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
            return {
                left: o.right - t.left,
                top: o.top - t.top,
                bottom: o.bottom - t.top
            }
        }, window.getSelectionText = function() {
            var e = "";
            return window.getSelection ? e = window.getSelection().toString() : document.selection && "Control" !== document.selection.type && (e = document.selection.createRange().text), e
        }, window.statNavigationTiming = statNavigationTiming, window.statDurationsLoadImage = statDurationsLoadImage, window.getProgressBarEl = function(e) {
            return geByClass1("ui_progress_bar", e)
        }, window.onLoaded = function(e) {
            vk.loaded ? e() : addEvent(window, "load", e)
        }, window.currentModule = function() {
            return cur.currentModule ? cur.currentModule() : cur.module
        }, window.formatTime = function(e, t) {
            var o = void 0;
            e = Math.max(e, 0);
            var n = Math.floor(e % 60);
            o = n < 10 ? "0" + n : n;
            var i = (e = Math.floor(e / 60)) % 60;
            return o = i + ":" + o, ((e = Math.floor(e / 60)) > 0 || t) && (i < 10 && (o = "0" + o), o = e + ":" + o), o
        }, window.debounce = function(e, t, o) {
            var n = void 0;
            return function() {
                var i = this,
                    r = arguments,
                    a = o && !n;
                clearTimeout(n), n = setTimeout(function() {
                    n = null, o || e.apply(i, r)
                }, t), a && e.apply(this, r)
            }
        }, window.throttle = function(e, t) {
            var o = void 0;
            return function() {
                o || (e.apply(this, arguments), o = setTimeout(function() {
                    o = !1
                }, t))
            }
        }, window.shuffle = function(e) {
            for (var t = e.length; t > 0;) {
                var o = Math.floor(Math.random() * t),
                    n = e[--t];
                e[t] = e[o], e[o] = n
            }
            return e
        }, window.getProgressHtml = function(e, t) {
            return rs(vk.pr_tpl, {
                id: e || "",
                cls: t || ""
            })
        }, window.showProgress = function(e, t, o, n) {
            if (e = ge(e)) {
                var i = void 0;
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
        }, window.hashCode = function(e) {
            var t = 0;
            if (0 === e.length) return t;
            for (var o = 0, n = e.length; o < n; o++) {
                t = (t << 5) - t + e.charCodeAt(o), t |= 0
            }
            return t
        }, window.onlinePlatformClass = function(e) {
            var t = " _online";
            return e && (t += " online"), mobPlatforms[e] && (t += " mobile"), updateOnlineText(), t
        }, window.toggleOnline = function(e, t) {
            var o = onlinePlatformClass(t).split(" "),
                n = [];
            ["online", "mobile", "_online"].forEach(function(t) {
                inArray(t, o) && !hasClass(e, t) ? n.push(t) : !inArray(t, o) && hasClass(e, t) && removeClass(e, t)
            }), n.length > 0 && addClass(e, n.join(" "))
        }, window.updateAriaElements = updateAriaElements, window.updateOnlineText = updateOnlineText, window.updateAriaCheckboxes = updateAriaCheckboxes, window.updateAriaRadioBtns = updateAriaRadioBtns, window.getRadioBtnWrap = getRadioBtnWrap, window.isFullScreen = function() {
            return !!(document.fullscreenElement || document.fullScreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || cur.pvPartScreen)
        }, window.performance && window.performance.memory && rand(0, 100) < 5 && collectMemoryStats(), window.isPhotoeditor3Available = function() {
            return !browser.msie || parseInt(browser.version) > 10
        }, window.cancelStackFilter = function(e, t) {
            var o = window.cancelStack || [];
            return t && Object(_lib_top_search__WEBPACK_IMPORTED_MODULE_34__.topHeaderClearClose)(), window.cancelStack = o.filter(function(t) {
                return t.name !== e
            }), window.cancelStack
        }, window.cancelStackPush = function(e, t, o) {
            return o && Object(_lib_top_search__WEBPACK_IMPORTED_MODULE_34__.topHeaderClose)(function() {
                t(), cancelStackFilter(e)
            }), window.cancelStack = cancelStackFilter(e).concat([{
                func: t,
                name: e,
                dclick: o
            }]), window.cancelStack
        }, window.cancelStackPop = cancelStackPop, window.hasAccessibilityMode = function() {
            return !(!window.vk || !vk.a11y)
        }, window.AudioMessagePlayer = {
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
            if (!window.Worker || !window.Blob) return setTimeout(e, t);
            var o = new Blob(["\n      var timeout;\n      onmessage = function(e) {\n        clearTimeout(timeout);\n        if (e.data == 'start') {\n          timeout = setTimeout(function() { postMessage({}); }, \" + delay + \");\n        }\n      }\n    "]);
            try {
                var n = new Worker(window.URL.createObjectURL(o));
                return n.onmessage = function() {
                    n.terminate(), e()
                }, n.postMessage("start"), n
            } catch (o) {
                return setTimeout(e, t)
            }
        }, window.clearWorkerTimeout = function(e) {
            if (!e) return !1;
            Object(_lib_utils_common__WEBPACK_IMPORTED_MODULE_13__.isNumeric)(e) ? clearTimeout(e) : e.terminate()
        }, window.getStatusExportHash = function() {
            return vk.statusExportHash
        }, window.getPageHeaderHeight = (cached = void 0, function() {
            var e = ge("page_header");
            return cached = cached || (e ? e.offsetHeight : 0)
        }),
        function() {
            var e = .5,
                t = .25,
                o = 300,
                n = 1e3,
                i = 3e5,
                r = 2500,
                a = 5e3,
                s = 6e3,
                c = 2e4,
                l = 1e3,
                d = 36e4,
                _ = "_longViewType",
                u = "_longViewIdled",
                p = "_longViewModule",
                f = "_longViewStarted",
                h = "_longViewProcessed",
                w = "_longViewCached",
                v = "_longViewHeight",
                b = "_longViewTop",
                g = "_longViewBottom",
                m = "REGULAR",
                y = "AUTOPLAY_AD",
                O = "LongView.viewed",
                E = "LongView.idled",
                k = vk.longViewTestGroup,
                x = [],
                C = [],
                T = [],
                j = Date.now(),
                L = 0,
                P = 0,
                M = !1,
                D = null,
                B = null,
                A = null,
                S = null,
                I = {};

            function R() {
                var e = oe();
                e.length && (Q(e), ne())
            }

            function N() {
                x.forEach(function(e) {
                    e[w] = !1
                })
            }

            function W(e, t) {
                "im" === t && !e[_] && function(e) {
                    if (hasClass(e, "im-mess--post")) return !0;
                    var t = e && domFC(e);
                    return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || hasClass(e, "no_posts"))
                }(e) && (e[_] = function(e) {
                    var t = e && domFC(e);
                    return t && t.hasAttribute("data-ad-video-autoplay") ? y : m
                }(e), e[p] = t, x.push(e))
            }

            function U(o, n) {
                var i = U;
                ! function(o, n) {
                    var i = [];
                    x.forEach(function(r) {
                        ce(r) ? i.push(r) : ! function(t, o, n) {
                            return !t[f] && re(t, e, o, n)
                        }(r, o, n) ? function(e, o, n) {
                            return e[f] && !re(e, t, o, n)
                        }(r, o, n) && (r[u] ? delete r[u] : (le(C, r), T = T.concat(se(r))), delete r[f]) : (r[f] = Date.now(), C.push(r))
                    }), i.forEach(function(e) {
                        le(x, e)
                    })
                }(o || scrollGetY(), n || window.innerHeight), M ? (clearTimeout(i.timer), i.timer = setTimeout(F, 150)) : (M = !0, z(), function() {
                    if ("/im" === location.pathname) {
                        var e = geByClass1("im-page--chat-header"),
                            t = geByClass1("im-page--chat-input");
                        L = e.getBoundingClientRect().top + e.offsetHeight, P = window.innerHeight - t.getBoundingClientRect().top
                    } else L = ge("page_header").offsetHeight, P = 0
                }())
            }

            function F() {
                z(), V(), M = !1
            }

            function K() {
                z(), Z()
            }

            function H() {
                T = [], C.forEach(function(e) {
                    return e[f] = Date.now()
                }), J(null), ee(null), V()
            }

            function q() {
                z(), Z(), T = [], C = [], J(null), ee(null)
            }

            function V() {
                D = setTimeout(G, r), B = setTimeout(Y, a), A = setTimeout(X, s), S = setTimeout($, c)
            }

            function z() {
                clearTimeout(D), clearTimeout(B), clearTimeout(A), clearTimeout(S)
            }

            function G() {
                T.length && J(T)
            }

            function Y() {
                Q(T), T = [], J(null)
            }

            function X() {
                C.length && (ee(ae(C, !0, !0)), A = setTimeout(X, l))
            }

            function $() {
                clearTimeout(A), Q(ae(C)), C.forEach(function(e) {
                    return e[u] = !0
                }), C = [], ee(null)
            }

            function Z() {
                Q(T.concat(ae(C)))
            }

            function Q(e) {
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
                        return each(t, function(e, t) {
                            return o.push(e + "_" + t.join(","))
                        }), o.join(";")
                    }(e),
                    long_view: 1
                })
            }

            function J(e) {
                te(O, e)
            }

            function ee(e) {
                te(E, e)
            }

            function te(e, t) {
                var o = ls.get(e) || {};
                t ? o[j] = t : delete o[j], ls.set(e, o)
            }

            function oe() {
                var e = oe,
                    t = [],
                    o = ls.get(O) || {},
                    n = ls.get(E) || {};
                return e.iterator || (e.iterator = function(e) {
                    return function(o) {
                        ie(o) && (t = t.concat(e[o]))
                    }
                }), Object.keys(o).forEach(e.iterator(o)), Object.keys(n).forEach(e.iterator(n)), t
            }

            function ne() {
                var e = ne,
                    t = ls.get(O) || {},
                    o = ls.get(E) || {};
                e.iterator || (e.iterator = function(e) {
                    return function(t) {
                        ie(t) && delete e[t]
                    }
                }), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), ls.set(O, t), ls.set(E, o)
            }

            function ie(e) {
                var t = Number(e);
                return t !== j && Date.now() - t >= d
            }

            function re(e, t, o, n) {
                if (!e) return !1;
                e[w] || (e[w] = !0, e[v] = e.offsetHeight, e[b] = o + e.getBoundingClientRect().top, e[g] = e[b] + e[v]);
                var i = n - L - P,
                    r = o + L,
                    a = o + n - P,
                    s = e[v],
                    c = e[b],
                    l = e[g];
                return (l > r && c < a ? Math.min(a, l) - Math.max(r, c) : 0) >= Math.min(i * t, s * t)
            }

            function ae(e, t, o) {
                return e.map(function(e) {
                    return se(e, t, o)
                })
            }

            function se(e, t, r) {
                if (ce(e)) return [];
                var a = Math.min(i, Date.now() - e[f]);
                if (e[_] === m && a < o || e[_] === y && a < n) return [];
                r || (e[h] = !0);
                var s, c = function(e) {
                        var t = e[p];
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
                        } catch (t) {
                            return console.error("Unable to extract data from elem", e), []
                        }
                    }(e),
                    l = {
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
                    }["feed_other" === (s = c.module) ? "feed_" + cur.section : s] || "u",
                    d = cur.feed_session_id || "na",
                    u = [];
                for (var w in c)
                    if ("index" !== w && "module" !== w && "q" !== w) {
                        var v = w.split("_"),
                            b = v[0],
                            g = v[1];
                        "ads" === b && (g = v[3]), /^post\d+$/.test(b) && (b = v[1], g = v[2]);
                        var O = void 0;
                        t || (I[O = b + "_" + g] || (I[O] = 0), I[O]++), u.push("ad" === b ? {
                            ownerId: "ad",
                            postId: g,
                            module: l,
                            viewIndex: I[O]
                        } : "ads" === b ? {
                            ownerId: "ads",
                            postId: g,
                            module: l,
                            index: c.index,
                            duration: a,
                            sessionId: d,
                            viewIndex: I[O]
                        } : {
                            ownerId: b,
                            postId: (1 === c[w] ? "" : "-") + g,
                            module: l,
                            index: c.index,
                            duration: a,
                            sessionId: d,
                            q: c.q || null,
                            viewIndex: I[O]
                        })
                    }
                return u
            }

            function ce(e) {
                return "page_view" === k && e[h] || !document.body.contains(e)
            }

            function le(e, t) {
                var o = e.indexOf(t);
                o >= 0 && e.splice(o, 1)
            }
            k ? (addEvent(window, "blur", K), addEvent(window, "focus", H), onDomReady(function() {
                return setTimeout(R, 500)
            }), window.LongView = {
                register: W,
                onScroll: throttle(U, 50),
                onBeforePageChange: q,
                clearElemsCache: N,
                _debug: function() {
                    return {
                        started: C,
                        tracking: x,
                        viewedData: T,
                        viewIndexes: I,
                        blindTop: L,
                        blindBottom: P
                    }
                }
            }) : window.LongView = {
                register: function() {},
                onScroll: function() {},
                onBeforePageChange: function() {},
                clearElemsCache: function() {}
            }
        }(), window.parallel = function() {
            var e = [].slice.call(arguments),
                t = e.pop(),
                o = new CallHub(t, e.length);
            each(e, function(e, t) {
                return t(function() {
                    return o.done()
                })
            })
        }, window.shareAudioPlaylist = function(e, t, o, n) {
            return Object(_lib_message_box__WEBPACK_IMPORTED_MODULE_42__.showBox)("like.php", {
                act: "publish_box",
                object: "audio_playlist" + t + "_" + o,
                list: n
            }, {
                stat: ["wide_dd.js", "wide_dd.css", "sharebox.js"]
            }), cancelEvent(e)
        }, window.audioSearchPerformer = function(e, t) {
            var o = gpeByClass("_audio_row", e),
                n = AudioUtils.getAudioFromEl(o, !0),
                i = !!window.AudioPage && window.currentAudioPage(o),
                r = window.AudioPage && window.currentAudioPage(o) || cur.audioPage;
            return layers.fullhide && layers.fullhide(!0), setTimeout(function() {
                if (r) {
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
                    r = domData(e, "action"),
                    a = AudioUtils.getRowActionName(r, i, n),
                    s = {
                        text: function() {
                            return a
                        },
                        black: 1,
                        shift: t || [7, 4, 0],
                        needLeft: !0,
                        forcetodown: o
                    };
                gpeByClass("_im_mess_stack", e) ? (s.appendParentCls = "_im_mess_stack", s.shift = [7, 10, 0], s.noZIndex = !0) : gpeByClass("top_notify_wrap", e) ? s.appendParentCls = "top_notify_wrap" : gpeByClass("_ape_audio_item", e) && (s.appendParentCls = "_ape_audio_item"), showTooltip(e, s)
            }
        }, window.deleteAudioOnClaim = function(e, t) {
            var o = geByClass1("_audio_row_" + (e + "_" + t));
            AudioUtils.deleteAudio(o, AudioUtils.getAudioFromEl(o, !0)), cur.claimWarning && cur.claimWarning.hide()
        }, window.initTopAudioPlayer = function() {
            stManager.add(["audioplayer.js"], function() {
                window.TopAudioPlayer.init()
            })
        }, window.toggleAudioLyrics = function(e, t, o, n) {
            if (!n) return !1;
            var i = gpeByClass("_audio_row", t),
                r = geByClass1("_audio_lyrics_wrap", i);
            return r.innerHTML ? (toggle(r), cancelEvent(e), !1) : ((n = intval(n)) && (addClass(i, "audio_loading"), showProgress(i), ajax.post("al_audio.php", {
                act: "get_lyrics",
                aid: o,
                lid: n
            }, {
                onDone: function(e) {
                    hideProgress(i), removeClass(i, "audio_loading"), r.innerHTML = e, show(r)
                }
            }), cancelEvent(e)), !1)
        }, window.openArticleEditor = openArticleEditor, window.toggleFastChats = function(e) {
            var t = this,
                o = !e;
            toggleClass(ge("chat_onl_wrap"), "fast_chats_toggle_hide", o), toggleClass(ge("rb_box_fc_clist"), "fast_chats_toggle_hide", o), each(geByClass("rb_box_wrap"), function() {
                return toggleClass(t, "fast_chats_toggle_hide", o)
            })
        }, window.isArticleEditorAvailable = function() {
            return !(browser.msie && parseInt(browser.version) <= 11)
        }, window.bookmark = bookmark, window.bookmarkPost = function(e, t, o, n, i) {
            var r = parseInt(domData(e, "state"));
            e.innerHTML = r ? domData(e, "add") : domData(e, "remove"), domData(e, "state", r ? 0 : 1), bookmark(t, o, n, i, r)
        }, window.bookmarkArticle = function(e, t, o, n, i, r) {
            var a = parseInt(domData(t, "state"));
            return domData(t, "state", a ? 0 : 1), bookmark(o, n, i, r, a), cancelEvent(e)
        }, window.fifaReplaceText = function(e) {
            return cur.fifaConfettiEnabled && window.Fifa2018 ? /\w+=["']+[^"']*([Гг][Оо]+[Лл]|go+a+l).*["']+/gi.test(e) ? e : (e = e.replace(/&#33;/g, "!")).replace(/(^|[^a-zа-яА-ЯёЁ0-9])((?:[Гг][Оо]+[Лл]|go+a+l)[\!]*)(?=[^a-zа-яА-ЯёЁ0-9]+?|$)([\!])?/gi, function(e) {
                return ((arguments.length <= 1 ? void 0 : arguments[1]) || "") + '<span class="fifa_confettiLink" onclick="Fifa2018.startFlapper(this); return false;">' + (((arguments.length <= 2 ? void 0 : arguments[2]) || "") + ((arguments.length <= 3 ? void 0 : arguments[3]) || "")) + "</span>"
            }) : e
        }, window.getScrollInfo = function() {
            var e = {
                rtl: !1,
                backward: !1,
                delta: 1,
                negative: !1,
                rtlSame: !1
            };
            if (!vk.rtl) return e;
            if (!cur._scrollInfo) {
                var t = se('<div style="position: fixed; left: -1000; width: 0; overflow: scroll">x</div>');
                ge("content").appendChild(t);
                var o = t.scrollLeft;
                e.rtl = vk.rtl, e.backward = o > 0, t.scrollLeft = 1e3, e.delta = t.scrollLeft === o ? -1 : 1, e.negative = !e.backward && e.delta < 0, e.rtlSame = e.rtl && !e.backward && !e.negative, re(t), cur._scrollInfo = e
            }
            return cur._scrollInfo
        };
    var initCommonWeb = function() {
        window.isToday = _lib_date__WEBPACK_IMPORTED_MODULE_39__.isToday, window.isYesterday = _lib_date__WEBPACK_IMPORTED_MODULE_39__.isYesterday, window.isTomorrow = _lib_date__WEBPACK_IMPORTED_MODULE_39__.isTomorrow, window.isSameDate = _lib_date__WEBPACK_IMPORTED_MODULE_39__.isSameDate, window.leadingZero = _lib_date__WEBPACK_IMPORTED_MODULE_39__.leadingZero, window.constants = {
            Groups: _shared_constants_groups__WEBPACK_IMPORTED_MODULE_38__.default
        }, Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_40__.debugLog)("common module enabled")
    };
    initCommonWeb(), stManager.done(jsc("web/common_web.js"))
}, function(e, t, o) {
    'eat script';
    var n = o(59),
        i = o(48),
        r = o(3),
        a = o(79)("species");
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
    var n = o(79)("unscopables"),
        i = Array.prototype;
    void 0 == i[n] && o(60)(i, n, {}), e.exports = function(e) {
        i[n][e] = !0
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "toggleFlash", function() {
        return c
    }), o.d(t, "renderFlash", function() {
        return l
    });
    var n = o(95),
        i = o(109),
        r = o(11),
        a = o(104);
    ! function() {
        var e = "ShockwaveFlash.ShockwaveFlash",
            t = [0, 0, 0],
            o = "embed",
            i = 'type="application/x-shockwave-flash" ',
            r = function(e) {
                return e.toString().replace("&", "&amp;").replace('"', "&quot;")
            };
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            var s = navigator.plugins["Shockwave Flash"];
            if (s && s.description)
                for (var c = s.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."), l = 0; l < 3; ++l) t[l] = c[l] || 0
        } else {
            if (_ua.indexOf("Windows CE") >= 0)
                for (var d = !0, _ = 6; d;) try {
                    ++_, d = new ActiveXObject(e + "." + _), t[0] = _
                } catch (e) {} else try {
                    t = new ActiveXObject(e + ".7").GetVariable("$version").split(" ")[1].split(",")
                } catch (e) {}
            o = "object", i = 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
        }
        browser.flashwrap = "embed" === o ? function(e, t) {
            t = extend({
                id: e.id,
                name: e.id,
                width: e.width,
                height: e.height,
                style: e.style,
                preventhide: e.preventhide
            }, t), browser.flash >= e.version ? t.src = e.url : t.src = e.express;
            var o = [];
            for (var n in t)
                if (t.hasOwnProperty(n)) {
                    var a = t[n];
                    void 0 !== a && null !== a && o.push(n + '="' + r(a) + '" ')
                }
            return "<embed " + (i + o.join("")) + "/>"
        } : function(e, t) {
            browser.flash >= e.version ? t.movie = e.url : t.movie = e.express;
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
                    var s = o[a];
                    void 0 !== s && null !== s && n.push(a + '="' + r(s) + '" ')
                }
            var c = [];
            for (var l in t)
                if (t.hasOwnProperty(l)) {
                    var d = t[l];
                    void 0 !== d && null !== d && c.push('<param name="' + l + '" value="' + r(d) + '" />')
                }
            return "<object " + (i + n.join("")) + ">" + c.join("") + "</object>"
        }, t[0] < 7 && (t = [0, 0, 0]), browser.flash = Object(n.intval)(t[0]), browser.flashfull = {
            major: browser.flash,
            minor: Object(n.intval)(t[1]),
            rev: Object(n.intval)(t[2])
        }, Object(a.setCookie)("remixflash", Object(n.intval)(t[0]) + "." + Object(n.intval)(t[1]) + "." + Object(n.intval)(t[2]), 30)
    }();
    var s = 0;

    function c(e, t) {
        if (clearTimeout(s), t > 0) s = setTimeout(function() {
            return c(e, 0)
        }, t);
        else {
            var o = e ? "visible" : "hidden";
            Object(r.triggerEvent)(document, e ? "unblock" : "block");
            var a = function(t, n) {
                n.getAttribute("preventhide") || "internal/link" === n.getAttribute("type") || ("flash_app" === n.id && browser.msie ? e ? Object(i.setStyle)(n, {
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

    function l(e, t, o, i) {
        if (!t.url || !t.id) return !1;
        var r = (t = extend({
            version: 9,
            width: 1,
            height: 1
        }, t)).url;
        return stVersions[r] || (stVersions[r] = ""), __debugMode && stVersions[r] < 1e6 && (stVersions[r] += Object(n.irand)(1e6, 2e6)), stVersions[r] && (t.url += (-1 === t.url.indexOf("?") ? "?" : "&") + "_stV=" + stVersions[r]), o = extend({
            quality: "high",
            flashvars: ajx2q(i)
        }, o), !(browser.flash < t.version) && (ge(e).innerHTML = browser.flashwrap(t, o), !0)
    }
    window.toggleFlash = c, window.renderFlash = l
}, function(e, t, o) {
    'eat script';
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
                            l = Object.getOwnPropertyDescriptor(i, c);
                        void 0 !== l && l.enumerable && (o[c] = i[c])
                    }
            }
            return o
        }
    })
}, function(e, t) {
    var o = 0,
        n = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++o + n).toString(36))
    }
}, function(e, t, o) {
    var n = o(89),
        i = Math.min;
    e.exports = function(e) {
        return e > 0 ? i(n(e), 9007199254740991) : 0
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "animate", function() {
        return a
    }), o.d(t, "cubicBezier", function() {
        return s
    }), o.d(t, "fadeTo", function() {
        return c
    }), o.d(t, "slideDown", function() {
        return u
    }), o.d(t, "slideUp", function() {
        return p
    }), o.d(t, "slideToggle", function() {
        return f
    }), o.d(t, "fadeIn", function() {
        return h
    }), o.d(t, "fadeOut", function() {
        return w
    }), o.d(t, "fadeToggle", function() {
        return v
    }), o.d(t, "getRGB", function() {
        return b
    }), o.d(t, "getColor", function() {
        return g
    });
    var n = o(95),
        i = o(109),
        r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };

    function a(e, t, o, a) {
        if (e = Object(i.ge)(e)) {
            var s = Object(n.isFunction)(a) ? a : function() {},
                c = Object(n.extend)({}, "object" === (void 0 === o ? "undefined" : r(o)) ? o : {
                    duration: o,
                    onComplete: s
                }),
                l = {},
                _ = {},
                u = Object(i.isVisible)(e),
                p = void 0;
            c.orig = {}, (t = Object(n.clone)(t)).discrete && (c.discrete = 1, delete t.discrete), browser.iphone && (c.duration = 0);
            var f = Object(i.data)(e, "tween"),
                h = u ? "hide" : "show";
            for (var w in f && f.isTweening && (c.orig = Object(n.extend)(c.orig, f.options.orig), f.stop(!1), f.options.show ? h = "hide" : f.options.hide && (h = "show")), t)
                if (t.hasOwnProperty(w)) {
                    if (!f && ("show" === t[w] && u || "hide" === t[w] && !u)) return c.onComplete.call(this, e);
                    if ("height" !== w && "width" !== w || !e.style || (t.overflow || (void 0 === c.orig.overflow && (c.orig.overflow = Object(i.getStyle)(e, "overflow")), e.style.overflow = "hidden"), Object(i.hasClass)(e, "inl_bl") || "TD" === e.tagName || (e.style.display = "block")), /show|hide|toggle/.test(t[w]))
                        if ("toggle" === t[w] && (t[w] = h), "show" === t[w]) {
                            p = 0, c.show = !0, void 0 === c.orig[w] && (c.orig[w] = Object(i.getStyle)(e, w, !1) || "", Object(i.setStyle)(e, w, 0));
                            var v = e.style[w];
                            e.style[w] = c.orig[w], t[w] = parseFloat(Object(i.getStyle)(e, w, !0)), e.style[w] = v, "height" === w && browser.msie && !t.overflow && (e.style.overflow = "hidden")
                        } else void 0 === c.orig[w] && (c.orig[w] = Object(i.getStyle)(e, w, !1) || ""), c.hide = !0, t[w] = 0
                }
            return c.show && !u && Object(i.show)(e), f = new d(e, c), Object(n.each)(t, function(t, o) {
                if (/backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|borderColor|outlineColor/.test(t)) {
                    if (p = g(e, "borderColor" === t ? "borderTopColor" : t), o = b(o), void 0 === p) return
                } else {
                    var r = o.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/);
                    r && (o = parseFloat(r[2]), r[1] && (o = ("-=" == r[1] ? -1 : 1) * o + o)), 0 != (p = f.cur(t, !0)) || "width" !== t && "height" !== t || (p = 1), "opacity" === t && o > 0 && !u && (Object(i.setStyle)(e, "opacity", 0), p = 0, Object(i.show)(e))
                }(p != o || Object(n.isArray)(p) && p.join(",") === o.join(",")) && (l[t] = p, _[t] = o)
            }), f.start(l, _), Object(i.data)(e, "tween", f), f
        }
    }

    function s(e, t, o, n, i, r) {
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
            l = i,
            d = void 0,
            _ = void 0;
        for (d = l, _ = 0; _ < 8; _++) {
            var u = a(d) - l;
            if (Math.abs(u) < r) return s(d);
            var p = c(d);
            if (Math.abs(p) < 1e-6) break;
            d -= u / p
        }
        var f = 0,
            h = 1;
        if ((d = l) < f) return s(f);
        if (d > h) return s(h);
        for (; f < h;) {
            var w = a(d);
            if (Math.abs(w - l) < r) return s(d);
            l > w ? f = d : h = d, d = .5 * (h - f) + f
        }
        return s(d)
    }

    function c(e, t, o, n) {
        return a(e, {
            opacity: o
        }, t, n)
    }
    var l = {
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
                    return o * s(.4, 0, .22, 1, e / n, 4 / n) + t
                }
            },
            Attrs: [
                ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
                ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
                ["opacity", "left", "top"]
            ],
            Timers: [],
            TimerId: null
        },
        d = function() {
            function e(t, o, r) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.el = Object(i.ge)(t), this.name = r, this.options = Object(n.extend)({
                    onStep: function() {},
                    onComplete: function() {},
                    transition: o.transition || l.Transitions.sineInOut,
                    duration: 500
                }, o || {})
            }
            return e.prototype.start = function(e, t) {
                var o = this;
                this.from = e, this.to = t, this.time = Object(n.vkNow)(), this.isTweening = !0;
                var i = function(e) {
                    return o.step(e)
                };
                return i.el = this.el, i() && l.Timers.push(i) && !l.TimerId && (l.TimerId = setInterval(function() {
                    for (var e = l.Timers, t = e.length, o = 0; o < t; o++) e[o]() || (e.splice(o--, 1), t--);
                    t || (clearInterval(l.TimerId), l.TimerId = null)
                }, 13)), this
            }, e.prototype.stop = function(e) {
                for (var t = l.Timers, o = t.length - 1; o >= 0; o--) t[o].el === this.el && (e && t[o](!0), t.splice(o, 1));
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
        }();

    function _(e, t) {
        var o = {};
        return Object(n.each)(l.Attrs.concat.apply([], l.Attrs.slice(0, t)), function() {
            o[this] = e
        }), o
    }
    l.Base = d;
    var u = function(e, t, o) {
            return a(e, _("show", 1), t, o)
        },
        p = function(e, t, o) {
            return a(e, _("hide", 1), t, o)
        },
        f = function(e, t, o) {
            return a(e, _("toggle", 1), t, o)
        },
        h = function(e, t, o) {
            return a(e, {
                opacity: "show"
            }, t, o)
        },
        w = function(e, t, o) {
            return a(e, {
                opacity: "hide"
            }, t, o)
        },
        v = function(e, t, o) {
            return a(e, {
                opacity: "toggle"
            }, t, o)
        };

    function b(e) {
        var t = void 0;
        return e && Object(n.isArray)(e) && 3 == e.length ? e : (t = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) ? [parseInt(t[1]), parseInt(t[2]), parseInt(t[3])] : (t = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e)) ? [2.55 * parseFloat(t[1]), 2.55 * parseFloat(t[2]), 2.55 * parseFloat(t[3])] : (t = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : (t = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e)) ? [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)] : void 0
    }

    function g(e, t) {
        var o = void 0;
        do {
            if (0 === (o = Object(i.getStyle)(e, t)).indexOf("rgba") && (o = ""), "" != o && "transparent" !== o || "body" === e.nodeName.toLowerCase()) break;
            t = "backgroundColor", e = e.parentNode
        } while (e);
        return b(o)
    }
    window.Fx = l, window.fx = l, window.animate = a, window.cubicBezier = s, window.fadeTo = c, window.genFx = _, window.getRGB = b, window.getColor = g, window.slideDown = u, window.slideUp = p, window.slideToggle = f, window.fadeIn = h, window.fadeOut = w, window.fadeToggle = v
}, function(e, t) {
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
    var c, l = [],
        d = !1,
        _ = -1;

    function u() {
        d && c && (d = !1, c.length ? l = c.concat(l) : _ = -1, l.length && p())
    }

    function p() {
        if (!d) {
            var e = s(u);
            d = !0;
            for (var t = l.length; t;) {
                for (c = l, l = []; ++_ < t;) c && c[_].run();
                _ = -1, t = l.length
            }
            c = null, d = !1,
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

    function h() {}
    i.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
        l.push(new f(e, t)), 1 !== l.length || d || s(p)
    }, f.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = h, i.addListener = h, i.once = h, i.off = h, i.removeListener = h, i.removeAllListeners = h, i.emit = h, i.prependListener = h, i.prependOnceListener = h, i.listeners = function(e) {
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
    'eat script';
    o.r(t), Number.isInteger = Number.isInteger || function(e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e
    }
}, function(e, t, o) {
    e.exports = o(36)
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
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
    }), __webpack_require__.d(__webpack_exports__, "ajax", function() {
        return ajax
    });
    var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95),
        _debug_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
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
            if (null != e[i] && !isFunction(e[i]))
                if (isArray(e[i]))
                    for (var r = 0, a = 0, s = e[i].length; r < s; ++r) null == e[i][r] || isFunction(e[i][r]) || (o.push(n(i) + "[" + a + "]=" + n(e[i][r])), ++a);
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
        return e = e.split("&"), each(e, function(e, n) {
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
    window.ajaxCache = {}, window.globalAjaxCache = {};
    var ajax = {
        _init: function() {
            try {
                if (new XMLHttpRequest) return void(ajax._req = function() {
                    return new XMLHttpRequest
                })
            } catch (e) {}
            ajax._req || browser.search_bot || location.replace("/badbrowser.php")
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
            var container = cont && ge(cont);
            if (container && html && (container.firstChild ? container.appendChild(cf(html)) : val(container, html)), js) {
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
            clearTimeout(iframeTO), iframeTransport && ajax._frameover(), iframeTransport = utilsNode.appendChild(ce("div", {
                innerHTML: "<iframe></iframe>"
            })).firstChild, ajax._framedone = o, ajax.framedata = [!0], e += "?" + ("string" != typeof t ? ajx2q(t, n && n.noSort) : t), e += ("?" != e.charAt(e.length - 1) ? "&" : "") + "_rndVer=" + irand(0, 99999), ajax._frameurl = iframeTransport.src = e
        },
        plainpost: function(e, t, o, n, i, r, a, s) {
            var c = ajax._getreq(),
                l = "string" != typeof t ? ajx2q(t, a && a.noSort) : t;
            c.onreadystatechange = function() {
                4 === c.readyState && (c.status >= 200 && c.status < 300 ? o && o(c.responseText, c) : n && n(c.responseText, c))
            };
            try {
                c.open("POST", e, !0)
            } catch (e) {
                return !1
            }
            return r && each(r, function(e, t) {
                c[e] = t
            }), i || (c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s || c.setRequestHeader("X-Requested-With", "XMLHttpRequest")), c.send(l), c
        },
        post: function(e, t, o) {
            "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
            var n = extend({
                    _captcha: !1,
                    _box: !1
                }, o || {}),
                i = extend({
                    al: n.frame ? -1 : 1
                }, t),
                r = vkNow(),
                a = vk.spentLastSendTS ? Math.round((r - vk.spentLastSendTS) / 1e3) : 0;
            if (vk.sampleUser >= 0 && window.cur && cur.module && a >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (i._smt = cur.module + ":" + a), vk.spentLastSendTS = r), n.progress && (n.showProgress || (n.showProgress = function() {
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
            "/" !== e.substr(0, 1) && (e = "/" + e), ajaxCache[e + "#" + ajx2q(t)] = o
        },
        invalidate: function(e, t) {
            void 0 === e ? ajaxCache = {} : delete ajaxCache[ajax._getCacheKey(e, t)]
        },
        _getCacheKey: function(e, t, o) {
            var n = clone(t);
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
                            e[o] = parseJSON(n);
                            break;
                        case "int":
                            e[o] = intval(n);
                            break;
                        case "float":
                            e[o] = floatval(n);
                            break;
                        case "bool":
                            e[o] = !!intval(n);
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
            window.__adsGetAjaxParams && extend(query, __adsGetAjaxParams(query, options)), options.cache && (cacheKey = ajax._getCacheKey(url, query, options));
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
                    if (options.hideProgress && options.hideProgress(), options._suggest && cleanElems(options._suggest), options._box = hideBoxes(options._captcha, options._box), options._captcha = options._box, options._suggest = options._captcha, -1 !== e.indexOf("The page is temporarily unavailable") && __dev && inArray(vk.id, [100])) return ajax._post(url, query, options), !1;
                    options.onFail && !0 === options.onFail(e) || topError(e, {
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
                switch (options.cache && !options.forceGlobalCache && (code || (ajaxCache[cacheKey] = answer)), options.hideProgress && options.hideProgress(), 2 !== code && (options._captcha && (options._suggest && cleanElems(options._suggest), options._captcha = hideBoxes(options._captcha), options._suggest = options._captcha), options._box = hideBoxes(options._box)), code) {
                    case 1:
                        showFastBox({
                            width: 520,
                            title: answer[0],
                            onDestroy: options.onFail
                        }, answer[1]);
                        break;
                    case 2:
                        var addText = "";
                        if (2 === intval(answer[1])) {
                            var resend = function(e) {
                                var t = extend(query, {
                                        recaptcha: e
                                    }),
                                    o = options.cache ? extend(options, {
                                        cache: -1
                                    }) : options;
                                ajax._post(url, t, o)
                            };
                            options._captcha = showReCaptchaBox(answer[0], answer[2], options._captcha, {
                                onSubmit: resend,
                                addText: addText,
                                onDestroy: function() {
                                    options.onFail && options.onFail()
                                }
                            })
                        } else {
                            var _resend = function(e, t) {
                                var o = extend(query, {
                                        captcha_sid: e,
                                        captcha_key: t
                                    }),
                                    n = options.cache ? extend(options, {
                                        cache: -1
                                    }) : options;
                                ajax._post(url, o, n)
                            };
                            options._captcha = showCaptchaBox(answer[0], intval(answer[1]), options._captcha, {
                                onSubmit: _resend,
                                addText: addText,
                                onDestroy: function() {
                                    options.onFail && options.onFail()
                                }
                            })
                        }
                        options._suggest = geByClass1("phone_validation_link", options._captcha.bodyNode), options._suggest && addEvent(options._suggest, "click", function() {
                            options._box = validateMobileBox({
                                onDone: options._captcha.submit
                            })
                        });
                        break;
                    case 11:
                    case 12:
                        var newOptions = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        options._box = validateMobileBox({
                            acceptCaptcha: 11 === code,
                            onDone: function(e, t) {
                                vk.nophone = 0, e && (options._captcha = curBox());
                                var o = e ? extend(query, {
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
                        var _newOptions = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        options._box = photoCaptchaBox({
                            onDone: ajax._post.pbind(url, query, _newOptions),
                            onFail: options.onFail
                        });
                        break;
                    case 15:
                        var _newOptions2 = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        options._box = validatePassBox({
                            onDone: ajax._post.pbind(url, query, _newOptions2),
                            onFail: options.onFail,
                            hash: answer[0]
                        });
                        break;
                    case 3:
                        var _newOptions3 = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        window.onReLoginDone = ajax._post.pbind(url, query, _newOptions3), window.onReLoginFailed = function(e, t) {
                            t ? nav.go(t) : -1 === e ? location.href = location.href.replace(/^http:/, "https:") : e ? nav.go("/") : window.onReLoginDone()
                        }, utilsNode.appendChild(ce("iframe", {
                            src: vk.loginscheme + "://login.vk.com/?" + ajx2q({
                                role: "al_frame",
                                _origin: locProtocol + "//" + locHost,
                                ip_h: answer[0] || vk.ip_h,
                                to: answer[1] || ""
                            })
                        }));
                        break;
                    case 4:
                        intval(answer[1]) ? nav.go(answer[0], !1, {
                            nocur: "2" === answer[1],
                            noback: !0 === answer[1],
                            showProgress: options.showProgress,
                            hideProgress: options.hideProgress
                        }) : (hab.stop(), location.href = answer[0]);
                        break;
                    case 5:
                        nav.reload({
                            force: intval(answer[0]),
                            from: 1,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        break;
                    case 6:
                        var _newOptions4 = options.cache ? extend(options, {
                            cache: -1
                        }) : options;
                        options._box = activateMobileBox({
                            onDone: ajax._post.pbind(url, query, _newOptions4),
                            onFail: options.onFail,
                            hash: answer[0]
                        });
                        break;
                    case 7:
                        options.onFail && options.onFail(), topMsg(answer[0], 10);
                        break;
                    case 8:
                        if (options.onFail && options.onFail(answer[0])) return;
                        topError(answer[0] + (answer[2] ? " #" + answer[2] : ""), {
                            dt: answer[1] ? 0 : 10,
                            type: 4,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        break;
                    case 9:
                        if ((options.fromBox || options.forceDone) && (options.onDone && options.onDone.apply(window, answer), options.fromBox)) break;
                        options._box = showFastBox({
                            title: trim(answer[0])
                        }, answer[1]);
                        var _newOptions5 = extend(clone(options), {
                            showProgress: options._box.showProgress,
                            hideProgress: options._box.hideProgress
                        });
                        options.cache && (_newOptions5.cache = -1), options._box = requestBox(options._box, function(e) {
                            isVisible(options._box.progress) || (e || (e = {
                                _votes_ok: 1
                            }), ajax._post(url, extend(query, e), _newOptions5))
                        }, options.onFail), options._box.evalBox(answer[2]);
                        break;
                    case 10:
                        options._box = showFastBox({
                            title: answer[0] || getLang("global_charged_zone_title"),
                            onHide: options.onFail
                        }, answer[1], getLang("global_charged_zone_continue"), function() {
                            var e = extend(query, {
                                charged_confirm: answer[3]
                            });
                            ajax._post(url, e, options)
                        }, getLang("global_cancel"));
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
                options.bench && (ajax.tDone = (new Date).getTime()), e = e.replace(/^<!--/, "").replace(/-<>-(!?)>/g, "--$1>"), trim(e).length || (t = [8, getLang("global_unknown_error")], e = stVersions.nav + "<!><!>" + vk.lang + "<!>" + stVersions.lang + "<!>8<!>" + t[1]);
                var o = e.split("<!>"),
                    n = clone(o);
                each(n, function(e, t) {
                    return n[e] = t.substr(0, 100)
                }), ajax.lastResp = n.join("<!>");
                var i = intval(o.shift());
                if (!i) return fail("<pre>" + e + "</pre>", {
                    status: -1
                });
                if (vk.version && vk.version !== i) i && o.length > 4 ? nav.reload({
                    force: !0,
                    from: 2,
                    url: url,
                    query: query && ajx2q(query)
                }) : nav.strLoc ? location.replace(locBase) : topError("Server error.", {
                    type: 100
                });
                else {
                    vk.version = !1;
                    var r = o.shift(),
                        a = intval(o.shift()),
                        s = intval(o.shift());
                    options.frame && (o = t);
                    var c = intval(o.shift());
                    if (vk.lang !== a && options.canReload) nav.reload({
                        force: !0,
                        from: 3,
                        url: url,
                        query: query && ajx2q(query)
                    });
                    else {
                        var l = function() {
                            var e = ["common.css"];
                            if (r)
                                for (var t = 0, n = (r = r.split(",")).length; t < n; ++t) e.push(r[t]);
                            if (stVersions.lang < s)
                                for (var i in stVersions.lang = s, StaticFiles) /^lang\d/i.test(i) && e.push(i);
                            if (!options.frame) try {
                                ajax._parseRes(o, options._reqid)
                            } catch (e) {
                                topError("<b>JSON Error:</b> " + e.message, {
                                    type: 5,
                                    answer: o.join("<!>"),
                                    url: url,
                                    query: query && ajx2q(query)
                                })
                            }
                            stManager.add(e, _processResponse.pbind(c, o))
                        };
                        if (window.stVersions) {
                            if (i === stVersions.nav) return l();
                            headNode.appendChild(ce("script", {
                                type: "text/javascript",
                                src: "/js/loader_nav" + i + "_" + vk.lang + ".js"
                            })), setTimeout(function e() {
                                if (i === stVersions.nav) return l();
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
                if (answer = window.globalAjaxCache[cacheKey]) return -1 == answer || isFunction(answer) ? window.globalAjaxCache[cacheKey] = options.onDone : options.onDone.apply(window, answer), void(options.hideProgress && options.hideProgress())
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
    window.ajax = ajax, window.ajx2q = ajx2q, window.q2ajx = q2ajx, window.requestBox = requestBox, window.activateMobileBox = activateMobileBox, window.validateMobileBox = validateMobileBox, window.validatePassBox = validatePassBox, window.photoCaptchaBox = photoCaptchaBox
}, function(e, t, o) {
    var n = o(111),
        i = o(116),
        r = o(69),
        a = Object.defineProperty;
    t.f = o(3) ? Object.defineProperty : function(e, t, o) {
        if (n(e), t = r(t, !0), n(o), i) try {
            return a(e, t, o)
        } catch (e) {}
        if ("get" in o || "set" in o) throw TypeError("Accessors not supported!");
        return "value" in o && (e[t] = o.value), e
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "HistoryAndBookmarks", function() {
        return s
    });
    var n = o(11),
        i = o(95),
        r = o(47),
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
        }();

    function s(e) {
        var t = function(e) {
                var t = e.split("#"),
                    o = a(t, 2),
                    n = o[0],
                    i = o[1],
                    s = n.split("?"),
                    c = a(s, 2),
                    l = c[0],
                    d = c[1];
                return l + (d ? "?" + Object(r.ajx2q)(Object(r.q2ajx)(d)) : "") + (i ? "#" + i : "")
            },
            o = Object(i.extend)({
                onLocChange: function() {}
            }, e),
            s = function() {
                var e = "";
                return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), t(e.replace(/^(\/|!)/, ""))
            },
            c = s(),
            l = function(e) {
                var t = s();
                t === c && !0 !== e || (o.onLocChange(t), c = t)
            },
            d = void 0;
        return {
            setLoc: function(e) {
                c = t(e);
                var o = (location.toString().match(/#(.*)/) || {})[1] || "";
                if (!o && vk.al > 1 && (o = (location.pathname || "") + (location.search || "")), (o = (o = t(o)).replace(/^(\/|!)/, "")) !== c) {
                    if (3 == vk.al) try {
                        return window.saveScrollTopOnBack && (delete window.saveScrollTopOnBack, history.replaceState({
                            scrollTop: window.lastScrollTop,
                            preventScroll: window.preventLocationScroll
                        }, "", "/" + o), window.preventLocationScroll && delete window.preventLocationScroll), void history.pushState({}, "", "/" + c)
                    } catch (e) {}
                    window.chHashFlag = !0, location.hash = "#" + vk.navPrefix + c
                }
            },
            getLoc: s,
            init: function() {
                1 == vk.al && l(!0), 3 == vk.al ? (Object(n.addEvent)(window, "popstate", l), browser.safari && Object(n.addEvent)(window, "hashchange", l)) : "onhashchange" in window ? Object(n.addEvent)(window, "hashchange", function() {
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
    }
    window.HistoryAndBookmarks = s
}, function(e, t, o) {
    var n = o(89),
        i = Math.max,
        r = Math.min;
    e.exports = function(e, t) {
        return (e = n(e)) < 0 ? i(e + t, 0) : r(e, t)
    }
}, function(e, t, o) {
    var n = o(79)("iterator"),
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
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "browser", function() {
        return r
    }), o.d(t, "mobPlatforms", function() {
        return a
    }), o.d(t, "browserFeatures", function() {
        return s
    });
    var n = o(109),
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
    window.browser = r, window.mobPlatforms = a, window.browserFeatures = s
}, function(e, t, o) {
    for (var n = o(108), i = o(30), r = o(59), a = o(60), s = o(25), c = o(79), l = c("iterator"), d = c("toStringTag"), _ = s.Array, u = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], p = 0; p < 5; p++) {
        var f, h = u[p],
            w = r[h],
            v = w && w.prototype;
        if (v)
            for (f in v[l] || a(v, l, _), v[d] || a(v, d, h), s[h] = _, n) v[f] || i(v, f, n[f], !0)
    }
}, function(e, t, o) {
    'eat script';
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
    'eat script';
    o.r(t), o.d(t, "updateNarrow", function() {
        return d
    }), o.d(t, "checkPageBlocks", function() {
        return _
    }), o.d(t, "redraw", function() {
        return u
    }), o.d(t, "onBodyScroll", function() {
        return p
    }), o.d(t, "onBodyResize", function() {
        return f
    }), o.d(t, "leftBlockOver", function() {
        return h
    }), o.d(t, "leftBlockOut", function() {
        return w
    }), o.d(t, "leftBlockHide", function() {
        return v
    });
    var n = o(95),
        i = o(109),
        r = o(119),
        a = o(99),
        s = o(6),
        c = o(63),
        l = o(43);

    function d() {
        cur.__narrowBar = cur.__narrowBar || {}, cur.__narrowBar.bar = cur.__narrowBar.bar || Object(i.ge)("narrow_column"), cur.__narrowBar.barBlock = cur.__narrowBar.bar && Object(i.geByClass1)("page_block", cur.__narrowBar.bar), cur.__narrowBar.wideCol = cur.__narrowBar.wideCol || Object(i.ge)("wide_column"), cur.__narrowBar.isBarFixed = cur.__narrowBar.isBarFixed || "fixed" === Object(i.getStyle)(cur.__narrowBar.bar, "position"), cur.__narrowBar.pl = cur.__narrowBar.pl || Object(i.ge)("page_layout");
        var e = cur.__narrowBar.bar,
            t = cur.__narrowBar.barBlock,
            o = cur.__narrowBar.wideCol,
            a = Object(r.scrollGetY)();
        if (!browser.mobile && e && t && o && !Object(i.isVisible)(boxLoader) && !Object(i.isVisible)(boxLayerBG) && !Object(i.isVisible)(layerBG)) {
            var s = window.lastWindowHeight || 0,
                c = Math.min(a, bodyNode.clientHeight - s),
                l = cur.__narrowBar.pl,
                d = vk.staticheader ? Math.max(0, getPageHeaderHeight() - c) : getPageHeaderHeight(),
                _ = cur.__narrowBar.isBarFixed,
                u = Object(n.floatval)(Object(i.getStyle)(cur.__narrowBar.barBlock, "marginTop")),
                p = Object(i.getSize)(e)[1] - (_ ? u : 0),
                f = Object(i.getSize)(o)[1],
                h = Object(i.getXY)(o)[1],
                w = p >= f - u,
                v = u,
                b = c + s - f - h - v,
                g = Math.max(0, b),
                m = h - d,
                y = Object(i.getXY)(e)[1] + (_ ? u : 0),
                O = cur.__narrowBar.lastSt || 0,
                E = cur.__narrowBar.lastStyles || {},
                k = d + v + p + u + g <= s && !cur.narrowHide,
                x = !1,
                C = void 0;
            c - 1 < m && !(k && browser.msie && y < d + u) || w ? C = {
                    marginTop: 0
                } : c - 1 < Math.min(O, y - d - u) || k ? (C = {
                    top: d,
                    marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - Object(i.getSize)(l)[0]))
                }, x = !0) : c + 1 > Math.max(O, y + p + v - s) && b < 0 && !cur.narrowHide || cur.narrowHide && c + 1 > Math.max(O, y + p - d) ? (C = {
                    bottom: cur.narrowHide ? s - d : v,
                    marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - Object(i.getSize)(l)[0]))
                }, x = !0) : C = {
                    marginTop: b >= 0 ? f - p : Math.min(y - h, f - p + m)
                },
                function(e, t) {
                    var o = clone(e),
                        i = clone(t);
                    return Object(n.each)(o, function(e, t) {
                        "position" !== e && (o[e] = Math.round(t))
                    }), Object(n.each)(i, function(e, t) {
                        "position" !== e && (i[e] = Math.round(t))
                    }), JSON.stringify(o) === JSON.stringify(i)
                }(C, E) || (Object(n.each)(E, function(e) {
                    E[e] = null
                }), Object(i.setStyle)(e, extend(E, C)), cur.__narrowBar.lastStyles = C), x !== _ && Object(i.toggleClass)(e, "fixed", x), cur.__narrowBar.lastSt = c, cur.__narrowBar.isBarFixed = x
        }
    }

    function _() {
        var e = Object(i.ge)("content");
        e && (Object(i.toggleClass)(e, "page_block", !Object(i.geByClass1)("page_block", e)), window.updateAriaElements())
    }

    function u(e, t) {
        e && "fixed" === Object(i.getStyle)(e, "position") && (t ? removeClass(e, t) : Object(i.setStyle)(e, {
            position: "relative"
        }), e.offsetLeft, t ? addClass(e, t) : Object(i.setStyle)(e, {
            position: "fixed"
        }))
    }

    function p() {
        if (window.pageNode) {
            var e = Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - Object(i.getSize)(Object(i.ge)("page_layout"))[0]));
            browser.mobile || vk.staticheader || Object(a.updateHeaderStyles)({
                marginLeft: e
            }), Object(a.updateLeftMenu)(), d(), Object(s.updSideTopLink)()
        }
    }

    function f(e) {
        if (window.pageNode) {
            var t = document.documentElement,
                o = t.clientWidth,
                r = t.clientHeight,
                l = Object(s.sbWidth)(),
                _ = Math.max(Object(n.intval)(window.innerWidth), Object(n.intval)(o)),
                p = Math.max(Object(n.intval)(window.innerHeight), Object(n.intval)(r)),
                f = !1;
            if (browser.mobile && (_ = Math.max(_, Object(n.intval)(bodyNode.scrollWidth)), p = Math.max(p, Object(n.intval)(bodyNode.scrollHeight))), window.lastWindowWidth !== _ || !0 === e) {
                f = !0, window.lastInnerWidth = window.lastWindowWidth = _, layerWrap.style.width = boxLayerWrap.style.width = _ + "px";
                var h = layer.style.width = boxLayer.style.width = _ - l - 2 + "px";
                if (window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.width = _ + "px", mvLayer.style.width = h), window.wkLayerWrap && (wkLayerWrap.style.width = _ + "px", wkLayer.style.width = h), bodyNode.offsetWidth < vk.width + l + 2 && (_ = vk.width + l + 2), _)
                    for (var w = pageNode.firstChild; w; w = w.nextSibling)
                        if (w.tagName) {
                            for (var v = (window.lastInnerWidth = _ - l - 1) - 1, b = w.firstChild; b; b = b.nextSibling) "scroll_fix" === b.className && (b.style.width = v + "px");
                            vk.staticheader || Object(a.updateHeaderStyles)({
                                width: v
                            })
                        }
            }
            if ((window.lastWindowHeight !== p || !0 === e) && (f = !0, window.lastWindowHeight = p, layerBG.style.height = boxLayerBG.style.height = layerWrap.style.height = boxLayerWrap.style.height = p + "px", window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.height = p + "px"), window.wkLayerWrap)) {
                var g = browser.mobile ? window.innerHeight : p;
                wkLayerWrap.style.height = g + "px"
            }
            if (vk.noSideTop || Object(s.updSideTopLink)(1), f && window.curRBox && window.curRBox.boxes && window.getWndInner) {
                var m = getWndInner();
                Object(n.each)(curRBox.boxes, function(e, t) {
                    return t._wnd_resize(m[0], m[1])
                })
            }
            setTimeout(c.updSeenAdsInfo, 0);
            var y = getAudioPlayer();
            y.audioLayer && y.audioLayer.isShown() && y.audioLayer.updatePosition(), cur.pvShown && window.Photoview && setTimeout(Photoview.updatePhotoDimensions), window.tooltips && tooltips.rePositionAll(), cur.lSTL && Object(i.setStyle)(cur.lSTL, {
                width: Math.max(Object(i.getXY)(cur.lSTL.el)[0], 0),
                height: p - 1
            }), Object(i.ge)("dev_top_nav") && Object(i.setStyle)(Object(i.ge)("dev_top_nav", "left", null));
            var O = Object(i.geByClass)("ui_search_fixed"),
                E = Object(i.ge)("narrow_column");
            Object(n.each)(O, function() {
                u(this, "ui_search_fixed"), setTimeout(u.pbind(this, "ui_search_fixed"), 0)
            }), E && (u(E, "fixed"), setTimeout(u.pbind(E, "fixed"), 0)), Object(a.updateLeftMenu)(), d(), Object(a.updateSTL)()
        }
    }

    function h(e) {
        var t = 1;
        e.id || (e = Object(i.ge)("left_hide" + e), t = 0), !t && e.timer || (e.showing ? Object(i.removeAttr)(e, "showing") : (Object(l.animate)(e, {
            opacity: t ? 1 : .5
        }, 200), t && (e.showing = 1))), e.timer && (clearTimeout(e.timer), Object(i.removeAttr)(e, "timer"))
    }

    function w(e) {
        var t = .5;
        e.id || (e = Object(i.ge)("left_hide" + e), t = 0), e.timer = setTimeout(function() {
            Object(l.animate)(e, {
                opacity: t
            }, 200), Object(i.removeAttr)(e, "timer")
        }, 1)
    }

    function v(e, t, o) {
        var n = {
            act: "hide_block",
            block: e,
            hash: t
        };
        o && (n.block = o), ajax.post("al_index.php", n, {
            onDone: c.updSeenAdsInfo
        }), hide("left_block" + e)
    }
}, function(e, t, o) {
    'eat script';

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
    })
}, function(e, t, o) {
    var n = o(120),
        i = o(42),
        r = o(50);
    e.exports = function(e) {
        return function(t, o, a) {
            var s, c = n(t),
                l = i(c.length),
                d = r(a, l);
            if (e && o != o) {
                for (; l > d;)
                    if ((s = c[d++]) != s) return !0
            } else
                for (; l > d; d++)
                    if ((e || d in c) && c[d] === o) return e || d;
            return !e && -1
        }
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "boxQueue", function() {
        return a
    }), o.d(t, "curBox", function() {
        return s
    }), o.d(t, "initBoxQueue", function() {
        return c
    }), o.d(t, "boxRefreshCoords", function() {
        return l
    });
    var n = o(11),
        i = o(95),
        r = o(109),
        a = {
            hideAll: function(e, t) {
                if (e)
                    for (; a.count();) a.hideLast();
                else {
                    if (a.count()) {
                        var o = _message_boxes[a._boxes.pop()];
                        o._in_queue = !1, o._hide(!1, !1, t)
                    }
                    for (; a.count();) {
                        _message_boxes[a._boxes.pop()]._in_queue = !1
                    }
                }
            },
            hideLast: function(e, t) {
                if (a.count()) {
                    var o = window._message_boxes[a._boxes[a.count() - 1]];
                    if (!0 === e && (o.changed || a.skip || t && t.target && t.target.tagName && "input" !== t.target.tagName.toLowerCase() && cur.__mdEvent && t.target !== cur.__mdEvent.target)) return void(a.skip = !1);
                    o.hide()
                }
                if (t && "click" === t.type) return Object(n.cancelEvent)(t)
            },
            hideBGClick: function(e) {
                e && e.target && /^box_layer/.test(e.target.id) && a.hideLast()
            },
            count: function() {
                return a._boxes.length
            },
            _show: function(e) {
                var t = _message_boxes[e];
                if (t && !t._in_queue) {
                    a.count() ? _message_boxes[a._boxes[a.count() - 1]]._hide(!0, !0) : window.tooltips && tooltips.hideAll(), t._in_queue = !0;
                    var o = !!a.count();
                    a.curBox = e, t._show(o || a.currHiding, o), a._boxes.push(e)
                }
            },
            _hide: function(e) {
                var t = _message_boxes[e];
                if (t && t._in_queue && a._boxes[a.count() - 1] === e && t.isVisible() && (t._in_queue = !1, a._boxes.pop(), t._hide(!!a.count()), a.count())) {
                    var o = a._boxes[a.count() - 1];
                    a.curBox = o, _message_boxes[o]._show(!0, !0, !0)
                }
            },
            _boxes: [],
            curBox: 0
        };

    function s() {
        var e = window._message_boxes[a.curBox];
        return e && e.isVisible() ? e : null
    }

    function c() {
        a.hideLastCheck = a.hideLast.pbind(!0), window._message_box_guid = 0, window._message_boxes = []
    }

    function l(e) {
        var t = window.innerHeight || document.documentElement.clientHeight || boxLayerBG.offsetHeight,
            o = browser.mobile ? Object(i.intval)(window.pageYOffset) : 0,
            n = Object(r.getSize)(e);
        e.style.marginTop = Math.max(10, o + (t - n[1]) / 3) + "px"
    }
}, function(e, t) {
    var o = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = o)
}, function(e, t, o) {
    var n = o(48),
        i = o(68);
    e.exports = o(3) ? function(e, t, o) {
        return n.f(e, t, i(1, o))
    } : function(e, t, o) {
        return e[t] = o, e
    }
}, function(e, t, o) {
    'eat script';
    var n = o(48).f,
        i = o(103),
        r = (o(60), o(64)),
        a = o(33),
        s = o(19),
        c = o(22),
        l = o(9),
        d = o(15),
        _ = o(67),
        u = o(37),
        p = o(3),
        f = o(32).fastKey,
        h = p ? "_s" : "size",
        w = function(e, t) {
            var o, n = f(t);
            if ("F" !== n) return e._i[n];
            for (o = e._f; o; o = o.n)
                if (o.k == t) return o
        };
    e.exports = {
        getConstructor: function(e, t, o, d) {
            var _ = e(function(e, n) {
                s(e, _, t, "_i"), e._i = i(null), e._f = void 0, e._l = void 0, e[h] = 0, void 0 != n && l(n, o, e[d], e)
            });
            return r(_.prototype, {
                clear: function() {
                    for (var e = this._i, t = this._f; t; t = t.n) t.r = !0, t.p && (t.p = t.p.n = void 0), delete e[t.i];
                    this._f = this._l = void 0, this[h] = 0
                },
                delete: function(e) {
                    var t = w(this, e);
                    if (t) {
                        var o = t.n,
                            n = t.p;
                        delete this._i[t.i], t.r = !0, n && (n.n = o), o && (o.p = n), this._f == t && (this._f = o), this._l == t && (this._l = n), this[h]--
                    }
                    return !!t
                },
                forEach: function(e) {
                    s(this, _, "forEach");
                    for (var t, o = a(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                        for (o(t.v, t.k, this); t && t.r;) t = t.p
                },
                has: function(e) {
                    return !!w(this, e)
                }
            }), p && n(_.prototype, "size", {
                get: function() {
                    return c(this[h])
                }
            }), _
        },
        def: function(e, t, o) {
            var n, i, r = w(e, t);
            return r ? r.v = o : (e._l = r = {
                i: i = f(t, !0),
                k: t,
                v: o,
                p: n = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = r), n && (n.n = r), e[h]++, "F" !== i && (e._i[i] = r)), e
        },
        getEntry: w,
        setStrong: function(e, t, o) {
            d(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this._k, t = this._l; t && t.r;) t = t.p;
                return this._t && (this._l = t = t ? t.n : this._t._f) ? _(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = void 0, _(1))
            }, o ? "entries" : "values", !o, !0), u(t)
        }
    }
}, function(e, t, o) {
    var n = o(100),
        i = o(111),
        r = function(e, t) {
            if (i(e), !n(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, n) {
            try {
                (n = o(33)(Function.call, o(83).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
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
    'eat script';
    o.r(t), o.d(t, "updSeenAdsInfo", function() {
        return a
    }), o.d(t, "__adsGetAjaxParams", function() {
        return s
    }), o.d(t, "__adsUpdate", function() {
        return c
    }), o.d(t, "__adsSet", function() {
        return l
    }), o.d(t, "__adsUpdateExternalStats", function() {
        return d
    });
    var n = o(104),
        i = o(95),
        r = o(109);

    function a() {
        if ((Object(r.getXY)("ads_left", !0) || {})[1] && vk.id) {
            var e = Object(r.getXYRect)(Object(r.geByTag1)("ol", Object(r.ge)("side_bar_inner")), !0),
                t = e ? e.height : 0,
                o = Object(r.getXYRect)(Object(r.ge)("left_blocks"), !0),
                a = o ? o.height : 0,
                s = Math.max(Math.floor(((window.lastWindowHeight || 0) - t - a - 42 - 10) / 260), 0);
            __seenAds = Object(i.intval)(Object(n.getCookie)("remixseenads")), __seenAds !== s && (__seenAds = s, Object(n.setCookie)("remixseenads", s, 30))
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

    function l(e, t, o, n, i, r) {
        if (window.noAdsAtAll) return !1;
        l = function() {
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
        }, stManager.add(["aes_light.js"], l.pbind(e, t, o, n, i, r))
    }

    function d(e) {
        if (window.noAdsAtAll) return !1;
        d = function() {
            window.AdsLight && AdsLight.updateExternalStats.apply(AdsLight.updateExternalStats, arguments)
        }, stManager.add(["aes_light.js"], d.pbind(e))
    }
    window.__seenAds = Object(i.intval)(Object(n.getCookie)("remixseenads")), window.__adsLoaded = Object(i.vkNow)(), window.__adsGetAjaxParams = s, window.__adsUpdate = c, window.__adsSet = l, window.__adsUpdateExternalStats = d
}, function(e, t, o) {
    var n = o(30);
    e.exports = function(e, t, o) {
        for (var i in t) n(e, i, t[i], o);
        return e
    }
}, function(e, t, o) {
    o(94), o(118), o(53), o(93), e.exports = o(84).Set
}, function(e, t, o) {
    e.exports = o(59).document && document.documentElement
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t, o) {
    var n = o(100);
    e.exports = function(e, t) {
        if (!n(e)) return e;
        var o, i;
        if (t && "function" == typeof(o = e.toString) && !n(i = o.call(e))) return i;
        if ("function" == typeof(o = e.valueOf) && !n(i = o.call(e))) return i;
        if (!t && "function" == typeof(o = e.toString) && !n(i = o.call(e))) return i;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "statlogsValueEvent", function() {
        return a
    });
    var n = o(104),
        i = o(95),
        r = o(23);

    function a(e, t, o, a, s) {
        if (void 0 !== e && void 0 !== t) {
            var c = Array.from(arguments).slice(2, 5),
                l = void 0;
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
                    l = (l = JSON.parse(Object(n.getCookie)("remixsts"))).data
                } catch (e) {
                    l = []
                }
                for (l.push([Math.round(Date.now() / 1e3), e, t].concat(c)); l.length > 100;) l.shift();
                var o = Math.round(Object(i.rand)(0, 1e9));
                Object(n.setCookie)("remixsts", JSON.stringify({
                    data: l,
                    uniqueId: o
                }), .01)
            })
        }
    }
    window.statlogsValueEvent = a
}, function(e, t, o) {
    'eat script';
    o.r(t), Array.from || (Array.from = function(e) {
        return [].slice.call(e)
    })
}, function(e, t, o) {
    var n = o(8);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == n(e) ? e.split("") : Object(e)
    }
}, function(e, t) {
    e.exports = !1
}, function(e, t, o) {
    var n = o(59),
        i = o(84),
        r = o(60),
        a = o(30),
        s = o(33),
        c = function(e, t, o) {
            var l, d, _, u, p = e & c.F,
                f = e & c.G,
                h = e & c.S,
                w = e & c.P,
                v = e & c.B,
                b = f ? n : h ? n[t] || (n[t] = {}) : (n[t] || {}).prototype,
                g = f ? i : i[t] || (i[t] = {}),
                m = g.prototype || (g.prototype = {});
            for (l in f && (o = t), o) _ = ((d = !p && b && void 0 !== b[l]) ? b : o)[l], u = v && d ? s(_, n) : w && "function" == typeof _ ? s(Function.call, _) : _, b && a(b, l, _, e & c.U), g[l] != _ && r(g, l, u), w && m[l] != _ && (m[l] = _)
        };
    n.core = i, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
}, function(e, t, o) {
    var n = o(8),
        i = o(79)("toStringTag"),
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
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
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
    var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6),
        _debug_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
        _dom_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11),
        _ui_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28),
        _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(109),
        _fx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(43),
        _utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(95);

    function MessageBox(_options) {
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
            },
            options = extend(defaults, _options),
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
                innerHTML: '\n<div class="box_layout" onclick="__bq.skip=true;">\n<div class="box_title_wrap">\n  <div class="box_x_button" aria-label="' + getLang("global_close") + '" tabindex="0" role="button"></div>\n  <div class="box_title_controls"></div>\n  <div class="box_title"></div>\n</div>\n<div class="box_body" style="' + options.bodyStyle + '"></div>\n<div class="box_controls_wrap" ' + controlsStyle + '><div class="box_controls">\n<table cellspacing="0" cellpadding="0" class="fl_r"><tr></tr></table>\n<div class="progress" id="' + options.progress + '"></div>\n<div class="box_controls_text _box_controls_text">' + (options.textControls || "") + "</div>\n</div></div>\n</div>"
            }, {
                display: "none"
            });
        hide(boxContainer);
        var boxLayout = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxContainer),
            boxTitleWrap = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxLayout),
            boxCloseButton = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxTitleWrap),
            boxTitle = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domLC)(boxTitleWrap),
            boxTitleControls = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxCloseButton);
        options.noCloseButton && hide(boxCloseButton);
        var boxBody = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxTitleWrap),
            boxControlsWrap = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxBody),
            boxControls = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxControlsWrap),
            boxButtons = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domFC)(boxControls),
            boxProgress = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxButtons),
            boxControlsText = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.domNS)(boxProgress);
        boxLayer.appendChild(boxContainer), boxContainer.setAttribute("tabindex", 0), boxContainer.focus(), refreshBox(), boxRefreshCoords(boxContainer);
        var emitter = new EventEmitter;

        function refreshBox() {
            boxTitleBck || (options.title ? (boxTitle.innerHTML = options.title, removeClass(boxBody, "box_no_title"), show(boxTitleWrap)) : (addClass(boxBody, "box_no_title"), hide(boxTitleWrap))), options.titleControls && (boxTitleControls.innerHTML = options.titleControls), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(boxBody, "box_no_buttons", options.hideButtons), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.toggleClass)(boxTitleWrap, "box_grey", options.grey), boxContainer.style.width = "string" == typeof options.width ? options.width : options.width + "px", boxContainer.style.height = "string" == typeof options.height ? options.height : options.height + "px"
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
                    options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(document, "click", __bq.hideBGClick), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onBeforeHide) && options.onBeforeHide(), _layerAnim && !e && layers.boxhide();
                    var i = function() {
                        __bq.currHiding === _message_boxes[guid] && (__bq.currHiding = !1), _layerAnim || _message_boxes[guid].shOther || e || layers.boxhide(), !t && options.selfDestruct ? destroyMe() : hide(boxContainer), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onHide) && options.onHide(o)
                    };
                    n > 0 ? (__bq.currHiding = _message_boxes[guid], Object(_fx__WEBPACK_IMPORTED_MODULE_5__.fadeOut)(boxContainer, n, i)) : i()
                }
            };

        function showMe(e, t, o) {
            if (!visible && window._message_boxes[guid]) {
                visible = !0;
                var n = !0 === e || t ? 0 : options.animSpeed;
                if (options.hideOnBGClick && addEvent(document, "click", __bq.hideBGClick), t || layers.boxshow(), __bq.currHiding) {
                    __bq.currHiding.shOther = !0;
                    var i = __bq.currHiding.bodyNode.parentNode.parentNode;
                    Object(_dom__WEBPACK_IMPORTED_MODULE_4__.data)(i, "tween").stop(!0)
                }
                n > 0 ? fadeIn(boxContainer, n) : show(boxContainer), boxRefreshCoords(boxContainer), options.onShow && options.onShow(o)
            }
        }
        addEvent(boxCloseButton, "click", __bq.hideLast);
        var retBox = window._message_boxes[guid] = {
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
                return !(Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onHideAttempt) && !options.onHideAttempt(e)) && (__bq._hide(guid), !0)
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
                var r = _addButton(e, t || this.hide, o, i);
                return n ? r : this
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
            updateBoxCoords: function() {
                boxRefreshCoords(boxContainer)
            },
            setOptions: function(e) {
                if (options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(document, "click", __bq.hideBGClick), options = extend(options, e), "bodyStyle" in e)
                    for (var t = options.bodyStyle.split(";"), o = 0, n = t.length; o < n; o++) {
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
                    var _fn = eval(scr);
                    _fn.apply(this, [url, params])
                } catch (e) {
                    Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.topError)(e, {
                        dt: 15,
                        type: 7,
                        url: url,
                        query: params ? ajx2q(params) : void 0,
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
                        if (__debugMode) l();
                        else try {
                            l()
                        } catch (o) {
                            Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.topError)(o, {
                                dt: 15,
                                type: 103,
                                url: e,
                                query: ajx2q(t),
                                answer: Array.prototype.slice.call(arguments).join("<!>")
                            }), r.isVisible() && r.hide()
                        } else o.onDone && o.onDone(r, c);

                    function l() {
                        show(boxLayerBG), addClass(bodyNode, "layers_shown"), r.setOptions({
                            title: n,
                            hideButtons: i.hideButtons || !1
                        }), o.showProgress ? r.show() : show(r.bodyNode), r.content(a), r.evalBox(s, e, t), o.onDone && o.onDone(r, c)
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
        }), o.hideProgress = hide.pbind("global_prg")), o.showProgress ? extend(a, {
            showProgress: o.showProgress,
            hideProgress: o.hideProgress
        }) : (r.setOptions({
            title: !1,
            hideButtons: !0
        }).show(), __bq.count() < 2 && (hide(boxLayerBG), removeClass(bodyNode, "layers_shown")), hide(r.bodyNode), a.showProgress = function() {
            show(boxLoader), boxRefreshCoords(boxLoader)
        }, a.hideProgress = hide.pbind(boxLoader)), r.removeButtons().addButton(getLang("global_close")), ajax.post(e, t, a), r
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
                    if (trim(i.value) || !0 === t) {
                        var r = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", o.bodyNode)[0];
                        Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(i), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(r), show(geByClass1("progress", o.bodyNode)), hide(i), n.onSubmit(e, i.value)
                    } else Object(_dom__WEBPACK_IMPORTED_MODULE_4__.elfocus)(i)
                }
            },
            r = !!o,
            a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.intval)(t) ? "" : "&s=1",
            s = n.imgSrc || "/captcha.php?sid=" + e + a;
        if (!r) {
            var c = '\n<div class="captcha">\n  <div><img src="' + s + '"/></div>\n  <div>\n    <input type="text" class="big_text" maxlength="7" placeholder="' + getLang("global_captcha_input_here") + '" />\n    <div class="progress" /></div>\n  </div>\n</div>' + (n.addText || "");
            o = showFastBox({
                title: getLang("captcha_enter_code"),
                width: 305,
                onHide: n.onHide,
                onDestroy: n.onDestroy || !1
            }, c, getLang("captcha_send"), function() {
                o.submit()
            }, getLang("captcha_cancel"), function() {
                var e = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", o.bodyNode),
                    t = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", o.bodyNode);
                Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(e), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(t), o.hide()
            })
        }
        o.submit = i.pbind(!0), o.changed = !0;
        var l = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", o.bodyNode),
            d = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", o.bodyNode);
        return r && (l.value = "", d.src = "/captcha.php?sid=" + e + a, hide(geByClass1("progress", o.bodyNode))), show(l), addEvent(l, "keypress", i), addEvent(d, "click", function() {
            this.src = "/captcha.php?sid=" + e + a + "&v=" + irand(1e6, 2e6)
        }), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.elfocus)(l), o
    }

    function showReCaptchaBox(e, t, o, n) {
        window.recaptchaResponse = function(e) {
            n.onSubmit(e)
        };
        var i = !!o,
            r = !!window.grecaptcha;
        if (!i) {
            r || (window.recaptchaCallback = function() {
                var t = curBox();
                if (t) {
                    var o = geByClass1("recaptcha", t.bodyNode);
                    o && (val(o, ""), window.grecaptcha.render(o, {
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
                title: getLang("global_recaptcha_title"),
                width: 354,
                onHide: n.onHide,
                onDestroy: n.onDestroy || !1
            }, a, getLang("captcha_cancel"));
            var s = geByClass1("recaptcha", o.bodyNode);
            s.id = "recaptcha" + (o.guid ? o.guid : "0"), showProgress(s)
        }
        return i && r ? window.grecaptcha.reset() : r && window.recaptchaCallback(), o.changed = !0, o
    }
}, function(e, t, o) {
    'eat script';

    function n(e, t) {
        var o = t.timeout,
            n = t.onLoad,
            i = t.onError,
            r = document.createElement("script");
        r.addEventListener("load", s), r.addEventListener("readystatechange", s), r.addEventListener("error", c), r.src = e, document.head.appendChild(r);
        var a = void 0;

        function s(e) {
            r.readyState && "loaded" != r.readyState && "complete" != r.readyState || (l(), n && n())
        }

        function c(e) {
            l(), i && i()
        }

        function l() {
            clearTimeout(a), r.removeEventListener("load", s), r.removeEventListener("readystatechange", s), r.removeEventListener("error", c)
        }
        return o && (a = setTimeout(c, o)), {
            destroy: function() {
                l()
            }
        }
    }
    o.r(t), o.d(t, "loadScript", function() {
        return n
    }), window.loadScript = n
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = o(39),
        i = o(109),
        r = o(119),
        a = o(107),
        s = o(105),
        c = o(95);
    window._layerAnim = !1;
    var l = {
            sh: !_layerAnim || browser.msie || browser.iphone ? function(e, t) {
                Object(i.show)(e), Object(c.isFunction)(t) && t()
            } : function(e, t) {
                fadeIn(e, 200, t)
            },
            hd: !_layerAnim || browser.msie || browser.iphone ? function(e, t) {
                hide(e), Object(c.isFunction)(t) && t()
            } : function(e, t) {
                fadeOut(e, 200, t)
            },
            visible: !1,
            _show: function(e, t, o, s) {
                var c = "layers" + (__bq.count() + 1);
                cancelStackPush(c, function() {}), Object(i.setStyle)(e, {
                    opacity: o || "",
                    backgroundColor: s || ""
                }), l.visible || (Object(n.toggleFlash)(), Object(r.disableBodyScroll)()), l.visible || Object(a.pauseLastInlineVideo)(), l.visible = !0, addClass(bodyNode, "layers_shown"), t.visibilityHide ? removeClass(t, "box_layer_hidden") : Object(i.show)(t), l.sh(e), window.updateWndVScroll && updateWndVScroll()
            },
            _hide: function(e, t) {
                l.hd(e, function() {
                    var e = "layers" + (__bq.count() + 1);
                    cancelStackFilter(e), t && t.visibilityHide ? addClass(t, "box_layer_hidden") : hide(t), Object(i.isVisible)(layerWrap) || cur._inLayer || Object(i.isVisible)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(i.isVisible)(window.mvLayerWrap)) || Object(i.isVisible)(window.wkLayerWrap) || (l.visible = !1, removeClass(bodyNode, "layers_shown"), Object(n.toggleFlash)(!0), Object(r.enableBodyScroll)()), window.updateWndVScroll && updateWndVScroll()
                }), l.visible || Object(a.playLastInlineVideo)()
            }
        },
        d = {
            push: function(e) {
                var t = void 0,
                    o = !!d.count() && d._layers[d._layers.length - 1];
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
                    myLoc: wkcur.myLoc,
                    onHide: wkcur.onHide
                }];
                else {
                    if (!cur.storyLayer) return !1;
                    t = ["stories", cur.storyLayer.getList()]
                }
                return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || d._layers.push(t), d.skipVideo = !1, !0
            },
            noHistory: function() {
                for (var e = d._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
            },
            hide: function(e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return t.toString = function() {
                    return e.toString()
                }, t
            }(function() {
                d._bl = !0, window.WkView && l.fullhide == WkView.hide ? (hide(wkLayerWrap), clearTimeout(wkcur.showT)) : l.fullhide && l.fullhide(!0, !0), setTimeout(d.unblock, 5)
            }),
            unblock: function() {
                d._bl = !1
            },
            pop: function() {
                if (d.count() && !d._bl) {
                    var e = d._layers.pop();
                    if (d.skipVideo && (d.skipVideo = !1, "video" == e[0])) return d._layers.push(e), void(d.skipVideo = !1);
                    "photo" === e[0] ? (extend(e[3], {
                        fromQueue: !0
                    }), showPhoto(e[1], e[2], e[3], !1)) : "video" === e[0] ? (extend(e[3], {
                        fromQueue: !0
                    }), Object(a.showVideo)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? showWiki({
                        w: e[1]
                    }, !1, !1, e[3]) : "stories" === e[0] && Object(s.showStory)(e[1])
                }
            },
            back: function(e, t, o, n) {
                for (var i = d._layers, r = i.length; r > 0; --r)
                    if (i[r - 1][0] == e && i[r - 1][1] == t || i[r - 1][0] == o && i[r - 1][1] == n) return d._layers = i.slice(0, r), d.pop(), !0;
                return !1
            },
            count: function() {
                return d._layers.length
            },
            clear: function() {
                d._layers = []
            },
            _layers: []
        };
    window.layers = l, window.layerQueue = d
}, function(e, t, o) {
    var n = o(112)("wks"),
        i = o(41),
        r = o(59).Symbol,
        a = "function" == typeof r;
    e.exports = function(e) {
        return n[e] || (n[e] = a && r[e] || (a ? r : i)("Symbol." + e))
    }
}, function(e, t, o) {
    var n = o(106),
        i = o(120),
        r = o(57)(!1),
        a = o(117)("IE_PROTO");
    e.exports = function(e, t) {
        var o, s = i(e),
            c = 0,
            l = [];
        for (o in s) o != a && n(s, o) && l.push(o);
        for (; t.length > c;) n(s, o = t[c++]) && (~r(l, o) || l.push(o));
        return l
    }
}, function(e, t, o) {
    var n = o(48).f,
        i = o(106),
        r = o(79)("toStringTag");
    e.exports = function(e, t, o) {
        e && !i(e = o ? e : e.prototype, r) && n(e, r, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t, o) {
    var n = o(111);
    e.exports = function(e, t, o, i) {
        try {
            return i ? t(n(o)[0], o[1]) : t(o)
        } catch (t) {
            var r = e.return;
            throw void 0 !== r && n(r.call(e)), t
        }
    }
}, function(e, t, o) {
    var n = o(88),
        i = o(68),
        r = o(120),
        a = o(69),
        s = o(106),
        c = o(116),
        l = Object.getOwnPropertyDescriptor;
    t.f = o(3) ? l : function(e, t) {
        if (e = r(e), t = a(t, !0), c) try {
            return l(e, t)
        } catch (e) {}
        if (s(e, t)) return i(!n.f.call(e, t), e[t])
    }
}, function(e, t) {
    var o = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = o)
}, function(e, t, o) {
    var n;
    ! function(t) {
        'eat script';

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
    var n = o(106),
        i = o(2),
        r = o(117)("IE_PROTO"),
        a = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = i(e), n(e, r) ? e[r] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null
    }
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (e) {
            return !0
        }
    }
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(e, t) {
    var o = Math.ceil,
        n = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? n : o)(e)
    }
}, function(e, t, o) {
    var n = o(100),
        i = o(59).document,
        r = n(i) && n(i.createElement);
    e.exports = function(e) {
        return r ? i.createElement(e) : {}
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
    __webpack_require__.r(__webpack_exports__);
    var _top_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14),
        _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95),
        _ads__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(63),
        _debug_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0),
        _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(109),
        _dom_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11),
        _scroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(119),
        _ui_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(28),
        _ajax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(47),
        _nav_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(99),
        _layout_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(55),
        _video__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(107),
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
                    e.force ? (hab.stop(), location.href = "/" + t) : (TopNotifier.invalidate(), Nav.go("/" + t, void 0, extend({
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
                        if (_params && (opts.params = extend(opts.params || {}, Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.q2ajx)(_params))), loc = loc.href || "", ev && !(loc || "").match(new RegExp("^" + locProtocol + "//" + locHost, "i"))) return
                    }
                    var strLoc = "",
                        objLoc = {},
                        changed = {};
                    "string" == typeof loc ? (loc = loc.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), ""), strLoc = loc, objLoc = Nav.fromStr(loc)) : (loc[0] || (loc[0] = ""), strLoc = Nav.toStr(loc), objLoc = loc), statDurationsLoadImage(), statNavigationTiming();
                    var ap = getAudioPlayer();
                    if (ap && ap.updateCurrentPlaying && ap.updateCurrentPlaying(), !opts.nocur) {
                        for (var i in changed = clone(objLoc), Nav.objLoc) Nav.objLoc.hasOwnProperty(i) && (Nav.objLoc[i] === changed[i] ? delete changed[i] : void 0 === changed[i] && (changed[i] = !1));
                        if (!1 === zNav(clone(changed), {
                                hist: opts.hist,
                                asBox: opts.asBox,
                                onDone: opts.onDone
                            }, objLoc)) return Nav.setLoc(strLoc), !1;
                        var isHandled = articleNav(strLoc, Nav.toStr(Nav.objLoc), opts.back, opts.postId);
                        if (isHandled) return Nav.setLoc(strLoc), (Nav.objLoc.z || Nav.objLoc.w) && zNav({
                            z: Nav.objLoc.z,
                            w: Nav.objLoc.w
                        }, {}), !1
                    }
                    if (!opts.nocur && (vk.loaded || !changed[0]))
                        for (var curnav = cur.nav || [], _i = curnav.length - 1; _i >= 0; _i--) {
                            var oldUrl = document.URL;
                            if (!1 === curnav[_i](clone(changed), Nav.objLoc, objLoc, opts)) {
                                var currentURL = locProtocol + "//" + location.host + "/" + strLoc,
                                    referrer = oldUrl === currentURL ? "" : oldUrl;
                                return setTimeout(updateOtherCounters.pbind(currentURL, referrer), 10), !1
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
                                    return window.tooltips && tooltips.destroyAll(), hide("audio_tip_wrap"), processDestroy(cur), radioBtns = e.radioBtns, ajaxCache = e.ajaxCache, PageID = e.pid, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), showBackLink(), cur = e.cur, setTimeout(function() {
                                        if (t.innerHTML = "", t.parentNode.replaceChild(e.content, t), vk.width === e.width && vk.width_dec_footer === e.width_dec_footer || handlePageView(e), Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollToY)(e.scrollTop, 0), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.setDocumentTitle)(e.htitle), o.innerHTML = e.title, e.bodyClass !== bodyNode.className && (bodyNode.className = e.bodyClass || "", vk.body_class = e.bodyClass || ""), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.setStyle)(o.parentNode, "display", e.hideHeader ? "none" : "block"), cur._back.show)
                                            for (var i = 0, r = cur._back.show.length; i < r; i++) cur._back.show[i]();
                                        if (n)
                                            for (var a = 0, s = n.length; a < s; a++) n[a]();
                                        Nav.setLoc(strLoc);
                                        var c = e.back || {};
                                        setTimeout(function() {
                                            showBackLink(c[0], c[1], c[2]), (Nav.objLoc.z || Nav.objLoc.w) && zNav({
                                                z: Nav.objLoc.z,
                                                w: Nav.objLoc.w
                                            }, {}), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateSTL)(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateLeftMenu)(), updateAriaElements(), TopSearch.clear()
                                        }, 10), getAudioPlayer().updateCurrentPlaying()
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
                    opts.noframe || (opts.tstat = ajax.tGetParam(), ajax.tStart = (new Date).getTime(), opts.bench = !0), opts.params && opts.params._ref || (opts.params = extend(opts.params || {}, {
                        _ref: Nav.objLoc[0] || ""
                    })), where.files && stManager.add(where.files), where.params = extend({
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
                                    if ((strLoc === (cur._back || {}).loc || newPage || opts.back) && (_back = !1), (opts.noback || params.level && (!cur._level || params.level <= cur._level) && !1 !== opts.noback) && (_back = !1, (opts.noback || cur._level && params.level < cur._level) && showBackLink()), window.tooltips && tooltips.destroyAll(), Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass)("page_actions_wrap"), function(e, t) {
                                            return hide(t)
                                        }), hide("audio_tip_wrap"), _back) {
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
                                                back: !!_tbLink.loc && [_tbLink.loc, val(_tbLink), _tbLink.fast]
                                            }, tNode && tNode.parentNode && !Object(_dom__WEBPACK_IMPORTED_MODULE_4__.isVisible)(tNode.parentNode) && (hist.hideHeader = !0), globalHistoryDestroy(hist.loc), globalHistory.length > 2) {
                                            var h = globalHistory.shift();
                                            processDestroy(h.cur), h.content.innerHTML = ""
                                        }
                                        if (cur._back.hide)
                                            for (var _i5 = 0, _l3 = cur._back.hide.length; _i5 < _l3; _i5++) cur._back.hide[_i5]();
                                        _back.text && showBackLink(hist.loc, _back.text, 1)
                                    } else _tbLink && (_tbLink.fast = 0), processDestroy(cur);
                                    if (PageID = NextPageID, Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(radioBtns, function(e, t) {
                                            t.keep || delete radioBtns[e]
                                        }), ajaxCache = {}, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), cur = {
                                            destroy: [],
                                            nav: []
                                        }, window._stlWas = 0, newPage) {
                                        for (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.cleanElems)("quick_login_button", "quick_expire", "search_form", "top_links", "bottom_nav"); globalHistory.length;) {
                                            var _h = globalHistory.shift();
                                            processDestroy(_h.cur), _h.content.innerHTML = ""
                                        }
                                        var oldTopW = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("dev_top_nav_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getSize)("dev_top_nav_wrap")[0] || Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("page_header_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getSize)("page_header_wrap")[0] || 0;
                                        pageNode.innerHTML = html, oldTopW && !vk.staticheader && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateHeaderStyles)({
                                            width: oldTopW
                                        }), window._tbLink = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("top_back_link");
                                        try {
                                            _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
                                        } catch (e) {}
                                        browser.mobile || Object(_layout_utils__WEBPACK_IMPORTED_MODULE_10__.onBodyResize)(!0)
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
                                        var _oldTopW = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("dev_top_nav_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getSize)("dev_top_nav_wrap")[0] || Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ge)("page_header_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.getSize)("page_header_wrap")[0] || 0;
                                        wNode.innerHTML = html, _oldTopW && !vk.staticheader && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateHeaderStyles)({
                                            width: _oldTopW
                                        }), tNode.innerHTML = title, (title ? show : hide)(tNode.parentNode), getAudioPlayer().updateCurrentPlaying()
                                    }
                                    if (Object(_layout_utils__WEBPACK_IMPORTED_MODULE_10__.checkPageBlocks)(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateSTL)(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.updateLeftMenu)(), updateAriaElements(), TopSearch.clear(), window.LazyLoad && LazyLoad.scanDelayed(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.handlePageParams)(params), opts.preventScroll || (opts.scrollTop > 0 ? Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollToY)(opts.scrollTop, 0) : opts.noscroll || params.noscroll || Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.scrollToTop)(0)), opts.bench && (ajax.tRender = (new Date).getTime()), Nav.curLoc = params.loc, js) {
                                        var evalString = "(function(){" + js + ";})()";
                                        if (__debugMode) eval(evalString);
                                        else try {
                                            eval(evalString)
                                        } catch (e) {
                                            Object(_debug_tools__WEBPACK_IMPORTED_MODULE_3__.logEvalError)(e, evalString)
                                        }
                                    }
                                    ajax._framenext(), opts.onDone && opts.onDone(), browser.mobile && Object(_layout_utils__WEBPACK_IMPORTED_MODULE_10__.onBodyResize)(), changed.f && handleScroll(changed.f), Nav.setLoc(params.loc || ""), changed[0] && (window.vkLastNav = Date.now()), Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.lTimeout)(function() {
                                        getAudioPlayer().updateCurrentPlaying(), TopMenu.toggle(!1)
                                    }, browser.chrome ? 100 : 50)
                                }
                            }
                        };
                    return window.Page && (Page.postsSave(), Page.postsSend(), Page.postsClearTimeouts()), Object(_ads__WEBPACK_IMPORTED_MODULE_2__.updSeenAdsInfo)(), Object(_ads__WEBPACK_IMPORTED_MODULE_2__.__adsUpdate)("already"), "im" !== Nav.objLoc[0] && "im" !== changed[0] || (where.params = extend({}, where.params, {
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
                            if (e) return setTimeout(showFastBox({
                                title: getLang("global_error")
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
                var n = clone(Nav.objLoc);
                return Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.each)(e, function(e, t) {
                    !1 === t ? delete n[e] : n[e] = t
                }), Nav.go(n, t, o)
            },
            fromStr: function(e) {
                var t = (e = e.split("#"))[0].split("?"),
                    o = {
                        0: t[0] || ""
                    };
                return e[1] && (o["#"] = e[1]), extend(Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.q2ajx)(t[1] || ""), o)
            },
            toStr: function(e) {
                var t = (e = clone(e))["#"] || "",
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
                    var l = gpeByClass("_ads_promoted_post_data_w", e),
                        d = l && l.getAttribute("data-ad"),
                        _ = l && l.getAttribute("data-ad-block-uid");
                    d && (o.ad_data = d), _ && (o.ad_block_unique_id = _)
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

    function articleNav(e, t, o, n) {
        var i = e,
            r = /^(?:%40|@)[.a-z0-9_-]+(?:\?\w+)?/;
        if (i.toLowerCase().match(r)) return cur.articleLayer || (cur.articlePrevLoc = t), window.WkView && WkView.hide(!0), window.__bq && __bq.hideAll(), stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
            var e = cur.articleLayer;
            e && e.setFaded(), cur.articleLayer = new ArticleLayer({
                url: i
            }, !1, n), cur.articleLayer.show(function() {
                e && e.close()
            }, !e), cur.articleSequence = (cur.articleSequence || 0) + (o ? -1 : 1)
        }), !0;
        if (cur.articleLayer && cur.articleLayer.isShown()) {
            var a = function() {
                    cur.articleLayer && cur.articleLayer.close(), delete cur.articleLayer, delete cur.articleSequence
                },
                s = cur.articlePrevLoc;
            return delete cur.articlePrevLoc, s && !r.test(s) ? e === s ? (a(), !0) : (layers.fullhide = function() {
                a()
            }, !1) : (a(), !0)
        }
        return !1
    }
    __webpack_exports__.default = Nav
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, o) {
    'eat script';
    var n = o(61);
    e.exports = o(113)("Set", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        add: function(e) {
            return n.def(this, e = 0 === e ? 0 : e, e)
        }
    }, n)
}, function(e, t, o) {
    'eat script';
    var n = o(75),
        i = {};
    i[o(79)("toStringTag")] = "z", i + "" != "[object z]" && o(30)(Object.prototype, "toString", function() {
        return "[object " + n(this) + "]"
    }, !0)
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "vkLocal", function() {
        return s
    }), o.d(t, "lTimeout", function() {
        return c
    }), o.d(t, "rand", function() {
        return l
    }), o.d(t, "irand", function() {
        return d
    }), o.d(t, "isUndefined", function() {
        return _
    }), o.d(t, "isFunction", function() {
        return u
    }), o.d(t, "isArray", function() {
        return p
    }), o.d(t, "isString", function() {
        return f
    }), o.d(t, "isObject", function() {
        return h
    }), o.d(t, "isEmpty", function() {
        return w
    }), o.d(t, "vkNow", function() {
        return v
    }), o.d(t, "vkImage", function() {
        return b
    }), o.d(t, "trim", function() {
        return g
    }), o.d(t, "stripHTML", function() {
        return m
    }), o.d(t, "escapeRE", function() {
        return y
    }), o.d(t, "intval", function() {
        return O
    }), o.d(t, "floatval", function() {
        return E
    }), o.d(t, "positive", function() {
        return k
    }), o.d(t, "isNumeric", function() {
        return x
    }), o.d(t, "winToUtf", function() {
        return C
    }), o.d(t, "replaceEntities", function() {
        return T
    }), o.d(t, "clean", function() {
        return j
    }), o.d(t, "unclean", function() {
        return L
    }), o.d(t, "each", function() {
        return P
    }), o.d(t, "indexOf", function() {
        return M
    }), o.d(t, "inArray", function() {
        return D
    }), o.d(t, "clone", function() {
        return B
    }), o.d(t, "arrayKeyDiff", function() {
        return A
    }), o.d(t, "extend", function() {
        return S
    }), o.d(t, "addTemplates", function() {
        return I
    }), o.d(t, "getTemplate", function() {
        return R
    }), o.d(t, "serializeForm", function() {
        return N
    }), o.d(t, "extractUrls", function() {
        return W
    }), o.d(t, "isRetina", function() {
        return U
    }), o.d(t, "getCaretCharacterOffsetWithin", function() {
        return F
    }), o.d(t, "formatCount", function() {
        return K
    }), o.d(t, "encodeHtml", function() {
        return V
    }), o.d(t, "decodeHtml", function() {
        return z
    });
    var n = o(109),
        i = o(13),
        r = function() {
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
        a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };

    function s(e) {
        var t = PageID;
        return function() {
            t === PageID && e.apply(this, arguments)
        }
    }

    function c(e, t) {
        return setTimeout(s(e), t)
    }
    window.PageID = window.PageID || 1;
    var l = function(e, t) {
            return Math.random() * (t - e + 1) + e
        },
        d = function(e, t) {
            return Math.floor(l(e, t))
        },
        _ = function(e) {
            return void 0 === e
        },
        u = function(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e)
        },
        p = function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        },
        f = function(e) {
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
    var v = function() {
            return +new Date
        },
        b = function() {
            return window.Image ? new Image : ce("img")
        },
        g = function(e) {
            return (e || "").replace(/^\s+|\s+$/g, "")
        },
        m = function(e) {
            return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
        },
        y = function(e) {
            return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        };

    function O(e) {
        return !0 === e ? 1 : parseInt(e) || 0
    }

    function E(e) {
        return !0 === e ? 1 : parseFloat(e) || 0
    }

    function k(e) {
        return (e = O(e)) < 0 ? 0 : e
    }

    function x(e) {
        return !isNaN(e)
    }

    function C(e) {
        return e.replace(/&#(\d\d+);/g, function(e, t) {
            return (t = O(t)) >= 32 ? String.fromCharCode(t) : e
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function T() {
        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        return Object(n.se)("<textarea>" + e + "</textarea>").value
    }

    function j(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function L(e) {
        return T(e.replace(/\t/g, "\n"))
    }

    function P(e, t) {
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

    function M(e, t, o) {
        for (var n = o || 0, i = (e || []).length; n < i; n++)
            if (e[n] == t) return n;
        return -1
    }

    function D(e, t) {
        return -1 !== M(t, e)
    }

    function B(e, t) {
        var o = h(e) || void 0 === e.length ? {} : [];
        for (var n in e)(!/webkit/i.test(_ua) || "layerX" != n && "layerY" != n && "webkitMovementX" != n && "webkitMovementY" != n) && (t && "object" === a(e[n]) && "prototype" !== n && null !== e[n] ? o[n] = B(e[n]) : o[n] = e[n]);
        return o
    }

    function A(e) {
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
        for ("boolean" == typeof o && (i = o, o = e[1] || {}, n = 2), "object" === (void 0 === o ? "undefined" : a(o)) || u(o) || (o = {}); n < t; n++) {
            var r = e[n];
            if (null != r)
                for (var s in r)
                    if (r.hasOwnProperty(s)) {
                        var c = o[s],
                            l = r[s];
                        o !== l && (i && l && "object" === (void 0 === l ? "undefined" : a(l)) && !l.nodeType ? o[s] = S(i, c || (null != l.length ? [] : {}), l) : void 0 !== l && (o[s] = l))
                    }
        }
        return o
    }

    function I(e) {
        window.templates = window.templates || {}, S(window.templates, e)
    }

    function R(e, t) {
        var o = (window.templates = window.templates || {})[e];
        return "function" == typeof o && (o = o()), o && t ? Object(n.rs)(o, t) : o || ""
    }

    function N(e) {
        if ("object" !== (void 0 === e ? "undefined" : a(e))) return !1;
        var t = {},
            o = function(t) {
                return Object(n.geByTag)(t, e)
            },
            i = function(o, i) {
                if (i.name)
                    if ("text" !== i.type && i.type)
                        if (i.getAttribute("bool")) {
                            var r = Object(n.val)(i);
                            if (!r || "0" === r) return;
                            t[i.name] = 1
                        } else t[i.name] = browser.msie && !i.value && e[i.name] ? e[i.name].value : i.value;
                else t[i.name] = Object(n.val)(i)
            };
        return P(o("input"), function(e, t) {
            if ("radio" !== t.type && "checkbox" !== t.type || t.checked) return i(0, t)
        }), P(o("select"), i), P(o("textarea"), i), t
    }

    function W(e, t) {
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
    var U = function() {
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

    function K(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = t.kLimit || 1e3;
        return e >= (t.mLimit || 1e6) && !t.noCheck ? K(e = (e = O(e / 1e5)) > 1e3 ? O(e / 10) : e / 10, S(t, {
            noCheck: !0
        }), !0) + "M" : e >= o && !t.noCheck ? K(e = (e = O(e / 100)) > 100 ? O(e / 10) : e / 10, S(t, {
            noCheck: !0
        }), !0) + "K" : Object(i.langNumeric)(e, "%s", !0).replace(/,/g, ".")
    }
    var H, q = r((H = null, [function(e) {
            return H || (H = Object(n.se)("<span> </span>")), H.innerText = e, H.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
        }, function(e) {
            return H || (H = Object(n.se)("<span> </span>")), H.innerHTML = e, H.innerText
        }]), 2),
        V = q[0],
        z = q[1];
    window.isRetina = U, window.extractUrls = W, window.serializeForm = N, window.addTemplates = I, window.getTemplate = R, window.rand = l, window.irand = d, window.isUndefined = _, window.isFunction = u, window.isArray = p, window.isString = f, window.isObject = h, window.isEmpty = w, window.vkNow = v, window.vkImage = b, window.trim = g, window.stripHTML = m, window.escapeRE = y, window.intval = O, window.floatval = E, window.positive = k, window.isNumeric = x, window.winToUtf = C, window.replaceEntities = T, window.clean = j, window.unclean = L, window.each = P, window.indexOf = M, window.inArray = D, window.clone = B, window.arrayKeyDiff = A, window.extend = S, window.vkLocal = s, window.lTimeout = c, window.getCaretCharacterOffsetWithin = F, window.formatCount = K, window.encodeHtml = V, window.decodeHtml = z
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "showPhoto", function() {
        return r
    }), o.d(t, "showManyPhoto", function() {
        return a
    }), o.d(t, "showAlbums", function() {
        return s
    }), o.d(t, "showAlbum", function() {
        return c
    }), o.d(t, "showPhotoTags", function() {
        return l
    }), o.d(t, "showVideoTags", function() {
        return d
    }), o.d(t, "videoCallback", function() {
        return _
    }), o.d(t, "showWiki", function() {
        return u
    }), o.d(t, "showApp", function() {
        return p
    });
    var n = o(11),
        i = o(95);

    function r(e, t, o, i) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (!(Object(n.checkEvent)(i) || cur._editMode && cur._editMode(i))) {
            var r = ["photoview.js", "photoview.css", "page.js", "page.css"];
            if (o.img && (o.showProgress = function() {
                    showProgress(o.img)
                }, o.hideProgress = function() {
                    hideProgress(o.img)
                }), !e) return !1;
            if (window.Photoview && !1 === Photoview.showPhoto(e, t, o)) return !1;
            var a = !0;
            o.temp && !(cur.pvNoTemp || {})[e] && stManager.add(r, function() {
                extend(cur, {
                    pvCancelLoad: function() {
                        a = !1
                    },
                    pvData: cur.pvData || {},
                    pvOptions: cur.pvOptions || {}
                }), cur.pvData.temp = [o.temp], cur.pvOptions.temp_final = o.temp_final, cur.pvOptions.temp_summary = o.temp_summary, cur.pvOptions.queue = o.queue, Photoview.show("temp", 0)
            });
            var s = 1;
            return o && o.additional && o.additional.open_pe && (s = 0), extend(o, {
                onDone: function(n) {
                    Photoview.list(e, t, n), o.blog_text && arguments[3] && arguments[3][0] && (arguments[3][0].album = o.blog_text), Photoview.loaded.apply(window, arguments), a && ("deleted" === n ? Photoview.showDeleted.apply(window, arguments) : Photoview.showPhoto(e, t, o, !0))
                },
                stat: r,
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
    }

    function a(e, t, o, n) {
        Page.showManyPhoto(e, t, o, n)
    }

    function s(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : Object(n.checkEvent)(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
            Photoview.showAlbums(e, t)
        }), !1)
    }

    function c(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : Object(n.checkEvent)(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
            Photoview.showAlbum(e, t)
        }), !1)
    }

    function l(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : Object(n.checkEvent)(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
            Photoview.showTagged(e, t)
        }), !1)
    }

    function d(e, t, o) {
        return cur.viewAsBox ? cur.viewAsBox() : Object(n.checkEvent)(o) ? void 0 : (stManager.add(["video.js", "video.css", "photoview.js", "photoview.css"], function() {
            Photoview.showVideoTags(e, t)
        }), !1)
    }

    function _(e) {
        var t = e.shift();
        if (window.Videoview && Videoview.playerCallback[t]) return Videoview.playerCallback[t].apply(Videoview, e);
        throw Error("Unregistered player callback: " + t)
    }

    function u(e, t, o) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        if (Object(n.checkEvent)(o)) return !0;
        if (0 !== cur.gid && (e.gid = cur.gid), window.wkcur && wkcur.shown && wkcur.wkRaw === e.w && e.w && !e.reply) return WkView.restoreLayer(i), Object(n.cancelEvent)(o);
        (window.wkcur && wkcur.hideTitle || e.hide_title) && (i.hide_title = e.hide_title = 1);
        var r = i.stat || ["wkview.js", "wkview.css", "wk.css", "wk.js"];
        t && r.push("wk_editor.js", "wk_editor.css");
        var a = {
            stat: r,
            loader: !i.noloader,
            onDone: function(e, t, n, r) {
                WkView.show(e, t, extend(n, i), r, o)
            },
            onFail: function(e) {
                return WkView.showError(e)
            }
        };
        if (nav.objLoc.claim && (e.claim = nav.objLoc.claim), e.w && "/query" === e.w.substr(-6)) {
            var s = clone(nav.objLoc);
            delete s[0], delete s.w, e.query = JSON.stringify(s)
        }
        i.preload && extend(a, i.preload);
        var c = void 0,
            l = void 0;
        return i.ads_params && (c = i.ads_params, (l = nav.getPostParams(o && o.target)).post_click_url && (c._post_click_url = l.post_click_url)), ajax.post("wkview.php", extend({
            act: "show",
            loc: nav.objLoc[0],
            is_znav: i.isZnav
        }, e, c, cur.getWkviewOpts && cur.getWkviewOpts()), a), Object(n.cancelEvent)(o)
    }

    function p(e, t, o, n, r, a) {
        a || (a = {});
        var s = !1,
            c = extend({
                w: "app" + t
            }, a);
        if (o = Object(i.intval)(o), n && (Object(i.isObject)(n) ? c = extend(c, n) : c.ref = n), a.layer && (s = !0), (cur.apps && cur.apps[t] || !o) && !s) {
            delete c.w;
            var l = "app" + t + (r ? "_" + r : ""),
                d = nav.objLoc && !nav.objLoc[1] && nav.objLoc[0] === l;
            return nav.go("/" + l + nav.toStr(c), e, {
                nocur: d
            })
        }
        r && (c.mid = r);
        var _ = {
            stat: ["wkview.js", "wkview.css", "apps.js", "apps.css"]
        };
        return a.queue && (_.queue = 1), a.urlHash && (c.url_hash = a.urlHash), u(c, !1, e, _)
    }
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = function() {
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
            ge("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", function() {
                return e.hub.done()
            }), ajax.post("hints.php", {
                act: "a_start_hints"
            }, {
                onDone: function(t) {
                    e.startHintsText = trim(t), e.hintsHub.done()
                }
            }))
        }, e.prototype.show = function(e) {
            function t(t) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function(e) {
            var t = window.placeholderSetup;
            if (ge("quick_search") && !this.on) return this.on = 1, show(this.sCont), t("search_input"), ge("search_input").setAttribute("autocomplete", "off"), addClass(ge("qsearch_link"), "active"), this.prev_content = ge("content"), this.qsearch_cont || (this.qsearch_cont = ce("div", {
                id: "content",
                innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
            })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? cancelEvent(e) : void 0
        }), e.prototype.go = function(e) {
            var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + trim(ge("search_input").value) + "&name=1";
            return cancelEvent(e || window.event), location.href = t, !1
        }, e.prototype.init = function(e) {
            this.sCont = ge("quick_search"), this.opt = e || {}
        }, e.prototype.hide = function(e) {
            function t(t, o) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function(e, t) {
            if (ge("quick_search") && (!this.active || t) && this.on) {
                var o = window.toggleFlash;
                if (this.on = 0, o(), this.beforeHide && this.beforeHide()) return !0;
                ge("search_input").setValue ? ge("search_input").setValue("") : ge("search_input").value = "", hide(this.sCont), removeClass(ge("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
            }
        }), e.prototype.preload = function() {}, e
    }();
    t.default = n
}, function(e, t, o) {
    'eat script';
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
            var l = Number(arguments[a]);
            if (!isFinite(l) || l < 0 || l > 1114111 || r(l) != l) throw RangeError("Invalid code point: " + l);
            l <= 65535 ? n.push(l) : (t = 55296 + ((l -= 65536) >> 10), o = l % 1024 + 56320, n.push(t, o)), (a + 1 == s || n.length > 16384) && (c += i.apply(null, n), n.length = 0)
        }
        return c
    }, n ? n(String, "fromCodePoint", {
        value: a,
        configurable: !0,
        writable: !0
    }) : String.fromCodePoint = a)
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "updateHeaderStyles", function() {
        return g
    }), o.d(t, "updateLeftMenu", function() {
        return m
    }), o.d(t, "updateSTL", function() {
        return y
    }), o.d(t, "handlePageCount", function() {
        return E
    }), o.d(t, "handlePageParams", function() {
        return k
    }), o.d(t, "updateOtherCounters", function() {
        return x
    }), o.d(t, "comScoreUDM", function() {
        return C
    }), o.d(t, "reloadCheckFlood", function() {
        return T
    }), o.d(t, "globalHistoryDestroy", function() {
        return j
    }), o.d(t, "showBackLink", function() {
        return L
    }), o.d(t, "processDestroy", function() {
        return P
    }), o.d(t, "handlePageView", function() {
        return M
    }), o.d(t, "zNav", function() {
        return D
    });
    var n = o(109),
        i = o(95),
        r = o(13),
        a = o(43),
        s = o(70),
        c = o(63),
        l = o(28),
        d = o(6),
        _ = o(105),
        u = o(76),
        p = o(47),
        f = o(58),
        h = o(96),
        w = o(107),
        v = o(24),
        b = function() {
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

    function g(e) {
        var t = [Object(n.ge)("dev_top_nav_wrap"), Object(n.ge)("page_header_wrap")];
        Object(i.each)(t, function(t, o) {
            o && Object(n.setStyle)(o, e)
        })
    }

    function m(e) {
        window.__leftMenu && window.__leftMenu.handleUpdateRequest(e)
    }

    function y() {
        var e = window.innerWidth,
            t = document.documentElement.clientWidth,
            o = Math.max(Object(i.intval)(e), Object(i.intval)(t));
        Object(n.toggleClass)(bodyNode, "no_stl", o < vk.width + 280), Object(n.toggleClass)(bodyNode, "no_sett", o < vk.width + 62)
    }

    function O(e, t, o) {
        var s = "",
            c = "",
            l = '<span class="inl_bl left_count_sign"></span>',
            d = "spr" === o ? 5 : 3,
            _ = geByClass1("left_count_wrap", e),
            u = hasClass(geByClass1("left_row", e, "a"), "left_nav_over"),
            p = geByClass1("left_count", e, "span"),
            f = val(p);
        t && ((s = t.toString()).length > d && (c = ' title="' + Object(i.stripHTML)(Object(r.langNumeric)(t, "%s", !0)) + '"', s = ".." + s.substr(s.length - d)), l = '<span class="inl_bl left_count" ' + c + ">" + s + "</span>");
        var h = function() {
            val(_, l), (t ? removeClass : addClass)(_, "left_void"), Object(n.setStyle)(_, {
                opacity: ""
            })
        };
        if (f || u)
            if (s) animateCount(p, s, {
                str: "auto",
                onDone: h
            });
            else if (u) {
            var w = bodyNode.appendChild(Object(n.se)('<span class="left_count_wrap"><span class="inl_bl left_count_sign"></span></span>')),
                v = Object(n.getSize)(Object(n.domFC)(w))[0];
            Object(n.re)(w), f && "." === f.charAt(0) && val(p, f.replace("..", "")), Object(a.animate)(p, {
                width: v
            }, 100, h)
        } else Object(a.animate)(_, {
            opacity: 0
        }, 100, h);
        else h(), Object(n.setStyle)(_, {
            opacity: 0
        }), Object(a.animate)(_, {
            opacity: 1
        }, 100)
    }

    function E(e, t, o, r) {
        var a = Object(i.intval)(t);
        if (void 0 === vk.counts && (vk.counts = {}), vk.counts[e] !== a)
            if (vk.counts[e] = a, "ntf" !== e) {
                var s = Object(n.ge)("l_" + e),
                    c = hasClass(Object(n.domFC)(s), "left_nav_over"),
                    l = void 0;
                s && (O(s, a > 0 ? a : 0, e), r && o && (l = a > 0 && r ? "?" + r : "", s.firstChild.href = "/" + o + l)), (a >= 0 || !c) && Object(n.toggle)(s, a >= 0)
            } else window.TopNotifier.setCount(a > 0 ? a : 0)
    }

    function k(e) {
        vk.id = e.id, e.body_class !== bodyNode.className && (bodyNode.className = e.body_class || ""), y(), m(), void 0 !== e.pvbig && (vk.pvbig = e.pvbig), void 0 !== e.pvdark && (vk.pvdark = e.pvdark), cur._level = e.level, vk.id && vk.id % 1e3 == 1 && setTimeout(function() {
            window.scrollmarked = {}, Object(s.statlogsValueEvent)("page_scroll", 0, cur.module, "0")
        }, 300), M(e);
        var t = Object(n.ge)("mvk_footer_lnk");
        if (t && (t.firstChild.href = e.mvklnk || "http://m.vk.com/"), vk.nophone = Object(i.intval)(e.nophone), vk.staticheader = Object(i.intval)(e.staticheader), vk.id) {
            var o = Object(n.ge)("left_blocks");
            o && (o.innerHTML = e.leftblocks || "")
        }
        "leftads" in e && 0 !== e.leftads && window.__adsSet(e.leftads, e.ads_section || "", e.ads_can_show, e.ads_showed);
        var r = locProtocol + "//" + location.host + "/";
        e.loc && ("?" === e.loc.charAt(0) ? r += nav.strLoc : r += e.loc);
        var a = document.URL === r ? "" : document.URL;
        if (setTimeout(x.pbind(r, a), 10), e.counters) {
            var l = (e.counters || "").split(","),
                d = "",
                _ = "";
            Object(i.intval)(l[9]) > 0 ? (d = "adsmarket", _ = "act=overview&status=-1") : Object(i.intval)(l[9]) < -1 ? (l[9] = 1, d = "ads", _ = "act=a_comeback_office_redirect") : d = "ads?act=office&last=1";
            var u = Object(n.ge)("l_set"),
                p = u && u.nextSibling || !1,
                f = ["fr", "ph", "vid", "msg", "nts", "gr", "vkp", "wsh", "ap", "ads", "ntf", "fav", "doc", "apm", "mk"],
                h = ["friends", "albums" + vk.id, "video", "", "notes", "groups", "vkpay", "gifts.php?act=wishlist", "apps", d, "feed" + (Object(n.ge)("l_nwsf") ? "?section=notifications" : ""), "pages", "docs", "apps_manage", "market"],
                w = ["", "act=added", "section=tagged", "", "act=comments", "", "tab=invitations", "", "", _, Object(n.ge)("l_nwsf") ? "" : "section=notifications", "", "", "", "only_friends=1"],
                v = !1;
            if (e.handlecnts) {
                for (var b = 0; b < f.length; b++) E(f[b], l[b], h[b], w[b]);
                for (var g = p.nextSibling; g; g = g.nextSibling) {
                    if (g.tagName && "li" === g.tagName.toLowerCase() && Object(n.isVisible)(g)) {
                        v = !0;
                        break
                    }
                    if (hasClass(g, "more_div")) break
                }(v ? show : hide)(p);
                for (var k = l.length; b < k; b++) {
                    var C = l[b].split(":"),
                        T = Object(n.ge)("l_app" + Object(i.intval)(C[0]));
                    T && O(T, Object(i.intval)(C[1]))
                }
                setTimeout(c.updSeenAdsInfo, 0)
            } else
                for (var j = 0; j < f.length; j++) vk.counts[f[j]] = l[j]
        }
    }

    function x(e, t) {
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
            Object(i.vkImage)().src = locProtocol + "//counter.yadro.ru/hit?r" + escape(t) + s + ";u" + escape(e) + ";" + Math.random(), Object(i.vkImage)().src = locProtocol + "//www.tns-counter.ru/V13a***R>" + t.replace(/\*/g, "%2a") + "*vk_com/ru/UTF-8/tmsec=vksite_total/" + Math.round(1e9 * Math.random()), "unauth" === vk.tnsPixelType ? Object(i.vkImage)().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184674/" + Math.round(1e9 * Math.random()) : "has_rough" === vk.tnsPixelType ? Object(i.vkImage)().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184675/" + Math.round(1e9 * Math.random()) : "not_has_rough" === vk.tnsPixelType && (Object(i.vkImage)().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184677/" + Math.round(1e9 * Math.random())), C(e, t), window._tmr = window._tmr || [], window._tmr.push({
                id: "2579437",
                url: e,
                referrer: t,
                type: "pageView",
                start: (new Date).getTime(),
                pid: vk.id ? vk.id : 0
            })
        }
    }

    function C(e, t) {
        if (!vk.zero) {
            t = t || document.referrer;
            var o = "https:" === locProtocol ? "sb" : "b",
                n = escape(e),
                r = escape(t),
                a = Math.random();
            Object(i.vkImage)().src = locProtocol + "//" + o + ".scorecardresearch.com/p?c1=2&c2=13765216&c3=&c4=" + n + "&c5=&c7=" + n + "&c9=" + r + "&c15=&cv=2.0&cj=1&rn=" + a
        }
    }

    function T(e) {
        e = e || {};
        var t = ls.get("last_reloaded") || [];
        t.unshift(Object(i.vkNow)());
        var o = t.length;
        return o > 5 && (t.splice(5, o - 5), o = 5), ls.set("last_reloaded", t), !!(5 === o && t[0] - t[4] < 2e4) && (Object(l.topError)('<b>Reloading error</b>, please check internet connection, <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.<br>If problem remains, please <a href="/support?act=new">report it here</a>.', {
            dt: 15,
            type: 6,
            msg: "Reload error, from " + (e.from || 0) + ", forced " + (e.force || 0) + ", url " + (e.url || "") + ", query " + (e.query || "")
        }), !0)
    }

    function j(e) {
        for (var t = 0, o = globalHistory.length; t < o; t++)
            if (globalHistory[t].loc === e) {
                var n = globalHistory.splice(t, 1)[0];
                P(n.cur), n.content.innerHTML = "", --t, --o
            }
    }

    function L(e, t, o) {
        var n = e;
        if (e = (e || "").replace(/^\//, ""), _tbLink.loc = e, void 0 === o && (o = 0, e))
            for (var i = 0, r = globalHistory.length; i < r; i++)
                if (globalHistory[i].loc === e) {
                    o = 1;
                    break
                }
        if (n) {
            try {
                _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
            } catch (e) {}
            extend(_tbLink, {
                href: "/" + e,
                innerHTML: t,
                fast: o
            }), show(_tbLink), window._stlWas = 0
        } else hide(_tbLink);
        Object(d.updSideTopLink)(1)
    }

    function P(e) {
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

    function M(e) {
        var t = Object(n.ge)("footer_wrap"),
            o = geByClass1("top_home_link"),
            r = void 0 === e.width ? vk.width : e.width,
            a = void 0 === e.width_dec ? vk.width_dec : e.width_dec,
            s = void 0 === e.width_dec_footer ? vk.width_dec_footer : e.width_dec_footer;
        if (vk.noleftmenu === e.noleftmenu && vk.nobottommenu === e.nobottommenu && vk.width === e.width && vk.width_dec_footer === e.width_dec_footer || (vk.noleftmenu !== e.noleftmenu && e.noleftmenu && hide("side_bar"), vk.nobottommenu !== e.nobottommenu && (e.nobottommenu ? hide("bottom_nav") : show("bottom_nav")), e.noleftmenu && e.nobottommenu ? t && (addClass(t, "simple"), t.style.width = "auto") : t && (removeClass(t, "simple"), t.style.width = r - s + "px")), vk.notopmenu !== e.notopmenu && (e.notopmenu ? hide("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap") : show("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap")), o && vk.top_home_link_class !== e.top_home_link_class && (o.className = e.top_home_link_class), r !== vk.width || a !== vk.width_dec) {
            Object(n.ge)("page_layout").style.width = r + "px", Object(n.ge)("page_header").style.width = r + "px", Object(n.ge)("page_body").style.width = r - a + "px", Object(n.ge)("ts_wrap") && hasClass(Object(n.ge)("ts_wrap"), "vk") && (Object(n.ge)("ts_wrap").style.width = r - 191 + "px"), setTimeout(d.updSideTopLink.pbind(!0), 0), setTimeout(y, 0);
            try {
                _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
            } catch (e) {}
        }
        vk.noleftmenu === e.noleftmenu || e.noleftmenu || show("side_bar"), vk.noleftmenu = e.noleftmenu, vk.nobottommenu = e.nobottommenu, vk.top_home_link_class = e.top_home_link_class, vk.notopmenu = e.notopmenu, vk.width = r, vk.width_dec = a, vk.width_dec_footer = s, vk.body_class = e.body_class, vk.staticheader = Object(i.intval)(e.staticheader), vk.no_ads = e.no_ads, vk.ad_preview = e.ad_preview
    }

    function D(e, t, o) {
        var r = e.z,
            a = e.f,
            s = e.w,
            c = (r || "").match(/^([a-z_]+)(-?\d+(?:_\d+)?)\/?(.*)/i);
        if (delete e.z, delete e.f, delete e.w, t || (t = {}), isEmpty(e)) {
            if (a && (handleScroll(a), void 0 === r)) return !1;
            if (t.hist)
                if (r || s) {
                    if (layerQueue.back("wiki", s, (c || {})[1], (c || {})[2])) return !1
                } else if (!1 === r && o.w && layerQueue.back("wiki", o.w)) return !1;
            if (s) {
                if (!1 === r) layers.fullhide(!!t.hist && 2);
                else {
                    if (s.match(/^story([0-9\-]+)_(\d+)/)) return Object(_.showStory)(s);
                    o || (o = clone(nav.objLoc)), s && (o.w = s), a && (o.f = a), delete o.z, nav.setLoc(o)
                }
                return showWiki({
                    w: s
                }, "note_new" === s, !1, {
                    onLoaded: r && D.pbind({
                        z: r
                    }, extend(t, {
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
                var l = !window.wkcur || !wkcur.shown || layers.fullhide !== WkView.hide;
                !layers.fullhide || !l && !1 !== s || t.asBox || (!t.hist || o.z || o.w || -1 !== o[0].indexOf("/") || o[0].match(/^(photo|video)(-?\d+_\d+)$/) || layerQueue.clear(), layers.fullhide(!!t.hist && 2));
                var d = Object(f.curBox)();
                return d && d.wkRaw && d.hide(), !1
            }
            if (r && c) {
                var g = function() {
                    return delete nav.objLoc.z, nav.setLoc(nav.objLoc), !0
                };
                switch (c[1]) {
                    case "photo":
                        return Object(h.showPhoto)(c[2], c[3], extend(t, {
                            onFail: g,
                            noHistory: !0
                        })), !1;
                    case "albums":
                        return Object(h.showAlbums)(c[2], extend(t, {
                            onFail: g,
                            noHistory: !0
                        })), !1;
                    case "album":
                        return Object(h.showAlbum)(c[2], extend(t, {
                            onFail: g,
                            noHistory: !0
                        })), !1;
                    case "tag":
                    case "photo_tag":
                        return Object(h.showPhotoTags)(c[2], extend(t, {
                            onFail: g,
                            noHistory: !0
                        })), !1;
                    case "video":
                        var m = c[3],
                            y = extend(t, {
                                onFail: g,
                                noLocChange: 1,
                                focusPlay: 1
                            });
                        if (m) {
                            var O = [],
                                E = "";
                            if (Object(i.each)(m.split("/"), function(e, t) {
                                    0 === t.indexOf("pl_") ? E = t : O.push(t)
                                }), m = O.join("/"), E) {
                                E = E.substr("pl_".length);
                                var k = cur.currentModule ? cur.currentModule() : cur.module;
                                y = extend(y, {
                                    playlistId: E,
                                    module: k,
                                    addParams: {
                                        force_no_repeat: 1,
                                        show_next: 1,
                                        playlist_id: E
                                    }
                                })
                            }
                        }
                        return Object(w.showVideo)(c[2], m, y), !1;
                    case "single":
                        return void 0 === s && stManager.add(["single_pv.css", "single_pv.js"], Object(n.ge)(r).onclick), !1;
                    case "accept_money":
                        return Object(v.moneyTransferBox)(c[2], c[3]), !1;
                    case "audio_playlist":
                        var x = c[2].split("_"),
                            C = b(x, 2),
                            T = C[0],
                            j = C[1];
                        return AudioUtils.showAudioPlaylist(T, j, c[3], void 0, void 0, t.onDone), !1;
                    case "article_edit":
                        return openArticleEditor.apply(null, c[2].split("_")), !1
                }
            }
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n = o(109),
        i = o(28),
        r = o(95),
        a = {
            _waiters: [],
            _wait: function() {
                var e = a._waiters.length,
                    t = {},
                    o = [];
                if (!e) return clearInterval(a._waitTimer), void(a._waitTimer = !1);
                for (var s = 0; s < e; ++s) {
                    for (var c = a._waiters[s][0], l = 0, d = c.length; l < d; ++l) {
                        var _ = c[l];
                        if (!t[_])
                            if (StaticFiles[_].l || "css" !== StaticFiles[_].t || "none" !== Object(n.getStyle)(StaticFiles[_].n, "display") || a.done(_), StaticFiles[_].l) t[_] = 1;
                            else if (t[_] = -1, vk.loaded) {
                            var u = ++StaticFiles[_].c;
                            (u > a.lowlimit && stVersions[_] > 0 || u > a.highlimit) && (stVersions[_] < 0 ? (Object(i.topError)("<b>Error:</b> Could not load <b>" + _ + "</b>.", {
                                dt: 5,
                                type: 1,
                                msg: "Failed to load with " + a.lowlimit + "/" + a.highlimit + " limits (" + (Object(r.vkNow)() - vk.started) / 100 + " ticks passed)",
                                file: _
                            }), StaticFiles[_].waitersLength = 1, t[_] = 1) : (Object(i.topMsg)("Some problems with loading <b>" + _ + "</b>...", 5), stVersions[_] = Object(r.irand)(-1e4, -1), a._add(_, StaticFiles[_])))
                        }
                        t[_] > 0 && (c.splice(l, 1), --l, --d)
                    }
                    c.length || (o.push(a._waiters.splice(s, 1)[0][1]), s--, e--)
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
                    s = a._srcPrefix(e, i);
                if (StaticFiles[e] = {
                        v: i,
                        n: o,
                        l: 0,
                        c: 0
                    }, -1 !== e.indexOf(".js")) {
                    var c = "/js/";
                    if (stTypes.fromLib[e] ? c += "lib/" : stTypes.fromCompiled && stTypes.fromCompiled[e] ? c += jsc("web/") : /^lang\d/i.test(e) || stTypes.fromRoot[e] || -1 !== e.indexOf("/") || (c += "al/"), StaticFiles[e].t = "js", e === jsc("web/common_web.js")) setTimeout(a.done.bind(a).pbind(jsc("web/common_web.js")), 0);
                    else {
                        var l = s + c + r;
                        a._insertNode(l, e), StaticFiles[e].src = l
                    }
                } else if (-1 !== e.indexOf(".css")) {
                    var d = s + ("/css/" + (vk.css_dir || "") + (stTypes.fromRoot[e] || -1 !== e.indexOf("/") ? "" : "al/")) + r;
                    t && t.l && "css" === t.t && (StaticFiles[e].styleNode = a._addCss("#" + o + " {display: block; }", a._getOldNode(d))), a._insertNode(d, e), StaticFiles[e].t = "css", StaticFiles[e].src = d, ge(o) || utilsNode.appendChild(Object(n.ce)("div", {
                        id: o
                    }))
                }
            },
            _getOldNode: function(e) {
                return !!headNode.querySelector && ((e = e.split("?")[0]).match(/\.css$/) ? headNode.querySelector('link[href^="' + e + '"]') : headNode.querySelector('script[src^="' + e + '"]'))
            },
            _insertNode: function(e, t) {
                var o = e.split("?")[0].match(/\.css$/),
                    i = a._getOldNode(e);
                o && StaticFiles[t] && StaticFiles[t].styleNode ? i = Object(n.domNS)(StaticFiles[t].styleNode) : i && (i = Object(n.domNS)(i));
                var r = void 0;
                o ? (r = Object(n.ce)("link", {
                    type: "text/css",
                    rel: "stylesheet",
                    href: e
                })).onload = function() {
                    a._removeDuplicateNodes(t)
                } : r = Object(n.ce)("script", {
                    type: "text/javascript",
                    src: e
                }), i ? headNode.insertBefore(r, i) : headNode.appendChild(r)
            },
            _removeDuplicateNodes: function(e) {
                var t = StaticFiles[e];
                if (t && t.src) {
                    var o = t.src.split("?")[0],
                        i = a._getOldNode(o);
                    if (i) {
                        t.styleNode && (Object(n.re)(t.styleNode), delete StaticFiles[e].styleNode);
                        for (var r = o.match(/\.css$/); i && (i = Object(n.domNS)(i));) {
                            var s = r ? i.href : i.src;
                            if (!s) break;
                            if ((s = s.replace(/^(https?:\/\/([a-z0-9\-\.\_]+))?vk\.com/, "")).split("?")[0] !== o) break;
                            Object(n.re)(Object(n.domPS)(i))
                        }
                    }
                }
            },
            add: function(e, t, o) {
                var n = [],
                    i = document.documentElement;
                for (var s in Object(r.isArray)(e) || (e = [e]), e)
                    if (e.hasOwnProperty(s)) {
                        var c = e[s];
                        if (c) {
                            -1 !== c.indexOf("?") && (c = c.split("?")[0]), /^lang\d/i.test(c) ? stVersions[c] = stVersions.lang : stVersions[c] || (stVersions[c] = 1), (browser.opera && 768 == i.clientHeight && 1024 == i.clientWidth || __debugMode) && !browser.iphone && !browser.ipad && c !== jsc("web/common_web.js") && "common.css" !== c && stVersions[c] > 0 && stVersions[c] < 1e9 && (stVersions[c] += Object(r.irand)(1e9, 2e9));
                            var l = StaticFiles[c];
                            l && l.v == stVersions[c] || a._add(c, l), t && !StaticFiles[c].l && n.push(c)
                        }
                    }
                if (t) {
                    if (!n.length) return !0 === o ? setTimeout(t, 0) : t();
                    a._waiters.push([n, t]), a._waitTimer || (a._waitTimer = setInterval(a._wait, 100))
                }
            },
            done: function(e) {
                stVersions[e] < 0 && Object(i.topMsg)('<b>Warning:</b> Something is bad, please <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.', 10), StaticFiles[e].l = 1, "js" === StaticFiles[e].t && a._removeDuplicateNodes(e)
            }
        };
    window.stManager = a, window.__stm = a
}, function(e, t, o) {
    'eat script';
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
        return l
    }), o.d(t, "GROUPS_ADMIN_PSEUDO_LEVEL_ADVERTISER", function() {
        return d
    }), o.d(t, "GROUPS_ADMIN_FLAG_ADS", function() {
        return _
    });
    var n = 0,
        i = 1,
        r = 2,
        a = 3,
        s = 4,
        c = 5,
        l = 6,
        d = 100,
        _ = 8;
    t.default = {
        GROUPS_ADMIN_LEVEL_USER: n,
        GROUPS_ADMIN_LEVEL_MODERATOR: i,
        GROUPS_ADMIN_LEVEL_EDITOR: r,
        GROUPS_ADMIN_LEVEL_ADMINISTRATOR: a,
        GROUPS_ADMIN_LEVEL_HOST: s,
        GROUPS_ADMIN_LEVEL_EVENT_CREATOR: c,
        GROUPS_ADMIN_LEVEL_CREATOR: l,
        GROUPS_ADMIN_PSEUDO_LEVEL_ADVERTISER: d,
        GROUPS_ADMIN_FLAG_ADS: _
    }
}, function(e, t, o) {
    var n = o(111),
        i = o(7),
        r = o(115),
        a = o(117)("IE_PROTO"),
        s = function() {},
        c = function() {
            var e, t = o(90)("iframe"),
                n = r.length;
            for (t.style.display = "none", o(66).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; n--;) delete c.prototype[r[n]];
            return c()
        };
    e.exports = Object.create || function(e, t) {
        var o;
        return null !== e ? (s.prototype = n(e), o = new s, s.prototype = null, o[a] = e) : o = c(), void 0 === t ? o : i(o, t)
    }
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "_initCookies", function() {
        return r
    }), o.d(t, "getCookie", function() {
        return a
    }), o.d(t, "setCookie", function() {
        return s
    }), o.d(t, "hideCookiesPolicy", function() {
        return c
    });
    var n = o(109),
        i = o(47);

    function r() {
        _cookies = {};
        for (var e = document.cookie.split(";"), t = /^[\s]*([^\s]+?)$/i, o = 0, n = e.length; o < n; o++) {
            var i = e[o].split("=");
            2 === i.length && (_cookies[i[0].match(t)[1]] = unescape(i[1].match(t) ? i[1].match(t)[1] : ""))
        }
    }

    function a(e) {
        return r(), _cookies[e]
    }

    function s(e, t, o, n) {
        var i = "";
        if (o) {
            var r = new Date;
            r.setTime(r.getTime() + 24 * o * 60 * 60 * 1e3), i = "; expires=" + r.toGMTString()
        }
        var a = window.locDomain;
        document.cookie = e + "=" + escape(t) + i + "; path=/" + (a ? "; domain=." + a : "") + (n && "https:" === locProtocol ? "; secure" : "")
    }

    function c() {
        Object(n.re)("cookies_policy_wrap"), i.ajax.post("/settings", {
            act: "a_hide_cookies_policy"
        })
    }
    window._cookies = {}, window._initCookies = r, window.getCookie = a, window.setCookie = s, window.hideCookiesPolicy = c
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "showStory", function() {
        return i
    }), o.d(t, "storiesPreloadStatic", function() {
        return a
    }), o.d(t, "sendMask", function() {
        return c
    });
    var n = !1;

    function i(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (cur.storiesNotSupported) return showFastBox(getLang("global_error"), getLang("stories_bad_browser"));
        curBox() && curBox().bodyNode.contains(t.fromEl) && (curBox().hide(), t.fromEl = null), clearTimeout(n), n = setTimeout(function() {
            bodyNode.appendChild(ce("div", {
                id: "stories_loader",
                innerHTML: getProgressHtml("stories_loader_pr", "pr_baw pr_medium") + '<div class="back"></div>'
            }))
        }, 1e3), stManager.add(["stories.js", "stories.css", jsc("web/emoji.js")], function() {
            var o = window.Stories;
            clearTimeout(n), re("stories_loader"), o.show(e, t)
        })
    }
    var r = !1;

    function a() {
        r || cur.storiesNotSupported || (r = !0, stManager.add(["stories.js", "stories.css"]))
    }
    var s = !1;

    function c(e, t) {
        s || (s = !0, ajax.post("al_stories.php", {
            act: "send_mask",
            mask_id: e,
            hash: t
        }, {
            loader: !0,
            onDone: function(e, t, o, n) {
                "cant_send" === e ? showFastBox({
                    title: t,
                    width: 460
                }, o, n) : showDoneBox(getLang("stories_mask_sent")), s = !1
            },
            onFail: function() {
                return s = !1, showFastBox({
                    title: getLang("global_box_error_title")
                }, getLang("global_unknown_error")), !0
            }
        }))
    }
    window.showStory = i, window.storiesPreloadStatic = a, window.sendMask = c
}, function(e, t) {
    var o = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return o.call(e, t)
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    'eat script';
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
    });
    var _videoplayer_lib_player_states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);

    function showVideo(e, t, o, n) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (!checkEvent(n)) {
            if (window.mvcur && mvcur.mvShown && mvcur.minimized && mvcur.videoRaw == e) return Videoview.unminimize(), !1;
            o || (o = {});
            var i = nav.objLoc.claim,
                r = !(!o.addParams || !/^-?\d+_\d+$/.test(o.addParams.post_id)) && o.addParams.post_id;
            if (!o.playlistId && r && (/^public|groups|profile$/.test(cur.module) && hasClass("post" + r, "own") ? o.playlistId = "wall_" + cur.oid : o.playlistId = "post_" + o.addParams.post_id), o.playlistId && (o.addParams = extend(o.addParams, {
                    playlist_id: o.playlistId
                }), !window.VideoPlaylist || !VideoPlaylist.getList(o.playlistId)))
                if (/^wall_/.test(o.playlistId)) {
                    var a = cur.wallVideos && cur.wallVideos[o.playlistId];
                    o.addParams.load_playlist = a && a.list.length >= 50 ? 0 : 1
                } else o.addParams.load_playlist = !/^(?:post_)?-?\d+_-?\d+$/.test(o.playlistId) || cur.pageVideosList && cur.pageVideosList[o.playlistId] ? 0 : 1;
            !o.expandPlayer && cur.videoInlinePlayer && cur.videoInlinePlayer.getVideoId() == e && cur.videoInlinePlayer.canExpand() && (o.expandPlayer = cur.videoInlinePlayer), o.expandPlayer && (o.addParams = extend(o.addParams, {
                expand_player: 1
            }), delete cur.videoInlinePlayer);
            var s = new CallHub(function() {
                o.hidden ? o.hidden(s.data, o, t, e) : Videoview.showVideo.apply(Videoview, s.data)
            }, 2);
            stManager.add(["videoview.js", "videoview.css", "page.js", "page.css"], function() {
                s.failed || (o.hidden || (revertLastInlineVideo(), Videoview.show(n, e, t, o)), s.done())
            }), extend(o, {
                onDone: function() {
                    var t = Array.prototype.slice.call(arguments);
                    t.unshift(e), s.data = t, s.done()
                },
                onFail: function(t) {
                    if (s.failed = 1, !o.hidden) {
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
            var c = o.params;
            return c || (c = {
                act: "show",
                video: e,
                list: t,
                autoplay: o.autoplay ? 1 : 0,
                ad_video: o.ad_video,
                module: o.module || currentModule() || "",
                svids: o.svids
            }), o.addParams && (c = extend(c, o.addParams)), trim(c.module) || extend(c, {
                _nol: JSON.stringify(nav.objLoc)
            }), i && (c.claim = i), ajax.post("al_video.php", c, o), vkImage().src = locProtocol + "//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-", cur.articleLayer && cur.articleLayer.videoOpened(), !1
        }
    }

    function showInlineVideo(videoId, listId, options, ev, thumb) {
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
        }, options.cache), cur.videoInlinePlayerDestroyerSet || (cur.destroy.push(destroyInlineVideoPlayer), cur.videoInlinePlayerDestroyerSet = 1), vkImage().src = "//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-", !1;

        function onDone(title, html, js, opts) {
            revertLastInlineVideo(), hide(thumb);
            var videoWrap = ce("div", {
                innerHTML: html
            }, {
                width: w,
                height: h
            });
            if (window._videoLastInlined = [videoWrap, thumb], thumb.parentNode.appendChild(videoWrap), cur.mvOpts = !(!opts || !opts.mvData) && opts.mvData, opts.player) {
                var container = domByClass(videoWrap, "video_box_wrap");
                isFunction(onLoaded) && (opts.player.params[0].onPlayerLoaded = onLoaded);
                var linkAttr = attr(thumb, "data-link-attr");
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
                audioPlayer && audioPlayer.isPlaying() && (audioPlayer.pause(), audioPlayer.pausedByVideo = vkNow())
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
    }

    function loadInlineVideo(e, t, o) {
        var n = extend({
            autoplay: 0,
            module: cur.module
        }, e);
        trim(n.module) || (n._nol = JSON.stringify(nav.objLoc));
        var i = ["videoview.js"];

        function r(e, o) {
            isFunction(t) && t(e, o)
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
                n = ge(e);
            if (n && (t = _videoLastInlined[0])) {
                for (; t = t.parentNode;)
                    if (t == n) {
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
            var e = cur.videoInlinePlayer || ge("video_yt") && window.VideoYoutube;
            if (e) {
                if (e.isActiveLive && e.isActiveLive()) return;
                cur.mvOpts.lastPlayerState = e.getState(), e.togglePlay(!1)
            }
        }
    }

    function playLastInlineVideo() {
        if (_videoLastInlined && cur.mvOpts && cur.mvOpts.lastPlayerState === _videoplayer_lib_player_states__WEBPACK_IMPORTED_MODULE_0__.PLAYING) {
            var e = cur.videoInlinePlayer || ge("video_yt") && window.VideoYoutube;
            e && e.togglePlay(!0)
        }
    }

    function checkMp4(e) {
        if (browser.smart_tv) e(!0);
        else if (ls.get("video_can_play_mp4")) e(!0);
        else {
            var t = window.sessionStorage && sessionStorage.getItem("video_can_play_mp4");
            if (null == t) {
                var o = void 0,
                    n = void 0,
                    i = ce("video");
                i.canPlayType && i.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"').replace("no", "") ? (i.onloadedmetadata = r.pbind(!0), i.onerror = function() {
                    r(!1, "error_" + i.error.code)
                }, i.src = "/images/blank.mp4", i.load(), o = setTimeout(r.pbind(!1, "timeout"), 3e3)) : r(!1, "video_type")
            } else e(!!intval(t))
        }

        function r(t, r) {
            if (!n) {
                n = !0;
                var a = t ? window.localStorage : window.sessionStorage;
                try {
                    a.setItem("video_can_play_mp4", intval(t))
                } catch (e) {}
                e(t, r), clearTimeout(o), i.src = "", i.load(), i.onerror = null, i.onloadedmetadata = null, i = null
            }
        }
    }
    window._videoLastInlined = !1, window.VideoConstants = {
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
    }, window.showVideo = showVideo, window.showInlineVideo = showInlineVideo, window.loadInlineVideo = loadInlineVideo, window.revertLastInlineVideo = revertLastInlineVideo, window.destroyInlineVideoPlayer = destroyInlineVideoPlayer, window.pauseLastInlineVideo = pauseLastInlineVideo, window.playLastInlineVideo = playLastInlineVideo, window.checkMp4 = checkMp4
}, function(e, t, o) {
    'eat script';
    var n = o(38),
        i = o(67),
        r = o(25),
        a = o(120);
    e.exports = o(15)(Array, "Array", function(e, t) {
        this._t = a(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            o = this._i++;
        return !e || o >= e.length ? (this._t = void 0, i(1)) : i(0, "keys" == t ? o : "values" == t ? e[o] : [o, e[o]])
    }, "values"), r.Arguments = r.Array, n("keys"), n("values"), n("entries")
}, function(e, t, o) {
    'eat script';
    o.r(t), o.d(t, "ge", function() {
        return r
    }), o.d(t, "geByTag", function() {
        return a
    }), o.d(t, "geByTag1", function() {
        return s
    }), o.d(t, "geByClass", function() {
        return c
    }), o.d(t, "geByClass1", function() {
        return l
    }), o.d(t, "gpeByClass", function() {
        return d
    }), o.d(t, "domQuery", function() {
        return _
    }), o.d(t, "domQuery1", function() {
        return u
    }), o.d(t, "domClosest", function() {
        return p
    }), o.d(t, "domClosestByTag", function() {
        return f
    }), o.d(t, "gpeByTag", function() {
        return h
    }), o.d(t, "ce", function() {
        return w
    }), o.d(t, "re", function() {
        return O
    }), o.d(t, "se", function() {
        return E
    }), o.d(t, "sech", function() {
        return k
    }), o.d(t, "rs", function() {
        return x
    }), o.d(t, "psr", function() {
        return C
    }), o.d(t, "domReplaceEl", function() {
        return T
    }), o.d(t, "domEL", function() {
        return j
    }), o.d(t, "domNS", function() {
        return L
    }), o.d(t, "domPS", function() {
        return P
    }), o.d(t, "domFC", function() {
        return M
    }), o.d(t, "domLC", function() {
        return D
    }), o.d(t, "domPN", function() {
        return B
    }), o.d(t, "domChildren", function() {
        return A
    }), o.d(t, "domInsertBefore", function() {
        return S
    }), o.d(t, "domInsertAfter", function() {
        return I
    }), o.d(t, "domByClass", function() {
        return R
    }), o.d(t, "domData", function() {
        return N
    }), o.d(t, "domChildIndex", function() {
        return W
    }), o.d(t, "domCA", function() {
        return U
    }), o.d(t, "domClosestSibling", function() {
        return F
    }), o.d(t, "matchesSelector", function() {
        return K
    }), o.d(t, "isHover", function() {
        return H
    }), o.d(t, "isAncestor", function() {
        return q
    }), o.d(t, "getScroll", function() {
        return V
    }), o.d(t, "domClosestPositioned", function() {
        return z
    }), o.d(t, "domClosestOverflowHidden", function() {
        return G
    }), o.d(t, "show", function() {
        return Y
    }), o.d(t, "hide", function() {
        return X
    }), o.d(t, "isVisible", function() {
        return $
    }), o.d(t, "clientHeight", function() {
        return Z
    }), o.d(t, "getClientRectOffsetY", function() {
        return Q
    }), o.d(t, "toggle", function() {
        return J
    }), o.d(t, "boundingRectEnabled", function() {
        return ee
    }), o.d(t, "getXYRect", function() {
        return te
    }), o.d(t, "getXY", function() {
        return oe
    }), o.d(t, "isWindow", function() {
        return ne
    }), o.d(t, "getSize", function() {
        return ie
    }), o.d(t, "getW", function() {
        return re
    }), o.d(t, "getH", function() {
        return ae
    }), o.d(t, "hasClass", function() {
        return se
    }), o.d(t, "addClass", function() {
        return ce
    }), o.d(t, "addClassDelayed", function() {
        return le
    }), o.d(t, "removeClass", function() {
        return de
    }), o.d(t, "removeClassDelayed", function() {
        return _e
    }), o.d(t, "toggleClass", function() {
        return ue
    }), o.d(t, "toggleClassDelayed", function() {
        return pe
    }), o.d(t, "replaceClass", function() {
        return fe
    }), o.d(t, "getStyle", function() {
        return he
    }), o.d(t, "setStyle", function() {
        return we
    }), o.d(t, "setStyleDelayed", function() {
        return ve
    }), o.d(t, "setPseudoStyle", function() {
        return be
    }), o.d(t, "data", function() {
        return ge
    }), o.d(t, "attr", function() {
        return me
    }), o.d(t, "removeAttr", function() {
        return ye
    }), o.d(t, "removeData", function() {
        return Oe
    }), o.d(t, "cleanElems", function() {
        return Ee
    }), o.d(t, "setTitle", function() {
        return ke
    }), o.d(t, "getZoom", function() {
        return xe
    }), o.d(t, "val", function() {
        return Ce
    }), o.d(t, "elfocus", function() {
        return Te
    }), o.d(t, "traverseParent", function() {
        return je
    }), o.d(t, "setDocumentTitle", function() {
        return Pe
    }), o.d(t, "lockDocumentTitle", function() {
        return Me
    });
    var n = o(95),
        i = o(11),
        r = function(e) {
            return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
        };

    function a(e, t) {
        return (t = r(t) || document).getElementsByTagName(e)
    }

    function s(e, t) {
        return (t = r(t) || document).querySelector && t.querySelector(e) || a(e, t)[0]
    }

    function c(e, t, o) {
        return t = r(t) || document, o = o || "*", e = ("." + e).replace(/\s+/gm, "."), Array.prototype.slice.call(t.querySelectorAll(o + e))
    }

    function l(e, t, o) {
        return t = r(t) || document, o = o || "*", t.querySelector && t.querySelector(o + ("." + e).replace(/\s+/gm, ".")) || c(e, t, o)[0]
    }

    function d(e, t, o) {
        if (!(t = r(t))) return null;
        for (; o !== t && (t = t.parentNode);)
            if (se(t, e)) return t;
        return null
    }

    function _(e, t) {
        return (t || document).querySelectorAll(e)
    }

    function u(e, t) {
        return (t || document).querySelector(e)
    }

    function p(e, t) {
        return se(t, e) ? t : d(e, t)
    }

    function f(e, t) {
        return e = e.toUpperCase(), t.nodeType === Node.ELEMENT_NODE && t.tagName.toUpperCase() === e ? t : h(e, t)
    }

    function h(e, t) {
        if (!(t = r(t))) return null;
        for (e = e.toUpperCase(); t = t.parentNode;)
            if (t.tagName && t.tagName.toUpperCase() === e) return t;
        return null
    }

    function w(e, t, o) {
        var i = document.createElement(e);
        return t && Object(n.extend)(i, t), o && we(i, o), i
    }
    var v, b, g, m, y = (v = document, b = v.createDocumentFragment(), g = v.createElement("div"), m = v.createRange && v.createRange(), b.appendChild(g), m && m.selectNodeContents(g), m && m.createContextualFragment ? function(e) {
        return e ? m.createContextualFragment(e) : v.createDocumentFragment()
    } : function(e) {
        if (!e) return v.createDocumentFragment();
        g.innerHTML = e;
        for (var t = v.createDocumentFragment(); g.firstChild;) t.appendChild(g.firstChild);
        return t
    });

    function O(e) {
        return (e = r(e)) && e.parentNode && e.parentNode.removeChild(e), e
    }
    var E = function(e) {
            return M(w("div", {
                innerHTML: e
            }))
        },
        k = function(e) {
            return A(w("div", {
                innerHTML: e
            }))
        };

    function x(e, t) {
        return Object(n.each)(t, function(t, o) {
            e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === o ? "" : o).toString().replace(/\$/g, "&#036;"))
        }), e
    }

    function C(e) {
        return "https:" !== locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
    }

    function T(e, t) {
        return Object(n.isString)(t) && (t = E(t)), B(e).replaceChild(t, e), t
    }

    function j(e, t) {
        for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
        return e
    }
    var L = function(e) {
            return j((e || {}).nextSibling)
        },
        P = function(e) {
            return j((e || {}).previousSibling, 1)
        },
        M = function(e) {
            return j((e || {}).firstChild)
        },
        D = function(e) {
            return j((e || {}).lastChild, 1)
        },
        B = function(e) {
            return (e || {}).parentNode
        };

    function A(e) {
        for (var t = [], o = e.childNodes, n = 0; n < o.length; n++) o[n].tagName && t.push(o[n]);
        return t
    }

    function S(e, t) {
        var o = B(t);
        return o && o.insertBefore(e, t)
    }

    function I(e, t) {
        var o = B(t);
        return o && o.insertBefore(e, L(t))
    }

    function R(e, t) {
        return e ? l(t, e) : e
    }

    function N(e, t, o) {
        return e ? void 0 !== o ? (null === o ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, o), o) : e.getAttribute("data-" + t) : null
    }

    function W(e) {
        for (var t = 0; null != (e = P(e));) t++;
        return t
    }

    function U(e, t) {
        do {
            e = B(e)
        } while (e && !K(e, t));
        return e
    }

    function F(e, t, o) {
        for (var n = null; null === n && e;)(e = -1 === o ? P(e) : L(e)) && K(e, t) && (n = e);
        return n
    }

    function K(e, t) {
        return !(!(e = r(e)) || e === document) && (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function(e) {
            for (var t = (this.document || this.ownerDocument).querySelectorAll(e), o = t.length; --o >= 0 && t.item(o) !== this;);
            return o > -1
        }).call(e, t)
    }

    function H(e) {
        return K(e, ":hover")
    }

    function q(e, t) {
        var o = r(e);
        if (t = r(t), !e || !t) return !1;
        for (; o = o.parentNode;)
            if (o === t) return !0;
        return !1
    }

    function V() {
        var e = browser.msie6 ? r("PageContainer") : document.body,
            t = document.documentElement;
        return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
    }

    function z(e, t) {
        for (var o = (t = t || {}).fromEl || B(e), i = t.positions || ["relative", "absolute", "fixed"]; o && o !== bodyNode;) {
            var r = he(o, "position");
            if (Object(n.inArray)(r, i) && (!t.noOverflow || "hidden" !== he(o, "overflow"))) break;
            o = B(o)
        }
        return o
    }

    function G(e, t) {
        for (var o = e = r(e), n = void 0, i = void 0, a = void 0, s = !1; o && o.tagName && o !== bodyNode;) {
            if (n = he(o, "position"), i = he(o, "overflow"), a = he(o, "transform"), t && browser.mozilla) {
                if ("page_wrap" != o.id && o !== e && "visible" !== i && ("static" === n ? !s || "relative" === s : "fixed" !== s)) break
            } else if (o !== e && "visible" !== i && ("static" === n ? !s || "relative" === s : "fixed" !== s)) break;
            "none" !== a ? s = void 0 : "static" !== n && "fixed" !== s && (s = n), o = B(o)
        }
        return o
    }

    function Y(e) {
        var t = arguments.length;
        if (t > 1)
            for (var o = 0; o < t; o++) Y(arguments[o]);
        else if ((e = r(e)) && e.style) {
            var n = e.olddisplay,
                i = e.tagName.toLowerCase(),
                a = "block";
            e.style.display = n || "", "none" === he(e, "display") && (a = se(e, "inline") || se(e, "_inline") ? "inline" : se(e, "_inline_block") ? "inline-block" : "tr" !== i || browser.msie ? "table" !== i || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = a)
        }
    }

    function X(e) {
        var t = arguments.length;
        if (t > 1)
            for (var o = 0; o < t; o++) X(arguments[o]);
        else if ((e = r(e)) && e.style) {
            var n = he(e, "display");
            e.olddisplay = "none" !== n ? n : "", e.style.display = "none"
        }
    }

    function $(e) {
        return !(!(e = r(e)) || !e.style) && "none" !== he(e, "display")
    }

    function Z() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function Q(e, t, o) {
        e = r(e), o = o || 0;
        var i = oe(e)[1],
            a = ie(e)[1],
            s = window,
            c = document.documentElement,
            l = Math.max(Object(n.intval)(s.innerHeight), Object(n.intval)(c.clientHeight)),
            d = r("page_header_cont"),
            _ = c.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            u = vk.staticheader ? Math.max(0, ie(d)[1] - _) : ie(d)[1];
        if (t) {
            if (i + a < _ + u + o) return i + a - _ - u - o;
            if (i > _ + l - o) return i - _ - l + o
        } else {
            if (i < _ + u + o) return i - _ - u - o;
            if (i + a > _ + l - o) return i + a - _ - l + o
        }
        return 0
    }

    function J(e, t) {
        return void 0 === t && (t = !$(e)), t ? Y(e) : X(e), t
    }

    function ee(e) {
        return void 0 !== e.getBoundingClientRect
    }

    function te(e, t) {
        var o = void 0;
        if (t && "inline" === he(e, "display")) {
            var n = e.getClientRects();
            o = n && n[0] || e.getBoundingClientRect()
        } else o = e.getBoundingClientRect();
        return o
    }

    function oe(e, t) {
        if (!(e = r(e))) return [0, 0];
        var o = e.ownerDocument,
            n = {
                top: 0,
                left: 0
            };
        if (!o) return [0, 0];
        var i = o.documentElement;
        ee(e) && (n = te(e, !0));
        var a = o === o.window ? o : 9 === o.nodeType && (o.defaultView || o.parentWindow);
        return [n.left + (t ? 0 : a.pageXOffset || i.scrollLeft) - (i.clientLeft || 0), n.top + (t ? 0 : a.pageYOffset || i.scrollTop) - (i.clientTop || 0)]
    }

    function ne(e) {
        return null != e && e === e.window
    }

    function ie(e, t, o) {
        e = r(e);
        var i = document.documentElement,
            a = [0, 0],
            s = void 0;
        if (t && "border-box" === he(e, "boxSizing") && (t = !1), e === document) a = [Math.max(i.clientWidth, bodyNode.scrollWidth, i.scrollWidth, bodyNode.offsetWidth, i.offsetWidth), Math.max(i.clientHeight, bodyNode.scrollHeight, i.scrollHeight, bodyNode.offsetHeight, i.offsetHeight)];
        else if (e) {
            var c = function() {
                a = ee(e) && (s = te(e, o)) && void 0 !== s.width ? [s.width, s.height] : [e.offsetWidth, e.offsetHeight], t && Object(n.each)(a, function(t, o) {
                    var i = t ? ["Top", "Bottom"] : ["Left", "Right"];
                    Object(n.each)(i, function() {
                        a[t] -= parseFloat(he(e, "padding" + this)) || 0, a[t] -= parseFloat(he(e, "border" + this + "Width")) || 0
                    })
                })
            };
            if ($(e)) c();
            else {
                var l = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    d = {},
                    _ = !1;
                e.style.cssText.indexOf("!important") > -1 && (_ = e.style.cssText), Object(n.each)(l, function(t, o) {
                    d[t] = e.style[t], e.style[t] = o
                }), c(), Object(n.each)(l, function(t, o) {
                    e.style[t] = d[t]
                }), _ && (e.style.cssText = _)
            }
        }
        return a
    }

    function re(e) {
        return ie(e)[0]
    }

    function ae(e) {
        return ie(e)[1]
    }

    function se(e, t) {
        var o = r(e);
        return o && 1 === o.nodeType && (" " + o.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0
    }

    function ce(e, t) {
        var o = r(e);
        o && !se(o, t) && (o.className = (o.className ? o.className + " " : "") + t)
    }
    window.whitespaceRegex = /[\t\r\n\f]/g;
    var le = function(e, t) {
        return setTimeout(ce.pbind(e, t), 0)
    };

    function de(e, t) {
        var o = r(e);
        o && (o.className = Object(n.trim)((o.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
    }
    var _e = function(e, t) {
        return setTimeout(de.pbind(e, t), 0)
    };

    function ue(e, t, o) {
        return void 0 === o && (o = !se(e, t)), (o ? ce : de)(e, t), o
    }

    function pe(e, t, o) {
        return void 0 === o && (o = !se(e, t)), (o ? le : _e)(e, t), o
    }

    function fe(e, t, o) {
        de(e, t), ce(e, o)
    }

    function he(e, t, o) {
        if (e = r(e), Object(n.isArray)(t)) {
            var i = {};
            return Object(n.each)(t, function(t, o) {
                return i[o] = he(e, o)
            }), i
        }
        if (!e) return "";
        if (void 0 === o && (o = !0), !o && "opacity" === t && browser.msie) {
            var a = e.style.filter;
            return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!o && e.style && (e.style[t] || "height" === t)) return e.style[t];
        var s = void 0,
            c = document.defaultView || window;
        if (c.getComputedStyle) {
            t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
            var l = c.getComputedStyle(e, null);
            l && (s = l.getPropertyValue(t))
        } else if (e.currentStyle) {
            if ("opacity" === t && browser.msie) {
                var d = e.currentStyle.filter;
                return d && d.indexOf("opacity=") >= 0 ? parseFloat(d.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var _ = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            });
            "auto" === (s = e.currentStyle[t] || e.currentStyle[_]) && (s = 0), s = (s + "").split(" "), Object(n.each)(s, function(t, o) {
                if (!/^\d+(px)?$/i.test(o) && /^\d/.test(o)) {
                    var n = e.style,
                        i = n.left,
                        r = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left, n.left = o || 0, s[t] = n.pixelLeft + "px", n.left = i, e.runtimeStyle.left = r
                }
            }), s = s.join(" ")
        }
        if (o && ("width" === t || "height" === t)) {
            var u = ie(e, !0)[{
                width: 0,
                height: 1
            }[t]];
            s = (Object(n.intval)(s) ? Math.max(Object(n.floatval)(s), u) : u) + "px"
        }
        return s
    }

    function we(e, t, o) {
        if (e = r(e))
            if (Object(n.isObject)(t)) Object(n.each)(t, function(t, o) {
                return we(e, t, o)
            });
            else if ("opacity" === t) browser.msie && ((o + "").length ? e.style.filter = 1 !== o ? "alpha(opacity=" + 100 * o + ")" : "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== o && (e.style.opacity = o);
        else try {
            var i = "number" == typeof o;
            i && /height|width/i.test(t) && (o = Math.abs(o)), o = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? o + "px" : o, e.style[t] !== o && (e.style[t] = o)
        } catch (e) {
            debugLog("setStyle error: ", [t, o], e)
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
        return setTimeout(we.pbind(e, t, o), 0)
    };

    function be(e, t, o) {
        var i = ge(e, "pseudo-id");
        i || (ge(e, "pseudo-id", i = Object(n.irand)(1e8, 999999999)), ce(e, "_pseudo_" + i));
        var a = t + "-style-" + i,
            s = r(a),
            c = "._pseudo_" + i + ":" + t + "{";
        s || (s = headNode.appendChild(w("style", {
            id: a,
            type: "text/css"
        }))), Object(n.each)(o, function(e, t) {
            c += e + ": " + t + " !important;"
        }), c += "}", s.sheet ? (s.sheet.cssRules.length && s.sheet.deleteRule(0), s.sheet.insertRule(c, 0)) : s.styleSheet && (s.styleSheet.cssText = c)
    }

    function ge(e, t, o) {
        if (!e) return !1;
        var n = e[vkExpand];
        return n || (n = e[vkExpand] = ++vkUUID), void 0 !== o && (vkCache[n] || (vkCache[n] = {}, window.__debugMode && (vkCache[n].__elem = e)), vkCache[n][t] = o), t ? vkCache[n] && vkCache[n][t] : n
    }

    function me(e, t, o) {
        return e = r(e), void 0 === o ? e.getAttribute(t) : (e.setAttribute(t, o), o)
    }

    function ye(e) {
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

    function Oe(e, t) {
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
                    n || Oe(e)
                }
            } else Object(i.removeEvent)(e), ye(e, vkExpand), delete vkCache[o]
    }

    function Ee() {
        for (var e = arguments, t = 0; t < e.length; ++t) {
            var o = r(e[t]);
            o && (Oe(o), ye(o, "btnevents"))
        }
    }

    function ke(e, t, o) {
        if ((e = r(e)) && !e.titleSet) {
            if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", o || e.innerText || e.textContent);
            else {
                var n = s("b", e);
                n && n.scrollWidth > n.clientWidth ? e.setAttribute("title", o || e.innerText || e.textContent) : e.removeAttribute("title")
            }
            e.titleSet = 1
        }
    }

    function xe() {
        var e = r("zoom_test_1") || document.body.appendChild(w("div", {
            id: "zoom_test_1"
        }, {
            left: "10%",
            position: "absolute",
            visibility: "hidden"
        }));
        return (r("zoom_test_2") || document.body.appendChild(w("div", {
            id: "zoom_test_2"
        }, {
            left: e.offsetLeft + "px",
            position: "absolute",
            visibility: "hidden"
        }))).offsetLeft / e.offsetLeft
    }

    function Ce(e, t, o) {
        if (e = r(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !o && e.phonblur && e.phonblur()) : "INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !o && Object(i.triggerEvent)(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value : e.innerHTML) || ""
    }

    function Te(e, t, o) {
        e = r(e);
        try {
            e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== o && !1 !== o || (o = t), e.setSelectionRange && e.setSelectionRange(t, o)
        } catch (e) {}
    }

    function je(e, t, o) {
        for (e = r(e), o = o || 999; e && !t(e);) {
            if (0 === --o) return !1;
            try {
                if ((e = B(e)) === document) break
            } catch (t) {
                e = !1
            }
        }
        return e
    }
    window.vkExpand = window.vkExpand || "VK" + Object(n.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
    var Le = !1;

    function Pe(e) {
        if (!Le) return window.document.title = Object(n.replaceEntities)(e)
    }

    function Me(e) {
        Le = e, e && window.cur && window.cur.destroy.push(function() {
            Me(!1)
        })
    }
    window.ge = r, window.geByTag = a, window.geByTag1 = s, window.geByClass = c, window.geByClass1 = l, window.gpeByClass = d, window.domQuery = _, window.domQuery1 = u, window.domClosest = p, window.ce = w, window.cf = y, window.re = O, window.se = E, window.sech = k, window.rs = x, window.psr = C, window.domReplaceEl = T, window.domEL = j, window.domNS = L, window.domPS = P, window.domFC = M, window.domLC = D, window.domPN = B, window.domChildren = A, window.domInsertBefore = S, window.domInsertAfter = I, window.domByClass = R, window.domData = N, window.domChildIndex = W, window.domCA = U, window.domClosestSibling = F, window.matchesSelector = K, window.isHover = H, window.isAncestor = q, window.getScroll = V, window.domClosestPositioned = z, window.domClosestOverflowHidden = G, window.show = Y, window.hide = X, window.isVisible = $, window.clientHeight = Z, window.getClientRectOffsetY = Q, window.toggle = J, window.boundingRectEnabled = ee, window.getXYRect = te, window.getXY = oe, window.isWindow = ne, window.getSize = ie, window.hasClass = se, window.addClass = ce, window.addClassDelayed = le, window.removeClass = de, window.removeClassDelayed = _e, window.toggleClass = ue, window.toggleClassDelayed = pe, window.replaceClass = fe, window.getStyle = he, window.setStyle = we, window.setStyleDelayed = ve, window.setPseudoStyle = be, window.data = ge, window.attr = me, window.removeAttr = ye, window.removeData = Oe, window.cleanElems = Ee, window.setTitle = ke, window.getZoom = xe, window.val = Ce, window.elfocus = Te, window.traverseParent = je, window.getH = ae, window.getW = re, window.domClosestByTag = f, window.setDocumentTitle = Pe, window.lockDocumentTitle = Me
}, function(e, t, o) {
    var n = o(100),
        i = o(62).set;
    e.exports = function(e, t, o) {
        var r, a = t.constructor;
        return a !== o && "function" == typeof a && (r = a.prototype) !== o.prototype && n(r) && i && i(e, r), e
    }
}, function(e, t, o) {
    var n = o(100);
    e.exports = function(e) {
        if (!n(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t, o) {
    var n = o(59),
        i = n["__core-js_shared__"] || (n["__core-js_shared__"] = {});
    e.exports = function(e) {
        return i[e] || (i[e] = {})
    }
}, function(e, t, o) {
    'eat script';
    var n = o(59),
        i = o(74),
        r = o(30),
        a = o(64),
        s = o(32),
        c = o(9),
        l = o(19),
        d = o(100),
        _ = o(87),
        u = o(51),
        p = o(81),
        f = o(110);
    e.exports = function(e, t, o, h, w, v) {
        var b = n[e],
            g = b,
            m = w ? "set" : "add",
            y = g && g.prototype,
            O = {},
            E = function(e) {
                var t = y[e];
                r(y, e, "delete" == e ? function(e) {
                    return !(v && !d(e)) && t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return !(v && !d(e)) && t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return v && !d(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, o) {
                    return t.call(this, 0 === e ? 0 : e, o), this
                })
            };
        if ("function" == typeof g && (v || y.forEach && !_(function() {
                (new g).entries().next()
            }))) {
            var k = new g,
                x = k[m](v ? {} : -0, 1) != k,
                C = _(function() {
                    k.has(1)
                }),
                T = u(function(e) {
                    new g(e)
                }),
                j = !v && _(function() {
                    for (var e = new g, t = 5; t--;) e[m](t, t);
                    return !e.has(-0)
                });
            T || ((g = t(function(t, o) {
                l(t, g, e);
                var n = f(new b, t, g);
                return void 0 != o && c(o, w, n[m], n), n
            })).prototype = y, y.constructor = g), (C || j) && (E("delete"), E("has"), w && E("get")), (j || x) && E(m), v && y.clear && delete y.clear
        } else g = h.getConstructor(t, e, w, m), a(g.prototype, o), s.NEED = !0;
        return p(g, e), O[e] = g, i(i.G + i.W + i.F * (g != b), O), v || h.setStrong(g, e, w), g
    }
}, function(e, t, o) {
    'eat script';
    var n = o(61);
    e.exports = o(113)("Map", function(e) {
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
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, o) {
    e.exports = !o(3) && !o(87)(function() {
        return 7 != Object.defineProperty(o(90)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, o) {
    var n = o(112)("keys"),
        i = o(41);
    e.exports = function(e) {
        return n[e] || (n[e] = i(e))
    }
}, function(e, t, o) {
    'eat script';
    var n = o(35)(!0);
    o(15)(String, "String", function(e) {
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
    'eat script';
    o.r(t), o.d(t, "scrollToY", function() {
        return a
    }), o.d(t, "scrollToTop", function() {
        return s
    }), o.d(t, "scrollGetX", function() {
        return c
    }), o.d(t, "scrollGetY", function() {
        return l
    }), o.d(t, "disableBodyScroll", function() {
        return d
    }), o.d(t, "enableBodyScroll", function() {
        return _
    });
    var n = o(6),
        i = o(43),
        r = o(109);

    function a(e, t, o, s) {
        if (void 0 == t && (t = 400), "ontouchstart" in document.documentElement && (t = 0), s || (e = Math.max(0, e - (vk.staticheader ? 0 : Object(r.getSize)("page_header_cont")[1]))), Object(r.data)(bodyNode, "tween") && Object(r.data)(bodyNode, "tween").stop(!1), Object(r.data)(htmlNode, "tween") && Object(r.data)(htmlNode, "tween").stop(!1), window.scrollAnimation = !1, t) {
            var d = function() {
                window.scrollAnimation = !1, 2 === o && ("profile" != cur.module && "public" != cur.module && "group" != cur.module && "groups" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, void 0, !0), Object(n.updSideTopLink)())
            };
            window.scrollAnimation = !0, Object(i.animate)(htmlNode, {
                scrollTop: e
            }, {
                duration: t,
                transition: Fx.Transitions.sineInOut,
                onComplete: d
            }), Object(i.animate)(bodyNode, {
                scrollTop: e
            }, {
                duration: t,
                transition: Fx.Transitions.sineInOut,
                onComplete: d
            })
        } else {
            if (o && 2 !== o) {
                "profile" != cur.module && "public" != cur.module && "group" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, e, !0);
                var _ = l() - e;
                return Math.abs(_) > 6 && a(e + (_ > 0 ? 6 : -6), 0, 2, !0), Object(n.updSideTopLink)(), clearTimeout(window.scrlToTO), void(window.scrlToTO = setTimeout(a.pbind(e, 100, 2, !0), 0))
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

    function l() {
        return window.pageYOffset || scrollNode.scrollTop || document.documentElement.scrollTop
    }

    function d() {
        bodyNode.style.overflow = "hidden"
    }

    function _() {
        bodyNode.style.overflow = "auto"
    }
    window.scrollToY = a, window.scrollToTop = s, window.scrollGetX = c, window.scrollGetY = l, window.disableBodyScroll = d, window.enableBodyScroll = _
}, function(e, t, o) {
    var n = o(72),
        i = o(22);
    e.exports = function(e) {
        return n(i(e))
    }
}, function(e, t, o) {
    'eat script';
    o.r(t);
    var n, i, r, a, s, c, l, d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
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
    }(), s = n.BlobBuilder || n.WebKitBlobBuilder || n.MozBlobBuilder || n.MSBlobBuilder, c = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, l = (r || s) && n.atob && n.ArrayBuffer && n.Uint8Array && function(e) {
        var t, o, n, i, l, d, _, u, p;
        if (!(t = e.match(c))) throw new Error("invalid data URI");
        for (o = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), n = !!t[4], i = e.slice(t[0].length), l = n ? atob(i) : decodeURIComponent(i), d = new ArrayBuffer(l.length), _ = new Uint8Array(d), u = 0; u < l.length; u += 1) _[u] = l.charCodeAt(u);
        return r ? new Blob([a ? _ : d], {
            type: o
        }) : ((p = new s).append(d), p.getBlob(o))
    }, n.HTMLCanvasElement && !i.toBlob && (i.mozGetAsFile ? i.toBlob = function(e, t, o) {
        e(o && i.toDataURL && l ? l(this.toDataURL(t, o)) : this.mozGetAsFile("blob", t))
    } : i.toDataURL && l && (i.toBlob = function(e, t, o) {
        e(l(this.toDataURL(t, o)))
    })), "function" == typeof define && define.amd ? define(function() {
        return l
    }) : "object" == ("undefined" == typeof module ? "undefined" : d(module)) && module.exports ? module.exports = l : n.dataURLtoBlob = l
}]);