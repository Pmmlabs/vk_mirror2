var Friends = {
    init: function(friendsTpl, commonTpl) {
        extend(cur, {
            fSearchWrap: geByClass1('friends_search_cont', 'friends'),
            fSearch: ge('s_search'),
            fSearchFilterLnk: geByClass1('ui_search_fltr_control', 'market_search_wrap'),
            fSearchExtSearchLink: geByClass1('ui_search_fltr_ext_link', 'market_search_wrap'),
            module: 'friends',
            fListEl: ge('friends_list'),
            showMore: ge('show_more'),
            pageEnd: ge('page_end'),
            fContent: ge('list_content'),
            fSearchContent: ge('friends_search_cont'),
            friendsTpl: friendsTpl,
            commonTpl: commonTpl,
            savedMasks: {},
            friends: {},
            timeouts: {}
        });

        if (!cur.secData) {
            cur.secData = {};
        }
        cur.curList = cur.section;

        placeholderInit(cur.fSearch);
        setTimeout(function() {
            if (isVisible('friends_search_input_wrap')) {
                elfocus(cur.fSearch);
            }
        }, 0);

        Friends.scrollNode = browser.msie6 ? pageNode : window;
        addEvent(Friends.scrollNode, 'scroll', Friends.scrollResize);
        setTimeout(function() {
            cur.destroy.push(function() {
                clearTimeout(cur.resizeTimeout);
                removeEvent(Friends.scrollNode, 'scroll', Friends.scrollResize);
            });
        }, 0);

        if (!cur.silent) {
            this.indexAll(function() {
                if (cur.section.substr(0, 4) == 'list') {
                    cur.friendsList[cur.section] = Friends.filter(cur.friendsList['all'], cur.section);
                }
                if (!cur.friendsList[cur.section] || !cur.friendsList[cur.section].length) {
                    show('friends_not_found');
                }
            });
        }

        cur.nav.push((function(changed, old, n) {
            // debugLog('here', changed, old, n);
            if ('id' in changed || 'sort' in changed || 'act' in changed || isEmpty(changed)) {
                return true;
            }
            if (n[0] == 'friends' || n[0] == 'al_friends.php' && (changed.section)) {
                var s = changed.section;

                if ((s == 'requests' || s == 'all_requests' || s == 'out_requests') && !cur.requestsCount && !cur.suggCount && !cur.allRequestsCount && !cur.outRequestsCount) {
                    return nav.change({
                        section: 'all'
                    });
                } else if (s == 'requests' && !cur.requestsCount && !cur.suggCount) {
                    return nav.change({
                        section: cur.allRequestsCount ? 'all_requests' : 'out_requests'
                    });
                } else if (s == 'all_requests' && !cur.allRequestsCount) {
                    return nav.change({
                        section: cur.requestsCount || cur.suggCount ? 'requests' : 'out_requests'
                    });
                } else if (s == 'out_requests' && !cur.outRequestsCount) {
                    return nav.change({
                        section: 'all'
                    });
                } else if (s == 'subscribers' && !cur.subscribersCount) {
                    return nav.change({
                        section: 'all'
                    });
                }

                if (s == 'all' || s == 'online' || s == 'requests' || s == 'all_requests' || s == 'out_requests') {
                    __adsUpdate('force');
                }
                if (s == 'all_requests' && !('sort' in changed) && !cur.sortByCommon) {
                    delete n.sort;
                    setTimeout(Friends.changeSummary, 0);
                }
                this.section(n.section, (function() {
                    this.changeSummary();
                    nav.setLoc(n);
                }).bind(this));
                return false;
            } else if (n[0] == 'al_friends.php' || n[0] == 'friends') {
                return false;
            }
        }).bind(this));

        if (cur.silent) {
            ajax.post('al_friends.php', {
                act: 'load_friends_silent',
                id: cur.oid,
                gid: cur.gid,
                sort: nav.objLoc.sort,
                platform_id: nav.objLoc.platform_id
            }, {
                onDone: (function(data, occupations, filters) {
                    removeClass(cur.showMore, 'load_more');
                    cur.silent = false;
                    var obj = eval('(' + data + ')');
                    // load friends json
                    if (!obj) {
                        return;
                    }
                    cur.occupations = extend(cur.occupations || {}, occupations);
                    for (var i in obj) {
                        cur.friendsList[i] = obj[i];
                    }
                    this.indexAll(function() {
                        if (cur.section.substr(0, 4) == 'list') {
                            cur.friendsList[cur.section] = Friends.filter(cur.friendsList['all'], cur.section);
                        }
                        (cur.onSilentLoad || Friends.showMore)();
                    });
                    if (filters.cities) {
                        stManager.add(['ui_controls.js', 'ui_controls.css'], function() {
                            cur.cityFilter.setData(filters.cities);
                            if (cur.cityFilterOpened) {
                                hide('friends_fltr_progress');
                                cur.cityFilter.showDefaultList()
                            }
                        });
                    }
                }).bind(this),
                local: 1
            });
        }

    },
    indexAll: function(callback) {
        var all = cur.friendsList['all'];

        cur.friendsIndex = new vkIndexer(all, function(obj) {
            var mid = parseInt(obj[0]);
            if (cur.friends && mid) {
                cur.friends[mid] = obj;
            }
            return obj[5] || '';
        }, function() {
            if (!cur.silent) {
                cur.friendsList['online'] = Friends.filter(all, 'online');
                if (cur.section == 'common') {
                    cur.friendsList['common'] = Friends.filter(all, 'common');
                }
                if (callback) {
                    callback();
                }
            }
            Friends.initBackFunc();
        });

        if (cur.section == 'phonebook') {
            Friends.indexPhone();
        }
    },
    indexPhone: function() {
        cur.phoneIndex = new vkIndexer(cur.friendsList['phonebook'], function(obj) {
            var mobile = obj[11][0] || '';
            var home = obj[11][1] || '';
            var skype = obj[11][2] || '';
            return [obj[5], mobile, mobile.replace(/[^0-9\+]/g, ''), home, home.replace(/[^0-9\+]/g, ''), skype].join(' ');
        });
    },
    initBackFunc: function() {
        cur._back = {
            text: cur.backLang,
            show: [function() {
                addEvent(Friends.scrollNode, 'scroll', Friends.scrollResize);
            }],
            hide: [function() {
                if (Friends.searchTimout) {
                    clearTimeout(Friends.searchTimout);
                }
                if (cur.timeouts) {
                    for (var i in cur.timeouts) {
                        clearTimeout(cur.timeouts);
                    }
                }
                removeEvent(Friends.scrollNode, 'scroll', Friends.scrollResize);
            }]
        };
    },
    switchTab: function(el, section, ev) {
        if (checkEvent(ev)) {
            return true;
        }
        uiTabs.switchTab(el);
        var param = {
            '0': 'friends',
            section: section
        };
        return checkEvent(ev) || nav.change(param);
    },
    switchMenu: function(el, section, ev) {
        if (el.href !== undefined && checkEvent(ev)) {
            return true;
        }
        var menu = gpeByClass('ui_rmenu', el);
        if (geByClass1('ui_rmenu_item_sel', menu) == el) return false;
        uiRightMenu.switchMenu(el);

        var param = {
            '0': 'friends',
            section: section
        };
        if (vk.id != cur.oid) {
            param.id = cur.oid;
        } else if (cur.gid) {
            nav.change({
                section: section
            });
            return false;
        }
        if (nav.objLoc['act'] == 'find') {
            uiRightMenu.showProgress(el);
        }
        nav.go(param, ev);
        scrollToTop(0);
        return false;
    },
    filter: function(arr, type) {
        var len = (arr) ? arr.length : 0;
        var res = [];
        if (type.substr(0, 4) == 'list') {
            var listNum = parseInt(type.substr(4));
            type = 'list';
        }
        for (var i = 0; i < len; i++) {
            var obj = arr[i];
            if (cur.filterIds && !cur.filterIds[parseInt(obj[0])]) {
                continue;
            }
            switch (type) {
                case 'online':
                    if (intval(obj[4])) {
                        res.push(obj);
                    }
                    break;
                case 'common':
                    if (cur.commonCount && obj[11]) {
                        res.push(obj);
                    }
                    break;
                case 'list':
                    if (parseInt(obj[6]) & (1 << listNum)) {
                        res.push(obj);
                    }
                    break;
                default:
                    res.push(obj);
                    break;
            }
        }
        return res;
    },
    loadMore: function(start, end, force_section) {
        var section = force_section ? force_section : cur.section;
        var list = cur.curList;
        var curData = cur.secData[section];
        var showMore = force_section == 'sugg_requests' ? ge('friends_search_more') : cur.showMore;
        if (curData.loading) {
            return;
        }
        curData.loading = true;
        addClass(showMore, 'load_more');
        show(showMore);
        ajax.post('/friends', extend({
            act: 'get_section_friends',
            section: section,
            offset: start,
            id: cur.oid,
            gid: cur.gid,
            sort: nav.objLoc.sort
        }, cur.filter), {
            onDone: (function(data, preload) {
                removeClass(showMore, 'load_more');
                var response = eval('(' + data + ')')
                if (!cur.friendsList) {
                    return;
                }
                if (!cur.friendsList[list]) {
                    cur.friendsList[list] = [];
                }
                if (list == 'requests' && response['sugg_requests']) {
                    Array.prototype.push.apply(cur.friendsList['sugg_requests'], response['sugg_requests']);
                } else {
                    Array.prototype.push.apply(cur.friendsList[list], response[section]);
                }
                this.showMore(false, start, end);
                curData.loading = false;
                curData.preload = preload;
            }).bind(this)
        });
    },
    showMore: function(clear, start, end, plain) {
        if (!cur.friendsList) {
            return false;
        }
        var clist = cur.curList;
        var list = cur.friendsList[clist];
        var friendsPerPage = cur.friendsPerPage;

        var showSugg = cur.section == 'requests' && !clear && cur.suggCount && (!isVisible(cur.showMore) || hasClass(cur.showMore, 'manual')),
            showMore = cur.showMore,
            section = cur.section,
            sectionCount = cur.sectionCount,
            shownFriends = cur.shownFriends;
        if (!showSugg && cur.section == 'requests' && cur.suggCount && !cur.shownFriends && !start) {
            friendsPerPage = 3;
            addClass(cur.showMore, 'manual')
            show(cur.showMore);
        }
        if (clear === -1) {
            if (hasClass(cur.showMore, 'manual')) {
                removeClass(cur.showMore, 'manual');
                cur.pageEnd = ge('friends_search_wrap');
            }
            clear = false;
        }

        if (!showSugg) {
            if (!list || !list.length) {
                if (cur.shownFriends == 0 && !cur.searchCount) {
                    if (cur.isLoading) {
                        return false; // Dont show empty msg while search
                    }
                    if (cur.searchStr) {
                        addClass('friends_not_found', 'friends_search');
                        ge('search_ph').innerHTML = cur.searchStr.replace(/([<>&#]*)/g, '');
                    } else {
                        removeClass('friends_not_found', 'friends_search');
                    }
                    removeClass('friends_not_found', 'friends_only_other');
                    var text = '';
                    if (cur.curList.substr(0, 4) == 'list') {
                        if (cur.filterIds) {
                            text = cur.summaryLang['list_not_found_filter'];
                            text = text.replace('{link}', '<a onclick="Friends.clearFilter(true);">').replace('{/link}', '</a>');
                        } else {
                            text = cur.summaryLang['list_not_found'];
                            text = text.replace('{link}', '<a onclick="Friends.editList(-1);">').replace('{/link}', '</a>');
                        }
                    } else if (cur.section == 'requests') {
                        text = cur.summaryLang['friends_no_friend_requests'];
                    } else if (cur.filter) {
                        text = cur.summaryLang['not_found_filter'];
                        text = text.replace('{link}', '<a onclick="Friends.clearFilter(true);">').replace('{/link}', '</a>');
                    } else {
                        text = cur.summaryLang['not_found'];
                    }
                    ge('friends_not_found_text').innerHTML = text;
                    show('friends_not_found');
                }
                if (clear) {
                    cur.fContent.innerHTML = '';
                }
                if (cur.searchCount) {
                    Friends.serverSearchMore();
                }
                hide('show_more', 'friends_search_more');
                if (cur.section == 'requests' && clear && cur.suggCount) {
                    cur.fSearchContent.innerHTML = '';
                    this.showMore(false, start, end, plain);
                    show('friends_search_wrap');
                }
                return;
            } else if (isVisible('friends_not_found')) {
                hide('friends_not_found');
                removeClass('friends_not_found', 'friends_only_other');
            }
        }

        if (showSugg) {
            list = (cur.friendsList['sugg_requests'] || []).slice();
            section = 'sugg_requests';
            sectionCount = cur.suggCount;
            showMore = ge('friends_search_more'),
                shownFriends = cur.shownSugg;
        }

        if (start == undefined) {
            start = shownFriends;
        }
        if (end == undefined) {
            end = shownFriends + friendsPerPage;
        }

        var friends = list.slice(start, end);
        if (!friends.length) {
            // can upload
            var secData = cur.secData[section];
            if (secData && secData.preload) {
                Friends.loadMore(start, end, section);
            }
            if (cur.searchCount) {
                Friends.serverSearchMore();
            }
            if (shownFriends >= sectionCount) {
                hide(showMore);
            }
            return;
        }
        var html = [];
        if (clear) {
            cur.fContent.innerHTML = '';
        }
        for (i in friends) {
            if (cur.selection) {
                var friend = friends[i].slice();
                friend[5] = friend[5].replace(cur.selection.re, cur.selection.val);
            } else {
                var friend = friends[i];
            }
            ++shownFriends;
            if (showSugg) {
                ++cur.shownSugg;
            } else {
                ++cur.shownFriends;
            }
            if (!friend) {
                continue;
            }
            var tplType = '';
            if (showSugg) {
                tplType = 'sugg_requests';
            }
            Array.prototype.push.apply(html, Friends.drawFriend(friend, tplType));
        }
        if (plain) {
            return '<div class="friends_list_bl">' + html.join('') + '</div>';
        }
        (!showSugg ? cur.fContent : cur.fSearchContent).appendChild(ce('div', {
            innerHTML: html.join(''),
            className: 'friends_list_bl'
        }));
        if (shownFriends >= sectionCount) {
            hide(showMore);
            cur.pageEnd = ge('page_end');
        } else {
            show(showMore);
        }

        if (!showSugg && cur.section == 'requests' && clear && clear !== -1 && cur.suggCount) {
            cur.fSearchContent.innerHTML = '';
            this.showMore(false, start, end, plain);
            show('friends_search_wrap');
        }
    },

    updateList: function(str, force) {
        if (cur.silent) {
            cur.onSilentLoad = function() {
                Friends.updateList(str, true);
            };
            if (trim(str)) {
                hide(cur.showMore);
                cur.fContent.innerHTML = '<div class="friends_wide_loading"></div>';
            }
            return;
        }
        clearTimeout(Friends.searchTimout);
        Friends.searchTimout = setTimeout((function() {
            if (cur.searchStr == str) return;
            cur.searchStr = str;
            if (str) {
                if (cur.section != 'all' && cur.section != 'phonebook') {
                    this.selectTab('all');
                    this.selectSection('all');
                    cur.curList = cur.section = 'all';

                    nav.setLoc(extend(nav.objLoc, {
                        'section': 'all'
                    }));
                }
                this.search(str, cur.section);
                this.changeSummary();
            } else if (cur.section != cur.curList || force) {
                this.showSection();
                this.changeSummary();
                this.showMore();
            } else {
                this.hideLoading();
                cur.searchCount = 0;
                this.showMore();
            }
            if (hasClass(cur.fSearchWrap, 'ui_search_fixed')) {
                scrollToY(ge('friends_search_input_wrap').offsetTop, 0);
            }
        }).bind(Friends), 10);
    },
    showSection: function(section) {
        cur.shownFriends = cur.shownSugg = 0;
        cur.curList = cur.section = section || cur.section;
        if (vk.id == cur.oid) {
            var isRequests = cur.section == 'requests' || cur.section == 'all_requests' || cur.section == 'out_requests';
            removeClass('friends', 'friends_phonebook');
            removeClass('friends', 'friends_requests');
            hide(cur.fSearchFilterLnk, 'friends_sort_control', 'friends_req_block', cur.fSearchExtSearchLink);

            if (isRequests) {
                if ((cur.section == 'requests' && cur.requestsCount > 50) || (cur.section == 'all_requests' && cur.allRequestsCount > 10)) {
                    show('friends_sort_control');
                }
                hide('friends_search_input_wrap', 'friends_search_header');
                show('friends_sugg_header');

                var tabsCount = ((cur.requestsCount || cur.suggCount) ? 1 : 0) + (cur.allRequestsCount ? 1 : 0) + (cur.outRequestsCount ? 1 : 0);
                toggle(geByClass1('friends_section_requests', 'narrow_column'), tabsCount >= 1);
                toggle('friends_tab_requests', cur.requestsCount > 0 || cur.suggCount > 0);
                toggle('friends_tab_all_requests', cur.allRequestsCount > 0);
                toggle('friends_tab_out_requests', cur.outRequestsCount > 0);
                addClass('friends', 'friends_requests');
                val(geByClass1('_friends_list', 'friends_req_block'), '');
            } else if (cur.section == 'phonebook') {
                show('friends_search_input_wrap', cur.fSearchFilterLnk);
                Friends.showListHeader(cur.summaryLang['friends_filter_phonebook']);
                addClass('friends', 'friends_phonebook');
            } else if (cur.section == 'recent') {
                show('friends_search_input_wrap', cur.fSearchFilterLnk);
                Friends.showListHeader(cur.summaryLang['friends_tab_recently_added']);
            } else if (cur.section == 'members') {
                show('friends_search_input_wrap', cur.fSearchExtSearchLink);
            } else {
                hide('friends_sugg_header');
                show('friends_search_input_wrap', 'friends_search_header', cur.fSearchFilterLnk);
                if (cur.requestsCount && cur.friendsList['requests']) {
                    var block = ge('friends_req_block');
                    geByClass1('_friends_list', block).innerHTML = cur.commonTpl(cur.friendsList['requests'][0], 'requests').join('');
                    show(block);
                }
            }
            val(geByClass1('_label', cur.showMore), isRequests ? cur.summaryLang['friends_show_more_requests'] : cur.summaryLang['friends_show_more_friends']);
        } else if (!cur.gid) {
            if (cur.section == 'subscribers') {
                hide('friends_search_input_wrap');
                Friends.showListHeader(cur.summaryLang['friends_tab_subscribers']);
            } else {
                show('friends_search_input_wrap');
            }
        }
        if (isVisible('friends_search_input_wrap')) {
            elfocus(cur.fSearch);
        }
        if (cur.filterIds) {
            cur.curList += '_filter';
        }
        var list = cur.friendsList[cur.curList];
        if (!list) {
            if (section == 'recent' || section == 'phonebook' || section == 'requests') {
                var friendsList = section;
            } else {
                var friendsList = 'all';
            }
            list = cur.friendsList[cur.curList] = this.filter(cur.friendsList[friendsList], cur.section);
        }
        cur.sectionCount = (list) ? list.length : 0;
        cur.selection = false;
        if (cur.filter && !cur.filterIds) {
            Friends.changeFilter();
            if (!cur.searchStr) {
                this.clearServerSearch();
            }
            return false;
        }
        this.showMore(true);
    },

    updateView: function() {
        cur.fContent.innerHTML = this.showMore(false, 0, cur.shownFriends, true);
    },

    showLoading: function() {
        cur.isLoading = 1;
        uiSearch && uiSearch.showProgress('s_search');
    },
    hideLoading: function() {
        cur.isLoading = 0;
        uiSearch && uiSearch.hideProgress('s_search')
    },

    serverSearchMore: function() {
        if (cur.section == 'requests') {
            Friends.showMore();
            return;
        }
        if (cur.serverLoadingMore) {
            return;
        }
        if (cur.searchFinished) {
            return;
        }
        cur.serverLoadingMore = true;
        ajax.post('friends', {
            act: 'server_search',
            q: cur.searchStr,
            offset: cur.searchOffset
        }, {
            onDone: function(html, found, newOffset) {
                cur.searchFinished = !found;
                if (cur.searchFinished) {
                    hide('friends_search_more');
                }
                cur.searchOffset = newOffset;
                cur.serverLoadingMore = false;
                if (html) {
                    ge('friends_search_cont').appendChild(ce('div', {
                        innerHTML: html,
                        className: 'friends_list_bl'
                    }));
                }
            },
            showProgress: function() {
                addClass(ge('friends_search_more'), 'load_more');
            },
            hideProgress: function() {
                removeClass(ge('friends_search_more'), 'load_more');
            }
        });
    },

    serverSearch: function(str, count, exclude) {
        cur.searchCount = 0;
        Friends.showLoading();
        cur.serverSearchStr = str;
        clearTimeout(cur.serverSearchTimeout);
        var excludeList = [];
        for (var i in exclude) {
            excludeList.push(exclude[i][0]);
        }
        var ts = +new Date();
        cur.serverSearchTimeout = setTimeout((function() {
            ajax.post('friends', {
                act: 'server_search',
                q: str,
                exclude: excludeList.join(',')
            }, {
                onDone: function(html, found, newOffset) {
                    if (!count) {
                        saveSearchAttemptStats('friends', ts, found, cur.serverSearchStr);
                    }
                    cur.searchOffset = newOffset;
                    cur.searchFinished = !found;
                    Friends.hideLoading();
                    if (cur.searchStr != str) return;
                    cur.searchCount = found;
                    if (cur.shownFriends == 0) {
                        hide('friends_search_wrap');
                        cur.fContent.innerHTML = '';
                        Friends.showMore();
                    }
                    if (!found) {
                        Friends.changeSummary();
                        return;
                    }
                    if (cur.searchFinished) {
                        hide('friends_search_more');
                    } else {
                        show('friends_search_more');
                    }
                    ge('friends_search_cont').innerHTML = '<div class="friends_list_bl">' + html + '</div>';
                    show('friends_search_wrap');
                    Friends.changeSummary();
                    if (!count) {
                        addClass('friends_not_found', 'friends_only_other');
                        removeClass('friends_not_found', 'friends_search');
                        show('friends_not_found');
                    } else {
                        removeClass('friends_not_found', 'friends_only_other');
                    }
                },
                onFail: Friends.hideLoading
            });
        }).bind(this), 300);
    },

    clearServerSearch: function() {
        hide('friends_search_wrap');
        hide('friends_search_more');
        cur.searchCount = 0;
        cur.pageEnd = ge('page_end');
    },

    goToSearch: function(obj) {
        nav.go('friends?act=find&c%5Bname%5D=1&c%5Bq%5D=' + encodeURIComponent(cur.searchStr) + '&c%5Bsection%5D=people');
    },

    search: function(str, type, callback, filter) {
        cur.shownFriends = 0;
        cur.section = type;
        if (str) {
            var index = (type == 'phonebook') ? cur.phoneIndex : cur.friendsIndex,
                res;
            if (str == -1) {
                if (type == 'phonebook') {
                    var friendsList = type;
                } else {
                    var friendsList = 'all';
                }
                res = this.filter(cur.friendsList[friendsList], type);
                str = '';
                if (str != cur.searchStr) {
                    this.clearServerSearch();
                }
            } else {
                res = index.search(str);
                if (cur.filterIds) {
                    res = this.filter(res, type);
                }
                var count = res.length;
                if (count) {
                    if (str != cur.serverSearchStr && !cur.sectionCount) {
                        this.clearServerSearch();
                    }
                }
                if (count) {
                    saveSearchAttemptStats('friends', 0, count, cur.serverSearchStr);
                }
                if (count < 5 && cur.oid == vk.id && !cur.gid && type != 'phonebook') { // try to find some on the server side
                    this.serverSearch(str, count, res);
                }
            }
            var newList = cur.section;
            if (cur.filterIds) {
                newList += '_filter';
            }
            if (str) {
                newList += '_search_' + str;
            }
            if (cur.curList == newList && !filter) {
                return; // now at this section
            }
            cur.curList = newList;
            cur.friendsList[cur.curList] = res;

            var summaryTypes = {
                'all': 1,
                'online': 1,
                'common': 1
            };
            if (str == '' && cur.filterIds && summaryTypes[type]) {
                // for summary counters
                delete summaryTypes[type];
                for (var summaryType in summaryTypes) {
                    if (!cur.friendsList[summaryType]) continue;
                    res = this.filter(cur.friendsList[friendsList], summaryType);
                    cur.friendsList[summaryType + '_filter'] = res;
                }
            }

            if (str) {
                str += ' ' + (parseLatin(str) || '');
                str = trim(escapeRE(str.replace(/[,]/g, '')));
                cur.selection = {
                    re: new RegExp('(' + str.replace(index.delimiter, '|').replace(/(^\||\|$|\?)/g, '') + ')', 'gi'),
                    val: '<em class="highlight">$1</em>'
                };
            }
        } else {
            cur.curList = cur.section;
            cur.selection = false;
            if (cur.searchStr) {
                this.clearServerSearch();
            }
        }

        cur.sectionCount = cur.friendsList[cur.curList].length;
        this.searchTimout = setTimeout((function() {
            this.showMore(true);
            if (callback) {
                Friends.onSectionChange();
                callback();
            }
        }).bind(this), 10);
    },

    changeSummary: function(section) {
        var tabs_data = {
            all: cur.allFriendsCount,
            common: cur.commonCount
        };
        if (cur.friendsList['online']) {
            tabs_data['online'] = cur.friendsList['online'].length;
        }
        if (!cur.gid && vk.id == cur.oid) {
            tabs_data = extend(tabs_data, {
                requests: cur.requestsCount ? cur.requestsCount : '',
                all_requests: cur.allRequestsCount,
                out_requests: cur.outRequestsCount
            });
        }
        if (cur.curList.slice(0, 4) == 'list' || cur.curList.slice(0, 9) == 'phonebook') {
            ge('friends_list_count').innerHTML = cur.sectionCount ? langNumeric(cur.sectionCount, '%s', true) : '';
        } else if (cur.section == 'subscribers') {
            ge('friends_list_count').innerHTML = cur.subscribersCount ? langNumeric(cur.subscribersCount, '%s', true) : '';
        } else if (cur.section == 'requests' && cur.suggCount) {
            ge('friends_sugg_count').innerHTML = cur.suggCount ? langNumeric(cur.suggCount, '%s', true) : '';
        } else if (cur.curList.indexOf('_search_') != -1 || cur.filterIds) {
            if (cur.section == 'all') {
                if (!cur.sectionCount && !cur.searchCount && cur.isLoading) {
                    return; // no update while loading
                }
                tabs_data['all'] = cur.sectionCount;
            } else {
                tabs_data['all'] = cur.friendsList['all_filter'].length;
            }
            if (cur.curList.indexOf('_search_') == -1) {
                if (cur.friendsList['online_filter']) {
                    tabs_data['online'] = cur.friendsList['online_filter'].length;
                }
                if (cur.friendsList['common_filter']) {
                    tabs_data['common'] = cur.friendsList['common_filter'].length;
                }
            } else {
                tabs_data['online'] = tabs_data['common'] = '';
            }
        }

        each(tabs_data, function(section, count) {
            var tab = ge('friends_tab_' + section);
            if (!tab) return;
            var tab_count = geByClass1('ui_tab_count', tab);
            if (tab_count) {
                tab_count.innerHTML = count ? langNumeric(count, '%s', true) : '';
            }
        });
        if (!cur.gid && vk.id == cur.oid) {
            var req_count = intval(tabs_data['requests'] + cur.suggCount);
            req_count = req_count ? langNumeric(req_count, '%s', true) : '';
            val(geByClass1('ui_rmenu_count', 'ui_rmenu_requests'), req_count);
            val(geByClass1('page_block_header_count', 'friends_req_block'), req_count);
            (req_count > 1 ? show : hide)(domPN(ge('friends_request_load_more')));
        }

        document.title = replaceEntities(stripHTML(cur.htitles[cur.section] || cur.htitles.all));
    },
    showListHeader: function(title, listNum) {
        ge('friends_list_title').innerHTML = title;
        ge('friends_list_count').innerHTML = '';
        each(geByClass('_friends_header', ge('friends_tabs_wrap')), function() {
            if (this.id === 'friends_tab_list') {
                removeClass(this, 'unshown');
                if (!listNum) {
                    hide('friends_list_edit_btn', 'friends_list_delete_btn');
                } else if (vk.id == cur.oid) {
                    (listNum < 25 ? show : hide)('friends_list_delete_btn');
                    show('friends_list_edit_btn');
                }
            } else {
                addClass(this, 'unshown');
            }
        });
    },
    selectTab: function(tab) {
        var tab = geByClass1('ui_tab', 'friends_tab_' + tab),
            active_tabs = gpeByClass('ui_tabs', tab);
        each(geByClass('_friends_header', ge('friends_tabs_wrap')), function() {
            if (this == active_tabs) {
                removeClass(this, 'unshown');
            } else {
                addClass(this, 'unshown');
            }
        });
        uiTabs.switchTab(tab);
    },
    selectSection: function(tab) {
        var el = geByClass1('friends_section_' + tab, 'narrow_column');
        if (el) {
            uiRightMenu.switchMenu(el);
        }
    },
    selectTabAndSection: function(type) {
        if (type == 'all' || type == 'online' || type == 'common' || type == 'members') {
            this.selectTab(type);
            this.selectSection('all');
        } else if (type == 'all_requests' || type == 'requests' || type == 'out_requests') {
            this.selectTab(type);
            this.selectSection('requests');
        } else if (type.substr(0, 4) == 'list') {
            var listNum = parseInt(type.substr(4)),
                header = '';
            if (listNum >= 25 && listNum <= 29) {
                header = cur.publicLists[listNum];
            } else {
                header = cur.userLists[listNum];
            }
            this.showListHeader(header, listNum);
            if (!isVisible('ui_rmenu_lists_list')) {
                uiRightMenu.toggleSubmenu('lists');
            }
            this.selectSection(type);
        } else {
            this.selectTab('all');
            this.selectSection(type);
        }
    },
    onSectionChange: function() {
        if (window.tooltips) {
            tooltips.hideAll();
        }
    },
    section: function(type, callback, updateData) {
        Friends.clearServerSearch();
        if (!type) {
            type = 'all';
        }
        if (!updateData && ((type == 'online' && cur.oid != vk.id) || type.indexOf('requests') != -1 || type == 'recent' || type == 'members') && type.substr(0, 4) != 'list') {
            Friends.clearFilter();
            Friends.updateCurFilters();
        }
        if (!type) {
            if ((cur.requestsCount && cur.requestsCount > 0 && cur.requestsCount < 100) || cur.suggCount) {
                type = 'requests';
            } else {
                type = 'all';
            }
        }
        if (!cur.requestsCount && !cur.suggCount && !cur.allRequestsCount && !cur.outRequestsCount) {
            hide(geByClass1('friends_section_requests', 'narrow_column'));
        }
        hide('friends_req_block');
        if (type != cur.section) {
            cur.fSearch.setValue('');
            cur.searchStr = '';
        }
        // Select section filter
        this.selectTabAndSection(type);

        if (cur.silent && type != 'out_requests') {
            cur.onSilentLoad = function() {
                Friends.section(type, callback);
            };
            if (type != cur.section) {
                hide(cur.showMore);
                cur.fContent.innerHTML = '<div class="friends_wide_loading"></div>';
            }
            return;
        }


        if (!cur.secData[type]) {
            cur.secData[type] = {};
        }
        // from cache
        if (!updateData && cur.friendsList[type] || type == 'all' || (type == 'requests' && cur.friendsList['sugg_requests'])) {
            this.showSection(type);
            callback();
            Friends.onSectionChange();
            if (cur.filter) {
                Friends.changeFilter();
            }
            return;
        }
        // generate
        switch (type) {
            case 'online':
            case 'common':
                this.search(-1, type, callback);
                break;
            case 'phonebook':
                var tab = geByClass1('friends_section_phonebook', 'narrow_column');
                uiRightMenu.showProgress(tab);
                ajax.post('/al_friends.php', {
                    act: 'phonebook',
                    id: nav.objLoc.id
                }, {
                    onDone: (function(data) {
                        if (!data) {
                            return;
                        }
                        cur.shownFriends = 0;
                        cur.curList = cur.section = type;
                        var list = cur.friendsList['all'];
                        var phoneList = [];
                        if (list) {
                            for (var i = 0, len = list.length; i < len; i++) {
                                var friend = list[i];
                                var phone = data[friend[0]];
                                if (phone) {
                                    friend.push(phone);
                                    phoneList.push(friend);
                                }
                            }
                        }
                        phoneList.sort(function(a, b) {
                            return a[5].localeCompare(b[5], {
                                sensitivity: 'base'
                            });
                        });
                        cur.friendsList[cur.section] = phoneList;
                        cur.sectionCount = phoneList.length;
                        cur.fContent.innerHTML = '';
                        uiRightMenu.hideProgress(tab);
                        Friends.showSection(type);
                        Friends.onSectionChange();
                        callback();
                        Friends.indexPhone();
                        if (cur.filterIds) {
                            cur.curList += '_filter';
                            Friends.search(cur.searchStr || -1, cur.section, false, true);
                            Friends.changeSummary();
                            return;
                        }
                        this.showMore();
                    }).bind(this)
                });
                break;
            case 'recent':
                var tab = geByClass1('friends_section_recent', 'narrow_column');
                uiRightMenu.showProgress(tab);
                ajax.post('/al_friends.php', {
                    act: 'recent'
                }, {
                    onDone: (function(data) {
                        if (!data) {
                            return;
                        }
                        cur.shownFriends = 0;
                        cur.curList = cur.section = type;
                        var list = [];
                        len = data.length;
                        for (var i = 0; i < len; i++) {
                            var f = cur.friends[data[i]];
                            if (f) {
                                list.push(f);
                            }
                        }
                        cur.friendsList[cur.section] = list;
                        cur.sectionCount = list.length;
                        cur.fContent.innerHTML = '';
                        uiRightMenu.hideProgress(tab);
                        Friends.showSection(type);
                        Friends.onSectionChange();
                        callback();
                        this.showMore();
                    }).bind(this)
                });
                break;
            case 'out_requests':
                cur.fContent.innerHTML = '<div class="friends_wide_loading"></div>';
                ajax.post('/friends', {
                    act: 'out_requests'
                }, {
                    onDone: (function(data, occupations) {
                        var obj = eval('(' + data + ')');

                        // load friends json
                        if (!obj) {
                            return;
                        }
                        extend(cur.occupations, occupations);
                        extend(cur.friendsList, obj);

                        this.indexAll(function() {
                            Friends.section(type, callback);
                        });
                    }).bind(this)
                });
                break;
            default:
                if (type.substr(0, 4) == 'list') {
                    this.search(-1, type, callback);
                }

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
        if (st + ch * 3 > cur.pageEnd.offsetTop) {
            setTimeout(function() {
                Friends.showMore();
            }, 0);
        }
        if (!isVisible('friends_search_input_wrap')) {
            return;
        }
    },
    drawFriend: function(friend, type) {
        if (cur.section == 'requests' || cur.section == 'all_requests' || cur.section == 'out_requests') {
            return cur.commonTpl(friend, type || cur.section);
        } else {
            return cur.friendsTpl(friend, cur.section);
        }
    },

    inviteToGroup: function(btn, gid, mid, invited, hash) {
        var setInvited = function(invited) {
            for (var i in cur.friendsList[cur.curList]) {
                var row = cur.friendsList[cur.curList][i];
                if (row[0] == mid) {
                    row[11] = invited;
                    if (invited) {
                        link = '<button class="flat_button button_small button_wide secondary" onclick="return Friends.inviteToGroup(this, ' + gid + ', ' + mid + ', 1, \'' + row[12] + '\')">' + getLang('friends_cancel_invite') + '</button>';
                    } else {
                        link = '<button class="flat_button button_small button_wide" onclick="return Friends.inviteToGroup(this, ' + gid + ', ' + mid + ', 0, \'' + row[12] + '\')">' + getLang('friends_send_invite') + '</button>';
                    }
                    btn.parentNode.replaceChild(se(link), btn);
                    break;
                }
            }
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
                        showMsg('res' + mid, message, 'msg');
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

    acceptRequest: function(mid, hash, el, sugg) {
        var controls = ge('request_controls_' + mid);
        var controlsCont = controls.parentNode;
        if (!el) {
            controls.innerHTML = '<div class="progress_inline"></div>';
        }
        ajax.post('al_friends.php', {
            act: 'add',
            mid: mid,
            hash: hash,
            request: 1,
            'select_list': 1
        }, {
            onDone: function(text) {
                controls.innerHTML = text;
                Friends.processRequest(mid, true, sugg);
                if (TopNotifier && !TopNotifier.shown()) TopNotifier.invalidate();
            },
            onFail: function(text) {
                if (!text) return;

                showFastBox(getLang('global_error'), text);
                return true;
            },
            showProgress: lockButton.pbind(el),
            hideProgress: unlockButton.pbind(el)
        });
    },

    declineRequest: function(mid, hash, el) {
        var controls = ge('request_controls_' + mid);
        var controlsCont = controls.parentNode;
        if (!el) {
            controls.innerHTML = '<div class="progress_inline"></div>';
        }
        ajax.post('al_friends.php', {
            act: 'remove',
            mid: mid,
            hash: hash,
            report_spam: 1,
            from_section: cur.section
        }, {
            onDone: function(text) {
                cur.declinedRequestsCnt = cur.declinedRequestsCnt + 1 || 1;
                if (hasClass(gpeByClass('friends_user_row', controls), 'friends_user_request') && cur.declinedRequestsCnt >= 2 && cur.requestsCount > 1) {
                    text += '<button class="friends_decline_all flat_button button_small secondary" onclick="Friends.subscribeAllRequests(this, \'' + cur.declineAllHash + '\')">' + cur.summaryLang['friends_hide_all_requests'] + '</button>';
                }
                controls.innerHTML = text;
                Friends.processRequest(mid, false);
                if (TopNotifier && !TopNotifier.shown()) TopNotifier.invalidate();
            },
            onFail: function(text) {
                if (!text) return;

                showFastBox(getLang('global_error'), text);
                return true;
            },
            showProgress: lockButton.pbind(el),
            hideProgress: unlockButton.pbind(el)
        });
    },

    processRequest: function(mid, add, sugg) {
        if (!cur.friendsList) {
            return;
        }
        var reqs = cur.friendsList[sugg ? 'sugg_requests' : 'requests'] || [];
        var len = reqs.length,
            found = false;
        while (len--) {
            if (reqs[len][0] == mid) {
                var friend = reqs.splice(len, 1)[0];
                if (sugg) {
                    --cur.suggCount;
                } else {
                    --cur.requestsCount;
                }
                Friends.changeSummary();
                if (add) {
                    found = true;
                    friend.pop();
                    if (cur.friendsList['all']) {
                        cur.friendsList['all'].push(friend);
                    } else {
                        cur.friendsList['all'] = [friend];
                    }
                    cur.friends[friend[0]] = friend;
                } else {
                    if (sugg) {
                        cur.shownSugg--;
                        cur.suggCount--;
                    } else {
                        cur.shownFriends--;
                        cur.sectionCount--;
                    }
                }
            }
        }
        if (add) {
            var reqs = cur.friendsList['all_requests'] || [];
            var len = reqs.length;
            while (len--) {
                if (reqs[len][0] == mid) {
                    var friend = reqs.splice(len, 1)[0];
                    --cur.allRequestsCount;
                    if (!found) {
                        friend.pop();
                        if (cur.friendsList['all']) {
                            cur.friendsList['all'].push(friend);
                        } else {
                            cur.friendsList['all'] = [friend];
                        }
                        cur.friends[friend[0]] = friend;
                    }
                }
            }
            delete cur.friendsList['recent'];
            delete cur.friendsList['online'];
            Friends.indexAll();
        } else {
            var reqs = cur.friendsList['out_requests'] || [];
            var len = reqs.length;
            while (len--) {
                if (reqs[len][0] == mid) {
                    var friend = reqs.splice(len, 1)[0];
                    --cur.outRequestsCount;
                }
            }
        }
        if (cur.section === 'all' && cur.friendsList['requests'].length) {
            var block = geByClass1('_friends_list', 'friends_req_block');
            if (block) {
                var new_el = se(cur.commonTpl(cur.friendsList['requests'][0], 'requests').join(''));
                block.appendChild(new_el);
            }
        }
    },

    actionPossible: function(mid, hash, accept, lnk, from) {
        if (window.tooltips) {
            tooltips.hide(lnk);
        }
        if (!cur.possibleAdded) cur.possibleAdded = {};
        if (cur.possibleAdded[mid]) return;
        cur.possibleAdded[mid] = 1;

        if (!from) {
            from = cur.module;
        }

        var el = gpeByClass('right_list_row', lnk);
        if (accept) {
            var params = {
                act: 'add',
                mid: mid,
                hash: hash,
                from: from,
                request: 1
            };
        } else {
            var params = {
                act: 'hide_possible',
                mid: mid,
                hash: hash,
                from: from
            };
        }
        ajax.post('al_friends.php', params, {
            onDone: function(text) {
                if (accept) {
                    showDoneBox(text);
                }
                var cont = el.parentNode,
                    nextEl = geByClass1('unshown', cont);
                if (nextEl) domInsertBefore(nextEl, el);
                fadeOut(el, 500, function() {
                    re(el);
                    if (!nextEl && !geByClass1('right_list_row', cont)) {
                        slideUp('friends_possible_block', 100);
                    }
                });
                if (nextEl) setTimeout(fadeIn.pbind(nextEl, 200, removeClass.pbind(nextEl, 'unshown')), 500);
            },
            onFail: function(text) {
                if (!text) return;
                showFastBox(getLang('global_error'), text);
                return true;
            }
        });
        if (accept && cur.friendsList) {
            delete cur.friendsList['out_requests'];
            cur.outRequestsCount++;
            this.changeSummary('out_requests');
            if (cur.section == 'out_requests') {
                nav.change({
                    section: 'out_requests'
                });
            }
        }
        return false;
    },
    actionFindUser: function(mid, hash, accept, lnk) {
        if (window.tooltips) {
            tooltips.hide(lnk);
        }
        var el = gpeByClass('friends_find_user', lnk),
            elr = geByClass1('friends_find_user_result', el);
        elr.innerHTML = '<div class="progress_inline"></div>';

        if (accept) {
            var params = {
                act: 'add',
                mid: mid,
                hash: hash,
                from: 'possible'
            };
        } else {
            var params = {
                act: 'hide_possible',
                mid: mid,
                hash: hash
            };
        }
        ajax.post('al_friends.php', params, {
            onDone: function(text) {
                addClass(el, 'touched');
                elr.innerHTML = text;
            },
            onFail: function(text) {
                if (!text) return;
                showFastBox(getLang('global_error'), text);
                return true;
            },
            showProgress: addClass.pbind(el, 'loading'),
            hideProgress: removeClass.pbind(el, 'loading')
        });
        return false;
    },
    actionFindUserCancel: function(mid, hash, accept, lnk) {
        var el = gpeByClass('friends_find_user', lnk),
            elr = geByClass1('friends_find_user_result', el);
        elr.innerHTML = '<div class="progress_inline"></div>';
        removeClass(el, 'touched');

        if (accept) {
            var params = {
                act: 'remove',
                mid: mid,
                hash: hash
            };
        } else {
            var params = {
                act: 'cancel_hide_possible',
                mid: mid,
                hash: hash
            };
        }
        ajax.post('al_friends.php', params, {
            onDone: function(text) {},
            onFail: function(text) {
                if (!text) return;
                showFastBox(getLang('global_error'), text);
                return true;
            },
            showProgress: addClass.pbind(el, 'loading'),
            hideProgress: removeClass.pbind(el, 'loading')
        });
        return false;
    },

    reportSpam: function(mid, hash, el) {
        var controls = el ? domPN(el) : ge('request_controls_' + mid);
        if (!controls) {
            controls = ge('result_msg');
            removeClass(controls, 'msg');
        }
        setTimeout(val.pbind(controls, '<div class="progress_inline"></div>'), 0);
        ajax.post('al_friends.php', {
            act: 'report_spam',
            mid: mid,
            hash: hash
        }, {
            onDone: function(text) {
                controls.innerHTML = text;
            }
        });
    },

    restoreFriend: function(el, id) {
        var m = gpeByClass('_actions_menu', el);
        ajax.post('al_friends.php', {
            act: 'add',
            mid: id,
            hash: cur.userHash,
            cats: cur.savedMasks[id]
        }, {
            onDone: Friends.onRemoveFriend.pbind(id, true),
            showProgress: addClass.pbind(m, 'action_progress'),
            hideProgress: removeClass.pbind(m, 'action_progress')
        });
    },

    deleteFriend: function(e, id, el) {
        var m = gpeByClass('_actions_menu', el);
        ajax.post('al_friends.php', {
            act: 'remove',
            mid: id,
            hash: cur.userHash
        }, {
            onDone: Friends.onRemoveFriend.pbind(id, false),
            showProgress: function() {
                uiActionsMenu.hide(m);
                addClass(m, 'action_progress');
            },
            hideProgress: function() {
                removeClass(m, 'action_progress');
            }
        });
        return false;
    },

    onRemoveFriend: function(mid, res) {
        var needUpdateView = (cur.friendsList[cur.curList] || []).length < 10;

        for (var i in cur.friendsList) {
            if (i != 'all' && i != 'requests' && i != 'all_requests' && i != 'out_requests') {
                delete cur.friendsList[i];
            }
        }
        var list = cur.friendsList['all'];
        var len = list.length;
        mid = positive(mid);

        var block = ge('friends_user_row' + mid);
        var fr = cur.friends[mid];
        if (fr && block) {
            if (res) {
                fr[6] = cur.savedMasks[mid];
                delete(cur.savedMasks[mid]);
            } else {
                cur.savedMasks[mid] = fr[6];
                fr[6] = 0; // zero mask - removed friend
            }
            toggleClass(block, 'deleted', !fr[6]);
        } else {
            re(block);
        }

        Friends.indexAll(function() {});
    },
    showCommonBox: function(ev, oid) {
        showTabbedBox('al_page.php', {
            act: 'box',
            oid: oid,
            tab: 'common'
        }, {
            cache: 1
        }, ev);
        return false;
    },
    toList: function(num) {
        var section = 'list' + num;
        nav.change({
            '0': 'al_friends.php',
            section: section
        });
        scrollToTop(0);
        return false;
    },

    searchFriendToggle: function(uid, hash, add) {
        var btn = add ? ge('friends_subsc' + uid) : ge('friends_unsubsc' + uid),
            alt_btn = !add ? ge('friends_subsc' + uid) : ge('friends_unsubsc' + uid);
        ajax.post('al_friends.php', {
            act: add ? 'add' : 'remove',
            mid: uid,
            hash: hash,
            from: 'friends'
        }, {
            onDone: function(text) {
                hide(btn);
                show(alt_btn);
                // showDoneBox('<div class="friends_done">'+text+'</div>')
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        })
    },

    checkCat: function(obj, uid, listId, from) {
        if (from == 1) {
            var checked = isChecked(obj);
        } else {
            var checked = hasClass(obj, 'checked');
            var lists = ge('lists' + uid);
        }
        var friend = cur.friends[uid];
        if (!friend) {
            return false;
        }
        friend[6] = parseInt(friend[6]);
        if (checked) {
            if (friend[6] & (1 << listId)) {
                friend[6] -= (1 << listId);
            }
            if (lists) {
                lists.innerHTML = Friends.getLists(friend[6]);
            }
        } else {
            if (!(friend[6] & (1 << listId))) {
                friend[6] += (1 << listId);
            }
            if (lists) {
                lists.innerHTML = Friends.getLists(friend[6]);
            }
        }

        if (from == 1) {
            checkbox(obj);
        } else {
            (checked ? removeClass : addClass)(obj, 'checked');
        }
        if (cur.timeouts['list' + uid]) {
            clearTimeout(cur.timeouts['list' + uid]);
        }
        delete cur.friendsList['list' + listId];
        delete cur.friendsList['list' + friend[6]]
        cur.timeouts['list' + uid] = setTimeout(function() {
            ajax.post('al_friends.php', {
                act: 'save_cats',
                uid: uid,
                cats: friend[6],
                hash: cur.userHash
            }, {
                onDone: function(text) {
                    if (from) {
                        var info = ge('friends_added_' + uid);
                        if (!cur['fr_add_text_' + uid] && info) {
                            cur['fr_add_text_' + uid] = info.innerHTML;
                        }
                        fadeTo(info, 100, 0, function() {
                            info.innerHTML = text;
                            fadeTo(info, 100, 1);
                        });
                        clearTimeout(cur['fr_add_timeout_' + uid]);
                        cur['fr_add_timeout_' + uid] = setTimeout(function() {
                            fadeTo(info, 100, 0, function() {
                                info.innerHTML = cur['fr_add_text_' + uid];
                                fadeTo(info, 100, 1);
                            });
                        }, 2000);
                    }
                }
            });
        });
    },
    getLists: function(cats) {
        var info = [];
        for (var i = 29; i >= 25; i--) {
            if ((1 << i) & cats && cur.publicLists[i]) {
                info.push('<span class="friends_lists_group group', (i - 1) % 8 + 1, '" onmousedown="Friends.toList(', i, ');">', cur.publicLists[i], '</span>');
            }
        }
        if (vk.id == cur.oid) {
            for (var i in cur.userLists) {
                if ((1 << i) & cats && !cur.publicLists[i] && cur.userLists[i]) {
                    info.push('<span class="friends_lists_group group', (i - 1) % 8 + 1, '" onmousedown="Friends.toList(', i, ');">', cur.userLists[i], '</span>');
                }
            }
        }
        return info.join('');
    },
    subscribeAllRequests: function(obj, hash) {
        showFastBox(cur.summaryLang['global_action_confirmation'], cur.summaryLang['friends_confirm_subscribe_all_requests'], getLang('box_yes'), function() {
            ajax.post('al_friends.php', {
                act: 'subscribe_all_requests',
                hash: hash,
                once: 1
            }, {
                showProgress: lockButton.pbind(obj),
                hideProgress: unlockButton.pbind(obj)
            });
        }, getLang('box_no'));
    },
    hideAllSuggs: function(obj, hash) {
        showFastBox(cur.summaryLang['global_action_confirmation'], cur.summaryLang['friends_confirm_hide_all_suggs'], getLang('box_yes'), function() {
            ajax.post('al_friends.php', {
                act: 'hide_all_suggs',
                hash: hash
            }, {
                showProgress: lockButton.pbind(obj),
                hideProgress: unlockButton.pbind(obj)
            });
        }, getLang('box_no'));
    },
    editList: function(listId) {
        if (cur.silent) {
            cur.onSilentLoad = function() {
                Friends.editList(listId);
            };
            return;
        }
        var checked = [];
        if (listId == -1) {
            listId = intval(cur.curList.substr(4));
        }
        if (listId) {
            var list = Friends.filter(cur.friendsList['all'], cur.curList);
            var len = list.length;
            while (len--) {
                checked.push(list[len][0]);
            }
        } else {
            listId = 0;
        }
        showTabbedBox('al_friends.php', {
            act: 'select_friends_box',
            Checked: checked.join(','),
            from: 'list',
            list_name: (listId ? replaceEntities(stripHTML(cur.userLists[listId])) : ''),
            list_id: listId
        }, {
            stat: ['privacy.js', 'ui_controls.js', 'ui_controls.css'],
            cache: 1,
            onFail: function(text) {
                setTimeout(showFastBox(getLang('global_error'), text).hide, 3000);
                return true;
            }
        });
        cur.onFlistSave = function(ids, list, hash, title) {
            var friendsList = [];
            for (var i in list) {
                friendsList.push(parseInt(i));
            }

            ajax.post('al_friends.php', {
                act: 'save_list',
                title: title,
                cat_id: listId,
                Friends: friendsList.join(','),
                hash: hash
            }, {
                onDone: function(id, title) {
                    Friends.editListClient(listId, id, title, friendsList);
                },
                onFail: function(text) {
                    setTimeout(showFastBox(getLang('global_error'), text, getLang('global_close')).hide, 4000);
                    return true;
                }
            });

            Friends.clearFilter();
            Friends.updateCurFilters();

            return false;
        };

    },
    editListClient: function(listId, id, title, friendsList) {
        var listName = 'list' + id;
        if (listId == 0) {
            var html = '<div onclick="return Friends.switchMenu(this, \'list' + id + '\', event);"  class="ui_rmenu_subitem ui_rmenu_item_sel friends_section_list' + id + '">' + title + '</div>';
            ge('ui_rmenu_lists_list').insertBefore(ce('div', {
                innerHTML: html
            }), geByClass1('friends_create_list', 'narrow_column'));
            var len = friendsList.length;
            var mask = 1 << parseInt(id);
            cur.friendsList[listName] = [];
            while (len--) {
                var friend = cur.friends[friendsList[len]];
                friend[6] = parseInt(friend[6]);

                if (!(friend[6] & mask)) {
                    friend[6] += mask;
                    cur.friendsList[listName].push(friend)
                }
            }
            cur.userLists[id] = title;
            Friends.indexAll();
            removeClass(ge('main_class'), 'no_lists');
            return nav.change({
                '0': 'friends',
                section: listName
            });
        } else {
            if (id < 25) {
                geByClass1('friends_section_list' + id, 'narrow_column').innerHTML = title;
                cur.userLists[id] = title;
            }
            var mask = (1 << id);
            cur.friendsList[listName] = [];
            for (var i in cur.friends) {
                var friend = cur.friends[i];
                var inList = (friendsList.indexOf(parseInt(friend[0])) != -1);
                if (inList) {
                    cur.friendsList[listName].push(friend);
                }
                friend[6] = parseInt(friend[6]);
                if (friend[6] & mask) {
                    if (!inList) {
                        friend[6] -= mask;
                    }
                } else {
                    if (inList) {
                        friend[6] += mask;
                    }
                }
            }
            Friends.indexAll();
            return Friends.section(listName, function() {
                Friends.changeSummary();
                nav.setLoc({
                    '0': 'friends',
                    section: listName
                });
            });
        }
    },
    createList: function(event) {
        Friends.editList(0);
        return cancelEvent(event);
    },
    deleteList: function(listId) {
        if (listId == -1) {
            listId = intval(cur.curList.substr(4));
        }
        showBox('al_friends.php', {
            act: 'delete_list_box',
            list_id: listId
        });
    },
    deleteListClient: function(listId) {
        re(geByClass1('friends_section_list' + listId, 'narrow_column'));
        var mask = (1 << listId);
        for (var i in cur.friends) {
            if (cur.friends[i][6] & mask) {
                cur.friends[i][6] -= mask;
            }
        }
        delete cur.userLists[listId];
        var listsCount = 0;
        for (var i in cur.userLists) listsCount++;
        if (!listsCount) {
            addClass(ge('main_class'), 'no_lists');
        }
        return nav.change({
            '0': 'friends',
            section: 'all'
        });
    },
    selectList: function(obj, id, event) {
        Friends.ddShow(id, obj, event);
    },
    showListsDD: function(uid, obj, ev) {
        /*if (cur.silent) {
          cur.onSilentLoad = function() {
            Friends.showListsDD(uid, obj, ev);
          };
          return;
        }*/
        var menu = gpeByClass('ui_actions_menu', obj),
            submenu = geByClass1('ui_actions_menu_sublist', menu);
        if (submenu) {
            var to = data(submenu, 'hidetimer');
            clearTimeout(to);
            data(submenu, 'hidetimer', 0);
            return;
        }

        var friend = cur.friends[parseInt(uid)];
        if (!friend) return;

        var cats = parseInt(friend[6]);
        var elems = [];

        var publicLists = [28, 29, 27, 25, 26];
        for (var j = 0, i; j < 5; ++j) {
            i = publicLists[j];
            if (cur.publicLists[i]) {
                elems.push('<a class="ui_actions_menu_item' + ((cats & (1 << parseInt(i))) ? ' checked' : '') + '" onclick="Friends.checkCat(this, ' + uid + ', ' + i + ');">' + cur.publicLists[i] + '</a>');
            }
        }
        for (var i in cur.userLists) {
            if (i < 25) {
                var lname = cur.userLists[i];
                if (lname.length > 20) {
                    lname = trim(lname.substr(0, 18)) + '...';
                }
                elems.push('<a class="ui_actions_menu_item' + ((cats & (1 << parseInt(i))) ? ' checked' : '') + '" onclick="Friends.checkCat(this, ' + uid + ', ' + i + ');">' + lname + '</a>');
            }
        }
        elems = se('<div class="ui_actions_menu_sublist shown" onmouseover="Friends.showListsDD(' + uid + ', this, event);" onmouseout="Friends.hideListsDD(this);" onclick="Friends.showListsDD(' + uid + ', this, event);">' + elems.join('') + '</div>');
        menu.appendChild(elems);
    },
    hideListsDD: function(obj) {
        var menu = gpeByClass('ui_actions_menu', obj),
            submenu = geByClass1('ui_actions_menu_sublist', menu);
        if (!submenu) return;

        var to = data(submenu, 'hidetimer');
        if (to) {
            return;
        }
        data(submenu, 'hidetimer', setTimeout(function() {
            data(submenu, 'hidetimer', 0);
            re(submenu);
        }, 150));
    },

    hideSuggestion: function(mid, hash, btn) {
        var controls = ge('request_controls_' + mid);
        ajax.post('al_friends.php', {
            act: 'hide_suggestion',
            mid: mid,
            hash: hash,
            report_spam: 1
        }, {
            onDone: function(text) {
                cur.hiddenSuggestionsCnt = cur.hiddenSuggestionsCnt + 1 || 1;
                if (hasClass(gpeByClass('friends_user_row', controls), 'friends_user_request') && cur.hiddenSuggestionsCnt >= 2 && cur.suggCount > 1) {
                    text += '<button class="friends_decline_all flat_button button_small secondary" onclick="Friends.hideAllSuggs(this, \'' + cur.declineAllHash + '\')">' + cur.summaryLang['friends_hide_all_suggs'] + '</button>';
                }
                controls.innerHTML = text;
                Friends.processRequest(mid, false, true);
            },
            onFail: function(text) {
                if (!text) return;
                showFastBox(getLang('global_error'), text);
                return true;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    addRecommend: function(mid, uid, hash, obj) {
        obj = obj.parentNode;
        obj.innerHTML = '<img src="/images/upload.gif" />';
        ajax.post('al_friends.php', {
            act: 'a_suggest_friends',
            mid: mid,
            uids: uid,
            hash: hash,
            from: 'add'
        }, {
            onDone: function(text) {
                obj.innerHTML = text;
            },
            onFail: function(text) {
                obj.innerHTML = text;
            }
        })

    },
    suggestBox: function(mid) {
        var box = showBox('al_friends.php', {
            act: 'select_friends_box',
            from: 'suggest_friends',
            friend_id: mid
        }, {
            stat: ['privacy.js', 'privacy.css', 'indexer.js', 'profile.css'],
            params: {
                dark: 1
            }
        });
        box.leaveOnSave = true;
        cur.onFlistSave = function(ids, list, hash) {
            //if (!ids || !ids.length) return;
            ajax.post('al_friends.php', {
                act: 'a_suggest_friends',
                mid: mid,
                ids: ids.join(','),
                hash: hash
            }, {
                onDone: function(text) {
                    box.hide();
                    showDoneBox(text);
                },
                showProgress: box.showProgress,
                hideProgress: box.hideProgress
            });
        }
        return false;
    },
    getAgeFromData: function(max, opts) {
        max = parseInt(max);
        if (!max > 0) max = opts.ageTo;
        return Friends.getRangeData(opts.ageFrom, max, 1, opts.langAgeFrom + ' ', opts.langAgeFromEmpty);
    },
    getAgeToData: function(min, opts) {
        min = parseInt(min);
        if (!min > 0) min = opts.ageFrom;
        return Friends.getRangeData(min, opts.ageTo, 1, opts.langAgeTo + ' ', opts.langAgeToEmpty);
    },
    getRangeData: function(min, max, step, prefix, label) {
        if (min > max) return false;
        var ret = [
            [0, label]
        ];
        if (step < 0) {
            for (var i = max; i >= min; i += step)
                ret.push([i, prefix + i]);
        } else if (step > 0) {
            for (var i = min; i <= max; i += step)
                ret.push([i, prefix + i]);
        }
        return ret;
    },
    radioFilter: function(el, value, fireEvent) {
        radiobtn(el, value, 'friends_radio_sex');
        if (fireEvent || fireEvent == undefined) {
            Friends.changeFilter();
        }
    },
    initFilters: function(opts) {
        stManager.add(['ui_controls.js', 'ui_controls.css'], function() {
            cur.cityFilter = new Dropdown(ge('friends_fltr_city'), opts.cities, {
                big: 1,
                zeroPlaceholder: true,
                // placeholder: opts.citiesPl,
                onChange: Friends.changeFilter,
                onShow: function() {
                    if (cur.silent) {
                        cur.cityFilterOpened = true;
                        show('friends_fltr_progress');
                    }
                }
            });

            cur.ageFromFilter = new Dropdown(ge('friends_age_from'), Friends.getAgeFromData(opts.ageTo, opts), {
                zeroPlaceholder: true,
                big: 1,
                onChange: function(value) {
                    cur.ageToFilter.setData(Friends.getAgeToData(value, opts));
                    Friends.changeFilter();
                }
            });

            cur.ageToFilter = new Dropdown(ge('friends_age_to'), Friends.getAgeToData(opts.ageFrom, opts), {
                zeroPlaceholder: true,
                big: 1,
                onChange: function(value) {
                    cur.ageFromFilter.setData(Friends.getAgeFromData(value, opts));
                    Friends.changeFilter();
                }
            });

            window.radioBtns['friends_radio_sex'] = {
                els: Array.prototype.slice.apply(geByClass('radiobtn', ge('friends_radio_sex'))),
                val: 0
            }
        });
    },
    clearFilter: function(fireEvent, type) {
        if (!cur.cityFilter) return;
        if (!type || type == 'city') {
            cur.cityFilter.selectItem(0, false);
        }
        if (!type || type == 'age_from') {
            cur.ageFromFilter.selectItem(0, false);
        }
        if (!type || type == 'age_to') {
            cur.ageToFilter.selectItem(0, false);
        }
        if (!type || type == 'sex') {
            Friends.radioFilter(ge('friends_radio_any'), 0, false);
        }
        cur.filterIds = false;
        cur.filter = false;
        if (fireEvent) {
            Friends.changeFilter();
        }
    },
    filterParams: function() {
        var p = {
            city: parseInt(cur.cityFilter.val()),
            sex: parseInt(radioBtns['friends_radio_sex'].val),
            age_from: parseInt(cur.ageFromFilter.val()),
            age_to: parseInt(cur.ageToFilter.val())
        }
        if (p.city || p.sex || p.age_from || p.age_to) {
            return p;
        } else {
            return false;
        }
    },
    changeFilter: function() {
        if (cur.silent) {
            cur.onSilentLoad = function() {
                Friends.changeFilter();
            };
            hide(cur.showMore);
            cur.fContent.innerHTML = '<div class="friends_wide_loading"></div>';
            return;
        }
        cur.filter = Friends.filterParams();
        if (cur.filter) {
            ajax.post('friends', extend({
                act: 'filter_friends',
                uid: cur.oid
            }, cur.filter), {
                onDone: function(ids) {
                    cur.filterIds = {};
                    for (var i in ids) {
                        cur.filterIds[ids[i]] = 1;
                    }
                    for (var i in cur.friendsList) {
                        if (i.split('_').pop() == 'filter') {
                            delete cur.friendsList[i];
                        }
                    }
                    if (!inArray(cur.section, ['all', 'online', 'phonebook'])) {
                        Friends.selectTab('all');
                        Friends.selectSection('all');
                        cur.curList = cur.section = 'all';

                        nav.setLoc(extend(nav.objLoc, {
                            'section': 'all'
                        }));
                    }
                    Friends.search(cur.searchStr || -1, cur.section, false, true);
                    Friends.changeSummary();
                    Friends.updateCurFilters();
                },
                progress: 'friends_fltr_progress',
                cache: 1
            })
        } else {
            if (cur.filterIds) {
                cur.filterIds = false;
            }
            var str = cur.searchStr || '';
            cur.searchStr = '';
            Friends.updateList(str);
            Friends.updateCurFilters();
        }
    },
    updateCurFilters: function() {
        var cont = ge('friends_cur_filters');
        if (cur.filter) {
            for (var p in cur.filter) {
                var val = cur.filter[p],
                    str_val = '',
                    before = false,
                    after = false,
                    tok = ge('friends_filters_token_' + p);
                if (!val) {
                    if (tok) re(tok);
                    continue;
                }
                switch (p) {
                    case 'city':
                        str_val = cur.cityFilter.val_full()[1];
                        break;
                    case 'age_from':
                        str_val = cur.ageFromFilter.val_full()[1];
                        before = 'age_to';
                        break;
                    case 'age_to':
                        str_val = cur.ageToFilter.val_full()[1];
                        after = 'age_from';
                        break;
                    case 'sex':
                        str_val = val == 2 ? getLang('sex_m') : getLang('sex_fm');
                        break;
                }
                str_val = stripHTML(str_val);
                var html = '<span class="label">' + str_val + '</span><span class="del_icon"></span>';
                if (tok) {
                    tok.innerHTML = html;
                } else {
                    var el = ce('div', {
                        id: 'friends_filters_token_' + p,
                        className: 'token',
                        innerHTML: html,
                        onclick: Friends.clearFilter.pbind(true, p)
                    });
                    if (before && ge('friends_filters_token_' + before)) {
                        domInsertBefore(el, ge('friends_filters_token_' + before));
                    } else if (after && ge('friends_filters_token_' + after)) {
                        domInsertAfter(el, ge('friends_filters_token_' + after));
                    } else {
                        cont.appendChild(el);
                    }
                }
            }
            show(cont);
        } else {
            hide(cont);
            cont.innerHTML = '';
        }
    },
    changeFriendsOrder: function(el, sort) {
        var wrap = domPN(el);
        if (sort === 'date' && nav.objLoc.sort !== 'date') {
            nav.change({
                sort: false
            });
            addClass(wrap, 'friends_sort_sel_date');
            removeClass(wrap, 'friends_sort_sel_common');
        } else if (sort === 'common' && nav.objLoc.sort !== 'common') {
            nav.change({
                sort: 'common'
            });
            addClass(wrap, 'friends_sort_sel_common');
            removeClass(wrap, 'friends_sort_sel_date');
        }
    },
    findAdd: function(mid, hash, el) {
        ajax.post('al_friends.php', {
            act: 'add',
            mid: mid,
            hash: hash,
            request: 1,
            'short_resp': 1
        }, {
            onDone: function(text) {
                var cont = el.parentNode;
                cont.innerHTML = '<div class="friends_imp_status" style="display: none;">' + text + '</div>';
                fadeIn(cont.firstChild, 200);
            },
            onFail: function(text) {
                if (!text) return;
                showFastBox(getLang('global_error'), text);
                return true;
            },
            showProgress: lockButton.pbind(el),
            hideProgress: unlockButton.pbind(el)
        });
    },
    toggleFindFilters: function(minEl, fromUpdate) {
        var to = fromUpdate ? 0 : 200;
        if (!minEl) {
            minEl = ge('search_filters_minimized');
            if (fromUpdate) {
                searcher.toggleMinimizedFilters(minEl, true, fromUpdate);
            } else {
                searcher.toggleMinimizedFilters(minEl);
            }
        }
        if (hasClass(minEl, 'ui_rmenu_item_expanded')) {
            slideUp('friends_import_block', to, function() {
                show('friends_import_stub');
            });
            cur.disableAutoMore = false;
            if (geByClass1('search_row', 'results')) {
                searcher.updResults();
            }
        } else {
            hide('friends_import_stub', 'friends_filters_header', 'results');
            show('friends_import_header', 'friends_list_wrap');
            slideDown('friends_import_block', to);
            nav.setLoc('friends?act=find');
            val('search_query', '');
            if (cur.params) cur.params['c[q]'] = '';
            cur.disableAutoMore = true;
            scrollToTop();
        }
    },
    extendedSearchQuery: function() {
        if (!hasClass('search_filters_minimized', 'ui_rmenu_item_expanded')) {
            Friends.toggleFindFilters(false, true);
        }
        searcher.onEnter();
    },
    clearFindParams: function(el, ev) {
        hide('search_clear_params');
        return uiSearch.reset(el, false, ev);
    }
}

try {
    stManager.done('friends.js');
} catch (e) {}