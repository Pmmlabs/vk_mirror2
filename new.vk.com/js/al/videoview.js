var Videoview = {

isFS: false,

playerCallback: {
  resize: function (w, h) {
  },
  debugLog: function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('video player:');
    debugLog.apply(null, args);
  },
  fullscreen: function(value) {
    Videoview.isFS = value;
    Videoview.updateExternalVideoFinishBlock();
  },
  incViewCounter: function(oid, vid, hash, currRes, maxRes, player, type) {
    if (!player) {
      player = 'flash';
    }

    var module = Videoview.getVideoModule(oid + '_' + vid);
    var params = {act: 'inc_view_counter', oid: oid, vid: vid, hash: hash, curr_res: currRes, max_res: maxRes, player: player, type: type, module: module};

    if (cur.videoSearchStats) {
      var pos = parseInt(cur.videoSearchPos);
      if (!isNaN(pos)) {
        params.search_pos = pos;
        cur.videoSearchStats.positions[pos] = extend({'viewStarted': 0}, cur.videoSearchStats.positions[pos]);
        cur.videoSearchStats.positions[pos].viewStarted++;
      }
      cur.videoSearchStats.totalViews++;
    }

    ajax.post('al_video.php', params, {
      onDone: function(t) {
    }});

  },
  rotateVideo: function(oid, vid, angle, hash) {
    ajax.post('al_video.php', {act: 'rotate_video', oid: oid, vid: vid, angle: angle, hash: hash});
  },
  scoreCardCounter: function () {
    // vkImage().src = locProtocol + '//b.scorecardresearch.com/p?c1=1&c2=13765216&c5=06&rn=' + Math.round(Math.random() * 1000000000);
  },
  onVideoNext: function(vid, isTimerScreen, byTimeout) {
    setTimeout(function() {
      { // stats
        var action = 0;
        if (!isTimerScreen && !vid) {
          action = 4;
        } else if (isTimerScreen && byTimeout) {
          action = 5;
        } else if (isTimerScreen && !byTimeout) {
          action = 6;
        } else if (vid) {
          action = 7;
        }
        Videoview.sendPlayerStats(action, 0);
      }

      if (vid && !isTimerScreen) {
        VideoPlaylist.showVideo(vid);
      } else {
        VideoPlaylist.nextVideo();
      }
    }, 0);
  },
  setSuggestions: function(videos_ids) {
    ajax.post('/al_video.php', {
      act: 'fetch_player_suggestions',
      videos: videos_ids
    }, {
      onDone: function(videos) {
        if (!videos || !window.mvcur || !mvcur.mvData) return;
        mvcur.mvData.playerSuggestions = videos;
      }
    });
  },
  onSuggestionsShown: function(qid) {
    Videoview.sendPlayerStats(qid ? 14 : 12, 0);
    if (qid) {
      var vids = '';
      each(mvcur.mvData.playerSuggestions, function(i, video) {
        vids += '&vid=' + video.vid;
      });
      vkImage().src = '//go.imgsmail.ru/vk?pxn=vs&qid=' + qid + vids;
    }
  },
  onSuggestionClick: function(videoRaw, qid, pos, t) {
    Videoview.sendPlayerStats(qid ? 13 : 11, 0);
    showVideo(videoRaw, '', {
      autoplay: 1,
      module: Videoview.getVideoModule(videoRaw),
      addParams: {
        suggestions_qid: qid
      }
    });

    if (qid) {
      vkImage().src = '//go.imgsmail.ru/vk?pxn=vic&qid='+qid+'&vid='+videoRaw+'&p='+pos+'&t='+t;
    }
  },
  onSuggestionQuarterWatched: function(qid, videoRaw, t) {
    vkImage().src = '//go.imgsmail.ru/vk?pxn=vt25&qid='+qid+'&vid='+videoRaw+'&t='+t;
  },
  onOpenInPopup: function(videoRaw, listId, timeString) {
    Videoview.sendPlayerStats(8, 0);
    showVideo(videoRaw, listId, {autoplay: 1, queue: 1, addParams: {t: timeString}});
  },

  onVideoAdEvent: function(oid, vid, hash, eventId, adType, errorStr, plType) {
    if (hash) {
      cur._vadStatQueue = cur._vadStatQueue || {};
      cur._vadStatQueue[oid+'_'+vid] = cur._vadStatQueue[oid+'_'+vid] || { type: '', events: [] };

      var cs = cur._vadStatQueue[oid+'_'+vid];

      cs.type = adType;
      cs.events.push(eventId);
      cs.err = errorStr;
      cs.pl_type = plType;

      clearTimeout(cur._vadStatTimer);
      cur._vadStatTimer = setTimeout(Videoview.sendVideoAdStat.bind(Videoview, oid, vid, hash), 1000);
    }
  },
  onVideoAdShown: function(oid, vid, type, event) {
    ajax.post('al_video.php', {
      act: 'ad_event',
      oid: oid,
      vid: vid,
      type: type,
      event: event
    });
  },
  onVideoResolutionChanged: function(oid, vid, hash, resolution) {
    if (window.mvcur && mvcur.mvData) {
      mvcur.mvData.resolution = resolution;
    }
  },
  onInitialized: function() {
    if (window.mvcur && mvcur.mvShown) {
      VideoPlaylist.toggle(!VideoPlaylist.isCollapsed());
      if (mvcur.options.focusPlay) {
        if (document.visibilityState == 'visible') {
          // page is focused, play
          Videoview.togglePlay(true);
        } else if (document.visibilityState == 'hidden') {
          // wait for focus
          addEvent(window, 'focus', function focusHandler() {
            Videoview.togglePlay(true);
            removeEvent(window, 'focus', focusHandler);
          });
        }
      }
    } else if (cur.pinnedVideoInitHandlers) {
      cur.pinnedVideoInitHandlers();
    }

    var player = ge('video_player');
    if (player) {
      player.focus();
    }
  },
  onVideoPlayProgress: function(oid, vid, hash, time_progress, time_total) {
    var rawId = oid+'_'+vid;
    if (time_progress < 5000 && cur.tnsStart != rawId) {
      this.playerCallback.scoreCardCounter();
      cur.tnsStart = rawId;
    } else if (time_progress > (time_total / 2) && cur.tnsEnd != rawId) {
      cur.tnsEnd = rawId;
    }
    if (mvcur.adData) {
      if (mvcur.adData.stat_link_start && !mvcur.adData.view_complete_start && time_progress >= 5000) {
        ajax.post(mvcur.adData.stat_link_start, {}, {onDone: function() {}, onFail: function() { return true; }});
        mvcur.adData.view_complete_start = true;
      }
      if (mvcur.adData.stat_link_half && !mvcur.adData.view_complete_half && time_progress >= (time_total / 2)) {
        ajax.post(mvcur.adData.stat_link_half, {}, {onDone: function() {}, onFail: function() { return true; }});
        mvcur.adData.view_complete_half = true;
      }
      if (mvcur.adData.stat_link_full && !mvcur.adData.view_complete_full && time_progress >= (time_total * 0.9)) {
        ajax.post(mvcur.adData.stat_link_full, {}, {onDone: function() {}, onFail: function() { return true; }});
        mvcur.adData.view_complete_full = true;
      }
    }
  },
  onVideoStreamPlaying: function(oid, vid, hash) {
    if (oid+'_'+vid == cur.pinnedVideo) {
      var player = ge('video_player') || window.html5video;
      if (player && player.isTouchedByUser && player.isTouchedByUser()) {
        cur.pinnedVideoDestroyHandlers();
      } else {
        return;
      }
    }

    var _n = window.Notifier, _a = window.ap;
    if (_n) setTimeout(function() { _n.lcSend('video_start'); }, 0);
    if (_a && _a.isPlaying()) {
      _a.pause();
      _a.pausedByVideo = 1;
    }

    if (window.mvcur && mvcur.mvData && !vid && !oid) {
      mvcur.mvData.randomNumber = Math.round(Math.random() * 1000000000);
    }
  },
  onVideoPlayStarted: function(oid, vid, hash) {
    var m = Videoview.getVideoModule(oid + '_' + vid);

    var videocat = '';
    if (window.Video && Video.isInCatalog()) {
      var plId = VideoPlaylist.getCurListId();
      if (Videocat.isTop3Playlist(plId)) {
        videocat = 'featured';
      } else {
        videocat = plId;
      }
    }

    var playerViewType;
    if (cur.mvOpts && cur.mvOpts.inline || window.mvcur && mvcur.mvData && mvcur.mvData.inline) {
      playerViewType = 'inline';
    } else if (window.mvcur && window.mvcur.options && window.mvcur.options.playlistId) {
      playerViewType = 'layer_with_playlist';
    } else {
      playerViewType = 'layer';
    }

    var firstRequest = ajax.post('al_video.php', {
      act: 'video_view_started',
      oid: oid,
      vid: vid,
      hash: hash,
      quality: (window.mvcur ? mvcur.mvData.resolution : 0),
      module: m,
      videocat: videocat,
      inline: -1,
      player_view_type: playerViewType
    }, {
      onDone: function(t) {}
    });

    if (firstRequest !== undefined ) {
      if (window.mvcur) {
        vkImage().src = locProtocol + '//www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=pladform_videovk-playerstart/' + this.playerCallback.randomNumber();
      }

      var lType = 0;
      if (cur.mvOpts) {
        lType = cur.mvOpts.l_type;
      } else if (window.mvcur) {
        lType = mvcur.mvData.l_type;
      }

      switch (lType) {
        case 1:
          vkImage().src = locProtocol + '//vk.com/rtrg?r=JQ6ueUeOxlSLb8IoA8ToayylOLgRkThaoFV0XVgG5qvS1x1xWrkfqAg73sYWJxwq9PXWucKtMS02J3CsGLZdmOMNj9dv9UCjDN4a3ShJZXcJFMhgfVwSoPWoxp*Y/LAFUnKz5*XBvDCQXeaygAqI*gY9gz*jWTXaOXyT2lSfIPY-';
          break;
        case 2:
          vkImage().src = locProtocol + '//vk.com/rtrg?r=lD4OYmfC8ehvdc/8TL9AsAjM956qNaHyj20XV5mCNiTgYKQ6X*IXgwE8VbgqOf7rdbLJq7uCRBrdnFPTcUU2NjMgy8x4y6NWrYVwQMteNWh62XnLoNVZqobnsMMGm1OyTW09rhEkmiX5jqk3CI3JIIYbIbd8K7EC0ytQ4Kp4Kro-';
          break;
      }
    }
  },
  onVideoPlayFinished: function() {
    if (cur.pinnedVideoDestroy) {
      cur.pinnedVideoDestroy();
    }

    if (!(window.mvcur && mvcur.mvShown)) return;
    mvcur.finished = true;
    mvcur.mousemoved = true;
    Videoview.moveCheck();

    if (mvcur.adData) {
      if (mvcur.adData.stat_link_start && !mvcur.adData.view_complete_start) {
        ajax.post(mvcur.adData.stat_link_start, {}, {onDone: function() {}, onFail: function() { return true; }});
        mvcur.adData.view_complete_start = true;
      }
      if (mvcur.adData.stat_link_half && !mvcur.adData.view_complete_half) {
        ajax.post(mvcur.adData.stat_link_half, {}, {onDone: function() {}, onFail: function() { return true; }});
        mvcur.adData.view_complete_half = true;
      }
      if (mvcur.adData.stat_link_full && !mvcur.adData.view_complete_full) {
        ajax.post(mvcur.adData.stat_link_full, {}, {onDone: function() {}, onFail: function() { return true; }});
        mvcur.adData.view_complete_full = true;
      }
    } else {
      vkImage().src = locProtocol + '//www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=pladform_videovk-playerend/' + this.playerCallback.randomNumber();
    }
  },
  randomNumber: function() {
    mvcur.mvData.randomNumber = mvcur.mvData.randomNumber || Math.round(Math.random() * 1000000000);
    return mvcur.mvData.randomNumber;
  },
  onVideoAdsLoadStarted: function(oid, vid, hash) {
    vkImage().src = locProtocol + '//www.tns-counter.ru/V13a****vk_com/ru/CP1251/tmsec=vk_videoload-license/' + this.playerCallback.randomNumber();
  },
  onVideoAdsPlayStarted: function(oid, vid, hash) {
    vkImage().src = locProtocol + '//www.tns-counter.ru/V13a****vk_com/ru/CP1251/tmsec=vk_videostart-license/' + this.playerCallback.randomNumber();
  },
  onVideoAdsPlayFinished: function(oid, vid, hash) {
    vkImage().src = locProtocol + '//www.tns-counter.ru/V13a****vk_com/ru/CP1251/tmsec=vk_videoend-license/' + this.playerCallback.randomNumber();
  },
  onViewSegmentsChanged: function(oid, vid, segments, hash) {
    if (!segments) return;

    if (cur.segmentsSaveProcess) return;

    var ls_key = 'vsegs' + vk.id + '_' + oid + '_' + vid;
    var prev = ls.get(ls_key);

    if (prev && prev.ts && ((new Date().getTime()) - prev.ts) > 1000*60*60*24) {
      prev = null;
      ls.remove(ls_key);
    }

    var prevSegments = prev && prev.segments ? prev.segments.split('|')[2] : '';

    if (!prev || !prevSegments || segments != prevSegments) {
      cur.segmentsSaveProcess = true;

      var params = {
        act: 'a_view_segments',
        module: Videoview.getVideoModule(oid + '_' + vid),
        vid: vid,
        oid: oid,
        s: segments,
        prev_s: prev ? prev.segments : '',
        prev_sig: prev ? prev.segmentsSig : '',
        hash: hash
      };

      var searchPos = parseInt(cur.videoSearchPos);
      if (!isNaN(searchPos)) {
        params.search_pos = searchPos;
      }

      ajax.post('/al_video.php', params, {
        onDone: function(prevSegments, prevSegmentsSig, callbackRes) {
          if (prevSegments < 0) {
            return;
          }

          if (prevSegments) {
            ls.set(ls_key, {
              segments: prevSegments,
              segmentsSig: prevSegmentsSig,
              ts: new Date().getTime()
            });
          }

          cur.segmentsSaveProcess = false;

          callbackRes = parseInt(callbackRes) || 0;
          var searchPos = parseInt(cur.videoSearchPos);
          if (callbackRes > 0 && !isNaN(searchPos) && cur.videoSearchStats) {
            cur.videoSearchStats.positions[searchPos] = extend({'viewedParts': 0}, cur.videoSearchStats.positions[searchPos]);
            cur.videoSearchStats.positions[searchPos].viewedParts++;
          }
        }
      });

      if (cur.videoSearchStats) {
        if (!cur.videoSearchStats.totalViewedTime) {
          cur.videoSearchStats.totalViewedTime = 0;
        }
        cur.videoSearchStats.totalViewedTime += mvcur.mvData.vsegsSize;

        if (!isNaN(searchPos)) {
          cur.videoSearchStats.positions[searchPos] = extend({'viewedSeconds': 0}, cur.videoSearchStats.positions[searchPos]);
          cur.videoSearchStats.positions[searchPos].viewedSeconds += mvcur.mvData.vsegsSize;
        }
      }
    }
  },

  onLike: function(actionType) {
    Videoview.like(null, true);
    Videoview.sendPlayerStats(1, actionType);
  },

  onAdd: function(rawId, hash, actionType) {
    Videoview.addSmall(rawId, hash);
    Videoview.sendPlayerStats(3, actionType);
  },

  onRemove: function() {
    Videoview.removeVideo();
  },

  onShare: function(actionType) {
    Videoview.share();
    Videoview.sendPlayerStats(2, actionType);
  },

  onSubscribe: function(gid, hash, isSubscribe, actionType) {
    var isClosedCommunity = mvcur && mvcur.mvData ? mvcur.mvData.isClosed : false;
    Videoview.subscribeToAuthor(null, null, gid, hash, isSubscribe, isClosedCommunity, true, 'player');
    Videoview.sendPlayerStats(isSubscribe ? 9 : 10, actionType);
  }
},

cleanUpStoredVSegs: function() {
  if (!window.localStorage) return;

  var now = vkNow();

  for (var key in window.localStorage) {
    if (key.indexOf('vsegs') === 0) {
      var value = localStorage.getItem(key);
      value = JSON.parse(value);

      if ((now - value.ts) > 1000*60*60*24*2) {
        localStorage.removeItem(key);
      }
    }
  }
},

getVideoModule: function(videoId) {
  var m = cur.currentModule ? cur.currentModule() : cur.module;

  if (window.Video && Video.isInVideosList()) {
    m = cur.oid < 0 ? 'community_videos' : (cur.oid == vk.id ? 'profile_own_videos' : 'profile_videos');
  }

  if (m == 'feed' && VideoPlaylist.getCurListId() == 'feed_block') {
    m = 'feed_block';
  }

  if (m == 'feed' && cur.section == 'videos') {
    m = 'feed_videos';
  }

  return m;
},

showPlaylist: function() {
  VideoPlaylist.toggle(true);
},

sendPlayerStats: function(action, type) {
  ajax.post('/al_video.php', { act: 'a_player_stat', action: action, type: type });
},

removeVideo: function() {
  var mv = Videoview.getMvData();

  if (mv && mv.deleteFromAllAlbumsHash) {
    ajax.post('/al_video.php', { act: 'a_delete_from_all_albums', vid: mv.vid, oid: mv.oid, target_id: vk.id, hash: mv.deleteFromAllAlbumsHash }, {});

    if (mv.playlists) {
      each(mv.playlists, function(i, pl) {
        pl.added = false;
      });
    }

    if (window.mvcur) {
      Videoview.initAddButton();
    }

    mv.added = false;
    removeClass(geByClass1('mv_finish_add', 'mv_external_finish'), 'selected');
  }
},

getNextVideosData: function() {
  return VideoPlaylist.getNextVideos().slice(0, 3);
},

getSuggestionsData: function() {
  var mvData = Videoview.getMvData();
  return mvData && mvData.playerSuggestions;
},

getMvData: function() {
  return cur.mvOpts || window.mvcur && mvcur.mvData;
},

getPlayerObject: function() {
  return ge('video_yt') && window.VideoYoutube || ge('video_player') || window.html5video || null;
},

getPlayerObjectEl: function() {
  return ge('video_player') || ge('html5_player') || geByClass1('extra_player') || null;
},

playerOnAdded: function() {
  var pl = Videoview.getPlayerObject();
  try {
    //todo: strange exception with no reason.
    pl && pl.onAdded && pl.onAdded();
  }
  catch (e) {
  }
},

playerOnLiked: function() {
  var pl = Videoview.getPlayerObject();
  pl && pl.onLiked && pl.onLiked();
},

