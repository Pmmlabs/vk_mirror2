! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
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
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 275)
}({
    113: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "ImDraft", function() {
            return s
        }), n.d(t, "loadDraftForPeer", function() {
            return u
        });
        var r = n(309),
            o = n(148),
            i = n(336),
            a = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (o) throw i
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
            return e ? e.flags & o.FLAG_HAS_REPLY && !this.dData.attaches.find(function(e) {
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
            return this.dData.attaches.find(c) ? Object(r.post)(i.CONTROLLER, {
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
        }, s.prototype.getFwdRaw = function() {
            return this.dData.attaches.find(function(e) {
                return "mail" === e.type || "reply" === e.type
            })
        }, s.prototype.getFwdCount = function() {
            var e = this.getFwdRaw();
            return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
        }
    },
    114: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "updateLocation", function() {
            return a
        }), n.d(t, "updateLazyLocation", function() {
            return s
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

        function s() {
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
    120: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "isUnread", function() {
            return i
        }), n.d(t, "isServiceMsg", function() {
            return a
        }), n.d(t, "isCallMessage", function() {
            return s
        }), n.d(t, "isOut", function() {
            return c
        }), n.d(t, "hasReply", function() {
            return u
        }), n.d(t, "isGraffiti", function() {
            return _
        }), n.d(t, "isAudioMsg", function() {
            return l
        }), n.d(t, "isSticker", function() {
            return f
        }), n.d(t, "isGift", function() {
            return m
        }), n.d(t, "isMoney", function() {
            return b
        }), n.d(t, "isMoneyRequest", function() {
            return p
        }), n.d(t, "isVKPay", function() {
            return h
        }), n.d(t, "isImportant", function() {
            return g
        }), n.d(t, "getUserId", function() {
            return v
        }), n.d(t, "getAuthorId", function() {
            return O
        }), n.d(t, "wasEdited", function() {
            return E
        }), n.d(t, "isMessageSelected", function() {
            return y
        });
        var r = n(148),
            o = n(159);

        function i(e, t) {
            return "number" != typeof t.messageId || (c(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to)
        }

        function a(e) {
            return e.kludges && void 0 !== e.kludges.source_act
        }

        function s(e) {
            return "call" == e.kludges.attach1_type
        }

        function c(e) {
            return e.flags & r.FLAG_OUTBOUND
        }

        function u(e) {
            var t = e.attaches.filter(function(e) {
                return "mail" === e.type
            }).length > 0;
            return e.attaches.filter(function(e) {
                return "reply" === e.type
            }).length > 0 || e.flags & r.FLAG_HAS_REPLY && t
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

        function m(e) {
            return d(e, "gift")
        }

        function b(e) {
            return d(e, "money_transfer", "money_request")
        }

        function p(e) {
            return d(e, "money_request")
        }

        function h(e) {
            return d(e, "link", "vkpay") && 6217559 == e.kludges.attach1_app_id
        }

        function g(e) {
            return e.flags & r.FLAG_IMPORTANT
        }

        function v(e) {
            return c(e) ? vk.id : e.userId
        }

        function O(e, t) {
            var n = Object(o.unpackStore)(e);
            return c(t) ? n.id : t.userId
        }

        function E(e) {
            return e.update_time > 0
        }

        function y(e, t) {
            return (e.get().selectedMessages || []).indexOf(t) >= 0
        }
    },
    126: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "animate", function() {
            return s
        }), n.d(t, "cubicBezier", function() {
            return c
        }), n.d(t, "fadeTo", function() {
            return u
        }), n.d(t, "FxBase", function() {
            return d
        }), n.d(t, "Fx", function() {
            return _
        }), n.d(t, "genFx", function() {
            return l
        }), n.d(t, "slideDown", function() {
            return f
        }), n.d(t, "slideUp", function() {
            return m
        }), n.d(t, "slideToggle", function() {
            return b
        }), n.d(t, "fadeIn", function() {
            return p
        }), n.d(t, "fadeOut", function() {
            return h
        }), n.d(t, "fadeToggle", function() {
            return g
        }), n.d(t, "getRGB", function() {
            return v
        }), n.d(t, "getColor", function() {
            return O
        }), n.d(t, "animateCount", function() {
            return E
        });
        var r = n(240),
            o = n(230),
            i = n(191),
            a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };

        function s(e, t, n, s) {
            if (e = Object(o.ge)(e)) {
                var c = Object(r.isFunction)(s) ? s : function() {},
                    u = Object(r.extend)({}, "object" === (void 0 === n ? "undefined" : a(n)) ? n : {
                        duration: n,
                        onComplete: c
                    }),
                    _ = {},
                    l = {},
                    f = Object(o.isVisible)(e),
                    m = void 0;
                u.orig = {}, (t = Object(r.clone)(t)).discrete && (u.discrete = 1, delete t.discrete), i.browser.iphone && (u.duration = 0);
                var b = Object(o.data)(e, "tween"),
                    p = f ? "hide" : "show";
                for (var h in b && b.isTweening && (u.orig = Object(r.extend)(u.orig, b.options.orig), b.stop(!1), b.options.show ? p = "hide" : b.options.hide && (p = "show")), t)
                    if (t.hasOwnProperty(h)) {
                        if (!b && ("show" === t[h] && f || "hide" === t[h] && !f)) return u.onComplete.call(this, e);
                        if ("height" !== h && "width" !== h || !e.style || (t.overflow || (void 0 === u.orig.overflow && (u.orig.overflow = Object(o.getStyle)(e, "overflow")), e.style.overflow = "hidden"), Object(o.hasClass)(e, "inl_bl") || "TD" === e.tagName || (e.style.display = "block")), /show|hide|toggle/.test(t[h]))
                            if ("toggle" === t[h] && (t[h] = p), "show" === t[h]) {
                                m = 0, u.show = !0, void 0 === u.orig[h] && (u.orig[h] = Object(o.getStyle)(e, h, !1) || "", Object(o.setStyle)(e, h, 0));
                                var g = e.style[h];
                                e.style[h] = u.orig[h], t[h] = parseFloat(Object(o.getStyle)(e, h, !0)), e.style[h] = g, "height" === h && i.browser.msie && !t.overflow && (e.style.overflow = "hidden")
                            } else void 0 === u.orig[h] && (u.orig[h] = Object(o.getStyle)(e, h, !1) || ""), u.hide = !0, t[h] = 0
                    }
                return u.show && !f && Object(o.show)(e), b = new d(e, u), Object(r.each)(t, function(t, n) {
                    if (/backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|borderColor|outlineColor/.test(t)) {
                        if (m = O(e, "borderColor" === t ? "borderTopColor" : t), n = v(n), void 0 === m) return
                    } else {
                        var i = n.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/);
                        i && (n = parseFloat(i[2]), i[1] && (n = ("-=" == i[1] ? -1 : 1) * n + n)), 0 != (m = b.cur(t, !0)) || "width" !== t && "height" !== t || (m = 1), "opacity" === t && n > 0 && !f && (Object(o.setStyle)(e, "opacity", 0), m = 0, Object(o.show)(e))
                    }(m != n || Object(r.isArray)(m) && m.join(",") === n.join(",")) && (_[t] = m, l[t] = n)
                }), b.start(_, l), Object(o.data)(e, "tween", b), b
            }
        }

        function c(e, t, n, r, o, i) {
            var a = function(t) {
                    var r = 1 - t;
                    return 3 * r * r * t * e + 3 * r * t * t * n + t * t * t
                },
                s = function(e) {
                    var n = 1 - e;
                    return 3 * n * n * e * t + 3 * n * e * e * r + e * e * e
                },
                c = function(t) {
                    var r = 1 - t;
                    return 3 * (2 * (t - 1) * t + r * r) * e + 3 * (-t * t * t + 2 * r * t) * n
                },
                u = o,
                d = void 0,
                _ = void 0;
            for (d = u, _ = 0; _ < 8; _++) {
                var l = a(d) - u;
                if (Math.abs(l) < i) return s(d);
                var f = c(d);
                if (Math.abs(f) < 1e-6) break;
                d -= l / f
            }
            var m = 0,
                b = 1;
            if ((d = u) < m) return s(m);
            if (d > b) return s(b);
            for (; m < b;) {
                var p = a(d);
                if (Math.abs(p - u) < i) return s(d);
                u > p ? m = d : b = d, d = .5 * (b - m) + m
            }
            return s(d)
        }

        function u(e, t, n, r) {
            return s(e, {
                opacity: n
            }, t, r)
        }
        var d = function() {
                function e(t, n, i) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.el = Object(o.ge)(t), this.name = i, this.options = Object(r.extend)({
                        onStep: function() {},
                        onComplete: function() {},
                        transition: n.transition || _.Transitions.sineInOut,
                        duration: 500
                    }, n || {})
                }
                return e.prototype.start = function(e, t) {
                    var n = this;
                    this.from = e, this.to = t, this.time = Object(r.vkNow)(), this.isTweening = !0;
                    var o = function(e) {
                        return n.step(e)
                    };
                    return o.el = this.el, o() && _.Timers.push(o) && !_.TimerId && (_.TimerId = setInterval(function() {
                        for (var e = _.Timers, t = e.length, n = 0; n < t; n++) e[n]() || (e.splice(n--, 1), t--);
                        t || (clearInterval(_.TimerId), _.TimerId = null)
                    }, 13)), this
                }, e.prototype.stop = function(e) {
                    for (var t = _.Timers, n = t.length - 1; n >= 0; n--) t[n].el === this.el && (e && t[n](!0), t.splice(n, 1));
                    this.isTweening = !1
                }, e.prototype.step = function(e) {
                    var t = Object(r.vkNow)();
                    if (!e && t < this.time + this.options.duration) {
                        for (var n in this.cTime = t - this.time, this.now = {}, this.to)
                            if (Object(r.isArray)(this.to[n])) {
                                for (var i = [], a = 0; a < 3; a++) {
                                    if (void 0 === this.from[n] || void 0 === this.to[n]) return !1;
                                    i.push(Math.min(parseInt(this.compute(this.from[n][a], this.to[n][a])), 255))
                                }
                                this.now[n] = i
                            } else this.now[n] = this.compute(this.from[n], this.to[n]), this.options.discrete && (this.now[n] = Object(r.intval)(this.now[n]));
                        return this.update(), !0
                    }
                    return setTimeout(this.options.onComplete.bind(this, this.el), 10), this.now = Object(r.extend)(this.to, this.options.orig), this.update(), this.options.hide && Object(o.hide)(this.el), this.isTweening = !1, !1
                }, e.prototype.compute = function(e, t) {
                    var n = t - e;
                    return this.options.transition(this.cTime, e, n, this.options.duration)
                }, e.prototype.update = function() {
                    for (var e in this.options.onStep(this.now), this.now) Object(r.isArray)(this.now[e]) ? Object(o.setStyle)(this.el, e, "rgb(" + this.now[e].join(",") + ")") : void 0 !== this.el[e] ? this.el[e] = this.now[e] : Object(o.setStyle)(this.el, e, this.now[e])
                }, e.prototype.cur = function(e, t) {
                    return null == this.el[e] || this.el.style && null != this.el.style[e] ? parseFloat(Object(o.getStyle)(this.el, e, t)) || 0 : this.el[e]
                }, e
            }(),
            _ = {
                Base: d,
                Transitions: {
                    linear: function(e, t, n, r) {
                        return n * e / r + t
                    },
                    sineInOut: function(e, t, n, r) {
                        return -n / 2 * (Math.cos(Math.PI * e / r) - 1) + t
                    },
                    halfSine: function(e, t, n, r) {
                        return n * Math.sin(Math.PI * (e / r) / 2) + t
                    },
                    easeOutBack: function(e, t, n, r) {
                        var o = 1.70158;
                        return n * ((e = e / r - 1) * e * ((o + 1) * e + o) + 1) + t
                    },
                    easeInCirc: function(e, t, n, r) {
                        return -n * (Math.sqrt(1 - (e /= r) * e) - 1) + t
                    },
                    easeOutCirc: function(e, t, n, r) {
                        return n * Math.sqrt(1 - (e = e / r - 1) * e) + t
                    },
                    easeInQuint: function(e, t, n, r) {
                        return n * (e /= r) * e * e * e * e + t
                    },
                    easeOutQuint: function(e, t, n, r) {
                        return n * ((e = e / r - 1) * e * e * e * e + 1) + t
                    },
                    easeOutCubic: function(e, t, n, r) {
                        return n * ((e = e / r - 1) * e * e + 1) + t
                    },
                    swiftOut: function(e, t, n, r) {
                        return n * c(.4, 0, .22, 1, e / r, 4 / r) + t
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

        function l(e, t) {
            var n = {};
            return Object(r.each)(_.Attrs.concat.apply([], _.Attrs.slice(0, t)), function() {
                n[this] = e
            }), n
        }
        var f = function(e, t, n) {
                return s(e, l("show", 1), t, n)
            },
            m = function(e, t, n) {
                return s(e, l("hide", 1), t, n)
            },
            b = function(e, t, n) {
                return s(e, l("toggle", 1), t, n)
            },
            p = function(e, t, n) {
                return s(e, {
                    opacity: "show"
                }, t, n)
            },
            h = function(e, t, n) {
                return s(e, {
                    opacity: "hide"
                }, t, n)
            },
            g = function(e, t, n) {
                return s(e, {
                    opacity: "toggle"
                }, t, n)
            };

        function v(e) {
            var t = void 0;
            return e && Object(r.isArray)(e) && 3 == e.length ? e : (t = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) ? [parseInt(t[1]), parseInt(t[2]), parseInt(t[3])] : (t = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e)) ? [2.55 * parseFloat(t[1]), 2.55 * parseFloat(t[2]), 2.55 * parseFloat(t[3])] : (t = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : (t = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e)) ? [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)] : void 0
        }

        function O(e, t) {
            var n = void 0;
            do {
                if (0 === (n = Object(o.getStyle)(e, t)).indexOf("rgba") && (n = ""), "" != n && "transparent" !== n || "body" === e.nodeName.toLowerCase()) break;
                t = "backgroundColor", e = e.parentNode
            } while (e);
            return v(n)
        }

        function E(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (e = Object(o.ge)(e), t = n.str ? Object(r.trim)(t.toString()) || "" : Object(r.positive)(t), e)
                if (!i.browser.mobile || i.browser.safari_mobile || i.browser.android) {
                    var a = Object(o.data)(e, "curCount"),
                        c = Object(o.data)(e, "nextCount");
                    if ("number" == typeof c || n.str && "string" == typeof c) t != c && Object(o.data)(e, "nextCount", t);
                    else if ("number" == typeof a || n.str && "string" == typeof a) t !== a && Object(o.data)(e, "nextCount", t);
                    else if (a = n.str ? Object(r.trim)(Object(o.val)(e).toString()) || "" : Object(r.positive)(Object(o.val)(e)), "auto" === n.str && (n.str = !a.match(/^\d+$/) || !t.match(/^\d+$/), n.str || (a = Object(r.positive)(a), t = Object(r.positive)(t))), a !== t) {
                        Object(o.data)(e, "curCount", t);
                        var u, d = n.str ? a.length === t.length ? a < t : a.length < t.length : a < t,
                            l = (d ? t : a).toString(),
                            f = (d ? a : t).toString(),
                            m = void 0,
                            b = [],
                            p = [];
                        for (n.str || (f = new Array(l.length - f.length + 1).join("0") + f), m = 0, u = l.length; m < u; m++) {
                            var h = l.charAt(m);
                            if (h !== f.charAt(m)) break;
                            b.push(h)
                        }
                        var g = l.substr(m),
                            v = f.substr(m);
                        if (n.str) {
                            for (m = g.length; m > 0; m--) {
                                var O = g.charAt(m);
                                if (O !== v.charAt(m)) break;
                                p.unshift(O)
                            }
                            p.length && (g = g.substr(0, m + 1), v = v.substr(0, m + 1))
                        }
                        b = b.join("").replace(/\s$/, "&nbsp;"), p = p.join("").replace(/^\s/, "&nbsp;"), Object(r.trim)(Object(o.val)(e)) || n.noSpaceIfEmpty || Object(o.val)(e, "&nbsp;");
                        var y = e.clientHeight || e.offsetHeight;
                        Object(o.val)(e, '<div class="counter_wrap inl_bl"></div>');
                        var j, w = e.firstChild,
                            M = void 0,
                            k = void 0,
                            T = void 0,
                            C = !0;
                        b.length && w.appendChild(M = Object(o.ce)("div", {
                            className: "counter_const inl_bl",
                            innerHTML: b
                        })), b.length || (v = v.replace(/^0+/, "")), v && ("0" !== v || b.length) || (v = n.noSpaceIfEmpty ? "" : "&nbsp;", C = !!b.length), w.appendChild(T = Object(o.ce)("div", {
                            className: "counter_anim_wrap inl_bl"
                        })), T.appendChild(j = Object(o.ce)("div", {
                            className: "counter_anim " + (d ? "counter_anim_inc" : "counter_anim_dec"),
                            innerHTML: '<div class="counter_anim_big"><span class="counter_anim_big_c">' + g + "</span></div>" + (C ? '<div class="counter_anim_small"><span class="counter_anim_small_c">' + v + "</span></div>" : "")
                        }, C ? {
                            marginTop: d ? -y : 0
                        } : {
                            right: 0
                        })), n.str && Object(o.setStyle)(j, {
                            textAlign: "right",
                            right: 0
                        });
                        var P = Object(o.getSize)(Object(o.geByClass1)("counter_anim_big_c", j, "span"))[0],
                            D = C ? "&nbsp;" === v ? P : Object(o.getSize)(Object(o.geByClass1)("counter_anim_small_c", j, "span"))[0] : 0;
                        !v && n.noSpaceIfEmpty && (D = 0), p.length && w.appendChild(k = Object(o.ce)("div", {
                            className: "counter_const inl_bl",
                            innerHTML: p
                        })), n.noWrapWidth || Object(o.setStyle)(w, {
                            width: (M && Object(o.getSize)(M)[0] || 0) + (k && Object(o.getSize)(k)[0] || 0) + P + 0
                        }), void 0 === i.browser.csstransitions && (i.browser.csstransitions = i.browser.chrome && i.browser.version >= 9 || i.browser.mozilla && i.browser.version >= 4 || i.browser.opera && i.browser.version >= 10.5 || i.browser.safari && i.browser.version >= 3.2 || i.browser.safari_mobile || i.browser.android);
                        var x = i.browser.csstransitions;
                        Object(o.setStyle)(T, {
                            width: d ? D : P
                        });
                        var A = function() {
                                Object(o.val)(e, t || (n.noSpaceIfEmpty ? "" : " "));
                                var r = Object(o.data)(e, "nextCount");
                                Object(o.data)(e, "curCount", !1), Object(o.data)(e, "nextCount", !1), ("number" == typeof r || n.str && "string" == typeof r) && setTimeout(E.pbind(e, r, n), 0), n.onDone && n.onDone()
                            },
                            I = C ? {
                                marginTop: d ? 0 : -y
                            } : {
                                marginRight: d ? -D : 0
                            };
                        x ? (Object(o.getStyle)(T, "width"), Object(o.addClass)(T, "counter_css_anim_wrap"), P !== D && Object(o.setStyle)(T, {
                            width: d ? P : D
                        }), C && Object(o.setStyle)(j, I), setTimeout(A, 300), n.fadeMode && (Object(o.setStyle)(Object(o.geByClass1)("counter_anim_big", e), "opacity", 1), Object(o.setStyle)(Object(o.geByClass1)("counter_anim_small", e), "opacity", 0))) : (P !== D && s(T, {
                            width: d ? P : D
                        }, {
                            duration: 100
                        }), C ? s(j, I, {
                            duration: 300,
                            transition: _.Transitions.easeOutCirc,
                            onComplete: A
                        }) : setTimeout(A, 300))
                    }
                } else Object(o.val)(e, t || "")
        }
    },
    130: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "replaceHyperLinks", function() {
            return u
        }), n.d(t, "replaceEmailLinks", function() {
            return d
        }), n.d(t, "replaceMentions", function() {
            return _
        }), n.d(t, "replaceHashtags", function() {
            return m
        }), n.d(t, "confirmDelivery", function() {
            return b
        }), n.d(t, "linksReplacer", function() {
            return p
        });
        var r = n(222),
            o = void 0,
            i = window,
            a = i.clean,
            s = i.replaceEntities,
            c = i.statlogsValueEvent;

        function u(e, t) {
            for (var n = void 0, o = 0, i = e; null !== (n = r.MESSAGE_REGEXP.exec(e));) {
                var a = (n = l(n))[0].length,
                    s = n.index + a,
                    c = e[n.index - 1],
                    u = e[s - 1],
                    d = void 0 !== c && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(c),
                    _ = void 0 !== u && /([:;$])/i.test(u);
                if (!d && !_) {
                    var m = f(n),
                        b = m.domain.toLowerCase();
                    if (b.length <= r.MAX_DOMAIN_LENGTH && -1 !== r.TOP_DOMAINS.indexOf(b)) {
                        var p = t(m);
                        i = i.slice(0, n.index + o) + p + i.slice(s + o), o += p.length - a
                    }
                }
            }
            return i
        }

        function d(e, t) {
            return e.replace(r.EMAIL, t || function(e) {
                return '<a href="mailto:' + e + '">' + e + "</a>"
            })
        }

        function _(e, t) {
            return e.replace(r.MENTION, t || function(e, t, n, r, o) {
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

        function m(e, t) {
            return e.replace((o || (o = new RegExp(r.RE_HASHTAG_EXTRACTION_PATTERN, "ig")), o), function(e, n, r, o, i, a) {
                return (n || "") + t(r + (i || ""))
            })
        }

        function b(e) {
            c("ttl_message_confirm_delivery", e)
        }

        function p(e, t) {
            var n = t.protocol,
                o = t.url,
                i = t.query,
                c = t.domain,
                u = t.full;
            try {
                u = decodeURIComponent(u)
            } catch (e) {}
            if (u.length > 55 && (u = u.substr(0, 53) + ".."), u = a(u).replace(/&amp;/g, "&"), !e && c.match(r.OUR_DOMAINS)) {
                var d, _ = o = s(o).replace(r.ENTITIES, encodeURIComponent),
                    l = o.indexOf("#/"),
                    f = "";
                return l >= 0 ? _ = o.substr(l + 1) : (l = o.indexOf("#!")) >= 0 && (_ = "/" + o.substr(l + 2).replace(/^\//, "")), (d = _.match(r.VK_DOMAIN)) && d[1].length < 32 && (f = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + function(e) {
                    return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }(n + o + i) + '" target="_blank"' + f + ">" + u + "</a>"
            }
            return '<a href="' + ("away.php?utf=1&to=" + encodeURIComponent(n + s(o + i))) + '" target="_blank" onclick="' + ("return goAway('" + a((n + o + i).replace(/'/g, "\\'")) + "', {}, event);") + '">' + u + "</a>"
        }
    },
    138: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "hasAccessibilityMode", function() {
            return s
        }), n.d(t, "updateOnlineText", function() {
            return c
        }), n.d(t, "updateAriaCheckboxes", function() {
            return u
        }), n.d(t, "updateAriaRadioBtns", function() {
            return d
        }), n.d(t, "updateAriaElements", function() {
            return _
        });
        var r = n(327),
            o = n(240),
            i = n(230),
            a = n(164);

        function s() {
            return !(!window.vk || !vk.a11y)
        }

        function c() {
            clearTimeout(cur.updateOnlineTO), cur.updateOnlineTO = setTimeout(function() {
                Object(o.each)(Object(i.geByClass)("_online"), function() {
                    var e = Object(i.geByClass1)("_online_reader", this) || this,
                        t = Object(i.hasClass)(this, "online"),
                        n = Object(i.hasClass)(this, "mobile"),
                        r = Object(i.geByTag)("img", e),
                        s = function(e) {
                            var t = Object(i.domClosest)("_post", e),
                                n = t && Object(i.domByClass)(t, "author");
                            return n ? n.innerText || n.textContent : ""
                        };
                    if (t) {
                        var c = "";
                        Object(o.each)(r, function() {
                            var e = Object(i.attr)(this, "alt") || Object(i.attr)(this, "data-alt") || s(this);
                            e && (c = Object(o.trim)(c + " " + e), this.setAttribute("data-alt", e), this.removeAttribute("alt"))
                        }), c = Object(o.trim)(c + " " + (n ? Object(a.getLang)("global_user_is_online_mobile") : Object(a.getLang)("global_user_is_online"))), e.setAttribute("aria-label", c)
                    } else Object(o.each)(r, function() {
                        var e = Object(i.attr)(this, "data-alt") || s(this);
                        e && (this.setAttribute("alt", e), this.removeAttribute("data-alt"))
                    }), e.removeAttribute("aria-label")
                })
            }, 100)
        }

        function u() {
            clearTimeout(cur.updateChkBoxTO), cur.updateChkBoxTO = setTimeout(function() {
                var e = [];
                Object(o.each)(["checkbox", "checkbox_pic"], function() {
                    e = e.concat(Object(i.geByClass)(this))
                }), Object(o.each)(e, function() {
                    "DIV" !== this.tagName || this.getAttribute("role") || (this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", Object(r.isChecked)(this) ? "true" : "false"), this.setAttribute("tabindex", 0))
                })
            }, 100)
        }

        function d() {
            clearTimeout(cur.updateRadioBtnsTO), cur.updateRadioBtnsTO = setTimeout(function() {
                var e = [],
                    t = Object(i.geByClass)("radiobtn");
                Object(o.each)(t, function() {
                    if ("DIV" === this.tagName && !this.getAttribute("role")) {
                        var t = Object(r.isChecked)(this);
                        this.setAttribute("role", "radio"), this.setAttribute("aria-checked", t ? "true" : "false"), this.setAttribute("tabindex", t ? 0 : -1);
                        var n = function(e) {
                            var t = 0,
                                n = e;
                            for (; t < 5 && n !== document;) {
                                n = Object(i.domPN)(n);
                                var r = Object(i.geByClass)("radiobtn", n);
                                if (r.length > 1) break;
                                t++
                            }
                            return n
                        }(this);
                        ~e.indexOf(n) || e.push(n)
                    }
                }), Object(o.each)(e, function() {
                    if (!Object(i.geByClass)("on", this).length) {
                        var e = Object(i.geByClass)("radiobtn", this);
                        e.length && e[0].setAttribute("tabindex", 0)
                    }
                })
            }, 100)
        }

        function _() {
            c(), u(), d()
        }
    },
    148: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "DELETE", function() {
            return i
        }), n.d(t, "SET_FLAGS", function() {
            return a
        }), n.d(t, "REPLACE_FLAGS", function() {
            return s
        }), n.d(t, "RESET_FLAGS", function() {
            return c
        }), n.d(t, "ADD_MESSAGE", function() {
            return u
        }), n.d(t, "READ_INBOUND", function() {
            return d
        }), n.d(t, "READ_OUTBOUND", function() {
            return _
        }), n.d(t, "GOT_ONLINE", function() {
            return l
        }), n.d(t, "GOT_OFFLINE", function() {
            return f
        }), n.d(t, "CHAT_CHANGED", function() {
            return m
        }), n.d(t, "CONVERSATION_UPDATED", function() {
            return b
        }), n.d(t, "TYPING", function() {
            return p
        }), n.d(t, "RECORDING_AUDIO", function() {
            return h
        }), n.d(t, "VIDEO_CALL", function() {
            return g
        }), n.d(t, "UNREAD_COUNT", function() {
            return v
        }), n.d(t, "NOTIFY_SETTINGS_CHANGED", function() {
            return O
        }), n.d(t, "EMPTY", function() {
            return E
        }), n.d(t, "RESET_DIRECTORIES", function() {
            return y
        }), n.d(t, "REPLACE_DIRECTORIES", function() {
            return j
        }), n.d(t, "SET_DIRECTORIES", function() {
            return w
        }), n.d(t, "RESYNC", function() {
            return M
        }), n.d(t, "REFRESH_LP_KEY", function() {
            return k
        }), n.d(t, "TRANSITION", function() {
            return T
        }), n.d(t, "RESET_PEER", function() {
            return C
        }), n.d(t, "MUTEX", function() {
            return P
        }), n.d(t, "CHANGE_PEER", function() {
            return D
        }), n.d(t, "CHANGE_TAB", function() {
            return x
        }), n.d(t, "FAILED_MESSAGE", function() {
            return A
        }), n.d(t, "RESEND", function() {
            return I
        }), n.d(t, "DELETE_DIALOG", function() {
            return L
        }), n.d(t, "EDIT_MESSAGE", function() {
            return S
        }), n.d(t, "REPLACE_MESSAGE", function() {
            return R
        }), n.d(t, "AUDIO_START", function() {
            return B
        }), n.d(t, "FLAG_UNREAD", function() {
            return U
        }), n.d(t, "FLAG_OUTBOUND", function() {
            return N
        }), n.d(t, "FLAG_IMPORTANT", function() {
            return W
        }), n.d(t, "FLAG_CHAT", function() {
            return K
        }), n.d(t, "FLAG_FRIENDS", function() {
            return F
        }), n.d(t, "FLAG_SPAM", function() {
            return H
        }), n.d(t, "FLAG_DELETED", function() {
            return q
        }), n.d(t, "FLAG_MEDIA", function() {
            return G
        }), n.d(t, "FLAG_STEALTH", function() {
            return z
        }), n.d(t, "FLAG_HAS_REPLY", function() {
            return V
        }), n.d(t, "FOLDER_IMPORTANT", function() {
            return Y
        }), n.d(t, "FOLDER_UNRESPOND", function() {
            return Q
        }), n.d(t, "FOLDER_HAS_BANNER", function() {
            return X
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_TITLE_CHANGED", function() {
            return $
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_AVATAR_CHANGED", function() {
            return Z
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_ADMIN_GRANTED", function() {
            return J
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_FLAGS_CHANGED", function() {
            return ee
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_PINNED", function() {
            return te
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_JOINED", function() {
            return ne
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_LEFT", function() {
            return re
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_KICKED", function() {
            return oe
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_ADMIN_KICKED", function() {
            return ie
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_BANNER_CHANGED", function() {
            return ae
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_KEYBOARD_CHANGED", function() {
            return se
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_MESSAGE_REQUEST_CHANGED", function() {
            return ce
        }), n.d(t, "deleteEvent", function() {
            return ue
        }), n.d(t, "replaceFlagsEvent", function() {
            return de
        }), n.d(t, "setFlagsEvent", function() {
            return _e
        }), n.d(t, "resetFlagsEvent", function() {
            return le
        }), n.d(t, "addMessageEvent", function() {
            return fe
        }), n.d(t, "editMessageEvent", function() {
            return me
        }), n.d(t, "replaceMessageEvent", function() {
            return be
        }), n.d(t, "editMessageLocallyEvent", function() {
            return pe
        }), n.d(t, "readInboundEvent", function() {
            return he
        }), n.d(t, "readOutboundEvent", function() {
            return ge
        }), n.d(t, "gotOnlineEvent", function() {
            return ve
        }), n.d(t, "gotOfflineEvent", function() {
            return Oe
        }), n.d(t, "resetDirectoriesEvent", function() {
            return Ee
        }), n.d(t, "replaceDirectoriesEvent", function() {
            return ye
        }), n.d(t, "setDirectoriesEvent", function() {
            return je
        }), n.d(t, "deleteDialogEvent", function() {
            return we
        }), n.d(t, "chatChangedEvent", function() {
            return Me
        }), n.d(t, "chatUpdatedEvent", function() {
            return ke
        }), n.d(t, "typingEvent", function() {
            return Te
        }), n.d(t, "recordingAudioEvent", function() {
            return Ce
        }), n.d(t, "videoCallEvent", function() {
            return Pe
        }), n.d(t, "unreadCountEvent", function() {
            return De
        }), n.d(t, "notifySettingsChangedEvent", function() {
            return xe
        }), n.d(t, "refreshMessageEvent", function() {
            return Ae
        }), n.d(t, "audioStartEvent", function() {
            return Ie
        }), n.d(t, "emptyEvent", function() {
            return Le
        }), n.d(t, "transitionEvent", function() {
            return Se
        }), n.d(t, "resyncEvent", function() {
            return Re
        }), n.d(t, "refreshLpKeyEvent", function() {
            return Be
        }), n.d(t, "resetPeer", function() {
            return Ue
        }), n.d(t, "changePeer", function() {
            return Ne
        }), n.d(t, "changeTab", function() {
            return We
        }), n.d(t, "failedMessage", function() {
            return Ke
        }), n.d(t, "mutexEvent", function() {
            return Fe
        }), n.d(t, "resendEvent", function() {
            return He
        });
        var r = n(289),
            o = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && s.return && s.return()
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
            s = "event_replace_flags",
            c = "event_reset_flags",
            u = "event_add_message",
            d = "event_read_inbound",
            _ = "event_read_outbound",
            l = "event_got_online",
            f = "event_got_offline",
            m = "event_chat_changed",
            b = "event_chat_updated",
            p = "event_typing",
            h = "event_recoding_audio",
            g = "event_video_call",
            v = "event_unread_count",
            O = "event_notify_settings_changed",
            E = "event_empty",
            y = "event_reset_directories",
            j = "event_replace_directories",
            w = "event_set_directories",
            M = "event_resync",
            k = "event_refresh_lp_key",
            T = "transition_event",
            C = "reset_peer",
            P = "mutex",
            D = "change_peer",
            x = "event_change_tab",
            A = "event_failed_message",
            I = "event_resend",
            L = "event_delete_dialog",
            S = "event_edit_message",
            R = "event_replace_message",
            B = "event_audio_start",
            U = 1,
            N = 2,
            W = 8,
            K = 16,
            F = 32,
            H = 64,
            q = 128,
            G = 512,
            z = 65536,
            V = 1 << 21,
            Y = 1,
            Q = 2,
            X = 8,
            $ = 1,
            Z = 2,
            J = 3,
            ee = 4,
            te = 5,
            ne = 6,
            re = 7,
            oe = 8,
            ie = 9,
            ae = 10,
            se = 11,
            ce = 12;

        function ue(e) {
            var t = o(e, 2)[1];
            return {
                type: i,
                localId: t
            }
        }

        function de(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: s,
                messageId: n,
                mask: r,
                peerId: i
            }
        }

        function _e(e) {
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

        function le(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: c,
                messageId: n,
                flags: r,
                peerId: i
            }
        }

        function fe(e) {
            var t = o(e, 11),
                n = t[1],
                i = t[2],
                a = t[3],
                s = t[4],
                c = t[5],
                d = t[6],
                _ = t[7],
                l = t[8],
                f = t[9],
                m = t[10],
                b = extend(d, _ || void 0);
            return {
                type: u,
                messageId: intval(n),
                flags: intval(i),
                peerId: intval(a),
                date: intval(s),
                attaches: Object(r.convertKludgesToAttaches)(b, n),
                subject: d.title || "",
                text: c,
                kludges: b,
                randomId: intval(l),
                userId: Object(r.isChatPeer)(a) ? intval(b.from) : intval(a),
                update_time: m,
                chat_local_id: f
            }
        }

        function me(e) {
            var t = fe(e);
            return t.type = S, t
        }

        function be(e) {
            var t = fe(e);
            return t.type = R, t
        }

        function pe(e) {
            return extend({}, e, {
                type: S
            })
        }

        function he(e) {
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

        function ge(e) {
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

        function ve(e) {
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

        function Oe(e) {
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

        function Ee(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: y,
                peerId: n,
                mask: r,
                local: void 0 !== i && i
            }
        }

        function ye(e) {
            var t = o(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: j,
                peerId: n,
                mask: r
            }
        }

        function je(e) {
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

        function we(e) {
            var t = o(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: L,
                peerId: n,
                localId: r
            }
        }

        function Me(e) {
            var t = o(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: m,
                chatId: n,
                self: r
            }
        }

        function ke(e) {
            var t = o(e, 4),
                n = t[1],
                r = t[2],
                i = t[3];
            return {
                type: b,
                peerId: r,
                updateType: n,
                updateArg: i
            }
        }

        function Te(e) {
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

        function Ce(e) {
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

        function Pe(e) {
            var t = o(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: g,
                userId: n,
                callId: r
            }
        }

        function De(e) {
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

        function xe(e) {
            var t = o(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: O,
                peerId: n.peer_id,
                sound: n.sound,
                disabledUntil: n.disabled_until
            }
        }

        function Ae(e) {
            var t = o(e, 2)[1],
                n = void 0 === t ? {} : t,
                r = fe([!1, n.id, n.flags, n.peer_id, n.date, n.message, extend(n.kludges, {
                    title: n.title || ""
                }), {}, n.random_id, n.chat_local_id, n.update_time]);
            return r.type = S, r
        }

        function Ie(e) {
            var t = o(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: B,
                uuid: n.uuid,
                deviceName: n.device_name || ""
            }
        }

        function Le(e) {
            return {
                type: E,
                params: e
            }
        }

        function Se(e) {
            return {
                type: T,
                state: e
            }
        }

        function Re() {
            return {
                type: M
            }
        }

        function Be(e) {
            var t = o(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: k,
                key: n,
                url: r
            }
        }

        function Ue() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return {
                type: C,
                cancelSearch: e,
                removeActivePeer: t
            }
        }

        function Ne(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
            return {
                type: D,
                peerId: e,
                msgid: t,
                forward: n,
                cancelSearch: r,
                entryPoint: o
            }
        }

        function We(e) {
            return {
                type: x,
                tab: e
            }
        }

        function Ke(e, t, n) {
            return {
                type: A,
                message: t,
                peer: e,
                error: n
            }
        }

        function Fe(e) {
            var t = o(e, 6),
                n = (t[0], t[1]),
                r = t[2],
                i = t[3],
                a = t[4],
                s = t[5];
            return {
                type: P,
                free: !!intval(n) || intval(a) === vk.id,
                resource: r,
                peerId: intval(i),
                who: intval(a),
                name: s
            }
        }

        function He(e, t) {
            return {
                type: I,
                message: t,
                peerId: e
            }
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
            Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(e, function(e, t) {
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

        function checkTextLength(e, t, n, r, o, i, a) {
            var s = t.getValue ? t.getValue() : t.value,
                c = t.lastLen || 0;
            if (t.lastLen !== s.length || i) {
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
                o && (u[","] = 5);
                var l = function(e) {
                    for (var t = 0, n = 0, r = e.length; n < r; n++) {
                        var o = u[e.charAt(n)],
                            i = e.charCodeAt(n);
                        t += void 0 !== o ? o : !a && i >= 128 && (i < 1025 || _[i] || i > 1119) && !d[i] && (i < 8220 || i > 8222) && (i < 8224 || i > 8226) ? ("&#" + i + ";").length : 1
                    }
                    return t
                }(s);
                if (n = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)(n), l > Math.max(e - 100, .75 * e))
                    if (Object(_dom__WEBPACK_IMPORTED_MODULE_6__.show)(n), l > e)
                        if (o) {
                            var f = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.val)(t, function(e, t) {
                                for (var n = 0, r = "", o = 0, i = e.length; o < i; o++) {
                                    var s = e.charAt(o),
                                        c = u[s],
                                        l = e.charCodeAt(o);
                                    if ((n += void 0 !== c ? c : !a && l >= 128 && (l < 1025 || _[l] || l > 1119) && !d[l] && (l < 8220 || l > 8222) && (l < 8224 || l > 8226) ? ("&#" + l + ";").length : 1) > t) break;
                                    r += s
                                }
                                return r
                            }(s, Math.min(e, c)));
                            t.lastLen = f.length, n.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("text_N_symbols_remain", 0)
                        } else n.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("text_exceeds_symbol_limit", l - e);
                else n.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("text_N_symbols_remain", e - l);
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
                var r = e.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i);
                if (r && "api." !== r[1].toLowerCase()) return location.href = e, !1;
                var o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(Object(_cookies__WEBPACK_IMPORTED_MODULE_3__.getCookie)("remixsettings_bits"));
                if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(_ajax__WEBPACK_IMPORTED_MODULE_4__.locBase) || 1 & o) return window.open("/away.php?to=" + encodeURIComponent(e) + (t && void 0 !== t.h ? "&h=" + t.h : ""), "_blank"), !1
            }
            var i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)({
                act: "a_go",
                to: e
            }, t || {});
            return !Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.showBox)("away.php", i, {}, n)
        }

        function isFullScreen() {
            return !!(document.fullscreenElement || document.fullScreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || cur.pvPartScreen)
        }

        function updateMoney(e, t) {
            if (void 0 !== e && !1 !== e) {
                var n = "";
                !0 === t ? (vk.balanceEx = e, n = "_ex") : vk.balance = e;
                var r = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.geByClass)("votes_balance_nom" + n);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(r, function(t, n) {
                    return n.innerHTML = e + " " + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("votes_flex", e)
                });
                var o = e * (vk.vcost || 7),
                    i = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.geByClass)("money_balance_nom" + n);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(i, function(e, t) {
                    return t.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_money_amount_rub", o, !0)
                }), void 0 !== t && !1 !== t && !0 !== t && updateMoney(t, !0)
            }
        }

        function toggleOnline(e, t) {
            var n = onlinePlatformClass(t).split(" "),
                r = [];
            ["online", "mobile", "_online"].forEach(function(t) {
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.inArray)(t, n) && !Object(_dom__WEBPACK_IMPORTED_MODULE_6__.hasClass)(e, t) ? r.push(t) : !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.inArray)(t, n) && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.hasClass)(e, t) && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.removeClass)(e, t)
            }), r.length > 0 && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.addClass)(e, r.join(" "))
        }

        function onlinePlatformClass(e) {
            var t = " _online";
            return e && (t += " online"), _browser__WEBPACK_IMPORTED_MODULE_8__.mobPlatforms[e] && (t += " mobile"), Object(_accessibility__WEBPACK_IMPORTED_MODULE_9__.updateOnlineText)(), t
        }

        function handleScroll(e) {
            e = e.split(",");
            var t = cur.named || {},
                n = e[0] && (t[e[0]] || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)(e[0])) || !1,
                r = e[1] && (t[e[1]] || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)(e[1])) || !1;
            if (!n && !r) {
                if (!(n = document.getElementsByName(e[0])[0])) return;
                n = n.nextSibling
            }
            var o = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)("page_header_wrap") || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.ge)("dev_top_nav_wrap");
            setTimeout(function() {
                n && Object(_scroll__WEBPACK_IMPORTED_MODULE_11__.scrollToY)(Object(_dom__WEBPACK_IMPORTED_MODULE_6__.getXY)(n)[1] - (o ? Object(_dom__WEBPACK_IMPORTED_MODULE_6__.getSize)(o)[1] : 0), 0), r && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.elfocus)(r)
            }, 300)
        }
    },
    160: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "addDelegateEvent", function() {
            return a
        }), n.d(t, "removeDelegateEvent", function() {
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
                            for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && s.return && s.return()
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
                        var s = r(n[a], 2),
                            c = s[0],
                            u = s[1],
                            d = void 0;
                        if (hasClass(e.target, c) ? d = u(e, e.target) : (i = gpeByClass(c, e.target, e.currentTarget)) && (d = u(e, i)), !1 === d) break
                    }
            }
        }

        function a(e, t, n, r) {
            var a = o.get(e);
            a || (o.set(e, {}), a = o.get(e));
            for (var s = t.split(" "), c = 0; c < s.length; c++) {
                var u = s[c];
                a[u] || (a[u] = [], addEvent(e, u, i)), a[u].push([n, r])
            }
        }

        function s(e, t, n, r) {
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
        }
    },
    162: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "isWeirdLogging", function() {
            return u
        }), n.d(t, "imWeirdLog", function() {
            return d
        }), n.d(t, "imWeirdCatch", function() {
            return _
        }), n.d(t, "startLoggingAllUnhandled", function() {
            return l
        }), n.d(t, "stopLoggingAllUnhandled", function() {
            return f
        });
        var r = n(309),
            o = n(203),
            i = void 0,
            a = 1;

        function s(e, t, n, r, o) {
            if ("Script error." !== e) {
                var a = o ? o.stack || o.message : null;
                d("unhandled_error", a ? {
                    err: e,
                    stack: a
                } : {
                    err: e
                })
            }
            i && i.apply(this, arguments)
        }

        function c(e) {
            e.preventDefault()
        }

        function u() {
            return !!window.imwl
        }

        function d(e, t) {
            var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            u() && (n && window.console && (console.error(e, t), console.trace && console.trace()), Object(o.retryFn)(r.post, 3, function() {
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

        function _(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return d(e, extend({
                err: t && t.message || t
            }, n)), Promise.reject(t)
        }

        function l() {
            i = window.onerror, window.onerror = s, window.addEventListener("unhandledrejection", c)
        }

        function f() {
            window.onerror = i, i = void 0, window.removeEventListener("unhandledrejection", c)
        }
    },
    164: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "parseLatin", function() {
            return a
        }), n.d(t, "parseCyr", function() {
            return s
        }), n.d(t, "parseLatKeys", function() {
            return c
        }), n.d(t, "langNumeric", function() {
            return u
        }), n.d(t, "langSex", function() {
            return d
        }), n.d(t, "langStr", function() {
            return _
        }), n.d(t, "addLangKeys", function() {
            return l
        }), n.d(t, "getLang", function() {
            return f
        }), n.d(t, "langDate", function() {
            return m
        }), n.d(t, "getShortDate", function() {
            return b
        }), n.d(t, "getShortDateOrTime", function() {
            return p
        }), n.d(t, "langWordNumeric", function() {
            return h
        }), n.d(t, "getDateText", function() {
            return g
        }), n.d(t, "getBigDateNew", function() {
            return v
        }), n.d(t, "getSmDate", function() {
            return O
        });
        var r = n(18),
            o = n(240),
            i = n(345);

        function a(e) {
            for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = e, o = 0, i = t.length; o < i; o++) r = r.split(t[o]).join(n[o]);
            for (var a = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", s = 0, c = a.length; s < c; s++) r = r.split(a.charAt(s)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(s));
            return r === e ? null : r
        }

        function s(e) {
            for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", o = e, i = 0; i < n.length; i++) o = o.split(n[i]).join(t[i]);
            for (var a = 0; a < r.length; a++) o = o.split(r.charAt(a)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(a));
            return o === e ? null : o
        }

        function c(e) {
            for (var t = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", n = e, r = 0; r < t.length; r++) n = n.split(t.charAt(r)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(r));
            return n == e ? null : n
        }

        function u(e, t, n) {
            if (!t || !window.langConfig) return e;
            var r = void 0;
            if (Object(o.isArray)(t) ? (r = t[1], e != Math.floor(e) ? r = t[langConfig.numRules.float] : Object(o.each)(langConfig.numRules.int, function(n, i) {
                    if ("*" == i[0]) return r = t[i[2]], !1;
                    var a = i[0] ? e % i[0] : e;
                    return -1 != Object(o.indexOf)(i[1], a) ? (r = t[i[2]], !1) : void 0
                })) : r = t, n) {
                for (var i = e.toString().split("."), a = [], s = i[0].length - 3; s > -3; s -= 3) a.unshift(i[0].slice(s > 0 ? s : 0, s + 3));
                i[0] = a.join(langConfig.numDel), e = i.join(langConfig.numDec)
            }
            return r = (r || "%s").replace("%s", e)
        }

        function d(e, t) {
            if (!Object(o.isArray)(t)) return t;
            var n = t[1];
            return window.langConfig ? (Object(o.each)(langConfig.sexRules, function(r, o) {
                return "*" == o[0] ? (n = t[o[1]], !1) : e == o[0] && t[o[1]] ? (n = t[o[1]], !1) : void 0
            }), n) : n
        }

        function _(e) {
            for (var t = arguments, n = t.length, r = e + "", o = 1; o < n; o += 2) {
                var i = "%" === t[o][0] ? t[o] : "{" + t[o] + "}";
                r = r.replace(i, t[o + 1])
            }
            return r
        }

        function l(e, t) {
            var n = t ? window : window.cur;
            n.lang ? Object(o.extend)(n.lang, e) : n.lang = e
        }

        function f() {
            try {
                var e = Array.from(arguments),
                    t = e.shift();
                if (!t) return "...";
                var n = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
                if (!n) {
                    var r = t.split("_");
                    return r.shift(), r.join(" ")
                }
                return Object(o.isFunction)(n) ? n.apply(null, e) : void 0 === e[0] && !Object(o.isArray)(n) || "raw" === e[0] ? n : u(e[0], n, e[1])
            } catch (e) {
                Object(i.debugLog)("lang error:" + e.message + "(" + Array.from(arguments).join(", ") + ")")
            }
        }

        function m(e, t, n, i, a, s) {
            var c = void 0;
            if (s || (s = ""), Object(o.isArray)(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += n, c = new Date(e)) : c = e, a) t = t[1];
            else {
                var u = "";
                !(u = Object(r.isToday)(c) ? t[3] : Object(r.isYesterday)(c) ? t[2] : Object(r.isTomorrow)(c) ? t[4] : t[1]) && t[1] && (u = t[1]), t = u
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
                    !Object(r.isToday)(c) || Object(r.isYesterday)(c) || Object(r.isTomorrow)(c) || (t = s + t);
                    break;
                case 12:
                case 73:
                    1 == c.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
            }
            return 68 === vk.lang && (d.year = d.year + 543), t.replace("{hour}", d.hours).replace("{num_hour}", Object(r.leadingZero)(d.hours)).replace("{minute}", Object(r.leadingZero)(d.minutes)).replace("{day}", d.day).replace("{num_day}", Object(r.leadingZero)(d.day)).replace("{month}", i[d.month]).replace("{year}", d.year).replace("{short_year}", d.year % 100).replace("{second}", Object(r.leadingZero)(d.seconds)).replace("{am_pm}", _)
        }

        function b(e, t, n, r, o) {
            e *= 1e3, void 0 === n && (n = !0), void 0 === r && (r = f("months_of", "raw")), t *= 1e3;
            var i = Date.now(),
                a = new Date(i),
                s = new Date(e + t);
            return !o && e > i && e - i < 864e5 && a.getDate() === s.getDate() ? m(e, "{hour}:{minute} {am_pm}", t, [], !n) : s.getYear() !== a.getYear() || e < i - 157248e5 ? m(e, f("global_date", "raw"), t, r, !n) : m(e, f("global_short_date", "raw"), t, r, !n)
        }

        function p(e, t, n, o) {
            return Object(r.isToday)(new Date(1e3 * e + 1e3 * t)) ? m(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !n) : b(e, t, n, o)
        }

        function h(e, t, n) {
            return Object(o.isArray)(t) && e < t.length ? t[e] : u(e, n)
        }

        function g(e, t) {
            e += t;
            var n = parseInt(Date.now() / 1e3) - e,
                r = "";
            if (n < 60) r = f("global_just_now");
            else if (n < 3600) {
                r = h(Object(o.intval)(n / 60), f("global_word_mins_ago", "raw"), f("global_mins_ago", "raw"))
            } else if (n < 14400) {
                r = h(Object(o.intval)(n / 3600), f("global_word_hours_ago", "raw"), f("global_hours_ago", "raw"))
            } else r = v(e, 0, !0, "_l");
            return r
        }

        function v(e, t, n, r) {
            void 0 === n && (n = !0), void 0 === t && (t = 0), void 0 === r && (r = ""), t *= 1e3;
            var o = new Date(1e3 * e),
                i = new Date;
            return o.getFullYear() !== i.getFullYear() && o.getTime() < i.getTime() - 1728e5 || Math.abs(o.getTime() - i.getTime()) > 157248e5 ? m(1e3 * e, f("global_date", "raw"), t, f("months_sm_of"), !n) : m(1e3 * e, f("global_short_date_time" + r, "raw"), t, f("months_sm_of"), !n)
        }

        function O(e, t, n) {
            void 0 === n && (n = !0), void 0 === t && (t = 0);
            var r = new Date,
                o = r.getFullYear(),
                i = r.getMonth(),
                a = new Date(1e3 * e),
                s = a.getFullYear(),
                c = a.getMonth();
            return m(1e3 * e, f(s < o && (i > 1 || c < 9 || o - s >= 2) ? "global_date" : "global_short_date_time", "raw"), t, f("months_sm_of", "raw"), !n)
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
                var r = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("system_msg");
                r.style.backgroundColor = n, r.innerHTML = e, Object(_dom__WEBPACK_IMPORTED_MODULE_0__.show)(r), t && (window.topMsgTimer = setTimeout(topMsg.pbind(!1), 1e3 * t))
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

        function showMsg(e, t, n, r) {
            var o = "msg" + ("msg" !== n ? " " + n : "");
            r && (o += " msg_appear"), e = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)(e);
            var i = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.geByClass1)(n, e),
                a = i || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.domFC)(e),
                s = e.insertBefore(Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ce)("div", {
                    className: o,
                    innerHTML: '<div class="msg_text">' + t + "</div>"
                }), a);
            i && Object(_dom__WEBPACK_IMPORTED_MODULE_0__.re)(i), setTimeout(_dom__WEBPACK_IMPORTED_MODULE_0__.removeClass.pbind(s, "msg_appear"), 0)
        }

        function showGlobalPrg(e, t) {
            var n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.getXY)(e),
                r = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.getSize)(e),
                o = t || {},
                i = o.w,
                a = void 0 === i ? 32 : i,
                s = o.h,
                c = void 0 === s ? 13 : s,
                u = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.ge)("global_prg");
            u.className = o.cls || "progress", Object(_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(u, {
                left: n[0] + Math.floor((r[0] - a) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.intval)(o.shift ? o.shift[0] : 0),
                top: n[1] + Math.floor((r[1] - c) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.intval)(o.shift ? o.shift[1] : 0),
                width: a,
                height: c,
                display: "block",
                "z-index": o.zIndex ? o.zIndex : null
            }), o.hide && (e.style.visibility = "hidden")
        }
    },
    173: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE", function() {
            return c
        }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN", function() {
            return u
        }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE", function() {
            return d
        }), n.d(t, "MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS", function() {
            return _
        }), n.d(t, "MAIL_CHAT_FLAG_ADMINS_CAN_INVITE_LINK", function() {
            return l
        }), n.d(t, "MAIL_CHATS_ACTION_SEE_INVITE_LINK", function() {
            return f
        }), n.d(t, "MAIL_CHATS_ACTION_CHANGE_INVITE_LINK", function() {
            return m
        }), n.d(t, "MAIL_CHATS_ACTION_INVITE_USER", function() {
            return b
        }), n.d(t, "MAIL_CHATS_ACTION_PIN_OR_UNPIN", function() {
            return p
        }), n.d(t, "MAIL_CHATS_ACTION_CHANGE_TITLE", function() {
            return h
        }), n.d(t, "MAIL_CHATS_ACTION_ADD_ADMIN", function() {
            return g
        }), n.d(t, "canSeeInviteLink", function() {
            return E
        }), n.d(t, "canChangeInviteLink", function() {
            return y
        }), n.d(t, "canAddAdmin", function() {
            return j
        }), n.d(t, "canInviteUser", function() {
            return w
        }), n.d(t, "canKickUser", function() {
            return M
        }), n.d(t, "canPinOrUnpin", function() {
            return k
        }), n.d(t, "canChangeTitle", function() {
            return T
        }), n.d(t, "canChangeAvatar", function() {
            return C
        }), n.d(t, "canSeeAllMessages", function() {
            return P
        }), n.d(t, "checkChatRights", function() {
            return D
        }), n.d(t, "doesChatTabHaveFlag", function() {
            return x
        }), n.d(t, "isUserAdminInChat", function() {
            return A
        }), n.d(t, "isUserOwnerInChat", function() {
            return I
        }), n.d(t, "isUserInvitedByMe", function() {
            return L
        });
        var r, o = n(177),
            i = n(159),
            a = n(257);

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
            l = 32,
            f = "see_invite_link",
            m = "change_invite_link",
            b = "invite_user",
            p = "pin_unpin",
            h = "change_title",
            g = "add_admin",
            v = (s(r = {}, f, l), s(r, m, l), s(r, g, _), s(r, b, c), s(r, p, u), s(r, h, d), r),
            O = 1;

        function E(e, t, n) {
            return D(e, f, t, n)
        }

        function y(e, t, n) {
            return D(e, m, t, n)
        }

        function j(e, t, n, r) {
            var a = Object(i.unpackStore)(e);
            return !I(Object(o.getTab)(a, n || a.peer), t) && D(e, g, n, r)
        }

        function w(e, t, n) {
            return D(e, b, t, n)
        }

        function M(e, t, n, r) {
            var s = Object(i.unpackStore)(e);
            if (function(e, t) {
                    var n = Object(i.unpackStore)(e);
                    return void 0 !== n.service && (n.service & t) > 0
                }(e, O)) return !0;
            var c = Object(o.getTab)(s, n || s.peer);
            return !(c.data.kicked && !c.data.closed) && (!Object(a.isFvkcomgroup)(e, n) && (!I(c, t) && (!!I(c, r = void 0 === r ? window.vk.id : r) || (A(c, r) ? !A(c, t) : L(c, t) && !A(c, t)))))
        }

        function k(e, t, n) {
            return D(e, p, t, n)
        }

        function T(e, t, n) {
            return D(e, h, t, n)
        }

        function C(e, t, n) {
            return T(e, t, n) && !Object(a.isFvkcomgroup)(e, t)
        }

        function P(e, t, n) {
            return !Object(o.isCommunityPeer)(n) || !!Object(o.getTab)(e, t).caccess[n]
        }

        function D(e, t, n, r) {
            var s = Object(i.unpackStore)(e);
            r = void 0 === r ? window.vk.id : r, n = void 0 === n ? s.peer : n;
            var c = Object(o.getTab)(s, n),
                u = !c.data.kicked && !c.data.closed,
                d = v[t];
            if (Object(a.isFvkcomgroup)(e, n)) switch (t) {
                case g:
                case b:
                    return !1;
                case f:
                    return u;
                default:
                    return s.gid > 0
            }
            switch (t) {
                case f:
                case m:
                case g:
                    return x(c, d) ? A(c, r) && u : I(c, r);
                case b:
                case p:
                case h:
                    return x(c, d) ? A(c, r) && u : u
            }
            return !1
        }

        function x(e, t) {
            return ((e && e.data && e.data.flags || 0) & t) > 0
        }

        function A(e, t) {
            return (e && e.adminIds || []).indexOf(+t) > -1
        }

        function I(e, t) {
            return e.ownerId === t
        }

        function L(e, t) {
            return -1 !== e.invitedByMe.indexOf(t)
        }
    },
    177: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "getFirstUnread", function() {
            return d
        }), n.d(t, "isSearchShown", function() {
            return _
        }), n.d(t, "getPeer", function() {
            return l
        }), n.d(t, "getCurrentKeyboard", function() {
            return f
        }), n.d(t, "getKeyboard", function() {
            return m
        }), n.d(t, "getTab", function() {
            return b
        }), n.d(t, "getCurrentTab", function() {
            return p
        }), n.d(t, "getSelectedMessages", function() {
            return h
        }), n.d(t, "getMessageRangeFromSelection", function() {
            return g
        }), n.d(t, "countUnread", function() {
            return v
        }), n.d(t, "getMessageByRid", function() {
            return O
        }), n.d(t, "isRidExist", function() {
            return E
        }), n.d(t, "getLocalId", function() {
            return y
        }), n.d(t, "getLastMessage", function() {
            return j
        }), n.d(t, "parserMessage", function() {
            return w
        }), n.d(t, "getAuthorFullName", function() {
            return M
        }), n.d(t, "getMessage", function() {
            return k
        }), n.d(t, "getPreviousMessage", function() {
            return T
        }), n.d(t, "isClassicInterface", function() {
            return C
        }), n.d(t, "isLocksAvailable", function() {
            return P
        }), n.d(t, "isFoldersAvailable", function() {
            return D
        }), n.d(t, "isCommunityInterface", function() {
            return x
        }), n.d(t, "isChannel", function() {
            return A
        }), n.d(t, "getBareTab", function() {
            return I
        }), n.d(t, "isReversedDialogs", function() {
            return L
        }), n.d(t, "isFullyLoadedTab", function() {
            return S
        }), n.d(t, "makeTabNotFullyLoaded", function() {
            return R
        }), n.d(t, "isGoToEndVisible", function() {
            return B
        }), n.d(t, "getUnreadScrollBottom", function() {
            return U
        }), n.d(t, "isSendingAvailable", function() {
            return N
        }), n.d(t, "isCommunityPeer", function() {
            return W
        }), n.d(t, "isCommunityBlocked", function() {
            return K
        }), n.d(t, "checkVoiceMessageAvailable", function() {
            return F
        }), n.d(t, "isSearching", function() {
            return H
        }), n.d(t, "getSearchText", function() {
            return q
        }), n.d(t, "isSearchingValue", function() {
            return G
        }), n.d(t, "isRecentSearchesActive", function() {
            return z
        }), n.d(t, "getPinnedMessage", function() {
            return V
        }), n.d(t, "doPopularSuggExist", function() {
            return Y
        }), n.d(t, "isAnyMessageBeingEdited", function() {
            return Q
        }), n.d(t, "getGroupId", function() {
            return X
        }), n.d(t, "getTabDraft", function() {
            return $
        }), n.d(t, "getTemplates", function() {
            return Z
        }), n.d(t, "tabIsMessageRequest", function() {
            return J
        }), n.d(t, "tabIsOutgoingMessageRequest", function() {
            return ee
        });
        var r = n(120),
            o = n(148),
            i = n(222),
            a = n(197),
            s = n(113),
            c = n(159),
            u = n(173);

        function d(e, t) {
            var n = Object(c.unpackStore)(e),
                o = n.tabs[n.peer];
            return Object.keys(o.msgs).filter(function(n) {
                var i = k(e, t, n);
                return !Object(r.isOut)(i) && intval(n) > o.in_up_to
            })[0]
        }

        function _(e) {
            return Object(c.unpackStore)(e).searchShown
        }

        function l(e) {
            return Object(c.unpackStore)(e).peer
        }

        function f(e) {
            return m(e, l(e))
        }

        function m(e, t) {
            return (b(e, t) || {}).keyboard
        }

        function b(e, t) {
            var n = Object(c.unpackStore)(e);
            return n.tabs && n.tabs[t]
        }

        function p(e) {
            var t = Object(c.unpackStore)(e);
            return t.peer ? t.tabs[t.peer] : null
        }

        function h(e) {
            return Object(c.unpackStore)(e).selectedMessages
        }

        function g(e, t, n) {
            var o = b(e, t),
                i = h(e)[0];
            if (void 0 === i) return [n];
            var a = Math.min(n, i),
                s = Math.max(n, i);
            return Object.keys(o.msgs).filter(function(e) {
                return e >= a && e <= s
            }).filter(function(t) {
                var n = k(e, e.get().peer, t);
                return !Object(r.isServiceMsg)(n) && !Object(r.isCallMessage)(n)
            }).map(intval)
        }

        function v(e, t) {
            var n = b(Object(c.unpackStore)(t), e),
                o = 0;
            for (var i in n.msgs)
                if (n.msgs.hasOwnProperty(i)) {
                    var a = k(t, e, i);
                    Object(r.isOut)(a) || (o += Object(r.isUnread)(n, a) ? 1 : 0)
                }
            return o
        }

        function O(e, t, n) {
            var r = b(e, t);
            return Object.keys(r.msgs).filter(function(r) {
                return intval(k(e, t, r).randomId) === n
            }).length > 0
        }

        function E(e, t, n) {
            return !!O(e, t, n)
        }

        function y(e, t) {
            var n = Object(c.unpackStore)(e),
                r = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
            return void 0 !== r ? 2e9 + r : t
        }

        function j(e, t, n) {
            var r = b(e, t),
                i = k(e, t, n),
                a = Object.keys(r.msgs).filter(function(n) {
                    var r = k(e, t, n),
                        a = r.local && r.type !== o.EDIT_MESSAGE;
                    return !(!i.local && a) && (!(!i.local || a) || y(e, i.messageId) > y(e, r.messageId))
                }).pop();
            return a ? k(e, t, a) : null
        }

        function w(e) {
            return e && e.length > 0 ? o.addMessageEvent([0].concat(e)) : e
        }

        function M(e, t, n) {
            var o = b(e, t),
                i = k(e, t, n),
                s = Object(c.unpackStore)(e);
            return Object(r.isOut)(i) ? Object(a.oCacheGet)(e, s.id).name : i.userId !== i.peerId ? !!Object(a.oCacheExists)(e, i.userId) && Object(a.oCacheGet)(e, i.userId).name : o.tab
        }

        function k(e, t, n) {
            var r = b(e, t),
                o = r && r.msgs && r.msgs[n];
            return o ? w(o) : null
        }

        function T(e, t, n) {
            var r = b(e, t),
                o = r && r.msgs && Object.keys(r.msgs).sort(function(e, t) {
                    return +e - t
                });
            if (!o) return null;
            var i = o && o.indexOf("" + n),
                a = i > -1 ? o[i - 1] : null;
            return r.msgs[a]
        }

        function C(e) {
            var t = Object(c.unpackStore)(e);
            return t.gid || t.isClassic
        }

        function P(e) {
            return Object(c.unpackStore)(e).gid
        }

        function D(e) {
            return Object(c.unpackStore)(e).gid
        }

        function x(e) {
            return !!Object(c.unpackStore)(e).gid
        }

        function A(e, t) {
            return !!(t.peerId > 2e9 && Object(u.doesChatTabHaveFlag)(t, 1024))
        }

        function I(e, t) {
            var n = Object(c.unpackStore)(t);
            return n.tabs[e] || n.mapped_index[e]
        }

        function L(e) {
            var t = Object(c.unpackStore)(e);
            return !!x(e) && ((19542789 === t.gid || 103416369 == t.gid) && (t.active_tab === i.FOLDER_UNRESPOND || t.active_tab === i.FOLDER_UNREAD))
        }

        function S(e, t) {
            var n = (e = Object(c.unpackStore)(e)).tabs;
            return !(!n || !n[t] || void 0 === n[t].history || !n[t].msgs)
        }

        function R(e, t) {
            var n = b(e, t);
            n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
        }

        function B(e) {
            var t = e.get().go_to_end_visible;
            return !!t && t[0]
        }

        function U(e) {
            var t = e.get().go_to_end_visible;
            return t ? t[1] : 0
        }

        function N(e) {
            return !Object(c.unpackStore)(e).lockedSending
        }

        function W(e) {
            return e > -2e9 && e < 0
        }

        function K(e, t) {
            return !!W(t) && !!b(e, t).blocked_community
        }

        function F(e) {
            return Object(c.unpackStore)(e).voice_message_available
        }

        function H(e) {
            var t = Object(c.unpackStore)(e);
            return !(!q(t) && !t.recentSearch)
        }

        function q(e) {
            return Object(c.unpackStore)(e).searchText
        }

        function G(e, t) {
            var n = Object(c.unpackStore)(e);
            return !!(t && t !== q(e) || n.recentSearch)
        }

        function z(e) {
            return Object(c.unpackStore)(e).recentSearch
        }

        function V(e) {
            var t = p(e);
            return t && t.pinned && w(t.pinned)
        }

        function Y(e) {
            var t = e.get().popular_sugg;
            return t && t.length > 0
        }

        function Q(e) {
            return 1 == Object(c.unpackStore)(e).isEditing
        }

        function X(e) {
            return Object(c.unpackStore)(e).gid
        }

        function $(e) {
            return e.draft || (e.draft = Object(s.loadDraftForPeer)(cur.imDb, e.peerId)), e.draft
        }

        function Z(e) {
            return (Object(c.unpackStore)(e).templates || []).filter(function(e) {
                return !e.deleted
            })
        }

        function J(e) {
            return e.is_message_request || e.folders & i.FOLDER_MASKS[i.FOLDER_MESSAGE_REQUEST] || e.folders & i.FOLDER_MASKS[i.FOLDER_MESSAGE_REQUEST_REJECTED]
        }

        function ee(e) {
            return e.peerId > 19e8 && e.peerId < 2e9
        }
    },
    18: function(e, t, n) {
        "use strict";

        function r(e) {
            var t = new Date;
            return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
        }

        function o(e) {
            return r(new Date(e.getTime() + 864e5))
        }

        function i(e) {
            return r(new Date(e.getTime() - 864e5))
        }

        function a(e, t) {
            var n = new Date(e),
                r = new Date(t);
            return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth() && n.getDate() === r.getDate()
        }

        function s(e) {
            return e >= 10 ? e : "0" + e
        }

        function c(e, t) {
            var n = void 0;
            e = Math.max(e, 0);
            var r = Math.floor(e % 60);
            n = r < 10 ? "0" + r : r;
            var o = (e = Math.floor(e / 60)) % 60;
            return n = o + ":" + n, ((e = Math.floor(e / 60)) > 0 || t) && (o < 10 && (n = "0" + n), n = e + ":" + n), n
        }
        n.r(t), n.d(t, "isToday", function() {
            return r
        }), n.d(t, "isYesterday", function() {
            return o
        }), n.d(t, "isTomorrow", function() {
            return i
        }), n.d(t, "isSameDate", function() {
            return a
        }), n.d(t, "leadingZero", function() {
            return s
        }), n.d(t, "formatTime", function() {
            return c
        })
    },
    191: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "browser", function() {
            return i
        }), n.d(t, "mobPlatforms", function() {
            return a
        }), n.d(t, "browserFeatures", function() {
            return s
        }), n.d(t, "initBrowserUtils", function() {
            return c
        });
        var r = n(230),
            o = navigator.userAgent.toLowerCase(),
            i = {
                version: (o.match(/.+(?:me|ox|on|rv|it|era|opr|ie|edge)[\/: ]([\d.]+)/) || [0, "0"])[1],
                opera: /opera/i.test(o) || /opr/i.test(o),
                vivaldi: /vivaldi/i.test(o),
                amigo: /amigo.*mrchrome soc/i.test(o),
                msie: /msie/i.test(o) && !/opera/i.test(o) || /trident\//i.test(o) || /edge/i.test(o),
                msie6: /msie 6/i.test(o) && !/opera/i.test(o),
                msie7: /msie 7/i.test(o) && !/opera/i.test(o),
                msie8: /msie 8/i.test(o) && !/opera/i.test(o),
                msie9: /msie 9/i.test(o) && !/opera/i.test(o),
                msie_edge: /edge/i.test(o) && !/opera/i.test(o),
                mozilla: /firefox/i.test(o),
                chrome: /chrome/i.test(o) && !/edge/i.test(o),
                safari: !/chrome/i.test(o) && /webkit|safari|khtml/i.test(o),
                iphone: /iphone/i.test(o),
                ipod: /ipod/i.test(o),
                iphone4: /iphone.*OS 4/i.test(o),
                ipod4: /ipod.*OS 4/i.test(o),
                ipad: /ipad/i.test(o),
                android: /android/i.test(o),
                bada: /bada/i.test(o),
                mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(o),
                msie_mobile: /iemobile/i.test(o),
                safari_mobile: /iphone|ipod|ipad/i.test(o),
                opera_mobile: /opera mini|opera mobi/i.test(o),
                opera_mini: /opera mini/i.test(o),
                mac: /mac/i.test(o),
                windows7: /windows nt 6.1/i.test(o),
                windowsVista: /windows nt 6.0/i.test(o),
                windowsXp: /windows nt (5.2|5.1)/i.test(o),
                search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(o),
                smart_tv: /smart-tv|smarttv/i.test(o)
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
                wheelEvent: "onwheel" in Object(r.ce)("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : i.mozilla ? "MozMousePixelScroll" : "DOMMouseScroll",
                hasBoundingClientRect: "getBoundingClientRect" in Object(r.ce)("div"),
                cmaEnabled: navigator.credentials && navigator.credentials.preventSilentAccess && window.vk && vk.cma
            };

        function c() {
            window._ua || (window._ua = navigator.userAgent.toLowerCase()), window.locDomain || (window.locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0]), window.locHost = location.host, window.locProtocol = location.protocol, window.locHash = location.hash.replace("#/", "").replace("#!", "")
        }
    },
    197: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "oCacheExists", function() {
            return o
        }), n.d(t, "oCacheGet", function() {
            return i
        }), n.d(t, "oCacheAdd", function() {
            return a
        });
        var r = n(159);

        function o(e, t) {
            return t in Object(r.unpackStore)(e).oCache
        }

        function i(e, t) {
            var n = Object(r.unpackStore)(e).oCache[t];
            return n && !n._n && (! function(e) {
                if (!e.first_name) {
                    var t = e.name.split(" ", 2);
                    e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
                }
                e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
            }(n), n._n = 1), n
        }

        function a(e, t) {
            var n = Object(r.unpackStore)(e);
            n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
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
                r = function(e) {
                    if (decodeErors[e]) return e;
                    try {
                        return encodeURIComponent(e)
                    } catch (e) {
                        return ""
                    }
                };
            for (var o in e)
                if (null != e[o] && !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.isFunction)(e[o]))
                    if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.isArray)(e[o]))
                        for (var i = 0, a = 0, s = e[o].length; i < s; ++i) null == e[o][i] || Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.isFunction)(e[o][i]) || (n.push(r(o) + "[" + a + "]=" + r(e[o][i])), ++a);
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
            return e = e.split("&"), Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(e, function(e, r) {
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
            framegot: function(e, t, n, r) {
                ajax.framedata && (ajax.framedata.push(void 0 === t && void 0 === n && void 0 === r ? e : [e, t, n, r]), 1 == ajax.framedata.length && ajax._framenext())
            },
            framepost: function(e, t, n, r) {
                clearTimeout(iframeTO), iframeTransport && ajax._frameover(), iframeTransport = utilsNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ce)("div", {
                    innerHTML: "<iframe></iframe>"
                })).firstChild, ajax._framedone = n, ajax.framedata = [!0], e += "?" + ("string" != typeof t ? ajx2q(t, r && r.noSort) : t), e += ("?" != e.charAt(e.length - 1) ? "&" : "") + "_rndVer=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.irand)(0, 99999), ajax._frameurl = iframeTransport.src = e
            },
            plainpost: function(e, t, n, r, o, i, a, s) {
                var c = ajax._getreq(),
                    u = "string" != typeof t ? ajx2q(t, a && a.noSort) : t;
                c.onreadystatechange = function() {
                    4 === c.readyState && (c.status >= 200 && c.status < 300 ? n && n(c.responseText, c) : r && r(c.responseText, c))
                };
                try {
                    c.open("POST", e, !0)
                } catch (e) {
                    return !1
                }
                return i && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(i, function(e, t) {
                    c[e] = t
                }), o || (c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s || c.setRequestHeader("X-Requested-With", "XMLHttpRequest")), c.send(u), c
            },
            post: function(e, t, n) {
                "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
                var r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)({
                        _captcha: !1,
                        _box: !1
                    }, n || {}),
                    o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)({
                        al: r.frame ? -1 : 1
                    }, t),
                    i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.vkNow)(),
                    a = vk.spentLastSendTS ? Math.round((i - vk.spentLastSendTS) / 1e3) : 0;
                if (vk.sampleUser >= 0 && window.cur && cur.module && a >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (o._smt = cur.module + ":" + a), vk.spentLastSendTS = i), r.progress && (r.showProgress || (r.showProgress = function() {
                        var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ge)(r.progress);
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hasClass)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.setStyle)(e, "opacity", 1), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.show)(e)
                    }), r.hideProgress || (r.hideProgress = function() {
                        var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ge)(r.progress);
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hasClass)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.setStyle)(e, "opacity", 0), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hide)(e)
                    })), r.loader) {
                    var s = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.isVisible)(boxLayerWrap);
                    r.showProgress = function() {
                        boxRefreshCoords(boxLoader), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.show)(boxLoader), s || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.show)(boxLayerWrap)
                    }, r.hideProgress = function() {
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hide)(boxLoader), s || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.hide)(boxLayerWrap)
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
                var r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.clone)(t);
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
                                e[n] = Object(_utils__WEBPACK_IMPORTED_MODULE_6__.parseJSON)(r);
                                break;
                            case "int":
                                e[n] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(r);
                                break;
                            case "float":
                                e[n] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.floatval)(r);
                                break;
                            case "bool":
                                e[n] = !!Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(r);
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
                                        r = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.extend)(options, {
                                            cache: -1
                                        }) : options;
                                    ajax._post(url, n, r)
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
                        r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.clone)(n);
                    Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.each)(r, function(e, t) {
                        return r[e] = t.substr(0, 100)
                    }), ajax.lastResp = r.join("<!>");
                    var o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(n.shift());
                    if (!o) return fail("<pre>" + e + "</pre>", {
                        status: -1
                    });
                    if (vk.version && vk.version !== o) o && n.length > 4 ? nav.reload({
                        force: !0,
                        from: 2,
                        url: url,
                        query: query && ajx2q(query)
                    }) : nav.strLoc ? location.replace(locBase) : Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.topError)("Server error.", {
                        type: 100
                    });
                    else {
                        vk.version = !1;
                        var i = n.shift(),
                            a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(n.shift()),
                            s = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(n.shift());
                        options.frame && (n = t);
                        var c = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.intval)(n.shift());
                        if (vk.lang !== a && options.canReload) nav.reload({
                            force: !0,
                            from: 3,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        else {
                            var u = function() {
                                var e = ["common.css"];
                                if (i)
                                    for (var t = 0, r = (i = i.split(",")).length; t < r; ++t) e.push(i[t]);
                                if (stVersions.lang < s)
                                    for (var o in stVersions.lang = s, StaticFiles) /^lang\d/i.test(o) && e.push(o);
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
                                stManager.add(e, _processResponse.pbind(c, n))
                            };
                            if (window.stVersions) {
                                if (o === stVersions.nav) return u();
                                headNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.ce)("script", {
                                    type: "text/javascript",
                                    src: "/js/loader_nav" + o + "_" + vk.lang + ".js"
                                })), setTimeout(function e() {
                                    if (o === stVersions.nav) return u();
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
    203: function(e, t, n) {
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
                for (var a = arguments.length, s = Array(a), c = 0; c < a; c++) s[c] = arguments[c];
                return Promise.resolve().then(function() {
                    return e.apply(void 0, s)
                }).catch(function(e) {
                    if (++o <= t) {
                        var a = "function" == typeof n ? n(o) : 0;
                        return 0 === a ? i.apply(void 0, s) : r(a).then(function() {
                            return i.apply(void 0, s)
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
                for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
                return new Promise(function(e, i) {
                    var s = n && !r;
                    clearTimeout(r), o && o.reject("debounce"), r = setTimeout(function() {
                        r = null, o = null, n || e(a)
                    }, t), s ? e(a) : n && i("debounce"), o = {
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
        n.r(t), n.d(t, "pause", function() {
            return r
        }), n.d(t, "retryFn", function() {
            return o
        }), n.d(t, "debouncedPromise", function() {
            return i
        }), n.d(t, "abortablePause", function() {
            return a
        })
    },
    205: function(e, t, n) {
        "use strict";

        function r(e, t, n, r, o) {
            return window.statlogsValueEvent(e, t, n, r, o)
        }

        function o(e) {
            return Math.random() < e
        }

        function i(e, t, n, i, a, s) {
            o(e) && r(t, n, i, a, s)
        }
        n.r(t), n.d(t, "statlogsValueEvent", function() {
            return r
        }), n.d(t, "randEnabled", function() {
            return o
        }), n.d(t, "statlogsProbValueEvent", function() {
            return i
        })
    },
    212: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "isPinnedMessageVisibleInTab", function() {
            return l
        }), n.d(t, "pinnedMessageHide", function() {
            return f
        }), n.d(t, "pinnedMessageUnHide", function() {
            return m
        }), n.d(t, "pinnedMessageUnpin", function() {
            return b
        }), n.d(t, "mount", function() {
            return g
        });
        var r = n(25),
            o = n(336),
            i = n(56),
            a = n(257),
            s = n(177),
            c = n(159),
            u = n(297),
            d = "_im_pin_hide",
            _ = "_im_pinned_message";

        function l(e, t) {
            if (Object(c.unpackStore)(e).searchShown) return !1;
            var n = Object(s.getTab)(e, t),
                r = n && Object(s.parserMessage)(n.pinned);
            return !!r && n.pinHideId != r.chat_local_id
        }

        function f(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                o = Object(s.getTab)(e, t),
                i = o && Object(s.parserMessage)(o.pinned);
            o && i && (o.pinHideId = i.chat_local_id, cur.imDb.update(u.PIN_HIDDEN_ID_OP, [o.peerId, o.pinHideId]), p(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 1,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "hide"))
        }

        function m(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                o = Object(s.getTab)(e, t);
            o && o.pinHideId && (delete o.pinHideId, cur.imDb.update(u.PIN_HIDDEN_ID_OP, [o.peerId, void 0]), p(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 0,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "show"))
        }

        function b(e, t, n) {
            var r = p.bind(null, n, t),
                i = Object(a.showUnpinDialog)(function() {
                    i.hideProgress(), i.hide(), e.set(o.unpinMessageOptimistic.bind(null, t)).then(r).then(function(e) {
                        return e.set(o.unpinMessage.bind(null, t))
                    }).then(r)
                })
        }

        function p(e, t, n) {
            return e().updateChatTopic(t, n), Object(o.setActions)(n.get()), e().updateActions(n), n
        }

        function h(e) {
            return {
                unmount: function() {
                    Object(r.destroyModule)(e)
                }
            }
        }

        function g(e, t, n) {
            var o = Object(r.createMutations)(h).bindMutations,
                c = function(e, t, n) {
                    var r = e.get().peer,
                        o = Object(s.parserMessage)(Object(s.getTab)(e, r).pinned);
                    if (n.target.classList.contains(d)) o && f(e, r, t);
                    else if ("A" !== n.target.tagName) {
                        var c = o && o.messageId;
                        c && !Object(a.isAlreadyDeleted)(e, r, c) ? Object(a.focusOnMessage)(e, t().focusOnMessage, r, c) : Object(a.showPinnedBox)(e, t, r, i.mount, n), statlogsValueEvent("im_pinned_messages", "open")
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
            return o(Object(r.createModule)({
                handlers: function(t, n) {
                    n(e, "click", _, c), n(e, "mouseover", d, u)
                }
            }))
        }
    },
    222: function(e, t, n) {
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
        n.r(t), n.d(t, "OUR_DOMAINS", function() {
            return i
        }), n.d(t, "ENTITIES", function() {
            return a
        }), n.d(t, "VK_DOMAIN", function() {
            return s
        }), n.d(t, "MENTION", function() {
            return c
        }), n.d(t, "MENTION_RAW", function() {
            return u
        }), n.d(t, "ARROW_UP", function() {
            return d
        }), n.d(t, "ARROW_DOWN", function() {
            return _
        }), n.d(t, "PAGE_UP", function() {
            return l
        }), n.d(t, "PAGE_DOWN", function() {
            return f
        }), n.d(t, "END_KEY", function() {
            return m
        }), n.d(t, "HOME", function() {
            return b
        }), n.d(t, "ENTER", function() {
            return p
        }), n.d(t, "ESC", function() {
            return h
        }), n.d(t, "UNPRINTABLE_KEYS", function() {
            return g
        }), n.d(t, "UP_DOWN_CONTROLS", function() {
            return v
        }), n.d(t, "PRINTABLE", function() {
            return O
        }), n.d(t, "FOLDER_UNREAD", function() {
            return E
        }), n.d(t, "FOLDER_ALL", function() {
            return y
        }), n.d(t, "FOLDER_UNRESPOND", function() {
            return j
        }), n.d(t, "FOLDER_IMPORTANT", function() {
            return w
        }), n.d(t, "FOLDER_MESSAGE_REQUEST", function() {
            return M
        }), n.d(t, "FOLDER_MESSAGE_REQUEST_REJECTED", function() {
            return k
        }), n.d(t, "FOLDERS", function() {
            return T
        }), n.d(t, "FOLDER_MASKS", function() {
            return C
        }), n.d(t, "TOP_DOMAINS", function() {
            return P
        }), n.d(t, "MAX_DOMAIN_LENGTH", function() {
            return D
        }), n.d(t, "EMAIL", function() {
            return x
        }), n.d(t, "MESSAGE_REGEXP", function() {
            return A
        }), n.d(t, "RE_HASHTAG_EXTRACTION_PATTERN", function() {
            return I
        });
        var i = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
            a = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,
            s = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/,
            c = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g,
            u = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g,
            d = 38,
            _ = 40,
            l = 33,
            f = 34,
            m = 35,
            b = 36,
            p = 13,
            h = 27,
            g = [d, _, l, f, p, h, m, b],
            v = [l, f, _, d, b, m],
            O = "printable",
            E = "unread",
            y = "all",
            j = "unrespond",
            w = "important",
            M = "mr",
            k = "mr_rejected",
            T = [y, E, j, w, M],
            C = (o(r = {}, j, 2), o(r, w, 1), o(r, M, 256), o(r, k, 512), r),
            P = [].concat("aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw".split(","), "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр".split(","), "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e".split(",").map(function(e) {
                return "xn--" + e
            })),
            D = P.reduce(function(e, t) {
                return Math.max(e, t.length)
            }, 0),
            x = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})))", "ig"),
            A = new RegExp("(https?:\\/\\/)?(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})(?:\\:(\\d{2,5}))?)(([\\/?#])(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*[\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј\\—\\-\\_@#%?+\\/\\$.~=;:'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ　-〿＀-￯*]+|(?:\\(|\\[)[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\d&#%;,]+(?:\\)|\\])){0,200})?", "ig"),
            I = "(^|[s.,:'\";>)(]?)((#(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)){0,100}(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?))(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)){0,100}))(@((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?))?(?=$|[s.,:'\"&;?<)(]?)"
    },
    224: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "statlogsForwardEvent", function() {
            return a
        }), n.d(t, "statlogsForwardFromCommunityEvent", function() {
            return s
        }), n.d(t, "statlogsCommunityTemplatesClickEvent", function() {
            return c
        }), n.d(t, "statlogsForwardFromChannel", function() {
            return u
        }), n.d(t, "statlogsSendingTime", function() {
            return _
        }), n.d(t, "statlogsSendingTimeStart", function() {
            return l
        }), n.d(t, "statlogsSendingTimeEnd", function() {
            return f
        }), n.d(t, "statlogsSendingError", function() {
            return m
        }), n.d(t, "statlogsSendingQueueLength", function() {
            return p
        }), n.d(t, "statlogsSendingRetry", function() {
            return h
        });
        var r = n(205),
            o = n(159),
            i = {};

        function a(e) {
            Object(r.statlogsProbValueEvent)(.1, "im_forward_stat", d(e), !!e.get().gid)
        }

        function s(e, t) {
            Object(r.statlogsProbValueEvent)(.1, "im_forward_from_community_stat", d(e), !!e.get().gid, +t)
        }

        function c() {
            Object(r.statlogsProbValueEvent)(1, "im_apply_community_template_stat", 1)
        }

        function u() {
            Object(r.statlogsProbValueEvent)(1, "messages_channel_forward_click", 1)
        }

        function d(e) {
            var t = e.get().pendingForward;
            return +(t && t.msgIds && t.msgIds.length)
        }

        function _(e, t, n) {
            var o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (!Object(r.randEnabled)(1)) return function() {};
            var i = +new Date,
                a = b(e);
            return function() {
                var e = +new Date - i;
                statlogsValueEvent("messages_send_time_web", e, t, n, a, o)
            }
        }

        function l(e, t, n, r) {
            if (t.messageId && -1 !== String(t.messageId).indexOf("rid")) {
                var o = [t.messageId.replace("rid", ""), n, r].join("_"),
                    a = t.attaches.length > 0;
                i[o] = _(e, n, r, a)
            }
        }

        function f(e, t, n, r) {
            var o = [t.randomId, n, r].join("_"),
                a = i[o];
            a && (a(), delete i[o])
        }

        function m(e, t, n, o) {
            var i = b(e),
                a = "" === t ? "network" : "unknown";
            Object(r.randEnabled)(1) && statlogsValueEvent("messages_send_errors_web", a, n, o, i)
        }

        function b(e) {
            var t = Object(o.unpackStore)(e);
            return Boolean(t.longpoll && t.longpoll.isEnabled && t.longpoll.isEnabled())
        }

        function p(e) {
            var t = Object(o.unpackStore)(e),
                n = t.imQueue(t.peer).length;
            Object(r.randEnabled)(1) && statlogsValueEvent("messages_send_queue_size", n)
        }

        function h(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "unknown";
            Object(r.randEnabled)(1) && statlogsValueEvent("messages_send_retry", 1, t, e)
        }
    },
    230: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "ge", function() {
            return s
        }), n.d(t, "geByTag", function() {
            return c
        }), n.d(t, "geByTag1", function() {
            return u
        }), n.d(t, "geByClass", function() {
            return d
        }), n.d(t, "geByClass1", function() {
            return _
        }), n.d(t, "gpeByClass", function() {
            return l
        }), n.d(t, "domQuery", function() {
            return f
        }), n.d(t, "domQuery1", function() {
            return m
        }), n.d(t, "domClosest", function() {
            return b
        }), n.d(t, "domClosestByTag", function() {
            return p
        }), n.d(t, "gpeByTag", function() {
            return h
        }), n.d(t, "ce", function() {
            return g
        }), n.d(t, "cf", function() {
            return j
        }), n.d(t, "re", function() {
            return w
        }), n.d(t, "se", function() {
            return M
        }), n.d(t, "sech", function() {
            return k
        }), n.d(t, "rs", function() {
            return T
        }), n.d(t, "psr", function() {
            return C
        }), n.d(t, "domReplaceEl", function() {
            return P
        }), n.d(t, "domEL", function() {
            return D
        }), n.d(t, "domNS", function() {
            return x
        }), n.d(t, "domPS", function() {
            return A
        }), n.d(t, "domFC", function() {
            return I
        }), n.d(t, "domLC", function() {
            return L
        }), n.d(t, "domPN", function() {
            return S
        }), n.d(t, "domChildren", function() {
            return R
        }), n.d(t, "domInsertBefore", function() {
            return B
        }), n.d(t, "domInsertAfter", function() {
            return U
        }), n.d(t, "domByClass", function() {
            return N
        }), n.d(t, "domData", function() {
            return W
        }), n.d(t, "domChildIndex", function() {
            return K
        }), n.d(t, "domCA", function() {
            return F
        }), n.d(t, "domClosestSibling", function() {
            return H
        }), n.d(t, "matchesSelector", function() {
            return q
        }), n.d(t, "isHover", function() {
            return G
        }), n.d(t, "isAncestor", function() {
            return z
        }), n.d(t, "getScroll", function() {
            return V
        }), n.d(t, "domClosestPositioned", function() {
            return Y
        }), n.d(t, "domClosestOverflowHidden", function() {
            return Q
        }), n.d(t, "show", function() {
            return X
        }), n.d(t, "hide", function() {
            return $
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
            return re
        }), n.d(t, "getXY", function() {
            return oe
        }), n.d(t, "isWindow", function() {
            return ie
        }), n.d(t, "getSize", function() {
            return ae
        }), n.d(t, "getW", function() {
            return se
        }), n.d(t, "getH", function() {
            return ce
        }), n.d(t, "hasClass", function() {
            return ue
        }), n.d(t, "addClass", function() {
            return de
        }), n.d(t, "addClassDelayed", function() {
            return _e
        }), n.d(t, "removeClass", function() {
            return le
        }), n.d(t, "removeClassDelayed", function() {
            return fe
        }), n.d(t, "toggleClass", function() {
            return me
        }), n.d(t, "toggleClassDelayed", function() {
            return be
        }), n.d(t, "replaceClass", function() {
            return pe
        }), n.d(t, "getStyle", function() {
            return he
        }), n.d(t, "setStyle", function() {
            return ge
        }), n.d(t, "setStyleDelayed", function() {
            return ve
        }), n.d(t, "setPseudoStyle", function() {
            return Oe
        }), n.d(t, "data", function() {
            return Ee
        }), n.d(t, "attr", function() {
            return ye
        }), n.d(t, "removeAttr", function() {
            return je
        }), n.d(t, "removeData", function() {
            return we
        }), n.d(t, "cleanElems", function() {
            return Me
        }), n.d(t, "setTitle", function() {
            return ke
        }), n.d(t, "getZoom", function() {
            return Te
        }), n.d(t, "val", function() {
            return Ce
        }), n.d(t, "elfocus", function() {
            return Pe
        }), n.d(t, "traverseParent", function() {
            return De
        }), n.d(t, "setDocumentTitle", function() {
            return Ae
        }), n.d(t, "lockDocumentTitle", function() {
            return Ie
        }), n.d(t, "initDomScripts", function() {
            return Le
        });
        var r = n(240),
            o = n(288),
            i = n(191),
            a = n(345),
            s = function(e) {
                return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
            };

        function c(e, t) {
            return (t = s(t) || document).getElementsByTagName(e)
        }

        function u(e, t) {
            return (t = s(t) || document).querySelector && t.querySelector(e) || c(e, t)[0]
        }

        function d(e, t, n) {
            return t = s(t) || document, n = n || "*", e = ("." + e).replace(/\s+/gm, "."), Array.prototype.slice.call(t.querySelectorAll(n + e))
        }

        function _(e, t, n) {
            return t = s(t) || document, n = n || "*", t.querySelector && t.querySelector(n + ("." + e).replace(/\s+/gm, ".")) || d(e, t, n)[0]
        }

        function l(e, t, n) {
            if (!(t = s(t))) return null;
            for (; n !== t && (t = t.parentNode);)
                if (ue(t, e)) return t;
            return null
        }

        function f(e, t) {
            return (t || document).querySelectorAll(e)
        }

        function m(e, t) {
            return (t || document).querySelector(e)
        }

        function b(e, t) {
            return ue(t, e) ? t : l(e, t)
        }

        function p(e, t) {
            return e = e.toUpperCase(), t.nodeType === Node.ELEMENT_NODE && t.tagName.toUpperCase() === e ? t : h(e, t)
        }

        function h(e, t) {
            if (!(t = s(t))) return null;
            for (e = e.toUpperCase(); t = t.parentNode;)
                if (t.tagName && t.tagName.toUpperCase() === e) return t;
            return null
        }

        function g(e, t, n) {
            var o = document.createElement(e);
            return t && Object(r.extend)(o, t), n && ge(o, n), o
        }
        var v, O, E, y, j = (v = document, O = v.createDocumentFragment(), E = v.createElement("div"), y = v.createRange && v.createRange(), O.appendChild(E), y && y.selectNodeContents(E), y && y.createContextualFragment ? function(e) {
            return e ? y.createContextualFragment(e) : v.createDocumentFragment()
        } : function(e) {
            if (!e) return v.createDocumentFragment();
            E.innerHTML = e;
            for (var t = v.createDocumentFragment(); E.firstChild;) t.appendChild(E.firstChild);
            return t
        });

        function w(e) {
            return (e = s(e)) && e.parentNode && e.parentNode.removeChild(e), e
        }
        var M = function(e) {
                return I(g("div", {
                    innerHTML: e
                }))
            },
            k = function(e) {
                return R(g("div", {
                    innerHTML: e
                }))
            };

        function T(e, t) {
            return Object(r.each)(t, function(t, n) {
                e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === n ? "" : n).toString().replace(/\$/g, "&#036;"))
            }), e
        }

        function C(e) {
            return "https:" !== locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
        }

        function P(e, t) {
            return Object(r.isString)(t) && (t = M(t)), S(e).replaceChild(t, e), t
        }

        function D(e, t) {
            for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
            return e
        }
        var x = function(e) {
                return D((e || {}).nextSibling)
            },
            A = function(e) {
                return D((e || {}).previousSibling, 1)
            },
            I = function(e) {
                return D((e || {}).firstChild)
            },
            L = function(e) {
                return D((e || {}).lastChild, 1)
            },
            S = function(e) {
                return (e || {}).parentNode
            };

        function R(e) {
            for (var t = [], n = e.childNodes, r = 0; r < n.length; r++) n[r].tagName && t.push(n[r]);
            return t
        }

        function B(e, t) {
            var n = S(t);
            return n && n.insertBefore(e, t)
        }

        function U(e, t) {
            var n = S(t);
            return n && n.insertBefore(e, x(t))
        }

        function N(e, t) {
            return e ? _(t, e) : e
        }

        function W(e, t, n) {
            return e ? void 0 !== n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
        }

        function K(e) {
            for (var t = 0; null != (e = A(e));) t++;
            return t
        }

        function F(e, t) {
            do {
                e = S(e)
            } while (e && !q(e, t));
            return e
        }

        function H(e, t, n) {
            for (var r = null; null === r && e;)(e = -1 === n ? A(e) : x(e)) && q(e, t) && (r = e);
            return r
        }

        function q(e, t) {
            return !(!(e = s(e)) || e === document) && (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function(e) {
                for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t.item(n) !== this;);
                return n > -1
            }).call(e, t)
        }

        function G(e) {
            return q(e, ":hover")
        }

        function z(e, t) {
            var n = s(e);
            if (t = s(t), !e || !t) return !1;
            for (; n = n.parentNode;)
                if (n === t) return !0;
            return !1
        }

        function V() {
            var e = i.browser.msie6 ? s("PageContainer") : document.body,
                t = document.documentElement;
            return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
        }

        function Y(e, t) {
            for (var n = (t = t || {}).fromEl || S(e), o = t.positions || ["relative", "absolute", "fixed"]; n && n !== bodyNode;) {
                var i = he(n, "position");
                if (Object(r.inArray)(i, o) && (!t.noOverflow || "hidden" !== he(n, "overflow"))) break;
                n = S(n)
            }
            return n
        }

        function Q(e, t) {
            for (var n = e = s(e), r = void 0, o = void 0, a = void 0, c = !1; n && n.tagName && n !== bodyNode;) {
                if (r = he(n, "position"), o = he(n, "overflow"), a = he(n, "transform"), t && i.browser.mozilla) {
                    if ("page_wrap" != n.id && n !== e && "visible" !== o && ("static" === r ? !c || "relative" === c : "fixed" !== c)) break
                } else if (n !== e && "visible" !== o && ("static" === r ? !c || "relative" === c : "fixed" !== c)) break;
                "none" !== a ? c = void 0 : "static" !== r && "fixed" !== c && (c = r), n = S(n)
            }
            return n
        }

        function X(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; n < t; n++) X(arguments[n]);
            else if ((e = s(e)) && e.style) {
                var r = e.olddisplay,
                    o = e.tagName.toLowerCase(),
                    a = "block";
                e.style.display = r || "", "none" === he(e, "display") && (a = ue(e, "inline") || ue(e, "_inline") ? "inline" : ue(e, "_inline_block") ? "inline-block" : "tr" !== o || i.browser.msie ? "table" !== o || i.browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = a)
            }
        }

        function $(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; n < t; n++) $(arguments[n]);
            else if ((e = s(e)) && e.style) {
                var r = he(e, "display");
                e.olddisplay = "none" !== r ? r : "", e.style.display = "none"
            }
        }

        function Z(e) {
            return !(!(e = s(e)) || !e.style) && "none" !== he(e, "display")
        }

        function J() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function ee(e, t, n) {
            e = s(e), n = n || 0;
            var o = oe(e)[1],
                i = ae(e)[1],
                a = window,
                c = document.documentElement,
                u = Math.max(Object(r.intval)(a.innerHeight), Object(r.intval)(c.clientHeight)),
                d = s("page_header_cont"),
                _ = c.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                l = vk.staticheader ? Math.max(0, ae(d)[1] - _) : ae(d)[1];
            if (t) {
                if (o + i < _ + l + n) return o + i - _ - l - n;
                if (o > _ + u - n) return o - _ - u + n
            } else {
                if (o < _ + l + n) return o - _ - l - n;
                if (o + i > _ + u - n) return o + i - _ - u + n
            }
            return 0
        }

        function te(e, t) {
            return void 0 === t && (t = !Z(e)), t ? X(e) : $(e), t
        }

        function ne(e) {
            return void 0 !== e.getBoundingClientRect
        }

        function re(e, t) {
            var n = void 0;
            if (t && "inline" === he(e, "display")) {
                var r = e.getClientRects();
                n = r && r[0] || e.getBoundingClientRect()
            } else n = e.getBoundingClientRect();
            return n
        }

        function oe(e, t) {
            if (!(e = s(e))) return [0, 0];
            var n = e.ownerDocument,
                r = {
                    top: 0,
                    left: 0
                };
            if (!n) return [0, 0];
            var o = n.documentElement;
            ne(e) && (r = re(e, !0));
            var i = n === n.window ? n : 9 === n.nodeType && (n.defaultView || n.parentWindow);
            return [r.left + (t ? 0 : i.pageXOffset || o.scrollLeft) - (o.clientLeft || 0), r.top + (t ? 0 : i.pageYOffset || o.scrollTop) - (o.clientTop || 0)]
        }

        function ie(e) {
            return null != e && e === e.window
        }

        function ae(e, t, n) {
            e = s(e);
            var o = document.documentElement,
                i = [0, 0],
                a = void 0;
            if (t && "border-box" === he(e, "boxSizing") && (t = !1), e === document) i = [Math.max(o.clientWidth, bodyNode.scrollWidth, o.scrollWidth, bodyNode.offsetWidth, o.offsetWidth), Math.max(o.clientHeight, bodyNode.scrollHeight, o.scrollHeight, bodyNode.offsetHeight, o.offsetHeight)];
            else if (e) {
                var c = function() {
                    i = ne(e) && (a = re(e, n)) && void 0 !== a.width ? [a.width, a.height] : [e.offsetWidth, e.offsetHeight], t && Object(r.each)(i, function(t, n) {
                        var o = t ? ["Top", "Bottom"] : ["Left", "Right"];
                        Object(r.each)(o, function() {
                            i[t] -= parseFloat(he(e, "padding" + this)) || 0, i[t] -= parseFloat(he(e, "border" + this + "Width")) || 0
                        })
                    })
                };
                if (Z(e)) c();
                else {
                    var u = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        d = {},
                        _ = !1;
                    e.style.cssText.indexOf("!important") > -1 && (_ = e.style.cssText), Object(r.each)(u, function(t, n) {
                        d[t] = e.style[t], e.style[t] = n
                    }), c(), Object(r.each)(u, function(t, n) {
                        e.style[t] = d[t]
                    }), _ && (e.style.cssText = _)
                }
            }
            return i
        }

        function se(e) {
            return ae(e)[0]
        }

        function ce(e) {
            return ae(e)[1]
        }

        function ue(e, t) {
            var n = s(e);
            return n && 1 === n.nodeType && (" " + n.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0
        }

        function de(e, t) {
            var n = s(e);
            n && !ue(n, t) && (n.className = (n.className ? n.className + " " : "") + t)
        }
        window.whitespaceRegex = /[\t\r\n\f]/g;
        var _e = function(e, t, n) {
            n = Object(r.positive)(n), setTimeout(de.pbind(e, t), n)
        };

        function le(e, t) {
            var n = s(e);
            n && (n.className = Object(r.trim)((n.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
        }
        var fe = function(e, t, n) {
            n = Object(r.positive)(n), setTimeout(le.pbind(e, t), n)
        };

        function me(e, t, n) {
            return void 0 === n && (n = !ue(e, t)), (n ? de : le)(e, t), n
        }

        function be(e, t, n, o) {
            return o = Object(r.positive)(o), void 0 === n && (n = !ue(e, t)), (n ? _e : fe)(e, t, o), n
        }

        function pe(e, t, n) {
            le(e, t), de(e, n)
        }

        function he(e, t, n) {
            if (e = s(e), Object(r.isArray)(t)) {
                var o = {};
                return Object(r.each)(t, function(t, n) {
                    return o[n] = he(e, n)
                }), o
            }
            if (!e) return "";
            if (void 0 === n && (n = !0), !n && "opacity" === t && i.browser.msie) {
                var a = e.style.filter;
                return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
            }
            if (!n && e.style && (e.style[t] || "height" === t)) return e.style[t];
            var c = void 0,
                u = document.defaultView || window;
            if (u.getComputedStyle) {
                t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                var d = u.getComputedStyle(e, null);
                d && (c = d.getPropertyValue(t))
            } else if (e.currentStyle) {
                if ("opacity" === t && i.browser.msie) {
                    var _ = e.currentStyle.filter;
                    return _ && _.indexOf("opacity=") >= 0 ? parseFloat(_.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
                }
                var l = t.replace(/\-(\w)/g, function(e, t) {
                    return t.toUpperCase()
                });
                "auto" === (c = e.currentStyle[t] || e.currentStyle[l]) && (c = 0), c = (c + "").split(" "), Object(r.each)(c, function(t, n) {
                    if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                        var r = e.style,
                            o = r.left,
                            i = e.runtimeStyle.left;
                        e.runtimeStyle.left = e.currentStyle.left, r.left = n || 0, c[t] = r.pixelLeft + "px", r.left = o, e.runtimeStyle.left = i
                    }
                }), c = c.join(" ")
            }
            if (n && ("width" === t || "height" === t)) {
                var f = ae(e, !0)[{
                    width: 0,
                    height: 1
                }[t]];
                c = (Object(r.intval)(c) ? Math.max(Object(r.floatval)(c), f) : f) + "px"
            }
            return c
        }

        function ge(e, t, n) {
            if (e = s(e))
                if (Object(r.isObject)(t)) Object(r.each)(t, function(t, n) {
                    return ge(e, t, n)
                });
                else if ("opacity" === t) i.browser.msie && ((n + "").length ? e.style.filter = 1 !== n ? "alpha(opacity=" + 100 * n + ")" : "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== n && (e.style.opacity = n);
            else try {
                var o = "number" == typeof n;
                o && /height|width/i.test(t) && (n = Math.abs(n)), n = o && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? n + "px" : n, e.style[t] !== n && (e.style[t] = n)
            } catch (e) {
                Object(a.debugLog)("setStyle error: ", [t, n], e)
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
        var ve = function(e, t, n) {
            return setTimeout(ge.pbind(e, t, n), 0)
        };

        function Oe(e, t, n) {
            var o = Ee(e, "pseudo-id");
            o || (Ee(e, "pseudo-id", o = Object(r.irand)(1e8, 999999999)), de(e, "_pseudo_" + o));
            var i = t + "-style-" + o,
                a = s(i),
                c = "._pseudo_" + o + ":" + t + "{";
            a || (a = headNode.appendChild(g("style", {
                id: i,
                type: "text/css"
            }))), Object(r.each)(n, function(e, t) {
                c += e + ": " + t + " !important;"
            }), c += "}", a.sheet ? (a.sheet.cssRules.length && a.sheet.deleteRule(0), a.sheet.insertRule(c, 0)) : a.styleSheet && (a.styleSheet.cssText = c)
        }

        function Ee(e, t, n) {
            if (!e) return !1;
            var r = e[vkExpand];
            return r || (r = e[vkExpand] = ++vkUUID), void 0 !== n && (vkCache[r] || (vkCache[r] = {}, window.__debugMode && (vkCache[r].__elem = e)), vkCache[r][t] = n), t ? vkCache[r] && vkCache[r][t] : r
        }

        function ye(e, t, n) {
            return e = s(e), void 0 === n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
        }

        function je(e) {
            for (var t = 0, n = arguments.length; t < n; ++t) {
                var r = arguments[t];
                if (void 0 !== e[r]) try {
                    delete e[r]
                } catch (t) {
                    try {
                        e.removeAttribute(r)
                    } catch (e) {}
                }
            }
        }

        function we(e, t) {
            var n = !!e && e[vkExpand];
            if (n)
                if (t) {
                    if (vkCache[n]) {
                        delete vkCache[n][t], t = "";
                        var r = 0;
                        for (var i in vkCache[n])
                            if ("__elem" !== i) {
                                r++;
                                break
                            }
                        r || we(e)
                    }
                } else Object(o.removeEvent)(e), je(e, vkExpand), delete vkCache[n]
        }

        function Me() {
            for (var e = arguments, t = 0; t < e.length; ++t) {
                var n = s(e[t]);
                n && (we(n), je(n, "btnevents"))
            }
        }

        function ke(e, t, n) {
            if ((e = s(e)) && !e.titleSet) {
                if (t || (t = e), t.scrollWidth > t.clientWidth || t.scrollHeight > t.clientHeight) e.setAttribute("title", n || e.innerText || e.textContent);
                else {
                    var r = u("b", e);
                    r && (r.scrollWidth > r.clientWidth || r.scrollHeight > r.clientHeight) ? e.setAttribute("title", n || e.innerText || e.textContent) : e.removeAttribute("title")
                }
                e.titleSet = 1
            }
        }

        function Te() {
            var e = s("zoom_test_1") || document.body.appendChild(g("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            }));
            return (s("zoom_test_2") || document.body.appendChild(g("div", {
                id: "zoom_test_2"
            }, {
                left: e.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }))).offsetLeft / e.offsetLeft
        }

        function Ce(e, t, n) {
            if (e = s(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !n && e.phonblur && e.phonblur()) : "INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !n && Object(o.triggerEvent)(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value : e.innerHTML) || ""
        }

        function Pe(e, t, n) {
            e = s(e);
            try {
                if (e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== n && !1 !== n || (n = t), e.setSelectionRange) e.setSelectionRange(t, n);
                else if (window.getSelection && document.createRange) {
                    var r = document.createRange();
                    r.selectNodeContents(e), r.collapse(!1);
                    var o = window.getSelection();
                    o.removeAllRanges(), o.addRange(r)
                }
            } catch (e) {}
        }

        function De(e, t, n) {
            for (e = s(e), n = n || 999; e && !t(e);) {
                if (0 === --n) return !1;
                try {
                    if ((e = S(e)) === document) return !1
                } catch (t) {
                    e = !1
                }
            }
            return e
        }
        var xe = !1;

        function Ae(e) {
            if (!xe) return window.document.title = Object(r.replaceEntities)(e)
        }

        function Ie(e) {
            xe = e, e && window.cur && window.cur.destroy.push(function() {
                Ie(!1)
            })
        }

        function Le() {
            window.vkExpand = window.vkExpand || "VK" + Object(r.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}
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

            function _addButton(e, t, n, r) {
                var o = "flat_button";
                "no" === n || "gray" === n ? (o += " secondary", n = "cancel") : n = "ok";
                var i = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.ce)("button", {
                    className: o,
                    innerHTML: e,
                    id: r
                });
                return boxButtons.rows[0].insertCell(0).appendChild(i), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.createButton)(i, function() {
                    emitter.emit(n, retBox), t.apply(null, arguments)
                }), btns[n].push(i), i
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
                        var r = !0 === e ? 0 : options.animSpeed;
                        options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(document, "click", boxQueue.hideBGClick), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onBeforeHide) && options.onBeforeHide();
                        var o = function() {
                            boxQueue.currHiding === _message_boxes[guid] && (boxQueue.currHiding = !1), _message_boxes[guid].shOther || e || layers.boxhide(), !t && options.selfDestruct ? destroyMe() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(boxContainer), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(options.onHide) && options.onHide(n)
                        };
                        r > 0 ? (boxQueue.currHiding = _message_boxes[guid], Object(_fx__WEBPACK_IMPORTED_MODULE_5__.fadeOut)(boxContainer, r, o)) : o()
                    }
                };

            function showMe(e, t, n) {
                if (!visible && window._message_boxes[guid]) {
                    visible = !0;
                    var r = !0 === e || t ? 0 : options.animSpeed;
                    if (options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.addEvent)(document, "click", boxQueue.hideBGClick), t || layers.boxshow(), boxQueue.currHiding) {
                        boxQueue.currHiding.shOther = !0;
                        var o = boxQueue.currHiding.bodyNode.parentNode.parentNode;
                        Object(_dom__WEBPACK_IMPORTED_MODULE_4__.data)(o, "tween").stop(!0)
                    }
                    r > 0 ? Object(_fx__WEBPACK_IMPORTED_MODULE_5__.fadeIn)(boxContainer, r) : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxContainer), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.boxRefreshCoords)(boxContainer), options.onShow && options.onShow(n)
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
                addButton: function(e, t, n, r, o) {
                    var i = _addButton(e, t || this.hide, n, o);
                    return r ? i : this
                },
                setButtons: function(e, t, n, r) {
                    var o = this.removeButtons();
                    return e ? (o.addButton(e, t), n && o.addButton(n, r, "no"), o) : o.addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("box_close"))
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
                        for (var t = options.bodyStyle.split(";"), n = 0, r = t.length; n < r; n++) {
                            var o = t[n].split(":");
                            o.length > 1 && o[0].length && (boxBody.style[Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.trim)(o[0])] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.trim)(o[1]), boxBody.style.setProperty && boxBody.style.setProperty(Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.trim)(o[0]), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.trim)(o[1]), ""))
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
                r = arguments[3];
            if (Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.checkEvent)(r)) return !1;
            var o = n.params || {};
            n.containerClass && (o.containerClass = n.containerClass);
            var i = new MessageBox(o),
                a = {
                    onDone: function(r, a, s, c) {
                        if (n.preOnDone && n.onDone && n.onDone(i), i.isVisible())
                            if (__debugMode) u();
                            else try {
                                u()
                            } catch (n) {
                                Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.topError)(n, {
                                    dt: 15,
                                    type: 103,
                                    url: e,
                                    query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.ajx2q)(t),
                                    answer: Array.prototype.slice.call(arguments).join("<!>")
                                }), i.isVisible() && i.hide()
                            } else n.onDone && n.onDone(i, c);

                        function u() {
                            Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.addClass)(bodyNode, "layers_shown"), i.setOptions({
                                title: r,
                                hideButtons: o.hideButtons || !1
                            }), n.showProgress ? i.show() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(i.bodyNode), i.content(a), i.evalBox(s, e, t), n.onDone && n.onDone(i, c)
                        }
                    },
                    onFail: function(e) {
                        if (i.failed = !0, setTimeout(i.hide, 0), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.isFunction)(n.onFail)) return n.onFail(e)
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
            }), n.hideProgress = _dom__WEBPACK_IMPORTED_MODULE_4__.hide.pbind("global_prg")), n.showProgress ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.extend)(a, {
                showProgress: n.showProgress,
                hideProgress: n.hideProgress
            }) : (i.setOptions({
                title: !1,
                hideButtons: !0
            }).show(), boxQueue.count() < 2 && (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.removeClass)(bodyNode, "layers_shown")), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(i.bodyNode), a.showProgress = function() {
                Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(boxLoader), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.boxRefreshCoords)(boxLoader)
            }, a.hideProgress = _dom__WEBPACK_IMPORTED_MODULE_4__.hide.pbind(boxLoader)), i.removeButtons().addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_close")), ajax.post(e, t, a), i
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
                        var o = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", n.bodyNode);
                        if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.trim)(o.value) || !0 === t) {
                            var i = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", n.bodyNode)[0];
                            Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(o), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(i), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass1)("progress", n.bodyNode)), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(o), r.onSubmit(e, o.value)
                        } else Object(_dom__WEBPACK_IMPORTED_MODULE_4__.elfocus)(o)
                    }
                },
                i = !!n,
                a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.intval)(t) ? "" : "&s=1",
                s = r.imgSrc || "/captcha.php?sid=" + e + a;
            if (!i) {
                var c = '\n<div class="captcha">\n  <div><img src="' + s + '"/></div>\n  <div>\n    <input type="text" class="big_text" maxlength="7" placeholder="' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_captcha_input_here") + '" />\n    <div class="progress" /></div>\n  </div>\n</div>' + (r.addText || "");
                n = showFastBox({
                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("captcha_enter_code"),
                    width: 305,
                    onHide: r.onHide,
                    onDestroy: r.onDestroy || !1
                }, c, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("captcha_send"), function() {
                    n.submit()
                }, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("captcha_cancel"), function() {
                    var e = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", n.bodyNode),
                        t = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", n.bodyNode);
                    Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(e), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.removeEvent)(t), n.hide()
                })
            }
            n.submit = o.pbind(!0), n.changed = !0;
            var u = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("input", n.bodyNode),
                d = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByTag1)("img", n.bodyNode);
            return i && (u.value = "", d.src = "/captcha.php?sid=" + e + a, Object(_dom__WEBPACK_IMPORTED_MODULE_4__.hide)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass1)("progress", n.bodyNode))), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.show)(u), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.addEvent)(u, "keypress", o), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.addEvent)(d, "click", function() {
                this.src = "/captcha.php?sid=" + e + a + "&v=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.irand)(1e6, 2e6)
            }), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.elfocus)(u), n
        }

        function showReCaptchaBox(e, t, n, r) {
            window.recaptchaResponse = function(e) {
                r.onSubmit(e)
            };
            var o = !!n,
                i = !!window.grecaptcha;
            if (!o) {
                i || (window.recaptchaCallback = function() {
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
                var a = '<div class="recaptcha"></div>' + (r.addText || "");
                n = showFastBox({
                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("global_recaptcha_title"),
                    width: 354,
                    onHide: r.onHide,
                    onDestroy: r.onDestroy || !1
                }, a, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.getLang)("captcha_cancel"));
                var s = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.geByClass1)("recaptcha", n.bodyNode);
                s.id = "recaptcha" + (n.guid ? n.guid : "0"), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.showProgress)(s)
            }
            return o && i ? window.grecaptcha.reset() : i && window.recaptchaCallback(), n.changed = !0, n
        }
    },
    240: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "vkLocal", function() {
            return c
        }), n.d(t, "lTimeout", function() {
            return u
        }), n.d(t, "rand", function() {
            return d
        }), n.d(t, "irand", function() {
            return _
        }), n.d(t, "isUndefined", function() {
            return l
        }), n.d(t, "isFunction", function() {
            return f
        }), n.d(t, "isArray", function() {
            return m
        }), n.d(t, "isString", function() {
            return b
        }), n.d(t, "isObject", function() {
            return p
        }), n.d(t, "isEmpty", function() {
            return h
        }), n.d(t, "vkNow", function() {
            return g
        }), n.d(t, "vkImage", function() {
            return v
        }), n.d(t, "trim", function() {
            return O
        }), n.d(t, "stripHTML", function() {
            return E
        }), n.d(t, "escapeRE", function() {
            return y
        }), n.d(t, "intval", function() {
            return j
        }), n.d(t, "floatval", function() {
            return w
        }), n.d(t, "positive", function() {
            return M
        }), n.d(t, "isNumeric", function() {
            return k
        }), n.d(t, "winToUtf", function() {
            return T
        }), n.d(t, "replaceEntities", function() {
            return C
        }), n.d(t, "clean", function() {
            return P
        }), n.d(t, "unclean", function() {
            return D
        }), n.d(t, "each", function() {
            return x
        }), n.d(t, "indexOf", function() {
            return A
        }), n.d(t, "inArray", function() {
            return I
        }), n.d(t, "clone", function() {
            return L
        }), n.d(t, "arrayKeyDiff", function() {
            return S
        }), n.d(t, "extend", function() {
            return R
        }), n.d(t, "addTemplates", function() {
            return B
        }), n.d(t, "getTemplate", function() {
            return U
        }), n.d(t, "serializeForm", function() {
            return N
        }), n.d(t, "extractUrls", function() {
            return W
        }), n.d(t, "isRetina", function() {
            return K
        }), n.d(t, "getCaretCharacterOffsetWithin", function() {
            return F
        }), n.d(t, "formatCount", function() {
            return H
        }), n.d(t, "encodeHtml", function() {
            return z
        }), n.d(t, "decodeHtml", function() {
            return V
        }), n.d(t, "initUtilsCommon", function() {
            return Y
        });
        var r = n(230),
            o = n(164),
            i = n(191),
            a = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
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

        function u(e, t) {
            return setTimeout(c(e), t)
        }
        var d = function(e, t) {
                return Math.random() * (t - e + 1) + e
            },
            _ = function(e, t) {
                return Math.floor(d(e, t))
            },
            l = function(e) {
                return void 0 === e
            },
            f = function(e) {
                return e && "[object Function]" === Object.prototype.toString.call(e)
            },
            m = function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            },
            b = function(e) {
                return "string" == typeof e
            },
            p = function(e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            };

        function h(e) {
            if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }
        var g = function() {
                return +new Date
            },
            v = function() {
                return window.Image ? new Image : Object(r.ce)("img")
            },
            O = function(e) {
                return (e || "").replace(/^\s+|\s+$/g, "")
            },
            E = function(e) {
                return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
            },
            y = function(e) {
                return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
            };

        function j(e) {
            return !0 === e ? 1 : parseInt(e) || 0
        }

        function w(e) {
            return !0 === e ? 1 : parseFloat(e) || 0
        }

        function M(e) {
            return (e = j(e)) < 0 ? 0 : e
        }

        function k(e) {
            return !isNaN(e)
        }

        function T(e) {
            return e.replace(/&#(\d\d+);/g, function(e, t) {
                return (t = j(t)) >= 32 ? String.fromCharCode(t) : e
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function C() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            return Object(r.se)("<textarea>" + e + "</textarea>").value
        }

        function P(e) {
            return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function D(e) {
            return C(e.replace(/\t/g, "\n"))
        }

        function x(e, t) {
            if (p(e) || void 0 === e.length) {
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n) && !1 === t.call(e[n], n, e[n])) break
            } else
                for (var r = 0, o = e.length; r < o; r++) {
                    var i = e[r];
                    if (!1 === t.call(i, r, i)) break
                }
            return e
        }

        function A(e, t, n) {
            for (var r = n || 0, o = (e || []).length; r < o; r++)
                if (e[r] == t) return r;
            return -1
        }

        function I(e, t) {
            return -1 !== A(t, e)
        }

        function L(e, t) {
            var n = p(e) || void 0 === e.length ? {} : [];
            for (var r in e)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (t && "object" === s(e[r]) && "prototype" !== r && null !== e[r] ? n[r] = L(e[r]) : n[r] = e[r]);
            return n
        }

        function S(e) {
            var t = {},
                n = arguments.length,
                r = arguments;
            for (var o in e)
                if (e.hasOwnProperty(o)) {
                    for (var i = !1, a = 1; a < n; a++) r[a][o] && r[a][o] === e[o] && (i = !0);
                    i || (t[o] = e[o])
                }
            return t
        }

        function R() {
            var e = arguments,
                t = e.length,
                n = e[0] || {},
                r = 1,
                o = !1;
            for ("boolean" == typeof n && (o = n, n = e[1] || {}, r = 2), "object" === (void 0 === n ? "undefined" : s(n)) || f(n) || (n = {}); r < t; r++) {
                var i = e[r];
                if (null != i)
                    for (var a in i)
                        if (i.hasOwnProperty(a)) {
                            var c = n[a],
                                u = i[a];
                            n !== u && (o && u && "object" === (void 0 === u ? "undefined" : s(u)) && !u.nodeType ? n[a] = R(o, c || (null != u.length ? [] : {}), u) : void 0 !== u && (n[a] = u))
                        }
            }
            return n
        }

        function B(e) {
            window.templates = window.templates || {}, R(window.templates, e)
        }

        function U(e, t) {
            var n = (window.templates = window.templates || {})[e];
            return "function" == typeof n && (n = n()), n && t ? Object(r.rs)(n, t) : n || ""
        }

        function N(e) {
            if ("object" !== (void 0 === e ? "undefined" : s(e))) return !1;
            var t = {},
                n = function(t) {
                    return Object(r.geByTag)(t, e)
                },
                o = function(n, o) {
                    if (o.name)
                        if ("text" !== o.type && o.type)
                            if (o.getAttribute("bool")) {
                                var a = Object(r.val)(o);
                                if (!a || "0" === a) return;
                                t[o.name] = 1
                            } else t[o.name] = i.browser.msie && !o.value && e[o.name] ? e[o.name].value : o.value;
                    else t[o.name] = Object(r.val)(o)
                };
            return x(n("input"), function(e, t) {
                if ("radio" !== t.type && "checkbox" !== t.type || t.checked) return o(0, t)
            }), x(n("select"), o), x(n("textarea"), o), t
        }

        function W(e, t) {
            for (var n = t ? /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i : /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i, r = void 0, o = []; e && (r = e.match(n));) {
                e = e.substr(r.index + r[0].length);
                var i = 0;
                r[4] || (i = 7), o.push({
                    url: r[2 + i],
                    query: r[5 + i] || "",
                    domain: r[4 + i]
                })
            }
            return o
        }
        var K = function() {
            return window.devicePixelRatio >= 2
        };

        function F(e) {
            var t = 0,
                n = 0,
                r = e.ownerDocument || e.document,
                o = r.defaultView || r.parentWindow;
            if (o.getSelection().rangeCount > 0) {
                var i = o.getSelection().getRangeAt(0),
                    a = i.cloneRange();
                a.selectNodeContents(e), a.setEnd(i.startContainer, i.startOffset), t = a.toString().length, a.setEnd(i.endContainer, i.endOffset), n = a.toString().length
            }
            return [t, n]
        }

        function H(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = t.kLimit || 1e3;
            return e >= (t.mLimit || 1e6) && !t.noCheck ? H(e = (e = j(e / 1e5)) > 1e3 ? j(e / 10) : e / 10, R(t, {
                noCheck: !0
            }), !0) + "M" : e >= n && !t.noCheck ? H(e = (e = j(e / 100)) > 100 ? j(e / 10) : e / 10, R(t, {
                noCheck: !0
            }), !0) + "K" : Object(o.langNumeric)(e, "%s", !0).replace(/,/g, ".")
        }
        var q, G = a((q = null, [function(e) {
                return q || (q = Object(r.se)("<span> </span>")), q.innerText = e, q.innerHTML
            }, function(e) {
                return q || (q = Object(r.se)("<span> </span>")), q.innerHTML = e.replace(/<br\s*\/?>/gim, "\n"), q.innerText
            }]), 2),
            z = G[0],
            V = G[1];

        function Y() {
            window.PageID = window.PageID || 1
        }
    },
    244: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "curBox", function() {
            return u
        }), n.d(t, "initBoxQueue", function() {
            return d
        }), n.d(t, "boxRefreshCoords", function() {
            return _
        }), n.d(t, "showDoneBox", function() {
            return l
        }), n.d(t, "getBoxQueue", function() {
            return f
        });
        var r = n(288),
            o = n(240),
            i = n(230),
            a = n(126),
            s = n(191),
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
                    if (t && "click" === t.type) return Object(r.cancelEvent)(t)
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
                n = s.browser.mobile ? Object(o.intval)(window.pageYOffset) : 0,
                r = Object(i.getSize)(e);
            e.style.marginTop = Math.max(10, n + (t - r[1]) / 3) + "px"
        }

        function l(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = (t.w || 380) + 20,
                c = t.w ? ' style="width: ' + t.w + 'px;"' : "",
                u = bodyNode.offsetWidth,
                d = Object(i.ce)("div", {
                    className: "top_result_baloon_wrap fixed " + (t.className || ""),
                    innerHTML: '<div class="top_result_baloon"' + c + ">" + e + "</div>"
                }, {
                    left: (u - n) / 2
                });
            t.parentEl ? Object(i.geByClass1)(t.parentEl).appendChild(d) : bodyNode.insertBefore(d, pageNode);
            var _ = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
                l = s.browser.mobile ? Object(o.intval)(window.pageYOffset) : 0,
                f = Object(i.getSize)(d);
            d.style.top = Math.max(10, l + (_ - f[1]) / 3) + "px";
            var m = t.out || 2e3,
                b = new Date,
                p = function e() {
                    m < 0 || (window.doneBoxTO = setTimeout(function() {
                        !t.permit || t.permit() ? Object(a.fadeOut)(d.firstChild, 500, function() {
                            Object(i.re)(d), t.callback && t.callback()
                        }) : e()
                    }, m))
                };
            return Object(r.addEvent)(d, "mouseenter", function() {
                clearTimeout(window.doneBoxTO), m -= new Date - b
            }), Object(r.addEvent)(d, "mouseleave", function() {
                b = new Date, p()
            }), p(), d
        }

        function f() {
            return c
        }
    },
    25: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "createMutations", function() {
            return c
        }), n.d(t, "createModule", function() {
            return u
        }), n.d(t, "destroyModule", function() {
            return d
        });
        var r = n(160);

        function o(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        var i = window,
            a = i.addEvent,
            s = i.removeEvent;

        function c(e) {
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

        function u(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(function(e, t, n, r) {
                a(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
            }.bind(null, t), function(e, t, n, o, i) {
                Object(r.addDelegateEvent)(t, n, o, i), e._registeredHandlers.push(["delegate", t, n, o, i])
            }.bind(null, t)), t
        }

        function d(e) {
            e._registeredHandlers.forEach(function(e) {
                var t = e.slice(1);
                "delegate" === e[0] ? r.removeDelegateEvent.apply(void 0, o(t)) : s.apply(void 0, o(t))
            }), e._registeredHandlers = []
        }
    },
    257: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "SENDING_CLASS", function() {
            return y
        }), n.d(t, "FAILED_CLASS", function() {
            return j
        }), n.d(t, "ORIGINAL_CLASS", function() {
            return w
        }), n.d(t, "RESTORE_CLASS", function() {
            return M
        }), n.d(t, "TYPING_CLASS", function() {
            return k
        }), n.d(t, "CREATE_CHAT_ACTION", function() {
            return T
        }), n.d(t, "CHAT_TITLE_ACTION", function() {
            return C
        }), n.d(t, "CHAT_INVITE_USER", function() {
            return P
        }), n.d(t, "CHAT_KICK_USER", function() {
            return D
        }), n.d(t, "CHAT_PHOTO_UPDATE", function() {
            return x
        }), n.d(t, "CHAT_PHOTO_REMOVE", function() {
            return A
        }), n.d(t, "CHAT_PIN_MESSAGE", function() {
            return I
        }), n.d(t, "CHAT_UNPIN_MESSAGE", function() {
            return L
        }), n.d(t, "CHAT_INVITE_BY_LINK", function() {
            return S
        }), n.d(t, "DESELECT_ALL_CLASS", function() {
            return R
        }), n.d(t, "HIDE_TOP_NOTICE_CLASS", function() {
            return B
        }), n.d(t, "HIDE_ASIDE_NOTICE_CLASS", function() {
            return U
        }), n.d(t, "HIDE_ASIDE_PROMO_BLOCK_CLASS", function() {
            return N
        }), n.d(t, "INSTALL_VKADMIN_LINK", function() {
            return W
        }), n.d(t, "CLEAR_RECENT_CLASS", function() {
            return K
        }), n.d(t, "TOGGLE_MR_TAB", function() {
            return F
        }), n.d(t, "MESSAGE_SEARCH_CLASS", function() {
            return H
        }), n.d(t, "PINNED_CONTAINER_CLASS", function() {
            return q
        }), n.d(t, "getClassicChatHeight", function() {
            return ze
        }), n.d(t, "setClassicChatHeight", function() {
            return Ve
        }), n.d(t, "fixTableCellChildHeight", function() {
            return Ye
        }), n.d(t, "applyInnerHtml", function() {
            return Qe
        }), n.d(t, "compensateHistoryHeightChange", function() {
            return Xe
        }), n.d(t, "renderSticker", function() {
            return $e
        }), n.d(t, "isAlreadyDeleted", function() {
            return Ze
        }), n.d(t, "replaceMessageAttrs", function() {
            return Je
        }), n.d(t, "isVoiceMessageAvailable", function() {
            return et
        }), n.d(t, "getAvailableMicrophones", function() {
            return tt
        }), n.d(t, "renderAttach", function() {
            return nt
        }), n.d(t, "dayFromVal", function() {
            return rt
        }), n.d(t, "showInvisibleBar", function() {
            return ot
        }), n.d(t, "updateMessageInCache", function() {
            return it
        }), n.d(t, "editAndReplaceMessage", function() {
            return at
        }), n.d(t, "renderMessage", function() {
            return st
        }), n.d(t, "renderMessageMedia", function() {
            return ct
        }), n.d(t, "ensureDomHasActions", function() {
            return ut
        }), n.d(t, "renderCallMessage", function() {
            return dt
        }), n.d(t, "appendToHistory", function() {
            return _t
        }), n.d(t, "restoreQueue", function() {
            return lt
        }), n.d(t, "markMessagesAsRead", function() {
            return ft
        }), n.d(t, "replaceAttaches", function() {
            return mt
        }), n.d(t, "isDuplicate", function() {
            return bt
        }), n.d(t, "isContactPeer", function() {
            return pt
        }), n.d(t, "isPeerActive", function() {
            return ht
        }), n.d(t, "isFvkcomgroup", function() {
            return gt
        }), n.d(t, "isTabLoaded", function() {
            return vt
        }), n.d(t, "isTabLoadedWithMessage", function() {
            return Ot
        }), n.d(t, "parseMessage", function() {
            return wt
        }), n.d(t, "convertPeerToUrl", function() {
            return Mt
        }), n.d(t, "unUrlPeer", function() {
            return kt
        }), n.d(t, "simplifyCounter", function() {
            return Tt
        }), n.d(t, "chatActions", function() {
            return Ct
        }), n.d(t, "renderPhotos", function() {
            return xt
        }), n.d(t, "renderPhotosFromTab", function() {
            return At
        }), n.d(t, "renderBtnSearchOnlyMessages", function() {
            return It
        }), n.d(t, "renderMessagesSep", function() {
            return Lt
        }), n.d(t, "renderConversationsSep", function() {
            return St
        }), n.d(t, "renderPopularSuggSep", function() {
            return Rt
        }), n.d(t, "renderClearRecent", function() {
            return Bt
        }), n.d(t, "renderPopularSuggestions", function() {
            return Ut
        }), n.d(t, "setMessageError", function() {
            return Nt
        }), n.d(t, "startResendMessage", function() {
            return Wt
        }), n.d(t, "removeMessages", function() {
            return Kt
        }), n.d(t, "removeStartingFromMessage", function() {
            return Ht
        }), n.d(t, "removeMessagesWithRestore", function() {
            return qt
        }), n.d(t, "restoreMessage", function() {
            return Gt
        }), n.d(t, "formatTyper", function() {
            return zt
        }), n.d(t, "loadSummaryActivityType", function() {
            return Vt
        }), n.d(t, "renderEmptySearch", function() {
            return Qt
        }), n.d(t, "serviceLink", function() {
            return Xt
        }), n.d(t, "renderServiceMsg", function() {
            return $t
        }), n.d(t, "addChatPhotoToUpdate", function() {
            return Zt
        }), n.d(t, "replaceSpecialSymbols", function() {
            return Jt
        }), n.d(t, "isSelfMessage", function() {
            return en
        }), n.d(t, "showVerifiedTooltip", function() {
            return tn
        }), n.d(t, "wrapLoading", function() {
            return nn
        }), n.d(t, "tabFromIds", function() {
            return rn
        }), n.d(t, "checkSelectClick", function() {
            return on
        }), n.d(t, "renderGoTo", function() {
            return an
        }), n.d(t, "showFlushChat", function() {
            return sn
        }), n.d(t, "showLeaveDialog", function() {
            return cn
        }), n.d(t, "showUnpinDialog", function() {
            return un
        }), n.d(t, "showMsgDeleteDialog", function() {
            return dn
        }), n.d(t, "cleanHistory", function() {
            return _n
        }), n.d(t, "inviteUser", function() {
            return ln
        }), n.d(t, "toggleMessageRequestsTab", function() {
            return fn
        }), n.d(t, "showUnreadOnly", function() {
            return mn
        }), n.d(t, "changeTab", function() {
            return bn
        }), n.d(t, "isImportant", function() {
            return pn
        }), n.d(t, "isUnrespond", function() {
            return hn
        }), n.d(t, "isPeerBlocked", function() {
            return gn
        }), n.d(t, "isPendingForward", function() {
            return vn
        }), n.d(t, "isPeerBlockedByMe", function() {
            return On
        }), n.d(t, "blockLatencyCompensation", function() {
            return En
        }), n.d(t, "showSpamLayer", function() {
            return yn
        }), n.d(t, "getLastSeenTextInHeader", function() {
            return jn
        }), n.d(t, "getLastSeenText", function() {
            return wn
        }), n.d(t, "showBlacklistBoxUser", function() {
            return kn
        }), n.d(t, "showBlacklistBox", function() {
            return Tn
        }), n.d(t, "getBaseLink", function() {
            return Cn
        }), n.d(t, "showFavvedBox", function() {
            return Pn
        }), n.d(t, "isEditableFocused", function() {
            return Dn
        }), n.d(t, "updateStar", function() {
            return xn
        }), n.d(t, "removewNewUnreadBarAndMerge", function() {
            return An
        }), n.d(t, "isMessagesVisible", function() {
            return In
        }), n.d(t, "hideTopNotice", function() {
            return Ln
        }), n.d(t, "hideAsideNotice", function() {
            return Sn
        }), n.d(t, "hideAsidePromoBlock", function() {
            return Rn
        }), n.d(t, "installVKAdminApp", function() {
            return Bn
        }), n.d(t, "renderShortText", function() {
            return Un
        }), n.d(t, "attachToText", function() {
            return Nn
        }), n.d(t, "lockButton", function() {
            return Wn
        }), n.d(t, "unlockButton", function() {
            return Kn
        }), n.d(t, "renderPinnedMessage", function() {
            return Fn
        }), n.d(t, "renderPinnedMedia", function() {
            return Hn
        }), n.d(t, "showMessageInfoTooltip", function() {
            return qn
        }), n.d(t, "showEditTimeTooltip", function() {
            return Gn
        }), n.d(t, "getPinnedMessageHeight", function() {
            return zn
        }), n.d(t, "boxHandleMessagesLabelsTooltips", function() {
            return Vn
        }), n.d(t, "showPinnedBox", function() {
            return Yn
        }), n.d(t, "showRepliedBox", function() {
            return Qn
        }), n.d(t, "isUserAliveInChat", function() {
            return Xn
        }), n.d(t, "getAliveMembersCount", function() {
            return $n
        }), n.d(t, "normalizeTab", function() {
            return Zn
        }), n.d(t, "normalizeTabsGotFromServer", function() {
            return Jn
        }), n.d(t, "splitMessageToParts", function() {
            return er
        }), n.d(t, "isMessageTooLong", function() {
            return tr
        }), n.d(t, "showInvitationBox", function() {
            return nr
        }), n.d(t, "showWaitUntilUploadedBox", function() {
            return rr
        }), n.d(t, "canMessageBeDeletedForAll", function() {
            return or
        }), n.d(t, "getTopChatMembers", function() {
            return ir
        }), n.d(t, "getChatMembersByIds", function() {
            return ar
        }), n.d(t, "getChatMembers", function() {
            return sr
        }), n.d(t, "formatTimespan", function() {
            return cr
        }), n.d(t, "focusOnMessage", function() {
            return ur
        }), n.d(t, "getNowEditingMessage", function() {
            return dr
        });
        var r = n(148),
            o = n(222),
            i = n(114),
            a = n(177);
        n.d(t, "getFirstUnread", function() {
            return a.getFirstUnread
        }), n.d(t, "isSearchShown", function() {
            return a.isSearchShown
        }), n.d(t, "getPeer", function() {
            return a.getPeer
        }), n.d(t, "getCurrentKeyboard", function() {
            return a.getCurrentKeyboard
        }), n.d(t, "getKeyboard", function() {
            return a.getKeyboard
        }), n.d(t, "getTab", function() {
            return a.getTab
        }), n.d(t, "getCurrentTab", function() {
            return a.getCurrentTab
        }), n.d(t, "getSelectedMessages", function() {
            return a.getSelectedMessages
        }), n.d(t, "getMessageRangeFromSelection", function() {
            return a.getMessageRangeFromSelection
        }), n.d(t, "countUnread", function() {
            return a.countUnread
        }), n.d(t, "getMessageByRid", function() {
            return a.getMessageByRid
        }), n.d(t, "isRidExist", function() {
            return a.isRidExist
        }), n.d(t, "getLocalId", function() {
            return a.getLocalId
        }), n.d(t, "getLastMessage", function() {
            return a.getLastMessage
        }), n.d(t, "parserMessage", function() {
            return a.parserMessage
        }), n.d(t, "getAuthorFullName", function() {
            return a.getAuthorFullName
        }), n.d(t, "getMessage", function() {
            return a.getMessage
        }), n.d(t, "getPreviousMessage", function() {
            return a.getPreviousMessage
        }), n.d(t, "isClassicInterface", function() {
            return a.isClassicInterface
        }), n.d(t, "isLocksAvailable", function() {
            return a.isLocksAvailable
        }), n.d(t, "isFoldersAvailable", function() {
            return a.isFoldersAvailable
        }), n.d(t, "isCommunityInterface", function() {
            return a.isCommunityInterface
        }), n.d(t, "isChannel", function() {
            return a.isChannel
        }), n.d(t, "getBareTab", function() {
            return a.getBareTab
        }), n.d(t, "isReversedDialogs", function() {
            return a.isReversedDialogs
        }), n.d(t, "isFullyLoadedTab", function() {
            return a.isFullyLoadedTab
        }), n.d(t, "makeTabNotFullyLoaded", function() {
            return a.makeTabNotFullyLoaded
        }), n.d(t, "isGoToEndVisible", function() {
            return a.isGoToEndVisible
        }), n.d(t, "getUnreadScrollBottom", function() {
            return a.getUnreadScrollBottom
        }), n.d(t, "isSendingAvailable", function() {
            return a.isSendingAvailable
        }), n.d(t, "isCommunityPeer", function() {
            return a.isCommunityPeer
        }), n.d(t, "isCommunityBlocked", function() {
            return a.isCommunityBlocked
        }), n.d(t, "checkVoiceMessageAvailable", function() {
            return a.checkVoiceMessageAvailable
        }), n.d(t, "isSearching", function() {
            return a.isSearching
        }), n.d(t, "getSearchText", function() {
            return a.getSearchText
        }), n.d(t, "isSearchingValue", function() {
            return a.isSearchingValue
        }), n.d(t, "isRecentSearchesActive", function() {
            return a.isRecentSearchesActive
        }), n.d(t, "getPinnedMessage", function() {
            return a.getPinnedMessage
        }), n.d(t, "doPopularSuggExist", function() {
            return a.doPopularSuggExist
        }), n.d(t, "isAnyMessageBeingEdited", function() {
            return a.isAnyMessageBeingEdited
        }), n.d(t, "getGroupId", function() {
            return a.getGroupId
        }), n.d(t, "getTabDraft", function() {
            return a.getTabDraft
        }), n.d(t, "getTemplates", function() {
            return a.getTemplates
        }), n.d(t, "tabIsMessageRequest", function() {
            return a.tabIsMessageRequest
        }), n.d(t, "tabIsOutgoingMessageRequest", function() {
            return a.tabIsOutgoingMessageRequest
        });
        var s = n(120),
            c = n(130),
            u = n(289);
        n.d(t, "isChatPeer", function() {
            return u.isChatPeer
        }), n.d(t, "isUserPeer", function() {
            return u.isUserPeer
        }), n.d(t, "isReservedPeer", function() {
            return u.isReservedPeer
        });
        var d = n(44),
            _ = n(159),
            l = n(197),
            f = n(212),
            m = n(8),
            b = n(336),
            p = n(162),
            h = n(173),
            g = n(240),
            v = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            O = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };

        function E(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var y = "_im_mess_sending",
            j = "_im_mess_failed",
            w = "_im_mess_original",
            M = "_im_mess_restore",
            k = "_im_typing",
            T = "chat_create",
            C = "chat_title_update",
            P = "chat_invite_user",
            D = "chat_kick_user",
            x = "chat_photo_update",
            A = "chat_photo_remove",
            I = "chat_pin_message",
            L = "chat_unpin_message",
            S = "chat_invite_user_by_link",
            R = "_im_deselect_all",
            B = "_im_top_notice_hide",
            U = "_im_aside_notice_hide",
            N = "_im_aside_promo_block_hide",
            W = "_im_vkadmin_promo_link",
            K = "_im_clear_recent",
            F = "_im_toggle_mr_tab",
            H = "_im_mess_search",
            q = "_im_pinned",
            G = window,
            z = G.vk,
            V = G.ls,
            Y = G.se,
            Q = G.re,
            X = G.rs,
            $ = G.sech,
            Z = G.inArray,
            J = G.intval,
            ee = G.trim,
            te = G.stripHTML,
            ne = G.domFC,
            re = G.domPS,
            oe = G.domLC,
            ie = G.domChildren,
            ae = G.domClosestSibling,
            se = G.domData,
            ce = G.geByClass,
            ue = G.geByClass1,
            de = G.gpeByClass,
            _e = G.addClass,
            le = G.removeClass,
            fe = G.toggleClass,
            me = G.hasClass,
            be = G.attr,
            pe = G.setStyle,
            he = G.val,
            ge = G.getTemplate,
            ve = G.getLang,
            Oe = G.langSex,
            Ee = G.langDate,
            ye = G.langNumeric,
            je = G.getDateText,
            we = G.getSmDate,
            Me = G.getShortDate,
            ke = G.isSameDate,
            Te = G.isToday,
            Ce = G.ajax,
            Pe = G.showBox,
            De = G.showFastBox,
            xe = G.showTabbedBox,
            Ae = G.showTooltip,
            Ie = G.mobPlatforms,
            Le = G.onlinePlatformClass,
            Se = G.AudioMessagePlayer,
            Re = G.Emoji,
            Be = G.slideUp,
            Ue = G.fadeOut,
            Ne = G.cancelEvent,
            We = G.fifaReplaceText,
            Ke = 4096,
            Fe = 100,
            He = 8,
            qe = 52,
            Ge = "chatPosition";

        function ze() {
            return V.get(Ge) || 0
        }

        function Ve(e) {
            e >= window.clientHeight() - 30 && (e = 0), V.set(Ge, e)
        }

        function Ye(e, t) {
            var n = ue(e, t);
            n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight && pe(n.firstElementChild, {
                height: n.parentNode.offsetHeight
            })
        }

        function Qe(e, t) {
            e && e.innerHTML !== t && (e.innerHTML = t)
        }

        function Xe(e, t, n, r) {
            var o = t && !n ? 1 : !t && n ? -1 : 0;
            o && !Object(a.isClassicInterface)(e) && r().compensateHistoryHeightChange(o)
        }

        function $e(e, t, n, r) {
            var o = window.devicePixelRatio >= 2 ? "256" : "128",
                i = "animation" === n,
                a = "im_gift";
            i && (a += " sticker_img");
            var s = '<img height="128" class="' + a + '" src="' + Stickers.getStickerUrl(J(e), o) + '"/>';
            if (i) {
                var c = "animatedSticker" + r;
                s = '<div id="' + c + '" data-loop-count=3 data-animation-path="' + ("/stickers.php?act=proxy_animation&product_id=" + t + "&sticker_id=" + e) + '" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="' + r + '" data-sticker-id="' + J(e) + '" class="sticker_animation sticker_animation_128 im_gift">' + s + "</div>";
                var u = !1;
                browser.msie ? (0 ^ r) === r && (u = !0) : u = Number.isInteger(r), u && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(c, 10)
            }
            return t && (s = '<a onmouseover="return Emoji.stickerOver(' + J(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + J(t) + ', this, event);">' + s + "</a>"), s = '<div class="im_sticker_row">' + s + "</div>"
        }

        function Ze(e, t, n) {
            var r = e.get ? e.get() : e;
            if (vt(r, t)) {
                var o = r.tabs[t].deleted || [];
                return Z(n, o)
            }
            return !1
        }

        function Je(e, t, n) {
            var r = n.randomId,
                o = ue("_im_mess_rid" + r, t);
            return o && (t = _t(e, n, t = Ft([o], t), !0, !1)), t
        }

        function et(e) {
            var t = Object(a.checkVoiceMessageAvailable)(e);
            return browser.mobile && browser.safari ? Promise.resolve(!1) : void 0 !== t ? Promise.resolve(t) : tt().then(function(e) {
                return e.length > 0
            }).catch(function(e) {
                return !1
            })
        }

        function tt() {
            return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
                for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
                return t
            }) : Promise.reject(new Error("NotSupported"))
        }

        function nt(e) {
            return ge("im_preloader", {
                preloader: X(z.pr_tpl, {
                    id: ""
                }),
                cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
            })
        }

        function rt(e) {
            var t = e.split(".");
            return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
        }

        function ot(e) {
            var t = ue("_im_invisible_bar", e);
            t && (le(t, "_im_invisible_bar"), le(t, "im-page--history-new-bar_hide"))
        }

        function it(e, t, n) {
            var r = se(n, "msgid"),
                o = ue("_im_mess_" + r, t),
                i = n.cloneNode(!0);
            return o && (o.parentNode.replaceChild(i, o), ut(t)), t
        }

        function at(e, t, n) {
            var r = st(e, t),
                o = ue("_im_mess_" + t.messageId, n);
            return o && (o.parentNode.replaceChild(Y(r), o), ut(n)), n
        }

        function st(e, t) {
            var n = ["_im_mess"],
                r = Object(s.isUnread)(e.tabs[t.peerId], t),
                o = Object(s.hasReply)(t) ? ge("im_message_media", {
                    type: "reply",
                    messageId: t.messageId,
                    attaches: nt("reply"),
                    text: ""
                }) : "";
            Object(s.isOut)(t) && r && n.push("im-mess_unread _im_mess_unread"), Object(s.isOut)(t) && n.push("im-mess_out"), Object(s.wasEdited)(t) && n.push("im-mess_was_edited"), Object(m.canMessageBeEdited)(e, t) && n.push("im-mess_editable"), Object(s.isImportant)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
            var i = Date.now() - 1e3 * t.date > 1e3;
            t.local && i && n.push("im-mess_sending"), t.local && n.push("" + y), t.local && Object(s.wasEdited)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push("im-mess_failed " + j), Object(s.isGift)(t) && n.push("im-mess_gift");
            var d = ct(t),
                l = function(e, t) {
                    var n = "",
                        r = Object(_.unpackStore)(e).sourceEnabled && t.kludges && t.kludges.from_widget && t.kludges.ref_source;
                    Object(s.wasEdited)(t) && (n += ge("sImLblWasEdited", {
                        update_time: t.update_time
                    }));
                    if (Object(a.isCommunityInterface)(e) && r) {
                        var o = t.kludges.ref_source,
                            i = {};
                        try {
                            (i = JSON.parse(Object(g.unclean)(o))).link && i.info && (i.link = Object(c.replaceHyperLinks)(Object(g.clean)(i.link), c.linksReplacer.bind(null, !1)), i = Object(g.clean)(langStr(ve("mail_source_info"), "link", i.link, "info", Object(g.clean)(i.info))), n += ge("sImLblWasSourceInfo", {
                                source: i
                            }))
                        } catch (e) {}
                    }
                    return n
                }(e, t),
                f = o + wt(e, t.text, t.kludges, !1, t.peerId);
            "" != f && (f += l), t.subject && "..." !== t.subject.trim() && !Object(u.isChatPeer)(t.peerId) && (f = ge("im_topic", {
                topic: t.subject
            }) + f);
            var b = ge("im_message_media", {
                type: "media",
                messageId: t.messageId,
                attaches: d.join(""),
                text: Object(s.isGift)(t) ? '<div class="im-mess--gift-lbl">' + f + "</div>" : ""
            });
            return Object(s.isGift)(t) || (b = f + b), "" == f && (b += l), ge("im_msg_row", {
                msg_id: t.messageId,
                from_id: t.peerId,
                aria_hidden: t.local && !t.failed ? "true" : "false",
                ts: t.date,
                marker_params: t.failed ? 'aria-label="' + ve("mail_send_message_error") + '" role="link"' : "",
                unread_params: r ? 'aria-label="' + ve("mail_unread_message") + '"' : "",
                cls: n.join(" ")
            }).replace("%text%", function() {
                return b
            })
        }

        function ct(e) {
            return e.attaches.reduce(function(t, n) {
                return !Object(s.hasReply)(e) || "mail" !== n.type && "reply" !== n.type ? ("sticker" === n.type ? e.messageId ? t.push($e(n.id, n.productId, n.kind, e.messageId)) : t.push($e(n.id, n.productId)) : t.push(nt(n.type)), t) : t
            }, [])
        }

        function ut(e) {
            for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) me(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", ge("sImHistoryRowActions")), le(t[n], "_im_mess_noa")
        }

        function dt(e, t, n) {
            var r, o, i, a, s, c = z.id,
                u = e.attaches[0],
                d = u.initiatorId,
                _ = u.state,
                f = u.receiverId,
                m = void 0;
            switch (_) {
                case "reached":
                    m = ve(c === d ? "mail_call_outgoing" : "mail_call_incoming");
                    var b = t ? "" : (r = u.duration, o = Math.floor(r / 3600), i = Math.floor(r / 60) - 60 * o, a = !1, s = !1, [o, i, r - 3600 * o - 60 * i].reduce(function(e, t) {
                        return 0 !== t || s ? (a && (t = t < 10 ? "0" + t : t), a = !0, s = !0, e + ("" !== e ? ":" : "") + t) : (s = !0, e)
                    }, ""));
                    m = m.replace("{duration}", b);
                    break;
                case "canceled_by_initiator":
                    m = ve(c === d ? "mail_call_canceled" : "mail_call_missed");
                    break;
                case "canceled_by_receiver":
                    if (c === d) {
                        if (t) return ve("mail_call_declined");
                        var p = Object(l.oCacheGet)(n, f);
                        return p ? Oe(p.sex, ve("mail_call_declined_by", "raw")).replace("{user_name}", p.first_name) : ve("mail_call_declined")
                    }
                    return ve("mail_call_canceled");
                default:
                    m = ve("mail_added_call")
            }
            return ge("im_calls_link", {
                text: m
            })
        }

        function _t(e, t, n) {
            !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            var r = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                o = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
                i = Date.now() - 1e3 * t.date > 1e3,
                c = e.tabs[t.peerId];
            if (!n || ue("_im_mess", n) || ue("_im_bar_date", n) || (n.innerHTML = ""), c.skipped > 0) return n;
            var d = [];
            t.local || (d = e.imQueue(t.peerId, r)), d.length > 0 && Ft(d.map(function(e) {
                return ue("_im_mess_rid" + e.rid, n)
            }, n).filter(function(e) {
                return e
            }));
            var f = st(e, t),
                m = oe(n);
            me(m, "_im_mess_stack") || (m = ae(m, "._im_mess_stack", -1));
            for (var b = Object(a.getLastMessage)(e, t.peerId, t.messageId); t.peerId === e.peer && b && !ue("_im_mess_" + b.messageId);) b = Object(a.getLastMessage)(e, t.peerId, b.messageId);
            var p = ue("_im_unread_bar_row", n),
                h = Object(s.getUserId)(t),
                g = b ? Et(b.date, e) : 0;
            if (!b || yt(c, b, t, e, o)) {
                var v = "",
                    O = !1;
                if (p && Object(s.isOut)(t) && An(e, n, t.peerId), 1 === c.unread && !Object(s.isOut)(t) && o && (v += ge("im_mess_bar", {}), O = !0, An(e, n, t.peerId)), !Te(new Date(g))) {
                    var E = new Date,
                        j = O ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                    v += ge("im_day_bar", {
                        day: Me(t.date, e.timeshift, !0, ve("months_of", "raw"), !0),
                        date: t.date,
                        day_class: E.getDate() + E.getMonth() + E.getFullYear() + " " + j
                    })
                }
                if (Object(s.isServiceMsg)(t)) v += ge("im_service_row", {
                    text: $t(e, t, c),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else if (Object(s.isCallMessage)(t)) v += ge("im_service_row", {
                    text: Xt("", dt(t, !1, e), ""),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else {
                    var w = e.gid && Object(s.isOut)(t) ? J(t.kludges.from_admin) || -e.gid : 0,
                        M = Object(l.oCacheGet)(e, w ? -e.gid : h) || c,
                        k = Object(u.isChatPeer)(t.peerId) ? M.name : M.first_name,
                        T = M.link || c.href,
                        C = ge("im_mess_stack_name", {
                            name: k,
                            link: T,
                            class: Object(s.isMoney)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                        });
                    if (Object(s.isGift)(t)) {
                        var P = ve("mail_gift_message_sent", "raw");
                        C += ' <span class="im-mess-stack--gift">' + Oe(M.sex || 0, P) + "</span>"
                    }
                    if (Object(s.isMoney)(t)) {
                        var D = Object(s.isMoneyRequest)(t) ? ve("mail_money_request_message_sent", "raw") : ve("mail_money_tranfer_message_sent", "raw");
                        C += ' <span class="im-mess-stack--money-transfer">' + Oe(M.sex || 0, D) + "</span>"
                    }
                    var x = e.gid ? "/gim" + e.gid : "/im",
                        A = void 0;
                    if (A = t.local ? jt(t.date, e.timeshift) : ge("im_stack_date", {
                            date: jt(t.date, e.timeshift),
                            link: x + "?sel=" + t.peerId + "&msgid=" + t.messageId
                        }), w && e.admins[w]) {
                        var I = e.admins[w],
                            L = w === z.id ? ve("mail_by_you") : I[0];
                        A = A + " " + ge("im_admin_link", {
                            name: L,
                            href: I[1]
                        })
                    }
                    v += ge("im_mess_stack", {
                        photo: M.photo,
                        href: T,
                        cls: "",
                        date_attr: "",
                        link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                        name: te(C),
                        stack_name: C,
                        peerId: h,
                        date: A,
                        messages: f,
                        admin: t.kludges.from_admin || 0
                    })
                }
                Object(_.toArray)($(v)).forEach(function(e) {
                    return n && n.appendChild(e)
                })
            } else p && e.peer === t.peerId && !c.inplaceSearch && Object(s.isOut)(t) && An(e, n, t.peerId), ue("_im_stack_messages", m).appendChild(Y(f));
            return Object(s.isOut)(t) && !i && setTimeout(function() {
                var e = ue("_im_mess_" + t.messageId, n);
                me(e, y) && _e(e, "im-mess_sending")
            }, 500), d = d.filter(function(e) {
                return e.rid !== t.randomId
            }), ut(n), lt(d, e, n)
        }

        function lt(e, t, n) {
            var r = void 0;
            return (r = "object" === (void 0 === e ? "undefined" : O(e)) ? e : t.imQueue(e, !1)).length > 0 && r.map(function(e) {
                return e.mess.failed = !!e.failed, e.mess
            }).filter(function(e) {
                return Object(a.getMessage)(t, e.peerId, e.messageId)
            }).forEach(function(e) {
                return _t(t, e, n, !1)
            }), n
        }

        function ft(e, t, n) {
            var r = e.tabs[t];
            return Object(_.toArray)(ce("_im_mess_unread", n)).forEach(function(e) {
                var t, n = J(se(e, "msgid"));
                n > 0 && r.out_up_to >= n && (le(e, "_im_mess_unread"), le(e, "im-mess_unread"), (t = ue("_im_mess_blind_unread_marker", e)) && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex")))
            }), n
        }

        function mt(e, t, n) {
            var r = t.peerId,
                o = t.messageId,
                i = ue("_im_msg_reply" + o, e),
                a = ue("_im_msg_media" + o, e),
                s = n.tabs[r].mediacontent[o][0];
            return i && (i.innerHTML = s[0]), a && (a.innerHTML = s[1]), e
        }

        function bt(e, t) {
            if (!Object(a.isFullyLoadedTab)(t, e.peerId)) return 0;
            var n = t.tabs[e.peerId];
            return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
        }

        function pt(e) {
            return e > 19e8 && e < 2e9
        }

        function ht(e, t) {
            return e === t.peer
        }

        function gt(e, t) {
            return Object(h.doesChatTabHaveFlag)(Object(a.getTab)(e, t), 1024)
        }

        function vt(e, t) {
            return !!e.tabs[t]
        }

        function Ot(e, t) {
            return !!vt(e, t) && null !== e.tabs[t].lastmsg
        }

        function Et(e, t) {
            return 1e3 * e + 1e3 * t.timeshift
        }

        function yt(e, t, n, r, o) {
            if (Object(s.getUserId)(t) !== Object(s.getUserId)(n)) return !0;
            var i = Et(t.date, r),
                c = Et(n.date, r);
            return !ke(i, c) || (!(!Object(a.isCommunityInterface)(r) || J(t.kludges.from_admin) === J(n.kludges.from_admin)) || (n.date - t.date > 300 || (!(!Object(s.isServiceMsg)(t) && !Object(s.isServiceMsg)(n)) || (!(!Object(s.isCallMessage)(n) && !Object(s.isCallMessage)(t)) || (!(!Object(s.isGift)(t) && !Object(s.isGift)(n)) || (!(!Object(s.isGraffiti)(t) && !Object(s.isGraffiti)(n)) || (!!Object(s.hasReply)(n) || !(Object(s.isUnread)(e, t) === Object(s.isUnread)(e, n) || !o || Object(s.isOut)(n) || en(n.peerId, r.gid)))))))))
        }

        function jt(e, t) {
            return Ee(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
        }

        function wt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                i = Math.round(1e9 * Math.random()).toString(16),
                s = {},
                u = 0;
            return t = (t = Object(c.replaceHyperLinks)(t || "", c.linksReplacer.bind(null, r))).replace(/(<a.+?<\/a>)/gi, function(e) {
                var t = "!link_" + u + "_" + i + "!";
                return s[t] = e, u++, t
            }), t = Object(c.replaceMentions)(t), t = Object(c.replaceEmailLinks)(t), t = Object(c.replaceHashtags)(t, function(t) {
                var n = Object(a.getGroupId)(e);
                return '<a href="/' + (n ? "gim" + n : "im") + "?sel=" + (o || Object(a.getPeer)(e)) + "&st=" + encodeURIComponent(t) + '">' + t + "</a>"
            }), Object.keys(s).forEach(function(e) {
                t = t.replace(e, function() {
                    return s[e]
                })
            }), n.emoji && (t = Re.emojiToHTML(t, !0)), We && (t = We(t)), t
        }

        function Mt(e) {
            return Object(u.isChatPeer)(e) ? "c" + (e - 2e9) : e < -2e9 ? "e" + Math.abs(e + 2e9) : pt(e) ? "mr" + (e - 19e8) : e
        }

        function kt(e) {
            switch (e.substr(0, 1)) {
                case "e":
                    return -2e9 - J(e.substr(1));
                case "c":
                    return 2e9 + J(e.substr(1));
                default:
                    return J(e)
            }
        }

        function Tt(e) {
            return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
        }

        function Ct(e, t) {
            return {
                search: {
                    name: ve("mail_im_peer_search"),
                    icon: "search"
                },
                block_community: {
                    icon: "block",
                    name: ve("mail_block_comm_messages")
                },
                allow_community: {
                    icon: "unblock",
                    name: ve("mail_allow_comm_messages")
                },
                clear: {
                    name: e.peer < -2e9 ? ve("mail_im_delete_email_contact") : ve("mail_im_delete_all_history"),
                    icon: "clear"
                },
                chat: {
                    name: ve("mail_im_create_chat_with"),
                    icon: "invite"
                },
                mute: {
                    name: ve("mail_im_mute"),
                    icon: "mute"
                },
                unmute: {
                    name: ve("mail_im_unmute"),
                    icon: "unmute"
                },
                photos: {
                    name: e.gid ? ve("mail_im_show_media_history_group") : ve("mail_im_show_media_history"),
                    icon: "media"
                },
                avatar: {
                    icon: "avatar",
                    name: ve("mail_update_photo_red")
                },
                block: {
                    icon: "block",
                    name: ve("mail_block_user")
                },
                invite: {
                    icon: "invite",
                    name: ve("mail_im_create_chat_with")
                },
                invite_link: {
                    icon: "invite-link",
                    name: ve(t ? "mail_vkcomgroup_invite_link" : "mail_chat_invite_link")
                },
                leave: {
                    icon: "leave",
                    name: ve(t ? "mail_leave_channel" : "mail_leave_chat")
                },
                topic: {
                    icon: "topic",
                    name: ve("mail_change_topic")
                },
                return: {
                    icon: "return",
                    name: ve(t ? "mail_return_to_vkcomgroup" : "mail_return_to_chat")
                },
                pin_hide: {
                    icon: "pin_hide",
                    name: ve("mail_menu_pin_hide")
                },
                pin_unhide: {
                    icon: "pin_unhide",
                    name: ve("mail_menu_pin_show")
                },
                unpin: {
                    icon: "unpin",
                    name: ve("mail_menu_unpin")
                },
                settings: {
                    icon: "settings",
                    name: ve(t ? "mail_vkcomgroup_settings" : "mail_settings")
                }
            }
        }

        function Pt(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
            return t && (n = ge("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
        }

        function Dt(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
            return t && (n = ge("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
        }

        function xt(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
            switch (e.length) {
                case 1:
                    return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
                case 2:
                    return e.map(function(e, n) {
                        return Pt(e, t[n])
                    }).join("");
                case 3:
                    return Pt(e[0], t[0]) + e.slice(1).map(function(e, n) {
                        return Dt(e, t[n + 1])
                    }).join("");
                case 4:
                    return e.map(function(e, n) {
                        return Dt(e, t[n])
                    }).join("")
            }
        }

        function At(e, t, n) {
            if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
            if (Object(u.isChatPeer)(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
            if (Array.isArray(t.photo)) return xt(t.photo);
            var r = t.data.active.slice(0, 4).map(l.oCacheGet.bind(null, e));
            return xt(r.map(function(e) {
                return e.photo
            }), n ? [] : r.map(function(e) {
                return e.link
            }))
        }

        function It(e) {
            var t = e.get().gid ? ve("mail_search_only_messages_comm") : ve("mail_search_only_messages");
            return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + H + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
        }

        function Lt() {
            return '<li class="im-search-results-head">' + ve("mail_search_messages") + "</li>"
        }

        function St() {
            return '<li class="im-search-results-head">' + ve("mail_search_conversations_sep") + "</li>"
        }

        function Rt() {
            return '<li class="im-search-results-head">' + ve("mail_search_dialogs_sep") + "</li>"
        }

        function Bt() {
            return '<li class="im-search-results-head _im_recent_bar">\n    ' + ve("mail_recent_searches") + '\n    <button type="button" class="' + K + ' im-page--clear-recent">' + ve("mail_clear_recent") + "</button>\n  </li>"
        }

        function Ut(e) {
            var t = e.get().popular_sugg,
                n = Object(a.isClassicInterface)(e) ? 8 : 5;
            return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(function(t) {
                var n = t.peerId,
                    r = Object(l.oCacheGet)(e, n) || t,
                    o = e.get().tabs[n] || t,
                    i = (e.get().mutedPeers || []).indexOf(n) >= 0;
                return '<div class="' + ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + n, o.unread > 0 && "sugg-is_unread", i && "sugg-is_muted"].filter(function(e) {
                    return !!e
                }).join(" ") + '" data-peer="' + n + '">\n    <a class="im-popular--avatar-w ' + Le(o.online) + '" href="' + r.link + '"><img class="im-popular--avatar" src="' + r.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + r.link + '">' + (r.first_name || r.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + Tt(o.unread) + "</span>\n</div>"
            }).join("") + "</li>"
        }

        function Nt(e, t, n) {
            var r = ue("_im_mess_" + t.messageId, n);
            if (r) {
                be(r, "aria-hidden", "false"), _e(r, "im-mess_failed " + j);
                var o = ue("_im_mess_marker", r);
                be(o, "aria-label", ve("mail_send_message_error")), be(o, "role", "link")
            }
            return n
        }

        function Wt(e, t, n) {
            var r = ue("_im_mess_" + t, n);
            if (r) {
                le(r, "im-mess_failed"), be(r, "aria-hidden", "true"), le(r, j);
                var o = ue("_im_mess_marker", r);
                be(o, "aria-label", ""), be(o, "role", "")
            }
            return n
        }

        function Kt(e, t) {
            return Ft(e.map(function(e) {
                return ue("_im_mess_" + e, t)
            }).filter(function(e) {
                return e
            }), t)
        }

        function Ft(e, t) {
            var n = e.filter(function(e) {
                return !me(e, "im-mess_srv")
            }).map(function(e) {
                return e.parentNode
            });
            return e.forEach(function(e) {
                me(e, "im-mess_srv") ? e.parentNode.parentNode.removeChild(e.parentNode) : e.parentNode.removeChild(e)
            }), n.filter(function(e) {
                return 0 === ie(e).length
            }).map(function(e) {
                return de("_im_mess_stack", e)
            }).forEach(function(e) {
                me(re(e), "_im_bar_date") && Q(re(e)), me(re(e), "_im_unread_bar_row") && Q(re(e)), Q(e)
            }), t
        }

        function Ht(e) {
            for (var t = e; t;) {
                var n = t;
                if (null === (t = t.previousElementSibling)) {
                    me(n, "mess_srv") && (t = n.parentNode);
                    var r = de("_im_mess_stack", n);
                    r && (t = r.previousElementSibling, 1 === ie(n.parentNode).length && r.parentNode.removeChild(r))
                }
                me(n, "_im_unread_bar_row") || n.parentNode.removeChild(n)
            }
        }

        function qt(e, t, n, r) {
            return e.map(function(e) {
                return ue("_im_mess_" + e, r)
            }).filter(function(e) {
                return e
            }).forEach(function(e) {
                he(e, function(e, t, n) {
                    var r = t.innerHTML;
                    return '<div class="im-mess--text">\n    ' + ve("delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam") + ' <button type="button" data-peer="' + e + '" class="' + M + ' im-mess--btn">' + ve("mail_restore") + '</button>\n    <div class="' + w + ' im-mess--original">' + r + "</div>\n  </div>"
                }(t, e, n)), _e(e, "im-mess_light")
            }), r
        }

        function Gt(e, t, n) {
            var r = ue("_im_mess_" + e, n);
            if (r) {
                var o = ue(w, r);
                he(r, o.innerHTML), le(r, "im-mess_light")
            }
            return n
        }

        function zt() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1],
                n = arguments[2],
                r = arguments[3],
                o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2;
            if (arguments.length > 5 && void 0 !== arguments[5] && arguments[5]) return Yt(e, t, n, r, !0, o);
            var i = Yt(e, t, n, r, !1, o);
            return i.length > 60 ? Yt(e, t, n, r, !0, o) : i
        }

        function Vt(e) {
            var t, n = (E(t = {}, b.ACTIVITY_TYPE_TYPING, 1), E(t, b.ACTIVITY_TYPE_RECORDING_AUDIO, 2), t),
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

        function Yt(e, t, n, r, o, i) {
            var s = function(e, t, n) {
                var r = [],
                    o = {};
                return Object.keys(t).map(function(n) {
                    ((t[n] || {}).userIds || []).forEach(function(t) {
                        Object(l.oCacheExists)(e, t) ? parseInt(t, 10) !== e.id && (o[t] = n) : r.push(t)
                    })
                }), r.length && Object(b.loadChatMember)(E({}, n, r), e), Object.keys(o).sort(function(e, n) {
                    return t[o[e]].ts - t[o[n]].ts
                })
            }(r, e, t);
            if (0 === s.length) return "";
            var c = Object(u.isUserPeer)(t) || Object(a.isCommunityPeer)(t) ? "first_name" : o ? "short_name" : "name",
                d = Vt(e),
                _ = "";
            d === b.ACTIVITY_TYPE_RECORDING_AUDIO ? _ = ve("mail_recording_audio_several", s.length) : d === b.ACTIVITY_TYPE_TYPING && (_ = ve("mail_typing_several", s.length));
            var f = s.slice(0, Math.min(s.length - 1, i)),
                m = f.map(function(e) {
                    return Object(l.oCacheGet)(r, e)[c]
                }).join(", ");
            if (s.length > i + 1) {
                var p = function(e) {
                    var t = {};
                    return Object.keys(e).forEach(function(n) {
                        var r = e[n].userIds;
                        (void 0 === r ? [] : r).forEach(function(e) {
                            t[e] = 1
                        })
                    }), Object.keys(t).length
                }(e);
                m += " " + ve("mail_and_peer").replace("{count}", p - i).replace("{typing}", _)
            } else {
                if (s.length > 1 && (m += " " + ve("mail_and_peer_one")), !Object(u.isChatPeer)(t) && n) m += " " + _;
                else m += " " + Object(l.oCacheGet)(r, s[f.length])[c] + " " + _
            }
            return m.trim()
        }

        function Qt() {
            return '<div class="im-page--chat-search-empty">\n    ' + ve("mail_im_search_empty") + "\n  </div>"
        }

        function Xt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return n ? '<a class="im_srv_lnk ' + r + '" target="_blank" href="' + e + '">' + t + "</a>" : '<span class="' + r + '">' + t + "</span>"
        }

        function $t(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                o = t.kludges,
                i = o.source_act,
                a = J(o.source_mid),
                s = t.userId,
                c = Object(l.oCacheGet)(e, s),
                u = "",
                d = s === a;
            switch (i) {
                case T:
                    u = "mail_im_chat_created";
                    break;
                case C:
                    u = o.source_is_channel ? "mail_im_title_updated_channel" : "mail_im_title_updated_dot";
                    break;
                case P:
                    u = d ? "mail_im_returned_to_chat" : "mail_im_invited";
                    break;
                case D:
                    u = d ? "mail_im_left" : "mail_im_kicked_from_chat";
                    break;
                case x:
                    u = "mail_im_photo_set";
                    break;
                case A:
                    u = o.source_is_channel ? "mail_im_photo_removed_channel" : "mail_im_photo_removed";
                    break;
                case I:
                    u = o.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                    break;
                case L:
                    u = o.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                    break;
                case S:
                    u = "mail_im_invite_by_link";
                    break;
                default:
                    return "mail_no_support"
            }
            if (u = (u = Oe(c.sex, ve(u, "raw"))).replace("{from}", Xt(c.link, c.name, r)), a && a !== s) {
                var _ = o.source_email;
                if (_) u = u.replace("{user}", Xt("/im?email=" + encodeURIComponent(_), "email", r));
                else {
                    var f = Object(l.oCacheGet)(e, a),
                        m = i === D ? f.inv_name : f.kick_name;
                    u = u.replace("{user}", Xt(f.link, m, r))
                }
            }
            if (o.source_text) {
                var b = o.source_old_text ? '«<b class="im_srv_lnk">' + o.source_old_text + "</b>» &rarr; " : "";
                u = u.replace("{title}", b + '«<b class="im_srv_lnk">' + o.source_text + "</b>»")
            }
            if (o.source_act === I || o.source_act === L)
                if (o.source_message) {
                    var p = Xt("", Jt(Re.emojiToHTML(te(o.source_message.replace(/<br\s?\/?>/gi, " ")), !0)), !1, "im_srv_mess_link");
                    u = u.replace("{msg}", p)
                } else u = u.replace(/{link}(.+){\/link}/i, function(e, t) {
                    return Xt("", t, !1, "im_srv_mess_link")
                });
            return u
        }

        function Zt(e, t, n, r) {
            if (t === x) {
                var o = ue("_im_mess_" + e.messageId, r);
                if (o) {
                    var i = n.tabs[e.peerId];
                    o.parentNode.innerHTML = ge("im_msg_row", {
                        msg_id: e.messageId,
                        from_id: e.peerId,
                        text: $t(n, e, i) + n.chat_photo_msg,
                        ts: e.date,
                        cls: "im-mess_srv"
                    })
                }
            }
            return r
        }

        function Jt(e) {
            return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(o.MENTION_RAW, "$1$4")
        }

        function en(e, t) {
            return !t && e === z.id
        }

        function tn(e, t) {
            return Ae(e, {
                url: Object(a.isCommunityPeer)(t) ? "al_groups.php" : "al_profile.php",
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

        function nn(e) {
            return function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    o = Y(ge("im_preloader", {
                        preloader: X(z.pr_tpl, {
                            id: ""
                        }),
                        cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", r].join(" ")
                    })),
                    i = !1;

                function a() {
                    i = !0, le(o, "im-preloader_visible"), o.parentNode && o.parentNode.removeChild(o)
                }
                setTimeout(function() {
                    i || ("bottom" === n ? e.appendChild(o) : e.insertBefore(o, ne(e)), _e(o, "im-preloader_visible"))
                }, 0), t.then(a).catch(function(e) {
                    Object(p.imWeirdCatch)("wrapLoading", e), a()
                })
            }
        }

        function rn(e, t) {
            return {
                0: {
                    msgs: e.reduce(function(e, t) {
                        return e[t] = [t, r.FLAG_IMPORTANT, 0, 0, "", {}, {}, 0, 0, 0], e
                    }, {}),
                    hash: t,
                    history: 1
                }
            }
        }

        function on(e, t) {
            if (!t && !e) return !1;
            var n = e.target || e.srcElement,
                r = He,
                o = !1,
                i = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
            do {
                if (!n || n.onclick || n.onmousedown || "A" == n.tagName || me(n, "_im_no_select") || me(n, "im_msg_media_link") || "IMG" == n.tagName && !me(n, "_im_graffiti") && !me(n, "emoji") && !me(n, "emoji_css") && !me(n, "im_gift") || "TEXTAREA" == n.tagName || me(n, "play_new") || me(n, "videoplayer") || (o = i.test(n.className))) break
            } while (r-- && (n = n.parentNode));
            return !o || !!ee((window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || "").toString())
        }

        function an(e, t) {
            return '<div class="im-mess--text">\n      <span>' + ve("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + Mt(e) + "&msgid=" + t + '">' + ve("mail_im_goto_conversation") + "</a>\n    </div>"
        }

        function sn(e, t, n) {
            var r = ve("mail_deleteall1"),
                o = ve("mail_sure_to_delete_all"),
                i = ve("mail_delete");
            return Object(u.isChatPeer)(t) && (Object(h.doesChatTabHaveFlag)(e, 1024) ? (r = ve("mail_leave_channel"), o = ve("mail_unfollow_channel_confirmation"), i = ve("mail_unfollow_channel")) : o = ve("mail_chat_sure_to_delete_all")), Object(a.isCommunityPeer)(t) && (o = ve("mail_group_sure_to_delete_all")), De(r, o, i, n, ve("global_cancel"))
        }

        function cn(e, t, n) {
            var r = Object(a.getTab)(e, t),
                o = Object(u.isChatPeer)(t),
                i = o && Object(h.doesChatTabHaveFlag)(r, 1024),
                s = ve("mail_deleteall1"),
                c = ve("mail_sure_to_delete_all"),
                d = ve("mail_delete");
            if (o) {
                if (r.data.closed || r.data.kicked) return sn(r, t, n.bind(null, !0));
                i ? (s = ve("mail_leave_channel"), c = ve("mail_vkcomgroup_leave_confirm"), d = ve("mail_leave_channel")) : (s = ve("mail_leave_chat"), c = ve("mail_chat_leave_confirm"), d = ve("mail_leave_chat"))
            }
            Object(a.isCommunityPeer)(t) && (c = ve("mail_group_sure_to_delete_all"));
            var _ = new MessageBox({
                title: s,
                width: i ? 450 : 500
            }).content(c).setButtons(d, function() {
                return n(!!isChecked(ue("_check_is_delete")) || !o)
            }, ve("global_cancel")).show();
            return o && !i && _.setControlsText('<div class="checkbox im-delete-forall-checkbox _check_is_delete" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + ve("mail_deleteall1") + "</div>"), _
        }

        function un(e) {
            return De(ve("mail_unpin_title"), ve("mail_unpin_text"), ve("mail_unpin"), e, ve("global_cancel"))
        }

        function dn(e, t, n, r) {
            var o = ve("mail_dialog_msg_delete_N", t),
                i = De(ve("mail_dialog_msg_delete_title"), o, ve("mail_delete"), function() {
                    return r(isChecked(ue("_check_forall")))
                }, ve("global_cancel")),
                a = "",
                s = !1;
            return n && (a = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + ve("mail_delete_for_all") + "</div>", s = cur.imDb.selectByKey("del_forall_checked")), i.setControlsText(a), s && checkbox(ue("_check_forall")), i
        }

        function _n(e, t, n, r, o) {
            t.showProgress(), e.set(r.bind(null, o)).then(function() {
                t.hideProgress(), t.hide(), n().removePeer(e, o), n().updateDialogFilters(e)
            })
        }

        function ln(e, t, n, r) {
            var o = e.get().tabs[t].memberIds;
            e.set(r.bind(null, "add_member", o)).then(n().showCreation)
        }

        function fn(e, t, n) {
            var r = e.get();
            if (r.active_tab === o.FOLDER_ALL && 0 === r.message_requests_cnt) return !1;
            var i = r.active_tab === o.FOLDER_MESSAGE_REQUEST ? o.FOLDER_ALL : o.FOLDER_MESSAGE_REQUEST;
            return e.set(n.bind(null, i)).then(function(e) {
                t().restoreDialogs(e, !0)
            })
        }

        function mn(e, t, n) {
            if (e.get().active_tab === o.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
            var r = e.get().active_tab === o.FOLDER_UNREAD ? o.FOLDER_ALL : o.FOLDER_UNREAD;
            return e.set(n.bind(null, r)).then(function(e) {
                t().restoreDialogs(e, !0)
            })
        }

        function bn(e, t, n, r) {
            if (t.get().active_tab === e) return Promise.resolve(t);
            var o = Object(a.isReversedDialogs)(t);
            return t.set(r.bind(null, e)).then(function(e) {
                return n().restoreDialogs(e, !0, o !== Object(a.isReversedDialogs)(e)), e
            })
        }

        function pn(e, t) {
            void 0 === t && (t = e.get().peer);
            var n = e.get().tabs[t];
            return o.FOLDER_MASKS[o.FOLDER_IMPORTANT] & n.folders
        }

        function hn(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (void 0 === t && (t = e.get().peer), !Object(a.isFoldersAvailable)(e)) return !1;
            var r = n || e.get().tabs[t];
            return o.FOLDER_MASKS[o.FOLDER_UNRESPOND] & r.folders
        }

        function gn(e, t) {
            return !1 === ((t.get().block_states || {})[e] || {}).free
        }

        function vn(e) {
            return null != e.get().pendingForward
        }

        function On(e, t) {
            return (t.get().block_states[e] || {}).who === z.id
        }

        function En(e, t) {
            var n = e.get().block_states;
            Object.keys(n).forEach(function(o) {
                n[o].time ? !1 === n[o].free && Date.now() - n[o].time >= 5e4 && t.push([r.mutexEvent([, 1, "gim" + e.get().gid, o, 0, ""])]) : n[o].time = Date.now()
            })
        }

        function yn(e, t, n) {
            var r = void 0;
            return !xe("al_im.php", {
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
                        Se.loaded && Se.detachPlayer(!0), r.unmount()
                    }
                }
            }, n)
        }

        function jn(e, t) {
            return wn(e.get(), t, Object(a.getTab)(e, t).last_seen)
        }

        function wn(e, t, n, r) {
            if (n[0]) return ve("mail_header_online_status") + (Ie[n[0]] ? Mn(t, !1, !1, !0) : "");
            if (!n[1]) return "";
            var o = je(n[1], e.timeshift),
                i = Oe(Object(l.oCacheGet)(e, t).sex, ve("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", o);
            return n[2] && (i += Mn(t, !1, !1, r)), i
        }

        function Mn(e, t, n, r) {
            var o = {
                mid: e
            };
            n || (o.was = 1), t ? o.forcetoup = !0 : o.forcetodown = !0, o = Object.assign(o, r);
            var i = JSON.stringify(o).slice(1, -1).replace(/"/g, "&quot;");
            return ge("im_wrap_mobile", {
                class: "im_status_mob_onl",
                params: i
            })
        }

        function kn(e, t) {
            var n = t.get().tabs[e];
            return Pe("al_settings.php", {
                act: "blacklist_box",
                q: n.href
            }, {
                stat: ["settings.js", "settings.css"],
                dark: 1
            })
        }

        function Tn(e, t) {
            return Pe("groupsedit.php", {
                act: "bl_edit",
                name: "/id" + e,
                gid: t.get().gid
            }, {
                stat: ["page.css", "ui_controls.js", "ui_controls.css"],
                dark: 1
            })
        }

        function Cn(e) {
            return e.get().gid ? "/gim" + e.get().gid : "/im"
        }

        function Pn(e, t, n, r) {
            var o = void 0;
            Vn(xe("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: function(r, i) {
                    i && (o = n(r, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Se.loaded && Se.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        o && o.unmount()
                    }
                }
            }, r), e)
        }

        function Dn() {
            var e = document.activeElement;
            return null !== e && ("INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable"))
        }

        function xn(e, t, n) {
            var r = ue("_im_mess_" + e, n);
            return r && fe(r, "im-mess_fav", t), n
        }

        function An(e, t, n) {
            var r = ue("_im_unread_bar_row", t);
            if (!r) return t;
            var o = ae(r, "._im_mess_stack", -1),
                i = ae(r, "._im_mess_stack"),
                s = o ? ce("_im_mess", o).pop() : null,
                c = i ? ue("_im_mess", i) : null;
            if (Q(r), ot(t), !c || !s) return t;
            var u = se(c, "msgid"),
                d = Object(a.getPreviousMessage)(e, n, u),
                l = Object(a.getMessage)(e, n, u);
            if (!d || yt(e.tabs[n], d, l, e)) return t;
            var f = ue("_im_stack_messages", o),
                m = ue("_im_stack_messages", i).children;
            return Object(_.toArray)(m).forEach(function(e) {
                Q(e), f.appendChild(e)
            }), Q(i), t
        }

        function In(e, t, n) {
            var r = Object(a.getFirstUnread)(e, e.get().peer);
            if (!r) return [!1, 0];
            var o = ue("_im_mess_" + r, t);
            if (!o) {
                var i = Object(a.getLastMessage)(e, e.get().peer, r);
                if (!i) return [!0, 0];
                o = ue("_im_mess_" + i.messageId, t)
            }
            var s = me(o, "_im_mess_srv") ? o : de("_im_mess_stack", o);
            if (!s) return [!0, 0];
            var c = o ? o.offsetTop : 0,
                u = s.offsetTop + c,
                d = n.contHeight();
            return u <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, d - u)]
        }

        function Ln(e, t, n) {
            Ne(t);
            var r = de("_im_top_notice", n);
            Ue(r, 200, Q.pbind(r));
            var o = de("_im_page_dialogs", r);
            o && me(o, "im-page--dialogs-notice") && le(o, "im-page--dialogs-notice"), Ce.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Sn(e, t, n) {
            Ne(t);
            var r = de("_im_aside_notice", n);
            Be(r, 200, Q.pbind(r)), Ce.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Rn(e, t) {
            Ne(e);
            var n = de("_im_aside_promo_block", t);
            Be(n, 200, Q.pbind(n)), Ce.post("al_im.php", {
                act: "a_hide_promo_block",
                type: n.getAttribute("data-type"),
                hash: n.getAttribute("data-hash")
            })
        }

        function Bn(e, t) {
            de("_im_aside_promo_block", t).classList.add("--action-called"), Ce.post("al_im.php", {
                act: "a_vkadmin_app_install",
                hash: se(t, "hash"),
                platform: se(t, "platform")
            })
        }

        function Un(e, t, n, r, o) {
            return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = Object(c.replaceMentions)(n, function(e, t, n, r, o) {
                return o
            }), r && (n = Re.emojiToHTML(n, !0)), t && "..." !== t.trim() && !Object(u.isChatPeer)(e) && (n = ge("im_topic", {
                topic: t,
                cls: "im-topic_dialog"
            }) + n), !n && o.length > 0 && (n = ge("im_dialog_media", {
                name: Nn(o[0], o)
            })), n
        }

        function Nn(e, t) {
            var n = {
                photo: ve("mail_added_photos", "raw"),
                video: ve("mail_added_videos", "raw"),
                audio: ve("mail_added_audios", "raw")
            };
            switch (e.type) {
                case "mail":
                case "respond":
                    var r = e.object ? e.object.fwd_count : e.id.split(";").length;
                    return ye(r, ve("mail_fwd_msgs", "raw"), !0);
                case "photo":
                case "video":
                case "audio":
                    var o = t.filter(function(t) {
                        return t.type === e.type
                    }).length;
                    return ye(o, n[e.type], !0);
                case "audio_playlist":
                    return ve("mail_added_audio_playlist");
                case "artist":
                    return ve("mail_added_artist");
                case "doc":
                    switch (e.kind) {
                        case "graffiti":
                            return ve("mail_added_graffiti");
                        case "audiomsg":
                            return ve("mail_added_audiomsg");
                        default:
                            return ve("mail_added_docs")
                    }
                case "geo":
                case "map":
                    return ve("mail_added_geo");
                case "wall":
                    return ve("mail_added_wall");
                case "wall_reply":
                    return ve("mail_added_wall_reply");
                case "gift":
                    return ve("mail_added_gift");
                case "link":
                case "share":
                    return ve("mail_added_link");
                case "sticker":
                    return ve("mail_added_sticker");
                case "market":
                    return ve("mail_added_market_item");
                case "money_transfer":
                    return ve("mail_added_money_transfer");
                case "money_request":
                    return ve("mail_added_money_request");
                case "story":
                    return ve("mail_added_story");
                case "mask":
                    return ve("mail_added_mask");
                case "article":
                    return ve("mail_added_article");
                case "call":
                    return ve("mail_added_call");
                case "poll":
                    return ve("mail_added_poll");
                case "podcast":
                    return ve("mail_added_podcast");
                default:
                    return ve("mail_added_" + e.type)
            }
            return ""
        }

        function Wn(e) {
            _e(e, "im-send-btn_loading")
        }

        function Kn(e) {
            le(e, "im-send-btn_loading")
        }

        function Fn(e) {
            var t = e.get(),
                n = Object(a.getPinnedMessage)(e);
            if (!n || !Object(f.isPinnedMessageVisibleInTab)(e, Object(a.getPeer)(e))) return "";
            var r = Object(l.oCacheGet)(e, n.userId);
            if (!r) return "";
            var o = Hn(e, n);
            return o || (o = !(o = n.text) && n.attaches.length ? ge("im_pinned_message_media", {
                text: Nn(n.attaches[0], n.attaches)
            }) : wt(e, o, n && n.kludges || {}) || ""), o = o.replace(/<br\s?\/?>/gi, " "), ge("im_pinned_message", {
                date: we(n.date, t.timeshift),
                content: o,
                link: r.link,
                name: r.name
            })
        }

        function Hn(e, t) {
            var n = "";
            if (t && Object(s.isMoneyRequest)(t) && void 0 !== t.kludges.attach1_tr_amount) {
                var r = "%s " + t.kludges.attach1_currency;
                if ("RUB" === t.kludges.attach1_currency && (r = ve("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                    var o = ye(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                        i = ye(t.kludges.attach1_total_amount / 1e3, r, !0);
                    n = ve("mail_money_request_collected_amount_from").replace("{amount}", o).replace("{total_amount}", i)
                } else {
                    var a = ye(t.kludges.attach1_tr_amount / 1e3, r, !0);
                    n = ve("mail_money_request_collected_amount").replace("{amount}", a)
                }
                if (J(t.kludges.attach1_held_amount)) {
                    var c = ye(t.kludges.attach1_held_amount / 1e3, r, !0);
                    n += " " + ve("mail_money_request_held_amount").replace("{amount}", c)
                }
                t.text && (n += '<span class="divider"></span>' + wt(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += ge("im_pinned_message_media_bar", {
                    percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
                }))
            }
            return n
        }

        function qn(e, t, n) {
            var r = n.getAttribute("data-info");
            r && Ae(n, {
                text: r,
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                hidedt: 1e3,
                shift: [0, 4]
            })
        }

        function Gn(e, t, n) {
            var r = +n.getAttribute("data-time");
            r && Ae(n, {
                text: ve("mail_message_edited") + " " + we(r, e.get().timeshift),
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                shift: [0, 4]
            })
        }

        function zn() {
            var e = getSize(ue(q))[1];
            return e || (e = qe), e
        }

        function Vn(e, t) {
            e.bodyNode.addEventListener("mouseover", function(e) {
                me(e.target, "_im_edit_time") ? Gn(t, 0, e.target) : me(e.target, "_im_page_info") && qn(0, 0, e.target)
            })
        }

        function Yn(e, t, n, r, o) {
            var i = e.get(),
                a = void 0;
            Vn(xe("al_im.php", {
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
                        Se.loaded && Se.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        a && a.unmount()
                    }
                }
            }, o), e)
        }

        function Qn(e, t, n) {
            var r = e.get();
            Vn(xe("al_im.php", {
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
                        Se.loaded && Se.detachPlayer(!0)
                    },
                    onDestroy: function() {}
                }
            }, n), e)
        }

        function Xn(e, t) {
            return !(!Object(u.isChatPeer)(e.peerId) || !e.memberIds) && e.memberIds.indexOf(t) >= 0
        }

        function $n(e) {
            return !Object(u.isChatPeer)(e.peerId) || e.data.kicked ? 0 : e.membersCount
        }

        function Zn(e, t) {
            var n = Object(l.oCacheGet)(e, t.peerId),
                r = Object(a.getTab)(e, t.peerId) || {};
            return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, Object(u.isChatPeer)(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
        }

        function Jn(e, t) {
            for (var n in t) t.hasOwnProperty(n) && Zn(e, t[n])
        }

        function er(e, t) {
            var n = [],
                r = t.find(function(e) {
                    return "mail" === e[0]
                }),
                o = r ? r[1].split(";") : [];
            for (o.length > Fe && (r[1] = o.slice(0, Fe).join(";")); e.length > Ke;) {
                var i = e.substr(0, Ke).lastIndexOf(" "); - 1 == i && (i = Ke), n.push({
                    msgText: ee(e.substr(0, i))
                }), e = ee(e.substr(i))
            }
            for (e.length && n.push({
                    msgText: e,
                    attaches: t
                }), n.length || n.push({
                    attaches: t
                }), o = o.slice(Fe); o.length; o = o.slice(Fe)) n.push({
                attaches: [
                    ["mail", o.slice(0, Fe).join(";")]
                ]
            });
            return n
        }

        function tr(e) {
            return e.length > Ke
        }

        function nr(e, t, n) {
            var r = !1;
            Pe("al_im.php", {
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
                        return De(ve("global_error"), e)
                    }, 0), !0
                },
                onDone: function(t, n) {
                    r = Object(d.mount)(t.bodyNode, e)
                }
            }, {})
        }

        function rr() {
            De(ve("global_error"), ve("mail_message_wait_until_uploaded"))
        }

        function or(e, t) {
            var n = Object(a.getTab)(e, t.peerId) || {};
            if (!t || !Object(s.isOut)(t)) return !1;
            if (333 == t.peerId) return !1;
            if (Date.now() / 1e3 - t.date > 86400) return !1;
            if (Ze(e, t.peerId, t.messageId)) return !1;
            if (Object(u.isChatPeer)(t.peerId)) {
                if (n.data.kicked || n.data.closed) return !1
            } else if (n.block_error > 0) return !1;
            return !0
        }

        function ir(e, t) {
            var n = Object(a.getTab)(e, t),
                r = -1 !== n.memberIds.indexOf(n.ownerId),
                o = r ? [n.ownerId] : [];
            return (o = o.concat(n.memberIds.filter(function(t) {
                return t !== n.ownerId && Object(l.oCacheExists)(e, t)
            }).slice(0, r ? 4 : 5))).map(function(t) {
                return Object(l.oCacheGet)(e, t)
            })
        }

        function ar(e, t) {
            return t.map(function(t) {
                return Object(l.oCacheGet)(e, t)
            })
        }

        function sr(e, t) {
            return Object(a.getTab)(e, t).memberIds.reduce(function(t, n) {
                var r = Object(l.oCacheGet)(e, n);
                return t[r.id] = r, t
            }, {})
        }

        function cr(e, t) {
            if ("number" != typeof e || 0 === e) return "";
            var n, r = e,
                o = [];
            if ([
                    [31536e3, ve(t ? "global_years_accusative" : "global_age_years", "raw")],
                    [2592e3, ve(t ? "global_months_accusative" : "global_age_months", "raw")],
                    [604800, ve(t ? "global_weeks_accusative" : "global_age_weeks", "raw")],
                    [86400, ve(t ? "global_days_accusative" : "global_age_days", "raw")],
                    [3600, ve(t ? "global_hours_accusative" : "global_hours", "raw")],
                    [60, ve(t ? "global_minutes_accusative" : "global_minutes", "raw")],
                    [1, ve(t ? "global_seconds_accusative" : "global_age_seconds", "raw")]
                ].forEach(function(e) {
                    var t = v(e, 2),
                        n = t[0],
                        i = t[1],
                        a = Math.floor(r / n);
                    r %= n, a >= 1 && o.push(ye(a, i))
                }), 1 === (n = o.length)) return o.pop();
            var i = o.slice(0, n - 1).join(", "),
                a = o.pop();
            return ve("global_and").replace(/{before}/gi, i).replace(/{after}/gi, a)
        }

        function ur(e, t, n, o) {
            o && !Ze(e, n, o) && (Object(a.getMessage)(e, n, o) ? (e.setState({
                msgid: o
            }), Object(i.updateLocation)({
                msgid: o
            }), t()) : e.get().longpoll.push([Object(r.changePeer)(n, o)]))
        }

        function dr(e) {
            var t = ue("im-mess_is_editing");
            if (!t) return null;
            var n = e.get().tabs[e.get().peer],
                r = Object(a.parserMessage)(n.msgs[se(t, "msgid")]);
            return r && r.peerId == e.get().peer ? r : null
        }
    },
    275: function(e, t, n) {
        e.exports = n(295)
    },
    288: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "KEY", function() {
            return a
        }), n.d(t, "addEvent", function() {
            return s
        }), n.d(t, "removeEvent", function() {
            return c
        }), n.d(t, "triggerEvent", function() {
            return u
        }), n.d(t, "cancelEvent", function() {
            return d
        }), n.d(t, "stopEvent", function() {
            return _
        }), n.d(t, "normEvent", function() {
            return l
        }), n.d(t, "checkEvent", function() {
            return f
        }), n.d(t, "checkKeyboardEvent", function() {
            return m
        }), n.d(t, "checkOver", function() {
            return b
        });
        var r = n(230),
            o = n(240),
            i = n(191),
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

        function s(e, t, n, i, a, s) {
            if ((e = Object(r.ge)(e)) && 3 != e.nodeType && 8 != e.nodeType) {
                var c, u = a ? ((c = function(e) {
                    var t = e.data;
                    e.data = a;
                    var r = n.apply(this, [e]);
                    return e.data = t, r
                }).handler = n, c) : n;
                e.setInterval && e !== window && (e = window);
                var _ = Object(r.data)(e, "events") || Object(r.data)(e, "events", {}),
                    f = Object(r.data)(e, "handle") || Object(r.data)(e, "handle", function(e) {
                        return function() {
                            (function(e) {
                                e = l(e);
                                var t = Array.from(arguments);
                                t[0] = e;
                                var n = Object(r.data)(this, "events");
                                if (!n || "string" != typeof e.type || !n[e.type] || !n[e.type].length) return;
                                var o = (n[e.type] || []).slice();
                                for (var i in o)
                                    if (o.hasOwnProperty(i)) {
                                        if ("mouseover" === e.type || "mouseout" === e.type) {
                                            for (var a = e.relatedElement; a && a !== this;) a = a.parentNode;
                                            if (a === this) continue
                                        }
                                        var s = o[i].apply(this, t);
                                        if (!1 !== s && -1 !== s || d(e), -1 === s) return !1
                                    }
                            }).apply(e, arguments)
                        }
                    }(e));
                Object(o.each)(t.split(/\s+/), function(t, n) {
                    _[n] || (_[n] = [], !i && e.addEventListener ? e.addEventListener(n, f, s) : !i && e.attachEvent && e.attachEvent("on" + n, f)), _[n].push(u)
                })
            }
        }

        function c(e, t, n, i) {
            if (void 0 === i && (i = !1), e = Object(r.ge)(e)) {
                var a = Object(r.data)(e, "events");
                if (a)
                    if ("string" == typeof t) Object(o.each)(t.split(/\s+/), function(t, s) {
                        if (Object(o.isArray)(a[s])) {
                            var c = a[s].length;
                            if (Object(o.isFunction)(n)) {
                                for (var u = c - 1; u >= 0; u--)
                                    if (a[s][u] && (a[s][u] === n || a[s][u].handler === n)) {
                                        a[s].splice(u, 1), c--;
                                        break
                                    }
                            } else {
                                for (var d = 0; d < c; d++) delete a[s][d];
                                c = 0
                            }
                            c || (e.removeEventListener ? e.removeEventListener(s, Object(r.data)(e, "handle"), i) : e.detachEvent && e.detachEvent("on" + s, Object(r.data)(e, "handle")), delete a[s])
                        }
                    }), Object(o.isEmpty)(a) && (Object(r.removeData)(e, "events"), Object(r.removeData)(e, "handle"));
                    else
                        for (var s in a) a.hasOwnProperty(s) && c(e, s)
            }
        }

        function u(e, t, n, i) {
            e = Object(r.ge)(e);
            var a = Object(r.data)(e, "handle");
            if (a) {
                var s = function() {
                    return a.call(e, Object(o.extend)(n || {}, {
                        type: t,
                        target: e
                    }))
                };
                i ? s() : setTimeout(s, 0)
            }
        }

        function d(e) {
            if (!(e = e || window.event)) return !1;
            for (; e.originalEvent;) e = e.originalEvent;
            return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
        }

        function _(e) {
            if (!(e = e || window.event)) return !1;
            for (; e.originalEvent;) e = e.originalEvent;
            return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
        }

        function l(e) {
            var t = e = e || window.event;
            if ((e = Object(o.clone)(t)).originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target), null == e.pageX && null != e.clientX) {
                var n = document.documentElement,
                    r = bodyNode;
                e.pageX = e.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n.clientLeft || 0), e.pageY = e.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n.clientTop || 0)
            }
            return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && i.browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
        }

        function f(e) {
            var t = e || window.event;
            return t && ("click" === t.type || "mousedown" === t.type || "mouseup" === t.type) && (t.which > 1 || t.button > 1 || t.ctrlKey || t.shiftKey || i.browser.mac && t.metaKey) || !1
        }

        function m(e) {
            if (!(e = l(e)) || !e.target) return !1;
            if (!e.screenX) return !0;
            var t = Object(r.getSize)(e.target),
                n = Object(r.getXY)(e.target),
                o = e.pageX - n[0],
                i = e.pageY - n[1];
            return o < -1 || o > t[0] + 1 || i < -1 || i > t[1] + 1 || Math.abs(e.pageX - n[0] - t[0] / 2) < 1 && Math.abs(e.pageY - n[1] - t[1] / 2) < 1
        }

        function b(e, t) {
            if (!e) return !0;
            e = e.originalEvent || e, t = t || e.target;
            var n = e.fromElement || e.relatedTarget;
            if (!n || n === t || n === t.parentNode) return !0;
            for (; n !== t && n.parentNode && n.parentNode !== bodyNode;) n = n.parentNode;
            return n !== t
        }
    },
    289: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "parseFwd", function() {
            return s
        }), n.d(t, "convertKludgesToAttaches", function() {
            return c
        }), n.d(t, "isReservedPeer", function() {
            return u
        }), n.d(t, "isUserPeer", function() {
            return d
        }), n.d(t, "isChatPeer", function() {
            return _
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
                            for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && s.return && s.return()
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

        function s(e) {
            if (a[e]) return a[e];
            for (var t = e ? e.length : 0, n = [], o = [], s = "", c = 0; c < t; c++) {
                var u = e[c],
                    d = u.charCodeAt(0);
                d >= 48 && d <= 57 || "_" === u || "-" === u ? s += u : "(" !== u && ")" !== u && ":" !== u && "," !== u || ("" !== s && (o.push(s), n.push("id"), s = ""), o.push(u), n.push(u))
            }
            s.length > 0 && (o.push(s), n.push("id"));
            var _ = function e(t, n) {
                    var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    if (a > 50) return [
                        [], t.length
                    ];
                    for (var s = [], c = ""; o < t.length;) {
                        var u = t[o];
                        if ("id" === u) c = n[o];
                        else if ("," === u && c) s.push(i(c)), c = "";
                        else if ("(" === u) {
                            var d = e(t, n, o + 1, a + 1),
                                _ = r(d, 2),
                                l = _[0];
                            o = _[1], s.push(i(c, l)), c = ""
                        } else if (")" === u) return "" !== c && s.push(i(c)), [s, o];
                        o++
                    }
                    return c && s.push(i(c)), [s, o]
                }(n, o),
                l = r(_, 1)[0];
            return Object.keys(a).length > 300 && (a = {}), a[e] = l, l
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
    295: function(e, t, n) {
        "use strict";
        n.r(t);
        var r = n(297),
            o = n(113),
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
                            ldb: Object(r.mount)(vk.id)
                        }), t.emojiRcnt && !cur.mbRcntEmoji) {
                        for (var i = [], s = t.emojiRcnt, c = 0, u = s.length; c < u; ++c) {
                            var d = s[c];
                            d && i.push('<a id="mbe_rc_em_' + d + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + d + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(d, !1, !0) + "</a>")
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
                    var _ = cur.postTo;
                    cur.postTo = !1, e.setOptions({
                        onHide: function() {
                            removeEvent(document, "keydown", a.onKey), cur.mbEmojiShown && Emoji.ttClick(cur.emojiWId, cur.mbSmile, !0), cur.mbOnMouseClick && (cur.onMouseClick = cur.mbOnMouseClick, cur.mbOnMouseClick = !1), browser.mozilla
                        },
                        onShow: function() {
                            addEvent(document, "keydown", a.onKey), cur.mbOnMouseClick || (cur.mbOnMouseClick = cur.onMouseClick), browser.mozilla, cur.sorterClbk && (cur.sorterClbk(), delete cur.sorterClbk)
                        },
                        onClean: function() {
                            clearTimeout(cur.mbSaveDraftTO), delete cur.mbSaveDraftTO, delete cur.mbField, cur.postTo = _, cur.mbEmojiScroll = cur.mbEmojiExpanded = !1, cur.mbForceAttach = !1, window.WideDropdown && WideDropdown.deinit("mail_box_dd")
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
                        var n = Object(o.loadDraftForPeer)(cur.ldb, t);
                        cur.mbForceAttach && "market" == cur.mbForceAttach[0] && (n.setText(unclean(getLang("mail_market_tmpl")).replace(/<br>/g, "\n")), n.removeAllAttaches(), n.addAttach("market", cur.mbForceAttach[1])), a.editableHasVal(cur.mbField) || (cur.mbEditable ? (Emoji.val(cur.mbField, clean(n.dData.txt)), window.Emoji && Emoji.editableFocus(cur.mbField, !1, !0)) : val(cur.mbField, clean(n.dData.txt))), n.prepareObjects().then(function() {
                            if (cur.mbField && a.getPeer() == t)
                                for (var e = n.dData.attaches, r = 0; r < e.length; r++) cur.mbMedia.chooseMedia(e[r].type, e[r].id, e[r].object || {}, null, !0)
                        }), a.checkEditable(cur.emojiWId, cur.mbField), a.checkLen(cur.mbField)
                    }
                },
                saveDraft: function() {
                    var e = a.getPeer();
                    if (e && cur.mbField) {
                        var t = Object(o.loadDraftForPeer)(cur.ldb, e);
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
                            for (var o = cur.mbMedia.getMedias(), a = [], s = 0, c = o.length; s < c; ++s) {
                                var u = o[s],
                                    d = [];
                                for (var _ in u) "object" != i(u[_]) && d.push(u[_]);
                                a.push(d.join(","))
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
                        for (var i, s = 0, c = n.length; s < c; ++s)(i = n[s]) && r.media.push(i[0] + ":" + i[1]);
                        if (r.media = r.media.join(","), !t && !r.media) return cur.mbEditable ? Emoji.editableFocus(cur.mbField) : elfocus(cur.mbField);
                        r.to_ids = cur.toData[0], cur.mbBannedHim != r.to_ids || !0 === e ? ajax.post("al_im.php", r, {
                            onDone: function(e, t) {
                                if (t) {
                                    var n = Object(o.loadDraftForPeer)(cur.ldb, t);
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
    297: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "RECENT_SEARCH_OP", function() {
            return o
        }), n.d(t, "PIN_HIDDEN_ID_OP", function() {
            return i
        }), n.d(t, "deleteOldStoredFormat", function() {
            return u
        }), n.d(t, "mount", function() {
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
                            for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && s.return && s.return()
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

        function s(e) {
            return ls.get(a(e)) || {}
        }

        function c(e, t, n) {
            if (ls.checkVersion()) {
                var r = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", r.length), n(a(e), r)
            }
        }

        function u(e, t) {
            for (var n = ["fwd", "draft", "bind_attach"], r = s(e), o = !1, i = n.length; i--;) n[i] in r && (delete r[n[i]], o = !0);
            o && c(e, r, t)
        }

        function d(e) {
            var t = debounce(function(e, t) {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && u(e, t);
            var n = {
                    db: s(e),
                    checkTime: Date.now()
                },
                d = function(e, t, n) {
                    n.key === a(e) && (t.db = JSON.parse(n.newValue), t.checkTime = Date.now())
                }.bind(null, e, n);
            return window.addEventListener("storage", d, !1), {
                select: function(t, r) {
                    return Date.now() - n.checkTime > 1e3 && (n.db = s(e)),
                        function(e, t, n) {
                            return t === o ? e[t] || [] : t === i ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
                        }(n.db, t, r)
                },
                selectByKey: function(t) {
                    return Date.now() - n.checkTime > 1e3 && (n.db = s(e)), n.db[t]
                },
                update: function(a, s) {
                    var u = function(e, t, n) {
                        switch (e[t] || (e[t] = {}), t) {
                            case o:
                                var a = n;
                                a && a.length > 0 ? e[t] = a : delete e[t];
                                break;
                            case i:
                                var s = r(n, 2),
                                    c = s[0],
                                    u = s[1];
                                u ? e[t][c] = +u : delete e[t][c]
                        }
                        return e
                    }(n.db, a, s);
                    return n.db = u, n.checkTime = Date.now(), c(e, u, t)
                },
                updateByKey: function(r, o) {
                    return n.db[r] = o, n.checkTime = Date.now(), c(e, n.db, t)
                },
                unmount: function() {
                    window.removeEventListener("storage", d, !1)
                }
            }
        }
    },
    309: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "post", function() {
            return i
        }), n.d(t, "plainget", function() {
            return a
        }), n.d(t, "plaingetCancelable", function() {
            return s
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
            return s(e, t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).request
        }

        function s(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                o = void 0;
            return o = window.XDomainRequest ? new XDomainRequest : r._getreq(), {
                request: new Promise(function(r, i) {
                    var a = void 0,
                        s = Date.now(),
                        c = n.timeout || 60,
                        u = ajx2q(t);
                    if (window.XDomainRequest) o.open("get", e + "?" + u), o.ontimeout = function(e) {
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
                            o.open("GET", e + "?" + u, !0)
                        } catch (e) {
                            return i([e, o])
                        }
                        o.send()
                    }
                    a = setInterval(function() {
                        Date.now() - s > 1e3 * c && (i(["", {}]), clearInterval(a))
                    }, 1e3)
                }),
                cancel: function() {
                    o.abort()
                }
            }
        }
    },
    325: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "getCookie", function() {
            return o
        }), n.d(t, "setCookie", function() {
            return i
        }), n.d(t, "hideCookiesPolicy", function() {
            return a
        }), n.d(t, "initCookies", function() {
            return s
        });
        var r = n(230);

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
            Object(r.re)("cookies_policy_wrap"), ajax.post("/settings", {
                act: "a_hide_cookies_policy"
            })
        }

        function s() {
            window._cookies = {}
        }
    },
    327: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "notaBene", function() {
            return d
        }), n.d(t, "updSideTopLink", function() {
            return _
        }), n.d(t, "createButton", function() {
            return l
        }), n.d(t, "actionsMenuItemLocked", function() {
            return f
        }), n.d(t, "lockActionsMenuItem", function() {
            return m
        }), n.d(t, "unlockActionsMenuItem", function() {
            return b
        }), n.d(t, "linkLocked", function() {
            return p
        }), n.d(t, "lockLink", function() {
            return h
        }), n.d(t, "unlockLink", function() {
            return g
        }), n.d(t, "lockButton", function() {
            return v
        }), n.d(t, "unlockButton", function() {
            return O
        }), n.d(t, "buttonLocked", function() {
            return E
        }), n.d(t, "isButtonLocked", function() {
            return y
        }), n.d(t, "disableButton", function() {
            return j
        }), n.d(t, "sbWidth", function() {
            return w
        }), n.d(t, "isChecked", function() {
            return M
        }), n.d(t, "checkbox", function() {
            return k
        }), n.d(t, "disable", function() {
            return T
        }), n.d(t, "radioval", function() {
            return C
        }), n.d(t, "radiobtn", function() {
            return P
        }), n.d(t, "showProgress", function() {
            return D
        }), n.d(t, "hideProgress", function() {
            return x
        }), n.d(t, "disableEl", function() {
            return A
        }), n.d(t, "enableEl", function() {
            return I
        }), n.d(t, "initUiHelpers", function() {
            return L
        });
        var r = n(230),
            o = n(288),
            i = n(240),
            a = n(57),
            s = n(126),
            c = n(191),
            u = n(164);

        function d(e, t, n) {
            if (e = Object(r.ge)(e)) {
                n || Object(r.elfocus)(e), void 0 === Object(r.data)(e, "backstyle") && Object(r.data)(e, "backstyle", e.style.backgroundColor || "");
                var o = Object(r.data)(e, "back") || Object(r.data)(e, "back", Object(r.getStyle)(e, "backgroundColor")),
                    i = {
                        notice: "#FFFFE0",
                        warning: "#FAEAEA"
                    };
                Object(r.setStyle)(e, "backgroundColor", i[t] || t || i.warning), setTimeout(s.animate.pbind(e, {
                    backgroundColor: o
                }, 300, function() {
                    e.style.backgroundColor = Object(r.data)(e, "backstyle")
                }), 400)
            }
        }

        function _(e) {
            if (window.scrollNode && !c.browser.mobile && window._tbLink) {
                var t = Object(r.ge)("page_body"),
                    n = Object(r.getXY)(t),
                    o = Object(a.scrollGetY)(),
                    i = bodyNode.scrollLeft,
                    d = Object(r.ge)("side_bar"),
                    _ = Object(r.isVisible)(d);
                if (window._stlSideTop = Math.max((_ ? Object(r.getSize)(d)[1] : 0) - o - (c.browser.mozilla ? Object(r.getXY)(pageNode)[1] : 0), n[1]), e || i != __scrLeft) {
                    var l = Object(r.ge)("page_layout"),
                        f = vk.rtl ? l.offsetLeft + l.offsetWidth : 0,
                        m = vk.rtl ? (window.lastWindowWidth || 0) - f : l.offsetLeft;
                    Object(r.setStyle)(_stlLeft, {
                        width: Math.max(m - 1, 0)
                    });
                    var b = vk.rtl ? n[0] + t.offsetWidth + 5 : m,
                        p = vk.rtl ? f - b : n[0] - 5 - b;
                    Object(r.setStyle)(_stlSide, {
                        left: b - i,
                        width: Math.max(p, 0)
                    }), __scrLeft = i
                }
                Object(r.setStyle)(_stlSide, {
                    top: _stlSideTop,
                    height: Math.max((window.lastWindowHeight || 0) - _stlSideTop, 0)
                }), __adsUpdate();
                var h = _tbLink.loc || _stlWas || o > 200,
                    g = o > 250 && cur._regBar,
                    v = 0,
                    O = !1;
                if (h) {
                    1 !== _stlShown && (Object(r.show)(_stlLeft, _stlSide), Object(r.addClass)(_stlLeft, "stl_active"), Object(r.addClass)(_stlSide, "stl_active"), _stlShown = 1), _tbLink.loc && cur._noUpLink && (o = 0), _stlWas && o > 500 && (_stlWas = 0), o > 200 ? (v = (o - 200) / 200, (_stlWasSet || _stlBack) && (_stlWasSet = _stlBack = 0, O = 1, Object(r.val)(_stlText, Object(u.getLang)("global_to_top")), Object(r.removeClass)(_stlText, "down"), Object(r.removeClass)(_stlText, "back"))) : (v = (200 - o) / 200, _stlWas ? _stlWasSet || (_stlWasSet = 1, O = 0, Object(r.val)(_stlText, ""), Object(r.addClass)(_stlText, "down"), _stlBack && (_stlBack = 0, Object(r.removeClass)(_stlText, "back"))) : _tbLink.loc && (_stlBack || (_stlBack = 1, O = _tbLink.fast ? 1 : 0, Object(r.val)(_stlText, Object(u.getLang)("global_back")), Object(r.addClass)(_stlText, "back"), _stlWasSet && (_stlWasSet = 0, Object(r.removeClass)(_stlText, "down"))))), !1 !== O && Object(r.toggleClass)(_stlLeft, "over_fast", Object(r.hasClass)(_stlLeft, "over") && O);
                    var E = {
                        opacity: Math.min(Math.max(v, 0), 1)
                    };
                    vk.staticheader && (E.top = -Math.min(Object(r.getSize)("page_header_cont")[1], o)), Object(r.setStyle)(_stlLeft, E)
                } else 0 !== _stlShown && (Object(r.hide)(_stlLeft, _stlSide), _stlShown = 0);
                vk.id || (!_regBar && g ? (_regBar = 1, Object(r.val)(Object(r.ge)("reg_bar_content"), cur._regBar), Object(s.animate)(Object(r.ge)("reg_bar"), {
                    top: 0,
                    transition: s.Fx.Transitions.sineInOut
                }, 400), Object(s.animate)(Object(r.ge)("stl_bg"), {
                    paddingTop: 60,
                    transition: s.Fx.Transitions.sineInOut
                }, 400)) : _regBar && !g && (_regBar = 0, Object(s.animate)(Object(r.ge)("reg_bar"), {
                    top: -56,
                    transition: s.Fx.Transitions.sineInOut
                }, 400), Object(s.animate)(Object(r.ge)("stl_bg"), {
                    paddingTop: 13,
                    transition: s.Fx.Transitions.sineInOut
                }, 400)))
            }
        }

        function l(e, t) {
            if ((e = Object(r.ge)(e)) && !e.btnevents)
                if (Object(r.hasClass)(e, "flat_button")) Object(i.isFunction)(t) && (e.onclick = t.pbind(e));
                else {
                    var n = e.parentNode;
                    if (Object(r.hasClass)(n, "button_blue") || Object(r.hasClass)(n, "button_gray")) Object(i.isFunction)(t) && (e.onclick = t.pbind(e));
                    else {
                        var a = !1;
                        Object(o.addEvent)(e, "click mousedown mouseover mouseout", function(i) {
                            if (!Object(r.hasClass)(n, "locked")) switch (i.type) {
                                case "click":
                                    if (!a) return;
                                    return e.className = "button_hover", t(e), Object(o.cancelEvent)(i);
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

        function f(e) {
            var t = Object(r.ge)(e);
            if (t) return Object(r.hasClass)(t, "ui_actions_menu_item_lock")
        }

        function m(e) {
            if ((e = Object(r.ge)(e)) && Object(r.hasClass)(e, "ui_actions_menu_item") && !Object(r.hasClass)(e, "ui_actions_menu_item_lock")) {
                Object(r.data)(e, "inner", e.innerHTML), Object(r.addClass)(e, "ui_actions_menu_item_lock");
                var t = Object(r.ce)("div", {
                    className: "ui_actions_menu_item_lock_text"
                });
                Object(r.val)(t, e.innerHTML), e.appendChild(t), D(e)
            }
        }

        function b(e) {
            (e = Object(r.ge)(e)) && Object(r.hasClass)(e, "ui_actions_menu_item") && Object(r.hasClass)(e, "ui_actions_menu_item_lock") && (Object(r.removeClass)(e, "ui_actions_menu_item_lock"), e.innerHTML = Object(r.data)(e, "inner"))
        }

        function p(e) {
            var t = Object(r.ge)(e);
            if (t) return Object(r.hasClass)(t, "link_lock")
        }

        function h(e, t) {
            var n = Object(r.ge)(e);
            n && "a" === n.tagName.toLowerCase() && !p(n) && (Object(r.addClass)(n, "link_lock"), t && Object(i.each)(t, function(e, t) {
                return Object(r.addClass)(n, t)
            }))
        }

        function g(e, t) {
            var n = Object(r.ge)(e);
            n && p(n) && (Object(r.removeClass)(n, "link_lock"), t && Object(i.each)(t, function(e, t) {
                return Object(r.removeClass)(n, t)
            }))
        }

        function v(e) {
            var t = Object(r.ge)(e);
            if (t && ("button" === t.tagName.toLowerCase() || Object(r.hasClass)(t, "flat_button") || Object(r.hasClass)(t, "wr_header")) && !y(t)) {
                var n = Object(r.getSize)(t);
                Object(r.addClass)(t, "flat_btn_lock"), Object(r.data)(t, "inner", t.innerHTML), Object(r.setStyle)(t, {
                    width: n[0],
                    height: n[1]
                }), t.innerHTML = "", D(t, "btn_lock")
            }
        }

        function O(e) {
            var t = Object(r.ge)(e);
            t && y(t) && (x(t), t.innerHTML = Object(r.data)(t, "inner"), Object(r.removeClass)(t, "flat_btn_lock"), Object(r.setStyle)(t, {
                width: null,
                height: null
            }))
        }

        function E(e) {
            return y(e)
        }

        function y(e) {
            var t = Object(r.ge)(e);
            if (t) return Object(r.hasClass)(t, "flat_btn_lock")
        }

        function j(e, t) {
            var n = Object(r.ge)(e);
            if (n && "button" === n.tagName.toLowerCase())
                if (t) {
                    if (!Object(r.isVisible)(n)) return;
                    n.parentNode.insertBefore(Object(r.ce)("button", {
                        innerHTML: n.innerHTML,
                        className: n.className + " button_disabled"
                    }), n), Object(r.hide)(n)
                } else {
                    var o = Object(r.domPS)(n);
                    o && Object(r.hasClass)(o, "button_disabled") && Object(r.re)(o), Object(r.show)(n)
                }
        }

        function w(e) {
            if (void 0 === window._sbWidth || e) {
                var t = Object(r.ce)("div", {
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

        function M(e) {
            return e = Object(r.ge)(e), Object(r.hasClass)(e, "on") ? 1 : ""
        }

        function k(e, t) {
            var n = Object(r.ge)(e);
            if (n && !Object(r.hasClass)(n, "disabled")) return void 0 === t && (t = !M(n)), Object(r.toggleClass)(n, "on", t), n.setAttribute("aria-checked", t ? "true" : "false"), !1
        }

        function T(e, t) {
            return e = Object(r.ge)(e), void 0 === t && (t = !Object(r.hasClass)(e, "disabled")), Object(r.toggleClass)(e, "disabled", t), "INPUT" === e.tagName && (t ? e.setAttribute("readonly", "readonly") : e.removeAttribute("readonly")), !1
        }

        function C(e) {
            return !!radioBtns[e] && radioBtns[e].val
        }

        function P(e, t, n) {
            if (radioBtns[n] && !Object(r.hasClass)(e, "disabled")) return Object(i.each)(radioBtns[n].els, function() {
                this == e ? (Object(r.addClass)(this, "on"), this.setAttribute("aria-checked", "true"), this.setAttribute("tabindex", "0")) : (Object(r.removeClass)(this, "on"), this.setAttribute && (this.setAttribute("aria-checked", "false"), this.setAttribute("tabindex", "-1")))
            }), radioBtns[n].val = t
        }

        function D(e, t, n, o) {
            if (e = Object(r.ge)(e)) {
                var i = void 0;
                return Object(r.hasClass)(e, "pr") ? i = e : (i = Object(r.se)(Object(r.rs)(vk.pr_tpl, {
                    id: t || "",
                    cls: n || ""
                })), o ? Object(r.domInsertBefore)(i, e) : e.appendChild(i)), setTimeout(function() {
                    Object(r.setStyle)(i, {
                        opacity: 1
                    })
                }), i
            }
        }

        function x(e) {
            e && (Object(r.hasClass)(e, "pr") ? Object(r.setStyle)(e, {
                opacity: 0
            }) : Object(r.re)(Object(r.geByClass1)("pr", e)))
        }

        function A(e) {
            Object(r.setStyle)(e, "pointer-events", "none")
        }

        function I(e) {
            Object(r.setStyle)(e, "pointer-events", "")
        }

        function L() {
            window.__scrLeft = 0, window.radioBtns = {}
        }
    },
    336: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "CONTROLLER", function() {
            return j
        }), n.d(t, "ACTIVITY_PERIOD", function() {
            return w
        }), n.d(t, "ACTIVITY_TYPE_TYPING", function() {
            return M
        }), n.d(t, "ACTIVITY_TYPE_RECORDING_AUDIO", function() {
            return k
        }), n.d(t, "ACTION_PRIORITIES", function() {
            return x
        }), n.d(t, "loadHashes", function() {
            return A
        }), n.d(t, "strHistory", function() {
            return R
        }), n.d(t, "updateBlockStates", function() {
            return B
        }), n.d(t, "loadPeer", function() {
            return U
        }), n.d(t, "restoreHistoryQueue", function() {
            return N
        }), n.d(t, "removeFailed", function() {
            return W
        }), n.d(t, "selectPeer", function() {
            return F
        }), n.d(t, "selectPeerOnMessage", function() {
            return q
        }), n.d(t, "changePeer", function() {
            return G
        }), n.d(t, "updateMentions", function() {
            return z
        }), n.d(t, "setActions", function() {
            return V
        }), n.d(t, "loadMoreHistory", function() {
            return Y
        }), n.d(t, "loadLessHistory", function() {
            return Q
        }), n.d(t, "readLastMessages", function() {
            return $
        }), n.d(t, "loadLongPollKey", function() {
            return Z
        }), n.d(t, "loadLongPollTs", function() {
            return J
        }), n.d(t, "setMessageErrored", function() {
            return ee
        }), n.d(t, "resendMessage", function() {
            return te
        }), n.d(t, "loadAdmins", function() {
            return re
        }), n.d(t, "updateVideoThumb", function() {
            return ae
        }), n.d(t, "editMessage", function() {
            return ce
        }), n.d(t, "addMessage", function() {
            return ue
        }), n.d(t, "markInboundMessagesAsRead", function() {
            return _e
        }), n.d(t, "markOutboundMessagesAsRead", function() {
            return le
        }), n.d(t, "initTextStore", function() {
            return fe
        }), n.d(t, "processFwd", function() {
            return me
        }), n.d(t, "mergeTabs", function() {
            return be
        }), n.d(t, "updateOnline", function() {
            return pe
        }), n.d(t, "setActivity", function() {
            return he
        }), n.d(t, "waitActivity", function() {
            return ge
        }), n.d(t, "sendMessage", function() {
            return Ee
        }), n.d(t, "deliverMessage", function() {
            return ye
        }), n.d(t, "deliverEditedMessage", function() {
            return je
        }), n.d(t, "addSelection", function() {
            return we
        }), n.d(t, "cleanSelected", function() {
            return Me
        }), n.d(t, "dropSelection", function() {
            return ke
        }), n.d(t, "replaceMessage", function() {
            return Te
        }), n.d(t, "saveMedia", function() {
            return Ce
        }), n.d(t, "loadMedia", function() {
            return Pe
        }), n.d(t, "addAttachmentsToStoreData", function() {
            return De
        }), n.d(t, "replaceMediaAttachesStore", function() {
            return xe
        }), n.d(t, "setCurrentSearchDate", function() {
            return Ae
        }), n.d(t, "setInplaceSearch", function() {
            return Ie
        }), n.d(t, "setCurrentSearch", function() {
            return Le
        }), n.d(t, "searchHints", function() {
            return Se
        }), n.d(t, "searchHintsIndex", function() {
            return Re
        }), n.d(t, "localIndexToDialog", function() {
            return Be
        }), n.d(t, "searchTopConv", function() {
            return Ne
        }), n.d(t, "searchImTopConv", function() {
            return We
        }), n.d(t, "searchLocalHints", function() {
            return Ke
        }), n.d(t, "preloadSearchIndex", function() {
            return Fe
        }), n.d(t, "loadDialogs", function() {
            return He
        }), n.d(t, "searchMessages", function() {
            return qe
        }), n.d(t, "isSearchAllLoaded", function() {
            return Ge
        }), n.d(t, "isSearchingInplace", function() {
            return ze
        }), n.d(t, "cancelSearch", function() {
            return Ve
        }), n.d(t, "clearDate", function() {
            return Ye
        }), n.d(t, "searchInplaceStart", function() {
            return Qe
        }), n.d(t, "searchMessagesInplace", function() {
            return Xe
        }), n.d(t, "loadImportant", function() {
            return $e
        }), n.d(t, "loadActualLastMessage", function() {
            return Ze
        }), n.d(t, "removeMessagesMarkDeleted", function() {
            return Je
        }), n.d(t, "removeMessages", function() {
            return et
        }), n.d(t, "removeMessageSend", function() {
            return tt
        }), n.d(t, "removeMessagesWithRestore", function() {
            return nt
        }), n.d(t, "restoreMessage", function() {
            return rt
        }), n.d(t, "restoreMessageSend", function() {
            return ot
        }), n.d(t, "acceptMessageRequest", function() {
            return at
        }), n.d(t, "rejectMessageRequest", function() {
            return st
        }), n.d(t, "sendTyping", function() {
            return ct
        }), n.d(t, "sendRecordingAudio", function() {
            return ut
        }), n.d(t, "forwardMessages", function() {
            return dt
        }), n.d(t, "prepareForward", function() {
            return _t
        }), n.d(t, "deletedDialog", function() {
            return lt
        }), n.d(t, "flushHistory", function() {
            return ft
        }), n.d(t, "updateChatTopic", function() {
            return mt
        }), n.d(t, "loadChatInfo", function() {
            return bt
        }), n.d(t, "addNewMemberOptimisticly", function() {
            return pt
        }), n.d(t, "addNewMember", function() {
            return ht
        }), n.d(t, "loadChatMember", function() {
            return gt
        }), n.d(t, "checkNewPeople", function() {
            return vt
        }), n.d(t, "loadNewPeople", function() {
            return Ot
        }), n.d(t, "updateChatPhoto", function() {
            return Et
        }), n.d(t, "updateActions", function() {
            return yt
        }), n.d(t, "leaveChat", function() {
            return jt
        }), n.d(t, "returnToChat", function() {
            return wt
        }), n.d(t, "toggleMutePeer", function() {
            return Mt
        }), n.d(t, "setMutedPeer", function() {
            return kt
        }), n.d(t, "setExecStack", function() {
            return Tt
        }), n.d(t, "favMessage", function() {
            return Ct
        }), n.d(t, "updateFavMessage", function() {
            return Pt
        }), n.d(t, "updateImportant", function() {
            return Dt
        }), n.d(t, "loadSpam", function() {
            return xt
        }), n.d(t, "flushSpam", function() {
            return At
        }), n.d(t, "setCreationType", function() {
            return It
        }), n.d(t, "getOwnerPhoto", function() {
            return Lt
        }), n.d(t, "presetAvatar", function() {
            return St
        }), n.d(t, "setChatPhoto", function() {
            return Rt
        }), n.d(t, "createChat", function() {
            return Bt
        }), n.d(t, "resync", function() {
            return Ut
        }), n.d(t, "toggleSendingAbility", function() {
            return Nt
        }), n.d(t, "setDelayedMessage", function() {
            return Wt
        }), n.d(t, "isAnythingLoading", function() {
            return Kt
        }), n.d(t, "updateUnreadCount", function() {
            return Ft
        }), n.d(t, "changeSubmitSettings", function() {
            return Ht
        }), n.d(t, "updateFavAndTitle", function() {
            return qt
        }), n.d(t, "saveHistoryScroll", function() {
            return Gt
        }), n.d(t, "filterFromTab", function() {
            return zt
        }), n.d(t, "changeDialogsTab", function() {
            return Vt
        }), n.d(t, "updateFolderState", function() {
            return Qt
        }), n.d(t, "toggleDialogImportant", function() {
            return Xt
        }), n.d(t, "markDialogAnswered", function() {
            return $t
        }), n.d(t, "getMutexQueue", function() {
            return Zt
        }), n.d(t, "releaseBlock", function() {
            return Jt
        }), n.d(t, "toggleCommunityMute", function() {
            return en
        }), n.d(t, "deleteDialog", function() {
            return tn
        }), n.d(t, "restoreDialog", function() {
            return nn
        }), n.d(t, "spamDialog", function() {
            return rn
        }), n.d(t, "updateTabbedPeers", function() {
            return on
        }), n.d(t, "isEverythingLoaded", function() {
            return an
        }), n.d(t, "cleanTab", function() {
            return sn
        }), n.d(t, "stringifyTab", function() {
            return cn
        }), n.d(t, "updateGoToEndVisibility", function() {
            return un
        }), n.d(t, "toggleCommunityMessages", function() {
            return dn
        }), n.d(t, "updateHistory", function() {
            return _n
        }), n.d(t, "startRecording", function() {
            return ln
        }), n.d(t, "cancelRecording", function() {
            return fn
        }), n.d(t, "setVoiceMessageAvail", function() {
            return mn
        }), n.d(t, "toggleConversation", function() {
            return bn
        }), n.d(t, "updateSearchQuery", function() {
            return pn
        }), n.d(t, "initializeChatResize", function() {
            return hn
        }), n.d(t, "joinChat", function() {
            return gn
        }), n.d(t, "getInviteLink", function() {
            return vn
        }), n.d(t, "resetInviteLink", function() {
            return On
        }), n.d(t, "leaveInvitation", function() {
            return En
        }), n.d(t, "saveRecentSearchPeer", function() {
            return yn
        }), n.d(t, "resetRecentSearch", function() {
            return jn
        }), n.d(t, "removeFromRecentSearch", function() {
            return wn
        }), n.d(t, "pinMessageOptimistic", function() {
            return Mn
        }), n.d(t, "unpinMessageOptimistic", function() {
            return kn
        }), n.d(t, "pinMessage", function() {
            return Tn
        }), n.d(t, "unpinMessage", function() {
            return Cn
        }), n.d(t, "getPinnedMessage", function() {
            return Pn
        }), n.d(t, "getMessageLocalId", function() {
            return Dn
        }), n.d(t, "getChatMembers", function() {
            return xn
        }), n.d(t, "getChatDetails", function() {
            return An
        }), n.d(t, "updateFlags", function() {
            return In
        }), n.d(t, "removeChatPhoto", function() {
            return Ln
        }), n.d(t, "kickUserOptimisticly", function() {
            return Sn
        }), n.d(t, "kickUser", function() {
            return Rn
        }), n.d(t, "toggleAdminOptimisticly", function() {
            return Bn
        }), n.d(t, "toggleAdmin", function() {
            return Un
        }), n.d(t, "checkChatMember", function() {
            return Nn
        }), n.d(t, "hidePromoTooltip", function() {
            return Wn
        }), n.d(t, "videoAutoPlayHandler", function() {
            return Kn
        }), n.d(t, "hideTopBannerAction", function() {
            return Fn
        }), n.d(t, "callbackTopBannerAction", function() {
            return Hn
        }), n.d(t, "loadBanner", function() {
            return qn
        }), n.d(t, "setKeyboard", function() {
            return Gn
        }), n.d(t, "deleteKeyboard", function() {
            return zn
        }), n.d(t, "toggleKeyboard", function() {
            return Vn
        }), n.d(t, "loadKeyboard", function() {
            return Yn
        }), n.d(t, "changeCommunityAccess", function() {
            return Qn
        }), n.d(t, "deleteTemplate", function() {
            return Xn
        }), n.d(t, "createTemplate", function() {
            return $n
        }), n.d(t, "updateTemplate", function() {
            return Zn
        }), n.d(t, "resetTabAll", function() {
            return Jn
        });
        var r = n(309),
            o = n(114),
            i = n(148),
            a = n(203),
            s = n(159),
            c = n(297),
            u = n(257),
            d = n(222),
            _ = n(177),
            l = n(120),
            f = n(197),
            m = n(162),
            b = n(212),
            p = n(173),
            h = n(224),
            g = n(230),
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
                            for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function E(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function y(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        var j = "al_im.php",
            w = 5,
            M = "typing",
            k = "audiomessage",
            T = Object(o.updateLazyLocation)(),
            C = T.scheduleNav,
            P = T.commitNav,
            D = T.scheduleNavWithTimeOut;
        var x = {
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

        function A(e, t, n) {
            return Object(r.post)(j, {
                act: "a_renew_hash",
                peers: e.join(","),
                gid: t.hidegid ? void 0 : n.gid
            })
        }

        function I(e, t, n) {
            return function(e) {
                return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
            }(e).then(function(r) {
                return r ? t.apply(void 0, y(n)) : function(e) {
                    if (!e.renew_hashes) {
                        var t = e.last_hashes_update || 0;
                        if (Date.now() - t < 1e4) return Promise.resolve();
                        var n = Object.keys(e.tabs).filter(function(t) {
                            return Object(u.isFullyLoadedTab)(e, t)
                        });
                        e.renew_hashes = A(n, {}, e).then(function(t) {
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
                    return t.apply(void 0, y(n))
                })
            })
        }

        function L(e) {
            return function() {
                var t = arguments,
                    n = t[t.length - 1];
                return e.apply(void 0, y(t)).catch(function(r) {
                    if (r && r.match && r.match(/1001;/)) return I(n, e, t);
                    throw r
                })
            }
        }

        function S(e) {
            return "string" == typeof e ? se("<div>" + e + "</div>") : e
        }

        function R(e) {
            return "string" == typeof e ? e : e.innerHTML
        }

        function B(e, t) {
            return t.block_states = extend(t.block_states, e), Promise.resolve(t)
        }

        function U(e, t, n, o, i) {
            return i.tabHistoryNotChanged = !1, Object(a.retryFn)(r.post, 3, function(e) {
                return e - 1
            })(j, {
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
                    s = r[2],
                    c = r[3],
                    d = r[4];
                if (a.forEach(function(e) {
                        return Object(f.oCacheAdd)(i, e)
                    }), i.tabs || (i.tabs = {}), i.dialog_tab_cts = d, i.tabs[e] || (i.tabs[e] = Object(u.normalizeTab)(i, o)), B(c, i), n) {
                    if (i.tabs[e]) {
                        var _ = i.tabs[e].lastmsg,
                            l = i.tabs[e].lastmsg_meta;
                        extend(i.tabs[e], o), i.tabs[e].lastmsg = _, i.tabs[e].lastmsg_meta = l
                    }
                } else extend(i.tabs[e], o);
                return i.admins = extend(i.admins, s), i.imQueue(e, !1), Kn(), N(e, i)
            }).catch(function(e) {
                return Object(m.imWeirdCatch)("loadPeer", e)
            })
        }

        function N(e, t) {
            var n = t.imQueue(e, !1),
                r = t.tabs[e],
                o = n.filter(function(n) {
                    return !Object(_.isRidExist)(t, e, n.rid)
                });
            return r.msgs = o.reduce(function(e, t) {
                return e["rid" + t.rid] = t.mess, e
            }, r.msgs), t.imQueueSet(e, o), t.tabs[e].history = Object(u.restoreQueue)(o, t, S(t.tabs[e].history)), Promise.resolve(t)
        }

        function W(e, t, n) {
            var r = n.imQueue(e, !1).filter(function(e) {
                return e.failed && e.mess.messageId !== t
            });
            return n.imQueueSet(e, r), n.tabs[e].history = Object(u.removeMessages)([t], S(n.tabs[e].history)), Promise.resolve(n)
        }

        function K(e, t) {
            return !1 === (t.block_states[e] || {}).free ? Promise.resolve(t) : Object(r.post)(j, {
                act: "a_block",
                peer: e,
                prevPeer: t.prevPeer,
                gid: t.gid
            }).then(function(e) {
                return B(O(e, 1)[0], t)
            })
        }

        function F(e, t) {
            var n = t.peer;
            return Promise.resolve(t).then(function(t) {
                return t.tabHistoryNotChanged = !1, Object(u.isFullyLoadedTab)(t, n) && !t.tabs[n].msgid ? (t.gid && K(n, t), Promise.resolve(t).then(V)) : (Object(u.isFullyLoadedTab)(t, n) && (t.tabs[n].msgid = !1), U(n, e, !1, !0, t))
            }).then(V).then(H.bind(null, n))
        }

        function H(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return Object(u.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), Object(u.isTabLoaded)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
        }

        function q(e, t, n) {
            var r = n.msgid,
                o = n.peer;
            return !e && Object(u.isFullyLoadedTab)(n, o) && n.tabs[o].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && K(o, n), Promise.resolve(n).then(V).then(H.bind(null, o))) : U(o, !0, r, !0, n).then(V).then(function() {
                return Object(_.getTab)(n, o).msgid = r, n
            }).then(H.bind(null, o))
        }

        function G(e, t, n, r) {
            if (Kt(r)) throw Object(u.showWaitUntilUploadedBox)(), new Error("Cant change peer while loading something");
            var o = r.gid ? "gim" + r.gid : "im";
            if (r.prevPeer = r.peer, r.peer = e, r.msgid = t || "", r.currentEntryPoint = n, cur.peer = e, C({
                    sel: e ? Object(u.convertPeerToUrl)(e) : null,
                    msgid: r.msgid,
                    email: "",
                    0: o
                }), 0 != r.prevPeer && H(r.prevPeer, r, !0), 0 !== e) {
                Object(u.isTabLoaded)(r, e) && H(e, r, !0), on(r.tabbedPeers.map(function(e) {
                    return e.peer
                }).indexOf(e) < 0 ? [{
                    peer: e,
                    type: "perm"
                }].concat(r.tabbedPeers) : r.tabbedPeers.map(function(t) {
                    return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
                }), !1, r)
            } else on(r.tabbedPeers, !1, r);
            return P(), Ve(r.prevPeer, r)
        }

        function z(e) {
            cur.wallMentions = function() {
                return new Promise(function(t, n) {
                    if (cur.wallMentions = [], !Object(u.isChatPeer)(e.peer) || !Object(u.isFullyLoadedTab)(e, e.peer) || Object(u.isFvkcomgroup)(e, e.peer)) return n();
                    var r = e.tabs[e.peer];

                    function o() {
                        var n = [];
                        Object.keys(r.msgs || {}).reverse().forEach(function(e) {
                            var t = Object(_.parserMessage)(r.msgs[e]),
                                o = t && t.userId;
                            o && o != vk.id && -1 === n.indexOf(o) && Object(u.isUserAliveInChat)(r, o) && n.push(o)
                        }), (r.memberIds || []).forEach(function(e) {
                            -1 === n.indexOf(e) && n.push(e)
                        });
                        var o = [];
                        n.forEach(function(t) {
                            if (Object(f.oCacheExists)(e, t)) {
                                var n = Object(f.oCacheGet)(e, t),
                                    r = n.link.substring(1);
                                o.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                            }
                        }), t(o)
                    }
                    r.membersLoaded ? o() : xn(e.peer, e).then(o)
                })
            }
        }

        function V(e) {
            var t = e.peer;
            if (0 === t) return Promise.resolve(e);
            var n = e.tabs[t],
                r = [],
                o = Object(u.isChatPeer)(t) && (n.data.closed || n.data.kicked),
                i = Object(u.isFvkcomgroup)(e, t);
            n.offset && r.push("photos"), n.offset && r.push("search"), (t < -2e9 || n.offset) && !i && r.push("clear"), Object(u.isCommunityInterface)(e) && !i && r.push("block"), i && !o && r.push("settings"), Object(u.isCommunityPeer)(t) && (n.blocked_community ? r.push("allow_community") : r.push("block_community")), (Object(u.isChatPeer)(t) || Object(u.isUserPeer)(t) || Object(u.isCommunityPeer)(t)) && !Object(u.isCommunityInterface)(e) && (Object(u.isChatPeer)(t) && (n.data.kicked || n.data.closed) || (inArray(t, e.mutedPeers) ? r.push("unmute") : r.push("mute"))), Object(u.isUserPeer)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), Object(u.isChatPeer)(t) && !o && (Object(p.canInviteUser)(e) && r.push("invite"), e.gid || r.push("leave")), Object(u.isChatPeer)(t) && n.data.closed && !n.data.kicked && r.push("return"), Object(u.isChatPeer)(t) && n.pinned && (r.push(Object(b.isPinnedMessageVisibleInTab)(e, t) ? "pin_hide" : "pin_unhide"), Object(p.canPinOrUnpin)(e) && r.push("unpin"));
            var a = Object(u.chatActions)(e, i);
            return e.curActions = r.sort(function(e, t) {
                return x[e] - x[t]
            }).reduce(function(e, t) {
                return e[t] = a[t], e
            }, {}), Promise.resolve(e)
        }

        function Y(e, t, n) {
            var o = n.tabs[n.peer];
            return Object(r.post)(j, {
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
                    s = t[3];
                return o.allShown = a, n.admins = extend(n.admins, s), o.history = r + R(o.history), o.historyToAppend = r, o.offset += Object.keys(i).length, o.msgs = extend(o.msgs, i), n
            })
        }

        function Q(e) {
            var t = e.tabs[e.peer];
            return Object(r.post)(j, {
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
                var s = Object.keys(i).length;
                return t.skipped -= s, t.offset += s, t.msgs = extend(t.msgs, i), e
            })
        }

        function X(e, t, n, r) {
            var o = e.tabs[t];
            return r === i.FLAG_OUTBOUND && o.out_up_to > n ? e : (r === i.FLAG_OUTBOUND ? o.out_up_to = n : o.in_up_to = n, e)
        }
        var $ = L(function(e, t) {
            if (Object(u.tabIsMessageRequest)(t.tabs[e])) return Promise.resolve(t);
            var n = t.tabs[e],
                o = n.msgs || {},
                a = Object.keys(o).map(function(n) {
                    return Object(_.getMessage)(t, e, n)
                }).filter(function(e) {
                    return !Object(l.isOut)(e)
                }).map(function(e) {
                    return e.messageId
                }).sort(function(e, t) {
                    return t - e
                });
            return n.skipped > 0 && (a = a.filter(function(e) {
                return intval(e) <= n.lastmsg - n.skipped
            })), (a = intval(a.shift())) <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([i.readInboundEvent([6, e, a])]), Object(r.post)(j, {
                peer: e,
                ids: [a],
                hash: n.hash,
                act: "a_mark_read",
                gid: t.gid
            }).then(function() {
                return X(t, e, a, i.FLAG_OUTBOUND)
            }))
        });

        function Z(e) {
            return Object(r.post)(j, {
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

        function J(e) {
            return Object(r.post)(j, {
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
            return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = Object(u.setMessageError)(e, t, S(r.history))), Promise.resolve(n)
        }

        function te(e, t, n, r) {
            var o = r.tabs[e];
            return o.msgs[t] && (o.msgs[t].errored = 0, o.lastmsg_meta = n, o.lastmsg = t, o.history = Object(u.startResendMessage)(e, t, S(o.history))), Promise.resolve(r)
        }

        function ne(e, t, n, r) {
            var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, i) {
                return !n && !zt(i)(t) || o && !o(i, e[i], t) || (e[i] = Object(s.arrayUnique)(r(e[i], i))), e
            }, e.dialog_tabs))
        }

        function re(e, t) {
            return 0 === e.length ? Promise.resolve(t) : Object(r.post)(j, {
                act: "a_get_admin",
                admins: e.join(","),
                gid: t.gid
            }).then(function(e) {
                var n = O(e, 1)[0];
                return t.admins = extend(t.admins, n), t
            })
        }

        function oe(e, t) {
            if (!inArray(e, t.tabbedPeers.map(function(e) {
                    return e.peer
                })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
                var n = {
                    peer: e,
                    type: "temp"
                };
                on(t.tabbedPeers.concat([n]), !1, t)
            }
        }

        function ie(e, t, n) {
            return Object(u.isReversedDialogs)(n) ? t.concat([e]) : [e].concat(t)
        }

        function ae(e, t) {
            var n = e.get().peer,
                r = Object(_.getTab)(e, n);
            if (Object(u.isFullyLoadedTab)(e, n)) {
                var o = S(r.history);
                r.history = Object(u.updateMessageInCache)(e, o, t)
            }
        }

        function ce(e, t) {
            var n = Object(_.getTab)(t, e.peerId);
            if (Object(u.isFullyLoadedTab)(t, e.peerId)) {
                var r = S(n.history);
                n.msgs[e.messageId] = extend(!0, {}, e), n.history = Object(u.editAndReplaceMessage)(t, e, r)
            }
            n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
            var o = n && n.pinned && Object(_.parserMessage)(n.pinned);
            return o && o.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
        }

        function ue(e, t) {
            var n = e.flags & i.FLAG_OUTBOUND,
                r = e.peerId;
            if (Object(u.isTabLoaded)(t, r)) {
                var o = t.tabs[r];
                if (o.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = E({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? o.unread = 0 : (o.lastmsg == e.messageId && o.unread ? de(t, 1, e.peerId) : (!o.unread && de(t, 1, e.peerId), o.unread++), oe(e.peerId, t)), Object(u.isFullyLoadedTab)(t, r)) {
                    var a = S(o.history);
                    o.skipped > 0 && o.skipped++, o.offset++, o.msgs[e.messageId] = extend(!0, {}, e), o.history = Object(u.appendToHistory)(t, e, a, !0, !0, !0), Object(l.isOut)(e) && (o.blocked_community = 0, V(t))
                }
                if (o.typing) {
                    var s = o.typing.userIds.indexOf(e.userId);
                    s >= 0 && o.typing.userIds.splice(s, 1)
                }
                return o.lastmsg = e.messageId, o.lastmsg_meta = e, H(e.peerId, t), ne(t, o, !1, ie.bind(null, r), Yt.bind(null, t)), Promise.resolve(t)
            }
            return U(r, 0, 0, 0, t).then(function(t) {
                return ne(t, t.tabs[r], !1, ie.bind(null, r), Yt.bind(null, t)), H(e.peerId, t), n || oe(e.peerId, t), t
            })
        }

        function de(e, t, n) {
            e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
        }

        function _e(e, t) {
            if (Object(u.isFullyLoadedTab)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = n.unread;
                if (t = X(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : Object(_.countUnread)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && de(t, -1, e.peerId), !n.skipped) {
                    var o = S(n.history);
                    n.history = Object(u.removewNewUnreadBarAndMerge)(t, o, e.peerId)
                }
            } else Object(u.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && de(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
            return Object(u.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[d.FOLDER_UNREAD] = t.dialog_tabs[d.FOLDER_UNREAD].filter(function(t) {
                return intval(t) !== e.peerId
            })), 0 !== t.unread_cnt || t.active_tab !== d.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : Vt(d.FOLDER_ALL, t)
        }

        function le(e, t) {
            var n = t.tabs[e.peerId];
            if (Object(u.isTabLoaded)(t, e.peerId) && X(t, e.peerId, e.upToId, i.FLAG_OUTBOUND), Object(u.isFullyLoadedTab)(t, e.peerId)) {
                var r = S(n.history);
                n.history = Object(u.markMessagesAsRead)(t, e.peerId, r)
            }
            return Promise.resolve(t)
        }

        function fe(e, t, n, r, o) {
            return o.text = {}, o.imQueue = e, o.imQueueResend = t, o.imQueueSet = n, o.imQueueComplete = r, Promise.resolve(o)
        }

        function me(e, t, n) {
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
                    i = Object(_.getMessage)(n, t, o),
                    a = Object(_.getAuthorFullName)(n, t, o);
                return !1 === a ? n.set(gt.bind(null, E({}, t, [i.userId]))).then(function(n) {
                    var a = Object(_.getAuthorFullName)(n, t, o);
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
            Object(u.normalizeTabsGotFromServer)(t, e);
            var n = t.tabs[t.peer];
            return t.tabs = Object.keys(e).reduce(function(n, r) {
                var o = t.tabs[r] ? t.tabs[r].msgs : {},
                    i = extend({}, o || {}, e[r].msgs || {});
                return n[r] = extend(t.tabs[r] || {}, e[r]), i && (n[r].msgs = i), e[r].lastmsg || (n[r].lastmsg = !1), n
            }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
        }

        function pe(e, t, n, r) {
            var o = Object(_.getTab)(r, e);
            if (o) {
                var i = !1 !== t ? mobPlatforms[t] ? 1 : 0 : o.last_seen[2];
                o.online = t, o.last_seen = [t, n || o.last_seen[1], i]
            }
            return Promise.resolve(r)
        }

        function he(e, t, n) {
            var r = Object(_.getTab)(n, e.peerId);
            return r && (e.ts = Date.now() / 1e3, r.activity || (r.activity = {}), r.activity[t] = e, r.typing === M && (r.typing = e)), Promise.resolve(n)
        }

        function ge(e, t, n) {
            var r = e.peerId;
            return Object(a.pause)(w + 2).then(function() {
                if (Object(u.isTabLoaded)(n, r)) {
                    var e = n.tabs[r];
                    if ((e.activity || {})[t]) Date.now() - 1e3 * e.activity[t].ts >= 1e3 * w && (delete e.activity[t], 0 === Object.keys(e.activity) && delete e.activity);
                    if (e.typing) Date.now() - 1e3 * e.typing.ts >= 1e3 * w && (e.typing = void 0)
                }
                return n
            })
        }

        function ve(e) {
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

        function Oe(e) {
            return e.map(function(e) {
                return e[0] + ":" + e[1] + ":" + e[2]
            }).join(",")
        }
        var Ee = function(e, t, n, o) {
                var i = Date.now() + rand(0, 100).toFixed(0),
                    a = o.ref_id,
                    s = o.ref_source;
                o.ref_source = void 0, o.ref_id = void 0, (s || a) && (C({
                    ref_source: null,
                    ref: null
                }), P()), Object(h.statlogsSendingQueueLength)(o);
                var c = t.attaches.length > 0,
                    u = Object(h.statlogsSendingTime)(o, "send", "server", c),
                    d = Object.assign({
                        act: "a_send",
                        to: e,
                        hash: n.hash,
                        ref_source: s,
                        ref: a,
                        msg: t.message,
                        payload: t.payload,
                        media: Oe(t.attaches),
                        guid: i,
                        share_url: t.share_url,
                        cancelled_shares: t.cancelled_shares,
                        random_id: t.rid,
                        gid: n.hidegid ? void 0 : o.gid,
                        entrypoint: o.currentEntryPoint || "",
                        sticker_referrer: t.sticker_referrer
                    }, n.external, ve(t.attaches));
                return Object(r.post)(j, d, 2e4).then(function(e) {
                    var t = O(e, 1)[0];
                    return u(), o.version !== t.version && nav.reload({
                        force: !0
                    }), o.currentEntryPoint = "", o
                }).catch(function(e) {
                    throw Object(h.statlogsSendingError)(o, e, "send", "server_send"), e
                })
            },
            ye = L(function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = arguments[3],
                    o = r.tabs[e];
                return Ee(e, t, v({
                    hash: o.hash
                }, n), r)
            }),
            je = L(function(e, t, n) {
                var o = t.attaches.length > 0,
                    i = Object(h.statlogsSendingTime)(n, "edit", "server", o);
                return Object(r.post)(j, Object.assign({
                    act: "a_edit_message",
                    hash: e.hash,
                    id: t.messageId,
                    peerId: e.peerId,
                    gid: n.gid,
                    msg: t.origText,
                    media: Oe(t.attaches),
                    share_url: t.share_url,
                    cancelled_shares: t.cancelled_shares
                }, ve(t.attaches)), 2e4).then(function(e) {
                    O(e, 1)[0];
                    return i(), n
                }).catch(function(e) {
                    throw Object(h.statlogsSendingError)(n, e, "edit", "server_send"), e
                })
            });

        function we(e, t) {
            if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
                return t !== e[0]
            });
            else {
                var n = t.selectedMessages.concat(e);
                t.selectedMessages = Object(s.arrayUnique)(n).sort(function(e, t) {
                    return e - t
                })
            }
            return Promise.resolve(t)
        }

        function Me(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function ke(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function Te(e, t) {
            if (Object(u.isFullyLoadedTab)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = t.imQueue(e.peerId).filter(function(t) {
                        return t.failed && t.rid !== e.randomId
                    });
                t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId, n.msgs["rid" + e.randomId] && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = Object(u.replaceMessageAttrs)(t, S(n.history), e)
            }
            return Promise.resolve(t)
        }

        function Ce(e, t) {
            return Promise.resolve()
        }

        function Pe(e, t) {
            var n = Object(h.statlogsSendingTime)(t, "unknown", "attach"),
                o = {
                    act: "a_get_media",
                    id: e.messageId,
                    gid: t.gid
                };
            return Object(a.retryFn)(r.post, 3, function(e) {
                return e * e
            })(j, o).then(function(r) {
                return n(), De(e, r, t)
            }).catch(function(n) {
                return Object(h.statlogsSendingError)(t, n, "unknown", "server_load_attach"), De(e, null, t)
            })
        }

        function De(e, t, n) {
            var r = n.tabs[e.peerId];
            return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")], xe(e, n)
        }

        function xe(e, t) {
            var n = t.tabs[e.peerId];
            return n.history = Object(u.replaceAttaches)(S(n.history), e, t), Promise.resolve(t)
        }

        function Ae(e, t, n) {
            var r = Object(u.dayFromVal)(t),
                o = n.tabs[e];
            return o.searchDay = r, o.searchOffset = 0, o.searchAllLoaded = !1, Promise.resolve(n)
        }

        function Ie(e, t, n) {
            return n.tabs[t].searchText = e, Qe(t, n), n
        }

        function Le(e, t, n) {
            if (t) {
                var r = n.tabs[t];
                r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
            } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
            return Promise.resolve(n)
        }

        function Se(e, t, n, o, i) {
            return Object(r.post)(j, {
                act: "a_hints",
                str: e,
                gid: o.hidegid ? 0 : i.gid,
                query: n,
                peerIds: t.join(",")
            }).then(function(e) {
                var t = O(e, 3),
                    n = t[0],
                    r = t[1];
                return B(t[2], i), r.forEach(function(e) {
                    return Object(f.oCacheAdd)(i, e)
                }), be(n, i), Object.keys(n).sort(function(e, t) {
                    return n[e].order - n[t].order
                }).map(function(e) {
                    return n[e]
                })
            })
        }

        function Re(e, t, n, r) {
            return Se(e, t, n, {}, r).then(function(e) {
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

        function Ue(e) {
            return function(t, n) {
                return e(n).then(function(e) {
                    var r = (t ? e.search(t) : e.list).map(Be);
                    return n.mapped_index || (n.mapped_index = {}), r.forEach(function(e) {
                        n.mapped_index[e.peerId] = e
                    }), r
                })
            }
        }
        var Ne = Ue(function(e) {
                return e.topConvTree
            }),
            We = Ue(function(e) {
                return e.imTopConvTree
            }),
            Ke = Ue(function(e) {
                return e.hintsTree
            });

        function Fe(e, t) {
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
            var s = e.select(c.RECENT_SEARCH_OP);
            return Object(a.retryFn)(r.post, 1, function() {
                return 4
            })(j, {
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
                var r = O(e, 4),
                    a = r[0],
                    s = r[1],
                    c = r[2],
                    u = r[3];
                return t.popular_sugg = c, new vkIndexer(a, function(e) {
                    return e[1]
                }, n), new vkIndexer(s, function(e) {
                    return e[1]
                }, o), u && u.length > 0 ? new vkIndexer(u, function(e) {
                    return e[1]
                }, i) : i(), t
            })
        }

        function He(e) {
            var t = e.active_tab,
                n = void 0;
            return n = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
                return e.tabs[t].lastmsg
            })) : 0, Object(r.post)(j, {
                act: "a_get_dialogs",
                start_message_id: n,
                tab: t,
                gid: e.gid
            }).then(function(n) {
                var r = O(n, 4),
                    o = r[0],
                    i = r[1],
                    a = r[2],
                    s = r[3];
                return a.forEach(function(t) {
                    return Object(f.oCacheAdd)(e, t)
                }), B(s, e), be(i, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(i).map(intval)), e.dialog_tabs_all[t] = !o.has_more, Promise.resolve(e)
            })
        }
        var qe = L(function(e, t) {
            return Object(r.post)(j, {
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
                    s = r[3],
                    c = r[4];
                return i.forEach(function(e) {
                    return Object(f.oCacheAdd)(t, e)
                }), Object(u.normalizeTabsGotFromServer)(t, o), e === t.searchText && (t.searchOffset = s, t.searchAllLoaded = c), Object.keys(o).filter(function(e) {
                    return !t.tabs[e]
                }).forEach(function(e) {
                    t.tabs[e] = o[e]
                }), [o, a]
            })
        });

        function Ge(e, t) {
            return t.tabs[e].searchAllLoaded
        }

        function ze(e, t) {
            return !(t.peer !== e || !Object(u.isFullyLoadedTab)(t, e)) && t.tabs[e].inplaceSearch
        }

        function Ve(e, t) {
            if (Object(u.isFullyLoadedTab)(t, e)) {
                var n = t.tabs[e];
                delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, C({
                    st: ""
                }), P()
            }
            return Promise.resolve(t)
        }

        function Ye(e, t) {
            if (Object(u.isFullyLoadedTab)(t, e)) {
                var n = t.tabs[e];
                delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
            }
            return Promise.resolve(t)
        }

        function Qe(e, t) {
            return t.tabs[e].inplaceSearch = !0, Promise.resolve(t)
        }
        var Xe = L(function(e, t) {
            var n = t.tabs[e],
                o = "";
            if (Qe(e, t), n.searchDay && (o = "day:" + n.searchDay), !o && !n.searchText) return Promise.reject();
            var i = "in:" + e + " " + o + " " + (n.searchText || "");
            return C({
                st: n.searchText
            }), P(), Object(r.post)(j, {
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

        function $e(e) {
            return Object(r.post)(j, {
                act: "a_important",
                offset: e,
                part: e > 0
            })
        }

        function Ze(e, t) {
            var n = Object(_.getTab)(e, t);
            return Object(r.post)(j, {
                act: "a_load_lastmsg",
                peerId: t,
                gid: e.get().gid
            }).then(function(r) {
                var o = O(r, 2),
                    i = o[0],
                    a = o[1];
                n.lastmsg = i[0] || !1, n.lastmsg_meta = i;
                var s = O(a, 3);
                n.unread = s[0], n.in_up_to = s[1], n.out_up_to = s[2], n.unread || (e.get().dialog_tabs[d.FOLDER_UNREAD] = e.get().dialog_tabs[d.FOLDER_UNREAD].filter(function(e) {
                    return e != t
                })), ne(e.get(), n, !1, ie.bind(null, t), Yt.bind(null, e.get()))
            })
        }

        function Je(e, t, n) {
            if (Object(u.isFullyLoadedTab)(n, t)) {
                var r = n.tabs[t];
                r.deleted = r.deleted ? r.deleted.concat(e) : e
            }
            return Promise.resolve(n)
        }

        function et(e, t, n) {
            if (Object(u.isFullyLoadedTab)(n, t)) {
                var r = n.tabs[t];
                r.history = Object(u.removeMessages)(e, S(r.history)), r.offset -= e.filter(function(e) {
                    return r.msgs[e]
                }).length, e.forEach(function(e) {
                    return delete r.msgs[e]
                }), e.forEach(function(e) {
                    var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
                })
            }
            return Promise.resolve(n)
        }
        var tt = L(function(e, t, n, o, i) {
            return Object(r.post)(j, {
                act: "a_mark",
                peer: t,
                hash: n || i.tabs[t].hash,
                gid: i.gid,
                msgs_ids: e.join(","),
                mark: o
            })
        });

        function nt(e, t, n, r) {
            if (Object(u.isFullyLoadedTab)(r, t)) {
                var o = r.tabs[t];
                o.deleted = o.deleted ? o.deleted.concat(e) : e, o.history = Object(u.removeMessagesWithRestore)(e, t, n, S(o.history)), o.offset -= e.filter(function(e) {
                    return o.msgs[e]
                }).length
            }
            return Promise.resolve(r)
        }

        function rt(e, t, n) {
            if (Object(u.isFullyLoadedTab)(n, t)) {
                var r = n.tabs[t];
                r.deleted && (r.deleted = r.deleted.filter(function(t) {
                    return t !== e
                })), r.history = Object(u.restoreMessage)(e, t, S(r.history)), r.offset++
            }
            return Promise.resolve(n)
        }

        function ot(e, t, n, o) {
            return Object(r.post)(j, {
                act: "a_restore",
                id: e,
                peer: t,
                hash: n,
                gid: o
            })
        }
        var it = L(function(e, t, n) {
                return Object(u.tabIsMessageRequest)(n.tabs[e]) ? Promise.resolve(n) : (n.tabs[e].lastTyping = Date.now(), Object(r.post)(j, {
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
            at = L(function(e, t) {
                return Object(r.post)(j, {
                    act: "a_accept_message_request",
                    user_id: e,
                    hash: t.tabs[e].hash
                }).then(function() {
                    t.tabs[e].is_message_request = !1
                }).then(function() {
                    return t
                })
            }),
            st = L(function(e, t) {
                return Object(r.post)(j, {
                    act: "a_reject_message_request",
                    user_id: e,
                    hash: t.tabs[e].hash
                }).then(function() {
                    return ne(t, t.tabs[e], !0, function(t) {
                        return t.filter(function(t) {
                            return t !== e
                        })
                    }), on(t.tabbedPeers.filter(function(t) {
                        return t.peer !== e
                    }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null, t
                })
            }),
            ct = L(function(e, t) {
                return it(e, M, t)
            }),
            ut = L(function(e, t) {
                return it(e, k, t)
            });

        function dt(e, t, n, r) {
            return t && (r.pendingForward = null, e || (e = {
                msgIds: []
            }), t.addAttach(n ? "reply" : "mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(r)
        }

        function _t(e, t) {
            return t.pendingForward = e, Promise.resolve(t)
        }

        function lt(e, t, n) {
            if (Object(u.isTabLoaded)(n, e)) {
                n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, ne(n, n.tabs[e], !0, function(t) {
                    return t.filter(function(t) {
                        return t !== e
                    })
                }), n.tabs[e].unread > 0 && de(n, -1, e);
                var r = n.tabs[e];
                return r.deletedDialog = !0, on(n.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, n), t.then(function(t) {
                    var o = O(t, 2);
                    o[0], o[1];
                    return delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
                })
            }
        }
        var ft = L(function(e, t) {
                return lt(e, Object(r.post)("al_im.php", {
                    act: "a_flush_history",
                    id: e,
                    from: "im",
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }), t)
            }),
            mt = L(function(e, t, n) {
                return Object(r.post)(j, {
                    act: "a_set_chat_title",
                    peer: e,
                    new_title: t,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(function() {
                    return n
                })
            }),
            bt = L(function(e, t) {
                return Object(r.post)(j, {
                    act: "a_load_chat_info",
                    peer: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(n) {
                    var r = O(n, 1)[0];
                    return t.tabs[e] = extend(t.tabs[e], r), t
                })
            });

        function pt(e, t, n) {
            var r = n.tabs[e];
            return r.memberIds = [].concat(r.memberIds, t).filter(function(e, t, n) {
                return n.indexOf(e) === t
            }), r.membersCount = r.memberIds.length, Promise.resolve(n)
        }
        var ht = L(function(e, t, n) {
            return Object(r.post)(j, {
                act: "a_add_chat_members",
                peer: e,
                new_peer: t.join(","),
                gid: n.gid,
                hash: n.tabs[e].hash
            }).then(function(e) {
                return n
            })
        });

        function gt(e, t) {
            if (isEmpty(e)) return Promise.resolve(t);
            var n = Object.keys(e).map(function(t) {
                return t + ":" + e[t].join(",")
            }).join(";");
            return Object(r.post)(j, {
                act: "a_load_member",
                need: n
            }).then(function(e) {
                return O(e, 1)[0].forEach(function(e) {
                    return Object(f.oCacheAdd)(t, e)
                }), t
            })
        }

        function vt(e, t, n) {
            var r = {},
                o = n.get();

            function a(e, t) {
                Object(u.isChatPeer)(e) && t && !Object(f.oCacheExists)(o, t) && (r[e] ? -1 === r[e].indexOf(t) && r[e].push(t) : r[e] = [t])
            }
            var s = t.filter(function(e) {
                return !Object(u.isTabLoaded)(o, e.peerId)
            }).map(function(e) {
                return e.peerId
            });
            t.forEach(function(e) {
                a(e.peerId, e.userId)
            }), e.forEach(function(e) {
                a(e.peerId, +e.kludges.source_mid)
            });
            var c = t.filter(function(e) {
                return e.flags & i.FLAG_OUTBOUND && !e.local
            }).map(function(e) {
                return e.kludges.from_admin
            }).filter(function(e) {
                return e && !o.admins[e]
            });
            return 0 === Object.keys(r).length && 0 === c.length && 0 === s.length ? Promise.resolve(o) : {
                shouldLoad: Object.keys(r).length > 0 || c.length > 0 || s.length > 0,
                needMembers: r,
                needAdminIds: c,
                needPeers: s
            }
        }

        function Ot(e, t, n) {
            var r = e.needMembers,
                o = e.needAdminIds,
                i = e.needPeers;
            return t.pause(), Promise.all([gt(r, n), re(o, n), Promise.all(i.map(function(e) {
                return U(e, 0, 0, 0, n)
            }))]).catch(function() {
                return n
            }).then(function() {
                return t.resume()
            }).then(function() {
                return n
            })
        }
        var Et = L(function(e, t) {
            return e.kludges.source_act === u.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : Object(r.post)(j, {
                act: "a_get_chat_photo",
                msg_id: e.messageId
            }).then(function(n) {
                var r = O(n, 2),
                    o = r[0],
                    i = r[1];
                t.chat_photo_msg = i;
                var a = t.tabs[e.peerId];
                if (t.tabs[e.peerId].photo = o[0], t.tabs[e.peerId].photoLarge = o[1], Object(u.isFullyLoadedTab)(t, e.peerId)) {
                    var s = e.kludges.source_act;
                    a.history = Object(u.addChatPhotoToUpdate)(e, s, t, S(a.history))
                }
                return t
            })
        });

        function yt(e, t, n, r) {
            return t !== vk.id ? Promise.resolve(r) : (Object(u.isTabLoaded)(r, n) && r.peer == n && (r = V(r)), Promise.resolve(r))
        }
        var jt = L(function(e, t) {
                return Object(r.post)(j, {
                    act: "a_leave_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(yt.bind(null, u.CHAT_KICK_USER, vk.id, e, t))
            }),
            wt = L(function(e, t) {
                return Object(r.post)(j, {
                    act: "a_return_to_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(yt.bind(null, u.CHAT_INVITE_USER, vk.id, e, t))
            }),
            Mt = L(function(e, t, n) {
                return Object(r.post)(j, {
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
                }).then(kt.bind(null, e, t))
            });

        function kt(e, t, n) {
            var r = n.mutedPeers.filter(function(t) {
                return t !== e
            });
            return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, V(n)
        }

        function Tt(e, t) {
            return t.stack = e, Promise.resolve(t)
        }
        var Ct = L(function(e, t, n, o) {
            return Pt(e, n, t, o), Object(r.post)(j, {
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

        function Pt(e, t, n, r) {
            if (Object(u.isFullyLoadedTab)(r, t)) {
                var o = r.tabs[t];
                e.filter(function(e) {
                    return o.msgs[e]
                }).forEach(function(e) {
                    var a = Object(_.getMessage)(r, t, e),
                        s = n ? a.flags | i.FLAG_IMPORTANT : a.flags & ~i.FLAG_IMPORTANT;
                    a.flags = s, o.msgs[e] = a, o.history = Object(u.updateStar)(e, n, S(o.history))
                })
            }
            return Promise.resolve(r)
        }

        function Dt(e, t, n) {
            return n.importants || (n.importants = {}), (n.importants[t] || 0) !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
        }

        function xt(e, t) {
            return Object(r.post)(j, {
                act: "a_spam",
                offset: e,
                gid: t,
                part: e > 0
            })
        }

        function At(e, t) {
            return Object(r.post)(j, {
                act: "a_flush_spam",
                gid: t,
                hash: e
            })
        }

        function It(e, t, n) {
            return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
        }

        function Lt(e, t) {
            return Object(r.post)(j, {
                act: "a_owner_photo",
                photo: JSON.parse(e).data[0],
                peer: t
            })
        }

        function St(e, t) {
            return t.next_chat_avatar = e, Promise.resolve(t)
        }

        function Rt(e, t, n) {
            return Object(r.post)("al_page.php", {
                act: "owner_photo_save",
                peer: e,
                _query: t
            }).then(function(e) {
                return n
            })
        }
        var Bt = L(function(e, t, n, o) {
            return o.creating = !0, o.longpoll.pause(), Object(r.post)(j, {
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
                return e ? Rt(t.next_peer, e, t) : t
            }).then(function(e) {
                return e.creating = !1, e
            }).catch(function(e) {
                throw o.creating = !1, o.longpoll.resume(), e
            })
        });

        function Ut(e) {
            var t = void 0;
            e.resync_in_process = new Promise(function(e) {
                t = e
            });
            var n = Object.keys(e.tabs).length,
                o = e.active_tab;
            return Object(r.post)(j, {
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
                    c = r[2],
                    _ = r[3],
                    l = r[4];
                a.forEach(function(t) {
                    return Object(f.oCacheAdd)(e, t)
                }), Object(u.normalizeTabsGotFromServer)(e, i), c.user_unread && handlePageCount("msg", c.user_unread), Object(s.lplog)("Resync success", "success");
                var m = e.peer,
                    b = void 0;
                if (Object(u.isReservedPeer)(m)) b = Promise.resolve(!1);
                else {
                    var p = {
                        tabs: E({}, m, e.tabs[m]),
                        oCache: {}
                    };
                    b = be(E({}, m, i[m]), p)
                }
                return b.then(function(n) {
                    e.tabs = i, e.admins = extend(e.admins, _), n && (e.tabs[m] = n.tabs[m], e.tabs[m].history = Object(u.restoreQueue)(m, e, S(e.tabs[m].history))), e.loadingDialogs = !1, e.mutedPeers = c.mutedPeers, e.lastDialogsOptions = {
                        has_more: c.has_more
                    }, e.dialog_tab_cts = c.folder_cts, e.dialog_tabs[o] = l.map(intval);
                    var r = e.dialog_tabs[o].map(function(t) {
                        return e.tabs[t]
                    });
                    return Object.keys(e.dialog_tabs).filter(function(e) {
                        return e != o
                    }).forEach(function(t) {
                        o == d.FOLDER_ALL ? e.dialog_tabs[t] = r.filter(zt(t)).map(function(e) {
                            return e.peerId
                        }) : e.dialog_tabs[t] = []
                    }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), Ft(intval(c.unread), e)
                })
            }).catch(function(t) {
                return Object(s.lplog)("Resync error: " + t.message + " " + t.stack, "error"), Object(a.pause)(2).then(Ut.bind(null, e))
            })
        }

        function Nt(e, t) {
            return t.lockedSending = e, Promise.resolve(t)
        }

        function Wt(e, t, n) {
            return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
        }

        function Kt(e) {
            return !!e.textMediaSelector.urlAttachmentLoading || !!(window.Upload && Upload.options && Upload.isSomethingUploading) && Object.keys(Upload.options).filter(function(e) {
                return Upload.isSomethingUploading(e)
            }).length > 0
        }

        function Ft(e, t) {
            return t.unread_cnt = e, t.dialog_tab_cts[d.FOLDER_UNREAD] = e, Promise.resolve(t)
        }

        function Ht(e, t) {
            return t.ctrl_submit = !!e, Object(r.post)(j, {
                act: "a_save_ctrl_submit",
                to: t.peer,
                hash: t.tabs[t.peer].hash,
                value: e ? 1 : 0
            }).then(function(e) {
                return t
            })
        }

        function qt(e, t, n) {
            n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
            var r = document.title,
                o = window.devicePixelRatio >= 2 ? "_2x" : "";
            if (t && !n.update_title_to) {
                var i = function(e, t, n) {
                    return function() {
                        n.update_old_title = e;
                        var r = Object.keys(n.cur_unread_cnt).length;
                        if (0 === r) return Object(g.setDocumentTitle)(e || document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
                        e ? (Object(g.setDocumentTitle)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1) : (e = document.title, setFavIcon("/images/icons/favicons/fav_im" + (r > 9 ? 10 : r) + t + ".ico"), Object(g.setDocumentTitle)(winToUtf(getLang("mail_im_new_messages", r))))
                    }
                }(r, o, n);
                n.update_title_to = setInterval(i, 1e3), i()
            } else !t && n.update_old_title && (Object(g.setDocumentTitle)(n.update_old_title), n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + o + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
            return Promise.resolve(n)
        }

        function Gt(e, t, n, r, o) {
            return Object(u.isFullyLoadedTab)(o, e) && (o.tabs[e].scrollTop = intval(t), o.tabs[e].scrollBottom = intval(n), o.tabs[e].contHeight = intval(r)), Promise.resolve(o)
        }

        function zt(e) {
            return e === d.FOLDER_ALL ? function(e) {
                return !Object(u.tabIsMessageRequest)(e)
            } : e === d.FOLDER_UNREAD ? function(e) {
                return e.unread > 0
            } : function(t) {
                return t.folders & d.FOLDER_MASKS[e]
            }
        }

        function Vt(e, t) {
            t.active_tab = e, Object(o.updateLocation)({
                tab: e === d.FOLDER_ALL ? null : e
            });
            var n = [];
            if (e !== d.FOLDER_ALL && !Object(u.isReversedDialogs)(t)) {
                var r = t.dialog_tabs[e];
                n = t.dialog_tabs[d.FOLDER_ALL].map(function(e) {
                    return t.tabs[e]
                }).filter(zt(e)).map(function(e) {
                    return e.peerId
                }), t.dialog_tabs[e] = r.length >= n.length ? r : n
            }
            return Promise.resolve(t)
        }

        function Yt(e, t, n, r) {
            var o = e.dialog_tabs_all;
            return !(!o[d.FOLDER_ALL] && !o[t]) || (n.filter(function(e) {
                return e === r.peerId
            }).length > 0 || ("r" === r.lastmsg[0] || n.map(function(t) {
                return e.tabs[t.toString()]
            }).filter(function(t) {
                return Object(u.isReversedDialogs)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
            }).length > 0))
        }

        function Qt(e, t, n, r, o) {
            if (Object(u.isTabLoaded)(o, e)) {
                var a = o.tabs[e];
                return n === i.REPLACE_DIRECTORIES && (t ^= a.folders),
                    function(e, t, n) {
                        return !(e === i.SET_DIRECTORIES && n.folders & t || !(e !== i.RESET_DIRECTORIES || n.folders & t))
                    }(n, t, a) && Object.keys(d.FOLDER_MASKS).filter(function(e) {
                        return d.FOLDER_MASKS[e] & t
                    }).forEach(function(e) {
                        o.dialog_tab_cts[e] += function(e, t, n) {
                            return t !== i.RESET_DIRECTORIES || e.folders & d.FOLDER_MASKS[n] ? t === i.REPLACE_DIRECTORIES ? e.folders & d.FOLDER_MASKS[n] ? -1 : 1 : t === i.SET_DIRECTORIES ? 1 : -1 : 0
                        }(a, n, e)
                    }), n === i.SET_DIRECTORIES ? o.tabs[e].folders |= t : n === i.RESET_DIRECTORIES ? o.tabs[e].folders &= ~t : o.tabs[e].folders = t ^= a.folders, ne(o, o.tabs[e], !0, function(t, n) {
                        return t.concat([e]).map(function(e) {
                            return o.tabs[e]
                        }).filter(zt(n)).map(function(e) {
                            return e.peerId
                        })
                    }, Yt.bind(null, o)), Promise.resolve(o)
            }
            return U(e, 0, 0, 0, o).then(Qt.bind(null, e, t, n, o))
        }
        var Xt = L(function(e, t) {
                var n = d.FOLDER_MASKS[d.FOLDER_IMPORTANT],
                    o = t.tabs[e].folders & n,
                    a = o ? i.resetDirectoriesEvent : i.setDirectoriesEvent;
                return t.longpoll.push([a([0, e, n, !0])]), Object(r.post)(j, {
                    act: "a_dialog_star",
                    val: o ? 0 : 1,
                    peer: e,
                    hash: t.tabs[e].hash,
                    gid: t.gid
                }).then(function() {
                    return t
                })
            }),
            $t = L(function(e, t, n) {
                var o = d.FOLDER_MASKS[d.FOLDER_UNRESPOND];
                return n.longpoll.push([i.resetDirectoriesEvent([0, e, o, !0]), i.readInboundEvent([6, e, t])]), Object(r.post)(j, {
                    act: "a_mark_answered",
                    peer: e,
                    lastmsg: t,
                    hash: n.tabs[e].hash,
                    gid: n.gid
                }).then(function() {
                    return n
                })
            });

        function Zt(e) {
            return Object(r.post)(j, {
                act: "a_get_mutex_key",
                gid: e
            })
        }

        function Jt(e, t) {
            return B(E({}, e, {
                free: !0
            }), t), Object(r.post)(j, {
                act: "a_block_release",
                peer: e,
                gid: t.gid
            }).then(function() {
                return t
            })
        }

        function en(e, t) {
            var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
            return e && (n ^= 1), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
        }
        var tn = L(function(e, t) {
            return ne(t, t.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), t.tabs[e].deletedDialog = !0, Object(r.post)(j, {
                act: "a_delete_dialog",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(n) {
                return n[0] ? (on(t.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, ne(t, t.tabs[e], !1, ie.bind(null, e), Yt.bind(null, t))), n
            })
        });

        function nn(e, t, n, o) {
            return Object(r.post)(j, {
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

        function rn(e, t, n) {
            return Object(r.post)(j, {
                act: "a_spam_dialog",
                peer: e,
                gid: n.gid,
                hash: t
            })
        }

        function on(e, t, n) {
            return n.tabbedPeers = e, Object(u.isClassicInterface)(n) && (C({
                peers: n.tabbedPeers.filter(function(e) {
                    var t = e.peer,
                        r = e.type;
                    return t !== n.peer && "perm" === r
                }).map(function(e) {
                    return Object(u.getBareTab)(e.peer, n)
                }).filter(function(e) {
                    return !e.deletedDialog
                }).map(function(e) {
                    return e.peerId
                }).map(u.convertPeerToUrl).join("_")
            }), t && P()), Promise.resolve(n)
        }

        function an(e) {
            return !e.peer || (ze(e.peer, e) ? Ge(e.peer, e) : !!Object(u.isFullyLoadedTab)(e, e.peer) && e.tabs[e.peer].allShown)
        }

        function sn(e, t) {
            var n = t.tabs[e];
            return Object(u.isFullyLoadedTab)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
        }

        function cn(e, t) {
            var n = t.tabs[e];
            return Object(u.isFullyLoadedTab)(t, e) && (n.history = R(n.history)), Promise.resolve(t)
        }

        function un(e, t) {
            return t.go_to_end_visible = e, Promise.resolve(t)
        }

        function dn(e, t, n) {
            if (!Object(u.isCommunityPeer)(t)) return Promise.resolve(n);
            var o = Object(_.getTab)(n, t);
            return o.blocked_community = !e, Object(r.post)(j, {
                act: "a_toggle_community",
                peer_id: t,
                hash: o.hash,
                state: e ? 1 : 0
            }).then(function() {
                return V(n)
            })
        }

        function _n(e, t) {
            if (0 !== t.peer && Object(u.isFullyLoadedTab)(t, t.peer)) {
                var n = Object(_.getTab)(t, t.peer);
                n.history = S(n.history), e(n.history)
            }
            return Promise.resolve(t)
        }

        function ln(e) {
            return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
        }

        function fn(e) {
            return e.audio_msg.isRecording = !1, Promise.resolve(e)
        }

        function mn(e, t) {
            return t.voice_message_available = e, Promise.resolve(t)
        }

        function bn(e) {
            C({
                act: e ? "create" : null
            }), P()
        }

        function pn() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            C({
                q: e
            }), P()
        }

        function hn(e) {
            return void 0 === e.chatResizeInitialized && (e.chatResizeInitialized = !0, Object(u.getClassicChatHeight)() > window.clientHeight() && Object(u.setClassicChatHeight)(0)), Promise.resolve(e)
        }
        var gn = L(function(e, t, n) {
            return Object(r.post)(j, {
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
                    return Object(f.oCacheAdd)(n, e)
                }), n.tabs[r] = o, ne(n, o, !1, ie.bind(null, r), Yt.bind(null, n)), n.admins = extend(n.admins, a), [r]
            })
        });

        function vn(e, t) {
            return Object(r.post)(j, {
                act: "a_get_link",
                gid: t.gid,
                chat_id: e
            })
        }
        var On = L(function(e, t) {
            var n = t.tabs[e];
            return Object(r.post)(j, {
                act: "a_reset_link",
                chat_id: e - 2e9,
                write_hash: t.writeHash
            }).then(function(e) {
                return n.inviteLink = e[0], e
            })
        });

        function En(e) {
            return D({
                invite_chat_id: null,
                invite_hash: null
            }), e.invitation = void 0, Promise.resolve(e)
        }

        function yn(e, t) {
            var n = Object(s.arrayUnique)([e].concat(t.select(c.RECENT_SEARCH_OP))).slice(0, 500);
            t.update(c.RECENT_SEARCH_OP, n)
        }

        function jn(e) {
            e.update(c.RECENT_SEARCH_OP, [])
        }

        function wn(e, t) {
            var n = t.select(c.RECENT_SEARCH_OP).filter(function(t) {
                return t !== e
            });
            return t.update(c.RECENT_SEARCH_OP, n), n
        }

        function Mn(e, t, n) {
            var r = n.tabs[t],
                o = Object(_.getMessage)(n, t, e);
            return r.data.kicked || r.data.closed || o.kludges.source_act || (r.pinned = o), Promise.resolve(n)
        }

        function kn(e, t) {
            return t.tabs[e].pinned = null, Promise.resolve(t)
        }
        var Tn = L(function(e, t, n) {
                var o = n.tabs[t];
                return o.data.kicked || o.data.closed ? Promise.resolve(n) : Object(r.post)(j, {
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
            Cn = L(function(e, t) {
                var n = t.tabs[e];
                return n.data.kicked || n.data.closed ? Promise.resolve(t) : Object(r.post)(j, {
                    act: "a_unpin_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(r) {
                    var o = O(r, 1)[0];
                    return t.tabs[e] = Object.assign({}, n, o), t
                })
            }),
            Pn = L(function(e, t) {
                var n = t.tabs[e];
                return Object(r.post)(j, {
                    act: "a_get_pinned_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(e) {
                    var r = O(e, 1)[0];
                    return n.pinned = r || null, t
                })
            }),
            Dn = L(function(e, t, n) {
                var o = n.tabs[e];
                return Object(r.post)(j, {
                    act: "a_get_message_local_id",
                    chat: e,
                    chat_local_id: t,
                    hash: o.hash
                })
            }),
            xn = L(function(e, t) {
                var n = t.tabs[e];
                return n.membersLoaded ? Promise.resolve(t) : Object(r.post)(j, {
                    act: "a_get_chat_members",
                    chat: e,
                    gid: t.gid,
                    hash: n.hash
                }).then(function(e) {
                    var r = O(e, 1),
                        o = O(r[0], 3),
                        i = o[0],
                        a = o[1],
                        s = o[2];
                    return n.memberIds = i, n.adminIds = a, s.forEach(function(e) {
                        return Object(f.oCacheAdd)(t, e)
                    }), n.membersLoaded = !0, t
                })
            }),
            An = L(function(e, t) {
                return Promise.all([xn(e, t), function(e, t) {
                    var n = t.tabs[e];
                    return Object(r.post)(j, {
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
            In = L(function(e, t, n) {
                var o = n.tabs[e];
                return Object(r.post)(j, {
                    act: "a_update_flags",
                    chat: e,
                    hash: o.hash,
                    flags: t
                })
            }),
            Ln = L(function(e, t) {
                var n = t.tabs[e];
                return Object(r.post)("al_page.php", {
                    act: "owner_photo_remove",
                    oid: e,
                    gid: t.gid,
                    hash: n.photoHash
                }).then(function() {
                    return n.photo = null, n.photoLarge = null, t
                })
            });

        function Sn(e, t, n) {
            var r = n.tabs[e];
            return r.memberIds = r.memberIds.filter(function(e) {
                return e !== t
            }), r.adminIds = r.adminIds.filter(function(e) {
                return e !== t
            }), r.membersCount = r.memberIds.length, Promise.resolve(n)
        }
        var Rn = L(function(e, t, n) {
            var o = n.tabs[e];
            return Object(r.post)(j, {
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

        function Bn(e, t, n, r) {
            var o = r.tabs[e];
            return o.adminIds = n ? [].concat(o.adminIds, t).filter(function(e, t, n) {
                return n.indexOf(e) === t
            }) : o.adminIds.filter(function(e) {
                return e !== t
            }), Promise.resolve(r)
        }
        var Un = L(function(e, t, n, o) {
            var i = o.tabs[e];
            return Object(r.post)(j, {
                act: "a_toggle_admin",
                chat: e,
                hash: i.hash,
                mid: t,
                is_admin: +n
            }).then(function() {
                return Bn(e, t, n, o)
            })
        });

        function Nn(e, t, n, r) {
            var o = Object(_.getMessage)(e, n, t).userId;
            return Object(f.oCacheGet)(r, o) ? Promise.resolve(r) : gt(E({}, n, [o]), r)
        }

        function Wn() {
            ajax.post("al_im.php", {
                act: "a_hide_promo_tooltip"
            })
        }

        function Kn() {
            cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
        }
        var Fn = L(function(e, t) {
                return t.tabs[e].top_banner = void 0, Object(r.post)(j, {
                    act: "a_hide_banner",
                    peer_id: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function() {
                    return t
                })
            }),
            Hn = L(function(e, t, n) {
                n.tabs[e].top_banner = void 0;
                var o = n.tabs[e];
                return Object(r.post)(j, {
                    act: "a_callback_banner",
                    peer_id: e,
                    callback_data: t,
                    hash: o.hash
                }).then(function() {
                    return n
                })
            });

        function qn(e, t) {
            return Object(r.post)(j, {
                act: "a_load_banner",
                peer_id: e,
                gid: t.gid
            }).then(function(n) {
                var r = O(n, 1)[0];
                return t.tabs[e].top_banner = r, t
            })
        }

        function Gn(e, t, n) {
            return n.tabs[e].keyboard = t && t.buttons ? t : null, Vn(e, !1, !0, n)
        }

        function zn(e, t) {
            return Gn(e, null, t)
        }

        function Vn(e, t, n, r) {
            return ((r.tabs || {})[e] || {}).keyboard && (r.tabs[e].keyboard.hide = t, n && ls.set("is_keyboards_hide", Object.assign(ls.get("is_keyboards_hide") || {}, E({}, e, t)))), Promise.resolve(r)
        }
        var Yn = L(function(e, t) {
            var n = t.tabs[e];
            return Object(r.post)(j, {
                act: "a_get_keyboard",
                peer_id: e,
                hash: n.hash
            }).then(function(n) {
                var r = O(n, 1)[0];
                return Gn(e, r, t)
            })
        });

        function Qn(e, t, n, o) {
            var i = o.tabs[e];
            return i.caccess[t] = n, Object(r.post)(j, {
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
        var Xn = L(function(e, t) {
            var n = t.tabs[t.peer];
            return Object(r.post)(j, {
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

        function $n(e, t, n) {
            var o = n.tabs[n.peer];
            return Object(r.post)(j, {
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

        function Zn(e, t, n, o) {
            var i = o.tabs[o.peer];
            return Object(r.post)(j, {
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

        function Jn(e, t) {
            if (Object(u.isFullyLoadedTab)(t, e)) {
                var n = Object(_.getTab)(t, e);
                n.allShown = !1, n.lastReset = Date.now()
            }
            return t
        }
    },
    345: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "initDebugTools", function() {
            return o
        }), n.d(t, "logEvalError", function() {
            return i
        }), n.d(t, "debugLog", function() {
            return a
        }), n.d(t, "debugEl", function() {
            return s
        });
        var r = n(191);

        function o() {
            window._logTimer = (new Date).getTime()
        }

        function i(e, t) {
            window.Raven && (t && t.length > 350 && (t = t.slice(0, 150) + "..." + t.slice(-150)), e.message += ": " + t, Raven.captureException(e))
        }

        function a(e) {
            try {
                window.debuglogClient && debuglogClient(e);
                var t = "[" + ((new Date).getTime() - window._logTimer) / 1e3 + "] ";
                if (window.console && console.log) {
                    var n = Array.prototype.slice.call(arguments);
                    n.unshift(t), r.browser.msie || r.browser.mobile ? console.log(n.join(" ")) : console.log.apply(console, n)
                }
            } catch (e) {}
        }

        function s(e) {
            if (!e) return !1;
            var t = e.tagName,
                n = e.id,
                r = e.className,
                o = (t || "").toLowerCase();
            return r && (o += "." + e.className.replace(/\s+/g, ".")), n && !/^__vk/.test(n) && (o += "#" + e.id), o || (e.toString() || "[NULL]")
        }
    },
    44: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "mount", function() {
            return c
        });
        var r = n(336),
            o = n(25),
            i = n(148),
            a = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            o = !1,
                            i = void 0;
                        try {
                            for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                !r && s.return && s.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            s = "_im_join_chat";

        function c(e, t) {
            var n = Object(o.createModule)({
                handlers: function(n, o) {
                    o(e, "click", s, function(e) {
                        return function(e, t) {
                            var n = domData(t, "chat-id"),
                                o = domData(t, "hash");
                            return lockButton(t), Object(r.joinChat)(n, o, e.get()).then(function(n) {
                                var r = a(n, 1)[0];
                                unlockButton(t), e.get().longpoll.push([Object(i.changePeer)(r)])
                            }).catch(function(e) {
                                showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
                            })
                        }(t, e.target)
                    })
                }
            });
            return {
                unmount: function() {
                    Object(o.destroyModule)(n)
                }
            }
        }
    },
    56: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "mount", function() {
            return i
        });
        var r = n(25);

        function o(e) {
            return {
                unmount: function() {
                    Object(r.destroyModule)(e)
                }
            }
        }

        function i(e, t, n) {
            return (0, Object(r.createMutations)(o).bindMutations)(Object(r.createModule)({
                handlers: function(e, t) {}
            }))
        }
    },
    57: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "scrollToY", function() {
            return a
        }), n.d(t, "scrollToTop", function() {
            return s
        }), n.d(t, "scrollGetX", function() {
            return c
        }), n.d(t, "scrollGetY", function() {
            return u
        }), n.d(t, "disableBodyScroll", function() {
            return d
        }), n.d(t, "enableBodyScroll", function() {
            return _
        }), n.d(t, "isBodyScrollEnabled", function() {
            return l
        });
        var r = n(327),
            o = n(126),
            i = n(230);

        function a(e, t, n, s) {
            if (void 0 == t && (t = 400), "ontouchstart" in document.documentElement && (t = 0), s || (e = Math.max(0, e - (vk.staticheader ? 0 : Object(i.getSize)("page_header_cont")[1]))), Object(i.data)(bodyNode, "tween") && Object(i.data)(bodyNode, "tween").stop(!1), Object(i.data)(htmlNode, "tween") && Object(i.data)(htmlNode, "tween").stop(!1), window.scrollAnimation = !1, t) {
                var d = function() {
                    window.scrollAnimation = !1, 2 === n && ("profile" != cur.module && "public" != cur.module && "group" != cur.module && "groups" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, void 0, !0), Object(r.updSideTopLink)())
                };
                window.scrollAnimation = !0, Object(o.animate)(htmlNode, {
                    scrollTop: e
                }, {
                    duration: t,
                    transition: o.Fx.Transitions.sineInOut,
                    onComplete: d
                }), Object(o.animate)(bodyNode, {
                    scrollTop: e
                }, {
                    duration: t,
                    transition: o.Fx.Transitions.sineInOut,
                    onComplete: d
                })
            } else {
                if (n && 2 !== n) {
                    "profile" != cur.module && "public" != cur.module && "group" != cur.module && "event" != cur.module || !window.Wall || Wall.scrollCheck(!1, e, !0);
                    var _ = u() - e;
                    return Math.abs(_) > 6 && a(e + (_ > 0 ? 6 : -6), 0, 2, !0), Object(r.updSideTopLink)(), clearTimeout(window.scrlToTO), void(window.scrlToTO = setTimeout(a.pbind(e, 100, 2, !0), 0))
                }
                window.scroll(c(), e), n || Object(r.updSideTopLink)()
            }
        }

        function s(e) {
            return a(0, e)
        }

        function c() {
            return window.pageXOffset || scrollNode.scrollLeft || document.documentElement.scrollLeft
        }

        function u() {
            return window.pageYOffset || scrollNode.scrollTop || document.documentElement.scrollTop
        }

        function d() {
            bodyNode.style.overflow = "hidden"
        }

        function _() {
            bodyNode.style.overflow = "auto"
        }

        function l() {
            return "hidden" !== bodyNode.style.overflow
        }
    },
    8: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "canMessageBeEdited", function() {
            return c
        }), n.d(t, "convertEmojiHtmlToRegularText", function() {
            return u
        }), n.d(t, "findLastMessageToEdit", function() {
            return d
        }), n.d(t, "wasMessageReallyModified", function() {
            return _
        }), n.d(t, "replaceMsgAfterEdit", function() {
            return l
        });
        var r = n(177),
            o = n(120),
            i = n(257),
            a = n(289),
            s = n(159);

        function c(e, t) {
            t = Object(r.parserMessage)(t);
            var n = vk.id == t.peerId && !Object(s.unpackStore)(e).gid;
            return 333 != t.peerId && (!(!n && !Object(o.isOut)(t)) && (!Object(o.isServiceMsg)(t) && (!(Date.now() / 1e3 - t.date > 86400) && (!(Object(o.isGift)(t) || Object(o.isSticker)(t) || Object(o.isAudioMsg)(t) || Object(o.isGraffiti)(t) || Object(o.isMoney)(t) || Object(o.isVKPay)(t)) && !Object(i.isAlreadyDeleted)(e, t.peerId, t.messageId)))))
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
            var r = Object(a.convertKludgesToAttaches)(t.kludges, t.messageId),
                o = n.dData.attaches;
            if (u(t.text) !== n.dData.txt || r.length !== o.length) return !0;
            for (var i = r.length; i--;) {
                var s = r[i],
                    c = o[i];
                if (s.id != c.id || s.type != c.type || "poll" == s.type && c.object && c.object.poll_is_edited) return !0
            }
            return !1
        }

        function l(e, t, n, r, o, a) {
            t.origText = n, t.text = Object(i.replaceSpecialSymbols)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = o, t.cancelled_shares = a, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
        }
    }
});