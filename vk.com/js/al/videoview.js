var Videoview = {
        FLASH_MIN_VERSION: 24,
        isFS: !1,
        playerCallback: {
            resize: function(e, i) {},
            debugLog: function() {
                var e = Array.prototype.slice.call(arguments);
                e.unshift("video player:"), debugLog.apply(null, e)
            },
            fullscreen: function(e) {
                Videoview.isFS = e, Videoview.updateExternalVideoFinishBlock()
            },
            incViewCounter: function(e, i, o, t, a, n, d) {
                var r = {
                    oid: e,
                    vid: i,
                    hash: o,
                    curr_res: t,
                    max_res: a,
                    player: n || "flash",
                    type: d,
                    module: Videoview.getVideoModule(e + "_" + i)
                };
                if (cur.videoSearchStats) {
                    var s = parseInt(cur.videoSearchPos);
                    isNaN(s) || (r.search_pos = s, cur.videoSearchStats.positions[s] = extend({
                        viewStarted: 0
                    }, cur.videoSearchStats.positions[s]), cur.videoSearchStats.positions[s].viewStarted++), cur.videoSearchStats.totalViews++
                }
                ajax.post("al_video.php?act=inc_view_counter", r)
            },
            rotateVideo: function(e, i, o, t) {
                ajax.post("al_video.php?act=rotate_video", {
                    oid: e,
                    vid: i,
                    angle: o,
                    hash: t
                })
            },
            scoreCardCounter: function() {},
            onVideoNext: function(e, i, o) {
                setTimeout(function() {
                    var t = 0;
                    i || e ? i && o ? t = 5 : i && !o ? t = 6 : e && (t = 7) : t = 4, Videoview.sendPlayerStats(t, 0), VideoPlaylist.getBlock() ? e && !i ? VideoPlaylist.showVideo(e) : VideoPlaylist.nextVideo() : showVideo(e, "", {
                        autoplay: 1,
                        module: Videoview.getVideoModule(e)
                    })
                }, 0)
            },
            fetchSuggestions: function(e, i) {
                if (e) {
                    var o = Videoview.getMvData(),
                        t = o.videoRaw;
                    ajax.post("al_video.php?act=fetch_player_suggestions", {
                        oid: o.oid,
                        vid: o.vid,
                        videos: e,
                        prepend_current: i ? 1 : 0
                    }, {
                        onDone: function(e) {
                            var i = Videoview.getMvData();
                            if (i && i.videoRaw == t) {
                                i.playerSuggestions = e;
                                var o = cur.videoInlinePlayer || window.mvcur && mvcur.player || cur.player;
                                o && o.setSuggestions(e)
                            }
                        }
                    })
                }
            },
            setSuggestions: function(e) {
                Videoview.playerCallback.fetchSuggestions(e)
            },
            onSuggestionsShown: function(e, i, o) {
                var t = o ? 16 : e ? 14 : 12;
                if (Videoview.sendPlayerStats(t, 0), e) {
                    var a = "",
                        n = Videoview.getMvData();
                    each(n.playerSuggestions, function(e, o) {
                        o.vid != i && (a += "&vid=" + o.vid)
                    }), vkImage().src = "//go.imgsmail.ru/vk?pxn=vs&qid=" + e + a
                }
            },
            onSuggestionClick: function(e, i, o, t, a) {
                var n = a ? 15 : i ? 13 : 11;
                Videoview.sendPlayerStats(n, 0), showVideo(e, "", {
                    autoplay: 1,
                    module: Videoview.getVideoModule(e),
                    addParams: {
                        suggestions_qid: i
                    }
                }), i && (vkImage().src = "//go.imgsmail.ru/vk?pxn=vic&qid=" + i + "&vid=" + e + "&p=" + o + "&t=" + t)
            },
            onSuggestionQuarterWatched: function(e, i, o) {
                vkImage().src = "//go.imgsmail.ru/vk?pxn=vt25&qid=" + e + "&vid=" + i + "&t=" + o
            },
            onSuggestionsReplayClicked: function() {
                Videoview.sendPlayerStats(17, 0)
            },
            onOpenInPopup: function(e, i, o) {
                Videoview.sendPlayerStats(8, 0);
                var t = cur.videoInlinePlayer && cur.videoInlinePlayer.canExpand() ? cur.videoInlinePlayer : null,
                    a = _videoLastInlined ? domData(domClosest("post", _videoLastInlined[1]), "post-id") : null,
                    n = _videoLastInlined ? domData(_videoLastInlined[1], "playlist") : null;
                showVideo(e, i, {
                    expandPlayer: t,
                    playlistId: n,
                    autoplay: 1,
                    addParams: {
                        t: o,
                        post_id: a
                    }
                })
            },
            onVideoAdEvent: function(e, i, o, t, a, n, d) {
                if (o) {
                    cur._vadStatQueue = cur._vadStatQueue || {}, cur._vadStatQueue[e + "_" + i] = cur._vadStatQueue[e + "_" + i] || {
                        type: "",
                        events: []
                    };
                    var r = cur._vadStatQueue[e + "_" + i];
                    r.type = a, r.events.push(t), r.pl_type = d, clearTimeout(cur._vadStatTimer), cur._vadStatTimer = setTimeout(Videoview.sendVideoAdStat.bind(Videoview, e, i, o), 1e3)
                }
            },
            onVideoAdShown: function(e, i, o, t) {
                ajax.post("al_video.php?act=ad_event", {
                    oid: e,
                    vid: i,
                    type: o,
                    event: t
                }, {})
            },
            onVideoResolutionChanged: function(e, i, o, t) {
                window.mvcur && mvcur.mvData && (mvcur.mvData.resolution = t)
            },
            onInitialized: function() {
                window.mvcur && mvcur.mvShown && (VideoPlaylist.toggle(!VideoPlaylist.isCollapsed()), mvcur.options.focusPlay && ("visible" == document.visibilityState ? Videoview.togglePlay(!0) : "hidden" == document.visibilityState && addEvent(window, "focus", function o() {
                    Videoview.togglePlay(!0), removeEvent(window, "focus", o)
                })));
                var e = window.mvcur && mvcur.player && mvcur.player.el || ge("video_player");
                e && e.focus();
                var i = Videoview.getMvData();
                i.tns_monetized ? vkImage().src = "//www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=pladform_videovk-playerload/" + irand(1, 1e9) : vkImage().src = "//www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=platform_videovk-playerload/" + irand(1, 1e9), i.kz && (vkImage().src = "//www.tns-counter.ru/V13a****vk_kz/ru/CP1251/tmsec=vkkz_videoloading/" + irand(1, 1e9))
            },
            onVideoPlayProgress: function(e, i, o, t, a) {
                var n = e + "_" + i;
                5e3 > t && cur.tnsStart != n ? (this.playerCallback.scoreCardCounter(), cur.tnsStart = n) : t > a / 2 && cur.tnsEnd != n && (cur.tnsEnd = n), window.mvcur && mvcur.adData && (mvcur.adData.stat_link_start && !mvcur.adData.view_complete_start && t >= 5e3 && (ajax.post(mvcur.adData.stat_link_start, {}, {
                    onDone: function() {},
                    onFail: function() {
                        return !0
                    }
                }), mvcur.adData.view_complete_start = !0), mvcur.adData.stat_link_half && !mvcur.adData.view_complete_half && t >= a / 2 && (ajax.post(mvcur.adData.stat_link_half, {}, {
                    onDone: function() {},
                    onFail: function() {
                        return !0
                    }
                }), mvcur.adData.view_complete_half = !0), mvcur.adData.stat_link_full && !mvcur.adData.view_complete_full && t >= .9 * a && (ajax.post(mvcur.adData.stat_link_full, {}, {
                    onDone: function() {},
                    onFail: function() {
                        return !0
                    }
                }), mvcur.adData.view_complete_full = !0))
            },
            onVideoStreamPlaying: function(e, i) {
                var o = Videoview.getPlayerObject();
                o && o.isAutoplay && o.isAutoplay() || (window.Notifier && setTimeout(function() {
                    Notifier.lcSend("video_start")
                }, 0), window.ap && ap.isPlaying() && (ap.pause(), ap.pausedByVideo = vkNow()))
            },
            onVideoPlayStarted: function(e, i, o, t, a) {
                var n = Videoview.getVideoModule(e + "_" + i),
                    d = cur.videoInlinePlayer && cur.videoInlinePlayer.isAutoplay(),
                    r = "";
                if (window.Video && Video.isInCatalog()) {
                    var s = window._videoLastInlined ? domData(_videoLastInlined[1], "playlist") : mvcur.options.playlistId,
                        v = s ? s.replace("cat_", "") : "";
                    r = Videocat.isTop3Playlist(v) ? "featured" : v
                }
                var l;
                l = cur.mvOpts && cur.mvOpts.inline || window.mvcur && mvcur.mvData && mvcur.mvData.inline ? "inline" : window.mvcur && window.mvcur.options && window.mvcur.options.playlistId ? "layer_with_playlist" : "layer", window.mvcur && mvcur.mvData && (mvcur.viewStartedTimestamp = (new Date).getTime()), ajax.post("al_video.php?act=video_view_started", {
                    oid: e,
                    vid: i,
                    hash: o,
                    quality: window.mvcur ? mvcur.mvData.resolution : 0,
                    module: n,
                    videocat: r,
                    autoplay: d ? 1 : 0,
                    inline: -1,
                    player_view_type: l
                }, {}), d && cur.videoAutoplayStat && cur.videoAutoplayStat.video == e + "_" + i && !a && ajax.post("al_video.php?act=autoplay_stat", {
                    event: "start",
                    start_time: vkNow() - cur.videoAutoplayStat.launched,
                    preloaded: cur.videoAutoplayStat.preloaded ? 1 : 0,
                    streaming_method: t,
                    module: Videoview.getVideoModule()
                }, {});
                var c = Videoview.getMvData();
                switch (c.tns_monetized ? vkImage().src = "//www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=pladform_videovk-playerstart/" + irand(1, 1e9) : vkImage().src = "//www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=platform_videovk-playerstart/" + irand(1, 1e9), c.kz && (vkImage().src = "//www.tns-counter.ru/V13a****vk_kz/ru/CP1251/tmsec=vkkz_videostart/" + irand(1, 1e9)), c.l_type) {
                    case 1:
                        vkImage().src = "//vk.com/rtrg?r=JQ6ueUeOxlSLb8IoA8ToayylOLgRkThaoFV0XVgG5qvS1x1xWrkfqAg73sYWJxwq9PXWucKtMS02J3CsGLZdmOMNj9dv9UCjDN4a3ShJZXcJFMhgfVwSoPWoxp*Y/LAFUnKz5*XBvDCQXeaygAqI*gY9gz*jWTXaOXyT2lSfIPY-";
                        break;
                    case 2:
                        vkImage().src = "//vk.com/rtrg?r=lD4OYmfC8ehvdc/8TL9AsAjM956qNaHyj20XV5mCNiTgYKQ6X*IXgwE8VbgqOf7rdbLJq7uCRBrdnFPTcUU2NjMgy8x4y6NWrYVwQMteNWh62XnLoNVZqobnsMMGm1OyTW09rhEkmiX5jqk3CI3JIIYbIbd8K7EC0ytQ4Kp4Kro-"
                } - 33118207 == e || -78630688 == e ? vkImage().src = "//rs.mail.ru/d23694799.gif" : -68420747 == e || -121650415 == e ? vkImage().src = "//rs.mail.ru/d25688137.gif" : -18479452 == e && (vkImage().src = "//rs.mail.ru/d25688115.gif")
            },
            onVideoPlayFinished: function() {
                if (window.mvcur && mvcur.mvShown && (mvcur.finished = !0, mvcur.mousemoved = !0, Videoview.moveCheck(), Videoview.logViewedPercentage()), window.mvcur && mvcur.mvShown && mvcur.adData) mvcur.adData.stat_link_start && !mvcur.adData.view_complete_start && (ajax.post(mvcur.adData.stat_link_start, {}, {
                    onDone: function() {},
                    onFail: function() {
                        return !0
                    }
                }), mvcur.adData.view_complete_start = !0), mvcur.adData.stat_link_half && !mvcur.adData.view_complete_half && (ajax.post(mvcur.adData.stat_link_half, {}, {
                    onDone: function() {},
                    onFail: function() {
                        return !0
                    }
                }), mvcur.adData.view_complete_half = !0), mvcur.adData.stat_link_full && !mvcur.adData.view_complete_full && (ajax.post(mvcur.adData.stat_link_full, {}, {
                    onDone: function() {},
                    onFail: function() {
                        return !0
                    }
                }), mvcur.adData.view_complete_full = !0);
                else {
                    var e = Videoview.getMvData();
                    e.tns_monetized ? vkImage().src = "//www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=pladform_videovk-playerend/" + irand(1, 1e9) : vkImage().src = "//www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=platform_videovk-playerend/" + irand(1, 1e9), e.kz && (vkImage().src = "//www.tns-counter.ru/V13a****vk_kz/ru/CP1251/tmsec=vkkz_videoend/" + irand(1, 1e9))
                }
            },
            onVideoPlayError: function() {
                Videoview.isLayerShown() && re("mv_live_gifts_block")
            },
            onVideoAdsLoadStarted: function() {
                vkImage().src = "//www.tns-counter.ru/V13a****vk_com/ru/CP1251/tmsec=vk_videoload-license/" + irand(1, 1e9)
            },
            onVideoAdsPlayStarted: function() {
                vkImage().src = "//www.tns-counter.ru/V13a****vk_com/ru/CP1251/tmsec=vk_videostart-license/" + irand(1, 1e9)
            },
            onVideoAdsPlayFinished: function() {
                vkImage().src = "//www.tns-counter.ru/V13a****vk_com/ru/CP1251/tmsec=vk_videoend-license/" + irand(1, 1e9)
            },
            onViewSegmentsChanged: function(e, i, o, t) {
                if (o && !cur.segmentsSaveProcess) {
                    var a = "vsegs" + vk.id + "_" + e + "_" + i,
                        n = ls.get(a);
                    n && n.ts && vkNow() - n.ts > 864e5 && (n = null, ls.remove(a));
                    var d = n && n.segments ? n.segments.split("|")[2] : "";
                    if (!d || o != d) {
                        cur.segmentsSaveProcess = !0;
                        var r = {
                                module: Videoview.getVideoModule(e + "_" + i),
                                vid: i,
                                oid: e,
                                s: o,
                                prev_s: n ? n.segments : "",
                                prev_sig: n ? n.segmentsSig : "",
                                hash: t
                            },
                            s = parseInt(cur.videoSearchPos);
                        if (isNaN(s) || (r.search_pos = s), ajax.post("al_video.php?act=a_view_segments", r, {
                                onDone: function(e, i, o) {
                                    if (!(0 > e)) {
                                        e && ls.set(a, {
                                            segments: e,
                                            segmentsSig: i,
                                            ts: vkNow()
                                        }), cur.segmentsSaveProcess = !1, o = intval(o);
                                        var t = parseInt(cur.videoSearchPos);
                                        o > 0 && !isNaN(t) && cur.videoSearchStats && (cur.videoSearchStats.positions[t] = extend({
                                            viewedParts: 0
                                        }, cur.videoSearchStats.positions[t]), cur.videoSearchStats.positions[t].viewedParts++)
                                    }
                                }
                            }), cur.videoSearchStats && (cur.videoSearchStats.totalViewedTime || (cur.videoSearchStats.totalViewedTime = 0), cur.videoSearchStats.totalViewedTime += mvcur.mvData.vsegsSize, !isNaN(s))) {
                            cur.videoSearchStats.positions[s] = extend({
                                viewedSeconds: 0
                            }, cur.videoSearchStats.positions[s]);
                            var v = cur.videoSearchStats.positions[s].viewedSeconds;
                            v = Math.min(mvcur.mvData.duration, v + mvcur.mvData.vsegsSize), cur.videoSearchStats.positions[s].viewedSeconds = v
                        }
                    }
                }
            },
            onLike: function(e) {
                Videoview.like(null, !0), Videoview.sendPlayerStats(1, e)
            },
            onAdd: function(e, i, o) {
                Videoview.addSmall(e, i), Videoview.sendPlayerStats(3, o)
            },
            onRemove: function() {
                Videoview.removeVideo()
            },
            onShare: function(e) {
                Videoview.share(), Videoview.sendPlayerStats(2, e)
            },
            onSubscribe: function(e, i) {
                Videoview.subscribeToAuthor(e, "player"), Videoview.sendPlayerStats(e ? 9 : 10, i)
            },
            onDonate: function() {
                Videoview.showDonateBox()
            },
            isInLayer: function(e) {
                return Videoview.isLayerShown(e)
            },
            onLiveViewersCountChange: function(e, i, o) {
                Videoview.isLayerShown(e) && Videoview.updateLiveViewersCount(i, o)
            },
            onLiveStarted: function(e) {
                return Videoview.isLayerShown(e) ? (Videoview.reload(), !0) : void 0
            },
            onLiveEnded: function(e) {
                Videoview.isLayerShown(e) && hide("mv_publish")
            },
            onAdPostStat: function(e, i) {
                window.Wall && Wall.triggerAdPostStat(e, i)
            }
        },
        cleanUpStoredVSegs: function() {
            if (window.localStorage) {
                var e = vkNow();
                for (var i in window.localStorage)
                    if (0 === i.indexOf("vsegs")) {
                        var o = localStorage.getItem(i);
                        o = JSON.parse(o), e - o.ts > 1728e5 && localStorage.removeItem(i)
                    }
            }
        },
        getVideoModule: function(e) {
            var i = cur.currentModule ? cur.currentModule() : cur.module;
            return window.Video && Video.isInVideosList() && (i = cur.oid < 0 ? "community_videos" : cur.oid == vk.id ? "profile_own_videos" : "profile_videos"), "feed" == i && "feed_block" == VideoPlaylist.getCurListId() && (i = "feed_block"), "feed" == i && "videos" == cur.section && (i = "feed_videos"), "feed" == i && "live" == cur.section && (i = "feed_live"), i
        },
        showPlaylist: function() {
            VideoPlaylist.toggle(!0)
        },
        sendPlayerStats: function(e, i) {
            ajax.post("al_video.php?act=a_player_stat", {
                action: e,
                type: i
            })
        },
        removeVideo: function() {
            var e = Videoview.getMvData();
            e && e.deleteFromAllAlbumsHash && (ajax.post("al_video.php?act=a_delete_from_all_albums", {
                vid: e.vid,
                oid: e.oid,
                target_id: vk.id,
                hash: e.deleteFromAllAlbumsHash
            }, {}), e.playlists && each(e.playlists, function(e, i) {
                i.added = !1
            }), window.mvcur && Videoview.initAddButton(), e.added = !1, removeClass(geByClass1("mv_finish_add", "mv_external_finish"), "selected"))
        },
        getNextVideosData: function() {
            return VideoPlaylist.getNextVideos().slice(0, 3)
        },
        getSuggestionsData: function() {
            var e = Videoview.getMvData();
            return e && e.playerSuggestions || []
        },
        getMvData: function() {
            return cur.mvOpts || window.mvcur && mvcur.mvData
        },
        getPlayerObject: function() {
            return window.mvcur && mvcur.player || cur.videoInlinePlayer || ge("video_yt") && window.VideoYoutube || null
        },
        getPlayerObjectEl: function() {
            return ge("video_player") || ge("html5_player") || geByClass1("extra_player") || null
        },
        playerOnAdded: function() {
            var e = Videoview.getPlayerObject();
            e && e.onAdded && e.onAdded()
        },
        playerOnLiked: function() {
            var e = Videoview.getPlayerObject();
            e && e.onLiked && e.onLiked()
        },
        playerOnResize: function() {
            mvcur.player && mvcur.player.resize(), ge("video_yt") && window.VideoYoutube && VideoYoutube.onResize()
        },
        playerNextTimerUpdate: function() {
            var e;
            mvcur.scrolledAway || mvcur.replyFormShown || "visible" != document.visibilityState || curBox() ? (e = "nextTimerReset", mvcur.nextTimerStopped = !0) : (e = "nextTimerStart", mvcur.nextTimerStopped = !1), mvcur.playerPrevTimerFunc != e && (mvcur.playerPrevTimerFunc = e, clearTimeout(mvcur.playerTimerDebounce), mvcur.playerTimerDebounce = setTimeout(function() {
                var i = Videoview.getPlayerObject();
                i && i[e] && i[e](), mvcur.nextTimer && mvcur.nextTimer[e] && mvcur.nextTimer[e]()
            }, 0))
        },
        togglePlay: function(e, i) {
            if (ge("video_yt") && window.VideoYoutube) VideoYoutube.togglePlay(e);
            else if (window.mvcur && mvcur.player || cur.videoInlinePlayer) {
                var o = window.mvcur && mvcur.player || cur.videoInlinePlayer,
                    t = o.isAutoplay();
                (!t || i) && o.togglePlay(e)
            } else {
                var o = ge("video_player");
                o && o.playVideo && o.playVideo(e)
            }
        },
        sendVideoAdStat: function(e, i, o) {
            if (cur._vadStatQueue && cur._vadStatQueue[e + "_" + i]) {
                var t = cur._vadStatQueue[e + "_" + i],
                    a = "undefined" != typeof cur.vSearchPos && null !== cur.vSearchPos;
                t.events.length && (ajax.post("al_video.php", {
                    act: "ads_stat",
                    ev: t.events.join(","),
                    ad_type: t.type,
                    hash: o,
                    oid: e,
                    vid: i,
                    err: t.err,
                    pl_type: t.pl_type,
                    from_search: a
                }), t.events = [])
            }
        },
        subscribeToAuthor: function(e, i) {
            function o() {
                toggleClass("mv_subscribe_block", "mv_state_subscribed", e), ajax.post("al_video.php?act=a_subscribe", {
                    author_id: t.authorId,
                    video: t.videoRaw,
                    hash: t.subscribeHash,
                    unsubscribe: intval(!e),
                    from: i || "videoview"
                }, {}), t.subscribed = e;
                var o = Videoview.getPlayerObject();
                o && o.onSubscribed && o.onSubscribed(e);
                var a = ge("mv_finish_subscribe_btn");
                a && (val(a, getLang(e ? "video_view_subscribed_msg" : "video_view_subscribe_to_author")), toggleClass("mv_finish_subscribe", "mv_finish_subscribed", e))
            }
            var t = Videoview.getMvData();
            if (e || !t.isClosedGroup && !t.isFriend) o();
            else {
                var a, n;
                t.isFriend ? (a = getLang("video_unfollow_friend_title"), n = getLang("video_unfollow_friend_text")) : (a = getLang("video_leave_closed_group_title"), n = t.adminLevel > 2 ? getLang("video_leave_admined_group_text") : getLang("video_leave_closed_group_text"));
                var d = function() {
                    curBox().hide(), o()
                };
                showFastBox(a, n, getLang("box_yes"), d, getLang("box_no")), Videoview.playerNextTimerUpdate()
            }
        },
        subscribeLive: function(e, i) {
            var o = Videoview.getMvData(),
                t = !o.liveNotifySubscribed;
            ajax.post("al_video.php?act=a_subscribe_live", {
                owner_id: o.authorId,
                subscribe: intval(t),
                hash: i
            }, {}), o.liveNotifySubscribed = !o.liveNotifySubscribed, toggleClass(e, "mv_subscribe_live_btn_subscribed", t), Videoview.onSubscribeLiveOver(e), window.tooltips && e.tt && tooltips.rePositionTT(e.tt)
        },
        onSubscribeLiveOver: function(e) {
            var i = Videoview.getMvData();
            showTooltip(e, {
                text: function() {
                    return getLang(i.liveNotifySubscribed ? "video_live_notify_subscribed" : "video_live_notify_unsubscribed")
                },
                black: 1,
                shift: [0, 10, 0],
                needLeft: 1
            })
        },
        showDonateBox: function() {
            var e = Videoview.getMvData();
            e && showBox("al_video.php?act=donate_box", {
                video: e.videoRaw
            }, {
                params: {
                    hideButtons: 1,
                    onDestroy: VideoDonate.onDestroy
                },
                stat: ["videoview.css", "tooltips.js", "tooltips.css"]
            })
        },
        slideLiveGifts: function(e, i, o) {
            var t = ge("mv_live_gifts_list"),
                a = t.scrollWidth,
                n = domPN(t).clientWidth;
            e = e || 1, i = Math.abs(i) || n - 180;
            var d = intval(domData(t, "pos"));
            d += 0 > e ? -i : i, d = Math.max(0, Math.min(a - n, d)), domData(t, "pos", d), toggleClass(t, "animated", !o), setStyle(t, {
                "-webkit-transform": "translateX(-" + d + "px)",
                "-ms-transform": "translateX(-" + d + "px)",
                transform: "translateX(-" + d + "px)"
            }), Videoview.onLiveGiftsScroll()
        },
        onLiveGiftsMouseWheel: function(e) {
            !e.deltaX || Math.abs(e.deltaY) > Math.abs(e.deltaX) || (e.preventDefault(), Videoview.slideLiveGifts(e.deltaX, e.deltaX, !0))
        },
        onLiveGiftsScroll: function() {
            var e = ge("mv_live_gifts_list");
            if (e) {
                var i = domPN(e),
                    o = e.scrollWidth,
                    t = domPN(e).clientWidth,
                    a = intval(domData(e, "pos"));
                a > o - t && (Videoview.slideLiveGifts(1, 1, 1), a = intval(domData(e, "pos")));
                var n = a > 0,
                    d = o > a + t,
                    r = domByClass(i, "mv_live_gifts_arrow_left"),
                    s = domByClass(i, "mv_live_gifts_arrow_right");
                toggleClass(r, "hidden", !n), toggleClass(s, "hidden", !d), mvcur.liveGiftTT && mvcur.liveGiftTT.hide()
            }
        },
        getLiveBalanceStr: function() {
            var e;
            return e = mvcur.mvData.paymentsInMoney ? getLang("global_money_amount_rub", vk.balance * vk.vcost, !0) : getLang("global_n_votes", vk.balance, !0), langStr(getLang("video_live_you_have_X_money"), "money", e)
        },
        showLiveGiftTooltip: function(e) {
            if (!data(e, "ett")) {
                Videoview.checkLiveGiftItemVisibility(e);
                var i = domData(e, "id"),
                    o = domData(e, "price"),
                    t = domData(e, "price-str"),
                    a = domData(e, "free-left"),
                    n = getTemplate("video_live_gift_popup", {
                        gift_id: i,
                        image: "/images/gift/" + i + "/256.png",
                        price: o,
                        price_str: t,
                        balance_str: a || Videoview.getLiveBalanceStr()
                    });
                addClass(e, "active");
                var d = mvcur.liveGiftTT = new ElementTooltip(e, {
                    cls: "feature_intro_tt mv_live_gift_popup_tt",
                    content: n,
                    width: 230,
                    autoShow: !1,
                    appendTo: domClosest("mv_live_gifts_block", e),
                    offset: [0, 14],
                    onBeforeHide: function() {
                        removeClass(e, "active")
                    },
                    onHide: function() {
                        d.destroy()
                    }
                });
                d.show()
            }
        },
        checkLiveGiftItemVisibility: function(e) {
            var i = ge("mv_live_gifts_list"),
                o = domPN(i),
                t = e.getBoundingClientRect(),
                a = (i.getBoundingClientRect(), o.getBoundingClientRect()),
                n = 32;
            if (t.left < a.left + n) {
                var d = t.left - a.left - n;
                return void Videoview.slideLiveGifts(-1, d, !0)
            }
            if (t.right > a.right - n) {
                var d = t.right - a.right + n;
                Videoview.slideLiveGifts(1, d, !0)
            }
        },
        sendLiveGift: function(e, i, o) {
            return Videoview.liveDonateCheckVotes(i) ? void mvcur.liveGiftTT.hide() : (ajax.post("al_video.php?act=live_send_gift", {
                owner_id: mvcur.mvData.oid,
                video_id: mvcur.mvData.vid,
                gift_id: e,
                hash: o
            }, {
                onDone: function(i, o) {
                    if (updateMoney(i), o) {
                        var t = domByClass("mv_live_gifts_block", "mv_live_gifts_item_" + e);
                        each(o, function(e, i) {
                            e = e.replace(/_/g, "-"), domData(t, e, i)
                        })
                    }
                },
                onFail: function(e) {
                    return e ? (showFastBox(getLang("global_error"), e), !0) : void 0
                }
            }), void mvcur.liveGiftTT.hide())
        },
        showLiveSuperMessageTooltip: function(e) {
            if (!data(e, "ett")) {
                addClass(e, "active");
                var i = getTemplate("video_live_super_message_popup", {
                        message: mvcur.liveSuperMessageDraft || ""
                    }),
                    o = mvcur.liveGiftTT = new ElementTooltip(e, {
                        cls: "feature_intro_tt mv_live_gift_popup_tt",
                        content: i,
                        width: 230,
                        autoShow: !1,
                        appendTo: domClosest("mv_live_gifts_block", e),
                        offset: [0, 14],
                        onBeforeHide: function() {
                            removeClass(e, "active")
                        },
                        onHide: function() {
                            o.destroy()
                        }
                    });
                o.show(), elfocus("mv_live_gift_popup_comment_input")
            }
        },
        checkLiveSuperMessageLength: function(e, i) {
            var o = trim(val(e)),
                t = intval(domData(e, "maxlength"));
            mvcur.liveSuperMessageDraft = o;
            var a = o.length > t,
                n = domNS(e),
                d = domNS(n);
            toggle(n, !a), toggle(d, a), i && n.click()
        },
        onLiveSuperMessageCtrlEnter: function() {
            var e = ge("mv_live_gift_popup_comment_input");
            Videoview.checkLiveSuperMessageLength(e, !0)
        },
        sendLiveSuperMessage: function(e, i) {
            var o = ge("mv_live_gift_popup_comment_input"),
                t = trim(val(o));
            return t ? Videoview.liveDonateCheckVotes(e) ? void mvcur.liveGiftTT.hide() : (ajax.post("al_video.php?act=live_send_super_message", {
                owner_id: mvcur.mvData.oid,
                video_id: mvcur.mvData.vid,
                message: t,
                hash: i
            }, {
                onDone: function(e, i) {
                    updateMoney(e), delete mvcur.liveSuperMessageDraft
                },
                onFail: function(e) {
                    return e ? (showFastBox(getLang("global_error"), e), !0) : void 0
                }
            }), void mvcur.liveGiftTT.hide()) : void notaBene(o)
        },
        liveDonateCheckVotes: function(e) {
            return vk.balance < e ? showBox("al_gifts.php?act=get_money") : !1
        },
        onStickersPurchased: function(e) {
            var i = Videoview.getPlayerObject();
            i && i.onStickersPurchased && i.onStickersPurchased(e)
        },
        addPlaylist: function(onlyPrivate) {
            showBox("al_video.php?act=add_playlist_box", {
                oid: mvcur.mvData.oid,
                vid: mvcur.mvData.vid,
                only_private: onlyPrivate ? 1 : 0,
                hash: mvcur.mvData.addedVideoHash
            }, {
                onDone: function(box) {
                    box.removeButtons(), box.addButton(getLang("Save"), function(btn) {
                        var title = trim(val("mv_video_playlist_edit_title")),
                            privacy = Privacy.getValue("video_playlist");
                        title && ajax.post("al_video.php?act=a_save_playlist", {
                            title: title,
                            privacy: privacy,
                            hash: val("video_playlist_edit_hash"),
                            oid: mvcur.mvData.oid,
                            vid: mvcur.mvData.vid
                        }, {
                            showProgress: lockButton.pbind(btn),
                            hideProgress: unlockButton.pbind(btn),
                            onDone: function(playlistId, text, playlist, video) {
                                curBox().hide(), text && showDoneBox(text), mvcur.mvData.playlists.push({
                                    id: playlistId,
                                    added: !0,
                                    title: clean(title),
                                    "private": intval(privacy)
                                }), Videoview.initAddButton(), window.Video && playlist && (playlist = eval("(" + playlist + ")"), Video.updateAlbum(playlistId, !1, playlist), video && (video = eval("(" + video + ")"), Video.updateVideo(vk.id, video, [], !1, [playlistId])))
                            }
                        })
                    })
                },
                stat: ["privacy.js", "privacy.css", "video.js", "video.css"]
            }), Videoview.playerNextTimerUpdate()
        },
        updateVideo: function(e, i, o, t, a) {
            window.mvcur && mvcur.mvData.oid == e && mvcur.mvData.vid == i && (mvcur.mvData.title = o, mvcur.mvData.desc = t, Videoview.setTitle(), Videoview.setDesc(), a && mvcur.mvShown && Videoview.reload())
        },
        setAddButtonStateAdded: function() {
            window.mvcur && mvcur.mvShown && (mvcur.mvData.published = !0, triggerEvent("mv_add_button", "setAdded"))
        },
        initAddButton: function() {
            function e() {
                mvcur.addButtonTT = mvcur.addButtonTT || new ElementTooltip(r, {
                    cls: "mv_add_eltt",
                    elClassWhenShown: "mv_no_active",
                    autoShow: !0,
                    noHideOnClick: !0,
                    onFirstTimeShow: function(e) {
                        function i(e) {
                            var i = mvcur.addButtonTT.getContent();
                            toggleClass(i, "mv_add_eltt_add_playlist_hover", e)
                        }
                        var o = '<div id="mv_pl_tt">' + (d ? '<div class="mv_tt_private_only">' + getLang("video_only_private_video") + "</div>" : "") + '<div class="mv_tt_playlists' + (d ? " with_border" : "") + '">';
                        each(mvcur.mvData.playlists, function(e, i) {
                            var t = i["private"] ? '<span class="mv_tt_playlist_private_icon" onmouseover="showTooltip(this,{black:1,text: \'' + getLang("video_album_is_private_tt") + "', shift:[16, 8, 0]})\"></span>" : "",
                                a = '<div class="checkbox' + (i.added ? " on" : "") + (i.disabled ? " disabled" : "") + '" data-id="' + i.id + '" onclick="checkbox(this);">' + i.title + "</div>" + t;
                            o += '<div class="mv_tt_playlist">' + a + "</div>"
                        }), o += "</div>", o += '<div class="mv_tt_add_playlist" role="link" tabindex="0" onclick="Videoview.addPlaylist(' + d + ')"><span class="mv_tt_plus_icon"></span>' + (d ? getLang("video_add_private_album") : getLang("video_add_album")) + "</div></div>", e.innerHTML = o, each(geByClass("checkbox", e), function() {
                            addEvent(this, "click", a)
                        });
                        var t = domByClass(e, "mv_tt_add_playlist");
                        addEvent(t, "mouseenter", i.pbind(!0)), addEvent(t, "mouseleave", i.pbind(!1)), updateAriaCheckboxes()
                    },
                    onDestroy: function(e) {
                        e && (each(geByClass("checkbox", e), function() {
                            removeEvent(this)
                        }), removeEvent(domByClass(e, "mv_tt_add_playlist")))
                    }
                })
            }

            function i(e, i, t) {
                e = n ? !0 : e;
                var d = geByClass1("mv_added_icon", r),
                    v = geByClass1("mv_plus_icon", r),
                    l = geByClass1("mv_add_text", r);
                toggleClass(v, "mv_add_icon_curr", !e), toggleClass(v, "mv_add_icon_down", e), toggleClass(d, "mv_add_icon_curr", e), removeEvent(r, "click", o), removeEvent(r, "setAdded", o), e ? (l.innerHTML = getLang("video_added_to_my_playlist"), i && a(!1, mvcur.mvData.PLAYLIST_ADDED_ID)) : (l.innerHTML = getLang("video_add_to_my_playlist"), addEvent(r, "click", o), addEvent(r, "setAdded", o)), t || s == e || Videoview.playerOnAdded(), s = e;
                var c = Videoview.getMvData();
                c.added = e
            }

            function o(e) {
                "click" == e.type && isAncestor(e.target, mvcur.addButtonTT.getContent()) || (Videoview._isCurrentVideoPublished() ? d && "click" == e.type || i(!0, !0, "setAdded" == e.type) : Videoview.showAddDialog(mvcur.videoRaw))
            }

            function t() {
                var e = !1;
                return each(mvcur.mvData.playlists, function(i, o) {
                    return o.added ? (e = !0, !1) : void 0
                }), e
            }

            function a(e, o) {
                var a = !0;
                if (e) {
                    var n = e.currentTarget || e.target;
                    if (hasClass(n, "disabled")) return;
                    a = isChecked(n), o = +n.getAttribute("data-id")
                } else mvcur.addButtonTT.getContent() && each(geByClass("checkbox", mvcur.addButtonTT.getContent()), function() {
                    return domData(this, "id") == o ? (checkbox(this), !1) : void 0
                });
                each(mvcur.mvData.playlists, function(e, i) {
                    return i.id == o ? (i.added = a, !1) : void 0
                }), ajax.post("al_video.php?act=a_add_to_playlist", {
                    oid: mvcur.mvData.oid,
                    vid: mvcur.mvData.vid,
                    hash: mvcur.mvData.playlistAddHash,
                    playlist_id: o,
                    add: +a,
                    info: window.Video && Video.isInCatalog() ? VideoPlaylist.getCurListId() : ""
                }, {
                    onDone: function(e) {
                        var i = [],
                            t = [];
                        if (a) {
                            i.push(o);
                            var n = e.indexOf(o);
                            e.splice(n, 1)
                        } else t.push(o), e.push(o);
                        mvcur.mvData.info && window.Video && !Video.isInCatalog() && Video.updateVideo(vk.id, mvcur.mvData.info, e, !1, i, t)
                    }
                }), e && (i(t()), cancelEvent(e))
            }
            mvcur.addButtonTT && (mvcur.addButtonTT.destroy(), mvcur.addButtonTT = null);
            var n = mvcur.mvData.uploaded,
                d = mvcur.mvData.noPublicAdd,
                r = ge("mv_add_button"),
                s = !1;
            r && (i(n || t(), !1, !0), e())
        },
        locNav: function(e, i, o) {
            o = nav.toStr(o);
            var t = o.match(/^video(-?\d+_\d+)$/);
            return t ? void 0 : void Videoview.hide()
        },
        showPlayer: function(e) {
            var i = ge("video_player");
            i && (e || !i.getAttribute("preventhide") || browser.safari_mobile) && (browser.msie && setStyle(i, {
                position: "static",
                top: 0
            }), browser.safari_mobile ? show(i) : i.style.visibility = "visible")
        },
        hidePlayer: function(e) {
            var i = ge("video_player");
            i && (e || !i.getAttribute("preventhide") || browser.safari_mobile) && (browser.msie && setStyle(i, {
                position: "absolute",
                top: "-5000px"
            }), browser.safari_mobile ? hide(i) : i.style.visibility = "hidden")
        },
        init: function() {
            window.mvcur = {}, window.mvLayer || (window.mvLayer = ce("div", {
                id: "mv_layer"
            }), addEvent(mvLayer, "mousemove", function() {
                mvcur.mousemoved = !0, mvcur.blackout && Videoview.moveCheck()
            }), window.mvLayerWrap = ce("div", {
                id: "mv_layer_wrap",
                className: "fixed layer_wrap"
            }), mvLayerWrap.appendChild(window.mvLayer), bodyNode.appendChild(mvLayerWrap), setStyle(mvLayer, {
                width: lastWindowWidth - sbWidth() - 2 + "px"
            }), addEvent(mvLayerWrap, "scroll", Videoview.viewScroll))
        },
        moveCheck: function() {
            mvcur.mousemoved ? mvcur.blackout && (mvcur.blackout = !1, isVisible(layerBG) ? animate(layerBG, {
                opacity: .8
            }, 200) : setStyle(layerBG, {
                opacity: .8
            })) : mvcur.blackout || mvcur.finished || !isVisible(layerBG) || (mvcur.blackout = !0, animate(layerBG, {
                opacity: .9
            }, 5e3)), mvcur.mousemoved = !1
        },
        show: function(e, i, o, t) {
            window.ap && ap.isPlaying() && (ap.pause(), ap.pausedByVideo = vkNow()), t && t.autoplay && Videoview.playerCallback.onVideoStreamPlaying(), debugLog("show video " + i);
            var a = window.mvcur && mvcur.mvShown,
                n = window.mvcur && mvcur.player;
            if (a && (n && domPN(n.el) === ge("video_player") ? n.deinitVideo() : (val("mv_player_box", ""), hide("mv_player_box"), show("mv_progress_box"))), window.mvcur && clearInterval(mvcur.nextTimerUpdateInterval), window.mvcur && mvcur.minimized) {
                if (!t.nomin) return mvcur.videoRaw = i, mvcur.options = t, mvcur.listId = o, mvcur.mvData = !1, t.playlistId ? Videoview.initPlaylistBlock(i, t.playlistId, t.catLoadMore) : VideoPlaylist.removeBlock(), !0;
                t.prevLoc && (mvcur.mvPrevLoc = t.prevLoc), debugLog("unminimizing in show"), Videoview.unminimize(!0, !1, !0)
            }
            if (t.queue && (debugLog("pushing in videoview.show"), layerQueue.push(), t.queue = !1), !t.noLocChange && nav.objLoc.z && 0 == nav.objLoc.z.indexOf("video") && (cur.mvHistoryBack = cur.mvHistoryBack || 1, cur.mvHistoryBack++), window.forcePauseAudio = !0, a || layerQueue.hide(), window.forcePauseAudio = !1, this.init(), mvcur.showTime = (new Date).getTime(), removeEvent(window, "resize", Videoview.onResize), removeEvent(window, "focus blur", Videoview.onPageFocusChange), removeEvent(document, "webkitfullscreenchange mozfullscreenchange fullscreenchange", Videoview.onFullscreenChange), removeEvent(document, "keydown", Videoview.onKeyDown), addEvent(window, "resize", Videoview.onResize), addEvent(window, "focus blur", Videoview.onPageFocusChange), addEvent(document, "webkitfullscreenchange mozfullscreenchange fullscreenchange", Videoview.onFullscreenChange), addEvent(document, "keydown", Videoview.onKeyDown), boxQueue.hideAll(), layers.wrapshow(mvLayerWrap, .8), layers.fullhide = Videoview.hide, mvcur.nextTimerUpdateInterval = setInterval(Videoview.playerNextTimerUpdate, 1e3), setTimeout(function() {
                    layers.wrapshow(mvLayerWrap, .8), layers.fullhide = Videoview.hide
                }, 0), mvcur.noLocChange = 0, t.ad_video && (t.hideInfo = 1, t.noLocChange = 1, mvcur.noLocChange = 1, mvcur.videoAds = 1), mvcur.noHistory = t.noLocChange || t.noHistory, mvcur.blackInterval = setInterval(Videoview.moveCheck, 18e4), mvcur.videoRaw = i, mvcur.options = t, mvcur.listId = o, mvcur.mvData = !1, mvcur.mvShown = !0, mvcur.player = n, t.prevLoc ? mvcur.mvPrevLoc = t.prevLoc : setTimeout(function() {
                    var e = document.URL;
                    Videoview.setLocation(t.noLocChange), e == document.URL && (e = ""), setTimeout(window.comScoreUDM && comScoreUDM.pbind(locProtocol + "//" + locHost + "/al_video.php?comscorekw=pageview_candidate", e), 10)
                }, 0), e && e.pageX && e.pageY && extend(mvcur, {
                    mvOldX: e.pageX,
                    mvOldY: e.pageY,
                    mvOldT: vkNow()
                }), a ? (Videoview.disableLayerContent(), VideoChat.destroy()) : Videoview.buildLayerContent(), toggle("mv_info", !t.hideInfo), t.expandPlayer) {
                mvcur.player = t.expandPlayer, t.expandPlayer = 1;
                var d = domClosest("video_box_wrap", mvcur.player.el);
                ge("mv_player_box").appendChild(d), hide("mv_progress_box"), show("mv_player_box"), mvcur.player.onExpanded()
            }
            return t.playlistId ? Videoview.initPlaylistBlock(i, t.playlistId, t.catLoadMore, !a) : VideoPlaylist.removeBlock(), Videoview.cleanUpStoredVSegs(), t.minimized && setTimeout(Videoview.minimize.bind(Videoview), 0), !1
        },
        buildLayerContent: function() {
            var e = "mv_dark";
            addClass(window.mvLayerWrap, e), addClass(window.layerBG, e), val(mvLayer, '<div class="mv_layer_bg" onclick="Videoview.hide();"></div><div id="mv_container" class="scroll_fix_wrap">  <div id="mv_box">    <div id="mv_approve" style="display: none;"></div>    <div id="mv_publish" style="display: none;"></div>    <div class="mv_min_header">      <div class="mv_min_control" onmousedown="return Videoview.hide(false, true);" role="button" tabindex="0" aria-label="' + getLang("global_close") + '">        <div class="mv_min_control_close"></div>      </div>      <div class="mv_min_control" onclick="return Videoview.unminimize();">        <div class="mv_min_control_max"></div>      </div>      <div class="mv_min_title" id="mv_min_title"></div>    </div>    <div id="mv_main" class="mv_main">      <div class="mv_pl_prev_wrap">        <div class="mv_playlist_controls" id="mv_pl_prev" onclick="return VideoPlaylist.prevVideo()">          <div class="mv_playlist_controls_icon"></div>        </div>      </div>      <div class="mv_pl_next_wrap">        <div class="mv_playlist_controls" id="mv_pl_next" onclick="return VideoPlaylist.nextVideo()">          <div class="mv_playlist_controls_icon"></div>        </div>      </div>      <div id="mv_progress_box">' + getProgressHtml() + '</div>      <div id="mv_player_box"></div>      <div class="mv_top_controls_wrap">        <div id="mv_top_controls">          <div onclick="return Videoview.hide(false, true, event, true);" class="mv_top_button mv_top_close" role="button" tabindex="0" aria-label="' + getLang("global_close") + '">            <div class="mv_close_icon"></div>          </div>          <div onclick="return Videoview.minimize(event);" class="mv_top_button mv_top_minimize">            <div class="mv_minimize_icon"></div>          </div>          <div onclick="return Videoview.toggleSideBlock(event);" class="mv_top_button mv_top_toggle_sideblock" id="mv_top_pl_toggle" role="button" tabindex="0">            <div class="mv_toggle_sideblock_icon"></div>          </div>        </div>      </div>    </div>    <div id="mv_moder_buttons_wrap">      <div id="mv_moder_buttons"></div>    </div>    <div class="mv_info" id="mv_info"></div>    <div id="mv_warning" style="display: none;"></div>  </div></div>  '), Videoview.updateSize()
        },
        disableLayerContent: function() {
            addClass("mv_info", "mv_info_disabled")
        },
        initPlaylistBlock: function(e, i, o, t) {
            if (-127333786 != e.split("_")[0]) {
                var a = !!VideoPlaylist.getBlock(),
                    n = VideoPlaylist.buildBlock(i, e, t);
                if (n && /^wall_/.test(i) && VideoPlaylist.lists[i] && cur.wallVideos && cur.wallVideos[i] && (VideoPlaylist.extendList(i, cur.wallVideos[i].list), VideoPlaylist.updateBlockList(i)), n) {
                    ge("mv_main").appendChild(n);
                    var d = VideoPlaylist.getCurList().list.length;
                    (window.Video && Video.isInVideosList() && vk.id == cur.oid || 5 > d) && (a || VideoPlaylist.toggle(!1)),
                    isFunction(o) && o(VideoPlaylist.updateBlockList.pbind(i)), setTimeout(function() {
                        VideoPlaylist.restoreScrollPos(), VideoPlaylist.updateScrollbar(), VideoPlaylist.setCurVideo(e, a)
                    }, 0)
                }
                VideoPlaylist.toggleStateClasses(), VideoPlaylist.updateControls()
            }
        },
        hide: function(e, i, o, t) {
            if (window.mvcur && (i || mvcur.mvShown)) {
                if (t) {
                    var a = cur.videoBackOnClick;
                    if (cur.videoBackOnClick = !1, a) return history.back()
                }
                if (!i && mvcur.minimized) return void(mvcur.noLocChange || e === !0 || (2 === e ? nav.setLoc(hab.getLoc()) : layerQueue.count() || Videoview.backLocation()));
                if (!mvcur.noHistory && !e && !t) {
                    mvcur.noHistory = 1, mvcur.forceHistoryHide = i, __adsUpdate("very_lazy");
                    var n = cur.mvHistoryBack ? -cur.mvHistoryBack : -1;
                    return cur.mvHistoryBack = 0, setTimeout(function() {
                        mvcur.mvShown || (Videoview.destroyPlayer(), VideoPlaylist.removeBlock())
                    }, 10), history.go(n)
                }
                if (mvcur.forceHistoryHide && (i = mvcur.forceHistoryHide, mvcur.forceHistoryHide = !1), mvcur.statusVideo) {
                    var d = ge("mv_like_icon");
                    if (d) {
                        var r = d.parentNode.tt;
                        r && r.container && re(r.container), d.parentNode.tt && delete d.parentNode.tt
                    }
                }
                var s = mvcur.minimized;
                if (s && (Videoview.unminimize(!0, !0, !0), mvcur.minimized = !1, e = !0), Wall.cancelEdit(!0), mvcur.replyFormShown && Wall.hideEditReply(mvcur.post), (mvcur.mvData.duration > 60 || mvcur.mvData.is_live) && !i && !mvcur.finished) {
                    var v = (new Date).getTime() - mvcur.showTime,
                        l = getLang("video_are_you_sure_close");
                    if (v > 3e4 && "are you sure close" != l && !browser.safari_mobile) {
                        var c = showFastBox({
                                title: getLang("video_are_you_sure_close_title"),
                                bodyStyle: "padding: 20px; line-height: 160%;",
                                dark: 1,
                                forceNoBtn: 1
                            }, l, getLang("box_yes"), function() {
                                c.hide(), Videoview.hide(e, !0)
                            }, getLang("box_no")),
                            m = function(i) {
                                13 == i.keyCode && (c.hide(), Videoview.hide(e, !0))
                            };
                        return addEvent(document, "keydown", m), c.onHide = function() {
                            removeEvent(document, "keydown", m)
                        }, !0
                    }
                }
                cur.vSearchPos && delete cur.vSearchPos, cur.vSearchLastActionTime && (cur.vSearchLastActionTime = (new Date).getTime()), mvcur.finished || Videoview.logViewedPercentage(), window.forcePauseAudio || (window.ap && !ap.isPlaying() && ap.pausedByVideo && (vkNow() - ap.pausedByVideo < 18e4 && ap.play(), delete ap.pausedByVideo), window.Notifier && Notifier.lcSend("video_hide")), s ? hide(mvLayerWrap) : (layers.wraphide(mvLayerWrap), layers.fullhide = !1), window.tooltips && tooltips.destroyAll(cur.mvBox);
                var u = "mv_dark";
                removeClass(mvLayerWrap, u), removeClass(layerBG, u), mvcur.mvShown = !1, removeEvent(window, "resize", Videoview.onResize), removeEvent(document, "webkitfullscreenchange mozfullscreenchange fullscreenchange", Videoview.onFullscreenChange), removeEvent(document, "keydown", Videoview.onKeyDown), clearInterval(mvcur.nextTimerUpdateInterval), mvcur.addButtonTT && (mvcur.addButtonTT.destroy(), mvcur.addButtonTT = null), Videoview.removeExternalVideoFinishBlock(), Videoview.destroyPlayer(), val("mv_player_box", "");
                VideoPlaylist.getBlock();
                return s && isVisible(layerWrap) || (debugLog("pop from videoview.hide"), setTimeout(layerQueue.pop, 0)), mvcur.blackInterval && clearInterval(mvcur.blackInterval), t && nav.objLoc.z ? (layerQueue.skipVideo = !0, delete nav.objLoc.z, nav.setLoc(nav.objLoc)) : mvcur.noLocChange || e === !0 || (2 === e ? nav.setLoc(hab.getLoc()) : Videoview.backLocation(), __adsUpdate("very_lazy")), __adsUpdate(), mvcur.bodyScrollTop = scrollNode.scrollTop, setTimeout(function() {
                    void 0 !== mvcur.bodyScrollTop && (scrollNode.scrollTop = mvcur.bodyScrollTop, delete mvcur.bodyScrollTop)
                }, 0), !1
            }
        },
        destroyPlayer: function() {
            mvcur.player && (mvcur.player.destroy(), delete mvcur.player), ge("video_yt") && window.VideoYoutube && VideoYoutube.destroy()
        },
        cmp: function(e, i) {
            var o = e.length,
                t = i.length;
            return t > o ? -1 : o > t ? 1 : i > e ? -1 : e > i ? 1 : 0
        },
        onKeyDown: function(e) {
            return e.returnValue === !1 ? !1 : e.keyCode == KEY.ESC ? (mvcur.mvEditing ? Videoview.cancelInline() : Videoview.hide(), cancelEvent(e)) : void 0
        },
        onResize: function() {
            Videoview.updateExternalVideoFinishBlock(), Videoview.updateReplyFormPos(), Videoview.onLiveGiftsScroll(), VideoChat.onResize()
        },
        onPageFocusChange: function() {
            setTimeout(Videoview.playerNextTimerUpdate, 10)
        },
        onFullscreenChange: function() {
            Videoview.updateExternalVideoFinishBlock(), mvcur.chatMode && (VideoChat.onResize(), VideoChat.updateScroll())
        },
        updateSize: function() {
            if (mvcur.minimized) return !1;
            var e = document.documentElement,
                i = window.innerHeight || e.clientHeight || bodyNode.clientHeight,
                o = 2;
            isVisible("mv_info") || (o = 1.2), setStyle("mv_container", {
                marginTop: Math.max((i - 800) / o, 60) + "px"
            }), onBodyResize(), Videoview.onResize()
        },
        getPrevLoc: function() {
            mvcur.mvPrevLoc = {};
            for (var e in nav.objLoc) "z" == e && nav.objLoc[e].match(new RegExp("^video" + mvcur.videoRaw, "")) || (mvcur.mvPrevLoc[e] = nav.objLoc[e])
        },
        setLocation: function(e) {
            if (mvcur.options.fromPreload) {
                var i = mvcur.listId.match(new RegExp("([a-z]*)([0-9-]*)")),
                    o = mvcur.listId.match(new RegExp("claim=([0-9]+)")),
                    t = parseInt(i[2]);
                mvcur.mvPrevLoc = {
                    0: "videos" + t
                }, "videos" != i[1] && (mvcur.mvPrevLoc.section = i[1]), o && o[1] && (mvcur.mvPrevLoc.claim = o[1])
            } else e ? mvcur.mvPrevLoc = "z" : Videoview.getPrevLoc();
            if (!e) {
                var a = "video" + mvcur.videoRaw;
                mvcur.listId && (a += "/" + mvcur.listId), mvcur.options.playlistId && (a += "/pl_" + mvcur.options.playlistId);
                var n = extend(nav.objLoc, {
                    z: a
                });
                /^video-?\d+/.test(nav.objLoc[0]) && (n[0] = "videos" + cur.oid), nav.strLoc != nav.toStr(n) && (nav.setLoc(n), (mvcur.options || {}).fromQueue && (mvcur.noHistory = 1)), mvcur.options && (mvcur.options.fromQueue = !1)
            }
        },
        backLocation: function() {
            if ("z" == mvcur.mvPrevLoc || !mvcur.mvPrevLoc && nav.objLoc.z) {
                var e = clone(nav.objLoc);
                delete e.z, nav.setLoc(e)
            } else mvcur.mvPrevLoc ? nav.setLoc(mvcur.mvPrevLoc) : ("video" == nav.objLoc[0] || nav.objLoc[0].match(/^video-?\d+_\d+/)) && nav.setLoc({
                0: "video"
            });
            mvcur.options.prevTitle && (window.document.title = replaceEntities(stripHTML(mvcur.options.prevTitle)), delete mvcur.options.prevTitle), mvcur.noHistory = 1
        },
        highlightComment: function(e) {
            if (e = ge(e)) {
                var i = animate.pbind(e, {
                        backgroundColor: "#ECEFF3"
                    }, 200, function() {
                        setTimeout(function() {
                            animate(e, {
                                backgroundColor: "#FFF"
                            }, 200)
                        }, 1e3)
                    }),
                    o = getXY(e, !0)[1];
                0 > o || o > lastWindowHeight - 200 ? animate(mvLayerWrap, {
                    scrollTop: mvLayerWrap.scrollTop + o - 50
                }, 300, i) : i()
            }
        },
        showComment: function(e) {
            var i = ge("post" + e);
            return i ? Videoview.highlightComment(i) : Videoview.moreComments(e), !1
        },
        commActionDone: function(commId, from, text, del, script) {
            var node = ge("post" + commId.split("_").join("video_") + from);
            if (node) {
                var comment = domByClass(node, "reply_wrap"),
                    msg = domByClass(node, "dld");
                if (!text) return re(msg), show(comment), "mv" == from ? (++mvcur.mvData.commcount, ++mvcur.mvData.commshown) : (++cur.commentsCount, ++cur.commentsShown), void Videoview.updateCommentsHeader(from);
                hide(comment), node.appendChild(se(text)), del ? ("mv" == from ? (--mvcur.mvData.commcount, --mvcur.mvData.commshown) : (--cur.commentsCount, --cur.commentsShown), Videoview.updateCommentsHeader(from)) : "mv" == from && Videoview.recache(), script && eval(script), Videoview.updateReplyFormPos()
            }
        },
        commAction: function(e, i, o, t, a) {
            var n = ge("post" + i + "video_" + o + a),
                d = domByClass(n, "post_actions"),
                r = ge("reply_" + e + i + "video_" + o + a);
            attr(n, "data-action", e), r && tooltips.hide(r), ajax.post("al_video.php", {
                act: e + "_comment",
                comment: i + "_" + o,
                hash: t,
                videoview: 1,
                from: a
            }, {
                onDone: Videoview.commActionDone.pbind(i + "_" + o, a),
                showProgress: addClass.pbind(d, "post_actions_progress"),
                hideProgress: removeClass.pbind(d, "post_actions_progress"),
                stat: ["privacy.js", "privacy.css"]
            })
        },
        moreComments: function(e) {
            if (isVisible("mv_comments_header") && !hasClass(domFC(ge("mv_comments_header")), "pr") && !(e && Videoview.cmp(domFC(ge("mv_comments")).id, "post" + e) < 0)) {
                var i = mvcur.mvData;
                ajax.post("al_video.php", {
                    act: "video_comments",
                    offset: i.commshown,
                    video: i.videoRaw
                }, {
                    onDone: function(i, o) {
                        Videoview.receiveComms(i, o, !0, e), e && ge("post" + e) && Videoview.showComment(e)
                    },
                    showProgress: function() {
                        var e = ge("mv_comments_header");
                        mvcur.mvCommInfo = val(e), val(e, ""), showProgress(e)
                    },
                    hideProgress: function() {
                        val("mv_comments_header", mvcur.mvCommInfo)
                    }
                })
            }
        },
        updateCommentsHeader: function(e) {
            if ("review" != e) {
                var i = mvcur.mvData,
                    o = "";
                i.commcount > i.commshown && (o = getLang("video_show_previous_comments", i.commcount - i.commshown)), i.commcount && val("mv_comments_summary", getLang("video_comments_summary", i.commcount)), setStyle("mv_comments_summary", {
                    display: i.commcount ? null : "none"
                }), toggleClass("mv_comments_header", "mv_comments_expanded", !o), toggleClass("mv_comments_summary", "mv_comments_expanded", !o), val("mv_comments_header", o), Videoview.recache()
            }
        },
        onShowEditReply: function() {
            mvcur.replyFormShown = !0, Videoview.updateReplyFormPos(), Videoview.playerNextTimerUpdate()
        },
        onHideEditReply: function() {
            mvcur.replyFormShown = !1, mvcur.mvReplyTo = !1, Videoview.updateReplyFormPos(), setTimeout(Videoview.updateReplyFormPos, 0), Videoview.playerNextTimerUpdate()
        },
        commentClick: function(e, i, o, t) {
            Wall.checkReplyClick(e, i) || (mvcur.mvReplyTo = [o, t], Wall.replyTo(mvcur.post, t, o))
        },
        receiveComms: function(e, i, o, t) {
            for (var a, n, d = ce("div", {
                    innerHTML: e
                }), r = ge("mv_comments"), s = a = domLC(r), v = getXY(a, !0)[1], l = mvcur.mvData; n = domLC(d);) {
                for (; a && Videoview.cmp(a.id, n.id) > 0;) a = domPS(a);
                a && !Videoview.cmp(a.id, n.id) ? (r.replaceChild(n, a), a = n) : (a && domNS(a) ? r.insertBefore(n, domNS(a)) : !a && domFC(r) ? o ? r.insertBefore(n, domFC(r)) : (--l.commshown, d.removeChild(n)) : r.appendChild(n), o || ++l.commcount, ++l.commshown)
            }
            t && s && (mvLayerWrap.scrollTop += getXY(s, !0)[1] - v), extend(mvcur.mvReplyNames, i), window.updateWndVScroll && updateWndVScroll(), Videoview.updateCommentsHeader(), Videoview.updateReplyFormPos()
        },
        commSaved: function(e) {},
        sendComment: function(e, i, o) {
            var t = ge("reply_field" + e),
                a = t && data(t, "composer"),
                n = (mvcur.mvReplyNames[(mvcur.mvReplyTo || {})[0]] || [])[1],
                d = ge("reply_button" + e);
            if (o) var r = {
                message: "",
                attach1_type: "sticker",
                attach1: o
            };
            else {
                var r = a ? Composer.getSendParams(a, Videoview.sendComment) : {
                    message: trim(val(t))
                };
                if (r.delayed) return;
                if (!r.attach1_type && (!r.message || n && !n.indexOf(r.message))) return void elfocus(t)
            }
            ajax.post("al_video.php", Wall.fixPostParams(extend(r, {
                act: "post_comment",
                video: mvcur.mvData.videoRaw,
                hash: mvcur.mvData.hash,
                fromview: 1,
                videoviewer: 1,
                from_group: domData(domClosest("_submit_post_box", ge("reply_as_group" + mvcur.post)), "from-oid") < 0 ? 1 : "",
                reply_to: (mvcur.mvReplyTo || {})[1]
            })), {
                onDone: function(i, o) {
                    Videoview.receiveComms(i, o), val("mv_comments_summary", getLang("video_comments_summary", mvcur.mvData.commcount)), Composer.reset(a), hide("reply_warn" + e), Wall.cancelReplyTo(e), mvLayerWrap.scrollTop = 9e9
                },
                onFail: function(e) {
                    return t ? (showTooltip(t, {
                        text: e,
                        showdt: 200,
                        forcetodown: 0,
                        slide: 15
                    }), elfocus(t), !0) : void 0
                },
                showProgress: lockButton.pbind(d),
                hideProgress: unlockButton.pbind(d)
            })
        },
        activate: function(e, i, o) {
            2 == i ? animate(e, {
                color: "#FFFFFF"
            }, "undefined" != typeof o ? 0 : 200) : animate(e, {
                opacity: 1
            }, 200)
        },
        deactivate: function(e, i) {
            2 == i ? animate(e, {
                color: "#777777"
            }, "undefined" != typeof fast ? 0 : 200) : animate(e, {
                opacity: .5
            }, 200)
        },
        addVideo: function(videoRaw, hash, obj, gid, accessHash, from) {
            if (window.mvcur && mvcur.statusVideo) var params = {
                    act: "external_add",
                    status: videoRaw,
                    hash: hash,
                    from: from || "videoviewer"
                },
                url = "al_video_external.php";
            else {
                var params = {
                    act: "a_add",
                    video: videoRaw,
                    hash: hash,
                    from: from || "videoviewer",
                    module: cur.module || "",
                    info: window.Video && Video.isInCatalog() ? VideoPlaylist.getCurListId() : ""
                };
                gid && (params.gid = gid);
                var url = "al_video.php"
            }
            return accessHash && (params.access_hash = accessHash), ajax.post(url, params, {
                onDone: function(text, row, hash, shareHash) {
                    if (obj && val(domPN(obj), text), !isArray(row)) try {
                        row = eval("(" + row + ")")
                    } catch (e) {}
                    window.mvcur && (mvcur.mvData && mvcur.mvData.afterAdd ? mvcur.mvData.afterAdd(row[0] + "_" + row[1], shareHash) : row && (mvcur.mvData.addedVideo = row[0] + "_" + row[1], mvcur.mvData.addedVideoHash = hash, mvcur.mvData.addedVideoShareHash = shareHash));
                    var videoEl = ge("video_cont" + videoRaw);
                    videoEl && addClass(videoEl, "video_row_added"), "list" == from && showDoneBox(text), window.Video && !Video.isInCatalog() && Video.updateVideo(cur.oid, row, [], !1, [-2]), Videoview.setAddButtonStateAdded()
                }
            }), !1
        },
        likeUpdate: function(e, i, o, t) {
            i = intval(i);
            var a = Videoview.getMvData(),
                n = window.mvcur && mvcur.statusVideo ? "wall" : "video",
                d = (ge("like_table_" + n + a.videoRaw), ge("like_title_" + n + a.videoRaw)),
                r = ge("like_real_count_" + n + a.videoRaw) || {},
                s = ge("mv_like_wrap");
            if (icon = domByClass(s, "_icon"), countNode = domByClass(s, "_count"), a.likes = i, a.liked = e, countNode) {
                var v = s.tt || {},
                    l = clone(v.opts || {}),
                    r = domByClass(v.container, "_value"),
                    c = domByClass(v.container, "_content"),
                    d = domByClass(v.container, "_title");
                o && d && val(d, o), r && (r.value = i), animateCount(countNode, i), toggleClass(s, "my_like", e), toggleClass(s, "no_likes", !i), toggleClass(c, "me_hidden", !e), i ? t || !v.el || isVisible(v.container) || o || tooltips.show(v.el, extend(l, {
                    showdt: 0
                })) : v.el && v.hide()
            }
        },
        _isCurrentVideoPublished: function() {
            var e = Videoview.getMvData();
            return e && e.published
        },
        addSmall: function(e, i, o, t) {
            if (Videoview._isCurrentVideoPublished()) {
                window.mvcur && mvcur.mvShown ? Videoview.setAddButtonStateAdded() : Videoview.addVideo(e, i, !1, o, t), hide("video_add_action_link"), addClass(ge("mv_like_line"), "video_added"), addClass(geByClass1("mv_finish_add", "mv_external_finish"), "selected");
                var a = Videoview.getMvData();
                a.added = !0
            } else Videoview.showAddDialog(e)
        },
        showAddDialog: function(e) {
            if (cur._recentAddedVideos = cur._recentAddedVideos || {}, !cur._recentAddedVideos[e]) {
                var i = e.split("_");
                showBox("al_video.php?act=show_add_video_box", {
                    oid: i[0],
                    vid: i[1]
                }, {
                    params: {
                        dark: 1
                    },
                    onDone: function(e, o) {
                        o && (e.removeButtons(), e.addButton(getLang("Save"), function(e) {
                            var t = trim(val("mv_video_add_title"));
                            t && ajax.post("al_video.php?act=a_add_publish_video", {
                                title: t,
                                video_privacy: Privacy.getValue("video_add"),
                                videocomm_privacy: Privacy.getValue("videocomm_add"),
                                hash: o,
                                oid: i[0],
                                vid: i[1]
                            }, {
                                showProgress: lockButton.pbind(e),
                                hideProgress: unlockButton.pbind(e),
                                onDone: function() {
                                    cur._recentAddedVideos[e] = !0;
                                    var e = mvcur.videoRaw,
                                        o = mvcur.listId;
                                    Videoview.hide(!0, !0), Videoview.recache(i[0] + "_" + i[1]), showVideo(e, o)
                                }
                            })
                        }))
                    }
                })
            }
        },
        share: function(e, i, o) {
            if (vk.id) {
                var t = Videoview.getMvData();
                return t && !t.addedVideo && (t.addedVideo = t.videoRaw), (t || e) && showBox("like.php", {
                    act: "publish_box",
                    object: "video" + (t.addedVideo || e),
                    action_type: o
                }, {
                    onDone: function() {
                        window.mvcur && mvcur.mvShown && Videoview.playerNextTimerUpdate()
                    }
                }), !1
            }
        },
        like: function(e, i) {
            if (vk.id) {
                var o = Videoview.getMvData();
                if (o) {
                    var t = o;
                    if (window.mvcur && mvcur.statusVideo) var a = "wall" + t.videoRaw;
                    else var a = "video" + t.videoRaw;
                    var n = "";
                    if (window.Video && Video.isInCatalog()) {
                        var d = VideoPlaylist.getCurListId();
                        n = Videocat.isTop3Playlist(d) ? "featured" : d
                    }
                    ajax.post("like.php", {
                        act: "a_do_" + (t.liked ? "un" : "") + "like",
                        object: a,
                        hash: t.likeHash,
                        short_view: 1,
                        from: "videoview",
                        info: n
                    }, {
                        onDone: Videoview.likeUpdate.pbind(!t.liked)
                    }), i || Videoview.playerOnLiked(), toggleClass(geByClass1("mv_finish_like", "mv_external_finish"), "selected", !t.liked), Videoview.likeUpdate(!t.liked, t.likes + (t.liked ? -1 : 1), null, i), Videoview.recache()
                }
            }
        },
        likeShare: function(e) {
            if (vk.id) {
                var i = mvcur.mvData;
                if (mvcur.statusVideo) var o = "wall" + i.videoRaw;
                else var o = "video" + i.videoRaw;
                var t = ge("like_share_video" + i.videoRaw),
                    a = isChecked(t);
                checkbox(t), ajax.post("like.php", {
                    act: "a_do_" + (a ? "un" : "") + "publish",
                    object: o,
                    hash: e,
                    short_view: 1,
                    list: mvcur.listId
                }, {
                    onDone: Videoview.likeUpdate.pbind(!0)
                }), Videoview.likeUpdate(!0, i.likes + (i.liked ? 0 : 1))
            }
        },
        likeOver: function(e) {
            var i = mvcur.mvData;
            if (mvcur.statusVideo) var o = "wall" + i.videoRaw;
            else var o = "video" + i.videoRaw;
            var t = getSize(ge("mv_like_link")),
                a = t ? t[0] : 20;
            showTooltip(e, {
                url: "like.php",
                params: {
                    act: "a_get_stats",
                    object: o,
                    list: mvcur.listId,
                    from: "videoview"
                },
                slide: 15,
                shift: [0, 8, 9],
                ajaxdt: 100,
                showdt: 400,
                hidedt: 200,
                typeClass: "like_tt",
                className: "mv_like_tt",
                dir: "auto",
                init: function(e) {
                    if (e.container) {
                        var i = geByClass1("bottom_pointer", e.container, "div"),
                            o = geByClass1("top_pointer", e.container, "div");
                        setStyle(i, {
                            marginLeft: a + 2
                        }), setStyle(o, {
                            marginLeft: a + 2
                        })
                    }
                }
            })
        },
        likesShowList: function(e) {
            var i = domPN(e),
                o = domByClass(i, "_icon"),
                t = mvcur.mvData;
            if (o && !cur.viewAsBox && t) {
                var a = t.statusVideo ? "wall" + t.videoRaw : "video" + t.videoRaw;
                showWiki({
                    w: "likes/" + clean(a)
                }, !1, !1, {
                    queue: 1
                })
            }
        },
        showEditBox: function(e, i, o, t) {
            showBox("al_video.php?act=edit_box", {
                vid: e,
                oid: i,
                is_publish: +t
            }, {
                stat: ["privacy.js", "privacy.css", "video.js", "video.css"]
            })
        },
        restoreVideo: function(e, i, o, t, a) {
            var n = ge("mv_warning");
            return n && (n.innerHTML = '<img style="margin-left: 100px;" src="/images/upload.gif" />'), ajax.post("al_video.php?act=restore_video", {
                vid: e,
                oid: i,
                hash: o,
                from: t || "videoviewer"
            }, {
                onDone: function(o) {
                    if ("list" == t && cur.restoreRaw && cur.restoreRaw[i + "_" + e]) {
                        var a = ge("video_row" + i + "_" + e);
                        val(a, cur.restoreRaw[i + "_" + e]), removeClass(a, "video_row_loading"), removeClass(a, "video_row_deleted"), setStyle(geByClass1("video_row_icon_delete", a), {
                            opacity: .8
                        })
                    } else;
                    hide("mv_warning"), show("mv_info"), cur.claimedVideoText && (val("video_player", cur.claimedVideoText), cur.claimedVideoText = "")
                },
                onFail: function(e) {
                    return setTimeout(showFastBox({
                        title: getLang("global_error"),
                        bodyStyle: "padding: 20px; line-height: 160%;",
                        dark: 1
                    }, e).hide, 5e3), !0
                }
            }), cancelEvent(a)
        },
        publish: function(e, i, o, t) {
            t && hasClass(t, "loading") || Videoview.showEditBox(i, e, null, !0)
        },
        stopStreaming: function(e, i) {
            showFastBox(getLang("video_are_you_sure_stop_streaming_title"), getLang("video_are_you_sure_stop_streaming"), getLang("box_yes"), function() {
                curBox().hide(), ajax.post("al_video.php?act=live_stop_streaming", {
                    owner_id: mvcur.mvData.oid,
                    video_id: mvcur.mvData.vid,
                    hash: i
                }, {
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e),
                    onDone: function() {
                        Videoview.reload()
                    }
                })
            }, getLang("box_no"))
        },
        broadcastLiveAds: function(e, i, o) {
            mvcur.mvData.launchedLiveAds = 1, ajax.post("al_video.php?act=broadcast_live_ads", {
                owner_id: mvcur.mvData.oid,
                video_id: mvcur.mvData.vid,
                hash: i,
                stop: o
            }, {
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e),
                onDone: function(e, i) {
                    o ? Videoview.removeLiveAdsTimer() : Videoview.runLiveAdsTimer(e, i)
                },
                onFail: function(e) {
                    return showFastBox(getLang("global_error"), e || getLang("global_error_occured")), !0
                }
            })
        },
        runLiveAdsTimer: function(e, i) {
            mvcur.mvData.liveAdsTimerEl = se(e), ge("mv_main").appendChild(mvcur.mvData.liveAdsTimerEl), disableButton("mv_broadcast_live_ads_button", !0);
            var o = mvcur.videoRaw,
                t = vkNow();
            ! function a() {
                if (o == mvcur.videoRaw && mvcur.mvShown && mvcur.mvData.liveAdsTimerEl) {
                    var e = intval(i - (vkNow() - t) / 1e3);
                    if (0 > e) return Videoview.removeLiveAdsTimer();
                    val(domByClass(mvcur.mvData.liveAdsTimerEl, "mv_live_ads_timer_countdown"), formatTime(e)), setTimeout(a, 1e3)
                }
            }()
        },
        removeLiveAdsTimer: function() {
            re(mvcur.mvData.liveAdsTimerEl), delete mvcur.mvData.liveAdsTimerEl, delete mvcur.mvData.launchedLiveAds, disableButton("mv_broadcast_live_ads_button", !1)
        },
        deleteVideo: function(e, i, o, t, a, n, d) {
            n && hasClass(n, "loading") || ajax.post("al_video.php", {
                act: "delete_video",
                vid: e,
                oid: i,
                hash: o,
                sure: t ? 1 : 0,
                from: a
            }, {
                onDone: function(t, r, s, v, l) {
                    if (Videoview.recache(i + "_" + e), "sure" == t) {
                        Videoview.hidePlayer();
                        var c = showFastBox({
                            title: r,
                            bodyStyle: "padding: 20px; line-height: 160%;",
                            dark: 1
                        }, s);
                        c.setOptions({
                            onHide: function() {
                                Videoview.showPlayer()
                            }
                        }), c.removeButtons(), c.addButton(l, c.hide, "no"), c.addButton(v, function() {
                            c.showProgress(), Videoview.deleteVideo(e, i, o, !0, a, n, c.hide)
                        }, "yes")
                    } else if ("result" == t && (d && d(s), "videoviewer" == a && (ge("mv_info") && (hide("mv_info"), val("mv_warning", s), show("mv_warning"), hide("mv_publish")), s = r), window.Video && Video.isInVideosList())) return Video.updateVideo(cur.oid, [i, e], [], !0), !0
                },
                showProgress: n ? addClass.pbind(n, "loading") : !1,
                hideProgress: n ? removeClass.pbind(n, "loading") : !1
            })
        },
        deleteVideoOnClaim: function(e, i, o, t, a, n) {
            Videoview.deleteVideo(e, i, o, t, a, n, function(e) {
                "videoviewer" == a && (hide("mv_info"), cur.claimedVideoText = val("video_player"), val("video_player", e))
            })
        },
        recache: function(e) {
            !e && window.mvcur && mvcur.mvData.videoRaw && (e = mvcur.mvData.videoRaw);
            for (var i in ajaxCache) i.match(/^\/al_video\.php\#act=show/) && i.match(new RegExp("&video=" + e + "([^0-9]|$)", "")) && delete ajaxCache[i]
        },
        getVideoCode: function(e, i) {
            Videoview.sendVideo(!0)
        },
        reportBox: function(e, i) {
            Videoview.hidePlayer(), showBox("reports.php", {
                act: "a_report_video_box",
                oid: e,
                vid: i
            }, {
                onHideAttempt: function() {
                    Videoview.showPlayer()
                },
                stat: ["ui_controls.js", "ui_controls.css"],
                dark: 1
            })
        },
        setAdult: function(e, i, o, t, a) {
            ajax.post("al_video.php?act=set_adult_video", {
                vid: i,
                oid: e,
                hash: o,
                value: t
            }, {
                onDone: function(e, i) {
                    val(a, i), lockLink(a)
                }
            })
        },
        encodingProcess: function(e, i) {
            showBox("al_video.php?act=encoding_process_box", {
                oid: e,
                vid: i
            }, {
                params: {
                    width: 600
                }
            })
        },
        updateEncodingProcess: function(e, i) {
            ajax.post("al_video.php?act=encoding_process_action", {
                vid: i,
                oid: e
            }, {
                onDone: function(o) {
                    var t = ge("encoding_process_data");
                    t && o && (Videoview.proceedEncodingData(JSON.parse(o), t), setTimeout(function() {
                        Videoview.updateEncodingProcess(e, i)
                    }, 1e3))
                }
            })
        },
        proceedEncodingData: function(e, i) {
            var o = '<table width="100%">';
            for (var t in e)
                if (e.hasOwnProperty(t)) {
                    var a = e[t];
                    if ("object" == typeof a) {
                        if (0 === a.length) continue;
                        o += "<tr><td><b>" + t + "</b></td></tr>";
                        for (var n in a) a.hasOwnProperty(n) && (o += "<tr><td>" + n + "</td><td>" + a[n] + "</td></tr>")
                    } else o += "<tr><td><b>" + t + "</b></td><td>" + a + "</td></tr>"
                }
            o += "</table>", i.innerHTML = o
        },
        replaceLegal: function(e, i, o) {
            showBox("al_video.php?act=replace_legal_box", {
                oid: e,
                vid: i,
                hash: o
            }, {
                params: {
                    width: 600
                }
            })
        },
        restoreOriginal: function(e, i, o, t) {
            showFastBox("Confirm", "restore original video?", getLang("box_yes"), function() {
                ajax.post("al_video.php?act=restore_original", {
                    vid: i,
                    oid: e,
                    hash: o
                }, {
                    onDone: function(e, i) {
                        nav.reload()
                    }
                })
            }, getLang("box_no"))
        },
        spamVideo: function(e, i, o, t, a, n, d) {
            t && addClass(t, "loading"), ajax.post("al_video.php?act=spam_video", {
                vid: i,
                oid: e,
                hash: o,
                sure: n ? 1 : 0,
                from: a
            }, {
                onDone: function(n, r, s, v, l) {
                    if (t && removeClass(t, "loading"), Videoview.recache(e + "_" + i), "sure" == n) {
                        Videoview.hidePlayer();
                        var c = showFastBox({
                            title: r,
                            bodyStyle: "padding: 20px; line-height: 160%;",
                            dark: 1
                        }, s);
                        c.setOptions({
                            onHide: function() {
                                Videoview.showPlayer()
                            }
                        }), c.removeButtons(), c.addButton(l, c.hide, "no"), c.addButton(v, function() {
                            c.showProgress(), Videoview.spamVideo(e, i, o, t, a, !0, c.hide)
                        }, "yes")
                    } else if ("result" == n) {
                        if (d && d(), window.Video)
                            if ("videoviewer" == a) Video.removeFromLists(e + "_" + i);
                            else if ("list" == a) return val("video_row" + e + "_" + i, '<div class="video_row">' + s + "</div>"), Video.removeFromLists(e + "_" + i, !0), !0
                    } else val(domPN(t), n)
                }
            })
        },
        licensed: function(e, i) {
            var o = ge("mv_licensed_info");
            val(o, ""), show(o), showProgress(o), ajax.post("al_video.php?act=change_licensed", {
                video: mvcur.mvData.videoRaw,
                hash: i
            }, {
                showProgress: function() {
                    showProgress(e), disableEl(e)
                },
                hideProgress: function() {
                    enableEl(e), hideProgress(e)
                },
                onDone: function(i, t) {
                    val(e, i), o && (val(o, t), toggle(o, !!t))
                }
            })
        },
        claimed: function(e, i, o, t) {
            i = domData(t, "action") || i, ajax.post("al_claims.php?act=a_" + i, {
                type: "video",
                id: mvcur.mvData.vid,
                owner_id: mvcur.mvData.oid,
                claim_id: e,
                extra: o
            }, {
                showProgress: function() {
                    showProgress(t), disableEl(t)
                },
                hideProgress: function() {
                    enableEl(t), hideProgress(t)
                },
                onDone: function(e) {
                    val(t, e), domData(t, "action", "claim" == i ? "unclaim" : "claim")
                }
            })
        },
        moderAction: function(e, i, o) {
            if ("moder_log" == i) showBox("al_video.php?act=moder_log_box", {
                video_raw: mvcur.videoRaw
            }, {
                params: {
                    width: 600
                }
            });
            else {
                var t = extend({
                    owner_id: mvcur.mvData.oid,
                    video_id: mvcur.mvData.vid,
                    action: i,
                    hash: o
                }, parseJSON(domData(e, "params")));
                ajax.post("al_video.php?act=moder_action", t, {
                    showProgress: function() {
                        showProgress(e), disableEl(e)
                    },
                    hideProgress: function() {
                        enableEl(e), hideProgress(e)
                    },
                    onDone: function(i, o, t) {
                        i && val(e, i), o && domData(e, "params", o), t && lockLink(e)
                    }
                })
            }
        },
        pinModerActions: function(e) {
            var i = domByClass("mv_moder_buttons", "mv_moder_buttons_pin"),
                o = domByClass("mv_moder_buttons", "_ui_menu_wrap"),
                t = e ? ls.get("video_moder_actions_pinned") : !domData(i, "pinned");
            t ? (o.onmouseenter = o.onmouseleave = null, uiActionsMenu.show(o), val(i, "Unpin"), domData(i, "pinned", 1), ls.set("video_moder_actions_pinned", 1)) : (o.onmouseenter = function() {
                uiActionsMenu.show(this)
            }, o.onmouseleave = function() {
                uiActionsMenu.hide(this)
            }, val(i, "Pin"), domData(i, "pinned", null), ls.remove("video_moder_actions_pinned"))
        },
        setStyle: function(e, i, o) {
            i = ge(i), mvcur.restoreStyles || (mvcur.restoreStyles = {});
            for (var t in o) mvcur.restoreStyles[e] || (mvcur.restoreStyles[e] = {}), mvcur.restoreStyles[e][t] = i.style[t], i.style[t] = o[t]
        },
        restoreStyle: function(e, i) {
            i = ge(i), setStyle(i, mvcur.restoreStyles[e])
        },
        showVideo: function(videoRaw, title, html, js, desc, opt) {
            if (mvcur.mvShown && videoRaw == mvcur.videoRaw) {
                if (!vk.id && !html && !mvcur.options.expandPlayer) return void setTimeout(function() {
                    Videoview.hide(!1, !0), showDoneBox(title)
                }, 500);
                if (title && !html && !mvcur.options.expandPlayer) return val("mv_player_box", '<div class="mv_video_unavailable_message_wrap"><div class="mv_video_unavailable_message">' + title + "</div></div>"), show("mv_player_box"), hide("mv_progress_box"), void hide("mv_info");
                if (opt = opt || {}, addLangKeys(opt.lang, !0), cur.share_timehash = cur.share_timehash || opt.share_timehash, mvcur.post = opt.post, mvcur.maxReplyLength = opt.maxReplyLength, mvcur.maxChatReplyLength = opt.maxChatReplyLength, mvcur.maxDescriptionLength = opt.maxDescriptionLength, mvcur.mvData = opt.mvData, mvcur.videoRaw = opt.mvData.videoRaw, mvcur.adminLevel = opt.mvData.adminLevel, mvcur.commentsTpl = opt.commentsTpl, mvcur.mvMediaTypes = opt.media, mvcur.mvMediaShare = opt.share, mvcur.mvReplyNames = opt.names || {}, mvcur.rmedia_types = opt.rmedia_types, mvcur.chatMode = !!opt.chatMode, mvcur.wallTpl = opt.wallTpl, mvcur.finished = !1, mvcur.preparationBlock = !1, opt.queueParams && (mvcur.queueKey = opt.queueParams.key, mvcur.qversion = opt.qversion), opt.pl_list) {
                    var lists = JSON.parse(opt.pl_list);
                    each(lists, function(e, i) {
                        VideoPlaylist.addList(i)
                    }), Videoview.initPlaylistBlock(mvcur.videoRaw, mvcur.options.playlistId)
                }
                VideoPlaylist.toggleStateClasses(), Wall.cancelEdit(!0);
                var needRemin = !0;
                if (!mvcur.options.expandPlayer) {
                    var videoBoxWrap = domByClass(ge("mv_player_box"), "video_box_wrap");
                    opt.is_vk_player && !opt.cantPlay && (!opt.is_flv || browser.flash >= Videoview.FLASH_MIN_VERSION) && mvcur.player && domClosest("video_box_wrap", mvcur.player.el) === videoBoxWrap ? (attr(videoBoxWrap, "id", "video_box_wrap" + videoRaw), needRemin = !1) : (mvcur.player && re(mvcur.player.el), val("mv_player_box", html)), hide("mv_progress_box")
                }
                if (val("mv_info", desc), opt.moder_buttons && (val("mv_moder_buttons", opt.moder_buttons), Videoview.pinModerActions(!0)), opt.player) {
                    var container = domByClass(ge("mv_player_box"), "video_box_wrap");
                    VideoInitializer.initPlayer(container, opt.player.type, opt.player.params)
                }
                if (js && eval("(function(){" + js + "})()"), opt.publishAction) {
                    var publishAction = ge("mv_publish");
                    val(publishAction, opt.publishAction), show(publishAction)
                } else hide("mv_publish");
                if (opt.livePreparationBlock) VideoPlaylist.removeBlock(), mvcur.preparationBlock = se(opt.livePreparationBlock), ge("mv_main").appendChild(mvcur.preparationBlock);
                else if (mvcur.chatMode) {
                    VideoPlaylist.removeBlock();
                    var chatBlock = se(opt.chatBlock);
                    ge("mv_main").appendChild(chatBlock), VideoChat.init(chatBlock, {
                        forceStickerPack: opt.chatForceStickerPack
                    }), VideoChat.toggleStateClasses(), VideoChat.updateScroll()
                }
                toggleClass("mv_box", "_has_preparation", !!mvcur.preparationBlock && !mvcur.minimized);
                var rf = ge("reply_field" + mvcur.post);
                if (rf && placeholderInit(rf, {
                        editable: 1
                    }), mvcur.minimized && needRemin && Videoview.minimizePlayer(), mvcur.statusVideo) {
                    var statusCont = ge("like_count" + mvcur.mvData.videoRaw);
                    if (statusCont) {
                        var tt = statusCont.parentNode.tt;
                        tt && tt.container && re(tt.container), statusCont.parentNode.tt && delete statusCont.parentNode.tt
                    }
                }
                if (show("mv_player_box"), window.updateWndVScroll && updateWndVScroll(), (mvcur.options || {}).scroll && (mvLayerWrap.scrollTop = mvcur.options.scroll, mvcur.options.scroll = 0), toggle("mv_info", !mvcur.options.hideInfo && !mvcur.mvData.noControls && !mvcur.minimized), removeClass("mv_info", "mv_info_disabled"), !mvcur.mvData.noControls) {
                    var titleWidth = mvcur.minimized ? mvcur.minSize.wrap.w : !1;
                    Videoview.setTitle(titleWidth), Videoview.initAddButton();
                    var items = [],
                        sublists = {};
                    mvcur.mvData.publishToGroups && items.push(["_onAddToCommunity", getLang("video_add_to_group")]), mvcur.mvData.canExport && items.push(["_onExport", getLang("video_export_action")]), mvcur.mvData.stats && items.push(["_onViewStats", getLang("video_statistics")]), mvcur.mvData.reportReasons && (items.push(["_onReport", getLang("video_complain")]), sublists._onReport = {
                        items: mvcur.mvData.reportReasons,
                        onSelect: function(e) {
                            return Videoview.reportFromDD(mvcur.mvData.reportHash, e), !0
                        }
                    }), mvcur.mvData.editHash && mvcur.mvData.editFromDropdown && !mvcur.mvData.hideEdit && items.push(["_onEdit", getLang("video_edit")]), mvcur.mvData.deleteHash && !mvcur.mvData.hideEdit && items.push(["_onDelete", getLang("video_menu_delete")]), items.length ? new InlineDropdown("mv_more", {
                        items: items,
                        withArrow: !0,
                        keepTitle: !0,
                        autoShow: !0,
                        autoHide: 300,
                        headerLeft: -17,
                        headerTop: -11,
                        sublists: sublists,
                        onSelect: function(e) {
                            Videoview[e]()
                        }
                    }) : re("mv_more"), toggle(ge("mv_edit_button"), mvcur.mvData.editHash && !mvcur.mvData.hideEdit && !mvcur.mvData.editFromDropdown)
                }
                mvcur.mvData.is_active_live || Videoview.adaptRecomsHeight(), Videoview.updateSize(), opt.queueParams && stManager.add("notifier.js", function() {
                    Videoview.queueCheckUpdates(opt.queueParams)
                }), mvcur.mvData.uploaded || Videoview.recache(), mvcur.mvData.is_live && setTimeout(Videoview.checkOtherLives.pbind(videoRaw), 6e4)
            }
        },
        adaptRecomsHeight: function() {
            var e = geByClass1("mv_info_wide_column", "mv_info"),
                i = geByClass1("mv_info_narrow_column", "mv_info");
            if (e && i)
                for (var o = geByClass("mv_recom_item", i), t = o.length - 1; getSize(e)[1] < getSize(i)[1] && t > 0; --t) hide(o[t])
        },
        queueCheckUpdates: function(e) {
            window.mvcur && mvcur.mvShown && mvcur.queueKey === e.key && (window.Notifier && Notifier.addKey(e, Videoview.queueReceiveUpdates), setTimeout(Videoview.queueCheckUpdates.pbind(e), 25e3))
        },
        queueReconnect: function(e) {
            var i = Videoview.getMvData(),
                o = i.oid,
                t = i.vid,
                a = o + "_" + t;
            e ? ajax.post("al_video.php?act=get_queue_params", {
                oid: o,
                vid: t,
                hash: i.hash
            }, {
                onDone: function(e) {
                    e && Videoview.isLayerShown(a) && (mvcur.queueKey = e.key, Videoview.queueCheckUpdates(e))
                },
                onFail: function() {
                    return !0
                }
            }) : (mvcur.queueReconnectDelay = mvcur.queueReconnectDelay ? 2 * mvcur.queueReconnectDelay : 500, setTimeout(function() {
                Videoview.isLayerShown(a) && Videoview.queueReconnect(!0)
            }, mvcur.queueReconnectDelay))
        },
        queueReceiveUpdates: function(e, i) {
            function o(e, i) {
                return e + "video_" + i + "mv"
            }
            if (window.mvcur && mvcur.mvShown && mvcur.queueKey === e && i) {
                if (i.failed) return debugLog("video queue failed", i), mvcur.queueKey = null, void Videoview.queueReconnect();
                delete mvcur.queueReconnectDelay, mvcur.queueBatchId = (mvcur.queueBatchId || 0) + 1, each(i.events, function() {
                    var e = this.split("<!>"),
                        i = e[0],
                        t = e[1];
                    if (i == mvcur.qversion) switch (t) {
                        case "new_reply":
                            mvcur.chatMode || (Videoview.appendNewComment.apply(Videoview, e.slice(2)), Videoview.updateCommentsHeader(), Videoview.updateReplyFormPos());
                            break;
                        case "new_reply_chat":
                            var a = +e[10],
                                n = !!e[11];
                            mvcur.chatMode && VideoChat.receiveMessage.apply(VideoChat, e.slice(2)), n && !a && mvcur.player && mvcur.player.pushDonation("comment", {
                                senderId: e[4],
                                senderName: e[5],
                                senderPhoto: e[6],
                                senderHref: e[7],
                                senderSex: e[8],
                                commentText: e[9]
                            });
                            break;
                        case "edit_reply":
                            var d = e[2],
                                r = e[3],
                                s = e[4],
                                v = ge("wpt" + o(d, r));
                            v && !attr(v, "data-action") && val(v, psr(s)), Videoview.updateReplyFormPos();
                            break;
                        case "del_reply":
                            var d = e[2],
                                r = e[3];
                            if (mvcur.chatMode) VideoChat.receiveDelete(d, r);
                            else {
                                var v = ge("post" + o(d, r));
                                v ? attr(v, "data-action") || (mvcur.mvData.commcount--, mvcur.mvData.commshown--, re(v)) : mvcur.mvData.commcount--, Videoview.updateCommentsHeader(), Videoview.updateReplyFormPos()
                            }
                            break;
                        case "like_reply":
                            var d = e[2],
                                r = e[3],
                                l = +e[4],
                                c = +e[5],
                                m = e[6],
                                v = ge("wpe_bottom" + o(d, r));
                            if (v) {
                                var u = domByClass(v, "_like_wrap"),
                                    _ = domByClass(u, "_count");
                                val(_, l > 0 ? l : ""), toggleClass(u, "no_likes", !l), c == vk.id && toggleClass(u, "my_like", !m)
                            }
                            break;
                        case "like":
                            var d = e[2],
                                l = e[3],
                                c = e[4],
                                m = e[5];
                            mvcur.chatMode && !m && VideoChat.appendSticker("like", c);
                            break;
                        case "sticker":
                            var d = e[2],
                                p = e[3],
                                h = e[4];
                            mvcur.chatMode && VideoChat.appendSticker(p, h);
                            break;
                        case "video_view":
                            Videoview.updateLiveViewersCount(e[2]);
                            break;
                        case "gift":
                            mvcur.player && mvcur.player.pushDonation("gift", {
                                senderId: e[2],
                                senderName: e[3],
                                senderPhoto: e[4],
                                senderHref: e[5],
                                senderSex: e[6],
                                giftId: e[7]
                            });
                            break;
                        case "end_live":
                            mvcur.player && mvcur.player.onLiveEnded();
                            break;
                        case "live_midroll":
                            if (mvcur.player && !mvcur.mvData.launchedLiveAds) {
                                var g = !!e[2];
                                mvcur.player.pushLiveMidroll(g)
                            }
                            break;
                        default:
                            debugLog("unhandled video event", e)
                    }
                })
            }
        },
        appendNewComment: function(e, i, o, t, a, n, d, r, s, v, l) {
            if (!ge("post" + e + "video_" + i + "mv")) {
                var c = "";
                mvcur.adminLevel > 0 || e == vk.id || o == vk.id ? c += mvcur.commentsTpl.del_reply : e != o && (c += mvcur.commentsTpl.spam_reply), (mvcur.adminLevel > 1 && e == o || t == vk.id) && (c += mvcur.commentsTpl.edit_reply), c = rs(mvcur.commentsTpl.actions, {
                    actions: c
                });
                var m = langDate(1e3 * r, getLang("global_short_date_time", "raw"), 0, []),
                    u = psr(rs(mvcur.commentsTpl.reply, {
                        actions: c,
                        post_oid: e,
                        reply_id: e + "video_" + i + "mv",
                        reply_msg_id: i,
                        from_id: o,
                        name: t,
                        photo: a,
                        href: n,
                        message: d,
                        date: m,
                        to_link: s
                    }));
                mvcur.mvReplyNames[o] = [v, l], ge("mv_comments").insertAdjacentHTML("beforeend", u), mvcur.mvData.commcount++, mvcur.mvData.commshown++
            }
        },
        updateLiveViewersCount: function(e, i) {
            if (e = intval(e)) {
                var o = domByClass("mv_views", "mv_live_spectators_count_text"),
                    t = getLang("video_live_N_watching", e, !0);
                val(o, t)
            }
            if (i) {
                var o = domByClass("mv_views", "mv_live_spectators_friends"),
                    t = i.map(function(e) {
                        return getTemplate("video_live_spectators_friend", e)
                    }).reverse().join("");
                val(o, t)
            }
        },
        showLiveSpectatorsBox: function() {
            var e = Videoview.getMvData();
            showBox("al_video.php?act=live_spectators_box", {
                owner_id: e.oid,
                video_id: e.vid,
                hash: e.hash
            }, {
                params: {
                    grey: !0,
                    hideButtons: !0,
                    width: 638,
                    bodyStyle: "padding: 0; border: 0;",
                    onShow: function() {
                        addEvent(boxLayerWrap, "scroll", Videoview.onLiveSpectatorsScroll), setTimeout(Videoview.onLiveSpectatorsScroll, 0)
                    },
                    onHide: function() {
                        removeEvent(boxLayerWrap, "scroll", Videoview.onLiveSpectatorsScroll)
                    }
                },
                onFail: function(e) {
                    return curBox().hide(), showFastBox(getLang("global_error_occured"), e), !0
                }
            })
        },
        onLiveSpectatorsScroll: function() {
            var e = lastWindowHeight,
                i = ge("video_spectators_more_link");
            isVisible(i) && e > getXY(i, !0)[1] && i.click()
        },
        loadMoreLiveSpectators: function(e) {
            if (!isButtonLocked(e)) {
                var i = mvcur.liveSpectatorsPerPage,
                    o = mvcur.liveSpectatorsShown,
                    t = mvcur.liveSpectatorsList.slice(o, o + i);
                if (t.length) {
                    var a = Videoview.getMvData();
                    ajax.post("al_video.php?act=live_spectators_box", {
                        owner_id: a.oid,
                        video_id: a.vid,
                        more: t.join(","),
                        hash: a.hash
                    }, {
                        onDone: function(t, a) {
                            var n = ge("video_spectators_rows");
                            if (n.insertAdjacentHTML("beforeend", t), mvcur.liveSpectatorsShown = o + i, mvcur.liveSpectatorsShown >= mvcur.liveSpectatorsList.length && hide(e), mvcur.liveSpectatorsShown >= mvcur.liveSpectatorsLimit) {
                                hide(e);
                                var d = ge("video_spectators_bottom");
                                n.appendChild(d), show(d)
                            }
                        },
                        showProgress: lockButton.pbind(e),
                        hideProgress: unlockButton.pbind(e)
                    })
                }
            }
        },
        checkOtherLives: function(e) {
            mvcur.mvShown && !mvcur.minimized && mvcur.videoRaw == e && (ajax.post("al_video.php?act=live_other_videos", {
                video: e
            }, {
                onDone: function(i) {
                    Videoview.updateOtherLives(e, i)
                },
                onFail: function() {
                    return !0
                }
            }), setTimeout(Videoview.checkOtherLives.pbind(e), 6e4))
        },
        updateOtherLives: function(e, i) {
            if (mvcur.mvShown && mvcur.videoRaw == e) {
                var o = domByClass(mvLayer, "mv_info_narrow_column");
                val(o, i), mvcur.mvData.is_active_live || Videoview.adaptRecomsHeight()
            }
        },
        finishLivePreparation: function(e) {
            var i = Videoview.getMvData();
            ajax.post("al_video.php?act=live_finish_preparation", {
                oid: i.oid,
                vid: i.vid,
                notify_followers: isChecked("mv_live_preparation_notify_followers"),
                hash: e
            }, {
                onDone: Videoview.reload
            })
        },
        reload: function() {
            var e = Videoview.getMvData();
            Videoview.hide(!0, !0), Videoview.recache(e.videoRaw), showVideo(e.videoRaw, "", {
                autoplay: 1
            })
        },
        onVideoShared: function(e, i, o) {
            "publish" != e || Videoview._isCurrentVideoPublished() || (Videoview.hide(!0, !0), setTimeout(function() {
                0 == i.indexOf("video") && (i = i.substr("video".length)), Videoview.recache(i), showVideo(i, o)
            }, 100))
        },
        _onAddToCommunity: function() {
            showBox("al_video.php?act=add_to_club_pl_box", {
                oid: mvcur.mvData.oid,
                vid: mvcur.mvData.vid
            })
        },
        _onEdit: function() {
            var e = mvcur.mvData.oid,
                i = mvcur.mvData.vid;
            Videoview.showEditBox(i, e)
        },
        _onDelete: function() {
            var e = mvcur.mvData.oid,
                i = mvcur.mvData.vid,
                o = mvcur.mvData.deleteHash,
                t = !1,
                a = "videoviewer";
            Videoview.deleteVideo(i, e, o, t, a)
        },
        _onExport: function() {
            Videoview.sendVideo(!0)
        },
        _onViewStats: function() {
            showBox("al_stats.php", {
                act: "video_stat",
                oid: mvcur.mvData.stats.stat_oid,
                vid: mvcur.mvData.stats.stat_vid
            }, {
                params: {
                    width: 795,
                    bodyStyle: "padding: 0"
                }
            })
        },
        addToClubPlaylistBoxInit: function(e, i, o) {
            function t(e, i) {
                return hide("mv_add_to_club_albums"), val("mv_add_to_club_albums_list", ""), -1 == e ? void val("mv_add_to_club_gid", "") : (show("mv_add_to_club_albums_progress"), void ajax.post("al_video.php?act=a_get_club_playlists", {
                    gid: i,
                    oid: mvcur.mvData.oid,
                    vid: mvcur.mvData.vid
                }, {
                    onDone: function(e) {
                        playlistsHtml = "", each(e, function(e, i) {
                            playlistsHtml += '<div class="mv_add_to_club_albums_list_item checkbox ' + (+i.added ? "on" : "") + '" data-id="' + i.id + '" onclick="checkbox(this)">' + i.title + "</div>"
                        }), val("mv_add_to_club_albums_list", playlistsHtml), val("mv_add_to_club_gid", i), hide("mv_add_to_club_albums_progress"), show("mv_add_to_club_albums")
                    }
                }))
            }
            WideDropdown.deinit("add_to_pl_club_dd"), mvcur.addToClubPl = WideDropdown.init("add_to_pl_club_dd", {
                defaultItems: i,
                noResult: "no result",
                introText: "choose",
                onChange: t
            }), setTimeout(elfocus.pbind("add_to_pl_club_dd_input"), 0), e.removeButtons(), e.addButton(getLang("Save"), function(e) {
                var i = val("mv_add_to_club_gid"),
                    t = [];
                each(geByClass("mv_add_to_club_albums_list_item"), function(e, i) {
                    isChecked(i) && t.push(attr(i, "data-id"))
                }), ajax.post("al_video.php?act=a_add_to_playlist", {
                    hash: o,
                    gid: i,
                    oid: mvcur.mvData.oid,
                    vid: mvcur.mvData.vid,
                    playlists: t.length ? t : "0"
                }, {
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e),
                    onDone: function() {
                        curBox().hide(), showDoneBox(getLang("video_changes_saved"))
                    }
                })
            }, null, !0)
        },
        setTitle: function(e) {
            var i = mvcur.mvData.title || "";
            e = e || 590, val("mv_min_title", Videoview._isCurrentVideoPublished() ? stripHTML(i) : ""), setStyle("mv_min_title", {
                maxWidth: Math.max(0, e - 70)
            });
            var o = ge("mv_title");
            o && (val(o, i), setStyle(o, {
                display: "block"
            }), o.scrollHeight > o.offsetHeight && attr(o, "title", replaceEntities(stripHTML(i))), setStyle(o, {
                display: ""
            }))
        },
        expandDescr: function(e) {
            var i = ge("mv_desc_full_text");
            ge("mv_descr_field").innerHTML = i.innerHTML, Videoview.cleanExpandDescrEls()
        },
        cleanExpandDescrEls: function() {
            re(ge("mv_desc_full_text")), re(ge("mv_descr_expand_toggle"))
        },
        setDesc: function() {
            ge("mv_descr_field") && val(ge("mv_descr_field"), mvcur.mvData.desc || "")
        },
        getContSize: function() {
            return mvcur.contSize || (mvcur.contSize = getSize("mv_box")), mvcur.contSize
        },
        getContPlace: function(e, i) {
            var o = 0,
                t = Videoview.getContSize(),
                a = e.clientX - mvcur.minSize.wrap.l,
                n = e.clientY - mvcur.minSize.wrap.t;
            return 6 > n && (o += 1), a > t[0] - 20 && (o += 2), n > t[1] - 10 && (o += 4), 10 > a && (o += 8), 1 == o && a > t[0] - 55 && (o = 0), !o && 25 > n && a < t[0] - 55 && (o += 16), o
        },
        changeCursor: function(e) {
            if (!Videoview.isFS) {
                var i = Videoview.getContPlace(e),
                    o = "default";
                if (i && mvcur.minimized) {
                    var t = "";
                    1 & i && (t += "n"), 4 & i && (t += "s"), 2 & i && (t += "e"), 8 & i && (t += "w"), o = t + "-resize", 16 & i && (o = "move")
                }
                setStyle("mv_box", {
                    cursor: o
                })
            }
        },
        getMinSize: function() {
            extend(mvcur.minSize, {
                wrap: {
                    t: intval(mvLayerWrap.style.top),
                    l: intval(mvLayerWrap.style.left),
                    w: intval(mvLayerWrap.style.width),
                    h: intval(mvLayerWrap.style.height)
                },
                player: {
                    w: intval(mvcur.mvPlayer && mvcur.mvPlayer.style.width),
                    h: intval(mvcur.mvPlayer && mvcur.mvPlayer.style.height)
                }
            })
        },
        startDrag: function(e) {
            if (!(Videoview.isFS || e.button && 1 !== e.button)) {
                var i = Videoview.getContPlace(e, !0);
                if (i) {
                    var o = (new Date).getTime();
                    if (Videoview.getMinSize(), extend(mvcur.minSize, {
                            x: e.clientX,
                            y: e.clientY
                        }), mvcur.resizeDiff = 0, !i || 16 & i) var t = Videoview.onMinMove;
                    else var t = Videoview.onMinResize;
                    mvcur.resizeMask = i;
                    var a = function(e) {
                        removeEvent(document, "mouseup", a), removeEvent(document, "mousemove", t), removeEvent(document, "drag", t);
                        var n = (new Date).getTime();
                        return Videoview.getMinSize(), mvcur.resizeDiff < 8 && 400 > n - o && (16 & i || 1 == i) && Videoview.unminimize(), removeClass(mvLayerWrap, "mv_resizing"), removeClass("mv_player_box", "no_events"), addEvent("mv_box", "mousemove", Videoview.changeCursor), ls.set("mv_minSize", mvcur.minSize), !1
                    };
                    return addClass(mvLayerWrap, "mv_resizing"), addClass("mv_player_box", "no_events"), addEvent(document, "mouseup", a), addEvent(document, "mousemove", t), addEvent(document, "drag", t), removeEvent("mv_box", "mousemove", Videoview.changeCursor), cancelEvent(e)
                }
            }
        },
        onMinMove: function(e) {
            if (e) var i = e.clientY - mvcur.minSize.y,
                o = e.clientX - mvcur.minSize.x;
            else var i = 0,
                o = 0;
            return mvcur.minSize.wrap.t + i > mvcur.minSize.ch - mvcur.minSize.wrap.h - 15 && (i = mvcur.minSize.ch - mvcur.minSize.wrap.h - mvcur.minSize.wrap.t), mvcur.minSize.wrap.l + o > mvcur.minSize.cw - mvcur.minSize.wrap.w - 15 && (o = mvcur.minSize.cw - mvcur.minSize.wrap.w - mvcur.minSize.wrap.l), mvcur.minSize.wrap.t + i < 15 && (i = -mvcur.minSize.wrap.t), mvcur.minSize.wrap.l + o < 15 && (o = -mvcur.minSize.wrap.l), setStyle(mvLayerWrap, {
                top: mvcur.minSize.wrap.t + i + "px",
                left: mvcur.minSize.wrap.l + o + "px"
            }), mvcur.resizeDiff = Math.max(Math.abs(o), Math.max(Math.abs(i), mvcur.resizeDiff)), e ? cancelEvent(e) : !1
        },
        onMinResize: function(e) {
            var i = 0,
                o = 0,
                t = mvcur.resizeMask,
                a = 1 & t || 4 & t ? e.clientY - mvcur.minSize.y : 0,
                n = 2 & t || 8 & t ? e.clientX - mvcur.minSize.x : 0;
            4 & t && mvcur.minSize.wrap.t + a > mvcur.minSize.ch - mvcur.minSize.wrap.h && (a = mvcur.minSize.ch - mvcur.minSize.wrap.h - mvcur.minSize.wrap.t), 1 & t && mvcur.minSize.wrap.t + a < 0 && (a = -mvcur.minSize.wrap.t), 2 & t && mvcur.minSize.wrap.l + n > mvcur.minSize.cw - mvcur.minSize.wrap.w - 14 && (n = mvcur.minSize.cw - mvcur.minSize.wrap.w - mvcur.minSize.wrap.l - 14), 8 & t && mvcur.minSize.wrap.l + n < 0 && (n = -mvcur.minSize.wrap.l), 8 & t && (i = n, n = -n), 1 & t && (o = a, a = -a), mvcur.minSize.wrap.w + n < 307 && (n = 307 - mvcur.minSize.wrap.w, 8 & t && (i = -n)), mvcur.minSize.wrap.h + a < 200 && (a = 200 - mvcur.minSize.wrap.h, 1 & t && (o = -a)), setStyle(mvLayerWrap, {
                left: positive(mvcur.minSize.wrap.l + i) + "px",
                top: positive(mvcur.minSize.wrap.t + o) + "px",
                width: mvcur.minSize.wrap.w + n + "px",
                height: mvcur.minSize.wrap.h + a + "px"
            }), setStyle(mvcur.mvPlayer, {
                width: mvcur.minSize.player.w + n + "px",
                height: mvcur.minSize.player.h + a + "px"
            });
            var d = Math.abs(n) + Math.abs(a);
            return mvcur.resizeDiff = Math.max(d, mvcur.resizeDiff), mvcur.contSize = !1, Videoview.setTitle(mvcur.minSize.wrap.w + n), Videoview.playerOnResize(), Videoview.updateExternalVideoFinishBlock(), !1
        },
        minimize: function(e) {
            if (e && cancelEvent(e), mvcur.minimized) return !1;
            show("mv_min_header"), hide("mv_info"), hide("mv_top_controls"), isVisible("mv_approve") ? (mvcur.needShowApprove = !0, hide("mv_approve")) : mvcur.needShowApprove = !1, Wall.cancelEdit(!0), addClass(mvLayerWrap, "mv_minimized"), mvcur.minSize || (mvcur.minSize = ls.get("mv_minSize"));
            var i = "mv_dark";
            removeClass(mvLayerWrap, i), removeClass(layerBG, i), layers.fullhide = !1, mvcur.minSize && Videoview.enabledResize() && mvcur.minSize.wrap.w || (mvcur.minSize = {
                wrap: {
                    w: 307,
                    h: 200
                }
            });
            var o = mvcur.minSize.wrap;
            mvcur.minSize.player = {
                w: o.w - 12,
                h: o.h - 34
            }, Videoview.setStyle("mvContainer", "mv_container", {
                marginTop: 0,
                marginBottom: 0
            }), setStyle(mvLayer, {
                width: "auto"
            }), Videoview.minimizePlayer(), window.tooltips && tooltips.destroyAll("mv_container"), removeEvent(window, "resize", Videoview.onResize), removeEvent(document, "webkitfullscreenchange mozfullscreenchange fullscreenchange", Videoview.onFullscreenChange), removeEvent(document, "keydown", Videoview.onKeyDown), addEvent(window, "resize", Videoview.minResize), Videoview.enabledResize() ? (addEvent("mv_box", "mousedown", Videoview.startDrag), addEvent("mv_box", "mousemove", Videoview.changeCursor), mvcur.minDestroy = function() {
                removeEvent("mv_box", "mousedown", Videoview.startDrag), removeEvent("mv_box", "mousemove", Videoview.changeCursor), setStyle("mv_box", {
                    cursor: "default"
                })
            }) : (addEvent(ge("mv_min_title"), "click", Videoview.unminimize), mvcur.minDestroy = function() {
                removeEvent("mv_min_title", "click", Videoview.unminimize)
            }), Videoview.setTitle(o.w), Videoview.minResize(), Videoview.setStyle("mvLayerWrap", mvLayerWrap, {
                width: mvcur.minSize.wrap.w + "px",
                height: mvcur.minSize.wrap.h + "px"
            }), mvcur.minimized = !0, layers.wraphide(), setTimeout(Videoview.playerOnResize, 10);
            var t = layerQueue.count();
            return mvcur.noLocChange || (Videoview.backLocation(), mvcur.noHistory = 1), layerQueue.skipVideo = !0, t && (debugLog("pop from minimize"), layerQueue.pop()), VideoPlaylist.toggleStateClasses(), VideoChat.toggleStateClasses(), mvcur.preparationBlock && removeClass("mv_box", "_has_preparation"), Videoview.updateExternalVideoFinishBlock(), !1
        },
        isLayerShown: function(e) {
            return !(!window.mvcur || !mvcur.mvShown || !isUndefined(e) && mvcur.videoRaw != e)
        },
        isMinimized: function() {
            return !!(window.mvcur && mvcur.mvShown && mvcur.minimized)
        },
        enabledResize: function() {
            return !browser.mobile
        },
        minimizePlayer: function() {
            if (mvcur.mvPlayer = ge("mv_player_box"), mvcur.mvPlayer) {
                var e = {
                    width: mvcur.minSize.player.w + "px",
                    height: mvcur.minSize.player.h + "px"
                };
                Videoview.setStyle("mvPlayer", mvcur.mvPlayer, e), Videoview.playerOnResize()
            }
        },
        minResize: function() {
            var e = document.documentElement;
            mvcur.minSize.ch = window.innerHeight || e.clientHeight || bodyNode.clientHeight, mvcur.minSize.cw = window.innerWidth || e.clientWidth || bodyNode.clientWidth;
            var i = getXY(ge("page_layout"));
            void 0 === mvcur.minSize.wrap.t && (mvcur.minSize.wrap.t = mvcur.minSize.ch - mvcur.minSize.wrap.h), void 0 === mvcur.minSize.wrap.l && (mvcur.minSize.wrap.l = Math.max(String(i[0] - mvcur.minSize.player.w / 2), 30)), setStyle(mvLayerWrap, {
                left: mvcur.minSize.wrap.l + "px",
                top: mvcur.minSize.wrap.t + "px"
            }), Videoview.onMinMove(), mvcur.minimized && Videoview.getMinSize()
        },
        unminimize: function(e, i, o) {
            if (mvcur.minimized) {
                window.wkcur && "story" == wkcur.type && window.Stories && WkView.hide(!1, !0), o || layerQueue.push(), i || (layerQueue.hide(), setTimeout(function() {
                    mvcur.noHistory = 1, layerQueue.noHistory(), layers.wrapshow(mvLayerWrap, .7), layers.fullhide = Videoview.hide
                }, 0)), Videoview.hidePlayer(!0), mvcur.minimized = !1, removeClass(mvLayerWrap, "mv_minimized"), Videoview.restoreStyle("mvLayerWrap", mvLayerWrap), toggle("mv_info", !mvcur.options.hideInfo && !mvcur.mvData.noControls && !mvcur.minimized), hide("mv_min_header"), show("mv_top_controls");
                var t = "mv_dark";
                return addClass(mvLayerWrap, t), addClass(layerBG, t), mvcur.needShowApprove && (mvcur.needShowApprove = !1, show("mv_approve")), Videoview.restoreStyle("mvContainer", "mv_container"), mvcur.mvPlayer && Videoview.restoreStyle("mvPlayer", mvcur.mvPlayer), setStyle("mv_player_box", {
                    width: "",
                    height: ""
                }), mvcur.mvData.is_active_live || Videoview.adaptRecomsHeight(), Videoview.updateSize(), addEvent(window, "resize", Videoview.onResize), addEvent(document, "webkitfullscreenchange mozfullscreenchange fullscreenchange", Videoview.onFullscreenChange), addEvent(document, "keydown", Videoview.onKeyDown), removeEvent(window, "resize", Videoview.minResize), mvcur.minDestroy && mvcur.minDestroy(), mvcur.noLocChange || e === !0 || Videoview.setLocation(), onBodyResize(!0), setStyle(mvLayerWrap, {
                    left: "0px",
                    top: "0px"
                }), Videoview.showPlayer(!0), Videoview.setTitle(), VideoPlaylist.toggleStateClasses(), mvcur.chatMode && (VideoChat.toggleStateClasses(), VideoChat.updateScroll()), mvcur.preparationBlock && addClass("mv_box", "_has_preparation"), Videoview.viewScroll(), Videoview.playerOnResize(), !1
            }
        },
        toggleSideBlock: function(e) {
            return mvcur.chatMode ? VideoChat.toggle() : VideoPlaylist.toggle(), cancelEvent(e)
        },
        sendVideo: function(e) {
            Videoview.hidePlayer();
            var i = showBox("like.php", {
                act: "publish_box",
                object: "video" + mvcur.videoRaw,
                list: mvcur.listId,
                is_export: e
            }, {
                stat: ["page.js", "page.css", "wide_dd.js", "wide_dd.css", "sharebox.js"]
            });
            i.setOptions({
                onHideAttempt: function() {
                    return Videoview.showPlayer(), !0
                }
            }), Videoview.playerNextTimerUpdate()
        },
        showDD: function(e, i) {
            if (clearTimeout(cur.hideShareTimer), e.blur(), !hasClass(i, "mv_dd_hiding")) {
                if (isVisible(i)) return fadeIn(i, 0);
                cur.ddShown && Videoview.hideDD(0), cur.ddShown = i, setTimeout(addEvent.pbind(document, "click", Videoview.hideDD), 1), show(i)
            }
        },
        hideDD: function(e) {
            if (e > 0) return void(cur.hideShareTimer = setTimeout(Videoview.hideDD.pbind(0), e));
            var i = cur.ddShown;
            i && (-1 == e ? hide(i) : (addClass(i, "mv_dd_hiding"), fadeOut(i, 200, function() {
                removeClass(i, "mv_dd_hiding")
            })), removeEvent(document, "click", Videoview.hideDD), cur.ddShown = !1)
        },
        reportFromDD: function(e, i) {
            ajax.post("reports.php", {
                act: "new_report",
                type: "video",
                reason: i,
                hash: e,
                oid: mvcur.mvData.oid,
                item_id: mvcur.mvData.vid
            }, {
                onDone: function(e) {
                    showDoneBox(e)
                }
            })
        },
        reportComment: function(e, i, o) {
            stManager.add(["privacy.js", "privacy.css"], function() {
                return Privacy.show(e, i, "report_" + o)
            })
        },
        descTT: function(e) {
            return showTooltip(e, {
                text: getLang("video_edit_desc"),
                black: 1,
                shift: [0, 7, 0],
                showdt: 0
            })
        },
        viewScroll: function() {
            var e, i = 6,
                o = (ge("mv_top_controls"), getXY("mv_main", !0)[1]),
                t = getSize("mv_player_box")[1];
            e = o - i, e = 0 > e ? -e : 0, toggleClass("mv_top_controls", "fixed", e > 0), toggleClass("mv_pl_prev", "fixed", e > 0), toggleClass("mv_pl_next", "fixed", e > 0), toggleClass("mv_top_pl_toggle", "hidden", e > t), mvcur.scrolledAway = e > t / 3, Videoview.playerNextTimerUpdate(), Videoview.updateReplyFormPos()
        },
        updateReplyFormPos: function() {
            var e = ge("mv_reply_form"),
                i = ge("mv_comments_wrap"),
                o = getSize(e),
                t = domPN(e),
                a = clientHeight(),
                n = (mvLayerWrap.scrollTop, getXY(mvLayerWrap)[1]),
                d = getXY("mv_box")[1] - n,
                r = getXY(i)[1] - n,
                s = getSize(i)[1],
                v = getSize("mv_box")[1],
                l = d + v > a && s > 0;
            l ? (addClass(e, "mv_reply_form_fixed"), setStyle(e, {
                bottom: Math.min(a - r - o[1], 0) + "px"
            }), setStyle(t, {
                width: o[0] + "px",
                height: o[1] + "px"
            })) : (removeClass(e, "mv_reply_form_fixed"), setStyle(e, {
                bottom: null
            }), setStyle(t, {
                width: null,
                height: null
            }))
        },
        editInline: function(e) {
            if (!(e && "A" == e.target.tagName || !window.mvcur || mvcur.mvEditing) && ge("mv_description")) {
                var i = mvcur.videoRaw,
                    o = mvcur.mvShown,
                    t = mvcur.mvData,
                    a = !t.desc,
                    n = function(e) {
                        if (mvcur.mvShown && mvcur.videoRaw == i && mvcur.mvShown == o && !mvcur.mvEditing) {
                            Videoview.cleanExpandDescrEls(), mvcur.mvEditing = i;
                            var t = "margin-bottom:" + (browser.chrome || browser.safari ? -4 : 0) + "px",
                                a = ce("div", {
                                    id: "mv_edit_text_wrap",
                                    innerHTML: '<textarea id="mv_edit_text" style="' + t + '" onkeydown="onCtrlEnter(event, Videoview.saveInline)" onkeyup="checkTextLength(mvcur.maxDescriptionLength, this, ge(\'mv_caption_warn\'));" placeholder="' + getLang("video_edit_desc_intro") + '">' + e + '</textarea><div id="mv_caption_warn"></div>'
                                });
                            ge("mv_description").appendChild(a);
                            var n = ge("mv_edit_text");
                            setStyle(n, {
                                width: ge("mv_description").offsetWidth + "px"
                            }), placeholderInit(n), autosizeSetup(n, {
                                minHeight: 18,
                                ignorePadding: !0
                            }), setTimeout(function() {
                                show(a), elfocus(n), addEvent(n, "blur", Videoview.saveInline), hide("mv_descr_field")
                            }, 1)
                        }
                    };
                a ? n("") : ajax.post("al_video.php", {
                    act: "edit_desc",
                    oid: t.oid,
                    vid: t.vid
                }, {
                    onDone: n,
                    progress: "mv_inline_edit_pr"
                })
            }
        },
        cancelInline: function() {
            mvcur.mvEditing = !1, removeEvent("mv_edit_text", "blur"), show("mv_descr_field"), re("mv_edit_text_wrap")
        },
        saveInline: function() {
            if (mvcur.mvEditing) {
                removeEvent("mv_edit_text", "blur");
                var e = mvcur.mvEditing,
                    i = mvcur.mvShown,
                    o = mvcur.mvData;
                ajax.post("al_video.php", {
                    act: "save_desc",
                    oid: o.oid,
                    vid: o.vid,
                    hash: o.editHash,
                    desc: val("mv_edit_text")
                }, {
                    onDone: function(t) {
                        o.desc = t;
                        var a = mvcur.mvShown && e == mvcur.videoRaw && i == mvcur.mvShown;
                        if (a) {
                            mvcur.mvEditing = !1;
                            var n = ge("mv_descr_field");
                            val(n, t || '<span class="mv_desc_edit">' + getLang("video_edit_desc") + "</span>"), n.onmouseover = t ? Videoview.descTT.pbind(n) : function() {}, show(n), re("mv_edit_text_wrap")
                        }
                    },
                    progress: "mv_inline_edit_pr"
                })
            }
        },
        onExternalVideoEnded: function(e) {
            e = e || domPN(ge("video_player"));
            var i = getSize(e),
                o = (Videoview.getNextVideosData() || [])[0],
                t = !!window.CanvasRenderingContext2D,
                a = Videoview.getMvData();
            if (e && a && !ge("mv_external_finish")) {
                var n = a.liked,
                    d = a.added,
                    r = a.can_add,
                    s = a.subscribed;
                Videoview.logViewedPercentage();
                var v = "";
                if (o && i[0] >= 400 && i[1] >= 300) v = '<div id="mv_finish_next" class="mv_finish_next" onclick="Videoview.onExternalVideoNext(true)">  <div class="mv_finish_next_caption">' + getLang("video_player_next_title") + '</div>  <div class="mv_finish_next_thumb" style="background-image: url(' + o.thumb + ')"></div>  <div class="mv_finish_next_timer">    <canvas class="mv_finish_next_timer_canvas" width="100" height="100"></canvas>    <div class="mv_finish_next_timer_play mv_finish_icon"></div>  </div>  <div class="mv_finish_next_info">    <div class="mv_finish_next_title">' + o.title + '</div>    <div class="mv_finish_next_views">' + o.views + '</div>  </div>  <div class="mv_finish_next_cancel mv_finish_icon" onclick="Videoview.onExternalVideoNextCancel(event)"></div></div>    ';
                else if (!ge("video_yt")) return;
                var l = Videoview.getSuggestionsData(),
                    c = "onSuggestionClick";
                l && l.length || (l = Videoview.getNextVideosData(), c = "onVideoNext");
                var m = "";
                l && l.length && i[0] >= 580 && i[1] >= 300 && (m = '<div id="mv_finish_suggestions" class="mv_finish_suggestions ' + (v ? "hidden" : "") + '">', each(l, function(e, i) {
                    m += '<a class="mv_finish_suggestions_item" onclick="videoCallback([\'' + c + "', '" + i.vid + '\']); return false;" href="//vk.com/video' + i.vid + '" title="' + i.title + '">  <div class="mv_finish_suggestions_item_thumb" style="background-image: url(' + i.thumb + ')"></div>  <div class="mv_finish_suggestions_item_title">' + i.title + '</div>  <div class="mv_finish_suggestions_item_views">' + i.views + "</div></a>      "
                }), m += "</div>");
                var u = !1,
                    _ = !1;
                if (!v && !m) {
                    if (a.noControls || a.nolikes) return;
                    i[0] > 250 && i[1] > 200 ? u = !0 : _ = !0
                }
                var p = window.mvcur && mvcur.minimized,
                    h = se('<div class="mv_external_finish" id="mv_external_finish" onclick="Videoview.onExternalVideoBgClick(this, event)">  <div class="mv_finish_header">    <div id="mv_finish_subscribe" class="fl_r mv_finish_subscribe ' + (s ? "mv_finish_subscribed" : "") + '">      <button id="mv_finish_subscribe_btn" class="mv_finish_subscribe_btn fl_l" onclick="Videoview.onExternalVideoSubscribe()">' + (s ? getLang("video_view_subscribed_msg") : getLang("video_view_subscribe_to_author")) + '</button>      <a href="' + a.authorHref + '" target="_blank" class="fl_r"><img class="mv_finish_author_img" src="' + a.authorPhoto + '"></a>    </div>    <div id="mv_finish_title" class="mv_finish_title" style="' + (p ? "display:none" : "") + '">' + a.title + '</div>  </div>  <div id="mv_finish_actions" class="mv_finish_actions ' + (u ? "mv_finish_actions_extended" : "") + " " + (r ? "" : "mv_finish_actions_cant_add") + " " + (_ ? "mv_finish_actions_no_content" : "") + '">    <div class="mv_finish_like ' + (n ? "selected" : "") + '" onclick="Videoview.onExternalVideoLike()">      <div class="mv_finish_like_icon mv_finish_icon"></div>      <div class="mv_finish_liked_icon mv_finish_icon"></div>      <div class="mv_finish_like_text">' + getLang("video_i_like") + '</div>    </div>    <div class="mv_finish_share" onclick="Videoview.onExternalVideoShare()">      <div class="mv_finish_share_icon mv_finish_icon"></div>      <div class="mv_finish_share_text">' + getLang("video_share_with_friends") + '</div>    </div>    <div class="mv_finish_add ' + (d ? "selected" : "") + '" onclick="Videoview.onExternalVideoAdd()">      <div class="mv_finish_add_icon mv_finish_icon"></div>      <div class="mv_finish_added_icon mv_finish_icon"></div>    </div>  </div>  ' + v + "  " + m + "</div>  ");
                a.canSubscribe || re(geByClass1("mv_finish_subscribe", h)), (a.noControls || a.nolikes) && re(geByClass1("mv_finish_actions", h)), e.appendChild(h), t && o && v && (window.focus(), mvcur.nextTimer = {
                    ctx: geByClass1("mv_finish_next_timer_canvas", h).getContext("2d"),
                    nextTimerReset: function() {
                        clearTimeout(mvcur.nextTimer.timeout), mvcur.nextTimer.ctx.clearRect(0, 0, 100, 100), mvcur.nextTimer.started = null
                    },
                    nextTimerStart: function() {
                        mvcur.nextTimer.started || (mvcur.nextTimer.started = (new Date).getTime(), Videoview.onExternalVideoTimer())
                    }
                }, mvcur.nextTimer.ctx.lineWidth = 6, mvcur.nextTimer.ctx.lineCap = "round", mvcur.nextTimer.ctx.strokeStyle = "#fff", mvcur.nextTimerStopped || mvcur.nextTimer.nextTimerStart())
            }
        },
        onExternalVideoTimer: function() {
            if (window.mvcur && mvcur.nextTimer && mvcur.nextTimer.ctx && mvcur.nextTimer.started) {
                var e = Math.min(1, Math.max(0, ((new Date).getTime() - mvcur.nextTimer.started) / 1e4)),
                    i = mvcur.nextTimer.ctx;
                i.clearRect(0, 0, 100, 100), i.beginPath(), i.arc(50, 50, 47, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * e), i.stroke(), 1 > e ? mvcur.nextTimer.timeout = setTimeout(Videoview.onExternalVideoTimer, 20) : Videoview.onExternalVideoNext()
            }
        },
        onExternalVideoNext: function(e) {
            Videoview.removeExternalVideoFinishBlock(), mvcur.nextTimer = null, VideoPlaylist.nextVideo(), Videoview.sendPlayerStats(e ? 6 : 5, 4)
        },
        onExternalVideoNextCancel: function(e) {
            e && e.stopPropagation(), clearTimeout(mvcur.nextTimer.timeout), mvcur.nextTimer = null, ge("video_yt") ? (re("mv_finish_next"), removeClass("mv_finish_suggestions", "hidden")) : re("mv_external_finish")
        },
        onExternalVideoBgClick: function(e, i) {
            i.target === e && Videoview.removeExternalVideoFinishBlock()
        },
        onExternalVideoLike: function() {
            videoCallback(["onLike", 4]), Videoview.playerOnLiked()
        },
        onExternalVideoShare: function() {
            if (Videoview.isFS) {
                var e = Videoview.getPlayerObject();
                e && e.toggleFullscreen && e.toggleFullscreen()
            }
            videoCallback(["onShare", 4])
        },
        onExternalVideoAdd: function() {
            var e = Videoview.getMvData();
            if (e) {
                e.added ? videoCallback(["onRemove"]) : videoCallback(["onAdd", e.videoRaw, e.add_hash, 4]);
                var i = Videoview.getPlayerObject();
                i.onAdded && i.onAdded()
            }
        },
        onExternalVideoSubscribe: function() {
            var e = Videoview.getMvData();
            if (e) {
                var i = !e.subscribed;
                Videoview.subscribeToAuthor(i, "external_player", !1), Videoview.sendPlayerStats(i ? 9 : 10, 4)
            }
        },
        updateExternalVideoFinishBlock: function() {
            var e = ge("mv_external_finish");
            if (e) {
                var i = getSize(e);
                (isVisible("mv_finish_next") && (i[0] < 400 || i[1] < 300) || isVisible("mv_finish_suggestions") && (i[0] < 580 || i[1] < 300) || hasClass("mv_finish_actions", "mv_finish_actions_extended") && (i[0] < 250 || i[1] < 200)) && (mvcur.nextTimer && Videoview.onExternalVideoNextCancel(), re("mv_finish_next"), re("mv_finish_suggestions"), removeClass("mv_finish_actions", "mv_finish_actions_extended"), addClass("mv_finish_actions", "mv_finish_actions_no_content")), toggle("mv_finish_title", !(window.mvcur && mvcur.minimized)), toggleClass("mv_finish_subscribe", "mv_finish_subscribe_min", i[0] < 500)
            }
        },
        removeExternalVideoFinishBlock: function() {
            window.mvcur && mvcur.nextTimer && Videoview.onExternalVideoNextCancel(), re("mv_external_finish")
        },
        logViewedPercentage: function() {
            if (mvcur && mvcur.mvData && mvcur.mvData.videoRaw && mvcur.mvData.duration) {
                var e = mvcur.mvData.videoRaw,
                    i = mvcur.mvData.duration,
                    o = (new Date).getTime(),
                    t = mvcur.viewStartedTimestamp;
                if (!t) return !1;
                var a = Math.min(Math.round((o - t) / 1e3), i);
                delete mvcur.viewStartedTimestamp, ajax.post("al_video.php", {
                    act: "a_viewed_percentage",
                    video_raw: e,
                    viewed_time: a,
                    duration: i
                })
            }
        }
    },
    videoview = Videoview,
    VideoPlaylist = {
        VIDEOS_LIMIT: 100,
        lists: {},
        blockTpl: '<div class="mv_playlist" id="video_mvpl" onmouseenter="VideoPlaylist.toggleHeaderButtons(this, true)" onmouseleave="VideoPlaylist.toggleHeaderButtons(this, false)">  <div class="mv_playlist_header clear_fix">    <div class="mv_playlist_header_buttons_wrap unshown">      <div id="mv_pl_autoplay" class="mv_playlist_header_btn %autoplayBtnClass%" onmouseover="VideoPlaylist.showAutoplayTooltip(this);" onclick="VideoPlaylist.toggleAutoplay(this)"><div class="mv_playlist_header_autoplay_icon"></div></div>      <div id="mv_pl_reverse" class="mv_playlist_header_btn _opaque" onmouseover="VideoPlaylist.showReverseTooltip(this);" onclick="VideoPlaylist.toggleReverse(this)"><div class="mv_playlist_header_reverse_icon"></div></div>    </div>    <div class="mv_playlist_header_title">%title%</div>  </div>  <div class="mv_playlist_list">    <div class="mv_playlist_list_cont">      %items%    </div>  </div></div>  ',
        blockItemTpl: '<a class="mv_playlist_item %itemClass%" id="mv_playlist_video%vid%" onclick="return VideoPlaylist.showVideo(\'%vid%\', event);" data-vid="%vid%" href="/video%vid%">  <div class="mv_playlist_item_thumb" style="background-image: url(\'%thumb%\');">    <div class="mv_playlist_item_duration">%duration%</div>  </div>  <div class="mv_playlist_item_info">    <div class="mv_playlist_item_title">%title%</div>    <div class="mv_playlist_item_views">%views%</div>  </div></a>  ',
        toggleHeaderButtons: function(e, i) {
            toggleClass(domByClass(e, "mv_playlist_header_buttons_wrap"), "unshown", !i)
        },
        showReverseTooltip: function(e) {
            showTooltip(e, {
                text: getLang("video_playlist_reverse_tt"),
                shift: [7, 7, 0],
                showdt: 0,
                black: 1
            })
        },
        showAutoplayTooltip: function(e) {
            var i = VideoPlaylist.isAutoplayEnabled(),
                o = "video_playlist_autoplay_" + (i ? "disable" : "enable") + "_tt",
                t = getLang(o);
            showTooltip(e, {
                text: t,
                shift: [7, 7, 0],
                showdt: 0,
                black: 1
            })
        },
        toggleAutoplay: function(e) {
            var i = !VideoPlaylist.isAutoplayEnabled();
            toggleClass(e, "_active", i), i ? ls.remove("video_playlist_autoplay_disabled") : ls.set("video_playlist_autoplay_disabled", 1), tooltips.destroy(e), VideoPlaylist.showAutoplayTooltip(e)
        },
        isAutoplayEnabled: function() {
            return !ls.get("video_playlist_autoplay_disabled")
        },
        toggleReverse: function(e) {
            var i = VideoPlaylist.getCurList();
            i && (i.reversed = !i.reversed, toggleClass(e, "_active", i.reversed), VideoPlaylist.updateBlockList(i.id))
        },
        buildBlock: function(e, i, o) {
            var t = VideoPlaylist.getBlock(),
                a = t ? data(t, "playlist") : !1;
            if (a && a.id == e && !o) return t;
            VideoPlaylist.removeBlock();
            var a = VideoPlaylist.getList(e, i);
            if (!a || a.list.length <= 1) return !1;
            var n = trim(VideoPlaylist.blockTpl),
                d = VideoPlaylist.buildBlockList(a),
                r = se(rs(n, {
                    items: d,
                    title: a.title || "",
                    autoplayBtnClass: VideoPlaylist.isAutoplayEnabled() ? "_active" : ""
                }));
            return data(r, "playlist", a), this._block = r, r
        },
        buildBlockList: function(e) {
            for (var i = trim(VideoPlaylist.blockItemTpl), o = "", t = function() {
                    return e.reversed ? e.list.length - 1 : 0
                }, a = function(i) {
                    return e.reversed ? i >= 0 : i < e.list.length
                }, n = function(i) {
                    return e.reversed ? --i : ++i
                }, d = t(); a(d); d = n(d)) {
                var r, s = e.list[d];
                if (isArray(s)) {
                    var v = s[VideoConstants.VIDEO_ITEM_INDEX_OWNER_ID] + "_" + s[VideoConstants.VIDEO_ITEM_INDEX_ID];
                    r = {
                        vid: v,
                        thumb: s[VideoConstants.VIDEO_ITEM_INDEX_THUMB],
                        title: s[VideoConstants.VIDEO_ITEM_INDEX_TITLE],
                        duration: s[VideoConstants.VIDEO_ITEM_INDEX_DURATION],
                        views: getLang("video_N_views_list", s[VideoConstants.VIDEO_ITEM_INDEX_VIEWS] || 1, !0),
                        itemClass: v == e.current ? "mv_playlist_item_active" : ""
                    }
                } else r = extend({}, s, {
                    itemClass: s.vid == e.current ? "mv_playlist_item_active" : ""
                });
                o += rs(i, r)
            }
            return o
        },
        updateBlockList: function(e) {
            var i = VideoPlaylist.getCurList();
            if (i && i.id == e) {
                var o = VideoPlaylist.getBlock(),
                    t = geByClass1("mv_playlist_list_cont", o),
                    a = VideoPlaylist.buildBlockList(i);
                val(t, a);
                var n = data(o, "sb");
                n && n.update(), VideoPlaylist.setCurVideo(i.current), VideoPlaylist.updateControls()
            }
        },
        getBlock: function() {
            return this._block
        },
        removeBlock: function() {
            var e = data(this._block, "sb");
            e && e.destroy(), re(this._block), removeData(this._block), this._block = null, VideoPlaylist.toggleStateClasses(), VideoPlaylist.updateControls()
        },
        setCurVideo: function(e, i) {
            function o() {
                var e = VideoPlaylist.getBlock();
                if (e) {
                    var i = data(e, "sb");
                    i && i.update()
                }
            }
            var t = VideoPlaylist.getBlock();
            if (t) {
                var a = data(t, "playlist");
                if (a) {
                    e && (a.current = e);
                    var n = domByClass(t, "mv_playlist_item_active");
                    if (e && (removeClass(n, "mv_playlist_item_active"), n = ge("mv_playlist_video" + e), addClass(n, "mv_playlist_item_active")), n) {
                        var d = geByClass1("mv_playlist_list", t),
                            r = getXY(n)[1],
                            s = getSize(n)[1],
                            v = getXY(d)[1],
                            l = getSize(d)[1],
                            c = r - v;
                        if (0 > c || c + s > l) {
                            var m = d.scrollTop + r - v - l / 2 + s / 2;
                            d.scrollTop != m && (i ? animate(d, {
                                scrollTop: m,
                                transition: Fx.Transitions.easeOutCubic
                            }, 450, o) : (d.scrollTop = m, o()))
                        }
                        VideoPlaylist._queueNextVideo(e)
                    }
                }
            }
        },
        getList: function(e, i) {
            if (this.lists[e]) return this.lists[e];
            var o = /^wall_-?\d+$/,
                t = /^post_-?\d+_\d+$/,
                a = /^cat_(\d|[\w_])+$/,
                n = /^-?\d+_-?\d+$/;
            if (o.test(e)) return cur.wallVideos && cur.wallVideos[e] && this.uniqList(cur.wallVideos[e]);
            if (t.test(e)) return cur.pageVideosList && cur.pageVideosList[e];
            if (a.test(e)) return cur.catVideosList && cur.catVideosList[e];
            if (n.test(e)) {
                var d, r, s, v = e.split("_"),
                    l = v[0],
                    c = v[1];
                if (-2 == c ? (d = "all", r = cur.playlistAddedTitle) : -1 == c ? (d = "uploaded", r = cur.playlistUploadedTitle) : (d = "album_" + c, r = cur.playlistTitle), each([cur.silentLoaded, cur.pageVideosList], function(e, i) {
                        return i && i[l] && i[l][d] ? (s = i[l][d], !1) : void 0
                    }), s && s.length) {
                    var m;
                    if (i)
                        for (m = s.length; --m;) {
                            var u = s[m];
                            if (u[0] + "_" + u[1] == i) break
                        } else m = 0;
                    if (s.length > VideoPlaylist.VIDEOS_LIMIT) {
                        var _ = positive(m - VideoPlaylist.VIDEOS_LIMIT / 2),
                            p = _ + VideoPlaylist.VIDEOS_LIMIT;
                        p > s.length && (_ = positive(s.length - VideoPlaylist.VIDEOS_LIMIT), p = s.length), s = s.slice(_, p)
                    }
                    return {
                        id: e,
                        title: r,
                        list: s
                    }
                }
            }
        },
        getCurList: function() {
            var e = VideoPlaylist.getBlock();
            return e ? data(e, "playlist") : void 0
        },
        getCurListId: function() {
            var e = VideoPlaylist.getCurList();
            return e ? e.id : void 0
        },
        addList: function(e) {
            this.lists[e.id] = e
        },
        extendList: function(e, i) {
            if (!this.lists[e]) return !1;
            for (var o = this.lists[e].list, t = [], a = {}, n = 0, d = 0;;)
                if (o[n] && i[d] && o[n].vid == i[d].vid) a[o[n].vid] || (t.push(o[n]), a[o[n].vid] = 1), ++n, ++d;
                else if (o[n]) a[o[n].vid] || (t.push(o[n]), a[o[n].vid] = 1), ++n;
            else {
                if (!i[d]) break;
                a[i[d].vid] || (t.push(i[d]), a[i[d].vid] = 1), ++d
            }
            return this.lists[e].list = t, this.lists[e]
        },
        uniqList: function(e) {
            for (var i, o = {}, t = 0; i = e.list[t]; ++t) o[i.vid] ? e.list.splice(t, 1) : o[i.vid] = !0;
            return e
        },
        isCollapsed: function() {
            var e = VideoPlaylist.getBlock();
            return !(!e || !data(e, "collapsed"))
        },
        toggle: function(e, i) {
            if (isUndefined(e) && (e = VideoPlaylist.isCollapsed()), !mvcur.minimized || !e) {
                var o = VideoPlaylist.getBlock();
                if (o && VideoPlaylist.isCollapsed() != !e) return data(o, "collapsed", !e), VideoPlaylist.toggleStateClasses(), Videoview.playerOnResize(),
                    Videoview.updateReplyFormPos(), e && (VideoPlaylist.updateScrollbar(), VideoPlaylist.setCurVideo()), !1
            }
        },
        toggleStateClasses: function() {
            var e = !!VideoPlaylist.getBlock(),
                i = Videoview.isMinimized(),
                o = VideoPlaylist.isCollapsed();
            toggleClass("mv_box", "_has_playlist", e && !i), toggleClass("mv_box", "_hide_playlist", e && !i && o);
            var t = "";
            e && (t = getLang(o ? "video_aria_expand_playlist" : "video_aria_minimize_playlist")), attr("mv_top_pl_toggle", "aria-label", t)
        },
        updateScrollbar: function() {
            var e = VideoPlaylist.getBlock();
            if (e) {
                var i = data(e, "sb");
                if (i) i.update(!0, !0);
                else {
                    var o = geByClass1("mv_playlist_list", e),
                        i = new Scrollbar(o, {
                            prefix: "mv_pl_",
                            nokeys: !0,
                            padding: 0
                        });
                    data(e, "sb", i)
                }
            }
        },
        updateControls: function() {
            var e = VideoPlaylist.getCurList(),
                i = VideoPlaylist.getVideoIndex();
            e && e.reversed && (i = e.list.length - i - 1), toggle("mv_pl_prev", !!e && i > 0), toggle("mv_pl_next", !!e && i < e.list.length - 1)
        },
        showVideo: function(e, i) {
            if (i && checkEvent(i)) return !0;
            var o = VideoPlaylist.getCurList();
            if (o) {
                if (VideoPlaylist.saveScrollPos(), mvcur.options.params && "direct" == mvcur.options.params.module && mvcur.mvPrevLoc && Videoview.backLocation(), o.loaded && o.loaded.vid == e) {
                    var t = o.loaded;
                    Videoview.show(null, e, t.listId, extend(t.options, {
                        playlistId: o.id
                    })), Videoview.showVideo.apply(Videoview, t.hubData);
                    var a = mvcur.preloadStatsHashes ? mvcur.preloadStatsHashes[e] : "";
                    a && ajax.post("al_video.php?act=a_inc_preload_stats", {
                        stat_preload_hash: a
                    }), o.loaded = !1
                } else {
                    var n = VideoPlaylist.getVideoIndex(e),
                        d = o.reversed ? o.list.length - 1 - n : n,
                        r = d < o.list.length - 1 ? 1 : 0;
                    showVideo(e, "", {
                        autoplay: 1,
                        playlistId: o.id,
                        addParams: {
                            force_no_repeat: 1,
                            show_next: r
                        },
                        module: Videoview.getVideoModule()
                    })
                }
                return !1
            }
        },
        saveScrollPos: function() {
            var e = VideoPlaylist.getBlock(),
                i = domByClass(e, "mv_playlist_list");
            data(e, "savedScrollTop", i.scrollTop)
        },
        restoreScrollPos: function() {
            var e = VideoPlaylist.getBlock(),
                i = domByClass(e, "mv_playlist_list"),
                o = data(e, "savedScrollTop");
            o && (i.scrollTop = o)
        },
        _queueNextVideo: function(e) {
            var i = VideoPlaylist.getCurList();
            if (i) {
                e = e || i.current;
                var o = VideoPlaylist._getNextVideoIndex(e);
                if (-1 != o) {
                    var t = i.list[o],
                        a = isArray(t) ? t[VideoConstants.VIDEO_ITEM_INDEX_OWNER_ID] + "_" + t[VideoConstants.VIDEO_ITEM_INDEX_ID] : t.vid,
                        n = isArray(t) ? "" : t.hash;
                    if (i.queued != a && (!i.loaded || i.loaded.vid != a)) {
                        i.loaded = !1, i.queued = a;
                        var d = (i.reversed ? i.list.length - o : o) < i.list.length - 1 ? 1 : 0;
                        showVideo(a, n, {
                            hidden: function(e, o, t, a) {
                                i.queued == a && (i.loaded = {
                                    vid: a,
                                    hubData: e,
                                    options: o,
                                    listId: t
                                }), i.queued = !1
                            },
                            module: Videoview.getVideoModule(a),
                            addParams: {
                                autoplay: 1,
                                force_no_repeat: 1,
                                preload: 1,
                                show_next: d,
                                playlist_id: i.id
                            }
                        })
                    }
                }
            }
        },
        getNextVideos: function() {
            var e = [];
            if (!(VideoPlaylist.isAutoplayEnabled() || window.mvcur && mvcur.player)) return e;
            var i = VideoPlaylist.getCurList(),
                o = VideoPlaylist._getNextVideoIndex();
            if (!i || 0 > o) return e;
            for (; e.length < 3 && o >= 0 && o < i.list.length;) {
                var t, a = i.list[o];
                t = isArray(a) ? {
                    vid: a[VideoConstants.VIDEO_ITEM_INDEX_OWNER_ID] + "_" + a[VideoConstants.VIDEO_ITEM_INDEX_ID],
                    thumb: a[VideoConstants.VIDEO_ITEM_INDEX_THUMB],
                    views: getLang("video_N_views_list", a[VideoConstants.VIDEO_ITEM_INDEX_VIEWS], !0),
                    title: a[VideoConstants.VIDEO_ITEM_INDEX_TITLE],
                    duration: a[VideoConstants.VIDEO_ITEM_INDEX_DURATION]
                } : a, e.push(t), o += i.reversed ? -1 : 1
            }
            return e
        },
        prevVideo: function() {
            var e = VideoPlaylist.getCurList();
            if (e) {
                var i = VideoPlaylist.getVideoIndex() + (e.reversed ? 1 : -1);
                if (!(0 > i)) {
                    var o = e.list[i],
                        t = isArray(o) ? o[0] + "_" + o[1] : o.vid;
                    VideoPlaylist.showVideo(t)
                }
            }
        },
        nextVideo: function() {
            var e = VideoPlaylist.getCurList();
            if (e) {
                var i = VideoPlaylist._getNextVideoIndex();
                if (!(0 > i)) {
                    var o = e.list[i],
                        t = isArray(o) ? o[0] + "_" + o[1] : o.vid;
                    VideoPlaylist.showVideo(t)
                }
            }
        },
        getVideoIndex: function(e) {
            var i = VideoPlaylist.getCurList();
            if (!i) return -1;
            if (e || (e = i.current), !e) return -1;
            var o = -1;
            return each(i.list, function(i, t) {
                var a = isArray(t) ? t[0] + "_" + t[1] : t.vid;
                return a == e ? (o = i, !1) : void 0
            }), o
        },
        _getNextVideoIndex: function(e) {
            var i = VideoPlaylist.getCurList();
            if (!i) return -1;
            var o = VideoPlaylist.getVideoIndex(e);
            if (0 > o) return 0;
            var t = o + (i.reversed ? -1 : 1);
            return t >= 0 && t < i.list.length ? t : -1
        }
    };