playerNextTimerUpdate: function() {
  var timerFunc;

  if (mvcur.scrolledAway || mvcur.commentingInProgress || isVisible(window.boxLayerWrap)) {
    timerFunc = 'nextTimerReset';
    mvcur.nextTimerStopped = true;
  } else {
    timerFunc = 'nextTimerStart';
    mvcur.nextTimerStopped = false;
  }

  var td = mvcur.playerPrevTimerFunc == timerFunc ? 100 : 0;
  mvcur.playerPrevTimerFunc = timerFunc;

  clearTimeout(mvcur.playerTimerDebounce);
  mvcur.playerTimerDebounce = setTimeout(function() {
    var player = Videoview.getPlayerObject();
    player && player[timerFunc] && player[timerFunc]();
    mvcur.nextTimer && mvcur.nextTimer[timerFunc] && mvcur.nextTimer[timerFunc]();
  }, td);
},

togglePlay: function(playing) {
  if (ge('video_yt') && window.VideoYoutube) {
    VideoYoutube.togglePlay(playing);
  } else if (window.mvcur && mvcur.player) {
    mvcur.player.togglePlay(playing);
  } else {
    var player = ge('video_player') || window.html5video;
    if (player == window.html5video) {
      player.playVideo(playing, true);
    } else if (player && player.playVideo) {
      player && player.playVideo(playing);
    }
  }
},

sendVideoAdStat: function(oid, vid, hash) {
  if (!cur._vadStatQueue || !cur._vadStatQueue[oid+'_'+vid]) return;
  var st = cur._vadStatQueue[oid+'_'+vid];
  var fromSearch = typeof(cur.vSearchPos) !== 'undefined' && cur.vSearchPos !== null;

  if (!st.events.length) return;

  ajax.post('al_video.php', {
    act: 'ads_stat',
    ev: st.events.join(','),
    ad_type: st.type,
    hash: hash,
    oid: oid,
    vid: vid,
    err: st.err,
    pl_type: st.pl_type,
    from_search: fromSearch
  });

  st.events = [];
},

subscribeToAuthor: function(btn, event, gid, hash, isSubscribe, isClosed, noPlayerUpdate, from) {
  if (!hash) return;

  function _leaveGroup() {
    toggleClass(ge('mv_subscribe_btn_wrap'), 'mv_state_subscribed', isSubscribe);
    toggleClass(ge('mv_subscribed_msg'), 'mv_state_subscribed', isSubscribe);
    ajax.post('al_video.php', { act: 'a_subscribe', gid: gid, hash: hash, unsubscribe: intval(!isSubscribe), from: from });

    var mv = Videoview.getMvData();
    mv.subscribed = isSubscribe;

    if (!noPlayerUpdate) {
      var player = Videoview.getPlayerObject();
      player && player.onSubscribed && player.onSubscribed();
    }

    var finishSubscribeBtn = ge('mv_finish_subscribe_btn');
    if (finishSubscribeBtn) {
      finishSubscribeBtn.innerHTML = isSubscribe ? getLang('video_view_subscribed_msg') : getLang('video_view_subscribe_to_author');
      toggleClass('mv_finish_subscribe', 'mv_finish_subscribed', isSubscribe);
    }
  }

  if (!isSubscribe && isClosed) {
    var box = showFastBox({title: getLang('video_leave_closed_group_title'), bodyStyle: 'padding: 20px; line-height: 160%;', dark: 1, forceNoBtn: 1}, getLang('video_leave_closed_group_text'), getLang('box_yes'), function() {
      box.hide();
      _leaveGroup();
    }, getLang('box_no'));
    Videoview.playerNextTimerUpdate();
  } else {
    _leaveGroup();
  }
},

addPlaylist: function(onlyPrivate) {
  showBox('/al_video.php', {
    act: 'add_playlist_box',
    oid: mvcur.mvData.oid,
    vid: mvcur.mvData.vid,
    only_private: onlyPrivate ? 1 : 0
  }, {
    params: {dark: 1},
    onDone: function(box) {
      box.removeButtons();
      box.addButton(getLang('Save'), function(btn) {
        var title = trim(val('mv_video_playlist_edit_title'));
        var privacy = Privacy.getValue('video_playlist');

        if (!title) return;

        ajax.post('/al_video.php', {
          act: 'a_save_playlist',
          title: title,
          privacy: privacy,
          hash: val('video_playlist_edit_hash'),
          oid: mvcur.mvData.oid,
          vid: mvcur.mvData.vid
        }, {
          showProgress: lockButton.pbind(btn),
          hideProgress: unlockButton.pbind(btn),
          onDone: function(playlistId, text, playlist, video) {
            curBox().hide();
            text && showDoneBox(text);
            mvcur.mvData.playlists.push({id: playlistId, added: true, title: clean(title), private: intval(privacy)});
            Videoview.initAddButton();
            if (window.Video && playlist) {
              playlist = eval('('+playlist+')');
              Video.updateAlbum(playlistId, false, playlist);
              if (video) {
                video = eval('('+video+')');
                Video.updateVideo(vk.id, video, [], false, [playlistId]);
              }
            }
          }
        });
      });
    }
  });
  Videoview.playerNextTimerUpdate();
},
updateVideo: function(oid, vid, newTitle, newDesc) {
  if (!window.mvcur || mvcur.mvData.oid != oid || mvcur.mvData.vid != vid) return;
  mvcur.mvData.title = newTitle;
  mvcur.mvData.desc = newDesc;
  Videoview.setTitle();
  Videoview.setDesc();
},

setAddButtonStateAdded: function() {
  if (window.mvcur && mvcur.mvShown) {
    mvcur.mvData.published = true;
    triggerEvent('mv_add_button', 'setAdded');
  }
},

initAddButton: function() {
  if (mvcur.addButtonTT) {
    mvcur.addButtonTT.destroy();
    mvcur.addButtonTT = null;
  }

  var forceAdded = mvcur.mvData.uploaded;
  var noPublicAdd = mvcur.mvData.noPublicAdd;

  var btn = ge('mv_add_button'), isAddedState = false;
  if (!btn) return;

  function initTooltip(addToDefaultList) {
    mvcur.addButtonTT = mvcur.addButtonTT || new ElementTooltip(btn, {
      elClassWhenTooltip: 'mv_no_active',
      onFirstTimeShow: function(content) {
        var playlistsHtml = '<div id="mv_pl_tt">' + (noPublicAdd ? '<div class="mv_tt_private_only">' + getLang('video_only_private_video') + '</div>' : '') + '<div class="mv_tt_playlists' + (noPublicAdd ? ' with_border' : '') + '">';
        each(mvcur.mvData.playlists, function(i, pl) {
          var isAdded = pl.added || addToDefaultList && pl.id == mvcur.mvData.PLAYLIST_ADDED_ID;
          var privateIcon = pl.private ? '<span class="mv_tt_playlist_private_icon" onmouseover="showTooltip(this,{black:1,text: \'' + getLang('video_album_is_private_tt') +  '\', shift:[16, 8, 0]})"></span>' : '';
          playlistsHtml += '\
<div class="mv_tt_playlist">\
  <div class="checkbox' + (isAdded ? ' on' : '') + (pl.disabled ? ' disabled' : '') + '" data-id="' + pl.id + '" onclick="checkbox(this);">' + clean(pl.title) + '</div>' + privateIcon + '\
</div>\
          ';
        });
        playlistsHtml += '</div>';
        playlistsHtml += '<div class="mv_tt_add_playlist" onclick="Videoview.addPlaylist(' + noPublicAdd + ')"><span class="mv_tt_plus_icon"></span>' + (noPublicAdd ? getLang('video_add_private_album') : getLang('video_add_album')) + '</div></div>';

        content.innerHTML = playlistsHtml;

        each(geByClass('mv_tt_playlist', content), function() {
          var cb = domFC(this);
          addEvent(cb, 'click', togglePlaylist);

          if (addToDefaultList && attr(cb, 'data-id') == mvcur.mvData.PLAYLIST_ADDED_ID) {
            triggerEvent(cb, 'click');
          }
        });
      }
    });
  }

  function toggleButtonState(added, forceDefaultCheck, noPlayerUpdate) {
    added = forceAdded ? true : added;

    var addedIcon = geByClass1('mv_added_icon', btn);
    var plusIcon = geByClass1('mv_plus_icon', btn);
    var btnText = geByClass1('mv_add_text', btn);

    toggleClass(plusIcon, 'mv_add_icon_curr', !added);
    toggleClass(plusIcon, 'mv_add_icon_down', added);
    toggleClass(addedIcon, 'mv_add_icon_curr', added);

    removeEvent(btn, 'click', onClick);
    removeEvent(btn, 'setAdded', onClick);

    if (added) {
      btnText.innerHTML = getLang('video_added_to_my_playlist');
      initTooltip(forceDefaultCheck);
    } else {
      btnText.innerHTML = getLang('video_add_to_my_playlist');
      mvcur.addButtonTT && mvcur.addButtonTT.destroy();
      mvcur.addButtonTT = null;

      addEvent(btn, 'click', onClick);
      addEvent(btn, 'setAdded', onClick);
    }

    if (!noPlayerUpdate && isAddedState != added) {
      Videoview.playerOnAdded();
    }

    isAddedState = added;
    var mv = Videoview.getMvData();
    mv.added = added;
  }

  function onClick(event) {
    if (!mvcur.mvData.published) {
      Videoview.showAddDialog(mvcur.mvData.oid + '_' + mvcur.mvData.vid);
    } else {
      toggleButtonState(true, true, event.type == 'setAdded');
      mvcur.addButtonTT.show();
    }
  }

  function atLeastOneChecked() {
    var atLeastOne = false;
    each(mvcur.mvData.playlists, function(i, pl) {
      if (pl.added) {
        atLeastOne = true;
        return false;
      }
    });
    return atLeastOne;
  }

  function togglePlaylist(evt) {
    var el = evt.currentTarget || evt.target;
    if (hasClass(el, 'disabled')) return;
    var playlistChecked = isChecked(el);
    var playlistId = +el.getAttribute('data-id');

    each(mvcur.mvData.playlists, function(i, pl) {
      if (pl.id == playlistId) {
        pl.added = playlistChecked;
        return false;
      }
    });

    ajax.post('/al_video.php', { act: 'a_add_to_playlist', oid: mvcur.mvData.oid, vid: mvcur.mvData.vid, hash: mvcur.mvData.playlistAddHash, playlist_id: playlistId, add: +playlistChecked, info: window.Video && Video.isInCatalog() ? VideoPlaylist.getCurListId() : '' },
      {
        onDone: function(playlists) {
          var added = [],
              removed = [];

          if (playlistChecked) {
            added.push(playlistId);
            var index = playlists.indexOf(playlistId);
            playlists.splice(index, 1);
          } else {
            removed.push(playlistId);
            playlists.push(playlistId);
          }

          if (mvcur.mvData.info && window.Video && !Video.isInCatalog()) {
            Video.updateVideo(vk.id, mvcur.mvData.info, playlists, false, added, removed);
          }
        }
      });

    toggleButtonState(atLeastOneChecked());

    cancelEvent(evt);
  }

  if (noPublicAdd) {
    initTooltip(false);
  } else {
    toggleButtonState(forceAdded || atLeastOneChecked(), false, true);
  }

},

locNav: function(ch, old, nw) {
  nw = nav.toStr(nw);
  var m = nw.match(/^video(-?\d+_\d+)$/);
  if (!m) {
    Videoview.hide();
    return;
  }
},

showPlayer: function(force) {
  var el = ge('video_player');
  if (!el) return;
  if (!force && el.getAttribute('preventhide') && !browser.safari_mobile) return;
  if (browser.msie) {
    setStyle(el, {position: 'static', top: 0});
  } if (browser.safari_mobile) {
    show(el);
  } else {
    el.style.visibility = 'visible';
  }
},

hidePlayer: function(force) {
  var el = ge('video_player');
  if (!el) return;
  if (!force && el.getAttribute('preventhide') && !browser.safari_mobile) return;
  if (browser.msie) {
    setStyle(el, {position: 'absolute', top: '-5000px'});
  } if (browser.safari_mobile) {
    hide(el);
  } else {
    el.style.visibility = 'hidden';
  }
},

init: function() {
  window.mvcur = {};

  if (window.mvLayer) {
    return;
  }
  window.mvLayer = ce('div', {
    id: 'mv_layer'
  });

  addEvent(mvLayer, 'mousemove', function() {
    mvcur.mousemoved = true;
    if (mvcur.blackout) {
      Videoview.moveCheck();
    }
  });

  window.mvLayerWrap = ce('div', {
    id: 'mv_layer_wrap',
    className: 'scroll_fix_wrap fixed layer_wrap'
  });

  mvLayerWrap.appendChild(window.mvLayer);

  bodyNode.appendChild(mvLayerWrap);

  window.mvLayer.style.width = (lastWindowWidth - sbWidth() - 2) + 'px';

  addEvent(mvLayerWrap, 'scroll', videoview.viewScroll);
},

moveCheck: function() {
  if (!mvcur.mousemoved) {
    if (!mvcur.blackout && !mvcur.finished && isVisible(layerBG)) {
      mvcur.blackout = true;
      animate(layerBG, {opacity: 0.9}, 5000);
    }
  } else if (mvcur.blackout) {
    mvcur.blackout = false;
    if (isVisible(layerBG)) {
      animate(layerBG, {opacity: 0.8}, 200);
    } else {
      setStyle(layerBG, {opacity: 0.8});
    }
  }
  mvcur.mousemoved = false;
},

show: function(ev, videoRaw, listId, options) {
  var _a = window.ap;
  if (_a && _a.isPlaying()) {
    _a.pause();
    _a.pausedByVideo = 1;
  }
  window.forcePauseAudio = true;

  if (options && options.autoplay) {
    Videoview.playerCallback.onVideoStreamPlaying();
  }
  debugLog('show video ' + videoRaw);

  if (window.mvcur && mvcur.minimized) {
    if (options.nomin) {
      if (options.prevLoc) {
        mvcur.mvPrevLoc = options.prevLoc;
      }
      debugLog('unminimizing in show');
      Videoview.unminimize(true, false, true);
    } else {
      if (options.playlistId) {
        Videoview.initPlaylistBlock(videoRaw, options.playlistId, options.catLoadMore);
      } else {
        VideoPlaylist.removeBlock();
      }
      return true;
    }
  }

  if (options.queue) {
    debugLog('pushing in videoview.show');
    layerQueue.push();
    options.queue = false;
  }

  if (!options.noLocChange && nav.objLoc.z && nav.objLoc.z.indexOf('video') == 0) {
    cur.mvHistoryBack = cur.mvHistoryBack || 1;
    cur.mvHistoryBack ++;
  }

  var wasShown = window.mvcur && mvcur.mvShown && !mvcur.minimized;

  if (!wasShown) {
    // cur._keepPlaylistBlock = !!VideoPlaylist.getBlock(); // for next hide
    layerQueue.hide();
    // cur._keepPlaylistBlock = false;
  }

  window.forcePauseAudio = false;

  var prevPlayer = window.mvcur && mvcur.player;

  if (prevPlayer) {
    prevPlayer.unloadVideo();
  }

  if (!prevPlayer || domFC(ge('video_player')) !== prevPlayer.el) {
    val('mv_content', '');
    show('mv_progress');
  }

  this.init();

  mvcur.showTime = new Date().getTime();

  if (false) {//isVisible(mvLayerWrap)) {
    return false;
  } else {
    //do no attach them twice
    removeEvent(window, 'resize', Videoview.onResize);
    removeEvent(document, 'webkitfullscreenchange mozfullscreenchange fullscreenchange', Videoview.onFullscreenChange);
    removeEvent(document, 'keydown', Videoview.onKeyDown);
    removeEvent(mvLayerWrap, 'click', Videoview.onClick);

    addEvent(window, 'resize', Videoview.onResize);
    addEvent(document, 'webkitfullscreenchange mozfullscreenchange fullscreenchange', Videoview.onFullscreenChange);
    addEvent(document, 'keydown', Videoview.onKeyDown);
    addEvent(mvLayerWrap, 'click', Videoview.onClick);

    boxQueue.hideAll();
    layers.wrapshow(mvLayerWrap, 0.8);
    layers.fullhide = Videoview.hide;
  }

  setTimeout(function() {
    layers.wrapshow(mvLayerWrap, 0.8);
    layers.fullhide = Videoview.hide;
  }, 0);

  mvcur.noLocChange = 0; // do return location
  if (options.ad_video) { // videoAds
    options.hideInfo = 1;
    options.noLocChange = 1;
    mvcur.noLocChange = 1;
    mvcur.videoAds = 1;
  }

  mvcur.noHistory = options.noLocChange || options.noHistory;
  mvcur.blackInterval = setInterval(Videoview.moveCheck, 180000);
  mvcur.videoRaw = videoRaw;
  mvcur.options = options;
  mvcur.listId = listId;
  mvcur.mvData = false;
  mvcur.mvShown = true;
  mvcur.player = prevPlayer;

  if (options.prevLoc) {
    mvcur.mvPrevLoc = options.prevLoc;
  } else {
    setTimeout(function() {
      var referrer = document.URL;
      Videoview.setLocation(options.noLocChange);
      if (referrer == document.URL) referrer = '';
      setTimeout(window.comScoreUDM && comScoreUDM.pbind(locProtocol+'//'+location.host+'/al_video.php?comscorekw=pageview_candidate', referrer), 10);
    }, 0);
  }

  if (ev && ev.pageX && ev.pageY) {
    extend(mvcur, {mvOldX: ev.pageX, mvOldY: ev.pageY, mvOldT: vkNow()});
  }

  if (wasShown) {
    Videoview.cleanLayerContent();
  } else {
    Videoview.buildLayerContent();
  }

  if (options.minimized) {
    setTimeout(Videoview.minimize.bind(Videoview), 0);
  }

  if (options.playlistId) {
    Videoview.initPlaylistBlock(videoRaw, options.playlistId, options.catLoadMore);
  } else {
    VideoPlaylist.removeBlock();
  }

  Videoview.cleanUpStoredVSegs();

  return false;
},

