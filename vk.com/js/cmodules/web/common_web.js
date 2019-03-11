! function(e) {
    function t(t) {
        for (var o, a, c = t[0], d = t[1], s = t[2], w = 0, u = []; w < c.length; w++) a = c[w], i[a] && u.push(i[a][0]), i[a] = 0;
        for (o in d) Object.prototype.hasOwnProperty.call(d, o) && (e[o] = d[o]);
        for (l && l(t); u.length;) u.shift()();
        return r.push.apply(r, s || []), n()
    }

    function n() {
        for (var e, t = 0; t < r.length; t++) {
            for (var n = r[t], o = !0, c = 1; c < n.length; c++) {
                var d = n[c];
                0 !== i[d] && (o = !1)
            }
            o && (r.splice(t--, 1), e = a(a.s = n[0]))
        }
        return e
    }
    var o = {},
        i = {
            "web/common_web": 0
        },
        r = [];

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
    var c = window.webpackJsonp = window.webpackJsonp || [],
        d = c.push.bind(c);
    c.push = t, c = c.slice();
    for (var s = 0; s < c.length; s++) t(c[s]);
    var l = d;
    r.push([72, "common"]), n()
}({
    "4O8T": function(e, t, n) {
        var o;
        ! function(t) {
            "use strict";

            function i() {}
            var r = i.prototype,
                a = t.EventEmitter;

            function c(e, t) {
                for (var n = e.length; n--;)
                    if (e[n].listener === t) return n;
                return -1
            }

            function d(e) {
                return function() {
                    return this[e].apply(this, arguments)
                }
            }
            r.getListeners = function(e) {
                var t, n, o = this._getEvents();
                if (e instanceof RegExp)
                    for (n in t = {}, o) o.hasOwnProperty(n) && e.test(n) && (t[n] = o[n]);
                else t = o[e] || (o[e] = []);
                return t
            }, r.flattenListeners = function(e) {
                var t, n = [];
                for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
                return n
            }, r.getListenersAsObject = function(e) {
                var t, n = this.getListeners(e);
                return n instanceof Array && ((t = {})[e] = n), t || n
            }, r.addListener = function(e, t) {
                if (! function e(t) {
                        return "function" == typeof t || t instanceof RegExp || !(!t || "object" != typeof t) && e(t.listener)
                    }(t)) throw new TypeError("listener must be a function");
                var n, o = this.getListenersAsObject(e),
                    i = "object" == typeof t;
                for (n in o) o.hasOwnProperty(n) && -1 === c(o[n], t) && o[n].push(i ? t : {
                    listener: t,
                    once: !1
                });
                return this
            }, r.on = d("addListener"), r.addOnceListener = function(e, t) {
                return this.addListener(e, {
                    listener: t,
                    once: !0
                })
            }, r.once = d("addOnceListener"), r.defineEvent = function(e) {
                return this.getListeners(e), this
            }, r.defineEvents = function(e) {
                for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
                return this
            }, r.removeListener = function(e, t) {
                var n, o, i = this.getListenersAsObject(e);
                for (o in i) i.hasOwnProperty(o) && -1 !== (n = c(i[o], t)) && i[o].splice(n, 1);
                return this
            }, r.off = d("removeListener"), r.addListeners = function(e, t) {
                return this.manipulateListeners(!1, e, t)
            }, r.removeListeners = function(e, t) {
                return this.manipulateListeners(!0, e, t)
            }, r.manipulateListeners = function(e, t, n) {
                var o, i, r = e ? this.removeListener : this.addListener,
                    a = e ? this.removeListeners : this.addListeners;
                if ("object" != typeof t || t instanceof RegExp)
                    for (o = n.length; o--;) r.call(this, t, n[o]);
                else
                    for (o in t) t.hasOwnProperty(o) && (i = t[o]) && ("function" == typeof i ? r.call(this, o, i) : a.call(this, o, i));
                return this
            }, r.removeEvent = function(e) {
                var t, n = typeof e,
                    o = this._getEvents();
                if ("string" === n) delete o[e];
                else if (e instanceof RegExp)
                    for (t in o) o.hasOwnProperty(t) && e.test(t) && delete o[t];
                else delete this._events;
                return this
            }, r.removeAllListeners = d("removeEvent"), r.emitEvent = function(e, t) {
                var n, o, i, r, a = this.getListenersAsObject(e);
                for (r in a)
                    if (a.hasOwnProperty(r))
                        for (n = a[r].slice(0), i = 0; i < n.length; i++) !0 === (o = n[i]).once && this.removeListener(e, o.listener), o.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, o.listener);
                return this
            }, r.trigger = d("emitEvent"), r.emit = function(e) {
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
            }, void 0 === (o = function() {
                return i
            }.call(t, n, t, e)) || (e.exports = o)
        }(this || {})
    },
    72: function(e, t, n) {
        e.exports = n("g42W")
    },
    T39b: function(e, t, n) {
        "use strict";
        var o = n("wmvG");
        e.exports = n("4LiD")("Set", function(e) {
            return function() {
                return e(this, arguments.length > 0 ? arguments[0] : void 0)
            }
        }, {
            add: function(e) {
                return o.def(this, e = 0 === e ? 0 : e, e)
            }
        }, o)
    },
    VXxg: function(e, t, n) {
        n("Btvt"), n("XfO3"), n("rGqo"), n("T39b"), e.exports = n("g3g5").Set
    },
    g42W: function(e, t, n) {
        "use strict";
        n.r(t);
        var o, i, r, a, c = n("qKs0"),
            d = n("VXxg");
        String.fromCodePoint || (o = function() {
            try {
                var e = {},
                    t = Object.defineProperty,
                    n = t(e, e, e) && t
            } catch (e) {}
            return n
        }(), i = String.fromCharCode, r = Math.floor, a = function(e) {
            var t, n, o = [],
                a = -1,
                c = arguments.length;
            if (!c) return "";
            for (var d = ""; ++a < c;) {
                var s = Number(arguments[a]);
                if (!isFinite(s) || s < 0 || s > 1114111 || r(s) != s) throw RangeError("Invalid code point: " + s);
                s <= 65535 ? o.push(s) : (t = 55296 + ((s -= 65536) >> 10), n = s % 1024 + 56320, o.push(t, n)), (a + 1 == c || o.length > 16384) && (d += i.apply(null, o), o.length = 0)
            }
            return d
        }, o ? o(String, "fromCodePoint", {
            value: a,
            configurable: !0,
            writable: !0
        }) : String.fromCodePoint = a), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
            value: function(e, t) {
                for (var n = 0; n < this.length; ++n)
                    if (e.call(t, this[n], n, this)) return n;
                return -1
            }
        }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
            value: function(e, t) {
                for (var n = 0; n < this.length; ++n)
                    if (e.call(t, this[n], n, this)) return this[n]
            }
        }), Array.from || (Array.from = function(e) {
            return [].slice.call(e)
        }), Object.assign || Object.defineProperty(Object, "assign", {
            enumerable: !1,
            configurable: !0,
            writable: !0,
            value: function(e, t) {
                if (void 0 === e || null === e) throw new TypeError("Cannot convert first argument to object");
                for (var n = Object(e), o = 1; o < arguments.length; o++) {
                    var i = arguments[o];
                    if (void 0 !== i && null !== i)
                        for (var r = Object.keys(Object(i)), a = 0, c = r.length; a < c; a++) {
                            var d = r[a],
                                s = Object.getOwnPropertyDescriptor(i, d);
                            void 0 !== s && s.enumerable && (n[d] = i[d])
                        }
                }
                return n
            }
        }), Number.isInteger = Number.isInteger || function(e) {
            return "number" == typeof e && isFinite(e) && Math.floor(e) === e
        };
        var s, l, w, u, f, b, h, p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        s = window, l = s.HTMLCanvasElement && s.HTMLCanvasElement.prototype, w = s.Blob && function() {
            try {
                return Boolean(new Blob)
            } catch (e) {
                return !1
            }
        }(), u = w && s.Uint8Array && function() {
            try {
                return 100 === new Blob([new Uint8Array(100)]).size
            } catch (e) {
                return !1
            }
        }(), f = s.BlobBuilder || s.WebKitBlobBuilder || s.MozBlobBuilder || s.MSBlobBuilder, b = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, h = (w || f) && s.atob && s.ArrayBuffer && s.Uint8Array && function(e) {
            var t, n, o, i, r, a, c, d, s;
            if (!(t = e.match(b))) throw new Error("invalid data URI");
            for (n = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), o = !!t[4], i = e.slice(t[0].length), r = o ? atob(i) : decodeURIComponent(i), a = new ArrayBuffer(r.length), c = new Uint8Array(a), d = 0; d < r.length; d += 1) c[d] = r.charCodeAt(d);
            return w ? new Blob([u ? c : a], {
                type: n
            }) : ((s = new f).append(a), s.getBlob(n))
        }, s.HTMLCanvasElement && !l.toBlob && (l.mozGetAsFile ? l.toBlob = function(e, t, n) {
            e(n && l.toDataURL && h ? h(this.toDataURL(t, n)) : this.mozGetAsFile("blob", t))
        } : l.toDataURL && h && (l.toBlob = function(e, t, n) {
            e(h(this.toDataURL(t, n)))
        })), "function" == typeof define && define.amd ? define(function() {
            return h
        }) : "object" == ("undefined" == typeof module ? "undefined" : p(module)) && module.exports ? module.exports = h : s.dataURLtoBlob = h;
        var v = n("E2g8"),
            m = n("4O8T");
        window.EventEmitter = m;
        Function.prototype.pbind = function() {
            var e = Array.prototype.slice.call(arguments);
            return e.unshift(window), this.bind.apply(this, e)
        }, Function.prototype.rpbind = function() {
            var e = Array.prototype.slice.call(arguments);
            return e.unshift(window), this.rbind.apply(this, e)
        }, Function.prototype.rbind = function() {
            var e = this,
                t = Array.prototype.slice.call(arguments),
                n = t.shift(),
                o = t.shift();
            return function() {
                var i = Array.prototype.slice.call(arguments);
                return e.apply(n, t.concat(i)), o
            }
        }, Function.prototype.bind || (Function.prototype.bind = function() {
            var e = this,
                t = Array.prototype.slice.call(arguments),
                n = t.shift();
            return function() {
                var o = Array.prototype.slice.call(arguments);
                return e.apply(n, t.concat(o))
            }
        }), Object.keys || (Object.keys = function(e) {
            var t = [];
            for (var n in e) e.hasOwnProperty(n) && t.push(n);
            return t
        });
        var _ = n("ryw6"),
            g = n("kMSP"),
            O = n("Kngp"),
            y = n("gdug"),
            j = n("k487"),
            k = n("zxIV");

        function T(e, t) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
                var n = Object(k.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(n, icoNode), icoNode = n
            }
        }
        var x = n("HhI8"),
            C = n("7jxN"),
            L = n("Egk5"),
            S = n("t7n3"),
            E = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            o = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(o = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !o && c.return && c.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function A() {
            return new function(e) {
                var t = function(e) {
                        var t = e.split("#"),
                            n = E(t, 2),
                            o = n[0],
                            i = n[1],
                            r = o.split("?"),
                            a = E(r, 2),
                            c = a[0],
                            d = a[1];
                        return c + (d ? "?" + Object(O.b)(Object(O.f)(d)) : "") + (i ? "#" + i : "")
                    },
                    n = Object(S.i)({
                        onLocChange: function() {}
                    }, e),
                    o = function() {
                        var e = "";
                        return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), t(e.replace(/^(\/|!)/, ""))
                    },
                    i = o(),
                    r = function(e) {
                        var t = o();
                        t === i && !0 !== e || (n.onLocChange(t), i = t)
                    },
                    a = void 0;
                return {
                    setLoc: function(e) {
                        i = t(e);
                        var n = (location.toString().match(/#(.*)/) || {})[1] || "";
                        if (!n && vk.al > 1 && (n = (location.pathname || "") + (location.search || "")), (n = (n = t(n)).replace(/^(\/|!)/, "")) !== i) {
                            if (3 == vk.al) try {
                                return window.saveScrollTopOnBack && (delete window.saveScrollTopOnBack, history.replaceState({
                                    scrollTop: window.lastScrollTop,
                                    preventScroll: window.preventLocationScroll
                                }, "", "/" + n), window.preventLocationScroll && delete window.preventLocationScroll), void history.pushState({}, "", "/" + i)
                            } catch (e) {}
                            window.chHashFlag = !0, location.hash = "#" + vk.navPrefix + i
                        }
                    },
                    getLoc: o,
                    init: function() {
                        1 == vk.al && r(!0), 3 == vk.al ? (Object(L.b)(window, "popstate", r), y.a.safari && Object(L.b)(window, "hashchange", r)) : "onhashchange" in window ? Object(L.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : r()
                        }) : a = setInterval(r, 200)
                    },
                    setOptions: function(e) {
                        n = Object(S.i)(n, e)
                    },
                    checker: r,
                    stop: function() {
                        vk.al < 3 ? clearInterval(a) : 3 == vk.al && Object(L.h)(window, "popstate", r)
                    }
                }
            }({
                onLocChange: function(e) {
                    var t = {
                        back: !0,
                        hist: !0
                    };
                    3 === vk.al && history.state && Object(S.x)(history.state) && (t.scrollTop = Object(S.r)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
                }
            })
        }
        var F = n("4+be"),
            N = n("lXE5"),
            P = n("Ia1d"),
            B = n("XuKo"),
            I = n("ErRf"),
            M = n("/PiP"),
            V = {
                sh: function(e, t) {
                    Object(k.tb)(e), Object(S.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(k.W)(e), Object(S.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, n, o) {
                    var i = "layers" + (boxQueue.count() + 1);
                    Object(I.c)(i, function() {}), Object(k.qb)(e, {
                        opacity: n || "",
                        backgroundColor: o || ""
                    }), V.visible || (Object(x.c)(), Object(N.a)()), V.visible || Object(P.f)(), V.visible = !0, Object(k.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(k.hb)(t, "box_layer_hidden") : Object(k.tb)(t), V.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    V.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(I.a)(e), t && t.visibilityHide ? Object(k.a)(t, "box_layer_hidden") : Object(k.W)(t), Object(k.ab)(layerWrap) || cur._inLayer || Object(k.ab)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(k.ab)(window.mvLayerWrap)) || Object(k.ab)(window.wkLayerWrap) || (V.visible = !1, Object(k.hb)(bodyNode, "layers_shown"), Object(x.c)(!0), Object(N.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), V.visible || Object(P.g)()
                }
            },
            H = {
                push: function(e) {
                    var t = void 0,
                        n = !!H.count() && H._layers[H._layers.length - 1];
                    if (cur.pvShown && "temp" != cur.pvListId) t = ["photo", cur.pvData[cur.pvListId][cur.pvIndex].id, cur.pvListId, {
                        onHide: cur.pvOptions.onHide,
                        scroll: cur.pvNarrowScrollbar ? cur.pvNarrowScrollbar.data.scrollTop : 0,
                        onShow: e,
                        noHistory: !!cur.pvNoHistory,
                        histLen: cur.pvHistoryLength
                    }];
                    else if (window.mvcur && mvcur.mvShown && !mvcur.minimized) {
                        var o = mvcur.options && (mvcur.options.autoplay || mvcur.options.focusPlay),
                            i = {
                                scroll: mvLayerWrap.scrollTop,
                                noHistory: !!mvcur.noHistory,
                                nomin: 1,
                                autoplay: o,
                                prevLoc: mvcur.mvPrevLoc
                            };
                        VideoPlaylist.getCurListId() && (i = Object(S.i)(i, {
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
                    return n && t[0] == n[0] && t[1] == n[1] && t[2] == n[2] || H._layers.push(t), H.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = H._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    H._bl = !0, window.WkView && V.fullhide == WkView.hide ? (Object(k.W)(wkLayerWrap), clearTimeout(wkcur.showT)) : V.fullhide && V.fullhide(!0, !0), setTimeout(H.unblock, 5)
                },
                unblock: function() {
                    H._bl = !1
                },
                pop: function() {
                    if (H.count() && !H._bl) {
                        var e = H._layers.pop();
                        if (H.skipVideo && (H.skipVideo = !1, "video" == e[0])) return H._layers.push(e), void(H.skipVideo = !1);
                        "photo" === e[0] ? (Object(S.i)(e[3], {
                            fromQueue: !0
                        }), Object(M.x)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(S.i)(e[3], {
                            fromQueue: !0
                        }), Object(P.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(M.B)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(B.c)(e[1]) : "podcast" === e[0] && Object(M.z)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, n, o) {
                    for (var i = H._layers, r = i.length; r > 0; --r)
                        if (i[r - 1][0] == e && i[r - 1][1] == t || i[r - 1][0] == n && i[r - 1][1] == o) return H._layers = i.slice(0, r), H.pop(), !0;
                    return !1
                },
                count: function() {
                    return H._layers.length
                },
                clear: function() {
                    H._layers = []
                },
                _layers: []
            };
        var D = n("0DAA");

        function R() {
            var e = {};
            Object(S.f)(Object(k.G)("_short_currency"), function() {
                var t = Object(k.s)(this, "short") || "";
                if (!t) return !0;
                var n = this.innerHTML,
                    o = Object(S.M)(n).length,
                    i = Object(k.O)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[i]) {
                    for (var r = "", a = o - 1; a >= 0; a--) r += "&#8399;";
                    var c = Object(k.e)("div", {
                        innerHTML: "<b>" + n + "</b><b>" + r + "</b>"
                    }, {
                        fontFamily: i,
                        fontSize: "24px"
                    });
                    Object(k.F)("utils").appendChild(c), e[i] = Math.abs(c.firstChild.offsetWidth - c.lastChild.offsetWidth) >= 2 * o, Object(k.fb)(c)
                }!1 === e[i] && Object(k.yb)(this, t)
            })
        }
        var q = function(e) {
            return "cmodules/" + e
        };

        function W(e) {
            var t = "";
            return stTypes.fromLib[e] ? t += "lib/" : stTypes.fromCompiled && stTypes.fromCompiled[e] ? t += q("web/") : /^lang\d/i.test(e) || stTypes.fromRoot[e] || -1 !== e.indexOf("/") || (t += "al/"), t
        }
        var z = {
            _waiters: [],
            _wait: function() {
                var e = z._waiters.length,
                    t = {},
                    n = [];
                if (!e) return clearInterval(z._waitTimer), void(z._waitTimer = !1);
                for (var o = 0; o < e; ++o) {
                    for (var i = z._waiters[o][0], r = 0, a = i.length; r < a; ++r) {
                        var c = i[r];
                        if (!t[c])
                            if (StaticFiles[c].l || "css" !== StaticFiles[c].t || "none" !== Object(k.O)(StaticFiles[c].n, "display") || z.done(c), StaticFiles[c].l) t[c] = 1;
                            else if (t[c] = -1, vk.loaded) {
                            var d = ++StaticFiles[c].c;
                            (d > z.lowlimit && stVersions[c] > 0 || d > z.highlimit) && (stVersions[c] < 0 ? (Object(_.c)("<b>Error:</b> Could not load <b>" + c + "</b>.", {
                                dt: 5,
                                type: 1,
                                msg: "Failed to load with " + z.lowlimit + "/" + z.highlimit + " limits (" + (Object(S.L)() - vk.started) / 100 + " ticks passed)",
                                file: c
                            }), StaticFiles[c].waitersLength = 1, t[c] = 1) : (Object(_.d)("Some problems with loading <b>" + c + "</b>...", 5), stVersions[c] = Object(S.s)(-1e4, -1), z._add(c, StaticFiles[c])))
                        }
                        t[c] > 0 && (i.splice(r, 1), --r, --a)
                    }
                    i.length || (n.push(z._waiters.splice(o, 1)[0][1]), o--, e--)
                }
                for (var s = 0, l = n.length; s < l; ++s) n[s]()
            },
            _addCss: function(e, t) {
                var n = Object(k.e)("style", {
                        type: "text/css",
                        media: "screen"
                    }),
                    o = Object(k.y)(t);
                return o ? headNode.insertBefore(n, o) : headNode.appendChild(n), n.sheet ? n.sheet.insertRule(e, 0) : n.styleSheet && (n.styleSheet.cssText = e), n
            },
            _srcPrefix: function(e, t) {
                return -1 === e.indexOf(".js") && -1 === e.indexOf(".css") || function(e) {
                    for (var t = 0; t < vk.stExcludedMasks.length; t++)
                        if (-1 !== e.indexOf(vk.stExcludedMasks[t])) return !0;
                    return !1
                }(e) ? "" : vk.stDomain || ""
            },
            _add: function(e, t) {
                var n = e.replace(/[\/\.]/g, "_"),
                    o = stVersions[e],
                    i = e + "?" + o,
                    r = z._srcPrefix(e, o);
                if (StaticFiles[e] = {
                        v: o,
                        n: n,
                        l: 0,
                        c: 0
                    }, -1 !== e.indexOf(".js")) {
                    var a = "/js/" + W(e);
                    if (StaticFiles[e].t = "js", e === q("web/common_web.js")) setTimeout(z.done.bind(z).pbind(q("web/common_web.js")), 0);
                    else {
                        var c = r + a + i;
                        z._insertNode(c, e), StaticFiles[e].src = c
                    }
                } else if (-1 !== e.indexOf(".css")) {
                    var d = r + ("/css/" + (vk.css_dir || "") + (stTypes.fromRoot[e] || -1 !== e.indexOf("/") ? "" : "al/")) + i;
                    t && t.l && "css" === t.t && (StaticFiles[e].styleNode = z._addCss("#" + n + " {display: block; }", z._getOldNode(d))), z._insertNode(d, e), StaticFiles[e].t = "css", StaticFiles[e].src = d, Object(k.F)(n) || utilsNode.appendChild(Object(k.e)("div", {
                        id: n
                    }))
                }
            },
            _getOldNode: function(e) {
                return !!headNode.querySelector && ((e = e.split("?")[0]).match(/\.css$/) ? headNode.querySelector('link[href^="' + e + '"]') : headNode.querySelector('script[src^="' + e + '"]'))
            },
            _insertNode: function(e, t) {
                var n = e.split("?")[0].match(/\.css$/),
                    o = z._getOldNode(e);
                n && StaticFiles[t] && StaticFiles[t].styleNode ? o = Object(k.y)(StaticFiles[t].styleNode) : o && (o = Object(k.y)(o));
                var i = void 0;
                n ? (i = Object(k.e)("link", {
                    type: "text/css",
                    rel: "stylesheet",
                    href: e
                })).onload = function() {
                    z._removeDuplicateNodes(t)
                } : i = Object(k.e)("script", {
                    type: "text/javascript",
                    src: e
                }), o ? headNode.insertBefore(i, o) : headNode.appendChild(i)
            },
            _removeDuplicateNodes: function(e) {
                var t = StaticFiles[e];
                if (t && t.src) {
                    var n = t.src.split("?")[0],
                        o = z._getOldNode(n);
                    if (o) {
                        t.styleNode && (Object(k.fb)(t.styleNode), delete StaticFiles[e].styleNode);
                        for (var i = n.match(/\.css$/); o && (o = Object(k.y)(o));) {
                            var r = i ? o.href : o.src;
                            if (!r) break;
                            if ((r = r.replace(/^(https?:\/\/([a-z0-9\-\.\_]+))?vk\.com/, "")).split("?")[0] !== n) break;
                            Object(k.fb)(Object(k.A)(o))
                        }
                    }
                }
            },
            add: function(e, t, n) {
                var o = [],
                    i = document.documentElement;
                for (var r in Object(S.t)(e) || (e = [e]), e)
                    if (e.hasOwnProperty(r)) {
                        var a = e[r];
                        if (a) {
                            -1 !== a.indexOf("?") && (a = a.split("?")[0]);
                            var c = "";
                            ~a.indexOf(".js") && (c = W(a)), /^lang\d/i.test(a) ? stVersions[a] = stVersions.lang : stVersions[c + a] || (stVersions[c + a] = 1);
                            var d = "/js/" + c + a;
                            window.stDeps && window.stDeps[d] && window.stDeps[d].forEach(function(e) {
                                z.add(e)
                            }), (y.a.opera && 768 == i.clientHeight && 1024 == i.clientWidth || __debugMode) && !y.a.iphone && !y.a.ipad && a !== q("web/common_web.js") && "common.css" !== a && stVersions[a] > 0 && stVersions[a] < 1e9 && (stVersions[a] += Object(S.s)(1e9, 2e9));
                            var s = StaticFiles[a];
                            s && s.v == stVersions[a] || z._add(a, s), t && !StaticFiles[a].l && o.push(a)
                        }
                    }
                if (t) {
                    if (!o.length) return !0 === n ? setTimeout(t, 0) : t();
                    z._waiters.push([o, t]), z._waitTimer || (z._waitTimer = setInterval(z._wait, 100))
                }
            },
            done: function(e) {
                stVersions[e] < 0 && Object(_.d)('<b>Warning:</b> Something is bad, please <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.', 10), StaticFiles[e].l = 1, "js" === StaticFiles[e].t && z._removeDuplicateNodes(e)
            }
        };
        var U = n("XzvV"),
            G = n("v+DW"),
            K = n("lkNA");
        var Q = function() {
                function e() {
                    var t = this;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var n = window.CallHub;
                    this.on = 0, this.hub = new n(function() {
                        t.onShow && t.onShow()
                    }, 2), this.hintsHub = new n(function() {
                        return t.showStartHints()
                    }, 2)
                }
                return e.prototype.load = function() {
                    var e = this;
                    Object(k.F)("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", function() {
                        return e.hub.done()
                    }), ajax.post("hints.php", {
                        act: "a_start_hints"
                    }, {
                        onDone: function(t) {
                            e.startHintsText = Object(S.H)(t), e.hintsHub.done()
                        }
                    }))
                }, e.prototype.show = function(e) {
                    var t = window.placeholderSetup;
                    if (Object(k.F)("quick_search") && !this.on) return this.on = 1, Object(k.tb)(this.sCont), t("search_input"), Object(k.F)("search_input").setAttribute("autocomplete", "off"), Object(k.a)(Object(k.F)("qsearch_link"), "active"), this.prev_content = Object(k.F)("content"), this.qsearch_cont || (this.qsearch_cont = Object(k.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(L.c)(e) : void 0
                }, e.prototype.go = function(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(S.H)(Object(k.F)("search_input").value) + "&name=1";
                    return Object(L.c)(e || window.event), location.href = t, !1
                }, e.prototype.init = function(e) {
                    this.sCont = Object(k.F)("quick_search"), this.opt = e || {}
                }, e.prototype.hide = function(e, t) {
                    if (Object(k.F)("quick_search") && (!this.active || t) && this.on) {
                        var n = window.toggleFlash;
                        if (this.on = 0, n(), this.beforeHide && this.beforeHide()) return !0;
                        Object(k.F)("search_input").setValue ? Object(k.F)("search_input").setValue("") : Object(k.F)("search_input").value = "", Object(k.W)(this.sCont), Object(k.hb)(Object(k.F)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }, e.prototype.preload = function() {}, e
            }(),
            X = n("Bszp"),
            Y = n("MSYF"),
            J = n("kHqu"),
            $ = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            o = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(o = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !o && c.return && c.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            Z = "remixjsp";

        function ee() {
            var e;
            (e = window.performance) && e.getEntriesByType && e.getEntriesByType("paint").forEach(function(e) {
                    "first-contentful-paint" === e.name && re(e.startTime, "TTFCP")
                }),
                function() {
                    var e = window.performance;
                    e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(function(e) {
                        if ("navigation" === e.initiatorType) {
                            var t = e.domComplete,
                                n = e.domContentLoadedEventEnd,
                                o = e.loadEventEnd;
                            re(t, "domComplete"), re(n, "domContentLoadedEventEnd"), re(o, "loadEventEnd")
                        }
                    })
                }(), oe()
        }
        var te = [],
            ne = !1;

        function oe() {
            if (ne) {
                var e = window.performance,
                    t = te[te.length - 1];
                if (!t) return ne = !1, void re(-1);
                var n = t.startTime + t.duration;
                e.now() - n >= 3e3 ? re(n, "TTI") : setTimeout(oe, 3e3)
            }
        }
        var ie = [];

        function re(e, t) {
            var n = Math.floor(e);
            if (-1 !== e && (ie.push([n, t]), !(ne ? "TTI" === t : ie.length > 2))) return;
            var o = "unknown",
                i = navigator.connection;
            i && i.effectiveType && (o = i.effectiveType);
            var r = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            ie.forEach(function(e) {
                var t = $(e, 2),
                    n = t[0],
                    i = t[1];
                return r.events.push([i, n, cur.module, o, window.vk.rv])
            }), Object(g.d)(Z, JSON.stringify(r), .01)
        }

        function ae() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(function(e) {
                te = te.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), ne = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout(ee, 0)
            }) : ee()
        }
        var ce = {
                GROUPS_ADMIN_LEVEL_USER: 0,
                GROUPS_ADMIN_LEVEL_MODERATOR: 1,
                GROUPS_ADMIN_LEVEL_EDITOR: 2,
                GROUPS_ADMIN_LEVEL_ADMINISTRATOR: 3,
                GROUPS_ADMIN_LEVEL_HOST: 4,
                GROUPS_ADMIN_LEVEL_EVENT_CREATOR: 5,
                GROUPS_ADMIN_LEVEL_CREATOR: 6,
                GROUPS_ADMIN_PSEUDO_LEVEL_ADVERTISER: 100,
                GROUPS_ADMIN_FLAG_ADS: 8
            },
            de = n("1BRX"),
            se = n("8+we"),
            le = n("98sY"),
            we = n("El3O"),
            ue = n("EasH"),
            fe = n("kcIO"),
            be = n("FWc3");

        function he(e, t) {
            var n = t.asrtl ? 0 : t.right ? 289 : 35,
                o = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
            return Object(be.c)(e, {
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
                shift: [n, 8, 7],
                className: "mobile_tt" + o
            })
        }

        function pe(e, t) {
            return Object(be.c)(e, {
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

        function ve(e, t, n) {
            if (!cur._addRestoreInProgress) {
                var o = Object(k.T)("_audio_row", e),
                    i = AudioUtils.getAudioFromEl(o, !0),
                    r = Object(k.s)(e, "action"),
                    a = AudioUtils.getRowActionName(r, i, o),
                    c = {
                        text: function() {
                            return a
                        },
                        black: 1,
                        shift: t || [7, 4, 0],
                        needLeft: !0,
                        forcetodown: n
                    };
                Object(k.T)("_im_mess_stack", e) ? (c.appendParentCls = "_im_mess_stack", c.shift = [7, 10, 0], c.noZIndex = !0) : Object(k.T)("top_notify_wrap", e) ? c.appendParentCls = "top_notify_wrap" : Object(k.T)("_ape_audio_item", e) && (c.appendParentCls = "_ape_audio_item"), Object(be.c)(e, c)
            }
        }

        function me(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            Object(be.c)(e, {
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
                appendEl: Object(k.n)("im-page-history-w", e) || Object(k.n)("rb_box_wrap", e) || Object(k.n)("wk_cont", e) || Object(k.n)("scroll_fix_wrap", e)
            })
        }

        function _e(e) {
            var t = "";
            Object(k.T)("_im_mess_stack", e) && (t = "_im_mess_stack"), Object(be.c)(e, {
                className: "bookmarks_tt ",
                shift: [32, 8],
                text: function() {
                    return "1" === Object(k.s)(e, "state") ? Object(k.s)(e, "remove") : Object(k.s)(e, "add")
                },
                black: 1,
                appendParentCls: t
            })
        }
        var ge = n("Ieup"),
            Oe = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            o = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var a, c = e[Symbol.iterator](); !(o = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !o && c.return && c.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var ye = {
            maxHeight: 300,
            tabs: {},
            counters: {},
            showFriends: function() {
                curFastChat.clistBox.visible ? curFastChat.clistBox.options.fixed ? FastChat.clistHide() : curFastChat.clistBox.show() : (FastChat.clistShow(), ye.cont.tt && ye.cont.tt.destroy && ye.cont.tt.destroy())
            },
            showTT: function() {
                if (!Object(k.V)(ye.wrap, "chat_active") && !Object(k.V)(ye.wrap, "chat_expand")) {
                    var e = y.a.mac ? "Cmd" : "Ctrl";
                    Object(be.c)(ye.cont, {
                        text: Object(F.d)("head_fr_online_tip") + " (" + e + "+?)",
                        shift: [-2, 4, 0],
                        showdt: 0,
                        black: 1
                    })
                }
            },
            init: function() {
                ye.wrap = Object(k.e)("div", {
                    id: "chat_onl_wrap",
                    className: "chat_onl_wrap",
                    innerHTML: '\n<div class="chat_tt_wrap"></div>\n<div class="chat_onl_inner">\n  <div class="chat_cont_scrolling"><div class="chat_onl_height"></div></div>\n  <div class="chat_cont_sh_top"></div>\n  <div class="chat_cont_sh_bottom"></div>\n  <a class="chat_tab_wrap" id="chat_tab_wrap" onclick="Chat.showFriends()" onmouseover="Chat.showTT();">\n    <div class="chat_onl_cont">\n      <div class="chat_onl" id="chat_onl"></div>\n    </div>\n  </a>\n</div>'
                }), utilsNode.appendChild(ye.wrap), ye.scrollNode = Object(k.H)("chat_cont_scrolling", ye.wrap), ye.ttNode = Object(k.H)("chat_tt_wrap", ye.wrap), ye.itemsCont = ye.scrollNode.firstChild, ye.onl = Object(k.F)("chat_onl"), ye.cont = ye.onl.parentNode.parentNode, Object(k.W)(ye.wrap), ye.inited = !0, stManager._addCss(".layers_shown .chat_onl_wrap {margin-right: " + Object(G.t)() + "px;}")
            }
        };

        function je(e, t, n, o) {
            var i = Object(S.r)(y.a.version);
            if (e && (y.a.chrome && i > 14 || y.a.mozilla && i > 13 || y.a.opera && i > 2)) {
                var r = "all " + n.duration + "ms " + (n.func || "ease-out");
                e.style.WebkitTransition = r, e.style.MozTransition = r, e.style.OTransition = r, e.style.transition = r;
                var a = function t() {
                    return y.a.opera && Object(S.r)(y.a.version) <= 12 ? e.removeEventListener("oTransitionEnd", t) : Object(L.h)(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", t), e.style.WebkitTransition = "", e.style.MozTransition = "", e.style.OTransition = "", e.style.transition = "", o && o(), !1
                };
                o && (y.a.opera && Object(S.r)(y.a.version) <= 12 ? e.addEventListener("oTransitionEnd", a) : Object(L.b)(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", a)), setTimeout(k.qb.pbind(e, t), 0)
            } else Object(C.b)(e, t, Object(S.i)(n, {
                onComplete: o
            }))
        }

        function ke(e) {
            return cur.fifaConfettiEnabled && window.Fifa2018 ? /\w+=["']+[^"']*([Гг][Оо]+[Лл]|go+a+l).*["']+/gi.test(e) ? e : (e = e.replace(/&#33;/g, "!")).replace(/(^|[^a-zа-яА-ЯёЁ0-9])((?:[Гг][Оо]+[Лл]|go+a+l)[\!]*)(?=[^a-zа-яА-ЯёЁ0-9]+?|$)([\!])?/gi, function(e) {
                return ((arguments.length <= 1 ? void 0 : arguments[1]) || "") + '<span class="fifa_confettiLink" onclick="Fifa2018.startFlapper(this); return false;">' + (((arguments.length <= 2 ? void 0 : arguments[2]) || "") + ((arguments.length <= 3 ? void 0 : arguments[3]) || "")) + "</span>"
            }) : e
        }

        function Te(e, t) {
            var n = [],
                o = 0,
                i = null,
                r = Object(S.i)({
                    top_load: 0,
                    bottom_load: 2,
                    load_limit: 10,
                    need_load_class: "__need_load",
                    skip_process_load: !1,
                    use_iframe: !1
                }, t),
                a = {};

            function c(e, t) {
                n[e] && (--o, delete n[e]), t || a.processLoad()
            }

            function d(t) {
                var n = 0,
                    o = t;
                if (o && o.offsetParent)
                    do {
                        if (n += o.offsetTop, e && o.offsetParent === e) break
                    } while (o = o.offsetParent);
                return n
            }
            return a.processLoad = function() {
                if (Object(S.f)(n, function(e, t) {
                        var o = Oe(t, 2),
                            i = o[0],
                            r = o[1];
                        (r.width || r.height || Object(S.L)() - i > 2e4) && n[e] && c.call(r, e, !0)
                    }), clearTimeout(i), o && (i = setTimeout(a.processLoad, 500)), !(o >= r.load_limit)) {
                    var t = Object(k.G)(r.need_load_class, e || bodyNode),
                        s = [],
                        l = void 0,
                        w = void 0;
                    if (e && t.length) {
                        var u = e.offsetHeight;
                        l = e.scrollTop - u * r.top_load, w = e.scrollTop + u * r.bottom_load
                    }
                    for (var f = 0, b = t.length; f < b && o < r.load_limit; f++) {
                        var h = t[f];
                        if ("IMG" === h.tagName) {
                            var p = h.getAttribute("data-src");
                            if (p) {
                                if (e) {
                                    var v = d(h),
                                        m = v + h.parentNode.offsetHeight;
                                    if (v > w) continue;
                                    if (m < l) continue
                                }
                                s.push([h, p])
                            }
                        }
                    }
                    Object(S.f)(s, function(e, t) {
                        var i = Oe(t, 2),
                            d = i[0],
                            s = i[1];
                        a.iloader && a.iloader.add(s, c, d), d.src = s, d.removeAttribute("data-src"), Object(k.hb)(d, r.need_load_class), n[s] || (o++, n[s] = [Object(S.L)(), d])
                    }), clearTimeout(i), o && (i = setTimeout(a.processLoad, 500))
                }
            }, a.destroy = function() {
                n = [], o = 0, clearTimeout(i)
            }, r.use_iframe && (a.iloader = new function() {
                var e = void 0,
                    t = void 0,
                    n = void 0,
                    o = void 0,
                    i = void 0,
                    r = void 0;

                function a(e) {
                    return t && t.body ? t.getElementById("___img" + e) : Object(k.H)("___img" + e, n)
                }

                function c() {
                    e = utilsNode.appendChild(Object(k.e)("iframe")), t = function(e) {
                        if (y.a.mozilla) return !1;
                        try {
                            return e.contentDocument ? e.contentDocument : e.contentWindow && e.contentWindow.document ? e.contentWindow.document : e.document
                        } catch (e) {}
                        return !1
                    }(e), n = t && t.body ? t.body : utilsNode.appendChild(Object(k.e)("div", {}, {
                        display: "none"
                    })), o = 0, i = []
                }

                function d(e, r, c) {
                    var d = o++;
                    i[d] = {
                        src: e,
                        onLoad: r,
                        that: c
                    }, n.appendChild(Object(k.e)("div", {
                        innerHTML: function(e) {
                            return t && t.body ? '<img id="___img' + e + '" />' : '<img class="___img' + e + '" />'
                        }(d)
                    }));
                    var s = a(d);
                    return s.src = e, s.onload = function() {
                        var e = i[d];
                        e && (e.onLoad && e.onLoad.call(e.that || window, e.src), delete i[d], n.removeChild(a(d).parentNode))
                    }, s
                }
                return c(), {
                    add: d,
                    abort: function() {
                        Object(k.fb)(e), r = [].concat(function(e) {
                            if (Array.isArray(e)) {
                                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                                return n
                            }
                            return Array.from(e)
                        }(i.filter(function(e) {
                            return void 0 !== e
                        }))), c()
                    },
                    repeat: function(e) {
                        if (!r) return [];
                        var t = [];
                        if (Object(S.f)(r, function(e, n) {
                                d(n.src, n.onLoad, n.that), t.push(n.that)
                            }), r = null, e) {
                            var n = [];
                            Object(S.f)(t, function() {
                                n.push([this, this.src]), this.src = "", Object(k.W)(this)
                            }), setTimeout(function() {
                                Object(S.f)(n, function(e, t) {
                                    var n = Oe(t, 2),
                                        o = n[0],
                                        i = n[1];
                                    o.src = i, Object(k.tb)(o)
                                })
                            }, 10)
                        }
                        return t
                    }
                }
            }), r.skip_process_load || a.processLoad(), a
        }

        function xe(e, t) {
            var n = {
                act: "hide_block",
                block: e,
                hash: t
            };
            ajax.post("al_index.php", n), Object(k.W)("news_announce_" + e)
        }

        function Ce(e, t) {
            function n() {
                Object(C.b)("ads_ad_close_info_" + e, {
                    opacity: 1
                }, 200, o)
            }

            function o() {
                Object(k.qb)("ads_ad_box2_" + e, {
                    visibility: "hidden"
                })
            }
            Object(k.qb)("left_hide" + e, {
                visibility: "hidden"
            }), ajax.post(t, {}, {
                noAds: !0,
                onDone: function(t) {
                    if (!t.done) return;
                    if ("ya_direct" === e) return Object(C.b)(e, {
                        opacity: 0
                    }, 200, function() {
                        Object(k.fb)("ya_direct"), setTimeout(function() {
                            AdsLight.updateBlock("force_hard", 2)
                        }, 5e3)
                    }), void(window.vk__adsLight.yaDirectAdActive = !1);
                    var o = Object(k.F)("ads_ad_close_info_" + e);
                    if (!o) return !1;
                    Object(k.qb)(o, {
                        opacity: 0
                    }), o.style.setProperty("display", "block", "important"), setTimeout(n, 0)
                }
            })
        }

        function Le(e, t, n, o, i) {
            o && stManager.add(["tooltips.css", "tooltips.js"]), cur.mfid = e, ajax.post("al_friends.php", {
                act: o ? "add" : "remove",
                mid: e,
                mf_type: t,
                hash: n,
                from: "leftblock"
            }, {
                onDone: function(t, n, o) {
                    if (!t) return nav.reload();
                    var i = Object(k.F)("left_friend_status_" + e);
                    Object(k.g)(i.firstChild), t ? (Object(k.tb)(i), Object(k.yb)(i, t)) : Object(k.W)(i), n && (ajax.preload("al_friends.php", {
                        act: "friend_tt",
                        mid: e
                    }, [n, o]), setTimeout(Se, 0))
                },
                showProgress: function() {
                    var t = (Object(k.F)("left_friend_subscribed") || {}).tt;
                    t && (t.hide({
                        fasthide: 1
                    }), t.destroy()), Object(k.F)("left_friend_status_" + e).innerHTML = '<img src="/images/upload' + (window.devicePixelRatio >= 2 ? "_2x" : "") + '.gif" width="32" />'
                },
                hideProgress: function() {
                    return Object(k.W)("left_friend_status_" + e)
                },
                onFail: function(e) {
                    if (e) return Object(ue.d)({
                        title: Object(F.d)("global_error")
                    }, e), !0
                }
            }), Object(L.c)(i)
        }

        function Se() {
            return Object(be.c)(Object(k.F)("left_friend_subscribed"), {
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

        function Ee() {
            clearTimeout(window.__qlTimer), setTimeout(function() {
                return clearTimeout(window.__qlTimer)
            }, 2e3)
        }

        function Ae(e) {
            if (y.b.cmaEnabled && window.ResizeObserver && Object(k.yb)("quick_email")) {
                var t = new PasswordCredential({
                    id: Object(k.F)("quick_email").value,
                    password: Object(k.F)("quick_pass").value,
                    name: e.name,
                    iconURL: e.photo_50
                });
                navigator.credentials.store(t)
            }
        }

        function Fe(e, t) {
            Ee(), Ae(t), nav.reload({
                force: !0,
                from: 6
            })
        }

        function Ne(e, t) {
            switch (Ee(), e) {
                case -1:
                    location.href = location.href.replace(/^http:/, "https:");
                    break;
                case 4:
                    var n = "/login?m=1" + (t.expire ? "&s=0" : "");
                    Object(S.f)(["email", "ul", "pch"], function(e, o) {
                        t[o] && (n += "&" + o + "=" + t[o])
                    }), location.href = n;
                    break;
                default:
                    location.href = "/login"
            }
        }

        function Pe(e, t) {
            Ee(), Object(G.w)(window.__qfBtn), window.qloginBox = Object(ue.c)(e, t, window.qloginBox, {
                onSubmit: function(e, t) {
                    Object(k.F)("quick_captcha_sid").value = e, Object(k.F)("quick_captcha_key").value = t, Object(k.F)("quick_login_form").submit()
                },
                onHide: function() {
                    return window.qloginBox = !1
                }
            })
        }

        function Be(e, t) {
            Ee(), Object(G.w)(window.__qfBtn), window.qloginBox = Object(ue.e)(e, t, window.qloginBox, {
                onSubmit: function(e) {
                    Object(k.F)("quick_recaptcha").value = e, Object(k.F)("quick_login_form").submit()
                },
                onHide: function() {
                    return window.qloginBox = !1
                }
            })
        }

        function Ie(e, t) {
            Object(k.qb)(e, {
                backgroundColor: "#F5F7FA"
            }), Object(C.b)(e, {
                backgroundColor: "#FFF"
            }, t || 6e3, function(e) {
                Object(k.qb)(e, {
                    backgroundColor: null
                })
            })
        }
        var Me = n("aong"),
            Ve = .5,
            He = .25,
            De = 300,
            Re = 1e3,
            qe = 3e5,
            We = 2500,
            ze = 5e3,
            Ue = 6e3,
            Ge = 2e4,
            Ke = 1e3,
            Qe = 36e4,
            Xe = "_longViewType",
            Ye = "_longViewIdled",
            Je = "_longViewModule",
            $e = "_longViewStarted",
            Ze = "_longViewProcessed",
            et = "_longViewCached",
            tt = "_longViewHeight",
            nt = "_longViewTop",
            ot = "_longViewBottom",
            it = "REGULAR",
            rt = "AUTOPLAY_AD",
            at = "LongView.viewed",
            ct = "LongView.idled",
            dt = vk.longViewTestGroup,
            st = [],
            lt = [],
            wt = [],
            ut = Date.now(),
            ft = 0,
            bt = 0,
            ht = !1,
            pt = null,
            vt = null,
            mt = null,
            _t = null,
            gt = {};

        function Ot() {
            var e = Dt();
            e.length && (It(e), Rt())
        }

        function yt() {
            st.forEach(function(e) {
                e[et] = !1
            })
        }

        function jt(e, t) {
            "im" === t && !e[Xe] && function(e) {
                if (Object(k.V)(e, "im-mess--post")) return !0;
                var t = e && Object(k.u)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(k.V)(e, "no_posts"))
            }(e) && (e[Xe] = function(e) {
                var t = e && Object(k.u)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? rt : it
            }(e), e[Je] = t, st.push(e))
        }

        function kt(e, t) {
            var n = kt;
            ! function(e, t) {
                var n = [];
                st.forEach(function(o) {
                    Gt(o) ? n.push(o) : ! function(e, t, n) {
                        return !e[$e] && Wt(e, Ve, t, n)
                    }(o, e, t) ? function(e, t, n) {
                        return e[$e] && !Wt(e, He, t, n)
                    }(o, e, t) && (o[Ye] ? delete o[Ye] : (Kt(lt, o), wt = wt.concat(Ut(o))), delete o[$e]) : (o[$e] = Date.now(), lt.push(o))
                }), n.forEach(function(e) {
                    Kt(st, e)
                })
            }(e || Object(N.e)(), t || window.innerHeight), ht ? (clearTimeout(n.timer), n.timer = setTimeout(Tt, 150)) : (ht = !0, Et(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(k.H)("im-page--chat-header"),
                        t = Object(k.H)("im-page--chat-input");
                    ft = e.getBoundingClientRect().top + e.offsetHeight, bt = window.innerHeight - t.getBoundingClientRect().top
                } else ft = Object(k.F)("page_header").offsetHeight, bt = 0
            }())
        }

        function Tt() {
            Et(), St(), ht = !1
        }

        function xt() {
            Et(), Bt()
        }

        function Ct() {
            wt = [], lt.forEach(function(e) {
                return e[$e] = Date.now()
            }), Mt(null), Vt(null), St()
        }

        function Lt() {
            Et(), Bt(), wt = [], lt = [], Mt(null), Vt(null)
        }

        function St() {
            pt = setTimeout(At, We), vt = setTimeout(Ft, ze), mt = setTimeout(Nt, Ue), _t = setTimeout(Pt, Ge)
        }

        function Et() {
            clearTimeout(pt), clearTimeout(vt), clearTimeout(mt), clearTimeout(_t)
        }

        function At() {
            wt.length && Mt(wt)
        }

        function Ft() {
            It(wt), wt = [], Mt(null)
        }

        function Nt() {
            lt.length && (Vt(zt(lt, !0, !0)), mt = setTimeout(Nt, Ke))
        }

        function Pt() {
            clearTimeout(mt), It(zt(lt)), lt.forEach(function(e) {
                return e[Ye] = !0
            }), lt = [], Vt(null)
        }

        function Bt() {
            It(wt.concat(zt(lt)))
        }

        function It(e) {
            e && e.length && ajax.post("/al_page.php", {
                act: "seen",
                data: function(e) {
                    var t = {};
                    e.forEach(function(e) {
                        var n = e.ownerId,
                            o = "ad" === n ? "" : ":" + e.duration + ":" + e.index;
                        t[n] || (t[n] = []), t[n].push(e.module + e.postId + o + (e.sessionId ? ":" + e.sessionId : "") + (e.q ? ":" + e.q : "") + ":" + e.viewIndex)
                    });
                    var n = [];
                    return Object(S.f)(t, function(e, t) {
                        return n.push(e + "_" + t.join(","))
                    }), n.join(";")
                }(e),
                long_view: 1
            })
        }

        function Mt(e) {
            Ht(at, e)
        }

        function Vt(e) {
            Ht(ct, e)
        }

        function Ht(e, t) {
            var n = D.a.get(e) || {};
            t ? n[ut] = t : delete n[ut], D.a.set(e, n)
        }

        function Dt() {
            var e = Dt,
                t = [],
                n = D.a.get(at) || {},
                o = D.a.get(ct) || {};
            return e.iterator || (e.iterator = function(e) {
                return function(n) {
                    qt(n) && (t = t.concat(e[n]))
                }
            }), Object.keys(n).forEach(e.iterator(n)), Object.keys(o).forEach(e.iterator(o)), t
        }

        function Rt() {
            var e = Rt,
                t = D.a.get(at) || {},
                n = D.a.get(ct) || {};
            e.iterator || (e.iterator = function(e) {
                return function(t) {
                    qt(t) && delete e[t]
                }
            }), Object.keys(t).forEach(e.iterator(t)), Object.keys(n).forEach(e.iterator(n)), D.a.set(at, t), D.a.set(ct, n)
        }

        function qt(e) {
            var t = Number(e);
            return t !== ut && Date.now() - t >= Qe
        }

        function Wt(e, t, n, o) {
            if (!e) return !1;
            e[et] || (e[et] = !0, e[tt] = e.offsetHeight, e[nt] = n + e.getBoundingClientRect().top, e[ot] = e[nt] + e[tt]);
            var i = o - ft - bt,
                r = n + ft,
                a = n + o - bt,
                c = e[tt],
                d = e[nt],
                s = e[ot];
            return (s > r && d < a ? Math.min(a, s) - Math.max(r, d) : 0) >= Math.min(i * t, c * t)
        }

        function zt(e, t, n) {
            return e.map(function(e) {
                return Ut(e, t, n)
            })
        }

        function Ut(e, t, n) {
            if (Gt(e)) return [];
            var o = Math.min(qe, Date.now() - e[$e]);
            if (e[Xe] === it && o < De || e[Xe] === rt && o < Re) return [];
            n || (e[Ze] = !0);
            var i, r = function(e) {
                    var t = e[Je];
                    if ("im" === t) {
                        var n = Object(k.c)(e, "data-post-id"),
                            o = Object(k.c)(e, "data-copy"),
                            i = {
                                index: -1,
                                module: "im"
                            };
                        return n && (i[n] = -1), o && (i[o] = -1), i
                    }
                    try {
                        return window[t].postsGetRaws(e)
                    } catch (t) {
                        return console.error("Unable to extract data from elem", e), []
                    }
                }(e),
                a = {
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
                }["feed_other" === (i = r.module) ? "feed_" + cur.section : i] || "u",
                c = cur.feed_session_id || "na",
                d = [];
            for (var s in r)
                if ("index" !== s && "module" !== s && "q" !== s) {
                    var l = s.split("_"),
                        w = l[0],
                        u = l[1];
                    "ads" === w && (u = l[3]), /^post\d+$/.test(w) && (w = l[1], u = l[2]);
                    var f = void 0;
                    t || (gt[f = w + "_" + u] || (gt[f] = 0), gt[f]++), d.push("ad" === w ? {
                        ownerId: "ad",
                        postId: u,
                        module: a,
                        viewIndex: gt[f]
                    } : "ads" === w ? {
                        ownerId: "ads",
                        postId: u,
                        module: a,
                        index: r.index,
                        duration: o,
                        sessionId: c,
                        viewIndex: gt[f]
                    } : {
                        ownerId: w,
                        postId: (1 === r[s] ? "" : "-") + u,
                        module: a,
                        index: r.index,
                        duration: o,
                        sessionId: c,
                        q: r.q || null,
                        viewIndex: gt[f]
                    })
                }
            return d
        }

        function Gt(e) {
            return "page_view" === dt && e[Ze] || !document.body.contains(e)
        }

        function Kt(e, t) {
            var n = e.indexOf(t);
            n >= 0 && e.splice(n, 1)
        }
        var Qt = n("QGEU"),
            Xt = n("eNQP");

        function Yt() {
            return document.activeElement && (Object(k.c)(document.activeElement, "contenteditable") || "INPUT" === document.activeElement.tagName || "textarea" === document.activeElement.tagName)
        }

        function Jt(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = arguments[2],
                o = arguments[3],
                i = e.phshown,
                r = e.phcont,
                a = t.back,
                c = t.editable,
                d = t.hideBackAfter,
                s = t.timeout,
                l = t.phColor,
                w = void 0 === l ? "#8C8E91" : l,
                u = t.activeColor,
                f = void 0 === u ? "#C0C8D0" : u,
                b = s || 0 === s ? s : 100,
                h = t.period || 200,
                p = void 0;
            if (p = c ? (void 0 !== e.textContent ? e.textContent : e.innerText) || Object(k.I)("img", e).length : e.value, i && (a && p || !a && (n && !n.type || p)) ? (Object(k.W)(r), e.phshown = !1) : i || p || !a && !o || (Object(k.tb)(r), e.phshown = !0, y.a.opera && o && (e.setAttribute("placeholder", ""), e.removeAttribute("placeholder", ""))), a && !p) {
                if (n && !n.type) {
                    var v = d ? k.W.pbind(r.firstChild.firstChild) : null;
                    clearTimeout(e.phanim), e.phanim = setTimeout(function() {
                        Object(C.b)(r.firstChild.firstChild, {
                            color: f
                        }, h, v)
                    }, b)
                }
                o && (clearTimeout(e.phanim), d && Object(k.tb)(r.firstChild.firstChild), e.phanim = setTimeout(function() {
                    Object(C.b)(r.firstChild.firstChild, {
                        color: w
                    }, h)
                }, b))
            }
        }

        function $t(e, t) {
            var n = Object(k.F)(e),
                o = t ? Object(S.d)(t) : {};
            if (n && (!n.phevents || o.reload)) {
                var i = n.getAttribute ? n.getAttribute("placeholder") : n.placeholder;
                if (i) {
                    n.removeAttribute("placeholder");
                    var r = {},
                        a = !1,
                        c = ["Top", "Bottom", "Left", "Right"];
                    if (o.pad) r = o.pad;
                    else {
                        if (o.fast) {
                            for (var d = 0; d < 4; d++) r["padding" + c[d]] = 3, r["margin" + c[d]] = 0, r["border" + c[d] + "Width"] = 1;
                            Object(S.i)(r, o.styles || {})
                        } else {
                            for (var s = [], l = 0; l < 4; l++) s.push("margin" + c[l]), s.push("padding" + c[l]), s.push("border" + c[l] + "Width");
                            r = Object(k.O)(n, s)
                        }
                        for (var w = 0; w < 4; w++) {
                            var u = "margin" + c[w],
                                f = "border" + c[w] + "Width";
                            r[u] = Object(S.r)(r[u]) + Object(S.r)(r[f]) + "px", delete r[f]
                        }
                    }
                    if (o.reload) {
                        var b = n.previousSibling;
                        b && Object(k.V)(b, "input_back_wrap") && Object(k.fb)(b)
                    }
                    var h = o.big ? " big" : "",
                        p = Object(k.N)(n)[0] - 20,
                        v = n.phcont = n.parentNode.insertBefore(Object(k.e)("div", {
                            className: "input_back_wrap no_select",
                            innerHTML: '<div class="input_back"><div class="input_back_content' + h + '" style="width: ' + p + 'px;">' + i + "</div></div>"
                        }), n),
                        m = Object(k.u)(v);
                    Object(k.qb)(m, r);
                    var _ = Jt.pbind(n, o),
                        g = y.a.mobile ? _ : function(e, t) {
                            return setTimeout(_.pbind(e, t), 0)
                        };
                    y.a.msie && y.a.version < 8 && Object(k.qb)(m, {
                        marginTop: 1
                    }), n.phonfocus = function(e) {
                        a || (n.focused = !0, cur.__focused = n, !0 === e && (Object(k.qb)(n, {
                            backgroundColor: "#FFF"
                        }), Object(k.W)(m)), g(!0, !1))
                    }, n.phonblur = function() {
                        a || (cur.__focused = n.focused = !1, Object(k.tb)(m), g(!1, !0))
                    }, n.phshown = !0, n.phanim = null, (n.value || o.editable && ((void 0 !== n.textContent ? n.textContent : n.innerText) || Object(k.I)("img", n).length)) && (n.phshown = !1, Object(k.W)(v)), y.a.opera_mobile || (Object(L.b)(v, "focus click", function(e) {
                        a || (o.editableFocus ? (setTimeout(o.editableFocus.pbind(n), 0), n.phonfocus()) : (n.blur(), n.focus()))
                    }), Object(L.b)(n, "focus" + (o.editable ? " click" : ""), n.phonfocus), Object(L.b)(n, "keydown paste cut input", g)), Object(L.b)(n, "blur", n.phonblur), n.check = g, n.getValue = function() {
                        return o.editable ? n.innerHTML : n.value
                    }, n.setPlaceholder = function(e) {
                        return Object(k.H)("input_back_content", v).textContent = e
                    }, n.setDisabled = function(e) {
                        return a = e
                    }, n.setValue = function(e) {
                        o.editable ? n.innerHTML = e : n.value = e, Jt(n, o)
                    }, n.phevents = !0, n.phonsize = function() {}, o.global || o.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function(e) {
                        for (var t = 0, n = e.length; t < n; t++) Object(k.jb)(e[t])
                    }.pbind(cur.__phinputs))), cur.__phinputs.push(n))
                }
            }
        }

        function Zt(e, t) {
            var n = Object(k.F)(e),
                o = t ? Object(S.d)(t) : {},
                i = void 0 === Object(k.e)("input").placeholder || n && n.getAttribute && n.getAttribute("contenteditable");
            if (n && (!n.phevents || o.reload)) {
                var r = n.getAttribute ? n.getAttribute("placeholder") : n.placeholder;
                if (r && (n.getValue = function() {
                        return o.editable ? n.innerHTML : n.value
                    }, n.setValue = function(e) {
                        o.editable ? n.innerHTML = e : n.value = e, i && l(n, o)
                    }, n.phonfocus = function() {}, n.phonblur = function() {}, i)) {
                    if (n.removeAttribute("placeholder"), o.reload) {
                        var a = Object(k.y)(n);
                        a && Object(k.V)(a, "placeholder") && Object(k.fb)(a)
                    }
                    var c = n.phcont = Object(k.v)(Object(k.e)("div", {
                            className: "placeholder",
                            innerHTML: '<div class="ph_input"><div class="ph_content">' + r + "</div></div>"
                        }), n),
                        d = l.pbind(n, o),
                        s = y.a.mobile ? d : function(e, t) {
                            return setTimeout(d.pbind(e, t), 0)
                        };
                    n.phonfocus = function() {
                        n.focused = !0, cur.__focused = n, s(!0, !1)
                    }, n.phonblur = function() {
                        cur.__focused = n.focused = !1, s(!1, !0)
                    }, n.phshown = !0, (n.value || o.editable && ((void 0 !== n.textContent ? n.textContent : n.innerText) || Object(k.I)("img", n).length)) && (n.phshown = !1, Object(k.W)(c)), y.a.opera_mobile || (Object(L.b)(c, "focus click contextmenu", function(e) {
                        o.editableFocus ? (setTimeout(o.editableFocus.pbind(n), 0), "contextmenu" === e.type && y.a.msie && o.editableFocus(n), n.phonfocus()) : (n.blur(), n.focus())
                    }), Object(L.b)(n, "focus" + (o.editable ? " click" : ""), n.phonfocus), Object(L.b)(n, "keydown paste cut input", s)), Object(L.b)(n, "blur", n.phonblur), n.check = s, n.phevents = !0, n.phonsize = function() {}, o.global || o.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function() {
                        if (cur.__phinputs)
                            for (var e = 0, t = cur.__phinputs.length; e < t; ++e) Object(k.jb)(cur.__phinputs[e])
                    })), cur.__phinputs.push(n))
                }
            }

            function l(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = e.phshown,
                    o = e.phcont,
                    i = void 0;
                t.editable ? ((i = void 0 !== e.textContent ? e.textContent : e.innerText) && y.a.opera && i.match(/^[ ]+$/) && (i = ""), i || (i = Object(k.I)("img", e).length > 0), i || (i = Object(k.I)("br", e).length > 1), i || (i = Object(k.I)("p", e).length > 1)) : i = e.value, n && i ? (Object(k.W)(o), e.phshown = !1) : n || i || (Object(k.tb)(o), e.phshown = !0)
            }
        }

        function en(e) {
            if (Object(L.d)(e)) return !0;
            if (D.a.set("last_reloaded", []), !cur.onMouseClick || !cur.onMouseClick(e)) {
                if (!(e = window.event || e.originalEvent || e)) return !0;
                for (var t = 8, n = e.target || e.srcElement, o = void 0, i = void 0; n && n !== bodyNode && "A" !== n.tagName && t--;) n = n.parentNode;
                if (!n || "A" !== n.tagName || n.onclick || n.onmousedown) return !0;
                var r = n.href;
                if (r && (n.getAttribute("target") || nav.baseBlank)) return !0;
                if ("https:" !== location.protocol && !r.indexOf("https://")) return !0;
                (r = r.replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (r = r.replace(location.hostname, "")), vk.dev && "vk.com" === location.hostname && (r = r.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/"));
                var a = {};
                (i = r.match(/^\/(.+?)#[\!\/](.+?)$/)) && !i[1].match(/^app(\d+)/) && (a.permanent = i[1], r = "/" + i[2]);
                var c = !!(n.getAttribute && n.getAttribute("data-post-click-type") && n.getAttribute("data-post-id"));
                if (r.match(/#$/) && !c) return !0;
                var d = Object(k.s)(n, "post-id");
                d && (a.postId = d);
                var s = void 0,
                    l = r;
                if (o = r.match(/^\/(.*?)(\?|#|$)/)) o = o[1];
                else {
                    if (n.hostname) s = n.hostname, o = n.pathname + n.search;
                    else {
                        var w = /^([^:\/]+)?(?::(\d+))?(\/?[^#]*)(#?.*)$/i.exec(r);
                        if (!w) return !0;
                        s = w[1], o = w[3] || "/"
                    }
                    if (!s || !c) return !0;
                    n.setAttribute("data-change-location-with-post-away", 1), l = n
                }
                if ("add_community_app" === o) return Object(k.c)(n, "target", "_blank"), !0;
                if (o.indexOf(".php") > 0 || o.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images\/|utils\/|\.js|js\/|\.css|css\/|source\b)/)) {
                    if (!c) return !0;
                    n.setAttribute("data-change-location-with-post-away", 1), l = n
                }
                var u = n.getAttribute("hrefparams");
                u && (a.params = Object(S.i)(a.params || {}, Object(O.f)(u)));
                try {
                    return nav.go(l, e, a), Object(L.c)(e)
                } catch (e) {
                    return !0
                }
            }
        }

        function tn(e, t) {
            (t = t || window.event).keyCode === L.a.ENTER && (e(), Object(L.c)(t))
        }

        function nn(e, t) {
            (10 === (e = e || window.event).keyCode || 13 === e.keyCode && (e.ctrlKey || e.metaKey && y.a.mac)) && (t(), Object(L.c)(e))
        }

        function on(e) {
            if (window._wf = 1, e.keyCode === L.a.ESC && boxQueue.count() && !cur._noEscHide) return boxQueue.hideLast(), -1;
            if (e.keyCode === L.a.ESC && window.articleCloseImageFullSize && window.articleCloseImageFullSize()) return Object(L.c)(event);
            if (e.keyCode === L.a.ESC && window.isArticleLayerOpen && window.isArticleLayerOpen()) return window.ArticleLayer.close(!0), Object(L.c)(event);
            if (e.keyCode === L.a.ESC && window.AuthorPage) return window.AuthorPage.close(), Object(L.c)(event);
            if (e.keyCode === L.a.ESC) return Object(I.b)(), Object(L.c)(e);
            var t = [176, 177, 178, 179],
                n = !1;
            window.audioPlayer && (t.push(L.a.LEFT), t.push(L.a.RIGHT)), Object(S.f)(t, function(t, o) {
                if (e.keyCode === o) return n = !0, !1
            }), n && Object(M.j)().onMediaKeyPressedEvent(e), ye.inited && 191 === e.keyCode && (e.ctrlKey || e.metaKey && y.a.mac) && ye.showFriends()
        }
        var rn = n("i6oL"),
            an = n("m0N1");
        v.polyfill(), window.Map = c, window.Set = d;
        var cn = window.vk;

        function dn() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, cn.width = 960, cn.started = Object(S.L)(), cn.counts = {}, y.a.android && (Object(g.d)("remixscreen_width", window.screen.width, 365), Object(g.d)("remixscreen_height", window.screen.height, 365), Object(g.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(g.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(g.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(J.f)(), Object(S.f)(StaticFiles, function(e, t) {
                t.t = -1 !== e.indexOf(".css") ? "css" : "js", t.n = e.replace(/[\/\.]/g, "_"), t.l = 0, t.c = 0
            }), Object(L.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(L.h)(vkCache[e].handle.elem)
            }), Object(L.b)(window, "DOMContentLoaded load", function() {
                cn.loaded || (cn.loaded = !0, Object(G.y)()), Object(we.c)()
            }), Object(L.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(L.b)(document, "keydown", on)
        }
        var sn = 0;

        function ln() {
            if (window.headNode = Object(k.J)("head"), window.icoNode = Object(k.J)("link", headNode), window.bodyNode = Object(k.J)("body"), window.htmlNode = Object(k.J)("html"), window.utilsNode = Object(k.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(L.b)(bodyNode, "resize", we.j.pbind(!1)), utilsNode) {
                var e;
                y.a.mozilla ? Object(k.a)(bodyNode, "firefox") : y.a.mobile && Object(k.a)(bodyNode, "mobfixed"), e = [], Object(S.f)(y.a, function(t, n) {
                    n && !Object(S.o)(t, ["version", "mac", "search_bot"]) && "flash" !== t.substr(0, 5) && e.push(t)
                }), e = e.join(" "), bodyNode.setAttribute("data-useragent", e), Object(S.f)(StaticFiles, function(e, t) {
                    t.l = 1, "css" === t.t && utilsNode.appendChild(Object(k.e)("div", {
                        id: t.n
                    }))
                });
                var t = Object(k.F)("layer_bg"),
                    n = t.nextSibling,
                    o = Object(k.F)("box_layer_bg"),
                    i = o.nextSibling;
                window.layerBG = t, window.boxLayerBG = o, window.layerWrap = n, window.layer = n.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(k.F)("stl_side"), window._stlLeft = Object(k.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, y.a.mobile || Object(rn.a)(), Object(L.b)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, t, n, o) {
                    return window.layerQueue = H, Object(S.i)(V, {
                        show: V._show.pbind(e, t),
                        boxshow: V._show.pbind(n, o),
                        wrapshow: V._show.pbind(e),
                        hide: V._hide.pbind(e, t),
                        boxhide: V._hide.pbind(n, o),
                        wraphide: V._hide.pbind(e)
                    }), V
                }(t, n, o, i), hab.init(), window._retinaInit ? window._retinaInit() : sn = 1
            }
        }

        function wn() {
            if (utilsNode) {
                Object(rn.b)();
                var e = Object(k.F)("side_bar");
                window.pageNode = Object(k.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(k.O)(e, "position"), window._tbLink = Object(k.F)("top_back_link"), y.a.chrome || y.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = y.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(S.L)() - cn.started, 10),
                    n = Object(S.r)((cn.contlen || 1) / t * 1e3);
                y.a.mozilla && y.a.version >= 4 ? n /= 2.5 : y.a.mozilla ? n *= 1.5 : y.a.msie && y.a.version >= 7 ? n /= 1.5 : y.a.msie && (n *= 2.5);
                var o = Object(S.r)(150 * Math.max(2e6 / n, 1));
                if (z.highlimit = 6 * o, z.lowlimit = Math.min(o, 600), Object(we.j)(), setTimeout(we.j.pbind(!1), 0), Object(Qt.c)(), window.addEventListener("scroll", we.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !cn.id && D.a.checkVersion() && D.a.get("last_reloaded")) try {
                    var i = {};
                    Object(S.f)(["sound_notify_off", "im_ui_notify_off"], function(e, t) {
                        var n = D.a.get(t);
                        null !== n && (i[t] = n)
                    }), window.localStorage.clear(), Object(S.f)(i, function(e, t) {
                        return D.a.set(e, t)
                    })
                } catch (e) {}
            }
        }
        var un = function() {
            function e(t, n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.count = n || 1, this.func = t
            }
            return e.prototype.done = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                this.count -= e, this.count <= 0 && this.func()
            }, e
        }();

        function fn(e) {
            cn.loaded ? e() : Object(L.b)(window, "load", e)
        }

        function bn() {
            window.showWriteMessageBox = ge.g, window.giftsBox = ge.a, window.moneyTransferBox = ge.d, window.reportAd = ge.e, window.mobilePromo = ge.c, window.showAudioClaimWarning = ge.f, window.menuSettings = ge.b, window.sureDeleteAll = ge.h, window.TopNotifier = Object(M.l)(), window.showPhoto = M.x, window.showManyPhoto = M.w, window.showAlbums = M.u, window.showAlbum = M.t, window.showPhotoTags = M.y, window.isPhotoeditor3Available = M.o, window.AudioMessagePlayer = M.a, window.showVideoTags = M.A, window.videoCallback = M.C, window.showWiki = M.B, window.showApp = M.v, window.showPodcast = M.z, window.podcastStartFrom = M.r, window.articlePrepare = M.b, window.isArticleLayerOpen = M.n, window.isArticleEditorAvailable = M.m, window.openArticleEditor = M.q, window.mentionOver = me, window.mentionClick = M.p, window.mobileOnlineTip = he, window.pageVerifiedTip = pe, window.audioShowActionTooltip = ve, window.shareAudioPlaylist = M.s, window.getAudioPlayer = M.j, window.deleteAudioOnClaim = M.i, window.initTopAudioPlayer = M.k, window.bookmark = M.c, window.bookmarkPost = M.h, window.bookmarkArticle = M.d, window.bookmarkLink = M.e, window.bookmarkPodcast = M.g, window.bookmarkNarrative = M.f, window.bookmarkTooltip = _e, window.showStory = B.c, window.showNarrative = B.b, window.storiesPreloadStatic = B.d, window.sendMask = B.a
        }
        window.constants = {
            Groups: ce
        }, window.partConfigEnabled = se.a, Object(k.X)(), window.ge = k.F, window.geByTag = k.I, window.geByTag1 = k.J, window.geByClass = k.G, window.geByClass1 = k.H, window.gpeByClass = k.T, window.domQuery = k.B, window.domQuery1 = k.C, window.domClosest = k.n, window.ce = k.e, window.cf = k.f, window.re = k.fb, window.se = k.mb, window.sech = k.nb, window.rs = k.lb, window.psr = k.eb, window.domReplaceEl = k.D, window.domEL = k.t, window.domNS = k.y, window.domPS = k.A, window.domFC = k.u, window.domLC = k.x, window.domPN = k.z, window.domChildren = k.m, window.domInsertBefore = k.w, window.domInsertAfter = k.v, window.domByClass = k.j, window.domData = k.s, window.domChildIndex = k.l, window.domCA = k.k, window.domClosestSibling = k.r, window.matchesSelector = k.db, window.isHover = k.Z, window.isAncestor = k.Y, window.getScroll = k.M, window.domClosestPositioned = k.q, window.domClosestOverflowHidden = k.p, window.show = k.tb, window.hide = k.W, window.isVisible = k.ab, window.clientHeight = k.h, window.getClientRectOffsetY = k.K, window.toggle = k.ub, window.boundingRectEnabled = k.d, window.getXYRect = k.R, window.getXY = k.Q, window.isWindow = k.bb, window.getSize = k.N, window.hasClass = k.V, window.addClass = k.a, window.addClassDelayed = k.b, window.removeClass = k.hb, window.removeClassDelayed = k.ib, window.toggleClass = k.vb, window.toggleClassDelayed = k.wb, window.replaceClass = k.kb, window.getStyle = k.O, window.setStyle = k.qb, window.setStyleDelayed = k.rb, window.setPseudoStyle = k.pb, window.data = k.i, window.attr = k.c, window.removeAttr = k.gb, window.removeData = k.jb, window.cleanElems = k.g, window.setTitle = k.sb, window.getZoom = k.S, window.val = k.yb, window.elfocus = k.E, window.traverseParent = k.xb, window.getH = k.L, window.getW = k.P, window.domClosestByTag = k.o, window.setDocumentTitle = k.ob, window.lockDocumentTitle = k.cb, window.KEY = L.a, window.addEvent = L.b, window.removeEvent = L.h, window.triggerEvent = L.j, window.cancelEvent = L.c, window.stopEvent = L.i, window.normEvent = L.g, window.checkEvent = L.d, window.checkKeyboardEvent = L.e, window.checkOver = L.f, Object(S.q)(), window.isRetina = S.y, window.extractUrls = S.j, window.serializeForm = S.F, window.addTemplates = S.a, window.getTemplate = S.n, window.rand = S.D, window.irand = S.s, window.isUndefined = S.A, window.isFunction = S.v, window.isArray = S.t, window.isString = S.z, window.isObject = S.x, window.isEmpty = S.u, window.vkNow = S.L, window.vkImage = S.J, window.trim = S.H, window.stripHTML = S.G, window.escapeRE = S.h, window.intval = S.r, window.floatval = S.k, window.positive = S.C, window.isNumeric = S.w, window.winToUtf = S.M, window.replaceEntities = S.E, window.clean = S.c, window.unclean = S.I, window.each = S.f, window.indexOf = S.p, window.inArray = S.o, window.clone = S.d, window.arrayKeyDiff = S.b, window.extend = S.i, window.vkLocal = S.K, window.lTimeout = S.B, window.getCaretCharacterOffsetWithin = S.m, window.formatCount = S.l, window.encodeHtml = S.g, window.decodeHtml = S.e, Object(O.c)(), window.ajx2q = O.b, window.q2ajx = O.f, window.requestBox = O.g, window.activateMobileBox = O.a, window.validateMobileBox = O.h, window.validatePassBox = O.i, window.photoCaptchaBox = O.e, Object(g.c)(), window.getCookie = g.a, window.setCookie = g.d, window.hideCookiesPolicy = g.b, Object(le.c)(), window.debugLog = le.b, window.debugEl = le.a, window.isToday = de.c, window.isYesterday = de.e, window.isTomorrow = de.d, window.isSameDate = de.b, window.leadingZero = de.f, window.formatTime = de.a, window.parseLatin = F.o, window.parseCyr = F.m, window.parseLatKeys = F.n, window.langNumeric = F.i, window.langSex = F.j, window.langStr = F.k, window.addLangKeys = F.a, window.getLang = F.d, window.langDate = F.h, window.getShortDate = F.e, window.getShortDateOrTime = F.f, window.langWordNumeric = F.l, window.getDateText = F.c, window.getBigDateNew = F.b, window.getSmDate = F.g, window.scrollToY = N.g, window.scrollToTop = N.f, window.scrollGetX = N.d, window.scrollGetY = N.e, window.disableBodyScroll = N.a, window.enableBodyScroll = N.b, window.Chat = ye, window.__qlTimer = null, window.__qlClear = Ee, window.onLoginDone = Fe, window.onLoginFailed = Ne, window.onLoginCaptcha = Pe, window.onLoginReCaptcha = Be, window.storePasswordCredential = Ae, window.cssAnim = je, window.imagesLoader = Te, window.nodeUpdated = Ie, window.hideNewsAnnounce = xe, window.leftAdBlockClose = Ce, window.leftBlockToggleFriend = Le, window.leftBlockFriendTooltip = Se, window.fifaReplaceText = ke, window.placeholderSetup = $t, window.placeholderInit = Zt, window.isInputActive = Yt, window.showTooltip = be.c, window.showTitle = be.b, window.showHint = be.a, window.topMsg = _.d, window.showMsg = _.b, window.topError = _.c, window.showGlobalPrg = _.a, window.checkTextLength = Me.b, window.getSelectionText = Me.d, window.goAway = Me.e, window.debounce = Me.c, window.hashCode = Me.g, window.isFullScreen = Me.h, window.parallel = Me.k, window.parseJSON = Me.l, window.shuffle = Me.m, window.throttle = Me.n, window.toggleOnline = Me.q, window.updateMoney = Me.s, window.onlinePlatformClass = Me.j, window.Fx = C.a, window.fx = C.a, window.animate = C.b, window.cubicBezier = C.d, window.fadeTo = C.g, window.genFx = C.i, window.getRGB = C.k, window.getColor = C.j, window.slideDown = C.l, window.slideUp = C.n, window.slideToggle = C.m, window.fadeIn = C.e, window.fadeOut = C.f, window.fadeToggle = C.h, window.animateCount = C.c, window.updateAriaElements = Qt.c, window.updateAriaCheckboxes = Qt.b, window.hasAccessibilityMode = Qt.a, window.cancelStackFilter = I.a, window.cancelStackPush = I.c, window.cancelStackPop = I.b, window.ElementTooltip = j.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = T, 1 === cn.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== cn.al || history.pushState || (cn.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), cn.version = !1), window.jsc = q, window.stVersions || (window.stVersions = {}, window.stTypes = {}, window.navMap = {}), window.StaticFiles || (window.StaticFiles = {}), window.stManager = z, Object(y.c)(), window.browser = y.a, window.mobPlatforms = y.d, window.browserFeatures = y.b, Object(x.a)(), window.toggleFlash = x.c, window.renderFlash = x.b, dn(), window.updateHeaderStyles = J.j, window.updateNarrow = we.m, window.checkPageBlocks = we.c, window.redraw = we.l, window.onBodyResize = we.j, window.onBodyScroll = we.k, window.leftBlockOver = we.i, window.leftBlockOut = we.h, window.leftBlockHide = we.g, window.onDocumentClick = en, window.onEnter = tn, window.onCtrlEnter = nn, window.autosizeSetup = we.b, window.getProgressBarEl = we.e, window.getProgressHtml = we.f, Object(an.b)(), ae(), window.onDomReady = function(e) {
            return e()
        }, window.currentModule = function() {
            return cur.currentModule ? cur.currentModule() : cur.module
        }, window.hab = A(), window.ls = D.a, window.shortCurrency = R, window.statlogsValueEvent = U.b, window.saveSearchAttemptStats = U.a, window.callHub = un, window.CallHub = un, window.gSearch = new Q, window.zNav = J.m, window.handlePageView = J.e, window.handlePageParams = J.d, window.handlePageCount = J.c, window.comScoreUDM = J.a, window.updateOtherCounters = J.l, window.processDestroy = J.g, window.globalHistoryDestroy = J.b, window.showBackLink = J.i, window.nav = Y.a, nav.init(), cn.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === t[1] && 12 === cn.time[1] ? cn.time[1] = 0 : 12 === t[1] && 1 === cn.time[1] ? t[1] = 0 : (t[1] > cn.time[1] + 1 || cn.time[1] > t[1] + 1) && (t[1] = cn.time[1] = t[2] = cn.time[2] = 0), t[1] > cn.time[1] && 1 === t[2] ? 31 === cn.time[2] || (4 === cn.time[1] || 6 === cn.time[1] || 9 === cn.time[1] || 11 === cn.time[1]) && 30 === cn.time[2] || 2 === cn.time[1] && (29 === cn.time[2] || 28 === cn.time[2] && cn.time[0] % 4) ? cn.time[2] = 0 : cn.time[2] = t[2] = 0 : cn.time[1] > t[1] && 1 === cn.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && cn.time[0] % 4) ? t[2] = 0 : t[2] = cn.time[2] = 0), (t[2] > cn.time[2] + 1 || cn.time[2] > t[2] + 1) && (t[2] = cn.time[2] = 0);
            var n = 60 * (60 * (24 * (t[2] - cn.time[2]) + (t[3] - cn.time[3])) + (t[4] - cn.time[4]));
            n < -55800 ? n += 86400 : n > 37800 && (n -= 86400);
            var o = 0,
                i = Math.abs(n);
            Object(S.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], function(e, t) {
                var r = Math.round(3600 * (t - 3)),
                    a = Math.abs(n - r);
                a < i && (i = a, o = r)
            }), cn.dt = o, Object(g.a)("remixdt") !== cn.dt && Object(g.d)("remixdt", cn.dt, 365);
            var r = Object(S.r)(Object(g.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!y.a.iphone || Object(g.a)("remixme")) ? 1 & r || (Object(g.d)("remixrt", 1 | r, 365), window._retinaInit = function() {
                z.add(["retina.css"]), Object(k.a)(document.body, "is_2x")
            }, sn && window._retinaInit()) : 1 & r && Object(g.d)("remixrt", 1 ^ r, 365)
        }, 0), window.boxQueue = Object(fe.c)(), window.__bq = boxQueue, window.curBox = fe.b, Object(fe.d)(), window.boxRefreshCoords = fe.a, window.MessageBox = ue.a, window.showBox = ue.b, window.showTabbedBox = ue.f, window.showFastBox = ue.d, window.showCaptchaBox = ue.c, window.showReCaptchaBox = ue.e, window.showDoneBox = fe.e, window.TopMenu = we.a, window.TopSearch = X.a, window.handleScroll = Me.f, window.loadScript = K.a, Object(G.j)(), window.notaBene = G.q, window.updSideTopLink = G.y, window.createButton = G.d, window.actionsMenuItemLocked = G.a, window.lockActionsMenuItem = G.n, window.unlockActionsMenuItem = G.v, window.linkLocked = G.m, window.lockLink = G.p, window.unlockLink = G.x, window.lockButton = G.o, window.unlockButton = G.w, window.buttonLocked = G.b, window.isButtonLocked = G.k, window.disableButton = G.f, window.sbWidth = G.t, window.isChecked = G.l, window.checkbox = G.c, window.disable = G.e, window.radioval = G.s, window.radiobtn = G.r, window.showProgress = G.u, window.hideProgress = G.i, window.disableEl = G.g, window.enableEl = G.h, Object(P.d)(), window.VideoConstants = P.a, window.showVideo = P.j, window.showInlineVideo = P.i, window.loadInlineVideo = P.e, window.revertLastInlineVideo = P.h, window.destroyInlineVideoPlayer = P.c, window.pauseLastInlineVideo = P.f, window.playLastInlineVideo = P.g, window.checkMp4 = P.b, window.performance && window.performance.memory && Object(S.D)(0, 100) < 5 && Object(Xt.a)(), dt ? (Object(L.b)(window, "blur", xt), Object(L.b)(window, "focus", Ct), onDomReady(function() {
            return setTimeout(Ot, 500)
        }), window.LongView = {
            register: jt,
            onScroll: Object(Me.n)(kt, 50),
            onBeforePageChange: Lt,
            clearElemsCache: yt,
            _debug: function() {
                return {
                    started: lt,
                    tracking: st,
                    viewedData: wt,
                    viewIndexes: gt,
                    blindTop: ft,
                    blindBottom: bt
                }
            }
        }) : window.LongView = {
            register: function() {},
            onScroll: function() {},
            onBeforePageChange: function() {},
            clearElemsCache: function() {}
        }, window._postsSeen = {}, window._postsSaved = {}, window._postsSaveTimer = void 0, window._postsSendTimer = void 0, window._postsCleanTimer = void 0, window._postsSeenModules = {}, window._postsExtras = {}, bn(), window.onLoaded = fn, window.domStarted = ln, window.domReady = wn, Object(le.b)("common module enabled"), z.done(jsc("web/common_web.js"))
    }
});