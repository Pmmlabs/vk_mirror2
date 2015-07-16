var html5video = {
  volLineW: 50,
  volStep: 0.05,
  prStep: 7,
  minPrW: 78,
  volume: 0.65,
  lastVolume: 0.65,
  liked: false,
  added: false,
  fixed_player_size: false,
  actionsW: 39,
  cur_res: -1,
  inside: 0,
  moveState: 0,
  notLoaded: 1,
  videoFinished: false,
  nextTimerStopped: false,

  initHTML5Video: function(vars, fixedWidth, fixedHeight) {
    html5video.removeListeners();
    addEvent(document, 'mouseup', html5video.docMouseUp);
    addEvent(document, 'mousemove', html5video.docMouseMove);
    addEvent(document, browser.opera ? 'keypress' : 'keydown', html5video.docKeyPressed);
    addEvent(window, 'resize', html5video.onResize);

    html5video.angle = (vars.angle || 0) * 90;
    html5video.volume = html5video.lastVolume = 0.65;
    html5video.cur_res = -1;
    html5video.fixed_player_size = false;
    html5video.actionsW = 39;
    html5video.inside = 0;
    html5video.moveState = 0;
    html5video.notLoaded = 1;
    html5video.videoClicked = false;
    html5video.streamPlaying = false;
    html5video.incViewSent = false;
    if (this.incViewTimer) {
      this.incViewTimer.pause();
      delete this.incViewTimer;
    }
    if (this.incSmallViewTimer) {
      this.incSmallViewTimer.pause();
      delete this.incSmallViewTimer;
    }
    var cacheData = {};
    window.mvcur = window.mvcur || {};
    mvcur.mvData = mvcur.mvData || {};
    if (vars.no_flv) {
      each([240, 360, 480, 720, 1080], function() {
        if (vars['cache'+this]) {
          cacheData[this] = vars['cache'+this];
          delete vars['cache'+this];
        }
      });
    }
    html5video.liked = vars.liked;
    html5video.added = vars.added;
    vars.cacheData = cacheData;
    html5video.vars = vars;
    if (fixedWidth) {
      html5video.fixed_player_size = true;
      html5video.fixedWidth = intval(fixedWidth);
      html5video.fixedHeight = intval(fixedHeight);
    }

    ge(video_box_id).innerHTML = html5video.htmlCode();
    ge(video_box_id).style.padding = '0px';

    var actsEl = ge('video_actions'), is_ext = intval(vars.is_ext);
    if (!is_ext && !vars.nolikes && !vars.min_controls) {
      ge('popup_actions').appendChild(se('<div id="vid_like" class="vid_like fl_l ' + (vars.liked?'selected':'') + '" onclick="html5video.onLike(1)"><div id="vid_like_bg" class="vid_like_bg"></div><div id="vid_like_fg" class="vid_like_fg"></div><div id="vid_liked_fg" class="vid_liked_fg"></div></div>'));
      if (!vars.ads_link) {
        ge('popup_actions').appendChild(se('<div id="vid_share" class="vid_share fl_l" onclick="html5video.onShare(1)"><div id="vid_share_bg" class="vid_share_bg"></div><div id="vid_share_fg" class="vid_share_fg"></div></div>'));
      }
      if (vars.viewer_id !== vars.oid && vars.can_add) {
        ge('popup_actions').appendChild(se('<div id="vid_add" class="vid_add fl_l ' + (vars.added?'selected':'') + '" onclick="html5video.onAdd(1)"><div id="vid_add_bg" class="vid_add_bg"></div><div id="vid_add_fg" class="vid_add_fg"></div><div id="vid_added_fg" class="vid_added_fg"></div></div>'));
      }
    }
    if (vars.show_next) {
      setStyle(ge('next_button').parentNode, {display: null});
    }
    if (!is_ext && vars.ads_link) {
      ge('popup_actions').appendChild(se('<div id="vid_link" class="vid_link fl_r" onmouseover="html5video.linkOver()" onmouseout="html5video.linkOut()" onclick="html5video.linkClick()"><div id="vid_link_bg" class="vid_link_bg"></div><div id="vid_link_content"><div id="vid_link_fg" class="vid_link_fg"></div><div id="vid_link_text">' + (vars.lang_ads_link || 'Advertiser\'s Site') + '</div></div></div>'));
      var w = getSize(ge('vid_link_text'))[0];
      setStyle(ge('vid_link_bg'), {width: w + 48});
      setStyle(ge('vid_link'), {width: w + 48});
    }
    if (false && vars.can_rotate && this.transformAvailable()) {
      actsEl.insertBefore(se('<div id="rotate_btn" class="rotate_button fl_l" onmouseover="html5video.rotateOver(this, event)" onmouseout="html5video.rotateOut(this, event)" onclick="html5video.rotateVideo()"></div>'), ge('quality_btn'));
      html5video.actionsW += 34;
    }
    if (vars.is_inline) {
      actsEl.insertBefore(se('<div id="popup_btn" class="popup_button fl_l" onmouseover="html5video.openPopupOver(this, event)" onmouseout="html5video.openPopupOut(this, event)" onmouseout="" onclick="html5video.openVideoPopup()"></div>'), ge('quality_btn'));
      html5video.actionsW += 28;
    }
    if (fullScreenApi.supportsFullScreen) {
      actsEl.insertBefore(se('<div id="fullscreen_btn" class="fullscreen_button fl_l" onmouseover="html5video.fullscreenOver(this, event)" onmouseout="html5video.fullscreenOut(this, event)" onclick="html5video.toggleFullscreen()"></div>'), ge('quality_btn'));
      if (fullScreenApi.fullScreenEventName == 'mozfullscreenchange') {
        addEvent(document, fullScreenApi.fullScreenEventName, html5video.updateFullscreen);
        cur.destroy.push(function() {
          removeEvent(document, fullScreenApi.fullScreenEventName, html5video.updateFullscreen);
        });
      } else {
        addEvent(ge('html5_player'), fullScreenApi.fullScreenEventName, html5video.updateFullscreen);
      }
      addEvent(ge('video_cont'), 'dblclick', html5video.toggleFullscreen);
      html5video.actionsW += 25;
    }
    if (!vars.nologo) {
      actsEl.appendChild(se('<div id="logo_btn" class="logo ' + (vars.is_vk ? 'vk ' : '') +  'fl_l" onmouseover="html5video.logoOver(this, event)" onmouseout="html5video.logoOut(this, event)" onclick="html5video.logoClick()"></div>'), ge('quality_btn'));
      html5video.actionsW += 35;
    }
    html5video.noQualityBtn = !vars.vtag || !vars.hd;
    if (html5video.noQualityBtn) {
      hide('quality_btn');
      html5video.actionsW -= 39;
    }
    html5video.maxActionsW = html5video.actionsW;

    setStyle(actsEl, {minWidth: html5video.actionsW});

    if (vars.min_controls) {
      hide(actsEl.parentNode);
      html5video.volume = 0;
    }

    ge('the_video').removeAttribute('controls', '');
    show('menu_bk', 'menu_controls')
    html5video.updVol();
    ge('video_title').innerHTML = decodeURIComponent(html5video.vars.md_title || '').replace(/\+/g, ' ');
    ge('video_author').innerHTML = decodeURIComponent(html5video.vars.md_author || '').replace(/\+/g, ' ');
    ge('video_author').href = decodeURIComponent(html5video.vars.author_href || '')

    html5video.initVideoLinks();
    html5video.addVideoListeners();
    var pl = ge('html5_player');
    addEvent(pl, 'mouseover', html5video.showMenu);
    addEvent(pl, 'mouseout', html5video.hideMenu);
    addEvent(pl, fullScreenApi.fullScreenEventName, html5video.onResize);
    if (html5video.fixed_player_size) {
      setStyle(pl.parentNode, {width: html5video.fixedWidth, height: html5video.fixedHeight});
    } else {
      setStyle(pl.parentNode, {width:'100%',height:'100%'});
    }
    html5video.timeLabelW = getSize('time_label')[0];
    setStyle('time_label', {
      width: html5video.timeLabelW + 'px'
    });
    html5video.centerPopup();
    html5video.updateActions();

    if (vars.thumb) {
      ge('the_video').parentNode.insertBefore(ce('img', {src: vars.thumb, id: 'video_thumb'}, {height: getSize(ge('html5_player'))[1], width: 'auto', margin: 'auto'}), ge('the_video'));
      hide('the_video');
    }
    html5video.updateRotation();
    // var transition = {
    //   webkitTransition: 'all 200ms ease-in-out',
    //   msTransition: 'all 200ms ease-in-out',
    //   transition: 'all 200ms ease-in-out'
    // };
    // setStyle(ge('the_video'), transition);
    // setStyle(ge('rotate_btn'), transition);

    // if (vars.thumb) {
    //   setTimeout(setStyle.pbind(ge('video_thumb'), {
    //     webkitTransition: 'all 200ms ease-in-out',
    //     msTransition: 'all 200ms ease-in-out',
    //     transition: 'all 200ms ease-in-out'
    //   }), 200);
    // }

    if (vars.timeline_thumbs) {
      var spritesheets = '';
      each(vars.timeline_thumbs_jpg.split(','), function(i) {
        spritesheets += '<img id="video_preview_tip_img_' + i + '" src="' + decodeURIComponent(this) + '" class="video_preview_tip_img">';
      });
      ge('menu_controls').appendChild(se('<div id="video_preview_tip"><div id="video_preview_tip_img_wrap">' + spritesheets + '</div><div id="video_preview_tip_text"></div><div id="video_preview_tip_arrow"></div></div>'));
    }

    html5video.onResize();

    setInterval(function(){
      if (html5video.moveState != 1) {
        html5video.updTime();
        html5video.addViewTimer();
      }
    }, 100);
    if (vars.autoplay || html5video.timeFromStr(vars.t)) {
      html5video.playVideo();
    }

    Videoview.updatePlaylistBoxPosition();
  },

  initVideoLinks: function() {
    var linksCount = 0;
    if (this.vars.no_flv) {
      show('button240');
      this.max_res = 240;
      linksCount++;
    } else {
      re('button240');
    }
    if (this.vars.hd >= 1) {
      show('button360');
      this.max_res = 360;
      linksCount++;
    } else {
      re('button360');
    }
    if (this.vars.hd >= 2) {
      show('button480');
      this.max_res = 480;
      linksCount++;
    } else {
      re('button480');
    }
    if (this.vars.hd >= 3) {
      show('button720');
      this.max_res = 720;
      linksCount++;
    } else {
      re('button720');
    }
    if (this.vars.hd >= 4) {
      show('button1080');
      this.max_res = 1080;
      linksCount++;
    } else {
      re('button1080');
    }
    setStyle(ge('quality_panel_wrap'), {top: -4 - linksCount * 22});
    setStyle(ge('quality_bk'), {height: linksCount * 22 - 5});
    var initQuality = Math.min(this.max_res, intval(getCookie('video_quality') || 360));
    var playFrom = this.timeFromStr(this.vars.t);

    this.changeQuality(initQuality, false, playFrom);
  },

  addVideoListeners: function() {
    var video = ge('the_video');
    video.volume = html5video.volume;

    addEvent(ge('video_cont'), 'mousewheel', html5video.docScroll);
    addEvent(video, 'loadstart', html5video.onLoadStart);
    addEvent(video, 'progress', html5video.onProgress);
    addEvent(video, 'seeking', html5video.onSeeking);
    addEvent(video, 'seeked', html5video.onSeeked);
    addEvent(video, 'canplay', html5video.onCanPlay);
    addEvent(video, 'play', html5video.onPlay);
    addEvent(video, 'pause', html5video.onPause);
    addEvent(video, 'error', html5video.onErr);
    addEvent(video, 'durationchange', html5video.onDurationChange);
    addEvent(video, 'ended', html5video.onEnded);
  },

  pathToHD: function(res) {
    var vars = html5video.vars, host;
    if (vars.cacheData[res]) {
      return vars.cacheData[res];
    }
    if (!vars.vtag && vars['extra_data']) {
      return vars['extra_data'];
    }

    if (vars['url'+res]) {
        return vars['url'+res];
    }

    if (typeof(vars.host) == 'string' && vars.host.substr(0, 4) == 'http') {
      host = vars.host;
    } else if (vars.proxy) {
      host = (vars.https ? 'https://' : 'http://') + vars.proxy + '.vk.me/c' + vars.host + '/';
    } else {
      host = 'http://cs' + vars.host + '.' + locDomain + '/';
    }

    if (vars.ip_subm) {
      return host + 'u' + vars.uid + '/videos/' + vars.vtag + '.' + res + '.mp4';
    }
    return host + 'u' + vars.uid + '/video/' + vars.vtag + '.' + res + '.mp4';
  },

  changeQuality: function(res, force, playFrom) {
    if (res == html5video.cur_res) return;
    html5video.cur_res = res;
    html5video.onPause();
    ge('quality_val').innerHTML = res;
    toggle('quality_val_hd', res > 480);
    toggle('quality_val_arrow', res < 720);
    each(geByTag('button', ge('quality_panel')), function() {
      removeClass(this, 'selected');
    });
    var b = ge('button' + res);
    if (b) {
      addClass(b, 'selected');
    }
    toggleClass(ge('popup1'), 'show_hd', html5video.max_res > 480 && html5video.cur_res < 720);
    var video = ge('the_video');
    html5video.changeQualityTime = video.currentTime;
    video.pause();
    if (html5video.incViewTimer) {
      html5video.incViewTimer.pause();
    }
    if (html5video.incSmallViewTimer) {
      html5video.incSmallViewTimer.pause();
    }
    if (video.currentTime) {
      hide('popup1');
      html5video.showLoading();
    }
    animate(ge('menu_layer'), {bottom: 36}, 200);
    removeClass('popup_actions', 'hidden');
    removeClass(video, 'no_cursor');
    video.src = html5video.pathToHD(res) + (playFrom > 0 && playFrom < html5video.vars.duration ? '#t=' + playFrom : '');
    if (this.videoClicked) {
      video.load();
    }
    var vars = html5video.vars, resInt = 0;
    if (window.videoCallback && vars.oid && vars.vid && vars.hash) {
      switch (res) {
        case 1080: resInt = 4; break;
        case 720: resInt = 3; break;
        case 480: resInt = 2; break;
        case 360: resInt = 1; break;
        case 240:
        default: resInt = 0; break;
      }
      videoCallback(['onVideoResolutionChanged', vars.oid, vars.vid, vars.hash, resInt]);
    }
    html5video.playStarted = false;
    if (force) {
      setCookie('video_quality', res, 365);
    }
  },

  onResize: function() {
    if (!ge('the_video')) return;
    var minSize = html5video.minSize = getSize('bg')[0] < 500;
    html5video.centerPopup();
    addClass('popup_actions', 'no-transition');
    toggleClass('popup_actions', 'popup_actions_min', minSize);
    toggleClass('time_label', 'time_label_min', minSize);
    setStyle('time_label', {
      width: minSize ? Math.round((html5video.timeLabelW-11) / 2) : html5video.timeLabelW
    });
    if (minSize) {
      ge('volume_dropdown').appendChild(ge('vid_vol'));
      hide('vid_vol_cell');
    } else {
      ge('vid_vol_cell').appendChild(ge('vid_vol'));
      show('vid_vol_cell');
    }
    html5video.calcPrLineW();
    html5video.updateActions();
    if (ge('video_thumb')) {
      setStyle(ge('video_thumb'), {height: getSize(ge('html5_player'))[1]});
    }
    if (html5video.videoFinished && ge('vid_finish_layer')) {
      html5video.resizeFinishScreen();
    }
    setTimeout(function() {
      removeClass('popup_actions', 'no-transition');
    }, 0);
  },

  playVideo: function(forceStatus) {
    var video = ge('the_video'), vars = this.vars;
    if (!video || forceStatus === true && !video.paused || forceStatus === false && video.paused) {
      return;
    }
    re('video_thumb');
    show(video);
    if (!this.videoClicked) {
      video.load();
      this.videoClicked = true;
    }
    if (this.videoFinished) {
      html5video.videoFinished = false;
      re(ge('vid_finish_layer'));
      html5video.nextTimerReset();
      html5video.nextTimerStopped = false;
      html5video.showMenu();
      hide(ge('replay_button').parentNode);
      show(ge('play_button').parentNode);
    }
    this.addViewTimer();
    if (video.paused) {
      video.play();
      if (this.incViewTimer) {
        this.incViewTimer.resume();
      }
      if (this.incSmallViewTimer) {
        this.incSmallViewTimer.resume();
      }
      if (window.videoCallback) {
        // this.streamPlaying = true;
        videoCallback(['onVideoStreamPlaying', vars.oid, vars.vid, vars.hash]);
      }
    } else {
      video.pause();
      if (this.incViewTimer) {
        this.incViewTimer.pause();
      }
      if (this.incSmallViewTimer) {
        this.incSmallViewTimer.pause();
      }
    }
  },

  nextVideo: function(vid, isTimer, byTimeout) {
    html5video.nextTimerReset();
    videoCallback(['onVideoNext', vid, isTimer, byTimeout]);
  },

  isMinimized: function() {
    return !!(window.mvcur && mvcur.minimized);
  },

  showFinishLayer: function() {
    var vars = html5video.vars;
    var html = '\
      <div class="vid_finish_layer_bk" onclick="html5video.onFinishLayerClick()"></div>\
      <div id="vid_finish_title" class="vid_finish_title">' + vars.md_title + '</div>\
      <div id="vid_finish_actions" class="vid_finish_actions clear_fix">\
        <div id="vid_finish_like" class="vid_finish_like fl_l ' + (html5video.liked?'selected':'') + '" onclick="html5video.onLike(2)"><div id="vid_finish_like_bg" class="vid_finish_like_bg"></div><div id="vid_finish_like_fg" class="vid_finish_like_fg"></div><div id="vid_finish_liked_fg" class="vid_finish_liked_fg"></div></div>\
        <div id="vid_finish_share" class="vid_finish_share fl_l" onclick="html5video.onShare(2)"><div id="vid_finish_share_bg" class="vid_finish_share_bg"></div><div id="vid_finish_share_fg" class="vid_finish_share_fg"></div></div>\
        ' + (vars.viewer_id !== vars.oid && vars.can_add ? '<div id="vid_finish_add" class="vid_finish_add fl_l ' + (html5video.added?'selected':'') + '" onclick="html5video.onAdd(2)"><div id="vid_finish_add_bg" class="vid_finish_add_bg"></div><div id="vid_finish_add_fg" class="vid_finish_add_fg"></div><div id="vid_finish_added_fg" class="vid_finish_added_fg"></div></div>' : '') + '\
      </div>\
      <div>\
        <div id="vid_finish_content" class="vid_finish_content"></div>\
      </div>';
    var layer = ce('div', {
      id: 'vid_finish_layer',
      className: 'vid_finish_layer'
    });
    layer.innerHTML = html;

    hide(ge('popup1'));

    ge('html5_player').insertBefore(layer, ge('menu_layer'));

    html5video.resizeFinishScreen();
  },

  showFinishExtendedLayer: function() {
    var vars = html5video.vars;
    var canAdd = vars.viewer_id !== vars.oid && vars.can_add;

    var html = '\
      <div class="vid_finish_layer_bk" onclick="html5video.onFinishLayerClick()"></div>\
      <div id="vid_finish_title" class="vid_finish_title">' + vars.md_title + '</div>\
      <div id="vid_finish_actions" class="vid_finish_actions vid_finish_extended_actions clear_fix">\
        <div id="vid_finish_like" class="vid_finish_like vid_finish_extended_like fl_l ' + (html5video.liked?'selected':'') + '"' + (!canAdd?' style="width:230px"':'') + ' onclick="html5video.onLike(3)"><div id="vid_finish_like_bg" class="vid_finish_like_bg"></div><div id="vid_finish_like_fg" class="vid_finish_like_fg"></div><div id="vid_finish_liked_fg" class="vid_finish_liked_fg"></div><div id="vid_finish_like_text" class="vid_finish_like_text">' + vars.lang_like + '</div></div>\
        ' + (canAdd ? '<div id="vid_finish_add" class="vid_finish_add vid_finish_extended_add fl_l ' + (html5video.added?'selected':'') + '" onclick="html5video.onAdd(3)"><div id="vid_finish_add_bg" class="vid_finish_add_bg"></div><div id="vid_finish_add_fg" class="vid_finish_add_fg"></div><div id="vid_finish_added_fg" class="vid_finish_added_fg"></div></div>' : '') + '\
        <div id="vid_finish_share" class="vid_finish_share vid_finish_extended_share fl_l" onclick="html5video.onShare(3)"><div id="vid_finish_share_bg" class="vid_finish_share_bg"></div><div id="vid_finish_share_fg" class="vid_finish_share_fg"></div><div id="vid_finish_share_text" class="vid_finish_share_text">' + vars.lang_share + '</div></div>\
      </div>\
      <div>\
        <div id="vid_finish_content" class="vid_finish_content"></div>\
      </div>';
    var layer = ce('div', {
      id: 'vid_finish_layer',
      className: 'vid_finish_layer vid_finish_layer_extended'
    });
    layer.innerHTML = html;

    hide(ge('popup1'));

    ge('html5_player').insertBefore(layer, ge('menu_layer'));

    html5video.resizeFinishScreen();
  },

  showNextVideoLayer: function() {
    var vars = html5video.vars,
        nextVideoData = html5video.nextVideosData[0];

    html5video.showFinishLayer();

    var contentHtml = '\
      <div id="vid_next_video" class="vid_next_video" onmouseover="html5video.nextThumbOver()" onmouseout="html5video.nextThumbOut()" onclick="html5video.nextVideo(\'' + nextVideoData.vid + '\', true, false)">\
        <div class="vid_next_video_caption">' + vars.lang_next + '</div>\
        <div class="vid_next_video_thumb" style="background-image: url(' + nextVideoData.thumb + ')"></div>\
        <div class="vid_next_video_thumb_darken"></div>\
        <div id="vid_next_video_timer" class="vid_next_video_timer">\
          <canvas id="vid_next_video_timer_canvas" class="vid_next_video_timer_canvas" width="100" height="100"></canvas>\
          <div class="vid_next_video_play"></div>\
        </div>\
        <div class="vid_next_video_info">\
          <div class="vid_next_video_title">' + nextVideoData.title + '</div>\
          <div class="vid_next_video_views">' + nextVideoData.views + '</div>\
        </div>\
        <div class="vid_next_video_cancel" onclick="html5video.nextCancel(event)"></div>\
      </div>';

    ge('vid_finish_content').innerHTML = contentHtml;

    html5video.resizeFinishScreen();

    if (!html5video.nextTimerStopped) {
      html5video.nextTimerStart();
    }
  },

  showSuggestionsLayer: function() {
    var vars = html5video.vars,
        nextVideoData = html5video.nextVideosData[0]
        contentHtml = '';

    html5video.showFinishLayer();

    contentHtml += '<div id="vid_suggestions" class="vid_suggestions hidden clear_fix">';
    each(html5video.nextVideosData, function() {
      contentHtml += '\
        <div class="vid_suggestions_item fl_l" onclick="html5video.nextVideo(\'' + this.vid + '\')">\
          <div class="vid_suggestions_item_thumb" style="background-image:url(' + this.thumb + ')"></div>\
          <div class="vid_suggestions_item_title">' + this.title + '</div>\
          <div class="vid_suggestions_item_views">' + this.views + '</div>\
        </div>';
    });
    contentHtml += '</div>';

    ge('vid_finish_content').innerHTML = contentHtml;

    html5video.resizeFinishScreen();

    setTimeout(function () {
      removeClass(ge('vid_suggestions'), 'hidden');
    }, 0);

  },

  onFinishLayerClick: function(e) {
    html5video.playVideo(true);
  },

  resizeFinishScreen: function() {
    console.info('resizeFinishScreen');
    var finishLayer = ge('vid_finish_layer'),
        playerSize = getSize(ge('bg'));

    if (!finishLayer) return;

    if (
      ge('vid_next_video') && (playerSize[0] < 400 || playerSize[1] < 300)
      || ge('vid_suggestions') && (playerSize[0] < 580 || playerSize[1] < 300)
      || hasClass(finishLayer, 'vid_finish_layer_extended') && (playerSize[0] < 250 || playerSize[1] < 200)
    ) {
      html5video.nextTimerReset();
      re(finishLayer);
      html5video.showFinishLayer();
      return;
    }

    setStyle('vid_finish_title', {
      display: html5video.isMinimized() ? 'none' : null
    });

    var actions = ge('vid_finish_actions'),
        content = ge('vid_finish_content'),
        actionsSize = getSize(actions),
        contentSize = getSize(content);

    if (content && contentSize[0] && contentSize[1]) {
      setStyle(actions, {
        left: playerSize[0] / 2 - actionsSize[0] / 2 + 'px',
        top: playerSize[1] / 2 - 110 + 'px'
      });
      setStyle(content, {
        left: playerSize[0] / 2 - contentSize[0] / 2 + 'px',
        top: playerSize[1] / 2 - 25 + 'px'
      });
    } else {
      setStyle(actions, {
        left: playerSize[0] / 2 - actionsSize[0] / 2 + 'px',
        top: playerSize[1] / 2 - actionsSize[1] / 2 - 10 + 'px'
      });
    }

    // setTimeout(html5video.resizeFinishScreen, 10);
  },

  nextThumbOver: function() {},

  nextThumbOut: function() {},

  nextCancel: function(event) {
    event.stopPropagation();
    html5video.nextTimerReset();
    re(ge('vid_finish_layer'));
    html5video.showSuggestionsLayer();
  },

  nextTimerStart: function() {
    html5video.nextTimerStopped = false;
    if (!ge('vid_next_video') || html5video.nextTimer || !html5video.canvasSupport()) return;
    html5video.nextTimerStarted = new Date().getTime();
    html5video.nextTimerCtx = ge('vid_next_video_timer_canvas').getContext('2d');
    html5video.nextTimerCtx.lineWidth = 6;
    html5video.nextTimerCtx.lineCap = 'round';
    html5video.nextTimerCtx.strokeStyle = '#fff';
    html5video.nextTimerTick();
  },

  nextTimerTick: function() {
    var progress = (new Date().getTime() - html5video.nextTimerStarted) / 10000;
    if (progress < 1) {
      var ctx = html5video.nextTimerCtx;
      ctx.clearRect(0, 0, 100, 100);
      ctx.beginPath();
      ctx.arc(50, 50, 47, -Math.PI/2, -Math.PI/2 + Math.PI*2*progress);
      ctx.stroke();
      html5video.nextTimer = setTimeout(html5video.nextTimerTick, 20);
    } else {
      html5video.nextVideo(html5video.nextVideosData[0].vid, true, true);
    }
  },

  nextTimerReset: function () {
    html5video.nextTimerStopped = true;
    if (!html5video.nextTimer) return;
    clearTimeout(html5video.nextTimer);
    html5video.nextTimerCtx.clearRect(0, 0, 100, 100);
    html5video.nextTimer = null;
    html5video.nextTimerCtx = null;
    html5video.nextTimerStarted = null;
  },

  canvasSupport: function() {
    return !!window.CanvasRenderingContext2D;
  },

  onLike: function(actionsType, outer) {
    html5video.liked = !html5video.liked;
    var liked = html5video.liked;
    if (!outer) {
      videoCallback(['onLike', actionsType]);
    }

    if (liked) {
      addClass(ge('vid_like'), 'selected');
    } else {
      removeClass(ge('vid_like'), 'selected');
    }

    if (liked) {
      addClass(ge('vid_finish_like'), 'selected');
    } else {
      removeClass(ge('vid_finish_like'), 'selected');
    }
  },

  onShare: function(actionsType) {
    if (fullScreenApi.isFullScreen()) {
      fullScreenApi.cancelFullScreen();
    }
    html5video.nextTimerReset();
    videoCallback(['onShare', actionsType]);
  },

  onAdd: function(actionsType, outer) {
    html5video.added = !html5video.added;
    var added = html5video.added
        vars = html5video.vars;
    if (!outer) {
      if (added) {
        videoCallback(['onAdd', vars.oid+'_'+vars.vid, vars.add_hash, actionsType]);
      } else {
        videoCallback(['onRemove', actionsType]);
      }
    }

    if (added) {
      addClass(ge('vid_add'), 'selected');
    } else {
      removeClass(ge('vid_add'), 'selected');
    }

    if (added) {
      addClass(ge('vid_finish_add'), 'selected');
    } else {
      removeClass(ge('vid_finish_add'), 'selected');
    }
  },

  onLiked: function() {
    html5video.onLike(null, true);
  },

  onAdded: function() {
    html5video.onAdd(null, true);
  },

  addViewTimer: function() {
    var video = ge('the_video'), vars = this.vars;
    if (!this.incViewTimer && video && video.duration) {
      this.incViewTimer = new VideoTimer(function() {
        if (window.videoCallback && !html5video.incViewSent && vars.oid && vars.vid && vars.hash) {
          html5video.incViewSent = true;
          videoCallback(['incViewCounter', vars.oid, vars.vid, vars.hash, html5video.cur_res, html5video.max_res, 'html5', 'big']);
        }
      }, video.duration > 5 ? 5000 : video.duration * 900);
      if (video.paused) {
        this.incViewTimer.pause();
      }
    }
    if (!this.incSmallViewTimer && video && video.duration) {
      this.incSmallViewTimer = new VideoTimer(function() {
        if (window.videoCallback && !html5video.incSmallViewSent && vars.oid && vars.vid && vars.hash) {
          html5video.incSmallViewSent = true;
          videoCallback(['incViewCounter', vars.oid, vars.vid, vars.hash, html5video.cur_res, html5video.max_res, 'html5', 'small']);
        }
      }, video.duration > 1 ? 1000 : video.duration * 900);
      if (video.paused) {
        this.incSmallViewTimer.pause();
      }
    }
  },

  showMenu: function(e) {
    html5video.inside = 1;
    animate(ge('menu_layer'), {bottom: 36}, 200);
    if (!html5video.videoFinished) {
      removeClass('popup_actions', 'hidden');
    }
    removeClass(ge('the_video'), 'no_cursor');
  },

  hideMenu: function(e) {
    var video = ge('the_video');
    html5video.inside = 0;
    if (video && !video.paused) {
      html5video.hideMenuTO = setTimeout(function(){
        if (html5video.inside == 0 && html5video.moveState == 0 && !html5video.isMenuOver) {
          html5video.hideResMenu(true);
          html5video.hideTip();
          html5video.hidePreviewTip();
          animate(ge('menu_layer'), {bottom: 0}, 200);
          addClass('popup_actions', 'hidden');
          addClass(ge('the_video'), 'no_cursor');
        }
      }, 0);
    }
  },

  onMenuOver: function () {
    html5video.isMenuOver = true;
  },

  onMenuOut: function () {
    html5video.isMenuOver = false;
    html5video.updateMenu();
  },

  unhideMenu: function () {
    if (html5video.hideMenuTO) {
      clearTimeout(html5video.hideMenuTO);
    }
  },

  updateMenu: function() {
    if (html5video.fsHideTO) {
      clearTimeout(html5video.fsHideTO);
    }
    if (fullScreenApi.isFullScreen()) {
      var b = parseInt(getStyle(ge('menu_layer'), 'bottom'));
      if (b === 0) {
        html5video.showMenu();
      }
      html5video.fsHideTO = setTimeout(html5video.hideMenu, 1000);
    }
  },

  defX: function(e) {
    return intval(e.clientX + (window.scrollX || 0));
  },

  defY: function(e) {
    return intval(e.clientY + (window.scrollY || 0));
  },

  centerPopup: function() {
    var playerSize = getSize('bg'),
        popupMode,
        popupSize;

    if (playerSize[0] < 300 || playerSize[1] < 250) {
      popupMode = 2;
    } else if (html5video.vars.min_controls || playerSize[0] < 400) {
      popupMode = 1;
    } else {
      popupMode = 0;
    }

    toggleClass('popup1', 'min', popupMode == 2);
    toggleClass('popup1', 'small', popupMode >= 1);
    show('popup_bk', 'video_title', 'big_play', 'video_author');
    popupSize = getSize('popup1');

    setStyle('loading_gif2', {
      left:(playerSize[0] - 64) / 2,
      top:(playerSize[1] - 16) / 2
    });
    setStyle('popup1', {
      position:'absolute',
      left:(playerSize[0] - popupSize[0]) / 2,
      top:(playerSize[1] - popupSize[1]) / 2
    });
  },

  addZero: function(s) {
    s = intval(s);
    return (s < 10) ? '0' + s : s;
  },

  formatTime: function(sec) {
    var s, m, h;
    s = parseInt(sec);
    m = parseInt(s / 60); s %= 60;
    h = parseInt(m / 60); m %= 60;
    return (h > 0 ? h + ':' + html5video.addZero(m) : m) + ':' + html5video.addZero(s);
  },

  timeFromStr: function(str) {
    var pattern = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/,
        match = typeof str === 'string' ? str.match(pattern) : null;

    if (match) {
      return (match[1] * 3600 || 0) + (match[2] * 60 || 0) + (+match[3] || 0);
    } else {
      return 0;
    }
  },

  timeToStr: function(t) {
    var str = '';
    if (t >= 3600) {
      str += Math.floor(t / 3600) + 'h';
      t = t % 3600;
    }
    if (t >= 60) {
      str += Math.floor(t / 60) + 'm';
      t = t % 60;
    }
    if (t > 0) {
      str += Math.floor(t) + 's';
    }
    return str;
  },

  updTime: function() {
    var vars = html5video.vars,
        video = ge('the_video');
    if (video) {
      var c = video.currentTime || 0, d = video.duration || vars.duration || 0,
          percent = Math.min(100, Math.max(0, (d > 0 ? 100 * c / d : 0)));
      setStyle(ge('progress_line'), {width: percent + '%'});
      ge('curtime').innerHTML = html5video.reversed && html5video.minSize ? html5video.formatTime(d - c) : html5video.formatTime(c);
      ge('duration').innerHTML = html5video.formatTime(d);
    }
  },

  updVol: function() {
    var vol = html5video.volume;
    var vb = ge('volume_button');
    if (vol > .5) { vb.setAttribute('value', 'max'); } else
    if (vol > .2) { vb.setAttribute('value', 'ave'); } else
    if (vol > 0)  { vb.setAttribute('value', 'min'); } else {
      vb.setAttribute('value', 'off');
    }
    setStyle(ge('volume_line'), {width: Math.min(100, Math.max(0, vol * 100)) + '%'});
    ge('the_video').volume = vol;
  },

  changeVol: function(delta) {
    var volume = this.volume + delta * this.volStep;
    this.volume = Math.min(1, Math.max(0, volume));
    this.updVol();
    this.showTip(Math.round(this.volume * 100) + '%', getXY(ge('volume_line'))[0] + getSize('volume_line')[0] - getXY(ge('html5_player'))[0]);
  },

  changePr: function(delta) {
    var vars = html5video.vars,
        video = ge('the_video'),
        time = (video.currentTime || 0) + delta * this.prStep;
    video.currentTime = Math.min(video.duration || vars.duration || 0, Math.max(0, time));
    this.updTime();
  },

  showLoading: function() {
    toggle('video_cont', !this.notLoaded);
    toggle('loading_gif2', !!this.notLoaded);
  },

  calcPrLineW: function() {
    html5video.prLineW = getSize(ge('pr_back_line'))[0];
    html5video.updTime();
  },

  updateActions: function() {
    var btns = ['quality_btn', 'time_label_cell', 'fullscreen_btn'];
    var btnsW = {
      'quality_btn': 39,
      'time_label_cell': (html5video.minSize ? (html5video.timeLabelW-11)/2 : html5video.timeLabelW) + 14,
      'fullscreen_btn': 25
    };
    if (html5video.noQualityBtn) {
      btns = btns.slice(1);
    }
    if (html5video.vars.is_inline) {
      if (fullScreenApi.isFullScreen()) {
        if (isVisible('popup_btn')) {
          hide('popup_btn');
          html5video.maxActionsW -= 28;
        }
      } else {
        if (!isVisible('popup_btn')) {
          show('popup_btn');
          html5video.maxActionsW += 28;
        }
      }
    }
    var actsEl = ge('video_actions');
    for (var i in btns) {
      show(btns[i]);
    }
    html5video.actionsW = html5video.maxActionsW;
    setStyle(actsEl, {minWidth: html5video.actionsW});
    html5video.calcPrLineW();
    if (html5video.prLineW < html5video.minPrW) {
      for (var i in btns) {
        hide(btns[i]);
        html5video.actionsW -= btnsW[btns[i]];
        setStyle(actsEl, {minWidth: html5video.actionsW});
        html5video.calcPrLineW();
        if (html5video.prLineW >= html5video.minPrW) {
          break;
        }
      }
    }
  },

  htmlCode: function() {
    return '\
  <div id="html5_player">\
    <div id="bg" class="bg" onclick="html5video.playVideo()">\
      <div id="loading_gif2" class="loading_gif2"></div>\
      <div id="video_cont">\
        <video id="the_video" width="100%" height="100%" onloadedmetadata="html5video.onMetadata()" preload="none"' + (this.vars.jpg ? ' poster="' + this.vars.jpg + '"' : '') +'>\
          HTML5 not supported.<br>\
        </video>\
      </div>\
    </div>\
    <div id="menu_layer">\
      <div id="menu_bk"></div>\
        <div id="menu_controls" onmouseenter="html5video.onMenuOver()" onmouseleave="html5video.onMenuOut()">\
          <div id="video_tip_wrap">\
            <div id="video_tip_bk"></div>\
            <div id="video_tip"></div>\
            <div id="video_tip_arrow"></div>\
          </div>\
          <table border="0" cellpadding="0" cellspacing="0" ondragstart="cancelEvent(event); return false" onstartselect="cancelEvent(event); return false">\
            <tr>\
              <td style="padding:10px 14px 0px 12px">\
                <div id="play_button" class="play_button" onclick="html5video.playVideo()"></div>\
              </td>\
              <td style="padding:9px 10px 0px 10px; display:none">\
                <div id="replay_button" class="replay_button" onclick="html5video.playVideo()"></div>\
              </td>\
              <td style="padding:12px 12px 0px 0; display:none">\
                <div id="next_button" class="next_button" onmouseover="html5video.nextOver(this, event)" onmouseout="html5video.nextOut(this, event)"  onclick="html5video.nextVideo(null)"></div>\
              </td>\
              <td width="100%" style="padding:16px 0 0">\
                <div id="vid_pr" onmouseover="html5video.sliderOver(this, event)" onmouseout="html5video.sliderOut(this, event)" onmousedown="html5video.prClick(event)">\
                  <div id="pr_white_line" class="white_line"></div>\
                  <div id="pr_back_line" class="back_line"><!-- --></div>\
                  <div id="pr_load_line" class="load_line"><!-- --></div>\
                  <div id="progress_line" class="progress_line">\
                    <div id="progress_slider" class="slider"><!-- --></div>\
                  </div>\
                </div>\
              </td>\
              <td style="padding:11px 0 0 14px" id="time_label_cell">\
                <div id="time_label" class="time_label" onclick="html5video.onTimeClick(this)">\
                  <span id="curtime" class="time1_text">' + this.formatTime(this.vars.duration || 0) + '</span>\
                  <span id="duration" class="time2_text">' + this.formatTime(this.vars.duration || 0) + '</span>\
                </div>\
              </td>\
              <td style="padding:11px 0 0px 16px">\
                <div id="volume_wrap" class="volume_wrap" onmouseover="html5video.volumeBtnOver(this, event)" onmouseout="html5video.volumeBtnOut(this, event)">\
                  <div id="volume_dropdown" class="volume_dropdown hidden">\
                    <div class="volume_dropdown_bk"></div>\
                  </div>\
                  <div id="volume_button" class="volume_button" value="ave" onclick="html5video.onVolumeBut()"></div>\
                </div>\
              </td>\
              <td style="padding:16px 13px 0 0" id="vid_vol_cell">\
                <div id="vid_vol" onmouseover="html5video.sliderOver(this, event)" onmouseout="html5video.sliderOut(this, event)" onmousedown="html5video.volClick(event)">\
                  <div id="vol_white_line" class="white_line"><!-- --></div>\
                  <div id="vol_back_line" class="load_line"><!-- --></div>\
                  <div id="volume_line" class="progress_line">\
                    <div id="volume_slider" class="slider"><!-- --></div>\
                  </div>\
                </div>\
              </td>\
              <td style="padding:9px 10px 5px 5px">\
                <div id="video_actions" class="clear_fix">\
                  <div id="quality_btn" class="quality_button fl_l" onclick="html5video.toggleResMenu()">\
                    <div class="quality_label">\
                      <div id="quality_val" class="quality_val" onmouseover="html5video.qualityOver(this, event);html5video.unhideResMenu()" onmouseout="html5video.qualityOut(this, event);html5video.hideResMenu()"></div>\
                      <div id="quality_val_arrow" class="quality_val_arrow"></div>\
                      <div id="quality_val_hd" class="quality_val_hd"></div>\
                    </div>\
                    <div id="quality_panel_wrap" class="quality_panel_wrap hidden fl_l" onmouseover="html5video.unhideResMenu()" onmouseout="html5video.hideResMenu()">\
                      <div id="quality_bk" class="quality_bk"></div>\
                      <div id="quality_panel" class="quality_panel">\
                        <button id="button1080" value="1080p" onclick="html5video.changeQuality(1080, true);"><span class="quality_item_text">1080</span><span class="quality_item_hd"></span></button>\
                        <button id="button720" value="720p" onclick="html5video.changeQuality(720, true);"><span class="quality_item_text">720</span><span class="quality_item_hd"></span></button>\
                        <button id="button480" value="480p" onclick="html5video.changeQuality(480, true);"><span class="quality_item_text">480</span></button>\
                        <button id="button360" value="360p" onclick="html5video.changeQuality(360, true);"><span class="quality_item_text">360</span></button>\
                        <button id="button240" value="240p" onclick="html5video.changeQuality(240, true);"><span class="quality_item_text">240</span></button>\
                      </div>\
                    </div>\
                  </div>\
                </div>\
              </td>\
            </tr>\
          </table>\
        </div>\
      </div>\
      <div id="popup1" onclick="html5video.playVideo()">\
        <div id="popup_bk" class="popup_bk"></div>\
        <div id="video_title" class="video_title"></div>\
        <div id="big_play" class="big_play" onmouseover="addClass(this, \'over\');" onmouseout="removeClass(this, \'over\');"></div>\
        <a id="video_author" class="video_author" target="_blank" onclick="event.stopPropagation();"></a>\
        <div id="video_show_hd" class="video_show_hd" onclick="return html5video.playHD()">' + (this.vars.video_play_hd || 'Play HD') + '</div>\
      </div>\
      <div id="popup_actions" class="clear_fix" onmouseenter="html5video.onMenuOver()" onmouseleave="html5video.onMenuOut()"></div>\
     </div>';
  },

  transformAvailable: function() {
    if (cur.transformAvailable !== undefined) {
      return cur.transformAvailable;
    }
    var prefixes = 'Webkit Moz o ms'.split(' '),
        prefix,
        div = ce('div'), i=0,
        prop = 'transform',
        support = div.style[prop] != undefined;

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    while (!support && (prefix = prefixes[i++])) {
      support = div.style[prefix + prop] != undefined;
    }
    cur.transformAvailable = support;
    return support;
  },

  showTip: function(text, x, offsetY) {
    ge('video_tip').innerHTML = text;
    show('video_tip_wrap');
    var w = getSize('video_tip')[0], s = getSize('html5_player')[0],
        l = x - w / 2, a = w / 2 - 3;
    if (l + w > s - 10) {
      a -= s - w - l - 10;
      l = s - w - 10;
    }
    offsetY = intval(offsetY);
    setStyle(ge('video_tip_bk'), {width: w, height: 13 - offsetY});
    setStyle(ge('video_tip_wrap'), {left: l, top: -13 + offsetY});
    setStyle(ge('video_tip_arrow'), {left: a});
    if (html5video.tipTO) {
      clearTimeout(html5video.tipTO);
    }
    html5video.tipTO = setTimeout(html5video.hideTip, 1000);
  },

  hideTip: function() {
    hide('video_tip_wrap');
  },

  showPreviewTip: function(text, x, thumbIndex) {
    var vars = html5video.vars,
        spritesheet = ge('video_preview_tip_img_' + Math.floor(thumbIndex / vars.timeline_thumbs_per_image)),
        arrowX = -4,
        playerSize = getSize('bg'),
        thumbWidth = vars.timeline_thumb_width,
        thumbHeight = vars.timeline_thumb_height,
        minThumbHeight = 50,
        minThumbWidth = Math.round(thumbWidth / thumbHeight * minThumbHeight),
        thumbsPerRow = vars.timeline_thumbs_per_row,
        thumbsPerImage = vars.timeline_thumbs_per_image,
        thumbsTotal = vars.timeline_thumbs_total,
        w,
        h;

    if (playerSize[1] > 300) {
      setStyle(spritesheet, {
        // show 75px height thumbs
        width: Math.min(thumbsPerRow, thumbsTotal) * thumbWidth + 'px',
        // place target frame into viewport and cut off 1px lines from every thumb edge
        left: -thumbWidth * (thumbIndex % thumbsPerRow) - 1 + 'px',
        top: -thumbHeight * Math.floor(thumbIndex % thumbsPerImage / thumbsPerRow) - 1 + 'px'
      });
      w = thumbWidth - 2;
      h = thumbHeight - 2;
    } else {
      setStyle(spritesheet, {
        // show 50px height thumbs
        width: Math.min(thumbsPerRow, thumbsTotal) * minThumbWidth + 'px',
        // place target frame into viewport and cut off 1px lines from every thumb edge
        left: -minThumbWidth * (thumbIndex % thumbsPerRow) - 1 + 'px',
        top: -minThumbHeight * Math.floor(thumbIndex % thumbsPerImage / thumbsPerRow) - 1 + 'px'
      });
      w = minThumbWidth - 2;
      h = minThumbHeight - 2;
    }

    setStyle('video_preview_tip_img_wrap', {
      width: w + 'px',
      height: h + 'px'
    });

    each(ge('video_preview_tip_img_wrap').children, function() {
      if (this !== spritesheet) {
        hide(this);
      } else {
        show(this);
      }
    });

    if (x - w / 2 < 20) {
      arrowX += Math.round(x - (20 + w / 2));
      x = Math.round(20 + w / 2);
    }
    setStyle('video_preview_tip_arrow', {
      marginLeft: arrowX + 'px'
    });

    setStyle('video_preview_tip', {
      left: Math.round(x - w/2 - 3) + 'px', // 3 is border width
      bottom: '30px',
    });
    show('video_preview_tip');

    var tipText = ge('video_preview_tip_text');
    tipText.innerHTML = text;
    var textSize = getSize(tipText);
    setStyle(tipText, {
      marginLeft: -Math.round(textSize[0] / 2)
    });
  },

  hidePreviewTip: function() {
    hide('video_preview_tip');
  },

  toggleResMenu: function() {
    var isShowing = !hasClass('quality_panel_wrap', 'hidden');
    if (isShowing) {
      html5video.hideTip();
    } else {
      // html5video.showTip();
    }
    toggleClass('quality_panel_wrap', 'hidden', isShowing);
  },

  hideResMenu: function(instant) {
    clearTimeout(html5video.hideResMenuTO);
    html5video.hideResMenuTO = setTimeout(function() {
      addClass('quality_panel_wrap', 'hidden');
    }, instant ? 0 : 1000);
  },

  unhideResMenu: function() {
    if (html5video.hideResMenuTO) {
      clearTimeout(html5video.hideResMenuTO);
    };
  },

  updateFullscreen: function() {
    html5video.updateActions();
    toggleClass(ge('fullscreen_btn'), 'isfs', fullScreenApi.isFullScreen());
    toggleClass(ge('html5_player'), 'isfs', fullScreenApi.isFullScreen());
  },

  toggleFullscreen: function() {
    if (fullScreenApi.supportsFullScreen) {
      if (fullScreenApi.isFullScreen()) {
        fullScreenApi.cancelFullScreen();
      } else {
        fullScreenApi.requestFullScreen(ge('html5_player'));
      }
    }
    return false;
  },

  playHD: function() {
    this.changeQuality(this.max_res, true);
    this.playHDClicked = true;
    return false;
  },

  likeClick: function() {
    var vars = this.vars, is_ext = intval(vars.is_ext);
    videoCallback(['onLike']);
    this.liked = !this.liked;
    if (this.liked) {
      setStyle(ge('vid_like_fg'), {opacity: 0});
      setStyle(ge('vid_liked_fg'), {opacity: 0.9});
      // el.innerHTML = '<img class="vid_like_ah" width="20" height="18" src="/images/video/like_icon_2x.png" />';
      // var img = el.firstChild;
      // animate(img, {marginLeft: -10, marginTop: -7, width: 40, height: 36, opacity: 0}, {duration: 600, transition: Fx.Transitions.easeOutCubic, onComplete: re.pbind(img)});
    } else {
      setStyle(ge('vid_like_fg'), {opacity: null});
      setStyle(ge('vid_liked_fg'), {opacity: null});
    }
  },

  linkClick: function() {
    var vars = this.vars, video = ge('the_video');
    if (!vars.ads_link) return;
    if (!video.paused)  {
      this.playVideo();
    }
    window.open(vars.ads_link, '_blank');
    window.focus();
  },

  shareClick: function() {
    if (fullScreenApi.isFullScreen()) {
      html5video.toggleFullscreen();
    }
    videoCallback(['onShare']);
  },

  logoClick: function() {
    var vars = this.vars, video = ge('the_video');
    if (!vars.oid || !vars.vid) {
      return;
    }
    if (!video.paused)  {
      this.playVideo();
    }
    window.open('/video' + vars.oid + '_' + vars.vid, '_blank');
    window.focus();
  },

  rotateVideo: function() {
    if (!this.transformAvailable()) return;
    this.angle += 90;
    this.updateRotation();
  },

  openVideoPopup: function () {
    var vars = html5video.vars,
        video = ge('the_video'),
        timeString = video ? html5video.timeToStr(video.currentTime) : '';
        videoRaw = vars.oid + '_' + vars.vid;

    if (fullScreenApi.isFullScreen()) {
      html5video.toggleFullscreen();
    }

    videoCallback(['onOpenInPopup', videoRaw, vars.list_id, timeString]);
  },

  addClick: function () {
    var vars = this.vars;
    this.added = !this.added;
    if (this.added) {
      videoCallback(['onAdd', vars.oid + '_' + vars.vid, vars.add_hash]);
      setStyle(ge('vid_add_fg'), {
        transform: 'scale(0)',
        opacity: 0
      });
      setStyle(ge('vid_added_fg'), {
        transform: 'scale(1)',
        opacity: 0.7
      });
    } else {
      videoCallback(['onRemove']);
      setStyle(ge('vid_add_fg'), {
        transform: null,
        opacity: null
      });
      setStyle(ge('vid_added_fg'), {
        transform: null,
        opacity: null
      });
    }
  },

  updateRotation: function() {
    if (!this.transformAvailable()) return;
    var video = ge('the_video'),
        img = ge('video_thumb'),
        btn = ge('rotate_btn'),
        xy = getSize('html5_player'),
        s = this.angle % 180 ? xy[1] / xy[0] : 1;
    video.style.webkitTransform = 'rotate('+this.angle+'deg) scale('+s+', '+s+')';
    video.style.msTransform = 'rotate('+this.angle+'deg) scale('+s+', '+s+')';
    video.style.MozTransform = 'rotate('+this.angle+'deg) scale('+s+', '+s+')';
    video.style.transform = 'rotate('+this.angle+'deg) scale('+s+', '+s+')';

    if (img) {
      img.style.webkitTransform = 'rotate('+this.angle+'deg) scale('+s+', '+s+')';
      img.style.msTransform = 'rotate('+this.angle+'deg) scale('+s+', '+s+')';
      img.style.MozTransform = 'rotate('+this.angle+'deg) scale('+s+', '+s+')';
      img.style.transform = 'rotate('+this.angle+'deg) scale('+s+', '+s+')';
    }

    if (btn) {
      btn.style.webkitTransform = 'rotate('+this.angle+'deg)';
      btn.style.msTransform = 'rotate('+this.angle+'deg)';
      btn.style.MozTransform = 'rotate('+this.angle+'deg)';
      btn.style.transform = 'rotate('+this.angle+'deg)';
    }
  },

  updateRepeat: function(val) {
    if (html5video.vars) {
      html5video.vars.repeat = intval(val) ? 1 : 0;
    }
  },

  // event listeners

  onMetadata: function() {
    var video = ge('the_video'), player = ge('html5_player'), bg = ge('bg');
    var vars = html5video.vars, ratio = video.videoWidth / video.videoHeight;
    var w = '100%', h = '100%';
    bg.style.height = h;
    video.style.height = h;
    bg.style.width = w;
    video.style.width = w;
    if (html5video.fixed_player_size) {
      w = html5video.fixedWidth;
      h = html5video.fixedHeight;
    }
    ge(video_box_id).style.height = h;
    ge(video_box_id).style.width = w;
    var box = document.getElementsByClassName('popup_box_container')[0];
    if (box) {
      box.style.width = (html5video.cur_res > 240) ? '629px' : '502px';
    }
    html5video.updateActions();
    html5video.centerPopup();
    animate(ge('menu_layer'), {bottom: 36}, 200);
    removeClass('popup_actions', 'hidden');
    removeClass(video, 'no_cursor');
  },

  onDurationChange: function() {
    html5video.updTime();
  },

  onErr: function(e) {
    var msg;
    switch (e.target.error.code) {
      case e.target.error.MEDIA_ERR_ABORTED:
        msg = 'playback aborted.';
        break;
      case e.target.error.MEDIA_ERR_NETWORK:
        msg = 'network error.';
        break;
      case e.target.error.MEDIA_ERR_DECODE:
        msg = 'decode error.';
        break;
      case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        msg = 'the server or network failed or the format is not supported.';
        break;
      default:
        msg = 'an unknown error occurred.';
        break;
    }
    topError('<b>Video loading error:</b> ' + msg, {dt: 5});
  },

  onPlay: function() {
    html5video.showLoading();
    ge('play_button').className = 'pause_button';
    hide('popup1');
  },

  onPause: function() {
    var video = ge('the_video'), vars = html5video.vars;
    if (!video || vars.repeat && video.duration && Math.abs(video.duration - video.currentTime) < 1) {
      return;
    }
    if (ge('play_button')) ge('play_button').className = 'play_button';
    show('popup1');
    html5video.showMenu();
  },

  onProgress: function() {
    var video = ge('the_video'), ratio = 0;
    if (!video || !video.buffered.length) {
      return;
    }
    var curTime = video.currentTime;
    for (var i=0,len=video.buffered.length; i<len; i++) {
      if (video.buffered.start(i) < curTime && curTime < video.buffered.end(i)) {
        ratio = video.buffered.end(i) / video.duration;
        break;
      }
    }
    ratio = Math.min(1, Math.max(0, ratio));
    setStyle(ge('pr_load_line'), {width: ratio*100 + '%'});
  },

  onLoadStart: function() {
    html5video.notLoaded = 1;
    html5video.onProgress();
  },

  onSeeking: function() {
    html5video.notLoaded = 1;
    html5video.showLoading();
    html5video.videoClicked = true;
    ge('the_video').pause();
    html5video.playVideo()
  },

  onSeeked: function() {
    html5video.notLoaded = 0;
    html5video.showLoading();
  },

  onCanPlay: function() {
    html5video.notLoaded = 0;
    html5video.showLoading();
    var video = ge('the_video'), vars = html5video.vars;
    if (html5video.changeQualityTime) {
      video.currentTime = html5video.changeQualityTime;
      show(video);
      delete html5video.changeQualityTime;
      video.play();
      if (html5video.incViewTimer) {
        html5video.incViewTimer.resume();
      }
      if (html5video.incSmallViewTimer) {
        html5video.incSmallViewTimer.resume();
      }
    } else if (html5video.playHDClicked) {
      show(video);
      delete html5video.playHDClicked;
      video.play();
      if (html5video.incViewTimer) {
        html5video.incViewTimer.resume();
      }
      if (html5video.incSmallViewTimer) {
        html5video.incSmallViewTimer.resume();
      }
    }
    if (window.videoCallback && !html5video.playStarted && vars.oid && vars.vid && vars.hash) {
      html5video.playStarted = true;
      videoCallback(['onVideoPlayStarted', vars.oid, vars.vid, vars.hash]);
    }
  },

  onEnded: function() {
    var video = ge('the_video'), vars = html5video.vars;
    if (!video) {
      return;
    }
    if (vars.repeat) {
      video.currentTime = 0;
      html5video.updTime();
      video.play();
      return
    }

    html5video.videoFinished = true;
    video.pause();
    if (html5video.incViewTimer) {
      html5video.incViewTimer.pause();
    }
    if (html5video.incSmallViewTimer) {
      html5video.incSmallViewTimer.pause();
    }
    setStyle(ge('menu_layer'), {bottom: 36});
    addClass('popup_actions', 'hidden');
    removeClass(video, 'no_cursor');
    if (fullScreenApi.isFullScreen()) {
      html5video.toggleFullscreen();
    }
    hide(ge('play_button').parentNode);
    show(ge('replay_button').parentNode);
    if (vars.is_ext != 0) return;
    var playerSize = getSize(ge('bg'));

    if (vars.min_controls || vars.nolikes) {
      // show('popup1');
    } else if (vars.show_next && playerSize[0] > 400 && playerSize[1] > 300 && (html5video.nextVideosData = videoview.getNextVideosData())) {
      html5video.showNextVideoLayer();
    } else if (playerSize[0] > 250 && playerSize[1] > 200) {
      html5video.showFinishExtendedLayer();
    } else {
      html5video.showFinishLayer();
    }
  },

  prClick: function(event) {
    event.preventDefault();
    if (checkEvent(event)) return;
    html5video.onPrMove(event);
    html5video.moveState = 1;
    addClass(ge('vid_pr'), 'down');
  },

  volClick: function(event) {
    event.preventDefault();
    html5video.onVolMove(event);
    html5video.moveState = 2;
    addClass(ge('vid_vol'), 'down');
  },

  onPrMove: function(e) {
    var vars = html5video.vars,
        xy = getXY(ge('progress_line')),
        video = ge('the_video'),
        percent = html5video.prLineW ? (html5video.defX(e) - xy[0] + (fullScreenApi.isFullScreen() ? getXY(ge('html5_player'))[0] : 0)) / html5video.prLineW : 0;
    percent = Math.min(1, Math.max(0, percent));

    video.currentTime = (video.duration || vars.duration) * percent;
    video.play();
    html5video.updTime();
  },

  onVolMove: function(e) {
    var vertical = getSize('html5_player')[0] < 500 ? 1 : 0;
        xy = getXY(ge('volume_line')), video = ge('the_video'),
        percent = html5video.volLineW ? ((vertical ? xy[1] - html5video.defY(e) : html5video.defX(e) - xy[0]) + (fullScreenApi.isFullScreen() ? getXY(ge('html5_player'))[vertical] : 0)) / html5video.volLineW : 0;

    percent = Math.min(1, Math.max(0, percent));
    html5video.volume = percent;
    html5video.updVol();
    if (!vertical) {
      html5video.showTip(Math.round(percent * 100) + '%', getXY(ge('volume_slider'))[0] - getXY(ge('html5_player'))[0] + 3, -2);
    }
  },

  onVolumeBut: function() {
    if (html5video.volume > 0) {
      html5video.lastVolume = html5video.volume;
      html5video.volume = 0;
    } else {
      html5video.volume = html5video.lastVolume;
    }
    html5video.updVol()
    html5video.volumeBtnOver(ge('volume_button'), window.event);
  },

  sliderOver: function(el, event) {
    addClass(el, 'over');
  },

  sliderOut: function(el, event) {
    removeClass(el, 'over');
    this.hideTip();
    this.hidePreviewTip();
  },

  nextOver: function(el, event) {
    var vars = html5video.vars,
        label = vars.lang_next || 'Next video';
    this.showTip(label, getXY(el)[0] - getXY(ge('html5_player'))[0] + 9);
  },

  nextOut: function() {
    this.hideTip();
  },

  linkOver: function() {
    // animate(ge('vid_link_bg'), {opacity: 0.7}, 200);
    // animate(ge('vid_link_content'), {opacity: 1}, 200);
  },

  linkOut: function() {
    // animate(ge('vid_link_bg'), {opacity: 0.45}, 200);
    // animate(ge('vid_link_content'), {opacity: 0.65}, 200);
  },

  onTimeClick: function(el) {
    var playerSize = getSize('bg');
    if (playerSize[0] > 500) return;
    html5video.reversed = !html5video.reversed;
    toggleClass(el, 'time_label_reversed', html5video.reversed);
  },

  volumeBtnOver: function(el, event) {
    // animate(el, {opacity: 0.7}, 200);
    var vol = ge('the_video').volume, vars = this.vars,
        label = vol > 0 ? vars.lang_volume_off || 'Mute' : vars.lang_volume_on || 'Unmute';
    if (html5video.minSize && html5video.transformAvailable()) {
      removeClass('volume_dropdown', 'hidden');
    } else {
      this.showTip(label, getXY(el)[0] - getXY(ge('html5_player'))[0] + 7, -5);
    }
  },

  volumeBtnOut: function(el, event) {
    // animate(el, {opacity: 1}, 200);
    if (html5video.minSize && html5video.transformAvailable()) {
      if (html5video.moveState !== 2) {
        addClass('volume_dropdown', 'hidden');
      }
    } else {
      this.hideTip();
    }
  },

  rotateOver: function(el, event) {
    // animate(el, {opacity: 0.7}, 200);
    var label = this.vars.lang_rotate || 'Rotate';
    this.showTip(label, getXY(el)[0] - getXY(ge('html5_player'))[0] + 7);
  },

  rotateOut: function(el, event) {
    // animate(el, {opacity: 1}, 200);
    this.hideTip();
  },

  openPopupOver: function(el, event) {
    var label = this.vars.lang_open_popup || 'Open in popup';
    this.showTip(label, getXY(el)[0] - getXY(ge('html5_player'))[0] + 9, -5);
  },

  openPopupOut: function(el, event) {
    this.hideTip();
  },

  fullscreenOver: function(el, event) {
    // animate(el, {opacity: 0.7}, 200);
    var vars = this.vars,
        label = fullScreenApi.isFullScreen() ? vars.lang_window || 'Minimize' : vars.lang_fullscreen || 'Full Screen';
    this.showTip(label, getXY(el)[0] - getXY(ge('html5_player'))[0] + 7, -5);
  },

  fullscreenOut: function(el, event) {
    // animate(el, {opacity: 1}, 200);
    this.hideTip();
  },

  qualityOver: function(el, event) {
    // animate(el, {opacity: 0.7}, 200);
    var label = this.vars.lang_hdsd || 'Change Video Quality';
    if (!isVisible('quality_panel_wrap')) {
      this.showTip(label, getXY(el)[0] - getXY(ge('html5_player'))[0] + (getSize(el)[0]-9)/2, -4);
    }
  },

  qualityOut: function(el, event) {
    // animate(el, {opacity: 1}, 200);
    this.hideTip();
  },

  logoOver: function(el, event) {
    // animate(el, {opacity: 0.7}, 200);
    var label = vars.goto_orig_video || 'Go to original video';
    this.showTip(label, getXY(el)[0] - getXY(ge('html5_player'))[0] + 6);
  },

  logoOut: function(el, event) {
    // animate(el, {opacity: 1}, 200);
    this.hideTip();
  },

  docKeyPressed: function(event) {
    var video = ge('the_video');
    if (!video || !(html5video.inside || fullScreenApi.isFullScreen())) return;

    switch (event.keyCode) {
      case KEY.DOWN:  html5video.changeVol(-1); break;
      case KEY.UP:    html5video.changeVol(1);  break;
      case KEY.LEFT:  html5video.changePr(-1);  break;
      case KEY.RIGHT: html5video.changePr(1);   break;
      case KEY.SPACE: html5video.playVideo();   break;
    }
    cancelEvent(event);
    html5video.updateMenu();
  },

  docScroll: function(event) {
    if (!fullScreenApi.isFullScreen()) return;
    var delta = ((event.wheelDelta) ? event.wheelDelta / 120 : event.detail / -3);
    html5video.changeVol(delta > 0 ? 1 : -1);
    html5video.updateMenu();
  },

  docMouseUp: function() {
    switch (html5video.moveState) {
      case 1:
        removeClass('vid_pr', 'down');
        html5video.hideTip();
        html5video.hidePreviewTip();
        break;
      case 2:
        removeClass('vid_vol', 'down');
        if (html5video.minSize && html5video.transformAvailable()) {
          addClass('volume_dropdown', 'hidden');
        } else {
          html5video.hideTip();
        }
        break;
    }
    html5video.moveState = 0;
    if (html5video.inside == 0) {
      html5video.hideMenu();
    }
  },

  docMouseMove: function(event) {
    var vars = html5video.vars,
        video = ge('the_video'),
        duration = video && video.duration || vars.duration;

    if (html5video.moveState == 1) {
      html5video.onPrMove(event);
    } else if (html5video.moveState == 2) {
      html5video.onVolMove(event);
    }

    if ((html5video.moveState == 1 || hasClass('vid_pr', 'over')) && duration) {
      var playerX = getXY('html5_player')[0],
          prLineX = getXY('progress_line')[0],
          prLineW = html5video.prLineW,
          sliderX = html5video.defX(event) - prLineX + (fullScreenApi.isFullScreen() ? playerX : 0),
          percent = Math.min(1, Math.max(0, html5video.prLineW ? sliderX / html5video.prLineW : 0)),
          timeString = html5video.formatTime(duration * percent),
          tipX = Math.min(prLineX + prLineW, Math.max(prLineX, sliderX + prLineX)) - playerX;

      if (vars.timeline_thumbs) {
        var thumbIndex = Math.min(vars.timeline_thumbs_total, Math.max(0, Math.floor(vars.timeline_thumbs_total * percent - 0.5)));
        html5video.showPreviewTip(timeString, tipX, thumbIndex);
      } else {
        html5video.showTip(timeString, tipX, -2);
      }
    }
    html5video.updateMenu();
  },

  removeListeners: function() {
    removeEvent(document, 'mouseup', html5video.docMouseUp);
    removeEvent(document, 'mousemove', html5video.docMouseMove);
    removeEvent(document, browser.opera ? 'keypress' : 'keydown', html5video.docKeyPressed);
    removeEvent(window, 'resize', html5video.onResize);
  }
};