buildLayerContent: function() {
  var colorClass = 'mv_dark';

  addClass(window.mvLayerWrap, colorClass);
  addClass(window.layerBG, colorClass);

  var showControls = mvcur.options.hideInfo ? 'display: none' : '';

  mvLayer.innerHTML = '\
<div id="mv_container">\
  <div id="mv_box" onclick="mvcur.mvClicked = true;">\
    <div id="mv_approve" style="display: none;"></div>\
    <div id="mv_publish" style="display: none;"></div>\
    <div id="mv_min_layer">\
      <div class="mv_min_header">\
        <div class="mv_mini_control fl_r" onmousedown="return Videoview.hide(false, true);">\
          <div class="mv_close_control"></div>\
        </div>\
        <div class="mv_mini_control fl_r" onclick="return Videoview.unminimize();">\
          <div class="mv_max_control"></div>\
        </div>\
        <div class="mv_min_title" id="mv_min_title"></div>\
      </div>\
    </div>\
    <div class="no_select mv_data">\
      <div class="mv_pl_prev_wrap">\
        <div class="mv_playlist_controls" id="mv_pl_prev" onclick="return VideoPlaylist.prevVideo()">\
          <div class="mv_playlist_controls_icon"></div>\
        </div>\
      </div>\
      <div class="mv_pl_next_wrap">\
        <div class="mv_playlist_controls" id="mv_pl_next" onclick="return VideoPlaylist.nextVideo()">\
          <div class="mv_playlist_controls_icon"></div>\
        </div>\
      </div>\
      <div class="mv_top_controls_wrap">\
        <div id="mv_top_controls">\
          <div onclick="return Videoview.hide(false, true, event, true);" class="mv_top_button"><div class="mv_small_close_icon"></div></div>\
          <div onclick="return Videoview.minimize(event);" class="mv_top_button mv_top_minimize"><div class="mv_minimize_icon"></div></div>\
          <div onclick="return VideoPlaylist.toggle();" class="mv_top_button mv_top_pl_toggle" id="mv_top_pl_toggle"><div class="mv_pl_toggle_icon"></div></div>\
        </div>\
      </div>\
      <div id="mv_progress">' + getProgressHtml() + '</div>\
      <div id="mv_content"></div>\
    </div>\
    <div id="mv_service_btns_wrap">\
      <div id="mv_service_btns"></div>\
    </div>\
    <div class="mv_controls clear_fix" id="mv_controls" style="'+showControls+'"></div>\
    <div id="mv_warning" style="display: none;"></div>\
  </div>\
</div>\
  ';

  if (browser.mobile) {
    setStyle('mv_container', {
      paddingTop: intval(window.pageYOffset) + 10 + 'px'
    });
  }

  Videoview.updateSize();
},

cleanLayerContent: function() {
  val('mv_controls', '');
  toggle('mv_controls', !mvcur.options.hideInfo);

  // val('mv_content', '');
  // show('mv_progress');
},

initPlaylistBlock: function(videoRaw, playlistId, loadMore) {
  if (/^wall_/.test(playlistId) && VideoPlaylist.lists[playlistId] && cur.wallVideos && cur.wallVideos[playlistId]) {
    VideoPlaylist.extendList(playlistId, cur.wallVideos[playlistId].list);
    var forceRebuild = true;
  }

  var plbWasVisible = !!VideoPlaylist.getBlock();
  var plBlockEl = VideoPlaylist.buildBlock(playlistId, videoRaw, forceRebuild);

  toggleClass('mv_container', 'mv_container_has_pl', !!plBlockEl && !mvcur.minimized);

  if (plBlockEl) {
    domByClass(mvLayer, 'mv_data').appendChild(plBlockEl);
    VideoPlaylist.restoreScrollPos();
    VideoPlaylist.updateScrollbar();
    VideoPlaylist.setCurVideo(videoRaw, plbWasVisible);
    VideoPlaylist.updateControls();

    var curListSize = VideoPlaylist.getCurList().list.length;
    if (window.Video && Video.isInVideosList() && vk.id == cur.oid || curListSize < 5) {
      if (!plbWasVisible) {
        VideoPlaylist.toggle(false);
      }
    }
  }

  VideoPlaylist.toggleStateClasses();

  if (isFunction(loadMore)) {
    loadMore(VideoPlaylist.updateBlockList.pbind(playlistId));
  }
},

hide: function(noLoc, force, ev, closeButtonClick) {
  if (!window.mvcur || !force && !mvcur.mvShown) return;

  if (closeButtonClick) {
    var backOnClick = cur.videoBackOnClick;
    cur.videoBackOnClick = false;
    if (backOnClick) return history.back();
  }

  if (cur.videoSearchPos) {
    delete cur.videoSearchPos;
  }

  if (cur.videoSearchStats) {
    cur.videoSearchStats.lastActionTime = new Date().getTime();
  }

  if (!force && mvcur.minimized) {
    if (!mvcur.noLocChange && noLoc !== true) {
      if (noLoc === 2) {
        nav.setLoc(hab.getLoc());
      } else if (!layerQueue.count()) {
        Videoview.backLocation();
      }
    }
    return;
  }
  if (!mvcur.noHistory && !noLoc && !closeButtonClick) {
    mvcur.noHistory = 1;
    mvcur.forceHistoryHide = force;
    __adsUpdate('very_lazy');

    var backSize = cur.mvHistoryBack ? -cur.mvHistoryBack : -1;
    cur.mvHistoryBack = 0;

    setTimeout(function() {
      !mvcur.mvShown && !curBox() && VideoPlaylist.removeBlock();
    }, 10);

    return history.go(backSize);
  }
  if (mvcur.forceHistoryHide) {
    force = mvcur.forceHistoryHide;
    mvcur.forceHistoryHide = false;
  }

  if (mvcur.statusVideo) {
    var icon = ge('mv_like_icon');
    if (icon) {
      var tt = icon.parentNode.tt;
      if (tt && tt.container) {
        re(tt.container);
      }
      if (icon.parentNode.tt) {
        delete icon.parentNode.tt;
      }
    }
  }

  var wasmin = mvcur.minimized;
  if (wasmin) {
    Videoview.unminimize(true, true, true);
    mvcur.minimized = false;
    noLoc = true;
  }

  Wall.cancelEdit(true);

  if (mvcur.mvData.duration > 60 && !force && !mvcur.finished) {
    var openTime = new Date().getTime() - mvcur.showTime, closeText = getLang('video_are_you_sure_close');
    if (openTime > 30000 && closeText != 'are you sure close' && !browser.safari_mobile) {
      var box = showFastBox({title: getLang('video_are_you_sure_close_title'), bodyStyle: 'padding: 20px; line-height: 160%;', dark: 1, forceNoBtn: 1}, closeText, getLang('box_yes'), function() {
        box.hide();
        Videoview.hide(noLoc, true);
      }, getLang('box_no'));
      var checkKey = function(event) {
        if (event.keyCode == 13) {
          box.hide();
          Videoview.hide(noLoc, true)
        }
      }
      addEvent(document, 'keydown', checkKey);
      box.onHide = function() {
        removeEvent(document, 'keydown', checkKey);
      };
      return true;
    }
  }

  if (!window.forcePauseAudio) {
    var _a = window.ap, _n = window.Notifier;
    if (_a && !_a.isPlaying() && _a.pausedByVideo) {
      _a.play();
      delete _a.pausedByVideo;
    }
    if (_n) _n.lcSend('video_hide');
  }

  if (wasmin) {
    hide(mvLayerWrap);
  } else {
    layers.wraphide(mvLayerWrap);
    layers.fullhide = false;
  }

  if (window.tooltips) {
    tooltips.destroyAll(cur.mvBox);
  }

  var colorClass = 'mv_dark';
  removeClass(mvLayerWrap, colorClass);
  removeClass(layerBG, colorClass);

  mvcur.mvShown = mvcur.mvClicked = false;
  removeEvent(window, 'resize', Videoview.onResize);
  removeEvent(document, 'webkitfullscreenchange mozfullscreenchange fullscreenchange', Videoview.onFullscreenChange);
  removeEvent(document, 'keydown', Videoview.onKeyDown);
  removeEvent(mvLayerWrap, 'click', Videoview.onClick);

  if (mvcur.player) {
    mvcur.player.destroy();
    delete mvcur.player;
  }

  if (ge('html5_player') && window.html5video) {
    html5video.destroy();
  }

  if (ge('video_yt') && window.VideoYoutube) {
    VideoYoutube.destroy();
  }

  val('mv_content', '');
  mvcur.changeCanvasSize = false;

  var mvplBlockEl = VideoPlaylist.getBlock();
  // if (mvplBlockEl && !cur._keepPlaylistBlock) {
  //   VideoPlaylist.removeBlock();
  // }
  // cur._keepPlaylistBlock = false;

  if (!wasmin || !isVisible(layerWrap)) {
    debugLog('pop from videoview.hide');
    setTimeout(layerQueue.pop, 0);
  }

  if (mvcur.blackInterval) {
    clearInterval(mvcur.blackInterval);
  }

  if (closeButtonClick && nav.objLoc.z) {
    layerQueue.skipVideo = true;
    delete nav.objLoc.z;
    nav.setLoc(nav.objLoc);
  } else if (!mvcur.noLocChange && noLoc !== true) {
    if (noLoc === 2) {
      nav.setLoc(hab.getLoc());
    } else {
      Videoview.backLocation();
    }
    __adsUpdate('very_lazy');
  }
  __adsUpdate();

  mvcur.bodyScrollTop = scrollNode.scrollTop;
  setTimeout(function() {
    if (mvcur.bodyScrollTop !== undefined) {
      scrollNode.scrollTop = mvcur.bodyScrollTop;
      delete mvcur.bodyScrollTop;
    }
  }, 0);

  vkImage().src = locProtocol + '//www.tns-counter.ru/V13a****pladform_ru/ru/CP1251/tmsec=pladform_videovk-playerend/' + Videoview.playerCallback.randomNumber();

  return false;
},

cmp: function(id1, id2) {
  var l1 = id1.length, l2 = id2.length;
  if (l1 < l2) {
    return -1;
  } else if (l1 > l2) {
    return 1;
  } else if (id1 < id2) {
    return -1;
  } else if (id1 > id2) {
    return 1;
  }
  return 0;
},


onClick: function(e) {
  if (mvcur.mvClicked || e && cur.__mdEvent && e.target != cur.__mdEvent.target) {
    mvcur.mvClicked = false;
    return;
  }
  var dx = Math.abs(e.pageX - intval(mvcur.mvOldX));
  var dy = Math.abs(e.pageY - intval(mvcur.mvOldY));
  if (dx > 3 || dy > 3) {
    if (vkNow() - intval(mvcur.mvOldT) > 300) {
      Videoview.hide();
    }
  }
},

onKeyDown: function(e) {
  if (e.returnValue === false) return false;

  if (e.keyCode == KEY.ESC) {
    if (Videoview.isFS) {
      ge('video_player').toggleFullscreen();
      return false;
    }
    if (mvcur.mvEditing) {
      videoview.cancelInline();
    } else {
      Videoview.hide();
    }
    return cancelEvent(e);
  }
},

onResize: function() {
  var dwidth = lastWindowWidth, dheight = lastWindowHeight, sbw = sbWidth();

  var w = dwidth - sbw - 2 - 120 - 34 - 50, h = dheight - 31 - 28 - 72;
  if (w > 1280) { // less than full hd - not size > 2
    w = 1280;
  } else if (w > 807 && w < 907) { // 1024x768 - not size > 1
    w = 807;
  } else if (w < 604) {
    w = 604;
  }
  if (h < 453) {
    h = 453;
  }
  mvcur.mvWidth = w;
  mvcur.mvHeight = h;

  var sizeChanged = false, oldverybig = mvcur.mvVeryBig;
  mvcur.mvVeryBig = (w > 1280) ? 2 : (w > 807 ? 1 : false);
  sizeChanged = (oldverybig != mvcur.mvVeryBig);

  Videoview.updateExternalVideoFinishBlock();
  Videoview.updateReplyFormPos();
},

onFullscreenChange: function() {
  Videoview.updateExternalVideoFinishBlock();
},

updateSize: function() {
  if (mvcur.minimized) {
    return false;
  }

  var docEl = document.documentElement;
  var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;

  var rate = 2;
  if (!isVisible('mv_controls')) {
    rate = 1.2;
  }
  setStyle('mv_container', {
    top: Math.max((ch - 800) / rate, 50) + 'px'
  });

  onBodyResize();
  Videoview.onResize();
},

getPrevLoc: function() {
  mvcur.mvPrevLoc = {};
  for (var i in nav.objLoc) {
    if (i != 'z' || !nav.objLoc[i].match(new RegExp('^video' + mvcur.videoRaw, ''))) {
      mvcur.mvPrevLoc[i] = nav.objLoc[i];
    }
  }
},

setLocation: function(noLocChange) {
  if (mvcur.options.fromPreload) {
    var listData = mvcur.listId.match(new RegExp('([a-z]*)([0-9\-]*)'));
    var claimData = mvcur.listId.match(new RegExp('claim=([0-9]+)'));
    var oid = parseInt(listData[2]);
    mvcur.mvPrevLoc = {'0': 'videos' + oid};
    if (listData[1] != 'videos') {
      mvcur.mvPrevLoc['section']  = listData[1];
    }
    if (claimData && claimData[1]) {
      mvcur.mvPrevLoc['claim'] = claimData[1];
    }
  } else {
    if (noLocChange) {
      mvcur.mvPrevLoc = 'z';
    } else {
      Videoview.getPrevLoc();
    }
  }
  if (noLocChange) {
    return;
  }
  var m = mvcur.videoRaw.match(/^(-?\d+)(photo|video)?_/), owner = intval(m[1]), nl;
  //if (!m[2] && nav.objLoc[0] == 'video' && (owner == vk.id && !nav.objLoc.gid || owner < 0 && nav.objLoc.gid == (-owner)) || owner > 0 && nav.objLoc[0] == 'videos' + owner) {
  //  nl = {'0': 'video' + mvcur.videoRaw + (nav.objLoc.claim ? "?claim=" + nav.objLoc.claim : "")};
  //  if ((mvcur.options || {}).fromQueue) {
  //    mvcur.noHistory = 1;
  //  }
  //} else {
    var videoLocation = 'video' + mvcur.videoRaw, nl;
    if (mvcur.listId) {
      videoLocation += '/' + mvcur.listId;
    }
    if (mvcur.options.playlistId) {
      videoLocation += '/pl_' + mvcur.options.playlistId;
    }

    nl = extend(nav.objLoc, {'z': videoLocation});

  //}
  if (nav.strLoc != nav.toStr(nl)) {
    nav.setLoc(nl);
    if ((mvcur.options || {}).fromQueue) {
      mvcur.noHistory = 1;
    }
  }
  if (mvcur.options) mvcur.options.fromQueue = false;
},

backLocation: function() {
  if (mvcur.mvPrevLoc == 'z' || !mvcur.mvPrevLoc && nav.objLoc.z) {
    var loc = clone(nav.objLoc);
    delete loc.z;
    nav.setLoc(loc);
  } else if (mvcur.mvPrevLoc) {
    nav.setLoc(mvcur.mvPrevLoc);
  } else if (nav.objLoc[0] == 'video' || nav.objLoc[0].match(/^video-?\d+_\d+/)) {
    nav.setLoc({'0': 'video'});
  }
  if (mvcur.options.prevTitle) {
    window.document.title = replaceEntities(stripHTML(mvcur.options.prevTitle));
    delete mvcur.options.prevTitle;
  }
  mvcur.noHistory = 1;
},

highlightComment: function(el) {
  el = ge(el);
  if (!el) return;

  var hlfunc = animate.pbind(el, {backgroundColor: '#ECEFF3'}, 200, function() {
    setTimeout(function() {
      animate(el, {backgroundColor: '#FFF'}, 200);
    }, 1000);
  }), top = getXY(el, true)[1];

  if (top < 0 || top > lastWindowHeight - 200) {
    animate(mvLayerWrap, {scrollTop: mvLayerWrap.scrollTop + top - 50}, 300, hlfunc);
  } else {
    hlfunc();
  }
},
showComment: function(replyId) {
  var post = ge('post' + replyId);
  if (post) {
    Videoview.highlightComment(post);
  } else {
    Videoview.moreComments(replyId);
  }
  return false;
},
commActionDone: function(commId, from, text, del, script) {
  // var node = ge(from + '_comment' + commId);
  var node = ge('post' + commId.split('_').join('video_') + from);
  if (!node) return;

  var comment = domByClass(node, 'reply_wrap');
  var msg = domByClass(node, 'dld');

  if (!text) { // restore comment
    re(msg);
    show(comment);
    if (from == 'mv') {
      ++mvcur.mvData.commcount;
      ++mvcur.mvData.commshown;
    } else {
      ++cur.commentsCount;
      ++cur.commentsShown;
    }

    Videoview.updateComms(from);
    return;
  }

  hide(comment);
  node.appendChild(se(text));

  if (del) {
    if (from == 'mv') {
      --mvcur.mvData.commcount;
      --mvcur.mvData.commshown;
    } else {
      --cur.commentsCount;
      --cur.commentsShown;
    }
    Videoview.updateComms(from);
  } else {
    if (from == 'mv') {
      Videoview.recache();
      // if (!cur.mvComments) cur.mvComments = {};
      // cur.mvComments[mvcur.videoRaw] = ge('mv_comments_wrap');
    }
  }
  if (script) {
    eval(script);
  }
},

commAction: function(act, oid, cid, hash) {
  var replyEl = ge('post' + oid + 'video_' + cid + 'mv'),
      actionsEl = domByClass(replyEl, 'post_actions'),
      btn = ge('reply_' + act + oid + 'video_' + cid + 'mv'),
      from = 'mv';

  attr(replyEl, 'data-action', act);
  if (btn) {
    tooltips.hide(btn);
  }

  ajax.post('al_video.php', {
    act: act + '_comment',
    comment: oid + '_' + cid,
    hash: hash,
    videoview: 1,
    from: from
  }, {
    onDone: Videoview.commActionDone.pbind(oid + '_' + cid, from),
    showProgress: addClass.pbind(actionsEl, 'post_actions_progress'),
    hideProgress: removeClass.pbind(actionsEl, 'post_actions_progress'),
    stat: ['privacy.js', 'privacy.css']
  });
},

moreComments: function(showReply) {
  if (!isVisible('mv_comments_header') || hasClass(domFC(ge('mv_comments_header')), 'pr')) {
    return;
  }

  if (showReply && Videoview.cmp(domFC(ge('mv_comments')).id, 'post'+showReply) < 0) {
    return;
  }

  var mv = mvcur.mvData;
  var commlink = ge('mv_comments_link');
  ajax.post('al_video.php', {act: 'video_comments', offset: mv.commshown, video: mv.videoRaw}, {
    onDone: function(text, names) {
      Videoview.receiveComms(text, names, true, showReply);
      if (showReply && ge('post' + showReply)) {
        Videoview.showComment(showReply);
      }
    },
    showProgress: function() {
      var commHeader = ge('mv_comments_header');
      mvcur.mvCommInfo = commHeader.innerHTML;
      commHeader.innerHTML = '';
      showProgress(commHeader);
    }, hideProgress: function() {
      ge('mv_comments_header').innerHTML = mvcur.mvCommInfo;
    }
  });
},

