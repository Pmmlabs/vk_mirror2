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
    r.push([80, "bundles/audioplayer", "bundles/common"]), t()
}({
    80: function(e, o, t) {
        e.exports = t("g42W")
    },
    g42W: function(e, o, t) {
        "use strict";
        t.r(o);
        t("pIFo"), t("OG14"), t("SRfc");
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
            d = t("gdug"),
            s = t("k487"),
            w = t("zxIV");

        function c(e, o) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || o)) {
                var t = Object(w.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(t, icoNode), icoNode = t
            }
        }
        var l = t("HhI8"),
            u = t("7jxN"),
            h = (t("a1Th"), t("KKXr"), t("Egk5")),
            p = t("t7n3");

        function b() {
            return new function(e) {
                var o, t = function(e) {
                        var [o, t] = e.split("#"), [i, n] = o.split("?");
                        return i + (n ? "?" + Object(a.b)(Object(a.f)(n)) : "") + (t ? "#" + t : "")
                    },
                    i = Object(p.i)({
                        onLocChange: () => {}
                    }, e),
                    n = function() {
                        var e = "";
                        return 3 == vk.al ? e = (location.pathname || "") + (location.search || "") + (location.hash || "") : (e = (location.toString().match(/#(.*)/) || {})[1] || "").substr(0, 1) != vk.navPrefix && (e = (location.pathname || "") + (location.search || "") + (location.hash || "")), !e && vk.al > 1 && (e = (location.pathname || "") + (location.search || "")), t(e.replace(/^(\/|!)/, ""))
                    },
                    r = n(),
                    s = function(e) {
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
                        1 == vk.al && s(!0), 3 == vk.al ? (Object(h.b)(window, "popstate", s), d.a.safari && Object(h.b)(window, "hashchange", s)) : "onhashchange" in window ? Object(h.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : s()
                        }) : o = setInterval(s, 200)
                    },
                    setOptions: function(e) {
                        i = Object(p.i)(i, e)
                    },
                    checker: s,
                    stop: function() {
                        vk.al < 3 ? clearInterval(o) : 3 == vk.al && Object(h.h)(window, "popstate", s)
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
        var m = t("4+be"),
            f = t("lXE5"),
            v = t("Ia1d"),
            g = t("XuKo"),
            _ = t("ErRf"),
            O = t("/PiP"),
            y = {
                sh: function(e, o) {
                    Object(w.ub)(e), Object(p.v)(o) && o()
                },
                hd: function(e, o) {
                    Object(w.W)(e), Object(p.v)(o) && o()
                },
                visible: !1,
                _show: function(e, o, t, i) {
                    var n = "layers" + (boxQueue.count() + 1);
                    Object(_.c)(n, function() {}), Object(w.rb)(e, {
                        opacity: t || "",
                        backgroundColor: i || ""
                    }), y.visible || (Object(l.c)(), Object(f.a)()), y.visible || Object(v.f)(), y.visible = !0, Object(w.a)(bodyNode, "layers_shown"), o.visibilityHide ? Object(w.hb)(o, "box_layer_hidden") : Object(w.ub)(o), y.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, o) {
                    y.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(_.a)(e), o && o.visibilityHide ? Object(w.a)(o, "box_layer_hidden") : Object(w.W)(o), Object(w.ab)(layerWrap) || cur._inLayer || Object(w.ab)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(w.ab)(window.mvLayerWrap)) || Object(w.ab)(window.wkLayerWrap) || (y.visible = !1, Object(w.hb)(bodyNode, "layers_shown"), Object(l.c)(!0), Object(f.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), y.visible || Object(v.g)()
                }
            },
            j = {
                push: function(e) {
                    var o, t = !!j.count() && j._layers[j._layers.length - 1];
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
                    return t && o[0] == t[0] && o[1] == t[1] && o[2] == t[2] || j._layers.push(o), j.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = j._layers, o = e.length; o > 0; --o) "photo" === e[o - 1][0] ? e[o - 1][3].noHistory = 1 : "video" === e[o - 1][0] && (e[o - 1][3].noHistory = 1)
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
                        "photo" === e[0] ? (Object(p.i)(e[3], {
                            fromQueue: !0
                        }), Object(O.y)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(p.i)(e[3], {
                            fromQueue: !0
                        }), Object(v.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(O.C)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(g.c)(e[1]) : "podcast" === e[0] && Object(O.A)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, o, t, i) {
                    for (var n = j._layers, r = n.length; r > 0; --r)
                        if (n[r - 1][0] == e && n[r - 1][1] == o || n[r - 1][0] == t && n[r - 1][1] == i) return j._layers = n.slice(0, r), j.pop(), !0;
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
        var E = t("Xrg9");

        function S() {
            var e = {};
            Object(p.f)(Object(w.G)("_short_currency"), function() {
                var o = Object(w.s)(this, "short") || "";
                if (!o) return !0;
                var t = this.innerHTML,
                    i = Object(p.M)(t).length,
                    n = Object(w.O)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[n]) {
                    for (var r = "", a = i - 1; a >= 0; a--) r += "&#8399;";
                    var d = Object(w.e)("div", {
                        innerHTML: `<b>${t}</b><b>${r}</b>`
                    }, {
                        fontFamily: n,
                        fontSize: "24px"
                    });
                    Object(w.F)("utils").appendChild(d), e[n] = Math.abs(d.firstChild.offsetWidth - d.lastChild.offsetWidth) >= 2 * i, Object(w.fb)(d)
                }!1 === e[n] && Object(w.zb)(this, o)
            })
        }
        var k = t("0gG3"),
            T = t("XzvV"),
            P = t("v+DW"),
            L = t("lkNA");
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
                            this.startHintsText = Object(p.H)(e), this.hintsHub.done()
                        }
                    }))
                }
                show(e) {
                    var {
                        placeholderSetup: o
                    } = window;
                    if (Object(w.F)("quick_search") && !this.on) return this.on = 1, Object(w.ub)(this.sCont), o("search_input"), Object(w.F)("search_input").setAttribute("autocomplete", "off"), Object(w.a)(Object(w.F)("qsearch_link"), "active"), this.prev_content = Object(w.F)("content"), this.qsearch_cont || (this.qsearch_cont = Object(w.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(h.c)(e) : void 0
                }
                go(e) {
                    var o = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(p.H)(Object(w.F)("search_input").value) + "&name=1";
                    return Object(h.c)(e || window.event), location.href = o, !1
                }
                init(e) {
                    this.sCont = Object(w.F)("quick_search"), this.opt = e || {}
                }
                hide(e, o) {
                    if (Object(w.F)("quick_search") && (!this.active || o) && this.on) {
                        var {
                            toggleFlash: t
                        } = window;
                        if (this.on = 0, t(), this.beforeHide && this.beforeHide()) return !0;
                        Object(w.F)("search_input").setValue ? Object(w.F)("search_input").setValue("") : Object(w.F)("search_input").value = "", Object(w.W)(this.sCont), Object(w.hb)(Object(w.F)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }
                preload() {}
            },
            I = t("Bszp"),
            x = t("MSYF"),
            C = t("kHqu"),
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
                            domComplete: o,
                            domContentLoadedEventEnd: t,
                            loadEventEnd: i
                        } = e;
                        H(o, "domComplete"), H(t, "domContentLoadedEventEnd"), H(i, "loadEventEnd")
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
                } = window, o = A[A.length - 1];
                if (!o) return M = !1, void H(-1);
                var t = o.startTime + o.duration;
                e.now() - t >= 3e3 ? H(t, "TTI") : setTimeout(D, 3e3)
            }
        }
        var F = [];

        function H(e, o) {
            var t = Math.floor(e);
            if (-1 !== e && (F.push([t, o]), !(M ? "TTI" === o : F.length > 2))) return;
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
            F.forEach(([e, o]) => a.events.push([o, e, cur.module, i, window.vk.rv])), Object(r.d)(N, JSON.stringify(a), .01)
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
            W = t("1BRX"),
            G = t("W9Tc"),
            q = t("98sY"),
            z = t("El3O"),
            K = t("EasH"),
            Y = t("kcIO"),
            Q = t("FWc3");

        function J(e, o) {
            var t = o.asrtl ? 0 : o.right ? 289 : 35,
                i = o.asrtl ? " mobile_tt_asrtl" : o.right ? " mobile_tt_right" : "";
            return Object(Q.c)(e, {
                url: "al_login.php",
                params: {
                    act: "mobile_tt",
                    mid: o.mid,
                    was: o.was
                },
                slide: 15,
                ajxdt: 200,
                showdt: 200,
                hidedt: 200,
                forcetoup: o.forcetoup,
                toup: !1,
                dir: "auto",
                asrtl: o.asrtl,
                appendParentCls: o.appendParentCls,
                shift: [t, 8, 7],
                className: "mobile_tt" + i
            })
        }

        function X(e, o) {
            return Object(Q.c)(e, {
                url: "/al_page.php",
                params: {
                    act: "verified_tt",
                    type: o.type,
                    oid: o.oid
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

        function $(e, o, t) {
            if (!cur._addRestoreInProgress) {
                var i = Object(w.T)("_audio_row", e),
                    n = AudioUtils.getAudioFromEl(i, !0),
                    r = Object(w.s)(e, "action"),
                    a = AudioUtils.getRowActionName(r, n, i),
                    d = {
                        text: () => a,
                        black: 1,
                        shift: o || [7, 4, 0],
                        needLeft: !0,
                        forcetodown: t
                    };
                each(["_im_mess_stack", "top_notify_wrap", "_ape_audio_item", "wk_history_audio_content"], function(o, t) {
                    if (Object(w.T)(t, e)) return d.appendParentCls = t, !1
                }), Object(w.T)("_im_mess_stack", e) && (d.shift = [7, 10, 0], d.noZIndex = !0), Object(Q.c)(e, d)
            }
        }

        function Z(e, o = {}) {
            Object(Q.c)(e, {
                url: "al_wall.php",
                params: {
                    act: "mention_tt",
                    mention: e.getAttribute("mention_id"),
                    from: "wall"
                },
                shift: o.shift || [52, 7, 7],
                hidedt: o.hidedt || 500,
                showdt: 500,
                needLeft: o.needLeft,
                slide: 15,
                checkLeft: !0,
                reverseOffset: o.reverseOffset || 112,
                dir: "auto",
                appendEl: o.appendEl || Object(w.n)("im-page-history-w", e) || Object(w.n)("rb_box_wrap", e) || Object(w.n)("wk_cont", e) || Object(w.n)("scroll_fix_wrap", e)
            })
        }

        function ee(e) {
            var o = "";
            Object(w.T)("_im_mess_stack", e) && (o = "_im_mess_stack"), Object(Q.c)(e, {
                className: "bookmarks_tt ",
                shift: [32, 8],
                text: () => "1" === Object(w.s)(e, "state") ? Object(w.s)(e, "remove") : Object(w.s)(e, "add"),
                black: 1,
                appendParentCls: o
            })
        }
        var oe = t("Ieup"),
            te = t("t/FQ"),
            ie = t("aong"),
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
            pe = 36e4,
            be = "_longViewType",
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
            var e = ao();
            e.length && (to(e), so())
        }

        function Ue() {
            Le.forEach(function(e) {
                e[_e] = !1
            })
        }

        function We(e, o) {
            "im" === o && !e[be] && function(e) {
                if (Object(w.V)(e, "im-mess--post")) return !0;
                var o = e && Object(w.u)(e);
                return !(!o || "ads_feed_placeholder" === o.getAttribute("id") || Object(w.V)(e, "no_posts"))
            }(e) && (e[be] = function(e) {
                var o = e && Object(w.u)(e);
                return o && o.hasAttribute("data-ad-video-autoplay") ? Se : Ee
            }(e), e[fe] = o, Le.push(e))
        }

        function Ge(e, o) {
            var t = Ge;
            ! function(e, o) {
                var t = [];
                Le.forEach(function(i) {
                    ho(i) ? t.push(i) : ! function(e, o, t) {
                        return !e[ve] && co(e, ne, o, t)
                    }(i, e, o) ? function(e, o, t) {
                        return e[ve] && !co(e, re, o, t)
                    }(i, e, o) && (i[me] ? delete i[me] : (po(Re, i), Ie = Ie.concat(uo(i))), delete i[ve]) : (i[ve] = Date.now(), Re.push(i))
                }), t.forEach(function(e) {
                    po(Le, e)
                })
            }(e || Object(f.e)(), o || window.innerHeight), Be ? (clearTimeout(t.timer), t.timer = setTimeout(qe, 150)) : (Be = !0, Je(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(w.H)("im-page--chat-header"),
                        o = Object(w.H)("im-page--chat-input");
                    Ce = e.getBoundingClientRect().top + e.offsetHeight, Ne = window.innerHeight - o.getBoundingClientRect().top
                } else Ce = Object(w.F)("page_header").offsetHeight, Ne = 0
            }())
        }

        function qe() {
            Je(), Qe(), Be = !1
        }

        function ze() {
            Je(), oo()
        }

        function Ke() {
            Ie = [], Re.forEach(e => e[ve] = Date.now()), io(null), no(null), Qe()
        }

        function Ye() {
            Je(), oo(), Ie = [], Re = [], io(null), no(null)
        }

        function Qe() {
            Ae = setTimeout(Xe, we), Me = setTimeout($e, ce), De = setTimeout(Ze, le), Fe = setTimeout(eo, ue)
        }

        function Je() {
            clearTimeout(Ae), clearTimeout(Me), clearTimeout(De), clearTimeout(Fe)
        }

        function Xe() {
            Ie.length && io(Ie)
        }

        function $e() {
            to(Ie), Ie = [], io(null)
        }

        function Ze() {
            Re.length && (no(lo(Re, !0, !0)), De = setTimeout(Ze, he))
        }

        function eo() {
            clearTimeout(De), to(lo(Re)), Re.forEach(e => e[me] = !0), Re = [], no(null)
        }

        function oo() {
            to(Ie.concat(lo(Re)))
        }

        function to(e) {
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

        function io(e) {
            ro(ke, e)
        }

        function no(e) {
            ro(Te, e)
        }

        function ro(e, o) {
            var t = E.a.get(e) || {};
            o ? t[xe] = o : delete t[xe], E.a.set(e, t)
        }

        function ao() {
            var e = ao,
                o = [],
                t = E.a.get(ke) || {},
                i = E.a.get(Te) || {};
            return e.iterator || (e.iterator = (e => t => {
                wo(t) && (o = o.concat(e[t]))
            })), Object.keys(t).forEach(e.iterator(t)), Object.keys(i).forEach(e.iterator(i)), o
        }

        function so() {
            var e = so,
                o = E.a.get(ke) || {},
                t = E.a.get(Te) || {};
            e.iterator || (e.iterator = (e => o => {
                wo(o) && delete e[o]
            })), Object.keys(o).forEach(e.iterator(o)), Object.keys(t).forEach(e.iterator(t)), E.a.set(ke, o), E.a.set(Te, t)
        }

        function wo(e) {
            var o = Number(e);
            return o !== xe && Date.now() - o >= pe
        }

        function co(e, o, t, i) {
            if (!e) return !1;
            e[_e] || (e[_e] = !0, e[Oe] = e.offsetHeight, e[ye] = t + e.getBoundingClientRect().top, e[je] = e[ye] + e[Oe]);
            var n = i - Ce - Ne,
                r = t + Ce,
                a = t + i - Ne,
                d = e[Oe],
                s = e[ye],
                w = e[je];
            return (w > r && s < a ? Math.min(a, w) - Math.max(r, s) : 0) >= Math.min(n * o, d * o)
        }

        function lo(e, o, t) {
            return e.map(e => uo(e, o, t))
        }

        function uo(e, o, t) {
            if (ho(e)) return [];
            var i = Math.min(se, Date.now() - e[ve]);
            if (e[be] === Ee && i < ae || e[be] === Se && i < de) return [];
            t || (e[ge] = !0);
            var n = function(e) {
                    var o = e[fe];
                    if ("im" === o) {
                        var t = Object(w.c)(e, "data-post-id"),
                            i = Object(w.c)(e, "data-copy"),
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
                    var c = s.split("_"),
                        l = c[0],
                        u = c[1];
                    "ads" === l && (u = c[3]), /^post\d+$/.test(l) && (l = c[1], u = c[2]);
                    var h = void 0;
                    o || (He[h = l + "_" + u] || (He[h] = 0), He[h]++), d.push("ad" === l ? {
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

        function ho(e) {
            return "page_view" === Pe && e[ge] || !document.body.contains(e)
        }

        function po(e, o) {
            var t = e.indexOf(o);
            t >= 0 && e.splice(t, 1)
        }
        var bo = t("QGEU"),
            mo = t("eNQP"),
            fo = t("o7bv"),
            vo = t("wetz"),
            go = t("i6oL"),
            _o = t("m0N1");
        var Oo = t("W0P9"),
            yo = 5e3,
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
                return E.a.get(jo + vk.id) || !1
            }
            saveEndpoint(e) {
                E.a.set(jo + vk.id, e || !1)
            }
            action(e, o) {
                return this.sw.action(e, o)
            }
            _needupdate(e) {
                var o = Date.now(),
                    t = this.loadEndpoint(),
                    i = E.a.get(Eo + vk.id),
                    n = !1;
                return (t !== e.endpoint || !i || o - i > So) && (E.a.set(Eo + vk.id, o), n = !0), n
            }
            listenPermission() {
                navigator.permissions && navigator.permissions.query && navigator.permissions.query({
                    name: "notifications"
                }).then(e => {
                    e.onchange = (() => this.update())
                })
            }
            update() {
                return this.updatePermission().then(e => e === To.PUSH_NOTIFIER_PERMISSION_GRANTED ? this.subscribe().catch(e => {
                    e !== To.SUBSCRIBE_ERROR_NETWORK && e("can not update subscribe")
                }) : Promise.reject("premession_not_granted")).catch(Oo.a)
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
                            var {
                                expirationTime: t
                            } = e;
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
                return new Promise(e => setTimeout(e, yo)).then(() => this.action("getMessagesMetaData")).then(e => "object" == typeof e && Object.keys(e).length ? new Promise((o, t) => {
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
                }).then(e => this.action("updateMessageNotifications", e)).catch(e => Object(Oo.a)(e))
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
                handlerMessagesLP(e = {}) {
                    var {
                        type: o,
                        peerId: t,
                        upToId: i
                    } = e;
                    "event_read_inbound" === o && this.sw.action("removeMessageNotification", {
                        peerId: t,
                        msgId: i
                    })
                }
                handlerPopup(e, o) {
                    var t = Object(Y.b)();
                    t && Object(w.W)(t.bodyNode), this.setupSubscription().then(() => this.setState(e, o)).then(() => {
                        t && t.hide(), e ? Object(T.d)("push_notifier_subscribe_via_popup", "msg") : Object(T.d)("push_notifier_subscribe_via_popup", "all")
                    }).catch(e => {
                        Po.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === e ? (Object(w.ub)(t().bodyNode), this.showPopupAllowNotification()) : Object(K.d)(getLang("global_error"), getLang("notifications_native_common_error"))
                    })
                }
                closePopup() {
                    var e = Object(Y.b)();
                    e && e.hide(), Object(T.d)("push_notifier_subscribe_via_popup", "close")
                }
                showPopupAllowNotification() {
                    var e = Object(K.b)(Po.SERVER_URL, {
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
        var Co = "/js/cmodules/sw/sw.js",
            No = "/";
        class Bo {
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
                return Bo.isSupported() ? this.registration ? Promise.resolve(this.registration) : navigator.serviceWorker.register(Bo.addVersion(Co), {
                    scope: No
                }).then(this._onactive.bind(this)).then(e => (this.registration || (this.registration = e, this._addEventListener(navigator.serviceWorker, "message", this._onmessage.bind(this), !1)), e)) : Promise.reject("serviceWorker is unavailable")
            }
            unregister() {
                this.registration && this.registration.unregister(), this._handlers.forEach(e => e[0].removeEventListener(e[1], e[2])), this._handlers = []
            }
            update() {
                this.registration && this.registration.update()
            }
            _addEventListener(e, o, t, i = !0) {
                var n = !1;
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
                        o.actions.forEach(([o, i]) => {
                            var n = "action_" + o;
                            t.push(Promise.resolve(this[n] ? this[n](i, e) : void 0))
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
        var Ao = window.isMVK ? "mvk" : "web",
            Mo = {
                start: function(e, o) {
                    if (o.stopPropagation(), o.preventDefault(), this.id = window.domData(e, "id"), this.id && (window.statlogsValueEvent("special_event", "click", Ao, this.id), !this.timeoutHandle)) {
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
                            e.stop(), e.destroy(), this.frame.style.display = "none", this.timeoutHandle = null, window.statlogsValueEvent("special_event", "showed", Ao, this.id)
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
            Do = t("B3ia"),
            {
                vk: Fo
            } = window;

        function Ho() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, Fo.width = 960, Fo.started = Object(p.L)(), Fo.counts = {}, d.a.android && (Object(r.d)("remixscreen_width", window.screen.width, 365), Object(r.d)("remixscreen_height", window.screen.height, 365), Object(r.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(r.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(r.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(C.e)(), Object(k.b)(), Object(h.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(h.h)(vkCache[e].handle.elem)
            }), Object(h.b)(window, "DOMContentLoaded load", function() {
                Fo.loaded || (Fo.loaded = !0, Object(P.y)()), Object(z.c)()
            }), Object(h.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(h.b)(document, "keydown", vo.a)
        }
        var Vo = 0;

        function Uo() {
            if (window.headNode = Object(w.J)("head"), window.icoNode = Object(w.J)("link", headNode), window.bodyNode = Object(w.J)("body"), window.htmlNode = Object(w.J)("html"), window.utilsNode = Object(w.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(h.b)(bodyNode, "resize", z.j.pbind(!1)), utilsNode) {
                d.a.mozilla ? Object(w.a)(bodyNode, "firefox") : d.a.mobile && Object(w.a)(bodyNode, "mobfixed"), Object(te.f)(), Object(k.a)();
                var e = Object(w.F)("layer_bg"),
                    o = e.nextSibling,
                    t = Object(w.F)("box_layer_bg"),
                    i = t.nextSibling;
                window.layerBG = e, window.boxLayerBG = t, window.layerWrap = o, window.layer = o.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(w.F)("stl_side"), window._stlLeft = Object(w.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, d.a.mobile || Object(go.a)(), Object(h.b)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, o, t, i) {
                    return window.layerQueue = j, Object(p.i)(y, {
                        show: y._show.pbind(e, o),
                        boxshow: y._show.pbind(t, i),
                        wrapshow: y._show.pbind(e),
                        hide: y._hide.pbind(e, o),
                        boxhide: y._hide.pbind(t, i),
                        wraphide: y._hide.pbind(e)
                    }), y
                }(e, o, t, i), hab.init(), window._retinaInit ? window._retinaInit() : Vo = 1, Fo.disableSW || (window.PushNotifier = Lo, window.sw = new Bo, window.sw.register().then(() => {
                    window.pushNotifier = new Lo(window.sw, Bo)
                }))
            }
        }

        function Wo() {
            if (utilsNode) {
                window.AppUseTime && (window.appUseTime = new window.AppUseTime({
                    getModule: () => cur.module,
                    getOID: () => cur.oid,
                    doesScrollTriggerIdle: !0
                })), Object(go.b)();
                var e = Object(w.F)("side_bar");
                window.pageNode = Object(w.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(w.O)(e, "position"), window._tbLink = Object(w.F)("top_back_link"), d.a.chrome || d.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = d.a.safari ? bodyNode : htmlNode;
                var o = Math.max(Object(p.L)() - Fo.started, 10),
                    t = Object(p.r)((Fo.contlen || 1) / o * 1e3);
                d.a.mozilla && d.a.version >= 4 ? t /= 2.5 : d.a.mozilla ? t *= 1.5 : d.a.msie && d.a.version >= 7 ? t /= 1.5 : d.a.msie && (t *= 2.5);
                var i = Object(p.r)(150 * Math.max(2e6 / t, 1));
                if (k.d.highlimit = 6 * i, k.d.lowlimit = Math.min(i, 600), Object(z.j)(), setTimeout(z.j.pbind(!1), 0), Object(bo.c)(), window.addEventListener("scroll", z.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !Fo.id && E.a.checkVersion() && E.a.get("last_reloaded")) try {
                    var n = {};
                    Object(p.f)(["sound_notify_off", "im_ui_notify_off"], (e, o) => {
                        var t = E.a.get(o);
                        null !== t && (n[o] = t)
                    }), window.localStorage.clear(), Object(p.f)(n, (e, o) => E.a.set(e, o))
                } catch (e) {}
            }
        }
        class Go {
            constructor(e, o) {
                this.count = o || 1, this.func = e
            }
            done(e = 1) {
                this.count -= e, this.count <= 0 && this.func()
            }
        }

        function qo(e) {
            Fo.loaded ? e() : Object(h.b)(window, "load", e)
        }

        function zo() {
            window.showWriteMessageBox = oe.g, window.giftsBox = oe.a, window.moneyTransferBox = oe.d, window.reportAd = oe.e, window.mobilePromo = oe.c, window.showAudioClaimWarning = oe.f, window.menuSettings = oe.b, window.sureDeleteAll = oe.h, window.TopNotifier = Object(O.m)(), window.showPhoto = O.y, window.showManyPhoto = O.x, window.showAlbums = O.v, window.showAlbum = O.u, window.showPhotoTags = O.z, window.isPhotoeditor3Available = O.p, window.AudioMessagePlayer = O.a, window.showVideoTags = O.B, window.videoCallback = O.D, window.showWiki = O.C, window.showApp = O.w, window.showPodcast = O.A, window.podcastStartFrom = O.s, window.articlePrepare = O.b, window.isArticleLayerOpen = O.o, window.isArticleEditorAvailable = O.n, window.openArticleEditor = O.r, window.mentionOver = Z, window.mentionClick = O.q, window.mobileOnlineTip = J, window.pageVerifiedTip = X, window.audioShowActionTooltip = $, window.shareAudioPlaylist = O.t, window.getAudioPlayer = O.k, window.deleteAudioOnClaim = O.j, window.initTopAudioPlayer = O.l, window.bookmark = O.c, window.bookmarkPost = O.i, window.bookmarkArticle = O.d, window.bookmarkLink = O.f, window.bookmarkPodcast = O.h, window.bookmarkNarrative = O.g, window.bookmarkEvent = O.e, window.bookmarkTooltip = ee, window.showStory = g.c, window.showNarrative = g.b, window.storiesPreloadStatic = g.d, window.sendMask = g.a
        }
        window.constants = {
            Groups: U
        }, window.partConfigEnabled = G.a, Object(w.X)(), window.ge = w.F, window.geByTag = w.I, window.geByTag1 = w.J, window.geByClass = w.G, window.geByClass1 = w.H, window.gpeByClass = w.T, window.domQuery = w.B, window.domQuery1 = w.C, window.domClosest = w.n, window.ce = w.e, window.cf = w.f, window.re = w.fb, window.se = w.mb, window.sech = w.nb, window.rs = w.lb, window.psr = w.eb, window.domReplaceEl = w.D, window.domEL = w.t, window.domNS = w.y, window.domPS = w.A, window.domFC = w.u, window.domLC = w.x, window.domPN = w.z, window.domChildren = w.m, window.domInsertBefore = w.w, window.domInsertAfter = w.v, window.domByClass = w.j, window.domData = w.s, window.domChildIndex = w.l, window.domCA = w.k, window.domClosestSibling = w.r, window.matchesSelector = w.db, window.isHover = w.Z, window.isAncestor = w.Y, window.getScroll = w.M, window.domClosestPositioned = w.q, window.domClosestOverflowHidden = w.p, window.show = w.ub, window.hide = w.W, window.isVisible = w.ab, window.clientHeight = w.h, window.getClientRectOffsetY = w.K, window.toggle = w.vb, window.boundingRectEnabled = w.d, window.getXYRect = w.R, window.getXY = w.Q, window.isWindow = w.bb, window.getSize = w.N, window.hasClass = w.V, window.addClass = w.a, window.addClassDelayed = w.b, window.removeClass = w.hb, window.removeClassDelayed = w.ib, window.toggleClass = w.wb, window.toggleClassDelayed = w.xb, window.replaceClass = w.kb, window.getStyle = w.O, window.setStyle = w.rb, window.setStyleDelayed = w.sb, window.setPseudoStyle = w.qb, window.data = w.i, window.attr = w.c, window.removeAttr = w.gb, window.removeData = w.jb, window.cleanElems = w.g, window.setTitle = w.tb, window.getZoom = w.S, window.val = w.zb, window.elfocus = w.E, window.traverseParent = w.yb, window.getH = w.L, window.getW = w.P, window.domClosestByTag = w.o, window.setDocumentTitle = w.ob, window.lockDocumentTitle = w.cb, window.KEY = h.a, window.addEvent = h.b, window.removeEvent = h.h, window.triggerEvent = h.j, window.cancelEvent = h.c, window.stopEvent = h.i, window.normEvent = h.g, window.checkEvent = h.d, window.checkKeyboardEvent = h.e, window.checkOver = h.f, Object(p.q)(), window.isRetina = p.y, window.extractUrls = p.j, window.serializeForm = p.F, window.addTemplates = p.a, window.getTemplate = p.n, window.rand = p.D, window.irand = p.s, window.isUndefined = p.A, window.isFunction = p.v, window.isArray = p.t, window.isString = p.z, window.isObject = p.x, window.isEmpty = p.u, window.vkNow = p.L, window.vkImage = p.J, window.trim = p.H, window.stripHTML = p.G, window.escapeRE = p.h, window.intval = p.r, window.floatval = p.k, window.positive = p.C, window.isNumeric = p.w, window.winToUtf = p.M, window.replaceEntities = p.E, window.clean = p.c, window.unclean = p.I, window.each = p.f, window.indexOf = p.p, window.inArray = p.o, window.clone = p.d, window.arrayKeyDiff = p.b, window.extend = p.i, window.vkLocal = p.K, window.lTimeout = p.B, window.getCaretCharacterOffsetWithin = p.m, window.formatCount = p.l, window.encodeHtml = p.g, window.decodeHtml = p.e, Object(a.c)(), window.ajx2q = a.b, window.q2ajx = a.f, window.requestBox = a.g, window.activateMobileBox = a.a, window.validateMobileBox = a.h, window.validatePassBox = a.i, window.photoCaptchaBox = a.e, Object(r.c)(), window.getCookie = r.a, window.setCookie = r.d, window.hideCookiesPolicy = r.b, Object(q.c)(), window.debugLog = q.b, window.debugEl = q.a, window.isToday = W.d, window.isYesterday = W.f, window.isTomorrow = W.e, window.isSameDate = W.c, window.leadingZero = W.g, window.formatTime = W.a, window.getServerTime = W.b, window.parseLatin = m.o, window.parseCyr = m.m, window.parseLatKeys = m.n, window.langNumeric = m.i, window.langSex = m.j, window.langStr = m.k, window.addLangKeys = m.a, window.getLang = m.d, window.langDate = m.h, window.getShortDate = m.e, window.getShortDateOrTime = m.f, window.langWordNumeric = m.l, window.getDateText = m.c, window.getBigDateNew = m.b, window.getSmDate = m.g, window.scrollToY = f.g, window.scrollToTop = f.f, window.scrollGetX = f.d, window.scrollGetY = f.e, window.disableBodyScroll = f.a, window.enableBodyScroll = f.b, window.Chat = te.a, window.__qlTimer = null, window.__qlClear = te.b, window.onLoginDone = te.m, window.onLoginFailed = te.n, window.onLoginCaptcha = te.l, window.onLoginReCaptcha = te.o, window.storePasswordCredential = te.p, window.cssAnim = te.c, window.imagesLoader = te.e, window.nodeUpdated = te.k, window.hideNewsAnnounce = te.d, window.leftAdBlockClose = te.h, window.leftBlockToggleFriend = te.j, window.leftBlockFriendTooltip = te.i, window.placeholderSetup = fo.c, window.placeholderInit = fo.b, window.isInputActive = fo.a, window.showTooltip = Q.c, window.showTitle = Q.b, window.showHint = Q.a, window.topMsg = n.d, window.showMsg = n.b, window.topError = n.c, window.showGlobalPrg = n.a, window.checkTextLength = ie.b, window.getSelectionText = ie.d, window.goAway = ie.e, window.debounce = ie.c, window.hashCode = ie.h, window.isFullScreen = ie.i, window.parallel = ie.l, window.parseJSON = ie.m, window.shuffle = ie.n, window.throttle = ie.o, window.toggleOnline = ie.r, window.updateMoney = ie.t, window.onlinePlatformClass = ie.k, window.Fx = u.a, window.fx = u.a, window.animate = u.b, window.cubicBezier = u.d, window.fadeTo = u.g, window.genFx = u.i, window.getRGB = u.k, window.getColor = u.j, window.slideDown = u.l, window.slideUp = u.n, window.slideToggle = u.m, window.fadeIn = u.e, window.fadeOut = u.f, window.fadeToggle = u.h, window.animateCount = u.c, window.updateAriaElements = bo.c, window.updateAriaCheckboxes = bo.b, window.hasAccessibilityMode = bo.a, window.cancelStackFilter = _.a, window.cancelStackPush = _.c, window.cancelStackPop = _.b, Object(Do.a)(), window.ElementTooltip = s.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = c, 1 === Fo.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== Fo.al || history.pushState || (Fo.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), Fo.version = !1), Object(k.c)(), window.stManager = k.d, Object(d.c)(), window.browser = d.a, window.mobPlatforms = d.d, window.browserFeatures = d.b, Object(l.a)(), window.toggleFlash = l.c, window.renderFlash = l.b, Ho(), window.updateHeaderStyles = C.i, window.updateNarrow = z.m, window.checkPageBlocks = z.c, window.redraw = z.l, window.onBodyResize = z.j, window.onBodyScroll = z.k, window.leftBlockOver = z.i, window.leftBlockOut = z.h, window.leftBlockHide = z.g, window.onDocumentClick = vo.c, window.onEnter = vo.d, window.onCtrlEnter = vo.b, window.logLeftMenuClicks = T.a, window.autosizeSetup = z.b, window.getProgressBarEl = z.e, window.getProgressHtml = z.f, Object(_o.b)(), V(), window.onDomReady = (e => e()), window.currentModule = (() => cur.currentModule ? cur.currentModule() : cur.module), window.hab = b(), window.ls = E.a, window.shortCurrency = S, window.statlogsValueEvent = T.d, window.saveSearchAttemptStats = T.c, window.removeSearchPositionTracker = T.b, window.callHub = Go, window.CallHub = Go, window.gSearch = new R, window.zNav = C.l, window.handlePageView = C.d, window.handlePageParams = C.c, window.handlePageCount = C.b, window.updateOtherCounters = C.k, window.processDestroy = C.f, window.globalHistoryDestroy = C.a, window.showBackLink = C.h, window.nav = x.a, nav.init(), Fo.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                o = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === o[1] && 12 === Fo.time[1] ? Fo.time[1] = 0 : 12 === o[1] && 1 === Fo.time[1] ? o[1] = 0 : (o[1] > Fo.time[1] + 1 || Fo.time[1] > o[1] + 1) && (o[1] = Fo.time[1] = o[2] = Fo.time[2] = 0), o[1] > Fo.time[1] && 1 === o[2] ? 31 === Fo.time[2] || (4 === Fo.time[1] || 6 === Fo.time[1] || 9 === Fo.time[1] || 11 === Fo.time[1]) && 30 === Fo.time[2] || 2 === Fo.time[1] && (29 === Fo.time[2] || 28 === Fo.time[2] && Fo.time[0] % 4) ? Fo.time[2] = 0 : Fo.time[2] = o[2] = 0 : Fo.time[1] > o[1] && 1 === Fo.time[2] && (31 === o[2] || (4 === o[1] || 6 === o[1] || 9 === o[1] || 11 === o[1]) && 30 === o[2] || 2 === o[1] && (29 === o[2] || 28 === o[2] && Fo.time[0] % 4) ? o[2] = 0 : o[2] = Fo.time[2] = 0), (o[2] > Fo.time[2] + 1 || Fo.time[2] > o[2] + 1) && (o[2] = Fo.time[2] = 0);
            var t = 60 * (60 * (24 * (o[2] - Fo.time[2]) + (o[3] - Fo.time[3])) + (o[4] - Fo.time[4]));
            t < -55800 ? t += 86400 : t > 37800 && (t -= 86400);
            var i = 0,
                n = Math.abs(t);
            Object(p.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], (e, o) => {
                var r = Math.round(3600 * (o - 3)),
                    a = Math.abs(t - r);
                a < n && (n = a, i = r)
            }), Fo.dt = i, Object(r.a)("remixdt") !== Fo.dt && Object(r.d)("remixdt", Fo.dt, 365);
            var a = Object(p.r)(Object(r.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!d.a.iphone || Object(r.a)("remixme")) ? 1 & a || (Object(r.d)("remixrt", 1 | a, 365), window._retinaInit = function() {
                k.d.add(["retina.css"]), Object(w.a)(document.body, "is_2x")
            }, Vo && window._retinaInit()) : 1 & a && Object(r.d)("remixrt", 1 ^ a, 365)
        }, 0), window.boxQueue = Object(Y.c)(), window.__bq = boxQueue, window.curBox = Y.b, Object(Y.d)(), window.boxRefreshCoords = Y.a, window.MessageBox = K.a, window.showBox = K.b, window.showTabbedBox = K.f, window.showFastBox = K.d, window.showCaptchaBox = K.c, window.showReCaptchaBox = K.e, window.showDoneBox = Y.e, window.TopMenu = z.a, window.TopSearch = I.a, window.handleScroll = ie.f, window.loadScript = L.a, window.SpecialEvent = Mo, Object(P.j)(), window.notaBene = P.q, window.updSideTopLink = P.y, window.createButton = P.d, window.actionsMenuItemLocked = P.a, window.lockActionsMenuItem = P.n, window.unlockActionsMenuItem = P.v, window.linkLocked = P.m, window.lockLink = P.p, window.unlockLink = P.x, window.lockButton = P.o, window.unlockButton = P.w, window.buttonLocked = P.b, window.isButtonLocked = P.k, window.disableButton = P.f, window.sbWidth = P.t, window.isChecked = P.l, window.checkbox = P.c, window.disable = P.e, window.radioval = P.s, window.radiobtn = P.r, window.showProgress = P.u, window.hideProgress = P.i, window.disableEl = P.g, window.enableEl = P.h, Object(v.d)(), window.VideoConstants = v.a, window.showVideo = v.j, window.showInlineVideo = v.i, window.loadInlineVideo = v.e, window.revertLastInlineVideo = v.h, window.destroyInlineVideoPlayer = v.c, window.pauseLastInlineVideo = v.f, window.playLastInlineVideo = v.g, window.checkMp4 = v.b, window.performance && window.performance.memory && Object(p.D)(0, 100) < 5 && Object(mo.a)(), Pe ? (Object(h.b)(window, "blur", ze), Object(h.b)(window, "focus", Ke), onDomReady(() => setTimeout(Ve, 500)), window.LongView = {
            register: We,
            onScroll: Object(ie.o)(Ge, 50),
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
        }, Object(te.g)(), zo(), window.onLoaded = qo, window.domStarted = Uo, window.domReady = Wo, Object(q.b)("common module enabled"), k.d.done(jsc("web/common_web.js"))
    }
});