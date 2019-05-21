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
        }(this || {})
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
        var o, i, r, a, s = n("qKs0"),
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
                s = arguments.length;
            if (!s) return "";
            for (var d = ""; ++a < s;) {
                var c = Number(arguments[a]);
                if (!isFinite(c) || c < 0 || c > 1114111 || r(c) != c) throw RangeError("Invalid code point: " + c);
                c <= 65535 ? o.push(c) : (t = 55296 + ((c -= 65536) >> 10), n = c % 1024 + 56320, o.push(t, n)), (a + 1 == s || o.length > 16384) && (d += i.apply(null, o), o.length = 0)
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
        var c, w, u, l, f, h, p, b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        c = window, w = c.HTMLCanvasElement && c.HTMLCanvasElement.prototype, u = c.Blob && function() {
            try {
                return Boolean(new Blob)
            } catch (e) {
                return !1
            }
        }(), l = u && c.Uint8Array && function() {
            try {
                return 100 === new Blob([new Uint8Array(100)]).size
            } catch (e) {
                return !1
            }
        }(), f = c.BlobBuilder || c.WebKitBlobBuilder || c.MozBlobBuilder || c.MSBlobBuilder, h = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, p = (u || f) && c.atob && c.ArrayBuffer && c.Uint8Array && function(e) {
            var t, n, o, i, r, a, s, d, c;
            if (!(t = e.match(h))) throw new Error("invalid data URI");
            for (n = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), o = !!t[4], i = e.slice(t[0].length), r = o ? atob(i) : decodeURIComponent(i), a = new ArrayBuffer(r.length), s = new Uint8Array(a), d = 0; d < r.length; d += 1) s[d] = r.charCodeAt(d);
            return u ? new Blob([l ? s : a], {
                type: n
            }) : ((c = new f).append(a), c.getBlob(n))
        }, c.HTMLCanvasElement && !w.toBlob && (w.mozGetAsFile ? w.toBlob = function(e, t, n) {
            e(n && w.toDataURL && p ? p(this.toDataURL(t, n)) : this.mozGetAsFile("blob", t))
        } : w.toDataURL && p && (w.toBlob = function(e, t, n) {
            e(p(this.toDataURL(t, n)))
        })), "function" == typeof define && define.amd ? define(function() {
            return p
        }) : "object" == ("undefined" == typeof module ? "undefined" : b(module)) && module.exports ? module.exports = p : c.dataURLtoBlob = p;
        var v = n("E2g8"),
            m = n("4O8T");
        window.EventEmitter = m;

        function g(e) {
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
        }), g(window.NodeList), g(window.HTMLCollection);
        var y = n("ryw6"),
            _ = n("kMSP"),
            O = n("Kngp"),
            j = n("gdug"),
            E = n("k487"),
            S = n("zxIV");

        function k(e, t) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
                var n = Object(S.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(n, icoNode), icoNode = n
            }
        }
        var L = n("HhI8"),
            T = n("7jxN"),
            P = n("Egk5"),
            R = n("t7n3"),
            I = function() {
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

        function x() {
            return new function(e) {
                var t = function(e) {
                        var t = e.split("#"),
                            n = I(t, 2),
                            o = n[0],
                            i = n[1],
                            r = o.split("?"),
                            a = I(r, 2),
                            s = a[0],
                            d = a[1];
                        return s + (d ? "?" + Object(O.b)(Object(O.f)(d)) : "") + (i ? "#" + i : "")
                    },
                    n = Object(R.i)({
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
                        1 == vk.al && r(!0), 3 == vk.al ? (Object(P.b)(window, "popstate", r), j.a.safari && Object(P.b)(window, "hashchange", r)) : "onhashchange" in window ? Object(P.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : r()
                        }) : a = setInterval(r, 200)
                    },
                    setOptions: function(e) {
                        n = Object(R.i)(n, e)
                    },
                    checker: r,
                    stop: function() {
                        vk.al < 3 ? clearInterval(a) : 3 == vk.al && Object(P.h)(window, "popstate", r)
                    }
                }
            }({
                onLocChange: function(e) {
                    var t = {
                        back: !0,
                        hist: !0
                    };
                    3 === vk.al && history.state && Object(R.x)(history.state) && (t.scrollTop = Object(R.r)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
                }
            })
        }
        var C = n("4+be"),
            A = n("lXE5"),
            N = n("Ia1d"),
            B = n("XuKo"),
            M = n("ErRf"),
            D = n("/PiP"),
            F = {
                sh: function(e, t) {
                    Object(S.tb)(e), Object(R.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(S.W)(e), Object(R.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, n, o) {
                    var i = "layers" + (boxQueue.count() + 1);
                    Object(M.c)(i, function() {}), Object(S.qb)(e, {
                        opacity: n || "",
                        backgroundColor: o || ""
                    }), F.visible || (Object(L.c)(), Object(A.a)()), F.visible || Object(N.f)(), F.visible = !0, Object(S.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(S.hb)(t, "box_layer_hidden") : Object(S.tb)(t), F.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    F.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(M.a)(e), t && t.visibilityHide ? Object(S.a)(t, "box_layer_hidden") : Object(S.W)(t), Object(S.ab)(layerWrap) || cur._inLayer || Object(S.ab)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(S.ab)(window.mvLayerWrap)) || Object(S.ab)(window.wkLayerWrap) || (F.visible = !1, Object(S.hb)(bodyNode, "layers_shown"), Object(L.c)(!0), Object(A.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), F.visible || Object(N.g)()
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
                        VideoPlaylist.getCurListId() && (i = Object(R.i)(i, {
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
                    H._bl = !0, window.WkView && F.fullhide == WkView.hide ? (Object(S.W)(wkLayerWrap), clearTimeout(wkcur.showT)) : F.fullhide && F.fullhide(!0, !0), setTimeout(H.unblock, 5)
                },
                unblock: function() {
                    H._bl = !1
                },
                pop: function() {
                    if (H.count() && !H._bl) {
                        var e = H._layers.pop();
                        if (H.skipVideo && (H.skipVideo = !1, "video" == e[0])) return H._layers.push(e), void(H.skipVideo = !1);
                        "photo" === e[0] ? (Object(R.i)(e[3], {
                            fromQueue: !0
                        }), Object(D.y)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(R.i)(e[3], {
                            fromQueue: !0
                        }), Object(N.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(D.C)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(B.c)(e[1]) : "podcast" === e[0] && Object(D.A)(null, e[1], null, "layer_back")
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
        var V = n("Xrg9");

        function U() {
            var e = {};
            Object(R.f)(Object(S.G)("_short_currency"), function() {
                var t = Object(S.s)(this, "short") || "";
                if (!t) return !0;
                var n = this.innerHTML,
                    o = Object(R.M)(n).length,
                    i = Object(S.O)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[i]) {
                    for (var r = "", a = o - 1; a >= 0; a--) r += "&#8399;";
                    var s = Object(S.e)("div", {
                        innerHTML: "<b>" + n + "</b><b>" + r + "</b>"
                    }, {
                        fontFamily: i,
                        fontSize: "24px"
                    });
                    Object(S.F)("utils").appendChild(s), e[i] = Math.abs(s.firstChild.offsetWidth - s.lastChild.offsetWidth) >= 2 * o, Object(S.fb)(s)
                }!1 === e[i] && Object(S.yb)(this, t)
            })
        }
        var W = n("0gG3"),
            q = n("XzvV"),
            G = n("v+DW"),
            z = n("lkNA");
        var K = function() {
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
                    Object(S.F)("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", function() {
                        return e.hub.done()
                    }), ajax.post("hints.php", {
                        act: "a_start_hints"
                    }, {
                        onDone: function(t) {
                            e.startHintsText = Object(R.H)(t), e.hintsHub.done()
                        }
                    }))
                }, e.prototype.show = function(e) {
                    var t = window.placeholderSetup;
                    if (Object(S.F)("quick_search") && !this.on) return this.on = 1, Object(S.tb)(this.sCont), t("search_input"), Object(S.F)("search_input").setAttribute("autocomplete", "off"), Object(S.a)(Object(S.F)("qsearch_link"), "active"), this.prev_content = Object(S.F)("content"), this.qsearch_cont || (this.qsearch_cont = Object(S.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(P.c)(e) : void 0
                }, e.prototype.go = function(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(R.H)(Object(S.F)("search_input").value) + "&name=1";
                    return Object(P.c)(e || window.event), location.href = t, !1
                }, e.prototype.init = function(e) {
                    this.sCont = Object(S.F)("quick_search"), this.opt = e || {}
                }, e.prototype.hide = function(e, t) {
                    if (Object(S.F)("quick_search") && (!this.active || t) && this.on) {
                        var n = window.toggleFlash;
                        if (this.on = 0, n(), this.beforeHide && this.beforeHide()) return !0;
                        Object(S.F)("search_input").setValue ? Object(S.F)("search_input").setValue("") : Object(S.F)("search_input").value = "", Object(S.W)(this.sCont), Object(S.hb)(Object(S.F)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }, e.prototype.preload = function() {}, e
            }(),
            Y = n("Bszp"),
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
                                n = e.domContentLoadedEventEnd,
                                o = e.loadEventEnd;
                            ie(t, "domComplete"), ie(n, "domContentLoadedEventEnd"), ie(o, "loadEventEnd")
                        }
                    })
                }(), ne()
        }
        var ee = [],
            te = !1;

        function ne() {
            if (te) {
                var e = window.performance,
                    t = ee[ee.length - 1];
                if (!t) return te = !1, void ie(-1);
                var n = t.startTime + t.duration;
                e.now() - n >= 3e3 ? ie(n, "TTI") : setTimeout(ne, 3e3)
            }
        }
        var oe = [];

        function ie(e, t) {
            var n = Math.floor(e);
            if (-1 !== e && (oe.push([n, t]), !(te ? "TTI" === t : oe.length > 2))) return;
            var o = "unknown",
                i = navigator.connection;
            i && i.effectiveType && (o = i.effectiveType);
            var r = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            oe.forEach(function(e) {
                var t = J(e, 2),
                    n = t[0],
                    i = t[1];
                return r.events.push([i, n, cur.module, o, window.vk.rv])
            }), Object(_.d)(Z, JSON.stringify(r), .01)
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
            se = n("1BRX"),
            de = n("W9Tc"),
            ce = n("98sY"),
            we = n("El3O"),
            ue = n("EasH"),
            le = n("kcIO"),
            fe = n("FWc3");

        function he(e, t) {
            var n = t.asrtl ? 0 : t.right ? 289 : 35,
                o = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
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
                shift: [n, 8, 7],
                className: "mobile_tt" + o
            })
        }

        function pe(e, t) {
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

        function be(e, t, n) {
            if (!cur._addRestoreInProgress) {
                var o = Object(S.T)("_audio_row", e),
                    i = AudioUtils.getAudioFromEl(o, !0),
                    r = Object(S.s)(e, "action"),
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
                    if (Object(S.T)(n, e)) return s.appendParentCls = n, !1
                }), Object(S.T)("_im_mess_stack", e) && (s.shift = [7, 10, 0], s.noZIndex = !0), Object(fe.c)(e, s)
            }
        }

        function ve(e) {
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
                appendEl: Object(S.n)("im-page-history-w", e) || Object(S.n)("rb_box_wrap", e) || Object(S.n)("wk_cont", e) || Object(S.n)("scroll_fix_wrap", e)
            })
        }

        function me(e) {
            var t = "";
            Object(S.T)("_im_mess_stack", e) && (t = "_im_mess_stack"), Object(fe.c)(e, {
                className: "bookmarks_tt ",
                shift: [32, 8],
                text: function() {
                    return "1" === Object(S.s)(e, "state") ? Object(S.s)(e, "remove") : Object(S.s)(e, "add")
                },
                black: 1,
                appendParentCls: t
            })
        }
        var ge = n("Ieup"),
            ye = n("t/FQ"),
            _e = n("aong"),
            Oe = .5,
            je = .25,
            Ee = 300,
            Se = 1e3,
            ke = 3e5,
            Le = 2500,
            Te = 5e3,
            Pe = 6e3,
            Re = 2e4,
            Ie = 1e3,
            xe = 36e4,
            Ce = "_longViewType",
            Ae = "_longViewIdled",
            Ne = "_longViewModule",
            Be = "_longViewStarted",
            Me = "_longViewProcessed",
            De = "_longViewCached",
            Fe = "_longViewHeight",
            He = "_longViewTop",
            Ve = "_longViewBottom",
            Ue = "REGULAR",
            We = "AUTOPLAY_AD",
            qe = "LongView.viewed",
            Ge = "LongView.idled",
            ze = vk.longViewTestGroup,
            Ke = [],
            Ye = [],
            Qe = [],
            Xe = Date.now(),
            Je = 0,
            Ze = 0,
            $e = !1,
            et = null,
            tt = null,
            nt = null,
            ot = null,
            it = {};

        function rt() {
            var e = Et();
            e.length && (yt(e), St())
        }

        function at() {
            Ke.forEach(function(e) {
                e[De] = !1
            })
        }

        function st(e, t) {
            "im" === t && !e[Ce] && function(e) {
                if (Object(S.V)(e, "im-mess--post")) return !0;
                var t = e && Object(S.u)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(S.V)(e, "no_posts"))
            }(e) && (e[Ce] = function(e) {
                var t = e && Object(S.u)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? We : Ue
            }(e), e[Ne] = t, Ke.push(e))
        }

        function dt(e, t) {
            var n = dt;
            ! function(e, t) {
                var n = [];
                Ke.forEach(function(o) {
                    Rt(o) ? n.push(o) : ! function(e, t, n) {
                        return !e[Be] && Lt(e, Oe, t, n)
                    }(o, e, t) ? function(e, t, n) {
                        return e[Be] && !Lt(e, je, t, n)
                    }(o, e, t) && (o[Ae] ? delete o[Ae] : (It(Ye, o), Qe = Qe.concat(Pt(o))), delete o[Be]) : (o[Be] = Date.now(), Ye.push(o))
                }), n.forEach(function(e) {
                    It(Ke, e)
                })
            }(e || Object(A.e)(), t || window.innerHeight), $e ? (clearTimeout(n.timer), n.timer = setTimeout(ct, 150)) : ($e = !0, ht(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(S.H)("im-page--chat-header"),
                        t = Object(S.H)("im-page--chat-input");
                    Je = e.getBoundingClientRect().top + e.offsetHeight, Ze = window.innerHeight - t.getBoundingClientRect().top
                } else Je = Object(S.F)("page_header").offsetHeight, Ze = 0
            }())
        }

        function ct() {
            ht(), ft(), $e = !1
        }

        function wt() {
            ht(), gt()
        }

        function ut() {
            Qe = [], Ye.forEach(function(e) {
                return e[Be] = Date.now()
            }), _t(null), Ot(null), ft()
        }

        function lt() {
            ht(), gt(), Qe = [], Ye = [], _t(null), Ot(null)
        }

        function ft() {
            et = setTimeout(pt, Le), tt = setTimeout(bt, Te), nt = setTimeout(vt, Pe), ot = setTimeout(mt, Re)
        }

        function ht() {
            clearTimeout(et), clearTimeout(tt), clearTimeout(nt), clearTimeout(ot)
        }

        function pt() {
            Qe.length && _t(Qe)
        }

        function bt() {
            yt(Qe), Qe = [], _t(null)
        }

        function vt() {
            Ye.length && (Ot(Tt(Ye, !0, !0)), nt = setTimeout(vt, Ie))
        }

        function mt() {
            clearTimeout(nt), yt(Tt(Ye)), Ye.forEach(function(e) {
                return e[Ae] = !0
            }), Ye = [], Ot(null)
        }

        function gt() {
            yt(Qe.concat(Tt(Ye)))
        }

        function yt(e) {
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
                    return Object(R.f)(t, function(e, t) {
                        return n.push(e + "_" + t.join(","))
                    }), n.join(";")
                }(e),
                long_view: 1
            })
        }

        function _t(e) {
            jt(qe, e)
        }

        function Ot(e) {
            jt(Ge, e)
        }

        function jt(e, t) {
            var n = V.a.get(e) || {};
            t ? n[Xe] = t : delete n[Xe], V.a.set(e, n)
        }

        function Et() {
            var e = Et,
                t = [],
                n = V.a.get(qe) || {},
                o = V.a.get(Ge) || {};
            return e.iterator || (e.iterator = function(e) {
                return function(n) {
                    kt(n) && (t = t.concat(e[n]))
                }
            }), Object.keys(n).forEach(e.iterator(n)), Object.keys(o).forEach(e.iterator(o)), t
        }

        function St() {
            var e = St,
                t = V.a.get(qe) || {},
                n = V.a.get(Ge) || {};
            e.iterator || (e.iterator = function(e) {
                return function(t) {
                    kt(t) && delete e[t]
                }
            }), Object.keys(t).forEach(e.iterator(t)), Object.keys(n).forEach(e.iterator(n)), V.a.set(qe, t), V.a.set(Ge, n)
        }

        function kt(e) {
            var t = Number(e);
            return t !== Xe && Date.now() - t >= xe
        }

        function Lt(e, t, n, o) {
            if (!e) return !1;
            e[De] || (e[De] = !0, e[Fe] = e.offsetHeight, e[He] = n + e.getBoundingClientRect().top, e[Ve] = e[He] + e[Fe]);
            var i = o - Je - Ze,
                r = n + Je,
                a = n + o - Ze,
                s = e[Fe],
                d = e[He],
                c = e[Ve];
            return (c > r && d < a ? Math.min(a, c) - Math.max(r, d) : 0) >= Math.min(i * t, s * t)
        }

        function Tt(e, t, n) {
            return e.map(function(e) {
                return Pt(e, t, n)
            })
        }

        function Pt(e, t, n) {
            if (Rt(e)) return [];
            var o = Math.min(ke, Date.now() - e[Be]);
            if (e[Ce] === Ue && o < Ee || e[Ce] === We && o < Se) return [];
            n || (e[Me] = !0);
            var i, r = function(e) {
                    var t = e[Ne];
                    if ("im" === t) {
                        var n = Object(S.c)(e, "data-post-id"),
                            o = Object(S.c)(e, "data-copy"),
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
                s = cur.feed_session_id || "na",
                d = [];
            for (var c in r)
                if ("index" !== c && "module" !== c && "q" !== c) {
                    var w = c.split("_"),
                        u = w[0],
                        l = w[1];
                    "ads" === u && (l = w[3]), /^post\d+$/.test(u) && (u = w[1], l = w[2]);
                    var f = void 0;
                    t || (it[f = u + "_" + l] || (it[f] = 0), it[f]++), d.push("ad" === u ? {
                        ownerId: "ad",
                        postId: l,
                        module: a,
                        viewIndex: it[f]
                    } : "ads" === u ? {
                        ownerId: "ads",
                        postId: l,
                        module: a,
                        index: r.index,
                        duration: o,
                        sessionId: s,
                        viewIndex: it[f]
                    } : {
                        ownerId: u,
                        postId: (1 === r[c] ? "" : "-") + l,
                        module: a,
                        index: r.index,
                        duration: o,
                        sessionId: s,
                        q: r.q || null,
                        viewIndex: it[f]
                    })
                }
            return d
        }

        function Rt(e) {
            return "page_view" === ze && e[Me] || !document.body.contains(e)
        }

        function It(e, t) {
            var n = e.indexOf(t);
            n >= 0 && e.splice(n, 1)
        }
        var xt = n("QGEU"),
            Ct = n("eNQP"),
            At = n("o7bv"),
            Nt = n("wetz"),
            Bt = n("i6oL"),
            Mt = n("m0N1");
        var Dt = n("W0P9");
        var Ft = function() {
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
                return V.a.get("push_notifier_endpoint" + vk.id) || !1
            }, e.prototype.saveEndpoint = function(e) {
                V.a.set("push_notifier_endpoint" + vk.id, e || !1)
            }, e.prototype.action = function(e, t) {
                return this.sw.action(e, t)
            }, e.prototype._needupdate = function(e) {
                var t = Date.now(),
                    n = this.loadEndpoint(),
                    o = V.a.get("push_notifier_subscribed_ts" + vk.id),
                    i = !1;
                return (n !== e.endpoint || !o || t - o > 6e4) && (V.a.set("push_notifier_subscribed_ts" + vk.id, t), i = !0), i
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
                }).catch(Dt.a)
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
        Ft.SERVER_KEY = "BPrntRk2W1_ISFwlgY-vz9tQDg9i1oSQ3-N8xyjdbNAbIOdZIGFdh5FlO7zn730UwU9Sayoec-Fpqq4JZFTyv60", Ft.SERVER_URL = "push_notifier", Ft.PUSH_NOTIFIER_PERMISSION_GRANTED = "granted", Ft.PUSH_NOTIFIER_PERMISSION_DEFAULT = "default", Ft.PUSH_NOTIFIER_PERMISSION_DENIED = "denied", Ft.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS = "BLOCKED_BY_BROWSER_SETTINGS", Ft.SUBSCRIBE_ERROR_NETWORK = "SUBSCRIBE_ERROR_NETWORK";
        var Ht = Ft;
        var Vt = function(e) {
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
                        Ht.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === e ? (window.show(window.curBox().bodyNode), n.showPopupAllowNotification()) : Object(ue.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                    })
                }, t.prototype.showPopupAllowNotification = function() {
                    var e = Object(ue.b)(Ht.SERVER_URL, {
                        act: "popup_allow_notification"
                    }, {
                        params: {
                            hideButtons: !0
                        },
                        containerClass: "PushNotifierPopup__popup-box_type--allow-notification",
                        onFail: function() {
                            e ? e.hide() : Object(ue.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                        }
                    })
                }, t.prototype._removeLongPollListener = function() {
                    this.lp && this.lp.offData(this.handlerMessagesLP), this.lp = null
                }, t.prototype._addLongPollListener = function() {
                    !this.lp && window.Notifier && (this.lp = Notifier.getLpInstance(), this.lp && this.lp.onData(this.handlerMessagesLP))
                }, t.prototype.setState = function(e, t) {
                    return new Promise(function(n, o) {
                        ajax.post(Ht.SERVER_URL, {
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
            }(Ht),
            Ut = "sw";

        function Wt(e) {
            return {
                type: Ut,
                data: e
            }
        }

        function qt(e) {
            return ("" === e.origin || e.origin.match(/^https:\/\/([a-zA-Z0-9\-\.]+\.)?vk\.com$/)) && e.data && e.data.data && e.data.type === Ut
        }
        var Gt = function() {
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
        var zt = function() {
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
                                qt(e) ? n(e.data.data) : o(new Error("ServiceWorker message is incorrect"))
                            }, t.registration.active.postMessage(Wt(e), [i.port2])
                        })
                    })
                }, e.prototype._onmessage = function(e) {
                    var t = this;
                    if (qt(e)) {
                        var n = e.data.data;
                        if (n.actions && Array.isArray(n.actions)) {
                            var o = [];
                            n.actions.forEach(function(n) {
                                var i = Gt(n, 2),
                                    r = i[0],
                                    a = i[1],
                                    s = "action_" + r;
                                o.push(Promise.resolve(t[s] ? t[s](a, e) : void 0))
                            }), Promise.all(o).then(function(t) {
                                var n = {};
                                t.forEach(function(e, t) {
                                    void 0 !== e && (n[t] = e)
                                }), Object.keys(n).length && e.ports[0].postMessage(Wt({
                                    answers: n
                                }))
                            })
                        }
                    }
                }, e
            }(),
            Kt = window.isMVK ? "mvk" : "web",
            Yt = {
                start: function(e, t) {
                    var n = this;
                    if (t.stopPropagation(), t.preventDefault(), window.statlogsValueEvent("first_april_special_event", "click", Kt), !this.timeoutHandle) {
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
                            t.stop(), t.destroy(), e.frame.style.display = "none", e.timeoutHandle = null, window.statlogsValueEvent("first_april_special_event", "showed", Kt)
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
            Qt = n("B3ia");
        v.polyfill(), window.Map = s, window.Set = d;
        var Xt = window.vk;

        function Jt() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, Xt.width = 960, Xt.started = Object(R.L)(), Xt.counts = {}, j.a.android && (Object(_.d)("remixscreen_width", window.screen.width, 365), Object(_.d)("remixscreen_height", window.screen.height, 365), Object(_.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(_.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(_.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(X.e)(), Object(W.b)(), Object(P.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(P.h)(vkCache[e].handle.elem)
            }), Object(P.b)(window, "DOMContentLoaded load", function() {
                Xt.loaded || (Xt.loaded = !0, Object(G.y)()), Object(we.c)()
            }), Object(P.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(P.b)(document, "keydown", Nt.a)
        }
        var Zt = 0;

        function $t() {
            if (window.headNode = Object(S.J)("head"), window.icoNode = Object(S.J)("link", headNode), window.bodyNode = Object(S.J)("body"), window.htmlNode = Object(S.J)("html"), window.utilsNode = Object(S.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(P.b)(bodyNode, "resize", we.j.pbind(!1)), utilsNode) {
                j.a.mozilla ? Object(S.a)(bodyNode, "firefox") : j.a.mobile && Object(S.a)(bodyNode, "mobfixed"), Object(ye.f)(), Object(W.a)();
                var e = Object(S.F)("layer_bg"),
                    t = e.nextSibling,
                    n = Object(S.F)("box_layer_bg"),
                    o = n.nextSibling;
                window.layerBG = e, window.boxLayerBG = n, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = o, window.boxLayer = o.firstChild, window.boxLoader = o.firstChild.firstChild, window._stlSide = Object(S.F)("stl_side"), window._stlLeft = Object(S.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, j.a.mobile || Object(Bt.a)(), Object(P.b)(o, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(o), window.layers = function(e, t, n, o) {
                    return window.layerQueue = H, Object(R.i)(F, {
                        show: F._show.pbind(e, t),
                        boxshow: F._show.pbind(n, o),
                        wrapshow: F._show.pbind(e),
                        hide: F._hide.pbind(e, t),
                        boxhide: F._hide.pbind(n, o),
                        wraphide: F._hide.pbind(e)
                    }), F
                }(e, t, n, o), hab.init(), window._retinaInit ? window._retinaInit() : Zt = 1, window.PushNotifier = Vt, window.sw = new zt, window.sw.register().then(function() {
                    window.pushNotifier = new Vt(window.sw, zt)
                })
            }
        }

        function en() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: function() {
                        return cur.module
                    },
                    getOID: function() {
                        return cur.oid
                    }
                })), Object(Bt.b)();
                var e = Object(S.F)("side_bar");
                window.pageNode = Object(S.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(S.O)(e, "position"), window._tbLink = Object(S.F)("top_back_link"), j.a.chrome || j.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = j.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(R.L)() - Xt.started, 10),
                    n = Object(R.r)((Xt.contlen || 1) / t * 1e3);
                j.a.mozilla && j.a.version >= 4 ? n /= 2.5 : j.a.mozilla ? n *= 1.5 : j.a.msie && j.a.version >= 7 ? n /= 1.5 : j.a.msie && (n *= 2.5);
                var o = Object(R.r)(150 * Math.max(2e6 / n, 1));
                if (W.d.highlimit = 6 * o, W.d.lowlimit = Math.min(o, 600), Object(we.j)(), setTimeout(we.j.pbind(!1), 0), Object(xt.c)(), window.addEventListener("scroll", we.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !Xt.id && V.a.checkVersion() && V.a.get("last_reloaded")) try {
                    var i = {};
                    Object(R.f)(["sound_notify_off", "im_ui_notify_off"], function(e, t) {
                        var n = V.a.get(t);
                        null !== n && (i[t] = n)
                    }), window.localStorage.clear(), Object(R.f)(i, function(e, t) {
                        return V.a.set(e, t)
                    })
                } catch (e) {}
            }
        }
        var tn = function() {
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

        function nn(e) {
            Xt.loaded ? e() : Object(P.b)(window, "load", e)
        }

        function on() {
            window.showWriteMessageBox = ge.g, window.giftsBox = ge.a, window.moneyTransferBox = ge.d, window.reportAd = ge.e, window.mobilePromo = ge.c, window.showAudioClaimWarning = ge.f, window.menuSettings = ge.b, window.sureDeleteAll = ge.h, window.TopNotifier = Object(D.m)(), window.showPhoto = D.y, window.showManyPhoto = D.x, window.showAlbums = D.v, window.showAlbum = D.u, window.showPhotoTags = D.z, window.isPhotoeditor3Available = D.p, window.AudioMessagePlayer = D.a, window.showVideoTags = D.B, window.videoCallback = D.D, window.showWiki = D.C, window.showApp = D.w, window.showPodcast = D.A, window.podcastStartFrom = D.s, window.articlePrepare = D.b, window.isArticleLayerOpen = D.o, window.isArticleEditorAvailable = D.n, window.openArticleEditor = D.r, window.mentionOver = ve, window.mentionClick = D.q, window.mobileOnlineTip = he, window.pageVerifiedTip = pe, window.audioShowActionTooltip = be, window.shareAudioPlaylist = D.t, window.getAudioPlayer = D.k, window.deleteAudioOnClaim = D.j, window.initTopAudioPlayer = D.l, window.bookmark = D.c, window.bookmarkPost = D.i, window.bookmarkArticle = D.d, window.bookmarkLink = D.f, window.bookmarkPodcast = D.h, window.bookmarkNarrative = D.g, window.bookmarkEvent = D.e, window.bookmarkTooltip = me, window.showStory = B.c, window.showNarrative = B.b, window.storiesPreloadStatic = B.d, window.sendMask = B.a
        }
        window.constants = {
            Groups: ae
        }, window.partConfigEnabled = de.a, Object(S.X)(), window.ge = S.F, window.geByTag = S.I, window.geByTag1 = S.J, window.geByClass = S.G, window.geByClass1 = S.H, window.gpeByClass = S.T, window.domQuery = S.B, window.domQuery1 = S.C, window.domClosest = S.n, window.ce = S.e, window.cf = S.f, window.re = S.fb, window.se = S.mb, window.sech = S.nb, window.rs = S.lb, window.psr = S.eb, window.domReplaceEl = S.D, window.domEL = S.t, window.domNS = S.y, window.domPS = S.A, window.domFC = S.u, window.domLC = S.x, window.domPN = S.z, window.domChildren = S.m, window.domInsertBefore = S.w, window.domInsertAfter = S.v, window.domByClass = S.j, window.domData = S.s, window.domChildIndex = S.l, window.domCA = S.k, window.domClosestSibling = S.r, window.matchesSelector = S.db, window.isHover = S.Z, window.isAncestor = S.Y, window.getScroll = S.M, window.domClosestPositioned = S.q, window.domClosestOverflowHidden = S.p, window.show = S.tb, window.hide = S.W, window.isVisible = S.ab, window.clientHeight = S.h, window.getClientRectOffsetY = S.K, window.toggle = S.ub, window.boundingRectEnabled = S.d, window.getXYRect = S.R, window.getXY = S.Q, window.isWindow = S.bb, window.getSize = S.N, window.hasClass = S.V, window.addClass = S.a, window.addClassDelayed = S.b, window.removeClass = S.hb, window.removeClassDelayed = S.ib, window.toggleClass = S.vb, window.toggleClassDelayed = S.wb, window.replaceClass = S.kb, window.getStyle = S.O, window.setStyle = S.qb, window.setStyleDelayed = S.rb, window.setPseudoStyle = S.pb, window.data = S.i, window.attr = S.c, window.removeAttr = S.gb, window.removeData = S.jb, window.cleanElems = S.g, window.setTitle = S.sb, window.getZoom = S.S, window.val = S.yb, window.elfocus = S.E, window.traverseParent = S.xb, window.getH = S.L, window.getW = S.P, window.domClosestByTag = S.o, window.setDocumentTitle = S.ob, window.lockDocumentTitle = S.cb, window.KEY = P.a, window.addEvent = P.b, window.removeEvent = P.h, window.triggerEvent = P.j, window.cancelEvent = P.c, window.stopEvent = P.i, window.normEvent = P.g, window.checkEvent = P.d, window.checkKeyboardEvent = P.e, window.checkOver = P.f, Object(R.q)(), window.isRetina = R.y, window.extractUrls = R.j, window.serializeForm = R.F, window.addTemplates = R.a, window.getTemplate = R.n, window.rand = R.D, window.irand = R.s, window.isUndefined = R.A, window.isFunction = R.v, window.isArray = R.t, window.isString = R.z, window.isObject = R.x, window.isEmpty = R.u, window.vkNow = R.L, window.vkImage = R.J, window.trim = R.H, window.stripHTML = R.G, window.escapeRE = R.h, window.intval = R.r, window.floatval = R.k, window.positive = R.C, window.isNumeric = R.w, window.winToUtf = R.M, window.replaceEntities = R.E, window.clean = R.c, window.unclean = R.I, window.each = R.f, window.indexOf = R.p, window.inArray = R.o, window.clone = R.d, window.arrayKeyDiff = R.b, window.extend = R.i, window.vkLocal = R.K, window.lTimeout = R.B, window.getCaretCharacterOffsetWithin = R.m, window.formatCount = R.l, window.encodeHtml = R.g, window.decodeHtml = R.e, Object(O.c)(), window.ajx2q = O.b, window.q2ajx = O.f, window.requestBox = O.g, window.activateMobileBox = O.a, window.validateMobileBox = O.h, window.validatePassBox = O.i, window.photoCaptchaBox = O.e, Object(_.c)(), window.getCookie = _.a, window.setCookie = _.d, window.hideCookiesPolicy = _.b, Object(ce.c)(), window.debugLog = ce.b, window.debugEl = ce.a, window.isToday = se.c, window.isYesterday = se.e, window.isTomorrow = se.d, window.isSameDate = se.b, window.leadingZero = se.f, window.formatTime = se.a, window.parseLatin = C.o, window.parseCyr = C.m, window.parseLatKeys = C.n, window.langNumeric = C.i, window.langSex = C.j, window.langStr = C.k, window.addLangKeys = C.a, window.getLang = C.d, window.langDate = C.h, window.getShortDate = C.e, window.getShortDateOrTime = C.f, window.langWordNumeric = C.l, window.getDateText = C.c, window.getBigDateNew = C.b, window.getSmDate = C.g, window.scrollToY = A.g, window.scrollToTop = A.f, window.scrollGetX = A.d, window.scrollGetY = A.e, window.disableBodyScroll = A.a, window.enableBodyScroll = A.b, window.Chat = ye.a, window.__qlTimer = null, window.__qlClear = ye.b, window.onLoginDone = ye.m, window.onLoginFailed = ye.n, window.onLoginCaptcha = ye.l, window.onLoginReCaptcha = ye.o, window.storePasswordCredential = ye.p, window.cssAnim = ye.c, window.imagesLoader = ye.e, window.nodeUpdated = ye.k, window.hideNewsAnnounce = ye.d, window.leftAdBlockClose = ye.h, window.leftBlockToggleFriend = ye.j, window.leftBlockFriendTooltip = ye.i, window.placeholderSetup = At.c, window.placeholderInit = At.b, window.isInputActive = At.a, window.showTooltip = fe.c, window.showTitle = fe.b, window.showHint = fe.a, window.topMsg = y.d, window.showMsg = y.b, window.topError = y.c, window.showGlobalPrg = y.a, window.checkTextLength = _e.b, window.getSelectionText = _e.d, window.goAway = _e.e, window.debounce = _e.c, window.hashCode = _e.h, window.isFullScreen = _e.i, window.parallel = _e.l, window.parseJSON = _e.m, window.shuffle = _e.n, window.throttle = _e.o, window.toggleOnline = _e.r, window.updateMoney = _e.t, window.onlinePlatformClass = _e.k, window.Fx = T.a, window.fx = T.a, window.animate = T.b, window.cubicBezier = T.d, window.fadeTo = T.g, window.genFx = T.i, window.getRGB = T.k, window.getColor = T.j, window.slideDown = T.l, window.slideUp = T.n, window.slideToggle = T.m, window.fadeIn = T.e, window.fadeOut = T.f, window.fadeToggle = T.h, window.animateCount = T.c, window.updateAriaElements = xt.c, window.updateAriaCheckboxes = xt.b, window.hasAccessibilityMode = xt.a, window.cancelStackFilter = M.a, window.cancelStackPush = M.c, window.cancelStackPop = M.b, Object(Qt.a)(), window.ElementTooltip = E.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = k, 1 === Xt.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== Xt.al || history.pushState || (Xt.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), Xt.version = !1), Object(W.c)(), window.stManager = W.d, Object(j.c)(), window.browser = j.a, window.mobPlatforms = j.d, window.browserFeatures = j.b, Object(L.a)(), window.toggleFlash = L.c, window.renderFlash = L.b, Jt(), window.updateHeaderStyles = X.i, window.updateNarrow = we.m, window.checkPageBlocks = we.c, window.redraw = we.l, window.onBodyResize = we.j, window.onBodyScroll = we.k, window.leftBlockOver = we.i, window.leftBlockOut = we.h, window.leftBlockHide = we.g, window.onDocumentClick = Nt.c, window.onEnter = Nt.d, window.onCtrlEnter = Nt.b, window.logLeftMenuClicks = q.a, window.autosizeSetup = we.b, window.getProgressBarEl = we.e, window.getProgressHtml = we.f, Object(Mt.b)(), re(), window.onDomReady = function(e) {
            return e()
        }, window.currentModule = function() {
            return cur.currentModule ? cur.currentModule() : cur.module
        }, window.hab = x(), window.ls = V.a, window.shortCurrency = U, window.statlogsValueEvent = q.d, window.saveSearchAttemptStats = q.c, window.removeSearchPositionTracker = q.b, window.callHub = tn, window.CallHub = tn, window.gSearch = new K, window.zNav = X.l, window.handlePageView = X.d, window.handlePageParams = X.c, window.handlePageCount = X.b, window.updateOtherCounters = X.k, window.processDestroy = X.f, window.globalHistoryDestroy = X.a, window.showBackLink = X.h, window.nav = Q.a, nav.init(), Xt.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === t[1] && 12 === Xt.time[1] ? Xt.time[1] = 0 : 12 === t[1] && 1 === Xt.time[1] ? t[1] = 0 : (t[1] > Xt.time[1] + 1 || Xt.time[1] > t[1] + 1) && (t[1] = Xt.time[1] = t[2] = Xt.time[2] = 0), t[1] > Xt.time[1] && 1 === t[2] ? 31 === Xt.time[2] || (4 === Xt.time[1] || 6 === Xt.time[1] || 9 === Xt.time[1] || 11 === Xt.time[1]) && 30 === Xt.time[2] || 2 === Xt.time[1] && (29 === Xt.time[2] || 28 === Xt.time[2] && Xt.time[0] % 4) ? Xt.time[2] = 0 : Xt.time[2] = t[2] = 0 : Xt.time[1] > t[1] && 1 === Xt.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && Xt.time[0] % 4) ? t[2] = 0 : t[2] = Xt.time[2] = 0), (t[2] > Xt.time[2] + 1 || Xt.time[2] > t[2] + 1) && (t[2] = Xt.time[2] = 0);
            var n = 60 * (60 * (24 * (t[2] - Xt.time[2]) + (t[3] - Xt.time[3])) + (t[4] - Xt.time[4]));
            n < -55800 ? n += 86400 : n > 37800 && (n -= 86400);
            var o = 0,
                i = Math.abs(n);
            Object(R.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], function(e, t) {
                var r = Math.round(3600 * (t - 3)),
                    a = Math.abs(n - r);
                a < i && (i = a, o = r)
            }), Xt.dt = o, Object(_.a)("remixdt") !== Xt.dt && Object(_.d)("remixdt", Xt.dt, 365);
            var r = Object(R.r)(Object(_.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!j.a.iphone || Object(_.a)("remixme")) ? 1 & r || (Object(_.d)("remixrt", 1 | r, 365), window._retinaInit = function() {
                W.d.add(["retina.css"]), Object(S.a)(document.body, "is_2x")
            }, Zt && window._retinaInit()) : 1 & r && Object(_.d)("remixrt", 1 ^ r, 365)
        }, 0), window.boxQueue = Object(le.c)(), window.__bq = boxQueue, window.curBox = le.b, Object(le.d)(), window.boxRefreshCoords = le.a, window.MessageBox = ue.a, window.showBox = ue.b, window.showTabbedBox = ue.f, window.showFastBox = ue.d, window.showCaptchaBox = ue.c, window.showReCaptchaBox = ue.e, window.showDoneBox = le.e, window.TopMenu = we.a, window.TopSearch = Y.a, window.handleScroll = _e.f, window.loadScript = z.a, window.SpecialEvent = Yt, Object(G.j)(), window.notaBene = G.q, window.updSideTopLink = G.y, window.createButton = G.d, window.actionsMenuItemLocked = G.a, window.lockActionsMenuItem = G.n, window.unlockActionsMenuItem = G.v, window.linkLocked = G.m, window.lockLink = G.p, window.unlockLink = G.x, window.lockButton = G.o, window.unlockButton = G.w, window.buttonLocked = G.b, window.isButtonLocked = G.k, window.disableButton = G.f, window.sbWidth = G.t, window.isChecked = G.l, window.checkbox = G.c, window.disable = G.e, window.radioval = G.s, window.radiobtn = G.r, window.showProgress = G.u, window.hideProgress = G.i, window.disableEl = G.g, window.enableEl = G.h, Object(N.d)(), window.VideoConstants = N.a, window.showVideo = N.j, window.showInlineVideo = N.i, window.loadInlineVideo = N.e, window.revertLastInlineVideo = N.h, window.destroyInlineVideoPlayer = N.c, window.pauseLastInlineVideo = N.f, window.playLastInlineVideo = N.g, window.checkMp4 = N.b, window.performance && window.performance.memory && Object(R.D)(0, 100) < 5 && Object(Ct.a)(), ze ? (Object(P.b)(window, "blur", wt), Object(P.b)(window, "focus", ut), onDomReady(function() {
            return setTimeout(rt, 500)
        }), window.LongView = {
            register: st,
            onScroll: Object(_e.o)(dt, 50),
            onBeforePageChange: lt,
            clearElemsCache: at,
            _debug: function() {
                return {
                    started: Ye,
                    tracking: Ke,
                    viewedData: Qe,
                    viewIndexes: it,
                    blindTop: Je,
                    blindBottom: Ze
                }
            }
        }) : window.LongView = {
            register: function() {},
            onScroll: function() {},
            onBeforePageChange: function() {},
            clearElemsCache: function() {}
        }, Object(ye.g)(), on(), window.onLoaded = nn, window.domStarted = $t, window.domReady = en, Object(ce.b)("common module enabled"), W.d.done(jsc("web/common_web.js"))
    }
});