var Friends = {
  init: function(obj, friendsTpl, commonTpl) {
    extend(cur, {
      fSearch: ge('s_search'),
      module: 'friends',
      fListEl: ge('friends_list'),
      showMore: ge('show_more'),
      pageEnd: ge('page_end'),
      fContent: ge('list_content'),
      friendsTpl: friendsTpl,
      commonTpl: commonTpl,
      savedMasks: {},
      bigphCache: {},
      bigphShown: {}
    });
    extend(cur, obj);

    if (!cur.secData) {
      cur.secData = {};
    }

    cur.curList = cur.section;

    placeholderSetup(cur.fSearch, {back: true})
    elfocus(cur.fSearch);

    Friends.scrollNode = browser.msie6 ? pageNode : window;

    addEvent(Friends.scrollNode, 'scroll', Friends.scrollResize);

    setTimeout(function() {
      cur.destroy.push(function() {
        clearTimeout(cur.resizeTimeout);
        removeEvent(Friends.scrollNode, 'scroll', Friends.scrollResize);
      });
    }, 0);

    cur.friends = {};

    if (!cur.silent) {
      this.indexAll(function() {
        if (cur.section.substr(0, 4) == 'list') {
          cur.friendsList[cur.section] = Friends.filter(cur.friendsList['all'], cur.section);
        }
        if (!cur.friendsList[cur.section] || !cur.friendsList[cur.section].length) {
          if (cur.section != 'requests' || !cur.suggCount) {
            show('not_found');
          }
        }
      });
    }

    cur.timeouts = {};

    cur.nav.push((function(changed, old, n) {
      debugLog('here', changed, old, n);
      if ('id' in changed || 'sort' in changed || 'act' in changed || isEmpty(changed)) {
        return true;
      }
      if (n[0] == 'friends' || n[0] == 'al_friends.php' && (changed.section)) {
        var s = changed.section;

        if ((s == 'requests' || s == 'all_requests' || s == 'out_requests') && !cur.requestsCount && !cur.suggCount && !cur.allRequestsCount && !cur.outRequestsCount) {
          return nav.change({section: 'all'});
        } else if (s == 'requests' && !cur.requestsCount && !cur.suggCount) {
          return nav.change({section: cur.allRequestsCount ? 'all_requests' : 'out_requests'});
        } else if (s == 'all_requests' && !cur.allRequestsCount) {
          return nav.change({section: cur.requestsCount || cur.suggCount ? 'requests' : 'out_requests'});
        } else if (s == 'out_requests' && !cur.outRequestsCount) {
          return nav.change({section: 'all'});
        }

        if (s == 'all' || s == 'online' || s == 'requests' || s == 'all_requests' || s == 'out_requests') {
          __adsUpdate('force');
        }
        if (s == 'all_requests' && !('sort' in changed) && !cur.sortByDate) {
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
      addClass(cur.showMore, 'load_more');
      ajax.post('al_friends.php', {act: 'load_friends_silent', id: cur.oid, gid: cur.gid, sort: nav.objLoc.sort}, {
        onDone: (function(data, occupations, filters) {
          removeClass(cur.showMore, 'load_more');
          cur.silent = false;
          var obj = eval('('+data+')');
          // load friends json
          if (!obj) {
            return;
          }
          cur.occupations = occupations;
          for (var i in obj) {
            cur.friendsList[i] = obj[i];
          }
          this.indexAll(function() {
            //Friends.selectTabAndSection(cur.section);
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
        }).bind(this), local: 1
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
      var mobile = obj[10][0] || '';
      var home = obj[10][1] || '';
      return [obj[5], mobile, mobile.replace(/[^0-9\+]/g, ''), home, home.replace(/[^0-9\+]/g, '')].join(' ');
    });
  },
  initBackFunc: function() {
    cur._back = {show: [function() {
      addEvent(Friends.scrollNode, 'scroll', Friends.scrollResize);
    }], hide: [function() {
      if (Friends.searchTimout) {
        clearTimeout(Friends.searchTimout);
      }
      if (cur.timeouts) {
        for (var i in cur.timeouts) {
          clearTimeout(cur.timeouts);
        }
      }
      for (var i in cur.bigphShown) {
        animate(cur.bigphShown[i], {marginTop: 100}, 0);
      }
      cur.bigphShown = {};
      removeEvent(Friends.scrollNode, 'scroll', Friends.scrollResize);
    }], text: cur.backLang};
  },
  switchTab: function(section, ev) {
    var param = {'0':'friends', section: section};
    return checkEvent(ev) || nav.change(param);
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
          if (cur.commonCount && obj[10]) {
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
  loadMore: function(start, end) {
    var section = cur.section;
    var list = cur.curList;
    var curData = cur.secData[section];
    if (curData.loading) {
      return;
    }
    curData.loading = true;
    addClass(cur.showMore, 'load_more');
    show(cur.showMore);
    ajax.post('/friends', extend({
      act: 'get_section_friends',
      section: section,
      offset: start,
      gid: cur.gid,
      sort: nav.objLoc.sort,
      sugg_rev: cur.suggRev
    }, cur.filter), {
      onDone: (function(data, preload) {
        removeClass(cur.showMore, 'load_more');
        var response = eval('('+data+')')
        if (!cur.friendsList) {
          return;
        }
        if (!cur.friendsList[list]) {
          cur.friendsList[list] = [];
        }
        Array.prototype.push.apply(cur.friendsList[list], response[section]);
        if (list == 'requests' && response['sugg_requests']) {
          Array.prototype.push.apply(cur.friendsList['sugg_requests'], response['sugg_requests']);
        }
        this.showMore(false, start, end);
        curData.loading = false;
        curData.preload = preload;
      }).bind(this)
    });
  },
  canSugSwitch: function(list) {
    if (!list) {
      return cur.suggCount ? true : true;
    }
    if (cur.suggRev) {
      return list.length >= cur.suggCount || !cur.secData.requests.preload;
    } else {
      return list.length >= cur.requestsCount || !cur.secData.requests.preload;
    }
  },
  showMore: function(clear, start, end, plain) {
    if (!cur.friendsList) {
      return false;
    }
    var clist = cur.curList;
    var list = cur.friendsList[clist];
    if (start == undefined) {
      start = cur.shownFriends;
    }
    if (end == undefined) {
      end = cur.shownFriends + cur.friendsPerPage;
    }
    if (cur.section == 'requests') {
      if (cur.suggRev) {
        list = (cur.friendsList['sugg_requests'] || []).slice();
        if (Friends.canSugSwitch(list)) {
          var suggSwitch = parseInt(cur.suggCount);
          list.push.apply(list, cur.friendsList[cur.curList] || []);
        }
      } else if (!cur.suggRev && cur.requestsCount < end && Friends.canSugSwitch(list)) {
        list = (list || []).slice();
        var suggSwitch = parseInt(cur.requestsCount);
        list.push.apply(list, cur.friendsList['sugg_requests']);
      }
    }
    if (!list || !list.length) {
      if (cur.shownFriends == 0 && !cur.searchCount) {
        if (cur.isLoading) {
          return false; // Dont show empty msg while search
        }
        if (cur.searchStr) {
          addClass(ge('not_found'), 'f_search');
          ge('search_ph').innerHTML = cur.searchStr.replace(/([<>&#]*)/g, '');
        } else {
          removeClass(ge('not_found'), 'f_search');
        }
        var text = '';
        if (cur.curList.substr(0, 4) == 'list') {
          if (cur.filterIds) {
            text = cur.summaryLang['list_not_found_filter'];
            text = text.replace('{link}', '<a onclick="Friends.clearFilter(true);">').replace('{/link}', '</a>');
          } else {
            text = cur.summaryLang['list_not_found'];
            text = text.replace('{link}', '<a onclick="Friends.editList(-1);">').replace('{/link}', '</a>');
          }
        } else if (cur.filter) {
          text = cur.summaryLang['not_found_filter'];
          text = text.replace('{link}', '<a onclick="Friends.clearFilter(true);">').replace('{/link}', '</a>');
        } else {
          text = cur.summaryLang['not_found'];
        }
        ge('not_found_text').innerHTML = text;
        show('not_found');
      }
      if (clear) {
        cur.fContent.innerHTML = '';
      }
      if (cur.searchCount) {
        Friends.serverSearchMore();
      }
      hide('show_more');
      return;
    } else if (isVisible('not_found')) {
      hide('not_found');
    }

    var friends = list.slice(start, end);
    if (!friends.length) {
      // can upload
      var secData = cur.secData[cur.section];
      if (secData && secData.preload) {
        Friends.loadMore(start, end);
      }
      if (cur.searchCount) {
        Friends.serverSearchMore();
      }
      if (cur.shownFriends >= cur.sectionCount) {
        hide('show_more');
      }
      return;
    }
    var html = [];
    var first = (cur.shownFriends == 0) ? ' user_block_first' : '';
    if (clear) {
      cur.fContent.innerHTML = '';
    }
    for (i in friends) {
      var iSt = parseInt(i) + start;
      if (suggSwitch && suggSwitch == iSt) {
        if (cur.suggRev) {
          var summaryText = langNumeric(cur.requestsCount, cur.summaryLang['requests']);
          if (nav.objLoc.sort != 'date') {
            summaryText += '<span class="divide">|</span><span><a href="/friends?section=' + cur.section + '&sort=date">' + cur.summaryLang['friends_sort_by_date'] + '</a></span>';
          } else {
            summaryText += '<span class="divide">|</span><span><a href="/friends?section=' + cur.section + '">' + cur.summaryLang['friends_sort_by_common'] + '</a></span>';
          }
        } else {
          var summaryText = langNumeric(cur.suggCount, cur.summaryLang['friends_sugg_summary']);
        }
        html.push('<div id="friends_sub_summary" class="summary_wrap"><div class="summary">',summaryText,'</div></div>');
        first = ' user_block_first';
      }
      if (cur.selection) {
        var friend = friends[i].slice();
        friend[5] = friend[5].replace(cur.selection.re, cur.selection.val);
      } else {
        var friend = friends[i];
      }
      if (cur.importCount && cur.importCount == cur.shownFriends) {
        html.push('<div id="friends_sub_summary" class="summary_wrap"><div class="summary">',cur.summaryLang['suggestions'],'</div></div>');
        first = ' user_block_first';
      }
      /*if (friend[0] && ge('user_block' + friend[0])) { // bad with search
        debugLog('here');
        continue;
      }*/
      ++cur.shownFriends;
      if (!friend) {
        continue;
      }
      var tplType = '';
      if (cur.section == 'requests') {
        if (suggSwitch <= iSt) {
          tplType = (!cur.suggRev ? 'sugg_requests' : '');
        } else {
          tplType = (!cur.suggRev ? '' : 'sugg_requests');
        }
      }
      Array.prototype.push.apply(html, Friends.drawFriend(friend, first, tplType));
      first = '';
    }
    if (plain) {
      return '<div>'+html.join('')+'</div>';
    }
    cur.fContent.appendChild(ce('div', {innerHTML: html.join('')}));
    if (cur.shownFriends >= cur.sectionCount) {
      hide('show_more');
    } else {
      show('show_more');
    }
  },

  updateList: function(e, obj, force) {
    if (!obj || e.keyCode == KEY.ESC) {
      obj = cur.fSearch;
      val(obj, '');
      cur.searchStr = '';
    }
    if (cur.silent) {
      cur.onSilentLoad = function() {
        Friends.updateList(e, obj, true);
      };
      if (trim(obj.value)) {
        hide(cur.showMore);
        cur.fContent.innerHTML = '<div class="wide_loading"></div>';
      }
      return;
    }
    clearTimeout(this.searchTimout);
    this.searchTimout = setTimeout((function() {
      var str = trim(obj.value);
      if (str && cur.searchStr == str) return;
      cur.searchStr = str;
      if (str) {
        if (cur.section != 'all' && cur.section != 'phonebook') {
          this.selectTab('all');
          this.selectSection('all');
          cur.curList = cur.section = 'all';

          nav.setLoc(extend(nav.objLoc, {'section': 'all'}));
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
    }).bind(this), 10);
  },
  showSection: function(section) {
    cur.shownFriends = 0;
    cur.curList = cur.section = section || cur.section;
    if (vk.id == cur.oid) {
      if (cur.section == 'requests' || cur.section == 'all_requests' || cur.section == 'out_requests') {
        hide('friends_search');
        var tabsCount = ((cur.requestsCount || cur.suggCount) ? 1 : 0) + (cur.allRequestsCount ? 1 : 0) + (cur.outRequestsCount ? 1 : 0);
        toggle('friends_req_tabs', tabsCount > 1);
        toggle('friends_hide_all', (cur.section == 'requests') && (cur.requestsCount > 1 || cur.suggCount));
        toggle(ge('sum_tab_requests').parentNode, cur.requestsCount > 0 || cur.suggCount > 0);
        toggle(ge('sum_tab_all_requests').parentNode, cur.allRequestsCount > 0);
        toggle(ge('sum_tab_out_requests').parentNode, cur.outRequestsCount > 0);
        show('tab_requests');
        addClass(ge('main_class'), 'wide');
      } else {
        show('friends_search');
        hide('friends_req_tabs');
        (cur.allFriendsCount && (cur.section != 'members') ? removeClass : addClass)(ge('main_class'), 'wide');
      }
      toggle('tab_requests', nav.objLoc.act != 'invite' && (cur.requestsCount || cur.allRequestsCount || cur.outRequestsCount || cur.suggCount));
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
        hide('friends_reset_search');
        this.clearServerSearch();
      }
      return false;
    }
    this.showMore(true);
    if (!cur.searchStr) {
      hide('friends_reset_search');
      this.clearServerSearch();
    }
  },

  updateView: function() {
    cur.fContent.innerHTML = this.showMore(false, 0, cur.shownFriends, true);
  },

  showLoading: function() {
    cur.isLoading = 1;
    show('friends_loading');
    hide('friends_reset_search');
  },

  hideLoading: function() {
    cur.isLoading = 0;
    hide('friends_loading');
    if (cur.searchStr) {
      show('friends_reset_search');
    }
  },

  serverSearchMore: function() {
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
      onDone: function(html, found, summary, newOffset) {
        cur.searchFinished = !found;
        if (cur.searchFinished) {
          hide('friends_search_more');
        }
        cur.searchOffset = newOffset;
        cur.serverLoadingMore = false;
        ge('friends_search_cont').appendChild(ce('div', {innerHTML: html}));
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
    cur.serverSearchTimeout = setTimeout((function() {
      ajax.post('friends', {
        act: 'server_search',
        q: str,
        exclude: excludeList.join(',')
      }, {
        onDone: function(html, found, summary, newOffset) {
          cur.searchOffset = newOffset;
          cur.searchFinished = !found;
          Friends.hideLoading();
          if (cur.searchStr != str) return;
          var cont = ge('friends_search_cont');
          cur.searchCount = found;
          if (cur.shownFriends == 0) {
            hide(cont);
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
          cur.searchSummary = summary;
          if (count) {
            html = '<div class="summary_wrap"><div class="summary">'+summary+'</div></div>'+html;
          }
          cont.innerHTML = html;
          show(cont);
          Friends.changeSummary();
          hide('not_found');
        },
        onFail: Friends.hideLoading
      });
    }).bind(this), 300);
  },

  clearServerSearch: function() {
    hide('friends_search_cont');
    hide('friends_search_more');
    cur.searchCount = 0;
  },

  goToSearch: function(obj) {
    nav.go('search?c%5Bname%5D=1&c%5Bq%5D='+encodeURIComponent(cur.searchStr)+'&c%5Bsection%5D=people');
  },

  search: function(str, type, callback, filter) {
    cur.shownFriends = 0;
    cur.section = type;
    if (str) {
      var index = (type == 'phonebook') ? cur.phoneIndex : cur.friendsIndex;
      var checkTime = new Date().getTime();
      if (str == -1) {
        if (type == 'recent' || type == 'phonebook') {
          var friendsList = type;
        } else {
          var friendsList = 'all';
        }
        var res = this.filter(cur.friendsList[friendsList], type);
        str = '';
        if (str != cur.searchStr) {
          this.clearServerSearch();
        }
      } else {
        var res = index.search(str);
        if (cur.filterIds) {
          res = this.filter(res, type);
        }
        var count = res.length;
        if (count) {
          if (str != cur.serverSearchStr && !cur.sectionCount) {
            this.clearServerSearch();
          }
        }
        if (count < 5 && cur.oid == vk.id) { // try to find some on the server side
          this.serverSearch(str, count, res);
        }
      }
      var newList = cur.section;
      if (cur.filterIds) {
        newList += '_filter';
      }
      if (str) {
        newList += '_search_'+str;
      }
      if (cur.curList == newList && !filter) {
        return; // now at this section
      }
      cur.curList = newList;
      cur.friendsList[cur.curList] = res;

      if (str) {
        str += ' '+(parseLatin(str) || '');
        str = trim(escapeRE(str.replace(/[,]/g, '')));
        cur.selection = {
          re: new RegExp('('+str.replace(index.delimiter, '|').replace(/(^\||\|$|\?)/g, '')+')', 'gi'),
          val: '<em>$1</em>'
        };
      }
      if (!cur.isLoading && cur.searchStr) {
        show('friends_reset_search');
      }
    } else {
      cur.curList = cur.section;
      cur.selection = false;
      hide('friends_reset_search');
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

  changeSummary: function() {
    var sum = ge('friends_summary');
    var html = '';
    if (cur.curList.indexOf('_search_') != -1 || cur.filterIds) {
      if (!cur.sectionCount) {
        if (cur.searchCount) {
          html = cur.searchSummary;
        } else {
          if (cur.isLoading) {
            return; // no update while loading
          }
          html = cur.summaryLang['search_no'];
        }
      } else {
        html = langNumeric(cur.sectionCount, cur.summaryLang['search'], true);
      }
    } else if (cur.curList.slice(0, 4) == 'list') {
      var langKey = (parseInt(cur.curList.slice(4)) < 25) ? 'list' : 'pub_list';
      if (cur.sectionCount) {
        html = langNumeric(cur.sectionCount, cur.summaryLang[langKey], true);
      } else {
        html = cur.summaryLang[langKey+'_no'];
      }
    } else if (cur.section == 'recent') {
      html = cur.summaryLang['recent'];
    } else if (cur.section == 'requests' && cur.requestsCount > 0) {
      if (cur.suggRev && cur.suggCount > 0) {
        html = langNumeric(cur.suggCount, cur.summaryLang['friends_sugg_summary'], true);
      } else {
        html = langNumeric(cur.requestsCount, cur.summaryLang[cur.section], true);
      }
    } else if (cur.section == 'requests' && cur.suggCount > 0) {
      html = langNumeric(cur.suggCount, cur.summaryLang['friends_sugg_summary'], true);
    } else if (cur.section == 'all_requests' && cur.sectionCount > 0) {
      html = langNumeric(cur.allRequestsCount, cur.summaryLang[cur.section], true);
    } else if (cur.section == 'out_requests' && cur.sectionCount > 0) {
      html = langNumeric(cur.outRequestsCount, cur.summaryLang[cur.section], true);
    } else if (cur.sectionCount > 0) {
      html = langNumeric(cur.sectionCount, cur.summaryLang[cur.section], true);
    } else {
      html = cur.summaryLang['all_no'];
    }
    if (cur.section.indexOf('list') == 0 && cur.oid == vk.id) {
      listNum = parseInt(cur.curList.substr(4));
      var list_edit_text = cur.summaryLang[(cur.sectionCount ? 'list_edit': 'list_start_edit')];
      html += '<span class="divider">|</span><span><a onclick="Friends.editList('+listNum+');">'+list_edit_text+'</a></span>';
      if (listNum < 25) {
        html += '<span class="divider">|</span><span><a onclick="Friends.deleteList('+listNum+');">'+cur.summaryLang['list_delete']+'</a></span>';
      }
    }
    if (vk.id != cur.oid) {
      html += '<span class="divider">|</span><span>' + cur.summaryLang['to_users_page'] + '</span>';
    }
    if ((cur.section == 'requests' && cur.requestsCount > 50) || cur.section == 'all_requests') {
      if (!cur.suggRev || !cur.suggCount) {
        if (nav.objLoc.sort != 'date') {
          html += '<span class="divide">|</span><span><a href="/friends?section=' + cur.section + '&sort=date">' + cur.summaryLang['friends_sort_by_date'] + '</a></span>';
        } else {
          html += '<span class="divide">|</span><span><a href="/friends?section=' + cur.section + '">' + cur.summaryLang['friends_sort_by_common'] + '</a></span>';
        }
      }

    }
    sum.innerHTML = html;

    document.title = replaceEntities(stripHTML(cur.htitles[cur.section] || cur.htitles.all));
  },
  selectTab: function(tab) {
    var section = geByClass1('active_link', ge('friends_tabs'));
    removeClass(section, 'active_link');
    addClass(ge('tab_' + tab), 'active_link');
    if (cur.oid != vk.id) {
      toggleClass(ge('main_class'), 'wide', tab != 'all' || !cur.allFriendsCount);
    }
  },
  selectSection: function(tab) {
    var section = geByClass1('cur_section', ge('sections_block'));
    removeClass(section, 'cur_section');
    addClass(ge('section_' + tab), 'cur_section');
  },
  selectSumTab: function(tab) {
    var section = geByClass1('summary_tab_sel', ge('friends_req_tabs'));
    removeClass(section, 'summary_tab_sel');
    addClass(section, 'summary_tab');
    var el = ge('sum_tab_' + tab).parentNode;
    removeClass(el, 'summary_tab');
    addClass(el, 'summary_tab_sel');
  },
  selectTabAndSection: function(type) {
    if (type == 'all' || type == 'online' || type == 'common' || type == 'members') {
      this.selectTab(type);
      this.selectSection('all');
    } else if (type == 'all_requests' || type == 'requests' || type == 'out_requests') {
      this.selectTab('requests');
      this.selectSumTab(type);
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
    //if (!updateData && (type != 'all' || cur.section != type) && type.substr(0, 4) != 'list') {
    if (!updateData && ((type == 'online' && cur.oid != vk.id) || type.indexOf('requests') != -1) && type.substr(0, 4) != 'list') {
      Friends.clearFilter();
    }
    if (!type) {
      if ((cur.requestsCount && cur.requestsCount > 0 && cur.requestsCount < 100) || cur.suggCount) {
        type = 'requests';
      } else {
        type = 'all';
      }
    }
    if (!cur.requestsCount && !cur.suggCount && !cur.allRequestsCount && !cur.outRequestsCount) {
      hide('tab_requests');
    }
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
        cur.fContent.innerHTML = '<div class="wide_loading"></div>';
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
        this.loadingState('phonebook');
        ajax.post('/al_friends.php', {act: 'phonebook', id: nav.objLoc.id}, {onDone: (function(data) {
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
          cur.friendsList[cur.section] = phoneList;
          cur.sectionCount = phoneList.length;
          cur.fContent.innerHTML = '';
          this.loadingState('phonebook', true);
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
        }).bind(this)});
        break;
      case 'recent':
        this.loadingState('recent');
        ajax.post('/al_friends.php', {act: 'recent'}, {onDone: (function(data) {
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
          this.loadingState('recent', true);
          Friends.onSectionChange();
          callback();
          if (cur.filterIds) {
            cur.curList += '_filter';
            Friends.search(cur.searchStr || -1, cur.section, false, true);
            Friends.changeSummary();
            return;
          }
          this.showMore();
        }).bind(this)});
        break;
      case 'out_requests':
        hide(cur.showMore, 'friends_hide_all');
        cur.fContent.innerHTML = '<div class="wide_loading"></div>';
        ajax.post('/friends', {act: 'out_requests'}, {onDone: (function(data, occupations) {
          var obj = eval('('+data+')');

          // load friends json
          if (!obj) {
            return;
          }
          extend(cur.occupations, occupations);
          extend(cur.friendsList, obj);

          this.indexAll(function() {
            Friends.section(type, callback);
          });
        }).bind(this)});
        break;
      default:
        if (type.substr(0, 4) == 'list') {
          this.search(-1, type, callback);
        }

    }
  },
  loadingState: function(section, state) {
    if (state) {
      if (cur.oldSection) {
        removeClass(cur.oldSection, 'loading');
      }
    } else {
      cur.oldSection = ge('section_' + section);
      addClass(cur.oldSection, 'loading');
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
  },
  drawFriend: function(friend, first, type) {
    if (cur.section == 'requests' || cur.section == 'all_requests' || cur.section == 'out_requests') {
      return cur.commonTpl(friend, type || cur.section, first);
    } else {
      return cur.friendsTpl(friend, cur.section, first);
    }
  },

  inviteToGroup: function(ev, gid, mid, invited, hash) {
    var setInvited = function(invited) {
      for(var i in cur.friendsList[cur.curList]) {
        var row = cur.friendsList[cur.curList][i];
        if (row[0] == mid) {
          row[10] = invited;
          //Friends.updateView();
          var block = ge('user_block'+mid), link = '';
          if (invited) {
            link = '<a href="" onclick="return Friends.inviteToGroup(event, '+gid+', '+mid+', 1, \''+row[11]+'\')">'+getLang('friends_cancel_invite')+'</a>';
          } else {
            link = '<a href="" onclick="return Friends.inviteToGroup(event, '+gid+', '+mid+', 0, \''+row[11]+'\')">'+getLang('friends_send_invite')+'</a>';
          }
          geByClass('actions', block)[0].innerHTML = link;
          break;
        }
      }
    }
    if (invited) {
      ajax.post('/al_page.php', {act:'a_cancel_invite', mid:mid, gid:gid, hash:hash}, {onDone:function(res){ }});
      setInvited(0);
    } else {
      ajax.post('/al_page.php', {act:'a_invite', mid:mid, gid:gid, hash:hash}, {onDone:function(res, message) {
        if (!res) {
          setInvited(0);
          ge('res'+mid).innerHTML = '<div class="res">'+message+'</div>';
          hide('lists'+mid);
          var block = ge('user_block'+mid);
          hide(geByClass('actions', block)[0]);
        }
      }});
      setInvited(1);
    }
    return false;
  },

  acceptRequest: function(mid, hash, el) {
    var controls = ge('request_controls_'+mid);
    var controlsCont = controls.parentNode;
    if (!el) {
      controls.innerHTML = '<div align="center"><img src="/images/upload.gif"></div>';
    }
    ajax.post('al_friends.php', {act: 'add', mid: mid, hash: hash, request: 1, 'select_list': 1}, {onDone: function(text) {
      controls.innerHTML = text;
      if (cur.friendsList) {
        delete cur.friendsList['recent'];
      }
    }, onFail: function(text) {
      if (!text) return;

      showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text);
      return true;
    }, showProgress: lockButton.pbind(el), hideProgress: unlockButton.pbind(el)});
    Friends.processRequest(mid, true);
    if (cur.friendsList) {
      delete cur.friendsList['online'];
      Friends.indexAll();
    }
  },

  declineRequest: function(mid, hash, el) {
    var controls = ge('request_controls_'+mid);
    var controlsCont = controls.parentNode;
    if (!el) {
      controls.innerHTML = '<div align="center"><img src="/images/upload.gif"></div>';
    }
    ajax.post('al_friends.php', {act: 'remove', mid: mid, hash: hash, report_spam: 1, from_section: cur.section}, {onDone: function(text) {
      controls.innerHTML = text;
    }, onFail: function(text) {
      if (!text) return;

      showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text);
      return true;
    }, showProgress: lockButton.pbind(el), hideProgress: unlockButton.pbind(el)});

    Friends.processRequest(mid, false);
  },

  processRequest: function(mid, add, sugg) {
    if (!cur.friendsList) {
      return;
    }
    var reqs = cur.friendsList[sugg ? 'sugg_requests' : 'requests'] || [];
    var len = reqs.length, found = false;
    while (len--) {
      if (reqs[len][0] == mid) {
        var friend = reqs.splice(len, 1)[0];
        if (sugg) {
          --cur.suggCount;
        } else {
          --cur.requestsCount;
        }
        val(geByClass1('tab_word', ge('tab_requests')), cur.summaryLang['requests_title'] + (cur.requestsCount ? ('<span class="count">+' + cur.requestsCount + '</span>') : ''));
        toggleClass(ge('tab_requests'), 'count', !!cur.requestsCount);
        if (add) {
          found = true;
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
  },

  reportSpam: function(mid, hash) {
    var controls = ge('request_controls_' + mid);
    if (!controls) {
      controls = ge('result_msg');
      removeClass(controls, 'msg');
    }
    controls.innerHTML = '<div align="center"><img src="/images/upload.gif"></div>';
    ajax.post('al_friends.php', {act: 'report_spam', mid: mid, hash: hash}, {onDone: function(text) {
      controls.innerHTML = text;
    }});
  },

  restoreFriend: function(el, id) {
    var back = el.innerHTML;
    ajax.post('al_friends.php', {act: 'add', mid: id, hash: cur.userHash, cats: cur.savedMasks[id]}, {
      onDone: Friends.onRemoveFriend.pbind(id, true),
      showProgress: function() {
        el.innerHTML = '<center><img src="/images/upload.gif" /></center>';
      },
      hideProgress: function() {
        el.innerHTML = back;
      }
    });
  },

  deleteFriend: function(e, id, el) {
    var back = el.innerHTML;
    ajax.post('al_friends.php', {act: 'remove', mid: id, hash: cur.userHash}, {
      onDone: Friends.onRemoveFriend.pbind(id, false),
      showProgress: function() {
        el.innerHTML = '<center><img src="/images/upload.gif" /></center>';
      },
      hideProgress: function() {
        el.innerHTML = back;
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

    var block = ge('user_block' + mid);
    var fr = cur.friends[mid];
    if (fr && block) {
      if (res) {
        fr[6] = cur.savedMasks[mid];
        delete(cur.savedMasks[mid]);
      } else {
        cur.savedMasks[mid] = fr[6];
        fr[6] = 0; // zero mask - removed friend
      }
      block.parentNode.replaceChild(ce('div', {innerHTML: cur.friendsTpl(fr, cur.section, hasClass(block, 'user_block_first') ? ' user_block_first' : '').join('')}).firstChild, block);
    } else {
      re(block);
    }

    Friends.indexAll(function() {
    });
  },
  showCommonBox: function(e, id, hash) {
    if (checkEvent(e)) return true;
    showBox('al_friends.php', {act: 'common_friends', mid: id, hash: hash}, {params: {bodyStyle: "padding: 0px;", dark: 1}});
    return false;
  },
  toList: function(num) {
    nav.change({'0':'al_friends.php', section:'list' + num});
    scrollToTop(0);
    return false;
  },

  /*ddShowSearchActs: function(obj, ev, uid) {
    var elems = [];
    elems.push('<a class="friends_dd_item" onclick="Friends.ddHide(ge(\'friends_dd_menu_'+uid+'\'), '+uid+');return showWriteMessageBox(event, '+uid+')">'+cur.summaryLang['global_write_msg']+'</a>');
    Friends.ddShowCustom(obj, ev, elems, uid);
  },*/

  ttActToggle: function(obj, uid, hash, add) {
    var back = obj.innerHTML;
    ajax.post('al_friends.php', {act: add ? 'add' : 'remove', mid: uid, hash: hash, from: 'friends'}, {
      onDone: function(text) {
        //re(obj);
        cur['friends_info'+uid] = add;
        showDoneBox('<div class="friends_done">'+text+'</div>')
        tooltips.destroyAll();
        //ge('friends_tt_cont_'+uid).tt.close();
      },
      showProgress: function() {
        obj.innerHTML = '<center><img src="/images/upload.gif" /></center>';
      },
      hideProgress: function() {
        obj.innerHTML = back;
      }
    })
  },

  ttActGift: function(uid) {
    return !showBox('al_gifts.php', {act: 'get_gift_box', mid: uid, fr: (uid == vk.id ? 1 : 0)}, {stat: ['gifts.css', 'ui_controls.js', 'ui_controls.css'], cache: 1, dark: 1}, false);
  },

  ttActsMenu: function(obj, ev, uid, hash) {
    if (obj.tt) {
      if (!obj.tt.show) return;
      return obj.tt.show();
    }
    if (window.tooltips) {
      tooltips.hideAll();
    }
    var info = cur['friends_info'+uid] || '';
    var html = ['<div class="friends_tt_menu">'];
    html.push('<a class="friends_tt_item" onclick="return showWriteMessageBox(event, '+uid+')"><div class="friends_tt_icon friends_tt_msg"></div>'+cur.summaryLang['global_write_msg']+'</a>');
    if (info) {
      html.push('<a class="friends_tt_item" onclick="return Friends.ttActToggle(this, '+uid+', \''+hash+'\', 0);"><div class="friends_tt_icon friends_tt_cancel"></div>'+cur.summaryLang['friends_add_cancel']+'</a>');
    } else if (!cur.friends[uid]) {
      html.push('<a class="friends_tt_item" onclick="return Friends.ttActToggle(this, '+uid+', \''+hash+'\', 1);"><div class="friends_tt_icon friends_tt_add"></div>'+cur.summaryLang['friends_add_act']+'</a>');
    }
    html.push('<a class="friends_tt_item" onclick="return Friends.ttActGift('+uid+');"><div class="friends_tt_icon friends_tt_gift"></div>'+cur.summaryLang['friends_gift_act']+'</a>');
    html.push('</div>');
    showTooltip(obj, {
      text: html.join(''),
      className: 'friends_tt wall_tt',
      shift: [0, 0, -2],
      forcetodown: 1,
      hasover: 1,
      center: 1
    });
  },

  ddShow: function(uid, obj, ev) {
    if (cur.silent) {
      cur.onSilentLoad = function() {
        Friends.ddShow(uid, obj, ev);
      };
      return;
    }

    var friend = cur.friends[parseInt(uid)];
    var cats = parseInt(friend[6]);

    var elems = [];

    var publicLists = [28, 29, 27, 25, 26];
    for (var j = 0, i; j < 5; ++j) {
      i = publicLists[j];
      if (cur.publicLists[i]) {
        elems.push('<a class="friends_dd_item'+((cats & (1 << parseInt(i))) ? ' checked' : '')+'" onclick="Friends.checkCat(this, '+uid+', '+i+');">'+cur.publicLists[i]+'</a>');
      }
    }
    for (var i in cur.userLists) {
      if (i < 25) {
        var lname = cur.userLists[i];
        if (lname.length > 20) {
          lname = trim(lname.substr(0, 18))+'...';
        }
        elems.push('<a class="friends_dd_item'+((cats & (1 << parseInt(i))) ? ' checked' : '')+'" onclick="Friends.checkCat(this, '+uid+', '+i+');">'+lname+'</a>');
      }
    }
    Friends.ddShowCustom(obj, ev, elems, uid);
  },

  ddShowCustom: function(obj, event, elems, ddId) {
    var text = obj.innerHTML;
    var pos = getXY(obj);
    var height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight);
    var posY = pos[1] - scrollGetY();
    var ddHeight = elems.length * 22;

    var params = {
      className: 'lists_menu'
    }

    var styleAdd = '';
    var headerAdd = '';

    if (posY > (height / 2) && (height - posY) < ddHeight) {
      headerAdd = ' friends_header_up';
      elems = elems.reverse();
      styleAdd = ' style="margin-top: -'+(ddHeight + 1)+'px;"';
    }

    var htmlH = ['<div id="friends_dd_menu_',ddId,'" onmouseout="Friends.ddHide(this, ',ddId,');" onmouseover="Friends.ddActive(this, ',ddId,');"><div class="lists_header', headerAdd,'"><div>', text, '</div></div><div class="lists_body" ', styleAdd,'><table cellspacing="0" cellpadding="0"><tbody><tr><td class="lists_shad_l"><div></div></td><td><div class="lists_shad_t2"></div><div class="lists_shad_t"></div><div class="lists_rows"><div id="rows3">'];

    var htmlF = '</div></div><div class="lists_shad_b"></div><div class="lists_shad_b2"></div></td><td class="lists_shad_r"><div> </div></td></tr></tbody></table></div></div>';

    params.innerHTML = htmlH.join('') + elems.join('') + htmlF;

    var dd = ce('div', params);

    obj.parentNode.insertBefore(dd, obj);
    cur.onMouseClick = function(ev) {
      var menuId = 'friends_dd_menu_'+ddId;
      var obj = ev.target;
      while (obj) {
        if (hasClass(obj, 'lists_header')) {
          break;
        }
        if (hasClass(obj, 'lists_select') || obj.id == menuId) {
          return false;
        }
        obj = obj.parentNode;
      }
      if (ev.target)
      Friends.ddHide(ge(menuId), ddId, 1);
    }
  },

  ddHide: function(obj, ddId, fast) {
    cur.timeouts['dd_fade'+ddId] = setTimeout(function() {
      fadeOut(obj, fast ? 0 : 100, function() {
        var parentEl = obj.parentNode.parentNode;
        if (parentEl) {
          parentEl.removeChild(obj.parentNode);
        }
      });
    }, fast ? 0 : 600);
  },
  ddActive: function(obj, ddId) {
    if (cur.timeouts['dd_fade'+ddId]) {
      clearTimeout(cur.timeouts['dd_fade'+ddId]);
    }
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
    if (cur.timeouts['list'+uid]) {
      clearTimeout(cur.timeouts['list'+uid]);
    }
    delete cur.friendsList['list'+listId];
    delete cur.friendsList['list'+friend[6]]
    cur.timeouts['list'+uid] = setTimeout(function() {
      ajax.post('al_friends.php', {act: 'save_cats', uid: uid, cats: friend[6], hash: cur.userHash}, {
        onDone: function(text) {
          if (from) {
            var info = ge('friends_added_'+uid);
            if (!cur['fr_add_text_'+uid] && info) {
              cur['fr_add_text_'+uid] = info.innerHTML;
            }
            fadeTo(info, 100, 0, function() {
              info.innerHTML = text;
              fadeTo(info, 100, 1);
            });
            clearTimeout(cur['fr_add_timeout_'+uid]);
            cur['fr_add_timeout_'+uid] = setTimeout(function() {
              fadeTo(info, 100, 0, function() {
                info.innerHTML = cur['fr_add_text_'+uid];
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
        info.push('<span class="group', (i - 1) % 8 + 1, ' fl_l" onmousedown="Friends.toList(', i, ');">', cur.publicLists[i], '</span>');
      }
    }
    if (vk.id == cur.oid) {
      for (var i in cur.userLists) {
        if ((1 << i) & cats && !cur.publicLists[i] && cur.userLists[i]) {
          info.push('<span class="group', (i - 1) % 8 + 1, ' fl_l" onmousedown="Friends.toList(', i, ');">', cur.userLists[i], '</span>');
        }
      }
    }
    return info.join('');
  },
  subscribeAllRequests: function(obj, hash) {
    ajax.post('al_friends.php', {act: 'subscribe_all_requests', hash: hash, once: 1}, {
      showProgress: lockButton.pbind(obj),
      hideProgress: unlockButton.pbind(obj)
    });
  },
  onAllRequestsRemove: function() {
    return nav.go('/friends?section=all_requests', false, {nocur: true});
  },
  editList: function(listId) {
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
      list_name: (listId ? cur.userLists[listId] : ''),
      list_id: listId
    }, {
      stat: ['privacy.js', 'ui_controls.js', 'ui_controls.css'],
      dark: 1,
      cache: 1,
      onFail: function(text) {
        setTimeout(showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text).hide, 3000);
        return true;
      }
    });
    cur.onFlistSave = function (ids, list, hash, title) {
      var friendsList = [];
      for (var i in list) {
        friendsList.push(parseInt(i));
      }

      ajax.post('al_friends.php', {act: 'save_list', title: title, cat_id: listId, Friends: friendsList.join(','), hash: hash}, {
        onDone: function(id, title) {
          Friends.editListClient(listId, id, title, friendsList);
        },
        onFail: function(text) {
          setTimeout(showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text, getLang('global_close')).hide, 4000);
          return true;
        }
      });

      Friends.clearFilter();

      return false;
    };

  },
  editListClient: function(listId, id, title, friendsList) {
    var listName = 'list' + id;
    if (listId == 0) {
      var html = '<a onmousedown="return nav.change({\'0\':\'al_friends.php\', section:\'list'+id+'\'});" id="section_list'+id+'" class="side_filter">'+title+'</a>';
      ge('sections_block').insertBefore(ce('div', {
        innerHTML: html
      }), ge('friends_create_list'));
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
      //Friends.indexAll();
      Friends.indexAll();
      removeClass(ge('main_class'), 'no_lists');
      return nav.change({'0':'friends', section: listName});
    } else {
      if (id < 25) {
        ge('section_list'+id).innerHTML = title;
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
        nav.setLoc({'0':'friends', section: listName});
      });
    }
  },
  createList: function(event) {
    Friends.editList(0);
  },
  deleteList: function(listId) {
    showBox('al_friends.php', {act: 'delete_list_box', list_id: listId}, {params: {bodyStyle: 'padding: 20px; line-height: 160%;', dark: 1}});
  },
  deleteListClient: function(listId) {
    var listSection = ge('section_list'+listId);
    listSection.parentNode.removeChild(listSection);
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
    //Friends.indexAll();
    return nav.change({'0':'friends', section:'all'});
  },
  searchForFriends: function() {
    showBox('al_friends.php', {act: 'search'}, {stat: ['friends_search.js', 'friends_search.css'], dark: 1});
  },
  selectList: function(obj, id, event) {
    Friends.ddShow(id, obj, event);
  },
  _animDelX: function(color, new_active, post) {
    if (post === undefined) {
      post = new_active;
      new_active = undefined;
    }
    var el = ge('delete_row' + post);
    if (!el) return;
    if (new_active !== undefined) {
      el.active = new_active;
    } else if (el.active) {
      return;
    }
    animate(el, {backgroundColor: color}, 200);
  },
  hideSuggestion: function(mid, hash, el) {
    var controls = ge('request_controls_'+mid);
    var controlsCont = controls.parentNode;
    (el || controls).innerHTML = '<div align="center"><img src="/images/upload.gif"></div>';
    ajax.post('al_friends.php', {act: 'hide_suggestion', mid: mid, hash: hash, report_spam: 1}, {onDone: function(text) {
      controls.innerHTML = text;
      cur.suggCount -= 1;
    }, onFail: function(text) {
      if (!text) return;

      showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text);
      return true;
    }});
    Friends.processRequest(mid, false, true);

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
    }, {stat: ['privacy.js', 'privacy.css', 'indexer.js', 'profile.css'], params: {dark: 1}});
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
  },
  getAgeFromData: function(max, opts) {
    max = parseInt(max);
    if (!max > 0) max = opts.ageTo;
    return Friends.getRangeData(opts.ageFrom, max, 1, opts.langAgeFrom+' ', opts.langAgeFromEmpty);
  },
  getAgeToData: function(min, opts) {
    min = parseInt(min);
    if (!min > 0) min = opts.ageFrom;
    return Friends.getRangeData(min, opts.ageTo, 1, opts.langAgeTo+' ', opts.langAgeToEmpty);
  },
  getRangeData: function(min, max, step, prefix, label) {
    if (min > max) return false;
    var ret = [[0, label]];
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
        width: 150,
        zeroPlaceholder: true,
        placeholder: opts.citiesPl,
        placeholderColor: '#777',
        //selectedItems: '{$school_year}',
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
        placeholderColor: '#777',
        width: 70,
        onChange: function(value){
         cur.ageToFilter.setData(Friends.getAgeToData(value, opts));
         Friends.changeFilter();
        }
      });

      cur.ageToFilter = new Dropdown(ge('friends_age_to'), Friends.getAgeToData(opts.ageFrom, opts), {
        zeroPlaceholder: true,
        placeholderColor: '#777',
        width: 70,
        onChange: function(value){
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
  clearFilter: function(fireEvent) {
    if (!cur.cityFilter) return;
    cur.cityFilter.selectItem(0, false);
    cur.ageFromFilter.selectItem(0, false);
    cur.ageToFilter.selectItem(0, false);
    Friends.radioFilter(ge('friends_radio_any'), 0, false);
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
      cur.fContent.innerHTML = '<div class="wide_loading"></div>';
      return;
    }
    cur.filter = Friends.filterParams();
    if (cur.filter) {
      ajax.post('friends', extend({act: 'filter_friends', uid: cur.oid}, cur.filter), {
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
          Friends.search(cur.searchStr || -1, cur.section, false, true);
          Friends.changeSummary();
        },
        progress: 'friends_fltr_progress',
        cache: 1
      })
    } else {
      if (cur.filterIds) {
        cur.filterIds = false;
      }
      Friends.updateList();
    }
  },

  bigphOver: function(obj, uid) {
    if (!window.lang || !lang.global_photo_full_size || browser.mobile) return;
    var o = obj.firstChild, ch = cur.bigphCache[uid];
    if (o.tagName != 'A' || o.className != 'friends_bigph') {
      (o = obj.insertBefore(ce('a', {className: 'friends_bigph', href: ch && ch._id ? ('/photo' + ch._id + '?all=1') : ('/albums' + uid), innerHTML: '<span class="friends_bigph_label">' + getLang('global_photo_full_size') + '</span>'}), obj.firstChild)).onclick = Friends.bigphClick.pbind(uid);
      o._uid = uid;
    }

    clearTimeout(o.hideTO);
    animate(o, {marginTop: 75}, {duration: 200, transition: Fx.Transitions.easeOutCirc});
    cur.bigphShown[uid] = o;

    if (ch === undefined) {
      cur.bigphCache[uid] = 'load';
      ajax.post('al_photos.php', {act: 'fast_get_photo', oid: uid}, {onDone: function(res) {
        if (!res) {
          obj.onmouseover = function() {};
          re(obj.firstChild);
          return;
        }
        var sh = (cur.bigphCache[uid] == 'show');
        cur.bigphCache[uid] = res;
        o.href = '/photo' + res._id + '?all=1';
        if (sh) Friends.bigphClick(uid);
      }, onFail: function() {
        obj.onmouseover = function() {};
        re(obj.firstChild);
        return true;
      }});
    }

    if (!obj.onmouseout) obj.onmouseout = Friends.bigphOut.pbind(obj);
  },
  bigphOut: function(obj) {
    var o = obj.firstChild;
    if (!o || o.tagName != 'A' || o.className != 'friends_bigph') return;

    clearTimeout(o.hideTO);
    o.hideTO = setTimeout(function() {
      animate(o, {marginTop: 100}, 200);
      if (cur.bigphShown && cur.bigphShown[o._uid]) {
        delete(cur.bigphShown[o._uid]);
      }
    }, 150);
  },
  bigphClick: function(uid, ev) {
    if (checkEvent(ev) !== false) return;

    var ch = cur.bigphCache[uid];
    if (ch == 'load' || ch == 'show') {
      cur.bigphCache[uid] = 'show';
      return cancelEvent(ev);
    }
    if (!ch) return;
    return showPhoto(ch._id, 'album' + uid + '_0/rev', extend({jumpTo: {z: 'albums' + uid}}, ch), ev);
  },
  findAdd: function(mid, hash, el) {
    ajax.post('al_friends.php', {act: 'add', mid: mid, hash: hash, request: 1, 'short_resp' : 1}, {onDone: function(text) {
      var cont = el.parentNode.parentNode;
      cont.innerHTML = '<div class="friends_imp_status" style="display: none;">'+text+'</div>';
      fadeIn(cont.firstChild, 200);
    }, onFail: function(text) {
      if (!text) return;
      showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text);
      return true;
    }, showProgress: lockButton.pbind(el), hideProgress: unlockButton.pbind(el)});
  }
}

extend(Friends, {
  rowOver: Friends._animDelX.pbind('#C4D2E1'),
  rowOut: Friends._animDelX.pbind('#FFF'),
  activeDeleteRow: function(post, tt) {
    Friends._animDelX('#6B8DB1', 1, post);
    if (tt) showTooltip(ge('delete_row' + post), {text: tt, showdt: 500, black: 1});
  },
  deactiveDeleteRow: Friends._animDelX.pbind('#C4D2E1', 0),
  deleteRow: function(row, hash) {
    rowInfo = row.split('_');
    var obj = ge('suggestion'+row);
    if (hasClass(obj, 'user_block_first')) {
      nobj = obj.nextSibling;
      while (nobj && !isVisible(nobj)) {
        nobj = nobj.nextSibling;
      }
      if (nobj) {
        if (nobj.id == 'friends_sub_summary') {
          var summ = nobj.childNodes[0].innerHTML;
          ge('friends_summary').innerHTML = summ;
          re(nobj);
        } else if (nobj.className) {
          addClass(nobj, 'user_block_first')
        }
      }
    }
    slideUp('suggestion' + row, 100);
    if (tooltips) {
      tooltips.hide(ge('delete_row' + row))
    }
    ajax.post('al_friends.php', {act: 'hide_possible', mid: rowInfo[1], hash: hash}, {onDone: function() {
    }});
    cur.importCount -= 1;
  }
});

try{stManager.done('friends.js');}catch(e){}