updateComms: function(from) {
  if (from == 'review') {
    Video.changeSummary();
    return;
  }

  var mvData = mvcur.mvData;
  var commshown = '';
  if (mvData.commcount > mvData.commshown) {
    commshown = getLang('video_show_previous_comments', mvData.commcount - mvData.commshown);
  }
  if (mvData.commcount) {
    val('mv_comments_summary', getLang('video_comments_summary', mvData.commcount));
  }
  setStyle('mv_comments_summary', {
    display: mvData.commcount ? null : 'none'
  });

  toggleClass('mv_comments_header', 'mv_comments_expanded', !commshown);
  toggleClass('mv_comments_summary', 'mv_comments_expanded', !commshown);

  val('mv_comments_header', commshown);

  Videoview.recache();
  // if (!cur.mvComments) cur.mvComments = {};
  // cur.mvComments[mvcur.videoRaw] = ge('mv_comments_wrap');
},
showEditReply: function(event) {
  mvcur.commentingInProgress = true;
  Videoview.playerNextTimerUpdate();
},
hideEditReply: function(event) {
  mvcur.commentingInProgress = false; // TODO: do it on input blur event
  var post = mvcur.post;
      rf = ge('reply_field' + post),
      composer = rf && data(rf, 'composer');

  if (composer) {
    Composer.reset(composer);
  } else {
    val(rf, '');
  }

  Wall.hideEditReply(post);
  mvcur.mvReplyTo = false;
  Videoview.updateReplyFormPos();
  setTimeout(Videoview.updateReplyFormPos, 10);
},
commentClick: function(el, event, from, commId) {
  if (Wall.checkReplyClick(el, event)) return;

  mvcur.mvReplyTo = [from, commId];
  Wall.replyTo(mvcur.post, commId, from);
},

receiveComms: function(text, names, prev, toUp) {
  var newComments = ce('div', {innerHTML: text}),
      comms = ge('mv_comments'),
      current,
      last = current = domLC(comms),
      frm = getXY(current, true)[1],
      mvData = mvcur.mvData,
      el;

  while (el = domLC(newComments)) {

    while (current && Videoview.cmp(current.id, el.id) > 0) {
      // find last comment with id less than or equal to id of the new comment
      current = domPS(current);
    }

    if (current && !Videoview.cmp(current.id, el.id)) {
      // found comment with the same id
      // replace it with the fresh version
      comms.replaceChild(el, current);
      current = el;
    } else {

      if (current && domNS(current)) {
        // found the last comment with id less than id of the new comment but not last at all
        comms.insertBefore(el, domNS(current));
      } else if (!current && domFC(comms)) {
        // not found a comment with id less than id of the new comment
        // prepend new comment to the comments container
        if (prev) {
          comms.insertBefore(el, domFC(comms));
        } else {
          --mvData.commshown;
          newComments.removeChild(el);
        }
      } else {
        // comments container is empty or found comment is last
        comms.appendChild(el);
      }

      if (!prev) {
        ++mvData.commcount;
      }
      ++mvData.commshown;
    }

  }

  if (toUp && last) {
    mvLayerWrap.scrollTop += getXY(last, true)[1] - frm;
  }

  // mvData.comments = comms.innerHTML;
  extend(mvcur.mvReplyNames, names);
  window.updateWndVScroll && updateWndVScroll();
  Videoview.updateComms();
  Videoview.updateReplyFormPos();
},
commSaved: function(post) {
  // if (!mvcur.mvShown || mvcur.minimized) return;
  // var comms = ge('mv_comments_wrap'),
  //     vd = comms ? mvcur.videoRaw : false,
  //     comm = post.match(/^(-?\d+)video(_\d+)/);

  // if (!vd || !comm || !ge('mv_comment' + comm[1] + comm[2])) return;
  // if (!cur.mvComments) cur.mvComments = {};
  // cur.mvComments[mvcur.videoRaw] = comms;
},

sendComment: function(post, ev, stickerId) {
  var fld = ge('reply_field' + post),
      comp = fld && data(fld, 'composer'),
      replyToName = (mvcur.mvReplyNames[(mvcur.mvReplyTo || {})[0]] || [])[1],
      btn = ge('reply_button' + post);

  if (stickerId) {
    var params = {message: '', attach1_type: 'sticker', attach1: stickerId};
  } else {
    var params = comp ? Composer.getSendParams(comp, Videoview.sendComment) : {message: trim(val(fld))};
    if (params.delayed) return;

    if (!params.attach1_type && (!params.message || replyToName && !replyToName.indexOf(params.message))) {
      elfocus(fld);
      return;
    }
  }

  ajax.post('al_video.php', Wall.fixPostParams(extend(params, {
    act: 'post_comment',
    video: mvcur.mvData.videoRaw,
    hash: mvcur.mvData.hash,
    fromview: 1,
    videoviewer: 1,
    from_group: isChecked(ge('reply_as_group' + mvcur.post)),
    reply_to: (mvcur.mvReplyTo || {})[1]
  })), {
    onDone: function(text, names) {
      Videoview.receiveComms(text, names);
      val('mv_comments_summary', getLang('video_comments_summary', mvcur.mvData.commcount));
      Composer.reset(comp);
      hide('reply_warn' + post);
      Wall.cancelReplyTo(post);
      mvLayerWrap.scrollTop = 9e9; // scroll to very bottom
    },
    onFail: function(text) {
      if (fld) {
        showTooltip(fld, {text: text, showdt: 200, forcetodown: 0, slide: 15});
        elfocus(fld);
        return true;
      }
    }, showProgress: lockButton.pbind(btn), hideProgress: unlockButton.pbind(btn)
  });
},

activate: function(el, control, fast) {
  if (control == 2) {
    animate(el, {color: '#FFFFFF'}, (typeof(fast) != 'undefined') ? 0 : 200);
  } else {
    animate(el, {opacity: 1}, 200);
  }
},

deactivate: function(el, control) {
  if (control == 2) {
    animate(el, {color: '#777777'}, (typeof(fast) != 'undefined') ? 0 : 200);
  } else {
    animate(el, {opacity: 0.5}, 200);
  }
},

addVideo: function(videoRaw, hash, obj, gid, accessHash, from) {
  if (window.mvcur && mvcur.statusVideo) {
    var params = {
      act: 'external_add',
      status: videoRaw,
      hash: hash,
      from: from || 'videoviewer'
    };
    var url = 'al_video_external.php';
  } else {
    var params = {
      act: 'a_add',
      video: videoRaw,
      hash: hash,
      from: from || 'videoviewer',
      module: cur.module || '',
      info: window.Video && Video.isInCatalog() ? VideoPlaylist.getCurListId() : ''
    };
    if (gid) {
      params.gid = gid;
    }
    var url = 'al_video.php';
  }
  if (accessHash) {
    params['access_hash'] = accessHash;
  }
  ajax.post(url, params, {
    onDone: function(text, row, hash, shareHash) {
      if (obj) {
        obj.parentNode.innerHTML = text;
      }
      try {
        if (!isArray(row))
          row = eval('('+row+')');
      } catch(e) {
      }
      // if (window.Video && cur.oid && (vk.id == cur.oid || gid)) {
      //   Video.addToList('all', row);
      // }
      if (window.mvcur) {
        if (mvcur.mvData && mvcur.mvData.afterAdd) {
          mvcur.mvData.afterAdd(row[0]+'_'+row[1], shareHash);
        } else if (row) {
          mvcur.mvData.addedVideo = row[0]+'_'+row[1];
          mvcur.mvData.addedVideoHash = hash;
          mvcur.mvData.addedVideoShareHash = shareHash;
        }
      }
      var videoEl = ge('video_cont'+videoRaw);
      if (videoEl) {
        addClass(videoEl, 'video_row_added');
      }
      if (from == 'list') {
        showDoneBox(text);
      }
      if (window.Video && !Video.isInCatalog()) {
        Video.updateVideo(cur.oid, row, [], false, [-2]);
      }
      Videoview.setAddButtonStateAdded();
    }
  });
  return false;
},

likeUpdate: function(my, count, title, nott) {
  count = intval(count);

  var mvData = Videoview.getMvData();

  var likeType = (window.mvcur && mvcur.statusVideo) ? 'wall' : 'video';

  var rows = ge('like_table_' + likeType + mvData.videoRaw);
  var titleNode = ge('like_title_' + likeType + mvData.videoRaw)
  var countInput = ge('like_real_count_' + likeType + mvData.videoRaw) || {};

  var wrap = ge('mv_like_wrap');
      icon = domByClass(wrap, '_icon'),
      countNode = domByClass(wrap, '_count');

  mvData.likes = count;
  mvData.liked = my;

  if (!countNode) {
    return;
  }

  var tt = wrap.tt || {},
      opts = clone(tt.opts || {}),
      newleft = (my ? 0 : -36),
      countInput = domByClass(tt.container, '_value'),
      content = domByClass(tt.container, '_content'),
      titleNode = domByClass(tt.container, '_title');

  if (title && titleNode) {
    val(titleNode, title);
  }

  if (countInput) {
    countInput.value = count;
  }

  animateCount(countNode, count);

  toggleClass(wrap, 'my_like', my);
  toggleClass(wrap, 'no_likes', !count);
  toggleClass(content, 'me_hidden', !my);

  if (count) {
    if (!nott && tt.el && !isVisible(tt.container) && !title) {
      tooltips.show(tt.el, extend(opts, {showdt: 0}));
    }
  } else {
    if (tt.el) tt.hide();
  }
},

_isCurrentVideoPublished: function() {
  return cur.mvOpts ? cur._videoPublished : (window.mvcur && mvcur.mvData && mvcur.mvData.published);
},

addSmall: function(videoRaw, hash, gid, accessHash) {
  if (!Videoview._isCurrentVideoPublished()) {
    Videoview.showAddDialog(videoRaw);
  } else {
    if (window.mvcur && mvcur.mvShown) {
      Videoview.setAddButtonStateAdded();
    } else {
      Videoview.addVideo(videoRaw, hash, false, gid, accessHash);
    }
    hide('video_add_action_link');
    addClass(ge('mv_like_line'), 'video_added');
    addClass(geByClass1('mv_finish_add', 'mv_external_finish'), 'selected');
    var mv = Videoview.getMvData();
    mv.added = true;
  }
},

showAddDialog: function(videoRaw) {
  cur._recentAddedVideos = cur._recentAddedVideos || {};
  if (cur._recentAddedVideos[videoRaw]) return;

  var video = videoRaw.split('_');

  showBox('/al_video.php', {
    act: 'show_add_video_box',
    oid: video[0], vid: video[1]
  }, {
    params: { dark: 1 },
    onDone: function(box, addHash) {
      if (!addHash) return;

      box.removeButtons();
      box.addButton(getLang('Save'), function(btn) {
        var title = trim(val('mv_video_add_title'));
        if (!title) return;

        ajax.post('/al_video.php', {
            act: 'a_add_publish_video',
            title: title,
            video_privacy: Privacy.getValue('video_add'),
            videocomm_privacy: Privacy.getValue('videocomm_add'),
            hash: addHash,
            oid: video[0],
            vid: video[1]
          }, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function() {
              cur._recentAddedVideos[videoRaw] = true;
              var videoRaw = mvcur.videoRaw;
              var listId = mvcur.listId;
              Videoview.hide(true, true);
              Videoview.recache(video[0]+'_'+video[1]);
              showVideo(videoRaw, listId);
            }
        });

      });
    }
  });

},

share: function(videoRaw, obj, actionType) {
  if (!vk.id) return;
  var mvData = Videoview.getMvData();
  if (mvData && !mvData.addedVideo) {
    mvData.addedVideo = mvData.videoRaw;
  }
  if (mvData || videoRaw) {
    showBox('like.php', {act: 'publish_box', object: 'video'+(mvData.addedVideo || videoRaw), action_type: actionType}, {onDone: function() {
      if (window.mvcur && mvcur.mvShown) {
        Videoview.playerNextTimerUpdate();
      }
    }});
  }
  return false;
},

like: function(btn, noPlayerUpdate) {
  if (!vk.id) return;

  var mvData = Videoview.getMvData();

  if (!mvData) {
    return;
  }

  var mv = mvData;
  if (window.mvcur && mvcur.statusVideo) {
    var object = 'wall' + mv.videoRaw;
  } else {
    var object = 'video' + mv.videoRaw;
  }

  var info = '';
  if (window.Video && Video.isInCatalog()) {
    var playlistId = VideoPlaylist.getCurListId();
    if (Videocat.isTop3Playlist(playlistId)) {
      info = 'featured';
    } else {
      info = playlistId;
    }
  }

  ajax.post('like.php', {act: 'a_do_' + (mv.liked ? 'un' : '') + 'like', object: object, hash: mv.likeHash, short_view: 1, from: 'videoview', info: info}, {
    onDone: Videoview.likeUpdate.pbind(!mv.liked)
  });

  if (!noPlayerUpdate) {
    Videoview.playerOnLiked();
  }

  toggleClass(geByClass1('mv_finish_like', 'mv_external_finish'), 'selected', !mv.liked);

  Videoview.likeUpdate(!mv.liked, mv.likes + (mv.liked ? -1 : 1), null, noPlayerUpdate);

  Videoview.recache();
},

likeShare: function(hash) {
  if (!vk.id) return;
  var mv = mvcur.mvData;
  if (mvcur.statusVideo) {
    var object = 'wall' + mv.videoRaw;
  } else {
    var object = 'video' + mv.videoRaw;
  }
  var el = ge('like_share_video' + mv.videoRaw), was = isChecked(el);
  checkbox(el);
  ajax.post('like.php', {act: 'a_do_' + (was ? 'un' : '') + 'publish', object: object, hash: hash, short_view: 1, list: mvcur.listId}, {
    onDone: Videoview.likeUpdate.pbind(true)
  });
  Videoview.likeUpdate(true, mv.likes + (mv.liked ? 0 : 1));
},

likeOver: function(element) {
  var mv = mvcur.mvData;

  if (mvcur.statusVideo) {
    var object = 'wall' + mv.videoRaw;
  } else {
    var object = 'video' + mv.videoRaw;
  }

  var linkSize = getSize(ge('mv_like_link'));
  var linkW = linkSize ? linkSize[0] : 20;

  showTooltip(element, {
    url: 'like.php',
    params: {act: 'a_get_stats', object: object, list: mvcur.listId},
    slide: 15,
    shift: [0, 8, 9],
    ajaxdt: 100,
    showdt: 400,
    hidedt: 200,
    typeClass: 'like_tt',
    className: 'mv_like_tt',
    // no_shadow: (mvcur.videoAds || mvcur.statusVideo) ? 1 : 0,
    dir: 'auto',
    init: function (tt) {
      if (!tt.container) return;
      var bp = geByClass1('bottom_pointer', tt.container, 'div');
      var tp = geByClass1('top_pointer', tt.container, 'div');
      setStyle(bp, {marginLeft: linkW + 2});
      setStyle(tp, {marginLeft: linkW + 2});
    }
  });
},

showEditBox: function(vid, oid, ev, isPublish) {
  Videoview.hidePlayer();
  var box = showBox('al_video.php', {act: 'edit_box', vid: vid, oid: oid, is_publish: +isPublish}, {stat: ['privacy.js', 'privacy.css', 'video.css'], dark: 1});
  box.setOptions({onHide: function() {
    Videoview.showPlayer();
  }});
  return ev && cancelEvent(ev);
},

restoreVideo: function(vid, oid, hash, from, ev) {
  var warning = ge('mv_warning');
  if (warning) {
    warning.innerHTML = '<img style="margin-left: 100px;" src="/images/upload.gif" />';
  }
  ajax.post('al_video.php', {
    act: 'restore_video',
    vid: vid,
    oid: oid,
    hash: hash,
    from: from || 'videoviewer'
  }, {
    onDone: function(row) {
      if (from == 'list' && cur.restoreRaw && cur.restoreRaw[oid+'_'+vid]) {
        var rowCont = ge('video_row'+oid+'_'+vid);
        rowCont.innerHTML = cur.restoreRaw[oid+'_'+vid];

        removeClass(rowCont, 'video_row_loading');
        removeClass(rowCont, 'video_row_deleted');
        setStyle(geByClass1('video_row_icon_delete', rowCont), {opacity: 0.8});
        var skipClear = true;
      } else {
        var skipClear = false;
      }
      hide('mv_warning');
      show('mv_controls');
      if (cur.claimedVideoText) {
        ge('video_player').innerHTML = cur.claimedVideoText;
        cur.claimedVideoText = "";
      }
      // if (window.Video) {
      //   Video.addToList('all', row, skipClear);
      // }
    },
    onFail: function(text) {
      setTimeout(showFastBox({title: getLang('global_error'), bodyStyle: 'padding: 20px; line-height: 160%;', dark: 1}, text).hide, 5000);
      return true;
    }
  });
  return cancelEvent(ev);
},
publish: function(oid, vid, hash, obj) {
  if (obj && hasClass(obj, 'loading')) return;
  Videoview.showEditBox(vid, oid, null, true);
},
deleteVideo: function(vid, oid, hash, sure, from, obj, callback) {
  if (obj && hasClass(obj, 'loading')) return;
  ajax.post('al_video.php', {
    act: 'delete_video',
    vid: vid,
    oid: oid,
    hash: hash,
    sure: (sure) ? 1 : 0,
    from: from
  }, {onDone: function(type, removeInfo, text, do_button, cancel_button) {
    Videoview.recache(oid+'_'+vid);
    if (type == 'sure') {
      Videoview.hidePlayer();
      var box = showFastBox({title: removeInfo, bodyStyle: 'padding: 20px; line-height: 160%;', dark: 1}, text);
      box.setOptions({onHide: function() {
        Videoview.showPlayer();
      }});
      box.removeButtons();
      box.addButton(cancel_button, box.hide, 'no');
      box.addButton(do_button, function() {
        box.showProgress();
        Videoview.deleteVideo(vid, oid, hash, true, from, obj, box.hide);
      }, 'yes');
    } else if (type == 'result') {
      if (callback) {
        callback(text);
      }
      if (from == 'videoviewer') {
        if (ge('mv_controls')) {
          hide('mv_controls');
          val('mv_warning', text);
          show('mv_warning');
          hide('mv_publish');
        }
        text = removeInfo;
      }
      if (window.Video && Video.isInVideosList()) {
        Video.updateVideo(cur.oid, [oid, vid], [], true);
        return true;
      }
    }
  }, showProgress: obj ? addClass.pbind(obj, 'loading') : false, hideProgress: obj ? removeClass.pbind(obj, 'loading') : false});
},
deleteVideoOnClaim: function(vid, oid, hash, sure, from, obj) {
  Videoview.deleteVideo(vid, oid, hash, sure, from, obj, function(text) {
    if (from == 'videoviewer') {
      hide('mv_controls');
      cur.claimedVideoText = ge('video_player').innerHTML;
      ge('video_player').innerHTML = text;
    }
  });
},

