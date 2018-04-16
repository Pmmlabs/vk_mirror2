! function(e) {
    function t(i) {
        if (a[i]) return a[i].exports;
        var o = a[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    var a = {};
    return t.m = e, t.c = a, t.d = function(e, a, i) {
        t.o(e, a) || Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: i
        })
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(a, "a", a), a
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 288)
}({
    288: function(e, t, a) {
        e.exports = a(333)
    },
    333: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
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
                }), cur.options.filter_media_types = cur.options.media_types || [], this.override("lite.js"), this.override("page.js"), this.override("emoji.js"), this.override("ui_media_selector.js", !0), stManager.emitter.addListener("update", this.override.bind(this)), this.updateSize(), (e.is_auto || e.is_nano) && extend(e, {
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
                } catch (t) {
                    debugLog(t)
                }
                e.user_id || (addEvent("send_post", "click", Widgets.oauth.bind(Widgets)), addEvent("post_field", "click", Widgets.oauth.bind(Widgets)))
            },
            uncleanObj: function(e) {
                if (isObject(e)) {
                    var t = {};
                    for (var a in e) t[a.replace(/[^a-zA-Z0-9_\-]/g, "")] = this.uncleanObj(e[a])
                } else if (isArray(e)) {
                    var t = [];
                    for (var a in e) t.push(this.uncleanObj(e[a]))
                } else {
                    var i = "undefined" == typeof e ? "undefined" : _typeof(e);
                    if ("number" == i || "boolean" == i || "function" == i) var t = e;
                    else var t = unclean(e)
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
                var a = (t ? t : getSize("page_wrap"))[0];
                if (setStyle(cur.heightEl, {
                        width: a
                    }), cur.options.is_auto) {
                    var i = 1 == cur.options.mini || 0 != cur.options.mini && 630 > a,
                        o = i && 380 > a;
                    e.size != i + "" + o && (e.size = i + "" + o, replaceClass(bodyNode, "wcomments_mini wcomments_nano", (i ? "wcomments_mini " : "") + (o ? "wcomments_nano " : "")))
                }
            },
            resizeWidget: function t() {
                if (cur.heightEl && cur.Rpc) {
                    var e = getSize("page_wrap");
                    (browser.msie && !browser.msie8 || browser.opera) && (e[1] += 15), window.onBodyResize && onBodyResize(), t.size != e.join(" ") && (t.size = e.join(" "), this.updateSize(e), cur.Rpc.callMethod("resize", e[1]))
                }
            },
            showMore: function() {
                if (!cur.switchingSection) {
                    var e = geByClass1("_wcomments_more");
                    return cur.options.offset >= cur.options.count ? hide(e) : void(buttonLocked(e) || ajax.post("al_widget_comments.php", extend(WComments.getSectionParams(), {
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
                    }))
                }
            },
            switchSection: function(e) {
                if (cur.switchingSection || cur.section == e) return !1;
                cur.switchingSection = !0;
                var t = uiTabs && geByClass1("_wcomments_admin_tabs"),
                    a = t && geByClass1("_" + e);
                return "posts" == e || "posts" == cur.section ? addClass(cur.contentEl, "wcomments_content_loading") : t && uiTabs.showProgress(t), a && uiTabs.switchTab(geByClass1("ui_tab", a)), cur.section = e, ajax.post("al_widget_comments.php", WComments.getSectionParams(), {
                    onDone: function(a, i) {
                        val(cur.postsEl, i), t && uiTabs.hideProgress(t), removeClass(cur.contentEl, "wcomments_content_loading"), replaceClass(cur.heightEl, "wcomments_section_posts wcomments_section_admin_browse wcomments_section_admin_bl wcomments_section_admin_updates wcomments_section_browse", "wcomments_section_" + e), cur.options.fixed_height && setStyle(cur.postsOuterEl, {
                            maxHeight: cur.options.fixed_height - getSize(geByClass1("_wcomments_head"))[1] - getSize("posts" == cur.section || "browse" == cur.section ? geByClass1("_wcomments_form") : geByClass1("_wcomments_admin_tabs"))[1]
                        }), cur.scrollbar && cur.scrollbar.scrollTop(), WComments.contentUpdated(a), cur.switchingSection = !1
                    }
                }), !1
            },
            addToBl: function(e, t, a) {
                return hasClass(a, "wcomments_bl_action_loading") ? !1 : void ajax.post("al_widget_comments.php", {
                    act: "a_add_to_bl",
                    id: e,
                    hash: t,
                    app: cur.options.app
                }, {
                    onDone: function() {
                        hide(geByClass1("_wcomments_bl_label_" + e)), a.onclick = WComments.delFromBl.bind(WComments, e, t, a), val(a, getLang("widgets_remove_from_banlist"))
                    },
                    showProgress: addClass.pbind(a, "wcomments_bl_action_loading"),
                    hideProgress: removeClass.pbind(a, "wcomments_bl_action_loading")
                })
            },
            delFromBl: function(e, t, a) {
                return hasClass(a, "wcomments_bl_action_loading") ? !1 : void ajax.post("al_widget_comments.php", {
                    act: "a_del_from_bl",
                    id: e,
                    hash: t,
                    app: cur.options.app
                }, {
                    onDone: function() {
                        setStyle(geByClass1("_wcomments_bl_label_" + e), "display", "inline"), a.onclick = WComments.addToBl.bind(WComments, e, t, a), val(a, getLang("widgets_restore_to_banlist"))
                    },
                    showProgress: addClass.pbind(a, "wcomments_bl_action_loading"),
                    hideProgress: removeClass.pbind(a, "wcomments_bl_action_loading")
                })
            },
            updateTimes: function(e) {
                if ((cur.lang || {}).wall_X_seconds_ago_words) {
                    var t = intval(vkNow() / 1e3),
                        a = [];
                    t -= cur.tsDiff, each(geByClass("rel_date_needs_update", e || ge("wcomments_posts"), "span"), function(e, i) {
                        if (i) {
                            var o = intval(i.getAttribute("time")),
                                s = t - o,
                                r = i.getAttribute("abs_time");
                            5 > s ? r = getLang("wall_just_now") : 60 > s ? r = Wall.langWordNumeric(s, cur.lang.wall_X_seconds_ago_words, cur.lang.wall_X_seconds_ago) : 3600 > s ? r = Wall.langWordNumeric(intval(s / 60), cur.lang.wall_X_minutes_ago_words, cur.lang.wall_X_minutes_ago) : 14400 > s ? r = Wall.langWordNumeric(intval(s / 3600), cur.lang.wall_X_hours_ago_words, cur.lang.wall_X_hours_ago) : a.push(i), i.innerHTML = r
                        }
                    }), each(a, function() {
                        removeClass(this, "rel_date_needs_update")
                    })
                }
            },
            langWordNumeric: function(e, t, a) {
                return isArray(t) && e < t.length ? t[e] : langNumeric(e, a)
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
            deleteAllAndBan: function(e, t, a, i) {
                ajax.post("al_widget_comments.php", {
                    act: "a_add_to_bl",
                    id: t,
                    hash: a,
                    app: cur.options.app
                }, {
                    onDone: function(a, i) {
                        i && each(geByClass("wcomments_post", ge("wcomments_posts"), "div"), function() {
                            !this.id.indexOf("post" + t) && this.id.split("_")[1] >= i && this.id != "post" + e && isVisible(this) && hide(this)
                        }), ge("post_del" + e).innerHTML = a, WComments.contentUpdated()
                    },
                    showProgress: function() {
                        lockButton(i)
                    },
                    hideProgress: function() {
                        unlockButton(i)
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
                return curNotifier.lp_started ? curNotifier.lpMakeRequest ? void curNotifier.lpMakeRequest(curNotifier.frame_url, {
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
                }.bind(this)) : void(curNotifier.lp_check_to = setTimeout(this.lpCheck.bind(this), 1e3)) : void 0
            },
            lpChecked: function(e) {
                var t = e.failed;
                if (2 == t) return curNotifier.lp_error_to = setTimeout(this.lpGetKey.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2), !1;
                if (t) throw getLang("global_unknown_error");
                return curNotifier.timestamp = e.ts, cur.section.indexOf("admin") ? (cur.saveScrollPosition = cur.scrollbar && cur.scrollbar.data.scrollTop > 100, each(e.events, function(e, t) {
                    WComments.eventsParse(t)
                }), !0) : !0
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
                        return 3 == e ? void location.reload() : (curNotifier.error_timeout = 64, this.lp_error_to = setTimeout(this.lpGetKey.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2), !0)
                    }.bind(this)
                })
            },
            resizePostSizedThumbs: function(e, t, a, i, o) {
                var s = geByClass("page_post_thumb_wrap", e),
                    r = [],
                    n = 0,
                    l = 0,
                    d = function() {
                        p && r.push(p), n = l = 0, extend(this, {
                            tiles: [],
                            height: 0,
                            x: 0,
                            y: 0
                        })
                    },
                    c = function(e) {
                        e && extend(this, {
                            el: e,
                            lastRow: hasClass(e, "page_post_thumb_last_row"),
                            lastColumn: hasClass(e, "page_post_thumb_last_column"),
                            width: intval(e.style.width),
                            height: intval(e.style.height)
                        })
                    },
                    p = new d,
                    u = positive(e.style.width),
                    _ = positive(e.style.height),
                    h = 0;
                if (t > u && (t = null), (i > _ || o && s.length > 1) && (i = null), !i && t) i = Math.round(_ * (t / u));
                else if (i && !t) t = Math.round(u * (i / _));
                else {
                    if (!t || !i) return;
                    o && (i = Math.min(i, Math.round(_ * (t / u))), t = Math.round(u * (i / _)))
                }
                return each(s, function(e, t) {
                    var i = t.tile || new c(t),
                        o = new c(s[e + 1]);
                    p.height = Math.max(p.height, i.height), u - n >= i.width / 2 ? (n += i.width + (i.lastColumn ? 0 : a), l = i.height, i.x = p.x, i.y = p.y = 0, p.tiles.push(i), i.lastColumn ? o && o.lastColumn && p.height - l >= o.height / 2 || (p = new d) : p.x++) : i.lastColumn && p.height - l >= i.height / 2 && (l += i.height + a, i.x = p.x, i.y = ++p.y, p.tiles.push(i), !i.lastRow && o && o.lastColumn && p.height - l >= o.height / 2 || (p.height = Math.max(p.height, l), p = new d))
                }), each(r, function(e, o) {
                    var s = 0,
                        n = 0,
                        l = (t - a * o.x) / (u - a * o.x),
                        d = (i - a * o.y) / (_ - a * o.y),
                        c = r.length - 1 == e ? i - h : Math.round(o.height * d),
                        p = 0,
                        m = 0;
                    h += c + a, each(o.tiles, function(e, i) {
                        i.x < o.x ? (p = Math.round(i.width * l), s += p + a, i.y || (m = c)) : i.lastColumn && (p = t - s, i.y == o.y ? m = c - n : (m = Math.round(i.height * d), n += m + a)), setStyle(i.el, {
                            width: p,
                            height: m
                        })
                    })
                }), setStyle(e, {
                    width: t,
                    height: i
                }), [t, i]
            },
            resizePostAlbumWrap: function(e, t, a, i) {
                i || (i = "");
                var o = positive(e.style.width),
                    s = geByClass1("page" + i + "_album_thumb_wrap", e, "div"),
                    r = domFC(geByClass1("page" + i + "_album_photos", e, "div")),
                    n = domFC(geByClass1("page" + i + "_album_under_row", e, "div"));
                if (scaleX = t / o, !(t > o) && s) {
                    setStyle(e, {
                        width: t
                    });
                    var l = Math.round(positive(s.style.width) * scaleX),
                        d = Math.round(positive(s.style.height) * scaleX);
                    setStyle(s, {
                        width: l,
                        height: d
                    }), r && WComments.resizePostSizedThumbs(r, t - a - l, a, d), n && WComments.resizePostSizedThumbs(n, t, a, positive(n.style.height) * ((t - a) / (o - a)))
                }
            },
            resizePost: function(e, t) {
                var a = t ? cur.options.reply_max_w : cur.options.max_w,
                    i = Math.max(cur.options.kludges_min_h, a * (t ? cur.options.reply_kludges_ratio : cur.options.kludges_ratio));
                return each(geByClass("page_album_wrap", e, "div"), function(e, t) {
                    WComments.resizePostAlbumWrap(t, a, 5)
                }), each(geByClass("page_market_album_wrap", e, "div"), function(e, t) {
                    WComments.resizePostAlbumWrap(t, a - 2, 2, "_market")
                }), each(geByClass("page_post_sized_thumbs", e, "div"), function(e, t) {
                    WComments.resizePostSizedThumbs(t, a, 5, i, !0)
                }), each(geByClass("audio_pl_snippet", e, "div"), function(e, t) {
                    if (a <= cur.playlist_snippet_max_narrow_width) var i = "audio_pl_snippet_size_narrow";
                    else if (a <= cur.playlist_snippet_max_medium_width) var i = "audio_pl_snippet_size_medium";
                    else var i = "";
                    setStyle(t, "width", a), removeClass(t, "audio_pl_snippet_size_narrow audio_pl_snippet_size_medium"), i && addClass(t, i)
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
                    a = t[0],
                    i = t[1],
                    o = t[2],
                    s = ge("post" + o);
                if (a != cur.options.qversion) return location.reload();
                switch (i) {
                    case "new_post":
                        if (s) break;
                        var r = ge("wcomments_posts"),
                            n = (intval(t[t.length - 1]), this.resizePost(se(Wall.getNewPostHTML(t, cur.options.is_admin))));
                        WComments.eventsUpdateAttaches(n);
                        var l = function() {
                            r.insertBefore(n, r.firstChild), ge("post_poll_id" + o) && Wall.updatePoll(o)
                        };
                        cur.saveScrollPosition ? cur.scrollbar.updateAbove(l) : (l(), cur.scrollbar && cur.scrollbar.scrollTop(0, !0)), nodeUpdated(n), Wall.updateMentionsIndex(), "browse" !== cur.section && val(cur.countEl, u ? getLang("widgets_comments_top_count", u) : getLang("widgets_comments"));
                        break;
                    case "del_post":
                        s && (!cur.wallMyDeleted[o] && hide(s), cur.options.offset--);
                        break;
                    case "res_post":
                        s && cur.options.offset++;
                        break;
                    case "new_reply":
                        if (!s || cur.wallMyReplied[o] || ge("post" + t[3])) break;
                        var d = ge("replies" + o),
                            n = this.resizePost(se(Wall.getNewReplyHTML(t, cur.options.is_admin)), !0),
                            c = !1;
                        if (isVisible("reply_link" + o)) re("reply_link" + o), show("replies_wrap" + o), c = !0;
                        else {
                            var p = d.nextSibling,
                                u = geByClass("new_reply", d, "div").length + 1;
                            if (cur.wallMyOpened[o]) {
                                p && "replies_open" == p.className && re(p), c = !0;
                                var _ = geByClass1("wr_header", d, "a"),
                                    h = geByClass("reply", d, "div").length + 1,
                                    m = h;
                                _ && (m = intval(_.getAttribute("offs").split("/")[1]) + 1), (m > 5 || m > h) && (_ || (_ = ce("a", {
                                    className: "wr_header"
                                }), d.insertBefore(_, d.firstChild)), Wall.updateRepliesHeader(o, _, h, m))
                            } else addClass(n, "new_reply"), p && "replies_open" == p.className || (p = ce("div", {
                                className: "replies_open",
                                onclick: Wall.openNewComments.pbind(o)
                            }), d.parentNode.insertBefore(p, d.nextSibling)), val(p, getLang("news_x_new_replies_more", Math.min(100, u))), p.newCnt = u
                        }
                        WComments.eventsUpdateAttaches(n), d.appendChild(n), c && nodeUpdated(n);
                        break;
                    case "del_reply":
                        !cur.wallMyDeleted[o] && re(s)
                }
                this.resizeWidget()
            },
            override: function(e, t) {
                if (StaticFiles[e] || t === !0) switch (e) {
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
                                if (e = (e && e.w || "").split("/"), "likes" == e[0]) WComments.showLikesBox(e[1]);
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
                    case "emoji.js":
                        extend(Emoji, {
                            focus: function(e, t) {
                                if (Emoji.editableFocus(e, !1, !0), t && cur.scrollbar) {
                                    var a = domCA(e, ".reply_box");
                                    a && cur.scrollbar.scrollIntoView(a)
                                }
                            }
                        });
                        break;
                    case "page.js":
                        (cur.options.is_auto || cur.options.is_nano) && (Composer.init = function(e) {
                            return function() {
                                var t = [].slice.call(arguments);
                                return t[1].media && (t[1].media.options = extend(t[1].media.options || {}, {
                                    hideAfterCount: 0,
                                    maxShown: 0,
                                    forceToUp: 1
                                })), e.apply(Wall, t)
                            }
                        }(Composer.init)), extend(Wall, {
                            scrollHighlightReply: function(e) {
                                (e = ge(e)) && (cur.options.fixed_height && cur.scrollbar ? cur.scrollbar.scrollIntoView(e, !0, Wall.highlightReply.bind(Wall, e)) : (e.scrollIntoView(), Wall.highlightReply(e)))
                            },
                            postTooltip: function(e) {
                                return function() {
                                    var t = [].slice.call(arguments);
                                    return t[3] = extend(t[3] || {}, {
                                        appendEl: cur.postsOuterEl
                                    }), e.apply(this, t)
                                }
                            }(Wall.postTooltip),
                            sendPost: function() {
                                if (cur.sendPostBtn) {
                                    var e = cur.wallAddMedia || {},
                                        t = e.chosenMedia || {},
                                        a = cur.wallAddMedia ? e.getMedias() : [],
                                        i = e.shareData || {},
                                        o = trim((window.Emoji ? Emoji.editableVal : val)(ge("post_field"))),
                                        s = !1,
                                        r = cur.options.suggesting ? "suggest" : cur.wallType,
                                        n = {
                                            act: "post",
                                            message: o,
                                            to_id: cur.postTo,
                                            type: r,
                                            status_export: "",
                                            widget_app: cur.options.app,
                                            widget_page_url: cur.options.page_url,
                                            widget_page_title: cur.options.page_title,
                                            widget_page_desc: cur.options.page_desc,
                                            widget_page_query: cur.options.page_query,
                                            hash: cur.options.post_hash
                                        },
                                        l = (cur.postTo == vk.id || n.official || cur.options.only_official, 0);
                                    if (isArray(t) && t.length && a.push(clone(t)), a.length) {
                                        var d = !1;
                                        if (each(a, function(t, a) {
                                                if (a) {
                                                    var r = this[0],
                                                        c = this[1];
                                                    switch (r) {
                                                        case "poll":
                                                            var p = e.pollData();
                                                            if (!p) return d = !0, !1;
                                                            c = p.media, delete p.media, n = extend(n, p);
                                                            break;
                                                        case "share":
                                                            if (i.failed || !i.url || !i.title && (!i.images || !i.images.length) && !i.photo_url) return cur.shareLastParseSubmitted && vkNow() - cur.shareLastParseSubmitted < 2e3 ? (d = !0, !1) : void 0;
                                                            if (c = !i.noPhoto && i.user_id && i.photo_id ? i.user_id + "_" + i.photo_id : "", i.images && i.images.length && !i.share_own_image) return e.uploadShare(Wall.sendPost), d = !0, !1;
                                                            i.initialPattern && trim(o) == i.initialPattern && (n.message = ""), n = extend(n, {
                                                                url: i.url,
                                                                title: replaceEntities(i.title),
                                                                description: replaceEntities(i.description),
                                                                extra: i.extra,
                                                                extra_data: i.extraData,
                                                                mode: i.mode,
                                                                photo_url: i.noPhoto ? "" : replaceEntities(i.photo_url),
                                                                open_graph_data: (i.openGraph || {}).data,
                                                                open_graph_hash: (i.openGraph || {}).hash
                                                            });
                                                            break;
                                                        case "page":
                                                            i.initialPattern && trim(o) == i.initialPattern && (n.message = "");
                                                            break;
                                                        case "postpone":
                                                            var u = val("postpone_date" + e.lnkId);
                                                            return n = extend(n, {
                                                                postpone: u
                                                            }), cur.postponedLastDate = u, void(s = !0)
                                                    }
                                                    this[3] && trim(o) == this[3] && (n.message = ""), n["attach" + (l + 1) + "_type"] = r, n["attach" + (l + 1)] = c, l++
                                                }
                                            }), d) return
                                    }
                                    if (!l && !o) return void elfocus("post_field");
                                    var c = ge("send_post");
                                    c && buttonLocked(c) || (cur.postAutosave && clearTimeout(cur.postAutosave), hide("submit_post_error"), cur.postSent = !0, setTimeout(function() {
                                        WComments.eventsPause(), ajax.post("al_wall.php", Wall.fixPostParams(n), {
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
                                                        "export": isChecked("wcomments_export")
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
                                                return cur.postSent = !1, e ? (ge("submit_post_error").innerHTML = e.length > 60 ? '<div class="msg_text">' + e + "</div>" : e, isVisible("submit_post_error") || slideDown("submit_post_error", 100), !0) : !0
                                            },
                                            showProgress: function() {
                                                lockButton(c)
                                            },
                                            hideProgress: function() {
                                                unlockButton(c)
                                            }
                                        })
                                    }, 0))
                                }
                            },
                            sendReply: function(e, t, a) {
                                if (a = extend({}, a), window.mvcur && mvcur.post == e) return Videoview.sendComment(e, t, a.stickerId);
                                var i, o = window.cur.wallLayer == e,
                                    s = o ? wkcur : window.cur,
                                    r = ge("reply_field" + e),
                                    n = r && data(r, "composer"),
                                    l = s.reply_to && Wall.getReplyName(s.reply_to[0]),
                                    d = r && data(r, "send");
                                if (d && isFunction(d)) return d(e, t, a);
                                if (a.stickerId) var c = {
                                    message: "",
                                    attach1_type: "sticker",
                                    attach1: a.stickerId,
                                    sticker_referrer: a.sticker_referrer
                                };
                                else {
                                    var c = n ? Composer.getSendParams(n, Wall.sendReply.pbind(e)) : {
                                        message: trim(Emoji.editableVal(r))
                                    };
                                    if (c.delayed) return;
                                    if (!c.attach1_type && (!c.message || isArray(l) && !l[1].indexOf(c.message))) return void Emoji.editableFocus(ge("reply_field" + e), !1, !0);
                                    n ? i = Composer.reset(n) : window.Emoji && Emoji.val(r, ""), r.autosize && r.autosize.update()
                                }
                                s.wallMyOpened = s.wallMyOpened || {}, s.wallMyReplied[e] = 1, s.wallMyOpened[e] = 1;
                                var p = ge("post_hash" + e) ? ge("post_hash" + e).value : s.options.post_hash,
                                    u = (ge("reply_as_group" + e), null);
                                if (extend(c, {
                                        act: "post",
                                        type: "widget",
                                        width: s.options.width,
                                        startWidth: s.options.startWidth,
                                        reply_to: e,
                                        reply_to_msg: val("reply_to" + e),
                                        reply_to_user: s.reply_to && s.reply_to[0] || 0,
                                        start_id: val("start_reply" + e),
                                        from: "widget",
                                        hash: p
                                    }), s.reverse && (c.rev = 1), browser.mobile ? Wall.hideEditReply(e) : (Emoji.editableFocus(r, !1, !0), Wall.cancelReplyTo(e, t)), ajax.post("al_wall.php", Wall.fixPostParams(c), {
                                        onDone: function(t, a, i, o) {
                                            return "full" == s.wallType ? FullWall.onReplySent.apply(window, arguments) : (s.wallMyReplied[e] = 0, re("reply_link" + e), hide("reply_warn" + e), void Wall._repliesLoaded(e, !1, a, i, o))
                                        },
                                        onFail: function() {
                                            u && re(u), n ? i = Composer.restore(n, i) : val(r, c.message), r.autosize && r.autosize.update()
                                        },
                                        showProgress: lockButton.pbind(ge("reply_button" + e)),
                                        hideProgress: unlockButton.pbind(ge("reply_button" + e))
                                    }), !c.from_oid && c.message) {
                                    var _ = ge("replies" + e),
                                        h = - ++s.wallMyRepliesCnt,
                                        m = Emoji.emojiToHTML(clean(c.message), !0),
                                        g = c.reply_to_user < 0 ? getLang("wall_replied_to_group") : s.options.reply_names[c.reply_to_user] && s.options.reply_names[c.reply_to_user][0],
                                        v = g ? rs(s.wallTpl.reply_link_to, {
                                            to_user: g
                                        }) : "";
                                    if (u = se(rs(s.wallTpl.reply_fast, {
                                            reply_id: "0_" + h,
                                            message: m.replace(/\n/g, "<br/>"),
                                            to_link: v,
                                            date: Wall.getNowRelTime(s)
                                        })), _ && !isVisible(_) || ge("reply_link" + e)) re("reply_link" + e), show("replies_wrap" + e);
                                    else if (!s.onepost) {
                                        var w = _.nextSibling;
                                        if (w && "replies_open" == w.className && Wall.openNewComments(e), !o) {
                                            var f = geByClass1("wr_header", _, "a"),
                                                b = geByClass("reply", _, "div").length + 1,
                                                y = b;
                                            f && (y = intval(f.getAttribute("offs").split("/")[1]) + 1), (y > 5 || y > b) && (f || _.insertBefore(f = ce("a", {
                                                className: "wr_header"
                                            }), _.firstChild), Wall.updateRepliesHeader(e, f, b, y))
                                        }
                                    }
                                    s.reverse ? _.insertBefore(u, _.firstChild) : _.appendChild(u)
                                }
                            },
                            deletePost: function(e, t, a, i, o) {
                                (cur.wallLayer ? wkcur : cur).wallMyDeleted[t] = 1;
                                var s = ge("post" + t),
                                    r = geByClass1("post_actions", s);
                                ajax.post("al_wall.php", {
                                    act: "delete",
                                    post: t,
                                    hash: a,
                                    root: i ? 1 : 0,
                                    confirm: o ? 1 : 0,
                                    from: "widget"
                                }, {
                                    onDone: function(e, o, r) {
                                        if (r) var n = showFastBox(e, r, getLang("global_delete"), function() {
                                            n.hide(), wall.deletePost(t, a, i, 1)
                                        }, getLang("box_cancel"));
                                        else {
                                            o && "posts" == cur.section && cur.Rpc && cur.Rpc.callMethod("publish", "widgets.comments.delete_comment", o.count, o.last_comment, o.date, o.full_hash, o.pageId);
                                            var l = geByClass1("_post_content", s) || geByClass1("feedback_row_t", s);
                                            revertLastInlineVideo(l);
                                            var d = ge("post_del" + t);
                                            d ? (d.innerHTML = '<span class="dld_inner">' + e + "</span>", show(d)) : s.appendChild(ce("div", {
                                                id: "post_del" + t,
                                                className: "dld",
                                                innerHTML: '<span class="dld_inner">' + e + "</span>"
                                            })), hide(l), "post_publish" == domNS(l).className && hide(domNS(l)), "full_own" == cur.wallType || "full_all" == cur.wallType ? (Pagination.recache(-1), FullWall.updateSummary(cur.pgCount)) : "full" == cur.wallType && hasClass(s, "reply") && (cur.pgOffset--, cur.pgCount--, FullWall.repliesSummary(cur.pgCount)), hasClass(s, "suggest") ? Wall.suggestUpdate(-1) : hasClass(s, "postponed") || ("own" == cur.wallType || "all" == cur.wallType) && (hasClass(s, "own") && ++cur.deletedCnts.own, hasClass(s, "all") && ++cur.deletedCnts.all, Wall.update()), WComments.contentUpdated()
                                        }
                                    },
                                    showProgress: function() {
                                        hasClass(e, "ui_actions_menu_item") ? lockActionsMenuItem(e) : hasClass(e, "flat_button") ? lockButton(e) : addClass(r, "post_actions_progress")
                                    },
                                    hideProgress: function() {
                                        hasClass(e, "ui_actions_menu_item") ? unlockActionsMenuItem(e) : hasClass(e, "flat_button") ? unlockButton(e) : removeClass(r, "post_actions_progress")
                                    }
                                });
                                var n = ge("delete_post" + t);
                                n && n.tt && n.tt.el && n.tt.destroy()
                            },
                            restorePost: function(e, t, a) {
                                return (cur.wallLayer ? wkcur : cur).wallMyDeleted[e] = 0, ajax.post("al_wall.php", {
                                    act: "restore",
                                    post: e,
                                    hash: t,
                                    root: a ? 1 : 0,
                                    from: "widget"
                                }, {
                                    onDone: function(t) {
                                        var a = ge("post_del" + e);
                                        if (a) {
                                            var i = ge("post" + e),
                                                o = geByClass1("_post_content", i) || geByClass1("feedback_row_t", i);
                                            show(o), "post_publish" == domNS(o).className && show(domNS(o)), hide(a), "full_own" == cur.wallType || "full_all" == cur.wallType ? (Pagination.recache(1), FullWall.updateSummary(cur.pgCount)) : "full" == cur.wallType && hasClass(i, "reply") && (cur.pgOffset++, cur.pgCount++, FullWall.repliesSummary(cur.pgCount)), hasClass(i, "suggest") ? Wall.suggestUpdate(1) : hasClass(i, "postponed") || ("own" == cur.wallType || "all" == cur.wallType) && (hasClass(i, "own") && --cur.deletedCnts.own, hasClass(i, "all") && --cur.deletedCnts.all, Wall.update()), WComments.contentUpdated()
                                        }
                                    }
                                }), !1
                            },
                            postClick: function(e, t, a) {
                                var i = (e || "").match(/^(-?\d+)_(wall)?(\d+)$/),
                                    o = ge("post" + e);
                                if (a && a.skipCheck) var s = !0;
                                else var s = Wall.checkPostClick(o, t);
                                if (s) {
                                    if (s !== !0) {
                                        var r = geByClass1("wall_post_more", s, "a");
                                        if (r && isVisible(r)) return r.onclick(), void(i || removeClass(o, "wall_post_over"))
                                    }
                                    i && (hasClass(ge("wcomments_posts"), "no_post_click") || window.open("wall" + i[1] + "_" + i[3], "_blank"))
                                }
                            },
                            _repliesLoaded: function(e, t, a, i) {
                                var o = ge("replies" + e);
                                if (o) {
                                    if (t) {
                                        browser.msie6 ? pageNode : browser.chrome || browser.safari ? bodyNode : htmlNode, o.offsetHeight;
                                        cur.options.fixed_height && cur.scrollbar ? cur.scrollbar.updateAbove(function() {
                                            o.innerHTML = a
                                        }) : o.innerHTML = a, setTimeout(Wall.scrollHighlightReply.pbind("post" + t), 0)
                                    } else o.innerHTML = a;
                                    var s = o.nextSibling;
                                    s && "replies_open" == s.className && re(s), extend(cur.options.reply_names || {}, i), Wall.updateMentionsIndex()
                                }
                            },
                            editPost: function(e) {
                                return function(t, a) {
                                    stManager.add(["audioplayer.css", "audioplayer.js"], Function.apply.bind(e, Wall, [].slice.call(arguments)))
                                }
                            }(Wall.editPost),
                            checkTextLen: function() {},
                            checkPostLen: function() {},
                            replySubmitTooltip: function() {},
                            repliesSideSetup: function() {},
                            repliesSideClick: function() {},
                            pollFull: function() {},
                            likesShow: function(e, t, a) {
                                a = a || {};
                                var i = wall.parsePostId(t),
                                    o = i.type,
                                    s = i.id,
                                    r = o + s,
                                    n = e && gpeByClass("_post_content", e) || wall.domPost(s),
                                    l = a.share ? "_share_wrap" : "_like_wrap",
                                    d = domByClass(n, l),
                                    c = domByClass(d, "_icon"),
                                    p = n && domByClass(n, "_share_wrap");
                                if (c && !cur.viewAsBox) {
                                    var u = 56,
                                        _ = getXY(d)[0],
                                        h = getXY(c)[0],
                                        m = getSize(c, !0)[0],
                                        g = h + m / 2 - _ - u;
                                    showTooltip(c.parentNode, {
                                        url: "/like.php",
                                        params: extend({
                                            act: "a_get_stats",
                                            object: r,
                                            has_share: p ? 1 : ""
                                        }, a.share ? {
                                            published: 1
                                        } : {}),
                                        slide: 15,
                                        shift: [-g, -3],
                                        ajaxdt: 100,
                                        showdt: 400,
                                        hidedt: 200,
                                        dir: "auto",
                                        checkLeft: !0,
                                        reverseOffset: 80,
                                        appendEl: ge("page_wrap"),
                                        tip: {
                                            over: function() {
                                                Wall.likesShow(e, t, a)
                                            }
                                        },
                                        typeClass: "like_tt wcomments_like_tt",
                                        className: a.cl || ""
                                    })
                                }
                            },
                            showReplies: function(e, t, a, i) {
                                return checkEvent(i || window.event) ? void 0 : cur.viewAsBox ? cur.viewAsBox() : (cur.wallMyOpened[e] = 3 != t, ajax.post("al_wall.php", {
                                    act: "get_replies",
                                    width: cur.options.width,
                                    startWidth: cur.options.startWidth,
                                    post: e,
                                    count: t,
                                    from: "widget"
                                }, {
                                    onDone: function() {
                                        var t = [].slice.call(arguments);
                                        t.unshift(e, a), Wall._repliesLoaded.apply(Wall, t), WComments.resizeWidget()
                                    },
                                    showProgress: lockButton.pbind("wrh" + e),
                                    hideProgress: unlockButton.pbind("wrh" + e)
                                }), !1)
                            }
                        }), each(["showEditReply", "markAsSpam", "stickerClick", "likeIt"], function(e, t) {
                            Wall[t] = function(e) {
                                return function() {
                                    return vk.id ? e.apply(Wall, [].slice.call(arguments)) : void Widgets.oauth()
                                }
                            }(Wall[t])
                        });
                        break;
                    case "ui_media_selector.js":
                        window.MediaSelector = function(e, t, a, i) {
                            function o(e, t, a) {
                                if (e = ge(e), !e) return !1;
                                a = a || {}, window.__addMediaIndex || (window.__addMediaIndex = 0);
                                var i = ++__addMediaIndex,
                                    o = '<div class="media_selector clear_fix"></div>';
                                e.innerHTML = o;
                                var s, r = domByClass(e, "media_selector"),
                                    n = (a.reverseMargin || 25, {
                                        id: i,
                                        menuNode: r,
                                        types: t,
                                        lastTypes: t,
                                        activate: function(e) {
                                            n.touched = e === !0, a.onActivate && a.onActivate()
                                        },
                                        show: function() {
                                            if (s && (clearTimeout(s), s = 0), n.moreWrap && !hasClass(n.moreWrap, "shown")) {
                                                a.forceToUp || replaceClass(n.moreWrap, "to_up", "to_down");
                                                var e = domByClass(n.moreWrap, "_more_items"),
                                                    t = getClientRectOffsetY(e);
                                                (t > 0 || a.forceToUp) && replaceClass(n.moreWrap, "to_down", "to_up"), setTimeout(addClass.pbind(n.moreWrap, "shown"), 0)
                                            }
                                        },
                                        hide: function(e) {
                                            function t(t) {
                                                return e.apply(this, arguments)
                                            }
                                            return t.toString = function() {
                                                return e.toString()
                                            }, t
                                        }(function(e) {
                                            if (!s) {
                                                var t = function() {
                                                    s = 0, n.moreWrap && removeClass(n.moreWrap, "shown")
                                                };
                                                if (e) {
                                                    var a = domByClass(n.moreWrap, "_more_items");
                                                    hide(a), t(), setTimeout(show.pbind(a), 0)
                                                } else s = setTimeout(t, 300)
                                            }
                                        }),
                                        setOptions: function(e) {
                                            extend(a, e)
                                        },
                                        setItems: function(e) {
                                            for (window.tooltips && tooltips.destroyAll(r); r.firstChild;) re(r.firstChild);
                                            var t = void 0 !== a.hideAfterCount ? a.hideAfterCount : 4,
                                                i = void 0 !== a.maxShown ? a.maxShown : 3,
                                                o = !1,
                                                s = a.hideItem,
                                                l = (s || e.length > t) && !browser.mobile,
                                                d = s && a.hideLabel || getLang("global_media_selector_more");
                                            n.moreWrap = !1, n.lastTypes = e, each(e, function(e, t) {
                                                var c, p = t[0],
                                                    u = t[1],
                                                    _ = t[2];
                                                if (l && (s ? p == s : e == i)) {
                                                    var h = r.appendChild(ce("div", {
                                                        className: "ms_items_more_wrap"
                                                    }));
                                                    addEvent(h, "mouseover click", function(e) {
                                                        "mouseover" == e.type && n.touched || n.show()
                                                    }), addEvent(h, "mouseout", function() {
                                                        n.hide()
                                                    }), c = h.appendChild(ce("a", {
                                                        className: "ms_item_more",
                                                        innerHTML: '<span class="ms_item_more_label">' + d + "</span>"
                                                    })), c.setAttribute("tabindex", 0);
                                                    var m = ce("div", {
                                                        className: "ms_items_more_helper"
                                                    });
                                                    o = ce("div", {
                                                        className: "ms_items_more _more_items"
                                                    }), m.appendChild(o), c = h.appendChild(m), n.moreWrap = h
                                                }
                                                c = (o ? o : r).appendChild(ce("a", {
                                                        innerHTML: o ? u : '<span class="blind_label">' + u + "</span>",
                                                        className: "ms_item ms_item_" + p + " _type_" + p
                                                    })), c.setAttribute("tabindex", 0),
                                                    o || (c.setAttribute("data-title", u), c.setAttribute("aria-label", u), c.setAttribute("role", "link"), addEvent(c, "mouseover", function() {
                                                        showTitle(this, !1, !1, {
                                                            noZIndex: !0
                                                        })
                                                    })), _ && addEvent(c, "click", function() {
                                                        return n.hide(!0), a.onItemClick && !a.onItemClick(p) ? !1 : (_(), !1)
                                                    })
                                            })
                                        }
                                    });
                                return t && n.setItems(t), browser.msie && (removeEvent(e, "MSPointerDown"), addEvent(e, "MSPointerDown", n.activate.pbind(!0))), removeEvent(e, "mouseover"), addEvent(e, "mouseover click", n.activate), a.global || cur.destroy.push(function() {
                                    removeEvent(e, "mouseover click", n.activate)
                                }), n
                            }
                            var s, r = [];
                            i = i || {};
                            i.mediaHandlers || {};
                            each(a || [], function(e, t) {
                                var a = t[0],
                                    o = t[1];
                                t[2];
                                if (o) {
                                    var n = !1,
                                        l = {
                                            to_id: cur.postTo,
                                            scrollbar_width: sbWidth()
                                        };
                                    switch (l.mail_add = i.mail ? 1 : "", a) {
                                        case "graffiti":
                                            n = showBox.pbind("al_wall.php", {
                                                to_id: cur.postTo,
                                                act: "canvas_draw_box",
                                                flash: browser.flash
                                            }, {
                                                cache: 1,
                                                dark: 1
                                            });
                                            break;
                                        case "photo":
                                            n = showBox.pbind("al_photos.php", {
                                                to_id: cur.postTo,
                                                act: "choose_photo",
                                                max_files: i.limit || 10
                                            }, {
                                                cache: 1,
                                                stat: ["photos.js", "photos.css", "upload.js"],
                                                dark: 1
                                            });
                                            break;
                                        case "video":
                                            n = showBox.pbind("al_video.php", {
                                                to_id: cur.postTo,
                                                act: "a_choose_video_box"
                                            }, {
                                                cache: 1,
                                                dark: 1
                                            });
                                            break;
                                        case "audio":
                                            n = function() {
                                                stManager.add(["audio.js", "indexer.js", "auto_list.js", "grid_sorter.js", "audio.css"], function() {
                                                    var e = !1;
                                                    each(s.chosenMedias || [], function() {
                                                        "audio_playlist" == this[0] && (e = !0)
                                                    }), cur.audioAttachSwitchOwnerId = !1;
                                                    var t = l.to_id || vk.id;
                                                    (window.cur && cur.options && cur.options.suggesting || window.cur && cur.options && cur.options.user_id) && (t = vk.id), void 0 === cur.groupAudioEnabled || cur.groupAudioEnabled ? l.to_id != vk.id && (cur.audioAttachSwitchOwnerId = l.to_id) : t = vk.id, AudioPage.showAttachBox(t, {
                                                        canPlaylistAttach: !e
                                                    })
                                                })
                                            };
                                            break;
                                        default:
                                            return
                                    }
                                    r.push([a, o, n])
                                }
                            });
                            var n = i.limit || 10,
                                l = n > 1,
                                d = i.editable && (!browser.msie || browser.version > 8),
                                c = i.sortable && (!browser.msie || browser.version > 8),
                                p = o(e, r, {
                                    onActivate: function() {
                                        cur.chooseMedia = s.chooseMedia, cur.showMediaProgress = s.showMediaProgress, cur.attachCount = s.attachCount, cur.lastAddMedia = s
                                    },
                                    onItemClick: function(e) {
                                        return l && s.attachCount() >= n && "postpone" !== e && "mark_as_ads" !== e ? (showBox("blank.php", {
                                            code: 1900,
                                            limit: n
                                        }), !1) : !0
                                    },
                                    hideAfterCount: i.hideAfterCount,
                                    topOffset: i.topOffset,
                                    forceUp: i.forceUp,
                                    global: i.global,
                                    maxShown: i.maxShown,
                                    forceToUp: i.forceToUp
                                });
                            if (p) {
                                t = t || "media_preview";
                                var u, _ = clean(p.id),
                                    h = ge(t);
                                if (l) {
                                    h.innerHTML = '<div id="page_pics_preview' + _ + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_dpics_preview' + _ + '" class="page_pics_preview post_thumbed_media page_media_sortable media_preview clear_fix"></div><div id="page_docs_preview' + _ + '" class="page_docs_preview post_thumbed_media page_media_sortable media_preview clear_fix"></div><div id="page_pdocs_preview' + _ + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_ldocs_preview' + _ + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_mpics_preview' + _ + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_ppdocs_preview' + _ + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_progress_preview' + _ + '" class="page_progress_preview media_preview clear_fix"></div>';
                                    var m = domFC(h),
                                        g = domNS(m),
                                        v = domNS(g),
                                        w = domNS(v),
                                        f = domNS(w),
                                        b = domNS(f),
                                        y = domNS(b),
                                        u = domNS(y);
                                    removeClass(h, "media_preview"), addClass(h, "multi_media_preview")
                                } else addClass(h, "med_no_attach"), show(h);
                                return s = {
                                    _addMediaLink: e,
                                    lnkId: _,
                                    menu: p,
                                    types: r,
                                    phLists: {},
                                    handlers: {},
                                    chosenMedias: [],
                                    _showAddMedia: function() {
                                        p.show()
                                    },
                                    _hideAddMedia: function(e) {
                                        p.hide(e)
                                    },
                                    chooseMedia: function(t, a, o, r, u, y) {
                                        if (s.onChange && s.onChange(t, a, o, r) === !1) return void 0 !== o.upload_ind && re("upload" + o.upload_ind + "_progress_wrap"), !1;
                                        if (inArray(t, i.disabledTypes || [])) return !1;
                                        if (s.attachCount() >= n && void 0 === o.upload_ind && "postpone" !== t && "mark_as_ads" !== t || geByClass1("medadd_c_market", v)) {
                                            if (l) return !1;
                                            s.unchooseMedia()
                                        }
                                        var C = !1,
                                            k = {};
                                        if (l && (each(s.chosenMedias, function() {
                                                return this[0] == t && this[1] == a ? (C = !0, !1) : void(k[this[0]] = k[this[0]] ? k[this[0]] + 1 : 1)
                                            }), C)) return !1;
                                        var x, S = "",
                                            P = "",
                                            M = "",
                                            N = !1,
                                            T = v,
                                            I = "";
                                        switch (t) {
                                            case "graffiti":
                                                isObject(o) || (o = {
                                                    thumb: o || ""
                                                }), S = '<div class="fl_l page_preview_graffiti"><img class="page_preview_graffiti" src="' + clean(o.thumb) + '" /></div>', T = N = b;
                                                break;
                                            case "photo":
                                                isObject(o) || (o = {
                                                    thumb_m: o[0] || "",
                                                    thumb_s: o[1] || "",
                                                    list: o[2] || "",
                                                    view_opts: o[3] || "",
                                                    upload_ind: o.upload_ind || void 0
                                                }), vkImage().src = o.thumb_m;
                                                var W = o.view_opts.replace(/^{|}$/g, "");
                                                if (W && (W += ","), W += "&quot;queue&quot;:1", W = "{" + W + "}", d) {
                                                    if (!o.editable) return !1;
                                                    i.nocl || fastXDM.getJSON(function(e) {
                                                        o.editable.click = showPhoto.pbind(a, o.list, e.parse(W.replace(/&quot;/g, '"')))
                                                    })
                                                }
                                                x = i.nocl ? "" : " onclick=\"return showPhoto('" + clean(a) + "', '" + o.list + "', {" + W.replace(/"/g, "&quot;") + '});"', S = "<div " + x + ' class="fl_l page_preview_photo' + (y ? " page_preview_ph_graff" : "") + '"><img class="page_preview_photo" src="' + clean(o.thumb_m) + '" /></div>', N = 1, T = m;
                                                break;
                                            case "video":
                                                if (isObject(o) || (o = {
                                                        thumb: o || ""
                                                    }), d) {
                                                    if (!o.editable) return !1;
                                                    i.nocl || (o.editable.click = showVideo.pbind(a, !1, {
                                                        queue: 1
                                                    }))
                                                }
                                                x = i.nocl ? "" : " onclick=\"return showVideo('" + clean(a) + "', false, {queue:1});\"", S = "<div" + x + ' class="fl_l page_preview_video"><img class="page_preview_video" src="' + clean(o.thumb) + '" /></div>', N = 1, T = m;
                                                break;
                                            case "audio":
                                                if (isArray(o)) o.forEach(function(e, t) {
                                                    isString(e) && (o[t] = clean(unclean(unclean(e))))
                                                });
                                                else {
                                                    if (!o.info) return !1;
                                                    var A = geByClass1("_audio_row_" + a);
                                                    A && (o = AudioUtils.getAudioFromEl(A))
                                                }
                                                S = Page.addAudioPreview(clean(a), o), I = ' id="pam' + clean(_) + "_audio" + clean(a) + '"';
                                                break;
                                            case "audio_playlist":
                                                if (k.audio_playlist || o.authorHref && !/^[\/\w._-]+$/.test(o.authorHref) || o.id && !/^[\d_-]+$/.test(o.id)) return !1;
                                                var L = o.coverUrl ? "background-image:url(" + clean(unclean(o.coverUrl)) + "); background-size: cover;" : "",
                                                    B = (o.id.split("_"), "");
                                                B = o.authorHref ? '<a href="' + clean(unclean(o.authorHref)) + '">' + clean(unclean(o.authorName)) + "</a>" : clean(unclean(o.authorName));
                                                var z = "'" + (clean(o.accessHash) || "") + "'",
                                                    E = parseInt(o.ownerId) + "_" + parseInt(o.id);
                                                P = '<div class="audio_pl_snippet_small audio_pl_snippet_no_list audio_pl_snippet _audio_pl _audio_pl_' + E + ' audio_pl_attach_preview clear_fix"><div class="audio_pl_attach_preview__play audio_pl_snippet_play_small" onclick="return getAudioPlayer().playPlaylist(' + parseInt(o.ownerId) + ", " + parseInt(o.id) + ", " + z + ')"></div><div class="audio_pl_snippet__cover" style="' + L + '"></div><div class="audio_pl_snippet__info_title audio_pl__title">' + clean(unclean(o.title)) + '</div><div class="audio_pl_snippet__info_author_line">' + B + "</div></div>", S = '<span class="medadd_h">' + getLang("audio_attach_title_playlist") + "</span>", T = f;
                                                break;
                                            case "share":
                                                if (k.share || k.page || !o.lang) return !1;
                                                isArray(o) && (o = {
                                                    domain: o[0],
                                                    url: o[1],
                                                    initialPattern: o[2],
                                                    title: o[3],
                                                    description: o[4],
                                                    images: [o[5]],
                                                    user_id: o[6],
                                                    photo_id: o[7]
                                                }), o.media = o.media || a, S = '<a target="_blank" href="/away.php?to=' + encodeURIComponent(o.url) + '" class="medadd_h medadd_h_link inl_bl">' + clean(o.lang.profile_choose_link) + "</a>", s.shareData = extend(s.shareData || {}, o, {
                                                    imagesStyles: [""]
                                                }), T = f;
                                                break;
                                            case "poll":
                                                if (!o.lang) return !1;
                                                S = '<div class="medadd_h medadd_h_poll inl_bl">' + clean(o.lang.q) + "</div>", hide(domByClass(p.menuNode, "_type_poll")), T = w;
                                                break;
                                            case "album":
                                                if (o.thumb.match(/^\/images\//) && (o.thumb = ""), d) {
                                                    if (!o.editable) return !1;
                                                    extend(o.editable, {
                                                        title: o.title,
                                                        size: o.count,
                                                        click: i.nocl ? !1 : nav.change.pbind({
                                                            z: "album" + a
                                                        })
                                                    })
                                                }
                                                var U = o.thumb;
                                                vkImage().src = U, x = i.nocl ? "" : ' href="/album' + clean(a) + '" onclick="return nav.change({z: \'album' + clean(a) + "'}, event)\"";
                                                var j = "fl_l page_album_link" + (U ? "" : " page_album_nocover");
                                                S = '<a class="' + j + '" ' + x + ">                    " + (U ? '<div class="page_album_thumb_wrap"><img class="page_album_thumb" src="' + clean(U) + '"/></div>' : "") + '                      <div class="page_album_title">                        <div class="page_album_size">' + clean(o.count) + '</div>                        <div class="page_album_title_text">' + clean(o.title) + "</div>                      </div>                    </a>", N = 1, T = m;
                                                break;
                                            default:
                                                return
                                        }
                                        if (l) {
                                            var R = s.chosenMedias,
                                                D = R.length,
                                                q = d && 1 === N ? !1 : "photos_list" == t ? se('<div class="page_preview_' + t + "_wrap" + M + '" style="position: relative">' + S + '<div class="page_photos_count">' + a.split(",").length + "</div></div>") : se('<div class="page_preview_' + t + "_wrap" + M + '"' + (i.nocl ? ' style="cursor: default"' : "") + I + ">" + S + '<div nosorthandle="1" class="page_media_x_wrap inl_bl" data-title="' + getLang("dont_attach") + '" onmouseover="showTitle(this)" onclick="cur.addMedia[' + s.lnkId + "].unchooseMedia(" + D + '); return cancelEvent(event);"><div class="page_media_x" nosorthandle="1"></div></div>' + P + "</div>");
                                            addClass(q, N ? "fl_l" : "clear_fix"), void 0 !== o.upload_ind && re("upload" + o.upload_ind + "_progress_wrap"), i.toggleLnk && toggle(e, s.attachCount() + 1 < n), d && 1 === N ? (addClass(T, "editable_thumbs_wrap"), T = domLC(T) && hasClass(domLC(T), "editable_thumbs") ? domLC(T) : T.appendChild(ce("div", {
                                                id: "thumbs_edit" + _,
                                                className: "editable_thumbs"
                                            })), stManager.add(["thumbs_edit.css", "thumbs_edit.js"], function() {
                                                i.toggleLnk && toggle(e, s.attachCount() + 1 < n), o.editable.remove = s.unchooseMedia.pbind(D), show(domPN(T));
                                                var r = ThumbsEdit.convert(t, a, o.editable, o.peEditable);
                                                domFC(T) ? ThumbsEdit.addMedia(T, r, o) : i.teWidth && i.teHeight ? ThumbsEdit.init(T, [r], {
                                                    width: i.teWidth,
                                                    height: i.teHeight,
                                                    force: !0,
                                                    onMove: i.onAddMediaChange,
                                                    onUpdate: i.onChangedSize
                                                }) : ThumbsEdit.init(T, [r], {
                                                    onMove: i.onAddMediaChange,
                                                    force: !0,
                                                    onUpdate: i.onChangedSize
                                                }), toggleClass(h, "media_preview_has_medias", s.hasVisibleRows()), i.onChangedSize && i.onChangedSize()
                                            }, !0)) : (show(T), T.appendChild(q), c && (T == v ? stManager.add(["sorter.js"], function() {
                                                var e = getXY(v),
                                                    t = getSize(v),
                                                    a = function() {
                                                        v.sorter ? sorter.added(v) : T.childNodes.length > 1 && sorter.init(v, {
                                                            onReorder: i.onAddMediaChange
                                                        })
                                                    };
                                                e[0] || e[1] || t[0] || t[1] ? a() : cur.sorterClbk = a, i.onChangedSize && i.onChangedSize()
                                            }, !0) : T == g && stManager.add(["qsorter.js"], function() {
                                                g.qsorter ? qsorter.added(g) : T.childNodes.length > 1 && qsorter.init(g, s.qsorterOpts()), i.onChangedSize && i.onChangedSize()
                                            }, !0)), i.onChangedSize && i.onChangedSize()), R.push([t, a, q, r])
                                        } else {
                                            var D = 0;
                                            "postpone" === t ? D = 1 : "mark_as_ads" === t && (D = 2);
                                            var q = se('<div class="' + (N === !1 ? "page_docs_preview" : "page_pics_preview") + (D ? "" : " post_thumbed_media") + '"><div class="page_preview_' + t + '_wrap"' + (i.nocl ? ' style="cursor: default"' : "") + I + ">" + S + '<div nosorthandle="1" class="page_media_x_wrap inl_bl" data-title="' + getLang("dont_attach") + '" onmouseover="showTitle(this)" onclick="cur.addMedia[' + s.lnkId + "].unchooseMedia(" + D + '); return cancelEvent(event);"><div class="page_media_x" nosorthandle="1"></div></div>' + P + "</div></div>");
                                            addClass(q, N ? "fl_l" : "clear_fix"), void 0 !== o.upload_ind && re("upload" + o.upload_ind + "_progress_wrap"), "postpone" !== t && "mark_as_ads" !== t && (s.chosenMedia = [t, a], s.chosenMediaData = o), s.singleAdded(q, t)
                                        }
                                        "share" == t ? o.title && !r ? (cur.shareShowImg = 0, s.showPreview(!0), s.shareData.images = !1) : s.showExternalPreview() : "page" == t ? o.nopreview || (cur.shareShowImg = 0, s.shareData = extend(s.shareData || {}, o, {
                                            images: !1
                                        }), s.showPreview()) : "poll" == t ? s.createPoll(o) : "postpone" == t ? s.setupPostpone(o, exp) : "mark_as_ads" == t && (s.markAsAds = 1), toggleClass(h, "media_preview_has_medias", s.hasVisibleRows()), i.onChangedSize && i.onChangedSize();
                                        var F = window.event;
                                        return F && "click" == F.type && (F.ctrlKey || F.metaKey || F.shiftKey) && (u = !0), cur.fileApiUploadStarted && void 0 !== o.upload_ind || cur.preventBoxHide || u === !0 || inArray(t, ["poll", "share", "page", "postpone", "mark_as_ads"]) || boxQueue.hideLast(), cur.lastPostMsg = !1, i.onMediaAdd && i.onMediaAdd(), cur.onMediaChanged && cur.onMediaChanged(), void 0 !== o.upload_ind && delete o.upload_ind, !1
                                    },
                                    unchooseMedia: function(t) {
                                        if (s.onChange && s.onChange(!1, t) === !1) return !1;
                                        if (l) {
                                            if (void 0 === t) return window.ThumbsEdit && ThumbsEdit.removeAll("thumbs_edit" + _), each(s.chosenMedias, function(e, t) {
                                                t && void 0 !== e && s.unchooseMedia(e)
                                            }), void(s.urlsCancelled = []);
                                            var a, o = s.chosenMedias;
                                            if (o[t]) {
                                                switch (o[t][2] ? ((a = geByClass1("page_media_x_wrap", o[t][2], "div")) && a.tt && a.tt.el && a.tt.destroy(), domPN(o[t][2]) == v && v.sorter ? (each(v.sorter.elems, function() {
                                                    setStyle(this, {
                                                        top: "auto",
                                                        left: "auto",
                                                        cursor: "auto"
                                                    })
                                                }), v.sorter.destroy(), re(o[t][2]), v.childNodes.length > 1 && sorter.init(v, {
                                                    onReorder: i.onAddMediaChange
                                                })) : domPN(o[t][2]) == g && g.qsorter ? (each(g.qsorter.elems, function() {
                                                    setStyle(domFC(this), {
                                                        top: "auto",
                                                        left: "auto"
                                                    }), setStyle(this, {
                                                        cursor: "auto"
                                                    })
                                                }), g.qsorter.destroy(), re(o[t][2]), g.childNodes.length > 1 && qsorter.init(g, s.qsorterOpts())) : re(o[t][2])) : ("photo" == o[t][0] || "video" == o[t][0] || "album" == o[t][0]) && window.ThumbsEdit && ThumbsEdit.removeById("thumbs_edit" + _, o[t][0] + o[t][1]), o[t][0]) {
                                                    case "page":
                                                    case "share":
                                                        s.shareData = {}, re(s.sharePreview), hide("medadd_c_linkimg_loader"), clearTimeout(cur.showLoaderTimeout), clearInterval(cur.shareImgInterval), clearTimeout(cur.shareImgInterval2), clearTimeout(cur.imgLoadTimeout), delete s.sharePreview;
                                                        break;
                                                    case "poll":
                                                        re(s.pollPreview), s.pollPreview = !1, show(domByClass(p.menuNode, "_type_poll"));
                                                        break;
                                                    case "map":
                                                        show(domByClass(p.menuNode, "_type_map"));
                                                        break;
                                                    case "market":
                                                        show(e);
                                                        break;
                                                    case "postpone":
                                                        var r = geByClass1("medadd_c_timersett", s.postponePreview);
                                                        cur.editingPost && r ? re(domFC(s.postponePreview)) : re(s.postponePreview), s.postponePreview = !1, removeClass("official", "disabled"), cur.editingPost ? ge("wpe_save").innerHTML = getLang("wall_publish_now") : ge("send_post").innerHTML = getLang("wall_send"), show(domByClass(p.menuNode, "_type_postpone"));
                                                        break;
                                                    case "mark_as_ads":
                                                        show(domByClass(p.menuNode, "_type_mark_as_ads"))
                                                }
                                                o[t] = !1
                                            }
                                            i.toggleLnk && toggle(e, s.attachCount() < n), toggle(m, !!(d ? geByClass1("thumb_wrap", m) : domFC(m))), toggle(g, !!domFC(g)), toggle(v, !!domFC(v)), toggle(w, !!domFC(w)), toggle(f, !!domFC(f)), toggle(b, !!domFC(b)), toggle(y, !!domFC(y)), toggle(u, !!domFC(u))
                                        } else {
                                            var c, a;
                                            if (void 0 == t && (t = 0), (a = geByClass("page_media_x_wrap", h, "div")[t]) && a.tt && a.tt.el && a.tt.destroy(), 1 == t && s.postponePreview) {
                                                show(geByClass1("add_media_type_" + _ + "_postpone", p.menuNode, "a"));
                                                var C = domPN(s.postponePreview);
                                                window.tooltips && tooltips.destroyAll(C), re(C), s.postponePreview = !1;
                                                var k = p.lastTypes;
                                                each(p.types, function(e, t) {
                                                    "postpone" === t[0] && k.push(t)
                                                }), p.setItems(k)
                                            } else if (2 == t && s.markAsAds) {
                                                s.markAsAds = !1;
                                                var x = geByClass1("page_preview_mark_as_ads_wrap", h);
                                                window.tooltips && x && tooltips.destroyAll(x), re(x);
                                                var k = p.lastTypes;
                                                each(p.types, function(e, t) {
                                                    "mark_as_ads" === t[0] && k.push(t)
                                                }), p.setItems(k)
                                            } else {
                                                if (s.postponePreview || s.markAsAds) {
                                                    for (var C = s.postponePreview && domPN(s.postponePreview), x = s.markAsAds && domPN(geByClass1("page_preview_mark_as_ads_wrap", h)), S = [], P = 0; P < h.childNodes.length; P++) {
                                                        var M = h.childNodes[P];
                                                        "DIV" == M.nodeName && M != C && M != x && S.push(M)
                                                    }
                                                    each(S, function(e, t) {
                                                        re(t)
                                                    });
                                                    var k = [];
                                                    each(p.types, function(e, t) {
                                                        "postpone" === t[0] && s.postponePreview || "mark_as_ads" === t[0] && s.markAsAds || k.push(t)
                                                    }), p.setItems(k)
                                                } else val(h, ""), addClass(h, "med_no_attach"), p.setItems(p.types);
                                                s.chosenMedia && (s.chosenMedia = !1, s.chosenMediaData = !1), (c = s.shareData) && (c.url && s.urlsCancelled.push(c.url), c.initialPattern && s.urlsCancelled.push(c.initialPattern), s.shareData = {}), each([s.sharePreview, s.pollPreview], function() {
                                                    re(this)
                                                }), s.sharePreview = s.pollPreview = !1
                                            }
                                            i.toggleLnk && show(e)
                                        }
                                        toggleClass(h, "media_preview_has_medias", s.hasVisibleRows()), cur.onMediaChanged && cur.onMediaChanged(), cur.lastPostMsg = !1, s.onChange && s.onChange(!1)
                                    },
                                    singleAdded: function(t, a) {
                                        "postpone" === a ? h.appendChild(t) : "mark_as_ads" === a ? s.postponePreview ? h.insertBefore(t, domLC(h)) : h.appendChild(t) : domFC(h) ? h.insertBefore(t, domFC(h)) : h.appendChild(t), removeClass(h, "med_no_attach");
                                        var o = [];
                                        each(p.lastTypes, function(e, t) {
                                            ("postpone" !== t[0] || !s.postponePreview && "postpone" !== a) && ("mark_as_ads" !== t[0] || !s.markAsAds && "mark_as_ads" !== a) && (inArray(a, ["postpone", "mark_as_ads"]) || inArray(t[0], ["postpone", "mark_as_ads"])) && o.push(t)
                                        }), p.setItems(o), i.toggleLnk && !o.length && hide(e)
                                    },
                                    getMedias: function() {
                                        if (l) {
                                            var e = window.ThumbsEdit ? ThumbsEdit.getMedias("thumbs_edit" + _) : [],
                                                t = {},
                                                a = s.chosenMedias || [],
                                                i = [],
                                                o = function(e, a, o) {
                                                    return o[0] + o[1] == e ? (i.push(o), t[e] = !0, !1) : void 0
                                                };
                                            return each(e, function(e, t) {
                                                each(a, o.pbind(t[0] + t[1]))
                                            }), each(g.childNodes, function(e, t) {
                                                var i = (t.id || "").match(/^pam\d+_([a-z]+)(-?\d+_\d+)/);
                                                i && each(a, o.pbind(i[1] + i[2]))
                                            }), each(v.childNodes, function(e, t) {
                                                var i = (t.id || "").match(/^pam\d+_([a-z]+)(-?\d+_\d+)/);
                                                i && each(a, o.pbind(i[1] + i[2]))
                                            }), each(a, function(e, a) {
                                                a && isArray(a) && a.length && !t[a[0] + a[1]] && i.push(a)
                                            }), i
                                        }
                                        var a = s.chosenMedia;
                                        return a ? [a[0] + a[1]] : []
                                    },
                                    showMediaProgress: function(t, a, o) {
                                        if (s.onProgress && s.onProgress(t, a, o) === !1) return !1;
                                        var r = o.loaded / o.total,
                                            d = intval(100 * r),
                                            c = (o.fileName || o.name || "").replace(/[&<>"']/g, ""),
                                            p = c ? a + "_" + c : a,
                                            h = c ? c.length > 33 ? c.substr(0, 30) + "..." : c : "",
                                            m = ge("upload" + p + "_progress");
                                        if (m) {
                                            show(m);
                                            var g = geByClass1("ui_progress_bar", m);
                                            setStyle(g, {
                                                width: d + "%"
                                            })
                                        } else {
                                            cur.attachMediaIndexes || (cur.attachMediaIndexes = {}), cur.attachMediaIndexes[p] = _;
                                            var v = h ? '<div class="attach_label fl_l">' + h + "</div>" : "",
                                                w = '                  <div class="fl_l">                     <div class="page_attach_progress_wrap" style="margin-top: 3px; margin-bottom: 4px;">                       <div id="upload' + p + '_progress" class="page_attach_progress ui_progress">                         <div class="ui_progress_back"></div>                         <div class="ui_progress_bar"></div>                       </div>                     </div>                   </div>' + v + '<div class="progress_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang("dont_attach") + '\', shift: [6, 3, 3]})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + a + ", '" + (c || a) + "', this);\"></div>";
                                            if (l) u.appendChild(ce("div", {
                                                id: "upload" + p + "_progress_wrap",
                                                innerHTML: w,
                                                className: "clear_fix upload_" + a + "_progress"
                                            }, {
                                                marginTop: "6px"
                                            })), show(u), i.toggleLnk && toggle(e, s.attachCount() < n);
                                            else {
                                                var f = ce("div", {
                                                    id: "upload" + p + "_progress_wrap",
                                                    innerHTML: w,
                                                    className: "clear_fix upload_" + a + "_progress"
                                                });
                                                s.chosenMedia = "progress", s.singleAdded(f, "progress")
                                            }
                                            i.onChangedSize && i.onChangedSize(), m = ge("upload" + p + "_progress");
                                            var g = geByClass1("ui_progress_bar", m);
                                            d ? setStyle(g, {
                                                width: d + "%"
                                            }) : (setStyle(g, {
                                                width: "1px"
                                            }), hide(m))
                                        }
                                    },
                                    hasVisibleRows: function() {
                                        var e = !1;
                                        return each(geByClass("media_preview", h), function() {
                                            return isVisible(this) ? (e = !0, !1) : void 0
                                        }), e
                                    },
                                    attachCount: function() {
                                        if (s.attachedCount) return s.attachedCount();
                                        if (!h) return 0;
                                        if (!l) return h.childNodes.length - (s.postponePreview ? 1 : 0) - (s.markAsAds ? 1 : 0);
                                        var e = (d && window.ThumbsEdit ? (ThumbsEdit.cache()["thumbs_edit" + _] || {}).previews || [] : m.childNodes).length + g.childNodes.length + b.childNodes.length + v.childNodes.length / (v.sorter ? 2 : 1) + u.childNodes.length;
                                        return s.sharePreview && ++e, s.pollPreview && ++e, e
                                    },
                                    createPoll: function(e) {
                                        var t, a = e.question ? "" : "1px",
                                            i = [];
                                        e[22] ? "disabled" : "", e[8] ? "" : "disabled";
                                        s.pollPreview = w.appendChild(ce("div", {
                                            className: "medadd_c medadd_c_poll",
                                            innerHTML: '                <input onkeydown="cur.addMedia[' + _ + '].keyPoll(this, event)" class="text dark medadd_c_pollq" id="create_poll_question' + _ + '" value="' + (e.question || "") + '" />                <div class="medadd_c_pollh">' + e.lang.a + '</div>                <div class="medadd_c_pollans" id="create_poll_answers' + _ + '"></div>                <div class="medadd_c_polladd_wr" id="create_poll_add' + _ + '">                  <div class="medadd_c_polladd fakeinput dark" onclick="cur.addMedia[' + _ + '].incPoll()">' + e.lang.i + "</div>                </div>" + (e.edit ? "" : '<div class="checkbox medadd_c_pollcb' + (e.anon ? " on" : "") + '" id="create_poll_anonymous' + _ + '" onclick="checkbox(this);cur.addMedia[' + _ + '].changedPoll();">' + e.lang.c + "</div>") + (e.pollSettings || "")
                                        })), e.answers || (e.answers = [
                                            [0, ""],
                                            [0, ""]
                                        ]), cur.pollAnswerTemplate = '<input onkeydown="cur.addMedia[%lnkid%].keyPoll(this, event)" class="text dark medadd_c_polla" %attrs%/><div class="page_media_x_wrap medadd_c_pollrem" data-title="' + clean(stripHTML(unclean(e.lang.d))) + '" onmouseover="showTitle(this)" onclick="cur.addMedia[%lnkid%].decPoll(this)"><div class="page_media_x"></div></div>';
                                        for (var o = 0, r = e.answers.length; r > o; ++o) t = e.answers[o], i.push('<div class="medadd_c_polla_wr">' + rs(cur.pollAnswerTemplate, {
                                            attrs: (t[0] ? 'id="create_poll_ans' + t[0] + '" ' : "") + (t[1] ? '" value="' + t[1] + '" ' : ""),
                                            lnkid: _
                                        }) + "</div>"), 9 == o && hide("create_poll_add" + _);
                                        return val("create_poll_answers" + _, i.join("")), e.question ? void elfocus("create_poll_question" + _) : (s.pollPreview.style.height = a, void animate(s.pollPreview, {
                                            height: 166
                                        }, 200, function() {
                                            s.pollPreview.style.height = "auto", elfocus("create_poll_question" + _)
                                        }))
                                    },
                                    incPoll: function() {
                                        var e = ge("create_poll_answers" + _),
                                            t = e.childNodes.length,
                                            a = i.pollLimit || 10;
                                        a > t && elfocus(geByTag1("input", e.appendChild(ce("div", {
                                            className: "medadd_c_polla_wr",
                                            innerHTML: rs(cur.pollAnswerTemplate, {
                                                attrs: "",
                                                lnkid: _
                                            })
                                        })))), toggle("create_poll_add" + _, a - 1 > t)
                                    },
                                    decPoll: function(e) {
                                        e.tt && e.tt.el && e.tt.destroy(), re(domPN(e)), show("create_poll_add" + _)
                                    },
                                    keyPoll: function(e, t) {
                                        if (t = t || window.event, t && (10 == t.keyCode || 13 == t.keyCode || 9 == t.keyCode)) {
                                            var a = hasClass(e, "medadd_c_pollq"),
                                                i = t.shiftKey;
                                            if (i && a) return;
                                            var o = a ? domFC(domNS(domNS(e))) : (i ? domPS : domNS)(domPN(e));
                                            return o ? elfocus(geByTag1("input", o)) : i ? elfocus(geByClass1("medadd_c_pollq", domPN(domPN(domPN(e))))) : this.incPoll(), cancelEvent(t)
                                        }
                                        s.changedPoll()
                                    },
                                    changedPoll: function() {
                                        i.onMediaChange && i.onMediaChange()
                                    },
                                    pollData: function(e) {
                                        for (var t, a = ge("create_poll_answers" + _), i = trim(val("create_poll_question" + _)), o = {
                                                media: i,
                                                anonymous: isChecked("create_poll_anonymous" + _)
                                            }, s = 0, r = !1, n = domFC(a); n; n = domNS(n))
                                            if (t = trim(val(domFC(n)))) {
                                                var l = -intval((domFC(n).id.match(/^create_poll_ans(\d+)$/) || [0, -s++])[1]);
                                                o["answers[" + l + "]"] = t, r = !0
                                            }
                                        return i ? r ? o : (domFC(a) || cur.addMedia[_].incPoll(), e !== !0 && notaBene(domFC(domFC(a))), !1) : (e !== !0 && notaBene("create_poll_question" + _), !1)
                                    },
                                    urlsCancelled: [],
                                    shareData: {},
                                    checkMessageURLs: function(e, t, a) {
                                        if (!(cur.noCheckMessageURLs || s.chosenMedia || s.urlAttachmentLoading && s.urlAttachmentLoading[0] > vkNow() - 1e4 || s.attachCount() >= n)) {
                                            if (cur.reply_to && cur.reply_to[0]) {
                                                var i = Wall.getReplyName(cur.reply_to[0]);
                                                if (i && isArray(i) && i[1] && (i = i[1]), i) {
                                                    var o = extractUrls(i, t);
                                                    for (var r in o) {
                                                        var l = o[r].url;
                                                        l.match(/^https?:\/\//) || (l = "http://" + l), inArray(l, s.urlsCancelled) || s.urlsCancelled.push(l)
                                                    }
                                                }
                                            }
                                            var d = extractUrls(e, t);
                                            for (var r in d) {
                                                var c = d[r],
                                                    l = c.url,
                                                    p = c.query,
                                                    u = c.domain,
                                                    _ = l;
                                                if (l.match(/^https?:\/\//) || (l = "http://" + l), !inArray(l, s.urlsCancelled) && !inArray(_, s.urlsCancelled)) {
                                                    var h = !0;
                                                    if (u.match(/(^|\.|\/\/)(vkontakte\.ru|vk\.com)/) && (h = p.match(/(#photo|^\/(photo|video|album|page|audio|doc)|z=(album|photo|video|audio_playlist)|w=(page|product))(-?\d+_)?\d+|\.(jpg|png|gif)$|market-?\d+\?section=album_\d+|^\/stickers\/.+$|^\/blog\/.+$|^http:\/\/instagram\.com\/p\/.+/) ? !0 : !1), h) return void s.checkURL(_, a)
                                                }
                                            }
                                        }
                                    },
                                    clearCheckURL: function() {
                                        clearTimeout(cur.checkURLTO), re(s.urlAttachmentLoading[2]), l ? toggle(u, u.childNodes > 0) : toggleClass(h, "med_no_attach", !h.childNodes), s.urlAttachmentLoading = !1, setStyle(bodyNode, {
                                            cursor: "default"
                                        })
                                    },
                                    onCheckURLDone: function(e, t) {
                                        var a = "";
                                        s.urlAttachmentLoading && (a = s.urlAttachmentLoading[1], s.clearCheckURL()), e ? s.chooseMedia(t[0], t[1], t[2], a, !0) : i.onCheckURLDone && i.onCheckURLDone(e, t)
                                    },
                                    checkURL: function(e, t) {
                                        if (e) {
                                            s.urlsCancelled.push(e), s.urlAttachmentLoading = [vkNow(), e], re(s.checkURLForm), s.checkURLForm = ce("div", {
                                                innerHTML: '<iframe name="share_parse_iframe' + _ + '"></iframe>'
                                            }), utilsNode.appendChild(s.checkURLForm);
                                            var a = s.checkURLForm.appendChild(ce("form", {
                                                action: "share.php?act=url_attachment",
                                                method: "post",
                                                target: "share_parse_iframe" + _
                                            }));
                                            each({
                                                hash: cur.share_timehash || cur.options.share.timehash || "",
                                                index: _,
                                                url: e,
                                                to_mail: i.mail ? 1 : ""
                                            }, function(e, t) {
                                                a.appendChild(ce("input", {
                                                    type: "hidden",
                                                    name: e,
                                                    value: t
                                                }))
                                            }), setStyle(bodyNode, {
                                                cursor: "wait"
                                            }), window.onUploadDone = s.onCheckURLDone.pbind(!0), window.onUploadFail = s.onCheckURLDone.pbind(!1), t && (cur.checkURLTO = setTimeout(function() {
                                                s.urlAttachmentLoading.length > 0 && s.clearCheckURL()
                                            }, t)), a.submit()
                                        }
                                    },
                                    addPreview: function(e) {
                                        return s.sharePreview = f.appendChild(ce("div", {
                                            className: "medadd_c medadd_c_link",
                                            innerHTML: '<div class="medadd_c_linkcon"><div></div>' + (e ? '<div class="progress medadd_c_linkprg"></div>' : "") + "</div>"
                                        }))
                                    },
                                    shareImgUrl: function(e) {
                                        var t = s.shareData;
                                        if (isArray(t.preview_images) && t.preview_images[e]) return t.preview_images[e];
                                        if (t.images_proxy && t.images_proxy[e]) return t.images_proxy_url + t.images_proxy[e];
                                        if (t.images) {
                                            var a = t.images[e];
                                            return isArray(a) && (a = a[0] ? a[0] : ""), a
                                        }
                                        return ""
                                    },
                                    showPreview: function(e) {
                                        var a, o, r = s.shareData,
                                            n = s.sharePreview || s.addPreview();
                                        if (r.images && (a = r.images[cur.shareShowImg], o = s.bigLink || r.big_link || a && isArray(a) && a[0] ? "medadd_c_linkimg_big" : ""), r.failed) var l = getLang("page_not_loaded");
                                        else {
                                            var d = e ? "" : 'onload="if (this.width < 130 && !cur.onLoadSwitched) {cur.onLoadSwitched=1;setTimeout(cur.shareShowNext, 0);}"',
                                                c = "",
                                                p = clean(s.shareImgUrl(cur.shareShowImg));
                                            if (r.images && r.images[cur.shareShowImg] && p) {
                                                var u = r.images[cur.shareShowImg],
                                                    _ = o ? 'style="width: 100%"' : r.imagesStyles && r.imagesStyles[cur.shareShowImg] || "";
                                                if (c = '<img class="medadd_c_linkimg" src="' + p + '" ' + d + " " + _ + " />", c += o ? Page.buildMediaLinkEl(r.domain) : "", r.images.length > 0) {
                                                    var h = (r.images.length > 1 ? '<div class="medadd_c_linkimg_scroll_wrap medadd_c_linkimg_scroll_wrap_left ' + (0 == cur.shareShowImg ? "medadd_c_linkimg_scroll_wrap_left_first" : "") + '" onclick="' + (0 == cur.shareShowImg ? "Page.ownerPhoto('" + r.media + "');" : "cur.shareShowNext(true);") + '"><div class="medadd_c_linkimg_scroll"></div></div>' : "", ""),
                                                        m = "";
                                                    cur.shareShowImg < r.images.length - 1 ? h = '<div class="medadd_c_linkimg_scroll_wrap medadd_c_linkimg_scroll_wrap_right" onclick="cur.shareShowNext();"><div class="medadd_c_linkimg_scroll"></div></div>' : cur.shareShowImg == r.images.length - 1 && isArray(u) && u[0] && (h = "");
                                                    var g = isArray(r.images[r.images.length - 1]) && !!r.images[r.images.length - 1][0],
                                                        v = r.uniqueImagesCount + intval(g),
                                                        w = "onmouseover=\"showTooltip(this, {text: '" + getLang("global_link_choose_own_photo") + "', black: 1, shift: [7, 11, 8], appendParentCls: 'post'})\"",
                                                        b = "onmouseover=\"showTooltip(this, {text: '" + getLang("global_link_remove_photo") + "', black: 1, shift: [7, 11, 8], appendParentCls: 'post'})\"",
                                                        y = r.media && "_" != r.media ? '<div class="medadd_c_linkimg_controls">  <div class="medadd_c_linkimg_controls_btn_group clear_fix fl_l">' + (v > 1 ? '    <div class="medadd_c_linkimg_controls_btn_arrows_group">      <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_left" onclick="cur.shareShowNext(true);"></div>      <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_right" onclick="cur.shareShowNext();"></div>    </div>' : "") + '    <div class="medadd_c_linkimg_controls_btn ' + (v > 1 ? "medadd_c_btn_side_padd" : "") + '" id="medadd_ctrl_upload" ' + w + " onclick=\"Page.ownerPhoto('" + r.media + '\');"></div>  </div>  <div class="medadd_c_linkimg_controls_btn_group clear_fix fl_r">    <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_remove" ' + b + ' onclick="tooltips.hide(this);cur.removeLinkImage(this)"></div>  </div></div>' : "",
                                                        C = a ? "" : "display: none";
                                                    c = '<div class="medadd_c_linkimg_container fl_l" style="' + C + '">' + c + y + m + '<div id="medadd_c_linkimg_loader" class="medadd_c_linkimg_loader"></div></div>'
                                                }
                                            }
                                            var k = "";
                                            r.microdata && r.microdata_preview_html && (k = r.microdata_preview_html);
                                            var x = r.description_short || r.description,
                                                l = c + (r.title ? '<h4 class="medadd_c_linkhead">' + r.title + "</h4>" : "") + (!o && r.domain ? '<div class="page_media_link_url">' + r.domain + "</div>" : "") + (k ? '<div class="medadd_c_linkmicrodata">' + k + "</div>" : "") + (x ? '<div class="medadd_c_linkdsc">' + x + "</div>" : "") + '<div class="clear"></div>'
                                        }
                                        if (e) cur.preventShareAnim && (cur.preventShareAnim.stop(), clearInterval(cur.animateUpdateInterval)), val(domFC(n), l), domFC(n).style.height = "auto", shortCurrency();
                                        else {
                                            !isVisible(f);
                                            show(f);
                                            var S = ge(t).appendChild(ce("div", {
                                                    innerHTML: '<div class="medadd_c_linkcon ' + o + '">' + l + "</div>"
                                                }, {
                                                    position: "absolute",
                                                    width: getSize(n)[0] - 10,
                                                    visibility: "hidden"
                                                })),
                                                P = getSize(S)[1];
                                            re(S), val(domFC(n), l), shortCurrency(), cur.animateUpdateInterval = setInterval(function() {
                                                i.onChangedSize && i.onChangedSize()
                                            }, 100), cur.preventShareAnim = animate(domFC(n), {
                                                height: P
                                            }, 200, function() {
                                                clearInterval(cur.animateUpdateInterval)
                                            }), re(geByClass1("medadd_c_linkprg", f))
                                        }
                                        o && addClass(geByClass1("medadd_c_linkcon", f), o)
                                    },
                                    showExternalPreview: function() {
                                        var e = s.shareData;
                                        e.images || (e.images = []);
                                        var t = [],
                                            a = [],
                                            o = {};
                                        if (each(e.images, function(i, s) {
                                                o[s] || (o[s] = !0, t.push(s), e.images_proxy && a.push(e.images_proxy[i]))
                                            }), e.uniqueImagesCount = t.length, e.images = t, e.images_proxy = a, e.images.push([]), !e.images || !e.images.length) return cur.shareShowImg = 0, void s.showPreview();
                                        cur.shareShowImg = -1, s.addPreview(!0), e.imagesStyles = {};
                                        var r = !1;
                                        cur.shareSetOwnPhoto = function(t) {
                                            curBox() && curBox().hide(), s.bigLink = !0, e.images[e.images.length - 1] = [t.photo_url, t.user_id, t.photo_id], cur.shareShowNext(0, 1)
                                        }, cur.shareClearOwnPhoto = function() {
                                            e.images[e.images.length - 1] = [], cur.shareShowNext(0, 0, 1)
                                        }, cur.removeLinkImage = function(e) {
                                            var t = gpeByClass("medadd_c_linkcon", e);
                                            re(gpeByClass("medadd_c_linkimg_container", e)), setStyle(t, "height", ""), s.shareData.noPhoto = !0
                                        }, cur.shareShowNext = function(t, a, o) {
                                            var n = vkImage();
                                            cur.prevShareShowDir = t, o || (a ? cur.shareShowImg = e.images.length - 1 : t ? cur.shareShowImg -= 1 : cur.shareShowImg += 1);
                                            var l = isArray(e.images[e.images.length - 1]) && !!e.images[e.images.length - 1][0];
                                            if (!l && cur.shareShowImg > e.images.length - 2) cur.shareShowImg = 0;
                                            else if (cur.shareShowImg > e.images.length - 1) cur.shareShowImg = 0;
                                            else if (!l && cur.shareShowImg < 0) cur.shareShowImg = e.images.length - 2;
                                            else if (cur.shareShowImg < 0) cur.shareShowImg = e.images.length - 1;
                                            else if (0 == cur.shareShowImg)
                                                for (var d = 1; d < e.images.length - 1; d++) {
                                                    var c = vkImage();
                                                    c.src = s.shareImgUrl(d)
                                                }
                                            if (!e.images.length || isEmpty(e.images) || void 0 === e.images[cur.shareShowImg]) return s.showPreview(r), void(r = !0);
                                            var p = s.shareImgUrl(cur.shareShowImg);
                                            p && (n.src = p), isArray(e.images[cur.shareShowImg]) && e.images[cur.shareShowImg][1] && e.images[cur.shareShowImg][2] ? (e.user_id = e.images[cur.shareShowImg][1], e.photo_id = e.images[cur.shareShowImg][2], e.share_own_image = !0) : (e.user_id = void 0, e.photo_id = void 0, e.share_own_image = !1);
                                            var u = null;
                                            p && (cur.imgLoadTimeout = u = setTimeout(function() {
                                                cur.shareImgInterval !== !0 && (isArray(e.images[cur.shareShowImg]) || (e.images.splice(cur.shareShowImg, 1), e.images_proxy && e.images_proxy.length > cur.shareShowImg && e.images_proxy.splice(cur.shareShowImg, 1), cur.shareShowNext()))
                                            }, 5e3));
                                            var _ = setTimeout(function() {
                                                show("medadd_c_linkimg_loader"), _ = null, i.onChangedSize && i.onChangedSize()
                                            }, 100);
                                            cur.showLoaderTimeout = _;
                                            var h = function() {
                                                if (n.width || n.height || !p) {
                                                    var t = n.width,
                                                        a = n.height,
                                                        i = "",
                                                        o = "";
                                                    if (u && (clearTimeout(u), u = null), _ && (clearTimeout(_), _ = null), hide("medadd_c_linkimg_loader"), clearInterval(cur.shareImgInterval), !isArray(e.images[cur.shareShowImg]) && (20 > t || 20 > a)) {
                                                        if (e.images.splice(cur.shareShowImg, 1), e.images_proxy && e.images_proxy.length > cur.shareShowImg && e.images_proxy.splice(cur.shareShowImg, 1), e.images.length) return setTimeout(cur.shareShowNext.pbind(0, 0, 1), 0)
                                                    } else {
                                                        var l = t >= 537 && a >= 240 && void 0 === e.big_link;
                                                        if (!l && s.bigLink && cur.shareShowImg != e.images.length - 1) return e.images.splice(cur.shareShowImg, 1), e.images_proxy.splice(cur.shareShowImg, 1), cur.prevShareShowDir || cur.shareShowImg--, void cur.shareShowNext(cur.prevShareShowDir);
                                                        s.bigLink = s.bigLink || l, t > 150 && (a = 150 * a / t, t = 150);
                                                        var d = Math.round(a / 2),
                                                            c = Math.round(t / 2);
                                                        l && a > 150 ? -Math.round(33.5) : -d, t > 150 ? -Math.round(75) : -c;
                                                        i = "width: " + t + "px; height: " + a + "px;", l && (i = "width: 100%;")
                                                    }
                                                    e.images.length > 1 && (o = ""), e.imagesStyles[cur.shareShowImg] = 'style="' + i + '"' + o, s.showPreview(r), r = !0
                                                }
                                            };
                                            clearInterval(cur.shareImgInterval), cur.shareImgInterval = setInterval(h, 300), cur.shareImgInterval2 = setTimeout(h, 0)
                                        }, cur.shareShowNext()
                                    },
                                    uploadShare: function(e) {
                                        var t = s.shareData,
                                            a = s.sharePreview,
                                            i = a.appendChild(ce("div", {
                                                innerHTML: '<iframe class="upload_frame" name="share_upload_iframe' + _ + '"></iframe>'
                                            })),
                                            o = i.appendChild(ce("form", {
                                                action: "/share.php",
                                                method: "post",
                                                target: "share_upload_iframe" + _
                                            })),
                                            r = t.images[cur.shareShowImg];
                                        each({
                                            act: "a_photo",
                                            url: t.url,
                                            index: _,
                                            image: r,
                                            extra: t.extra || 0,
                                            hash: vk.ip_h
                                        }, function(e, t) {
                                            o.appendChild(ce("input", {
                                                type: "hidden",
                                                name: e,
                                                value: t
                                            }))
                                        }), window.onUploadDone = function(t, o) {
                                            window.onUploadFail = window.onUploadDone = function() {}, a.removeChild(i), s.shareData = extend(s.shareData, {
                                                user_id: o.user_id,
                                                photo_id: o.photo_id,
                                                photo_url: r,
                                                images: []
                                            }), setTimeout(e, 0)
                                        }, window.onUploadFail = function(t, o) {
                                            window.onUploadFail = window.onUploadDone = function() {}, a.removeChild(i), s.shareData.images = [], setTimeout(e, 0)
                                        }, cur.shareLastParseSubmitted = vkNow(), o.submit()
                                    },
                                    setupPostpone: function(e, t) {
                                        var a;
                                        a = l || y ? y : domPN(geByClass1("page_preview_postpone_wrap", h));
                                        var o = cur.editingPost && "wpe_media_preview" == domPN(a).id,
                                            r = o || !l ? "" : "1px",
                                            n = !1,
                                            d = '<div class="clear_fix">                <div class="fl_l"><input type="hidden" id="postpone_date' + _ + '" value="' + (e.date || "") + '" /></div>                <div class="fl_l medadd_c_timerat">' + e.lang.profile_wall_postpone_at + '</div>                <div class="fl_l"><input type="hidden" id="postpone_time' + _ + '"/></div></div>';
                                        cur.editingPost && void 0 != e.friends_only ? (d += '<div class="medadd_c_timersett">', void 0 != e.status_export && (d += '<div class="checkbox_status_export' + (e.status_export ? " on" : "") + ' fl_l" id="status_export' + _ + '" onclick="checkbox(this)" onmouseover="showTooltip(this, {text: \'' + e.lang.export_to_twitter + "', black: 1, shift: [12,4,0]});\"></div>"), void 0 != e.facebook_export && (d += '<div class="checkbox_facebook_export' + (e.facebook_export ? " on" : "") + ' fl_l" id="facebook_export' + _ + '" onclick="checkbox(this)" onmouseover="showTooltip(this, {text: \'' + e.lang.export_to_facebook + "', black: 1, shift: [12,4,0]});\"></div>"), d += '<div class="checkbox' + (e.friends_only ? " on" : "") + ' fl_l" id="friends_only' + _ + '" onclick="checkbox(this);checkbox(\'status_export' + _ + "',!isChecked(this));checkbox('facebook_export" + _ + "',!isChecked(this));\">" + e.lang.friends_only + "</div></div>", n = !0) : cur.editingPost && t && (d += t, n = !0), s.postponePreview = a.appendChild(ce("div", {
                                            className: "medadd_c medadd_c_timer clear_fix" + (n ? " medadd_c_nofixed" : ""),
                                            innerHTML: d
                                        })), s.postponePreview.style.height = r, stManager.add(["ui_controls.css", "ui_controls.js", "datepicker.css", "datepicker.js"], function() {
                                            new Datepicker("postpone_date" + _, {
                                                time: "postpone_time" + _,
                                                width: 155,
                                                noPast: !0,
                                                minStep: 1,
                                                onUpdate: i.onMediaChange
                                            }), !o && l && animate(s.postponePreview, {
                                                height: 33
                                            }, 200, function() {
                                                s.postponePreview.style.height = ""
                                            })
                                        })
                                    },
                                    destroy: function() {
                                        (v || {}).sorter && v.sorter.destroy(), (g || {}).qsorter && g.qsorter.destroy()
                                    },
                                    qsorterOpts: function() {
                                        return {
                                            xsize: Math.floor(g.offsetWidth / 135),
                                            width: 135,
                                            height: 102,
                                            onReorder: i.onAddMediaChange,
                                            clsUp: "pam_dpic_up"
                                        }
                                    },
                                    resized: function() {
                                        window.ThumbsEdit && ThumbsEdit.setWide("thumbs_edit" + cur.wallEditComposer.addMedia.lnkId), g.qsorter && (g.qsorter.destroy(), qsorter.init(g, s.qsorterOpts()))
                                    }
                                }, cur.addMedia || (cur.addMedia = {}), cur.addMedia[_] = s, i.onAddMediaChange && (s.onChange = i.onAddMediaChange), s
                            }
                        }
                }
            }
        };
        try {
            stManager.done(jsc("api/widgets/comments.js"))
        } catch (e) {}
    }
});