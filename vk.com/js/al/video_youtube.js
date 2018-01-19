var VideoYoutube = {
    qualityValues: {
        auto: "Auto",
        tiny: 144,
        small: 240,
        medium: 360,
        large: 480,
        hd720: 720,
        hd1080: 1080,
        hd1440: 1440,
        hd2160: 2160,
        highres: 4320
    },
    cur: {},
    init: function(e, o) {
        VideoYoutube.destroy();
        var t = ge("video_yt");
        e && t && (VideoYoutube.cur = {
            player: e,
            vars: o || {},
            quality: "auto",
            started: !1,
            playing: !1,
            buffering: !1,
            mouseInside: !0,
            lastMouseMove: null,
            reverseTime: window.localStorage ? "true" == localStorage.video_reverse_time : !1,
            isFS: !1,
            minSize: !1,
            liked: o.liked,
            added: o.added
        }, o.lang_quality_auto && (VideoYoutube.qualityValues.auto = o.lang_quality_auto), t.appendChild(se(VideoYoutube.getUIHtml())), e.addEventListener("onReady", VideoYoutube.onPlayerReady), e.addEventListener("onStateChange", VideoYoutube.onStateChange), e.addEventListener("onPlaybackQualityChange", VideoYoutube.onPlaybackQualityChange), e.addEventListener("onError", VideoYoutube.onError), addEvent(t, "mouseenter", VideoYoutube.onMouseEnter), addEvent(t, "mouseleave", VideoYoutube.onMouseLeave), addEvent(t, "mousemove", VideoYoutube.onMouseMove), addEvent(t, "keydown", VideoYoutube.onKeyDown), addEvent(document, fullscreenApi.fullscreenEventName, VideoYoutube.onFullscreenChange), addEvent(window, "resize", VideoYoutube.onResize), VideoYoutube.onResize(), o.autoplay && ! function i() {
            var e = VideoYoutube.cur.player;
            if (e)
                if (e.getPlayerState && e.getPlayerState() != YT.PlayerState.UNSTARTED && !VideoYoutube.cur.started) {
                    var o = {
                        data: e.getPlayerState()
                    };
                    VideoYoutube.onStateChange(o)
                } else setTimeout(i, 100)
        }())
    },
    initStatOnly: function(e, o) {
        VideoYoutube.destroy();
        var t = ge("video_yt");
        e && t && (VideoYoutube.cur = {
            player: e,
            vars: o || {},
            quality: "auto",
            started: !1,
            playing: !1,
            buffering: !1,
            mouseInside: !0,
            lastMouseMove: null,
            reverseTime: window.localStorage ? "true" == localStorage.video_reverse_time : !1,
            isFS: !1,
            minSize: !1,
            liked: o.liked,
            added: o.added
        }, e.addEventListener("onStateChange", VideoYoutube.onStateChangeStatOnly), addEvent(document, fullscreenApi.fullscreenEventName, VideoYoutube.onFullscreenChange), VideoYoutube.onResize(), addEvent(window, "resize", VideoYoutube.onResize), o.autoplay && ! function i() {
            var e = VideoYoutube.cur.player;
            if (e)
                if (e.getPlayerState && e.getPlayerState() != YT.PlayerState.UNSTARTED && !VideoYoutube.cur.started) {
                    var o = {
                        data: e.getPlayerState()
                    };
                    VideoYoutube.onStateChange(o)
                } else setTimeout(i, 100)
        }())
    },
    getUIHtml: function() {
        var e = VideoYoutube.cur.vars,
            o = VideoYoutube.formatTime(0),
            t = VideoYoutube.formatTime(e.duration),
            i = fullscreenApi.supportsFullscreen;
        return '<div id="video_yt_ui" class="no_select">  <!--div id="video_yt_poster" style="background-image: url(' + e.jpg + ')"></div-->  <div id="video_yt_mousetrap" onclick="VideoYoutube.togglePlay()" ondblclick="VideoYoutube.toggleFullscreen()" style="display:none"></div>  <div id="video_yt_actions" class="clear_fix hidden">    <div id="video_yt_like" class="fl_l video_yt_like ' + (e.liked ? "selected" : "") + '" onmouseover="VideoYoutube.onLikeOver(this)" onmouseout="VideoYoutube.onLikeOut(this)" onclick="VideoYoutube.onLikeClick(this)">      <span class="video_yt_like_icon video_yt_icon"></span>      <span class="video_yt_liked_icon video_yt_icon"></span>    </div>    <div id="video_yt_share" class="fl_l video_yt_share" onmouseover="VideoYoutube.onShareOver(this)" onmouseout="VideoYoutube.onShareOut(this)" onclick="VideoYoutube.onShareClick(this)">      <span class="video_yt_share_icon video_yt_icon"></span>    </div>    <div id="video_yt_add" class="fl_l video_yt_add ' + (e.added ? "selected" : "") + '" onmouseover="VideoYoutube.onAddOver(this)" onmouseout="VideoYoutube.onAddOut(this)" onclick="VideoYoutube.onAddClick(this, 1)" style="' + (e.can_add ? "" : "display:none") + '">      <span class="video_yt_add_icon video_yt_icon"></span>      <span class="video_yt_added_icon video_yt_icon"></span>    </div>  </div>  <div id="video_yt_controls" class="hidden">    <table cellspacing="0" cellpadding="0" border="0" id="video_yt_controls_table">      <tr>        <td style="padding:0 14px 0 2px" id="video_yt_play_btn_td">          <div id="video_yt_play_btn" class="video_yt_icon" onclick="VideoYoutube.togglePlay()"></div>        </td>        <td style="padding-right:10px; display:none" id="video_yt_replay_btn_td">          <div id="video_yt_replay_btn" class="video_yt_icon" onclick="VideoYoutube.replayVideo()"></div>        </td>        <td style="padding-right:12px;' + (e.show_next ? "" : "display:none") + '">          <div id="video_yt_next_btn" class="video_yt_icon" onmouseover="VideoYoutube.onNextBtnOver(this)" onmouseout="VideoYoutube.onNextBtnOut(this)" onclick="VideoYoutube.nextVideo()"></div>        </td>        <td width="100%" style="padding:6px 0">          <div id="video_yt_progressbar" onmousemove="VideoYoutube.onProgressMove(event)" onmouseover="VideoYoutube.onProgressOver()" onmouseout="VideoYoutube.onProgressOut()" onmousedown="VideoYoutube.onProgressDragStart(event)">            <div class="video_yt_progressbar_bg"></div>            <div id="video_yt_progressbar_loaded"></div>            <div id="video_yt_progressbar_viewed">              <div class="video_yt_progressbar_slider"></div>            </div>          </div>        </td>        <td style="padding-left:14px" id="video_yt_time_td">          <div id="video_yt_time_label" class="video_yt_time_label ' + (VideoYoutube.cur.reverseTime ? "video_yt_time_label_reversed" : "") + '" onclick="VideoYoutube.onTimeLabelClick(this)">            <span id="video_yt_time_current" class="video_yt_time_current">' + o + '</span>            <span id="video_yt_time_duration" class="video_yt_time_duration"> / ' + t + '</span>          </div>        </td>        <td style="padding-left:16px">          <div class="volume_wrap" onmouseenter="VideoYoutube.onVolumeWrapOver()" onmouseleave="VideoYoutube.onVolumeWrapOut()">            <div id="video_yt_volumebar_dropdown" class="hidden"></div>            <div id="video_yt_volume_btn" class="video_yt_icon" onmouseover="VideoYoutube.onVolumeBtnOver(this)" onmouseout="VideoYoutube.onVolumeBtnOut(this)" onclick="VideoYoutube.onVolumeBtnClick(this)"></div>          </div>        </td>        <td style="padding:0 6px" id="video_yt_volumebar_td">          <div id="video_yt_volumebar" onmousedown="VideoYoutube.onVolumeDragStart(event)">            <div class="video_yt_volumebar_bg"></div>            <div id="video_yt_volumebar_filled">              <div class="video_yt_volumebar_slider"></div>            </div>          </div>        </td>        <td style="padding-left:9px;' + (e.is_inline ? "" : "display:none") + '">          <div id="video_yt_expand_btn" class="video_yt_icon" onmouseover="VideoYoutube.onExpandBtnOver(this)" onmouseout="VideoYoutube.onExpandBtnOut(this)" onclick="VideoYoutube.onExpandBtnClick(this)"></div>        </td>        <td style="padding-left:9px;' + (i ? "" : "display:none") + '">          <div id="video_yt_fullscreen_btn" class="video_yt_icon" onmouseover="VideoYoutube.onFullScreenBtnOver(this)" onmouseout="VideoYoutube.onFullScreenBtnOut(this)" onclick="VideoYoutube.toggleFullscreen()"></div>        </td>        <td style="padding:0 9px 0 8px" id="video_yt_quality_td">          <div id="video_yt_quality_label" onmouseenter="VideoYoutube.onQualityLabelOver()" onmouseleave="VideoYoutube.onQualityLabelOut()">            <div id="video_yt_quality_dropdown" class="hidden"></div>            <span id="video_yt_quality_btn" onmouseover="VideoYoutube.onQualityBtnOver(this)" onmouseout="VideoYoutube.onQualityBtnOut(this)" onclick="VideoYoutube.toggleQualityDropdown()">              <span id="video_yt_quality_btn_value"></span>              <span id="video_yt_quality_btn_icon"></span>            </span>          </div>        </td>        <td style="padding-left:9px">          <div id="video_yt_logo_btn" onclick="VideoYoutube.onLogoClick()"></div>        </td>      </tr>    </table>  </div>  <div id="video_yt_popup" class="hidden" onclick="VideoYoutube.togglePlay()" ondblclick="VideoYoutube.toggleFullscreen()">    <div class="video_yt_popup_play video_yt_icon"></div>    <div class="video_yt_popup_title" style="' + (e.no_title ? "display:none" : "") + '">' + e.title + '</div>    <a href="' + e.author_href + '" target="_blank" onclick="event.stopPropagation()" class="video_yt_popup_author">' + e.author_name + '</a>  </div>  <div id="video_yt_tip">    <div id="video_yt_tip_arrow"></div>    <div id="video_yt_tip_bk"></div>    <span id="video_yt_tip_text"></div>  </div></div>    '
    },
    getQualityItemsHtml: function(e) {
        var o = "";
        return each(e, function(e, t) {
            var i = VideoYoutube.qualityValues[t];
            if (!(240 > i)) {
                var u;
                i >= 720 && 1080 >= i ? u = "hd" : 1440 == i ? u = "2k" : 2160 == i ? u = "4k" : 4320 == i && (u = "8k"), o += '<div class="video_yt_quality_item ' + ("auto" == t ? "selected" : "") + '" onclick="VideoYoutube.setQuality(\'' + t + '\', this)">  <span class="video_yt_quality_item_text">' + i + "</span>  " + (u ? '<span class="video_yt_quality_item_' + u + '_label video_yt_icon"></span>' : "") + "</div>      "
            }
        }), o
    },
    togglePlay: function(e) {
        var o = VideoYoutube.cur.player;
        o && (e = null != e ? e : !VideoYoutube.cur.playing, e ? o.playVideo() : o.pauseVideo(), toggleClass("video_yt_play_btn", "playing", e), toggleClass("video_yt_popup", "hidden", e), VideoYoutube.cur.playing = e)
    },
    getState: function() {
        switch (VideoYoutube.cur.state) {
            case YT.PlayerState.UNSTARTED:
                return "unstarted";
            case YT.PlayerState.PLAYING:
            case YT.PlayerState.BUFFERING:
                return "playing";
            case YT.PlayerState.PAUSED:
                return "paused";
            case YT.PlayerState.ENDED:
                return "ended";
            default:
                return "empty"
        }
    },
    replayVideo: function() {
        VideoYoutube.cur.player.seekTo(0), VideoYoutube.cur.player.playVideo()
    },
    setQuality: function(e, o) {
        VideoYoutube.cur.player.setPlaybackQuality(e), each(ge("video_yt_quality_dropdown").children, function(e, o) {
            o instanceof HTMLElement && removeClass(o, "selected")
        }), addClass(o, "selected"), VideoYoutube.toggleQualityDropdown(), "auto" != e && VideoYoutube.updateQualityLabel(e)
    },
    toggleMute: function() {
        var e = VideoYoutube.cur.player,
            o = e.getVolume();
        e.isMuted() || !o ? (e.unMute(), o ? window.localStorage && localStorage.setItem("video_volume", o) : VideoYoutube.setVolume(60)) : (e.mute(), window.localStorage && localStorage.setItem("video_volume", 0)), setTimeout(VideoYoutube.updateVolume, 10)
    },
    setVolume: function(e) {
        var o = VideoYoutube.cur.player;
        o.isMuted() && o.unMute(), o.setVolume(e), window.localStorage && localStorage.setItem("video_volume", Math.round(e))
    },
    toggleFullscreen: function() {
        VideoYoutube.cur.isFS ? fullscreenApi.exitFullscreen() : fullscreenApi.requestFullscreen(ge("video_yt"))
    },
    nextVideo: function() {
        videoCallback(["onVideoNext"])
    },
    onPlayerReady: function() {
        if (window.localStorage) {
            var e = localStorage.getItem("video_volume");
            VideoYoutube.cur.player.setVolume(e || 60)
        }
        VideoYoutube.cur.vars.mute && VideoYoutube.cur.player.mute(), videoCallback(["onInitialized"])
    },
    onStateChange: function(e) {
        switch (e.data == YT.PlayerState.BUFFERING ? VideoYoutube.cur.buffering = !0 : (VideoYoutube.cur.state = e.data, VideoYoutube.cur.buffering = !1, VideoYoutube.cur.playing = !1), e.data) {
            case YT.PlayerState.UNSTARTED:
                break;
            case YT.PlayerState.ENDED:
                VideoYoutube.onVideoEnded();
                break;
            case YT.PlayerState.PLAYING:
                VideoYoutube.cur.playing = !0, VideoYoutube.cur.started || VideoYoutube.onVideoStarted(), VideoYoutube.onVideoPlaying();
                break;
            case YT.PlayerState.PAUSED:
                VideoYoutube.onVideoPaused();
                break;
            case YT.PlayerState.BUFFERING:
                VideoYoutube.onVideoBuffering()
        }
    },
    onPlaybackQualityChange: function(e) {
        VideoYoutube.updateQualityLabel(e.data)
    },
    onError: function(e) {},
    onVideoStarted: function() {
        var e = VideoYoutube.cur.player,
            o = VideoYoutube.cur.player.getAvailableQualityLevels(),
            t = ge("video_yt_quality_dropdown");
        t.innerHTML = VideoYoutube.getQualityItemsHtml(o), VideoYoutube.updateQualityLabel(e.getPlaybackQuality()), VideoYoutube.resizeTimeLabel(), VideoYoutube.updateProgress(), show("video_yt_mousetrap"), hide("video_yt_replay_btn_td"), show("video_yt_play_btn_td"), removeClass("video_yt_controls", "hidden"), removeClass("video_yt_actions", "hidden"), VideoYoutube.progressLoopStart(), VideoYoutube.cur.started = !0, cur && cur.incViews && cur.incViews()
    },
    onStateChangeStatOnly: function(e) {
        switch (e.data == YT.PlayerState.BUFFERING ? VideoYoutube.cur.buffering = !0 : (VideoYoutube.cur.state = e.data, VideoYoutube.cur.buffering = !1, VideoYoutube.cur.playing = !1), e.data) {
            case YT.PlayerState.ENDED:
                VideoYoutube.onVideoEndedStatOnly();
                break;
            case YT.PlayerState.PLAYING:
                VideoYoutube.cur.started || VideoYoutube.onVideoStartedStatOnly()
        }
    },
    onVideoStartedStatOnly: function() {
        VideoYoutube.cur.started = !0, cur && cur.incViews && cur.incViews()
    },
    onVideoEndedStatOnly: function() {
        VideoYoutube.cur.started = !1
    },
    onVideoPlaying: function() {
        addClass("video_yt_play_btn", "playing"), addClass("video_yt_popup", "hidden"), VideoYoutube.cur.isFS ? (clearTimeout(VideoYoutube.cur.hideControlsTimeoutId), VideoYoutube.cur.hideControlsTimeoutId = setTimeout(VideoYoutube.onHideControlsTimer, 2e3)) : VideoYoutube.cur.mouseInside || VideoYoutube.cur.progressDragging || VideoYoutube.toggleControls(!1)
    },
    onVideoPaused: function() {
        removeClass("video_yt_play_btn", "playing"), VideoYoutube.toggleControls(!0), removeClass("video_yt_popup", "hidden")
    },
    onVideoEnded: function() {
        VideoYoutube.cur.isFS && VideoYoutube.toggleFullscreen(), removeClass("video_yt_play_btn", "playing"), hide("video_yt_play_btn_td"), show("video_yt_replay_btn_td"), VideoYoutube.toggleControls(!0), VideoYoutube.cur.started = !1, VideoYoutube.progressLoopStop(), VideoYoutube.cur.progressDragging && VideoYoutube.onProgressDragEnd(), VideoYoutube.updateProgress()
    },
    onVideoBuffering: function() {},
    progressLoopStart: function() {
        VideoYoutube.prIntervalId || (VideoYoutube.prIntervalId = setInterval(function() {
            return ge("video_yt") ? (VideoYoutube.updateProgress(), void VideoYoutube.updateVolume()) : void VideoYoutube.destroy()
        }, 50))
    },
    progressLoopStop: function() {
        clearInterval(VideoYoutube.prIntervalId), VideoYoutube.prIntervalId = null
    },
    updateProgress: function(e) {
        var o = VideoYoutube.cur.player;
        if (o.getPlayerState) {
            var t = o.getCurrentTime() || 0,
                i = o.getDuration() || VideoYoutube.cur.vars.duration;
            if (setStyle("video_yt_progressbar_loaded", {
                    width: 100 * o.getVideoLoadedFraction() + "%"
                }), VideoYoutube.cur.progressDragging || o.getPlayerState() == YT.PlayerState.BUFFERING) {
                if (isNaN(e)) return;
                t = e
            }
            setStyle("video_yt_progressbar_viewed", {
                width: t / i * 100 + "%"
            });
            var u = VideoYoutube.cur.minSize && VideoYoutube.cur.reverseTime;
            ge("video_yt_time_current").innerHTML = VideoYoutube.formatTime(u ? i - t : t), ge("video_yt_time_duration").innerHTML = " / " + VideoYoutube.formatTime(i)
        }
    },
    updateVolume: function(e) {
        var o = VideoYoutube.cur.player;
        if (o && o.getVolume) {
            var t = isNaN(e) ? o.getVolume() : e,
                i = o.isMuted(),
                u = VideoYoutube.cur.minSize;
            setStyle("video_yt_volumebar_filled", {
                width: u ? null : (i ? 0 : t) + "%",
                height: u ? (i ? 0 : t) + "%" : null
            });
            var d = ge("video_yt_volume_btn");
            0 == t || i ? d.setAttribute("mode", "off") : 20 > t ? d.setAttribute("mode", "min") : 50 > t ? d.setAttribute("mode", "mid") : d.setAttribute("mode", "max")
        }
    },
    toggleQualityDropdown: function(e) {
        var o = ge("video_yt_quality_dropdown");
        e = null != e ? e : hasClass(o, "hidden"), toggleClass(o, "hidden", !e), e && VideoYoutube.hideTip()
    },
    showTip: function(e, o, t, i) {
        var u = ge("video_yt_tip");
        ge("video_yt_tip_text").innerHTML = e.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var d, n, r, a = getSize("video_yt"),
            l = 36,
            s = getSize(u),
            c = 4;
        o - s[0] / 2 < 8 ? (d = 8, r = o - d) : o + s[0] / 2 > a[0] - 8 ? (d = a[0] - s[0] - 8, r = o - d) : d = Math.round(o - s[0] / 2), n = i ? Math.round(t + c) : Math.round(t - s[1] - c), toggleClass(u, "video_yt_tip_down", !!i), setStyle(u, {
            display: "block",
            left: d + "px",
            top: n + "px"
        }), setStyle("video_yt_tip_arrow", {
            left: r || null
        });
        var v = a[1] - l - n;
        v = v > s[1] ? 0 : v, setStyle("video_yt_tip_bk", {
            height: v
        })
    },
    hideTip: function() {
        hide("video_yt_tip")
    },
    toggleControls: function(e) {
        VideoYoutube.cur.progressDragging || VideoYoutube.cur.volumeDragging || hasClass("video_yt_quality_dropdown", "hidden") && (e !== !0 || VideoYoutube.cur.started) && (e !== !1 || VideoYoutube.cur.playing) && (toggleClass("video_yt_controls", "hidden", !e), toggleClass("video_yt_actions", "hidden", !e), toggleClass("video_yt", "no_cursor", !e), e === !1 && VideoYoutube.hideTip())
    },
    onResize: function() {
        var e = ge("video_yt");
        if (e) {
            var o = getSize(e);
            VideoYoutube.cur.minSize = o[0] < 400, toggleClass(e, "video_yt_min", VideoYoutube.cur.minSize);
            var t = [ge("video_yt_quality_td"), ge("video_yt_time_td")],
                i = (ge("video_yt_controls"), ge("video_yt_controls_table")),
                u = getSize(e)[0];
            show.apply(null, t), each(t, function(e, o) {
                return getSize(i)[0] > u ? void hide(o) : !1
            })
        }
    },
    resizeTimeLabel: function() {
        var e = VideoYoutube.cur.player,
            o = e.getDuration ? e.getDuration() : VideoYoutube.cur.vars.duration;
        if (o) {
            var t = VideoYoutube.formatTime(o),
                i = ge("video_yt_time_label");
            setStyle(i, {
                width: null
            }), ge("video_yt_time_current").innerHTML = t, ge("video_yt_time_duration").innerHTML = "/ " + t, setStyle(i, {
                width: getSize(i)[0] + "px"
            })
        }
    },
    updateQualityLabel: function(e) {
        var o = VideoYoutube.qualityValues[e];
        VideoYoutube.cur.quality = e, ge("video_yt_quality_btn_value").textContent = o;
        var t = ge("video_yt_quality_btn_icon");
        t.className = "video_yt_icon video_yt_quality_btn_icon_" + o
    },
    onNextBtnOver: function(e) {
        var o = VideoYoutube.cur.vars,
            t = getXY("video_yt"),
            i = getXY(e),
            u = i[0] - t[0] + 9,
            d = i[1] - t[1] - 4;
        VideoYoutube.showTip(o.lang_next, u, d)
    },
    onNextBtnOut: function(e) {
        VideoYoutube.hideTip()
    },
    onTimeLabelClick: function(e) {
        VideoYoutube.cur.minSize && (VideoYoutube.cur.reverseTime = !VideoYoutube.cur.reverseTime, toggleClass(e, "video_yt_time_label_reversed", VideoYoutube.cur.reverseTime), VideoYoutube.updateProgress(), window.localStorage && localStorage.setItem("video_reverse_time", VideoYoutube.cur.reverseTime))
    },
    onVolumeBtnOver: function(e) {
        if (!VideoYoutube.cur.minSize) {
            var o = VideoYoutube.cur.player,
                t = VideoYoutube.cur.vars,
                i = getXY("video_yt"),
                u = getXY(e),
                d = u[0] - i[0] + 9,
                n = u[1] - i[1] - 4,
                r = o.isMuted() || !o.getVolume() ? t.lang_volume_on : t.lang_volume_off;
            VideoYoutube.showTip(r, d, n)
        }
    },
    onVolumeBtnOut: function(e) {
        VideoYoutube.hideTip()
    },
    onVolumeWrapOver: function() {
        VideoYoutube.cur.minSize && removeClass("video_yt_volumebar_dropdown", "hidden")
    },
    onVolumeWrapOut: function() {
        VideoYoutube.cur.minSize && !VideoYoutube.cur.volumeDragging && addClass("video_yt_volumebar_dropdown", "hidden")
    },
    onVolumeBtnClick: function(e) {
        VideoYoutube.toggleMute(), setTimeout(VideoYoutube.onVolumeBtnOver.bind(null, e), 10)
    },
    onExpandBtnOver: function(e) {
        var o = VideoYoutube.cur.vars,
            t = getXY("video_yt"),
            i = getXY(e),
            u = i[0] - t[0] + 7,
            d = i[1] - t[1] - 4;
        VideoYoutube.showTip(o.lang_open_popup, u, d)
    },
    onExpandBtnOut: function(e) {
        VideoYoutube.hideTip()
    },
    onExpandBtnClick: function(e) {
        var o = VideoYoutube.cur.vars,
            t = o.oid + "_" + o.vid,
            i = VideoYoutube.cur.player.getCurrentTime();
        videoCallback(["onOpenInPopup", t, o.list_id, i])
    },
    onFullScreenBtnOver: function(e) {
        var o = VideoYoutube.cur.vars,
            t = getXY("video_yt"),
            i = getXY(e),
            u = i[0] - t[0] + 7,
            d = i[1] - t[1] - 4,
            n = VideoYoutube.cur.isFS ? o.lang_window : o.lang_fullscreen;
        VideoYoutube.showTip(n, u, d)
    },
    onFullScreenBtnOut: function(e) {
        VideoYoutube.hideTip()
    },
    onQualityBtnOver: function(e) {
        if (hasClass("video_yt_quality_dropdown", "hidden")) {
            var o = getXY("video_yt"),
                t = getXY(e),
                i = t[0] - o[0] + getSize(e)[0] / 2,
                u = t[1] - o[1] - 4;
            VideoYoutube.showTip(VideoYoutube.cur.vars.lang_hdsd, i, u)
        }
    },
    onQualityBtnOut: function(e) {
        VideoYoutube.hideTip()
    },
    onQualityLabelOver: function() {
        clearTimeout(VideoYoutube.cur.hideQualityDDTimer)
    },
    onQualityLabelOut: function() {
        VideoYoutube.cur.hideQualityDDTimer = setTimeout(function() {
            VideoYoutube.toggleQualityDropdown(!1), VideoYoutube.cur.isFS && VideoYoutube.cur.state == YT.PlayerState.PLAYING && (new Date).getTime() - VideoYoutube.cur.lastMouseMove > 2e3 && VideoYoutube.toggleControls(!1)
        }, 3e3)
    },
    onLogoClick: function() {
        var e = VideoYoutube.cur.player,
            o = e.getVideoUrl();
        VideoYoutube.togglePlay(!1);
        var t = window.open(o);
        t.opener = null
    },
    onFullscreenChange: function() {
        var e = fullscreenApi.fullscreenElement() === ge("video_yt");
        VideoYoutube.cur.isFS = e, toggleClass("video_yt", "video_yt_fullscreen", e), toggleClass("video_yt_fullscreen_btn", "fullscreen", e), VideoYoutube.hideTip(), VideoYoutube.onResize(), videoCallback(["fullscreen", e])
    },
    onProgressOver: function() {
        addClass("video_yt_progressbar", "over")
    },
    onProgressOut: function() {
        removeClass("video_yt_progressbar", "over"), VideoYoutube.hideTip()
    },
    onProgressMove: function(e) {
        var o = VideoYoutube.cur.player,
            t = o ? o.getDuration() : VideoYoutube.cur.vars.duration,
            i = getSize("video_yt_progressbar"),
            u = getXY("video_yt_progressbar"),
            d = getXY("video_yt"),
            n = VideoYoutube.cur.isFS ? -d[0] : 0,
            r = (e.pageX - u[0] - n) / i[0];
        r = Math.max(0, Math.min(1, r));
        var a = VideoYoutube.formatTime(t * r),
            l = u[0] - d[0] + i[0] * r,
            s = u[1] - d[1];
        VideoYoutube.showTip(a, l, s)
    },
    onProgressDragStart: function(e) {
        addEvent(document, "mousemove", VideoYoutube.onProgressDrag), addEvent(document, "mouseup", VideoYoutube.onProgressDragEnd), addClass("video_yt_progressbar", "dragging"), VideoYoutube.cur.progressDragging = !0, VideoYoutube.onProgressDrag(e, !0)
    },
    onProgressDrag: function(e, o) {
        o || cancelEvent(e);
        var t = VideoYoutube.cur.player,
            i = t.getDuration(),
            u = ge("video_yt_progressbar");
        if (browser.msie8) var d = getSize(u)[0],
            n = getXY(u)[0] - (VideoYoutube.cur.isFS ? getXY("video_yt")[0] : 0);
        else var r = u.getBoundingClientRect(),
            d = r.width,
            n = r.left;
        var a = (e.pageX - n) / d;
        a = Math.max(0, Math.min(1, a));
        var l = a * i;
        hasClass(u, "over") || VideoYoutube.onProgressMove(e), VideoYoutube.cur.player.seekTo(l), VideoYoutube.updateProgress(l)
    },
    onProgressDragEnd: function(e) {
        removeEvent(document, "mousemove", VideoYoutube.onProgressDrag), removeEvent(document, "mouseup", VideoYoutube.onProgressDragEnd), VideoYoutube.cur.progressDragging = !1;
        var o = ge("video_yt_progressbar");
        removeClass(o, "dragging"), hasClass(o, "over") || VideoYoutube.onProgressOut(e)
    },
    onVolumeDragStart: function(e) {
        addEvent(document, "mousemove", VideoYoutube.onVolumeDrag), addEvent(document, "mouseup", VideoYoutube.onVolumeDragEnd), addClass("video_yt_volumebar", "dragging"), VideoYoutube.cur.volumeDragging = !0, VideoYoutube.onVolumeDrag(e, !0)
    },
    onVolumeDrag: function(e, o) {
        o || cancelEvent(e);
        var t = (VideoYoutube.cur.player, VideoYoutube.cur.minSize);
        if (browser.msie8) var i = getSize("video_yt_volumebar"),
            u = getXY("video_yt_volumebar"),
            d = {
                left: u[0] - scrollGetX(),
                top: u[1] - scrollGetY(),
                width: i[0],
                height: i[1]
            };
        else var d = ge("video_yt_volumebar").getBoundingClientRect();
        if (t) var n = (d.height - (e.pageY - scrollGetY() - d.top)) / d.height;
        else var n = (e.pageX - scrollGetX() - d.left) / d.width;
        if (n = Math.max(0, Math.min(1, n)), VideoYoutube.setVolume(100 * n), VideoYoutube.updateVolume(100 * n), !VideoYoutube.cur.minSize) {
            var r = ge("video_yt").getBoundingClientRect(),
                a = d.left - r.left + d.width * n,
                l = d.top - r.top;
            VideoYoutube.showTip(Math.round(100 * n) + "%", a, l)
        }
    },
    onVolumeDragEnd: function(e) {
        removeEvent(document, "mousemove", VideoYoutube.onVolumeDrag), removeEvent(document, "mouseup", VideoYoutube.onVolumeDragEnd), VideoYoutube.cur.volumeDragging = !1, removeClass("video_yt_volumebar", "dragging"), VideoYoutube.hideTip(), VideoYoutube.cur.minSize && addClass("video_yt_volumebar_dropdown", "hidden")
    },
    onKeyDown: function(e) {
        var o = VideoYoutube.cur.player,
            t = !0,
            i = 70,
            u = 77;
        switch (e.keyCode) {
            case KEY.SPACE:
                VideoYoutube.togglePlay();
                break;
            case KEY.UP:
                o.isMuted() ? o.unMute() : VideoYoutube.setVolume(o.getVolume() + 5);
                break;
            case KEY.DOWN:
                VideoYoutube.setVolume(o.getVolume() - 5);
                break;
            case KEY.LEFT:
                o.seekTo(o.getCurrentTime() - 5), VideoYoutube.updateProgress(o.getCurrentTime() - 5);
                break;
            case KEY.RIGHT:
                o.seekTo(o.getCurrentTime() + 5), VideoYoutube.updateProgress(o.getCurrentTime() + 5);
                break;
            case i:
                VideoYoutube.toggleFullscreen();
                break;
            case u:
                VideoYoutube.toggleMute();
                break;
            default:
                t = !1
        }
        t && (cancelEvent(e), VideoYoutube.toggleControls(!0), clearTimeout(VideoYoutube.cur.hideControlsTimeoutId), VideoYoutube.cur.hideControlsTimeoutId = setTimeout(VideoYoutube.onHideControlsTimer, 2e3))
    },
    onMouseEnter: function(e) {
        VideoYoutube.cur.mouseInside = !0, VideoYoutube.cur.started && VideoYoutube.toggleControls(!0)
    },
    onMouseLeave: function(e) {
        VideoYoutube.cur.mouseInside = !1, VideoYoutube.cur.started && VideoYoutube.toggleControls(!1)
    },
    onMouseMove: function(e) {
        clearTimeout(VideoYoutube.cur.hideControlsTimeoutId), VideoYoutube.cur.lastMouseMove = (new Date).getTime(), VideoYoutube.toggleControls(!0), VideoYoutube.cur.isFS && VideoYoutube.cur.state == YT.PlayerState.PLAYING && (VideoYoutube.cur.hideControlsTimeoutId = setTimeout(VideoYoutube.onHideControlsTimer, 2e3))
    },
    onHideControlsTimer: function() {
        (VideoYoutube.cur.isFS || !VideoYoutube.cur.mouseInside && VideoYoutube.cur.state == YT.PlayerState.PLAYING) && VideoYoutube.toggleControls(!1)
    },
    onLikeOver: function(e) {
        var o = getXY(e),
            t = getSize(e),
            i = getXY("video_yt"),
            u = VideoYoutube.cur.vars,
            d = o[0] - i[0] + t[0] / 2,
            n = o[1] - i[1] + t[1] + 4;
        VideoYoutube.showTip(u.lang_like, d, n, !0)
    },
    onLikeOut: function(e) {
        VideoYoutube.hideTip()
    },
    onLikeClick: function(e) {
        videoCallback(["onLike"]), VideoYoutube.onLiked()
    },
    onShareOver: function(e) {
        var o = getXY(e),
            t = getSize(e),
            i = getXY("video_yt"),
            u = VideoYoutube.cur.vars,
            d = o[0] - i[0] + t[0] / 2,
            n = o[1] - i[1] + t[1] + 4;
        VideoYoutube.showTip(u.lang_share, d, n, !0)
    },
    onShareOut: function(e) {
        VideoYoutube.hideTip()
    },
    onShareClick: function(e) {
        VideoYoutube.cur.isFS && VideoYoutube.toggleFullscreen(), videoCallback(["onShare"])
    },
    onAddOver: function(e) {
        var o = getXY(e),
            t = getSize(e),
            i = getXY("video_yt"),
            u = VideoYoutube.cur.vars,
            d = o[0] - i[0] + t[0] / 2,
            n = o[1] - i[1] + t[1] + 4,
            r = VideoYoutube.cur.added ? u.lang_added : u.lang_add;
        VideoYoutube.showTip(r, d, n, !0)
    },
    onAddOut: function(e) {
        VideoYoutube.hideTip()
    },
    onAddClick: function(e, o) {
        if (VideoYoutube.cur.added) videoCallback(["onRemove"]);
        else {
            var t = VideoYoutube.cur.vars,
                i = t.oid + "_" + t.vid;
            videoCallback(["onAdd", i, VideoYoutube.cur.vars.add_hash, o])
        }
        VideoYoutube.onAdded(), VideoYoutube.onAddOver(e)
    },
    onLiked: function() {
        VideoYoutube.cur.liked = !VideoYoutube.cur.liked, toggleClass("video_yt_like", "selected", VideoYoutube.cur.liked)
    },
    onAdded: function() {
        VideoYoutube.cur.added = !VideoYoutube.cur.added, toggleClass("video_yt_add", "selected", VideoYoutube.cur.added)
    },
    formatTime: function(e) {
        function o(e) {
            return e = intval(e), 10 > e ? "0" + e : e
        }
        e = parseInt(e) || 0;
        var t, i, u;
        return t = parseInt(e), i = parseInt(t / 60), t %= 60, u = parseInt(i / 60), i %= 60, (u > 0 ? u + ":" + o(i) : i) + ":" + o(t)
    },
    destroy: function() {
        VideoYoutube.progressLoopStop(), VideoYoutube.cur.player && VideoYoutube.cur.player.destroy && VideoYoutube.cur.player.destroy(), VideoYoutube.cur = {};
        var e = ge("video_yt");
        e && (removeEvent(e, "mouseenter", VideoYoutube.onMouseEnter), removeEvent(e, "mouseleave", VideoYoutube.onMouseLeave), removeEvent(e, "mousemove", VideoYoutube.onMouseMove), removeEvent(e, "keydown", VideoYoutube.onKeyDown)), removeEvent(document, fullscreenApi.fullscreenEventName, VideoYoutube.onFullscreenChange), removeEvent(window, "resize", VideoYoutube.onResize)
    }
};
! function() {
    if (!window.fullscreenApi) {
        var e = {
                supportsFullscreen: !1,
                isFullscreen: function() {
                    return !1
                },
                fullscreenElement: function() {
                    return null
                },
                requestFullscreen: function() {},
                exitFullscreen: function() {},
                fullscreenEventName: "",
                prefix: ""
            },
            o = "webkit moz ms".split(" ");
        document.fullscreenEnabled ? e.supportsFullscreen = !0 : each(o, function(o, t) {
            return document[t + "FullscreenEnabled"] || document[t + "FullScreenEnabled"] ? (e.supportsFullscreen = !0, e.prefix = t, !1) : void 0
        }), e.supportsFullscreen && (e.fullscreenEventName = e.prefix + "fullscreenchange", e.isFullscreen = function() {
            switch (this.prefix) {
                case "":
                    return document.fullscreen;
                case "webkit":
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + "Fullscreen"] || document[this.prefix + "FullScreen"]
            }
        }, e.fullscreenElement = function() {
            return "" === this.prefix ? document.fullscreenElement : document[this.prefix + "FullscreenElement"] || document[this.prefix + "FullScreenElement"]
        }, e.requestFullscreen = function(e) {
            return "" === this.prefix ? e.requestFullscreen() : (e[this.prefix + "RequestFullscreen"] || e[this.prefix + "RequestFullScreen"]).call(e)
        }, e.exitFullscreen = function() {
            return "" === this.prefix ? document.exitFullscreen() : (document[this.prefix + "ExitFullscreen"] || document[this.prefix + "CancelFullScreen"]).call(document)
        }), window.fullscreenApi = e
    }
}();
try {
    stManager.done("video_youtube.js")
} catch (e) {}