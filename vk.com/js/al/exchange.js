var Exchange = {
  initOfficesMenu: function(event) {

    if (!window.DropdownMenu || !cur.mainNavigationOfficesItems) {
      return;
    }

    if (cur.navigationOficesMenu) {
      return;
    }

    ge('ads_navigation_offices_menu').removeAttribute('onmouseover');

    function hideMenu() {
      cur.navigationOficesMenu.hide();
    }

    var realLocation = '';
    if (location.hash.indexOf('#/') != -1 || location.hash.indexOf('#!') != -1) {
      realLocation = location.hash.replace('#/', '').replace('#!', '');
    } else {
      realLocation = location.pathname + location.search;
    }

    var unionId;
    var unionIdReal;
    var unionIdParam = '';
    var curItems = [];
    for (var i in cur.mainNavigationOfficesItems) {
      curItems[i] = {};
      curItems[i].onClick = hideMenu;
      for (var j in cur.mainNavigationOfficesItems[i]) {
        curItems[i][j] = cur.mainNavigationOfficesItems[i][j];
      }

      unionId = '';
      unionIdReal = intval(curItems[i].i);
      unionIdParam = '';
      if (curItems[i].i.indexOf('default') == -1) {
        unionId = unionIdReal;
        unionIdParam = "&union_id=" + unionIdReal;
      }

      var link = "/exchange?act=office" + unionIdParam;
      var onclick = false;
      if (!unionIdReal) {
        //link = "/exchange?act=no_office";
        link = "/exchange?act=office";
        onclick = function(event) {
          hideMenu();
          return showWiki({w: 'new_ad_union', create: 1}, false, event, {queue: true});
        }
      } else if (cur.getOfficeLink) {
        link = cur.getOfficeLink(unionId);
      } else if (realLocation.match(/act=budget(&|$)/)) {
        link = "/exchange?act=budget" + unionIdParam;
      } else if (realLocation.match(/act=export_stats(&|$)/)) {
        link = "/exchange?act=export_stats" + unionIdParam;
      } else if (realLocation.match(/act=settings(&|$)/)) {
        link = "/exchange?act=settings" + unionIdParam;
      }

      curItems[i].h = link;
      if (onclick) {
        curItems[i].onClick = onclick;
      }
    }

    var options = {
      title: '<span id="ads_navigation_dd_menu_header_text">' + ge('ads_navigation_offices_menu_text').innerHTML + '</span>',
      containerClass: 'ads_navigation_dd_menu_header_wrap',
      target: ge('ads_navigation_offices_menu'),
      showHover: false,
      updateTarget: false,
      onSelect: function(e) {
      }
    };
    cur.navigationOficesMenu = new DropdownMenu(curItems, options);
    cur.destroy.push(function(){ cur.navigationOficesMenu.destroy(); });
  },

  initScroll: function() {
    Exchange.scrollnode = browser.msie6 ? pageNode : window;
    Exchange.deinitScroll();
    window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0;
    addEvent(Exchange.scrollnode, 'scroll', Exchange.scrollCheck);
    addEvent(window, 'resize', Exchange.scrollCheck);
  },
  deinitScroll: function() {
    removeEvent(Exchange.scrollnode, 'scroll', Exchange.scrollCheck);
    removeEvent(window, 'resize', Exchange.scrollCheck);
  },
  scrollCheck: function() {
    if (browser.mobile || cur.isSearchLoading || cur.disableAutoMore) return;

    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY(), lnk = ge('exchange_more_results');

    if (!isVisible(lnk)) return;
    if (st + ch + 300 > lnk.offsetTop) {
      if (lnk.nodeName != 'A') {
        lnk = geByTag1('a', lnk);
      }
      lnk.onclick();
    }
  },

  initCommunitySearch: function() {
    Exchange.initScroll();
    cur.destroy.push(function(c) {
      if (c == cur) Exchange.deinitScroll();
    });

    placeholderSetup('exchange_search_input', {back: true});
    each(['filter_cost_to', 'filter_reach', 'filter_preach', 'filter_size'], function (i, val) {
      placeholderSetup(val);
      addEvent(val, 'change', Exchange.updateCommunitySearch);
      addEvent(val, 'keydown', function(event) {
        if (event.keyCode == KEY.ENTER) Exchange.updateCommunitySearch();
      });
    });
  },

  getSearchParams: function(obj) {
    var params = {
      q: trim(val(obj)), load: 1, cache: 1,
      offset: cur.searchOffset || 0,
      sort: cur.searchSortBy || '',
      r: cur.searchSortRev || 0,
      cost_to: val('filter_cost_to'),
      reach: val('filter_reach'),
      preach: val('filter_preach'),
      size: val('filter_size'),
      category: cur.uiCategory.val(),
      country: cur.uiCountry.val(),
      city: cur.uiCity.val(),
      sex: cur.uiSex.val(),
      age: cur.uiAge.val(),
    };
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

  updateCommunitySearch: function(obj, delay, sort, save_offset) {
    obj = obj || ge('exchange_search_input');
    delay = delay || 10;
    if (sort != undefined)  {
      cur.searchSortRev = !cur.searchSortRev && (cur.searchSortBy == sort || sort == 'cost') ? 1 : 0;
      cur.searchSortBy = sort;
    }
    if (!save_offset) {
      cur.searchOffset = 0;
    }
    clearTimeout(cur.searchTimeout);
    cur.searchTimeout = setTimeout((function() {
      var params = Exchange.getSearchParams(obj);
      if ((!Exchange.sameParams(params) || cur.ignoreEqual)) {
        delete cur.ignoreEqual;
        cur.params = params;
        Exchange.searchCommunity();
      }
      if (!params.offset) {
        scrollToTop();
      }
    }).bind(this), delay);
  },
  searchCommunity: function() {
    var query = cur.params || Exchange.getSearchParams(ge('exchange_search_input'));

    ajax.post('/exchange?act=community_search' + (cur.post_id ? '&ad_id='+cur.post_id : '&union_id='+cur.union_id), query, {
      cache: 1,
      onDone: function(rows, showMore) {
        var more_lnk = ge('exchange_more_results');
        if (query['offset'] > 0) {
          var tbl = ge('exchange_comm_search_table').tBodies[0];
          if (rows) {
            if (!browser.msie) {
              tbl.insertAdjacentHTML('beforeEnd', rows);
            } else {
              var t = se('<table>'+rows+'</table>');
              var rows = geByTag('tr', t);
              for (i in rows) {
                if (rows[i].nodeType == 1) tbl.appendChild(rows[i]);
              }
            }
            tbl.appendChild(more_lnk);
          }
        } else {
          ge('exchange_comm_search_table').innerHTML = rows;
          cur.searchOffset = 0;
        }
        if (showMore) {
          show('exchange_more_results');
        } else {
          hide('exchange_more_results');
        }

        each(query, function(i, v) {
          if (v && v != 0 && i != 'load' && i != 'cache' && i != 'offset') {
            nav.objLoc[i] = v;
          } else {
            delete nav.objLoc[i];
          }
        });
        nav.setLoc(nav.objLoc);
      },
      showProgress: function() {
        addClass(ge('exchange_search_wrap'), 'loading');
        cur.isSearchLoading = true;
      },
      hideProgress: function() {
        removeClass(ge('exchange_search_wrap'), 'loading');
        cur.isSearchLoading = false;
      }
    });
  },
  clearCommunitySearch: function() {
    var field = ge('exchange_search_input');
    val(field, '');
    elfocus(field);
    Exchange.updateCommunitySearch(field);
  },
  searchCommunityShowMore: function() {
    var offset = cur.searchOffset || 0;
    offset += cur.searchPerPage;
    cur.searchOffset = offset;
    hide('exchange_more_results');
    Exchange.updateCommunitySearch(ge('exchange_search_input'), 10, undefined, true);
    return false;
  },
  switchSubTab: function(el, wrap, link, evt, params) {
    if (checkEvent(evt) || hasClass(el, 'active')) return false;
    each(geByClass('exchange_subtab1', ge(wrap)), function(i, v) {
      removeClass(v, 'active');
    });
    addClass(el, 'active');
    if (params.part) {
      var obj = nav.fromStr(link), url = obj[0];
      delete obj[0];
      ajax.post(url, extend(obj, {part: 1}), {
        onDone: params.onDone.pbind(obj)
      });
      return false;
    }
    return nav.go(link, evt);
  },
  getPage: function(offset, wrap) {
    var obj = clone(nav.objLoc), url = obj[0];
    delete obj[0];
    ajax.post(url, extend(obj, {offset: offset, part: 1}), {
      onDone: function(res) {
        ge(wrap || 'exchange_requests_table_wrap').innerHTML = res;
        nav.setLoc(extend(nav.objLoc, {offset: offset}));
      }
    });
    return false;
  },
  reArrangeRows: function(className) {
    var rows = geByClass(className), k = 0;
    if (!rows.length) {
      nav.reload();
    }
    for (var j in rows) {
      toggleClass(rows[j], 'even', k++ % 2 > 0)
    }
  },
  addRequest: function(gid, ad_id, from_office) {
    return !showBox('/exchange', {act: 'a_request_box', gid: gid, ad_id: ad_id, from_office: from_office}, { params: {width: '430px', dark: true, bodyStyle: 'padding: 0px;', hideButtons: true}});
  },
  deleteRequest: function(gid, ad_id, request_id, from_office, hash, show_comment) {
    var bodyStyle = 'line-height: 160%; padding: 16px 20px;';
    if (show_comment) {
      bodyStyle += ' background-color: #F7F7F7';
    }
    var boxWidth = show_comment ? 370 : 430;
    var doDeleteRequest = function() {
      ajax.post('/exchange', {act: 'a_delete_request', gid: gid, ad_id: ad_id, request_id: request_id, from_office: from_office, comment: ge('exchange_box_comment') && val('exchange_box_comment') || '', hash: hash}, {
        progress: curBox().progress,
        onDone: function() {
          curBox().hide();
          re('exchange_request' + request_id);
          Exchange.reArrangeRows('exchange_request_row');
        },
        onFail: function(text) {
          ge('exchange_box_error').innerHTML = text;
          show('exchange_box_error');
          return true;
        }
      });
    }
    cur.doDeleteRequest = doDeleteRequest;
    var box = showFastBox({title: getLang('ads_posts_sure_delete_title'), dark: true, width: boxWidth, bodyStyle: bodyStyle, hideButtons: show_comment}, '<div id="exchange_box_error" class="error" style="display: none;"></div><div>' + getLang('ads_posts_sure_delete_text') + '</div><div id="exchange_box_comment_wrap" class="clear_fix" style="display:none;"><textarea id="exchange_box_comment" placeholder="' + getLang('ads_posts_delete_placeholder') +'" onkeypress="onCtrlEnter(event, cur.doDeleteRequest)"></textarea><div class="exchange_box_send_wrap button_blue fl_r"><button id="exchange_box_send" onclick="cur.doDeleteRequest()">' + getLang('ads_posts_delete') + '</button></div></div>', getLang('ads_posts_delete'), doDeleteRequest, getLang('global_cancel'));
    if (show_comment) {
      show('exchange_box_comment_wrap');
      placeholderSetup('exchange_box_comment', {back: true});
      autosizeSetup('exchange_box_comment', {minHeight: 45, maxHeght: 200});
    }
    return false
  },
  checkFromAndToDates: function() {
    var time_from = new Date(val('exchange_request_time_from_d')*1000);
    var time_to = new Date(val('exchange_request_time_to_d')*1000);
    if ((time_from.getHours()*100 + time_from.getMinutes()) > (time_to.getHours()*100 + time_to.getMinutes())) {
      show(ge('exchange_request_box_next_day'));
    } else {
      hide(ge('exchange_request_box_next_day'));
    }
  },
  sendRequest: function(gid, ad_id, price, hash, from_office, btn) {
    ajax.post('/exchange', {act: 'a_save_request', ad_id: ad_id, gid: gid, price: price, from_office: from_office, hash: hash, text: val('exchange_request_comment'), time_from: val('exchange_request_time_from_d'), time_to: val('exchange_request_time_to_d'), date_from: val('exchange_request_date_from'), date_to: val('exchange_request_date_to')}, {
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn),
      onDone: function (data) {
        curBox().hide();
        var box = showFastBox({title: getLang('ads_posts_request_sent_title'), dark: true, width: 430, bodyStyle: 'line-height: 160%; padding: 16px 20px;'}, data.message);
        setTimeout(function () {
          box.hide();
        }, 3000);
        return true;
      },
      onFail: function(msg) {
        ge('exchange_request_box_error').innerHTML = msg;
        show('exchange_request_box_error');
        return true;
      }
    });
    return false;
  },
  updatePostActions: function () {
    ajax.post('/exchange', {act: 'a_update_actions', ad_id: cur.ad_id}, {
      showProgress: function () {
        lockButton(ge('exchange_status_btn'));
      },
      hideProgress: function () {
        unlockButton(ge('exchange_status_btn'));
      },
      onDone: function (actions) {
        ge('exchange_post_info_actions').innerHTML = actions;
      },
      onFail: function(msg) {
        Exchange.showError(msg);
        return true;
      }
    });
  },
  editPost: function() {
    this.showMsg(getLang('ads_posts_edit_notice'));
    cur.startedEditingPost = false;
    cur.exchangeCheckEditPostTimer = setInterval(function () {
      if (cur.editingPost && !cur.startedEditingPost) {
        cur.startedEditingPost = true;
      } else if (!cur.editingPost && cur.startedEditingPost) {
        cur.startedEditingPost = false;
        Exchange.updatePostActions();
        if (cur.exchangeCheckEditPostTimer) {
          clearInterval(cur.exchangeCheckEditPostTimer);
          cur.exchangeCheckEditPostTimer = null;
        }
      }
    }, 500);
    return wall.editPost(cur.postRaw, {from: 'exchange'}, false, Exchange.showFullPost);
  },
  showFullPost: function() {
    removeClass('exchange_post_msg_wrap', 'short');
    setStyle('exchange_post_msg', {maxHeight: 'none'});
  },
  slideFullPost: function() {
    if (!ge('exchange_post_msg_wrap') && !hasClass('exchange_post_msg_wrap', 'short')) {
      return;
    }

    var realSize = getSize(ge('wpt' + cur.postRaw))[1];
    animate(ge('exchange_post_msg'), {maxHeight: realSize}, 200, Exchange.showFullPost);
    animate(ge('exchange_post_msg_more'), {height: 0}, 200);
  },
  archivePost: function(ad_id, status, hash, from) {
    var doArchivePost = function(ad_id, status, hash) {
      addClass('exchange_info_archive', 'loading');
      ajax.post('/exchange', {act: 'a_archive', ad_id: ad_id, status: status, from: from || '', hash: hash}, {
        onDone:function(link) {
          if (ge('exchange_info_archive')) {
            ge('exchange_info_archive').innerHTML = link;
          }
          toggle('exchange_info_actions', status != 2);
          toggle('exchange_info_in_archive', status == 2);
        },
        hideProgress: removeClass.pbind('exchange_info_archive', 'loading')
      });
    }
    if (status == 2) {
      var box = showFastBox({title: getLang('ads_posts_sure_archive_title'), dark: true, width: 430, bodyStyle: 'line-height: 160%; padding: 16px 20px;'}, getLang('ads_posts_sure_archive_text'), getLang('ads_posts_archive_btn'), function() {
        box.hide();
        doArchivePost(ad_id, status, hash, from);
      }, getLang('global_cancel'));
    } else {
      doArchivePost(ad_id, status, hash, from);
    }
    return false;
  },
  changeStatusLink: function(link, ad_id, status, hash) {
    var progress = ce('img', {src: '/images/upload.gif'});
    function lockChangeStatus() {
      link.parentNode.replaceChild(progress, link);
    };
    function unlockChangeStatus() {
      progress.parentNode.replaceChild(link, progress);
    }
    function updateStatusInTable(status) {
      if (!status) return;
      link.parentNode.innerHTML = status;
    }
    return Exchange.changeStatus(ad_id, status, hash, false, false, lockChangeStatus, unlockChangeStatus, updateStatusInTable);
  },
  changeStatus: function(ad_id, status, hash, addParams, force, lock, unlock, updateStatus) {
    if (status == 3 && !force) {
      var box = showBox('/exchange', {act: 'a_review_box', ad_id: ad_id, hash: hash}, {params: {width: 450, bodyStyle: 'padding: 20px;'}, dark: 1, onFail: Exchange.onBoxFail});
      box.postData = function(addParams) {
        Exchange.changeStatus(ad_id, status, hash, addParams, true, lock, unlock, updateStatus);
      };
      if (updateStatus) {
        requestBox(box, updateStatus);
      }
    } else {
      var box = curBox();
      var params = {ad_id: ad_id, status: status, hash: hash, from: !updateStatus ? 'button' : 'table'};
      if (addParams) {
        params = extend(params, addParams);
      }

      ajax.post('/exchange?act=a_change_status', params, {
        onDone: function(response, status) {
          if (box && box.onDone) {
            box.onDone(response);
            box.hide();
          } else if (updateStatus) {
            updateStatus(response);
          } else {
            if (box) box.hide();
            var status_wrap = ge('exchange_info_status').parentNode.parentNode;
            ge('exchange_status_btn').parentNode.parentNode.innerHTML = response;
            if (status) {
              ge('exchange_info_status').innerHTML = status;
              show(status_wrap);
            } else {
              hide(status_wrap);
            }
          }
        },
        onFail: function(msg) {
          var errorMessage = msg ? msg : getLang('ads_error_unexpected_error_try_later');
          if (box) {
            Exchange.showError(msg, box.bodyNode);
          } else {
            showFastBox(getLang('ads_cant_start_offer_box_title'), errorMessage);
          }
          return true;
        },
        showProgress: function() {
          if (box) {
            box.showProgress();
          }
          if (lock) {
            lock();
          } else if (!box) {
            lockButton('exchange_status_btn');
          }
        },
        hideProgress: function() {
          if (box) {
            box.hideProgress();
          }
          if (unlock) {
            unlock();
          } else if (!box) {
            unlockButton('exchange_status_btn');
          }
        }
      });
    }
  },
  showMsg: function(text, parentEl) {
    re('exchange_error');
    var msg = ge('exchange_msg');
    if (!msg) {
      var parent = parentEl || ge('ads_page');
      msg = parent.insertBefore(ce('div', {id: 'exchange_msg', className: 'msg'}), parent.firstChild);
    }
    msg.innerHTML = text;
    msg.style.backgroundColor = '#F4EBBD';
    animate(msg, {backgroundColor: '#F9F6E7'}, 2000);
    return true;
  },
  showError: function(text, parentEl) {
    re('exchange_msg');
    var err = ge('exchange_error');
    if (!err) {
      var parent = parentEl || ge('ads_page');
      err = parent.insertBefore(ce('div', {id: 'exchange_error', className: 'error'}), parent.firstChild);
    }
    err.innerHTML = text;
    err.style.backgroundColor = '#FACEBB';
    animate(err, {backgroundColor: '#FFEFE8'}, 2000);
    return true;
  },
  onBoxFail: function(message) {
    if (!message) {
      message = getLang('global_unknown_error');
    }
    setTimeout(function(){
      showFastBox(getLang('ads_error_box_title'), message);
    }, 1);
    return true;
  },
  createUnion: function(btn, hash) {
    ajax.post('/exchange?act=a_new_union', {hash: hash}, {
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn),
      onFail: function(msg) {
        if (msg) {
          ge('exchange_new_union_error').innerHTML = msg;
          show('exchange_new_union_error');
        }
        return true;
      }
    })
    return false;
  },
  checkMessageURLs: function(message, callback) {
    var rx = /([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+[a-z]{2,6})(\/.*?)?(\#.*?)?)(&nbsp;|[ \t\r\n \u00A0]|$)/i, matches;
    if (message && (matches = message.match(rx))) {
      message = message.substr(matches.index + matches[0].length);
      var url = matches[2],
          query = matches[5] || '';
      if (!url.match(/^https?:\/\//)) {
        url = 'http://' + url;
      }
      var post_raw = false;
      if (matches[4].match(/(^|\.|\/\/)(vkontakte\.ru|vk\.com)/)) {
        post_raw = query.match(/wall(-?\d+_?\d+)$/);
      }
      if (post_raw && post_raw[1]) {
        post_raw = post_raw[1];
      } else {
        post_raw = false;
      }
      return post_raw;
    }
  },
  reInitComposer: function(repost) {
    var composer = data(cur.pbField, 'composer');
    if (composer) {
      Composer.reset(composer);
    }
    Wall.deinitComposer(cur.pbField);
    Wall.initComposer(cur.pbField, {
      lang: {
        introText: getLang('profile_mention_start_typing'),
        noResult: getLang('profile_mention_not_found')
      },
      media: {
        lnk: domFC(ge('pb_add_media')),
        preview: ge('pb_media_preview'),
        types: (repost ? cur.repostTypes : cur.postTypes),
        options: {
          limit: repost ? 1 : 10,
          disabledTypes: repost ? ['album', 'share', 'link', 'page'] : undefined,
          toggleLnk: true,
          nocl: repost ? 1 : undefined,
          editable: repost ? undefined : 1,
          sortable: repost ? undefined : 1,
          teWidth: 450,
          teHeight: 260
        },
        checkLen: repost ? undefined : PostBox.postChanged
      }
    });
  },
  addClient: function(union_id) {
    return !showBox('/exchange', {act: 'a_create_client_box', union_id: union_id}, { params: {width: '315px', dark: true, bodyStyle: 'padding: 20px;'}});
  },
  createClient: function(union_id, hash) {
    var name = trim(val('new_union_name'));
    if (!name) {
      notaBene('new_union_name');
      return;
    }

    ajax.post('/exchange?act=a_create_client', {union_id: union_id, hash: hash, name: name}, {
      onFail: function(msg) {
        if (curBox()) {
          Exchange.showError(msg, curBox().bodyNode);
        }
        return true;
      }
    });
  },
  changePeriod: function(period, event) {
    if (cur.loadingPeriod) {
      return;
    }
    cur.loadingPeriod = true;
    var params = clone(nav.objLoc);
    delete params[0];
    ajax.post('/exchange', extend(params, {period: period, load: 1}), {
      cache: 1,
      hideProgress: function() {
        cur.loadingPeriod = false;
      },
      onDone: function(rows, tabs) {
        ge('exchange_clients_list').innerHTML = rows;
        ge('exchange_stats_period_tabs').innerHTML = tabs;
      }
    });
  },
  openHelpBox: function(type, unionId) {
    showBox('/exchange?act=a_help_text_box', {type: type, union_id: unionId}, {params: {width: 450, dark: 1, bodyStyle: 'padding: 20px;'}, cache: 1});
    return false;
  },
  initExportStats: function (topUnionId, watchControls, union_created_date, hash) {
    cur.topUnionId = topUnionId;
    cur.watchControls = watchControls;
    cur.unionCreatedDate = union_created_date;
    cur.exportStatsHash = hash;
    cur.storedDate = {};

    Ads.getNamespace('exchange_export_stats').stats_period.options.onSelect = Exchange.onExportStatsPeriodChanged;
  },
  onExportStatsPeriodChanged: function (event) {
    switch (event.target.index) {
      default: // dates
        cur.exportUi.start_time.setMode('d');
        if (cur.storedDate.start_time) {
          cur.exportUi.start_time.setDate(cur.storedDate.start_time.year, cur.storedDate.start_time.month, cur.storedDate.start_time.day);
        }

        cur.exportUi.stop_time.setMode('d');
        if (cur.storedDate.stop_time) {
          cur.exportUi.stop_time.setDate(cur.storedDate.stop_time.year, cur.storedDate.stop_time.month, cur.storedDate.stop_time.day);
        }
        break;
      case 1: // months
        cur.exportUi.start_time.setMode('m');
        cur.exportUi.stop_time.setMode('m');
        break;
      case 2: // all time
        cur.exportUi.start_time.setMode('d');
        cur.exportUi.stop_time.setMode('d');

        cur.storedDate.start_time = clone(cur.exportParamsData.start_time);
        cur.storedDate.stop_time = clone(cur.exportParamsData.stop_time);

        cur.exportUi.start_time.setDate(cur.unionCreatedDate.year, cur.unionCreatedDate.month, cur.unionCreatedDate.day);
        cur.exportUi.stop_time.setDate();

        cur.exportUi.start_time.setMode('h');
        cur.exportUi.stop_time.setMode('h');
        break;
    }
  },
  submitExportStatsForm: function () {
    if (!Ads.lock('exchange_stat_export', function () {
      lockButton(cur.exportExchangeStatButton);
    }, function () {
      unlockButton(cur.exportExchangeStatButton);
    })) {
      return false;
    }
    var isExportMethodHtml = (Ads.getNamespace('exchange_export_stats').export_method.value == 0);
    var topUnionIdParam = (cur.topUnionId ? '&union_id=' + cur.topUnionId : '');
    var downloadWatcherCookieName = 'dwcookie';
    var downloadWatcherCookieValue = Math.random();
    var postFormParams = {
      method: 'post',
      action: '/exchange?act=get_export_stats' + topUnionIdParam
    };

    if (isExportMethodHtml) {
      var postFields = {};
      for (var id in cur.watchControls) {
        postFields[cur.watchControls[id]] = Ads.getNamespace('exchange_export_stats')[cur.watchControls[id]].value;
      }
      postFields['start_time'] = cur.exportParamsData.start_time.year + ('0'+cur.exportParamsData.start_time.month).slice(-2) + ('0'+cur.exportParamsData.start_time.day).slice(-2);
      postFields['end_time'] = cur.exportParamsData.stop_time.year + ('0'+cur.exportParamsData.stop_time.month).slice(-2) + ('0'+cur.exportParamsData.stop_time.day).slice(-2);
      postFields['dwcookie'] = downloadWatcherCookieValue;
      postFields['hash'] = cur.exportStatsHash;

      ajax.post('/exchange?act=get_export_stats' + topUnionIdParam, postFields, {
        onDone: function(a) {
          ge('exchange_stats_content').innerHTML = a;
        },
        onFail: function(msg) {
          showFastBox({title: getLang('global_error'), width: 350}, msg);
          return true;
        }
      });
    } else {
      var postIframe = ce((browser.msie && browser.version < 9.0) ? '<iframe name="secret_iframe">' : 'iframe', {
        name: 'secret_iframe',
        id: 'secret_iframe'
      });
      postIframe.style.display = 'none';
      document.body.appendChild(postIframe);
      postFormParams.target = 'secret_iframe';

      var postForm = ce('form', postFormParams);
      for (var id in cur.watchControls) {
        postForm.appendChild(ce('input', {
          type: 'hidden',
          name: cur.watchControls[id],
          value: Ads.getNamespace('exchange_export_stats')[cur.watchControls[id]].value
        }));
      }
      postForm.appendChild(ce('input', {
        type: 'hidden',
        name: 'start_time',
        value: cur.exportParamsData.start_time.year + ('0'+cur.exportParamsData.start_time.month).slice(-2) + ('0'+cur.exportParamsData.start_time.day).slice(-2)
      }));
      postForm.appendChild(ce('input', {
        type: 'hidden',
        name: 'hash',
        value: cur.exportStatsHash
      }));
      postForm.appendChild(ce('input', {
        type: 'hidden',
        name: 'end_time',
        value: cur.exportParamsData.stop_time.year + ('0'+cur.exportParamsData.stop_time.month).slice(-2) + ('0'+cur.exportParamsData.stop_time.day).slice(-2)
      }));
      postForm.appendChild(ce('input', {
        type: 'hidden',
        name: 'dwcookie',
        value: downloadWatcherCookieValue
      }));
      document.body.appendChild(postForm);
      postForm.submit();
    }

    var downloadWatcherCheckInterval = setInterval(function () {
      if (document.cookie.indexOf(downloadWatcherCookieName + "=" + downloadWatcherCookieValue + '-error') != -1) {
        clearInterval(downloadWatcherCheckInterval);
        Ads.unlock('exchange_stat_export');
        if (!isExportMethodHtml) { // для html есть свой обработчик ошибки в .ajax
          showFastBox({title: getLang('global_error'), width: 350}, getLang('global_error'));
        }
      }
      if (document.cookie.indexOf(downloadWatcherCookieName + "=" + downloadWatcherCookieValue) != -1) {
        clearInterval(downloadWatcherCheckInterval);
        Ads.unlock('exchange_stat_export');
      }
    }, 500);
  },
  createExportSubmitButton: function (element) {
    cur.exportExchangeStatButton = element;
    (new Image()).src = '/images/upload_inv.gif'; // pre-load animation
    createButton(element, function () {
      Exchange.submitExportStatsForm();
    });
  }
};

try{stManager.done('exchange.js');}catch(e){}
