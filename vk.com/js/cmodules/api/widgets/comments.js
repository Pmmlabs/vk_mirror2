! function(e) {
    var t = {};

    function o(s) {
        if (t[s]) return t[s].exports;
        var i = t[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return e[s].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    o.m = e, o.c = t, o.d = function(e, t, s) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: s
        })
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.t = function(e, t) {
        if (1 & t && (e = o(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var s = Object.create(null);
        if (o.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) o.d(s, i, function(t) {
                return e[t]
            }.bind(null, i));
        return s
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, o.p = "", o(o.s = 149)
}({
    149: function(e, t, o) {
        e.exports = o("JfKq")
    },
    JfKq: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        window.WComments = {
            init: function(e) {
                e.reply_names && isArray(e.reply_names) && (e.reply_names = {}), extend(cur, {
                    options: e,
                    oid: e.user_id,
                    postTo: e.user_id,
                    heightEl: geByClass1("_wcomments_page"),
                    countEl: geByClass1("_wcomments_count"),
                    contentEl: geByClass1("_wcomments_content"),
                    section: e.section,
                    noAwayCheck: !0,
                    sendPostBtn: ge("send_post"),
                    postsEl: ge("wcomments_posts"),
                    postsOuterEl: geByClass1("_wcomments_posts_outer"),
                    wallType: "widget_comments",
                    onReplyFormSizeUpdate: WComments.contentUpdated.bind(WComments, !1),
                    onEditFormSizeUpdate: WComments.contentUpdated.bind(WComments, !1)
                }), cur.options.filter_media_types = cur.options.media_types || [], this.override("lite.js"), this.override("page.js"), this.override(jsc("web/emoji.js")), stManager.emitter.addListener("update", this.override.bind(this)), this.updateSize(), (e.is_auto || e.is_nano) && extend(e, {
                    media_opts: {
                        hideAfterCount: 0,
                        maxShown: 0
                    }
                }), Wall.init(e), e.fixed_height ? (setStyle(cur.postsOuterEl, {
                    maxHeight: e.fixed_height - getSize(geByClass1("_wcomments_head"))[1] - getSize(geByClass1("_wcomments_form"))[1]
                }), cur.scrollbar = new uiScroll(cur.postsOuterEl, {
                    hidden: 1,
                    onmore: this.showMore.bind(this),
                    ondragstart: function() {
                        cur.Rpc.callMethod("startDrag")
                    },
                    ondragstop: function() {
                        cur.Rpc.callMethod("stopDrag")
                    }
                }), cur.mouseMove = cur.scrollbar.ondrag.bind(cur.scrollbar), cur.mouseUp = cur.scrollbar.ondragstop.bind(cur.scrollbar)) : (cur.mouseMove = function() {}, cur.mouseUp = function() {}), e.qtransport && this.initQTransport(e.qtransport), window.timeUpdateInt = setInterval(this.updateTimes.bind(this), 1e4), cur.RpcMethods = {
                    onInit: function() {
                        var e = this.resizeWidget.bind(this);
                        setTimeout(e, 0), setTimeout(e, 500)
                    }.bind(this),
                    updateStickers: function() {
                        window.emojiStickers = !1, window.Emoji && Emoji.updateTabs()
                    },
                    mouseMove: cur.mouseMove,
                    mouseUp: cur.mouseUp,
                    chooseMedia: function() {
                        var e = cleanObj(this.uncleanObj([].slice.call(arguments)));
                        cur.chooseMedia.apply(cur.chooseMedia, e), setTimeout(this.resizeWidget.bind(this), 0)
                    }.bind(this),
                    addMedia: function(e, t) {
                        if (~["pollBackgroundUploaded"].indexOf(t) && cur.addMedia && cur.addMedia[e] && isFunction(cur.addMedia[e][t])) {
                            for (var o = arguments.length, s = Array(o > 2 ? o - 2 : 0), i = 2; i < o; i++) s[i - 2] = arguments[i];
                            cur.addMedia[e][t].apply(cur.addMedia[e], s)
                        }
                    },
                    showMediaProgress: function() {
                        var e = cleanObj([].slice.call(arguments));
                        cur.showMediaProgress.apply(cur.showMediaProgress, e)
                    },
                    likeFullUpdate: function() {}
                };
                try {
                    cur.Rpc = new fastXDM.Client(cur.RpcMethods, {
                        safe: !0
                    }), cur.resizeInt = setInterval(this.resizeWidget.bind(this), 1e3)
                } catch (e) {
                    debugLog(e)
                }
                e.user_id || (addEvent("send_post", "click", Widgets.oauth.bind(Widgets)), addEvent("post_field", "click", Widgets.oauth.bind(Widgets)))
            },
            uncleanObj: function(e) {
                if (isObject(e)) {
                    var t = {};
                    for (var o in e) t[o.replace(/[^a-zA-Z0-9_\-]/g, "")] = this.uncleanObj(e[o])
                } else if (isArray(e)) {
                    t = [];
                    for (var o in e) t.push(this.uncleanObj(e[o]))
                } else {
                    var s = void 0 === e ? "undefined" : _typeof(e);
                    if ("number" == s || "boolean" == s || "function" == s) t = e;
                    else t = unclean(e)
                }
                return t
            },
            getSectionParams: function() {
                var e = {
                    app: cur.options.app,
                    width: cur.options.width,
                    startWidth: cur.options.startWidth,
                    limit: cur.options.limit
                };
                switch (cur.section) {
                    case "admin_browse":
                        e.act = "admin_browse";
                        break;
                    case "admin_bl":
                        e.act = "admin_bl", e.limit = 15;
                        break;
                    case "admin_updates":
                        e.act = "admin_updates";
                        break;
                    case "browse":
                        e.browse = 1, e.replies = cur.options.replies;
                        break;
                    default:
                        e.page_query = cur.options.page_query, e.part = 1
                }
                return e
            },
            contentUpdated: function(e) {
                e && this.applyOptions(e), this.resizeWidget()
            },
            applyOptions: function applyOptions(options) {
                options.reply_names && (isArray(options.reply_names) && (options.reply_names = {}), cur.options.reply_names = extend(cur.options.reply_names || {}, options.reply_names), delete options.reply_names), options.head_count && "browse" != cur.section && (val(geByClass1("_wcomments_count"), options.head_count), delete options.head_count), options.script && (eval(options.script), delete options.script), extend(cur.options, options), toggle(geByClass1("_wcomments_more"), options.offset < options.count)
            },
            updateSize: function e(t) {
                var o = (t || getSize("page_wrap"))[0];
                if (setStyle(cur.heightEl, {
                        width: o
                    }), cur.options.is_auto) {
                    var s = 1 == cur.options.mini || 0 != cur.options.mini && o < 630,
                        i = s && o < 380;
                    e.size != s + "" + i && (e.size = s + "" + i, replaceClass(bodyNode, "wcomments_mini wcomments_nano", (s ? "wcomments_mini " : "") + (i ? "wcomments_nano " : "")))
                }
            },
            resizeWidget: function e() {
                if (cur.heightEl && cur.Rpc) {
                    var t = getSize("page_wrap");
                    (browser.msie && !browser.msie8 || browser.opera) && (t[1] += 15), window.onBodyResize && onBodyResize(), e.size != t.join(" ") && (e.size = t.join(" "), this.updateSize(t), cur.Rpc.callMethod("resize", t[1]))
                }
            },
            showMore: function() {
                if (!cur.switchingSection) {
                    var e = geByClass1("_wcomments_more");
                    if (cur.options.offset >= cur.options.count) return hide(e);
                    buttonLocked(e) || ajax.post("al_widget_comments.php", extend(WComments.getSectionParams(), {
                        offset: cur.options.offset,
                        width: cur.options.width,
                        startWidth: cur.options.startWidth,
                        part: 1
                    }), {
                        onDone: function(e, t) {
                            ge("wcomments_posts").appendChild(cf(t)), WComments.contentUpdated(e)
                        },
                        showProgress: lockButton.pbind(e),
                        hideProgress: unlockButton.pbind(e)
                    })
                }
            },
            switchSection: function(e) {
                if (cur.switchingSection || cur.section == e) return !1;
                cur.switchingSection = !0;
                var t = uiTabs && geByClass1("_wcomments_admin_tabs"),
                    o = t && geByClass1("_" + e);
                return "posts" == e || "posts" == cur.section ? addClass(cur.contentEl, "wcomments_content_loading") : t && uiTabs.showProgress(t), o && uiTabs.switchTab(geByClass1("ui_tab", o)), cur.section = e, ajax.post("al_widget_comments.php", WComments.getSectionParams(), {
                    onDone: function(o, s) {
                        val(cur.postsEl, s), t && uiTabs.hideProgress(t), removeClass(cur.contentEl, "wcomments_content_loading"), replaceClass(cur.heightEl, "wcomments_section_posts wcomments_section_admin_browse wcomments_section_admin_bl wcomments_section_admin_updates wcomments_section_browse", "wcomments_section_" + e), cur.options.fixed_height && setStyle(cur.postsOuterEl, {
                            maxHeight: cur.options.fixed_height - getSize(geByClass1("_wcomments_head"))[1] - getSize("posts" == cur.section || "browse" == cur.section ? geByClass1("_wcomments_form") : geByClass1("_wcomments_admin_tabs"))[1]
                        }), cur.scrollbar && cur.scrollbar.scrollTop(), WComments.contentUpdated(o), cur.switchingSection = !1
                    }
                }), !1
            },
            addToBl: function(e, t, o) {
                if (hasClass(o, "wcomments_bl_action_loading")) return !1;
                ajax.post("al_widget_comments.php", {
                    act: "a_add_to_bl",
                    id: e,
                    hash: t,
                    app: cur.options.app
                }, {
                    onDone: function() {
                        hide(geByClass1("_wcomments_bl_label_" + e)), o.onclick = WComments.delFromBl.bind(WComments, e, t, o), val(o, getLang("widgets_remove_from_banlist"))
                    },
                    showProgress: addClass.pbind(o, "wcomments_bl_action_loading"),
                    hideProgress: removeClass.pbind(o, "wcomments_bl_action_loading")
                })
            },
            delFromBl: function(e, t, o) {
                if (hasClass(o, "wcomments_bl_action_loading")) return !1;
                ajax.post("al_widget_comments.php", {
                    act: "a_del_from_bl",
                    id: e,
                    hash: t,
                    app: cur.options.app
                }, {
                    onDone: function() {
                        setStyle(geByClass1("_wcomments_bl_label_" + e), "display", "inline"), o.onclick = WComments.addToBl.bind(WComments, e, t, o), val(o, getLang("widgets_restore_to_banlist"))
                    },
                    showProgress: addClass.pbind(o, "wcomments_bl_action_loading"),
                    hideProgress: removeClass.pbind(o, "wcomments_bl_action_loading")
                })
            },
            updateTimes: function(e) {
                if ((cur.lang || {}).wall_X_seconds_ago_words) {
                    var t = intval(vkNow() / 1e3),
                        o = [];
                    t -= cur.tsDiff, each(geByClass("rel_date_needs_update", e || ge("wcomments_posts"), "span"), function(e, s) {
                        if (s) {
                            var i = intval(s.getAttribute("time")),
                                n = t - i,
                                r = s.getAttribute("abs_time");
                            n < 5 ? r = getLang("wall_just_now") : n < 60 ? r = Wall.langWordNumeric(n, cur.lang.wall_X_seconds_ago_words, cur.lang.wall_X_seconds_ago) : n < 3600 ? r = Wall.langWordNumeric(intval(n / 60), cur.lang.wall_X_minutes_ago_words, cur.lang.wall_X_minutes_ago) : n < 14400 ? r = Wall.langWordNumeric(intval(n / 3600), cur.lang.wall_X_hours_ago_words, cur.lang.wall_X_hours_ago) : o.push(s), s.innerHTML = r
                        }
                    }), each(o, function() {
                        removeClass(this, "rel_date_needs_update")
                    })
                }
            },
            langWordNumeric: function(e, t, o) {
                return isArray(t) && e < t.length ? t[e] : langNumeric(e, o)
            },
            showLikesBox: function(e, t) {
                showBox("widget_like.php", extend({
                    act: "a_stats_box",
                    app: cur.options.app,
                    obj: e,
                    from: "wcomments",
                    check_hash: cur.likeCheckHash,
                    widget_width: 638
                }, t || {}))
            },
            deleteAllAndBan: function(e, t, o, s) {
                ajax.post("al_widget_comments.php", {
                    act: "a_add_to_bl",
                    id: t,
                    hash: o,
                    app: cur.options.app
                }, {
                    onDone: function(o, s) {
                        s && each(geByClass("wcomments_post", ge("wcomments_posts"), "div"), function() {
                            !this.id.indexOf("post" + t) && this.id.split("_")[1] >= s && this.id != "post" + e && isVisible(this) && hide(this)
                        }), ge("post_del" + e).innerHTML = o, WComments.contentUpdated()
                    },
                    showProgress: function() {
                        lockButton(s)
                    },
                    hideProgress: function() {
                        unlockButton(s)
                    }
                })
            },
            initQTransport: function(e) {
                window.curNotifier = extend(e, {
                    lp_connected: !1,
                    error_timeout: 1,
                    addQueues: {},
                    recvClbks: {},
                    recvData: {},
                    onConnectionId: []
                }), WComments.lpInit(), WComments.lpStart()
            },
            lpGetTransportWrap: function() {
                var e = ge("queue_transport_wrap");
                return e || (e = ce("div", {
                    id: "queue_transport_wrap"
                }), utilsNode.appendChild(e)), e
            },
            lpInit: function() {
                curNotifier.lpMakeRequest || (delete curNotifier.lpMakeRequest, re("queue_transport_frame"), WComments.lpGetTransportWrap().appendChild(ce("iframe", {
                    id: "queue_transport_frame",
                    name: "queue_transport_frame",
                    src: curNotifier.frame_path
                })))
            },
            lpStart: function() {
                curNotifier.lp_started = !0, WComments.lpCheck()
            },
            lpStop: function() {
                curNotifier.lp_started = !1, clearTimeout(curNotifier.lp_check_to), clearTimeout(curNotifier.lp_error_to)
            },
            lpCheck: function lpCheck() {
                curNotifier.lp_started && (curNotifier.lpMakeRequest ? curNotifier.lpMakeRequest(curNotifier.frame_url, {
                    act: "a_check",
                    ts: curNotifier.timestamp,
                    key: curNotifier.key,
                    id: curNotifier.uid,
                    wait: 25
                }, function(text) {
                    if (curNotifier.lp_started) try {
                        var success = this.lpChecked(eval("(" + text + ")"));
                        success && (this.lpCheck(), curNotifier.error_timeout = 1)
                    } catch (e) {
                        topError("Notify error: " + e.message), curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2)
                    }
                }.bind(this), function(e) {
                    curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2)
                }.bind(this)) : curNotifier.lp_check_to = setTimeout(this.lpCheck.bind(this), 1e3))
            },
            lpChecked: function(e) {
                var t = e.failed;
                if (2 == t) return curNotifier.lp_error_to = setTimeout(this.lpGetKey.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2), !1;
                if (t) throw getLang("global_unknown_error");
                return curNotifier.timestamp = e.ts, !cur.section.indexOf("admin") || (cur.saveScrollPosition = cur.scrollbar && cur.scrollbar.data.scrollTop > 100, each(e.events, function(e, t) {
                    WComments.eventsParse(t)
                }), !0)
            },
            lpGetKey: function() {
                vkNow();
                ajax.post("al_widget_comments.php", {
                    act: "a_get_key",
                    id: curNotifier.uid,
                    app: cur.options.app,
                    page_query: cur.options.page_query
                }, {
                    onDone: function(e, t) {
                        curNotifier.timestamp = t, curNotifier.key = e, this.lpCheck()
                    }.bind(this),
                    onFail: function(e) {
                        if (3 != e) return curNotifier.error_timeout = 64, this.lp_error_to = setTimeout(this.lpGetKey.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2), !0;
                        location.reload()
                    }.bind(this)
                })
            },
            resizePostSizedThumbs: function(e, t, o, s, i) {
                var n = geByClass("page_post_thumb_wrap", e),
                    r = [],
                    a = 0,
                    l = 0,
                    c = function() {
                        u && r.push(u), a = l = 0, extend(this, {
                            tiles: [],
                            height: 0,
                            x: 0,
                            y: 0
                        })
                    },
                    p = function(e) {
                        e && extend(this, {
                            el: e,
                            lastRow: hasClass(e, "page_post_thumb_last_row"),
                            lastColumn: hasClass(e, "page_post_thumb_last_column"),
                            width: intval(e.style.width),
                            height: intval(e.style.height)
                        })
                    },
                    u = new c,
                    d = positive(e.style.width),
                    _ = positive(e.style.height),
                    h = 0;
                if (t > d && (t = null), (s > _ || i && n.length > 1) && (s = null), !s && t) s = Math.round(_ * (t / d));
                else if (s && !t) t = Math.round(d * (s / _));
                else {
                    if (!t || !s) return;
                    i && (s = Math.min(s, Math.round(_ * (t / d))), t = Math.round(d * (s / _)))
                }
                return each(n, function(e, t) {
                    var s = t.tile || new p(t),
                        i = new p(n[e + 1]);
                    u.height = Math.max(u.height, s.height), d - a >= s.width / 2 ? (a += s.width + (s.lastColumn ? 0 : o), l = s.height, s.x = u.x, s.y = u.y = 0, u.tiles.push(s), s.lastColumn ? i && i.lastColumn && u.height - l >= i.height / 2 || (u = new c) : u.x++) : s.lastColumn && u.height - l >= s.height / 2 && (l += s.height + o, s.x = u.x, s.y = ++u.y, u.tiles.push(s), !s.lastRow && i && i.lastColumn && u.height - l >= i.height / 2 || (u.height = Math.max(u.height, l), u = new c))
                }), each(r, function(e, i) {
                    var n = 0,
                        a = 0,
                        l = (t - o * i.x) / (d - o * i.x),
                        c = (s - o * i.y) / (_ - o * i.y),
                        p = r.length - 1 == e ? s - h : Math.round(i.height * c),
                        u = 0,
                        m = 0;
                    h += p + o, each(i.tiles, function(e, s) {
                        s.x < i.x ? (u = Math.round(s.width * l), n += u + o, s.y || (m = p)) : s.lastColumn && (u = t - n, s.y == i.y ? m = p - a : (m = Math.round(s.height * c), a += m + o)), setStyle(s.el, {
                            width: u,
                            height: m
                        })
                    })
                }), setStyle(e, {
                    width: t,
                    height: s
                }), [t, s]
            },
            resizePostAlbumWrap: function(e, t, o, s) {
                s || (s = "");
                var i = positive(e.style.width),
                    n = geByClass1("page" + s + "_album_thumb_wrap", e, "div"),
                    r = domFC(geByClass1("page" + s + "_album_photos", e, "div")),
                    a = domFC(geByClass1("page" + s + "_album_under_row", e, "div"));
                if (scaleX = t / i, !(i < t) && n) {
                    setStyle(e, {
                        width: t
                    });
                    var l = Math.round(positive(n.style.width) * scaleX),
                        c = Math.round(positive(n.style.height) * scaleX);
                    setStyle(n, {
                        width: l,
                        height: c
                    }), r && WComments.resizePostSizedThumbs(r, t - o - l, o, c), a && WComments.resizePostSizedThumbs(a, t, o, positive(a.style.height) * ((t - o) / (i - o)))
                }
            },
            resizePost: function(e, t) {
                var o = t ? cur.options.reply_max_w : cur.options.max_w,
                    s = Math.max(cur.options.kludges_min_h, o * (t ? cur.options.reply_kludges_ratio : cur.options.kludges_ratio));
                return each(geByClass("page_album_wrap", e, "div"), function(e, t) {
                    WComments.resizePostAlbumWrap(t, o, 5)
                }), each(geByClass("page_market_album_wrap", e, "div"), function(e, t) {
                    WComments.resizePostAlbumWrap(t, o - 2, 2, "_market")
                }), each(geByClass("page_post_sized_thumbs", e, "div"), function(e, t) {
                    WComments.resizePostSizedThumbs(t, o, 5, s, !0)
                }), each(geByClass("audio_pl_snippet", e, "div"), function(e, t) {
                    if (o <= cur.playlist_snippet_max_narrow_width) var s = "audio_pl_snippet_size_narrow";
                    else if (o <= cur.playlist_snippet_max_medium_width) s = "audio_pl_snippet_size_medium";
                    else s = "";
                    setStyle(t, "width", o), removeClass(t, "audio_pl_snippet_size_narrow audio_pl_snippet_size_medium"), s && addClass(t, s)
                }), e
            },
            eventsQueue: [],
            eventsPaused: !1,
            eventsPause: function() {
                this.eventsPaused = !0
            },
            eventsProceed: function() {
                for (this.eventsPaused = !1; this.eventsQueue.length;) this.eventsParse(this.eventsQueue.shift())
            },
            eventsUpdateAttaches: function(e) {
                each(geByClass("audio_row", e, "div"), function(e, t) {
                    addClass(t, "audio_no_actions")
                })
            },
            eventsParse: function(e) {
                if (this.eventsPaused) return this.eventsQueue.push(e);
                var t = e.split("<!>"),
                    o = t[0],
                    s = t[1],
                    i = t[2],
                    n = ge("post" + i);
                if (o != cur.options.qversion) return location.reload();
                switch (s) {
                    case "new_post":
                        if (n) break;
                        var r = ge("wcomments_posts"),
                            a = (intval(t[t.length - 1]), this.resizePost(se(Wall.getNewPostHTML(t, cur.options.is_admin))));
                        WComments.eventsUpdateAttaches(a);
                        var l = function() {
                            r.insertBefore(a, r.firstChild), ge("post_poll_id" + i) && Wall.votingUpdateByPostRaw(i)
                        };
                        cur.saveScrollPosition ? cur.scrollbar.updateAbove(l) : (l(), cur.scrollbar && cur.scrollbar.scrollTop(0, !0)), nodeUpdated(a), Wall.updateMentionsIndex(), "browse" !== cur.section && val(cur.countEl, d ? getLang("widgets_comments_top_count", d) : getLang("widgets_comments"));
                        break;
                    case "del_post":
                        n && (!cur.wallMyDeleted[i] && hide(n), cur.options.offset--);
                        break;
                    case "res_post":
                        n && cur.options.offset++;
                        break;
                    case "new_reply":
                        if (!n || cur.wallMyReplied[i] || ge("post" + t[3])) break;
                        var c = ge("replies" + i),
                            p = (a = this.resizePost(se(Wall.getNewReplyHTML(t, cur.options.is_admin)), !0), !1);
                        if (isVisible("reply_link" + i)) re("reply_link" + i), show("replies_wrap" + i), p = !0;
                        else {
                            var u = c.nextSibling,
                                d = geByClass("new_reply", c, "div").length + 1;
                            if (cur.wallMyOpened[i]) {
                                u && "replies_open" == u.className && re(u), p = !0;
                                var _ = geByClass1("wr_header", c, "a"),
                                    h = geByClass("reply", c, "div").length + 1,
                                    m = h;
                                _ && (m = intval(_.getAttribute("offs").split("/")[1]) + 1), (m > 5 || h < m) && (_ || (_ = ce("a", {
                                    className: "wr_header"
                                }), c.insertBefore(_, c.firstChild)), Wall.updateRepliesHeader(i, _, h, m))
                            } else addClass(a, "new_reply"), u && "replies_open" == u.className || (u = ce("div", {
                                className: "replies_open",
                                onclick: Wall.openNewComments.pbind(i)
                            }), c.parentNode.insertBefore(u, c.nextSibling)), val(u, getLang("news_x_new_replies_more", Math.min(100, d))), u.newCnt = d
                        }
                        WComments.eventsUpdateAttaches(a), c.appendChild(a), p && nodeUpdated(a);
                        break;
                    case "del_reply":
                        !cur.wallMyDeleted[i] && re(n)
                }
                this.resizeWidget()
            },
            override: function(e, t) {
                var o, s, i;
                if (StaticFiles[e] || !0 === t) switch (e) {
                    case "lite.js":
                        extend(window, {
                            showTooltip: Widgets.showTooltip,
                            showBox: Widgets.showBox({
                                "al_photos.php": {
                                    photo_box: !0,
                                    choose_photo: !0
                                },
                                "al_video.php": {
                                    video_box: !0,
                                    a_choose_video_box: !0
                                },
                                "al_places.php": {
                                    show_photo_place: !0
                                },
                                "like.php": {
                                    publish_box: !0
                                },
                                "widget_like.php": {
                                    a_stats_box: !0
                                },
                                "al_wall.php": {
                                    canvas_draw_box: !0
                                },
                                "al_im.php": {
                                    stickers_store: !0,
                                    sticker_preview: !0
                                },
                                "al_audio.php": {
                                    choose_box: !0
                                },
                                "al_page.php": {
                                    owner_photo_box: !0
                                },
                                "al_voting.php": {
                                    export_box: !0
                                },
                                "docs.php": {
                                    show_box: !0
                                }
                            }),
                            showReCaptchaBox: Widgets.showReCaptchaBox,
                            gotSession: function(e) {
                                location.reload()
                            },
                            showPhoto: Widgets.showPhoto,
                            showVideo: Widgets.showVideo,
                            shareAudioPlaylist: function(e) {
                                vk.id ? e.apply(null, [].slice.call(arguments, 1)) : Widgets.oauth()
                            }.bind(null, shareAudioPlaylist),
                            addAudio: function(e) {
                                vk.id ? e.apply(null, [].slice.call(arguments, 1)) : Widgets.oauth()
                            }.bind(null, AudioUtils.addAudio),
                            showWiki: function(e) {
                                if ("likes" == (e = (e && e.w || "").split("/"))[0]) WComments.showLikesBox(e[1]);
                                else {
                                    if ("shares" != e[0]) return !0;
                                    WComments.showLikesBox(e[1], {
                                        tab: "published"
                                    })
                                }
                            },
                            mentionOver: function() {
                                return !0
                            },
                            mentionClick: function() {
                                return !0
                            },
                            showInlineVideo: Widgets.showInlineVideo,
                            revertLastInlineVideo: Widgets.revertLastInlineVideo,
                            pauseLastInlineVideo: Widgets.pauseLastInlineVideo
                        });
                        break;
                    case jsc("web/emoji.js"):
                        extend(Emoji, {
                            focus: function(e, t) {
                                if (Emoji.editableFocus(e, !1, !0), t && cur.scrollbar) {
                                    var o = domCA(e, ".reply_box");
                                    o && cur.scrollbar.scrollIntoView(o)
                                }
                            }
                        });
                        break;
                    case "page.js":
                        (cur.options.is_auto || cur.options.is_nano) && (Composer.init = (i = Composer.init, function() {
                            var e = [].slice.call(arguments);
                            return e[1].media && (e[1].media.options = extend(e[1].media.options || {}, {
                                hideAfterCount: 0,
                                maxShown: 0,
                                forceToUp: 1
                            })), i.apply(Wall, e)
                        })), extend(Wall, {
                            scrollHighlightReply: function(e) {
                                (e = ge(e)) && (cur.options.fixed_height && cur.scrollbar ? cur.scrollbar.scrollIntoView(e, !0, Wall.highlightReply.bind(Wall, e)) : (e.scrollIntoView(), Wall.highlightReply(e)))
                            },
                            postTooltip: (s = Wall.postTooltip, function() {
                                var e = [].slice.call(arguments);
                                return e[3] = extend(e[3] || {}, {
                                    appendEl: cur.postsOuterEl
                                }), s.apply(this, e)
                            }),
                            sendPost: function() {
                                if (cur.sendPostBtn) {
                                    var e = cur.wallAddMedia || {},
                                        t = e.chosenMedia || {},
                                        o = cur.wallAddMedia ? e.getMedias() : [],
                                        s = e.shareData || {},
                                        i = trim((window.Emoji ? Emoji.editableVal : val)(ge("post_field"))),
                                        n = cur.options.suggesting ? "suggest" : cur.wallType,
                                        r = {
                                            act: "post",
                                            message: i,
                                            to_id: cur.postTo,
                                            type: n,
                                            status_export: "",
                                            widget_app: cur.options.app,
                                            widget_page_url: cur.options.page_url,
                                            widget_page_title: cur.options.page_title,
                                            widget_page_desc: cur.options.page_desc,
                                            widget_page_query: cur.options.page_query,
                                            hash: cur.options.post_hash
                                        },
                                        a = (cur.postTo == vk.id || r.official || cur.options.only_official, 0);
                                    if (isArray(t) && t.length && o.push(clone(t)), o.length) {
                                        var l = !1;
                                        if (each(o, function(t, o) {
                                                if (o) {
                                                    var n = this[0],
                                                        c = this[1];
                                                    switch (n) {
                                                        case "poll":
                                                            var p = e.pollData();
                                                            if (!p) return l = !0, !1;
                                                            c = p.media, delete p.media, r = extend(r, p);
                                                            break;
                                                        case "share":
                                                            if (s.failed || !s.url || !s.title && (!s.images || !s.images.length) && !s.photo_url) return cur.shareLastParseSubmitted && vkNow() - cur.shareLastParseSubmitted < 2e3 ? (l = !0, !1) : void 0;
                                                            if (c = !s.noPhoto && s.user_id && s.photo_id ? s.user_id + "_" + s.photo_id : "", s.images && s.images.length && !s.share_own_image) return e.uploadShare(Wall.sendPost), l = !0, !1;
                                                            s.initialPattern && trim(i) == s.initialPattern && (r.message = ""), r = extend(r, {
                                                                url: s.url,
                                                                title: replaceEntities(s.title),
                                                                description: replaceEntities(s.description),
                                                                extra: s.extra,
                                                                extra_data: s.extraData,
                                                                mode: s.mode,
                                                                photo_url: s.noPhoto ? "" : replaceEntities(s.photo_url),
                                                                open_graph_data: (s.openGraph || {}).data,
                                                                open_graph_hash: (s.openGraph || {}).hash
                                                            });
                                                            break;
                                                        case "page":
                                                            s.initialPattern && trim(i) == s.initialPattern && (r.message = "");
                                                            break;
                                                        case "postpone":
                                                            var u = val("postpone_date" + e.lnkId);
                                                            return r = extend(r, {
                                                                postpone: u
                                                            }), cur.postponedLastDate = u, void!0
                                                    }
                                                    this[3] && trim(i) == this[3] && (r.message = ""), r["attach" + (a + 1) + "_type"] = n, r["attach" + (a + 1)] = c, a++
                                                }
                                            }), l) return
                                    }
                                    if (a || i) {
                                        var c = ge("send_post");
                                        c && buttonLocked(c) || (cur.postAutosave && clearTimeout(cur.postAutosave), hide("submit_post_error"), cur.postSent = !0, setTimeout(function() {
                                            WComments.eventsPause(), ajax.post("al_wall.php", Wall.fixPostParams(r), {
                                                onDone: function(e) {
                                                    if (e) {
                                                        var t = {
                                                            act: "a_post",
                                                            post: e,
                                                            width: cur.options.width,
                                                            startWidth: cur.options.startWidth,
                                                            hash: cur.options.post_hash,
                                                            app: cur.options.app,
                                                            limit: cur.options.limit,
                                                            export: isChecked("wcomments_export")
                                                        };
                                                        ajax.post("al_widget_comments.php", t, {
                                                            onDone: function(e, t) {
                                                                "posts" == cur.section && cur.Rpc && cur.Rpc.callMethod("publish", "widgets.comments.new_comment", e.count, e.last_comment, e.date, e.full_hash, e.pageId), val("wcomments_posts", t), WComments.contentUpdated(e), Wall.updateMentionsIndex(), WComments.eventsProceed()
                                                            },
                                                            onFail: function() {
                                                                WComments.eventsProceed()
                                                            },
                                                            showProgress: function() {
                                                                lockButton(ge("send_post"))
                                                            },
                                                            hideProgress: function() {
                                                                Wall.clearInput(), cur.postSent = !1;
                                                                var e = ge("post_field");
                                                                if (cur.withMentions) {
                                                                    var t = data(e, "mention");
                                                                    t && (t.rtaEl.innerHTML = "", hide(t.cont), show(e))
                                                                }
                                                                e.value = "", e.blur(), e.phonblur(), Wall.hideEditPost(!0), cur.wallAddMedia && cur.wallAddMedia.unchooseMedia(), hide("post_warn"), cur.onWallSendPost && cur.onWallSendPost(), unlockButton(ge("send_post"))
                                                            }
                                                        })
                                                    }
                                                },
                                                onFail: function(e) {
                                                    return cur.postSent = !1, !e || (ge("submit_post_error").innerHTML = e.length > 60 ? '<div class="msg_text">' + e + "</div>" : e, isVisible("submit_post_error") || slideDown("submit_post_error", 100), !0)
                                                },
                                                showProgress: function() {
                                                    lockButton(c)
                                                },
                                                hideProgress: function() {
                                                    unlockButton(c)
                                                }
                                            })
                                        }, 0))
                                    } else elfocus("post_field")
                                }
                            },
                            sendReply: function(e, t, o) {
                                if (o = extend({}, o), window.mvcur && mvcur.post == e) return Videoview.sendComment(e, t, o);
                                var s, i = window.cur.wallLayer == e,
                                    n = i ? wkcur : window.cur,
                                    r = ge("reply_field" + e),
                                    a = r && data(r, "composer"),
                                    l = n.reply_to && Wall.getReplyName(n.reply_to[0]),
                                    c = r && data(r, "send");
                                if (c && isFunction(c)) return c(e, t, o);
                                if (o.stickerId) var p = {
                                    message: "",
                                    attach1_type: "sticker",
                                    attach1: o.stickerId,
                                    sticker_referrer: o.sticker_referrer
                                };
                                else {
                                    if ((p = a ? Composer.getSendParams(a, Wall.sendReply.pbind(e)) : {
                                            message: trim(Emoji.editableVal(r))
                                        }).delayed) return;
                                    if (!p.attach1_type && (!p.message || isArray(l) && !l[1].indexOf(p.message))) return void Emoji.editableFocus(ge("reply_field" + e), !1, !0);
                                    a ? s = Composer.reset(a) : window.Emoji && Emoji.val(r, ""), r.autosize && r.autosize.update()
                                }
                                n.wallMyOpened = n.wallMyOpened || {}, n.wallMyReplied[e] = 1, n.wallMyOpened[e] = 1;
                                var u = ge("post_hash" + e) ? ge("post_hash" + e).value : n.options.post_hash,
                                    d = (ge("reply_as_group" + e), null);
                                if (extend(p, {
                                        act: "post",
                                        type: "widget",
                                        width: n.options.width,
                                        startWidth: n.options.startWidth,
                                        reply_to: e,
                                        reply_to_msg: val("reply_to" + e),
                                        reply_to_user: n.reply_to && n.reply_to[0] || 0,
                                        start_id: val("start_reply" + e),
                                        from: "widget",
                                        hash: u
                                    }), n.reverse && (p.rev = 1), browser.mobile ? Wall.hideEditReply(e) : (Emoji.editableFocus(r, !1, !0), Wall.cancelReplyTo(e, t)), ajax.post("al_wall.php", Wall.fixPostParams(p), {
                                        onDone: function(t, o, s, i) {
                                            if ("full" == n.wallType) return FullWall.onReplySent.apply(window, arguments);
                                            n.wallMyReplied[e] = 0, re("reply_link" + e), hide("reply_warn" + e), Wall._repliesLoaded(e, !1, o, s, i)
                                        },
                                        onFail: function() {
                                            d && re(d), a ? s = Composer.restore(a, s) : val(r, p.message), r.autosize && r.autosize.update()
                                        },
                                        showProgress: lockButton.pbind(ge("reply_button" + e)),
                                        hideProgress: unlockButton.pbind(ge("reply_button" + e))
                                    }), !p.from_oid && p.message) {
                                    var _ = ge("replies" + e),
                                        h = - ++n.wallMyRepliesCnt,
                                        m = Emoji.emojiToHTML(clean(p.message), !0),
                                        g = p.reply_to_user < 0 ? getLang("wall_replied_to_group") : n.options.reply_names[p.reply_to_user] && n.options.reply_names[p.reply_to_user][0],
                                        f = g ? rs(n.wallTpl.reply_link_to, {
                                            to_user: g
                                        }) : "";
                                    if (d = se(rs(n.wallTpl.reply_fast, {
                                            reply_id: "0_" + h,
                                            message: m.replace(/\n/g, "<br/>"),
                                            to_link: f,
                                            date: Wall.getNowRelTime(n)
                                        })), _ && !isVisible(_) || ge("reply_link" + e)) re("reply_link" + e), show("replies_wrap" + e);
                                    else if (!n.onepost) {
                                        var w = _.nextSibling;
                                        if (w && "replies_open" == w.className && Wall.openNewComments(e), !i) {
                                            var y = geByClass1("wr_header", _, "a"),
                                                b = geByClass("reply", _, "div").length + 1,
                                                v = b;
                                            y && (v = intval(y.getAttribute("offs").split("/")[1]) + 1), (v > 5 || b < v) && (y || _.insertBefore(y = ce("a", {
                                                className: "wr_header"
                                            }), _.firstChild), Wall.updateRepliesHeader(e, y, b, v))
                                        }
                                    }
                                    n.reverse ? _.insertBefore(d, _.firstChild) : _.appendChild(d)
                                }
                            },
                            deletePost: function(e, t, o, s, i) {
                                (cur.wallLayer ? wkcur : cur).wallMyDeleted[t] = 1;
                                var n = ge("post" + t),
                                    r = geByClass1("post_actions", n);
                                ajax.post("al_wall.php", {
                                    act: "delete",
                                    post: t,
                                    hash: o,
                                    root: s ? 1 : 0,
                                    confirm: i ? 1 : 0,
                                    from: "widget"
                                }, {
                                    onDone: function(e, i, r) {
                                        if (r) var a = showFastBox(e, r, getLang("global_delete"), function() {
                                            a.hide(), wall.deletePost(t, o, s, 1)
                                        }, getLang("box_cancel"));
                                        else {
                                            i && "posts" == cur.section && cur.Rpc && cur.Rpc.callMethod("publish", "widgets.comments.delete_comment", i.count, i.last_comment, i.date, i.full_hash, i.pageId);
                                            var l = geByClass1("_post_content", n) || geByClass1("feedback_row_t", n);
                                            revertLastInlineVideo(l);
                                            var c = ge("post_del" + t);
                                            c ? (c.innerHTML = '<span class="dld_inner">' + e + "</span>", show(c)) : n.appendChild(ce("div", {
                                                id: "post_del" + t,
                                                className: "dld",
                                                innerHTML: '<span class="dld_inner">' + e + "</span>"
                                            })), hide(l), "post_publish" == domNS(l).className && hide(domNS(l)), "full_own" == cur.wallType || "full_all" == cur.wallType ? (Pagination.recache(-1), FullWall.updateSummary(cur.pgCount)) : "full" == cur.wallType && hasClass(n, "reply") && (cur.pgOffset--, cur.pgCount--, FullWall.repliesSummary(cur.pgCount)), hasClass(n, "suggest") ? Wall.suggestUpdate(-1) : hasClass(n, "postponed") || "own" != cur.wallType && "all" != cur.wallType || (hasClass(n, "own") && ++cur.deletedCnts.own, hasClass(n, "all") && ++cur.deletedCnts.all, Wall.update()), WComments.contentUpdated()
                                        }
                                    },
                                    showProgress: function() {
                                        hasClass(e, "ui_actions_menu_item") ? lockActionsMenuItem(e) : hasClass(e, "flat_button") ? lockButton(e) : addClass(r, "post_actions_progress")
                                    },
                                    hideProgress: function() {
                                        hasClass(e, "ui_actions_menu_item") ? unlockActionsMenuItem(e) : hasClass(e, "flat_button") ? unlockButton(e) : removeClass(r, "post_actions_progress")
                                    }
                                });
                                var a = ge("delete_post" + t);
                                a && a.tt && a.tt.el && a.tt.destroy()
                            },
                            restorePost: function(e, t, o) {
                                return (cur.wallLayer ? wkcur : cur).wallMyDeleted[e] = 0, ajax.post("al_wall.php", {
                                    act: "restore",
                                    post: e,
                                    hash: t,
                                    root: o ? 1 : 0,
                                    from: "widget"
                                }, {
                                    onDone: function(t) {
                                        var o = ge("post_del" + e);
                                        if (o) {
                                            var s = ge("post" + e),
                                                i = geByClass1("_post_content", s) || geByClass1("feedback_row_t", s);
                                            show(i), "post_publish" == domNS(i).className && show(domNS(i)), hide(o), "full_own" == cur.wallType || "full_all" == cur.wallType ? (Pagination.recache(1), FullWall.updateSummary(cur.pgCount)) : "full" == cur.wallType && hasClass(s, "reply") && (cur.pgOffset++, cur.pgCount++, FullWall.repliesSummary(cur.pgCount)), hasClass(s, "suggest") ? Wall.suggestUpdate(1) : hasClass(s, "postponed") || "own" != cur.wallType && "all" != cur.wallType || (hasClass(s, "own") && --cur.deletedCnts.own, hasClass(s, "all") && --cur.deletedCnts.all, Wall.update()), WComments.contentUpdated()
                                        }
                                    }
                                }), !1
                            },
                            postClick: function(e, t, o) {
                                var s = (e || "").match(/^(-?\d+)_(wall)?(\d+)$/),
                                    i = ge("post" + e);
                                if (o && o.skipCheck) var n = !0;
                                else n = Wall.checkPostClick(i, t);
                                if (n) {
                                    if (!0 !== n) {
                                        var r = geByClass1("wall_post_more", n, "a");
                                        if (r && isVisible(r)) return r.onclick(), void(s || removeClass(i, "wall_post_over"))
                                    }
                                    s && (hasClass(ge("wcomments_posts"), "no_post_click") || window.open("wall" + s[1] + "_" + s[3], "_blank"))
                                }
                            },
                            _repliesLoaded: function(e, t, o, s) {
                                var i = ge("replies" + e);
                                if (i) {
                                    if (t) {
                                        browser.msie6 ? pageNode : browser.chrome || browser.safari ? bodyNode : htmlNode, i.offsetHeight;
                                        cur.options.fixed_height && cur.scrollbar ? cur.scrollbar.updateAbove(function() {
                                            i.innerHTML = o
                                        }) : i.innerHTML = o, setTimeout(Wall.scrollHighlightReply.pbind("post" + t), 0)
                                    } else i.innerHTML = o;
                                    var n = i.nextSibling;
                                    n && "replies_open" == n.className && re(n), extend(cur.options.reply_names || {}, s), Wall.updateMentionsIndex()
                                }
                            },
                            editPost: (o = Wall.editPost, function(e, t) {
                                stManager.add(["audioplayer.css", "audioplayer.js"], Function.apply.bind(o, Wall, [].slice.call(arguments)))
                            }),
                            checkTextLen: function() {},
                            checkPostLen: function() {},
                            replySubmitTooltip: function() {},
                            repliesSideSetup: function() {},
                            repliesSideClick: function() {},
                            likesShow: function(e, t, o) {
                                o = o || {};
                                var s = wall.parsePostId(t),
                                    i = s.type,
                                    n = s.id,
                                    r = i + n,
                                    a = e && gpeByClass("_post_content", e) || wall.domPost(n),
                                    l = o.share ? "_share_wrap" : "_like_wrap",
                                    c = domByClass(a, l),
                                    p = domByClass(c, "_icon"),
                                    u = a && domByClass(a, "_share_wrap");
                                if (p && !cur.viewAsBox) {
                                    var d = getXY(c)[0],
                                        _ = getXY(p)[0] + getSize(p, !0)[0] / 2 - d - 56;
                                    showTooltip(p.parentNode, {
                                        url: "/like.php",
                                        params: extend({
                                            act: "a_get_stats",
                                            object: r,
                                            has_share: u ? 1 : ""
                                        }, o.share ? {
                                            published: 1
                                        } : {}),
                                        slide: 15,
                                        shift: [-_, -3],
                                        ajaxdt: 100,
                                        showdt: 400,
                                        hidedt: 200,
                                        dir: "auto",
                                        checkLeft: !0,
                                        reverseOffset: 80,
                                        appendEl: ge("page_wrap"),
                                        tip: {
                                            over: function() {
                                                Wall.likesShow(e, t, o)
                                            }
                                        },
                                        typeClass: "like_tt wcomments_like_tt",
                                        className: o.cl || ""
                                    })
                                }
                            },
                            showReplies: function(e, t, o, s) {
                                if (!checkEvent(s || window.event)) return cur.viewAsBox ? cur.viewAsBox() : (cur.wallMyOpened[e] = 3 != t, ajax.post("al_wall.php", {
                                    act: "get_replies",
                                    width: cur.options.width,
                                    startWidth: cur.options.startWidth,
                                    post: e,
                                    count: t,
                                    from: "widget"
                                }, {
                                    onDone: function() {
                                        var t = [].slice.call(arguments);
                                        t.unshift(e, o), Wall._repliesLoaded.apply(Wall, t), WComments.resizeWidget()
                                    },
                                    showProgress: lockButton.pbind("wrh" + e),
                                    hideProgress: unlockButton.pbind("wrh" + e)
                                }), !1)
                            }
                        }), each(["showEditReply", "markAsSpam", "stickerClick", "likeIt"], function(e, t) {
                            var o;
                            Wall[t] = (o = Wall[t], function() {
                                if (vk.id) return o.apply(Wall, [].slice.call(arguments));
                                Widgets.oauth()
                            })
                        })
                }
            }
        };
        try {
            stManager.done(jsc("api/widgets/comments.js"))
        } catch (e) {}
    }
});