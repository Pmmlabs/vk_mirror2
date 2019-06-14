! function(e) {
    var t = {};

    function o(n) {
        if (t[n]) return t[n].exports;
        var i = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    o.m = e, o.c = t, o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
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
        var n = Object.create(null);
        if (o.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) o.d(n, i, function(t) {
                return e[t]
            }.bind(null, i));
        return n
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, o.p = "", o(o.s = 4)
}({
    "+lvF": function(e, t, o) {
        e.exports = o("VTer")("native-function-to-string", Function.toString)
    },
    "0/R4": function(e, t) {
        e.exports = function(e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        }
    },
    "2OiF": function(e, t) {
        e.exports = function(e) {
            if ("function" != typeof e) throw TypeError(e + " is not a function!");
            return e
        }
    },
    4: function(e, t, o) {
        e.exports = o("JfKq")
    },
    "69bn": function(e, t, o) {
        var n = o("y3w9"),
            i = o("2OiF"),
            r = o("K0xU")("species");
        e.exports = function(e, t) {
            var o, s = n(e).constructor;
            return void 0 === s || void 0 == (o = n(s)[r]) ? t : i(o)
        }
    },
    A5AN: function(e, t, o) {
        "use strict";
        var n = o("AvRE")(!0);
        e.exports = function(e, t, o) {
            return t + (o ? n(e, t).length : 1)
        }
    },
    AvRE: function(e, t, o) {
        var n = o("RYi7"),
            i = o("vhPU");
        e.exports = function(e) {
            return function(t, o) {
                var r, s, a = String(i(t)),
                    l = n(o),
                    c = a.length;
                return l < 0 || l >= c ? e ? "" : void 0 : (r = a.charCodeAt(l)) < 55296 || r > 56319 || l + 1 === c || (s = a.charCodeAt(l + 1)) < 56320 || s > 57343 ? e ? a.charAt(l) : r : e ? a.slice(l, l + 2) : s - 56320 + (r - 55296 << 10) + 65536
            }
        }
    },
    "C/va": function(e, t, o) {
        "use strict";
        var n = o("y3w9");
        e.exports = function() {
            var e = n(this),
                t = "";
            return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
        }
    },
    "I8a+": function(e, t, o) {
        var n = o("LZWt"),
            i = o("K0xU")("toStringTag"),
            r = "Arguments" == n(function() {
                return arguments
            }());
        e.exports = function(e) {
            var t, o, s;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(o = function(e, t) {
                try {
                    return e[t]
                } catch (e) {}
            }(t = Object(e), i)) ? o : r ? n(t) : "Object" == (s = n(t)) && "function" == typeof t.callee ? "Arguments" : s
        }
    },
    "IU+Z": function(e, t, o) {
        "use strict";
        o("sMXx");
        var n = o("KroJ"),
            i = o("Mukb"),
            r = o("eeVq"),
            s = o("vhPU"),
            a = o("K0xU"),
            l = o("Ugos"),
            c = a("species"),
            u = !r(function() {
                var e = /./;
                return e.exec = function() {
                    var e = [];
                    return e.groups = {
                        a: "7"
                    }, e
                }, "7" !== "".replace(e, "$<a>")
            }),
            p = function() {
                var e = /(?:)/,
                    t = e.exec;
                e.exec = function() {
                    return t.apply(this, arguments)
                };
                var o = "ab".split(e);
                return 2 === o.length && "a" === o[0] && "b" === o[1]
            }();
        e.exports = function(e, t, o) {
            var d = a(e),
                _ = !r(function() {
                    var t = {};
                    return t[d] = function() {
                        return 7
                    }, 7 != "" [e](t)
                }),
                h = _ ? !r(function() {
                    var t = !1,
                        o = /a/;
                    return o.exec = function() {
                        return t = !0, null
                    }, "split" === e && (o.constructor = {}, o.constructor[c] = function() {
                        return o
                    }), o[d](""), !t
                }) : void 0;
            if (!_ || !h || "replace" === e && !u || "split" === e && !p) {
                var f = /./ [d],
                    m = o(s, d, "" [e], function(e, t, o, n, i) {
                        return t.exec === l ? _ && !i ? {
                            done: !0,
                            value: f.call(t, o, n)
                        } : {
                            done: !0,
                            value: e.call(o, t, n)
                        } : {
                            done: !1
                        }
                    }),
                    g = m[0],
                    w = m[1];
                n(String.prototype, e, g), i(RegExp.prototype, d, 2 == t ? function(e, t) {
                    return w.call(e, this, t)
                } : function(e) {
                    return w.call(e, this)
                })
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
    JfKq: function(__webpack_module__, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("SRfc"),
            core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("KKXr"),
            core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("pIFo");
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
                    addMedia: function(e, t, ...o) {
                        ~["pollBackgroundUploaded"].indexOf(t) && cur.addMedia && cur.addMedia[e] && isFunction(cur.addMedia[e][t]) && cur.addMedia[e][t].apply(cur.addMedia[e], o)
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
                    var n = typeof e;
                    if ("number" == n || "boolean" == n || "function" == n) t = e;
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
                    var n = 1 == cur.options.mini || 0 != cur.options.mini && o < 630,
                        i = n && o < 380;
                    e.size != n + "" + i && (e.size = n + "" + i, replaceClass(bodyNode, "wcomments_mini wcomments_nano", (n ? "wcomments_mini " : "") + (i ? "wcomments_nano " : "")))
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
                    onDone: function(o, n) {
                        val(cur.postsEl, n), t && uiTabs.hideProgress(t), removeClass(cur.contentEl, "wcomments_content_loading"), replaceClass(cur.heightEl, "wcomments_section_posts wcomments_section_admin_browse wcomments_section_admin_bl wcomments_section_admin_updates wcomments_section_browse", "wcomments_section_" + e), cur.options.fixed_height && setStyle(cur.postsOuterEl, {
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
                    t -= cur.tsDiff, each(geByClass("rel_date_needs_update", e || ge("wcomments_posts"), "span"), function(e, n) {
                        if (n) {
                            var i = intval(n.getAttribute("time")),
                                r = t - i,
                                s = n.getAttribute("abs_time");
                            r < 5 ? s = getLang("wall_just_now") : r < 60 ? s = Wall.langWordNumeric(r, cur.lang.wall_X_seconds_ago_words, cur.lang.wall_X_seconds_ago) : r < 3600 ? s = Wall.langWordNumeric(intval(r / 60), cur.lang.wall_X_minutes_ago_words, cur.lang.wall_X_minutes_ago) : r < 14400 ? s = Wall.langWordNumeric(intval(r / 3600), cur.lang.wall_X_hours_ago_words, cur.lang.wall_X_hours_ago) : o.push(n), n.innerHTML = s
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
            deleteAllAndBan: function(e, t, o, n) {
                ajax.post("al_widget_comments.php", {
                    act: "a_add_to_bl",
                    id: t,
                    hash: o,
                    app: cur.options.app
                }, {
                    onDone: function(o, n) {
                        n && each(geByClass("wcomments_post", ge("wcomments_posts"), "div"), function() {
                            !this.id.indexOf("post" + t) && this.id.split("_")[1] >= n && this.id != "post" + e && isVisible(this) && hide(this)
                        }), ge("post_del" + e).innerHTML = o, WComments.contentUpdated()
                    },
                    showProgress: function() {
                        lockButton(n)
                    },
                    hideProgress: function() {
                        unlockButton(n)
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
            resizePostSizedThumbs: function(e, t, o, n, i) {
                var r = geByClass("page_post_thumb_wrap", e),
                    s = [],
                    a = 0,
                    l = 0,
                    c = function() {
                        p && s.push(p), a = l = 0, extend(this, {
                            tiles: [],
                            height: 0,
                            x: 0,
                            y: 0
                        })
                    },
                    u = function(e) {
                        e && extend(this, {
                            el: e,
                            lastRow: hasClass(e, "page_post_thumb_last_row"),
                            lastColumn: hasClass(e, "page_post_thumb_last_column"),
                            width: intval(e.style.width),
                            height: intval(e.style.height)
                        })
                    },
                    p = new c,
                    d = positive(e.style.width),
                    _ = positive(e.style.height),
                    h = 0;
                if (t > d && (t = null), (n > _ || i && r.length > 1) && (n = null), !n && t) n = Math.round(_ * (t / d));
                else if (n && !t) t = Math.round(d * (n / _));
                else {
                    if (!t || !n) return;
                    i && (n = Math.min(n, Math.round(_ * (t / d))), t = Math.round(d * (n / _)))
                }
                return each(r, function(e, t) {
                    var n = t.tile || new u(t),
                        i = new u(r[e + 1]);
                    p.height = Math.max(p.height, n.height), d - a >= n.width / 2 ? (a += n.width + (n.lastColumn ? 0 : o), l = n.height, n.x = p.x, n.y = p.y = 0, p.tiles.push(n), n.lastColumn ? i && i.lastColumn && p.height - l >= i.height / 2 || (p = new c) : p.x++) : n.lastColumn && p.height - l >= n.height / 2 && (l += n.height + o, n.x = p.x, n.y = ++p.y, p.tiles.push(n), !n.lastRow && i && i.lastColumn && p.height - l >= i.height / 2 || (p.height = Math.max(p.height, l), p = new c))
                }), each(s, function(e, i) {
                    var r = 0,
                        a = 0,
                        l = (t - o * i.x) / (d - o * i.x),
                        c = (n - o * i.y) / (_ - o * i.y),
                        u = s.length - 1 == e ? n - h : Math.round(i.height * c),
                        p = 0,
                        f = 0;
                    h += u + o, each(i.tiles, function(e, n) {
                        n.x < i.x ? (p = Math.round(n.width * l), r += p + o, n.y || (f = u)) : n.lastColumn && (p = t - r, n.y == i.y ? f = u - a : (f = Math.round(n.height * c), a += f + o)), setStyle(n.el, {
                            width: p,
                            height: f
                        })
                    })
                }), setStyle(e, {
                    width: t,
                    height: n
                }), [t, n]
            },
            resizePostAlbumWrap: function(e, t, o, n) {
                n || (n = "");
                var i = positive(e.style.width),
                    r = geByClass1("page" + n + "_album_thumb_wrap", e, "div"),
                    s = domFC(geByClass1("page" + n + "_album_photos", e, "div")),
                    a = domFC(geByClass1("page" + n + "_album_under_row", e, "div"));
                if (scaleX = t / i, !(i < t) && r) {
                    setStyle(e, {
                        width: t
                    });
                    var l = Math.round(positive(r.style.width) * scaleX),
                        c = Math.round(positive(r.style.height) * scaleX);
                    setStyle(r, {
                        width: l,
                        height: c
                    }), s && WComments.resizePostSizedThumbs(s, t - o - l, o, c), a && WComments.resizePostSizedThumbs(a, t, o, positive(a.style.height) * ((t - o) / (i - o)))
                }
            },
            resizePost: function(e, t) {
                var o = t ? cur.options.reply_max_w : cur.options.max_w,
                    n = Math.max(cur.options.kludges_min_h, o * (t ? cur.options.reply_kludges_ratio : cur.options.kludges_ratio));
                return each(geByClass("page_album_wrap", e, "div"), function(e, t) {
                    WComments.resizePostAlbumWrap(t, o, 5)
                }), each(geByClass("page_market_album_wrap", e, "div"), function(e, t) {
                    WComments.resizePostAlbumWrap(t, o - 2, 2, "_market")
                }), each(geByClass("page_post_sized_thumbs", e, "div"), function(e, t) {
                    WComments.resizePostSizedThumbs(t, o, 5, n, !0)
                }), each(geByClass("audio_pl_snippet", e, "div"), function(e, t) {
                    if (o <= cur.playlist_snippet_max_narrow_width) var n = "audio_pl_snippet_size_narrow";
                    else if (o <= cur.playlist_snippet_max_medium_width) n = "audio_pl_snippet_size_medium";
                    else n = "";
                    setStyle(t, "width", o), removeClass(t, "audio_pl_snippet_size_narrow audio_pl_snippet_size_medium"), n && addClass(t, n)
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
                    n = t[1],
                    i = t[2],
                    r = ge("post" + i);
                if (o != cur.options.qversion) return location.reload();
                switch (n) {
                    case "new_post":
                        if (r) break;
                        var s = ge("wcomments_posts"),
                            a = (intval(t[t.length - 1]), this.resizePost(se(Wall.getNewPostHTML(t, cur.options.is_admin))));

                        function l() {
                            s.insertBefore(a, s.firstChild), ge("post_poll_id" + i) && Wall.votingUpdateByPostRaw(i)
                        }
                        WComments.eventsUpdateAttaches(a), cur.saveScrollPosition ? cur.scrollbar.updateAbove(l) : (l(), cur.scrollbar && cur.scrollbar.scrollTop(0, !0)), nodeUpdated(a), Wall.updateMentionsIndex(), "browse" !== cur.section && val(cur.countEl, d ? getLang("widgets_comments_top_count", d) : getLang("widgets_comments"));
                        break;
                    case "del_post":
                        r && (!cur.wallMyDeleted[i] && hide(r), cur.options.offset--);
                        break;
                    case "res_post":
                        r && cur.options.offset++;
                        break;
                    case "new_reply":
                        if (!r || cur.wallMyReplied[i] || ge("post" + t[3])) break;
                        var c = ge("replies" + i),
                            u = (a = this.resizePost(se(Wall.getNewReplyHTML(t, cur.options.is_admin)), !0), !1);
                        if (isVisible("reply_link" + i)) re("reply_link" + i), show("replies_wrap" + i), u = !0;
                        else {
                            var p = c.nextSibling,
                                d = geByClass("new_reply", c, "div").length + 1;
                            if (cur.wallMyOpened[i]) {
                                p && "replies_open" == p.className && re(p), u = !0;
                                var _ = geByClass1("wr_header", c, "a"),
                                    h = geByClass("reply", c, "div").length + 1,
                                    f = h;
                                _ && (f = intval(_.getAttribute("offs").split("/")[1]) + 1), (f > 5 || h < f) && (_ || (_ = ce("a", {
                                    className: "wr_header"
                                }), c.insertBefore(_, c.firstChild)), Wall.updateRepliesHeader(i, _, h, f))
                            } else addClass(a, "new_reply"), p && "replies_open" == p.className || (p = ce("div", {
                                className: "replies_open",
                                onclick: Wall.openNewComments.pbind(i)
                            }), c.parentNode.insertBefore(p, c.nextSibling)), val(p, getLang("news_x_new_replies_more", Math.min(100, d))), p.newCnt = d
                        }
                        WComments.eventsUpdateAttaches(a), c.appendChild(a), u && nodeUpdated(a);
                        break;
                    case "del_reply":
                        !cur.wallMyDeleted[i] && re(r)
                }
                this.resizeWidget()
            },
            override: function(e, t) {
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
                                        o = cur.wallAddMedia ? e.getMedias() : [],
                                        n = e.shareData || {},
                                        i = trim((window.Emoji ? Emoji.editableVal : val)(ge("post_field"))),
                                        r = cur.options.suggesting ? "suggest" : cur.wallType,
                                        s = {
                                            act: "post",
                                            message: i,
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
                                        a = (cur.postTo == vk.id || s.official || cur.options.only_official, 0);
                                    if (isArray(t) && t.length && o.push(clone(t)), o.length) {
                                        var l = !1;
                                        if (each(o, function(t, o) {
                                                if (o) {
                                                    var r = this[0],
                                                        c = this[1];
                                                    switch (r) {
                                                        case "poll":
                                                            var u = e.pollData();
                                                            if (!u) return l = !0, !1;
                                                            c = u.media, delete u.media, s = extend(s, u);
                                                            break;
                                                        case "share":
                                                            if (n.failed || !n.url || !n.title && (!n.images || !n.images.length) && !n.photo_url) return cur.shareLastParseSubmitted && vkNow() - cur.shareLastParseSubmitted < 2e3 ? (l = !0, !1) : void 0;
                                                            if (c = !n.noPhoto && n.user_id && n.photo_id ? n.user_id + "_" + n.photo_id : "", n.images && n.images.length && !n.share_own_image) return e.uploadShare(Wall.sendPost), l = !0, !1;
                                                            n.initialPattern && trim(i) == n.initialPattern && (s.message = ""), s = extend(s, {
                                                                url: n.url,
                                                                title: replaceEntities(n.title),
                                                                description: replaceEntities(n.description),
                                                                extra: n.extra,
                                                                extra_data: n.extraData,
                                                                mode: n.mode,
                                                                photo_url: n.noPhoto ? "" : replaceEntities(n.photo_url),
                                                                open_graph_data: (n.openGraph || {}).data,
                                                                open_graph_hash: (n.openGraph || {}).hash
                                                            });
                                                            break;
                                                        case "page":
                                                            n.initialPattern && trim(i) == n.initialPattern && (s.message = "");
                                                            break;
                                                        case "postpone":
                                                            var p = val("postpone_date" + e.lnkId);
                                                            return s = extend(s, {
                                                                postpone: p
                                                            }), cur.postponedLastDate = p, void!0
                                                    }
                                                    this[3] && trim(i) == this[3] && (s.message = ""), s["attach" + (a + 1) + "_type"] = r, s["attach" + (a + 1)] = c, a++
                                                }
                                            }), l) return
                                    }
                                    if (a || i) {
                                        var c = ge("send_post");
                                        c && buttonLocked(c) || (cur.postAutosave && clearTimeout(cur.postAutosave), hide("submit_post_error"), cur.postSent = !0, setTimeout(function() {
                                            WComments.eventsPause(), ajax.post("al_wall.php", Wall.fixPostParams(s), {
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
                                var n, i = window.cur.wallLayer == e,
                                    r = i ? wkcur : window.cur,
                                    s = ge("reply_field" + e),
                                    a = s && data(s, "composer"),
                                    l = r.reply_to && Wall.getReplyName(r.reply_to[0]),
                                    c = s && data(s, "send");
                                if (c && isFunction(c)) return c(e, t, o);
                                if (o.stickerId) var u = {
                                    message: "",
                                    attach1_type: "sticker",
                                    attach1: o.stickerId,
                                    sticker_referrer: o.sticker_referrer
                                };
                                else {
                                    if ((u = a ? Composer.getSendParams(a, Wall.sendReply.pbind(e)) : {
                                            message: trim(Emoji.editableVal(s))
                                        }).delayed) return;
                                    if (!u.attach1_type && (!u.message || isArray(l) && !l[1].indexOf(u.message))) return void Emoji.editableFocus(ge("reply_field" + e), !1, !0);
                                    a ? n = Composer.reset(a) : window.Emoji && Emoji.val(s, ""), s.autosize && s.autosize.update()
                                }
                                r.wallMyOpened = r.wallMyOpened || {}, r.wallMyReplied[e] = 1, r.wallMyOpened[e] = 1;
                                var p = ge("post_hash" + e) ? ge("post_hash" + e).value : r.options.post_hash,
                                    d = (ge("reply_as_group" + e), null);
                                if (extend(u, {
                                        act: "post",
                                        type: "widget",
                                        width: r.options.width,
                                        startWidth: r.options.startWidth,
                                        reply_to: e,
                                        reply_to_msg: val("reply_to" + e),
                                        reply_to_user: r.reply_to && r.reply_to[0] || 0,
                                        start_id: val("start_reply" + e),
                                        from: "widget",
                                        hash: p
                                    }), r.reverse && (u.rev = 1), browser.mobile ? Wall.hideEditReply(e) : (Emoji.editableFocus(s, !1, !0), Wall.cancelReplyTo(e, t)), ajax.post("al_wall.php", Wall.fixPostParams(u), {
                                        onDone: function(t, o, n, i) {
                                            if ("full" == r.wallType) return FullWall.onReplySent.apply(window, arguments);
                                            r.wallMyReplied[e] = 0, re("reply_link" + e), hide("reply_warn" + e), Wall._repliesLoaded(e, !1, o, n, i)
                                        },
                                        onFail: function() {
                                            d && re(d), a ? n = Composer.restore(a, n) : val(s, u.message), s.autosize && s.autosize.update()
                                        },
                                        showProgress: lockButton.pbind(ge("reply_button" + e)),
                                        hideProgress: unlockButton.pbind(ge("reply_button" + e))
                                    }), !u.from_oid && u.message) {
                                    var _ = ge("replies" + e),
                                        h = - ++r.wallMyRepliesCnt,
                                        f = Emoji.emojiToHTML(clean(u.message), !0),
                                        m = u.reply_to_user < 0 ? getLang("wall_replied_to_group") : r.options.reply_names[u.reply_to_user] && r.options.reply_names[u.reply_to_user][0],
                                        g = m ? rs(r.wallTpl.reply_link_to, {
                                            to_user: m
                                        }) : "";
                                    if (d = se(rs(r.wallTpl.reply_fast, {
                                            reply_id: "0_" + h,
                                            message: f.replace(/\n/g, "<br/>"),
                                            to_link: g,
                                            date: Wall.getNowRelTime(r)
                                        })), _ && !isVisible(_) || ge("reply_link" + e)) re("reply_link" + e), show("replies_wrap" + e);
                                    else if (!r.onepost) {
                                        var w = _.nextSibling;
                                        if (w && "replies_open" == w.className && Wall.openNewComments(e), !i) {
                                            var v = geByClass1("wr_header", _, "a"),
                                                y = geByClass("reply", _, "div").length + 1,
                                                b = y;
                                            v && (b = intval(v.getAttribute("offs").split("/")[1]) + 1), (b > 5 || y < b) && (v || _.insertBefore(v = ce("a", {
                                                className: "wr_header"
                                            }), _.firstChild), Wall.updateRepliesHeader(e, v, y, b))
                                        }
                                    }
                                    r.reverse ? _.insertBefore(d, _.firstChild) : _.appendChild(d)
                                }
                            },
                            deletePost: function(e, t, o, n, i) {
                                (cur.wallLayer ? wkcur : cur).wallMyDeleted[t] = 1;
                                var r = ge("post" + t),
                                    s = geByClass1("post_actions", r);
                                ajax.post("al_wall.php", {
                                    act: "delete",
                                    post: t,
                                    hash: o,
                                    root: n ? 1 : 0,
                                    confirm: i ? 1 : 0,
                                    from: "widget"
                                }, {
                                    onDone: function(e, i, s) {
                                        if (s) var a = showFastBox(e, s, getLang("global_delete"), function() {
                                            a.hide(), wall.deletePost(t, o, n, 1)
                                        }, getLang("box_cancel"));
                                        else {
                                            i && "posts" == cur.section && cur.Rpc && cur.Rpc.callMethod("publish", "widgets.comments.delete_comment", i.count, i.last_comment, i.date, i.full_hash, i.pageId);
                                            var l = geByClass1("_post_content", r) || geByClass1("feedback_row_t", r);
                                            revertLastInlineVideo(l);
                                            var c = ge("post_del" + t);
                                            c ? (c.innerHTML = '<span class="dld_inner">' + e + "</span>", show(c)) : r.appendChild(ce("div", {
                                                id: "post_del" + t,
                                                className: "dld",
                                                innerHTML: '<span class="dld_inner">' + e + "</span>"
                                            })), hide(l), "post_publish" == domNS(l).className && hide(domNS(l)), "full_own" == cur.wallType || "full_all" == cur.wallType ? (Pagination.recache(-1), FullWall.updateSummary(cur.pgCount)) : "full" == cur.wallType && hasClass(r, "reply") && (cur.pgOffset--, cur.pgCount--, FullWall.repliesSummary(cur.pgCount)), hasClass(r, "suggest") ? Wall.suggestUpdate(-1) : hasClass(r, "postponed") || "own" != cur.wallType && "all" != cur.wallType || (hasClass(r, "own") && ++cur.deletedCnts.own, hasClass(r, "all") && ++cur.deletedCnts.all, Wall.update()), WComments.contentUpdated()
                                        }
                                    },
                                    showProgress: function() {
                                        hasClass(e, "ui_actions_menu_item") ? lockActionsMenuItem(e) : hasClass(e, "flat_button") ? lockButton(e) : addClass(s, "post_actions_progress")
                                    },
                                    hideProgress: function() {
                                        hasClass(e, "ui_actions_menu_item") ? unlockActionsMenuItem(e) : hasClass(e, "flat_button") ? unlockButton(e) : removeClass(s, "post_actions_progress")
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
                                            var n = ge("post" + e),
                                                i = geByClass1("_post_content", n) || geByClass1("feedback_row_t", n);
                                            show(i), "post_publish" == domNS(i).className && show(domNS(i)), hide(o), "full_own" == cur.wallType || "full_all" == cur.wallType ? (Pagination.recache(1), FullWall.updateSummary(cur.pgCount)) : "full" == cur.wallType && hasClass(n, "reply") && (cur.pgOffset++, cur.pgCount++, FullWall.repliesSummary(cur.pgCount)), hasClass(n, "suggest") ? Wall.suggestUpdate(1) : hasClass(n, "postponed") || "own" != cur.wallType && "all" != cur.wallType || (hasClass(n, "own") && --cur.deletedCnts.own, hasClass(n, "all") && --cur.deletedCnts.all, Wall.update()), WComments.contentUpdated()
                                        }
                                    }
                                }), !1
                            },
                            postClick: function(e, t, o) {
                                var n = (e || "").match(/^(-?\d+)_(wall)?(\d+)$/),
                                    i = ge("post" + e);
                                if (o && o.skipCheck) var r = !0;
                                else r = Wall.checkPostClick(i, t);
                                if (r) {
                                    if (!0 !== r) {
                                        var s = geByClass1("wall_post_more", r, "a");
                                        if (s && isVisible(s)) return s.onclick(), void(n || removeClass(i, "wall_post_over"))
                                    }
                                    n && (hasClass(ge("wcomments_posts"), "no_post_click") || window.open("wall" + n[1] + "_" + n[3], "_blank"))
                                }
                            },
                            _repliesLoaded: function(e, t, o, n) {
                                var i = ge("replies" + e);
                                if (i) {
                                    if (t) {
                                        browser.msie6 ? pageNode : browser.chrome || browser.safari ? bodyNode : htmlNode, i.offsetHeight;
                                        cur.options.fixed_height && cur.scrollbar ? cur.scrollbar.updateAbove(function() {
                                            i.innerHTML = o
                                        }) : i.innerHTML = o, setTimeout(Wall.scrollHighlightReply.pbind("post" + t), 0)
                                    } else i.innerHTML = o;
                                    var r = i.nextSibling;
                                    r && "replies_open" == r.className && re(r), extend(cur.options.reply_names || {}, n), Wall.updateMentionsIndex()
                                }
                            },
                            checkTextLen: function() {},
                            checkPostLen: function() {},
                            replySubmitTooltip: function() {},
                            repliesSideSetup: function() {},
                            repliesSideClick: function() {},
                            likesShow: function(e, t, o) {
                                o = o || {};
                                var n = wall.parsePostId(t),
                                    i = n.type,
                                    r = n.id,
                                    s = i + r,
                                    a = e && gpeByClass("_post_content", e) || wall.domPost(r),
                                    l = o.share ? "_share_wrap" : "_like_wrap",
                                    c = domByClass(a, l),
                                    u = domByClass(c, "_icon"),
                                    p = a && domByClass(a, "_share_wrap");
                                if (u && !cur.viewAsBox) {
                                    var d = getXY(c)[0],
                                        _ = getXY(u)[0] + getSize(u, !0)[0] / 2 - d - 56;
                                    showTooltip(u.parentNode, {
                                        url: "/like.php",
                                        params: extend({
                                            act: "a_get_stats",
                                            object: s,
                                            has_share: p ? 1 : ""
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
                            showReplies: function(e, t, o, n) {
                                if (!checkEvent(n || window.event)) return cur.viewAsBox ? cur.viewAsBox() : (cur.wallMyOpened[e] = 3 != t, ajax.post("al_wall.php", {
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
                            Wall[t] = function(e) {
                                return function() {
                                    if (vk.id) return e.apply(Wall, [].slice.call(arguments));
                                    Widgets.oauth()
                                }
                            }(Wall[t])
                        })
                }
            }
        };
        try {
            stManager.done(jsc("api/widgets/comments.js"))
        } catch (e) {}
    },
    K0xU: function(e, t, o) {
        var n = o("VTer")("wks"),
            i = o("ylqs"),
            r = o("dyZX").Symbol,
            s = "function" == typeof r;
        (e.exports = function(e) {
            return n[e] || (n[e] = s && r[e] || (s ? r : i)("Symbol." + e))
        }).store = n
    },
    KKXr: function(e, t, o) {
        "use strict";
        var n = o("quPj"),
            i = o("y3w9"),
            r = o("69bn"),
            s = o("A5AN"),
            a = o("ne8i"),
            l = o("Xxuz"),
            c = o("Ugos"),
            u = o("eeVq"),
            p = Math.min,
            d = [].push,
            _ = !u(function() {
                RegExp(4294967295, "y")
            });
        o("IU+Z")("split", 2, function(e, t, o, u) {
            var h;
            return h = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function(e, t) {
                var i = String(this);
                if (void 0 === e && 0 === t) return [];
                if (!n(e)) return o.call(i, e, t);
                for (var r, s, a, l = [], u = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), p = 0, _ = void 0 === t ? 4294967295 : t >>> 0, h = new RegExp(e.source, u + "g");
                    (r = c.call(h, i)) && !((s = h.lastIndex) > p && (l.push(i.slice(p, r.index)), r.length > 1 && r.index < i.length && d.apply(l, r.slice(1)), a = r[0].length, p = s, l.length >= _));) h.lastIndex === r.index && h.lastIndex++;
                return p === i.length ? !a && h.test("") || l.push("") : l.push(i.slice(p)), l.length > _ ? l.slice(0, _) : l
            } : "0".split(void 0, 0).length ? function(e, t) {
                return void 0 === e && 0 === t ? [] : o.call(this, e, t)
            } : o, [function(o, n) {
                var i = e(this),
                    r = void 0 == o ? void 0 : o[t];
                return void 0 !== r ? r.call(o, i, n) : h.call(String(i), o, n)
            }, function(e, t) {
                var n = u(h, e, this, t, h !== o);
                if (n.done) return n.value;
                var c = i(e),
                    d = String(this),
                    f = r(c, RegExp),
                    m = c.unicode,
                    g = (c.ignoreCase ? "i" : "") + (c.multiline ? "m" : "") + (c.unicode ? "u" : "") + (_ ? "y" : "g"),
                    w = new f(_ ? c : "^(?:" + c.source + ")", g),
                    v = void 0 === t ? 4294967295 : t >>> 0;
                if (0 === v) return [];
                if (0 === d.length) return null === l(w, d) ? [d] : [];
                for (var y = 0, b = 0, x = []; b < d.length;) {
                    w.lastIndex = _ ? b : 0;
                    var C, k = l(w, _ ? d : d.slice(b));
                    if (null === k || (C = p(a(w.lastIndex + (_ ? 0 : b)), d.length)) === y) b = s(d, b, m);
                    else {
                        if (x.push(d.slice(y, b)), x.length === v) return x;
                        for (var W = 1; W <= k.length - 1; W++)
                            if (x.push(k[W]), x.length === v) return x;
                        b = y = C
                    }
                }
                return x.push(d.slice(y)), x
            }]
        })
    },
    KroJ: function(e, t, o) {
        var n = o("dyZX"),
            i = o("Mukb"),
            r = o("aagx"),
            s = o("ylqs")("src"),
            a = o("+lvF"),
            l = ("" + a).split("toString");
        o("g3g5").inspectSource = function(e) {
            return a.call(e)
        }, (e.exports = function(e, t, o, a) {
            var c = "function" == typeof o;
            c && (r(o, "name") || i(o, "name", t)), e[t] !== o && (c && (r(o, s) || i(o, s, e[t] ? "" + e[t] : l.join(String(t)))), e === n ? e[t] = o : a ? e[t] ? e[t] = o : i(e, t, o) : (delete e[t], i(e, t, o)))
        })(Function.prototype, "toString", function() {
            return "function" == typeof this && this[s] || a.call(this)
        })
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
    Mukb: function(e, t, o) {
        var n = o("hswa"),
            i = o("RjD/");
        e.exports = o("nh4g") ? function(e, t, o) {
            return n.f(e, t, i(1, o))
        } : function(e, t, o) {
            return e[t] = o, e
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
    SRfc: function(e, t, o) {
        "use strict";
        var n = o("y3w9"),
            i = o("ne8i"),
            r = o("A5AN"),
            s = o("Xxuz");
        o("IU+Z")("match", 1, function(e, t, o, a) {
            return [function(o) {
                var n = e(this),
                    i = void 0 == o ? void 0 : o[t];
                return void 0 !== i ? i.call(o, n) : new RegExp(o)[t](String(n))
            }, function(e) {
                var t = a(o, e, this);
                if (t.done) return t.value;
                var l = n(e),
                    c = String(this);
                if (!l.global) return s(l, c);
                var u = l.unicode;
                l.lastIndex = 0;
                for (var p, d = [], _ = 0; null !== (p = s(l, c));) {
                    var h = String(p[0]);
                    d[_] = h, "" === h && (l.lastIndex = r(c, i(l.lastIndex), u)), _++
                }
                return 0 === _ ? null : d
            }]
        })
    },
    Ugos: function(e, t, o) {
        "use strict";
        var n = o("C/va"),
            i = RegExp.prototype.exec,
            r = String.prototype.replace,
            s = i,
            a = function() {
                var e = /a/,
                    t = /b*/g;
                return i.call(e, "a"), i.call(t, "a"), 0 !== e.lastIndex || 0 !== t.lastIndex
            }(),
            l = void 0 !== /()??/.exec("")[1];
        (a || l) && (s = function(e) {
            var t, o, s, c, u = this;
            return l && (o = new RegExp("^" + u.source + "$(?!\\s)", n.call(u))), a && (t = u.lastIndex), s = i.call(u, e), a && s && (u.lastIndex = u.global ? s.index + s[0].length : t), l && s && s.length > 1 && r.call(s[0], o, function() {
                for (c = 1; c < arguments.length - 2; c++) void 0 === arguments[c] && (s[c] = void 0)
            }), s
        }), e.exports = s
    },
    VTer: function(e, t, o) {
        var n = o("g3g5"),
            i = o("dyZX"),
            r = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});
        (e.exports = function(e, t) {
            return r[e] || (r[e] = void 0 !== t ? t : {})
        })("versions", []).push({
            version: n.version,
            mode: o("LQAc") ? "pure" : "global",
            copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
        })
    },
    XKFU: function(e, t, o) {
        var n = o("dyZX"),
            i = o("g3g5"),
            r = o("Mukb"),
            s = o("KroJ"),
            a = o("m0Pp"),
            l = function(e, t, o) {
                var c, u, p, d, _ = e & l.F,
                    h = e & l.G,
                    f = e & l.S,
                    m = e & l.P,
                    g = e & l.B,
                    w = h ? n : f ? n[t] || (n[t] = {}) : (n[t] || {}).prototype,
                    v = h ? i : i[t] || (i[t] = {}),
                    y = v.prototype || (v.prototype = {});
                for (c in h && (o = t), o) p = ((u = !_ && w && void 0 !== w[c]) ? w : o)[c], d = g && u ? a(p, n) : m && "function" == typeof p ? a(Function.call, p) : p, w && s(w, c, p, e & l.U), v[c] != p && r(v, c, d), m && y[c] != p && (y[c] = p)
            };
        n.core = i, l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, l.U = 64, l.R = 128, e.exports = l
    },
    Xxuz: function(e, t, o) {
        "use strict";
        var n = o("I8a+"),
            i = RegExp.prototype.exec;
        e.exports = function(e, t) {
            var o = e.exec;
            if ("function" == typeof o) {
                var r = o.call(e, t);
                if ("object" != typeof r) throw new TypeError("RegExp exec method returned something other than an Object or null");
                return r
            }
            if ("RegExp" !== n(e)) throw new TypeError("RegExp#exec called on incompatible receiver");
            return i.call(e, t)
        }
    },
    aagx: function(e, t) {
        var o = {}.hasOwnProperty;
        e.exports = function(e, t) {
            return o.call(e, t)
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
    eeVq: function(e, t) {
        e.exports = function(e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    },
    g3g5: function(e, t) {
        var o = e.exports = {
            version: "2.6.5"
        };
        "number" == typeof __e && (__e = o)
    },
    hswa: function(e, t, o) {
        var n = o("y3w9"),
            i = o("xpql"),
            r = o("apmT"),
            s = Object.defineProperty;
        t.f = o("nh4g") ? Object.defineProperty : function(e, t, o) {
            if (n(e), t = r(t, !0), n(o), i) try {
                return s(e, t, o)
            } catch (e) {}
            if ("get" in o || "set" in o) throw TypeError("Accessors not supported!");
            return "value" in o && (e[t] = o.value), e
        }
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
    pIFo: function(e, t, o) {
        "use strict";
        var n = o("y3w9"),
            i = o("S/j/"),
            r = o("ne8i"),
            s = o("RYi7"),
            a = o("A5AN"),
            l = o("Xxuz"),
            c = Math.max,
            u = Math.min,
            p = Math.floor,
            d = /\$([$&`']|\d\d?|<[^>]*>)/g,
            _ = /\$([$&`']|\d\d?)/g,
            h = function(e) {
                return void 0 === e ? e : String(e)
            };
        o("IU+Z")("replace", 2, function(e, t, o, f) {
            return [function(n, i) {
                var r = e(this),
                    s = void 0 == n ? void 0 : n[t];
                return void 0 !== s ? s.call(n, r, i) : o.call(String(r), n, i)
            }, function(e, t) {
                var i = f(o, e, this, t);
                if (i.done) return i.value;
                var p = n(e),
                    d = String(this),
                    _ = "function" == typeof t;
                _ || (t = String(t));
                var g = p.global;
                if (g) {
                    var w = p.unicode;
                    p.lastIndex = 0
                }
                for (var v = [];;) {
                    var y = l(p, d);
                    if (null === y) break;
                    if (v.push(y), !g) break;
                    "" === String(y[0]) && (p.lastIndex = a(d, r(p.lastIndex), w))
                }
                for (var b = "", x = 0, C = 0; C < v.length; C++) {
                    y = v[C];
                    for (var k = String(y[0]), W = c(u(s(y.index), d.length), 0), S = [], M = 1; M < y.length; M++) S.push(h(y[M]));
                    var P = y.groups;
                    if (_) {
                        var T = [k].concat(S, W, d);
                        void 0 !== P && T.push(P);
                        var B = String(t.apply(void 0, T))
                    } else B = m(k, d, W, S, P, t);
                    W >= x && (b += d.slice(x, W) + B, x = W + k.length)
                }
                return b + d.slice(x)
            }];

            function m(e, t, n, r, s, a) {
                var l = n + e.length,
                    c = r.length,
                    u = _;
                return void 0 !== s && (s = i(s), u = d), o.call(a, u, function(o, i) {
                    var a;
                    switch (i.charAt(0)) {
                        case "$":
                            return "$";
                        case "&":
                            return e;
                        case "`":
                            return t.slice(0, n);
                        case "'":
                            return t.slice(l);
                        case "<":
                            a = s[i.slice(1, -1)];
                            break;
                        default:
                            var u = +i;
                            if (0 === u) return o;
                            if (u > c) {
                                var d = p(u / 10);
                                return 0 === d ? o : d <= c ? void 0 === r[d - 1] ? i.charAt(1) : r[d - 1] + i.charAt(1) : o
                            }
                            a = r[u - 1]
                    }
                    return void 0 === a ? "" : a
                })
            }
        })
    },
    quPj: function(e, t, o) {
        var n = o("0/R4"),
            i = o("LZWt"),
            r = o("K0xU")("match");
        e.exports = function(e) {
            var t;
            return n(e) && (void 0 !== (t = e[r]) ? !!t : "RegExp" == i(e))
        }
    },
    sMXx: function(e, t, o) {
        "use strict";
        var n = o("Ugos");
        o("XKFU")({
            target: "RegExp",
            proto: !0,
            forced: n !== /./.exec
        }, {
            exec: n
        })
    },
    vhPU: function(e, t) {
        e.exports = function(e) {
            if (void 0 == e) throw TypeError("Can't call method on  " + e);
            return e
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
    ylqs: function(e, t) {
        var o = 0,
            n = Math.random();
        e.exports = function(e) {
            return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++o + n).toString(36))
        }
    }
});