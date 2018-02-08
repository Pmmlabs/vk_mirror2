var Videocat = window.Videocat || {
    VIDEO_MODULE: "videocat",
    subscribeToChannel: function(e, o, t) {
        if (!buttonLocked(e)) {
            var i = hasClass(e, "secondary"),
                s = {
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e),
                    onDone: function() {
                        toggleClass(e, "secondary")
                    }
                };
            ajax.post("al_groups.php", {
                act: i ? "a_leave" : "a_enter",
                gid: o,
                hash: t,
                from: "videocat"
            }, s)
        }
    },
    moreUGC: function(e, o) {
        var t = domByClass("videocat_page_block_" + o, "videocat_items_block"),
            i = geByClass("video_item", t);
        if (cur.moreVideosInfo[o]) ajax.post("al_video.php?act=a_more_videos", {
            type: o,
            videos: cur.moreVideosInfo[o].join(","),
            layout: "grid"
        }, {
            onDone: function(e, o) {
                t.insertAdjacentHTML("beforeend", e), each(o, function(e, o) {
                    cur.catVideosList[e].list = cur.catVideosList[e].list.concat(o.list)
                })
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        }), delete cur.moreVideosInfo[o];
        else {
            var s = 0,
                a = 0;
            each(i, function() {
                return hasClass(this, "video_skip_thumb_load") && (removeClass(this, "video_skip_thumb_load"), s++), a++, 9 == s ? !1 : void 0
            }), a >= i.length && re(e), "ugc_popular" == o && Videocat.sendPopularShownStats(!0)
        }
    },
    moreSeries: function(e) {
        var o = geByClass("videocat_featured_playlist", gpeByClass("video_block_layout", e)),
            t = 0,
            i = 0;
        each(o, function() {
            return isVisible(this) || (removeClass(this, "videocat_featured_playlist_hidden"), t++), i++, 16 == t ? !1 : void 0
        }), i >= o.length && re(e)
    },
    moreChannels: function(e, o) {
        var t = !1;
        if (each(cur.moreChannelsInfo, function(e, i) {
                return i.cat_id == o ? (t = i, !1) : void 0
            }), cur.moreChannelsOffsets = cur.moreChannelsOffsets || {}, t) {
            var i = 0,
                s = gpeByClass("video_block_layout", e);
            i = cur.moreChannelsOffsets[o] ? cur.moreChannelsOffsets[o] : geByClass("videocat_row", s).length, ajax.post("al_video.php", {
                act: "a_more_channels",
                cat_id: o,
                offset: i,
                channels: t.channels.join(",")
            }, {
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e),
                onDone: function(i, a) {
                    cur.moreChannelsOffsets[o] = a, each(i, function(o, t) {
                        s.insertBefore(se(trim(t)), domPN(e))
                    }), a >= t.channels.length - 1 && re(domPN(e)), Video._updateThumbsInView()
                }
            })
        } else re(domPN(e))
    },
    updateTitle: function(e) {
        e.getAttribute("title") && e.scrollWidth <= e.clientWidth && e.removeAttribute("title")
    },
    _onScroll: function() {
        if (Video.isInCatalog()) {
            var e = [];
            each(geByClass("videocat_page_block"), function() {
                0 === this.getAttribute("data-type").indexOf("cat_") && e.push(this)
            });
            var o = getXY(e[e.length - 1]);
            if (!cur.videocatLoadingMoreCats && clientHeight() + scrollGetY() > o[1]) {
                var t = cur.moreCatsOffsets = cur.moreCatsOffsets || e.length;
                if (t >= cur.moreChannelsInfo.length) return;
                cur.videocatLoadingMoreCats = !0;
                var i = [];
                each(cur.moreChannelsInfo, function(e, o) {
                    i.push(o.cat_id + ":" + o.channels.join(","))
                }), ajax.post("al_video.php?act=a_more_cats", {
                    offset: t,
                    cats: i.join("/")
                }, {
                    onDone: function(e, o) {
                        var t = ge("videocat_other_blocks");
                        t.insertAdjacentHTML(e.join()), cur.catVideosList = extend(cur.catVideosList, o)
                    }
                })
            }
        }
    },
    init: function(e, o, t, i, s, a) {
        function n() {
            removeEvent(window, "scroll", cur._videocat_onScroll)
        }
        cur._videocatInited || (cur._videocatInited = !0, Videocat.lists = extend(Videocat.lists || {}, i), Videocat.moreBlocks = e, Videocat.feedData = o, Videocat.preloadLists = t, Videocat.top3playlists = s, Videocat.moreChannelsInfo = a, cur.videoCatRecomsLoaded = !1, cur._sessionChannelsSubscriptions = [], cur._videocat_onScroll && removeEvent(window, "scroll", cur._videocat_onScroll), addEvent(window, "scroll", cur._videocat_onScroll = Videocat._onScroll), cur.destroy.push(n), cur._back.hide.push(n), ge("videocat_page_block_ugc_popular") && Videocat.sendPopularShownStats(), Video._updateThumbsInView())
    },
    sendPopularShownStats: function(e) {
        if (statlogsValueEvent("videocat_popular", "", e ? "more" : "show"), cur.popularQid) {
            var o = "";
            each(Videocat.getPopularShownVids(), function(e, t) {
                o += "&vid=" + t
            }), vkImage().src = "//go.imgsmail.ru/vk?pxn=vs&qid=" + cur.popularQid + o
        }
    },
    getPopularShownVids: function() {
        cur.popularShown = cur.popularShown || [];
        for (var e = cur.popularShown.length, o = ge("videocat_page_block_ugc_popular"), t = geByClass("video_item", o), i = [], s = e;; ++s) {
            var a = t[s];
            if (!a || hasClass(a, "video_skip_thumb_load")) break;
            i.push(domData(a, "id"))
        }
        return cur.popularShown = cur.popularShown.concat(i), i
    },
    show: function(e, o, t, i, s, a) {
        return checkEvent(o) ? !0 : (showVideo(t, i, {
            playlistId: s,
            autoplay: 1,
            module: ["feed_block", "feed_recoms_block"].indexOf(s) >= 0 ? s : Videoview.getVideoModule(t),
            addParams: {
                force_no_repeat: 1,
                show_next: s ? 1 : 0,
                playlist_id: s
            }
        }), !1)
    },
    extendSlider: function(e, o) {
        e && (o = trim(o), o && (o = se(o), o && (Videocat._sliderExtends = Videocat._sliderExtends || [], Videocat._sliderExtends.push(function() {
            var t = geByClass1("videocat_row_slider_items_cont", e);
            each(geByClass("video_item", o), function(e, o) {
                t.appendChild(o)
            });
            var i = geByClass1("videocat_row_slider_btn_right", e);
            Videocat.slideRow(i, -3, !0), Videocat.slideRow(i, 3, !0)
        }))))
    },
    sliderSubscribeTo: function(e, o, t, i) {
        var s = gpeByClass("videocat_row", e),
            a = geByClass1("videocat_block_subscribe", s),
            n = geByClass1("videocat_block_unsubscribe", s);
        ajax.post("/al_video.php", {
            act: "a_subscribe",
            hash: t,
            gid: o,
            unsubscribe: +(i || 0),
            from: "recomm_page"
        }, {
            showProgress: function() {
                lockButton(e)
            },
            hideProgress: function() {
                unlockButton(e)
            },
            onDone: function() {
                i ? (hide(n), show(a), cur._sessionChannelsSubscriptions[-o] = !1) : (hide(a), show(n), cur._sessionChannelsSubscriptions[-o] = !0)
            },
            onError: unlockButton(e)
        })
    },
    subscribeTo: function(e, o, t, i) {
        function s() {
            i ? hide("video_channel_subs_progress") : unlockButton(e)
        }
        ajax.post("/al_video.php", {
            act: "a_subscribe",
            hash: t,
            gid: o,
            unsubscribe: +(i || 0)
        }, {
            showProgress: function() {
                i ? (hide("video_channel_subscribe_msg"), show("video_channel_subs_progress")) : lockButton(e)
            },
            hideProgress: s,
            onDone: function() {
                Videocat.onChannelSubscribed(o, t, i)
            },
            onError: s
        })
    },
    onChannelSubscribed: function(e, o, t) {
        var i = ge("video_channel_subscribe_msg"),
            s = ge("video_channel_subscribe");
        if (t) show(s), hide(i), cur._sessionChannelsSubscriptions[-e] = !1;
        else {
            cur._sessionChannelsSubscriptions[-e] = !0;
            var a = getLang("video_you_are_subscribed");
            a = rs(a, {
                channelId: e,
                subsHash: o
            }), hide(s), show(i), i.innerHTML = a
        }
    },
    gotoChannel: function(e, o, t, i, s, a, n) {
        if (e && checkEvent(e)) return !0;
        var c = "channel" + o;
        return cur._channels = cur._channels || {}, "undefined" != typeof cur._sessionChannelsSubscriptions[-o] && (a = cur._sessionChannelsSubscriptions[-o]), cur._channels[o] = {
            oid: o,
            shortTitle: t,
            thumb: i,
            href: s,
            isSubscribed: a,
            subsHash: n
        }, cur.videoList[c] = {
            needPreload: !0
        }, nav.change({
            section: c
        }), !1
    },
    gotoCategory: function(e, o, t) {
        return e && checkEvent(e) ? !0 : (cur.categoryTitle = t, nav.change({
            section: "cat_" + o
        }), !1)
    },
    collapseUGCPopular: function() {
        var e = gpeByClass("videocat_row", ge("videocat_header_ugc_popular"));
        each(geByClass("videocat_row_item", e), function(e) {
            toggle(this, 12 > e)
        })
    },
    showMore: function(e, o, t) {
        var i = e.previousElementSibling,
            s = !1,
            a = !1;
        each(i.children, function(e, t) {
            if (!isVisible(t)) {
                if (s) return a = !0, !1;
                show(t), o--, o || (s = !0)
            }
        }), "recom" == t ? toggle(e, Videocat.currRecomParams.more) : toggle(e, a), "recom" == t && ajax.post("/al_video.php", {
            act: "a_fetch_next_recoms",
            from: Videocat.currRecomParams.from,
            offset: +Videocat.currRecomParams.offset,
            more: +Videocat.currRecomParams.more,
            params_sig: Videocat.currRecomParams.params_sig
        }, {
            onDone: function(o, t, i) {
                Videocat.currRecomParams = t;
                for (var s = geByClass1("videocat_grid_wrap", domPN(e)), a = se(trim(o)).children; a.length;) s.appendChild(a[0]), hide(a[0]);
                t && t.more || re(e), i && i.recom && i.recom.list.length && Videocat.lists.recoms && (Videocat.lists.recoms.list = Videocat.lists.recoms.list.concat(i.recom.list))
            }
        })
    },
    showMoreBlocks: function(e) {
        var o = Videocat.moreBlocks[0];
        Videocat.moreBlocks = Videocat.moreBlocks.slice(1);
        var t = Videocat.moreBlocks.length > 0,
            i = geByClass1("videocat_more_toggle_text", e),
            s = geByClass1("videocat_more_toggle_progress", e);
        ajax.post("/al_video.php", {
            act: "a_fetch_next_blocks",
            list: o
        }, {
            showProgress: function() {
                hide(i), show(s)
            },
            hideProgress: function() {
                show(i), hide(s), toggle(e, t)
            },
            onDone: function(o, t) {
                t && !isEmpty(t) && (Videocat.lists = extend(Videocat.lists, t));
                for (var i = ge("videocat_page"), s = se(trim(o)).children; s.length;) i.insertBefore(s[0], e)
            }
        })
    },
    slideRow: function(e, o, t) {
        function i(e, o) {
            e ? addEvent(o, "mouseleave", function() {
                setStyle(o, "pointer-events", "none"), removeEvent(o, "mouseleave")
            }) : setStyle(o, "pointer-events", "all")
        }
        var s = domPN(e),
            a = geByClass1("videocat_row_slider_items_cont", s),
            n = gpeByClass("videocat_row_slider", e),
            c = getSize(a.children[0])[0],
            r = 3,
            d = r * (o > 0 ? 1 : -1),
            l = d + (data(a, "items_offset") || 0);
        l = Math.min(l, 0), l = Math.max(l, -a.children.length + r), data(a, "items_offset", l);
        var u;
        u = 0 == l ? 15 : -l == a.children.length - r ? 56 : 37, setStyle(a, {
            left: c * l + u
        });
        var _ = geByClass1("videocat_row_slider_btn_left", s),
            h = geByClass1("videocat_row_slider_btn_right", s),
            f = 0 == l,
            v = -(l - r) >= a.children.length;
        if (toggleClass(_, "videocat_row_slider_hidden", f), toggleClass(h, "videocat_row_slider_hidden", v), i(f, _), i(v, h), f && Videocat.slideMouseLeave(_, "right"), v && Videocat.slideMouseLeave(h, "left"), toggleClass(n, "videocat_slider_offseted", !f && !v), cur._slideTimeouts = cur._slideTimeouts || [], each(cur._slideTimeouts, function(e, o) {
                clearTimeout(o)
            }), each(geByClass("video_item", s), function(e) {
                e >= -l + r && -l + 2 * r > e && removeClass(this, "video_skip_thumb_load"), e == -l - 1 || e == -l + r ? ! function(e) {
                    cur._slideTimeouts.push(setTimeout(function() {
                        addClass(e, "videocat_item_transparent")
                    }, 270))
                }(this) : removeClass(this, "videocat_item_transparent")
            }), !t && Videocat._sliderExtends && (each(Videocat._sliderExtends, function(e, o) {
                o()
            }), Videocat._sliderExtends = []), !t && 0 > o) {
            var p = gpeByClass("videocat_row", e),
                g = p ? p.getAttribute("data-type") : "";
            if (g) {
                g = intval(g), Videocat.slideLoadMore(p, g)
            }
            if (!Videocat.feedDataLoading && p && "feed" == p.getAttribute("data-block-id") && Videocat.feedData && !isEmpty(Videocat.feedData)) {
                Videocat.feedDataLoading = !0;
                var m = Videocat.feedData;
                m.act = "a_fetch_next_feed", m.module = cur.module, ajax.post("al_video.php", m, {
                    onDone: function(e, o, t, i, s) {
                        Videocat.feedData = extend(Videocat.feedData, {
                            video_feed_from: t,
                            video_feed_offset: i,
                            hash: s
                        }), t || (Videocat.feedData = !1), o && o.feed && (Videocat.lists.feed = Videocat.lists.feed || {}, Videocat.lists.feed.list = Videocat.lists.feed.list.concat(o.feed.list)), Videocat.extendSlider(p, e), Videocat.feedDataLoading = !1
                    }
                })
            }
        }
    },
    slideLoadMore: function(e, o, t) {
        var i = cur.moreVideosInfo[o];
        i && (cur.moreVideosInfo[o] = !1, ajax.post("al_video.php", {
            act: "a_more_videos",
            type: o,
            videos: i.join(",")
        }, {
            onDone: function(o, i) {
                Videocat.extendSlider(e, o), each(i, function(e, o) {
                    cur.catVideosList[e].list = cur.catVideosList[e].list.concat(o.list)
                }), isFunction(t) && t()
            }
        }))
    },
    slideMouseEnter: function(e, o) {
        var t = domPN(e),
            i = geByClass1("videocat_row_slider_items_cont", t);
        hasClass(e, "videocat_row_slider_hidden") || addClass(i, "videocat_row_slider_shift_" + o)
    },
    slideMouseLeave: function(e, o) {
        var t = domPN(e),
            i = geByClass1("videocat_row_slider_items_cont", t);
        removeClass(i, "videocat_row_slider_shift_" + o)
    },
    toggleRepeat: function(e, o) {
        var t = "playlistAutoplay",
            i = ls.get(t);
        ls.set(t, !i), toggleClass(o, "video_header_btn_active", i)
    },
    isAutoplayEnabled: function() {
        return !1
    },
    closeBlock: function(e, o, t, i, s) {
        i || (i = "videocat_row");
        var a = gpeByClass(i, e);
        s ? a.parentElement.removeChild(a) : (setStyle(a, {
            "max-height": getSize(a)[1]
        }), setTimeout(function() {
            addClass(a, "videocat_row_closed")
        })), ajax.post("al_video.php", {
            act: "a_videocat_closeblock",
            block_id: o,
            hash: t
        }), window.tooltips && tooltips.hideAll(), 1 == domPN(a).children.length && setTimeout(function() {
            re(gpeByClass("videocat_page_block", a))
        }, 500)
    },
    isTop3Playlist: function(e) {
        var o = !1;
        return each(Videocat.top3playlists || [], function(t, i) {
            return i == e ? (o = !0, !1) : void 0
        }), o
    },
    logPlaylistEnter: function(e, o) {
        ajax.post("al_video.php", {
            act: "a_videocat_logListEnter",
            channel_id: e,
            hash: o
        })
    }
};
try {
    stManager.done("videocat.js")
} catch (e) {}