var Video = {
    regBR: new RegExp('<br>', 'g'),

    CHANNEL_PREFIX: 'channel',
    CATEGORY_PREFIX: 'cat_',
    SIGNIFICANT_POSITIONS: 50,

    VIDEO_SEARCH_TYPE: 'search_videos',
    VIDEO_GLOBAL_SEARCH_TYPE: 'search_global_videos',
    ALBUM_SEARCH_TYPE: 'search_albums',
    ALBUM_GLOBAL_SEARCH_PROMO_PLAYLISTS_TYPE: 'search_promo_albums',
    SEARCH_FILTERS: ['hd', 'notsafe', 'date', 'order', 'len'],

    AVAILABLE_TABS: ['all', 'uploaded', 'albums'],

    VIDEOS_PER_PAGE: 60,
    ALBUMS_PER_PAGE: 12,
    VIDEOS_PER_ROW: 3,

    PLAYLIST_OBJECT_ID_INDEX: 6,

    SEARCH_KEEP_FILTERS_DELAY: 3000,

    SEARCH_STATS_POSITION_FIELDS: ['oid', 'vid', 'clicked', 'viewStarted', 'viewedParts', 'viewedSeconds'],

    getLoc: function() {
        if (cur.curLoc) {
            return cur.curLoc;
        } else if ((isEmpty(nav.objLoc) || !nav.objLoc[0] || nav.objLoc[0].indexOf('video') != 0) && cur.section && inArray(cur.section, ['catalog', 'all', 'uploaded', 'albums'])) {
            return {
                0: cur.section == 'catalog' ? 'video' : ('videos' + cur.oid)
            };
        } else {
            return nav.objLoc;
        }
    },

    init: function() {
        cur.searchInputEl = geByClass1('video_search_input');

        cur.videoRecentlyRemoved = {};
        cur.videoShowWindow = {};
        cur.found = {};
        cur.silentLoaded = {};
        cur.currentSortings = {};
        cur._preloadedPages = {};
        cur.videoSearchFilters = {};
        cur.videoSearchStats = null;
        cur.videoSearchPos = null;
        cur.module = 'video';
        cur.albumsPreload = cur.albumsPreload || {};
        cur.albumsShowingAll = {};
        cur.curLoc = cur.query ? nav.fromStr(cur.query) : false;
        cur._back = {
            hide: [function() {
                removeEvent(window, 'scroll', cur._ev_onScroll);
            }],
            show: [function() {
                Video._initScroll();
            }],
        };

        if (isObject(cur.curLoc)) {
            cur.curLoc.section = cur.section;
        }

        cur.getOwnerId = function() {
            return cur.oid;
        };

        Video.initNavigation();

        Video.initSearch();

        var curSectionType = Video._getCurrentSectionType();

        if (!Video.isInAlbum()) {
            Video.loadSilent();
        }
        Video.loadSilent(Video.getLoc().section);

        if (curSectionType == 'catalog') {
            Videocat.init();
            if (vk.id) {
                Video._preloadPage('all');
            }
        } else {
            Video.initOwnerVideoPage();
            if (vk.id == cur.getOwnerId() && (Video.AVAILABLE_TABS.indexOf(curSectionType) != -1)) {
                Video._preloadPage('catalog');
            }
        }

        cur.curLoc = false;
        cur.section = false;

        cur.currentModule = function() {
            if (Video.isInSearch()) {
                return 'video_search';
            } else if (Video.isInCatalog()) {
                return 'videocat';
            } else if (Video.isInVideosList()) {
                return cur.oid < 0 ? 'community_videos' : (cur.oid == vk.id ? 'profile_own_videos' : 'profile_videos');
            }
            return cur.module;
        }

        Video._initScroll();

        addEvent(window, 'beforeunload', function(event) {
            var loc = Video.getLoc();
            if (loc[0].indexOf('video') >= 0 && loc.q) {
                Video.logSearchStats();
            }
            return true;
        });

        Video._updateThumbsInView();
    },

    _initScroll: function() {
        cur._ev_onScroll && removeEvent(window, 'scroll', cur._ev_onScroll);
        addEvent(window, 'scroll', cur._ev_onScroll = Video.onScroll);
        cur.destroy.push(function() {
            removeEvent(window, 'scroll', cur._ev_onScroll);
        });
    },

    _preloadPage: function(section) {
        ajax.post('al_video.php', {
            act: 's',
            section: section,
            preload: 1
        }, {
            onDone: function(html, addCur, otherBlocks) {
                if (!Video.isInCatalog() && !Video.isInVideosList()) {
                    return
                }

                var oid = cur.getOwnerId(),
                    curVideosCount = cur.videosCount[oid];

                extend(cur, addCur);
                extend(cur.videosCount[oid], curVideosCount);

                cur._preloadedPages = cur._preloadedPages || {};
                cur._preloadedPages[section] = ce('div', {
                    innerHTML: html,
                    id: 'video_content_' + section
                });
                cur._preloadedPages['other'] = otherBlocks; // for catalog

                if (section == 'all') {
                    Video.loadSilent(section);
                }

                if (cur._switchOnPagePreloaded) {
                    Video._switch.apply(Video, cur._switchOnPagePreloaded);
                }
                cur._switchOnPagePreloaded = false;
            }
        });
    },

    initOwnerVideoPage: function() {
        if (cur._videoInited) return;
        cur._videoInited = true;

        if (cur.videoCanSort) {
            if (!Video.isInAlbum()) {
                cur.albumsSorter = new GridSorter('video_albums_list', 'video_playlist_item_a', {
                    onReorder: Video._onAlbumReorder
                });
            }

            Video._createSorters();
        }

        var sortDD = ge('video_sort_dd');
        if (sortDD) {
            cur.videoSortDD = new InlineDropdown(sortDD, {
                items: cur.videoSortItems,
                withArrow: true,
                selected: 'default',
                onSelect: Video._sortVideos
            });
        }

        Video._toggleSorter(Video.getLoc().section != 'albums');
    },

    _toggleSorter: function(show) {
        var parentEl = geByClass1('video_tab_actions_wrap');
        var sortEls = [geByClass1('_video_sort_dd_wrap', parentEl), geByClass1('divider', parentEl)];
        toggle(sortEls[0], show);
        toggle(sortEls[1], show);
    },

    _switch: function(from, to) {
        var content = ge('video_content_' + to);

        if (!content && typeof cur._preloadedPages[to] == 'undefined') { // wait for page load
            cur._switchOnPagePreloaded = [from, to];
            return false;
        }

        Video.doSearch('');
        Video.inputVal(cur.searchInputEl, '');

        hide('video_content_' + from);

        toggle('videocat_other_blocks', from != 'catalog');

        if (!content) {
            ge('video_layout_contents').appendChild(cur._preloadedPages[to]);
        }

        show(content);

        if (from == 'catalog') {
            Video.initOwnerVideoPage();

            setDocumentTitle(getLang('video_myvideos'))
        } else {
            var otherCatalogBlocks = ge('videocat_other_blocks');
            if (!trim(otherCatalogBlocks.innerHTML)) {
                otherCatalogBlocks.innerHTML = cur._preloadedPages['other'];
            }

            Videocat.init();

            setDocumentTitle(getLang('video_catalogue_tab_full'));
        }

        toggle('video_add_album_btn', to != 'catalog');

        uiTabs.switchTab(domFC(ge('videocat_tab_' + to)));
        uiTabs.hideProgress('video_main_tabs');

        Video._updateThumbsInView();

        return false;
    },

    updateEmptyPlaceholder: function(section) {
        if (!section) return; // something wrong

        var doShow = false,
            langKey = '';

        if (section == 'albums') {
            if (!cur.playlistsCount) {
                doShow = true;
                langKey = 'video_no_albums_placeholder_text';
            }

        } else if (!cur.videosCount[cur.getOwnerId()][section]) {
            doShow = true;
            langKey = 'video_no_videos_here_yet';
        }

        Video._toggleEmptyPlaceholder(doShow, langKey);
    },

    initNavigation: function() {
        cur.nav.push(function videoNav(changed, oldLoc, newLoc, opts) {
            var pageChanged = changed[0] !== undefined; // video <-> videocat
            var goingToMyVideos = pageChanged && newLoc[0] == ('videos' + vk.id);
            var goingToCatalog = pageChanged && newLoc[0] == 'video';
            var goingToComments = newLoc.section == 'comments';
            var startedSearch = newLoc.q && !oldLoc.q && newLoc[0].indexOf('video') >= 0;
            var leavingSearch = oldLoc.q && !newLoc.q && oldLoc[0].indexOf('video') >= 0;
            var leavingUpload = oldLoc.section == 'upload' && !newLoc.section;

            var changedSearch = changed.q;

            // stats
            if (leavingSearch || changedSearch) {
                Video.logSearchStats();
            }
            if (startedSearch || changedSearch) {
                Video._initSearchStats(newLoc);
            } else if (leavingSearch) {
                Video._clearSearchStats();
            }

            // check if leaving this page
            if (goingToComments) {
                delete cur._back;
                return true;
            }
            if (pageChanged) {
                var oid = cur.getOwnerId();
                if (oid == vk.id && !inArray(changed[0], ['video', 'videos' + oid])) {
                    return true;
                }

                if (oid != vk.id && !inArray(changed[0], ['videos' + oid])) {
                    return true;
                }
            }

            { // switch main video tabs
                var needHardNavigation;

                if (goingToMyVideos) {
                    nav.setLoc(newLoc);
                    needHardNavigation = Video._switch('catalog', 'all');

                } else if (goingToCatalog) {
                    nav.setLoc(newLoc);
                    needHardNavigation = Video._switch('all', 'catalog');
                }

                if (needHardNavigation || leavingUpload) {
                    return true;
                }
            }

            // hide tab progress
            uiTabs.hideProgress('video_main_tabs');

            // cleanup section=all parameter (since it is default)
            if (changed.section == 'all') {
                delete newLoc.section;
            }

            // if search then save location to return back to it later
            if (startedSearch) {
                cur.videoLocBeforeSearch = oldLoc;
            }

            if (leavingSearch) {
                //cur.videoSearchStr = '';
                cur.videoSearchFilters = {};
                Video.doSearch();

                Video.inputVal(cur.searchInputEl, '');

                // if we have information about prev location state and input was explicitly cleared
                // then try to set previous state
                if (cur.videoLocBeforeSearch && (opts.fromSearch)) {
                    var prevLoc = clone(cur.videoLocBeforeSearch);
                    delete cur.videoLocBeforeSearch;
                    nav.go(prevLoc);
                    return false;
                }
            }

            // update search input according to what is in url
            if (trim(val(cur.searchInputEl)) != trim(newLoc.q || '')) {
                //val(cur.searchInputEl, trim(newLoc.q || ''));
            }

            var newSection = newLoc.section || 'all';

            if (newLoc.q) { // searching
                if (!Video.isInAlbum()) {
                    delete newLoc.section;
                }

                Video._prepareSearchFilters(newLoc);

                if (!opts.fromSearch) {
                    Video.inputVal(cur.searchInputEl, newLoc.q);
                }

                if (!opts.fromSearch && !opts.globalQuery) {
                    opts.globalQuery = newLoc.q;
                }

                Video.doSearch(newLoc.q, opts.globalQuery);

            } else if (Video.AVAILABLE_TABS.indexOf(newSection) != -1) { // switching to subtab

                if (Video.isInAlbum(oldLoc.section)) { // hard navigation if leaving album
                    nav.setLoc(newLoc);
                    return true;
                }

                // hide all subtabs ...
                each(Video.AVAILABLE_TABS, function(i, s) {
                    hide('video_subtab_pane_' + s);
                });

                // ... and show current one
                show('video_subtab_pane_' + newSection);

                // toggle empty placelolder
                Video.updateEmptyPlaceholder(newSection);

                // select tab
                var switchTab = domFC(ge('video_tab_' + newSection));
                switchTab && uiTabs.switchTab(switchTab, {
                    noAnim: opts.hist
                });

                var actionsWrapEl = geByClass1('video_tab_actions_wrap');
                var sortEls = [geByClass1('_video_sort_dd_wrap'), geByClass1('divider')];

                if (newSection != 'albums') {
                    Video.loadSilent(newSection); // start silent loading videos of current tab

                    cur.videoSortDD && cur.videoSortDD.select(cur.currentSortings[newSection] || 'default', true);

                    Video._toggleSorter(true);
                } else {
                    Video._toggleSorter(false);
                }

                Video._createSorters(newSection);

            } else {
                return true;
            }

            // moder acts
            if (newLoc['show_original']) {
                return true;
            }

            nav.setLoc(newLoc);
            return false;
        });

        cur.destroy.push(function() {
            cur.nav.pop();
        });
    },

    initSearch: function() {
        cur.searchInputEl = ge('video_search_input');

        function onInputChange(query, globalQuery) {
            query = trim(query);
            globalQuery = isString(globalQuery) ? trim(globalQuery) : '';
            //cur.searchText = trim(query);
            //cur.globalSearchText = trim(globalQuery);

            var filtersLoc = {};

            if (!query) {
                each(Video.SEARCH_FILTERS, function(i, sp) {
                    filtersLoc[sp] = false;
                });

                cur.videoPrevSearchFilters = clone(cur.videoSearchFilters);
                setTimeout(function() {
                    delete cur.videoPrevSearchFilters;
                }, Video.SEARCH_KEEP_FILTERS_DELAY);
            }

            if (query && cur.videoPrevSearchFilters) {
                filtersLoc = cur.videoPrevSearchFilters;
                delete cur.videoPrevSearchFilters;
            }

            nav.change(extend({
                q: query || false
            }, filtersLoc), false, {
                fromSearch: true,
                globalQuery: globalQuery
            });
        }

        function onInputBlur() {
            var text = trim(val(cur.searchInputEl));
            if (text) {
                cur.vSearchInputBlurred = true;
            }
        }

        if (cur.searchInputEl) {
            data(cur.searchInputEl, 'opts')['onChange'] = onInputChange;
            data(cur.searchInputEl, 'opts')['onBlur'] = onInputBlur;

            var oldIE = browser.msie && intval(browser.version) <= 10;
            if (!oldIE) {
                cur.searchInputEl.focus();
            }
        }
    },

    _sortVideos: function(sortType) {
        window.tooltips && tooltips.hideAll();

        var curSection = Video._getCurrentSectionType(),
            oid = cur.getOwnerId();
        if (curSection == 'album') {
            curSection = Video.getLoc().section;
        }

        var videos = cur.silentLoaded[oid][curSection];

        // clean deleted recently videos
        var removedCount = 0;
        videos = videos.filter(function(v) {
            var vid = v[VideoConstants.VIDEO_ITEM_INDEX_OWNER_ID] + '_' + v[VideoConstants.VIDEO_ITEM_INDEX_ID];
            if (cur.videoRecentlyRemoved[vid]) {
                removedCount++;
                return false;
            } else {
                return true;
            }
        });

        // and update counter
        var counters = cur.videosCount[cur.getOwnerId()];
        if (removedCount && counters) {
            if (Video.isInAlbum()) {
                var albumSection = 'album_' + Video._getSectionAlbumId();
                if (counters[albumSection]) {
                    counters[albumSection] -= removedCount;
                    val(geByClass1('_video_subtitle_counter', ge('video_layout_contents')), langNumeric(counters[albumSection], cur.lang.video_playlist_size));
                }
            } else {
                counters.all -= removedCount;
                Video.updateTabCounter(counters.all);
            }
        }

        cur.silentLoaded[oid][curSection] = videos;

        if (!videos) {
            show('video_sort_progress');
            hide('video_sort_dd');
            Video._addPendingAction(curSection, function() {
                Video._sortVideos(sortType);
            });

            return;
        }

        hide('video_sort_progress');
        show('video_sort_dd');

        clearTimeout(cur._sortTO);
        cur._sortTO = setTimeout(function() {
            if (!videos.length) return;

            videos.sort(function(a, b) {
                switch (sortType) {
                    case 'default':
                        return a[cur.indexIndex] - b[cur.indexIndex];
                    case 'new':
                        return b[VideoConstants.VIDEO_ITEM_INDEX_DATE] - a[VideoConstants.VIDEO_ITEM_INDEX_DATE];
                    case 'old':
                        return a[VideoConstants.VIDEO_ITEM_INDEX_DATE] - b[VideoConstants.VIDEO_ITEM_INDEX_DATE];
                    case 'popularity':
                        return b[VideoConstants.VIDEO_ITEM_INDEX_VIEWS] - a[VideoConstants.VIDEO_ITEM_INDEX_VIEWS];
                }
            });

            var curListEl = ge('video_' + curSection + '_list');
            curListEl.innerHTML = '';

            if (cur.videoShowWindow && cur.videoShowWindow[oid]) {
                cur.videoShowWindow[oid][curSection] = false;
            }

            Video.showMore(curSection);

            Video._reinitSorters(sortType != 'default');

            cur.currentSortings = cur.currentSortings || {};
            cur.currentSortings[curSection] = sortType;
        }, 10);
    },

    _reindex: function(videos) {
        for (var i = 0, len = videos.length; i < len; i++) {
            if (videos[i].length >= cur.indexIndex) {
                videos[i][cur.indexIndex] = i;
            } else {
                videos[i].push(i);
            }
        }
    },

    _onAlbumReorder: function(albumEl, nextAlbumEl, prevAlbumEl) {
        var aid = albumEl.getAttribute('data-id');
        var paid = prevAlbumEl ? prevAlbumEl.getAttribute('data-id') : null;
        var naid = nextAlbumEl ? nextAlbumEl.getAttribute('data-id') : null;

        ajax.post('al_video.php', {
            act: 'reorder_albums',
            oid: cur.getOwnerId(),
            aid: aid,
            before: naid,
            after: paid,
            hash: cur.videoAlbumsSortHash
        });
    },

    _onReorder: function(videoEl, nextVideoEl, prevVideoEl) {
        var oid = cur.getOwnerId();
        var vid = domData(videoEl, 'id');
        var pvid = prevVideoEl ? domData(prevVideoEl, 'id') : null;
        var nvid = nextVideoEl ? domData(nextVideoEl, 'id') : null;
        var albumId = Video._getCurrentSectionType();
        if (albumId == 'album') {
            albumId = Video.getLoc().section.split('_')[1];
        }

        // swap elements in array
        var curSection = Video._getCurrentSectionType();
        var videos = cur.silentLoaded[oid][curSection];
        if (videos) {
            var foundIndex = -1,
                foundAfter = -1;

            each(videos, function(i, v) {
                var cvid = v[VideoConstants.VIDEO_ITEM_INDEX_OWNER_ID] + '_' + v[VideoConstants.VIDEO_ITEM_INDEX_ID];
                if (cvid == vid) {
                    foundIndex = i;
                }
                if (cvid == pvid) {
                    foundAfter = i;
                }
                if (foundAfter >= 0 && foundIndex >= 0) return false;
            });

            if (foundIndex >= 0) {
                var deleted = videos.splice(foundIndex, 1)[0];
                if (foundAfter < 0) {
                    videos.unshift(deleted);
                } else {
                    if (foundAfter > foundIndex) {
                        foundAfter--;
                    }
                    videos.splice(foundAfter + 1, 0, deleted);
                }

                Video._reindex(videos);
            }
        }

        ajax.post('al_video.php', {
            act: 'reorder_videos',
            album_id: albumId,
            target_id: oid,
            vid: vid,
            before: nvid,
            after: pvid,
            hash: cur.videoSortHash
        });
    },

    /* filters */
    _prepareSearchFilters: function(loc) {
        cur.videoSearchFilters = {};
        each(Video.SEARCH_FILTERS, function(i, sp) {
            cur.videoSearchFilters[sp] = loc[sp];
        });

        return cur.videoSearchFilters;
    },
    onFilterRemoved: function(filterId) {
        Video._setFilterSelector(filterId);

        // multiple filters may be removed, so batch them
        clearTimeout(cur._frto);
        cur._frto = setTimeout(Video._onFiltersChanged, 10);
    },

    // returns [selectedId, title, isDefaultSelectedselected]
    _setFilterSelector: function(fid, fv) {
        var filterSelector = cur['videoFilter_' + fid],
            selected;

        if (!filterSelector) {
            return false;
        }

        if (filterSelector.__className == 'Selector') {
            if (fv === undefined) {
                fv = filterSelector.options.defaultItems[0][0];
            }
            filterSelector.selectItem(fv, false);

            selected = clone(filterSelector.selectedItems()[0]);
            selected.push(selected[0] == filterSelector.options.defaultItems[0][0]);

        } else if (hasClass(filterSelector, 'checkbox')) {
            toggleClass(filterSelector, 'on', !!fv);

            selected = [!!fv, data(filterSelector, 'title'), !fv];
        }

        return selected;
    },

    _onFiltersChanged: function() {
        var hd = hasClass('video_fltr_hd', 'on');
        var notsafe = hasClass('video_fltr_notsafe', 'on');
        var len = cur.videoFilter_len.selectedItems()[0][0];
        var date = cur.videoFilter_date.selectedItems()[0][0];
        var order = cur.videoFilter_order.selectedItems()[0][0];

        nav.change({
            hd: hd ? 1 : false,
            len: len > 0 ? len : false,
            date: date > 0 ? date : false,
            order: order >= 0 ? order : false,
            notsafe: notsafe ? 1 : false
        }, false, {
            filtersChanged: true
        });
    },

    initFilters: function() {
        var searchInputEl = geByClass1('video_search_input');
        if (!searchInputEl) return;

        cur.videoFilter_len = new Dropdown(ge('video_fltr_len'), cur.lenFilters, {
            big: 1,
            zeroPlaceholder: true,
            onChange: Video._onFiltersChanged
        });

        cur.videoFilter_date = new Dropdown(ge('video_fltr_date'), cur.dateFilters, {
            big: 1,
            zeroPlaceholder: true,
            onChange: Video._onFiltersChanged
        });

        cur.videoFilter_order = new Dropdown(ge('video_fltr_order'), cur.orderFilters, {
            big: 1,
            zeroPlaceholder: true,
            onChange: Video._onFiltersChanged
        });

        cur.videoFilter_hd = ge('video_fltr_hd');

        removeEvent(cur.videoFilter_hd, 'click');
        addEvent(cur.videoFilter_hd, 'click', Video._onFiltersChanged);
        data(cur.videoFilter_hd, 'title', cur.lang.video_hd_checkbox);

        cur.videoFilter_notsafe = ge('video_fltr_notsafe');

        removeEvent(cur.videoFilter_notsafe, 'click');
        addEvent(cur.videoFilter_notsafe, 'click', Video._onFiltersChanged);
        data(cur.videoFilter_notsafe, 'title', cur.lang.video_filter_no_safe);

        var q = Video.getLoc().q;
        if (q) {
            Video._prepareSearchFilters(Video.getLoc());
            cur.searchText = q;

            Video.inputVal(cur.searchInputEl, cur.searchText);

            Video.doSearch(q, q);
        }
    },

    _isGeneralSection: function(section) {
        for (var i = 0; i < Video.AVAILABLE_TABS.length; i++) {
            if (section == Video.AVAILABLE_TABS[i]) {
                return true;
            }
        }
        return false;
    },

    loadSilent: function(section) {
        section = section || 'all';

        var oid = cur.getOwnerId();
        var isAlbum = Video.isInAlbum(section);
        var isSnippetVideo = !!cur.isSnippetVideoSelection;

        if (!isAlbum && !this._isGeneralSection(section) || section == 'albums') return;

        cur.silentLoaded = cur.silentLoaded || {};
        cur.silentLoaded[oid] = cur.silentLoaded[oid] || {};

        cur.silentLoadingProgress = cur.silentLoadingProgress || {};
        cur.silentLoadingProgress[oid] = cur.silentLoadingProgress[oid] || {};

        var silentProgress = cur.silentLoadingProgress[oid][section];

        if (silentProgress === true) { // silent load in progress
            return;
        }

        if (!cur.pageVideosList || !cur.pageVideosList[oid]) { // means render of videos page doesn't even ended, so no need to silent load yet
            return;
        }

        if (silentProgress === false) { // silent load already done
            Video._callPendingAction(section);
            return;
        }

        if (typeof silentProgress == 'undefined') {
            cur.silentLoadingProgress[oid][section] = true;

            (function(section) {
                function onLoad(videos, albums) {
                    if (!cur.silentLoadingProgress || !cur.silentLoadingProgress[oid]) return; // seems that we navigated away

                    cur.silentLoadingProgress[oid][section] = false;

                    if (videos) {
                        if (videos.length) {
                            cur.indexIndex = videos[0].length;
                        }

                        Video._reindex(videos);

                        cur.silentLoaded[oid][section] = videos;
                    }

                    if (albums) {
                        cur.albumsPreload[oid] = false; // dont need any more
                        cur.silentLoaded[oid]['albums'] = albums;
                    }

                    Video.indexItems(function() {
                        if (!cur.silentLoadingProgress) return; // seems that we navigated away

                        Video._callPendingAction(section);

                        if (albums) {
                            Video._callPendingAction('albums');
                        }

                        Video.showMore(section);
                    });
                }

                var pageVideosList = cur.pageVideosList[oid][section]; // videos that was loaded with page

                var hasAllVideosAlready = pageVideosList ? cur.videosCount[oid][section] <= pageVideosList.list.length : false;
                var hasAllAlbumsAlready = isAlbum ? true : cur.albumsPreload && cur.playlistsCount <= cur.albumsPreload[oid].length;

                if (hasAllAlbumsAlready) {
                    cur.silentLoaded[oid]['albums'] = cur.albumsPreload[oid];
                }

                if (hasAllVideosAlready && hasAllAlbumsAlready) {
                    onLoad(cur.pageVideosList[oid][section].list, cur.albumsPreload[oid]);
                } else if (cur.noVideos) {
                    onLoad([], []);
                } else {
                    function onAllChunksLoaded() {
                        var videos = [].concat.apply([], loadedVideos);
                        onLoad(videos, loadedAlbums);
                    }

                    if (!cur.videosCount || !cur.videosCount[oid]) {
                        return onLoad([], []);
                    }

                    var chunkSize = cur.VIDEO_SILENT_VIDEOS_CHUNK_SIZE;
                    var estimatedCount = cur.videosCount[oid][section];

                    var chunksCount = Math.ceil(estimatedCount / chunkSize);
                    var loadHub = new callHub(onAllChunksLoaded, chunksCount);
                    var loadedVideos = new Array(chunksCount);
                    var loadedAlbums = [];

                    if (chunksCount == 0) {
                        return onLoad([], []);
                    }

                    for (var chunkIndex = 0; chunkIndex < chunksCount; chunkIndex++) {
                        (function(index) {
                            ajax.post('/al_video.php', {
                                act: 'load_videos_silent',
                                oid: oid,
                                section: section,
                                rowlen: Video.VIDEOS_PER_ROW,
                                offset: index * chunkSize,
                                snippet_video: (isSnippetVideo ? 1 : 0),
                                need_albums: intval(!hasAllAlbumsAlready && (section == 'all') && intval(index == 0))
                            }, {
                                onDone: function(videos, albums) {
                                    if (videos && videos[section] && videos[section].list) {
                                        loadedVideos[index] = videos[section].list;
                                    } else {
                                        loadedVideos[index] = [];
                                    }

                                    if (index == 0) {
                                        loadedAlbums = albums;
                                    }

                                    loadHub.done();
                                }
                            });
                        })(chunkIndex);
                    }
                }
            })(section);
        }
    },

    indexItems: function(cb) {
        if (!cur.getOwnerId) {
            return;
        }

        var indexesNeeded = 0,
            oid = cur.getOwnerId();

        cur.videoIndexes = cur.videoIndexes || {};
        cur.videoIndexes[oid] = cur.videoIndexes[oid] || {};

        each(cur.silentLoaded[oid], function(type, items) {
            if (!cur.videoIndexes[oid][type]) {
                indexesNeeded++;
            }
        });

        var hub = new callHub(cb, indexesNeeded);

        each(cur.silentLoaded[oid], function(type, items) {
            if (!cur.videoIndexes[oid][type]) {
                cur.videoIndexes[oid][type] = new vkIndexer(items, function(item) {
                    return type == 'albums' ? item[0] : item[VideoConstants.VIDEO_ITEM_INDEX_TITLE];
                }, function() {
                    hub.done();
                });
            }
        });
    },

    _updateSearchPageTitle: function(searchStr) {
        if (!!curBox()) return;

        if (!searchStr) {
            if (cur.prevVideoPageTitle) {
                setDocumentTitle(cur.prevVideoPageTitle);
            }
        } else {
            if (!cur.prevVideoPageTitle) {
                cur.prevVideoPageTitle = document.title;
            }
            setDocumentTitle(getLang('video_title_search').replace('{q}', searchStr));
        }
    },

    inputVal: function(inputEl, v) {
        if (val(inputEl) == v) {
            return
        }

        val(inputEl, v);

        var wrapEl = gpeByClass('_wrap', inputEl);
        toggleClass(wrapEl, 'ui_search_field_empty', !v);
    },

    doSearch: function(searchStr, globalSearchStr) {
        if (!cur.searchInputEl) {
            return;
        }

        var localSearchQuery = cur.videoLocalSearchQuery = trim(searchStr);
        var globalSearchQuery = cur.videoGlobalSearchQuery = trim(globalSearchStr);

        // update filters ui
        each(Video.SEARCH_FILTERS, function(i, fid) {
            var selected = Video._setFilterSelector(fid, cur.videoSearchFilters[fid]);
            selected && uiSearch.toggleFilter(cur.searchInputEl, fid, selected[1], !selected[2]);
        });

        // dont show empty local results placeholder
        cur.noEmptyLocalResults = Video.isInCatalog();

        // show/hide progress
        Video._toggleSearchProgress(!!localSearchQuery);

        // hide current search panels
        var panelsToHide = [Video.VIDEO_SEARCH_TYPE, Video.ALBUM_SEARCH_TYPE, Video.ALBUM_GLOBAL_SEARCH_PROMO_PLAYLISTS_TYPE, Video.VIDEO_GLOBAL_SEARCH_TYPE /*keep it last (see below)*/ ];
        if (Video.isInSearch() && cur.noEmptyLocalResults) {
            panelsToHide.pop();
        }

        // hide search panels
        each(panelsToHide, function(i, type) {
            hide('video_subtab_pane_' + type);
        });

        toggle('videocat_other_blocks', Video.isInCatalog() && !searchStr);

        if (!localSearchQuery) {
            // switch to main layout
            Video._toggleSearchContent(false);
        }

        if (curBox()) {
            ge('box_layer_wrap').scrollTop = 0;
        } else {
            scrollToTop(1000);
        }

        // search in particular album or all videos
        var isAlbum = Video.isInAlbum();
        var searchInSection = isAlbum ? Video.getLoc().section : 'all';

        // reset pending actions for previous searches
        Video._clearPendingAction(searchInSection);

        Video._updateSearchPageTitle(localSearchQuery);

        if (localSearchQuery) {
            Video._addPendingAction(searchInSection, function() { // wait for videos been loaded
                // first need local search
                var foundCount = Video._searchLocally(localSearchQuery);
                if (globalSearchStr && foundCount && cur.lastProcessedSearchText !== searchStr) {
                    cur.lastProcessedSearchText = searchStr;
                    saveSearchAttemptStats('video', 0, foundCount);
                }
                // next need global
                if (foundCount < 15) {
                    Video._searchGlobally(globalSearchQuery);
                }

                Video._toggleSearchProgress(false);
            });

            // load videos (if they not already loaded)
            Video.loadSilent(searchInSection);

            // init global search while silent is in progress
            // (anyway, global results will be rendered after local results will be available)
            Video._searchGlobally(globalSearchQuery);
        }
    },

    _toggleSearchProgress: function(isLoading) {
        cur.searchProgressRef = cur.searchProgressRef || 0;
        cur.searchProgressRef = Math.max(0, cur.searchProgressRef + (isLoading ? 1 : -1));

        isLoading = cur.searchProgressRef > 0;

        var filtersPanel = geByClass1('ui_search_fltr_control', geByClass1('video_search_input'));
        var progressEl = geByClass1('ui_search_fltr_progress', filtersPanel);
        toggle(progressEl, isLoading);

        if (!hasClass(filtersPanel, 'shown')) {
            toggleClass(gpeByClass('_wrap', cur.searchInputEl), 'ui_search_loading', isLoading);
        }
    },

    _buildFiltersSearchStr: function() {
        var str = [];
        each(cur.videoSearchFilters || {}, function(fn, fv) {
            fv && str.push(fn + ':' + fv);
        });
        return '$' + str.join('#');
    },

    _searchGlobally: function(searchText, offset) {
        if (!searchText) {
            return;
        }

        offset = intval(offset);

        var isNext = offset > 0;
        var ts = +new Date();

        cur.globalSearchResults = cur.globalSearchResults || {};

        var resKey = searchText + Video._buildFiltersSearchStr();
        if (!isNext && cur.globalSearchResults[resKey]) {
            if (cur.lastProcessedSearchText !== searchText) {
                cur.lastProcessedSearchText = searchText;
                saveSearchAttemptStats('video', ts, cur.globalSearchResults[resKey].count);
            }

            Video._showGlobalSearchResults(searchText);
            return;
        }

        if (cur.globalSearchInProgress == searchText) return;
        cur.globalSearchInProgress = searchText;

        !isNext && Video._toggleSearchProgress(true);

        var isSnippetVideo = !!cur.isSnippetVideoSelection;

        var requestParams = {
            act: 'search_video',
            q: searchText,
            offset: offset || 0,
            from: cur.oid,
        };
        if (isSnippetVideo) {
            requestParams.snippet_video = 1;
        }

        ajax.post('/al_video.php', extend(requestParams, cur.videoSearchFilters), {
            onDone: function(count, countHash, data, noMore, promoPlaylists, realOffset) {
                if (!offset && cur.lastProcessedSearchText !== searchText) {
                    cur.lastProcessedSearchText = searchText;
                    saveSearchAttemptStats('video', ts, count);
                }
                cur.globalSearchInProgress = false;

                !isNext && Video._toggleSearchProgress(false);

                if (curBox()) {
                    promoPlaylists = false;
                }

                { // merge it with existing data ...
                    cur.globalSearchResults[resKey] = cur.globalSearchResults[resKey] || {
                        count: 0,
                        countHash: countHash,
                        list: [],
                        realOffset: 0,
                        promoPlaylists: promoPlaylists
                    };

                    var gsr = cur.globalSearchResults[resKey];
                    gsr.done = gsr.done || !data.list || data.list.length == 0;

                    var prevCount = gsr.list.length;

                    if (!gsr.done) {
                        // remove duplicates ...
                        var firstVideo = data.list[0],
                            duplicateOffset = 0;
                        for (var i = gsr.list.length - 1; i >= 0; i--) {
                            var offset = gsr.list.length - i;
                            if (offset > 20) break;
                            var v = gsr.list[i];
                            if (firstVideo[0] == v[0] && firstVideo[1] == v[1]) {
                                duplicateOffset = offset;
                                break;
                            }
                        }

                        gsr.count = parseInt(count);
                        Array.prototype.push.apply(gsr.list, data.list.slice(duplicateOffset));

                        var toBeDeleted = gsr.list.length % Video.VIDEOS_PER_ROW;
                        if (count > Video.VIDEOS_PER_PAGE && toBeDeleted && gsr.list.length < gsr.count) {
                            gsr.list.splice(-toBeDeleted, Video.VIDEOS_PER_ROW);
                            realOffset -= toBeDeleted;
                        }
                        gsr.realOffset = realOffset;
                    }
                }

                if (noMore || !gsr.done && gsr.list.length == prevCount) { // no real changes
                    gsr.done = true;
                }

                Video._showGlobalSearchResults(searchText, isNext);
            }
        });
    },

    _toggleEmptySearchPlaceholder: function(doShow, searchText, noEmpty) {
        var placeholderEl = ge('video_empty_placeholder_search');
        var langKey = cur.getOwnerId() < 0 ? 'video_not_found_group' : 'video_not_found_user';
        if (cur.getOwnerId() == vk.id) langKey = 'video_not_found_yours';
        if (Video.isInAlbum()) langKey = 'video_not_found_in_album';
        if (Video.isInCatalog()) langKey = 'video_not_found_globally';

        if (searchText) {
            placeholderEl.innerHTML = getLang(langKey).replace('{searchText}', '<b>' + clean(searchText.replace(/\$/g, '$$$$')) + '</b>');
        }
        toggle(placeholderEl, doShow);

        // prevent layout be empty (ne krasivo)
        if (noEmpty) {
            var emptyLayout = true;
            var searchLayout = ge('video_layout_search');
            each(domChildren(searchLayout), function() {
                if (isVisible(this)) {
                    emptyLayout = false;
                    return false;
                }
            })
            if (emptyLayout) {
                toggle(placeholderEl, true);
            }
        }
    },

    _toggleEmptyPlaceholder: function(doShow, langKey) {
        var placeholderEl = ge('video_empty_placeholder_main');
        if (doShow && placeholderEl) {
            placeholderEl.innerHTML = getLang(langKey);
        }
        toggle(placeholderEl, doShow);
    },

    _showSearchResult: function(type) {
        var found = cur.found[type],
            oid = cur.getOwnerId();

        toggle('video_subtab_pane_' + type, !!found.count);

        if (found.count) {
            var headerLang = '',
                langType;
            switch (type) {
                case Video.ALBUM_SEARCH_TYPE:
                    langType = 'albums';

                case Video.VIDEO_SEARCH_TYPE:
                    langType = langType || 'videos';

                    if (Video.isInAlbum()) {
                        headerLang = cur.lang['video_found_' + langType + '_in_album'];
                    } else if (cur.getOwnerId() < 0) {
                        headerLang = cur.lang['video_found_' + langType + '_community'];
                    } else if (cur.getOwnerId() == vk.id) {
                        headerLang = cur.lang['video_found_' + langType + '_yours'];
                    } else {
                        headerLang = cur.lang['video_found_' + langType + '_of'];
                    }
                    break;

                case Video.VIDEO_GLOBAL_SEARCH_TYPE:
                    headerLang = cur.lang.video_found_videos_global;
                    break;

                case Video.ALBUM_GLOBAL_SEARCH_PROMO_PLAYLISTS_TYPE:
                    headerLang = getLang('video_search_promo_playlists');
                    break;
            }

            headerLang = langNumeric(found.count, headerLang, true);
            headerLang = headerLang.replace('{user}', cur.lang.video_owner_name_gen);

            var headerEl = geByClass1('video_subtitle', ge('video_subtab_pane_' + type));
            val(headerEl, headerLang);

            // dont rerender same results
            var searchQuery = type == Video.VIDEO_GLOBAL_SEARCH_TYPE ? cur.videoGlobalSearchQuery : cur.videoLocalSearchQuery;
            searchQuery += Video._buildFiltersSearchStr();

            cur._videoRenderedSearchResults = cur._videoRenderedSearchResults || {};
            var rendered = cur._videoRenderedSearchResults;

            if (rendered[type] != searchQuery) {
                rendered[type] = searchQuery;

                ge('video_' + type + '_list').innerHTML = '';

                if (cur.videoShowWindow && cur.videoShowWindow[oid]) {
                    delete cur.videoShowWindow[oid][type];
                }
                Video.showMore(type);
            }
        }
    },

    _showGlobalSearchResults: function(searchText, moreLoaded) {
        var resKey = searchText + Video._buildFiltersSearchStr();

        var oid = cur.getOwnerId();
        var section = Video.isInAlbum() ? Video.getLoc().section : 'all';

        var localSearchDone = !!cur.silentLoaded[oid][section];
        var isActualSearchQuery = searchText == cur.videoGlobalSearchQuery || searchText == cur.videoLocalSearchQuery;

        if (isActualSearchQuery && localSearchDone && cur.globalSearchResults[resKey] && cur.globalSearchResults[resKey].count >= 0) { // ensure that received data is still actual ...

            var globalResults = cur.globalSearchResults[resKey];
            cur.found[Video.VIDEO_GLOBAL_SEARCH_TYPE] = {
                list: globalResults.list,
                count: globalResults.count,
                done: globalResults.done,
                realOffset: globalResults.realOffset
            };

            cur.found[Video.ALBUM_GLOBAL_SEARCH_PROMO_PLAYLISTS_TYPE] = {
                list: globalResults.promoPlaylists,
                count: globalResults.promoPlaylists.length,
                done: true
            };

            if (cur.noEmptyLocalResults) {
                Video._toggleSearchContent(true);
                if (globalResults.count == 0) {
                    Video._toggleEmptySearchPlaceholder(true, searchText);
                } else {
                    Video._toggleEmptySearchPlaceholder(false);
                }
            }

            if (!moreLoaded) {
                Video._showSearchResult(Video.ALBUM_GLOBAL_SEARCH_PROMO_PLAYLISTS_TYPE);
                Video._showSearchResult(Video.VIDEO_GLOBAL_SEARCH_TYPE);
            }

            Video._callPendingAction(Video.VIDEO_GLOBAL_SEARCH_TYPE);
        }
    },

    _toggleSearchContent: function(switchToSearch) {
        toggle('video_layout_contents', !switchToSearch);
        toggle('video_layout_search', !!switchToSearch);
    },

    _searchLocally: function(searchText) {
        cur.found = {};

        if (!searchText || !cur.videoIndexes) return false;

        var oid = cur.getOwnerId();
        var foundVideos = [],
            foundAlbums = [];

        // 1. search albums
        if (!Video.isInAlbum() && cur.videoIndexes[oid]['albums']) {
            foundAlbums = cur.videoIndexes[oid]['albums'].search(searchText);

            cur.found[Video.ALBUM_SEARCH_TYPE] = {
                list: foundAlbums,
                count: foundAlbums.length
            };

            Video._showSearchResult(Video.ALBUM_SEARCH_TYPE);
        }

        // 2. search videos
        var searchInSection = Video.isInAlbum() ? Video.getLoc().section : 'all';
        if (cur.videoIndexes[oid][searchInSection]) {
            var foundVideosFromIndex = cur.videoIndexes[oid][searchInSection].search(searchText);

            // apply filters
            each(foundVideosFromIndex, function(i, video) {
                if (cur.videoSearchFilters.hd && !(video[VideoConstants.VIDEO_ITEM_INDEX_FLAGS] & VideoConstants.VIDEO_ITEM_FLAG_HD)) return;

                if ((vkNow() / 1000 - video[VideoConstants.VIDEO_ITEM_INDEX_DATE]) > cur.videoSearchFilters.date) return;

                foundVideos.push(video);
            });

            cur.found[Video.VIDEO_SEARCH_TYPE] = {
                list: foundVideos,
                count: foundVideos.length
            };

            Video._showSearchResult(Video.VIDEO_SEARCH_TYPE);
        }

        var totalFoundObjects = foundAlbums.length + foundVideos.length;

        if (!totalFoundObjects) {
            if (cur.noEmptyLocalResults) { // searching in catalog, so no need to show empty local results
                // layout switch and placeholder will be show at global results search
                Video._toggleEmptySearchPlaceholder(false, (void 0), true);
            } else {
                Video._toggleSearchContent(true);
                Video._toggleEmptySearchPlaceholder(true, searchText);
            }

        } else {
            Video._toggleSearchContent(true);
            Video._toggleEmptySearchPlaceholder(false);
        }

        return foundVideos ? foundVideos.length : 0;
    },

    onItemEnter: function(titleEl) {
        setTitle(titleEl, titleEl, titleEl.innerHTML.replace(/<\/?em>/g, ''));
    },

    showMoreAlbums: function(btn) {
        var needReset = false,
            oid = cur.getOwnerId();

        if (cur.albumsPreload && cur.albumsPreload[oid] && !cur.silentLoaded[oid].albums) {
            cur.silentLoaded[oid].albums = cur.albumsPreload[oid];
            needReset = true;
        }

        cur.albumsShowingAll[oid] = true;

        Video.showMore('albums', btn);

        if (needReset) {
            cur.silentLoaded[oid].albums = false;
        }
    },

    prepareVideoItemAttrs: function(video) {
        var cls = attrs = '';

        { // classes
            var flagToCls = {};

            // keep in sync with video.helper.php hVideoPrepareItemHtmlAttributes
            flagToCls[VideoConstants.VIDEO_ITEM_FLAG_EXTERNAL] = 'video_ext';
            flagToCls[VideoConstants.VIDEO_ITEM_FLAG_ACTIVE_LIVE] = 'video_active_live';
            flagToCls[VideoConstants.VIDEO_ITEM_FLAG_CAN_EDIT] = 'video_can_edit';
            flagToCls[VideoConstants.VIDEO_ITEM_FLAG_CAN_ADD] = 'video_can_add';
            flagToCls[VideoConstants.VIDEO_ITEM_FLAG_CAN_DELETE] = 'video_can_delete';
            flagToCls[VideoConstants.VIDEO_ITEM_FLAG_PRIVATE] = 'video_private';
            flagToCls[VideoConstants.VIDEO_ITEM_FLAG_NO_AUTOPLAY] = 'video_nap';
            flagToCls[VideoConstants.VIDEO_ITEM_FLAG_ADDED] = 'video_added';
            flagToCls[VideoConstants.VIDEO_ITEM_FLAG_SKIP_THUMB_LOAD] = 'video_skip_thumb_load';

            var videoFlags = video[VideoConstants.VIDEO_ITEM_INDEX_FLAGS];

            each(flagToCls, function(bit, c) {
                if (videoFlags & bit) {
                    cls += c + ' ';
                }
            });

            if (!video[VideoConstants.VIDEO_ITEM_INDEX_PLATFORM] && !video[VideoConstants.VIDEO_ITEM_INDEX_DURATION] && !(videoFlags & VideoConstants.VIDEO_ITEM_FLAG_ACTIVE_LIVE)) {
                cls += ' video_no_duration';
            }

            var notOwner = !(videoFlags & VideoConstants.VIDEO_ITEM_FLAG_CAN_EDIT) && !(videoFlags & VideoConstants.VIDEO_ITEM_FLAG_CAN_DELETE);
            var isBlocked = video[VideoConstants.VIDEO_ITEM_INDEX_BLOCKED];
            var noActions = !(videoFlags & VideoConstants.VIDEO_ITEM_FLAG_CAN_ADD);
            if (notOwner && (isBlocked || noActions)) {
                cls += ' video_no_actions';
            }

            if (isBlocked) {
                cls += ' video_blocked';
            }

            if (cur.videoCanAddAlbums) {
                cls += ' video_can_edit_albums';
            }

            if (cur.isSnippetVideoSelection) {
                cls += ' no_video_select_btn';
            }
        }

        { // attrs
            if (videoFlags & VideoConstants.VIDEO_ITEM_FLAG_NEED_SIGN_IN) {
                attrs += ' rel="nofollow"';
            }
        }

        return [cls, attrs];
    },

    buildVideoEl: function(video) {
        var tpl = trim(cur.videoItemTpl);
        video = clone(video);

        video[VideoConstants.VIDEO_ITEM_INDEX_VIEWS] = langNumeric(video[VideoConstants.VIDEO_ITEM_INDEX_VIEWS], cur.lang.video_N_views_list, true);
        video[VideoConstants.VIDEO_ITEM_INDEX_DATE] = Video.getFormattedUpdatedTime(video[VideoConstants.VIDEO_ITEM_INDEX_DATE]);
        if (video[VideoConstants.VIDEO_ITEM_INDEX_FLAGS] & VideoConstants.VIDEO_ITEM_FLAG_ACTIVE_LIVE) {
            video[VideoConstants.VIDEO_ITEM_INDEX_DURATION] = '<span class="video_thumb_label_live_icon"></span>';
        }

        var clsAndAttrs = Video.prepareVideoItemAttrs(video);

        var el = rs(tpl, video);
        el = el.replace('%classes%', clsAndAttrs[0]).replace('%attrs%', clsAndAttrs[1]);
        el = se(el);

        return el;
    },

    buildPlaylistEl: function(playlist) {
        var tpl = trim(cur.albumItemTpl);
        return se(rs(tpl, playlist));
    },

    onMoreLoaded: function(btn, type, data, newOffset, noMore) {
        Video._loading = false;

        var oid = cur.getOwnerId();
        var loaded = cur.videoShowWindow[oid][type];
        var contEl = ge('video_' + type + '_list'),
            itemEl;

        if (contEl) {
            btn = geByClass1('ui_load_more_btn', gpeByClass('ge_video_pane', contEl));

            var isAlbumRendering = type.indexOf('albums') >= 0;
            var titleIndex = isAlbumRendering ? 0 : 3;

            var section = Video._getCurrentSectionType();
            section = section == 'album' ? Video.getLoc().section : 'all';

            var selectRegex = false;
            if (type.indexOf('search') >= 0 && cur.searchText) {
                selectRegex = new RegExp('(' + cur.searchText.replace(/\|/g, '').replace(cur.videoIndexes[oid][section].delimiter, '|').replace(/^\||\|$/g, '').replace(/([\+\*\)\(])/g, '\\$1') + ')', 'gi');
            }

            for (var i = 0, len = data.length; i < len; i++) {
                var item = extend({}, data[i]);

                if (selectRegex) {
                    item[titleIndex] = item[titleIndex].replace(selectRegex, '<em>$1</em>');
                }

                if (isAlbumRendering) {
                    itemEl = Video.buildPlaylistEl(item);
                } else {
                    itemEl = Video.buildVideoEl(item);
                }

                if (type == Video.VIDEO_GLOBAL_SEARCH_TYPE) {
                    itemEl.setAttribute('data-search-pos', i + loaded.offset);
                }

                contEl.appendChild(itemEl);
            }

            loaded.offset = newOffset;

            loaded.done = !data.length || noMore;
            toggle(btn, !loaded.done);

            if (type == Video.VIDEO_GLOBAL_SEARCH_TYPE) {
                if (!cur.videoSearchStats) {
                    Video._initSearchStats(Video.getLoc());
                }

                cur.videoSearchStats.lastActionTime = new Date().getTime();
                Video._updateLastSeenElement(contEl);
            }
        }
    },

    showMore: function(type, btn) {
        type = type || Video._getCurrentSectionType();

        var parentNode = curBox() ? curBox().bodyNode : undefined;
        var contEl = geByClass1('_video_' + type + '_list', parentNode);

        if (!contEl) return;

        var isAlbum = Video.isInAlbum(type),
            oid = cur.getOwnerId();
        if ((isAlbum || Video.AVAILABLE_TABS.indexOf(type) != -1) && !cur.silentLoaded[oid][type]) {

            if (!isButtonLocked(btn)) {
                Video._addPendingAction(type, function() {
                    Video.showMore(type, btn);
                });

                lockButton(btn);
            }

            return;
        }

        unlockButton(btn);

        cur.videoShowWindow = cur.videoShowWindow || {};
        cur.videoShowWindow[oid] = cur.videoShowWindow[oid] || {};

        if (!cur.videoShowWindow[oid][type]) {
            cur.videoShowWindow[oid][type] = {
                done: false,
                offset: contEl.children.length
            };
        }

        var videoShowWindow = cur.videoShowWindow[oid][type];
        if (!videoShowWindow.done) {
            if (type.indexOf('search') >= 0 && cur.found[type]) {
                var newOffset, realOffset, data, noMore;

                if (type == Video.VIDEO_GLOBAL_SEARCH_TYPE) {
                    newOffset = cur.found[type].list.length;
                    realOffset = cur.found[type].realOffset || newOffset;
                    data = cur.found[type].list.slice(videoShowWindow.offset, newOffset);
                    noMore = cur.found[type].done;

                    if (!noMore && data.length == 0) { // still waiting for next chunk of data
                        Video._addPendingAction(type, function() {
                            Video.showMore(type, btn);
                        });
                        lockButton(btn);

                        if (!cur.globalSearchInProgress) {
                            Video._searchGlobally(cur.videoGlobalSearchQuery, realOffset);
                        }
                        return;
                    }
                } else {
                    newOffset = videoShowWindow.offset + Video.VIDEOS_PER_PAGE;
                    data = cur.found[type].list.slice(videoShowWindow.offset, newOffset);
                    noMore = newOffset >= cur.found[type].list.length;
                }

                Video.onMoreLoaded(btn, type, data, newOffset, noMore);

            } else if (isAlbum || Video.AVAILABLE_TABS.indexOf(type) != -1) {
                if (cur.silentLoaded[oid][type]) {
                    var items = cur.silentLoaded[oid][type];
                    var newOffset = Math.min(items.length, videoShowWindow.offset + Video.VIDEOS_PER_PAGE);
                    var data = items.slice(videoShowWindow.offset, newOffset);
                    var noMore = false;

                    if (type == 'albums' && cur.albumsPreload[oid]) {
                        noMore = cur.albumsNoMore;
                        cur.albumsPreload[oid] = false;
                    } else {
                        noMore = newOffset >= items.length;
                    }

                    if (type == 'albums') {
                        cur.albumsShowingAll[oid] = !noMore;
                    }

                    Video.onMoreLoaded(btn, type, data, newOffset, noMore);
                }
            }
        }

        Video._updateThumbsInView();
    },

    isInAlbum: function(section) {
        return (section || Video.getLoc().section || '').indexOf('album_') === 0;
    },

    isInSearch: function() {
        return !!Video.getLoc().q;
    },

    _getSectionAlbumId: function() {
        var section = Video.getLoc().section || 'all';
        switch (section) {
            case 'all':
                return -2;
            case 'uploaded':
                return -1;
            default:
                return section.split('_')[1];
        }
    },

    isInCatalog: function(loc) {
        loc = loc || Video.getLoc();
        return loc[0] == 'video' && !loc.section;
    },

    _getCurrentSectionType: function() {
        if (cur.videoForcedSection) {
            return cur.videoForcedSection;
        } else if (Video.isInCatalog()) {
            return 'catalog';
        } else if (Video.isInAlbum(Video.getLoc().section)) {
            return 'album';
        } else {
            return Video.getLoc().section || 'all';
        }
    },

    onScroll: function() {
        var curSection;

        if (cur.getOwnerId && cur.albumsShowingAll[cur.getOwnerId()]) {
            curSection = 'albums';
        } else {
            curSection = Video._getCurrentSectionType();

            if (Video.getLoc().q || curSection == 'search' /*from choose box*/ ) {
                if (isVisible(gpeByClass('ge_video_pane', 'ui_search_global_videos_load_more'))) {
                    curSection = Video.VIDEO_GLOBAL_SEARCH_TYPE;
                } else {
                    curSection = Video.VIDEO_SEARCH_TYPE;
                }
            } else if (curSection == 'album') {
                curSection = Video.getLoc().section;
            }
        }

        var parentNode = curBox() ? curBox().bodyNode : undefined;
        var curListEl = geByClass1('_video_' + curSection + '_list', parentNode);

        if (curListEl) {
            var curListPane = gpeByClass('ge_video_pane', curListEl);

            var showMoreBtnEl = geByClass1('ui_load_more_btn', curListPane);
            if (showMoreBtnEl) {
                var ch = clientHeight(),
                    scroll = scrollGetY(),
                    btnPos = getXY(showMoreBtnEl);
                if ((scroll + ch) > (btnPos[1] - ch / 2)) {
                    Video.showMore(curSection, showMoreBtnEl);
                }
            }

            if (curSection == Video.VIDEO_GLOBAL_SEARCH_TYPE) {
                Video._updateLastSeenElement(curListEl);
            }
        }

        Video._updateChooseFixedBottom();

        Video._updateThumbsInView();
    },

    _initScrollFixedSearch: function(doFix) {
        var searchEl = geByClass1('video_search_input');
        toggleClass(searchEl, 'video_need_fix', doFix);

        if (doFix) {
            cur.fixSearchHeaderInfo = cur.fixSearchHeaderInfo || {
                searchTop: getXY(searchEl)[1],
                mainHeaderHeight: getSize('page_header_cont')[1],
                videoContWidth: getSize(geByClass1('video_content'))[0],
            }
        }
    },

    getFormattedUpdatedTime: function(time) {
        var timeNow = intval(vkNow() / 1000);
        var diff = timeNow - time,
            timeText = '';

        function langVideoNumeric(num, words, arr) {
            if (isArray(words) && num < words.length) {
                return words[num];
            }
            return langNumeric(num, arr);
        }

        var langPrefix = 'video_added_';

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
        return timeText;
    },
    _createSorters: function(type) {
        if (!cur.videoCanSort) return;

        if (cur.videoSorter) {
            cur.videoSorter.destroy();
        }

        type = type || Video._getCurrentSectionType();
        if (type == 'album') {
            type = Video.getLoc().section;
        }

        cur.videoSorter = new GridSorter(ge('video_' + type + '_list'), 'video_item_thumb', {
            onReorder: Video._onReorder,
            onDragOverElClass: 'video_playlist_item',
            onDragLeave: function(overEl, dragEl) {
                removeClass(overEl, 'video_on_drag_over');
                removeClass(dragEl, 'video_on_drag_over');
            },
            onDragEnter: function(overEl, dragEl) {
                addClass(overEl, 'video_on_drag_over');
                addClass(dragEl, 'video_on_drag_over');
            },
            onDragDrop: function(overEl, dragEl) {
                var vid = attr(dragEl, 'data-id').split('_');
                var aid = attr(overEl, 'data-id');

                ajax.post('/al_video.php', {
                    act: 'a_add_to_playlist',
                    oid: vid[0],
                    vid: vid[1],
                    gid: cur.getOwnerId() < 0 ? -cur.getOwnerId() : 0,
                    add: 1,
                    playlist_id: aid,
                    own: 1,
                    hash: cur.videoAddToPlaylistOwnHash
                }, {
                    onDone: function(playlistsIds, playlists) {
                        if (playlists && playlists[aid]) {
                            var playlistEl = Video.buildPlaylistEl(playlists[aid]);
                            domPN(overEl).replaceChild(playlistEl, overEl);
                            Video._reinitSorters();
                            cur.albumsSorter.update();
                        }
                    }
                });

                return true; // cancel drag
            }
        });
    },

    _reinitSorters: function(disable) {
        if (!cur.videoCanSort) return;

        clearTimeout(cur._rsto);
        cur._rsto = setTimeout(function() {
            if (cur.videoSorter) {
                if (disable) {
                    cur.videoSorter.disable();
                } else {
                    cur.videoSorter.enable();
                }
            } else {
                Video._createSorters();
            }
        });
    },

    _saveHistoryAction: function(videoOwnerId, videoId) {
        if (Video.isInSearch() && cur.videoGlobalSearchQuery) {
            var globalKey = cur.videoGlobalSearchQuery + Video._buildFiltersSearchStr();
            var globalRes = cur.globalSearchResults[globalKey];

            if (globalRes && !cur.videoSearchFilters.notsafe) {
                uiSearch.saveHistorySearch(this.searchInputEl, cur.videoGlobalSearchQuery, videoOwnerId, videoId, globalRes.count, globalRes.countHash);
            }
        }
    },

    onVideoAdd: function(ev, btn, oid, vid, hash) {
        var videoItemEl = gpeByClass('_video_item', btn),
            isAdd = intval(toggleClass(videoItemEl, 'video_added'));

        var params = {};
        if (isAdd) {
            params = {
                playlist_id: -2 // all playlist
            };
        } else {
            params = {
                playlists: 0
            };
        }

        Video._saveHistoryAction(oid, vid);

        ajax.post('/al_video.php', extend({
            act: 'a_add_to_playlist',
            oid: oid,
            vid: vid,
            add: intval(isAdd),
            hash: hash
        }, params), {
            onFail: function() {
                if (isAdd) {
                    window.tooltips && tooltips.destroyAll();
                    removeClass(videoItemEl, 'video_added');
                }
            },
            onDone: function(playlists, affectedPlaylists, video) {
                // simple dynamic update in dom
                var isDefaultSorting = cur.currentSortings && (!cur.currentSortings['all'] || cur.currentSortings['all'] == 'default');
                var allMyListEl = cur._preloadedPages ? geByClass1('_video_list_my_all', cur._preloadedPages['all']) : false;
                var wasAlreadyInList = false;
                if (allMyListEl) {
                    var itemEl = geByClass1('ge_video_item_' + oid + '_' + vid, allMyListEl);
                    itemEl && re(itemEl);

                    wasAlreadyInList = !!itemEl;

                    if (isAdd) {
                        isDefaultSorting && allMyListEl.insertBefore(Video.buildVideoEl(video), allMyListEl.firstChild);
                    }
                }

                // in objects
                if (cur.silentLoaded && cur.silentLoaded[vk.id] && cur.silentLoaded[vk.id]['all']) {
                    var allVideos = cur.silentLoaded[vk.id]['all'];
                    if (isAdd) {
                        if (isDefaultSorting) {
                            allVideos.unshift(video);
                            Video._reindex(allVideos);
                        }
                    } else {
                        for (var i = 0, len = allVideos.length; i < len; i++) {
                            if (allVideos[i][0] == oid && allVideos[i][1] == vid) {
                                allVideos.splice(i, 1);
                                break;
                            }
                        }
                    }

                    if (cur.videosCount[vk.id]) {
                        var increment = isAdd ? 1 : -1;
                        if (increment == 1 && wasAlreadyInList) {
                            increment = 0;
                        }

                        var count = cur.videosCount[vk.id]['all'] = Math.max(0, (cur.videosCount[vk.id]['all'] || 0) + increment);

                        Video.updateTabCounter(count);
                    }
                }
            }
        });

        window.tooltips && tooltips.destroyAll(); // to reset 'add to playlist' tooltip

        return cancelEvent(ev);
    },

    updateTabCounter: function(count) {
        var allTab = ge('video_tab_all');
        if (allTab) {
            var allTabCounter = geByClass1('ui_tab_count', allTab);
            allTabCounter.innerHTML = count;
        }
    },

    onVideoMove: function(ev, btn, oid, vid, hash) {
        showBox('/al_video.php', {
            act: 'video_playlists_box',
            target_id: cur.getOwnerId(),
            oid: oid,
            vid: vid,
            hash: hash
        }, {
            dark: 1
        });

        return cancelEvent(ev);
    },

    _showProgressPanel: function(itemEl) {
        var progressEl = se('<div class="video_delete_progress _video_delete_progress"><div class="round_spinner"></div></div>');
        itemEl.appendChild(progressEl);
        return progressEl;
    },

    onVideoDelete: function(ev, btn, oid, vid, hash) {
        var itemEl = gpeByClass('_video_item', btn),
            videoId = attr(itemEl, 'data-id'),
            section = Video._getCurrentSectionType();

        addClass(itemEl, 'video_deleted');
        var progressEl = Video._showProgressPanel(itemEl);

        var playlistId = section == 'album' ? Video._getSectionAlbumId() : -2;

        if (!cur.videoRecentlyRemoved) {
            cur.videoRecentlyRemoved = {};
        }
        cur.videoRecentlyRemoved[oid + '_' + vid] = true;

        ajax.post('/al_video.php', {
            act: 'a_delete_video',
            oid: oid,
            vid: vid,
            from: cur.oid,
            pl_id: playlistId,
            hash: hash
        }, {
            onDone: function(restoreHtml) {
                re(progressEl);
                itemEl.appendChild(se(restoreHtml));

                var restoreTO = data(itemEl, 'restoreTO');
                clearTimeout(restoreTO);
                restoreTO = setTimeout(function() {
                    re(geByClass1('_video_restore_act', itemEl));
                }, 1000 * 60);
                data(itemEl, 'restoreTO', restoreTO);
            }
        });

        Video._reinitSorters(true);

        return cancelEvent(ev);
    },

    restoreVideo: function(btn, type, videoId, from, hash) {
        var itemEl = gpeByClass('_video_item', btn);
        var restoreEl = gpeByClass('_video_restore', btn);
        var progressEl = Video._showProgressPanel(itemEl);
        var section = Video._getCurrentSectionType();

        re(restoreEl);
        var playlistId = section == 'album' ? Video._getSectionAlbumId() : -2;

        ajax.post('/al_video.php', {
            act: 'a_restore_video',
            from: from,
            video_id: videoId,
            pl_id: playlistId,
            hash: hash
        }, {
            onDone: function() {
                removeClass(itemEl, 'video_deleted');
                re(progressEl);
            }
        });

        delete cur.videoRecentlyRemoved[videoId];
    },

    onVideoEdit: function(ev, btn, oid, vid, hash) {
        cur.videoEditItem = gpeByClass('video_item', btn);

        window.Videoview && Videoview.hidePlayer();
        var box = showBox('al_video.php', {
            act: 'edit_box',
            vid: vid,
            oid: oid
        }, {
            dark: 1
        });
        box.setOptions({
            onHide: function() {
                window.Videoview && Videoview.showPlayer();
            }
        });

        return cancelEvent(ev);
    },

    switchChooserToOwner: function(toOwnerId) {
        var box = curBox();
        var isSnippetVideo = !!cur.isSnippetVideoSelection;

        var boxRequestParams = {
            to_id: toOwnerId,
            switched: 1
        };
        if (isSnippetVideo) {
            boxRequestParams.snippet_video = 1;
        }

        function showCachedBox() {
            showBox('al_video.php', extend(boxRequestParams, {
                act: 'a_choose_video_box'
            }), {
                cache: 1,
                dark: 1,
                onDone: function() {
                    if (!cur.videoUploadParams.vars.is_wall_upload_allowed) {
                        re('video_choose_upload_area_wrap');
                    }
                },
            });
        }

        showBox('al_video.php', extend(boxRequestParams, {
            act: 'a_choose_video_box'
        }), {
            showProgress: box.showCloseProgress.bind(box),
            hideProgress: box.hideCloseProgress.bind(box),
            cache: 1,
            dark: 1,
            onDone: function() {
                curBox().hide();
                showCachedBox();
            },
        });
    },

    chooseBoxBack: function() {
        cur.videoChoosePrevSection = cur.videoChoosePrevSection || 'all';
        if (cur.videoChoosePrevSection.indexOf('album_') == 0) {
            cur.videoChoosePrevSection = 'albums';
        }
        nav.go('/videos?section=' + cur.videoChoosePrevSection);
    },

    initChooseBox: function(isNoteEdit, isReview, toMail, curOwnerId, defaultTitle, blockPersonal, isSnippetVideo) {
        cur.found = {};
        cur.currentSortings = {};
        cur._preloadedPages = {};
        cur.videoSearchFilters = {};
        cur.chosenVideos = [];
        cur.albumsShowingAll = {};
        cur.isNoteEdit = isNoteEdit;
        cur.videoShowWindow = {};
        cur.isSnippetVideoSelection = isSnippetVideo;

        var box = curBox();

        var oldOwner = cur.getOwnerId;
        cur.getOwnerId = function() {
            return curOwnerId;
        }
        box.setOptions({
            onHideAttempt: function() {
                cur.getOwnerId = oldOwner;
                return true;
            }
        })

        function updateBox() {
            box.setOptions({
                width: 631,
                bodyStyle: 'padding: 0',
                hideButtons: true
            });
            ge('box_layer_wrap').scrollTop = 0;
        }

        function hideAllPanes() {
            each(Video.AVAILABLE_TABS, function(i, s) {
                hide('video_subtab_pane_' + s);
            });
            hide(geByClass1('video_subtab_pane_album')); // current opened album
        }

        function showBackButton() {
            box.setOptions({
                title: '<div class="back" onclick="Video.chooseBoxBack();">' + getLang('video_choose_box_back_to_videos') + '</div>',
                bodyStyle: 'padding: 0',
                noRefreshCoords: 1
            });
        }

        function showDefaultTitle() {
            var title = defaultTitle;
            if (!blockPersonal && !isReview && cur.videoSwitchOwnerId) {
                var text = (curOwnerId == vk.id) ? getLang('video_choose_wall_to_group_videos') : getLang('video_choose_wall_to_my_videos');
                var switchOwnerId = (curOwnerId == vk.id) ? cur.videoSwitchOwnerId : vk.id;
                title += '<span class="divider">|</span><a class="toggle" onclick="Video.switchChooserToOwner(' + switchOwnerId + ')">' + text + '</a>';
            }

            if (box.getOptions().defaultTitle) {
                title = box.getOptions().defaultTitle;
            }

            box.setOptions({
                title: title,
                grey: isReview
            });
        }

        function updateCheckedVideos() {
            if (curBox()) {
                each(geByClass('video_item', curBox().bodyNode), function() {
                    var checkEl = geByClass1('media_check_btn_wrap', this);
                    var vid = this.getAttribute('data-id');
                    toggleClass(checkEl, 'checked', cur.chosenVideos.indexOf(vid) != -1);
                });
            }
        }

        cur.nav.push(function videoChooseBoxNav(changed, oldLoc, newLoc, opts) {
            if (!opts.filtersChanged && Object.keys(newLoc).length == 1 && newLoc[0] && newLoc[0].indexOf('video') != 0 && !opts.fromSearch) {
                return true;
            }

            if (changed[0] && !changed.section) {
                if (newLoc[0] != 'videos' + curOwnerId) { // prevent navigation when goiind to ALL video tab
                    return true;
                }
            }

            hide('global_prg');

            var videoTabs = geByClass1('video_default_tabs', box.bodyNode);
            var albumPane = geByClass1('video_subtab_pane_album', box.bodyNode);

            var newSection = changed.section ? changed.section : 'all';

            Video._prepareSearchFilters(newLoc);

            var q = changed.section ? '' : (newLoc.q || val(cur.searchInputEl));
            if (q) {
                if (trim(val(cur.searchInputEl)) != trim(q)) {
                    //val(cur.searchInputEl, trim(q));
                }

                newSection = 'search';

                if (!opts.fromSearch && !opts.globalQuery) {
                    opts.globalQuery = q;
                }

                Video.doSearch(q, opts.globalQuery);

                showBackButton();
                Video._updateChooseFixedBottom();

            } else {
                Video.inputVal(cur.searchInputEl, '');
                Video.doSearch('');
            }

            cur.videoForcedSection = newSection;

            if (Video.AVAILABLE_TABS.indexOf(newSection) != -1) {
                hideAllPanes();

                show('video_subtab_pane_' + newSection);
                show(videoTabs);
                hide('albumPane');

                showDefaultTitle();

                updateBox();

                cur.videoChoosePrevSection = newSection;

                if (newSection != 'albums') {
                    Video.loadSilent(newSection);
                }

                Video.updateEmptyPlaceholder(newSection);

            } else if (newSection && newSection.indexOf('album_') == 0) {
                var albumId = newSection.split('_')[1];

                showGlobalPrg(ge('video_playlist_item_' + albumId), {
                    cls: 'progress_inv_img',
                    w: 46,
                    h: 16,
                    shift: [0, -22],
                    zIndex: 1000
                });

                Video._addPendingAction(newSection, function() {
                    showBackButton();

                    hideAllPanes();
                    hide('global_prg');
                    hide(videoTabs);

                    albumPane.id = 'video_subtab_pane_' + newSection;
                    var itemsList = geByClass1('video_items_list', albumPane);
                    itemsList.id = 'video_' + newSection + '_list';
                    addClass(itemsList, '_video_' + newSection + '_list');
                    itemsList.innerHTML = '';

                    show(albumPane);

                    var oid = cur.getOwnerId();

                    cur.videoShowWindow = cur.videoShowWindow || {};
                    cur.videoShowWindow[oid] = cur.videoShowWindow[oid] || {};
                    cur.videoShowWindow[oid][newSection] = false;

                    Video.showMore(newSection, geByClass1('ui_load_more_btn', ge('video_subtab_pane_album')));

                    updateBox();
                    updateCheckedVideos();

                    Video._updateChooseFixedBottom();
                });

                cur.videoChoosePrevSection = newSection;
                Video.loadSilent(newSection);
            }

            updateCheckedVideos();
            return false;

        });

        cur.chooseVideoToMail = toMail;
        cur.isCurrentVideoLayer = true;
        Video.loadSilent();

        updateBox();
        addEvent(ge('box_layer_wrap'), 'scroll', Video.onScroll);

        var oldScroll = boxLayerWrap.scrollTop;
        elfocus(geByClass1('_scroll_node', box.bodyNode));
        boxLayerWrap.scrollTop = oldScroll;

        Video.initSearch();
        showDefaultTitle();

        if (!isReview) {
            cur.chooseVideoMedia = function(ref, videoId, dontHide) {
                var btn = ref;

                if (!hasClass(btn, 'media_check_btn_wrap')) {
                    btn = geByClass1('media_check_btn_wrap', btn);
                } else {
                    cur.cancelClick = true;
                }

                toggleClass(btn, 'checked');

                var index = 0;
                if ((index = cur.chosenVideos.indexOf(videoId)) >= 0) {
                    cur.chosenVideos.splice(index, 1);
                } else {
                    if (cur.chosenVideos.length >= 10) return;

                    cur.chosenVideos.push(videoId);
                }

                if (cur.chosenVideos.length == 1 && !dontHide) {
                    Video.doAttachSelectedVideos(ref);
                    return false;
                }

                var bottomEl = ge('video_choosebox_bottom');
                if (cur.chosenVideos.length > 0) {
                    show(bottomEl);
                    var text = cur.chooseVideoAdd ? cur.lang.video_add_videos : cur.lang.global_attach_videos;
                    val(geByClass1('video_choosebox_attach_btn', bottomEl), langNumeric(cur.chosenVideos.length, text));
                    Video._updateChooseFixedBottom();
                } else {
                    hide(bottomEl);
                }

                toggleClass(ge('video_choose_box'), 'with_bottom_fixed', isVisible(bottomEl));

                return false;
            };
        }

        window.uiScrollBox && uiScrollBox.init(curBox(), {
            onHide: function() {
                hide('global_prg');
                cur.nav.pop();
                removeEvent(ge('box_layer_wrap'), 'scroll', Video.onScroll);
                cur.isCurrentVideoLayer = false;
            }
        });
    },

    doAttachSelectedVideos: function(btn, videoIds) {
        if (hasClass(btn, 'flat_button')) {
            lockButton(btn);
        } else {
            showGlobalPrg(geByClass1('video_item_thumb_wrap', btn) || btn, {
                cls: 'progress_inv_img',
                w: 46,
                h: 16,
                zIndex: 1000
            });
        }

        var onDone = function() {
            if (hasClass(btn, 'flat_button')) {
                unlockButton(btn);
            }

            hide('global_prg');
        };

        if (cur.chooseVideoAdd) {
            return cur.chooseVideoAdd(cur.chosenVideos, '', onDone);
        }

        Video.attachVideos(cur.chosenVideos, onDone);
    },

    attachVideos: function(videos, onDone) {
        ajax.post('al_video.php', {
            act: 'a_videos_attach_info',
            to_mail: intval(cur.chooseVideoToMail),
            videos: videos.join(',')
        }, {
            onDone: function(data) {
                if (onDone) onDone();
                if (cur.isSnippetVideoSelection && cur.chooseSnippetVideo) {
                    each(data, function(vid, info) {
                        cur.chooseSnippetVideo(vid, info);
                        return false;
                    });
                    if (curBox()) {
                        curBox().hide();
                    }
                    return;
                }

                var index = 0;
                each(data, function(vid, info) {
                    if (cur.isNoteEdit && window.editorChooseVideo) {
                        window.editorChooseVideo(info.thumb, info.name, info.duration, '/video' + vid, vid);
                    } else {
                        cur.chooseMedia('video', vid, info, index, cur.chosenVideos.length > 1);
                    }

                    index++;
                });

                if (curBox() && cur.chosenVideos.length > 1) {
                    curBox().hide();
                }
            },
        });
    },

    _updateChooseFixedBottom: function() {
        var box = curBox();
        var bottomEl = ge('video_choosebox_bottom');

        if (box && bottomEl) {
            var boxLayout = gpeByClass('box_layout', box.bodyNode);
            var size = getSize(boxLayout)[1];
            var pos = getXY(boxLayout)[1] - scrollGetY();

            if ((size + pos - clientHeight()) > 0) {
                addClass(bottomEl, 'fixed');
            } else {
                removeClass(bottomEl, 'fixed');
            }
        }
    },

    _addPendingAction: function(section, func) {
        var oid = cur.getOwnerId ? cur.getOwnerId() : cur.oid;
        cur.videoPendingAction = cur.videoPendingAction || {};
        cur.videoPendingAction[oid] = cur.videoPendingAction[oid] || {};

        if (section) {
            var currFunc = cur.videoPendingAction[oid][section];
            cur.videoPendingAction[oid][section] = function() {
                func();
                currFunc && currFunc();
            };
        }
    },

    _callPendingAction: function(section) {
        Video._addPendingAction();
        var oid = Video.getCurOwnerId();

        cur.videoPendingAction[oid][section] && cur.videoPendingAction[oid][section]();
        cur.videoPendingAction[oid][section] = false;
    },

    _clearPendingAction: function(section) {
        Video._addPendingAction(); // ensure objects are exist
        var oid = Video.getCurOwnerId();
        cur.videoPendingAction[oid][section] = false;
    },

    toggleTooltip: function(ref, text) {
        showTooltip(ref, {
            appendParentCls: 'videocat_row',
            black: 1,
            text: text,
            shift: [9, 18, 3],
            needLeft: true
        });
    },
    toggleAddTooltip: function(ref, textAdd, textAdded) {
        var itemEl = gpeByClass('_video_item', ref);
        Video.toggleTooltip(ref, hasClass(itemEl, 'video_added') ? textAdded : textAdd);
    },

    show: function(e, videoId, opts, obj) {
        if (cur.articleEditorLayer) {
            return cancelEvent(e)
        }

        if (cur.isCurrentChooseVideoBox) {
            var lastEvent = window.event;
            var videoIds = videoId.split('_');
            ajax.post('al_video.php', {
                act: 'a_video_photo_sizes',
                oid: videoIds[0],
                vid: videoIds[1],
                type: cur.isCurrentChooseVideoBox
            }, {
                onDone: function() {
                    window.event = lastEvent || window.event;
                    switch (cur.isCurrentChooseVideoBox) {
                        case 'video_add':
                            cur.chooseVideoAdd(videoId, arguments[0]);
                            break;
                        case 'wiki_editor':
                            editorChooseVideo(arguments[0], arguments[1], arguments[2], 'video' + videoId, videoId);
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
        var options = extend({
            root: 1,
            autoplay: 1
        }, opts || {});
        var listId = opts ? opts.listId : '';
        if (!listId) {
            if (cur.oid < 0) {
                listId = 'club' + (-cur.oid);
            } else if (cur.pvVideoTagsShown && cur.pvShown) {
                listId = 'tag' + cur.pvVideoTagsShown;
            } else {
                listId = '';
            }
        }

        if (!options.module) {
            var module = cur.currentModule ? cur.currentModule() : cur.module;
            if (module == 'video_search' && isAncestor(obj, 'video_search_videos_list')) {
                module = 'video_search_local';
            }
            options.module = module;
        }

        if (Video.isInVideosList() && !options.playlistId) {
            var section = Video.getLoc().section || 'all';
            var match;
            if (section == 'all') {
                options.playlistId = cur.oid + '_-2';
            } else if (section == 'uploaded') {
                options.playlistId = cur.oid + '_-1';
            } else if (match = section.match(/^album_(\d+)$/)) {
                options.playlistId = cur.oid + '_' + match[1];
            }
        }

        if (Video.isInCatalog() && options.playlistId && /^cat_\d+$/.test(options.playlistId) && obj) {
            var rowEl = gpeByClass('videocat_row', obj);
            var rowType = rowEl ? rowEl.getAttribute('data-type') : '';
            rowType = intval(rowType.replace('cat_', ''));
            if (rowType && cur.moreVideosInfo[rowType]) {
                options.catLoadMore = (function(rowEl, rowType, callback) {
                    Videocat.slideLoadMore(rowEl, rowType, callback);
                }).pbind(rowEl, rowType);
            }
        }

        if (options.playlistId) {
            options.addParams = extend(options.addParams || {}, {
                playlist_id: options.playlistId,
                show_next: intval(window.VideoPlaylist && !!VideoPlaylist.getList(options.playlistId)),
                force_no_repeat: 1
            });
        }

        if (options.playlistId && /^cat_ugc_popular/.test(options.playlistId)) {
            statlogsValueEvent('videocat_popular', '', 'play');
            if (cur.popularQid) {
                options.addParams = extend(options.addParams || {}, {
                    suggestions_qid: cur.popularQid
                });
                var videoItem = domPN(obj);
                var popularItems = geByClass('video_item', ge('videocat_page_block_ugc_popular'));
                var pos = indexOf(popularItems, videoItem) + 1;
                vkImage().src = '//go.imgsmail.ru/vk?pxn=vic&qid=' + cur.popularQid + '&vid=' + videoId + '&p=' + pos + '&t=0';
            }
        }

        if (cur.videoSearchStats) {
            var parentContainer = domClosest('video_item', obj);
            if (parentContainer && parentContainer.hasAttribute('data-search-pos')) {
                cur.videoSearchPos = parseInt(parentContainer.getAttribute('data-search-pos'));

                // A user could click the video whose thumbnail is barely seen on the screen.
                // But we need to take this video into account, as long as user noticed it.
                if (cur.videoSearchPos > cur.videoSearchStats.lastSeenIndex) {
                    cur.videoSearchStats.lastSeenElement = parentContainer;
                    cur.videoSearchStats.lastSeenIndex = cur.videoSearchPos;
                }

                cur.videoSearchStats.positions[cur.videoSearchPos] = extend({
                    'clicked': 0
                }, cur.videoSearchStats.positions[cur.videoSearchPos]);
                cur.videoSearchStats.positions[cur.videoSearchPos].clicked++;

                var clickNum = ++cur.videoSearchStats.clickNum;
                var clickTime = new Date().getTime() - cur.videoSearchStats.lastActionTime;
                options.addParams = extend(options.addParams || {}, {
                    click_num: clickNum,
                    click_time: clickTime
                });
            }
        }

        var vidIds = videoId.split('_');
        Video._saveHistoryAction(vidIds[0], vidIds[1]);

        return showVideo(videoId, listId, options, e);
    },

    isInVideosList: function() {
        var loc = Video.getLoc();
        return /^videos-?\d+|video-?\d+_\d+$/.test(loc[0]) && !loc['q'] && (inArray(Video._getCurrentSectionType(), Video.AVAILABLE_TABS) || Video.isInAlbum());
    },

    onDeleteFromPlaylist: function(event, vid, oid) {
        var video = false;
        var list = cur.videoList[cur.vSection].list,
            spliceIndex = -1;
        each(list, function(i, v) {
            if (v[0] == oid && v[1] == vid) {
                video = v;
                return false;
            }
        });

        if (cur.vSection == 'all') {
            if (video[VideoConstants.VIDEO_ITEM_INDEX_HASH] /*hash*/ ) {
                ajax.post('/al_video.php', {
                    act: 'a_delete_from_all_albums',
                    vid: vid,
                    oid: oid,
                    target_id: cur.oid,
                    hash: video[VideoConstants.VIDEO_ITEM_INDEX_HASH]
                }, {
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
                    hash = v[VideoConstants.VIDEO_ITEM_INDEX_HASH];
                    return false;
                }
            });

            if (hash) {
                ajax.post('/al_video.php', {
                    act: 'a_add_to_playlist',
                    vid: vid,
                    oid: oid,
                    gid: cur.oid < 0 ? -cur.oid : 0,
                    hash: hash,
                    playlist_id: currPlaylistId,
                    add: 0
                }, {
                    onDone: function(playlists) {
                        var playlists = eval('(' + playlists + ')');
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

    deleteAlbum: function(aid, ev) {
        aid = aid.split('_')[1];
        showBox('al_video.php', {
            act: 'delete_album',
            aid: aid,
            oid: cur.oid
        }, {
            dark: 1
        });
        return cancelEvent(ev);
    },
    editAlbum: function(aid, ev) {
        aid = aid.split('_')[1];
        showBox('al_video.php', {
            act: 'edit_album',
            oid: cur.oid,
            aid: aid
        }, {
            dark: 1
        });
        return cancelEvent(ev);
    },
    createAlbum: function() {
        showBox('al_video.php', {
            act: 'edit_album',
            oid: cur.oid
        }, {
            dark: 1
        });
    },
    uploadVideoBox: function() {
        if (cur.uploadBanned) {
            showFastBox({
                title: getLang('video_no_upload_title')
            }, getLang('video_claims_no_upload'));
            return false;
        }

        var box = showTabbedBox('al_video.php?act=upload_box', {
            oid: cur.oid,
        }, {
            stat: ['video_edit.css', 'privacy.css', 'privacy.js'],
            params: {
                bodyStyle: 'position: relative;',
                dark: 1,
                hideButtons: 1,
            },
        });
        return false;
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
                    if (Video.isVideoPlayerOpen(oid, vid)) {
                        if (isUploaded) {
                            if (mvcur.minimized) {
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
    showPlaylistsBox: function(event, vid, oid) {
        showBox('/al_video.php', {
            act: 'video_playlists_box',
            target_id: cur.oid,
            oid: oid,
            vid: vid
        }, {
            dark: 1
        });
        cancelEvent(event);
    },

    tcSlide: function(event, btn, offset, noAnim) {
        var ITEMS_CNT = 4;
        var parent = gpeByClass('video_tc_slider', btn);
        var slider = geByClass1('video_tc_slider_cont', parent);
        var itemWidth = getSize(slider.children[0])[0] + 5 /* margin-right */ ;

        var currOffset = data(slider, 'currOffset') || 0;
        currOffset += offset;
        currOffset = Math.max(-slider.children.length + ITEMS_CNT, Math.min(0, currOffset));
        data(slider, 'currOffset', currOffset);

        if (noAnim) {
            addClass(slider, 'no_transition');
        }

        setStyle(slider, {
            left: currOffset * itemWidth
        });

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
    },

    deleteUploadedVideo: function() {
        var box = showFastBox({
            title: getLang('video_header_delete'),
            bodyStyle: 'padding: 20px; line-height: 160%;',
            dark: 1,
            forceNoBtn: 1
        }, getLang('video_delete_all_user_uploaded'), getLang('box_yes'), function() {

            ajax.post('al_video.php', {
                act: 'deleteAllUploaded',
                oid: cur.oid
            }, {
                showProgress: function() {
                    curBox().showProgress();
                },
                onDone: function() {
                    boxQueue.hideLast();
                }
            });
        }, getLang('box_no'));
    },

    updateAlbum: function() {},

    updateVideo: function() {},

    _initSearchStats: function(loc) {
        cur.videoSearchPos = null;
        cur.videoSearchStats = {
            loc: loc,
            totalViews: 0,
            lastSeenElement: null,
            lastSeenIndex: -1,
            totalViewedTime: 0,
            clickNum: 0,
            lastActionTime: new Date().getTime(),
            positions: []
        };
    },

    _clearSearchStats: function() {
        delete cur.videoSearchPos;
        delete cur.videoSearchStats;
    },

    logSearchStats: function() {
        if (cur.vSearchInputBlurred && cur.videoSearchStats) {
            cur.vSearchInputBlurred = false;

            var resKey = cur.videoSearchStats.loc.q + Video._buildFiltersSearchStr();
            if (!cur.globalSearchResults || !cur.globalSearchResults[resKey]) {
                return;
            }
            var searchList = cur.globalSearchResults[resKey].list || [];
            var query = Video._serializeSearchParams(cur.videoSearchStats.loc);
            var lastSeen = cur.videoSearchStats.lastSeenIndex + 1;

            // Here we prepare some statistics for search quality metrics
            // and collecting data for search formula learning
            var positionStats = [];
            for (var i = 0; i < lastSeen; i++) {
                var stats = extend(cur.videoSearchStats.positions[i] || {}, Video._extractSearchStat(searchList[i]));
                positionStats.push(Video._serializeSearchStat(stats));
            }

            ajax.post('al_video.php', {
                act: 'a_search_query_stat',
                query: query,
                count: cur.videoSearchStats.totalViews,
                total_viewed_time: cur.videoSearchStats.totalViewedTime,
                scrolled_until: lastSeen,
                position_stats: positionStats
            });
        }
    },

    _serializeSearchParams: function(loc) {
        var hd = loc.hd ? '1' : '0';
        var adult = loc.notsafe ? '1' : '0';
        var order = loc.order || '';
        var dateAdded = loc.date || '';
        var len = loc.len || '';
        var text = loc.q;
        return hd + '#' + adult + '#' + order + '#' + dateAdded + '#' + len + '#' + text;
    },

    _extractSearchStat: function(v) {
        if (!v) return {};
        return {
            'oid': v[0],
            'vid': v[1]
        };
    },

    _serializeSearchStat: function(stat) {
        stat = stat || {};

        var res = '';
        for (var i = 0; i < Video.SEARCH_STATS_POSITION_FIELDS.length; i++) {
            var param = stat[Video.SEARCH_STATS_POSITION_FIELDS[i]];
            if (param === null || typeof(param) === 'undefined') {
                param = '';
            }
            res += res ? ',' + param : param;
        }

        return res;
    },

    _updateLastSeenElement: function(elementsList) {
        if (!cur.videoSearchStats) {
            return
        }

        if (cur.videoSearchStats.lastSeenElement === null || !elementsList.contains(cur.videoSearchStats.lastSeenElement)) {
            cur.videoSearchStats.lastSeenElement = domFC(elementsList);
            if (!cur.videoSearchStats.lastSeenElement) {
                return;
            }
        }

        cur.videoSearchStats.lastSeenIndex = 0;

        var windowHeight = clientHeight();
        var ns = domNS(cur.videoSearchStats.lastSeenElement);
        if (!ns) {
            return;
        }
        var nsRect = ns.getBoundingClientRect();

        while (ns !== null && (nsRect.top + ns.clientHeight / 2 < windowHeight)) {
            cur.videoSearchStats.lastSeenElement = ns;
            ns = domNS(cur.videoSearchStats.lastSeenElement);
            if (!ns) {
                break;
            }
            nsRect = ns.getBoundingClientRect();
        }

        cur.videoSearchStats.lastSeenIndex = parseInt(cur.videoSearchStats.lastSeenElement.getAttribute('data-search-pos')) || 0;
    },

    _updateThumbsInView: function() {
        var gap = 800;

        clearTimeout(this._updateThumbsInViewTO);
        this._updateThumbsInViewTO = setTimeout(function() {

            var thumbSize = null;
            var wh = clientHeight();
            var scrollTop = cur.module == 'im' ? 0 : scrollGetY();

            each(geByClass('_video_item_thumb'), function(i, thumbEl) {
                if (!domData(thumbEl, 'thumb')) {
                    return;
                }

                var ypos = getXY(thumbEl, cur.module == 'im')[1];

                thumbSize = thumbSize || getSize(thumbEl);

                if (ypos > (scrollTop - thumbSize[1] - gap) && ypos < (scrollTop + wh + gap)) {
                    var url = domData(thumbEl, 'thumb');
                    domData(thumbEl, 'thumb', null);
                    setStyle(thumbEl, 'background-image', 'url(\'' + url + '\')');
                }
            });

        }, 50);
    },

    copyAlbumVideosList: function() {
        var section = Video._getCurrentSectionType();
        var oid = cur.getOwnerId();
        if (section == 'album') {
            section = Video.getLoc().section;
        }

        if (cur.silentLoadingProgress[oid][section] === true || !cur.silentLoaded[oid][section]) {
            showFastBox('', 'List has not loaded yet');
            return;
        }

        var videos = cur.silentLoaded[oid][section];
        var text = videos.map(function(v) {
            return 'https://vk.com/video' + v[VideoConstants.VIDEO_ITEM_INDEX_OWNER_ID] + '_' + v[VideoConstants.VIDEO_ITEM_INDEX_ID];
        }).join('\n');
        showFastBox('', '<textarea class="dark" style="width: 100%; height: 350px;">' + text + '</textarea>');
    },

    getCurOwnerId: function() {
        if (cur.getOwnerId) {
            return cur.getOwnerId();
        }
        return cur.oid;
    }
};

try {
    stManager.done('video.js');
} catch (e) {}