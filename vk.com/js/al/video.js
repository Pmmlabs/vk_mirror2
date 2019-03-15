var Video = {
    regBR: new RegExp("<br>", "g"),
    CHANNEL_PREFIX: "channel",
    CATEGORY_PREFIX: "cat_",
    SIGNIFICANT_POSITIONS: 50,
    VIDEO_SEARCH_TYPE: "search_videos",
    VIDEO_GLOBAL_SEARCH_TYPE: "search_global_videos",
    ALBUM_SEARCH_TYPE: "search_albums",
    ALBUM_GLOBAL_SEARCH_PROMO_PLAYLISTS_TYPE: "search_promo_albums",
    SEARCH_FILTERS: ["hd", "notsafe", "date", "order", "len"],
    AVAILABLE_TABS: ["all", "uploaded", "albums"],
    VIDEOS_PER_PAGE: 60,
    ALBUMS_PER_PAGE: 12,
    VIDEOS_PER_ROW: 3,
    PLAYLIST_OBJECT_ID_INDEX: 6,
    SEARCH_KEEP_FILTERS_DELAY: 3e3,
    SEARCH_STATS_POSITION_FIELDS: ["oid", "vid", "clicked", "viewStarted", "viewedParts", "viewedSeconds"],
    getLoc: function() {
        return cur.curLoc ? cur.curLoc : (isEmpty(nav.objLoc) || !nav.objLoc[0] || 0 != nav.objLoc[0].indexOf("video")) && cur.section && inArray(cur.section, ["catalog", "all", "uploaded", "albums"]) ? {
            0: "catalog" == cur.section ? "video" : "videos" + cur.oid
        } : nav.objLoc
    },
    init: function() {
        cur.searchInputEl = geByClass1("video_search_input"), cur.videoRecentlyRemoved = {}, cur.videoShowWindow = {}, cur.found = {}, cur.silentLoaded = {}, cur.currentSortings = {}, cur._preloadedPages = {}, cur.videoSearchFilters = {}, cur.videoSearchStats = null, cur.videoSearchPos = null, cur.module = "video", cur.albumsPreload = cur.albumsPreload || {}, cur.albumsShowingAll = {}, cur.curLoc = !!cur.query && nav.fromStr(cur.query), cur._back = {
            hide: [function() {
                removeEvent(window, "scroll", cur._ev_onScroll)
            }],
            show: [function() {
                Video._initScroll()
            }]
        }, isObject(cur.curLoc) && (cur.curLoc.section = cur.section), cur.getOwnerId = function() {
            return cur.oid
        }, Video.initNavigation(), Video.initSearch();
        var e = Video._getCurrentSectionType();
        Video.isInAlbum() || Video.loadSilent(), Video.loadSilent(Video.getLoc().section), "catalog" == e ? (Videocat.init(), vk.id && Video._preloadPage("all")) : (Video.initOwnerVideoPage(), vk.id == cur.getOwnerId() && -1 != Video.AVAILABLE_TABS.indexOf(e) && Video._preloadPage("catalog")), cur.curLoc = !1, cur.section = !1, cur.currentModule = function() {
            return Video.isInSearch() ? "video_search" : Video.isInCatalog() ? "videocat" : Video.isInVideosList() ? cur.oid < 0 ? "community_videos" : cur.oid == vk.id ? "profile_own_videos" : "profile_videos" : cur.module
        }, Video._initScroll(), addEvent(window, "beforeunload", function(e) {
            var o = Video.getLoc();
            return 0 <= o[0].indexOf("video") && o.q && Video.logSearchStats(), !0
        }), Video._updateThumbsInView()
    },
    _initScroll: function() {
        cur._ev_onScroll && removeEvent(window, "scroll", cur._ev_onScroll), addEvent(window, "scroll", cur._ev_onScroll = Video.onScroll), cur.destroy.push(function() {
            removeEvent(window, "scroll", cur._ev_onScroll)
        })
    },
    _preloadPage: function(d) {
        ajax.post("al_video.php", {
            act: "s",
            section: d,
            preload: 1
        }, {
            onDone: function(e, o, i) {
                if (Video.isInCatalog() || Video.isInVideosList()) {
                    var t = cur.getOwnerId(),
                        r = cur.videosCount[t];
                    extend(cur, o), extend(cur.videosCount[t], r), cur._preloadedPages = cur._preloadedPages || {}, cur._preloadedPages[d] = ce("div", {
                        innerHTML: e,
                        id: "video_content_" + d
                    }), cur._preloadedPages.other = i, "all" == d && Video.loadSilent(d), cur._switchOnPagePreloaded && Video._switch.apply(Video, cur._switchOnPagePreloaded), cur._switchOnPagePreloaded = !1
                }
            }
        })
    },
    initOwnerVideoPage: function() {
        if (!cur._videoInited) {
            cur._videoInited = !0, cur.videoCanSort && (Video.isInAlbum() || (cur.albumsSorter = new GridSorter("video_albums_list", "video_playlist_item_a", {
                onReorder: Video._onAlbumReorder
            })), Video._createSorters());
            var e = ge("video_sort_dd");
            e && (cur.videoSortDD = new InlineDropdown(e, {
                items: cur.videoSortItems,
                withArrow: !0,
                selected: "default",
                onSelect: Video._sortVideos
            })), Video._toggleSorter("albums" != Video.getLoc().section)
        }
    },
    _toggleSorter: function(e) {
        var o = geByClass1("video_tab_actions_wrap"),
            i = [geByClass1("_video_sort_dd_wrap", o), geByClass1("divider", o)];
        toggle(i[0], e), toggle(i[1], e)
    },
    _switch: function(e, o) {
        var i = ge("video_content_" + o);
        if (!i && void 0 === cur._preloadedPages[o]) return !(cur._switchOnPagePreloaded = [e, o]);
        if (Video.doSearch(""), Video.inputVal(cur.searchInputEl, ""), hide("video_content_" + e), toggle("videocat_other_blocks", "catalog" != e), i || ge("video_layout_contents").appendChild(cur._preloadedPages[o]), show(i), "catalog" == e) Video.initOwnerVideoPage(), setDocumentTitle(getLang("video_myvideos"));
        else {
            var t = ge("videocat_other_blocks");
            trim(t.innerHTML) || (t.innerHTML = cur._preloadedPages.other), Videocat.init(), setDocumentTitle(getLang("video_catalogue_tab_full"))
        }
        return toggle("video_add_album_btn", "catalog" != o), uiTabs.switchTab(domFC(ge("videocat_tab_" + o))), uiTabs.hideProgress("video_main_tabs"), Video._updateThumbsInView(), !1
    },
    updateEmptyPlaceholder: function(e) {
        if (e) {
            var o = !1,
                i = "";
            "albums" == e ? cur.playlistsCount || (o = !0, i = "video_no_albums_placeholder_text") : cur.videosCount[cur.getOwnerId()][e] || (o = !0, i = "video_no_videos_here_yet"), Video._toggleEmptyPlaceholder(o, i)
        }
    },
    initNavigation: function() {
        cur.nav.push(function(e, o, i, t) {
            var r, d = void 0 !== e[0],
                a = d && i[0] == "videos" + vk.id,
                n = d && "video" == i[0],
                c = "comments" == i.section,
                s = i.q && !o.q && 0 <= i[0].indexOf("video"),
                l = o.q && !i.q && 0 <= o[0].indexOf("video"),
                u = "upload" == o.section && !i.section,
                _ = e.q;
            if ((l || _) && Video.logSearchStats(), s || _ ? Video._initSearchStats(i) : l && Video._clearSearchStats(), c) return delete cur._back, !0;
            if (d) {
                var v = cur.getOwnerId();
                if (v == vk.id && !inArray(e[0], ["video", "videos" + v])) return !0;
                if (v != vk.id && !inArray(e[0], ["videos" + v])) return !0
            }
            if (a ? (nav.setLoc(i), r = Video._switch("catalog", "all")) : n && (nav.setLoc(i), r = Video._switch("all", "catalog")), r || u) return !0;
            if (uiTabs.hideProgress("video_main_tabs"), "all" == e.section && delete i.section, s && (cur.videoLocBeforeSearch = o), l && (cur.videoSearchFilters = {}, Video.doSearch(), Video.inputVal(cur.searchInputEl, ""), cur.videoLocBeforeSearch && t.fromSearch)) {
                var h = clone(cur.videoLocBeforeSearch);
                return delete cur.videoLocBeforeSearch, nav.go(h), !1
            }
            trim(val(cur.searchInputEl)), trim(i.q || "");
            var g = i.section || "all";
            if (i.q) Video.isInAlbum() || delete i.section, Video._prepareSearchFilters(i), t.fromSearch || Video.inputVal(cur.searchInputEl, i.q), t.fromSearch || t.globalQuery || (t.globalQuery = i.q), Video.doSearch(i.q, t.globalQuery);
            else {
                if (-1 == Video.AVAILABLE_TABS.indexOf(g)) return !0;
                if (Video.isInAlbum(o.section)) return nav.setLoc(i), !0;
                each(Video.AVAILABLE_TABS, function(e, o) {
                    hide("video_subtab_pane_" + o)
                }), show("video_subtab_pane_" + g), Video.updateEmptyPlaceholder(g);
                var S = domFC(ge("video_tab_" + g));
                S && uiTabs.switchTab(S, {
                    noAnim: t.hist
                });
                geByClass1("video_tab_actions_wrap"), geByClass1("_video_sort_dd_wrap"), geByClass1("divider");
                "albums" != g ? (Video.loadSilent(g), cur.videoSortDD && cur.videoSortDD.select(cur.currentSortings[g] || "default", !0), Video._toggleSorter(!0)) : Video._toggleSorter(!1), Video._createSorters(g)
            }
            return !!i.show_original || (nav.setLoc(i), !1)
        }), cur.destroy.push(function() {
            cur.nav.pop()
        })
    },
    initSearch: function() {
        (cur.searchInputEl = ge("video_search_input"), cur.searchInputEl) && (data(cur.searchInputEl, "opts").onChange = function(e, o) {
            e = trim(e), o = isString(o) ? trim(o) : "";
            var i = {};
            e || (each(Video.SEARCH_FILTERS, function(e, o) {
                i[o] = !1
            }), cur.videoPrevSearchFilters = clone(cur.videoSearchFilters), setTimeout(function() {
                delete cur.videoPrevSearchFilters
            }, Video.SEARCH_KEEP_FILTERS_DELAY)), e && cur.videoPrevSearchFilters && (i = cur.videoPrevSearchFilters, delete cur.videoPrevSearchFilters), nav.change(extend({
                q: e || !1
            }, i), !1, {
                fromSearch: !0,
                globalQuery: o
            })
        }, data(cur.searchInputEl, "opts").onBlur = function() {
            trim(val(cur.searchInputEl)) && (cur.vSearchInputBlurred = !0)
        }, browser.msie && intval(browser.version) <= 10 || cur.searchInputEl.focus())
    },
    _sortVideos: function(i) {
        window.tooltips && tooltips.hideAll();
        var e = Video._getCurrentSectionType(),
            o = cur.getOwnerId();
        "album" == e && (e = Video.getLoc().section);
        var t = cur.silentLoaded[o][e],
            r = 0;
        t = t.filter(function(e) {
            var o = e[VideoConstants.VIDEO_ITEM_INDEX_OWNER_ID] + "_" + e[VideoConstants.VIDEO_ITEM_INDEX_ID];
            return !cur.videoRecentlyRemoved[o] || (r++, !1)
        });
        var d = cur.videosCount[cur.getOwnerId()];
        if (r && d)
            if (Video.isInAlbum()) {
                var a = "album_" + Video._getSectionAlbumId();
                d[a] && (d[a] -= r, val(geByClass1("_video_subtitle_counter", ge("video_layout_contents")), langNumeric(d[a], cur.lang.video_playlist_size)))
            } else d.all -= r, Video.updateTabCounter(d.all);
        if (!(cur.silentLoaded[o][e] = t)) return show("video_sort_progress"), hide("video_sort_dd"), void Video._addPendingAction(e, function() {
            Video._sortVideos(i)
        });
        hide("video_sort_progress"), show("video_sort_dd"), clearTimeout(cur._sortTO), cur._sortTO = setTimeout(function() {
            t.length && (t.sort(function(e, o) {
                switch (i) {
                    case "default":
                        return e[cur.indexIndex] - o[cur.indexIndex];
                    case "new":
                        return o[VideoConstants.VIDEO_ITEM_INDEX_DATE] - e[VideoConstants.VIDEO_ITEM_INDEX_DATE];
                    case "old":
                        return e[VideoConstants.VIDEO_ITEM_INDEX_DATE] - o[VideoConstants.VIDEO_ITEM_INDEX_DATE];
                    case "popularity":
                        return o[VideoConstants.VIDEO_ITEM_INDEX_VIEWS] - e[VideoConstants.VIDEO_ITEM_INDEX_VIEWS]
                }
            }), ge("video_" + e + "_list").innerHTML = "", cur.videoShowWindow && cur.videoShowWindow[o] && (cur.videoShowWindow[o][e] = !1), Video.showMore(e), Video._reinitSorters("default" != i), cur.currentSortings = cur.currentSortings || {}, cur.currentSortings[e] = i)
        }, 10)
    },
    _reindex: function(e) {
        for (var o = 0, i = e.length; o < i; o++) e[o].length >= cur.indexIndex ? e[o][cur.indexIndex] = o : e[o].push(o)
    },
    _onAlbumReorder: function(e, o, i) {
        var t = e.getAttribute("data-id"),
            r = i ? i.getAttribute("data-id") : null,
            d = o ? o.getAttribute("data-id") : null;
        ajax.post("al_video.php", {
            act: "reorder_albums",
            oid: cur.getOwnerId(),
            aid: t,
            before: d,
            after: r,
            hash: cur.videoAlbumsSortHash
        })
    },
    _onReorder: function(e, o, i) {
        var t = cur.getOwnerId(),
            r = domData(e, "id"),
            d = i ? domData(i, "id") : null,
            a = o ? domData(o, "id") : null,
            n = Video._getCurrentSectionType();
        "album" == n && (n = Video.getLoc().section.split("_")[1]);
        var c = Video._getCurrentSectionType(),
            s = cur.silentLoaded[t][c];
        if (s) {
            var l = -1,
                u = -1;
            if (each(s, function(e, o) {
                    var i = o[VideoConstants.VIDEO_ITEM_INDEX_OWNER_ID] + "_" + o[VideoConstants.VIDEO_ITEM_INDEX_ID];
                    if (i == r && (l = e), i == d && (u = e), 0 <= u && 0 <= l) return !1
                }), 0 <= l) {
                var _ = s.splice(l, 1)[0];
                u < 0 ? s.unshift(_) : (l < u && u--, s.splice(u + 1, 0, _)), Video._reindex(s)
            }
        }
        ajax.post("al_video.php", {
            act: "reorder_videos",
            album_id: n,
            target_id: t,
            vid: r,
            before: a,
            after: d,
            hash: cur.videoSortHash
        })
    },
    _prepareSearchFilters: function(i) {
        return cur.videoSearchFilters = {}, each(Video.SEARCH_FILTERS, function(e, o) {
            cur.videoSearchFilters[o] = i[o]
        }), cur.videoSearchFilters
    },
    onFilterRemoved: function(e) {
        Video._setFilterSelector(e), clearTimeout(cur._frto), cur._frto = setTimeout(Video._onFiltersChanged, 10)
    },
    _setFilterSelector: function(e, o) {
        var i, t = cur["videoFilter_" + e];
        return !!t && ("Selector" == t.__className ? (void 0 === o && (o = t.options.defaultItems[0][0]), t.selectItem(o, !1), (i = clone(t.selectedItems()[0])).push(i[0] == t.options.defaultItems[0][0])) : hasClass(t, "checkbox") && (toggleClass(t, "on", !!o), i = [!!o, data(t, "title"), !o]), i)
    },
    _onFiltersChanged: function() {
        var e = hasClass("video_fltr_hd", "on"),
            o = hasClass("video_fltr_notsafe", "on"),
            i = cur.videoFilter_len.selectedItems()[0][0],
            t = cur.videoFilter_date.selectedItems()[0][0],
            r = cur.videoFilter_order.selectedItems()[0][0];
        nav.change({
            hd: !!e && 1,
            len: 0 < i && i,
            date: 0 < t && t,
            order: 0 <= r && r,
            notsafe: !!o && 1
        }, !1, {
            filtersChanged: !0
        })
    },
    initFilters: function() {
        if (geByClass1("video_search_input")) {
            cur.videoFilter_len = new Dropdown(ge("video_fltr_len"), cur.lenFilters, {
                big: 1,
                zeroPlaceholder: !0,
                onChange: Video._onFiltersChanged
            }), cur.videoFilter_date = new Dropdown(ge("video_fltr_date"), cur.dateFilters, {
                big: 1,
                zeroPlaceholder: !0,
                onChange: Video._onFiltersChanged
            }), cur.videoFilter_order = new Dropdown(ge("video_fltr_order"), cur.orderFilters, {
                big: 1,
                zeroPlaceholder: !0,
                onChange: Video._onFiltersChanged
            }), cur.videoFilter_hd = ge("video_fltr_hd"), removeEvent(cur.videoFilter_hd, "click"), addEvent(cur.videoFilter_hd, "click", Video._onFiltersChanged), data(cur.videoFilter_hd, "title", cur.lang.video_hd_checkbox), cur.videoFilter_notsafe = ge("video_fltr_notsafe"), removeEvent(cur.videoFilter_notsafe, "click"), addEvent(cur.videoFilter_notsafe, "click", Video._onFiltersChanged), data(cur.videoFilter_notsafe, "title", cur.lang.video_filter_no_safe);
            var e = Video.getLoc().q;
            e && (Video._prepareSearchFilters(Video.getLoc()), cur.searchText = e, Video.inputVal(cur.searchInputEl, cur.searchText), Video.doSearch(e, e))
        }
    },
    _isGeneralSection: function(e) {
        for (var o = 0; o < Video.AVAILABLE_TABS.length; o++)
            if (e == Video.AVAILABLE_TABS[o]) return !0;
        return !1
    },
    loadSilent: function(e) {
        e = e || "all";
        var _ = cur.getOwnerId(),
            v = Video.isInAlbum(e),
            h = !!cur.isSnippetVideoSelection;
        if ((v || this._isGeneralSection(e)) && "albums" != e) {
            cur.silentLoaded = cur.silentLoaded || {}, cur.silentLoaded[_] = cur.silentLoaded[_] || {}, cur.silentLoadingProgress = cur.silentLoadingProgress || {}, cur.silentLoadingProgress[_] = cur.silentLoadingProgress[_] || {};
            var o = cur.silentLoadingProgress[_][e];
            !0 !== o && cur.pageVideosList && cur.pageVideosList[_] && (!1 !== o ? void 0 === o && (cur.silentLoadingProgress[_][e] = !0, function(t) {
                function e(e, o) {
                    cur.silentLoadingProgress && cur.silentLoadingProgress[_] && (cur.silentLoadingProgress[_][t] = !1, e && (e.length && (cur.indexIndex = e[0].length), Video._reindex(e), cur.silentLoaded[_][t] = e), o && (cur.albumsPreload[_] = !1, cur.silentLoaded[_].albums = o), Video.indexItems(function() {
                        cur.silentLoadingProgress && (Video._callPendingAction(t), o && Video._callPendingAction("albums"), Video.showMore(t))
                    }))
                }
                var o = cur.pageVideosList[_][t],
                    i = !!o && cur.videosCount[_][t] <= o.list.length,
                    r = !!v || cur.albumsPreload && cur.playlistsCount <= cur.albumsPreload[_].length;
                if (r && (cur.silentLoaded[_].albums = cur.albumsPreload[_]), i && r) e(cur.pageVideosList[_][t].list, cur.albumsPreload[_]);
                else if (cur.noVideos) e([], []);
                else {
                    if (!cur.videosCount || !cur.videosCount[_]) return e([], []);
                    var d = cur.VIDEO_SILENT_VIDEOS_CHUNK_SIZE,
                        a = cur.videosCount[_][t],
                        n = Math.ceil(a / d),
                        c = new callHub(function() {
                            e([].concat.apply([], s), l)
                        }, n),
                        s = new Array(n),
                        l = [];
                    if (0 == n) return e([], []);
                    for (var u = 0; u < n; u++) ! function(i) {
                        ajax.post("/al_video.php", {
                            act: "load_videos_silent",
                            oid: _,
                            section: t,
                            rowlen: Video.VIDEOS_PER_ROW,
                            offset: i * d,
                            snippet_video: h ? 1 : 0,
                            need_albums: intval(!r && "all" == t && intval(0 == i))
                        }, {
                            onDone: function(e, o) {
                                e && e[t] && e[t].list ? s[i] = e[t].list : s[i] = [], 0 == i && (l = o), c.done()
                            }
                        })
                    }(u)
                }
            }(e)) : Video._callPendingAction(e))
        }
    },
    indexItems: function(e) {
        if (cur.getOwnerId) {
            var i = 0,
                t = cur.getOwnerId();
            cur.videoIndexes = cur.videoIndexes || {}, cur.videoIndexes[t] = cur.videoIndexes[t] || {}, each(cur.silentLoaded[t], function(e, o) {
                cur.videoIndexes[t][e] || i++
            });
            var r = new callHub(e, i);
            each(cur.silentLoaded[t], function(o, e) {
                cur.videoIndexes[t][o] || (cur.videoIndexes[t][o] = new vkIndexer(e, function(e) {
                    return "albums" == o ? e[0] : e[VideoConstants.VIDEO_ITEM_INDEX_TITLE]
                }, function() {
                    r.done()
                }))
            })
        }
    },
    _updateSearchPageTitle: function(e) {
        curBox() || (e ? (cur.prevVideoPageTitle || (cur.prevVideoPageTitle = document.title), setDocumentTitle(getLang("video_title_search").replace("{q}", e))) : cur.prevVideoPageTitle && setDocumentTitle(cur.prevVideoPageTitle))
    },
    inputVal: function(e, o) {
        if (val(e) != o) {
            val(e, o);
            var i = gpeByClass("_wrap", e);
            toggleClass(i, "ui_search_field_empty", !o)
        }
    },
    doSearch: function(o, i) {
        if (cur.searchInputEl) {
            var t = cur.videoLocalSearchQuery = trim(o),
                r = cur.videoGlobalSearchQuery = trim(i);
            each(Video.SEARCH_FILTERS, function(e, o) {
                var i = Video._setFilterSelector(o, cur.videoSearchFilters[o]);
                i && uiSearch.toggleFilter(cur.searchInputEl, o, i[1], !i[2])
            }), cur.noEmptyLocalResults = Video.isInCatalog(), Video._toggleSearchProgress(!!t);
            var e = [Video.VIDEO_SEARCH_TYPE, Video.ALBUM_SEARCH_TYPE, Video.ALBUM_GLOBAL_SEARCH_PROMO_PLAYLISTS_TYPE, Video.VIDEO_GLOBAL_SEARCH_TYPE];
            Video.isInSearch() && cur.noEmptyLocalResults && e.pop(), each(e, function(e, o) {
                hide("video_subtab_pane_" + o)
            }), toggle("videocat_other_blocks", Video.isInCatalog() && !o), t || Video._toggleSearchContent(!1), curBox() ? ge("box_layer_wrap").scrollTop = 0 : scrollToTop(1e3);
            var d = Video.isInAlbum() ? Video.getLoc().section : "all";
            Video._clearPendingAction(d), Video._updateSearchPageTitle(t), t && (Video._addPendingAction(d, function() {
                var e = Video._searchLocally(t);
                i && e && cur.lastProcessedSearchText !== o && (cur.lastProcessedSearchText = o, saveSearchAttemptStats("video", 0, e)), e < 15 && Video._searchGlobally(r), Video._toggleSearchProgress(!1)
            }), Video.loadSilent(d), Video._searchGlobally(r))
        }
    },
    _toggleSearchProgress: function(e) {
        cur.searchProgressRef = cur.searchProgressRef || 0, cur.searchProgressRef = Math.max(0, cur.searchProgressRef + (e ? 1 : -1)), e = 0 < cur.searchProgressRef;
        var o = geByClass1("ui_search_fltr_control", geByClass1("video_search_input")),
            i = geByClass1("ui_search_fltr_progress", o);
        toggle(i, e), hasClass(o, "shown") || toggleClass(gpeByClass("_wrap", cur.searchInputEl), "ui_search_loading", e)
    },
    _buildFiltersSearchStr: function() {
        var i = [];
        return each(cur.videoSearchFilters || {}, function(e, o) {
            o && i.push(e + ":" + o)
        }), "$" + i.join("#")
    },
    _searchGlobally: function(h, e) {
        if (h) {
            var g = 0 < (e = intval(e)),
                S = +new Date;
            cur.globalSearchResults = cur.globalSearchResults || {};
            var V = h + Video._buildFiltersSearchStr();
            if (!g && cur.globalSearchResults[V]) return cur.lastProcessedSearchText !== h && (cur.lastProcessedSearchText = h, saveSearchAttemptStats("video", S, cur.globalSearchResults[V].count)), void Video._showGlobalSearchResults(h);
            if (cur.globalSearchInProgress != h) {
                cur.globalSearchInProgress = h, !g && Video._toggleSearchProgress(!0);
                var o = !!cur.isSnippetVideoSelection,
                    i = {
                        act: "search_video",
                        q: h,
                        offset: e || 0,
                        from: cur.oid
                    };
                o && (i.snippet_video = 1), ajax.post("/al_video.php", extend(i, cur.videoSearchFilters), {
                    onDone: function(e, o, i, t, r, d) {
                        u || cur.lastProcessedSearchText === h || (cur.lastProcessedSearchText = h, saveSearchAttemptStats("video", S, e)), cur.globalSearchInProgress = !1, !g && Video._toggleSearchProgress(!1), curBox() && (r = !1), cur.globalSearchResults[V] = cur.globalSearchResults[V] || {
                            count: 0,
                            countHash: o,
                            list: [],
                            realOffset: 0,
                            promoPlaylists: r
                        };
                        var a = cur.globalSearchResults[V];
                        a.done = a.done || !i.list || 0 == i.list.length;
                        var n = a.list.length;
                        if (!a.done) {
                            for (var c = i.list[0], s = 0, l = a.list.length - 1; 0 <= l; l--) {
                                var u = a.list.length - l;
                                if (20 < u) break;
                                var _ = a.list[l];
                                if (c[0] == _[0] && c[1] == _[1]) {
                                    s = u;
                                    break
                                }
                            }
                            a.count = parseInt(e), Array.prototype.push.apply(a.list, i.list.slice(s));
                            var v = a.list.length % Video.VIDEOS_PER_ROW;
                            e > Video.VIDEOS_PER_PAGE && v && a.list.length < a.count && (a.list.splice(-v, Video.VIDEOS_PER_ROW), d -= v), a.realOffset = d
                        }(t || !a.done && a.list.length == n) && (a.done = !0), Video._showGlobalSearchResults(h, g)
                    }
                })
            }
        }
    },
    _toggleEmptySearchPlaceholder: function(e, o, i) {
        var t = ge("video_empty_placeholder_search"),
            r = cur.getOwnerId() < 0 ? "video_not_found_group" : "video_not_found_user";
        if (cur.getOwnerId() == vk.id && (r = "video_not_found_yours"), Video.isInAlbum() && (r = "video_not_found_in_album"), Video.isInCatalog() && (r = "video_not_found_globally"), o && (t.innerHTML = getLang(r).replace("{searchText}", "<b>" + clean(o.replace(/\$/g, "$$$$")) + "</b>")), toggle(t, e), i) {
            var d = !0,
                a = ge("video_layout_search");
            each(domChildren(a), function() {
                if (isVisible(this)) return d = !1
            }), d && toggle(t, !0)
        }
    },
    _toggleEmptyPlaceholder: function(e, o) {
        var i = ge("video_empty_placeholder_main");
        e && i && (i.innerHTML = getLang(o)), toggle(i, e)
    },
    _showSearchResult: function(e) {
        var o = cur.found[e],
            i = cur.getOwnerId();
        if (toggle("video_subtab_pane_" + e, !!o.count), o.count) {
            var t, r = "";
            switch (e) {
                case Video.ALBUM_SEARCH_TYPE:
                    t = "albums";
                case Video.VIDEO_SEARCH_TYPE:
                    t = t || "videos", r = Video.isInAlbum() ? cur.lang["video_found_" + t + "_in_album"] : cur.getOwnerId() < 0 ? cur.lang["video_found_" + t + "_community"] : cur.getOwnerId() == vk.id ? cur.lang["video_found_" + t + "_yours"] : cur.lang["video_found_" + t + "_of"];
                    break;
                case Video.VIDEO_GLOBAL_SEARCH_TYPE:
                    r = cur.lang.video_found_videos_global;
                    break;
                case Video.ALBUM_GLOBAL_SEARCH_PROMO_PLAYLISTS_TYPE:
                    r = getLang("video_search_promo_playlists")
            }
            r = (r = langNumeric(o.count, r, !0)).replace("{user}", cur.lang.video_owner_name_gen);
            var d = geByClass1("video_subtitle", ge("video_subtab_pane_" + e));
            val(d, r);
            var a = e == Video.VIDEO_GLOBAL_SEARCH_TYPE ? cur.videoGlobalSearchQuery : cur.videoLocalSearchQuery;
            a += Video._buildFiltersSearchStr(), cur._videoRenderedSearchResults = cur._videoRenderedSearchResults || {};
            var n = cur._videoRenderedSearchResults;
            n[e] != a && (n[e] = a, ge("video_" + e + "_list").innerHTML = "", cur.videoShowWindow && cur.videoShowWindow[i] && delete cur.videoShowWindow[i][e], Video.showMore(e))
        }
    },
    _showGlobalSearchResults: function(e, o) {
        var i = e + Video._buildFiltersSearchStr(),
            t = cur.getOwnerId(),
            r = Video.isInAlbum() ? Video.getLoc().section : "all",
            d = !!cur.silentLoaded[t][r];
        if ((e == cur.videoGlobalSearchQuery || e == cur.videoLocalSearchQuery) && d && cur.globalSearchResults[i] && 0 <= cur.globalSearchResults[i].count) {
            var a = cur.globalSearchResults[i];
            cur.found[Video.VIDEO_GLOBAL_SEARCH_TYPE] = {
                list: a.list,
                count: a.count,
                done: a.done,
                realOffset: a.realOffset
            }, cur.found[Video.ALBUM_GLOBAL_SEARCH_PROMO_PLAYLISTS_TYPE] = {
                list: a.promoPlaylists,
                count: a.promoPlaylists.length,
                done: !0
            }, cur.noEmptyLocalResults && (Video._toggleSearchContent(!0), 0 == a.count ? Video._toggleEmptySearchPlaceholder(!0, e) : Video._toggleEmptySearchPlaceholder(!1)), o || (Video._showSearchResult(Video.ALBUM_GLOBAL_SEARCH_PROMO_PLAYLISTS_TYPE), Video._showSearchResult(Video.VIDEO_GLOBAL_SEARCH_TYPE)), Video._callPendingAction(Video.VIDEO_GLOBAL_SEARCH_TYPE)
        }
    },
    _toggleSearchContent: function(e) {
        toggle("video_layout_contents", !e), toggle("video_layout_search", !!e)
    },
    _searchLocally: function(e) {
        if (cur.found = {}, !e || !cur.videoIndexes) return !1;
        var o = cur.getOwnerId(),
            i = [],
            t = [];
        !Video.isInAlbum() && cur.videoIndexes[o].albums && (t = cur.videoIndexes[o].albums.search(e), cur.found[Video.ALBUM_SEARCH_TYPE] = {
            list: t,
            count: t.length
        }, Video._showSearchResult(Video.ALBUM_SEARCH_TYPE));
        var r = Video.isInAlbum() ? Video.getLoc().section : "all";
        if (cur.videoIndexes[o][r]) {
            var d = cur.videoIndexes[o][r].search(e);
            each(d, function(e, o) {
                (!cur.videoSearchFilters.hd || o[VideoConstants.VIDEO_ITEM_INDEX_FLAGS] & VideoConstants.VIDEO_ITEM_FLAG_HD) && (vkNow() / 1e3 - o[VideoConstants.VIDEO_ITEM_INDEX_DATE] > cur.videoSearchFilters.date || i.push(o))
            }), cur.found[Video.VIDEO_SEARCH_TYPE] = {
                list: i,
                count: i.length
            }, Video._showSearchResult(Video.VIDEO_SEARCH_TYPE)
        }
        return t.length + i.length ? (Video._toggleSearchContent(!0), Video._toggleEmptySearchPlaceholder(!1)) : cur.noEmptyLocalResults ? Video._toggleEmptySearchPlaceholder(!1, void 0, !0) : (Video._toggleSearchContent(!0), Video._toggleEmptySearchPlaceholder(!0, e)), i ? i.length : 0
    },
    onItemEnter: function(e) {
        setTitle(e, e, e.innerHTML.replace(/<\/?em>/g, ""))
    },
    showMoreAlbums: function(e) {
        var o = !1,
            i = cur.getOwnerId();
        cur.albumsPreload && cur.albumsPreload[i] && !cur.silentLoaded[i].albums && (cur.silentLoaded[i].albums = cur.albumsPreload[i], o = !0), cur.albumsShowingAll[i] = !0, Video.showMore("albums", e), o && (cur.silentLoaded[i].albums = !1)
    },
    prepareVideoItemAttrs: function(e) {
        var i = attrs = "",
            o = {};
        o[VideoConstants.VIDEO_ITEM_FLAG_EXTERNAL] = "video_ext", o[VideoConstants.VIDEO_ITEM_FLAG_ACTIVE_LIVE] = "video_active_live", o[VideoConstants.VIDEO_ITEM_FLAG_CAN_EDIT] = "video_can_edit", o[VideoConstants.VIDEO_ITEM_FLAG_CAN_ADD] = "video_can_add", o[VideoConstants.VIDEO_ITEM_FLAG_CAN_DELETE] = "video_can_delete", o[VideoConstants.VIDEO_ITEM_FLAG_PRIVATE] = "video_private", o[VideoConstants.VIDEO_ITEM_FLAG_NO_AUTOPLAY] = "video_nap", o[VideoConstants.VIDEO_ITEM_FLAG_ADDED] = "video_added", o[VideoConstants.VIDEO_ITEM_FLAG_SKIP_THUMB_LOAD] = "video_skip_thumb_load";
        var t = e[VideoConstants.VIDEO_ITEM_INDEX_FLAGS];
        each(o, function(e, o) {
            t & e && (i += o + " ")
        }), e[VideoConstants.VIDEO_ITEM_INDEX_PLATFORM] || e[VideoConstants.VIDEO_ITEM_INDEX_DURATION] || t & VideoConstants.VIDEO_ITEM_FLAG_ACTIVE_LIVE || (i += " video_no_duration");
        var r = !(t & VideoConstants.VIDEO_ITEM_FLAG_CAN_EDIT || t & VideoConstants.VIDEO_ITEM_FLAG_CAN_DELETE),
            d = e[VideoConstants.VIDEO_ITEM_INDEX_BLOCKED],
            a = !(t & VideoConstants.VIDEO_ITEM_FLAG_CAN_ADD);
        return r && (d || a) && (i += " video_no_actions"), d && (i += " video_blocked"), cur.videoCanAddAlbums && (i += " video_can_edit_albums"), cur.isSnippetVideoSelection && (i += " no_video_select_btn"), t & VideoConstants.VIDEO_ITEM_FLAG_NEED_SIGN_IN && (attrs += ' rel="nofollow"'), [i, attrs]
    },
    buildVideoEl: function(e) {
        var o = trim(cur.videoItemTpl);
        (e = clone(e))[VideoConstants.VIDEO_ITEM_INDEX_VIEWS] = langNumeric(e[VideoConstants.VIDEO_ITEM_INDEX_VIEWS], cur.lang.video_N_views_list, !0), e[VideoConstants.VIDEO_ITEM_INDEX_DATE] = Video.getFormattedUpdatedTime(e[VideoConstants.VIDEO_ITEM_INDEX_DATE]), e[VideoConstants.VIDEO_ITEM_INDEX_FLAGS] & VideoConstants.VIDEO_ITEM_FLAG_ACTIVE_LIVE && (e[VideoConstants.VIDEO_ITEM_INDEX_DURATION] = '<span class="video_thumb_label_live_icon"></span>');
        var i = Video.prepareVideoItemAttrs(e),
            t = rs(o, e);
        return t = t.replace("%classes%", i[0]).replace("%attrs%", i[1]), t = se(t)
    },
    buildPlaylistEl: function(e) {
        var o = trim(cur.albumItemTpl);
        return se(rs(o, e))
    },
    onMoreLoaded: function(e, o, i, t, r) {
        Video._loading = !1;
        var d, a = cur.getOwnerId(),
            n = cur.videoShowWindow[a][o],
            c = ge("video_" + o + "_list");
        if (c) {
            e = geByClass1("ui_load_more_btn", gpeByClass("ge_video_pane", c));
            var s = 0 <= o.indexOf("albums"),
                l = s ? 0 : 3,
                u = Video._getCurrentSectionType();
            u = "album" == u ? Video.getLoc().section : "all";
            var _ = !1;
            0 <= o.indexOf("search") && cur.searchText && (_ = new RegExp("(" + cur.searchText.replace(/\|/g, "").replace(cur.videoIndexes[a][u].delimiter, "|").replace(/^\||\|$/g, "").replace(/([\+\*\)\(])/g, "\\$1") + ")", "gi"));
            for (var v = 0, h = i.length; v < h; v++) {
                var g = extend({}, i[v]);
                _ && (g[l] = g[l].replace(_, "<em>$1</em>")), d = s ? Video.buildPlaylistEl(g) : Video.buildVideoEl(g), o == Video.VIDEO_GLOBAL_SEARCH_TYPE && d.setAttribute("data-search-pos", v + n.offset), c.appendChild(d)
            }
            n.offset = t, n.done = !i.length || r, toggle(e, !n.done), o == Video.VIDEO_GLOBAL_SEARCH_TYPE && (cur.videoSearchStats || Video._initSearchStats(Video.getLoc()), cur.videoSearchStats.lastActionTime = (new Date).getTime(), Video._updateLastSeenElement(c))
        }
    },
    showMore: function(e, o) {
        e = e || Video._getCurrentSectionType();
        var i = curBox() ? curBox().bodyNode : void 0,
            t = geByClass1("_video_" + e + "_list", i);
        if (t) {
            var r = Video.isInAlbum(e),
                d = cur.getOwnerId();
            if (!r && -1 == Video.AVAILABLE_TABS.indexOf(e) || cur.silentLoaded[d][e]) {
                unlockButton(o), cur.videoShowWindow = cur.videoShowWindow || {}, cur.videoShowWindow[d] = cur.videoShowWindow[d] || {}, cur.videoShowWindow[d][e] || (cur.videoShowWindow[d][e] = {
                    done: !1,
                    offset: t.children.length
                });
                var a = cur.videoShowWindow[d][e];
                if (!a.done)
                    if (0 <= e.indexOf("search") && cur.found[e]) {
                        var n;
                        if (e == Video.VIDEO_GLOBAL_SEARCH_TYPE) {
                            if (s = cur.found[e].list.length, n = cur.found[e].realOffset || s, l = cur.found[e].list.slice(a.offset, s), !(u = cur.found[e].done) && 0 == l.length) return Video._addPendingAction(e, function() {
                                Video.showMore(e, o)
                            }), lockButton(o), void(cur.globalSearchInProgress || Video._searchGlobally(cur.videoGlobalSearchQuery, n))
                        } else s = a.offset + Video.VIDEOS_PER_PAGE, l = cur.found[e].list.slice(a.offset, s), u = s >= cur.found[e].list.length;
                        Video.onMoreLoaded(o, e, l, s, u)
                    } else if ((r || -1 != Video.AVAILABLE_TABS.indexOf(e)) && cur.silentLoaded[d][e]) {
                    var c = cur.silentLoaded[d][e],
                        s = Math.min(c.length, a.offset + Video.VIDEOS_PER_PAGE),
                        l = c.slice(a.offset, s),
                        u = !1;
                    "albums" == e && cur.albumsPreload[d] ? (u = cur.albumsNoMore, cur.albumsPreload[d] = !1) : u = s >= c.length, "albums" == e && (cur.albumsShowingAll[d] = !u), Video.onMoreLoaded(o, e, l, s, u)
                }
                Video._updateThumbsInView()
            } else isButtonLocked(o) || (Video._addPendingAction(e, function() {
                Video.showMore(e, o)
            }), lockButton(o))
        }
    },
    isInAlbum: function(e) {
        return 0 === (e || Video.getLoc().section || "").indexOf("album_")
    },
    isInSearch: function() {
        return !!Video.getLoc().q
    },
    _getSectionAlbumId: function() {
        var e = Video.getLoc().section || "all";
        switch (e) {
            case "all":
                return -2;
            case "uploaded":
                return -1;
            default:
                return e.split("_")[1]
        }
    },
    isInCatalog: function(e) {
        return "video" == (e = e || Video.getLoc())[0] && !e.section
    },
    _getCurrentSectionType: function() {
        return cur.videoForcedSection ? cur.videoForcedSection : Video.isInCatalog() ? "catalog" : Video.isInAlbum(Video.getLoc().section) ? "album" : Video.getLoc().section || "all"
    },
    onScroll: function() {
        var e;
        cur.getOwnerId && cur.albumsShowingAll[cur.getOwnerId()] ? e = "albums" : (e = Video._getCurrentSectionType(), Video.getLoc().q || "search" == e ? e = isVisible(gpeByClass("ge_video_pane", "ui_search_global_videos_load_more")) ? Video.VIDEO_GLOBAL_SEARCH_TYPE : Video.VIDEO_SEARCH_TYPE : "album" == e && (e = Video.getLoc().section));
        var o = curBox() ? curBox().bodyNode : void 0,
            i = geByClass1("_video_" + e + "_list", o);
        if (i) {
            var t = gpeByClass("ge_video_pane", i),
                r = geByClass1("ui_load_more_btn", t);
            if (r) {
                var d = clientHeight();
                scrollGetY() + d > getXY(r)[1] - d / 2 && Video.showMore(e, r)
            }
            e == Video.VIDEO_GLOBAL_SEARCH_TYPE && Video._updateLastSeenElement(i)
        }
        Video._updateChooseFixedBottom(), Video._updateThumbsInView()
    },
    _initScrollFixedSearch: function(e) {
        var o = geByClass1("video_search_input");
        toggleClass(o, "video_need_fix", e), e && (cur.fixSearchHeaderInfo = cur.fixSearchHeaderInfo || {
            searchTop: getXY(o)[1],
            mainHeaderHeight: getSize("page_header_cont")[1],
            videoContWidth: getSize(geByClass1("video_content"))[0]
        })
    },
    getFormattedUpdatedTime: function(e) {
        var o = intval(vkNow() / 1e3) - e;

        function i(e, o, i) {
            return isArray(o) && e < o.length ? o[e] : langNumeric(e, i)
        }
        var t = "video_added_";
        return o < 5 ? getLang(t + "now") : o < 60 ? i(o, cur.lang[t + "sec"][0], cur.lang[t + "sec"][1]) : o < 3600 ? i(intval(o / 60), cur.lang[t + "min"][0], cur.lang[t + "min"][1]) : o < 86400 ? i(intval(o / 3600), cur.lang[t + "hour"][0], cur.lang[t + "hour"][1]) : o < 2592e3 ? i(intval(o / 86400), cur.lang[t + "day"][0], cur.lang[t + "day"][1]) : o < 31536e3 ? i(intval(o / 2592e3), cur.lang[t + "month"][0], cur.lang[t + "month"][1]) : i(intval(o / 31536e3), cur.lang[t + "year"][0], cur.lang[t + "year"][1])
    },
    _createSorters: function(e) {
        cur.videoCanSort && (cur.videoSorter && cur.videoSorter.destroy(), "album" == (e = e || Video._getCurrentSectionType()) && (e = Video.getLoc().section), cur.videoSorter = new GridSorter(ge("video_" + e + "_list"), "video_item_thumb", {
            onReorder: Video._onReorder,
            onDragOverElClass: "video_playlist_item",
            onDragLeave: function(e, o) {
                removeClass(e, "video_on_drag_over"), removeClass(o, "video_on_drag_over")
            },
            onDragEnter: function(e, o) {
                addClass(e, "video_on_drag_over"), addClass(o, "video_on_drag_over")
            },
            onDragDrop: function(t, e) {
                var o = attr(e, "data-id").split("_"),
                    r = attr(t, "data-id");
                return ajax.post("/al_video.php", {
                    act: "a_add_to_playlist",
                    oid: o[0],
                    vid: o[1],
                    gid: cur.getOwnerId() < 0 ? -cur.getOwnerId() : 0,
                    add: 1,
                    playlist_id: r,
                    own: 1,
                    hash: cur.videoAddToPlaylistOwnHash
                }, {
                    onDone: function(e, o) {
                        if (o && o[r]) {
                            var i = Video.buildPlaylistEl(o[r]);
                            domPN(t).replaceChild(i, t), Video._reinitSorters(), cur.albumsSorter.update()
                        }
                    }
                }), !0
            }
        }))
    },
    _reinitSorters: function(e) {
        cur.videoCanSort && (clearTimeout(cur._rsto), cur._rsto = setTimeout(function() {
            cur.videoSorter ? e ? cur.videoSorter.disable() : cur.videoSorter.enable() : Video._createSorters()
        }))
    },
    _saveHistoryAction: function(e, o) {
        if (Video.isInSearch() && cur.videoGlobalSearchQuery) {
            var i = cur.videoGlobalSearchQuery + Video._buildFiltersSearchStr(),
                t = cur.globalSearchResults[i];
            t && !cur.videoSearchFilters.notsafe && uiSearch.saveHistorySearch(this.searchInputEl, cur.videoGlobalSearchQuery, e, o, t.count, t.countHash)
        }
    },
    onVideoAdd: function(e, o, _, v, i) {
        var t = gpeByClass("_video_item", o),
            h = intval(toggleClass(t, "video_added")),
            r = {};
        return r = h ? {
            playlist_id: -2
        } : {
            playlists: 0
        }, Video._saveHistoryAction(_, v), ajax.post("/al_video.php", extend({
            act: "a_add_to_playlist",
            oid: _,
            vid: v,
            add: intval(h),
            hash: i
        }, r), {
            onFail: function() {
                h && (window.tooltips && tooltips.destroyAll(), removeClass(t, "video_added"))
            },
            onDone: function(e, o, i) {
                var t = cur.currentSortings && (!cur.currentSortings.all || "default" == cur.currentSortings.all),
                    r = !!cur._preloadedPages && geByClass1("_video_list_my_all", cur._preloadedPages.all),
                    d = !1;
                if (r) {
                    var a = geByClass1("ge_video_item_" + _ + "_" + v, r);
                    a && re(a), d = !!a, h && t && r.insertBefore(Video.buildVideoEl(i), r.firstChild)
                }
                if (cur.silentLoaded && cur.silentLoaded[vk.id] && cur.silentLoaded[vk.id].all) {
                    var n = cur.silentLoaded[vk.id].all;
                    if (h) t && (n.unshift(i), Video._reindex(n));
                    else
                        for (var c = 0, s = n.length; c < s; c++)
                            if (n[c][0] == _ && n[c][1] == v) {
                                n.splice(c, 1);
                                break
                            } if (cur.videosCount[vk.id]) {
                        var l = h ? 1 : -1;
                        1 == l && d && (l = 0);
                        var u = cur.videosCount[vk.id].all = Math.max(0, (cur.videosCount[vk.id].all || 0) + l);
                        Video.updateTabCounter(u)
                    }
                }
            }
        }), window.tooltips && tooltips.destroyAll(), cancelEvent(e)
    },
    updateTabCounter: function(e) {
        var o = ge("video_tab_all");
        o && (geByClass1("ui_tab_count", o).innerHTML = e)
    },
    onVideoMove: function(e, o, i, t, r) {
        return showBox("/al_video.php", {
            act: "video_playlists_box",
            target_id: cur.getOwnerId(),
            oid: i,
            vid: t,
            hash: r
        }, {
            dark: 1
        }), cancelEvent(e)
    },
    _showProgressPanel: function(e) {
        var o = se('<div class="video_delete_progress _video_delete_progress"><div class="round_spinner"></div></div>');
        return e.appendChild(o), o
    },
    onVideoDelete: function(e, o, i, t, r) {
        var d = gpeByClass("_video_item", o),
            a = (attr(d, "data-id"), Video._getCurrentSectionType());
        addClass(d, "video_deleted");
        var n = Video._showProgressPanel(d),
            c = "album" == a ? Video._getSectionAlbumId() : -2;
        return cur.videoRecentlyRemoved || (cur.videoRecentlyRemoved = {}), cur.videoRecentlyRemoved[i + "_" + t] = !0, ajax.post("/al_video.php", {
            act: "a_delete_video",
            oid: i,
            vid: t,
            from: cur.oid,
            pl_id: c,
            hash: r
        }, {
            onDone: function(e) {
                re(n), d.appendChild(se(e));
                var o = data(d, "restoreTO");
                clearTimeout(o), o = setTimeout(function() {
                    re(geByClass1("_video_restore_act", d))
                }, 6e4), data(d, "restoreTO", o)
            }
        }), Video._reinitSorters(!0), cancelEvent(e)
    },
    restoreVideo: function(e, o, i, t, r) {
        var d = gpeByClass("_video_item", e),
            a = gpeByClass("_video_restore", e),
            n = Video._showProgressPanel(d),
            c = Video._getCurrentSectionType();
        re(a);
        var s = "album" == c ? Video._getSectionAlbumId() : -2;
        ajax.post("/al_video.php", {
            act: "a_restore_video",
            from: t,
            video_id: i,
            pl_id: s,
            hash: r
        }, {
            onDone: function() {
                removeClass(d, "video_deleted"), re(n)
            }
        }), delete cur.videoRecentlyRemoved[i]
    },
    onVideoEdit: function(e, o, i, t, r) {
        return cur.videoEditItem = gpeByClass("video_item", o), window.Videoview && Videoview.hidePlayer(), showBox("al_video.php", {
            act: "edit_box",
            vid: t,
            oid: i
        }, {
            dark: 1
        }).setOptions({
            onHide: function() {
                window.Videoview && Videoview.showPlayer()
            }
        }), cancelEvent(e)
    },
    switchChooserToOwner: function(e) {
        var o = curBox(),
            i = !!cur.isSnippetVideoSelection,
            t = {
                to_id: e,
                switched: 1
            };
        i && (t.snippet_video = 1), showBox("al_video.php", extend(t, {
            act: "a_choose_video_box"
        }), {
            showProgress: o.showCloseProgress.bind(o),
            hideProgress: o.hideCloseProgress.bind(o),
            cache: 1,
            dark: 1,
            onDone: function() {
                curBox().hide(), showBox("al_video.php", extend(t, {
                    act: "a_choose_video_box"
                }), {
                    cache: 1,
                    dark: 1,
                    onDone: function() {
                        cur.videoUploadParams.vars.is_wall_upload_allowed || re("video_choose_upload_area_wrap")
                    }
                })
            }
        })
    },
    chooseBoxBack: function() {
        cur.videoChoosePrevSection = cur.videoChoosePrevSection || "all", 0 == cur.videoChoosePrevSection.indexOf("album_") && (cur.videoChoosePrevSection = "albums"), nav.go("/videos?section=" + cur.videoChoosePrevSection)
    },
    initChooseBox: function(e, i, o, s, t, r, d) {
        cur.found = {}, cur.currentSortings = {}, cur._preloadedPages = {}, cur.videoSearchFilters = {}, cur.chosenVideos = [], cur.albumsShowingAll = {}, cur.isNoteEdit = e, cur.videoShowWindow = {}, cur.isSnippetVideoSelection = d;
        var l = curBox(),
            a = cur.getOwnerId;

        function u() {
            l.setOptions({
                width: 631,
                bodyStyle: "padding: 0",
                hideButtons: !0
            }), ge("box_layer_wrap").scrollTop = 0
        }

        function _() {
            each(Video.AVAILABLE_TABS, function(e, o) {
                hide("video_subtab_pane_" + o)
            }), hide(geByClass1("video_subtab_pane_album"))
        }

        function v() {
            l.setOptions({
                title: '<div class="back" onclick="Video.chooseBoxBack();">' + getLang("video_choose_box_back_to_videos") + "</div>",
                bodyStyle: "padding: 0",
                noRefreshCoords: 1
            })
        }

        function h() {
            var e = t;
            if (!r && !i && cur.videoSwitchOwnerId) {
                var o = s == vk.id ? getLang("video_choose_wall_to_group_videos") : getLang("video_choose_wall_to_my_videos");
                e += '<span class="divider">|</span><a class="toggle" onclick="Video.switchChooserToOwner(' + (s == vk.id ? cur.videoSwitchOwnerId : vk.id) + ')">' + o + "</a>"
            }
            l.getOptions().defaultTitle && (e = l.getOptions().defaultTitle), l.setOptions({
                title: e,
                grey: i
            })
        }

        function g() {
            curBox() && each(geByClass("video_item", curBox().bodyNode), function() {
                var e = geByClass1("media_check_btn_wrap", this),
                    o = this.getAttribute("data-id");
                toggleClass(e, "checked", -1 != cur.chosenVideos.indexOf(o))
            })
        }
        cur.getOwnerId = function() {
            return s
        }, l.setOptions({
            onHideAttempt: function() {
                return cur.getOwnerId = a, !0
            }
        }), cur.nav.push(function(e, o, i, t) {
            if (!t.filtersChanged && 1 == Object.keys(i).length && i[0] && 0 != i[0].indexOf("video") && !t.fromSearch) return !0;
            if (e[0] && !e.section && i[0] != "videos" + s) return !0;
            hide("global_prg");
            var r = geByClass1("video_default_tabs", l.bodyNode),
                d = geByClass1("video_subtab_pane_album", l.bodyNode),
                a = e.section ? e.section : "all";
            Video._prepareSearchFilters(i);
            var n = e.section ? "" : i.q || val(cur.searchInputEl);
            if (n ? (trim(val(cur.searchInputEl)), trim(n), a = "search", t.fromSearch || t.globalQuery || (t.globalQuery = n), Video.doSearch(n, t.globalQuery), v(), Video._updateChooseFixedBottom()) : (Video.inputVal(cur.searchInputEl, ""), Video.doSearch("")), cur.videoForcedSection = a, -1 != Video.AVAILABLE_TABS.indexOf(a)) _(), show("video_subtab_pane_" + a), show(r), hide("albumPane"), h(), u(), "albums" != (cur.videoChoosePrevSection = a) && Video.loadSilent(a), Video.updateEmptyPlaceholder(a);
            else if (a && 0 == a.indexOf("album_")) {
                var c = a.split("_")[1];
                showGlobalPrg(ge("video_playlist_item_" + c), {
                    cls: "progress_inv_img",
                    w: 46,
                    h: 16,
                    shift: [0, -22],
                    zIndex: 1e3
                }), Video._addPendingAction(a, function() {
                    v(), _(), hide("global_prg"), hide(r), d.id = "video_subtab_pane_" + a;
                    var e = geByClass1("video_items_list", d);
                    e.id = "video_" + a + "_list", addClass(e, "_video_" + a + "_list"), e.innerHTML = "", show(d);
                    var o = cur.getOwnerId();
                    cur.videoShowWindow = cur.videoShowWindow || {}, cur.videoShowWindow[o] = cur.videoShowWindow[o] || {}, cur.videoShowWindow[o][a] = !1, Video.showMore(a, geByClass1("ui_load_more_btn", ge("video_subtab_pane_album"))), u(), g(), Video._updateChooseFixedBottom()
                }), cur.videoChoosePrevSection = a, Video.loadSilent(a)
            }
            return g(), !1
        }), cur.chooseVideoToMail = o, cur.isCurrentVideoLayer = !0, Video.loadSilent(), u(), addEvent(ge("box_layer_wrap"), "scroll", Video.onScroll);
        var n = boxLayerWrap.scrollTop;
        elfocus(geByClass1("_scroll_node", l.bodyNode)), boxLayerWrap.scrollTop = n, Video.initSearch(), h(), i || (cur.chooseVideoMedia = function(e, o, i) {
            var t = e;
            hasClass(t, "media_check_btn_wrap") ? cur.cancelClick = !0 : t = geByClass1("media_check_btn_wrap", t), toggleClass(t, "checked");
            var r;
            if (0 <= (r = cur.chosenVideos.indexOf(o))) cur.chosenVideos.splice(r, 1);
            else {
                if (10 <= cur.chosenVideos.length) return;
                cur.chosenVideos.push(o)
            }
            if (1 == cur.chosenVideos.length && !i) return Video.doAttachSelectedVideos(e), !1;
            var d = ge("video_choosebox_bottom");
            if (0 < cur.chosenVideos.length) {
                show(d);
                var a = cur.chooseVideoAdd ? cur.lang.video_add_videos : cur.lang.global_attach_videos;
                val(geByClass1("video_choosebox_attach_btn", d), langNumeric(cur.chosenVideos.length, a)), Video._updateChooseFixedBottom()
            } else hide(d);
            return toggleClass(ge("video_choose_box"), "with_bottom_fixed", isVisible(d)), !1
        }), window.uiScrollBox && uiScrollBox.init(curBox(), {
            onHide: function() {
                hide("global_prg"), cur.nav.pop(), removeEvent(ge("box_layer_wrap"), "scroll", Video.onScroll), cur.isCurrentVideoLayer = !1
            }
        })
    },
    doAttachSelectedVideos: function(e, o) {
        hasClass(e, "flat_button") ? lockButton(e) : showGlobalPrg(geByClass1("video_item_thumb_wrap", e) || e, {
            cls: "progress_inv_img",
            w: 46,
            h: 16,
            zIndex: 1e3
        });
        var i = function() {
            hasClass(e, "flat_button") && unlockButton(e), hide("global_prg")
        };
        if (cur.chooseVideoAdd) return cur.chooseVideoAdd(cur.chosenVideos, "", i);
        Video.attachVideos(cur.chosenVideos, i)
    },
    attachVideos: function(e, o) {
        ajax.post("al_video.php", {
            act: "a_videos_attach_info",
            to_mail: intval(cur.chooseVideoToMail),
            videos: e.join(",")
        }, {
            onDone: function(e) {
                if (o && o(), cur.isSnippetVideoSelection && cur.chooseSnippetVideo) return each(e, function(e, o) {
                    return cur.chooseSnippetVideo(e, o), !1
                }), void(curBox() && curBox().hide());
                var i = 0;
                each(e, function(e, o) {
                    cur.isNoteEdit && window.editorChooseVideo ? window.editorChooseVideo(o.thumb, o.name, o.duration, "/video" + e, e) : cur.chooseMedia("video", e, o, i, 1 < cur.chosenVideos.length), i++
                }), curBox() && 1 < cur.chosenVideos.length && curBox().hide()
            }
        })
    },
    _updateChooseFixedBottom: function() {
        var e = curBox(),
            o = ge("video_choosebox_bottom");
        if (e && o) {
            var i = gpeByClass("box_layout", e.bodyNode);
            0 < getSize(i)[1] + (getXY(i)[1] - scrollGetY()) - clientHeight() ? addClass(o, "fixed") : removeClass(o, "fixed")
        }
    },
    _addPendingAction: function(e, o) {
        var i = cur.getOwnerId ? cur.getOwnerId() : cur.oid;
        if (cur.videoPendingAction = cur.videoPendingAction || {}, cur.videoPendingAction[i] = cur.videoPendingAction[i] || {}, e) {
            var t = cur.videoPendingAction[i][e];
            cur.videoPendingAction[i][e] = function() {
                o(), t && t()
            }
        }
    },
    _callPendingAction: function(e) {
        Video._addPendingAction();
        var o = Video.getCurOwnerId();
        cur.videoPendingAction[o][e] && cur.videoPendingAction[o][e](), cur.videoPendingAction[o][e] = !1
    },
    _clearPendingAction: function(e) {
        Video._addPendingAction();
        var o = Video.getCurOwnerId();
        cur.videoPendingAction[o][e] = !1
    },
    toggleTooltip: function(e, o) {
        showTooltip(e, {
            appendParentCls: "videocat_row",
            black: 1,
            text: o,
            shift: [9, 18, 3],
            needLeft: !0
        })
    },
    toggleAddTooltip: function(e, o, i) {
        var t = gpeByClass("_video_item", e);
        Video.toggleTooltip(e, hasClass(t, "video_added") ? i : o)
    },
    show: function(e, o, i, t) {
        if (cur.articleEditorLayer) return cancelEvent(e);
        if (cur.isCurrentChooseVideoBox) {
            var r = window.event,
                d = o.split("_");
            return ajax.post("al_video.php", {
                act: "a_video_photo_sizes",
                oid: d[0],
                vid: d[1],
                type: cur.isCurrentChooseVideoBox
            }, {
                onDone: function() {
                    switch (window.event = r || window.event, cur.isCurrentChooseVideoBox) {
                        case "video_add":
                            cur.chooseVideoAdd(o, arguments[0]);
                            break;
                        case "wiki_editor":
                            editorChooseVideo(arguments[0], arguments[1], arguments[2], "video" + o, o);
                            break;
                        case "video_choose":
                            cur.chooseMedia("video", o, arguments[0])
                    }
                }
            }), cancelEvent(e), !1
        }
        if (t && hasClass(t, "video_row_deleted")) return !1;
        if (!vk.id && t && hasClass(t, "video_row_not_public")) return showDoneBox(getLang("video_please_sign_in")), !1;
        var a = extend({
                root: 1,
                autoplay: 1
            }, i || {}),
            n = i ? i.listId : "";
        if (n || (n = cur.oid < 0 ? "club" + -cur.oid : cur.pvVideoTagsShown && cur.pvShown ? "tag" + cur.pvVideoTagsShown : ""), !a.module) {
            var c = cur.currentModule ? cur.currentModule() : cur.module;
            "video_search" == c && isAncestor(t, "video_search_videos_list") && (c = "video_search_local"), a.module = c
        }
        if (Video.isInVideosList() && !a.playlistId) {
            var s, l = Video.getLoc().section || "all";
            "all" == l ? a.playlistId = cur.oid + "_-2" : "uploaded" == l ? a.playlistId = cur.oid + "_-1" : (s = l.match(/^album_(\d+)$/)) && (a.playlistId = cur.oid + "_" + s[1])
        }
        if (Video.isInCatalog() && a.playlistId && /^cat_\d+$/.test(a.playlistId) && t) {
            var u = gpeByClass("videocat_row", t),
                _ = u ? u.getAttribute("data-type") : "";
            (_ = intval(_.replace("cat_", ""))) && cur.moreVideosInfo[_] && (a.catLoadMore = function(e, o, i) {
                Videocat.slideLoadMore(e, o, i)
            }.pbind(u, _))
        }
        if (a.playlistId && (a.addParams = extend(a.addParams || {}, {
                playlist_id: a.playlistId,
                show_next: intval(window.VideoPlaylist && !!VideoPlaylist.getList(a.playlistId)),
                force_no_repeat: 1
            })), a.playlistId && /^cat_ugc_popular/.test(a.playlistId) && (statlogsValueEvent("videocat_popular", "", "play"), cur.popularQid)) {
            a.addParams = extend(a.addParams || {}, {
                suggestions_qid: cur.popularQid
            });
            var v = domPN(t),
                h = geByClass("video_item", ge("videocat_page_block_ugc_popular")),
                g = indexOf(h, v) + 1;
            vkImage().src = "//go.imgsmail.ru/vk?pxn=vic&qid=" + cur.popularQid + "&vid=" + o + "&p=" + g + "&t=0"
        }
        if (cur.videoSearchStats) {
            var S = domClosest("video_item", t);
            if (S && S.hasAttribute("data-search-pos")) {
                cur.videoSearchPos = parseInt(S.getAttribute("data-search-pos")), cur.videoSearchPos > cur.videoSearchStats.lastSeenIndex && (cur.videoSearchStats.lastSeenElement = S, cur.videoSearchStats.lastSeenIndex = cur.videoSearchPos), cur.videoSearchStats.positions[cur.videoSearchPos] = extend({
                    clicked: 0
                }, cur.videoSearchStats.positions[cur.videoSearchPos]), cur.videoSearchStats.positions[cur.videoSearchPos].clicked++;
                var V = ++cur.videoSearchStats.clickNum,
                    p = (new Date).getTime() - cur.videoSearchStats.lastActionTime;
                a.addParams = extend(a.addParams || {}, {
                    click_num: V,
                    click_time: p
                })
            }
        }
        var f = o.split("_");
        return Video._saveHistoryAction(f[0], f[1]), showVideo(o, n, a, e)
    },
    isInVideosList: function() {
        var e = Video.getLoc();
        return /^videos-?\d+|video-?\d+_\d+$/.test(e[0]) && !e.q && (inArray(Video._getCurrentSectionType(), Video.AVAILABLE_TABS) || Video.isInAlbum())
    },
    onDeleteFromPlaylist: function(event, vid, oid) {
        var video = !1,
            list = cur.videoList[cur.vSection].list,
            spliceIndex = -1;
        if (each(list, function(e, o) {
                if (o[0] == oid && o[1] == vid) return video = o, !1
            }), "all" == cur.vSection) video[VideoConstants.VIDEO_ITEM_INDEX_HASH] && ajax.post("/al_video.php", {
            act: "a_delete_from_all_albums",
            vid: vid,
            oid: oid,
            target_id: cur.oid,
            hash: video[VideoConstants.VIDEO_ITEM_INDEX_HASH]
        }, {
            onDone: function() {
                Video.updateVideo(cur.oid, video, [], !0), Video.initSorter()
            }
        });
        else {
            var hash, currPlaylistId = (cur.vSection || "_").split("_")[1];
            each(cur.sections, function(e, o) {
                if (o[0] == currPlaylistId) return hash = o[VideoConstants.VIDEO_ITEM_INDEX_HASH], !1
            }), hash && ajax.post("/al_video.php", {
                act: "a_add_to_playlist",
                vid: vid,
                oid: oid,
                gid: cur.oid < 0 ? -cur.oid : 0,
                hash: hash,
                playlist_id: currPlaylistId,
                add: 0
            }, {
                onDone: function(playlists) {
                    var playlists = eval("(" + playlists + ")"),
                        removed = [currPlaylistId];
                    playlists.push(currPlaylistId), Video.updateVideo(cur.oid, video, playlists, !1, [], removed), Video.initSorter()
                }
            })
        }
        window.tooltips && tooltips.hideAll(), cancelEvent(event)
    },
    deleteAlbum: function(e, o) {
        return e = e.split("_")[1], showBox("al_video.php", {
            act: "delete_album",
            aid: e,
            oid: cur.oid
        }, {
            dark: 1
        }), cancelEvent(o)
    },
    editAlbum: function(e, o) {
        return e = e.split("_")[1], showBox("al_video.php", {
            act: "edit_album",
            oid: cur.oid,
            aid: e
        }, {
            dark: 1
        }), cancelEvent(o)
    },
    createAlbum: function() {
        showBox("al_video.php", {
            act: "edit_album",
            oid: cur.oid
        }, {
            dark: 1
        })
    },
    uploadVideoBox: function() {
        if (cur.uploadBanned) return showFastBox({
            title: getLang("video_no_upload_title")
        }, getLang("video_claims_no_upload")), !1;
        showTabbedBox("al_video.php?act=upload_box", {
            oid: cur.oid
        }, {
            stat: ["video_edit.css", "privacy.css", "privacy.js"],
            params: {
                bodyStyle: "position: relative;",
                dark: 1,
                hideButtons: 1
            }
        });
        return !1
    },
    isVideoPlayerOpen: function(e, o) {
        var i = e;
        return o && (i += "_" + o), window.mvcur && !0 === mvcur.mvShown && mvcur.videoRaw === i
    },
    startPollVideoReady: function(o, i) {
        var t = o + "_" + i;
        setTimeout(function() {
            ajax.post("al_video.php", {
                act: "check_upload_status",
                video: t,
                oid: o,
                vid: i
            }, {
                onDone: function(e) {
                    Video.isVideoPlayerOpen(o, i) && (e ? (mvcur.minimized ? Videoview.hide(!1, !0) : Videoview.backLocation(), showVideo(t, "", {})) : Video.startPollVideoReady(o, i))
                }
            })
        }, 1e4)
    },
    showPlaylistsBox: function(e, o, i) {
        showBox("/al_video.php", {
            act: "video_playlists_box",
            target_id: cur.oid,
            oid: i,
            vid: o
        }, {
            dark: 1
        }), cancelEvent(e)
    },
    tcSlide: function(e, o, i, t) {
        var r = gpeByClass("video_tc_slider", o),
            d = geByClass1("video_tc_slider_cont", r),
            a = getSize(d.children[0])[0] + 5,
            n = data(d, "currOffset") || 0;
        n += i, n = Math.max(4 - d.children.length, Math.min(0, n)), data(d, "currOffset", n), t && addClass(d, "no_transition"), setStyle(d, {
            left: n * a
        }), t && setTimeout(function() {
            removeClass(d, "no_transition")
        });
        var c = 0 == n,
            s = n == -(d.children.length - 4),
            l = geByClass1("video_tc_btn_left", r),
            u = geByClass1("video_tc_btn_right", r);

        function _(e, o) {
            e ? addEvent(o, "mouseleave", function() {
                setStyle(o, "pointer-events", "none"), removeEvent(o, "mouseleave")
            }) : setStyle(o, "pointer-events", "all")
        }
        return toggleClass(l, "video_tc_btn_none", c), toggleClass(u, "video_tc_btn_none", s), _(c, l), _(s, u), e && cancelEvent(e), !1
    },
    deleteUploadedVideo: function() {
        showFastBox({
            title: getLang("video_header_delete"),
            bodyStyle: "padding: 20px; line-height: 160%;",
            dark: 1,
            forceNoBtn: 1
        }, getLang("video_delete_all_user_uploaded"), getLang("box_yes"), function() {
            ajax.post("al_video.php", {
                act: "deleteAllUploaded",
                oid: cur.oid
            }, {
                showProgress: function() {
                    curBox().showProgress()
                },
                onDone: function() {
                    boxQueue.hideLast()
                }
            })
        }, getLang("box_no"))
    },
    updateAlbum: function() {},
    updateVideo: function() {},
    _initSearchStats: function(e) {
        cur.videoSearchPos = null, cur.videoSearchStats = {
            loc: e,
            totalViews: 0,
            lastSeenElement: null,
            lastSeenIndex: -1,
            totalViewedTime: 0,
            clickNum: 0,
            lastActionTime: (new Date).getTime(),
            positions: []
        }
    },
    _clearSearchStats: function() {
        delete cur.videoSearchPos, delete cur.videoSearchStats
    },
    logSearchStats: function() {
        if (cur.vSearchInputBlurred && cur.videoSearchStats) {
            cur.vSearchInputBlurred = !1;
            var e = cur.videoSearchStats.loc.q + Video._buildFiltersSearchStr();
            if (!cur.globalSearchResults || !cur.globalSearchResults[e]) return;
            for (var o = cur.globalSearchResults[e].list || [], i = Video._serializeSearchParams(cur.videoSearchStats.loc), t = cur.videoSearchStats.lastSeenIndex + 1, r = [], d = 0; d < t; d++) {
                var a = extend(cur.videoSearchStats.positions[d] || {}, Video._extractSearchStat(o[d]));
                r.push(Video._serializeSearchStat(a))
            }
            ajax.post("al_video.php", {
                act: "a_search_query_stat",
                query: i,
                count: cur.videoSearchStats.totalViews,
                total_viewed_time: cur.videoSearchStats.totalViewedTime,
                scrolled_until: t,
                position_stats: r
            })
        }
    },
    _serializeSearchParams: function(e) {
        return (e.hd ? "1" : "0") + "#" + (e.notsafe ? "1" : "0") + "#" + (e.order || "") + "#" + (e.date || "") + "#" + (e.len || "") + "#" + e.q
    },
    _extractSearchStat: function(e) {
        return e ? {
            oid: e[0],
            vid: e[1]
        } : {}
    },
    _serializeSearchStat: function(e) {
        e = e || {};
        for (var o = "", i = 0; i < Video.SEARCH_STATS_POSITION_FIELDS.length; i++) {
            var t = e[Video.SEARCH_STATS_POSITION_FIELDS[i]];
            null == t && (t = ""), o += o ? "," + t : t
        }
        return o
    },
    _updateLastSeenElement: function(e) {
        if (cur.videoSearchStats && (null !== cur.videoSearchStats.lastSeenElement && e.contains(cur.videoSearchStats.lastSeenElement) || (cur.videoSearchStats.lastSeenElement = domFC(e), cur.videoSearchStats.lastSeenElement))) {
            cur.videoSearchStats.lastSeenIndex = 0;
            var o = clientHeight(),
                i = domNS(cur.videoSearchStats.lastSeenElement);
            if (i) {
                for (var t = i.getBoundingClientRect(); null !== i && t.top + i.clientHeight / 2 < o && (cur.videoSearchStats.lastSeenElement = i, i = domNS(cur.videoSearchStats.lastSeenElement));) t = i.getBoundingClientRect();
                cur.videoSearchStats.lastSeenIndex = parseInt(cur.videoSearchStats.lastSeenElement.getAttribute("data-search-pos")) || 0
            }
        }
    },
    _updateThumbsInView: function() {
        clearTimeout(this._updateThumbsInViewTO), this._updateThumbsInViewTO = setTimeout(function() {
            var r = null,
                d = clientHeight(),
                a = "im" == cur.module ? 0 : scrollGetY();
            each(geByClass("_video_item_thumb"), function(e, o) {
                if (domData(o, "thumb")) {
                    var i = getXY(o, "im" == cur.module)[1];
                    if (r = r || getSize(o), i > a - r[1] - 800 && i < a + d + 800) {
                        var t = domData(o, "thumb");
                        domData(o, "thumb", null), setStyle(o, "background-image", "url('" + t + "')")
                    }
                }
            })
        }, 50)
    },
    copyAlbumVideosList: function() {
        var e = Video._getCurrentSectionType(),
            o = cur.getOwnerId();
        if ("album" == e && (e = Video.getLoc().section), !0 !== cur.silentLoadingProgress[o][e] && cur.silentLoaded[o][e]) {
            var i = cur.silentLoaded[o][e].map(function(e) {
                return "https://vk.com/video" + e[VideoConstants.VIDEO_ITEM_INDEX_OWNER_ID] + "_" + e[VideoConstants.VIDEO_ITEM_INDEX_ID]
            }).join("\n");
            showFastBox("", '<textarea class="dark" style="width: 100%; height: 350px;">' + i + "</textarea>")
        } else showFastBox("", "List has not loaded yet")
    },
    getCurOwnerId: function() {
        return cur.getOwnerId ? cur.getOwnerId() : cur.oid
    }
};
try {
    stManager.done("video.js")
} catch (e) {}