window.VideoChat = {
    SCROLL_EDGE_BELOW_THRESHOLD: 20,
    MAX_COMMENTS_NUM: 150,
    MAX_LIKES_PER_BATCH: 10,
    MAX_STICKERS_PER_BATCH: 10,
    init: function(e, i) {
        VideoChat.block && VideoChat.destroy(), e && (VideoChat.block = e, VideoChat.options = extend({}, i), VideoChat.messagesWrap = domByClass(e, "mv_chat_messages_wrap"), VideoChat.stickersWrap = domByClass(e, "mv_chat_stickers_wrap"), VideoChat.scroll = new uiScroll(domFC(VideoChat.messagesWrap), {
            global: !0,
            reversed: !0,
            preserveEdgeBelow: !0,
            preserveEdgeBelowThreshold: VideoChat.SCROLL_EDGE_BELOW_THRESHOLD,
            theme: "videoview",
            onupdate: VideoChat.onScrollUpdate
        }), this.scrollBottomBtnWrap = domByClass(e, "mv_chat_new_messages_btn_wrap"), VideoChat.replyForm = domByClass(e, "mv_chat_reply_form"), VideoChat.replyForm && (VideoChat.replyInput = domByClass(e, "mv_chat_reply_input"), VideoChat.initReplyInput()), VideoChat.firstMsgIntro = domByClass(e, "mv_chat_first_message_intro"))
    },
    initReplyInput: function() {
        placeholderInit(VideoChat.replyInput, {
            editable: 1
        }), stManager.add(["emoji.js", "notifier.css"], function() {
            var e = Emoji.init(VideoChat.replyInput, {
                forceStickerPack: VideoChat.options.forceStickerPack,
                controlsCont: VideoChat.replyForm,
                noLineBreaks: 1,
                noCtrlSend: 1,
                onSend: function() {
                    VideoChat.sendMessage()
                },
                checkEditable: function() {
                    VideoChat.checkFormHeight(), VideoChat.checkTextLen()
                },
                onStickerSend: function(e, i) {
                    VideoChat.sendSticker(e)
                }
            });
            data(VideoChat.replyForm, "optId", e)
        })
    },
    checkFormHeight: function() {
        var e = VideoChat.replyForm,
            i = e.offsetHeight;
        if (e.lastHeight !== i) {
            e.lastHeight = i;
            var o = !VideoChat.scroll.data.scrollBottom;
            setStyle(VideoChat.messagesWrap, {
                bottom: i + "px"
            }), o && VideoChat.scroll.scrollBottom()
        }
    },
    checkTextLen: function() {
        var e = VideoChat.replyInput,
            i = trim(Emoji.editableVal(e));
        if (e.lastLen !== i.length) {
            var o = e.lastLen = i.length,
                t = mvcur.maxChatReplyLength;
            o > t ? showTooltip(e, {
                text: getLang("video_live_chat_msg_too_long"),
                black: 1
            }) : window.tooltips && tooltips.destroy(e)
        }
    },
    mentionOver: function(e) {
        return mentionOver(e, {
            shift: [-20, 7, 7]
        })
    },
    stickerClick: function(e, i, o) {
        return stManager.add(["emoji.js", "notifier.css"], function() {
            Emoji.clickSticker(e, i, o)
        }), !1
    },
    onScrollUpdate: function(e) {
        e.data.scrollBottom < VideoChat.SCROLL_EDGE_BELOW_THRESHOLD && VideoChat.toggleScrollBottomBtn(!1)
    },
    receiveMessage: function(e, i, o, t, a, n, d, r, s) {
        if (intval(s)) VideoChat.appendSticker(s, o);
        else {
            var v = "";
            (mvcur.adminLevel > 0 || e == vk.id || o == vk.id) && (v += getTemplate("video_chat_message_action_del", {
                video_owner_id: e,
                msg_id: i
            }));
            var l = psr(getTemplate("video_chat_message", {
                author_href: n,
                author_photo: psr(a),
                author_name: t,
                message: r,
                video_owner_id: e,
                msg_id: i,
                actions: v,
                classes: o == e ? "mv_chat_admin_message" : ""
            }));
            VideoChat.appendMessage(l, i)
        }
    },
    receiveDelete: function(e, i) {
        var o, t = "#mv_chat_msg" + mvcur.mvData.oid + "_" + i;
        return (o = VideoChat._messagesBatch && VideoChat._messagesBatch.querySelector(t)) ? void re(o) : (o = VideoChat.messagesWrap.querySelector(t), void(o && !hasClass(o, "_deleting") && VideoChat.scroll.updateAbove(function() {
            re(o)
        })))
    },
    checkStickerFlood: function(e, i) {
        var o = mvcur.queueBatchId;
        VideoChat._stickersLimits && VideoChat._stickersLimits.batch == o || (VideoChat._stickersLimits = {
            batch: o,
            like: 0,
            sticker: 0
        }, VideoChat._stickersDelay = 0);
        var t = "like" == e ? "like" : "sticker",
            a = "like" == t ? VideoChat.MAX_LIKES_PER_BATCH : VideoChat.MAX_STICKERS_PER_BATCH;
        return ++VideoChat._stickersLimits[t] > a && i != vk.id ? !1 : !0
    },
    appendSticker: function(e, i) {
        function o(e) {
            for (var i = "", o = "", t = 0, a = 0, n = 0, d = intval((VideoChat.getHeight() - 80) / 6), r = 0; 100 >= r; r += 20) r > 0 && (t += irand(-4, 4), a -= d, n += irand(-4, 4), d = intval(.9 * d)), o = "transform: translate(" + t + "px, " + a + "px) rotate(" + n + "deg) " + (r ? "" : "scale(0.7)") + ";", o += "opacity:" + (0 == r || 100 == r ? 0 : 1) + ";", i += r + "% {" + o + "}";
            var s = "mv_chat_sticker_animation_" + Date.now() + "_" + irand(0, 1e9);
            i = "@keyframes " + s + " {" + i + "}", e.appendChild(ce("style", {
                innerHTML: i
            }));
            var v = irand(1500, 2500) + "ms",
                l = (VideoChat._stickersDelay += 100) + "ms";
            setStyle(e, {
                animation: [s, v, l, "linear"].join(" ")
            })
        }

        function t(e) {
            var i = e.currentTarget || e,
                o = VideoChat._stickersBatch || (VideoChat._stickersBatch = document.createDocumentFragment());
            o.appendChild(i), VideoChat._appendStickerTimeout || (VideoChat._appendStickerTimeout = setTimeout(function() {
                VideoChat.appendStickersBatch(), VideoChat._appendStickerTimeout = null
            }, 0))
        }

        function a(e) {
            var i = e.currentTarget || e;
            removeEvent(i), re(i)
        }
        if (!VideoChat.isHidden() && !Videoview.isFS && "hidden" != document.visibilityState && "animation" in bodyNode.style && "onanimationend" in window && VideoChat.checkStickerFlood(e, i))
            if ("like" == e) {
                var n = ce("div", {
                    className: "mv_chat_like"
                });
                o(n), addEvent(n, "animationend", a), t(n)
            } else {
                var n = ce("img", {
                    className: "mv_chat_sticker",
                    src: "/images/stickers/" + e + "/" + (isRetina() ? 128 : 64) + "b.png"
                });
                o(n), addEvent(n, "error animationend", a), addEvent(n, "load", t)
            }
    },
    appendStickersBatch: function() {
        var e = VideoChat._stickersBatch;
        e && (VideoChat._stickersBatch = null, VideoChat.isHidden() || VideoChat.stickersWrap.appendChild(e))
    },
    removeStickers: function() {
        if (VideoChat.stickersWrap)
            for (var e; e = domFC(VideoChat.stickersWrap);) removeEvent(e), re(e)
    },
    appendMessage: function(e, i) {
        var o = VideoChat._messagesBatch || (VideoChat._messagesBatch = document.createDocumentFragment()),
            t = "#mv_chat_msg" + mvcur.mvData.oid + "_" + i;
        if (!VideoChat.messagesWrap.querySelector(t) && !o.querySelector(t)) {
            o.appendChild(se(e));
            for (var a = o.childNodes; o.childNodes.length > VideoChat.MAX_COMMENTS_NUM;) re(a[0]);
            VideoChat.isHidden() || VideoChat._appendMessageTimeout || (VideoChat._appendMessageTimeout = setTimeout(function() {
                VideoChat.appendMessagesBatch(), VideoChat._appendMessageTimeout = null
            }, 0))
        }
    },
    appendMessagesBatch: function() {
        var e = VideoChat._messagesBatch;
        if (e && (VideoChat._messagesBatch = null, !VideoChat.isHidden())) {
            var i = geByClass("mv_chat_message_author_thumb_img", e, "img");
            each(i, function(e, i) {
                attr(i, "src") || attr(i, "src", domData(i, "src"))
            }), VideoChat.firstMsgIntro && (re(VideoChat.firstMsgIntro), VideoChat.firstMsgIntro = null);
            var o = VideoChat.scroll.content;
            VideoChat.scroll.updateBelow(function() {
                o.appendChild(e)
            }), VideoChat.scroll.updateAbove(function() {
                for (var e = o.childNodes; e.length > VideoChat.MAX_COMMENTS_NUM;) re(e[0])
            }), !VideoChat.isHidden() && VideoChat.scroll.data.scrollBottom > 100 && VideoChat.toggleScrollBottomBtn(!0)
        }
    },
    toggleScrollBottomBtn: function(e) {
        toggleClass(this.scrollBottomBtnWrap, "hidden", !e)
    },
    scrollBottom: function() {
        VideoChat.scroll.scrollBottom(0)
    },
    sendMessage: function() {
        if (!VideoChat.messageSending) {
            var e = {
                message: trim(Emoji.val(VideoChat.replyInput))
            };
            if (!e.message) return void elfocus(VideoChat.replyInput);
            if (vkNow() - VideoChat.lastMsgSent < 1e3) return window.tooltips && tooltips.destroy(VideoChat.replyInput), void showTooltip(VideoChat.replyInput, {
                text: getLang("video_live_chat_too_fast"),
                black: 1
            });
            var i = Videoview.getMvData();
            ajax.post("al_video.php?act=post_comment", Wall.fixPostParams(extend(e, {
                video: i.videoRaw,
                hash: i.hash,
                fromview: 1,
                videoviewer_chat: 1
            })), {
                onDone: function(e, i) {
                    VideoChat.messageSending = !1, e && i && VideoChat.appendMessage(e, i), Emoji.val(VideoChat.replyInput, ""), VideoChat.checkFormHeight(), VideoChat.scroll.data.scrollBottom && VideoChat.scrollBottom(), VideoChat.lastMsgSent = vkNow()
                },
                onFail: function(e) {
                    return VideoChat.messageSending = !1, VideoChat.replyInput ? (window.tooltips && tooltips.destroy(VideoChat.replyInput), showTooltip(VideoChat.replyInput, {
                        text: e,
                        showdt: 200,
                        forcetodown: 0,
                        slide: 15,
                        black: 1
                    }), elfocus(VideoChat.replyInput), !0) : void 0
                }
            }), VideoChat.messageSending = !0
        }
    },
    sendSticker: function(e) {
        var i = Videoview.getMvData();
        ajax.post("al_video.php?act=live_send_sticker", {
            sticker_id: e,
            owner_id: i.oid,
            video_id: i.vid,
            hash: i.hash
        })
    },
    deleteMessage: function(e, i) {
        var o = ge("mv_chat_msg" + e);
        addClass(o, "_deleting"), ajax.post("al_video.php", {
            act: "delete_comment",
            comment: e,
            hash: i,
            videoview_chat: 1
        }, {
            onDone: function(e) {
                val(domByClass(o, "mv_chat_message_content"), e)
            }
        })
    },
    isHidden: function() {
        return !!this.hidden || Videoview.isMinimized()
    },
    setHidden: function(e) {
        this.hidden = e
    },
    toggle: function() {
        var e = VideoChat.isHidden();
        this.setHidden(!e), VideoChat.toggleStateClasses(), e && VideoChat.scroll && (VideoChat.appendMessagesBatch(), VideoChat.updateScroll()), e || VideoChat.removeStickers()
    },
    toggleStateClasses: function() {
        var e = !!this.block,
            i = VideoChat.isHidden(),
            o = Videoview.isMinimized();
        toggleClass("mv_box", "_has_chat", e && !o), toggleClass("mv_box", "_hide_chat", e && !o && i);
        var t = "";
        e && (t = getLang(i ? "video_aria_expand_chat" : "video_aria_minimize_chat")), attr("mv_top_pl_toggle", "aria-label", t)
    },
    updateScroll: function() {
        VideoChat.scroll.update(), VideoChat.scroll.scrollBottom(), VideoChat.toggleScrollBottomBtn(!1)
    },
    onResize: function() {
        VideoChat.block && (VideoChat._chatHeight = VideoChat.block.offsetHeight)
    },
    getHeight: function() {
        return VideoChat.block ? VideoChat._chatHeight || (VideoChat._chatHeight = VideoChat.block.offsetHeight) : 0
    },
    destroy: function() {
        if (VideoChat.block) {
            if (VideoChat.scroll && (VideoChat.scroll.destroy(), VideoChat.scroll = null), VideoChat.replyForm) {
                var e = data(VideoChat.replyForm, "optId");
                e && Emoji.destroy(e), removeData(VideoChat.replyForm), removeData(VideoChat.replyInput), VideoChat.replyForm = VideoChat.replyInput = null
            }
            VideoChat.removeStickers(), removeData(VideoChat.block), re(VideoChat.block), VideoChat.block = null, VideoChat.messagesWrap = null, VideoChat.stickersWrap = null, VideoChat.options = null, clearTimeout(VideoChat._appendMessageTimeout), clearTimeout(VideoChat._appendStickerTimeout), VideoChat._appendMessageTimeout = null, VideoChat._appendStickerTimeout = null, VideoChat._messagesBatch = null, VideoChat.firstMsgIntro = null, VideoChat.messageSending = !1, VideoChat.toggleStateClasses()
        }
    }
}, window.VideoDonate = {
    DEFAULT_COMMENT_MAX_LENGTH: 300,
    init: function(e, i, o, t, a, n) {
        function d(e) {
            e = parseJSON(e), e && "success" == e.status ? (VideoDonate.apiData = e.data, VideoDonate.initForm()) : r()
        }

        function r() {
            curBox().hide(), showFastBox({
                title: getLang("global_error")
            }, getLang("global_error_occured"))
        }
        VideoDonate.params = {
            prefilled: i,
            videoId: o,
            votesHash: t,
            referrer: a,
            payerId: n
        }, ajax.plainpost(e, "", d, r, !0)
    },
    initForm: function() {
        var e = VideoDonate.apiData,
            i = floatval(e.user_data.donation_mins.RUB),
            o = Math.ceil(i / vk.vcost);
        if (VideoDonate.params.votesHash && o <= vk.balance) {
            var t = [
                ["votes", getLang("video_donate_box_currency_votes")],
                ["rubles", getLang("video_donate_box_currency_rubles")]
            ];
            VideoDonate.currencyDropdown = new Dropdown(ge("video_donate_amount_currency"), t, {
                multiselect: !1,
                onChange: VideoDonate.onChooseCurrency,
                selectedItems: "votes",
                width: 150,
                big: !0
            }), addClass("video_donate_amount_wrap", "video_donate_can_choose_currency"), VideoDonate.onChooseCurrency("votes")
        } else VideoDonate.onChooseCurrency("rubles");
        var a = ge("video_donate_comment");
        a.onkeydown = a.onkeyup = a.onchange = VideoDonate.checkCommentLength, toggle("video_donate_widget_offline", !e.user_data.alert_widget_is_online), ge("video_donate_basic_submit").onclick = VideoDonate.submitBasicForm;
        var n = geByClass("radiobtn", "video_donate_pay_methods");
        radioBtns.video_donate_pay_method = {
            els: Array.prototype.slice.apply(n)
        };
        var d = ls.get("video_donate_pay_method") || "";
        each(n, function(e, i) {
            i.onclick = function(e) {
                VideoDonate.onChoosePayMethod(e.currentTarget)
            }, domData(i, "value") === d && VideoDonate.onChoosePayMethod(i)
        }), radioval("video_donate_pay_method") || VideoDonate.onChoosePayMethod(n[0]);
        var r = VideoDonate.params.prefilled;
        r.email && val("video_donate_email", r.email.value), ge("video_donate_billing_submit").onclick = VideoDonate.submitBillingForm, hide("video_donate_pr"), show("video_donate_step_basic")
    },
    onChooseCurrency: function(e) {
        var i, o = VideoDonate.apiData,
            t = floatval(o.user_data.donation_mins.RUB),
            a = Math.ceil(t / vk.vcost),
            n = floatval(val("video_donate_amount"));
        if (n) {
            if ("votes" == e) var d = Math.max(a, Math.round(n / vk.vcost));
            else var d = Math.max(t, intval(n * vk.vcost));
            val("video_donate_amount", d)
        } else {
            var d = "votes" == e ? a : t;
            val("video_donate_amount", d)
        }
        "votes" == e ? (i = getLang("video_donate_box_min_amount_votes_hint", a), i += " " + getLang("video_donate_box_total_votes_hint", vk.balance)) : i = getLang("video_donate_box_min_amount_hint", t, !0), val("video_donate_amount_hint", i);
        var r = !!intval(o.user_data.tts_is_enabled),
            s = floatval((o.user_data.tts_mins || {}).RUB);
        r && (s ? "votes" == e ? val("video_donate_comment_tts_hint", getLang("video_donate_box_text_speech_min_votes_hint", Math.ceil(s / vk.vcost))) : val("video_donate_comment_tts_hint", getLang("video_donate_box_text_speech_min_hint", s)) : val("video_donate_comment_tts_hint", getLang("video_donate_box_text_speech_hint")));
        var v = getLang("votes" == e ? "video_donate_box_pay_button" : "video_donate_box_donate_button");
        val("video_donate_basic_submit", v)
    },
    checkCommentLength: function(e) {
        var i = VideoDonate.apiData,
            o = e.currentTarget,
            t = val(o),
            a = t.length,
            n = i.user_data.max_comment_length || VideoDonate.COMMENT_MAX_LENGTH,
            d = "";
        if (a > n) d = getLang("video_donate_box_comment_too_long");
        else if (a > n - 100) {
            var r = n - a;
            d = getLang("text_N_symbols_remain", r)
        }
        val("video_donate_comment_length_hint", d)
    },
    showInputError: function(e, i) {
        e = ge(e), notaBene(e), i && (showTooltip(e, {
            text: i,
            shift: [0, 7, 7],
            dir: "auto",
            nohide: !0,
            hasover: !0,
            showsp: 300,
            onHide: function() {
                e.onkeydown = e.onblur = null, setTimeout(tooltips.destroy.bind(tooltips, e), 300)
            }
        }), e.onkeydown = e.onblur = function() {
            e.tt && tooltips.hide(e)
        })
    },
    submitBasicForm: function(e) {
        var i = e.currentTarget,
            o = VideoDonate.apiData,
            t = val("video_donate_name"),
            a = floatval(val("video_donate_amount")),
            n = 0,
            d = VideoDonate.currencyDropdown ? VideoDonate.currencyDropdown.val() : "rubles",
            r = val("video_donate_comment");
        if ("votes" == d && (n = a, a *= vk.vcost), !a || a < o.user_data.donation_mins.RUB) return VideoDonate.showInputError("video_donate_amount"), !1;
        if (r.length > VideoDonate.COMMENT_MAX_LENGTH) return VideoDonate.showInputError("video_donate_comment"), !1;
        var s = {
            step: "basic",
            referrer: VideoDonate.params.referrer,
            currency: "RUB",
            name: t,
            amount: a,
            comment: r
        };
        lockButton(i), ajax.plainpost(o.form_api_ssl_url, {
            data: ajx2q(s)
        }, function(e) {
            unlockButton(i), e = parseJSON(e), e && "success" == e.status ? "votes" == d ? VideoDonate.donateVotes(t, n, r) : VideoDonate.toNextForm() : e && e.errors && each(e.errors, function(e, i) {
                var o = VideoDonate.getErrorText(i.code);
                return VideoDonate.showInputError("video_donate_" + i.field, o), !1
            })
        }, function() {
            unlockButton(i)
        })
    },
    donateVotes: function(e, i, o) {
        ajax.post("al_video.php?act=donate_votes", {
            video: VideoDonate.params.videoId,
            hash: VideoDonate.params.votesHash,
            name: e,
            amount: i,
            comment: o
        }, {
            onDone: function(e, i, o) {
                if (e) {
                    curBox().hide();
                    var t = getTemplate("video_donate_success_msg", {
                        text: i
                    });
                    showFastBox(getLang("video_donate_box_title"), t)
                } else VideoDonate.showInputError("video_donate_amount", i);
                vk.balance != o && updateMoney(o)
            },
            showProgress: lockButton.pbind("video_donate_basic_submit"),
            hideProgress: unlockButton.pbind("video_donate_basic_submit")
        }), statlogsValueEvent("video_donate", "", "checkout", "votes")
    },
    toNextForm: function() {
        hide("video_donate_step_basic"), show("video_donate_step_billing"), curBox().setBackTitle(VideoDonate.toPrevForm)
    },
    toPrevForm: function() {
        hide("video_donate_step_billing"), show("video_donate_step_basic"), curBox().setBackTitle()
    },
    onChoosePayMethod: function(e) {
        var i = VideoDonate.apiData,
            o = VideoDonate.params.prefilled,
            t = domData(e, "value");
        radiobtn(e, t, "video_donate_pay_method");
        var a = i.payin_currencies[t].additional_fields,
            n = "";
        a && each(a, function(e, i) {
            var a = "",
                d = "",
                r = "";
            "MOBILE_FAKE" == t && "phone" == e ? (a = getLang("video_donate_box_sms_payment_phone_placeholder"), d = getLang("video_donate_box_sms_payment_phone_hint"), r = o.phone ? o.phone.value : "") : "QIWI_MYCOM" == t && "phone_number" == e && (a = getLang("video_donate_box_qiwi_payment_phone_placeholder"), d = getLang("video_donate_box_qiwi_payment_phone_hint")), (a || d) && (n += getTemplate("video_donate_additional_field", {
                name: e,
                placeholder: a,
                hint: d,
                required: intval(i.required),
                prefilled: r,
                input_id: ""
            }))
        }), val("video_donate_billing_additional_fields", n)
    },
    submitBillingForm: function(e) {
        function i(e) {
            if (unlockButton(a), e = parseJSON(e), e && "success" == e.status) {
                curBox().hide();
                var i = getTemplate("video_donate_success_msg", {
                    text: getLang("video_donate_box_sms_payment_success")
                });
                showFastBox(getLang("video_donate_box_title"), i)
            } else e && e.errors && each(geByClass("video_donate_input", "video_donate_billing_additional_fields"), function(i, o) {
                var t = domData(o, "name");
                if (e.errors[t]) {
                    var a = VideoDonate.getErrorText(e.errors[t].code);
                    return VideoDonate.showInputError(o, a), !1
                }
            })
        }

        function o() {
            unlockButton(a)
        }
        var t = VideoDonate.apiData,
            a = e.currentTarget,
            n = radioval("video_donate_pay_method"),
            d = VideoDonate.params.prefilled,
            r = val("video_donate_email");
        if (!/^.+@.+\..+$/.test(r)) return VideoDonate.showInputError("video_donate_email"), !1;
        var s = {
            step: "billing",
            referrer: VideoDonate.params.referrer,
            name: val("video_donate_name"),
            amount: floatval(val("video_donate_amount")),
            currency: "RUB",
            comment: val("video_donate_comment"),
            billing_system_type: n,
            redirect: 1,
            vk_test_group: VideoDonate.params.votesHash ? 1 : 2,
            _vk_id_encrypted: VideoDonate.params.payerId
        };
        d.email && r == d.email.value ? s.email_encrypted = d.email.encrypted : s.email = r;
        var v = !0;
        if (each(geByClass("video_donate_input", "video_donate_billing_additional_fields"), function(e, i) {
                var o = domData(i, "name"),
                    a = val(i),
                    r = intval(domData(i, "required"));
                if ("MOBILE_FAKE" == n && "phone" == o && d.phone && replaceEntities(d.phone.value) == a) o += "_encrypted", a = d.phone.encrypted;
                else if (a || r) {
                    a = a.replace(/\s+/g, "");
                    var l = t.payin_currencies[n].additional_fields[o],
                        c = l.regex_validation;
                    if (c && !new RegExp(c).test(a)) return VideoDonate.showInputError(i), v = !1, !1
                }
                s[o] = a
            }), v) {
            if ("MOBILE_FAKE" == n) ajax.plainpost(t.form_api_ssl_url, {
                data: ajx2q(s)
            }, i, o), lockButton(a);
            else {
                var l = ce("iframe"),
                    c = ce("form", {
                        action: t.form_api_ssl_url,
                        method: "post",
                        target: "_blank",
                        innerHTML: '<input type="hidden" name="data" value="' + ajx2q(s) + '"/>'
                    });
                utilsNode.appendChild(l), l.contentDocument.body.appendChild(c), c.submit(), setTimeout(function() {
                    re(l)
                }, 0), curBox().hide()
            }
            statlogsValueEvent("video_donate", "", "checkout", n), ls.set("video_donate_pay_method", n)
        }
    },
    getErrorText: function(e) {
        switch (e) {
            case "special_characters_violation":
                return getLang("video_donate_special_chars_error");
            case "max_username_length_violation":
                return getLang("video_donate_username_length_error");
            case "mc_provider_violation":
                return getLang("video_donate_phone_provider_error");
            case "mc_provider_not_found":
                return getLang("video_donate_phone_provider_not_found_error")
        }
    },
    onDestroy: function() {
        delete VideoDonate.params, delete VideoDonate.apiData, VideoDonate.currencyDropdown && (VideoDonate.currencyDropdown.destroy(), VideoDonate.currencyDropdown = null)
    }
}, window.VideoInitializer = {
    initPlayer: function(e, i, o) {
        hide(domByClass(e, "video_box_msg")), VideoInitializer[i].apply(VideoInitializer, [e].concat(o)), stManager.add("notifier.js", function() {
            var e = Videoview.togglePlay.pbind(!1);
            Notifier.addRecvClbk("audio_start", "video", e), Notifier.addRecvClbk("video_start", "video", e), Notifier.addRecvClbk("videocall_start", "video", e)
        })
    },
    vk: function(e, i) {
        var o = i.oid + "_" + i.vid;
        if (i.vsegs) ls.remove("vsegs" + vk.id + "_" + o);
        else {
            var t = ls.get("vsegs" + vk.id + "_" + o);
            t && t.ts && t.segments && vkNow() - t.ts < 864e5 && (i.vsegs = t.segments.replace(/[^0-9\,\|]/gi, ""))
        }
        onLoaded(function() {
            checkMp4(function(o, t) {
                o && !i.is_flv || browser.flash >= Videoview.FLASH_MIN_VERSION || i.live ? (i.can_play_mp4 = o ? 1 : 0, VideoInitializer.vkHtml5(e, i)) : show(domByClass(e, "video_box_msg")), !o && t && window._ua && _ua.indexOf("smart-tv") > -1 && ajax.post("al_video.php?act=log_cant_play_mp4_reason", {
                    ua: window._ua,
                    reason: t
                }, {
                    onFail: function() {
                        return !0
                    }
                })
            })
        })
    },
    vkHtml5: function(e, i) {
        function o() {
            if (bodyNode.contains(e)) {
                if (t && mvcur.player) {
                    var o = mvcur.player;
                    o.initVideo(i)
                } else {
                    var o = new VideoPlayer(i);
                    t ? mvcur.player = o : i.is_embed ? cur.player = o : cur.videoInlinePlayer = o
                }
                if (!a) {
                    var n = ce("div", {
                        id: "video_player"
                    });
                    attr(n, "preventhide", 1), n.appendChild(o.el), e.appendChild(n)
                }
            }
        }
        var t = window.mvLayer && mvLayer.contains(e),
            a = t && mvcur.player && e.contains(mvcur.player.el);
        a || val(e, "");
        var n = new callHub(o);
        i.hls_candy_server && !window.Candy && (n.count++, loadScript("https://cdn.candy.systems/js/vk/candy2.min.js", {
            timeout: 5e3,
            onLoad: function() {
                n.done()
            },
            onError: function() {
                delete i.hls_candy, n.done()
            }
        }));
        var d = ["videoplayer.js", "videoplayer.css"];
        i.hls && d.push("hls.min.js"), stManager.add(d, function() {
            n.done()
        })
    },
    youtube: function(e, i) {
        var o = i.oid,
            t = i.vid,
            a = i.report_error_hash;
        window.onYouTubeIframeAPIReady = function() {
            var n = domByClass(e, "video_yt_player"),
                d = new YT.Player(n, {
                    events: {
                        onError: function(e) {
                            var i = [100, 101, 150];
                            e.data && -1 != i.indexOf(e.data) && ajax.post("al_video.php?act=reparseDeletedYoutube", {
                                vid: t,
                                oid: o
                            }), debugLog("YT player error", arguments), ajax.post("al_video.php?act=external_error", {
                                oid: o,
                                vid: t,
                                hash: a
                            })
                        },
                        onStateChange: function(e) {
                            switch (e.data) {
                                case YT.PlayerState.ENDED:
                                    stManager.add(["videoview.js", "videoview.css"], function() {
                                        var e = ge("video_yt");
                                        Videoview.onExternalVideoEnded(e)
                                    });
                                    break;
                                default:
                                    ge("mv_external_finish") && Videoview.removeExternalVideoFinishBlock()
                            }
                        }
                    }
                });
            stManager.add(["video_youtube.js", "video_youtube.css"], function() {
                VideoYoutube.initStatOnly(d, i)
            })
        }, window.YT ? onYouTubeIframeAPIReady() : ! function(e) {
            var i, o = geByTag1("script");
            i = ce("script", {
                async: !0,
                src: "https://www.youtube.com/iframe_api"
            }), o.parentNode.insertBefore(i, o)
        }(document)
    },
    iframeOrFlash: function(e, i, o, t, a, n) {
        t && (browser.flash < Videoview.FLASH_MIN_VERSION || !i) ? val(e, '<iframe class="extra_player" type="text/html" width="100%" height="100%" src="' + t + '" frameborder="0" ' + a + "></iframe>") : (o = extend({
            stats: "",
            from: "vk"
        }, o), VideoInitializer.flash(e, i, o)), n && setTimeout(function() {
            cur && cur.incViews && cur.incViews()
        }, 100)
    },
    flash: function(e, i, o, t) {
        if (browser.flash < Videoview.FLASH_MIN_VERSION) return void show(domByClass(e, "video_box_msg"));
        var a = {
            url: i,
            id: "video_player",
            width: "100%",
            height: "100%",
            preventhide: 1,
            version: 11
        };
        t = extend({
            allowfullscreen: !0,
            allowscriptaccess: "never",
            bgcolor: "#000000",
            wmode: "opaque"
        }, t), renderFlash(e, a, t, o)
    }
}, window.VideoLiveBlacklistBox = {
    init: function(e, i) {
        function o(e) {
            var i = domClosest("olist_item_wrap", e.target);
            if (i) {
                cancelEvent(e);
                var o = domData(i, "id");
                toggleClass(i, "olist_item_wrap_on") ? c[o] = 1 : delete c[o]
            }
        }

        function t(e) {
            var o = e;
            if (e = trim(e).replace(/\s+/g, " ").toLowerCase(), e !== d) {
                d = e;
                var t = e ? n.search(e) : i.list,
                    a = "";
                if (t.length)
                    for (var r, s = new RegExp(e, "i"), v = 0; v < t.length; v++) r = t[v], a += getTemplate("video_live_blacklist_item", {
                        id: r.id,
                        href: r.href,
                        photo: r.photo,
                        name: e ? r.name.replace(s, "<em>$&</em>") : r.name,
                        "class": c[r.id] ? " olist_item_wrap_on" : ""
                    });
                else a = getTemplate("video_live_blacklist_empty", {
                    text: langStr(getLang("global_search_not_found"), "search", "<b>" + clean(o) + "</b>")
                });
                val(l, a)
            }
        }

        function a(o) {
            ajax.post("al_video.php?act=save_live_blacklist", {
                exclude: Object.keys(c).join(","),
                hash: i.save_hash
            }, {
                onDone: function(i) {
                    e.hide(), i && showDoneBox(i)
                },
                showProgress: lockButton.pbind(o),
                hideProgress: unlockButton.pbind(o)
            })
        }
        e.setOptions({
            bodyStyle: "padding: 0;",
            onDestroy: function() {
                uiSearch.destroy(s), r && r.destroy(), e = n = r = v = s = null
            }
        });
        var n, d, r, s = ge("video_live_blacklist_search"),
            v = ge("video_live_blacklist_wrap"),
            l = domByClass(v, "olist"),
            c = {};
        i.list.length && (e.removeButtons().addButton(getLang("global_save"), a).addButton(getLang("global_cancel"), null, "no"), r = new uiScroll(v), t(""), v.onclick = o, s && (n = new vkIndexer(i.list, function(e) {
            return e.name + " https://vk.com" + e.href
        }), uiSearch.init(s, {
            onChange: t
        }), uiSearch.focus(s)))
    }
};
try {
    stManager.done("videoview.js")
} catch (e) {}