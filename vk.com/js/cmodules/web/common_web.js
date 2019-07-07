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
    r.push([82, "bundles/audioplayer", "bundles/common"]), o()
}({
    82: function(e, t, o) {
        e.exports = o("g42W")
    },
    g42W: function(e, t, o) {
        "use strict";
        o.r(t);
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

        function i(e) {
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
        }), i(window.NodeList), i(window.HTMLCollection);
        var n = o("ryw6"),
            r = o("kMSP"),
            a = o("Kngp"),
            d = o("gdug"),
            s = o("k487"),
            w = o("zxIV");

        function c(e, t) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
                var o = Object(w.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(o, icoNode), icoNode = o
            }
        }
        var l = o("HhI8"),
            u = o("7jxN"),
            h = (o("a1Th"), o("KKXr"), o("Egk5")),
            b = o("t7n3");

        function p() {
            return new function(e) {
                var t, o = function(e) {
                        var [t, o] = e.split("#"), [i, n] = t.split("?");
                        return i + (n ? "?" + Object(a.b)(Object(a.e)(n)) : "") + (o ? "#" + o : "")
                    },
                    i = Object(b.i)({
                        onLocChange: () => {}
                    }, e),
                    n = function() {
                        var e = "";
                        return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), o(e.replace(/^(\/|!)/, ""))
                    },
                    r = n(),
                    s = function(e) {
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
                        1 == vk.al && s(!0), 3 == vk.al ? (Object(h.b)(window, "popstate", s), d.a.safari && Object(h.b)(window, "hashchange", s)) : "onhashchange" in window ? Object(h.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : s()
                        }) : t = setInterval(s, 200)
                    },
                    setOptions: function(e) {
                        i = Object(b.i)(i, e)
                    },
                    checker: s,
                    stop: function() {
                        vk.al < 3 ? clearInterval(t) : 3 == vk.al && Object(h.h)(window, "popstate", s)
                    }
                }
            }({
                onLocChange: function(e) {
                    var t = {
                        back: !0,
                        hist: !0
                    };
                    3 === vk.al && history.state && Object(b.x)(history.state) && (t.scrollTop = Object(b.r)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
                }
            })
        }
        var m = o("4+be"),
            f = o("lXE5"),
            v = o("Ia1d"),
            g = o("XuKo"),
            _ = o("ErRf"),
            O = o("/PiP"),
            y = {
                sh: function(e, t) {
                    Object(w.ub)(e), Object(b.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(w.W)(e), Object(b.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, o, i) {
                    var n = "layers" + (boxQueue.count() + 1);
                    Object(_.c)(n, function() {}), Object(w.rb)(e, {
                        opacity: o || "",
                        backgroundColor: i || ""
                    }), y.visible || (Object(l.c)(), Object(f.a)()), y.visible || Object(v.f)(), y.visible = !0, Object(w.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(w.hb)(t, "box_layer_hidden") : Object(w.ub)(t), y.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    y.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(_.a)(e), t && t.visibilityHide ? Object(w.a)(t, "box_layer_hidden") : Object(w.W)(t), Object(w.ab)(layerWrap) || cur._inLayer || Object(w.ab)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(w.ab)(window.mvLayerWrap)) || Object(w.ab)(window.wkLayerWrap) || (y.visible = !1, Object(w.hb)(bodyNode, "layers_shown"), Object(l.c)(!0), Object(f.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), y.visible || Object(v.g)()
                }
            },
            j = {
                push: function(e) {
                    var t, o = !!j.count() && j._layers[j._layers.length - 1];
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
                        VideoPlaylist.getCurListId() && (n = Object(b.i)(n, {
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
                    return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || j._layers.push(t), j.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = j._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    j._bl = !0, window.WkView && y.fullhide == WkView.hide ? (Object(w.W)(wkLayerWrap), clearTimeout(wkcur.showT)) : y.fullhide && y.fullhide(!0, !0), setTimeout(j.unblock, 5)
                },
                unblock: function() {
                    j._bl = !1
                },
                pop: function() {
                    if (j.count() && !j._bl) {
                        var e = j._layers.pop();
                        if (j.skipVideo && (j.skipVideo = !1, "video" == e[0])) return j._layers.push(e), void(j.skipVideo = !1);
                        "photo" === e[0] ? (Object(b.i)(e[3], {
                            fromQueue: !0
                        }), Object(O.y)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(b.i)(e[3], {
                            fromQueue: !0
                        }), Object(v.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(O.C)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(g.c)(e[1]) : "podcast" === e[0] && Object(O.A)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, o, i) {
                    for (var n = j._layers, r = n.length; r > 0; --r)
                        if (n[r - 1][0] == e && n[r - 1][1] == t || n[r - 1][0] == o && n[r - 1][1] == i) return j._layers = n.slice(0, r), j.pop(), !0;
                    return !1
                },
                count: function() {
                    return j._layers.length
                },
                clear: function() {
                    j._layers = []
                },
                _layers: []
            };
        var E = o("Xrg9");

        function S() {
            var e = {};
            Object(b.f)(Object(w.G)("_short_currency"), function() {
                var t = Object(w.s)(this, "short") || "";
                if (!t) return !0;
                var o = this.innerHTML,
                    i = Object(b.M)(o).length,
                    n = Object(w.O)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[n]) {
                    for (var r = "", a = i - 1; a >= 0; a--) r += "&#8399;";
                    var d = Object(w.e)("div", {
                        innerHTML: `<b>${o}</b><b>${r}</b>`
                    }, {
                        fontFamily: n,
                        fontSize: "24px"
                    });
                    Object(w.F)("utils").appendChild(d), e[n] = Math.abs(d.firstChild.offsetWidth - d.lastChild.offsetWidth) >= 2 * i, Object(w.fb)(d)
                }!1 === e[n] && Object(w.zb)(this, t)
            })
        }
        var k = o("0gG3"),
            T = o("XzvV"),
            P = o("v+DW"),
            L = o("lkNA");
        var R = class {
                constructor() {
                    var {
                        CallHub: e
                    } = window;
                    this.on = 0, this.hub = new e(() => {
                        this.onShow && this.onShow()
                    }, 2), this.hintsHub = new e(() => this.showStartHints(), 2)
                }
                load() {
                    Object(w.F)("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", () => this.hub.done()), ajax.post("hints.php", {
                        act: "a_start_hints"
                    }, {
                        onDone: e => {
                            this.startHintsText = Object(b.H)(e), this.hintsHub.done()
                        }
                    }))
                }
                show(e) {
                    var {
                        placeholderSetup: t
                    } = window;
                    if (Object(w.F)("quick_search") && !this.on) return this.on = 1, Object(w.ub)(this.sCont), t("search_input"), Object(w.F)("search_input").setAttribute("autocomplete", "off"), Object(w.a)(Object(w.F)("qsearch_link"), "active"), this.prev_content = Object(w.F)("content"), this.qsearch_cont || (this.qsearch_cont = Object(w.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(h.c)(e) : void 0
                }
                go(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(b.H)(Object(w.F)("search_input").value) + "&name=1";
                    return Object(h.c)(e || window.event), location.href = t, !1
                }
                init(e) {
                    this.sCont = Object(w.F)("quick_search"), this.opt = e || {}
                }
                hide(e, t) {
                    if (Object(w.F)("quick_search") && (!this.active || t) && this.on) {
                        var {
                            toggleFlash: o
                        } = window;
                        if (this.on = 0, o(), this.beforeHide && this.beforeHide()) return !0;
                        Object(w.F)("search_input").setValue ? Object(w.F)("search_input").setValue("") : Object(w.F)("search_input").value = "", Object(w.W)(this.sCont), Object(w.hb)(Object(w.F)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }
                preload() {}
            },
            I = o("Bszp"),
            x = o("MSYF"),
            C = o("kHqu"),
            N = "remixjsp";

        function B() {
            ! function() {
                var {
                    performance: e
                } = window;
                e && e.getEntriesByType && e.getEntriesByType("paint").forEach(e => {
                    "first-contentful-paint" === e.name && H(e.startTime, "TTFCP")
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
                        H(t, "domComplete"), H(o, "domContentLoadedEventEnd"), H(i, "loadEventEnd")
                    }
                })
            }(), D()
        }
        var A = [],
            M = !1;

        function D() {
            if (M) {
                var {
                    performance: e
                } = window, t = A[A.length - 1];
                if (!t) return M = !1, void H(-1);
                var o = t.startTime + t.duration;
                e.now() - o >= 3e3 ? H(o, "TTI") : setTimeout(D, 3e3)
            }
        }
        var F = [];

        function H(e, t) {
            var o = Math.floor(e);
            if (-1 !== e && (F.push([o, t]), !(M ? "TTI" === t : F.length > 2))) return;
            var i = "unknown",
                {
                    connection: n
                } = navigator;
            n && n.effectiveType && (i = n.effectiveType);
            var a = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            F.forEach(([e, t]) => a.events.push([t, e, cur.module, i, window.vk.rv])), Object(r.d)(N, JSON.stringify(a), .01)
        }

        function V() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(e => {
                A = A.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), M = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout(B, 0)
            }) : B()
        }
        var U = {
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
            W = o("1BRX"),
            q = o("W9Tc"),
            G = o("98sY"),
            z = o("El3O"),
            K = o("EasH"),
            Y = o("kcIO"),
            Q = o("FWc3");

        function J(e, t) {
            var o = t.asrtl ? 0 : t.right ? 289 : 35,
                i = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
            return Object(Q.c)(e, {
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

        function X(e, t) {
            return Object(Q.c)(e, {
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

        function $(e, t, o) {
            if (!cur._addRestoreInProgress) {
                var i = Object(w.T)("_audio_row", e),
                    n = AudioUtils.getAudioFromEl(i, !0),
                    r = Object(w.s)(e, "action"),
                    a = AudioUtils.getRowActionName(r, n, i),
                    d = {
                        text: () => a,
                        black: 1,
                        shift: t || [7, 4, 0],
                        needLeft: !0,
                        forcetodown: o
                    };
                each(["_im_mess_stack", "top_notify_wrap", "_ape_audio_item", "wk_history_audio_content"], function(t, o) {
                    if (Object(w.T)(o, e)) return d.appendParentCls = o, !1
                }), Object(w.T)("_im_mess_stack", e) && (d.shift = [7, 10, 0], d.noZIndex = !0), Object(Q.c)(e, d)
            }
        }

        function Z(e, t = {}) {
            Object(Q.c)(e, {
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
                appendEl: t.appendEl || Object(w.n)("im-page-history-w", e) || Object(w.n)("rb_box_wrap", e) || Object(w.n)("wk_cont", e) || Object(w.n)("scroll_fix_wrap", e)
            })
        }

        function ee(e) {
            var t = "";
            Object(w.T)("_im_mess_stack", e) && (t = "_im_mess_stack"), Object(Q.c)(e, {
                className: "bookmarks_tt ",
                shift: [32, 8],
                text: () => "1" === Object(w.s)(e, "state") ? Object(w.s)(e, "remove") : Object(w.s)(e, "add"),
                black: 1,
                appendParentCls: t
            })
        }
        var te = o("Ieup"),
            oe = o("t/FQ"),
            ie = o("aong"),
            ne = .5,
            re = .25,
            ae = 300,
            de = 1e3,
            se = 3e5,
            we = 2500,
            ce = 5e3,
            le = 6e3,
            ue = 2e4,
            he = 1e3,
            be = 36e4,
            pe = "_longViewType",
            me = "_longViewIdled",
            fe = "_longViewModule",
            ve = "_longViewStarted",
            ge = "_longViewProcessed",
            _e = "_longViewCached",
            Oe = "_longViewHeight",
            ye = "_longViewTop",
            je = "_longViewBottom",
            Ee = "REGULAR",
            Se = "AUTOPLAY_AD",
            ke = "LongView.viewed",
            Te = "LongView.idled",
            Pe = vk.longViewTestGroup,
            Le = [],
            Re = [],
            Ie = [],
            xe = Date.now(),
            Ce = 0,
            Ne = 0,
            Be = !1,
            Ae = null,
            Me = null,
            De = null,
            Fe = null,
            He = {};

        function Ve() {
            var e = at();
            e.length && (ot(e), dt())
        }

        function Ue() {
            Le.forEach(function(e) {
                e[_e] = !1
            })
        }

        function We(e, t) {
            "im" === t && !e[pe] && function(e) {
                if (Object(w.V)(e, "im-mess--post")) return !0;
                var t = e && Object(w.u)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(w.V)(e, "no_posts"))
            }(e) && (e[pe] = function(e) {
                var t = e && Object(w.u)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? Se : Ee
            }(e), e[fe] = t, Le.push(e))
        }

        function qe(e, t) {
            var o = qe;
            ! function(e, t) {
                var o = [];
                Le.forEach(function(i) {
                    ut(i) ? o.push(i) : ! function(e, t, o) {
                        return !e[ve] && wt(e, ne, t, o)
                    }(i, e, t) ? function(e, t, o) {
                        return e[ve] && !wt(e, re, t, o)
                    }(i, e, t) && (i[me] ? delete i[me] : (ht(Re, i), Ie = Ie.concat(lt(i))), delete i[ve]) : (i[ve] = Date.now(), Re.push(i))
                }), o.forEach(function(e) {
                    ht(Le, e)
                })
            }(e || Object(f.e)(), t || window.innerHeight), Be ? (clearTimeout(o.timer), o.timer = setTimeout(Ge, 150)) : (Be = !0, Je(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(w.H)("im-page--chat-header"),
                        t = Object(w.H)("im-page--chat-input");
                    Ce = e.getBoundingClientRect().top + e.offsetHeight, Ne = window.innerHeight - t.getBoundingClientRect().top
                } else Ce = Object(w.F)("page_header").offsetHeight, Ne = 0
            }())
        }

        function Ge() {
            Je(), Qe(), Be = !1
        }

        function ze() {
            Je(), tt()
        }

        function Ke() {
            Ie = [], Re.forEach(e => e[ve] = Date.now()), it(null), nt(null), Qe()
        }

        function Ye() {
            Je(), tt(), Ie = [], Re = [], it(null), nt(null)
        }

        function Qe() {
            Ae = setTimeout(Xe, we), Me = setTimeout($e, ce), De = setTimeout(Ze, le), Fe = setTimeout(et, ue)
        }

        function Je() {
            clearTimeout(Ae), clearTimeout(Me), clearTimeout(De), clearTimeout(Fe)
        }

        function Xe() {
            Ie.length && it(Ie)
        }

        function $e() {
            ot(Ie), Ie = [], it(null)
        }

        function Ze() {
            Re.length && (nt(ct(Re, !0, !0)), De = setTimeout(Ze, he))
        }

        function et() {
            clearTimeout(De), ot(ct(Re)), Re.forEach(e => e[me] = !0), Re = [], nt(null)
        }

        function tt() {
            ot(Ie.concat(ct(Re)))
        }

        function ot(e) {
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
                    return Object(b.f)(t, (e, t) => o.push(e + "_" + t.join(","))), o.join(";")
                }(e),
                long_view: 1
            })
        }

        function it(e) {
            rt(ke, e)
        }

        function nt(e) {
            rt(Te, e)
        }

        function rt(e, t) {
            var o = E.a.get(e) || {};
            t ? o[xe] = t : delete o[xe], E.a.set(e, o)
        }

        function at() {
            var e = at,
                t = [],
                o = E.a.get(ke) || {},
                i = E.a.get(Te) || {};
            return e.iterator || (e.iterator = (e => o => {
                st(o) && (t = t.concat(e[o]))
            })), Object.keys(o).forEach(e.iterator(o)), Object.keys(i).forEach(e.iterator(i)), t
        }

        function dt() {
            var e = dt,
                t = E.a.get(ke) || {},
                o = E.a.get(Te) || {};
            e.iterator || (e.iterator = (e => t => {
                st(t) && delete e[t]
            })), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), E.a.set(ke, t), E.a.set(Te, o)
        }

        function st(e) {
            var t = Number(e);
            return t !== xe && Date.now() - t >= be
        }

        function wt(e, t, o, i) {
            if (!e) return !1;
            e[_e] || (e[_e] = !0, e[Oe] = e.offsetHeight, e[ye] = o + e.getBoundingClientRect().top, e[je] = e[ye] + e[Oe]);
            var n = i - Ce - Ne,
                r = o + Ce,
                a = o + i - Ne,
                d = e[Oe],
                s = e[ye],
                w = e[je];
            return (w > r && s < a ? Math.min(a, w) - Math.max(r, s) : 0) >= Math.min(n * t, d * t)
        }

        function ct(e, t, o) {
            return e.map(e => lt(e, t, o))
        }

        function lt(e, t, o) {
            if (ut(e)) return [];
            var i = Math.min(se, Date.now() - e[ve]);
            if (e[pe] === Ee && i < ae || e[pe] === Se && i < de) return [];
            o || (e[ge] = !0);
            var n = function(e) {
                    var t = e[fe];
                    if ("im" === t) {
                        var o = Object(w.c)(e, "data-post-id"),
                            i = Object(w.c)(e, "data-copy"),
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
                    var c = s.split("_"),
                        l = c[0],
                        u = c[1];
                    "ads" === l && (u = c[3]), /^post\d+$/.test(l) && (l = c[1], u = c[2]);
                    var h = void 0;
                    t || (He[h = l + "_" + u] || (He[h] = 0), He[h]++), d.push("ad" === l ? {
                        ownerId: "ad",
                        postId: u,
                        module: r,
                        viewIndex: He[h]
                    } : "ads" === l ? {
                        ownerId: "ads",
                        postId: u,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        viewIndex: He[h]
                    } : {
                        ownerId: l,
                        postId: (1 === n[s] ? "" : "-") + u,
                        module: r,
                        index: n.index,
                        duration: i,
                        sessionId: a,
                        q: n.q || null,
                        viewIndex: He[h]
                    })
                }
            return d
        }

        function ut(e) {
            return "page_view" === Pe && e[ge] || !document.body.contains(e)
        }

        function ht(e, t) {
            var o = e.indexOf(t);
            o >= 0 && e.splice(o, 1)
        }
        var bt = o("QGEU"),
            pt = o("eNQP"),
            mt = o("o7bv"),
            ft = o("wetz"),
            vt = o("BJj/"),
            gt = o("i6oL"),
            _t = o("m0N1");
        var Ot = o("W0P9"),
            yt = 5e3,
            jt = "push_notifier_endpoint",
            Et = "push_notifier_subscribed_ts",
            St = 6e4,
            kt = 432e6;
        class Tt {
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
                return E.a.get(jt + vk.id) || !1
            }
            saveEndpoint(e) {
                E.a.set(jt + vk.id, e || !1)
            }
            action(e, t) {
                return this.sw.action(e, t)
            }
            _needupdate(e) {
                var t = Date.now(),
                    o = this.loadEndpoint(),
                    i = E.a.get(Et + vk.id),
                    n = !1;
                return (o !== e.endpoint || !i || t - i > St) && (E.a.set(Et + vk.id, t), n = !0), n
            }
            listenPermission() {
                Object(q.a)("push_notifier") && navigator.permissions && navigator.permissions.query && navigator.permissions.query({
                    name: "notifications"
                }).then(e => {
                    e.onchange = (() => this.update())
                })
            }
            update() {
                return this.updatePermission().then(e => e === Tt.PUSH_NOTIFIER_PERMISSION_GRANTED ? this.subscribe().catch(e => {
                    e !== Tt.SUBSCRIBE_ERROR_NETWORK && e("can not update subscribe")
                }) : Promise.reject("premession_not_granted")).catch(Ot.a)
            }
            updatePermission() {
                var e = Tt.getPermission();
                if (e !== Tt.PUSH_NOTIFIER_PERMISSION_GRANTED) {
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
                    }(Tt.SERVER_KEY)
                })
            }
            setupSubscription() {
                return new Promise((e, t) => {
                    var o = Tt.getPermission(),
                        i = () => {
                            this.subscribe(!0).then(() => {
                                e()
                            }).catch(() => {
                                t()
                            })
                        };
                    o !== Tt.PUSH_NOTIFIER_PERMISSION_DENIED ? o !== Tt.PUSH_NOTIFIER_PERMISSION_GRANTED ? o === Tt.PUSH_NOTIFIER_PERMISSION_DEFAULT && this.requestPermission().then(e => {
                        e === Tt.PUSH_NOTIFIER_PERMISSION_GRANTED ? i() : t()
                    }) : i() : t(Tt.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS)
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
                            return o && Date.now() > o - kt ? this.unsubscribe(this.loadEndpoint()).then(() => this.processSubscribe(t)) : e
                        }
                        return this.processSubscribe(t)
                    })
                }).then(t => new Promise((o, i) => {
                    if (e || this._needupdate(t)) {
                        var n = t.getKey("p256dh"),
                            r = t.getKey("auth");
                        window.ajax.post(Tt.SERVER_URL, {
                            act: "a_subscribe",
                            endpoint: t.endpoint,
                            key: n ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("p256dh")))) : null,
                            token: r ? btoa(String.fromCharCode.apply(null, new Uint8Array(t.getKey("auth")))) : null
                        }, {
                            onDone: e => {
                                e ? (this.saveEndpoint(t.endpoint), o()) : i()
                            },
                            onFail: () => (i(Tt.SUBSCRIBE_ERROR_NETWORK), !0)
                        })
                    } else o()
                }))
            }
            unsubscribe(e) {
                return this.sw.register().then(t => t.pushManager.getSubscription().then(t => t ? t.unsubscribe().then(t => t ? new Promise((t, o) => {
                    ajax.post(Tt.SERVER_URL, {
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
                var e = Tt.getPermission();
                return e === Tt.PUSH_NOTIFIER_PERMISSION_DEFAULT ? new Promise(function(e, t) {
                    var o = Notification.requestPermission(function(t) {
                        e(t)
                    });
                    o instanceof Promise && o.then(e, t)
                }) : Promise.resolve(e)
            }
            checkMessageState() {
                return new Promise(e => setTimeout(e, yt)).then(() => this.action("getMessagesMetaData")).then(e => "object" == typeof e && Object.keys(e).length ? new Promise((t, o) => {
                    window.ajax.post(Tt.SERVER_URL, {
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
                }).then(e => this.action("updateMessageNotifications", e)).catch(e => Object(Ot.a)(e))
            }
        }
        Tt.SERVER_KEY = "BPrntRk2W1_ISFwlgY-vz9tQDg9i1oSQ3-N8xyjdbNAbIOdZIGFdh5FlO7zn730UwU9Sayoec-Fpqq4JZFTyv60", Tt.SERVER_URL = "push_notifier", Tt.PUSH_NOTIFIER_PERMISSION_GRANTED = "granted", Tt.PUSH_NOTIFIER_PERMISSION_DEFAULT = "default", Tt.PUSH_NOTIFIER_PERMISSION_DENIED = "denied", Tt.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS = "BLOCKED_BY_BROWSER_SETTINGS", Tt.SUBSCRIBE_ERROR_NETWORK = "SUBSCRIBE_ERROR_NETWORK";
        var Pt = Tt;
        var Lt = class extends Pt {
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
                    var o = Object(Y.b)();
                    o && Object(w.W)(o.bodyNode), this.setupSubscription().then(() => this.setState(e, t)).then(() => {
                        o && o.hide(), e ? Object(T.d)("push_notifier_subscribe_via_popup", "msg") : Object(T.d)("push_notifier_subscribe_via_popup", "all")
                    }).catch(e => {
                        Pt.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === e ? (Object(w.ub)(o().bodyNode), this.showPopupAllowNotification()) : Object(K.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                    })
                }
                closePopup() {
                    var e = Object(Y.b)();
                    e && e.hide(), Object(T.d)("push_notifier_subscribe_via_popup", "close")
                }
                showPopupAllowNotification() {
                    var e = Object(K.b)(Pt.SERVER_URL, {
                        act: "popup_allow_notification"
                    }, {
                        params: {
                            hideButtons: !0
                        },
                        containerClass: "PushNotifierPopup__popup-box_type--allow-notification",
                        onFail: () => {
                            e ? e.hide() : Object(K.d)(getLang("global_error"), getLang("notifications_native_common_error"))
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
                        ajax.post(Pt.SERVER_URL, {
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
            Rt = "sw";

        function It(e) {
            return {
                type: Rt,
                data: e
            }
        }

        function xt(e) {
            return ("" === e.origin || e.origin.match(/^https:\/\/([a-zA-Z0-9\-\.]+\.)?vk\.com$/)) && e.data && e.data.data && e.data.type === Rt
        }
        var Ct = "/js/cmodules/sw/sw.js",
            Nt = "/";
        class Bt {
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
                return Bt.isSupported() ? this.registration ? Promise.resolve(this.registration) : navigator.serviceWorker.register(Bt.addVersion(Ct), {
                    scope: Nt
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
                        xt(e) ? t(e.data.data) : o(new Error("ServiceWorker message is incorrect"))
                    }, this.registration.active.postMessage(It(e), [i.port2])
                }))
            }
            _onmessage(e) {
                if (xt(e)) {
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
                            }), Object.keys(o).length && e.ports[0].postMessage(It({
                                answers: o
                            }))
                        })
                    }
                }
            }
        }
        var At = window.isMVK ? "mvk" : "web",
            Mt = {
                start: function(e, t) {
                    if (t.stopPropagation(), t.preventDefault(), this.id = window.domData(e, "id"), this.id && (window.statlogsValueEvent("special_event", "click", At, this.id), !this.timeoutHandle)) {
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
                            e.stop(), e.destroy(), this.frame.style.display = "none", this.timeoutHandle = null, window.statlogsValueEvent("special_event", "showed", At, this.id)
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
            Dt = o("B3ia"),
            {
                vk: Ft
            } = window;

        function Ht() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, Ft.width = 960, Ft.started = Object(b.L)(), Ft.counts = {}, d.a.android && (Object(r.d)("remixscreen_width", window.screen.width, 365), Object(r.d)("remixscreen_height", window.screen.height, 365), Object(r.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(r.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(r.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(C.e)(), Object(k.b)(), Object(h.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(h.h)(vkCache[e].handle.elem)
            }), Object(h.b)(window, "DOMContentLoaded load", function() {
                Ft.loaded || (Ft.loaded = !0, Object(P.y)()), Object(z.c)()
            }), Object(h.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(h.b)(document, "keydown", ft.a)
        }
        var Vt = 0;

        function Ut() {
            if (window.headNode = Object(w.J)("head"), window.icoNode = Object(w.J)("link", headNode), window.bodyNode = Object(w.J)("body"), window.htmlNode = Object(w.J)("html"), window.utilsNode = Object(w.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(h.b)(bodyNode, "resize", z.j.pbind(!1)), utilsNode) {
                d.a.mozilla ? Object(w.a)(bodyNode, "firefox") : d.a.mobile && Object(w.a)(bodyNode, "mobfixed"), Object(oe.f)(), Object(k.a)();
                var e = Object(w.F)("layer_bg"),
                    t = e.nextSibling,
                    o = Object(w.F)("box_layer_bg"),
                    i = o.nextSibling;
                window.layerBG = e, window.boxLayerBG = o, window.layerWrap = t, window.layer = t.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(w.F)("stl_side"), window._stlLeft = Object(w.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, d.a.mobile || Object(gt.a)(), Object(h.b)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, t, o, i) {
                    return window.layerQueue = j, Object(b.i)(y, {
                        show: y._show.pbind(e, t),
                        boxshow: y._show.pbind(o, i),
                        wrapshow: y._show.pbind(e),
                        hide: y._hide.pbind(e, t),
                        boxhide: y._hide.pbind(o, i),
                        wraphide: y._hide.pbind(e)
                    }), y
                }(e, t, o, i), hab.init(), window._retinaInit ? window._retinaInit() : Vt = 1, Ft.disableSW || (window.PushNotifier = Lt, window.sw = new Bt, window.sw.register().then(() => {
                    window.pushNotifier = new Lt(window.sw, Bt)
                }))
            }
        }

        function Wt() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: () => cur.module,
                    getOID: () => cur.oid,
                    doesScrollTriggerIdle: !0
                })), Object(gt.b)();
                var e = Object(w.F)("side_bar");
                window.pageNode = Object(w.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(w.O)(e, "position"), window._tbLink = Object(w.F)("top_back_link"), d.a.chrome || d.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = d.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(b.L)() - Ft.started, 10),
                    o = Object(b.r)((Ft.contlen || 1) / t * 1e3);
                d.a.mozilla && d.a.version >= 4 ? o /= 2.5 : d.a.mozilla ? o *= 1.5 : d.a.msie && d.a.version >= 7 ? o /= 1.5 : d.a.msie && (o *= 2.5);
                var i = Object(b.r)(150 * Math.max(2e6 / o, 1));
                if (k.d.highlimit = 6 * i, k.d.lowlimit = Math.min(i, 600), Object(z.j)(), setTimeout(z.j.pbind(!1), 0), Object(bt.c)(), window.addEventListener("scroll", z.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !Ft.id && E.a.checkVersion() && E.a.get("last_reloaded")) try {
                    var n = {};
                    Object(b.f)(["sound_notify_off", "im_ui_notify_off"], (e, t) => {
                        var o = E.a.get(t);
                        null !== o && (n[t] = o)
                    }), window.localStorage.clear(), Object(b.f)(n, (e, t) => E.a.set(e, t))
                } catch (e) {}
            }
        }
        class qt {
            constructor(e, t) {
                this.count = t || 1, this.func = e
            }
            done(e = 1) {
                this.count -= e, this.count <= 0 && this.func()
            }
        }

        function Gt(e) {
            Ft.loaded ? e() : Object(h.b)(window, "load", e)
        }

        function zt() {
            window.showWriteMessageBox = te.g, window.giftsBox = te.a, window.moneyTransferBox = te.d, window.reportAd = te.e, window.mobilePromo = te.c, window.showAudioClaimWarning = te.f, window.menuSettings = te.b, window.sureDeleteAll = te.h, window.TopNotifier = Object(O.m)(), window.showPhoto = O.y, window.showManyPhoto = O.x, window.showAlbums = O.v, window.showAlbum = O.u, window.showPhotoTags = O.z, window.isPhotoeditor3Available = O.p, window.AudioMessagePlayer = O.a, window.showVideoTags = O.B, window.videoCallback = O.D, window.showWiki = O.C, window.showApp = O.w, window.showPodcast = O.A, window.podcastStartFrom = O.s, window.articlePrepare = O.b, window.isArticleLayerOpen = O.o, window.isArticleEditorAvailable = O.n, window.openArticleEditor = O.r, window.mentionOver = Z, window.mentionClick = O.q, window.mobileOnlineTip = J, window.pageVerifiedTip = X, window.audioShowActionTooltip = $, window.shareAudioPlaylist = O.t, window.getAudioPlayer = O.k, window.deleteAudioOnClaim = O.j, window.initTopAudioPlayer = O.l, window.bookmark = O.c, window.bookmarkPost = O.i, window.bookmarkArticle = O.d, window.bookmarkLink = O.f, window.bookmarkPodcast = O.h, window.bookmarkNarrative = O.g, window.bookmarkEvent = O.e, window.bookmarkTooltip = ee, window.showStory = g.c, window.showNarrative = g.b, window.storiesPreloadStatic = g.d, window.sendMask = g.a
        }
        window.constants = {
            Groups: U
        }, window.partConfigEnabled = q.a, Object(w.X)(), window.ge = w.F, window.geByTag = w.I, window.geByTag1 = w.J, window.geByClass = w.G, window.geByClass1 = w.H, window.gpeByClass = w.T, window.domQuery = w.B, window.domQuery1 = w.C, window.domClosest = w.n, window.ce = w.e, window.cf = w.f, window.re = w.fb, window.se = w.mb, window.sech = w.nb, window.rs = w.lb, window.psr = w.eb, window.domReplaceEl = w.D, window.domEL = w.t, window.domNS = w.y, window.domPS = w.A, window.domFC = w.u, window.domLC = w.x, window.domPN = w.z, window.domChildren = w.m, window.domInsertBefore = w.w, window.domInsertAfter = w.v, window.domByClass = w.j, window.domData = w.s, window.domChildIndex = w.l, window.domCA = w.k, window.domClosestSibling = w.r, window.matchesSelector = w.db, window.isHover = w.Z, window.isAncestor = w.Y, window.getScroll = w.M, window.domClosestPositioned = w.q, window.domClosestOverflowHidden = w.p, window.show = w.ub, window.hide = w.W, window.isVisible = w.ab, window.clientHeight = w.h, window.getClientRectOffsetY = w.K, window.toggle = w.vb, window.boundingRectEnabled = w.d, window.getXYRect = w.R, window.getXY = w.Q, window.isWindow = w.bb, window.getSize = w.N, window.hasClass = w.V, window.addClass = w.a, window.addClassDelayed = w.b, window.removeClass = w.hb, window.removeClassDelayed = w.ib, window.toggleClass = w.wb, window.toggleClassDelayed = w.xb, window.replaceClass = w.kb, window.getStyle = w.O, window.setStyle = w.rb, window.setStyleDelayed = w.sb, window.setPseudoStyle = w.qb, window.data = w.i, window.attr = w.c, window.removeAttr = w.gb, window.removeData = w.jb, window.cleanElems = w.g, window.setTitle = w.tb, window.getZoom = w.S, window.val = w.zb, window.elfocus = w.E, window.traverseParent = w.yb, window.getH = w.L, window.getW = w.P, window.domClosestByTag = w.o, window.setDocumentTitle = w.ob, window.lockDocumentTitle = w.cb, window.KEY = h.a, window.addEvent = h.b, window.removeEvent = h.h, window.triggerEvent = h.j, window.cancelEvent = h.c, window.stopEvent = h.i, window.normEvent = h.g, window.checkEvent = h.d, window.checkKeyboardEvent = h.e, window.checkOver = h.f, Object(b.q)(), window.isRetina = b.y, window.extractUrls = b.j, window.serializeForm = b.F, window.addTemplates = b.a, window.getTemplate = b.n, window.rand = b.D, window.irand = b.s, window.isUndefined = b.A, window.isFunction = b.v, window.isArray = b.t, window.isString = b.z, window.isObject = b.x, window.isEmpty = b.u, window.vkNow = b.L, window.vkImage = b.J, window.trim = b.H, window.stripHTML = b.G, window.escapeRE = b.h, window.intval = b.r, window.floatval = b.k, window.positive = b.C, window.isNumeric = b.w, window.winToUtf = b.M, window.replaceEntities = b.E, window.clean = b.c, window.unclean = b.I, window.each = b.f, window.indexOf = b.p, window.inArray = b.o, window.clone = b.d, window.arrayKeyDiff = b.b, window.extend = b.i, window.vkLocal = b.K, window.lTimeout = b.B, window.getCaretCharacterOffsetWithin = b.m, window.formatCount = b.l, window.encodeHtml = b.g, window.decodeHtml = b.e, Object(a.c)(), window.ajx2q = a.b, window.q2ajx = a.e, window.requestBox = a.f, window.activateMobileBox = a.a, window.validateMobileBox = a.g, window.validatePassBox = a.h, Object(r.c)(), window.getCookie = r.a, window.setCookie = r.d, window.hideCookiesPolicy = r.b, Object(G.d)(), window.debugLog = G.c, window.debugEl = G.b, window.isToday = W.d, window.isYesterday = W.f, window.isTomorrow = W.e, window.isSameDate = W.c, window.leadingZero = W.g, window.formatTime = W.a, window.getServerTime = W.b, window.parseLatin = m.o, window.parseCyr = m.m, window.parseLatKeys = m.n, window.langNumeric = m.i, window.langSex = m.j, window.langStr = m.k, window.addLangKeys = m.a, window.getLang = m.d, window.langDate = m.h, window.getShortDate = m.e, window.getShortDateOrTime = m.f, window.langWordNumeric = m.l, window.getDateText = m.c, window.getBigDateNew = m.b, window.getSmDate = m.g, window.scrollToY = f.g, window.scrollToTop = f.f, window.scrollGetX = f.d, window.scrollGetY = f.e, window.disableBodyScroll = f.a, window.enableBodyScroll = f.b, window.Chat = oe.a, window.__qlTimer = null, window.__qlClear = oe.b, window.onLoginDone = oe.m, window.onLoginFailed = oe.n, window.onLoginCaptcha = oe.l, window.onLoginReCaptcha = oe.o, window.storePasswordCredential = oe.p, window.cssAnim = oe.c, window.imagesLoader = oe.e, window.nodeUpdated = oe.k, window.hideNewsAnnounce = oe.d, window.leftAdBlockClose = oe.h, window.leftBlockToggleFriend = oe.j, window.leftBlockFriendTooltip = oe.i, window.placeholderSetup = mt.c, window.placeholderInit = mt.b, window.isInputActive = mt.a, window.showTooltip = Q.c, window.showTitle = Q.b, window.showHint = Q.a, window.topMsg = n.d, window.showMsg = n.b, window.topError = n.c, window.showGlobalPrg = n.a, window.checkTextLength = ie.b, window.getSelectionText = ie.c, window.goAway = ie.d, window.debounce = vt.a, window.hashCode = ie.g, window.isFullScreen = ie.h, window.parallel = ie.k, window.parseJSON = ie.l, window.shuffle = ie.m, window.throttle = ie.n, window.toggleOnline = ie.q, window.updateMoney = ie.s, window.onlinePlatformClass = ie.j, window.Fx = u.a, window.fx = u.a, window.animate = u.b, window.cubicBezier = u.d, window.fadeTo = u.g, window.genFx = u.i, window.getRGB = u.k, window.getColor = u.j, window.slideDown = u.l, window.slideUp = u.n, window.slideToggle = u.m, window.fadeIn = u.e, window.fadeOut = u.f, window.fadeToggle = u.h, window.animateCount = u.c, window.updateAriaElements = bt.c, window.updateAriaCheckboxes = bt.b, window.hasAccessibilityMode = bt.a, window.cancelStackFilter = _.a, window.cancelStackPush = _.c, window.cancelStackPop = _.b, Object(Dt.a)(), window.ElementTooltip = s.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = c, 1 === Ft.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== Ft.al || history.pushState || (Ft.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), Ft.version = !1), Object(k.c)(), window.stManager = k.d, Object(d.c)(), window.browser = d.a, window.mobPlatforms = d.d, window.browserFeatures = d.b, Object(l.a)(), window.toggleFlash = l.c, window.renderFlash = l.b, Ht(), window.updateHeaderStyles = C.i, window.updateNarrow = z.m, window.checkPageBlocks = z.c, window.redraw = z.l, window.onBodyResize = z.j, window.onBodyScroll = z.k, window.leftBlockOver = z.i, window.leftBlockOut = z.h, window.leftBlockHide = z.g, window.onDocumentClick = ft.c, window.onEnter = ft.d, window.onCtrlEnter = ft.b, window.logLeftMenuClicks = T.a, window.autosizeSetup = z.b, window.getProgressBarEl = z.e, window.getProgressHtml = z.f, Object(_t.b)(), V(), window.onDomReady = (e => e()), window.currentModule = (() => cur.currentModule ? cur.currentModule() : cur.module), window.hab = p(), window.ls = E.a, window.shortCurrency = S, window.statlogsValueEvent = T.d, window.saveSearchAttemptStats = T.c, window.removeSearchPositionTracker = T.b, window.callHub = qt, window.CallHub = qt, window.gSearch = new R, window.zNav = C.l, window.handlePageView = C.d, window.handlePageParams = C.c, window.handlePageCount = C.b, window.updateOtherCounters = C.k, window.processDestroy = C.f, window.globalHistoryDestroy = C.a, window.showBackLink = C.h, window.nav = x.a, nav.init(), Ft.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === t[1] && 12 === Ft.time[1] ? Ft.time[1] = 0 : 12 === t[1] && 1 === Ft.time[1] ? t[1] = 0 : (t[1] > Ft.time[1] + 1 || Ft.time[1] > t[1] + 1) && (t[1] = Ft.time[1] = t[2] = Ft.time[2] = 0), t[1] > Ft.time[1] && 1 === t[2] ? 31 === Ft.time[2] || (4 === Ft.time[1] || 6 === Ft.time[1] || 9 === Ft.time[1] || 11 === Ft.time[1]) && 30 === Ft.time[2] || 2 === Ft.time[1] && (29 === Ft.time[2] || 28 === Ft.time[2] && Ft.time[0] % 4) ? Ft.time[2] = 0 : Ft.time[2] = t[2] = 0 : Ft.time[1] > t[1] && 1 === Ft.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && Ft.time[0] % 4) ? t[2] = 0 : t[2] = Ft.time[2] = 0), (t[2] > Ft.time[2] + 1 || Ft.time[2] > t[2] + 1) && (t[2] = Ft.time[2] = 0);
            var o = 60 * (60 * (24 * (t[2] - Ft.time[2]) + (t[3] - Ft.time[3])) + (t[4] - Ft.time[4]));
            o < -55800 ? o += 86400 : o > 37800 && (o -= 86400);
            var i = new Date,
                n = Date.UTC(i.getFullYear(), i.getMonth(), i.getDate(), i.getHours(), i.getMinutes(), i.getSeconds()) / 1e3 - Object(W.b)();
            n -= 10800, n = (n /= 60).toFixed(0), (n *= 60) < -55800 ? n += 86400 : n > 37800 && (n -= 86400);
            var a = 0,
                s = Math.abs(n);
            Object(b.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], (e, t) => {
                var o = Math.round(3600 * (t - 3)),
                    i = Math.abs(n - o);
                i < s && (s = i, a = o)
            });
            var c = 0,
                l = Math.abs(o);
            Object(b.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], (e, t) => {
                var i = Math.round(3600 * (t - 3)),
                    n = Math.abs(o - i);
                n < l && (l = n, c = i)
            }), Object(T.d)("timeoffset_new_method", 1, c, a), Ft.dt = c, Object(r.a)("remixdt") !== Ft.dt && Object(r.d)("remixdt", Ft.dt, 365);
            var u = Object(b.r)(Object(r.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!d.a.iphone || Object(r.a)("remixme")) ? 1 & u || (Object(r.d)("remixrt", 1 | u, 365), window._retinaInit = function() {
                k.d.add(["retina.css"]), Object(w.a)(document.body, "is_2x")
            }, Vt && window._retinaInit()) : 1 & u && Object(r.d)("remixrt", 1 ^ u, 365)
        }, 0), window.boxQueue = Object(Y.c)(), window.__bq = boxQueue, window.curBox = Y.b, Object(Y.d)(), window.boxRefreshCoords = Y.a, window.MessageBox = K.a, window.showBox = K.b, window.showTabbedBox = K.f, window.showFastBox = K.d, window.showCaptchaBox = K.c, window.showReCaptchaBox = K.e, window.showDoneBox = Y.e, window.TopMenu = z.a, window.TopSearch = I.a, window.handleScroll = ie.e, window.loadScript = L.a, window.SpecialEvent = Mt, Object(P.j)(), window.notaBene = P.q, window.updSideTopLink = P.y, window.createButton = P.d, window.actionsMenuItemLocked = P.a, window.lockActionsMenuItem = P.n, window.unlockActionsMenuItem = P.v, window.linkLocked = P.m, window.lockLink = P.p, window.unlockLink = P.x, window.lockButton = P.o, window.unlockButton = P.w, window.buttonLocked = P.b, window.isButtonLocked = P.k, window.disableButton = P.f, window.sbWidth = P.t, window.isChecked = P.l, window.checkbox = P.c, window.disable = P.e, window.radioval = P.s, window.radiobtn = P.r, window.showProgress = P.u, window.hideProgress = P.i, window.disableEl = P.g, window.enableEl = P.h, Object(v.d)(), window.VideoConstants = v.a, window.showVideo = v.j, window.showInlineVideo = v.i, window.loadInlineVideo = v.e, window.revertLastInlineVideo = v.h, window.destroyInlineVideoPlayer = v.c, window.pauseLastInlineVideo = v.f, window.playLastInlineVideo = v.g, window.checkMp4 = v.b, window.performance && window.performance.memory && Object(b.D)(0, 100) < 5 && Object(pt.a)(), Pe ? (Object(h.b)(window, "blur", ze), Object(h.b)(window, "focus", Ke), onDomReady(() => setTimeout(Ve, 500)), window.LongView = {
            register: We,
            onScroll: Object(ie.n)(qe, 50),
            onBeforePageChange: Ye,
            clearElemsCache: Ue,
            _debug: function() {
                return {
                    started: Re,
                    tracking: Le,
                    viewedData: Ie,
                    viewIndexes: He,
                    blindTop: Ce,
                    blindBottom: Ne
                }
            }
        }) : window.LongView = {
            register: () => {},
            onScroll: () => {},
            onBeforePageChange: () => {},
            clearElemsCache: () => {}
        }, Object(oe.g)(), zt(), window.onLoaded = Gt, window.domStarted = Ut, window.domReady = Wt, Object(G.c)("common module enabled"), k.d.done(jsc("web/common_web.js"))
    }
});