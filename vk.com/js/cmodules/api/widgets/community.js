! function(t) {
    function e(i) {
        if (o[i]) return o[i].exports;
        var n = o[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return t[i].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports
    }
    var o = {};
    return e.m = t, e.c = o, e.p = "", e(0)
}({
    0: function(t, e, o) {
        t.exports = o(192)
    },
    192: function(t, e) {
        "use strict";
        window.Community = {
            init: function() {
                var t = this;
                if (cur.wallMyDeleted = {}, this.override("lite.js"), this.override("page.js"), stManager.emitter.addListener("update", this.override.bind(this)), 2 == cur.mode || 4 == cur.mode) {
                    var e = Math.max(cur.minHeight, cur.height - getSize("community_header")[1]);
                    ge("community_content") ? (setStyle("community_content", "height", e), cur.scrollbar = new uiScroll("community_content", {
                        onmore: this.showMore.bind(this),
                        theme: "default wcommunity",
                        hidden: 1,
                        ondragstart: function() {
                            try {
                                cur.Rpc.callMethod("startDrag")
                            } catch (t) {}
                        },
                        ondragstop: function() {
                            try {
                                cur.Rpc.callMethod("stopDrag")
                            } catch (t) {}
                        }
                    })) : setStyle(geByClass1("_wcommunity_closed_wrap"), "height", e), cur.mouseMove = function(t) {
                        cur.scrollbar && cur.scrollbar.ondrag(t)
                    }, cur.mouseUp = function() {
                        cur.scrollbar && cur.scrollbar.ondragstop()
                    }
                }
                cur.Rpc = new fastXDM.Client({
                    onInit: function() {
                        return setTimeout(t.resizeWidget, 500)
                    },
                    authorised: function(t) {
                        var e = location.href;
                        e = -1 != e.indexOf("fieldText=") ? e.replace(/fieldText=.+?(&|$)/, "fieldText=" + winToUtf(ge("commentFiled").getValue()) + "") : e + "&fieldText=" + winToUtf(ge("commentFiled").getValue()), -1 != e.indexOf("autoLogin=1") && (e = e.replace("autoLogin=1", "autoLogin=0")), location.href = e
                    },
                    unauthorised: function(t) {
                        var e = location.href; - 1 != e.indexOf("autoLogin=0") ? e = e.replace("autoLogin=0", "autoLogin=1") : e += "&autoLogin=1", cur.Rpc.callMethod("auth"), location.href = e
                    },
                    mouseMove: function(t) {
                        cur.mouseMove(t)
                    },
                    mouseUp: function() {
                        cur.mouseUp({})
                    }
                }, {
                    safe: !0
                }), cur.mainDiv = ge("main"), this.resizeWidget(), setTimeout(this.resizeWidget, 0)
            },
            resizeWidget: function() {
                onBodyResize(!0), cur.mainDiv && cur.Rpc && cur.Rpc.callMethod("resize", getSize(cur.mainDiv)[1])
            },
            sendStateEvent: function(t) {
                cur.Rpc.callMethod("publish", t ? "widgets.groups.joined" : "widgets.groups.leaved")
            },
            sendChangeState: function(t, e, o, i, n) {
                this.sendStateEvent(t);
                var c = ge("hiddenDomain");
                ajax.post("/widget_community.php", {
                    act: "a_change_state",
                    state: t,
                    oid: e,
                    hash: cur.hash,
                    domain: c ? c.value : "",
                    is_event: i ? 1 : 0
                }, {
                    onDone: o,
                    onFail: n
                })
            },
            changeGroupState: function(t, e) {
                var o = this,
                    i = function() {
                        function i(t) {
                            t ? (val("members_count", cur.count_in), replaceClass(e, "color3_bg", "color4_bg color2 secondary _subscribed"), val(e, cur.unsubscribe_lang), setStyle("anim_row", "left", 0)) : (val("members_count", cur.count_out), replaceClass(e, "color4_bg color2 secondary _subscribed", "color3_bg"), val(e, cur.subscribe_lang), setStyle("anim_row", "left", -cur.mWidth))
                        }
                        cur.changinGroupState || (cur.changinGroupState = !0, lockButton(e), cur.noAuth ? (Widgets.oauth(), window.gotSession = function(i) {
                            -1 == i && (setTimeout(location.reload.bind(location), 1e3), location.href = location.href + "&1"), i && ajax.post("/widget_community.php", {
                                act: "a_get_info",
                                oid: cur.oid
                            }, {
                                onDone: function(i) {
                                    i.hash && (cur.noAuth = !1, cur.justAuth = !0, cur.hash = i.hash, cur.changinGroupState = !1, o.changeGroupState(t, e))
                                }
                            })
                        }) : t && !cur.justAuth ? (unlockButton(e), cur.changinGroupState = !1, Widgets.showSubscribeBox(cur.oid, function() {
                            o.sendStateEvent(t), i(!0)
                        }, t)) : cur.justAuth || o.sendChangeState(t, cur.oid, function() {
                            unlockButton(e), i(t), cur.changinGroupState = !1
                        }, !1, function() {
                            unlockButton(e), cur.changinGroupState = !1
                        }))
                    };
                cur.confirmUnsubscribe && !t ? Widgets.showUnsubscribeBox(cur.oid, i) : i()
            },
            changeEventState: function(t, e) {
                function o(t) {
                    t ? (val("members_count", cur.count_in), setStyle("anim_row", "left", 0)) : (val("members_count", cur.count_out), setStyle("anim_row", "left", -cur.mWidth))
                }
                var i = this;
                cur.changinEventState || (cur.changinEventState = !0, lockButton(e), cur.noAuth ? (Widgets.oauth(), window.gotSession = function(o) {
                    cur.noAuth = !1, ajax.post("/widget_community.php", {
                        act: "a_get_info",
                        oid: cur.oid
                    }, {
                        onDone: function(o) {
                            o.hash && (cur.hash = o.hash, cur.changinEventState = !1, i.changeEventState(t, e))
                        }
                    })
                }) : t > 0 && !cur.justAuth ? (unlockButton(e), cur.changinEventState = !1, Widgets.showSubscribeBox(cur.oid, function(e) {
                    void 0 !== e && val("community_footer", e), i.sendStateEvent(t), o(!0), i.resizeWidget()
                }, t, !0)) : cur.justAuth || this.sendChangeState(t, cur.oid, function(t) {
                    void 0 !== t && val("community_footer", t), cur.changinEventState = !1, o(!1), i.resizeWidget()
                }, 1, function() {
                    unlockButton(e), cur.changinEventState = !1
                }))
            },
            subscribersBox: function(t, e) {
                return !vk.id || t && t.metaKey ? !0 : (showBox("al_page.php", {
                    act: "box",
                    oid: cur.oid,
                    tab: "friends" === e ? e : "members",
                    widget_width: 638
                }), !1)
            },
            subscribeGroupState: function(t, e) {
                return ajax.post("/widget_community.php", {
                    act: "a_subscribe",
                    state: t,
                    oid: e,
                    hash: cur.hash
                }, {
                    onDone: function() {},
                    onFail: function() {}
                }), !0
            },
            showMore: function() {
                var t = this,
                    e = ge("wall_more_cont");
                !buttonLocked(e) && isVisible(e) && (lockButton(e), ajax.post("/widget_community.php", {
                    act: "load_more",
                    offset: cur.offset,
                    oid: cur.oid,
                    wide: cur.wide,
                    width: cur.width,
                    mode: cur.mode ? 1 : void 0
                }, {
                    onDone: function(o, i, n) {
                        cur.offset += n, cur.offset >= i ? hide(e) : unlockButton(e), ge("page_wall_posts").appendChild(cf(o)), t.resizeWidget(), setTimeout(t.resizeWidget, 500)
                    }
                }))
            },
            showLikesBox: function(t, e) {
                showBox("widget_like.php", extend({
                    act: "a_stats_box",
                    obj: t,
                    from: "wpost",
                    check_hash: cur.likeCheckHash,
                    widget_width: 638
                }, e || {}))
            },
            override: function(t, e) {
                if (StaticFiles[t] || e === !0) switch (t) {
                    case "lite.js":
                        extend(window, {
                            showTooltip: Widgets.showTooltip,
                            showBox: Widgets.showBox({
                                "al_photos.php": {
                                    photo_box: !0
                                },
                                "al_video.php": {
                                    video_box: !0
                                },
                                "al_places.php": {
                                    show_photo_place: !0
                                },
                                "al_page.php": {
                                    box: !0
                                },
                                "like.php": {
                                    publish_box: !0
                                },
                                "widget_like.php": {
                                    a_stats_box: !0
                                }
                            }),
                            showReCaptchaBox: Widgets.showReCaptchaBox,
                            gotSession: function() {
                                location.reload()
                            },
                            showPhoto: Widgets.showPhoto,
                            showVideo: Widgets.showVideo,
                            showWiki: function(t) {
                                if (t = (t && t.w || "").split("/"), "likes" == t[0]) window.Community.showLikesBox(t[1]);
                                else {
                                    if ("shares" != t[0]) return !0;
                                    window.Community.showLikesBox(t[1], {
                                        tab: "published"
                                    })
                                }
                            },
                            shareAudioPlaylist: function(t) {
                                vk.id ? t.apply(null, [].slice.call(arguments, 1)) : Widgets.oauth()
                            }.bind(null, shareAudioPlaylist),
                            addAudio: function(t) {
                                vk.id ? t.apply(null, [].slice.call(arguments, 1)) : Widgets.oauth()
                            }.bind(null, AudioUtils.addAudio),
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
                    case "page.js":
                        window.Emoji = {
                            stickerOver: function() {}
                        }, extend(Wall, {
                            pollFull: function() {},
                            likesShow: function(t, e, o) {
                                o = o || {};
                                var i = hasClass(t, "post_like"),
                                    n = Wall.parsePostId(e),
                                    c = n.type,
                                    a = n.id,
                                    s = c + a,
                                    u = t && gpeByClass("_post_content", t) || Wall.domPost(a),
                                    r = o.share ? "_share_wrap" : "_like_wrap",
                                    l = domByClass(u, r),
                                    d = domByClass(l, "_icon"),
                                    h = u && domByClass(u, "_share_wrap");
                                if (d && !cur.viewAsBox) {
                                    var p = i ? 14 : 58,
                                        g = getXY(l)[0],
                                        f = getXY(d)[0],
                                        m = getSize(d, !0)[0],
                                        _ = f + m / 2 - g - p;
                                    showTooltip(d.parentNode, {
                                        url: "/like.php",
                                        params: extend({
                                            act: "a_get_stats",
                                            object: s,
                                            has_share: h ? 1 : ""
                                        }, o.share ? {
                                            published: 1
                                        } : {}),
                                        slide: 15,
                                        shift: [-_, i ? 5 : -3],
                                        ajaxdt: 100,
                                        showdt: 400,
                                        hidedt: 200,
                                        dir: "auto",
                                        checkLeft: !0,
                                        reverseOffset: 80,
                                        appendEl: ge("page_wrap"),
                                        tip: {
                                            over: function() {
                                                Wall.likesShow(t, e, o)
                                            }
                                        },
                                        typeClass: "like_tt " + (i ? "wcommunity_post_like_tt" : "wcommunity_like_tt"),
                                        className: o.cl || ""
                                    })
                                }
                            },
                            postTooltip: function(t, e, o) {},
                            postClick: function(t, e, o) {},
                            showReplies: function() {
                                return !0
                            },
                            stickerClick: function() {}
                        }), each(["markAsSpam", "likeIt"], function(t, e) {
                            Wall[e] = function(t) {
                                return function() {
                                    return vk.id ? t.apply(Wall, [].slice.call(arguments)) : void Widgets.oauth()
                                }
                            }(Wall[e])
                        })
                }
            }
        };
        try {
            stManager.done(jsc("api/widgets/community.js"))
        } catch (o) {}
    }
});