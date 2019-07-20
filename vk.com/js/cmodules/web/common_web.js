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
        o("pIFo"), o("OG14"), o("SRfc");
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
        var b = o("gdug"),
            p = o("k487"),
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
            _ = (o("a1Th"), o("Egk5"));

        function O() {
            return new function(e) {
                var t, o = function(e) {
                        var [t, o] = e.split("#"), [i, n] = t.split("?");
                        return i + (n ? "?" + Object(d.b)(Object(d.e)(n)) : "") + (o ? "#" + o : "")
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
                        1 == vk.al && a(!0), 3 == vk.al ? (Object(_.b)(window, "popstate", a), b.a.safari && Object(_.b)(window, "hashchange", a)) : "onhashchange" in window ? Object(_.b)(window, "hashchange", function() {
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
        var y = o("4+be"),
            j = o("lXE5"),
            E = o("Ia1d"),
            S = o("XuKo"),
            k = o("ErRf"),
            T = o("/PiP"),
            P = {
                sh: function(e, t) {
                    Object(f.ub)(e), Object(s.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(f.W)(e), Object(s.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, o, i) {
                    var n = "layers" + (boxQueue.count() + 1);
                    Object(k.c)(n, function() {}), Object(f.rb)(e, {
                        opacity: o || "",
                        backgroundColor: i || ""
                    }), P.visible || (Object(v.c)(), Object(j.a)()), P.visible || Object(E.f)(), P.visible = !0, Object(f.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(f.hb)(t, "box_layer_hidden") : Object(f.ub)(t), P.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    P.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(k.a)(e), t && t.visibilityHide ? Object(f.a)(t, "box_layer_hidden") : Object(f.W)(t), Object(f.ab)(layerWrap) || cur._inLayer || Object(f.ab)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(f.ab)(window.mvLayerWrap)) || Object(f.ab)(window.wkLayerWrap) || (P.visible = !1, Object(f.hb)(bodyNode, "layers_shown"), Object(v.c)(!0), Object(j.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), P.visible || Object(E.g)()
                }
            },
            L = {
                push: function(e) {
                    var t, o = !!L.count() && L._layers[L._layers.length - 1];
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
                    return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || L._layers.push(t), L.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = L._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    L._bl = !0, window.WkView && P.fullhide == WkView.hide ? (Object(f.W)(wkLayerWrap), clearTimeout(wkcur.showT)) : P.fullhide && P.fullhide(!0, !0), setTimeout(L.unblock, 5)
                },
                unblock: function() {
                    L._bl = !1
                },
                pop: function() {
                    if (L.count() && !L._bl) {
                        var e = L._layers.pop();
                        if (L.skipVideo && (L.skipVideo = !1, "video" == e[0])) return L._layers.push(e), void(L.skipVideo = !1);
                        "photo" === e[0] ? (Object(s.i)(e[3], {
                            fromQueue: !0
                        }), Object(T.y)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(s.i)(e[3], {
                            fromQueue: !0
                        }), Object(E.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(T.C)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(S.c)(e[1]) : "podcast" === e[0] && Object(T.A)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, o, i) {
                    for (var n = L._layers, r = n.length; r > 0; --r)
                        if (n[r - 1][0] == e && n[r - 1][1] == t || n[r - 1][0] == o && n[r - 1][1] == i) return L._layers = n.slice(0, r), L.pop(), !0;
                    return !1
                },
                count: function() {
                    return L._layers.length
                },
                clear: function() {
                    L._layers = []
                },
                _layers: []
            };
        var R = o("Xrg9");

        function I() {
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
        var x = o("0gG3"),
            C = o("XzvV"),
            N = o("v+DW"),
            B = o("lkNA");
        var A = class {
                constructor() {
                    var {
                        CallHub: e
                    } = window;
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
                    var {
                        placeholderSetup: t
                    } = window;
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
                        var {
                            toggleFlash: o
                        } = window;
                        if (this.on = 0, o(), this.beforeHide && this.beforeHide()) return !0;
                        Object(f.F)("search_input").setValue ? Object(f.F)("search_input").setValue("") : Object(f.F)("search_input").value = "", Object(f.W)(this.sCont), Object(f.hb)(Object(f.F)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }
                preload() {}
            },
            M = o("Bszp"),
            D = o("MSYF"),
            F = o("kHqu"),
            H = "remixjsp";

        function V() {
            ! function() {
                var {
                    performance: e
                } = window;
                e && e.getEntriesByType && e.getEntriesByType("paint").forEach(e => {
                    "first-contentful-paint" === e.name && z(e.startTime, "TTFCP")
                })
            }(),
            function() {
                var {
                    performance: e
                } = window;
                e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(e => {
                    if ("navigation" === e.initiatorType) {
                        var {
                            domComplete: t,
                            domContentLoadedEventEnd: o,
                            loadEventEnd: i
                        } = e;
                        z(t, "domComplete"), z(o, "domContentLoadedEventEnd"), z(i, "loadEventEnd")
                    }
                })
            }(), G()
        }
        var U = [],
            W = !1;

        function G() {
            if (W) {
                var {
                    performance: e
                } = window, t = U[U.length - 1];
                if (!t) return W = !1, void z(-1);
                var o = t.startTime + t.duration;
                e.now() - o >= 3e3 ? z(o, "TTI") : setTimeout(G, 3e3)
            }
        }
        var q = [];

        function z(e, t) {
            var o = Math.floor(e);
            if (-1 !== e && (q.push([o, t]), !(W ? "TTI" === t : q.length > 2))) return;
            var i = "unknown",
                {
                    connection: n
                } = navigator;
            n && n.effectiveType && (i = n.effectiveType);
            var r = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            q.forEach(([e, t]) => r.events.push([t, e, cur.module, i, window.vk.rv])), Object(a.d)(H, JSON.stringify(r), .01)
        }

        function K() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(e => {
                U = U.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), W = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout(V, 0)
            }) : V()
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
            Y = o("1BRX"),
            J = o("W9Tc"),
            X = o("98sY"),
            $ = o("El3O"),
            Z = o("EasH"),
            ee = o("kcIO"),
            te = o("FWc3");

        function oe(e, t) {
            var o = t.asrtl ? 0 : t.right ? 289 : 35,
                i = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
            return Object(te.c)(e, {
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

        function ie(e, t) {
            return Object(te.c)(e, {
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

        function ne(e, t, o) {
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
                }), Object(f.T)("_im_mess_stack", e) && (d.shift = [7, 10, 0], d.noZIndex = !0), Object(te.c)(e, d)
            }
        }

        function re(e, t = {}) {
            Object(te.c)(e, {
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

        function ae(e) {
            var t = "";
            Object(f.T)("_im_mess_stack", e) ? t = "_im_mess_stack" : Object(f.T)("wall_text", e) && (t = "scroll_fix_wrap"), Object(te.c)(e, {
                className: "bookmarks_tt ",
                shift: [32, 8],
                text: () => "1" === Object(f.s)(e, "state") ? Object(f.s)(e, "remove") : Object(f.s)(e, "add"),
                black: 1,
                appendParentCls: t
            })
        }
        var de = o("Ieup"),
            se = o("t/FQ"),
            we = o("aong"),
            ce = .5,
            le = .25,
            ue = 300,
            he = 1e3,
            be = 3e5,
            pe = 2500,
            fe = 5e3,
            me = 6e3,
            ve = 2e4,
            ge = 1e3,
            _e = 36e4,
            Oe = "_longViewType",
            ye = "_longViewIdled",
            je = "_longViewModule",
            Ee = "_longViewStarted",
            Se = "_longViewProcessed",
            ke = "_longViewCached",
            Te = "_longViewHeight",
            Pe = "_longViewTop",
            Le = "_longViewBottom",
            Re = "REGULAR",
            Ie = "AUTOPLAY_AD",
            xe = "LongView.viewed",
            Ce = "LongView.idled",
            Ne = vk.longViewTestGroup,
            Be = [],
            Ae = [],
            Me = [],
            De = Date.now(),
            Fe = 0,
            He = 0,
            Ve = !1,
            Ue = null,
            We = null,
            Ge = null,
            qe = null,
            ze = {};

        function Ke() {
            var e = ut();
            e.length && (st(e), ht())
        }

        function Qe() {
            Be.forEach(function(e) {
                e[ke] = !1
            })
        }

        function Ye(e, t) {
            "im" === t && !e[Oe] && function(e) {
                if (Object(f.V)(e, "im-mess--post")) return !0;
                var t = e && Object(f.u)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(f.V)(e, "no_posts"))
            }(e) && (e[Oe] = function(e) {
                var t = e && Object(f.u)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? Ie : Re
            }(e), e[je] = t, Be.push(e))
        }

        function Je(e, t) {
            var o = Je;
            ! function(e, t) {
                var o = [];
                Be.forEach(function(i) {
                    vt(i) ? o.push(i) : ! function(e, t, o) {
                        return !e[Ee] && pt(e, ce, t, o)
                    }(i, e, t) ? function(e, t, o) {
                        return e[Ee] && !pt(e, le, t, o)
                    }(i, e, t) && (i[ye] ? delete i[ye] : (gt(Ae, i), Me = Me.concat(mt(i))), delete i[Ee]) : (i[Ee] = Date.now(), Ae.push(i))
                }), o.forEach(function(e) {
                    gt(Be, e)
                })
            }(e || Object(j.e)(), t || window.innerHeight), Ve ? (clearTimeout(o.timer), o.timer = setTimeout(Xe, 150)) : (Ve = !0, ot(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(f.H)("im-page--chat-header"),
                        t = Object(f.H)("im-page--chat-input");
                    Fe = e.getBoundingClientRect().top + e.offsetHeight, He = window.innerHeight - t.getBoundingClientRect().top
                } else Fe = Object(f.F)("page_header").offsetHeight, He = 0
            }())
        }

        function Xe() {
            ot(), tt(), Ve = !1
        }

        function $e() {
            ot(), dt()
        }

        function Ze() {
            Me = [], Ae.forEach(e => e[Ee] = Date.now()), wt(null), ct(null), tt()
        }

        function et() {
            ot(), dt(), Me = [], Ae = [], wt(null), ct(null)
        }

        function tt() {
            Ue = setTimeout(it, pe), We = setTimeout(nt, fe), Ge = setTimeout(rt, me), qe = setTimeout(at, ve)
        }

        function ot() {
            clearTimeout(Ue), clearTimeout(We), clearTimeout(Ge), clearTimeout(qe)
        }

        function it() {
            Me.length && wt(Me)
        }

        function nt() {
            st(Me), Me = [], wt(null)
        }

        function rt() {
            Ae.length && (ct(ft(Ae, !0, !0)), Ge = setTimeout(rt, ge))
        }

        function at() {
            clearTimeout(Ge), st(ft(Ae)), Ae.forEach(e => e[ye] = !0), Ae = [], ct(null)
        }

        function dt() {
            st(Me.concat(ft(Ae)))
        }

        function st(e) {
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

        function wt(e) {
            lt(xe, e)
        }

        function ct(e) {
            lt(Ce, e)
        }

        function lt(e, t) {
            var o = R.a.get(e) || {};
            t ? o[De] = t : delete o[De], R.a.set(e, o)
        }

        function ut() {
            var e = ut,
                t = [],
                o = R.a.get(xe) || {},
                i = R.a.get(Ce) || {};
            return e.iterator || (e.iterator = (e => o => {
                bt(o) && (t = t.concat(e[o]))
            })), Object.keys(o).forEach(e.iterator(o)), Object.keys(i).forEach(e.iterator(i)), t
        }

        function ht() {
            var e = ht,
                t = R.a.get(xe) || {},
                o = R.a.get(Ce) || {};
            e.iterator || (e.iterator = (e => t => {
                bt(t) && delete e[t]
            })), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), R.a.set(xe, t), R.a.set(Ce, o)
        }

        function bt(e) {
            var t = Number(e);
            return t !== De && Date.now() - t >= _e
        }

        function pt(e, t, o, i) {
            if (!e) return !1;
            e[ke] || (e[ke] = !0, e[Te] = e.offsetHeight, e[Pe] = o + e.getBoundingClientRect().top, e[Le] = e[Pe] + e[Te]);
            var n = i - Fe - He,
                r = o + Fe,
                a = o + i - He,
                d = e[Te],
                s = e[Pe],
                w = e[Le];
            return (w > r && s < a ? Math.min(a, w) - Math.max(r, s) : 0) >= Math.min(n * t, d * t)
        }

        function ft(e, t, o) {
            return e.map(e => mt(e, t, o))
        }

        function mt(e, t, o) {
            if (vt(e)) return [];
            var i = Math.min(be, Date.now() - e[Ee]);
            if (e[Oe] === Re && i < ue || e[Oe] === Ie && i < he) return [];
            o || (e[Se] = !0);
            var n = function(e) {
                    var t = e[je];
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
                    t || (ze[u = c + "_" + l] || (ze[u] = 0), ze[u]++), d.push("ad" === c ? {
                        ownerId: "ad",
                        postId: l,
                        module: r,
                        viewIndex: ze[u]
                    } : "ads" === c ? {
                        ownerId: "ads",
                        postId: l,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        viewIndex: ze[u]
                    } : {
                        ownerId: c,
                        postId: (1 === n[s] ? "" : "-") + l,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        q: n.q || null,
                        viewIndex: ze[u]
                    })
                }
            return d
        }

        function vt(e) {
            return "page_view" === Ne && e[Se] || !document.body.contains(e)
        }

        function gt(e, t) {
            var o = e.indexOf(t);
            o >= 0 && e.splice(o, 1)
        }
        var _t = o("QGEU"),
            Ot = o("eNQP"),
            yt = o("o7bv"),
            jt = o("wetz"),
            Et = o("BJj/"),
            St = o("i6oL"),
            kt = o("m0N1");
        var Tt = o("W0P9"),
            Pt = 5e3,
            Lt = "push_notifier_endpoint",
            Rt = "push_notifier_subscribed_ts",
            It = 6e4,
            xt = 432e6;
        class Ct {
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
                return R.a.get(Lt + vk.id) || !1
            }
            saveEndpoint(e) {
                R.a.set(Lt + vk.id, e || !1)
            }
            action(e, t) {
                return this.sw.action(e, t)
            }
            _needupdate(e) {
                var t = Date.now(),
                    o = this.loadEndpoint(),
                    i = R.a.get(Rt + vk.id),
                    n = !1;
                return (o !== e.endpoint || !i || t - i > It) && (R.a.set(Rt + vk.id, t), n = !0), n
            }
            listenPermission() {
                Object(J.a)("push_notifier") && navigator.permissions && navigator.permissions.query && navigator.permissions.query({
                    name: "notifications"
                }).then(e => {
                    e.onchange = (() => this.update())
                })
            }
            update() {
                return this.updatePermission().then(e => e === Ct.PUSH_NOTIFIER_PERMISSION_GRANTED ? this.subscribe().catch(e => {
                    e !== Ct.SUBSCRIBE_ERROR_NETWORK && e("can not update subscribe")
                }) : Promise.reject("premession_not_granted")).catch(Tt.a)
            }
            updatePermission() {
                var e = Ct.getPermission();
                if (e !== Ct.PUSH_NOTIFIER_PERMISSION_GRANTED) {
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
                    }(Ct.SERVER_KEY)
                })
            }
            setupSubscription() {
                return new Promise((e, t) => {
                    var o = Ct.getPermission(),
                        i = () => {
                            this.subscribe(!0).then(() => {
                                e()
                            }).catch(() => {
                                t()
                            })
                        };
                    o !== Ct.PUSH_NOTIFIER_PERMISSION_DENIED ? o !== Ct.PUSH_NOTIFIER_PERMISSION_GRANTED ? o === Ct.PUSH_NOTIFIER_PERMISSION_DEFAULT && this.requestPermission().then(e => {
                        e === Ct.PUSH_NOTIFIER_PERMISSION_GRANTED ? i() : t()
                    }) : i() : t(Ct.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS)
                })
            }
            subscribe(e) {
                return this.sw.register().then(e => {
                    var t = e.pushManager;
                    return t.getSubscription().then(e => {
                        if (e) {
                            var {
                                expirationTime: o
                            } = e;
                            return o && Date.now() > o - xt ? this.unsubscribe(this.loadEndpoint()).then(() => this.processSubscribe(t)) : e
                        }
                        return this.processSubscribe(t)
                    })
                }).then(t => new Promise((o, i) => {
                    if (e || this._needupdate(t)) {
                        var n = t.getKey("p256dh"),
                            r = t.getKey("auth");
                        window.ajax.post(Ct.SERVER_URL, {
                            act: "a_subscribe",
                            endpoint: t.endpoint,
                            key: n ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("p256dh")))) : null,
                            token: r ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("auth")))) : null
                        }, {
                            onDone: e => {
                                e ? (this.saveEndpoint(t.endpoint), o()) : i()
                            },
                            onFail: () => (i(Ct.SUBSCRIBE_ERROR_NETWORK), !0)
                        })
                    } else o()
                }))
            }
            unsubscribe(e) {
                return this.sw.register().then(t => t.pushManager.getSubscription().then(t => t ? t.unsubscribe().then(t => t ? new Promise((t, o) => {
                    ajax.post(Ct.SERVER_URL, {
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
                var e = Ct.getPermission();
                return e === Ct.PUSH_NOTIFIER_PERMISSION_DEFAULT ? new Promise(function(e, t) {
                    var o = Notification.requestPermission(function(t) {
                        e(t)
                    });
                    o instanceof Promise && o.then(e, t)
                }) : Promise.resolve(e)
            }
            checkMessageState() {
                return new Promise(e => setTimeout(e, Pt)).then(() => this.action("getMessagesMetaData")).then(e => "object" == typeof e && Object.keys(e).length ? new Promise((t, o) => {
                    window.ajax.post(Ct.SERVER_URL, {
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
                }).then(e => this.action("updateMessageNotifications", e)).catch(e => Object(Tt.a)(e))
            }
        }
        Ct.SERVER_KEY = "BPrntRk2W1_ISFwlgY-vz9tQDg9i1oSQ3-N8xyjdbNAbIOdZIGFdh5FlO7zn730UwU9Sayoec-Fpqq4JZFTyv60", Ct.SERVER_URL = "push_notifier", Ct.PUSH_NOTIFIER_PERMISSION_GRANTED = "granted", Ct.PUSH_NOTIFIER_PERMISSION_DEFAULT = "default", Ct.PUSH_NOTIFIER_PERMISSION_DENIED = "denied", Ct.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS = "BLOCKED_BY_BROWSER_SETTINGS", Ct.SUBSCRIBE_ERROR_NETWORK = "SUBSCRIBE_ERROR_NETWORK";
        var Nt = Ct;
        var Bt = class extends Nt {
                constructor(e, t) {
                    super(e, t), this.canBeEnabled().then(e => {
                        e && (addClass(document.head, "push_notifier_supported"), this.handlerMessagesLP = this.handlerMessagesLP.bind(this))
                    })
                }
                isSupported() {
                    return super.isSupported() && (browser.chrome || browser.mozilla)
                }
                handlerMessagesLP(e = {}) {
                    var {
                        type: t,
                        peerId: o,
                        upToId: i
                    } = e;
                    "event_read_inbound" === t && this.sw.action("removeMessageNotification", {
                        peerId: o,
                        msgId: i
                    })
                }
                handlerPopup(e, t) {
                    var o = Object(ee.b)();
                    o && Object(f.W)(o.bodyNode), this.setupSubscription().then(() => this.setState(e, t)).then(() => {
                        o && o.hide(), e ? Object(C.d)("push_notifier_subscribe_via_popup", "msg") : Object(C.d)("push_notifier_subscribe_via_popup", "all")
                    }).catch(e => {
                        Nt.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === e ? (Object(f.ub)(o().bodyNode), this.showPopupAllowNotification()) : Object(Z.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                    })
                }
                closePopup() {
                    var e = Object(ee.b)();
                    e && e.hide(), Object(C.d)("push_notifier_subscribe_via_popup", "close")
                }
                showPopupAllowNotification() {
                    var e = Object(Z.b)(Nt.SERVER_URL, {
                        act: "popup_allow_notification"
                    }, {
                        params: {
                            hideButtons: !0
                        },
                        containerClass: "PushNotifierPopup__popup-box_type--allow-notification",
                        onFail: () => {
                            e ? e.hide() : Object(Z.d)(getLang("global_error"), getLang("notifications_native_common_error"))
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
                        ajax.post(Nt.SERVER_URL, {
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
            At = "sw";

        function Mt(e) {
            return {
                type: At,
                data: e
            }
        }

        function Dt(e) {
            return ("" === e.origin || e.origin.match(/^https:\/\/([a-zA-Z0-9\-\.]+\.)?vk\.com$/)) && e.data && e.data.data && e.data.type === At
        }
        var Ft = "/js/cmodules/sw/sw.js",
            Ht = "/";
        class Vt {
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
                return Vt.isSupported() ? this.registration ? Promise.resolve(this.registration) : navigator.serviceWorker.register(Vt.addVersion(Ft), {
                    scope: Ht
                }).then(this._onactive.bind(this)).then(e => (this.registration || (this.registration = e, this._addEventListener(navigator.serviceWorker, "message", this._onmessage.bind(this), !1)), e)) : Promise.reject("serviceWorker is unavailable")
            }
            unregister() {
                this.registration && this.registration.unregister(), this._handlers.forEach(e => e[0].removeEventListener(e[1], e[2])), this._handlers = []
            }
            update() {
                this.registration && this.registration.update()
            }
            _addEventListener(e, t, o, i = !0) {
                var n = !1;
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
                        Dt(e) ? t(e.data.data) : o(new Error("ServiceWorker message is incorrect"))
                    }, this.registration.active.postMessage(Mt(e), [i.port2])
                }))
            }
            _onmessage(e) {
                if (Dt(e)) {
                    var t = e.data.data;
                    if (t.actions && Array.isArray(t.actions)) {
                        var o = [];
                        t.actions.forEach(([t, i]) => {
                            var n = "action_" + t;
                            o.push(Promise.resolve(this[n] ? this[n](i, e) : void 0))
                        }), Promise.all(o).then(function(t) {
                            var o = {};
                            t.forEach((e, t) => {
                                void 0 !== e && (o[t] = e)
                            }), Object.keys(o).length && e.ports[0].postMessage(Mt({
                                answers: o
                            }))
                        })
                    }
                }
            }
        }
        var Ut = window.isMVK ? "mvk" : "web",
            Wt = {
                start: function(e, t) {
                    if (t.stopPropagation(), t.preventDefault(), this.id = window.domData(e, "id"), this.id && (window.statlogsValueEvent("special_event", "click", Ut, this.id), !this.timeoutHandle)) {
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
                            e.stop(), e.destroy(), this.frame.style.display = "none", this.timeoutHandle = null, window.statlogsValueEvent("special_event", "showed", Ut, this.id)
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
            Gt = o("B3ia"),
            {
                vk: qt
            } = window;

        function zt() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, qt.width = 960, qt.started = Object(s.L)(), qt.counts = {}, b.a.android && (Object(a.d)("remixscreen_width", window.screen.width, 365), Object(a.d)("remixscreen_height", window.screen.height, 365), Object(a.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(a.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(a.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(F.e)(), Object(x.b)(), Object(_.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(_.h)(vkCache[e].handle.elem)
            }), Object(_.b)(window, "DOMContentLoaded load", function() {
                qt.loaded || (qt.loaded = !0, Object(N.y)()), Object($.c)()
            }), Object(_.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(_.b)(document, "keydown", jt.a)
        }
        var Kt = 0;

        function Qt() {
            if (window.headNode = Object(f.J)("head"), window.icoNode = Object(f.J)("link", headNode), window.bodyNode = Object(f.J)("body"), window.htmlNode = Object(f.J)("html"), window.utilsNode = Object(f.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(_.b)(bodyNode, "resize", $.j.pbind(!1)), utilsNode) {
                b.a.mozilla ? Object(f.a)(bodyNode, "firefox") : b.a.mobile && Object(f.a)(bodyNode, "mobfixed"), Object(se.f)(), Object(x.a)();
                var e = Object(f.F)("layer_bg"),
                    t = e.nextSibling,
                    o = Object(f.F)("box_layer_bg"),
                    i = o.nextSibling;
                window.layerBG = e, window.boxLayerBG = o, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(f.F)("stl_side"), window._stlLeft = Object(f.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, b.a.mobile || Object(St.a)(), Object(_.b)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, t, o, i) {
                    return window.layerQueue = L, Object(s.i)(P, {
                        show: P._show.pbind(e, t),
                        boxshow: P._show.pbind(o, i),
                        wrapshow: P._show.pbind(e),
                        hide: P._hide.pbind(e, t),
                        boxhide: P._hide.pbind(o, i),
                        wraphide: P._hide.pbind(e)
                    }), P
                }(e, t, o, i), hab.init(), window._retinaInit ? window._retinaInit() : Kt = 1, qt.disableSW || (window.PushNotifier = Bt, window.sw = new Vt, window.sw.register().then(() => {
                    window.pushNotifier = new Bt(window.sw, Vt)
                }))
            }
        }

        function Yt() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: () => cur.module,
                    getOID: () => cur.oid,
                    doesScrollTriggerIdle: !0
                })), Object(St.b)();
                var e = Object(f.F)("side_bar");
                window.pageNode = Object(f.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(f.O)(e, "position"), window._tbLink = Object(f.F)("top_back_link"), b.a.chrome || b.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = b.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(s.L)() - qt.started, 10),
                    o = Object(s.r)((qt.contlen || 1) / t * 1e3);
                b.a.mozilla && b.a.version >= 4 ? o /= 2.5 : b.a.mozilla ? o *= 1.5 : b.a.msie && b.a.version >= 7 ? o /= 1.5 : b.a.msie && (o *= 2.5);
                var i = Object(s.r)(150 * Math.max(2e6 / o, 1));
                if (x.d.highlimit = 6 * i, x.d.lowlimit = Math.min(i, 600), Object($.j)(), setTimeout($.j.pbind(!1), 0), Object(_t.c)(), window.addEventListener("scroll", $.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !qt.id && R.a.checkVersion() && R.a.get("last_reloaded")) try {
                    var n = {};
                    Object(s.f)(["sound_notify_off", "im_ui_notify_off"], (e, t) => {
                        var o = R.a.get(t);
                        null !== o && (n[t] = o)
                    }), window.localStorage.clear(), Object(s.f)(n, (e, t) => R.a.set(e, t))
                } catch (e) {}
            }
        }
        class Jt {
            constructor(e, t) {
                this.count = t || 1, this.func = e
            }
            done(e = 1) {
                this.count -= e, this.count <= 0 && this.func()
            }
        }

        function Xt(e) {
            qt.loaded ? e() : Object(_.b)(window, "load", e)
        }

        function $t() {
            window.showWriteMessageBox = de.g, window.giftsBox = de.a, window.moneyTransferBox = de.d, window.reportAd = de.e, window.mobilePromo = de.c, window.showAudioClaimWarning = de.f, window.menuSettings = de.b, window.sureDeleteAll = de.h, window.TopNotifier = Object(T.m)(), window.showPhoto = T.y, window.showManyPhoto = T.x, window.showAlbums = T.v, window.showAlbum = T.u, window.showPhotoTags = T.z, window.isPhotoeditor3Available = T.p, window.AudioMessagePlayer = T.a, window.showVideoTags = T.B, window.videoCallback = T.D, window.showWiki = T.C, window.showApp = T.w, window.showPodcast = T.A, window.podcastStartFrom = T.s, window.articlePrepare = T.b, window.isArticleLayerOpen = T.o, window.isArticleEditorAvailable = T.n, window.openArticleEditor = T.r, window.mentionOver = re, window.mentionClick = T.q, window.mobileOnlineTip = oe, window.pageVerifiedTip = ie, window.audioShowActionTooltip = ne, window.shareAudioPlaylist = T.t, window.getAudioPlayer = T.k, window.deleteAudioOnClaim = T.j, window.initTopAudioPlayer = T.l, window.bookmark = T.c, window.bookmarkPost = T.i, window.bookmarkArticle = T.d, window.bookmarkLink = T.f, window.bookmarkPodcast = T.h, window.bookmarkNarrative = T.g, window.bookmarkEvent = T.e, window.bookmarkTooltip = ae, window.showStory = S.c, window.showNarrative = S.b, window.storiesPreloadStatic = S.d, window.sendMask = S.a
        }
        window.constants = {
            Groups: Q
        }, window.partConfigEnabled = J.a, Object(f.X)(), window.ge = f.F, window.geByTag = f.I, window.geByTag1 = f.J, window.geByClass = f.G, window.geByClass1 = f.H, window.gpeByClass = f.T, window.domQuery = f.B, window.domQuery1 = f.C, window.domClosest = f.n, window.ce = f.e, window.cf = f.f, window.re = f.fb, window.se = f.mb, window.sech = f.nb, window.rs = f.lb, window.psr = f.eb, window.domReplaceEl = f.D, window.domEL = f.t, window.domNS = f.y, window.domPS = f.A, window.domFC = f.u, window.domLC = f.x, window.domPN = f.z, window.domChildren = f.m, window.domInsertBefore = f.w, window.domInsertAfter = f.v, window.domByClass = f.j, window.domData = f.s, window.domChildIndex = f.l, window.domCA = f.k, window.domClosestSibling = f.r, window.matchesSelector = f.db, window.isHover = f.Z, window.isAncestor = f.Y, window.getScroll = f.M, window.domClosestPositioned = f.q, window.domClosestOverflowHidden = f.p, window.show = f.ub, window.hide = f.W, window.isVisible = f.ab, window.clientHeight = f.h, window.getClientRectOffsetY = f.K, window.toggle = f.vb, window.boundingRectEnabled = f.d, window.getXYRect = f.R, window.getXY = f.Q, window.isWindow = f.bb, window.getSize = f.N, window.hasClass = f.V, window.addClass = f.a, window.addClassDelayed = f.b, window.removeClass = f.hb, window.removeClassDelayed = f.ib, window.toggleClass = f.wb, window.toggleClassDelayed = f.xb, window.replaceClass = f.kb, window.getStyle = f.O, window.setStyle = f.rb, window.setStyleDelayed = f.sb, window.setPseudoStyle = f.qb, window.data = f.i, window.attr = f.c, window.removeAttr = f.gb, window.removeData = f.jb, window.cleanElems = f.g, window.setTitle = f.tb, window.getZoom = f.S, window.val = f.zb, window.elfocus = f.E, window.traverseParent = f.yb, window.getH = f.L, window.getW = f.P, window.domClosestByTag = f.o, window.setDocumentTitle = f.ob, window.lockDocumentTitle = f.cb, window.KEY = _.a, window.addEvent = _.b, window.removeEvent = _.h, window.triggerEvent = _.j, window.cancelEvent = _.c, window.stopEvent = _.i, window.normEvent = _.g, window.checkEvent = _.d, window.checkKeyboardEvent = _.e, window.checkOver = _.f, Object(s.q)(), window.isRetina = s.y, window.extractUrls = s.j, window.serializeForm = s.F, window.addTemplates = s.a, window.getTemplate = s.n, window.rand = s.D, window.irand = s.s, window.isUndefined = s.A, window.isFunction = s.v, window.isArray = s.t, window.isString = s.z, window.isObject = s.x, window.isEmpty = s.u, window.vkNow = s.L, window.vkImage = s.J, window.trim = s.H, window.stripHTML = s.G, window.escapeRE = s.h, window.intval = s.r, window.floatval = s.k, window.positive = s.C, window.isNumeric = s.w, window.winToUtf = s.M, window.replaceEntities = s.E, window.clean = s.c, window.unclean = s.I, window.each = s.f, window.indexOf = s.p, window.inArray = s.o, window.clone = s.d, window.arrayKeyDiff = s.b, window.extend = s.i, window.vkLocal = s.K, window.lTimeout = s.B, window.getCaretCharacterOffsetWithin = s.m, window.formatCount = s.l, window.encodeHtml = s.g, window.decodeHtml = s.e, Object(d.c)(), window.ajx2q = d.b, window.q2ajx = d.e, window.AjaxConvert = i, window.requestBox = d.f, window.activateMobileBox = d.a, window.validateMobileBox = d.g, window.validatePassBox = d.h, Object(a.c)(), window.getCookie = a.a, window.setCookie = a.d, window.hideCookiesPolicy = a.b, Object(X.d)(), window.debugLog = X.c, window.debugEl = X.b, window.isToday = Y.d, window.isYesterday = Y.f, window.isTomorrow = Y.e, window.isSameDate = Y.c, window.leadingZero = Y.g, window.formatTime = Y.a, window.getServerTime = Y.b, window.parseLatin = y.o, window.parseCyr = y.m, window.parseLatKeys = y.n, window.langNumeric = y.i, window.langSex = y.j, window.langStr = y.k, window.addLangKeys = y.a, window.getLang = y.d, window.langDate = y.h, window.getShortDate = y.e, window.getShortDateOrTime = y.f, window.langWordNumeric = y.l, window.getDateText = y.c, window.getBigDateNew = y.b, window.getSmDate = y.g, window.scrollToY = j.g, window.scrollToTop = j.f, window.scrollGetX = j.d, window.scrollGetY = j.e, window.disableBodyScroll = j.a, window.enableBodyScroll = j.b, window.Chat = se.a, window.__qlTimer = null, window.__qlClear = se.b, window.onLoginDone = se.m, window.onLoginFailed = se.n, window.onLoginCaptcha = se.l, window.onLoginReCaptcha = se.o, window.storePasswordCredential = se.p, window.cssAnim = se.c, window.imagesLoader = se.e, window.nodeUpdated = se.k, window.hideNewsAnnounce = se.d, window.leftAdBlockClose = se.h, window.leftBlockToggleFriend = se.j, window.leftBlockFriendTooltip = se.i, window.placeholderSetup = yt.c, window.placeholderInit = yt.b, window.isInputActive = yt.a, window.showTooltip = te.c, window.showTitle = te.b, window.showHint = te.a, window.topMsg = r.d, window.showMsg = r.b, window.topError = r.c, window.showGlobalPrg = r.a, window.checkTextLength = we.b, window.getSelectionText = we.c, window.goAway = we.d, window.debounce = Et.a, window.hashCode = we.f, window.isFullScreen = we.g, window.parallel = we.j, window.parseJSON = we.k, window.shuffle = we.l, window.throttle = we.m, window.toggleOnline = we.p, window.updateMoney = we.r, window.onlinePlatformClass = we.i, window.Fx = g.a, window.fx = g.a, window.animate = g.b, window.cubicBezier = g.d, window.fadeTo = g.g, window.genFx = g.i, window.getRGB = g.k, window.getColor = g.j, window.slideDown = g.l, window.slideUp = g.n, window.slideToggle = g.m, window.fadeIn = g.e, window.fadeOut = g.f, window.fadeToggle = g.h, window.animateCount = g.c, window.updateAriaElements = _t.c, window.updateAriaCheckboxes = _t.b, window.hasAccessibilityMode = _t.a, window.cancelStackFilter = k.a, window.cancelStackPush = k.c, window.cancelStackPop = k.b, Object(Gt.a)(), window.ElementTooltip = p.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = m, 1 === qt.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== qt.al || history.pushState || (qt.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), qt.version = !1), Object(x.c)(), window.stManager = x.d, Object(b.c)(), window.browser = b.a, window.mobPlatforms = b.d, window.browserFeatures = b.b, Object(v.a)(), window.toggleFlash = v.c, window.renderFlash = v.b, zt(), window.updateHeaderStyles = F.i, window.updateNarrow = $.m, window.checkPageBlocks = $.c, window.redraw = $.l, window.onBodyResize = $.j, window.onBodyScroll = $.k, window.leftBlockOver = $.i, window.leftBlockOut = $.h, window.leftBlockHide = $.g, window.onDocumentClick = jt.c, window.onEnter = jt.d, window.onCtrlEnter = jt.b, window.logLeftMenuClicks = C.a, window.autosizeSetup = $.b, window.getProgressBarEl = $.e, window.getProgressHtml = $.f, Object(kt.b)(), K(), window.onDomReady = (e => e()), window.currentModule = (() => cur.currentModule ? cur.currentModule() : cur.module), window.hab = O(), window.ls = R.a, window.shortCurrency = I, window.statlogsValueEvent = C.d, window.saveSearchAttemptStats = C.c, window.removeSearchPositionTracker = C.b, window.callHub = Jt, window.CallHub = Jt, window.gSearch = new A, window.zNav = F.l, window.handlePageView = F.d, window.handlePageParams = F.c, window.handlePageCount = F.b, window.updateOtherCounters = F.k, window.processDestroy = F.f, window.globalHistoryDestroy = F.a, window.showBackLink = F.h, window.nav = D.a, nav.init(), qt.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === t[1] && 12 === qt.time[1] ? qt.time[1] = 0 : 12 === t[1] && 1 === qt.time[1] ? t[1] = 0 : (t[1] > qt.time[1] + 1 || qt.time[1] > t[1] + 1) && (t[1] = qt.time[1] = t[2] = qt.time[2] = 0), t[1] > qt.time[1] && 1 === t[2] ? 31 === qt.time[2] || (4 === qt.time[1] || 6 === qt.time[1] || 9 === qt.time[1] || 11 === qt.time[1]) && 30 === qt.time[2] || 2 === qt.time[1] && (29 === qt.time[2] || 28 === qt.time[2] && qt.time[0] % 4) ? qt.time[2] = 0 : qt.time[2] = t[2] = 0 : qt.time[1] > t[1] && 1 === qt.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && qt.time[0] % 4) ? t[2] = 0 : t[2] = qt.time[2] = 0), (t[2] > qt.time[2] + 1 || qt.time[2] > t[2] + 1) && (t[2] = qt.time[2] = 0);
            var o = 60 * (60 * (24 * (t[2] - qt.time[2]) + (t[3] - qt.time[3])) + (t[4] - qt.time[4]));
            o < -55800 ? o += 86400 : o > 37800 && (o -= 86400);
            var i = new Date,
                n = Date.UTC(i.getFullYear(), i.getMonth(), i.getDate(), i.getHours(), i.getMinutes(), i.getSeconds()) / 1e3 - Object(Y.b)();
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
            }), Object(C.d)("timeoffset_new_method", 1, w, r), qt.dt = w, Object(a.a)("remixdt") !== qt.dt && Object(a.d)("remixdt", qt.dt, 365);
            var l = Object(s.r)(Object(a.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!b.a.iphone || Object(a.a)("remixme")) ? 1 & l || (Object(a.d)("remixrt", 1 | l, 365), window._retinaInit = function() {
                x.d.add(["retina.css"]), Object(f.a)(document.body, "is_2x")
            }, Kt && window._retinaInit()) : 1 & l && Object(a.d)("remixrt", 1 ^ l, 365)
        }, 0), window.boxQueue = Object(ee.c)(), window.__bq = boxQueue, window.curBox = ee.b, Object(ee.d)(), window.boxRefreshCoords = ee.a, window.MessageBox = Z.a, window.showBox = Z.b, window.showTabbedBox = Z.f, window.showFastBox = Z.d, window.showCaptchaBox = Z.c, window.showReCaptchaBox = Z.e, window.showDoneBox = ee.e, window.TopMenu = $.a, window.TopSearch = M.a, window.handleScroll = we.e, window.loadScript = B.a, window.SpecialEvent = Wt, Object(N.j)(), window.notaBene = N.q, window.updSideTopLink = N.y, window.createButton = N.d, window.actionsMenuItemLocked = N.a, window.lockActionsMenuItem = N.n, window.unlockActionsMenuItem = N.v, window.linkLocked = N.m, window.lockLink = N.p, window.unlockLink = N.x, window.lockButton = N.o, window.unlockButton = N.w, window.buttonLocked = N.b, window.isButtonLocked = N.k, window.disableButton = N.f, window.sbWidth = N.t, window.isChecked = N.l, window.checkbox = N.c, window.disable = N.e, window.radioval = N.s, window.radiobtn = N.r, window.showProgress = N.u, window.hideProgress = N.i, window.disableEl = N.g, window.enableEl = N.h, Object(E.d)(), window.VideoConstants = E.a, window.showVideo = E.j, window.showInlineVideo = E.i, window.loadInlineVideo = E.e, window.revertLastInlineVideo = E.h, window.destroyInlineVideoPlayer = E.c, window.pauseLastInlineVideo = E.f, window.playLastInlineVideo = E.g, window.checkMp4 = E.b, window.performance && window.performance.memory && Object(s.D)(0, 100) < 5 && Object(Ot.a)(), Ne ? (Object(_.b)(window, "blur", $e), Object(_.b)(window, "focus", Ze), onDomReady(() => setTimeout(Ke, 500)), window.LongView = {
            register: Ye,
            onScroll: Object(we.m)(Je, 50),
            onBeforePageChange: et,
            clearElemsCache: Qe,
            _debug: function() {
                return {
                    started: Ae,
                    tracking: Be,
                    viewedData: Me,
                    viewIndexes: ze,
                    blindTop: Fe,
                    blindBottom: He
                }
            }
        }) : window.LongView = {
            register: () => {},
            onScroll: () => {},
            onBeforePageChange: () => {},
            clearElemsCache: () => {}
        }, Object(se.g)(), $t(), window.onLoaded = Xt, window.domStarted = Qt, window.domReady = Yt, Object(X.c)("common module enabled"), x.d.done(jsc("web/common_web.js"))
    }
});