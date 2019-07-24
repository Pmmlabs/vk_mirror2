! function(e) {
    function t(t) {
        for (var i, a, d = t[0], s = t[1], w = t[2], l = 0, u = []; l < d.length; l++) a = d[l], n[a] && u.push(n[a][0]), n[a] = 0;
        for (i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i]);
        for (c && c(t); u.length;) u.shift()();
        return r.push.apply(r, w || []), o()
    }

    function o() {
        for (var e, t = 0; t < r.length; t++) {
            for (var o = r[t], i = !0, d = 1; d < o.length; d++) {
                var s = o[d];
                0 !== n[s] && (i = !1)
            }
            i && (r.splice(t--, 1), e = a(a.s = o[0]))
        }
        return e
    }
    var i = {},
        n = {
            "web/common_web": 0
        },
        r = [];

    function a(t) {
        if (i[t]) return i[t].exports;
        var o = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, a), o.l = !0, o.exports
    }
    a.m = e, a.c = i, a.d = function(e, t, o) {
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
            for (var i in e) a.d(o, i, function(t) {
                return e[t]
            }.bind(null, i));
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
        s = d.push.bind(d);
    d.push = t, d = d.slice();
    for (var w = 0; w < d.length; w++) t(d[w]);
    var c = s;
    r.push([81, "bundles/audioplayer", "bundles/common"]), o()
}({
    81: function(e, t, o) {
        e.exports = o("g42W")
    },
    g42W: function(e, t, o) {
        "use strict";
        o.r(t);
        var i = {};
        o.r(i), o.d(i, "fromQueryString", function() {
            return h
        }), o.d(i, "toQueryString", function() {
            return u
        });
        o("pIFo"), o("OG14"), o("SRfc"), o("NO8f");
        ! function(e) {
            var t = e.HTMLCanvasElement && e.HTMLCanvasElement.prototype,
                o = e.Blob && function() {
                    try {
                        return Boolean(new Blob)
                    } catch (e) {
                        return !1
                    }
                }(),
                i = o && e.Uint8Array && function() {
                    try {
                        return 100 === new Blob([new Uint8Array(100)]).size
                    } catch (e) {
                        return !1
                    }
                }(),
                n = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder,
                r = /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
                a = (o || n) && e.atob && e.ArrayBuffer && e.Uint8Array && function(e) {
                    var t, a, d, s, w, c, l, u, h;
                    if (!(t = e.match(r))) throw new Error("invalid data URI");
                    for (a = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), d = !!t[4], s = e.slice(t[0].length), w = d ? atob(s) : decodeURIComponent(s), c = new ArrayBuffer(w.length), l = new Uint8Array(c), u = 0; u < w.length; u += 1) l[u] = w.charCodeAt(u);
                    return o ? new Blob([i ? l : c], {
                        type: a
                    }) : ((h = new n).append(c), h.getBlob(a))
                };
            e.HTMLCanvasElement && !t.toBlob && (t.mozGetAsFile ? t.toBlob = function(e, o, i) {
                e(i && t.toDataURL && a ? a(this.toDataURL(o, i)) : this.mozGetAsFile("blob", o))
            } : t.toDataURL && a && (t.toBlob = function(e, t, o) {
                e(a(this.toDataURL(t, o)))
            })), "function" == typeof define && define.amd ? define(function() {
                return a
            }) : "object" == typeof module && module.exports ? module.exports = a : e.dataURLtoBlob = a
        }(window);
        o("uQjJ"), o("rGqo"), o("Btvt");

        function n(e) {
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
                i = t.shift();
            return function() {
                var n = Array.prototype.slice.call(arguments);
                return e.apply(o, t.concat(n)), i
            }
        }, Function.prototype.bind || (Function.prototype.bind = function() {
            var e = this,
                t = Array.prototype.slice.call(arguments),
                o = t.shift();
            return function() {
                var i = Array.prototype.slice.call(arguments);
                return e.apply(o, t.concat(i))
            }
        }), Object.keys || (Object.keys = function(e) {
            var t = [];
            for (var o in e) e.hasOwnProperty(o) && t.push(o);
            return t
        }), n(window.NodeList), n(window.HTMLCollection);
        var r = o("ryw6"),
            a = o("kMSP"),
            d = o("Kngp"),
            s = (o("KKXr"), o("Vd3H"), o("t7n3")),
            w = {},
            c = function(e) {
                if (w[e]) return e;
                try {
                    return encodeURIComponent(e)
                } catch (e) {
                    return ""
                }
            },
            l = function(e) {
                try {
                    return decodeURIComponent(e)
                } catch (t) {
                    return w[e] = 1, e
                }
            };

        function u(e, t) {
            var o = [];
            for (var i in e)
                if (e.hasOwnProperty(i) && null != e[i] && !Object(s.v)(e[i]))
                    if (Object(s.t)(e[i]))
                        for (var n = 0, r = 0, a = e[i].length; n < a; ++n) null == e[i][n] || Object(s.v)(e[i][n]) || (o.push(c(i) + "[" + r + "]=" + c(e[i][n])), ++r);
                    else o.push(c(i) + "=" + c(e[i]));
            return t || o.sort(), o.join("&")
        }

        function h(e) {
            if (!e) return {};
            var t = {};
            return e = e.split("&"), Object(s.f)(e, function(e, o) {
                var i = o.split("=");
                if (i[0]) {
                    var n = l(i[1] + "");
                    if ("[]" === i[0].substr(i.length - 2)) {
                        var r = l(i[0].substr(0, i.length - 2));
                        t[r] || (t[r] = []), t[r].push(n)
                    } else t[l(i[0])] = n
                }
            }), t
        }
        var p = o("gdug"),
            b = o("k487"),
            f = o("zxIV");

        function m(e, t) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
                var o = Object(f.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(o, icoNode), icoNode = o
            }
        }
        var v = o("HhI8"),
            g = o("7jxN"),
            _ = (o("rE2o"), o("ioFf"), o("a1Th"), o("Egk5"));

        function y(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var o = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var a, d = e[Symbol.iterator](); !(i = (a = d.next()).done) && (o.push(a.value), !t || o.length !== t); i = !0);
                } catch (e) {
                    n = !0, r = e
                } finally {
                    try {
                        i || null == d.return || d.return()
                    } finally {
                        if (n) throw r
                    }
                }
                return o
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function O() {
            return new function(e) {
                var t, o = function(e) {
                        var t = y(e.split("#"), 2),
                            o = t[0],
                            i = t[1],
                            n = y(o.split("?"), 2),
                            r = n[0],
                            a = n[1];
                        return r + (a ? "?" + Object(d.b)(Object(d.e)(a)) : "") + (i ? "#" + i : "")
                    },
                    i = Object(s.i)({
                        onLocChange: () => {}
                    }, e),
                    n = function() {
                        var e = "";
                        return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), o(e.replace(/^(\/|!)/, ""))
                    },
                    r = n(),
                    a = function(e) {
                        var t = n();
                        t === r && !0 !== e || (i.onLocChange(t), r = t)
                    };
                return {
                    setLoc: function(e) {
                        r = o(e);
                        var t = (location.toString().match(/#(.*)/) || {})[1] || "";
                        if (!t && vk.al > 1 && (t = (location.pathname || "") + (location.search || "")), (t = (t = o(t)).replace(/^(\/|!)/, "")) !== r) {
                            if (3 == vk.al) try {
                                return window.saveScrollTopOnBack && (delete window.saveScrollTopOnBack, history.replaceState({
                                    scrollTop: window.lastScrollTop,
                                    preventScroll: window.preventLocationScroll
                                }, "", `/${t}`), window.preventLocationScroll && delete window.preventLocationScroll), void history.pushState({}, "", `/${r}`)
                            } catch (e) {}
                            window.chHashFlag = !0, location.hash = "#" + vk.navPrefix + r
                        }
                    },
                    getLoc: n,
                    init: function() {
                        1 == vk.al && a(!0), 3 == vk.al ? (Object(_.b)(window, "popstate", a), p.a.safari && Object(_.b)(window, "hashchange", a)) : "onhashchange" in window ? Object(_.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : a()
                        }) : t = setInterval(a, 200)
                    },
                    setOptions: function(e) {
                        i = Object(s.i)(i, e)
                    },
                    checker: a,
                    stop: function() {
                        vk.al < 3 ? clearInterval(t) : 3 == vk.al && Object(_.h)(window, "popstate", a)
                    }
                }
            }({
                onLocChange: function(e) {
                    var t = {
                        back: !0,
                        hist: !0
                    };
                    3 === vk.al && history.state && Object(s.x)(history.state) && (t.scrollTop = Object(s.r)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
                }
            })
        }
        var j = o("4+be"),
            E = o("lXE5"),
            S = o("Ia1d"),
            k = o("XuKo"),
            T = o("ErRf"),
            P = o("/PiP"),
            L = {
                sh: function(e, t) {
                    Object(f.ub)(e), Object(s.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(f.W)(e), Object(s.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, o, i) {
                    var n = "layers" + (boxQueue.count() + 1);
                    Object(T.c)(n, function() {}), Object(f.rb)(e, {
                        opacity: o || "",
                        backgroundColor: i || ""
                    }), L.visible || (Object(v.c)(), Object(E.a)()), L.visible || Object(S.f)(), L.visible = !0, Object(f.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(f.hb)(t, "box_layer_hidden") : Object(f.ub)(t), L.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    L.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(T.a)(e), t && t.visibilityHide ? Object(f.a)(t, "box_layer_hidden") : Object(f.W)(t), Object(f.ab)(layerWrap) || cur._inLayer || Object(f.ab)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(f.ab)(window.mvLayerWrap)) || Object(f.ab)(window.wkLayerWrap) || (L.visible = !1, Object(f.hb)(bodyNode, "layers_shown"), Object(v.c)(!0), Object(E.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), L.visible || Object(S.g)()
                }
            },
            R = {
                push: function(e) {
                    var t, o = !!R.count() && R._layers[R._layers.length - 1];
                    if (cur.pvShown && "temp" != cur.pvListId) t = ["photo", cur.pvData[cur.pvListId][cur.pvIndex].id, cur.pvListId, {
                        onHide: cur.pvOptions.onHide,
                        scroll: cur.pvNarrowScrollbar ? cur.pvNarrowScrollbar.data.scrollTop : 0,
                        onShow: e,
                        noHistory: !!cur.pvNoHistory,
                        histLen: cur.pvHistoryLength
                    }];
                    else if (window.mvcur && mvcur.mvShown && !mvcur.minimized) {
                        var i = mvcur.options && (mvcur.options.autoplay || mvcur.options.focusPlay),
                            n = {
                                scroll: mvLayerWrap.scrollTop,
                                noHistory: !!mvcur.noHistory,
                                nomin: 1,
                                autoplay: i,
                                prevLoc: mvcur.mvPrevLoc
                            };
                        VideoPlaylist.getCurListId() && (n = Object(s.i)(n, {
                            playlistId: VideoPlaylist.getCurListId(),
                            module: Videoview.getVideoModule(),
                            addParams: {
                                force_no_repeat: 1,
                                show_next: 1
                            }
                        })), t = ["video", mvcur.videoRaw, mvcur.listId, n]
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
                    return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || R._layers.push(t), R.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = R._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    R._bl = !0, window.WkView && L.fullhide == WkView.hide ? (Object(f.W)(wkLayerWrap), clearTimeout(wkcur.showT)) : L.fullhide && L.fullhide(!0, !0), setTimeout(R.unblock, 5)
                },
                unblock: function() {
                    R._bl = !1
                },
                pop: function() {
                    if (R.count() && !R._bl) {
                        var e = R._layers.pop();
                        if (R.skipVideo && (R.skipVideo = !1, "video" == e[0])) return R._layers.push(e), void(R.skipVideo = !1);
                        "photo" === e[0] ? (Object(s.i)(e[3], {
                            fromQueue: !0
                        }), Object(P.y)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(s.i)(e[3], {
                            fromQueue: !0
                        }), Object(S.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(P.C)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(k.c)(e[1]) : "podcast" === e[0] && Object(P.A)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, o, i) {
                    for (var n = R._layers, r = n.length; r > 0; --r)
                        if (n[r - 1][0] == e && n[r - 1][1] == t || n[r - 1][0] == o && n[r - 1][1] == i) return R._layers = n.slice(0, r), R.pop(), !0;
                    return !1
                },
                count: function() {
                    return R._layers.length
                },
                clear: function() {
                    R._layers = []
                },
                _layers: []
            };
        var I = o("Xrg9");

        function x() {
            var e = {};
            Object(s.f)(Object(f.G)("_short_currency"), function() {
                var t = Object(f.s)(this, "short") || "";
                if (!t) return !0;
                var o = this.innerHTML,
                    i = Object(s.M)(o).length,
                    n = Object(f.O)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[n]) {
                    for (var r = "", a = i - 1; a >= 0; a--) r += "&#8399;";
                    var d = Object(f.e)("div", {
                        innerHTML: `<b>${o}</b><b>${r}</b>`
                    }, {
                        fontFamily: n,
                        fontSize: "24px"
                    });
                    Object(f.F)("utils").appendChild(d), e[n] = Math.abs(d.firstChild.offsetWidth - d.lastChild.offsetWidth) >= 2 * i, Object(f.fb)(d)
                }!1 === e[n] && Object(f.zb)(this, t)
            })
        }
        var C = o("0gG3"),
            N = o("XzvV"),
            A = o("v+DW"),
            B = o("lkNA");
        var M = class {
                constructor() {
                    var e = window.CallHub;
                    this.on = 0, this.hub = new e(() => {
                        this.onShow && this.onShow()
                    }, 2), this.hintsHub = new e(() => this.showStartHints(), 2)
                }
                load() {
                    Object(f.F)("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", () => this.hub.done()), ajax.post("hints.php", {
                        act: "a_start_hints"
                    }, {
                        onDone: e => {
                            this.startHintsText = Object(s.H)(e), this.hintsHub.done()
                        }
                    }))
                }
                show(e) {
                    var t = window.placeholderSetup;
                    if (Object(f.F)("quick_search") && !this.on) return this.on = 1, Object(f.ub)(this.sCont), t("search_input"), Object(f.F)("search_input").setAttribute("autocomplete", "off"), Object(f.a)(Object(f.F)("qsearch_link"), "active"), this.prev_content = Object(f.F)("content"), this.qsearch_cont || (this.qsearch_cont = Object(f.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(_.c)(e) : void 0
                }
                go(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(s.H)(Object(f.F)("search_input").value) + "&name=1";
                    return Object(_.c)(e || window.event), location.href = t, !1
                }
                init(e) {
                    this.sCont = Object(f.F)("quick_search"), this.opt = e || {}
                }
                hide(e, t) {
                    if (Object(f.F)("quick_search") && (!this.active || t) && this.on) {
                        var o = window.toggleFlash;
                        if (this.on = 0, o(), this.beforeHide && this.beforeHide()) return !0;
                        Object(f.F)("search_input").setValue ? Object(f.F)("search_input").setValue("") : Object(f.F)("search_input").value = "", Object(f.W)(this.sCont), Object(f.hb)(Object(f.F)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }
                preload() {}
            },
            D = o("Bszp"),
            F = o("MSYF"),
            H = o("kHqu");

        function V(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var o = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var a, d = e[Symbol.iterator](); !(i = (a = d.next()).done) && (o.push(a.value), !t || o.length !== t); i = !0);
                } catch (e) {
                    n = !0, r = e
                } finally {
                    try {
                        i || null == d.return || d.return()
                    } finally {
                        if (n) throw r
                    }
                }
                return o
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var U = "remixjsp";

        function W() {
            ! function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("paint").forEach(e => {
                    "first-contentful-paint" === e.name && Q(e.startTime, "TTFCP")
                })
            }(),
            function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(e => {
                    if ("navigation" === e.initiatorType) {
                        var t = e.domComplete,
                            o = e.domContentLoadedEventEnd,
                            i = e.loadEventEnd;
                        Q(t, "domComplete"), Q(o, "domContentLoadedEventEnd"), Q(i, "loadEventEnd")
                    }
                })
            }(), z()
        }
        var G = [],
            q = !1;

        function z() {
            if (q) {
                var e = window.performance,
                    t = G[G.length - 1];
                if (!t) return q = !1, void Q(-1);
                var o = t.startTime + t.duration;
                e.now() - o >= 3e3 ? Q(o, "TTI") : setTimeout(z, 3e3)
            }
        }
        var K = [];

        function Q(e, t) {
            var o = Math.floor(e);
            if (-1 !== e && (K.push([o, t]), !(q ? "TTI" === t : K.length > 2))) return;
            var i = "unknown",
                n = navigator.connection;
            n && n.effectiveType && (i = n.effectiveType);
            var r = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            K.forEach(e => {
                var t = V(e, 2),
                    o = t[0],
                    n = t[1];
                return r.events.push([n, o, cur.module, i, window.vk.rv])
            }), Object(a.d)(U, JSON.stringify(r), .01)
        }

        function Y() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(e => {
                G = G.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), q = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout(W, 0)
            }) : W()
        }
        var J = {
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
            X = o("1BRX"),
            $ = o("W9Tc"),
            Z = o("98sY"),
            ee = o("El3O"),
            te = o("EasH"),
            oe = o("kcIO"),
            ie = o("FWc3");

        function ne(e, t) {
            var o = t.asrtl ? 0 : t.right ? 289 : 35,
                i = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
            return Object(ie.c)(e, {
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
                className: "mobile_tt" + i
            })
        }

        function re(e, t) {
            return Object(ie.c)(e, {
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

        function ae(e, t, o) {
            if (!cur._addRestoreInProgress) {
                var i = Object(f.T)("_audio_row", e),
                    n = AudioUtils.getAudioFromEl(i, !0),
                    r = Object(f.s)(e, "action"),
                    a = AudioUtils.getRowActionName(r, n, i),
                    d = {
                        text: () => a,
                        black: 1,
                        shift: t || [7, 4, 0],
                        needLeft: !0,
                        forcetodown: o
                    };
                each(["_im_mess_stack", "top_notify_wrap", "_ape_audio_item", "wk_history_audio_content"], function(t, o) {
                    if (Object(f.T)(o, e)) return d.appendParentCls = o, !1
                }), Object(f.T)("_im_mess_stack", e) && (d.shift = [7, 10, 0], d.noZIndex = !0), Object(ie.c)(e, d)
            }
        }

        function de(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            Object(ie.c)(e, {
                url: "al_wall.php",
                params: {
                    act: "mention_tt",
                    mention: e.getAttribute("mention_id"),
                    from: "wall"
                },
                shift: t.shift || [52, 7, 7],
                hidedt: t.hidedt || 500,
                showdt: 500,
                needLeft: t.needLeft,
                slide: 15,
                checkLeft: !0,
                reverseOffset: t.reverseOffset || 112,
                dir: "auto",
                appendEl: t.appendEl || Object(f.n)("im-page-history-w", e) || Object(f.n)("rb_box_wrap", e) || Object(f.n)("wk_cont", e) || Object(f.n)("scroll_fix_wrap", e)
            })
        }

        function se(e) {
            var t = "";
            Object(f.T)("_im_mess_stack", e) ? t = "_im_mess_stack" : Object(f.T)("wall_text", e) && (t = "scroll_fix_wrap"), Object(ie.c)(e, {
                className: "bookmarks_tt ",
                shift: [32, 8],
                text: () => "1" === Object(f.s)(e, "state") ? Object(f.s)(e, "remove") : Object(f.s)(e, "add"),
                black: 1,
                appendParentCls: t
            })
        }
        var we = o("Ieup"),
            ce = o("t/FQ"),
            le = o("aong"),
            ue = .5,
            he = .25,
            pe = 300,
            be = 1e3,
            fe = 3e5,
            me = 2500,
            ve = 5e3,
            ge = 6e3,
            _e = 2e4,
            ye = 1e3,
            Oe = 36e4,
            je = "_longViewType",
            Ee = "_longViewIdled",
            Se = "_longViewModule",
            ke = "_longViewStarted",
            Te = "_longViewProcessed",
            Pe = "_longViewCached",
            Le = "_longViewHeight",
            Re = "_longViewTop",
            Ie = "_longViewBottom",
            xe = "REGULAR",
            Ce = "AUTOPLAY_AD",
            Ne = "LongView.viewed",
            Ae = "LongView.idled",
            Be = vk.longViewTestGroup,
            Me = [],
            De = [],
            Fe = [],
            He = Date.now(),
            Ve = 0,
            Ue = 0,
            We = !1,
            Ge = null,
            qe = null,
            ze = null,
            Ke = null,
            Qe = {};

        function Ye() {
            var e = pt();
            e.length && (ct(e), bt())
        }

        function Je() {
            Me.forEach(function(e) {
                e[Pe] = !1
            })
        }

        function Xe(e, t) {
            "im" === t && !e[je] && function(e) {
                if (Object(f.V)(e, "im-mess--post")) return !0;
                var t = e && Object(f.u)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(f.V)(e, "no_posts"))
            }(e) && (e[je] = function(e) {
                var t = e && Object(f.u)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? Ce : xe
            }(e), e[Se] = t, Me.push(e))
        }

        function $e(e, t) {
            var o = $e;
            ! function(e, t) {
                var o = [];
                Me.forEach(function(i) {
                    _t(i) ? o.push(i) : ! function(e, t, o) {
                        return !e[ke] && mt(e, ue, t, o)
                    }(i, e, t) ? function(e, t, o) {
                        return e[ke] && !mt(e, he, t, o)
                    }(i, e, t) && (i[Ee] ? delete i[Ee] : (yt(De, i), Fe = Fe.concat(gt(i))), delete i[ke]) : (i[ke] = Date.now(), De.push(i))
                }), o.forEach(function(e) {
                    yt(Me, e)
                })
            }(e || Object(E.e)(), t || window.innerHeight), We ? (clearTimeout(o.timer), o.timer = setTimeout(Ze, 150)) : (We = !0, nt(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(f.H)("im-page--chat-header"),
                        t = Object(f.H)("im-page--chat-input");
                    Ve = e.getBoundingClientRect().top + e.offsetHeight, Ue = window.innerHeight - t.getBoundingClientRect().top
                } else Ve = Object(f.F)("page_header").offsetHeight, Ue = 0
            }())
        }

        function Ze() {
            nt(), it(), We = !1
        }

        function et() {
            nt(), wt()
        }

        function tt() {
            Fe = [], De.forEach(e => e[ke] = Date.now()), lt(null), ut(null), it()
        }

        function ot() {
            nt(), wt(), Fe = [], De = [], lt(null), ut(null)
        }

        function it() {
            Ge = setTimeout(rt, me), qe = setTimeout(at, ve), ze = setTimeout(dt, ge), Ke = setTimeout(st, _e)
        }

        function nt() {
            clearTimeout(Ge), clearTimeout(qe), clearTimeout(ze), clearTimeout(Ke)
        }

        function rt() {
            Fe.length && lt(Fe)
        }

        function at() {
            ct(Fe), Fe = [], lt(null)
        }

        function dt() {
            De.length && (ut(vt(De, !0, !0)), ze = setTimeout(dt, ye))
        }

        function st() {
            clearTimeout(ze), ct(vt(De)), De.forEach(e => e[Ee] = !0), De = [], ut(null)
        }

        function wt() {
            ct(Fe.concat(vt(De)))
        }

        function ct(e) {
            e && e.length && ajax.post("/al_page.php", {
                act: "seen",
                data: function(e) {
                    var t = {};
                    e.forEach(function(e) {
                        var o = e.ownerId,
                            i = "ad" === o ? "" : ":" + e.duration + ":" + e.index;
                        t[o] || (t[o] = []), t[o].push(e.module + e.postId + i + (e.sessionId ? ":" + e.sessionId : "") + (e.q ? ":" + e.q : "") + ":" + e.viewIndex)
                    });
                    var o = [];
                    return Object(s.f)(t, (e, t) => o.push(e + "_" + t.join(","))), o.join(";")
                }(e),
                long_view: 1
            })
        }

        function lt(e) {
            ht(Ne, e)
        }

        function ut(e) {
            ht(Ae, e)
        }

        function ht(e, t) {
            var o = I.a.get(e) || {};
            t ? o[He] = t : delete o[He], I.a.set(e, o)
        }

        function pt() {
            var e = pt,
                t = [],
                o = I.a.get(Ne) || {},
                i = I.a.get(Ae) || {};
            return e.iterator || (e.iterator = (e => o => {
                ft(o) && (t = t.concat(e[o]))
            })), Object.keys(o).forEach(e.iterator(o)), Object.keys(i).forEach(e.iterator(i)), t
        }

        function bt() {
            var e = bt,
                t = I.a.get(Ne) || {},
                o = I.a.get(Ae) || {};
            e.iterator || (e.iterator = (e => t => {
                ft(t) && delete e[t]
            })), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), I.a.set(Ne, t), I.a.set(Ae, o)
        }

        function ft(e) {
            var t = Number(e);
            return t !== He && Date.now() - t >= Oe
        }

        function mt(e, t, o, i) {
            if (!e) return !1;
            e[Pe] || (e[Pe] = !0, e[Le] = e.offsetHeight, e[Re] = o + e.getBoundingClientRect().top, e[Ie] = e[Re] + e[Le]);
            var n = i - Ve - Ue,
                r = o + Ve,
                a = o + i - Ue,
                d = e[Le],
                s = e[Re],
                w = e[Ie];
            return (w > r && s < a ? Math.min(a, w) - Math.max(r, s) : 0) >= Math.min(n * t, d * t)
        }

        function vt(e, t, o) {
            return e.map(e => gt(e, t, o))
        }

        function gt(e, t, o) {
            if (_t(e)) return [];
            var i = Math.min(fe, Date.now() - e[ke]);
            if (e[je] === xe && i < pe || e[je] === Ce && i < be) return [];
            o || (e[Te] = !0);
            var n = function(e) {
                    var t = e[Se];
                    if ("im" === t) {
                        var o = Object(f.c)(e, "data-post-id"),
                            i = Object(f.c)(e, "data-copy"),
                            n = {
                                index: -1,
                                module: "im"
                            };
                        return o && (n[o] = -1), i && (n[i] = -1), n
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
                    }["feed_other" === e ? `feed_${cur.section}` : e] || "u"
                }(n.module),
                a = cur.feed_session_id || "na",
                d = [];
            for (var s in n)
                if ("index" !== s && "module" !== s && "q" !== s) {
                    var w = s.split("_"),
                        c = w[0],
                        l = w[1];
                    "ads" === c && (l = w[3]), /^post\d+$/.test(c) && (c = w[1], l = w[2]);
                    var u = void 0;
                    t || (Qe[u = c + "_" + l] || (Qe[u] = 0), Qe[u]++), d.push("ad" === c ? {
                        ownerId: "ad",
                        postId: l,
                        module: r,
                        viewIndex: Qe[u]
                    } : "ads" === c ? {
                        ownerId: "ads",
                        postId: l,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        viewIndex: Qe[u]
                    } : {
                        ownerId: c,
                        postId: (1 === n[s] ? "" : "-") + l,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        q: n.q || null,
                        viewIndex: Qe[u]
                    })
                }
            return d
        }

        function _t(e) {
            return "page_view" === Be && e[Te] || !document.body.contains(e)
        }

        function yt(e, t) {
            var o = e.indexOf(t);
            o >= 0 && e.splice(o, 1)
        }
        var Ot = o("QGEU"),
            jt = o("eNQP"),
            Et = o("o7bv"),
            St = o("wetz"),
            kt = o("BJj/"),
            Tt = o("i6oL"),
            Pt = o("m0N1");
        o("VRzm"), o("/8Fb");
        var Lt = o("W0P9"),
            Rt = 5e3,
            It = "push_notifier_endpoint",
            xt = "push_notifier_subscribed_ts",
            Ct = 6e4,
            Nt = 432e6;
        class At {
            constructor(e, t) {
                this.sw = e, this.SWClient = t, vk.id && this.canBeEnabled().then(e => {
                    e && (this.listenPermission(), this.loadEndpoint() && this.update().then(this.checkMessageState.bind(this)))
                })
            }
            static getPermission() {
                return Notification.permission
            }
            cleanNotification() {
                this.sw.action("cleanNotification")
            }
            canBeEnabled() {
                return Promise.resolve(this.isSupported())
            }
            isSupported() {
                return "PushManager" in window && "Notification" in window && this.SWClient.isSupported()
            }
            loadEndpoint() {
                return I.a.get(It + vk.id) || !1
            }
            saveEndpoint(e) {
                I.a.set(It + vk.id, e || !1)
            }
            action(e, t) {
                return this.sw.action(e, t)
            }
            _needupdate(e) {
                var t = Date.now(),
                    o = this.loadEndpoint(),
                    i = I.a.get(xt + vk.id),
                    n = !1;
                return (o !== e.endpoint || !i || t - i > Ct) && (I.a.set(xt + vk.id, t), n = !0), n
            }
            listenPermission() {
                Object($.a)("push_notifier") && navigator.permissions && navigator.permissions.query && navigator.permissions.query({
                    name: "notifications"
                }).then(e => {
                    e.onchange = (() => this.update())
                })
            }
            update() {
                return this.updatePermission().then(e => e === At.PUSH_NOTIFIER_PERMISSION_GRANTED ? this.subscribe().catch(e => {
                    e !== At.SUBSCRIBE_ERROR_NETWORK && e("can not update subscribe")
                }) : Promise.reject("premession_not_granted")).catch(Lt.a)
            }
            updatePermission() {
                var e = At.getPermission();
                if (e !== At.PUSH_NOTIFIER_PERMISSION_GRANTED) {
                    var t = this.loadEndpoint();
                    if (t) return this.unsubscribe(t).then(() => e)
                }
                return Promise.resolve(e)
            }
            processSubscribe(e) {
                return e.subscribe({
                    userVisibleOnly: !0,
                    applicationServerKey: function(e) {
                        for (var t = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), o = window.atob(t), i = new Uint8Array(o.length), n = 0; n < o.length; ++n) i[n] = o.charCodeAt(n);
                        return i
                    }(At.SERVER_KEY)
                })
            }
            setupSubscription() {
                return new Promise((e, t) => {
                    var o = At.getPermission(),
                        i = () => {
                            this.subscribe(!0).then(() => {
                                e()
                            }).catch(() => {
                                t()
                            })
                        };
                    o !== At.PUSH_NOTIFIER_PERMISSION_DENIED ? o !== At.PUSH_NOTIFIER_PERMISSION_GRANTED ? o === At.PUSH_NOTIFIER_PERMISSION_DEFAULT && this.requestPermission().then(e => {
                        e === At.PUSH_NOTIFIER_PERMISSION_GRANTED ? i() : t()
                    }) : i() : t(At.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS)
                })
            }
            subscribe(e) {
                return this.sw.register().then(e => {
                    var t = e.pushManager;
                    return t.getSubscription().then(e => {
                        if (e) {
                            var o = e.expirationTime;
                            return o && Date.now() > o - Nt ? this.unsubscribe(this.loadEndpoint()).then(() => this.processSubscribe(t)) : e
                        }
                        return this.processSubscribe(t)
                    })
                }).then(t => new Promise((o, i) => {
                    if (e || this._needupdate(t)) {
                        var n = t.getKey("p256dh"),
                            r = t.getKey("auth");
                        window.ajax.post(At.SERVER_URL, {
                            act: "a_subscribe",
                            endpoint: t.endpoint,
                            key: n ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("p256dh")))) : null,
                            token: r ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("auth")))) : null
                        }, {
                            onDone: e => {
                                e ? (this.saveEndpoint(t.endpoint), o()) : i()
                            },
                            onFail: () => (i(At.SUBSCRIBE_ERROR_NETWORK), !0)
                        })
                    } else o()
                }))
            }
            unsubscribe(e) {
                return this.sw.register().then(t => t.pushManager.getSubscription().then(t => t ? t.unsubscribe().then(t => t ? new Promise((t, o) => {
                    ajax.post(At.SERVER_URL, {
                        act: "a_unsubscribe",
                        endpoint: e
                    }, {
                        onDone: e => {
                            e ? (this.saveEndpoint(!1), t()) : o()
                        }
                    })
                }) : Promise.reject("ERROR: can not unsubscribe")) : (this.saveEndpoint(!1), Promise.reject("ERROR: no subscription"))))
            }
            requestPermission() {
                var e = At.getPermission();
                return e === At.PUSH_NOTIFIER_PERMISSION_DEFAULT ? new Promise(function(e, t) {
                    var o = Notification.requestPermission(function(t) {
                        e(t)
                    });
                    o instanceof Promise && o.then(e, t)
                }) : Promise.resolve(e)
            }
            checkMessageState() {
                return new Promise(e => setTimeout(e, Rt)).then(() => this.action("getMessagesMetaData")).then(e => "object" == typeof e && Object.keys(e).length ? new Promise((t, o) => {
                    window.ajax.post(At.SERVER_URL, {
                        act: "a_update_messages_state",
                        data: Object.entries(e)
                    }, {
                        onDone: e => {
                            e ? t(e) : o("ERROR: act error")
                        },
                        onFail: () => (o("ERROR: network error"), !0)
                    })
                }) : Promise.resolve({})).then(e => {
                    try {
                        return JSON.parse(e)
                    } catch (e) {
                        return {}
                    }
                }).then(e => this.action("updateMessageNotifications", e)).catch(e => Object(Lt.a)(e))
            }
        }
        At.SERVER_KEY = "BPrntRk2W1_ISFwlgY-vz9tQDg9i1oSQ3-N8xyjdbNAbIOdZIGFdh5FlO7zn730UwU9Sayoec-Fpqq4JZFTyv60", At.SERVER_URL = "push_notifier", At.PUSH_NOTIFIER_PERMISSION_GRANTED = "granted", At.PUSH_NOTIFIER_PERMISSION_DEFAULT = "default", At.PUSH_NOTIFIER_PERMISSION_DENIED = "denied", At.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS = "BLOCKED_BY_BROWSER_SETTINGS", At.SUBSCRIBE_ERROR_NETWORK = "SUBSCRIBE_ERROR_NETWORK";
        var Bt = At;
        var Mt = class extends Bt {
                constructor(e, t) {
                    super(e, t), this.canBeEnabled().then(e => {
                        e && (addClass(document.head, "push_notifier_supported"), this.handlerMessagesLP = this.handlerMessagesLP.bind(this))
                    })
                }
                isSupported() {
                    return super.isSupported() && (browser.chrome || browser.mozilla)
                }
                handlerMessagesLP() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.type,
                        o = e.peerId,
                        i = e.upToId;
                    "event_read_inbound" === t && this.sw.action("removeMessageNotification", {
                        peerId: o,
                        msgId: i
                    })
                }
                handlerPopup(e, t) {
                    var o = Object(oe.b)();
                    o && Object(f.W)(o.bodyNode), this.setupSubscription().then(() => this.setState(e, t)).then(() => {
                        o && o.hide(), e ? Object(N.d)("push_notifier_subscribe_via_popup", "msg") : Object(N.d)("push_notifier_subscribe_via_popup", "all")
                    }).catch(e => {
                        Bt.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === e ? (Object(f.ub)(o().bodyNode), this.showPopupAllowNotification()) : Object(te.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                    })
                }
                closePopup() {
                    var e = Object(oe.b)();
                    e && e.hide(), Object(N.d)("push_notifier_subscribe_via_popup", "close")
                }
                showPopupAllowNotification() {
                    var e = Object(te.b)(Bt.SERVER_URL, {
                        act: "popup_allow_notification"
                    }, {
                        params: {
                            hideButtons: !0
                        },
                        containerClass: "PushNotifierPopup__popup-box_type--allow-notification",
                        onFail: () => {
                            e ? e.hide() : Object(te.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                        }
                    })
                }
                _removeLongPollListener() {
                    this.lp && this.lp.offData(this.handlerMessagesLP), this.lp = null
                }
                _addLongPollListener() {
                    !this.lp && window.Notifier && (this.lp = Notifier.getLpInstance(), this.lp && this.lp.onData(this.handlerMessagesLP))
                }
                setState(e, t) {
                    return new Promise((o, i) => {
                        ajax.post(Bt.SERVER_URL, {
                            act: "a_toggle_state",
                            state: e,
                            hash: t
                        }, {
                            onDone: e => e ? o() : i(),
                            onFail: i
                        })
                    })
                }
                update() {
                    return super.update().then(() => this._addLongPollListener())
                }
                unsubscribe(e) {
                    return super.unsubscribe(e).then(() => this._removeLongPollListener())
                }
            },
            Dt = "sw";

        function Ft(e) {
            return {
                type: Dt,
                data: e
            }
        }

        function Ht(e) {
            return ("" === e.origin || e.origin.match(/^https:\/\/([a-zA-Z0-9\-\.]+\.)?vk\.com$/)) && e.data && e.data.data && e.data.type === Dt
        }

        function Vt(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var o = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var a, d = e[Symbol.iterator](); !(i = (a = d.next()).done) && (o.push(a.value), !t || o.length !== t); i = !0);
                } catch (e) {
                    n = !0, r = e
                } finally {
                    try {
                        i || null == d.return || d.return()
                    } finally {
                        if (n) throw r
                    }
                }
                return o
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var Ut = "/js/cmodules/sw/sw.js",
            Wt = "/";
        class Gt {
            constructor() {
                this.registration = null, this._handlers = []
            }
            static addVersion(e) {
                return vk && vk.sw_version ? e + "?v=" + vk.sw_version : e
            }
            static isSupported() {
                return "serviceWorker" in navigator
            }
            register() {
                return Gt.isSupported() ? this.registration ? Promise.resolve(this.registration) : navigator.serviceWorker.register(Gt.addVersion(Ut), {
                    scope: Wt
                }).then(this._onactive.bind(this)).then(e => (this.registration || (this.registration = e, this._addEventListener(navigator.serviceWorker, "message", this._onmessage.bind(this), !1)), e)) : Promise.reject("serviceWorker is unavailable")
            }
            unregister() {
                this.registration && this.registration.unregister(), this._handlers.forEach(e => e[0].removeEventListener(e[1], e[2])), this._handlers = []
            }
            update() {
                this.registration && this.registration.update()
            }
            _addEventListener(e, t, o) {
                var i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                    n = !1;
                this._handlers.forEach(function(i) {
                    i[0] === e && i[1] === t && i[2] === o && (n = !0)
                }), n && !i || (this._handlers.push([e, t, o]), e.addEventListener(t, o))
            }
            _onactive(e) {
                return e.active ? Promise.resolve(e) : new Promise(t => {
                    this._addEventListener(e.installing, "statechange", o => {
                        "activated" === o.currentTarget.state && t(e)
                    })
                })
            }
            action_devicePixelRatio() {
                return window.devicePixelRatio
            }
            action(e, t) {
                var o = Array.isArray(e) ? e : [
                    [e, t]
                ];
                return this._message({
                    actions: o
                }).then(e => e.answers ? Promise.resolve(1 === o.length ? e.answers[0] : e.answers) : Promise.reject(new Error("ServiceWorker answer is incorrect")))
            }
            _message(e) {
                return this.register().then(() => new Promise((t, o) => {
                    var i = new MessageChannel;
                    i.port1.onmessage = function(e) {
                        Ht(e) ? t(e.data.data) : o(new Error("ServiceWorker message is incorrect"))
                    }, this.registration.active.postMessage(Ft(e), [i.port2])
                }))
            }
            _onmessage(e) {
                if (Ht(e)) {
                    var t = e.data.data;
                    if (t.actions && Array.isArray(t.actions)) {
                        var o = [];
                        t.actions.forEach(t => {
                            var i = Vt(t, 2),
                                n = i[0],
                                r = i[1],
                                a = "action_" + n;
                            o.push(Promise.resolve(this[a] ? this[a](r, e) : void 0))
                        }), Promise.all(o).then(function(t) {
                            var o = {};
                            t.forEach((e, t) => {
                                void 0 !== e && (o[t] = e)
                            }), Object.keys(o).length && e.ports[0].postMessage(Ft({
                                answers: o
                            }))
                        })
                    }
                }
            }
        }
        var qt = window.isMVK ? "mvk" : "web",
            zt = {
                start: function(e, t) {
                    if (t.stopPropagation(), t.preventDefault(), this.id = window.domData(e, "id"), this.id && (window.statlogsValueEvent("special_event", "click", qt, this.id), !this.timeoutHandle)) {
                        var o = Number(window.domData(e, "v")) || 0;
                        this.duration || (this.duration = Number(window.domData(e, "duration")) || 0), this.duration && (!this.animationData || !this.animationData.v || "number" == typeof this.v && this.v !== o ? (this.v = o, this._getAnimation().then(e => (this.animationData = JSON.parse(e), this._loadBodymovin())).then(() => this._play())) : this._play())
                    }
                },
                _getAnimation: function() {
                    return new Promise(e => {
                        var t = new XMLHttpRequest;
                        t.open("GET", `/images/stickers/special/${this.id}/animation.json?v=${this.v}`, !0), t.send(), t.onreadystatechange = (() => {
                            4 === t.readyState && e(t.responseText)
                        })
                    })
                },
                _play: function() {
                    if (window.bodymovin) {
                        this.frame || (this.frame = document.createElement("div"), this.frame.className = "special_event_frame", document.body.appendChild(this.frame)), this.frame.style.display = "block";
                        var e = window.bodymovin.loadAnimation({
                            container: this.frame,
                            renderer: "svg",
                            loop: !0,
                            autoplay: !0,
                            animationData: this.animationData
                        });
                        this.timeoutHandle = setTimeout(() => {
                            e.stop(), e.destroy(), this.frame.style.display = "none", this.timeoutHandle = null, window.statlogsValueEvent("special_event", "showed", qt, this.id)
                        }, this.duration)
                    }
                },
                _loadBodymovin: function() {
                    return new Promise(e => {
                        if (window.bodymovin) e();
                        else if (window.isMVK) {
                            var t = document.createElement("script");
                            t.src = "/js/cmodules/web/bodymovin.js", t.onload = (() => e()), document.head.appendChild(t)
                        } else stManager.add([jsc("web/bodymovin.js")], e)
                    })
                }
            },
            Kt = o("B3ia"),
            Qt = window.vk;

        function Yt() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, Qt.width = 960, Qt.started = Object(s.L)(), Qt.counts = {}, p.a.android && (Object(a.d)("remixscreen_width", window.screen.width, 365), Object(a.d)("remixscreen_height", window.screen.height, 365), Object(a.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(a.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(a.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(H.e)(), Object(C.b)(), Object(_.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(_.h)(vkCache[e].handle.elem)
            }), Object(_.b)(window, "DOMContentLoaded load", function() {
                Qt.loaded || (Qt.loaded = !0, Object(A.y)()), Object(ee.c)()
            }), Object(_.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(_.b)(document, "keydown", St.a)
        }
        var Jt = 0;

        function Xt() {
            if (window.headNode = Object(f.J)("head"), window.icoNode = Object(f.J)("link", headNode), window.bodyNode = Object(f.J)("body"), window.htmlNode = Object(f.J)("html"), window.utilsNode = Object(f.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(_.b)(bodyNode, "resize", ee.j.pbind(!1)), utilsNode) {
                p.a.mozilla ? Object(f.a)(bodyNode, "firefox") : p.a.mobile && Object(f.a)(bodyNode, "mobfixed"), Object(ce.f)(), Object(C.a)();
                var e = Object(f.F)("layer_bg"),
                    t = e.nextSibling,
                    o = Object(f.F)("box_layer_bg"),
                    i = o.nextSibling;
                window.layerBG = e, window.boxLayerBG = o, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(f.F)("stl_side"), window._stlLeft = Object(f.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, p.a.mobile || Object(Tt.a)(), Object(_.b)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, t, o, i) {
                    return window.layerQueue = R, Object(s.i)(L, {
                        show: L._show.pbind(e, t),
                        boxshow: L._show.pbind(o, i),
                        wrapshow: L._show.pbind(e),
                        hide: L._hide.pbind(e, t),
                        boxhide: L._hide.pbind(o, i),
                        wraphide: L._hide.pbind(e)
                    }), L
                }(e, t, o, i), hab.init(), window._retinaInit ? window._retinaInit() : Jt = 1, Qt.disableSW || (window.PushNotifier = Mt, window.sw = new Gt, window.sw.register().then(() => {
                    window.pushNotifier = new Mt(window.sw, Gt)
                }))
            }
        }

        function $t() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: () => cur.module,
                    getOID: () => cur.oid,
                    doesScrollTriggerIdle: !0
                })), Object(Tt.b)();
                var e = Object(f.F)("side_bar");
                window.pageNode = Object(f.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(f.O)(e, "position"), window._tbLink = Object(f.F)("top_back_link"), p.a.chrome || p.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = p.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(s.L)() - Qt.started, 10),
                    o = Object(s.r)((Qt.contlen || 1) / t * 1e3);
                p.a.mozilla && p.a.version >= 4 ? o /= 2.5 : p.a.mozilla ? o *= 1.5 : p.a.msie && p.a.version >= 7 ? o /= 1.5 : p.a.msie && (o *= 2.5);
                var i = Object(s.r)(150 * Math.max(2e6 / o, 1));
                if (C.d.highlimit = 6 * i, C.d.lowlimit = Math.min(i, 600), Object(ee.j)(), setTimeout(ee.j.pbind(!1), 0), Object(Ot.c)(), window.addEventListener("scroll", ee.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !Qt.id && I.a.checkVersion() && I.a.get("last_reloaded")) try {
                    var n = {};
                    Object(s.f)(["sound_notify_off", "im_ui_notify_off"], (e, t) => {
                        var o = I.a.get(t);
                        null !== o && (n[t] = o)
                    }), window.localStorage.clear(), Object(s.f)(n, (e, t) => I.a.set(e, t))
                } catch (e) {}
            }
        }
        class Zt {
            constructor(e, t) {
                this.count = t || 1, this.func = e
            }
            done() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                this.count -= e, this.count <= 0 && this.func()
            }
        }

        function eo(e) {
            Qt.loaded ? e() : Object(_.b)(window, "load", e)
        }

        function to() {
            window.showWriteMessageBox = we.g, window.giftsBox = we.a, window.moneyTransferBox = we.d, window.reportAd = we.e, window.mobilePromo = we.c, window.showAudioClaimWarning = we.f, window.menuSettings = we.b, window.sureDeleteAll = we.h, window.TopNotifier = Object(P.m)(), window.showPhoto = P.y, window.showManyPhoto = P.x, window.showAlbums = P.v, window.showAlbum = P.u, window.showPhotoTags = P.z, window.isPhotoeditor3Available = P.p, window.AudioMessagePlayer = P.a, window.showVideoTags = P.B, window.videoCallback = P.D, window.showWiki = P.C, window.showApp = P.w, window.showPodcast = P.A, window.podcastStartFrom = P.s, window.articlePrepare = P.b, window.isArticleLayerOpen = P.o, window.isArticleEditorAvailable = P.n, window.openArticleEditor = P.r, window.mentionOver = de, window.mentionClick = P.q, window.mobileOnlineTip = ne, window.pageVerifiedTip = re, window.audioShowActionTooltip = ae, window.shareAudioPlaylist = P.t, window.getAudioPlayer = P.k, window.deleteAudioOnClaim = P.j, window.initTopAudioPlayer = P.l, window.bookmark = P.c, window.bookmarkPost = P.i, window.bookmarkArticle = P.d, window.bookmarkLink = P.f, window.bookmarkPodcast = P.h, window.bookmarkNarrative = P.g, window.bookmarkEvent = P.e, window.bookmarkTooltip = se, window.showStory = k.c, window.showNarrative = k.b, window.storiesPreloadStatic = k.d, window.sendMask = k.a
        }
        window.constants = {
            Groups: J
        }, window.partConfigEnabled = $.a, Object(f.X)(), window.ge = f.F, window.geByTag = f.I, window.geByTag1 = f.J, window.geByClass = f.G, window.geByClass1 = f.H, window.gpeByClass = f.T, window.domQuery = f.B, window.domQuery1 = f.C, window.domClosest = f.n, window.ce = f.e, window.cf = f.f, window.re = f.fb, window.se = f.mb, window.sech = f.nb, window.rs = f.lb, window.psr = f.eb, window.domReplaceEl = f.D, window.domEL = f.t, window.domNS = f.y, window.domPS = f.A, window.domFC = f.u, window.domLC = f.x, window.domPN = f.z, window.domChildren = f.m, window.domInsertBefore = f.w, window.domInsertAfter = f.v, window.domByClass = f.j, window.domData = f.s, window.domChildIndex = f.l, window.domCA = f.k, window.domClosestSibling = f.r, window.matchesSelector = f.db, window.isHover = f.Z, window.isAncestor = f.Y, window.getScroll = f.M, window.domClosestPositioned = f.q, window.domClosestOverflowHidden = f.p, window.show = f.ub, window.hide = f.W, window.isVisible = f.ab, window.clientHeight = f.h, window.getClientRectOffsetY = f.K, window.toggle = f.vb, window.boundingRectEnabled = f.d, window.getXYRect = f.R, window.getXY = f.Q, window.isWindow = f.bb, window.getSize = f.N, window.hasClass = f.V, window.addClass = f.a, window.addClassDelayed = f.b, window.removeClass = f.hb, window.removeClassDelayed = f.ib, window.toggleClass = f.wb, window.toggleClassDelayed = f.xb, window.replaceClass = f.kb, window.getStyle = f.O, window.setStyle = f.rb, window.setStyleDelayed = f.sb, window.setPseudoStyle = f.qb, window.data = f.i, window.attr = f.c, window.removeAttr = f.gb, window.removeData = f.jb, window.cleanElems = f.g, window.setTitle = f.tb, window.getZoom = f.S, window.val = f.zb, window.elfocus = f.E, window.traverseParent = f.yb, window.getH = f.L, window.getW = f.P, window.domClosestByTag = f.o, window.setDocumentTitle = f.ob, window.lockDocumentTitle = f.cb, window.KEY = _.a, window.addEvent = _.b, window.removeEvent = _.h, window.triggerEvent = _.j, window.cancelEvent = _.c, window.stopEvent = _.i, window.normEvent = _.g, window.checkEvent = _.d, window.checkKeyboardEvent = _.e, window.checkOver = _.f, Object(s.q)(), window.isRetina = s.y, window.extractUrls = s.j, window.serializeForm = s.F, window.addTemplates = s.a, window.getTemplate = s.n, window.rand = s.D, window.irand = s.s, window.isUndefined = s.A, window.isFunction = s.v, window.isArray = s.t, window.isString = s.z, window.isObject = s.x, window.isEmpty = s.u, window.vkNow = s.L, window.vkImage = s.J, window.trim = s.H, window.stripHTML = s.G, window.escapeRE = s.h, window.intval = s.r, window.floatval = s.k, window.positive = s.C, window.isNumeric = s.w, window.winToUtf = s.M, window.replaceEntities = s.E, window.clean = s.c, window.unclean = s.I, window.each = s.f, window.indexOf = s.p, window.inArray = s.o, window.clone = s.d, window.arrayKeyDiff = s.b, window.extend = s.i, window.vkLocal = s.K, window.lTimeout = s.B, window.getCaretCharacterOffsetWithin = s.m, window.formatCount = s.l, window.encodeHtml = s.g, window.decodeHtml = s.e, Object(d.c)(), window.ajx2q = d.b, window.q2ajx = d.e, window.AjaxConvert = i, window.requestBox = d.f, window.activateMobileBox = d.a, window.validateMobileBox = d.g, window.validatePassBox = d.h, Object(a.c)(), window.getCookie = a.a, window.setCookie = a.d, window.hideCookiesPolicy = a.b, Object(Z.d)(), window.debugLog = Z.c, window.debugEl = Z.b, window.isToday = X.d, window.isYesterday = X.f, window.isTomorrow = X.e, window.isSameDate = X.c, window.leadingZero = X.g, window.formatTime = X.a, window.getServerTime = X.b, window.parseLatin = j.o, window.parseCyr = j.m, window.parseLatKeys = j.n, window.langNumeric = j.i, window.langSex = j.j, window.langStr = j.k, window.addLangKeys = j.a, window.getLang = j.d, window.langDate = j.h, window.getShortDate = j.e, window.getShortDateOrTime = j.f, window.langWordNumeric = j.l, window.getDateText = j.c, window.getBigDateNew = j.b, window.getSmDate = j.g, window.scrollToY = E.g, window.scrollToTop = E.f, window.scrollGetX = E.d, window.scrollGetY = E.e, window.disableBodyScroll = E.a, window.enableBodyScroll = E.b, window.Chat = ce.a, window.__qlTimer = null, window.__qlClear = ce.b, window.onLoginDone = ce.m, window.onLoginFailed = ce.n, window.onLoginCaptcha = ce.l, window.onLoginReCaptcha = ce.o, window.storePasswordCredential = ce.p, window.cssAnim = ce.c, window.imagesLoader = ce.e, window.nodeUpdated = ce.k, window.hideNewsAnnounce = ce.d, window.leftAdBlockClose = ce.h, window.leftBlockToggleFriend = ce.j, window.leftBlockFriendTooltip = ce.i, window.placeholderSetup = Et.c, window.placeholderInit = Et.b, window.isInputActive = Et.a, window.showTooltip = ie.c, window.showTitle = ie.b, window.showHint = ie.a, window.topMsg = r.d, window.showMsg = r.b, window.topError = r.c, window.showGlobalPrg = r.a, window.checkTextLength = le.b, window.getSelectionText = le.c, window.goAway = le.d, window.debounce = kt.a, window.hashCode = le.f, window.isFullScreen = le.g, window.parallel = le.j, window.parseJSON = le.k, window.shuffle = le.l, window.throttle = le.m, window.toggleOnline = le.p, window.updateMoney = le.r, window.onlinePlatformClass = le.i, window.Fx = g.a, window.fx = g.a, window.animate = g.b, window.cubicBezier = g.d, window.fadeTo = g.g, window.genFx = g.i, window.getRGB = g.k, window.getColor = g.j, window.slideDown = g.l, window.slideUp = g.n, window.slideToggle = g.m, window.fadeIn = g.e, window.fadeOut = g.f, window.fadeToggle = g.h, window.animateCount = g.c, window.updateAriaElements = Ot.c, window.updateAriaCheckboxes = Ot.b, window.hasAccessibilityMode = Ot.a, window.cancelStackFilter = T.a, window.cancelStackPush = T.c, window.cancelStackPop = T.b, Object(Kt.a)(), window.ElementTooltip = b.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = m, 1 === Qt.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== Qt.al || history.pushState || (Qt.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), Qt.version = !1), Object(C.c)(), window.stManager = C.d, Object(p.c)(), window.browser = p.a, window.mobPlatforms = p.d, window.browserFeatures = p.b, Object(v.a)(), window.toggleFlash = v.c, window.renderFlash = v.b, Yt(), window.updateHeaderStyles = H.i, window.updateNarrow = ee.m, window.checkPageBlocks = ee.c, window.redraw = ee.l, window.onBodyResize = ee.j, window.onBodyScroll = ee.k, window.leftBlockOver = ee.i, window.leftBlockOut = ee.h, window.leftBlockHide = ee.g, window.onDocumentClick = St.c, window.onEnter = St.d, window.onCtrlEnter = St.b, window.logLeftMenuClicks = N.a, window.autosizeSetup = ee.b, window.getProgressBarEl = ee.e, window.getProgressHtml = ee.f, Object(Pt.b)(), Y(), window.onDomReady = (e => e()), window.currentModule = (() => cur.currentModule ? cur.currentModule() : cur.module), window.hab = O(), window.ls = I.a, window.shortCurrency = x, window.statlogsValueEvent = N.d, window.saveSearchAttemptStats = N.c, window.removeSearchPositionTracker = N.b, window.callHub = Zt, window.CallHub = Zt, window.gSearch = new M, window.zNav = H.l, window.handlePageView = H.d, window.handlePageParams = H.c, window.handlePageCount = H.b, window.updateOtherCounters = H.k, window.processDestroy = H.f, window.globalHistoryDestroy = H.a, window.showBackLink = H.h, window.nav = F.a, nav.init(), Qt.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === t[1] && 12 === Qt.time[1] ? Qt.time[1] = 0 : 12 === t[1] && 1 === Qt.time[1] ? t[1] = 0 : (t[1] > Qt.time[1] + 1 || Qt.time[1] > t[1] + 1) && (t[1] = Qt.time[1] = t[2] = Qt.time[2] = 0), t[1] > Qt.time[1] && 1 === t[2] ? 31 === Qt.time[2] || (4 === Qt.time[1] || 6 === Qt.time[1] || 9 === Qt.time[1] || 11 === Qt.time[1]) && 30 === Qt.time[2] || 2 === Qt.time[1] && (29 === Qt.time[2] || 28 === Qt.time[2] && Qt.time[0] % 4) ? Qt.time[2] = 0 : Qt.time[2] = t[2] = 0 : Qt.time[1] > t[1] && 1 === Qt.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && Qt.time[0] % 4) ? t[2] = 0 : t[2] = Qt.time[2] = 0), (t[2] > Qt.time[2] + 1 || Qt.time[2] > t[2] + 1) && (t[2] = Qt.time[2] = 0);
            var o = 60 * (60 * (24 * (t[2] - Qt.time[2]) + (t[3] - Qt.time[3])) + (t[4] - Qt.time[4]));
            o < -55800 ? o += 86400 : o > 37800 && (o -= 86400);
            var i = new Date,
                n = Date.UTC(i.getFullYear(), i.getMonth(), i.getDate(), i.getHours(), i.getMinutes(), i.getSeconds()) / 1e3 - Object(X.b)();
            n -= 10800, n = (n /= 60).toFixed(0), (n *= 60) < -55800 ? n += 86400 : n > 37800 && (n -= 86400);
            var r = 0,
                d = Math.abs(n);
            Object(s.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], (e, t) => {
                var o = Math.round(3600 * (t - 3)),
                    i = Math.abs(n - o);
                i < d && (d = i, r = o)
            });
            var w = 0,
                c = Math.abs(o);
            Object(s.f)([-12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2, -1, 0, 1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12, 12.75, 13, 14], (e, t) => {
                var i = Math.round(3600 * (t - 3)),
                    n = Math.abs(o - i);
                n < c && (c = n, w = i)
            }), Object(N.d)("timeoffset_new_method", 1, w, r), Object($.a)("timezone_new_method") ? Qt.dt = r : Qt.dt = w, Object(a.a)("remixdt") !== Qt.dt && Object(a.d)("remixdt", Qt.dt, 365);
            var l = Object(s.r)(Object(a.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!p.a.iphone || Object(a.a)("remixme")) ? 1 & l || (Object(a.d)("remixrt", 1 | l, 365), window._retinaInit = function() {
                C.d.add(["retina.css"]), Object(f.a)(document.body, "is_2x")
            }, Jt && window._retinaInit()) : 1 & l && Object(a.d)("remixrt", 1 ^ l, 365)
        }, 0), window.boxQueue = Object(oe.c)(), window.__bq = boxQueue, window.curBox = oe.b, Object(oe.d)(), window.boxRefreshCoords = oe.a, window.MessageBox = te.a, window.showBox = te.b, window.showTabbedBox = te.f, window.showFastBox = te.d, window.showCaptchaBox = te.c, window.showReCaptchaBox = te.e, window.showDoneBox = oe.e, window.TopMenu = ee.a, window.TopSearch = D.a, window.handleScroll = le.e, window.loadScript = B.a, window.SpecialEvent = zt, Object(A.j)(), window.notaBene = A.q, window.updSideTopLink = A.y, window.createButton = A.d, window.actionsMenuItemLocked = A.a, window.lockActionsMenuItem = A.n, window.unlockActionsMenuItem = A.v, window.linkLocked = A.m, window.lockLink = A.p, window.unlockLink = A.x, window.lockButton = A.o, window.unlockButton = A.w, window.buttonLocked = A.b, window.isButtonLocked = A.k, window.disableButton = A.f, window.sbWidth = A.t, window.isChecked = A.l, window.checkbox = A.c, window.disable = A.e, window.radioval = A.s, window.radiobtn = A.r, window.showProgress = A.u, window.hideProgress = A.i, window.disableEl = A.g, window.enableEl = A.h, Object(S.d)(), window.VideoConstants = S.a, window.showVideo = S.j, window.showInlineVideo = S.i, window.loadInlineVideo = S.e, window.revertLastInlineVideo = S.h, window.destroyInlineVideoPlayer = S.c, window.pauseLastInlineVideo = S.f, window.playLastInlineVideo = S.g, window.checkMp4 = S.b, window.performance && window.performance.memory && Object(s.D)(0, 100) < 5 && Object(jt.a)(), Be ? (Object(_.b)(window, "blur", et), Object(_.b)(window, "focus", tt), onDomReady(() => setTimeout(Ye, 500)), window.LongView = {
            register: Xe,
            onScroll: Object(le.m)($e, 50),
            onBeforePageChange: ot,
            clearElemsCache: Je,
            _debug: function() {
                return {
                    started: De,
                    tracking: Me,
                    viewedData: Fe,
                    viewIndexes: Qe,
                    blindTop: Ve,
                    blindBottom: Ue
                }
            }
        }) : window.LongView = {
            register: () => {},
            onScroll: () => {},
            onBeforePageChange: () => {},
            clearElemsCache: () => {}
        }, Object(ce.g)(), to(), window.onLoaded = eo, window.domStarted = Xt, window.domReady = $t, Object(Z.c)("common module enabled"), C.d.done(jsc("web/common_web.js"))
    }
});