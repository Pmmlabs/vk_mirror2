! function(e) {
    function t(t) {
        for (var o, a, c = t[0], d = t[1], s = t[2], l = 0, u = []; l < c.length; l++) a = c[l], i[a] && u.push(i[a][0]), i[a] = 0;
        for (o in d) Object.prototype.hasOwnProperty.call(d, o) && (e[o] = d[o]);
        for (w && w(t); u.length;) u.shift()();
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
    var w = d;
    r.push([71, "common"]), n()
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
    71: function(e, t, n) {
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
        var s, w, l, u, f, b, h, p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        s = window, w = s.HTMLCanvasElement && s.HTMLCanvasElement.prototype, l = s.Blob && function() {
            try {
                return Boolean(new Blob)
            } catch (e) {
                return !1
            }
        }(), u = l && s.Uint8Array && function() {
            try {
                return 100 === new Blob([new Uint8Array(100)]).size
            } catch (e) {
                return !1
            }
        }(), f = s.BlobBuilder || s.WebKitBlobBuilder || s.MozBlobBuilder || s.MSBlobBuilder, b = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, h = (l || f) && s.atob && s.ArrayBuffer && s.Uint8Array && function(e) {
            var t, n, o, i, r, a, c, d, s;
            if (!(t = e.match(b))) throw new Error("invalid data URI");
            for (n = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), o = !!t[4], i = e.slice(t[0].length), r = o ? atob(i) : decodeURIComponent(i), a = new ArrayBuffer(r.length), c = new Uint8Array(a), d = 0; d < r.length; d += 1) c[d] = r.charCodeAt(d);
            return l ? new Blob([u ? c : a], {
                type: n
            }) : ((s = new f).append(a), s.getBlob(n))
        }, s.HTMLCanvasElement && !w.toBlob && (w.mozGetAsFile ? w.toBlob = function(e, t, n) {
            e(n && w.toDataURL && h ? h(this.toDataURL(t, n)) : this.mozGetAsFile("blob", t))
        } : w.toDataURL && h && (w.toBlob = function(e, t, n) {
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
        var g = n("ryw6"),
            _ = n("kMSP"),
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
            E = n("t7n3"),
            A = function() {
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

        function S() {
            return new function(e) {
                var t = function(e) {
                        var t = e.split("#"),
                            n = A(t, 2),
                            o = n[0],
                            i = n[1],
                            r = o.split("?"),
                            a = A(r, 2),
                            c = a[0],
                            d = a[1];
                        return c + (d ? "?" + Object(O.b)(Object(O.f)(d)) : "") + (i ? "#" + i : "")
                    },
                    n = Object(E.i)({
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
                        n = Object(E.i)(n, e)
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
                    3 === vk.al && history.state && Object(E.x)(history.state) && (t.scrollTop = Object(E.r)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
                }
            })
        }
        var P = n("4+be"),
            B = n("lXE5"),
            F = n("Ia1d"),
            I = n("XuKo"),
            N = n("ErRf"),
            M = n("/PiP"),
            H = {
                sh: function(e, t) {
                    Object(k.tb)(e), Object(E.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(k.W)(e), Object(E.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, n, o) {
                    var i = "layers" + (boxQueue.count() + 1);
                    Object(N.c)(i, function() {}), Object(k.qb)(e, {
                        opacity: n || "",
                        backgroundColor: o || ""
                    }), H.visible || (Object(x.c)(), Object(B.a)()), H.visible || Object(F.f)(), H.visible = !0, Object(k.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(k.hb)(t, "box_layer_hidden") : Object(k.tb)(t), H.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    H.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(N.a)(e), t && t.visibilityHide ? Object(k.a)(t, "box_layer_hidden") : Object(k.W)(t), Object(k.ab)(layerWrap) || cur._inLayer || Object(k.ab)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(k.ab)(window.mvLayerWrap)) || Object(k.ab)(window.wkLayerWrap) || (H.visible = !1, Object(k.hb)(bodyNode, "layers_shown"), Object(x.c)(!0), Object(B.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), H.visible || Object(F.g)()
                }
            },
            D = {
                push: function(e) {
                    var t = void 0,
                        n = !!D.count() && D._layers[D._layers.length - 1];
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
                        VideoPlaylist.getCurListId() && (i = Object(E.i)(i, {
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
                    return n && t[0] == n[0] && t[1] == n[1] && t[2] == n[2] || D._layers.push(t), D.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = D._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    D._bl = !0, window.WkView && H.fullhide == WkView.hide ? (Object(k.W)(wkLayerWrap), clearTimeout(wkcur.showT)) : H.fullhide && H.fullhide(!0, !0), setTimeout(D.unblock, 5)
                },
                unblock: function() {
                    D._bl = !1
                },
                pop: function() {
                    if (D.count() && !D._bl) {
                        var e = D._layers.pop();
                        if (D.skipVideo && (D.skipVideo = !1, "video" == e[0])) return D._layers.push(e), void(D.skipVideo = !1);
                        "photo" === e[0] ? (Object(E.i)(e[3], {
                            fromQueue: !0
                        }), Object(M.x)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(E.i)(e[3], {
                            fromQueue: !0
                        }), Object(F.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(M.B)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(I.c)(e[1]) : "podcast" === e[0] && Object(M.z)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, n, o) {
                    for (var i = D._layers, r = i.length; r > 0; --r)
                        if (i[r - 1][0] == e && i[r - 1][1] == t || i[r - 1][0] == n && i[r - 1][1] == o) return D._layers = i.slice(0, r), D.pop(), !0;
                    return !1
                },
                count: function() {
                    return D._layers.length
                },
                clear: function() {
                    D._layers = []
                },
                _layers: []
            };
        var R = n("0DAA");

        function V() {
            var e = {};
            Object(E.f)(Object(k.G)("_short_currency"), function() {
                var t = Object(k.s)(this, "short") || "";
                if (!t) return !0;
                var n = this.innerHTML,
                    o = Object(E.M)(n).length,
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
        var q = n("0gG3"),
            W = n("XzvV"),
            z = n("v+DW"),
            U = n("lkNA");
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
                            e.startHintsText = Object(E.H)(t), e.hintsHub.done()
                        }
                    }))
                }, e.prototype.show = function(e) {
                    var t = window.placeholderSetup;
                    if (Object(k.F)("quick_search") && !this.on) return this.on = 1, Object(k.tb)(this.sCont), t("search_input"), Object(k.F)("search_input").setAttribute("autocomplete", "off"), Object(k.a)(Object(k.F)("qsearch_link"), "active"), this.prev_content = Object(k.F)("content"), this.qsearch_cont || (this.qsearch_cont = Object(k.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(L.c)(e) : void 0
                }, e.prototype.go = function(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(E.H)(Object(k.F)("search_input").value) + "&name=1";
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
            K = n("Bszp"),
            Q = n("MSYF"),
            X = n("kHqu"),
            Y = function() {
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
            J = "remixjsp";

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
                var t = Y(e, 2),
                    n = t[0],
                    i = t[1];
                return r.events.push([i, n, cur.module, o, window.vk.rv])
            }), Object(_.d)(J, JSON.stringify(r), .01)
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
            ce = n("8+we"),
            de = n("98sY"),
            se = n("El3O"),
            we = n("EasH"),
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

        function be(e, t) {
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

        function he(e, t, n) {
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
                Object(k.T)("_im_mess_stack", e) ? (c.appendParentCls = "_im_mess_stack", c.shift = [7, 10, 0], c.noZIndex = !0) : Object(k.T)("top_notify_wrap", e) ? c.appendParentCls = "top_notify_wrap" : Object(k.T)("_ape_audio_item", e) && (c.appendParentCls = "_ape_audio_item"), Object(ue.c)(e, c)
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

        function ve(e) {
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
        var me = n("Ieup"),
            ge = function() {
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
        var _e = {
            maxHeight: 300,
            tabs: {},
            counters: {},
            showFriends: function() {
                curFastChat.clistBox.visible ? curFastChat.clistBox.options.fixed ? FastChat.clistHide() : curFastChat.clistBox.show() : (FastChat.clistShow(), _e.cont.tt && _e.cont.tt.destroy && _e.cont.tt.destroy())
            },
            showTT: function() {
                if (!Object(k.V)(_e.wrap, "chat_active") && !Object(k.V)(_e.wrap, "chat_expand")) {
                    var e = y.a.mac ? "Cmd" : "Ctrl";
                    Object(ue.c)(_e.cont, {
                        text: Object(P.d)("head_fr_online_tip") + " (" + e + "+?)",
                        shift: [-2, 4, 0],
                        showdt: 0,
                        black: 1
                    })
                }
            },
            init: function() {
                _e.wrap = Object(k.e)("div", {
                    id: "chat_onl_wrap",
                    className: "chat_onl_wrap",
                    innerHTML: '\n<div class="chat_tt_wrap"></div>\n<div class="chat_onl_inner">\n  <div class="chat_cont_scrolling"><div class="chat_onl_height"></div></div>\n  <div class="chat_cont_sh_top"></div>\n  <div class="chat_cont_sh_bottom"></div>\n  <a class="chat_tab_wrap" id="chat_tab_wrap" onclick="Chat.showFriends()" onmouseover="Chat.showTT();">\n    <div class="chat_onl_cont">\n      <div class="chat_onl" id="chat_onl"></div>\n    </div>\n  </a>\n</div>'
                }), utilsNode.appendChild(_e.wrap), _e.scrollNode = Object(k.H)("chat_cont_scrolling", _e.wrap), _e.ttNode = Object(k.H)("chat_tt_wrap", _e.wrap), _e.itemsCont = _e.scrollNode.firstChild, _e.onl = Object(k.F)("chat_onl"), _e.cont = _e.onl.parentNode.parentNode, Object(k.W)(_e.wrap), _e.inited = !0, stManager._addCss(".layers_shown .chat_onl_wrap {margin-right: " + Object(z.t)() + "px;}")
            }
        };

        function Oe(e, t, n, o) {
            var i = Object(E.r)(y.a.version);
            if (e && (y.a.chrome && i > 14 || y.a.mozilla && i > 13 || y.a.opera && i > 2)) {
                var r = "all " + n.duration + "ms " + (n.func || "ease-out");
                e.style.WebkitTransition = r, e.style.MozTransition = r, e.style.OTransition = r, e.style.transition = r;
                var a = function t() {
                    return y.a.opera && Object(E.r)(y.a.version) <= 12 ? e.removeEventListener("oTransitionEnd", t) : Object(L.h)(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", t), e.style.WebkitTransition = "", e.style.MozTransition = "", e.style.OTransition = "", e.style.transition = "", o && o(), !1
                };
                o && (y.a.opera && Object(E.r)(y.a.version) <= 12 ? e.addEventListener("oTransitionEnd", a) : Object(L.b)(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", a)), setTimeout(k.qb.pbind(e, t), 0)
            } else Object(C.b)(e, t, Object(E.i)(n, {
                onComplete: o
            }))
        }

        function ye(e) {
            return cur.fifaConfettiEnabled && window.Fifa2018 ? /\w+=["']+[^"']*([Гг][Оо]+[Лл]|go+a+l).*["']+/gi.test(e) ? e : (e = e.replace(/&#33;/g, "!")).replace(/(^|[^a-zа-яА-ЯёЁ0-9])((?:[Гг][Оо]+[Лл]|go+a+l)[\!]*)(?=[^a-zа-яА-ЯёЁ0-9]+?|$)([\!])?/gi, function(e) {
                return ((arguments.length <= 1 ? void 0 : arguments[1]) || "") + '<span class="fifa_confettiLink" onclick="Fifa2018.startFlapper(this); return false;">' + (((arguments.length <= 2 ? void 0 : arguments[2]) || "") + ((arguments.length <= 3 ? void 0 : arguments[3]) || "")) + "</span>"
            }) : e
        }

        function je(e, t) {
            var n = [],
                o = 0,
                i = null,
                r = Object(E.i)({
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
                if (Object(E.f)(n, function(e, t) {
                        var o = ge(t, 2),
                            i = o[0],
                            r = o[1];
                        (r.width || r.height || Object(E.L)() - i > 2e4) && n[e] && c.call(r, e, !0)
                    }), clearTimeout(i), o && (i = setTimeout(a.processLoad, 500)), !(o >= r.load_limit)) {
                    var t = Object(k.G)(r.need_load_class, e || bodyNode),
                        s = [],
                        w = void 0,
                        l = void 0;
                    if (e && t.length) {
                        var u = e.offsetHeight;
                        w = e.scrollTop - u * r.top_load, l = e.scrollTop + u * r.bottom_load
                    }
                    for (var f = 0, b = t.length; f < b && o < r.load_limit; f++) {
                        var h = t[f];
                        if ("IMG" === h.tagName) {
                            var p = h.getAttribute("data-src");
                            if (p) {
                                if (e) {
                                    var v = d(h),
                                        m = v + h.parentNode.offsetHeight;
                                    if (v > l) continue;
                                    if (m < w) continue
                                }
                                s.push([h, p])
                            }
                        }
                    }
                    Object(E.f)(s, function(e, t) {
                        var i = ge(t, 2),
                            d = i[0],
                            s = i[1];
                        a.iloader && a.iloader.add(s, c, d), d.src = s, d.removeAttribute("data-src"), Object(k.hb)(d, r.need_load_class), n[s] || (o++, n[s] = [Object(E.L)(), d])
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
                        if (Object(E.f)(r, function(e, n) {
                                d(n.src, n.onLoad, n.that), t.push(n.that)
                            }), r = null, e) {
                            var n = [];
                            Object(E.f)(t, function() {
                                n.push([this, this.src]), this.src = "", Object(k.W)(this)
                            }), setTimeout(function() {
                                Object(E.f)(n, function(e, t) {
                                    var n = ge(t, 2),
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

        function ke(e, t) {
            var n = {
                act: "hide_block",
                block: e,
                hash: t
            };
            ajax.post("al_index.php", n), Object(k.W)("news_announce_" + e)
        }

        function Te(e, t) {
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

        function xe(e, t, n, o, i) {
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
                    }, [n, o]), setTimeout(Ce, 0))
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
                    if (e) return Object(we.d)({
                        title: Object(P.d)("global_error")
                    }, e), !0
                }
            }), Object(L.c)(i)
        }

        function Ce() {
            return Object(ue.c)(Object(k.F)("left_friend_subscribed"), {
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

        function Le() {
            clearTimeout(window.__qlTimer), setTimeout(function() {
                return clearTimeout(window.__qlTimer)
            }, 2e3)
        }

        function Ee(e) {
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

        function Ae(e, t) {
            Le(), Ee(t), nav.reload({
                force: !0,
                from: 6
            })
        }

        function Se(e, t) {
            switch (Le(), e) {
                case -1:
                    location.href = location.href.replace(/^http:/, "https:");
                    break;
                case 4:
                    var n = "/login?m=1" + (t.expire ? "&s=0" : "");
                    Object(E.f)(["email", "ul", "pch"], function(e, o) {
                        t[o] && (n += "&" + o + "=" + t[o])
                    }), location.href = n;
                    break;
                default:
                    location.href = "/login"
            }
        }

        function Pe(e, t) {
            Le(), Object(z.w)(window.__qfBtn), window.qloginBox = Object(we.c)(e, t, window.qloginBox, {
                onSubmit: function(e, t) {
                    Object(k.F)("quick_captcha_sid").value = e, Object(k.F)("quick_captcha_key").value = t, Object(k.F)("quick_login_form").submit()
                },
                onHide: function() {
                    return window.qloginBox = !1
                }
            })
        }

        function Be(e, t) {
            Le(), Object(z.w)(window.__qfBtn), window.qloginBox = Object(we.e)(e, t, window.qloginBox, {
                onSubmit: function(e) {
                    Object(k.F)("quick_recaptcha").value = e, Object(k.F)("quick_login_form").submit()
                },
                onHide: function() {
                    return window.qloginBox = !1
                }
            })
        }

        function Fe(e, t) {
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
        var Ie = n("aong"),
            Ne = .5,
            Me = .25,
            He = 300,
            De = 1e3,
            Re = 3e5,
            Ve = 2500,
            qe = 5e3,
            We = 6e3,
            ze = 2e4,
            Ue = 1e3,
            Ge = 36e4,
            Ke = "_longViewType",
            Qe = "_longViewIdled",
            Xe = "_longViewModule",
            Ye = "_longViewStarted",
            Je = "_longViewProcessed",
            $e = "_longViewCached",
            Ze = "_longViewHeight",
            et = "_longViewTop",
            tt = "_longViewBottom",
            nt = "REGULAR",
            ot = "AUTOPLAY_AD",
            it = "LongView.viewed",
            rt = "LongView.idled",
            at = vk.longViewTestGroup,
            ct = [],
            dt = [],
            st = [],
            wt = Date.now(),
            lt = 0,
            ut = 0,
            ft = !1,
            bt = null,
            ht = null,
            pt = null,
            vt = null,
            mt = {};

        function gt() {
            var e = Ht();
            e.length && (Ft(e), Dt())
        }

        function _t() {
            ct.forEach(function(e) {
                e[$e] = !1
            })
        }

        function Ot(e, t) {
            "im" === t && !e[Ke] && function(e) {
                if (Object(k.V)(e, "im-mess--post")) return !0;
                var t = e && Object(k.u)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(k.V)(e, "no_posts"))
            }(e) && (e[Ke] = function(e) {
                var t = e && Object(k.u)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? ot : nt
            }(e), e[Xe] = t, ct.push(e))
        }

        function yt(e, t) {
            var n = yt;
            ! function(e, t) {
                var n = [];
                ct.forEach(function(o) {
                    zt(o) ? n.push(o) : ! function(e, t, n) {
                        return !e[Ye] && Vt(e, Ne, t, n)
                    }(o, e, t) ? function(e, t, n) {
                        return e[Ye] && !Vt(e, Me, t, n)
                    }(o, e, t) && (o[Qe] ? delete o[Qe] : (Ut(dt, o), st = st.concat(Wt(o))), delete o[Ye]) : (o[Ye] = Date.now(), dt.push(o))
                }), n.forEach(function(e) {
                    Ut(ct, e)
                })
            }(e || Object(B.e)(), t || window.innerHeight), ft ? (clearTimeout(n.timer), n.timer = setTimeout(jt, 150)) : (ft = !0, Lt(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(k.H)("im-page--chat-header"),
                        t = Object(k.H)("im-page--chat-input");
                    lt = e.getBoundingClientRect().top + e.offsetHeight, ut = window.innerHeight - t.getBoundingClientRect().top
                } else lt = Object(k.F)("page_header").offsetHeight, ut = 0
            }())
        }

        function jt() {
            Lt(), Ct(), ft = !1
        }

        function kt() {
            Lt(), Bt()
        }

        function Tt() {
            st = [], dt.forEach(function(e) {
                return e[Ye] = Date.now()
            }), It(null), Nt(null), Ct()
        }

        function xt() {
            Lt(), Bt(), st = [], dt = [], It(null), Nt(null)
        }

        function Ct() {
            bt = setTimeout(Et, Ve), ht = setTimeout(At, qe), pt = setTimeout(St, We), vt = setTimeout(Pt, ze)
        }

        function Lt() {
            clearTimeout(bt), clearTimeout(ht), clearTimeout(pt), clearTimeout(vt)
        }

        function Et() {
            st.length && It(st)
        }

        function At() {
            Ft(st), st = [], It(null)
        }

        function St() {
            dt.length && (Nt(qt(dt, !0, !0)), pt = setTimeout(St, Ue))
        }

        function Pt() {
            clearTimeout(pt), Ft(qt(dt)), dt.forEach(function(e) {
                return e[Qe] = !0
            }), dt = [], Nt(null)
        }

        function Bt() {
            Ft(st.concat(qt(dt)))
        }

        function Ft(e) {
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
                    return Object(E.f)(t, function(e, t) {
                        return n.push(e + "_" + t.join(","))
                    }), n.join(";")
                }(e),
                long_view: 1
            })
        }

        function It(e) {
            Mt(it, e)
        }

        function Nt(e) {
            Mt(rt, e)
        }

        function Mt(e, t) {
            var n = R.a.get(e) || {};
            t ? n[wt] = t : delete n[wt], R.a.set(e, n)
        }

        function Ht() {
            var e = Ht,
                t = [],
                n = R.a.get(it) || {},
                o = R.a.get(rt) || {};
            return e.iterator || (e.iterator = function(e) {
                return function(n) {
                    Rt(n) && (t = t.concat(e[n]))
                }
            }), Object.keys(n).forEach(e.iterator(n)), Object.keys(o).forEach(e.iterator(o)), t
        }

        function Dt() {
            var e = Dt,
                t = R.a.get(it) || {},
                n = R.a.get(rt) || {};
            e.iterator || (e.iterator = function(e) {
                return function(t) {
                    Rt(t) && delete e[t]
                }
            }), Object.keys(t).forEach(e.iterator(t)), Object.keys(n).forEach(e.iterator(n)), R.a.set(it, t), R.a.set(rt, n)
        }

        function Rt(e) {
            var t = Number(e);
            return t !== wt && Date.now() - t >= Ge
        }

        function Vt(e, t, n, o) {
            if (!e) return !1;
            e[$e] || (e[$e] = !0, e[Ze] = e.offsetHeight, e[et] = n + e.getBoundingClientRect().top, e[tt] = e[et] + e[Ze]);
            var i = o - lt - ut,
                r = n + lt,
                a = n + o - ut,
                c = e[Ze],
                d = e[et],
                s = e[tt];
            return (s > r && d < a ? Math.min(a, s) - Math.max(r, d) : 0) >= Math.min(i * t, c * t)
        }

        function qt(e, t, n) {
            return e.map(function(e) {
                return Wt(e, t, n)
            })
        }

        function Wt(e, t, n) {
            if (zt(e)) return [];
            var o = Math.min(Re, Date.now() - e[Ye]);
            if (e[Ke] === nt && o < He || e[Ke] === ot && o < De) return [];
            n || (e[Je] = !0);
            var i, r = function(e) {
                    var t = e[Xe];
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
                    var w = s.split("_"),
                        l = w[0],
                        u = w[1];
                    "ads" === l && (u = w[3]), /^post\d+$/.test(l) && (l = w[1], u = w[2]);
                    var f = void 0;
                    t || (mt[f = l + "_" + u] || (mt[f] = 0), mt[f]++), d.push("ad" === l ? {
                        ownerId: "ad",
                        postId: u,
                        module: a,
                        viewIndex: mt[f]
                    } : "ads" === l ? {
                        ownerId: "ads",
                        postId: u,
                        module: a,
                        index: r.index,
                        duration: o,
                        sessionId: c,
                        viewIndex: mt[f]
                    } : {
                        ownerId: l,
                        postId: (1 === r[s] ? "" : "-") + u,
                        module: a,
                        index: r.index,
                        duration: o,
                        sessionId: c,
                        q: r.q || null,
                        viewIndex: mt[f]
                    })
                }
            return d
        }

        function zt(e) {
            return "page_view" === at && e[Je] || !document.body.contains(e)
        }

        function Ut(e, t) {
            var n = e.indexOf(t);
            n >= 0 && e.splice(n, 1)
        }
        var Gt = n("QGEU"),
            Kt = n("eNQP");

        function Qt() {
            return document.activeElement && (Object(k.c)(document.activeElement, "contenteditable") || "INPUT" === document.activeElement.tagName || "textarea" === document.activeElement.tagName)
        }

        function Xt(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = arguments[2],
                o = arguments[3],
                i = e.phshown,
                r = e.phcont,
                a = t.back,
                c = t.editable,
                d = t.hideBackAfter,
                s = t.timeout,
                w = t.phColor,
                l = void 0 === w ? "#8C8E91" : w,
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
                        color: l
                    }, h)
                }, b))
            }
        }

        function Yt(e, t) {
            var n = Object(k.F)(e),
                o = t ? Object(E.d)(t) : {};
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
                            Object(E.i)(r, o.styles || {})
                        } else {
                            for (var s = [], w = 0; w < 4; w++) s.push("margin" + c[w]), s.push("padding" + c[w]), s.push("border" + c[w] + "Width");
                            r = Object(k.O)(n, s)
                        }
                        for (var l = 0; l < 4; l++) {
                            var u = "margin" + c[l],
                                f = "border" + c[l] + "Width";
                            r[u] = Object(E.r)(r[u]) + Object(E.r)(r[f]) + "px", delete r[f]
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
                    var g = Xt.pbind(n, o),
                        _ = y.a.mobile ? g : function(e, t) {
                            return setTimeout(g.pbind(e, t), 0)
                        };
                    y.a.msie && y.a.version < 8 && Object(k.qb)(m, {
                        marginTop: 1
                    }), n.phonfocus = function(e) {
                        a || (n.focused = !0, cur.__focused = n, !0 === e && (Object(k.qb)(n, {
                            backgroundColor: "#FFF"
                        }), Object(k.W)(m)), _(!0, !1))
                    }, n.phonblur = function() {
                        a || (cur.__focused = n.focused = !1, Object(k.tb)(m), _(!1, !0))
                    }, n.phshown = !0, n.phanim = null, (n.value || o.editable && ((void 0 !== n.textContent ? n.textContent : n.innerText) || Object(k.I)("img", n).length)) && (n.phshown = !1, Object(k.W)(v)), y.a.opera_mobile || (Object(L.b)(v, "focus click", function(e) {
                        a || (o.editableFocus ? (setTimeout(o.editableFocus.pbind(n), 0), n.phonfocus()) : (n.blur(), n.focus()))
                    }), Object(L.b)(n, "focus" + (o.editable ? " click" : ""), n.phonfocus), Object(L.b)(n, "keydown paste cut input", _)), Object(L.b)(n, "blur", n.phonblur), n.check = _, n.getValue = function() {
                        return o.editable ? n.innerHTML : n.value
                    }, n.setPlaceholder = function(e) {
                        return Object(k.H)("input_back_content", v).textContent = e
                    }, n.setDisabled = function(e) {
                        return a = e
                    }, n.setValue = function(e) {
                        o.editable ? n.innerHTML = e : n.value = e, Xt(n, o)
                    }, n.phevents = !0, n.phonsize = function() {}, o.global || o.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function(e) {
                        for (var t = 0, n = e.length; t < n; t++) Object(k.jb)(e[t])
                    }.pbind(cur.__phinputs))), cur.__phinputs.push(n))
                }
            }
        }

        function Jt(e, t) {
            var n = Object(k.F)(e),
                o = t ? Object(E.d)(t) : {},
                i = void 0 === Object(k.e)("input").placeholder || n && n.getAttribute && n.getAttribute("contenteditable");
            if (n && (!n.phevents || o.reload)) {
                var r = n.getAttribute ? n.getAttribute("placeholder") : n.placeholder;
                if (r && (n.getValue = function() {
                        return o.editable ? n.innerHTML : n.value
                    }, n.setValue = function(e) {
                        o.editable ? n.innerHTML = e : n.value = e, i && w(n, o)
                    }, n.phonfocus = function() {}, n.phonblur = function() {}, i)) {
                    if (n.removeAttribute("placeholder"), o.reload) {
                        var a = Object(k.y)(n);
                        a && Object(k.V)(a, "placeholder") && Object(k.fb)(a)
                    }
                    var c = n.phcont = Object(k.v)(Object(k.e)("div", {
                            className: "placeholder",
                            innerHTML: '<div class="ph_input"><div class="ph_content">' + r + "</div></div>"
                        }), n),
                        d = w.pbind(n, o),
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

            function w(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = e.phshown,
                    o = e.phcont,
                    i = void 0;
                t.editable ? ((i = void 0 !== e.textContent ? e.textContent : e.innerText) && y.a.opera && i.match(/^[ ]+$/) && (i = ""), i || (i = Object(k.I)("img", e).length > 0), i || (i = Object(k.I)("br", e).length > 1), i || (i = Object(k.I)("p", e).length > 1)) : i = e.value, n && i ? (Object(k.W)(o), e.phshown = !1) : n || i || (Object(k.tb)(o), e.phshown = !0)
            }
        }

        function $t(e) {
            if (Object(L.d)(e)) return !0;
            if (R.a.set("last_reloaded", []), !cur.onMouseClick || !cur.onMouseClick(e)) {
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
                    w = r;
                if (o = r.match(/^\/(.*?)(\?|#|$)/)) o = o[1];
                else {
                    if (n.hostname) s = n.hostname, o = n.pathname + n.search;
                    else {
                        var l = /^([^:\/]+)?(?::(\d+))?(\/?[^#]*)(#?.*)$/i.exec(r);
                        if (!l) return !0;
                        s = l[1], o = l[3] || "/"
                    }
                    if (!s || !c) return !0;
                    n.setAttribute("data-change-location-with-post-away", 1), w = n
                }
                if ("add_community_app" === o) return Object(k.c)(n, "target", "_blank"), !0;
                if (o.indexOf(".php") > 0 || o.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images\/|utils\/|\.js|js\/|\.css|css\/|source\b)/)) {
                    if (!c) return !0;
                    n.setAttribute("data-change-location-with-post-away", 1), w = n
                }
                var u = n.getAttribute("hrefparams");
                u && (a.params = Object(E.i)(a.params || {}, Object(O.f)(u)));
                try {
                    return nav.go(w, e, a), Object(L.c)(e)
                } catch (e) {
                    return !0
                }
            }
        }

        function Zt(e, t) {
            (t = t || window.event).keyCode === L.a.ENTER && (e(), Object(L.c)(t))
        }

        function en(e, t) {
            (10 === (e = e || window.event).keyCode || 13 === e.keyCode && (e.ctrlKey || e.metaKey && y.a.mac)) && (t(), Object(L.c)(e))
        }

        function tn(e) {
            if (window._wf = 1, e.keyCode === L.a.ESC && boxQueue.count() && !cur._noEscHide) return boxQueue.hideLast(), -1;
            if (e.keyCode === L.a.ESC && window.articleCloseImageFullSize && window.articleCloseImageFullSize()) return Object(L.c)(event);
            if (e.keyCode === L.a.ESC && window.isArticleLayerOpen && window.isArticleLayerOpen()) return window.ArticleLayer.close(!0), Object(L.c)(event);
            if (e.keyCode === L.a.ESC && window.AuthorPage) return window.AuthorPage.close(), Object(L.c)(event);
            if (e.keyCode === L.a.ESC) return Object(N.b)(), Object(L.c)(e);
            var t = [176, 177, 178, 179],
                n = !1;
            window.audioPlayer && (t.push(L.a.LEFT), t.push(L.a.RIGHT)), Object(E.f)(t, function(t, o) {
                if (e.keyCode === o) return n = !0, !1
            }), n && Object(M.j)().onMediaKeyPressedEvent(e), _e.inited && 191 === e.keyCode && (e.ctrlKey || e.metaKey && y.a.mac) && _e.showFriends()
        }
        var nn = n("i6oL"),
            on = n("m0N1");
        v.polyfill(), window.Map = c, window.Set = d;
        var rn = window.vk;

        function an() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, rn.width = 960, rn.started = Object(E.L)(), rn.counts = {}, y.a.android && (Object(_.d)("remixscreen_width", window.screen.width, 365), Object(_.d)("remixscreen_height", window.screen.height, 365), Object(_.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(_.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(_.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(X.f)(), Object(q.b)(), Object(L.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(L.h)(vkCache[e].handle.elem)
            }), Object(L.b)(window, "DOMContentLoaded load", function() {
                rn.loaded || (rn.loaded = !0, Object(z.y)()), Object(se.c)()
            }), Object(L.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(L.b)(document, "keydown", tn)
        }
        var cn = 0;

        function dn() {
            if (window.headNode = Object(k.J)("head"), window.icoNode = Object(k.J)("link", headNode), window.bodyNode = Object(k.J)("body"), window.htmlNode = Object(k.J)("html"), window.utilsNode = Object(k.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(L.b)(bodyNode, "resize", se.j.pbind(!1)), utilsNode) {
                var e;
                y.a.mozilla ? Object(k.a)(bodyNode, "firefox") : y.a.mobile && Object(k.a)(bodyNode, "mobfixed"), e = [], Object(E.f)(y.a, function(t, n) {
                    n && !Object(E.o)(t, ["version", "mac", "search_bot"]) && "flash" !== t.substr(0, 5) && e.push(t)
                }), e = e.join(" "), bodyNode.setAttribute("data-useragent", e), Object(q.a)();
                var t = Object(k.F)("layer_bg"),
                    n = t.nextSibling,
                    o = Object(k.F)("box_layer_bg"),
                    i = o.nextSibling;
                window.layerBG = t, window.boxLayerBG = o, window.layerWrap = n, window.layer = n.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(k.F)("stl_side"), window._stlLeft = Object(k.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, y.a.mobile || Object(nn.a)(), Object(L.b)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, t, n, o) {
                    return window.layerQueue = D, Object(E.i)(H, {
                        show: H._show.pbind(e, t),
                        boxshow: H._show.pbind(n, o),
                        wrapshow: H._show.pbind(e),
                        hide: H._hide.pbind(e, t),
                        boxhide: H._hide.pbind(n, o),
                        wraphide: H._hide.pbind(e)
                    }), H
                }(t, n, o, i), hab.init(), window._retinaInit ? window._retinaInit() : cn = 1
            }
        }

        function sn() {
            if (utilsNode) {
                Object(nn.b)();
                var e = Object(k.F)("side_bar");
                window.pageNode = Object(k.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(k.O)(e, "position"), window._tbLink = Object(k.F)("top_back_link"), y.a.chrome || y.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = y.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(E.L)() - rn.started, 10),
                    n = Object(E.r)((rn.contlen || 1) / t * 1e3);
                y.a.mozilla && y.a.version >= 4 ? n /= 2.5 : y.a.mozilla ? n *= 1.5 : y.a.msie && y.a.version >= 7 ? n /= 1.5 : y.a.msie && (n *= 2.5);
                var o = Object(E.r)(150 * Math.max(2e6 / n, 1));
                if (q.d.highlimit = 6 * o, q.d.lowlimit = Math.min(o, 600), Object(se.j)(), setTimeout(se.j.pbind(!1), 0), Object(Gt.c)(), window.addEventListener("scroll", se.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !rn.id && R.a.checkVersion() && R.a.get("last_reloaded")) try {
                    var i = {};
                    Object(E.f)(["sound_notify_off", "im_ui_notify_off"], function(e, t) {
                        var n = R.a.get(t);
                        null !== n && (i[t] = n)
                    }), window.localStorage.clear(), Object(E.f)(i, function(e, t) {
                        return R.a.set(e, t)
                    })
                } catch (e) {}
            }
        }
        var wn = function() {
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

        function ln(e) {
            rn.loaded ? e() : Object(L.b)(window, "load", e)
        }

        function un() {
            window.showWriteMessageBox = me.g, window.giftsBox = me.a, window.moneyTransferBox = me.d, window.reportAd = me.e, window.mobilePromo = me.c, window.showAudioClaimWarning = me.f, window.menuSettings = me.b, window.sureDeleteAll = me.h, window.TopNotifier = Object(M.l)(), window.showPhoto = M.x, window.showManyPhoto = M.w, window.showAlbums = M.u, window.showAlbum = M.t, window.showPhotoTags = M.y, window.isPhotoeditor3Available = M.o, window.AudioMessagePlayer = M.a, window.showVideoTags = M.A, window.videoCallback = M.C, window.showWiki = M.B, window.showApp = M.v, window.showPodcast = M.z, window.podcastStartFrom = M.r, window.articlePrepare = M.b, window.isArticleLayerOpen = M.n, window.isArticleEditorAvailable = M.m, window.openArticleEditor = M.q, window.mentionOver = pe, window.mentionClick = M.p, window.mobileOnlineTip = fe, window.pageVerifiedTip = be, window.audioShowActionTooltip = he, window.shareAudioPlaylist = M.s, window.getAudioPlayer = M.j, window.deleteAudioOnClaim = M.i, window.initTopAudioPlayer = M.k, window.bookmark = M.c, window.bookmarkPost = M.h, window.bookmarkArticle = M.d, window.bookmarkLink = M.e, window.bookmarkPodcast = M.g, window.bookmarkNarrative = M.f, window.bookmarkTooltip = ve, window.showStory = I.c, window.showNarrative = I.b, window.storiesPreloadStatic = I.d, window.sendMask = I.a
        }
        window.constants = {
            Groups: re
        }, window.partConfigEnabled = ce.a, Object(k.X)(), window.ge = k.F, window.geByTag = k.I, window.geByTag1 = k.J, window.geByClass = k.G, window.geByClass1 = k.H, window.gpeByClass = k.T, window.domQuery = k.B, window.domQuery1 = k.C, window.domClosest = k.n, window.ce = k.e, window.cf = k.f, window.re = k.fb, window.se = k.mb, window.sech = k.nb, window.rs = k.lb, window.psr = k.eb, window.domReplaceEl = k.D, window.domEL = k.t, window.domNS = k.y, window.domPS = k.A, window.domFC = k.u, window.domLC = k.x, window.domPN = k.z, window.domChildren = k.m, window.domInsertBefore = k.w, window.domInsertAfter = k.v, window.domByClass = k.j, window.domData = k.s, window.domChildIndex = k.l, window.domCA = k.k, window.domClosestSibling = k.r, window.matchesSelector = k.db, window.isHover = k.Z, window.isAncestor = k.Y, window.getScroll = k.M, window.domClosestPositioned = k.q, window.domClosestOverflowHidden = k.p, window.show = k.tb, window.hide = k.W, window.isVisible = k.ab, window.clientHeight = k.h, window.getClientRectOffsetY = k.K, window.toggle = k.ub, window.boundingRectEnabled = k.d, window.getXYRect = k.R, window.getXY = k.Q, window.isWindow = k.bb, window.getSize = k.N, window.hasClass = k.V, window.addClass = k.a, window.addClassDelayed = k.b, window.removeClass = k.hb, window.removeClassDelayed = k.ib, window.toggleClass = k.vb, window.toggleClassDelayed = k.wb, window.replaceClass = k.kb, window.getStyle = k.O, window.setStyle = k.qb, window.setStyleDelayed = k.rb, window.setPseudoStyle = k.pb, window.data = k.i, window.attr = k.c, window.removeAttr = k.gb, window.removeData = k.jb, window.cleanElems = k.g, window.setTitle = k.sb, window.getZoom = k.S, window.val = k.yb, window.elfocus = k.E, window.traverseParent = k.xb, window.getH = k.L, window.getW = k.P, window.domClosestByTag = k.o, window.setDocumentTitle = k.ob, window.lockDocumentTitle = k.cb, window.KEY = L.a, window.addEvent = L.b, window.removeEvent = L.h, window.triggerEvent = L.j, window.cancelEvent = L.c, window.stopEvent = L.i, window.normEvent = L.g, window.checkEvent = L.d, window.checkKeyboardEvent = L.e, window.checkOver = L.f, Object(E.q)(), window.isRetina = E.y, window.extractUrls = E.j, window.serializeForm = E.F, window.addTemplates = E.a, window.getTemplate = E.n, window.rand = E.D, window.irand = E.s, window.isUndefined = E.A, window.isFunction = E.v, window.isArray = E.t, window.isString = E.z, window.isObject = E.x, window.isEmpty = E.u, window.vkNow = E.L, window.vkImage = E.J, window.trim = E.H, window.stripHTML = E.G, window.escapeRE = E.h, window.intval = E.r, window.floatval = E.k, window.positive = E.C, window.isNumeric = E.w, window.winToUtf = E.M, window.replaceEntities = E.E, window.clean = E.c, window.unclean = E.I, window.each = E.f, window.indexOf = E.p, window.inArray = E.o, window.clone = E.d, window.arrayKeyDiff = E.b, window.extend = E.i, window.vkLocal = E.K, window.lTimeout = E.B, window.getCaretCharacterOffsetWithin = E.m, window.formatCount = E.l, window.encodeHtml = E.g, window.decodeHtml = E.e, Object(O.c)(), window.ajx2q = O.b, window.q2ajx = O.f, window.requestBox = O.g, window.activateMobileBox = O.a, window.validateMobileBox = O.h, window.validatePassBox = O.i, window.photoCaptchaBox = O.e, Object(_.c)(), window.getCookie = _.a, window.setCookie = _.d, window.hideCookiesPolicy = _.b, Object(de.c)(), window.debugLog = de.b, window.debugEl = de.a, window.isToday = ae.c, window.isYesterday = ae.e, window.isTomorrow = ae.d, window.isSameDate = ae.b, window.leadingZero = ae.f, window.formatTime = ae.a, window.parseLatin = P.o, window.parseCyr = P.m, window.parseLatKeys = P.n, window.langNumeric = P.i, window.langSex = P.j, window.langStr = P.k, window.addLangKeys = P.a, window.getLang = P.d, window.langDate = P.h, window.getShortDate = P.e, window.getShortDateOrTime = P.f, window.langWordNumeric = P.l, window.getDateText = P.c, window.getBigDateNew = P.b, window.getSmDate = P.g, window.scrollToY = B.g, window.scrollToTop = B.f, window.scrollGetX = B.d, window.scrollGetY = B.e, window.disableBodyScroll = B.a, window.enableBodyScroll = B.b, window.Chat = _e, window.__qlTimer = null, window.__qlClear = Le, window.onLoginDone = Ae, window.onLoginFailed = Se, window.onLoginCaptcha = Pe, window.onLoginReCaptcha = Be, window.storePasswordCredential = Ee, window.cssAnim = Oe, window.imagesLoader = je, window.nodeUpdated = Fe, window.hideNewsAnnounce = ke, window.leftAdBlockClose = Te, window.leftBlockToggleFriend = xe, window.leftBlockFriendTooltip = Ce, window.fifaReplaceText = ye, window.placeholderSetup = Yt, window.placeholderInit = Jt, window.isInputActive = Qt, window.showTooltip = ue.c, window.showTitle = ue.b, window.showHint = ue.a, window.topMsg = g.d, window.showMsg = g.b, window.topError = g.c, window.showGlobalPrg = g.a, window.checkTextLength = Ie.b, window.getSelectionText = Ie.d, window.goAway = Ie.e, window.debounce = Ie.c, window.hashCode = Ie.g, window.isFullScreen = Ie.h, window.parallel = Ie.k, window.parseJSON = Ie.l, window.shuffle = Ie.m, window.throttle = Ie.n, window.toggleOnline = Ie.q, window.updateMoney = Ie.s, window.onlinePlatformClass = Ie.j, window.Fx = C.a, window.fx = C.a, window.animate = C.b, window.cubicBezier = C.d, window.fadeTo = C.g, window.genFx = C.i, window.getRGB = C.k, window.getColor = C.j, window.slideDown = C.l, window.slideUp = C.n, window.slideToggle = C.m, window.fadeIn = C.e, window.fadeOut = C.f, window.fadeToggle = C.h, window.animateCount = C.c, window.updateAriaElements = Gt.c, window.updateAriaCheckboxes = Gt.b, window.hasAccessibilityMode = Gt.a, window.cancelStackFilter = N.a, window.cancelStackPush = N.c, window.cancelStackPop = N.b, window.ElementTooltip = j.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = T, 1 === rn.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== rn.al || history.pushState || (rn.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), rn.version = !1), Object(q.c)(), window.stManager = q.d, Object(y.c)(), window.browser = y.a, window.mobPlatforms = y.d, window.browserFeatures = y.b, Object(x.a)(), window.toggleFlash = x.c, window.renderFlash = x.b, an(), window.updateHeaderStyles = X.j, window.updateNarrow = se.m, window.checkPageBlocks = se.c, window.redraw = se.l, window.onBodyResize = se.j, window.onBodyScroll = se.k, window.leftBlockOver = se.i, window.leftBlockOut = se.h, window.leftBlockHide = se.g, window.onDocumentClick = $t, window.onEnter = Zt, window.onCtrlEnter = en, window.autosizeSetup = se.b, window.getProgressBarEl = se.e, window.getProgressHtml = se.f, Object(on.b)(), ie(), window.onDomReady = function(e) {
            return e()
        }, window.currentModule = function() {
            return cur.currentModule ? cur.currentModule() : cur.module
        }, window.hab = S(), window.ls = R.a, window.shortCurrency = V, window.statlogsValueEvent = W.b, window.saveSearchAttemptStats = W.a, window.callHub = wn, window.CallHub = wn, window.gSearch = new G, window.zNav = X.m, window.handlePageView = X.e, window.handlePageParams = X.d, window.handlePageCount = X.c, window.comScoreUDM = X.a, window.updateOtherCounters = X.l, window.processDestroy = X.g, window.globalHistoryDestroy = X.b, window.showBackLink = X.i, window.nav = Q.a, nav.init(), rn.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === t[1] && 12 === rn.time[1] ? rn.time[1] = 0 : 12 === t[1] && 1 === rn.time[1] ? t[1] = 0 : (t[1] > rn.time[1] + 1 || rn.time[1] > t[1] + 1) && (t[1] = rn.time[1] = t[2] = rn.time[2] = 0), t[1] > rn.time[1] && 1 === t[2] ? 31 === rn.time[2] || (4 === rn.time[1] || 6 === rn.time[1] || 9 === rn.time[1] || 11 === rn.time[1]) && 30 === rn.time[2] || 2 === rn.time[1] && (29 === rn.time[2] || 28 === rn.time[2] && rn.time[0] % 4) ? rn.time[2] = 0 : rn.time[2] = t[2] = 0 : rn.time[1] > t[1] && 1 === rn.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && rn.time[0] % 4) ? t[2] = 0 : t[2] = rn.time[2] = 0), (t[2] > rn.time[2] + 1 || rn.time[2] > t[2] + 1) && (t[2] = rn.time[2] = 0);
            var n = 60 * (60 * (24 * (t[2] - rn.time[2]) + (t[3] - rn.time[3])) + (t[4] - rn.time[4]));
            n < -55800 ? n += 86400 : n > 37800 && (n -= 86400);
            var o = 0,
                i = Math.abs(n);
            Object(E.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], function(e, t) {
                var r = Math.round(3600 * (t - 3)),
                    a = Math.abs(n - r);
                a < i && (i = a, o = r)
            }), rn.dt = o, Object(_.a)("remixdt") !== rn.dt && Object(_.d)("remixdt", rn.dt, 365);
            var r = Object(E.r)(Object(_.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!y.a.iphone || Object(_.a)("remixme")) ? 1 & r || (Object(_.d)("remixrt", 1 | r, 365), window._retinaInit = function() {
                q.d.add(["retina.css"]), Object(k.a)(document.body, "is_2x")
            }, cn && window._retinaInit()) : 1 & r && Object(_.d)("remixrt", 1 ^ r, 365)
        }, 0), window.boxQueue = Object(le.c)(), window.__bq = boxQueue, window.curBox = le.b, Object(le.d)(), window.boxRefreshCoords = le.a, window.MessageBox = we.a, window.showBox = we.b, window.showTabbedBox = we.f, window.showFastBox = we.d, window.showCaptchaBox = we.c, window.showReCaptchaBox = we.e, window.showDoneBox = le.e, window.TopMenu = se.a, window.TopSearch = K.a, window.handleScroll = Ie.f, window.loadScript = U.a, Object(z.j)(), window.notaBene = z.q, window.updSideTopLink = z.y, window.createButton = z.d, window.actionsMenuItemLocked = z.a, window.lockActionsMenuItem = z.n, window.unlockActionsMenuItem = z.v, window.linkLocked = z.m, window.lockLink = z.p, window.unlockLink = z.x, window.lockButton = z.o, window.unlockButton = z.w, window.buttonLocked = z.b, window.isButtonLocked = z.k, window.disableButton = z.f, window.sbWidth = z.t, window.isChecked = z.l, window.checkbox = z.c, window.disable = z.e, window.radioval = z.s, window.radiobtn = z.r, window.showProgress = z.u, window.hideProgress = z.i, window.disableEl = z.g, window.enableEl = z.h, Object(F.d)(), window.VideoConstants = F.a, window.showVideo = F.j, window.showInlineVideo = F.i, window.loadInlineVideo = F.e, window.revertLastInlineVideo = F.h, window.destroyInlineVideoPlayer = F.c, window.pauseLastInlineVideo = F.f, window.playLastInlineVideo = F.g, window.checkMp4 = F.b, window.performance && window.performance.memory && Object(E.D)(0, 100) < 5 && Object(Kt.a)(), at ? (Object(L.b)(window, "blur", kt), Object(L.b)(window, "focus", Tt), onDomReady(function() {
            return setTimeout(gt, 500)
        }), window.LongView = {
            register: Ot,
            onScroll: Object(Ie.n)(yt, 50),
            onBeforePageChange: xt,
            clearElemsCache: _t,
            _debug: function() {
                return {
                    started: dt,
                    tracking: ct,
                    viewedData: st,
                    viewIndexes: mt,
                    blindTop: lt,
                    blindBottom: ut
                }
            }
        }) : window.LongView = {
            register: function() {},
            onScroll: function() {},
            onBeforePageChange: function() {},
            clearElemsCache: function() {}
        }, window._postsSeen = {}, window._postsSaved = {}, window._postsSaveTimer = void 0, window._postsSendTimer = void 0, window._postsCleanTimer = void 0, window._postsSeenModules = {}, window._postsExtras = {}, un(), window.onLoaded = ln, window.domStarted = dn, window.domReady = sn, Object(de.b)("common module enabled"), q.d.done(jsc("web/common_web.js"))
    }
});