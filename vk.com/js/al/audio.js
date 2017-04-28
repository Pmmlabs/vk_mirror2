function currentAudioPage(e) {
    var t = gpeByClass("_audio_page_layout", e);
    return t ? data(t, "audioPage") : !1
}

function AudioPage(e, t, i) {
    data(e, "audioPage", this), extend(cur.lang || {}, t.langs), getAudioPlayer().langs = t.langs, this._data = t, this._ownerId = t.ownerId, this.isLayer() || (cur.audioPage = this), this.isLayer() && uiSearch.init("audio_search_layer"), AudioUtils.toggleAudioHQBodyClass(), this._els = {
        pageContainer: e,
        sections: geByClass1("_audio_page_sections", e),
        promo: geByClass1("_audio_section_promo", e),
        playerWrap: geByClass1("_audio_page_player_wrap", e),
        player: geByClass1("_audio_page_player", e),
        contentBlock: geByClass1("_audio_page_content_block", e),
        scrollWrap: geByClass1("_audio_page_content_block_wrap", e),
        searchSectionAudios: geByClass1("_audio_section_search__local_audios_list", e),
        searchSectionAudiosHeader: geByClass1("_audio_section_search__local_audios_header", e),
        searchSectionPlaylists: geByClass1("_audio_section_search__local_playlists_list", e),
        searchSectionPlaylistsHeader: geByClass1("_audio_section_search__local_playlists_header", e),
        searchNoLocalResults: geByClass1("_audio_local_no_results", e),
        searchGlobalCommunitiesPlace: geByClass1("_audio_section_global_search__communities_place", e),
        searchGlobalAudiosBlock: geByClass1("_audio_section_global_search__audios_block", e),
        searchGlobalAudiosBlockHeader: geByClass1("_audio_section_global_search__audios_header", e),
        searchGlobalAudiosList: geByClass1("_audio_section_global_search__audios_list", e),
        recomsBlocks: geByClass1("_audio_recoms_blocks", e),
        searchInput: geByClass1("ui_search_field", geByClass1("_audio_search", e)),
        footer: geByClass1("_audio_page__footer", e),
        footerNowPlayingInfo: geByClass1("_audio_page__footer_now_playing", e),
        footerClearNowPlayingButton: geByClass1("_audio_page__footer_clear_playlist", e)
    }, this.isLayer() && (this._scroll = new uiScroll(this._els.scrollWrap, {
        global: !0,
        stopScrollPropagation: !0,
        stopScrollPropagationAlways: !0
    })), this._readyAudio = this._data.readyAudio, !this._readyAudio && this._pagePlaylist && (this._readyAudio = this._pagePlaylist.getAudioAt(0)), this._data.playlistCoverUploadOptions && (cur.audioCoverUploadOptions = cur.audioCoverUploadOptions || {}, cur.audioCoverUploadOptions[this._ownerId] = this._data.playlistCoverUploadOptions), this._initPlayer(), this._initPlaylists(), this.initNavigation(), this.showSection(t.initSection), this._initSearchParams(), this._els.searchInput.focus(), !this.isLayer() && nav.objLoc.q && (this._els.searchInput.value = nav.objLoc.q, this._showSearchSection(nav.objLoc)), this.updateCurrentPlayingInfo(), getAudioPlayer().setStatusExportInfo(this._data["export"]), this.updateStatusExportControls(), this._initKeyEvents(), window.onAudioPageLoaded && (window.onAudioPageLoaded.call(this), delete window.onAudioPageLoaded)
}
AudioPage.address = "audio", AudioPage.updateSearchHighlight = function(e) {
    var t = geByClass1("_audio_playlist", gpeByClass("_audio_layout", this));
    toggleClass(t, "audio_search_focused", "focus" == e.type)
}, AudioPage.onSearchFocused = function(e) {
    AudioPage.updateSearchHighlight(e)
}, AudioPage.onSearchBlurred = function(e) {}, AudioPage.deletePlaylist = function(e, t, i) {
    function a() {
        ajax.post("al_audio.php", {
            act: "delete_playlist",
            hash: i,
            playlist_owner_id: e,
            playlist_id: t,
            page_owner_id: cur.audioPage ? cur.audioPage.getOwnerId() : 0
        }, {
            onDone: function(e) {
                if (cur.audioPage) {
                    var t = geByClass1("_audio_section__all", cur.audioPage.getPageContainer()),
                        i = geByClass1("_audio_page_block__playlists_items", t);
                    if (i) {
                        var a = intval(domData(i, "max-items"));
                        e && i.children.length < a && i.appendChild(se(getTemplate("audio_pl_item", e))), 0 == i.children.length && (addClass(gpeByClass("_audio_page_section_layout", i), "no_playlists"), re(gpeByClass("_audio_page_titled_block", i)))
                    }
                }
            }
        }), boxQueue && boxQueue.hideAll(), layers && layers.fullhide && layers.fullhide(), each(geByClass("_audio_pl_" + e + "_" + t), function() {
            re(this)
        }), cur.audioPage && (cur.audioPage._data.playlists = cur.audioPage._data.playlists.filter(function(i) {
            return !(i.id == t && i.owner_id == e)
        }))
    }
    var o = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, e, t),
        s = AudioPlayer.getLang("audio_sure_delete_playlist_box_text");
    s = s.replace("{name}", o.getTitle()), s = '<div style="overflow: hidden; text-overflow: ellipsis;">' + s + "</div>";
    showFastBox({
        title: AudioPlayer.getLang("audio_sure_delete_playlist_box_title"),
        dark: 1
    }, s, AudioPlayer.getLang("audio_sure_delete_playlist_box_yes"), a.bind(this), getLang("global_cancel"))
}, AudioPage.prototype._initPlaylists = function(e) {
    return this._data.generic ? e && e([]) : void AudioPage.loadPlaylists(this.getOwnerId(), this._data.playlistsTotal, !0, !1, function(t) {
        this._data.playlists = this._data.playlists.concat(t), this._data.playlistsIndex = new vkIndexer(this._data.playlists, function(e) {
            return e.title
        }), e && e()
    }.bind(this))
}, AudioPage.prototype.getOwnerPlaylists = function() {
    return this._data.playlists
}, AudioPage.loadPlaylists = function(ownerId, totalCount, skipFirstChunk, forAttachBox, onDone) {
    function onAllLoaded() {
        var e = [];
        each(chunks, function(t, i) {
            i && (e = e.concat(i))
        }), cur.playlistsCache[cacheKey] = e, onDone && onDone(e)
    }

    function _loadChunk(chunkIndex, _cb) {
        ajax.post("al_audio.php", {
            act: "owner_playlists",
            owner_id: ownerId,
            offset: chunkIndex * chunkSize,
            is_attach: forAttachBox ? 1 : 0
        }, {
            onDone: function(playlists, totalCount, additionalData) {
                additionalData.templates_script && eval(additionalData.templates_script), additionalData.langs && extend(cur.lang, additionalData.langs), additionalData.audio_playlist_cover_upload_options && (cur.audioCoverUploadOptions = cur.audioCoverUploadOptions || {}, cur.audioCoverUploadOptions[ownerId] = additionalData.audio_playlist_cover_upload_options), chunks[chunkIndex] = playlists, _cb(totalCount)
            }
        })
    }

    function _loadAllChunks(e, t, i) {
        var a = Math.ceil(e / chunkSize);
        if (a && a - t != 0)
            for (var o = new callHub(i, a - t), s = t; a > s; s++) _loadChunk(s, function() {
                o.done()
            });
        else i()
    }
    var chunkSize = 100,
        chunks = [];
    isFunction(totalCount) && (onDone = totalCount, totalCount = void 0, skipFirstChunk = !1), cur.playlistsCache = cur.playlistsCache || {};
    var cacheKey = ownerId + "_" + intval(skipFirstChunk);
    return cur.playlistsCache[cacheKey] ? onDone(cur.playlistsCache[cacheKey]) : void(isUndefined(totalCount) ? _loadChunk(0, function(e) {
        _loadAllChunks(e, 1, onAllLoaded)
    }) : _loadAllChunks(totalCount, skipFirstChunk ? 1 : 0, onAllLoaded))
}, AudioPage.prototype.getOwnerId = function() {
    return this._ownerId
}, AudioPage.prototype.getPageContainer = function() {
    return this._els.pageContainer
}, AudioPage.prototype.canAddToGroup = function() {
    return this._data.canAudioAddToGroup
}, AudioPage.prototype.updateCurrentPlayingInfo = function() {
    if (this.isLayer()) {
        var e = getAudioPlayer().getCurrentPlaylist(),
            t = e ? e.getTitle() : "";
        t ? this._els.footerNowPlayingInfo.innerHTML = getLang("audio_current_playing_from").replace("{playlist}", t) : this._els.footerNowPlayingInfo.innerHTML = "", this._els.footerClearNowPlayingButton.innerHTML = getLang("audio_clear_current_playlist"), toggle(this._els.footer, !!e)
    }
}, AudioPage.prototype.onSearchFiltersChanged = function(e) {
    var t = window.radioBtns["audio_search_type_" + intval(this.isLayer())],
        i = intval(this._searchSortFilter.selectedItems()[0][0]),
        a = {
            performer: t.val ? 1 : null,
            lyrics: hasClass(geByClass1("_audio_fltr_with_lyrics", this._els.pageContainer), "on") ? 1 : null,
            sort: i ? 1 : null
        };
    this.syncParametersUI(a);
    var o = e && isObject(e) ? e : a;
    this.isLayer() && (o = extend({}, this._prevLoc, o)), nav.change(o, !1, {
        fromSearch: !0,
        filtersChanged: !0
    })
}, AudioPage.prototype._initSearchParams = function() {
    window.radioBtns["audio_search_type_" + intval(this.isLayer())] = {
        els: geByClass("_audio_search_type", this._els.pageContainer),
        keep: this.isLayer()
    }, this._searchSortFilter = new Dropdown(geByClass1("_audio_fltr_sort", this._els.pageContainer), this._data.sortFilters, {
        big: 1,
        zeroPlaceholder: !0,
        onChange: this.onSearchFiltersChanged.bind(this)
    }), this.isLayer() || this.syncParametersUI(nav.objLoc)
}, AudioPage.prototype.syncParametersUI = function(e) {
    var t = "audio_search_type_" + intval(this.isLayer()),
        i = window.radioBtns[t];
    i && radiobtn(i.els[e.performer ? 1 : 0], !!e.performer, t);
    var a = geByClass1("_audio_fltr_with_lyrics", this._els.pageContainer);
    toggleClass(a, "on", !!e.lyrics);
    var o = {
            performer: AudioPlayer.getLang("audio_performers_only"),
            lyrics: AudioPlayer.getLang("audio_search_with_text"),
            sort: AudioPlayer.getLang("audio_search_by_length")
        },
        s = this._els.searchInput;
    each(["performer", "lyrics", "sort"], function(t, i) {
        uiSearch.toggleFilter(s, i, o[i], !!e[i])
    })
}, AudioPage.onFilterRemoved = function(e, t, i) {
    function a() {
        switch (e) {
            case "performer":
                var t = "audio_search_type_" + intval(this.isLayer()),
                    a = window.radioBtns[t];
                radiobtn(a.els[0], 0, t);
                break;
            case "sort":
                var o = this._searchSortFilter.options.defaultItems[0][0];
                this._searchSortFilter.selectItem(o, !1);
                break;
            case "lyrics":
                removeClass(geByClass1("_audio_fltr_with_lyrics", this._els.pageContainer), "on")
        }
        i || this.onSearchFiltersChanged()
    }
    var o = currentAudioPage(t);
    a.apply(o)
}, AudioPage.prototype._showSearchSection = function(e) {
    this._toggleSearchProgress(!0);
    var t = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, this.getOwnerId(), AudioPlaylist.DEFAULT_PLAYLIST_ID);
    t.loadAll(function() {
        this._toggleSearchProgress(!1), this._doShowSearchSection(e)
    }.bind(this))
}, AudioPage.prototype._toggleSearchProgress = function(e) {
    e ? uiSearch.showProgress(this._els.searchInput) : uiSearch.hideProgress(this._els.searchInput)
}, AudioPage.prototype._doShowSearchSection = function(e) {
    function t() {
        o.search(e, function(t) {
            var o = "";
            this._searchAudiosAutoList && (this._els.searchSectionAudios.innerHTML = "", this._searchAudiosAutoList.destroy());
            var s = this._data.playlistsIndex ? this._data.playlistsIndex.search(e.q) : [];
            if (this.showSection("search"), s.length) {
                var r = "";
                each(s, function(e, t) {
                    r += getTemplate("audio_pl_item", t)
                }), show(this._els.searchSectionPlaylistsHeader), show(this._els.searchSectionPlaylists), o = this._ownerId == vk.id ? i.langs.audio_found_your_local_playlists : this._ownerId > 0 ? i.langs.audio_found_user_local_playlists : i.langs.audio_found_group_local_playlists, this._els.searchSectionPlaylistsHeader.innerHTML = langNumeric(s.length, o), this._els.searchSectionPlaylists.innerHTML = r
            } else hide(this._els.searchSectionPlaylistsHeader), hide(this._els.searchSectionPlaylists);
            var l = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_SEARCH, vk.id, hashCode(a));
            l.mergeWith({
                list: t,
                searchParams: {
                    globalQuery: e.globalQuery || e.q,
                    performer: e.performer,
                    lyrics: e.lyrics,
                    sort: e.sort
                }
            }), l.setLocalFoundCount(t.length), t.length || s.length ? hide(this._els.searchNoLocalResults) : (show(this._els.searchNoLocalResults), o = vk.id == this._ownerId ? i.langs.audio_no_local_results : this._ownerId > 0 ? i.langs.audio_no_user_local_results : i.langs.audio_no_group_local_results, this._els.searchNoLocalResults.innerHTML = o.replace("{query}", "<strong>" + clean(e.q) + "</strong>")), t.length || (hide(this._els.searchSectionAudiosHeader), hide(this._els.searchSectionAudios)), this._searchAudiosAutoList = new AutoList(this._els.searchSectionAudios, {
                onNeedRows: function(e, a, s, r, n) {
                    this._toggleSearchProgress(!0), l.load(a, function() {
                        if (this._toggleSearchProgress(!1), !n.isDone()) {
                            if (0 == a && (t.length ? (show(this._els.searchSectionAudiosHeader), show(this._els.searchSectionAudios), o = this._ownerId == vk.id ? i.langs.audio_found_your_local : this._ownerId > 0 ? i.langs.audio_found_user_local : i.langs.audio_found_group_local, this._els.searchSectionAudiosHeader.innerHTML = langNumeric(t.length, o)) : (hide(this._els.searchSectionAudiosHeader), hide(this._els.searchSectionAudios)), hide(this._els.searchGlobalCommunitiesPlace)), a == t.length) {
                                var s = l.getCommunititesBlock();
                                toggle(this._els.searchGlobalCommunitiesPlace, !!s), this._els.searchGlobalCommunitiesPlace.innerHTML = s || "", this._els.searchGlobalAudiosList.innerHTML = "", l.getAudiosCount() > t.length ? (show(this._els.searchGlobalAudiosBlock), n.setListEl(this._els.searchGlobalAudiosList), this._els.searchGlobalAudiosBlockHeader.innerHTML = langNumeric(l.getTotalCount(), i.langs.audio_global_search_found, !0)) : hide(this._els.searchGlobalAudiosBlock)
                            }
                            for (var r = [], d = l.getAudiosList(), u = a, _ = a < t.length ? Math.min(t.length, a + 30) : a + 30, c = u; _ > c && d[c]; c++) r.push(AudioUtils.drawAudio(d[c]));
                            e(r)
                        }
                    }.bind(this))
                }.bind(this)
            }), this._onSectionOut(function() {
                this._els.searchSectionAudios.innerHTML = "", this._searchAudiosAutoList && (this._searchAudiosAutoList.destroy(), this._searchAudiosAutoList = !1)
            }.bind(this)), this._pagePlaylist = l, this._toggleSearchProgress(!1)
        }.bind(this))
    }
    var i = getAudioPlayer();
    if (e && (this._prevSearchParams = e), e = e || this._prevSearchParams) {
        var a = replaceEntities(e.q) + replaceEntities(e.globalQuery || "");
        each(["performer", "lyrics", "sort"], function(t, i) {
            a += e[i] || 0
        }), a += this._ownerId, this._toggleSearchProgress(!0);
        var o = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, this._ownerId, AudioPlaylist.DEFAULT_PLAYLIST_ID);
        o.loadAll(function() {
            clearTimeout(this._onSilendLoadedTO), this._onSilendLoadedTO = setTimeout(function() {
                t.call(this)
            }.bind(this))
        }.bind(this))
    }
}, AudioPage.prototype.showFriendMusic = function(e, t) {
    return this.isLayer() ? (nav.go({
        0: "/audios" + t
    }, !1, {
        friendId: t
    }), cancelEvent(e)) : void 0
}, AudioPage.prototype._deinitNavigation = function() {
    cur.nav.pop(), this._navigationInited = !1
}, AudioPage.PageSections = ["recoms_personal", "recoms_audio", "recoms_block"], AudioPage.prototype.initNavigation = function() {
    this._navigationInited || (this._navigationInited = !0, this._prevLoc = {}, cur.nav.push(function(e, t, i, a) {
        var o = this._ignoreResetedSearch;
        if (delete this._ignoreResetedSearch, o && a.fromSearch) return !1;
        if (this.isLayer() && this._prevLoc !== !1) {
            t = clone(this._prevLoc), e = clone(i);
            for (var s in t) t.hasOwnProperty(s) && (t[s] && void 0 === i[s] ? e[s] = !1 : t[s] == i[s] && delete e[s])
        }
        this._deleteDeletedAudios();
        var r = i.section || "all",
            l = !1;
        return a.tab ? l = !1 : a.fromSearch ? l = !1 : e.q === !1 && 1 == Object.keys(e).length ? l = !1 : a.searchPerformer ? l = !1 : a.friendId && this.isLayer() ? (r = "friend", this.resetSection(r), this._sectionData = {
            friend_id: a.friendId
        }, l = !1) : a.navigateToUploader || 1 == Object.keys(e).length && !isUndefined(e[0]) ? l = !0 : isUndefined(e[0]) || "all" != e.section && "recoms" != e.section && e.section !== !1 ? (inArray(e.section, AudioPage.PageSections) || inArray(t.section, AudioPage.PageSections) && !inArray(e.section, AudioPage.PageSections)) && (this.isLayer() ? (l = !1, this._sectionData = {
            audio_id: e.audio_id
        }, r = "recoms", delete this._currentSection) : l = !0) : l = !0, l ? !0 : ("recoms" == r && this.isLayer() && this.resetSection("recoms"), i.q ? (a.fromSearch || (this._els.searchInput.value = i.q), this._showSearchSection(extend({}, i, a))) : (this._ignoreResetedSearch = !0, uiSearch.reset(this._els.searchInput, !0), this.showSection(r), this._switchTab(r)), this.isLayer() ? this._prevLoc = i : nav.setLoc(i), (a.back || a.hist || a.nav) && this.syncParametersUI(i), !1)
    }.bind(this)))
}, AudioPage.prototype._deleteDeletedAudios = function() {
    each(cur._audioAddRestoreInfo || {}, function(e, t) {
        ("deleted" == t.state || "recom_hidden" == t.state) && getAudioPlayer().deleteAudioFromAllPlaylists(e)
    })
}, AudioPage.prototype._switchTab = function(e) {
    var t = geByClass1("_audio_section_tab__" + e, this._els.pageContainer);
    t ? uiTabs.switchTab(domFC(t)) : removeClass(geByClass1("ui_tab_sel", this._els.pageContainer), "ui_tab_sel")
}, AudioPage.prototype.onLayerHide = function() {
    this._deinitNavigation(), this._onSectionOut(), delete this._currentSection, this._muteSearch = !0, uiSearch.reset(this._els.searchInput, !0)
}, AudioPage.prototype.updateLayerHeight = function() {
    var e = 700;
    e = Math.min(e, window.innerHeight - 150), e = Math.max(e, 400), isVisible(this._els.footer) && (e -= getSize(this._els.footer)[1]), setStyle(this._els.scrollWrap, {
        height: e
    })
}, AudioPage.prototype.onLayerShow = function(e) {
    var t = getAudioPlayer().getCurrentPlaylist();
    t ? this.showSection("current") : e ? this.showSection(e) : this.showSection("all"), toggleClass(geByClass1("_audio_section_tab__current", this._els.pageContainer), "unshown", !t), this.initNavigation(), this.updateCurrentPlayingInfo(), this.updateLayerHeight();
    var i = this.getPageCurrentPlaylist(),
        a = getAudioPlayer().getCurrentAudio();
    if (this._audioRowsAutoList && i && a && i.indexOfAudio(a) >= 0)
        for (var o = 10; o--;) {
            var s = geByClass1("audio_row_current", this._audioRowsAutoList.getListEl());
            if (s) {
                var r = getXY(s)[1];
                this._scroll.scroller.scrollTop = r - scrollGetY() - 300;
                break
            }
            this._audioRowsAutoList.drawMore(), getAudioPlayer().updateCurrentPlaying()
        }
}, AudioPage.prototype.resetSection = function(e) {
    var t = geByClass1("_audio_section__" + e, this._els.sections);
    re(t)
}, AudioPage.prototype.showSection = function(e, t, i) {
    if ("search" != this._currentSection || "all" != e && "current" != e || uiSearch.reset(this._els.searchInput, !0), this._switchTab(e), this._currentSection == e) return void(isFunction(t) && t());
    this._currentSection = e;
    var a = geByClass1("_audio_section__" + e, this._els.sections);
    if (a) {
        each(geByClass("_audio_section", this._els.pageContainer), function() {
            hide(this)
        }), hide(this._els.searchGlobalCommunitiesPlace), hide(this._els.searchGlobalAudiosBlock), toggle(this._els.recomsBlocks, "recoms" == e && !this.isLayer()), show(a), this._onSectionOut();
        var o = this._data.sectionData[e];
        switch (e) {
            case "current":
                this._initSection_all(a, o, !0);
                break;
            case "friend":
                this._initSection_all(a, o);
                break;
            case "playlists":
                this._initSection_playlists(a, o);
                break;
            case "updates":
                this._initSection_updates(a, o);
                break;
            case "recoms":
                this.isLayer() || vk.id != this.getOwnerId() ? this._initSection_all(a, o) : this._initSection_recoms(a, o);
                break;
            case "all":
            case "recoms_audio":
            case "recoms_block":
                o.isRecomsPlaylists || this._initSection_all(a, o)
        }
        return getAudioPlayer().updateCurrentPlaying(), void(isFunction(t) && t())
    }
    ajax.post("al_audio.php", extend({
        act: "section",
        section: e,
        owner_id: this._ownerId,
        is_layer: this.isLayer() ? 1 : 0
    }, this._sectionData || {}), {
        onDone: function(a, o, s) {
            this._data.sectionData = this._data.sectionData || {}, this._data.sectionData[e] = o;
            var r = se('<div class="audio_section _audio_section _audio_section__' + e + " audio_section__" + e + ' clear_fix">' + a + "</div>");
            this._els.sections.appendChild(r), s && (this._els.recomsBlocks.innerHTML = s), delete this._currentSection, this.showSection(e, t, i)
        }.bind(this)
    }), delete this._sectionData
}, AudioPage.prototype._onSectionOut = function(e) {
    e ? (this._onSectionOutCbs = this._onSectionOutCbs ? this._onSectionOutCbs : [], this._onSectionOutCbs.push(e)) : (each(this._onSectionOutCbs || [], function(e, t) {
        t()
    }), this._onSectionOutCbs = [])
}, AudioPage.prototype._initSection_recoms = function(e, t) {
    function i(e) {
        each(e.playlists || [], function(e, t) {
            if (t) {
                var i = getAudioPlayer().getPlaylist(t.type, t.ownerId, t.id);
                0 == i.getAudiosList() && i.mergeWith(t)
            }
        })
    }
    if (i(t), vk.id == this.getOwnerId()) {
        var a = 0,
            o = new AutoList(this._els.recomsBlocks, {
                onNeedRows: function(e) {
                    a += 4, ajax.post("al_audio.php", {
                        act: "recoms_blocks",
                        offset: a
                    }, {
                        onDone: function(t, a) {
                            t = t.filter(function(e) {
                                return !!trim(e)
                            }), i(a), e(t)
                        }
                    })
                }
            });
        this._onSectionOut(function() {
            o.destroy()
        })
    }
}, AudioPage.prototype._initSection_playlists = function(e, t) {
    var i = geByClass1("_audio_page_block__playlists_items", e);
    i.innerHTML = "";
    var a, o = new AutoList(i, {
        uiScroll: this.isLayer(),
        onNeedRows: function(e, t) {
            for (var i = [], a = this._data.playlists, o = t; t + 20 > o && a[o]; o++) i.push(getTemplate("audio_pl_item", a[o]));
            e(i)
        }.bind(this)
    });
    this._data.canEdit && (a = new GridSorter(i, "audio_pl_item", {
        onReorder: function(e, t, i) {
            var a = domData(e, "raw-id"),
                o = domData(i, "raw-id");
            ajax.post("al_audio.php", {
                act: "reorder_playlist",
                owner_id: this.getOwnerId(),
                playlist_id: a.split("_")[1],
                prev_playlist_id: o ? o.split("_")[1] : 0,
                hash: this._data.reorderHash
            })
        }.bind(this)
    }), this._onSectionOut(function() {
        o.destroy(), a && a.destroy()
    }))
}, AudioPage.prototype._initSection_updates = function(e, t) {
    if (uiSearch.init(geByClass1("_audio_friends_search", e)), t.feedPlaylist) {
        var i = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_FEED, vk.id, 0);
        i.getFeedOffset() || i.mergeWith(t.feedPlaylist);
        var a = e;
        a.innerHTML = "", this._pagePlaylist = i, data(gpeByClass("_audio_playlist", a), "playlist", i);
        var o = new AutoList(a, {
            onNeedRows: function(e, t) {
                i.load(t, function() {
                    e(i.getItemsList().slice(t))
                })
            }
        });
        this._onSectionOut(function() {
            o.destroy()
        })
    }
}, AudioPage.prototype._initSection_all = function(e, t, i) {
    extend(this._els, {
        audioRows: geByClass1("_audio_page_playlist", e),
        audioRowsMore: geByClass1("_audio_more_rows", e),
        friendsBlock: geByClass1("_audio_friends_list_wrap", e),
        friendsBlockContent: geByClass1("_audio_friends_list_content", e)
    });
    var a;
    if (i) a = getAudioPlayer().getCurrentPlaylist();
    else {
        var o = t.playlistData;
        a = getAudioPlayer().getPlaylist(o.type, o.ownerId, o.id), a.getAudiosCount() || (a.mergeWith(o), a.load())
    }
    this._pagePlaylist = a, data(this._els.audioRows, "playlist", a), uiSearch.init(geByClass1("_audio_friends_search", e)), this._initAudioRowsAutoList(), this._enableAudioRowsSorter(), this._initFixedFriendsBlock(e)
}, AudioPage.prototype._initFixedFriendsBlock = function(e) {
    if (this._els.friendsBlock) {
        var t, i, a, o = !1,
            s = getXY(this._els.friendsBlock),
            r = s[1] - getSize("page_header")[1] - getSize(this._els.playerWrap)[1] - (this.isLayer() ? 13 : 15),
            l = this.isLayer() ? this._scroll.scroller : window;
        addEvent(window, "resize", i = function() {
            s = getXY(this._els.friendsBlock)
        }.bind(this)), addEvent(l, "scroll", t = function() {
            var e;
            e = this.isLayer() ? this._scroll.scroller.scrollTop + scrollGetY() : scrollGetY();
            var t = e > r;
            t && !o && (s = getXY(this._els.friendsBlock), addClass(this._els.friendsBlockContent, "audio_friends_fixed"), o = !0, this.isLayer() && (a = addEvent(this._els.friendsBlockContent, "mousewheel", function(e) {
                return this._scroll.scroller.scrollTop = this._scroll.scroller.scrollTop + e.deltaY, cancelEvent(e)
            }.bind(this)))), !t && o && (removeClass(this._els.friendsBlockContent, "audio_friends_fixed"), o = !1, a && removeEvent(this._els.friendsBlockContent, "mousewheel", a))
        }.bind(this)), this._onSectionOut(function() {
            t && removeEvent(window, "scroll", t), i && removeEvent(window, "resize", i), a && removeEvent(this._els.friendsBlockContent, "mousewheel", a), removeClass(this._els.friendsBlockContent, "audio_friends_fixed")
        }.bind(this))
    }
}, AudioPage.prototype.playPlaylist = function(e, t, i) {
    var a = getAudioPlayer(),
        o = a.getCurrentPlaylist(),
        s = a.getPlaylist(e, t, i);
    o && o.equals(s) && a.isPlaying() ? a.pause() : s.load(0, function() {
        a.play(s.getAudiosList()[0], s)
    })
}, AudioPage.prototype._enableAudioRowsSorter = function() {
    this._data.audiosReorderHash && (this._audioRowsSorter && this._audioRowsSorter.destroy(), this._audioRowsSorter = new GridSorter(this._els.audioRows, "", {
        onReorder: function(e, t, i) {
            var a = domData(e, "full-id"),
                o = domData(i, "full-id");
            ajax.post("al_audio.php", {
                act: "reorder_audios",
                hash: this._data.audiosReorderHash,
                owner_id: this.getOwnerId(),
                audio_id: a ? a.split("_")[1] : 0,
                next_audio_id: o ? o.split("_")[1] : 0
            })
        }.bind(this)
    }), this._onSectionOut(function() {
        this._audioRowsSorter && this._audioRowsSorter.destroy()
    }.bind(this)))
}, AudioPage.prototype._disableAudioRowsSorter = function() {
    this._audioRowsSorter && this._audioRowsSorter.disable()
}, AudioPage.prototype._initAudioRowsAutoList = function() {
    var e = this._pagePlaylist;
    this._els.audioRows.innerHTML = "", this._audioRowsAutoList && this._audioRowsAutoList.destroy(), this._audioRowsAutoList = new AutoList(this._els.audioRows, {
        scrollNode: this._scroll ? this._scroll.scroller : !1,
        onRendered: function() {
            getAudioPlayer().updateCurrentPlaying()
        },
        onNoMore: function() {
            hide(this._els.audioRowsMore)
        }.bind(this),
        onNeedRows: function(t, i) {
            var a = [];
            e.load(i, function() {
                for (var o = e.getAudiosList(), s = i; i + 30 > s && o[s]; s++) a.push(AudioUtils.drawAudio(o[s]));
                t(a), 0 == i && this._audioRowsSorter && this._audioRowsSorter.update()
            }.bind(this))
        }.bind(this)
    }), this._onSectionOut(function() {
        this._audioRowsAutoList.destroy(), this._els.audioRows.innerHTML = ""
    }.bind(this))
}, AudioPage.showAttachBox = function(e, t) {
    vk.widget ? showBox("al_audio.php", {
        act: "choose_box",
        owner_id: e,
        playlistAlreadyAttached: t.playlistAlreadyAttached,
        groupAudioEnabled: t.groupAudioEnabled
    }) : AudioPage.editPlaylist(e, AudioPlaylist.DEFAULT_PLAYLIST_ID, "attach", t)
}, AudioPage.editPlaylist = function(e, t, i, a) {
    a && a.audioAttachSwitchOwnerId && (cur.audioAttachSwitchOwnerId = a.audioAttachSwitchOwnerId), i = i || "edit";
    var o, s;
    if (t) o = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, e, t);
    else if (cur.audioPage) {
        var r = cur.audioPage._data.maxPlaylistsCount;
        if (isArray(cur.audioPage._data.playlists) && cur.audioPage._data.playlists.length >= r) {
            var l = langNumeric(r, cur.lang.audio_playlists_limit_error).replace("{limit}", r),
                n = new MessageBox({
                    title: getLang("global_error")
                });
            return void n.content(l).setButtons("Ok", function() {
                curBox().hide()
            }).show()
        }
    }
    show(boxLoader), show(boxLayerWrap), boxRefreshCoords(boxLoader), parallel(function(e) {
        stManager.add(["audio.css", "indexer.js", "auto_list.js", "grid_sorter.js", "edit" == i ? "upload.js" : !1], e)
    }, function(e) {
        o ? o.load(e) : e()
    }, function(t) {
        cur.audioPage && cur.audioPage.getOwnerId() == e ? (s = cur.audioPage.getOwnerPlaylists(), t()) : AudioPage.loadPlaylists(e, void 0, !1, "attach" == i, function(e) {
            s = e, t()
        })
    }, function() {
        AudioPage._openEditPlaylist(i, e, t, s, a)
    })
}, AudioPage._openEditPlaylist = function(e, t, i, a, o) {
    function s(e) {
        if (e = trim(e)) {
            var t = " " + (parseLatin(e) || "") + (parseCyr(e) || "");
            t = trim(t.replace(/\)/g, "").replace(/&/, "&amp;")), U = new RegExp("(\\s|^)(" + t.replace(vkIndexer.delimiter, "|").replace(/(^\||\|$|\?)/g, "") + ")", "gi")
        } else U = !1;
        g(D, !0, e)
    }

    function r() {
        z.clean(), k.deletePlaylist(z), T && showAudioPlaylist(T[0], T[1])
    }

    function l() {
        return trim(W.searchInput.value)
    }

    function n(t) {
        var i = z.indexOfAudio(t) >= 0 ? "ape_selected" : "";
        U && (t = clone(t), t[AudioUtils.AUDIO_ITEM_INDEX_TITLE] = t[AudioUtils.AUDIO_ITEM_INDEX_TITLE].replace(U, "$1<em>$2</em>"), t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] = t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER].replace(U, "$1<em>$2</em>"));
        var a = "";
        if ("edit" == e) a = '<div class="ape_check"><div class="ape_check_icon"></div></div>';
        else {
            var s = AudioUtils.asObject(t);
            if (o && o.wiki_editor) {
                var r = "editorChooseAudio('" + s.performer + "', '" + s.title + "', " + s.duration + ", '" + s.fullId + "', '" + s.url + "', " + s.duration + ", this)";
                a = '<div class="ape_attach" onclick="' + r + '">' + getLang("global_add_media") + "</div>"
            } else {
                var l = clean(JSON.stringify({
                    id: s.id,
                    owner_id: s.ownerId,
                    info: t,
                    labels: {
                        add: getLang("global_add_media"),
                        cancel: getLang("global_cancel")
                    }
                }));
                a = '<div class="ape_attach" onclick="AudioUtils.chooseAudioBox(this, ' + l + ', event)">' + getLang("global_add_media") + "</div>"
            }
        }
        return '<div class="ape_audio_item_wrap _ape_audio_item ' + i + '">' + a + AudioUtils.drawAudio(t, "no_actions inlined") + "</div>"
    }

    function d() {
        clearTimeout(K), l() && (K = setTimeout(function() {
            K = !1;
            var e = l();
            if (e) {
                O = k.getPlaylist(AudioPlaylist.TYPE_SEARCH, vk.id, hashCode(e + "no conflict")), O.mergeWith({
                    searchParams: {
                        globalQuery: e
                    },
                    hasMore: !0
                }), M && M.destroy();
                var t = 0;
                x && (t = x.getOffset(), x.destroy()), x = new AutoList(W.list, {
                    scrollNode: W.list,
                    onNeedRows: function(e, i) {
                        i -= t, O.load(i, function() {
                            var t = [],
                                a = O.getAudiosList();
                            0 == i && a.length && t.push('<div class="ape_list_header">' + getLang("audio_edit_playlist_global_results") + "<div>");
                            for (var o = Math.min(a.length, i + 20), s = i; o > s; s++) t.push(n(a[s]));
                            e(t)
                        })
                    }
                }), x.drawMore()
            }
        }, 300), N = null)
    }

    function u() {
        q.setOptions({
            title: '<div class="back _back">' + getLang("global_back") + "</div>",
            bodyStyle: "padding: 0"
        })
    }

    function _() {
        var e = "";
        cur.audioAttachSwitchOwnerId && (e = '<span class="dvd"></span><a class="tab_link" onclick="cur.audioAttachSwitch()">', z.getOwnerId() == vk.id ? (e += getLang("audio_choose_wall_to_group_audios"), cur.audioAttachSwitch = function() {
            AudioPage.showAttachBox(cur.audioAttachSwitchOwnerId, o)
        }) : (e += getLang("audio_choose_wall_to_my_audios"), cur.audioAttachSwitch = function() {
            AudioPage.showAttachBox(vk.id, o)
        }), e += "</a>"), q.setOptions({
            title: G + e,
            bodyStyle: "padding: 0"
        })
    }

    function c() {
        switch (R) {
            case "initial":
                break;
            case "default":
                f("initial");
                break;
            case "playlists":
                f("default");
                break;
            case "playlist":
                f("playlists")
        }
    }

    function h() {
        setStyle(W.list, {
            height: getSize(W.boxContent)[1] - (getXY(W.list)[1] - getXY(W.boxContent)[1])
        })
    }

    function g(e, t, i) {
        D = e, t ? i ? e.search({
            q: i
        }, function(e) {
            p(!0, e, i)
        }) : p(!0, e.getAudiosList()) : i ? p(!1, Y.search(i), i) : p(!1, a), y("initial" != R || i ? !1 : !0)
    }

    function p(e, t) {
        W.list.innerHTML = "", x && x.destroy(), show(W.list), hide(W.emptyPlaceholder), h();
        var i = 0;
        x = new AutoList(W.list, {
            scrollNode: W.list,
            onNoMore: function() {
                0 == i && (l() || (hide(W.list), show(W.emptyPlaceholder))), e && d()
            },
            onNeedRows: function(a, o) {
                for (var s = [], r = Math.min(t.length, o + 20), l = o; r > l; l++) {
                    var d, u = t[l];
                    if (e) d = n(u);
                    else {
                        var _ = U ? u.title.replace(U, "$1<em>$2</em>") : u.title,
                            c = langNumeric(u.size, cur.lang.audio_playlist_audios_count, !0).replace("{count}", u.size),
                            h = '<div class="ape_pl_item_inner"><span class="ape_pl_title">' + _ + '</span> <span class="ape_pl_size">' + c + "</span></div>";
                        d = '<div class="ape_pl_item" data-playlist-access-hash="' + u.access_hash + '"  data-playlist-owner-id="' + u.owner_id + '" data-playlist-id="' + u.id + '">' + h + "</div>"
                    }
                    s.push(d)
                }
                i += s.length, a(s)
            }
        })
    }

    function y(e) {
        B || (B = new GridSorter(W.list, "ape_audio_item_wrap", {
            wrapNode: W.list,
            onReorder: function(e, t) {
                var i, a = domData(geByClass1("_audio_row", e), "full-id"),
                    o = z.indexOfAudio(a);
                t ? (a = domData(geByClass1("_audio_row", t), "full-id"), i = z.indexOfAudio(a)) : i = z.getAudiosCount(), z.moveAudio(o, i)
            }
        })), e ? B.enable() : B.disable()
    }

    function f(i, o) {
        switch (R = i, A(), domData(W.list, "view", i), i) {
            case "initial":
                show(W.header), hide(W.addAudiosFromPlaylistsButton), show(W.addAudiosButton), show(W.search), hide(W.globalResults), g(z, !0), v(o), _();
                break;
            case "default":
                var s = k.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, t, AudioPlaylist.DEFAULT_PLAYLIST_ID);
                disableEl(W.addAudiosButton), showProgress(W.addAudiosButton), s.load(function() {
                    enableEl(W.addAudiosButton), hideProgress(W.addAudiosButton), hide(W.header), show(W.search), toggle(W.addAudiosFromPlaylistsButton, F), hide(W.addAudiosButton), "edit" == e ? u() : _(), g(s, !0), h(), "edit" == e && v(o)
                });
                break;
            case "playlists":
                hide(W.header), show(W.search), hide(W.addAudiosFromPlaylistsButton), hide(W.addAudiosButton), hide(W.globalResults), u(), g(a);
                break;
            case "playlist":
                hide(W.header), show(W.search), hide(W.addAudiosFromPlaylistsButton), hide(W.addAudiosButton), u(), g(o, !0), "attach" == e && P(o), "edit" == e && v(o)
        }
        h(), W.searchInput.value = "", U = !1, N = null, clearTimeout(K), k.updateCurrentPlaying()
    }

    function A() {
        q.removeButtons()
    }

    function P(e) {
        function t() {
            var t = e.getOwnerId() + "_" + e.getAlbumId(),
                i = e.getAccessHash();
            cur.chooseMedia("audio_playlist", t + (i ? ":" + i : ""), {
                id: t,
                coverUrl: e.getCoverUrl(),
                gridCovers: e.getGridCovers(),
                title: e.getTitle(),
                authorName: e.getAuthorName(),
                authorHref: e.getAuthorHref()
            })
        }
        o.playlistAlreadyAttached || cur.editor || q.addButton(getLang("audio_attach_playlist_button"), t, "ok", !0)
    }

    function v() {
        q.addButton(getLang("audio_save_playlist_button"), w, "ok", !0)
    }

    function m(e) {
        function t(e, t) {
            var i = toggleClass(e, "ape_selected", t),
                a = geByClass1("_audio_row", e),
                o = AudioUtils.getAudioFromEl(a);
            i ? z.addAudio(o) : z.removeAudio(o)
        }
        var i;
        if (i = domClosest("ape_pl_item", e.target)) {
            var a = domData(i, "playlist-id"),
                o = domData(i, "playlist-owner-id"),
                s = domData(i, "playlist-access-hash"),
                r = k.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, o, a, s);
            showProgress(i), r.load(function() {
                hideProgress(i), f("playlist", r)
            })
        }
        if (hasClass(e.target, "ape_check")) {
            var l = domClosest("_ape_audio_item", e.target);
            if (e.shiftKey && N) {
                var n = domChildIndex(N),
                    d = domChildIndex(l),
                    u = domPN(l);
                if (n > d) {
                    var _ = d;
                    d = n, n = _
                }
                for (var c = hasClass(N, "ape_selected"), h = n; d >= h; h++) t(u.children[h], c)
            } else t(l), N = l;
            C()
        }
        return cancelEvent(e)
    }

    function C() {
        var e, t = z.getAudiosCount(),
            i = z.getTotalDuration();
        if (t) {
            e = langNumeric(t, cur.lang.audio_edit_playlist_audios_info), e = e.replace("{count}", t);
            var a = "",
                o = i % 60,
                s = Math.floor(i / 60) % 60,
                r = Math.floor(i / 3600);
            60 > i ? a = langNumeric(i, cur.lang.audio_total_dur_seconds) : 3600 > i ? (a = langNumeric(s, cur.lang.audio_total_dur_minutes), o && (a += " " + langNumeric(o, cur.lang.audio_total_dur_seconds))) : (a = langNumeric(r, cur.lang.audio_total_dur_hours), s && (a += " " + langNumeric(s, cur.lang.audio_total_dur_minutes))), e += '<span class="dvd">' + a + "</span>"
        } else e = getLang("audio_edit_playlist_no_audios");
        W.stat.innerHTML = e
    }

    function w(e) {
        var i = trim(val(W.playlistNameInput)),
            a = trim(val(W.playlistDescriptionInput));
        if (!i) return f("initial"), void notaBene(ge("ape_pl_name"));
        var o = [];
        each(z.getAudiosList(), function(e, t) {
            o.push(t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[AudioUtils.AUDIO_ITEM_INDEX_ID])
        });
        var s = cur.audioPage ? cur.audioPage._data.createPlaylistHash : "";
        ajax.post("al_audio.php", {
            act: "save_playlist",
            hash: I ? s : j.getEditHash(),
            owner_id: t,
            playlist_id: I ? 0 : j.getPlaylistId(),
            title: i,
            description: a,
            audios: o.join(","),
            cover: isObject(H) ? JSON.stringify(H) : H
        }, {
            showProgress: lockButton.bind(this, e),
            onDone: function(e, t) {
                if (each(geByClass("_audio_pl_" + e.ownerId + "_" + e.id), function() {
                        var t = geByClass1("audio_pl__cover", this);
                        if (t) {
                            setStyle(t, "background-image", e.coverUrl ? "url(" + e.coverUrl + ")" : null), setStyle(t, "background-size", e.coverUrl ? "cover" : null);
                            var i = geByClass1("_audio_pl_grid_covers_wrap", this);
                            i && (i.innerHTML = e.coverUrl ? "" : e.gridCovers);
                        }
                        var a = geByClass1("audio_pl__title", this);
                        a && val(a, e.title);
                        var o = geByClass1("_audio_pl__stats_count", this);
                        o && (o.innerHTML = e.totalCount)
                    }), I && cur.audioPage && each(geByClass("_audio_page_block__playlists_items", cur.audioPage._els.pageContainer), function() {
                        var e = se(getTemplate("audio_pl_item", t)),
                            i = this;
                        i.insertBefore(e, i.firstChild);
                        var a = intval(domData(i, "max-items"));
                        a && i.children.length > a && i.removeChild(i.lastChild), show(gpeByClass("_audio_page__playlists", i))
                    }), I && (cur.audioPage._data.playlists = cur.audioPage._data.playlists || [], cur.audioPage._data.playlists.unshift(t)), cur.audioPage) {
                    var i = geByClass1("_audio_page__playlists_count_header", cur.audioPage._els.pageContainer);
                    i && (i.innerHTML = langNumeric(cur.audioPage._data.playlists.length, cur.lang.audio_playlists_count_title), removeClass(gpeByClass("_audio_page_section_layout", i), "audio_section_empty"))
                }
                j && (j.clean(), j.mergeWith(e)), q.hide()
            }
        })
    }

    function b(e) {
        show(W.coverThumb), setStyle(W.coverThumb, "background-image", "url(" + e + ")"), addClass(W.uploadCoverButton, "ape_thumb_set")
    }

    function L() {
        if (cur.audioCoverUploadOptions && cur.audioCoverUploadOptions[t]) {
            var e = cur.audioCoverUploadOptions[t],
                i = {
                    file_name: "photo",
                    file_size_limit: 5242880,
                    file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
                    file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP",
                    onUploadStart: function(e, t) {
                        show(geByClass1("_ape_cover_progress"))
                    },
                    onUploadComplete: function(e, t) {
                        t = JSON.parse(t), t.error ? (show(W.errorMsg), h()) : (hide(W.errorMsg), H = t, b(H.url), h()), hide(geByClass1("_ape_cover_progress"))
                    },
                    onUploadProgress: function(e, t, i) {},
                    onUploadError: function(e, t) {
                        hide(geByClass1("_ape_cover_progress"))
                    },
                    clear: 1,
                    type: "photo",
                    max_attempts: 3,
                    server: e.server,
                    noCheck: !0,
                    chooseBox: !0,
                    uploadButton: !0,
                    accept: ".jpg,.jpeg,.png",
                    filesize_hide_last: !0,
                    label: e.button
                };
            Upload.init(W.uploadCoverButton, e.url, e.vars, i), addEvent(geByClass1("_ape_cover_delete"), "click", S), addEvent(W.uploadCoverButton, "click", function() {
                (!isObject(H) || isVisible(geByClass1("_ape_cover_progress"))) && geByTag1("input", this).click()
            }), W.coverThumb = geByClass1("_ape_cover_thumb")
        }
    }

    function S(e) {
        return removeClass(W.uploadCoverButton, "ape_thumb_set"), hide(geByClass1("_ape_cover_thumb")), H = -1, cancelEvent(e)
    }

    function E() {
        var t = window.innerHeight,
            i = 800,
            a = 500,
            o = 200;
        setStyle(W.boxContent, "height", Math.min(i, Math.max(t - o, a))), addEvent(W.addAudiosFromPlaylistsButton, "click", f.bind(this, "playlists")), addEvent(W.addAudiosButton, "click", f.bind(this, "default")), addEvent(W.list, "click", m), addEvent(q.titleWrap, "click", function(e) {
            hasClass(e.target, "_back") && c()
        }), uiSearch.init("ape_edit_playlist_search", {
            onChange: s
        }), "edit" == e && (f("initial"), C(), L(), z.getCoverUrl() && b(z.getCoverUrl()), W.playlistNameInput.value = replaceEntities(z.getTitle()), W.playlistDescriptionInput.value = replaceEntities(z.getDescription())), "attach" == e && f("default"), _(), j && q.setControlsText('<a onclick="AudioPage.deletePlaylist(' + j.getOwnerId() + ", " + j.getPlaylistId() + ", '" + j.getEditHash() + "')\">" + getLang("audio_delete_playlist") + "</a>")
    }
    hide(boxLoader), hide(boxLayerWrap);
    var T;
    cur.apLayer && (T = cur.apLayerPlaylistId, layers.fullhide());
    var B, I = !i || i == AudioPlaylist.DEFAULT_PLAYLIST_ID,
        k = getAudioPlayer(),
        x = !1,
        M = !1,
        R = !1,
        D = !1,
        O = !1,
        U = !1,
        H = 0,
        N = null;
    a = a.filter(function(e) {
        return e.id !== AudioPlaylist.DEFAULT_PLAYLIST_ID && e.size > 0
    });
    var Y = new vkIndexer(a, function(e) {
            return e.title
        }),
        F = a.length > 0,
        j = !1,
        z = k.getPlaylist(AudioPlaylist.TYPE_TEMP, t, irand(0, 999999));
    I && "attach" != e || (j = k.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, t, i), z.addAudio(j.getAudiosList()), z.mergeWith({
        title: j.getTitle(),
        description: j.getDescription(),
        coverUrl: j.getCoverUrl(),
        editHash: j.getEditHash()
    }));
    var G;
    if (G = "attach" == e ? getLang("audio_choose_audio_title") : i ? getLang("audio_edit_playlist_title") : getLang("audio_new_playlist_title"), window.box && vk.widget) {
        var q = window.box;
        q.setOptions({
            title: G,
            bodyStyle: "padding: 0",
            width: 560,
            onBeforeHide: r,
            hideButtons: !0
        })
    } else {
        curBox() && curBox().hide();
        var q = new MessageBox({
            title: G,
            bodyStyle: "padding: 0",
            width: 560,
            onBeforeHide: r
        })
    }
    q.content(getTemplate("audio_edit_playlist")), q.show();
    var W = {
        boxContent: geByClass1("_audio_pl_edit_box", q.bodyNode),
        playlistNameInput: ge("ape_pl_name"),
        playlistDescriptionInput: ge("ape_pl_description"),
        stat: geByClass1("_ape_pl_stat"),
        uploadCoverButton: geByClass1("_ape_cover", q.bodyNode),
        uploadCoverInput: geByClass1("_ape_cover_upload", q.bodyNode),
        errorMsg: geByClass1("_ape_error_msg", q.bodyNode),
        header: geByClass1("_ape_header", q.bodyNode),
        search: geByClass1("_ape_search", q.bodyNode),
        searchInput: geByClass1("_field", q.bodyNode),
        addAudiosButton: ge("ape_add_audios_btn"),
        addAudiosFromPlaylistsButton: ge("ape_add_audios_from_playlists_btn"),
        listWrap: geByClass1("_ape_list_wrap", q.bodyNode),
        list: geByClass1("_ape_item_list", q.bodyNode),
        globalResults: geByClass1("_ape_item_global_results", q.bodyNode),
        globalResultsList: geByClass1("_ape_item_global_list", q.bodyNode),
        emptyPlaceholder: geByClass1("_ape_audios_empty_list", q.bodyNode)
    };
    E(q.bodyNode);
    var K = 0
}, AudioPage._buildAudiosAndPlaylistsList = function() {}, AudioPage.prototype.updateSearchUrl = function() {
    var e = this.getCurrentPlaylist();
    if (e.getType() == AudioPlaylist.TYPE_SEARCH && !this.isLayer()) {
        var t = e.getSearchParams();
        nav.setLoc(extend(nav.objLoc, {
            q: t.q
        }))
    }
}, AudioPage.prototype._deinitKeyEvents = function() {
    this._audioHQKeyEventHandler1 && removeEvent(window.document, "keydown", this._audioHQKeyEventHandler1), this._audioHQKeyEventHandler2 && removeEvent(window.document, "keyup", this._audioHQKeyEventHandler2), this._audioHQKeyEventHandler3 && removeEvent(window.document, "visibilitychange", this._audioHQKeyEventHandler3), this._audioHQKeyEventHandler4 && removeEvent(window.document, "mousedown", this._audioHQKeyEventHandler4), this._audioSeekKeyEventHandler && removeEvent(window.document, "keydown", this._audioSeekKeyEventHandler)
}, AudioPage.prototype._initKeyEvents = function() {
    function e() {
        return !t.isLayer() && AudioUtils.getLayer().isShown()
    }
    if (!this.isLayer()) {
        this._deinitKeyEvents();
        var t = this;
        getAudioPlayer();
        window.Notifier && Notifier.addRecvClbk("audio_hq_label", "audio", function() {
            AudioUtils.toggleAudioHQBodyClass()
        }), addEvent(window.document, "visibilitychange", this._audioHQKeyEventHandler3 = function() {
            delete cur.ctrlPressed
        }), addEvent(window.document, "mousedown", this._audioHQKeyEventHandler4 = function(e) {
            e.ctrlKey && (cur.ctrlMouseDown = !0, cur.ctrlPressed = !1)
        }, !0), addEvent(window.document, "keydown", this._audioHQKeyEventHandler1 = function(t) {
            e() || (cur.ctrlPressed = t.keyCode == KEY.CTRL)
        }), addEvent(window.document, "keyup", this._audioHQKeyEventHandler2 = function(t) {
            if (!e() && ((t.keyCode != KEY.CTRL || cur.ctrlMouseDown) && (delete cur.ctrlMouseDown, delete cur.ctrlPressed), cur.ctrlPressed)) {
                var i = getAudioPlayer(),
                    a = AudioUtils.hasAudioHQBodyClass();
                i.showHQLabel(!a), window.Notifier && Notifier.lcSend("audio_hq_label"), delete cur.ctrlPressed
            }
        }), addEvent(window.document, "keydown", this._audioSeekKeyEventHandler = function(t) {
            var i = getAudioPlayer();
            t.target && (inArray(t.target.tagName.toLowerCase(), ["input", "textarea"]) && "" != val(t.target) || hasClass(t.target, "fc_editable")) || i.isPlaying() && inArray(t.keyCode, [KEY.RIGHT, KEY.LEFT]) && !t.ctrlKey && (e() || i.seekCurrentAudio(t.keyCode == KEY.RIGHT))
        }), cur.destroy.push(function() {
            t._deinitKeyEvents()
        })
    }
}, AudioPage.prototype.editFeed = function() {
    var e = this;
    showTabbedBox("al_settings.php", {
        act: "a_edit_owners_list",
        list: "audio",
        height: lastWindowHeight
    }, {
        stat: ["privacy.js", "privacy.css", "ui_controls.js", "ui_controls.css", "indexer.js"],
        dark: 1
    }), cur.onOListSave = function(t, i, a, o) {
        var s = curBox(),
            r = {
                act: "a_ignore_olist",
                hash: o.hash
            };
        return t.length < i.length ? r.White = t.join(",") : r.Black = i.join(","), ajax.post("al_audio.php", r, {
            onDone: function(t, i) {
                s.hide();
                var a = e.getCurrentPlaylist();
                a.clean(), e.refreshCurrentPage()
            },
            showProgress: s.showProgress,
            hiderogress: s.hideProgress
        }), !1
    }
}, AudioPage.prototype.refreshCurrentPage = function() {
    this.switchToSection(this.getCurrentPlaylist())
}, AudioPage.prototype.updateStatusExportControls = function(e) {
    var t = getAudioPlayer(),
        i = t.getStatusExportInfo();
    each(geByClass("_audio_export_status", this._els.pageContainer), function() {
        toggleClass(this, "on", !!i[domData(this, "oid")])
    });
    var a = t.hasStatusExport(),
        o = geByClass1("_audio_page_player_status", this._els.pageContainer);
    if (toggleClass(o, "audio_page_player_btn_enabled", a), !e)
        if (this.isLayer()) cur.audioPage && cur.audioPage.updateStatusExportControls(!0);
        else {
            var s = AudioUtils.getLayer().getPageInstance();
            s && s.updateStatusExportControls(!0)
        }
    return !1
}, AudioPage.prototype.updateStatusExport = function(e, t) {
    e && checkbox(e), t = intval(t);
    var i, a, o = getAudioPlayer(),
        s = o.getStatusExportInfo() || {};
    if (t) s[t] ? (delete s[t], i = !1) : (s[t] = 1, i = !0);
    else if (o.hasStatusExport()) {
        for (var r in s) delete s[r];
        i = !1
    } else t = vk.id, s[t] = 1, i = !0;
    o.setStatusExportInfo(s), t != vk.id && t || checkbox("currinfo_audio", o.hasStatusExport()), this.updateStatusExportControls();
    var l = o.getCurrentAudio();
    l && (a = AudioUtils.asObject(l).fullId);
    var n = (o.getCurrentPlaylist(), null);
    ajax.post("al_audio.php", {
        act: "toggle_status",
        exp: intval(i),
        oid: t,
        hash: vk.statusExportHash,
        id: a,
        top: intval(n && (n.top_audio || n.top))
    })
}, AudioPage.prototype.playStatusAudio = function(e, t, i) {
    var a = gpeByClass("_audio_friend", i);
    getAudioPlayer().playLive(e, {
        showProgress: showProgress.pbind(a),
        hideProgress: hideProgress.pbind(a)
    }), cancelEvent(t)
}, AudioPage.prototype._initAlbumsSort = function() {
    if (this.options.albumsReorderHash && !this.isLayer()) {
        var e = geByClass1("_audio_albums_wrap", this._container);
        if (!e) {
            var t = geByClass("_audio_album_item", this._container);
            t.length && (e = se('<div class="_audio_albums_wrap audio_albums_wrap"></div>'), domInsertBefore(e, t[0]), each(t, function() {
                e.appendChild(this)
            }))
        }
        this._albumsSorter && this._albumsSorter.destroy();
        var i = this;
        this._albumsSorter = new GridSorter(e, !1, {
            limitBottomMove: !0,
            noPosTransform: !0,
            onReorder: function(e, t) {
                var a = e.id.split("_").pop(),
                    o = t ? t.id.split("_").pop() : 0;
                ajax.post("al_audio.php", {
                    act: "reorder_albums",
                    aid: a,
                    before: o,
                    hash: i.options.albumsReorderHash,
                    oid: i.options.oid
                }, {
                    onDone: function() {}
                })
            }
        })
    }
}, AudioPage.deleteAlbum = function(e, t) {
    var i = cur.audioPage.options.oid,
        a = showFastBox({
            title: AudioPlayer.getLang("audio_delete_album_title"),
            dark: 1
        }, AudioPlayer.getLang("audio_delete_album_are_you_sure"), AudioPlayer.getLang("audio_delete_album_button"), function(o) {
            ajax.post("al_audio.php", {
                act: "delete_album",
                album_id: e,
                hash: t,
                gid: 0 > i ? -i : !1
            }, {
                showProgress: lockButton.pbind(o),
                hideProgress: unlockButton.pbind(o),
                onDone: function(t, a) {
                    try {
                        boxQueue.hideAll(), re(geByClass1("_ui_item_audio_album_" + i + "_" + e)), nav.go("/audios" + i)
                    } catch (o) {}
                },
                onFail: function() {
                    a.hide(200)
                }
            })
        }, getLang("global_cancel"))
}, AudioPage.saveAlbum = function(e, t, i) {
    var a = val("album_name");
    if (!a) return notaBene("album_name"), !1;
    var o = curBox(),
        s = cur.audioPage.options.oid,
        r = !i,
        l = {
            act: "save_album",
            album_id: i,
            name: a,
            gid: 0 > s ? -s : 0,
            Audios: e.join(","),
            hash: cur.audioPage.options.saveAlbumHash
        };
    return ajax.post("al_audio.php", l, {
        showProgress: lockButton.pbind(t),
        hideProgress: unlockButton.pbind(t),
        onFail: o.hide,
        onDone: function(t, i, a, o) {
            var l = getAudioPlayer(),
                n = l.getPlaylist(AudioPlaylist.TYPE_ALBUM, s, t);
            n.clean(), n.mergeWith({
                list: o,
                hasMore: !1
            }), l.deletePlaylist(l.getPlaylist(AudioPlaylist.TYPE_RECOM, s, "album" + t)), each(e, function(e, t) {
                var i = {};
                i[AudioUtils.AUDIO_ITEM_INDEX_ALBUM_ID] = t, l.updateAudio(s + "_" + t, i)
            }), each(l.getPlaylists(), function(e, t) {
                t.getType() == AudioPlaylist.TYPE_ALBUM && t.getOwnerId() == s && l.deletePlaylist(t)
            });
            var d = geByClass1("ui_rmenu", cur.audioPage._container),
                u = geByClass1("ui_rmenu_item_sel", d),
                _ = u ? u.id : !1,
                c = domPN(d);
            c.replaceChild(se(a), d), cur.audioPage._initAlbumsSort(), _ && ge(_) && uiRightMenu.switchMenu(ge(_)), curBox().hide(), setTimeout(function() {
                if (r) nav.go("/audios" + s + "?album_id=" + t);
                else if (cur.audioPage) {
                    var e = cur.audioPage.getCurrentPlaylist();
                    e.getType() == AudioPlaylist.TYPE_ALBUM && e.getOwnerId() == s && cur.audioPage.switchToSection(e)
                }
            }, 200)
        }
    }), !1
}, AudioPage.filterByAlbum = function(e, t) {
    for (var i = e.length, a = [], o = 0; i > o; o++) {
        var s = e[o];
        t == s[AudioUtils.AUDIO_ITEM_INDEX_ALBUM_ID] && a.push(s)
    }
    return a
}, AudioPage.showActionTooltip = function(e, t) {
    var i = [3, -8, 0],
        a = currentAudioPage(e).isLayer();
    hasClass(e, "_audio_page_player_add") ? audioShowActionTooltip(e, i, a) : showTooltip(e, {
        text: t,
        black: 1,
        shift: i,
        appendParentCls: "_audio_page_player",
        forcetodown: a,
        needLeft: a
    })
}, AudioPage.prototype.createAlbum = function(e, t) {
    return this.editAlbum(0), cancelEvent(e)
}, AudioPage.prototype.onHide = function() {
    var e = this;
    cur.nav = cur.nav.filter(function(t) {
        return e._nav_func != t
    }), this._deinitKeyEvents()
}, AudioPage.prototype.addMd = function(e, t, i) {
    var a = gpeByClass("_audio_row", e),
        o = AudioUtils.getAudioFromEl(a, !0);
    return cur.editTopAudio = o, showBox("al_audio.php", {
        act: "edit_audio_box",
        aid: t,
        top_edit: 1
    }, {
        params: {
            width: "456px",
            bodyStyle: "padding: 20px; background-color: #F7F7F7;",
            hideButtons: 1
        },
        dark: 1
    }), i && cancelEvent(i), !1
}, AudioPage.prototype.removeMd = function(e, t, i) {
    var a = gpeByClass("_audio_row", e),
        o = AudioUtils.getAudioFromEl(a, !0);
    return re(a), ajax.post("al_audio.php", {
        act: "delete_audio",
        oid: o.ownerId,
        aid: o.id,
        hash: o.actionHash,
        top_moder: 1
    }), i && cancelEvent(i), !1
}, AudioPage.prototype.showRecoms = function(e, t, i) {
    if (!t) {
        var a = this._readyAudio ? this._readyAudio : getAudioPlayer().getCurrentAudio();
        t = AudioUtils.asObject(a).fullId
    }
    nav.go({
        0: "audios" + this.getOwnerId(),
        section: "recoms_audio",
        audio_id: t
    })
}, AudioPage.prototype.showAlbumRecoms = function(e, t, i, a) {
    return nav.go({
        0: nav.objLoc[0],
        section: "recoms",
        album_id: a
    }), cancelEvent(t)
}, AudioPage.prototype.onShow = function(e) {
    this.saveSearchHistoryWait = !1, val(this.searchInputEl, "", !0), uiSearch.removeAllFilters(this.searchInputEl), setTimeout(elfocus.pbind(this.searchInputEl), 10), e = e || this.ap.getCurrentPlaylist() || this.getCurrentPlaylist(), this.isLayer() && e != this.ap.getCurrentPlaylist() && this._initialPlaylist && (e = this._initialPlaylist), this._initPlayer(), this._initKeyEvents(), this.updateStatusExportControls(), this.isLayer() && setTimeout(function() {
        this.getLayer().sb.widthUpdated()
    }.bind(this)), this.scrollToTrack(!0)
}, AudioPage.prototype.onAudioUploaded = function(e, t) {
    if (t) {
        var i = getAudioPlayer(),
            a = i.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, this.getOwnerId(), AudioPlaylist.DEFAULT_PLAYLIST_ID);
        a.addAudio(t, 0);
        var o = i.getCurrentPlaylist();
        o && o.getSelf() == a && o.addAudio(t), "all" == this._currentSection && this._initAudioRowsAutoList()
    }
}, AudioPage.prototype.uploadAudio = function(e) {
    return this._data.uploadBanned ? void setTimeout(showFastBox({
        title: AudioPlayer.getLang("audio_no_upload_title"),
        bodyStyle: "padding: 20px; line-height: 160%;",
        dark: 1
    }, AudioPlayer.getLang("audio_claims_no_upload")).hide, 5e3) : void showBox("al_audio.php", extend(e || {}, {
        act: "new_audio",
        gid: this.getOwnerId() < 0 ? -this.getOwnerId() : 0
    }), {
        params: {
            width: "450px",
            bodyStyle: "padding: 0px; position: relative;"
        },
        dark: 1
    })
}, AudioPage.prototype.editAudio = function(e, t, i) {
    return showBox("al_audio.php", {
        act: "edit_audio_box",
        aid: t
    }, {
        params: {
            width: "456px",
            bodyStyle: "padding: 20px; background-color: #F7F7F7;",
            hideButtons: 1
        },
        dark: 1
    }), i && cancelEvent(i), !1
}, AudioPage.prototype.hideRecommendation = function(e) {
    var t = getAudioPlayer(),
        i = AudioUtils.getAudioFromEl(e, !0),
        a = AudioUtils.asObject(t.getCurrentAudio());
    a && a.fullId == i.fullId && t.playNext();
    var o = AudioUtils.getAudioExtra(i).recom,
        s = {
            act: "hide_recommendation",
            q: o.q,
            hash: o.hash
        };
    nav.objLoc.audio_id && (s.recommendation_type = "query"), nav.objLoc.album_id && (s.recommendation_type = "album"), ajax.post("al_audio.php", s), cur._audioAddRestoreInfo[i.fullId] = {
        state: "recom_hidden"
    };
    var r = t.getCurrentPlaylist();
    r && r.getType() == AudioPlaylist.TYPE_RECOM && (cur._audioAddRestoreInfo[i.fullId].removedCurrentPos = r.removeAudio(i))
}, AudioPage.prototype.restoreRecommendation = function(e) {
    var t = AudioUtils.getAudioFromEl(e, !0),
        i = AudioUtils.getAudioExtra(t).recom,
        a = {
            act: "restore_recommendation",
            q: i.q,
            hash: i.hash,
            aid: t.fullId
        };
    nav.objLoc.audio_id && (a.recommendation_type = "query"), nav.objLoc.album_id && (a.recommendation_type = "album"), ajax.post("al_audio.php", a), removeClass(e, "audio_deleted");
    var o = cur._audioAddRestoreInfo[t.fullId].removedCurrentPos,
        s = this.ap.getCurrentPlaylist();
    o >= 0 && s && s.getType() == AudioPlaylist.TYPE_RECOM && s.addAudio(AudioUtils.getAudioFromEl(e), o), delete cur._audioAddRestoreInfo[t.fullId]
}, AudioPage.isInRecentPlayed = function(e) {
    var t = gpeByClass("_audio_playlist", e);
    return t && hasClass(t, "audio_recent_rows") ? data(t, "playlist") : !1
}, AudioPage.prototype.deleteAudio = function(e, t, i, a) {
    function o() {
        return intval(domData(r, "in-progress"))
    }

    function s(e) {
        return domData(r, "in-progress", intval(e))
    }
    window.tooltips && tooltips.hideAll();
    var r = domClosest("_audio_row", e);
    if (!o()) {
        s(!0), hasClass(r, "claimed") && (a = !0);
        var l = AudioUtils.getAudioFromEl(r, !0);
        if (AudioUtils.isRecomAudio(l)) return addClass(r, "audio_deleted"), this.hideRecommendation(r), s(!1), cancelEvent(i);
        var n;
        if (n = AudioPage.isInRecentPlayed(r)) {
            ajax.post("al_audio.php", {
                act: "remove_listened",
                audio_owner_id: l.ownerId,
                audio_id: l.id,
                hash: l.actionHash
            }), s(!1), re(r);
            var d = AudioUtils.asObject(ap.getCurrentAudio());
            return l.id == d.id && l.ownerId == d.ownerId ? n._nextAfterRemovedIndex = n.indexOfAudio(l) : delete n._nextAfterRemovedIndex, n.removeAudio(l), this._updateEmptyPlaceholder(n), cancelEvent(i)
        }
        cur._audioAddRestoreInfo = cur._audioAddRestoreInfo || {};
        var u = cur._audioAddRestoreInfo[l.fullId];
        if (!(hasClass(r, "audio_delete_all") && u && u.deleteAll)) {
            a ? re(r) : (addClass(r, "audio_deleted"), addClass(r, "canadd"), removeClass(r, "canedit"));
            var _ = this;
            return ajax.post("al_audio.php", {
                act: "delete_audio",
                oid: l.ownerId,
                aid: l.id,
                hash: l.editHash,
                restore: 1
            }, {
                onDone: function(e, t) {
                    a || (s(!1), e && addClass(r, "audio_delete_all")), cur._audioAddRestoreInfo[l.fullId] = {
                        state: "deleted",
                        deleteAll: e,
                        deleteConfirmMsg: t
                    }, a && _._deleteDeletedAudios()
                }
            }), cancelEvent(i)
        }
        showFastBox({
            title: getLang("audio_delete_all_title"),
            dark: 1
        }, u.deleteConfirmMsg || "", getLang("global_delete"), function(e) {
            var t = extend({
                act: "delete_all"
            }, u.deleteAll);
            ajax.post("al_audio.php", t, {
                showProgress: lockButton.pbind(e),
                onDone: function() {
                    var e = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_ALBUM, u.deleteAll.from_id, AudioPlaylist.ALBUM_ALL);
                    getAudioPlayer().deletePlaylist(e), nav.reload()
                }
            })
        }, getLang("global_cancel"))
    }
}, AudioPage.prototype.toggleAudioDurationType = function() {
    this.ap.toggleDurationType()
}, AudioPage.prototype._updateShuffleButton = function(e) {
    toggleClass(geByClass1("_audio_shuffle_btn", this._container), "audio_page_player_btn_enabled", !!e.shuffle)
}, AudioPage.prototype.toggleRepeat = function(e) {
    var t = getAudioPlayer(),
        i = toggleClass(e, "audio_page_player_btn_enabled");
    if (t.toggleRepeatCurrentAudio(i), this.isLayer() && cur.audioPage) {
        var a = geByClass1("_audio_page_player_repeat", cur.audioPage._els.pageContainer);
        a && toggleClass(a, "audio_page_player_btn_enabled", i)
    }
}, AudioPage.prototype.toggleShuffle = function(e) {
    toggleClass(e, "audio_page_player_btn_enabled");
    var t = this._pagePlaylist;
    t.loadAll(function() {
        t.isShuffled() ? (removeClass(e, "audio_page_player_btn_enabled"), t.shuffle(0), this._enableAudioRowsSorter()) : (addClass(e, "audio_page_player_btn_enabled"), t.shuffle(irand(1, 999999)), this._disableAudioRowsSorter()), "search" == this._currentSection ? this._doShowSearchSection() : this._initAudioRowsAutoList()
    }.bind(this))
}, AudioPage.prototype._getCurrentSearchParams = function() {
    var e = window.radioBtns["audio_search_type_" + intval(this.isLayer())],
        t = intval(this._searchSortFilter.selectedItems()[0][0]);
    return {
        performer: e.val ? 1 : null,
        lyrics: hasClass(geByClass1("_audio_fltr_with_lyrics", this._container), "on") ? 1 : null,
        sort: t ? 1 : null
    }
}, AudioPage.searchAudios = function(e, t, i) {
    currentAudioPage(this).searchAudios(e, t, i)
}, AudioPage.prototype.searchAudios = function(e, t, i) {
    return this._muteSearch ? void delete this._muteSearch : (e = trim(e), void nav.change(extend(this._getCurrentSearchParams(), {
        q: e || null
    }), !1, {
        fromSearch: !0,
        globalQuery: t,
        fromHistory: i,
        isLayer: this.isLayer()
    }))
}, AudioPage.prototype.onUserAction = function(e, t) {
    var i = t.indexOfAudio(e);
    if (-1 != i && t.getType() == AudioPlaylist.TYPE_SEARCH) {
        var a = t.getOwnerId() == vk.id && i >= 0 && i < t.getLocalFoundCount();
        if (!a) {
            var o = t.getSearchParams();
            o.globalQuery && uiSearch.saveHistorySearch(this.searchInputEl, o.globalQuery, e.ownerId, e.id, t.getTotalCount(), t.getTotalCountHash())
        }
    }
}, AudioPage.prototype._updateFriendsList = function(e, t, i) {
    if (e = trim(e), this._friendSearchInProgress = !1, e) {
        var a = geByClass1("_audio_friends_list", this._els.pageContainer),
            o = se('<div class="audio_friends_list _audio_friends_list" style="opacity: 0; position: absolute; top: 0;">' + e + "</div>");
        i && (this._shownFriends = []), domPN(a).appendChild(o), setTimeout(function() {
            setStyle(o, {
                opacity: 1
            })
        }), setTimeout(function() {
            re(a), setStyle(o, {
                position: "relative"
            }), updateNarrow()
        }, 160)
    }
}, AudioPage.searchMoreFriends = function(e) {
    this._searchMoreFriends(e)
}, AudioPage.prototype._searchMoreFriends = function(e) {
    this._friendSearchInProgress || (this._friendSearchInProgress = !0, ajax.post("al_audio.php", {
        act: "search_friends",
        str: e
    }, {
        onDone: this._updateFriendsList.bind(this)
    }))
}, AudioPage.prototype.showMoreFriends = function(e, t) {
    this._friendSearchInProgress || (this._friendSearchInProgress = !0, this._shownFriends = this._shownFriends || [], each(geByClass("_audio_friend", this._els.pageContainer), function(e, t) {
        this._shownFriends.push(domData(t, "id"))
    }.bind(this)), ajax.post("al_audio.php", {
        act: "more_friends",
        exclude: t ? !1 : this._shownFriends.join(","),
        owner: t
    }, {
        showProgress: e ? lockButton.pbind(e) : !1,
        hideProgress: e ? unlockButton.pbind(e) : !1,
        onDone: this._updateFriendsList.bind(this)
    }))
}, AudioPage.prototype.catalogShowMorePerformers = function(e) {
    var t = [],
        i = geByClass1("_audio_catalog_performers", gpeByClass("_audio_additional_block", e)),
        a = domData(i, "genre");
    each(geByClass("_audio_catalog_performer", i), function() {
        t.push(domData(this, "performer-id"))
    }), ajax.post("al_audio.php", {
        act: "get_more_performers",
        offset: 4,
        exclude: t.join(","),
        genre: a
    }, {
        onDone: function(t) {
            i.appendChild(se("<div>" + t + "</div>")), re(e)
        },
        showProgress: lockButton.pbind(e),
        hideProgress: unlockButton.pbind(e)
    })
}, AudioPage.prototype.showStatusTooltip = function(e) {
    this.statusTT || (this.statusTT = !0, ajax.post("al_audio.php", {
        act: "status_tt"
    }, {
        onDone: function(t, i) {
            this.statusTT = new ElementTooltip(e, {
                content: i,
                width: 250,
                offset: [1, 14],
                shift: this.isLayer() ? -103 : -50,
                elClassWhenTooltip: "audio_status_tt_shown",
                id: "audio_status_tt",
                onFirstTimeShow: function(e) {
                    this.sb = new uiScroll(geByClass1("audio_status_wrap", e), {
                        global: !0
                    })
                },
                onShow: function() {
                    setTimeout(function() {
                        this.statusTT.sb.update()
                    }.bind(this), 0)
                }.bind(this)
            }), cur._onStatusExportBtn && (this.statusTT.show(), this.statusTT.sb.update())
        }.bind(this)
    }))
}, AudioPage.prototype.isLayer = function() {
    return this._data.isLayer
}, AudioPage.prototype.getLayer = function() {
    return this.options.layer
}, AudioPage.prototype._initSorter2 = function(e) {
    function t(t, i, a) {
        var s = domData(t, "full-id"),
            r = domData(i, "full-id"),
            n = domData(a, "full-id"),
            d = e.indexOfAudio(s),
            u = e.indexOfAudio(r),
            _ = e.indexOfAudio(n);
        r ? e.moveAudio(d, u) : n && e.moveAudio(d, _ + 1), o.isLayer() || (s = s.split("_"), ajax.post("al_audio.php", {
            act: "reorder_audios",
            oid: intval(s[0]),
            aid: intval(s[1]),
            before: r,
            after: n,
            hash: o.options.reorderHash,
            top_moder: intval(l),
            album_id: intval(nav.objLoc.album_id)
        }))
    }

    function i(e) {
        var t = e.id.split("_");
        return t[t.length - 1]
    }
    var a = geByClass1("_audio_playlist", this._container);
    this._sorter && !this._sorter.isCurrentlyDragging() && (this._sorter.destroy(), this._sorter = !1);
    var o = this,
        s = !1,
        r = this.getCurrentPlaylist(),
        l = !1;
    if (this.isLayer() ? s = r == this.ap.getCurrentPlaylist() : (l = e.getType() == AudioPlaylist.TYPE_POPULAR && this.options.md, e.getOwnerId() > 0 ? s = e.getType() == AudioPlaylist.TYPE_ALBUM && vk.id == e.getOwnerId() : (s = this.options.reorderHash && e.getType() == AudioPlaylist.TYPE_ALBUM || l, nav.objLoc.friend && (s = !1))), s && !this._sorter) {
        var n = this.isLayer() ? {} : {
            onDragOverElClass: "_audio_album_item",
            onDragEnter: function(t, a) {
                var o = i(t);
                o != e.getAlbumId() && (addClass(a, "audio_item_drag_over_album"), addClass(t, "audio_album_drop"))
            },
            onDragLeave: function(e, t) {
                removeClass(t, "audio_item_drag_over_album"), removeClass(e, "audio_album_drop")
            },
            onDragDrop: function(t, a) {
                removeClass(a, "audio_item_drag_over_album"), removeClass(t, "audio_album_drop");
                var s = i(t),
                    r = domData(a, "full-id");
                if (s == e.getAlbumId()) return !0;
                ajax.post("al_audio.php", {
                    act: "a_move_to_album",
                    album_id: s,
                    audio_id: r.split("_")[1],
                    hash: o.options.moveHash,
                    gid: o.options.oid < 0 ? -o.options.oid : null
                });
                var l = o.getCurrentPlaylist(),
                    n = l.indexOfAudio(r);
                if (l.getAlbumId() != AudioPlaylist.ALBUM_ALL && n >= 0) l.removeAudio(r), o.switchToSection(l);
                else {
                    var d = o.ap.getPlaylist(AudioPlaylist.TYPE_ALBUM, o.options.oid, s);
                    d.clean()
                }
                var u = {};
                return u[AudioUtils.AUDIO_ITEM_INDEX_ALBUM_ID] = s, o.ap.updateAudio(r, u), !0
            }
        };
        this._sorter = new GridSorter(a, extend({
            onReorder: t,
            wrapNode: this.isLayer() ? geByClass1("audio_layer_rows_wrap", this._container) : !1,
            dragCls: "audio_item_drag",
            limitBottomMove: !0
        }, n))
    }
}, AudioPage.prototype._updateLayerRowsBottomPadding = function() {
    if (this.isLayer()) {
        var e = geByClass1("_audio_rows", this._container);
        setStyle(e, "padding-bottom", null);
        var t = (getXY(e)[1], getSize(e)[1] + getSize(this.searchInputEl)[1]),
            i = 0,
            a = geByClass1("_audio_layer_menu_wrap", this._container),
            o = getSize(a)[1],
            s = geByClass1("_audio_layer_rows_wrap", this._container),
            r = getSize(s)[1],
            l = Math.max(o, r);
        l > t ? setStyle(e, "padding-bottom", l - t + i - 1) : setStyle(e, "padding-bottom", null), setTimeout(function() {
            var e = getAudioPlayer().layer;
            e && e.sb.update()
        }, 1)
    }
}, AudioPage.prototype._initAutoList2 = function(e, t, i) {
    var a = this,
        o = getAudioPlayer(),
        s = geByClass1("_audio_playlist", this._container),
        r = geByClass1("_ui_audio_load_more", this._container),
        l = 50;
    this._autoList && this._autoList.destroy();
    var n = 0,
        d = !1;
    this._autoList = new AutoList(s, {
        isLayer: this.isLayer(),
        scrollNode: this.isLayer() ? geByClass1("_audio_layer_rows_wrap", this._container) : window,
        contentNode: geByClass1("_audio_rows", this._container),
        renderImmediate: !0,
        rowClass: "_audio_row audio_feed_post",
        onNoMore: function() {
            hide(r), a._updateEmptyPlaceholder(e)
        },
        onHasMore: function() {
            a._updateEmptyPlaceholder(e)
        },
        onRendered: function() {
            if (i(!1), a._updateLayerRowsBottomPadding(), o.updateCurrentPlaying(), !d)
                if (d = !0, a.isLayer()) {
                    var e = geByClass1("_audio_layer_rows_wrap", a._container);
                    e.scrollTop = 0, a.getLayer().sb.update()
                } else scrollToY(0)
        },
        onNeedRows: function(t, d, u, _) {
            function c(e) {
                if (e) {
                    if (0 == d && (s.innerHTML = ""), e.getType() == AudioPlaylist.TYPE_FEED && e != o.getCurrentPlaylist()) g = e.getItemsList().slice(d, d + l);
                    else {
                        h = e.getAudiosList().slice(d, d + l);
                        var i = e.getType() == AudioPlaylist.TYPE_SEARCH && o.getCurrentPlaylist() != e,
                            r = !1;
                        if (i) {
                            var n = e.getSearchParams().q;
                            n += " " + (parseLatin(n) || ""), n = trim(n.replace(/\)/g, "").replace(/&/, "&amp;")), r = new RegExp("(\\s|^)(" + n.replace(vkIndexer.delimiter, "|").replace(/(^\||\|$|\?)/g, "") + ")", "gi")
                        }
                        each(h, function(t, a) {
                            i && d + t == e.getLocalFoundCount() && g.push("<h3>" + langNumeric(e.getTotalCount(), o.langs.audio_global_search_found, !0) + "</h3>"), a = clone(a), a[AudioUtils.AUDIO_ITEM_INDEX_TITLE] = a[AudioUtils.AUDIO_ITEM_INDEX_TITLE].replace(r, "$1<em>$2</em>"), a[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] = a[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER].replace(r, "$1<em>$2</em>");
                            var s = "",
                                l = AudioUtils.getAddRestoreInfo()[AudioUtils.asObject(a).fullId];
                            l && "added" == l.state && (s = "added"), g.push(AudioUtils.drawAudio(a, s))
                        })
                    }
                    if (t(g), !d && !a.isLayer()) {
                        var u = e.getTitle() || document.title;
                        document.title = replaceEntities(u.replace(/(<em>|<\/em>|<strong>|<\/strong>)/g, ""))
                    }
                }
            }
            var h, g = [];
            n = d, _ || i(!0), d > 0 && (show(r), lockButton(r)), e.load(d, function(e) {
                e.getId() == a.getCurrentPlaylist().getId() && c(e)
            })
        }
    }), cur.destroy.push(function() {
        this._autoList && this._autoList.destroy()
    }.bind(this))
}, AudioPage.prototype.destroy = function() {
    this._trackSlider.destroy(), this._volumeSlider.destroy(), removeEvent(window, "scroll", this._ev_onScroll)
}, AudioPage.prototype.getPageCurrentPlaylist = function() {
    return this._pagePlaylist
}, AudioPage.prototype._initScroll = function() {
    if (this.isLayer()) {
        var e = geByClass1("audio_layer_menu_wrap", this._container),
            t = geByClass1("audio_layer_rows_wrap", this._container),
            i = geByClass1("audio_rows_header", this._container),
            a = t.scrollTop,
            o = 0,
            s = getSize(i),
            r = this;
        return setStyle(i, {
            width: s[0]
        }), void addEvent(t, "scroll", this._ev_onScroll = function(l) {
            getSize(e)[1], getSize(t)[1];
            if (cur.audioCancelMenuScroll) o = a = 0;
            else {
                var n = t.scrollTop - a;
                o -= n, o = Math.max(getSize(t)[1] - getSize(e)[1], o), o = Math.min(0, o)
            }
            setStyle(e, "top", o), a = t.scrollTop, delete cur.audioCancelMenuScroll;
            var d = geByClass1("_audio_padding_cont", r._container);
            t.scrollTop > 0 ? (setStyle(d, {
                "padding-top": s[1]
            }), addClass(i, "fixed")) : (setStyle(d, {
                "padding-top": null
            }), removeClass(i, "fixed"))
        })
    }
    var r = this,
        l = geByClass1("_audio_rows_header", this._container),
        n = getSize(l)[1],
        d = domPN(l),
        u = getSize(d)[0],
        _ = getSize(ge("page_header_cont"))[1];
    setStyle(l, {
        width: u,
        top: _
    });
    var c = getXY(d)[1];
    addEvent(window, "scroll resize", this._ev_onScroll = function(e) {
        scrollGetY() >= c - _ ? (addClass(l, "fixed"), setStyle(d, {
            "padding-top": n,
            "z-index": 2
        })) : (removeClass(l, "fixed"), setStyle(d, {
            "padding-top": null
        })), hasClass(l, "fixed") && setStyle(l, "left", getXY(d)[0] - scrollGetX())
    }), this.isLayer() || cur.destroy.push(function() {
        removeEvent(window, "scroll resize", r._ev_onScroll)
    })
}, AudioPage.prototype.subscribeToOwner = function(e, t, i) {
    ajax.post("al_audio.php", {
        act: "subscribe_to_owner",
        hash: i,
        owner_id: t
    }, {
        showProgress: lockButton.pbind(e),
        hideProgress: unlockButton.pbind(e),
        onDone: function(t) {
            val(e, t), addClass(e, "secondary"), addClass(e, "no_events")
        }
    })
}, AudioPage.prototype._normalizePlaylistId = function(e) {
    var t = (e.getAlbumId() + "").replace(/^[a-z]*/, "");
    return e.getType() + "_" + e.getOwnerId() + "_" + parseInt(t)
}, AudioPage.prototype.switchToSection = function(e, t) {
    var i = geByClass1("_audio_playlist", this._container);
    toggleClass(i, "audio_recent_rows", e.getType() == AudioPlaylist.TYPE_RECENT), toggleClass(i, "audio_search_rows", e.getType() == AudioPlaylist.TYPE_SEARCH), toggleClass(i, "audio_popular_rows", e.getType() == AudioPlaylist.TYPE_POPULAR), toggleClass(i, "audio_current_rows", this.isLayer() && e == getAudioPlayer().getCurrentPlaylist()), toggleClass(i, "audio_md_rows", !!this.options.md), e.load(), e.audioPageRef = this, data(i, "playlist", e), stManager.add("audioplayer.js"), this._initAutoList(e, i, function(i) {
        if (i) {
            var a;
            if (this.isLayer() && e == getAudioPlayer().getCurrentPlaylist() || geByClass1("_ui_item_audio_" + e.getId(), this._getMenuEl()), !a) switch (e.getType()) {
                case AudioPlaylist.TYPE_POPULAR:
                    a = geByClass1("_ui_item_audio_popular_" + this.options.oid, this._getMenuEl());
                    break;
                case AudioPlaylist.TYPE_RECOM:
                    a = geByClass1("_ui_item_audio_recoms_" + this.options.oid, this._getMenuEl());
                    break;
                case AudioPlaylist.TYPE_FEED:
                    a = geByClass1("_ui_item_audio_feed_" + this.options.oid, this._getMenuEl())
            }
            if (a && isVisible(a) ? (uiRightMenu.switchMenu(a), uiRightMenu.showProgress(a)) : this._hideMenuItemProgress(), !a && e.getType() == AudioPlaylist.TYPE_ALBUM && e.getOwnerId() != vk.id) {
                var o = geByClass1("_audio_friend_" + e.getOwnerId(), this._container);
                o && showProgress(o)
            }
            e.getType() == AudioPlaylist.TYPE_SEARCH && uiSearch.showProgress(this.searchInputEl)
        } else unlockButton(geByClass1("audio_more_friends_btn")), this._hideMenuItemProgress(), this._updateAdditionalBlocksAndRightMenu(e, t), this._updateEmptyPlaceholder(e), uiSearch.hideProgress(this.searchInputEl), this._initSorter(e)
    }.bind(this)), this.isLayer() && toggleClass(uiSearch.getWrapEl(this.searchInputEl), "ui_search_field_empty", !val(this.searchInputEl))
}, AudioPage.prototype._getForeignTogglerEl = function() {
    return geByClass1("_ui_toggler", geByClass1("_audio_foreign_filter_block", this._container))
}, AudioPage.prototype.toggleForeign = function() {
    var e = this._getForeignTogglerEl(),
        t = toggleClass(e, "on"),
        i = this.getCurrentPlaylist(),
        a = (i.getAlbumId() + "").replace(/[a-z]*/, ""),
        o = this.ap.getPlaylist(AudioPlaylist.TYPE_POPULAR, vk.id, (t ? "foreign" : "") + a);
    this.switchToSection(o)
}, AudioPage.prototype._updateEmptyPlaceholder = function(e) {
    var t = geByClass1("_audio_empty_placeholder ", this._container);
    if (e.getAudiosCount()) hide(t);
    else {
        show(t);
        var i = "",
            a = e.getType();
        if (a == AudioPlaylist.TYPE_ALBUM) i = e.getOwnerId() == vk.id ? AudioPlayer.getLang("audio_no_rec_load_msg").replace(/\{link\}/, '<a onclick="AudioPage(this).uploadAudio({}); return false">').replace(/\{\/link\}/, "</a>") : AudioPlayer.getLang("audio_album_no_recs");
        else if (a == AudioPlaylist.TYPE_SEARCH) i = AudioPlayer.getLang("audio_no_audios_found").replace("{query}", clean(e.getSearchParams().q));
        else if (a == AudioPlaylist.TYPE_RECENT) i = AudioPlayer.getLang("audio_no_listened_info");
        else if (a == AudioPlaylist.TYPE_RECOM) {
            var o = e.getAlbumId();
            i = isNumeric(o) || 0 == o.indexOf("album") ? AudioPlayer.getLang("audio_no_recs_found") : AudioPlayer.getLang("audio_no_audio_recs_found")
        } else i = AudioPlayer.getLang("audio_album_no_recs");
        val(t, i)
    }
}, AudioPage.prototype._updateAdditionalBlocksAndRightMenu = function(e, t) {
    return
}, AudioPage.prototype.onSubmenuToggle = function() {
    this._updateLayerRowsBottomPadding()
}, AudioPage.prototype._updateLayerBottom = function() {}, AudioPage.prototype._hideMenuItemProgress = function() {
    uiRightMenu.hideProgress(this._getMenuEl()), hideProgress(geByClass1("audio_friends_list", this._container)), each(geByClass("audio_owners_wrap", this._container), function() {
        hideProgress(this)
    })
}, AudioPage.prototype._getMenuEl = function() {
    return geByClass1("ui_rmenu", this._container)
}, AudioPage.prototype._hideMenuSelectedItem = function() {
    removeClass(geByClass1("ui_rmenu", this._container), "ui_rmenu_item_sel")
}, AudioPage.prototype._unselectFriends = function() {
    hideProgress(geByClass1("_audio_friends_list", this._container)), each(geByClass("_audio_friend", this._container), function() {
        removeClass(this, "audio_friend_selected")
    }), unlockButton(geByClass1("audio_more_friends_btn"))
}, AudioPage.prototype._initNavigation2 = function() {
    this._prevLoc = !1;
    var e = !1,
        t = !1;
    cur.nav.push(this._nav_func = function(i, a, o, s) {
        if (this._deleteDeletedAudios(), s.searchPerformer && (o = extend({}, this._prevLoc, o)), this.isLayer()) {
            if (this._prevLoc !== !1) {
                a = clone(this._prevLoc), i = clone(o);
                for (var r in a) a[r] && void 0 === o[r] ? i[r] = !1 : a[r] == o[r] && delete i[r];
                (this._prevLoc.friend && i.friend === !1 || this._prevLoc.band && i.band === !1) && i.q && (o.friend = this._prevLoc.friend, o.band = this._prevLoc.band, delete i.friend, delete i.band)
            }
            t === !1 && (t = a[0]), 0 != o[0].indexOf("audio") && t == o[0] && delete i[0]
        }
        var l = void 0 !== i[0],
            n = i.q === !1;
        if (l && !i.q) {
            var d = this.options.oid;
            if (d != vk.id && !inArray(i[0], ["audios" + d]) || d == vk.id && !inArray(i[0], ["audios" + d, "audio"])) return !0
        }
        if (this.isLayer() && (s.hist || s.back || i[0] && 0 != i[0].indexOf("audio"))) return this.options.eltt.hide(), !0;
        if (!(0 != Object.keys(i).length || s.fromSearch || s.fromMenu || s.friendEl || s.forceUpdate)) return !1;
        n && e && s.fromSearch && (o = e);
        var u;
        if (this._unselectFriends(), o.q) {
            if (!s.fromSearch) {
                var _ = trim(val(this.searchInputEl));
                _ != o.q && val(this.searchInputEl, replaceEntities(o.q))
            }
            s.fromSearch && !s.filtersChanged || s.globalQuery || (s.globalQuery = o.q);
            var c = {
                    q: trim(o.q),
                    globalQuery: trim(s.globalQuery),
                    fromHistory: s.fromHistory
                },
                h = replaceEntities(o.q) + replaceEntities(s.globalQuery);
            each(["performer", "lyrics", "sort"], function(e, t) {
                c[t] = intval(o[t]), h += c[t]
            });
            var g = o.friend || o.band || this.options.oid;
            u = this.ap.getPlaylist(AudioPlaylist.TYPE_SEARCH, g, hashCode(h)), u.mergeWith({
                searchParams: c
            }), removeClass(uiSearch.getWrapEl(this.searchInputEl), "ui_search_field_empty"), e || a.q || (e = clone(a)), delete o.section
        } else if (o.section == AudioPlaylist.TYPE_POPULAR) {
            var p = hasClass(this._getForeignTogglerEl(), "on") ? "foreign" : "";
            u = this.ap.getPlaylist(AudioPlaylist.TYPE_POPULAR, vk.id, p + intval(o.genre))
        } else if (o.friend) {
            var y = intval(o.friend),
                f = geByClass1("_audio_friend_" + y, this._container);
            addClass(f, "audio_friend_selected"), u = this.ap.getPlaylist(AudioPlaylist.TYPE_ALBUM, y, AudioPlaylist.ALBUM_ALL), geByClass1("_audio_friend_" + y) || this.showMoreFriends(!1, y), u._friend = y, a.q && 0 > y && !cur.prevSearchPlaylist && (cur.prevSearchPlaylist = this.getCurrentPlaylist())
        } else if (o.section == AudioPlaylist.TYPE_RECOM) {
            var A = AudioPlaylist.ALBUM_ALL;
            o.audio_id ? A = "audio" + o.audio_id : o.album_id && (A = "album" + o.album_id), u = this.ap.getPlaylist(AudioPlaylist.TYPE_RECOM, this.options.oid, A)
        } else o.section == AudioPlaylist.TYPE_FEED ? u = this.ap.getPlaylist(AudioPlaylist.TYPE_FEED, vk.id, 0) : o.section == AudioPlaylist.TYPE_CURRENT ? u = this.ap.getCurrentPlaylist() : o.section == AudioPlaylist.TYPE_RECENT ? u = this.ap.getPlaylist(AudioPlaylist.TYPE_RECENT, vk.id) : o.band ? (u = this.ap.getPlaylist(AudioPlaylist.TYPE_ALBUM, intval(o.band), AudioPlaylist.ALBUM_ALL), u.mergeWith({
            band: 1
        })) : o.album_id ? u = this.ap.getPlaylist(AudioPlaylist.TYPE_ALBUM, this.options.oid, o.album_id) : (u = this.ap.getPlaylist(AudioPlaylist.TYPE_ALBUM, this.options.oid, AudioPlaylist.ALBUM_ALL), addClass(uiSearch.getWrapEl(this.searchInputEl), "ui_search_field_empty"));
        return o.section != AudioPlaylist.TYPE_RECOM && (delete o.audio_id, o.section && delete o.album_id), n && (e = !1, val(this.searchInputEl, "", !0), triggerEvent(this.searchInputEl, "refresh"), uiSearch.removeAllFilters(this.searchInputEl), delete o.performer, delete o.lyrics, delete o.sort), o.friend || delete cur.prevSearchPlaylist, this.isLayer() || nav.setLoc(o), this._prevLoc = o, this.syncParametersUI(o), this.switchToSection(u, !0), !1
    }.bind(this))
}, AudioPage.prototype.clearCurrentPlaylist = function() {
    if (this.isLayer()) {
        var e = getAudioPlayer();
        e.deleteCurrentPlaylist();
        var t = geByClass1("_audio_section_tab__current", this._els.pageContainer);
        addClass(t, "unshown"), uiTabs.switchTab(domFC(geByClass1("_audio_section_tab__all", this._els.pageContainer)), {
            noAnim: !0
        }), this.updateCurrentPlayingInfo(), this.showSection("all"), this.updateLayerHeight();
        var i = e.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID),
            a = i.getAudiosList()[0];
        a && (this._readyAudio = a, this._initPlayer(!0), this.isLayer() && cur.audioPage && (cur.audioPage._readyAudio = a, cur.audioPage._initPlayer(!0)))
    }
}, AudioPage.prototype.setTooltipTitle = function(e) {
    if (!e.titleSet) {
        var t = geByClass1("audio_page_player_title_performer", e),
            i = geByClass1("audio_page_player_title_song", e);
        (t.scrollWidth > t.clientWidth || i.scrollWidth > i.clientWidth) && e.setAttribute("title", e.innerText), e.titleSet = !0
    }
}, AudioPage.prototype._initPlayer = function(e) {
    function t(e) {
        s.isAdPlaying() ? (d.innerHTML = getLang("global_audio_ad"), u.innerHTML = "") : (e = AudioUtils.asObject(e), d.innerHTML = e.performer, u.innerHTML = "&nbsp;&ndash;&nbsp;" + e.title, e.coverUrl_p ? (setStyle(c, "background-image", "url(" + e.coverUrl_p + ")"), setStyle(c, "background-size", "cover")) : (setStyle(c, "background-image", null), setStyle(c, "background-size", "")), toggleClass(l, "audio_title_long_performer", e.isLongPerformer), toggleClass(l, "audio_title_long_title", e.isLongTitle), !o.isLayer() && s.getCurrentAudio() && AudioUtils.asObject(s.getCurrentAudio()).fullId == e.fullId && (document.title = replaceEntities(stripHTML(e.performer + " - " + e.title)), clearTimeout(window.pageSetTitleTimer)))
    }

    function i(e, t) {
        t = intval(t);
        var i, a = s.getDurationType();
        return i = a && 1 != e ? "-" + formatTime(Math.round(t - e * t)) : formatTime(Math.round(e * t))
    }

    function a() {
        if (o._trackSlider) {
            var e = AudioUtils.asObject(s.getCurrentAudio() || o._readyAudio);
            if (e) {
                var t = !1;
                t = o.getOwnerId() < 0 && o.canAddToGroup() ? e.ownerId != o.getOwnerId() : e.ownerId != vk.id, f !== t && (toggle(y, t), f = t), cur._audioAddRestoreInfo = cur._audioAddRestoreInfo || {};
                var i = cur._audioAddRestoreInfo[e.fullId];
                addClass(y, "no_transition"), toggleClass(y, "audio_player_btn_added", !(!i || "added" != i.state)), removeClassDelayed(y, "no_transition"), toggleClass(p, "audio_page_player_btn_enabled", s.isRepeatCurrentAudio())
            }
        }
    }
    var o = this,
        s = getAudioPlayer(),
        r = this._els.pageContainer,
        l = geByClass1("_audio_page_player", r),
        n = geByClass1("audio_page_player_title", l),
        d = geByClass1("audio_page_player_title_performer", l),
        u = geByClass1("audio_page_player_title_song", l),
        _ = geByClass1("audio_page_player_duration", l),
        c = geByClass1("_audio_page_player__cover", l),
        h = geByClass1("_audio_page_player_play", l),
        g = geByClass1("_play_blind_label", h),
        p = geByClass1("_audio_page_player_repeat", l),
        y = geByClass1("_audio_page_player_add", l),
        f = void 0;
    if (!this._trackSlider) {
        var A = s.isAdPlaying() ? s.adsGetCurrentProgress() : s.getCurrentProgress(),
            P = s.isAdPlaying() ? 0 : s.getCurrentBuffered();
        this._trackSlider = new Slider(geByClass1("audio_page_player_track_slider", l), {
            value: A,
            backValue: P,
            size: 1,
            hintClass: "audio_player_hint",
            withBackLine: !0,
            formatHint: function(e) {
                var t = s.getCurrentAudio() || o._readyAudio;
                return t = AudioUtils.asObject(t), formatTime(Math.round(e * t.duration))
            },
            onEndDragging: function(e) {
                s.seek(e)
            }
        }), s.isAdPlaying() && this._trackSlider.toggleAdState(!0), this._volumeSlider = new Slider(geByClass1("audio_page_player_volume_slider", l), {
            value: s.getVolume(),
            size: 1,
            hintClass: "audio_player_hint",
            log: !0,
            formatHint: function(e) {
                return Math.round(100 * e) + "%"
            },
            onChange: function(e) {
                s.setVolume(e)
            }
        }), s.on(this, AudioPlayer.EVENT_AD_DEINITED, function() {}.bind(this)), s.on(this, AudioPlayer.EVENT_AD_READY, function() {}.bind(this)), s.on(this, AudioPlayer.EVENT_AD_STARTED, function() {
            this._trackSlider.toggleAdState(!0), this._trackSlider.setBackValue(0)
        }.bind(this)), s.on(this, AudioPlayer.EVENT_AD_COMPLETED, function() {
            this._trackSlider.toggleAdState(!1)
        }.bind(this)), s.on(this, AudioPlayer.EVENT_START_LOADING, function() {
            o._trackSlider.toggleLoading(!0)
        }), s.on(this, AudioPlayer.EVENT_CAN_PLAY, function() {
            o._trackSlider.toggleLoading(!1)
        }), s.on(this, AudioPlayer.EVENT_ADDED, function(e, t) {
            e = AudioUtils.asObject(e), e && e.fullId == t && addClass(y, "audio_player_btn_added")
        }), s.on(this, AudioPlayer.EVENT_REMOVED, function(e, t) {
            e = AudioUtils.asObject(e), e && e.fullId == t && removeClass(y, "audio_player_btn_added")
        }), s.on(this, AudioPlayer.EVENT_PLAY, function(e, s, r) {
            delete o._readyAudio, data(l, "audio", e), a(), t(e), addClass(h, "audio_playing"), s && !cur.audioStartReadyAudio && (o._trackSlider.setBackValue(0), _.innerHTML = i(0, AudioUtils.asObject(e).duration), n.setAttribute("title", ""), n.titleSet = !1), g.innerHTML = getLang("global_audio_pause"), o.updateCurrentPlayingInfo()
        }), s.on(this, AudioPlayer.EVENT_PAUSE, function(e) {
            removeClass(h, "audio_playing"), g.innerHTML = getLang("global_audio_play")
        }), s.on(this, AudioPlayer.EVENT_STOP, function(e) {
            removeClass(h, "audio_playing"), g.innerHTML = getLang("global_audio_play")
        }), s.on(this, AudioPlayer.EVENT_BUFFERED, function(e, t) {
            o._trackSlider.setBackValue(t)
        }), s.on(this, AudioPlayer.EVENT_VOLUME, function(e, t) {
            o._volumeSlider.setValue(t)
        }), s.on(this, AudioPlayer.EVENT_ENDED, function() {
            o._trackSlider.toggleLoading(!1)
        }), s.on(this, AudioPlayer.EVENT_UPDATE, function(e, a) {
            e && t(e), s.isAdPlaying() || e && a && (_.innerHTML = i(a, AudioUtils.asObject(e).duration))
        }.bind(this)), s.on(this, AudioPlayer.EVENT_PROGRESS, function(e, t, a) {
            o._trackSlider.toggleLoading(!1), o._trackSlider.setValue(t), isUndefined(a) || (_.innerHTML = i(t, a))
        }), s.on(this, AudioPlayer.EVENT_FAILED, function(e, t, i) {
            o._trackSlider.toggleLoading(!1)
        })
    }
    var v = s.getCurrentAudio() || this._readyAudio;
    v && (domData(l, "audio", JSON.stringify(v)), t(v), toggleClass(h, "audio_playing", s.isPlaying()), _.innerHTML = i(1, AudioUtils.asObject(v).duration), e && (this._trackSlider.setValue(0), this._trackSlider.setBackValue(0), this._trackSlider.toggleLoading(!1))), a(), this.isLayer() || this._initFixedPlayer()
}, AudioPage.prototype._initFixedPlayer = function() {
    var e = getSize(this._els.playerWrap);
    setStyle(this._els.playerWrap, {
        width: e[0],
        height: e[1]
    });
    var t = getSize(this._els.player);
    setStyle(this._els.player, {
        width: t[0],
        height: t[1]
    });
    var i, a = getSize("page_header_wrap")[1],
        o = getXY(this._els.contentBlock)[1],
        s = getXY(this._els.playerWrap)[1] + getSize(this._els.playerWrap)[1] - a,
        r = !1;
    addEvent(window, "scroll", this._onScroll = function() {
        var e = scrollGetY(),
            t = e > o,
            a = s > e;
        return a && i ? (clearTimeout(i), removeClass(this._els.player, "audio_page_player_fixed_shown"), removeClass(this._els.player, "audio_page_player_fixed"), void(r = i = !1)) : (t && !r && (clearTimeout(i), i = 0, addClass(this._els.player, "audio_page_player_fixed"), addClassDelayed(this._els.player, "audio_page_player_fixed_shown"), r = !0), void(!t && r && (clearTimeout(i), i = 0, removeClass(this._els.player, "audio_page_player_fixed_shown"), i = setTimeout(function() {
            removeClass(this._els.player, "audio_page_player_fixed"), i = !1
        }.bind(this), 250), r = !1)))
    }.bind(this)), cur.destroy.push(function() {
        this._onScroll && removeEvent(window, "scroll", this._onScroll)
    }.bind(this))
}, AudioPage.prototype.scrollToTrack = function(e) {
    var t = this,
        i = this.getCurrentPlaylist(),
        a = this.ap.getCurrentAudio();
    if ((!this.isLayer() || this.getLayer().isShown()) && i && -1 != i.indexOfAudio(a)) {
        this.ap.updateCurrentPlaying();
        var o = geByClass1(AudioUtils.AUDIO_PLAYING_CLS, this._container);
        if (!o) {
            a = AudioUtils.asObject(a);
            for (var s = 100; s-- && (this._autoList.drawMore(), o = geByClass1("_audio_row_" + a.fullId, this._container), !(o || this._autoList.isPendingRows() || this._autoList.isDone())););
        }
        if (o) {
            setTimeout(function() {
                t.ap.updateCurrentPlaying()
            }, 1);
            var r = this.isLayer() ? geByClass1("audio_layer_rows_wrap", this._container) : bodyNode,
                l = this.isLayer() ? r.scrollTop : 0,
                n = this.isLayer() ? getSize(r)[1] : clientHeight(),
                d = this.isLayer() ? getXY(r)[1] : 0,
                u = getXY(o)[1] - d + l,
                _ = getSize(o)[1],
                c = this.isLayer() ? r.scrollTop : scrollGetY();
            if (e || !(c > u || u > c + n)) {
                var h = u - n / 2 + _ / 2;
                t.isLayer() ? (cur.audioCancelMenuScroll = !0, r.scrollTop = h, setTimeout(function() {
                    cur.audioCancelMenuScroll = !0, r.scrollTop = h, t.getLayer().sb.update(), delete cur.audioCancelMenuScroll
                })) : scrollToY(h, 400)
            }
        }
    }
}, AudioPage.prototype.togglePlayerPlay = function(e) {
    var t = getAudioPlayer();
    if (t.isPlaying()) t.pause();
    else {
        var i = this.getPageCurrentPlaylist(),
            a = t.getCurrentPlaylist(),
            o = t.getCurrentAudio(),
            s = this._readyAudio ? this._readyAudio : o;
        if (s = s ? s : i.getAudioAt(0), AudioUtils.isClaimedAudio(s)) {
            s = AudioUtils.asObject(s);
            var r = AudioUtils.getAudioExtra(s),
                l = r.claim;
            return void showAudioClaimWarning(s.ownerId, s.id, l.deleteHash, l.id, s.title)
        }
        var n;
        i && -1 != i.indexOfAudio(s) ? n = i : a && -1 != a.indexOfAudio(s) ? n = a : (n = new AudioPlaylist(AudioPlaylist.TYPE_TEMP, vk.id), n.addAudio(s)), delete this._readyAudio, cur.audioStartReadyAudio = !0, t.play(s, n)
    }
}, AudioPage.prototype.promoClose = function(e) {
    cancelEvent(e), hide(this._els.promo), ajax.post("al_audio.php", {
        act: "vkmusic_hide_promo"
    })
};
try {
    stManager.done("audio.js")
} catch (e) {}