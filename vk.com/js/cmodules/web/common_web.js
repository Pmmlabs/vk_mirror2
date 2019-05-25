! function(e) {
    function t(t) {
        for (var o, a, s = t[0], d = t[1], c = t[2], u = 0, l = []; u < s.length; u++) a = s[u], i[a] && l.push(i[a][0]), i[a] = 0;
        for (o in d) Object.prototype.hasOwnProperty.call(d, o) && (e[o] = d[o]);
        for (w && w(t); l.length;) l.shift()();
        return r.push.apply(r, c || []), n()
    }

    function n() {
        for (var e, t = 0; t < r.length; t++) {
            for (var n = r[t], o = !0, s = 1; s < n.length; s++) {
                var d = n[s];
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
    var s = window.webpackJsonp = window.webpackJsonp || [],
        d = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var c = 0; c < s.length; c++) t(s[c]);
    var w = d;
    r.push([80, "bundles/audioplayer", "common"]), n()
}({
    "4O8T": function(e, t, n) {
        var o;
        ! function(t) {
            "use strict";

            function i() {}
            var r = i.prototype,
                a = t.EventEmitter;

            function s(e, t) {
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
                for (n in o) o.hasOwnProperty(n) && -1 === s(o[n], t) && o[n].push(i ? t : {
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
                for (o in i) i.hasOwnProperty(o) && -1 !== (n = s(i[o], t)) && i[o].splice(n, 1);
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
        }("undefined" != typeof window ? window : this || {})
    },
    80: function(e, t, n) {
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
        var o = n("qKs0"),
            i = n("VXxg");
        String.fromCodePoint || function() {
            var e = function() {
                    try {
                        var e = {},
                            t = Object.defineProperty,
                            n = t(e, e, e) && t
                    } catch (e) {}
                    return n
                }(),
                t = String.fromCharCode,
                n = Math.floor,
                o = function(e) {
                    var o, i, r = [],
                        a = -1,
                        s = arguments.length;
                    if (!s) return "";
                    for (var d = ""; ++a < s;) {
                        var c = Number(arguments[a]);
                        if (!isFinite(c) || c < 0 || c > 1114111 || n(c) != c) throw RangeError("Invalid code point: " + c);
                        c <= 65535 ? r.push(c) : (o = 55296 + ((c -= 65536) >> 10), i = c % 1024 + 56320, r.push(o, i)), (a + 1 == s || r.length > 16384) && (d += t.apply(null, r), r.length = 0)
                    }
                    return d
                };
            e ? e(String, "fromCodePoint", {
                value: o,
                configurable: !0,
                writable: !0
            }) : String.fromCodePoint = o
        }(), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
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
                        for (var r = Object.keys(Object(i)), a = 0, s = r.length; a < s; a++) {
                            var d = r[a],
                                c = Object.getOwnPropertyDescriptor(i, d);
                            void 0 !== c && c.enumerable && (n[d] = i[d])
                        }
                }
                return n
            }
        }), Number.isInteger = Number.isInteger || function(e) {
            return "number" == typeof e && isFinite(e) && Math.floor(e) === e
        };
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        ! function(e) {
            var t = e.HTMLCanvasElement && e.HTMLCanvasElement.prototype,
                n = e.Blob && function() {
                    try {
                        return Boolean(new Blob)
                    } catch (e) {
                        return !1
                    }
                }(),
                o = n && e.Uint8Array && function() {
                    try {
                        return 100 === new Blob([new Uint8Array(100)]).size
                    } catch (e) {
                        return !1
                    }
                }(),
                i = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder,
                a = /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
                s = (n || i) && e.atob && e.ArrayBuffer && e.Uint8Array && function(e) {
                    var t, r, s, d, c, w, u, l, f;
                    if (!(t = e.match(a))) throw new Error("invalid data URI");
                    for (r = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), s = !!t[4], d = e.slice(t[0].length), c = s ? atob(d) : decodeURIComponent(d), w = new ArrayBuffer(c.length), u = new Uint8Array(w), l = 0; l < c.length; l += 1) u[l] = c.charCodeAt(l);
                    return n ? new Blob([o ? u : w], {
                        type: r
                    }) : ((f = new i).append(w), f.getBlob(r))
                };
            e.HTMLCanvasElement && !t.toBlob && (t.mozGetAsFile ? t.toBlob = function(e, n, o) {
                e(o && t.toDataURL && s ? s(this.toDataURL(n, o)) : this.mozGetAsFile("blob", n))
            } : t.toDataURL && s && (t.toBlob = function(e, t, n) {
                e(s(this.toDataURL(t, n)))
            })), "function" == typeof define && define.amd ? define(function() {
                return s
            }) : "object" == ("undefined" == typeof module ? "undefined" : r(module)) && module.exports ? module.exports = s : e.dataURLtoBlob = s
        }(window);
        var a = n("E2g8"),
            s = n("4O8T");
        window.EventEmitter = s;

        function d(e) {
            e && !e.prototype.forEach && (Array.prototype.forEach ? e.prototype.forEach = Array.prototype.forEach : e.prototype.forEach = function(e, t) {
                t = t || window;
                for (var n = 0; n < this.length; n++) e.call(t, this[n], n, this)
            })
        }
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
        }), d(window.NodeList), d(window.HTMLCollection);
        var c = n("ryw6"),
            w = n("kMSP"),
            u = n("Kngp"),
            l = n("gdug"),
            f = n("k487"),
            h = n("zxIV");

        function p(e, t) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
                var n = Object(h.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(n, icoNode), icoNode = n
            }
        }
        var b = n("HhI8"),
            v = n("7jxN"),
            m = n("Egk5"),
            g = n("t7n3"),
            y = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            o = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var a, s = e[Symbol.iterator](); !(o = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !o && s.return && s.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function _() {
            return new function(e) {
                var t = function(e) {
                        var t = e.split("#"),
                            n = y(t, 2),
                            o = n[0],
                            i = n[1],
                            r = o.split("?"),
                            a = y(r, 2),
                            s = a[0],
                            d = a[1];
                        return s + (d ? "?" + Object(u.b)(Object(u.f)(d)) : "") + (i ? "#" + i : "")
                    },
                    n = Object(g.i)({
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
                        1 == vk.al && r(!0), 3 == vk.al ? (Object(m.b)(window, "popstate", r), l.a.safari && Object(m.b)(window, "hashchange", r)) : "onhashchange" in window ? Object(m.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : r()
                        }) : a = setInterval(r, 200)
                    },
                    setOptions: function(e) {
                        n = Object(g.i)(n, e)
                    },
                    checker: r,
                    stop: function() {
                        vk.al < 3 ? clearInterval(a) : 3 == vk.al && Object(m.h)(window, "popstate", r)
                    }
                }
            }({
                onLocChange: function(e) {
                    var t = {
                        back: !0,
                        hist: !0
                    };
                    3 === vk.al && history.state && Object(g.x)(history.state) && (t.scrollTop = Object(g.r)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
                }
            })
        }
        var O = n("4+be"),
            j = n("lXE5"),
            E = n("Ia1d"),
            S = n("XuKo"),
            k = n("ErRf"),
            L = n("/PiP"),
            T = {
                sh: function(e, t) {
                    Object(h.tb)(e), Object(g.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(h.W)(e), Object(g.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, n, o) {
                    var i = "layers" + (boxQueue.count() + 1);
                    Object(k.c)(i, function() {}), Object(h.qb)(e, {
                        opacity: n || "",
                        backgroundColor: o || ""
                    }), T.visible || (Object(b.c)(), Object(j.a)()), T.visible || Object(E.f)(), T.visible = !0, Object(h.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(h.hb)(t, "box_layer_hidden") : Object(h.tb)(t), T.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    T.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(k.a)(e), t && t.visibilityHide ? Object(h.a)(t, "box_layer_hidden") : Object(h.W)(t), Object(h.ab)(layerWrap) || cur._inLayer || Object(h.ab)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(h.ab)(window.mvLayerWrap)) || Object(h.ab)(window.wkLayerWrap) || (T.visible = !1, Object(h.hb)(bodyNode, "layers_shown"), Object(b.c)(!0), Object(j.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), T.visible || Object(E.g)()
                }
            },
            P = {
                push: function(e) {
                    var t = void 0,
                        n = !!P.count() && P._layers[P._layers.length - 1];
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
                        VideoPlaylist.getCurListId() && (i = Object(g.i)(i, {
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
                    return n && t[0] == n[0] && t[1] == n[1] && t[2] == n[2] || P._layers.push(t), P.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = P._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    P._bl = !0, window.WkView && T.fullhide == WkView.hide ? (Object(h.W)(wkLayerWrap), clearTimeout(wkcur.showT)) : T.fullhide && T.fullhide(!0, !0), setTimeout(P.unblock, 5)
                },
                unblock: function() {
                    P._bl = !1
                },
                pop: function() {
                    if (P.count() && !P._bl) {
                        var e = P._layers.pop();
                        if (P.skipVideo && (P.skipVideo = !1, "video" == e[0])) return P._layers.push(e), void(P.skipVideo = !1);
                        "photo" === e[0] ? (Object(g.i)(e[3], {
                            fromQueue: !0
                        }), Object(L.y)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(g.i)(e[3], {
                            fromQueue: !0
                        }), Object(E.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(L.C)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(S.c)(e[1]) : "podcast" === e[0] && Object(L.A)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, n, o) {
                    for (var i = P._layers, r = i.length; r > 0; --r)
                        if (i[r - 1][0] == e && i[r - 1][1] == t || i[r - 1][0] == n && i[r - 1][1] == o) return P._layers = i.slice(0, r), P.pop(), !0;
                    return !1
                },
                count: function() {
                    return P._layers.length
                },
                clear: function() {
                    P._layers = []
                },
                _layers: []
            };
        var I = n("Xrg9");

        function R() {
            var e = {};
            Object(g.f)(Object(h.G)("_short_currency"), function() {
                var t = Object(h.s)(this, "short") || "";
                if (!t) return !0;
                var n = this.innerHTML,
                    o = Object(g.M)(n).length,
                    i = Object(h.O)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[i]) {
                    for (var r = "", a = o - 1; a >= 0; a--) r += "&#8399;";
                    var s = Object(h.e)("div", {
                        innerHTML: "<b>" + n + "</b><b>" + r + "</b>"
                    }, {
                        fontFamily: i,
                        fontSize: "24px"
                    });
                    Object(h.F)("utils").appendChild(s), e[i] = Math.abs(s.firstChild.offsetWidth - s.lastChild.offsetWidth) >= 2 * o, Object(h.fb)(s)
                }!1 === e[i] && Object(h.yb)(this, t)
            })
        }
        var x = n("0gG3"),
            C = n("XzvV"),
            N = n("v+DW"),
            A = n("lkNA");
        var B = function() {
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
                    Object(h.F)("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", function() {
                        return e.hub.done()
                    }), ajax.post("hints.php", {
                        act: "a_start_hints"
                    }, {
                        onDone: function(t) {
                            e.startHintsText = Object(g.H)(t), e.hintsHub.done()
                        }
                    }))
                }, e.prototype.show = function(e) {
                    var t = window.placeholderSetup;
                    if (Object(h.F)("quick_search") && !this.on) return this.on = 1, Object(h.tb)(this.sCont), t("search_input"), Object(h.F)("search_input").setAttribute("autocomplete", "off"), Object(h.a)(Object(h.F)("qsearch_link"), "active"), this.prev_content = Object(h.F)("content"), this.qsearch_cont || (this.qsearch_cont = Object(h.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(m.c)(e) : void 0
                }, e.prototype.go = function(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(g.H)(Object(h.F)("search_input").value) + "&name=1";
                    return Object(m.c)(e || window.event), location.href = t, !1
                }, e.prototype.init = function(e) {
                    this.sCont = Object(h.F)("quick_search"), this.opt = e || {}
                }, e.prototype.hide = function(e, t) {
                    if (Object(h.F)("quick_search") && (!this.active || t) && this.on) {
                        var n = window.toggleFlash;
                        if (this.on = 0, n(), this.beforeHide && this.beforeHide()) return !0;
                        Object(h.F)("search_input").setValue ? Object(h.F)("search_input").setValue("") : Object(h.F)("search_input").value = "", Object(h.W)(this.sCont), Object(h.hb)(Object(h.F)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }, e.prototype.preload = function() {}, e
            }(),
            M = n("Bszp"),
            D = n("MSYF"),
            F = n("kHqu"),
            H = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            o = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var a, s = e[Symbol.iterator](); !(o = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !o && s.return && s.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            V = "remixjsp";

        function U() {
            ! function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("paint").forEach(function(e) {
                    "first-contentful-paint" === e.name && K(e.startTime, "TTFCP")
                })
            }(),
            function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(function(e) {
                    if ("navigation" === e.initiatorType) {
                        var t = e.domComplete,
                            n = e.domContentLoadedEventEnd,
                            o = e.loadEventEnd;
                        K(t, "domComplete"), K(n, "domContentLoadedEventEnd"), K(o, "loadEventEnd")
                    }
                })
            }(), G()
        }
        var W = [],
            q = !1;

        function G() {
            if (q) {
                var e = window.performance,
                    t = W[W.length - 1];
                if (!t) return q = !1, void K(-1);
                var n = t.startTime + t.duration;
                e.now() - n >= 3e3 ? K(n, "TTI") : setTimeout(G, 3e3)
            }
        }
        var z = [];

        function K(e, t) {
            var n = Math.floor(e);
            if (-1 !== e && (z.push([n, t]), !(q ? "TTI" === t : z.length > 2))) return;
            var o = "unknown",
                i = navigator.connection;
            i && i.effectiveType && (o = i.effectiveType);
            var r = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            z.forEach(function(e) {
                var t = H(e, 2),
                    n = t[0],
                    i = t[1];
                return r.events.push([i, n, cur.module, o, window.vk.rv])
            }), Object(w.d)(V, JSON.stringify(r), .01)
        }

        function Y() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(function(e) {
                W = W.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), q = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout(U, 0)
            }) : U()
        }
        var Q = {
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
            X = n("1BRX"),
            J = n("W9Tc"),
            Z = n("98sY"),
            $ = n("El3O"),
            ee = n("EasH"),
            te = n("kcIO"),
            ne = n("FWc3");

        function oe(e, t) {
            var n = t.asrtl ? 0 : t.right ? 289 : 35,
                o = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
            return Object(ne.c)(e, {
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

        function ie(e, t) {
            return Object(ne.c)(e, {
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

        function re(e, t, n) {
            if (!cur._addRestoreInProgress) {
                var o = Object(h.T)("_audio_row", e),
                    i = AudioUtils.getAudioFromEl(o, !0),
                    r = Object(h.s)(e, "action"),
                    a = AudioUtils.getRowActionName(r, i, o),
                    s = {
                        text: function() {
                            return a
                        },
                        black: 1,
                        shift: t || [7, 4, 0],
                        needLeft: !0,
                        forcetodown: n
                    };
                each(["_im_mess_stack", "top_notify_wrap", "_ape_audio_item", "wk_history_audio_content"], function(t, n) {
                    if (Object(h.T)(n, e)) return s.appendParentCls = n, !1
                }), Object(h.T)("_im_mess_stack", e) && (s.shift = [7, 10, 0], s.noZIndex = !0), Object(ne.c)(e, s)
            }
        }

        function ae(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            Object(ne.c)(e, {
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
                appendEl: Object(h.n)("im-page-history-w", e) || Object(h.n)("rb_box_wrap", e) || Object(h.n)("wk_cont", e) || Object(h.n)("scroll_fix_wrap", e)
            })
        }

        function se(e) {
            var t = "";
            Object(h.T)("_im_mess_stack", e) && (t = "_im_mess_stack"), Object(ne.c)(e, {
                className: "bookmarks_tt ",
                shift: [32, 8],
                text: function() {
                    return "1" === Object(h.s)(e, "state") ? Object(h.s)(e, "remove") : Object(h.s)(e, "add")
                },
                black: 1,
                appendParentCls: t
            })
        }
        var de = n("Ieup"),
            ce = n("t/FQ"),
            we = n("aong"),
            ue = .5,
            le = .25,
            fe = 300,
            he = 1e3,
            pe = 3e5,
            be = 2500,
            ve = 5e3,
            me = 6e3,
            ge = 2e4,
            ye = 1e3,
            _e = 36e4,
            Oe = "_longViewType",
            je = "_longViewIdled",
            Ee = "_longViewModule",
            Se = "_longViewStarted",
            ke = "_longViewProcessed",
            Le = "_longViewCached",
            Te = "_longViewHeight",
            Pe = "_longViewTop",
            Ie = "_longViewBottom",
            Re = "REGULAR",
            xe = "AUTOPLAY_AD",
            Ce = "LongView.viewed",
            Ne = "LongView.idled",
            Ae = vk.longViewTestGroup,
            Be = [],
            Me = [],
            De = [],
            Fe = Date.now(),
            He = 0,
            Ve = 0,
            Ue = !1,
            We = null,
            qe = null,
            Ge = null,
            ze = null,
            Ke = {};

        function Ye() {
            var e = ft();
            e.length && (ct(e), ht())
        }

        function Qe() {
            Be.forEach(function(e) {
                e[Le] = !1
            })
        }

        function Xe(e, t) {
            "im" === t && !e[Oe] && function(e) {
                if (Object(h.V)(e, "im-mess--post")) return !0;
                var t = e && Object(h.u)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(h.V)(e, "no_posts"))
            }(e) && (e[Oe] = function(e) {
                var t = e && Object(h.u)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? xe : Re
            }(e), e[Ee] = t, Be.push(e))
        }

        function Je(e, t) {
            var n = Je;
            ! function(e, t) {
                var n = [];
                Be.forEach(function(o) {
                    gt(o) ? n.push(o) : ! function(e, t, n) {
                        return !e[Se] && bt(e, ue, t, n)
                    }(o, e, t) ? function(e, t, n) {
                        return e[Se] && !bt(e, le, t, n)
                    }(o, e, t) && (o[je] ? delete o[je] : (yt(Me, o), De = De.concat(mt(o))), delete o[Se]) : (o[Se] = Date.now(), Me.push(o))
                }), n.forEach(function(e) {
                    yt(Be, e)
                })
            }(e || Object(j.e)(), t || window.innerHeight), Ue ? (clearTimeout(n.timer), n.timer = setTimeout(Ze, 150)) : (Ue = !0, ot(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(h.H)("im-page--chat-header"),
                        t = Object(h.H)("im-page--chat-input");
                    He = e.getBoundingClientRect().top + e.offsetHeight, Ve = window.innerHeight - t.getBoundingClientRect().top
                } else He = Object(h.F)("page_header").offsetHeight, Ve = 0
            }())
        }

        function Ze() {
            ot(), nt(), Ue = !1
        }

        function $e() {
            ot(), dt()
        }

        function et() {
            De = [], Me.forEach(function(e) {
                return e[Se] = Date.now()
            }), wt(null), ut(null), nt()
        }

        function tt() {
            ot(), dt(), De = [], Me = [], wt(null), ut(null)
        }

        function nt() {
            We = setTimeout(it, be), qe = setTimeout(rt, ve), Ge = setTimeout(at, me), ze = setTimeout(st, ge)
        }

        function ot() {
            clearTimeout(We), clearTimeout(qe), clearTimeout(Ge), clearTimeout(ze)
        }

        function it() {
            De.length && wt(De)
        }

        function rt() {
            ct(De), De = [], wt(null)
        }

        function at() {
            Me.length && (ut(vt(Me, !0, !0)), Ge = setTimeout(at, ye))
        }

        function st() {
            clearTimeout(Ge), ct(vt(Me)), Me.forEach(function(e) {
                return e[je] = !0
            }), Me = [], ut(null)
        }

        function dt() {
            ct(De.concat(vt(Me)))
        }

        function ct(e) {
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
                    return Object(g.f)(t, function(e, t) {
                        return n.push(e + "_" + t.join(","))
                    }), n.join(";")
                }(e),
                long_view: 1
            })
        }

        function wt(e) {
            lt(Ce, e)
        }

        function ut(e) {
            lt(Ne, e)
        }

        function lt(e, t) {
            var n = I.a.get(e) || {};
            t ? n[Fe] = t : delete n[Fe], I.a.set(e, n)
        }

        function ft() {
            var e = ft,
                t = [],
                n = I.a.get(Ce) || {},
                o = I.a.get(Ne) || {};
            return e.iterator || (e.iterator = function(e) {
                return function(n) {
                    pt(n) && (t = t.concat(e[n]))
                }
            }), Object.keys(n).forEach(e.iterator(n)), Object.keys(o).forEach(e.iterator(o)), t
        }

        function ht() {
            var e = ht,
                t = I.a.get(Ce) || {},
                n = I.a.get(Ne) || {};
            e.iterator || (e.iterator = function(e) {
                return function(t) {
                    pt(t) && delete e[t]
                }
            }), Object.keys(t).forEach(e.iterator(t)), Object.keys(n).forEach(e.iterator(n)), I.a.set(Ce, t), I.a.set(Ne, n)
        }

        function pt(e) {
            var t = Number(e);
            return t !== Fe && Date.now() - t >= _e
        }

        function bt(e, t, n, o) {
            if (!e) return !1;
            e[Le] || (e[Le] = !0, e[Te] = e.offsetHeight, e[Pe] = n + e.getBoundingClientRect().top, e[Ie] = e[Pe] + e[Te]);
            var i = o - He - Ve,
                r = n + He,
                a = n + o - Ve,
                s = e[Te],
                d = e[Pe],
                c = e[Ie];
            return (c > r && d < a ? Math.min(a, c) - Math.max(r, d) : 0) >= Math.min(i * t, s * t)
        }

        function vt(e, t, n) {
            return e.map(function(e) {
                return mt(e, t, n)
            })
        }

        function mt(e, t, n) {
            if (gt(e)) return [];
            var o = Math.min(pe, Date.now() - e[Se]);
            if (e[Oe] === Re && o < fe || e[Oe] === xe && o < he) return [];
            n || (e[ke] = !0);
            var i = function(e) {
                    var t = e[Ee];
                    if ("im" === t) {
                        var n = Object(h.c)(e, "data-post-id"),
                            o = Object(h.c)(e, "data-copy"),
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
                r = function(e) {
                    return {
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
                    }["feed_other" === e ? "feed_" + cur.section : e] || "u"
                }(i.module),
                a = cur.feed_session_id || "na",
                s = [];
            for (var d in i)
                if ("index" !== d && "module" !== d && "q" !== d) {
                    var c = d.split("_"),
                        w = c[0],
                        u = c[1];
                    "ads" === w && (u = c[3]), /^post\d+$/.test(w) && (w = c[1], u = c[2]);
                    var l = void 0;
                    t || (Ke[l = w + "_" + u] || (Ke[l] = 0), Ke[l]++), s.push("ad" === w ? {
                        ownerId: "ad",
                        postId: u,
                        module: r,
                        viewIndex: Ke[l]
                    } : "ads" === w ? {
                        ownerId: "ads",
                        postId: u,
                        module: r,
                        index: i.index,
                        duration: o,
                        sessionId: a,
                        viewIndex: Ke[l]
                    } : {
                        ownerId: w,
                        postId: (1 === i[d] ? "" : "-") + u,
                        module: r,
                        index: i.index,
                        duration: o,
                        sessionId: a,
                        q: i.q || null,
                        viewIndex: Ke[l]
                    })
                }
            return s
        }

        function gt(e) {
            return "page_view" === Ae && e[ke] || !document.body.contains(e)
        }

        function yt(e, t) {
            var n = e.indexOf(t);
            n >= 0 && e.splice(n, 1)
        }
        var _t = n("QGEU"),
            Ot = n("eNQP"),
            jt = n("o7bv"),
            Et = n("wetz"),
            St = n("i6oL"),
            kt = n("m0N1");
        var Lt = n("W0P9");
        var Tt = function() {
            function e(t, n) {
                var o = this;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.sw = t, this.SWClient = n, vk.id && this.canBeEnabled().then(function(e) {
                    e && (o.listenPermission(), o.loadEndpoint() && o.update().then(function() {
                        var e = vk.pushNotificationQueue || {};
                        o.sw.action("updateMessageNotifications", e)
                    }))
                })
            }
            return e.getPermission = function() {
                return Notification.permission
            }, e.prototype.cleanNotification = function() {
                this.sw.action("cleanNotification")
            }, e.prototype.canBeEnabled = function() {
                return Promise.resolve(this.isSupported())
            }, e.prototype.isSupported = function() {
                return "PushManager" in window && "Notification" in window && this.SWClient.isSupported()
            }, e.prototype.loadEndpoint = function() {
                return I.a.get("push_notifier_endpoint" + vk.id) || !1
            }, e.prototype.saveEndpoint = function(e) {
                I.a.set("push_notifier_endpoint" + vk.id, e || !1)
            }, e.prototype.action = function(e, t) {
                return this.sw.action(e, t)
            }, e.prototype._needupdate = function(e) {
                var t = Date.now(),
                    n = this.loadEndpoint(),
                    o = I.a.get("push_notifier_subscribed_ts" + vk.id),
                    i = !1;
                return (n !== e.endpoint || !o || t - o > 6e4) && (I.a.set("push_notifier_subscribed_ts" + vk.id, t), i = !0), i
            }, e.prototype.listenPermission = function() {
                var e = this;
                navigator.permissions && navigator.permissions.query && navigator.permissions.query({
                    name: "notifications"
                }).then(function(t) {
                    t.onchange = function() {
                        return e.update()
                    }
                })
            }, e.prototype.update = function() {
                var t = this;
                return this.updatePermission().then(function(n) {
                    return n === e.PUSH_NOTIFIER_PERMISSION_GRANTED ? t.subscribe().catch(function(t) {
                        t !== e.SUBSCRIBE_ERROR_NETWORK && t("can not update subscribe")
                    }) : Promise.reject("premession_not_granted")
                }).catch(Lt.a)
            }, e.prototype.updatePermission = function() {
                var t = e.getPermission();
                if (t !== e.PUSH_NOTIFIER_PERMISSION_GRANTED) {
                    var n = this.loadEndpoint();
                    if (n) return this.unsubscribe(n).then(function() {
                        return t
                    })
                }
                return Promise.resolve(t)
            }, e.prototype.processSubscribe = function(t) {
                return t.subscribe({
                    userVisibleOnly: !0,
                    applicationServerKey: function(e) {
                        for (var t = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), n = window.atob(t), o = new Uint8Array(n.length), i = 0; i < n.length; ++i) o[i] = n.charCodeAt(i);
                        return o
                    }(e.SERVER_KEY)
                })
            }, e.prototype.setupSubscription = function() {
                var t = this;
                return new Promise(function(n, o) {
                    var i = e.getPermission(),
                        r = function() {
                            t.subscribe(!0).then(function() {
                                n()
                            }).catch(function() {
                                o()
                            })
                        };
                    i !== e.PUSH_NOTIFIER_PERMISSION_DENIED ? i !== e.PUSH_NOTIFIER_PERMISSION_GRANTED ? i === e.PUSH_NOTIFIER_PERMISSION_DEFAULT && t.requestPermission().then(function(t) {
                        t === e.PUSH_NOTIFIER_PERMISSION_GRANTED ? r() : o()
                    }) : r() : o(e.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS)
                })
            }, e.prototype.subscribe = function(t) {
                var n = this;
                return this.sw.register().then(function(e) {
                    var t = e.pushManager;
                    return t.getSubscription().then(function(e) {
                        if (e) {
                            var o = e.expirationTime;
                            return o && Date.now() > o - 432e6 ? n.unsubscribe(n.loadEndpoint()).then(function() {
                                return n.processSubscribe(t)
                            }) : e
                        }
                        return n.processSubscribe(t)
                    })
                }).then(function(o) {
                    return new Promise(function(i, r) {
                        if (t || n._needupdate(o)) {
                            var a = o.getKey("p256dh"),
                                s = o.getKey("auth");
                            window.ajax.post(e.SERVER_URL, {
                                act: "a_subscribe",
                                endpoint: o.endpoint,
                                key: a ? btoa(String.fromCharCode.apply(null, new Uint8Array(o.getKey("p256dh")))) : null,
                                token: s ? btoa(String.fromCharCode.apply(null, new Uint8Array(o.getKey("auth")))) : null
                            }, {
                                onDone: function(e) {
                                    e ? (n.saveEndpoint(o.endpoint), i()) : r()
                                },
                                onFail: function() {
                                    return r(e.SUBSCRIBE_ERROR_NETWORK), !0
                                }
                            })
                        } else i()
                    })
                })
            }, e.prototype.unsubscribe = function(t) {
                var n = this;
                return this.sw.register().then(function(o) {
                    return o.pushManager.getSubscription().then(function(o) {
                        return o ? o.unsubscribe().then(function(o) {
                            return o ? new Promise(function(o, i) {
                                ajax.post(e.SERVER_URL, {
                                    act: "a_unsubscribe",
                                    endpoint: t
                                }, {
                                    onDone: function(e) {
                                        e ? (n.saveEndpoint(!1), o()) : i()
                                    }
                                })
                            }) : Promise.reject("ERROR: can not unsubscribe")
                        }) : (n.saveEndpoint(!1), Promise.reject("ERROR: no subscription"))
                    })
                })
            }, e.prototype.requestPermission = function() {
                var t = e.getPermission();
                return t === e.PUSH_NOTIFIER_PERMISSION_DEFAULT ? new Promise(function(e, t) {
                    var n = Notification.requestPermission(function(t) {
                        e(t)
                    });
                    n instanceof Promise && n.then(e, t)
                }) : Promise.resolve(t)
            }, e
        }();
        Tt.SERVER_KEY = "BPrntRk2W1_ISFwlgY-vz9tQDg9i1oSQ3-N8xyjdbNAbIOdZIGFdh5FlO7zn730UwU9Sayoec-Fpqq4JZFTyv60", Tt.SERVER_URL = "push_notifier", Tt.PUSH_NOTIFIER_PERMISSION_GRANTED = "granted", Tt.PUSH_NOTIFIER_PERMISSION_DEFAULT = "default", Tt.PUSH_NOTIFIER_PERMISSION_DENIED = "denied", Tt.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS = "BLOCKED_BY_BROWSER_SETTINGS", Tt.SUBSCRIBE_ERROR_NETWORK = "SUBSCRIBE_ERROR_NETWORK";
        var Pt = Tt;
        var It = function(e) {
                function t(n, o) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var i = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n, o));
                    return i.canBeEnabled().then(function(e) {
                        e && (addClass(document.head, "push_notifier_supported"), i.handlerMessagesLP = i.handlerMessagesLP.bind(i))
                    }), i
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), t.prototype.isSupported = function() {
                    return e.prototype.isSupported.call(this) && (browser.chrome || browser.mozilla || browser.msie_edge)
                }, t.prototype.handlerMessagesLP = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.type,
                        n = e.peerId,
                        o = e.upToId;
                    "event_read_inbound" === t && this.sw.action("removeMessageNotification", {
                        peerId: n,
                        msgId: o
                    })
                }, t.prototype.handlerPopup = function(e, t) {
                    var n = this,
                        o = window.curBox();
                    o && window.hide(o.bodyNode), this.setupSubscription().then(function() {
                        return n.setState(e, t)
                    }).then(function() {
                        o && o.hide()
                    }).catch(function(e) {
                        Pt.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === e ? (window.show(window.curBox().bodyNode), n.showPopupAllowNotification()) : Object(ee.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                    })
                }, t.prototype.showPopupAllowNotification = function() {
                    var e = Object(ee.b)(Pt.SERVER_URL, {
                        act: "popup_allow_notification"
                    }, {
                        params: {
                            hideButtons: !0
                        },
                        containerClass: "PushNotifierPopup__popup-box_type--allow-notification",
                        onFail: function() {
                            e ? e.hide() : Object(ee.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                        }
                    })
                }, t.prototype._removeLongPollListener = function() {
                    this.lp && this.lp.offData(this.handlerMessagesLP), this.lp = null
                }, t.prototype._addLongPollListener = function() {
                    !this.lp && window.Notifier && (this.lp = Notifier.getLpInstance(), this.lp && this.lp.onData(this.handlerMessagesLP))
                }, t.prototype.setState = function(e, t) {
                    return new Promise(function(n, o) {
                        ajax.post(Pt.SERVER_URL, {
                            act: "a_toggle_state",
                            state: e,
                            hash: t
                        }, {
                            onDone: function(e) {
                                return e ? n() : o()
                            },
                            onFail: o
                        })
                    })
                }, t.prototype.update = function() {
                    var t = this;
                    return e.prototype.update.call(this).then(function() {
                        return t._addLongPollListener()
                    })
                }, t.prototype.unsubscribe = function(t) {
                    var n = this;
                    return e.prototype.unsubscribe.call(this, t).then(function() {
                        return n._removeLongPollListener()
                    })
                }, t
            }(Pt),
            Rt = "sw";

        function xt(e) {
            return {
                type: Rt,
                data: e
            }
        }

        function Ct(e) {
            return ("" === e.origin || e.origin.match(/^https:\/\/([a-zA-Z0-9\-\.]+\.)?vk\.com$/)) && e.data && e.data.data && e.data.type === Rt
        }
        var Nt = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        o = !0,
                        i = !1,
                        r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(o = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0);
                    } catch (e) {
                        i = !0, r = e
                    } finally {
                        try {
                            !o && s.return && s.return()
                        } finally {
                            if (i) throw r
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        var At = function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.registration = null, this._handlers = []
                }
                return e.addVersion = function(e) {
                    return vk && vk.sw_version ? e + "?v=" + vk.sw_version : e
                }, e.isSupported = function() {
                    return "serviceWorker" in navigator
                }, e.prototype.register = function() {
                    var t = this;
                    return e.isSupported() ? this.registration ? Promise.resolve(this.registration) : navigator.serviceWorker.register(e.addVersion("/js/cmodules/sw/sw.js"), {
                        scope: "/"
                    }).then(this._onactive.bind(this)).then(function(e) {
                        return t.registration || (t.registration = e, t._addEventListener(navigator.serviceWorker, "message", t._onmessage.bind(t), !1)), e
                    }) : Promise.reject("serviceWorker is unavailable")
                }, e.prototype.unregister = function() {
                    this.registration && this.registration.unregister(), this._handlers.forEach(function(e) {
                        return e[0].removeEventListener(e[1], e[2])
                    }), this._handlers = []
                }, e.prototype.update = function() {
                    this.registration && this.registration.update()
                }, e.prototype._addEventListener = function(e, t, n) {
                    var o = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                        i = !1;
                    this._handlers.forEach(function(o) {
                        o[0] === e && o[1] === t && o[2] === n && (i = !0)
                    }), i && !o || (this._handlers.push([e, t, n]), e.addEventListener(t, n))
                }, e.prototype._onactive = function(e) {
                    var t = this;
                    return e.active ? Promise.resolve(e) : new Promise(function(n) {
                        t._addEventListener(e.installing, "statechange", function(t) {
                            "activated" === t.currentTarget.state && n(e)
                        })
                    })
                }, e.prototype.action_devicePixelRatio = function() {
                    return window.devicePixelRatio
                }, e.prototype.action = function(e, t) {
                    var n = Array.isArray(e) ? e : [
                        [e, t]
                    ];
                    return this._message({
                        actions: n
                    }).then(function(e) {
                        return e.answers ? Promise.resolve(1 === n.length ? e.answers[0] : e.answers) : Promise.reject(new Error("ServiceWorker answer is incorrect"))
                    })
                }, e.prototype._message = function(e) {
                    var t = this;
                    return this.register().then(function() {
                        return new Promise(function(n, o) {
                            var i = new MessageChannel;
                            i.port1.onmessage = function(e) {
                                Ct(e) ? n(e.data.data) : o(new Error("ServiceWorker message is incorrect"))
                            }, t.registration.active.postMessage(xt(e), [i.port2])
                        })
                    })
                }, e.prototype._onmessage = function(e) {
                    var t = this;
                    if (Ct(e)) {
                        var n = e.data.data;
                        if (n.actions && Array.isArray(n.actions)) {
                            var o = [];
                            n.actions.forEach(function(n) {
                                var i = Nt(n, 2),
                                    r = i[0],
                                    a = i[1],
                                    s = "action_" + r;
                                o.push(Promise.resolve(t[s] ? t[s](a, e) : void 0))
                            }), Promise.all(o).then(function(t) {
                                var n = {};
                                t.forEach(function(e, t) {
                                    void 0 !== e && (n[t] = e)
                                }), Object.keys(n).length && e.ports[0].postMessage(xt({
                                    answers: n
                                }))
                            })
                        }
                    }
                }, e
            }(),
            Bt = window.isMVK ? "mvk" : "web",
            Mt = {
                start: function(e, t) {
                    var n = this;
                    if (t.stopPropagation(), t.preventDefault(), this.id = window.domData(e, "id"), this.id && (window.statlogsValueEvent("special_event", "click", Bt, this.id), !this.timeoutHandle)) {
                        var o = Number(window.domData(e, "v")) || 0;
                        this.duration || (this.duration = Number(window.domData(e, "duration")) || 0), this.duration && (!this.animationData || !this.animationData.v || "number" == typeof this.v && this.v !== o ? (this.v = o, this._getAnimation().then(function(e) {
                            return n.animationData = JSON.parse(e), n._loadBodymovin()
                        }).then(function() {
                            return n._play()
                        })) : this._play())
                    }
                },
                _getAnimation: function() {
                    var e = this;
                    return new Promise(function(t) {
                        var n = new XMLHttpRequest;
                        n.open("GET", "/images/stickers/special/" + e.id + "/animation.json?v=" + e.v, !0), n.send(), n.onreadystatechange = function() {
                            4 === n.readyState && t(n.responseText)
                        }
                    })
                },
                _play: function() {
                    var e = this;
                    if (window.bodymovin) {
                        this.frame || (this.frame = document.createElement("div"), this.frame.className = "special_event_frame", document.body.appendChild(this.frame)), this.frame.style.display = "block";
                        var t = window.bodymovin.loadAnimation({
                            container: this.frame,
                            renderer: "svg",
                            loop: !0,
                            autoplay: !0,
                            animationData: this.animationData
                        });
                        this.timeoutHandle = setTimeout(function() {
                            t.stop(), t.destroy(), e.frame.style.display = "none", e.timeoutHandle = null, window.statlogsValueEvent("special_event", "showed", Bt, e.id)
                        }, this.duration)
                    }
                },
                _loadBodymovin: function() {
                    return new Promise(function(e) {
                        if (window.bodymovin) e();
                        else if (window.isMVK) {
                            var t = document.createElement("script");
                            t.src = "/js/cmodules/web/bodymovin.js", t.onload = function() {
                                return e()
                            }, document.head.appendChild(t)
                        } else stManager.add([jsc("web/bodymovin.js")], e)
                    })
                }
            },
            Dt = n("B3ia");
        a.polyfill(), window.Map = o, window.Set = i;
        var Ft = window.vk;

        function Ht() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, Ft.width = 960, Ft.started = Object(g.L)(), Ft.counts = {}, l.a.android && (Object(w.d)("remixscreen_width", window.screen.width, 365), Object(w.d)("remixscreen_height", window.screen.height, 365), Object(w.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(w.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(w.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(F.e)(), Object(x.b)(), Object(m.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(m.h)(vkCache[e].handle.elem)
            }), Object(m.b)(window, "DOMContentLoaded load", function() {
                Ft.loaded || (Ft.loaded = !0, Object(N.y)()), Object($.c)()
            }), Object(m.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(m.b)(document, "keydown", Et.a)
        }
        var Vt = 0;

        function Ut() {
            if (window.headNode = Object(h.J)("head"), window.icoNode = Object(h.J)("link", headNode), window.bodyNode = Object(h.J)("body"), window.htmlNode = Object(h.J)("html"), window.utilsNode = Object(h.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(m.b)(bodyNode, "resize", $.j.pbind(!1)), utilsNode) {
                l.a.mozilla ? Object(h.a)(bodyNode, "firefox") : l.a.mobile && Object(h.a)(bodyNode, "mobfixed"), Object(ce.f)(), Object(x.a)();
                var e = Object(h.F)("layer_bg"),
                    t = e.nextSibling,
                    n = Object(h.F)("box_layer_bg"),
                    o = n.nextSibling;
                window.layerBG = e, window.boxLayerBG = n, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = o, window.boxLayer = o.firstChild, window.boxLoader = o.firstChild.firstChild, window._stlSide = Object(h.F)("stl_side"), window._stlLeft = Object(h.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, l.a.mobile || Object(St.a)(), Object(m.b)(o, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(o), window.layers = function(e, t, n, o) {
                    return window.layerQueue = P, Object(g.i)(T, {
                        show: T._show.pbind(e, t),
                        boxshow: T._show.pbind(n, o),
                        wrapshow: T._show.pbind(e),
                        hide: T._hide.pbind(e, t),
                        boxhide: T._hide.pbind(n, o),
                        wraphide: T._hide.pbind(e)
                    }), T
                }(e, t, n, o), hab.init(), window._retinaInit ? window._retinaInit() : Vt = 1, window.PushNotifier = It, window.sw = new At, window.sw.register().then(function() {
                    window.pushNotifier = new It(window.sw, At)
                })
            }
        }

        function Wt() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: function() {
                        return cur.module
                    },
                    getOID: function() {
                        return cur.oid
                    },
                    doesScrollTriggerIdle: !0
                })), Object(St.b)();
                var e = Object(h.F)("side_bar");
                window.pageNode = Object(h.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(h.O)(e, "position"), window._tbLink = Object(h.F)("top_back_link"), l.a.chrome || l.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = l.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(g.L)() - Ft.started, 10),
                    n = Object(g.r)((Ft.contlen || 1) / t * 1e3);
                l.a.mozilla && l.a.version >= 4 ? n /= 2.5 : l.a.mozilla ? n *= 1.5 : l.a.msie && l.a.version >= 7 ? n /= 1.5 : l.a.msie && (n *= 2.5);
                var o = Object(g.r)(150 * Math.max(2e6 / n, 1));
                if (x.d.highlimit = 6 * o, x.d.lowlimit = Math.min(o, 600), Object($.j)(), setTimeout($.j.pbind(!1), 0), Object(_t.c)(), window.addEventListener("scroll", $.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !Ft.id && I.a.checkVersion() && I.a.get("last_reloaded")) try {
                    var i = {};
                    Object(g.f)(["sound_notify_off", "im_ui_notify_off"], function(e, t) {
                        var n = I.a.get(t);
                        null !== n && (i[t] = n)
                    }), window.localStorage.clear(), Object(g.f)(i, function(e, t) {
                        return I.a.set(e, t)
                    })
                } catch (e) {}
            }
        }
        var qt = function() {
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

        function Gt(e) {
            Ft.loaded ? e() : Object(m.b)(window, "load", e)
        }

        function zt() {
            window.showWriteMessageBox = de.g, window.giftsBox = de.a, window.moneyTransferBox = de.d, window.reportAd = de.e, window.mobilePromo = de.c, window.showAudioClaimWarning = de.f, window.menuSettings = de.b, window.sureDeleteAll = de.h, window.TopNotifier = Object(L.m)(), window.showPhoto = L.y, window.showManyPhoto = L.x, window.showAlbums = L.v, window.showAlbum = L.u, window.showPhotoTags = L.z, window.isPhotoeditor3Available = L.p, window.AudioMessagePlayer = L.a, window.showVideoTags = L.B, window.videoCallback = L.D, window.showWiki = L.C, window.showApp = L.w, window.showPodcast = L.A, window.podcastStartFrom = L.s, window.articlePrepare = L.b, window.isArticleLayerOpen = L.o, window.isArticleEditorAvailable = L.n, window.openArticleEditor = L.r, window.mentionOver = ae, window.mentionClick = L.q, window.mobileOnlineTip = oe, window.pageVerifiedTip = ie, window.audioShowActionTooltip = re, window.shareAudioPlaylist = L.t, window.getAudioPlayer = L.k, window.deleteAudioOnClaim = L.j, window.initTopAudioPlayer = L.l, window.bookmark = L.c, window.bookmarkPost = L.i, window.bookmarkArticle = L.d, window.bookmarkLink = L.f, window.bookmarkPodcast = L.h, window.bookmarkNarrative = L.g, window.bookmarkEvent = L.e, window.bookmarkTooltip = se, window.showStory = S.c, window.showNarrative = S.b, window.storiesPreloadStatic = S.d, window.sendMask = S.a
        }
        window.constants = {
            Groups: Q
        }, window.partConfigEnabled = J.a, Object(h.X)(), window.ge = h.F, window.geByTag = h.I, window.geByTag1 = h.J, window.geByClass = h.G, window.geByClass1 = h.H, window.gpeByClass = h.T, window.domQuery = h.B, window.domQuery1 = h.C, window.domClosest = h.n, window.ce = h.e, window.cf = h.f, window.re = h.fb, window.se = h.mb, window.sech = h.nb, window.rs = h.lb, window.psr = h.eb, window.domReplaceEl = h.D, window.domEL = h.t, window.domNS = h.y, window.domPS = h.A, window.domFC = h.u, window.domLC = h.x, window.domPN = h.z, window.domChildren = h.m, window.domInsertBefore = h.w, window.domInsertAfter = h.v, window.domByClass = h.j, window.domData = h.s, window.domChildIndex = h.l, window.domCA = h.k, window.domClosestSibling = h.r, window.matchesSelector = h.db, window.isHover = h.Z, window.isAncestor = h.Y, window.getScroll = h.M, window.domClosestPositioned = h.q, window.domClosestOverflowHidden = h.p, window.show = h.tb, window.hide = h.W, window.isVisible = h.ab, window.clientHeight = h.h, window.getClientRectOffsetY = h.K, window.toggle = h.ub, window.boundingRectEnabled = h.d, window.getXYRect = h.R, window.getXY = h.Q, window.isWindow = h.bb, window.getSize = h.N, window.hasClass = h.V, window.addClass = h.a, window.addClassDelayed = h.b, window.removeClass = h.hb, window.removeClassDelayed = h.ib, window.toggleClass = h.vb, window.toggleClassDelayed = h.wb, window.replaceClass = h.kb, window.getStyle = h.O, window.setStyle = h.qb, window.setStyleDelayed = h.rb, window.setPseudoStyle = h.pb, window.data = h.i, window.attr = h.c, window.removeAttr = h.gb, window.removeData = h.jb, window.cleanElems = h.g, window.setTitle = h.sb, window.getZoom = h.S, window.val = h.yb, window.elfocus = h.E, window.traverseParent = h.xb, window.getH = h.L, window.getW = h.P, window.domClosestByTag = h.o, window.setDocumentTitle = h.ob, window.lockDocumentTitle = h.cb, window.KEY = m.a, window.addEvent = m.b, window.removeEvent = m.h, window.triggerEvent = m.j, window.cancelEvent = m.c, window.stopEvent = m.i, window.normEvent = m.g, window.checkEvent = m.d, window.checkKeyboardEvent = m.e, window.checkOver = m.f, Object(g.q)(), window.isRetina = g.y, window.extractUrls = g.j, window.serializeForm = g.F, window.addTemplates = g.a, window.getTemplate = g.n, window.rand = g.D, window.irand = g.s, window.isUndefined = g.A, window.isFunction = g.v, window.isArray = g.t, window.isString = g.z, window.isObject = g.x, window.isEmpty = g.u, window.vkNow = g.L, window.vkImage = g.J, window.trim = g.H, window.stripHTML = g.G, window.escapeRE = g.h, window.intval = g.r, window.floatval = g.k, window.positive = g.C, window.isNumeric = g.w, window.winToUtf = g.M, window.replaceEntities = g.E, window.clean = g.c, window.unclean = g.I, window.each = g.f, window.indexOf = g.p, window.inArray = g.o, window.clone = g.d, window.arrayKeyDiff = g.b, window.extend = g.i, window.vkLocal = g.K, window.lTimeout = g.B, window.getCaretCharacterOffsetWithin = g.m, window.formatCount = g.l, window.encodeHtml = g.g, window.decodeHtml = g.e, Object(u.c)(), window.ajx2q = u.b, window.q2ajx = u.f, window.requestBox = u.g, window.activateMobileBox = u.a, window.validateMobileBox = u.h, window.validatePassBox = u.i, window.photoCaptchaBox = u.e, Object(w.c)(), window.getCookie = w.a, window.setCookie = w.d, window.hideCookiesPolicy = w.b, Object(Z.c)(), window.debugLog = Z.b, window.debugEl = Z.a, window.isToday = X.c, window.isYesterday = X.e, window.isTomorrow = X.d, window.isSameDate = X.b, window.leadingZero = X.f, window.formatTime = X.a, window.parseLatin = O.o, window.parseCyr = O.m, window.parseLatKeys = O.n, window.langNumeric = O.i, window.langSex = O.j, window.langStr = O.k, window.addLangKeys = O.a, window.getLang = O.d, window.langDate = O.h, window.getShortDate = O.e, window.getShortDateOrTime = O.f, window.langWordNumeric = O.l, window.getDateText = O.c, window.getBigDateNew = O.b, window.getSmDate = O.g, window.scrollToY = j.g, window.scrollToTop = j.f, window.scrollGetX = j.d, window.scrollGetY = j.e, window.disableBodyScroll = j.a, window.enableBodyScroll = j.b, window.Chat = ce.a, window.__qlTimer = null, window.__qlClear = ce.b, window.onLoginDone = ce.m, window.onLoginFailed = ce.n, window.onLoginCaptcha = ce.l, window.onLoginReCaptcha = ce.o, window.storePasswordCredential = ce.p, window.cssAnim = ce.c, window.imagesLoader = ce.e, window.nodeUpdated = ce.k, window.hideNewsAnnounce = ce.d, window.leftAdBlockClose = ce.h, window.leftBlockToggleFriend = ce.j, window.leftBlockFriendTooltip = ce.i, window.placeholderSetup = jt.c, window.placeholderInit = jt.b, window.isInputActive = jt.a, window.showTooltip = ne.c, window.showTitle = ne.b, window.showHint = ne.a, window.topMsg = c.d, window.showMsg = c.b, window.topError = c.c, window.showGlobalPrg = c.a, window.checkTextLength = we.b, window.getSelectionText = we.d, window.goAway = we.e, window.debounce = we.c, window.hashCode = we.h, window.isFullScreen = we.i, window.parallel = we.l, window.parseJSON = we.m, window.shuffle = we.n, window.throttle = we.o, window.toggleOnline = we.r, window.updateMoney = we.t, window.onlinePlatformClass = we.k, window.Fx = v.a, window.fx = v.a, window.animate = v.b, window.cubicBezier = v.d, window.fadeTo = v.g, window.genFx = v.i, window.getRGB = v.k, window.getColor = v.j, window.slideDown = v.l, window.slideUp = v.n, window.slideToggle = v.m, window.fadeIn = v.e, window.fadeOut = v.f, window.fadeToggle = v.h, window.animateCount = v.c, window.updateAriaElements = _t.c, window.updateAriaCheckboxes = _t.b, window.hasAccessibilityMode = _t.a, window.cancelStackFilter = k.a, window.cancelStackPush = k.c, window.cancelStackPop = k.b, Object(Dt.a)(), window.ElementTooltip = f.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = p, 1 === Ft.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== Ft.al || history.pushState || (Ft.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), Ft.version = !1), Object(x.c)(), window.stManager = x.d, Object(l.c)(), window.browser = l.a, window.mobPlatforms = l.d, window.browserFeatures = l.b, Object(b.a)(), window.toggleFlash = b.c, window.renderFlash = b.b, Ht(), window.updateHeaderStyles = F.i, window.updateNarrow = $.m, window.checkPageBlocks = $.c, window.redraw = $.l, window.onBodyResize = $.j, window.onBodyScroll = $.k, window.leftBlockOver = $.i, window.leftBlockOut = $.h, window.leftBlockHide = $.g, window.onDocumentClick = Et.c, window.onEnter = Et.d, window.onCtrlEnter = Et.b, window.logLeftMenuClicks = C.a, window.autosizeSetup = $.b, window.getProgressBarEl = $.e, window.getProgressHtml = $.f, Object(kt.b)(), Y(), window.onDomReady = function(e) {
            return e()
        }, window.currentModule = function() {
            return cur.currentModule ? cur.currentModule() : cur.module
        }, window.hab = _(), window.ls = I.a, window.shortCurrency = R, window.statlogsValueEvent = C.d, window.saveSearchAttemptStats = C.c, window.removeSearchPositionTracker = C.b, window.callHub = qt, window.CallHub = qt, window.gSearch = new B, window.zNav = F.l, window.handlePageView = F.d, window.handlePageParams = F.c, window.handlePageCount = F.b, window.updateOtherCounters = F.k, window.processDestroy = F.f, window.globalHistoryDestroy = F.a, window.showBackLink = F.h, window.nav = D.a, nav.init(), Ft.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === t[1] && 12 === Ft.time[1] ? Ft.time[1] = 0 : 12 === t[1] && 1 === Ft.time[1] ? t[1] = 0 : (t[1] > Ft.time[1] + 1 || Ft.time[1] > t[1] + 1) && (t[1] = Ft.time[1] = t[2] = Ft.time[2] = 0), t[1] > Ft.time[1] && 1 === t[2] ? 31 === Ft.time[2] || (4 === Ft.time[1] || 6 === Ft.time[1] || 9 === Ft.time[1] || 11 === Ft.time[1]) && 30 === Ft.time[2] || 2 === Ft.time[1] && (29 === Ft.time[2] || 28 === Ft.time[2] && Ft.time[0] % 4) ? Ft.time[2] = 0 : Ft.time[2] = t[2] = 0 : Ft.time[1] > t[1] && 1 === Ft.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && Ft.time[0] % 4) ? t[2] = 0 : t[2] = Ft.time[2] = 0), (t[2] > Ft.time[2] + 1 || Ft.time[2] > t[2] + 1) && (t[2] = Ft.time[2] = 0);
            var n = 60 * (60 * (24 * (t[2] - Ft.time[2]) + (t[3] - Ft.time[3])) + (t[4] - Ft.time[4]));
            n < -55800 ? n += 86400 : n > 37800 && (n -= 86400);
            var o = 0,
                i = Math.abs(n);
            Object(g.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], function(e, t) {
                var r = Math.round(3600 * (t - 3)),
                    a = Math.abs(n - r);
                a < i && (i = a, o = r)
            }), Ft.dt = o, Object(w.a)("remixdt") !== Ft.dt && Object(w.d)("remixdt", Ft.dt, 365);
            var r = Object(g.r)(Object(w.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!l.a.iphone || Object(w.a)("remixme")) ? 1 & r || (Object(w.d)("remixrt", 1 | r, 365), window._retinaInit = function() {
                x.d.add(["retina.css"]), Object(h.a)(document.body, "is_2x")
            }, Vt && window._retinaInit()) : 1 & r && Object(w.d)("remixrt", 1 ^ r, 365)
        }, 0), window.boxQueue = Object(te.c)(), window.__bq = boxQueue, window.curBox = te.b, Object(te.d)(), window.boxRefreshCoords = te.a, window.MessageBox = ee.a, window.showBox = ee.b, window.showTabbedBox = ee.f, window.showFastBox = ee.d, window.showCaptchaBox = ee.c, window.showReCaptchaBox = ee.e, window.showDoneBox = te.e, window.TopMenu = $.a, window.TopSearch = M.a, window.handleScroll = we.f, window.loadScript = A.a, window.SpecialEvent = Mt, Object(N.j)(), window.notaBene = N.q, window.updSideTopLink = N.y, window.createButton = N.d, window.actionsMenuItemLocked = N.a, window.lockActionsMenuItem = N.n, window.unlockActionsMenuItem = N.v, window.linkLocked = N.m, window.lockLink = N.p, window.unlockLink = N.x, window.lockButton = N.o, window.unlockButton = N.w, window.buttonLocked = N.b, window.isButtonLocked = N.k, window.disableButton = N.f, window.sbWidth = N.t, window.isChecked = N.l, window.checkbox = N.c, window.disable = N.e, window.radioval = N.s, window.radiobtn = N.r, window.showProgress = N.u, window.hideProgress = N.i, window.disableEl = N.g, window.enableEl = N.h, Object(E.d)(), window.VideoConstants = E.a, window.showVideo = E.j, window.showInlineVideo = E.i, window.loadInlineVideo = E.e, window.revertLastInlineVideo = E.h, window.destroyInlineVideoPlayer = E.c, window.pauseLastInlineVideo = E.f, window.playLastInlineVideo = E.g, window.checkMp4 = E.b, window.performance && window.performance.memory && Object(g.D)(0, 100) < 5 && Object(Ot.a)(), Ae ? (Object(m.b)(window, "blur", $e), Object(m.b)(window, "focus", et), onDomReady(function() {
            return setTimeout(Ye, 500)
        }), window.LongView = {
            register: Xe,
            onScroll: Object(we.o)(Je, 50),
            onBeforePageChange: tt,
            clearElemsCache: Qe,
            _debug: function() {
                return {
                    started: Me,
                    tracking: Be,
                    viewedData: De,
                    viewIndexes: Ke,
                    blindTop: He,
                    blindBottom: Ve
                }
            }
        }) : window.LongView = {
            register: function() {},
            onScroll: function() {},
            onBeforePageChange: function() {},
            clearElemsCache: function() {}
        }, Object(ce.g)(), zt(), window.onLoaded = Gt, window.domStarted = Ut, window.domReady = Wt, Object(Z.b)("common module enabled"), x.d.done(jsc("web/common_web.js"))
    }
});