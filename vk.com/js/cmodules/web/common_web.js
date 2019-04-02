! function(e) {
    function t(t) {
        for (var o, a, d = t[0], w = t[1], c = t[2], l = 0, u = []; l < d.length; l++) a = d[l], i[a] && u.push(i[a][0]), i[a] = 0;
        for (o in w) Object.prototype.hasOwnProperty.call(w, o) && (e[o] = w[o]);
        for (s && s(t); u.length;) u.shift()();
        return r.push.apply(r, c || []), n()
    }

    function n() {
        for (var e, t = 0; t < r.length; t++) {
            for (var n = r[t], o = !0, d = 1; d < n.length; d++) {
                var w = n[d];
                0 !== i[w] && (o = !1)
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
    var d = window.webpackJsonp = window.webpackJsonp || [],
        w = d.push.bind(d);
    d.push = t, d = d.slice();
    for (var c = 0; c < d.length; c++) t(d[c]);
    var s = w;
    r.push([75, "common"]), n()
}({
    "4O8T": function(e, t, n) {
        var o;
        ! function(t) {
            "use strict";

            function i() {}
            var r = i.prototype,
                a = t.EventEmitter;

            function d(e, t) {
                for (var n = e.length; n--;)
                    if (e[n].listener === t) return n;
                return -1
            }

            function w(e) {
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
                for (n in o) o.hasOwnProperty(n) && -1 === d(o[n], t) && o[n].push(i ? t : {
                    listener: t,
                    once: !1
                });
                return this
            }, r.on = w("addListener"), r.addOnceListener = function(e, t) {
                return this.addListener(e, {
                    listener: t,
                    once: !0
                })
            }, r.once = w("addOnceListener"), r.defineEvent = function(e) {
                return this.getListeners(e), this
            }, r.defineEvents = function(e) {
                for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
                return this
            }, r.removeListener = function(e, t) {
                var n, o, i = this.getListenersAsObject(e);
                for (o in i) i.hasOwnProperty(o) && -1 !== (n = d(i[o], t)) && i[o].splice(n, 1);
                return this
            }, r.off = w("removeListener"), r.addListeners = function(e, t) {
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
            }, r.removeAllListeners = w("removeEvent"), r.emitEvent = function(e, t) {
                var n, o, i, r, a = this.getListenersAsObject(e);
                for (r in a)
                    if (a.hasOwnProperty(r))
                        for (n = a[r].slice(0), i = 0; i < n.length; i++) !0 === (o = n[i]).once && this.removeListener(e, o.listener), o.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, o.listener);
                return this
            }, r.trigger = w("emitEvent"), r.emit = function(e) {
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
    75: function(e, t, n) {
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
        var o, i, r, a, d = n("qKs0"),
            w = n("VXxg");
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
                d = arguments.length;
            if (!d) return "";
            for (var w = ""; ++a < d;) {
                var c = Number(arguments[a]);
                if (!isFinite(c) || c < 0 || c > 1114111 || r(c) != c) throw RangeError("Invalid code point: " + c);
                c <= 65535 ? o.push(c) : (t = 55296 + ((c -= 65536) >> 10), n = c % 1024 + 56320, o.push(t, n)), (a + 1 == d || o.length > 16384) && (w += i.apply(null, o), o.length = 0)
            }
            return w
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
                        for (var r = Object.keys(Object(i)), a = 0, d = r.length; a < d; a++) {
                            var w = r[a],
                                c = Object.getOwnPropertyDescriptor(i, w);
                            void 0 !== c && c.enumerable && (n[w] = i[w])
                        }
                }
                return n
            }
        }), Number.isInteger = Number.isInteger || function(e) {
            return "number" == typeof e && isFinite(e) && Math.floor(e) === e
        };
        var c, s, l, u, f, h, b, p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        c = window, s = c.HTMLCanvasElement && c.HTMLCanvasElement.prototype, l = c.Blob && function() {
            try {
                return Boolean(new Blob)
            } catch (e) {
                return !1
            }
        }(), u = l && c.Uint8Array && function() {
            try {
                return 100 === new Blob([new Uint8Array(100)]).size
            } catch (e) {
                return !1
            }
        }(), f = c.BlobBuilder || c.WebKitBlobBuilder || c.MozBlobBuilder || c.MSBlobBuilder, h = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, b = (l || f) && c.atob && c.ArrayBuffer && c.Uint8Array && function(e) {
            var t, n, o, i, r, a, d, w, c;
            if (!(t = e.match(h))) throw new Error("invalid data URI");
            for (n = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), o = !!t[4], i = e.slice(t[0].length), r = o ? atob(i) : decodeURIComponent(i), a = new ArrayBuffer(r.length), d = new Uint8Array(a), w = 0; w < r.length; w += 1) d[w] = r.charCodeAt(w);
            return l ? new Blob([u ? d : a], {
                type: n
            }) : ((c = new f).append(a), c.getBlob(n))
        }, c.HTMLCanvasElement && !s.toBlob && (s.mozGetAsFile ? s.toBlob = function(e, t, n) {
            e(n && s.toDataURL && b ? b(this.toDataURL(t, n)) : this.mozGetAsFile("blob", t))
        } : s.toDataURL && b && (s.toBlob = function(e, t, n) {
            e(b(this.toDataURL(t, n)))
        })), "function" == typeof define && define.amd ? define(function() {
            return b
        }) : "object" == ("undefined" == typeof module ? "undefined" : p(module)) && module.exports ? module.exports = b : c.dataURLtoBlob = b;
        var m = n("E2g8"),
            v = n("4O8T");
        window.EventEmitter = v;
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
        var g = n("ryw6"),
            y = n("kMSP"),
            O = n("Kngp"),
            _ = n("gdug"),
            j = n("k487"),
            k = n("zxIV");

        function L(e, t) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
                var n = Object(k.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(n, icoNode), icoNode = n
            }
        }
        var E = n("HhI8"),
            x = n("7jxN"),
            C = n("Egk5"),
            T = n("t7n3"),
            S = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            o = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var a, d = e[Symbol.iterator](); !(o = (a = d.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !o && d.return && d.return()
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
                            n = S(t, 2),
                            o = n[0],
                            i = n[1],
                            r = o.split("?"),
                            a = S(r, 2),
                            d = a[0],
                            w = a[1];
                        return d + (w ? "?" + Object(O.b)(Object(O.f)(w)) : "") + (i ? "#" + i : "")
                    },
                    n = Object(T.i)({
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
                        1 == vk.al && r(!0), 3 == vk.al ? (Object(C.b)(window, "popstate", r), _.a.safari && Object(C.b)(window, "hashchange", r)) : "onhashchange" in window ? Object(C.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : r()
                        }) : a = setInterval(r, 200)
                    },
                    setOptions: function(e) {
                        n = Object(T.i)(n, e)
                    },
                    checker: r,
                    stop: function() {
                        vk.al < 3 ? clearInterval(a) : 3 == vk.al && Object(C.h)(window, "popstate", r)
                    }
                }
            }({
                onLocChange: function(e) {
                    var t = {
                        back: !0,
                        hist: !0
                    };
                    3 === vk.al && history.state && Object(T.x)(history.state) && (t.scrollTop = Object(T.r)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
                }
            })
        }
        var P = n("4+be"),
            B = n("lXE5"),
            I = n("Ia1d"),
            N = n("XuKo"),
            M = n("ErRf"),
            D = n("/PiP"),
            R = {
                sh: function(e, t) {
                    Object(k.tb)(e), Object(T.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(k.W)(e), Object(T.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, n, o) {
                    var i = "layers" + (boxQueue.count() + 1);
                    Object(M.c)(i, function() {}), Object(k.qb)(e, {
                        opacity: n || "",
                        backgroundColor: o || ""
                    }), R.visible || (Object(E.c)(), Object(B.a)()), R.visible || Object(I.f)(), R.visible = !0, Object(k.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(k.hb)(t, "box_layer_hidden") : Object(k.tb)(t), R.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    R.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(M.a)(e), t && t.visibilityHide ? Object(k.a)(t, "box_layer_hidden") : Object(k.W)(t), Object(k.ab)(layerWrap) || cur._inLayer || Object(k.ab)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(k.ab)(window.mvLayerWrap)) || Object(k.ab)(window.wkLayerWrap) || (R.visible = !1, Object(k.hb)(bodyNode, "layers_shown"), Object(E.c)(!0), Object(B.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), R.visible || Object(I.g)()
                }
            },
            V = {
                push: function(e) {
                    var t = void 0,
                        n = !!V.count() && V._layers[V._layers.length - 1];
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
                        VideoPlaylist.getCurListId() && (i = Object(T.i)(i, {
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
                    return n && t[0] == n[0] && t[1] == n[1] && t[2] == n[2] || V._layers.push(t), V.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = V._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    V._bl = !0, window.WkView && R.fullhide == WkView.hide ? (Object(k.W)(wkLayerWrap), clearTimeout(wkcur.showT)) : R.fullhide && R.fullhide(!0, !0), setTimeout(V.unblock, 5)
                },
                unblock: function() {
                    V._bl = !1
                },
                pop: function() {
                    if (V.count() && !V._bl) {
                        var e = V._layers.pop();
                        if (V.skipVideo && (V.skipVideo = !1, "video" == e[0])) return V._layers.push(e), void(V.skipVideo = !1);
                        "photo" === e[0] ? (Object(T.i)(e[3], {
                            fromQueue: !0
                        }), Object(D.x)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(T.i)(e[3], {
                            fromQueue: !0
                        }), Object(I.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(D.B)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(N.c)(e[1]) : "podcast" === e[0] && Object(D.z)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, n, o) {
                    for (var i = V._layers, r = i.length; r > 0; --r)
                        if (i[r - 1][0] == e && i[r - 1][1] == t || i[r - 1][0] == n && i[r - 1][1] == o) return V._layers = i.slice(0, r), V.pop(), !0;
                    return !1
                },
                count: function() {
                    return V._layers.length
                },
                clear: function() {
                    V._layers = []
                },
                _layers: []
            };
        var H = n("0DAA");

        function F() {
            var e = {};
            Object(T.f)(Object(k.G)("_short_currency"), function() {
                var t = Object(k.s)(this, "short") || "";
                if (!t) return !0;
                var n = this.innerHTML,
                    o = Object(T.M)(n).length,
                    i = Object(k.O)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[i]) {
                    for (var r = "", a = o - 1; a >= 0; a--) r += "&#8399;";
                    var d = Object(k.e)("div", {
                        innerHTML: "<b>" + n + "</b><b>" + r + "</b>"
                    }, {
                        fontFamily: i,
                        fontSize: "24px"
                    });
                    Object(k.F)("utils").appendChild(d), e[i] = Math.abs(d.firstChild.offsetWidth - d.lastChild.offsetWidth) >= 2 * o, Object(k.fb)(d)
                }!1 === e[i] && Object(k.yb)(this, t)
            })
        }
        var W = n("0gG3"),
            q = n("XzvV"),
            U = n("v+DW"),
            z = n("lkNA");
        var G = function() {
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
                            e.startHintsText = Object(T.H)(t), e.hintsHub.done()
                        }
                    }))
                }, e.prototype.show = function(e) {
                    var t = window.placeholderSetup;
                    if (Object(k.F)("quick_search") && !this.on) return this.on = 1, Object(k.tb)(this.sCont), t("search_input"), Object(k.F)("search_input").setAttribute("autocomplete", "off"), Object(k.a)(Object(k.F)("qsearch_link"), "active"), this.prev_content = Object(k.F)("content"), this.qsearch_cont || (this.qsearch_cont = Object(k.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(C.c)(e) : void 0
                }, e.prototype.go = function(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(T.H)(Object(k.F)("search_input").value) + "&name=1";
                    return Object(C.c)(e || window.event), location.href = t, !1
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
            K = n("Bszp"),
            Q = n("MSYF"),
            X = n("kHqu"),
            J = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            o = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var a, d = e[Symbol.iterator](); !(o = (a = d.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !o && d.return && d.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            Y = "remixjsp";

        function $() {
            var e;
            (e = window.performance) && e.getEntriesByType && e.getEntriesByType("paint").forEach(function(e) {
                    "first-contentful-paint" === e.name && oe(e.startTime, "TTFCP")
                }),
                function() {
                    var e = window.performance;
                    e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(function(e) {
                        if ("navigation" === e.initiatorType) {
                            var t = e.domComplete,
                                n = e.domContentLoadedEventEnd,
                                o = e.loadEventEnd;
                            oe(t, "domComplete"), oe(n, "domContentLoadedEventEnd"), oe(o, "loadEventEnd")
                        }
                    })
                }(), te()
        }
        var Z = [],
            ee = !1;

        function te() {
            if (ee) {
                var e = window.performance,
                    t = Z[Z.length - 1];
                if (!t) return ee = !1, void oe(-1);
                var n = t.startTime + t.duration;
                e.now() - n >= 3e3 ? oe(n, "TTI") : setTimeout(te, 3e3)
            }
        }
        var ne = [];

        function oe(e, t) {
            var n = Math.floor(e);
            if (-1 !== e && (ne.push([n, t]), !(ee ? "TTI" === t : ne.length > 2))) return;
            var o = "unknown",
                i = navigator.connection;
            i && i.effectiveType && (o = i.effectiveType);
            var r = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            ne.forEach(function(e) {
                var t = J(e, 2),
                    n = t[0],
                    i = t[1];
                return r.events.push([i, n, cur.module, o, window.vk.rv])
            }), Object(y.d)(Y, JSON.stringify(r), .01)
        }

        function ie() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(function(e) {
                Z = Z.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), ee = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout($, 0)
            }) : $()
        }
        var re = {
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
            ae = n("1BRX"),
            de = n("8+we"),
            we = n("98sY"),
            ce = n("El3O"),
            se = n("EasH"),
            le = n("kcIO"),
            ue = n("FWc3");

        function fe(e, t) {
            var n = t.asrtl ? 0 : t.right ? 289 : 35,
                o = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
            return Object(ue.c)(e, {
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

        function he(e, t) {
            return Object(ue.c)(e, {
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

        function be(e, t, n) {
            if (!cur._addRestoreInProgress) {
                var o = Object(k.T)("_audio_row", e),
                    i = AudioUtils.getAudioFromEl(o, !0),
                    r = Object(k.s)(e, "action"),
                    a = AudioUtils.getRowActionName(r, i, o),
                    d = {
                        text: function() {
                            return a
                        },
                        black: 1,
                        shift: t || [7, 4, 0],
                        needLeft: !0,
                        forcetodown: n
                    };
                each(["_im_mess_stack", "top_notify_wrap", "_ape_audio_item", "wk_history_audio_content"], function(t, n) {
                    if (Object(k.T)(n, e)) return d.appendParentCls = n, !1
                }), Object(k.T)("_im_mess_stack", e) && (d.shift = [7, 10, 0], d.noZIndex = !0), Object(ue.c)(e, d)
            }
        }

        function pe(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            Object(ue.c)(e, {
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

        function me(e) {
            var t = "";
            Object(k.T)("_im_mess_stack", e) && (t = "_im_mess_stack"), Object(ue.c)(e, {
                className: "bookmarks_tt ",
                shift: [32, 8],
                text: function() {
                    return "1" === Object(k.s)(e, "state") ? Object(k.s)(e, "remove") : Object(k.s)(e, "add")
                },
                black: 1,
                appendParentCls: t
            })
        }
        var ve = n("Ieup"),
            ge = n("t/FQ"),
            ye = n("aong"),
            Oe = .5,
            _e = .25,
            je = 300,
            ke = 1e3,
            Le = 3e5,
            Ee = 2500,
            xe = 5e3,
            Ce = 6e3,
            Te = 2e4,
            Se = 1e3,
            Ae = 36e4,
            Pe = "_longViewType",
            Be = "_longViewIdled",
            Ie = "_longViewModule",
            Ne = "_longViewStarted",
            Me = "_longViewProcessed",
            De = "_longViewCached",
            Re = "_longViewHeight",
            Ve = "_longViewTop",
            He = "_longViewBottom",
            Fe = "REGULAR",
            We = "AUTOPLAY_AD",
            qe = "LongView.viewed",
            Ue = "LongView.idled",
            ze = vk.longViewTestGroup,
            Ge = [],
            Ke = [],
            Qe = [],
            Xe = Date.now(),
            Je = 0,
            Ye = 0,
            $e = !1,
            Ze = null,
            et = null,
            tt = null,
            nt = null,
            ot = {};

        function it() {
            var e = jt();
            e.length && (gt(e), kt())
        }

        function rt() {
            Ge.forEach(function(e) {
                e[De] = !1
            })
        }

        function at(e, t) {
            "im" === t && !e[Pe] && function(e) {
                if (Object(k.V)(e, "im-mess--post")) return !0;
                var t = e && Object(k.u)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(k.V)(e, "no_posts"))
            }(e) && (e[Pe] = function(e) {
                var t = e && Object(k.u)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? We : Fe
            }(e), e[Ie] = t, Ge.push(e))
        }

        function dt(e, t) {
            var n = dt;
            ! function(e, t) {
                var n = [];
                Ge.forEach(function(o) {
                    Tt(o) ? n.push(o) : ! function(e, t, n) {
                        return !e[Ne] && Et(e, Oe, t, n)
                    }(o, e, t) ? function(e, t, n) {
                        return e[Ne] && !Et(e, _e, t, n)
                    }(o, e, t) && (o[Be] ? delete o[Be] : (St(Ke, o), Qe = Qe.concat(Ct(o))), delete o[Ne]) : (o[Ne] = Date.now(), Ke.push(o))
                }), n.forEach(function(e) {
                    St(Ge, e)
                })
            }(e || Object(B.e)(), t || window.innerHeight), $e ? (clearTimeout(n.timer), n.timer = setTimeout(wt, 150)) : ($e = !0, ft(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(k.H)("im-page--chat-header"),
                        t = Object(k.H)("im-page--chat-input");
                    Je = e.getBoundingClientRect().top + e.offsetHeight, Ye = window.innerHeight - t.getBoundingClientRect().top
                } else Je = Object(k.F)("page_header").offsetHeight, Ye = 0
            }())
        }

        function wt() {
            ft(), ut(), $e = !1
        }

        function ct() {
            ft(), vt()
        }

        function st() {
            Qe = [], Ke.forEach(function(e) {
                return e[Ne] = Date.now()
            }), yt(null), Ot(null), ut()
        }

        function lt() {
            ft(), vt(), Qe = [], Ke = [], yt(null), Ot(null)
        }

        function ut() {
            Ze = setTimeout(ht, Ee), et = setTimeout(bt, xe), tt = setTimeout(pt, Ce), nt = setTimeout(mt, Te)
        }

        function ft() {
            clearTimeout(Ze), clearTimeout(et), clearTimeout(tt), clearTimeout(nt)
        }

        function ht() {
            Qe.length && yt(Qe)
        }

        function bt() {
            gt(Qe), Qe = [], yt(null)
        }

        function pt() {
            Ke.length && (Ot(xt(Ke, !0, !0)), tt = setTimeout(pt, Se))
        }

        function mt() {
            clearTimeout(tt), gt(xt(Ke)), Ke.forEach(function(e) {
                return e[Be] = !0
            }), Ke = [], Ot(null)
        }

        function vt() {
            gt(Qe.concat(xt(Ke)))
        }

        function gt(e) {
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
                    return Object(T.f)(t, function(e, t) {
                        return n.push(e + "_" + t.join(","))
                    }), n.join(";")
                }(e),
                long_view: 1
            })
        }

        function yt(e) {
            _t(qe, e)
        }

        function Ot(e) {
            _t(Ue, e)
        }

        function _t(e, t) {
            var n = H.a.get(e) || {};
            t ? n[Xe] = t : delete n[Xe], H.a.set(e, n)
        }

        function jt() {
            var e = jt,
                t = [],
                n = H.a.get(qe) || {},
                o = H.a.get(Ue) || {};
            return e.iterator || (e.iterator = function(e) {
                return function(n) {
                    Lt(n) && (t = t.concat(e[n]))
                }
            }), Object.keys(n).forEach(e.iterator(n)), Object.keys(o).forEach(e.iterator(o)), t
        }

        function kt() {
            var e = kt,
                t = H.a.get(qe) || {},
                n = H.a.get(Ue) || {};
            e.iterator || (e.iterator = function(e) {
                return function(t) {
                    Lt(t) && delete e[t]
                }
            }), Object.keys(t).forEach(e.iterator(t)), Object.keys(n).forEach(e.iterator(n)), H.a.set(qe, t), H.a.set(Ue, n)
        }

        function Lt(e) {
            var t = Number(e);
            return t !== Xe && Date.now() - t >= Ae
        }

        function Et(e, t, n, o) {
            if (!e) return !1;
            e[De] || (e[De] = !0, e[Re] = e.offsetHeight, e[Ve] = n + e.getBoundingClientRect().top, e[He] = e[Ve] + e[Re]);
            var i = o - Je - Ye,
                r = n + Je,
                a = n + o - Ye,
                d = e[Re],
                w = e[Ve],
                c = e[He];
            return (c > r && w < a ? Math.min(a, c) - Math.max(r, w) : 0) >= Math.min(i * t, d * t)
        }

        function xt(e, t, n) {
            return e.map(function(e) {
                return Ct(e, t, n)
            })
        }

        function Ct(e, t, n) {
            if (Tt(e)) return [];
            var o = Math.min(Le, Date.now() - e[Ne]);
            if (e[Pe] === Fe && o < je || e[Pe] === We && o < ke) return [];
            n || (e[Me] = !0);
            var i, r = function(e) {
                    var t = e[Ie];
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
                d = cur.feed_session_id || "na",
                w = [];
            for (var c in r)
                if ("index" !== c && "module" !== c && "q" !== c) {
                    var s = c.split("_"),
                        l = s[0],
                        u = s[1];
                    "ads" === l && (u = s[3]), /^post\d+$/.test(l) && (l = s[1], u = s[2]);
                    var f = void 0;
                    t || (ot[f = l + "_" + u] || (ot[f] = 0), ot[f]++), w.push("ad" === l ? {
                        ownerId: "ad",
                        postId: u,
                        module: a,
                        viewIndex: ot[f]
                    } : "ads" === l ? {
                        ownerId: "ads",
                        postId: u,
                        module: a,
                        index: r.index,
                        duration: o,
                        sessionId: d,
                        viewIndex: ot[f]
                    } : {
                        ownerId: l,
                        postId: (1 === r[c] ? "" : "-") + u,
                        module: a,
                        index: r.index,
                        duration: o,
                        sessionId: d,
                        q: r.q || null,
                        viewIndex: ot[f]
                    })
                }
            return w
        }

        function Tt(e) {
            return "page_view" === ze && e[Me] || !document.body.contains(e)
        }

        function St(e, t) {
            var n = e.indexOf(t);
            n >= 0 && e.splice(n, 1)
        }
        var At = n("QGEU"),
            Pt = n("eNQP"),
            Bt = n("o7bv");

        function It(e) {
            if (Object(C.d)(e)) return !0;
            if (H.a.set("last_reloaded", []), !cur.onMouseClick || !cur.onMouseClick(e)) {
                if (!(e = window.event || e.originalEvent || e)) return !0;
                for (var t = 8, n = e.target || e.srcElement, o = void 0, i = void 0; n && n !== bodyNode && "A" !== n.tagName && t--;) n = n.parentNode;
                if (!n || "A" !== n.tagName || n.onclick || n.onmousedown) return !0;
                var r = n.href;
                if (r && (n.getAttribute("target") || nav.baseBlank)) return !0;
                if ("https:" !== location.protocol && !r.indexOf("https://")) return !0;
                (r = r.replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (r = r.replace(location.hostname, "")), vk.dev && "vk.com" === location.hostname && (r = r.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/"));
                var a = {};
                (i = r.match(/^\/(.+?)#[\!\/](.+?)$/)) && !i[1].match(/^app(\d+)/) && (a.permanent = i[1], r = "/" + i[2]);
                var d = !!(n.getAttribute && n.getAttribute("data-post-click-type") && n.getAttribute("data-post-id"));
                if (r.match(/#$/) && !d) return !0;
                var w = Object(k.s)(n, "post-id");
                w && (a.postId = w);
                var c = void 0,
                    s = r;
                if (o = r.match(/^\/(.*?)(\?|#|$)/)) o = o[1];
                else {
                    if (n.hostname) c = n.hostname, o = n.pathname + n.search;
                    else {
                        var l = /^([^:\/]+)?(?::(\d+))?(\/?[^#]*)(#?.*)$/i.exec(r);
                        if (!l) return !0;
                        c = l[1], o = l[3] || "/"
                    }
                    if (!c || !d) return !0;
                    n.setAttribute("data-change-location-with-post-away", 1), s = n
                }
                if ("add_community_app" === o) return Object(k.c)(n, "target", "_blank"), !0;
                if (o.indexOf(".php") > 0 || o.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images\/|utils\/|\.js|js\/|\.css|css\/|source\b)/)) {
                    if (!d) return !0;
                    n.setAttribute("data-change-location-with-post-away", 1), s = n
                }
                var u = n.getAttribute("hrefparams");
                u && (a.params = Object(T.i)(a.params || {}, Object(O.f)(u)));
                try {
                    return nav.go(s, e, a), Object(C.c)(e)
                } catch (e) {
                    return !0
                }
            }
        }

        function Nt(e, t) {
            (t = t || window.event).keyCode === C.a.ENTER && (e(), Object(C.c)(t))
        }

        function Mt(e, t) {
            (10 === (e = e || window.event).keyCode || 13 === e.keyCode && (e.ctrlKey || e.metaKey && _.a.mac)) && (t(), Object(C.c)(e))
        }

        function Dt(e) {
            if (window._wf = 1, e.keyCode === C.a.ESC && boxQueue.count() && !cur._noEscHide) return boxQueue.hideLast(), -1;
            if (e.keyCode === C.a.ESC && window.articleCloseImageFullSize && window.articleCloseImageFullSize()) return Object(C.c)(event);
            if (e.keyCode === C.a.ESC && window.isArticleLayerOpen && window.isArticleLayerOpen()) return window.ArticleLayer.close(!0), Object(C.c)(event);
            if (e.keyCode === C.a.ESC && window.AuthorPage) return window.AuthorPage.close(), Object(C.c)(event);
            if (e.keyCode === C.a.ESC) return Object(M.b)(), Object(C.c)(e);
            var t = [176, 177, 178, 179],
                n = !1;
            window.audioPlayer && (t.push(C.a.LEFT), t.push(C.a.RIGHT)), Object(T.f)(t, function(t, o) {
                if (e.keyCode === o) return n = !0, !1
            }), n && Object(D.j)().onMediaKeyPressedEvent(e), ge.a.inited && 191 === e.keyCode && (e.ctrlKey || e.metaKey && _.a.mac) && ge.a.showFriends()
        }
        var Rt = n("i6oL"),
            Vt = n("m0N1"),
            Ht = window.isMVK ? "mvk" : "web",
            Ft = {
                start: function(e, t) {
                    var n = this;
                    if (t.stopPropagation(), t.preventDefault(), window.statlogsValueEvent("first_april_special_event", "click", Ht), !this.timeoutHandle) {
                        var o = Number(e.getAttribute("data-v")) || 0;
                        this.duration && this.id || (this.duration = Number(e.getAttribute("data-duration")) || 0, this.id = e.getAttribute("data-id")), this.duration && this.id && (!this.animationData || !this.animationData.v || "number" == typeof this.v && this.v !== o ? (this.v = o, this._getAnimation().then(function(e) {
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
                            t.stop(), t.destroy(), e.frame.style.display = "none", e.timeoutHandle = null, window.statlogsValueEvent("first_april_special_event", "showed", Ht)
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
            };
        m.polyfill(), window.Map = d, window.Set = w;
        var Wt = window.vk;

        function qt() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, Wt.width = 960, Wt.started = Object(T.L)(), Wt.counts = {}, _.a.android && (Object(y.d)("remixscreen_width", window.screen.width, 365), Object(y.d)("remixscreen_height", window.screen.height, 365), Object(y.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(y.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(y.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(X.f)(), Object(W.b)(), Object(C.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(C.h)(vkCache[e].handle.elem)
            }), Object(C.b)(window, "DOMContentLoaded load", function() {
                Wt.loaded || (Wt.loaded = !0, Object(U.y)()), Object(ce.c)()
            }), Object(C.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(C.b)(document, "keydown", Dt)
        }
        var Ut = 0;

        function zt() {
            if (window.headNode = Object(k.J)("head"), window.icoNode = Object(k.J)("link", headNode), window.bodyNode = Object(k.J)("body"), window.htmlNode = Object(k.J)("html"), window.utilsNode = Object(k.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(C.b)(bodyNode, "resize", ce.j.pbind(!1)), utilsNode) {
                _.a.mozilla ? Object(k.a)(bodyNode, "firefox") : _.a.mobile && Object(k.a)(bodyNode, "mobfixed"), Object(ge.g)(), Object(W.a)();
                var e = Object(k.F)("layer_bg"),
                    t = e.nextSibling,
                    n = Object(k.F)("box_layer_bg"),
                    o = n.nextSibling;
                window.layerBG = e, window.boxLayerBG = n, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = o, window.boxLayer = o.firstChild, window.boxLoader = o.firstChild.firstChild, window._stlSide = Object(k.F)("stl_side"), window._stlLeft = Object(k.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, _.a.mobile || Object(Rt.a)(), Object(C.b)(o, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(o), window.layers = function(e, t, n, o) {
                    return window.layerQueue = V, Object(T.i)(R, {
                        show: R._show.pbind(e, t),
                        boxshow: R._show.pbind(n, o),
                        wrapshow: R._show.pbind(e),
                        hide: R._hide.pbind(e, t),
                        boxhide: R._hide.pbind(n, o),
                        wraphide: R._hide.pbind(e)
                    }), R
                }(e, t, n, o), hab.init(), window._retinaInit ? window._retinaInit() : Ut = 1
            }
        }

        function Gt() {
            if (utilsNode) {
                Object(Rt.b)();
                var e = Object(k.F)("side_bar");
                window.pageNode = Object(k.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(k.O)(e, "position"), window._tbLink = Object(k.F)("top_back_link"), _.a.chrome || _.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = _.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(T.L)() - Wt.started, 10),
                    n = Object(T.r)((Wt.contlen || 1) / t * 1e3);
                _.a.mozilla && _.a.version >= 4 ? n /= 2.5 : _.a.mozilla ? n *= 1.5 : _.a.msie && _.a.version >= 7 ? n /= 1.5 : _.a.msie && (n *= 2.5);
                var o = Object(T.r)(150 * Math.max(2e6 / n, 1));
                if (W.d.highlimit = 6 * o, W.d.lowlimit = Math.min(o, 600), Object(ce.j)(), setTimeout(ce.j.pbind(!1), 0), Object(At.c)(), window.addEventListener("scroll", ce.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !Wt.id && H.a.checkVersion() && H.a.get("last_reloaded")) try {
                    var i = {};
                    Object(T.f)(["sound_notify_off", "im_ui_notify_off"], function(e, t) {
                        var n = H.a.get(t);
                        null !== n && (i[t] = n)
                    }), window.localStorage.clear(), Object(T.f)(i, function(e, t) {
                        return H.a.set(e, t)
                    })
                } catch (e) {}
            }
        }
        var Kt = function() {
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

        function Qt(e) {
            Wt.loaded ? e() : Object(C.b)(window, "load", e)
        }

        function Xt() {
            window.showWriteMessageBox = ve.g, window.giftsBox = ve.a, window.moneyTransferBox = ve.d, window.reportAd = ve.e, window.mobilePromo = ve.c, window.showAudioClaimWarning = ve.f, window.menuSettings = ve.b, window.sureDeleteAll = ve.h, window.TopNotifier = Object(D.l)(), window.showPhoto = D.x, window.showManyPhoto = D.w, window.showAlbums = D.u, window.showAlbum = D.t, window.showPhotoTags = D.y, window.isPhotoeditor3Available = D.o, window.AudioMessagePlayer = D.a, window.showVideoTags = D.A, window.videoCallback = D.C, window.showWiki = D.B, window.showApp = D.v, window.showPodcast = D.z, window.podcastStartFrom = D.r, window.articlePrepare = D.b, window.isArticleLayerOpen = D.n, window.isArticleEditorAvailable = D.m, window.openArticleEditor = D.q, window.mentionOver = pe, window.mentionClick = D.p, window.mobileOnlineTip = fe, window.pageVerifiedTip = he, window.audioShowActionTooltip = be, window.shareAudioPlaylist = D.s, window.getAudioPlayer = D.j, window.deleteAudioOnClaim = D.i, window.initTopAudioPlayer = D.k, window.bookmark = D.c, window.bookmarkPost = D.h, window.bookmarkArticle = D.d, window.bookmarkLink = D.e, window.bookmarkPodcast = D.g, window.bookmarkNarrative = D.f, window.bookmarkTooltip = me, window.showStory = N.c, window.showNarrative = N.b, window.storiesPreloadStatic = N.d, window.sendMask = N.a
        }
        window.constants = {
            Groups: re
        }, window.partConfigEnabled = de.a, Object(k.X)(), window.ge = k.F, window.geByTag = k.I, window.geByTag1 = k.J, window.geByClass = k.G, window.geByClass1 = k.H, window.gpeByClass = k.T, window.domQuery = k.B, window.domQuery1 = k.C, window.domClosest = k.n, window.ce = k.e, window.cf = k.f, window.re = k.fb, window.se = k.mb, window.sech = k.nb, window.rs = k.lb, window.psr = k.eb, window.domReplaceEl = k.D, window.domEL = k.t, window.domNS = k.y, window.domPS = k.A, window.domFC = k.u, window.domLC = k.x, window.domPN = k.z, window.domChildren = k.m, window.domInsertBefore = k.w, window.domInsertAfter = k.v, window.domByClass = k.j, window.domData = k.s, window.domChildIndex = k.l, window.domCA = k.k, window.domClosestSibling = k.r, window.matchesSelector = k.db, window.isHover = k.Z, window.isAncestor = k.Y, window.getScroll = k.M, window.domClosestPositioned = k.q, window.domClosestOverflowHidden = k.p, window.show = k.tb, window.hide = k.W, window.isVisible = k.ab, window.clientHeight = k.h, window.getClientRectOffsetY = k.K, window.toggle = k.ub, window.boundingRectEnabled = k.d, window.getXYRect = k.R, window.getXY = k.Q, window.isWindow = k.bb, window.getSize = k.N, window.hasClass = k.V, window.addClass = k.a, window.addClassDelayed = k.b, window.removeClass = k.hb, window.removeClassDelayed = k.ib, window.toggleClass = k.vb, window.toggleClassDelayed = k.wb, window.replaceClass = k.kb, window.getStyle = k.O, window.setStyle = k.qb, window.setStyleDelayed = k.rb, window.setPseudoStyle = k.pb, window.data = k.i, window.attr = k.c, window.removeAttr = k.gb, window.removeData = k.jb, window.cleanElems = k.g, window.setTitle = k.sb, window.getZoom = k.S, window.val = k.yb, window.elfocus = k.E, window.traverseParent = k.xb, window.getH = k.L, window.getW = k.P, window.domClosestByTag = k.o, window.setDocumentTitle = k.ob, window.lockDocumentTitle = k.cb, window.KEY = C.a, window.addEvent = C.b, window.removeEvent = C.h, window.triggerEvent = C.j, window.cancelEvent = C.c, window.stopEvent = C.i, window.normEvent = C.g, window.checkEvent = C.d, window.checkKeyboardEvent = C.e, window.checkOver = C.f, Object(T.q)(), window.isRetina = T.y, window.extractUrls = T.j, window.serializeForm = T.F, window.addTemplates = T.a, window.getTemplate = T.n, window.rand = T.D, window.irand = T.s, window.isUndefined = T.A, window.isFunction = T.v, window.isArray = T.t, window.isString = T.z, window.isObject = T.x, window.isEmpty = T.u, window.vkNow = T.L, window.vkImage = T.J, window.trim = T.H, window.stripHTML = T.G, window.escapeRE = T.h, window.intval = T.r, window.floatval = T.k, window.positive = T.C, window.isNumeric = T.w, window.winToUtf = T.M, window.replaceEntities = T.E, window.clean = T.c, window.unclean = T.I, window.each = T.f, window.indexOf = T.p, window.inArray = T.o, window.clone = T.d, window.arrayKeyDiff = T.b, window.extend = T.i, window.vkLocal = T.K, window.lTimeout = T.B, window.getCaretCharacterOffsetWithin = T.m, window.formatCount = T.l, window.encodeHtml = T.g, window.decodeHtml = T.e, Object(O.c)(), window.ajx2q = O.b, window.q2ajx = O.f, window.requestBox = O.g, window.activateMobileBox = O.a, window.validateMobileBox = O.h, window.validatePassBox = O.i, window.photoCaptchaBox = O.e, Object(y.c)(), window.getCookie = y.a, window.setCookie = y.d, window.hideCookiesPolicy = y.b, Object(we.c)(), window.debugLog = we.b, window.debugEl = we.a, window.isToday = ae.c, window.isYesterday = ae.e, window.isTomorrow = ae.d, window.isSameDate = ae.b, window.leadingZero = ae.f, window.formatTime = ae.a, window.parseLatin = P.o, window.parseCyr = P.m, window.parseLatKeys = P.n, window.langNumeric = P.i, window.langSex = P.j, window.langStr = P.k, window.addLangKeys = P.a, window.getLang = P.d, window.langDate = P.h, window.getShortDate = P.e, window.getShortDateOrTime = P.f, window.langWordNumeric = P.l, window.getDateText = P.c, window.getBigDateNew = P.b, window.getSmDate = P.g, window.scrollToY = B.g, window.scrollToTop = B.f, window.scrollGetX = B.d, window.scrollGetY = B.e, window.disableBodyScroll = B.a, window.enableBodyScroll = B.b, window.Chat = ge.a, window.__qlTimer = null, window.__qlClear = ge.b, window.onLoginDone = ge.n, window.onLoginFailed = ge.o, window.onLoginCaptcha = ge.m, window.onLoginReCaptcha = ge.p, window.storePasswordCredential = ge.q, window.cssAnim = ge.c, window.imagesLoader = ge.f, window.nodeUpdated = ge.l, window.hideNewsAnnounce = ge.e, window.leftAdBlockClose = ge.i, window.leftBlockToggleFriend = ge.k, window.leftBlockFriendTooltip = ge.j, window.fifaReplaceText = ge.d, window.placeholderSetup = Bt.c, window.placeholderInit = Bt.b, window.isInputActive = Bt.a, window.showTooltip = ue.c, window.showTitle = ue.b, window.showHint = ue.a, window.topMsg = g.d, window.showMsg = g.b, window.topError = g.c, window.showGlobalPrg = g.a, window.checkTextLength = ye.b, window.getSelectionText = ye.d, window.goAway = ye.e, window.debounce = ye.c, window.hashCode = ye.g, window.isFullScreen = ye.h, window.parallel = ye.k, window.parseJSON = ye.l, window.shuffle = ye.m, window.throttle = ye.n, window.toggleOnline = ye.q, window.updateMoney = ye.s, window.onlinePlatformClass = ye.j, window.Fx = x.a, window.fx = x.a, window.animate = x.b, window.cubicBezier = x.d, window.fadeTo = x.g, window.genFx = x.i, window.getRGB = x.k, window.getColor = x.j, window.slideDown = x.l, window.slideUp = x.n, window.slideToggle = x.m, window.fadeIn = x.e, window.fadeOut = x.f, window.fadeToggle = x.h, window.animateCount = x.c, window.updateAriaElements = At.c, window.updateAriaCheckboxes = At.b, window.hasAccessibilityMode = At.a, window.cancelStackFilter = M.a, window.cancelStackPush = M.c, window.cancelStackPop = M.b, window.ElementTooltip = j.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = L, 1 === Wt.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== Wt.al || history.pushState || (Wt.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), Wt.version = !1), Object(W.c)(), window.stManager = W.d, Object(_.c)(), window.browser = _.a, window.mobPlatforms = _.d, window.browserFeatures = _.b, Object(E.a)(), window.toggleFlash = E.c, window.renderFlash = E.b, qt(), window.updateHeaderStyles = X.j, window.updateNarrow = ce.m, window.checkPageBlocks = ce.c, window.redraw = ce.l, window.onBodyResize = ce.j, window.onBodyScroll = ce.k, window.leftBlockOver = ce.i, window.leftBlockOut = ce.h, window.leftBlockHide = ce.g, window.onDocumentClick = It, window.onEnter = Nt, window.onCtrlEnter = Mt, window.autosizeSetup = ce.b, window.getProgressBarEl = ce.e, window.getProgressHtml = ce.f, Object(Vt.b)(), ie(), window.onDomReady = function(e) {
            return e()
        }, window.currentModule = function() {
            return cur.currentModule ? cur.currentModule() : cur.module
        }, window.hab = A(), window.ls = H.a, window.shortCurrency = F, window.statlogsValueEvent = q.b, window.saveSearchAttemptStats = q.a, window.callHub = Kt, window.CallHub = Kt, window.gSearch = new G, window.zNav = X.m, window.handlePageView = X.e, window.handlePageParams = X.d, window.handlePageCount = X.c, window.comScoreUDM = X.a, window.updateOtherCounters = X.l, window.processDestroy = X.g, window.globalHistoryDestroy = X.b, window.showBackLink = X.i, window.nav = Q.a, nav.init(), Wt.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === t[1] && 12 === Wt.time[1] ? Wt.time[1] = 0 : 12 === t[1] && 1 === Wt.time[1] ? t[1] = 0 : (t[1] > Wt.time[1] + 1 || Wt.time[1] > t[1] + 1) && (t[1] = Wt.time[1] = t[2] = Wt.time[2] = 0), t[1] > Wt.time[1] && 1 === t[2] ? 31 === Wt.time[2] || (4 === Wt.time[1] || 6 === Wt.time[1] || 9 === Wt.time[1] || 11 === Wt.time[1]) && 30 === Wt.time[2] || 2 === Wt.time[1] && (29 === Wt.time[2] || 28 === Wt.time[2] && Wt.time[0] % 4) ? Wt.time[2] = 0 : Wt.time[2] = t[2] = 0 : Wt.time[1] > t[1] && 1 === Wt.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && Wt.time[0] % 4) ? t[2] = 0 : t[2] = Wt.time[2] = 0), (t[2] > Wt.time[2] + 1 || Wt.time[2] > t[2] + 1) && (t[2] = Wt.time[2] = 0);
            var n = 60 * (60 * (24 * (t[2] - Wt.time[2]) + (t[3] - Wt.time[3])) + (t[4] - Wt.time[4]));
            n < -55800 ? n += 86400 : n > 37800 && (n -= 86400);
            var o = 0,
                i = Math.abs(n);
            Object(T.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], function(e, t) {
                var r = Math.round(3600 * (t - 3)),
                    a = Math.abs(n - r);
                a < i && (i = a, o = r)
            }), Wt.dt = o, Object(y.a)("remixdt") !== Wt.dt && Object(y.d)("remixdt", Wt.dt, 365);
            var r = Object(T.r)(Object(y.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!_.a.iphone || Object(y.a)("remixme")) ? 1 & r || (Object(y.d)("remixrt", 1 | r, 365), window._retinaInit = function() {
                W.d.add(["retina.css"]), Object(k.a)(document.body, "is_2x")
            }, Ut && window._retinaInit()) : 1 & r && Object(y.d)("remixrt", 1 ^ r, 365)
        }, 0), window.boxQueue = Object(le.c)(), window.__bq = boxQueue, window.curBox = le.b, Object(le.d)(), window.boxRefreshCoords = le.a, window.MessageBox = se.a, window.showBox = se.b, window.showTabbedBox = se.f, window.showFastBox = se.d, window.showCaptchaBox = se.c, window.showReCaptchaBox = se.e, window.showDoneBox = le.e, window.TopMenu = ce.a, window.TopSearch = K.a, window.handleScroll = ye.f, window.loadScript = z.a, window.SpecialEvent = Ft, Object(U.j)(), window.notaBene = U.q, window.updSideTopLink = U.y, window.createButton = U.d, window.actionsMenuItemLocked = U.a, window.lockActionsMenuItem = U.n, window.unlockActionsMenuItem = U.v, window.linkLocked = U.m, window.lockLink = U.p, window.unlockLink = U.x, window.lockButton = U.o, window.unlockButton = U.w, window.buttonLocked = U.b, window.isButtonLocked = U.k, window.disableButton = U.f, window.sbWidth = U.t, window.isChecked = U.l, window.checkbox = U.c, window.disable = U.e, window.radioval = U.s, window.radiobtn = U.r, window.showProgress = U.u, window.hideProgress = U.i, window.disableEl = U.g, window.enableEl = U.h, Object(I.d)(), window.VideoConstants = I.a, window.showVideo = I.j, window.showInlineVideo = I.i, window.loadInlineVideo = I.e, window.revertLastInlineVideo = I.h, window.destroyInlineVideoPlayer = I.c, window.pauseLastInlineVideo = I.f, window.playLastInlineVideo = I.g, window.checkMp4 = I.b, window.performance && window.performance.memory && Object(T.D)(0, 100) < 5 && Object(Pt.a)(), ze ? (Object(C.b)(window, "blur", ct), Object(C.b)(window, "focus", st), onDomReady(function() {
            return setTimeout(it, 500)
        }), window.LongView = {
            register: at,
            onScroll: Object(ye.n)(dt, 50),
            onBeforePageChange: lt,
            clearElemsCache: rt,
            _debug: function() {
                return {
                    started: Ke,
                    tracking: Ge,
                    viewedData: Qe,
                    viewIndexes: ot,
                    blindTop: Je,
                    blindBottom: Ye
                }
            }
        }) : window.LongView = {
            register: function() {},
            onScroll: function() {},
            onBeforePageChange: function() {},
            clearElemsCache: function() {}
        }, Object(ge.h)(), Xt(), window.onLoaded = Qt, window.domStarted = zt, window.domReady = Gt, Object(we.b)("common module enabled"), W.d.done(jsc("web/common_web.js"))
    }
});