var slide_show = function(elem) {
    if (!isVisible(elem)) slideDown(elem, 150);
};

var slide_hide = function(elem) {
    if (isVisible(elem)) slideUp(elem, 150);
};


var searcher = {
        getSectionParams: function(section) {
            var form = ge('filter_form'),
                params = {};
            if (!form || section && section != cur.section || cur.section == 'quick') {
                params = {
                    'c[section]': section || cur.section
                };
            } else {
                params = serializeForm(form) || {};
            }
            params['c[q]'] = val('search_query');
            for (var i in params) {
                if (!params[i] || params[i] == '0') delete params[i];
                if (params[i] == '-1' && params[i + '_custom']) {
                    params[i] = params[i + '_custom'];
                    delete params[i + '_custom'];
                } else if (params[i + '_custom']) {
                    delete params[i + '_custom'];
                }
            }
            if (cur.section == 'video' && !params['c[sort]']) {
                params['c[sort]'] = '0';
            }
            if (cur.section == 'people' && ge('photo') && !params['c[photo]']) {
                params['c[photo]'] = '0';
            }
            if (cur.section == 'people' && params['c[invite]']) {
                delete params['from'];
            }
            if (cur.section == 'communities' && cur.filtersShown && !params['c[q]'] && !params['c[category]']) {
                params['c[skip_catalog]'] = '1';
            }
            return params;
        },
        sameParams: function(params) {
            if (!cur.params) return false;
            for (var i in params) {
                if (params[i] != cur.params[i]) return false;
            }
            for (var i in cur.params) {
                if (params[i] != cur.params[i]) return false;
            }
            return true;
        },
        switchSection: function(newSection, opts, event) {
            if (event && checkEvent(event)) return true;

            removeSearchPositionTracker('search_video');
            removeSearchPositionTracker('search_audio');
            removeSearchPositionTracker('friends_find');
            removeSearchPositionTracker('search_people');
            removeSearchPositionTracker('search_communities');
            removeSearchPositionTracker('search_auto');

            opts = opts || {};
            if (newSection == 'communities') {
                val('c[category]', 0);
                cur.filtersShown = false;
            }
            var params = searcher.getSectionParams(newSection);
            if (newSection != 'auto' && newSection != 'quick' && opts.updateStats) {
                params.swt = 1;
            }
            if (opts.tab) {
                params.tab = 1;
            }
            if (ge('search_menu') && uiRightMenu) {
                var menuEl = geByClass1('search_menu_' + newSection, 'search_menu');
                menuEl && uiRightMenu.switchMenu(menuEl);
            }
            searcher.setSection(newSection);
            searcher.sendSearchReq(params, true);
            if (hasClass(gpeByClass('ui_search', 'search_query'), 'ui_search_fixed')) {
                scrollToTop();
            }
            return false;
        },
        switchAudioTop: function(rec) {
            cur.useRec = rec;
            cur.audioTop = rec;
            return this.switchSection('audio');
        },
        showMedia: function(section, el, event) {
            if (event && checkEvent(event)) return false;
            hide(geByClass1('label', el));
            show(geByClass1('progress', el));
            cur.loadingMedia = true;
            return searcher.switchSection(section, {
                updateStats: true
            }, event);
        },
        updResults: function() {
            if (cur.customSearchChange) {
                cur.customSearchChange();
                return false;
            }
            var params = searcher.getSectionParams();
            if (searcher.sameParams(params) || params['c[section]'] == 'video' && !params['c[q]'] && !nav.objLoc['c[q]']) return false;
            if (cur.onSearchChange) {
                cur.onSearchChange(params);
            }
            searcher.sendSearchReq(params, (cur.section == 'auto' || cur.section == 'audio' && params['c[q]'] && !ge('audio_lyrics_filter') || cur.section == 'audio' && !params['c[q]'] && ge('audio_lyrics_filter')) && !params.offset);
            if (hasClass(gpeByClass('ui_search', 'search_query'), 'ui_search_fixed')) {
                scrollToTop();
            }
        },
        onInputChange: function(e) {
            clearTimeout(cur.requestTimeout);
            if (e && (e.type != 'keydown' || e.keyCode == 13)) {
                searcher.updResults();
            } else {
                cur.requestTimeout = setTimeout(function() {
                    searcher.updResults()
                }, 1000);
            }
        },
        onKey: function() {
            if (cur.section != 'quick') return;
            clearTimeout(cur.requestTimeout);
            cur.requestTimeout = setTimeout(function() {
                searcher.updResults()
            }, 300);
        },
        onEnter: function(searchEl, q) {
            if (window.iSearch && iSearch.select && iSearch.select.isVisible() && iSearch.select.active > -1) {
                return;
            }
            clearTimeout(cur.requestTimeout);
            searcher.updResults();
            searcher.highlightHotHashtag(q);
        },
        checkbox: function(el, name, viceVersa, noUpdate) {
            checkbox(el);
            var chk = isChecked(el) ? 1 : 0;
            if (viceVersa) chk = 1 - chk;
            val(name, chk);
            if (!noUpdate) {
                searcher.updResults();
            }
        },
        sendSearchReq: function(params, changeSection) {
            if (cur.searchReq) {
                try {
                    cur.searchReq.abort();
                } catch (e) {
                    debugLog(e);
                }
            }
            if (changeSection && !params.offset) {
                vk.no_ads = inArray(params['c[section]'], ['audio']);
                extend(params, {
                    uf: 1
                });
            }
            if (cur.useRec !== undefined) {
                params.rec = cur.useRec;
                delete cur.useRec;
            }
            params.edit = nav.objLoc.edit;
            params.sign = nav.objLoc.sign;
            params.all = nav.objLoc.all;
            params.change = 1;
            if (cur.searchLoc) {
                params.search_loc = cur.searchLoc;
            }
            if (cur.topType !== undefined) {
                params.type = cur.topType;
                delete cur.topType;
            }
            if (window.iSearch && iSearch.select) {
                iSearch.select.hide();
                delete cur.setISearch;
            }
            if (!cur.loadingMedia) {
                uiSearch.showProgress('search_query');
                ge('search_query').ignoreFixed = (params['c[section]'] == 'statuses');
            }

            var ts = +new Date();
            cur.searchReq = ajax.post('al_search.php', params, {
                onDone: function(options, rows, filters) {
                    var res = (params.uf && ge('results_wrap')) ? ge('results_wrap') : ge('results'),
                        filters_el = ge('friends_filters_block') ? ge('friends_filters_block') : ge('filter_form');
                    res.innerHTML = rows || '';
                    if (changeSection) {
                        filters_el.innerHTML = filters || '';
                        elfocus('search_query');
                        if (options.loc) {
                            var currentURL = locProtocol + '//' + location.host + '/' + options.loc;
                            var referrer = (document.URL == currentURL) ? '' : document.URL;
                            setTimeout(updateOtherCounters.pbind(currentURL, referrer), 10);
                        }
                    }
                    searcher.applyOptions(options, changeSection);
                    uiSearch.hideProgress('search_query');
                    show('search_clear_params');
                    var _a = window.audioPlayer;
                    if (_a && _a.showCurrentTrack) _a.showCurrentTrack();
                    if (cur.onSearchFinish) {
                        cur.onSearchFinish();
                    }
                    shortCurrency();
                    setTimeout(checkPageBlocks, 200);
                    cur.onSearchDone && cur.onSearchDone();
                    saveSearchAttemptStats(cur.module === 'friends' ? 'friends_find' : 'search_' + cur.section, ts, !isVisible(ge('no_results')), params['c[q]']);
                },
                onFail: function() {
                    uiSearch.hideProgress('search_query');
                    return true;
                },
                showProgress: function() {
                    addClass(ge('filter_' + cur.section), 'loading');
                    cur.isSearchLoading = true;
                },
                hideProgress: function() {
                    removeClass(ge('filter_' + cur.section), 'loading');
                    cur.isSearchLoading = false;
                    cur.loadingMedia = false;
                },
                ads: !!(changeSection && !params.offset)
            });
        },
        setSection: function(newSection) {
            if (newSection == cur.section || newSection == 'auto' || !newSection) return;
            cur.section = newSection;
        },
        applyOptions: function(options, changeSection) {
            iSearch.initSelect();
            searcher.setSection(options.section);
            if (options.reply_names) {
                extend(cur.options.reply_names, options.reply_names);
                delete options.reply_names;
            }
            extend(cur, options);
            cur.params = searcher.getSectionParams();
            var header = ge('search_header');
            if (options.tabs) {
                val('search_tabs_wrap', options.tabs);
                hide(header);
                show('search_tabs_wrap');
            } else if (options.title) {
                var header_inner = geByClass1('_header_inner', header);
                val(header_inner, options.title);
                if (options.summary) {
                    header_inner.appendChild(ce('span', {
                        'className': 'page_block_header_count',
                        innerHTML: langNumeric(options.summary, '%s', true)
                    }));
                }
                hide('search_tabs_wrap');
                show(header);
            }
            if (options.controls != undefined) {
                val(geByClass1('_header_extra', header), options.controls || '');
            }
            if (options.auto_rows !== undefined && ge('search_auto_rows')) {
                ge('search_auto_rows').innerHTML = options.auto_rows || '';
            }
            clearTimeout(cur.setLocTO);
            if (options.loc) {
                if (changeSection) {
                    try {
                        nav.setLoc(options.loc);
                    } catch (e) {
                        debugLog(e);
                    }
                } else {
                    cur.setLocTO = setTimeout(function() {
                        if (nav.objLoc[0] != 'search' && nav.objLoc[0] != 'communities' && nav.objLoc[0] != 'brands' && !nav.objLoc[0].match(/^people($|\/)/) && !cur.searchLoc) return;
                        try {
                            nav.setLoc(options.loc);
                        } catch (e) {
                            debugLog(e);
                        }
                    }, 100);
                }
            }
            if (options.htitle) {
                setDocumentTitle(replaceEntities(stripHTML(options.htitle)));
            }
            if (options.q !== undefined) {
                val('search_query', replaceEntities(stripHTML(options.q)) || '');
                var reset_el = ge('search_clear_params');
                if (reset_el) {
                    show(reset_el);
                }
            }
            if (cur.uiSort && options.sortHide !== undefined) {
                if (options.sortHide) {
                    cur.uiSort.selectItem(0, false);
                }
                cur.uiSort.disable(options.sortHide);
            }
            if (cur.section == 'auto') {
                show(geByClass1('search_menu_auto', 'search_menu'));
            }
            if (options.script) {
                eval(options.script);
            }
            var res = ge('results'),
                sc = ge('search_content'),
                lighted = hasClass(sc, 'highlight');
            res.className = 'search_results search_' + cur.section + '_results' + (cur.section == 'statuses' || cur.section == 'auto' ? ' wall_module' : '') + ((cur.section != 'statuses' || options.summary === '') && !gpeByClass('page_block', res) ? ' page_block' : '') + ' mark_top_verified';
            if (cur.section === 'audio') {
                res.className += ' audio_w_covers';
            }
            if (lighted) addClass(sc, 'highlight')
            var more_results = ge('search_more_results');
            if (cur.has_more || more_results && more_results.firstChild) {
                hide('seach_pages');
                show('ui_search_load_more');
            } else {
                hide('ui_search_load_more')
            }
        },
        selectHotHashtag: function(el) {
            var q = val(el),
                searchInput = ge('search_query'),
                onEnter = (data(searchInput, 'opts') || {}).onEnter;

            val(searchInput, q);
            if (onEnter) {
                onEnter(searchInput, q);
            }

            statlogsValueEvent('top_hashtag_search', 0, 'click');
            return false;
        },
        highlightHotHashtag: function(q) {
            q = q ? q.toLowerCase() : '';
            var isHot = false;
            var hashtags = geByClass('search_hot_hashtags_item', 'search_hot_hashtags');

            each(hashtags, function(i, item) {
                if (val(item).toLowerCase() == q) {
                    isHot = true;
                    addClass(item, 'search_hot_hashtags_item_active');
                } else {
                    removeClass(item, 'search_hot_hashtags_item_active');
                }
            });
            return isHot;
        },
        toggleFilter: function(obj, target, afterToggle) {
            if (hasClass(obj, 'search_filter_shut') || !isVisible(target)) {
                addClass(obj, 'search_filter_open');
                removeClass(obj, 'search_filter_shut');
                slideDown(target, 200, function() {
                    checkPageBlocks();
                    if (afterToggle) {
                        afterToggle();
                    }
                });
            } else {
                slideUp(target, 200, function() {
                    addClass(obj, 'search_filter_shut');
                    removeClass(obj, 'search_filter_open');
                    if (afterToggle) {
                        afterToggle();
                    }
                });
            }
        },
        switchFilter: function(param, value, event) {
            if (checkEvent(event)) return false;
            if (ge('c[' + param + ']')) ge('c[' + param + ']').value = value;
            if (cur.section == 'video' && param == 'quality') {
                if (ge('c[hd]')) ge('c[hd]').value = value < 0 ? 0 : 1;
            }
            searcher.updResults();
        },
        appendElements: function(from) {
            if (!from) return;
            while (from.firstChild) {
                from.parentNode.insertBefore(from.firstChild, from);
            }
            re(from);
        },
        showMore: function() {
            var show_more_link = ge('ui_search_load_more'),
                nextRows = ge('search_more_results');
            if (!show_more_link || !isVisible(show_more_link) || cur.isSearchLoading) {
                if (nextRows) {
                    searcher.appendElements(nextRows);
                }
                return;
            }
            if (nextRows) {
                searcher.appendElements(nextRows);
            }
            if (!cur.has_more) {
                hide(show_more_link);
                return;
            }
            cur.disableAutoMore = false;
            cur.isSearchLoading = true;
            lockButton(show_more_link);
            var params = searcher.getSectionParams();
            params.offset = cur.offset;
            params.qid = cur.qid;
            params.edit = nav.objLoc.edit;
            params.sign = nav.objLoc.sign;
            params.all = nav.objLoc.all;
            ajax.post('al_search.php', params, {
                onDone: function(options, rows) {
                    cur.isSearchLoading = false;
                    if (rows) {
                        if (ge('no_results')) re('no_results');
                        ge('results').insertBefore(ce('div', {
                            innerHTML: rows,
                            id: 'search_more_results'
                        }), show_more_link);
                    }
                    unlockButton(show_more_link);
                    searcher.applyOptions(options);
                    searcher.scrollCheck();
                },
                cache: (params['c[section]'] == 'audio' && !params['c[q]']) ? 0 : 1
            });
        },
        close: function() {
            return nav.go(cur.search_return_to, {}, {
                back: true
            });
        },
        toggleMinimizedFilters: function(minEl, s, fromUpdate) {
            var filtersEl = minEl && domNS(minEl),
                to = fromUpdate ? 0 : 200;
            if (s === undefined) {
                s = !isVisible(filtersEl);
            }
            if (!s && isVisible(filtersEl)) {
                cur.filtersShown = false;
                removeClass(minEl, 'ui_rmenu_item_expanded');
                slideUp(filtersEl, to);
            } else if (s && !isVisible(filtersEl)) {
                cur.filtersShown = true;
                val('c[category]', 0);
                addClass(minEl, 'ui_rmenu_item_expanded');
                slideDown(filtersEl, to);
            }
            return false;
        },
        onCommunitiesToggle: function() {
            if (cur.module != 'search') return;

            uiRightMenu.switchMenu(geByClass1('search_menu_' + cur.section, 'search_menu'));
            searcher.updResults();
        },
        subscribe: function(el, oid, hash, sub, from, confirm, isIcon) {
            var address, params,
                wrapEl = gpeByClass('search_row', el);
            cur.unsubscribed = cur.unsubscribed || {};
            if (!sub && confirm && !cur.unsubscribed[oid]) {
                var box = showFastBox({
                    title: getLang('global_warning'),
                    dark: 1,
                    bodyStyle: 'padding: 20px; line-height: 160%;'
                }, getLang(confirm), getLang('search_group_leave'), function() {
                    box.hide();
                    searcher.subscribe(el, oid, hash, sub, from);
                }, getLang('global_cancel'));
                return false;
            }
            if (sub) {
                address = 'al_feed.php';
                params = {
                    act: 'subscr',
                    oid: oid,
                    hash: hash,
                    from: from || 'search',
                    ref: cur.module
                };
            } else {
                address = 'al_fans.php';
                params = {
                    act: 'unsub',
                    oid: oid,
                    hash: hash,
                    from: 'search',
                    ref: cur.module
                };
            }
            ajax.post(address, params, {
                onDone: function() {
                    if (isIcon) {
                        toggleClass(wrapEl, 'touched', !!sub);
                    } else {
                        toggle('search_sub' + oid, !sub);
                        toggle('search_unsub' + oid, !!sub);
                    }
                    if (!sub) {
                        cur.unsubscribed[oid] = 1;
                    }
                },
                onFail: function(text) {
                    if (!text) return;
                    setTimeout(showFastBox(getLang('global_error'), text).hide, 2000);
                    return true;
                },
                showProgress: function() {
                    if (isIcon) {
                        el.tt && el.tt.destroy();
                        addClass(wrapEl, 'loading');
                    } else {
                        lockButton(el);
                    }
                },
                hideProgress: function() {
                    if (isIcon) {
                        removeClass(wrapEl, 'loading');
                    } else {
                        unlockButton(el);
                    }
                }
            });
        },

        onResize: function() {
            // searcher.fixPositionFixed();
            searcher.scrollCheck();
        },

        // fixPositionFixed: function() {
        //   var sf = ge('search_filters');
        //   if (sf && isVisible(sf)) {
        //     if (hasClass(sf, 'fixed')) {
        //       sf.style.marginLeft = (vk.rtl ? -379.5 : 207.5) - document.body.scrollLeft + 'px';
        //     } else {
        //       sf.style.marginLeft = 0;
        //     }
        //   }
        // },

        // scrollTop check
        scrollCheck: function() {
            if (browser.mobile || cur.isSearchLoading || cur.disableAutoMore) return;
            var el = ge('ui_search_load_more')
            if (!isVisible(el)) {
                var nextRows = ge('search_more_results');
                if (nextRows) {
                    searcher.appendElements(nextRows);
                }
                return;
            }

            var docEl = document.documentElement;
            var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
            var st = scrollGetY();

            if (st + ch + 200 > el.offsetTop) {
                searcher.showMore();
            }
        },

        init: function(options) {
            var hist_len = globalHistory.length;
            if (hist_len && globalHistory[hist_len - 1] && globalHistory[hist_len - 1].loc.indexOf('search')) {
                cur.search_return_to = globalHistory[hist_len - 1].loc;
            } else {
                cur.search_return_to = '/';
            }
            hide('header');
            var el = ge('search_query');
            var initOpts = el && data(el, 'opts') || {};
            if (!initOpts.isNew) {
                iSearch.destroy();
                if (vk.id) {
                    iSearch.init(el);
                }
            }
            elfocus(el);

            if (nav.objLoc[0] == 'search') {
                extend(cur, {
                    oid: options.user_id,
                    module: 'search',
                    // Decomment
                    // disableAutoMore: true,
                });
                cur.nav.push(function(changed, old, n) {
                    if (changed[0] !== undefined || cur.searchLoc && changed.act !== undefined) {
                        clearTimeout(cur.setLocTO);
                        if (nav.strLoc != cur.loc && cur.loc) {
                            hab.setLoc(cur.loc);
                        }
                        return;
                    }
                    if (cur.searchLoc) {
                        var e = false;
                        for (var k in n) {
                            if (k.substr(0, 2) == 'c[') {
                                e = true;
                                break;
                            }
                        }
                        cur.onLocationChange && cur.onLocationChange(e);
                        if (!e) {
                            return true;
                        }
                    }
                    var params = clone(n);
                    delete(params[0]);
                    var newSection = params['c[section]'] || params.section || 'quick';
                    if (ge('search_menu') && uiRightMenu) {
                        uiRightMenu.switchMenu(geByClass1('search_menu_' + newSection, 'search_menu'));
                    }
                    searcher.setSection(newSection);
                    searcher.sendSearchReq(params, true);
                    return false;
                });
            }

            if (!cur.options) {
                cur.options = {
                    reply_names: {}
                };
            }
            extend(cur.options, options);
            searcher.applyOptions(options);
            el.ignoreFixed = (cur.section == 'statuses');

            window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0;
            addEvent(window, 'scroll', searcher.scrollCheck);
            addEvent(window, 'resize', searcher.onResize);
            setTimeout(searcher.scrollCheck, 50);
            setTimeout(checkPageBlocks, 200);

            var _a = window.audioPlayer;
            if (_a && _a.showCurrentTrack) _a.showCurrentTrack();

            cur._back = {
                text: getLang('search_back_to'),
                show: [function() {
                    hide('header');
                    var hist_len = globalHistory.length;
                    if (hist_len && globalHistory[hist_len - 1] && globalHistory[hist_len - 1].loc.indexOf('search')) {
                        cur.search_return_to = globalHistory[hist_len - 1].loc;
                    }
                    addEvent(window, 'scroll', searcher.scrollCheck);
                    addEvent(window, 'resize', searcher.onResize);
                    iSearch.destroy();
                    if (vk.id) {
                        iSearch.init(ge('search_query'));
                    }
                }],
                hide: [function() {
                    removeEvent(window, 'scroll', searcher.scrollCheck);
                    removeEvent(window, 'resize', searcher.onResize);
                    iSearch.destroy();
                }]
            }
        }

    },
    Searcher = searcher;

