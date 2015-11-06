var GroupsList = {
  rand: function() {
    return Math.floor(Math.random() * 10000);
  },
  toggleAdvancedSearch: function(force) {
    if (typeof force == 'undefined') {
      force = !cur.isAdvancedSearch;
    }

    var groupsSearchWrap = ge('groups_list_search_wrap');
    toggleClass(groupsSearchWrap, 'groups_advanced_block_expanded', force);
    cur.isAdvancedSearch = force;
  },
  enter: function(el, gid, hash, act, past) {
    if (cur.invSwitching) {
      setTimeout(GroupsList.enter.pbind(el, gid, hash, act, past), 100);
      return false;
    }
    var sp, hp, tab = cur.scrollList.tab;

    if (el.tagName.toLowerCase() != 'button') {
      if (!el.backhtml) {
        el.backhtml = el.innerHTML;
      }
      sp = function() {
        var w = getSize(el)[0];
        el.innerHTML = '<span class="progress_inline"></span>';
        setStyle(el, {width: w - 30});
      }
      hp = function() {
        el.innerHTML = el.backhtml;
      }
    } else {
      sp = lockButton.pbind(el);
      hp = unlockButton.pbind(el);
    }

    var key = GroupsList.rand(), value = GroupsList.rand();
    cur.scrollList[key] = value;

    var context = (cur.scrollList.tab == 'groups') ? '2' : '1';

    var shown = false;
    cur.invSwitching = true;
    if (GroupsList.switchInvite(gid, (act == 'decline' && !past))) {
      shown = true;
      sp = false;
      hp = false;
    }

    ajax.post('al_groups.php', {
      act: 'enter',
      gid: gid,
      hash: hash,
      context: context + (act ? '_' + act : ''),
      inv_shown: cur.scrollList.invShown
    }, {
      onDone: function(newRow, added) {
        cur.invSwitching = false;
        if (!cur.scrollList || cur.scrollList[key] != value) return;

        var list = cur.scrollList.lists[tab], newStatus = past ? 5 : 1;
        if (act == 'unsure') {
          newStatus = past ? 5 : 3;
        } else if (act == 'decline') {
          newStatus = past ? -3 : -1;
        } else if (act == 'undecided') {
          newStatus = 4;
        }
        if (!list || list == 'loading' || list == 'update') {
          cur.scrollList.processed[tab][gid] = newStatus;
        } else {
          for (var i = 0, count = list.length; i < count; ++i) {
            if (list[i][2] == gid) {
              list[i][1] = newStatus;
            }
          }
        }

        var row = ge('gl_' + tab + gid);

        GroupsList.addInvite(newRow, added, act);

        var rowEl = geByClass1('group_list_row', ge('groups_list_content'));
        if (rowEl && rowEl.id == 'gl_' + tab + gid) {
          setStyle(rowEl, {backgroundColor: '#FEFAE4'});
          animate(rowEl, {backgroundColor: '#FFF'}, 2000);
        }

        if (shown) {
          if (cur.switchedInvite && act == 'decline' && !past) {
            var switchedHtml = getLang('groups_event_left') + ' <a onclick="GroupsList.spam(this.parentNode, ' + gid + ', \'' + hash + '\', cur.switchedInvite)">' + getLang('its_spam') + '</a>';
            if (ge('clubinv' + gid)) switchedHtml += '<div class="group_row_blockinv"><a onclick="GroupsList.spam(domPN(domPN(this)), ' + gid + ', \'' + hash + '\', cur.switchedInvite, 1)">' + getLang('groups_block_clubinv').replace('{club}', '<b>' + val(domPS(ge('clubinv' + gid))) + '</b>') + '</a></div>';
            cur.switchedInvite.innerHTML = switchedHtml;
          }
          return;
        }

        if (!row) return;

        var status = geByClass1('group_row_status', row), actions = geByClass1('group_row_actions', row), old = status.basehtml;
        var actOld = actions.basehtml;
        status.basehtml = status.innerHTML;
        actions.basehtml = actions.innerHTML;
        if (act == 'undecided') {
          actions.innerHTML = actOld || '';
          status.innerHTML = old || '\
<div class="group_row_buttons">\
  <div class="group_row_button button_blue fl_l">\
    <button onclick="GroupsList.enter(this, ' + gid + ', \'' + hash + '\', \'join\')">' + getLang('groups_event_go_btn') + '</button>\
  </div>\
  <div class="group_row_button button_blue fl_l">\
    <button onclick="GroupsList.enter(this, ' + gid + ', \'' + hash + '\', \'unsure\')">' + getLang('groups_event_maybe_btn') + '</button>\
  </div>\
  <div class="group_row_button button_cancel fl_l">\
    <div class="button" onclick="GroupsList.enter(this, ' + gid + ', \'' + hash + '\', \'decline\')">' + getLang('groups_event_cant_btn') + '</div>\
  </div>\
</div>';
        } else if (act) {
          if (past) {
            var statHTML = getLang('groups_was_on_event');
            if (act == 'decline') {
              actions.innerHTML = '<a onclick="GroupsList.enter(this.parentNode, ' + gid + ', \'' + hash + '\', \'join\', true)">' + getLang('groups_return_event') + '</a>';
            } else {
              actions.innerHTML = '<a onclick="GroupsList.enter(this.parentNode, ' + gid + ', \'' + hash + '\', \'decline\', true)">' + getLang('groups_remove_event') + '</a>';
            }
          } else {
            var acts = '<a onclick="GroupsList.enter(this.parentNode, ' + gid + ', \'' + hash + '\', \'undecided\')">' + getLang('groups_event_change') + '</a>';
            if (act == 'unsure') {
              var statHTML = getLang('groups_unsure_event');
            } else if (act == 'decline') {
              var statHTML = getLang('groups_event_left');
              acts += '<span class="divider">|</span><a onclick="GroupsList.spam(this.parentNode, ' + gid + ', \'' + hash + '\')">' + getLang('its_spam') + '</a>';
              if (ge('clubinv' + gid)) acts += '<div class="group_row_blockinv"><a onclick="GroupsList.spam(domPN(domPN(this)), ' + gid + ', \'' + hash + '\', false, 1)">' + getLang('groups_block_clubinv').replace('{club}', '<b>' + val(domPS(ge('clubinv' + gid))) + '</b>') + '</a></div>';
            } else {
              var statHTML = getLang('groups_you_in_event');
            }
            actions.innerHTML = acts;
          }
          status.innerHTML = '<div class="groups_acted_text">'+statHTML+'</div>';
          cur.lst = status;
        } else {
          status.innerHTML = '<div class="groups_acted_text">'+getLang('groups_group_enter_message')+'</div>';
          actions.innerHTML = '<a onclick="GroupsList.cancel(this.parentNode, ' + gid + ', \'' + hash + '\')">' + getLang('global_cancel') + '</a>';
        }

        if (tab == 'inv') {
          var row = ge('gl_groups'+ gid);
          if (row) {
            var statusOne = geByClass1('group_row_status', row), actionsOne = geByClass1('group_row_actions', row);
            statusOne.innerHTML = status.innerHTML;
            actionsOne.innerHTML = actions.innerHTML;
          }
        }
        if (act == 'join' || act == 'unsure') {
          GroupsList.updateEventsList(gid);
        } else if (act == 'undecided') {
          GroupsList.updateEventsList(false);
        }
        /*var list = cur.scrollList.lists[tab];
        if (act == 'join' || act == 'unsure' || act == 'decline') {
          GroupsList.updateEventsList();
          for(var i in list) {
            if (list[i][2] == gid) {
              cur['gid_restore_el'+gid] = [list.splice(i, 1), i];
            }
          }
        } else if (act == 'undecided' && cur['gid_restore_el'+gid]) {
          list.splice(cur['gid_restore_el'+gid][1], 0, cur['gid_restore_el'+gid][0][0]);
        }*/
      },
      onFail: function(text) {
        if (text) {
          setTimeout(showFastBox(getLang('global_error'), text).hide, 3000);
          return true;
        }
      },
      showProgress: sp, hideProgress: hp
    });
  },

  updateIndexer: function(l) {
    cur.scrollList.cache['groups'] = {all: []};
    var c = cur.scrollList.cache['groups'];
    for (var i in l) {
      c.all.push(i);
    }
    cur.scrollList.index['groups'] = new vkIndexer(c.all, function(obj) {
      return l[obj][0];
    });
  },

  addInvite: function(newRow, added, act) {
    if (newRow) {
      var moreCont = ge('gle_invites_more');
      moreCont.appendChild(se(newRow));
      cur.scrollList.invShown += 1;
      if (cur.scrollList.invSwitchGid) {
        GroupsList.switchInvite(cur.scrollList.invSwitchGid);
        cur.scrollList.invSwitchGid = false;
      }
    }

    if (added && cur.scrollList.lists.groups) {
      var l = cur.scrollList.lists.groups;
      if (act == 'join' || act == 'unsure') {;
        l.push(added);
      } else if (!act) {
        l.unshift(added); // add to the start
      } else if (act == 'undecided') {
        for (var i in l) {
          if (l[i][2] == added[2]) {
            l.splice(i, 1)
          }
        }
      }
      GroupsList.updateIndexer(l);
      GroupsList.showMore(true);
    }
  },

  switchInvite: function(gid, prepareActs) {
    var tab = cur.scrollList.tab;
    if (tab != 'groups') {
      return false;
    }

    var row = ge('gl_' + tab + gid);

    var moreCont = ge('gle_invites_more');
    var newRows = moreCont.childNodes;
    if (!newRows.length) {
      if (cur.scrollList.invShown < cur.scrollList.invCount) {
        cur.scrollList.invSwitchGid = gid;
        return true;
      }
      return false;
    }
    var newRow = newRows[0];

    if (!newRow) {
      return false;
    }

    if (cur.switchedInvite) {
      slideUp(cur.switchedInvite);
    }
    if (prepareActs) {
      cur.switchedInvite = ce('div', {className: 'gle_invites_actions', innerHTML: '<div class="progress_inline"></div>'});
      newRow.insertBefore(cur.switchedInvite, newRow.firstChild)
    }

    cur.scrollList.invShown -= 1;
    cur.scrollList.invCount -= 1;

    var cont = row.parentNode;
    var size = getSize(cont);
    setStyle(newRow, {opacity: 0, overflow: 'hidden', height: 1, position: 'absolute'});
    cont.appendChild(newRow);
    animate(newRow, {marginTop: -size[1], opacity: 1, height: size[1]}, 200, function() {
      hide(row);
      setStyle(newRow, {marginTop: 0, position: 'static', height: 'auto'});
    });

    if (cur.scrollList.invCount) {
      ge('gle_inv_summary').innerHTML = langNumeric(cur.scrollList.invCount, cur.scrollList.summaries.inv);
    } else {
      ge('gle_inv_summary').innerHTML = cur.scrollList.summaries.invEmpty;
    }
    return true;
  },

  leave: function(el, gid, hash, pp) {
    if (cur.invSwitching) {
      setTimeout(GroupsList.leave.pbind(el, gid, hash, pp), 100);
      return false;
    }
    var sp, hp, tab = cur.scrollList.tab;

    if (el.firstChild && el.firstChild.className == 'progress_inline') return;
    sp = function() {
      var w = getSize(el)[0];
      el.oldhtml = el.innerHTML;
      el.innerHTML = '<span class="progress_inline"></span>';
      setStyle(el, {width: w - 30});
    }
    hp = function() {
      el.innerHTML = el.oldhtml;
    }

    var key = GroupsList.rand(), value = GroupsList.rand();
    cur.scrollList[key] = value;

    var shown = false;
    cur.invSwitching = true;
    if (GroupsList.switchInvite(gid, true)) {
      shown = true;
      sp = false;
      hp = false;
    }

    var context = (cur.scrollList.tab == 'groups') ? '2' : '1';

    ajax.post('al_groups.php', {
      act: 'leave',
      gid: gid,
      hash: hash,
      context: context,
      inv_shown: cur.scrollList.invShown
    }, {
      onDone: function(newRow) {
        cur.invSwitching = false;
        if (!cur.scrollList || cur.scrollList[key] != value) return;

        var list = cur.scrollList.lists[tab];
        if (!list || list == 'loading' || list == 'update') {
          cur.scrollList.processed[tab][gid] = -1;
        } else {
          for (var i = 0, count = list.length; i < count; ++i) {
            if (list[i][2] == gid) {
              list[i][1] = -1;
            }
          }
        }

        var row = ge('gl_' + tab + gid);
        if (!row) return;

        var acts = '<a onclick="GroupsList.cancel(this.parentNode, ' + gid + ', \'' + hash + '\')">' + getLang('global_cancel') + '</a><span class="divider">|</span><a onclick="GroupsList.spam(this.parentNode, ' + gid + ', \'' + hash + '\')">' + getLang('its_spam') + '</a>';

        var text = '';
        if (tab == 'groups') {
          text = getLang(pp ? 'public_you_unsubscribed' : 'groups_group_left');
        } else {
          text = getLang('groups_group_deny_message');
        }

        GroupsList.addInvite(newRow, false, false);

        if (shown) {
          if (cur.switchedInvite) {
            cur.switchedInvite.innerHTML = text+' <a onclick="GroupsList.spam(this.parentNode, ' + gid + ', \'' + hash + '\', cur.switchedInvite)">' + getLang('its_spam') + '</a>';
          }
          return;
        }

        var status = geByClass1('group_row_status', row), actions = geByClass1('group_row_actions', row);
        status.basehtml = status.innerHTML;
        actions.basehtml = actions.innerHTML;
        status.innerHTML = text;
        actions.innerHTML = acts;
      },
      showProgress: sp, hideProgress: hp
    });
  },
  rejectAll: function(el, hash) {
    var box = showFastBox(getLang('global_warning'), getLang('groups_sure_reject_all'), getLang('groups_members_application_decline'), function() {
      ajax.post('al_groups.php', {act: 'reject_all', hash: hash}, {progress: box.progress});
    }, getLang('global_cancel'));
  },
  spam: function(el, gid, hash, applyCont, block) {
    var sp, hp, tab = cur.scrollList.tab;

    if (el.firstChild && el.firstChild.className == 'progress_inline') return;
    sp = function() {
      el.oldhtml = el.innerHTML;
      el.innerHTML = '<span class="progress_inline"></span>';
    }
    hp = function() {
      el.innerHTML = el.oldhtml;
    }

    var key = GroupsList.rand(), value = GroupsList.rand();
    cur.scrollList[key] = value;

    ajax.post('al_groups.php', {act: 'spam', gid: gid, hash: hash, context: 1, block: block}, {
      onDone: function(respText) {
        if (!cur.scrollList || cur.scrollList[key] != value) return;
        if (block > 0) {
          respText = respText.replace('{club}', '<b>' + val(domPS(ge('clubinv' + gid))) + '</b>');
        }
        if (applyCont) {
          if (block < 0) {
            applyCont.innerHTML = applyCont.basehtml;
          } else {
            applyCont.basehtml = applyCont.innerHTML;
            var applyContText = respText;
            if (block > 0) {
              respText += '<div class="group_row_blockinv"><a onclick="GroupsList.spam(domPN(domPN(this)), ' + gid + ', \'' + hash + '\', cur.switchedInvite, -1)">' + getLang('global_cancel') + '</div>';
            } else if (ge('clubinv' + gid)) {
              respText += '<div class="group_row_blockinv"><a onclick="GroupsList.spam(domPN(domPN(this)), ' + gid + ', \'' + hash + '\', cur.switchedInvite, 1)">' + getLang('groups_block_clubinv').replace('{club}', '<b>' + val(domPS(ge('clubinv' + gid))) + '</b>') + '</a></div>'
            }
            applyCont.innerHTML = respText;
          }
        }

        if (!block) {
          var list = cur.scrollList.lists[tab];
          if (!list || list == 'loading' || list == 'update') {
            cur.scrollList.processed[tab][gid] = -2;
          } else {
            for (var i = 0, count = list.length; i < count; ++i) {
              if (list[i][2] == gid) {
                list[i][1] = -2;
              }
            }
          }
        }

        var row = ge('gl_' + tab + gid);
        if (!row) return;

        var status = geByClass1('group_row_status', row), actions = geByClass1('group_row_actions', row);
        if (block < 0) {
          status.innerHTML = status.blockhtml;
          actions.innerHTML = actions.blockhtml;
        } else {
          if (block) {
            status.blockhtml = status.innerHTML;
            actions.blockhtml = actions.innerHTML;
            status.innerHTML = '<div class="group_row_blockinv">' + respText + '</div>';
            actions.innerHTML = '<div class="group_row_blockinv"><a onclick="GroupsList.spam(domPN(domPN(this)), ' + gid + ', \'' + hash + '\', false, -1)">' + getLang('global_cancel') + '</a></div>';
          } else {
            status.basehtml = status.innerHTML;
            actions.basehtml = actions.innerHTML;
            status.innerHTML = getLang('groups_ajax_inv_declined_spam');
            actions.innerHTML = '';
          }
        }
      },
      showProgress: sp, hideProgress: hp
    });
  },
  cancel: function(el, gid, hash) {
    var sp, hp, tab = cur.scrollList.tab;

    if (el.firstChild && el.firstChild.className == 'progress_inline') return;
    sp = function() {
      el.oldhtml = el.innerHTML;
      el.innerHTML = '<span class="progress_inline"></span>';
    }
    hp = function() {
      el.innerHTML = el.oldhtml;
    }

    var key = GroupsList.rand(), value = GroupsList.rand();
    cur.scrollList[key] = value;

    ajax.post('al_groups.php', {act: 'cancel', gid: gid, hash: hash, context: 1}, {
      onDone: function() {
        if (!cur.scrollList || cur.scrollList[key] != value) return;

        var list = cur.scrollList.lists[tab], elem = false;
        if (!list || list == 'loading' || list == 'update') {
          cur.scrollList.processed[tab][gid] = 0;
        } else {
          for (var i in list) {
            if (list[i][2] == gid) {
              list.splice(i, 1)
            }
          }
          GroupsList.updateIndexer(list);
        }
        /*} else {
          for (var i = 0, count = list.length; i < count; ++i) {
            if (list[i][2] == gid) {
              list[i][1] = 0;
              elem = list[i];
              break;
            }
          }
        }*/

        var row = ge('gl_' + tab + gid);
        if (!row) return;

        if (elem) {
          var name = elem[0], q = trim(cur.scrollList.query.value);
          if (q) {
            var highlight = GroupsList.getHighlight(q);
            name = name.replace(highlight.re, highlight.val);
          }
          var newRow = (cur.scrollList.genRow(elem, name)) ? cur.scrollList.genInvRow(elem, name) : cur.scrollList.genRow(elem, name);
          row.parentNode.replaceChild(ce('div', {innerHTML: newRow}).firstChild, row);
        } else {
          var status = geByClass1('group_row_status', row), actions = geByClass1('group_row_actions', row);
          status.innerHTML = status.basehtml;
          actions.innerHTML = actions.basehtml;
        }
      },
      showProgress: sp, hideProgress: hp
    });
  },

  scrollCheck: function() {
    if (browser.mobile) return;
    var lnk = ge(cur.scrollList.prefix + cur.scrollList.tab + '_more');
    if (!isVisible(lnk)) {
      return;
    }

    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY();

    if (st + ch > lnk.offsetTop || (cur.searchOffset && st + 2*ch > lnk.offsetTop)) {
      GroupsList.showMore();
    }
  },
  initScroll: function() {
    addEvent((browser.msie6 ? pageNode : window), 'scroll', GroupsList.scrollCheck);
    addEvent(window, 'resize', GroupsList.scrollCheck);
  },

  locNav: function(changed, oldLoc, newLoc) {
    var changedTab = changed.tab, tab = changedTab || 'groups';
    delete(changed.tab);
    if (!isEmpty(changed) || changedTab === undefined) return;

    ge('groups_tab_' + cur.scrollList.tab).className = '';
    hide('groups_list_tab_' + cur.scrollList.tab);
    cur.scrollList.tab = tab;
    show('groups_list_tab_' + tab);
    var tabEl = ge('groups_tab_' + tab);
    tabEl.className = 'active_link';
    show(tabEl);

    if (cur.scrollList.events) {
      toggle(cur.scrollList.events, tab == 'groups' && ge('gle_list_cont').innerHTML);
      cur.scrollList.eventsShow = false;
      if (isVisible(cur.scrollList.eventsMore)) {
        hide(cur.scrollList.eventsMore);
        show(cur.scrollList.eventsMoreLnk);
      }
    }
    if (cur.scrollList.popular) {
      toggle(cur.scrollList.popular, tab == 'groups');
    }
    if (cur.scrollList.invites) {
      toggle(cur.scrollList.invites, tab == 'groups');
    }
    if (cur.scrollList.invites || cur.scrollList.events && ge('gle_list_cont').innerHTML) {
      ((tab == 'groups') ? addClass : removeClass)(cur.scrollList.summary.parentNode, 'gl_summary_short');
    }

    toggle('gl_about_events', (tab == 'groups' || tab == 'inv'));

    nav.setLoc(newLoc);
    ge('groups_list_search').value = '';
    setTimeout(elfocus.pbind('groups_list_search'), 0);

    cur.scrollList.summary.innerHTML = cur.scrollList.summaries[tab];
    cur.scrollList.offset = ge('groups_list_' + tab).childNodes.length;

    GroupsList.showMore(true);

    return false;
  },

  init: function(opts) {
    setTimeout(elfocus.pbind('groups_list_search'), 0);
    extend(cur, {
      module: 'groups_list',
      _back: {
        text: getLang('groups_back_to_list'),
        show: [GroupsList.initScroll],
        hide: [function() {
          removeEvent((browser.msie6 ? pageNode : window), 'scroll', GroupsList.scrollCheck);
          removeEvent(window, 'resize', GroupsList.scrollCheck);
        }]
      },

      scrollList: {
        tab: opts.tab,

        url: 'al_groups.php',
        params: {act: 'get_list', mid: opts.mid},
        prefix: 'groups_list_',
        query: ge('groups_list_search'),
        summary: ge('groups_list_summary'),
        events: ge('gle_list_wrap'),
        eventsMore: ge('gle_list_more'),
        eventsMoreLnk: ge('gle_list_more_lnk'),
        invites: ge('gle_invites_wrap'),
        popular: ge('group_recom_wrap'),
        searchCont: ge('groups_list_search_cont'),

        perpage: 20,
        offset: ge('groups_list_' + opts.tab).childNodes.length,

        lists: {},
        cache: {},
        index: {},
        processed: {'groups': {}, 'admin': {}, 'inv': {}},
        filtered: {},
        queries: {},
        summaries: opts.summaries,

        genEmpty: opts.genEmpty,
        genRow: opts.genRow,
        genEvent: opts.genEvent,
        genInvRow: opts.genInvRow,
        genSummary: opts.genSummary,
        genGroupsSummary: opts.genGroupsSummary,
        invShown: opts.invShown,
        invCount: opts.invCount
      },
      filter: opts.filter
    });

    cur.nav.push(GroupsList.locNav);

    setTimeout(GroupsList.load, 0);
    if (vk.version) {
      addEvent(window, 'load', GroupsList.initScroll);
    } else {
      GroupsList.initScroll();
    }

    GroupsList.initAdvancedSearchBlock(opts);
  },
  initAdvancedSearchBlock: function(opts) {
    var searchWrapEl = ge('groups_list_search_wrap');
    var advancedBtnEl = ge('groups_search_advanced_btn');

    var options = { big: true, width: Math.floor((getSize(searchWrapEl)[0] - getSize(advancedBtnEl)[0] - 44) / 2) };

    // search parameters
    cur.searchSafe = true;
    cur.searchOnlyUpcoming = false;
    cur.searchSort = -1;
    cur.searchGroupType = -1;

    new Dropdown(ge('groups_search_group_type'), [[0, getLang('search_filter_any')], [1, getLang('search_Group')], [2, getLang('search_Public')], [3, getLang('search_Event')]], extend(options, {
      selectedItem: 0,
      onChange: function(groupType) {
        groupType = intval(groupType);
        cur.searchGroupType = groupType;
        GroupsList.showMore(true);
      }
    }));

    new Dropdown(ge('groups_search_group_sort'), [[0, getLang('groups_order_members')], [1, getLang('groups_order_popularity')], [6, getLang('groups_order_relevance')]], extend(options, {
      selectedItem: 0,
      onChange: function(sortType) {
        cur.searchSort = intval(sortType);
        GroupsList.showMore(true);
      }
    }));

    new Checkbox(ge('groups_search_safe_search'), {
      label: getLang('search_filter_adult'),
      width: 125,
      checked: true,
      onChange: function(checked) {
        cur.searchSafe = !!checked;
        GroupsList.showMore(true);
      }
    });
  },
  load: function(force, forceTab) {
    var tab = forceTab || cur.scrollList.tab;
    if (cur.scrollList.lists[tab]) return;

    var key = GroupsList.rand(), value = GroupsList.rand();
    cur.scrollList[key] = value;

    cur.scrollList.lists[tab] = 'loading';
    ajax.post(cur.scrollList.url, extend(cur.scrollList.params, {tab: tab}), {onDone: function(result) {
      if (!cur.scrollList || cur.scrollList[key] != value) return;

      var upd = (cur.scrollList.lists[tab] == 'update');
      if (!upd && cur.scrollList.lists[tab] != 'loading') return;

      cur.scrollList.cache[tab] = {all: []};
      var processed = cur.scrollList.processed[tab], gid;
      for (var i = 0, count = result.length; i < count; ++i) {
        res = processed[result[i][2]];
        if (res) {
          result[i][1] = res;
        }
        cur.scrollList.cache[tab].all.push(i);
      }
      cur.scrollList.lists[tab] = result;

      var callback = upd ? function() {
        if (cur.scrollList && cur.scrollList[key] == value && cur.scrollList.tab == tab) {
          GroupsList.showMore(force);
        }
      } : function() {};

      cur.scrollList.index[tab] = new vkIndexer(cur.scrollList.cache[tab].all, function(obj) {
        return cur.scrollList.lists[tab][obj][0];
      }, callback);

      if (cur.scrollList.eventsShow) {
        GroupsList.eventsMore();
      }
    }, local: 1});
  },

  htmlencode: function(str) {
    var res = [];
    for (var i = 0, l = str.length; i < l; ++i) {
      var c = str.charCodeAt(i);
      if (c == 33 || c == 39 || (c > 127 && c < 1040) || c > 1103) {
        res.push('&#' + c + ';');
      } else if (c == 36) {
        res.push('&#0' + c + ';');
      } else {
        c = str.charAt(i);
        switch (c) {
          case '>': res.push('&gt;'); break;
          case '<': res.push('&lt;'); break;
          case '"': res.push('&quot;'); break;
          case '&': res.push('&amp;'); break;
          default:  res.push(c); break;
        }
      }
    }
    return res.join('');
  },
  getHighlight: function(q) {
    var indxr = cur.scrollList.index[cur.scrollList.tab], delimiter = indxr.delimiter, trimmer = indxr.trimmer;

    q += ' ' + (parseLatin(q) || '');
    q = escapeRE(q).replace(/&/g, '&amp;');
    q = q.replace(trimmer, '').replace(delimiter, '|');
    return {
      re: new RegExp('(' + q + ')', 'gi'),
      val: '<span class="group_row_highlight">$1</span>'
    }
  },
  updateEvents: function() {
    if (!ge('gle_list_cont').innerHTML && !cur.scrollList.invites || cur.scrollList.tab != 'groups') return;
    toggle(cur.scrollList.events, !cur.scrollList.query.value && ge('gle_list_cont').innerHTML);
    cur.scrollList.eventsShow = false;
    if (isVisible(cur.scrollList.eventsMore)) {
      hide(cur.scrollList.eventsMore);
      show(cur.scrollList.eventsMoreLnk);
    }
    if (cur.scrollList.invites) {
      toggle(cur.scrollList.invites, !cur.scrollList.query.value);
    }
    if (cur.scrollList.popular) {
      toggle(cur.scrollList.popular, !cur.scrollList.query.value);
    }
    (!cur.scrollList.query.value ? addClass : removeClass)(cur.scrollList.summary.parentNode, 'gl_summary_short');
  },
  updateEventsList: function(addedGid) {
    ajax.post('groups', {act: 'update_events'}, {
      onDone: function(html, more) {
        var gleCont = ge('gle_list_cont');
        val(gleCont, html);
        toggle(cur.scrollList.events, !!html);
        hide(cur.scrollList.eventsMore);
        val(cur.scrollList.eventsMore, '');
        val(cur.scrollList.eventsMoreLnk, more || '');
        toggle(cur.scrollList.eventsMoreLnk, !!more);
        cur.scrollList.eventsShow = false;
        if (addedGid) {
          var addedRow = ge('gle_block_'+addedGid);
          if (addedRow) {
            setStyle(addedRow, {backgroundColor: '#FEFAE4'});
            animate(addedRow, {backgroundColor: '#FFF'}, 2000);
          }
        }
      }
    })
  },
  eventsMore: function() {
    var list = cur.scrollList.lists['groups'];
    if (!list || list == 'loading' || list == 'update') {
      cur.scrollList.eventsShow = true;
      return;
    }

    hide(cur.scrollList.eventsMoreLnk);
    if (val(cur.scrollList.eventsMore)) {
      show(cur.scrollList.eventsMore);
    } else {
      var res = {}, shown = {}, dates = {}, list = [], html = [];
      each(ge('gle_list_cont').childNodes, function(k, v) {
        var id = intval(((v || {}).id || '').replace(/^gle_block_/, ''));
        if (id) shown[id] = true;
      });
      each(cur.scrollList.lists['groups'], function(k, v) {
        var gid = intval(v[2]);
        if (!v[11] || shown[gid]) return;
        list.push(gid);
        res[gid] = cur.scrollList.genEvent(v);
        dates[gid] = intval(v[11].split('<*>')[0]);
      });
      list.sort(function(gid1, gid2) {
        return (dates[gid1] < dates[gid2]) ? -1 : ((dates[gid2] < dates[gid1]) ? 1 : 0);
      });
      each(list, function(k, v) {
        html.push(res[v]);
      });
      if (html.length) {
        val(cur.scrollList.eventsMore, html.join(''));
        show(cur.scrollList.eventsMore);
      }
    }
  },
  showMore: function(force) {
    var tab = cur.scrollList.tab, list = cur.scrollList.lists[tab];
    if (!list || list == 'loading' || list == 'update') {
      if (!list) GroupsList.load(force);
      cur.scrollList.lists[tab] = 'update';
      return;
    }

    var tab = cur.scrollList.tab, list = cur.scrollList.cache[tab].all;
    var createBtn = ge('groups_create_btn');
    var q = trim(cur.scrollList.query.value);
    cur.searchStr = q;
    if (!cur.loadingShown) {
      if (q) {
        show('groups_reset_search');
      } else {
        hide('groups_reset_search');
      }

      setTimeout(function() {
        toggleClass(geByClass1('groups_list_search'), 'groups_in_search', !!q);

        var searchInputEl = ge('groups_list_search');
        var advancedToggleBtnWidth = getSize(ge('groups_search_advanced_btn'))[0];
        setStyle(searchInputEl, { width: q ? (528 - advancedToggleBtnWidth) : '' }); // todo: too hacky
      }, 1);
    }

    if (cur.scrollList.queries[tab] === undefined) {
      cur.scrollList.queries[tab] = '';
    }
    var refresh = (force || q != cur.scrollList.queries[tab]);
    if (!refresh && force === false) return;

    cur.scrollList.queries[tab] = q;

    var highlight = false;
    if (q) {
      list = cur.scrollList.cache[tab]['_' + q];
      if (list === undefined) {
        var tmp = cur.scrollList.index[tab].search(q), mp = {};
        list = [];
        for (var i = 0, l = tmp.length; i < l; ++i) {
          if (!mp[tmp[i]]) {
            mp[tmp[i]] = true;
            list.push(tmp[i]);
          }
        }
        list.sort(function(a,b){return a-b;});
        cur.scrollList.cache[tab]['_' + q] = list;
      }
      highlight = GroupsList.getHighlight(q);
    }

    var len = list.length;

    var cont = ge(cur.scrollList.prefix + tab), more = ge(cur.scrollList.prefix + tab + '_more');
    if (!len) {
      if (q && tab == 'groups') {
        if (refresh) {
          GroupsList.serverSearch(cont, q, true);
          hide(more);
        } else if (cur.searchOffset) {
          GroupsList.serverSearchMore(cont, q);
        }
      } else {
        q = cur.scrollList.query.value;
        cont.innerHTML = cur.scrollList.genEmpty(q);
        cur.scrollList.summary.innerHTML = q ? cur.scrollList.genSummary(len) : cur.scrollList.summaries[tab];
        hide(more);
        hide(cur.scrollList.searchCont);
        cur.searchOffset = 0;
      }
      return;
    } else if (tab == 'groups' && cur.scrollList.params.mid == vk.id) {
      cur.scrollList.summary.innerHTML = cur.scrollList.genGroupsSummary(len);
    } else {
      cur.scrollList.summary.innerHTML = q ? cur.scrollList.genSummary(len) : cur.scrollList.summaries[tab];
    }

    var start = refresh ? 0 : cur.scrollList.offset, end = Math.min(len, start + cur.scrollList.perpage);
    var html = [];

    for (var i = start; i < end; ++i) {
      var row = cur.scrollList.lists[tab][list[i]];
      if (!row) continue;
      var name = row[0];
      if (highlight) {
        name = name.replace(highlight.re, highlight.val);
      }
      if (cur.scrollList.tab == 'inv') {
        html.push(cur.scrollList.genInvRow(row, name));
      } else {
        html.push(cur.scrollList.genRow(row, name));
      }
    }

    if (!q && (!start || refresh)) {
      hide(cur.scrollList.searchCont);
      cur.searchOffset = 0;
    }

    if (refresh) {
      cont.innerHTML = html.join('');
      cur.searchOffset = false;
      if (list.length < 10 && q && tab == 'groups') {
        var exclude = [];
        for (var i in list) {
          var el = cur.scrollList.lists[tab][list[i]];
          exclude.push(el[2]);
        }
        GroupsList.serverSearch(cont, q, false, exclude);
      } else {
        hide(cur.scrollList.searchCont);
        cur.searchOffset = 0;
      }
    } else {
      cont.innerHTML += html.join('');
      if (cur.searchOffset) {
        GroupsList.serverSearchMore(cont, q);
      }
    }
    cur.scrollList.offset = end;

    if (!cur.searchOffset) {
      (end < len ? show : hide)(more);
    }
  },

  serverSearchMore: function(cont, q) {
    if (cur.searchLoadingMore) return;
    cur.searchLoadingMore = 1;
    var more = ge(cur.scrollList.prefix + cur.scrollList.tab + '_more');
    var back = more.innerHTML;
    ajax.post('al_groups.php', GroupsList.extendWithAdvancedParams({
      act: 'server_search',
      q: q,
      offset: cur.searchOffset,
      exclude: cur.searchExclude.join(',')
    }), {
      onDone: function(count, rows, finish) {
        cur.searchLoadingMore = 0;
        if (count) {
          cur.searchOffset += count;
          cur.scrollList.searchCont.appendChild(cf(rows));
        } else {
          cur.searchOffset = 0;
        }
        (finish ? hide : show)(cur.scrollList.prefix + cur.scrollList.tab + '_more');
        debugLog((finish ? 'hide' : 'show'));
      },
      onFail: function() {
        cur.searchLoadingMore = 0;
      },
      showProgress: function() {
        more.innerHTML = '<img src="/images/upload.gif" />';
      },
      hideProgress: function() {
        more.innerHTML = back;
      }
    })
  },

  extendWithAdvancedParams: function(params) {
    if (!cur.isAdvancedSearch) return params;

    return extend(params || {}, {
      extended: 1,
      safe: intval(cur.searchSafe),
      sort: intval(cur.searchSort || -1),
      type: intval(cur.searchGroupType || -1)
    });
  },

  serverSearch: function(cont, q, emptyLocal, exclude) {
    if (cur.scrollList.tab != 'groups') {
      return false;
    }
    clearTimeout(cur.searchTimeout);
    cur.searchTimeout = setTimeout(function() {
      if (cur.searchStr != q) return;
      cur.searchExclude = exclude || [];

      ajax.post('al_groups.php', GroupsList.extendWithAdvancedParams({
        act: 'server_search',
        q: q,
        empty: emptyLocal ? 1 : 0,
        exclude: cur.searchExclude.join(','),
      }), {
        onDone: function(count, rows, summary, finish) {
          if (cur.searchStr != q) return;
          if (count) {
            var last = geByClass('group_list_row', cont).pop();
            if (last) {
              addClass(last, 'groups_list_last_row');
            }
            cur.scrollList.searchCont.innerHTML = rows;
            show(cur.scrollList.searchCont);
            if (emptyLocal) {
              cur.scrollList.summary.innerHTML = summary;
              cont.innerHTML = '';
            }
            if (!finish) {
              show(cur.scrollList.prefix + cur.scrollList.tab + '_more');
            }
          } else {
            cur.scrollList.searchCont.innerHTML = '';
            hide(cur.scrollList.searchCont);
            if (emptyLocal) {
              cont.innerHTML = cur.scrollList.genEmpty(q);
              cur.scrollList.summary.innerHTML = cur.scrollList.genSummary(0);
            }
          }
          cur.searchOffset = count;
        },
        showProgress: GroupsList.showLoading,
        hideProgress: GroupsList.hideLoading
      })
    }, 300);
  },

  resetSearch: function() {
    val(cur.scrollList.query, '');
    GroupsList.showMore(true);
    GroupsList.updateEvents();
    GroupsList.toggleAdvancedSearch(false);
  },

  showLoading: function() {
    cur.loadingShown = 1;
    show('groups_loading');
    hide('groups_reset_search');
  },

  hideLoading: function() {
    cur.loadingShown = 0;
    hide('groups_loading');
    if (cur.scrollList.query.value) {
      show('groups_reset_search');
    }
  },

  showInvites: function(obj) {
    removeClass(obj.previousSibling, 'groups_list_last_row');
    hide(obj);
    show(obj.nextSibling);
  },

  ttShow: function(obj, text) {
    var showsp = 200;
    if (cur.groupMemTT && cur.groupMemTT != obj && window.tooltips) {
      tooltips.hideAll();
      cur.groupMemTT = false;
      showsp = 0;
    }
    cur.groupMemTT = obj;
    return showTooltip(obj, {
      center: 1,
      black: 1,
      showsp: showsp,
      shift: [0, 2, 10],
      text: text
    });
  },

  recomMore: function(ev) {
    if (checkEvent(ev) !== false) return;
    var preload = ge('group_recom_preload'), sz = getSize(preload),
        lnk = ge('group_recom_more'), isVis = isVisible(preload);
    if (isVis) {
      scrollNode.scrollTop = scrollNode.scrollTop - sz[1];
    }
    toggle(preload);
    toggle(lnk.firstChild, isVis);
    toggle(lnk.lastChild, !isVis);
    return cancelEvent(ev);
  },

  recomSubscribe: function(oid, btn, sub) {
    var address, params,
        subBtn = sub ? btn : domPS(btn),
        unsubBtn = sub ? domNS(btn) : btn;
    if (sub) {
      address = '/al_feed.php';
      params = {act: 'subscr', oid: oid, from: 'groups', hash: val('group_recom_hash')};
    } else {
      address = '/al_fans.php';
      params = {act: 'unsub', oid: oid, hash: val('group_recom_hash'), no_response: 1};
    }
    ajax.post(address, params, {
      onDone: function(row) {
        toggle(subBtn, !sub);
        toggle(unsubBtn, !!sub);
        if (cur.scrollList && cur.scrollList.lists && cur.scrollList.lists.groups) {
          if (sub) {
            if (row) {
              cur.scrollList.lists.groups.push(row);
              GroupsList.updateIndexer(cur.scrollList.lists.groups);
              GroupsList.showMore(true);
            }
          } else {
            for (var i in cur.scrollList.lists.groups) {
              if (cur.scrollList.lists.groups[i][2] == -oid) {
                cur.scrollList.lists.groups.splice(i, 1);
                GroupsList.updateIndexer(cur.scrollList.lists.groups);
                GroupsList.showMore(true);
                break;
              }
            }
          }
        }
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
  },

  showMapBox: function(place, zoom, link) {
    if (window.showZeroZoneBox && showZeroZoneBox('places', function() {
      GroupsList.showMapBox(place, zoom, link);
    })) { return; }

    showTabbedBox('places.php', {act: 'a_get_place_box', id: place}, {stat: ['places.css', 'map.css', 'maps.js', 'ui_controls.css', 'ui_controls.js']});
  },

  toggleFastAccess: function(gid, el) {
    function updateBtn(val) {
      var text = val ? getLang('groups_fast_menu_access_invert') : getLang('groups_fast_menu_access');
      el.textContent = text;
      el.setAttribute('data-value', val);
    }
    var value = intval(el.getAttribute('data-value')) ^ 1;
    ajax.post('al_settings.php', {act: 'a_toggle_admin_fast', gid: gid, update_menu: 1 }, {
      onDone: function(value, nav) {
        geByTag1('ol', ge('side_bar')).innerHTML = nav;
        if (window.Notifier) {
          Notifier.resetCommConnection();
        }

      },
      onFail: function() {
        updateBtn(0);
        showFastBox(getLang('global_error'), getLang('groups_too_much_comms').replace('{amt}', 5));
        return true;
      }.bind()
    });
    updateBtn(value, value);
    return false;
  },

  feedbanGroup: function(el, gid, hash) {
    var oid = -gid;
    ajax.post('al_fans.php', {act: 'feedtgl', oid: oid, hash: hash}, {
      onDone: function(val, str) {
        el.innerHTML = str;
        if (!cur.scrollList.lists || !cur.scrollList.lists.groups) {
          return;
        }
        var lst = cur.scrollList.lists.groups;
        if (lst && lst.length) {
          for (var i = 0, l = lst.length; i < l; ++i) {
            if (lst[i][2] == gid) {
              cur.scrollList.lists.groups[i][12] = val;
              break;
            }
          }
        }
      },
      showProgress: function() {
        el.innerHTML = '<span class="progress_inline"></span>';
      }
    });
  }
}

try{stManager.done('groups_list.js');}catch(e){}
