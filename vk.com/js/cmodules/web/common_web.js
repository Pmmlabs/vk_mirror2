! function(e) {
    function t(t) {
        for (var n, _, a = t[0], c = t[1], s = t[2], u = 0, l = []; u < a.length; u++) _ = a[u], i[_] && l.push(i[_][0]), i[_] = 0;
        for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
        for (d && d(t); l.length;) l.shift()();
        return r.push.apply(r, s || []), o()
    }

    function o() {
        for (var e, t = 0; t < r.length; t++) {
            for (var o = r[t], n = !0, a = 1; a < o.length; a++) {
                var c = o[a];
                0 !== i[c] && (n = !1)
            }
            n && (r.splice(t--, 1), e = _(_.s = o[0]))
        }
        return e
    }
    var n = {},
        i = {
            "web/common_web": 0
        },
        r = [];

    function _(t) {
        if (n[t]) return n[t].exports;
        var o = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, _), o.l = !0, o.exports
    }
    _.m = e, _.c = n, _.d = function(e, t, o) {
        _.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        })
    }, _.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, _.t = function(e, t) {
        if (1 & t && (e = _(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (_.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var n in e) _.d(o, n, function(t) {
                return e[t]
            }.bind(null, n));
        return o
    }, _.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return _.d(t, "a", t), t
    }, _.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, _.p = "";
    var a = window.webpackJsonp = window.webpackJsonp || [],
        c = a.push.bind(a);
    a.push = t, a = a.slice();
    for (var s = 0; s < a.length; s++) t(a[s]);
    var d = c;
    r.push([71, "7f81047508570d6456c7d33e2e3c0bc3", "b459a6fdd4abe926f4e4ca100471ca63", "075e72e66ff59d27b023e4956acea75e"]), o()
}({
    "+rLv": function(e, t, o) {
        e.exports = o("dyZX").document && document.documentElement
    },
    "/PiP": function(e, t, o) {
        "use strict";
        o.d(t, "l", function() {
            return l
        }), o.d(t, "o", function() {
            return p
        }), o.d(t, "x", function() {
            return b
        }), o.d(t, "w", function() {
            return f
        }), o.d(t, "u", function() {
            return h
        }), o.d(t, "t", function() {
            return w
        }), o.d(t, "y", function() {
            return O
        }), o.d(t, "A", function() {
            return m
        }), o.d(t, "C", function() {
            return v
        }), o.d(t, "B", function() {
            return E
        }), o.d(t, "v", function() {
            return g
        }), o.d(t, "z", function() {
            return j
        }), o.d(t, "r", function() {
            return P
        }), o.d(t, "b", function() {
            return M
        }), o.d(t, "m", function() {
            return y
        }), o.d(t, "q", function() {
            return D
        }), o.d(t, "c", function() {
            return T
        }), o.d(t, "h", function() {
            return L
        }), o.d(t, "d", function() {
            return x
        }), o.d(t, "e", function() {
            return k
        }), o.d(t, "g", function() {
            return A
        }), o.d(t, "f", function() {
            return C
        }), o.d(t, "s", function() {
            return I
        }), o.d(t, "j", function() {
            return B
        }), o.d(t, "i", function() {
            return R
        }), o.d(t, "k", function() {
            return W
        }), o.d(t, "a", function() {
            return U
        }), o.d(t, "p", function() {
            return K
        }), o.d(t, "n", function() {
            return S
        });
        var n = o("Egk5"),
            i = o("t7n3"),
            r = o("EasH"),
            _ = o("zxIV"),
            a = o("gdug"),
            c = o("v+DW"),
            s = o("4+be"),
            d = o("Kngp"),
            u = o("kcIO");

        function l() {
            var e = ["notifier.js", "notifier.css"];
            return {
                preload: function() {
                    stManager.add(e, function() {
                        return window.TopNotifier.preload()
                    })
                },
                show: function(t) {
                    if (!0 !== Object(n.d)(t)) return stManager.add(e, function() {
                        return window.TopNotifier.show(t)
                    }), Object(n.c)(t)
                },
                showTooltip: function(t) {
                    stManager.add(e, function() {
                        return window.TopNotifier.showTooltip(t)
                    })
                },
                invalidate: function() {},
                setCount: function() {}
            }
        }

        function p() {
            return !a.a.msie || parseInt(a.a.version) > 10
        }

        function b(e, t, o, r) {
            if (cur.viewAsBox) return cur.viewAsBox();
            if (!(Object(n.d)(r) || cur._editMode && cur._editMode(r))) {
                var _ = ["photoview.js", "photoview.css", "page.js", "page.css"];
                if (o.img && (o.showProgress = function() {
                        Object(c.u)(o.img)
                    }, o.hideProgress = function() {
                        Object(c.i)(o.img)
                    }), !e) return !1;
                if (window.Photoview && !1 === Photoview.showPhoto(e, t, o)) return !1;
                var a = !0;
                o.temp && !(cur.pvNoTemp || {})[e] && stManager.add(_, function() {
                    Object(i.i)(cur, {
                        pvCancelLoad: function() {
                            a = !1
                        },
                        pvData: cur.pvData || {},
                        pvOptions: cur.pvOptions || {}
                    }), cur.pvData.temp = [o.temp], cur.pvOptions.temp_final = o.temp_final, cur.pvOptions.temp_summary = o.temp_summary, cur.pvOptions.queue = o.queue, Photoview.show("temp", 0)
                });
                var s = 1;
                return o && o.additional && o.additional.open_pe && (s = 0), Object(i.i)(o, {
                    onDone: function(n) {
                        Photoview.list(e, t, n), o.blog_text && arguments[3] && arguments[3][0] && (arguments[3][0].album = o.blog_text), Photoview.loaded.apply(window, arguments), a && ("deleted" === n ? Photoview.showDeleted.apply(window, arguments) : Photoview.showPhoto(e, t, o, !0))
                    },
                    stat: _,
                    cache: s
                }), o.temp_final ? !1 : (ajax.post("al_photos.php", Object(i.i)({
                    act: "show",
                    gid: cur.gid,
                    photo: e,
                    list: t,
                    module: cur.module || "",
                    list_info: o.list_info || null
                }, o.additional), o), !1)
            }
        }

        function f(e, t, o, n) {
            Page.showManyPhoto(e, t, o, n)
        }

        function h(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : Object(n.d)(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
                Photoview.showAlbums(e, t)
            }), !1)
        }

        function w(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : Object(n.d)(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
                Photoview.showAlbum(e, t)
            }), !1)
        }

        function O(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : Object(n.d)(o) ? void 0 : (stManager.add(["photoview.js", "photoview.css"], function() {
                Photoview.showTagged(e, t)
            }), !1)
        }

        function m(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : Object(n.d)(o) ? void 0 : (stManager.add(["video.js", "video.css", "photoview.js", "photoview.css"], function() {
                Photoview.showVideoTags(e, t)
            }), !1)
        }

        function v(e) {
            var t = e.shift();
            if (window.Videoview && Videoview.playerCallback[t]) return Videoview.playerCallback[t].apply(Videoview, e);
            throw Error("Unregistered player callback: " + t)
        }

        function E(e, t, o) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            if (Object(n.d)(o)) return !0;
            if (0 !== cur.gid && (e.gid = cur.gid), window.wkcur && wkcur.shown && wkcur.wkRaw === e.w && e.w && !e.reply) return WkView.restoreLayer(r), Object(n.c)(o);
            (window.wkcur && wkcur.hideTitle || e.hide_title) && (r.hide_title = e.hide_title = 1);
            var _ = r.stat || ["wkview.js", "wkview.css", "wk.css", "wk.js"];
            t && _.push("wk_editor.js", "wk_editor.css");
            var a = {
                stat: _,
                loader: !r.noloader,
                onDone: function(e, t, n, _) {
                    WkView.show(e, t, Object(i.i)(n, r), _, o)
                },
                onFail: function(e) {
                    return WkView.showError(e)
                }
            };
            if (nav.objLoc.claim && (e.claim = nav.objLoc.claim), e.w && "/query" === e.w.substr(-6)) {
                var c = Object(i.d)(nav.objLoc);
                delete c[0], delete c.w, e.query = JSON.stringify(c)
            }
            r.preload && Object(i.i)(a, r.preload);
            var s = void 0,
                d = void 0;
            r.ads_params && (s = r.ads_params, (d = nav.getPostParams(o && o.target)).post_click_url && (s._post_click_url = d.post_click_url));
            var u = "";
            return "feed" === cur.module && window.feed ? u = window.feed.getModuleRef() : "public" === cur.module ? u = "club" : "profile" === cur.module && (u = "profile"), ajax.post("wkview.php", Object(i.i)({
                act: "show",
                loc: nav.objLoc[0],
                is_znav: r.isZnav,
                ref: u
            }, e, s, cur.getWkviewOpts && cur.getWkviewOpts()), a), Object(n.c)(o)
        }

        function g(e, t, o, n, r, _) {
            _ || (_ = {});
            var a = !1,
                c = Object(i.i)({
                    w: "app" + t
                }, _);
            if (o = Object(i.r)(o), n && (Object(i.x)(n) ? c = Object(i.i)(c, n) : c.ref = n), _.layer && (a = !0), (cur.apps && cur.apps[t] || !o) && !a) {
                delete c.w;
                var s = "app" + t + (r ? "_" + r : ""),
                    d = nav.objLoc && !nav.objLoc[1] && nav.objLoc[0] === s;
                return nav.go("/" + s + nav.toStr(c), e, {
                    nocur: d
                })
            }
            r && (c.mid = r);
            var u = {
                stat: ["wkview.js", "wkview.css", "apps.js", "apps.css"]
            };
            return _.queue && (u.queue = 1), _.urlHash && (c.url_hash = _.urlHash), E(c, !1, e, u)
        }

        function j(e, t, o, i, r) {
            if (!vk.widget) return Object(_.Ta)(boxLoader), Object(_.Ta)(boxLayerWrap), Object(u.a)(boxLoader), stManager.add([jsc("web/podcast.js")], function() {
                Podcast.show(e, t, null, i, r)
            }), o && Object(n.c)(o)
        }

        function P(e, t, o, i) {
            return stManager.add([jsc("web/podcast.js")], function() {
                Podcast.goToTime(e, t, o, i)
            }), o && Object(n.c)(o)
        }

        function M(e) {
            e && !vk.isBanned && stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
                window.ArticleLayer.prepare(e)
            })
        }

        function y() {
            return !(a.a.msie && parseInt(a.a.version) <= 11)
        }

        function D(e, t, o) {
            if (cur.articleEditorLayer) cur.articleEditorLayer.open(e, t);
            else {
                var n = [jsc("web/article_editor_layer.js"), "article.css", "article_editor.css"];
                stManager.add(n, function() {}), ajax.post("al_articles.php", {
                    act: "open_editor",
                    article_owner_id: e,
                    article_id: t,
                    from_post_convert: o ? 1 : 0,
                    post_data_medias: o ? o.medias.join(",") : ""
                }, {
                    loader: !0,
                    onFail: function(e) {
                        return Object(r.d)(Object(s.d)("global_error"), e), !0
                    },
                    onDone: function(e, t, i, r) {
                        window.WkView && WkView.hide(), window.boxQueue && boxQueue.hideAll(), o && (r.postData = o), r.articleOwnerId ? stManager.add(n, function() {
                            layers.fullhide = function() {
                                cur.articleEditorLayer && cur.articleEditorLayer.hide()
                            }, cur.articleEditorLayer = new ArticleEditorLayer(e, t, i, r, function() {
                                return delete cur.articleEditorLayer
                            })
                        }) : nav.change({
                            z: !1
                        })
                    }
                })
            }
        }

        function T(e, t, o, n) {
            var r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "",
                c = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : "";
            ajax.post("al_bookmarks.php", {
                act: "bookmark",
                owner_id: e,
                object_id: t,
                type: o,
                state: r ? 1 : 0,
                hash: n,
                item_access_hash: a,
                ref: c
            }, {
                onDone: function(o, n, r, a) {
                    if (o) {
                        var c = window.showDoneBox(o),
                            s = Object(_.H)("bookmarks_tag_set", c);
                        if (s && !isEmpty(n)) {
                            var d = [];
                            each(n, function(e, t) {
                                d.push(t)
                            }), d.sort(function(e, t) {
                                return e.order - t.order
                            });
                            for (var u = '<div class="bookmarks_tags_list">', l = 0; l < d.length; l++) {
                                var p = d[l];
                                u += '<div class="bookmarks_tags_list_item" data-id="' + p.id + '">' + p.name + "</div>"
                            }
                            u += "</div>", (u = se(u)).addEventListener("click", function(o) {
                                var n = domClosest("bookmarks_tags_list_item", o.target);
                                if (n) {
                                    var c = Object(_.s)(n, "id"),
                                        s = toggleClass(n, "bookmarks_tags_list_item--selected");
                                    ajax.post("al_bookmarks.php", {
                                        act: "set_tag",
                                        item_type: r,
                                        item_oid: e,
                                        item_id: t,
                                        hash: a,
                                        tag_id: c,
                                        is_tagged: Object(i.r)(!s)
                                    })
                                }
                            }), cur.setBookmarksTagTooltip && cur.setBookmarksTagTooltip.destroy(), stManager.add(["ui_common.css", "ui_common.js"], function() {}), cur.setBookmarksTagTooltip = new ElementTooltip(s, {
                                content: u,
                                appendToParent: !0,
                                cls: "bookmarks_tag_set_tt",
                                offset: [0, -26],
                                onFirstTimeShow: function(e) {
                                    stManager.add(["ui_common.css", "ui_common.js"], function() {
                                        cur.setBookmarksTagTooltipScroll = new uiScroll(domFC(e), {
                                            theme: "dark"
                                        })
                                    })
                                }
                            }), cur.destroy.push(function() {
                                cur.setBookmarksTagTooltip.destroy()
                            })
                        }
                    }
                }
            })
        }

        function L(e, t, o, n, r, a) {
            var c = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : "";
            if (Object(i.x)(window.cur) && Object(i.v)(window.cur.viewAsBox)) return window.cur.viewAsBox();
            var s = parseInt(Object(_.s)(e, "state"));
            e.innerHTML = s ? Object(_.s)(e, "add") : Object(_.s)(e, "remove"), Object(_.s)(e, "state", s ? 0 : 1), T(t, o, n, r, s, a, c)
        }

        function x(e, t, o, i, r, a, c) {
            return t && (c = parseInt(Object(_.s)(t, "state")), Object(_.s)(t, "state", c ? 0 : 1)), T(o, i, r, a, c), each(geByClass("_article_" + o + "_" + i), function(e, t) {
                var o = Object(_.H)("_bookmark_btn", t);
                Object(_.s)(o, "state", c ? 0 : 1)
            }), Object(n.c)(e)
        }

        function k(e, t, o) {
            var i = parseInt(Object(_.s)(t, "state"));
            return Object(_.s)(t, "state", i ? 0 : 1), ajax.post("al_bookmarks.php", {
                act: "bookmark_link",
                state: i ? 1 : 0,
                hash: o,
                url: Object(_.s)(t, "link-url"),
                img: Object(_.s)(t, "link-img"),
                title: Object(_.s)(t, "link-title")
            }, {
                onDone: function(e) {
                    e && window.showDoneBox(e)
                }
            }), Object(n.c)(e)
        }

        function A(e, t, o, i, r) {
            return stManager.add([jsc("web/podcast.js")], function() {
                Podcast.toggleFave(e, t, o, r)
            }), i && Object(n.c)(i)
        }

        function C(e, t, o, i, r, a) {
            var c = parseInt(Object(_.s)(t, "state"));
            return Object(_.s)(t, "state", c ? 0 : 1), T(o, i, r, a, c), Object(n.c)(e)
        }

        function I(e, t, o, i) {
            return Object(r.b)("like.php", {
                act: "publish_box",
                object: "audio_playlist" + t + "_" + o,
                list: i
            }, {
                stat: ["wide_dd.js", "wide_dd.css", "sharebox.js"]
            }), Object(n.c)(e)
        }

        function B() {
            return window.AudioPlayer ? (window.ap = window.ap || new AudioPlayer, window.ap) : window.isMobileLanding ? {} : (B.run || Object(i.i)(B, {
                queue: [],
                run: function() {
                    window.ap = window.ap || new AudioPlayer;
                    for (var e = void 0; e = B.queue.shift();) ap[e.name].apply(ap, e.args)
                },
                pushQueue: function(e) {
                    for (var t = arguments.length, o = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) o[n - 1] = arguments[n];
                    if (vk && vk.widget && !vk.id) return Widgets.oauth(), !1;
                    B.queue.push({
                        name: e,
                        args: o
                    })
                },
                wrapper: {
                    toggleAudio: function() {
                        for (var e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                        B.pushQueue.apply(B, ["toggleAudio"].concat(t))
                    },
                    updateCurrentPlaying: function() {
                        for (var e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                        B.pushQueue.apply(B, ["updateCurrentPlaying"].concat(t))
                    },
                    playPlaylist: function() {
                        for (var e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                        B.pushQueue.apply(B, ["playPlaylist"].concat(t))
                    },
                    showHQLabel: function() {
                        return !1
                    },
                    isPlaying: function() {
                        return !1
                    }
                }
            }), stManager.add(["audioplayer.js", "audioplayer.css", "ui_common.js", "ui_common.css"], B.run), B.wrapper)
        }

        function R(e, t) {
            var o = e + "_" + t,
                n = Object(_.H)("_audio_row_" + o);
            AudioUtils.deleteAudio(n, AudioUtils.getAudioFromEl(n, !0)), cur.claimWarning && cur.claimWarning.hide()
        }

        function W() {
            stManager.add(["audioplayer.js"], function() {
                window.TopAudioPlayer.init()
            })
        }
        var U = {
            loaded: !1,
            togglePlay: function(e, t) {
                stManager.add("voice_message_player.js", function() {
                    return window.AudioMessagePlayer.togglePlay(e, t)
                })
            },
            detachPlayer: function(e) {
                stManager.add("voice_message_player.js", function() {
                    return window.AudioMessagePlayer.detachPlayer(e)
                })
            }
        };

        function K(e, t) {
            var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            e && e.tt && e.tt.hide && e.tt.hide({
                fasthide: 1
            });
            var n = e,
                r = !1;
            if (S() && ArticleLayer.isStandalone() && (r = !0), n.tagName && "a" === n.tagName.toLowerCase() && !n.getAttribute("target") && !nav.baseBlank) {
                var _ = n.getAttribute("hrefparams");
                _ && (o.params = Object(i.i)(o.params || {}, Object(d.f)(_))), (n = (n = n.href || "").replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (n = n.replace(location.hostname, ""));
                var a = void 0;
                (n = n.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/")).match(/#$/) || !(a = n.match(/^\/(.*?)(\?|#|$)/)) ? r = !0 : ((a = a[1]).indexOf(".php") > 0 || a.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images|utils|\.js|js\/|\.css|css\/)/)) && (r = !0)
            }
            if (r) {
                if (!!!(o && o.params && o.params._post && o.params._post_click_type)) return !0;
                e.setAttribute("data-change-location-with-post-away", 1), n = e
            }
            return nav.go(n, t, o)
        }

        function S() {
            return window.ArticleLayer && window.ArticleLayer.isShown()
        }
    },
    "0/R4": function(e, t) {
        e.exports = function(e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        }
    },
    "0DAA": function(e, t, o) {
        "use strict";
        o.d(t, "a", function() {
            return n
        });
        var n = {
            checkVersion: function() {
                return void 0 !== window.localStorage && void 0 !== window.JSON
            },
            set: function(e, t) {
                this.remove(e);
                try {
                    return !!n.checkVersion() && localStorage.setItem(e, JSON.stringify(t))
                } catch (e) {
                    return !1
                }
            },
            get: function(e) {
                if (!n.checkVersion()) return !1;
                try {
                    return JSON.parse(localStorage.getItem(e))
                } catch (e) {
                    return !1
                }
            },
            remove: function(e) {
                try {
                    localStorage.removeItem(e)
                } catch (e) {}
            }
        }
    },
    "1TsA": function(e, t) {
        e.exports = function(e, t) {
            return {
                value: t,
                done: !!e
            }
        }
    },
    "2OiF": function(e, t) {
        e.exports = function(e) {
            if ("function" != typeof e) throw TypeError(e + " is not a function!");
            return e
        }
    },
    "3Lyj": function(e, t, o) {
        var n = o("KroJ");
        e.exports = function(e, t, o) {
            for (var i in t) n(e, i, t[i], o);
            return e
        }
    },
    "4LiD": function(e, t, o) {
        "use strict";
        var n = o("dyZX"),
            i = o("XKFU"),
            r = o("KroJ"),
            _ = o("3Lyj"),
            a = o("Z6vF"),
            c = o("SlkY"),
            s = o("9gX7"),
            d = o("0/R4"),
            u = o("eeVq"),
            l = o("XMVh"),
            p = o("fyDq"),
            b = o("Xbzi");
        e.exports = function(e, t, o, f, h, w) {
            var O = n[e],
                m = O,
                v = h ? "set" : "add",
                E = m && m.prototype,
                g = {},
                j = function(e) {
                    var t = E[e];
                    r(E, e, "delete" == e ? function(e) {
                        return !(w && !d(e)) && t.call(this, 0 === e ? 0 : e)
                    } : "has" == e ? function(e) {
                        return !(w && !d(e)) && t.call(this, 0 === e ? 0 : e)
                    } : "get" == e ? function(e) {
                        return w && !d(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                    } : "add" == e ? function(e) {
                        return t.call(this, 0 === e ? 0 : e), this
                    } : function(e, o) {
                        return t.call(this, 0 === e ? 0 : e, o), this
                    })
                };
            if ("function" == typeof m && (w || E.forEach && !u(function() {
                    (new m).entries().next()
                }))) {
                var P = new m,
                    M = P[v](w ? {} : -0, 1) != P,
                    y = u(function() {
                        P.has(1)
                    }),
                    D = l(function(e) {
                        new m(e)
                    }),
                    T = !w && u(function() {
                        for (var e = new m, t = 5; t--;) e[v](t, t);
                        return !e.has(-0)
                    });
                D || ((m = t(function(t, o) {
                    s(t, m, e);
                    var n = b(new O, t, m);
                    return void 0 != o && c(o, h, n[v], n), n
                })).prototype = E, E.constructor = m), (y || T) && (j("delete"), j("has"), h && j("get")), (T || M) && j(v), w && E.clear && delete E.clear
            } else m = f.getConstructor(t, e, h, v), _(m.prototype, o), a.NEED = !0;
            return p(m, e), g[e] = m, i(i.G + i.W + i.F * (m != O), g), w || f.setStrong(m, e, h), m
        }
    },
    "4O8T": function(e, t, o) {
        var n;
        ! function(t) {
            "use strict";

            function i() {}
            var r = i.prototype,
                _ = t.EventEmitter;

            function a(e, t) {
                for (var o = e.length; o--;)
                    if (e[o].listener === t) return o;
                return -1
            }

            function c(e) {
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
                for (o in n) n.hasOwnProperty(o) && -1 === a(n[o], t) && n[o].push(i ? t : {
                    listener: t,
                    once: !1
                });
                return this
            }, r.on = c("addListener"), r.addOnceListener = function(e, t) {
                return this.addListener(e, {
                    listener: t,
                    once: !0
                })
            }, r.once = c("addOnceListener"), r.defineEvent = function(e) {
                return this.getListeners(e), this
            }, r.defineEvents = function(e) {
                for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
                return this
            }, r.removeListener = function(e, t) {
                var o, n, i = this.getListenersAsObject(e);
                for (n in i) i.hasOwnProperty(n) && -1 !== (o = a(i[n], t)) && i[n].splice(o, 1);
                return this
            }, r.off = c("removeListener"), r.addListeners = function(e, t) {
                return this.manipulateListeners(!1, e, t)
            }, r.removeListeners = function(e, t) {
                return this.manipulateListeners(!0, e, t)
            }, r.manipulateListeners = function(e, t, o) {
                var n, i, r = e ? this.removeListener : this.addListener,
                    _ = e ? this.removeListeners : this.addListeners;
                if ("object" != typeof t || t instanceof RegExp)
                    for (n = o.length; n--;) r.call(this, t, o[n]);
                else
                    for (n in t) t.hasOwnProperty(n) && (i = t[n]) && ("function" == typeof i ? r.call(this, n, i) : _.call(this, n, i));
                return this
            }, r.removeEvent = function(e) {
                var t, o = typeof e,
                    n = this._getEvents();
                if ("string" === o) delete n[e];
                else if (e instanceof RegExp)
                    for (t in n) n.hasOwnProperty(t) && e.test(t) && delete n[t];
                else delete this._events;
                return this
            }, r.removeAllListeners = c("removeEvent"), r.emitEvent = function(e, t) {
                var o, n, i, r, _ = this.getListenersAsObject(e);
                for (r in _)
                    if (_.hasOwnProperty(r))
                        for (o = _[r].slice(0), i = 0; i < o.length; i++) !0 === (n = o[i]).once && this.removeListener(e, n.listener), n.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, n.listener);
                return this
            }, r.trigger = c("emitEvent"), r.emit = function(e) {
                var t = Array.prototype.slice.call(arguments, 1);
                return this.emitEvent(e, t)
            }, r.setOnceReturnValue = function(e) {
                return this._onceReturnValue = e, this
            }, r._getOnceReturnValue = function() {
                return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
            }, r._getEvents = function() {
                return this._events || (this._events = {})
            }, i.noConflict = function() {
                return t.EventEmitter = _, i
            }, void 0 === (n = function() {
                return i
            }.call(t, o, t, e)) || (e.exports = n)
        }(this || {})
    },
    "4R4u": function(e, t) {
        e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
    },
    71: function(e, t, o) {
        e.exports = o("g42W")
    },
    "8oxB": function(e, t) {
        var o, n, i = e.exports = {};

        function r() {
            throw new Error("setTimeout has not been defined")
        }

        function _() {
            throw new Error("clearTimeout has not been defined")
        }

        function a(e) {
            if (o === setTimeout) return setTimeout(e, 0);
            if ((o === r || !o) && setTimeout) return o = setTimeout, setTimeout(e, 0);
            try {
                return o(e, 0)
            } catch (t) {
                try {
                    return o.call(null, e, 0)
                } catch (t) {
                    return o.call(this, e, 0)
                }
            }
        }! function() {
            try {
                o = "function" == typeof setTimeout ? setTimeout : r
            } catch (e) {
                o = r
            }
            try {
                n = "function" == typeof clearTimeout ? clearTimeout : _
            } catch (e) {
                n = _
            }
        }();
        var c, s = [],
            d = !1,
            u = -1;

        function l() {
            d && c && (d = !1, c.length ? s = c.concat(s) : u = -1, s.length && p())
        }

        function p() {
            if (!d) {
                var e = a(l);
                d = !0;
                for (var t = s.length; t;) {
                    for (c = s, s = []; ++u < t;) c && c[u].run();
                    u = -1, t = s.length
                }
                c = null, d = !1,
                    function(e) {
                        if (n === clearTimeout) return clearTimeout(e);
                        if ((n === _ || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
                        try {
                            n(e)
                        } catch (t) {
                            try {
                                return n.call(null, e)
                            } catch (t) {
                                return n.call(this, e)
                            }
                        }
                    }(e)
            }
        }

        function b(e, t) {
            this.fun = e, this.array = t
        }

        function f() {}
        i.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
            s.push(new b(e, t)), 1 !== s.length || d || a(p)
        }, b.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = f, i.addListener = f, i.once = f, i.off = f, i.removeListener = f, i.removeAllListeners = f, i.emit = f, i.prependListener = f, i.prependOnceListener = f, i.listeners = function(e) {
            return []
        }, i.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, i.cwd = function() {
            return "/"
        }, i.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, i.umask = function() {
            return 0
        }
    },
    "9AAn": function(e, t, o) {
        "use strict";
        var n = o("wmvG");
        e.exports = o("4LiD")("Map", function(e) {
            return function() {
                return e(this, arguments.length > 0 ? arguments[0] : void 0)
            }
        }, {
            get: function(e) {
                var t = n.getEntry(this, e);
                return t && t.v
            },
            set: function(e, t) {
                return n.def(this, 0 === e ? 0 : e, t)
            }
        }, n, !0)
    },
    "9gX7": function(e, t) {
        e.exports = function(e, t, o, n) {
            if (!(e instanceof t) || void 0 !== n && n in e) throw TypeError(o + ": incorrect invocation!");
            return e
        }
    },
    Afnz: function(e, t, o) {
        "use strict";
        var n = o("LQAc"),
            i = o("XKFU"),
            r = o("KroJ"),
            _ = o("Mukb"),
            a = o("aagx"),
            c = o("hPIQ"),
            s = o("QaDb"),
            d = o("fyDq"),
            u = o("OP3Y"),
            l = o("K0xU")("iterator"),
            p = !([].keys && "next" in [].keys()),
            b = function() {
                return this
            };
        e.exports = function(e, t, o, f, h, w, O) {
            s(o, t, f);
            var m, v, E, g = function(e) {
                    if (!p && e in y) return y[e];
                    switch (e) {
                        case "keys":
                        case "values":
                            return function() {
                                return new o(this, e)
                            }
                    }
                    return function() {
                        return new o(this, e)
                    }
                },
                j = t + " Iterator",
                P = "values" == h,
                M = !1,
                y = e.prototype,
                D = y[l] || y["@@iterator"] || h && y[h],
                T = D || g(h),
                L = h ? P ? g("entries") : T : void 0,
                x = "Array" == t && y.entries || D;
            if (x && (E = u(x.call(new e))) !== Object.prototype && (d(E, j, !0), n || a(E, l) || _(E, l, b)), P && D && "values" !== D.name && (M = !0, T = function() {
                    return D.call(this)
                }), n && !O || !p && !M && y[l] || _(y, l, T), c[t] = T, c[j] = b, h)
                if (m = {
                        values: P ? T : g("values"),
                        keys: w ? T : g("keys"),
                        entries: L
                    }, O)
                    for (v in m) v in y || r(y, v, m[v]);
                else i(i.P + i.F * (p || M), t, m);
            return m
        }
    },
    AvRE: function(e, t, o) {
        var n = o("RYi7"),
            i = o("vhPU");
        e.exports = function(e) {
            return function(t, o) {
                var r, _, a = String(i(t)),
                    c = n(o),
                    s = a.length;
                return c < 0 || c >= s ? e ? "" : void 0 : (r = a.charCodeAt(c)) < 55296 || r > 56319 || c + 1 === s || (_ = a.charCodeAt(c + 1)) < 56320 || _ > 57343 ? e ? a.charAt(c) : r : e ? a.slice(c, c + 2) : _ - 56320 + (r - 55296 << 10) + 65536
            }
        }
    },
    Bszp: function(e, t, o) {
        "use strict";
        o.d(t, "c", function() {
            return d
        }), o.d(t, "b", function() {
            return u
        });
        var n = o("zxIV"),
            i = o("Egk5"),
            r = o("t7n3"),
            _ = o("ErRf"),
            a = o("4+be"),
            c = o("aong"),
            s = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var o = [],
                            n = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var _, a = e[Symbol.iterator](); !(n = (_ = a.next()).done) && (o.push(_.value), !t || o.length !== t); n = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return o
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function d(e) {
            window.headerDestroy && window.headerDestroy(), window.headerDestroy = e
        }

        function u() {
            delete window.headerDestroy
        }
        var l = {
            cache: {},
            lists: {},
            maxItems: 8,
            init: function() {
                if (this.inited) return !1;
                var e = Object(n.F)("ts_input"),
                    t = Object(n.F)("ts_cont_wrap");
                if (vk.id && Chat.init(), !e) return !1;
                Object(i.b)(e, "focus", function() {
                    l.deselect(), Object(r.H)(Object(n.Ya)(this)) && Object(n.a)(t.firstChild, "active"), l.toggleInput(!0)
                }), Object(i.b)(e, "keydown", function(o) {
                    switch (o.keyCode) {
                        case i.a.DOWN:
                        case i.a.UP:
                            l.moveSelection(o.keyCode), Object(i.c)(o);
                            break;
                        case i.a.ENTER:
                            var a = Object(n.H)("active", t);
                            if (a) l.select(a, o);
                            else {
                                var c = Object(r.H)(Object(n.Ya)(this));
                                c && (e.blur(), l.clear(), l.toggle(!1), nav.go("/search?c[section]=auto&c[q]=" + encodeURIComponent(c)))
                            }
                            Object(i.c)(o);
                            break;
                        case i.a.TAB:
                            l.clear(), l.toggleInput(!1), Object(_.a)("top_search", !0)
                    }
                }), vk.id && (Object(i.b)(e, "keyup", function(e) {
                    switch (e.keyCode) {
                        case i.a.DOWN:
                        case i.a.UP:
                        case i.a.ENTER:
                        case i.a.ESC:
                            Object(i.c)(e);
                            break;
                        default:
                            l.prepareRows(Object(r.H)(Object(n.Ya)(this)))
                    }
                }), Object(i.b)(e, "paste", function() {
                    setTimeout(function() {
                        l.prepareRows(Object(r.H)(Object(n.Ya)(e)))
                    }, 10)
                }), Object(i.b)(document, "mousedown", function(e) {
                    Object(i.e)(e) || Object(n.n)("_audio_page_layout", e.target) || Object(n.n)("_ap_layer__close", e.target) || Object(n.n)("layer_wrap", e.target) || d()
                }), this.inited = !0)
            },
            clear: function() {
                window.tooltips && tooltips.destroyAll(Object(n.F)("ts_cont_wrap"));
                var e = Object(n.F)("ts_input");
                e && e.phonblur && (Object(n.Ya)(e, ""), e.blur(), e.phonblur(), this.prepareRows())
            },
            select: function(e, t, o) {
                if (Object(i.d)(t)) return !0;
                var _ = Object(n.F)("ts_input"),
                    a = Object(r.H)(Object(n.Ya)(_)).length,
                    c = e.getAttribute("hinttype");
                if (this.clear(), d(), a || _.blur(), o && Object(n.V)(t.target, "ts_contact_status")) return ajax.post("al_search.php", {
                    act: "save_metrics",
                    ql: a,
                    mk: "chat_box"
                }), this.writeBox(o), !1;
                var s = nav.go(e, t);
                return ajax.post("al_search.php", {
                    act: "save_metrics",
                    ql: a,
                    mk: c
                }), s
            },
            deselect: function() {
                var e = Object(n.F)("ts_cont_wrap");
                Object(r.f)(Object(n.G)("active", e), function(e, t) {
                    return Object(n.Ha)(t, "active")
                })
            },
            itemOver: function(e, t, o) {
                1 === t && l.deselect();
                var i = Object(r.o)(e.getAttribute("hintType"), ["h_friends", "h_correspondents", "h_chats"]);
                Object(n.Va)(e, "write", i), Object(n.Va)(e, "active", t)
            },
            moveSelection: function(e) {
                var t = Object(n.F)("ts_cont_wrap"),
                    o = Object(n.H)("active", t),
                    r = void 0;
                switch (e) {
                    case i.a.UP:
                        r = !!o && (this.getNextNode(o, -1, "a") || o);
                        break;
                    case i.a.DOWN:
                        r = o ? this.getNextNode(o, 1, "a") || o : t.firstChild
                }
                return this.deselect(), r && Object(n.a)(r, "active"), !1
            },
            getNextNode: function(e, t, o) {
                for (var i = e, r = Object(n.z)(e);;) {
                    if ((i = t > 0 ? Object(n.y)(i) : Object(n.A)(i)) || (i = t > 0 ? Object(n.u)(r) : Object(n.x)(r)), o && i.tagName && i.tagName.toLowerCase() === o || !o && i) return i;
                    if (i === e) return !1
                }
            },
            toggleInput: function(e) {
                e = !!e;
                var t = Object(n.F)("ts_cont_wrap");
                Object(n.Aa)(t) !== e && (Object(n.Ua)("ts_cont_wrap", e), e && Object(_.c)("top_search", function() {
                    var e = Object(n.F)("ts_input");
                    l.toggleInput(!1), e.blur()
                }, !0))
            },
            getList: function(e) {
                switch (e) {
                    case "friends":
                        return this.lists.friends || this.topFriends || {};
                    case "publics":
                    case "events":
                    case "groups":
                    case "apps":
                    case "chats":
                    case "search":
                        return this.lists[e] || {}
                }
                return {}
            },
            onlines: function() {
                return window.curFastChat && curFastChat.onlines || this.lists.onlines || {}
            },
            initFriendsList: function() {
                if (l.friendsLoaded) return !1;
                if (cur.initingFL || vk.isBanned || !vk.id) return !1;
                var e = function() {
                        if (l.friendsLoaded) return !1;
                        cur.initingFL = !0, ajax.post("al_search.php", {
                            act: "get_pages"
                        }, {
                            cache: 1,
                            onDone: function(e) {
                                delete cur.initingFL, l.friendsLoaded || (Object(r.f)(e, function(e, t) {
                                    l.lists[e] = t, "onlines" !== e && l.updateCache(e)
                                }), l.friendsLoaded = !0, Object(n.Ya)("ts_input") || l.prepareRows(""))
                            },
                            onFail: function() {
                                delete cur.initingFL
                            }
                        })
                    },
                    t = l.getList("friends");
                Object(r.u)(t) ? (cur.initingFL = !0, ajax.post("al_search.php", {
                    act: "get_top_friends"
                }, {
                    cache: 1,
                    onDone: function(t) {
                        delete cur.initingFL, l.topFriends = t, l.updateCache("friends"), l.forceUpdate = !0, l.prepareRows(cur.tsStr || ""), e()
                    },
                    onFail: function() {
                        delete cur.initingFL
                    }
                })) : (l.updateCache("friends"), l.forceUpdate = !0, l.prepareRows(cur.tsStr || ""), e())
            },
            getSimilarQueries: function(e) {
                var t = [e = e.toLowerCase()],
                    o = void 0;
                return (o = Object(a.o)(e)) && t.push(o), (o = Object(a.n)(e)) && t.push(o), (o = Object(a.m)(e)) && t.push(o), t
            },
            searchCache: function(e, t) {
                var o = this,
                    n = l.getList(e);
                if (!t) return !1;
                var i = this.getSimilarQueries(t);
                if (void 0 !== this.cache[e][t]) return i;
                var _ = this.cache[e][t] = {};
                Object(r.f)(i, function(t, i) {
                    var a = o.cache[e][" " + i.charAt(0).toLowerCase()];
                    if (a) {
                        var c = new RegExp("(^|[\\s\\-\\(\\)\\.,;|:]+)" + Object(r.h)(i), "gi");
                        Object(r.f)(a, function(e) {
                            var t = n[e + "_"];
                            if (!Object(r.t)(t)) return !0;
                            null !== t[0].match(c) && (_[e] = 1)
                        })
                    }
                });
                var a = 0;
                return Object(r.f)(_, function() {
                    return a++
                }), _._num = a, i
            },
            updateCache: function(e, t, o) {
                var n = this,
                    i = t || this.getList(e);
                this.cache[e] = o && this.cache[e] || {}, Object(r.f)(i, function(t, o) {
                    var i = o[0],
                        _ = Object(r.r)(t),
                        a = i.split(/[\s\-\(\)\.,;|:]+/);
                    Object(r.f)(a, function(t, o) {
                        var i = " " + o.charAt(0).toLowerCase();
                        n.cache[e][i] = n.cache[e][i] || {}, n.cache[e][i][_] = 1
                    })
                })
            },
            listSearch: function(e, t, o, n) {
                var i = [],
                    _ = {};
                return t ? (l.searchCache(e, t), _ = l.cache[e] && l.cache[e][t] || {}) : Object(r.f)(l.getList(e), function(e) {
                    var t = Object(r.r)(e);
                    _[t] = 1
                }), Object(r.f)(l.getList(e), function(e) {
                    var t = Object(r.r)(e),
                        a = _[t];
                    if ((!n || !n[t]) && a) return !!o-- && void i.push([t, this])
                }), i
            },
            row: function(e, t, o, n, i, _, a, s, d) {
                var u = 0;
                if (_ && (n = n.replace(_, '$1<em class="ts_clist_hl">$2</em>')), Object(r.o)(a, ["h_friends", "h_correspondents", "h_chats"]) && (u = e), s || (s = ""), d = Object(r.r)(d)) {
                    var l = "";
                    1 & d && (l += "page_verified "), 2 & d && (l += "page_top_author "), -128932034 === e ? l += "ph_verified " : -29246653 === e && (l += "pg_verified "), d = '<div class="' + l + '" onmouseover="pageVerifiedTip(this, {type: ' + d + ", oid: " + e + '})"></div>'
                } else d = "";
                return '\n<a href="' + t + '" class="ts_contact clear_fix" id="ts_contact' + e + '" onclick="return TopSearch.select(this, event, ' + u + ');" onmousedown="event.cancelBubble = true;"\n      onmouseover="TopSearch.itemOver(this, 1, event);"  onmouseout="TopSearch.itemOver(this, 0, event);" hinttype="' + a + '">\n  <span class="ts_contact_photo ' + Object(c.j)(i) + '">\n    <img class="ts_contact_img" src="' + o + '"/>\n  </span>\n  <span class="ts_contact_name fl_l">\n    <div class="ts_contact_title_wrap' + (d ? " is_verified" : "") + '">\n      <span class="ts_contact_title">' + n + "</span>\n    </div>" + d + '\n    <div class="ts_contact_info">' + s + '</div>\n  </span>\n  <div class="ts_contact_status"></div>\n</a>'
            },
            searchLists: function(e) {
                return e ? {
                    friends: {
                        order: 0,
                        count: l.maxItems - 1,
                        label: Object(a.d)("global_friends")
                    },
                    groups: {
                        order: 1,
                        count: 4,
                        label: Object(a.d)("global_communities")
                    },
                    publics: {
                        count: 2,
                        parent: "groups"
                    },
                    events: {
                        count: 1,
                        parent: "groups"
                    },
                    apps: {
                        order: 2,
                        count: 1,
                        label: Object(a.d)("global_apps")
                    },
                    vk_apps: {
                        order: 2,
                        count: 1,
                        label: Object(a.d)("global_apps")
                    },
                    chats: {
                        order: 3,
                        count: l.maxItems - 1,
                        label: Object(a.d)("global_chats")
                    },
                    search: {
                        order: 4,
                        count: l.maxItems - 1,
                        label: Object(a.d)("head_search_results")
                    }
                } : {
                    friends: {
                        order: 0,
                        count: l.maxItems,
                        label: Object(a.d)("global_friends")
                    }
                }
            },
            initListsHtml: function() {
                l.listsHtml = []
            },
            addToListsHtml: function(e, t, o) {
                var n = l.searchLists(o),
                    i = n[(n[e] || {}).parent || e] || {},
                    r = i.order || 0,
                    _ = i.label || "";
                l.listsHtml[r] = l.listsHtml[r] || (o && _ ? ['<div class="ts_search_sep">' + _ + "</div>"] : []), l.listsHtml[r].push(t)
            },
            htmlRows: function(e) {
                var t = "",
                    o = l.listsHtml.map(function(e) {
                        return e.join("")
                    });
                if (e) {
                    var n = "#" === e[0] ? "statuses" : "auto",
                        i = "#" === e[0] ? Object(a.d)("global_news_search_results") : Object(a.d)("global_show_all_results");
                    t += '\n<a href="/search?c[section]=' + n + "&c[q]=" + encodeURIComponent(e) + '" class="ts_search_link clear_fix active" id="ts_search_link"\n    onclick="return TopSearch.select(this, event);" onmousedown="event.cancelBubble = true;" onmouseover="TopSearch.itemOver(this, 1, event);"\n    onmouseout="TopSearch.itemOver(this, 0, event);" >\n  <span class="ts_contact_name fl_l">' + i + '</span>\n  <div class="ts_contact_status "></div>\n</a>'
                }
                return t + o.join("")
            },
            prepareRows: function(e) {
                var t = l.maxItems,
                    o = Object(n.F)("ts_cont_wrap");
                if (!o || !vk.id) return !1;
                if (cur.tsStr && cur.tsStr === e && !l.forceUpdate) return !1;
                delete l.forceUpdate, l.initListsHtml();
                var i = {};
                if (e) {
                    var _ = [];
                    Object(r.f)(this.getSimilarQueries(e), function() {
                        _.push(Object(r.h)(this))
                    }), cur.lastRe = new RegExp("([ -]|^|s|&nbsp;|\b)(" + _.join("|") + ")", "gi"), t--
                }
                Object(r.f)(l.searchLists(e), function(o, _) {
                    if (l.cache[o]) {
                        var a = _.count,
                            c = l.listSearch(o, e, a, i),
                            d = [],
                            u = 0;
                        Object(r.u)(c) || (Object(r.f)(c, function(e, o) {
                            if (!t || u >= a) return !1;
                            d.push(o), t--, u++
                        }), d.length && Object(r.f)(d, function(t, _) {
                            var a = _[1],
                                c = Object(r.r)(_[0]),
                                d = c > 0 && l.onlines()[c],
                                u = s(a, 6),
                                p = u[0],
                                b = u[1],
                                f = u[2],
                                h = u[3],
                                w = u[4],
                                O = u[5],
                                m = "search" === o ? h : "h_" + o,
                                v = l.row(c, f, b, p, d, n.Fa, m, w, O);
                            l.addToListsHtml(o, v, e), i[c] = 1
                        }))
                    }
                }), o.innerHTML = l.htmlRows(e), t && e && "#" !== e[0] && this.hintsSearch(e, cur.lastRe || !1), e && (cur.tsStr = e)
            },
            hintsSearch: function(e, t) {
                var o = Object(n.F)("ts_input"),
                    i = Object(n.F)("ts_cont_wrap"),
                    _ = void 0;
                ajax.post("al_search.php", {
                    act: "get_pages_hints",
                    q: e
                }, {
                    cache: 1,
                    onDone: function(a) {
                        if (Object(r.H)(Object(n.Ya)(o)) !== e) return !1;
                        if (!a) return !1;
                        var c = l.maxItems - Object(n.G)("ts_contact", i).length - 1,
                            d = {};
                        if (Object(r.f)(a, function(o, i) {
                                var a = Object(r.r)(o),
                                    u = s(i, 6),
                                    p = u[0],
                                    b = u[1],
                                    f = u[2],
                                    h = u[3],
                                    w = u[4],
                                    O = u[5],
                                    m = l.searchLists(e),
                                    v = h.replace("h_", ""),
                                    E = (m[v] || {}).parent || v;
                                if (void 0 === m[E] && (E = "search"), d[E] = d[E] || {}, d[E][o] = i, l.lists[E] = l.lists[E] || {}, l.lists[E][o] = i, Object(n.F)("ts_contact" + a)) return !0;
                                if (!c--) return !1;
                                var g = l.row(a, f, b, p, !1, t, h, w, O);
                                return l.addToListsHtml(E, g, e), _ = !0, !0
                            }), Object(r.f)(d, function(e, t) {
                                return l.updateCache(e, t, !0)
                            }), _) {
                            var u = Object(n.H)("active", i),
                                p = u ? u.id : "";
                            i.innerHTML = l.htmlRows(e), p && Object(n.F)(p) && Object(n.a)(Object(n.F)(p), "active")
                        }
                    }
                })
            },
            writeBox: function(e) {
                window.curFastChat && curFastChat.inited && window.FastChat ? FastChat.selectPeer(e, !1, {
                    entrypoint: "fastchat_global_search"
                }) : e > 0 && e < 2e9 ? window.showWriteMessageBox(!1, e) : nav.go("/im?sel=" + e)
            }
        };
        t.a = l
    },
    Btvt: function(e, t, o) {
        "use strict";
        var n = o("I8a+"),
            i = {};
        i[o("K0xU")("toStringTag")] = "z", i + "" != "[object z]" && o("KroJ")(Object.prototype, "toString", function() {
            return "[object " + n(this) + "]"
        }, !0)
    },
    Cfrj: function(e, t, o) {
        var n = o("RYi7"),
            i = Math.max,
            r = Math.min;
        e.exports = function(e, t) {
            return (e = n(e)) < 0 ? i(e + t, 0) : r(e, t)
        }
    },
    DVgA: function(e, t, o) {
        var n = o("zhAb"),
            i = o("4R4u");
        e.exports = Object.keys || function(e) {
            return n(e, i)
        }
    },
    E2g8: function(e, t, o) {
        (function(n, i) {
            var r;
            (function() {
                "use strict";

                function _(e) {
                    return "function" == typeof e
                }
                var a, c, s = Array.isArray ? Array.isArray : function(e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    },
                    d = 0,
                    u = function(e, t) {
                        j[d] = e, j[d + 1] = t, 2 === (d += 2) && (c ? c(P) : O())
                    };
                var l = "undefined" != typeof window ? window : void 0,
                    p = l || {},
                    b = p.MutationObserver || p.WebKitMutationObserver,
                    f = void 0 !== n && "[object process]" === {}.toString.call(n),
                    h = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

                function w() {
                    return function() {
                        setTimeout(P, 1)
                    }
                }
                var O, m, v, E, g, j = new Array(1e3);

                function P() {
                    for (var e = 0; e < d; e += 2) {
                        (0, j[e])(j[e + 1]), j[e] = void 0, j[e + 1] = void 0
                    }
                    d = 0
                }
                f ? O = function() {
                    n.nextTick(P)
                } : b ? (v = 0, E = new b(P), g = document.createTextNode(""), E.observe(g, {
                    characterData: !0
                }), O = function() {
                    g.data = v = ++v % 2
                }) : h ? ((m = new MessageChannel).port1.onmessage = P, O = function() {
                    m.port2.postMessage(0)
                }) : O = void 0 === l ? function() {
                    try {
                        var e = o(! function() {
                            var e = new Error("Cannot find module 'vertx'");
                            throw e.code = "MODULE_NOT_FOUND", e
                        }());
                        return a = e.runOnLoop || e.runOnContext,
                            function() {
                                a(P)
                            }
                    } catch (e) {
                        return w()
                    }
                }() : w();
                var M = function(e, t) {
                    var o = this._state;
                    if (o === L && !e || o === x && !t) return this;
                    var n = new this.constructor(D),
                        i = this._result;
                    if (o) {
                        var r = arguments[o - 1];
                        u(function() {
                            F(o, n, r, i)
                        })
                    } else U(this, n, e, t);
                    return n
                };
                var y = function(e) {
                    if (e && "object" == typeof e && e.constructor === this) return e;
                    var t = new this(D);
                    return I(t, e), t
                };

                function D() {}
                var T = void 0,
                    L = 1,
                    x = 2,
                    k = new S;

                function A(e) {
                    try {
                        return e.then
                    } catch (e) {
                        return k.error = e, k
                    }
                }

                function C(e, t, o) {
                    t.constructor === e.constructor && o === M && constructor.resolve === y ? function(e, t) {
                        t._state === L ? R(e, t._result) : t._state === x ? W(e, t._result) : U(t, void 0, function(t) {
                            I(e, t)
                        }, function(t) {
                            W(e, t)
                        })
                    }(e, t) : o === k ? W(e, k.error) : void 0 === o ? R(e, t) : _(o) ? function(e, t, o) {
                        u(function(e) {
                            var n = !1,
                                i = function(e, t, o, n) {
                                    try {
                                        e.call(t, o, n)
                                    } catch (e) {
                                        return e
                                    }
                                }(o, t, function(o) {
                                    n || (n = !0, t !== o ? I(e, o) : R(e, o))
                                }, function(t) {
                                    n || (n = !0, W(e, t))
                                }, e._label);
                            !n && i && (n = !0, W(e, i))
                        }, e)
                    }(e, t, o) : R(e, t)
                }

                function I(e, t) {
                    var o;
                    e === t ? W(e, new TypeError("You cannot resolve a promise with itself")) : "function" == typeof(o = t) || "object" == typeof o && null !== o ? C(e, t, A(t)) : R(e, t)
                }

                function B(e) {
                    e._onerror && e._onerror(e._result), K(e)
                }

                function R(e, t) {
                    e._state === T && (e._result = t, e._state = L, 0 !== e._subscribers.length && u(K, e))
                }

                function W(e, t) {
                    e._state === T && (e._state = x, e._result = t, u(B, e))
                }

                function U(e, t, o, n) {
                    var i = e._subscribers,
                        r = i.length;
                    e._onerror = null, i[r] = t, i[r + L] = o, i[r + x] = n, 0 === r && e._state && u(K, e)
                }

                function K(e) {
                    var t = e._subscribers,
                        o = e._state;
                    if (0 !== t.length) {
                        for (var n, i, r = e._result, _ = 0; _ < t.length; _ += 3) n = t[_], i = t[_ + o], n ? F(o, n, i, r) : i(r);
                        e._subscribers.length = 0
                    }
                }

                function S() {
                    this.error = null
                }
                var N = new S;

                function F(e, t, o, n) {
                    var i, r, a, c, s = _(o);
                    if (s) {
                        if ((i = function(e, t) {
                                try {
                                    return e(t)
                                } catch (e) {
                                    return N.error = e, N
                                }
                            }(o, n)) === N ? (c = !0, r = i.error, i = null) : a = !0, t === i) return void W(t, new TypeError("A promises callback cannot return that same promise."))
                    } else i = n, a = !0;
                    t._state !== T || (s && a ? I(t, i) : c ? W(t, r) : e === L ? R(t, i) : e === x && W(t, i))
                }
                var q = function(e) {
                    return new Y(this, e).promise
                };
                var H = function(e) {
                    var t = new this(D);
                    if (!s(e)) return W(t, new TypeError("You must pass an array to race.")), t;
                    var o = e.length;

                    function n(e) {
                        I(t, e)
                    }

                    function i(e) {
                        W(t, e)
                    }
                    for (var r = 0; t._state === T && r < o; r++) U(this.resolve(e[r]), void 0, n, i);
                    return t
                };
                var V = function(e) {
                        var t = new this(D);
                        return W(t, e), t
                    },
                    z = 0;
                var G = Q;

                function Q(e) {
                    this._id = z++, this._state = void 0, this._result = void 0, this._subscribers = [], D !== e && ("function" != typeof e && function() {
                        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                    }(), this instanceof Q ? function(e, t) {
                        try {
                            t(function(t) {
                                I(e, t)
                            }, function(t) {
                                W(e, t)
                            })
                        } catch (t) {
                            W(e, t)
                        }
                    }(this, e) : function() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                    }())
                }
                Q.all = q, Q.race = H, Q.resolve = y, Q.reject = V, Q._setScheduler = function(e) {
                    c = e
                }, Q._setAsap = function(e) {
                    u = e
                }, Q._asap = u, Q.prototype = {
                    constructor: Q,
                    then: M,
                    catch: function(e) {
                        return this.then(null, e)
                    }
                };
                var Y = X;

                function X(e, t) {
                    this._instanceConstructor = e, this.promise = new e(D), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? R(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && R(this.promise, this._result))) : W(this.promise, this._validationError())
                }
                X.prototype._validationError = function() {
                    return new Error("Array Methods must be provided an Array")
                }, X.prototype._enumerate = function() {
                    for (var e = this.length, t = this._input, o = 0; this._state === T && o < e; o++) this._eachEntry(t[o], o)
                }, X.prototype._eachEntry = function(e, t) {
                    var o = this._instanceConstructor,
                        n = o.resolve;
                    if (n === y) {
                        var i = A(e);
                        if (i === M && e._state !== T) this._settledAt(e._state, t, e._result);
                        else if ("function" != typeof i) this._remaining--, this._result[t] = e;
                        else if (o === G) {
                            var r = new o(D);
                            C(r, e, i), this._willSettleAt(r, t)
                        } else this._willSettleAt(new o(function(t) {
                            t(e)
                        }), t)
                    } else this._willSettleAt(n(e), t)
                }, X.prototype._settledAt = function(e, t, o) {
                    var n = this.promise;
                    n._state === T && (this._remaining--, e === x ? W(n, o) : this._result[t] = o), 0 === this._remaining && R(n, this._result)
                }, X.prototype._willSettleAt = function(e, t) {
                    var o = this;
                    U(e, void 0, function(e) {
                        o._settledAt(L, t, e)
                    }, function(e) {
                        o._settledAt(x, t, e)
                    })
                };
                var J = function() {
                        var e;
                        if (void 0 !== i) e = i;
                        else if ("undefined" != typeof self) e = self;
                        else try {
                            e = Function("return this")()
                        } catch (e) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                        var t = e.Promise;
                        t && "[object Promise]" === Object.prototype.toString.call(t.resolve()) && !t.cast || (e.Promise = G)
                    },
                    Z = {
                        Promise: G,
                        polyfill: J
                    };
                void 0 === (r = function() {
                    return Z
                }.call(t, o, t, e)) || (e.exports = r), J()
            }).call(this)
        }).call(this, o("8oxB"), o("yLpj"))
    },
    EasH: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return MessageBox
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return showBox
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return showTabbedBox
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return showFastBox
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return showCaptchaBox
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return showReCaptchaBox
        });
        var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("v+DW"),
            _debug_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("98sY"),
            _dom_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Egk5"),
            _ui_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ryw6"),
            _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("zxIV"),
            _fx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7jxN"),
            _utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("t7n3"),
            _lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("4+be"),
            _ajax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("Kngp"),
            _box_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("kcIO"),
            _accessibility__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("QGEU");

        function MessageBox(_options) {
            var defaults = {
                    title: !1,
                    titleControls: "",
                    width: 450,
                    height: "auto",
                    animSpeed: 0,
                    bodyStyle: "",
                    grey: !1,
                    white: !1,
                    selfDestruct: !0,
                    progress: !1,
                    hideOnBGClick: !1,
                    hideButtons: !1,
                    onShow: !1,
                    onHideAttempt: !1,
                    onBeforeHide: !1,
                    onHide: !1,
                    onClean: !1,
                    onDestroy: !1
                },
                options = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.i)(defaults, _options),
                guid = window._message_box_guid++,
                visible = !1,
                btns = {
                    ok: [],
                    cancel: []
                },
                boxTitleBck = void 0;
            options.progress || (options.progress = "box_progress" + guid);
            var controlsStyle = options.hideButtons ? ' style="display: none"' : "",
                boxContainer = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.e)("div", {
                    className: "popup_box_container" + (options.containerClass ? " " + options.containerClass : ""),
                    innerHTML: '\n<div class="box_layout" onclick="boxQueue.skip=true;">\n<div class="box_title_wrap">\n  <div class="box_x_button" aria-label="' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_close") + '" tabindex="0" role="button"></div>\n  <div class="box_title_controls"></div>\n  <div class="box_title"></div>\n</div>\n<div class="box_body" style="' + options.bodyStyle + '"></div>\n<div class="box_controls_wrap" ' + controlsStyle + '><div class="box_controls">\n<table cellspacing="0" cellpadding="0" class="fl_r"><tr></tr></table>\n<div class="progress" id="' + options.progress + '"></div>\n<div class="box_controls_text _box_controls_text">' + (options.textControls || "") + "</div>\n</div></div>\n</div>"
                }, {
                    display: "none"
                });
            Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxContainer);
            var boxLayout = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.u)(boxContainer),
                boxTitleWrap = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.u)(boxLayout),
                boxCloseButton = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.u)(boxTitleWrap),
                boxTitle = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.x)(boxTitleWrap),
                boxTitleControls = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.y)(boxCloseButton);
            options.noCloseButton && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxCloseButton);
            var boxBody = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.y)(boxTitleWrap),
                boxControlsWrap = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.y)(boxBody),
                boxControls = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.u)(boxControlsWrap),
                boxButtons = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.u)(boxControls),
                boxProgress = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.y)(boxButtons),
                boxControlsText = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.y)(boxProgress);
            boxLayer.appendChild(boxContainer), boxContainer.setAttribute("tabindex", 0), boxContainer.focus(), refreshBox(), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxContainer);
            var emitter = new EventEmitter;

            function refreshBox() {
                boxTitleBck || (options.title ? (boxTitle.innerHTML = options.title, Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ha)(boxBody, "box_no_title"), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxTitleWrap)) : (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.a)(boxBody, "box_no_title"), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxTitleWrap))), options.titleControls && (boxTitleControls.innerHTML = options.titleControls), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Va)(boxBody, "box_no_buttons", options.hideButtons), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Va)(boxTitleWrap, "box_grey", options.grey), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Va)(boxTitleWrap, "box_white", options.white), boxContainer.style.width = "string" == typeof options.width ? options.width : options.width + "px", boxContainer.style.height = "string" == typeof options.height ? options.height : options.height + "px"
            }

            function _addButton(e, t, o, n) {
                var i = "flat_button";
                "no" === o || "gray" === o ? (i += " secondary", o = "cancel") : o = "ok";
                var r = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.e)("button", {
                    className: i,
                    innerHTML: e,
                    id: n
                });
                return boxButtons.rows[0].insertCell(0).appendChild(r), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.d)(r, function() {
                    emitter.emit(o, retBox), t.apply(null, arguments)
                }), btns[o].push(r), r
            }

            function setControlsText(e) {
                boxControlsText.innerHTML = e
            }

            function _removeButtons() {
                for (var e = boxButtons.rows[0]; e.cells.length;) Object(_dom__WEBPACK_IMPORTED_MODULE_4__.g)(e.cells[0]), e.deleteCell(0);
                btns.ok.length = btns.cancel.length = 0
            }
            var destroyMe = function() {
                    Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onClean) && options.onClean(), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onDestroy) && options.onDestroy(), _removeButtons(), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.g)(boxContainer, boxCloseButton, boxTitleWrap, boxControlsWrap), boxLayer.removeChild(boxContainer), delete window._message_boxes[guid]
                },
                hideMe = function(e, t, o) {
                    if (visible) {
                        visible = !1;
                        var n = !0 === e ? 0 : options.animSpeed;
                        options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(document, "click", boxQueue.hideBGClick), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onBeforeHide) && options.onBeforeHide();
                        var i = function() {
                            boxQueue.currHiding === _message_boxes[guid] && (boxQueue.currHiding = !1), _message_boxes[guid].shOther || e || layers.boxhide(), !t && options.selfDestruct ? destroyMe() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxContainer), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onHide) && options.onHide(o)
                        };
                        n > 0 ? (boxQueue.currHiding = _message_boxes[guid], Object(_fx__WEBPACK_IMPORTED_MODULE_5__.f)(boxContainer, n, i)) : i()
                    }
                };

            function showMe(e, t, o) {
                if (!visible && window._message_boxes[guid]) {
                    visible = !0;
                    var n = !0 === e || t ? 0 : options.animSpeed;
                    if (options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(document, "click", boxQueue.hideBGClick), t || layers.boxshow(), boxQueue.currHiding) {
                        boxQueue.currHiding.shOther = !0;
                        var i = boxQueue.currHiding.bodyNode.parentNode.parentNode;
                        Object(_dom__WEBPACK_IMPORTED_MODULE_4__.i)(i, "tween").stop(!0)
                    }
                    n > 0 ? Object(_fx__WEBPACK_IMPORTED_MODULE_5__.e)(boxContainer, n) : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxContainer), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxContainer), options.onShow && options.onShow(o)
                }
            }
            Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(boxCloseButton, "click", boxQueue.hideLast);
            var retBox = window._message_boxes[guid] = {
                guid: guid,
                _show: showMe,
                _hide: hideMe,
                bodyNode: boxBody,
                controlsTextNode: boxControlsText,
                titleWrap: boxTitleWrap,
                btns: btns,
                show: function() {
                    return boxQueue._show(guid), this
                },
                progress: boxProgress,
                showCloseProgress: _dom__WEBPACK_IMPORTED_MODULE_4__.a.pbind(boxTitleWrap, "box_loading"),
                hideCloseProgress: _dom__WEBPACK_IMPORTED_MODULE_4__.Ha.pbind(boxTitleWrap, "box_loading"),
                showProgress: function() {
                    Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxControlsText), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxProgress)
                },
                hideProgress: function() {
                    Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxProgress), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxControlsText)
                },
                hide: function(e) {
                    return !(Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(options.onHideAttempt) && !options.onHideAttempt(e)) && (boxQueue._hide(guid), !0)
                },
                isVisible: function() {
                    return visible
                },
                bodyHeight: function() {
                    return Object(_dom__WEBPACK_IMPORTED_MODULE_4__.O)(boxBody, "height")
                },
                content: function(e) {
                    return options.onClean && options.onClean(), boxBody.innerHTML = e, Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxContainer), boxContainer.focus(), refreshBox(), Object(_accessibility__WEBPACK_IMPORTED_MODULE_10__.c)(), this
                },
                emit: function(e, t) {
                    emitter.emit(e, t)
                },
                addButton: function(e, t, o, n, i) {
                    var r = _addButton(e, t || this.hide, o, i);
                    return n ? r : this
                },
                setButtons: function(e, t, o, n) {
                    var i = this.removeButtons();
                    return e ? (i.addButton(e, t), o && i.addButton(o, n, "no"), i) : i.addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("box_close"))
                },
                setControlsText: setControlsText,
                removeButtons: function() {
                    return _removeButtons(), this
                },
                setBackTitle: function(e) {
                    e ? (boxTitle.innerHTML = '<div class="back">' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_box_title_back") + "</div>", Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("back", boxTitle).onclick = e, boxTitleBck = options.title, options.title = boxTitle.innerHTML) : boxTitleBck && (boxTitle.innerHTML = options.title = boxTitleBck, boxTitleBck = !1)
                },
                destroy: destroyMe,
                getOptions: function() {
                    return options
                },
                on: function(e, t) {
                    emitter.on(e, t)
                },
                once: function(e, t) {
                    emitter.once(e, t)
                },
                updateBoxCoords: function() {
                    Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxContainer)
                },
                setOptions: function(e) {
                    if (options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(document, "click", boxQueue.hideBGClick), options = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.i)(options, e), "bodyStyle" in e)
                        for (var t = options.bodyStyle.split(";"), o = 0, n = t.length; o < n; o++) {
                            var i = t[o].split(":");
                            i.length > 1 && i[0].length && (boxBody.style[Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(i[0])] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(i[1]), boxBody.style.setProperty && boxBody.style.setProperty(Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(i[0]), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(i[1]), ""))
                        }
                    return options.hideOnBGClick && Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(document, "click", boxQueue.hideBGClick), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ua)(boxControlsWrap, !options.hideButtons), refreshBox(), options.noRefreshCoords || Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxContainer), this
                },
                evalBox: function evalBox(js, url, params) {
                    var scr = "((function() { return function() { var box = this; " + (js || "") + ";}; })())";
                    if (__debugMode) {
                        var fn = eval(scr);
                        fn.apply(this, [url, params])
                    } else try {
                        var _fn = eval(scr);
                        _fn.apply(this, [url, params])
                    } catch (e) {
                        Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.c)(e, {
                            dt: 15,
                            type: 7,
                            url: url,
                            query: params ? Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.b)(params) : void 0,
                            js: js
                        }), Object(_debug_tools__WEBPACK_IMPORTED_MODULE_1__.d)(e, scr)
                    }
                }
            };
            return retBox
        }

        function showBox(e, t) {
            var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                n = arguments[3];
            if (Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.d)(n)) return !1;
            var i = o.params || {};
            o.containerClass && (i.containerClass = o.containerClass);
            var r = new MessageBox(i),
                _ = {
                    onDone: function(n, _, a, c) {
                        if (o.preOnDone && o.onDone && o.onDone(r), r.isVisible())
                            if (__debugMode) s();
                            else try {
                                s()
                            } catch (o) {
                                Object(_ui_util__WEBPACK_IMPORTED_MODULE_3__.c)(o, {
                                    dt: 15,
                                    type: 103,
                                    url: e,
                                    query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.b)(t),
                                    answer: Array.prototype.slice.call(arguments).join("<!>")
                                }), r.isVisible() && r.hide()
                            } else o.onDone && o.onDone(r, c);

                        function s() {
                            Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.a)(bodyNode, "layers_shown"), r.setOptions({
                                title: n,
                                hideButtons: i.hideButtons || !1
                            }), o.showProgress ? r.show() : Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(r.bodyNode), r.content(_), r.evalBox(a, e, t), o.onDone && o.onDone(r, c)
                        }
                    },
                    onFail: function(e) {
                        if (r.failed = !0, setTimeout(r.hide, 0), Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.v)(o.onFail)) return o.onFail(e)
                    },
                    cache: o.cache,
                    stat: o.stat,
                    fromBox: !0
                };
            return o.prgEl && (o.showProgress = _ui_util__WEBPACK_IMPORTED_MODULE_3__.a.pbind(o.prgEl, {
                cls: o.prgClass,
                w: o.prgW,
                h: o.prgH,
                hide: !0
            }), o.hideProgress = _dom__WEBPACK_IMPORTED_MODULE_4__.W.pbind("global_prg")), o.showProgress ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.i)(_, {
                showProgress: o.showProgress,
                hideProgress: o.hideProgress
            }) : (r.setOptions({
                title: !1,
                hideButtons: !0
            }).show(), boxQueue.count() < 2 && (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(boxLayerBG), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ha)(bodyNode, "layers_shown")), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(r.bodyNode), _.showProgress = function() {
                Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxLoader), Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.a)(boxLoader)
            }, _.hideProgress = _dom__WEBPACK_IMPORTED_MODULE_4__.W.pbind(boxLoader)), r.removeButtons().addButton(Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_close")), ajax.post(e, t, _), r
        }

        function showTabbedBox(e, t, o, n) {
            return (o = o || {}).stat = o.stat || [], o.stat.push("box.js", "boxes.css"), showBox(e, t, o, n)
        }

        function showFastBox(e, t, o, n, i, r) {
            return new MessageBox("string" == typeof e ? {
                title: e
            } : e).content(t).setButtons(o, n, i, r).show()
        }

        function showCaptchaBox(e, t, o, n) {
            var i = function(t) {
                    if (!t || void 0 === t.keyCode || 10 === t.keyCode || 13 === t.keyCode) {
                        var i = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("input", o.bodyNode);
                        if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.H)(i.value) || !0 === t) {
                            var r = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("img", o.bodyNode)[0];
                            Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(i), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(r), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("progress", o.bodyNode)), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(i), n.onSubmit(e, i.value)
                        } else Object(_dom__WEBPACK_IMPORTED_MODULE_4__.E)(i)
                    }
                },
                r = !!o,
                _ = Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.r)(t) ? "" : "&s=1",
                a = n.imgSrc || "/captcha.php?sid=" + e + _;
            if (!r) {
                var c = '\n<div class="captcha">\n  <div><img src="' + a + '"/></div>\n  <div>\n    <input type="text" class="big_text" maxlength="7" placeholder="' + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_captcha_input_here") + '" />\n    <div class="progress" /></div>\n  </div>\n</div>' + (n.addText || "");
                o = showFastBox({
                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_enter_code"),
                    width: 305,
                    onHide: n.onHide,
                    onDestroy: n.onDestroy || !1
                }, c, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_send"), function() {
                    o.submit()
                }, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_cancel"), function() {
                    var e = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("input", o.bodyNode),
                        t = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("img", o.bodyNode);
                    Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(e), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.h)(t), o.hide()
                })
            }
            o.submit = i.pbind(!0), o.changed = !0;
            var s = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("input", o.bodyNode),
                d = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.J)("img", o.bodyNode);
            return r && (s.value = "", d.src = "/captcha.php?sid=" + e + _, Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("progress", o.bodyNode))), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(s), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(s, "keypress", i), Object(_dom_events__WEBPACK_IMPORTED_MODULE_2__.b)(d, "click", function() {
                this.src = "/captcha.php?sid=" + e + _ + "&v=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_6__.s)(1e6, 2e6)
            }), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.E)(s), o
        }

        function showReCaptchaBox(e, t, o, n) {
            window.recaptchaResponse = function(e) {
                n.onSubmit(e)
            };
            var i = !!o,
                r = !!window.grecaptcha;
            if (!i) {
                r || (window.recaptchaCallback = function() {
                    var t = Object(_box_utils__WEBPACK_IMPORTED_MODULE_9__.b)();
                    if (t) {
                        var o = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("recaptcha", t.bodyNode);
                        o && (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ya)(o, ""), window.grecaptcha.render(o, {
                            sitekey: e,
                            callback: window.recaptchaResponse
                        }))
                    }
                }, headNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.e)("script", {
                    type: "text/javascript",
                    src: "https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit&hl=" + t
                })));
                var _ = '<div class="recaptcha"></div>' + (n.addText || "");
                o = showFastBox({
                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_recaptcha_title"),
                    width: 354,
                    onHide: n.onHide,
                    onDestroy: n.onDestroy || !1
                }, _, Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("captcha_cancel"));
                var a = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.H)("recaptcha", o.bodyNode);
                a.id = "recaptcha" + (o.guid ? o.guid : "0"), Object(_ui__WEBPACK_IMPORTED_MODULE_0__.u)(a)
            }
            return i && r ? window.grecaptcha.reset() : r && window.recaptchaCallback(), o.changed = !0, o
        }
    },
    EemH: function(e, t, o) {
        var n = o("UqcF"),
            i = o("RjD/"),
            r = o("aCFj"),
            _ = o("apmT"),
            a = o("aagx"),
            c = o("xpql"),
            s = Object.getOwnPropertyDescriptor;
        t.f = o("nh4g") ? s : function(e, t) {
            if (e = r(e), t = _(t, !0), c) try {
                return s(e, t)
            } catch (e) {}
            if (a(e, t)) return i(!n.f.call(e, t), e[t])
        }
    },
    El3O: function(e, t, o) {
        "use strict";
        o.d(t, "d", function() {
            return h
        }), o.d(t, "m", function() {
            return w
        }), o.d(t, "c", function() {
            return O
        }), o.d(t, "l", function() {
            return m
        }), o.d(t, "k", function() {
            return v
        }), o.d(t, "j", function() {
            return E
        }), o.d(t, "i", function() {
            return g
        }), o.d(t, "h", function() {
            return j
        }), o.d(t, "g", function() {
            return P
        }), o.d(t, "b", function() {
            return M
        }), o.d(t, "a", function() {
            return y
        }), o.d(t, "f", function() {
            return D
        }), o.d(t, "e", function() {
            return T
        });
        var n = o("t7n3"),
            i = o("zxIV"),
            r = o("lXE5"),
            _ = o("kHqu"),
            a = o("v+DW"),
            c = o("m0N1"),
            s = o("7jxN"),
            d = o("Egk5"),
            u = o("i6oL"),
            l = o("gdug"),
            p = o("ErRf"),
            b = o("/PiP"),
            f = void 0;

        function h() {
            var e = Object(i.F)("page_header");
            return f = f || (e ? e.offsetHeight : 0)
        }

        function w() {
            cur.__narrowBar = cur.__narrowBar || {}, cur.__narrowBar.bar = cur.__narrowBar.bar || Object(i.F)("narrow_column"), cur.__narrowBar.barBlock = cur.__narrowBar.bar && Object(i.H)("page_block", cur.__narrowBar.bar), cur.__narrowBar.wideCol = cur.__narrowBar.wideCol || Object(i.F)("wide_column"), cur.__narrowBar.isBarFixed = cur.__narrowBar.isBarFixed || "fixed" === Object(i.O)(cur.__narrowBar.bar, "position"), cur.__narrowBar.pl = cur.__narrowBar.pl || Object(i.F)("page_layout");
            var e = cur.__narrowBar.bar,
                t = cur.__narrowBar.barBlock,
                o = cur.__narrowBar.wideCol,
                _ = Object(r.e)();
            if (!l.a.mobile && e && t && o && !Object(i.Aa)(boxLoader) && !Object(i.Aa)(boxLayerBG) && !Object(i.Aa)(layerBG)) {
                var a = window.lastWindowHeight || 0,
                    c = Math.min(_, bodyNode.clientHeight - a),
                    s = cur.__narrowBar.pl,
                    d = vk.staticheader ? Math.max(0, h() - c) : h(),
                    u = cur.__narrowBar.isBarFixed,
                    p = Object(n.k)(Object(i.O)(cur.__narrowBar.barBlock, "marginTop")),
                    b = Object(i.N)(e)[1] - (u ? p : 0),
                    f = Object(i.N)(o)[1],
                    w = Object(i.Q)(o)[1],
                    O = b >= f - p,
                    m = p,
                    v = c + a - f - w - m,
                    E = Math.max(0, v),
                    g = w - d,
                    j = Object(i.Q)(e)[1] + (u ? p : 0),
                    P = cur.__narrowBar.lastSt || 0,
                    M = cur.__narrowBar.lastStyles || {},
                    y = d + m + b + p + E <= a && !cur.narrowHide,
                    D = !1,
                    T = void 0;
                c - 1 < g && !(y && l.a.msie && j < d + p) || O ? T = {
                        marginTop: 0
                    } : c - 1 < Math.min(P, j - d - p) || y ? (T = {
                        top: d,
                        marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - Object(i.N)(s)[0]))
                    }, D = !0) : c + 1 > Math.max(P, j + b + m - a) && v < 0 && !cur.narrowHide || cur.narrowHide && c + 1 > Math.max(P, j + b - d) ? (T = {
                        bottom: cur.narrowHide ? a - d : m,
                        marginLeft: Math.min(-bodyNode.scrollLeft, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - Object(i.N)(s)[0]))
                    }, D = !0) : T = {
                        marginTop: v >= 0 ? f - b : Math.min(j - w, f - b + g)
                    },
                    function(e, t) {
                        var o = Object(n.d)(e),
                            i = Object(n.d)(t);
                        return Object(n.f)(o, function(e, t) {
                            "position" !== e && (o[e] = Math.round(t))
                        }), Object(n.f)(i, function(e, t) {
                            "position" !== e && (i[e] = Math.round(t))
                        }), JSON.stringify(o) === JSON.stringify(i)
                    }(T, M) || (Object(n.f)(M, function(e) {
                        M[e] = null
                    }), Object(i.Qa)(e, Object(n.i)(M, T)), cur.__narrowBar.lastStyles = T), D !== u && Object(i.Va)(e, "fixed", D), cur.__narrowBar.lastSt = c, cur.__narrowBar.isBarFixed = D
            }
        }

        function O() {
            var e = Object(i.F)("content");
            e && (Object(i.Va)(e, "page_block", !Object(i.H)("page_block", e)), window.updateAriaElements())
        }

        function m(e, t) {
            e && "fixed" === Object(i.O)(e, "position") && (t ? Object(i.Ha)(e, t) : Object(i.Qa)(e, {
                position: "relative"
            }), e.offsetLeft, t ? Object(i.a)(e, t) : Object(i.Qa)(e, {
                position: "fixed"
            }))
        }

        function v() {
            if (window.pageNode) {
                var e = Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - Object(i.N)(Object(i.F)("page_layout"))[0]));
                l.a.mobile || vk.staticheader || Object(_.j)({
                    marginLeft: e
                }), Object(_.k)(), w(), Object(a.y)()
            }
        }

        function E(e) {
            if (window.pageNode) {
                var t = document.documentElement,
                    o = t.clientWidth,
                    r = t.clientHeight,
                    s = Object(a.t)(),
                    d = Math.max(Object(n.r)(window.innerWidth), Object(n.r)(o)),
                    p = Math.max(Object(n.r)(window.innerHeight), Object(n.r)(r)),
                    f = !1;
                if (l.a.mobile && (d = Math.max(d, Object(n.r)(bodyNode.scrollWidth)), p = Math.max(p, Object(n.r)(bodyNode.scrollHeight))), window.lastWindowWidth !== d || !0 === e) {
                    f = !0, window.lastInnerWidth = window.lastWindowWidth = d, layerWrap.style.width = boxLayerWrap.style.width = d + "px";
                    var h = layer.style.width = boxLayer.style.width = d - s - 2 + "px";
                    if (window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.width = d + "px", mvLayer.style.width = h), window.wkLayerWrap && (wkLayerWrap.style.width = d + "px", wkLayer.style.width = h), bodyNode.offsetWidth < vk.width + s + 2 && (d = vk.width + s + 2), d)
                        for (var O = pageNode.firstChild; O; O = O.nextSibling)
                            if (O.tagName) {
                                for (var v = (window.lastInnerWidth = d - s - 1) - 1, E = O.firstChild; E; E = E.nextSibling) "scroll_fix" === E.className && (E.style.width = v + "px");
                                vk.staticheader || Object(_.j)({
                                    width: v
                                })
                            }
                }
                if ((window.lastWindowHeight !== p || !0 === e) && (f = !0, window.lastWindowHeight = p, layerBG.style.height = boxLayerBG.style.height = layerWrap.style.height = boxLayerWrap.style.height = p + "px", window.mvLayerWrap && !mvcur.minimized && (mvLayerWrap.style.height = p + "px"), window.wkLayerWrap)) {
                    var g = l.a.mobile ? window.innerHeight : p;
                    wkLayerWrap.style.height = g + "px"
                }
                if (vk.noSideTop || Object(a.y)(1), f && window.curRBox && window.curRBox.boxes && window.getWndInner) {
                    var j = getWndInner();
                    Object(n.f)(curRBox.boxes, function(e, t) {
                        return t._wnd_resize(j[0], j[1])
                    })
                }
                setTimeout(c.c, 0);
                var P = Object(b.j)();
                P.audioLayer && P.audioLayer.isShown() && P.audioLayer.updatePosition(), cur.pvShown && window.Photoview && setTimeout(Photoview.updatePhotoDimensions), window.tooltips && tooltips.rePositionAll(), cur.lSTL && Object(i.Qa)(cur.lSTL, {
                    width: Math.max(Object(i.Q)(cur.lSTL.el)[0], 0),
                    height: p - 1
                }), Object(i.F)("dev_top_nav") && Object(i.Qa)(Object(i.F)("dev_top_nav", "left", null));
                var M = Object(i.G)("ui_search_fixed"),
                    y = Object(i.F)("narrow_column");
                Object(n.f)(M, function() {
                    m(this, "ui_search_fixed"), setTimeout(m.pbind(this, "ui_search_fixed"), 0)
                }), y && (m(y, "fixed"), setTimeout(m.pbind(y, "fixed"), 0)), Object(_.k)(), w(), Object(u.b)()
            }
        }

        function g(e) {
            var t = 1;
            e.id || (e = Object(i.F)("left_hide" + e), t = 0), !t && e.timer || (e.showing ? Object(i.Ga)(e, "showing") : (Object(s.b)(e, {
                opacity: t ? 1 : .5
            }, 200), t && (e.showing = 1))), e.timer && (clearTimeout(e.timer), Object(i.Ga)(e, "timer"))
        }

        function j(e) {
            var t = .5;
            e.id || (e = Object(i.F)("left_hide" + e), t = 0), e.timer = setTimeout(function() {
                Object(s.b)(e, {
                    opacity: t
                }, 200), Object(i.Ga)(e, "timer")
            }, 1)
        }

        function P(e, t, o) {
            var n = {
                act: "hide_block",
                block: e,
                hash: t
            };
            o && (n.block = o), ajax.post("al_index.php", n, {
                onDone: c.c
            }), Object(i.W)("left_block" + e)
        }

        function M(e, t) {
            if (e = Object(i.F)(e))
                if (e.autosize) e.autosize.update();
                else {
                    t.minHeight = Object(n.r)(t.minHeight) || Object(n.r)(Object(i.O)(e, "height")), t.maxHeight = Object(n.r)(t.maxHeight);
                    var o = Object(i.N)(e)[0] || Object(n.r)(Object(i.O)(e, "width")),
                        r = Object(i.O)(e, "fontSize"),
                        _ = Object(i.O)(e, "lineHeight");
                    o < 1 && (o = Object(n.r)(Object(i.O)(e, "width", !1))), r.indexOf("em") > 0 && (r = Object(n.k)(r) * vk.fs), r = Object(n.r)(r);
                    var a = {
                        width: o,
                        height: 10,
                        fontFamily: Object(i.O)(e, "fontFamily"),
                        fontSize: r + "px",
                        lineHeight: _,
                        boxSizing: Object(i.O)(e, "boxSizing")
                    };
                    Object(n.f)(["Top", "Bottom", "Left", "Right"], function() {
                        a["padding" + this] = Object(i.O)(e, "padding" + this)
                    }), e.autosize = {
                        options: t,
                        helper: Object(i.e)("textarea", {
                            className: "ashelper"
                        }, a),
                        handleEvent: function(t, o) {
                            var n = o.charCode ? String.fromCharCode(o.charCode) : o.charCode;
                            if (void 0 === n && (n = String.fromCharCode(o.keyCode), 10 === o.keyCode || 13 === o.keyCode ? n = "\n" : !l.a.msie && o.keyCode <= 40 && (n = "")), !n) return t;
                            if (!l.a.msie) return t.substr(0, e.selectionStart) + n + t.substr(e.selectionEnd);
                            var i = document.selection.createRange();
                            return i.text && (t = t.replace(i.text, "")), t + n
                        },
                        update: function(t) {
                            var o = e.value;
                            !t || "blur" === t.type || "keyup" === t.type || l.a.msie && "keypress" !== t.type || t.ctrlKey || t.altKey || t.metaKey || (o = e.autosize.handleEvent(o, t)), o || (o = " "), e.autosize.helper.value !== o && (e.autosize.helper.value = o);
                            var r = e.autosize.options,
                                a = Object(i.N)(e, !0)[1],
                                c = e.autosize.helper.scrollHeight,
                                s = c % _;
                            r.exact && s > 2 && (c -= s - 2), c < r.minHeight && (c = r.minHeight);
                            var d = {
                                    overflow: "hidden"
                                },
                                u = Object(i.O)(e, "overflow").indexOf("auto") > -1 ? "auto" : "hidden";
                            r.maxHeight && c > r.maxHeight && (c = r.maxHeight, Object(n.i)(d, {
                                overflow: "auto",
                                overflowX: "hidden"
                            })), r.addHeight && (c += r.addHeight), a === c && u === d.overflow || (d.height = c, Object(i.Qa)(e, d), Object(n.v)(r.onResize) && r.onResize(c))
                        }
                    }, t.exact && ("normal" === _ && (_ = "120%"), _.indexOf("%") > 0 && (_ = r * Object(n.r)(_) / 100)), utilsNode.appendChild(e.autosize.helper), l.a.opera_mobile ? (Object(i.Qa)(e, {
                        overflow: "hidden"
                    }), e.autosize.update(), Object(d.b)(e, "blur", e.autosize.update)) : (Object(d.b)(e, "keydown keyup keypress change", e.autosize.update), setTimeout(function() {
                        Object(i.Qa)(e, {
                            overflow: "hidden",
                            resize: "none"
                        }), e.autosize.update();
                        var t = Object(i.Ya)(e);
                        Object(i.Ya)(e, " ", !0), Object(i.Ya)(e, t, !0)
                    }, 0))
                }
        }
        var y = {
            init: function() {
                if (this.inited) return !1;
                var e = Object(i.F)("top_profile_link"),
                    t = Object(i.F)("top_profile_menu");
                if (!e || !t) return !1;
                Object(d.b)(e, "mousedown", y.clicked), this.inited = !0
            },
            clicked: function(e) {
                return !(Object(d.d)(e) || "mousedown" === e.type && Object(d.e)(e)) && (y.toggle(), !1)
            },
            toggle: function(e) {
                var t = Object(i.F)("top_profile_link"),
                    o = Object(i.F)("top_profile_menu"),
                    n = Object(i.V)(o, "shown");
                void 0 !== e && n === e || (void 0 === e && (e = !n), Object(i.Va)(t, "active", e), Object(i.Va)(o, "shown", e), e ? (Object(p.c)("top_menu", y.toggle.bind(this, !1), !0), cur.introExitTooltipHide && (cur.introExitTooltipHide(), delete cur.introExitTooltipHide)) : Object(p.a)("top_menu", !0))
            },
            show: function() {
                y.hidetimer && (clearTimeout(y.hidetimer), y.hidetimer = 0), y.toggle(!0)
            },
            hide: function() {
                y.hidetimer || (y.hidetimer = setTimeout(function() {
                    y.toggle(!1), y.hidetimer = 0
                }, 200))
            },
            select: function(e, t) {
                return !!Object(d.d)(t) || (y.toggle(!1), nav.go(e, t, {
                    noback: !0
                }))
            }
        };

        function D(e, t) {
            return Object(i.La)(vk.pr_tpl, {
                id: e || "",
                cls: t || ""
            })
        }

        function T(e) {
            return Object(i.H)("ui_progress_bar", e)
        }
    },
    ErRf: function(e, t, o) {
        "use strict";
        o.d(t, "a", function() {
            return i
        }), o.d(t, "c", function() {
            return r
        }), o.d(t, "b", function() {
            return _
        });
        var n = o("Bszp");

        function i(e, t) {
            var o = window.cancelStack || [];
            return t && Object(n.b)(), window.cancelStack = o.filter(function(t) {
                return t.name !== e
            }), window.cancelStack
        }

        function r(e, t, o) {
            return o && Object(n.c)(function() {
                t(), i(e)
            }), window.cancelStack = i(e).concat([{
                func: t,
                name: e,
                dclick: o
            }]), window.cancelStack
        }

        function _() {
            var e = window.cancelStack || [];
            Object(n.b)(), e.length > 0 && e.pop().func();
            var t = e[e.length - 1];
            return t && t.dclick && Object(n.c)(function() {
                t.func(), i(t.name)
            }), window.cancelStack = e, window.cancelStack
        }
    },
    FJW5: function(e, t, o) {
        var n = o("hswa"),
            i = o("y3w9"),
            r = o("DVgA");
        e.exports = o("nh4g") ? Object.defineProperties : function(e, t) {
            i(e);
            for (var o, _ = r(t), a = _.length, c = 0; a > c;) n.f(e, o = _[c++], t[o]);
            return e
        }
    },
    FWc3: function(e, t, o) {
        "use strict";
        o.d(t, "c", function() {
            return _
        }), o.d(t, "b", function() {
            return a
        }), o.d(t, "a", function() {
            return c
        });
        var n = o("zxIV"),
            i = o("Egk5"),
            r = o("t7n3");

        function _(e, t) {
            (vk.loaded || t.noload) && e && (e.temphide || (e.temphide = function() {
                e.showing = !1
            }, Object(i.b)(e, "mouseout", e.temphide)), e.showing = !0, "loadingstat" !== e.tt && (e.tt || (e.tt = "loadingstat"), Object(n.n)("fc_tab", e) && (t.appendEl = bodyNode), cur.cancelTooltip = !1, t.stat && stManager.add(t.stat), stManager.add(["tooltips.js", "tooltips.css"], function() {
                "loadingstat" === e.tt && (e.tt = !1), e.showing && !cur.cancelTooltip && (! function(e) {
                    e.temphide && (Object(i.h)(e, "mouseout", e.temphide), Object(n.Ga)(e, "temphide"), Object(n.Ga)(e, "showing"))
                }(e), e.tt && e.tt.el && !t.force || (tooltips.create(e, t), t.onCreate && t.onCreate()), tooltips.show(e, t))
            })))
        }

        function a(e, t, o, i) {
            e = Object(n.F)(e);
            o || (o = [Math.round(20 - Object(n.N)(e)[0] / 2), 8]);
            _(e, Object(r.i)({
                text: function() {
                    return t || e.getAttribute("data-title")
                },
                shift: o,
                black: 1
            }, i || {}))
        }

        function c(e, t) {
            e = Object(n.F)(e), t = t || {};
            _(e, Object(r.i)({
                text: function() {
                    return e.getAttribute("data-title")
                },
                dir: "auto",
                width: 300,
                shift: [22, 8]
            }, t))
        }
    },
    H6hf: function(e, t, o) {
        var n = o("y3w9");
        e.exports = function(e, t, o, i) {
            try {
                return i ? t(n(o)[0], o[1]) : t(o)
            } catch (t) {
                var r = e.return;
                throw void 0 !== r && n(r.call(e)), t
            }
        }
    },
    HhI8: function(e, t, o) {
        "use strict";
        o.d(t, "a", function() {
            return s
        }), o.d(t, "c", function() {
            return u
        }), o.d(t, "b", function() {
            return l
        });
        var n = o("t7n3"),
            i = o("zxIV"),
            r = o("Egk5"),
            _ = o("kMSP"),
            a = o("gdug"),
            c = o("Kngp");

        function s() {
            var e = "ShockwaveFlash.ShockwaveFlash",
                t = [0, 0, 0],
                o = "embed",
                i = 'type="application/x-shockwave-flash" ',
                r = function(e) {
                    return e.toString().replace("&", "&amp;").replace('"', "&quot;")
                };
            if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
                var c = navigator.plugins["Shockwave Flash"];
                if (c && c.description)
                    for (var s = c.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."), d = 0; d < 3; ++d) t[d] = s[d] || 0
            } else {
                if (_ua.indexOf("Windows CE") >= 0)
                    for (var u = !0, l = 6; u;) try {
                        ++l, u = new ActiveXObject(e + "." + l), t[0] = l
                    } catch (e) {} else try {
                        t = new ActiveXObject(e + ".7").GetVariable("$version").split(" ")[1].split(",")
                    } catch (e) {}
                o = "object", i = 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
            }
            a.a.flashwrap = "embed" === o ? function(e, t) {
                t = Object(n.i)({
                    id: e.id,
                    name: e.id,
                    width: e.width,
                    height: e.height,
                    style: e.style,
                    preventhide: e.preventhide
                }, t), a.a.flash >= e.version ? t.src = e.url : t.src = e.express;
                var o = [];
                for (var _ in t)
                    if (t.hasOwnProperty(_)) {
                        var c = t[_];
                        void 0 !== c && null !== c && o.push(_ + '="' + r(c) + '" ')
                    }
                return "<embed " + (i + o.join("")) + "/>"
            } : function(e, t) {
                a.a.flash >= e.version ? t.movie = e.url : t.movie = e.express;
                var o = {
                        id: e.id,
                        width: e.width,
                        height: e.height,
                        style: e.style,
                        preventhide: e.preventhide
                    },
                    n = [];
                for (var _ in o)
                    if (o.hasOwnProperty(_)) {
                        var c = o[_];
                        void 0 !== c && null !== c && n.push(_ + '="' + r(c) + '" ')
                    }
                var s = [];
                for (var d in t)
                    if (t.hasOwnProperty(d)) {
                        var u = t[d];
                        void 0 !== u && null !== u && s.push('<param name="' + d + '" value="' + r(u) + '" />')
                    }
                return "<object " + (i + n.join("")) + ">" + s.join("") + "</object>"
            }, t[0] < 7 && (t = [0, 0, 0]), a.a.flash = Object(n.r)(t[0]), a.a.flashfull = {
                major: a.a.flash,
                minor: Object(n.r)(t[1]),
                rev: Object(n.r)(t[2])
            }, Object(_.d)("remixflash", Object(n.r)(t[0]) + "." + Object(n.r)(t[1]) + "." + Object(n.r)(t[2]), 30)
        }
        var d = 0;

        function u(e, t) {
            if (clearTimeout(d), t > 0) d = setTimeout(function() {
                return u(e, 0)
            }, t);
            else {
                var o = e ? "visible" : "hidden";
                Object(r.j)(document, e ? "unblock" : "block");
                var _ = function(t, n) {
                    n.getAttribute("preventhide") || "internal/link" === n.getAttribute("type") || ("flash_app" === n.id && a.a.msie ? e ? Object(i.Qa)(n, {
                        position: "static",
                        top: 0
                    }) : Object(i.Qa)(n, {
                        position: "absolute",
                        top: "-5000px"
                    }) : n.style.visibility = o)
                };
                Object(n.f)(Object(i.I)("embed"), _), Object(n.f)(Object(i.I)("object"), _)
            }
        }

        function l(e, t, o, r) {
            if (!t.url || !t.id) return !1;
            var _ = (t = Object(n.i)({
                version: 9,
                width: 1,
                height: 1
            }, t)).url;
            return stVersions[_] || (stVersions[_] = ""), __debugMode && stVersions[_] < 1e6 && (stVersions[_] += Object(n.s)(1e6, 2e6)), stVersions[_] && (t.url += (-1 === t.url.indexOf("?") ? "?" : "&") + "_stV=" + stVersions[_]), o = Object(n.i)({
                quality: "high",
                flashvars: Object(c.b)(r)
            }, o), !(a.a.flash < t.version) && (Object(i.F)(e).innerHTML = a.a.flashwrap(t, o), !0)
        }
    },
    "I8a+": function(e, t, o) {
        var n = o("LZWt"),
            i = o("K0xU")("toStringTag"),
            r = "Arguments" == n(function() {
                return arguments
            }());
        e.exports = function(e) {
            var t, o, _;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(o = function(e, t) {
                try {
                    return e[t]
                } catch (e) {}
            }(t = Object(e), i)) ? o : r ? n(t) : "Object" == (_ = n(t)) && "function" == typeof t.callee ? "Arguments" : _
        }
    },
    Ia1d: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "j", function() {
            return showVideo
        }), __webpack_require__.d(__webpack_exports__, "i", function() {
            return showInlineVideo
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return loadInlineVideo
        }), __webpack_require__.d(__webpack_exports__, "h", function() {
            return revertLastInlineVideo
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return destroyInlineVideoPlayer
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return pauseLastInlineVideo
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return playLastInlineVideo
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return checkMp4
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return VideoConstants
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return initVideo
        });
        var _videoplayer_lib_player_states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("qOki"),
            _dom_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Egk5"),
            _utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("t7n3"),
            _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("zxIV"),
            _lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4+be"),
            _message_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("EasH"),
            _layout_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("El3O"),
            _browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("gdug"),
            _ls__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("0DAA");

        function showVideo(e, t, o, n) {
            if (cur.viewAsBox) return cur.viewAsBox();
            if (!Object(_dom_events__WEBPACK_IMPORTED_MODULE_1__.d)(n)) {
                if (window.mvcur && mvcur.mvShown && mvcur.minimized && mvcur.videoRaw == e) return Videoview.unminimize(), !1;
                o || (o = {});
                var i = nav.objLoc.claim,
                    r = !(!o.addParams || !/^-?\d+_\d+$/.test(o.addParams.post_id)) && o.addParams.post_id;
                if (!o.playlistId && r && (/^public|groups|profile$/.test(cur.module) && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.V)("post" + r, "own") ? o.playlistId = "wall_" + cur.oid : o.playlistId = "post_" + o.addParams.post_id), o.playlistId && (o.addParams = Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.i)(o.addParams, {
                        playlist_id: o.playlistId
                    }), !window.VideoPlaylist || !VideoPlaylist.getList(o.playlistId)))
                    if (/^wall_/.test(o.playlistId)) {
                        var _ = cur.wallVideos && cur.wallVideos[o.playlistId];
                        o.addParams.load_playlist = _ && _.list.length >= 50 ? 0 : 1
                    } else o.addParams.load_playlist = !/^(?:post_)?-?\d+_-?\d+$/.test(o.playlistId) || cur.pageVideosList && cur.pageVideosList[o.playlistId] ? 0 : 1;
                !o.expandPlayer && cur.videoInlinePlayer && cur.videoInlinePlayer.getVideoId() == e && cur.videoInlinePlayer.canExpand() && (o.expandPlayer = cur.videoInlinePlayer), o.expandPlayer && (o.addParams = Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.i)(o.addParams, {
                    expand_player: 1
                }), delete cur.videoInlinePlayer);
                var a = new CallHub(function() {
                    o.hidden ? o.hidden(a.data, o, t, e) : Videoview.showVideo.apply(Videoview, a.data)
                }, 2);
                stManager.add(["videoview.js", "videoview.css", "page.js", "page.css"], function() {
                    a.failed || (o.hidden || (revertLastInlineVideo(), Videoview.show(n, e, t, o)), a.done())
                }), Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.i)(o, {
                    onDone: function() {
                        var t = Array.prototype.slice.call(arguments);
                        t.unshift(e), a.data = t, a.done()
                    },
                    onFail: function(t) {
                        if (a.failed = 1, !o.hidden) {
                            if (window.mvcur && mvcur.mvShown) Videoview.hide();
                            else {
                                var n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.d)(nav.objLoc);
                                n.z == "video" + e && delete n.z, n[0] == "video" + e && (n[0] = "videos" + e.split("_")[0]), nav.setLoc(n)
                            }
                            Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.d)(Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_error"), t || Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_error_occured"))
                        }
                        return !0
                    },
                    cache: "status" != t
                });
                var c = o.params;
                return c || (c = {
                    act: "show",
                    video: e,
                    list: t,
                    autoplay: o.autoplay ? 1 : 0,
                    ad_video: o.ad_video,
                    module: o.module || currentModule() || "",
                    svids: o.svids
                }), o.addParams && (c = Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.i)(c, o.addParams)), Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.H)(c.module) || Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.i)(c, {
                    _nol: JSON.stringify(nav.objLoc)
                }), i && (c.claim = i), ajax.post("al_video.php", c, o), Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.J)().src = locProtocol + "//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-", window.isArticleLayerOpen() && ArticleLayer.videoOpened(), !1
            }
        }

        function showInlineVideo(videoId, listId, options, ev, thumb) {
            if (Object(_dom_events__WEBPACK_IMPORTED_MODULE_1__.d)(ev)) return !0;
            if (window.mvcur && mvcur.mvShown) return showVideo(videoId, listId, options, ev);
            if (Object(_dom__WEBPACK_IMPORTED_MODULE_3__.c)(thumb, "data-loading")) return !1;
            options = options || {};
            var h = thumb.clientHeight,
                w = thumb.clientWidth,
                btn = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.j)(thumb, "page_post_video_play_inline"),
                onLoaded = options.onLoaded;
            onLoaded && delete options.onLoaded;
            var params = {
                video: videoId,
                list: listId,
                autoplay: options.autoplay,
                module: options.module
            };
            return Object(_dom__WEBPACK_IMPORTED_MODULE_3__.s)(thumb, "stretch-vertical") && (params.stretch_vertical = 1), Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.i)(params, options.addParams), showProgress(), loadInlineVideo(params, function(e, t) {
                hideProgress(), e ? onDone.apply(null, t) : onFail.apply(null, t)
            }, options.cache), cur.videoInlinePlayerDestroyerSet || (cur.destroy.push(destroyInlineVideoPlayer), cur.videoInlinePlayerDestroyerSet = 1), Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.J)().src = "//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-", !1;

            function onDone(title, html, js, opts) {
                revertLastInlineVideo(), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(thumb);
                var videoWrap = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.e)("div", {
                    innerHTML: html,
                    className: "inline_video_wrap"
                }, {
                    width: w,
                    height: h
                });
                if (window._videoLastInlined = [videoWrap, thumb], thumb.parentNode.appendChild(videoWrap), cur.mvOpts = !(!opts || !opts.mvData) && opts.mvData, opts.player) {
                    var container = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.j)(videoWrap, "video_box_wrap");
                    Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.v)(onLoaded) && (opts.player.params[0].onPlayerLoaded = onLoaded);
                    var linkAttr = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.c)(thumb, "data-link-attr");
                    linkAttr && (opts.player.params[0].link_attr = linkAttr), VideoInitializer.initPlayer(container, opts.player.type, opts.player.params)
                }
                try {
                    eval("(function () {" + js + "})();")
                } catch (e) {}
                if (!params.from_autoplay) {
                    var notifier = window.Notifier;
                    notifier && setTimeout(function() {
                        return notifier.lcSend("video_start")
                    }, 0);
                    var audioPlayer = window.ap;
                    audioPlayer && audioPlayer.isPlaying() && (audioPlayer.pause(), audioPlayer.pausedByVideo = Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.L)())
                }
                thumb.setAttribute("data-playing", 1)
            }

            function onFail(e) {
                params.from_autoplay || Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.d)(Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_error"), e || Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_error_occured"))
            }

            function showProgress() {
                thumb.setAttribute("data-loading", 1), options.no_progress || (Object(_dom__WEBPACK_IMPORTED_MODULE_3__.a)(btn, "page_post_video_play_inline_loading"), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ya)(btn, Object(_layout_utils__WEBPACK_IMPORTED_MODULE_6__.f)()))
            }

            function hideProgress() {
                thumb.removeAttribute("data-loading"), options.no_progress || (Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ha)(btn, "page_post_video_play_inline_loading"), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ya)(btn, ""))
            }
        }

        function loadInlineVideo(e, t, o) {
            var n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.i)({
                autoplay: 0,
                module: cur.module
            }, e);
            Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.H)(n.module) || (n._nol = JSON.stringify(nav.objLoc));
            var i = ["videoview.js", "videoview.css"];

            function r(e, o) {
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.v)(t) && t(e, o)
            }
            n.from_autoplay && i.push("videoplayer.js", "videoplayer.css", "hls.min.js"), ajax.post("al_video.php?act=show_inline", n, {
                onDone: function() {
                    r(!0, [].slice.call(arguments))
                },
                onFail: function() {
                    return r(!1, [].slice.call(arguments)), !0
                },
                stat: i,
                local: 1,
                cache: o
            })
        }

        function revertLastInlineVideo(e) {
            if (_videoLastInlined) {
                var t = void 0,
                    o = !1,
                    n = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)(e);
                if (n && (t = _videoLastInlined[0])) {
                    for (; t = t.parentNode;)
                        if (t == n) {
                            o = !0;
                            break
                        }
                    if (!o) return
                }
                Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Fa)(_videoLastInlined[0]), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(_videoLastInlined[1]), _videoLastInlined[1].removeAttribute("data-playing"), _videoLastInlined = !1, destroyInlineVideoPlayer(), delete cur.mvOpts
            }
        }

        function destroyInlineVideoPlayer() {
            cur.videoInlinePlayer && (cur.videoInlinePlayer.destroy(), delete cur.videoInlinePlayer)
        }

        function pauseLastInlineVideo() {
            if (_videoLastInlined) {
                var e = cur.videoInlinePlayer || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)("video_yt") && window.VideoYoutube;
                if (e) {
                    if (e.isActiveLive && e.isActiveLive()) return;
                    cur.mvOpts.lastPlayerState = e.getState(), e.togglePlay(!1)
                }
            }
        }

        function playLastInlineVideo() {
            if (_videoLastInlined && cur.mvOpts && cur.mvOpts.lastPlayerState === _videoplayer_lib_player_states__WEBPACK_IMPORTED_MODULE_0__.PLAYING) {
                var e = cur.videoInlinePlayer || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)("video_yt") && window.VideoYoutube;
                e && e.togglePlay(!0)
            }
        }

        function checkMp4(e) {
            if (_browser__WEBPACK_IMPORTED_MODULE_7__.a.smart_tv) e(!0);
            else if (_ls__WEBPACK_IMPORTED_MODULE_8__.a.get("video_can_play_mp4")) e(!0);
            else {
                var t = window.sessionStorage && sessionStorage.getItem("video_can_play_mp4");
                if (null == t) {
                    var o = void 0,
                        n = void 0,
                        i = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.e)("video");
                    i.canPlayType && i.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"').replace("no", "") ? (i.onloadedmetadata = r.pbind(!0), i.onerror = function() {
                        r(!1, "error_" + i.error.code)
                    }, i.src = "/images/blank.mp4", i.load(), o = setTimeout(r.pbind(!1, "timeout"), 3e3)) : r(!1, "video_type")
                } else e(!!Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.r)(t))
            }

            function r(t, r) {
                if (!n) {
                    n = !0;
                    var _ = t ? window.localStorage : window.sessionStorage;
                    try {
                        _.setItem("video_can_play_mp4", Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__.r)(t))
                    } catch (e) {}
                    e(t, r), clearTimeout(o), i.src = "", i.load(), i.onerror = null, i.onloadedmetadata = null, i = null
                }
            }
        }
        var VideoConstants = {
            VIDEO_ITEM_INDEX_OWNER_ID: 0,
            VIDEO_ITEM_INDEX_ID: 1,
            VIDEO_ITEM_INDEX_THUMB: 2,
            VIDEO_ITEM_INDEX_TITLE: 3,
            VIDEO_ITEM_INDEX_FLAGS: 4,
            VIDEO_ITEM_INDEX_DURATION: 5,
            VIDEO_ITEM_INDEX_HASH: 6,
            VIDEO_ITEM_INDEX_MODER_ACTS: 7,
            VIDEO_ITEM_INDEX_OWNER: 8,
            VIDEO_ITEM_INDEX_DATE: 9,
            VIDEO_ITEM_INDEX_VIEWS: 10,
            VIDEO_ITEM_INDEX_PLATFORM: 11,
            VIDEO_ITEM_INDEX_BLOCKED: 12,
            VIDEO_ITEM_FLAG_EXTERNAL: 1,
            VIDEO_ITEM_FLAG_ACTIVE_LIVE: 2,
            VIDEO_ITEM_FLAG_CAN_EDIT: 64,
            VIDEO_ITEM_FLAG_CAN_DELETE: 128,
            VIDEO_ITEM_FLAG_CAN_ADD: 256,
            VIDEO_ITEM_FLAG_PRIVATE: 512,
            VIDEO_ITEM_FLAG_NO_AUTOPLAY: 1024,
            VIDEO_ITEM_FLAG_ADDED: 2048,
            VIDEO_ITEM_FLAG_SKIP_THUMB_LOAD: 4096,
            VIDEO_ITEM_FLAG_NEED_SIGN_IN: 8192,
            VIDEO_ITEM_FLAG_HD: 16384
        };

        function initVideo() {
            window._videoLastInlined = !1
        }
    },
    Ieup: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return menuSettings
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return showWriteMessageBox
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return giftsBox
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return moneyTransferBox
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return reportAd
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return mobilePromo
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return showAudioClaimWarning
        }), __webpack_require__.d(__webpack_exports__, "h", function() {
            return sureDeleteAll
        });
        var _message_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("EasH"),
            _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("v+DW"),
            _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("zxIV"),
            _dom_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Egk5"),
            _lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4+be"),
            _debug_tools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("98sY"),
            _box_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("kcIO");

        function menuSettings(e) {
            return Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.f)("al_settings.php", {
                act: "menu_box",
                type: e
            })
        }

        function showWriteMessageBox(e, t) {
            cur.onFriendMessage && cur.onFriendMessage(), stManager.add(["page.js", "wide_dd.js"]);
            var o = Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.b)("al_im.php", {
                act: "a_write_box",
                to: t
            }, {
                stat: ["writebox.js", "writebox.css", "wide_dd.css", "page.css", "post.css", jsc("web/emoji.js"), "notifier.css"],
                cache: 1
            }, e);
            return o && Object(_dom_events__WEBPACK_IMPORTED_MODULE_3__.c)(e), window.WriteBox && WriteBox.extractEmoji(), !o
        }

        function giftsBox(e, t, o) {
            return cur.viewAsBox ? cur.viewAsBox() : !Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.b)("al_gifts.php", {
                act: "box",
                tab: o || "received",
                mid: e
            }, {
                cache: 1,
                stat: ["gifts.css", "gifts.js"]
            }, t)
        }

        function moneyTransferBox(e, t, o, n, i, r, _) {
            if (cur.viewAsBox) return cur.viewAsBox();
            if (i) {
                if (!_) {
                    var a = void 0,
                        c = void 0;
                    return 2 === i ? (a = cur.lang && cur.lang.mail_money_transfer_cancel_confirm || Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("mail_money_transfer_cancel_confirm"), c = cur.lang && cur.lang.mail_money_transfer_cancel_btn || Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("mail_money_transfer_cancel_btn")) : (a = cur.lang && cur.lang.mail_money_transfer_decline_confirm || Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("news_fb_money_transfer_decline_confirm"), c = cur.lang && cur.lang.mail_money_transfer_decline_btn || Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("news_fb_money_transfer_decline_btn")), void(cur.confirmBox = Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.d)(Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_action_confirmation"), a, c, moneyTransferBox.pbind(e, t, o, n, i, !1, 1), Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_cancel")))
                }
                var s = Object(_dom__WEBPACK_IMPORTED_MODULE_2__.V)(Object(_dom__WEBPACK_IMPORTED_MODULE_2__.z)(n), "wall_postlink_preview_btn"),
                    d = Object(_dom__WEBPACK_IMPORTED_MODULE_2__.H)("flat_button", Object(_dom__WEBPACK_IMPORTED_MODULE_2__.z)(n));
                return 2 !== _ && (Object(_ui__WEBPACK_IMPORTED_MODULE_1__.f)(d, !0), s ? (Object(_dom__WEBPACK_IMPORTED_MODULE_2__.a)(n.firstChild, "round_spinner"), Object(_dom__WEBPACK_IMPORTED_MODULE_2__.Ha)(n.firstChild, "button")) : Object(_ui__WEBPACK_IMPORTED_MODULE_1__.o)(n), cur.confirmBox && cur.confirmBox.hide()), void ajax.post("al_payments.php?act=a_cancel_money_transfer", {
                    tx_id: e,
                    hash: t,
                    from: s ? "snippet" : ""
                }, {
                    onDone: function(r, _, a) {
                        0 !== r ? (s ? (Object(_dom__WEBPACK_IMPORTED_MODULE_2__.Fa)(n), Object(_dom__WEBPACK_IMPORTED_MODULE_2__.V)(d, "secondary") || Object(_dom__WEBPACK_IMPORTED_MODULE_2__.D)(d, a)) : Object(_dom__WEBPACK_IMPORTED_MODULE_2__.Fa)(Object(_dom__WEBPACK_IMPORTED_MODULE_2__.z)(n)), Object(_box_utils__WEBPACK_IMPORTED_MODULE_6__.e)(_), window.TopNotifier.invalidate()) : setTimeout(moneyTransferBox.pbind(e, t, o, n, i, !1, 2), 2e3)
                    },
                    onFail: function(e) {
                        return Object(_ui__WEBPACK_IMPORTED_MODULE_1__.f)(d, !1), s ? (Object(_dom__WEBPACK_IMPORTED_MODULE_2__.a)(n.firstChild, "button"), Object(_dom__WEBPACK_IMPORTED_MODULE_2__.Ha)(n.firstChild, "round_spinner")) : Object(_ui__WEBPACK_IMPORTED_MODULE_1__.w)(n), setTimeout(Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.d)(Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_error"), e).hide, 2e3), !0
                    }
                })
            }
            var u = void 0;
            return u = r ? {
                act: "money_transfer_box",
                request_id: e,
                request: r,
                hash: t
            } : {
                act: "accept_money_transfer_box",
                tx_id: e,
                hash: t
            }, cur.acceptMoneyBtn = n, !Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.b)("al_payments.php", u, {
                stat: ["payments.css", "payments.js"],
                onFail: function(e) {
                    return setTimeout(Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.d)(Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_error"), e).hide, 2e3), !0
                }
            }, o)
        }

        function reportAd(e) {
            Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.b)("/reports.php?act=a_report_ad_box", {
                ad_id: e
            }, {
                params: {
                    width: 370
                },
                stat: ["ui_controls.js", "ui_controls.css"]
            })
        }
        var mobilePromo = _message_box__WEBPACK_IMPORTED_MODULE_0__.b.pbind("al_login.php", {
            act: "mobile",
            box: 1
        });

        function showAudioClaimWarning(e, t, o) {
            var n = e.id,
                i = e.ownerId,
                r = e.title,
                _ = t.id,
                a = t.reason,
                c = t.original,
                s = {
                    width: 470
                },
                d = void 0,
                u = void 0;
            if (e.restrictionStatus) return AudioUtils.showAudioRestriction(e);
            "geo" === a ? (d = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("audio_claimed_geo"), u = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("audio_claim_warning_title")) : "site_rules_violation" === a ? (d = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("audio_site_rules_violation_warning"), u = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("audio_site_rules_violation_header")) : "replace" === a ? (d = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("audio_claimed_replacement_available"), u = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("audio_claim_warning_title")) : "subscription" === a ? (s.hideButtons = !0, s.bodyStyle = "padding: 0; border-radius: 4px;", s.width = 450, u = !1, d = '\n      <div class="audio_claim_popup">\n        <div class="audio_claim_popup__title">' + Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_audio_only_with_subscription_title") + '</div>\n        <div class="audio_claim_popup__text">' + Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_audio_only_with_subscription_text") + '</div>\n        <div class="audio_claim_popup__close" onclick="curBox().hide()"></div>\n        <button class="flat_button round_button" onclick="getAudioPlayer().showSubscriptionPopup()">' + Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_audio_only_with_subscription_btn") + "</button>\n      </div>") : (d = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("audio_claim_warning"), u = Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("audio_claim_warning_title")), s.title = u;
            var l = [s, d = (d = (d = d.replace(/\{audio\}/g, "<b>" + r + "</b>")).replace(/\{objection_link\}/g, '<a href="/help?act=cc_objection&claim=' + _ + "&content=audio" + i + "_" + n + '">' + Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("audio_claim_objection") + "</a>")).replace(/\{delete_link\}/g, '<a onclick="deleteAudioOnClaim(' + i + ", " + n + '); return false;">' + Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("audio_claim_delete") + "</a>")],
                p = null;
            if (o && c) {
                var b = AudioUtils.drawAudio(c, "no_extra");
                l[1] = d.replace(/\{original\}/g, c[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] + " - " + c[AudioUtils.AUDIO_ITEM_INDEX_TITLE]) + "<br/><br/>" + b, l.push(Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("audio_replace_with_original"), function() {
                    Object(_ui__WEBPACK_IMPORTED_MODULE_1__.o)(p.btns.ok[0]), o(function() {
                        return p.hide()
                    })
                }), s.textControls = '<a onclick="deleteAudioOnClaim(' + i + ", " + n + '); return false;">' + Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("audio_claim_delete_capital") + "</a>"
            }
            cur.claimWarning = p = _message_box__WEBPACK_IMPORTED_MODULE_0__.d.apply(null, l)
        }

        function sureDeleteAll(title, text, where, objectId, toId, fromId, hash, event) {
            if (!Object(_dom_events__WEBPACK_IMPORTED_MODULE_3__.d)(event)) {
                var box = Object(_message_box__WEBPACK_IMPORTED_MODULE_0__.d)({
                    title: title
                }, text, Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_delete"), function(btn) {
                    ajax.post("/delete_all.php", {
                        act: where,
                        object_id: objectId,
                        to_id: toId,
                        from_id: fromId,
                        hash: hash,
                        loc: nav.objLoc[0]
                    }, {
                        onDone: function onDone(res) {
                            if (__debugMode) eval(res);
                            else try {
                                eval(res)
                            } catch (e) {
                                Object(_debug_tools__WEBPACK_IMPORTED_MODULE_5__.d)(e, res)
                            }
                            box.hide()
                        },
                        showProgress: _ui__WEBPACK_IMPORTED_MODULE_1__.o.pbind(btn),
                        hideProgress: _ui__WEBPACK_IMPORTED_MODULE_1__.w.pbind(btn)
                    })
                }, Object(_lang__WEBPACK_IMPORTED_MODULE_4__.d)("global_cancel"));
                return !1
            }
        }
    },
    Iw71: function(e, t, o) {
        var n = o("0/R4"),
            i = o("dyZX").document,
            r = n(i) && n(i.createElement);
        e.exports = function(e) {
            return r ? i.createElement(e) : {}
        }
    },
    "J+6e": function(e, t, o) {
        var n = o("I8a+"),
            i = o("K0xU")("iterator"),
            r = o("hPIQ");
        e.exports = o("g3g5").getIteratorMethod = function(e) {
            if (void 0 != e) return e[i] || e["@@iterator"] || r[n(e)]
        }
    },
    K0xU: function(e, t, o) {
        var n = o("VTer")("wks"),
            i = o("ylqs"),
            r = o("dyZX").Symbol,
            _ = "function" == typeof r;
        e.exports = function(e) {
            return n[e] || (n[e] = _ && r[e] || (_ ? r : i)("Symbol." + e))
        }
    },
    Kngp: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return locBase
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return ajx2q
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return q2ajx
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return requestBox
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return activateMobileBox
        }), __webpack_require__.d(__webpack_exports__, "h", function() {
            return validateMobileBox
        }), __webpack_require__.d(__webpack_exports__, "i", function() {
            return validatePassBox
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return photoCaptchaBox
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return initAjax
        });
        var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("t7n3"),
            _debug_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("98sY"),
            _browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("gdug"),
            _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("zxIV"),
            _dom_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Egk5"),
            _message_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("EasH"),
            _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("aong"),
            _ui_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("ryw6"),
            _box_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("kcIO"),
            _lang__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("4+be"),
            locBase = location.toString().replace(/#.+$/, ""),
            decodeErors = {},
            iframeTransport = void 0,
            iframeTO = 0;

        function ajx2q(e, t) {
            var o = [],
                n = function(e) {
                    if (decodeErors[e]) return e;
                    try {
                        return encodeURIComponent(e)
                    } catch (e) {
                        return ""
                    }
                };
            for (var i in e)
                if (null != e[i] && !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.v)(e[i]))
                    if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.t)(e[i]))
                        for (var r = 0, _ = 0, a = e[i].length; r < a; ++r) null == e[i][r] || Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.v)(e[i][r]) || (o.push(n(i) + "[" + _ + "]=" + n(e[i][r])), ++_);
                    else o.push(n(i) + "=" + n(e[i]));
            return t || o.sort(), o.join("&")
        }

        function q2ajx(e) {
            if (!e) return {};
            var t = {},
                o = function(e) {
                    try {
                        return decodeURIComponent(e)
                    } catch (t) {
                        return decodeErors[e] = 1, e
                    }
                };
            return e = e.split("&"), Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(e, function(e, n) {
                var i = n.split("=");
                if (i[0]) {
                    var r = o(i[1] + "");
                    if ("[]" === i[0].substr(i.length - 2)) {
                        var _ = o(i[0].substr(0, i.length - 2));
                        t[_] || (t[_] = []), t[_].push(r)
                    } else t[o(i[0])] = r
                }
            }), t
        }

        function requestBox(e, t, o) {
            return e.setOptions({
                onDestroy: o
            }), e.onDone = function() {
                t && t.apply(null, arguments)
            }, e
        }

        function activateMobileBox(e) {
            return requestBox(Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.b)("activation.php", {
                act: "activate_mobile_box",
                hash: e.hash
            }), function() {
                vk.nophone = 0, e.onDone()
            }, e.onFail)
        }

        function validateMobileBox(e) {
            return requestBox(Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.b)("activation.php", {
                act: "validate_box",
                captcha: e.acceptCaptcha ? 1 : "",
                skip_push: e.skip_push ? e.skip_push : "",
                from: e.from || "",
                hash: e.hash,
                ahash: e.ahash
            }, {
                stat: ["uncommon.css"]
            }), e.onDone, e.onFail)
        }

        function validatePassBox(e) {
            return requestBox(Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.b)("activation.php", {
                act: "pass_validate_box",
                hash: e.hash
            }, {
                stat: ["uncommon.css"]
            }), e.onDone, e.onFail)
        }

        function photoCaptchaBox(e) {
            return requestBox(Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.b)("pcaptcha.php", {
                act: "box"
            }, {
                stat: ["pcaptcha.css", "pcaptcha.js"]
            }), e.onDone, e.onFail)
        }
        var ajax = {
            _init: function() {
                try {
                    if (new XMLHttpRequest) return void(ajax._req = function() {
                        return new XMLHttpRequest
                    })
                } catch (e) {}
                ajax._req || _browser__WEBPACK_IMPORTED_MODULE_2__.a.search_bot || location.replace("/badbrowser.php")
            },
            _getreq: function() {
                return ajax._req || ajax._init(), ajax._req()
            },
            _frameover: function(e, t) {
                if (iframeTransport) {
                    var o = iframeTransport.parentNode;
                    o.innerHTML = "", utilsNode.removeChild(o), iframeTransport = !1, (e || t) && ajax.framegot(!1, !1, e, t), ajax.framegot(!1), cur.onFrameBlocksDone && cur.onFrameBlocksDone(), ajax.tOver = (new Date).getTime()
                }
            },
            _receive: function _receive(cont, html, js, bench, params) {
                var container = cont && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)(cont);
                if (container && html && (container.firstChild ? container.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.f)(html)) : Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ya)(container, html)), js) {
                    var scr = "(function(){" + js + ";})()";
                    if (__debugMode) eval(scr);
                    else try {
                        eval(scr)
                    } catch (e) {
                        Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)(e, {
                            dt: 15,
                            type: 8,
                            url: ajax._frameurl,
                            js: js,
                            answer: Array.prototype.slice.call(arguments).join("<!>")
                        }), Object(_debug_tools__WEBPACK_IMPORTED_MODULE_1__.d)(e, scr)
                    }
                    bench && (ajax.tModule = cur.module)
                }
                params && "leftads" in params && window.__adsSet && __adsSet(params.leftads, params.ads_section || "", params.ads_can_show, params.ads_showed), ajax._framenext()
            },
            framedata: !1,
            _framenext: function() {
                if ((ajax.framedata || {}).length) {
                    var e = ajax.framedata.shift();
                    !0 === e ? ajax._framenext() : !1 === e ? (ajax.framedata = !1, cur.onFrameBlocksDone && cur.onFrameBlocksDone()) : iframeTO = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.B)(ajax._receive.pbind(e[0], e[1], e[2], !0, e[3]), 0)
                }
            },
            framegot: function(e, t, o, n) {
                ajax.framedata && (ajax.framedata.push(void 0 === t && void 0 === o && void 0 === n ? e : [e, t, o, n]), 1 == ajax.framedata.length && ajax._framenext())
            },
            framepost: function(e, t, o, n) {
                clearTimeout(iframeTO), iframeTransport && ajax._frameover(), iframeTransport = utilsNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.e)("div", {
                    innerHTML: "<iframe></iframe>"
                })).firstChild, ajax._framedone = o, ajax.framedata = [!0], e += "?" + ("string" != typeof t ? ajx2q(t, n && n.noSort) : t), e += ("?" != e.charAt(e.length - 1) ? "&" : "") + "_rndVer=" + Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.s)(0, 99999), ajax._frameurl = iframeTransport.src = e
            },
            plainpost: function(e, t, o, n, i, r, _, a) {
                var c = ajax._getreq(),
                    s = "string" != typeof t ? ajx2q(t, _ && _.noSort) : t;
                c.onreadystatechange = function() {
                    4 === c.readyState && (c.status >= 200 && c.status < 300 ? o && o(c.responseText, c) : n && n(c.responseText, c))
                };
                try {
                    c.open("POST", e, !0)
                } catch (e) {
                    return !1
                }
                return r && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(r, function(e, t) {
                    c[e] = t
                }), i || (c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a || c.setRequestHeader("X-Requested-With", "XMLHttpRequest")), c.send(s), c
            },
            post: function(e, t, o) {
                "/" !== e.substr(0, 1) && "http" !== e.substr(0, 4) && (e = "/" + e);
                var n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)({
                        _captcha: !1,
                        _box: !1
                    }, o || {}),
                    i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)({
                        al: n.frame ? -1 : 1
                    }, t),
                    r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.L)(),
                    _ = vk.spentLastSendTS ? Math.round((r - vk.spentLastSendTS) / 1e3) : 0;
                if (vk.sampleUser >= 0 && window.cur && cur.module && _ >= 1 && (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (i._smt = cur.module + ":" + _), vk.spentLastSendTS = r), n.progress && (n.showProgress || (n.showProgress = function() {
                        var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)(n.progress);
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.V)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Qa)(e, "opacity", 1), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(e)
                    }), n.hideProgress || (n.hideProgress = function() {
                        var e = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.F)(n.progress);
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.V)(e, "pr") && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Qa)(e, "opacity", 0), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(e)
                    })), n.loader) {
                    var a = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Aa)(boxLayerWrap);
                    n.showProgress = function() {
                        boxRefreshCoords(boxLoader), Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(boxLoader), a || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Ta)(boxLayerWrap)
                    }, n.hideProgress = function() {
                        Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(boxLoader), a || Object(_dom__WEBPACK_IMPORTED_MODULE_3__.W)(boxLayerWrap)
                    }
                }
                return ajax._post(e, i, n)
            },
            preload: function(e, t, o) {
                "/" !== e.substr(0, 1) && (e = "/" + e), ajaxCache[e + "#" + ajx2q(t)] = o
            },
            invalidate: function(e, t) {
                void 0 === e ? ajaxCache = {} : delete ajaxCache[ajax._getCacheKey(e, t)]
            },
            _getCacheKey: function(e, t, o) {
                var n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.d)(t);
                return delete n.al, delete n.al_ad, delete n.ads_section, delete n.ads_showed, delete n.captcha_sid, delete n.captcha_key, delete n._smt, delete n._preload, e + "#" + ajx2q(n, o && o.noSort)
            },
            _debugLog: function(e, t) {
                window.debuglogGot && window.debuglogGot(t, e)
            },
            _parseRes: function(e, t) {
                for (var o = e.length - 1; o >= 0; --o) {
                    var n = e[o];
                    if ("<!" === n.substr(0, 2)) {
                        var i = n.indexOf(">"),
                            r = n.substr(2, i - 2);
                        switch (n = n.substr(i + 1), r) {
                            case "json":
                                e[o] = Object(_utils__WEBPACK_IMPORTED_MODULE_6__.l)(n);
                                break;
                            case "int":
                                e[o] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n);
                                break;
                            case "float":
                                e[o] = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.k)(n);
                                break;
                            case "bool":
                                e[o] = !!Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(n);
                                break;
                            case "null":
                                e[o] = null;
                                break;
                            case "pageview_candidate":
                                e.pop();
                                break;
                            case "debug":
                                ajax._debugLog(n, t), e.pop()
                        }
                    }
                }
            },
            _post: function _post(url, query, options) {
                !query.captcha_sid && options.showProgress && options.showProgress();
                var cacheKey = !1,
                    statAct = void 0;
                window.__adsGetAjaxParams && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(query, __adsGetAjaxParams(query, options)), options.cache && (cacheKey = ajax._getCacheKey(url, query, options));
                var hideBoxes = function() {
                        for (var e = 0, t = arguments.length; e < t; ++e) {
                            var o = arguments[e];
                            o && o.isVisible() && (o.setOptions({
                                onHide: !1,
                                onDestroy: !1
                            }), o.hide())
                        }
                        return !1
                    },
                    fail = function(e, t) {
                        if (options.hideProgress && options.hideProgress(), options._suggest && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.g)(options._suggest), options._box = hideBoxes(options._captcha, options._box), options._captcha = options._box, options._suggest = options._captcha, -1 !== e.indexOf("The page is temporarily unavailable") && __dev && Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.o)(vk.id, [100])) return ajax._post(url, query, options), !1;
                        options.onFail && !0 === options.onFail(e) || Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)(e, {
                            dt: 5,
                            type: 3,
                            status: t.status,
                            url: url,
                            query: query && ajx2q(query, options.noSort)
                        })
                    };
                options.local && (fail = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.K)(fail)), options.stat && (statAct = !1, stManager.add(options.stat, function() {
                    statAct && statAct(), options.stat = !1
                }));
                var _processResponse = function processResponse(code, answer) {
                    if (options.cache) {
                        var answ = ajaxCache[cacheKey];
                        answ && answ._loading && (setTimeout(function() {
                            for (var e in answ._callbacks) answ._callbacks.hasOwnProperty(e) && answ._callbacks[e](code, answer)
                        }, 0), delete ajaxCache[cacheKey])
                    }
                    if (options.stat) return options.stat = !1, statAct = _processResponse.pbind(code, answer), !1;
                    switch (options.cache && !options.forceGlobalCache && (code || (ajaxCache[cacheKey] = answer)), options.hideProgress && options.hideProgress(), 2 !== code && (options._captcha && (options._suggest && Object(_dom__WEBPACK_IMPORTED_MODULE_3__.g)(options._suggest), options._captcha = hideBoxes(options._captcha), options._suggest = options._captcha), options._box = hideBoxes(options._box)), code) {
                        case 1:
                            Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.d)({
                                width: 520,
                                title: answer[0],
                                onDestroy: options.onFail
                            }, answer[1]);
                            break;
                        case 2:
                            var addText = "";
                            if (2 === Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(answer[1])) {
                                var resend = function(e) {
                                    var t = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(query, {
                                            recaptcha: e
                                        }),
                                        o = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                            cache: -1
                                        }) : options;
                                    ajax._post(url, t, o)
                                };
                                options._captcha = Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.e)(answer[0], answer[2], options._captcha, {
                                    onSubmit: resend,
                                    addText: addText,
                                    onDestroy: function() {
                                        options.onFail && options.onFail()
                                    }
                                })
                            } else {
                                var _resend = function(e, t) {
                                    var o = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(query, {
                                            captcha_sid: e,
                                            captcha_key: t
                                        }),
                                        n = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                            cache: -1
                                        }) : options;
                                    ajax._post(url, o, n)
                                };
                                options._captcha = Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.c)(answer[0], Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(answer[1]), options._captcha, {
                                    onSubmit: _resend,
                                    addText: addText,
                                    onDestroy: function() {
                                        options.onFail && options.onFail()
                                    }
                                })
                            }
                            options._suggest = Object(_dom__WEBPACK_IMPORTED_MODULE_3__.H)("phone_validation_link", options._captcha.bodyNode), options._suggest && Object(_dom_events__WEBPACK_IMPORTED_MODULE_4__.b)(options._suggest, "click", function() {
                                options._box = validateMobileBox({
                                    onDone: options._captcha.submit
                                })
                            });
                            break;
                        case 11:
                        case 12:
                            var newOptions = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                cache: -1
                            }) : options;
                            options._box = validateMobileBox({
                                acceptCaptcha: 11 === code,
                                onDone: function(e, t) {
                                    vk.nophone = 0, e && (options._captcha = Object(_box_utils__WEBPACK_IMPORTED_MODULE_8__.b)());
                                    var o = e ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(query, {
                                        captcha_sid: e,
                                        captcha_key: t
                                    }) : query;
                                    ajax._post(url, o, newOptions)
                                },
                                onFail: options.onFail,
                                hash: answer[0],
                                ahash: answer[1]
                            });
                            break;
                        case 14:
                            var _newOptions = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                cache: -1
                            }) : options;
                            options._box = photoCaptchaBox({
                                onDone: ajax._post.pbind(url, query, _newOptions),
                                onFail: options.onFail
                            });
                            break;
                        case 15:
                            var _newOptions2 = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                cache: -1
                            }) : options;
                            options._box = validatePassBox({
                                onDone: ajax._post.pbind(url, query, _newOptions2),
                                onFail: options.onFail,
                                hash: answer[0]
                            });
                            break;
                        case 3:
                            var _newOptions3 = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                cache: -1
                            }) : options;
                            window.onReLoginDone = ajax._post.pbind(url, query, _newOptions3), window.onReLoginFailed = function(e, t) {
                                t ? nav.go(t) : -1 === e ? location.href = location.href.replace(/^http:/, "https:") : e ? nav.go("/") : window.onReLoginDone()
                            }, utilsNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.e)("iframe", {
                                src: vk.loginscheme + "://login.vk.com/?" + ajx2q({
                                    role: "al_frame",
                                    _origin: locProtocol + "//" + locHost,
                                    ip_h: answer[0] || vk.ip_h,
                                    to: answer[1] || ""
                                })
                            }));
                            break;
                        case 4:
                            Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(answer[1]) ? nav.go(answer[0], !1, {
                                nocur: "2" === answer[1],
                                noback: !0 === answer[1],
                                showProgress: options.showProgress,
                                hideProgress: options.hideProgress
                            }) : (hab.stop(), location.href = answer[0]);
                            break;
                        case 5:
                            nav.reload({
                                force: Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(answer[0]),
                                from: 1,
                                url: url,
                                query: query && ajx2q(query)
                            });
                            break;
                        case 6:
                            var _newOptions4 = options.cache ? Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(options, {
                                cache: -1
                            }) : options;
                            options._box = activateMobileBox({
                                onDone: ajax._post.pbind(url, query, _newOptions4),
                                onFail: options.onFail,
                                hash: answer[0]
                            });
                            break;
                        case 7:
                            options.onFail && options.onFail(), Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.d)(answer[0], 10);
                            break;
                        case 8:
                            if (options.onFail && options.onFail(answer[0])) return;
                            Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)(answer[0] + (answer[2] ? " #" + answer[2] : ""), {
                                dt: answer[1] ? 0 : 10,
                                type: 4,
                                url: url,
                                query: query && ajx2q(query)
                            });
                            break;
                        case 9:
                            if ((options.fromBox || options.forceDone) && (options.onDone && options.onDone.apply(window, answer), options.fromBox)) break;
                            options._box = Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.d)({
                                title: Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.H)(answer[0])
                            }, answer[1]);
                            var _newOptions5 = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.d)(options), {
                                showProgress: options._box.showProgress,
                                hideProgress: options._box.hideProgress
                            });
                            options.cache && (_newOptions5.cache = -1), options._box = requestBox(options._box, function(e) {
                                Object(_dom__WEBPACK_IMPORTED_MODULE_3__.Aa)(options._box.progress) || (e || (e = {
                                    _votes_ok: 1
                                }), ajax._post(url, Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(query, e), _newOptions5))
                            }, options.onFail), options._box.evalBox(answer[2]);
                            break;
                        case 10:
                            options._box = Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.d)({
                                title: answer[0] || Object(_lang__WEBPACK_IMPORTED_MODULE_9__.d)("global_charged_zone_title"),
                                onHide: options.onFail
                            }, answer[1], Object(_lang__WEBPACK_IMPORTED_MODULE_9__.d)("global_charged_zone_continue"), function() {
                                var e = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)(query, {
                                    charged_confirm: answer[3]
                                });
                                ajax._post(url, e, options)
                            }, Object(_lang__WEBPACK_IMPORTED_MODULE_9__.d)("global_cancel"));
                            break;
                        case 13:
                            var evalString = "(function(){" + answer[0] + ";})()";
                            if (__debugMode) eval(evalString);
                            else try {
                                eval(evalString)
                            } catch (e) {
                                Object(_debug_tools__WEBPACK_IMPORTED_MODULE_1__.d)(e, evalString)
                            }
                            break;
                        default:
                            if (-1 === code || -2 === code || -3 === code) {
                                var adsShowed = answer.pop(),
                                    adsCanShow = answer.pop(),
                                    adsHtml = answer.pop(),
                                    adsProps = void 0; - 3 === code && (adsProps = answer.pop()), window.__adsSet && __adsSet(adsHtml, null, adsCanShow, adsShowed, null, adsProps)
                            }
                            options.onDone && options.onDone.apply(window, answer)
                    }
                    window.LazyLoad && LazyLoad.scanDelayed()
                };
                options.local && (_processResponse = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.K)(_processResponse));
                var done = function(e, t) {
                    options.bench && (ajax.tDone = (new Date).getTime()), e = e.replace(/^<!--/, "").replace(/-<>-(!?)>/g, "--$1>"), Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.H)(e).length || (t = [8, Object(_lang__WEBPACK_IMPORTED_MODULE_9__.d)("global_unknown_error")], e = stVersions.nav + "<!><!>" + vk.lang + "<!>" + stVersions.lang + "<!>8<!>" + t[1]);
                    var o = e.split("<!>"),
                        n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.d)(o);
                    Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(n, function(e, t) {
                        return n[e] = t.substr(0, 100)
                    }), ajax.lastResp = n.join("<!>");
                    var i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(o.shift());
                    if (!i) return fail("<pre>" + e + "</pre>", {
                        status: -1
                    });
                    if (vk.version && vk.version !== i) i && o.length > 4 ? nav.reload({
                        force: !0,
                        from: 2,
                        url: url,
                        query: query && ajx2q(query)
                    }) : nav.strLoc ? location.replace(locBase) : Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)("Server error.", {
                        type: 100
                    });
                    else {
                        vk.version = !1;
                        var r = o.shift(),
                            _ = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(o.shift()),
                            a = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(o.shift());
                        options.frame && (o = t);
                        var c = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(o.shift());
                        if (vk.lang !== _ && options.canReload) nav.reload({
                            force: !0,
                            from: 3,
                            url: url,
                            query: query && ajx2q(query)
                        });
                        else {
                            var s = function() {
                                var e = ["common.css"];
                                if (r)
                                    for (var t = 0, n = (r = r.split(",")).length; t < n; ++t) e.push(r[t]);
                                if (stVersions.lang < a)
                                    for (var i in stVersions.lang = a, StaticFiles) /^lang\d/i.test(i) && e.push(i);
                                if (!options.frame) try {
                                    ajax._parseRes(o, options._reqid)
                                } catch (e) {
                                    Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)("<b>JSON Error:</b> " + e.message, {
                                        type: 5,
                                        answer: o.join("<!>"),
                                        url: url,
                                        query: query && ajx2q(query)
                                    })
                                }
                                stManager.add(e, _processResponse.pbind(c, o))
                            };
                            if (window.stVersions) {
                                if (i === stVersions.nav) return s();
                                headNode.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_3__.e)("script", {
                                    type: "text/javascript",
                                    src: "/js/loader_nav" + i + "_" + vk.lang + ".js"
                                })), setTimeout(function e() {
                                    if (i === stVersions.nav) return s();
                                    setTimeout(e, 100)
                                }, 0)
                            }
                        }
                    }
                };
                if (options.local && (done = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.K)(done)), options.cache > 0 || options.forceGlobalCache) {
                    var answer = ajaxCache[cacheKey];
                    if (answer && answer._loading) return void answer._callbacks.push(_processResponse);
                    if (answer && !options.forceGlobalCache) return _processResponse(0, answer), void(3 === options.cache && delete ajaxCache[cacheKey]);
                    if (answer = window.globalAjaxCache[cacheKey]) return -1 == answer || Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.v)(answer) ? window.globalAjaxCache[cacheKey] = options.onDone : options.onDone.apply(window, answer), void(options.hideProgress && options.hideProgress())
                }
                ajaxCache[cacheKey] = {
                    _loading: 1,
                    _callbacks: []
                }, window.debuglogSent ? (options._reqid = debuglogSent(url + (query ? ": " + ajx2q(query, options.noSort).replace(/&/g, "&amp;") : "")), options.frame && (window._lfrid = options._reqid)) : options._reqid = 0;
                var xhrOptions = {};
                return options.timeout && (xhrOptions.timeout = options.timeout), options.frame ? ajax.framepost(url, query, done, options) : ajax.plainpost(url, query, done, fail, !1, xhrOptions, options)
            },
            tGetParam: function() {
                if (ajax.tStart && ajax.tModule) {
                    var e = [ajax.tDone - ajax.tStart, ajax.tProcess - ajax.tDone, ajax.tRender - ajax.tProcess, ajax.tOver - ajax.tStart, ajax.tModule];
                    for (var t in e)
                        if (e.hasOwnProperty(t)) {
                            if (e[t] < 0) return !1;
                            if (!e[t] && 0 !== e[t]) return !1
                        }
                    return ajax.tStart = !1, e.join(",")
                }
            }
        };

        function initAjax() {
            window.ajaxCache = {}, window.globalAjaxCache = {}, window.ajax = ajax
        }
    },
    KroJ: function(e, t, o) {
        var n = o("dyZX"),
            i = o("Mukb"),
            r = o("aagx"),
            _ = o("ylqs")("src"),
            a = Function.toString,
            c = ("" + a).split("toString");
        o("g3g5").inspectSource = function(e) {
            return a.call(e)
        }, (e.exports = function(e, t, o, a) {
            var s = "function" == typeof o;
            s && (r(o, "name") || i(o, "name", t)), e[t] !== o && (s && (r(o, _) || i(o, _, e[t] ? "" + e[t] : c.join(String(t)))), e === n ? e[t] = o : a ? e[t] ? e[t] = o : i(e, t, o) : (delete e[t], i(e, t, o)))
        })(Function.prototype, "toString", function() {
            return "function" == typeof this && this[_] || a.call(this)
        })
    },
    Kuth: function(e, t, o) {
        var n = o("y3w9"),
            i = o("FJW5"),
            r = o("4R4u"),
            _ = o("YTvA")("IE_PROTO"),
            a = function() {},
            c = function() {
                var e, t = o("Iw71")("iframe"),
                    n = r.length;
                for (t.style.display = "none", o("+rLv").appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; n--;) delete c.prototype[r[n]];
                return c()
            };
        e.exports = Object.create || function(e, t) {
            var o;
            return null !== e ? (a.prototype = n(e), o = new a, a.prototype = null, o[_] = e) : o = c(), void 0 === t ? o : i(o, t)
        }
    },
    LQAc: function(e, t) {
        e.exports = !1
    },
    LZWt: function(e, t) {
        var o = {}.toString;
        e.exports = function(e) {
            return o.call(e).slice(8, -1)
        }
    },
    M6Qj: function(e, t, o) {
        var n = o("hPIQ"),
            i = o("K0xU")("iterator"),
            r = Array.prototype;
        e.exports = function(e) {
            return void 0 !== e && (n.Array === e || r[i] === e)
        }
    },
    MSYF: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        var _top_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Bszp"),
            _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("t7n3"),
            _ads__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("m0N1"),
            _debug_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("98sY"),
            _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("zxIV"),
            _dom_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Egk5"),
            _scroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lXE5"),
            _ui_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("ryw6"),
            _ajax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("Kngp"),
            _nav_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("kHqu"),
            _layout_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("El3O"),
            _video__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("Ia1d"),
            _legacy_performance_stats__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("eNQP"),
            _browser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("gdug"),
            _feature_entries__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("/PiP"),
            _accessibility__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("QGEU"),
            _stl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("i6oL"),
            _utils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("aong"),
            _message_box__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("EasH"),
            _lang__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("4+be"),
            _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            Nav = {
                getData: function(e) {
                    if (e.length) {
                        for (var t in navMap) {
                            if (navMap.hasOwnProperty(t))
                                if ("<" !== t[0])
                                    if (e.match(new RegExp("^" + t, "i"))) return {
                                        url: navMap[t][0],
                                        files: navMap[t][1]
                                    }
                        }
                        return e.match(/^[a-z0-9\-_]+\.php$/i) ? {
                            url: e
                        } : {
                            url: navMap["<other>"][0],
                            files: navMap["<other>"][1]
                        }
                    }
                    return {
                        url: navMap["<void>"][0],
                        files: navMap["<void>"][1]
                    }
                },
                reload: function(e) {
                    if (!Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.h)(e)) {
                        e = e || {};
                        var t = Nav.strLoc.replace(/^\/+/g, "");
                        e.force ? (hab.stop(), location.href = "/" + t) : (TopNotifier.invalidate(), Nav.go("/" + t, void 0, Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.i)({
                            nocur: !0
                        }, e)))
                    }
                },
                link: function(e, t) {
                    if (Object(_dom_events__WEBPACK_IMPORTED_MODULE_5__.d)(t) || cur.noAjaxNav) {
                        var o = e.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), "");
                        window.open(o)
                    } else Nav.go(e)
                },
                go: function go(loc, ev) {
                    var opts = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    if (loc && loc.href && loc.getAttribute && loc.getAttribute("data-change-location-with-post-away")) {
                        var newLink = loc.href,
                            _postParams = Nav.getPostParams(loc, !(!opts.params || !opts.params._post_click_type)),
                            postOptions = Nav.mergePostParamsOptions(_postParams, opts.params),
                            extraQuery = {};
                        return postOptions._post && (extraQuery.post = postOptions._post, postOptions._post_ad_data && (extraQuery.post_ad_data = postOptions._post_ad_data), postOptions._post_click_cc_key && (extraQuery.cc_key = postOptions._post_click_cc_key), newLink = "/away.php?to=" + encodeURIComponent(newLink) + "&" + Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.b)(extraQuery)), location.href = newLink, !1
                    }
                    if (!Object(_dom_events__WEBPACK_IMPORTED_MODULE_5__.d)(ev) && !cur.noAjaxNav) {
                        if (LongView.onBeforePageChange(), loc.tagName && "a" === loc.tagName.toLowerCase()) {
                            if ("_blank" === loc.target || Nav.baseBlank) return;
                            var _params = loc.getAttribute("hrefparams");
                            if (_params && (opts.params = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.i)(opts.params || {}, Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.f)(_params))), loc = loc.href || "", ev && !(loc || "").match(new RegExp("^" + locProtocol + "//" + locHost, "i"))) return
                        }
                        var strLoc = "",
                            objLoc = {},
                            changed = {};
                        "string" == typeof loc ? (loc = loc.replace(new RegExp("^(" + locProtocol + "//" + locHost + ")?/?", "i"), ""), strLoc = loc, objLoc = Nav.fromStr(loc)) : (loc[0] || (loc[0] = ""), strLoc = Nav.toStr(loc), objLoc = loc), Object(_legacy_performance_stats__WEBPACK_IMPORTED_MODULE_12__.b)(), Object(_legacy_performance_stats__WEBPACK_IMPORTED_MODULE_12__.c)();
                        var ap = Object(_feature_entries__WEBPACK_IMPORTED_MODULE_14__.j)();
                        if (ap && ap.updateCurrentPlaying && ap.updateCurrentPlaying(), !opts.nocur) {
                            for (var i in changed = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.d)(objLoc), Nav.objLoc) Nav.objLoc.hasOwnProperty(i) && (Nav.objLoc[i] === changed[i] ? delete changed[i] : void 0 === changed[i] && (changed[i] = !1));
                            if (!1 === Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.m)(Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.d)(changed), {
                                    hist: opts.hist,
                                    asBox: opts.asBox,
                                    onDone: opts.onDone
                                }, objLoc)) return Nav.setLoc(strLoc), !1;
                            var isHandled = articleNav(strLoc, Nav.toStr(Nav.objLoc), opts.back, opts.postId);
                            if (isHandled) return Nav.setLoc(strLoc), (Nav.objLoc.z || Nav.objLoc.w) && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.m)({
                                z: Nav.objLoc.z,
                                w: Nav.objLoc.w
                            }, {}), !1;
                            var isHandledAuthorPage = authorPageNav(strLoc, Nav.toStr(Nav.objLoc), opts.back, opts.postId);
                            if (isHandledAuthorPage) return cur._hardNav ? (window.location.href = strLoc, !1) : (Nav.setLoc(strLoc), (Nav.objLoc.z || Nav.objLoc.w) && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.m)({
                                z: Nav.objLoc.z,
                                w: Nav.objLoc.w
                            }, {}), !1)
                        }
                        if (!opts.nocur && (vk.loaded || !changed[0]))
                            for (var curnav = cur.nav || [], _i = curnav.length - 1; _i >= 0; _i--) {
                                var oldUrl = document.URL;
                                if (!1 === curnav[_i](Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.d)(changed), Nav.objLoc, objLoc, opts)) {
                                    var currentURL = locProtocol + "//" + location.host + "/" + strLoc,
                                        referrer = oldUrl === currentURL ? "" : oldUrl;
                                    return setTimeout(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.l.pbind(currentURL, referrer), 10), !1
                                }
                            }
                        if (4 === vk.al || !vk.loaded && (!window.audioPlayer || !audioPlayer.player) && changed[0]) return setTimeout(function() {
                            location.href = "/" + (strLoc || "").replace("%23", "#")
                        }, 0), !1;
                        if (window.Upload && Upload.terminateAllUploads(), Object(_top_search__WEBPACK_IMPORTED_MODULE_0__.c)(), opts.back) {
                            if (cur._back && cur._back.onBack) return cur._back.onBack();
                            for (var _i2 = 0, l = globalHistory.length; _i2 < l; _i2++)
                                if (globalHistory[_i2].loc === strLoc) {
                                    var _ret = function() {
                                        var e = globalHistory.splice(_i2, 1)[0],
                                            t = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.F)("wrap3"),
                                            o = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.F)("title"),
                                            n = cur._onback;
                                        return window.tooltips && tooltips.destroyAll(), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)("audio_tip_wrap"), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.g)(cur), window.radioBtns = e.radioBtns, window.ajaxCache = e.ajaxCache, window.PageID = e.pid, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.i)(), window.cur = e.cur, setTimeout(function() {
                                            if (t.innerHTML = "", t.parentNode.replaceChild(e.content, t), vk.width === e.width && vk.width_dec_footer === e.width_dec_footer || Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.e)(e), Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.g)(e.scrollTop, 0), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Oa)(e.htitle), o.innerHTML = e.title, e.bodyClass !== bodyNode.className && (bodyNode.className = e.bodyClass || "", vk.body_class = e.bodyClass || ""), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Qa)(o.parentNode, "display", e.hideHeader ? "none" : "block"), cur._back.show)
                                                for (var i = 0, r = cur._back.show.length; i < r; i++) cur._back.show[i]();
                                            if (n)
                                                for (var _ = 0, a = n.length; _ < a; _++) n[_]();
                                            Nav.setLoc(strLoc);
                                            var c = e.back || {};
                                            setTimeout(function() {
                                                Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.i)(c[0], c[1], c[2]), (Nav.objLoc.z || Nav.objLoc.w) && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.m)({
                                                    z: Nav.objLoc.z,
                                                    w: Nav.objLoc.w
                                                }, {}), Object(_stl__WEBPACK_IMPORTED_MODULE_16__.b)(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.k)(), Object(_accessibility__WEBPACK_IMPORTED_MODULE_15__.c)(), _top_search__WEBPACK_IMPORTED_MODULE_0__.a.clear()
                                            }, 10), Object(_feature_entries__WEBPACK_IMPORTED_MODULE_14__.j)().updateCurrentPlaying()
                                        }, 10), {
                                            v: !1
                                        }
                                    }();
                                    if ("object" === (void 0 === _ret ? "undefined" : _typeof(_ret))) return _ret.v
                                }
                        }
                        var dest = objLoc[0];
                        delete objLoc[0];
                        var where = Nav.getData(dest);
                        opts.noframe || (opts.tstat = ajax.tGetParam(), ajax.tStart = (new Date).getTime(), opts.bench = !0), opts.params && opts.params._ref || (opts.params = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.i)(opts.params || {}, {
                            _ref: Nav.objLoc[0] || ""
                        })), where.files && stManager.add(where.files), where.params = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.i)({
                            __query: dest,
                            al_id: vk.id
                        }, objLoc, opts.params || {});
                        var postParamsEl = ev && ev.target && ev.target.getAttribute ? ev.target : loc && loc.getAttribute ? loc : null,
                            postParams = Nav.getPostParams(postParamsEl, !!where.params._post_click_type);
                        where.params = Nav.mergePostParamsOptions(postParams, where.params), opts.cl_id && (where.params.fr_click = cur.oid + "," + opts.cl_id + "," + cur.options.fr_click), opts.tstat && (where.params._tstat = opts.tstat), opts.permanent && (where.params._permanent = opts.permanent);
                        var curNavVersion = ++NextPageID,
                            done = function done(title, html, js, params) {
                                if (curNavVersion === NextPageID) {
                                    try {
                                        params._id = params.id
                                    } catch (e) {
                                        return Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)(e, {
                                            dt: 15,
                                            type: 6,
                                            msg: "Error: " + e.message + ", (params undefined?), title: " + title + ", html: " + html + ", js: " + js,
                                            url: where.url,
                                            query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.b)(where.params),
                                            answer: arguments.length
                                        })
                                    }
                                    if (window.lastScrollTop = Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.e)(), opts.bench && (ajax.tProcess = (new Date).getTime()), stVersions[jsc("web/common_web.js")] > StaticFiles[jsc("web/common_web.js")].v) {
                                        if (Nav.setLoc(params.loc || Nav.strLoc), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.h)({
                                                force: !0,
                                                from: 4
                                            })) return;
                                        location.reload(!0)
                                    } else {
                                        var newPage = void 0 === where.params.al_id || where.params.al_id != params.id || params.fullPage,
                                            tNode = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.F)("title"),
                                            wNode = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.F)("wrap3"),
                                            _back = cur._back,
                                            hist = !1;
                                        if ((strLoc === (cur._back || {}).loc || newPage || opts.back) && (_back = !1), (opts.noback || params.level && (!cur._level || params.level <= cur._level) && !1 !== opts.noback) && (_back = !1, (opts.noback || cur._level && params.level < cur._level) && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.i)()), window.tooltips && tooltips.destroyAll(), Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.f)(Object(_dom__WEBPACK_IMPORTED_MODULE_4__.G)("page_actions_wrap"), function(e, t) {
                                                return Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)(t)
                                            }), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.W)("audio_tip_wrap"), _back) {
                                            if (Object(_video__WEBPACK_IMPORTED_MODULE_11__.h)(), hist = {
                                                    loc: _back.loc || Nav.strLoc,
                                                    cur: cur,
                                                    radioBtns: radioBtns,
                                                    ajaxCache: ajaxCache,
                                                    pid: PageID,
                                                    scrollTop: Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.e)(),
                                                    htitle: document.title.toString(),
                                                    width: vk.width,
                                                    width_dec: vk.width_dec,
                                                    width_dec_footer: vk.width_dec_footer,
                                                    noleftmenu: vk.noleftmenu,
                                                    notopmenu: vk.notopmenu,
                                                    nobottommenu: vk.nobottommenu,
                                                    bodyClass: vk.body_class,
                                                    back: !!_tbLink.loc && [_tbLink.loc, Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ya)(_tbLink), _tbLink.fast]
                                                }, tNode && tNode.parentNode && !Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Aa)(tNode.parentNode) && (hist.hideHeader = !0), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.b)(hist.loc), globalHistory.length > 2) {
                                                var h = globalHistory.shift();
                                                Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.g)(h.cur), h.content.innerHTML = ""
                                            }
                                            if (cur._back.hide)
                                                for (var _i5 = 0, _l3 = cur._back.hide.length; _i5 < _l3; _i5++) cur._back.hide[_i5]();
                                            _back.text && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.i)(hist.loc, _back.text, 1)
                                        } else _tbLink && (_tbLink.fast = 0), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.g)(cur);
                                        if (PageID = NextPageID, Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.f)(radioBtns, function(e, t) {
                                                t.keep || delete radioBtns[e]
                                            }), window.ajaxCache = {}, boxQueue.hideAll(!1, !0), layerQueue.clear(), layers.fullhide && layers.fullhide(!0), window.cur = {
                                                destroy: [],
                                                nav: []
                                            }, window._stlWas = 0, newPage) {
                                            for (Object(_dom__WEBPACK_IMPORTED_MODULE_4__.g)("quick_login_button", "quick_expire", "search_form", "top_links", "bottom_nav"); globalHistory.length;) {
                                                var _h = globalHistory.shift();
                                                Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.g)(_h.cur), _h.content.innerHTML = ""
                                            }
                                            var oldTopW = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.F)("dev_top_nav_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.N)("dev_top_nav_wrap")[0] || Object(_dom__WEBPACK_IMPORTED_MODULE_4__.F)("page_header_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.N)("page_header_wrap")[0] || 0;
                                            pageNode.innerHTML = html, oldTopW && !vk.staticheader && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.j)({
                                                width: oldTopW
                                            }), window._tbLink = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.F)("top_back_link");
                                            try {
                                                _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
                                            } catch (e) {}
                                            _browser__WEBPACK_IMPORTED_MODULE_13__.a.mobile || Object(_layout_utils__WEBPACK_IMPORTED_MODULE_10__.j)(!0)
                                        } else {
                                            if (_back) {
                                                var newW = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.e)("div", {
                                                    id: "wrap3"
                                                });
                                                Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.i)(hist, {
                                                    content: wNode.parentNode.replaceChild(newW, wNode),
                                                    title: tNode.innerHTML
                                                }), globalHistory.push(hist), wNode = newW
                                            }
                                            var _oldTopW = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.F)("dev_top_nav_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.N)("dev_top_nav_wrap")[0] || Object(_dom__WEBPACK_IMPORTED_MODULE_4__.F)("page_header_wrap") && Object(_dom__WEBPACK_IMPORTED_MODULE_4__.N)("page_header_wrap")[0] || 0;
                                            wNode && (wNode.innerHTML = html), _oldTopW && !vk.staticheader && Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.j)({
                                                width: _oldTopW
                                            }), tNode && (tNode.innerHTML = title), (title ? _dom__WEBPACK_IMPORTED_MODULE_4__.Ta : _dom__WEBPACK_IMPORTED_MODULE_4__.W)(tNode.parentNode), Object(_feature_entries__WEBPACK_IMPORTED_MODULE_14__.j)().updateCurrentPlaying()
                                        }
                                        if (Object(_layout_utils__WEBPACK_IMPORTED_MODULE_10__.c)(), Object(_stl__WEBPACK_IMPORTED_MODULE_16__.b)(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.k)(), Object(_accessibility__WEBPACK_IMPORTED_MODULE_15__.c)(), _top_search__WEBPACK_IMPORTED_MODULE_0__.a.clear(), window.LazyLoad && LazyLoad.scanDelayed(), Object(_nav_utils__WEBPACK_IMPORTED_MODULE_9__.d)(params), opts.preventScroll || (opts.scrollTop > 0 ? Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.g)(opts.scrollTop, 0) : opts.noscroll || params.noscroll || Object(_scroll__WEBPACK_IMPORTED_MODULE_6__.f)(0)), opts.bench && (ajax.tRender = (new Date).getTime()), Nav.curLoc = params.loc, js) {
                                            var evalString = "(function(){" + js + ";})()";
                                            if (__debugMode) eval(evalString);
                                            else try {
                                                eval(evalString)
                                            } catch (e) {
                                                Object(_debug_tools__WEBPACK_IMPORTED_MODULE_3__.d)(e, evalString)
                                            }
                                        }
                                        ajax._framenext(), opts.onDone && opts.onDone(), _browser__WEBPACK_IMPORTED_MODULE_13__.a.mobile && Object(_layout_utils__WEBPACK_IMPORTED_MODULE_10__.j)(), changed.f && Object(_utils__WEBPACK_IMPORTED_MODULE_17__.f)(changed.f), Nav.setLoc(params.loc || ""), changed[0] && (window.vkLastNav = Date.now()), Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.B)(function() {
                                            Object(_feature_entries__WEBPACK_IMPORTED_MODULE_14__.j)().updateCurrentPlaying(), TopMenu.toggle(!1)
                                        }, _browser__WEBPACK_IMPORTED_MODULE_13__.a.chrome ? 100 : 50)
                                    }
                                }
                            };
                        return window.Page && (Page.postsSave(), Page.postsSend(), Page.postsClearTimeouts()), Object(_ads__WEBPACK_IMPORTED_MODULE_2__.c)(), Object(_ads__WEBPACK_IMPORTED_MODULE_2__.a)("already"), "im" !== Nav.objLoc[0] && "im" !== changed[0] || (where.params = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.i)({}, where.params, {
                            _full_page: !0
                        })), ajax.post(where.url, where.params, {
                            onDone: function() {
                                var e = arguments;
                                if (__debugMode) done.apply(null, e);
                                else try {
                                    done.apply(null, e)
                                } catch (t) {
                                    Object(_ui_util__WEBPACK_IMPORTED_MODULE_7__.c)(t, {
                                        dt: 15,
                                        type: 6,
                                        url: where.url,
                                        query: Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.b)(where.params),
                                        js: e[2],
                                        answer: Array.prototype.slice.call(arguments).join("<!>")
                                    })
                                }
                            },
                            onFail: opts.onFail || function(e) {
                                if (e) return setTimeout(Object(_message_box__WEBPACK_IMPORTED_MODULE_18__.d)({
                                    title: Object(_lang__WEBPACK_IMPORTED_MODULE_19__.d)("global_error")
                                }, e).hide, __debugMode ? 3e4 : 3e3), !0
                            },
                            frame: opts.noframe ? 0 : 1,
                            canReload: !0,
                            showProgress: opts.showProgress,
                            hideProgress: opts.hideProgress,
                            cache: opts.search ? 1 : "",
                            bench: opts.bench
                        }), !1
                    }
                },
                setLoc: function(e) {
                    "string" == typeof e ? (Nav.strLoc = e, Nav.objLoc = Nav.fromStr(e)) : (Nav.strLoc = Nav.toStr(e), Nav.objLoc = e), hab.setLoc(Nav.strLoc)
                },
                change: function(e, t, o) {
                    var n = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.d)(Nav.objLoc);
                    return Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.f)(e, function(e, t) {
                        !1 === t ? delete n[e] : n[e] = t
                    }), Nav.go(n, t, o)
                },
                fromStr: function(e) {
                    var t = (e = e.split("#"))[0].split("?"),
                        o = {
                            0: t[0] || ""
                        };
                    return e[1] && (o["#"] = e[1]), Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.i)(Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.f)(t[1] || ""), o)
                },
                toStr: function(e) {
                    var t = (e = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.d)(e))["#"] || "",
                        o = e[0] || "";
                    delete e[0], delete e["#"];
                    var n = Object(_ajax__WEBPACK_IMPORTED_MODULE_8__.b)(e);
                    return (n ? o + "?" + n : o) + (t ? "#" + t : "")
                },
                init: function() {
                    window.globalHistory = [], Nav.strLoc = hab.getLoc(), Nav.objLoc = Nav.fromStr(Nav.strLoc)
                },
                getPostParams: function(e, t) {
                    var o = {};
                    if (!!(!e || !e.getAttribute)) return o;
                    var n = e.getAttribute("data-post-id");
                    n && (o.post_id = n);
                    var i = e.getAttribute("data-parent-post-id");
                    i && (o.parent_post_id = i);
                    var r = e.getAttribute("data-post-click-type");
                    r && (o.post_click_type = r);
                    var _ = e.getAttribute("mention_id");
                    _ && (o.post_click_mention_id = _);
                    var a = e.getAttribute("data-post-click-cc-key");
                    a && (o.post_click_cc_key = a);
                    var c = [e.getAttribute("href"), e.getAttribute("data-href")];
                    if (Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.f)(c, function(e, t) {
                            if (t && "#" !== t) return o.post_click_url = t, !1
                        }), !!r || t) {
                        var s = Object(_dom__WEBPACK_IMPORTED_MODULE_4__.T)("_ads_block_data_w", e),
                            d = (s = s || Object(_dom__WEBPACK_IMPORTED_MODULE_4__.T)("_ads_promoted_post_data_w", e)) && s.getAttribute("data-ad"),
                            u = s && s.getAttribute("data-ad-block-uid");
                        d && (o.ad_data = d), u && (o.ad_block_unique_id = u)
                    }
                    return o
                },
                mergePostParamsOptions: function(e, t) {
                    if (t = t || {}, !e) return t;

                    function o(e, o, n) {
                        var i = n && t[o];
                        return !(!e || i) && (t[o] = e, !0)
                    }
                    return o(e.post_id, "_post", !0), o(e.parent_post_id, "_parent_post", !0), o(e.post_click_type, "_post_click_type", !0), t._post_click_type && (o(e.post_click_mention_id, "_post_click_mention_id", !0), o(e.post_click_cc_key, "_post_click_cc_key", !0), o(e.post_click_url, "_post_click_url", !0), o(e.ad_data, "_post_ad_data", !0) && o(e.ad_block_unique_id, "_post_ad_block_unique_id")), t
                }
            };

        function authorPageNav(e, t, o) {
            if (o && cur.backFromAuthorPage) return delete cur.backFromAuthorPage, !0;
            var n = e.toLowerCase();
            if (/^(?:%40|@)-?[.a-z0-9_]+(?:\?\w+)?$/.test(n)) return boxRefreshCoords(boxLoader), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxLoader), Object(_dom__WEBPACK_IMPORTED_MODULE_4__.Ta)(boxLayerWrap), stManager.add([jsc("web/author_page.js"), jsc("web/article_layer.js"), "author_page.css", "ui_controls.js", "ui_controls.css"], function() {
                window.AuthorPage.showLayer(n)
            }), !0;
            if (window.AuthorPage && window.AuthorPage.isOpen()) {
                if (o && window.AuthorPage.isStandalone()) return window.location.reload(!0), !0;
                var i = window.AuthorPage.close(!0);
                return void 0 !== i ? i : !!o
            }
        }

        function articleNav(e, t, o, n) {
            var i = e.toLowerCase(),
                r = /^(?:%40|@)-?[.a-z0-9_]+-[a-z0-9-]+(?:\?\w+\=[a-z0-9-]+)?$/;
            if (r.test(i)) return window.isArticleLayerOpen() || (cur.articlePrevLoc = t), window.WkView && WkView.hide(!0), window.boxQueue && boxQueue.hideAll(), stManager.add([jsc("web/article_layer.js"), "article.css"], function() {
                ArticleLayer.show(i, !0), cur.articleSequence = (cur.articleSequence || 0) + (o ? -1 : 1)
            }), !0;
            if (window.isArticleLayerOpen()) {
                if (o && ArticleLayer.isStandalone()) return window.location.reload(!0), !0;
                var _ = function() {
                        ArticleLayer.close(), delete cur.articleSequence
                    },
                    a = cur.articlePrevLoc;
                return delete cur.articlePrevLoc, a && !r.test(a) ? e === a ? (_(), !0) : (layers.fullhide = function() {
                    _()
                }, !1) : (_(), !0)
            }
            return !1
        }
        __webpack_exports__.a = Nav
    },
    Mukb: function(e, t, o) {
        var n = o("hswa"),
            i = o("RjD/");
        e.exports = o("nh4g") ? function(e, t, o) {
            return n.f(e, t, i(1, o))
        } : function(e, t, o) {
            return e[t] = o, e
        }
    },
    OP3Y: function(e, t, o) {
        var n = o("aagx"),
            i = o("S/j/"),
            r = o("YTvA")("IE_PROTO"),
            _ = Object.prototype;
        e.exports = Object.getPrototypeOf || function(e) {
            return e = i(e), n(e, r) ? e[r] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? _ : null
        }
    },
    QGEU: function(e, t, o) {
        "use strict";
        o.d(t, "a", function() {
            return a
        }), o.d(t, "d", function() {
            return c
        }), o.d(t, "b", function() {
            return s
        }), o.d(t, "c", function() {
            return u
        });
        var n = o("v+DW"),
            i = o("t7n3"),
            r = o("zxIV"),
            _ = o("4+be");

        function a() {
            return !(!window.vk || !vk.a11y)
        }

        function c() {
            clearTimeout(cur.updateOnlineTO), cur.updateOnlineTO = setTimeout(function() {
                Object(i.f)(Object(r.G)("_online"), function() {
                    var e = Object(r.H)("_online_reader", this) || this,
                        t = Object(r.V)(this, "online"),
                        o = Object(r.V)(this, "mobile"),
                        n = Object(r.I)("img", e),
                        a = function(e) {
                            var t = Object(r.n)("_post", e),
                                o = t && Object(r.j)(t, "author");
                            return o ? o.innerText || o.textContent : ""
                        };
                    if (t) {
                        var c = "";
                        Object(i.f)(n, function() {
                            var e = Object(r.c)(this, "alt") || Object(r.c)(this, "data-alt") || a(this);
                            e && (c = Object(i.H)(c + " " + e), this.setAttribute("data-alt", e), this.removeAttribute("alt"))
                        }), c = Object(i.H)(c + " " + (o ? Object(_.d)("global_user_is_online_mobile") : Object(_.d)("global_user_is_online"))), e.setAttribute("aria-label", c)
                    } else Object(i.f)(n, function() {
                        var e = Object(r.c)(this, "data-alt") || a(this);
                        e && (this.setAttribute("alt", e), this.removeAttribute("data-alt"))
                    }), e.removeAttribute("aria-label")
                })
            }, 100)
        }

        function s() {
            clearTimeout(cur.updateChkBoxTO), cur.updateChkBoxTO = setTimeout(function() {
                var e = [];
                Object(i.f)(["checkbox", "checkbox_pic"], function() {
                    e = e.concat(Object(r.G)(this))
                }), Object(i.f)(e, function() {
                    "DIV" !== this.tagName || this.getAttribute("role") || (this.setAttribute("role", "checkbox"), this.setAttribute("aria-checked", Object(n.l)(this) ? "true" : "false"), this.setAttribute("tabindex", 0))
                })
            }, 100)
        }

        function d() {
            clearTimeout(cur.updateRadioBtnsTO), cur.updateRadioBtnsTO = setTimeout(function() {
                var e = [],
                    t = Object(r.G)("radiobtn");
                Object(i.f)(t, function() {
                    if ("DIV" === this.tagName && !this.getAttribute("role")) {
                        var t = Object(n.l)(this);
                        this.setAttribute("role", "radio"), this.setAttribute("aria-checked", t ? "true" : "false"), this.setAttribute("tabindex", t ? 0 : -1);
                        var o = function(e) {
                            var t = 0,
                                o = e;
                            for (; t < 5 && o !== document;) {
                                o = Object(r.z)(o);
                                var n = Object(r.G)("radiobtn", o);
                                if (n.length > 1) break;
                                t++
                            }
                            return o
                        }(this);
                        ~e.indexOf(o) || e.push(o)
                    }
                }), Object(i.f)(e, function() {
                    if (!Object(r.G)("on", this).length) {
                        var e = Object(r.G)("radiobtn", this);
                        e.length && e[0].setAttribute("tabindex", 0)
                    }
                })
            }, 100)
        }

        function u() {
            c(), s(), d()
        }
    },
    QaDb: function(e, t, o) {
        "use strict";
        var n = o("Kuth"),
            i = o("RjD/"),
            r = o("fyDq"),
            _ = {};
        o("Mukb")(_, o("K0xU")("iterator"), function() {
            return this
        }), e.exports = function(e, t, o) {
            e.prototype = n(_, {
                next: i(1, o)
            }), r(e, t + " Iterator")
        }
    },
    RYi7: function(e, t) {
        var o = Math.ceil,
            n = Math.floor;
        e.exports = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? n : o)(e)
        }
    },
    "RjD/": function(e, t) {
        e.exports = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        }
    },
    "S/j/": function(e, t, o) {
        var n = o("vhPU");
        e.exports = function(e) {
            return Object(n(e))
        }
    },
    SlkY: function(e, t, o) {
        var n = o("m0Pp"),
            i = o("H6hf"),
            r = o("M6Qj"),
            _ = o("y3w9"),
            a = o("ne8i"),
            c = o("J+6e");
        e.exports = function(e, t, o, s, d) {
            var u, l, p, b = d ? function() {
                    return e
                } : c(e),
                f = n(o, s, t ? 2 : 1),
                h = 0;
            if ("function" != typeof b) throw TypeError(e + " is not iterable!");
            if (r(b))
                for (u = a(e.length); u > h; h++) t ? f(_(l = e[h])[0], l[1]) : f(e[h]);
            else
                for (p = b.call(e); !(l = p.next()).done;) i(p, f, l.value, t)
        }
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
    UqcF: function(e, t) {
        t.f = {}.propertyIsEnumerable
    },
    VTer: function(e, t, o) {
        var n = o("dyZX"),
            i = n["__core-js_shared__"] || (n["__core-js_shared__"] = {});
        e.exports = function(e) {
            return i[e] || (i[e] = {})
        }
    },
    VXxg: function(e, t, o) {
        o("Btvt"), o("XfO3"), o("rGqo"), o("T39b"), e.exports = o("g3g5").Set
    },
    XKFU: function(e, t, o) {
        var n = o("dyZX"),
            i = o("g3g5"),
            r = o("Mukb"),
            _ = o("KroJ"),
            a = o("m0Pp"),
            c = function(e, t, o) {
                var s, d, u, l, p = e & c.F,
                    b = e & c.G,
                    f = e & c.S,
                    h = e & c.P,
                    w = e & c.B,
                    O = b ? n : f ? n[t] || (n[t] = {}) : (n[t] || {}).prototype,
                    m = b ? i : i[t] || (i[t] = {}),
                    v = m.prototype || (m.prototype = {});
                for (s in b && (o = t), o) u = ((d = !p && O && void 0 !== O[s]) ? O : o)[s], l = w && d ? a(u, n) : h && "function" == typeof u ? a(Function.call, u) : u, O && _(O, s, u, e & c.U), m[s] != u && r(m, s, l), h && v[s] != u && (v[s] = u)
            };
        n.core = i, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
    },
    XMVh: function(e, t, o) {
        var n = o("K0xU")("iterator"),
            i = !1;
        try {
            var r = [7][n]();
            r.return = function() {
                i = !0
            }, Array.from(r, function() {
                throw 2
            })
        } catch (e) {}
        e.exports = function(e, t) {
            if (!t && !i) return !1;
            var o = !1;
            try {
                var r = [7],
                    _ = r[n]();
                _.next = function() {
                    o = !0
                }, r[n] = function() {
                    return _
                }, e(r)
            } catch (e) {}
            return o
        }
    },
    Xbzi: function(e, t, o) {
        var n = o("0/R4"),
            i = o("i5dc").set;
        e.exports = function(e, t, o) {
            var r, _ = t.constructor;
            return _ !== o && "function" == typeof _ && (r = _.prototype) !== o.prototype && n(r) && i && i(e, r), e
        }
    },
    XfO3: function(e, t, o) {
        "use strict";
        var n = o("AvRE")(!0);
        o("Afnz")(String, "String", function(e) {
            this._t = String(e), this._i = 0
        }, function() {
            var e, t = this._t,
                o = this._i;
            return o >= t.length ? {
                value: void 0,
                done: !0
            } : (e = n(t, o), this._i += e.length, {
                value: e,
                done: !1
            })
        })
    },
    XuKo: function(e, t, o) {
        "use strict";
        o.d(t, "c", function() {
            return d
        }), o.d(t, "b", function() {
            return u
        }), o.d(t, "d", function() {
            return p
        }), o.d(t, "a", function() {
            return f
        });
        var n = o("EasH"),
            i = o("kcIO"),
            r = o("4+be"),
            _ = o("El3O"),
            a = o("zxIV"),
            c = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var o = [],
                            n = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var _, a = e[Symbol.iterator](); !(n = (_ = a.next()).done) && (o.push(_.value), !t || o.length !== t); n = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return o
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            s = !1;

        function d(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (cur.storiesNotSupported) return Object(n.d)(Object(r.d)("global_error"), Object(r.d)("stories_bad_browser"));
            Object(i.b)() && Object(i.b)().bodyNode.contains(t.fromEl) && (Object(i.b)().hide(), t.fromEl = null), clearTimeout(s), s = setTimeout(function() {
                bodyNode.appendChild(Object(a.e)("div", {
                    id: "stories_loader",
                    innerHTML: Object(_.f)("stories_loader_pr", "pr_baw pr_medium") + '<div class="back"></div>'
                }))
            }, 1e3);
            var o = ["stories.js", "stories.css", jsc("web/emoji.js"), "videoview.js", "videoplayer.js", "videoplayer.css", "hls.min.js"];
            stManager.add(o, function() {
                var o = window.Stories;
                clearTimeout(s), Object(a.Fa)("stories_loader"), o.show(e, t)
            })
        }

        function u(e, t) {
            var o = e.split("_"),
                n = c(o, 2),
                r = n[0],
                _ = n[1];
            if (r && _) {
                if (Object(i.b)() || window.wkcur && window.wkcur.shown) return window.open("/narrative" + e);
                d(r + "/narrative" + e, t)
            }
        }
        var l = !1;

        function p() {
            l || cur.storiesNotSupported || (l = !0, stManager.add(["stories.js", "stories.css"]))
        }
        var b = !1;

        function f(e, t) {
            b || (b = !0, ajax.post("al_stories.php", {
                act: "send_mask",
                mask_id: e,
                hash: t
            }, {
                loader: !0,
                onDone: function(e, t, o, _) {
                    "cant_send" === e ? Object(n.d)({
                        title: t,
                        width: 460
                    }, o, _) : Object(i.e)(Object(r.d)("stories_mask_sent")), b = !1
                },
                onFail: function() {
                    return b = !1, Object(n.d)({
                        title: Object(r.d)("global_box_error_title")
                    }, Object(r.d)("global_unknown_error")), !0
                }
            }))
        }
    },
    XzvV: function(e, t, o) {
        "use strict";
        o.d(t, "a", function() {
            return _
        });
        var n = o("kMSP"),
            i = o("t7n3"),
            r = o("0DAA");

        function _(e, t) {
            if (void 0 !== e && void 0 !== t) {
                var o = Array.from(arguments).slice(2),
                    _ = void 0;
                ! function e(t, o, n) {
                    var i = "lockkk_" + t;
                    if (!0 === r.a.get(i)) r.a.checkVersion() ? n || setTimeout(e.pbind(t, o, !0), 100) : o();
                    else {
                        r.a.set(i, !0);
                        try {
                            o()
                        } catch (e) {}
                        r.a.set(i, !1)
                    }
                }("stats_cookie_lock", function() {
                    try {
                        _ = (_ = JSON.parse(Object(n.a)("remixsts"))).data
                    } catch (e) {
                        _ = []
                    }
                    for (_.push([Math.round(Date.now() / 1e3), e, t].concat(o)); _.length > 100;) _.shift();
                    var r = Math.round(Object(i.D)(0, 1e9));
                    Object(n.d)("remixsts", JSON.stringify({
                        data: _,
                        uniqueId: r
                    }), .01)
                })
            }
        }
    },
    YTvA: function(e, t, o) {
        var n = o("VTer")("keys"),
            i = o("ylqs");
        e.exports = function(e) {
            return n[e] || (n[e] = i(e))
        }
    },
    Ymqv: function(e, t, o) {
        var n = o("LZWt");
        e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
            return "String" == n(e) ? e.split("") : Object(e)
        }
    },
    Z6vF: function(e, t, o) {
        var n = o("ylqs")("meta"),
            i = o("0/R4"),
            r = o("aagx"),
            _ = o("hswa").f,
            a = 0,
            c = Object.isExtensible || function() {
                return !0
            },
            s = !o("eeVq")(function() {
                return c(Object.preventExtensions({}))
            }),
            d = function(e) {
                _(e, n, {
                    value: {
                        i: "O" + ++a,
                        w: {}
                    }
                })
            },
            u = e.exports = {
                KEY: n,
                NEED: !1,
                fastKey: function(e, t) {
                    if (!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                    if (!r(e, n)) {
                        if (!c(e)) return "F";
                        if (!t) return "E";
                        d(e)
                    }
                    return e[n].i
                },
                getWeak: function(e, t) {
                    if (!r(e, n)) {
                        if (!c(e)) return !0;
                        if (!t) return !1;
                        d(e)
                    }
                    return e[n].w
                },
                onFreeze: function(e) {
                    return s && u.NEED && c(e) && !r(e, n) && d(e), e
                }
            }
    },
    aCFj: function(e, t, o) {
        var n = o("Ymqv"),
            i = o("vhPU");
        e.exports = function(e) {
            return n(i(e))
        }
    },
    aagx: function(e, t) {
        var o = {}.hasOwnProperty;
        e.exports = function(e, t) {
            return o.call(e, t)
        }
    },
    aong: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "o", function() {
            return throttleAccumulate
        }), __webpack_require__.d(__webpack_exports__, "i", function() {
            return lplog
        }), __webpack_require__.d(__webpack_exports__, "p", function() {
            return toArray
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return arrayUnique
        }), __webpack_require__.d(__webpack_exports__, "r", function() {
            return unpackStore
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return debounce
        }), __webpack_require__.d(__webpack_exports__, "n", function() {
            return throttle
        }), __webpack_require__.d(__webpack_exports__, "m", function() {
            return shuffle
        }), __webpack_require__.d(__webpack_exports__, "k", function() {
            return parallel
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return hashCode
        }), __webpack_require__.d(__webpack_exports__, "l", function() {
            return parseJSON
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return checkTextLength
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return getSelectionText
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return goAway
        }), __webpack_require__.d(__webpack_exports__, "h", function() {
            return isFullScreen
        }), __webpack_require__.d(__webpack_exports__, "s", function() {
            return updateMoney
        }), __webpack_require__.d(__webpack_exports__, "q", function() {
            return toggleOnline
        }), __webpack_require__.d(__webpack_exports__, "j", function() {
            return onlinePlatformClass
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return handleScroll
        });
        var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("t7n3"),
            _ui_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ryw6"),
            _debug_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("98sY"),
            _cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("kMSP"),
            _ajax__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Kngp"),
            _message_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("EasH"),
            _dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("zxIV"),
            _lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("4+be"),
            _browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("gdug"),
            _accessibility__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("QGEU"),
            _dom_events__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("Egk5"),
            _scroll__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("lXE5");

        function throttleAccumulate(e, t) {
            var o = [],
                n = 0;
            return function(i) {
                o.push(i), n || (n = setTimeout(function() {
                    n = !1, e(o), o = []
                }, t))
            }
        }

        function executionStackPop(e) {
            return e.length > 0 && e.pop().func(), e
        }

        function lplog(e, t) {
            var o = void 0,
                n = void 0;
            if (window.__debugMode) {
                switch (t) {
                    case "error":
                        o = "color: red", n = "background: red; color: white";
                        break;
                    case "success":
                        o = "color: green", n = "background: green; color: white";
                        break;
                    default:
                        o = "color: blue;", n = "background: #000; color: #fff;"
                }
                try {
                    var i = new Date;
                    console.debug("%cLP:[" + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds() + ":" + i.getMilliseconds() + "]%c " + e, n, o)
                } catch (e) {}
            }
        }

        function toArray(e) {
            var t = [];
            if (void 0 === e.length) return Object.keys(e).map(function(t) {
                return e[t]
            });
            for (var o = 0; o < e.length; o++) t.push(e[o]);
            return t
        }

        function arrayUnique(e) {
            for (var t = {}, o = [], n = 0; n < e.length; n++) t[e[n]] || (o.push(e[n]), t[o[n]] = 1);
            return o
        }

        function unpackStore(e) {
            return e.get ? e.get() : e
        }

        function debounce(e, t, o) {
            var n = void 0;
            return function() {
                var i = this,
                    r = arguments,
                    _ = o && !n;
                clearTimeout(n), n = setTimeout(function() {
                    n = null, o || e.apply(i, r)
                }, t), _ && e.apply(this, r)
            }
        }

        function throttle(e, t) {
            var o = void 0;
            return function() {
                o || (e.apply(this, arguments), o = setTimeout(function() {
                    o = !1
                }, t))
            }
        }

        function shuffle(e) {
            for (var t = e.length; t > 0;) {
                var o = Math.floor(Math.random() * t),
                    n = e[--t];
                e[t] = e[o], e[o] = n
            }
            return e
        }

        function parallel() {
            var e = [].slice.call(arguments),
                t = e.pop(),
                o = new CallHub(t, e.length);
            Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(e, function(e, t) {
                return t(function() {
                    return o.done()
                })
            })
        }

        function hashCode(e) {
            var t = 0;
            if (0 === e.length) return t;
            for (var o = 0, n = e.length; o < n; o++) {
                t = (t << 5) - t + e.charCodeAt(o), t |= 0
            }
            return t
        }

        function parseJSON(obj) {
            if (window.JSON && JSON.parse) try {
                return JSON.parse(obj)
            } catch (e) {
                Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__.c)("<b>parseJSON:</b> " + e.message, {
                    dt: -1,
                    type: 5,
                    answer: obj
                });
                var evalString = "(" + obj + ")";
                try {
                    return eval(evalString)
                } catch (e) {
                    if (__debugMode) throw e;
                    Object(_debug_tools__WEBPACK_IMPORTED_MODULE_2__.d)(e, evalString)
                }
            } else {
                var _evalString = "(" + obj + ")";
                try {
                    return eval(_evalString)
                } catch (e) {
                    if (__debugMode) throw e;
                    Object(_debug_tools__WEBPACK_IMPORTED_MODULE_2__.d)(e, _evalString)
                }
            }
        }

        function checkTextLength(e, t, o, n, i, r, _) {
            var a = t.getValue ? t.getValue() : t.value,
                c = t.lastLen || 0;
            if (t.lastLen !== a.length || r) {
                t.lastLen = a.length;
                var s = {
                        "&": 5,
                        "<": 4,
                        ">": 4,
                        '"': 6,
                        "\n": n ? 1 : 4,
                        "\r": 0,
                        "!": 5,
                        "'": 5,
                        $: 6,
                        "\\": 6
                    },
                    d = {
                        1168: 1,
                        1169: 1,
                        8211: 1,
                        8212: 1,
                        8216: 1,
                        8217: 1,
                        8218: 1,
                        8230: 1,
                        8240: 1,
                        8249: 1,
                        8250: 1,
                        8364: 1,
                        8470: 1,
                        8482: 1,
                        65533: 1
                    },
                    u = {
                        1037: 1,
                        1104: 1,
                        1117: 1
                    };
                i && (s[","] = 5);
                var l = function(e) {
                    for (var t = 0, o = 0, n = e.length; o < n; o++) {
                        var i = s[e.charAt(o)],
                            r = e.charCodeAt(o);
                        t += void 0 !== i ? i : !_ && r >= 128 && (r < 1025 || u[r] || r > 1119) && !d[r] && (r < 8220 || r > 8222) && (r < 8224 || r > 8226) ? ("&#" + r + ";").length : 1
                    }
                    return t
                }(a);
                if (o = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)(o), l > Math.max(e - 100, .75 * e))
                    if (Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Ta)(o), l > e)
                        if (i) {
                            var p = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Ya)(t, function(e, t) {
                                for (var o = 0, n = "", i = 0, r = e.length; i < r; i++) {
                                    var a = e.charAt(i),
                                        c = s[a],
                                        l = e.charCodeAt(i);
                                    if ((o += void 0 !== c ? c : !_ && l >= 128 && (l < 1025 || u[l] || l > 1119) && !d[l] && (l < 8220 || l > 8222) && (l < 8224 || l > 8226) ? ("&#" + l + ";").length : 1) > t) break;
                                    n += a
                                }
                                return n
                            }(a, Math.min(e, c)));
                            t.lastLen = p.length, o.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("text_N_symbols_remain", 0)
                        } else o.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("text_exceeds_symbol_limit", l - e);
                else o.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("text_N_symbols_remain", e - l);
                else Object(_dom__WEBPACK_IMPORTED_MODULE_6__.W)(o)
            }
        }

        function getSelectionText() {
            var e = "";
            return window.getSelection ? e = window.getSelection().toString() : document.selection && "Control" !== document.selection.type && (e = document.selection.createRange().text), e
        }

        function goAway(e, t, o) {
            if (-1 !== (t || {}).h || Object(_dom_events__WEBPACK_IMPORTED_MODULE_10__.d)(o)) return !0;
            if (-1 !== (t || {}).h) {
                var n = e.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i);
                if (n && "api." !== n[1].toLowerCase()) return location.href = e, !1;
                var i = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.r)(Object(_cookies__WEBPACK_IMPORTED_MODULE_3__.a)("remixsettings_bits"));
                if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(_ajax__WEBPACK_IMPORTED_MODULE_4__.d) || 1 & i) return window.open("/away.php?to=" + encodeURIComponent(e) + (t && void 0 !== t.h ? "&h=" + t.h : ""), "_blank"), !1
            }
            var r = Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.i)({
                act: "a_go",
                to: e
            }, t || {});
            return !Object(_message_box__WEBPACK_IMPORTED_MODULE_5__.b)("away.php", r, {}, o)
        }

        function isFullScreen() {
            return !!(document.fullscreenElement || document.fullScreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || cur.pvPartScreen)
        }

        function updateMoney(e, t) {
            if (void 0 !== e && !1 !== e) {
                var o = "";
                !0 === t ? (vk.balanceEx = e, o = "_ex") : vk.balance = e;
                var n = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.G)("votes_balance_nom" + o);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(n, function(t, o) {
                    return o.innerHTML = e + " " + Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("votes_flex", e)
                });
                var i = e * (vk.vcost || 7),
                    r = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.G)("money_balance_nom" + o);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.f)(r, function(e, t) {
                    return t.innerHTML = Object(_lang__WEBPACK_IMPORTED_MODULE_7__.d)("global_money_amount_rub", i, !0)
                }), void 0 !== t && !1 !== t && !0 !== t && updateMoney(t, !0)
            }
        }

        function toggleOnline(e, t) {
            var o = onlinePlatformClass(t).split(" "),
                n = [];
            ["online", "mobile", "_online"].forEach(function(t) {
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.o)(t, o) && !Object(_dom__WEBPACK_IMPORTED_MODULE_6__.V)(e, t) ? n.push(t) : !Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__.o)(t, o) && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.V)(e, t) && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Ha)(e, t)
            }), n.length > 0 && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.a)(e, n.join(" "))
        }

        function onlinePlatformClass(e) {
            var t = " _online";
            return e && (t += " online"), _browser__WEBPACK_IMPORTED_MODULE_8__.d[e] && (t += " mobile"), Object(_accessibility__WEBPACK_IMPORTED_MODULE_9__.d)(), t
        }

        function handleScroll(e) {
            e = e.split(",");
            var t = cur.named || {},
                o = e[0] && (t[e[0]] || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)(e[0])) || !1,
                n = e[1] && (t[e[1]] || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)(e[1])) || !1;
            if (!o && !n) {
                if (!(o = document.getElementsByName(e[0])[0])) return;
                o = o.nextSibling
            }
            var i = Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)("page_header_wrap") || Object(_dom__WEBPACK_IMPORTED_MODULE_6__.F)("dev_top_nav_wrap");
            setTimeout(function() {
                o && Object(_scroll__WEBPACK_IMPORTED_MODULE_11__.g)(Object(_dom__WEBPACK_IMPORTED_MODULE_6__.Q)(o)[1] - (i ? Object(_dom__WEBPACK_IMPORTED_MODULE_6__.N)(i)[1] : 0), 0), n && Object(_dom__WEBPACK_IMPORTED_MODULE_6__.E)(n)
            }, 300)
        }
    },
    apmT: function(e, t, o) {
        var n = o("0/R4");
        e.exports = function(e, t) {
            if (!n(e)) return e;
            var o, i;
            if (t && "function" == typeof(o = e.toString) && !n(i = o.call(e))) return i;
            if ("function" == typeof(o = e.valueOf) && !n(i = o.call(e))) return i;
            if (!t && "function" == typeof(o = e.toString) && !n(i = o.call(e))) return i;
            throw TypeError("Can't convert object to primitive value")
        }
    },
    dyZX: function(e, t) {
        var o = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = o)
    },
    eNQP: function(e, t, o) {
        "use strict";
        o.d(t, "a", function() {
            return _
        }), o.d(t, "b", function() {
            return a
        }), o.d(t, "c", function() {
            return c
        });
        var n = o("XzvV"),
            i = o("t7n3");

        function r(e, t) {
            for (var o = void 0, n = 0; n < t.length; n++)
                if (">" === (o = t[n])) o = ">" + t[n - 1];
                else {
                    if (1e3 * o > e) {
                        o = "<" + o;
                        break
                    }
                    o = !1
                }
            return o
        }

        function _() {
            var e = {},
                t = [15, 60, 300, 1500, 5e3, 1e4, 15e3, 2e4, 25e3, 3e4],
                o = [300, 1500, 5e3, 3e4, 6e4, 12e4, ">"],
                i = !1;
            setInterval(function() {
                var _ = window.cur && window.cur.module;
                _ !== i && (e = {}, i = _);
                var a = window.vkLastNav;
                if (_ && a) {
                    var c = r(Date.now() - a, t);
                    if (c && !e[c]) {
                        var s = r(Date.now() - window.vkTabLoaded, o);
                        e[c] = !0;
                        var d = performance.memory.usedJSHeapSize;
                        Object(n.a)("js_memory_stats_modules", d, _, c, s)
                    }
                }
            }, 5e3)
        }

        function a() {
            if (Math.random() < .001 && window.performance && window.performance.getEntriesByType) {
                if (window.clientStatsInited) return !1;
                var e = window.performance.getEntriesByType("resource");
                if (!e) return !1;
                for (var t = {}, o = {}, r = 0; r < e.length; r++)
                    if (e[r] && "img" === e[r].initiatorType)
                        if (e[r].duration < 100) t["<100"] = (t["<100"] || 0) + 1;
                        else if (e[r].duration < 250) t["100-250"] = (t["100-250"] || 0) + 1;
                else if (e[r].duration < 500) t["250-500"] = (t["250-500"] || 0) + 1;
                else if (e[r].duration < 1e3) t["500-1000"] = (t["500-1000"] || 0) + 1;
                else if (e[r].duration < 2e3) t["1000-2000"] = (t["1000-2000"] || 0) + 1;
                else if (e[r].duration < 5e3) t["2000-5000"] = (t["2000-5000"] || 0) + 1;
                else if (t[">5000"] = (t[">5000"] || 0) + 1, e[r].name && e[r].name.indexOf("pp.vk.me") > 0) {
                    var _ = "";
                    (_ = (_ = e[r].name).substr(_.indexOf("pp.vk.me") + 9)).indexOf("/") > 0 && (o[_ = _.substr(0, _.indexOf("/"))] = (o[_] || 0) + 1)
                }
                Object(i.f)(t, function(e, t) {
                    return Object(n.a)("img_load", t, e)
                }), Object(i.f)(o, function(e, t) {
                    return Object(n.a)("img_slow", t, e)
                }), window.clientStatsInited = !0
            }
        }

        function c() {
            if (window.clientStatsInitedNT) return !1;
            if (window.performance && performance.timing) {
                if (Math.random() > .001 && !__dev) return !1;
                var e = {},
                    t = window.cur && window.cur.module;
                performance.timing.redirectStart && performance.timing.redirectEnd && (e.redirect = performance.timing.redirectEnd - performance.timing.redirectStart), performance.timing.domainLookupStart && performance.timing.domainLookupEnd && (e.domainLookup = performance.timing.domainLookupEnd - performance.timing.domainLookupStart), performance.timing.connectStart && performance.timing.connectEnd && (e.connect = performance.timing.connectEnd - performance.timing.connectStart, performance.timing.secureConnectionStart && (e.secureConnection = performance.timing.connectEnd - performance.timing.secureConnectionStart)), performance.timing.requestStart && performance.timing.responseStart && (e.request = performance.timing.responseStart - performance.timing.requestStart, performance.timing.responseEnd && (e.response = performance.timing.responseEnd - performance.timing.responseStart)), performance.timing.unloadEventStart && performance.timing.unloadEventEnd && (e.unloadEvent = performance.timing.unloadEventEnd - performance.timing.unloadEventStart), performance.timing.domLoading && performance.timing.domComplete && (e.processing = performance.timing.domComplete - performance.timing.domLoading), performance.timing.domContentLoadedEventStart && performance.timing.domContentLoadedEventEnd && (e.domContentLoadedEvent = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart), performance.timing.loadEventStart && performance.timing.loadEventEnd && (e.loadEvent = performance.timing.loadEventEnd - performance.timing.loadEventStart), performance.timing.loadEventEnd && performance.timing.responseEnd && (e.resource = performance.timing.loadEventEnd - performance.timing.responseEnd), Object(i.f)(e, function(e, o) {
                    return Object(n.a)("navigation_timing", o, e, t)
                }), window.clientStatsInitedNT = !0
            }
        }
    },
    eeVq: function(e, t) {
        e.exports = function(e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    },
    elZq: function(e, t, o) {
        "use strict";
        var n = o("dyZX"),
            i = o("hswa"),
            r = o("nh4g"),
            _ = o("K0xU")("species");
        e.exports = function(e) {
            var t = n[e];
            r && t && !t[_] && i.f(t, _, {
                configurable: !0,
                get: function() {
                    return this
                }
            })
        }
    },
    fyDq: function(e, t, o) {
        var n = o("hswa").f,
            i = o("aagx"),
            r = o("K0xU")("toStringTag");
        e.exports = function(e, t, o) {
            e && !i(e = o ? e : e.prototype, r) && n(e, r, {
                configurable: !0,
                value: t
            })
        }
    },
    g3g5: function(e, t) {
        var o = e.exports = {
            version: "2.2.1"
        };
        "number" == typeof __e && (__e = o)
    },
    g42W: function(e, t, o) {
        "use strict";
        o.r(t);
        var n, i, r, _, a = o("qKs0"),
            c = o("VXxg");
        String.fromCodePoint || (n = function() {
            try {
                var e = {},
                    t = Object.defineProperty,
                    o = t(e, e, e) && t
            } catch (e) {}
            return o
        }(), i = String.fromCharCode, r = Math.floor, _ = function(e) {
            var t, o, n = [],
                _ = -1,
                a = arguments.length;
            if (!a) return "";
            for (var c = ""; ++_ < a;) {
                var s = Number(arguments[_]);
                if (!isFinite(s) || s < 0 || s > 1114111 || r(s) != s) throw RangeError("Invalid code point: " + s);
                s <= 65535 ? n.push(s) : (t = 55296 + ((s -= 65536) >> 10), o = s % 1024 + 56320, n.push(t, o)), (_ + 1 == a || n.length > 16384) && (c += i.apply(null, n), n.length = 0)
            }
            return c
        }, n ? n(String, "fromCodePoint", {
            value: _,
            configurable: !0,
            writable: !0
        }) : String.fromCodePoint = _), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
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
                        for (var r = Object.keys(Object(i)), _ = 0, a = r.length; _ < a; _++) {
                            var c = r[_],
                                s = Object.getOwnPropertyDescriptor(i, c);
                            void 0 !== s && s.enumerable && (o[c] = i[c])
                        }
                }
                return o
            }
        }), Number.isInteger = Number.isInteger || function(e) {
            return "number" == typeof e && isFinite(e) && Math.floor(e) === e
        };
        var s, d, u, l, p, b, f, h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        s = window, d = s.HTMLCanvasElement && s.HTMLCanvasElement.prototype, u = s.Blob && function() {
            try {
                return Boolean(new Blob)
            } catch (e) {
                return !1
            }
        }(), l = u && s.Uint8Array && function() {
            try {
                return 100 === new Blob([new Uint8Array(100)]).size
            } catch (e) {
                return !1
            }
        }(), p = s.BlobBuilder || s.WebKitBlobBuilder || s.MozBlobBuilder || s.MSBlobBuilder, b = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, f = (u || p) && s.atob && s.ArrayBuffer && s.Uint8Array && function(e) {
            var t, o, n, i, r, _, a, c, s;
            if (!(t = e.match(b))) throw new Error("invalid data URI");
            for (o = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), n = !!t[4], i = e.slice(t[0].length), r = n ? atob(i) : decodeURIComponent(i), _ = new ArrayBuffer(r.length), a = new Uint8Array(_), c = 0; c < r.length; c += 1) a[c] = r.charCodeAt(c);
            return u ? new Blob([l ? a : _], {
                type: o
            }) : ((s = new p).append(_), s.getBlob(o))
        }, s.HTMLCanvasElement && !d.toBlob && (d.mozGetAsFile ? d.toBlob = function(e, t, o) {
            e(o && d.toDataURL && f ? f(this.toDataURL(t, o)) : this.mozGetAsFile("blob", t))
        } : d.toDataURL && f && (d.toBlob = function(e, t, o) {
            e(f(this.toDataURL(t, o)))
        })), "function" == typeof define && define.amd ? define(function() {
            return f
        }) : "object" == ("undefined" == typeof module ? "undefined" : h(module)) && module.exports ? module.exports = f : s.dataURLtoBlob = f;
        var w = o("E2g8"),
            O = o("4O8T");
        window.EventEmitter = O;
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
        });
        var m = o("ryw6"),
            v = o("kMSP"),
            E = o("Kngp"),
            g = o("gdug"),
            j = o("k487"),
            P = o("zxIV");

        function M(e, t) {
            if (window.icoNode && (e = e + "?" + ((stVersions || {}).favicon || ""), icoNode.getAttribute("href") !== e || t)) {
                var o = Object(P.e)("link", {
                    rel: "shortcut icon",
                    type: "image/gif",
                    href: e
                });
                headNode.replaceChild(o, icoNode), icoNode = o
            }
        }
        var y = o("HhI8"),
            D = o("7jxN"),
            T = o("Egk5"),
            L = o("t7n3"),
            x = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var o = [],
                            n = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var _, a = e[Symbol.iterator](); !(n = (_ = a.next()).done) && (o.push(_.value), !t || o.length !== t); n = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return o
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function k() {
            return new function(e) {
                var t = function(e) {
                        var t = e.split("#"),
                            o = x(t, 2),
                            n = o[0],
                            i = o[1],
                            r = n.split("?"),
                            _ = x(r, 2),
                            a = _[0],
                            c = _[1];
                        return a + (c ? "?" + Object(E.b)(Object(E.f)(c)) : "") + (i ? "#" + i : "")
                    },
                    o = Object(L.i)({
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
                    _ = void 0;
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
                        1 == vk.al && r(!0), 3 == vk.al ? (Object(T.b)(window, "popstate", r), g.a.safari && Object(T.b)(window, "hashchange", r)) : "onhashchange" in window ? Object(T.b)(window, "hashchange", function() {
                            window.chHashFlag ? window.chHashFlag = !1 : r()
                        }) : _ = setInterval(r, 200)
                    },
                    setOptions: function(e) {
                        o = Object(L.i)(o, e)
                    },
                    checker: r,
                    stop: function() {
                        vk.al < 3 ? clearInterval(_) : 3 == vk.al && Object(T.h)(window, "popstate", r)
                    }
                }
            }({
                onLocChange: function(e) {
                    var t = {
                        back: !0,
                        hist: !0
                    };
                    3 === vk.al && history.state && Object(L.x)(history.state) && (t.scrollTop = Object(L.r)(history.state.scrollTop)), nav.go("/" + e, void 0, t)
                }
            })
        }
        var A = o("4+be"),
            C = o("lXE5"),
            I = o("Ia1d"),
            B = o("XuKo"),
            R = o("ErRf"),
            W = o("/PiP"),
            U = {
                sh: function(e, t) {
                    Object(P.Ta)(e), Object(L.v)(t) && t()
                },
                hd: function(e, t) {
                    Object(P.W)(e), Object(L.v)(t) && t()
                },
                visible: !1,
                _show: function(e, t, o, n) {
                    var i = "layers" + (boxQueue.count() + 1);
                    Object(R.c)(i, function() {}), Object(P.Qa)(e, {
                        opacity: o || "",
                        backgroundColor: n || ""
                    }), U.visible || (Object(y.c)(), Object(C.a)()), U.visible || Object(I.f)(), U.visible = !0, Object(P.a)(bodyNode, "layers_shown"), t.visibilityHide ? Object(P.Ha)(t, "box_layer_hidden") : Object(P.Ta)(t), U.sh(e), window.updateWndVScroll && updateWndVScroll()
                },
                _hide: function(e, t) {
                    U.hd(e, function() {
                        var e = "layers" + (boxQueue.count() + 1);
                        Object(R.a)(e), t && t.visibilityHide ? Object(P.a)(t, "box_layer_hidden") : Object(P.W)(t), Object(P.Aa)(layerWrap) || cur._inLayer || Object(P.Aa)(boxLayerWrap) && !boxLayerWrap.visibilityHide || !(window.mvcur && mvcur.minimized || !Object(P.Aa)(window.mvLayerWrap)) || Object(P.Aa)(window.wkLayerWrap) || (U.visible = !1, Object(P.Ha)(bodyNode, "layers_shown"), Object(y.c)(!0), Object(C.b)()), window.updateWndVScroll && updateWndVScroll()
                    }), U.visible || Object(I.g)()
                }
            },
            K = {
                push: function(e) {
                    var t = void 0,
                        o = !!K.count() && K._layers[K._layers.length - 1];
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
                        VideoPlaylist.getCurListId() && (i = Object(L.i)(i, {
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
                    return o && t[0] == o[0] && t[1] == o[1] && t[2] == o[2] || K._layers.push(t), K.skipVideo = !1, !0
                },
                noHistory: function() {
                    for (var e = K._layers, t = e.length; t > 0; --t) "photo" === e[t - 1][0] ? e[t - 1][3].noHistory = 1 : "video" === e[t - 1][0] && (e[t - 1][3].noHistory = 1)
                },
                hide: function() {
                    K._bl = !0, window.WkView && U.fullhide == WkView.hide ? (Object(P.W)(wkLayerWrap), clearTimeout(wkcur.showT)) : U.fullhide && U.fullhide(!0, !0), setTimeout(K.unblock, 5)
                },
                unblock: function() {
                    K._bl = !1
                },
                pop: function() {
                    if (K.count() && !K._bl) {
                        var e = K._layers.pop();
                        if (K.skipVideo && (K.skipVideo = !1, "video" == e[0])) return K._layers.push(e), void(K.skipVideo = !1);
                        "photo" === e[0] ? (Object(L.i)(e[3], {
                            fromQueue: !0
                        }), Object(W.x)(e[1], e[2], e[3], !1)) : "video" === e[0] ? (Object(L.i)(e[3], {
                            fromQueue: !0
                        }), Object(I.j)(e[1], e[2], e[3], !1)) : "wiki" === e[0] ? Object(W.B)({
                            w: e[1]
                        }, !1, !1, e[3]) : "stories" === e[0] ? Object(B.c)(e[1]) : "podcast" === e[0] && Object(W.z)(null, e[1], null, "layer_back")
                    }
                },
                back: function(e, t, o, n) {
                    for (var i = K._layers, r = i.length; r > 0; --r)
                        if (i[r - 1][0] == e && i[r - 1][1] == t || i[r - 1][0] == o && i[r - 1][1] == n) return K._layers = i.slice(0, r), K.pop(), !0;
                    return !1
                },
                count: function() {
                    return K._layers.length
                },
                clear: function() {
                    K._layers = []
                },
                _layers: []
            };
        var S = o("0DAA");

        function N() {
            var e = {};
            Object(L.f)(Object(P.G)("_short_currency"), function() {
                var t = Object(P.s)(this, "short") || "";
                if (!t) return !0;
                var o = this.innerHTML,
                    n = Object(L.M)(o).length,
                    i = Object(P.O)(this, "fontFamily") || "tahoma,arial,sans-serif";
                if (void 0 === e[i]) {
                    for (var r = "", _ = n - 1; _ >= 0; _--) r += "&#8399;";
                    var a = Object(P.e)("div", {
                        innerHTML: "<b>" + o + "</b><b>" + r + "</b>"
                    }, {
                        fontFamily: i,
                        fontSize: "24px"
                    });
                    Object(P.F)("utils").appendChild(a), e[i] = Math.abs(a.firstChild.offsetWidth - a.lastChild.offsetWidth) >= 2 * n, Object(P.Fa)(a)
                }!1 === e[i] && Object(P.Ya)(this, t)
            })
        }
        var F = function(e) {
            return "cmodules/" + e
        };

        function q(e) {
            var t = "";
            return stTypes.fromLib[e] ? t += "lib/" : stTypes.fromCompiled && stTypes.fromCompiled[e] ? t += F("web/") : /^lang\d/i.test(e) || stTypes.fromRoot[e] || -1 !== e.indexOf("/") || (t += "al/"), t
        }
        var H = {
            _waiters: [],
            _wait: function() {
                var e = H._waiters.length,
                    t = {},
                    o = [];
                if (!e) return clearInterval(H._waitTimer), void(H._waitTimer = !1);
                for (var n = 0; n < e; ++n) {
                    for (var i = H._waiters[n][0], r = 0, _ = i.length; r < _; ++r) {
                        var a = i[r];
                        if (!t[a])
                            if (StaticFiles[a].l || "css" !== StaticFiles[a].t || "none" !== Object(P.O)(StaticFiles[a].n, "display") || H.done(a), StaticFiles[a].l) t[a] = 1;
                            else if (t[a] = -1, vk.loaded) {
                            var c = ++StaticFiles[a].c;
                            (c > H.lowlimit && stVersions[a] > 0 || c > H.highlimit) && (stVersions[a] < 0 ? (Object(m.c)("<b>Error:</b> Could not load <b>" + a + "</b>.", {
                                dt: 5,
                                type: 1,
                                msg: "Failed to load with " + H.lowlimit + "/" + H.highlimit + " limits (" + (Object(L.L)() - vk.started) / 100 + " ticks passed)",
                                file: a
                            }), StaticFiles[a].waitersLength = 1, t[a] = 1) : (Object(m.d)("Some problems with loading <b>" + a + "</b>...", 5), stVersions[a] = Object(L.s)(-1e4, -1), H._add(a, StaticFiles[a])))
                        }
                        t[a] > 0 && (i.splice(r, 1), --r, --_)
                    }
                    i.length || (o.push(H._waiters.splice(n, 1)[0][1]), n--, e--)
                }
                for (var s = 0, d = o.length; s < d; ++s) o[s]()
            },
            _addCss: function(e, t) {
                var o = Object(P.e)("style", {
                        type: "text/css",
                        media: "screen"
                    }),
                    n = Object(P.y)(t);
                return n ? headNode.insertBefore(o, n) : headNode.appendChild(o), o.sheet ? o.sheet.insertRule(e, 0) : o.styleSheet && (o.styleSheet.cssText = e), o
            },
            _srcPrefix: function(e, t) {
                return -1 === e.indexOf(".js") && -1 === e.indexOf(".css") || function(e) {
                    for (var t = 0; t < vk.stExcludedMasks.length; t++)
                        if (-1 !== e.indexOf(vk.stExcludedMasks[t])) return !0;
                    return !1
                }(e) ? "" : vk.stDomain || ""
            },
            _add: function(e, t) {
                var o = e.replace(/[\/\.]/g, "_"),
                    n = stVersions[e],
                    i = e + "?" + n,
                    r = H._srcPrefix(e, n);
                if (StaticFiles[e] = {
                        v: n,
                        n: o,
                        l: 0,
                        c: 0
                    }, -1 !== e.indexOf(".js")) {
                    var _ = "/js/" + q(e);
                    if (StaticFiles[e].t = "js", e === F("web/common_web.js")) setTimeout(H.done.bind(H).pbind(F("web/common_web.js")), 0);
                    else {
                        var a = r + _ + i;
                        H._insertNode(a, e), StaticFiles[e].src = a
                    }
                } else if (-1 !== e.indexOf(".css")) {
                    var c = r + ("/css/" + (vk.css_dir || "") + (stTypes.fromRoot[e] || -1 !== e.indexOf("/") ? "" : "al/")) + i;
                    t && t.l && "css" === t.t && (StaticFiles[e].styleNode = H._addCss("#" + o + " {display: block; }", H._getOldNode(c))), H._insertNode(c, e), StaticFiles[e].t = "css", StaticFiles[e].src = c, Object(P.F)(o) || utilsNode.appendChild(Object(P.e)("div", {
                        id: o
                    }))
                }
            },
            _getOldNode: function(e) {
                return !!headNode.querySelector && ((e = e.split("?")[0]).match(/\.css$/) ? headNode.querySelector('link[href^="' + e + '"]') : headNode.querySelector('script[src^="' + e + '"]'))
            },
            _insertNode: function(e, t) {
                var o = e.split("?")[0].match(/\.css$/),
                    n = H._getOldNode(e);
                o && StaticFiles[t] && StaticFiles[t].styleNode ? n = Object(P.y)(StaticFiles[t].styleNode) : n && (n = Object(P.y)(n));
                var i = void 0;
                o ? (i = Object(P.e)("link", {
                    type: "text/css",
                    rel: "stylesheet",
                    href: e
                })).onload = function() {
                    H._removeDuplicateNodes(t)
                } : i = Object(P.e)("script", {
                    type: "text/javascript",
                    src: e
                }), n ? headNode.insertBefore(i, n) : headNode.appendChild(i)
            },
            _removeDuplicateNodes: function(e) {
                var t = StaticFiles[e];
                if (t && t.src) {
                    var o = t.src.split("?")[0],
                        n = H._getOldNode(o);
                    if (n) {
                        t.styleNode && (Object(P.Fa)(t.styleNode), delete StaticFiles[e].styleNode);
                        for (var i = o.match(/\.css$/); n && (n = Object(P.y)(n));) {
                            var r = i ? n.href : n.src;
                            if (!r) break;
                            if ((r = r.replace(/^(https?:\/\/([a-z0-9\-\.\_]+))?vk\.com/, "")).split("?")[0] !== o) break;
                            Object(P.Fa)(Object(P.A)(n))
                        }
                    }
                }
            },
            add: function(e, t, o) {
                var n = [],
                    i = document.documentElement;
                for (var r in Object(L.t)(e) || (e = [e]), e)
                    if (e.hasOwnProperty(r)) {
                        var _ = e[r];
                        if (_) {
                            -1 !== _.indexOf("?") && (_ = _.split("?")[0]);
                            var a = "";
                            ~_.indexOf(".js") && (a = q(_)), /^lang\d/i.test(_) ? stVersions[_] = stVersions.lang : stVersions[a + _] || (stVersions[a + _] = 1);
                            var c = "/js/" + a + _;
                            window.stDeps && window.stDeps[c] && window.stDeps[c].forEach(function(e) {
                                H.add(e)
                            }), (g.a.opera && 768 == i.clientHeight && 1024 == i.clientWidth || __debugMode) && !g.a.iphone && !g.a.ipad && _ !== F("web/common_web.js") && "common.css" !== _ && stVersions[_] > 0 && stVersions[_] < 1e9 && (stVersions[_] += Object(L.s)(1e9, 2e9));
                            var s = StaticFiles[_];
                            s && s.v == stVersions[_] || H._add(_, s), t && !StaticFiles[_].l && n.push(_)
                        }
                    }
                if (t) {
                    if (!n.length) return !0 === o ? setTimeout(t, 0) : t();
                    H._waiters.push([n, t]), H._waitTimer || (H._waitTimer = setInterval(H._wait, 100))
                }
            },
            done: function(e) {
                stVersions[e] < 0 && Object(m.d)('<b>Warning:</b> Something is bad, please <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.', 10), StaticFiles[e].l = 1, "js" === StaticFiles[e].t && H._removeDuplicateNodes(e)
            }
        };
        var V = o("XzvV"),
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
                    Object(P.F)("quick_search") && !this.loading && (this.loading = !0, stManager.add("qsearch.js", function() {
                        return e.hub.done()
                    }), ajax.post("hints.php", {
                        act: "a_start_hints"
                    }, {
                        onDone: function(t) {
                            e.startHintsText = Object(L.H)(t), e.hintsHub.done()
                        }
                    }))
                }, e.prototype.show = function(e) {
                    var t = window.placeholderSetup;
                    if (Object(P.F)("quick_search") && !this.on) return this.on = 1, Object(P.Ta)(this.sCont), t("search_input"), Object(P.F)("search_input").setAttribute("autocomplete", "off"), Object(P.a)(Object(P.F)("qsearch_link"), "active"), this.prev_content = Object(P.F)("content"), this.qsearch_cont || (this.qsearch_cont = Object(P.e)("div", {
                        id: "content",
                        innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'
                    })), this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content), this.loading || this.load(), this.hub.done(), this.hintsHub.done(), e ? Object(T.c)(e) : void 0
                }, e.prototype.go = function(e) {
                    var t = "/gsearch.php?section=" + (this.last_section || "people") + "&q=" + Object(L.H)(Object(P.F)("search_input").value) + "&name=1";
                    return Object(T.c)(e || window.event), location.href = t, !1
                }, e.prototype.init = function(e) {
                    this.sCont = Object(P.F)("quick_search"), this.opt = e || {}
                }, e.prototype.hide = function(e, t) {
                    if (Object(P.F)("quick_search") && (!this.active || t) && this.on) {
                        var o = window.toggleFlash;
                        if (this.on = 0, o(), this.beforeHide && this.beforeHide()) return !0;
                        Object(P.F)("search_input").setValue ? Object(P.F)("search_input").setValue("") : Object(P.F)("search_input").value = "", Object(P.W)(this.sCont), Object(P.Ha)(Object(P.F)("qsearch_link"), "active"), this.qsearch_cont.parentNode.replaceChild(this.prev_content, this.qsearch_cont)
                    }
                }, e.prototype.preload = function() {}, e
            }(),
            Y = o("Bszp"),
            X = o("MSYF"),
            J = o("kHqu"),
            Z = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var o = [],
                            n = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var _, a = e[Symbol.iterator](); !(n = (_ = a.next()).done) && (o.push(_.value), !t || o.length !== t); n = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return o
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            $ = "remixjsp";

        function ee() {
            var e;
            (e = window.performance) && e.getEntriesByType && e.getEntriesByType("paint").forEach(function(e) {
                    "first-contentful-paint" === e.name && re(e.startTime, "TTFCP")
                }),
                function() {
                    var e = window.performance;
                    e && e.getEntriesByType && e.getEntriesByType("navigation").forEach(function(e) {
                        if ("navigation" === e.initiatorType) {
                            var t = e.domComplete,
                                o = e.domContentLoadedEventEnd,
                                n = e.loadEventEnd;
                            re(t, "domComplete"), re(o, "domContentLoadedEventEnd"), re(n, "loadEventEnd")
                        }
                    })
                }(), ne()
        }
        var te = [],
            oe = !1;

        function ne() {
            if (oe) {
                var e = window.performance,
                    t = te[te.length - 1];
                if (!t) return oe = !1, void re(-1);
                var o = t.startTime + t.duration;
                e.now() - o >= 3e3 ? re(o, "TTI") : setTimeout(ne, 3e3)
            }
        }
        var ie = [];

        function re(e, t) {
            var o = Math.floor(e);
            if (-1 !== e && (ie.push([o, t]), !(oe ? "TTI" === t : ie.length > 2))) return;
            var n = "unknown",
                i = navigator.connection;
            i && i.effectiveType && (n = i.effectiveType);
            var r = {
                id: (isNaN(vk.id) ? 0 : vk.id + Date.now() + Math.random()).toString(36),
                loc: location.href,
                events: []
            };
            ie.forEach(function(e) {
                var t = Z(e, 2),
                    o = t[0],
                    i = t[1];
                return r.events.push([i, o, cur.module, n, window.vk.rv])
            }), Object(v.d)($, JSON.stringify(r), .01)
        }

        function _e() {
            window.PerformanceLongTaskTiming && (new PerformanceObserver(function(e) {
                te = te.concat(e.getEntries())
            }).observe({
                entryTypes: ["longtask"]
            }), oe = !0), "complete" !== document.readyState ? window.addEventListener("load", function() {
                setTimeout(ee, 0)
            }) : ee()
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
            ce = o("1BRX"),
            se = o("98sY"),
            de = o("El3O"),
            ue = o("EasH"),
            le = o("kcIO"),
            pe = o("FWc3");

        function be(e, t) {
            var o = t.asrtl ? 0 : t.right ? 289 : 35,
                n = t.asrtl ? " mobile_tt_asrtl" : t.right ? " mobile_tt_right" : "";
            return Object(pe.c)(e, {
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

        function fe(e, t) {
            return Object(pe.c)(e, {
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

        function he(e, t, o) {
            if (!cur._addRestoreInProgress) {
                var n = Object(P.T)("_audio_row", e),
                    i = AudioUtils.getAudioFromEl(n, !0),
                    r = Object(P.s)(e, "action"),
                    _ = AudioUtils.getRowActionName(r, i, n),
                    a = {
                        text: function() {
                            return _
                        },
                        black: 1,
                        shift: t || [7, 4, 0],
                        needLeft: !0,
                        forcetodown: o
                    };
                Object(P.T)("_im_mess_stack", e) ? (a.appendParentCls = "_im_mess_stack", a.shift = [7, 10, 0], a.noZIndex = !0) : Object(P.T)("top_notify_wrap", e) ? a.appendParentCls = "top_notify_wrap" : Object(P.T)("_ape_audio_item", e) && (a.appendParentCls = "_ape_audio_item"), Object(pe.c)(e, a)
            }
        }

        function we(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            Object(pe.c)(e, {
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
                appendEl: Object(P.n)("im-page-history-w", e) || Object(P.n)("rb_box_wrap", e) || Object(P.n)("wk_cont", e) || Object(P.n)("scroll_fix_wrap", e)
            })
        }

        function Oe(e) {
            var t = "";
            Object(P.T)("_im_mess_stack", e) && (t = "_im_mess_stack"), Object(pe.c)(e, {
                className: "bookmarks_tt ",
                shift: [32, 8],
                text: function() {
                    return "1" === Object(P.s)(e, "state") ? Object(P.s)(e, "remove") : Object(P.s)(e, "add")
                },
                black: 1,
                appendParentCls: t
            })
        }
        var me = o("Ieup"),
            ve = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var o = [],
                            n = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var _, a = e[Symbol.iterator](); !(n = (_ = a.next()).done) && (o.push(_.value), !t || o.length !== t); n = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return o
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        var Ee = {
            maxHeight: 300,
            tabs: {},
            counters: {},
            showFriends: function() {
                curFastChat.clistBox.visible ? curFastChat.clistBox.options.fixed ? FastChat.clistHide() : curFastChat.clistBox.show() : (FastChat.clistShow(), Ee.cont.tt && Ee.cont.tt.destroy && Ee.cont.tt.destroy())
            },
            showTT: function() {
                if (!Object(P.V)(Ee.wrap, "chat_active") && !Object(P.V)(Ee.wrap, "chat_expand")) {
                    var e = g.a.mac ? "Cmd" : "Ctrl";
                    Object(pe.c)(Ee.cont, {
                        text: Object(A.d)("head_fr_online_tip") + " (" + e + "+?)",
                        shift: [-2, 4, 0],
                        showdt: 0,
                        black: 1
                    })
                }
            },
            init: function() {
                Ee.wrap = Object(P.e)("div", {
                    id: "chat_onl_wrap",
                    className: "chat_onl_wrap",
                    innerHTML: '\n<div class="chat_tt_wrap"></div>\n<div class="chat_onl_inner">\n  <div class="chat_cont_scrolling"><div class="chat_onl_height"></div></div>\n  <div class="chat_cont_sh_top"></div>\n  <div class="chat_cont_sh_bottom"></div>\n  <a class="chat_tab_wrap" id="chat_tab_wrap" onclick="Chat.showFriends()" onmouseover="Chat.showTT();">\n    <div class="chat_onl_cont">\n      <div class="chat_onl" id="chat_onl"></div>\n    </div>\n  </a>\n</div>'
                }), utilsNode.appendChild(Ee.wrap), Ee.scrollNode = Object(P.H)("chat_cont_scrolling", Ee.wrap), Ee.ttNode = Object(P.H)("chat_tt_wrap", Ee.wrap), Ee.itemsCont = Ee.scrollNode.firstChild, Ee.onl = Object(P.F)("chat_onl"), Ee.cont = Ee.onl.parentNode.parentNode, Object(P.W)(Ee.wrap), Ee.inited = !0, stManager._addCss(".layers_shown .chat_onl_wrap {margin-right: " + Object(z.t)() + "px;}")
            }
        };

        function ge(e, t, o, n) {
            var i = Object(L.r)(g.a.version);
            if (e && (g.a.chrome && i > 14 || g.a.mozilla && i > 13 || g.a.opera && i > 2)) {
                var r = "all " + o.duration + "ms " + (o.func || "ease-out");
                e.style.WebkitTransition = r, e.style.MozTransition = r, e.style.OTransition = r, e.style.transition = r;
                var _ = function t() {
                    return g.a.opera && Object(L.r)(g.a.version) <= 12 ? e.removeEventListener("oTransitionEnd", t) : Object(T.h)(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", t), e.style.WebkitTransition = "", e.style.MozTransition = "", e.style.OTransition = "", e.style.transition = "", n && n(), !1
                };
                n && (g.a.opera && Object(L.r)(g.a.version) <= 12 ? e.addEventListener("oTransitionEnd", _) : Object(T.b)(e, "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", _)), setTimeout(P.Qa.pbind(e, t), 0)
            } else Object(D.b)(e, t, Object(L.i)(o, {
                onComplete: n
            }))
        }

        function je(e) {
            return cur.fifaConfettiEnabled && window.Fifa2018 ? /\w+=["']+[^"']*([Гг][Оо]+[Лл]|go+a+l).*["']+/gi.test(e) ? e : (e = e.replace(/&#33;/g, "!")).replace(/(^|[^a-zа-яА-ЯёЁ0-9])((?:[Гг][Оо]+[Лл]|go+a+l)[\!]*)(?=[^a-zа-яА-ЯёЁ0-9]+?|$)([\!])?/gi, function(e) {
                return ((arguments.length <= 1 ? void 0 : arguments[1]) || "") + '<span class="fifa_confettiLink" onclick="Fifa2018.startFlapper(this); return false;">' + (((arguments.length <= 2 ? void 0 : arguments[2]) || "") + ((arguments.length <= 3 ? void 0 : arguments[3]) || "")) + "</span>"
            }) : e
        }

        function Pe(e, t) {
            var o = [],
                n = 0,
                i = null,
                r = Object(L.i)({
                    top_load: 0,
                    bottom_load: 2,
                    load_limit: 10,
                    need_load_class: "__need_load",
                    skip_process_load: !1,
                    use_iframe: !1
                }, t),
                _ = {};

            function a(e, t) {
                o[e] && (--n, delete o[e]), t || _.processLoad()
            }

            function c(t) {
                var o = 0,
                    n = t;
                if (n && n.offsetParent)
                    do {
                        if (o += n.offsetTop, e && n.offsetParent === e) break
                    } while (n = n.offsetParent);
                return o
            }
            return _.processLoad = function() {
                if (Object(L.f)(o, function(e, t) {
                        var n = ve(t, 2),
                            i = n[0],
                            r = n[1];
                        (r.width || r.height || Object(L.L)() - i > 2e4) && o[e] && a.call(r, e, !0)
                    }), clearTimeout(i), n && (i = setTimeout(_.processLoad, 500)), !(n >= r.load_limit)) {
                    var t = Object(P.G)(r.need_load_class, e || bodyNode),
                        s = [],
                        d = void 0,
                        u = void 0;
                    if (e && t.length) {
                        var l = e.offsetHeight;
                        d = e.scrollTop - l * r.top_load, u = e.scrollTop + l * r.bottom_load
                    }
                    for (var p = 0, b = t.length; p < b && n < r.load_limit; p++) {
                        var f = t[p];
                        if ("IMG" === f.tagName) {
                            var h = f.getAttribute("data-src");
                            if (h) {
                                if (e) {
                                    var w = c(f),
                                        O = w + f.parentNode.offsetHeight;
                                    if (w > u) continue;
                                    if (O < d) continue
                                }
                                s.push([f, h])
                            }
                        }
                    }
                    Object(L.f)(s, function(e, t) {
                        var i = ve(t, 2),
                            c = i[0],
                            s = i[1];
                        _.iloader && _.iloader.add(s, a, c), c.src = s, c.removeAttribute("data-src"), Object(P.Ha)(c, r.need_load_class), o[s] || (n++, o[s] = [Object(L.L)(), c])
                    }), clearTimeout(i), n && (i = setTimeout(_.processLoad, 500))
                }
            }, _.destroy = function() {
                o = [], n = 0, clearTimeout(i)
            }, r.use_iframe && (_.iloader = new function() {
                var e = void 0,
                    t = void 0,
                    o = void 0,
                    n = void 0,
                    i = void 0,
                    r = void 0;

                function _(e) {
                    return t && t.body ? t.getElementById("___img" + e) : Object(P.H)("___img" + e, o)
                }

                function a() {
                    e = utilsNode.appendChild(Object(P.e)("iframe")), t = function(e) {
                        if (g.a.mozilla) return !1;
                        try {
                            return e.contentDocument ? e.contentDocument : e.contentWindow && e.contentWindow.document ? e.contentWindow.document : e.document
                        } catch (e) {}
                        return !1
                    }(e), o = t && t.body ? t.body : utilsNode.appendChild(Object(P.e)("div", {}, {
                        display: "none"
                    })), n = 0, i = []
                }

                function c(e, r, a) {
                    var c = n++;
                    i[c] = {
                        src: e,
                        onLoad: r,
                        that: a
                    }, o.appendChild(Object(P.e)("div", {
                        innerHTML: function(e) {
                            return t && t.body ? '<img id="___img' + e + '" />' : '<img class="___img' + e + '" />'
                        }(c)
                    }));
                    var s = _(c);
                    return s.src = e, s.onload = function() {
                        var e = i[c];
                        e && (e.onLoad && e.onLoad.call(e.that || window, e.src), delete i[c], o.removeChild(_(c).parentNode))
                    }, s
                }
                return a(), {
                    add: c,
                    abort: function() {
                        Object(P.Fa)(e), r = [].concat(function(e) {
                            if (Array.isArray(e)) {
                                for (var t = 0, o = Array(e.length); t < e.length; t++) o[t] = e[t];
                                return o
                            }
                            return Array.from(e)
                        }(i.filter(function(e) {
                            return void 0 !== e
                        }))), a()
                    },
                    repeat: function(e) {
                        if (!r) return [];
                        var t = [];
                        if (Object(L.f)(r, function(e, o) {
                                c(o.src, o.onLoad, o.that), t.push(o.that)
                            }), r = null, e) {
                            var o = [];
                            Object(L.f)(t, function() {
                                o.push([this, this.src]), this.src = "", Object(P.W)(this)
                            }), setTimeout(function() {
                                Object(L.f)(o, function(e, t) {
                                    var o = ve(t, 2),
                                        n = o[0],
                                        i = o[1];
                                    n.src = i, Object(P.Ta)(n)
                                })
                            }, 10)
                        }
                        return t
                    }
                }
            }), r.skip_process_load || _.processLoad(), _
        }

        function Me(e, t) {
            var o = {
                act: "hide_block",
                block: e,
                hash: t
            };
            ajax.post("al_index.php", o), Object(P.W)("news_announce_" + e)
        }

        function ye(e, t) {
            function o() {
                Object(D.b)("ads_ad_close_info_" + e, {
                    opacity: 1
                }, 200, n)
            }

            function n() {
                Object(P.Qa)("ads_ad_box2_" + e, {
                    visibility: "hidden"
                })
            }
            Object(P.Qa)("left_hide" + e, {
                visibility: "hidden"
            }), ajax.post(t, {}, {
                noAds: !0,
                onDone: function(t) {
                    if (!t.done) return;
                    if ("ya_direct" === e) return Object(D.b)(e, {
                        opacity: 0
                    }, 200, function() {
                        Object(P.Fa)("ya_direct"), setTimeout(function() {
                            AdsLight.updateBlock("force_hard", 2)
                        }, 5e3)
                    }), void(window.vk__adsLight.yaDirectAdActive = !1);
                    var n = Object(P.F)("ads_ad_close_info_" + e);
                    if (!n) return !1;
                    Object(P.Qa)(n, {
                        opacity: 0
                    }), n.style.setProperty("display", "block", "important"), setTimeout(o, 0)
                }
            })
        }

        function De(e, t, o, n, i) {
            n && stManager.add(["tooltips.css", "tooltips.js"]), cur.mfid = e, ajax.post("al_friends.php", {
                act: n ? "add" : "remove",
                mid: e,
                mf_type: t,
                hash: o,
                from: "leftblock"
            }, {
                onDone: function(t, o, n) {
                    if (!t) return nav.reload();
                    var i = Object(P.F)("left_friend_status_" + e);
                    Object(P.g)(i.firstChild), t ? (Object(P.Ta)(i), Object(P.Ya)(i, t)) : Object(P.W)(i), o && (ajax.preload("al_friends.php", {
                        act: "friend_tt",
                        mid: e
                    }, [o, n]), setTimeout(Te, 0))
                },
                showProgress: function() {
                    var t = (Object(P.F)("left_friend_subscribed") || {}).tt;
                    t && (t.hide({
                        fasthide: 1
                    }), t.destroy()), Object(P.F)("left_friend_status_" + e).innerHTML = '<img src="/images/upload' + (window.devicePixelRatio >= 2 ? "_2x" : "") + '.gif" width="32" />'
                },
                hideProgress: function() {
                    return Object(P.W)("left_friend_status_" + e)
                },
                onFail: function(e) {
                    if (e) return Object(ue.d)({
                        title: Object(A.d)("global_error")
                    }, e), !0
                }
            }), Object(T.c)(i)
        }

        function Te() {
            return Object(pe.c)(Object(P.F)("left_friend_subscribed"), {
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

        function xe(e) {
            if (g.b.cmaEnabled && window.ResizeObserver && Object(P.Ya)("quick_email")) {
                var t = new PasswordCredential({
                    id: Object(P.F)("quick_email").value,
                    password: Object(P.F)("quick_pass").value,
                    name: e.name,
                    iconURL: e.photo_50
                });
                navigator.credentials.store(t)
            }
        }

        function ke(e, t) {
            Le(), xe(t), nav.reload({
                force: !0,
                from: 6
            })
        }

        function Ae(e, t) {
            switch (Le(), e) {
                case -1:
                    location.href = location.href.replace(/^http:/, "https:");
                    break;
                case 4:
                    var o = "/login?m=1" + (t.expire ? "&s=0" : "");
                    Object(L.f)(["email", "ul", "pch"], function(e, n) {
                        t[n] && (o += "&" + n + "=" + t[n])
                    }), location.href = o;
                    break;
                default:
                    location.href = "/login"
            }
        }

        function Ce(e, t) {
            Le(), Object(z.w)(window.__qfBtn), window.qloginBox = Object(ue.c)(e, t, window.qloginBox, {
                onSubmit: function(e, t) {
                    Object(P.F)("quick_captcha_sid").value = e, Object(P.F)("quick_captcha_key").value = t, Object(P.F)("quick_login_form").submit()
                },
                onHide: function() {
                    return window.qloginBox = !1
                }
            })
        }

        function Ie(e, t) {
            Le(), Object(z.w)(window.__qfBtn), window.qloginBox = Object(ue.e)(e, t, window.qloginBox, {
                onSubmit: function(e) {
                    Object(P.F)("quick_recaptcha").value = e, Object(P.F)("quick_login_form").submit()
                },
                onHide: function() {
                    return window.qloginBox = !1
                }
            })
        }

        function Be(e, t) {
            Object(P.Qa)(e, {
                backgroundColor: "#F5F7FA"
            }), Object(D.b)(e, {
                backgroundColor: "#FFF"
            }, t || 6e3, function(e) {
                Object(P.Qa)(e, {
                    backgroundColor: null
                })
            })
        }
        var Re = o("aong"),
            We = .5,
            Ue = .25,
            Ke = 300,
            Se = 1e3,
            Ne = 3e5,
            Fe = 2500,
            qe = 5e3,
            He = 6e3,
            Ve = 2e4,
            ze = 1e3,
            Ge = 36e4,
            Qe = "_longViewType",
            Ye = "_longViewIdled",
            Xe = "_longViewModule",
            Je = "_longViewStarted",
            Ze = "_longViewProcessed",
            $e = "_longViewCached",
            et = "_longViewHeight",
            tt = "_longViewTop",
            ot = "_longViewBottom",
            nt = "REGULAR",
            it = "AUTOPLAY_AD",
            rt = "LongView.viewed",
            _t = "LongView.idled",
            at = vk.longViewTestGroup,
            ct = [],
            st = [],
            dt = [],
            ut = Date.now(),
            lt = 0,
            pt = 0,
            bt = !1,
            ft = null,
            ht = null,
            wt = null,
            Ot = null,
            mt = {};

        function vt() {
            var e = Kt();
            e.length && (Bt(e), St())
        }

        function Et() {
            ct.forEach(function(e) {
                e[$e] = !1
            })
        }

        function gt(e, t) {
            "im" === t && !e[Qe] && function(e) {
                if (Object(P.V)(e, "im-mess--post")) return !0;
                var t = e && Object(P.u)(e);
                return !(!t || "ads_feed_placeholder" === t.getAttribute("id") || Object(P.V)(e, "no_posts"))
            }(e) && (e[Qe] = function(e) {
                var t = e && Object(P.u)(e);
                return t && t.hasAttribute("data-ad-video-autoplay") ? it : nt
            }(e), e[Xe] = t, ct.push(e))
        }

        function jt(e, t) {
            var o = jt;
            ! function(e, t) {
                var o = [];
                ct.forEach(function(n) {
                    Vt(n) ? o.push(n) : ! function(e, t, o) {
                        return !e[Je] && Ft(e, We, t, o)
                    }(n, e, t) ? function(e, t, o) {
                        return e[Je] && !Ft(e, Ue, t, o)
                    }(n, e, t) && (n[Ye] ? delete n[Ye] : (zt(st, n), dt = dt.concat(Ht(n))), delete n[Je]) : (n[Je] = Date.now(), st.push(n))
                }), o.forEach(function(e) {
                    zt(ct, e)
                })
            }(e || Object(C.e)(), t || window.innerHeight), bt ? (clearTimeout(o.timer), o.timer = setTimeout(Pt, 150)) : (bt = !0, Lt(), function() {
                if ("/im" === location.pathname) {
                    var e = Object(P.H)("im-page--chat-header"),
                        t = Object(P.H)("im-page--chat-input");
                    lt = e.getBoundingClientRect().top + e.offsetHeight, pt = window.innerHeight - t.getBoundingClientRect().top
                } else lt = Object(P.F)("page_header").offsetHeight, pt = 0
            }())
        }

        function Pt() {
            Lt(), Tt(), bt = !1
        }

        function Mt() {
            Lt(), It()
        }

        function yt() {
            dt = [], st.forEach(function(e) {
                return e[Je] = Date.now()
            }), Rt(null), Wt(null), Tt()
        }

        function Dt() {
            Lt(), It(), dt = [], st = [], Rt(null), Wt(null)
        }

        function Tt() {
            ft = setTimeout(xt, Fe), ht = setTimeout(kt, qe), wt = setTimeout(At, He), Ot = setTimeout(Ct, Ve)
        }

        function Lt() {
            clearTimeout(ft), clearTimeout(ht), clearTimeout(wt), clearTimeout(Ot)
        }

        function xt() {
            dt.length && Rt(dt)
        }

        function kt() {
            Bt(dt), dt = [], Rt(null)
        }

        function At() {
            st.length && (Wt(qt(st, !0, !0)), wt = setTimeout(At, ze))
        }

        function Ct() {
            clearTimeout(wt), Bt(qt(st)), st.forEach(function(e) {
                return e[Ye] = !0
            }), st = [], Wt(null)
        }

        function It() {
            Bt(dt.concat(qt(st)))
        }

        function Bt(e) {
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
                    return Object(L.f)(t, function(e, t) {
                        return o.push(e + "_" + t.join(","))
                    }), o.join(";")
                }(e),
                long_view: 1
            })
        }

        function Rt(e) {
            Ut(rt, e)
        }

        function Wt(e) {
            Ut(_t, e)
        }

        function Ut(e, t) {
            var o = S.a.get(e) || {};
            t ? o[ut] = t : delete o[ut], S.a.set(e, o)
        }

        function Kt() {
            var e = Kt,
                t = [],
                o = S.a.get(rt) || {},
                n = S.a.get(_t) || {};
            return e.iterator || (e.iterator = function(e) {
                return function(o) {
                    Nt(o) && (t = t.concat(e[o]))
                }
            }), Object.keys(o).forEach(e.iterator(o)), Object.keys(n).forEach(e.iterator(n)), t
        }

        function St() {
            var e = St,
                t = S.a.get(rt) || {},
                o = S.a.get(_t) || {};
            e.iterator || (e.iterator = function(e) {
                return function(t) {
                    Nt(t) && delete e[t]
                }
            }), Object.keys(t).forEach(e.iterator(t)), Object.keys(o).forEach(e.iterator(o)), S.a.set(rt, t), S.a.set(_t, o)
        }

        function Nt(e) {
            var t = Number(e);
            return t !== ut && Date.now() - t >= Ge
        }

        function Ft(e, t, o, n) {
            if (!e) return !1;
            e[$e] || (e[$e] = !0, e[et] = e.offsetHeight, e[tt] = o + e.getBoundingClientRect().top, e[ot] = e[tt] + e[et]);
            var i = n - lt - pt,
                r = o + lt,
                _ = o + n - pt,
                a = e[et],
                c = e[tt],
                s = e[ot];
            return (s > r && c < _ ? Math.min(_, s) - Math.max(r, c) : 0) >= Math.min(i * t, a * t)
        }

        function qt(e, t, o) {
            return e.map(function(e) {
                return Ht(e, t, o)
            })
        }

        function Ht(e, t, o) {
            if (Vt(e)) return [];
            var n = Math.min(Ne, Date.now() - e[Je]);
            if (e[Qe] === nt && n < Ke || e[Qe] === it && n < Se) return [];
            o || (e[Ze] = !0);
            var i, r = function(e) {
                    var t = e[Xe];
                    if ("im" === t) {
                        var o = Object(P.c)(e, "data-post-id"),
                            n = Object(P.c)(e, "data-copy"),
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
                _ = {
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
                a = cur.feed_session_id || "na",
                c = [];
            for (var s in r)
                if ("index" !== s && "module" !== s && "q" !== s) {
                    var d = s.split("_"),
                        u = d[0],
                        l = d[1];
                    "ads" === u && (l = d[3]), /^post\d+$/.test(u) && (u = d[1], l = d[2]);
                    var p = void 0;
                    t || (mt[p = u + "_" + l] || (mt[p] = 0), mt[p]++), c.push("ad" === u ? {
                        ownerId: "ad",
                        postId: l,
                        module: _,
                        viewIndex: mt[p]
                    } : "ads" === u ? {
                        ownerId: "ads",
                        postId: l,
                        module: _,
                        index: r.index,
                        duration: n,
                        sessionId: a,
                        viewIndex: mt[p]
                    } : {
                        ownerId: u,
                        postId: (1 === r[s] ? "" : "-") + l,
                        module: _,
                        index: r.index,
                        duration: n,
                        sessionId: a,
                        q: r.q || null,
                        viewIndex: mt[p]
                    })
                }
            return c
        }

        function Vt(e) {
            return "page_view" === at && e[Ze] || !document.body.contains(e)
        }

        function zt(e, t) {
            var o = e.indexOf(t);
            o >= 0 && e.splice(o, 1)
        }
        var Gt = o("QGEU"),
            Qt = o("eNQP");

        function Yt() {
            return document.activeElement && (Object(P.c)(document.activeElement, "contenteditable") || "INPUT" === document.activeElement.tagName || "textarea" === document.activeElement.tagName)
        }

        function Xt(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                o = arguments[2],
                n = arguments[3],
                i = e.phshown,
                r = e.phcont,
                _ = t.back,
                a = t.editable,
                c = t.hideBackAfter,
                s = t.timeout,
                d = t.phColor,
                u = void 0 === d ? "#8C8E91" : d,
                l = t.activeColor,
                p = void 0 === l ? "#C0C8D0" : l,
                b = s || 0 === s ? s : 100,
                f = t.period || 200,
                h = void 0;
            if (h = a ? (void 0 !== e.textContent ? e.textContent : e.innerText) || Object(P.I)("img", e).length : e.value, i && (_ && h || !_ && (o && !o.type || h)) ? (Object(P.W)(r), e.phshown = !1) : i || h || !_ && !n || (Object(P.Ta)(r), e.phshown = !0, g.a.opera && n && (e.setAttribute("placeholder", ""), e.removeAttribute("placeholder", ""))), _ && !h) {
                if (o && !o.type) {
                    var w = c ? P.W.pbind(r.firstChild.firstChild) : null;
                    clearTimeout(e.phanim), e.phanim = setTimeout(function() {
                        Object(D.b)(r.firstChild.firstChild, {
                            color: p
                        }, f, w)
                    }, b)
                }
                n && (clearTimeout(e.phanim), c && Object(P.Ta)(r.firstChild.firstChild), e.phanim = setTimeout(function() {
                    Object(D.b)(r.firstChild.firstChild, {
                        color: u
                    }, f)
                }, b))
            }
        }

        function Jt(e, t) {
            var o = Object(P.F)(e),
                n = t ? Object(L.d)(t) : {};
            if (o && (!o.phevents || n.reload)) {
                var i = o.getAttribute ? o.getAttribute("placeholder") : o.placeholder;
                if (i) {
                    o.removeAttribute("placeholder");
                    var r = {},
                        _ = !1,
                        a = ["Top", "Bottom", "Left", "Right"];
                    if (n.pad) r = n.pad;
                    else {
                        if (n.fast) {
                            for (var c = 0; c < 4; c++) r["padding" + a[c]] = 3, r["margin" + a[c]] = 0, r["border" + a[c] + "Width"] = 1;
                            Object(L.i)(r, n.styles || {})
                        } else {
                            for (var s = [], d = 0; d < 4; d++) s.push("margin" + a[d]), s.push("padding" + a[d]), s.push("border" + a[d] + "Width");
                            r = Object(P.O)(o, s)
                        }
                        for (var u = 0; u < 4; u++) {
                            var l = "margin" + a[u],
                                p = "border" + a[u] + "Width";
                            r[l] = Object(L.r)(r[l]) + Object(L.r)(r[p]) + "px", delete r[p]
                        }
                    }
                    if (n.reload) {
                        var b = o.previousSibling;
                        b && Object(P.V)(b, "input_back_wrap") && Object(P.Fa)(b)
                    }
                    var f = n.big ? " big" : "",
                        h = Object(P.N)(o)[0] - 20,
                        w = o.phcont = o.parentNode.insertBefore(Object(P.e)("div", {
                            className: "input_back_wrap no_select",
                            innerHTML: '<div class="input_back"><div class="input_back_content' + f + '" style="width: ' + h + 'px;">' + i + "</div></div>"
                        }), o),
                        O = Object(P.u)(w);
                    Object(P.Qa)(O, r);
                    var m = Xt.pbind(o, n),
                        v = g.a.mobile ? m : function(e, t) {
                            return setTimeout(m.pbind(e, t), 0)
                        };
                    g.a.msie && g.a.version < 8 && Object(P.Qa)(O, {
                        marginTop: 1
                    }), o.phonfocus = function(e) {
                        _ || (o.focused = !0, cur.__focused = o, !0 === e && (Object(P.Qa)(o, {
                            backgroundColor: "#FFF"
                        }), Object(P.W)(O)), v(!0, !1))
                    }, o.phonblur = function() {
                        _ || (cur.__focused = o.focused = !1, Object(P.Ta)(O), v(!1, !0))
                    }, o.phshown = !0, o.phanim = null, (o.value || n.editable && ((void 0 !== o.textContent ? o.textContent : o.innerText) || Object(P.I)("img", o).length)) && (o.phshown = !1, Object(P.W)(w)), g.a.opera_mobile || (Object(T.b)(w, "focus click", function(e) {
                        _ || (n.editableFocus ? (setTimeout(n.editableFocus.pbind(o), 0), o.phonfocus()) : (o.blur(), o.focus()))
                    }), Object(T.b)(o, "focus" + (n.editable ? " click" : ""), o.phonfocus), Object(T.b)(o, "keydown paste cut input", v)), Object(T.b)(o, "blur", o.phonblur), o.check = v, o.getValue = function() {
                        return n.editable ? o.innerHTML : o.value
                    }, o.setPlaceholder = function(e) {
                        return Object(P.H)("input_back_content", w).textContent = e
                    }, o.setDisabled = function(e) {
                        return _ = e
                    }, o.setValue = function(e) {
                        n.editable ? o.innerHTML = e : o.value = e, Xt(o, n)
                    }, o.phevents = !0, o.phonsize = function() {}, n.global || n.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function(e) {
                        for (var t = 0, o = e.length; t < o; t++) Object(P.Ja)(e[t])
                    }.pbind(cur.__phinputs))), cur.__phinputs.push(o))
                }
            }
        }

        function Zt(e, t) {
            var o = Object(P.F)(e),
                n = t ? Object(L.d)(t) : {},
                i = void 0 === Object(P.e)("input").placeholder || o && o.getAttribute && o.getAttribute("contenteditable");
            if (o && (!o.phevents || n.reload)) {
                var r = o.getAttribute ? o.getAttribute("placeholder") : o.placeholder;
                if (r && (o.getValue = function() {
                        return n.editable ? o.innerHTML : o.value
                    }, o.setValue = function(e) {
                        n.editable ? o.innerHTML = e : o.value = e, i && d(o, n)
                    }, o.phonfocus = function() {}, o.phonblur = function() {}, i)) {
                    if (o.removeAttribute("placeholder"), n.reload) {
                        var _ = Object(P.y)(o);
                        _ && Object(P.V)(_, "placeholder") && Object(P.Fa)(_)
                    }
                    var a = o.phcont = Object(P.v)(Object(P.e)("div", {
                            className: "placeholder",
                            innerHTML: '<div class="ph_input"><div class="ph_content">' + r + "</div></div>"
                        }), o),
                        c = d.pbind(o, n),
                        s = g.a.mobile ? c : function(e, t) {
                            return setTimeout(c.pbind(e, t), 0)
                        };
                    o.phonfocus = function() {
                        o.focused = !0, cur.__focused = o, s(!0, !1)
                    }, o.phonblur = function() {
                        cur.__focused = o.focused = !1, s(!1, !0)
                    }, o.phshown = !0, (o.value || n.editable && ((void 0 !== o.textContent ? o.textContent : o.innerText) || Object(P.I)("img", o).length)) && (o.phshown = !1, Object(P.W)(a)), g.a.opera_mobile || (Object(T.b)(a, "focus click contextmenu", function(e) {
                        n.editableFocus ? (setTimeout(n.editableFocus.pbind(o), 0), "contextmenu" === e.type && g.a.msie && n.editableFocus(o), o.phonfocus()) : (o.blur(), o.focus())
                    }), Object(T.b)(o, "focus" + (n.editable ? " click" : ""), o.phonfocus), Object(T.b)(o, "keydown paste cut input", s)), Object(T.b)(o, "blur", o.phonblur), o.check = s, o.phevents = !0, o.phonsize = function() {}, n.global || n.reload || (cur.__phinputs || (cur.__phinputs = [], cur.destroy.push(function() {
                        if (cur.__phinputs)
                            for (var e = 0, t = cur.__phinputs.length; e < t; ++e) Object(P.Ja)(cur.__phinputs[e])
                    })), cur.__phinputs.push(o))
                }
            }

            function d(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    o = e.phshown,
                    n = e.phcont,
                    i = void 0;
                t.editable ? ((i = void 0 !== e.textContent ? e.textContent : e.innerText) && g.a.opera && i.match(/^[ ]+$/) && (i = ""), i || (i = Object(P.I)("img", e).length > 0), i || (i = Object(P.I)("br", e).length > 1), i || (i = Object(P.I)("p", e).length > 1)) : i = e.value, o && i ? (Object(P.W)(n), e.phshown = !1) : o || i || (Object(P.Ta)(n), e.phshown = !0)
            }
        }
        var $t = function() {
            Object(P.Fa)(window._opener), window._opener = utilsNode.appendChild(Object(P.e)("iframe"))
        };

        function eo(e) {
            if (Object(T.d)(e)) return !0;
            if (S.a.set("last_reloaded", []), !cur.onMouseClick || !cur.onMouseClick(e)) {
                if (!(e = window.event || e.originalEvent || e)) return !0;
                for (var t = 8, o = e.target || e.srcElement, n = void 0, i = void 0, r = void 0; o && o !== bodyNode && "A" !== o.tagName && t--;) o = o.parentNode;
                if (!o || "A" !== o.tagName || o.onclick || o.onmousedown) return !0;
                var _ = o.href;
                if (_ && (o.getAttribute("target") || nav.baseBlank)) {
                    if (cur.hideReferrer && !g.a.msie) return (r = window.open("", "_blank", "")) && (g.a.msie && -1 !== _.indexOf(";") && (_ = "'" + _.replace(/'/g, "%27") + "'"), r.opener = null, r.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + Object(L.c)(_) + '">'), r.document.close()), Object(T.c)(e);
                    try {
                        return g.a.chrome && parseInt(g.a.version) >= 72 ? ((r = window.open(_, "_blank", "")).opener = null, Object(T.c)(e)) : (window._opener || $t(), window._opener.contentWindow.open(_, "_blank"), setTimeout($t, 0), Object(T.c)(e))
                    } catch (e) {
                        return !0
                    }
                }
                if ("https:" !== location.protocol && !_.indexOf("https://")) return !0;
                (_ = _.replace(/^https?:\/\//i, "")).indexOf(location.hostname) || (_ = _.replace(location.hostname, "")), vk.dev && "vk.com" === location.hostname && (_ = _.replace(/^(vkontakte\.ru\/|vk\.com\/)/, "/"));
                var a = {};
                (i = _.match(/^\/(.+?)#[\!\/](.+?)$/)) && !i[1].match(/^app(\d+)/) && (a.permanent = i[1], _ = "/" + i[2]);
                var c = !!(o.getAttribute && o.getAttribute("data-post-click-type") && o.getAttribute("data-post-id"));
                if (_.match(/#$/) && !c) return !0;
                var s = Object(P.s)(o, "post-id");
                s && (a.postId = s);
                var d = void 0,
                    u = _;
                if (n = _.match(/^\/(.*?)(\?|#|$)/)) n = n[1];
                else {
                    if (o.hostname) d = o.hostname, n = o.pathname + o.search;
                    else {
                        var l = /^([^:\/]+)?(?::(\d+))?(\/?[^#]*)(#?.*)$/i.exec(_);
                        if (!l) return !0;
                        d = l[1], n = l[3] || "/"
                    }
                    if (!d || !c) return !0;
                    o.setAttribute("data-change-location-with-post-away", 1), u = o
                }
                if ("add_community_app" === n) return Object(P.c)(o, "target", "_blank"), !0;
                if (n.indexOf(".php") > 0 || n.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images\/|utils\/|\.js|js\/|\.css|css\/|source\b)/)) {
                    if (!c) return !0;
                    o.setAttribute("data-change-location-with-post-away", 1), u = o
                }
                var p = o.getAttribute("hrefparams");
                p && (a.params = Object(L.i)(a.params || {}, Object(E.f)(p)));
                try {
                    return nav.go(u, e, a), Object(T.c)(e)
                } catch (e) {
                    return !0
                }
            }
        }

        function to(e, t) {
            (t = t || window.event).keyCode === T.a.ENTER && (e(), Object(T.c)(t))
        }

        function oo(e, t) {
            (10 === (e = e || window.event).keyCode || 13 === e.keyCode && (e.ctrlKey || e.metaKey && g.a.mac)) && (t(), Object(T.c)(e))
        }

        function no(e) {
            if (window._wf = 1, e.keyCode === T.a.ESC && boxQueue.count() && !cur._noEscHide) return boxQueue.hideLast(), -1;
            if (e.keyCode === T.a.ESC && window.articleCloseImageFullSize && window.articleCloseImageFullSize()) return Object(T.c)(event);
            if (e.keyCode === T.a.ESC && window.isArticleLayerOpen && window.isArticleLayerOpen()) return window.ArticleLayer.close(!0), Object(T.c)(event);
            if (e.keyCode === T.a.ESC && window.AuthorPage) return window.AuthorPage.close(), Object(T.c)(event);
            if (e.keyCode === T.a.ESC) return Object(R.b)(), Object(T.c)(e);
            var t = [176, 177, 178, 179],
                o = !1;
            window.audioPlayer && (t.push(T.a.LEFT), t.push(T.a.RIGHT)), Object(L.f)(t, function(t, n) {
                if (e.keyCode === n) return o = !0, !1
            }), o && Object(W.j)().onMediaKeyPressedEvent(e), Ee.inited && 191 === e.keyCode && (e.ctrlKey || e.metaKey && g.a.mac) && Ee.showFriends()
        }
        var io = o("i6oL"),
            ro = o("m0N1");
        w.polyfill(), window.Map = a, window.Set = c;
        var _o = window.vk;

        function ao() {
            window.NextPageID = 1, window.__debugMode = !0, window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost), window.__dev || (window.__debugMode = !1), window._wf = 0, window.cur = {
                destroy: [],
                nav: []
            }, _o.width = 960, _o.started = Object(L.L)(), _o.counts = {}, g.a.android && (Object(v.d)("remixscreen_width", window.screen.width, 365), Object(v.d)("remixscreen_height", window.screen.height, 365), Object(v.d)("remixscreen_dpr", window.devicePixelRatio || 1, 365)), Object(v.d)("remixscreen_depth", screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365), Object(v.d)("remixscreen_orient", Number(window.screen.width >= window.screen.height), 7), Object(J.f)(), Object(L.f)(StaticFiles, function(e, t) {
                t.t = -1 !== e.indexOf(".css") ? "css" : "js", t.n = e.replace(/[\/\.]/g, "_"), t.l = 0, t.c = 0
            }), Object(T.b)(window, "unload", function() {
                for (var e in vkCache) vkCache[e].handle && vkCache[e].handle.elem !== window && Object(T.h)(vkCache[e].handle.elem)
            }), Object(T.b)(window, "DOMContentLoaded load", function() {
                _o.loaded || (_o.loaded = !0, Object(z.y)()), Object(de.c)()
            }), Object(T.b)(document, "mousedown", function(e) {
                window._wf = 1, cur.__mdEvent = e
            }), window.browser.mobile || Object(T.b)(document, "keydown", no)
        }
        var co = 0;

        function so() {
            if (window.headNode = Object(P.J)("head"), window.icoNode = Object(P.J)("link", headNode), window.bodyNode = Object(P.J)("body"), window.htmlNode = Object(P.J)("html"), window.utilsNode = Object(P.F)("utils"), window._fixedNav = !1, window._tbLink = {}, Object(T.b)(bodyNode, "resize", de.j.pbind(!1)), utilsNode) {
                var e;
                g.a.mozilla ? Object(P.a)(bodyNode, "firefox") : g.a.mobile && Object(P.a)(bodyNode, "mobfixed"), e = [], Object(L.f)(g.a, function(t, o) {
                    o && !Object(L.o)(t, ["version", "mac", "search_bot"]) && "flash" !== t.substr(0, 5) && e.push(t)
                }), e = e.join(" "), bodyNode.setAttribute("data-useragent", e), Object(L.f)(StaticFiles, function(e, t) {
                    t.l = 1, "css" === t.t && utilsNode.appendChild(Object(P.e)("div", {
                        id: t.n
                    }))
                });
                var t = Object(P.F)("layer_bg"),
                    o = t.nextSibling,
                    n = Object(P.F)("box_layer_bg"),
                    i = n.nextSibling;
                window.layerBG = t, window.boxLayerBG = n, window.layerWrap = o, window.layer = o.firstChild, window.boxLayerWrap = i, window.boxLayer = i.firstChild, window.boxLoader = i.firstChild.firstChild, window._stlSide = Object(P.F)("stl_side"), window._stlLeft = Object(P.F)("stl_left"), window._stlShown = 0, window._stlWas = 0, window._stlWasSet = 0, window._stlBack = 0, window._regBar = 0, window.__afterFocus = !1, g.a.mobile || Object(io.a)(), Object(T.b)(i, "click", boxQueue.hideLastCheck), window.LazyLoad && LazyLoad.watch(i), window.layers = function(e, t, o, n) {
                    return window.layerQueue = K, Object(L.i)(U, {
                        show: U._show.pbind(e, t),
                        boxshow: U._show.pbind(o, n),
                        wrapshow: U._show.pbind(e),
                        hide: U._hide.pbind(e, t),
                        boxhide: U._hide.pbind(o, n),
                        wraphide: U._hide.pbind(e)
                    }), U
                }(t, o, n, i), hab.init(), window._retinaInit ? window._retinaInit() : co = 1
            }
        }

        function uo() {
            if (utilsNode) {
                Object(io.b)();
                var e = Object(P.F)("side_bar");
                window.pageNode = Object(P.F)("page_wrap"), window._fixedNav = e && "fixed" === Object(P.O)(e, "position"), window._tbLink = Object(P.F)("top_back_link"), g.a.chrome || g.a.msie_edge ? window.scrollNode = document.scrollingElement || bodyNode : window.scrollNode = g.a.safari ? bodyNode : htmlNode;
                var t = Math.max(Object(L.L)() - _o.started, 10),
                    o = Object(L.r)((_o.contlen || 1) / t * 1e3);
                g.a.mozilla && g.a.version >= 4 ? o /= 2.5 : g.a.mozilla ? o *= 1.5 : g.a.msie && g.a.version >= 7 ? o /= 1.5 : g.a.msie && (o *= 2.5);
                var n = Object(L.r)(150 * Math.max(2e6 / o, 1));
                if (H.highlimit = 6 * n, H.lowlimit = Math.min(n, 600), Object(de.j)(), setTimeout(de.j.pbind(!1), 0), Object(Gt.c)(), window.addEventListener("scroll", de.k, {
                        passive: !0
                    }), window.debuglogInit && debuglogInit(), !_o.id && S.a.checkVersion() && S.a.get("last_reloaded")) try {
                    var i = {};
                    Object(L.f)(["sound_notify_off", "im_ui_notify_off"], function(e, t) {
                        var o = S.a.get(t);
                        null !== o && (i[t] = o)
                    }), window.localStorage.clear(), Object(L.f)(i, function(e, t) {
                        return S.a.set(e, t)
                    })
                } catch (e) {}
            }
        }
        var lo = function() {
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

        function po(e) {
            _o.loaded ? e() : Object(T.b)(window, "load", e)
        }

        function bo() {
            window.showWriteMessageBox = me.g, window.giftsBox = me.a, window.moneyTransferBox = me.d, window.reportAd = me.e, window.mobilePromo = me.c, window.showAudioClaimWarning = me.f, window.menuSettings = me.b, window.sureDeleteAll = me.h, window.TopNotifier = Object(W.l)(), window.showPhoto = W.x, window.showManyPhoto = W.w, window.showAlbums = W.u, window.showAlbum = W.t, window.showPhotoTags = W.y, window.isPhotoeditor3Available = W.o, window.AudioMessagePlayer = W.a, window.showVideoTags = W.A, window.videoCallback = W.C, window.showWiki = W.B, window.showApp = W.v, window.showPodcast = W.z, window.podcastStartFrom = W.r, window.articlePrepare = W.b, window.isArticleLayerOpen = W.n, window.isArticleEditorAvailable = W.m, window.openArticleEditor = W.q, window.mentionOver = we, window.mentionClick = W.p, window.mobileOnlineTip = be, window.pageVerifiedTip = fe, window.audioShowActionTooltip = he, window.shareAudioPlaylist = W.s, window.getAudioPlayer = W.j, window.deleteAudioOnClaim = W.i, window.initTopAudioPlayer = W.k, window.bookmark = W.c, window.bookmarkPost = W.h, window.bookmarkArticle = W.d, window.bookmarkLink = W.e, window.bookmarkPodcast = W.g, window.bookmarkNarrative = W.f, window.bookmarkTooltip = Oe, window.showStory = B.c, window.showNarrative = B.b, window.storiesPreloadStatic = B.d, window.sendMask = B.a
        }
        window.constants = {
            Groups: ae
        }, Object(P.X)(), window.ge = P.F, window.geByTag = P.I, window.geByTag1 = P.J, window.geByClass = P.G, window.geByClass1 = P.H, window.gpeByClass = P.T, window.domQuery = P.B, window.domQuery1 = P.C, window.domClosest = P.n, window.ce = P.e, window.cf = P.f, window.re = P.Fa, window.se = P.Ma, window.sech = P.Na, window.rs = P.La, window.psr = P.Ea, window.domReplaceEl = P.D, window.domEL = P.t, window.domNS = P.y, window.domPS = P.A, window.domFC = P.u, window.domLC = P.x, window.domPN = P.z, window.domChildren = P.m, window.domInsertBefore = P.w, window.domInsertAfter = P.v, window.domByClass = P.j, window.domData = P.s, window.domChildIndex = P.l, window.domCA = P.k, window.domClosestSibling = P.r, window.matchesSelector = P.Da, window.isHover = P.Z, window.isAncestor = P.Y, window.getScroll = P.M, window.domClosestPositioned = P.q, window.domClosestOverflowHidden = P.p, window.show = P.Ta, window.hide = P.W, window.isVisible = P.Aa, window.clientHeight = P.h, window.getClientRectOffsetY = P.K, window.toggle = P.Ua, window.boundingRectEnabled = P.d, window.getXYRect = P.R, window.getXY = P.Q, window.isWindow = P.Ba, window.getSize = P.N, window.hasClass = P.V, window.addClass = P.a, window.addClassDelayed = P.b, window.removeClass = P.Ha, window.removeClassDelayed = P.Ia, window.toggleClass = P.Va, window.toggleClassDelayed = P.Wa, window.replaceClass = P.Ka, window.getStyle = P.O, window.setStyle = P.Qa, window.setStyleDelayed = P.Ra, window.setPseudoStyle = P.Pa, window.data = P.i, window.attr = P.c, window.removeAttr = P.Ga, window.removeData = P.Ja, window.cleanElems = P.g, window.setTitle = P.Sa, window.getZoom = P.S, window.val = P.Ya, window.elfocus = P.E, window.traverseParent = P.Xa, window.getH = P.L, window.getW = P.P, window.domClosestByTag = P.o, window.setDocumentTitle = P.Oa, window.lockDocumentTitle = P.Ca, window.KEY = T.a, window.addEvent = T.b, window.removeEvent = T.h, window.triggerEvent = T.j, window.cancelEvent = T.c, window.stopEvent = T.i, window.normEvent = T.g, window.checkEvent = T.d, window.checkKeyboardEvent = T.e, window.checkOver = T.f, Object(L.q)(), window.isRetina = L.y, window.extractUrls = L.j, window.serializeForm = L.F, window.addTemplates = L.a, window.getTemplate = L.n, window.rand = L.D, window.irand = L.s, window.isUndefined = L.A, window.isFunction = L.v, window.isArray = L.t, window.isString = L.z, window.isObject = L.x, window.isEmpty = L.u, window.vkNow = L.L, window.vkImage = L.J, window.trim = L.H, window.stripHTML = L.G, window.escapeRE = L.h, window.intval = L.r, window.floatval = L.k, window.positive = L.C, window.isNumeric = L.w, window.winToUtf = L.M, window.replaceEntities = L.E, window.clean = L.c, window.unclean = L.I, window.each = L.f, window.indexOf = L.p, window.inArray = L.o, window.clone = L.d, window.arrayKeyDiff = L.b, window.extend = L.i, window.vkLocal = L.K, window.lTimeout = L.B, window.getCaretCharacterOffsetWithin = L.m, window.formatCount = L.l, window.encodeHtml = L.g, window.decodeHtml = L.e, Object(E.c)(), window.ajx2q = E.b, window.q2ajx = E.f, window.requestBox = E.g, window.activateMobileBox = E.a, window.validateMobileBox = E.h, window.validatePassBox = E.i, window.photoCaptchaBox = E.e, Object(v.c)(), window.getCookie = v.a, window.setCookie = v.d, window.hideCookiesPolicy = v.b, Object(se.c)(), window.debugLog = se.b, window.debugEl = se.a, window.isToday = ce.c, window.isYesterday = ce.e, window.isTomorrow = ce.d, window.isSameDate = ce.b, window.leadingZero = ce.f, window.formatTime = ce.a, window.parseLatin = A.o, window.parseCyr = A.m, window.parseLatKeys = A.n, window.langNumeric = A.i, window.langSex = A.j, window.langStr = A.k, window.addLangKeys = A.a, window.getLang = A.d, window.langDate = A.h, window.getShortDate = A.e, window.getShortDateOrTime = A.f, window.langWordNumeric = A.l, window.getDateText = A.c, window.getBigDateNew = A.b, window.getSmDate = A.g, window.scrollToY = C.g, window.scrollToTop = C.f, window.scrollGetX = C.d, window.scrollGetY = C.e, window.disableBodyScroll = C.a, window.enableBodyScroll = C.b, window.Chat = Ee, window.__qlTimer = null, window.__qlClear = Le, window.onLoginDone = ke, window.onLoginFailed = Ae, window.onLoginCaptcha = Ce, window.onLoginReCaptcha = Ie, window.storePasswordCredential = xe, window.cssAnim = ge, window.imagesLoader = Pe, window.nodeUpdated = Be, window.hideNewsAnnounce = Me, window.leftAdBlockClose = ye, window.leftBlockToggleFriend = De, window.leftBlockFriendTooltip = Te, window.fifaReplaceText = je, window.placeholderSetup = Jt, window.placeholderInit = Zt, window.isInputActive = Yt, window.showTooltip = pe.c, window.showTitle = pe.b, window.showHint = pe.a, window.topMsg = m.d, window.showMsg = m.b, window.topError = m.c, window.showGlobalPrg = m.a, window.checkTextLength = Re.b, window.getSelectionText = Re.d, window.goAway = Re.e, window.debounce = Re.c, window.hashCode = Re.g, window.isFullScreen = Re.h, window.parallel = Re.k, window.parseJSON = Re.l, window.shuffle = Re.m, window.throttle = Re.n, window.toggleOnline = Re.q, window.updateMoney = Re.s, window.onlinePlatformClass = Re.j, window.Fx = D.a, window.fx = D.a, window.animate = D.b, window.cubicBezier = D.d, window.fadeTo = D.g, window.genFx = D.i, window.getRGB = D.k, window.getColor = D.j, window.slideDown = D.l, window.slideUp = D.n, window.slideToggle = D.m, window.fadeIn = D.e, window.fadeOut = D.f, window.fadeToggle = D.h, window.animateCount = D.c, window.updateAriaElements = Gt.c, window.updateAriaCheckboxes = Gt.b, window.hasAccessibilityMode = Gt.a, window.cancelStackFilter = R.a, window.cancelStackPush = R.c, window.cancelStackPop = R.b, window.ElementTooltip = j.a, window._iconAdd = window.devicePixelRatio >= 2 ? "_2x" : "", window.setFavIcon = M, 1 === _o.al ? (location.search || "/" !== location.pathname) && location.replace("/") : (3 !== _o.al || history.pushState || (_o.al = 2), location.search || "/index.php" !== location.pathname || location.replace("/"), _o.version = !1), window.jsc = F, window.stVersions || (window.stVersions = {}, window.stTypes = {}, window.navMap = {}), window.StaticFiles || (window.StaticFiles = {}), window.stManager = H, Object(g.c)(), window.browser = g.a, window.mobPlatforms = g.d, window.browserFeatures = g.b, Object(y.a)(), window.toggleFlash = y.c, window.renderFlash = y.b, ao(), window.updateHeaderStyles = J.j, window.updateNarrow = de.m, window.checkPageBlocks = de.c, window.redraw = de.l, window.onBodyResize = de.j, window.onBodyScroll = de.k, window.leftBlockOver = de.i, window.leftBlockOut = de.h, window.leftBlockHide = de.g, window.onDocumentClick = eo, window.onEnter = to, window.onCtrlEnter = oo, window.autosizeSetup = de.b, window.getProgressBarEl = de.e, window.getProgressHtml = de.f, Object(ro.b)(), _e(), window.onDomReady = function(e) {
            return e()
        }, window.currentModule = function() {
            return cur.currentModule ? cur.currentModule() : cur.module
        }, window.hab = k(), window.ls = S.a, window.shortCurrency = N, window.statlogsValueEvent = V.a, window.callHub = lo, window.CallHub = lo, window.gSearch = new Q, window.zNav = J.m, window.handlePageView = J.e, window.handlePageParams = J.d, window.handlePageCount = J.c, window.comScoreUDM = J.a, window.updateOtherCounters = J.l, window.processDestroy = J.g, window.globalHistoryDestroy = J.b, window.showBackLink = J.i, window.nav = X.a, nav.init(), _o.time && !window.browser.opera_mobile && setTimeout(function() {
            var e = new Date,
                t = [0, e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()];
            1 === t[1] && 12 === _o.time[1] ? _o.time[1] = 0 : 12 === t[1] && 1 === _o.time[1] ? t[1] = 0 : (t[1] > _o.time[1] + 1 || _o.time[1] > t[1] + 1) && (t[1] = _o.time[1] = t[2] = _o.time[2] = 0), t[1] > _o.time[1] && 1 === t[2] ? 31 === _o.time[2] || (4 === _o.time[1] || 6 === _o.time[1] || 9 === _o.time[1] || 11 === _o.time[1]) && 30 === _o.time[2] || 2 === _o.time[1] && (29 === _o.time[2] || 28 === _o.time[2] && _o.time[0] % 4) ? _o.time[2] = 0 : _o.time[2] = t[2] = 0 : _o.time[1] > t[1] && 1 === _o.time[2] && (31 === t[2] || (4 === t[1] || 6 === t[1] || 9 === t[1] || 11 === t[1]) && 30 === t[2] || 2 === t[1] && (29 === t[2] || 28 === t[2] && _o.time[0] % 4) ? t[2] = 0 : t[2] = _o.time[2] = 0), (t[2] > _o.time[2] + 1 || _o.time[2] > t[2] + 1) && (t[2] = _o.time[2] = 0);
            var o = 60 * (60 * (24 * (t[2] - _o.time[2]) + (t[3] - _o.time[3])) + (t[4] - _o.time[4]));
            o < -55800 ? o += 86400 : o > 37800 && (o -= 86400);
            var n = 0,
                i = Math.abs(o);
            Object(L.f)([-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13], function(e, t) {
                var r = Math.round(3600 * (t - 3)),
                    _ = Math.abs(o - r);
                _ < i && (i = _, n = r)
            }), _o.dt = n, Object(v.a)("remixdt") !== _o.dt && Object(v.d)("remixdt", _o.dt, 365);
            var r = Object(L.r)(Object(v.a)("remixrt"));
            window.devicePixelRatio >= 2 && (!g.a.iphone || Object(v.a)("remixme")) ? 1 & r || (Object(v.d)("remixrt", 1 | r, 365), window._retinaInit = function() {
                H.add(["retina.css"]), Object(P.a)(document.body, "is_2x")
            }, co && window._retinaInit()) : 1 & r && Object(v.d)("remixrt", 1 ^ r, 365)
        }, 0), window.boxQueue = Object(le.c)(), window.__bq = boxQueue, window.curBox = le.b, Object(le.d)(), window.boxRefreshCoords = le.a, window.MessageBox = ue.a, window.showBox = ue.b, window.showTabbedBox = ue.f, window.showFastBox = ue.d, window.showCaptchaBox = ue.c, window.showReCaptchaBox = ue.e, window.showDoneBox = le.e, window.TopMenu = de.a, window.TopSearch = Y.a, window.handleScroll = Re.f, window.loadScript = G.a, Object(z.j)(), window.notaBene = z.q, window.updSideTopLink = z.y, window.createButton = z.d, window.actionsMenuItemLocked = z.a, window.lockActionsMenuItem = z.n, window.unlockActionsMenuItem = z.v, window.linkLocked = z.m, window.lockLink = z.p, window.unlockLink = z.x, window.lockButton = z.o, window.unlockButton = z.w, window.buttonLocked = z.b, window.isButtonLocked = z.k, window.disableButton = z.f, window.sbWidth = z.t, window.isChecked = z.l, window.checkbox = z.c, window.disable = z.e, window.radioval = z.s, window.radiobtn = z.r, window.showProgress = z.u, window.hideProgress = z.i, window.disableEl = z.g, window.enableEl = z.h, Object(I.d)(), window.VideoConstants = I.a, window.showVideo = I.j, window.showInlineVideo = I.i, window.loadInlineVideo = I.e, window.revertLastInlineVideo = I.h, window.destroyInlineVideoPlayer = I.c, window.pauseLastInlineVideo = I.f, window.playLastInlineVideo = I.g, window.checkMp4 = I.b, window.performance && window.performance.memory && Object(L.D)(0, 100) < 5 && Object(Qt.a)(), at ? (Object(T.b)(window, "blur", Mt), Object(T.b)(window, "focus", yt), onDomReady(function() {
            return setTimeout(vt, 500)
        }), window.LongView = {
            register: gt,
            onScroll: Object(Re.n)(jt, 50),
            onBeforePageChange: Dt,
            clearElemsCache: Et,
            _debug: function() {
                return {
                    started: st,
                    tracking: ct,
                    viewedData: dt,
                    viewIndexes: mt,
                    blindTop: lt,
                    blindBottom: pt
                }
            }
        }) : window.LongView = {
            register: function() {},
            onScroll: function() {},
            onBeforePageChange: function() {},
            clearElemsCache: function() {}
        }, window._postsSeen = {}, window._postsSaved = {}, window._postsSaveTimer = void 0, window._postsSendTimer = void 0, window._postsCleanTimer = void 0, window._postsSeenModules = {}, window._postsExtras = {}, bo(), window.onLoaded = po, window.domStarted = so, window.domReady = uo, Object(se.b)("common module enabled"), H.done(jsc("web/common_web.js"))
    },
    hPIQ: function(e, t) {
        e.exports = {}
    },
    hswa: function(e, t, o) {
        var n = o("y3w9"),
            i = o("xpql"),
            r = o("apmT"),
            _ = Object.defineProperty;
        t.f = o("nh4g") ? Object.defineProperty : function(e, t, o) {
            if (n(e), t = r(t, !0), n(o), i) try {
                return _(e, t, o)
            } catch (e) {}
            if ("get" in o || "set" in o) throw TypeError("Accessors not supported!");
            return "value" in o && (e[t] = o.value), e
        }
    },
    i5dc: function(e, t, o) {
        var n = o("0/R4"),
            i = o("y3w9"),
            r = function(e, t) {
                if (i(e), !n(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
            };
        e.exports = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, n) {
                try {
                    (n = o("m0Pp")(Function.call, o("EemH").f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
                } catch (e) {
                    t = !0
                }
                return function(e, o) {
                    return r(e, o), t ? e.__proto__ = o : n(e, o), e
                }
            }({}, !1) : void 0),
            check: r
        }
    },
    i6oL: function(e, t, o) {
        "use strict";
        o.d(t, "a", function() {
            return p
        }), o.d(t, "b", function() {
            return w
        });
        var n = o("v+DW"),
            i = o("El3O"),
            r = o("kHqu"),
            _ = o("Egk5"),
            a = o("lXE5"),
            c = o("zxIV"),
            s = o("t7n3"),
            d = o("4+be"),
            u = !1,
            l = !0;

        function p() {
            var e = {
                onclick: b,
                onmousedown: f,
                onmouseover: h,
                onmouseout: h
            };
            Object(c.Ya)(_stlLeft, '<div id="stl_bg"><nobr id="stl_text">' + Object(d.d)("global_to_top") + "</nobr></div>"), Object(s.i)(_stlLeft, e), Object(s.i)(_stlSide, e), window._stlBg = _stlLeft.firstChild, window._stlText = window._stlBg.firstChild, Object(_.b)(window, "blur", function() {
                window._wf = -1, u = !1
            }), Object(_.b)(window, "focus", function() {
                window._wf = 1, u || (window.__afterFocus = !0, u = !0, setTimeout(function() {
                    window.__afterFocus = !1
                }, 10), l && (Object(n.t)(!0), Object(i.j)(!0), l = !1))
            })
        }

        function b(e) {
            return Object(_.d)(e) || Object(_.c)(e)
        }

        function f(e) {
            if (e = e || window.event, !Object(_.d)(e) && !__afterFocus)
                if (_stlWasSet && _stlWas) {
                    var t = _stlWas;
                    window._stlWas = 0, Object(a.g)(t, 0, !0, !0), Object(r.k)(!0)
                } else 1 === _stlBack ? _tbLink.onclick() : (window._stlWas = Object(a.e)(), Object(a.g)(0, 0, !0, !0), Object(r.k)())
        }

        function h(e) {
            var t = e ? e.originalEvent || e : window.event || {},
                o = "mouseover" === t.type && (t.pageX > 0 || t.clientX > 0);
            Object(c.Va)(_stlLeft, "over", o), Object(c.Va)(_stlLeft, "over_fast", o && (0 === _stlBack || _tbLink.fast) && 0 === _stlWasSet), Object(c.Va)(_stlSide, "over", o)
        }

        function w() {
            var e = window.innerWidth,
                t = document.documentElement.clientWidth,
                o = Math.max(Object(s.r)(e), Object(s.r)(t));
            Object(c.Va)(bodyNode, "no_stl", o < vk.width + 280), Object(c.Va)(bodyNode, "no_sett", o < vk.width + 62)
        }
    },
    k487: function(e, t, o) {
        "use strict";
        var n = o("zxIV"),
            i = o("t7n3"),
            r = o("Egk5"),
            _ = o("lXE5"),
            a = o("El3O");
        var c = function() {
            function e(t, o) {
                if (function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.constructor !== e) throw new Error("ElementTooltip was called without 'new' operator");
                if (!(t = Object(n.F)(t)) || !t.nodeType) throw new Error("First argument not a DOM element");
                if (Object(n.i)(t, "ett")) return Object(n.i)(t, "ett");
                if (this._opts = Object(i.i)({
                        delay: 100,
                        offset: [0, 0],
                        shift: 0,
                        type: e.TYPE_VERTICAL,
                        id: "",
                        cls: "",
                        width: null,
                        appendToParent: !1,
                        autoShow: !0,
                        autoHide: !1,
                        noHideOnClick: !1,
                        arrowSize: "normal",
                        customShow: !1,
                        align: e.ALIGN_CENTER
                    }, o), this._opts.customShow && (this._opts.autoShow = !1), this._opts.defaultSide || (this._opts.defaultSide = this._opts.type === e.TYPE_VERTICAL ? "top" : "left"), this._opts.cls += " eltt_arrow_size_" + this._opts.arrowSize, this._opts.cls += " eltt_align_" + this._opts.align, this._opts.noBorder && (this._opts.cls += " eltt_noborder"), this._opts.type !== e.TYPE_VERTICAL && delete this._opts.shift, this._opts.setPos && !this._opts.forceSide) throw new Error("forceSide parameter should be set if you use setPos");
                this._opts.forceSide && (this._opts.type = Object(i.o)(this._opts.forceSide, ["top", "bottom"]) ? e.TYPE_VERTICAL : e.TYPE_HORIZONTAL), this._appendToEl = this._opts.appendTo ? this._opts.appendTo : this._opts.appendToParent ? Object(n.q)(t, {
                    noOverflow: !0
                }) : t, this._arrowSize = {
                    mini: e.ARROW_SIZE_MINI,
                    normal: e.ARROW_SIZE_NORMAL,
                    big: e.ARROW_SIZE_BIG
                }[this._opts.arrowSize], this._opts.forceSide && (this._opts.type = e.getType(this._opts.forceSide)), this._el = t, Object(n.i)(this._el, "ett", this), this._initEvents(t), this._clearTimeouts(), this._isShown = !1
            }
            return e.prototype._initEvents = function(e) {
                var t = this;
                this._opts.autoShow && (this._el_me_event = this._onMouseEnter.bind(this), Object(r.b)(e, "mouseenter", this._el_me_event)), (this._opts.autoShow || this._opts.autoHide) && (this._el_ml_event = this._onMouseLeave.bind(this), Object(r.b)(e, "mouseleave", this._el_ml_event)), this._opts.autoShow || this._opts.customShow || (this._el_c_event = function() {
                    t._isShown && t._opts.noHideOnClick || t.toggle(!t._isShown)
                }, Object(r.b)(e, "click", this._el_c_event))
            }, e.prototype._onMouseEnter = function(e) {
                clearTimeout(this._hto), this._hto = !1, !this._isShown && this._opts.autoShow && (clearTimeout(this._reTimeout), this._reTimeout = !1, clearTimeout(this._sto), this._sto = setTimeout(this.show.bind(this), this._opts.delay))
            }, e.prototype._onMouseLeave = function(e) {
                this._clearTimeouts(), this._hto = setTimeout(this._hide.bind(this), 200)
            }, e.prototype._onMouseWindowClick = function(e) {
                if (!this._opts.noAutoHideOnWindowClick) {
                    for (var t = e.target; t && t !== this._ttel && t !== document.body && t !== this._el;) t = Object(n.z)(t);
                    if (!Object(n.V)(e.target, "_ap_layer__close")) return t && t !== document.body ? void 0 : Object(i.v)(this._opts.onWindowClick) ? (this._opts.onWindowClick(), Object(r.c)(e)) : (this.hide(!0), Object(r.c)(e))
                }
            }, e.prototype.destroy = function() {
                this._el_me_event && Object(r.h)(this._el, "mouseenter", this._el_me_event), this._el_ml_event && Object(r.h)(this._el, "mouseleave", this._el_ml_event), this._el_c_event && Object(r.h)(this._el, "click", this._el_c_event), this._clearTimeouts(), Object(n.Ja)(this._el, "ett"), Object(n.Fa)(this._ttel), this._ev_wclick && Object(r.h)(document, "mousedown", this._ev_wclick);
                var e = void 0;
                this._ttel && (e = Object(n.H)("_eltt_content", this._ttel)), this._opts.onDestroy && this._opts.onDestroy(e)
            }, e.prototype.hide = function(e) {
                this._hide(e)
            }, e.prototype._onTooltipMouseEnter = function(e) {
                this._clearTimeouts()
            }, e.prototype._onTooltipMouseLeave = function(e) {
                this._onMouseLeave()
            }, e.prototype.build = function() {
                if (!this._ttel) {
                    this._ttel = Object(n.Ma)('\n        <div class="eltt ' + (this._opts.cls || "") + '" id="' + this._opts.id + '">\n          <div class="eltt_arrow_back _eltt_arrow_back">\n            <div class="eltt_arrow"></div>\n          </div>\n          <div class="eltt_content _eltt_content"></div>\n        </div>'), this._ttArrowEl = Object(n.H)("_eltt_arrow_back", this._ttel);
                    var e = Object(n.H)("_eltt_content", this._ttel);
                    this._opts.content && (Object(i.z)(this._opts.content) ? e.innerHTML = this._opts.content : e.appendChild(this._opts.content)), this._appendToEl.appendChild(this._ttel)
                }
            }, e.prototype.show = function() {
                if (this._isShown) this.updatePosition();
                else {
                    if (this._clearTimeouts(), this._ttel || (this.build(), (this._opts.autoShow || this._opts.autoHide) && (this._ev_ttenter = this._onTooltipMouseEnter.bind(this), this._ev_ttleave = this._onTooltipMouseLeave.bind(this), Object(r.b)(this._ttel, "mouseenter", this._ev_ttenter), Object(r.b)(this._ttel, "mouseleave", this._ev_ttleave))), this._opts.width) {
                        var e = Object(i.v)(this._opts.width) ? this._opts.width.call(this) : this._opts.width;
                        Object(n.Qa)(this._ttel, "width", e)
                    }
                    Object(n.Ta)(this._ttel);
                    var t = Object(n.H)("_eltt_content", this._ttel);
                    this._opts.onFirstTimeShow && !this._firstTimeShown && this._opts.onFirstTimeShow.call(this, t, this._ttel), this._opts.onShow && this._opts.onShow(t, !this._firstTimeShown), this._firstTimeShown = !0, this.updatePosition(), this._isShown = !0, this._visTO = setTimeout(n.a.pbind(this._ttel, "eltt_vis"), 10), this._opts.elClassWhenShown && Object(n.a)(this._el, this._opts.elClassWhenShown), this._ev_wclick && Object(r.h)(document, "mousedown", this._ev_wclick), this._ev_wclick = this._onMouseWindowClick.bind(this), Object(r.b)(document, "mousedown", this._ev_wclick)
                }
            }, e.getType = function(t) {
                switch (t) {
                    case "top":
                    case "bottom":
                        return e.TYPE_VERTICAL;
                    case "right":
                    case "left":
                        return e.TYPE_HORIZONTAL
                }
            }, e.prototype.getOptions = function() {
                return this._opts
            }, e.prototype.updatePosition = function() {
                var t = this,
                    o = this._opts.forceSide,
                    r = !!this._opts.getTargetBoundingBox && this._opts.getTargetBoundingBox(this);
                if (!r) {
                    var c = Object(n.Q)(this._el),
                        s = Object(n.N)(this._el);
                    r = {
                        left: c[0],
                        top: c[1],
                        width: s[0],
                        height: s[1]
                    }
                }
                var d = this._opts.getWrapEl ? this._opts.getWrapEl(this) : Object(n.T)("audio_layer_container", this._ttel),
                    u = d || Object(n.p)(this._ttel),
                    l = u !== bodyNode ? Object(n.Q)(u) : [Object(_.d)(), Object(_.e)() + Object(a.d)()],
                    p = u !== bodyNode ? Object(n.N)(u) : [window.innerWidth, window.innerHeight],
                    b = Object(n.N)(this._ttel),
                    f = this._arrowSize,
                    h = this._opts.noBorder ? 0 : 1,
                    w = Object(i.v)(this._opts.offset) ? this._opts.offset() : this._opts.offset,
                    O = void 0,
                    m = function(o, i) {
                        var _ = {},
                            a = [vk.rtl ? "marginRight" : "marginLeft", "marginTop"].indexOf(o),
                            c = void 0;
                        c = t._opts.align === (vk.rtl ? e.ALIGN_LEFT : e.ALIGN_RIGHT) ? b[a] - Math.max(h + f + (i || 0), Math.min(b[a], r[a ? "height" : "width"]) / 2) : t._opts.align === (vk.rtl ? e.ALIGN_RIGHT : e.ALIGN_LEFT) ? Math.max(h + f + (i || 0), Math.min(b[a], r[a ? "height" : "width"]) / 2) : b[a] / 2, _[o] = Math.floor(c) - h - f - (i || 0), Object(n.Qa)(t._ttArrowEl, _)
                    };
                if (this._opts.setPos) O = this._opts.setPos(this) || {}, e.getType(o) === e.TYPE_VERTICAL ? void 0 !== O.arrowPosition ? Object(n.Qa)(this._ttArrowEl, {
                    marginLeft: O.arrowPosition
                }) : vk.rtl ? m("marginRight") : m("marginLeft") : void 0 !== O.arrowPosition ? Object(n.Qa)(this._ttArrowEl, {
                    marginTop: O.arrowPosition
                }) : m("marginTop");
                else {
                    if (!o && this._prevSide && this._opts.preventSideChange) o = this._prevSide;
                    else if (!o)
                        if (this._opts.type === e.TYPE_VERTICAL) {
                            var v = Object(n.V)(bodyNode, "body_im") ? this._opts.bottomGap || 60 : this._opts.bottomGap || 0,
                                E = r.top - l[1] > b[1] + f - w[1],
                                g = Object(_.e)() + p[1] - (r.top + r.height + f) - v > b[1];
                            o = "top" === this._opts.defaultSide ? E ? "top" : "bottom" : g ? "bottom" : "top"
                        } else o = r.left - l[0] < b[0] ? "right" : "left";
                    var j = Object(n.Q)(this._appendToEl),
                        P = [r.left - j[0], r.top - j[1]],
                        M = void 0,
                        y = w[0] + P[0];
                    this._opts.centerShift ? (y += this._opts.centerShift || 0, M = this._opts.centerShift) : this._opts.rightShift && (y += M = -(b[0] / 2 - this._opts.rightShift)), this._prevSide = o;
                    var D = void 0,
                        T = void 0,
                        L = void 0,
                        x = void 0,
                        k = void 0;
                    switch (this._opts.align === (vk.rtl ? e.ALIGN_LEFT : e.ALIGN_RIGHT) ? (D = r.width - b[0], T = r.height - b[1]) : this._opts.align === (vk.rtl ? e.ALIGN_RIGHT : e.ALIGN_LEFT) ? (D = 0, T = 0) : (D = -b[0] / 2 + r.width / 2, T = r.height / 2 - b[1] / 2), o) {
                        case "bottom":
                            x = D + y, k = r.height + f - w[1] + P[1], M || ((L = D + r.left + w[0] + b[0] + 20 - (l[0] + p[0])) < 0 && (L = 0), x -= L, M = -L), O = {
                                left: x,
                                top: k
                            };
                            break;
                        case "top":
                            x = D + y, k = -b[1] - f + w[1] + P[1], M || ((L = D + r.left + w[0] + b[0] + 20 - (l[0] + p[0])) < 0 && (L = 0), x -= L, M = -L), O = {
                                left: x,
                                top: k
                            };
                            break;
                        case "right":
                            x = r.width + f + y, k = T + w[1] + P[1], M || ((L = T + r.top + w[1] - (l[1] + 20)) > 0 && (L = 0), k -= L, M = -L), O = {
                                left: x,
                                top: k
                            };
                            break;
                        case "left":
                            x = -b[0] - f + y, k = T + w[1] + P[1], M || ((L = T + r.top + w[1] - (l[1] + 20)) > 0 && (L = 0), k -= L, M = -L), O = {
                                left: x,
                                top: k
                            }
                    }
                    this._opts.type === e.TYPE_VERTICAL ? vk.rtl ? m("marginRight", M) : m("marginLeft", M) : m("marginTop", M)
                }
                Object(i.f)(["top", "bottom", "left", "right"], function(e, t) {
                    o !== t && Object(n.Ha)(this._ttel, "eltt_" + t)
                }.bind(this)), Object(n.a)(this._ttel, "eltt_" + o), Object(n.Qa)(this._ttel, O)
            }, e.prototype._hide = function(t) {
                if (this._isShown = !1, this._clearTimeouts(), this._reTimeout = setTimeout(function() {
                        Object(n.W)(this._ttel), this._opts.elClassWhenShown && Object(n.Ha)(this._el, this._opts.elClassWhenShown), this._opts.onHide && this._opts.onHide(this._ttel, !!t)
                    }.bind(this), e.FADE_SPEED), this._opts.onBeforeHide) try {
                    this._opts.onBeforeHide(this._ttel, !!t)
                } catch (e) {}
                Object(n.Ha)(this._ttel, "eltt_vis"), this._ev_wclick && Object(r.h)(document, "mousedown", this._ev_wclick)
            }, e.prototype.isShown = function() {
                return this._isShown
            }, e.prototype.toggle = function() {
                this.isShown() ? this.hide() : this.show()
            }, e.prototype._clearTimeouts = function() {
                this._visTO && clearTimeout(this._visTO), this._visTO = !1, this._sto && clearTimeout(this._sto), this._sto = !1, this._hto && clearTimeout(this._hto), this._hto = !1, this._reTimeout && clearTimeout(this._reTimeout), this._reTimeout = !1
            }, e.prototype.getContent = function() {
                return Object(n.H)("_eltt_content", this._ttel)
            }, e
        }();
        c.TYPE_VERTICAL = 0, c.TYPE_HORIZONTAL = 1, c.FADE_SPEED = 100, c.ARROW_SIZE_MINI = 9, c.ARROW_SIZE_NORMAL = 8, c.ARROW_SIZE_BIG = 16, c.ALIGN_LEFT = "left", c.ALIGN_CENTER = "center", c.ALIGN_RIGHT = "right", t.a = c
    },
    kHqu: function(e, t, o) {
        "use strict";
        o.d(t, "f", function() {
            return g
        }), o.d(t, "j", function() {
            return j
        }), o.d(t, "k", function() {
            return P
        }), o.d(t, "c", function() {
            return y
        }), o.d(t, "d", function() {
            return D
        }), o.d(t, "l", function() {
            return T
        }), o.d(t, "a", function() {
            return L
        }), o.d(t, "h", function() {
            return x
        }), o.d(t, "b", function() {
            return k
        }), o.d(t, "i", function() {
            return A
        }), o.d(t, "g", function() {
            return C
        }), o.d(t, "e", function() {
            return I
        }), o.d(t, "m", function() {
            return B
        });
        var n = o("zxIV"),
            i = o("t7n3"),
            r = o("4+be"),
            _ = o("7jxN"),
            a = o("XzvV"),
            c = o("m0N1"),
            s = o("ryw6"),
            d = o("v+DW"),
            u = o("XuKo"),
            l = o("EasH"),
            p = o("Kngp"),
            b = o("kcIO"),
            f = o("/PiP"),
            h = o("Ia1d"),
            w = o("Ieup"),
            O = o("i6oL"),
            m = o("aong"),
            v = o("0DAA"),
            E = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var o = [],
                            n = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var _, a = e[Symbol.iterator](); !(n = (_ = a.next()).done) && (o.push(_.value), !t || o.length !== t); n = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !n && a.return && a.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return o
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function g() {
            window.vkLastNav = Date.now(), window.vkTabLoaded = Date.now()
        }

        function j(e) {
            var t = [Object(n.F)("dev_top_nav_wrap"), Object(n.F)("page_header_wrap")];
            Object(i.f)(t, function(t, o) {
                o && Object(n.Qa)(o, e)
            })
        }

        function P(e) {
            window.__leftMenu && window.__leftMenu.handleUpdateRequest(e)
        }

        function M(e, t, o) {
            var a = "",
                c = "",
                s = '<span class="inl_bl left_count_sign"></span>',
                d = "reqs" === o || o && o.substr && "spr" === o.substr(0, 3) ? 5 : 3,
                u = Object(n.H)("left_count_wrap", e),
                l = Object(n.V)(Object(n.H)("left_row", e, "a"), "left_nav_over"),
                p = Object(n.H)("left_count", e, "span"),
                b = Object(n.Ya)(p);
            t && ((a = t.toString()).length > d && (c = ' title="' + Object(i.G)(Object(r.i)(t, "%s", !0)) + '"', a = ".." + a.substr(a.length - d)), s = '<span class="inl_bl left_count" ' + c + ">" + a + "</span>");
            var f = function() {
                Object(n.Ya)(u, s), (t ? n.Ha : n.a)(u, "left_void"), Object(n.Qa)(u, {
                    opacity: ""
                })
            };
            if (b || l)
                if (a) Object(_.c)(p, a, {
                    str: "auto",
                    onDone: f
                });
                else if (l) {
                var h = bodyNode.appendChild(Object(n.Ma)('<span class="left_count_wrap"><span class="inl_bl left_count_sign"></span></span>')),
                    w = Object(n.N)(Object(n.u)(h))[0];
                Object(n.Fa)(h), b && "." === b.charAt(0) && Object(n.Ya)(p, b.replace("..", "")), Object(_.b)(p, {
                    width: w
                }, 100, f)
            } else Object(_.b)(u, {
                opacity: 0
            }, 100, f);
            else f(), Object(n.Qa)(u, {
                opacity: 0
            }), Object(_.b)(u, {
                opacity: 1
            }, 100)
        }

        function y(e, t, o, r) {
            var _ = Object(i.r)(t);
            if (void 0 === vk.counts && (vk.counts = {}), vk.counts[e] !== _)
                if (vk.counts[e] = _, "ntf" !== e) {
                    var a = Object(n.F)("l_" + e),
                        c = Object(n.V)(Object(n.u)(a), "left_nav_over"),
                        s = void 0;
                    a && (M(a, _ > 0 ? _ : 0, e), r && o && (s = _ > 0 && r ? "?" + r : "", a.firstChild.href = "/" + o + s)), (_ >= 0 || !c) && Object(n.Ua)(a, _ >= 0)
                } else window.TopNotifier.setCount(_ > 0 ? _ : 0)
        }

        function D(e) {
            vk.id = e.id, e.body_class !== bodyNode.className && (bodyNode.className = e.body_class || ""), Object(O.b)(), P(), void 0 !== e.pvbig && (vk.pvbig = e.pvbig), void 0 !== e.pvdark && (vk.pvdark = e.pvdark), cur._level = e.level, vk.id && vk.id % 1e3 == 1 && setTimeout(function() {
                window.scrollmarked = {}, Object(a.a)("page_scroll", 0, cur.module, "0")
            }, 300), I(e);
            var t = Object(n.F)("mvk_footer_lnk");
            if (t && (t.firstChild.href = e.mvklnk || "http://m.vk.com/"), vk.nophone = Object(i.r)(e.nophone), vk.staticheader = Object(i.r)(e.staticheader), vk.id) {
                var o = Object(n.F)("left_blocks");
                o && (o.innerHTML = e.leftblocks || "")
            }
            "leftads" in e && 0 !== e.leftads && window.__adsSet(e.leftads, e.ads_section || "", e.ads_can_show, e.ads_showed);
            var r = locProtocol + "//" + location.host + "/";
            e.loc && ("?" === e.loc.charAt(0) ? r += nav.strLoc : r += e.loc);
            var _ = document.URL === r ? "" : document.URL;
            if (setTimeout(T.pbind(r, _), 10), e.counters) {
                var s = (e.counters || "").split(","),
                    d = "",
                    u = "";
                Object(i.r)(s[9]) > 0 ? (d = "adsmarket", u = "act=overview&status=-1") : Object(i.r)(s[9]) < -1 ? (s[9] = 1, d = "ads", u = "act=a_comeback_office_redirect") : d = "ads?act=office&last=1";
                var l = Object(n.F)("l_set"),
                    p = l && l.nextSibling || !1,
                    b = ["fr", "ph", "vid", "msg", "nts", "gr", "vkp", "wsh", "ap", "ads", "ntf", "fav", "doc", "apm", "mk"],
                    f = ["friends", "albums" + vk.id, "video", "", "notes", "groups", "vkpay", "gifts.php?act=wishlist", "apps", d, "feed" + (Object(n.F)("l_nwsf") ? "?section=notifications" : ""), "pages", "docs", "apps_manage", "market"],
                    h = ["", "act=added", "section=tagged", "", "act=comments", "", "tab=invitations", "", "", u, Object(n.F)("l_nwsf") ? "" : "section=notifications", "", "", "", "only_friends=1"],
                    w = !1;
                if (e.handlecnts) {
                    for (var m = 0; m < b.length; m++) y(b[m], s[m], f[m], h[m]);
                    for (var v = p.nextSibling; v; v = v.nextSibling) {
                        if (v.tagName && "li" === v.tagName.toLowerCase() && Object(n.Aa)(v)) {
                            w = !0;
                            break
                        }
                        if (Object(n.V)(v, "more_div")) break
                    }(w ? n.Ta : n.W)(p);
                    for (var E = s.length; m < E; m++) {
                        var g = s[m].split(":"),
                            j = Object(n.F)("l_app" + Object(i.r)(g[0]));
                        j && M(j, Object(i.r)(g[1]))
                    }
                    setTimeout(c.c, 0)
                } else
                    for (var D = 0; D < b.length; D++) vk.counts[b[D]] = s[D]
            }
        }

        function T(e, t) {
            if (!vk.zero && !__dev) {
                t = t || document.referrer;
                for (var o = [new RegExp("(\\/login)(\\?).*$")], n = 0; n < o.length; n++)
                    if (e.match(o[n])) return;
                var r = [
                        [new RegExp("(\\/(?:write|mail|im|al_im.php))(\\?[a-z0-9&=\\-_]*)?$"), "$1"],
                        [new RegExp("(\\/write)(\\d*)(\\?[a-zA-Z0-9&=\\-_]*)?$"), "$1"]
                    ],
                    _ = {
                        referrer: t,
                        url: e
                    };
                Object(i.f)(_, function(e) {
                    Object(i.f)(r, function() {
                        _[e] = _[e].replace(this[0], this[1])
                    })
                }), t = _.referrer, e = _.url;
                var a = void 0 === window.screen ? "" : ";s" + screen.width + "*" + screen.height + "*" + (screen.colorDepth ? screen.colorDepth : screen.pixelDepth);
                Object(i.J)().src = locProtocol + "//counter.yadro.ru/hit?r" + escape(t) + a + ";u" + escape(e) + ";" + Math.random(), Object(i.J)().src = locProtocol + "//www.tns-counter.ru/V13a***R>" + t.replace(/\*/g, "%2a") + "*vk_com/ru/UTF-8/tmsec=vksite_total/" + Math.round(1e9 * Math.random()), "unauth" === vk.tnsPixelType ? Object(i.J)().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184674/" + Math.round(1e9 * Math.random()) : "has_rough" === vk.tnsPixelType ? Object(i.J)().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184675/" + Math.round(1e9 * Math.random()) : "not_has_rough" === vk.tnsPixelType && (Object(i.J)().src = locProtocol + "//www.tns-counter.ru/V13a****vk_ad/ru/UTF-8/tmsec=vkad_cid1015708-posid1184677/" + Math.round(1e9 * Math.random())), L(e, t), window._tmr = window._tmr || [], window._tmr.push({
                    id: "2579437",
                    url: e,
                    referrer: t,
                    type: "pageView",
                    start: (new Date).getTime(),
                    pid: vk.id ? vk.id : 0
                })
            }
        }

        function L(e, t) {
            if (!vk.zero) {
                t = t || document.referrer;
                var o = "https:" === locProtocol ? "sb" : "b",
                    n = escape(e),
                    r = escape(t),
                    _ = Math.random();
                Object(i.J)().src = locProtocol + "//" + o + ".scorecardresearch.com/p?c1=2&c2=13765216&c3=&c4=" + n + "&c5=&c7=" + n + "&c9=" + r + "&c15=&cv=2.0&cj=1&rn=" + _
            }
        }

        function x(e) {
            e = e || {};
            var t = v.a.get("last_reloaded") || [];
            t.unshift(Object(i.L)());
            var o = t.length;
            return o > 5 && (t.splice(5, o - 5), o = 5), v.a.set("last_reloaded", t), !!(5 === o && t[0] - t[4] < 2e4) && (Object(s.c)('<b>Reloading error</b>, please check internet connection, <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.<br>If problem remains, please <a href="/support?act=new">report it here</a>.', {
                dt: 15,
                type: 6,
                msg: "Reload error, from " + (e.from || 0) + ", forced " + (e.force || 0) + ", url " + (e.url || "") + ", query " + (e.query || "")
            }), !0)
        }

        function k(e) {
            for (var t = 0, o = globalHistory.length; t < o; t++)
                if (globalHistory[t].loc === e) {
                    var n = globalHistory.splice(t, 1)[0];
                    C(n.cur), n.content.innerHTML = "", --t, --o
                }
        }

        function A(e, t, o) {
            var r = e;
            if (e = (e || "").replace(/^\//, ""), _tbLink.loc = e, void 0 === o && (o = 0, e))
                for (var _ = 0, a = globalHistory.length; _ < a; _++)
                    if (globalHistory[_].loc === e) {
                        o = 1;
                        break
                    }
            if (r) {
                try {
                    _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
                } catch (e) {}
                Object(i.i)(_tbLink, {
                    href: "/" + e,
                    innerHTML: t,
                    fast: o
                }), Object(n.Ta)(_tbLink), window._stlWas = 0
            } else Object(n.W)(_tbLink);
            Object(d.y)(1)
        }

        function C(e) {
            if (e._back && e._back.hide && e === cur)
                for (var t in e._back.hide)
                    if (e._back.hide.hasOwnProperty(t)) try {
                        e._back.hide[t]()
                    } catch (e) {
                        try {
                            console.log(e.stack)
                        } catch (e) {}
                    }
            if (e.destroy && e.destroy.length)
                for (var o in e.destroy)
                    if (e.destroy.hasOwnProperty(o)) try {
                        e.destroy[o](e)
                    } catch (e) {
                        try {
                            console.log(e.stack)
                        } catch (e) {}
                    }
        }

        function I(e) {
            var t = Object(n.F)("footer_wrap"),
                o = Object(n.F)("page_layout"),
                r = Object(n.H)("top_home_link"),
                _ = void 0 === e.width ? vk.width : e.width,
                a = void 0 === e.width_dec ? vk.width_dec : e.width_dec,
                c = void 0 === e.width_dec_footer ? vk.width_dec_footer : e.width_dec_footer;
            if (vk.noleftmenu === e.noleftmenu && vk.nobottommenu === e.nobottommenu && vk.width === e.width && vk.width_dec_footer === e.width_dec_footer || (vk.noleftmenu !== e.noleftmenu && e.noleftmenu && Object(n.W)("side_bar"), vk.nobottommenu !== e.nobottommenu && (e.nobottommenu ? Object(n.W)("bottom_nav") : Object(n.Ta)("bottom_nav")), e.noleftmenu && e.nobottommenu ? t && (Object(n.a)(t, "simple"), t.style.width = "auto") : t && (Object(n.Ha)(t, "simple"), t.style.width = _ - c + "px")), vk.notopmenu !== e.notopmenu && (e.notopmenu ? Object(n.W)("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap") : Object(n.Ta)("quick_search", "qsearch_border", "top_search", "top_invite_link", "top_menu_wrap")), r && vk.top_home_link_class !== e.top_home_link_class && (r.className = e.top_home_link_class), o && (_ !== vk.width || a !== vk.width_dec)) {
                o.style.width = _ + "px", Object(n.F)("page_header").style.width = _ + "px", Object(n.F)("page_body").style.width = _ - a + "px", Object(n.F)("ts_wrap") && Object(n.V)(Object(n.F)("ts_wrap"), "vk") && (Object(n.F)("ts_wrap").style.width = _ - 191 + "px"), setTimeout(d.y.pbind(!0), 0), setTimeout(O.b, 0);
                try {
                    _tbLink.style.maxWidth = _tbLink.parentNode.offsetWidth - 35 + "px"
                } catch (e) {}
            }
            vk.noleftmenu === e.noleftmenu || e.noleftmenu || Object(n.Ta)("side_bar"), vk.noleftmenu = e.noleftmenu, vk.nobottommenu = e.nobottommenu, vk.top_home_link_class = e.top_home_link_class, vk.notopmenu = e.notopmenu, vk.width = _, vk.width_dec = a, vk.width_dec_footer = c, vk.body_class = e.body_class, vk.staticheader = Object(i.r)(e.staticheader), vk.no_ads = e.no_ads, vk.ad_preview = e.ad_preview
        }

        function B(e, t, o) {
            var r = e.z,
                _ = e.f,
                a = e.w,
                c = (r || "").match(/^([a-z_]+)(-?\d+(?:_\d+)?)\/?(.*)/i);
            if (delete e.z, delete e.f, delete e.w, t || (t = {}), Object(i.u)(e)) {
                if (_ && (Object(m.f)(_), void 0 === r)) return !1;
                if (t.hist)
                    if (r || a) {
                        if (layerQueue.back("wiki", a, (c || {})[1], (c || {})[2])) return !1
                    } else if (!1 === r && o.w && layerQueue.back("wiki", o.w)) return !1;
                if (a) {
                    if (!1 === r) layers.fullhide(!!t.hist && 2);
                    else {
                        if (a.match(/^story([0-9\-]+)_(\d+)/)) return Object(u.c)(a);
                        if (a.match(/^narrative([0-9\-]+)_(\d+)/)) return Object(u.b)(a.split(/narrative/)[1], {
                            source: "narrative_link"
                        });
                        o || (o = Object(i.d)(nav.objLoc)), a && (o.w = a), _ && (o.f = _), delete o.z, nav.setLoc(o)
                    }
                    return Object(f.B)({
                        w: a
                    }, "note_new" === a, !1, {
                        onLoaded: r && B.pbind({
                            z: r
                        }, Object(i.i)(t, {
                            queue: 1
                        })),
                        isZnav: 1
                    }), !1
                }
                if ("giftbox" === r) return !Object(l.b)("/al_gifts.php", {
                    act: "get_gift_box",
                    mid: t.id || 0,
                    fr: t.is && t.id !== vk.id ? 0 : 1,
                    link: nav.objLoc[0]
                }, {
                    stat: ["gifts.css", "ui_controls.js", "ui_controls.css"],
                    cache: 1
                }, window.event);
                if ("validatebox" === r) return !Object(p.h)({
                    closeLink: 1,
                    onDone: function() {
                        return Object(n.F)("change_phone_wrap").parentNode.removeChild(Object(n.F)("change_phone_wrap"))
                    }
                });
                if ("upload_video" === r) return VideoUpload.showBox();
                if (!1 === r || !1 === a) {
                    var s = !window.wkcur || !wkcur.shown || layers.fullhide !== WkView.hide;
                    !layers.fullhide || !s && !1 !== a || t.asBox || (!t.hist || o.z || o.w || -1 !== o[0].indexOf("/") || o[0].match(/^(photo|video)(-?\d+_\d+)$/) || layerQueue.clear(), layers.fullhide(!!t.hist && 2));
                    var d = Object(b.b)();
                    return d && d.wkRaw && d.hide(), !1
                }
                if (r && c) {
                    var O = function() {
                        return delete nav.objLoc.z, nav.setLoc(nav.objLoc), !0
                    };
                    switch (c[1]) {
                        case "photo":
                            return Object(f.x)(c[2], c[3], Object(i.i)(t, {
                                onFail: O,
                                noHistory: !0
                            })), !1;
                        case "albums":
                            return Object(f.u)(c[2], Object(i.i)(t, {
                                onFail: O,
                                noHistory: !0
                            })), !1;
                        case "album":
                            return Object(f.t)(c[2], Object(i.i)(t, {
                                onFail: O,
                                noHistory: !0
                            })), !1;
                        case "tag":
                        case "photo_tag":
                            return Object(f.y)(c[2], Object(i.i)(t, {
                                onFail: O,
                                noHistory: !0
                            })), !1;
                        case "video":
                            var v = c[3],
                                g = Object(i.i)(t, {
                                    onFail: O,
                                    noLocChange: 1,
                                    focusPlay: 1
                                });
                            if (v) {
                                var j = [],
                                    P = "";
                                if (Object(i.f)(v.split("/"), function(e, t) {
                                        0 === t.indexOf("pl_") ? P = t : j.push(t)
                                    }), v = j.join("/"), P) {
                                    P = P.substr("pl_".length);
                                    var M = cur.currentModule ? cur.currentModule() : cur.module;
                                    g = Object(i.i)(g, {
                                        playlistId: P,
                                        module: M,
                                        addParams: {
                                            force_no_repeat: 1,
                                            show_next: 1,
                                            playlist_id: P
                                        }
                                    })
                                }
                            }
                            return Object(h.j)(c[2], v, g), !1;
                        case "single":
                            return void 0 === a && stManager.add(["single_pv.css", "single_pv.js"], Object(n.F)(r).onclick), !1;
                        case "accept_money":
                            return Object(w.d)(c[2], c[3]), !1;
                        case "audio_playlist":
                            var y = c[2].split("_"),
                                D = E(y, 2),
                                T = D[0],
                                L = D[1];
                            return AudioUtils.showAudioPlaylist(T, L, c[3], void 0, void 0, t.onDone), !1;
                        case "article_edit":
                            return f.q.apply(null, c[2].split("_")), !1;
                        case "podcast":
                            return stManager.add([jsc("web/podcast.js"), "page.css"], function() {
                                Podcast.show(null, c[2], null, "url")
                            }), !1;
                        case "apps_achievements":
                            return stManager.add([jsc("web/apps_achievements.js")], function() {
                                window.AppsAchievementsPage.showFriendAchievements(c[2])
                            }), !1
                    }
                }
            }
        }
    },
    kMSP: function(e, t, o) {
        "use strict";
        o.d(t, "a", function() {
            return i
        }), o.d(t, "d", function() {
            return r
        }), o.d(t, "b", function() {
            return _
        }), o.d(t, "c", function() {
            return a
        });
        var n = o("zxIV");

        function i(e) {
            return function() {
                window._cookies = {};
                for (var e = document.cookie.split(";"), t = /^[\s]*([^\s]+?)$/i, o = 0, n = e.length; o < n; o++) {
                    var i = e[o].split("=");
                    2 === i.length && (_cookies[i[0].match(t)[1]] = unescape(i[1].match(t) ? i[1].match(t)[1] : ""))
                }
            }(), _cookies[e]
        }

        function r(e, t, o, n) {
            var i = "";
            if (o) {
                var r = new Date;
                r.setTime(r.getTime() + 24 * o * 60 * 60 * 1e3), i = "; expires=" + r.toGMTString()
            }
            var _ = window.locDomain;
            document.cookie = e + "=" + escape(t) + i + "; path=/" + (_ ? "; domain=." + _ : "") + (n && "https:" === locProtocol ? "; secure" : "")
        }

        function _() {
            Object(n.Fa)("cookies_policy_wrap"), ajax.post("/settings", {
                act: "a_hide_cookies_policy"
            })
        }

        function a() {
            window._cookies = {}
        }
    },
    kcIO: function(e, t, o) {
        "use strict";
        o.d(t, "b", function() {
            return s
        }), o.d(t, "d", function() {
            return d
        }), o.d(t, "a", function() {
            return u
        }), o.d(t, "e", function() {
            return l
        }), o.d(t, "c", function() {
            return p
        });
        var n = o("Egk5"),
            i = o("t7n3"),
            r = o("zxIV"),
            _ = o("7jxN"),
            a = o("gdug"),
            c = {
                hideAll: function(e, t) {
                    if (e)
                        for (; c.count();) c.hideLast();
                    else {
                        if (c.count()) {
                            var o = _message_boxes[c._boxes.pop()];
                            o._in_queue = !1, o._hide(!1, !1, t)
                        }
                        for (; c.count();) {
                            _message_boxes[c._boxes.pop()]._in_queue = !1
                        }
                    }
                },
                hideLast: function(e, t) {
                    if (c.count()) {
                        var o = window._message_boxes[c._boxes[c.count() - 1]];
                        if (!0 === e && (o.changed || c.skip || t && t.target && t.target.tagName && "input" !== t.target.tagName.toLowerCase() && cur.__mdEvent && t.target !== cur.__mdEvent.target)) return void(c.skip = !1);
                        o.hide()
                    }
                    if (t && "click" === t.type) return Object(n.c)(t)
                },
                hideBGClick: function(e) {
                    e && e.target && /^box_layer/.test(e.target.id) && c.hideLast()
                },
                count: function() {
                    return c._boxes.length
                },
                _show: function(e) {
                    var t = _message_boxes[e];
                    if (t && !t._in_queue) {
                        c.count() ? _message_boxes[c._boxes[c.count() - 1]]._hide(!0, !0) : window.tooltips && tooltips.hideAll(), t._in_queue = !0;
                        var o = !!c.count();
                        c.curBox = e, t._show(o || c.currHiding, o), c._boxes.push(e)
                    }
                },
                _hide: function(e) {
                    var t = _message_boxes[e];
                    if (t && t._in_queue && c._boxes[c.count() - 1] === e && t.isVisible() && (t._in_queue = !1, c._boxes.pop(), t._hide(!!c.count()), c.count())) {
                        var o = c._boxes[c.count() - 1];
                        c.curBox = o, _message_boxes[o]._show(!0, !0, !0)
                    }
                },
                _boxes: [],
                curBox: 0
            };

        function s() {
            var e = window._message_boxes[c.curBox];
            return e && e.isVisible() ? e : null
        }

        function d() {
            c.hideLastCheck = c.hideLast.pbind(!0), window._message_box_guid = 0, window._message_boxes = []
        }

        function u(e) {
            var t = window.innerHeight || document.documentElement.clientHeight || boxLayerBG.offsetHeight,
                o = a.a.mobile ? Object(i.r)(window.pageYOffset) : 0,
                n = Object(r.N)(e);
            e.style.marginTop = Math.max(10, o + (t - n[1]) / 3) + "px"
        }

        function l(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                o = (t.w || 380) + 20,
                c = t.w ? ' style="width: ' + t.w + 'px;"' : "",
                s = bodyNode.offsetWidth,
                d = Object(r.e)("div", {
                    className: "top_result_baloon_wrap fixed " + (t.className || ""),
                    innerHTML: '<div class="top_result_baloon"' + c + ">" + e + "</div>"
                }, {
                    left: (s - o) / 2
                });
            t.parentEl ? Object(r.H)(t.parentEl).appendChild(d) : bodyNode.insertBefore(d, pageNode);
            var u = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
                l = a.a.mobile ? Object(i.r)(window.pageYOffset) : 0,
                p = Object(r.N)(d);
            d.style.top = Math.max(10, l + (u - p[1]) / 3) + "px";
            var b = t.out || 2e3,
                f = new Date,
                h = function e() {
                    b < 0 || (window.doneBoxTO = setTimeout(function() {
                        !t.permit || t.permit() ? Object(_.f)(d.firstChild, 500, function() {
                            Object(r.Fa)(d), t.callback && t.callback()
                        }) : e()
                    }, b))
                };
            return Object(n.b)(d, "mouseenter", function() {
                clearTimeout(window.doneBoxTO), b -= new Date - f
            }), Object(n.b)(d, "mouseleave", function() {
                f = new Date, h()
            }), h(), d
        }

        function p() {
            return c
        }
    },
    lkNA: function(e, t, o) {
        "use strict";

        function n(e, t) {
            var o = t.timeout,
                n = t.onLoad,
                i = t.onError,
                r = document.createElement("script");
            r.addEventListener("load", a), r.addEventListener("readystatechange", a), r.addEventListener("error", c), r.src = e, document.head.appendChild(r);
            var _ = void 0;

            function a(e) {
                r.readyState && "loaded" != r.readyState && "complete" != r.readyState || (s(), n && n())
            }

            function c(e) {
                s(), i && i()
            }

            function s() {
                clearTimeout(_), r.removeEventListener("load", a), r.removeEventListener("readystatechange", a), r.removeEventListener("error", c)
            }
            return o && (_ = setTimeout(c, o)), {
                destroy: function() {
                    s()
                }
            }
        }
        o.d(t, "a", function() {
            return n
        })
    },
    m0N1: function(e, t, o) {
        "use strict";
        o.d(t, "c", function() {
            return _
        }), o.d(t, "a", function() {
            return c
        }), o.d(t, "b", function() {
            return u
        });
        var n = o("kMSP"),
            i = o("t7n3"),
            r = o("zxIV");

        function _() {
            if ((Object(r.Q)("ads_left", !0) || {})[1] && vk.id) {
                var e = Object(r.R)(Object(r.J)("ol", Object(r.F)("side_bar_inner")), !0),
                    t = e ? e.height : 0,
                    o = Object(r.R)(Object(r.F)("left_blocks"), !0),
                    _ = o ? o.height : 0,
                    a = Math.max(Math.floor(((window.lastWindowHeight || 0) - t - _ - 42 - 10) / 260), 0),
                    c = Object(n.a)("remixseenads");
                window.__seenAds = Object(i.r)(c), c && __seenAds === a || (window.__seenAds = a, Object(n.d)("remixseenads", a, 30))
            }
        }

        function a(e, t) {
            return !window.noAdsAtAll && (a = function() {
                return window.AdsLight && AdsLight.getAjaxParams.apply(AdsLight.getAjaxParams, arguments) || {
                    al_ad: null
                }
            }, stManager.add(["aes_light.js"], a.pbind(e, t)) || {
                al_ad: null
            })
        }

        function c(e) {
            if (window.noAdsAtAll) return !1;
            c = function() {
                window.AdsLight && AdsLight.updateBlock.apply(AdsLight.updateBlock, arguments)
            }, stManager.add(["aes_light.js"], c.pbind(e))
        }

        function s(e, t, o, n, i, r) {
            if (window.noAdsAtAll) return !1;
            s = function() {
                var e = "";
                arguments && arguments[0] && (e = arguments[0]), "\x3c!--criteo" === e.slice(0, "\x3c!--criteo".length) && Math.random() < .05 && (window.AdsLight && AdsLight.setNewBlock ? ajax.post("/wkview.php?act=mlet&mt=750", {}, {
                    onFail: function() {
                        return !0
                    }
                }) : ajax.post("/wkview.php?act=mlet&mt=751", {}, {
                    onFail: function() {
                        return !0
                    }
                })), window.AdsLight && AdsLight.setNewBlock.apply(AdsLight.setNewBlock, arguments)
            }, stManager.add(["aes_light.js"], s.pbind(e, t, o, n, i, r))
        }

        function d(e) {
            if (window.noAdsAtAll) return !1;
            d = function() {
                window.AdsLight && AdsLight.updateExternalStats.apply(AdsLight.updateExternalStats, arguments)
            }, stManager.add(["aes_light.js"], d.pbind(e))
        }

        function u() {
            window.__seenAds = Object(i.r)(Object(n.a)("remixseenads")), window.__adsUpdate = c, window.__adsSet = s, window.__adsGetAjaxParams = a, window.__adsUpdateExternalStats = d
        }
        window.__adsLoaded = Object(i.L)()
    },
    m0Pp: function(e, t, o) {
        var n = o("2OiF");
        e.exports = function(e, t, o) {
            if (n(e), void 0 === t) return e;
            switch (o) {
                case 1:
                    return function(o) {
                        return e.call(t, o)
                    };
                case 2:
                    return function(o, n) {
                        return e.call(t, o, n)
                    };
                case 3:
                    return function(o, n, i) {
                        return e.call(t, o, n, i)
                    }
            }
            return function() {
                return e.apply(t, arguments)
            }
        }
    },
    nGyu: function(e, t, o) {
        var n = o("K0xU")("unscopables"),
            i = Array.prototype;
        void 0 == i[n] && o("Mukb")(i, n, {}), e.exports = function(e) {
            i[n][e] = !0
        }
    },
    ne8i: function(e, t, o) {
        var n = o("RYi7"),
            i = Math.min;
        e.exports = function(e) {
            return e > 0 ? i(n(e), 9007199254740991) : 0
        }
    },
    nh4g: function(e, t, o) {
        e.exports = !o("eeVq")(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    },
    qKs0: function(e, t, o) {
        o("Btvt"), o("XfO3"), o("rGqo"), o("9AAn"), e.exports = o("g3g5").Map
    },
    qOki: function(e, t, o) {
        "use strict";
        o.r(t), o.d(t, "EMPTY", function() {
            return n
        }), o.d(t, "UNSTARTED", function() {
            return i
        }), o.d(t, "PLAYING", function() {
            return r
        }), o.d(t, "PAUSED", function() {
            return _
        }), o.d(t, "ENDED", function() {
            return a
        }), o.d(t, "ERROR", function() {
            return c
        });
        var n = "empty",
            i = "unstarted",
            r = "playing",
            _ = "paused",
            a = "ended",
            c = "error"
    },
    rGqo: function(e, t, o) {
        for (var n = o("yt8O"), i = o("KroJ"), r = o("dyZX"), _ = o("Mukb"), a = o("hPIQ"), c = o("K0xU"), s = c("iterator"), d = c("toStringTag"), u = a.Array, l = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], p = 0; p < 5; p++) {
            var b, f = l[p],
                h = r[f],
                w = h && h.prototype;
            if (w)
                for (b in w[s] || _(w, s, u), w[d] || _(w, d, f), a[f] = u, n) w[b] || i(w, b, n[b], !0)
        }
    },
    ryw6: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return topMsg
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return topError
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return showMsg
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return showGlobalPrg
        });
        var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zxIV"),
            _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("t7n3");

        function topMsg(e, t, o) {
            if (o || (o = "#D6E5F7"), e) {
                clearTimeout(window.topMsgTimer);
                var n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)("system_msg");
                n.style.backgroundColor = o, n.innerHTML = e, Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Ta)(n), t && (window.topMsgTimer = setTimeout(topMsg.pbind(!1), 1e3 * t))
            } else Object(_dom__WEBPACK_IMPORTED_MODULE_0__.W)("system_msg")
        }

        function topError(text, opts) {
            if (opts || (opts = {}), text.message) {
                var error = text;
                text = "<b>JavaScript error:</b> " + error.message, opts.stack = error.stack, error.stack && __debugMode && (text += "<br/>" + error.stack.replace(/\n/g, "<br/>"));
                try {
                    console.log(error.stack)
                } catch (e) {}
            }
            if (!opts.stack) try {
                eval("0 = 1")
            } catch (e) {
                opts.stack = e.stack
            } - 1 != opts.dt && topMsg(text, opts.dt, "#FFB4A3"), __dev || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)("debuglogwrap") || (delete opts.dt, ajax.plainpost("/errors.php", Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.i)(opts, {
                msg: opts.msg || text,
                module: (window.cur || {}).module,
                id: vk.id,
                host: locHost,
                lang: vk.lang,
                loc: (window.nav || {}).strLoc,
                realloc: location.toString()
            })))
        }

        function showMsg(e, t, o, n) {
            var i = "msg" + ("msg" !== o ? " " + o : "");
            n && (i += " msg_appear"), e = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)(e);
            var r = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.H)(o, e),
                _ = r || Object(_dom__WEBPACK_IMPORTED_MODULE_0__.u)(e),
                a = e.insertBefore(Object(_dom__WEBPACK_IMPORTED_MODULE_0__.e)("div", {
                    className: i,
                    innerHTML: '<div class="msg_text">' + t + "</div>"
                }), _);
            r && Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Fa)(r), setTimeout(_dom__WEBPACK_IMPORTED_MODULE_0__.Ha.pbind(a, "msg_appear"), 0)
        }

        function showGlobalPrg(e, t) {
            var o = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Q)(e),
                n = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.N)(e),
                i = t || {},
                r = i.w,
                _ = void 0 === r ? 32 : r,
                a = i.h,
                c = void 0 === a ? 13 : a,
                s = Object(_dom__WEBPACK_IMPORTED_MODULE_0__.F)("global_prg");
            s.className = i.cls || "progress", Object(_dom__WEBPACK_IMPORTED_MODULE_0__.Qa)(s, {
                left: o[0] + Math.floor((n[0] - _) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.r)(i.shift ? i.shift[0] : 0),
                top: o[1] + Math.floor((n[1] - c) / 2) + Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__.r)(i.shift ? i.shift[1] : 0),
                width: _,
                height: c,
                display: "block",
                "z-index": i.zIndex ? i.zIndex : null
            }), i.hide && (e.style.visibility = "hidden")
        }
    },
    vhPU: function(e, t) {
        e.exports = function(e) {
            if (void 0 == e) throw TypeError("Can't call method on  " + e);
            return e
        }
    },
    w2a5: function(e, t, o) {
        var n = o("aCFj"),
            i = o("ne8i"),
            r = o("Cfrj");
        e.exports = function(e) {
            return function(t, o, _) {
                var a, c = n(t),
                    s = i(c.length),
                    d = r(_, s);
                if (e && o != o) {
                    for (; s > d;)
                        if ((a = c[d++]) != a) return !0
                } else
                    for (; s > d; d++)
                        if ((e || d in c) && c[d] === o) return e || d;
                return !e && -1
            }
        }
    },
    wmvG: function(e, t, o) {
        "use strict";
        var n = o("hswa").f,
            i = o("Kuth"),
            r = (o("Mukb"), o("3Lyj")),
            _ = o("m0Pp"),
            a = o("9gX7"),
            c = o("vhPU"),
            s = o("SlkY"),
            d = o("Afnz"),
            u = o("1TsA"),
            l = o("elZq"),
            p = o("nh4g"),
            b = o("Z6vF").fastKey,
            f = p ? "_s" : "size",
            h = function(e, t) {
                var o, n = b(t);
                if ("F" !== n) return e._i[n];
                for (o = e._f; o; o = o.n)
                    if (o.k == t) return o
            };
        e.exports = {
            getConstructor: function(e, t, o, d) {
                var u = e(function(e, n) {
                    a(e, u, t, "_i"), e._i = i(null), e._f = void 0, e._l = void 0, e[f] = 0, void 0 != n && s(n, o, e[d], e)
                });
                return r(u.prototype, {
                    clear: function() {
                        for (var e = this._i, t = this._f; t; t = t.n) t.r = !0, t.p && (t.p = t.p.n = void 0), delete e[t.i];
                        this._f = this._l = void 0, this[f] = 0
                    },
                    delete: function(e) {
                        var t = h(this, e);
                        if (t) {
                            var o = t.n,
                                n = t.p;
                            delete this._i[t.i], t.r = !0, n && (n.n = o), o && (o.p = n), this._f == t && (this._f = o), this._l == t && (this._l = n), this[f]--
                        }
                        return !!t
                    },
                    forEach: function(e) {
                        a(this, u, "forEach");
                        for (var t, o = _(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                            for (o(t.v, t.k, this); t && t.r;) t = t.p
                    },
                    has: function(e) {
                        return !!h(this, e)
                    }
                }), p && n(u.prototype, "size", {
                    get: function() {
                        return c(this[f])
                    }
                }), u
            },
            def: function(e, t, o) {
                var n, i, r = h(e, t);
                return r ? r.v = o : (e._l = r = {
                    i: i = b(t, !0),
                    k: t,
                    v: o,
                    p: n = e._l,
                    n: void 0,
                    r: !1
                }, e._f || (e._f = r), n && (n.n = r), e[f]++, "F" !== i && (e._i[i] = r)), e
            },
            getEntry: h,
            setStrong: function(e, t, o) {
                d(e, t, function(e, t) {
                    this._t = e, this._k = t, this._l = void 0
                }, function() {
                    for (var e = this._k, t = this._l; t && t.r;) t = t.p;
                    return this._t && (this._l = t = t ? t.n : this._t._f) ? u(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = void 0, u(1))
                }, o ? "entries" : "values", !o, !0), l(t)
            }
        }
    },
    xpql: function(e, t, o) {
        e.exports = !o("nh4g") && !o("eeVq")(function() {
            return 7 != Object.defineProperty(o("Iw71")("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    },
    y3w9: function(e, t, o) {
        var n = o("0/R4");
        e.exports = function(e) {
            if (!n(e)) throw TypeError(e + " is not an object!");
            return e
        }
    },
    yLpj: function(e, t) {
        var o;
        o = function() {
            return this
        }();
        try {
            o = o || Function("return this")() || (0, eval)("this")
        } catch (e) {
            "object" == typeof window && (o = window)
        }
        e.exports = o
    },
    ylqs: function(e, t) {
        var o = 0,
            n = Math.random();
        e.exports = function(e) {
            return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++o + n).toString(36))
        }
    },
    yt8O: function(e, t, o) {
        "use strict";
        var n = o("nGyu"),
            i = o("1TsA"),
            r = o("hPIQ"),
            _ = o("aCFj");
        e.exports = o("Afnz")(Array, "Array", function(e, t) {
            this._t = _(e), this._i = 0, this._k = t
        }, function() {
            var e = this._t,
                t = this._k,
                o = this._i++;
            return !e || o >= e.length ? (this._t = void 0, i(1)) : i(0, "keys" == t ? o : "values" == t ? e[o] : [o, e[o]])
        }, "values"), r.Arguments = r.Array, n("keys"), n("values"), n("entries")
    },
    zhAb: function(e, t, o) {
        var n = o("aagx"),
            i = o("aCFj"),
            r = o("w2a5")(!1),
            _ = o("YTvA")("IE_PROTO");
        e.exports = function(e, t) {
            var o, a = i(e),
                c = 0,
                s = [];
            for (o in a) o != _ && n(a, o) && s.push(o);
            for (; t.length > c;) n(a, o = t[c++]) && (~r(s, o) || s.push(o));
            return s
        }
    }
});