if (window.iSearch === undefined) {
    iSearch = {
        init: function(input, options) {
            if (this.inited) {
                return;
            }
            var self = this;
            this.inited = true;
            this.input = input;
            this.cont = input.parentNode.parentNode;
            var resultContainer = ce('div', {
                className: 'results_container',
                innerHTML: '<div class="result_list"></div>'
            });
            this.cont.appendChild(resultContainer);
            this.resultList = geByClass('result_list', resultContainer)[0];
            hide(this.resultList);

            if (browser.chrome) this.resultList.style.opacity = 1;
            this.resultList.style.width = resultContainer.style.width = '552px';

            this.onShowCallback = options ? options.onShow : false;

            this.initSelect(options);

            addEvent(input, 'keyup click mouseup', self.inputUpHandler);
            addEvent(document, 'click', self.documentClick);
            addEvent(input, 'keypress keydown', self.inputDownHandler);

            setTimeout(function() {
                if (cur.params && cur.params['c[q]']) {
                    saveSearchAttemptStats(cur.module === 'friends' ? 'friends_find' : 'search_' + cur.section, 0, !isVisible(ge('no_results')), cur.params['c[q]']);
                }
            }, 0);

            if (ge('top_search')) ge('top_search').onclick = function(e) {
                if (hab.getLoc().indexOf('search')) {
                    return nav.go('search', e, {
                        search: true
                    });
                } else {
                    if (window.searcher) searcher.close();
                    return false;
                }
            };
        },
        inputUpHandler: function(e) {
            var self = iSearch;
            if (!self.select) return;
            if (self.select.isVisible() && self.select.active > -1 || cur.preventISRequest) {
                delete cur.preventISRequest;
                if (inArray(e.keyCode, [KEY.UP, KEY.DOWN, KEY.PAGEUP, KEY.PAGEDOWN, KEY.RETURN])) return cancelEvent(e);
            }
            clearTimeout(cur.requestTimeout);
            var term = val(self.input);
            self.currentTerm = term;
            var section = cur.section;
            if (!term) {
                self.select.hide();
                return;
            }
            cur.requestTimeout = setTimeout(function() {
                cur.setISearch = true;
                ajax.post('/hints.php?act=a_gsearch_hints', {
                    q: term,
                    section: section
                }, {
                    onDone: function(data) {
                        if (self.currentTerm == term && cur.setISearch) self.showSelectList(term, data);
                        delete cur.setISearch;
                    },
                    cache: 1
                });
            }, 300);
        },
        documentClick: function() {
            var self = iSearch;
            if (!self.select) return;
            self.select.hide();
        },
        inputDownHandler: function(e) {
            var self = iSearch;
            if (!self.select) return;

            if (!self.select || self.select.active < 0) {
                if (e.keyCode == KEY.RETURN && self.select) {
                    cur.preventISRequest = true;
                    self.select.hide();
                }
                return true;
            }

            if (e.keyCode == KEY.SPACE ||
                (e.keyCode == KEY.RETURN || e.keyCode == 10) && self.select && self.select.isVisible()) {
                var el = self.select.list.childNodes[self.select.active],
                    id = el ? el.getAttribute('val') : '',
                    item;
                each(self.lastItems, function() {
                    if (this[0] == id) {
                        item = this;
                    }
                });
                if (!item) return;
                val(self.input, item[3] + (e.keyCode == KEY.SPACE ? ' ' : ''));
                elfocus(self.input, self.input.length);
                if (e.keyCode != KEY.SPACE) {
                    cur.preventISRequest = true;
                    self.select.hide();
                    searcher.updResults();
                }
                return cancelEvent(e);
            } else if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
                if (self.select && self.select.isVisible()) {
                    triggerEvent(document, e.type, e);
                    return cancelEvent(e);
                }
            }
            return true;
        },

        initSelect: function(options) {
            if (this.select || !window.Select || !window._ui) return;
            if (!this.resultList) {
                return;
            }
            this.guid = _ui.reg(this);
            var _this = this;
            this.select = new Select(this.resultList, {
                selectFirst: false,
                onItemSelect: this.onItemSelect.bind(this),
                onShow: function() {
                    isFunction(_this.onShowCallback) && _this.onShowCallback();
                    return _ui.sel(_this.guid);
                },
                onHide: _ui.sel.pbind(false),
                cycle: true
            });
            this.select.hide();
        },
        showSelectList: function(term, items) {
            var self = this;
            if (!this.select) return;
            items = isArray(items) && items.length ? items : [];
            if (!items.length) {
                self.select.hide();
                return;
            }
            this.select.clear();
            this.lastItems = items;
            this.select.content(items);
            this.select.show();

            isFunction(this.onShowCallback) && this.onShowCallback();
        },
        onItemSelect: function(id) {
            if (!this.select) return;
            this.select.hide();
            var item;
            each(this.lastItems, function() {
                if (this[0] == id) {
                    item = this;
                }
            });
            if (!item) return;
            var el = ce('div', {
                innerHTML: item[3]
            });
            val(this.input, el.innerText || el.textContent);
            this.input.blur();
            searcher.updResults();
        },
        onEvent: function(e) {
            if (e.type == (browser.opera || browser.mozilla ? 'keypress' : 'keydown')) {
                this.select.handleKeyEvent(e);
            }
        },
        destroy: function(prevCur) {
            cleanElems(this.resultList);
            clearTimeout(prevCur ? prevCur.requestTimeout : cur.requestTimeout);
            removeEvent(this.input, 'keyup click mouseup', this.inputUpHandler);
            removeEvent(document, 'click', this.documentClick);
            removeEvent(this.input, 'keypress keydown', this.inputDownHandler);
            if (this.select) {
                this.select.destroy();
                delete this.select;
            }
            if (this.resultList) {
                re(this.resultList.parentNode);
            }
            delete this.lastItems;
            this.inited = false;
        },
        updateResultsList: function(width) {
            if (!width) {
                width = hasClass(ge('search_query_wrap'), 'wide') ? '512px' : '451px';
            } else {
                width += 'px';
            }
            this.resultList.style.width = width;
        }
    }
}

