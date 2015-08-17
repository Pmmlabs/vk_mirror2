var Video = {
  regBR: new RegExp('<br>', 'g'),

  CHANNEL_PREFIX: 'channel',
  CATEGORY_PREFIX: 'cat_',

  init: function(obj) {
    extend(cur, obj);
    extend(cur, {
      vSearch: ge('v_search'),
      videoSearch: ge('video_search'),
      videoUploadTab: ge('video_upload_tab'),
      videoContentTab: ge('video_content'),
      videoAllContent: ge('video_all'),
      videoPlaylistsEl: ge('video_playlists'),
      videoPlayListCont: geByClass1('video_playlists_content', ge('video_playlists')),
      vRows: ge('video_rows'),
      vList: ge('video_list'),
      vSearchRows: ge('video_search_rows'),
      vViewModeSwitch: geByClass1('video_playlist_button'),
      more: ge('show_more'),
      notFound: ge('not_found'),
      pageEnd: ge('page_end'),
      summary: ge('video_summary'),
      hTab: ge('video_tab_hidden'),
      searchSummary: ge('video_search_summary'),
      secFilter: ge('video_section_filter'),
      albumsCont: ge('video_albums_wrap'),
      albumsContMore: ge('video_albums_more'),
      albumsSearchWrap: ge('video_albums_search_wrap'),
      videoLocalSearchSummary: ge('video_local_search_summary'),
      albumsSummaryEl: geByClass1('video_playlists_overview'),
      channelHeaderEl: geByClass1('video_channel_header'),
      catWrap: ge('video_cat_wrap'),
      bottomProgress: ge('video_bottom_progress'),
      channelTab: ge('video_tab_channel'),
      module: 'video',
      vDateAdded: '',
      vOrder: 2
    });

    cur.ownerPlaylistsHtml = cur.albumsSummaryEl ? cur.albumsSummaryEl.innerHTML : '';

    placeholderSetup(cur.vSearch, {back: true});
    iSearch.destroy();
    if (vk.id) {
      iSearch.init(cur.vSearch, { onShow: function() {
        Video.updateISearchWidth();
      } });
      cur.destroy.push(function() {
        iSearch.destroy();
      });
    }

    Video.updateISearchWidth();

    onDomReady(function() {
      elfocus(cur.vSearch);
    });

    if (browser.mobile) {
      cur.cansort = false;
    }

    cur.perPage = 18;
    cur.searchCount = {};
    if (!cur.searchData) {
      cur.searchData = {};
    }

    cur.restoreRaw = {};

    if (!cur.videoList || isArray(cur.videoList) && !cur.videoList.length) {
      cur.videoList = { all: { silent: true } };
    }

    var list = (cur.videoList[cur.vSection] || {}).list;

    if (cur.vSection != 'all' && list) {
      len = list.length;
    }

    Video.scrollNode = browser.msie6 ? pageNode : window;

    setTimeout((function() {
      this.indexAll(cur.onIndexFinish);
    }).bind(this), 0);

    cur.timeouts = {};
    cur.destroy.push(function() {
      Video.stopEvents();
    });

    cur.nav.push((function(changed, old, n, opts) {
      if (typeof(changed.act) != 'undefined') {
        return;
      }

      if (window.mvcur) {
        var m = (changed[0] || '').match(/^video(-?\d+_\d+)/), owner;
        if (m) {
          if (!mvcur.mvShown || mvcur.videoRaw == m[1]) {
            showVideo(m[1], '', {});
            return false;
          }
        }
        if (!m && mvcur.mvShown && (owner = old[0].match(/^video(-?\d+)_\d+/))) {
          owner = intval(owner[1]);
          if (n[0] == 'video' && (owner == vk.id && !n.gid || owner < 0 && n.gid == -owner) || owner > 0 && n[0] == 'videos' + owner) {
            videoview.hide(opts.hist ? 2 : false);
            return false;
          }
        }
      }
      if (changed.q !== undefined) {
        cur.vSearch.value = changed.q || '';
        Video.searchVideos(changed.q);
      }
      if (old[0] == n[0] && (n.section || changed.section != undefined)) {
        if (old.section == 'upload' && n.section != 'upload') {
          if (VideoUpload.checkChanges(1) === false) {
            cur.onContinueCb = nav.go.pbind(n);
            return false;
          } else if (n.section == 'all' || (!changed.section && changed.section != undefined && n[0] == 'video')) {
            this.loadSilent('all');
            this.loadSilent('uploaded');

            return true;
          }
        }

        if (!n.section && cur.oid != vk.id) {
          return true;
        }

        if ((typeof changed.id == 'undefined') && (typeof changed.gid == 'undefined')) {
          this.section(n.section);
          if (n.section != 'search') {
            delete n.q;
          }
          nav.setLoc(n);
          return false;
        }
      }
    }).bind(this));

    if (cur.videoList['all'].silent) {
      this.loadSilent('all', cur.vSection == 'recoms');
    } else {
      Video.onListInit();
    }

    if (cur.vSection.indexOf('album_') == 0 || cur.vSection == 'uploaded') {
      this.loadSilent(cur.vSection);
    }

    if (cur.editmode) {
      VideoEdit.init();
    }

    cur.deleteAllToggle = Video.deleteAllToggle;

    Video.updateListViewMode();
    if (Video.initSearchControls()) {
      Video.toggleExtendedControls(true);
    }
    Video.updateDataSectionAttr();

    addEvent('video_list', 'mousemove', function(event) {
      var row = null;
      if (row = gpeByClass('video_row', event.target)) {
        Video.updateTitle(row);
      }
    });

    Video.startEvents();
  },

  startEvents: function(cur) {
    addEvent(Video.scrollNode, 'scroll', Video.scrollResize);
  },

  stopEvents: function(cur) {
    removeEvent(Video.scrollNode, 'scroll', Video.scrollResize);
  },

  updateISearchWidth: function() {
    var w = getSize('v_search')[0];
    if (w[0] & w[1])
      iSearch.updateResultsList(w);
  },

  initSorter: function() {
    if (cur.vSection == 'comments') {
      return;
    }

    if (cur.sorter) {
      cur.sorter.destroy();
    }

    var row = geByClass1('video_row');
    var size = getSize(row);

    var xsize = cur.listViewMode ? 1 : 2;
    if (cur.listViewMode) {
      size[1] = 127;
    } else {
      size[1] = 240;
    }

    if (cur.vSection == 'playlists') {
      xsize = 3;
      size = [201, 164];
    }

    if (cur.cansort) {
      setTimeout(function() {
        cur.qsorterNoOperaStyle = true;
        cur.qsorterRowClass = 'video_row clear_fix  ';
        cur.qsorterRowUpClass = 'video_row video_row_up';
        var videoRows = ge('video_rows');
        if (videoRows) {
          cur.sorter = qsorter.init(videoRows, {
            onReorder: Video.onReorder,
            xsize: xsize,
            width: size[0],
            height: size[1],
            noMoveCursor: 1,
            canDrag: function(el) {
              if (cur.vSection == 'tagged') {
                return false;
              }
              return true;
            },
            dragCont: cur.albumsCont,
            dragEls: geByClass('video_album_candrop', cur.albumsCont),
            onDrop: Video.albumDrop,
            onDragOver: Video.albumDragOver,
            onDragOut: Video.albumDragOut
          });
        }

        if (cur.canEditAlbums && cur.videoPlayListCont) {
          cur.qsorterRowClass = 'video_playlist_item';
          cur.qsorterRowUpClass = 'video_playlist_item video_row_up';
          cur.albumsSorter = qsorter.init(cur.videoPlayListCont, {
            onReorder: Video.onAlbumReorder,
            xsize: 3,
            width: 201,
            height: 164,
            noMoveCursor: 1
          });
        }
      }, 10);
    }
  },
  updateListViewMode: function() {
    Video.switchPlaylistMode(null, cur.listViewMode ? 'rows' : 'items', true);
  },
  deleteAllToggle: function(obj) {
    var msg = geByClass1('video_row_deleted_msg', obj);
    if (msg) {
      var backTop = getStyle(msg, 'marginTop');
      setStyle(msg, {marginTop: 10});
      cur.cancelDeleteAllToggle = function(obj) {
        setStyle(msg, {marginTop: backTop});
      }
    }
  },
  privateTooltip: function(obj, text) {
    if (!text) {
      text = getLang('video_is_private_tt');
    }
    showTooltip(obj, {
      black: 1,
      text: '<div style="padding: 2px;">'+text+'</div>',
      center: 0,
      shift: [14, 6, 0]
    });
  },
  controlTooltip: function(el, text) {
    if (hasClass(el, 'video_added_from_list')) {
      text = getLang('video_added_from_list');
    }
    if (hasClass(el, 'video_row_icon_delete') && cur.vSection == 'all') {
      text = getLang('video_delete_from_all_albums');
    }
    showTooltip(el, {
      black: 1,
      text: '<div style="padding: 2px;">'+text+'</div>',
      center: 0,
      shift: [8, 6, 0],
      onShowStart: function(tt) {
        geByClass1('tt_text', tt.container).children[0].innerHTML = text; // :(
      }
    });
    return false;
  },
  privateClick: function(obj, ev) {
    geByClass1('video_row_icon_edit', obj.parentNode.parentNode.parentNode).click();
    return cancelEvent(ev);
  },
  onReorder: function(video, before, after) {
    var video_id = video.id.replace('video_cont', '');
    var before_id = (before && before.id || '').replace('video_cont', '');
    var after_id = (after && after.id || '').replace('video_cont', '');

    var albumId;
    if (cur.vSection == 'all') {
      albumId = -2;
    } else if (cur.vSection == 'uploaded') {
      albumId = -1;
    } else {
      albumId = cur.vSection.split('_')[1];
    }

    ajax.post('al_video.php', {act: 'reorder_videos', album_id: albumId, target_id: cur.oid,  video: video_id, before: before_id, after: after_id, hash: cur.hash});
    var list = cur.videoList[cur.vSection].list;
    var element = false;
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i][0]+'_'+list[i][1] == video_id) {
        element = list[i];
        list.splice(i, 1);
        break;
      }
    }
    if (!element) return;
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i][0]+'_'+list[i][1] == before_id) {
        list.splice(i, 0, element);
        return;
      }
      if (list[i][0]+'_'+list[i][1] == after_id) {
        list.splice(i+1, 0, element);
        return;
      }
    }
  },
  onAlbumReorder: function(album, before, after) {
    var album_id = album.id.replace('video_album_', '');
    var before_id = (before && before.id || '').replace('video_album_', '');
    var after_id = (after && after.id || '').replace('video_album_', '');
    ajax.post('al_video.php', {act: 'reorder_albums', oid: cur.oid, aid: album_id, before: before_id, after: after_id, hash: cur.reorder_hash});

    var list = cur.sections;
    var element = false;
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i][0] == album_id) {
        element = list[i];
        list.splice(i, 1);
        break;
      }
    }
    if (!element) return;

    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i][0] == before_id) {
        list.splice(i, 0, element);
        return;
      }
      if (list[i][0] == after_id) {
        list.splice(i + 1, 0, element);
        return;
      }
    }
  },
  onListInit: function() {
    if (!cur.videoList[cur.vSection] && cur.vSection != 'comments' && cur.vSection != 'recoms' && !Video.isCurrentCategory()) {
      this.generateList(cur.vSection);
      this.changeSummary();
    }
  },
  loadSilent: function(section, extended) {
    if (!section) {
      section = 'all';
    }
    cur.loadSilentRequests = cur.loadSilentRequests || {};
    cur.loadSilentRequests[section] = (cur.loadSilentRequests[section] || 0) + 1;
    if (cur.loadSilentRequests[section] > 3) {
      return true;
    }
    var list = cur.videoList[section];
    if (list && (list.silent || list.videos)) {
      var oid = section.indexOf(Video.CHANNEL_PREFIX) == 0 ? section.substr(Video.CHANNEL_PREFIX.length) : cur.oid;
      ajax.post('al_video.php', {act: 'load_videos_silent', oid: oid, section: section, offset: list.silent ? 0 : list.videos.length, extended: extended ? 1 : 0 }, {
        onDone: function(list, playlistsOverviewHtml, playlistsCount, playlistsData) {
          var list = eval('('+list+')');
          for (var sec in list) {
            if (!cur.videoList[sec]) {
              cur.videoList[sec] = {list: list[sec].list};

              if (extended) {
                cur.videoList[sec].silent = list[sec].silent;
              }

            } else {
              if (cur.videoList[sec].silent) {
                cur.videoList[sec].list = list[sec].list;
              } else {
                Array.prototype.push.apply(cur.videoList[sec].list, list[sec].list);
              }
            }
            if (!extended) {
              cur.videoList[sec].silent = false;
            }
          }

          if (cur.onSilentLoad && cur.onSilentLoad[section]) {
            var onLoad = cur.onSilentLoad[section];
            delete cur.onSilentLoad[section];
            onLoad();
          }
          Video.onListInit();

          Video.scrollResize();
          if (section == 'all') {
            Video.indexAll();
          }

          if (extended && !Video.isCurrentChannel()) {
            each('all uploaded'.split(' '), function(i, s) {
              var list = cur.videoList[s] ? cur.videoList[s].list : [];
              Video.updateOwnerSummaryTabs(s, list.length);
            });

            var summaryEl = ge('owner_albums_placeholder');
            if (playlistsCount && playlistsCount > 2) {
              var playlistsSummaryEl = se(trim(playlistsOverviewHtml));
              domPN(summaryEl).replaceChild(playlistsSummaryEl, summaryEl);
              show(playlistsSummaryEl);
            }

            cur.ownerPlaylistsHtml = playlistsSummaryEl ? playlistsSummaryEl.innerHTML : '';

            cur.sections = playlistsData;

            cur.albumsSummaryEl = geByClass1('video_playlists_overview');

            Video.indexAll();

            cur.playlistsRendered = false;
            Video.section(cur.vSection, true);
            Video.updateAlbumSummary();
          }
        },
        onFail: function(text) {
          Video.loadSilent(section);
        }, local: 1
      });
    }
  },
  show: function(e, videoId, opts, obj) {
    if (cur.isCurrentChooseVideoBox) {
      var lastEvent = window.event;
      var videoIds = videoId.split('_');
      ajax.post('al_video.php', { act: 'a_video_photo_sizes', oid: videoIds[0], vid: videoIds[1], type: cur.isCurrentChooseVideoBox }, {
        onDone: function() {
          window.event = lastEvent || window.event;
          switch(cur.isCurrentChooseVideoBox) {
            case 'video_add':
              cur.chooseVideoAdd(videoId, arguments[0]);
              break;
            case 'wiki_editor':
              editorChooseVideo(arguments[0], arguments[1], arguments[2], 'video'+videoId, videoId);
              break;
            case 'video_choose':
              cur.chooseMedia('video', videoId, arguments[0]);
              break;
          }
        }
      });

      cancelEvent(e);
      return false;
    }

    if (obj && hasClass(obj, 'video_row_deleted')) {
      return false;
    }
    if (!vk.id && obj && hasClass(obj, 'video_row_not_public')) {
      showDoneBox(getLang('video_please_sign_in'));
      return false;
    }
    var options = extend({root: 1, autoplay: 1}, opts || {});
    var listId = opts ? opts.listId : '';
    if (!listId) {
      if (cur.oid < 0) {
        listId = 'club' + (-cur.oid);
      } else if (cur.vSection == 'tagged') {
        listId = 'tag'+cur.oid;
      } else if (cur.pvVideoTagsShown && cur.pvShown) {
        listId = 'tag'+cur.pvVideoTagsShown;
      } else {
        listId = '';
      }
      if (cur.vSection && cur.vSection.substr(0, 6) == 'album_') {
        listId += (listId ? ',' : '') + 'album' + cur.oid + '_' + cur.vSection.substr(6);
      } else if (cur.vSection == 'uploaded') {
        listId += (listId ? ',' : '') + 'album' + cur.oid + '_-1';
      } else if (cur.vSection == 'all') {
        listId += (listId ? ',' : '') + 'album' + cur.oid;
      }
    }

    if (cur._videoSearchDataIndex && cur.searchData) {
      var searchData = cur.searchData[cur._videoSearchDataIndex];
      if (searchData) {
        searchData = searchData.list;
      }
      var nextVideos = [], found = false;
      each(searchData || [], function(i, v) {
        var vid = v[0] + '_' + v[1];
        if (found) {
          nextVideos.push(vid);
          if (nextVideos.length >= 4) return false;
        } else if (vid == videoId) {
          found = true;
        }
      });
      options.svids = nextVideos.join(',');
    }

    var isInAlbum = Video.isCurrentSectionAlbum();

    if (Video.isCurrentChannel() || Video.isCurrentCategory() || isInAlbum || Video.isInVideosList()) {
      options = options || {};
      options.module = isInAlbum || Video.isInVideosList() ? options.module : Videocat.VIDEO_MODULE;

      var sectionId = nav.objLoc.section || '';
      if (Video.isCurrentChannel()) {
        options.playlistId = sectionId.substr(Video.CHANNEL_PREFIX.length);
      } else if (Video.isCurrentCategory()) {
        options.playlistId = sectionId.substr(Video.CATEGORY_PREFIX.length);
      } else if (isInAlbum) {
        options.playlistId = cur.vSection;
      } else if (Video.isInVideosList()) {
        var videoList = cur.videoList[cur.vSection];
        if (videoList && videoList.list.length > 4) {
          options.playlistId = cur.oid;
        }
      }

      if (!opts.hidden) {
        var showNext = Videocat.initFullPlaylist(options.playlistId, videoId);
        if (showNext) {
          options.addParams = extend(options.addParams || {}, { show_next: intval(showNext) });
        }
        if (options.playlistId) {
          options.addParams = extend(options.addParams || {}, { playlist_id: options.playlistId });
        }
      }
    } else if (cur.module == 'video' && cur.vSection == 'search') {
      options.module = Video.getSearchModule(videoId);
    }

    return showVideo(videoId, listId, options, e);
  },
  isCurrentSectionAlbum: function() {
    return cur.vSection && cur.vSection.indexOf('album_') == 0;
  },
  isInVideosList: function() {
    return indexOf(['all', 'uploaded', 'tagged'], cur.vSection) > -1;
  },
  getSearchModule: function(videoId) {
    var isLocal = false;
    if (cur.videoList && cur.videoList.all && cur.videoList.all.list) {
      each(cur.videoList.all.list, function(i, v) {
        if (v[0]+'_'+v[1] == videoId) {
          isLocal = true;
          return false;
        }
      });
    }
    return 'search' + (isLocal ? '_local' : '');
  },
  indexAll: function(callback, onlyAlbums) {
    var all = cur.videoList['all'].list;
    var indexed = 0;
    var hub = new callHub(callback, onlyAlbums ? 1 : 2);
    if (!onlyAlbums) {
      cur.vIndex = new vkIndexer(all, function(obj) {
        return obj[3];
      }, function() {
        if (callback) {
          hub.done();
        }
      });
    }
    var albums = [];
    for(var i in cur.sections) {
      if (cur.sections[i][0] > 0) {
        albums.push(cur.sections[i]);
      }
    }
    cur.aIndex = new vkIndexer(albums, function(obj) {
      return obj[1];
    }, function() {
      if (callback) {
        hub.done();
      }
    });
  },
  addToList: function(list, row, silent) {
    if (!cur.videoList || !row) return;
    if (!isArray(cur.videoList)) return;
    var restore = cur.restoreRaw['d_'+row[0]+'_'+row[1]];
    if (restore) {
      for (var i in restore) {
        cur.videoList[restore[i].section].splice(restore[i].pos, 0, restore[i].val)
      }
      delete cur.restoreRaw['d_'+row[0]+'_'+row[1]];
    } else {
      cur.videoList[list].unshift(row);
    }
    cur.vIndex.add(row);
    if (!silent && cur.vSection != 'search') {
      Video.clearOutput();
      Video.showMore();
    }
  },
  onTagConfirm: function(mvData) {
    if (cur.videoList['tagged']) {
      var len = cur.videoList['tagged'].length;
      while(len--) {
        var item = cur.videoList['tagged'][len];
        if (item[0]+'_'+item[1] == mvData && item[8] & 2) {
          item[8] -= 2;
        }
      }
    }
    var videoRow = ge('video_row'+mvData);
    if (videoRow) {
      hide(geByClass1('video_tag_label', videoRow));
    }
    delete ajaxCache['/al_video.php#act=show&list=&module=video&video='+mvData];
    delete ajaxCache['/al_video.php#act=show&autoplay=1&list=&module=video&video='+mvData];
  },
  removeFromLists: function(mvData, silent) {
    cur.restoreRaw['d_'+mvData] = [];
    for (var i in cur.videoList) {
      var len = cur.videoList[i].length;
      while(len--) {
        var item = cur.videoList[i][len];
        if (item[0]+'_'+item[1] == mvData) {
          var val = cur.videoList[i].splice(len, 1)[0];
          cur.restoreRaw['d_'+mvData].push({
            section: i,
            pos: len,
            val: val
          });
          cur.vIndex.remove(item);
        }
      }
    }
    if (!silent) {
      var videoRow = ge('video_row'+mvData);
      if (videoRow) {
        videoRow.parentNode.removeChild(videoRow);
      }
    }
  },
  onDeleteFromPlaylist: function(event, vid, oid) {
    var video = false;
    var list = cur.videoList[cur.vSection].list, spliceIndex = -1;
    each(list, function(i, v) {
      if (v[0] == oid && v[1] == vid) {
        video = v;
        return false;
      }
    });

    if (cur.vSection == 'all') {
      if (video[17]/*hash*/) {
        ajax.post('/al_video.php', { act: 'a_delete_from_all_albums', vid: vid, oid: oid, target_id: cur.oid, hash: video[17] }, {
          onDone: function() {
            Video.updateVideo(cur.oid, video, [], true);
            Video.initSorter();
          }
        });
      }
    } else {
      var hash, currPlaylistId = (cur.vSection || '_').split('_')[1];
      each(cur.sections, function(i, v) {
        if (v[0] == currPlaylistId) {
          hash = v[5];
          return false;
        }
      });

      if (hash) {
        ajax.post('/al_video.php', { act: 'a_add_to_playlist', vid: vid, oid: oid, gid: cur.oid < 0 ? -cur.oid : 0, hash: hash, playlist_id: currPlaylistId, add: 0 }, {
          onDone: function(playlists) {
            var playlists = eval('('+playlists+')');
            var removed = [currPlaylistId];
            playlists.push(currPlaylistId);
            Video.updateVideo(cur.oid, video, playlists, false, [], removed);
            Video.initSorter();
          }
        });
      }
    }

    window.tooltips && tooltips.hideAll();

    cancelEvent(event);
  },
  onDeleteClick: function(vid, oid, hash, obj, ev) {
    if (!cur.restoreRaw) cur.restoreRaw = {};
    cur.restoreRaw[oid + '_' + vid] = vidCont.innerHTML;
    addClass(vidCont, 'video_row_loading');
    videoview.deleteVideo(vid, oid, hash, false, 'list', this);
    return cancelEvent(ev);
  },
  searchAlbums: function(str) {
    if (str) {
      var a = cur.aIndex.search(str);
      a = a.sort(function(i,j) {return i._order - j._order});
      var summary = langNumeric(a.length, cur.lang['video_albums_found_summary'])
    } else if (cur.aIndex && cur.aIndex.list) {
      var a = clone(cur.aIndex.list);
      for(var i in cur.sections) {
        if (cur.sections[i][0] == -1) {
          a.unshift([-1, cur.sections[i][1]]);
        }
      }
      var summary = langNumeric(a.length, cur.lang['video_albums_summary'])
    }

    var hasResults = str && a.length;

    toggle('video_albums_summary', hasResults);
    toggle('video_albums_search_wrap', hasResults);
    hide('video_albums_more');
    hide('video_albums_show_more');

    if (hasResults) {
      ge('video_albums_summary').innerHTML = summary;
      var html = more_html = '';
      var num = 0;
      for (var i in a) {
        var alb = a[i][0];
        for(var i in cur.sections) {
          if (cur.sections[i][0] == alb) {
            var v = cur.sections[i];
          }
        }
        var title = v[1];
        if (cur.selection && str) {
          title = title.replace(cur.selection.re, cur.selection.val);
        }
        if (num >= 6) {
          more_html += cur.albumsTpl(v, title);
        } else {
          html += cur.albumsTpl(v, title);
        }
        num += 1;
      }
      if (cur.albumsSearchWrap) {
        cur.albumsSearchWrap.innerHTML = html;
      }
      if (cur.albumsContMore) {
        cur.albumsContMore.innerHTML = more_html;
      }
      if (ge('video_albums_show_more')) {
        ge('video_albums_show_more').innerHTML = langNumeric(a.length, cur.lang['video_show_all_albums']);
        toggle(ge('video_albums_show_more'), num > 6);
      }
    } else {
      addClass(ge('video_content'), 'video_albums_hidden');
    }

    cur._albumsSearchRes = a;

    Video.startTimeUpdate();
  },
  updateVideo: function(albumOwnerId, video, currentAlbums, deleteTotal, addedAlbums, deletedAlbums) {
    var owner_id = video[0];
    var video_id = video[1];
    var forceDelete = deleteTotal && (!currentAlbums || currentAlbums.length == 0);

    if (!owner_id || cur.section != 'video' || cur.oid != albumOwnerId) return;

    currentAlbums = currentAlbums || [];

    var remainCount = 0;
    var remainAlbums = {};
    var wasAlbums = {};
    each(currentAlbums, function(index, el) {
      remainAlbums[el] = true;
      wasAlbums[el] = true;
    });
    each(addedAlbums || [], function(index, el) {
      remainAlbums[el] = true;
    });
    each(deletedAlbums || [], function(index, el) {
      remainAlbums[el] = false;
    });
    each(remainAlbums, function(index, el) {
      if (el) {
        remainCount++;
      }
    });

    var item = ge('video_cont' + owner_id + '_' + video_id);
    if (item && isAncestor(item, 'video_search_rows')) {
      item = null;
    }

    for (var sec in cur.videoList) {
      var list = cur.videoList[sec];
      var curentSection = sec == cur.vSection;
      var secId = 0;
      if (sec == 'uploaded') {
        secId = -1;
      } else if (sec == 'all') {
        secId = -2;
      } else if (sec.substr(0, 6) == 'album_') {
        secId = sec.substr(6);
      }
      if (list && list.list) {
        var videoList = list.list;

        var wasInList = forceDelete || sec != 'all' && wasAlbums[secId] || sec == 'all' && currentAlbums.length > 0;
        var removeFromList = deleteTotal || sec != 'all' && !remainAlbums[secId] || sec == 'all' && !remainCount;
        var addToList = !deleteTotal && (sec == 'all' && !currentAlbums.length && remainCount > 0 || sec != 'all' && remainAlbums[secId]);

        if (wasInList && removeFromList) {
          var found = false;
          for (var i in videoList) {
            var v = videoList[i];
            if (v[0] == owner_id && v[1] == video_id) {
              videoList.splice(i, 1);
              found = true;
              break;
            }
          }
          Video.updateAlbum(sec, false, false, true, forceDelete && sec != 'all' && !curentSection && !found ? 0 : -1);
          if (item && cur.vSection == sec) {
            re(item);
            cur.shown--;
          }
          if (sec == 'all') {
            Video.indexAll();
          }
        } else if (!wasInList && addToList) {
          videoList.unshift(video);
          Video.updateAlbum(sec, false, false, true, 1);
          if (!item && cur.vSection == sec) {
            var newItem = Video.drawVideo(video, '?section='+cur.vSection);
            var newItemEl = se(newItem);
            cur.vRows.insertBefore(newItemEl, cur.vRows.firstChild);
            cur.shown++;
          }
          if (sec == 'all') {
            Video.indexAll();
          }
        } else if (video.length > 10) {
          //full video object
          for (var i in videoList) {
            var v = videoList[i];
            if (v[0] == owner_id && v[1] == video_id) {
              var oldDate = videoList[i][15];
              videoList[i] = extend(videoList[i], video);
              videoList[i][15] = oldDate;
              break;
            }
          }

          if (item && cur.vSection == sec) {
            var newItem = Video.drawVideo(video, '?section='+cur.vSection);
            var newItemEl = se(newItem);
            cur.vRows.replaceChild(newItemEl, item);
          }
        }
      }
    }

    Video.startTimeUpdate();
    Video.updateTimes(true, true); // force album time updates

    var list = cur.videoList[cur.vSection];

    if (list) {
      var anyVideo = !!list.count;
      toggle(geByClass1('video_playlist_button'), anyVideo);
      toggle(ge('video_summary_tabs'), anyVideo && (cur.vSection.indexOf('album') == -1));
      toggle(ge('not_found'), !anyVideo);
    }

    if (cur.vSection != 'search' && (!list || !list.count)) {
      if (window.mvcur) {
        mvcur.noHistory = true;
        mvcur.mvPrevLoc = false;
      }
      nav.change({section: 'all'}, false, {back: true});
    }

    Video.indexAll(null, true);
  },
  updateOwnerSummaryTabs: function(section, count) {
    var sumTab = ge('video_sum_tab_' + section);
    var sumCountEl = geByClass1('video_summary_count', sumTab);
    if (sumCountEl) {
      val(sumCountEl, count);
      toggle(sumTab, !!count);
    }
  },
  updateAlbum: function(albumId, wasDeleted, newAlbum, recalcCover, countDiff) {
    if (typeof albumId == 'string' && albumId.substr(0, 6) == 'album_') {
      albumId = albumId.substr(6);
    }
    if (albumId == -1) {
      albumId = 'uploaded';
    }
    if (albumId == 0) {
      albumId = 'added';
    }
    if (albumId == 'all' || albumId == 'added' || albumId == 'uploaded' || albumId == 'tagged') {
      if (countDiff && cur.videoList[albumId]) {
        if (typeof cur.videoList[albumId].count == 'undefined') {
          cur.videoList[albumId].count = cur.videoList[albumId].list.length;
        } else {
          cur.videoList[albumId].count += countDiff;
        }
        Video.updateOwnerSummaryTabs(albumId, cur.videoList[albumId].count);
        var sumTab = ge('video_sum_tab_' + albumId);
        if (cur.videoList[albumId].count > 0) {
          show(sumTab);
        } else {
          hide(sumTab);
        }
      }
    } else {
      var found = -1;
      var album = false;
      for (var index in cur.sections) {
        if (cur.sections[index][0] == albumId) {
          found = index;
          album = cur.sections[index];
          break;
        }
      }
      if (found < 0) {
        if (!newAlbum) return;
        found = 0;
        cur.sections.unshift(newAlbum);
        cur.videoList['album_' + albumId] = {list: [], count: 0};
      }
      var item = ge('video_album_' + albumId);
      var activeTab = cur.vSection == 'album_' + albumId;
      if (wasDeleted) {
        cur.sections.splice(found, 1);
        delete cur.videoList['album_' + albumId];
        if (item) {
          re(item);
        }
        if (activeTab) {
          nav.change({section: 'playlists'});
        }
      } else {
        var newItem = false;
        if (newAlbum) {
          //title
          if (album[1] != newAlbum[1]) {
            if (activeTab) {
              var tab = ge('video_tab_hidden');
              var tabTitle = geByClass1('tab_word', tab);
              if (tabTitle) {
                val(tabTitle, '<nobr>' + newAlbum[1] + '</nobr>');
              }
            }
          }
          cur.sections[found] = newAlbum;
          newItem = cur.albumsTpl(cur.sections[found]);
        } else if (countDiff) {
          var albumData = cur.videoList['album_' + albumId];
          if (albumData) {
            if (typeof albumData.count == 'undefined') {
              albumData.count = albumData.list.length;
            } else {
              albumData.count += countDiff;
            }
          }
          cur.sections[found][3] += countDiff;
          newItem = cur.albumsTpl(cur.sections[found]);
        }
        if (recalcCover) {
          var sectionList = cur.videoList['album_' + albumId];
          var cover = '';
          if (sectionList) {
            var videosList = sectionList.list;
            if (videosList && videosList.length > 0) {
              var video = videosList[0];
              cover = video[2];
            }
          }
          cur.sections[found][2] = cover;
          newItem = cur.albumsTpl(cur.sections[found]);
        }
        if (newItem) {
          var newItemDiv = se(newItem);

          if (item) {
            item.parentNode.replaceChild(newItemDiv, item);
          } else if (cur.playlistsRendered) {
            cur.videoPlayListCont.insertBefore(newItemDiv, cur.videoPlayListCont.firstChild);
          }
        }
      }
      if (activeTab) {
        Video.changeSummary();
      }
    }

    toggle('video_no_albums_wrap', !cur.sections.length);
    Video.updateAlbumSummary();
  },
  updateAlbumSummary: function() {
    var count = (cur.sections || []).length;
    var summary;
    if (!count) {
      summary = getLang('video_no_albums');
    } else {
      summary = getLang('video_albums_count', count);
    }
    var item = ge('video_playlists_title');
    if (item) {
      val(item, summary);
    }
  },
  updateAlbums: function(newList) {
    for(var i in cur.sections) {
      if (cur.sections[i][0] > 0) {
        delete cur.sections[i];
      }
    }
    for(var i in newList) {
      cur.sections.push(newList[i]);
    }
    var num = 0;
    for(var i in cur.sections) num += 1;
    if (num) {
      removeClass(ge('video_content'), 'video_no_albums');
      hide('video_tabs_links');
      removeClass(ge('video_content'), 'video_albums_hidden');
    } else {
      addClass(ge('video_content'), 'video_no_albums');
      show('video_tabs_links');
    }
    Video.indexAll(function() {
      Video.searchAlbums(cur.vSection == 'search' ? cur.vStr : false);
      if (cur.canEditAlbums && cur.albumsSorter && !(trim(cur.vStr) && cur.vStr != '""')) {
        //qsorter.update(cur.albumsCont);
      }
      if (cur.cansort) {
        qsorter.update(cur.vRows, {dragEls: geByClass('video_album_candrop', cur.albumsCont)});
      }
    }, true);
  },
  searchVideos: function(str, force) {
    var hd = cur.vHD ? cur.vHD : 0;
    cur.searchData = cur.searchData || {};
    cur.searchData[str + hd.toString() + (cur.vOrder || '').toString() + cur.vDateAdded] = {
      count: 0,
      list: [],
      offset: 0
    };
    cur.loading = false;

    if (str && cur.vIndex) {
      if (cur.vSection != 'search') {
        cur.beforeSearch = cur.vSection;
        cur.vStr = '';
        /*if (browser.mobile) {
          cur.vSection = 'search';
        } else {*/
          nav.change({section: 'search'});
        /*}*/
      }
      show('video_search_options');
      addClass(ge('video_reset_search'), 'video_reset_search_shown');
      Video.showOptions();
      var v = cur.vIndex.search(str);
      cur.vStr = str;
      var sec = cur.vSection+'_'+str;
      if (cur.vHD) {
        sec += '_opt_hd'+cur.vHD;
      }
      cur.videoList[sec] = {list: v};
      if (!str.replace(/\|/g, '').length) {
        cur.selection = false;
      } else {
        cur.selection = {
          re: new RegExp('('+str.replace(/\|/g, '').replace(cur.vIndex.delimiter, '|').replace(/^\||\|$/g, '').replace(/([\+\*\)\(])/g, '\\$1')+')', 'gi'),
          val: '<em>$1</em>'
        };
      }
      Video.searchAlbums(str);
      var len = v.length;
      if (len < 10) {
        show(cur.more);
        addClass(cur.more, 'load_more');
        if (cur.searchTimout) {
          clearTimeout(cur.searchTimout);
        }
        cur.loading = true;
        cur.searchTimout = setTimeout((function() {
          this.loadFromSearch(str);
        }).bind(this), (force ? 0 : 500));
        addClass(cur.videoSearch, 'v_loading');
      }
      if (len) {
        this.clearOutput();
        this.showMore();
        if (cur.cansort) {
          //qsorter.update(cur.vRows, {dragEls: geByClass('video_album_candrop', cur.albumsCont)});
        }
        this.changeSummary();
      } else {
        cur.clearOnSearch = true;
      }
    } else {
      Video.searchAlbums(str);
      if (cur.vSection == 'search') {
        hide('video_search_options');
        if (cur.beforeSearch) {
          nav.change({section: cur.beforeSearch});
        }
        removeClass(ge('video_reset_search'), 'video_reset_search_shown');
        Video.hideOptions();
        removeClass(cur.videoSearch, 'v_loading');
        cur.vStr = '';
        cur.selection = false;
        cur.vSearch.focus();
        /*this.clearOutput();
        this.showMore();
        this.changeSummary();
        cur.vSearch.setValue('');
        cur.vSearch.focus();*/
      }
      if (cur.canEditAlbums && cur.albumsSorter) {
        //qsorter.update(cur.albumsCont);
      }
      Video.clearSearch();
    }
    this.changeUrl();
  },
  toggleFilter: function (obj, target) {
    if (hasClass(obj, 'filter_shut') || !isVisible(target)) {
     addClass(obj, 'filter_open');
     removeClass(obj, 'filter_shut');
     var extraH = slideDown(target, 200).to.height;
    } else {
     slideUp(target, 200, function(){
       addClass(obj, 'filter_shut');
       removeClass(obj, 'filter_open');
     });
    }
  },
  toggleHD: function(hd, noSearch) {
    if (noSearch && hd) {
      checkbox(ge('video_hd_option'));
    }
    cur.vHD = isChecked('video_hd_option') ? 1 : 0;
    (cur.vHD ? show : hide)('video_hd2_option');
    if (cur.vHD) {
      show('video_hd2_option');
      cur.vHD += isChecked('video_hd2_option') ? 1 : 0;
    } else {
      hide('video_hd2_option');
    }
    if (!noSearch) {
      this.searchVideos(cur.vStr);
      this.doChangeUrl();
    }
  },
  toggleExt: function(type) {
    cur.vExt = type;
    this.searchVideos(cur.vStr);
  },
  toggleAdult: function() {
    var updateAdult = function(val) {
      cur.adult = val;
      Video.searchVideos(cur.vStr);
    }
    var cancelAgreed = function() {
      if (cur.isAdult || getCookie('adult_agreed')) {
        return true;
      }
      addClass(ge('video_adult_option'), 'on');
    }
    var checkAgreed = function(val) {
      if (!val || cur.isAdult || getCookie('adult_agreed')) {
        return true;
      }
      var box = showFastBox({title: getLang('video_adult_box_title'), onHide: cancelAgreed}, getLang('video_adult_box_text'), getLang('global_continue'), function() {
      cur.isAdult = true;
      setCookie('adult_agreed', 1);
      updateAdult(1);
      box.hide();
    }, getLang('global_cancel'), function() {
      cancelAgreed();
      box.hide();
    });
      return false;
    }
    var new_val = !isChecked('video_adult_option') ? 1 : 0
    if (checkAgreed(new_val)) {
      updateAdult(new_val);
    }
  },
  setQuery: function(str) {
    cur.onIndexFinish = function() {
      cur.onIndexFinish = false;
      vk.loaded = true;
      Video.searchVideos(str, true);
      cur.vSearch.setValue(str);
    }
  },
  doChangeUrl: function() {
    if (trim(cur.vStr) && cur.vStr != '""') {
      nav.objLoc['q'] = cur.vStr;
    } else {
      delete nav.objLoc['q'];
    }
    if (parseInt(cur.vLength)) {
      nav.objLoc['len'] = cur.vLength;
    } else {
      delete nav.objLoc['len'];
    }
    if (cur.vHD) {
      nav.objLoc['hd'] = cur.vHD;
    } else {
      delete nav.objLoc['hd'];
    }
    if (cur.vDateAdded) {
      nav.objLoc['added'] = cur.vDateAdded;
    } else {
      delete nav.objLoc['added'];
    }
    if (cur.vOrder != 2) {
      nav.objLoc['order'] = cur.vOrder;
    } else {
      delete nav.objLoc['order'];
    }
    nav.setLoc(nav.objLoc);
  },
  changeUrl: function() {
    if (cur.timeouts && cur.timeouts.changeUrl) {
      clearTimeout(cur.timeouts.changeUrl);
    }
    cur.timeouts.changeUrl = setTimeout(Video.doChangeUrl, 2000);
  },
  changeSummary: function() {
    var str, searchStr, oldSearhSummary = false, htitle;
    var sec = cur.vSection;
    var summaryEl = cur.summary;

    hide(cur.videoLocalSearchSummary);

    if (sec == 'comments') {
      if (cur.commentsCount) {
        summaryEl.innerHTML = langNumeric(cur.commentsCount, cur.lang['video_X_comms'], true);
      } else {
        summaryEl.innerHTML = getLang('video_no_comments');
      }

      hide(cur.searchSummary);
      htitle = cur.htitle_comments + (cur.commentsCount ? ' | ' + getLang('video_X_comms', cur.commentsCount) : '');
      document.title = replaceEntities(stripHTML(htitle));
      hide('video_comments_link');

      return true;
    }
    if (cur.vSection == 'search' && cur.vStr) {
      var hd = cur.vHD ? cur.vHD : 0;
      var searchData = cur.searchData[cur.vStr + hd.toString() + cur.vOrder.toString() + cur.vDateAdded];
      var len = (searchData) ? searchData.count : 0;
      if (len/* || !cur.loading*/) {
        searchStr = langNumeric(len, cur.lang['video_num_found_files'], true);
      }
      if (!len && cur.loading) {
        oldSearhSummary = true;
      }
      htitle = getLang('video_title_search').replace('{q}', cur.vStr) + (len ? ' | ' + getLang('video_title_search_X_found', len) : '');
    }

    var sec = cur.vSection, len = 0;
    if (cur.vSection == 'search') {
      if (cur.vStr) {
        sec += '_'+cur.vStr;
      } else {
        sec = 'all';
      }
      if (cur.vHD) {
        sec += '_opt_hd'+cur.vHD;
      }

      summaryEl.innerHTML = '';
      summaryEl = cur.videoLocalSearchSummary;
      show(summaryEl);
    }
    if (cur.videoList[sec]) {
      var data = cur.videoList[sec];
      if (data && data.list) {
        len = data.total || data.count || data.list.length;
      }
    }

    if (cur.isCatUser && (!cur.vSection || cur.vSection == 'recoms')) {
      htitle = getLang('video_videocatalogue_title');
    }

    if (cur.vSection == 'tagged') {
      htitle = cur.htitle_videos + (len ? ' | ' + langNumeric(len, cur.lang['video_title_X_videos_tagged'], true) : '').replace('{user}', cur.htitle_tagged_user);
    }
    if (!htitle) {
      htitle = cur.htitle_videos + (len ? ' | ' + langNumeric(len, cur.lang['video_title_X_videos'], true) : '');
    }
    if (len) {
      str = len + ' ' + langNumeric(len, cur.lang['videofile_num'], true);
    }

    var searchSummary = false;

    if (cur.vSection.indexOf(Video.CATEGORY_PREFIX) === 0) {
      str = str || '';
    } else if (cur.vSection.indexOf(Video.CHANNEL_PREFIX) === 0) {
      str = str || '';
    } else if (str) {
      if (searchStr) {
        cur.searchSummary.innerHTML = '<div class="summary">' + searchStr + '</div>';
        show(cur.searchSummary);
      } else if (!oldSearhSummary) {
        hide(cur.searchSummary);
      }
      hide(cur.notFound);
    } else {
      if (searchStr) {
        str = searchStr;
        searchSummary = true;
      } else {
        str = cur.lang['video_novideo'];
        show(cur.notFound);
        if (cur.vSection.indexOf('album_') === 0) {
          cur.notFound.className = 'video_info_msg video_v_album';
        } else if (cur.vSection != 'search') {
          cur.notFound.className = 'video_info_msg';
        } else {
          cur.notFound.className = 'video_info_msg video_v_search';
          searchSummary = true;
        }
        if (cur.vSection.indexOf('album_') === 0) {
          addClass(cur.notFound, 'video_v_album');
        }
        hide(cur.more);
      }
      hide(cur.searchSummary);
    }
    if (!searchSummary) {
      if (cur.vSection.indexOf('album_') === 0) {
        var albumId = cur.vSection.split('_')[1];
        if (vk.id == cur.oid || (cur.oid < 0 && cur.isGroupAdmin)) {
          str += '<span class="divider">|</span>' +
                 '<span><a onclick="Video.editAlbum(\'album_' + albumId + '\', event);">' + getLang('video_edit_album') + '</a></span>' +
                 '<span class="divider">|</span>' +
                 '<span><a onclick="Video.deleteAlbum(\'album_' + albumId + '\');">' + getLang('video_delete_album') + '</a></span>';
        }
      } else if (cur.vSection == 'tagged' && cur.tagsCount > 10) {
        str += '<span class="divider">|</span><span><a onclick="Video.removeAllTags();">' + getLang('video_remove_all_tags') + '</a></span>';
      }
    }
    summaryEl.innerHTML = str;
    document.title = replaceEntities(stripHTML(htitle));

    Video.updateViewModeSwitcher();
  },
  loadFromSearch: function(str) {
    var hd = cur.vHD ? cur.vHD : 0;
    var index = str+hd.toString()+cur.vOrder.toString()+cur.vDateAdded;

    if (!cur.searchData[index]) {
      cur.searchData[index] = {
        count: 0,
        list: [],
        offset: 0
      };
    }
    var searchData = cur.searchData[index];
    ajax.post('al_video.php', {
      act: 'search_video',
      q: str,
      offset: searchData.offset,
      hd: hd,
      date: cur.vDateAdded,
      length: cur.vLength || 0,
      show_adult: cur.adult ? 1 : 0,
      ext: cur.vExt,
      order: cur.vOrder
    }, {
      onDone: (function(count, data) {
        removeClass(cur.videoSearch, 'v_loading');
        removeClass(cur.more, 'load_more');
        data = eval('('+data+')');
        data = data.list || [];
        cur._videoSearchDataIndex = index;

        if (data.length > 0) {
          var duplicateOffset = 0;
          var firstVideo = data[0];
          for (var i = searchData.list.length - 1; i >= 0; i--) {
            var offset = searchData.list.length - i;
            if (offset > 20) break;
            var inListVideo = searchData.list[i];
            if (firstVideo[0] == inListVideo[0] && firstVideo[1] == inListVideo[1]) {
              duplicateOffset = offset;
              break;
            }
          }
          Array.prototype.push.apply(searchData.list, data.slice(duplicateOffset));
        }

        if (str != cur.vStr) {
          return false;
        }
        if (cur.clearOnSearch) {
          this.clearOutput();
          cur.clearOnSearch = false;
        }
        if (data.length === 0) {
          //cur.videoCount[sec][1] = cur.videoList[sec].length;
          searchData.ended = true;
          if (!searchData.count && !cur.shown) {
            show(cur.notFound);
            hide(cur.more);
            cur.notFound.className = 'video_info_msg video_v_search';
            ge('search_ph').innerHTML = cur.vStr.replace(/([<>&#]*)/g, '');
          }
        } else {
          searchData.count = parseInt(count);
          Video.showMore();
          cur.loading = false;
          if (cur.canEditAlbums && cur.albumsSorter && !(trim(str) && str != '""')) {
            //qsorter.update(cur.albumsCont);
          }
          if (cur.cansort) {
            //qsorter.update(cur.vRows, {dragEls: geByClass('video_album_candrop', cur.albumsCont)});
            Video.initSorter();
          }
        }
        searchData.offset += data.length;
        this.changeSummary();
      }).bind(this),
      cache: 1
    });
  },
  clearOutput: function() {
    cur.vRows.innerHTML = '';
    cur.vSearchRows.innerHTML = '';
    cur.albumsSearchWrap.innerHTML = '';
    hide(cur.notFound);
    hide(cur.searchSummary);
    cur.shown = 0;
    if (cur.editmode) {
      VideoEdit.onChanging();
    }
  },
  scrollResize: function() {
    if (browser.mobile) return;
    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY();
    if (!cur.pageEnd) {
      return;
    }
    if (st + ch > cur.pageEnd.offsetTop && !geByClass1('qs_drag_started')) {
      setTimeout(function() {
        Video.showMore();
      }, 0);
    }

    cur.initialVideoContentTabTop = cur.initialVideoContentTabTop || getXY(cur.videoContentTab)[1];

    var channelHeaderEl = geByClass1('video_channel_header');
    if (channelHeaderEl) {
      var needFixed = st > cur.initialVideoContentTabTop;
      toggleClass(channelHeaderEl, 'video_channel_header_fixed', needFixed);
      setStyle(cur.videoContentTab, { marginTop: needFixed ? (getSize(cur.channelHeaderEl)[1] + 'px') : 0 });
    } else {
      setStyle(cur.videoContentTab, { marginTop: 0 });
    }

    Videoview && Videoview.updatePlaylistBoxPosition();
  },
  showMore: function() {
    var sec = cur.vSection;
    if (sec == 'search') {
      if (cur.vStr) {
        sec += '_'+cur.vStr;
      } else {
        sec = 'all';
      }
      if (cur.vHD) {
        sec += '_opt_hd'+cur.vHD;
      }
    }
    if (sec == 'comments') {
      if (cur.shown < cur[sec + 'Count']) {
        this.loadSection(sec, cur.shown);
        addClass(cur.more, 'load_more');
        show(cur.more);
        return;
      }
    }

    var sectionObject = cur.videoList[sec] || {};
    var list = sectionObject.list;
    if (!list) {
      return;
    }
    var usersLen = list.length;

    //var listLen = usersLen + searchCount;
    var limit = cur.shown + cur.perPage;
    if (usersLen < limit) {
      limit = usersLen;
    }
    if (cur.vSection == 'tagged' || cur.vSection == 'uploaded') {
      var linkAddr = '?'+cur.vSection+'='+cur.oid;
    } else {
      var linkAddr = '';
    }

    var added = cur.shown < limit;

    var linkAddr = '?section='+cur.vSection;
    for (var i = cur.shown; i < limit; i++) {
      list[i][3] = list[i][3].replace(/&amp;/g, '&');
      cur.vRows.appendChild(se(this.drawVideo(list[i], linkAddr)));
      cur.shown++;
    }
    if (cur.cansort && !Video.isCurrentChannel()) {
      Video.initSorter();
    }

    if (cur.isChannel) {
      // nothing
    } else if (cur.vSection.indexOf(Video.CHANNEL_PREFIX) === 0) {
      hide(cur.videoSearch);
    } else {
      show(cur.videoSearch);
      cur.channelHeaderEl && hide(cur.channelHeaderEl);
    }

    if (cur.vSection == 'search' && cur.vStr) { // search
      var hd = cur.vHD ? cur.vHD : 0;
      var searchData = cur.searchData[cur.vStr+hd.toString()+cur.vOrder.toString() + cur.vDateAdded];

      var searchCount = (searchData) ? searchData.count : 0;
      var searchLen = (searchData) ? searchData.list.length : 0;
      if (!cur.loading && cur.vStr && searchLen < searchCount && cur.shown + cur.perPage/* + 20*/ > searchLen) {
        cur.loading = true;
        this.loadFromSearch(cur.vStr);
        show(cur.more);
        addClass(cur.more, 'load_more');
      }

      if (cur.shown >= usersLen) {
        var startPos = cur.shown - usersLen;
        //if (startPos < searchLen) {
          for (var i = startPos; i < searchLen; i++) {
            cur.vSearchRows.appendChild(se(this.drawVideo(searchData.list[i], linkAddr, true)));
            cur.shown++;
            added = true;
          }
        //}
      }
      if (usersLen + searchCount > cur.shown && !searchData.ended) {
        show(cur.more);
      } else {
        hide(cur.more);
      }

      Video.searchAlbums(cur.vStr);

      toggle(cur.vRows, usersLen);
    } else {
      if (sectionObject.silent && cur.shown == limit && cur.shown < sectionObject.count) {
        addClass(cur.more, 'load_more');
        show(cur.more);
      } else if (usersLen > cur.shown) {
        show(cur.more);
      } else {
        hide(cur.more);
      }

      show(cur.vRows);
    }

    if (cur.updateSorter) {
      added = true;
      delete cur.updateSorter;
    }

    if (added && cur.editmode) {
      setTimeout(function() {
        VideoEdit.onAdding();
      }, 0);
    }

    Video.updateSummaryTabs();
    Video.startTimeUpdate();
  },
  drawVideo: function(video, linkAddr, fromSearch) {
    v = video.slice();
    if (cur.selection) {
      v[3] = v[3].replace(cur.selection.re, cur.selection.val);
    }
    return cur.videoTpl(v, (v[11].substr(0, 1) != '_') ? ' video_can_edit' : '', fromSearch);
  },
  updateList: function(e, obj) {
    if (e.keyCode == 27) {
      return Video.searchVideos(false);
    }
    clearTimeout(cur.searchTimeout);
    setTimeout((function() {
      var str = trim(obj.value);
      if (str != cur.vStr) {
        this.searchVideos(str || '');
      }
    }).bind(this), 10);
  },
  recache: function(videoRaw) {
    if (!videoRaw && window.mvcur && mvcur.mvData.videoRaw) {
      videoRaw = mvcur.mvData.videoRaw;
    }
    delete ajaxCache['/al_video.php#act=show&list=&module=video&video=' + videoRaw];
    delete ajaxCache['/al_video.php#act=show&autoplay=1&list=&module=video&video=' + videoRaw];
  },
  loadSection: function(section, offset) {
    if (cur[section+'Loading']) {
      return;
    }
    cur[section+'Loading'] = true;
    if (offset == 0) {
      addClass(ge('video_section_' + section), 'loading');
      cur.vSection = section;
    }
    var params = {
      act: 'load_section_'+section,
      oid: cur.oid,
      offset: offset
    };
    ajax.post('al_video.php', params, {
      onDone: function(count, shown, data, curExt) {
        if (curExt) {
          extend(cur, curExt);
        }
        if (offset == 0) {
          Video.clearOutput();
          cur[section + 'Count'] = count;
          removeClass(ge('video_section_' + section), 'loading');
        }
        removeClass(cur.more, 'load_more');
        hide(cur.more);
        cur.shown = shown;
        var cont = ce('div', {
          innerHTML: data
        });
        cur.vRows.appendChild(cont);
        Video.changeSummary();
        Video.onSwitchTabs(section);
        if (offset == 0 && shown == 0 && section != 'comments') {
          show(cur.notFound);
        }
        delete cur[section+'Loading'];
      },

      onFail: function() {
        delete cur[section+'Loading'];
      },
      showProgress: function() {
        show('video_tabs_progress');
        hide('video_tabs_links');
      },
      hideProgress: function() {
        hide('video_tabs_progress');
        var num = 0;
        for(var i in cur.sections) num += 1;
        if (!num) {
          show('video_tabs_links');
        }
      }
    });
  },
  loadFrom: function(url, params, section) {
    addClass(ge('video_section_'+section), 'loading');
    cur.vSection = section;
    // pass
    ajax.post(url, params, {onDone: (function(count, data, obj) {
      removeClass(ge('video_section_'+section), 'loading');
      if (obj) {
        extend(cur, obj);
      }
      cur.vSection = section;
      data = eval('('+data+')');
      cur.videoList[section] = {list: data, count: count};
      if (cur.vSection == section) {
        this.clearOutput();
        this.showMore();
        if (cur.canEditAlbums && cur.albumsSorter && !(trim(cur.vStr) && cur.vStr != '""')) {
          //qsorter.update(cur.albumsCont);
        }
        if (cur.cansort) {
          Video.initSorter();
          //qsorter.update(cur.vRows, {dragEls: geByClass('video_album_candrop', cur.albumsCont)});
        }
        this.changeSummary();
        this.onSwitchTabs(section);
      }
    }).bind(this)})

  },
  filter: function(cond, list) {
    var all = cur.videoList['all'].list;
    var len = all.length;
    var result = [];
    for (var i = 0; i < len; i++) {
      var obj = all[i];
      if (cond(obj)) {
        result.push(obj);
      }
    }
    cur.videoList[list].list = result;

    len = result.length;
    return result;
  },
  clearSearch: function() {
    cur.selection = false;
    cur.vSearch.setValue('');
  },
  generateList: function(section) {
    if (!section) return;
    if (section == 'uploaded' || section == 'added' || section.substr(0, 6) == 'album_') {
      this.onSwitchTabs(section);
    } else if (section == 'tagged') {
      this.loadFrom('al_video.php', {act: 'get_tagged_video', mid: cur.oid}, section);
      return false;
    } else if (section == 'comments') {
      stManager.add(['videoview.js'], (function() {
        this.loadSection(section, 0);
      }).bind(this));
      return false;
    } else if (section == 'playlists') {
      if (!cur.playlistsRendered) {
        var playlistsHtml = '';
        for (var sec in cur.sections) {
          playlistsHtml += cur.albumsTpl(cur.sections[sec]);
        }
        cur.videoPlayListCont.innerHTML = playlistsHtml;
        cur.playlistsRendered = true;

        toggle('video_no_albums_wrap', !playlistsHtml);
      }
    }
    return true;
  },
  showCat: function() {
    hide(cur.videoPlaylists);
    hide(cur.videoAllContent);
    show(cur.catWrap);

    Video.changeSummary();

    if (cur.catWrap.children.length) {
      Videocat.collapseUGCPopular();
      geByTag1('body').scrollTop = cur.videoCatPageScroll || 0;
      return;
    }

    var progressEl = ge('video_bottom_progress');
    addClass(progressEl, 'video_cat_load');
    ajax.post('/al_video.php', { act: 'show_cat' }, {
      showProgress: show.pbind(progressEl),
      hideProgress: hide.pbind(progressEl),
      onDone: function(html, js) {
        removeClass(progressEl, 'video_cat_load');
        cur.catWrap.innerHTML = html;
        eval('(function(){' + js + ';})()');
      }
    });
  },
  section: function(section, force) {
    if (section == cur.vSection && !force) return false;
    section = section || '';

    if (cur.oid != vk.id && (!section || section == 'recoms') && !Video.isCurrentChannel()) {
      section = 'all';
    }

    cur.vSection = section;

    // initial layout
    hide(cur.catWrap);
    cur.channelHeaderEl && re(cur.channelHeaderEl);
    show(cur.videoSearch);

    if ((!section || section == 'recoms') && cur.isCatUser) {
      hide(cur.videoPlaylistsEl);
      this.onSwitchTabs(section);
      return Video.showCat();
    }

    if (cur.videoList[section] && cur.videoList[section].silent) {
      //todo show some progress while loading
      cur.onSilentLoad = cur.onSilentLoad || {};
      if (!cur.onSilentLoad[section]) {
        Video.loadSilent(section);
        cur.onSilentLoad[section] = function() {
          //update count
        };
      }
    }

    if (section != 'search') {
      this.clearSearch();
      hide('video_addition_options', 'video_sort_dd', 'video_external_dd_wrap');
    } else {
      if (cur.vStr) {
        cur.vSearch.setValue(cur.vStr);
      }
      if (!cur.editmode) {
        show('video_addition_options', 'video_sort_dd', 'video_external_dd_wrap');
      } else {
        hide('video_addition_options', 'video_sort_dd', 'video_external_dd_wrap');
      }
    }

    if (section == 'upload') {
      hide(cur.videoContentTab);
      show(cur.videoUploadTab);
    } else {
      hide(cur.videoUploadTab);
      show(cur.videoContentTab);
    }

    if (section == 'playlists') {
      hide(cur.videoAllContent);
      show(cur.videoPlaylistsEl);
    } else {
      hide(cur.videoPlaylistsEl);
      show(cur.videoAllContent);
    }

    /*if (section != 'all') {
      addClass(ge('video_content'), 'video_albums_hidden');
    } else {
      removeClass(ge('video_content'), 'video_albums_hidden');
    }*/

    if (!cur.videoList[section]) {
      if (!this.generateList(section)) {
        return;
      }
    }
    /*if (!cur.videoCount[section] && cur.videoList[section]) {
      var len = cur.videoList[section].length;
      cur.videoCount[section] = [len, len, 0];
    }*/

    this.clearOutput();
    this.showMore();
    if (cur.cansort) {
      //qsorter.update(cur.vRows, {dragEls: geByClass('video_album_candrop', cur.albumsCont)});
    }
    this.changeSummary();
    if (section != 'search' || !cur.vStr) {
      removeClass(ge('video_reset_search'), 'video_reset_search_shown');
      Video.hideOptions();
    } else {
      addClass(ge('video_reset_search'), 'video_reset_search_shown');
      Video.showOptions();
    }
    this.onSwitchTabs(section);
    if (cur.canEditAlbums && cur.albumsSorter && !(trim(cur.vStr) && cur.vStr != '""')) {
      //qsorter.update(cur.albumsCont);
    }

    if (section == 'all') {
      var playlistsOverviewEl = geByClass1('video_playlists_overview');
      if (playlistsOverviewEl) {
        playlistsOverviewEl.innerHTML = cur.ownerPlaylistsHtml || '';
      }
    }

    if (Video.isCurrentCategory()) {
      var catId = section.substr(Video.CATEGORY_PREFIX.length);

      show(cur.bottomProgress);
      hide(cur.notFound);
      hide(cur.more);
      hide(geByClass1('video_playlists_overview'));

      ajax.post('al_video.php', {act: 'a_load_cat_videos', cat_id: catId}, {
        onDone: function(videosHtml, data, shown) {
          hide(cur.bottomProgress);
          cur.vRows.innerHTML = videosHtml;
          show(cur.vRows);
          show(cur.vViewModeSwitch);

          cur.videoList = cur.videoList || {};
          cur.videoList['cat_' + catId] = {
            list: data
          };

          cur.summary.innerHTML = shown + ' ' + langNumeric(shown, cur.lang['videofile_num'], true);
        },
        onFail: function(text) {
        }
      });
    }

    if (Video.isCurrentChannel()) {
      window.scrollTo(0, 0);
      hide(cur.more);

      show(cur.bottomProgress);

      hide(cur.videoSearch);

      var channelId = section.substr(Video.CHANNEL_PREFIX.length);
      var channelInfo = cur._channels[channelId];

      cur.channelHeaderEl = se(trim(rs(cur.channelHeaderTpl, {
        channel_subs_hash: channelInfo.subsHash,
        channel_oid: channelInfo.oid,
        channel_thumb: channelInfo.thumb,
        channel_title: channelInfo.shortTitle,
        channel_href: channelInfo.href
      })));
      cur.videoContentTab.insertBefore(cur.channelHeaderEl, cur.videoContentTab.firstChild);

      if (channelInfo.isSubscribed) {
        Videocat.onChannelSubscribed(channelInfo.oid, channelInfo.subsHash, false);
      }

      var summaryEl = geByClass1('video_playlists_overview');
      hide(summaryEl);

      if (!summaryEl) {
        summaryEl = ge('owner_albums_placeholder');
      }

      ajax.post('al_video.php', {act: 'load_videos_silent', oid: channelId, section: 'all', limit: 60, playlists: 1, catalog: 1}, {
        onDone: function(list, playlistsOverviewHtml, playlistsCount) {
          hide(cur.bottomProgress);

          var list = eval('('+list+')');
          cur.videoList[section] = {
            list: list['all'].list,
            total: list['all'].total,
            silent: true
          };

          Video.loadSilent(cur.vSection);

          Video.showMore();
          Video.changeSummary();

          if (playlistsCount > 0 && trim(playlistsOverviewHtml)) {
            var channelSummaryEl = se(trim(playlistsOverviewHtml));
            domPN(summaryEl).replaceChild(channelSummaryEl, summaryEl);
            show(channelSummaryEl);
          }
        },
        onFail: function(text) {
        }
      });
    }
  },
  onSwitchTabs: function(section) {
    var topSection = section;

    if (!section) {
      topSection = 'recoms';
    } else if (section == 'added' || section == 'tagged' || section == 'uploaded' || section == 'all' || section == 'search') {
      topSection = 'all';
    }

    cur.isChannel = false;

    var newTab = ge('video_tab_'+topSection);
    var oldTab = geByClass1('active_link', ge('video_tabs'));
    if (newTab != oldTab) {
      removeClass(oldTab, 'active_link');
      addClass(newTab, 'active_link');
    }

    toggle(cur.albumsSummaryEl, section == 'all' || section == 'tagged' || section == 'uploaded');

    hide('video_albums_search_wrap');
    hide('video_albums_summary');

    hide('video_albums_more');
    hide('video_albums_show_more');

    if (section == 'all' || topSection != section && section != 'search') {
      var newSumTab = ge('video_sum_tab_'+section);
      var oldSumTab = geByClass1('summary_tab_sel', ge('video_summary_tabs'));

      if (newSumTab != oldSumTab) {
        replaceClass(oldSumTab, 'summary_tab_sel', 'summary_tab');
        replaceClass(newSumTab, 'summary_tab', 'summary_tab_sel');
      }
      show('video_summary_tabs');
      hide('video_main_summary');
    } else {
      hide('video_summary_tabs');
      show('video_main_summary');
    }

    var isInAlbum = section && section.substr(0, 6) == 'album_';
    var isInChannel = section && section.indexOf(Video.CHANNEL_PREFIX) === 0;
    var isInCategory = section && section.indexOf(Video.CATEGORY_PREFIX) === 0;

    toggleClass('video_list', 'video_in_playlist', isInAlbum);

    hide(cur.channelTab);

    var hiddenTab = (isInChannel || isInCategory) ? cur.channelTab : cur.hTab;
    var tabTitleEl = geByClass1('tab_word', hiddenTab).firstChild;

    var recomsTab = ge('video_tab_recoms');

    if (topSection == 'recoms') {
      show(recomsTab);
    } else if (isInCategory) {
      show(hiddenTab);
      hiddenTab.className = 'active_link'
      tabTitleEl.innerHTML = cur.categoryTitle;

    } else if (isInChannel) {
      show(hiddenTab);
      hiddenTab.className = 'active_link';

      var channelId = section.substr(Video.CHANNEL_PREFIX.length);
      var channelInfo = cur._channels[channelId];

      tabTitleEl.innerHTML = channelInfo ? channelInfo.shortTitle : '';
    } else if (isInAlbum || section == 'comments' || section == 'upload') {
      hiddenTab.className = 'active_link';
      if (section == 'comments') {
        var tabName = getLang('video_comments_review');
      } else if (section == 'upload') {
        var tabName = getLang('video_upload_tab');
      } else {
        var tabName = '';
        for (var i in cur.sections) {
          if (cur.sections[i][0] == ((section == 'tagged') ? -1 :  parseInt(section.substr(6)))) {
            tabName = cur.sections[i][1];
          }
        }
      }
      tabTitleEl.innerHTML = tabName;

      addClass(ge('video_content'), 'video_albums_hidden');
    } else {
      hiddenTab.className = 'video_tab_hidden';
      if (section != 'search') {
        removeClass(ge('video_content'), 'video_albums_hidden');
      }
    }
    toggleClass(ge('video_rows'), 'wall_module', section == 'comments');
    if (cur.sorter) {
      cur.sorter.updateDragCont();
    }

    Video.startTimeUpdate();

    Video.initSorter();

    Video.updateSummaryTabs();

    Video.updateViewModeSwitcher();

    Video.updateDataSectionAttr();

    if (cur.vSection != 'search') {
      if (cur.timeouts && cur.timeouts.changeUrl) clearTimeout(cur.timeouts.changeUrl);
      setTimeout(function() {
        delete nav.objLoc.added;
        delete nav.objLoc.sort;
        delete nav.objLoc.order;
        delete nav.objLoc.len;
        delete nav.objLoc.q;
        nav.setLoc(nav.objLoc);
      }, 20);
    }
  },

  updateDataSectionAttr: function() {
    ge('video_all').setAttribute('data-section', cur.vSection);
  },

  updateSummaryTabs: function(forceHide) {
    hide('video_updates_link');

    if (!cur.vSection || cur.vSection == 'recoms') {
      hide('video_comments_link');
      hide('video_tabs_link');
      show('video_updates_link');
    } else if (cur.vSection == 'playlists' || cur.vSection.indexOf('album_') == 0) {
      hide('video_comments_link');
      show('video_tabs_link');
    } else {
      if (cur.vSection == 'search') {
        var data = cur.videoList['search_' + cur.vStr];
        if (!data || !data.list || !data.list.length) {
          hide('video_comments_link');
          hide('video_tabs_link');
          return;
        }
      }
      show('video_comments_link');
      hide('video_tabs_link');
    }

    Video.updateViewModeSwitcher();
  },

  updateTitle: function(row) {
    var name = geByClass1('video_row_info_name', row);

    if (!name) return;

    var linkEl = geByTag1('a', name);
    if (linkEl.innerHTML.length > 40 && !linkEl.hasAttribute('title')) {
      var initialHeight = name.offsetHeight || getSize(name)[1];
      addClass(name, 'for_size');
      var realHeight = name.offsetHeight || getSize(name)[1];
      removeClass(name, 'for_size');
      if (initialHeight < realHeight) {
        linkEl.setAttribute('title', replaceEntities(linkEl.innerHTML));
      }
    }
  },

  startTimeUpdate: function() {
    function updateTimesStart() {
      clearTimeout(cur.updateTimesTimer);

      Video.updateTimes();
      cur.updateTimesTimer = setTimeout(updateTimesStart, 5000);

      cur.destroy.push(clearTimeout.pbind(cur.updateTimesTimer));
    }

    updateTimesStart();
  },

  updateTimes: function (albumsSearch, forceAlbumsUpdate) {
    if (!forceAlbumsUpdate && albumsSearch && (!cur._albumsSearchRes || !cur._albumsSearchRes.length)) {
      return;
    }

    if (!(cur.lang || {}).video_added_sec) {
      return;
    }
    function langVideoNumeric(num, words, arr) {
      if (isArray(words) && num < words.length) {
        return words[num];
      }
      return langNumeric(num, arr);
    }

    var langPrefix = '';

    var timeIndex, list = [];
    if (albumsSearch || forceAlbumsUpdate || cur.vSection == 'playlists') {
      list = albumsSearch && !forceAlbumsUpdate ? cur._albumsSearchRes : cur.sections;
      timeIndex = 4;
      langPrefix = 'video_album_update_';
    } else {
      if (cur.vSection == 'search') {
        var hd = cur.vHD ? cur.vHD : 0;
        var searchData = cur.searchData[cur.vStr + hd.toString() + (cur.vOrder || '').toString() + cur.vDateAdded];
        if (searchData && searchData.list) {
          list = searchData.list;
        }

        searchData = cur.videoList['search_' + cur.vStr];
        if (searchData && searchData.list) {
          list = list.concat(searchData.list);
        }

        Video.updateTimes(true);
      } else {
        list = (cur.videoList[cur.vSection] || {}).list;
      }
      timeIndex = 15;
      langPrefix = 'video_added_';
    }

    if (!list) return;

    var timeNow = intval(vkNow() / 1000), timeTextEl;
    each(list, function(i, v) {
      var vEl = null;
      if (albumsSearch || cur.vSection == 'playlists') {
        if (isVisible(cur.albumsSummaryEl)) {
          vEl = geByClass1('video_album_' + v[0], cur.albumsSummaryEl);
        } else {
          var albumsWrapEl = ge('video_albums_search_wrap');
          vEl = geByClass1('video_album_' + v[0], albumsWrapEl && albumsWrapEl.children.length ? albumsWrapEl : geByClass1('video_playlists_content'));
        }
      } else {
        vEl = ge('video_cont' + v[0] + '_' + v[1]);
      }

      if (!vEl) return;

      timeTextEl = geByClass1('video_row_info_date', vEl);

      if (isNaN(timeTextEl.innerHTML) && data(vEl, 'time_inited')) return;

      var timeRow = v[timeIndex], diff = timeNow - timeRow, timeText = '';
      if (diff < 5) {
        timeText = getLang(langPrefix + 'now');
      } else if (diff < 60) {
        timeText = langVideoNumeric(diff, cur.lang[langPrefix + 'sec'][0], cur.lang[langPrefix + 'sec'][1]);
      } else if (diff < 3600) {
        timeText = langVideoNumeric(intval(diff / 60), cur.lang[langPrefix + 'min'][0], cur.lang[langPrefix + 'min'][1]);
      } else if (diff < 24 * 3600) {
        timeText = langVideoNumeric(intval(diff / 3600), cur.lang[langPrefix + 'hour'][0], cur.lang[langPrefix + 'hour'][1]);
      } else if (diff < 30 * 24 * 3600) {
        timeText = langVideoNumeric(intval(diff / (24 * 3600)), cur.lang[langPrefix + 'day'][0], cur.lang[langPrefix + 'day'][1]);
      } else if (diff < 365 * 24 * 3600) {
        timeText = langVideoNumeric(intval(diff / (30 * 24 * 3600)), cur.lang[langPrefix + 'month'][0], cur.lang[langPrefix + 'month'][1]);
      } else {
        timeText = langVideoNumeric(intval(diff / (365 * 24 * 3600)), cur.lang[langPrefix + 'year'][0], cur.lang[langPrefix + 'year'][1]);
      }

      timeTextEl.innerHTML = timeText;

      data(vEl, 'time_inited', 1);
    });
  },

  showAlbums: function(obj) {
    while (ge('video_albums_more') && ge('video_albums_more').firstChild) {
      var el = ge('video_albums_more').firstChild;
      ge('video_albums_wrap').appendChild(el);
    }
    hide(obj);
    if (cur.canEditAlbums && cur.albumsSorter && !(trim(cur.vStr) && cur.vStr != '""')) {
      qsorter.added(cur.albumsCont);
    }
    if (cur.cansort) {
      qsorter.update(cur.vRows, {dragEls: geByClass('video_album_candrop', cur.albumsCont)});
    }
  },
  deleteAlbum: function(aid, ev) {
    aid = aid.split('_')[1];
    showBox('al_video.php', {act: 'delete_album', aid: aid, oid: cur.oid}, {dark: 1});
    return cancelEvent(ev);
  },
  editAlbum: function(aid, ev) {
    aid = aid.split('_')[1];
    showBox('al_video.php', {act: 'edit_album', oid: cur.oid, aid: aid}, {dark: 1});
    return cancelEvent(ev);
  },
  createAlbum: function() {
    showBox('al_video.php', {act: 'edit_album', oid: cur.oid}, {dark: 1});
  },
  uploadVideoBox: function() {
    if (cur.uploadBanned) {
      setTimeout(showFastBox({title: getLang('video_no_upload_title'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('video_claims_no_upload')).hide, 5000);
      return false;
    }
    var box = showTabbedBox('al_video.php', {act: 'upload_box', oid: cur.oid}, {stat: ['video_edit.css', 'privacy.css', 'privacy.js'], params: {bodyStyle: 'position: relative;', dark: 1, hideButtons: 1}});
    return false;
  },
  removeAllTags: function() {
    showBox('al_video.php', {act: 'remove_all_tags_box'}, {dark: 1});
  },

  xRow: function(event, opacity, row, hint) {
    if (hint) showTooltip(row, {text: hint, showdt: 500});
    animate(hasClass(row, 'video_close') ? row : geByClass1('video_close', row), {opacity: opacity}, 200);
    return cancelEvent(event);
  },

  removeRecomm: function(obj) {
    var el = obj.parentNode;
    while(el && !hasClass(el, 'video_row_cont')) {
      el = el.parentNode;
    }
    if (!el) return;
    slideUp(el, 50);
    ajax.post('al_video.php', {act: 'hide_recommendation', video: el.id.substr(9), hash: cur.hash});
  },
  addFromList: function(videoRaw, hash, ev, obj) {
    var videoCont = ge('video_cont'+videoRaw);
    if (hasClass(videoCont, 'video_row_added')) {
      return cancelEvent(ev);
    }

    var vid = videoRaw.split('_');
    ajax.post('/al_video.php', { act: 'a_add_to_playlist', oid: vid[0], vid: vid[1], add: 1, playlist_id: -2, hash: hash }, {
      onDone: function(playlists, v) {
        if (!Video.isCurrentCategory() && !Video.isCurrentChannel()) {
          Video.updateVideo(cur.oid, v, [], false, JSON.parse(playlists));
        }
      }
    });

    addClass(obj, 'video_added_from_list');

    return cancelEvent(ev);
  },
  albumDragOver: function(el) {
    fadeOut(geByClass1('video_album_info', el), 200);
    fadeOut(geByClass1('videos_album_tags', el), 200);
    var moveEl = geByClass1('videos_album_move', el)
    if (!moveEl) {
      moveEl = ce('div', {className: 'videos_album_move'})
      el.insertBefore(moveEl, el.firstChild);
    }
    moveEl.innerHTML = getLang('video_drop_to_move');
    setStyle(moveEl, {marginTop: getSize(el)[1] / 2 - getSize(moveEl)[1] / 2})
    fadeIn(moveEl, 200);
  },
  albumDragOut: function(el) {
    fadeIn(geByClass1('video_album_info', el), 200);
    fadeIn(geByClass1('videos_album_tags', el), 200);
    fadeOut(geByClass1('videos_album_move', el), 200);
  },
  updateVideoAlbum: function(vid, albumId) {
    var oldAlbum = 0;
    var list = cur.videoList['all'].list;
    for (var i in list) {
      if (list[i][1] == vid) {
        oldAlbum = list[i][6];
        if (oldAlbum == albumId) {
          return false;
        }
        list[i][6] = albumId;
      }
    }
    delete cur.videoList['album_'+oldAlbum];
    delete cur.videoList['album_'+albumId];
    if (cur.vSection == 'album_'+oldAlbum) {
      Video.section('album_'+oldAlbum);
    }
  },
  albumDrop: function(el, obj) {
    var moveEl = geByClass1('videos_album_move', el)
    if (moveEl) {
      moveEl.innerHTML = '<div class="progress_inline progress_inv" style="height: '+(getSize(moveEl)[1] - 16)+'px"></div>';
    }
    var videoId = obj.id.replace('video_cont', '').split('_');
    var oid = videoId[0];
    var vid = videoId[1];
    var albumId = el.id.replace('video_album_', '');
    ajax.post('al_video.php', {act: 'move_to_album', album_id: albumId, hash: cur.moveHash, oid: oid, vid: vid, from: 'list'}, {
      onDone: function(text, newList) {
        showDoneBox(text);
        Video.updateAlbums(newList);
        Video.updateVideoAlbum(vid, albumId);
      }
    });
    return true;
  },
  showOptions: function() {
    if (cur.shownOptions) return;
    cur.shownOptions = true;
    addClass(cur.videoSearch, 'video_search_extended');
    setTimeout(function(){
      hide('video_add_button');
    }, 200);
  },
  hideOptions: function() {
    if (!cur.shownOptions) return;
    cur.shownOptions = false;
    show('video_add_button');
    removeClass(cur.videoSearch, 'video_search_extended');
  },
  isVideoPlayerOpen: function(oid, vid) {
    var rawId = oid;
    if (vid) {
      rawId += '_' + vid;
    }
    return window.mvcur && mvcur.mvShown === true && mvcur.videoRaw === rawId;
  },

  startPollVideoReady: function(oid, vid) {
    var videoRaw = oid + '_' + vid;

    setTimeout(function() {
      ajax.post('al_video.php', {
        act: 'check_upload_status',
        video: videoRaw,
        oid: oid,
        vid: vid
      }, {
        onDone: function(isUploaded) {
          if(Video.isVideoPlayerOpen(oid, vid)) {
            if (isUploaded) {
              if(mvcur.minimized) {
                Videoview.hide(false, true);
              } else {
                Videoview.backLocation();
              }

              showVideo(videoRaw, '', {});
            } else {
              Video.startPollVideoReady(oid, vid);
            }
          }
        }
      });
    }, 10000);
  },
  updateViewModeSwitcher: function() {
    toggle(cur.vViewModeSwitch, !!geByClass1('video_row'));
  },
  switchPlaylistMode: function(button, mode, silent) {
    if (!button) {
      button = geByClass1('video_to_' + mode + '_view');
    }

    var  parent = domPN(button);
    var buttons = geByClass('video_playlist_switch', parent);
    each(buttons, function() {
      removeClass(this, 'active');
    });
    addClass(button, 'active');
    toggleClass('video_content', 'video_compact_view', mode == 'items');

    cur.listViewMode = +(mode == 'rows');

    if (!silent && vk.id) {
      ajax.post('/al_video.php', { act: 'a_save_list_view_mode', mode: cur.listViewMode, hash: cur.listViewModeHash });
    }

    Video.initSorter();
  },
  showPlaylistsBox: function(event, vid, oid) {
    showBox('/al_video.php', { act: 'video_playlists_box', target_id: cur.oid, oid: oid, vid: vid }, {dark: 1});
    cancelEvent(event);
  },
  videoPlaylistsEditInit: function(box, playlists, video, gid, hash, inPlaylists) {
    var oid = video[0], vid = video[1];
    var checkboxes = [], body = ge('video_playlists_edit_box');
    var checkedPlaylists = {};
    each(playlists, function(i, pl) {
      var privateIcon = pl.private ? '<span class="video_album_private_icon" onmouseover="showTooltip(this,{black:1,text: \'' + getLang('video_album_is_private_tt') +  '\', shift:[13, 3, 0]})"></span>' : '';
      body.appendChild(se('<div class="video_pl_cb"><div id="pl_' + pl.id + '"></div>' + privateIcon + '</div>'));
      var cb = new Checkbox(ge('pl_' + pl.id), {
        //width: 300,
        label: pl.title,
        checked: pl.added,
        playlistId: pl.id
      });
      cb.disable(pl.disabled);
      checkboxes.push(cb);
      checkedPlaylists[pl.id] = +pl.added;
    });

    box.removeButtons().addButton(getLang('Save'), function(btn) {
      var pls = [], added = [], removed = [];
      each(checkboxes, function(i, cb) {
        if (!cb.disabled && cb.checked()) {
          pls.push(cb.options.playlistId);
        }
        if (cb.checked() && !checkedPlaylists[cb.options.playlistId]) {
          added.push(cb.options.playlistId);
        }
        if (!cb.checked() && checkedPlaylists[cb.options.playlistId]) {
          removed.push(cb.options.playlistId);
        }
      });

      ajax.post('/al_video.php', { act: 'a_add_to_playlist', oid: oid, vid: vid, gid: (gid == vk.id) ? void 0 : -gid, playlists: pls.length ? pls : '0', hash: hash }, {
        showProgress: lockButton.pbind(btn),
        hideProgress: unlockButton.pbind(btn),
        onDone: function() {
          box.hide();
          Video.updateVideo(gid, video, inPlaylists, false, added, removed);
        }
      });
    });
  },
  onVideoDelete: function(oid, vid, hash, cb) {
    var fastBox = showFastBox({title: getLang('video_delete_dialog_title'), dark: 1, forceNoBtn: true, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('video_tc_sure_delete'), getLang('video_tc_delete'), function(button) {
        ajax.post('/al_video.php', { act: 'delete_video', oid: oid, vid: vid, hash: hash, sure: 1 }, {
          showProgress: lockButton.pbind(button),
          hideProgress: unlockButton.pbind(button),
          onDone: function() {
            if (cur.vSection) {
              Video.updateVideo(cur.oid, [oid, vid], [], true);
              Video.initSorter();
            }

            boxQueue.hideLast();
            boxQueue.hideLast();
            Videoview.hide();

            cb && cb();
          }
        })
      }, getLang('box_cancel'), function() {
        boxQueue.hideLast();
        boxQueue.hideLast();
      });
  },
  toggleExtendedControls: function(show) {
    var videoSearchEl = ge('video_search'), videoSearchControlsEl = ge('video_search_controls');

    if (show == undefined) {
      show = !hasClass(videoSearchEl, 'video_search_extended_controls');
    }

    if (show) {
      toggle(videoSearchControlsEl, show);
    }
    setTimeout(function() {
      toggleClass(ge('video_search'), 'video_search_extended_controls', show);
    });
    clearTimeout(cur.videoExtendedSearchToggleTO);
    if (!show) {
      cur.videoExtendedSearchToggleTO = setTimeout(function() {
        hide(videoSearchControlsEl);
      }, 250);
    }
  },
  initSearchControls: function() {
    var options = { big: true, width: 196 };

    cur.vLength = nav.objLoc.len || 0;
    if (nav.objLoc.added) cur.vDateAdded = nav.objLoc.added;
    if (nav.objLoc.order) cur.vOrder = nav.objLoc.order;

    new Dropdown(ge('video_search_duration'), [[0, getLang('video_search_any_duration')], [2, getLang('video_search_long')], [1, getLang('video_search_short')]], extend(options, {
      selectedItem: cur.vLength,
      onChange: function(duration) {
        cur.vLength = duration ? duration : null;
        Video.searchVideos(cur.vStr);
        Video.doChangeUrl();
      }
    }));
    new Dropdown(ge('video_search_added'), [[0, getLang('video_search_any_time')], [86400, getLang('video_search_last_24')], [86400 * 7, getLang('video_search_last_week')], [86400 * 30, getLang('video_search_last_month')], [86400 * 365, getLang('video_search_last_year')]], extend(options, {
      selectedItem: cur.vDateAdded || 0,
      onChange: function(date) {
        cur.vDateAdded = date ? date : '';
        Video.searchVideos(cur.vStr);
        Video.doChangeUrl();
      }
    }));
    new Dropdown(ge('video_search_sort'), [[2, getLang('video_by_relevance')], [0, getLang('video_search_by_date')], [1, getLang('video_search_by_duration')]], extend(options, {
      selectedItem: cur.vOrder || 2,
      onChange: function(type) {
        cur.vOrder = type;
        Video.searchVideos(cur.vStr);
        Video.doChangeUrl();
      }
    }));

    return cur.vDateAdded || (cur.vOrder != 2) || cur.vLength
  },
  showTutorial: function() {
    showBox('/al_video.php', {act: 'show_tutorial'}, { params: {width: 600, bodyStyle: 'position: relative; padding: 0; border-radius: 5px', dark: 1, hideButtons: 1} });
  },
  onTutNavButtonMousemove: function(event) {
    if (!cur._tutMousePos) return;
    var diff = Math.abs(event.pageX - cur._tutMousePos[0]) + Math.abs(event.pageY - cur._tutMousePos[1]);
    if (diff > 5) {
      removeEvent(event.currentTarget, 'mousemove', Video.onTutNavButtonMousemove);
      hide(event.currentTarget);
    }
  },
  updateTutorialButtons: function() {
    var currPage = geByClass1('video_tutorial_active_page');

    var rightBtn = ge('nav_btn_right');
    var leftBtn = ge('nav_btn_left');

    if (currPage.nextSibling && currPage.nextSibling.nodeType == Node.ELEMENT_NODE) {
      removeEvent(rightBtn, 'mousemove', Video.onTutNavButtonMousemove);
      removeClass(rightBtn, 'btn_inactive');
      show(rightBtn);
    } else {
      addClass(rightBtn, 'btn_inactive');
      addEvent(rightBtn, 'mousemove', Video.onTutNavButtonMousemove);
    }

    if (currPage.previousSibling && currPage.previousSibling.nodeType == Node.ELEMENT_NODE) {
      removeEvent(leftBtn, 'mousemove', Video.onTutNavButtonMousemove);
      removeClass(leftBtn, 'btn_inactive');
      show(leftBtn);
    } else {
      addClass(leftBtn, 'btn_inactive');
      addEvent(leftBtn, 'mousemove', Video.onTutNavButtonMousemove);
    }

    Video.updateTutorialNavBullets();
  },
  updateTutorialNavBullets: function() {
    var firstPage = geByClass1('video_tutorial_active_page');
    var ACTIVE_BULLET_CLS = 'video_info_tutorial_nav_bullet_active';

    var currBullet = geByClass1(ACTIVE_BULLET_CLS);
    if (currBullet) {
      removeClass(currBullet, ACTIVE_BULLET_CLS);
    }

    var index = Video.tutorialGetChildPosition(firstPage);
    addClass(geByClass1('video_info_tutorial_nav_bullets').children[index], ACTIVE_BULLET_CLS);
  },
  initTutorial: function(box) {
    var boxNode = box.bodyNode;

    var firstPage = geByClass1('video_info_tutorial_page', boxNode);
    addClass(firstPage, 'video_tutorial_active_page');

    Video.updateTutorialButtons();
  },
  tutorialNext: function(step, event, forcePos) {
    var boxNode = curBox().bodyNode;
    var ACTIVE_PAGE_CLS = 'video_tutorial_active_page';

    var curPage = geByClass1(ACTIVE_PAGE_CLS, boxNode);

    var pageSize = getSize(geByClass1('video_info_tutorial_page', boxNode));
    var sliderEl = geByClass1('video_info_tutorial_pages_slider', boxNode);

    var nextPage;
    if (forcePos !== undefined) {
      nextPage = sliderEl.children[forcePos];
    } else {
      nextPage = step > 0 ? curPage.nextSibling : curPage.previousSibling;
    }

    if (!nextPage || nextPage.nodeType != Node.ELEMENT_NODE) {
      return;
    }

    removeClass(curPage, ACTIVE_PAGE_CLS);
    addClass(nextPage, ACTIVE_PAGE_CLS);

    var curPos = pageSize[0] * Video.tutorialGetChildPosition(nextPage);
    setStyle(sliderEl, { left: (vk.rtl ? 1 : -1) * curPos });

    Video.updateTutorialButtons();

    cur._tutMousePos = [event.pageX, event.pageY];

    cancelEvent(event);
  },
  tutorialGetChildPosition: function(child) {
    var index = 0;
    while ((child = child.previousSibling) != null) {
      if (child.nodeType == Node.ELEMENT_NODE) index ++;
    }
    return index;
  },
  tutorialOnBulletClick: function(event, bulletEl) {
    var index = Video.tutorialGetChildPosition(bulletEl);
    Video.tutorialNext(0, event, index);
  },
  hideBanner: function(event) {
    ajax.post('al_video.php', {act: 'hide_new_video_banner', hash: cur._videoBannerHideHash});
    var cb = curBox();
    cb && cb.hide();
    hide('video_info_banner');
    cancelEvent(event);
  },

  showAllSummaryAlbums: function(btn) {
    var plSummaryEl = ge('video_playlists_summary');
    var plContEl = geByClass1('video_playlists_summary_cont');

    var isExpanded = data(plSummaryEl, 'expanded');
    setStyle(plSummaryEl, 'max-height', isExpanded ? '' : getSize(plContEl)[1] + 'px');

    isExpanded = !isExpanded;

    data(plSummaryEl, 'expanded', isExpanded);

    btn.innerHTML = getLang(isExpanded ? 'video_hide_all_albums_toggle' : 'video_show_all_albums_toggle');

    if (!isExpanded) {
      setTimeout(function() {
        animate(geByTag1('body'), {scrollTop: 0, transition: Fx.Transitions.easeOutCubic}, 700);
      }, 300);
    }
  },

  isInCatalogue: function() {
    return cur.isCatUser && (cur.vSection == '' || cur.vSection == 'recoms' || Video.isCurrentChannel() || Video.isCurrentCategory());
  },

  isCurrentChannel: function() {
    return cur.isChannel || cur.vSection && cur.vSection.indexOf(Video.CHANNEL_PREFIX) == 0;
  },

  isCurrentCategory: function() {
    return cur.vSection && cur.vSection.indexOf(Video.CATEGORY_PREFIX) == 0;
  },

  updateThumb: function(vid, thumbUrl) {
    if (cur.videoList) {
      each(cur.videoList, function(albumId, data) {
        if (!data || !data.list || !data.list.length) return

        each(data.list, function(i, video) {
          if (vid == (video[0] + '_' + video[1])) {
            video[2] = thumbUrl;
            return false;
          }
        });
      });
    }
  },

  tcSlide: function(event, btn, offset, noAnim) {
    var ITEMS_CNT = 4;
    var parent = gpeByClass('video_tc_slider', btn);
    var slider = geByClass1('video_tc_slider_cont', parent);
    var itemWidth = getSize(slider.children[0])[0] + 8 /* margin-right */;

    var currOffset = data(slider, 'currOffset') || 0;
    currOffset += offset;
    currOffset = Math.max(-slider.children.length + ITEMS_CNT, Math.min(0, currOffset));
    data(slider, 'currOffset', currOffset);

    if (noAnim) {
      addClass(slider, 'no_transition');
    }

    setStyle(slider, { left: currOffset * itemWidth });

    if (noAnim) {
      setTimeout(function() {
        removeClass(slider, 'no_transition');
      });
    }

    // update buttons
    var hideLeftBtn = currOffset == 0;
    var hideRightBtn = currOffset == -(slider.children.length - ITEMS_CNT);
    var btnLeft = geByClass1('video_tc_btn_left', parent);
    var btnRight = geByClass1('video_tc_btn_right', parent);
    toggleClass(btnLeft, 'video_tc_btn_none', hideLeftBtn);
    toggleClass(btnRight, 'video_tc_btn_none', hideRightBtn);

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

    initBtnHide(hideLeftBtn, btnLeft);
    initBtnHide(hideRightBtn, btnRight);

    event && cancelEvent(event);

    return false;
  }
}

try{stManager.done('video.js');}catch(e){}
