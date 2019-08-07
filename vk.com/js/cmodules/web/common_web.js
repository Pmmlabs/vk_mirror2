! function(e) {
    function o(o) {
        for (var i, a, d = o[0], s = o[1], w = o[2], l = 0, u = []; l < d.length; l++) a = d[l], n[a] && u.push(n[a][0]), n[a] = 0;
        for (i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i]);
        for (c && c(o); u.length;) u.shift()();
        return r.push.apply(r, w || []), t()
    }

    function t() {
        for (var e, o = 0; o < r.length; o++) {
            for (var t = r[o], i = !0, d = 1; d < t.length; d++) {
                var s = t[d];
                0 !== n[s] && (i = !1)
            }
            i && (r.splice(o--, 1), e = a(a.s = t[0]))
        }
        return e
    }
    var i = {},
        n = {
            "web/common_web": 0
        },
        r = [];

    function a(o) {
        if (i[o]) return i[o].exports;
        var t = i[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(t.exports, t, t.exports, a), t.l = !0, t.exports
    }
    a.m = e, a.c = i, a.d = function(e, o, t) {
        a.o(e, o) || Object.defineProperty(e, o, {
            enumerable: !0,
            get: t
        })
    }, a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, a.t = function(e, o) {
        if (1 & o && (e = a(e)), 8 & o) return e;
        if (4 & o && "object" == typeof e && e && e.__esModule) return e;
        var t = Object.create(null);
        if (a.r(t), Object.defineProperty(t, "default", {
                enumerable: !0,
                value: e
            }), 2 & o && "string" != typeof e)
            for (var i in e) a.d(t, i, function(o) {
                return e[o]
            }.bind(null, i));
        return t
    }, a.n = function(e) {
        var o = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return a.d(o, "a", o), o
    }, a.o = function(e, o) {
        return Object.prototype.hasOwnProperty.call(e, o)
    }, a.p = "";
    var d = window.webpackJsonp = window.webpackJsonp || [],
        s = d.push.bind(d);
    d.push = o, d = d.slice();
    for (var w = 0; w < d.length; w++) o(d[w]);
    var c = s;
    r.push([82, "bundles/audioplayer", "bundles/common"]), t()
}({
    82: function(e, o, t) {
        e.exports = t("g42W")
    },
    g42W: function(e, o, t) {
        "use strict";
        t.r(o);
        t("pIFo"), t("OG14"), t("SRfc"), t("NO8f");
        ! function(e) {
            var o = e.HTMLCanvasElement && e.HTMLCanvasElement.prototype,
                t = e.Blob && function() {
                    try {
                        return Boolean(new Blob)
                    } catch (e) {
                        return !1
                    }
                }(),
                i = t && e.Uint8Array && function() {
                    try {
                        return 100 === new Blob([new Uint8Array(100)]).size
                    } catch (e) {
                        return !1
                    }
                }(),
                n = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder,
                r = /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
                a = (t || n) && e.atob && e.ArrayBuffer && e.Uint8Array && function(e) {
                    var o, a, d, s, w, c, l, u, h;
                    if (!(o = e.match(r))) throw new Error("invalid data URI");
                    for (a = o[2] ? o[1] : "text/plain" + (o[3] || ";charset=US-ASCII"), d = !!o[4], s = e.slice(o[0].length), w = d ? atob(s) : decodeURIComponent(s), c = new ArrayBuffer(w.length), l = new Uint8Array(c), u = 0; u < w.length; u += 1) l[u] = w.charCodeAt(u);
                    return t ? new Blob([i ? l : c], {
                        type: a
                    }) : ((h = new n).append(c), h.getBlob(a))
                };
            e.HTMLCanvasElement && !o.toBlob && (o.mozGetAsFile ? o.toBlob = function(e, t, i) {
                e(i && o.toDataURL && a ? a(this.toDataURL(t, i)) : this.mozGetAsFile("blob", t))
            } : o.toDataURL && a && (o.toBlob = function(e, o, t) {
                e(a(this.toDataURL(o, t)))
            })), "function" == typeof define && define.amd ? define(function() {
                return a
            }) : "object" == typeof module && module.exports ? module.exports = a : e.dataURLtoBlob = a
        }(window);
        t("uQjJ"), t("rGqo"), t("Btvt");

        function i(e) {
            e && !e.prototype.forEach && (Array.prototype.forEach ? e.prototype.forEach = Array.prototype.forEach : e.prototype.forEach = function(e, o) {
                o = o || window;
                for (var t = 0; t < this.length; t++) e.call(o, this[t], t, this)
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
                o = Array.prototype.slice.call(arguments),
                t = o.shift(),
                i = o.shift();
            return function() {
                var n = Array.prototype.slice.call(arguments);
                return e.apply(t, o.concat(n)), i
            }
        }, Function.prototype.bind || (Function.prototype.bind = function() {
            var e = this,
                o = Array.prototype.slice.call(arguments),
                t = o.shift();
            return function() {
                var i = Array.prototype.slice.call(arguments);
                return e.apply(t, o.concat(i))
            }
        }), Object.keys || (Object.keys = function(e) {
            var o = [];
            for (var t in e) e.hasOwnProperty(t) && o.push(t);
            return o
        }), i(window.NodeList), i(window.HTMLCollection);
        var n = t("ryw6"),
            r = t("kMSP"),
            a = t("Kngp"),
            d = t("cGUQ"),
            s = t("gdug"),
            w = t("k487"),
            c = t("zxIV");

        function l(e, o) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || o)) {
                var t = Object(c.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(t, icoNode), icoNode = t
            }
        }
        var u = t("HhI8"),
            h = t("7jxN"),
            b = (t("rE2o"), t("ioFf"), t("a1Th"), t("KKXr"), t("Egk5")),
            p = t("t7n3");

        function f(e, o) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, o) {
                var t = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var a, d = e[Symbol.iterator](); !(i = (a = d.next()).done) && (t.push(a.value), !o || t.length !== o); i = !0);
                } catch (e) {
                    n = !0, r = e
                } finally {
                    try {
                        i || null == d.return || d.return()
                    } finally {
                        if (n) throw r
                    }
                }
                return t
            }(e, o) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function m() {
            return new function(e) {
                var o, t = function(e) {
                        var o = f(e.split("#"), 2),
                            t = o[0],
                            i = o[1],
                            n = f(t.split("?"), 2),
                            r = n[0],
                            a = n[1];
                        return r + (a ? "?" + Object(d.toQueryString)(Object(d.fromQueryString)(a)) : "") + (i ? "#" + i : "")
                    },
                    i = Object(p.i)({
                        onLocChange: () => {}
                    }, e),
                    n = function() {
                        var e = "";
                        return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), t(e.replace(/^(\/|!)/, ""))
                    },
                    r = n(),
                    a = function(e) {
                        var o = n();
                        o === r && !0 !== e || (i.onLocChange(o), r = o)
                    };
                return {
                    setLoc: function(e) {
                        r = t(e);
                        var o = (location.toString().match(/#(.*)/) || {})[1] || "";
                        if (!o && vk.al > 1 && (o = (location.pathname || "") + (location.search || "")), (o = (o = t(o)).replace(/^(\/|!)/, "")) !== r) {
                            if (3 == vk.al) try {
                                return window.saveScrollTopOnBack && (delete window.saveScrollTopOnBack, history.replaceState({
                                    scrollTop: window.lastScrollTop,
                                    preventScroll: window.preventLocationScroll
                                }, "", `/${o}`), window.preventLocationScroll && delete window.preventLocationScroll), void history.pushState({}, "", `/${r}`)
                            } catch (e) {}
                            window.chHashFlag = !0, location.hash = "#" + vk.navPrefix + r
                        }
                    },
                    getLoc: n,
                    init: function() {
                        1 == vk.al && a(!0), 3 == vk.al ? (Object(b.b)(window, "popstate", a), s.a.safari && Object(b.b)(window, "hashchange", a)) : "onhashchange" in window ? Object(b.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : a()
                        }) : o = setInterval(a, 200)
                    },
                    setOptions: function(e) {
                        i = Object(p.i)(i, e)
                    },
                    checker: a,
                    stop: function() {
                        vk.al < 3 ? clearInterval(o) : 3 == vk.al && Object(b.h)(window, "popstate", a)
                    }
                }
            }({
                onLocChange: function(e) {
                    var o = {
                        back: !0,
                        hist: !0
                    };
                    3 === vk.al && history.state && Object(p.x)(history.state) && (o.scrollTop = Object(p.r)(history.state.scrollTop)), nav.go("/" + e, void 0, o)
                }
            })
        }
        var v = t("4+be"),
            g = t("lXE5"),
            _ = t("Ia1d"),
            y = t("XuKo"),
            O = t("ErRf"),
            j = t("/PiP"),
            E = {
                sh: function(e, o) {
                    Object(c.ub)(e), Object(p.v)(o) && o()
                },
                hd: function(e, o) {
                    Object(c.W)(e), Object(p.v)(o) && o()
                },
                visible: !1,
                _show: function(e, o, t, i) {
                    var n = "layers" + (boxQueue.count() + 1);
                    Object(O.c)(n, function() {}), Object(c.rb)(e, {
                        opacity: t || "",
                        backgroundColor: i || ""
                    }), E.visible || (Object(u.c)(), Object(g.a)()), E.visible || Object(_.f)(), E.visible = !0, Object(c.a)(bodyNode, "layers_shown"), o.visibilityHide ? Object(c.hb)(o, "box_layer_hidden") : Object(c.ub)(o), E.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, o) {
                    E.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(O.a)(e), o && o.visibilityHide ? Object(c.a)(o, "box_layer_hidden") : Object(c.W)(o), Object(c.ab)(layerWrap) || cur._inLayer || Object(c.ab)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(c.ab)(window.mvLayerWrap)) || Object(c.ab)(window.wkLayerWrap) || (E.visible = !1, Object(c.hb)(bodyNode, "layers_shown"), Object(u.c)(!0), Object(g.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), E.visible || Object(_.g)()
                }
            },
            S = {
                push: function(e) {
                    var o, t = !!S.count() && S._layers[S._layers.length - 1];
                    if (cur.pvShown && "temp" != cur.pvListId) o = ["photo", cur.pvData[cur.pvListId][cur.pvIndex].id, cur.pvListId, {
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
                        VideoPlaylist.getCurListId() && (n = Object(p.i)(n, {
                            playlistId: VideoPlaylist.getCurListId(),
                            module: Videoview.getVideoModule(),
                            addParams: {
                                force_no_repeat: 1,
                                show_next: 1
                            }
                        })), o = ["video", mvcur.videoRaw, mvcur.listId, n]
                    } else if (window.wkcur && wkcur.shown) o = ["wiki", wkcur.wkRaw, !1, {
                        toScroll: wkLayerWrap.scrollTop,
                        prevLoc: wkcur.prevLoc,
                        myLoc: wkcur.myLoc,
                        onHide: wkcur.onHide
                    }];
                    else if (cur.storyLayer) o = ["stories", cur.storyLayer.getList()];
                    else {
                        if (!cur.podcastEpisode || !cur.podcastEpisode.shown) return !1;
                        o = ["podcast", cur.podcastEpisode.getEpisodeId()]
                    }
                    return t && o[0] == t[0] && o[1] == t[1] && o[2] == t[2] || S._layers.push(o), S.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = S._layers, o = e.length; o > 0; --o) "photo" === e[o - 1][0] ? e[o - 1][3].noHistory = 1 : "video" === e[o - 1][0] && (e[o - 1][3].noHistory = 1)
                },
                hide: function() {
                    S._bl = !0, window.WkView && E.fullhide == WkView.hide ? (Object(c.W)(wkLayerWrap), clearTimeout(wkcur.showT)) : E.fullhide && E.fullhide(!0, !0), setTimeout(S.unblock, 5)
                },
                unblock: function() {
                    S._bl = !1
                },
                pop: function() {
                    if (S.count() && !S._bl) {
                        var e = S._layers.pop();
                        if (S.skipVideo && (S.skipVideo = !1, "video" == e[0])) return S._layers.push(e), void(S.skipVideo = !1);
                        "photo" === e[0] ? (Object(p.i)(e[3], {
                            fromQueue: !0
                        }), Object(j.y)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(p.i)(e[3], {
                            fromQueue: !0
                        }), Object(_.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(j.C)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(y.c)(e[1]) : "podcast" === e[0] && Object(j.A)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, o, t, i) {
                    for (var n = S._layers, r = n.length; r > 0; --r)
                        if (n[r - 1][0] == e && n[r - 1][1] == o || n[r - 1][0] == t && n[r - 1][1] == i) return S._layers = n.slice(0, r), S.pop(), !0;
                    return !1
                },
                count: function() {
                    return S._layers.length
                },
                clear: function() {
                    S._layers = []
                },
                _layers: []
            };
        var k = t("Xrg9");

        function T() {
            var e = {};
            Object(p.f)(Object(c.G)("_short_currency"), function() {
                var o = Object(c.s)(this, "short") || "";
                if (!o) return !0;
                var t = this.innerHTML,
                    i = Object(p.M)(t).length,
                    n = Object(c.O)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[n]) {
                    for (var r = "", a = i - 1; a >= 0; a--) r += "&#8399;";
                    var d = Object(c.e)("div", {
                        innerHTML: `<b>${t}</b><b>${r}</b>`
                    }, {
                        fontFamily: n,
                        fontSize: "24px"
                    });
                    Object(c.F)("utils").appendChild(d), e[n] = Math.abs(d.firstChild.offsetWidth - d.lastChild.offsetWidth) >= 2 * i, Object(c.fb)(d)
                }!1 === e[n] && Object(c.zb)(this, o)
            })
        }
        var P = t("0gG3"),
            L = t("XzvV"),
            R = t("v+DW"),
            I = t("lkNA");
        var x = class {
                constructor() {
                    var e = window.CallHub;
                    this.on = 0, this.hub = new e(() => {
                        this.onShow && this.onShow()
                    }, 2), this.hintsHub = new e(() => this.showStartHints(), 2)
                }
                load() {
                    Object(c.F)("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", () => this.hub.done()), ajax.post("hints.php", {
                        act: "a_start_hints"
                    }, {
                        onDone: e => {
                            this.startHintsText = Object(p.H)(e), this.hintsHub.done()
                        }
                    }))
                }
                show(e) {
                    var o = window.placeholderSetup;
                    if (Object(c.F)("quick_search") && !this.on) return this.on = 1, Object(c.ub)(this.sCont), o("search_input"), Object(c.F)("search_input").setAttribute("autocomplete", "off"), Object(c.a)(Object(c.F)("qsearch_link"), "active"), this.prev_content = Object(c.F)("content"), this.qsearch_cont || (this.qsearch_cont = Object(c.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(b.c)(e) : void 0
                }
                go(e) {
                    var o = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(p.H)(Object(c.F)("search_input").value) + "&name=1";
                    return Object(b.c)(e || window.event), location.href = o, !1
                }
                init(e) {
                    this.sCont = Object(c.F)("quick_search"), this.opt = e || {}
                }
                hide(e, o) {
                    if (Object(c.F)("quick_search") && (!this.active || o) && this.on) {
                        var t = window.toggleFlash;
                        if (this.on = 0, t(), this.beforeHide && this.beforeHide()) return !0;
                        Object(c.F)("search_input").setValue ? Object(c.F)("search_input").setValue("") : Object(c.F)("search_input").value = "", Object(c.W)(this.sCont), Object(c.hb)(Object(c.F)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }
                preload() {}
            },
            C = t("Bszp"),
            N = t("MSYF"),
            B = t("kHqu");

        function A(e, o) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, o) {
                var t = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var a, d = e[Symbol.iterator](); !(i = (a = d.next()).done) && (t.push(a.value), !o || t.length !== o); i = !0);
                } catch (e) {
                    n = !0, r = e
                } finally {
                    try {
                        i || null == d.return || d.return()
                    } finally {
                        if (n) throw r
                    }
                }
                return t
            }(e, o) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var M = "remixjsp";

        function D() {
            ! function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("paint").forEach(e => {
                    "first-contentful-paint" === e.name && W(e.startTime, "TTFCP")
                })
            }(),
            function() {
                var e = window.performance;
                e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(e => {
                    if ("navigation" === e.initiatorType) {
                        var o = e.domComplete,
                            t = e.domContentLoadedEventEnd,
                            i = e.loadEventEnd;
                        W(o, "domComplete"), W(t, "domContentLoadedEventEnd"), W(i, "loadEventEnd")
                    }
                })
            }(), V()
        }
        var F = [],
            H = !1;

        function V() {
            if (H) {
                var e = window.performance,
                    o = F[F.length - 1];
                if (!o) return H = !1, void W(-1);
                var t = o.startTime + o.duration;
                e.now() - t >= 3e3 ? W(t, "TTI") : setTimeout(V, 3e3)
            }
        }
        var U = [];

        function W(e, o) {
            var t = Math.floor(e);
            if (-1 !== e && (U.push([t, o]), !(H ? "TTI" === o : U.length > 2))) return;
            var i = "unknown",
                n = navigator.connection;
            n && n.effectiveType && (i = n.effectiveType);
            var a = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            U.forEach(e => {
                var o = A(e, 2),
                    t = o[0],
                    n = o[1];
                return a.events.push([n, t, cur.module, i, window.vk.rv])
            }), Object(r.d)(M, JSON.stringify(a), .01)
        }

        function G() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(e => {
                F = F.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), H = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout(D, 0)
            }) : D()
        }
        var q = {
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
            z = t("1BRX"),
            K = t("W9Tc"),
            Q = t("98sY"),
            Y = t("El3O"),
            J = t("EasH"),
            X = t("kcIO"),
            $ = t("MiCK"),
            Z = t("Ieup"),
            ee = t("FWc3"),
            oe = t("t/FQ"),
            te = t("aong"),
            ie = .5,
            ne = .25,
            re = 300,
            ae = 1e3,
            de = 3e5,
            se = 2500,
            we = 5e3,
            ce = 6e3,
            le = 2e4,
            ue = 1e3,
            he = 36e4,
            be = "_longViewType",
            pe = "_longViewIdled",
            fe = "_longViewModule",
            me = "_longViewStarted",
            ve = "_longViewProcessed",
            ge = "_longViewCached",
            _e = "_longViewHeight",
            ye = "_longViewTop",
            Oe = "_longViewBottom",
            je = "REGULAR",
            Ee = "AUTOPLAY_AD",
            Se = "LongView.viewed",
            ke = "LongView.idled",
            Te = vk.longViewTestGroup,
            Pe = [],
            Le = [],
            Re = [],
            Ie = Date.now(),
            xe = 0,
            Ce = 0,
            Ne = !1,
            Be = null,
            Ae = null,
            Me = null,
            De = null,
            Fe = {};

        function He() {
            var e = ro();
            e.length && (oo(e), ao())
        }

        function Ve() {
            Pe.forEach(function(e) {
                e[ge] = !1
            })
        }

        function Ue(e, o) {
            "im" === o && !e[be] && function(e) {
                if (Object(c.V)(e, "im-mess--post")) return !0;
                var o = e && Object(c.u)(e);
                return !(!o || "ads_feed_placeholder" === o.getAttribute("id") || Object(c.V)(e, "no_posts"))
            }(e) && (e[be] = function(e) {
                var o = e && Object(c.u)(e);
                return o && o.hasAttribute("data-ad-video-autoplay") ? Ee : je
            }(e), e[fe] = o, Pe.push(e))
        }

        function We(e, o) {
            var t = We;
            ! function(e, o) {
                var t = [];
                Pe.forEach(function(i) {
                    uo(i) ? t.push(i) : ! function(e, o, t) {
                        return !e[me] && wo(e, ie, o, t)
                    }(i, e, o) ? function(e, o, t) {
                        return e[me] && !wo(e, ne, o, t)
                    }(i, e, o) && (i[pe] ? delete i[pe] : (ho(Le, i), Re = Re.concat(lo(i))), delete i[me]) : (i[me] = Date.now(), Le.push(i))
                }), t.forEach(function(e) {
                    ho(Pe, e)
                })
            }(e || Object(g.e)(), o || window.innerHeight), Ne ? (clearTimeout(t.timer), t.timer = setTimeout(Ge, 150)) : (Ne = !0, Ye(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(c.H)("im-page--chat-header"),
                        o = Object(c.H)("im-page--chat-input");
                    xe = e.getBoundingClientRect().top + e.offsetHeight, Ce = window.innerHeight - o.getBoundingClientRect().top
                } else xe = Object(c.F)("page_header").offsetHeight, Ce = 0
            }())
        }

        function Ge() {
            Ye(), Qe(), Ne = !1
        }

        function qe() {
            Ye(), eo()
        }

        function ze() {
            Re = [], Le.forEach(e => e[me] = Date.now()), to(null), io(null), Qe()
        }

        function Ke() {
            Ye(), eo(), Re = [], Le = [], to(null), io(null)
        }

        function Qe() {
            Be = setTimeout(Je, se), Ae = setTimeout(Xe, we), Me = setTimeout($e, ce), De = setTimeout(Ze, le)
        }

        function Ye() {
            clearTimeout(Be), clearTimeout(Ae), clearTimeout(Me), clearTimeout(De)
        }

        function Je() {
            Re.length && to(Re)
        }

        function Xe() {
            oo(Re), Re = [], to(null)
        }

        function $e() {
            Le.length && (io(co(Le, !0, !0)), Me = setTimeout($e, ue))
        }

        function Ze() {
            clearTimeout(Me), oo(co(Le)), Le.forEach(e => e[pe] = !0), Le = [], io(null)
        }

        function eo() {
            oo(Re.concat(co(Le)))
        }

        function oo(e) {
            e && e.length && ajax.post("/al_page.php", {
                act: "seen",
                data: function(e) {
                    var o = {};
                    e.forEach(function(e) {
                        var t = e.ownerId,
                            i = "ad" === t ? "" : ":" + e.duration + ":" + e.index;
                        o[t] || (o[t] = []), o[t].push(e.module + e.postId + i + (e.sessionId ? ":" + e.sessionId : "") + (e.q ? ":" + e.q : "") + ":" + e.viewIndex)
                    });
                    var t = [];
                    return Object(p.f)(o, (e, o) => t.push(e + "_" + o.join(","))), t.join(";")
                }(e),
                long_view: 1
            })
        }

        function to(e) {
            no(Se, e)
        }

        function io(e) {
            no(ke, e)
        }

        function no(e, o) {
            var t = k.a.get(e) || {};
            o ? t[Ie] = o : delete t[Ie], k.a.set(e, t)
        }

        function ro() {
            var e = ro,
                o = [],
                t = k.a.get(Se) || {},
                i = k.a.get(ke) || {};
            return e.iterator || (e.iterator = (e => t => {
                so(t) && (o = o.concat(e[t]))
            })), Object.keys(t).forEach(e.iterator(t)), Object.keys(i).forEach(e.iterator(i)), o
        }

        function ao() {
            var e = ao,
                o = k.a.get(Se) || {},
                t = k.a.get(ke) || {};
            e.iterator || (e.iterator = (e => o => {
                so(o) && delete e[o]
            })), Object.keys(o).forEach(e.iterator(o)), Object.keys(t).forEach(e.iterator(t)), k.a.set(Se, o), k.a.set(ke, t)
        }

        function so(e) {
            var o = Number(e);
            return o !== Ie && Date.now() - o >= he
        }

        function wo(e, o, t, i) {
            if (!e) return !1;
            e[ge] || (e[ge] = !0, e[_e] = e.offsetHeight, e[ye] = t + e.getBoundingClientRect().top, e[Oe] = e[ye] + e[_e]);
            var n = i - xe - Ce,
                r = t + xe,
                a = t + i - Ce,
                d = e[_e],
                s = e[ye],
                w = e[Oe];
            return (w > r && s < a ? Math.min(a, w) - Math.max(r, s) : 0) >= Math.min(n * o, d * o)
        }

        function co(e, o, t) {
            return e.map(e => lo(e, o, t))
        }

        function lo(e, o, t) {
            if (uo(e)) return [];
            var i = Math.min(de, Date.now() - e[me]);
            if (e[be] === je && i < re || e[be] === Ee && i < ae) return [];
            t || (e[ve] = !0);
            var n = function(e) {
                    var o = e[fe];
                    if ("im" === o) {
                        var t = Object(c.c)(e, "data-post-id"),
                            i = Object(c.c)(e, "data-copy"),
                            n = {
                                index: -1,
                                module: "im"
                            };
                        return t && (n[t] = -1), i && (n[i] = -1), n
                    }
                    try {
                        return window[o].postsGetRaws(e)
                    } catch (o) {
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
                        l = w[0],
                        u = w[1];
                    "ads" === l && (u = w[3]), /^post\d+$/.test(l) && (l = w[1], u = w[2]);
                    var h = void 0;
                    o || (Fe[h = l + "_" + u] || (Fe[h] = 0), Fe[h]++), d.push("ad" === l ? {
                        ownerId: "ad",
                        postId: u,
                        module: r,
                        viewIndex: Fe[h]
                    } : "ads" === l ? {
                        ownerId: "ads",
                        postId: u,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        viewIndex: Fe[h]
                    } : {
                        ownerId: l,
                        postId: (1 === n[s] ? "" : "-") + u,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        q: n.q || null,
                        viewIndex: Fe[h]
                    })
                }
            return d
        }

        function uo(e) {
            return "page_view" === Te && e[ve] || !document.body.contains(e)
        }

        function ho(e, o) {
            var t = e.indexOf(o);
            t >= 0 && e.splice(t, 1)
        }
        var bo = t("QGEU"),
            po = t("eNQP"),
            fo = t("o7bv"),
            mo = t("wetz"),
            vo = t("BJj/"),
            go = t("i6oL"),
            _o = t("m0N1");
        t("VRzm"), t("/8Fb");
        var yo = t("W0P9"),
            Oo = 5e3,
            jo = "push_notifier_endpoint",
            Eo = "push_notifier_subscribed_ts",
            So = 6e4,
            ko = 432e6;
        class To {
            constructor(e, o) {
                this.sw = e, this.SWClient = o, vk.id && this.canBeEnabled().then(e => {
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
                return k.a.get(jo + vk.id) || !1
            }
            saveEndpoint(e) {
                k.a.set(jo + vk.id, e || !1)
            }
            action(e, o) {
                return this.sw.action(e, o)
            }
            _needupdate(e) {
                var o = Date.now(),
                    t = this.loadEndpoint(),
                    i = k.a.get(Eo + vk.id),
                    n = !1;
                return (t !== e.endpoint || !i || o - i > So) && (k.a.set(Eo + vk.id, o), n = !0), n
            }
            listenPermission() {
                Object(K.a)("push_notifier") && navigator.permissions && navigator.permissions.query && navigator.permissions.query({
                    name: "notifications"
                }).then(e => {
                    e.onchange = (() => this.update())
                })
            }
            update() {
                return this.updatePermission().then(e => e === To.PUSH_NOTIFIER_PERMISSION_GRANTED ? this.subscribe().catch(e => {
                    e !== To.SUBSCRIBE_ERROR_NETWORK && e("can not update subscribe")
                }) : Promise.reject("premession_not_granted")).catch(yo.a)
            }
            updatePermission() {
                var e = To.getPermission();
                if (e !== To.PUSH_NOTIFIER_PERMISSION_GRANTED) {
                    var o = this.loadEndpoint();
                    if (o) return this.unsubscribe(o).then(() => e)
                }
                return Promise.resolve(e)
            }
            processSubscribe(e) {
                return e.subscribe({
                    userVisibleOnly: !0,
                    applicationServerKey: function(e) {
                        for (var o = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), t = window.atob(o), i = new Uint8Array(t.length), n = 0; n < t.length; ++n) i[n] = t.charCodeAt(n);
                        return i
                    }(To.SERVER_KEY)
                })
            }
            setupSubscription() {
                return new Promise((e, o) => {
                    var t = To.getPermission(),
                        i = () => {
                            this.subscribe(!0).then(() => {
                                e()
                            }).catch(() => {
                                o()
                            })
                        };
                    t !== To.PUSH_NOTIFIER_PERMISSION_DENIED ? t !== To.PUSH_NOTIFIER_PERMISSION_GRANTED ? t === To.PUSH_NOTIFIER_PERMISSION_DEFAULT && this.requestPermission().then(e => {
                        e === To.PUSH_NOTIFIER_PERMISSION_GRANTED ? i() : o()
                    }) : i() : o(To.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS)
                })
            }
            subscribe(e) {
                return this.sw.register().then(e => {
                    var o = e.pushManager;
                    return o.getSubscription().then(e => {
                        if (e) {
                            var t = e.expirationTime;
                            return t && Date.now() > t - ko ? this.unsubscribe(this.loadEndpoint()).then(() => this.processSubscribe(o)) : e
                        }
                        return this.processSubscribe(o)
                    })
                }).then(o => new Promise((t, i) => {
                    if (e || this._needupdate(o)) {
                        var n = o.getKey("p256dh"),
                            r = o.getKey("auth");
                        window.ajax.post(To.SERVER_URL, {
                            act: "a_subscribe",
                            endpoint: o.endpoint,
                            key: n ? btoa(String.fromCharCode.apply(null, new Uint8Array(o.getKey("p256dh")))) : null,
                            token: r ? btoa(String.fromCharCode.apply(null, new Uint8Array(o.getKey("auth")))) : null
                        }, {
                            onDone: e => {
                                e ? (this.saveEndpoint(o.endpoint), t()) : i()
                            },
                            onFail: () => (i(To.SUBSCRIBE_ERROR_NETWORK), !0)
                        })
                    } else t()
                }))
            }
            unsubscribe(e) {
                return this.sw.register().then(o => o.pushManager.getSubscription().then(o => o ? o.unsubscribe().then(o => o ? new Promise((o, t) => {
                    ajax.post(To.SERVER_URL, {
                        act: "a_unsubscribe",
                        endpoint: e
                    }, {
                        onDone: e => {
                            e ? (this.saveEndpoint(!1), o()) : t()
                        }
                    })
                }) : Promise.reject("ERROR: can not unsubscribe")) : (this.saveEndpoint(!1), Promise.reject("ERROR: no subscription"))))
            }
            requestPermission() {
                var e = To.getPermission();
                return e === To.PUSH_NOTIFIER_PERMISSION_DEFAULT ? new Promise(function(e, o) {
                    var t = Notification.requestPermission(function(o) {
                        e(o)
                    });
                    t instanceof Promise && t.then(e, o)
                }) : Promise.resolve(e)
            }
            checkMessageState() {
                return new Promise(e => setTimeout(e, Oo)).then(() => this.action("getMessagesMetaData")).then(e => "object" == typeof e && Object.keys(e).length ? new Promise((o, t) => {
                    window.ajax.post(To.SERVER_URL, {
                        act: "a_update_messages_state",
                        data: Object.entries(e)
                    }, {
                        onDone: e => {
                            e ? o(e) : t("ERROR: act error")
                        },
                        onFail: () => (t("ERROR: network error"), !0)
                    })
                }) : Promise.resolve({})).then(e => {
                    try {
                        return JSON.parse(e)
                    } catch (e) {
                        return {}
                    }
                }).then(e => this.action("updateMessageNotifications", e)).catch(e => Object(yo.a)(e))
            }
        }
        To.SERVER_KEY = "BPrntRk2W1_ISFwlgY-vz9tQDg9i1oSQ3-N8xyjdbNAbIOdZIGFdh5FlO7zn730UwU9Sayoec-Fpqq4JZFTyv60", To.SERVER_URL = "push_notifier", To.PUSH_NOTIFIER_PERMISSION_GRANTED = "granted", To.PUSH_NOTIFIER_PERMISSION_DEFAULT = "default", To.PUSH_NOTIFIER_PERMISSION_DENIED = "denied", To.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS = "BLOCKED_BY_BROWSER_SETTINGS", To.SUBSCRIBE_ERROR_NETWORK = "SUBSCRIBE_ERROR_NETWORK";
        var Po = To;
        var Lo = class extends Po {
                constructor(e, o) {
                    super(e, o), this.canBeEnabled().then(e => {
                        e && (addClass(document.head, "push_notifier_supported"), this.handlerMessagesLP = this.handlerMessagesLP.bind(this))
                    })
                }
                isSupported() {
                    return super.isSupported() && (browser.chrome || browser.mozilla)
                }
                handlerMessagesLP() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        o = e.type,
                        t = e.peerId,
                        i = e.upToId;
                    "event_read_inbound" === o && this.sw.action("removeMessageNotification", {
                        peerId: t,
                        msgId: i
                    })
                }
                handlerPopup(e, o) {
                    var t = Object(X.b)();
                    t && Object(c.W)(t.bodyNode), this.setupSubscription().then(() => this.setState(e, o)).then(() => {
                        t && t.hide(), e ? Object(L.d)("push_notifier_subscribe_via_popup", "msg") : Object(L.d)("push_notifier_subscribe_via_popup", "all")
                    }).catch(e => {
                        Po.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === e ? (Object(c.ub)(t().bodyNode), this.showPopupAllowNotification()) : Object(J.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                    })
                }
                closePopup() {
                    var e = Object(X.b)();
                    e && e.hide(), Object(L.d)("push_notifier_subscribe_via_popup", "close")
                }
                showPopupAllowNotification() {
                    var e = Object(J.b)(Po.SERVER_URL, {
                        act: "popup_allow_notification"
                    }, {
                        params: {
                            hideButtons: !0
                        },
                        containerClass: "PushNotifierPopup__popup-box_type--allow-notification",
                        onFail: () => {
                            e ? e.hide() : Object(J.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                        }
                    })
                }
                _removeLongPollListener() {
                    this.lp && this.lp.offData(this.handlerMessagesLP), this.lp = null
                }
                _addLongPollListener() {
                    !this.lp && window.Notifier && (this.lp = Notifier.getLpInstance(), this.lp && this.lp.onData(this.handlerMessagesLP))
                }
                setState(e, o) {
                    return new Promise((t, i) => {
                        ajax.post(Po.SERVER_URL, {
                            act: "a_toggle_state",
                            state: e,
                            hash: o
                        }, {
                            onDone: e => e ? t() : i(),
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
            Ro = "sw";

        function Io(e) {
            return {
                type: Ro,
                data: e
            }
        }

        function xo(e) {
            return ("" === e.origin || e.origin.match(/^https:\/\/([a-zA-Z0-9\-\.]+\.)?vk\.com$/)) && e.data && e.data.data && e.data.type === Ro
        }

        function Co(e, o) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, o) {
                var t = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var a, d = e[Symbol.iterator](); !(i = (a = d.next()).done) && (t.push(a.value), !o || t.length !== o); i = !0);
                } catch (e) {
                    n = !0, r = e
                } finally {
                    try {
                        i || null == d.return || d.return()
                    } finally {
                        if (n) throw r
                    }
                }
                return t
            }(e, o) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var No = "/js/cmodules/sw/sw.js",
            Bo = "/";
        class Ao {
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
                return Ao.isSupported() ? this.registration ? Promise.resolve(this.registration) : navigator.serviceWorker.register(Ao.addVersion(No), {
                    scope: Bo
                }).then(this._onactive.bind(this)).then(e => (this.registration || (this.registration = e, this._addEventListener(navigator.serviceWorker, "message", this._onmessage.bind(this), !1)), e)) : Promise.reject("serviceWorker is unavailable")
            }
            unregister() {
                this.registration && this.registration.unregister(), this._handlers.forEach(e => e[0].removeEventListener(e[1], e[2])), this._handlers = []
            }
            update() {
                this.registration && this.registration.update()
            }
            _addEventListener(e, o, t) {
                var i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                    n = !1;
                this._handlers.forEach(function(i) {
                    i[0] === e && i[1] === o && i[2] === t && (n = !0)
                }), n && !i || (this._handlers.push([e, o, t]), e.addEventListener(o, t))
            }
            _onactive(e) {
                return e.active ? Promise.resolve(e) : new Promise(o => {
                    this._addEventListener(e.installing, "statechange", t => {
                        "activated" === t.currentTarget.state && o(e)
                    })
                })
            }
            action_devicePixelRatio() {
                return window.devicePixelRatio
            }
            action(e, o) {
                var t = Array.isArray(e) ? e : [
                    [e, o]
                ];
                return this._message({
                    actions: t
                }).then(e => e.answers ? Promise.resolve(1 === t.length ? e.answers[0] : e.answers) : Promise.reject(new Error("ServiceWorker answer is incorrect")))
            }
            _message(e) {
                return this.register().then(() => new Promise((o, t) => {
                    var i = new MessageChannel;
                    i.port1.onmessage = function(e) {
                        xo(e) ? o(e.data.data) : t(new Error("ServiceWorker message is incorrect"))
                    }, this.registration.active.postMessage(Io(e), [i.port2])
                }))
            }
            _onmessage(e) {
                if (xo(e)) {
                    var o = e.data.data;
                    if (o.actions && Array.isArray(o.actions)) {
                        var t = [];
                        o.actions.forEach(o => {
                            var i = Co(o, 2),
                                n = i[0],
                                r = i[1],
                                a = "action_" + n;
                            t.push(Promise.resolve(this[a] ? this[a](r, e) : void 0))
                        }), Promise.all(t).then(function(o) {
                            var t = {};
                            o.forEach((e, o) => {
                                void 0 !== e && (t[o] = e)
                            }), Object.keys(t).length && e.ports[0].postMessage(Io({
                                answers: t
                            }))
                        })
                    }
                }
            }
        }
        var Mo = window.isMVK ? "mvk" : "web",
            Do = {
                start: function(e, o) {
                    if (o.stopPropagation(), o.preventDefault(), this.id = window.domData(e, "id"), this.id && (window.statlogsValueEvent("special_event", "click", Mo, this.id), !this.timeoutHandle)) {
                        var t = Number(window.domData(e, "v")) || 0;
                        this.duration || (this.duration = Number(window.domData(e, "duration")) || 0), this.duration && (!this.animationData || !this.animationData.v || "number" == typeof this.v && this.v !== t ? (this.v = t, this._getAnimation().then(e => (this.animationData = JSON.parse(e), this._loadBodymovin())).then(() => this._play())) : this._play())
                    }
                },
                _getAnimation: function() {
                    return new Promise(e => {
                        var o = new XMLHttpRequest;
                        o.open("GET", `/images/stickers/special/${this.id}/animation.json?v=${this.v}`, !0), o.send(), o.onreadystatechange = (() => {
                            4 === o.readyState && e(o.responseText)
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
                            e.stop(), e.destroy(), this.frame.style.display = "none", this.timeoutHandle = null, window.statlogsValueEvent("special_event", "showed", Mo, this.id)
                        }, this.duration)
                    }
                },
                _loadBodymovin: function() {
                    return new Promise(e => {
                        if (window.bodymovin) e();
                        else if (window.isMVK) {
                            var o = document.createElement("script");
                            o.src = "/js/cmodules/web/bodymovin.js", o.onload = (() => e()), document.head.appendChild(o)
                        } else stManager.add([jsc("web/bodymovin.js")], e)
                    })
                }
            },
            Fo = t("B3ia"),
            Ho = window.vk;

        function Vo() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, Ho.width = 960, Ho.started = Object(p.L)(), Ho.counts = {}, s.a.android && (Object(r.d)("remixscreen_width", window.screen.width, 365), Object(r.d)("remixscreen_height", window.screen.height, 365), Object(r.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(r.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(r.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(B.e)(), Object(P.b)(), Object(b.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(b.h)(vkCache[e].handle.elem)
            }), Object(b.b)(window, "DOMContentLoaded load", function() {
                Ho.loaded || (Ho.loaded = !0, Object(R.y)()), Object(Y.c)()
            }), Object(b.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(b.b)(document, "keydown", mo.a)
        }
        var Uo = 0;

        function Wo() {
            if (window.headNode = Object(c.J)("head"), window.icoNode = Object(c.J)("link", headNode), window.bodyNode = Object(c.J)("body"), window.htmlNode = Object(c.J)("html"), window.utilsNode = Object(c.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(b.b)(bodyNode, "resize", Y.j.pbind(!1)), utilsNode) {
                s.a.mozilla ? Object(c.a)(bodyNode, "firefox") : s.a.mobile && Object(c.a)(bodyNode, "mobfixed"), Object(oe.f)(), Object(P.a)();
                var e = Object(c.F)("layer_bg"),
                    o = e.nextSibling,
                    t = Object(c.F)("box_layer_bg"),
                    i = t.nextSibling;
                window.layerBG = e, window.boxLayerBG = t, window.layerWrap = o, window.layer = o.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(c.F)("stl_side"), window._stlLeft = Object(c.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, s.a.mobile || Object(go.a)(), Object(b.b)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, o, t, i) {
                    return window.layerQueue = S, Object(p.i)(E, {
                        show: E._show.pbind(e, o),
                        boxshow: E._show.pbind(t, i),
                        wrapshow: E._show.pbind(e),
                        hide: E._hide.pbind(e, o),
                        boxhide: E._hide.pbind(t, i),
                        wraphide: E._hide.pbind(e)
                    }), E
                }(e, o, t, i), hab.init(), window._retinaInit ? window._retinaInit() : Uo = 1, Ho.disableSW || (window.PushNotifier = Lo, window.sw = new Ao, window.sw.register().then(() => {
                    window.pushNotifier = new Lo(window.sw, Ao)
                }))
            }
        }

        function Go() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: () => cur.module,
                    getOID: () => cur.oid,
                    doesScrollTriggerIdle: !0
                })), Object(go.b)();
                var e = Object(c.F)("side_bar");
                window.pageNode = Object(c.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(c.O)(e, "position"), window._tbLink = Object(c.F)("top_back_link"), s.a.chrome || s.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = s.a.safari ? bodyNode : htmlNode;
                var o = Math.max(Object(p.L)() - Ho.started, 10),
                    t = Object(p.r)((Ho.contlen || 1) / o * 1e3);
                s.a.mozilla && s.a.version >= 4 ? t /= 2.5 : s.a.mozilla ? t *= 1.5 : s.a.msie && s.a.version >= 7 ? t /= 1.5 : s.a.msie && (t *= 2.5);
                var i = Object(p.r)(150 * Math.max(2e6 / t, 1));
                if (P.d.highlimit = 6 * i, P.d.lowlimit = Math.min(i, 600), Object(Y.j)(), setTimeout(Y.j.pbind(!1), 0), Object(bo.c)(), window.addEventListener("scroll", Y.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !Ho.id && k.a.checkVersion() && k.a.get("last_reloaded")) try {
                    var n = {};
                    Object(p.f)(["sound_notify_off", "im_ui_notify_off"], (e, o) => {
                        var t = k.a.get(o);
                        null !== t && (n[o] = t)
                    }), window.localStorage.clear(), Object(p.f)(n, (e, o) => k.a.set(e, o))
                } catch (e) {}
            }
        }
        class qo {
            constructor(e, o) {
                this.count = o || 1, this.func = e
            }
            done() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                this.count -= e, this.count <= 0 && this.func()
            }
        }

        function zo(e) {
            Ho.loaded ? e() : Object(b.b)(window, "load", e)
        }

        function Ko() {
            window.showWriteMessageBox = Z.g, window.giftsBox = Z.a, window.moneyTransferBox = Z.d, window.reportAd = Z.e, window.mobilePromo = Z.c, window.showAudioClaimWarning = Z.f, window.menuSettings = Z.b, window.sureDeleteAll = Z.h, window.TopNotifier = Object(j.m)(), window.showPhoto = j.y, window.showManyPhoto = j.x, window.showAlbums = j.v, window.showAlbum = j.u, window.showPhotoTags = j.z, window.isPhotoeditor3Available = j.p, window.AudioMessagePlayer = j.a, window.showVideoTags = j.B, window.videoCallback = j.D, window.showWiki = j.C, window.showApp = j.w, window.showPodcast = j.A, window.podcastStartFrom = j.s, window.articlePrepare = j.b, window.isArticleLayerOpen = j.o, window.isArticleEditorAvailable = j.n, window.openArticleEditor = j.r, window.mentionOver = $.c, window.mentionClick = j.q, window.mobileOnlineTip = $.d, window.pageVerifiedTip = $.e, window.audioShowActionTooltip = $.a, window.shareAudioPlaylist = j.t, window.getAudioPlayer = j.k, window.deleteAudioOnClaim = j.j, window.initTopAudioPlayer = j.l, window.bookmark = j.c, window.bookmarkPost = j.i, window.bookmarkArticle = j.d, window.bookmarkLink = j.f, window.bookmarkPodcast = j.h, window.bookmarkNarrative = j.g, window.bookmarkEvent = j.e, window.bookmarkTooltip = $.b, window.showStory = y.c, window.showNarrative = y.b, window.storiesPreloadStatic = y.d, window.sendMask = y.a
        }
        window.constants = {
            Groups: q
        }, window.partConfigEnabled = K.a, Object(c.X)(), window.ge = c.F, window.geByTag = c.I, window.geByTag1 = c.J, window.geByClass = c.G, window.geByClass1 = c.H, window.gpeByClass = c.T, window.domQuery = c.B, window.domQuery1 = c.C, window.domClosest = c.n, window.ce = c.e, window.cf = c.f, window.re = c.fb, window.se = c.mb, window.sech = c.nb, window.rs = c.lb, window.psr = c.eb, window.domReplaceEl = c.D, window.domEL = c.t, window.domNS = c.y, window.domPS = c.A, window.domFC = c.u, window.domLC = c.x, window.domPN = c.z, window.domChildren = c.m, window.domInsertBefore = c.w, window.domInsertAfter = c.v, window.domByClass = c.j, window.domData = c.s, window.domChildIndex = c.l, window.domCA = c.k, window.domClosestSibling = c.r, window.matchesSelector = c.db, window.isHover = c.Z, window.isAncestor = c.Y, window.getScroll = c.M, window.domClosestPositioned = c.q, window.domClosestOverflowHidden = c.p, window.show = c.ub, window.hide = c.W, window.isVisible = c.ab, window.clientHeight = c.h, window.getClientRectOffsetY = c.K, window.toggle = c.vb, window.boundingRectEnabled = c.d, window.getXYRect = c.R, window.getXY = c.Q, window.isWindow = c.bb, window.getSize = c.N, window.hasClass = c.V, window.addClass = c.a, window.addClassDelayed = c.b, window.removeClass = c.hb, window.removeClassDelayed = c.ib, window.toggleClass = c.wb, window.toggleClassDelayed = c.xb, window.replaceClass = c.kb, window.getStyle = c.O, window.setStyle = c.rb, window.setStyleDelayed = c.sb, window.setPseudoStyle = c.qb, window.data = c.i, window.attr = c.c, window.removeAttr = c.gb, window.removeData = c.jb, window.cleanElems = c.g, window.setTitle = c.tb, window.getZoom = c.S, window.val = c.zb, window.elfocus = c.E, window.traverseParent = c.yb, window.getH = c.L, window.getW = c.P, window.domClosestByTag = c.o, window.setDocumentTitle = c.ob, window.lockDocumentTitle = c.cb, window.KEY = b.a, window.addEvent = b.b, window.removeEvent = b.h, window.triggerEvent = b.j, window.cancelEvent = b.c, window.stopEvent = b.i, window.normEvent = b.g, window.checkEvent = b.d, window.checkKeyboardEvent = b.e, window.checkOver = b.f, Object(p.q)(), window.isRetina = p.y, window.extractUrls = p.j, window.serializeForm = p.F, window.addTemplates = p.a, window.getTemplate = p.n, window.rand = p.D, window.irand = p.s, window.isUndefined = p.A, window.isFunction = p.v, window.isArray = p.t, window.isString = p.z, window.isObject = p.x, window.isEmpty = p.u, window.vkNow = p.L, window.vkImage = p.J, window.trim = p.H, window.stripHTML = p.G, window.escapeRE = p.h, window.intval = p.r, window.floatval = p.k, window.positive = p.C, window.isNumeric = p.w, window.winToUtf = p.M, window.replaceEntities = p.E, window.clean = p.c, window.unclean = p.I, window.each = p.f, window.indexOf = p.p, window.inArray = p.o, window.clone = p.d, window.arrayKeyDiff = p.b, window.extend = p.i, window.vkLocal = p.K, window.lTimeout = p.B, window.getCaretCharacterOffsetWithin = p.m, window.formatCount = p.l, window.encodeHtml = p.g, window.decodeHtml = p.e, Object(a.b)(), window.AjaxConvert = d, window.ajx2q = d.toQueryString, window.q2ajx = d.fromQueryString, window.requestBox = a.c, window.activateMobileBox = a.a, window.validateMobileBox = a.d, window.validatePassBox = a.e, Object(r.c)(), window.getCookie = r.a, window.setCookie = r.d, window.hideCookiesPolicy = r.b, Object(Q.d)(), window.debugLog = Q.c, window.debugEl = Q.b, window.isToday = z.d, window.isYesterday = z.f, window.isTomorrow = z.e, window.isSameDate = z.c, window.leadingZero = z.g, window.formatTime = z.a, window.getServerTime = z.b, window.parseLatin = v.o, window.parseCyr = v.m, window.parseLatKeys = v.n, window.langNumeric = v.i, window.langSex = v.j, window.langStr = v.k, window.addLangKeys = v.a, window.getLang = v.d, window.langDate = v.h, window.getShortDate = v.e, window.getShortDateOrTime = v.f, window.langWordNumeric = v.l, window.getDateText = v.c, window.getBigDateNew = v.b, window.getSmDate = v.g, window.scrollToY = g.g, window.scrollToTop = g.f, window.scrollGetX = g.d, window.scrollGetY = g.e, window.disableBodyScroll = g.a, window.enableBodyScroll = g.b, window.Chat = oe.a, window.__qlTimer = null, window.__qlClear = oe.b, window.onLoginDone = oe.m, window.onLoginFailed = oe.n, window.onLoginCaptcha = oe.l, window.onLoginReCaptcha = oe.o, window.storePasswordCredential = oe.p, window.cssAnim = oe.c, window.imagesLoader = oe.e, window.nodeUpdated = oe.k, window.hideNewsAnnounce = oe.d, window.leftAdBlockClose = oe.h, window.leftBlockToggleFriend = oe.j, window.leftBlockFriendTooltip = oe.i, window.placeholderSetup = fo.c, window.placeholderInit = fo.b, window.isInputActive = fo.a, window.showTooltip = ee.c, window.showTitle = ee.b, window.showHint = ee.a, window.topMsg = n.d, window.showMsg = n.b, window.topError = n.c, window.showGlobalPrg = n.a, window.checkTextLength = te.b, window.getSelectionText = te.d, window.goAway = te.e, window.debounce = vo.a, window.hashCode = te.g, window.isFullScreen = te.h, window.parallel = te.k, window.parseJSON = te.l, window.shuffle = te.m, window.throttle = te.n, window.toggleOnline = te.q, window.updateMoney = te.s, window.onlinePlatformClass = te.j, window.Fx = h.a, window.fx = h.a, window.animate = h.b, window.cubicBezier = h.d, window.fadeTo = h.g, window.genFx = h.i, window.getRGB = h.k, window.getColor = h.j, window.slideDown = h.l, window.slideUp = h.n, window.slideToggle = h.m, window.fadeIn = h.e, window.fadeOut = h.f, window.fadeToggle = h.h, window.animateCount = h.c, window.updateAriaElements = bo.c, window.updateAriaCheckboxes = bo.b, window.hasAccessibilityMode = bo.a, window.cancelStackFilter = O.a, window.cancelStackPush = O.c, window.cancelStackPop = O.b, Object(Fo.a)(), window.ElementTooltip = w.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = l, 1 === Ho.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== Ho.al || history.pushState || (Ho.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), Ho.version = !1), Object(P.c)(), window.stManager = P.d, Object(s.c)(), window.browser = s.a, window.mobPlatforms = s.d, window.browserFeatures = s.b, Object(u.a)(), window.toggleFlash = u.c, window.renderFlash = u.b, Vo(), window.updateHeaderStyles = B.i, window.updateNarrow = Y.m, window.checkPageBlocks = Y.c, window.redraw = Y.l, window.onBodyResize = Y.j, window.onBodyScroll = Y.k, window.leftBlockOver = Y.i, window.leftBlockOut = Y.h, window.leftBlockHide = Y.g, window.onDocumentClick = mo.c, window.onEnter = mo.d, window.onCtrlEnter = mo.b, window.logLeftMenuClicks = L.a, window.autosizeSetup = Y.b, window.getProgressBarEl = Y.e, window.getProgressHtml = Y.f, Object(_o.b)(), G(), window.onDomReady = (e => e()), window.currentModule = (() => cur.currentModule ? cur.currentModule() : cur.module), window.hab = m(), window.ls = k.a, window.shortCurrency = T, window.statlogsValueEvent = L.d, window.saveSearchAttemptStats = L.c, window.removeSearchPositionTracker = L.b, window.callHub = qo, window.CallHub = qo, window.gSearch = new x, window.zNav = B.l, window.handlePageView = B.d, window.handlePageParams = B.c, window.handlePageCount = B.b, window.updateOtherCounters = B.k, window.processDestroy = B.f, window.globalHistoryDestroy = B.a, window.showBackLink = B.h, window.nav = N.a, nav.init(), Ho.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                o = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === o[1] && 12 === Ho.time[1] ? Ho.time[1] = 0 : 12 === o[1] && 1 === Ho.time[1] ? o[1] = 0 : (o[1] > Ho.time[1] + 1 || Ho.time[1] > o[1] + 1) && (o[1] = Ho.time[1] = o[2] = Ho.time[2] = 0), o[1] > Ho.time[1] && 1 === o[2] ? 31 === Ho.time[2] || (4 === Ho.time[1] || 6 === Ho.time[1] || 9 === Ho.time[1] || 11 === Ho.time[1]) && 30 === Ho.time[2] || 2 === Ho.time[1] && (29 === Ho.time[2] || 28 === Ho.time[2] && Ho.time[0] % 4) ? Ho.time[2] = 0 : Ho.time[2] = o[2] = 0 : Ho.time[1] > o[1] && 1 === Ho.time[2] && (31 === o[2] || (4 === o[1] || 6 === o[1] || 9 === o[1] || 11 === o[1]) && 30 === o[2] || 2 === o[1] && (29 === o[2] || 28 === o[2] && Ho.time[0] % 4) ? o[2] = 0 : o[2] = Ho.time[2] = 0), (o[2] > Ho.time[2] + 1 || Ho.time[2] > o[2] + 1) && (o[2] = Ho.time[2] = 0);
            var t = 60 * (60 * (24 * (o[2] - Ho.time[2]) + (o[3] - Ho.time[3])) + (o[4] - Ho.time[4]));
            t < -55800 ? t += 86400 : t > 37800 && (t -= 86400);
            var i = new Date,
                n = Date.UTC(i.getFullYear(), i.getMonth(), i.getDate(), i.getHours(), i.getMinutes(), i.getSeconds()) / 1e3 - Object(z.b)();
            n -= 10800, n = (n /= 60).toFixed(0), (n *= 60) < -55800 ? n += 86400 : n > 37800 && (n -= 86400);
            var a = 0,
                d = Math.abs(n);
            Object(p.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], (e, o) => {
                var t = Math.round(3600 * (o - 3)),
                    i = Math.abs(n - t);
                i < d && (d = i, a = t)
            });
            var w = 0,
                l = Math.abs(t);
            Object(p.f)([-12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2, -1, 0, 1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12, 12.75, 13, 14], (e, o) => {
                var i = Math.round(3600 * (o - 3)),
                    n = Math.abs(t - i);
                n < l && (l = n, w = i)
            }), Object(L.d)("timeoffset_new_method", 1, w, a), Object(K.a)("timezone_new_method") ? Ho.dt = a : Ho.dt = w, Object(r.a)("remixdt") !== Ho.dt && Object(r.d)("remixdt", Ho.dt, 365);
            var u = Object(p.r)(Object(r.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!s.a.iphone || Object(r.a)("remixme")) ? 1 & u || (Object(r.d)("remixrt", 1 | u, 365), window._retinaInit = function() {
                P.d.add(["retina.css"]), Object(c.a)(document.body, "is_2x")
            }, Uo && window._retinaInit()) : 1 & u && Object(r.d)("remixrt", 1 ^ u, 365)
        }, 0), window.boxQueue = Object(X.c)(), window.__bq = boxQueue, window.curBox = X.b, Object(X.d)(), window.boxRefreshCoords = X.a, window.MessageBox = J.a, window.showBox = J.b, window.showTabbedBox = J.f, window.showFastBox = J.d, window.showCaptchaBox = J.c, window.showReCaptchaBox = J.e, window.showDoneBox = X.e, window.TopMenu = Y.a, window.TopSearch = C.a, window.handleScroll = te.f, window.loadScript = I.a, window.SpecialEvent = Do, Object(R.j)(), window.notaBene = R.q, window.updSideTopLink = R.y, window.createButton = R.d, window.actionsMenuItemLocked = R.a, window.lockActionsMenuItem = R.n, window.unlockActionsMenuItem = R.v, window.linkLocked = R.m, window.lockLink = R.p, window.unlockLink = R.x, window.lockButton = R.o, window.unlockButton = R.w, window.buttonLocked = R.b, window.isButtonLocked = R.k, window.disableButton = R.f, window.sbWidth = R.t, window.isChecked = R.l, window.checkbox = R.c, window.disable = R.e, window.radioval = R.s, window.radiobtn = R.r, window.showProgress = R.u, window.hideProgress = R.i, window.disableEl = R.g, window.enableEl = R.h, Object(_.d)(), window.VideoConstants = _.a, window.showVideo = _.j, window.showInlineVideo = _.i, window.loadInlineVideo = _.e, window.revertLastInlineVideo = _.h, window.destroyInlineVideoPlayer = _.c, window.pauseLastInlineVideo = _.f, window.playLastInlineVideo = _.g, window.checkMp4 = _.b, window.performance && window.performance.memory && Object(p.D)(0, 100) < 5 && Object(po.a)(), Te ? (Object(b.b)(window, "blur", qe), Object(b.b)(window, "focus", ze), onDomReady(() => setTimeout(He, 500)), window.LongView = {
            register: Ue,
            onScroll: Object(te.n)(We, 50),
            onBeforePageChange: Ke,
            clearElemsCache: Ve,
            _debug: function() {
                return {
                    started: Le,
                    tracking: Pe,
                    viewedData: Re,
                    viewIndexes: Fe,
                    blindTop: xe,
                    blindBottom: Ce
                }
            }
        }) : window.LongView = {
            register: () => {},
            onScroll: () => {},
            onBeforePageChange: () => {},
            clearElemsCache: () => {}
        }, Object(oe.g)(), Ko(), window.onLoaded = zo, window.domStarted = Wo, window.domReady = Go, Object(Q.c)("common module enabled"), P.d.done(jsc("web/common_web.js"))
    }
});