// Extra functions for sections
window.searchActions = {
    peopleMessage: function(mid) {
        showWriteMessageBox(window.event || {}, mid);
    },
    peopleAction: function(link, url, params) {
        ajax.post(url, params, {
            onDone: function(text) {
                link.parentNode.replaceChild(ce('span', {
                    innerHTML: text
                }).firstChild, link);
            }
        });
    },
    ownerAction: function(link, url, params) {
        ajax.post(url, params, {
            onDone: function(text) {
                link.parentNode.innerHTML = text;
            }
        });
    },
    groupAction: function(link, action, gid, mid, hash) {
        ajax.post('al_groups.php', {
            act: 'member_action',
            action: action,
            gid: gid,
            mid: mid,
            hash: hash,
            context: 'search'
        }, {
            onDone: function(text) {
                link.parentNode.replaceChild(ce('span', {
                    innerHTML: text
                }).firstChild, link);
                var loc = _tbLink.loc;
                if (loc) globalHistoryDestroy(loc);
            }
        });
    },
    inviteToGroup: function(btn, gid, mid, hash, invited) {
        var setInvited = function(invited) {
            if (invited) {
                link = '<button class="flat_button button_small button_wide search_btn_invite secondary" onclick="return searchActions.inviteToGroup(this, ' + gid + ', ' + mid + ', \'' + hash + '\', 1)">' + getLang('search_cancel_invitation') + '</button>';
            } else {
                link = '<button class="flat_button button_small button_wide search_btn_invite" onclick="return searchActions.inviteToGroup(this, ' + gid + ', ' + mid + ', \'' + hash + '\', 0)">' + getLang('search_send_invitation') + '</button>';
            }
            btn.parentNode.replaceChild(se(link), btn);
        }
        if (invited) {
            ajax.post('/al_page.php', {
                act: 'a_cancel_invite',
                mid: mid,
                gid: gid,
                hash: hash
            }, {
                onDone: function(res) {
                    setInvited(0);
                },
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn)
            });
        } else {
            ajax.post('/al_page.php', {
                act: 'a_invite',
                mid: mid,
                gid: gid,
                hash: hash
            }, {
                onDone: function(res, message) {
                    if (!res) {
                        showMsg(gpeByClass('people_row', btn), message, 'msg');
                        hide(btn);
                    } else {
                        setInvited(1);
                    }
                },
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn)
            });
        }
        return false;
    },
    showLyrics: function(audio_id, lyrics_id, top) {
        var lEl = ge('lyrics' + audio_id);
        if (!lEl) {
            lEl = ce('div', {
                id: 'lyrics' + audio_id,
                className: 'audio_lyrics_wrap',
                innerHTML: '<div class="loading"></div>'
            });
            ge('audio' + audio_id).appendChild(lEl);
            ajax.post('/al_audio.php', {
                act: 'get_lyrics',
                lid: lyrics_id,
                aid: audio_id,
                top: top
            }, {
                onDone: function(lyrics_text) {
                    lEl.innerHTML = '<div class="audio_lyrics ta_l">' + lyrics_text + '</div>';
                }
            });
        } else if (isVisible(lEl)) {
            hide(lEl);
        } else {
            show(lEl);
        }
    },
    toggleBanInGroup: function(el, mid, gid, hash) {
        showBox('/groupsedit.php', {
            act: 'bl_edit',
            name: 'id' + mid,
            gid: gid
        }, {
            stat: ['page.css', 'ui_controls.js', 'ui_controls.css'],
            dark: 1
        });
    },
    selectCategory: function(el, id, isSubcategory) {
        ge('c[category]').value = id;
        if (el && hasClass(el, '_ui_rmenu_subitem')) {
            uiRightMenu.switchMenu(el);
        }
        var search = ge('search_query');
        if (val(search)) {
            val(search, '');
            search.focus();
            triggerEvent(search, 'keyup');
        }
        searcher.toggleMinimizedFilters(ge('search_filters_minimized'), false);
        searcher.updResults();
        return false;
    },
    searchUnchooseGeoPoint: function() {
        var map = ge('search_status_map'),
            x = ge('search_status_map_delete_wrap');

        removeClass(map, 'search_status_map_selected');
        setStyle(map, {
            backgroundImage: ''
        });
        x && x.tt && x.tt.hide && x.tt.hide();
        val('search_status_map_hidden', '');
        searcher.updResults();
    },
    chooseGeoPoint: function(lat, lon, zoom, noFire) {
        var num = 0;
        each([8, 11, 14, 17, 20], function(k, zoomLevel) {
            if (zoom <= zoomLevel) {
                return false;
            }
            num = k;
        });
        boxQueue.hideLast();
        var postfix = (new Array(num + 1)).join('+'),
            mult = Math.pow(10, 10),
            w = 200,
            h = 120;
        if (window.devicePixelRatio >= 2) {
            w *= 2;
            h *= 2;
        }
        lat = Math.round(lat * mult) / mult;
        lon = Math.round(lon * mult) / mult;

        var map = ge('search_status_map');
        addClass(map, 'search_status_map_selected');
        setStyle(map, {
            backgroundImage: 'url(/maps?lat=' + lat + '&lng=' + lon + '&z=' + zoom + '&w=' + w + '&h=' + h + ')'
        });
        if (!noFire) {
            val('search_status_map_hidden', lat + ',' + lon + ',' + zoom);
            searcher.updResults();
        }
    },
    searchChooseGeoPoint: function() {
        var params = {
                act: 'a_choose_place_box',
                search: 1
            },
            text = val('search_status_map_hidden'),
            currentPointMatches = text.match(/(\-?\d{1,3}(?:\.\d+)?)\,(\-?\d{1,3}(?:\.\d+)?)(?:\,(\d+))?/);

        if (currentPointMatches) {
            params.lat = floatval(currentPointMatches[1]);
            params.lon = floatval(currentPointMatches[2]);
            params.zoom = currentPointMatches[3] || 8;
        }
        showBox('/al_places.php', params);
        cur.chooseGeoPoint = searchActions.chooseGeoPoint;
    },
    searchUrlOnChange: function(el, value, ev) {
        var linkEl = ge('search_status_url'),
            oldName = linkEl.name,
            newName = value ? 'c[domain]' : 'c[url]';
        radiobtn(el, value, 'search_status_hint_domain');
        elfocus(linkEl);
        if (val(linkEl) && newName != oldName) {
            linkEl.name = newName;
            searcher.updResults();
        }
        return cancelEvent(ev);
    },

    onChangeCommunityType: function(value) {
        var typeEvent = 3;

        value = positive(value);
        val(ge('c[type]'), value);
        slide_show('region_filters');

        if (value === typeEvent) {
            slide_show('events_filter');
            val(ge('all_events'), isChecked('future') ? 0 : 1);
        } else {
            slide_hide('events_filter');
            val(ge('all_events'), 0);
        }
        checkPageBlocks();
        searchActions.updateCommunityThemes(value);
        searcher.updResults();
    },

    updateCommunityThemes: function(communityType, changeByNotSafe) {
        communityType = positive(communityType);

        var notSafe = positive(val(ge('not_safe_search'))),
            themes = [],
            notSafeThemeItemIdx = 5,
            currentTheme;

        if (notSafe) {
            themes = cur.communityThemes[communityType] || [];
        } else {
            each(cur.communityThemes[communityType] || [], function() {
                if (!this[notSafeThemeItemIdx]) {
                    themes.push(this);
                }
            });
        }

        if (changeByNotSafe) {
            currentTheme = positive(cur.communityThemesDD.val());
            if (inArray(currentTheme, cur.notSafeThemesIds) || !currentTheme) {
                cur.communityThemesDD.clear();
            }
        } else {
            cur.communityThemesDD.clear();
        }

        cur.communityThemesDD.setOptions({
            autocomplete: false
        });
        cur.communityThemesDD.setData(themes);
        cur.communityThemesDD.setOptions({
            autocomplete: true
        });

        if (communityType) {
            slide_show('cTheme');
        } else {
            slide_hide('cTheme');
        }
    },

    onChangeCommunityTheme: function(value) {
        val(ge('c[theme]'), value);
        searcher.updResults();
    },

    onChangeNotSafe: function(el, name, viceVersa) {
        var currentTheme = val(ge('c[theme]'));

        if (inArray(currentTheme, cur.notSafeThemesIds)) {
            val(ge('c[theme]'), '');
        }
        searcher.checkbox(el, name, viceVersa, true);
        searchActions.updateCommunityThemes(val(ge('c[type]')), true);
        searcher.updResults();
    }
};

try {
    stManager.done('search.js');
} catch (e) {}