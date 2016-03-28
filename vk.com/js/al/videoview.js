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
    Videoview.updatePlaylistBoxPosition();
    Videoview.updateExternalVideoFinishBlock();
  },
  incViewCounter: function(oid, vid, hash, currRes, maxRes, player, type) {
    if (!player) {
      player = 'flash';
    }

    var module = Videoview.getVideoModule(oid + '_' + vid);
    var params = {act: 'inc_view_counter', oid: oid, vid: vid, hash: hash, curr_res: currRes, max_res: maxRes, player: player, type: type, module: module};

    if (typeof(cur.vSearchPos) !== 'undefined' && cur.vSearchPos !== null) {
      params.search_pos = cur.vSearchPos;
      cur.vSearchPositionStats[cur.vSearchPos] = extend({'viewStarted': 0}, cur.vSearchPositionStats[cur.vSearchPos]);
      cur.vSearchPositionStats[cur.vSearchPos].viewStarted++;
    }
    cur.vViewsPerSearch++;

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
    if (window.Videocat) {
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
          Videocat.videoSelectFromPlb(null, vid);
        } else {
          Videocat.nextVideo();
        }
      });
    }
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
      Videoview.togglePlaylistsBlock(!Videoview.isPlaylistBlockCollapsed());
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

    var _n = window.Notifier, _a = window.audioPlayer;
    if (_n) setTimeout(function() { _n.lcSend('video_start'); }, 0);
    if (_a && _a.player && !_a.player.paused()) {
      _a.pauseTrack();
      _a.pausedByVideo = 1;
    }

    if (window.mvcur && mvcur.mvData && !vid && !oid) {
      mvcur.mvData.randomNumber = Math.round(Math.random() * 1000000000);
    }
  },
  onVideoPlayStarted: function(oid, vid, hash) {
    var m = Videoview.getVideoModule(oid + '_' + vid);

    var videocat = '';
    if (window.Videocat && Video.isInCatalogue()) {
      var plId = Videocat.getCurrentPlaylistId();
      if (Videocat.isTop3Playlist(plId)) {
        videocat = 'showcase';
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

    var firstRequest = ajax.post('al_video.php', {act: 'video_view_started', oid: oid, vid: vid, hash: hash, quality: (window.mvcur ? mvcur.mvData.resolution : 0), module: m, videocat: videocat, inline: -1, player_view_type: playerViewType}, {
      onDone: function(t) {
      }});

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
        vid: vid, oid: oid,
        s: segments,
        prev_s: prev ? prev.segments : '',
        prev_sig: prev ? prev.segmentsSig : '',
        hash: hash
      };

      // clear porn searchers from stats
      // if (!cur.adult) {
      if (typeof(cur.vSearchPos) !== 'undefined' && cur.vSearchPos !== null) {
        params.search_pos = cur.vSearchPos;
      }
      // }

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
          if (callbackRes > 0 &&
              typeof(cur.vSearchPos) !== 'undefined' && cur.vSearchPos !== null &&
              typeof(cur.vSearchPositionStats) !== 'undefined' && cur.vSearchPositionStats !== null)
          {
            cur.vSearchPositionStats[cur.vSearchPos] = extend({'viewedParts': 0}, cur.vSearchPositionStats[cur.vSearchPos]);
            cur.vSearchPositionStats[cur.vSearchPos].viewedParts++;
          }
        }
      });

      if (cur.module === 'video' && cur.vSection === 'search') {
        if (!cur.vSearchTotalViewedTime) {
          cur.vSearchTotalViewedTime = 0;
        }
        cur.vSearchTotalViewedTime += mvcur.mvData.vsegsSize;

        if (typeof(cur.vSearchPos) !== 'undefined' && cur.vSearchPos !== null &&
            typeof(cur.vSearchPositionStats) !== 'undefined' && cur.vSearchPositionStats !== null)
        {
          cur.vSearchPositionStats[cur.vSearchPos] = extend({'viewedSeconds': 0}, cur.vSearchPositionStats[cur.vSearchPos]);
          cur.vSearchPositionStats[cur.vSearchPos].viewedSeconds += mvcur.mvData.vsegsSize;
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
  var m = cur.module;
  if (window.Video) {
    if (Video.isInCatalogue()) {
      m = 'videocat';
    } else if (cur.module == 'video' && cur.vSection == 'search') {
      m = Video.getSearchModule(videoId);
    }

    if (Video.isInVideosList()) {
      m = cur.oid < 0 ? 'community_videos' : (cur.oid == vk.id ? 'profile_own_videos' : 'profile_videos');
    }
  }

  if (m == 'feed' && window.Videocat && Videocat.getCurrentPlaylistId() == 'feed_block') {
    m = 'feed_block';
  }

  if (m == 'feed' && cur.section == 'videos') {
    m = 'feed_videos';
  }

  return m;
},

showPlaylist: function() {
  Videoview.togglePlaylistsBlock(true);
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
  if (!window.Videocat) return;

  return Videocat.getNextVideos().slice(0, 3);
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
  showBox('/video', { act: 'add_playlist_box', oid: mvcur.mvData.oid, vid: mvcur.mvData.vid, 'only_private': onlyPrivate ? 1 : 0 }, {params: {width: 360, dark: 1, bodyStyle: 'padding: 0'},
    onDone: function(box) {
      box.removeButtons();
      box.addButton(getLang('Save'), function(btn) {
        var title = trim(val('video_playlist_title'));
        var privacy = Privacy.getValue('video_playlist');

        if (!title) return;

        ajax.post('/video', {
          act: 'a_save_playlist',
          title: title,
          privacy: privacy,
          hash: val('videoplaylist_edit_hash'),
          oid: mvcur.mvData.oid,
          vid: mvcur.mvData.vid
        }, {
          showProgress: lockButton.pbind(btn),
          hideProgress: unlockButton.pbind(btn),
          onDone: function(playlistId, text, playlist, video) {
            curBox().hide();
            text && showDoneBox(text);
            mvcur.mvData.playlists.push({id: playlistId, added: true, title: clean(title)});
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
  videoview.setTitle();
  videoview.setDesc();
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
          var privateIcon = pl.private ? '<span class="video_album_private_icon" onmouseover="showTooltip(this,{black:1,text: \'' + getLang('video_album_is_private_tt') +  '\', shift:[13, 3, 0]})"></span>' : '';
          playlistsHtml += '<div class="mv_tt_playlist" data-title="' + clean(pl.title) + '" data-added="' + (+pl.added) + '" data-id="' + pl.id + '" data-disabled="' + (+pl.disabled) +'"><span></span>' + privateIcon +'</div>';
        });
        playlistsHtml += '</div>';
        playlistsHtml += '<div class="mv_tt_add_playlist" onclick="Videoview.addPlaylist(' + noPublicAdd + ')"><span class="mv_tt_plus_icon"></span>' + (noPublicAdd ? getLang('video_add_private_album') : getLang('video_add_album')) + '</div></div>';

        content.innerHTML = playlistsHtml;

        each(geByClass('mv_tt_playlist', content), function() {
          var id = this.getAttribute('data-id');

          var cb = new Checkbox(this.children[0], {
            label: this.getAttribute('data-title'),
            onChange: togglePlaylist,
            playlistId: id,
            checked: this.getAttribute('data-added')
          });

          if (addToDefaultList && id == mvcur.mvData.PLAYLIST_ADDED_ID) {
            cb.checked(true);
          }

          cb.disable(+this.getAttribute('data-disabled'));
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

  function togglePlaylist() {
    var _this = this;

    each(mvcur.mvData.playlists, function(i, pl) {
      if (pl.id == _this.playlistId) {
        pl.added = _this.checked;
        return false;
      }
    });

    ajax.post('/video', { act: 'a_add_to_playlist', oid: mvcur.mvData.oid, vid: mvcur.mvData.vid, hash: this.checked ? mvcur.mvData.playlistAddHash : mvcur.mvData.playlistRemoveHash, playlist_id: this.playlistId, add: +this.checked, info: Video.isInCatalogue() ? Videocat.getCurrentPlaylistId() : '' },
      {
        onDone: function(playlists) {
          playlists = eval('('+playlists+')');
          var added = [];
          var removed = [];
          if (_this.checked) {
            added.push(_this.playlistId);
            var index = playlists.indexOf(_this.playlistId);
            playlists.splice(index, 1);
          } else {
            removed.push(_this.playlistId);
            playlists.push(_this.playlistId);
          }
          if (mvcur.mvData.info) {

            if (window.Video && Video.isInCatalogue()) return;

            Video.updateVideo(vk.id, mvcur.mvData.info, playlists, false, added, removed);
          }
        }
      });

    toggleButtonState(atLeastOneChecked());
  }

  if (noPublicAdd) {
    initTooltip(false);
  } else {
    toggleButtonState(forceAdded || atLeastOneChecked(), false, true);
  }

},


updateArrowsX: function() {
  /*var w = mvcur.mvActualWidth + 30, sbw = sbWidth();
  var lw = Math.max(lastWindowWidth, w + 124 + sbw + 2);
  mvcur.mvLeft.style.left  = Math.floor((lw - sbw - 10 - (w + 66)) / 2) + 'px';
  mvcur.mvRight.style.left = Math.floor((lw - sbw - 10 + (w + 66)) / 2) + 'px';
  if (vk.rtl) {
    mvcur.mvSwitch.style.left = (lw - sbw - 36) + 'px';
  }*/
},

updateArrowsY: function() {
  /*var h = mvcur.mvBox.offsetHeight;
  if (browser.mobile) {
    var skipTop = 10 + mvcur.mvYOffset;
    mvcur.mvRight.style.top = mvcur.mvLeft.style.top = (skipTop + Math.floor(h / 2) - 7) + 'px';
    if (lastWindowHeight < mvcur.mvYOffset + h + 50) {
      setTimeout(function() {
        var f = ge('footer');
        f.style.height = (intval(getStyle(f, 'height')) + (mvcur.mvYOffset + h + 50 - lastWindowHeight)) + 'px';
        onBodyResize();
        Videoview.onResize();
      }, 1);
    }
  }
  mvcur.mvLeftNav.style.height = mvcur.mvRightNav.style.height = h + 'px';*/
},

actionInfo: function() {
  return ge('mv_action_info') || mvcur.mvWide.appendChild(ce('div', {id: 'mv_action_info'}));
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

showTagSelector: function() {
  Videoview.hidePlayer();
  showTabbedBox('al_friends.php', {act: 'select_friends_box', Checked: '', allow_self: 1}, {stat: ['privacy.js', 'ui_controls.js', 'ui_controls.css'], cache: 1, onHide: function() {
    removeClass(mvcur.mvCont, 'toggle_flash');
  }});
  cur.onFlistSave = function (ids, list) {
    Videoview.showPlayer();
    Videoview.addTags(ids);
  }
},

init: function() {
  var prevEmojiId = window.mvcur ? window.mvcur.mvEmoji : undefined;

  window.mvcur = { mvEmoji: prevEmojiId };

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
    className: 'scroll_fix_wrap fixed'
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

getPlaylistBlockEl: function() {
  return window.Videocat ? Videocat.getPlaylistBlockEl() : null;
},

show: function(ev, videoRaw, listId, options) {
  var _a = window.audioPlayer;
  if (_a && _a.player && !_a.player.paused()) {
    _a.pauseTrack();
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
    }
    return true;
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

  cur._keepPlaylistBlock = !!Videoview.getPlaylistBlockEl(); // for next hide
  layerQueue.hide();
  cur._keepPlaylistBlock = false;

  window.forcePauseAudio = false;

  this.init();

  if (mvcur.mvShown) return;

  mvcur.showTime = new Date().getTime();

  if (!isVisible(mvLayerWrap)) {
    otherList = true;
    //do no attach them twice
    removeEvent(window, 'resize', Videoview.onResize);
    removeEvent(document, 'keydown', Videoview.onKeyDown);
    removeEvent(mvLayerWrap, 'click', Videoview.onClick);
    addEvent(window, 'resize', Videoview.onResize);
    addEvent(document, 'webkitfullscreenchange mozfullscreenchange fullscreenchange', Videoview.onFullscreenChange);
    addEvent(document, 'keydown', Videoview.onKeyDown);
    addEvent(mvLayerWrap, 'click', Videoview.onClick);
    boxQueue.hideAll();
    layers.wrapshow(mvLayerWrap, 0.8);
    layers.fullhide = Videoview.hide;
  } else {
    return false;
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

  mvcur.mvShown = true;

  mvcur.videoRaw = videoRaw;
  mvcur.options = options;
  mvcur.listId = listId;
  mvcur.mvData = false;

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

  if (!mvcur.mvFixed) {
    var colorClass = 'mv_dark';

    addClass(mvLayerWrap, colorClass);
    addClass(layerBG, colorClass);
    vkImage().src = '/images/upload.gif';

    if (options.hideInfo) {
      var showControls = 'display: none';
      var controlsClass = '';
    } else {
      var showControls = '';
      //var controlsClass = 'mv_controls_shown';
    }

    if (vk.rtl) {
    var minimizeBtn = '';
  } else {
    var minimizeBtn = '<div class="divider fl_r">|</div><div onmouseover="Videoview.activate(this, 2);" onmouseout="Videoview.deactivate(this, 2);" onclick="return Videoview.minimize(event);" class="mv_top_button fl_r">'+getLang('global_min')+'</div>';
  }
  var hasPlbClass = Videoview.getPlaylistBlockEl() ? 'mv_has_plb' : '';

// '+' - fix for buggy firefox
    mvLayer.innerHTML = '\
<div class="mv_cont '+hasPlbClass+'"> \
<div class="no_select" id="mv_left_nav" onmouseover="Videoview.activate(this, mvcur.mvLeft)" onmouseout="Videoview.deactivate(this, mvcur.mvLeft)" onmousedown="Videoview.show(false, mvcur.mvIndex - 1 + vk.rtl * 2, event); mvcur.mvClicked = true;" onselectstart="return cancelEvent(event);"></div> \
<div class="no_select" id="mv_right_nav" onmouseover="Videoview.activate(this, mvcur.mvRight)" onmouseout="Videoview.deactivate(this, mvcur.mvRight)" onmousedown="Videoview.show(false, mvcur.mvIndex + 1 - vk.rtl * 2, event); mvcur.mvClicked = true;" onselectstart="return cancelEvent(event);"></div> \
<div class="no_select" id="mv_right_controls" style="display: none;" onselectstart="return cancelEvent(event);"> \
<div onmouseover="Videoview.activate(this, true);" onmouseout="Videoview.deactivate(this, true);" class="mv_controls_ctrl mv_controls_close"><div></div></div> \
<div onmouseover="Videoview.activate(this, true);" onmouseout="Videoview.deactivate(this, true);" onclick="return Videoview.minimize(event);" class="mv_controls_ctrl mv_controls_min"><div></div></div> \
<div class="mv_controls_bg"></div> \
</div> \
 \
<table cellspacing="0" cellpadding="0"> \
<tr><td> \
 \
<div id="mv_box" onclick="mvcur.mvClicked = true;"> \
<div id="mv_approve" style="display: none;"></div> \
<div id="mv_publish" style="display: none;"></div> \
<div id="mv_min_layer"><div class="mv_min_header"><div class="mv_mini_control fl_r" onmousedown="return Videoview.hide(false, true);"><div class="mv_close_control"></div></div><div class="mv_mini_control fl_r" onclick="return Videoview.unminimize();"><div class="mv_max_control"></div></div><div class="mv_min_title" id="mv_min_title" onmouseover="if (mvcur.minimized) Videoview.activate(this, 2);" onmouseout="Videoview.deactivate(this, 2);"></div></div></div> \
<div class="no_select mv_data"> \
  <div id="mv_top_controls"> \
    <div onclick="return Videoview.hide(false, true, event, true);" class="mv_top_button"><div class="mv_small_close_icon"></div></div> \
    <div onclick="return Videoview.minimize(event);" class="mv_top_button mv_top_minimize"><div class="mv_minimize_icon"></div></div> \
    <div onclick="return Videoview.togglePlaylistsBlock(true, false, true);" class="mv_top_button mv_top_pl_toggle" id="mv_top_pl_toggle"><div class="mv_pl_toggle_icon"></div></div> \
  </div> \
  <div class="mv_playlist_controls" id="mv_pl_next" onclick="return Videocat.nextVideo()"> \
    <div class="mv_playlist_controls_icon"></div> \
  </div> \
  <div class="mv_playlist_controls" id="mv_pl_prev" onclick="return Videocat.prevVideo()"> \
    <div class="mv_playlist_controls_icon"></div> \
  </div> \
  <div id="mv_loader"></div> \
  <div id="mv_content"></div> \
</div> \
<div id="mv_controls_line" class="ta_l '+controlsClass+'"> \
</div> \
<div id="mv_info_line"> \
</div> \
<div class="mv_controls clear_fix" id="mv_controls" style="'+showControls+'"> \
  <div class="clear_fix select_fix" id="mv_comments_data"> \
    <div class="fl_l wide_column"> \
      <div id="mv_wide"></div> \
    </div> \
    <div class="fl_r narrow_column" id="mv_narrow"></div> \
    <br class="clear" /> \
  </div> \
</div> \
<div id="mv_warning" style="display: none;"></div> \
</div> \
 \
</td></tr> \
</table> \
</div> \
    ';

    extend(mvcur, {
      mvData: geByClass1('mv_data', mvLayer),
      mvCont: geByClass1('mv_cont', mvLayer),
      mvBox: ge('mv_box'),

      mvLeftNav: ge('mv_left_nav'),
      mvRightNav: ge('mv_right_nav'),
      mvRightControls: ge('mv_right_controls'),
      mvControlsLine: ge('mv_controls_line'),
      mvControls: ge('mv_controls'),

      mvLoader: ge('mv_loader'),
      mvContent: ge('mv_content'),

      mvCommentsData: ge('mv_comments_data'),

      mvNarrow: ge('mv_narrow'),
      mvWide: ge('mv_wide')
    });
    if (browser.mobile) {
      mvcur.mvYOffset = intval(window.pageYOffset);

      mvcur.mvCont.style.paddingTop = (mvcur.mvYOffset + 10) + 'px';
    }

    Videoview.updateSize();
    if (cur.timeouts && cur.timeouts.changeUrl) {
      clearTimeout(cur.timeouts.changeUrl);
    }
  }

  hide(mvcur.mvLeft, mvcur.mvLeftNav, mvcur.mvRight, mvcur.mvRightNav);

  if (!cur.mvNavInited) {
    cur.mvNavInited = true;
    if (cur._back) {
      cur._back.hide.push(function() {
        /*if (mvcur.mvShown || mvcur.minimized) {
          Videoview.hide(false, true);
        }*/
      });
    }
  }

  if (cur.vSearch) {
    cur.vSearch.blur();
  }
  if (options.minimized) {
//    if (browser.msie) {
      setTimeout(Videoview.minimize.bind(Videoview), 0);
//    } else {
//      Videoview.minimize();
//    }
  }

  if (window.Videocat) {
    if (options.playlistId && !mvcur.minimized) {
      var playlistId = options.playlistId.toString();
      var plNeedExtend = false;
      if (playlistId.indexOf('wall_') == 0 && Videocat.lists[playlistId] && cur.wallVideos && cur.wallVideos[playlistId]) {
        var aList = Videocat.lists[playlistId].list;
        var bList = cur.wallVideos[playlistId].list;
        Videocat.lists[playlistId].list = Videocat.mergeLists(aList, bList);
        plNeedExtend = true;
      }

      cur._plbWasVisible = !!Videoview.getPlaylistBlockEl();

      var mvplBlockEl = Videocat.buildPlaylistBlock(playlistId, plNeedExtend);
      if (mvplBlockEl) {
        Videoview.togglePlaylistBlockStateClasses();
        Videoview.updatePlaylistBoxPosition();
        Videocat.setPlaylistCurrentVideo(videoRaw, cur._plbWasVisible);
      }
    } else {
      Videocat.removePlaylistBlock();
    }
  }

  Videoview.cleanUpStoredVSegs();

  return false;
},

togglePlaylistBlockStateClasses: function() {
  var blockEl = Videoview.getPlaylistBlockEl();
  toggleClass(mvcur.mvCont, 'mv_has_plb', !!blockEl);
  if (blockEl) {
    var isCollapsed = Videoview.isPlaylistBlockCollapsed();
    var isMinimized = window.mvcur && mvcur.minimized;

    toggle(blockEl, !isCollapsed);
    toggleClass(geByClass1('mv_data'), 'mv_wpl', !isCollapsed && !isMinimized);
    toggleClass(blockEl, 'video_plb_collapsed', isCollapsed);

    toggleClass(ge('mv_box'), 'mv_plb_collapsed', isCollapsed && !isMinimized);
  } else {
    removeClass(geByClass1('mv_data'), 'mv_wpl');
  }
},

hide: function(noLoc, force, ev, closeButtonClick) {
  if (!window.mvcur || !force && !mvcur.mvShown) return;

  if (closeButtonClick) {
    var backOnClick = cur.videoBackOnClick;
    cur.videoBackOnClick = false;
    if (backOnClick) return history.back();
  }

  if (cur.vSearchPos) {
    delete cur.vSearchPos;
  }

  if (cur.vSearchLastActionTime) {
    cur.vSearchLastActionTime = new Date().getTime();
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
      !mvcur.mvShown && !curBox() && window.Videocat && Videocat.removePlaylistBlock();
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
      var box;
      setTimeout(function() {
        Videoview.updatePlaylistBoxPosition();
      });
      box = showFastBox({title: getLang('video_are_you_sure_close_title'), bodyStyle: 'padding: 20px; line-height: 160%;', dark: 1, forceNoBtn: 1}, closeText, getLang('box_yes'), function() {
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
        Videoview.updatePlaylistBoxPosition();
        removeEvent(document, 'keydown', checkKey);
      };
      return true;
    }
  }

  if (!window.forcePauseAudio) {
    var _a = window.audioPlayer, _n = window.Notifier;
    if (_a && _a.player && _a.player.paused() && _a.pausedByVideo) {
      _a.playTrack();
      _a.pausedByVideo = null;
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
    each(geByClass('delete', mvcur.mvTags), function() {
      tooltips.destroy(this);
    });
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

  if (ge('html5_player') && window.html5video) {
    html5video.destroy();
  }

  if (ge('video_yt') && window.VideoYoutube) {
    VideoYoutube.destroy();
  }

  mvcur.mvContent.innerHTML = '';
  mvcur.changeCanvasSize = false;

  var mvplBlockEl = Videoview.getPlaylistBlockEl();
  if (mvplBlockEl && !cur._keepPlaylistBlock) {
    Videocat.removePlaylistBlock();
  }
  cur._keepPlaylistBlock = false;

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
    if (mvcur.minOnBgClick && e.pageX < getXY('mv_box')[0]) {
      Videoview.minimize();
    } else if (vkNow() - intval(mvcur.mvOldT) > 300) {
      if (mvcur.mvTagger) {
        Videoview.stopTag();
      } else {
        Videoview.hide();
      }
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
    if (mvcur.mvTagger) {
      Videoview.stopTag();
    } else if (mvcur.mvEditing) {
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

  Videoview.updateArrowsX();
  Videoview.updateArrowsY();

  Videoview.updatePlaylistBoxPosition();
  setTimeout(function() {
    Videoview.updatePlaylistBoxPosition();
  }, 10);

  Videoview.updateExternalVideoFinishBlock();
},

onFullscreenChange: function() {
  Videoview.updatePlaylistBoxPosition();
  Videoview.updateExternalVideoFinishBlock();
},

updateSize: function() {
  if (mvcur.minimized) {
    return false;
  }
  var size = getSize(mvcur.mvBox);
  mvcur.mvActualWidth = size[0]+3;
  //mvcur.mvCont.style.width = mvcur.mvActualWidth + 'px';

  var docEl = document.documentElement;
  var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;

  var rate = 2;
  if (!isVisible('mv_controls')) {
    rate = 1.2;
  }
  mvcur.mvCont.style.top = String(Math.max((ch - 800) / rate, 50)) +'px';

  //mvcur.mvRightControls.style.left = (mvcur.mvActualWidth) + 'px';

  onBodyResize();
  Videoview.onResize();
},

list: function(photoId, listId, realList) {
  if (!mvcur.mvList) mvcur.mvList = {};
  mvcur.mvList[photoId + '_' + listId] = realList;
},

showInfo: function() {
  show(ge('mv_controls'));
  Videoview.activate(ge('mv_hide_info'), 2, true);
  window.updateWndVScroll && updateWndVScroll();
  return false;
},

hideInfo: function() {
  hide(ge('mv_controls'));
  Videoview.activate(ge('mv_show_info'), 2, true);
  window.updateWndVScroll && updateWndVScroll();
  return false;
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
    if (oid > 0) {
      mvcur.mvPrevLoc = {'0': 'videos' + oid};
    } else {
      mvcur.mvPrevLoc = {'0': 'video', gid: (-oid)};
    }
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
showComment: function(comm) {
  var p = ge('mv_comment' + comm);
  if (p) {
    Videoview.highlightComment(p);
  } else {
    Videoview.comments(comm);
  }
  return false;
},
commDone: function(comm, from, text, del, script) {
  var node = ge(from + '_comment' + comm);
  if (!node) return;
  var fChild = node.firstChild;

  var msg = fChild.nextSibling;
  if (!text) {
    show(node.firstChild);
    hide(msg);
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
  if (msg) {
    msg.innerHTML = text;
    show(msg);
  } else {
    if (hasClass(fChild, 'video_comment_first')) {
      var dldClass = 'review_comment_first';
    } else {
      var dldClass = 'review_comment_dld';
    }
    node.appendChild(ce('div', {className: dldClass, innerHTML: text}));
  }
  hide(node.firstChild);
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
      Videoview.updateArrowsY();
      Videoview.recache();
      if (!cur.mvComments) cur.mvComments = {};
      cur.mvComments[mvcur.videoRaw] = ge('mv_comments_wrap');
    }
  }
  if (script) {
    eval(script);
  }
},

commParams: function(comm, from) {
  return {
    onDone: Videoview.commDone.pbind(comm, from),
    progress: from + '_progress' + comm,
    stat: ['privacy.js', 'privacy.css']
  }
},

commAction: function(act, comm, hash, from) {
  if (isVisible(from + '_progress' + comm)) return;
  ajax.post('al_video.php', {act: act + '_comment', comment: comm, hash: hash, videoview: 1, from: from}, Videoview.commParams(comm, from));
},

comments: function(showcomm) {
  if (showcomm) {
    var frst = domFC(ge('mv_comments')).id || '';
    if (
      !isVisible('mv_comments_header') ||
      (domFC(ge('mv_comments_header')) || {}).tagName == 'IMG' ||
      Videoview.cmp(frst, 'mv_comment' + showcomm) < 0
    ) {
      return;
    }
  }
  var mv = mvcur.mvData;
  var commlink = ge('mv_comments_link');
  ajax.post('al_video.php', {act: 'video_comments', offset: mv.commshown, video: mv.videoRaw}, {
    onDone: function(text, names) {
      Videoview.receiveComms(text, names, false, showcomm);
      if (showcomm && ge('mv_comment' + showcomm)) {
        Videoview.showComment(showcomm);
      }
    },
    showProgress: function() {
      var commHeader = ge('mv_comments_header');
      mvcur.mvCommInfo = commHeader.innerHTML;
      commHeader.innerHTML = '<img src="/images/upload.gif" />';
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
  setTimeout(Videoview.updateArrowsY, 2);
  var mv = mvcur.mvData;
  var commshown = '';
  if (mv.commcount > mv.commshown) {
    commshown = getLang('video_show_previous_comments', mv.commcount - mv.commshown);
  }

  toggleClass(ge('mv_comments_header'), 'mv_comments_expanded', !commshown);
  toggleClass(ge('mv_comments_summary'), 'mv_comments_expanded', !commshown);

  ge('mv_comments_header').innerHTML = commshown;
  Videoview.recache();
  if (!cur.mvComments) cur.mvComments = {};
  cur.mvComments[mvcur.videoRaw] = ge('mv_comments_wrap');
},
showEditReply: function(event) {
  hide('mv_reply_fakebox');
  show('mv_reply_box');
  Videoview.updateComposer();
  //prevent flashing of placeholder
  hide(geByClass1('input_back_wrap', ge('mv_reply_box')));
  ge('mv_comment').focus();

  mvcur.commentingInProgress = true;
  Videoview.playerNextTimerUpdate();
},
hideEditReply: function(event) {
  hide('mv_reply_box');
  show('mv_reply_fakebox');
},
commentClick: function(el, event, from) {
  var comm = el.id.replace('mv_comment', ''), cmnt = comm.split('_');
  if (Wall.checkReplyClick(el, event)) return;

  var moreLink = geByClass1('wall_reply_more', el, 'a');
  if (moreLink && isVisible(moreLink)) {
    removeClass(el, 'reply_moreable');
    moreLink.onclick();
    return;
  }
  if (from && cmnt[1] && ge('mv_comment'))
    Videoview.showEditReply(event);{
    Videoview.commentTo(comm, from, event);
  }
},
commentChanged: function() {
  checkTextLength(mvcur.mvCommLimit, ge('mv_comment'), ge('mv_comment_warn'));
},
commentTo: function(comm, toId, event) {
  var cmnt = (comm || '').split('_'), commId = cmnt[1], replyNameOld = mvcur.mvReplyTo && mvcur.mvReplyNames[mvcur.mvReplyTo[0]] || '', replyName = mvcur.mvReplyNames[toId] || '', rf = ge('mv_comment'), tl = ge('mv_reply_to_title'), asGroup = ge('mv_reply_as_group');

  if (comm) {
    mvcur.mvReplyTo = [toId, commId];
    val(tl, replyName[0] || '');
    show(tl, 'mv_del_reply_to');
    setStyle(tl, {maxWidth: ge('mv_comment_submit').offsetWidth - domPN(ge('mv_comment_send')).offsetWidth - (asGroup ? (asGroup.offsetWidth + 10) : 0) - ge('mv_add_media').offsetWidth - 21});
  } else {
    mvcur.mvReplyTo = false;
    hide(tl, 'mv_del_reply_to');
  }
  cur.mvReplyIn = mvcur.videoRaw;
  cur.mvReplyTo = mvcur.mvReplyTo;

  var v = window.Emoji ? trim(Emoji.editableVal(rf)) : '';
  var cEl = comm && geByClass1('mv_reply_to', ge('mv_comment' + comm));
  if (!v || replyNameOld && !winToUtf(replyNameOld[1]).indexOf(v) || comm === false) {
    if (rf && window.Emoji) {
      Emoji.val(rf, comm && !checkEvent(event) ? replyName[1] : '');
    }
  }
  toggleClass(asGroup, 'on', !!(cEl && cEl.getAttribute('rid') === cmnt[0]));
  if (comm && window.Emoji) {
    Emoji.editableFocus(rf, false, true);
  }
},
receiveComms: function(text, names, noOld, toUp) {
  var n = ce('div', {innerHTML: text}), comms = ge('mv_comments'), last = current = domLC(comms), frm = getXY(current, true)[1], mv = mvcur.mvData, commField = ge('mv_comment');
  for (var el = domLC(n); el; el = domLC(n)) {
    if (commField) addClass(el, 'reply_replieable');
    while (current && Videoview.cmp(current.id, el.id) > 0) {
      current = domPS(current);
    }
    if (current && !Videoview.cmp(current.id, el.id)) {
      comms.replaceChild(el, current);
      current = el;
    } else {
      if (current && domNS(current)) {
        comms.insertBefore(el, domNS(current));
      } else if (!current && domFC(comms)) {
        if (noOld === true) {
          --mv.commshown;
          n.removeChild(el);
        } else {
          comms.insertBefore(el, domFC(comms));
        }
      } else {
        comms.appendChild(el);
      }
      ++mv.commshown;
    }
  }
  if (toUp && last) {
    mvLayerWrap.scrollTop += getXY(last, true)[1] - frm;
  }
  mv.comments = comms.innerHTML;
  extend(mvcur.mvReplyNames, names);
  window.updateWndVScroll && updateWndVScroll();
  Videoview.updateComms();
},
commSaved: function(post) {
  if (!mvcur.mvShown || mvcur.minimized) return;
  var comms = ge('mv_comments_wrap'), vd = comms ? mvcur.videoRaw : false, comm = post.match(/^(-?\d+)video(_\d+)/);
  if (!vd || !comm || !ge('mv_comment' + comm[1] + comm[2])) return;
  if (!cur.mvComments) cur.mvComments = {};
  cur.mvComments[mvcur.videoRaw] = comms;
},

emojiShowTT: function(obj, ev) {
  if (mvcur.mvEmoji === undefined) {
    return false;
  }
  return Emoji.ttShow(mvcur.mvEmoji, obj, ev);
},
emojiHideTT: function(obj, ev) {
  if (mvcur.mvEmoji === undefined) {
    return false;
  }
  return Emoji.ttHide(mvcur.mvEmoji, obj, ev);
},
showEmojiTT: function(obj, ev) {
  if (mvcur.mvEmoji === undefined) {
    return false;
  }
  return Emoji.ttClick(mvcur.mvEmoji, obj, false, false, ev);
},

sendComment: function(ev, stickerId) {
  var fld = ge('mv_comment'), comp = fld && data(fld, 'composer'),
      replyToName = (mvcur.mvReplyNames[(mvcur.mvReplyTo || {})[0]] || [])[1], btn = 'mv_comment_send';

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

  hide('mv_comment_warn');
  ajax.post('al_video.php', Wall.fixPostParams(extend(params, {
    act: 'post_comment',
    video: mvcur.mvData.videoRaw,
    hash: mvcur.mvData.hash,
    fromview: 1,
    videoviewer: 1,
    from_group: isChecked(ge('mv_reply_as_group')),
    reply_to: (mvcur.mvReplyTo || {})[1]
  })), {
    onDone: function(text, names) {
      ++mvcur.mvData.commcount;
      Videoview.receiveComms(text, names, true);
      var fld = ge('mv_comment');
      if (fld && data(fld, 'composer')) {
        Composer.reset(data(fld, 'composer'));
      } else {
        val(fld, '');
      }
      fld.blur();
      mvcur.mvReplyTo = false;
      hide('mv_reply_to_title', 'mv_del_reply_to');
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
      info: window.Video && window.Videocat && Video.isInCatalogue() ? Videocat.getCurrentPlaylistId() : ''
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
      if (window.Video && cur.oid && (vk.id == cur.oid || gid)) {
        Video.addToList('all', row);
      }
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
      if (window.Video && !Video.isInCatalogue()) {
        Video.updateVideo(cur.oid, row, [], false, [-2]);
      }
      Videoview.setAddButtonStateAdded();
    }
  });
  return false;
},

likeUpdate: function(my, count, title, nott) {
  count = intval(count);

  var mv = Videoview.getMvData();

  var likeType = (window.mvcur && mvcur.statusVideo) ? 'wall' : 'video';

  var rows = ge('like_table_' + likeType + mv.videoRaw);
  var titleNode = ge('like_title_' + likeType + mv.videoRaw)
  var countInput = ge('like_real_count_' + likeType + mv.videoRaw) || {};

  var countNode = ge('mv_like_count');
  var icon = ge('mv_like_icon');
  var tt = (icon ? icon.parentNode.tt : false) || {}, opts = clone(tt.opts || {}), newleft = (my ? 0 : -36);

  if (title && titleNode) {
    val(titleNode, title);
  }
  mv.likes = countInput.value = count;
  animateCount(countNode, count);

  if (window.mvcur && mvcur.statusVideo) {
    var wallCount = ge('like_count' + mv.videoRaw);
    if (wallCount) {
      wallCount.innerHTML = count ? count : '';
      (ge('like_real_count_wall' + mv.videoRaw) || {}).value = count;
      var statusIcon = ge('like_icon' + mv.videoRaw);
      if (statusIcon) {
        if (my) {
          addClass(statusIcon, 'my_like');
        } else {
          removeClass(statusIcon, 'my_like');
        }
        if (count) {
          removeClass(statusIcon, 'no_likes');
          setStyle(statusIcon, {opacity: 1, visibility: 'visible'});
        } else {
          addClass(statusIcon, 'no_likes');
          setStyle(statusIcon, {opacity: 0, visibility: 'hidden'});
        }
      }
    }
  }

  mv.liked = my;
  if (!my) {
    var cb = ge('like_share_video' + mv.videoRaw);
    if (cb) checkbox(cb, false);
    setStyle(icon, {opacity: null});
  } else {
    setStyle(icon, {opacity: 1});
  }
  if (count) {
    var styleName = vk.rtl ? 'right' : 'left';
    if (tt.el && !isVisible(tt.container) && !title && rows) {
      rows.style[styleName] = newleft + 'px';
      if (nott !== true) {
        tooltips.show(tt.el, extend(opts, {showdt: 0}));
      }
    } else if (rows) {
      var params = {};
      params[styleName] = newleft;
      animate(rows, params, 200);
    }
    removeClass(icon, 'no_likes');
  } else {
    if (tt.el) tt.hide();
    addClass(icon, 'no_likes');
  }
},

likeSmall: function() {
  Videoview.like();
  addClass(ge('mv_like_line'), 'video_liked');
  return false;
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

  setTimeout(function() {
    var video = videoRaw.split('_');
    var addBox = showBox('/al_video.php', { act: 'show_add_video_box', oid: video[0], vid: video[1] }, { params: { dark: 1, bodyStyle: 'padding: 0', width: 400, hideButtons: true},
      onDone: function(box, addHash) {
        if (!addHash) return;

        var saveBtn = ge('video_add_save_btn');
        addEvent(saveBtn, 'click', function() {
          var title = trim(val('video_add_name_input'));
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
              showProgress: lockButton.pbind(saveBtn),
              hideProgress: unlockButton.pbind(saveBtn),
              onDone: function() {
                cur._recentAddedVideos[videoRaw] = true;
                addBox.hide();
                showDoneBox('Видео добавлено в Ваши видеозаписи');
                each(mvcur.mvData.playlists, function(i, pl) {
                  if (pl.id == mvcur.mvData.PLAYLIST_ADDED_ID || pl.id == mvcur.mvData.PLAYLIST_UPLOADED_ID) {
                    pl.added = 1;
                  }
                });
                Videoview.setAddButtonStateAdded();
                Videoview.recache(oid+'_'+vid);
              }
          });
        });
      }
    });
    addBox.removeButtons();
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
  if (window.Videocat && window.Video && Video.isInCatalogue()) {
    var playlistId = Videocat.getCurrentPlaylistId();
    if (Videocat.isTop3Playlist(playlistId)) {
      info = 'showcase';
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

  Videoview.likeUpdate(!mv.liked, mv.likes + (mv.liked ? -1 : 1));
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
  var linkW = linkSize[0]

  showTooltip(element, {
    url: 'like.php',
    params: {act: 'a_get_stats', object: object, list: mvcur.listId},
    slide: 15,
    shift: [0, 5, 9],
    ajaxdt: 100,
    showdt: 400,
    hidedt: 200,
    className: 'rich like_tt',
    no_shadow: (mvcur.videoAds || mvcur.statusVideo) ? 1 : 0,
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
      show('mv_controls_line');
      if (cur.claimedVideoText) {
        ge('video_player').innerHTML = cur.claimedVideoText;
        cur.claimedVideoText = "";
      }
      if (window.mvcur && mvcur.mvCommentsData) {
        show(mvcur.mvCommentsData);
      }
      var row = eval('('+row+')');
      if (window.Video) {
        Video.addToList('all', row, skipClear);
      }
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
        if (mvcur.mvControls) {
          hide(mvcur.mvControls);
          var warning = ge('mv_warning');
          warning.innerHTML = text;
          show(warning);
        }
        text = removeInfo;
      }
      if (cur.module == 'video') {
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
      hide('mv_controls_line');
      cur.claimedVideoText = ge('video_player').innerHTML;
      ge('video_player').innerHTML = text;
    }
  });
},

tagOver: function(el) {
  showTooltip(el, {
    black: 1,
    text: '<div style="padding: 2px;">' + getLang('video_delete_tag') + '</div>',
    center: 0,
    shift: [12, -1, 0]
  });
},

tagOut: function(el) {
  if (!el.parentNode || !el.parentNode.parentNode) return;
  animate(el, {backgroundColor: '#C4D2E1'}, 200);
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

deleteTag: function(tagId, usersTag) {
  var actionCont = ge('mv_action_info');
  actionCont.innerHTML = '<img src="/images/upload.gif" />';
  show(actionCont);
  mv = mvcur.mvData;
  ajax.post('al_video.php', {act: 'delete_tag', video: mv.videoRaw, tag_id: tagId, hash: mv.hash}, {onDone: function(info, tagsList) {
    ge('mv_action_info').innerHTML = info;
    ge('mv_tags_list').innerHTML = tagsList;
    (tagsList ? show : hide)('mv_tags');
    (info ? show : hide)('mv_action_info');
    Videoview.recache(mv.videoRaw);
    if (window.Video && Video.removeFromLists && usersTag) {
      Video.removeFromLists(mvcur.mvData.videoRaw);
    }
  }});
},

restoreTag: function(tagId) {
  var actionCont = ge('mv_action_info');
  actionCont.innerHTML = '<img src="/images/upload.gif" />';
  show(actionCont);
  mv = mvcur.mvData;
  ajax.post('al_video.php', {act: 'restore_tag', video: mv.videoRaw, tag_id: tagId, hash: mv.hash}, {onDone: function(info, tagsList) {
    ge('mv_action_info').innerHTML = info;
    ge('mv_tags_list').innerHTML = tagsList;
    (tagsList ? show : hide)('mv_tags');
    (info ? show : hide)('mv_action_info');
    Videoview.recache(mv.videoRaw);
  }});
},

addTags: function(ids) {
  var actionCont = ge('mv_action_info');
  actionCont.innerHTML = '<img src="/images/upload.gif" />';
  show(actionCont);
  mv = mvcur.mvData;
  ajax.post('al_video.php', {act: 'add_tags', video: mv.videoRaw, ids: ids.join(','), hash: mv.hash}, {onDone: function(info, tagsList) {
    ge('mv_action_info').innerHTML = info;
    ge('mv_tags_list').innerHTML = tagsList;
    (tagsList ? show : hide)('mv_tags');
    (info ? show : hide)('mv_action_info');
    Videoview.recache(mv.videoRaw);
  }});
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

setAdult: function(oid, vid, hash, value) {
  ajax.post('al_video.php', {
    act: 'set_adult_video',
    vid: vid,
    oid: oid,
    hash: hash,
    value: value
  }, {onDone: function(text, label) {
    ge('mv_setadult_line').innerHTML = label;
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
        if (mvcur.mvCommentsData) {
          hide(mvcur.mvCommentsData);
          var warning = ge('mv_warning');
          warning.innerHTML = text;
          show(warning);
        }
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
  ge('claim_link').innerHTML = '<img src="/images/upload.gif" />';

  ajax.post('al_claims.php', {act: 'a_' + action, type: 'video', id: mvcur.mvData.vid, owner_id: mvcur.mvData.oid, claim_id: claim_id, extra: status}, {onDone: function() {
    if (action == 'claim') {
      ge('claim_link').innerHTML = '<a onclick="return Videoview.claimed(' + claim_id + ', \'unclaim\', \'' + status + '\');\">Вернуть</a>';
    } else {
      ge('claim_link').innerHTML = '<a onclick="return Videoview.claimed(' + claim_id + ', \'claim\', \'' + status + '\');\">Изъять</a>';
    }
  }});
},

confirmTag: function(tagId) {
  var actionCont = ge('mv_action_info');
  ge('mv_approve').innerHTML = '<div style="text-align: center; padding-top: 4px;"><img src="/images/upload.gif"></div>';
  ajax.post('al_video.php', {act: 'confirm_tag', video: mvcur.mvData.videoRaw, tag_id: tagId, hash: mvcur.mvData.hash}, {onDone: function(info, tagsList, padres) {
    if (_pads.shown == 'vid') {
      Pads.vidDone(mvcur.mvData.videoRaw, false, padres);
    }
    Pads.invalidate('vid');
    hide('mv_approve');
    ge('mv_tags_list').innerHTML = tagsList;
    (tagsList ? show : hide)('mv_tags');
    if (window.Video && Video.onTagConfirm) {
      Video.onTagConfirm(mvcur.mvData.videoRaw);
    }
    Videoview.recache(mvcur.mvData.videoRaw);
  }});
},

declineTag: function(tagId) {
  var appr = ge('mv_approve');
  var back = appr.innerHTML;
  appr.innerHTML = '<div style="text-align: center; padding-top: 4px;"><img src="/images/upload.gif"></div>';

  ajax.post('al_video.php', {act: 'delete_tag', video: mvcur.mvData.videoRaw, tag_id: tagId, hash: mvcur.mvData.hash}, {
    onDone: function(info, tagsList, padres) {
      if (_pads.shown == 'vid') {
        Pads.vidDone(mvcur.mvData.videoRaw, false, padres);
      }
      Pads.invalidate('vid');
      ge('mv_approve').innerHTML = info;
      //hide('mv_approve');
      ge('mv_tags_list').innerHTML = tagsList;
      (tagsList ? show : hide)('mv_tags');
      if (window.Video && Video.removeFromLists) {
        Video.removeFromLists(mvcur.mvData.videoRaw);
      }
      Videoview.recache(mvcur.mvData.videoRaw);

      if (window.Video) {
        Video.updateVideo(cur.oid, mvcur.mvData.videoRaw.split('_'), [], true);
      }
    },
    onFail: function() {
      appr.innerHTML = back;
    }
  });
},

setStyle: function(label, obj, style) {
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
  setStyle(obj, mvcur.restoreStyles[label]);
},

showVideo: function(title, html, js, desc, info, controlsLine, opt) {
  if (!vk.id && !html) {
    setTimeout(function() {
      Videoview.hide(false, true);
      showDoneBox(title);
    }, 500);
    return;
  }

  if (title && !html) { // not available reason message
    mvcur.mvContent.innerHTML = '<div id="video_player" class="video_layer_message">' + title + '</div>';
    hide(mvcur.mvLoader);
    hide(mvcur.mvControls);
    return;
  }

  opt = opt || {};
  window.lang = extend(window.lang || {}, opt.lang);
  mvcur.mvCommLimit = opt.commlimit;
  mvcur.mvCaptionLimit = opt.captionlimit;
  mvcur.mvData = opt.mvData;
  mvcur.videoRaw = opt.mvData.videoRaw;
  mvcur.mvMediaTypes = opt.media;
  mvcur.mvMediaShare = opt.share;
  mvcur.mvReplyNames = opt.names || {};
  mvcur.minOnBgClick = opt.minOnBgClick;

  var playlistId = mvcur.options.playlistId;
  var plNeedExtend = false;
  if (opt.pl_list && Object.keys) {
    var plList = JSON.parse(opt.pl_list);
    var plFullId = Object.keys(plList)[0];

    if (/^wall/.test(plFullId) && cur.wallVideos && cur.wallVideos[plFullId]) {
      plList[plFullId].list = Videocat.mergeLists(cur.wallVideos[plFullId].list, plList[plFullId].list);
    }

    Videocat.addList(plList);

    if (plFullId.split('_')[1] == -2 && Videocat.getCurrentPlaylistId().indexOf('s_') == 0 && plList[plFullId].list.length > 4) {
      var currPlaylist = Videocat.getCurrentPlaylist();

      var videosList = [], existsMap = {};
      each(currPlaylist.list.concat(plList[plFullId].list), function(i, v) {
        if (!existsMap[v.vid]) {
          videosList.push(v);
          existsMap[v.vid] = true;
        }
      });
      currPlaylist.list = videosList;

      mvcur.needPlaylistRebuildId = Videocat.getCurrentPlaylistId();
      plNeedExtend = true;
    } else {
      mvcur.needPlaylistRebuildId = plFullId;
    }
  } else if (playlistId && !Videocat.lists[playlistId] && cur.wallVideos) {
    Videocat.addList(cur.wallVideos);
    Videocat.lists[playlistId].list = Videocat.mergeLists(Videocat.lists[playlistId].list, []); // removes duplicates
    mvcur.needPlaylistRebuildId = mvcur.options.playlistId;
  }

  if (!mvcur.mvContent) {
    mvcur.mvContent = ge('mv_content');
  }

  Wall.cancelEdit(true);

  mvcur.mvContent.innerHTML = html;
  if (mvcur.mvControls) {
    mvcur.mvControls.innerHTML = desc;
  }

  ge('mv_info_line').innerHTML = info;

  Videoview.updateComposer();
  if (mvcur.mvData.videoRaw == cur.mvReplyIn) {
    mvcur.mvReplyTo = cur.mvReplyTo;
    cur.mvReplyIn = mvcur.videoRaw;
    cur.mvReplyTo = mvcur.mvReplyTo;
  } else {
    Videoview.commentTo(false);
  }

  if (!cur.mvComments) cur.mvComments = {};
  var cms = ge('mv_comments_wrap');
  if (cur.mvComments[mvcur.videoRaw]) {
    domPN(cms).replaceChild(cur.mvComments[mvcur.videoRaw], cms);
  }

  mvcur.mvControlsLine.innerHTML = controlsLine;

  mvcur.finished = false;

  hide(mvcur.mvLoader);
  if (js) {
    eval('(function(){' + js + '})()');
  }
  if (opt['taggedInfo']) {
    var tagInfo = ge('mv_approve');
    tagInfo.innerHTML = opt['taggedInfo'];
    show(tagInfo);
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

  if (Videoview.getPlaylistBlockEl() && !mvcur.minimized && !mvcur.needPlaylistRebuildId) {
    Videocat.setPlaylistCurrentVideo(mvcur.videoRaw, cur._plbWasVisible);
    cur._plbWasVisible = false;

    Videoview.togglePlaylistsBlock(!Videoview.isPlaylistBlockCollapsed(), true);
  }

  if (mvcur.needPlaylistRebuildId && window.Videocat) {
    if (Videocat.lists && Videocat.lists[mvcur.needPlaylistRebuildId]) {
      Videocat.buildPlaylistBlock(mvcur.needPlaylistRebuildId, plNeedExtend);
      mvcur.needPlaylistRebuildId = false;
      setTimeout(function() {
        Videocat.setPlaylistCurrentVideo(mvcur.videoRaw, false);
      }, 0);
    }
  }

  Videoview.togglePlaylistBlockStateClasses();
  Videoview.updatePlaylistBoxPosition();

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
  if (opt.showInfo && !mvcur.minimized && !mvcur.options.hideInfo) {
    show(ge('mv_controls'));
  }

  if (mvcur.mvData.isVideoAds) {
    addClass(mvcur.mvControlsLine, 'mv_controls_shown');
  }

  show('mv_content');
  window.updateWndVScroll && updateWndVScroll();

  if ((mvcur.options || {}).scroll) {
    mvLayerWrap.scrollTop = mvcur.options.scroll;
    mvcur.options.scroll = 0;
  }

  if (mvcur.mvData.noControls) {
    re('mv_controls');
  } else {
    var titleWidth = (mvcur.minimized) ? mvcur.minSize.wrap.w : false;
    Videoview.setTitle(titleWidth);

    Videoview.initAddButton();

    { // More dd
      var items = [];
      if (mvcur.mvData.showTagPeople) {
        items.push(['_onTagPeople', getLang('video_tag_person')]);
      }
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

    var viewsCountEl = geByClass1('mv_views_count_number');
    if (viewsCountEl && viewsCountEl.textContent && viewsCountEl.textContent.indexOf('(') != -1) {
      addEvent(viewsCountEl, 'mouseover', function() {
        showTooltip(viewsCountEl, { text: getLang('video_views_count_tt_text'), black: true, shift: [0, 5, 0] });
      });
    }
  }

  if (!mvcur.mvData.uploaded) {
    Videoview.recache();
  }

  addEvent(ge('mv_comment'), 'blur focus', function(ev) {
    mvcur.commentingInProgress = (ev.type == 'focus');
    Videoview.playerNextTimerUpdate();
  });

  mvplBlockEl = Videoview.getPlaylistBlockEl();
  mvplBlockEl && Videoview.updatePlaylistControls();
},

updatePlaylistControls: function() {
  if (!window.Videocat) return;

  var playlist = Videocat.getCurrentPlaylist();
  if (!playlist) return;

  var nextEl = ge('mv_pl_next');
  var prevEl = ge('mv_pl_prev');
  var currentIndex = Videocat.getCurrentPlaylistIndex();

  toggle(prevEl, currentIndex > 0);
  toggle(nextEl, currentIndex != -1 && currentIndex < playlist.list.length - 1);
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
  showBox('/video', { act: 'add_to_club_pl_box', oid: mvcur.mvData.oid, vid: mvcur.mvData.vid }, {params: {width: 440, dark: 1, bodyStyle: 'padding: 0'},
    onDone: function(box) {
    }
  });
},

_onDelete: function() {
  var oid = mvcur.mvData.oid;
  var vid = mvcur.mvData.vid;
  Video.onVideoDelete(oid, vid, mvcur.mvData.deleteHash, function() {
    Videoview.recache(oid + '_' + vid);
    if (cur.module == 'im') {
      function checkVideoMedia() {
        var obj = this;
        if (hasClass(obj, 'post_video_title')) {
          obj = domPN(obj);
        }
        if (obj.getAttribute('href') == 'video' + oid + '_' + vid) {
          re(obj);
          return false;
        }
      }
      each(geByClass('page_post_thumb_wrap'), checkVideoMedia);
      each(geByClass('post_video_title'), checkVideoMedia);
    }
  });
},

_onTagPeople: function() {
  Videoview.showTagSelector();
},

_onExport: function() {
  Videoview.sendVideo(true);
},

_onViewStats: function() {
  showBox('al_stats.php', {act: 'video_stat', oid: mvcur.mvData.stats.stat_oid, vid: mvcur.mvData.stats.stat_vid}, {params: {width: 654}, dark: 1});
},

addToClubPlaylistBoxInit: function(box, clubs, hash) {
  var playlistsDD = null;
  var selectedGid = null;
  var playlistsCheckboxes = [];

  function updatePlaylistsDD(id, gid) {
    var row = ge('video_playlists_row');
    hide(row);

    var cbContainer = geByClass1('video_playlists_checkboxes');

    each(playlistsCheckboxes, function() {
      this.destroy();
    });
    cbContainer.innerHTML = '';

    if (id == -1) {
      selectedGid = null;
      return;
    }

    show('video_club_playlist_progress');
    ajax.post('/video', {act: 'a_get_club_playlists', gid: gid, oid: mvcur.mvData.oid, vid: mvcur.mvData.vid }, {
      onDone: function(playlists, added) {
        show(row);

        var playlistsHtml = '<div>';
        each(playlists, function(i, pl) {
          playlistsHtml += '<div class="video_pl_cb" data-id="' + pl.id + '" data-title="' + clean(pl.title) + '" data-added="' + (+pl.added) + '"></div>';
        });
        playlistsHtml += '<div>';

        cbContainer.appendChild(se(playlistsHtml));

        each(geByClass('video_pl_cb'), function() {
          var id = this.getAttribute('data-id');

          var cb = new Checkbox(this, {
            label: this.getAttribute('data-title'),
            playlistId: id,
            checked: this.getAttribute('data-added'),
            width: 170
          });

          playlistsCheckboxes.push(cb);
        });

        selectedGid = gid;
        hide('video_club_playlist_progress');
      }
    })
  }
  WideDropdown.deinit('add_to_pl_club_dd');
  mvcur.addToClubPl = WideDropdown.init('add_to_pl_club_dd', {
    defaultItems: clubs,
    noResult: 'no result',
    introText: 'choose',
    onChange: updatePlaylistsDD
  });

  setTimeout(elfocus.pbind('add_to_pl_club_dd_input'), 0);

  var saveButton = box.removeButtons().addButton(getLang('Save'), function(btn) {
    if (!selectedGid) {
      return;
    }
    var pl = [];
    each(playlistsCheckboxes, function(i, cb) {
      if (cb.checked()) {
        pl.push(cb.options.playlistId);
      }
    });
    ajax.post('/video', { act: 'a_add_to_playlist', hash: hash, gid: selectedGid, oid: mvcur.mvData.oid, vid: mvcur.mvData.vid, playlists: (pl.length ? pl : '0') }, {
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn),
      onDone: function() {
        curBox().hide();
        showDoneBox(getLang('video_changes_saved'));
      }
    })
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
    mvcur.contSize = getSize(mvcur.mvBox);
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
  setStyle(mvcur.mvBox, {cursor: cursor});
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
    hide(mvcur.mvLoader);
    addEvent(mvcur.mvBox, 'mousemove', Videoview.changeCursor);
    ls.set('mv_minSize', mvcur.minSize);
    return false;
  }
  addClass(mvLayerWrap, 'mv_resizing');
  show(mvcur.mvLoader);
  addEvent(document, 'mouseup', cb);
  addEvent(document, 'mousemove', act);
  addEvent(document, 'drag', act);
  removeEvent(mvcur.mvBox, 'mousemove', Videoview.changeCursor);
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
        h: 210
      }
    }
  }

  var wrap = mvcur.minSize.wrap;
  mvcur.minSize.player = {w: wrap.w - 20, h: wrap.h - 37};

  Videoview.setStyle('mvCont', mvcur.mvCont, {
    left: '0px',
    top: '0px'
  });

  mvLayer.style.width = 'auto';

  if (mvcur.mvData) {
    Videoview.minimizePlayer();
  }

  if (window.tooltips) {
    tooltips.destroyAll(cur.mvBox);
  }

  removeEvent(window, 'resize', Videoview.onResize);
  removeEvent(document, 'webkitfullscreenchange mozfullscreenchange fullscreenchange', Videoview.onFullscreenChange);
  removeEvent(document, 'keydown', Videoview.onKeyDown);

  addEvent(window, 'resize', Videoview.minResize);
  if (Videoview.enabledResize()) {
    addEvent(mvcur.mvBox, 'mousedown', Videoview.startDrag);
    addEvent(mvcur.mvBox, 'mousemove', Videoview.changeCursor);
    mvcur.minDestroy = function() {
      removeEvent(mvcur.mvBox, 'mousedown', Videoview.startDrag);
      removeEvent(mvcur.mvBox, 'mousemove', Videoview.changeCursor);
      setStyle(mvcur.mvBox, {cursor: 'default'});
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

  var plBlockEl = Videoview.getPlaylistBlockEl();
  if (plBlockEl) {
    hide(plBlockEl);
    removeClass(ge('mv_box'), 'mv_plb_collapsed');
    removeClass(geByClass1('mv_data'), 'mv_wpl');
  }

  Videoview.updateExternalVideoFinishBlock();

  return false;
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

updateComposer: function() {
  var yc = ge('mv_your_comment');
  if (!yc || cur.mvYourComment == yc) return;

  if (cur.mvYourComment) {
    domPN(yc).replaceChild(cur.mvYourComment, yc);
    Videoview.hideEditReply();
    return;
  }
  if (mvcur.minimized || !isVisible(ge('mv_reply_box'))) {
    return;
  }
  var comp = data(ge('mv_comment'), 'composer');
  if (comp) {
    Composer.reset(comp);
    Composer.destroy(comp);
  }
  cur.mvYourComment = yc;
  cur.destroy.push(function(c) {
    var field = c.mvYourComment && geByTag1('textarea', c.mvYourComment), comp = field && data(field, 'composer');
    if (comp) {
      Composer.reset(comp);
      Composer.destroy(comp);
    }
  });
  var txt = ge('mv_comment');
  Wall.initComposer(txt, {
    lang: {
      introText: getLang('profile_mention_start_typing'),
      noResult: getLang('profile_mention_not_found')
    },
    wddClass: 'mv_composer_dd',
    width: getSize(domPN(cur.mvYourComment))[0],
    media: {
      lnk: domFC(ge('mv_add_media')),
      preview: ge('mv_media_preview'),
      types: mvcur.mvMediaTypes,
      options: {limit: 2, disabledTypes: ['album'], toggleLnk: true, onChange: function() {
        setTimeout(Videoview.updateArrowsY, 2);
      }}
    }
  });
  stManager.add(['emoji.js', 'notifier.css'], function() {
    mvcur.mvEmoji = Emoji.init(txt, {
      ttDiff: -48,
      rPointer: true,
      controlsCont: txt.parentNode,
      onSend: function() {
        if (!buttonLocked('mv_comment_send')) {
          Videoview.sendComment();
        }
      },
      noEnterSend: 1,
      //sharedTT: cur.sharedIm,
      onStickerSend: function(stNum) {
        Videoview.sendComment(false, stNum);
      }
    });
    setTimeout(function () {
      hide(geByClass1('input_back_wrap', ge('mv_reply_box')));
    }, 0);
  });
  if (!cur.options) cur.options = {};
  if (!cur.options.share) cur.options.share = mvcur.mvMediaShare;
},
switchComposer: function(element) {
  checkbox(element);
  if (isChecked(element)) {
    hide('mv_user_comment');
    show('mv_group_comment');
  } else {
    show('mv_user_comment');
    hide('mv_group_comment');
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
      Videoview.updateComposer();
      cur.mvReplyIn = mvcur.videoRaw;
      cur.mvReplyTo = mvcur.mvReplyTo;
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

  Videoview.restoreStyle('mvCont', mvcur.mvCont);
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

  var plBlockEl = Videoview.getPlaylistBlockEl();
  if (plBlockEl && window.Videocat) {
    Videoview.togglePlaylistBlockStateClasses();
    mvcur && mvcur.videoRaw && Videocat.setPlaylistCurrentVideo(mvcur.videoRaw);
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

createDD: function(obj, items, callback) {
  var dd = obj.nextSibling;
  if (hasClass(obj, 'mv_report_blocked')) {
    return;
  }
  if (!dd || !hasClass(dd, 'mv_controls_dd')) {
    var text = geByClass1('mv_dd_text', obj).innerHTML;
    var dd = se('<div onmouseover="videoview.showDD(ge(\''+obj.id+'\'), this);" onmouseout="videoview.hideDD(500);" onclick="videoview.hideDD(-1);" class="mv_controls_dd fixed">'+
  '<table cellspacing="0" cellpadding="0"><tbody><tr>'+
  '<td class="mvs_side_sh">'+
    '<div class="mvs_side_sh_el"></div>'+
  '</td><td>'+
    '<div class="mvs_header_wrap">'+
      '<div class="mvs_header">'+
        '<span class="mvs_header_text">'+text+'</span>'+
      '</div>'+
    '</div>'+
    '<div class="mvs_acts">'+
    '</div>'+
    '<div class="mvs_sh1"></div>'+
    '<div class="mvs_sh2"></div>'+
  '</td><td class="mvs_side_sh">'+
    '<div class="mvs_side_sh_el"></div>'+
  '</td>'+
  '</tr></tbody></table></div>');
    var acts = geByClass1('mvs_acts', dd);
    for(var i in items) {
      var el = ce('a', {className: 'mvs_act', onclick: callback.pbind(items[i][0]), innerHTML: '<span class="mvs_act_text">'+items[i][1]+'</span>'});
      acts.appendChild(el)
    }
    obj.parentNode.insertBefore(dd, obj.nextSibling)
    debugLog(dd);
  }
  videoview.showDD(obj, dd);
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
    shift: [0, 0, 0],
    showdt: 0
  });
},

isPlaylistBlockCollapsed: function() {
  var plbWrapEl = Videoview.getPlaylistBlockEl();
  return plbWrapEl && hasClass(plbWrapEl, 'video_plb_collapsed');
},

togglePlaylistsBlock: function(doShow, noAnim, userAction) {
  doShow = !!doShow;

  if (mvcur.minimized && doShow) return;

  toggleClass(ge('mv_box'), 'mv_plb_collapsed', !doShow && !mvcur.minimized);

  var playerEl = Videoview.getPlayerObjectEl();
  var playlistBlockEl = Videoview.getPlaylistBlockEl();
  var wrapEl = domPN(playerEl);
  var mvContentEl = ge('mv_content');

  if (!playlistBlockEl || Videoview.isPlaylistBlockCollapsed() == !doShow) {
    return;
  }

  addClass(ge('mv_top_pl_toggle'), 'mv_btn_move_transition');

  var newWidth = doShow ? mvcur.mvData.PLAYER_PL_WIDTH : mvcur.mvData.PLAYER_FULL_WIDTH;
  var newHeight = doShow ? mvcur.mvData.PLAYER_PL_HEIGHT : mvcur.mvData.PLAYER_FULL_HEIGHT;

  var isFlash = !!ge('video_player'), MV_TRANSITION_CLS = 'mv_player_dimensions_transition';

  function setPlayerStyles() {
    !noAnim && addClass(playerEl, MV_TRANSITION_CLS);
    !noAnim && addClass(mvContentEl, MV_TRANSITION_CLS);

    setStyle(playerEl, {
      //width: newWidth,
      //height: newHeight
    });

    if (!isFlash) {
      !noAnim && addClass(wrapEl, MV_TRANSITION_CLS);
      setStyle(wrapEl, {
      //  width: newWidth,
      //  height: newHeight
      });
    }

    toggleClass(playlistBlockEl, 'video_plb_collapsed', !doShow);
  }

  function setPlayerDimensions() {
    //playerEl.setAttribute('width', newWidth);
    //playerEl.setAttribute('height', newHeight);
  }

  var mvDataEl = geByClass1('mv_data');

  if (doShow) {
    show(playlistBlockEl);
  } else {
    if (isFlash) {
      removeClass(mvDataEl, 'mv_wpl');
    }
  }

  setPlayerDimensions();
  setPlayerStyles();

  if (doShow) {
    show(playlistBlockEl);
    addClass(mvDataEl, 'mv_wpl');
  } else {
    removeClass(mvDataEl, 'mv_wpl');
  }

  if (!noAnim) {
    setTimeout(function() {
      if (doShow) {
        addClass(mvDataEl, 'mv_wpl');
      }
      removeClass(wrapEl, MV_TRANSITION_CLS);
      removeClass(playerEl, MV_TRANSITION_CLS);
      removeClass(mvContentEl, MV_TRANSITION_CLS);

      toggle(playlistBlockEl, doShow);

      var playerObject = Videoview.getPlayerObject();
      playerObject && playerObject.onResize && playerObject.onResize();
    }, 150); // animation length
  }

  Videoview.updatePlaylistBoxPosition();

  var sb = data(playlistBlockEl, 'sb');
  sb && sb.update();

  if (userAction) {
    ajax.post('/al_video.php', { act: 'a_videoview_stat', action: doShow ? 'show_playlist_block' : 'hide_playlist_block' });
  }

  return false;
},

updatePlaylistBoxPosition: function() {
  var plBlockEl = Videoview.getPlaylistBlockEl();
  if (!plBlockEl || Videoview.isPlaylistBlockCollapsed()) return;

  var mvsize = getSize(mvcur.mvContent);
  if (!mvsize[0] && !mvsize[1] || window.mvcur && mvcur.minimized) {
    hide(plBlockEl);
    return;
  }

  show(plBlockEl);
  var mvpos = getXY(geByClass1('mv_data'));
  var blockWidth = getSize(plBlockEl)[0];

  var left = mvpos[0] + mvsize[0] - blockWidth, top = mvpos[1];

  if (!left && !top) {
    hide(plBlockEl);
    return;
  }

  setStyle(plBlockEl, {
    left: left + 'px',
    top: top + 'px'
  });

  if (window.Videocat && !data(plBlockEl, 'sb')) {
    var sb = new Scrollbar(geByClass1('video_plb_list'), {prefix: 'mv_pl_', nokeys: true, onInit: function() {
      Videocat.setPlaylistCurrentVideo();
    }});
    data(plBlockEl, 'inited', true);
    data(plBlockEl, 'sb', sb);

    setTimeout(function() {
      var blockEl = Videoview.getPlaylistBlockEl();
      if (blockEl) {
        Videocat.setPlaylistCurrentVideo();
        var sb = data(plBlockEl, 'sb');
        sb && sb.update(true);
      }
    }, 400); // 400 is animate speed for inner scroll
  }
},

viewScroll: function(noRepeat) {
  //hardcoded
  var topOffset = 6;
  var controls = ge('mv_top_controls');
  var box = domPN(domPN(controls));

  var pos;
  if (box.getBoundingClientRect) {
    pos = box.getBoundingClientRect().top;
  } else {
    pos = getXY(box, true)[1];
  }

  pos = pos - topOffset;
  pos = pos < 0 ? -pos : 0;

  setStyle(controls, 'top', pos);
  if (!noRepeat) {
    setTimeout(function() {videoview.viewScroll(true);}, 1);
  }

  mvcur.scrolledAway = pos > getSize(ge('mv_content'))[1] / 3;
  Videoview.playerNextTimerUpdate();

  // update also playlist controls
  var plControlsPrev = ge('mv_pl_prev');
  var plControlsNext = ge('mv_pl_next');
  setStyle(plControlsPrev, 'top', pos);
  setStyle(plControlsNext, 'top', pos);

  Videoview.updatePlaylistBoxPosition();
},
editInline: function(ev, noreq) {
  if (((ev || window.event || {}).target || {}).tagName == 'A' || !window.mvcur || mvcur.mvEditing || !ge('mv_description')) return;

  var videoRaw = mvcur.videoRaw, mvShown = mvcur.mvShown, mvData = mvcur.mvData, noreq = !mvData.desc;
  var onDone = function(text) {
    if (!mvcur.mvShown || mvcur.videoRaw != videoRaw || mvcur.mvShown != mvShown || mvcur.mvEditing) return;

    Videoview.cleanExpandDescrEls();

    mvcur.mvEditing = videoRaw;
    var mrg = '0px 0px 0px', taStyle = '';
    if (browser.chrome || browser.msie || browser.safari) {
      mrg = '0px 0px -5px';
      taStyle = ' style="padding-bottom: 0px"';
    } else if (browser.mozilla) {
      mrg = '0px -1px 0px';
    }
    var el = ge('mv_description').appendChild(ce('div', {innerHTML: '\
<div style="margin: ' + mrg + '">\
<textarea id="mv_edit_text"' + taStyle + ' onkeydown="onCtrlEnter(event, videoview.saveInline)" onkeyup="checkTextLength(mvcur.mvCaptionLimit, this, ge(\'mv_caption_warn\'));" placeholder="' + getLang('video_edit_desc_intro') + '">' + text + '</textarea>\
  <div id="mv_caption_warn"></div>\
</div>'}, {display: 'none'})), txt = ge('mv_edit_text');
    placeholderSetup(txt, {back: 1});
    autosizeSetup(txt, {minHeight: 13});
    setTimeout(function() {
      show(el);
      elfocus(txt);
      addEvent(txt, 'blur', videoview.saveInline);
      var field = geByClass1('js_mv_descr_field', ge('mv_description'));
      hide(field);
    }, 1);
  };
  if (!noreq) {
    ajax.post('al_video.php', {act: 'edit_desc', oid: mvData.oid, vid: mvData.vid}, {onDone: onDone, progress: 'mv_inlineedit_prg'});
  } else {
    onDone('');
  }
},
cancelInline: function() {
  mvcur.mvEditing = false;
  removeEvent(ge('mv_edit_text'), 'blur');
  show(ge('mv_description').firstChild);
  re(ge('mv_description').firstChild.nextSibling);
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
    var d = domFC(ge('mv_description'));
    val(d, text || ('<span class="mv_desc_edit">' + getLang('video_edit_desc') + '</span>'));
    d.onmouseover = text ? videoview.descTT.pbind(d) : function() {};
    show(d);
    re(domNS(d));
  }, progress: 'mv_inlineedit_prg'});
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
    if (containerSize[0] > 250 && containerSize[1] > 200) {
      extendedActions = true;
    } else {
      minActions = true;
    }
  }

  var isMinimized = window.mvcur && mvcur.minimized;

  var finishBlock = se('\
<div class="mv_external_finish" id="mv_external_finish">\
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

  if (mv.noControls) {
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
  Videocat.nextVideo();
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

_eof: 1}, videoview = Videoview;try{stManager.done('videoview.js');}catch(e){}
