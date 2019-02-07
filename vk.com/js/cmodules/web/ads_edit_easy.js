! function(e) {
    var t = {};

    function n(o) {
        if (t[o]) return t[o].exports;
        var i = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) n.d(o, i, function(t) {
                return e[t]
            }.bind(null, i));
        return o
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 215)
}({
    126: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "animate", function() {
            return a
        }), n.d(t, "cubicBezier", function() {
            return _
        }), n.d(t, "fadeTo", function() {
            return c
        }), n.d(t, "FxBase", function() {
            return l
        }), n.d(t, "Fx", function() {
            return u
        }), n.d(t, "genFx", function() {
            return d
        }), n.d(t, "slideDown", function() {
            return p
        }), n.d(t, "slideUp", function() {
            return h
        }), n.d(t, "slideToggle", function() {
            return m
        }), n.d(t, "fadeIn", function() {
            return g
        }), n.d(t, "fadeOut", function() {
            return b
        }), n.d(t, "fadeToggle", function() {
            return f
        }), n.d(t, "getRGB", function() {
            return E
        }), n.d(t, "getColor", function() {
            return O
        }), n.d(t, "animateCount", function() {
            return y
        });
        var o = n(240),
            i = n(230),
            s = n(191),
            r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };

        function a(e, t, n, a) {
            if (e = Object(i.ge)(e)) {
                var _ = Object(o.isFunction)(a) ? a : function() {},
                    c = Object(o.extend)({}, "object" === (void 0 === n ? "undefined" : r(n)) ? n : {
                        duration: n,
                        onComplete: _
                    }),
                    u = {},
                    d = {},
                    p = Object(i.isVisible)(e),
                    h = void 0;
                c.orig = {}, (t = Object(o.clone)(t)).discrete && (c.discrete = 1, delete t.discrete), s.browser.iphone && (c.duration = 0);
                var m = Object(i.data)(e, "tween"),
                    g = p ? "hide" : "show";
                for (var b in m && m.isTweening && (c.orig = Object(o.extend)(c.orig, m.options.orig), m.stop(!1), m.options.show ? g = "hide" : m.options.hide && (g = "show")), t)
                    if (t.hasOwnProperty(b)) {
                        if (!m && ("show" === t[b] && p || "hide" === t[b] && !p)) return c.onComplete.call(this, e);
                        if ("height" !== b && "width" !== b || !e.style || (t.overflow || (void 0 === c.orig.overflow && (c.orig.overflow = Object(i.getStyle)(e, "overflow")), e.style.overflow = "hidden"), Object(i.hasClass)(e, "inl_bl") || "TD" === e.tagName || (e.style.display = "block")), /show|hide|toggle/.test(t[b]))
                            if ("toggle" === t[b] && (t[b] = g), "show" === t[b]) {
                                h = 0, c.show = !0, void 0 === c.orig[b] && (c.orig[b] = Object(i.getStyle)(e, b, !1) || "", Object(i.setStyle)(e, b, 0));
                                var f = e.style[b];
                                e.style[b] = c.orig[b], t[b] = parseFloat(Object(i.getStyle)(e, b, !0)), e.style[b] = f, "height" === b && s.browser.msie && !t.overflow && (e.style.overflow = "hidden")
                            } else void 0 === c.orig[b] && (c.orig[b] = Object(i.getStyle)(e, b, !1) || ""), c.hide = !0, t[b] = 0
                    }
                return c.show && !p && Object(i.show)(e), m = new l(e, c), Object(o.each)(t, function(t, n) {
                    if (/backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|borderColor|outlineColor/.test(t)) {
                        if (h = O(e, "borderColor" === t ? "borderTopColor" : t), n = E(n), void 0 === h) return
                    } else {
                        var s = n.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/);
                        s && (n = parseFloat(s[2]), s[1] && (n = ("-=" == s[1] ? -1 : 1) * n + n)), 0 != (h = m.cur(t, !0)) || "width" !== t && "height" !== t || (h = 1), "opacity" === t && n > 0 && !p && (Object(i.setStyle)(e, "opacity", 0), h = 0, Object(i.show)(e))
                    }(h != n || Object(o.isArray)(h) && h.join(",") === n.join(",")) && (u[t] = h, d[t] = n)
                }), m.start(u, d), Object(i.data)(e, "tween", m), m
            }
        }

        function _(e, t, n, o, i, s) {
            var r = function(t) {
                    var o = 1 - t;
                    return 3 * o * o * t * e + 3 * o * t * t * n + t * t * t
                },
                a = function(e) {
                    var n = 1 - e;
                    return 3 * n * n * e * t + 3 * n * e * e * o + e * e * e
                },
                _ = function(t) {
                    var o = 1 - t;
                    return 3 * (2 * (t - 1) * t + o * o) * e + 3 * (-t * t * t + 2 * o * t) * n
                },
                c = i,
                l = void 0,
                u = void 0;
            for (l = c, u = 0; u < 8; u++) {
                var d = r(l) - c;
                if (Math.abs(d) < s) return a(l);
                var p = _(l);
                if (Math.abs(p) < 1e-6) break;
                l -= d / p
            }
            var h = 0,
                m = 1;
            if ((l = c) < h) return a(h);
            if (l > m) return a(m);
            for (; h < m;) {
                var g = r(l);
                if (Math.abs(g - c) < s) return a(l);
                c > g ? h = l : m = l, l = .5 * (m - h) + h
            }
            return a(l)
        }

        function c(e, t, n, o) {
            return a(e, {
                opacity: n
            }, t, o)
        }
        var l = function() {
                function e(t, n, s) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.el = Object(i.ge)(t), this.name = s, this.options = Object(o.extend)({
                        onStep: function() {},
                        onComplete: function() {},
                        transition: n.transition || u.Transitions.sineInOut,
                        duration: 500
                    }, n || {})
                }
                return e.prototype.start = function(e, t) {
                    var n = this;
                    this.from = e, this.to = t, this.time = Object(o.vkNow)(), this.isTweening = !0;
                    var i = function(e) {
                        return n.step(e)
                    };
                    return i.el = this.el, i() && u.Timers.push(i) && !u.TimerId && (u.TimerId = setInterval(function() {
                        for (var e = u.Timers, t = e.length, n = 0; n < t; n++) e[n]() || (e.splice(n--, 1), t--);
                        t || (clearInterval(u.TimerId), u.TimerId = null)
                    }, 13)), this
                }, e.prototype.stop = function(e) {
                    for (var t = u.Timers, n = t.length - 1; n >= 0; n--) t[n].el === this.el && (e && t[n](!0), t.splice(n, 1));
                    this.isTweening = !1
                }, e.prototype.step = function(e) {
                    var t = Object(o.vkNow)();
                    if (!e && t < this.time + this.options.duration) {
                        for (var n in this.cTime = t - this.time, this.now = {}, this.to)
                            if (Object(o.isArray)(this.to[n])) {
                                for (var s = [], r = 0; r < 3; r++) {
                                    if (void 0 === this.from[n] || void 0 === this.to[n]) return !1;
                                    s.push(Math.min(parseInt(this.compute(this.from[n][r], this.to[n][r])), 255))
                                }
                                this.now[n] = s
                            } else this.now[n] = this.compute(this.from[n], this.to[n]), this.options.discrete && (this.now[n] = Object(o.intval)(this.now[n]));
                        return this.update(), !0
                    }
                    return setTimeout(this.options.onComplete.bind(this, this.el), 10), this.now = Object(o.extend)(this.to, this.options.orig), this.update(), this.options.hide && Object(i.hide)(this.el), this.isTweening = !1, !1
                }, e.prototype.compute = function(e, t) {
                    var n = t - e;
                    return this.options.transition(this.cTime, e, n, this.options.duration)
                }, e.prototype.update = function() {
                    for (var e in this.options.onStep(this.now), this.now) Object(o.isArray)(this.now[e]) ? Object(i.setStyle)(this.el, e, "rgb(" + this.now[e].join(",") + ")") : void 0 !== this.el[e] ? this.el[e] = this.now[e] : Object(i.setStyle)(this.el, e, this.now[e])
                }, e.prototype.cur = function(e, t) {
                    return null == this.el[e] || this.el.style && null != this.el.style[e] ? parseFloat(Object(i.getStyle)(this.el, e, t)) || 0 : this.el[e]
                }, e
            }(),
            u = {
                Base: l,
                Transitions: {
                    linear: function(e, t, n, o) {
                        return n * e / o + t
                    },
                    sineInOut: function(e, t, n, o) {
                        return -n / 2 * (Math.cos(Math.PI * e / o) - 1) + t
                    },
                    halfSine: function(e, t, n, o) {
                        return n * Math.sin(Math.PI * (e / o) / 2) + t
                    },
                    easeOutBack: function(e, t, n, o) {
                        var i = 1.70158;
                        return n * ((e = e / o - 1) * e * ((i + 1) * e + i) + 1) + t
                    },
                    easeInCirc: function(e, t, n, o) {
                        return -n * (Math.sqrt(1 - (e /= o) * e) - 1) + t
                    },
                    easeOutCirc: function(e, t, n, o) {
                        return n * Math.sqrt(1 - (e = e / o - 1) * e) + t
                    },
                    easeInQuint: function(e, t, n, o) {
                        return n * (e /= o) * e * e * e * e + t
                    },
                    easeOutQuint: function(e, t, n, o) {
                        return n * ((e = e / o - 1) * e * e * e * e + 1) + t
                    },
                    easeOutCubic: function(e, t, n, o) {
                        return n * ((e = e / o - 1) * e * e + 1) + t
                    },
                    swiftOut: function(e, t, n, o) {
                        return n * _(.4, 0, .22, 1, e / o, 4 / o) + t
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

        function d(e, t) {
            var n = {};
            return Object(o.each)(u.Attrs.concat.apply([], u.Attrs.slice(0, t)), function() {
                n[this] = e
            }), n
        }
        var p = function(e, t, n) {
                return a(e, d("show", 1), t, n)
            },
            h = function(e, t, n) {
                return a(e, d("hide", 1), t, n)
            },
            m = function(e, t, n) {
                return a(e, d("toggle", 1), t, n)
            },
            g = function(e, t, n) {
                return a(e, {
                    opacity: "show"
                }, t, n)
            },
            b = function(e, t, n) {
                return a(e, {
                    opacity: "hide"
                }, t, n)
            },
            f = function(e, t, n) {
                return a(e, {
                    opacity: "toggle"
                }, t, n)
            };

        function E(e) {
            var t = void 0;
            return e && Object(o.isArray)(e) && 3 == e.length ? e : (t = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) ? [parseInt(t[1]), parseInt(t[2]), parseInt(t[3])] : (t = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e)) ? [2.55 * parseFloat(t[1]), 2.55 * parseFloat(t[2]), 2.55 * parseFloat(t[3])] : (t = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : (t = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e)) ? [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)] : void 0
        }

        function O(e, t) {
            var n = void 0;
            do {
                if (0 === (n = Object(i.getStyle)(e, t)).indexOf("rgba") && (n = ""), "" != n && "transparent" !== n || "body" === e.nodeName.toLowerCase()) break;
                t = "backgroundColor", e = e.parentNode
            } while (e);
            return E(n)
        }

        function y(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (e = Object(i.ge)(e), t = n.str ? Object(o.trim)(t.toString()) || "" : Object(o.positive)(t), e)
                if (!s.browser.mobile || s.browser.safari_mobile || s.browser.android) {
                    var r = Object(i.data)(e, "curCount"),
                        _ = Object(i.data)(e, "nextCount");
                    if ("number" == typeof _ || n.str && "string" == typeof _) t != _ && Object(i.data)(e, "nextCount", t);
                    else if ("number" == typeof r || n.str && "string" == typeof r) t !== r && Object(i.data)(e, "nextCount", t);
                    else if (r = n.str ? Object(o.trim)(Object(i.val)(e).toString()) || "" : Object(o.positive)(Object(i.val)(e)), "auto" === n.str && (n.str = !r.match(/^\d+$/) || !t.match(/^\d+$/), n.str || (r = Object(o.positive)(r), t = Object(o.positive)(t))), r !== t) {
                        Object(i.data)(e, "curCount", t);
                        var c, l = n.str ? r.length === t.length ? r < t : r.length < t.length : r < t,
                            d = (l ? t : r).toString(),
                            p = (l ? r : t).toString(),
                            h = void 0,
                            m = [],
                            g = [];
                        for (n.str || (p = new Array(d.length - p.length + 1).join("0") + p), h = 0, c = d.length; h < c; h++) {
                            var b = d.charAt(h);
                            if (b !== p.charAt(h)) break;
                            m.push(b)
                        }
                        var f = d.substr(h),
                            E = p.substr(h);
                        if (n.str) {
                            for (h = f.length; h > 0; h--) {
                                var O = f.charAt(h);
                                if (O !== E.charAt(h)) break;
                                g.unshift(O)
                            }
                            g.length && (f = f.substr(0, h + 1), E = E.substr(0, h + 1))
                        }
                        m = m.join("").replace(/\s$/, "&nbsp;"), g = g.join("").replace(/^\s/, "&nbsp;"), Object(o.trim)(Object(i.val)(e)) || n.noSpaceIfEmpty || Object(i.val)(e, "&nbsp;");
                        var v = e.clientHeight || e.offsetHeight;
                        Object(i.val)(e, '<div class="counter_wrap inl_bl"></div>');
                        var w, C = e.firstChild,
                            P = void 0,
                            D = void 0,
                            x = void 0,
                            M = !0;
                        m.length && C.appendChild(P = Object(i.ce)("div", {
                            className: "counter_const inl_bl",
                            innerHTML: m
                        })), m.length || (E = E.replace(/^0+/, "")), E && ("0" !== E || m.length) || (E = n.noSpaceIfEmpty ? "" : "&nbsp;", M = !!m.length), C.appendChild(x = Object(i.ce)("div", {
                            className: "counter_anim_wrap inl_bl"
                        })), x.appendChild(w = Object(i.ce)("div", {
                            className: "counter_anim " + (l ? "counter_anim_inc" : "counter_anim_dec"),
                            innerHTML: '<div class="counter_anim_big"><span class="counter_anim_big_c">' + f + "</span></div>" + (M ? '<div class="counter_anim_small"><span class="counter_anim_small_c">' + E + "</span></div>" : "")
                        }, M ? {
                            marginTop: l ? -v : 0
                        } : {
                            right: 0
                        })), n.str && Object(i.setStyle)(w, {
                            textAlign: "right",
                            right: 0
                        });
                        var T = Object(i.getSize)(Object(i.geByClass1)("counter_anim_big_c", w, "span"))[0],
                            j = M ? "&nbsp;" === E ? T : Object(i.getSize)(Object(i.geByClass1)("counter_anim_small_c", w, "span"))[0] : 0;
                        !E && n.noSpaceIfEmpty && (j = 0), g.length && C.appendChild(D = Object(i.ce)("div", {
                            className: "counter_const inl_bl",
                            innerHTML: g
                        })), n.noWrapWidth || Object(i.setStyle)(C, {
                            width: (P && Object(i.getSize)(P)[0] || 0) + (D && Object(i.getSize)(D)[0] || 0) + T + 0
                        }), void 0 === s.browser.csstransitions && (s.browser.csstransitions = s.browser.chrome && s.browser.version >= 9 || s.browser.mozilla && s.browser.version >= 4 || s.browser.opera && s.browser.version >= 10.5 || s.browser.safari && s.browser.version >= 3.2 || s.browser.safari_mobile || s.browser.android);
                        var B = s.browser.csstransitions;
                        Object(i.setStyle)(x, {
                            width: l ? j : T
                        });
                        var L = function() {
                                Object(i.val)(e, t || (n.noSpaceIfEmpty ? "" : " "));
                                var o = Object(i.data)(e, "nextCount");
                                Object(i.data)(e, "curCount", !1), Object(i.data)(e, "nextCount", !1), ("number" == typeof o || n.str && "string" == typeof o) && setTimeout(y.pbind(e, o, n), 0), n.onDone && n.onDone()
                            },
                            k = M ? {
                                marginTop: l ? 0 : -v
                            } : {
                                marginRight: l ? -j : 0
                            };
                        B ? (Object(i.getStyle)(x, "width"), Object(i.addClass)(x, "counter_css_anim_wrap"), T !== j && Object(i.setStyle)(x, {
                            width: l ? T : j
                        }), M && Object(i.setStyle)(w, k), setTimeout(L, 300), n.fadeMode && (Object(i.setStyle)(Object(i.geByClass1)("counter_anim_big", e), "opacity", 1), Object(i.setStyle)(Object(i.geByClass1)("counter_anim_small", e), "opacity", 0))) : (T !== j && a(x, {
                            width: l ? T : j
                        }, {
                            duration: 100
                        }), M ? a(w, k, {
                            duration: 300,
                            transition: u.Transitions.easeOutCirc,
                            onComplete: L
                        }) : setTimeout(L, 300))
                    }
                } else Object(i.val)(e, t || "")
        }
    },
    138: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "hasAccessibilityMode", function() {
            return a
        }), n.d(t, "updateOnlineText", function() {
            return _
        }), n.d(t, "updateAriaCheckboxes", function() {
            return c
        }), n.d(t, "updateAriaRadioBtns", function() {
            return l
        }), n.d(t, "updateAriaElements", function() {
            return u
        });
        var o = n(327),
            i = n(240),
            s = n(230),
            r = n(164);

        function a() {
            return !(!window.vk || !vk.a11y)
        }

        function _() {
            clearTimeout(cur.updateOnlineTO), cur.updateOnlineTO = setTimeout(function() {
                Object(i.each)(Object(s.geByClass)("_online"), function() {
                    var e = Object(s.geByClass1)("_online_reader", this) || this,
                        t = Object(s.hasClass)(this, "online"),
                        n = Object(s.hasClass)(this, "mobile"),
                        o = Object(s.geByTag)("img", e),
                        a = function(e) {
                            var t = Object(s.domClosest)("_post", e),
                                n = t && Object(s.domByClass)(t, "author");
                            return n ? n.innerText || n.textContent : ""
                        };
                    if (t) {
                        var _ = "";
                        Object(i.each)(o, function() {
                            var e = Object(s.attr)(this, "alt") || Object(s.attr)(this, "data-alt") || a(this);
                            e && (_ = Object(i.trim)(_ + " " + e), this.setAttribute("data-alt", e), this.removeAttribute("alt"))
                        }), _ = Object(i.trim)(_ + " " + (n ? Object(r.getLang)("global_user_is_online_mobile") : Object(r.getLang)("global_user_is_online"))), e.setAttribute("aria-label", _)
                    } else Object(i.each)(o, function() {
                        var e = Object(s.attr)(this, "data-alt") || a(this);
                        e && (this.setAttribute("alt", e), this.removeAttribute("data-alt"))
                    }), e.removeAttribute("aria-label")
                })
            }, 100)
        }

        function c() {
            clearTimeout(cur.updateChkBoxTO), cur.updateChkBoxTO = setTimeout(function() {
                var e = [];
                Object(i.each)(["checkbox", "checkbox_pic"], function() {
                    e = e.concat(Object(s.geByClass)(this))
                }), Object(i.each)(e, function() {
                    "DIV" !== this.tagName || this.getAttribute("role") || (this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", Object(o.isChecked)(this) ? "true" : "false"), this.setAttribute("tabindex", 0))
                })
            }, 100)
        }

        function l() {
            clearTimeout(cur.updateRadioBtnsTO), cur.updateRadioBtnsTO = setTimeout(function() {
                var e = [],
                    t = Object(s.geByClass)("radiobtn");
                Object(i.each)(t, function() {
                    if ("DIV" === this.tagName && !this.getAttribute("role")) {
                        var t = Object(o.isChecked)(this);
                        this.setAttribute("role", "radio"), this.setAttribute("aria-checked", t ? "true" : "false"), this.setAttribute("tabindex", t ? 0 : -1);
                        var n = function(e) {
                            var t = 0,
                                n = e;
                            for (; t < 5 && n !== document;) {
                                n = Object(s.domPN)(n);
                                var o = Object(s.geByClass)("radiobtn", n);
                                if (o.length > 1) break;
                                t++
                            }
                            return n
                        }(this);
                        ~e.indexOf(n) || e.push(n)
                    }
                }), Object(i.each)(e, function() {
                    if (!Object(s.geByClass)("on", this).length) {
                        var e = Object(s.geByClass)("radiobtn", this);
                        e.length && e[0].setAttribute("tabindex", 0)
                    }
                })
            }, 100)
        }

        function u() {
            _(), c(), l()
        }
    },
    159: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
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
        var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(240),
            _ui_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(169),
            _debug_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(345),
            _cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(325),
            _ajax__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(202),
            _message_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(236),
            _dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(230),
            _lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(164),
            _browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(191),
            _accessibility__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(138),
            _dom_events__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(288),
            _scroll__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(57);

        function throttleAccumulate(e, t) {
            var n = [],
                o = 0;
            return function(i) {
                n.push(i), o || (o = setTimeout(function() {
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
                    var i = new Date;
                    console.debug("%cLP:[" + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds() + ":" + i.getMilliseconds() + "]%c " + e, o, n)
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
                var i = this,
                    s = arguments,
                    r = n && !o;
                clearTimeout(o), o = setTimeout(function() {
                    o = null, n || e.apply(i, s)
                }, t), r && e.apply(this, s)
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
            Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(e, function(e, t) {
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

        function checkTextLength(e, t, n, o, i, s, r) {
            var a = t.getValue ? t.getValue() : t.value,
                _ = t.lastLen || 0;
            if (t.lastLen !== a.length || s) {
                t.lastLen = a.length;
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
                    u = {
                        1037: 1,
                        1104: 1,
                        1117: 1
                    };
                i && (c[","] = 5);
                var d = function(e) {
                    for (var t = 0, n = 0, o = e.length; n < o; n++) {
                        var i = c[e.charAt(n)],
                            s = e.charCodeAt(n);
                        t += void 0 !== i ? i : !r && s >= 128 && (s < 1025 || u[s] || s > 1119) && !l[s] && (s < 8220 || s > 8222) && (s < 8224 || s > 8226) ? ("&#" + s + ";").length : 1
                    }
                    return t
                }(a);
                if (n = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)(n), d > Math.max(e - 100, .75 * e))
                    if (Object(_dom__WEBPACK_IMPORTED_MODULE_6__.show)(n), d > e)
                        if (i) {
                            var p = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.val)(t, function(e, t) {
                                for (var n = 0, o = "", i = 0, s = e.length; i < s; i++) {
                                    var a = e.charAt(i),
                                        _ = c[a],
                                        d = e.charCodeAt(i);
                                    if ((n += void 0 !== _ ? _ : !r && d >= 128 && (d < 1025 || u[d] || d > 1119) && !l[d] && (d < 8220 || d > 8222) && (d < 8224 || d > 8226) ? ("&#" + d + ";").length : 1) > t) break;
                                    o += a
                                }
                                return o
                            }(a, Math.min(e, _)));
                            t.lastLen = p.length, n.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("text_N_symbols_remain", 0)
                        } else n.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("text_exceeds_symbol_limit", d - e);
                else n.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("text_N_symbols_remain", e - d);
                else Object(_dom__WEBPACK_IMPORTED_MODULE_6__.hide)(n)
            }
        }

        function getSelectionText() {
            var e = "";
            return window.getSelection ? e = window.getSelection().toString() : document.selection && "Control" !== document.selection.type && (e = document.selection.createRange().text), e
        }

        function goAway(e, t, n) {
            if (-1 !== (t || {}).h || Object(_dom_events__WEBPACK_IMPORTED_MODULE_10__.checkEvent)(n)) return !0;
            if (-1 !== (t || {}).h) {
                var o = e.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i);
                if (o && "api." !== o[1].toLowerCase()) return location.href = e, !1;
                var i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(Object(_cookies__WEBPACK_IMPORTED_MODULE_3__.getCookie)("remixsettings_bits"));
                if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(_ajax__WEBPACK_IMPORTED_MODULE_4__.locBase) || 1 & i) return window.open("/away.php?to=" + encodeURIComponent(e) + (t && void 0 !== t.h ? "&h=" + t.h : ""), "_blank"), !1
            }
            var s = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)({
                act: "a_go",
                to: e
            }, t || {});
            return !Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showBox)("away.php", s, {}, n)
        }

        function isFullScreen() {
            return !!(document.fullscreenElement || document.fullScreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || cur.pvPartScreen)
        }

        function updateMoney(e, t) {
            if (void 0 !== e && !1 !== e) {
                var n = "";
                !0 === t ? (vk.balanceEx = e, n = "_ex") : vk.balance = e;
                var o = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.geByClass)("votes_balance_nom" + n);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(o, function(t, n) {
                    return n.innerHTML = e + " " + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("votes_flex", e)
                });
                var i = e * (vk.vcost || 7),
                    s = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.geByClass)("money_balance_nom" + n);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(s, function(e, t) {
                    return t.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_money_amount_rub", i, !0)
                }), void 0 !== t && !1 !== t && !0 !== t && updateMoney(t, !0)
            }
        }

        function toggleOnline(e, t) {
            var n = onlinePlatformClass(t).split(" "),
                o = [];
            ["online", "mobile", "_online"].forEach(function(t) {
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.inArray)(t, n) && !Object(_dom__WEBPACK_IMPORTED_MODULE_6__.hasClass)(e, t) ? o.push(t) : !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.inArray)(t, n) && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.hasClass)(e, t) && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.removeClass)(e, t)
            }), o.length > 0 && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.addClass)(e, o.join(" "))
        }

        function onlinePlatformClass(e) {
            var t = " _online";
            return e && (t += " online"), _browser__WEBPACK_IMPORTED_MODULE_8__.mobPlatforms[e] && (t += " mobile"), Object(_accessibility__WEBPACK_IMPORTED_MODULE_9__.updateOnlineText)(), t
        }

        function handleScroll(e) {
            e = e.split(",");
            var t = cur.named || {},
                n = e[0] && (t[e[0]] || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)(e[0])) || !1,
                o = e[1] && (t[e[1]] || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)(e[1])) || !1;
            if (!n && !o) {
                if (!(n = document.getElementsByName(e[0])[0])) return;
                n = n.nextSibling
            }
            var i = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)("page_header_wrap") || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)("dev_top_nav_wrap");
            setTimeout(function() {
                n && Object(_scroll__WEBPACK_IMPORTED_MODULE_11__.scrollToY)(Object(_dom__WEBPACK_IMPORTED_MODULE_6__.getXY)(n)[1] - (i ? Object(_dom__WEBPACK_IMPORTED_MODULE_6__.getSize)(i)[1] : 0), 0), o && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.elfocus)(o)
            }, 300)
        }
    },
    164: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "parseLatin", function() {
            return r
        }), n.d(t, "parseCyr", function() {
            return a
        }), n.d(t, "parseLatKeys", function() {
            return _
        }), n.d(t, "langNumeric", function() {
            return c
        }), n.d(t, "langSex", function() {
            return l
        }), n.d(t, "langStr", function() {
            return u
        }), n.d(t, "addLangKeys", function() {
            return d
        }), n.d(t, "getLang", function() {
            return p
        }), n.d(t, "langDate", function() {
            return h
        }), n.d(t, "getShortDate", function() {
            return m
        }), n.d(t, "getShortDateOrTime", function() {
            return g
        }), n.d(t, "langWordNumeric", function() {
            return b
        }), n.d(t, "getDateText", function() {
            return f
        }), n.d(t, "getBigDateNew", function() {
            return E
        }), n.d(t, "getSmDate", function() {
            return O
        });
        var o = n(18),
            i = n(240),
            s = n(345);

        function r(e) {
            for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], o = e, i = 0, s = t.length; i < s; i++) o = o.split(t[i]).join(n[i]);
            for (var r = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", a = 0, _ = r.length; a < _; a++) o = o.split(r.charAt(a)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(a));
            return o === e ? null : o
        }

        function a(e) {
            for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], o = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", i = e, s = 0; s < n.length; s++) i = i.split(n[s]).join(t[s]);
            for (var r = 0; r < o.length; r++) i = i.split(o.charAt(r)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(r));
            return i === e ? null : i
        }

        function _(e) {
            for (var t = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", n = e, o = 0; o < t.length; o++) n = n.split(t.charAt(o)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(o));
            return n == e ? null : n
        }

        function c(e, t, n) {
            if (!t || !window.langConfig) return e;
            var o = void 0;
            if (Object(i.isArray)(t) ? (o = t[1], e != Math.floor(e) ? o = t[langConfig.numRules.float] : Object(i.each)(langConfig.numRules.int, function(n, s) {
                    if ("*" == s[0]) return o = t[s[2]], !1;
                    var r = s[0] ? e % s[0] : e;
                    return -1 != Object(i.indexOf)(s[1], r) ? (o = t[s[2]], !1) : void 0
                })) : o = t, n) {
                for (var s = e.toString().split("."), r = [], a = s[0].length - 3; a > -3; a -= 3) r.unshift(s[0].slice(a > 0 ? a : 0, a + 3));
                s[0] = r.join(langConfig.numDel), e = s.join(langConfig.numDec)
            }
            return o = (o || "%s").replace("%s", e)
        }

        function l(e, t) {
            if (!Object(i.isArray)(t)) return t;
            var n = t[1];
            return window.langConfig ? (Object(i.each)(langConfig.sexRules, function(o, i) {
                return "*" == i[0] ? (n = t[i[1]], !1) : e == i[0] && t[i[1]] ? (n = t[i[1]], !1) : void 0
            }), n) : n
        }

        function u(e) {
            for (var t = arguments, n = t.length, o = e + "", i = 1; i < n; i += 2) {
                var s = "%" === t[i][0] ? t[i] : "{" + t[i] + "}";
                o = o.replace(s, t[i + 1])
            }
            return o
        }

        function d(e, t) {
            var n = t ? window : window.cur;
            n.lang ? Object(i.extend)(n.lang, e) : n.lang = e
        }

        function p() {
            try {
                var e = Array.from(arguments),
                    t = e.shift();
                if (!t) return "...";
                var n = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
                if (!n) {
                    var o = t.split("_");
                    return o.shift(), o.join(" ")
                }
                return Object(i.isFunction)(n) ? n.apply(null, e) : void 0 === e[0] && !Object(i.isArray)(n) || "raw" === e[0] ? n : c(e[0], n, e[1])
            } catch (e) {
                Object(s.debugLog)("lang error:" + e.message + "(" + Array.from(arguments).join(", ") + ")")
            }
        }

        function h(e, t, n, s, r, a) {
            var _ = void 0;
            if (a || (a = ""), Object(i.isArray)(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += n, _ = new Date(e)) : _ = e, r) t = t[1];
            else {
                var c = "";
                !(c = Object(o.isToday)(_) ? t[3] : Object(o.isYesterday)(_) ? t[2] : Object(o.isTomorrow)(_) ? t[4] : t[1]) && t[1] && (c = t[1]), t = c
            }
            var l = {
                    hours: _.getHours(),
                    minutes: _.getMinutes(),
                    seconds: _.getSeconds(),
                    day: _.getDate(),
                    month: _.getMonth() + 1,
                    year: _.getFullYear()
                },
                u = "";
            switch (3 === vk.lang && (u = _.getHours() > 11 ? "pm" : "am", l.hours = _.getHours() % 12 == 0 ? 12 : _.getHours() % 12), vk.lang) {
                case 1:
                    switch (_.getHours()) {
                        case 11:
                            t = t.replace(" о ", " об ");
                            break;
                        case 0:
                            t = t.replace(" о ", " в ")
                    }
                    break;
                case 3:
                    !Object(o.isToday)(_) || Object(o.isYesterday)(_) || Object(o.isTomorrow)(_) || (t = a + t);
                    break;
                case 12:
                case 73:
                    1 == _.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
            }
            return 68 === vk.lang && (l.year = l.year + 543), t.replace("{hour}", l.hours).replace("{num_hour}", Object(o.leadingZero)(l.hours)).replace("{minute}", Object(o.leadingZero)(l.minutes)).replace("{day}", l.day).replace("{num_day}", Object(o.leadingZero)(l.day)).replace("{month}", s[l.month]).replace("{year}", l.year).replace("{short_year}", l.year % 100).replace("{second}", Object(o.leadingZero)(l.seconds)).replace("{am_pm}", u)
        }

        function m(e, t, n, o, i) {
            e *= 1e3, void 0 === n && (n = !0), void 0 === o && (o = p("months_of", "raw")), t *= 1e3;
            var s = Date.now(),
                r = new Date(s),
                a = new Date(e + t);
            return !i && e > s && e - s < 864e5 && r.getDate() === a.getDate() ? h(e, "{hour}:{minute} {am_pm}", t, [], !n) : a.getYear() !== r.getYear() || e < s - 157248e5 ? h(e, p("global_date", "raw"), t, o, !n) : h(e, p("global_short_date", "raw"), t, o, !n)
        }

        function g(e, t, n, i) {
            return Object(o.isToday)(new Date(1e3 * e + 1e3 * t)) ? h(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !n) : m(e, t, n, i)
        }

        function b(e, t, n) {
            return Object(i.isArray)(t) && e < t.length ? t[e] : c(e, n)
        }

        function f(e, t) {
            e += t;
            var n = parseInt(Date.now() / 1e3) - e,
                o = "";
            if (n < 60) o = p("global_just_now");
            else if (n < 3600) {
                o = b(Object(i.intval)(n / 60), p("global_word_mins_ago", "raw"), p("global_mins_ago", "raw"))
            } else if (n < 14400) {
                o = b(Object(i.intval)(n / 3600), p("global_word_hours_ago", "raw"), p("global_hours_ago", "raw"))
            } else o = E(e, 0, !0, "_l");
            return o
        }

        function E(e, t, n, o) {
            void 0 === n && (n = !0), void 0 === t && (t = 0), void 0 === o && (o = ""), t *= 1e3;
            var i = new Date(1e3 * e),
                s = new Date;
            return i.getFullYear() !== s.getFullYear() && i.getTime() < s.getTime() - 1728e5 || Math.abs(i.getTime() - s.getTime()) > 157248e5 ? h(1e3 * e, p("global_date", "raw"), t, p("months_sm_of"), !n) : h(1e3 * e, p("global_short_date_time" + o, "raw"), t, p("months_sm_of"), !n)
        }

        function O(e, t, n) {
            void 0 === n && (n = !0), void 0 === t && (t = 0);
            var o = new Date,
                i = o.getFullYear(),
                s = o.getMonth(),
                r = new Date(1e3 * e),
                a = r.getFullYear(),
                _ = r.getMonth();
            return h(1e3 * e, p(a < i && (s > 1 || _ < 9 || i - a >= 2) ? "global_date" : "global_short_date_time", "raw"), t, p("months_sm_of", "raw"), !n)
        }
    },
    169: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
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
        var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(230),
            _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(240);

        function topMsg(e, t, n) {
            if (n || (n = "#D6E5F7"), e) {
                clearTimeout(window.topMsgTimer);
                var o = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("system_msg");
                o.style.backgroundColor = n, o.innerHTML = e, Object(_dom__WEBPACK_IMPORTED_MODULE_0__.show)(o), t && (window.topMsgTimer = setTimeout(topMsg.pbind(!1), 1e3 * t))
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

        function showMsg(e, t, n, o) {
            var i = "msg" + ("msg" !== n ? " " + n : "");
            o && (i += " msg_appear"), e = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)(e);
            var s = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.geByClass1)(n, e),
                r = s || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.domFC)(e),
                a = e.insertBefore(Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ce)("div", {
                    className: i,
                    innerHTML: '<div class="msg_text">' + t + "</div>"
                }), r);
            s && Object(_dom__WEBPACK_IMPORTED_MODULE_0__.re)(s), setTimeout(_dom__WEBPACK_IMPORTED_MODULE_0__.removeClass.pbind(a, "msg_appear"), 0)
        }

        function showGlobalPrg(e, t) {
            var n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.getXY)(e),
                o = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.getSize)(e),
                i = t || {},
                s = i.w,
                r = void 0 === s ? 32 : s,
                a = i.h,
                _ = void 0 === a ? 13 : a,
                c = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("global_prg");
            c.className = i.cls || "progress", Object(_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(c, {
                left: n[0] + Math.floor((o[0] - r) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.intval)(i.shift ? i.shift[0] : 0),
                top: n[1] + Math.floor((o[1] - _) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.intval)(i.shift ? i.shift[1] : 0),
                width: r,
                height: _,
                display: "block",
                "z-index": i.zIndex ? i.zIndex : null
            }), i.hide && (e.style.visibility = "hidden")
        }
    },
    18: function(e, t, n) {
        "use strict";

        function o(e) {
            var t = new Date;
            return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
        }

        function i(e) {
            return o(new Date(e.getTime() + 864e5))
        }

        function s(e) {
            return o(new Date(e.getTime() - 864e5))
        }

        function r(e, t) {
            var n = new Date(e),
                o = new Date(t);
            return n.getFullYear() === o.getFullYear() && n.getMonth() === o.getMonth() && n.getDate() === o.getDate()
        }

        function a(e) {
            return e >= 10 ? e : "0" + e
        }

        function _(e, t) {
            var n = void 0;
            e = Math.max(e, 0);
            var o = Math.floor(e % 60);
            n = o < 10 ? "0" + o : o;
            var i = (e = Math.floor(e / 60)) % 60;
            return n = i + ":" + n, ((e = Math.floor(e / 60)) > 0 || t) && (i < 10 && (n = "0" + n), n = e + ":" + n), n
        }
        n.r(t), n.d(t, "isToday", function() {
            return o
        }), n.d(t, "isYesterday", function() {
            return i
        }), n.d(t, "isTomorrow", function() {
            return s
        }), n.d(t, "isSameDate", function() {
            return r
        }), n.d(t, "leadingZero", function() {
            return a
        }), n.d(t, "formatTime", function() {
            return _
        })
    },
    191: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "browser", function() {
            return s
        }), n.d(t, "mobPlatforms", function() {
            return r
        }), n.d(t, "browserFeatures", function() {
            return a
        }), n.d(t, "initBrowserUtils", function() {
            return _
        });
        var o = n(230),
            i = navigator.userAgent.toLowerCase(),
            s = {
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
            r = {
                1: 1,
                2: 1,
                3: 1,
                4: 1,
                5: 1,
                8: 1
            },
            a = {
                wheelEvent: "onwheel" in Object(o.ce)("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : s.mozilla ? "MozMousePixelScroll" : "DOMMouseScroll",
                hasBoundingClientRect: "getBoundingClientRect" in Object(o.ce)("div"),
                cmaEnabled: navigator.credentials && navigator.credentials.preventSilentAccess && window.vk && vk.cma
            };

        function _() {
            window._ua || (window._ua = navigator.userAgent.toLowerCase()), window.locDomain || (window.locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0]), window.locHost = location.host, window.locProtocol = location.protocol, window.locHash = location.hash.replace("#/", "").replace("#!", "")
        }
    },
    202: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
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
        var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(240),
            _debug_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(345),
            _browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(191),
            _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(230),
            _dom_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(288),
            _message_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(236),
            _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(159),
            _ui_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(169),
            _box_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(244),
            _lang__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(164),
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
            for (var i in e)
                if (null != e[i] && !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.isFunction)(e[i]))
                    if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.isArray)(e[i]))
                        for (var s = 0, r = 0, a = e[i].length; s < a; ++s) null == e[i][s] || Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.isFunction)(e[i][s]) || (n.push(o(i) + "[" + r + "]=" + o(e[i][s])), ++r);
                    else n.push(o(i) + "=" + o(e[i]));
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
            return e = e.split("&"), Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(e, function(e, o) {
                var i = o.split("=");
                if (i[0]) {
                    var s = n(i[1] + "");
                    if ("[]" === i[0].substr(i.length - 2)) {
                        var r = n(i[0].substr(0, i.length - 2));
                        t[r] || (t[r] = []), t[r].push(s)
                    } else t[n(i[0])] = s
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
                    var n = iframeTransport.parentNode;
                    n.innerHTML = "", utilsNode.removeChild(n), iframeTransport = !1, (e || t) && ajax.framegot(!1, !1, e, t), ajax.framegot(!1), cur.onFrameBlocksDone && cur.onFrameBlocksDone(), ajax.tOver = (new Date).getTime()
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
            framegot: function(e, t, n, o) {
                ajax.framedata && (ajax.framedata.push(void 0 === t && void 0 === n && void 0 === o ? e : [e, t, n, o]), 1 == ajax.framedata.length && ajax._framenext())
            },
            framepost: function(e, t, n, o) {
                clearTimeout(iframeTO), iframeTransport && ajax._frameover(), iframeTransport = utilsNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ce)("div", {
                    innerHTML: "<iframe></iframe>"
                })).firstChild, ajax._framedone = n, ajax.framedata = [!0], e += "?" + ("string" != typeof t ? ajx2q(t, o && o.noSort) : t), e += ("?" != e.charAt(e.length - 1) ? "&" : "") + "_rndVer=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.irand)(0, 99999), ajax._frameurl = iframeTransport.src = e
            },
            plainpost: function(e, t, n, o, i, s, r, a) {
                var _ = ajax._getreq(),
                    c = "string" != typeof t ? ajx2q(t, r && r.noSort) : t;
                _.onreadystatechange = function() {
                    4 === _.readyState && (_.status >= 200 && _.status < 300 ? n && n(_.responseText, _) : o && o(_.responseText, _))
                };
                try {
                    _.open("POST", e, !0)
                } catch (e) {
                    return !1
                }
                return s && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(s, function(e, t) {
                    _[e] = t
                }), i || (_.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a || _.setRequestHeader("X-Requested-With", "XMLHttpRequest")), _.send(c), _
            },
            post: function(e, t, n) {
                "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
                var o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)({
                        _captcha: !1,
                        _box: !1
                    }, n || {}),
                    i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)({
                        al: o.frame ? -1 : 1
                    }, t),
                    s = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.vkNow)(),
                    r = vk.spentLastSendTS ? Math.round((s - vk.spentLastSendTS) / 1e3) : 0;
                if (vk.sampleUser >= 0 && window.cur && cur.module && r >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (i._smt = cur.module + ":" + r), vk.spentLastSendTS = s), o.progress && (o.showProgress || (o.showProgress = function() {
                        var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ge)(o.progress);
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hasClass)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.setStyle)(e, "opacity", 1), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.show)(e)
                    }), o.hideProgress || (o.hideProgress = function() {
                        var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ge)(o.progress);
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hasClass)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.setStyle)(e, "opacity", 0), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hide)(e)
                    })), o.loader) {
                    var a = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.isVisible)(boxLayerWrap);
                    o.showProgress = function() {
                        boxRefreshCoords(boxLoader), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.show)(boxLoader), a || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.show)(boxLayerWrap)
                    }, o.hideProgress = function() {
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hide)(boxLoader), a || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hide)(boxLayerWrap)
                    }
                }
                return ajax._post(e, i, o)
            },
            preload: function(e, t, n) {
                "/" !== e.substr(0, 1) && (e = "/" + e), ajaxCache[e + "#" + ajx2q(t)] = n
            },
            invalidate: function(e, t) {
                void 0 === e ? ajaxCache = {} : delete ajaxCache[ajax._getCacheKey(e, t)]
            },
            _getCacheKey: function(e, t, n) {
                var o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.clone)(t);
                return delete o.al, delete o.al_ad, delete o.ads_section, delete o.ads_showed, delete o.captcha_sid, delete o.captcha_key, delete o._smt, delete o._preload, e + "#" + ajx2q(o, n && n.noSort)
            },
            _debugLog: function(e, t) {
                window.debuglogGot && window.debuglogGot(t, e)
            },
            _parseRes: function(e, t) {
                for (var n = e.length - 1; n >= 0; --n) {
                    var o = e[n];
                    if ("<!" === o.substr(0, 2)) {
                        var i = o.indexOf(">"),
                            s = o.substr(2, i - 2);
                        switch (o = o.substr(i + 1), s) {
                            case "json":
                                e[n] = Object(_utils__WEBPACK_IMPORTED_MODULE_6__.parseJSON)(o);
                                break;
                            case "int":
                                e[n] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(o);
                                break;
                            case "float":
                                e[n] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.floatval)(o);
                                break;
                            case "bool":
                                e[n] = !!Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(o);
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
                window.__adsGetAjaxParams && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(query, __adsGetAjaxParams(query, options)), options.cache && (cacheKey = ajax._getCacheKey(url, query, options));
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
                                        n = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(options, {
                                            cache: -1
                                        }) : options;
                                    ajax._post(url, t, n)
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
                                    var n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(query, {
                                            captcha_sid: e,
                                            captcha_key: t
                                        }),
                                        o = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(options, {
                                            cache: -1
                                        }) : options;
                                    ajax._post(url, n, o)
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
                                    var n = e ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(query, {
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
                    var n = e.split("<!>"),
                        o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.clone)(n);
                    Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(o, function(e, t) {
                        return o[e] = t.substr(0, 100)
                    }), ajax.lastResp = o.join("<!>");
                    var i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(n.shift());
                    if (!i) return fail("<pre>" + e + "</pre>", {
                        status: -1
                    });
                    if (vk.version && vk.version !== i) i && n.length > 4 ? nav.reload({
                        force: !0,
                        from: 2,
                        url: url,
                        query: query && ajx2q(query)
                    }) : nav.strLoc ? location.replace(locBase) : Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)("Server error.", {
                        type: 100
                    });
                    else {
                        vk.version = !1;
                        var s = n.shift(),
                            r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(n.shift()),
                            a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(n.shift());
                        options.frame && (n = t);
                        var _ = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(n.shift());
                        if (vk.lang !== r && options.canReload) nav.reload({
                            force: !0,
                            from: 3,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        else {
                            var c = function() {
                                var e = ["common.css"];
                                if (s)
                                    for (var t = 0, o = (s = s.split(",")).length; t < o; ++t) e.push(s[t]);
                                if (stVersions.lang < a)
                                    for (var i in stVersions.lang = a, StaticFiles) /^lang\d/i.test(i) && e.push(i);
                                if (!options.frame) try {
                                    ajax._parseRes(n, options._reqid)
                                } catch (e) {
                                    Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)("<b>JSON Error:</b> " + e.message, {
                                        type: 5,
                                        answer: n.join("<!>"),
                                        url: url,
                                        query: query && ajx2q(query)
                                    })
                                }
                                stManager.add(e, _processResponse.pbind(_, n))
                            };
                            if (window.stVersions) {
                                if (i === stVersions.nav) return c();
                                headNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ce)("script", {
                                    type: "text/javascript",
                                    src: "/js/loader_nav" + i + "_" + vk.lang + ".js"
                                })), setTimeout(function e() {
                                    if (i === stVersions.nav) return c();
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
    },
    215: function(e, t, n) {
        e.exports = n(99)
    },
    230: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "ge", function() {
            return a
        }), n.d(t, "geByTag", function() {
            return _
        }), n.d(t, "geByTag1", function() {
            return c
        }), n.d(t, "geByClass", function() {
            return l
        }), n.d(t, "geByClass1", function() {
            return u
        }), n.d(t, "gpeByClass", function() {
            return d
        }), n.d(t, "domQuery", function() {
            return p
        }), n.d(t, "domQuery1", function() {
            return h
        }), n.d(t, "domClosest", function() {
            return m
        }), n.d(t, "domClosestByTag", function() {
            return g
        }), n.d(t, "gpeByTag", function() {
            return b
        }), n.d(t, "ce", function() {
            return f
        }), n.d(t, "cf", function() {
            return w
        }), n.d(t, "re", function() {
            return C
        }), n.d(t, "se", function() {
            return P
        }), n.d(t, "sech", function() {
            return D
        }), n.d(t, "rs", function() {
            return x
        }), n.d(t, "psr", function() {
            return M
        }), n.d(t, "domReplaceEl", function() {
            return T
        }), n.d(t, "domEL", function() {
            return j
        }), n.d(t, "domNS", function() {
            return B
        }), n.d(t, "domPS", function() {
            return L
        }), n.d(t, "domFC", function() {
            return k
        }), n.d(t, "domLC", function() {
            return S
        }), n.d(t, "domPN", function() {
            return R
        }), n.d(t, "domChildren", function() {
            return A
        }), n.d(t, "domInsertBefore", function() {
            return I
        }), n.d(t, "domInsertAfter", function() {
            return W
        }), n.d(t, "domByClass", function() {
            return U
        }), n.d(t, "domData", function() {
            return K
        }), n.d(t, "domChildIndex", function() {
            return N
        }), n.d(t, "domCA", function() {
            return q
        }), n.d(t, "domClosestSibling", function() {
            return H
        }), n.d(t, "matchesSelector", function() {
            return F
        }), n.d(t, "isHover", function() {
            return z
        }), n.d(t, "isAncestor", function() {
            return G
        }), n.d(t, "getScroll", function() {
            return Y
        }), n.d(t, "domClosestPositioned", function() {
            return V
        }), n.d(t, "domClosestOverflowHidden", function() {
            return X
        }), n.d(t, "show", function() {
            return $
        }), n.d(t, "hide", function() {
            return Q
        }), n.d(t, "isVisible", function() {
            return Z
        }), n.d(t, "clientHeight", function() {
            return J
        }), n.d(t, "getClientRectOffsetY", function() {
            return ee
        }), n.d(t, "toggle", function() {
            return te
        }), n.d(t, "boundingRectEnabled", function() {
            return ne
        }), n.d(t, "getXYRect", function() {
            return oe
        }), n.d(t, "getXY", function() {
            return ie
        }), n.d(t, "isWindow", function() {
            return se
        }), n.d(t, "getSize", function() {
            return re
        }), n.d(t, "getW", function() {
            return ae
        }), n.d(t, "getH", function() {
            return _e
        }), n.d(t, "hasClass", function() {
            return ce
        }), n.d(t, "addClass", function() {
            return le
        }), n.d(t, "addClassDelayed", function() {
            return ue
        }), n.d(t, "removeClass", function() {
            return de
        }), n.d(t, "removeClassDelayed", function() {
            return pe
        }), n.d(t, "toggleClass", function() {
            return he
        }), n.d(t, "toggleClassDelayed", function() {
            return me
        }), n.d(t, "replaceClass", function() {
            return ge
        }), n.d(t, "getStyle", function() {
            return be
        }), n.d(t, "setStyle", function() {
            return fe
        }), n.d(t, "setStyleDelayed", function() {
            return Ee
        }), n.d(t, "setPseudoStyle", function() {
            return Oe
        }), n.d(t, "data", function() {
            return ye
        }), n.d(t, "attr", function() {
            return ve
        }), n.d(t, "removeAttr", function() {
            return we
        }), n.d(t, "removeData", function() {
            return Ce
        }), n.d(t, "cleanElems", function() {
            return Pe
        }), n.d(t, "setTitle", function() {
            return De
        }), n.d(t, "getZoom", function() {
            return xe
        }), n.d(t, "val", function() {
            return Me
        }), n.d(t, "elfocus", function() {
            return Te
        }), n.d(t, "traverseParent", function() {
            return je
        }), n.d(t, "setDocumentTitle", function() {
            return Le
        }), n.d(t, "lockDocumentTitle", function() {
            return ke
        }), n.d(t, "initDomScripts", function() {
            return Se
        });
        var o = n(240),
            i = n(288),
            s = n(191),
            r = n(345),
            a = function(e) {
                return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
            };

        function _(e, t) {
            return (t = a(t) || document).getElementsByTagName(e)
        }

        function c(e, t) {
            return (t = a(t) || document).querySelector && t.querySelector(e) || _(e, t)[0]
        }

        function l(e, t, n) {
            return t = a(t) || document, n = n || "*", e = ("." + e).replace(/\s+/gm, "."), Array.prototype.slice.call(t.querySelectorAll(n + e))
        }

        function u(e, t, n) {
            return t = a(t) || document, n = n || "*", t.querySelector && t.querySelector(n + ("." + e).replace(/\s+/gm, ".")) || l(e, t, n)[0]
        }

        function d(e, t, n) {
            if (!(t = a(t))) return null;
            for (; n !== t && (t = t.parentNode);)
                if (ce(t, e)) return t;
            return null
        }

        function p(e, t) {
            return (t || document).querySelectorAll(e)
        }

        function h(e, t) {
            return (t || document).querySelector(e)
        }

        function m(e, t) {
            return ce(t, e) ? t : d(e, t)
        }

        function g(e, t) {
            return e = e.toUpperCase(), t.nodeType === Node.ELEMENT_NODE && t.tagName.toUpperCase() === e ? t : b(e, t)
        }

        function b(e, t) {
            if (!(t = a(t))) return null;
            for (e = e.toUpperCase(); t = t.parentNode;)
                if (t.tagName && t.tagName.toUpperCase() === e) return t;
            return null
        }

        function f(e, t, n) {
            var i = document.createElement(e);
            return t && Object(o.extend)(i, t), n && fe(i, n), i
        }
        var E, O, y, v, w = (E = document, O = E.createDocumentFragment(), y = E.createElement("div"), v = E.createRange && E.createRange(), O.appendChild(y), v && v.selectNodeContents(y), v && v.createContextualFragment ? function(e) {
            return e ? v.createContextualFragment(e) : E.createDocumentFragment()
        } : function(e) {
            if (!e) return E.createDocumentFragment();
            y.innerHTML = e;
            for (var t = E.createDocumentFragment(); y.firstChild;) t.appendChild(y.firstChild);
            return t
        });

        function C(e) {
            return (e = a(e)) && e.parentNode && e.parentNode.removeChild(e), e
        }
        var P = function(e) {
                return k(f("div", {
                    innerHTML: e
                }))
            },
            D = function(e) {
                return A(f("div", {
                    innerHTML: e
                }))
            };

        function x(e, t) {
            return Object(o.each)(t, function(t, n) {
                e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === n ? "" : n).toString().replace(/\$/g, "&#036;"))
            }), e
        }

        function M(e) {
            return "https:" !== locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
        }

        function T(e, t) {
            return Object(o.isString)(t) && (t = P(t)), R(e).replaceChild(t, e), t
        }

        function j(e, t) {
            for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
            return e
        }
        var B = function(e) {
                return j((e || {}).nextSibling)
            },
            L = function(e) {
                return j((e || {}).previousSibling, 1)
            },
            k = function(e) {
                return j((e || {}).firstChild)
            },
            S = function(e) {
                return j((e || {}).lastChild, 1)
            },
            R = function(e) {
                return (e || {}).parentNode
            };

        function A(e) {
            for (var t = [], n = e.childNodes, o = 0; o < n.length; o++) n[o].tagName && t.push(n[o]);
            return t
        }

        function I(e, t) {
            var n = R(t);
            return n && n.insertBefore(e, t)
        }

        function W(e, t) {
            var n = R(t);
            return n && n.insertBefore(e, B(t))
        }

        function U(e, t) {
            return e ? u(t, e) : e
        }

        function K(e, t, n) {
            return e ? void 0 !== n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
        }

        function N(e) {
            for (var t = 0; null != (e = L(e));) t++;
            return t
        }

        function q(e, t) {
            do {
                e = R(e)
            } while (e && !F(e, t));
            return e
        }

        function H(e, t, n) {
            for (var o = null; null === o && e;)(e = -1 === n ? L(e) : B(e)) && F(e, t) && (o = e);
            return o
        }

        function F(e, t) {
            return !(!(e = a(e)) || e === document) && (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function(e) {
                for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t.item(n) !== this;);
                return n > -1
            }).call(e, t)
        }

        function z(e) {
            return F(e, ":hover")
        }

        function G(e, t) {
            var n = a(e);
            if (t = a(t), !e || !t) return !1;
            for (; n = n.parentNode;)
                if (n === t) return !0;
            return !1
        }

        function Y() {
            var e = s.browser.msie6 ? a("PageContainer") : document.body,
                t = document.documentElement;
            return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
        }

        function V(e, t) {
            for (var n = (t = t || {}).fromEl || R(e), i = t.positions || ["relative", "absolute", "fixed"]; n && n !== bodyNode;) {
                var s = be(n, "position");
                if (Object(o.inArray)(s, i) && (!t.noOverflow || "hidden" !== be(n, "overflow"))) break;
                n = R(n)
            }
            return n
        }

        function X(e, t) {
            for (var n = e = a(e), o = void 0, i = void 0, r = void 0, _ = !1; n && n.tagName && n !== bodyNode;) {
                if (o = be(n, "position"), i = be(n, "overflow"), r = be(n, "transform"), t && s.browser.mozilla) {
                    if ("page_wrap" != n.id && n !== e && "visible" !== i && ("static" === o ? !_ || "relative" === _ : "fixed" !== _)) break
                } else if (n !== e && "visible" !== i && ("static" === o ? !_ || "relative" === _ : "fixed" !== _)) break;
                "none" !== r ? _ = void 0 : "static" !== o && "fixed" !== _ && (_ = o), n = R(n)
            }
            return n
        }

        function $(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; n < t; n++) $(arguments[n]);
            else if ((e = a(e)) && e.style) {
                var o = e.olddisplay,
                    i = e.tagName.toLowerCase(),
                    r = "block";
                e.style.display = o || "", "none" === be(e, "display") && (r = ce(e, "inline") || ce(e, "_inline") ? "inline" : ce(e, "_inline_block") ? "inline-block" : "tr" !== i || s.browser.msie ? "table" !== i || s.browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = r)
            }
        }

        function Q(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; n < t; n++) Q(arguments[n]);
            else if ((e = a(e)) && e.style) {
                var o = be(e, "display");
                e.olddisplay = "none" !== o ? o : "", e.style.display = "none"
            }
        }

        function Z(e) {
            return !(!(e = a(e)) || !e.style) && "none" !== be(e, "display")
        }

        function J() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function ee(e, t, n) {
            e = a(e), n = n || 0;
            var i = ie(e)[1],
                s = re(e)[1],
                r = window,
                _ = document.documentElement,
                c = Math.max(Object(o.intval)(r.innerHeight), Object(o.intval)(_.clientHeight)),
                l = a("page_header_cont"),
                u = _.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                d = vk.staticheader ? Math.max(0, re(l)[1] - u) : re(l)[1];
            if (t) {
                if (i + s < u + d + n) return i + s - u - d - n;
                if (i > u + c - n) return i - u - c + n
            } else {
                if (i < u + d + n) return i - u - d - n;
                if (i + s > u + c - n) return i + s - u - c + n
            }
            return 0
        }

        function te(e, t) {
            return void 0 === t && (t = !Z(e)), t ? $(e) : Q(e), t
        }

        function ne(e) {
            return void 0 !== e.getBoundingClientRect
        }

        function oe(e, t) {
            var n = void 0;
            if (t && "inline" === be(e, "display")) {
                var o = e.getClientRects();
                n = o && o[0] || e.getBoundingClientRect()
            } else n = e.getBoundingClientRect();
            return n
        }

        function ie(e, t) {
            if (!(e = a(e))) return [0, 0];
            var n = e.ownerDocument,
                o = {
                    top: 0,
                    left: 0
                };
            if (!n) return [0, 0];
            var i = n.documentElement;
            ne(e) && (o = oe(e, !0));
            var s = n === n.window ? n : 9 === n.nodeType && (n.defaultView || n.parentWindow);
            return [o.left + (t ? 0 : s.pageXOffset || i.scrollLeft) - (i.clientLeft || 0), o.top + (t ? 0 : s.pageYOffset || i.scrollTop) - (i.clientTop || 0)]
        }

        function se(e) {
            return null != e && e === e.window
        }

        function re(e, t, n) {
            e = a(e);
            var i = document.documentElement,
                s = [0, 0],
                r = void 0;
            if (t && "border-box" === be(e, "boxSizing") && (t = !1), e === document) s = [Math.max(i.clientWidth, bodyNode.scrollWidth, i.scrollWidth, bodyNode.offsetWidth, i.offsetWidth), Math.max(i.clientHeight, bodyNode.scrollHeight, i.scrollHeight, bodyNode.offsetHeight, i.offsetHeight)];
            else if (e) {
                var _ = function() {
                    s = ne(e) && (r = oe(e, n)) && void 0 !== r.width ? [r.width, r.height] : [e.offsetWidth, e.offsetHeight], t && Object(o.each)(s, function(t, n) {
                        var i = t ? ["Top", "Bottom"] : ["Left", "Right"];
                        Object(o.each)(i, function() {
                            s[t] -= parseFloat(be(e, "padding" + this)) || 0, s[t] -= parseFloat(be(e, "border" + this + "Width")) || 0
                        })
                    })
                };
                if (Z(e)) _();
                else {
                    var c = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        l = {},
                        u = !1;
                    e.style.cssText.indexOf("!important") > -1 && (u = e.style.cssText), Object(o.each)(c, function(t, n) {
                        l[t] = e.style[t], e.style[t] = n
                    }), _(), Object(o.each)(c, function(t, n) {
                        e.style[t] = l[t]
                    }), u && (e.style.cssText = u)
                }
            }
            return s
        }

        function ae(e) {
            return re(e)[0]
        }

        function _e(e) {
            return re(e)[1]
        }

        function ce(e, t) {
            var n = a(e);
            return n && 1 === n.nodeType && (" " + n.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0
        }

        function le(e, t) {
            var n = a(e);
            n && !ce(n, t) && (n.className = (n.className ? n.className + " " : "") + t)
        }
        window.whitespaceRegex = /[\t\r\n\f]/g;
        var ue = function(e, t, n) {
            n = Object(o.positive)(n), setTimeout(le.pbind(e, t), n)
        };

        function de(e, t) {
            var n = a(e);
            n && (n.className = Object(o.trim)((n.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
        }
        var pe = function(e, t, n) {
            n = Object(o.positive)(n), setTimeout(de.pbind(e, t), n)
        };

        function he(e, t, n) {
            return void 0 === n && (n = !ce(e, t)), (n ? le : de)(e, t), n
        }

        function me(e, t, n, i) {
            return i = Object(o.positive)(i), void 0 === n && (n = !ce(e, t)), (n ? ue : pe)(e, t, i), n
        }

        function ge(e, t, n) {
            de(e, t), le(e, n)
        }

        function be(e, t, n) {
            if (e = a(e), Object(o.isArray)(t)) {
                var i = {};
                return Object(o.each)(t, function(t, n) {
                    return i[n] = be(e, n)
                }), i
            }
            if (!e) return "";
            if (void 0 === n && (n = !0), !n && "opacity" === t && s.browser.msie) {
                var r = e.style.filter;
                return r ? r.indexOf("opacity=") >= 0 ? parseFloat(r.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
            }
            if (!n && e.style && (e.style[t] || "height" === t)) return e.style[t];
            var _ = void 0,
                c = document.defaultView || window;
            if (c.getComputedStyle) {
                t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                var l = c.getComputedStyle(e, null);
                l && (_ = l.getPropertyValue(t))
            } else if (e.currentStyle) {
                if ("opacity" === t && s.browser.msie) {
                    var u = e.currentStyle.filter;
                    return u && u.indexOf("opacity=") >= 0 ? parseFloat(u.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
                }
                var d = t.replace(/\-(\w)/g, function(e, t) {
                    return t.toUpperCase()
                });
                "auto" === (_ = e.currentStyle[t] || e.currentStyle[d]) && (_ = 0), _ = (_ + "").split(" "), Object(o.each)(_, function(t, n) {
                    if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                        var o = e.style,
                            i = o.left,
                            s = e.runtimeStyle.left;
                        e.runtimeStyle.left = e.currentStyle.left, o.left = n || 0, _[t] = o.pixelLeft + "px", o.left = i, e.runtimeStyle.left = s
                    }
                }), _ = _.join(" ")
            }
            if (n && ("width" === t || "height" === t)) {
                var p = re(e, !0)[{
                    width: 0,
                    height: 1
                }[t]];
                _ = (Object(o.intval)(_) ? Math.max(Object(o.floatval)(_), p) : p) + "px"
            }
            return _
        }

        function fe(e, t, n) {
            if (e = a(e))
                if (Object(o.isObject)(t)) Object(o.each)(t, function(t, n) {
                    return fe(e, t, n)
                });
                else if ("opacity" === t) s.browser.msie && ((n + "").length ? e.style.filter = 1 !== n ? "alpha(opacity=" + 100 * n + ")" : "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== n && (e.style.opacity = n);
            else try {
                var i = "number" == typeof n;
                i && /height|width/i.test(t) && (n = Math.abs(n)), n = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? n + "px" : n, e.style[t] !== n && (e.style[t] = n)
            } catch (e) {
                Object(r.debugLog)("setStyle error: ", [t, n], e)
            }
        }
        window.cssTransformProp = function() {
            var e = document.createElement("div");
            if (null == e.style.transform) {
                var t = ["Webkit", "Moz", "ms"];
                for (var n in t)
                    if (void 0 !== e.style[t[n] + "Transform"]) return t[n] + "Transform"
            }
            return "transform"
        }();
        var Ee = function(e, t, n) {
            return setTimeout(fe.pbind(e, t, n), 0)
        };

        function Oe(e, t, n) {
            var i = ye(e, "pseudo-id");
            i || (ye(e, "pseudo-id", i = Object(o.irand)(1e8, 999999999)), le(e, "_pseudo_" + i));
            var s = t + "-style-" + i,
                r = a(s),
                _ = "._pseudo_" + i + ":" + t + "{";
            r || (r = headNode.appendChild(f("style", {
                id: s,
                type: "text/css"
            }))), Object(o.each)(n, function(e, t) {
                _ += e + ": " + t + " !important;"
            }), _ += "}", r.sheet ? (r.sheet.cssRules.length && r.sheet.deleteRule(0), r.sheet.insertRule(_, 0)) : r.styleSheet && (r.styleSheet.cssText = _)
        }

        function ye(e, t, n) {
            if (!e) return !1;
            var o = e[vkExpand];
            return o || (o = e[vkExpand] = ++vkUUID), void 0 !== n && (vkCache[o] || (vkCache[o] = {}, window.__debugMode && (vkCache[o].__elem = e)), vkCache[o][t] = n), t ? vkCache[o] && vkCache[o][t] : o
        }

        function ve(e, t, n) {
            return e = a(e), void 0 === n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
        }

        function we(e) {
            for (var t = 0, n = arguments.length; t < n; ++t) {
                var o = arguments[t];
                if (void 0 !== e[o]) try {
                    delete e[o]
                } catch (t) {
                    try {
                        e.removeAttribute(o)
                    } catch (e) {}
                }
            }
        }

        function Ce(e, t) {
            var n = !!e && e[vkExpand];
            if (n)
                if (t) {
                    if (vkCache[n]) {
                        delete vkCache[n][t], t = "";
                        var o = 0;
                        for (var s in vkCache[n])
                            if ("__elem" !== s) {
                                o++;
                                break
                            }
                        o || Ce(e)
                    }
                } else Object(i.removeEvent)(e), we(e, vkExpand), delete vkCache[n]
        }

        function Pe() {
            for (var e = arguments, t = 0; t < e.length; ++t) {
                var n = a(e[t]);
                n && (Ce(n), we(n, "btnevents"))
            }
        }

        function De(e, t, n) {
            if ((e = a(e)) && !e.titleSet) {
                if (t || (t = e), t.scrollWidth > t.clientWidth || t.scrollHeight > t.clientHeight) e.setAttribute("title", n || e.innerText || e.textContent);
                else {
                    var o = c("b", e);
                    o && (o.scrollWidth > o.clientWidth || o.scrollHeight > o.clientHeight) ? e.setAttribute("title", n || e.innerText || e.textContent) : e.removeAttribute("title")
                }
                e.titleSet = 1
            }
        }

        function xe() {
            var e = a("zoom_test_1") || document.body.appendChild(f("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            }));
            return (a("zoom_test_2") || document.body.appendChild(f("div", {
                id: "zoom_test_2"
            }, {
                left: e.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }))).offsetLeft / e.offsetLeft
        }

        function Me(e, t, n) {
            if (e = a(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !n && e.phonblur && e.phonblur()) : "INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !n && Object(i.triggerEvent)(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value : e.innerHTML) || ""
        }

        function Te(e, t, n) {
            e = a(e);
            try {
                if (e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== n && !1 !== n || (n = t), e.setSelectionRange) e.setSelectionRange(t, n);
                else if (window.getSelection && document.createRange) {
                    var o = document.createRange();
                    o.selectNodeContents(e), o.collapse(!1);
                    var i = window.getSelection();
                    i.removeAllRanges(), i.addRange(o)
                }
            } catch (e) {}
        }

        function je(e, t, n) {
            for (e = a(e), n = n || 999; e && !t(e);) {
                if (0 === --n) return !1;
                try {
                    if ((e = R(e)) === document) return !1
                } catch (t) {
                    e = !1
                }
            }
            return e
        }
        var Be = !1;

        function Le(e) {
            if (!Be) return window.document.title = Object(o.replaceEntities)(e)
        }

        function ke(e) {
            Be = e, e && window.cur && window.cur.destroy.push(function() {
                ke(!1)
            })
        }

        function Se() {
            window.vkExpand = window.vkExpand || "VK" + Object(o.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}
        }
    },
    236: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
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
        var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(327),
            _debug_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(345),
            _dom_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(288),
            _ui_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(169),
            _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(230),
            _fx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(126),
            _utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(240),
            _lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(164),
            _ajax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(202),
            _box_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(244),
            _accessibility__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(138);

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

            function _addButton(e, t, n, o) {
                var i = "flat_button";
                "no" === n || "gray" === n ? (i += " secondary", n = "cancel") : n = "ok";
                var s = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ce)("button", {
                    className: i,
                    innerHTML: e,
                    id: o
                });
                return boxButtons.rows[0].insertCell(0).appendChild(s), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.createButton)(s, function() {
                    emitter.emit(n, retBox), t.apply(null, arguments)
                }), btns[n].push(s), s
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
                hideMe = function(e, t, n) {
                    if (visible) {
                        visible = !1;
                        var o = !0 === e ? 0 : options.animSpeed;
                        options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(document, "click", boxQueue.hideBGClick), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onBeforeHide) && options.onBeforeHide();
                        var i = function() {
                            boxQueue.currHiding === _message_boxes[guid] && (boxQueue.currHiding = !1), _message_boxes[guid].shOther || e || layers.boxhide(), !t && options.selfDestruct ? destroyMe() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(boxContainer), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onHide) && options.onHide(n)
                        };
                        o > 0 ? (boxQueue.currHiding = _message_boxes[guid], Object(_fx__WEBPACK_IMPORTED_MODULE_5__.fadeOut)(boxContainer, o, i)) : i()
                    }
                };

            function showMe(e, t, n) {
                if (!visible && window._message_boxes[guid]) {
                    visible = !0;
                    var o = !0 === e || t ? 0 : options.animSpeed;
                    if (options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.addEvent)(document, "click", boxQueue.hideBGClick), t || layers.boxshow(), boxQueue.currHiding) {
                        boxQueue.currHiding.shOther = !0;
                        var i = boxQueue.currHiding.bodyNode.parentNode.parentNode;
                        Object(_dom__WEBPACK_IMPORTED_MODULE_4__.data)(i, "tween").stop(!0)
                    }
                    o > 0 ? Object(_fx__WEBPACK_IMPORTED_MODULE_5__.fadeIn)(boxContainer, o) : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxContainer), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.boxRefreshCoords)(boxContainer), options.onShow && options.onShow(n)
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
                addButton: function(e, t, n, o, i) {
                    var s = _addButton(e, t || this.hide, n, i);
                    return o ? s : this
                },
                setButtons: function(e, t, n, o) {
                    var i = this.removeButtons();
                    return e ? (i.addButton(e, t), n && i.addButton(n, o, "no"), i) : i.addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("box_close"))
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
                        for (var t = options.bodyStyle.split(";"), n = 0, o = t.length; n < o; n++) {
                            var i = t[n].split(":");
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
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                o = arguments[3];
            if (Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.checkEvent)(o)) return !1;
            var i = n.params || {};
            n.containerClass && (i.containerClass = n.containerClass);
            var s = new MessageBox(i),
                r = {
                    onDone: function(o, r, a, _) {
                        if (n.preOnDone && n.onDone && n.onDone(s), s.isVisible())
                            if (__debugMode) c();
                            else try {
                                c()
                            } catch (n) {
                                Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.topError)(n, {
                                    dt: 15,
                                    type: 103,
                                    url: e,
                                    query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.ajx2q)(t),
                                    answer: Array.prototype.slice.call(arguments).join("<!>")
                                }), s.isVisible() && s.hide()
                            } else n.onDone && n.onDone(s, _);

                        function c() {
                            Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.addClass)(bodyNode, "layers_shown"), s.setOptions({
                                title: o,
                                hideButtons: i.hideButtons || !1
                            }), n.showProgress ? s.show() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(s.bodyNode), s.content(r), s.evalBox(a, e, t), n.onDone && n.onDone(s, _)
                        }
                    },
                    onFail: function(e) {
                        if (s.failed = !0, setTimeout(s.hide, 0), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(n.onFail)) return n.onFail(e)
                    },
                    cache: n.cache,
                    stat: n.stat,
                    fromBox: !0
                };
            return n.prgEl && (n.showProgress = _ui_util__WEBPACK_IMPORTED_MODULE_3__.showGlobalPrg.pbind(n.prgEl, {
                cls: n.prgClass,
                w: n.prgW,
                h: n.prgH,
                hide: !0
            }), n.hideProgress = _dom__WEBPACK_IMPORTED_MODULE_4__.hide.pbind("global_prg")), n.showProgress ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.extend)(r, {
                showProgress: n.showProgress,
                hideProgress: n.hideProgress
            }) : (s.setOptions({
                title: !1,
                hideButtons: !0
            }).show(), boxQueue.count() < 2 && (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.removeClass)(bodyNode, "layers_shown")), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(s.bodyNode), r.showProgress = function() {
                Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxLoader), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.boxRefreshCoords)(boxLoader)
            }, r.hideProgress = _dom__WEBPACK_IMPORTED_MODULE_4__.hide.pbind(boxLoader)), s.removeButtons().addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_close")), ajax.post(e, t, r), s
        }

        function showTabbedBox(e, t, n, o) {
            return (n = n || {}).stat = n.stat || [], n.stat.push("box.js", "boxes.css"), showBox(e, t, n, o)
        }

        function showFastBox(e, t, n, o, i, s) {
            return new MessageBox("string" == typeof e ? {
                title: e
            } : e).content(t).setButtons(n, o, i, s).show()
        }

        function showCaptchaBox(e, t, n, o) {
            var i = function(t) {
                    if (!t || void 0 === t.keyCode || 10 === t.keyCode || 13 === t.keyCode) {
                        var i = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", n.bodyNode);
                        if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.trim)(i.value) || !0 === t) {
                            var s = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", n.bodyNode)[0];
                            Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(i), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(s), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass1)("progress", n.bodyNode)), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(i), o.onSubmit(e, i.value)
                        } else Object(_dom__WEBPACK_IMPORTED_MODULE_4__.elfocus)(i)
                    }
                },
                s = !!n,
                r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.intval)(t) ? "" : "&s=1",
                a = o.imgSrc || "/captcha.php?sid=" + e + r;
            if (!s) {
                var _ = '\n<div class="captcha">\n  <div><img src="' + a + '"/></div>\n  <div>\n    <input type="text" class="big_text" maxlength="7" placeholder="' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_captcha_input_here") + '" />\n    <div class="progress" /></div>\n  </div>\n</div>' + (o.addText || "");
                n = showFastBox({
                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("captcha_enter_code"),
                    width: 305,
                    onHide: o.onHide,
                    onDestroy: o.onDestroy || !1
                }, _, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("captcha_send"), function() {
                    n.submit()
                }, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("captcha_cancel"), function() {
                    var e = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", n.bodyNode),
                        t = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", n.bodyNode);
                    Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(e), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(t), n.hide()
                })
            }
            n.submit = i.pbind(!0), n.changed = !0;
            var c = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", n.bodyNode),
                l = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", n.bodyNode);
            return s && (c.value = "", l.src = "/captcha.php?sid=" + e + r, Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass1)("progress", n.bodyNode))), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(c), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.addEvent)(c, "keypress", i), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.addEvent)(l, "click", function() {
                this.src = "/captcha.php?sid=" + e + r + "&v=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.irand)(1e6, 2e6)
            }), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.elfocus)(c), n
        }

        function showReCaptchaBox(e, t, n, o) {
            window.recaptchaResponse = function(e) {
                o.onSubmit(e)
            };
            var i = !!n,
                s = !!window.grecaptcha;
            if (!i) {
                s || (window.recaptchaCallback = function() {
                    var t = Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.curBox)();
                    if (t) {
                        var n = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass1)("recaptcha", t.bodyNode);
                        n && (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.val)(n, ""), window.grecaptcha.render(n, {
                            sitekey: e,
                            callback: window.recaptchaResponse
                        }))
                    }
                }, headNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ce)("script", {
                    type: "text/javascript",
                    src: "https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit&hl=" + t
                })));
                var r = '<div class="recaptcha"></div>' + (o.addText || "");
                n = showFastBox({
                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_recaptcha_title"),
                    width: 354,
                    onHide: o.onHide,
                    onDestroy: o.onDestroy || !1
                }, r, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("captcha_cancel"));
                var a = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass1)("recaptcha", n.bodyNode);
                a.id = "recaptcha" + (n.guid ? n.guid : "0"), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.showProgress)(a)
            }
            return i && s ? window.grecaptcha.reset() : s && window.recaptchaCallback(), n.changed = !0, n
        }
    },
    240: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "vkLocal", function() {
            return _
        }), n.d(t, "lTimeout", function() {
            return c
        }), n.d(t, "rand", function() {
            return l
        }), n.d(t, "irand", function() {
            return u
        }), n.d(t, "isUndefined", function() {
            return d
        }), n.d(t, "isFunction", function() {
            return p
        }), n.d(t, "isArray", function() {
            return h
        }), n.d(t, "isString", function() {
            return m
        }), n.d(t, "isObject", function() {
            return g
        }), n.d(t, "isEmpty", function() {
            return b
        }), n.d(t, "vkNow", function() {
            return f
        }), n.d(t, "vkImage", function() {
            return E
        }), n.d(t, "trim", function() {
            return O
        }), n.d(t, "stripHTML", function() {
            return y
        }), n.d(t, "escapeRE", function() {
            return v
        }), n.d(t, "intval", function() {
            return w
        }), n.d(t, "floatval", function() {
            return C
        }), n.d(t, "positive", function() {
            return P
        }), n.d(t, "isNumeric", function() {
            return D
        }), n.d(t, "winToUtf", function() {
            return x
        }), n.d(t, "replaceEntities", function() {
            return M
        }), n.d(t, "clean", function() {
            return T
        }), n.d(t, "unclean", function() {
            return j
        }), n.d(t, "each", function() {
            return B
        }), n.d(t, "indexOf", function() {
            return L
        }), n.d(t, "inArray", function() {
            return k
        }), n.d(t, "clone", function() {
            return S
        }), n.d(t, "arrayKeyDiff", function() {
            return R
        }), n.d(t, "extend", function() {
            return A
        }), n.d(t, "addTemplates", function() {
            return I
        }), n.d(t, "getTemplate", function() {
            return W
        }), n.d(t, "serializeForm", function() {
            return U
        }), n.d(t, "extractUrls", function() {
            return K
        }), n.d(t, "isRetina", function() {
            return N
        }), n.d(t, "getCaretCharacterOffsetWithin", function() {
            return q
        }), n.d(t, "formatCount", function() {
            return H
        }), n.d(t, "encodeHtml", function() {
            return G
        }), n.d(t, "decodeHtml", function() {
            return Y
        }), n.d(t, "initUtilsCommon", function() {
            return V
        });
        var o = n(230),
            i = n(164),
            s = n(191),
            r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var r, a = e[Symbol.iterator](); !(o = (r = a.next()).done) && (n.push(r.value), !t || n.length !== t); o = !0);
                        } catch (e) {
                            i = !0, s = e
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };

        function _(e) {
            var t = PageID;
            return function() {
                t === PageID && e.apply(this, arguments)
            }
        }

        function c(e, t) {
            return setTimeout(_(e), t)
        }
        var l = function(e, t) {
                return Math.random() * (t - e + 1) + e
            },
            u = function(e, t) {
                return Math.floor(l(e, t))
            },
            d = function(e) {
                return void 0 === e
            },
            p = function(e) {
                return e && "[object Function]" === Object.prototype.toString.call(e)
            },
            h = function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            },
            m = function(e) {
                return "string" == typeof e
            },
            g = function(e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            };

        function b(e) {
            if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }
        var f = function() {
                return +new Date
            },
            E = function() {
                return window.Image ? new Image : Object(o.ce)("img")
            },
            O = function(e) {
                return (e || "").replace(/^\s+|\s+$/g, "")
            },
            y = function(e) {
                return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
            },
            v = function(e) {
                return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
            };

        function w(e) {
            return !0 === e ? 1 : parseInt(e) || 0
        }

        function C(e) {
            return !0 === e ? 1 : parseFloat(e) || 0
        }

        function P(e) {
            return (e = w(e)) < 0 ? 0 : e
        }

        function D(e) {
            return !isNaN(e)
        }

        function x(e) {
            return e.replace(/&#(\d\d+);/g, function(e, t) {
                return (t = w(t)) >= 32 ? String.fromCharCode(t) : e
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function M() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            return Object(o.se)("<textarea>" + e + "</textarea>").value
        }

        function T(e) {
            return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function j(e) {
            return M(e.replace(/\t/g, "\n"))
        }

        function B(e, t) {
            if (g(e) || void 0 === e.length) {
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n) && !1 === t.call(e[n], n, e[n])) break
            } else
                for (var o = 0, i = e.length; o < i; o++) {
                    var s = e[o];
                    if (!1 === t.call(s, o, s)) break
                }
            return e
        }

        function L(e, t, n) {
            for (var o = n || 0, i = (e || []).length; o < i; o++)
                if (e[o] == t) return o;
            return -1
        }

        function k(e, t) {
            return -1 !== L(t, e)
        }

        function S(e, t) {
            var n = g(e) || void 0 === e.length ? {} : [];
            for (var o in e)(!/webkit/i.test(_ua) || "layerX" != o && "layerY" != o && "webkitMovementX" != o && "webkitMovementY" != o) && (t && "object" === a(e[o]) && "prototype" !== o && null !== e[o] ? n[o] = S(e[o]) : n[o] = e[o]);
            return n
        }

        function R(e) {
            var t = {},
                n = arguments.length,
                o = arguments;
            for (var i in e)
                if (e.hasOwnProperty(i)) {
                    for (var s = !1, r = 1; r < n; r++) o[r][i] && o[r][i] === e[i] && (s = !0);
                    s || (t[i] = e[i])
                }
            return t
        }

        function A() {
            var e = arguments,
                t = e.length,
                n = e[0] || {},
                o = 1,
                i = !1;
            for ("boolean" == typeof n && (i = n, n = e[1] || {}, o = 2), "object" === (void 0 === n ? "undefined" : a(n)) || p(n) || (n = {}); o < t; o++) {
                var s = e[o];
                if (null != s)
                    for (var r in s)
                        if (s.hasOwnProperty(r)) {
                            var _ = n[r],
                                c = s[r];
                            n !== c && (i && c && "object" === (void 0 === c ? "undefined" : a(c)) && !c.nodeType ? n[r] = A(i, _ || (null != c.length ? [] : {}), c) : void 0 !== c && (n[r] = c))
                        }
            }
            return n
        }

        function I(e) {
            window.templates = window.templates || {}, A(window.templates, e)
        }

        function W(e, t) {
            var n = (window.templates = window.templates || {})[e];
            return "function" == typeof n && (n = n()), n && t ? Object(o.rs)(n, t) : n || ""
        }

        function U(e) {
            if ("object" !== (void 0 === e ? "undefined" : a(e))) return !1;
            var t = {},
                n = function(t) {
                    return Object(o.geByTag)(t, e)
                },
                i = function(n, i) {
                    if (i.name)
                        if ("text" !== i.type && i.type)
                            if (i.getAttribute("bool")) {
                                var r = Object(o.val)(i);
                                if (!r || "0" === r) return;
                                t[i.name] = 1
                            } else t[i.name] = s.browser.msie && !i.value && e[i.name] ? e[i.name].value : i.value;
                    else t[i.name] = Object(o.val)(i)
                };
            return B(n("input"), function(e, t) {
                if ("radio" !== t.type && "checkbox" !== t.type || t.checked) return i(0, t)
            }), B(n("select"), i), B(n("textarea"), i), t
        }

        function K(e, t) {
            for (var n = t ? /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i : /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i, o = void 0, i = []; e && (o = e.match(n));) {
                e = e.substr(o.index + o[0].length);
                var s = 0;
                o[4] || (s = 7), i.push({
                    url: o[2 + s],
                    query: o[5 + s] || "",
                    domain: o[4 + s]
                })
            }
            return i
        }
        var N = function() {
            return window.devicePixelRatio >= 2
        };

        function q(e) {
            var t = 0,
                n = 0,
                o = e.ownerDocument || e.document,
                i = o.defaultView || o.parentWindow;
            if (i.getSelection().rangeCount > 0) {
                var s = i.getSelection().getRangeAt(0),
                    r = s.cloneRange();
                r.selectNodeContents(e), r.setEnd(s.startContainer, s.startOffset), t = r.toString().length, r.setEnd(s.endContainer, s.endOffset), n = r.toString().length
            }
            return [t, n]
        }

        function H(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = t.kLimit || 1e3;
            return e >= (t.mLimit || 1e6) && !t.noCheck ? H(e = (e = w(e / 1e5)) > 1e3 ? w(e / 10) : e / 10, A(t, {
                noCheck: !0
            }), !0) + "M" : e >= n && !t.noCheck ? H(e = (e = w(e / 100)) > 100 ? w(e / 10) : e / 10, A(t, {
                noCheck: !0
            }), !0) + "K" : Object(i.langNumeric)(e, "%s", !0).replace(/,/g, ".")
        }
        var F, z = r((F = null, [function(e) {
                return F || (F = Object(o.se)("<span> </span>")), F.innerText = e, F.innerHTML
            }, function(e) {
                return F || (F = Object(o.se)("<span> </span>")), F.innerHTML = e.replace(/<br\s*\/?>/gim, "\n"), F.innerText
            }]), 2),
            G = z[0],
            Y = z[1];

        function V() {
            window.PageID = window.PageID || 1
        }
    },
    244: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "curBox", function() {
            return c
        }), n.d(t, "initBoxQueue", function() {
            return l
        }), n.d(t, "boxRefreshCoords", function() {
            return u
        }), n.d(t, "showDoneBox", function() {
            return d
        }), n.d(t, "getBoxQueue", function() {
            return p
        });
        var o = n(288),
            i = n(240),
            s = n(230),
            r = n(126),
            a = n(191),
            _ = {
                hideAll: function(e, t) {
                    if (e)
                        for (; _.count();) _.hideLast();
                    else {
                        if (_.count()) {
                            var n = _message_boxes[_._boxes.pop()];
                            n._in_queue = !1, n._hide(!1, !1, t)
                        }
                        for (; _.count();) {
                            _message_boxes[_._boxes.pop()]._in_queue = !1
                        }
                    }
                },
                hideLast: function(e, t) {
                    if (_.count()) {
                        var n = window._message_boxes[_._boxes[_.count() - 1]];
                        if (!0 === e && (n.changed || _.skip || t && t.target && t.target.tagName && "input" !== t.target.tagName.toLowerCase() && cur.__mdEvent && t.target !== cur.__mdEvent.target)) return void(_.skip = !1);
                        n.hide()
                    }
                    if (t && "click" === t.type) return Object(o.cancelEvent)(t)
                },
                hideBGClick: function(e) {
                    e && e.target && /^box_layer/.test(e.target.id) && _.hideLast()
                },
                count: function() {
                    return _._boxes.length
                },
                _show: function(e) {
                    var t = _message_boxes[e];
                    if (t && !t._in_queue) {
                        _.count() ? _message_boxes[_._boxes[_.count() - 1]]._hide(!0, !0) : window.tooltips && tooltips.hideAll(), t._in_queue = !0;
                        var n = !!_.count();
                        _.curBox = e, t._show(n || _.currHiding, n), _._boxes.push(e)
                    }
                },
                _hide: function(e) {
                    var t = _message_boxes[e];
                    if (t && t._in_queue && _._boxes[_.count() - 1] === e && t.isVisible() && (t._in_queue = !1, _._boxes.pop(), t._hide(!!_.count()), _.count())) {
                        var n = _._boxes[_.count() - 1];
                        _.curBox = n, _message_boxes[n]._show(!0, !0, !0)
                    }
                },
                _boxes: [],
                curBox: 0
            };

        function c() {
            var e = window._message_boxes[_.curBox];
            return e && e.isVisible() ? e : null
        }

        function l() {
            _.hideLastCheck = _.hideLast.pbind(!0), window._message_box_guid = 0, window._message_boxes = []
        }

        function u(e) {
            var t = window.innerHeight || document.documentElement.clientHeight || boxLayerBG.offsetHeight,
                n = a.browser.mobile ? Object(i.intval)(window.pageYOffset) : 0,
                o = Object(s.getSize)(e);
            e.style.marginTop = Math.max(10, n + (t - o[1]) / 3) + "px"
        }

        function d(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = (t.w || 380) + 20,
                _ = t.w ? ' style="width: ' + t.w + 'px;"' : "",
                c = bodyNode.offsetWidth,
                l = Object(s.ce)("div", {
                    className: "top_result_baloon_wrap fixed " + (t.className || ""),
                    innerHTML: '<div class="top_result_baloon"' + _ + ">" + e + "</div>"
                }, {
                    left: (c - n) / 2
                });
            t.parentEl ? Object(s.geByClass1)(t.parentEl).appendChild(l) : bodyNode.insertBefore(l, pageNode);
            var u = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
                d = a.browser.mobile ? Object(i.intval)(window.pageYOffset) : 0,
                p = Object(s.getSize)(l);
            l.style.top = Math.max(10, d + (u - p[1]) / 3) + "px";
            var h = t.out || 2e3,
                m = new Date,
                g = function e() {
                    h < 0 || (window.doneBoxTO = setTimeout(function() {
                        !t.permit || t.permit() ? Object(r.fadeOut)(l.firstChild, 500, function() {
                            Object(s.re)(l), t.callback && t.callback()
                        }) : e()
                    }, h))
                };
            return Object(o.addEvent)(l, "mouseenter", function() {
                clearTimeout(window.doneBoxTO), h -= new Date - m
            }), Object(o.addEvent)(l, "mouseleave", function() {
                m = new Date, g()
            }), g(), l
        }

        function p() {
            return _
        }
    },
    288: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "KEY", function() {
            return r
        }), n.d(t, "addEvent", function() {
            return a
        }), n.d(t, "removeEvent", function() {
            return _
        }), n.d(t, "triggerEvent", function() {
            return c
        }), n.d(t, "cancelEvent", function() {
            return l
        }), n.d(t, "stopEvent", function() {
            return u
        }), n.d(t, "normEvent", function() {
            return d
        }), n.d(t, "checkEvent", function() {
            return p
        }), n.d(t, "checkKeyboardEvent", function() {
            return h
        }), n.d(t, "checkOver", function() {
            return m
        });
        var o = n(230),
            i = n(240),
            s = n(191),
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

        function a(e, t, n, s, r, a) {
            if ((e = Object(o.ge)(e)) && 3 != e.nodeType && 8 != e.nodeType) {
                var _, c = r ? ((_ = function(e) {
                    var t = e.data;
                    e.data = r;
                    var o = n.apply(this, [e]);
                    return e.data = t, o
                }).handler = n, _) : n;
                e.setInterval && e !== window && (e = window);
                var u = Object(o.data)(e, "events") || Object(o.data)(e, "events", {}),
                    p = Object(o.data)(e, "handle") || Object(o.data)(e, "handle", function(e) {
                        return function() {
                            (function(e) {
                                e = d(e);
                                var t = Array.from(arguments);
                                t[0] = e;
                                var n = Object(o.data)(this, "events");
                                if (!n || "string" != typeof e.type || !n[e.type] || !n[e.type].length) return;
                                var i = (n[e.type] || []).slice();
                                for (var s in i)
                                    if (i.hasOwnProperty(s)) {
                                        if ("mouseover" === e.type || "mouseout" === e.type) {
                                            for (var r = e.relatedElement; r && r !== this;) r = r.parentNode;
                                            if (r === this) continue
                                        }
                                        var a = i[s].apply(this, t);
                                        if (!1 !== a && -1 !== a || l(e), -1 === a) return !1
                                    }
                            }).apply(e, arguments)
                        }
                    }(e));
                Object(i.each)(t.split(/\s+/), function(t, n) {
                    u[n] || (u[n] = [], !s && e.addEventListener ? e.addEventListener(n, p, a) : !s && e.attachEvent && e.attachEvent("on" + n, p)), u[n].push(c)
                })
            }
        }

        function _(e, t, n, s) {
            if (void 0 === s && (s = !1), e = Object(o.ge)(e)) {
                var r = Object(o.data)(e, "events");
                if (r)
                    if ("string" == typeof t) Object(i.each)(t.split(/\s+/), function(t, a) {
                        if (Object(i.isArray)(r[a])) {
                            var _ = r[a].length;
                            if (Object(i.isFunction)(n)) {
                                for (var c = _ - 1; c >= 0; c--)
                                    if (r[a][c] && (r[a][c] === n || r[a][c].handler === n)) {
                                        r[a].splice(c, 1), _--;
                                        break
                                    }
                            } else {
                                for (var l = 0; l < _; l++) delete r[a][l];
                                _ = 0
                            }
                            _ || (e.removeEventListener ? e.removeEventListener(a, Object(o.data)(e, "handle"), s) : e.detachEvent && e.detachEvent("on" + a, Object(o.data)(e, "handle")), delete r[a])
                        }
                    }), Object(i.isEmpty)(r) && (Object(o.removeData)(e, "events"), Object(o.removeData)(e, "handle"));
                    else
                        for (var a in r) r.hasOwnProperty(a) && _(e, a)
            }
        }

        function c(e, t, n, s) {
            e = Object(o.ge)(e);
            var r = Object(o.data)(e, "handle");
            if (r) {
                var a = function() {
                    return r.call(e, Object(i.extend)(n || {}, {
                        type: t,
                        target: e
                    }))
                };
                s ? a() : setTimeout(a, 0)
            }
        }

        function l(e) {
            if (!(e = e || window.event)) return !1;
            for (; e.originalEvent;) e = e.originalEvent;
            return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
        }

        function u(e) {
            if (!(e = e || window.event)) return !1;
            for (; e.originalEvent;) e = e.originalEvent;
            return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
        }

        function d(e) {
            var t = e = e || window.event;
            if ((e = Object(i.clone)(t)).originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target), null == e.pageX && null != e.clientX) {
                var n = document.documentElement,
                    o = bodyNode;
                e.pageX = e.clientX + (n && n.scrollLeft || o && o.scrollLeft || 0) - (n.clientLeft || 0), e.pageY = e.clientY + (n && n.scrollTop || o && o.scrollTop || 0) - (n.clientTop || 0)
            }
            return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && s.browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
        }

        function p(e) {
            var t = e || window.event;
            return t && ("click" === t.type || "mousedown" === t.type || "mouseup" === t.type) && (t.which > 1 || t.button > 1 || t.ctrlKey || t.shiftKey || s.browser.mac && t.metaKey) || !1
        }

        function h(e) {
            if (!(e = d(e)) || !e.target) return !1;
            if (!e.screenX) return !0;
            var t = Object(o.getSize)(e.target),
                n = Object(o.getXY)(e.target),
                i = e.pageX - n[0],
                s = e.pageY - n[1];
            return i < -1 || i > t[0] + 1 || s < -1 || s > t[1] + 1 || Math.abs(e.pageX - n[0] - t[0] / 2) < 1 && Math.abs(e.pageY - n[1] - t[1] / 2) < 1
        }

        function m(e, t) {
            if (!e) return !0;
            e = e.originalEvent || e, t = t || e.target;
            var n = e.fromElement || e.relatedTarget;
            if (!n || n === t || n === t.parentNode) return !0;
            for (; n !== t && n.parentNode && n.parentNode !== bodyNode;) n = n.parentNode;
            return n !== t
        }
    },
    325: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "getCookie", function() {
            return i
        }), n.d(t, "setCookie", function() {
            return s
        }), n.d(t, "hideCookiesPolicy", function() {
            return r
        }), n.d(t, "initCookies", function() {
            return a
        });
        var o = n(230);

        function i(e) {
            return function() {
                window._cookies = {};
                for (var e = document.cookie.split(";"), t = /^[\s]*([^\s]+?)$/i, n = 0, o = e.length; n < o; n++) {
                    var i = e[n].split("=");
                    2 === i.length && (_cookies[i[0].match(t)[1]] = unescape(i[1].match(t) ? i[1].match(t)[1] : ""))
                }
            }(), _cookies[e]
        }

        function s(e, t, n, o) {
            var i = "";
            if (n) {
                var s = new Date;
                s.setTime(s.getTime() + 24 * n * 60 * 60 * 1e3), i = "; expires=" + s.toGMTString()
            }
            var r = window.locDomain;
            document.cookie = e + "=" + escape(t) + i + "; path=/" + (r ? "; domain=." + r : "") + (o && "https:" === locProtocol ? "; secure" : "")
        }

        function r() {
            Object(o.re)("cookies_policy_wrap"), ajax.post("/settings", {
                act: "a_hide_cookies_policy"
            })
        }

        function a() {
            window._cookies = {}
        }
    },
    327: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "notaBene", function() {
            return l
        }), n.d(t, "updSideTopLink", function() {
            return u
        }), n.d(t, "createButton", function() {
            return d
        }), n.d(t, "actionsMenuItemLocked", function() {
            return p
        }), n.d(t, "lockActionsMenuItem", function() {
            return h
        }), n.d(t, "unlockActionsMenuItem", function() {
            return m
        }), n.d(t, "linkLocked", function() {
            return g
        }), n.d(t, "lockLink", function() {
            return b
        }), n.d(t, "unlockLink", function() {
            return f
        }), n.d(t, "lockButton", function() {
            return E
        }), n.d(t, "unlockButton", function() {
            return O
        }), n.d(t, "buttonLocked", function() {
            return y
        }), n.d(t, "isButtonLocked", function() {
            return v
        }), n.d(t, "disableButton", function() {
            return w
        }), n.d(t, "sbWidth", function() {
            return C
        }), n.d(t, "isChecked", function() {
            return P
        }), n.d(t, "checkbox", function() {
            return D
        }), n.d(t, "disable", function() {
            return x
        }), n.d(t, "radioval", function() {
            return M
        }), n.d(t, "radiobtn", function() {
            return T
        }), n.d(t, "showProgress", function() {
            return j
        }), n.d(t, "hideProgress", function() {
            return B
        }), n.d(t, "disableEl", function() {
            return L
        }), n.d(t, "enableEl", function() {
            return k
        }), n.d(t, "initUiHelpers", function() {
            return S
        });
        var o = n(230),
            i = n(288),
            s = n(240),
            r = n(57),
            a = n(126),
            _ = n(191),
            c = n(164);

        function l(e, t, n) {
            if (e = Object(o.ge)(e)) {
                n || Object(o.elfocus)(e), void 0 === Object(o.data)(e, "backstyle") && Object(o.data)(e, "backstyle", e.style.backgroundColor || "");
                var i = Object(o.data)(e, "back") || Object(o.data)(e, "back", Object(o.getStyle)(e, "backgroundColor")),
                    s = {
                        notice: "#FFFFE0",
                        warning: "#FAEAEA"
                    };
                Object(o.setStyle)(e, "backgroundColor", s[t] || t || s.warning), setTimeout(a.animate.pbind(e, {
                    backgroundColor: i
                }, 300, function() {
                    e.style.backgroundColor = Object(o.data)(e, "backstyle")
                }), 400)
            }
        }

        function u(e) {
            if (window.scrollNode && !_.browser.mobile && window._tbLink) {
                var t = Object(o.ge)("page_body"),
                    n = Object(o.getXY)(t),
                    i = Object(r.scrollGetY)(),
                    s = bodyNode.scrollLeft,
                    l = Object(o.ge)("side_bar"),
                    u = Object(o.isVisible)(l);
                if (window._stlSideTop = Math.max((u ? Object(o.getSize)(l)[1] : 0) - i - (_.browser.mozilla ? Object(o.getXY)(pageNode)[1] : 0), n[1]), e || s != __scrLeft) {
                    var d = Object(o.ge)("page_layout"),
                        p = vk.rtl ? d.offsetLeft + d.offsetWidth : 0,
                        h = vk.rtl ? (window.lastWindowWidth || 0) - p : d.offsetLeft;
                    Object(o.setStyle)(_stlLeft, {
                        width: Math.max(h - 1, 0)
                    });
                    var m = vk.rtl ? n[0] + t.offsetWidth + 5 : h,
                        g = vk.rtl ? p - m : n[0] - 5 - m;
                    Object(o.setStyle)(_stlSide, {
                        left: m - s,
                        width: Math.max(g, 0)
                    }), __scrLeft = s
                }
                Object(o.setStyle)(_stlSide, {
                    top: _stlSideTop,
                    height: Math.max((window.lastWindowHeight || 0) - _stlSideTop, 0)
                }), __adsUpdate();
                var b = _tbLink.loc || _stlWas || i > 200,
                    f = i > 250 && cur._regBar,
                    E = 0,
                    O = !1;
                if (b) {
                    1 !== _stlShown && (Object(o.show)(_stlLeft, _stlSide), Object(o.addClass)(_stlLeft, "stl_active"), Object(o.addClass)(_stlSide, "stl_active"), _stlShown = 1), _tbLink.loc && cur._noUpLink && (i = 0), _stlWas && i > 500 && (_stlWas = 0), i > 200 ? (E = (i - 200) / 200, (_stlWasSet || _stlBack) && (_stlWasSet = _stlBack = 0, O = 1, Object(o.val)(_stlText, Object(c.getLang)("global_to_top")), Object(o.removeClass)(_stlText, "down"), Object(o.removeClass)(_stlText, "back"))) : (E = (200 - i) / 200, _stlWas ? _stlWasSet || (_stlWasSet = 1, O = 0, Object(o.val)(_stlText, ""), Object(o.addClass)(_stlText, "down"), _stlBack && (_stlBack = 0, Object(o.removeClass)(_stlText, "back"))) : _tbLink.loc && (_stlBack || (_stlBack = 1, O = _tbLink.fast ? 1 : 0, Object(o.val)(_stlText, Object(c.getLang)("global_back")), Object(o.addClass)(_stlText, "back"), _stlWasSet && (_stlWasSet = 0, Object(o.removeClass)(_stlText, "down"))))), !1 !== O && Object(o.toggleClass)(_stlLeft, "over_fast", Object(o.hasClass)(_stlLeft, "over") && O);
                    var y = {
                        opacity: Math.min(Math.max(E, 0), 1)
                    };
                    vk.staticheader && (y.top = -Math.min(Object(o.getSize)("page_header_cont")[1], i)), Object(o.setStyle)(_stlLeft, y)
                } else 0 !== _stlShown && (Object(o.hide)(_stlLeft, _stlSide), _stlShown = 0);
                vk.id || (!_regBar && f ? (_regBar = 1, Object(o.val)(Object(o.ge)("reg_bar_content"), cur._regBar), Object(a.animate)(Object(o.ge)("reg_bar"), {
                    top: 0,
                    transition: a.Fx.Transitions.sineInOut
                }, 400), Object(a.animate)(Object(o.ge)("stl_bg"), {
                    paddingTop: 60,
                    transition: a.Fx.Transitions.sineInOut
                }, 400)) : _regBar && !f && (_regBar = 0, Object(a.animate)(Object(o.ge)("reg_bar"), {
                    top: -56,
                    transition: a.Fx.Transitions.sineInOut
                }, 400), Object(a.animate)(Object(o.ge)("stl_bg"), {
                    paddingTop: 13,
                    transition: a.Fx.Transitions.sineInOut
                }, 400)))
            }
        }

        function d(e, t) {
            if ((e = Object(o.ge)(e)) && !e.btnevents)
                if (Object(o.hasClass)(e, "flat_button")) Object(s.isFunction)(t) && (e.onclick = t.pbind(e));
                else {
                    var n = e.parentNode;
                    if (Object(o.hasClass)(n, "button_blue") || Object(o.hasClass)(n, "button_gray")) Object(s.isFunction)(t) && (e.onclick = t.pbind(e));
                    else {
                        var r = !1;
                        Object(i.addEvent)(e, "click mousedown mouseover mouseout", function(s) {
                            if (!Object(o.hasClass)(n, "locked")) switch (s.type) {
                                case "click":
                                    if (!r) return;
                                    return e.className = "button_hover", t(e), Object(i.cancelEvent)(s);
                                case "mousedown":
                                    e.className = "button_down";
                                    break;
                                case "mouseover":
                                    r = !0, e.className = "button_hover";
                                    break;
                                case "mouseout":
                                    e.className = "button", r = !1
                            }
                        }), e.btnevents = !0
                    }
                }
        }

        function p(e) {
            var t = Object(o.ge)(e);
            if (t) return Object(o.hasClass)(t, "ui_actions_menu_item_lock")
        }

        function h(e) {
            if ((e = Object(o.ge)(e)) && Object(o.hasClass)(e, "ui_actions_menu_item") && !Object(o.hasClass)(e, "ui_actions_menu_item_lock")) {
                Object(o.data)(e, "inner", e.innerHTML), Object(o.addClass)(e, "ui_actions_menu_item_lock");
                var t = Object(o.ce)("div", {
                    className: "ui_actions_menu_item_lock_text"
                });
                Object(o.val)(t, e.innerHTML), e.appendChild(t), j(e)
            }
        }

        function m(e) {
            (e = Object(o.ge)(e)) && Object(o.hasClass)(e, "ui_actions_menu_item") && Object(o.hasClass)(e, "ui_actions_menu_item_lock") && (Object(o.removeClass)(e, "ui_actions_menu_item_lock"), e.innerHTML = Object(o.data)(e, "inner"))
        }

        function g(e) {
            var t = Object(o.ge)(e);
            if (t) return Object(o.hasClass)(t, "link_lock")
        }

        function b(e, t) {
            var n = Object(o.ge)(e);
            n && "a" === n.tagName.toLowerCase() && !g(n) && (Object(o.addClass)(n, "link_lock"), t && Object(s.each)(t, function(e, t) {
                return Object(o.addClass)(n, t)
            }))
        }

        function f(e, t) {
            var n = Object(o.ge)(e);
            n && g(n) && (Object(o.removeClass)(n, "link_lock"), t && Object(s.each)(t, function(e, t) {
                return Object(o.removeClass)(n, t)
            }))
        }

        function E(e) {
            var t = Object(o.ge)(e);
            if (t && ("button" === t.tagName.toLowerCase() || Object(o.hasClass)(t, "flat_button") || Object(o.hasClass)(t, "wr_header")) && !v(t)) {
                var n = Object(o.getSize)(t);
                Object(o.addClass)(t, "flat_btn_lock"), Object(o.data)(t, "inner", t.innerHTML), Object(o.setStyle)(t, {
                    width: n[0],
                    height: n[1]
                }), t.innerHTML = "", j(t, "btn_lock")
            }
        }

        function O(e) {
            var t = Object(o.ge)(e);
            t && v(t) && (B(t), t.innerHTML = Object(o.data)(t, "inner"), Object(o.removeClass)(t, "flat_btn_lock"), Object(o.setStyle)(t, {
                width: null,
                height: null
            }))
        }

        function y(e) {
            return v(e)
        }

        function v(e) {
            var t = Object(o.ge)(e);
            if (t) return Object(o.hasClass)(t, "flat_btn_lock")
        }

        function w(e, t) {
            var n = Object(o.ge)(e);
            if (n && "button" === n.tagName.toLowerCase())
                if (t) {
                    if (!Object(o.isVisible)(n)) return;
                    n.parentNode.insertBefore(Object(o.ce)("button", {
                        innerHTML: n.innerHTML,
                        className: n.className + " button_disabled"
                    }), n), Object(o.hide)(n)
                } else {
                    var i = Object(o.domPS)(n);
                    i && Object(o.hasClass)(i, "button_disabled") && Object(o.re)(i), Object(o.show)(n)
                }
        }

        function C(e) {
            if (void 0 === window._sbWidth || e) {
                var t = Object(o.ce)("div", {
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
            return e = Object(o.ge)(e), Object(o.hasClass)(e, "on") ? 1 : ""
        }

        function D(e, t) {
            var n = Object(o.ge)(e);
            if (n && !Object(o.hasClass)(n, "disabled")) return void 0 === t && (t = !P(n)), Object(o.toggleClass)(n, "on", t), n.setAttribute("aria-checked", t ? "true" : "false"), !1
        }

        function x(e, t) {
            return e = Object(o.ge)(e), void 0 === t && (t = !Object(o.hasClass)(e, "disabled")), Object(o.toggleClass)(e, "disabled", t), "INPUT" === e.tagName && (t ? e.setAttribute("readonly", "readonly") : e.removeAttribute("readonly")), !1
        }

        function M(e) {
            return !!radioBtns[e] && radioBtns[e].val
        }

        function T(e, t, n) {
            if (radioBtns[n] && !Object(o.hasClass)(e, "disabled")) return Object(s.each)(radioBtns[n].els, function() {
                this == e ? (Object(o.addClass)(this, "on"), this.setAttribute("aria-checked", "true"), this.setAttribute("tabindex", "0")) : (Object(o.removeClass)(this, "on"), this.setAttribute && (this.setAttribute("aria-checked", "false"), this.setAttribute("tabindex", "-1")))
            }), radioBtns[n].val = t
        }

        function j(e, t, n, i) {
            if (e = Object(o.ge)(e)) {
                var s = void 0;
                return Object(o.hasClass)(e, "pr") ? s = e : (s = Object(o.se)(Object(o.rs)(vk.pr_tpl, {
                    id: t || "",
                    cls: n || ""
                })), i ? Object(o.domInsertBefore)(s, e) : e.appendChild(s)), setTimeout(function() {
                    Object(o.setStyle)(s, {
                        opacity: 1
                    })
                }), s
            }
        }

        function B(e) {
            e && (Object(o.hasClass)(e, "pr") ? Object(o.setStyle)(e, {
                opacity: 0
            }) : Object(o.re)(Object(o.geByClass1)("pr", e)))
        }

        function L(e) {
            Object(o.setStyle)(e, "pointer-events", "none")
        }

        function k(e) {
            Object(o.setStyle)(e, "pointer-events", "")
        }

        function S() {
            window.__scrLeft = 0, window.radioBtns = {}
        }
    },
    345: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "initDebugTools", function() {
            return i
        }), n.d(t, "logEvalError", function() {
            return s
        }), n.d(t, "debugLog", function() {
            return r
        }), n.d(t, "debugEl", function() {
            return a
        });
        var o = n(191);

        function i() {
            window._logTimer = (new Date).getTime()
        }

        function s(e, t) {
            window.Raven && (t && t.length > 350 && (t = t.slice(0, 150) + "..." + t.slice(-150)), e.message += ": " + t, Raven.captureException(e))
        }

        function r(e) {
            try {
                window.debuglogClient && debuglogClient(e);
                var t = "[" + ((new Date).getTime() - window._logTimer) / 1e3 + "] ";
                if (window.console && console.log) {
                    var n = Array.prototype.slice.call(arguments);
                    n.unshift(t), o.browser.msie || o.browser.mobile ? console.log(n.join(" ")) : console.log.apply(console, n)
                }
            } catch (e) {}
        }

        function a(e) {
            if (!e) return !1;
            var t = e.tagName,
                n = e.id,
                o = e.className,
                i = (t || "").toLowerCase();
            return o && (i += "." + e.className.replace(/\s+/g, ".")), n && !/^__vk/.test(n) && (i += "#" + e.id), i || (e.toString() || "[NULL]")
        }
    },
    57: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "scrollToY", function() {
            return r
        }), n.d(t, "scrollToTop", function() {
            return a
        }), n.d(t, "scrollGetX", function() {
            return _
        }), n.d(t, "scrollGetY", function() {
            return c
        }), n.d(t, "disableBodyScroll", function() {
            return l
        }), n.d(t, "enableBodyScroll", function() {
            return u
        }), n.d(t, "isBodyScrollEnabled", function() {
            return d
        });
        var o = n(327),
            i = n(126),
            s = n(230);

        function r(e, t, n, a) {
            if (void 0 == t && (t = 400), "ontouchstart" in document.documentElement && (t = 0), a || (e = Math.max(0, e - (vk.staticheader ? 0 : Object(s.getSize)("page_header_cont")[1]))), Object(s.data)(bodyNode, "tween") && Object(s.data)(bodyNode, "tween").stop(!1), Object(s.data)(htmlNode, "tween") && Object(s.data)(htmlNode, "tween").stop(!1), window.scrollAnimation = !1, t) {
                var l = function() {
                    window.scrollAnimation = !1, 2 === n && ("profile" != cur.module && "public" != cur.module && "group" != cur.module && "groups" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, void 0, !0), Object(o.updSideTopLink)())
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
                if (n && 2 !== n) {
                    "profile" != cur.module && "public" != cur.module && "group" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, e, !0);
                    var u = c() - e;
                    return Math.abs(u) > 6 && r(e + (u > 0 ? 6 : -6), 0, 2, !0), Object(o.updSideTopLink)(), clearTimeout(window.scrlToTO), void(window.scrlToTO = setTimeout(r.pbind(e, 100, 2, !0), 0))
                }
                window.scroll(_(), e), n || Object(o.updSideTopLink)()
            }
        }

        function a(e) {
            return r(0, e)
        }

        function _() {
            return window.pageXOffset || scrollNode.scrollLeft || document.documentElement.scrollLeft
        }

        function c() {
            return window.pageYOffset || scrollNode.scrollTop || document.documentElement.scrollTop
        }

        function l() {
            bodyNode.style.overflow = "hidden"
        }

        function u() {
            bodyNode.style.overflow = "auto"
        }

        function d() {
            return "hidden" !== bodyNode.style.overflow
        }
    },
    99: function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n(159),
            i = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            o = !0,
                            i = !1,
                            s = void 0;
                        try {
                            for (var r, a = e[Symbol.iterator](); !(o = (r = a.next()).done) && (n.push(r.value), !t || n.length !== t); o = !0);
                        } catch (e) {
                            i = !0, s = e
                        } finally {
                            try {
                                !o && a.return && a.return()
                            } finally {
                                if (i) throw s
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
                    var i = this.box.getOptions();
                    i && i.lang && (cur.lang = extend(cur.lang || {}, i.lang)), t.setOptions({
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
                    for (var s = 1; s <= 3; ++s) setTimeout(removeClass.pbind(geByClass1(this.classname("intro-block_" + s), this.boxBodyNode), this.classname("intro-block_animated")), 3e3 + 600 * s);
                    if (addEvent(this.paymentTotalBudgetInput, "blur change", this.updatePaymentAmount.bind(this)), addEvent(this.paymentScreenElement, "click", this.onPaymentScreenClicked.bind(this)), addEvent(this.paymentContinueElement, "click", this.onPaymentCompleted.bind(this)), this.paymentCardsTurnedOver = !1, !this.options.union_payment) {
                        this.settingsScreenInitialized = !1, this.initSettingsScreen(), this.initMoreSettingsScreen();
                        var r = langStr(getLang("ads_edit_easy_promote_accept_terms"), "link", '<a href="https://vk.com/ads?act=office_help&terms=1" target="_blank" onclick="event && event.stopPropagation()">', "/link", "</a>");
                        this.acceptTermsCheckbox = new Checkbox(this.acceptTermsCheckboxInput, {
                            checked: !0,
                            inline: !0,
                            width: "auto",
                            containerClass: this.classname("accept-terms-checkbox"),
                            label: r,
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
            }, e.prototype.onPaymentCheckDone = function(e, t, n, o, i) {
                if (e) switch (intval(n)) {
                    case 0:
                        setTimeout(this.waitForPaymentResult.bind(this, t), 1e3);
                        break;
                    case 1:
                        this.onPaymentCompleted();
                        break;
                    case 8:
                        var s = void 0;
                        if (!t.redirectDone) {
                            this.paymentSystemsFormElement.innerHTML = "", this.paymentSystemsFormElement.action = o.action, this.paymentSystemsFormElement.method = "get", this.paymentSystemsFormElement.innerHTML = Object.keys(o.params).reduce(function(e, t) {
                                return e + '<input type="hidden" autocomplete="off" name="' + t + '" value="' + o.params[t] + '"/>'
                            }, "");
                            var r = '<form action="' + this.paymentSystemsFormElement.action + '" method="' + this.paymentSystemsFormElement.method + '" id="popup_payment_form" accept-charset="UTF-8">' + this.paymentSystemsFormElement.innerHTML + "</form>",
                                a = getLang("payment_redirect").replace("%s", t.paymentSystemData.title);
                            if (cur._popup_text = cur.paymentsPopupHtml(a, r, "document.getElementById('popup_payment_form').submit()"), t.paymentPopup) s = t.paymentPopup;
                            else {
                                s = window.open("", "_blank", "scrollbars=1, resizable=1, menubar=1, left=0, top=0, toolbar=1, status=1")
                            }
                            cur.paymentsPopupWrite(s)
                        }
                        setTimeout(this.waitForPaymentResult.bind(this, extend(t, {
                            paymentPopup: t.paymentPopup || s,
                            redirectDone: !0
                        })), 1e3);
                        break;
                    case 2:
                    default:
                        this.onPaymentFailed(o, i)
                } else this.onPaymentFailed(n, i);
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
                    r = s[0],
                    a = s[1];
                a = intval(a);
                var _ = t.getAttribute("data-action");
                if (hasClass(t, "ui_actions_menu_item_disabled")) return !1;
                switch (_) {
                    case "save-to-current":
                        if (0 == n) return !1;
                        if (a <= 0) return !1;
                        this.editCriteriaPreset(r, a, "", 0);
                        break;
                    case "save-to-new":
                        this.isEditingAudienceName = !0, hide(this.audienceDropdown.container), show(this.audienceNameInput), show(this.editAudienceNameLinksWrapperElement), this.editingAudience || hide(this.editAudienceLinkWrapperElement), hide(this.audienceMenuDotsElement), val(this.audienceNameInput, ""), elfocus(this.audienceNameInput);
                        break;
                    case "delete-current":
                        if (a <= 0) return !1;
                        this.editCriteriaPreset(r, a, "", 1)
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
                var i = n ? t.offsetTop + t.clientHeight : this.currentScreen.offsetTop + this.currentScreen.clientHeight;
                return setStyle(this.screensWrapperElement, {
                    transform: "translateY(-" + i + "px)"
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
                    var i = o.getAttribute("data-type"),
                        s = o.getAttribute("data-inverse-type");
                    setTimeout(function() {
                        addClass(o, t.classname("payments-systems-item_rotated")), setTimeout(function() {
                            addClass(o, t.classname("payments-systems-item_no-transition")), o.clientHeight, (e ? removeClass : addClass)(o, t.classname("payments-systems-item_inverse")), addClass(o, t.classname("payments-systems-item_rotated-inv")), removeClass(o, t.classname("payments-systems-item_rotated")), toggleClass(o, t.classname("payments-systems-item_") + i, e), toggleClass(o, t.classname("payments-systems-item_") + s, !e), toggleClass(o, t.classname("payments-systems-item_clickable"), e ? !!i : !!s), o.clientHeight, removeClass(o, t.classname("payments-systems-item_no-transition")), o.clientHeight, removeClass(o, t.classname("payments-systems-item_rotated-inv"))
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
                    ], i = e; i <= t; ++i) o.push([i, langNumeric(i, n)]);
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
                    var r = this.options.category_suggestions[0];
                    r && (s.category1_id = r[1] ? r[1] : r[0])
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
                var i = this;
                if (!(e = intval(e) || this.options.selected_union_id)) return !1;
                var s = this.getUpdateTargetParams();
                if (!t && !o) {
                    var r = e + "_" + -s.request_id;
                    this.options.audiences[r] = [r, clean(n), getLang("ads_edit_easy_promote_audience_saving")], this.audienceDropdown.setOptions({
                        defaultItems: Object.values(this.options.audiences)
                    }), this.audienceDropdown.selectItem(r)
                }
                ajax.post("/adsedit?act=a_edit_criteria_preset", extend({}, s, {
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
                                    var r = e + "_" + t;
                                    "description" in n && (i.options.audiences[r][2] = n.description), i.audienceDropdown.setOptions({
                                        defaultItems: Object.values(i.options.audiences)
                                    })
                                }
                            } else {
                                var a = e + "_" + -s.request_id,
                                    _ = e + "_" + n.criteria_preset_id;
                                i.options.audiences[_] = i.options.audiences[a], i.options.audiences[_][0] = _, "description" in n && (i.options.audiences[_][2] = n.description), delete i.options.audiences[a], i.audienceDropdown.setOptions({
                                    defaultItems: Object.values(i.options.audiences)
                                }), i.audienceDropdown.selectItem(_)
                            }
                        if (o) {
                            var c = e + "_" + t;
                            delete i.options.audiences[c], i.audienceDropdown.setOptions({
                                defaultItems: Object.values(i.options.audiences)
                            }), i.audienceDropdown.selectItem(0)
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
                        hide(i.audienceMenuDotsElement), show(i.audienceProgressElement), showProgress(i.audienceProgressElement)
                    }),
                    hideProgress: function(e) {
                        function t() {
                            return e.apply(this, arguments)
                        }
                        return t.toString = function() {
                            return e.toString()
                        }, t
                    }(function() {
                        show(i.audienceMenuDotsElement), hideProgress(i.audienceProgressElement), hide(show(i.audienceProgressElement))
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
                    i = !1;
                t && t.closed && (o = !0, e.paymentPopupClosedTime || (e.paymentPopupClosedTime = +new Date), i = +new Date - e.paymentPopupClosedTime > 1e4);
                if (!o || i || e.paymentWaiting || (this.onPaymentWaiting(), e.paymentWaiting = !0), cur.isPaymentComplete) return this.onPaymentCheckDone(!0, e, cur.paymentCompleteParams), void delete cur.isPaymentComplete;
                if (cur.isPaymentCanceled || i) return this.onPaymentCheckDone(!1, e, void 0, void 0, getLang("ads_edit_easy_promote_payment_cancelled")), void delete cur.isPaymentCanceled;
                if (cur.isPaymentFailed) return this.onPaymentCheckDone(!1, e), void delete cur.isPaymentFailed;
                if (cur.isPaymentProcess) {
                    var s = extend({}, n, {
                        act: "a_getvotes_check"
                    });
                    ajax.post("al_payments.php", s, {
                        onDone: this.onPaymentCheckDone.bind(this, !0, e),
                        onFail: this.onPaymentCheckDone.bind(this, !1, e)
                    })
                }
            }, e.prototype.doTransactionalPayment = function(t, n) {
                var o = this,
                    i = void 0;
                if (n && n.provider) {
                    i = window.open("", "_blank", "scrollbars=1, resizable=1, menubar=1, left=0, top=0, toolbar=1, status=1");
                    var s = getLang("payment_redirect").replace("%s", cur.ps_list[t].title);
                    cur._popup_text = cur.paymentsPopupHtml(s, "", ""), cur.paymentsPopupWrite(i)
                }
                var r = {
                    act: "a_getvotes_charge",
                    type: t,
                    payment_account_id: this.options.payment_union_id,
                    hash: this.options.payment_hash,
                    account_hash: this.options.payment_ads_hash,
                    amount: val(this.paymentTotalBudgetInput).replace(/\D+/g, ""),
                    source: "ads_easy_promote"
                };
                ajax.post("al_payments.php", r, {
                    onDone: function(s, r) {
                        if ("mailmoney_vkpay" == t) return o.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), o.goToScreen(o.paymentResultScreenElement), o.box._hide(!1, !0), showWiki({
                            w: s
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
                        r ? (o.setPaymentIFrameHtml(r), o.nextScreen(), window.addEventListener("message", e.frameMessage, !1)) : (o.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), o.goToScreen(o.paymentResultScreenElement));
                        var a = {
                            ajaxParams: extend({}, s, {
                                type: t
                            }),
                            paymentSystemData: n
                        };
                        i && (a.paymentPopup = i), o.waitForPaymentResult(a)
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
                    this.setPaymentResultScreen(getLang("ads_edit_easy_promote_payment_wait"), getLang("ads_edit_easy_promote_payment_wait_description"), "wait"), this.goToScreen(this.paymentResultScreenElement), this.waitForPaymentResult({
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
                var i = geByClass1(this.classname("payment-result-icon_visible"), this.paymentResultElement),
                    s = geByClass1(this.classname("payment-result-icon_hidden"), this.paymentResultElement);
                if (!hasClass(i, this.classname("payment-result-icon_") + n)) {
                    ["success", "error", "wait"].map(function(e) {
                        removeClass(s, o.classname("payment-result-icon_") + e)
                    }), addClass(s, this.classname("payment-result-icon_") + n), removeClass(s, this.classname("payment-result-icon_hidden")), addClass(s, this.classname("payment-result-icon_visible")), addClass(i, this.classname("payment-result-icon_hidden")), removeClass(i, this.classname("payment-result-icon_visible")), toggleClass(this.paymentResultIconContainerElement, this.classname("payment-result-icon-container_animated"), "wait" === n)
                }
                this.hidePaymentResultScreenButton()
            }, e.prototype.setPaymentResultScreenButton = function(e, t) {
                e || t ? (this.paymentResultButtonElement.innerHTML = e, this.paymentResultButtonElement.href = t, show(this.paymentResultButtonContainerElement)) : hide(this.paymentResultButtonContainerElement)
            }, e.prototype.hidePaymentResultScreenButton = function() {
                this.setPaymentResultScreenButton()
            }, e.frameMessage = function(t) {
                if (!t.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?paymentgate\.ru$/) && !t.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?money\.mail\.ru$/)) return !1;
                var n = {};
                t.data && "{" === t.data.substr(0, 1) && "billing" !== (n = Object(o.parseJSON)(t.data)).type || ("submit" === t.data || "3dsPage" === n.action ? setTimeout(e.setCardFrameHeight.pbind(600), 200) : "3dsFinish" === n.action ? e.setCardFrameHeight() : "resizeFrame" === n.action && setTimeout(e.setCardFrameHeight.pbind(n.action_params.height), 200))
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
                        i = o[n];
                    new Radiobutton(t, {
                        width: e.getTextWidth(i) + 25,
                        label: i,
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
                var i = {
                    0: getLang("search_adv_any_sex"),
                    1: getLang("Sex_fm"),
                    2: getLang("Sex_m")
                };
                geByClass(this.classname("sex-checkbox"), this.settingsScreenElement).map(function(t) {
                    var n = i[t.getAttribute("value")];
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
                var s = {
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
                    r = {
                        onPointAdded: this.onGeoEditorPointAdded.bind(this),
                        onPointRemoved: this.onGeoEditorPointRemoved.bind(this),
                        onPointUpdated: this.onGeoEditorPointUpdated.bind(this),
                        onLoaded: this.onGeoEditorLoaded.bind(this)
                    },
                    a = geByClass1(this.classname("geo-map"), this.settingsScreenElement);
                this.geoEditorInitBound = this.geoEditor.init.bind(this.geoEditor, a, s, r), t = geByClass1(this.classname("input-geo-places"), this.settingsScreenElement), this.geoPlacesList = new Autocomplete(t, "", {
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
                            i = [t, stripHTML(o.name), 0, 0];
                        "budget_result" in o && (i[2] = langNumeric(intval(o.budget_result), getLang("global_money_amount_rub", "raw"), !0)), o.child_offices ? (i[3] = "label", i[5] = "1", n.push(i), o.child_offices.map(function(e) {
                            n.push([e.union_id, stripHTML(e.name)])
                        })) : n.push(i)
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
                        i = this.options.suggested_criteria[o];
                    if (i || (i = !1), i != e[o]) return !1
                }
                return !0
            }, e
        }();
        try {
            stManager.done(jsc("web/ads_edit_easy.js"))
        } catch (e) {}
    }
});