recache: function(videoRaw) {
  if (!videoRaw && window.mvcur && mvcur.mvData.videoRaw) {
    videoRaw = mvcur.mvData.videoRaw;
  }
  for (var i in ajaxCache) {
    if (i.match(/^\/al_video\.php\#act=show/) && i.match(new RegExp('\&video='+videoRaw+'([^0-9]|$)', ''))) {
      delete(ajaxCache[i]);
    }
  }
},

getVideoCode: function(oid, vid) {
  Videoview.sendVideo(true);
},

reportBox: function(oid, vid) {
  Videoview.hidePlayer();
  showBox('reports.php', {act: 'a_report_video_box', oid: oid, vid: vid}, {onHideAttempt: function() {
    Videoview.showPlayer();
  }, stat: ['ui_controls.js', 'ui_controls.css'], dark: 1});
},

setAdult: function(oid, vid, hash, value, obj) {
  ajax.post('al_video.php', {
    act: 'set_adult_video',
    vid: vid,
    oid: oid,
    hash: hash,
    value: value
  }, {onDone: function(text, label) {
    if (obj) obj.innerHTML = label;
  }});
},

spamVideo: function(oid, vid, hash, obj, from, sure, callback) {
  if (obj) {
    addClass(obj, 'loading');
  }
  ajax.post('al_video.php', {
    act: 'spam_video',
    vid: vid,
    oid: oid,
    hash: hash,
    sure: (sure) ? 1 : 0,
    from: from
  }, {onDone: function(type, title, text, do_button, cancel_button) {
    if (obj) {
      removeClass(obj, 'loading');
    }
    Videoview.recache(oid+'_'+vid);
    if (type == 'sure') {
      Videoview.hidePlayer();
      var box = showFastBox({title: title, bodyStyle: 'padding: 20px; line-height: 160%;', dark: 1}, text);
      box.setOptions({onHide: function() {
        Videoview.showPlayer();
      }});
      box.removeButtons();
      box.addButton(cancel_button, box.hide, 'no');
      box.addButton(do_button, function() {
        box.showProgress();
        Videoview.spamVideo(oid, vid, hash, obj, from, true, box.hide);
      }, 'yes');
    } else if (type == 'result') {
      if (callback) {
        callback();
      }
      if (from == 'videoviewer') {
        if (window.Video) {
          Video.removeFromLists(oid+'_'+vid);
        }
      } if (from == 'list') {
        ge('video_row'+oid+'_'+vid).innerHTML = '<div class="video_row">'+text+'</div>';
        Video.removeFromLists(oid+'_'+vid, true);
        return true;
      }
    } else {
      obj.parentNode.innerHTML = type;
    }
  }});
},

licensed: function(obj, hash) {
  var actionCont = ge('mv_licensed_info');
  (actionCont || obj).innerHTML = '<img src="/images/upload.gif" />';
  show(actionCont);

  ajax.post('al_video.php', {act: 'change_licensed', video: mvcur.mvData.videoRaw, hash: hash}, {onDone: function(text, info) {
    if (actionCont) {
      actionCont.innerHTML = info;
      (info ? show : hide)(actionCont);
    }
    obj.innerHTML = text;
  }});
},
claimed: function(claim_id, action, status) {
  ge('claim_link').innerHTML = getProgressHtml();

  ajax.post('al_claims.php', {act: 'a_' + action, type: 'video', id: mvcur.mvData.vid, owner_id: mvcur.mvData.oid, claim_id: claim_id, extra: status}, {onDone: function() {
    if (action == 'claim') {
      ge('claim_link').innerHTML = '<a onclick="return Videoview.claimed(' + claim_id + ', \'unclaim\', \'' + status + '\');\">\u0412\u0435\u0440\u043D\u0443\u0442\u044C</a>';
    } else {
      ge('claim_link').innerHTML = '<a onclick="return Videoview.claimed(' + claim_id + ', \'claim\', \'' + status + '\');\">\u0418\u0437\u044A\u044F\u0442\u044C</a>';
    }
  }});
},

setStyle: function(label, obj, style) {
  obj = ge(obj);
  if (!mvcur.restoreStyles) {
    mvcur.restoreStyles = {};
  }
  for (var i in style) {
    if (!mvcur.restoreStyles[label]) {
      mvcur.restoreStyles[label] = {};
    }
    mvcur.restoreStyles[label][i] = obj.style[i];
    obj.style[i] = style[i];
  }
},

restoreStyle: function(label, obj) {
  obj = ge(obj);
  setStyle(obj, mvcur.restoreStyles[label]);
},

showVideo: function(title, html, js, desc, serviceBtns, opt) {
  if (!vk.id && !html) {
    setTimeout(function() {
      Videoview.hide(false, true);
      showDoneBox(title);
    }, 500);
    return;
  }

  if (title && !html) { // not available reason message
    val('mv_content', '<div id="video_player" class="video_layer_message">' + title + '</div>');
    hide('mv_progress');
    hide('mv_controls');
    return;
  }

  opt = opt || {};
  cur.lang = extend(cur.lang || {}, opt.lang);
  mvcur.post = opt.post;
  mvcur.maxReplyLength = opt.maxReplyLength;
  mvcur.maxDescriptionLength = opt.maxDescriptionLength;
  mvcur.mvData = opt.mvData;
  mvcur.videoRaw = opt.mvData.videoRaw;
  mvcur.commentsTpl = opt.commentsTpl;
  mvcur.mvMediaTypes = opt.media;
  mvcur.mvMediaShare = opt.share;
  mvcur.mvReplyNames = opt.names || {};
  mvcur.rmedia_types = opt.rmedia_types;
  mvcur.adminLevel = opt.adminLevel;

  if (opt.queueData) {
    mvcur.queueKey = opt.queueData.key;
    mvcur.qversion = opt.qversion;
  }

  mvcur.wallTpl = opt.wallTpl;

  if (opt.pl_list) {
    var lists = JSON.parse(opt.pl_list);
    each(lists, function(id, list) {
      VideoPlaylist.addList(list);
    });

    var playlistId = mvcur.options.playlistId;
    var playlist = VideoPlaylist.getList(playlistId);
    if (playlist) {
      var plBlockEl = VideoPlaylist.buildBlock(playlistId, mvcur.videoRaw, true);

      toggleClass('mv_container', 'mv_container_has_pl', !!plBlockEl);

      if (plBlockEl) {
        domByClass(mvLayer, 'mv_data').appendChild(plBlockEl);
        VideoPlaylist.updateScrollbar();
        VideoPlaylist.toggleStateClasses();
        VideoPlaylist.setCurVideo(mvcur.videoRaw);
        VideoPlaylist.updateControls();
      }
    }
  }

  Wall.cancelEdit(true);

  if (opt.is_vk_player && !opt.is_flv && mvcur.player && mvcur.player.el === domFC(ge('video_player'))) {
    var videoBoxWrap = domByClass(ge('mv_content'), 'video_box_wrap');
    attr(videoBoxWrap, 'id', 'video_box_wrap' + mvcur.videoRaw);
  } else {
    val('mv_content', html);
  }
  hide('mv_progress');

  val('mv_controls', desc);
  val('mv_service_btns', serviceBtns);

  var rf = ge('reply_field' + mvcur.post);
  if (rf) {
    placeholderInit(rf, {editable: 1});
  }

  mvcur.finished = false;

  if (js) {
    eval('(function(){' + js + '})()');
  }

  if (opt['publishAction']) {
    var publishAction = ge('mv_publish');
    publishAction.innerHTML = opt['publishAction'];
    show(publishAction);
  }

  Videoview.updateSize();
  mvcur.changeCanvasSize = function() {
    Videoview.updateSize();
    window.checkRBoxes && checkRBoxes();
  };

  if (mvcur.minimized) {
    Videoview.minimizePlayer();
  }

  if (mvcur.statusVideo) {
    var statusCont = ge('like_count' + mvcur.mvData.videoRaw);
    if (statusCont) {
      var tt = statusCont.parentNode.tt;
      if (tt && tt.container) {
        re(tt.container)
        //re(tt.el);
      }
      if (statusCont.parentNode.tt) {
        delete statusCont.parentNode.tt;
      }
    }
  }

  show('mv_content');
  window.updateWndVScroll && updateWndVScroll();

  if ((mvcur.options || {}).scroll) {
    mvLayerWrap.scrollTop = mvcur.options.scroll;
    mvcur.options.scroll = 0;
  }

  toggle('mv_controls', !mvcur.mvData.noControls && !mvcur.minimized);

  if (!mvcur.mvData.noControls) {
    var titleWidth = (mvcur.minimized) ? mvcur.minSize.wrap.w : false;
    Videoview.setTitle(titleWidth);

    Videoview.initAddButton();

    { // More dd
      var items = [];
      if (mvcur.mvData.publishToGroups) {
        items.push(['_onAddToCommunity', getLang('video_add_to_group')]);
      }
      if (mvcur.mvData.canExport) {
        items.push(['_onExport', getLang('video_export_action')]);
      }
      if (mvcur.mvData.stats) {
        items.push(['_onViewStats', getLang('video_statistics')]);
      }
      if (mvcur.mvData.oid != vk.id && mvcur.mvData.reportReasons && mvcur.mvData.reportReasons.length) {
        items.push(['_onReport', getLang('video_complain')]);
      }
      if (mvcur.mvData.deleteHash && !mvcur.mvData.hideEdit) {
        items.push(['_onDelete', getLang('video_menu_delete')]);
      }

      if (!items.length) {
        re('mv_more');
      } else {
        new InlineDropdown('mv_more', {
          items: items,
          withArrow: true,
          keepTitle: true,
          autoShow: true,
          autoHide: 300,
          headerLeft: -17,
          headerTop: -11,
          sublists: vk.id != mvcur.mvData.oid ? {
            '_onReport': {
              items: mvcur.mvData.reportReasons,
              onSelect: function(id) {
                Videoview.reportFromDD(mvcur.mvData.reportHash, id);
                return true;
              }
            }
          } : {},
          onSelect: function(action) {
            Videoview[action]();
          }
        });
      }
    }

    toggle(ge('mv_edit_button'), mvcur.mvData.editHash && !mvcur.mvData.hideEdit);
  }

  if (!mvcur.mvData.uploaded) {
    Videoview.recache();
  }

  var replyField = ge('reply_field' + mvcur.post);
  if (replyField) {
    addEvent(replyField, 'blur focus', function(ev) {
      mvcur.commentingInProgress = (ev.type == 'focus');
      Videoview.playerNextTimerUpdate();
    });
  }

  Videoview.adaptRecomsHeight();
  Videoview.updateReplyFormPos();

  if (opt.queueData) {
    stManager.add('notifier.js', function() {
      Videoview.checkUpdates(opt.queueData);
    });
  }
},

adaptRecomsHeight: function() {
  var wide = geByClass1('mv_wide_column', 'mv_controls');
  var narrow = geByClass1('mv_narrow_column', 'mv_controls');
  if (!wide || !narrow) return;

  var recomItems = geByClass('mv_recom_item', narrow);

  for (var i = recomItems.length-1; getSize(wide)[1] < getSize(narrow)[1] && i > 0; --i) {
    hide(recomItems[i]);
  }
},

checkUpdates: function(queueData) {
  if (!window.mvcur || !mvcur.mvShown || mvcur.queueKey !== queueData.key) {
    return;
  }

  Notifier.addKey(queueData, Videoview.receiveUpdates);
  setTimeout(Videoview.checkUpdates.pbind(queueData), 25000);
},

receiveUpdates: function(key, data) {
  if (!window.mvcur || !mvcur.mvShown || mvcur.queueKey !== key || !data) {
    return;
  }

  if (data.failed) {
    mvcur.queueKey = null;
    return;
  }

  each(data.events, function() {
    var ev = this.split('<!>'),
        evVer = ev[0],
        evType = ev[1];

    if (evVer != mvcur.qversion) {
      return;
    }

    switch(evType) {
      case 'new_reply':
        Videoview.onNewCommentReceived(ev);
        Videoview.updateComms();
        break;

      case 'edit_reply':
        var el = ge('wpt' + ev[2]);
        if(el && !attr(el, 'data-action'))
        val(el, psr(ev[3]));
        break;

      case 'del_reply':
        var el = ge('post' + ev[2]);
        if (!el) {
          mvcur.mvData.commcount--;
        } else if (!attr(el, 'data-action')) {
          mvcur.mvData.commcount--;
          mvcur.mvData.commshown--;
          re(el);
        }
        Videoview.updateComms();
        break;

      case 'like_reply':
        var replyId = ev[2],
            likesNum = +ev[3],
            likerId = ev[4],
            isUnlike = ev[5];

        var el = ge('wpe_bottom' + ev[2]);
        if (el) {
          var likeWrap = domByClass(el, '_like_wrap');
          var countNode = domByClass(likeWrap, '_count');
          val(countNode, likesNum > 0 ? likesNum : '');
          toggleClass(likeWrap, 'no_likes', !likesNum);
          if (likerId == vk.id) {
            toggleClass(likeWrap, 'my_like', !isUnlike);
          }
        }
        break;

      default:
        debugLog('unhandled video event');
    }
  });

  Videoview.updateReplyFormPos();
},

onNewCommentReceived: function(ev) {
  if (ge('post' + ev[3] + 'video_' + ev[4] + 'mv')) {
    return;
  }

  var commentActionsHtml = '';

  if (mvcur.adminLevel > 0 || ev[3] == vk.id || ev[5] == vk.id) {
    commentActionsHtml += mvcur.commentsTpl.del_reply;
  } else if (ev[3] != ev[5]) {
    commentActionsHtml += mvcur.commentsTpl.spam_reply;
  }

  if (mvcur.adminLevel > 1 && ev[3] == ev[5] || ev[5] == vk.id) {
    commentActionsHtml += mvcur.commentsTpl.edit_reply;
  }

  commentActionsHtml = rs(mvcur.commentsTpl.actions, {actions: commentActionsHtml});

  var dateString = langDate(ev[10] * 1000, getLang('global_short_date_time', 'raw'), 0, []);

  var commentHtml = rs(mvcur.commentsTpl.reply, {
    actions: commentActionsHtml,
    post_oid: ev[3],
    reply_id: ev[3] + 'video_' + ev[4] + 'mv',
    reply_msg_id: ev[4],
    from_id: ev[5],
    name: ev[6],
    photo: ev[7],
    href: ev[8],
    message: ev[9],
    date: dateString,
    to_link: ev[11]
  });

  mvcur.mvReplyNames[ev[5]] = [ev[12], ev[13]];

  ge('mv_comments').insertAdjacentHTML('beforeend', commentHtml);

  mvcur.mvData.commcount++;
  mvcur.mvData.commshown++;
},

onVideoShared: function (action, objectId, listId) {
  if (action == 'publish' && !Videoview._isCurrentVideoPublished()) {
    Videoview.hide(true, true);
    setTimeout(function() {
      if (objectId.indexOf('video') == 0) {
        objectId = objectId.substr('video'.length);
      }
      Videoview.recache(objectId);
      showVideo(objectId, listId);
    }, 100);
  }
},

_onAddToCommunity: function() {
  showBox('/al_video.php', {
    act: 'add_to_club_pl_box',
    oid: mvcur.mvData.oid,
    vid: mvcur.mvData.vid
  }, {
    params: {dark: 1},
    onDone: function(box) {
    }
  });
},

_onDelete: function() {
  var oid = mvcur.mvData.oid,
      vid = mvcur.mvData.vid,
      hash = mvcur.mvData.deleteHash,
      sure = false,
      from = 'videoviewer';

  Videoview.deleteVideo(vid, oid, hash, sure, from);
},

_onExport: function() {
  Videoview.sendVideo(true);
},

_onViewStats: function() {
  showBox('al_stats.php', {
    act: 'video_stat',
    oid: mvcur.mvData.stats.stat_oid,
    vid: mvcur.mvData.stats.stat_vid
  }, {
    params: {
      width: 795,
      bodyStyle: 'padding: 0'
    },
    dark: 1
  });
},

addToClubPlaylistBoxInit: function(box, clubs, hash) {

  function updatePlaylistsDD(id, gid) {
    hide('mv_add_to_club_albums');

    val('mv_add_to_club_albums_list', '');

    if (id == -1) {
      val('mv_add_to_club_gid', '');
      return;
    }

    show('mv_add_to_club_albums_progress');

    ajax.post('/al_video.php', {
      act: 'a_get_club_playlists',
      gid: gid,
      oid: mvcur.mvData.oid,
      vid: mvcur.mvData.vid
    }, {
      onDone: function(playlists) {
        playlistsHtml = '';
        each(playlists, function(i, pl) {
          playlistsHtml += '<div class="mv_add_to_club_albums_list_item checkbox ' + (+pl.added ? 'on' : '') + '" data-id="' + pl.id + '" onclick="checkbox(this)">' + clean(pl.title) + '</div>';
        });

        val('mv_add_to_club_albums_list', playlistsHtml);

        val('mv_add_to_club_gid', gid);

        hide('mv_add_to_club_albums_progress');
        show('mv_add_to_club_albums');
      }
    });
  }

  WideDropdown.deinit('add_to_pl_club_dd');

  mvcur.addToClubPl = WideDropdown.init('add_to_pl_club_dd', {
    defaultItems: clubs,
    noResult: 'no result',
    introText: 'choose',
    onChange: updatePlaylistsDD
  });

  setTimeout(elfocus.pbind('add_to_pl_club_dd_input'), 0);

  box.removeButtons();

  box.addButton(getLang('Save'), function(btn) {
    var gid = val('mv_add_to_club_gid');

    var playlists = [];
    each(geByClass('mv_add_to_club_albums_list_item'), function(i, cb) {
      if (isChecked(cb)) {
        playlists.push(attr(cb, 'data-id'));
      }
    });

    ajax.post('/al_video.php', {
      act: 'a_add_to_playlist',
      hash: hash,
      gid: gid,
      oid: mvcur.mvData.oid,
      vid: mvcur.mvData.vid,
      playlists: playlists.length ? playlists : '0'
    }, {
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn),
      onDone: function() {
        curBox().hide();
        showDoneBox(getLang('video_changes_saved'));
      }
    });
  }, null, true);
},

