! function(e) {
    function t(t) {
        for (var n, a, d = t[0], w = t[1], c = t[2], l = 0, u = []; l < d.length; l++) a = d[l], i[a] && u.push(i[a][0]), i[a] = 0;
        for (n in w) Object.prototype.hasOwnProperty.call(w, n) && (e[n] = w[n]);
        for (s && s(t); u.length;) u.shift()();
        return r.push.apply(r, c || []), o()
    }

    function o() {
        for (var e, t = 0; t < r.length; t++) {
            for (var o = r[t], n = !0, d = 1; d < o.length; d++) {
                var w = o[d];
                0 !== i[w] && (n = !1)
            }
            n && (r.splice(t--, 1), e = a(a.s = o[0]))
        }
        return e
    }
    var n = {},
        i = {
            "web/common_web": 0
        },
        r = [];

    function a(t) {
        if (n[t]) return n[t].exports;
        var o = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, a), o.l = !0, o.exports
    }
    a.m = e, a.c = n, a.d = function(e, t, o) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
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
        var o = Object.create(null);
        if (a.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var n in e) a.d(o, n, function(t) {
                return e[t]
            }.bind(null, n));
        return o
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
    r.push([78, "bundles/audioplayer", "common"]), o()
}({
    "4O8T": function(e, t, o) {
        var n;
        ! function(t) {
            "use strict";

            function i() {}
            var r = i.prototype,
                a = t.EventEmitter;

            function d(e, t) {
                for (var o = e.length; o--;)
                    if (e[o].listener === t) return o;
                return -1
            }

            function w(e) {
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
                for (o in n) n.hasOwnProperty(o) && -1 === d(n[o], t) && n[o].push(i ? t : {
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
                var o, n, i = this.getListenersAsObject(e);
                for (n in i) i.hasOwnProperty(n) && -1 !== (o = d(i[n], t)) && i[n].splice(o, 1);
                return this
            }, r.off = w("removeListener"), r.addListeners = function(e, t) {
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
            }, r.removeAllListeners = w("removeEvent"), r.emitEvent = function(e, t) {
                var o, n, i, r, a = this.getListenersAsObject(e);
                for (r in a)
                    if (a.hasOwnProperty(r))
                        for (o = a[r].slice(0), i = 0; i < o.length; i++) !0 === (n = o[i]).once && this.removeListener(e, n.listener), n.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, n.listener);
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
            }, void 0 === (n = function() {
                return i
            }.call(t, o, t, e)) || (e.exports = n)
        }(this || {})
    },
    78: function(e, t, o) {
        e.exports = o("g42W")
    },
    T39b: function(e, t, o) {
        "use strict";
        var n = o("wmvG");
        e.exports = o("4LiD")("Set", function(e) {
            return function() {
                return e(this, arguments.length > 0 ? arguments[0] : void 0)
            }
        }, {
            add: function(e) {
                return n.def(this, e = 0 === e ? 0 : e, e)
            }
        }, n)
    },
    VXxg: function(e, t, o) {
        o("Btvt"), o("XfO3"), o("rGqo"), o("T39b"), e.exports = o("g3g5").Set
    },
    g42W: function(e, t, o) {
        "use strict";
        o.r(t);
        var n, i, r, a, d = o("qKs0"),
            w = o("VXxg");
        String.fromCodePoint || (n = function() {
            try {
                var e = {},
                    t = Object.defineProperty,
                    o = t(e, e, e) && t
            } catch (e) {}
            return o
        }(), i = String.fromCharCode, r = Math.floor, a = function(e) {
            var t, o, n = [],
                a = -1,
                d = arguments.length;
            if (!d) return "";
            for (var w = ""; ++a < d;) {
                var c = Number(arguments[a]);
                if (!isFinite(c) || c < 0 || c > 1114111 || r(c) != c) throw RangeError("Invalid code point: " + c);
                c <= 65535 ? n.push(c) : (t = 55296 + ((c -= 65536) >> 10), o = c % 1024 + 56320, n.push(t, o)), (a + 1 == d || n.length > 16384) && (w += i.apply(null, n), n.length = 0)
            }
            return w
        }, n ? n(String, "fromCodePoint", {
            value: a,
            configurable: !0,
            writable: !0
        }) : String.fromCodePoint = a), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
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
        }), Array.from || (Array.from = function(e) {
            return [].slice.call(e)
        }), Object.assign || Object.defineProperty(Object, "assign", {
            enumerable: !1,
            configurable: !0,
            writable: !0,
            value: function(e, t) {
                if (void 0 === e || null === e) throw new TypeError("Cannot convert first argument to object");
                for (var o = Object(e), n = 1; n < arguments.length; n++) {
                    var i = arguments[n];
                    if (void 0 !== i && null !== i)
                        for (var r = Object.keys(Object(i)), a = 0, d = r.length; a < d; a++) {
                            var w = r[a],
                                c = Object.getOwnPropertyDescriptor(i, w);
                            void 0 !== c && c.enumerable && (o[w] = i[w])
                        }
                }
                return o
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
            var t, o, n, i, r, a, d, w, c;
            if (!(t = e.match(h))) throw new Error("invalid data URI");
            for (o = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), n = !!t[4], i = e.slice(t[0].length), r = n ? atob(i) : decodeURIComponent(i), a = new ArrayBuffer(r.length), d = new Uint8Array(a), w = 0; w < r.length; w += 1) d[w] = r.charCodeAt(w);
            return l ? new Blob([u ? d : a], {
                type: o
            }) : ((c = new f).append(a), c.getBlob(o))
        }, c.HTMLCanvasElement && !s.toBlob && (s.mozGetAsFile ? s.toBlob = function(e, t, o) {
            e(o && s.toDataURL && b ? b(this.toDataURL(t, o)) : this.mozGetAsFile("blob", t))
        } : s.toDataURL && b && (s.toBlob = function(e, t, o) {
            e(b(this.toDataURL(t, o)))
        })), "function" == typeof define && define.amd ? define(function() {
            return b
        }) : "object" == ("undefined" == typeof module ? "undefined" : p(module)) && module.exports ? module.exports = b : c.dataURLtoBlob = b;
        var m = o("E2g8"),
            v = o("4O8T");
        window.EventEmitter = v;

        function g(e) {
            e && !e.prototype.forEach && (Array.prototype.forEach ? e.prototype.forEach = Array.prototype.forEach : e.prototype.forEach = function(e, t) {
                t = t || window;
                for (var o = 0; o < this.length; o++) e.call(t, this[o], o, this)
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
        }), g(window.NodeList), g(window.HTMLCollection);
        var y = o("ryw6"),
            O = o("kMSP"),
            _ = o("Kngp"),
            j = o("gdug"),
            k = o("k487"),
            L = o("zxIV");

        function E(e, t) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
                var o = Object(L.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(o, icoNode), icoNode = o
            }
        }
        var x = o("HhI8"),
            T = o("7jxN"),
            S = o("Egk5"),
            C = o("t7n3"),
            A = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var o = [],
                            n = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var a, d = e[Symbol.iterator](); !(n = (a = d.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !n && d.return && d.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return o
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function P() {
            return new function(e) {
                var t = function(e) {
                        var t = e.split("#"),
                            o = A(t, 2),
                            n = o[0],
                            i = o[1],
                            r = n.split("?"),
                            a = A(r, 2),
                            d = a[0],
                            w = a[1];
                        return d + (w ? "?" + Object(_.b)(Object(_.f)(w)) : "") + (i ? "#" + i : "")
                    },
                    o = Object(C.i)({
                        onLocChange: function() {}
                    }, e),
                    n = function() {
                        var e = "";
                        return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), t(e.replace(/^(\/|!)/, ""))
                    },
                    i = n(),
                    r = function(e) {
                        var t = n();
                        t === i && !0 !== e || (o.onLocChange(t), i = t)
                    },
                    a = void 0;
                return {
                    setLoc: function(e) {
                        i = t(e);
                        var o = (location.toString().match(/#(.*)/) || {})[1] || "";
                        if (!o && vk.al > 1 && (o = (location.pathname || "") + (location.search || "")), (o = (o = t(o)).replace(/^(\/|!)/, "")) !== i) {
                            if (3 == vk.al) try {
                                return window.saveScrollTopOnBack && (delete window.saveScrollTopOnBack, history.replaceState({
                                    scrollTop: window.lastScrollTop,
                                    preventScroll: window.preventLocationScroll
                                }, "", "/" + o), window.preventLocationScroll && delete window.preventLocationScroll), void history.pushState({}, "", "/" + i)
                            } catch (e) {}
                            window.chHashFlag = !0, location.hash = "#" + vk.navPrefix + i
                        }
                    },
                    getLoc: n,
                    init: function() {
                        1 == vk.al && r(!0), 3 == vk.al ? (Object(S.b)(window, "popstate", r), j.a.safari && Object(S.b)(window, "hashchange", r)) : "onhashchange" in window ? Object(S.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : r()
                        }) : a = setInterval(r, 200)
                    },
                    setOptions: function(e) {
                        o = Object(C.i)(o, e)
                    },
                    checker: r,
                    stop: function() {
                        vk.al < 3 ? clearInterval(a) : 3 == vk.al && Object(S.h)(window, "popstate", r)
                    }
                }
            }({
                onLocChange: function(e) {
                    var t = {
                        back: !0,
                        hist: !0
                    };
                    3 === vk.al && history.state && Object(C.x)(history.state) && (t.scrollTop = Object(C.r)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
                }
            })
        }
        var B = o("4+be"),
            I = o("lXE5"),
            M = o("Ia1d"),
            N = o("XuKo"),
            D = o("ErRf"),
            V = o("/PiP"),
            R = {
                sh: function(e, t) {
                    Object(L.tb)(e), Object(C.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(L.W)(e), Object(C.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, o, n) {
                    var i = "layers" + (boxQueue.count() + 1);
                    Object(D.c)(i, function() {}), Object(L.qb)(e, {
                        opacity: o || "",
                        backgroundColor: n || ""
                    }), R.visible || (Object(x.c)(), Object(I.a)()), R.visible || Object(M.f)(), R.visible = !0, Object(L.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(L.hb)(t, "box_layer_hidden") : Object(L.tb)(t), R.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    R.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(D.a)(e), t && t.visibilityHide ? Object(L.a)(t, "box_layer_hidden") : Object(L.W)(t), Object(L.ab)(layerWrap) || cur._inLayer || Object(L.ab)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(L.ab)(window.mvLayerWrap)) || Object(L.ab)(window.wkLayerWrap) || (R.visible = !1, Object(L.hb)(bodyNode, "layers_shown"), Object(x.c)(!0), Object(I.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), R.visible || Object(M.g)()
                }
            },
            H = {
                push: function(e) {
                    var t = void 0,
                        o = !!H.count() && H._layers[H._layers.length - 1];
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
                        VideoPlaylist.getCurListId() && (i = Object(C.i)(i, {
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
                    return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || H._layers.push(t), H.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = H._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    H._bl = !0, window.WkView && R.fullhide == WkView.hide ? (Object(L.W)(wkLayerWrap), clearTimeout(wkcur.showT)) : R.fullhide && R.fullhide(!0, !0), setTimeout(H.unblock, 5)
                },
                unblock: function() {
                    H._bl = !1
                },
                pop: function() {
                    if (H.count() && !H._bl) {
                        var e = H._layers.pop();
                        if (H.skipVideo && (H.skipVideo = !1, "video" == e[0])) return H._layers.push(e), void(H.skipVideo = !1);
                        "photo" === e[0] ? (Object(C.i)(e[3], {
                            fromQueue: !0
                        }), Object(V.x)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(C.i)(e[3], {
                            fromQueue: !0
                        }), Object(M.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(V.B)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(N.c)(e[1]) : "podcast" === e[0] && Object(V.z)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, o, n) {
                    for (var i = H._layers, r = i.length; r > 0; --r)
                        if (i[r - 1][0] == e && i[r - 1][1] == t || i[r - 1][0] == o && i[r - 1][1] == n) return H._layers = i.slice(0, r), H.pop(), !0;
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
        var F = o("0DAA");

        function W() {
            var e = {};
            Object(C.f)(Object(L.G)("_short_currency"), function() {
                var t = Object(L.s)(this, "short") || "";
                if (!t) return !0;
                var o = this.innerHTML,
                    n = Object(C.M)(o).length,
                    i = Object(L.O)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[i]) {
                    for (var r = "", a = n - 1; a >= 0; a--) r += "&#8399;";
                    var d = Object(L.e)("div", {
                        innerHTML: "<b>" + o + "</b><b>" + r + "</b>"
                    }, {
                        fontFamily: i,
                        fontSize: "24px"
                    });
                    Object(L.F)("utils").appendChild(d), e[i] = Math.abs(d.firstChild.offsetWidth - d.lastChild.offsetWidth) >= 2 * n, Object(L.fb)(d)
                }!1 === e[i] && Object(L.yb)(this, t)
            })
        }
        var U = o("0gG3"),
            q = o("XzvV"),
            z = o("v+DW"),
            G = o("lkNA");
        var Q = function() {
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
                    Object(L.F)("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", function() {
                        return e.hub.done()
                    }), ajax.post("hints.php", {
                        act: "a_start_hints"
                    }, {
                        onDone: function(t) {
                            e.startHintsText = Object(C.H)(t), e.hintsHub.done()
                        }
                    }))
                }, e.prototype.show = function(e) {
                    var t = window.placeholderSetup;
                    if (Object(L.F)("quick_search") && !this.on) return this.on = 1, Object(L.tb)(this.sCont), t("search_input"), Object(L.F)("search_input").setAttribute("autocomplete", "off"), Object(L.a)(Object(L.F)("qsearch_link"), "active"), this.prev_content = Object(L.F)("content"), this.qsearch_cont || (this.qsearch_cont = Object(L.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(S.c)(e) : void 0
                }, e.prototype.go = function(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(C.H)(Object(L.F)("search_input").value) + "&name=1";
                    return Object(S.c)(e || window.event), location.href = t, !1
                }, e.prototype.init = function(e) {
                    this.sCont = Object(L.F)("quick_search"), this.opt = e || {}
                }, e.prototype.hide = function(e, t) {
                    if (Object(L.F)("quick_search") && (!this.active || t) && this.on) {
                        var o = window.toggleFlash;
                        if (this.on = 0, o(), this.beforeHide && this.beforeHide()) return !0;
                        Object(L.F)("search_input").setValue ? Object(L.F)("search_input").setValue("") : Object(L.F)("search_input").value = "", Object(L.W)(this.sCont), Object(L.hb)(Object(L.F)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }, e.prototype.preload = function() {}, e
            }(),
            K = o("Bszp"),
            X = o("MSYF"),
            J = o("kHqu"),
            Y = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var o = [],
                            n = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var a, d = e[Symbol.iterator](); !(n = (a = d.next()).done) && (o.push(a.value), !t || o.length !== t); n = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !n && d.return && d.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return o
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            Z = "remixjsp";

        function $() {
            var e;
            (e = window.performance) && e.getEntriesByType && e.getEntriesByType("paint").forEach(function(e) {
                    "first-contentful-paint" === e.name && ie(e.startTime, "TTFCP")
                }),
                function() {
                    var e = window.performance;
                    e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(function(e) {
                        if ("navigation" === e.initiatorType) {
                            var t = e.domComplete,
                                o = e.domContentLoadedEventEnd,
                                n = e.loadEventEnd;
                            ie(t, "domComplete"), ie(o, "domContentLoadedEventEnd"), ie(n, "loadEventEnd")
                        }
                    })
                }(), oe()
        }
        var ee = [],
            te = !1;

        function oe() {
            if (te) {
                var e = window.performance,
                    t = ee[ee.length - 1];
                if (!t) return te = !1, void ie(-1);
                var o = t.startTime + t.duration;
                e.now() - o >= 3e3 ? ie(o, "TTI") : setTimeout(oe, 3e3)
            }
        }
        var ne = [];

        function ie(e, t) {
            var o = Math.floor(e);
            if (-1 !== e && (ne.push([o, t]), !(te ? "TTI" === t : ne.length > 2))) return;
            var n = "unknown",
                i = navigator.connection;
            i && i.effectiveType && (n = i.effectiveType);
            var r = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            ne.forEach(function(e) {
                var t = Y(e, 2),
                    o = t[0],
                    i = t[1];
                return r.events.push([i, o, cur.module, n, window.vk.rv])
            }), Object(O.d)(Z, JSON.stringify(r), .01)
        }

        function re() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(function(e) {
                ee = ee.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), te = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout($, 0)
            }) : $()
        }
        var ae = {
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
            de = o("1BRX"),
            we = o("W9Tc"),
            ce = o("98sY"),
            se = o("El3O"),
            le = o("EasH"),
            ue = o("kcIO"),
            fe = o("FWc3");

        function he(e, t) {
            var o = t.asrtl ? 0 : t.right ? 289 : 35,
                n = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
            return Object(fe.c)(e, {
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
                shift: [o, 8, 7],
                className: "mobile_tt" + n
            })
        }

        function be(e, t) {
            return Object(fe.c)(e, {
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

        function pe(e, t, o) {
            if (!cur._addRestoreInProgress) {
                var n = Object(L.T)("_audio_row", e),
                    i = AudioUtils.getAudioFromEl(n, !0),
                    r = Object(L.s)(e, "action"),
                    a = AudioUtils.getRowActionName(r, i, n),
                    d = {
                        text: function() {
                            return a
                        },
                        black: 1,
                        shift: t || [7, 4, 0],
                        needLeft: !0,
                        forcetodown: o
                    };
                each(["_im_mess_stack", "top_notify_wrap", "_ape_audio_item", "wk_history_audio_content"], function(t, o) {
                    if (Object(L.T)(o, e)) return d.appendParentCls = o, !1
                }), Object(L.T)("_im_mess_stack", e) && (d.shift = [7, 10, 0], d.noZIndex = !0), Object(fe.c)(e, d)
            }
        }

        function me(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            Object(fe.c)(e, {
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
                appendEl: Object(L.n)("im-page-history-w", e) || Object(L.n)("rb_box_wrap", e) || Object(L.n)("wk_cont", e) || Object(L.n)("scroll_fix_wrap", e)
            })
        }

        function ve(e) {
            var t = "";
            Object(L.T)("_im_mess_stack", e) && (t = "_im_mess_stack"), Object(fe.c)(e, {
                className: "bookmarks_tt ",
                shift: [32, 8],
                text: function() {
                    return "1" === Object(L.s)(e, "state") ? Object(L.s)(e, "remove") : Object(L.s)(e, "add")
                },
                black: 1,
                appendParentCls: t
            })
        }
        var ge = o("Ieup"),
            ye = o("t/FQ"),
            Oe = o("aong"),
            _e = .5,
            je = .25,
            ke = 300,
            Le = 1e3,
            Ee = 3e5,
            xe = 2500,
            Te = 5e3,
            Se = 6e3,
            Ce = 2e4,
            Ae = 1e3,
            Pe = 36e4,
            Be = "_longViewType",
            Ie = "_longViewIdled",
            Me = "_longViewModule",
            Ne = "_longViewStarted",
            De = "_longViewProcessed",
            Ve = "_longViewCached",
            Re = "_longViewHeight",
            He = "_longViewTop",
            Fe = "_longViewBottom",
            We = "REGULAR",
            Ue = "AUTOPLAY_AD",
            qe = "LongView.viewed",
            ze = "LongView.idled",
            Ge = vk.longViewTestGroup,
            Qe = [],
            Ke = [],
            Xe = [],
            Je = Date.now(),
            Ye = 0,
            Ze = 0,
            $e = !1,
            et = null,
            tt = null,
            ot = null,
            nt = null,
            it = {};

        function rt() {
            var e = kt();
            e.length && (yt(e), Lt())
        }

        function at() {
            Qe.forEach(function(e) {
                e[Ve] = !1
            })
        }

        function dt(e, t) {
            "im" === t && !e[Be] && function(e) {
                if (Object(L.V)(e, "im-mess--post")) return !0;
                var t = e && Object(L.u)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(L.V)(e, "no_posts"))
            }(e) && (e[Be] = function(e) {
                var t = e && Object(L.u)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? Ue : We
            }(e), e[Me] = t, Qe.push(e))
        }

        function wt(e, t) {
            var o = wt;
            ! function(e, t) {
                var o = [];
                Qe.forEach(function(n) {
                    Ct(n) ? o.push(n) : ! function(e, t, o) {
                        return !e[Ne] && xt(e, _e, t, o)
                    }(n, e, t) ? function(e, t, o) {
                        return e[Ne] && !xt(e, je, t, o)
                    }(n, e, t) && (n[Ie] ? delete n[Ie] : (At(Ke, n), Xe = Xe.concat(St(n))), delete n[Ne]) : (n[Ne] = Date.now(), Ke.push(n))
                }), o.forEach(function(e) {
                    At(Qe, e)
                })
            }(e || Object(I.e)(), t || window.innerHeight), $e ? (clearTimeout(o.timer), o.timer = setTimeout(ct, 150)) : ($e = !0, ht(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(L.H)("im-page--chat-header"),
                        t = Object(L.H)("im-page--chat-input");
                    Ye = e.getBoundingClientRect().top + e.offsetHeight, Ze = window.innerHeight - t.getBoundingClientRect().top
                } else Ye = Object(L.F)("page_header").offsetHeight, Ze = 0
            }())
        }

        function ct() {
            ht(), ft(), $e = !1
        }

        function st() {
            ht(), gt()
        }

        function lt() {
            Xe = [], Ke.forEach(function(e) {
                return e[Ne] = Date.now()
            }), Ot(null), _t(null), ft()
        }

        function ut() {
            ht(), gt(), Xe = [], Ke = [], Ot(null), _t(null)
        }

        function ft() {
            et = setTimeout(bt, xe), tt = setTimeout(pt, Te), ot = setTimeout(mt, Se), nt = setTimeout(vt, Ce)
        }

        function ht() {
            clearTimeout(et), clearTimeout(tt), clearTimeout(ot), clearTimeout(nt)
        }

        function bt() {
            Xe.length && Ot(Xe)
        }

        function pt() {
            yt(Xe), Xe = [], Ot(null)
        }

        function mt() {
            Ke.length && (_t(Tt(Ke, !0, !0)), ot = setTimeout(mt, Ae))
        }

        function vt() {
            clearTimeout(ot), yt(Tt(Ke)), Ke.forEach(function(e) {
                return e[Ie] = !0
            }), Ke = [], _t(null)
        }

        function gt() {
            yt(Xe.concat(Tt(Ke)))
        }

        function yt(e) {
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
                    return Object(C.f)(t, function(e, t) {
                        return o.push(e + "_" + t.join(","))
                    }), o.join(";")
                }(e),
                long_view: 1
            })
        }

        function Ot(e) {
            jt(qe, e)
        }

        function _t(e) {
            jt(ze, e)
        }

        function jt(e, t) {
            var o = F.a.get(e) || {};
            t ? o[Je] = t : delete o[Je], F.a.set(e, o)
        }

        function kt() {
            var e = kt,
                t = [],
                o = F.a.get(qe) || {},
                n = F.a.get(ze) || {};
            return e.iterator || (e.iterator = function(e) {
                return function(o) {
                    Et(o) && (t = t.concat(e[o]))
                }
            }), Object.keys(o).forEach(e.iterator(o)), Object.keys(n).forEach(e.iterator(n)), t
        }

        function Lt() {
            var e = Lt,
                t = F.a.get(qe) || {},
                o = F.a.get(ze) || {};
            e.iterator || (e.iterator = function(e) {
                return function(t) {
                    Et(t) && delete e[t]
                }
            }), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), F.a.set(qe, t), F.a.set(ze, o)
        }

        function Et(e) {
            var t = Number(e);
            return t !== Je && Date.now() - t >= Pe
        }

        function xt(e, t, o, n) {
            if (!e) return !1;
            e[Ve] || (e[Ve] = !0, e[Re] = e.offsetHeight, e[He] = o + e.getBoundingClientRect().top, e[Fe] = e[He] + e[Re]);
            var i = n - Ye - Ze,
                r = o + Ye,
                a = o + n - Ze,
                d = e[Re],
                w = e[He],
                c = e[Fe];
            return (c > r && w < a ? Math.min(a, c) - Math.max(r, w) : 0) >= Math.min(i * t, d * t)
        }

        function Tt(e, t, o) {
            return e.map(function(e) {
                return St(e, t, o)
            })
        }

        function St(e, t, o) {
            if (Ct(e)) return [];
            var n = Math.min(Ee, Date.now() - e[Ne]);
            if (e[Be] === We && n < ke || e[Be] === Ue && n < Le) return [];
            o || (e[De] = !0);
            var i, r = function(e) {
                    var t = e[Me];
                    if ("im" === t) {
                        var o = Object(L.c)(e, "data-post-id"),
                            n = Object(L.c)(e, "data-copy"),
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
                    t || (it[f = l + "_" + u] || (it[f] = 0), it[f]++), w.push("ad" === l ? {
                        ownerId: "ad",
                        postId: u,
                        module: a,
                        viewIndex: it[f]
                    } : "ads" === l ? {
                        ownerId: "ads",
                        postId: u,
                        module: a,
                        index: r.index,
                        duration: n,
                        sessionId: d,
                        viewIndex: it[f]
                    } : {
                        ownerId: l,
                        postId: (1 === r[c] ? "" : "-") + u,
                        module: a,
                        index: r.index,
                        duration: n,
                        sessionId: d,
                        q: r.q || null,
                        viewIndex: it[f]
                    })
                }
            return w
        }

        function Ct(e) {
            return "page_view" === Ge && e[De] || !document.body.contains(e)
        }

        function At(e, t) {
            var o = e.indexOf(t);
            o >= 0 && e.splice(o, 1)
        }
        var Pt = o("QGEU"),
            Bt = o("eNQP"),
            It = o("o7bv"),
            Mt = o("wetz"),
            Nt = o("i6oL"),
            Dt = o("m0N1"),
            Vt = window.isMVK ? "mvk" : "web",
            Rt = {
                start: function(e, t) {
                    var o = this;
                    if (t.stopPropagation(), t.preventDefault(), window.statlogsValueEvent("first_april_special_event", "click", Vt), !this.timeoutHandle) {
                        var n = Number(e.getAttribute("data-v")) || 0;
                        this.duration && this.id || (this.duration = Number(e.getAttribute("data-duration")) || 0, this.id = e.getAttribute("data-id")), this.duration && this.id && (!this.animationData || !this.animationData.v || "number" == typeof this.v && this.v !== n ? (this.v = n, this._getAnimation().then(function(e) {
                            return o.animationData = JSON.parse(e), o._loadBodymovin()
                        }).then(function() {
                            return o._play()
                        })) : this._play())
                    }
                },
                _getAnimation: function() {
                    var e = this;
                    return new Promise(function(t) {
                        var o = new XMLHttpRequest;
                        o.open("GET", "/images/stickers/special/" + e.id + "/animation.json?v=" + e.v, !0), o.send(), o.onreadystatechange = function() {
                            4 === o.readyState && t(o.responseText)
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
                            t.stop(), t.destroy(), e.frame.style.display = "none", e.timeoutHandle = null, window.statlogsValueEvent("first_april_special_event", "showed", Vt)
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
            Ht = o("B3ia");
        m.polyfill(), window.Map = d, window.Set = w;
        var Ft = window.vk;

        function Wt() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, Ft.width = 960, Ft.started = Object(C.L)(), Ft.counts = {}, j.a.android && (Object(O.d)("remixscreen_width", window.screen.width, 365), Object(O.d)("remixscreen_height", window.screen.height, 365), Object(O.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(O.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(O.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(J.f)(), Object(U.b)(), Object(S.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(S.h)(vkCache[e].handle.elem)
            }), Object(S.b)(window, "DOMContentLoaded load", function() {
                Ft.loaded || (Ft.loaded = !0, Object(z.y)()), Object(se.c)()
            }), Object(S.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(S.b)(document, "keydown", Mt.a)
        }
        var Ut = 0;

        function qt() {
            if (window.headNode = Object(L.J)("head"), window.icoNode = Object(L.J)("link", headNode), window.bodyNode = Object(L.J)("body"), window.htmlNode = Object(L.J)("html"), window.utilsNode = Object(L.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(S.b)(bodyNode, "resize", se.j.pbind(!1)), utilsNode) {
                j.a.mozilla ? Object(L.a)(bodyNode, "firefox") : j.a.mobile && Object(L.a)(bodyNode, "mobfixed"), Object(ye.f)(), Object(U.a)();
                var e = Object(L.F)("layer_bg"),
                    t = e.nextSibling,
                    o = Object(L.F)("box_layer_bg"),
                    n = o.nextSibling;
                window.layerBG = e, window.boxLayerBG = o, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = n, window.boxLayer = n.firstChild, window.boxLoader = n.firstChild.firstChild, window._stlSide = Object(L.F)("stl_side"), window._stlLeft = Object(L.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, j.a.mobile || Object(Nt.a)(), Object(S.b)(n, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(n), window.layers = function(e, t, o, n) {
                    return window.layerQueue = H, Object(C.i)(R, {
                        show: R._show.pbind(e, t),
                        boxshow: R._show.pbind(o, n),
                        wrapshow: R._show.pbind(e),
                        hide: R._hide.pbind(e, t),
                        boxhide: R._hide.pbind(o, n),
                        wraphide: R._hide.pbind(e)
                    }), R
                }(e, t, o, n), hab.init(), window._retinaInit ? window._retinaInit() : Ut = 1
            }
        }

        function zt() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: function() {
                        return cur.module
                    },
                    getOID: function() {
                        return cur.oid
                    }
                })), Object(Nt.b)();
                var e = Object(L.F)("side_bar");
                window.pageNode = Object(L.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(L.O)(e, "position"), window._tbLink = Object(L.F)("top_back_link"), j.a.chrome || j.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = j.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(C.L)() - Ft.started, 10),
                    o = Object(C.r)((Ft.contlen || 1) / t * 1e3);
                j.a.mozilla && j.a.version >= 4 ? o /= 2.5 : j.a.mozilla ? o *= 1.5 : j.a.msie && j.a.version >= 7 ? o /= 1.5 : j.a.msie && (o *= 2.5);
                var n = Object(C.r)(150 * Math.max(2e6 / o, 1));
                if (U.d.highlimit = 6 * n, U.d.lowlimit = Math.min(n, 600), Object(se.j)(), setTimeout(se.j.pbind(!1), 0), Object(Pt.c)(), window.addEventListener("scroll", se.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !Ft.id && F.a.checkVersion() && F.a.get("last_reloaded")) try {
                    var i = {};
                    Object(C.f)(["sound_notify_off", "im_ui_notify_off"], function(e, t) {
                        var o = F.a.get(t);
                        null !== o && (i[t] = o)
                    }), window.localStorage.clear(), Object(C.f)(i, function(e, t) {
                        return F.a.set(e, t)
                    })
                } catch (e) {}
            }
        }
        var Gt = function() {
            function e(t, o) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.count = o || 1, this.func = t
            }
            return e.prototype.done = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                this.count -= e, this.count <= 0 && this.func()
            }, e
        }();

        function Qt(e) {
            Ft.loaded ? e() : Object(S.b)(window, "load", e)
        }

        function Kt() {
            window.showWriteMessageBox = ge.g, window.giftsBox = ge.a, window.moneyTransferBox = ge.d, window.reportAd = ge.e, window.mobilePromo = ge.c, window.showAudioClaimWarning = ge.f, window.menuSettings = ge.b, window.sureDeleteAll = ge.h, window.TopNotifier = Object(V.l)(), window.showPhoto = V.x, window.showManyPhoto = V.w, window.showAlbums = V.u, window.showAlbum = V.t, window.showPhotoTags = V.y, window.isPhotoeditor3Available = V.o, window.AudioMessagePlayer = V.a, window.showVideoTags = V.A, window.videoCallback = V.C, window.showWiki = V.B, window.showApp = V.v, window.showPodcast = V.z, window.podcastStartFrom = V.r, window.articlePrepare = V.b, window.isArticleLayerOpen = V.n, window.isArticleEditorAvailable = V.m, window.openArticleEditor = V.q, window.mentionOver = me, window.mentionClick = V.p, window.mobileOnlineTip = he, window.pageVerifiedTip = be, window.audioShowActionTooltip = pe, window.shareAudioPlaylist = V.s, window.getAudioPlayer = V.j, window.deleteAudioOnClaim = V.i, window.initTopAudioPlayer = V.k, window.bookmark = V.c, window.bookmarkPost = V.h, window.bookmarkArticle = V.d, window.bookmarkLink = V.e, window.bookmarkPodcast = V.g, window.bookmarkNarrative = V.f, window.bookmarkTooltip = ve, window.showStory = N.c, window.showNarrative = N.b, window.storiesPreloadStatic = N.d, window.sendMask = N.a
        }
        window.constants = {
            Groups: ae
        }, window.partConfigEnabled = we.a, Object(L.X)(), window.ge = L.F, window.geByTag = L.I, window.geByTag1 = L.J, window.geByClass = L.G, window.geByClass1 = L.H, window.gpeByClass = L.T, window.domQuery = L.B, window.domQuery1 = L.C, window.domClosest = L.n, window.ce = L.e, window.cf = L.f, window.re = L.fb, window.se = L.mb, window.sech = L.nb, window.rs = L.lb, window.psr = L.eb, window.domReplaceEl = L.D, window.domEL = L.t, window.domNS = L.y, window.domPS = L.A, window.domFC = L.u, window.domLC = L.x, window.domPN = L.z, window.domChildren = L.m, window.domInsertBefore = L.w, window.domInsertAfter = L.v, window.domByClass = L.j, window.domData = L.s, window.domChildIndex = L.l, window.domCA = L.k, window.domClosestSibling = L.r, window.matchesSelector = L.db, window.isHover = L.Z, window.isAncestor = L.Y, window.getScroll = L.M, window.domClosestPositioned = L.q, window.domClosestOverflowHidden = L.p, window.show = L.tb, window.hide = L.W, window.isVisible = L.ab, window.clientHeight = L.h, window.getClientRectOffsetY = L.K, window.toggle = L.ub, window.boundingRectEnabled = L.d, window.getXYRect = L.R, window.getXY = L.Q, window.isWindow = L.bb, window.getSize = L.N, window.hasClass = L.V, window.addClass = L.a, window.addClassDelayed = L.b, window.removeClass = L.hb, window.removeClassDelayed = L.ib, window.toggleClass = L.vb, window.toggleClassDelayed = L.wb, window.replaceClass = L.kb, window.getStyle = L.O, window.setStyle = L.qb, window.setStyleDelayed = L.rb, window.setPseudoStyle = L.pb, window.data = L.i, window.attr = L.c, window.removeAttr = L.gb, window.removeData = L.jb, window.cleanElems = L.g, window.setTitle = L.sb, window.getZoom = L.S, window.val = L.yb, window.elfocus = L.E, window.traverseParent = L.xb, window.getH = L.L, window.getW = L.P, window.domClosestByTag = L.o, window.setDocumentTitle = L.ob, window.lockDocumentTitle = L.cb, window.KEY = S.a, window.addEvent = S.b, window.removeEvent = S.h, window.triggerEvent = S.j, window.cancelEvent = S.c, window.stopEvent = S.i, window.normEvent = S.g, window.checkEvent = S.d, window.checkKeyboardEvent = S.e, window.checkOver = S.f, Object(C.q)(), window.isRetina = C.y, window.extractUrls = C.j, window.serializeForm = C.F, window.addTemplates = C.a, window.getTemplate = C.n, window.rand = C.D, window.irand = C.s, window.isUndefined = C.A, window.isFunction = C.v, window.isArray = C.t, window.isString = C.z, window.isObject = C.x, window.isEmpty = C.u, window.vkNow = C.L, window.vkImage = C.J, window.trim = C.H, window.stripHTML = C.G, window.escapeRE = C.h, window.intval = C.r, window.floatval = C.k, window.positive = C.C, window.isNumeric = C.w, window.winToUtf = C.M, window.replaceEntities = C.E, window.clean = C.c, window.unclean = C.I, window.each = C.f, window.indexOf = C.p, window.inArray = C.o, window.clone = C.d, window.arrayKeyDiff = C.b, window.extend = C.i, window.vkLocal = C.K, window.lTimeout = C.B, window.getCaretCharacterOffsetWithin = C.m, window.formatCount = C.l, window.encodeHtml = C.g, window.decodeHtml = C.e, Object(_.c)(), window.ajx2q = _.b, window.q2ajx = _.f, window.requestBox = _.g, window.activateMobileBox = _.a, window.validateMobileBox = _.h, window.validatePassBox = _.i, window.photoCaptchaBox = _.e, Object(O.c)(), window.getCookie = O.a, window.setCookie = O.d, window.hideCookiesPolicy = O.b, Object(ce.c)(), window.debugLog = ce.b, window.debugEl = ce.a, window.isToday = de.c, window.isYesterday = de.e, window.isTomorrow = de.d, window.isSameDate = de.b, window.leadingZero = de.f, window.formatTime = de.a, window.parseLatin = B.o, window.parseCyr = B.m, window.parseLatKeys = B.n, window.langNumeric = B.i, window.langSex = B.j, window.langStr = B.k, window.addLangKeys = B.a, window.getLang = B.d, window.langDate = B.h, window.getShortDate = B.e, window.getShortDateOrTime = B.f, window.langWordNumeric = B.l, window.getDateText = B.c, window.getBigDateNew = B.b, window.getSmDate = B.g, window.scrollToY = I.g, window.scrollToTop = I.f, window.scrollGetX = I.d, window.scrollGetY = I.e, window.disableBodyScroll = I.a, window.enableBodyScroll = I.b, window.Chat = ye.a, window.__qlTimer = null, window.__qlClear = ye.b, window.onLoginDone = ye.m, window.onLoginFailed = ye.n, window.onLoginCaptcha = ye.l, window.onLoginReCaptcha = ye.o, window.storePasswordCredential = ye.p, window.cssAnim = ye.c, window.imagesLoader = ye.e, window.nodeUpdated = ye.k, window.hideNewsAnnounce = ye.d, window.leftAdBlockClose = ye.h, window.leftBlockToggleFriend = ye.j, window.leftBlockFriendTooltip = ye.i, window.placeholderSetup = It.c, window.placeholderInit = It.b, window.isInputActive = It.a, window.showTooltip = fe.c, window.showTitle = fe.b, window.showHint = fe.a, window.topMsg = y.d, window.showMsg = y.b, window.topError = y.c, window.showGlobalPrg = y.a, window.checkTextLength = Oe.b, window.getSelectionText = Oe.d, window.goAway = Oe.e, window.debounce = Oe.c, window.hashCode = Oe.g, window.isFullScreen = Oe.h, window.parallel = Oe.k, window.parseJSON = Oe.l, window.shuffle = Oe.m, window.throttle = Oe.n, window.toggleOnline = Oe.q, window.updateMoney = Oe.s, window.onlinePlatformClass = Oe.j, window.Fx = T.a, window.fx = T.a, window.animate = T.b, window.cubicBezier = T.d, window.fadeTo = T.g, window.genFx = T.i, window.getRGB = T.k, window.getColor = T.j, window.slideDown = T.l, window.slideUp = T.n, window.slideToggle = T.m, window.fadeIn = T.e, window.fadeOut = T.f, window.fadeToggle = T.h, window.animateCount = T.c, window.updateAriaElements = Pt.c, window.updateAriaCheckboxes = Pt.b, window.hasAccessibilityMode = Pt.a, window.cancelStackFilter = D.a, window.cancelStackPush = D.c, window.cancelStackPop = D.b, Object(Ht.a)(), window.ElementTooltip = k.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = E, 1 === Ft.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== Ft.al || history.pushState || (Ft.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), Ft.version = !1), Object(U.c)(), window.stManager = U.d, Object(j.c)(), window.browser = j.a, window.mobPlatforms = j.d, window.browserFeatures = j.b, Object(x.a)(), window.toggleFlash = x.c, window.renderFlash = x.b, Wt(), window.updateHeaderStyles = J.j, window.updateNarrow = se.m, window.checkPageBlocks = se.c, window.redraw = se.l, window.onBodyResize = se.j, window.onBodyScroll = se.k, window.leftBlockOver = se.i, window.leftBlockOut = se.h, window.leftBlockHide = se.g, window.onDocumentClick = Mt.c, window.onEnter = Mt.d, window.onCtrlEnter = Mt.b, window.logLeftMenuClicks = q.a, window.autosizeSetup = se.b, window.getProgressBarEl = se.e, window.getProgressHtml = se.f, Object(Dt.b)(), re(), window.onDomReady = function(e) {
            return e()
        }, window.currentModule = function() {
            return cur.currentModule ? cur.currentModule() : cur.module
        }, window.hab = P(), window.ls = F.a, window.shortCurrency = W, window.statlogsValueEvent = q.d, window.saveSearchAttemptStats = q.c, window.removeSearchPositionTracker = q.b, window.callHub = Gt, window.CallHub = Gt, window.gSearch = new Q, window.zNav = J.m, window.handlePageView = J.e, window.handlePageParams = J.d, window.handlePageCount = J.c, window.comScoreUDM = J.a, window.updateOtherCounters = J.l, window.processDestroy = J.g, window.globalHistoryDestroy = J.b, window.showBackLink = J.i, window.nav = X.a, nav.init(), Ft.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === t[1] && 12 === Ft.time[1] ? Ft.time[1] = 0 : 12 === t[1] && 1 === Ft.time[1] ? t[1] = 0 : (t[1] > Ft.time[1] + 1 || Ft.time[1] > t[1] + 1) && (t[1] = Ft.time[1] = t[2] = Ft.time[2] = 0), t[1] > Ft.time[1] && 1 === t[2] ? 31 === Ft.time[2] || (4 === Ft.time[1] || 6 === Ft.time[1] || 9 === Ft.time[1] || 11 === Ft.time[1]) && 30 === Ft.time[2] || 2 === Ft.time[1] && (29 === Ft.time[2] || 28 === Ft.time[2] && Ft.time[0] % 4) ? Ft.time[2] = 0 : Ft.time[2] = t[2] = 0 : Ft.time[1] > t[1] && 1 === Ft.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && Ft.time[0] % 4) ? t[2] = 0 : t[2] = Ft.time[2] = 0), (t[2] > Ft.time[2] + 1 || Ft.time[2] > t[2] + 1) && (t[2] = Ft.time[2] = 0);
            var o = 60 * (60 * (24 * (t[2] - Ft.time[2]) + (t[3] - Ft.time[3])) + (t[4] - Ft.time[4]));
            o < -55800 ? o += 86400 : o > 37800 && (o -= 86400);
            var n = 0,
                i = Math.abs(o);
            Object(C.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], function(e, t) {
                var r = Math.round(3600 * (t - 3)),
                    a = Math.abs(o - r);
                a < i && (i = a, n = r)
            }), Ft.dt = n, Object(O.a)("remixdt") !== Ft.dt && Object(O.d)("remixdt", Ft.dt, 365);
            var r = Object(C.r)(Object(O.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!j.a.iphone || Object(O.a)("remixme")) ? 1 & r || (Object(O.d)("remixrt", 1 | r, 365), window._retinaInit = function() {
                U.d.add(["retina.css"]), Object(L.a)(document.body, "is_2x")
            }, Ut && window._retinaInit()) : 1 & r && Object(O.d)("remixrt", 1 ^ r, 365)
        }, 0), window.boxQueue = Object(ue.c)(), window.__bq = boxQueue, window.curBox = ue.b, Object(ue.d)(), window.boxRefreshCoords = ue.a, window.MessageBox = le.a, window.showBox = le.b, window.showTabbedBox = le.f, window.showFastBox = le.d, window.showCaptchaBox = le.c, window.showReCaptchaBox = le.e, window.showDoneBox = ue.e, window.TopMenu = se.a, window.TopSearch = K.a, window.handleScroll = Oe.f, window.loadScript = G.a, window.SpecialEvent = Rt, Object(z.j)(), window.notaBene = z.q, window.updSideTopLink = z.y, window.createButton = z.d, window.actionsMenuItemLocked = z.a, window.lockActionsMenuItem = z.n, window.unlockActionsMenuItem = z.v, window.linkLocked = z.m, window.lockLink = z.p, window.unlockLink = z.x, window.lockButton = z.o, window.unlockButton = z.w, window.buttonLocked = z.b, window.isButtonLocked = z.k, window.disableButton = z.f, window.sbWidth = z.t, window.isChecked = z.l, window.checkbox = z.c, window.disable = z.e, window.radioval = z.s, window.radiobtn = z.r, window.showProgress = z.u, window.hideProgress = z.i, window.disableEl = z.g, window.enableEl = z.h, Object(M.d)(), window.VideoConstants = M.a, window.showVideo = M.j, window.showInlineVideo = M.i, window.loadInlineVideo = M.e, window.revertLastInlineVideo = M.h, window.destroyInlineVideoPlayer = M.c, window.pauseLastInlineVideo = M.f, window.playLastInlineVideo = M.g, window.checkMp4 = M.b, window.performance && window.performance.memory && Object(C.D)(0, 100) < 5 && Object(Bt.a)(), Ge ? (Object(S.b)(window, "blur", st), Object(S.b)(window, "focus", lt), onDomReady(function() {
            return setTimeout(rt, 500)
        }), window.LongView = {
            register: dt,
            onScroll: Object(Oe.n)(wt, 50),
            onBeforePageChange: ut,
            clearElemsCache: at,
            _debug: function() {
                return {
                    started: Ke,
                    tracking: Qe,
                    viewedData: Xe,
                    viewIndexes: it,
                    blindTop: Ye,
                    blindBottom: Ze
                }
            }
        }) : window.LongView = {
            register: function() {},
            onScroll: function() {},
            onBeforePageChange: function() {},
            clearElemsCache: function() {}
        }, Object(ye.g)(), Kt(), window.onLoaded = Qt, window.domStarted = qt, window.domReady = zt, Object(ce.b)("common module enabled"), U.d.done(jsc("web/common_web.js"))
    }
});