function VideoTimer(callback, delay) {
  var timerId, start, remaining = delay;

  this.pause = function() {
    window.clearTimeout(timerId);
    remaining -= new Date() - start;
  };

  this.resume = function() {
    start = new Date();
    timerId = window.setTimeout(callback, remaining);
  };

  this.resume();
}

(function() {
  var fullScreenApi = {
        supportsFullScreen: false,
        isFullScreen: function() { return false; },
        requestFullScreen: function() {},
        cancelFullScreen: function() {},
        fullScreenEventName: '',
        prefix: ''
      },
      browserPrefixes = 'webkit moz o ms khtml'.split(' ');

  if (typeof document.cancelFullScreen != 'undefined') {
    fullScreenApi.supportsFullScreen = true;
  } else {
    for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
      fullScreenApi.prefix = browserPrefixes[i];
      if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
        fullScreenApi.supportsFullScreen = true;
        break;
      }
    }
  }

  if (fullScreenApi.supportsFullScreen) {
    fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

    fullScreenApi.isFullScreen = function() {
      switch (this.prefix) {
        case '':
          return document.fullScreen;
        case 'webkit':
          return document.webkitIsFullScreen;
        default:
          return document[this.prefix + 'FullScreen'];
      }
    }
    fullScreenApi.requestFullScreen = function(el) {
      return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
    }
    fullScreenApi.cancelFullScreen = function() {
      return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
    }
  }
  window.fullScreenApi = fullScreenApi;
})();

try{stManager.done('html5video.js');}catch(e){}
