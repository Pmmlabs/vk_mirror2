function currentAudioPage(e) {
    var t = gpeByClass("_audio_page_layout", e);
    return t ? data(t, "audioPage") : !1
}

function AudioPage(e, t) {
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
    })), this._readyAudio = this._data.readyAudio;
    var i = this._data.readyPlaylist;
    i && (this._pagePlaylist = getAudioPlayer().getPlaylist(i.type, i.ownerId, i.id), this._pagePlaylist.mergeWith(i)), !this._readyAudio && this._pagePlaylist && (this._readyAudio = this._pagePlaylist.getAudioAt(0)), this._data.playlistCoverUploadOptions && (cur.audioCoverUploadOptions = cur.audioCoverUploadOptions || {}, cur.audioCoverUploadOptions[this._ownerId] = this._data.playlistCoverUploadOptions), this.isLayer() || (cur.module = "audio", this._ownerId == vk.id ? cur.submodule = "my" : this._ownerId < 0 ? cur.submodule = "group_list" : cur.submodule = "user_list"), this._initPlayer(), this._initPlaylists(), this.initNavigation(), this.showSection(t.initSection), this._initSearchParams(), this._els.searchInput.focus(), !this.isLayer() && nav.objLoc.q && (this._els.searchInput.value = nav.objLoc.q, this._showSearchSection(nav.objLoc)), this.updateCurrentPlayingInfo(), getAudioPlayer().setStatusExportInfo(this._data["export"]), this.updateStatusExportControls(), this._initKeyEvents(), window.onAudioPageLoaded && (window.onAudioPageLoaded.call(this), delete window.onAudioPageLoaded), this.updateShuffleButton()
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
}, AudioPage.prototype.canEditGroup = function() {
    return this._data.canEdit
}, AudioPage.prototype.updateCurrentPlayingInfo = function() {
    if (this.isLayer()) {
        var e = getAudioPlayer().getCurrentPlaylist(),
            t = e ? e.getTitle() : "";
        if (t) {
            var i = e.getOriginalPlaylistRawId();
            if (i || e.getType() == AudioPlaylist.TYPE_PLAYLIST && e.getAlbumId() > 0) {
                var a, o, s;
                i ? (i = i.split("_"), a = i[0], o = i[1], s = i[2] || "") : (a = e.getOwnerId(), o = e.getAlbumId(), s = e.getAccessHash() || "");
                var r = nav.toStr(extend({}, nav.objLoc, {
                    z: "audio_playlist" + a + "_" + o + (s ? "/" + s : "")
                }));
                t = '<a href="' + r + '" class="audio_page__footer_now_playing_link" onclick="if (checkEvent(event)) { return true } else { AudioUtils.showAudioPlaylist(' + a + ", " + o + ", '" + s + "'); return cancelEvent(event) }\">" + t + "</a>"
            }
            this._els.footerNowPlayingInfo.innerHTML = getLang("audio_current_playing_from").replace("{playlist}", t)
        } else this._els.footerNowPlayingInfo.innerHTML = "";
        this._els.footerClearNowPlayingButton.innerHTML = getLang("audio_clear_current_playlist"), toggle(this._els.footer, !!e)
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
                            if (0 == a && (t.length ? (show(this._els.searchSectionAudiosHeader), show(this._els.searchSectionAudios), o = this._ownerId == vk.id ? i.langs.audio_found_your_local : this._ownerId > 0 ? i.langs.audio_found_user_local : i.langs.audio_found_group_local, this._els.searchSectionAudiosHeader.innerHTML = langNumeric(t.length, o), toggleClass(this._els.searchSectionAudios, "audio_owner_list_canedit", !!this._data.canEdit)) : (hide(this._els.searchSectionAudiosHeader), hide(this._els.searchSectionAudios)), hide(this._els.searchGlobalCommunitiesPlace)), a == t.length) {
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
        }, l = !1) : (2 != Object.keys(e).length || e.q !== !1 || isUndefined(e[0])) && isUndefined(e[0]) ? (inArray(e.section, AudioPage.PageSections) || inArray(t.section, AudioPage.PageSections) && !inArray(e.section, AudioPage.PageSections)) && (this.isLayer() ? (l = !1, this._sectionData = {
            audio_id: e.audio_id
        }, r = "recoms", delete this._currentSection) : l = !0) : l = !0, l ? !0 : ("recoms" == r && this.isLayer() && this.resetSection("recoms"), i.q ? (a.fromSearch || (this._els.searchInput.value = i.q), this._showSearchSection(extend({}, i, a))) : (this._ignoreResetedSearch = e.q === !1, uiSearch.reset(this._els.searchInput, !0), this.showSection(r), this._switchTab(r)), this.isLayer() ? this._prevLoc = i : nav.setLoc(i), (a.back || a.hist || a.nav) && this.syncParametersUI(i), !1)
    }.bind(this)))
}, AudioPage.prototype._deleteDeletedAudios = function() {
    var e = AudioUtils.getAddRestoreInfo();
    each(e, function(e, t) {
        ("deleted" == t.state || "recom_hidden" == t.state) && getAudioPlayer().deleteAudioFromAllPlaylists(e)
    })
}, AudioPage.prototype._switchTab = function(e) {
    var t = geByClass1("_audio_section_tab__" + e, this._els.pageContainer);
    t ? uiTabs.switchTab(domFC(t)) : removeClass(geByClass1("ui_tab_sel", this._els.pageContainer), "ui_tab_sel")
}, AudioPage.prototype.onLayerHide = function() {
    this._deinitNavigation(), this._deinitKeyEvents(), this._onSectionOut(), delete this._currentSection, this._muteSearch = !0, uiSearch.reset(this._els.searchInput, !0)
}, AudioPage.prototype.updateLayerHeight = function() {
    var e = 700;
    e = Math.min(e, window.innerHeight - 150), e = Math.max(e, 400), isVisible(this._els.footer) && (e -= getSize(this._els.footer)[1]), setStyle(this._els.scrollWrap, {
        height: e
    })
}, AudioPage.prototype.onLayerShow = function(e) {
    var t = getAudioPlayer().getCurrentPlaylist();
    t ? this.showSection("current") : e ? this.showSection(e) : this.showSection("all"), toggleClass(geByClass1("_audio_section_tab__current", this._els.pageContainer), "unshown", !t), this.initNavigation(), this.updateCurrentPlayingInfo(), this._initKeyEvents(), this.updateLayerHeight(), this.updateShuffleButton();
    var i = this.getPageCurrentPlaylist(),
        a = getAudioPlayer().getCurrentAudio();
    if (this._audioRowsAutoList && i && a && i.indexOfAudio(a) >= 0)
        for (var o = 10; o--;) {
            var s = geByClass1(AudioUtils.AUDIO_CURRENT_CLS, this._audioRowsAutoList.getListEl());
            if (s) {
                var r = getXY(s)[1];
                this._scroll.scroller.scrollTop = r - scrollGetY() - 300;
                break
            }
            this._audioRowsAutoList.drawMore(), getAudioPlayer().updateCurrentPlaying()
        }
    this._scroll.update(), delete this._muteSearch
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
        }), hide(this._els.searchGlobalCommunitiesPlace), hide(this._els.searchGlobalAudiosBlock), toggle(this._els.recomsBlocks, "recoms" == e && !this.isLayer()), show(a), this._onSectionOut(), delete cur._back;
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
            var r = se('<div class="audio_section _audio_section _audio_section__' + e + " audio_section__" + e + ' clear_fix audio_w_covers">' + a + "</div>");
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
        this.isLayer() || (cur._back = {
            loc: "audios" + this.getOwnerId() + "?section=recoms",
            text: "Recoms"
        }), this._onSectionOut(function() {
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
        a.innerHTML = "", this._pagePlaylist = i, domData(gpeByClass("_audio_pl", a), "playlist-id", i.getId());
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
        audioRows: geByClass1("_audio_page__audio_rows_list", e),
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
    if (this._pagePlaylist = a, domData(this._els.audioRows, "playlist-id", a.getId()), uiSearch.init(geByClass1("_audio_friends_search", e)), !this._sortDD && !i) {
        var s = geByClass1("_audio_page__sort_dd", e);
        if (s && isVisible(s)) {
            var r = getLang("audio_sort_types").split("<br>");
            this._sortDD = new InlineDropdown(s, {
                items: [
                    [0, r[0]],
                    ["performer", r[1]],
                    ["random", r[2]],
                    ["reverse", r[3]]
                ],
                withArrow: !0,
                selected: 0,
                onSelect: this._onSortSelected.bind(this)
            })
        }
    }
    this._initAudioRowsAutoList(i), this._enableAudioRowsSorter(i), this._initFixedFriendsBlock(e)
}, AudioPage.prototype.getSortedList = function() {
    return this._sortedList
}, AudioPage.prototype._onSortSelected = function(e) {
    var t = this.getPageCurrentPlaylist();
    t.loadAll(function() {
        switch (e) {
            case 0:
                delete this._sortedList, this._enableAudioRowsSorter();
                break;
            case "performer":
                var i = [].concat(t.getUnshuffledAudiosList());
                i.sort(function(e, t) {
                    var i = trim(e[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER].toLowerCase()),
                        a = trim(t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER].toLowerCase());
                    return 0 == i.indexOf("the ") && (i = i.slice(4)), 0 == a.indexOf("the ") && (a = a.slice(4)), a > i ? -1 : i > a ? 1 : 0
                }), this._sortedList = i, this._disableAudioRowsSorter();
                break;
            case "random":
                this._sortedList = [].concat(t.getUnshuffledAudiosList()), shuffle(this._sortedList), this._disableAudioRowsSorter();
                break;
            case "reverse":
                this._sortedList = [].concat(t.getUnshuffledAudiosList()), this._sortedList.reverse(), this._disableAudioRowsSorter()
        }
        this._initAudioRowsAutoList()
    }.bind(this))
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
}, AudioPage.prototype.playPlaylist = function(e, t, i, a) {
    var o = getAudioPlayer(),
        s = o.getCurrentPlaylist(),
        r = o.getPlaylist(e, t, i);
    s && s.equals(r) && o.isPlaying() ? o.pause() : r.load(0, function() {
        o.play(r.getAudiosList()[0], r, a)
    })
}, AudioPage.prototype._enableAudioRowsSorter = function(e) {
    (this._data.audiosReorderHash || e) && (this._audioRowsSorter && this._audioRowsSorter.destroy(), this._audioRowsSorter = new GridSorter(this._els.audioRows, "", {
        wrapNode: this.isLayer() ? this._scroll.scroller : void 0,
        onReorder: function(t, i, a) {
            var o, s = domData(t, "full-id"),
                r = domData(a, "full-id"),
                l = e ? getAudioPlayer().getCurrentPlaylist() : this.getPageCurrentPlaylist(),
                n = l.indexOfAudio(s);
            r ? (o = l.indexOfAudio(r), o += 1) : o = 0, l.moveAudio(n, o), e || ajax.post("al_audio.php", {
                act: "reorder_audios",
                hash: this._data.audiosReorderHash,
                owner_id: this.getOwnerId(),
                audio_id: s ? s.split("_")[1] : 0,
                next_audio_id: r ? r.split("_")[1] : 0
            })
        }.bind(this)
    }), this._onSectionOut(function() {
        this._audioRowsSorter && this._audioRowsSorter.destroy()
    }.bind(this)))
}, AudioPage.prototype._disableAudioRowsSorter = function() {
    this._audioRowsSorter && this._audioRowsSorter.disable()
}, AudioPage.prototype._initAudioRowsAutoList = function(e) {
    var t = this._pagePlaylist;
    this._els.audioRows.innerHTML = "", toggleClass(this._els.audioRows, "audio_owner_list_canedit", !!this._data.canEdit), this._audioRowsAutoList && this._audioRowsAutoList.destroy(), this._audioRowsAutoList = new AutoList(this._els.audioRows, {
        scrollNode: this._scroll ? this._scroll.scroller : !1,
        onRendered: function() {
            getAudioPlayer().updateCurrentPlaying()
        },
        onNoMore: function() {
            hide(this._els.audioRowsMore)
        }.bind(this),
        onNeedRows: function(i, a, o, s, r) {
            var l = [];
            t.load(a, function() {
                var o = [];
                if (e) o = t.getAudiosList();
                else {
                    var s = this._sortDD ? this._sortDD.getSelected()[0] : !1;
                    o = s && this._sortedList ? this._sortedList : t.getUnshuffledAudiosList()
                }
                for (var n = a; a + 30 > n && o[n]; n++) l.push(AudioUtils.drawAudio(o[n]));
                i(l), 0 == a && this._audioRowsSorter && this._audioRowsSorter.update(), 0 == a && 1 == l.length && r.drawMore()
            }.bind(this))
        }.bind(this)
    }), this._onSectionOut(function() {
        this._audioRowsAutoList.destroy(), this._els.audioRows.innerHTML = ""
    }.bind(this))
}, AudioPage.showAttachBox = function(e, t) {
    vk.widget ? showBox("al_audio.php", {
        act: "choose_box",
        owner_id: e,
        options: JSON.stringify(t)
    }) : AudioPage.editPlaylist(e, AudioPlaylist.DEFAULT_PLAYLIST_ID, "attach", t)
}, AudioPage.editPlaylist = function(e, t, i, a) {
    if (vk.widget)
        for (var o in a) a.hasOwnProperty(o) && (isString(a[o]) ? a[o] = clean(a[o]) : isFunction(a[o]) ? delete a[o] : a[o] = intval(a[o]));
    "edit" == i && a && (a.audioAttachSwitchOwnerId = !1), a && a.audioAttachSwitchOwnerId && (cur.audioAttachSwitchOwnerId = a.audioAttachSwitchOwnerId), i = i || "edit";
    var s, r;
    if (t) s = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, e, t);
    else if (cur.audioPage) {
        var l = cur.audioPage._data.maxPlaylistsCount;
        if (isArray(cur.audioPage._data.playlists) && cur.audioPage._data.playlists.length >= l) {
            var n = langNumeric(l, cur.lang.audio_playlists_limit_error).replace("{limit}", l),
                d = new MessageBox({
                    title: getLang("global_error")
                });
            return void d.content(n).setButtons("Ok", function() {
                curBox().hide()
            }).show()
        }
    }
    show(boxLoader), show(boxLayerWrap), boxRefreshCoords(boxLoader), parallel(function(e) {
        stManager.add(["audio.css", "indexer.js", "auto_list.js", "grid_sorter.js", "edit" == i ? "upload.js" : !1], e)
    }, function(e) {
        s ? s.loadAll(e) : e()
    }, function(t) {
        cur.audioPage && cur.audioPage.getOwnerId() == e && (r = cur.audioPage.getOwnerPlaylists()), r ? t() : AudioPage.loadPlaylists(e, void 0, !1, "attach" == i, function(e) {
            r = e, t()
        })
    }, function() {
        AudioPage._openEditPlaylist(i, e, t, r, a)
    })
}, AudioPage._openEditPlaylist = function(e, t, i, a, o) {
    function s(e) {
        if (e = trim(e)) {
            var t = " " + (parseLatin(e) || "") + (parseCyr(e) || "");
            t = trim(t.replace(/\)/g, "").replace(/&/, "&amp;")), U = new RegExp("(\\s|^)(" + t.replace(vkIndexer.delimiter, "|").replace(/(^\||\|$|\?)/g, "") + ")", "gi")
        } else U = !1;
        g(R, "playlists" == O ? !1 : !0, e)
    }

    function r() {
        K.clean(), k.deletePlaylist(K), E && AudioUtils.showAudioPlaylist(E[0], E[1])
    }

    function l() {
        return trim(W.searchInput.value)
    }

    function n(t) {
        var i = K.indexOfAudio(t) >= 0 ? "ape_selected" : "";
        U && (t = clone(t), t[AudioUtils.AUDIO_ITEM_INDEX_TITLE] = t[AudioUtils.AUDIO_ITEM_INDEX_TITLE].replace(U, "$1<em>$2</em>"), t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] = t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER].replace(U, "$1<em>$2</em>"));
        var a = "";
        if ("edit" == e) a = '<div class="ape_check"><div class="ape_check_icon"></div></div>';
        else {
            var s = AudioUtils.asObject(t);
            if (o && o.wiki) {
                var r = "editorChooseAudio('" + s.performer + "', '" + s.title + "', " + s.duration + ", '" + s.fullId + "', '" + s.url + "', " + s.duration + ", this)";
                a = '<div class="ape_attach" onclick="' + r + '">' + o.audioPickerButtonText + "</div>"
            } else {
                s = clean(JSON.stringify(s));
                var l = clean(JSON.stringify(t));
                a = '<div class="ape_attach" onclick="cur.onChooseAudio(event, this, ' + s + ", " + l + ')">' + o.audioPickerButtonText + "</div>"
            }
        }
        return '<div class="ape_audio_item_wrap _ape_audio_item ' + i + '">' + a + AudioUtils.drawAudio(t) + "</div>"
    }

    function d() {
        clearTimeout(z), l() && (z = setTimeout(function() {
            z = !1;
            var e = l();
            if (e) {
                H = k.getPlaylist(AudioPlaylist.TYPE_SEARCH, vk.id, hashCode(e + "no conflict")), H.mergeWith({
                    searchParams: {
                        globalQuery: e
                    },
                    hasMore: !0
                }), D && D.destroy();
                var t = 0;
                x && (t = x.getOffset(), x.destroy()), x = new AutoList(W.list, {
                    scrollNode: W.list,
                    onNeedRows: function(e, i) {
                        i -= t, H.load(i, function() {
                            var t = [],
                                a = H.getAudiosList();
                            if (0 == i && a.length && t.push('<div class="ape_list_header">' + getLang("audio_edit_playlist_global_results") + "<div>"), a.length)
                                for (var o = Math.min(a.length, i + 20), s = i; o > s; s++) t.push(n(a[s]));
                            e(t)
                        })
                    }
                }), x.drawMore()
            }
        }, 300), M = null)
    }

    function u() {
        V.setOptions({
            title: '<div class="back _back">' + getLang("global_back") + "</div>",
            bodyStyle: "padding: 0"
        })
    }

    function _() {
        var e = "";
        cur.audioAttachSwitchOwnerId && (e = '<span class="dvd"></span><a class="tab_link" onclick="cur.audioAttachSwitch()">', K.getOwnerId() == vk.id ? (e += getLang("audio_choose_wall_to_group_audios"), cur.audioAttachSwitch = function() {
            AudioPage.showAttachBox(cur.audioAttachSwitchOwnerId, o)
        }) : (e += getLang("audio_choose_wall_to_my_audios"), cur.audioAttachSwitch = function() {
            AudioPage.showAttachBox(vk.id, o)
        }), e += "</a>"), V.setOptions({
            title: G + e,
            bodyStyle: "padding: 0"
        })
    }

    function c() {
        switch (O) {
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
        R = e, t ? i ? e.search({
            q: i
        }, function(e) {
            p(!0, e, i)
        }) : p(!0, e.getUnshuffledAudiosList()) : i ? p(!1, F.search(i), i) : p(!1, a), y("initial" != O || i ? !1 : !0)
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
        I || (I = new GridSorter(W.list, "ape_audio_item_wrap", {
            wrapNode: W.list,
            onReorder: function(e, t) {
                var i, a = domData(geByClass1("_audio_row", e), "full-id"),
                    o = K.indexOfAudio(a);
                t ? (a = domData(geByClass1("_audio_row", t), "full-id"), i = K.indexOfAudio(a)) : i = K.getAudiosCount(), K.moveAudio(o, i)
            }
        })), e ? I.enable() : I.disable()
    }

    function f(i, o) {
        switch (O = i, A(), domData(W.list, "view", i), i) {
            case "initial":
                show(W.header), hide(W.addAudiosFromPlaylistsButton), show(W.addAudiosButton), show(W.search), hide(W.globalResults), g(K, !0), v(o), _();
                break;
            case "default":
                var s = k.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, t, AudioPlaylist.DEFAULT_PLAYLIST_ID);
                disableEl(W.addAudiosButton), showProgress(W.addAudiosButton), s.load(function() {
                    enableEl(W.addAudiosButton), hideProgress(W.addAudiosButton), hide(W.header), show(W.search), toggle(W.addAudiosFromPlaylistsButton, Y), hide(W.addAudiosButton), "edit" == e ? u() : _(), g(s, !0), h(), "edit" == e && v(o)
                });
                break;
            case "playlists":
                hide(W.header), show(W.search), hide(W.addAudiosFromPlaylistsButton),
                    hide(W.addAudiosButton), hide(W.globalResults), u(), g(a);
                break;
            case "playlist":
                hide(W.header), show(W.search), hide(W.addAudiosFromPlaylistsButton), hide(W.addAudiosButton), u(), g(o, !0), "attach" == e && P(o), "edit" == e && v(o)
        }
        h(), W.searchInput.value = "", elfocus(W.searchInput), U = !1, M = null, clearTimeout(z), k.updateCurrentPlaying()
    }

    function A() {
        V.removeButtons()
    }

    function P(e) {
        function t(t) {
            cur.onChoosePlaylist(t, e)
        }
        o.canPlaylistAttach && V.addButton(o.playlistPickerButtonText, t, "ok", !0)
    }

    function v() {
        V.addButton(getLang("audio_save_playlist_button"), m, "ok", !0)
    }

    function w(e) {
        function t(e, t) {
            var i = toggleClass(e, "ape_selected", t),
                a = geByClass1("_audio_row", e),
                o = AudioUtils.getAudioFromEl(a);
            i ? K.addAudio(o, 0) : K.removeAudio(o)
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
            if (e.shiftKey && M) {
                var n = domChildIndex(M),
                    d = domChildIndex(l),
                    u = domPN(l);
                if (n > d) {
                    var _ = d;
                    d = n, n = _
                }
                for (var c = hasClass(M, "ape_selected"), h = n; d >= h; h++) t(u.children[h], c)
            } else t(l), M = l;
            C()
        }
        return cancelEvent(e)
    }

    function C() {
        var e, t = K.getAudiosCount(),
            i = K.getTotalDuration();
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

    function m(e) {
        var i = trim(val(W.playlistNameInput)),
            a = trim(val(W.playlistDescriptionInput));
        if (!i) return f("initial"), void notaBene(ge("ape_pl_name"));
        var s = [];
        each(K.getUnshuffledAudiosList(), function(e, t) {
            s.push(t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[AudioUtils.AUDIO_ITEM_INDEX_ID])
        });
        var r = o.newPlaylistHash || cur.audioPage && cur.audioPage._data.newPlaylistHash || "";
        ajax.post("al_audio.php", {
            act: "save_playlist",
            hash: T ? r : j.getEditHash(),
            owner_id: t,
            playlist_id: T ? 0 : j.getPlaylistId(),
            title: i,
            description: a,
            Audios: s.join(","),
            cover: isObject(N) ? JSON.stringify(N) : N
        }, {
            showProgress: lockButton.bind(this, e),
            onDone: function(e, i) {
                if (each(geByClass("_audio_pl_" + e.ownerId + "_" + e.id), function() {
                        var t = geByClass1("audio_pl__cover", this);
                        if (t) {
                            setStyle(t, "background-image", e.coverUrl ? "url(" + e.coverUrl + ")" : null), setStyle(t, "background-size", e.coverUrl ? "cover" : null);
                            var i = geByClass1("_audio_pl_grid_covers_wrap", this);
                            i && (i.innerHTML = e.coverUrl ? "" : e.gridCovers)
                        }
                        var a = geByClass1("audio_pl__title", this);
                        a && val(a, e.title);
                        var o = geByClass1("_audio_pl__stats_count", this);
                        o && (o.innerHTML = e.totalCount)
                    }), T && cur.audioPage && t == cur.audioPage.getOwnerId() && (each(geByClass("_audio_page_block__playlists_items", cur.audioPage._els.pageContainer), function() {
                        var e = se(getTemplate("audio_pl_item", i)),
                            t = this;
                        t.insertBefore(e, t.firstChild);
                        var a = intval(domData(t, "max-items"));
                        a && t.children.length > a && t.removeChild(t.lastChild), show(gpeByClass("_audio_page__playlists", t))
                    }), cur.audioPage._data.playlists = cur.audioPage._data.playlists || [], cur.audioPage._data.playlists.unshift(i)), cur.audioPage && t == cur.audioPage.getOwnerId()) {
                    var a = geByClass1("_audio_page__playlists_count_header", cur.audioPage._els.pageContainer);
                    a && (a.innerHTML = langNumeric(cur.audioPage._data.playlists.length, cur.lang.audio_playlists_count_title), removeClass(gpeByClass("_audio_page_section_layout", a), "audio_section_empty"))
                }
                j && (j.clean(), j.mergeWith(e)), V.hide()
            }
        })
    }

    function S(e) {
        show(W.coverThumb), setStyle(W.coverThumb, "background-image", "url(" + e + ")"), addClass(W.uploadCoverButton, "ape_thumb_set")
    }

    function b() {
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
                        t = JSON.parse(t), t.error ? (show(W.errorMsg), h()) : (hide(W.errorMsg), N = t, S(N.url), h()), hide(geByClass1("_ape_cover_progress"))
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
            Upload.init(W.uploadCoverButton, e.url, e.vars, i), addEvent(geByClass1("_ape_cover_delete"), "click", L), addEvent(W.uploadCoverButton, "click", function() {
                (!isObject(N) || isVisible(geByClass1("_ape_cover_progress"))) && geByTag1("input", this).click()
            }), W.coverThumb = geByClass1("_ape_cover_thumb")
        }
    }

    function L(e) {
        return removeClass(W.uploadCoverButton, "ape_thumb_set"), hide(geByClass1("_ape_cover_thumb")), N = -1, cancelEvent(e)
    }

    function B() {
        var t = window.innerHeight,
            i = 800,
            a = 500,
            o = 200;
        setStyle(W.boxContent, "height", Math.min(i, Math.max(t - o, a))), addEvent(W.addAudiosFromPlaylistsButton, "click", f.bind(this, "playlists")), addEvent(W.addAudiosButton, "click", f.bind(this, "default")), addEvent(W.list, "click", w), "attach" == e && domData(W.list, "audio-context", "attach"), addEvent(V.titleWrap, "click", function(e) {
            hasClass(e.target, "_back") && c()
        }), uiSearch.init("ape_edit_playlist_search", {
            onChange: s
        }), "edit" == e && (f("initial"), C(), b(), K.getCoverUrl() && S(K.getCoverUrl()), autosizeSetup(W.playlistDescriptionInput, {
            minHeight: 30,
            maxHeight: 150,
            onResize: h
        }), W.playlistNameInput.value = replaceEntities(K.getTitle()), W.playlistDescriptionInput.value = replaceEntities(K.getRawDescription().replace(/<br>/g, "\n"))), "attach" == e && f("default"), _(), j && "attach" != e && V.setControlsText('<a onclick="AudioPage.deletePlaylist(' + j.getOwnerId() + ", " + j.getPlaylistId() + ", '" + j.getEditHash() + "')\">" + getLang("audio_delete_playlist") + "</a>")
    }
    hide(boxLoader), curBox() || hide(boxLayerWrap);
    var E;
    cur.apLayer && (E = cur.apLayerPlaylistId, layers.fullhide()), o = extend({
        audioPickerButtonText: getLang("global_add_media"),
        playlistPickerButtonText: getLang("audio_attach_playlist_button"),
        canPlaylistAttach: !1,
        onAudioChoose: AudioUtils.onAudioChoose,
        onPlaylistChoose: AudioUtils.onPlaylistChoose
    }, o), cur.onChooseAudio = o.onAudioChoose, cur.onChoosePlaylist = o.onPlaylistChoose;
    var I, T = !i || i == AudioPlaylist.DEFAULT_PLAYLIST_ID,
        k = getAudioPlayer(),
        x = !1,
        D = !1,
        O = !1,
        R = !1,
        H = !1,
        U = !1,
        N = 0,
        M = null;
    a = a.filter(function(e) {
        return e.id !== AudioPlaylist.DEFAULT_PLAYLIST_ID && e.size > 0
    });
    var F = new vkIndexer(a, function(e) {
            return e.title
        }),
        Y = a.length > 0,
        j = !1,
        K = k.getPlaylist(AudioPlaylist.TYPE_TEMP, t, irand(0, 999999));
    T && "attach" != e ? o.addAudio && K.addAudio(o.addAudio) : (j = k.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, t, i), K.addAudio(j.getUnshuffledAudiosList()), K.mergeWith({
        title: j.getTitle(),
        description: j.getDescription(),
        rawDescription: j.getRawDescription(),
        coverUrl: j.getCoverUrl(),
        editHash: j.getEditHash()
    }));
    var G;
    if (G = "attach" == e ? getLang("audio_choose_audio_title") : i ? getLang("audio_edit_playlist_title") : getLang("audio_new_playlist_title"), window.box && vk.widget) {
        var V = window.box;
        V.setOptions({
            title: G,
            bodyStyle: "padding: 0",
            width: 560,
            onBeforeHide: r,
            hideButtons: !0
        })
    } else {
        cur.audioChooseBox && cur.audioChooseBox == curBox() && curBox().hide();
        var V = new MessageBox({
            title: G,
            bodyStyle: "padding: 0",
            width: 560,
            onBeforeHide: r
        });
        cur.audioChooseBox = V
    }
    V.content(getTemplate("audio_edit_playlist")), V.show();
    var W = {
        boxContent: geByClass1("_audio_pl_edit_box", V.bodyNode),
        playlistNameInput: ge("ape_pl_name"),
        playlistDescriptionInput: ge("ape_pl_description"),
        stat: geByClass1("_ape_pl_stat"),
        uploadCoverButton: geByClass1("_ape_cover", V.bodyNode),
        uploadCoverInput: geByClass1("_ape_cover_upload", V.bodyNode),
        errorMsg: geByClass1("_ape_error_msg", V.bodyNode),
        header: geByClass1("_ape_header", V.bodyNode),
        search: geByClass1("_ape_search", V.bodyNode),
        searchInput: geByClass1("_field", V.bodyNode),
        addAudiosButton: ge("ape_add_audios_btn"),
        addAudiosFromPlaylistsButton: ge("ape_add_audios_from_playlists_btn"),
        listWrap: geByClass1("_ape_list_wrap", V.bodyNode),
        list: geByClass1("_ape_item_list", V.bodyNode),
        globalResults: geByClass1("_ape_item_global_results", V.bodyNode),
        globalResultsList: geByClass1("_ape_item_global_list", V.bodyNode),
        emptyPlaceholder: geByClass1("_ape_audios_empty_list", V.bodyNode)
    };
    B(V.bodyNode);
    var z = 0
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
    this._deinitKeyEvents();
    var t = this,
        i = getAudioPlayer();
    addEvent(window.document, "mousedown", this._audioHQKeyEventHandler4 = function(e) {
        e.ctrlKey && (cur.ctrlMouseDown = !0, cur.ctrlPressed = !1)
    }, !0), addEvent(window.document, "keydown", this._audioHQKeyEventHandler1 = function(t) {
        e() || (cur.ctrlPressed = t.keyCode == KEY.CTRL)
    }), addEvent(window.document, "keyup", this._audioHQKeyEventHandler2 = function(t) {
        e() || (t.keyCode != KEY.CTRL || cur.ctrlMouseDown) && (delete cur.ctrlMouseDown, delete cur.ctrlPressed)
    }), addEvent(window.document, "keydown", this._audioSeekKeyEventHandler = function(t) {
        t.target && (inArray(t.target.tagName.toLowerCase(), ["input", "textarea"]) && "" != val(t.target) || hasClass(t.target, "fc_editable")) || i.isPlaying() && inArray(t.keyCode, [KEY.RIGHT, KEY.LEFT]) && !t.ctrlKey && (e() || i.seekCurrentAudio(t.keyCode == KEY.RIGHT))
    }), cur.destroy.push(function() {
        this._deinitKeyEvents()
    }.bind(this))
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
}, AudioPage.prototype.onHide = function() {
    var e = this;
    cur.nav = cur.nav.filter(function(t) {
        return e._nav_func != t
    }), this._deinitKeyEvents()
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
}, AudioPage.prototype.restoreRecommendation = function(e) {
    var t = AudioUtils.getAudioFromEl(e, !0),
        i = AudioUtils.getAudioExtra(t).recom,
        a = {
            act: "restore_recommendation",
            hash: i.hash,
            audio_id: t.fullId
        };
    nav.objLoc.audio_id && (a.recommendation_type = "query"), nav.objLoc.album_id && (a.recommendation_type = "album"), ajax.post("al_audio.php", a), removeClass(e, "audio_row__deleted");
    var o = AudioUtils.getAddRestoreInfo(),
        s = o[t.fullId].removedCurrentPos,
        r = getAudioPlayer().getCurrentPlaylist();
    s >= 0 && r && r.getType() == AudioPlaylist.TYPE_RECOM && r.addAudio(AudioUtils.getAudioFromEl(e), s), delete o[t.fullId], AudioUtils.onRowOver(e, !1, !0)
}, AudioPage.isInRecentPlayed = function(e) {
    var t = gpeByClass("_audio_playlist", e);
    return t && hasClass(t, "audio_recent_rows") ? data(t, "playlist") : !1
}, AudioPage.prototype.chooseFromMyAudios = function(e) {
    var t = this;
    AudioPage.editPlaylist(vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID, "attach", {
        audioPickerButtonText: getLang("global_add"),
        playlistPickerButtonText: getLang("global_add"),
        onAudioChoose: function(i, a, o) {
            var s = i.ctrlKey;
            if (ajax.post("al_audio.php", {
                    act: "add",
                    group_id: e,
                    audio_owner_id: o.ownerId,
                    audio_id: o.id,
                    hash: o.addHash
                }, {
                    onDone: function(i) {
                        var a = e ? -e : vk.id;
                        if (i) {
                            var o = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, a, AudioPlaylist.DEFAULT_PLAYLIST_ID);
                            o.addAudio(i, 0), t._initAudioRowsAutoList()
                        }
                    }
                }), s) a.innerHTML = getLang("audio_choose_added"), addClass(a, "ape_added");
            else if (__bq)
                for (; __bq.count();) __bq.hideLast()
        }
    })
}, AudioPage.prototype.toggleAudioDurationType = function() {
    this.ap.toggleDurationType()
}, AudioPage.prototype.updateShuffleButton = function() {
    var e = getAudioPlayer().getCurrentPlaylist() || this._pagePlaylist;
    if (e) {
        var t = e.isShuffled() && !e.isInitedSortedList();
        toggleClass(geByClass1("_audio_page_player_shuffle", this._els.pageContainer), "audio_page_player_btn_enabled", t), this.isLayer() && cur.audioPage && cur.audioPage.updateShuffleButton()
    }
}, AudioPage.prototype.toggleRepeat = function(e) {
    var t = getAudioPlayer(),
        i = toggleClass(e, "audio_page_player_btn_enabled");
    if (t.toggleRepeatCurrentAudio(i), this.isLayer() && cur.audioPage) {
        var a = geByClass1("_audio_page_player_repeat", cur.audioPage._els.pageContainer);
        a && toggleClass(a, "audio_page_player_btn_enabled", i)
    }
}, AudioPage.prototype.toggleShuffle = function(e) {
    toggleClass(e, "audio_page_player_btn_enabled");
    var t = getAudioPlayer().getCurrentPlaylist() || this._pagePlaylist;
    t.loadAll(function() {
        t.isShuffled() && t.isInitedSortedList() ? (t.shuffle(0), t.shuffle(irand(1, 999999))) : t.isShuffled() ? t.shuffle(0) : t.shuffle(irand(1, 999999)), "current" == this._currentSection && this._initAudioRowsAutoList(!0);
        var e = getAudioPlayer().getCurrentAudio() || t.getAudioAt(0);
        getAudioPlayer().play(e, t), this.updateShuffleButton()
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
            o = se('<div class="audio_friends_list _audio_friends_list" style="">' + e + "</div>");
        i && (this._shownFriends = []), domPN(a).appendChild(o), re(a)
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
}, AudioPage.prototype.shareAudio = function() {
    var e = e || getAudioPlayer().getCurrentAudio() || this._readyAudio;
    AudioUtils.shareAudio(!1, e)
}, AudioPage.prototype.showStatusTooltip = function(e) {
    this.statusTT || (this.statusTT = !0, ajax.post("al_audio.php", {
        act: "status_tt"
    }, {
        onDone: function(t, i) {
            this.statusTT = new ElementTooltip(e, {
                content: i,
                width: 250,
                offset: [1, 14],
                rightShift: this.isLayer() ? 45 : 80,
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
}, AudioPage.prototype.destroy = function() {
    this._trackSlider.destroy(), this._volumeSlider.destroy(), removeEvent(window, "scroll", this._ev_onScroll)
}, AudioPage.prototype.getPageCurrentPlaylist = function() {
    return this._pagePlaylist
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
        s.isAdPlaying() ? (d.innerHTML = getLang("global_audio_ad"), u.innerHTML = "") : (e = AudioUtils.asObject(e), d.innerHTML = e.performer, u.innerHTML = "&nbsp;&ndash;&nbsp;" + e.title, e.coverUrl_p ? (setStyle(c, "background-image", "url(" + e.coverUrl_p + ")"), setStyle(c, "background-size", "cover")) : (setStyle(c, "background-image", null), setStyle(c, "background-size", "")), toggleClass(l, "audio_title_long_performer", e.isLongPerformer), !o.isLayer() && s.getCurrentAudio() && AudioUtils.asObject(s.getCurrentAudio()).fullId == e.fullId && (document.title = replaceEntities(stripHTML(e.performer + " - " + e.title)), clearTimeout(window.pageSetTitleTimer)))
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
            delete o._readyAudio, data(l, "audio", e), a(), t(e), addClass(h, "audio_playing"), s && !cur.audioStartReadyAudio && (o._trackSlider.setBackValue(0), _.innerHTML = i(0, AudioUtils.asObject(e).duration), n.setAttribute("title", ""), n.titleSet = !1), g.innerHTML = getLang("global_audio_pause"), o.updateCurrentPlayingInfo(), o.updateShuffleButton()
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