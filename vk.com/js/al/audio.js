var Audio = {
  address: '/audio',
  scrollnode: browser.msie6 ? pageNode : window,
  fixedScroll: !(browser.msie && browser.version < 8 || browser.mobile),
  initPad: function()  {
    if (window._pads && _pads.cur) {
      var __cur = _pads.cur;
      extend(__cur, {
        searchCont: ge('pad_audio_search'),
        aSearch: ge('pad_search'),
        clearSearch: ge('pad_audio_reset'),
        aContent: ge('pad_playlist'),
        sContent: ge('pad_search_list'),
        sPreload: ge('pad_search_preload'),
        showMore: ge('pad_more_audio'),
        sShowMore: ge('pad_more_search_link'),
        sWrap: ge('pad_audio_search_wrap'),
        sSummary: ge('pad_audio_search_summary'),
        albumFilters: ge('pad_album_filters'),
        audioFriends: ge('pad_audio_friends'),
        albumFiltered: ge('pad_album_filtered'),
        popularFilters: ge('pad_audio_popular_filters'),
        audioAlbums: ge('pad_audio_albums'),
        searchFilters: ge('pad_audio_search_filters'),
        popularOwners: ge('pad_audio_popular_owners'),
        popularGenres: ge('pad_audio_genres'),
        audioAlbumsWrap: ge('pad_audio_albums_wrap'),
        searchInfoCont: ge('pad_audio_search_info'),
        feedFilter: ge('pad_feed_filter'),
        topFilter: ge('pad_top_audios'),
        recFilter: ge('pad_recommendations'),
        albumsFilter: ge('pad_audios_albums'),
        friendsList: ge('pad_audio_friends_list'),
        currentFilter: ge('pad_current_filter'),
        friendsSearch: ge('pad_audio_friends_search_input'),
        audioMoreFriensId: 'pad_audio_more_friends',
        popularPerformersId: 'pad_audio_performers',
        searchStr: '',
        htitle: getLang('audio_header')
      });
      __cur.audiosList = __cur.audiosList || {};
      __cur.audios = __cur.audios || {};
      if (cur.module == 'audio' && cur.oid == vk.id && cur.audiosList && cur.audiosList['all']) {
        __cur.audiosList['all'] = clone(cur.audiosList['all']);
        __cur.allAudiosIndex = 'all';
        if (cur.summaryLang) {
          __cur.summaryLang = extend(__cur.summaryLang || {}, cur.summaryLang);
        }
        Audio.generateAlbums(true);
        Audio.changeAllIndex({from_pad: true, index: 'all', clbk: function() {}});
      }
      Audio.startPadEvents();
    }
  },
  init: function(obj, audioTpl) {
    extend(cur, {
      searchCont: ge('audio_search'),
      aSearch: ge('s_search'),
      clearSearch: ge('audio_query_reset'),
      aContent: ge('initial_list'),
      sContent: ge('search_list'),
      sPreload: ge('search_preload'),
      showMore: ge('more_link'),
      sShowMore: ge('s_more_link'),
      sWrap: ge('audio_search_wrap'),
      sSummary: ge('audio_search_summary'),
      albumFilters: ge('album_filters'),
      albumFiltered: ge('album_filtered'),
      searchFilters: ge('audio_search_filters'),
      popularFilters: ge('audio_popular_filters'),
      popularOwners: ge('audio_popular_owners'),
      popularGenres: ge('audio_genres'),
      audioFriends: ge('audio_friends'),
      audioAlbums: ge('audio_albums'),
      audioAlbumsWrap: ge('audio_albums_wrap'),
      audioWrap: ge('audio_wrap'),
      searchInfoCont: ge('audio_search_info'),
      feedFilter: ge('feed_filter'),
      topFilter: ge('top_audios'),
      recFilter: ge('recommendations'),
      albumsFilter: ge('audios_albums'),
      friendsList: ge('audio_friends_list'),
      friendsSearch: ge('audio_friends_search_input'),
      audioMoreFriensId: 'audio_more_friends',
      popularPerformersId: 'audio_performers',
      searchStr: "",
      autoComplete: 1,
      audioTpl: audioTpl,
      audioEl: {
        head: ge('page_header'),
        bar: ge('ac'),
        cont: ge('audio'),
        filters: ge('side_filters')
      }
    });

    if (ge('ac') && window.audioPlayer) {
      audioPlayer.initEvents();
      audioPlayer.registerPlayer('ac', {
        container: ge('ac'),
        performer: ge('ac_performer'),
        title: ge('ac_title'),
        titleWrap: ge('ac_name'),
        duration: ge('ac_duration'),
        load: ge('ac_load_line'),
        progress: ge('ac_pr_line'),
        progressArea: ge('ac_pr'),
        volume: ge('ac_vol_line'),
        volumeArea: ge('ac_vol'),
        play: ge('ac_play'),
        prev: ge('ac_prev'),
        next: ge('ac_next'),
        add: ge('ac_add'),
        repeat: ge('ac_repeat'),
        shuffle: ge('ac_shuffle'),
        rec: ge('ac_rec'),
        status: ge('ac_status'),
        fixed: !(browser.msie && browser.version < 8 || browser.mobile)
      });
    }
    if (browser.mobile) {
      hide('ac_vol');
      setStyle('ac_duration', {margin: 0});
    }

    if (!cur.allAudiosIndex) cur.allAudiosIndex = 'all';

    extend(cur, obj);
    cur.module = 'audio';
    //cur.disableAutoMore = true;
    if (cur.aSearch) {
      cur.aSearch.value = cur.q;
      toggleClass(cur.clearSearch, 'shown', !!cur.q);
      placeholderSetup(cur.aSearch, {back: true});
      setTimeout(function() {
        cur.aSearch.focus();
      }, 0);
    }
    if (ge('audio_friends_search_input')) {
      placeholderSetup(ge('audio_friends_search_input'));
    }

    Audio.scrollnode = browser.msie6 ? pageNode : window;
    Audio.fixedScroll = !(browser.msie && browser.version < 8 || browser.mobile);
    window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0;
    Audio.startEvents();
    cur.destroy.push(function() {
      Audio.stopEvents();
    });

    cur.nav.push(function(changed, old, n) {
      if (changed.act == 'popular') {
        Audio.loadPopular({update: true, genre: intval(n.genre)});
        return false;
      }
    });


    var _a = window.audioPlayer;
    if (_a && _a.showCurrentTrack) {
      _a.shuffle = false;
      _a.showCurrentTrack();
    }

    cur.audios = {};
    hide(cur.sContent);

    cur.silent = true;
    var query = {act: 'load_audios_silent', id: (cur.allAudiosIndex == 'all' ? cur.id : cur.audioFriend), gid: cur.gid, claim: nav.objLoc.claim, please_dont_ddos: 2};
    if (cur.allAudiosIndex != 'all') {
      Audio.cacheFriendsList();
    }
    if (cur.club) {
      cur.curSection = 'club' + cur.club;
      query.club = cur.club;
      cur.searchStr = cur.q;
    }
    ajax.post(Audio.address, query, {onDone: (function(data, opts) {
      opts = eval('('+opts+')');
      if (opts.exp) {
        _a.statusExport = opts.exp;
        checkbox('currinfo_audio', (_a.hasStatusExport()));
        if (_a && _a.showCurrentTrack) _a.showCurrentTrack();
        delete opts.exp;
      }
      extend(cur, opts);
      if (cur.hashes && cur.hashes.add_hash && !_a.addHash) {
        _a.addHash = cur.hashes.add_hash;
      }
      if (query.id > 0) {
        cur.allFriendsTitles = cur.allFriendsTitles || {};
        cur.allFriendsTitles[query.id] = opts.summaryLang.all_friend_title;
        cur.allFriendsHTitles = cur.allFriendsHTitles || {};
        cur.allFriendsHTitles[query.id] = opts.summaryLang.all_friend_htitle;
      }
      var obj = eval('('+data+')');
      if (!obj) {
        return;
      }
      cur.audiosList = cur.audiosList || {};
      if ((query.club || query.id < 0) && obj.club) {
        var club = query.club || -query.id;
        cur.allClubsHTitles = cur.allClubsHTitles || {};
        cur.allClubsHTitles[club] = opts.summaryLang.all_club_htitle || cur.htitle;
        cur.allFriendsHTitles = cur.allFriendsHTitles || {};
        cur.allFriendsHTitles[-club] = opts.summaryLang.all_club_htitle || cur.htitle;
        cur.curList = 'club' + club;
        cur.audiosList[cur.curList] = obj.club;
      } else {
        cur.curList = (cur.album_id) ? 'album'+cur.album_id : cur.allAudiosIndex;
      }
      cur.searchOffset = 0;
      cur.audiosList[cur.allAudiosIndex] = obj.all ? obj.all : [];
      if (cur.allAudiosIndex == 'all') Audio.generateAlbums();
      cur.sectionCount = (cur.audiosList[cur.curList] || []).length;
      if (cur.canEdit && nav.objLoc.act != 'popular' && nav.objLoc.act != 'recommendations' && nav.objLoc.act != 'feed' && !browser.mobile && cur.allAudiosIndex == 'all' && !cur.shuffled && !cur.club) {
        if (cur.sectionCount) {
          var opts = {onReorder: Audio.onAudioReorder, onMouseDown: Audio.onDragStart, onMouseUp: Audio.onDragEnd, noMoveCursor: 1};
          if (cur.audioAlbumsWrap) {
            extend(opts, {target: cur.audioAlbumsWrap, onDragOver: Audio.onDragOver, onDragOut: Audio.onDragOut});
          }
          sorter.init(cur.aContent, opts);
        }
      }
      if (cur.albums) {
        Audio.initAlbumsSort();
      }
      this.indexAll({callback: function() {
        cur.silent = false;
        if (cur.onSilentLoad) {
          cur.onSilentLoad();
        }
        if (!cur.q || cur.club) {
          if (cur.curSection == 'recommendations' || cur.curSection == 'popular' || cur.curSection == 'feed') {
            if (cur[cur.curSection+'Audios']) {
              var k = 0;
              for (var i in cur[cur.curSection+'Audios']) {
                cur[cur.curSection+'Audios'][i]._order = k++;
              }
              audioPlayer.genPlaylist(cur[cur.curSection+'Audios'], false);
            }
          } else {
            audioPlayer.genPlaylist(cur.audiosList[cur.curList], false, {my: (cur.curList == 'all' && cur.oid == vk.id ? 'my' : false)});
          }
        } else if (!query.club) {
          Audio.selectPerformer({name: cur.q});
        }
        if (cur.audio_id) {
          var audio = cur.audios[cur.audio_id];
          if (audio) {
            var audio_id = audio[0] + '_' + audio[1];
            if (audio[11] && parseInt(audio[11])) {
              var claim = parseInt(audio[11]) || 0;
              if (claim == -2) claim = 0;
              Audio.showAudioClaimWarning(audio_id, claim, audio[5] + ' &ndash; ' + audio[6]);
            } else {
              try{
                playAudioNew(audio_id);
              }catch(e){};
            }
          }
        }
      }});
    }).bind(this), local: 1});
  },

  startEvents: function() {
    addEvent(Audio.scrollnode, 'scroll', Audio.scrollCheck);
    addEvent(window, 'resize', Audio.scrollCheck);
    addEvent(window, 'focus', Audio.windowFocused);
    addEvent(cur.aSearch, 'blur', Audio.searchBlur.pbind(false));
    addEvent(cur.aSearch, 'focus', Audio.searchFocus.pbind(false));
    cur.gpHidden = true;
    toggleGlobalPlayer(false);
    if (Audio.fixedScroll) {
      var els = geByClass('top_info_wrap', ge('page_wrap'));
      each(els, function() { hide(this); });
      hide(_stlSide);
      setTimeout(function() {
        each(els, function() { hide(this); });
        hide(_stlSide);
      }, 110);
      var headH = cur.audioEl.head.clientHeight,
          headT = getXY(cur.audioEl.head)[1],
          audioNavH = cur.audioEl.bar.offsetHeight,
          headW = cur.audioEl.head.clientWidth,
          contentY = headH + audioNavH;
      setStyle(cur.audioEl.head, {width: headW, top: headT});
      setStyle('side_bar', {top: headH + headT});
      setStyle(cur.audioEl.bar, {top: headH + headT});
      setStyle(cur.audioEl.cont, {paddingTop: contentY});
      setStyle(cur.audioEl.filters, {top: contentY});

      addClass(bodyNode, 'audio_fixed_nav');
      _fixedNav = true;
    }
    Audio.updateAlbumsTitles();
    Audio.handleFilterPos();
  },

  stopEvents: function() {
    removeEvent(Audio.scrollnode, 'scroll', Audio.scrollCheck);
    removeEvent(window, 'resize', Audio.scrollCheck);
    removeEvent(window, 'focus', Audio.windowFocused);
    clearTimeout(window.__fTO);
    removeEvent(cur.aSearch, 'blur', Audio.searchBlur.pbind(false));
    removeEvent(cur.aSearch, 'focus', Audio.searchFocus.pbind(false));
    if (Audio.fixedScroll) {
      var els = geByClass('top_info_wrap', ge('page_wrap'));
      each(els, function() { show(this); });
      setStyle(cur.audioEl.head, {width: '', top: ''});
      setStyle('side_bar', {top: ''});

      removeClass(bodyNode, 'audio_fixed_nav');
      _fixedNav = false;

      show(_stlSide);
    }
    audioPlayer.deregisterPlayer('ac');
    setTimeout(function() {
      toggleGlobalPlayer(true);
      updGlobalPlayer();
    }, 100);
  },

  startPadEvents: function() {
    var __cur = window._pads && _pads.cur;
    addEvent(__cur.aSearch, 'blur', Audio.searchBlur.pbind(true));
    addEvent(__cur.aSearch, 'focus', Audio.searchFocus.pbind(true));
    Audio.updateAlbumsTitles({from_pad: true});
  },

  stopPadEvents: function() {
    var __cur = window._pads && _pads.cur;
    removeEvent(__cur.aSearch, 'blur', Audio.searchBlur.pbind(true));
    removeEvent(__cur.aSearch, 'focus', Audio.searchFocus.pbind(true));
    audioPlayer.deregisterPlayer('pd');
  },

  searchFocus: function(from_pad) {
    var alist = from_pad ? ge('pad_playlist_panel') : ge('audios_list');
    if (!hasClass(alist, 'light')) addClass(alist, 'light');
  },

  searchBlur: function(from_pad) {
    var alist = from_pad ? ge('pad_playlist_panel') : ge('audios_list');
    if (hasClass(alist, 'light')) removeClass(alist, 'light');
  },

  scrollToTop: function(from_pad) {
    if (from_pad && window._pads) {
      animate(_pads.content, {scrollTop: 0}, 200);
    } else {
      scrollToTop();
    }
  },

  clearSearch: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, event = opts.event, el = opts.el;
    setStyle(el, {opacity: .6});
    __cur.aSearch.focus();
    if (__cur.allAudiosIndex == 'all') {
      Audio.loadAlbum({from_pad: from_pad, album: 0});
    } else {
      this.filterTimeout = setTimeout((function() {
        val(__cur.aSearch, '', true);
        removeClass(__cur.clearSearch, 'shown');
        this.updateList({from_pad: from_pad});
        this.hideSearchResults(from_pad);
        this.scrollToTop(from_pad);
      }).bind(this), 10);
    }
    if (isVisible(__cur.searchInfoCont)) {
      hide(__cur.searchInfoCont);
      if (from_pad) {
        Audio.updatePadFiltersHeight();
      }
    }
  },

  updateSorterRows: function(fromEl) {
    if (fromEl && fromEl.parentNode.sorter){
      sorter.update(fromEl);
      var tb = geByTag1('tbody', cur.audioWrap);
      if (tb) { // hack for webkit
        setStyle(tb, {display: 'table'});
        setTimeout(setStyle.pbind(tb, {display: 'table-row-group'}), 0);
      }
    }
  },

  showLyrics: function(id, lid, top) {
    var lyrics_div = ge('lyrics'+id);
    if (!isVisible(lyrics_div)) {
      show(lyrics_div);
      lyrics_div.innerHTML = "<div style='text-align: center; height: 50px; padding: 30px 10px 10px 10px'><img valign='middle' src='/images/progress7.gif'></div>";
      Audio.updateSorterRows(ge('audio'+id));
      ajax.post(Audio.address, {act: 'get_lyrics', lid: lid, aid: id, top: top ? 1 : 0}, {cache: 1, onDone: (function(responseText) {
          lyrics_div.innerHTML = responseText;
          Audio.updateSorterRows(ge('audio'+id));
        }).bind(this)});
    } else {
      lyrics_div.innerHTML = "";
      hide(lyrics_div);
      Audio.updateSorterRows(ge('audio'+id));
      Audio.handleFilterPos();
    }
  },

  allAudios: function(from_pad) {
    var __cur = from_pad ? window._pads && _pads.cur : window.cur;
    return __cur.audiosList ? __cur.audiosList[__cur.allAudiosIndex] || [] : [];
  },

  showRows: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, force = opts.force, start = opts.start, end = opts.end;

    if (from_pad && !__cur.curSection) {
      Pads.showAudios();
      return;
    } else if (__cur.curSection == 'recommendations') {
      Audio.loadRecommendations({from_pad: from_pad});
      return;
    } else if (__cur.curSection == 'popular') {
      Audio.loadPopular({from_pad: from_pad});
      return;
    } else if (__cur.curSection == 'feed') {
      Audio.loadFeed({from_pad: from_pad});
      return;
    }
    if (__cur.silent) {
      __cur.onSilentLoad = function() {
        Audio.showRows(opts);
      };
      return;
    }
    var list = __cur.audiosList[__cur.curList] || [];
    if (list[0] && list[0]._order !== undefined) {
      list = list.sort(function(a,b) {return a._order - b._order});
    }
    list = Audio.filterClaimed(list);
    __cur.sectionCount = list.length;
    if (!__cur.searchStr) {
      list = Audio.filterDeleted(list, from_pad);
      if (__cur.filterUnsorted) {
        list = Audio.filterByAlbum(list, 0);
      }
      __cur.sectionCount = list.length;
    }
    if (start == undefined) {
      start = __cur.shownAudios;
    }
    if (end == undefined) {
      end = __cur.shownAudios + __cur.audiosPerPage;
    }
    if (window.tooltips && cur.tooltips) {
      for (var i = 0; i < cur.tooltips.length; ++i) {
        if (cur.tooltips[i].el) {
          if (hasClass(cur.tooltips[i].el, 'audio_friend')) continue;
          if (cur.tooltips[i].el.ttimer) {
            clearTimeout(cur.tooltips[i].el.ttimer);
          }
        }
        cur.tooltips[i].hide({fasthide: true});
      }
    }
    if (from_pad && ge('pad_footer_text')) {
      ge('pad_footer_text').innerHTML = '';
    }
    var _a = window.audioPlayer;
    if (!list || !list.length) {
      if (__cur.shownAudios == 0 && (__cur.album_id || (!Audio.allAudios(from_pad).length && !__cur.searchStr))) {
        var msg;
        if (Audio.allAudios(from_pad).length) {
          msg = (__cur.album_id) ? getLang('audio_album_no_recs') : getLang('audio_no_audios_found').split('{query}').join('<b>'+cur.searchStr.replace(/([<>&#]*)/g, '')+'</b>');
        } else {
          if ((__cur.oid > 0 || from_pad) && !(__cur.audioFriend && __cur.allAudiosIndex !== 'all')) {
            if ((__cur.id == vk.id || from_pad) && __cur.allAudiosIndex == 'all') {
              msg = getLang('audio_no_rec_load_msg').split('{link}').join('<a href="#" onclick="Audio.addAudio(); return false">').split('{/link}').join('</a>');
            } else {
              msg = getLang('audio_user_no_recs');
            }
          } else {
            msg = __cur.audioFriend > 0 ? getLang('audio_user_no_recs') : getLang('audio_group_no_recs');
          }
        }
        var style = from_pad && window._pads && _pads.content ? ' style="height: ' + (getSize(_pads.content)[1] - 110 - ge('pad_playlist').offsetTop) + 'px;"' : '';
        __cur.aContent.innerHTML = '<div id="not_found" class="info_msg" ' + style + '>'+msg+'</div>';
      }
      hide(__cur.showMore);
    } else {
      if (!__cur.shownAudios) {
        __cur.aContent.innerHTML = '';
      }
      var audios = list.slice(start, end);
      if (!audios.length) {
        if (__cur.shownAudios >= __cur.sectionCount) {
          hide(__cur.showMore);
          if (__cur.searchStr) {
            this.loadRows(from_pad);
          }
        }
        return;
      }
      var html = [];
      for (i in audios) {
        var audio = audios[i].slice();
        if (__cur.selection) {
          audio[5] = audio[5].replace(__cur.selection.re, __cur.selection.val);
          audio[6] = audio[6].replace(__cur.selection.re, __cur.selection.val);
        }
        html.push(this.drawAudio(audio, from_pad));
        __cur.shownAudios += 1;
      }
      var au = ce('div', {innerHTML: html.join('')});
      while (au.firstChild) {
        var el = au.firstChild;
        __cur.aContent.appendChild(el);
      }
      if (from_pad && window.Pads && Pads.updateHeight) {
        Pads.updateHeight();
      } else if (__cur.canEdit && nav.objLoc.act != 'popular' && nav.objLoc.act != 'recommendations' && nav.objLoc.act != 'feed' && !browser.mobile && !__cur.searchStr && __cur.sectionCount && __cur.allAudiosIndex == 'all' && !__cur.shuffled && !__cur.club) {
        if (start > 0) {
          setTimeout(sorter.added.pbind(__cur.aContent), 0);
        } else {
          setTimeout(function(){
            var opts = {onReorder: Audio.onAudioReorder, onMouseDown: Audio.onDragStart, onMouseUp: Audio.onDragEnd, noMoveCursor: 1};
            if (__cur.audioAlbumsWrap) {
              extend(opts, {target: __cur.audioAlbumsWrap, onDragOver: Audio.onDragOver, onDragOut: Audio.onDragOut});
            }
            sorter.init(__cur.aContent, opts);
          }, 0);
        }
      }
      if (__cur.searchCount && isVisible(__cur.sContent)) {
        show(__cur.sWrap);
        __cur.sContent.style.paddingTop = '12px';
        __cur.sSummary.innerHTML = langNumeric(__cur.searchCount, __cur.summaryLang['list_found'], true);
      }
      if (_a && _a.showCurrentTrack) _a.showCurrentTrack();
    }
    setTimeout(Audio.handleFilterPos, 0);
    var aid = currentAudioId(), clubList = (__cur.curSection && __cur.curSection.substr(0, 4) == 'club');
    if (_a && _a.gpDisabled && aid) {
      var track_id = aid.split('_')[1];
      if (!__cur.audios[track_id]) _a.stop();
    }
    if (__cur.justShuffled) {
      toggle(__cur.showMore, __cur.shownAudios < __cur.sectionCount);
      return;
    }
    if (clubList) {
      Audio.hideSearchResults(from_pad);
    }
    if (force) return;
    if (__cur.shownAudios >= __cur.sectionCount) {
      hide(__cur.showMore);
      if (__cur.searchStr && !clubList) {
        this.loadRows(from_pad);
      } else if (!from_pad) {
        Audio.setQLoc(__cur.searchStr);
      }
    } else {
      show(__cur.showMore);
      if (!from_pad) {
        Audio.setQLoc(__cur.searchStr);
      }
    }
  },

  toggleSearchFriends: function(show, el) {
    var inpWrap = el.nextSibling, inp = geByTag1('input', inpWrap);
    if (val(inp) && !show) return;
    toggle(el, !show);
    toggle(inpWrap, show);
    if (show) {
      setTimeout(function() {inp.select();}, 0);
    }
  },

  clearFriendsSearch: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, inp = opts.el;
    val(inp, '');
    this.searchFriends({from_pad: from_pad, str: '', el: inp});
    this.toggleSearchFriends(false, domPS(inp.parentNode));
  },

  searchFriends: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, str = trim(val(__cur.friendsSearch)),
        inp = opts.el, event = opts.event;
    if (event && event.keyCode == KEY.ESC) {
      inp.blur();
      return;
    }
    if (str == __cur.searchFriendsStr) return;
    __cur.searchFriendsStr = str;
    toggleClass(inp.parentNode, 'str', !!str);

    clearTimeout(this.searchFTimeout);
    this.searchFTimeout = setTimeout((function() {
      Audio.searchFriendsRequest({from_pad: from_pad, str: __cur.searchFriendsStr});
    }).bind(this), 150);
  },

  searchFriendsRequest: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, str = opts.str;
    if (__cur.searchFriendsSent) {
      return;
    }
    __cur.searchFriendsSent = true;

    var query = {act: 'search_friends', str: str};
    if (__cur.audioFriend && __cur.allAudiosIndex && !__cur.allAudiosIndex.indexOf('friend')) {
      query.owner = __cur.audioFriend;
    }
    if (from_pad) {
      query.from_pad = 1;
    }
    ajax.post(Audio.address, query, {onDone: function(cont, friends) {
      __cur.searchFriendsSent = false;
      if (cont) {
        __cur.friendsList.innerHTML = cont;
        setTimeout(Audio.handleFilterPos, 0);
        if (friends) {
          __cur.shownFriends = friends;
        }
      }
      if (ge(__cur.audioMoreFriensId)) {
        toggle(ge(__cur.audioMoreFriensId).parentNode, !str);
      }
      if (from_pad) {
        Audio.updatePadFiltersHeight();
      }
    }});
  },

  loadRows: function(from_pad) {
    var __cur = from_pad ? window._pads && _pads.cur : window.cur;
    if (__cur.sPreload.innerHTML) {
      while (__cur.sPreload.firstChild) {
        var el = __cur.sPreload.firstChild
        __cur.sContent.appendChild(el);
      }
      if (from_pad && window.Pads && Pads.updateHeight) {
        Pads.updateHeight();
      }
    }
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout((function() {
      Audio.searchRequest({from_pad: from_pad, str: __cur.searchStr, offset: __cur.searchOffset});
    }).bind(this), 300);
  },

  searchRequest: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, val = opts.str, offset = opts.offset;
    if (!val) return;
    if (val[val.length - 1] == ' ') {
      val[val.length - 1] = '_';
    }
    addClass(__cur.searchCont, 'loading');
    setStyle(__cur.clearSearch, {opacity: .6});
    var query = {act: 'search', q: val, offset: offset, id: __cur.id, gid: __cur.gid, performer: __cur.searchTypeMenu ? __cur.searchTypeMenu.val() : 0};
    if (!from_pad) {
      var l = ge('audio_lyrics_filter');
      if (l && parseInt(l.value)) query.lyrics = 1;
    }
    if (__cur.searchSortFilter) query.sort = parseInt(__cur.searchSortFilter.val());
    if (__cur.autoComplete) query.autocomplete = __cur.autoComplete;
    if (nav.objLoc.claim && !from_pad) query.claim = nav.objLoc.claim;
    if (from_pad) {
      query.from_pad = 1;
    }
    ajax.post(Audio.address, query, {onDone: function(res, preload, options) {
        removeClass(__cur.searchCont, 'loading');
        var newVal = __cur.searchStr;
        if (newVal[newVal.length - 1] == ' ') {
          newVal[newVal.length - 1] = '_';
        }
        if (val != newVal) {
          return;
        }
        if (res) {
          __cur.sContent.innerHTML = res;
          if (from_pad && window.Pads && Pads.updateHeight) {
            Pads.updateHeight();
          }
        }
        if (preload) {
          __cur.sPreload.innerHTML = preload;
        }
        Audio.applyOptions(__cur, options, offset);
        if (from_pad) {
          Audio.updatePadFiltersHeight();
        }
        show(__cur.sContent);
        if (!__cur.sectionCount) {
          hide(__cur.sWrap);
          __cur.sContent.style.paddingTop = '0px';
          __cur.aContent.innerHTML = '';
          if (!__cur.searchCount && !res && !preload) {
            msg = getLang('audio_no_audios_found').split('{query}').join('<b>'+__cur.searchStr.replace(/([<>&#]*)/g, '')+'</b>');
            var style = from_pad && window._pads && _pads.content ? ' style="height: ' + (getSize(_pads.content)[1] - 110 - ge('pad_playlist').offsetTop) + 'px;"' : '';
            __cur.aContent.innerHTML = '<div id="not_found" class="info_msg"' + style + '>'+msg+'</div>';
            hide(__cur.showMore);
            hide(__cur.sContent);
          }
        } else {
          __cur.sContent.style.paddingTop = '12px';
          if (__cur.searchCount) {
            __cur.sSummary.innerHTML = langNumeric(__cur.searchCount, __cur.summaryLang['list_found'], true);
            show(__cur.sWrap);
          } else {
            Audio.hideSearchResults(from_pad);
            hide(__cur.sWrap);
          }
        }
        Audio.changeSummary({from_pad: from_pad, from_search: true});
        Audio.scrollCheck();
        if (!offset && !from_pad) {
          Audio.setQLoc(__cur.searchStr);
        }
        var _a = window.audioPlayer;
        if (_a && _a.showCurrentTrack) _a.showCurrentTrack();
      },
      onFail: function() {
        removeClass(__cur.searchCont, 'loading');
      },
      showProgress: function () {
        __cur.isAudioLoading = true;
      },
      hideProgress: function () {
        __cur.isAudioLoading = false;
      }
    });
  },

  changeSearchFilters: function(from_pad) {
    var __cur = from_pad ? window._pads && _pads.cur : window.cur;
    __cur.searchOffset = 0;
    Audio.searchRequest({from_pad: from_pad, str: __cur.searchStr, offset: 0});
  },

  hideSearchResults: function(from_pad) {
    setTimeout(function(){
      var __cur = from_pad ? window._pads && _pads.cur : window.cur;
      __cur.sContent.innerHTML = '';
      if (__cur.curSection != 'recommendations' && __cur.curSection != 'popular' && __cur.curSection != 'feed') __cur.sPreload.innerHTML = '';
      hide(__cur.sContent);
      hide(__cur.sWrap);
      hide(__cur.sShowMore);
      Audio.scrollCheck();
    }, 0);
  },

  drawAudio: function(audio, from_pad) {
    return from_pad ? Pads.audioRow(audio, {}) : cur.audioTpl(audio, cur.curSection);
  },

  applyOptions: function(__cur, options, offset) {
    extend(__cur, options);
    if (!__cur.has_more) {
      hide(__cur.sShowMore);
    } else {
      show(__cur.sShowMore);
    }
    if (!offset) {
      if (options.searchInfo) {
        __cur.searchInfoCont.innerHTML = options.searchInfo;
        if (!isVisible(__cur.searchInfoCont)) {
          show(__cur.searchInfoCont);
        }
        each(geByClass('audio_friend_name_now', __cur.searchInfoCont), function() {
          if (this.scrollWidth > this.clientWidth) {
            this.setAttribute('title', this.innerText || this.textContent);
          } else {
            this.removeAttribute('title');
          }
        })
      } else if (isVisible(__cur.searchInfoCont)) {
        hide(__cur.searchInfoCont);
      }
    }
  },

  handleFilterPos: function(force) {
    if (!Audio.fixedScroll || !cur.audioEl) return false;
    var headH = cur.audioEl.head.clientHeight, audioNavH = cur.audioEl.bar.offsetHeight,
        contentY = headH + audioNavH,
        st = Math.max(0, scrollGetY()), wh = window.lastWindowHeight || 0, pos = 0,
        filt = ge('side_panel'), filtPos = getXY(filt)[1], filtY = getSize(filt)[1],
        sf = ge('side_filters'), sfPos = (getStyle(sf, 'position') == 'fixed') ? parseInt(getStyle(sf, 'top')) : getXY(sf)[1], sfY = getSize(sf)[1],
        bottomPad = Math.max(0, st + wh - filtY - contentY),
        tooBig = (filtPos + filtY - sfPos - sfY < 20),
        lastPos = cur.filterLastPos || 100, lastSt = cur.lastSt || 0;

    if  (!tooBig) {
      addClass(sf, 'fixed');
      pos = (wh > sfY + contentY || bottomPad > 0) ? Math.min(contentY, wh - sfY - bottomPad) : Math.max(Math.min(contentY, lastPos + lastSt - st), wh - sfY - bottomPad);
    } else {
      removeClass(sf, 'fixed');
      pos = 0;
    }
    cur.filterLastPos = pos;
    cur.lastSt = pos ? st : contentY - 100;
    setStyle(sf, {top: pos + 'px'});

    if (!browser.mozilla && !browser.msie && (cur.lastWW !== lastWindowWidth || force)) {
      cur.lastWW = lastWindowWidth;
      var goodLeft1 = ge('page_layout').offsetLeft,
          goodLeft2 = goodLeft1 + cur.audioEl.cont.offsetLeft,
          goodLeft3 = goodLeft2 + getSize(cur.audioEl.cont)[0] - getSize(cur.audioEl.filters)[0] - 10;
      cur.audioEl.head.style.left = ge('side_bar').style.left = goodLeft1 + 'px';
      cur.audioEl.bar.style.left = goodLeft2 + 'px';
      cur.audioEl.filters.style.left = goodLeft3 + 'px';
      setTimeout(Audio.resetStyles, 0);
    }
  },

  resetStyles: function() {
    cur.audioEl.head.style.left = ge('side_bar').style.left =
    cur.audioEl.bar.style.left = cur.audioEl.filters.style.left = '';
  },

  windowFocused: function() {
    Audio.handleFilterPos(true);
    clearTimeout(window.__fTO);
    window.__fTO = setTimeout(Audio.scrollCheck, 500); // chrome bugfix
  },
  scrollCheck: function (e) {
    Audio.handleFilterPos(e && e !== true && e.type == 'resize');
    if (browser.mobile || cur.isAudioLoading  || cur.disableAutoMore) return;

    if (!isVisible(cur.showMore) && !isVisible(cur.sShowMore)) return;
    if (!cur.curList) {
      setTimeout(Audio.scrollCheck, 50);
      return;
    }

    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY();

    if (isVisible(cur.showMore) && st + ch + 400 > cur.showMore.offsetTop) {
      Audio.showRows();
    }
    if (isVisible(cur.sShowMore) && st + ch + 400 > cur.sShowMore.offsetTop) {
      Audio.loadRows();
    }
  },

  updateList: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, e = opts.event, force = opts.force,
        showAlbums = opts.showAlbums, fromIndex = opts.fromIndex, obj = __cur.aSearch;
    if (__cur.silent) {
      __cur.onSilentLoad = function() {
        Audio.updateList(opts);
      };
      return;
    }
    if (e && (e.keyCode == 10 || e.keyCode == 13) || __cur.forceNoAutoComplete) {
      delete __cur.forceNoAutoComplete
      delete __cur.autoComplete;
    } else {
      __cur.autoComplete = 1;
    }
    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout((function() {
      var str = trim(obj.value), el;
      if (str == __cur.searchStr && __cur.autoComplete && !__cur.ignoreEqual) {
        return;
      }
      delete __cur.ignoreEqual;
      if (!from_pad) {
        delete nav.objLoc.audio_id;
        if (nav.objLoc.act == 'recommendations' || nav.objLoc.act == 'popular' || nav.objLoc.act == 'feed' || nav.objLoc.act == 'albums') {
          delete nav.objLoc.act;
        }
      }

      if (__cur.allAudiosIndex == 'all') {
        __cur.album_id = 0;
      }
      each(geByClass('audio_filter', __cur.albumFilters), function(i, e) {
        removeClass(e, 'selected');
      });
      var c = Audio.allAudios(from_pad).length;
      if (str) {
        el = __cur.albumFiltered;
        hide(__cur.audioFriends);
        Audio.hideAlbums({from_pad: from_pad});
        addClass(__cur.clearSearch, 'shown');
        show(__cur.searchFilters);
        hide(__cur.searchInfoCont);
        if (__cur.audioWrap && !c && __cur.allAudiosIndex == 'all') {
          removeClass(__cur.audioWrap, 'audio_no_recs');
        }
      } else {
        if (showAlbums || __cur.oid != vk.id && !from_pad) {
          if (__cur.allAudiosIndex == 'all') {
            el = __cur.albumsFilter || ge((from_pad ? 'pad_' : '') + 'album0');
          }
          hide(__cur.audioFriends, __cur.searchInfoCont);
          Audio.showAlbums({from_pad: from_pad});
        } else if (fromIndex == 2) {
          Audio.hideAlbums({from_pad: from_pad});
          hide(__cur.audioFriends);
          __cur.searchInfoCont.innerHTML = __cur.performerInfo[__cur.allAudiosIndex];
          show(__cur.searchInfoCont);
        } else {
          Audio.hideAlbums({from_pad: from_pad});
          show(__cur.audioFriends);
          hide(__cur.searchInfoCont);
          if (__cur.allAudiosIndex == 'all') {
            el = ge((from_pad ? 'pad_' : '') + 'album0');
            var curEl = geByClass1('current', __cur.friendsList);
            if (curEl) removeClass(curEl, 'current');
          }
        }
        removeClass(__cur.clearSearch, 'shown');
        removeClass(__cur.albumFiltered, 'selected');
        hide(__cur.searchFilters);
        if (__cur.audioWrap) {
          toggleClass(__cur.audioWrap, 'audio_no_recs', !c && __cur.allAudiosIndex == 'all' && __cur.oid <= 0);
        }
      }
      if (el) addClass(el, 'selected');
      hide(__cur.popularFilters, __cur.popularOwners);
      if (from_pad) {
        Audio.updatePadFiltersHeight();
      }
      __cur.searchStr = str;
      this.searchAudios({from_pad: from_pad, str: str, type: __cur.allAudiosIndex, force: force});
      this.scrollToTop(from_pad);
    }).bind(this), fromIndex ? 0 : 10);
  },

  selectPerformer: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, event = opts.event, name = replaceEntities(opts.name || '');
    __cur.aSearch.setValue(name);
    __cur.forceNoAutoComplete = true;
    if (event) {
      __cur.searchTypeMenu.value = 1;
      __cur.searchTypeChanged({target: {index: 1}}, true);
    }
    Audio.updateList({from_pad: from_pad});
    if (event) cancelEvent(event);
  },

  searchAudios: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, str = opts.str, type = opts.type, force = opts.force;
    __cur.shownAudios = 0;
    __cur.curSection = type;
    if (from_pad && !__cur.audiosIndex) {
      Audio.loadFriendsAudios({from_pad: from_pad, id: vk.id, index: 'all', leaveStr: 1});
      return;
    }
    var clubList = (type && type.substr(0, 4) == 'club');
    if (!clubList && __cur.searchSortFilter) {
      __cur.searchSortFilter.disable(false);
      __cur.searchLyricsFilter.disable(false);
      removeClass(__cur.albumFiltered, 'club_shown');
      delete __cur.club;
    }
    if (str) {
      var htmlentities = function(s){
        var el = document.createElement('div');
        el.innerText = el.textContent = s;
        s = el.innerHTML;
        delete el;
        return s.split('"').join('&quot;');
      }
      var htmlencode = function(str){
        return str.toLowerCase().replace(/\u2013|\u2014/g, '-');
        var aStr = str.toLowerCase().replace(/\u2013|\u2014/g, '-').split(''), i = aStr.length, aRet = [];
        while (i--) {
          var iC = aStr[i].charCodeAt();
          if ((iC > 127 && iC < 994)) {
            aRet.push('&#'+iC+';');
          } else if (iC == 36) {
            aRet.push('&#0'+iC+';');
          } else {
            aRet.push(htmlentities(aStr[i]));
          }
        }
        return aRet.reverse().join('');
      }
      var res = __cur.audiosIndex.search(htmlencode(str));
      var newList = __cur.curSection;
      newList += '_search_'+str;

      __cur.curList = newList;
      __cur.audiosList[__cur.curList] = res.sort(function(a,b) {return a._order - b._order});
      audioPlayer.genPlaylist(res, false);

      if (str) {
        str += ' '+(parseLatin(str) || '');
        str = trim(str.replace(/\)/g, '').replace(/&/, '&amp;'));
        __cur.selection = {
          re: new RegExp('(\\s|^)('+str.replace(__cur.audiosIndex.delimiter, '|').replace(/(^\||\|$|\?)/g, '')+')', 'gi'),
          val: '$1<span>$2</span>'
        };
      }
    } else {
      if (!clubList) Audio.hideSearchResults(from_pad);
      __cur.curList = __cur.curSection;
      var pl = cur.nextPlaylist || window.audioPlaylist;
      audioPlayer.genPlaylist(__cur.audiosList[__cur.curList], false, {my: (__cur.curList == 'all' && (__cur.oid == vk.id || from_pad) ? 'my' : false), htitle: __cur.justShuffled && pl && pl.htitle});
      __cur.selection = false;
    }

    __cur.sectionCount = (__cur.audiosList[__cur.curList]) ? __cur.audiosList[__cur.curList].length : 0;
    this.filterTimeout = setTimeout((function() {
      if (!force) {
        hide(__cur.sShowMore);
        __cur.searchOffset = 0;
      }
      this.showRows({from_pad: from_pad, force: force});
      if (__cur.sectionCount || !__cur.searchStr) {
        this.changeSummary({from_pad: from_pad});
      }
      if (__cur.justShuffled) {
        delete __cur.justShuffled;
        var aid = currentAudioId();
        if (cur.nextPlaylist && (!aid || window.audioPlaylist && !window.audioPlaylist[aid])) {
          window.audioPlaylist = clone(cur.nextPlaylist);
        }
        if (!from_pad) {
          Audio.loadCurrentPlaylist();
        }
      }
    }).bind(this), 10);
  },

  indexAll: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, callback = opts.callback;
    var all = Audio.allAudios(from_pad),
    replacer = function(str, p) {
      var c = intval(p);
      return (c >= 33 && c < 48) ? String.fromCharCode(c) : str;
    };

    __cur.audiosIndex = new vkIndexer(all, function(obj) {
      __cur.audios[parseInt(obj[1])] = obj;
      return (obj[5]+' '+obj[6]).replace(/\&\#(\d+);?/gi, replacer);
    }, function() {
      if (callback) {
        callback();
      }
    });
  },

  changeAllIndex: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, index = opts.index, albumSelected = opts.album,
        showAlbums = opts.showAlbums, owner = opts.owner, leaveStr = !!opts.leaveStr, str;

    if (!__cur.audiosList[index]) return;
    __cur.allAudiosIndex = __cur.curList = index;
    this.indexAll({from_pad: from_pad, callback: opts.clbk || function() {
      var _a = window.audioPlayer;
      Audio.mixAllAudios({from_pad: from_pad, mix: (_a && _a.shuffle), noShuffle: true});
      audioPlayer.genPlaylist(__cur.audiosList[__cur.curList], from_pad && index == 'all' && !currentAudioId(), {my: (index == 'all' && (__cur.oid == vk.id || from_pad) ? 'my' : false)});
      each(geByTag('div', __cur.albumFilters), function(i, e) {
        removeClass(e, 'loading');
      });
      if (__cur.allLoadedCallback) {
        __cur.allLoadedCallback();
        delete __cur.allLoadedCallback;
        return;
      }

      __cur.ignoreEqual = true;

      setStyle(__cur.clearSearch, {opacity: .6});
      if (leaveStr) {
        str = val(__cur.aSearch);
      } else {
        str = '';
        val(__cur.aSearch, str, true);
      }
      toggleClass(__cur.clearSearch, 'shown', !!str);
      __cur.searchStr = str;
      if (str) {
        __cur.forceNoAutoComplete = true;
      } else {
        Audio.hideSearchResults(from_pad);
      }
      if (albumSelected) {
        Audio.loadAlbum({from_pad: from_pad, album: albumSelected});
      } else {
        Audio.updateList({from_pad: from_pad, showAlbums: showAlbums, fromIndex: (owner ? 2 : 1)});
      }
    }});
  },

  generateAlbums: function(from_pad) {
    var __cur = from_pad ? window._pads && _pads.cur : window.cur;
    for (var i in __cur.audiosList) {
      if (i.substr(0, 5) == 'album') __cur.audiosList[i] = [];
    }
    var all = Audio.allAudios(from_pad);
    for (var i in all) {
      var el = all[i];
      if (el[8] && parseInt(el[8])) {
        if (!__cur.audiosList['album'+el[8]]) {
          __cur.audiosList['album'+el[8]] = [];
        }
        __cur.audiosList['album'+el[8]].push(el);
      }
    }
  },

  changeHTitle: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, from_search = opts.from_search;
    var htitle = __cur.htitle, pad_htitle = '';
    if (__cur.curSection && !__cur.curSection.indexOf('album')) {
      var album = ge((from_pad ? 'pad_' : '') + __cur.curSection);
      if (album) {
        htitle = clean(album.innerText || album.textContent);
      }
    } else if (__cur.curSection && __cur.curSection == 'recommendations') {
      htitle = __cur.recommendTitle || getLang('audio_recommended_audios');
    } else if (__cur.curSection && __cur.curSection == 'feed') {
      htitle = __cur.feedTitle || getLang('audio_friends_feed');
    } else if (__cur.curSection && __cur.curSection == 'popular') {
      htitle = __cur.popularTitle || getLang('audio_popular_audios');
    } else if (__cur.curSection && __cur.curSection.indexOf('owner') === 0) {
      htitle = __cur.allFriendsHTitles[__cur.audioFriend];
    } else if (from_search) {
      htitle = getLang('audio_title_search').replace('{q}', clean(val(__cur.aSearch)));
      pad_htitle = getLang('audio_title_search').replace('{q}', '<b>' + clean(val(__cur.aSearch)) + '</b>');
    } else if (__cur.curSection && !__cur.curSection.indexOf('club')) {
      htitle = __cur.allClubsHTitles[__cur.club] || htitle;
    } else if (__cur.audioFriend && __cur.allAudiosIndex && !__cur.allAudiosIndex.indexOf('friend')) {
      htitle = __cur.allFriendsHTitles[__cur.audioFriend];
    }
    __cur.lastHTitle = pad_htitle || htitle;
    if (from_pad) {
      return;
    }
    if (opts.count && cur.lang.audio_N_recs) {
      htitle += ' | ' + getLang('audio_N_recs', opts.count);
    }
    // Updating document title
    document.title = replaceEntities(stripHTML(htitle));
  },

  changeSummary: function(opts) {
    opts = opts || {};
    var from_pad = opts.from_pad, from_search = opts.from_search;
    var count = (from_search) ? cur.searchCount : cur.sectionCount;
    Audio.changeHTitle({from_pad: from_pad, count: count, from_search: from_search});
  },

  setQLoc: function(query) {
    clearTimeout(this.qTimeout);
    this.qTimeout = setTimeout(function() {
      if (cur.allAudiosIndex != 'all') {
        if (cur.allAudiosIndex && cur.allAudiosIndex.substr(0, 5) == 'owner') {
          extend(nav.objLoc, {owner: cur.audioFriend});
        } else {
          extend(nav.objLoc, {friend: cur.audioFriend});
        }
      } else {
        delete nav.objLoc.owner;
        delete nav.objLoc.friend;
      }
      if (cur.curSection && cur.curSection.substr(0, 4) == 'club') {
        extend(nav.objLoc, {club: cur.club});
      } else {
        delete nav.objLoc.club;
        delete nav.objLoc.genre;
      }
      if (query) {
        extend(nav.objLoc, {q: query});
        var performer = cur.searchTypeMenu ? parseInt(cur.searchTypeMenu.val()) : 0;
        if (performer) {
          extend(nav.objLoc, {performer: performer});
        } else {
          delete nav.objLoc.performer;
        }
      } else {
        delete nav.objLoc.q;
      }
      nav.setLoc(nav.objLoc);
    }, 500);
  },

  filterClaimed: function(arr) {
    var len = arr.length;
    var res = [];
    for (var i = 0; i < len; i++) {
      var t = arr[i];
      if (t && (!(t[11] && parseInt(t[11])) || t[12] && parseInt(t[12])) || nav.objLoc.claim) {
        res.push(t);
      }
    }
    return res;
  },

  filterDeleted: function(arr, from_pad) {
    var __cur = from_pad ? window._pads && _pads.cur : window.cur;
    var len = arr.length;
    var res = [];
    for (var i = 0; i < len; i++) {
      var t = arr[i];
      if (__cur && __cur.audios && __cur.audios[t[1]] && !__cur.audios[t[1]].deleted) {
        res.push(t);
      }
    }
    return res;
  },

  filterByAlbum: function(arr, album) {
    var len = arr.length;
    var res = [];
    for (var i = 0; i < len; i++) {
      var t = arr[i];
      if (album == t[8]) {
        res.push(t);
      }
    }
    return res;
  },

  animateAdded: function(el, speed) {
    var c = se('<div class="audio_add_wrap anim fl_r"><div class="audio_add_anim_wrap"><div class="audio_add_anim clear_fix"><div class="audio_add fl_l"></div><div class="audio_add done fl_l"></div></div></div></div>');
    el.parentNode.replaceChild(c, el);
    el = c;
    var anim = geByClass1('audio_add_anim', el), add = anim.firstChild, added = add.nextSibling;
    animate(anim, !vk.rtl ? {left: '-15px'} : {right: '-15px'}, {duration: speed, onComplete: function() {
      setStyle(anim.parentNode, {width: '15px'});
      setStyle(anim.parentNode.parentNode, !vk.rtl ? {paddingLeft: '2px'} : {paddingRight: '2px'});
      setStyle(anim, !vk.rtl ? {left: '-13px'} : {right: '-15px'});
    }});
    animate(add, {opacity: 0}, {duration: speed});
    animate(added, {opacity: 1}, {duration: speed});
    return el;
  },

  cancelAnimateAdded: function(el, oldEl, speed) {
    var anim = geByClass1('audio_add_anim', el), add = anim.firstChild, added = add.nextSibling;
    animate(anim, !vk.rtl ? {left: '0px'} : {right: '0px'}, {duration: speed, onComplete: function() {
      setStyle(anim.parentNode, {width: '13px'});
      setStyle(anim.parentNode.parentNode, !vk.rtl ? {paddingLeft: '4px'} : {paddingRight: '4px'});
      el.parentNode.replaceChild(oldEl, el);
      var i = 6, audioRow = oldEl;
      while (audioRow && audioRow != bodyNode && !hasClass(audioRow, 'audio') && i--) {
        audioRow = audioRow.parentNode;
      }
      if (hasClass(audioRow, 'audio')) {
        removeClass(audioRow, 'over');
      }
    }});
    animate(add, {opacity: 0.4}, {duration: speed});
    animate(added, {opacity: 0}, {duration: speed});
  },

  addShareAudio: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, el = opts.el, aid = opts.aid, oid = opts.oid,
        hash = opts.hash, gid = opts.gid, top = opts.top || '',
        from_choose = opts.from_choose, from_wall = opts.from_wall, ev = opts.ev;

    if (el && !from_choose) {
      if (el.tt) el.tt.hide();
      var oldEl = el;
      el = Audio.animateAdded(el, 200);
    }
    var noboxhide = false;
    if (ev && ev.type == 'click' && (ev.ctrlKey || ev.metaKey || ev.shiftKey)) {
      noboxhide = true;
    }
    if (from_choose) {
      if (noboxhide && curBox()) {
        curBox().setOptions({onHide: function() {
          setTimeout(function() {
            while (__bq.count()) {
              __bq.hideLast();
            }
          }, 0);
        }});
      } else {
        while (__bq.count()) {
          __bq.hideLast();
        }
      }
    }
    var query = {act:'add', aid:aid, oid:oid, hash:hash, top:top};
    if (gid) query.gid = cur.gid || cur.oid < 0 && -cur.oid;
    if (__cur && __cur.curSection == 'recommendations') query.recommendation = 1;
    if ((cur.module == 'audio' || cur.module == 'feed') && nav.objLoc['q'] || cur.module == 'search' && nav.objLoc['c[q]']) query.search = 1;
    ajax.post(Audio.address, query, {
      onDone: function (data, res) {
        var obj = eval('('+data+')'), all_list;
        obj = obj['all'][0];
        if (obj && (from_pad || from_wall || cur.module == 'audio' && (cur.gid && gid || !cur.gid && cur.id == vk.id))) {
          setTimeout(function(){
            if (cur.audiosIndex) {
              all_list = cur.audiosList['all'];
              if (all_list && all_list.length) {
                obj._order = all_list[0]._order - 1;
                cur.audiosList['all'].splice(0,0,obj);
              } else {
                obj._order = 0;
                cur.audiosList['all'] = [obj];
              }
              cur.audios[obj[1]] = obj;
              if (cur.allAudiosIndex == 'all') {
                cur.audiosIndex.add(obj);
              }
            }
            if (window._pads && _pads.cur && _pads.cur.audiosIndex && _pads.cur.audiosList) {
              all_list = _pads.cur.audiosList['all'];
              if (all_list && all_list.length) {
                obj._order = all_list[0]._order - 1;
                _pads.cur.audiosList['all'].splice(0,0,obj);
              } else {
                obj._order = 0;
                _pads.cur.audiosList['all'] = [obj];
              }
              if (_pads.cur.audios) {
                _pads.cur.audios[obj[1]] = obj;
              }
              if (_pads.cur.allAudiosIndex == 'all') {
                _pads.cur.audiosIndex.add(obj);
              }
            }
            if (window.Pads && Pads.clearAudioLoadCache) {
              Pads.clearAudioLoadCache();
            }
          }, 0);
        }
        if (el) {
          if (from_choose) {
            if (res.added_msg) {
              el.parentNode.insertBefore(se(res.added_msg), el);
              hide(el);
            }
          } else if (res.delete_msg) {
            if (!cur.addedAudios) cur.addedAudios = [];
            cur.addedAudios[res.audio] = oldEl;

            addEvent(el, 'click', function(event) {
              Audio.deleteAddedAudio({id: res.audio, added_oid: oid, added_aid: aid, el: el, hash: res.delete_hash});
              return cancelEvent(event);
            });
            addEvent(el, 'mouseover', showTooltip.pbind(el, {
              text: res.delete_msg,
              showdt: 0,
              black: 1,
              shift: [11, from_wall ? 4 : 5, 0],
            }));
          } else {
            var showShare = function() {
              addClass(ge('audio'+oid+'_'+aid), 'tt_shown');
              showTooltip(el, {
                content: res.content,
                slide: 15,
                shift: [59, 5, 0],
                black: 1,
                hidedt: 200,
                className: 'audio_add_tt wall_tt rich',
                onHide: function() {
                  removeClass(ge('audio'+oid+'_'+aid), 'tt_shown');
                }
              });
              var tip = el.tt;
              if (tip && !tip.inited) {
                var a = geByClass('add_cont', tip.container)[0];
                tip.onClean = function() {
                  tip.inited = false;
                  removeEvent(tip.container, 'mouseover', tip.show);
                  removeEvent(tip.container, 'mouseout', tip.hide);
                }
                addEvent(tip.container, 'mouseover', tip.show);
                addEvent(tip.container, 'mouseout', tip.hide);
                addEvent(a, 'click', function(){
                  toggleClass(this, 'on');
                  var share_q = {act: 'share_audio', audio:res.audio, status: tip.status? tip.status : 0, check: hasClass(a, 'on')?1:0, hash: res.hash};
                  if (gid) share_q.gid = cur.gid;
                  ajax.post(Audio.address, share_q, {
                    onDone: function(data) {
                      if (data) tip.status = data;
                    }
                  });
                });
                tip.inited = true;
              }
            }
            addEvent(el, 'mouseover', showShare);
            setTimeout(showShare, 0);
          }
        }
        if (!cur.addedIds) cur.addedIds = {};
        cur.addedIds[oid+'_'+aid] = res.audio;
        if (window.audioPlayer && currentAudioId()) {
          var cur_aids = currentAudioId().split('_');
          if (cur_aids[0] == oid && cur_aids[1] == aid) {
            audioPlayer.showCurrentAdded();
          }
        }
        if (from_choose) {
          if (cur.module != 'audio') {
            if (!noboxhide) {
              nav.go('/audios' + obj[0], false, {onDone: function() {
                cur.__phinputs = cur.__phinputs || [];
                globalHistoryDestroy(nav.objLoc[0]);
              }});
            }
          } else {
            __cur.ignoreEqual = true;
            setTimeout(Audio.clearSearch.pbind({from_pad: from_pad}), 0);
          }
        }
        if (_tbLink && _tbLink.loc) {
          cur.__phinputs = cur.__phinputs || [];
          globalHistoryDestroy(_tbLink.loc);
        }
      }, onFail: function() {
        Audio.cancelAnimateAdded(el, oldEl, 200);
      }
    });
  },

  deleteAddedAudio: function(opts) {
    if (cur.deleting) {
      return false;
    }
    cur.deleting = true;

    opts = opts || {};
    var el = opts.el, id = opts.id, oid = id.split('_')[0], aid = id.split('_')[1],
        added_oid = opts.added_oid, added_aid = opts.added_aid,
        hash = opts.hash;
    if (!el) {
      return false;
    }
    if (el.tt) el.tt.hide();
    var oldEl = el;
    Audio.cancelAnimateAdded(el, cur.addedAudios[id], 200);
    el = cur.addedAudios[id];

    ajax.post(Audio.address, {act: 'delete_audio', oid: oid, aid: aid, hash: hash}, {
      onDone: function(action, delete_all) {
        cur.deleting = false;
        if (cur.addedIds[added_oid+'_'+added_aid]) {
          delete cur.addedIds[added_oid+'_'+added_aid];
        }
        Audio.removeFromPlaylist(added_oid+'_'+added_aid);
        if (window.Pads && Pads.clearAudioLoadCache) {
          Pads.clearAudioLoadCache();
        }
        if (window.audioPlayer && currentAudioId()) {
          var cur_aids = currentAudioId().split('_');
          if (cur_aids[0] == added_oid && cur_aids[1] == added_aid) {
            audioPlayer.showCurrentAdded(true);
          }
        }
      },
      onFail: function() {
        cur.deleting = false;
        if (el.tt) el.tt.hide();
        Audio.animateAdded(el, 200);
      }
    });
    return false;
  },

  alistOver: function(obj){
    if (!hasClass(obj, 'audio_list_cell_on')) {
      obj.className = 'audio_list_cell_over';
    }
  },

  alistOff: function(obj) {
    if (!hasClass(obj, 'audio_list_cell_on')){
      obj.className = 'audio_list_cell';
    }
  },

  listOut: function(obj) {
    removeClass(obj, 'over');
  },

  listOver: function(obj) {
    addClass(obj, 'over');
  },

  loadAlbum: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad,
        album_id = opts.album, filter = opts.filter, showAlbums = opts.showAlbums;
    if (__cur.silent) {
      __cur.onSilentLoad = function() {
        Audio.loadAlbum(opts);
      };
      return;
    }
    if (!album_id && !showAlbums && (__cur.oid == vk.id) && isVisible(__cur.audioMoreFriensId) && !__cur.searchFriendsStr) {
      __cur.shownFriends = [];
      Audio.showMoreFriends({from_pad: from_pad, onShow: addClass.pbind(ge((from_pad ? 'pad_' : '') + 'album0'), 'loading'), onHide: removeClass.pbind(ge((from_pad ? 'pad_' : '') + 'album0'), 'loading')});
    }
    hide(__cur.searchInfoCont);
    if (__cur.allAudiosIndex != 'all') {
      Audio.loadFriendsAudios({from_pad: from_pad, id: vk.id, index: 'all', album: album_id, showAlbums: showAlbums});
      return;
    }
    if (__cur.audioWrap) {
      toggleClass(__cur.audioWrap, 'audio_no_recs', !Audio.allAudios(from_pad).length && __cur.allAudiosIndex == 'all' && __cur.oid <= 0);
    }
    if (filter) {
      __cur.filterUnsorted = 1;
    } else {
      delete __cur.filterUnsorted;
    }
    var curSel = __cur.filterUnsorted ? ge('album_unsorted') : (showAlbums ? __cur.albumsFilter : ge((from_pad ? 'pad_' : '') + 'album' + album_id));
    __cur.lastAct = 'album' + album_id;
    album_id = album_id || 0;
    each(geByClass('audio_filter', __cur.albumFilters), function(i, e) {
      removeClass(e, 'selected');
    });
    if (curSel) addClass(curSel, 'selected');
    removeClass(__cur.albumFiltered, 'selected');
    hide(__cur.popularFilters, __cur.popularOwners, __cur.searchFilters);
    if (album_id == 0 && !showAlbums && (__cur.oid == vk.id || from_pad)) {
      Audio.hideAlbums({from_pad: from_pad});
      show(__cur.audioFriends);
      var curEl = geByClass1('current', __cur.friendsList);
      if (curEl) removeClass(curEl, 'current');
    } else {
      hide(__cur.audioFriends);
      Audio.showAlbums({from_pad: from_pad});
    }
    if (from_pad) {
      Audio.updatePadFiltersHeight();
    } else {
      if (showAlbums && !filter && !album_id) {
        Audio.updateAlbums();
      }
      delete nav.objLoc.q;
      delete nav.objLoc.owner;
      delete nav.objLoc.friend;
      delete __cur.recsOffset;
      delete __cur.popularOffset;
      delete nav.objLoc.club;
      delete nav.objLoc.genre;
      delete nav.objLoc.audio_id;
      delete __cur._back;
      if (nav.objLoc.act == 'recommendations' || nav.objLoc.act == 'popular' || nav.objLoc.act == 'feed' || nav.objLoc.act == 'albums') delete nav.objLoc.act;
      if (album_id) {
        extend(nav.objLoc, {album_id: album_id});
      } else {
        delete nav.objLoc.album_id;
      }
      nav.setLoc(nav.objLoc);
    }
    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout((function() {
      val(__cur.aSearch, '', true);
      removeClass(__cur.clearSearch, 'shown');
      __cur.searchStr = '';
      __cur.album_id = album_id;
      var type = (album_id) ? 'album'+album_id : __cur.allAudiosIndex;
      this.searchAudios({from_pad: from_pad, type: type, str: ''});
      this.hideSearchResults(from_pad);
      this.scrollToTop(from_pad);
    }).bind(this), 10);
    if (__cur.oid == vk.id || from_pad) {
      ajax.post(Audio.address, {act: 'list_stats', albums: (album_id || showAlbums) ? 1 : 0});
    }
  },

  hideAlbums: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, icon = __cur.albumsFilter && geByClass1('icon', __cur.albumsFilter);
    if (isVisible(__cur.audioAlbums)) {
      slideUp(__cur.audioAlbums, __cur.albumsFilter ? 200 : 0, function() {
        if (from_pad) {
          Audio.updatePadFiltersHeight();
        }
        if (icon) {
          removeClass(icon, 'up');
        }
      });
    }
  },

  showAlbums: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, icon = __cur.albumsFilter && geByClass1('icon', __cur.albumsFilter);
    if (!isVisible(__cur.audioAlbums)) {
      if (!from_pad) {
        Audio.updateAlbumsStart();
      }
      slideDown(__cur.audioAlbums, __cur.albumsFilter ? 200 : 0, function() {
        if (icon) {
          addClass(icon, 'up');
        }
        if (from_pad) {
          Audio.updatePadFiltersHeight();
        } else {
          Audio.handleFilterPos();
          Audio.updateAlbumsFinish();
        }
      });
      if (!from_pad) {
        setTimeout(Audio.handleFilterPos, 100);
      }
    }
  },

  toggleAlbums: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, down = isVisible(__cur.audioAlbums),
        icon = __cur.albumsFilter && geByClass1('icon', __cur.albumsFilter);
    if (!from_pad) {
      Audio.updateAlbumsStart();
    }
    slideToggle(__cur.audioAlbums, __cur.albumsFilter ? 200 : 0, function() {
      if (from_pad) {
        Audio.updatePadFiltersHeight();
      } else {
        Audio.handleFilterPos();
        Audio.updateAlbumsFinish();
      }
    });
    if (!from_pad && !down) {
      setTimeout(Audio.handleFilterPos, 100);
    }
    if (icon) {
      toggleClass(icon, 'up', !down);
    }
  },

  addAudio: function(params, event) {
    if (cur.uploadBanned) {
      setTimeout(showFastBox({title: getLang('audio_no_upload_title'), bodyStyle: 'padding: 20px; line-height: 160%;', dark: 1}, getLang('audio_claims_no_upload')).hide, 5000);
      if (event) cancelEvent(event);
      return false;
    }
    showBox(Audio.address, extend(params || {}, {act: 'new_audio', gid: cur.gid}), {
      params: {width: '450px', bodyStyle: 'padding: 0px; position: relative;'}, dark: 1
    });
    if (event) cancelEvent(event);
    return false;
  },

  mixAllAudios: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, mix = opts.mix, noShuffle = opts.noShuffle;
    var all_list = Audio.allAudios(from_pad), _a = window.audioPlayer, current = 0;
    if (!all_list) return;
    if (mix) {
      if (all_list[0] && all_list[0]._old_order !== undefined) return;
      for (var i = all_list.length; i; ) {
        var j = parseInt(Math.random() * i)
        var x = all_list[--i];
        all_list[i] = all_list[j];
        all_list[i]._old_order = all_list[i]._order;
        all_list[i]._order = i;
        if (currentAudioId() == all_list[i][0]+'_'+all_list[i][1]) {
          current = i;
        }
        all_list[j] = x;
      };
      if (current) {
        var x = all_list[current];
        all_list[current] = all_list[0];
        all_list[current]._order = current;
        all_list[0] = x;
        all_list[0]._order = 0;
      }
    } else {
      for (var i in all_list) {
        if (all_list[i]._old_order !== undefined) {
          all_list[i]._order = all_list[i]._old_order;
          delete all_list[i]._old_order;
        }
      };
    }
    if (!noShuffle) __cur.justShuffled = true;
  },
  mixAudios: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur, from_pad = !!opts.from_pad;
    if (__cur.silent) {
      __cur.onSilentLoad = function() {
        Audio.mixAudios(opts);
      };
      return;
    }
    var _a = window.audioPlayer;
    Audio.mixAllAudios({from_pad: from_pad, mix: _a && _a.shuffle});
    if (__cur.curSection == 'recommendations') {
      Audio.loadRecommendations({from_pad: from_pad, update: 'remix'});
      return;
    }
    if (__cur.curSection == 'popular') {
      Audio.loadPopular({from_pad: from_pad, update: 'remix'});
      return;
    }
    __cur.ignoreEqual = true;
    if (__cur.album_id) {
      this.loadAlbum({from_pad: from_pad, album: __cur.album_id});
    } else {
      this.updateList({from_pad: from_pad});
    }
    __cur.shuffled = _a && _a.shuffle;
  },

  loadRecommendations: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, update = opts.update, audioId = opts.audioId;
    if (__cur.loadingRecs) return;
    if (update) {
      delete __cur.recsOffset;
      delete __cur.recommendIds;
      delete __cur.recommendAudios;
      delete __cur.preloadJSON;
    }
    if (audioId) {
      __cur.recsAudioId = audioId;
    } else if (update === true) {
      delete __cur.recsAudioId;
    }
    each(geByClass('audio_filter', __cur.albumFilters), function(i, e) {
      removeClass(e, 'selected');
    });
    if (__cur.searchStr && isVisible(__cur.searchInfoCont)) {
      hide(__cur.searchInfoCont);
    }
    if (from_pad && ge('pad_footer_text')) {
      ge('pad_footer_text').innerHTML = '';
    }
    var rec_filter = __cur.recFilter;
    addClass(rec_filter, 'selected');
    removeClass(__cur.albumFiltered, 'selected');
    hide(__cur.searchFilters, __cur.popularFilters);
    if (from_pad || __cur.oid == vk.id) {
      hide(__cur.audioFriends, __cur.searchInfoCont);
      Audio.hideAlbums({from_pad: from_pad});
    }
    if (from_pad && ge('pad_footer_text')) {
      ge('pad_footer_text').innerHTML = '';
    }
    removeClass(__cur.albumFiltered, 'club_shown');
    Audio.handleFilterPos();
    __cur.lastSection = __cur.curSection;
    __cur.curSection = 'recommendations';
    if (__cur.recsOffset === undefined) {
      __cur.recsOffset = 0;
    } else {
      addClass(__cur.showMore, 'loading');
    }
    if (__cur.recommendIds === undefined) __cur.recommendIds = [];
    if (__cur.recommendAudios === undefined) __cur.recommendAudios = [];
    if (__cur.recsCount === undefined) __cur.recsCount = 0;
    if (__cur.sPreload.innerHTML) {
      while (__cur.sPreload.firstChild) {
        var el = __cur.sPreload.firstChild;
        __cur.aContent.appendChild(el);
        __cur.recsCount++;
      }
      if (from_pad && window.Pads && Pads.updateHeight) {
        Pads.updateHeight();
      }
    }
    if (__cur.preloadJSON) {
      json = __cur.preloadJSON['all'];
      var cur_order = __cur.recsCount;
      for (var i in json) {
        var audio = json[i];
        audio._order = cur_order++;
        if (indexOf(__cur.recommendIds, audio[0]+"_"+audio[1]) == -1) {
          __cur.recommendIds.push(audio[0]+"_"+audio[1]);
          __cur.recommendAudios.push(audio);
        }
      }
      var aid = currentAudioId(), needs_update = __cur.recsOffset && (aid && __cur.recommendIds && indexOf(__cur.recommendIds, aid) != -1);
      audioPlayer.genPlaylist(__cur.recommendAudios, needs_update);
    }
    if (__cur.noRecommendations) {
      hide(__cur.showMore);
      delete __cur.noRecommendations;
      return;
    }
    if (opts.tt) {
      opts.tt.hide();
    }
    __cur.loadingRecs = true;
    __cur.lastAct = 'recommendations';
    var offset = __cur.recsOffset, query = {act: 'get_recommendations', id: __cur.id, offset: offset},
        needsUpdate = window.audioPlayer && audioPlayer.shuffle;
    if (from_pad) {
      query.from_pad = 1;
    }
    if (update == 'remix' || needsUpdate != __cur.recsRemix) {
      __cur.recsRemix = needsUpdate;
      query.remix = needsUpdate ? 1 : 0;
      var aid = currentAudioId();
      if (aid && window.audioPlaylist && audioPlaylist[aid] && audioPlaylist.address && audioPlaylist.address.indexOf('act=recommendations') > 0) {
        var a = audioPlaylist[aid];
        if (a[10]) query.current = a[10]+' '+aid;
      }
    }
    if (__cur.recsAudioId) {
      query.audio_id = __cur.recsAudioId;
    }
    ajax.post(Audio.address, query, {
      onDone: function(rows, preload, json, preload_json, options, ownersRows) {
        delete __cur.loadingRecs;
        if (__cur.lastAct != 'recommendations') return;
        if (!offset) {
          if (ownersRows) {
            val((from_pad ? 'pad_' : '') + 'audio_popular_owners_rows', ownersRows);
            show(__cur.popularOwners);
          } else {
            hide(__cur.popularOwners);
          }
        }
        if (from_pad) {
          Audio.updatePadFiltersHeight();
        }
        if (options.recsCount === 0 && offset) {
          __cur.noRecommendations = true;
          delete options.recsOffset;
        }
        if (json) {
          json = eval('('+json+')');
          json = json['all'];
          var cur_order = __cur.recsCount;
          for (var i in json) {
            var audio = json[i];
            audio._order = cur_order++;
            if (indexOf(__cur.recommendIds, audio[0]+"_"+audio[1]) == -1) {
              __cur.recommendIds.push(audio[0]+"_"+audio[1]);
              __cur.recommendAudios.push(audio);
            }
          }
          var aid = currentAudioId(), needs_update = query.offset && (aid && __cur.recommendIds && indexOf(__cur.recommendIds, aid) != -1);
          audioPlayer.genPlaylist(__cur.recommendAudios, needs_update);
          if (query.audio_id) {
            cur.nextPlaylist.rec = 1;
          }
        }
        removeClass(__cur.showMore, 'loading');
        if (offset) {
          delete options.recsCount;
        }
        if (options) extend(__cur, options);
        if (!offset) {
          __cur.aContent.innerHTML = rows;
          if (from_pad && window.Pads && Pads.updateHeight) {
            Pads.updateHeight();
          }
        }

        __cur.preloadJSON = preload_json ? eval('('+preload_json+')') : false;
        __cur.sPreload.innerHTML = '';
        var au = ce('div', {innerHTML: preload});
        while (au.firstChild) {
          if (!ge(au.firstChild.id)) {
            var el = au.firstChild;
            __cur.sPreload.appendChild(el);
          } else {
            au.removeChild(au.firstChild);
          }
        }

        if (__cur.recsCount && !query.audio_id) {
          show(__cur.showMore);
        } else {
          hide(__cur.showMore);
        }
        if (query.remix) {
          __cur.justShuffled = true;
        }
        Audio.changeHTitle({from_pad: from_pad});
        val(__cur.aSearch, '');
        removeClass(__cur.clearSearch, 'shown');
        __cur.searchStr = '';
        __cur.album_id = 0;
        Audio.hideSearchResults(from_pad);
        hide(__cur.sShowMore);
        if (!offset) {
          Audio.scrollToTop(from_pad);
        }
        if (!from_pad) {
          delete nav.objLoc.q;
          delete nav.objLoc.owner;
          delete nav.objLoc.friend;
          delete nav.objLoc.album_id;
          delete nav.objLoc.club;
          delete nav.objLoc.genre;
          delete __cur._back;
          extend(nav.objLoc, {act: 'recommendations'});
          if (query.audio_id) {
            extend(nav.objLoc, {audio_id: query.audio_id});
          } else {
            delete nav.objLoc.audio_id;
          }
          nav.setLoc(nav.objLoc);
        }
        var _a = window.audioPlayer;
        if (_a && _a.showCurrentTrack) _a.showCurrentTrack();
        if (!from_pad) {
          Audio.loadCurrentPlaylist();
        }
      },
      onFail: function(msg) {
        delete __cur.loadingRecs;
        __cur.curSection = __cur.lastSection;
        removeClass(__cur.recFilter, 'selected');
        setTimeout(showFastBox({title: getLang('global_error'), dark: 1}, msg).hide, 3000);
        return true;
      },
      showProgress: function () {
        addClass(rec_filter, 'loading');
      },
      hideProgress: function () {
        removeClass(rec_filter, 'loading');
      }
    });
    __cur.recsOffset += offset ? 50 : 100;
  },

  loadPopular: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, update = opts.update, genre = opts.genre;
    if (__cur.silent) {
      __cur.onSilentLoad = function() {
        Audio.loadPopular(opts);
      };
      return;
    }
    if (__cur.loadingPopular) return;
    if (__cur.popularAudios === undefined) {
      __cur.popularAudios = [];
    }
    if (update) {
      delete __cur.popularOffset;
      delete __cur.popularIds;
      delete __cur.popularAudios[genre];
      delete __cur.preloadJSON;
      if (genre !== undefined) {
        __cur.genre = genre;
      }
    }
    each(geByClass('audio_filter', __cur.albumFilters), function(i, e) {
      removeClass(e, 'selected');
    });
    if (__cur.searchStr && isVisible(__cur.searchInfoCont)) {
      hide(__cur.searchInfoCont);
    }
    if (from_pad && ge('pad_footer_text')) {
      ge('pad_footer_text').innerHTML = '';
    }
    var genre_filter = false;
    if (__cur.genre) {
      var prevGenre = geByClass1('selected', __cur.popularGenres);
      if (prevGenre) {
        removeClass(prevGenre, 'selected');
      }

      genre_filter = ge((from_pad ? 'pad_' : '') + 'audio_genre_'+__cur.genre);
      if (genre_filter) {
        addClass(genre_filter, 'selected');
      } else {
        __cur.genre = 0;
      }
    }
    var pop_filter = __cur.topFilter;
    addClass(pop_filter, 'selected');
    removeClass(__cur.albumFiltered, 'selected');
    toggle(__cur.audioFriends, false);
    hide(__cur.searchInfoCont);
    if (__cur.popularFilters) {
      show(__cur.popularFilters);
      Audio.hideAlbums({from_pad: from_pad});
    } else {
      Audio.showAlbums({from_pad: from_pad});
    }
    removeClass(__cur.albumFiltered, 'club_shown');
    hide(__cur.searchFilters, __cur.popularOwners);
    Audio.handleFilterPos();
    __cur.curSection = 'popular';
    if (__cur.popularOffset === undefined) {
      __cur.popularOffset = 0;
    } else {
      addClass(__cur.showMore, 'loading');
    }
    if (__cur.popularIds === undefined) __cur.popularIds = [];
    if (__cur.popularAudios[genre] === undefined) __cur.popularAudios[genre] = [];
    if (__cur.popularCount === undefined) __cur.popularCount = 0;
    if (__cur.sPreload.innerHTML) {
      while (__cur.sPreload.firstChild) {
        var el = __cur.sPreload.firstChild;
        __cur.aContent.appendChild(el);
        __cur.popularCount++;
      }
      if (from_pad && window.Pads && Pads.updateHeight) {
        Pads.updateHeight();
      }
    }
    if (__cur.preloadJSON) {
      json = __cur.preloadJSON['all'];
      var cur_order = __cur.popularCount;
      for (var i in json) {
        var audio = json[i];
        audio._order = cur_order++;
        if (indexOf(__cur.popularIds, audio[0]+"_"+audio[1]) == -1) {
          __cur.popularIds.push(audio[0]+"_"+audio[1]);
          __cur.popularAudios[genre].push(audio);
        }
      }
      var aid = currentAudioId(), needs_update = __cur.popularOffset && (aid && __cur.popularIds && indexOf(__cur.popularIds, aid) != -1);
      audioPlayer.genPlaylist(__cur.popularAudios[genre], needs_update);
    }
    if (__cur.noPopular) {
      hide(__cur.showMore);
      delete __cur.noPopular;
      return;
    }
    __cur.loadingPopular = true;
    __cur.lastAct = 'popular';
    var offset = __cur.popularOffset, query = {act: 'get_popular', offset: offset},
        needsUpdate = window.audioPlayer && audioPlayer.shuffle;
    if (from_pad) {
      query.from_pad = 1;
    }
    if (nav.objLoc.update)  {
      query.update = 1;
    }
    if (needsUpdate && !offset) query.offset = -1;
    if (update == 'remix' || needsUpdate != __cur.popRemix) {
      __cur.popRemix = needsUpdate;
      query.remix = needsUpdate ? 1 : 0;
      var aid = currentAudioId();
      if (aid && window.audioPlaylist && audioPlaylist[aid] && audioPlaylist.address && audioPlaylist.address.indexOf('act=popular') > 0) {
        query.current = aid;
      }
    }
    if (__cur.topType !== undefined) {
      query.type = __cur.topType;
      delete __cur.topType;
    }
    if (__cur.genre) {
      query.genre = __cur.genre;
    }
    ajax.post(Audio.address, query, {
      onDone: function(rows, preload, json, preload_json, options, genres) {
        delete __cur.loadingPopular;
        if (__cur.lastAct != 'popular') return;
        if (options.popularCount === 0 && offset) {
          __cur.noPopular = true;
          delete options.popularOffset;
        }
        if (json) {
          json = eval('('+json+')');
          json = json['all'];
          var cur_order = __cur.popularCount;
          for (var i in json) {
            var audio = json[i];
            audio._order = cur_order++;
            if (indexOf(__cur.popularIds, audio[0]+"_"+audio[1]) == -1) {
              __cur.popularIds.push(audio[0]+"_"+audio[1]);
              __cur.popularAudios[genre].push(audio);
            }
          }
          var aid = currentAudioId(), needs_update = query.offset && (aid && __cur.popularIds && indexOf(__cur.popularIds, aid) != -1);
          audioPlayer.genPlaylist(__cur.popularAudios[genre], needs_update);
        }
        removeClass(__cur.showMore, 'loading');
        if (offset) {
          delete options.popularCount;
        }
        if (options) extend(__cur, options);
        if (!offset) {
          __cur.aContent.innerHTML = rows;
          if (from_pad && window.Pads && Pads.updateHeight) {
            Pads.updateHeight();
          }
          Audio.scrollToTop(from_pad);
        }

        if (preload_json) {
          __cur.preloadJSON = eval('('+preload_json+')');
        } else {
          __cur.preloadJSON = {};
        }
        __cur.sPreload.innerHTML = '';
        var au = ce('div', {innerHTML: preload});
        while (au.firstChild) {
          if (!ge(au.firstChild.id)) {
            var el = au.firstChild;
            __cur.sPreload.appendChild(el);
          } else {
            au.removeChild(au.firstChild);
          }
        }

        if (__cur.popularCount) {
          show(__cur.showMore);
        } else {
          hide(__cur.showMore);
        }
        if (update == 'remix') {
          __cur.justShuffled = true;
        }
        if (genres) {
          __cur.popularGenres.innerHTML = genres;
        }
        Audio.changeHTitle({from_pad: from_pad});
        val(__cur.aSearch, '');
        removeClass(__cur.clearSearch, 'shown');
        __cur.searchStr = '';
        __cur.album_id = 0;
        Audio.hideSearchResults(from_pad);
        hide(__cur.sShowMore);
        if (!from_pad) {
          delete nav.objLoc.q;
          delete nav.objLoc.owner;
          delete nav.objLoc.friend;
          delete nav.objLoc.album_id;
          delete nav.objLoc.club;
          delete nav.objLoc.genre;
          delete nav.objLoc.audio_id;
          nav.objLoc.act = 'popular';
          if (__cur.genre) {
            nav.objLoc.genre = __cur.genre;
          } else {
            delete nav.objLoc.genre;
          }
          nav.setLoc(nav.objLoc);
        }
        var _a = window.audioPlayer;
        if (_a && _a.showCurrentTrack) _a.showCurrentTrack();
        if (window.tooltips) {
          tooltips.destroyAll();
        }
        if (!from_pad) {
          Audio.loadCurrentPlaylist();
        }
        if (options.infoJS) {
          eval('(function(){' + options.infoJS + ';})()');
        }
      },
      showProgress: function () {
        addClass(genre_filter || pop_filter, 'loading');
      },
      hideProgress: function () {
        removeClass(genre_filter || pop_filter, 'loading');
      }
    });
    __cur.popularOffset += offset ? 50 : 100;
  },

  loadFeed: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, update = opts.update;
    if (__cur.silent) {
      __cur.onSilentLoad = function() {
        Audio.loadFeed(opts);
      };
      return;
    }
    if (__cur.isFeedLoading) return;
    __cur.isFeedLoading = true;
    if (__cur.audiosList && __cur.audiosList['all'] && __cur.allAudiosIndex != 'all') {
      __cur.allAudiosIndex = 'all';
      this.indexAll({from_pad: from_pad});
      var curEl = geByClass1('current', __cur.friendsList);
      if (curEl) removeClass(curEl, 'current');
    }
    if (update) {
      delete __cur.feedFrom;
      delete __cur.feedOffset;
      delete __cur.feedIds;
      delete __cur.feedAudios;
      if (update === 'reload') {
        var params = {act: 'feed', part: 1, update: 1}, q = Audio.address + '#' + ajx2q(params);
        delete window.ajaxCache[q];
      }
    }
    each(geByClass('audio_filter', __cur.albumFilters), function(i, e) {
      removeClass(e, 'selected');
    });
    if (__cur.searchStr && isVisible(__cur.searchInfoCont)) {
      hide(__cur.searchInfoCont);
    }
    if (from_pad && ge('pad_footer_text')) {
      ge('pad_footer_text').innerHTML = '';
    }
    addClass(__cur.feedFilter, 'selected');
    removeClass(__cur.albumFiltered, 'selected');
    hide(__cur.searchFilters, __cur.popularFilters, __cur.popularOwners);
    if (from_pad || __cur.oid == vk.id) {
      show(__cur.audioFriends);
      hide(__cur.searchInfoCont);
      Audio.hideAlbums({from_pad: from_pad});
    }
    removeClass(__cur.albumFiltered, 'club_shown');
    Audio.handleFilterPos();
    __cur.lastSection = __cur.curSection;
    __cur.curSection = 'feed';
    if (!update) {
      addClass(__cur.showMore, 'loading');
    }
    __cur.lastAct = 'feed';
    var query = {act: 'feed', offset: __cur.feedOffset, from: __cur.feedFrom, part: 1, update: update ? 1 : ''};
    if (from_pad) {
      query.from_pad = 1;
    }
    ajax.post(Audio.address, query, {
      onDone: function (rows, script) {
        if (__cur.lastAct != 'feed') return;
        if (rows) {
          if (update) {
            __cur.aContent.innerHTML = rows;
          } else {
            var au = ce('div'), par = geByClass1('wall_module', __cur.aContent), row;
            au.innerHTML = rows;
            if (par && update) {
              par.innerHTML = '';
            }
            while (row = au.firstChild) {
              if (!row.id || ge(row.id)) {
                au.removeChild(row);
                continue;
              }
              if (par) {
                par.appendChild(row);
              }
            }
          }
        } else {
          hide(__cur.showMore);
        }
        if (from_pad && window.Pads && Pads.updateHeight) {
          Pads.updateHeight();
        }
        if (script) {
          eval(script);
        }
        var aid = currentAudioId(), needs_update = query.offset && (aid && __cur.feedIds && indexOf(__cur.feedIds, aid) != -1 && window.audioPlaylist && audioPlaylist.address && audioPlaylist.address.indexOf('act=feed') != -1);
        audioPlayer.genPlaylist(__cur.feedAudios, needs_update);
        removeClass(__cur.showMore, 'loading');
        Audio.changeHTitle({from_pad: from_pad});
        val(__cur.aSearch, '');
        removeClass(__cur.clearSearch, 'shown');
        __cur.searchStr = '';
        __cur.album_id = 0;
        Audio.hideSearchResults(from_pad);
        hide(__cur.sShowMore);
        if (update) {
          Audio.scrollToTop(from_pad);
        }
        if (!from_pad) {
          delete nav.objLoc.q;
          delete nav.objLoc.owner;
          delete nav.objLoc.friend;
          delete nav.objLoc.album_id;
          delete nav.objLoc.club;
          delete nav.objLoc.genre;
          delete nav.objLoc.audio_id;
          delete __cur._back;
          extend(nav.objLoc, {act: 'feed'});
          nav.setLoc(nav.objLoc);
        }
        var _a = window.audioPlayer;
        if (_a && _a.showCurrentTrack) _a.showCurrentTrack();
      },
      showProgress: function () {
        __cur.isFeedLoading = true;
        addClass(__cur.feedFilter, 'loading');
      },
      hideProgress: function () {
        __cur.isFeedLoading = false;
        removeClass(__cur.feedFilter, 'loading');
      },
      cache: 1
    });
  },

  loadCurrentPlaylist: function() {
    if (!window.Pads || !Pads.showAudios || !window._pads || _pads.shown != 'mus') {
      return;
    }
    var __cur = _pads.cur;
    __cur.aContent.innerHTML = '';

    each(geByClass('audio_filter', __cur.albumFilters), function(i, e) {
      removeClass(e, 'selected');
    });
    removeClass(__cur.albumFiltered, 'selected');
    addClass(__cur.currentFilter, 'selected');
    hide(__cur.popularFilters, __cur.popularOwners, __cur.searchFilters, __cur.searchInfoCont);
    show(__cur.audioFriends, __cur.showMore, __cur.currentFilter);
    Audio.hideAlbums({from_pad: true});

    val(__cur.aSearch, '');
    removeClass(__cur.clearSearch, 'shown');
    __cur.lastSection = __cur.curSection;
    __cur.lastAct = __cur.searchStr = __cur.curSection = '';
    __cur.album_id = 0;
    Audio.hideSearchResults(true);

    Pads.showAudios();

    var _a = window.audioPlayer;
    if (_a && _a.showCurrentTrack) _a.showCurrentTrack();
  },

  reorderPlaylist: function(aid, before_id, after_id) {
    each([window.audioPlaylist, cur.nextPlaylist], function(i, e) {
      var list = e;
      if (before_id && !after_id && list && list[before_id]) {
        after_id = list[before_id]._prev;
      }
      if (list && list[aid] && after_id && list[after_id] && after_id != aid) {
        var next_id = list[aid]._next, prev_id = list[aid]._prev;
        if (next_id != aid) {
          list[next_id]._prev = prev_id;
          list[prev_id]._next = next_id;
          list[aid]._prev = after_id;
          list[aid]._next = list[after_id]._next;
          list[after_id]._next = list[list[after_id]._next]._prev = aid;
        }
      }
    });
    var plist = ls.get('pad_playlist');
    if (plist && plist[aid] && after_id && plist[after_id] && after_id != aid && window.audioPlayer) {
      audioPlayer.setPadPlaylist();
    }
  },

  removeFromPlaylist: function(aid) {
    each([window.audioPlaylist, cur.nextPlaylist], function(i, e) {
      var list = e;
      if (list && list[aid]) {
        var next_id = list[aid]._next, prev_id = list[aid]._prev;
        if (next_id != aid) {
          // delete list[aid];
          list[next_id]._prev = prev_id;
          list[prev_id]._next = next_id;
        }
      }
    });
    var plist = ls.get('pad_playlist');
    if (plist && plist[aid] && window.audioPlayer) {
      audioPlayer.setPadPlaylist();
    }
  },

  backToPlaylist: function(aid) {
    each([window.audioPlaylist, cur.nextPlaylist], function(i, e) {
      var list = e;
      if (list && list[aid]) {
        var next_id = list[aid]._next, prev_id = list[aid]._prev;
        if (next_id != aid) {
          list[next_id]._prev = list[prev_id]._next = aid;
        }
      }
    });
    var plist = ls.get('pad_playlist');
    if (plist && plist[aid] && window.audioPlayer) {
      audioPlayer.setPadPlaylist();
    }
  },

  hideRecommendation: function(aid, q, hash, event) {
    if (window.audioPlayer && currentAudioId() == aid) {
      audioPlayer.nextTrack(true);
    }
    var recRow = ge('audio'+aid);
    if (recRow) {
      if (window.tooltips) {
        tooltips.hide(ge('remove'+aid))
      }
      slideUp(recRow, 200, function() {
        recRow.parentNode.removeChild(recRow);
        Audio.removeFromPlaylist(aid);
        cur.recsCount--;
        Audio.changeHTitle();
      });
    }
    ajax.post(Audio.address, {act: 'hide_recommendation', q: q, hash: hash});
    if (event) cancelEvent(event);
    return false;
  },

  _animDelX: function(el, opacity, set_active) {
    if (!el) return;
    if (set_active !== undefined) {
      el.active = set_active;
    } else if (el.active) {
      return;
    }
    animate(el, {opacity: opacity}, 200);
  },

  rowActive: function(el, tt, sh) {
    Audio._animDelX(el, 1, 1);
    if (tt) showTooltip(el, {text: tt, showdt: 0, black: 1, shift: (sh ? sh : [12, 4, 0])});
  },
  rowInactive: function(el, light) {
    var opacity = light ? 0.6 : 0.4;
    Audio._animDelX(el, opacity, 0);
  },

  selectFriend: function(opts, ev) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, id = opts.id;
    if (__cur.skipSelectFriend) {
      __cur.skipSelectFriend = false;
      return;
    }
    each(geByTag('div', __cur.audioFriends), function(i, e) {
      removeClass(e, 'current');
    });
    addClass(ge((from_pad ? 'pad_' : '') + 'audio_friend' + id), 'current');
    addClass(ge((from_pad ? 'pad_' : '') + 'album0'), 'loading');
    each(geByClass('audio_filter', __cur.albumFilters), function(i, e) {
      removeClass(e, 'selected');
    });
    Audio.loadFriendsAudios({id: id, index: 'friend' + id, from_pad: from_pad});
    if (id && (__cur.oid == vk.id || from_pad)) {
      ajax.post(Audio.address, {act: 'list_stats', owner: id});
    }
    return ev ? cancelEvent(ev) : false;
  },
  skipSelectFriend: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur;
    __cur.skipSelectFriend = true;
  },
  selectCommunity: function(opts, ev) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, id = opts.id;
    if (__cur.skipSelectCommunity) {
      __cur.skipSelectCommunity = false;
      return;
    }
    each(geByClass('audio_friend', __cur.searchInfoCont), function(i, e) {
      removeClass(e, 'current');
    });
    addClass(ge((from_pad ? 'pad_' : '') + 'audio_community' + id), 'current');
    mentionOver(ge((from_pad ? 'pad_' : '') + 'audio_community' + id), {shift: [47, 7, 7]});
    each(geByClass('audio_filter', __cur.albumFilters), function(i, e) {
      removeClass(e, 'selected');
    });
    addClass(__cur.albumFiltered, 'club_shown');
    __cur.searchSortFilter.disable(true);
    __cur.searchLyricsFilter.disable(true);
    removeClass(__cur.albumFiltered, 'selected');
    __cur.club = id;
    Audio.loadCommunityAudios({from_pad: from_pad, gid: id, index: 'club' + id});
    if (id && (__cur.oid == vk.id || from_pad)) {
      ajax.post(Audio.address, {act: 'list_stats', club: id});
    }
    return ev ? cancelEvent(ev) : false;
  },
  skipSelectCommunity: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur;
    __cur.skipSelectCommunity = true;
  },
  backToSearch: function(from_pad) {
    var __cur = from_pad ? window._pads && _pads.cur : window.cur;
    if (__cur.curSection && __cur.curSection.substr(0, 4) == 'club') {
      __cur.ignoreEqual = true;
      each(geByClass('audio_friend', __cur.searchInfoCont), function() {
        removeClass(this, 'current');
      });
      this.updateList({from_pad: from_pad});
    }
  },
  playCurrent: function(el, hash, ev) {
    var _a = window.audioPlayer, aid = currentAudioId(), audioId = el.getAttribute('data-audio');
    if (_a) _a.gpDisabled = false;
    if ((window.audioPlaylist || {})[audioId]) {
      if (!_a || aid != audioId || _a.player.paused()) playAudioNew(audioId);
      return cancelEvent(ev);
    }

    var prg = el.nextSibling || el.parentNode.appendChild(ce('span', {className: 'progress_inline current_audio_prg'}));
    stManager.add(['audioplayer.css', 'audioplayer.js'], ajax.post.pbind(Audio.address, {act: 'play_audio_status', id: audioId, hash: hash}, {
      onDone: function(info, data, uid) {
        if (data && uid) {
          audioPlayer.statusData = audioPlayer.statusData || {};
          audioPlayer.statusData[uid] = data;
        }
        if (!info) return;

        if (!window.audioPlaylist) {
          window.audioPlaylist = {};
        }
        audioPlaylist[audioId] = info;
        audioPlaylist.start = audioId;
        if (data && uid) {
          audioPlaylist.statusData = data;
        } else {
          delete audioPlaylist.statusData;
        }
        audioPlayer.setPadPlaylist(audioPlaylist);
        playAudioNew(audioId);
      },
      showProgress: function() {
        show(prg);
        hide(el);
      },
      hideProgress: function() {
        hide(prg);
        show(el);
      }
    }));
    return cancelEvent(ev);
  },
  loadFriendsAudios: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, id = opts.id, index = opts.index,
        album = opts.album, showAlbums = opts.showAlbums, owner = opts.owner,
        leaveStr = !!opts.leaveStr;
    if (__cur.silent) {
      __cur.onSilentLoad = function() {
        Audio.loadFriendsAudios(opts);
      };
      return;
    }
    if (!__cur.audiosList[index]) {
      if (__cur.loadingFriends) return;
      __cur.loadingFriends = true;
      if (index == 'all') {
        each(geByClass('audio_filter', __cur.albumFilters), function(i, e) {
          removeClass(e, 'selected');
        });
        if (showAlbums) {
          addClass(__cur.albumsFilter, 'loading');
        } else if (album) {
          addClass(ge((from_pad ? 'pad_' : '') + 'album' + album), 'selected loading');
        } else {
          addClass(ge((from_pad ? 'pad_' : '') + 'album0'), 'selected loading');
        }
        removeClass(__cur.albumFiltered, 'selected');
      }
      __cur.lastAct = index;
      var query = {act: 'load_audios_silent', id: id, claim: nav.objLoc.claim, please_dont_ddos: 3};
      if (owner) {
        query.is_owner = 1;
      }
      if (index != 'all' && !ge((from_pad ? 'pad_' : '') + 'audio_friend' + id) && !owner) {
        __cur.shownFriends = [];
        var txt = domFC(ge(__cur.audioMoreFriensId)), prg = domLC(ge(__cur.audioMoreFriensId));
        Audio.showMoreFriends({from_pad: from_pad, onShow: function() {
          hide(txt);
          show(prg);
        }, onHide: function() {
          hide(prg);
          show(txt);
        }, friend: id});
      }
      ajax.post(Audio.address, query, {
        cache: 1,
        hideProgress: function() {
          delete __cur.loadingFriends;
        },
        onDone: function(data, options) {
          if (__cur.lastAct != index) return;
          options = eval('('+options+')');
          if (options.summaryLang) {
            __cur.summaryLang = extend(__cur.summaryLang || {}, options.summaryLang);
          }
          if (id < 0) {
            __cur.allFriendsHTitles = __cur.allFriendsHTitles || {};
            __cur.allFriendsHTitles[id] = options.summaryLang.all_club_htitle;
          } else {
            __cur.allFriendsTitles = __cur.allFriendsTitles || {};
            __cur.allFriendsTitles[id] = options.summaryLang.all_friend_title;
            __cur.allFriendsHTitles = __cur.allFriendsHTitles || {};
            __cur.allFriendsHTitles[id] = options.summaryLang.all_friend_htitle;
          }
          var obj = eval('('+data+')');
          if (!obj) return;
          __cur.audiosList[index] = obj['all'];
          if (id == vk.id && index == 'all') {
            __cur.allAudiosIndex = 'all';
            Audio.generateAlbums(from_pad);
          }
          if (!__cur.performerInfo) {
            __cur.performerInfo = {};
          }
          __cur.performerInfo[index] = options.performerInfo;
          if (options.backLink && !from_pad) {
            __cur.backLink = options.backLink;
            showBackLink('/audios' + vk.id + '?act=popular'+(__cur.genre ? '&genre='+__cur.genre : ''), __cur.backLink);
          }
          if (index != 'all') __cur.audioFriend = id;
          Audio.changeAllIndex({from_pad: from_pad, index: index, album: album, showAlbums: showAlbums, owner: owner, leaveStr: leaveStr});
          Audio.cacheFriendsList(from_pad);
        }
      });
    } else {
      if (index != 'all') __cur.audioFriend = id;
      if (owner && !from_pad) {
        showBackLink('/audios' + vk.id + '?act=popular'+(__cur.genre ? '&genre='+__cur.genre : ''), __cur.backLink);
      }
      Audio.changeAllIndex({from_pad: from_pad, index: index, album: album, showAlbums: showAlbums, owner: owner, leaveStr: leaveStr});
    }
  },
  loadCommunityAudios: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, gid = opts.gid, index = opts.index;
    if (__cur.silent) {
      __cur.onSilentLoad = function() {
        Audio.loadCommunityAudios(opts);
      };
      return;
    }
    if (!__cur.audiosList[index]) {
      __cur.lastAct = index;
      ajax.post(Audio.address, {act: 'load_audios_silent', gid: gid, claim: nav.objLoc.claim, please_dont_ddos: 1}, {
        cache: 1,
        showProgress: addClass.pbind(ge((from_pad ? 'pad_' : '') + 'album0'), 'loading'),
        hideProgress: removeClass.pbind(ge((from_pad ? 'pad_' : '') + 'album0'), 'loading'),
        onDone: function(data, options) {
          if (__cur.lastAct != index) return;
          options = eval('('+options+')');
          __cur.allClubsHTitles = __cur.allClubsHTitles || {};
          __cur.allClubsHTitles[gid] = options.summaryLang.all_club_htitle;
          var obj = eval('('+data+')');
          if (!obj) return;
          __cur.audiosList[index] = obj['all'];
          Audio.searchAudios({from_pad: from_pad, type: index, str: ''});
          Audio.scrollToTop(from_pad);
        }
      });
    } else {
      Audio.searchAudios({from_pad: from_pad, type: index, str: ''});
      Audio.scrollToTop(from_pad);
    }
  },
  showMoreFriends: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, friend = opts.friend,
        onShow = opts.onShow || function() {}, onHide = opts.onHide || function() {};
    if (__cur.moreFriendsSent) {
      return;
    }
    __cur.moreFriendsSent = true;
    var query = {act: 'more_friends', ids: __cur.shownFriends};
    if (friend) {
      query.owner = friend;
    }
    if (from_pad) {
      query.from_pad = 1;
    }
    ajax.post(Audio.address, query, {
      onDone: function(cont, friends, reset) {
        __cur.moreFriendsSent = false;
        if (cont) {
          var list = __cur.friendsList;
          re('audio_friends_old');
          var old = ce('div', {innerHTML: '<div id="audio_friends_old" style="position: absolute; top: ' + list.offsetTop + 'px">'+list.innerHTML+'</div>'}).firstChild;
          list.parentNode.insertBefore(old, list);
          list.innerHTML = '';
          setStyle(list, {display: 'none'});
          list.innerHTML = cont;
          var oldRows = geByClass('audio_friend', old), oldCnt = oldRows.length,
              newCnt = geByClass('audio_friend', list).length;
          if (oldCnt > newCnt) {
            oldRows = oldRows.slice(newCnt);
            each(oldRows, function() {
              re(this);
            });
          }
          setTimeout(Audio.handleFilterPos, 0);
          fadeIn(list, 400, re.pbind(old));
          if (friends) {
            __cur.shownFriends = reset ? friends : __cur.shownFriends.concat(friends);
          }
        } else {
          Audio.handleFilterPos();
        }
      },
      onFail: function() {
        __cur.moreFriendsSent = false;
      },
      showProgress: onShow,
      hideProgress: onHide
    });
  },
  cacheFriendsList: function(from_pad) {
    var __cur = from_pad ? window._pads && _pads.cur : window.cur,
        query = {act: 'more_friends'};
    if (__cur.audioFriendPlaying) query.owner = __cur.audioFriendPlaying;
    else if (__cur.audioFriend) query.owner = __cur.audioFriend;
    ajax.post(Audio.address, query, {cache: 1});
  },

  // Audio Edit functions

  showAudioClaimWarning: function(aid, claim_id, title, reason) {
    if (cur.silent) {
      cur.onSilentLoad = function() {
        Audio.showAudioClaimWarning(aid, claim_id, title, reason);
      };
      return;
    }
    var claimText, claimTitle;
    if (reason == 'crap') {
      claimText = getLang(claim_id >= 0 ? 'audio_crap_warning_text' : 'audio_crap_warning') || getLang(claim_id > 0 ? 'audio_claim_warning_objection' : (claim_id == 0 ? 'audio_claim_warning_text' : 'audio_claim_warning'));
      claimTitle = getLang('audio_crap_warning_title') || getLang('audio_claim_warning_title');
    } else {
      claimText = (claim_id > 0) ? getLang('audio_claim_warning_objection') : (claim_id == 0 ? getLang('audio_claim_warning_text') : getLang('audio_claim_warning'));
      claimTitle = getLang('audio_claim_warning_title');
    }
    claimText = claimText.split('{audio}').join('<b>' + title + '</b>');
    claimText = claimText.split('{objection_link}').join('<a href="/help?act=cc_objection&claim=' + claim_id + '&content=audio' + aid + '">' + getLang('audio_claim_objection') + '</a>');
    claimText = claimText.split('{delete_link}').join('<a href="#" onclick="Audio.deleteAudio(\'' + aid + '\'); return false;">' + getLang('audio_claim_delete') + '</a>');
    cur.claimWarning = showFastBox({title: claimTitle, dark: 1}, claimText);
  },

  deleteAudio: function(id) {
    if (cur.silent) {
      cur.onSilentLoad = function() {
        Audio.deleteAudio(id);
      };
      return;
    }
    if (cur.deleting) {
      return false;
    }
    cur.deleting = true;
    var el = ge('audio' + id), aid = id.split('_')[1];
    if (!cur.deletedAudios) cur.deletedAudios = [];
    cur.deletedAudios[aid] = el.innerHTML;
    var acts = geByClass1('actions', el);
    each(acts.children, function(){if (this.tt && this.tt.hide) this.tt.hide()});
    var a = (cur.audios || {})[aid] || [], lyrics = isVisible(ge('lyrics'+id)),
        _tw = el && geByClass1('title_wrap', el),
        performer = a[5] || _tw && (geByTag1('a', _tw) || {}).innerHTML || '',
        title = a[6] || _tw && (geByClass1('title', _tw) || {}).innerHTML || '';
    el.innerHTML = rs(cur.deletedTpl, {
      audio_id: id,
      performer: performer.split('<span>').join('').split('</span>').join(''),
      title: title,
      delete_all: ''
    });
    var _a = window.audioPlayer;
    if (currentAudioId() == id) {
      _a.showCurrentTrack();
    }
    if (lyrics) {
      Audio.updateSorterRows(ge('audio'+id));
    }
    var addBtn = ge('audio_add'+id);
    if (addBtn) {
      addBtn.onmouseover = function() {};
    }
    ajax.post(Audio.address, {act: 'delete_audio', oid: cur.oid, aid: aid, hash: cur.hashes.delete_hash, restore: 1}, {
      onDone: function(action, delete_all) {
        cur.deleting = false;
        if (cur.claimWarning) {
          cur.claimWarning.hide();
        }
        var acts = geByClass1('actions', el);
        each(acts.children, function(){if (this.tt) this.tt.hide()});
        el.innerHTML = rs(cur.deletedTpl, {
          audio_id: id,
          performer: performer.split('<span>').join('').split('</span>').join(''),
          title: title,
          delete_all: action ? action : ''
        });
        el.style.cursor = 'auto';
        el.setAttribute('nosorthandle', '1');
        if (currentAudioId() == id) {
          _a.showCurrentTrack();
        }
        if (delete_all) {
          cur.lang = cur.lang || {};
          cur.lang.audio_delete_all = delete_all;
        }
        if (cur.audios[aid]) {
          cur.audiosIndex.remove(cur.audios[aid]);
          cur.audios[aid].deleted = true;
          if (window.Pads && Pads.clearAudioLoadCache) {
            Pads.clearAudioLoadCache();
          }
        }
        Audio.removeFromPlaylist(id);
        cur.sectionCount--;
        if (cur.shownAudios) cur.shownAudios--;
        Audio.changeSummary();
      },
      onFail: function() {
        cur.deleting = false;
      }
    });
    return false;
  },

  restoreAudio: function(id) {
    if (cur.restoring) {
      return;
    }
    cur.restoring = true;
    var el = ge('audio' + id), aid = id.split('_')[1];
    ajax.post(Audio.address, {act: 'restore_audio', oid: cur.oid, aid: aid, hash: cur.hashes.restore_hash}, {
      onDone: function() {
        cur.restoring = false;
        var acts = geByClass1('actions', el);
        each(acts.children, function(){if (this.tt) this.tt.hide()});
        el.innerHTML = cur.deletedAudios[aid];
        var lyrics = isVisible(ge('lyrics'+id));
        if (lyrics) {
          Audio.updateSorterRows(ge('audio'+id));
        }
        el.removeAttribute('nosorthandle');
        if (cur.audios[aid]) {
          cur.audiosIndex.add(cur.audios[aid]);
          cur.audios[aid].deleted = false;
          if (window.Pads && Pads.clearAudioLoadCache) {
            Pads.clearAudioLoadCache();
          }
        }
        Audio.backToPlaylist(id);
        cur.sectionCount++;
        if (cur.shownAudios) cur.shownAudios++;
        Audio.changeSummary();
        toggleClass(ge('play'+id), 'playing', id == currentAudioId());
      },
      onFail: function() {
        cur.restoring = false;
      }
    });
  },

  deleteAll: function(object_id, from_id, to_id, hash) {
    var box = showFastBox({title: getLang('audio_delete_all_title'), dark: 1}, getLang('audio_delete_all') || '', getLang('global_delete'), function(btn){
      ajax.post(Audio.address, {act: 'delete_all', object_id: object_id, to_id: to_id, from_id: from_id, hash: hash}, {
        showProgress: lockButton.pbind(btn),
        onDone: function() {
          nav.reload();
        },
        onFail: box.hide
      });
    }, getLang('global_cancel'));
  },

  editAudio: function(aid, event){
    showBox(Audio.address, {act: 'edit_audio_box', aid: aid}, {
      params: {width: '440px', bodyStyle: 'padding: 20px; background-color: #F7F7F7;', hideButtons: 1}, dark: 1
    });
    if (event) cancelEvent(event);
    return false;
  },

  editTopAudio: function(full_aid, event) {
    showBox('al_search.php', {act: 'audio_top_edit_box', id: full_aid, full_id: full_aid}, {
      params: {width: '440px', bodyStyle: 'padding: 20px; background-color: #F7F7F7;', hideButtons: 1}, dark: 1
    });
    if (event) cancelEvent(event);
    return false;
  },

  removeFromTop: function(audio_hash, hash, full_aid, event) {
    ajax.post('al_search.php', {act: 'save_top_audio', deleted: 1, audio_hash: audio_hash, hash: hash, id: full_aid}, {
      onDone: function() {
        var audioRow = ge('audio'+full_aid);
        slideUp(audioRow, 100);
      }
    })
  },

  updateAlbumsStart: function() {
    if (!cur.canEdit || browser.mobile || !cur.audioAlbumsWrap ||  !cur.audioAlbumsWrap.sorter) return;
    each (cur.audioAlbumsWrap.sorter.elems, function() {
      setStyle(this, {top: 'auto', left: 'auto', width: 'auto'});
    });
    cur.audioAlbumsWrap.sorter.destroy();
  },

  updateAlbumsFinish: function() {
    if (!cur.canEdit || browser.mobile) return;
    this.initAlbumsSort();
    this.updateAlbumsTitles();
  },

  updateAlbums: function() {
    this.updateAlbumsStart();
    this.updateAlbumsFinish();
  },

  updateAlbumsTitles: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad;

    if (!__cur.audioAlbumsWrap) return;

    each (geByClass('label', __cur.audioAlbumsWrap), function() {
      if (this.scrollWidth > this.clientWidth) {
        this.setAttribute('title', this.innerText || this.textContent);
      } else {
        this.removeAttribute('title');
      }
    });
  },

  updatePadFiltersHeight: function() {
    var filters = ge('pad_side_filters'), td = ge('pad_filters_panel'),
        curSz = getSize(td)[1], minSz = getSize(_pads.content)[1],
        newSz = Math.max(minSz, getSize(filters)[1] + 10);
    if (newSz != curSz) {
      setStyle(td, {height: newSz});
      if (window.Pads) {
        Pads.updateHeight();
      }
    }
  },

  initAlbumsSort: function() {
    if (!cur.canEdit || browser.mobile || !cur.audioAlbumsWrap || cur.audioAlbumsWrap.sorter) return;
    sorter.init(cur.audioAlbumsWrap, {onMouseDown: Audio.hideAlbumsTT, onReorder: Audio.onAlbumReorder, noMoveCursor: 1});
  },

  hideAlbumsTT: function() {
    each(geByClass('icon_wrap', cur.audioAlbumsWrap), function() {
      if (this.tt) this.tt.hide();
    })
  },

  onAlbumReorder: function(album, before, after) {
    var aid = album.id.replace('album', '');
    var before_id = (before && before.id || '').replace('album', '');
    var after_id = (after && after.id || '').replace('album', '');
    ajax.post(Audio.address, {act: 'reorder_albums', oid: cur.oid, aid: aid, before: before_id, after: after_id, hash: cur.hashes.reorder_hash});
  },

  editAlbum: function(aid){
    if (cur.silent) {
      cur.onSilentLoad = function() {
        Audio.editAlbum(aid);
      };
      return;
    }
    if (!cur.audiosList) {
      return;
    }
    var box = showTabbedBox(Audio.address, {act: 'edit_album_box', album_id: aid, oid: cur.oid}, {stat: ['privacy.js', 'privacy.css', 'ui_controls.js', 'ui_controls.css', 'indexer.js'], dark: 1});
    cur.onOListSave = Audio.saveAlbum.pbind(box, aid);
    return false;
  },

  createAlbum: function() {
    return this.editAlbum(0);
  },

  saveAlbum: function(box, aid, audio_ids) {
    var btn = geByClass1('flat_button', box.bodyNode.nextSibling),
        albumName = val('album_name');
    if (!albumName) {
      notaBene('album_name');
      return false;
    }
    var query = {act: 'save_album', album_id: aid, name: albumName, gid: cur.gid, Audios: audio_ids.join(','), hash: cur.hashes.save_album_hash};
    ajax.post(Audio.address, query, {
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn),
      onFail: box.hide,
      onDone: function(album_id, audio_ids, filters) {
        try{
          Audio.updateAlbumsStart();
          cur.audioAlbumsWrap.innerHTML = filters;
          var old = cur.audiosList['album'+album_id];
          if (old) {
            for (var i in old) {
              cur.audios[old[i][1]][8] = 0;
            }
          }
          for (var i in audio_ids) {
            cur.audios[audio_ids[i]][8] = album_id;
          }
          cur.albums[album_id] = {id: album_id, title: clean(albumName)};
          Audio.generateAlbums();
          Audio.loadAlbum({album: album_id});
          Audio.updateAlbumsFinish();
          box.hide();
        }catch(e){}
      }
    });
    return false;
  },

  deleteAlbum: function(aid, hash){
    var box = showFastBox({title: getLang('audio_delete_album_title'), dark: 1}, getLang('audio_delete_album_are_you_sure'), getLang('audio_delete_album_button'), function(btn){
      ajax.post(Audio.address, {act: 'delete_album', album_id: aid, hash: hash, gid: cur.gid}, {
        showProgress: lockButton.pbind(btn),
        hideProgress: unlockButton.pbind(btn),
        onDone: function(audio_ids, filters){
          try{
            re('album'+aid);
            boxQueue.hideAll();
            for (var i in audio_ids) {
              cur.audios[audio_ids[i]][8] = 0;
            }
            delete cur.albums[aid];
            Audio.generateAlbums();
            if (cur.album_id == aid) {
              Audio.loadAlbum({album: 0, showAlbums: true});
            }
            Audio.updateAlbums();
          }catch(e){}
        },
        onFail: function(){
          box.hide(200);
        }
      });
    }, getLang('global_cancel'));
  },

  moveAudio: function(full_id, album_id) {
    var id = full_id.split('_')[1];
    ajax.post(Audio.address, {act:'move_to_album', album_id:album_id, audio_id:id, gid:cur.gid, hash:cur.hashes.move_hash}, {
      onDone: function(text) {
        if((cur.album_id && cur.album_id != album_id) || cur.filterUnsorted){
          var el = ge('audio'+full_id);
          fadeOut(el, 300, function(){
            el.parentNode.removeChild(el);
            each (cur.aContent.sorter.elems, function() {
              setStyle(this, {top: 'auto', left: 'auto'});
            });
            cur.aContent.sorter.destroy();
            var opts = {onReorder: Audio.onAudioReorder, onMouseDown: Audio.onDragStart, onMouseUp: Audio.onDragEnd, noMoveCursor: 1};
            if (cur.audioAlbumsWrap) {
              extend(opts, {target: cur.audioAlbumsWrap, onDragOver: Audio.onDragOver, onDragOut: Audio.onDragOut});
            }
            sorter.init(cur.aContent, opts);
            cur.sectionCount--;
            Audio.changeSummary();
            if (cur.sectionCount == 0) {
              cur.aContent.innerHTML = '<div id="not_found" class="info_msg">'+getLang('audio_album_no_recs')+'</div>';
            }
            hide(cur.showMore);
          });
        }
        cur.audios[id][8] = album_id;
        Audio.generateAlbums();
      }
    });
  },

  onAudioReorder: function(audio, before, after) {
    var aid = audio.id.replace('audio', '').split('_')[1];
    var before_id = (before && before.id || '').replace('audio', '').split('_')[1];
    var after_id = (after && after.id || '').replace('audio', '').split('_')[1];
    ajax.post(Audio.address, {act: 'reorder_audios', oid: cur.oid, aid: aid, before: before_id, after: after_id, hash: cur.hashes.reorder_hash}, {
      onDone: function(data) {
        var val;
        if (before_id && !after_id) {
          val = cur.audios[before_id]._order - 0.01;
        } else {
          val = cur.audios[after_id]._order + 0.01;
        }
        cur.audios[aid]._order = val;
        Audio.reorderPlaylist(cur.oid + '_' + aid, before_id ? cur.oid + '_' + before_id : '', after_id ? cur.oid + '_' + after_id : '');
      }
    });
  },

  onDragStart: function(el) {
    // addClass(ge('page_body'), 'no_overflow');
    cur.dragStartTimer = setTimeout(function() {
      addClass(cur.audioAlbumsWrap, 'drag');
      hide('album_add');
      var ids = el.id.substr(5), id = parseInt(ids.split('_')[1]);
      var album_id = (cur.audios) ? cur.audios[id][8] : cur.album_id;
      each(geByClass('audio_filter', cur.audioAlbumsWrap), function(i,v) {
        if ('album'+album_id == v.id || (album_id == 0 && v.id == 'album_unsorted')) {
          return;
        }
        addClass(v, 'drag_on');
      });
      animate(el, {opacity: .8}, 200);
    }, 300);
  },

  onDragEnd: function(el, target) {
    if (cur.dragStartTimer) clearTimeout(cur.dragStartTimer);
    // removeClass(ge('page_body'), 'no_overflow');
    each(geByClass('audio_filter', cur.audioAlbumsWrap), function(i,v) {
      removeClass(v, 'drag_on');
    });
    show('album_add');
    if (target) {
      var new_album, full_id = el.id.substr(5), aid = parseInt(full_id.split('_')[1]);
      var album_id = (cur.audios) ? cur.audios[aid][8] : cur.album_id;
      if (target.id != 'album_unsorted') {
        new_album = parseInt(target.id.substr(5));
      } else {
        new_album = 0;
      }
      if (new_album != album_id) {
        Audio.moveAudio(full_id, new_album);
      }
    }
    removeClass(cur.audioAlbumsWrap, 'drag');
    animate(el, {opacity: 1}, 200);
  },

  onDragOver: function(el, target) {
    cur.targetId = target.id || '';
    var ids = el.id.substr(5), id = parseInt(ids.split('_')[1]);
    var album_id = (cur.audios) ? cur.audios[id][8] : cur.album_id;
    if ('album'+album_id == target.id || (album_id == 0 && target.id == 'album_unsorted')) {
      return;
    }
    if (cur.dragOutTimer) {
      clearTimeout(cur.dragOutTimer);
    }
    addClass(target, 'drag_over');
    setStyle(el, {opacity: .4});
  },

  onDragOut: function(el, target) {
    removeClass(target, 'drag_over');
    if (target.id && cur.targetId != target.id) return;
    cur.dragOutTimer = setTimeout(function(){setStyle(el, {opacity: .8});}, 200);
  },

  ignoreOwner: function (post_raw, owner_id, hash, btn) {
    triggerEvent(ge('delete_post' + post_raw), 'mouseout');
    cur.feedEntriesHTML = cur.feedEntriesHTML || {};
    if (post_raw) {
      cur.feedEntriesHTML[post_raw + '_ignored'] = val('post' + post_raw);
    }
    ajax.post(Audio.address, {act: 'a_ignore_owner', post_raw: post_raw, owner_id: owner_id, hash: hash}, {
      onDone:function(html) {
        val('post' + post_raw, html);
        each(geByClass('post', cur.aContent), function(i,v) {
          var ids = this.id.match(/post((-?\d+)_(-?\d+)(_\d+)?)/);
          if (ids[1] != post_raw && (!ids[4] && ids[2] == owner_id || ids[4] && ids[3] == owner_id)) {
            hide(this);
          }
        });
      }
    });
  },

  unignoreOwner: function (post_raw, owner_id, hash) {
    ajax.post(Audio.address, {act: 'a_unignore_owner', post_raw: post_raw || '', owner_id: owner_id, hash: hash}, {
      onDone:function(html) {
        if (post_raw) {
          val('post' + post_raw, cur.feedEntriesHTML[post_raw + '_ignored']);
        } else {
          val('ignore_row' + owner_id, html);
        }
        each(geByClass('post', cur.aContent), function(i,v) {
          var ids = this.id.match(/post((-?\d+)_(-?\d+)(_\d+)?)/);
          if (!ids[4] && ids[2] == owner_id || ids[4] && ids[3] == owner_id) {
            show(this);
          }
        });
      }
    });
  },

  editHidden: function () {
    showTabbedBox('al_settings.php', {act: 'a_edit_owners_list', list: 'audio', height: lastWindowHeight}, {stat: ['privacy.js', 'privacy.css', 'ui_controls.js', 'ui_controls.css', 'indexer.js'], dark: 1});
    cur.onOListSave = Audio.onHiddenSave;
    return false;
  },

  onHiddenSave: function(white, black, list, options) {
    var box = curBox(), params = {act: 'a_ignore_olist', hash: options.hash};
    if (white.length < black.length) {
      params.White = white.join(',');
    } else {
      params.Black = black.join(',');
    }
    ajax.post(Audio.address, params, {
      onDone: function(control, rules) {
        box.hide();
        Audio.loadFeed({update: 'reload'});
      },
      showProgress: box.showProgress,
      hiderogress: box.hideProgress
    });
    return false;
  },

  loadGenre: function(opts, ev) {
    if (checkEvent(ev)) {
      return true;
    }
    opts = opts || {};
    var from_pad = !!opts.from_pad, genre_id = opts.genre;
    Audio.loadPopular({update: true, genre: genre_id, from_pad: from_pad});
    return cancelEvent(ev);
  },

  loadPerformer: function(opts, ev) {
    if (checkEvent(ev)) {
      return true;
    }
    opts = opts || {};
    var from_pad = !!opts.from_pad, oid = opts.oid, index = 'owner' + oid;
    Audio.loadFriendsAudios({id: oid, index: index, owner: true, from_pad: from_pad});
    return cancelEvent(ev);
  },

  moreCatalog: function(opts) {
    opts = opts || {};
    var __cur = opts.from_pad ? window._pads && _pads.cur : window.cur,
        from_pad = !!opts.from_pad, obj = opts.el;
    if (hasClass(obj, 'audio_performer_shown')) {
      var height = getSize(ge('audio_more_performers'))[1];
      removeClass(obj, 'audio_performer_shown');
      hide('audio_more_performers');
      if (height > 300) {
        scrollToTop(0);
      }
    } else {
      if (ge('audio_more_performers')) {
        show('audio_more_performers')
        addClass(obj, 'audio_performer_shown');
        return false;
      }
      var exclude = [];
      var nodes = ge(__cur.popularPerformersId).childNodes;
      for (var i in nodes) {
        if (hasClass(nodes[i], 'audio_owner')) {
          exclude.push(intval(nodes[i].getAttribute('ref')));
        }
      }
      var query = {act: 'get_more_performers', offset: 4, exclude: exclude.join(','), genre: parseInt(__cur.genre)};
      if (from_pad) {
        query.from_pad = 1;
      }
      ajax.post('al_audio.php', query, {
        onDone: function(rows) {
          ge(__cur.popularPerformersId).appendChild(ce('div', {
            id: 'audio_more_performers',
            innerHTML: rows
          }));
          addClass(obj, 'audio_performer_shown');
        },
        showProgress: addClass.pbind(obj, 'audio_performer_loading'),
        hideProgress: removeClass.pbind(obj, 'audio_performer_loading')
      });
    }
  },

  _eof: 1
}
try{stManager.done('audio.js');}catch(e){}
