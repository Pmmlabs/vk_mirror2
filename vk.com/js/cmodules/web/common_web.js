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
        var i = {};
        t.r(i), t.d(i, "fromQueryString", function() {
            return h
        }), t.d(i, "toQueryString", function() {
            return u
        });
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

        function n(e) {
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
        }), n(window.NodeList), n(window.HTMLCollection);
        var r = t("ryw6"),
            a = t("kMSP"),
            d = t("Kngp"),
            s = (t("KKXr"), t("Vd3H"), t("t7n3")),
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
                } catch (o) {
                    return w[e] = 1, e
                }
            };

        function u(e, o) {
            var t = [];
            for (var i in e)
                if (e.hasOwnProperty(i) && null != e[i] && !Object(s.v)(e[i]))
                    if (Object(s.t)(e[i]))
                        for (var n = 0, r = 0, a = e[i].length; n < a; ++n) null == e[i][n] || Object(s.v)(e[i][n]) || (t.push(c(i) + "[" + r + "]=" + c(e[i][n])), ++r);
                    else t.push(c(i) + "=" + c(e[i]));
            return o || t.sort(), t.join("&")
        }

        function h(e) {
            if (!e) return {};
            var o = {};
            return e = e.split("&"), Object(s.f)(e, function(e, t) {
                var i = t.split("=");
                if (i[0]) {
                    var n = l(i[1] + "");
                    if ("[]" === i[0].substr(i.length - 2)) {
                        var r = l(i[0].substr(0, i.length - 2));
                        o[r] || (o[r] = []), o[r].push(n)
                    } else o[l(i[0])] = n
                }
            }), o
        }
        var b = t("gdug"),
            p = t("k487"),
            f = t("zxIV");

        function m(e, o) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || o)) {
                var t = Object(f.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(t, icoNode), icoNode = t
            }
        }
        var v = t("HhI8"),
            g = t("7jxN"),
            _ = (t("rE2o"), t("ioFf"), t("a1Th"), t("Egk5"));

        function y(e, o) {
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

        function O() {
            return new function(e) {
                var o, t = function(e) {
                        var o = y(e.split("#"), 2),
                            t = o[0],
                            i = o[1],
                            n = y(t.split("?"), 2),
                            r = n[0],
                            a = n[1];
                        return r + (a ? "?" + Object(d.b)(Object(d.e)(a)) : "") + (i ? "#" + i : "")
                    },
                    i = Object(s.i)({
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
                        1 == vk.al && a(!0), 3 == vk.al ? (Object(_.b)(window, "popstate", a), b.a.safari && Object(_.b)(window, "hashchange", a)) : "onhashchange" in window ? Object(_.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : a()
                        }) : o = setInterval(a, 200)
                    },
                    setOptions: function(e) {
                        i = Object(s.i)(i, e)
                    },
                    checker: a,
                    stop: function() {
                        vk.al < 3 ? clearInterval(o) : 3 == vk.al && Object(_.h)(window, "popstate", a)
                    }
                }
            }({
                onLocChange: function(e) {
                    var o = {
                        back: !0,
                        hist: !0
                    };
                    3 === vk.al && history.state && Object(s.x)(history.state) && (o.scrollTop = Object(s.r)(history.state.scrollTop)), nav.go("/" + e, void 0, o)
                }
            })
        }
        var j = t("4+be"),
            E = t("lXE5"),
            S = t("Ia1d"),
            k = t("XuKo"),
            T = t("ErRf"),
            P = t("/PiP"),
            L = {
                sh: function(e, o) {
                    Object(f.ub)(e), Object(s.v)(o) && o()
                },
                hd: function(e, o) {
                    Object(f.W)(e), Object(s.v)(o) && o()
                },
                visible: !1,
                _show: function(e, o, t, i) {
                    var n = "layers" + (boxQueue.count() + 1);
                    Object(T.c)(n, function() {}), Object(f.rb)(e, {
                        opacity: t || "",
                        backgroundColor: i || ""
                    }), L.visible || (Object(v.c)(), Object(E.a)()), L.visible || Object(S.f)(), L.visible = !0, Object(f.a)(bodyNode, "layers_shown"), o.visibilityHide ? Object(f.hb)(o, "box_layer_hidden") : Object(f.ub)(o), L.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, o) {
                    L.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(T.a)(e), o && o.visibilityHide ? Object(f.a)(o, "box_layer_hidden") : Object(f.W)(o), Object(f.ab)(layerWrap) || cur._inLayer || Object(f.ab)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(f.ab)(window.mvLayerWrap)) || Object(f.ab)(window.wkLayerWrap) || (L.visible = !1, Object(f.hb)(bodyNode, "layers_shown"), Object(v.c)(!0), Object(E.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), L.visible || Object(S.g)()
                }
            },
            R = {
                push: function(e) {
                    var o, t = !!R.count() && R._layers[R._layers.length - 1];
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
                        VideoPlaylist.getCurListId() && (n = Object(s.i)(n, {
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
                    return t && o[0] == t[0] && o[1] == t[1] && o[2] == t[2] || R._layers.push(o), R.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = R._layers, o = e.length; o > 0; --o) "photo" === e[o - 1][0] ? e[o - 1][3].noHistory = 1 : "video" === e[o - 1][0] && (e[o - 1][3].noHistory = 1)
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
                back: function(e, o, t, i) {
                    for (var n = R._layers, r = n.length; r > 0; --r)
                        if (n[r - 1][0] == e && n[r - 1][1] == o || n[r - 1][0] == t && n[r - 1][1] == i) return R._layers = n.slice(0, r), R.pop(), !0;
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
        var I = t("Xrg9");

        function x() {
            var e = {};
            Object(s.f)(Object(f.G)("_short_currency"), function() {
                var o = Object(f.s)(this, "short") || "";
                if (!o) return !0;
                var t = this.innerHTML,
                    i = Object(s.M)(t).length,
                    n = Object(f.O)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[n]) {
                    for (var r = "", a = i - 1; a >= 0; a--) r += "&#8399;";
                    var d = Object(f.e)("div", {
                        innerHTML: `<b>${t}</b><b>${r}</b>`
                    }, {
                        fontFamily: n,
                        fontSize: "24px"
                    });
                    Object(f.F)("utils").appendChild(d), e[n] = Math.abs(d.firstChild.offsetWidth - d.lastChild.offsetWidth) >= 2 * i, Object(f.fb)(d)
                }!1 === e[n] && Object(f.zb)(this, o)
            })
        }
        var C = t("0gG3"),
            N = t("XzvV"),
            B = t("v+DW"),
            A = t("lkNA");
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
                    var o = window.placeholderSetup;
                    if (Object(f.F)("quick_search") && !this.on) return this.on = 1, Object(f.ub)(this.sCont), o("search_input"), Object(f.F)("search_input").setAttribute("autocomplete", "off"), Object(f.a)(Object(f.F)("qsearch_link"), "active"), this.prev_content = Object(f.F)("content"), this.qsearch_cont || (this.qsearch_cont = Object(f.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(_.c)(e) : void 0
                }
                go(e) {
                    var o = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(s.H)(Object(f.F)("search_input").value) + "&name=1";
                    return Object(_.c)(e || window.event), location.href = o, !1
                }
                init(e) {
                    this.sCont = Object(f.F)("quick_search"), this.opt = e || {}
                }
                hide(e, o) {
                    if (Object(f.F)("quick_search") && (!this.active || o) && this.on) {
                        var t = window.toggleFlash;
                        if (this.on = 0, t(), this.beforeHide && this.beforeHide()) return !0;
                        Object(f.F)("search_input").setValue ? Object(f.F)("search_input").setValue("") : Object(f.F)("search_input").value = "", Object(f.W)(this.sCont), Object(f.hb)(Object(f.F)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }
                preload() {}
            },
            D = t("Bszp"),
            F = t("MSYF"),
            H = t("kHqu");

        function V(e, o) {
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
                        var o = e.domComplete,
                            t = e.domContentLoadedEventEnd,
                            i = e.loadEventEnd;
                        Q(o, "domComplete"), Q(t, "domContentLoadedEventEnd"), Q(i, "loadEventEnd")
                    }
                })
            }(), z()
        }
        var q = [],
            G = !1;

        function z() {
            if (G) {
                var e = window.performance,
                    o = q[q.length - 1];
                if (!o) return G = !1, void Q(-1);
                var t = o.startTime + o.duration;
                e.now() - t >= 3e3 ? Q(t, "TTI") : setTimeout(z, 3e3)
            }
        }
        var K = [];

        function Q(e, o) {
            var t = Math.floor(e);
            if (-1 !== e && (K.push([t, o]), !(G ? "TTI" === o : K.length > 2))) return;
            var i = "unknown",
                n = navigator.connection;
            n && n.effectiveType && (i = n.effectiveType);
            var r = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            K.forEach(e => {
                var o = V(e, 2),
                    t = o[0],
                    n = o[1];
                return r.events.push([n, t, cur.module, i, window.vk.rv])
            }), Object(a.d)(U, JSON.stringify(r), .01)
        }

        function Y() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(e => {
                q = q.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), G = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
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
            X = t("1BRX"),
            $ = t("W9Tc"),
            Z = t("98sY"),
            ee = t("El3O"),
            oe = t("EasH"),
            te = t("kcIO"),
            ie = t("MiCK"),
            ne = t("Ieup"),
            re = t("FWc3"),
            ae = t("t/FQ"),
            de = t("aong"),
            se = .5,
            we = .25,
            ce = 300,
            le = 1e3,
            ue = 3e5,
            he = 2500,
            be = 5e3,
            pe = 6e3,
            fe = 2e4,
            me = 1e3,
            ve = 36e4,
            ge = "_longViewType",
            _e = "_longViewIdled",
            ye = "_longViewModule",
            Oe = "_longViewStarted",
            je = "_longViewProcessed",
            Ee = "_longViewCached",
            Se = "_longViewHeight",
            ke = "_longViewTop",
            Te = "_longViewBottom",
            Pe = "REGULAR",
            Le = "AUTOPLAY_AD",
            Re = "LongView.viewed",
            Ie = "LongView.idled",
            xe = vk.longViewTestGroup,
            Ce = [],
            Ne = [],
            Be = [],
            Ae = Date.now(),
            Me = 0,
            De = 0,
            Fe = !1,
            He = null,
            Ve = null,
            Ue = null,
            We = null,
            qe = {};

        function Ge() {
            var e = lo();
            e.length && (ao(e), uo())
        }

        function ze() {
            Ce.forEach(function(e) {
                e[Ee] = !1
            })
        }

        function Ke(e, o) {
            "im" === o && !e[ge] && function(e) {
                if (Object(f.V)(e, "im-mess--post")) return !0;
                var o = e && Object(f.u)(e);
                return !(!o || "ads_feed_placeholder" === o.getAttribute("id") || Object(f.V)(e, "no_posts"))
            }(e) && (e[ge] = function(e) {
                var o = e && Object(f.u)(e);
                return o && o.hasAttribute("data-ad-video-autoplay") ? Le : Pe
            }(e), e[ye] = o, Ce.push(e))
        }

        function Qe(e, o) {
            var t = Qe;
            ! function(e, o) {
                var t = [];
                Ce.forEach(function(i) {
                    mo(i) ? t.push(i) : ! function(e, o, t) {
                        return !e[Oe] && bo(e, se, o, t)
                    }(i, e, o) ? function(e, o, t) {
                        return e[Oe] && !bo(e, we, o, t)
                    }(i, e, o) && (i[_e] ? delete i[_e] : (vo(Ne, i), Be = Be.concat(fo(i))), delete i[Oe]) : (i[Oe] = Date.now(), Ne.push(i))
                }), t.forEach(function(e) {
                    vo(Ce, e)
                })
            }(e || Object(E.e)(), o || window.innerHeight), Fe ? (clearTimeout(t.timer), t.timer = setTimeout(Ye, 150)) : (Fe = !0, eo(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(f.H)("im-page--chat-header"),
                        o = Object(f.H)("im-page--chat-input");
                    Me = e.getBoundingClientRect().top + e.offsetHeight, De = window.innerHeight - o.getBoundingClientRect().top
                } else Me = Object(f.F)("page_header").offsetHeight, De = 0
            }())
        }

        function Ye() {
            eo(), Ze(), Fe = !1
        }

        function Je() {
            eo(), ro()
        }

        function Xe() {
            Be = [], Ne.forEach(e => e[Oe] = Date.now()), so(null), wo(null), Ze()
        }

        function $e() {
            eo(), ro(), Be = [], Ne = [], so(null), wo(null)
        }

        function Ze() {
            He = setTimeout(oo, he), Ve = setTimeout(to, be), Ue = setTimeout(io, pe), We = setTimeout(no, fe)
        }

        function eo() {
            clearTimeout(He), clearTimeout(Ve), clearTimeout(Ue), clearTimeout(We)
        }

        function oo() {
            Be.length && so(Be)
        }

        function to() {
            ao(Be), Be = [], so(null)
        }

        function io() {
            Ne.length && (wo(po(Ne, !0, !0)), Ue = setTimeout(io, me))
        }

        function no() {
            clearTimeout(Ue), ao(po(Ne)), Ne.forEach(e => e[_e] = !0), Ne = [], wo(null)
        }

        function ro() {
            ao(Be.concat(po(Ne)))
        }

        function ao(e) {
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
                    return Object(s.f)(o, (e, o) => t.push(e + "_" + o.join(","))), t.join(";")
                }(e),
                long_view: 1
            })
        }

        function so(e) {
            co(Re, e)
        }

        function wo(e) {
            co(Ie, e)
        }

        function co(e, o) {
            var t = I.a.get(e) || {};
            o ? t[Ae] = o : delete t[Ae], I.a.set(e, t)
        }

        function lo() {
            var e = lo,
                o = [],
                t = I.a.get(Re) || {},
                i = I.a.get(Ie) || {};
            return e.iterator || (e.iterator = (e => t => {
                ho(t) && (o = o.concat(e[t]))
            })), Object.keys(t).forEach(e.iterator(t)), Object.keys(i).forEach(e.iterator(i)), o
        }

        function uo() {
            var e = uo,
                o = I.a.get(Re) || {},
                t = I.a.get(Ie) || {};
            e.iterator || (e.iterator = (e => o => {
                ho(o) && delete e[o]
            })), Object.keys(o).forEach(e.iterator(o)), Object.keys(t).forEach(e.iterator(t)), I.a.set(Re, o), I.a.set(Ie, t)
        }

        function ho(e) {
            var o = Number(e);
            return o !== Ae && Date.now() - o >= ve
        }

        function bo(e, o, t, i) {
            if (!e) return !1;
            e[Ee] || (e[Ee] = !0, e[Se] = e.offsetHeight, e[ke] = t + e.getBoundingClientRect().top, e[Te] = e[ke] + e[Se]);
            var n = i - Me - De,
                r = t + Me,
                a = t + i - De,
                d = e[Se],
                s = e[ke],
                w = e[Te];
            return (w > r && s < a ? Math.min(a, w) - Math.max(r, s) : 0) >= Math.min(n * o, d * o)
        }

        function po(e, o, t) {
            return e.map(e => fo(e, o, t))
        }

        function fo(e, o, t) {
            if (mo(e)) return [];
            var i = Math.min(ue, Date.now() - e[Oe]);
            if (e[ge] === Pe && i < ce || e[ge] === Le && i < le) return [];
            t || (e[je] = !0);
            var n = function(e) {
                    var o = e[ye];
                    if ("im" === o) {
                        var t = Object(f.c)(e, "data-post-id"),
                            i = Object(f.c)(e, "data-copy"),
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
                        c = w[0],
                        l = w[1];
                    "ads" === c && (l = w[3]), /^post\d+$/.test(c) && (c = w[1], l = w[2]);
                    var u = void 0;
                    o || (qe[u = c + "_" + l] || (qe[u] = 0), qe[u]++), d.push("ad" === c ? {
                        ownerId: "ad",
                        postId: l,
                        module: r,
                        viewIndex: qe[u]
                    } : "ads" === c ? {
                        ownerId: "ads",
                        postId: l,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        viewIndex: qe[u]
                    } : {
                        ownerId: c,
                        postId: (1 === n[s] ? "" : "-") + l,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        q: n.q || null,
                        viewIndex: qe[u]
                    })
                }
            return d
        }

        function mo(e) {
            return "page_view" === xe && e[je] || !document.body.contains(e)
        }

        function vo(e, o) {
            var t = e.indexOf(o);
            t >= 0 && e.splice(t, 1)
        }
        var go = t("QGEU"),
            _o = t("eNQP"),
            yo = t("o7bv"),
            Oo = t("wetz"),
            jo = t("BJj/"),
            Eo = t("i6oL"),
            So = t("m0N1");
        t("VRzm"), t("/8Fb");
        var ko = t("W0P9"),
            To = 5e3,
            Po = "push_notifier_endpoint",
            Lo = "push_notifier_subscribed_ts",
            Ro = 6e4,
            Io = 432e6;
        class xo {
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
                return I.a.get(Po + vk.id) || !1
            }
            saveEndpoint(e) {
                I.a.set(Po + vk.id, e || !1)
            }
            action(e, o) {
                return this.sw.action(e, o)
            }
            _needupdate(e) {
                var o = Date.now(),
                    t = this.loadEndpoint(),
                    i = I.a.get(Lo + vk.id),
                    n = !1;
                return (t !== e.endpoint || !i || o - i > Ro) && (I.a.set(Lo + vk.id, o), n = !0), n
            }
            listenPermission() {
                Object($.a)("push_notifier") && navigator.permissions && navigator.permissions.query && navigator.permissions.query({
                    name: "notifications"
                }).then(e => {
                    e.onchange = (() => this.update())
                })
            }
            update() {
                return this.updatePermission().then(e => e === xo.PUSH_NOTIFIER_PERMISSION_GRANTED ? this.subscribe().catch(e => {
                    e !== xo.SUBSCRIBE_ERROR_NETWORK && e("can not update subscribe")
                }) : Promise.reject("premession_not_granted")).catch(ko.a)
            }
            updatePermission() {
                var e = xo.getPermission();
                if (e !== xo.PUSH_NOTIFIER_PERMISSION_GRANTED) {
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
                    }(xo.SERVER_KEY)
                })
            }
            setupSubscription() {
                return new Promise((e, o) => {
                    var t = xo.getPermission(),
                        i = () => {
                            this.subscribe(!0).then(() => {
                                e()
                            }).catch(() => {
                                o()
                            })
                        };
                    t !== xo.PUSH_NOTIFIER_PERMISSION_DENIED ? t !== xo.PUSH_NOTIFIER_PERMISSION_GRANTED ? t === xo.PUSH_NOTIFIER_PERMISSION_DEFAULT && this.requestPermission().then(e => {
                        e === xo.PUSH_NOTIFIER_PERMISSION_GRANTED ? i() : o()
                    }) : i() : o(xo.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS)
                })
            }
            subscribe(e) {
                return this.sw.register().then(e => {
                    var o = e.pushManager;
                    return o.getSubscription().then(e => {
                        if (e) {
                            var t = e.expirationTime;
                            return t && Date.now() > t - Io ? this.unsubscribe(this.loadEndpoint()).then(() => this.processSubscribe(o)) : e
                        }
                        return this.processSubscribe(o)
                    })
                }).then(o => new Promise((t, i) => {
                    if (e || this._needupdate(o)) {
                        var n = o.getKey("p256dh"),
                            r = o.getKey("auth");
                        window.ajax.post(xo.SERVER_URL, {
                            act: "a_subscribe",
                            endpoint: o.endpoint,
                            key: n ? btoa(String.fromCharCode.apply(null, new Uint8Array(o.getKey("p256dh")))) : null,
                            token: r ? btoa(String.fromCharCode.apply(null, new Uint8Array(o.getKey("auth")))) : null
                        }, {
                            onDone: e => {
                                e ? (this.saveEndpoint(o.endpoint), t()) : i()
                            },
                            onFail: () => (i(xo.SUBSCRIBE_ERROR_NETWORK), !0)
                        })
                    } else t()
                }))
            }
            unsubscribe(e) {
                return this.sw.register().then(o => o.pushManager.getSubscription().then(o => o ? o.unsubscribe().then(o => o ? new Promise((o, t) => {
                    ajax.post(xo.SERVER_URL, {
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
                var e = xo.getPermission();
                return e === xo.PUSH_NOTIFIER_PERMISSION_DEFAULT ? new Promise(function(e, o) {
                    var t = Notification.requestPermission(function(o) {
                        e(o)
                    });
                    t instanceof Promise && t.then(e, o)
                }) : Promise.resolve(e)
            }
            checkMessageState() {
                return new Promise(e => setTimeout(e, To)).then(() => this.action("getMessagesMetaData")).then(e => "object" == typeof e && Object.keys(e).length ? new Promise((o, t) => {
                    window.ajax.post(xo.SERVER_URL, {
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
                }).then(e => this.action("updateMessageNotifications", e)).catch(e => Object(ko.a)(e))
            }
        }
        xo.SERVER_KEY = "BPrntRk2W1_ISFwlgY-vz9tQDg9i1oSQ3-N8xyjdbNAbIOdZIGFdh5FlO7zn730UwU9Sayoec-Fpqq4JZFTyv60", xo.SERVER_URL = "push_notifier", xo.PUSH_NOTIFIER_PERMISSION_GRANTED = "granted", xo.PUSH_NOTIFIER_PERMISSION_DEFAULT = "default", xo.PUSH_NOTIFIER_PERMISSION_DENIED = "denied", xo.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS = "BLOCKED_BY_BROWSER_SETTINGS", xo.SUBSCRIBE_ERROR_NETWORK = "SUBSCRIBE_ERROR_NETWORK";
        var Co = xo;
        var No = class extends Co {
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
                    var t = Object(te.b)();
                    t && Object(f.W)(t.bodyNode), this.setupSubscription().then(() => this.setState(e, o)).then(() => {
                        t && t.hide(), e ? Object(N.d)("push_notifier_subscribe_via_popup", "msg") : Object(N.d)("push_notifier_subscribe_via_popup", "all")
                    }).catch(e => {
                        Co.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === e ? (Object(f.ub)(t().bodyNode), this.showPopupAllowNotification()) : Object(oe.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                    })
                }
                closePopup() {
                    var e = Object(te.b)();
                    e && e.hide(), Object(N.d)("push_notifier_subscribe_via_popup", "close")
                }
                showPopupAllowNotification() {
                    var e = Object(oe.b)(Co.SERVER_URL, {
                        act: "popup_allow_notification"
                    }, {
                        params: {
                            hideButtons: !0
                        },
                        containerClass: "PushNotifierPopup__popup-box_type--allow-notification",
                        onFail: () => {
                            e ? e.hide() : Object(oe.d)(getLang("global_error"), getLang("notifications_native_common_error"))
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
                        ajax.post(Co.SERVER_URL, {
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
            Bo = "sw";

        function Ao(e) {
            return {
                type: Bo,
                data: e
            }
        }

        function Mo(e) {
            return ("" === e.origin || e.origin.match(/^https:\/\/([a-zA-Z0-9\-\.]+\.)?vk\.com$/)) && e.data && e.data.data && e.data.type === Bo
        }

        function Do(e, o) {
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
        var Fo = "/js/cmodules/sw/sw.js",
            Ho = "/";
        class Vo {
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
                return Vo.isSupported() ? this.registration ? Promise.resolve(this.registration) : navigator.serviceWorker.register(Vo.addVersion(Fo), {
                    scope: Ho
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
                        Mo(e) ? o(e.data.data) : t(new Error("ServiceWorker message is incorrect"))
                    }, this.registration.active.postMessage(Ao(e), [i.port2])
                }))
            }
            _onmessage(e) {
                if (Mo(e)) {
                    var o = e.data.data;
                    if (o.actions && Array.isArray(o.actions)) {
                        var t = [];
                        o.actions.forEach(o => {
                            var i = Do(o, 2),
                                n = i[0],
                                r = i[1],
                                a = "action_" + n;
                            t.push(Promise.resolve(this[a] ? this[a](r, e) : void 0))
                        }), Promise.all(t).then(function(o) {
                            var t = {};
                            o.forEach((e, o) => {
                                void 0 !== e && (t[o] = e)
                            }), Object.keys(t).length && e.ports[0].postMessage(Ao({
                                answers: t
                            }))
                        })
                    }
                }
            }
        }
        var Uo = window.isMVK ? "mvk" : "web",
            Wo = {
                start: function(e, o) {
                    if (o.stopPropagation(), o.preventDefault(), this.id = window.domData(e, "id"), this.id && (window.statlogsValueEvent("special_event", "click", Uo, this.id), !this.timeoutHandle)) {
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
                            e.stop(), e.destroy(), this.frame.style.display = "none", this.timeoutHandle = null, window.statlogsValueEvent("special_event", "showed", Uo, this.id)
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
            qo = t("B3ia"),
            Go = window.vk;

        function zo() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, Go.width = 960, Go.started = Object(s.L)(), Go.counts = {}, b.a.android && (Object(a.d)("remixscreen_width", window.screen.width, 365), Object(a.d)("remixscreen_height", window.screen.height, 365), Object(a.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(a.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(a.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(H.e)(), Object(C.b)(), Object(_.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(_.h)(vkCache[e].handle.elem)
            }), Object(_.b)(window, "DOMContentLoaded load", function() {
                Go.loaded || (Go.loaded = !0, Object(B.y)()), Object(ee.c)()
            }), Object(_.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(_.b)(document, "keydown", Oo.a)
        }
        var Ko = 0;

        function Qo() {
            if (window.headNode = Object(f.J)("head"), window.icoNode = Object(f.J)("link", headNode), window.bodyNode = Object(f.J)("body"), window.htmlNode = Object(f.J)("html"), window.utilsNode = Object(f.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(_.b)(bodyNode, "resize", ee.j.pbind(!1)), utilsNode) {
                b.a.mozilla ? Object(f.a)(bodyNode, "firefox") : b.a.mobile && Object(f.a)(bodyNode, "mobfixed"), Object(ae.f)(), Object(C.a)();
                var e = Object(f.F)("layer_bg"),
                    o = e.nextSibling,
                    t = Object(f.F)("box_layer_bg"),
                    i = t.nextSibling;
                window.layerBG = e, window.boxLayerBG = t, window.layerWrap = o, window.layer = o.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(f.F)("stl_side"), window._stlLeft = Object(f.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, b.a.mobile || Object(Eo.a)(), Object(_.b)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, o, t, i) {
                    return window.layerQueue = R, Object(s.i)(L, {
                        show: L._show.pbind(e, o),
                        boxshow: L._show.pbind(t, i),
                        wrapshow: L._show.pbind(e),
                        hide: L._hide.pbind(e, o),
                        boxhide: L._hide.pbind(t, i),
                        wraphide: L._hide.pbind(e)
                    }), L
                }(e, o, t, i), hab.init(), window._retinaInit ? window._retinaInit() : Ko = 1, Go.disableSW || (window.PushNotifier = No, window.sw = new Vo, window.sw.register().then(() => {
                    window.pushNotifier = new No(window.sw, Vo)
                }))
            }
        }

        function Yo() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: () => cur.module,
                    getOID: () => cur.oid,
                    doesScrollTriggerIdle: !0
                })), Object(Eo.b)();
                var e = Object(f.F)("side_bar");
                window.pageNode = Object(f.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(f.O)(e, "position"), window._tbLink = Object(f.F)("top_back_link"), b.a.chrome || b.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = b.a.safari ? bodyNode : htmlNode;
                var o = Math.max(Object(s.L)() - Go.started, 10),
                    t = Object(s.r)((Go.contlen || 1) / o * 1e3);
                b.a.mozilla && b.a.version >= 4 ? t /= 2.5 : b.a.mozilla ? t *= 1.5 : b.a.msie && b.a.version >= 7 ? t /= 1.5 : b.a.msie && (t *= 2.5);
                var i = Object(s.r)(150 * Math.max(2e6 / t, 1));
                if (C.d.highlimit = 6 * i, C.d.lowlimit = Math.min(i, 600), Object(ee.j)(), setTimeout(ee.j.pbind(!1), 0), Object(go.c)(), window.addEventListener("scroll", ee.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !Go.id && I.a.checkVersion() && I.a.get("last_reloaded")) try {
                    var n = {};
                    Object(s.f)(["sound_notify_off", "im_ui_notify_off"], (e, o) => {
                        var t = I.a.get(o);
                        null !== t && (n[o] = t)
                    }), window.localStorage.clear(), Object(s.f)(n, (e, o) => I.a.set(e, o))
                } catch (e) {}
            }
        }
        class Jo {
            constructor(e, o) {
                this.count = o || 1, this.func = e
            }
            done() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                this.count -= e, this.count <= 0 && this.func()
            }
        }

        function Xo(e) {
            Go.loaded ? e() : Object(_.b)(window, "load", e)
        }

        function $o() {
            window.showWriteMessageBox = ne.g, window.giftsBox = ne.a, window.moneyTransferBox = ne.d, window.reportAd = ne.e, window.mobilePromo = ne.c, window.showAudioClaimWarning = ne.f, window.menuSettings = ne.b, window.sureDeleteAll = ne.h, window.TopNotifier = Object(P.m)(), window.showPhoto = P.y, window.showManyPhoto = P.x, window.showAlbums = P.v, window.showAlbum = P.u, window.showPhotoTags = P.z, window.isPhotoeditor3Available = P.p, window.AudioMessagePlayer = P.a, window.showVideoTags = P.B, window.videoCallback = P.D, window.showWiki = P.C, window.showApp = P.w, window.showPodcast = P.A, window.podcastStartFrom = P.s, window.articlePrepare = P.b, window.isArticleLayerOpen = P.o, window.isArticleEditorAvailable = P.n, window.openArticleEditor = P.r, window.mentionOver = ie.c, window.mentionClick = P.q, window.mobileOnlineTip = ie.d, window.pageVerifiedTip = ie.e, window.audioShowActionTooltip = ie.a, window.shareAudioPlaylist = P.t, window.getAudioPlayer = P.k, window.deleteAudioOnClaim = P.j, window.initTopAudioPlayer = P.l, window.bookmark = P.c, window.bookmarkPost = P.i, window.bookmarkArticle = P.d, window.bookmarkLink = P.f, window.bookmarkPodcast = P.h, window.bookmarkNarrative = P.g, window.bookmarkEvent = P.e, window.bookmarkTooltip = ie.b, window.showStory = k.c, window.showNarrative = k.b, window.storiesPreloadStatic = k.d, window.sendMask = k.a
        }
        window.constants = {
            Groups: J
        }, window.partConfigEnabled = $.a, Object(f.X)(), window.ge = f.F, window.geByTag = f.I, window.geByTag1 = f.J, window.geByClass = f.G, window.geByClass1 = f.H, window.gpeByClass = f.T, window.domQuery = f.B, window.domQuery1 = f.C, window.domClosest = f.n, window.ce = f.e, window.cf = f.f, window.re = f.fb, window.se = f.mb, window.sech = f.nb, window.rs = f.lb, window.psr = f.eb, window.domReplaceEl = f.D, window.domEL = f.t, window.domNS = f.y, window.domPS = f.A, window.domFC = f.u, window.domLC = f.x, window.domPN = f.z, window.domChildren = f.m, window.domInsertBefore = f.w, window.domInsertAfter = f.v, window.domByClass = f.j, window.domData = f.s, window.domChildIndex = f.l, window.domCA = f.k, window.domClosestSibling = f.r, window.matchesSelector = f.db, window.isHover = f.Z, window.isAncestor = f.Y, window.getScroll = f.M, window.domClosestPositioned = f.q, window.domClosestOverflowHidden = f.p, window.show = f.ub, window.hide = f.W, window.isVisible = f.ab, window.clientHeight = f.h, window.getClientRectOffsetY = f.K, window.toggle = f.vb, window.boundingRectEnabled = f.d, window.getXYRect = f.R, window.getXY = f.Q, window.isWindow = f.bb, window.getSize = f.N, window.hasClass = f.V, window.addClass = f.a, window.addClassDelayed = f.b, window.removeClass = f.hb, window.removeClassDelayed = f.ib, window.toggleClass = f.wb, window.toggleClassDelayed = f.xb, window.replaceClass = f.kb, window.getStyle = f.O, window.setStyle = f.rb, window.setStyleDelayed = f.sb, window.setPseudoStyle = f.qb, window.data = f.i, window.attr = f.c, window.removeAttr = f.gb, window.removeData = f.jb, window.cleanElems = f.g, window.setTitle = f.tb, window.getZoom = f.S, window.val = f.zb, window.elfocus = f.E, window.traverseParent = f.yb, window.getH = f.L, window.getW = f.P, window.domClosestByTag = f.o, window.setDocumentTitle = f.ob, window.lockDocumentTitle = f.cb, window.KEY = _.a, window.addEvent = _.b, window.removeEvent = _.h, window.triggerEvent = _.j, window.cancelEvent = _.c, window.stopEvent = _.i, window.normEvent = _.g, window.checkEvent = _.d, window.checkKeyboardEvent = _.e, window.checkOver = _.f, Object(s.q)(), window.isRetina = s.y, window.extractUrls = s.j, window.serializeForm = s.F, window.addTemplates = s.a, window.getTemplate = s.n, window.rand = s.D, window.irand = s.s, window.isUndefined = s.A, window.isFunction = s.v, window.isArray = s.t, window.isString = s.z, window.isObject = s.x, window.isEmpty = s.u, window.vkNow = s.L, window.vkImage = s.J, window.trim = s.H, window.stripHTML = s.G, window.escapeRE = s.h, window.intval = s.r, window.floatval = s.k, window.positive = s.C, window.isNumeric = s.w, window.winToUtf = s.M, window.replaceEntities = s.E, window.clean = s.c, window.unclean = s.I, window.each = s.f, window.indexOf = s.p, window.inArray = s.o, window.clone = s.d, window.arrayKeyDiff = s.b, window.extend = s.i, window.vkLocal = s.K, window.lTimeout = s.B, window.getCaretCharacterOffsetWithin = s.m, window.formatCount = s.l, window.encodeHtml = s.g, window.decodeHtml = s.e, Object(d.c)(), window.ajx2q = d.b, window.q2ajx = d.e, window.AjaxConvert = i, window.requestBox = d.f, window.activateMobileBox = d.a, window.validateMobileBox = d.g, window.validatePassBox = d.h, Object(a.c)(), window.getCookie = a.a, window.setCookie = a.d, window.hideCookiesPolicy = a.b, Object(Z.d)(), window.debugLog = Z.c, window.debugEl = Z.b, window.isToday = X.d, window.isYesterday = X.f, window.isTomorrow = X.e, window.isSameDate = X.c, window.leadingZero = X.g, window.formatTime = X.a, window.getServerTime = X.b, window.parseLatin = j.o, window.parseCyr = j.m, window.parseLatKeys = j.n, window.langNumeric = j.i, window.langSex = j.j, window.langStr = j.k, window.addLangKeys = j.a, window.getLang = j.d, window.langDate = j.h, window.getShortDate = j.e, window.getShortDateOrTime = j.f, window.langWordNumeric = j.l, window.getDateText = j.c, window.getBigDateNew = j.b, window.getSmDate = j.g, window.scrollToY = E.g, window.scrollToTop = E.f, window.scrollGetX = E.d, window.scrollGetY = E.e, window.disableBodyScroll = E.a, window.enableBodyScroll = E.b, window.Chat = ae.a, window.__qlTimer = null, window.__qlClear = ae.b, window.onLoginDone = ae.m, window.onLoginFailed = ae.n, window.onLoginCaptcha = ae.l, window.onLoginReCaptcha = ae.o, window.storePasswordCredential = ae.p, window.cssAnim = ae.c, window.imagesLoader = ae.e, window.nodeUpdated = ae.k, window.hideNewsAnnounce = ae.d, window.leftAdBlockClose = ae.h, window.leftBlockToggleFriend = ae.j, window.leftBlockFriendTooltip = ae.i, window.placeholderSetup = yo.c, window.placeholderInit = yo.b, window.isInputActive = yo.a, window.showTooltip = re.c, window.showTitle = re.b, window.showHint = re.a, window.topMsg = r.d, window.showMsg = r.b, window.topError = r.c, window.showGlobalPrg = r.a, window.checkTextLength = de.b, window.getSelectionText = de.d, window.goAway = de.e, window.debounce = jo.a, window.hashCode = de.g, window.isFullScreen = de.h, window.parallel = de.k, window.parseJSON = de.l, window.shuffle = de.m, window.throttle = de.n, window.toggleOnline = de.q, window.updateMoney = de.s, window.onlinePlatformClass = de.j, window.Fx = g.a, window.fx = g.a, window.animate = g.b, window.cubicBezier = g.d, window.fadeTo = g.g, window.genFx = g.i, window.getRGB = g.k, window.getColor = g.j, window.slideDown = g.l, window.slideUp = g.n, window.slideToggle = g.m, window.fadeIn = g.e, window.fadeOut = g.f, window.fadeToggle = g.h, window.animateCount = g.c, window.updateAriaElements = go.c, window.updateAriaCheckboxes = go.b, window.hasAccessibilityMode = go.a, window.cancelStackFilter = T.a, window.cancelStackPush = T.c, window.cancelStackPop = T.b, Object(qo.a)(), window.ElementTooltip = p.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = m, 1 === Go.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== Go.al || history.pushState || (Go.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), Go.version = !1), Object(C.c)(), window.stManager = C.d, Object(b.c)(), window.browser = b.a, window.mobPlatforms = b.d, window.browserFeatures = b.b, Object(v.a)(), window.toggleFlash = v.c, window.renderFlash = v.b, zo(), window.updateHeaderStyles = H.i, window.updateNarrow = ee.m, window.checkPageBlocks = ee.c, window.redraw = ee.l, window.onBodyResize = ee.j, window.onBodyScroll = ee.k, window.leftBlockOver = ee.i, window.leftBlockOut = ee.h, window.leftBlockHide = ee.g, window.onDocumentClick = Oo.c, window.onEnter = Oo.d, window.onCtrlEnter = Oo.b, window.logLeftMenuClicks = N.a, window.autosizeSetup = ee.b, window.getProgressBarEl = ee.e, window.getProgressHtml = ee.f, Object(So.b)(), Y(), window.onDomReady = (e => e()), window.currentModule = (() => cur.currentModule ? cur.currentModule() : cur.module), window.hab = O(), window.ls = I.a, window.shortCurrency = x, window.statlogsValueEvent = N.d, window.saveSearchAttemptStats = N.c, window.removeSearchPositionTracker = N.b, window.callHub = Jo, window.CallHub = Jo, window.gSearch = new M, window.zNav = H.l, window.handlePageView = H.d, window.handlePageParams = H.c, window.handlePageCount = H.b, window.updateOtherCounters = H.k, window.processDestroy = H.f, window.globalHistoryDestroy = H.a, window.showBackLink = H.h, window.nav = F.a, nav.init(), Go.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                o = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === o[1] && 12 === Go.time[1] ? Go.time[1] = 0 : 12 === o[1] && 1 === Go.time[1] ? o[1] = 0 : (o[1] > Go.time[1] + 1 || Go.time[1] > o[1] + 1) && (o[1] = Go.time[1] = o[2] = Go.time[2] = 0), o[1] > Go.time[1] && 1 === o[2] ? 31 === Go.time[2] || (4 === Go.time[1] || 6 === Go.time[1] || 9 === Go.time[1] || 11 === Go.time[1]) && 30 === Go.time[2] || 2 === Go.time[1] && (29 === Go.time[2] || 28 === Go.time[2] && Go.time[0] % 4) ? Go.time[2] = 0 : Go.time[2] = o[2] = 0 : Go.time[1] > o[1] && 1 === Go.time[2] && (31 === o[2] || (4 === o[1] || 6 === o[1] || 9 === o[1] || 11 === o[1]) && 30 === o[2] || 2 === o[1] && (29 === o[2] || 28 === o[2] && Go.time[0] % 4) ? o[2] = 0 : o[2] = Go.time[2] = 0), (o[2] > Go.time[2] + 1 || Go.time[2] > o[2] + 1) && (o[2] = Go.time[2] = 0);
            var t = 60 * (60 * (24 * (o[2] - Go.time[2]) + (o[3] - Go.time[3])) + (o[4] - Go.time[4]));
            t < -55800 ? t += 86400 : t > 37800 && (t -= 86400);
            var i = new Date,
                n = Date.UTC(i.getFullYear(), i.getMonth(), i.getDate(), i.getHours(), i.getMinutes(), i.getSeconds()) / 1e3 - Object(X.b)();
            n -= 10800, n = (n /= 60).toFixed(0), (n *= 60) < -55800 ? n += 86400 : n > 37800 && (n -= 86400);
            var r = 0,
                d = Math.abs(n);
            Object(s.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], (e, o) => {
                var t = Math.round(3600 * (o - 3)),
                    i = Math.abs(n - t);
                i < d && (d = i, r = t)
            });
            var w = 0,
                c = Math.abs(t);
            Object(s.f)([-12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2, -1, 0, 1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12, 12.75, 13, 14], (e, o) => {
                var i = Math.round(3600 * (o - 3)),
                    n = Math.abs(t - i);
                n < c && (c = n, w = i)
            }), Object(N.d)("timeoffset_new_method", 1, w, r), Object($.a)("timezone_new_method") ? Go.dt = r : Go.dt = w, Object(a.a)("remixdt") !== Go.dt && Object(a.d)("remixdt", Go.dt, 365);
            var l = Object(s.r)(Object(a.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!b.a.iphone || Object(a.a)("remixme")) ? 1 & l || (Object(a.d)("remixrt", 1 | l, 365), window._retinaInit = function() {
                C.d.add(["retina.css"]), Object(f.a)(document.body, "is_2x")
            }, Ko && window._retinaInit()) : 1 & l && Object(a.d)("remixrt", 1 ^ l, 365)
        }, 0), window.boxQueue = Object(te.c)(), window.__bq = boxQueue, window.curBox = te.b, Object(te.d)(), window.boxRefreshCoords = te.a, window.MessageBox = oe.a, window.showBox = oe.b, window.showTabbedBox = oe.f, window.showFastBox = oe.d, window.showCaptchaBox = oe.c, window.showReCaptchaBox = oe.e, window.showDoneBox = te.e, window.TopMenu = ee.a, window.TopSearch = D.a, window.handleScroll = de.f, window.loadScript = A.a, window.SpecialEvent = Wo, Object(B.j)(), window.notaBene = B.q, window.updSideTopLink = B.y, window.createButton = B.d, window.actionsMenuItemLocked = B.a, window.lockActionsMenuItem = B.n, window.unlockActionsMenuItem = B.v, window.linkLocked = B.m, window.lockLink = B.p, window.unlockLink = B.x, window.lockButton = B.o, window.unlockButton = B.w, window.buttonLocked = B.b, window.isButtonLocked = B.k, window.disableButton = B.f, window.sbWidth = B.t, window.isChecked = B.l, window.checkbox = B.c, window.disable = B.e, window.radioval = B.s, window.radiobtn = B.r, window.showProgress = B.u, window.hideProgress = B.i, window.disableEl = B.g, window.enableEl = B.h, Object(S.d)(), window.VideoConstants = S.a, window.showVideo = S.j, window.showInlineVideo = S.i, window.loadInlineVideo = S.e, window.revertLastInlineVideo = S.h, window.destroyInlineVideoPlayer = S.c, window.pauseLastInlineVideo = S.f, window.playLastInlineVideo = S.g, window.checkMp4 = S.b, window.performance && window.performance.memory && Object(s.D)(0, 100) < 5 && Object(_o.a)(), xe ? (Object(_.b)(window, "blur", Je), Object(_.b)(window, "focus", Xe), onDomReady(() => setTimeout(Ge, 500)), window.LongView = {
            register: Ke,
            onScroll: Object(de.n)(Qe, 50),
            onBeforePageChange: $e,
            clearElemsCache: ze,
            _debug: function() {
                return {
                    started: Ne,
                    tracking: Ce,
                    viewedData: Be,
                    viewIndexes: qe,
                    blindTop: Me,
                    blindBottom: De
                }
            }
        }) : window.LongView = {
            register: () => {},
            onScroll: () => {},
            onBeforePageChange: () => {},
            clearElemsCache: () => {}
        }, Object(ae.g)(), $o(), window.onLoaded = Xo, window.domStarted = Qo, window.domReady = Yo, Object(Z.c)("common module enabled"), C.d.done(jsc("web/common_web.js"))
    }
});