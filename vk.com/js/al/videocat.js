window.Videocat = window.Videocat || {

  VIDEO_MODULE: 'videocat',

  lists: {},

  updateTitle: function(el) {
    if (el.getAttribute('title') && el.scrollWidth <= el.clientWidth) {
      el.removeAttribute('title');
    }
  },

  addList: function(list) {
    Videocat.lists = Videocat.lists || {};
    if (Videocat.lists[list.id]) {
      Videocat.lists[list.id].list = Videocat.lists[list.id].list.concat(list.list);
    } else {
      Videocat.lists = extend(Videocat.lists, list);
    }
  },

  mergeLists: function(aList, bList) {
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

    return resultList;
  },

  removeList: function(listId) {
    if (Videocat.lists) {
      delete Videocat.lists[listId];
    }
  },

  init: function(moreBlocks, feedData, preloadLists, lists, top3playlists) {
    Videocat.lists = extend(Videocat.lists || {}, lists);
    Videocat.moreBlocks = moreBlocks;
    Videocat.feedData = feedData;
    Videocat.preloadLists = preloadLists;
    Videocat.top3playlists = top3playlists;

    var videoCatPageEl = ge('videocat_page');

    var bodyEl = geByTag1('body');
    var pageHeight = getSize(videoCatPageEl)[1];
    cur.videoCatRecomsLoaded = false;
    cur._sessionChannelsSubscriptions = [];
    addEvent(window, 'scroll', function(event) {
      var st = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      //if (!cur.vSection || cur.vSection == 'recoms') {
      //  cur.videoCatPageScroll = bodyEl.scrollTop;
      //}

      if (!cur.videoCatRecomsLoaded && (st + window.innerHeight) > pageHeight - 400 ) {
        cur.videoCatRecomsLoaded = true;
        ajax.post('al_video.php', { act: 'a_load_catrecoms' }, {
          showProgress: function() {
            show(cur.bottomProgress);
          },
          hideProgress: function() {
            hide(cur.bottomProgress);
          },
          onDone: function(recomsHtml, recomsData, recomsList) {
            if (recomsHtml) {
              Videocat.currRecomParams = recomsData;
              var catPageEl = ge('videocat_page');
              if (catPageEl) {
                var recomsEl = se(trim(recomsHtml));
                catPageEl.appendChild(recomsEl);
                show('videocat_divider_recoms');
              }

              if (!recomsData || !recomsData.more || (recomsList && recomsList.recom.list.length % 3)) {
                var moreBtn = geByClass1('videocat_more_toggle', recomsEl);
                moreBtn && re(moreBtn);
              }

              if (recomsList) {
                Videocat.lists = extend(Videocat.lists, recomsList);
              }
            }
          }
        });
      }
    });
  },

  removePlaylistBlock: function() {
    var block = Videocat.getPlaylistBlockEl();
    var sb = data(block, 'sb');
    if (sb) sb.destroy();
    re(block);
    removeData(block);
    Videocat._mvplBlockEl = false;
  },

  setCurrentPlaylist: function(listId, videoId) {
  },

  getPlaylistBlockEl: function() {
    return Videocat._mvplBlockEl || (Videocat._mvplBlockEl = ge('video_mvpl'));
  },

  show: function(ref, event, videoId, videoHash, playlistId, loadPlaylistOnShow) {
    if (checkEvent(event)) return true;

    stManager.add(['video.js', 'videoview.js', 'notifier.js'], function() {
      if (playlistId != Videocat.getCurrentPlaylistId()) {
        Videocat.setPlaylistCurrentVideo(videoId);
      }

      if (loadPlaylistOnShow && Videocat.lists && Videocat.lists[playlistId] && Videocat.lists[playlistId].list.length > 1) {
        loadPlaylistOnShow = false;
      }

      Video.show(event, videoId, {
        autoplay: 1,
        addParams: {
          force_no_repeat: 1,
          show_next: playlistId ? 1 : 0,
          playlist_id: playlistId,
          load_playlist: intval(loadPlaylistOnShow)
        },
        module: ['feed_block', 'feed_recoms_block'].indexOf(playlistId) >= 0 ? playlistId : Videoview.getVideoModule(videoId),
        playlistId: playlistId,
        listId: videoHash
      }, ref);
    });

    return false;
  },

  buildPlaylistBlock: function(playlistId, force) {
    var blockEl = Videocat.getPlaylistBlockEl();
    var list = blockEl ? data(blockEl, 'playlist') : false;

    if (list && list.id == playlistId && !force) return blockEl;

    Videocat.removePlaylistBlock();

    playlistId = (window.Video && (Video.isCurrentChannel() || Video.isCurrentCategory() || Video.isCurrentSectionAlbum() || Video.isInVideosList())) ? ('all_' + playlistId) : playlistId;
    var list = (Videocat.lists || {})[playlistId];
    if (!list || list.list.length <= 1) return false;

    if (cur.orderByViews) {
      list.list.sort(function (x, y) { return y['views_num'] - x['views_num'];});
    }

    var tpl = trim(cur.plb_tpl);
    var tplItem = trim(cur.plb_item_tpl);

    var itemsHtml = '';
    each(list.list, function(i, video) {
      itemsHtml += rs(tplItem, video);
    });

    var blockEl = se(rs(tpl, {
      items: itemsHtml,
      title: list.title || ''
    }));

    geByTag1('body').appendChild(blockEl);

    data(blockEl, 'playlist', list);

    var blockId = '';
    if (isNaN(playlistId)) {
      blockId = playlistId;
    } else if (playlistId < 0) {
      blockId = 'channel' + playlistId;
    } else {
      blockId = 'category' + playlistId;
    }
    if (Videocat.preloadLists && Videocat.preloadLists[blockId]) {
      var preloadList = Videocat.preloadLists[blockId];
      Videocat.preloadLists[blockId] = false;
      var hash = preloadList[0];
      preloadList = preloadList.slice(1);

      ajax.post('al_video.php', {act: 'a_fetch_row_items', list: preloadList.join(','), hash: hash, block_id: blockId }, {
        onDone: function(html, list) {
          var rowEl = null;
          each(geByClass('videocat_row'), function() {
            if (this.getAttribute('data-block-id') == playlistId) {
              rowEl = this;
              return false;
            }
          });
          Videocat.extendSlider(rowEl, html);

          if (list && list[playlistId]) {
            Videocat.lists[playlistId] = Videocat.lists[playlistId] || { list: [] };
            Videocat.lists[playlistId].list = Videocat.lists[playlistId].list.concat(list[playlistId].list);
          }

          var blockEl = Videocat.getPlaylistBlockEl();
          if (blockEl) {
            var contEl = geByClass1('video_plb_list_cont', blockEl);
            var tplItem = trim(cur.plb_item_tpl);
            each(list[playlistId].list, function(i, v) {
              var item = rs(tplItem, v);
              contEl.appendChild(se(item));
            });
            var sb = data(blockEl, 'sb');
            sb && sb.update();
          }
        }
      });
    }

    if (Video.isInVideosList() && vk.id == cur.oid || !(Videocat.lists && Videocat.lists[playlistId] && Videocat.lists[playlistId].list.length > 4)) {
      addClass(blockEl, 'video_plb_collapsed');
    }

    return blockEl;
  },

  setPlaylistCurrentVideo: function(vid, withAnim) {
    var blockEl = Videocat.getPlaylistBlockEl();
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

    if (selectedEl) {
      if (vid) {
        list.current = vid
      }

      var listEl = geByClass1('video_plb_list', blockEl);
      var selectedTop = getXY(selectedEl)[1];
      var listTop = getXY(listEl)[1];
      var listHeight = getSize(listEl)[1];

      var realTop = selectedTop - listTop - listEl.scrollTop;

      if (realTop > listHeight - 120 || realTop < 0) {
        var nst = selectedTop - listTop - 160;
        if (listEl.scrollTop != nst) {
          if (withAnim) {
            animate(listEl, {scrollTop: nst, transition: Fx.Transitions.easeOutCubic}, 450);
            setTimeout(function() {
              var plBlockEl = Videocat.getPlaylistBlockEl();
              if (plBlockEl) {
                var sb = data(plBlockEl, 'sb');
                sb && sb.update();
              }
            }, 400);
          } else {
            listEl.scrollTop = nst;
          }
        }
      }

      stManager.add(['video.js'], function() {
        Videocat._queueNextVideo(vid);
      });
    }
  },

  resetCurrentPlaylist: function() {
  },

  extendSlider: function(rowEl, html) {
    if (!rowEl) return;

    html = trim(html);
    if (!html) return;
    html = se(html);
    if (!html) return;

    Videocat._sliderExtends = Videocat._sliderExtends || [];
    Videocat._sliderExtends.push(function() {
      var sliderCont = geByClass1('videocat_row_slider_items_cont', rowEl);

      re(geByClass1('videocat_row_showmore', sliderCont));

      each(geByClass('videocat_row_item', html), function(i, item) {
        sliderCont.appendChild(item);
      });

      var btn = geByClass1('videocat_row_slider_btn_right', rowEl);

      Videocat.slideRow(btn, -3, true);
      Videocat.slideRow(btn, 3, true);
    });
  },

  _getCurrentPlaylistVideoIndex: function(vid) {
    if (!window.mvPlaylist) return false;

    var index = -1;
    each(window.mvPlaylist.playlist, function(i, v) {
      if (v == vid) {
        index = i;
        return false;
      }
    });

    return index;
  },

  getNextVideo: function(currentVideoId) {
    var nextVideoIndex = Videocat._getNextVideoIndex(currentVideoId);
    if (nextVideoIndex == -1) return null;

    var playlist = Videocat.getCurrentPlaylist();
    if (!playlist) return null;

    list = playlist.list;
    return list[nextVideoIndex];
  },

  _queueNextVideo: function(currentVideoId) {
    var playlist = Videocat.getCurrentPlaylist();
    if (!playlist) return;

    currentVideoId = currentVideoId || playlist.current;

    list = playlist.list;

    var nextVideoIndex = Videocat._getNextVideoIndex(currentVideoId);
    if (nextVideoIndex == -1) return;

    var nextVideo = list[nextVideoIndex];

    if (playlist.queued == nextVideo.vid) return; // video is queued
    if (playlist.loaded && playlist.loaded.vid == nextVideo.vid) return; // next video already loaded and awaits

    playlist.loaded = false;
    playlist.queued = nextVideo.vid;

    var showNext = nextVideoIndex < (list.length - 1) ? 1 : 0;

    Video.show(null, playlist.queued, {
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
      module: Videoview.getVideoModule(nextVideo.vid),
      addParams: { force_no_repeat: 1, preload: 1, show_next: showNext, playlist_id: playlist.id },
      listId: nextVideo.hash
    });
  },

  getCurrentPlaylistIndex: function(vid) {
    var list = Videocat.getCurrentPlaylist();
    if (!list) return -1;

    if (!list.current) return 0;

    var index = -1;
    each(list.list, function(i, v) {
      if (vid && vid == v.vid || !vid && v.vid == list.current) {
        index = i;
        return false;
      }
    });

    return index;
  },

  getCurrentPlaylistId: function() {
    var list = Videocat.getCurrentPlaylist();
    return list ? list.id : '';
  },

  getNextVideos: function() {
    var nextVideos = [];

    var list = Videocat.getCurrentPlaylist();
    var nextIndex = Videocat._getNextVideoIndex();

    if (list && nextIndex >= 0) {
      while(nextIndex < list.list.length) {
        nextVideos.push(list.list[nextIndex]);
        nextIndex ++;
      }
    }

    return nextVideos;
  },

  _getNextVideoIndex: function(currentVideoId) {
    var list = Videocat.getCurrentPlaylist();
    if (!list) return -1;

    currentVideoId = currentVideoId || list.current;

    if (!currentVideoId) return 0;

    var nextVideoIndex = -1;
    each(list.list, function(i, v) {
      if (v.vid == currentVideoId && list.list.length > (i + 1)) {
        nextVideoIndex = i + 1;
        return false;
      }
    });

    return nextVideoIndex;
  },

  prevVideo: function() {
    var playlist = Videocat.getCurrentPlaylist();
    if (!playlist || !playlist.current) return;

    var prevVideoIndex = -1;
    each(playlist.list, function(i, v) {
      if (v.vid == playlist.current && i > 0) {
        prevVideoIndex = i - 1;
        return false;
      }
    });

    if (prevVideoIndex == -1) return;
    var prevVideo = playlist.list[prevVideoIndex];

    showVideo(prevVideo.vid, prevVideo.hash || '', {
      autoplay: 1,
      addParams: { force_no_repeat: 1, show_next: 1 },
      module: Videoview.getVideoModule(prevVideo.vid),
      playlistId: playlist.id
    });
  },

  nextVideo: function() {
    var playlist = Videocat.getCurrentPlaylist();
    if (!playlist) return;

    var nextVideoIndex = -1;

    if (!playlist.current) {
      playlist.current = playlist.list[0]['vid'];
      nextVideoIndex = 0;
    } else {
      nextVideoIndex = Videocat._getNextVideoIndex();
    }

    if (nextVideoIndex == -1) return;

    var nextVideo = playlist.list[nextVideoIndex];

    if (playlist.loaded && playlist.loaded.vid == nextVideo.vid) {
      var loadData = playlist.loaded;

      videoview.show(null, nextVideo.vid, loadData.listId, extend(loadData.options, { playlistId: playlist.id }));
      videoview.showVideo.apply(videoview, loadData.hubData);

      // send stat data
      var statHash = mvcur.preloadStatsHashes ? mvcur.preloadStatsHashes[nextVideo.vid] : '';
      if (statHash) {
        ajax.post('/al_video.php', {act: 'a_inc_preload_stats', stat_preload_hash: statHash });
      }

      playlist.loaded = false;
    } else { // smth went wrong: preloaded video not loaded yet
      var showNext = nextVideoIndex < (playlist.list.length - 1) ? 1 : 0;

      showVideo(nextVideo.vid, nextVideo.hash || '', {
        autoplay: 1,
        addParams: { force_no_repeat: 1, show_next: showNext, playlist_id: playlist.id },
        module: Videoview.getVideoModule(nextVideo.vid),
        playlistId: playlist.id
      });
    }

    Videocat.setPlaylistCurrentVideo(nextVideo.vid, true);

    Videocat._queueNextVideo();
  },

  getCurrentPlaylist: function() {
    var blockEl = Videocat.getPlaylistBlockEl();
    return blockEl ? data(blockEl, 'playlist') : false;
  },

  videoSelectFromPlb: function(event, vid, ref) {
    if (event && checkEvent(event)) return true;

    var list = Videocat.getCurrentPlaylist();
    if (!list) return;

    if (/^video\-?\d+_\d+$/.test(nav.objLoc['0']) && window.mvcur && mvcur.mvPrevLoc) {
      nav.setLoc(mvcur.mvPrevLoc);
    }

    var currentIndex = Videocat.getCurrentPlaylistIndex(vid);
    var showNext = currentIndex < (list.list.length - 1) ? 1 : 0;
    var hash = list.list[currentIndex].hash;

    showVideo(vid, hash, {
      autoplay: 1,
      playlistId: list.id,
      addParams: { force_no_repeat: 1, show_next: showNext },
      module: Video.isInCatalogue() ? Videocat.VIDEO_MODULE : cur.module
    });

    return false;
  },

  sliderSubscribeTo: function(btn, gid, hash, unsubscribe) {
    var row = gpeByClass('videocat_row', btn);
    var subscrButton = geByClass1('videocat_block_subscribe', row);
    var unsubscrButton = geByClass1('videocat_block_unsubscribe', row);

    //notice: similar ajax-request in subscribeTo
    ajax.post('/al_video.php', { act: 'a_subscribe', hash: hash, gid: gid, unsubscribe: +(unsubscribe || 0), from: 'recomm_page' }, {
      showProgress: function() {
        lockButton(btn)
      },
      hideProgress: function() {unlockButton(btn)},
      onDone: function() {
        if(unsubscribe) {
          hide(unsubscrButton);
          show(subscrButton);
          cur._sessionChannelsSubscriptions[-gid] = false; // hack: see gotoChannel comment.
        }
        else {
          hide(subscrButton);
          show(unsubscrButton);
          cur._sessionChannelsSubscriptions[-gid] = true;
        }
      },
      onError: unlockButton(btn)
    });
  },

  subscribeTo: function(btn, gid, hash, unsubscribe) {
    function onHideProgress() {
      if (unsubscribe) {
        hide('video_channel_subs_progress');
      } else {
        unlockButton(btn)
      }
    }

    //notice: similar ajax-request in sliderSubscribeTo
    ajax.post('/al_video.php', { act: 'a_subscribe', hash: hash, gid: gid, unsubscribe: +(unsubscribe || 0) }, {
      showProgress: function() {
        if (unsubscribe) {
          hide('video_channel_subscribe_msg');
          show('video_channel_subs_progress');
        } else {
          lockButton(btn)
        }
      },
      hideProgress: onHideProgress,
      onDone: function() {
        Videocat.onChannelSubscribed(gid, hash, unsubscribe);
      },
      onError: onHideProgress
    })
  },

  onChannelSubscribed: function(channelId, subsHash, wasUnsubscribed) {
    var msgEl = ge('video_channel_subscribe_msg');
    var btnEl = ge('video_channel_subscribe');

    if (wasUnsubscribed) {
      show(btnEl);
      hide(msgEl);
      cur._sessionChannelsSubscriptions[-channelId] = false;  // hack: see gotoChannel comment.
    } else {
      cur._sessionChannelsSubscriptions[-channelId] = true;
      var subscribedMsg = getLang('video_you_are_subscribed');
      subscribedMsg = rs(subscribedMsg, { channelId: channelId, subsHash: subsHash });

      hide(btnEl);
      show(msgEl);
      msgEl.innerHTML = subscribedMsg;
    }
  },

  gotoChannel: function(event, oid, shortTitle, channelThumb, channelHref, isSubscribed, subsHash) {
    if (event && checkEvent(event)) return true;

    var section = 'channel' + oid;

    cur._channels = cur._channels || {};

    //temp hack (while isSubscribed param is in inline 'onclick')
    if(typeof cur._sessionChannelsSubscriptions[-oid] !== 'undefined') {
      isSubscribed = cur._sessionChannelsSubscriptions[-oid];
    }

    cur._channels[oid] = {
      oid: oid,
      shortTitle: shortTitle,
      thumb: channelThumb,
      href: channelHref,
      isSubscribed: isSubscribed,
      subsHash: subsHash
    };

    cur.videoList[section] = {
      needPreload: true
    };

    nav.change({section: section});

    return false;
  },

  gotoCategory: function(event, catId, title) {
    if (event && checkEvent(event)) return true;

    cur.categoryTitle = title;
    nav.change({section: 'cat_' + catId});

    return false;
  },

  collapseUGCPopular: function() {
    var ugcPopular = gpeByClass('videocat_row', ge('videocat_header_ugc_popular'));
    each(geByClass('videocat_row_item', ugcPopular), function(i) {
      toggle(this, i < 12);
    });
  },

  showMore: function(btn, countToShow, type) {
    var prev = btn.previousElementSibling;
    var done = false, remain = false;
    each(prev.children, function(i, c) {
      if (!isVisible(c)) {
        if (done) {
          remain = true;
          return false;
        }
        show(c);
        countToShow--;
        if (!countToShow) {
          done = true;
        }
      }
    });

    if (type == 'recom') {
      toggle(btn, Videocat.currRecomParams.more);
    } else {
      toggle(btn, remain);
    }

    if (type == 'recom') {
      ajax.post('/al_video.php', {
        act: 'a_fetch_next_recoms',
        from: Videocat.currRecomParams.from,
        offset: +Videocat.currRecomParams.offset,
        more: +Videocat.currRecomParams.more,
        params_sig: Videocat.currRecomParams.params_sig
      }, {
        onDone: function(html, params, list) {
          Videocat.currRecomParams = params;

          var wrapEl = geByClass1('videocat_grid_wrap', domPN(btn));
          var els = se(trim(html)).children;
          while(els.length) {
            wrapEl.appendChild(els[0]);
            hide(els[0]);
          }

          if (!params || !params.more) {
            re(btn);
          }

          if (list && list.recom && list.recom.list.length && Videocat.lists.recoms) {
            Videocat.lists.recoms.list = Videocat.lists.recoms.list.concat(list.recom.list);
          }
        }
      });
    }
  },

  showMoreBlocks: function(btn) {
    var nextBlocks = Videocat.moreBlocks[0];
    Videocat.moreBlocks = Videocat.moreBlocks.slice(1);

    var hasMore = Videocat.moreBlocks.length > 0;

    var textEl = geByClass1('videocat_more_toggle_text', btn);
    var progressEl = geByClass1('videocat_more_toggle_progress', btn);

    ajax.post('/al_video.php', {
      act: 'a_fetch_next_blocks',
      list: nextBlocks
    }, {
      showProgress: function() {
        hide(textEl);
        show(progressEl);
      },
      hideProgress: function() {
        show(textEl);
        hide(progressEl);
        toggle(btn, hasMore);
      },
      onDone: function(html, list) {
        if (list && !isEmpty(list)) {
          Videocat.lists = extend(Videocat.lists, list);
        }

        var wrapEl = ge('videocat_page');
        var els = se(trim(html)).children;
        while(els.length) {
          wrapEl.insertBefore(els[0], btn);
        }
      }
    });
  },

  slideRow: function(btn, offset, noFetch) {
    var parent = domPN(btn);
    var slider = geByClass1('videocat_row_slider_items_cont', parent);
    var sliderWrap = gpeByClass('videocat_row_slider', btn);
    var itemWidth = getSize(slider.children[0])[0] + 10 /* margin-right */;

    var ITEMS_IN_ROW = itemWidth > 270 ? 2 : 3;
    var offsetCount = ITEMS_IN_ROW * (offset > 0 ? 1 : -1);

    var curOffset = offsetCount + (data(slider, 'items_offset') || 0);

    curOffset = Math.min(curOffset, 0);
    curOffset = Math.max(curOffset, -slider.children.length + ITEMS_IN_ROW);

    data(slider, 'items_offset', curOffset);

    var addOffset;
    // some magic numbers for offset at start / middle / end positions
    if (curOffset == 0) {
      addOffset = 15;
    } else if (-curOffset == slider.children.length - ITEMS_IN_ROW) {
      addOffset = 56;
    } else {
      addOffset = 36;
    }

    setStyle(slider, { left: itemWidth * curOffset + addOffset });

    { // hide or show slider buttons
      var btnLeft = geByClass1('videocat_row_slider_btn_left', parent);
      var btnRight = geByClass1('videocat_row_slider_btn_right', parent);

      var btnLeftHide = curOffset == 0;
      var btnRightHide = -(curOffset - ITEMS_IN_ROW) >= slider.children.length;

      toggleClass(btnLeft, 'videocat_row_slider_hidden', btnLeftHide);
      toggleClass(btnRight, 'videocat_row_slider_hidden', btnRightHide);

      function initBtnHide(isHide, btn) {
        if (isHide) {
          addEvent(btn, 'mouseleave', function() {
            setStyle(btn, 'pointer-events', 'none');
            removeEvent(btn, 'mouseleave');
          });
        } else {
          setStyle(btn, 'pointer-events', 'all');
        }
      }

      initBtnHide(btnLeftHide, btnLeft);
      initBtnHide(btnRightHide, btnRight);

      // reset shift
      btnLeftHide && Videocat.slideMouseLeave(btnLeft, 'right');
      btnRightHide && Videocat.slideMouseLeave(btnRight, 'left');

      toggleClass(sliderWrap, 'videocat_slider_offseted', !btnLeftHide && !btnRightHide);
    }

    { // dynamic image load and transparency of edge items
      cur._slideTimeouts = cur._slideTimeouts || [];
      each(cur._slideTimeouts, function(i, timer) {
        clearTimeout(timer);
      });

      each(geByClass('videocat_row_item', parent), function(i) {
        if ((i >= -curOffset + ITEMS_IN_ROW) && (i < -curOffset + 2 * ITEMS_IN_ROW)) {
          var thumb = this.getAttribute('data-thumb');
          if (thumb) {
            setStyle(
              geByClass1('videocat_row_video_thumb', this),
              'background-image',
              'url(\'' + thumb + '\')'
            );
          }
        }

        if (i == -curOffset - 1 || i == -curOffset + ITEMS_IN_ROW) {
          (function(item) {
            cur._slideTimeouts.push(setTimeout(function() {
              addClass(item, 'videocat_item_transparent');
            }, 270));
          })(this);
        } else {
          removeClass(this, 'videocat_item_transparent');
        }
      });
    }

    if (!noFetch && Videocat._sliderExtends) {
      each(Videocat._sliderExtends, function(i, f) { f(); });
      Videocat._sliderExtends = [];
    }

    if (!noFetch && offset < 0) {
      var rowEl = gpeByClass('videocat_row', btn);
      var rowType = rowEl ? rowEl.getAttribute('data-block-id') : '';

      { // dynamic loading
        if (rowType) {
          var blockId = '';
          if (isNaN(rowType)) {
            blockId = rowType;
          } else if (rowType < 0) {
            blockId = 'channel' + rowType;
          } else {
            blockId = 'category' + rowType;
          }

          if (Videocat.preloadLists && Videocat.preloadLists[blockId]) {
            var preloadList = Videocat.preloadLists[blockId];
            Videocat.preloadLists[blockId] = false;
            var hash = preloadList[0];
            preloadList = preloadList.slice(1);

            ajax.post('al_video.php', {act: 'a_fetch_row_items', list: preloadList.join(','), hash: hash, block_id: blockId }, {
              onDone: function(html, list) {
                if (list) {
                  each(list, function(blockId, info) {
                    var extendList = info.list;
                    if (extendList && extendList.length && Videocat.lists[blockId]) {
                      Videocat.lists[blockId].list = Videocat.lists[blockId].list.concat(extendList);
                    }
                  });
                }
                Videocat.extendSlider(rowEl, html);
              }
            });
          }
        }
      }

      if (!Videocat.feedDataLoading && rowEl && rowEl.getAttribute('data-block-id') == 'feed' && Videocat.feedData && !isEmpty(Videocat.feedData)) {
        Videocat.feedDataLoading = true;

        var q = Videocat.feedData;
        q.act = 'a_fetch_next_feed';
        q.module = cur.module;
        ajax.post('al_video.php', q, {
          onDone: function(html, list, feedFrom, feedOffset, hash) {
            Videocat.feedData = extend(Videocat.feedData, {
              video_feed_from: feedFrom,
              video_feed_offset: feedOffset,
              hash: hash
            });

            if (!feedFrom) {
              Videocat.feedData = false;
            }

            if (list && list.feed) {
              Videocat.lists.feed = Videocat.lists.feed || {};
              Videocat.lists.feed.list = Videocat.lists.feed.list.concat(list.feed.list);
            }

            Videocat.extendSlider(rowEl, html);

            Videocat.feedDataLoading = false;
          }
        })
      }
    }
  },

  slideMouseEnter: function(btn, side) {
    var parent = domPN(btn);
    var slider = geByClass1('videocat_row_slider_items_cont', parent);
    if (!hasClass(btn, 'videocat_row_slider_hidden')) {
      addClass(slider, 'videocat_row_slider_shift_' + side);
    }
  },

  slideMouseLeave: function(btn, side) {
    var parent = domPN(btn);
    var slider = geByClass1('videocat_row_slider_items_cont', parent);
    removeClass(slider, 'videocat_row_slider_shift_' + side);
  },

  toggleRepeat: function(event, btn) {
    var propName = 'playlistAutoplay';
    var curValue = ls.get(propName);

    ls.set(propName, !curValue);

    toggleClass(btn, 'video_header_btn_active', curValue);
  },

  isAutoplayEnabled: function() {
    return false;
  },

  closeBlock: function(ref, blockId, hash) {
    var blockEl = gpeByClass('videocat_row', ref);
    setStyle(blockEl, { 'max-height': 300 });
    setStyle(ref, { 'opacity': 0 });
    setTimeout(function() {
      setStyle(blockEl, { opacity: 0, 'max-height': 0, marginTop: 0 });
    });
    ajax.post('al_video.php', { act: 'a_videocat_closeblock', block_id: blockId, hash: hash });
  },

  initFullPlaylist: function(listId, videoId) {
    Videocat.lists = Videocat.lists || {};

    if (!listId) {
      return false;
    }

    if (Videocat.lists[listId] && Videocat.lists[listId].list.length) {
      return true;
    }

    var list = {
      id: listId,
      title: '',
      list: []
    };
    var videoIndex = -1;
    var videoList = [];

    if (window.Video) {
      if (Video.isCurrentChannel()) {
        list.title = val(geByClass1('video_channel_title'));
      } else if (Video.isCurrentCategory()) {
        list.title = cur.categoryTitle;
      } else if (Video.isCurrentSectionAlbum()) {
        var albumTitle = 'Album', albumId = cur.vSection.substr('album_'.length);
        each(cur.sections, function(i, s) {
          if (s[0] == albumId) {
            albumTitle = s[1];
            return false;
          }
        });
        list.title = albumTitle;
      } else if (Video.isInVideosList()) {
        switch (cur.vSection) {
          case 'all':
            list.title = cur.allPlaylistTitle;
            break;
          case 'uploaded':
            list.title = cur.uploadedPlaylistTitle;
            break;
          case 'tagged':
            list.title = cur.taggedPlaylistTitle;
            break;
        }
      }

      if (Video.isCurrentChannel() || Video.isCurrentCategory() || Video.isCurrentSectionAlbum() || Video.isInVideosList()) {
        videoList = cur.videoList[cur.vSection].list;
      }
    }

    each(videoList, function(i, v) {
      var rawId = v[0] + '_' + v[1];

      list.list.push({
        vid: rawId,
        title: v[3],
        thumb: v[2],
        duration: v[9],
        views: langNumeric(v[16] || 1, cur.lang.video_views_count, true),
        views_num: v[16],
        hash: '',
      });
    });

    if (cur.orderByViews) {
      list.list.sort(function (x, y) {
        return y['views_num'] - x['views_num'];});
    }

    for (var i = 0; i < list.list.length; i++) {
      var v = list.list[i];
      if (v['vid'] == videoId) {
        videoIndex = i;
        break;
      }
    }


    list.list = list.list.slice(Math.max(0, videoIndex - 50), Math.min(list.list.length, videoIndex + 50));

    if (list.list && list.list.length > 1) {
      Videocat.lists = Videocat.lists || {};
      Videocat.lists['all_' + listId] = list;

      return videoIndex < list.list.length;
    }

    return false;
  },

  isTop3Playlist: function(plId) {
    var found = false;
    each(Videocat.top3playlists || [], function(i, top3plId) {
      if (top3plId == plId) {
        found = true;
        return false;
      }
    });
    return found;
  }
};

try{stManager.done('videocat.js');}catch(e){}