setTitle: function(len) {
  var title = mvcur.mvData.title || '';

  len = len || 590;
  ge('mv_min_title').innerHTML = Videoview._isCurrentVideoPublished() ? title : '';
  setStyle(ge('mv_min_title'), {maxWidth: Math.max(0, len - 60)});

  var titleEl = ge('mv_title');
  if (titleEl) {
    { // check that title doesn't fits to elements
      var size = getSize(titleEl);
      setStyle(titleEl, { overflow: 'visible', width: 'inherit', position: 'absolute', 'max-width': 'initial' });
      if (size[0] < getSize(titleEl)[0]) {
        titleEl.setAttribute('title', replaceEntities(title));
      }
      setStyle(titleEl, { overflow: '', width: '', position: '', 'max-width': '' });
    }
    val(titleEl, title);
  }
},
expandDescr: function(toggleEl) {
  var fullTextEl = ge('mv_desc_full_text');
  ge('mv_descr_field').innerHTML = fullTextEl.innerHTML;
  Videoview.cleanExpandDescrEls();
},
cleanExpandDescrEls: function() {
  re(ge('mv_desc_full_text'));
  re(ge('mv_descr_expand_toggle'));
},
setDesc: function() {
  if (ge('mv_descr_field')) {
    val(ge('mv_descr_field'), mvcur.mvData.desc || '');
  }
},
getContSize: function() {
  if (!mvcur.contSize) {
    mvcur.contSize = getSize('mv_box');
  }
  return mvcur.contSize;
},

getContPlace: function(event, click) {
  var mask = 0;
  var size = Videoview.getContSize();
  var x = event.clientX - mvcur.minSize.wrap.l;
  var y = event.clientY - mvcur.minSize.wrap.t;
  if (y < 6) mask += 1;
  if (x > size[0] - 20) mask += 2;
  if (y > size[1] - 10) mask += 4;
  if (x < 10) mask += 8;
  if (mask == 1 && x > size[0] - 55) {
    mask = 0;
  }
  if (!mask && y < 25 && x < size[0] - 55) {
    mask += 16;
  }
  return mask;
},

changeCursor: function(event) {
  var mask = Videoview.getContPlace(event);
  var cursor = 'default';
  if (mask && mvcur.minimized) {
    var direction = '';
    if (mask & 1) direction += 'n';
    if (mask & 4) direction += 's';
    if (mask & 2) direction += 'e';
    if (mask & 8) direction += 'w';
    cursor = direction+'-resize';
    if (mask & 16) {
      cursor = 'move';
    }
  }
  setStyle('mv_box', {cursor: cursor});
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
  });
},

startDrag: function(event) {
  if (event.button && event.button !== 1) {
    return;
  }
  var mask = Videoview.getContPlace(event, true);
  if (!mask) {
    return;
  }
  var dragTime = new Date().getTime();

  Videoview.getMinSize();
  extend(mvcur.minSize, {x: event.clientX, y: event.clientY});

  mvcur.resizeDiff = 0;
  mvcur.mvPlayerCont = mvcur.mvPlayer ? domPN(mvcur.mvPlayer) : ge('video_box_wrap' + mvcur.videoRaw);

  if (!mask || mask & 16) {
    var act = Videoview.onMinMove;
  } else {
    var act = Videoview.onMinResize;
  }
  mvcur.resizeMask = mask;
  var cb = function (event) {
    removeEvent(document, 'mouseup', cb);
    removeEvent(document, 'mousemove', act);
    removeEvent(document, 'drag', act);
    var time = new Date().getTime();
    Videoview.getMinSize();
    if (mvcur.resizeDiff < 8 && (time - dragTime) < 400 && (mask & 16 || mask == 1)) {
      Videoview.unminimize();
    }
    removeClass(mvLayerWrap, 'mv_resizing');
    hide('mv_progress');
    addEvent('mv_box', 'mousemove', Videoview.changeCursor);
    ls.set('mv_minSize', mvcur.minSize);
    return false;
  }
  addClass(mvLayerWrap, 'mv_resizing');
  show('mv_progress');
  addEvent(document, 'mouseup', cb);
  addEvent(document, 'mousemove', act);
  addEvent(document, 'drag', act);
  removeEvent('mv_box', 'mousemove', Videoview.changeCursor);
  return cancelEvent(event);
},

onMinMove: function(event) {
  if (event) {
    var diffY = event.clientY - mvcur.minSize.y;
    var diffX = event.clientX - mvcur.minSize.x;
  } else {
    var diffY = 0;
    var diffX = 0;
  }
  if (mvcur.minSize.wrap.t + diffY > mvcur.minSize.ch - mvcur.minSize.wrap.h - 15) {
    diffY = mvcur.minSize.ch - mvcur.minSize.wrap.h - mvcur.minSize.wrap.t;
  }
  if (mvcur.minSize.wrap.l + diffX > mvcur.minSize.cw - mvcur.minSize.wrap.w - 25) {
    diffX = mvcur.minSize.cw - mvcur.minSize.wrap.w - mvcur.minSize.wrap.l - 14;
  }
  if (mvcur.minSize.wrap.t + diffY < 15) {
    diffY = -mvcur.minSize.wrap.t;
  }
  if (mvcur.minSize.wrap.l + diffX < 15) {
    diffX = -mvcur.minSize.wrap.l;
  }
  setStyle(mvLayerWrap, {
    top: mvcur.minSize.wrap.t + diffY + 'px',
    left: mvcur.minSize.wrap.l + diffX + 'px'
  });
  mvcur.resizeDiff = Math.max(Math.abs(diffX), Math.max(Math.abs(diffY), mvcur.resizeDiff));
  return (event) ? cancelEvent(event) : false;
},

onMinResize: function(event) {
  var diffL = 0;
  var diffT = 0;
  var mask = mvcur.resizeMask;
  var diffY = (mask & 1 || mask & 4) ? event.clientY - mvcur.minSize.y : 0;
  var diffX = (mask & 2 || mask & 8) ? event.clientX - mvcur.minSize.x : 0;
  if ((mask & 4) && mvcur.minSize.wrap.t + diffY > mvcur.minSize.ch - mvcur.minSize.wrap.h) {
    diffY = mvcur.minSize.ch - mvcur.minSize.wrap.h - mvcur.minSize.wrap.t;
  }
  if ((mask & 1) && mvcur.minSize.wrap.t + diffY < 0) {
    diffY = -mvcur.minSize.wrap.t;
  }
  if ((mask & 2) && mvcur.minSize.wrap.l + diffX > mvcur.minSize.cw - mvcur.minSize.wrap.w - 14) {
    diffX = mvcur.minSize.cw - mvcur.minSize.wrap.w - mvcur.minSize.wrap.l - 14;
  }
  if ((mask & 8) && mvcur.minSize.wrap.l + diffX < 0) {
    diffX = -mvcur.minSize.wrap.l;
  }
  if (mask & 8) {
    diffL = diffX;
    diffX = -diffX;
  }
  if (mask & 1) {
    diffT = diffY;
    diffY = -diffY;
  }
  if (mvcur.minSize.wrap.w + diffX < 250) {
    diffX = 250 - mvcur.minSize.wrap.w;
    if (mask & 8) diffL = -diffX;
  }
  if (mvcur.minSize.wrap.h + diffY < 200) {
    diffY = 200 - mvcur.minSize.wrap.h;
    if (mask & 1) diffT = -diffY;
  }
  var change = Math.abs(diffX) + Math.abs(diffY);
  var wrapW = mvcur.minSize.wrap.w + diffX;
  setStyle(mvLayerWrap, {
    top: (mvcur.minSize.wrap.t + diffT) + 'px',
    left: positive(mvcur.minSize.wrap.l + diffL) + 'px',
    width: wrapW + 'px',
    height: (mvcur.minSize.wrap.h + diffY) + 'px'
  });
  var style = {
    height: (mvcur.minSize.player.h + diffY) + 'px',
    width: (mvcur.minSize.player.w + diffX) + 'px'
  };
  if (!mvcur.flashResizeStyle) {
    if (change > 4) {
      clearTimeout(mvcur.resizeTimeout);
    }
    mvcur.resizeTimeout = setTimeout(function() {
      setStyle(mvcur.mvPlayer, mvcur.flashResizeStyle);
      mvcur.flashResizeStyle = false;
    }, 200);
  }
  mvcur.flashResizeStyle = style;
  setStyle(mvcur.mvPlayerCont, style);

  mvcur.resizeDiff = Math.max(change, mvcur.resizeDiff);
  mvcur.contSize = false;
  Videoview.setTitle(wrapW);
  if (mvcur.player) {
    mvcur.player.resize();
  }
  if (ge('html5_player') && window.html5video) {
    html5video.onResize();
  }
  if (ge('video_yt') && window.VideoYoutube) {
    VideoYoutube.onResize();
  }

  Videoview.updateExternalVideoFinishBlock();

  return false;
},

minimize: function(ev) {
  ev && cancelEvent(ev);

  if (mvcur.minimized) {
    return false;
  }

  VideoPlaylist.toggleStateClasses();

  mvcur.controlsVisibility = isVisible('mv_controls');
  show('mv_min_header');
  hide('mv_controls');
  hide('mv_top_controls');
  if (isVisible('mv_approve')) {
    mvcur.needShowApprove = true;
    hide('mv_approve');
  } else {
    mvcur.needShowApprove = false;
  }

  Wall.cancelEdit(true);

  addClass(mvLayerWrap, 'mv_minimized');
  if (!mvcur.minSize) {
    mvcur.minSize = ls.get('mv_minSize');
  }

  var colorClass = 'mv_dark';
  removeClass(mvLayerWrap, colorClass);
  removeClass(layerBG, colorClass);
  layers.fullhide = false;

  if (!mvcur.minSize || !Videoview.enabledResize() || !mvcur.minSize.wrap.w) {
    mvcur.minSize = {
      wrap: {
        w: 300,
        h: 198
      }
    }
  }

  var wrap = mvcur.minSize.wrap;
  mvcur.minSize.player = {w: wrap.w - 12, h: wrap.h - 36};

  Videoview.setStyle('mvContainer', 'mv_container', {
    left: '0px',
    top: '0px'
  });

  setStyle(mvLayer, {width: 'auto'});

  if (mvcur.mvData) {
    Videoview.minimizePlayer();
  }

  if (window.tooltips) {
    tooltips.destroyAll('mv_container');
  }

  removeEvent(window, 'resize', Videoview.onResize);
  removeEvent(document, 'webkitfullscreenchange mozfullscreenchange fullscreenchange', Videoview.onFullscreenChange);
  removeEvent(document, 'keydown', Videoview.onKeyDown);

  addEvent(window, 'resize', Videoview.minResize);
  if (Videoview.enabledResize()) {
    addEvent('mv_box', 'mousedown', Videoview.startDrag);
    addEvent('mv_box', 'mousemove', Videoview.changeCursor);
    mvcur.minDestroy = function() {
      removeEvent('mv_box', 'mousedown', Videoview.startDrag);
      removeEvent('mv_box', 'mousemove', Videoview.changeCursor);
      setStyle('mv_box', {cursor: 'default'});
    }
  } else {
    addEvent(ge('mv_min_title'), 'click', Videoview.unminimize);
    mvcur.minDestroy = function() {
      removeEvent(ge('mv_min_title'), 'click', Videoview.unminimize);
    }
  }

  Videoview.setTitle(wrap.w);

  Videoview.minResize();

  Videoview.setStyle('mvLayerWrap', mvLayerWrap, {
    width: mvcur.minSize.wrap.w + 'px',
    height: mvcur.minSize.wrap.h + 'px'
  });

  mvcur.minimized = true;

//  if (window.wkcur && wkcur.shown) {
//    WkView.showLayer();
//  } else {
    layers.wraphide();
//  }

  if (ge('html5_player') && window.html5video) {
    setTimeout(html5video.onResize, 10);
  }
  if (ge('video_yt') && window.VideoYoutube) {
    setTimeout(VideoYoutube.onResize, 10);
  }

  var popLayer = layerQueue.count();
  if (!mvcur.noLocChange) {
    if (false && !mvcur.noHistory) {
      popLayer = false;
      history.go(-1); // return location through history
    } else {
      Videoview.backLocation();
    }
    mvcur.noHistory = 1;
  }

  layerQueue.skipVideo = true;
  if (popLayer) {
    debugLog('pop from minimize');
    layerQueue.pop();
  }

  VideoPlaylist.toggleStateClasses();

  Videoview.updateExternalVideoFinishBlock();

  return false;
},

isMinimized: function() {
  return window.mvcur && mvcur.mvShown && mvcur.minimized;
},

enabledResize: function() {
  return (browser.safari || browser.chrome || browser.mozilla || browser.opera) && !browser['safari_mobile'];
},

minimizePlayer: function() {
  mvcur.mvPlayer = ge('video_player') || ge('extra_player') || ge('html5_player') || ge('video_box_wrap' + mvcur.videoRaw);
  if (mvcur.mvPlayer) {
    var style = {
      width: mvcur.minSize.player.w + 'px',
      height: mvcur.minSize.player.h + 'px'
    };
    Videoview.setStyle('mvPlayer', mvcur.mvPlayer, style);
    Videoview.setStyle('mvPlayerParent', mvcur.mvPlayer.parentNode, style);
    if (mvcur.player) {
      mvcur.player.resize();
    }
    if (ge('html5_player') && window.html5video) {
      html5video.onResize()
    }
    if (ge('video_yt') && window.VideoYoutube) {
      VideoYoutube.onResize();
    }
  }
},

minResize: function() {
  var docEl = document.documentElement;

  mvcur.minSize.ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
  mvcur.minSize.cw = window.innerWidth || docEl.clientWidth || bodyNode.clientWidth;

  var pos = getXY(ge('page_layout'));

  if (mvcur.minSize.wrap.t === undefined) {
    mvcur.minSize.wrap.t = mvcur.minSize.ch - mvcur.minSize.wrap.h;
  }
  if (mvcur.minSize.wrap.l === undefined) {
    mvcur.minSize.wrap.l = Math.max(String(pos[0] - mvcur.minSize.player.w / 2), 30);
  }

  setStyle(mvLayerWrap, {
    left: mvcur.minSize.wrap.l + 'px',
    top: mvcur.minSize.wrap.t + 'px'
  });

  Videoview.onMinMove();

  if (mvcur.minimized) {
    Videoview.getMinSize();
  }
},

unminimize: function(noLoc, beforeHide, noQueue) {
  if (!mvcur.minimized) {
    return;
  }
  if (!noQueue) {
    layerQueue.push();
  }
  if (!beforeHide) {
    layerQueue.hide();
    setTimeout(function() {
      mvcur.noHistory = 1;
      layerQueue.noHistory();
      layers.wrapshow(mvLayerWrap, 0.7);
      layers.fullhide = Videoview.hide;
    }, 0);
  }
  Videoview.hidePlayer(true);

//  if (window.wkLayerWrap && isVisible(window.wkLayerWrap)) {
//    hide(wkLayerWrap);
//  }

  if (mvcur.controlsVisibility) {
    show('mv_controls');
  }
  //show('mv_right_controls');
  hide('mv_min_header');
  show('mv_top_controls');

  mvcur.minimized = false;
  removeClass(mvLayerWrap, 'mv_minimized');
  Videoview.restoreStyle('mvLayerWrap', mvLayerWrap);

  var colorClass = 'mv_dark';
  addClass(mvLayerWrap, colorClass);
  addClass(layerBG, colorClass);

  if (mvcur.needShowApprove) {
    mvcur.needShowApprove = false;
    show('mv_approve');
  }

  Videoview.restoreStyle('mvContainer', 'mv_container');
  if (mvcur.mvPlayer) {
    Videoview.restoreStyle('mvPlayer', mvcur.mvPlayer);
    Videoview.restoreStyle('mvPlayerParent', mvcur.mvPlayer.parentNode);
  }

  Videoview.updateSize();

  addEvent(window, 'resize', Videoview.onResize);
  addEvent(document, 'webkitfullscreenchange mozfullscreenchange fullscreenchange', Videoview.onFullscreenChange);
  addEvent(document, 'keydown', Videoview.onKeyDown);
  removeEvent(window, 'resize', Videoview.minResize);

  if (mvcur.minDestroy) {
    mvcur.minDestroy();
  }
  if (!mvcur.noLocChange && noLoc !== true) {
    Videoview.setLocation();
  }

  onBodyResize(true);

  setStyle(mvLayerWrap, {
    left: '0px',
    top: '0px'
  });

  Videoview.showPlayer(true);

  Videoview.setTitle();

  VideoPlaylist.toggleStateClasses();

  Videoview.viewScroll();

  if (mvcur.player) {
    mvcur.player.resize();
  }
  if (ge('html5_player') && window.html5video) {
    setTimeout(html5video.onResize, 0);
  }
  if (ge('video_yt') && window.VideoYoutube) {
    VideoYoutube.onResize();
  }

  return false;
},

sendVideo: function(isExport) {
  Videoview.hidePlayer();
  var box = showBox('like.php', {act: 'publish_box', object: 'video' + mvcur.videoRaw, list: mvcur.listId, is_export: isExport}, {stat: ['page.js', 'page.css', 'wide_dd.js', 'wide_dd.css', 'sharebox.js']});
  box.setOptions({onHideAttempt: function() {
    Videoview.showPlayer();
    return true;
  }});
  Videoview.playerNextTimerUpdate();
},

showDD: function(obj, dd) {
  clearTimeout(cur.hideShareTimer);
  obj.blur();
  if (hasClass(dd, 'mv_dd_hiding')) {
    return;
  }
  if (isVisible(dd)) {
    return fadeIn(dd, 0);
  }
  if (cur.ddShown) {
    videoview.hideDD(0);
  }
  cur.ddShown = dd;
  setTimeout(addEvent.pbind(document, 'click', Videoview.hideDD), 1);
  show(dd);
},

hideDD: function(timeout) {
  if (timeout > 0) {
    cur.hideShareTimer = setTimeout(Videoview.hideDD.pbind(0), timeout);
    return;
  }
  var dd = cur.ddShown;
  if (!dd) return;
  if (timeout == -1) {
    hide(dd);
  } else {
    addClass(dd, 'mv_dd_hiding')
    fadeOut(dd, 200, function() {
      removeClass(dd, 'mv_dd_hiding')
    });
  }
  removeEvent(document, 'click', Videoview.hideDD);
  cur.ddShown = false;
},

reportFromDD: function(hash, reason) {
  ajax.post('reports.php', {act: 'new_report', type: 'video', reason: reason, hash: hash, oid: mvcur.mvData.oid, item_id: mvcur.mvData.vid}, {
    onDone: function(text) {
      showDoneBox(text);
    },
    showProgress: function() {
    },
    hideProgress: function() {
    }
  });
},

reportComment: function(obj, ev, commentRaw) {
  stManager.add(['privacy.js', 'privacy.css'], function() {
    return Privacy.show(obj, ev, 'report_'+commentRaw);
  });
},

