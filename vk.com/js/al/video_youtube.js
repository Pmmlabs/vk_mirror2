var VideoYoutube = {
  qualityValues: {
    auto: 'Auto',
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

  init: function(player, vars) {
    VideoYoutube.destroy();

    var container = ge('video_yt');

    if (!player || !container) return;

    VideoYoutube.cur = {
      player: player,
      vars: vars || {},
      quality: 'auto',
      started: false,
      playing: false,
      buffering: false,
      mouseInside: true,
      lastMouseMove: null,
      reverseTime: window.localStorage ? localStorage.video_reverse_time == 'true' : false,
      isFS: false,
      minSize: false,
      liked: vars.liked,
      added: vars.added
    };

    if (vars.lang_quality_auto) {
      VideoYoutube.qualityValues.auto = vars.lang_quality_auto;
    }

    container.appendChild(se(VideoYoutube.getUIHtml()));

    player.addEventListener('onReady', VideoYoutube.onPlayerReady);
    player.addEventListener('onStateChange', VideoYoutube.onStateChange);
    player.addEventListener('onPlaybackQualityChange', VideoYoutube.onPlaybackQualityChange);
    player.addEventListener('onError', VideoYoutube.onError);
    addEvent(container, 'mouseenter', VideoYoutube.onMouseEnter);
    addEvent(container, 'mouseleave', VideoYoutube.onMouseLeave);
    addEvent(container, 'mousemove', VideoYoutube.onMouseMove);
    addEvent(container, 'keydown', VideoYoutube.onKeyDown);
    addEvent(document, fullscreenApi.fullscreenEventName, VideoYoutube.onFullscreenChange);
    addEvent(window, 'resize', VideoYoutube.onResize);

    VideoYoutube.onResize();

    if (vars.autoplay) {
      // workaround for situation when playback started before YT API initialization and onStateChange event hasn't triggered
      (function checkState () {
        var player = VideoYoutube.cur.player;
        if (!player) return;
        if (player.getPlayerState && player.getPlayerState() != YT.PlayerState.UNSTARTED && !VideoYoutube.cur.started) {
          var fakeEvent = {data: player.getPlayerState()};
          VideoYoutube.onStateChange(fakeEvent);
        } else {
          setTimeout(checkState, 100);
        }
      })();
    }
  },

  // todo: почистить эту копипасту
  initStatOnly: function (player, vars) {
    VideoYoutube.destroy();

    var container = ge('video_yt');

    if (!player || !container) return;

    VideoYoutube.cur = {
      player: player,
      vars: vars || {},
      quality: 'auto',
      started: false,
      playing: false,
      buffering: false,
      mouseInside: true,
      lastMouseMove: null,
      reverseTime: window.localStorage ? localStorage.video_reverse_time == 'true' : false,
      isFS: false,
      minSize: false,
      liked: vars.liked,
      added: vars.added
    };

    player.addEventListener('onStateChange', VideoYoutube.onStateChangeStatOnly);
    addEvent(document, fullscreenApi.fullscreenEventName, VideoYoutube.onFullscreenChange);
    VideoYoutube.onResize();
    addEvent(window, 'resize', VideoYoutube.onResize);

    if (vars.autoplay) {
      // workaround for situation when playback started before YT API initialization and onStateChange event hasn't triggered
      (function checkState () {
        var player = VideoYoutube.cur.player;
        if (!player) return;
        if (player.getPlayerState && player.getPlayerState() != YT.PlayerState.UNSTARTED && !VideoYoutube.cur.started) {
          var fakeEvent = {data: player.getPlayerState()};
          VideoYoutube.onStateChange(fakeEvent);
        } else {
          setTimeout(checkState, 100);
        }
      })();
    }


  },

  getUIHtml: function () {
    var vars = VideoYoutube.cur.vars;
    var curTime = VideoYoutube.formatTime(0);
    var duration = VideoYoutube.formatTime(vars.duration);
    var fullscreenAvailable = fullscreenApi.supportsFullscreen;

    return '\
<div id="video_yt_ui" class="no_select">\
  <!--div id="video_yt_poster" style="background-image: url(' + vars.jpg + ')"></div-->\
\
  <div id="video_yt_mousetrap" onclick="VideoYoutube.togglePlay()" ondblclick="VideoYoutube.toggleFullscreen()" style="display:none"></div>\
\
  <div id="video_yt_actions" class="clear_fix hidden">\
    <div id="video_yt_like" class="fl_l video_yt_like ' + (vars.liked ? 'selected' : '') + '" onmouseover="VideoYoutube.onLikeOver(this)" onmouseout="VideoYoutube.onLikeOut(this)" onclick="VideoYoutube.onLikeClick(this)">\
      <span class="video_yt_like_icon video_yt_icon"></span>\
      <span class="video_yt_liked_icon video_yt_icon"></span>\
    </div>\
    <div id="video_yt_share" class="fl_l video_yt_share" onmouseover="VideoYoutube.onShareOver(this)" onmouseout="VideoYoutube.onShareOut(this)" onclick="VideoYoutube.onShareClick(this)">\
      <span class="video_yt_share_icon video_yt_icon"></span>\
    </div>\
    <div id="video_yt_add" class="fl_l video_yt_add ' + (vars.added ? 'selected' : '') + '" onmouseover="VideoYoutube.onAddOver(this)" onmouseout="VideoYoutube.onAddOut(this)" onclick="VideoYoutube.onAddClick(this, 1)" style="' + (!vars.can_add ? 'display:none' : '') + '">\
      <span class="video_yt_add_icon video_yt_icon"></span>\
      <span class="video_yt_added_icon video_yt_icon"></span>\
    </div>\
  </div>\
\
  <div id="video_yt_controls" class="hidden">\
    <table cellspacing="0" cellpadding="0" border="0" id="video_yt_controls_table">\
      <tr>\
        <td style="padding:0 14px 0 2px" id="video_yt_play_btn_td">\
          <div id="video_yt_play_btn" class="video_yt_icon" onclick="VideoYoutube.togglePlay()"></div>\
        </td>\
        <td style="padding-right:10px; display:none" id="video_yt_replay_btn_td">\
          <div id="video_yt_replay_btn" class="video_yt_icon" onclick="VideoYoutube.replayVideo()"></div>\
        </td>\
        <td style="padding-right:12px;' + (vars.show_next ? '' : 'display:none') + '">\
          <div id="video_yt_next_btn" class="video_yt_icon" onmouseover="VideoYoutube.onNextBtnOver(this)" onmouseout="VideoYoutube.onNextBtnOut(this)" onclick="VideoYoutube.nextVideo()"></div>\
        </td>\
        <td width="100%" style="padding:6px 0">\
          <div id="video_yt_progressbar" onmousemove="VideoYoutube.onProgressMove(event)" onmouseover="VideoYoutube.onProgressOver()" onmouseout="VideoYoutube.onProgressOut()" onmousedown="VideoYoutube.onProgressDragStart(event)">\
            <div class="video_yt_progressbar_bg"></div>\
            <div id="video_yt_progressbar_loaded"></div>\
            <div id="video_yt_progressbar_viewed">\
              <div class="video_yt_progressbar_slider"></div>\
            </div>\
          </div>\
        </td>\
        <td style="padding-left:14px" id="video_yt_time_td">\
          <div id="video_yt_time_label" class="video_yt_time_label ' + (VideoYoutube.cur.reverseTime ? 'video_yt_time_label_reversed' : '') + '" onclick="VideoYoutube.onTimeLabelClick(this)">\
            <span id="video_yt_time_current" class="video_yt_time_current">' + curTime + '</span>\
            <span id="video_yt_time_duration" class="video_yt_time_duration"> / ' + duration + '</span>\
          </div>\
        </td>\
        <td style="padding-left:16px">\
          <div class="volume_wrap" onmouseenter="VideoYoutube.onVolumeWrapOver()" onmouseleave="VideoYoutube.onVolumeWrapOut()">\
            <div id="video_yt_volumebar_dropdown" class="hidden"></div>\
            <div id="video_yt_volume_btn" class="video_yt_icon" onmouseover="VideoYoutube.onVolumeBtnOver(this)" onmouseout="VideoYoutube.onVolumeBtnOut(this)" onclick="VideoYoutube.onVolumeBtnClick(this)"></div>\
          </div>\
        </td>\
        <td style="padding:0 6px" id="video_yt_volumebar_td">\
          <div id="video_yt_volumebar" onmousedown="VideoYoutube.onVolumeDragStart(event)">\
            <div class="video_yt_volumebar_bg"></div>\
            <div id="video_yt_volumebar_filled">\
              <div class="video_yt_volumebar_slider"></div>\
            </div>\
          </div>\
        </td>\
        <td style="padding-left:9px;' + (vars.is_inline ? '' : 'display:none') + '">\
          <div id="video_yt_expand_btn" class="video_yt_icon" onmouseover="VideoYoutube.onExpandBtnOver(this)" onmouseout="VideoYoutube.onExpandBtnOut(this)" onclick="VideoYoutube.onExpandBtnClick(this)"></div>\
        </td>\
        <td style="padding-left:9px;' + (fullscreenAvailable ? '' : 'display:none') + '">\
          <div id="video_yt_fullscreen_btn" class="video_yt_icon" onmouseover="VideoYoutube.onFullScreenBtnOver(this)" onmouseout="VideoYoutube.onFullScreenBtnOut(this)" onclick="VideoYoutube.toggleFullscreen()"></div>\
        </td>\
        <td style="padding:0 9px 0 8px" id="video_yt_quality_td">\
          <div id="video_yt_quality_label" onmouseenter="VideoYoutube.onQualityLabelOver()" onmouseleave="VideoYoutube.onQualityLabelOut()">\
            <div id="video_yt_quality_dropdown" class="hidden"></div>\
            <span id="video_yt_quality_btn" onmouseover="VideoYoutube.onQualityBtnOver(this)" onmouseout="VideoYoutube.onQualityBtnOut(this)" onclick="VideoYoutube.toggleQualityDropdown()">\
              <span id="video_yt_quality_btn_value"></span>\
              <span id="video_yt_quality_btn_icon"></span>\
            </span>\
          </div>\
        </td>\
        <td style="padding-left:9px">\
          <div id="video_yt_logo_btn" onclick="VideoYoutube.onLogoClick()"></div>\
        </td>\
      </tr>\
    </table>\
  </div>\
\
  <div id="video_yt_popup" class="hidden" onclick="VideoYoutube.togglePlay()" ondblclick="VideoYoutube.toggleFullscreen()">\
    <div class="video_yt_popup_play video_yt_icon"></div>\
    <div class="video_yt_popup_title" style="' + (vars.no_title ? 'display:none' : '') + '">' + vars.title + '</div>\
    <a href="' + vars.author_href + '" target="_blank" onclick="event.stopPropagation()" class="video_yt_popup_author">' + vars.author_name + '</a>\
  </div>\
\
  <div id="video_yt_tip">\
    <div id="video_yt_tip_arrow"></div>\
    <div id="video_yt_tip_bk"></div>\
    <span id="video_yt_tip_text"></div>\
  </div>\
</div>\
    ';
  },

  getQualityItemsHtml: function(qualities) {
    var qualityItemsHtml = '';
    each(qualities, function(i, quality) {
      var qualityValue = VideoYoutube.qualityValues[quality];
      if (qualityValue < 240) return;

      var hdLabel;
      if (qualityValue >= 720 && qualityValue <= 1080) {
        hdLabel = 'hd';
      } else if (qualityValue == 1440) {
        hdLabel = '2k';
      } else if (qualityValue == 2160) {
        hdLabel = '4k';
      } else if (qualityValue == 4320) {
        hdLabel = '8k';
      }

      qualityItemsHtml += '\
<div class="video_yt_quality_item ' + (quality == 'auto' ? 'selected' : '') + '" onclick="VideoYoutube.setQuality(\'' + quality + '\', this)">\
  <span class="video_yt_quality_item_text">' + qualityValue + '</span>\
  ' + (hdLabel ? '<span class="video_yt_quality_item_' + hdLabel + '_label video_yt_icon"></span>' : '') + '\
</div>\
      ';
    });
    return qualityItemsHtml;
  },


  // player api methods

  togglePlay: function(playing) {
    var player = VideoYoutube.cur.player;
    if (!player) return;

    playing = playing != null ? playing : !VideoYoutube.cur.playing;
    if (playing) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
    toggleClass('video_yt_play_btn', 'playing', playing);
    toggleClass('video_yt_popup', 'hidden', playing);
    VideoYoutube.cur.playing = playing;
  },

  replayVideo: function() {
    VideoYoutube.cur.player.seekTo(0);
    VideoYoutube.cur.player.playVideo();
  },

  setQuality: function (res, btn) {
    VideoYoutube.cur.player.setPlaybackQuality(res);
    each(ge('video_yt_quality_dropdown').children, function(i, item) {
      if (item instanceof HTMLElement) {
        removeClass(item, 'selected');
      }
    });
    addClass(btn, 'selected')
    VideoYoutube.toggleQualityDropdown();
    if (res != 'auto') {
      VideoYoutube.updateQualityLabel(res);
    }
  },

  toggleMute: function() {
    var player = VideoYoutube.cur.player;
    var volume = player.getVolume()
    if (player.isMuted() || !volume) {
      player.unMute();
      if (volume) {
        if (window.localStorage) {
          localStorage.setItem('video_volume', volume);
        }
      } else {
        VideoYoutube.setVolume(60);
      }
    } else {
      player.mute();
      if (window.localStorage) {
        localStorage.setItem('video_volume', 0);
      }
    }
    setTimeout(VideoYoutube.updateVolume, 10);
  },

  setVolume: function(value) {
    var player = VideoYoutube.cur.player;

    if (player.isMuted()) {
      player.unMute();
    }
    player.setVolume(value);

    if (window.localStorage) {
      localStorage.setItem('video_volume', Math.round(value));
    }
  },

  toggleFullscreen: function() {
    if (VideoYoutube.cur.isFS) {
      fullscreenApi.exitFullscreen();
    } else {
      fullscreenApi.requestFullscreen(ge('video_yt'));
    }
  },

  nextVideo: function() {
    videoCallback(['onVideoNext']);
  },


  // player api events

  onPlayerReady: function() {
    if (window.localStorage) {
      var savedVolume = localStorage.getItem('video_volume');
      VideoYoutube.cur.player.setVolume(savedVolume || 60);
    }
    if (VideoYoutube.cur.vars.mute) {
      VideoYoutube.cur.player.mute();
    }
    videoCallback(['onInitialized']);
  },

  onStateChange: function(event) {
    if (event.data == YT.PlayerState.BUFFERING) {
      VideoYoutube.cur.buffering = true;
    } else {
      VideoYoutube.cur.state = event.data;
      VideoYoutube.cur.buffering = false;
      VideoYoutube.cur.playing = false;
    }

    switch (event.data) {
      case YT.PlayerState.UNSTARTED:
        break;
      case YT.PlayerState.ENDED:
        VideoYoutube.onVideoEnded();
        break;
      case YT.PlayerState.PLAYING:
        VideoYoutube.cur.playing = true;
        if (!VideoYoutube.cur.started) {
          VideoYoutube.onVideoStarted();
        }
        VideoYoutube.onVideoPlaying();
        break;
      case YT.PlayerState.PAUSED:
        VideoYoutube.onVideoPaused();
        break;
      case YT.PlayerState.BUFFERING:
        VideoYoutube.onVideoBuffering();
        break;
    }
  },

  onPlaybackQualityChange: function(event) {
    VideoYoutube.updateQualityLabel(event.data);
  },

  onError: function(event) {
    var videoUnavaiableErrors = [100, 101, 150];
    if (videoUnavaiableErrors.indexOf(event.data) != -1) {
      ajax.post('/al_video.php', {
        act: 'reparseDeletedYoutube',
        vid: VideoYoutube.cur.vars.vid,
        oid: VideoYoutube.cur.vars.oid
      });
    }
  },


  // playback events

  onVideoStarted: function() {
    var player = VideoYoutube.cur.player;
    var qualities = VideoYoutube.cur.player.getAvailableQualityLevels();
    var qualityDropdown = ge('video_yt_quality_dropdown');
    qualityDropdown.innerHTML = VideoYoutube.getQualityItemsHtml(qualities);
    VideoYoutube.updateQualityLabel(player.getPlaybackQuality());

    VideoYoutube.resizeTimeLabel();
    VideoYoutube.updateProgress();

    show('video_yt_mousetrap');
    hide('video_yt_replay_btn_td');
    show('video_yt_play_btn_td');
    removeClass('video_yt_controls', 'hidden');
    removeClass('video_yt_actions', 'hidden');
    VideoYoutube.progressLoopStart();
    VideoYoutube.cur.started = true;

    if (cur && cur.incViews) cur.incViews();
  },

  onStateChangeStatOnly: function (event) {
    if (event.data == YT.PlayerState.BUFFERING) {
      VideoYoutube.cur.buffering = true;
    } else {
      VideoYoutube.cur.state = event.data;
      VideoYoutube.cur.buffering = false;
      VideoYoutube.cur.playing = false;
    }

    switch (event.data) {
      case YT.PlayerState.ENDED:
        VideoYoutube.onVideoEndedStatOnly();
        break;
      case YT.PlayerState.PLAYING:
        if (!VideoYoutube.cur.started) {
          VideoYoutube.onVideoStartedStatOnly();
        }
        break;
    }
  },

  onVideoStartedStatOnly: function() {
    VideoYoutube.cur.started = true;
    if (cur && cur.incViews) cur.incViews();
  },


  onVideoEndedStatOnly: function() {
    VideoYoutube.cur.started = false;
  },


  onVideoPlaying: function() {
    addClass('video_yt_play_btn', 'playing');
    addClass('video_yt_popup', 'hidden');

    if (VideoYoutube.cur.isFS) {
      clearTimeout(VideoYoutube.cur.hideControlsTimeoutId);
      VideoYoutube.cur.hideControlsTimeoutId = setTimeout(VideoYoutube.onHideControlsTimer, 2000);
    } else if (!VideoYoutube.cur.mouseInside && !VideoYoutube.cur.progressDragging) {
      VideoYoutube.toggleControls(false);
    }
  },

  onVideoPaused: function() {
    removeClass('video_yt_play_btn', 'playing');
    VideoYoutube.toggleControls(true);
    removeClass('video_yt_popup', 'hidden');
  },

  onVideoEnded: function() {
    if (VideoYoutube.cur.isFS) {
      VideoYoutube.toggleFullscreen();
    };
    removeClass('video_yt_play_btn', 'playing');
    hide('video_yt_play_btn_td');
    show('video_yt_replay_btn_td');
    VideoYoutube.toggleControls(true);
    VideoYoutube.cur.started = false;
    VideoYoutube.progressLoopStop();
    if (VideoYoutube.cur.progressDragging) {
      VideoYoutube.onProgressDragEnd();
    }
    VideoYoutube.updateProgress();
  },

  onVideoBuffering: function() {

  },


  // controls methods

  progressLoopStart: function() {
    if (VideoYoutube.prIntervalId) return;

    VideoYoutube.prIntervalId = setInterval(function() {
      if (!ge('video_yt')) {
        // VideoYoutube.progressLoopStop();
        VideoYoutube.destroy();
        return;
      }
      VideoYoutube.updateProgress();
      VideoYoutube.updateVolume();
    }, 50);
  },

  progressLoopStop: function() {
    clearInterval(VideoYoutube.prIntervalId);
    VideoYoutube.prIntervalId = null;
  },


  updateProgress: function(newTime) {
    var player = VideoYoutube.cur.player;
    if (!player.getPlayerState) return;

    var curTime = player.getCurrentTime() || 0;
    var duration = player.getDuration() || VideoYoutube.cur.vars.duration;

    setStyle('video_yt_progressbar_loaded', {
      width: player.getVideoLoadedFraction() * 100 + '%'
    });

    if (VideoYoutube.cur.progressDragging || player.getPlayerState() == YT.PlayerState.BUFFERING) {
      if (!isNaN(newTime)) {
        curTime = newTime;
      } else {
        return;
      }
    }

    setStyle('video_yt_progressbar_viewed', {
      width: curTime / duration * 100 + '%'
    });

    var reverseTime = VideoYoutube.cur.minSize && VideoYoutube.cur.reverseTime;
    ge('video_yt_time_current').innerHTML = VideoYoutube.formatTime(reverseTime ? (duration - curTime) : curTime);
    ge('video_yt_time_duration').innerHTML = ' / ' + VideoYoutube.formatTime(duration);
  },

  updateVolume: function(newVolume) {
    var player = VideoYoutube.cur.player;

    if (!player || !player.getVolume) return;
    var volume = !isNaN(newVolume) ? newVolume : player.getVolume();
    var isMuted = player.isMuted();
    var isVertical = VideoYoutube.cur.minSize;

    setStyle('video_yt_volumebar_filled', {
      width: isVertical ? null : (isMuted ? 0 : volume) + '%',
      height: isVertical ? (isMuted ? 0 : volume) + '%' : null
    });

    var volBtn = ge('video_yt_volume_btn');
    if (volume == 0 || isMuted) {
      volBtn.setAttribute('mode', 'off');
    } else if (volume < 20) {
      volBtn.setAttribute('mode', 'min');
    } else if (volume < 50) {
      volBtn.setAttribute('mode', 'mid');
    } else {
      volBtn.setAttribute('mode', 'max');
    }
  },

  toggleQualityDropdown: function(doShow) {
    var dropdown = ge('video_yt_quality_dropdown');
    doShow = doShow != null ? doShow : hasClass(dropdown, 'hidden');
    toggleClass(dropdown, 'hidden', !doShow);
    if (doShow) {
      VideoYoutube.hideTip();
    }
  },

  showTip: function(text, x, y, downDirection) {
    var tip = ge('video_yt_tip');

    ge('video_yt_tip_text').innerHTML = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    var containerSize = getSize('video_yt');
    var controlsHeight = 36;
    var tipSize = getSize(tip);
    var arrowHeight = 4;

    var left, top, arrowLeft;
    if (x - tipSize[0] / 2 < 8) {
      left = 8;
      arrowLeft = x - left;
    } else if (x + tipSize[0] / 2 > containerSize[0] - 8) {
      left = containerSize[0] - tipSize[0] - 8;
      arrowLeft = x - left;
    } else {
      left = Math.round(x - tipSize[0] / 2);
    }

    if (downDirection) {
      top = Math.round(y + arrowHeight);
    } else {
      top = Math.round(y - tipSize[1] - arrowHeight);
    }
    toggleClass(tip, 'video_yt_tip_down', !!downDirection);

    setStyle(tip, {
      display: 'block',
      left: left + 'px',
      top: top + 'px',
    });

    setStyle('video_yt_tip_arrow', {
      left: arrowLeft || null
    });

    var bkHeight = containerSize[1] - controlsHeight - top;
    bkHeight = bkHeight > tipSize[1] ? 0 : bkHeight;
    setStyle('video_yt_tip_bk', {
      height: bkHeight
    });
  },

  hideTip: function() {
    hide('video_yt_tip');
  },

  toggleControls: function(doShow) {
    if (VideoYoutube.cur.progressDragging || VideoYoutube.cur.volumeDragging) return;
    if (!hasClass('video_yt_quality_dropdown', 'hidden')) return;
    if (doShow === true && !VideoYoutube.cur.started) return;
    if (doShow === false && !VideoYoutube.cur.playing) return;

    toggleClass('video_yt_controls', 'hidden', !doShow);
    toggleClass('video_yt_actions', 'hidden', !doShow);
    toggleClass('video_yt', 'no_cursor', !doShow);

    if (doShow === false) {
      VideoYoutube.hideTip();
    }
  },

  onResize: function() {
    var container = ge('video_yt');
    if (!container) return;

    var playerSize = getSize(container);
    VideoYoutube.cur.minSize = playerSize[0] < 400;
    toggleClass(container, 'video_yt_min', VideoYoutube.cur.minSize);

    // disabled due to default gui
/*    if (VideoYoutube.cur.minSize) {
      ge('video_yt_volumebar_dropdown').appendChild(ge('video_yt_volumebar'));
      hide('video_yt_volumebar_td');
    } else {
      ge('video_yt_volumebar_td').appendChild(ge('video_yt_volumebar'));
      show('video_yt_volumebar_td');
    }*/

    var controlsToHide = [ge('video_yt_quality_td'), ge('video_yt_time_td')];
    var controlsContainer = ge('video_yt_controls');
    var controlsTable = ge('video_yt_controls_table');
    var containerWidth = getSize(container)[0];

    show.apply(null, controlsToHide);

    each(controlsToHide, function(i, item) {
      if (getSize(controlsTable)[0] > containerWidth) {
        hide(item);
      } else {
        return false;
      }
    });

    // disabled due to default gui
    //VideoYoutube.resizeTimeLabel();
    //VideoYoutube.updateProgress();
    //VideoYoutube.updateVolume();
  },

  resizeTimeLabel: function() {
    var player = VideoYoutube.cur.player;
    var duration = player.getDuration ? player.getDuration() : VideoYoutube.cur.vars.duration;
    if (!duration) return;

    var durText = VideoYoutube.formatTime(duration);
    var timeLabel = ge('video_yt_time_label');
    setStyle(timeLabel, {width: null});
    ge('video_yt_time_current').innerHTML = durText;
    ge('video_yt_time_duration').innerHTML = '/ ' + durText;
    setStyle(timeLabel, {
      width: getSize(timeLabel)[0] + 'px'
    });
  },

  updateQualityLabel: function(quality) {
    var qualityValue = VideoYoutube.qualityValues[quality];
    VideoYoutube.cur.quality = quality;
    ge('video_yt_quality_btn_value').textContent = qualityValue;

    var icon = ge('video_yt_quality_btn_icon');
    icon.className = 'video_yt_icon video_yt_quality_btn_icon_' + qualityValue;
  },


  // controls events

  onNextBtnOver: function(btn) {
    var vars = VideoYoutube.cur.vars;
    var containerPos = getXY('video_yt');
    var btnPos = getXY(btn);

    var tipX = btnPos[0] - containerPos[0] + 9;
    var tipY = btnPos[1] - containerPos[1] - 4;
    VideoYoutube.showTip(vars.lang_next, tipX, tipY);
  },

  onNextBtnOut: function(btn) {
    VideoYoutube.hideTip();
  },

  onTimeLabelClick: function (timeLabel) {
    if (!VideoYoutube.cur.minSize) return;

    VideoYoutube.cur.reverseTime = !VideoYoutube.cur.reverseTime;
    toggleClass(timeLabel, 'video_yt_time_label_reversed', VideoYoutube.cur.reverseTime);
    VideoYoutube.updateProgress();

    if (window.localStorage) {
      localStorage.setItem('video_reverse_time', VideoYoutube.cur.reverseTime);
    }
  },

  onVolumeBtnOver: function(btn) {
    if (VideoYoutube.cur.minSize) return;

    var player = VideoYoutube.cur.player;
    var vars = VideoYoutube.cur.vars;
    var containerPos = getXY('video_yt');
    var btnPos = getXY(btn);

    var tipX = btnPos[0] - containerPos[0] + 9;
    var tipY = btnPos[1] - containerPos[1] - 4;
    var tipText = player.isMuted() || !player.getVolume() ? vars.lang_volume_on : vars.lang_volume_off;
    VideoYoutube.showTip(tipText, tipX, tipY);
  },

  onVolumeBtnOut: function(btn) {
    VideoYoutube.hideTip();
  },

  onVolumeWrapOver: function() {
    if (VideoYoutube.cur.minSize) {
      removeClass('video_yt_volumebar_dropdown', 'hidden');
    }
  },

  onVolumeWrapOut: function() {
    if (VideoYoutube.cur.minSize && !VideoYoutube.cur.volumeDragging) {
      addClass('video_yt_volumebar_dropdown', 'hidden');
    }
  },

  onVolumeBtnClick: function(btn) {
    VideoYoutube.toggleMute();
    setTimeout(VideoYoutube.onVolumeBtnOver.bind(null, btn), 10);
  },

  onExpandBtnOver: function(btn) {
    var vars = VideoYoutube.cur.vars;
    var containerPos = getXY('video_yt');
    var btnPos = getXY(btn);

    var tipX = btnPos[0] - containerPos[0] + 7;
    var tipY = btnPos[1] - containerPos[1] - 4;
    VideoYoutube.showTip(vars.lang_open_popup, tipX, tipY);
  },

  onExpandBtnOut: function(btn) {
    VideoYoutube.hideTip();
  },

  onExpandBtnClick: function(btn) {
    var vars = VideoYoutube.cur.vars;
    var videoRaw = vars.oid + '_' + vars.vid;
    var curTime = VideoYoutube.cur.player.getCurrentTime();
    videoCallback(['onOpenInPopup', videoRaw, vars.list_id, curTime]);
  },


  onFullScreenBtnOver: function(btn) {
    var vars = VideoYoutube.cur.vars;
    var containerPos = getXY('video_yt');
    var btnPos = getXY(btn);

    var tipX = btnPos[0] - containerPos[0] + 7;
    var tipY = btnPos[1] - containerPos[1] - 4;
    var tipText = VideoYoutube.cur.isFS ? vars.lang_window : vars.lang_fullscreen;
    VideoYoutube.showTip(tipText, tipX, tipY);
  },

  onFullScreenBtnOut: function(btn) {
    VideoYoutube.hideTip();
  },

  onQualityBtnOver: function(btn) {
    if (!hasClass('video_yt_quality_dropdown', 'hidden')) return;
    var containerPos = getXY('video_yt');
    var btnPos = getXY(btn);

    var tipX = btnPos[0] - containerPos[0] + getSize(btn)[0]/2;
    var tipY = btnPos[1] - containerPos[1] - 4;
    VideoYoutube.showTip(VideoYoutube.cur.vars.lang_hdsd, tipX, tipY);
  },

  onQualityBtnOut: function(btn) {
    VideoYoutube.hideTip();
  },

  onQualityLabelOver: function() {
    clearTimeout(VideoYoutube.cur.hideQualityDDTimer);
  },

  onQualityLabelOut: function() {
    VideoYoutube.cur.hideQualityDDTimer = setTimeout(function() {
      VideoYoutube.toggleQualityDropdown(false);
      if (VideoYoutube.cur.isFS && VideoYoutube.cur.state == YT.PlayerState.PLAYING && new Date().getTime() - VideoYoutube.cur.lastMouseMove > 2000) {
        VideoYoutube.toggleControls(false);
      }
    }, 3000);
  },

  onLogoClick: function() {
    var player = VideoYoutube.cur.player;
    var url = player.getVideoUrl();
    VideoYoutube.togglePlay(false);
    var win = window.open(url);
    win.opener = null;
  },

  onFullscreenChange: function() {
    var isFS = fullscreenApi.fullscreenElement() === ge('video_yt');
    VideoYoutube.cur.isFS = isFS;
    toggleClass('video_yt', 'video_yt_fullscreen', isFS);
    toggleClass('video_yt_fullscreen_btn', 'fullscreen', isFS);
    VideoYoutube.hideTip();
    VideoYoutube.onResize();

    videoCallback(['fullscreen', isFS]);
  },

  onProgressOver: function() {
    addClass('video_yt_progressbar', 'over');
  },

  onProgressOut: function() {
    removeClass('video_yt_progressbar', 'over');
    VideoYoutube.hideTip();
  },

  onProgressMove: function(event) {
    var player = VideoYoutube.cur.player;
    var duration = player ? player.getDuration() : VideoYoutube.cur.vars.duration;

    var progressbarSize = getSize('video_yt_progressbar');
    var progressbarPos = getXY('video_yt_progressbar');
    var containerPos = getXY('video_yt');
    var offsetX = VideoYoutube.cur.isFS ? -containerPos[0] : 0;
    var pos = (event.pageX - progressbarPos[0] - offsetX) / progressbarSize[0];
    pos = Math.max(0, Math.min(1, pos));

    var timeString = VideoYoutube.formatTime(duration * pos);
    var tipX = progressbarPos[0] - containerPos[0] + progressbarSize[0] * pos;
    var tipY = progressbarPos[1] - containerPos[1];
    VideoYoutube.showTip(timeString, tipX, tipY);
  },

  onProgressDragStart: function(event) {
    addEvent(document, 'mousemove', VideoYoutube.onProgressDrag);
    addEvent(document, 'mouseup', VideoYoutube.onProgressDragEnd);
    addClass('video_yt_progressbar', 'dragging');
    VideoYoutube.cur.progressDragging = true;
    VideoYoutube.onProgressDrag(event, true);
  },

  onProgressDrag: function(event, dontPrevent) {
    if (!dontPrevent) {
      cancelEvent(event);
    }
    var player = VideoYoutube.cur.player;
    var duration = player.getDuration();

    var progressbar = ge('video_yt_progressbar');
    if (browser.msie8) {
      var progressbarWidth = getSize(progressbar)[0];
      var progressbarX = getXY(progressbar)[0] - (VideoYoutube.cur.isFS ? getXY('video_yt')[0] : 0);
    } else {
      var boundingRect = progressbar.getBoundingClientRect();
      var progressbarWidth = boundingRect.width;
      var progressbarX = boundingRect.left;
    }

    var pos = (event.pageX - progressbarX) / progressbarWidth;
    pos = Math.max(0, Math.min(1, pos));

    var newTime = pos * duration;

    if (!hasClass(progressbar, 'over')) {
      VideoYoutube.onProgressMove(event);
    }

    VideoYoutube.cur.player.seekTo(newTime);
    VideoYoutube.updateProgress(newTime);
  },

  onProgressDragEnd: function(event) {
    removeEvent(document, 'mousemove', VideoYoutube.onProgressDrag);
    removeEvent(document, 'mouseup', VideoYoutube.onProgressDragEnd);
    VideoYoutube.cur.progressDragging = false;
    var progressbar = ge('video_yt_progressbar');
    removeClass(progressbar, 'dragging');
    if (!hasClass(progressbar, 'over')) {
      VideoYoutube.onProgressOut(event);
    }
  },

  onVolumeDragStart: function(event) {
    addEvent(document, 'mousemove', VideoYoutube.onVolumeDrag);
    addEvent(document, 'mouseup', VideoYoutube.onVolumeDragEnd);
    addClass('video_yt_volumebar', 'dragging');
    VideoYoutube.cur.volumeDragging = true;
    VideoYoutube.onVolumeDrag(event, true);
  },

  onVolumeDrag: function(event, dontPrevent) {
    if (!dontPrevent) {
      cancelEvent(event);
    }
    var player = VideoYoutube.cur.player;

    var isVertical = VideoYoutube.cur.minSize;

    if (browser.msie8) {
      var volumebarSize = getSize('video_yt_volumebar');
      var volumebarPos = getXY('video_yt_volumebar');
      var volumeRect = {
        left: volumebarPos[0] - scrollGetX(),
        top: volumebarPos[1] - scrollGetY(),
        width: volumebarSize[0],
        height: volumebarSize[1],
      };
    } else {
      var volumeRect = ge('video_yt_volumebar').getBoundingClientRect();
    }

    if (isVertical) {
      var pos = (volumeRect.height - (event.pageY - scrollGetY() - volumeRect.top)) / volumeRect.height;
    } else {
      var pos = (event.pageX - scrollGetX() - volumeRect.left) / volumeRect.width;
    }
    pos = Math.max(0, Math.min(1, pos));

    VideoYoutube.setVolume(pos * 100);

    VideoYoutube.updateVolume(pos * 100);

    if (!VideoYoutube.cur.minSize) {
      var containerRect = ge('video_yt').getBoundingClientRect();
      var tipX = volumeRect.left - containerRect.left + volumeRect.width * pos;
      var tipY = volumeRect.top - containerRect.top;
      VideoYoutube.showTip(Math.round(pos * 100) + '%', tipX, tipY);
    }
  },

  onVolumeDragEnd: function(event) {
    removeEvent(document, 'mousemove', VideoYoutube.onVolumeDrag);
    removeEvent(document, 'mouseup', VideoYoutube.onVolumeDragEnd);
    VideoYoutube.cur.volumeDragging = false;
    removeClass('video_yt_volumebar', 'dragging');
    VideoYoutube.hideTip();
    if (VideoYoutube.cur.minSize) {
      addClass('video_yt_volumebar_dropdown', 'hidden');
    }
  },

  onKeyDown: function(event) {
    var player = VideoYoutube.cur.player;
    var handled = true;

    var KEY_F = 70;
    var KEY_M = 77;

    switch (event.keyCode) {
      case KEY.SPACE:
        VideoYoutube.togglePlay();
        break;
      case KEY.UP:
        if (player.isMuted()) {
          player.unMute()
        } else {
          VideoYoutube.setVolume(player.getVolume() + 5);
        }
        break;
      case KEY.DOWN:
        VideoYoutube.setVolume(player.getVolume() - 5);
        break;
      case KEY.LEFT:
        player.seekTo(player.getCurrentTime() - 5);
        VideoYoutube.updateProgress(player.getCurrentTime() - 5);
        break;
      case KEY.RIGHT:
        player.seekTo(player.getCurrentTime() + 5);
        VideoYoutube.updateProgress(player.getCurrentTime() + 5);
        break;
      case KEY_F:
        VideoYoutube.toggleFullscreen();
        break;
      case KEY_M:
        VideoYoutube.toggleMute();
        break;
      default:
        handled = false;
    }
    if (handled) {
      cancelEvent(event);
      VideoYoutube.toggleControls(true);
      clearTimeout(VideoYoutube.cur.hideControlsTimeoutId);
      VideoYoutube.cur.hideControlsTimeoutId = setTimeout(VideoYoutube.onHideControlsTimer, 2000);
    }
  },

  onMouseEnter: function(event) {
    VideoYoutube.cur.mouseInside = true;
    if (VideoYoutube.cur.started) {
      VideoYoutube.toggleControls(true);
    }
  },

  onMouseLeave: function(event) {
    VideoYoutube.cur.mouseInside = false;
    if (VideoYoutube.cur.started) {
      VideoYoutube.toggleControls(false);
    }
  },

  onMouseMove: function(event) {
    clearTimeout(VideoYoutube.cur.hideControlsTimeoutId);
    VideoYoutube.cur.lastMouseMove = new Date().getTime();

    VideoYoutube.toggleControls(true);

    if (VideoYoutube.cur.isFS && VideoYoutube.cur.state == YT.PlayerState.PLAYING) {
      VideoYoutube.cur.hideControlsTimeoutId = setTimeout(VideoYoutube.onHideControlsTimer, 2000);
    }
  },

  onHideControlsTimer: function() {
    if (VideoYoutube.cur.isFS || !VideoYoutube.cur.mouseInside && VideoYoutube.cur.state == YT.PlayerState.PLAYING) {
      VideoYoutube.toggleControls(false);
    }
  },

  onLikeOver: function(btn) {
    var btnPos = getXY(btn);
    var btnSize = getSize(btn);
    var containerPos = getXY('video_yt');
    var vars = VideoYoutube.cur.vars;

    var tipX = btnPos[0] - containerPos[0] + btnSize[0] / 2;
    var tipY = btnPos[1] - containerPos[1] + btnSize[1] + 4;
    VideoYoutube.showTip(vars.lang_like, tipX, tipY, true);
  },

  onLikeOut: function(btn) {
    VideoYoutube.hideTip();
  },

  onLikeClick: function(btn) {
    videoCallback(['onLike']);
    VideoYoutube.onLiked();
  },

  onShareOver: function(btn) {
    var btnPos = getXY(btn);
    var btnSize = getSize(btn);
    var containerPos = getXY('video_yt');
    var vars = VideoYoutube.cur.vars;

    var tipX = btnPos[0] - containerPos[0] + btnSize[0] / 2;
    var tipY = btnPos[1] - containerPos[1] + btnSize[1] + 4;
    VideoYoutube.showTip(vars.lang_share, tipX, tipY, true);
  },

  onShareOut: function(btn) {
    VideoYoutube.hideTip();
  },

  onShareClick: function(btn) {
    if (VideoYoutube.cur.isFS) {
      VideoYoutube.toggleFullscreen();
    }
    videoCallback(['onShare']);
  },

  onAddOver: function(btn) {
    var btnPos = getXY(btn);
    var btnSize = getSize(btn);
    var containerPos = getXY('video_yt');
    var vars = VideoYoutube.cur.vars;

    var tipX = btnPos[0] - containerPos[0] + btnSize[0] / 2;
    var tipY = btnPos[1] - containerPos[1] + btnSize[1] + 4;
    var tipText = VideoYoutube.cur.added ? vars.lang_added : vars.lang_add;
    VideoYoutube.showTip(tipText, tipX, tipY, true);
  },

  onAddOut: function(btn) {
    VideoYoutube.hideTip();
  },

  onAddClick: function(btn, actionsType) {
    if (VideoYoutube.cur.added) {
      videoCallback(['onRemove']);
    } else {
      var vars = VideoYoutube.cur.vars;
      var rawId = vars.oid + '_' + vars.vid;
      videoCallback(['onAdd', rawId, VideoYoutube.cur.vars.add_hash, actionsType]);
    }
    VideoYoutube.onAdded();
    VideoYoutube.onAddOver(btn);
  },

  onLiked: function() {
    VideoYoutube.cur.liked = !VideoYoutube.cur.liked;
    toggleClass('video_yt_like', 'selected', VideoYoutube.cur.liked);
  },

  onAdded: function() {
    VideoYoutube.cur.added = !VideoYoutube.cur.added;
    toggleClass('video_yt_add', 'selected', VideoYoutube.cur.added);
  },


  // utils

  formatTime: function(sec) {
    sec = parseInt(sec) || 0;
    var s, m, h;
    s = parseInt(sec);
    m = parseInt(s / 60); s %= 60;
    h = parseInt(m / 60); m %= 60;
    return (h > 0 ? h + ':' + addZero(m) : m) + ':' + addZero(s);

    function addZero(s) {
      s = intval(s);
      return (s < 10) ? '0' + s : s;
    }
  },

  destroy: function() {
    VideoYoutube.progressLoopStop();
    if (VideoYoutube.cur.player && VideoYoutube.cur.player.destroy) {
      VideoYoutube.cur.player.destroy();
    }
    VideoYoutube.cur = {};

    var container = ge('video_yt');
    if (container) {
      removeEvent(container, 'mouseenter', VideoYoutube.onMouseEnter);
      removeEvent(container, 'mouseleave', VideoYoutube.onMouseLeave);
      removeEvent(container, 'mousemove', VideoYoutube.onMouseMove);
      removeEvent(container, 'keydown', VideoYoutube.onKeyDown);
    }
    removeEvent(document, fullscreenApi.fullscreenEventName, VideoYoutube.onFullscreenChange);
    removeEvent(window, 'resize', VideoYoutube.onResize);
  }
};

(function() {
  if (window.fullscreenApi) return;

  var fullscreenApi = {
    supportsFullscreen: false,
    isFullscreen: function() { return false; },
    fullscreenElement: function() { return null; },
    requestFullscreen: function() {},
    exitFullscreen: function() {},
    fullscreenEventName: '',
    prefix: ''
  };
  var browserPrefixes = 'webkit moz ms'.split(' ');

  if (document.fullscreenEnabled) {
    fullscreenApi.supportsFullscreen = true;
  } else {
    each(browserPrefixes, function(i, prefix) {
      if (document[prefix + 'FullscreenEnabled'] || document[prefix + 'FullScreenEnabled']) {
        fullscreenApi.supportsFullscreen = true;
        fullscreenApi.prefix = prefix;
        return false;
      }
    });
  }

  if (fullscreenApi.supportsFullscreen) {
    fullscreenApi.fullscreenEventName = fullscreenApi.prefix + 'fullscreenchange';

    fullscreenApi.isFullscreen = function() {
      switch (this.prefix) {
        case '':
          return document.fullscreen;
        case 'webkit':
          return document.webkitIsFullScreen;
        default:
          return document[this.prefix + 'Fullscreen'] || document[this.prefix + 'FullScreen'];
      }
    }
    fullscreenApi.fullscreenElement = function() {
      return (this.prefix === '') ? document.fullscreenElement : document[this.prefix + 'FullscreenElement'] || document[this.prefix + 'FullScreenElement'];
    },
    fullscreenApi.requestFullscreen = function(el) {
      return (this.prefix === '') ? el.requestFullscreen() : (el[this.prefix + 'RequestFullscreen'] || el[this.prefix + 'RequestFullScreen']).call(el);
    }
    fullscreenApi.exitFullscreen = function() {
      return (this.prefix === '') ? document.exitFullscreen() : (document[this.prefix + 'ExitFullscreen'] || document[this.prefix + 'CancelFullScreen']).call(document);
    }
  }

  window.fullscreenApi = fullscreenApi;
})();

try{stManager.done('video_youtube.js');}catch(e){}