descTT: function(el) {
  return showTooltip(el, {
    text: getLang('video_edit_desc'),
    black: 1,
    shift: [0, 7, 0],
    showdt: 0
  });
},

viewScroll: function() {
  //hardcoded
  var topOffset = 6,
      topControls = ge('mv_top_controls'),
      mvBoxTop = getXY('mv_box', true)[1],
      mvContentHeight = getSize('mv_content')[1],
      pos;

  pos = mvBoxTop - topOffset;
  pos = pos < 0 ? -pos : 0;

  toggleClass('mv_top_controls', 'fixed', pos > 0);
  toggleClass('mv_pl_prev', 'fixed', pos > 0);
  toggleClass('mv_pl_next', 'fixed', pos > 0);

  toggleClass('mv_top_pl_toggle', 'hidden', pos > mvContentHeight);

  mvcur.scrolledAway = pos > mvContentHeight / 3;
  Videoview.playerNextTimerUpdate();

  Videoview.updateReplyFormPos();
},

updateReplyFormPos: function() {
  var replyForm = ge('mv_reply_form'),
      commentsWrap = ge('mv_comments_wrap'),
      replyFormSize = getSize(replyForm),
      replyFormWrap = domPN(replyForm),
      viewportHeight = clientHeight(),
      mvScrollTop = mvLayerWrap.scrollTop,
      mvLayerTop = getXY(mvLayerWrap)[1],
      mvBoxTop = getXY('mv_box')[1] - mvLayerTop,
      mvCommentsTop = getXY(commentsWrap)[1] - mvLayerTop,
      mvCommentsHeight = getSize(commentsWrap)[1],
      mvBoxHeight = getSize('mv_box')[1];

  var fixed = viewportHeight < mvBoxTop + mvBoxHeight && mvCommentsHeight > 0;

  if (fixed) {
    addClass(replyForm, 'mv_reply_form_fixed');
    setStyle(replyForm, {
      bottom: Math.min(viewportHeight - mvCommentsTop - replyFormSize[1], 0) + 'px'
    });
    setStyle(replyFormWrap, {
      width: replyFormSize[0] + 'px',
      height: replyFormSize[1] + 'px'
    });
  } else {
    removeClass(replyForm, 'mv_reply_form_fixed');
    setStyle(replyForm, {
      bottom: null
    });
    setStyle(replyFormWrap, {
      width: null,
      height: null
    });
  }
},

editInline: function(evt) {
  if (evt && evt.target.tagName == 'A' || !window.mvcur || mvcur.mvEditing || !ge('mv_description')) return;

  var videoRaw = mvcur.videoRaw,
      mvShown = mvcur.mvShown,
      mvData = mvcur.mvData,
      noreq = !mvData.desc;

  var onDone = function(text) {
    if (!mvcur.mvShown || mvcur.videoRaw != videoRaw || mvcur.mvShown != mvShown || mvcur.mvEditing) return;

    Videoview.cleanExpandDescrEls();

    mvcur.mvEditing = videoRaw;

    var inputStyle = 'margin-bottom:' + (browser.chrome || browser.safari ? -4 : 0) + 'px';

    var el = ce('div', {
      id: 'mv_edit_text_wrap',
      innerHTML: '<textarea id="mv_edit_text" style="'+inputStyle+'" onkeydown="onCtrlEnter(event, videoview.saveInline)" onkeyup="checkTextLength(mvcur.maxDescriptionLength, this, ge(\'mv_caption_warn\'));" placeholder="' + getLang('video_edit_desc_intro') + '">' + text + '</textarea><div id="mv_caption_warn"></div>'
    });
    ge('mv_description').appendChild(el);

    var input = ge('mv_edit_text');
    setStyle(input, {width: ge('mv_description').offsetWidth + 'px'});

    placeholderInit(input);
    autosizeSetup(input, {minHeight: 18, ignorePadding: true});

    setTimeout(function() {
      show(el);
      elfocus(input);
      addEvent(input, 'blur', videoview.saveInline);
      hide('mv_descr_field');
    }, 1);
  };

  if (!noreq) {
    ajax.post('al_video.php', {act: 'edit_desc', oid: mvData.oid, vid: mvData.vid}, {onDone: onDone, progress: 'mv_inline_edit_pr'});
  } else {
    onDone('');
  }
},
cancelInline: function() {
  mvcur.mvEditing = false;
  removeEvent(ge('mv_edit_text'), 'blur');
  show('mv_descr_field');
  re('mv_edit_text_wrap');
},
saveInline: function() {
  if (!mvcur.mvEditing) return;
  removeEvent(ge('mv_edit_text'), 'blur');

  var videoRaw = mvcur.mvEditing, mvShown = mvcur.mvShown, mvData = mvcur.mvData;
  ajax.post('al_video.php', {act: 'save_desc', oid: mvData.oid, vid: mvData.vid, hash: mvData.editHash, desc: val('mv_edit_text')}, {onDone: function(text) {
    mvData.desc = text;

    var shown = mvcur.mvShown && videoRaw == mvcur.videoRaw && mvShown == mvcur.mvShown;
    if (!shown) return;

    mvcur.mvEditing = false;
    var descField = ge('mv_descr_field');
    val(descField, text || ('<span class="mv_desc_edit">' + getLang('video_edit_desc') + '</span>'));
    descField.onmouseover = text ? videoview.descTT.pbind(descField) : function() {};
    show(descField);
    re('mv_edit_text_wrap');
  }, progress: 'mv_inline_edit_pr'});
},

onExternalVideoEnded: function(container) {
  container = container || domPN(ge('video_player'));
  var containerSize = getSize(container);
  var nextVideo = (Videoview.getNextVideosData() || [])[0];
  var supportsCanvas = !!window.CanvasRenderingContext2D;
  var mv = Videoview.getMvData();

  if (!container || !mv || ge('mv_external_finish')) return;

  var isLiked = mv.liked;
  var isAdded = mv.added;
  var canAdd = mv.can_add;
  var isSubscribed = mv.subscribed;


  var nextBlockHtml = '';
  if (nextVideo && containerSize[0] >= 400 && containerSize[1] >= 300) {
    nextBlockHtml = '\
<div id="mv_finish_next" class="mv_finish_next" onclick="Videoview.onExternalVideoNext(true)">\
  <div class="mv_finish_next_caption">' + getLang('video_player_next_title') + '</div>\
  <div class="mv_finish_next_thumb" style="background-image: url(' + nextVideo.thumb + ')"></div>\
  <div class="mv_finish_next_timer">\
    <canvas class="mv_finish_next_timer_canvas" width="100" height="100"></canvas>\
    <div class="mv_finish_next_timer_play mv_finish_icon"></div>\
  </div>\
  <div class="mv_finish_next_info">\
    <div class="mv_finish_next_title">' + nextVideo.title + '</div>\
    <div class="mv_finish_next_views">' + nextVideo.views + '</div>\
  </div>\
  <div class="mv_finish_next_cancel mv_finish_icon" onclick="Videoview.onExternalVideoNextCancel(event)"></div>\
</div>\
    ';
  } else {
    if (!ge('video_yt')) return;
  }

  var suggestionsData = Videoview.getSuggestionsData();
  var suggestionsCallback = 'onSuggestionClick';
  if (!suggestionsData || !suggestionsData.length) {
    suggestionsData = Videoview.getNextVideosData();
    suggestionsCallback = 'onVideoNext';
  }

  var suggestionsBlockHtml = '';
  if (suggestionsData && suggestionsData.length && containerSize[0] >= 580 && containerSize[1] >= 300) {
    suggestionsBlockHtml = '<div id="mv_finish_suggestions" class="mv_finish_suggestions ' + (nextBlockHtml ? 'hidden' : '') + '">';

    each(suggestionsData, function(i, item) {
      suggestionsBlockHtml += '\
<a class="mv_finish_suggestions_item" onclick="videoCallback([\'' + suggestionsCallback + '\', \'' + item.vid + '\']); return false;" href="//vk.com/video' + item.vid + '" title="' + item.title + '">\
  <div class="mv_finish_suggestions_item_thumb" style="background-image: url(' + item.thumb + ')"></div>\
  <div class="mv_finish_suggestions_item_title">' + item.title + '</div>\
  <div class="mv_finish_suggestions_item_views">' + item.views + '</div>\
</a>\
      ';
    });

    suggestionsBlockHtml += '</div>';
  }

  var extendedActions = false;
  var minActions = false;
  if (!nextBlockHtml && !suggestionsBlockHtml) {
    if (mv.nolikes) {
      return;
    } else if (containerSize[0] > 250 && containerSize[1] > 200) {
      extendedActions = true;
    } else {
      minActions = true;
    }
  }

  var isMinimized = window.mvcur && mvcur.minimized;

  var finishBlock = se('\
<div class="mv_external_finish" id="mv_external_finish" onclick="Videoview.onExternalVideoBgClick(this, event)">\
  <div class="mv_finish_header">\
    <div id="mv_finish_subscribe" class="fl_r mv_finish_subscribe ' + (isSubscribed ? 'mv_finish_subscribed' : '') + '">\
      <button id="mv_finish_subscribe_btn" class="mv_finish_subscribe_btn fl_l" onclick="Videoview.onExternalVideoSubscribe()">' + (isSubscribed ? getLang('video_view_subscribed_msg') : getLang('video_view_subscribe_to_author')) + '</button>\
      <a href="' + mv.authorHref + '" target="_blank" class="fl_r"><img class="mv_finish_author_img" src="' + mv.authorPhoto + '"></a>\
    </div>\
    <div id="mv_finish_title" class="mv_finish_title" style="' + (isMinimized ? 'display:none' : '') + '">' + mv.title + '</div>\
  </div>\
  <div id="mv_finish_actions" class="mv_finish_actions ' + (extendedActions ? 'mv_finish_actions_extended' : '') + ' ' + (!canAdd ? 'mv_finish_actions_cant_add' : '') + ' ' + (minActions ? 'mv_finish_actions_no_content' : '') + '">\
    <div class="mv_finish_like ' + (isLiked ? 'selected' : '') + '" onclick="Videoview.onExternalVideoLike()">\
      <div class="mv_finish_like_icon mv_finish_icon"></div>\
      <div class="mv_finish_liked_icon mv_finish_icon"></div>\
      <div class="mv_finish_like_text">' + getLang('video_i_like') + '</div>\
    </div>\
    <div class="mv_finish_share" onclick="Videoview.onExternalVideoShare()">\
      <div class="mv_finish_share_icon mv_finish_icon"></div>\
      <div class="mv_finish_share_text">' + getLang('video_share_with_friends') + '</div>\
    </div>\
    <div class="mv_finish_add ' + (isAdded ? 'selected' : '') + '" onclick="Videoview.onExternalVideoAdd()">\
      <div class="mv_finish_add_icon mv_finish_icon"></div>\
      <div class="mv_finish_added_icon mv_finish_icon"></div>\
    </div>\
  </div>\
  ' + nextBlockHtml + '\
  ' + suggestionsBlockHtml + '\
</div>\
  ');

  if (!mv.canSubscribe) {
    re(geByClass1('mv_finish_subscribe', finishBlock));
  }

  if (mv.noControls || mv.nolikes) {
    re(geByClass1('mv_finish_actions', finishBlock));
  }

  container.appendChild(finishBlock);

  if (supportsCanvas && nextVideo && nextBlockHtml) {
    mvcur.nextTimer = {
      ctx: geByClass1('mv_finish_next_timer_canvas', finishBlock).getContext('2d'),
      nextTimerReset: function() {
        clearTimeout(mvcur.nextTimer.timeout);
        mvcur.nextTimer.ctx.clearRect(0, 0, 100, 100);
        mvcur.nextTimer.started = null;
      },
      nextTimerStart: function() {
        if (mvcur.nextTimer.started) return;
        mvcur.nextTimer.started = new Date().getTime();
        Videoview.onExternalVideoTimer();
      }
    };

    mvcur.nextTimer.ctx.lineWidth = 6;
    mvcur.nextTimer.ctx.lineCap = 'round';
    mvcur.nextTimer.ctx.strokeStyle = '#fff';

    if (!mvcur.nextTimerStopped) {
      mvcur.nextTimer.nextTimerStart();
    }
  }
},

onExternalVideoTimer: function() {
  if (!window.mvcur || !mvcur.nextTimer || !mvcur.nextTimer.ctx || !mvcur.nextTimer.started) return;

  var progress = Math.min(1, Math.max(0, (new Date().getTime() - mvcur.nextTimer.started) / 10000));
  var ctx = mvcur.nextTimer.ctx;

  ctx.clearRect(0, 0, 100, 100);
  ctx.beginPath();
  ctx.arc(50, 50, 47, -Math.PI/2, -Math.PI/2 + Math.PI*2*progress);
  ctx.stroke();

  if (progress < 1) {
    mvcur.nextTimer.timeout = setTimeout(Videoview.onExternalVideoTimer, 20);
  } else {
    Videoview.onExternalVideoNext();
  }
},

onExternalVideoNext: function(clickedByUser) {
  mvcur.nextTimer = null;
  re('mv_external_finish');
  VideoPlaylist.nextVideo();
  Videoview.sendPlayerStats(clickedByUser ? 6 : 5, 4);
},
onExternalVideoNextCancel: function(event) {
  event && event.stopPropagation();
  clearTimeout(mvcur.nextTimer.timeout);
  mvcur.nextTimer = null;
  if (ge('video_yt')) {
    re('mv_finish_next');
    removeClass('mv_finish_suggestions', 'hidden');
  } else {
    re('mv_external_finish');
  }
},
onExternalVideoBgClick: function(el, evt) {
  if (evt.target === el) {
    re('mv_external_finish');
  }
},
onExternalVideoLike: function() {
  videoCallback(['onLike', 4]);
  var player = Videoview.getPlayerObject();
  player.onLiked && player.onLiked();
},
onExternalVideoShare: function() {
  // window.mvcur && mvcur.nextTimer && mvcur.nextTimer.nextTimerReset && mvcur.nextTimer.nextTimerReset();
  if (Videoview.isFS) {
    var player = Videoview.getPlayerObject();
    player && player.toggleFullscreen && player.toggleFullscreen();
  }
  videoCallback(['onShare', 4]);
},
onExternalVideoAdd: function() {
  var mv = Videoview.getMvData();
  if (!mv) return;
  if (mv.added) {
    videoCallback(['onRemove']);
  } else {
    videoCallback(['onAdd', mv.videoRaw, mv.add_hash, 4]);
  }
  var player = Videoview.getPlayerObject();
  player.onAdded && player.onAdded();
},
onExternalVideoSubscribe: function() {
  var mv = Videoview.getMvData();
  if (!mv) return;
  var isSubscribe = !mv.subscribed;
  var isClosed = mv.isClosed;
  Videoview.subscribeToAuthor(null, null, mv.oid, mv.subscribeHash, isSubscribe, isClosed, false, 'external_player');
  Videoview.sendPlayerStats(isSubscribe ? 9 : 10, 4);
},

updateExternalVideoFinishBlock: function() {
  var finishBlock = ge('mv_external_finish');
  if (!finishBlock) return;

  var containerSize = getSize(finishBlock);
  if (
    isVisible('mv_finish_next') && (containerSize[0] < 400 || containerSize[1] < 300)
    || isVisible('mv_finish_suggestions') && (containerSize[0] < 580 || containerSize[1] < 300)
    || hasClass('mv_finish_actions', 'mv_finish_actions_extended') && (containerSize[0] < 250 || containerSize[1] < 200)
  ) {
    if (mvcur.nextTimer) {
      Videoview.onExternalVideoNextCancel();
    }
    re('mv_finish_next');
    re('mv_finish_suggestions');
    removeClass('mv_finish_actions', 'mv_finish_actions_extended');
    addClass('mv_finish_actions', 'mv_finish_actions_no_content');
  }

  toggle('mv_finish_title', !(window.mvcur && mvcur.minimized));
  toggleClass('mv_finish_subscribe', 'mv_finish_subscribe_min', containerSize[0] < 500);
},

removeExternalVideoFinishBlock: function() {
  if (window.mvcur && mvcur.nextTimer) {
    Videoview.onExternalVideoNextCancel();
  }
  re('mv_external_finish');
},
}, videoview = Videoview;



var VideoPlaylist = {
  VIDEOS_LIMIT: 100,

  lists: {},

  blockTpl: '\
<div class="video_plb_wrap" id="video_mvpl" onmouseenter="VideoPlaylist.toggleHeaderButtons(this, true)" onmouseleave="VideoPlaylist.toggleHeaderButtons(this, false)">\
  <div class="video_plb_header clear_fix">\
    <div class="video_plb_header_buttons unshown">\
      <div id="mv_pl_autoplay" class="video_plb_header_btn %autoplayBtnClass%" onmouseover="VideoPlaylist.showAutoplayTooltip(this);" onclick="VideoPlaylist.toggleAutoplay(this)"><div class="video_plb_header_autoplay_icon"></div></div>\
      <div id="mv_pl_reverse" class="video_plb_header_btn _opaque" onmouseover="VideoPlaylist.showReverseTooltip(this);" onclick="VideoPlaylist.toggleReverse(this)"><div class="video_plb_header_reverse_icon"></div></div>\
    </div>\
    <div class="video_plb_header_title">%title%</div>\
  </div>\
  <div class="video_plb_list">\
    <div class="video_plb_list_cont">\
      %items%\
    </div>\
  </div>\
</div>\
  ',

  blockItemTpl: '\
<a class="video_plb_video %itemClass%" onclick="return VideoPlaylist.showVideo(\'%vid%\');" data-vid="%vid%" href="/video%vid%">\
  <div class="video_plb_v_thumb" style="background-image: url(\'%thumb%\');">\
    <div class="video_plb_v_duration video_plb_v_duration">%duration%</div>\
  </div>\
  <div class="video_plb_v_info">\
    <div class="video_plb_v_title">%title%</div>\
    <div class="video_plb_v_views">%views%</div>\
  </div>\
</a>\
  ',

  toggleHeaderButtons: function(wrap, doShow) {
    toggleClass(domByClass(wrap, 'video_plb_header_buttons'), 'unshown', !doShow);
  },

  showReverseTooltip: function(el) {
    showTooltip(el, {text: getLang('video_playlist_reverse_tt'), shift: [7,7,0], showdt: 0, black: 1});
  },

  showAutoplayTooltip: function(el) {
    var isEnabled = VideoPlaylist.isAutoplayEnabled(),
        langKey = 'video_playlist_autoplay_' + (isEnabled ? 'disable' : 'enable') + '_tt',
        text = getLang(langKey);

    showTooltip(el, {text: text, shift: [7,7,0], showdt: 0, black: 1});
  },

  toggleAutoplay: function(el) {
    var isDisabled = !!ls.get('mv_pl_autoplay_disabled');
    toggleClass(el, '_active', isDisabled);
    if (isDisabled) {
      ls.remove('mv_pl_autoplay_disabled');
    } else {
      ls.set('mv_pl_autoplay_disabled', '1');
    }
    tooltips.destroy(el);
    VideoPlaylist.showAutoplayTooltip(el);
  },

  isAutoplayEnabled: function() {
    return !ls.get('mv_pl_autoplay_disabled');
  },

  toggleReverse: function(el) {
    var playlist = VideoPlaylist.getCurList();
    if (!playlist) return;

    playlist.reversed = !playlist.reversed;

    toggleClass(el, '_active', playlist.reversed);

    VideoPlaylist.updateBlockList(playlist.id);
  },

  buildBlock: function(playlistId, videoRaw, force) {
    var curBlockEl = VideoPlaylist.getBlock();
    var playlist = curBlockEl ? data(curBlockEl, 'playlist') : false;

    if (playlist && playlist.id == playlistId && !force) {
      return curBlockEl;
    }

    VideoPlaylist.removeBlock();

    var playlist = VideoPlaylist.getList(playlistId, videoRaw);
    if (!playlist || playlist.list.length <= 1) return false;

    var tpl = trim(VideoPlaylist.blockTpl);

    var itemsHtml = VideoPlaylist.buildBlockList(playlist);

    var blockEl = se(rs(tpl, {
      items: itemsHtml,
      title: playlist.title || '',
      autoplayBtnClass: VideoPlaylist.isAutoplayEnabled() ? '_active' : ''
    }));

    data(blockEl, 'playlist', playlist);

    this._block = blockEl;

    return blockEl;
  },

  buildBlockList: function(playlist) {
    var tplItem = trim(VideoPlaylist.blockItemTpl),
        itemsHtml = '';

    var loopFrom = playlist.reversed ? playlist.list.length - 1 : 0;
    var loopWhile = function(i) {
      return playlist.reversed ? i >= 0 : i < playlist.list.length;
    };
    var loopNext = function(i) {
      return playlist.reversed ? --i : ++i;
    };

    for (var i = loopFrom; loopWhile(i); i = loopNext(i)) {
      var v = playlist.list[i];
      var vData;

      if (isArray(v)) {
        var rawId = v[VideoConstants.VIDEO_ITEM_INDEX_OWNER_ID] + '_' + v[VideoConstants.VIDEO_ITEM_INDEX_ID];

        vData = {
          vid: rawId,
          thumb: v[VideoConstants.VIDEO_ITEM_INDEX_THUMB],
          title: v[VideoConstants.VIDEO_ITEM_INDEX_TITLE],
          duration: v[VideoConstants.VIDEO_ITEM_INDEX_DURATION],
          views: getLang('video_N_views_list', v[VideoConstants.VIDEO_ITEM_INDEX_VIEWS] || 1, true),
          itemClass: rawId == playlist.current ? 'video_plb_active' : '',
        }
      } else {
        vData = extend({}, v, {
          itemClass: v.vid == playlist.current ? 'video_plb_active' : ''
        });
      }

      itemsHtml += rs(tplItem, vData);
    }

    return itemsHtml;
  },

  updateBlockList: function(playlistId) {
    var playlist = VideoPlaylist.getCurList();
    if (!playlist || playlist.id != playlistId) return;

    var blockEl = VideoPlaylist.getBlock();
    var listEl = geByClass1('video_plb_list_cont', blockEl);

    var itemsHtml = VideoPlaylist.buildBlockList(playlist);
    val(listEl, itemsHtml);

    var sb = data(blockEl, 'sb');
    sb && sb.update();

    VideoPlaylist.setCurVideo(playlist.current);
    VideoPlaylist.updateControls();
  },

  getBlock: function() {
    return this._block;
  },

  removeBlock: function() {
    var scrollbar = data(this._block, 'sb');
    if (scrollbar) scrollbar.destroy();
    re(this._block);
    removeData(this._block);
    this._block = null;
    VideoPlaylist.toggleStateClasses();
  },

  setCurVideo: function(vid, withAnim) {
    var blockEl = VideoPlaylist.getBlock();
    if (!blockEl) return;

    var list = data(blockEl, 'playlist');
    if (!list) return;

    var selectedEl = false;
    each(geByClass('video_plb_video', blockEl), function() {
      var v = this.getAttribute('data-vid');
      if (vid) {
        if (v == vid) {
          selectedEl = this;
        }
        toggleClass(this, 'video_plb_active', v == vid);
      } else if (hasClass(this, 'video_plb_active')) {
        selectedEl = this;
        return false;
      }
    });

    function updateScrollbar() {
      var plBlockEl = VideoPlaylist.getBlock();
      if (plBlockEl) {
        var sb = data(plBlockEl, 'sb');
        sb && sb.update();
      }
    }

    if (selectedEl) {
      if (vid) {
        list.current = vid;
      }

      var listEl = geByClass1('video_plb_list', blockEl);
      var selectedTop = getXY(selectedEl)[1];
      var selectedHeight = getSize(selectedEl)[1];
      var listTop = getXY(listEl)[1];
      var listHeight = getSize(listEl)[1];

      var innerTop = selectedTop - listTop;

      if (innerTop < 0 || innerTop + selectedHeight > listHeight) {
        var newScrollTop = listEl.scrollTop + selectedTop - listTop - listHeight/2 + selectedHeight/2;
        if (listEl.scrollTop != newScrollTop) {
          if (withAnim) {
            animate(listEl, {scrollTop: newScrollTop, transition: Fx.Transitions.easeOutCubic}, 450, updateScrollbar);
          } else {
            listEl.scrollTop = newScrollTop;
            updateScrollbar();
          }
        }
      }

      VideoPlaylist._queueNextVideo(vid);
    }
  },

  getList: function(playlistId, videoRaw) {
    // Currently playlist block have limited size
    // so the function returns slice of size not bigger than VIDEOS_LIMIT.
    // If videoRaw parameter passed, new slice will contain it in the middle of the list.

    if (this.lists[playlistId]) {
      return this.lists[playlistId];
    }

    var wallPlaylistRE = /^wall_-?\d+$/;
        postPlaylistRE = /^post_-?\d+_\d+$/,
        catPlaylistRE = /^cat_(\d|[\w_])+$/,
        ownerPlaylistRE = /^-?\d+_-?\d+$/;

    if (wallPlaylistRE.test(playlistId)) {
      return cur.wallVideos && cur.wallVideos[playlistId] && this.uniqList(cur.wallVideos[playlistId]);
    }

    if (postPlaylistRE.test(playlistId)) {
      return cur.pageVideosList && cur.pageVideosList[playlistId];
    }

    if (catPlaylistRE.test(playlistId)) {
      return cur.catVideosList && cur.catVideosList[playlistId];
    }

    if (!ownerPlaylistRE.test(playlistId)) {
      return;
    }

    var playlistParts = playlistId.split('_'),
        ownerId = playlistParts[0],
        albumId = playlistParts[1],
        albumName,
        albumTitle,
        list;

    if (albumId == -2) {
      albumName = 'all';
      albumTitle = cur.playlistAddedTitle;
    } else if (albumId == -1) {
      albumName = 'uploaded';
      albumTitle = cur.playlistUploadedTitle;
    } else {
      albumName = 'album_' + albumId;
      albumTitle = cur.playlistTitle;
    }

    each([cur.silentLoaded, cur.pageVideosList], function(i, obj) {
      if (obj && obj[ownerId] && obj[ownerId][albumName]) {
        list = obj[ownerId][albumName];
        return false;
      }
    });

    if (!list) return;

    var videoIndex;
    if (videoRaw) {
      videoIndex = list.length;
      while (--videoIndex) {
        var v = list[videoIndex];
        if (v[0] + '_' + v[1] == videoRaw) {
          break;
        }
      }
    } else {
      videoIndex = 0;
    }

    var fromIndex = positive(videoIndex - VideoPlaylist.VIDEOS_LIMIT/2);
    var tillIndex = fromIndex + VideoPlaylist.VIDEOS_LIMIT;
    list = list.slice(fromIndex, tillIndex);

    return {
      id: playlistId,
      title: albumTitle,
      list: list
    };
  },

  getCurList: function() {
    var block = VideoPlaylist.getBlock();
    if (block) {
      return data(block, 'playlist');
    }
  },

  getCurListId: function() {
    var list = VideoPlaylist.getCurList();
    if (list) {
      return list.id;
    }
  },

  addList: function(list) {
    this.lists[list.id] = list;
  },

  extendList: function(playlistId, bList) {
    if (!this.lists[playlistId]) {
      return false;
    }

    var aList = this.lists[playlistId].list;
    var resultList = [];
    var vidsSet = {};
    var i = 0,
        j = 0;

    while (true) {

      if (aList[i] && bList[j] && aList[i].vid == bList[j].vid) {
        if (!vidsSet[aList[i].vid]) {
          resultList.push(aList[i]);
          vidsSet[aList[i].vid] = 1;
        }
        ++i;
        ++j;
      } else if (aList[i]) {
        if (!vidsSet[aList[i].vid]) {
          resultList.push(aList[i]);
          vidsSet[aList[i].vid] = 1;
        }
        ++i;
      } else if (bList[j]) {
        if (!vidsSet[bList[j].vid]) {
          resultList.push(bList[j]);
          vidsSet[bList[j].vid] = 1;
        }
        ++j;
      } else {
        break;
      }

    }

    this.lists[playlistId].list = resultList;
    return this.lists[playlistId];
  },

  uniqList: function(playlist) {
    var vidsSet = {};

    for (var i = 0, item; item = playlist.list[i]; ++i) {
      if (vidsSet[item.vid]) {
        playlist.list.splice(i, 1);
      } else {
        vidsSet[item.vid] = true;
      }
    }

    return playlist;
  },

  isCollapsed: function() {
    var blockEl = VideoPlaylist.getBlock();
    return !!(blockEl && data(blockEl, 'collapsed'));
  },

  toggle: function(doShow, noAnim) {
    if (isUndefined(doShow)) {
      doShow = VideoPlaylist.isCollapsed();
    }

    if (mvcur.minimized && doShow) return;

    var blockEl = VideoPlaylist.getBlock();

    if (!blockEl || VideoPlaylist.isCollapsed() == !doShow) return;

    data(blockEl, 'collapsed', !doShow);

    VideoPlaylist.toggleStateClasses();

    Videoview.updateReplyFormPos();

    if (doShow) {
      VideoPlaylist.updateScrollbar();
      VideoPlaylist.setCurVideo();
    }

    return false;
  },

  toggleStateClasses: function() {
    var blockEl = VideoPlaylist.getBlock();
    var isMinimized = window.mvcur && mvcur.minimized;

    if (blockEl && !isMinimized) {
      addClass('mv_container', 'mv_container_has_pl');
      toggleClass('mv_container', 'mv_container_hide_pl', VideoPlaylist.isCollapsed());
    } else {
      removeClass('mv_container', 'mv_container_has_pl');
      removeClass('mv_container', 'mv_container_hide_pl');
    }
  },

  updateScrollbar: function() {
    var plBlockEl = VideoPlaylist.getBlock();
    if (!plBlockEl) return;

    var sb = data(plBlockEl, 'sb');

    if (sb) {
      sb.update(true, true);
    } else {
      var listEl = geByClass1('video_plb_list', plBlockEl);
      var sb = new Scrollbar(listEl, {prefix: 'mv_pl_', nokeys: true, padding: 0});
      data(plBlockEl, 'sb', sb);
    }
  },

  updateControls: function() {
    var playlist = VideoPlaylist.getCurList();
    if (!playlist) return;

    var currentIndex = VideoPlaylist.getVideoIndex();

    if (playlist.reversed) {
      currentIndex = playlist.list.length - currentIndex - 1;
    }

    toggle('mv_pl_prev', currentIndex > 0);
    toggle('mv_pl_next', currentIndex < playlist.list.length - 1);
  },

  showVideo: function(vid) {
    var playlist = VideoPlaylist.getCurList();
    if (!playlist) return;

    VideoPlaylist.saveScrollPos();

    if (mvcur.options.params && mvcur.options.params.module == 'direct' && mvcur.mvPrevLoc) {
      Videoview.backLocation();
    }

    if (playlist.loaded && playlist.loaded.vid == vid) {
      var loadData = playlist.loaded;

      Videoview.show(null, vid, loadData.listId, extend(loadData.options, { playlistId: playlist.id }));
      Videoview.showVideo.apply(videoview, loadData.hubData);

      // send stat data
      var statHash = mvcur.preloadStatsHashes ? mvcur.preloadStatsHashes[vid] : '';
      if (statHash) {
        ajax.post('/al_video.php', {act: 'a_inc_preload_stats', stat_preload_hash: statHash });
      }

      playlist.loaded = false;
    } else {
      var currentIndex = VideoPlaylist.getVideoIndex(vid);
      var realIndex = playlist.reversed ? playlist.list.length - currentIndex : currentIndex;
      var showNext = realIndex < (playlist.list.length - 1) ? 1 : 0;
      var hash = playlist.list[currentIndex][11];

      showVideo(vid, hash, {
        autoplay: 1,
        playlistId: playlist.id,
        addParams: { force_no_repeat: 1, show_next: showNext },
        module: Videoview.getVideoModule()
      });
    }

    return false;
  },

  saveScrollPos: function() {
    var blockEl = VideoPlaylist.getBlock();
    var listEl = domByClass(blockEl, 'video_plb_list');
    data(blockEl, 'savedScrollTop', listEl.scrollTop);
  },

  restoreScrollPos: function() {
    var blockEl = VideoPlaylist.getBlock();
    var listEl = domByClass(blockEl, 'video_plb_list');
    var savedScrollTop = data(blockEl, 'savedScrollTop');
    if (savedScrollTop) {
      listEl.scrollTop = savedScrollTop;
    }
  },

  _queueNextVideo: function(curVideoId) {
    var playlist = VideoPlaylist.getCurList();
    if (!playlist) return;

    curVideoId = curVideoId || playlist.current;

    var nextVideoIndex = VideoPlaylist._getNextVideoIndex(curVideoId);
    if (nextVideoIndex == -1) return;

    var nextVideo = playlist.list[nextVideoIndex];
    var nextVideoVid = isArray(nextVideo) ? nextVideo[0] + '_' + nextVideo[1] : nextVideo.vid;
    var nextVideoHash = isArray(nextVideo) ? '' : nextVideo.hash;

    if (playlist.queued == nextVideoVid) return; // video is queued
    if (playlist.loaded && playlist.loaded.vid == nextVideoVid) return; // next video already loaded and awaits

    playlist.loaded = false;
    playlist.queued = nextVideoVid;

    var showNext = nextVideoIndex < (playlist.list.length - 1) ? 1 : 0;

    showVideo(nextVideoVid, nextVideoHash, {
      hidden: function(hubData, options, listId, videoId) {
        if (playlist.queued == videoId) { // make sure that queued vid didn't changed
          playlist.loaded = {
            vid: videoId,
            hubData: hubData,
            options: options,
            listId: listId
          }
        }
        playlist.queued = false;
      },
      module: Videoview.getVideoModule(nextVideoVid),
      addParams: {
        autoplay: 1,
        force_no_repeat: 1,
        preload: 1,
        show_next: showNext,
        playlist_id: playlist.id
      }
    });
  },

  getNextVideos: function() {
    var nextVideos = [];

    if (!VideoPlaylist.isAutoplayEnabled() && !(window.mvcur && mvcur.player)) {
      return nextVideos;
    }

    var playlist = VideoPlaylist.getCurList();
    var nextIndex = VideoPlaylist._getNextVideoIndex();

    if (!playlist || nextIndex < 0) {
      return nextVideos;
    }

    while (nextVideos.length < 3 && nextIndex >= 0 && nextIndex < playlist.list.length) {
      var v = playlist.list[nextIndex];
      var vData;

      if (isArray(v)) {
        vData = {
          vid: v[VideoConstants.VIDEO_ITEM_INDEX_OWNER_ID] + '_' + v[VideoConstants.VIDEO_ITEM_INDEX_ID],
          thumb: v[VideoConstants.VIDEO_ITEM_INDEX_THUMB],
          views: getLang('video_N_views_list', v[VideoConstants.VIDEO_ITEM_INDEX_VIEWS], true),
          title: v[VideoConstants.VIDEO_ITEM_INDEX_TITLE],
          duration: v[VideoConstants.VIDEO_ITEM_INDEX_DURATION]
        };
      } else {
        vData = v;
      }

      nextVideos.push(vData);

      nextIndex += playlist.reversed ? -1 : 1;
    }

    return nextVideos;
  },

  prevVideo: function() {
    var playlist = VideoPlaylist.getCurList();
    if (!playlist) return;

    var prevVideoIndex = VideoPlaylist.getVideoIndex() + (playlist.reversed ? 1 : -1);

    if (prevVideoIndex < 0) return;

    var prevVideo = playlist.list[prevVideoIndex];
    var prevVideoVid = isArray(prevVideo) ? prevVideo[0] + '_' + prevVideo[1] : prevVideo.vid;

    VideoPlaylist.showVideo(prevVideoVid);
  },

  nextVideo: function() {
    var playlist = VideoPlaylist.getCurList();
    if (!playlist) return;

    var nextVideoIndex = VideoPlaylist._getNextVideoIndex();

    if (nextVideoIndex < 0) return;

    var nextVideo = playlist.list[nextVideoIndex];
    var nextVideoVid = isArray(nextVideo) ? nextVideo[0] + '_' + nextVideo[1] : nextVideo.vid;

    VideoPlaylist.showVideo(nextVideoVid);
  },

  getVideoIndex: function(vid) {
    var playlist = VideoPlaylist.getCurList();
    if (!playlist) return -1;

    if (!vid) {
      vid = playlist.current;
    }

    if (!vid) return -1;

    var index = -1;
    each(playlist.list, function(i, item) {
      var itemVid = isArray(item) ? item[0] + '_' + item[1] : item.vid;
      if (itemVid == vid) {
        index = i;
        return false;
      }
    });

    return index;
  },

  _getNextVideoIndex: function(curVideoId) {
    var playlist = VideoPlaylist.getCurList();
    if (!playlist) return -1;

    var curVideoIndex = VideoPlaylist.getVideoIndex(curVideoId);

    if (curVideoIndex < 0) {
      return 0;
    }

    var nextVideoIndex = curVideoIndex + (playlist.reversed ? -1 : 1);

    if (nextVideoIndex >= 0 && nextVideoIndex < playlist.list.length) {
      return nextVideoIndex;
    } else {
      return -1;
    }
  }
};


try{stManager.done('videoview.js');}catch(e){}
