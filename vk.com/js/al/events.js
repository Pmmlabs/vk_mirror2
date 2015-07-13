window.events = {
  showInviteBox: function(e, gid) {
    showBox('al_page.php', {act: 'a_invite_box', gid: gid}, {params: {bodyStyle: "padding: 0px;", width: 470, dark: 1}});
    return false;
  },
  showCommonBox: function(e, gid, hash) {
    showBox('al_page.php', {act: 'a_friends_in_group', gid: gid, hash: hash}, {params: {bodyStyle: "padding: 0px;", dark: 1}});
    return false;
  },
  createEvent: function(hash) {
    var b = showBox('al_page.php', {act:'a_edit_event_box'}, {params: {dark: 1}}); /*.setButtons(getLang('global_save'), function() {
      cur.reloadAfterClose = true;
      var params = {act:'a_add_event'};
      params.hash = hash;
      params.desc = ge('public_link_desc').value;
      ajax.post('al_page.php', params, {onDone: function(res) {
        b.hide();
        nav.go()
      }, onFail: function(){}});
    }, getLang('global_cancel'));*/
  },
  subscribeSMS: function(eid, hash) {
    var onChange = function(subscribed) {
      if (subscribed) {
        hide('event_subscribe_sms');
        show('event_unsubscribe_sms');
      } else {
        hide('event_unsubscribe_sms');
        show('event_subscribe_sms');
      }
    };
    ajax.post('al_mobile.php', {act:'a_subscribe_page', gid:eid, hash:hash}, {onDone:function(subscribed) {
      onChange(subscribed);
    }});
    onChange(isVisible('event_subscribe_sms'));
  },
  initStatusButtons: function(eid, hash) {
    var row = ge('event_row'+eid);
    var onChange = function(type, el) {
      try {
      events.subscribe(eid, type, hash, el);
      var acts = geByClass1('actions', row);
      show(acts);
      hide(geByClass1('change_status', row));
      var status = 0;
      switch (type) {
        case 'unsure':
          status = 1;
        break;
        case 'decline':
          status = 2;
          if (cur.curTab == 'invitations' && acts.childNodes.length < 3) {
            acts.innerHTML += '<span class="divider">|</span><a onclick="events.reportSpam(this.parentNode, ' + eid + ', \'' + hash + '\')">' + getLang('its_spam') + '</a>';
          }
        break;
      }
      each(cur.tabs, function(i,tab) {
        if (cur.lists[tab] && cur.lists[tab].data) {
          each(cur.lists[tab].data, function(j,v) {if (v && v[0] == eid) {debugLog('set status ', status); v[2][4] = status;}});
        }
      });
      //cur.lists[cur.curTab].showMore(null, true);
      var status_text = '';
      switch (status) {
        case 1: status_text = getLang('events_you_unsure'); break;
        case 2: status_text = getLang('events_you_cant_participate'); break;
        default: status_text = getLang('events_you_will_participate'); break;
      }
      geByClass('status', row)[0].innerHTML = status_text;
      } catch(e){debugLog(e);}
    }
    createButton(geByClass('join_button', row)[0], onChange.pbind('join'));
    createButton(geByClass('unsure_button', row)[0], onChange.pbind('unsure'));
    createButton(geByClass('leave_button', row)[0], onChange.pbind('decline'));
  },
  changePast: function(eid, type, hash, el) {
    events.subscribe(eid, type, hash);
    var status = 0, oldStatus = 0;
    switch (type) {
      case 'unsure': status = 1; break;
      case 'decline': status = 2; break;
    }
    each(cur.tabs, function(i,tab) {
      if (cur.lists[tab] && cur.lists[tab].data) {
        each(cur.lists[tab].data, function(j,v) {if (v && v[0] == eid) {debugLog('set status ', status); oldStatus = v[2][4]; v[2][4] = status;}});
      }
    });
    var oldType = 'join';
    switch (oldStatus) {
      case 1: oldType = 'unsure'; break;
      case 2: oldType = 'decline'; break;
    }
    if (cur.convert) {
      geByClass1('status', el.parentNode.parentNode).innerHTML = getLang('events_past_moved');
      el.innerHTML = '';
    } else {
      el.innerHTML = getLang((status == 2) ? 'events_restore_past_event' : 'events_decline_past_event');
      el.onclick = events.changePast.pbind(eid, oldType, hash, el);
    }
  },
  changeStatus: function(eid, hash, norequest) {
    var row = ge('event_row'+eid);
    if (!row) return;
    var html = '<div class="button_blue fl_l"><button class="join_button">'+getLang('events_user_will_participate')+'</button></div>\
    <div class="button_blue fl_l"><button class="unsure_button">'+getLang('events_user_unsure')+'</button></div>\
    <div class="button_cancel fl_l"><div class="leave_button">'+getLang('events_user_cant_participate')+'</div></div>';
    geByClass('change_status', row)[0].innerHTML = html;
    events.initStatusButtons(eid, hash);
    hide(geByClass('actions', row)[0]);
    show(geByClass('change_status', row)[0]);
    if (norequest) return;
    ajax.post('al_events.php', {act:'a_enter', eid:eid, hash:hash, action:'undecided'}, {onDone:function(res, count) {
      ge('invitations_count').innerHTML = count ? '('+count+')' : '';
    }});
  },
  reportSpam: function (el, eid, hash) {
    var sp, hp, tab = cur.curTab;
    if (el.firstChild && el.firstChild.className == 'progress_inline') return;
    sp = function() {
      el.oldhtml = el.innerHTML;
      el.innerHTML = '<span class="progress_inline"></span>';
    }
    hp = function() {
      el.innerHTML = el.oldhtml;
    }
    ajax.post('al_events.php', {act: 'spam', eid: eid, hash: hash}, {
      onDone: function() {
        var row = ge('event_row'+eid);
        if (!row) return;
        var status = geByClass('status', row)[0], actions = geByClass('actions', row)[0];
        status.basehtml = status.innerHTML;
        actions.basehtml = actions.innerHTML;
        status.innerHTML = getLang('events_ajax_inv_declined_spam');
        actions.innerHTML = '';
      },
      showProgress: sp, hideProgress: hp
    });
  },
  showMapBox:function(placeID, zoom, link) {
    if (window.showZeroZoneBox && showZeroZoneBox('places', function() {
      events.showMapBox(placeID, zoom, link);
    })) { return; }

    showTabbedBox('places.php', {act: 'a_get_place_box', id: placeID}, {stat: ['places.css', 'map.css', 'maps.js', 'ui_controls.css', 'ui_controls.js'], params: {dark: 1}});
  },
  showAddressBox: function(country, address) {
    if (window.showZeroZoneBox && showZeroZoneBox('places', function() {
      events.showAddressBox(country, address);
    })) { return; }

    showBox('places.php', {act: 'a_get_address_box', country: country, address: address}, {stat: ['places.css', 'map.css', 'maps.js', 'ui_controls.css', 'ui_controls.js'], params: {width: 640, bodyStyle: 'padding:0;', dark: 1}});
  },
  otherActs: function(el) {
    clearTimeout(cur.hideOtherTimer);
    if (!el) return false;
    el.blur();
    var acts = ge('page_other_acts');
    if (isVisible(acts)) {
      return false;
    }
    acts.style.marginLeft = '-1px';
    acts.style.marginTop = '-21px';
    show(acts);
    return false;
  },
  hideOther: function(timeout) {
    if (timeout > 0) {
      cur.hideOtherTimer = setTimeout(cur.hideOther, timeout);
    } else {
      var acts = ge('page_other_acts');
      if (timeout == -1) {
        hide(acts);
      } else {
        fadeOut(acts, 200);
      }
    }
  },

  updateBlock: function(blockId, html, js) {
    blockId = ge(blockId);
    if (!blockId || !html) {
      return;
    }
    geByClass('module_body', blockId)[0].innerHTML = html;
    if (js) {
      eval(js);
    }
  },

  unSubscribe: function(eid, hash) {
    show('event_subscribe');
    hide('event_unsubscribe');
    if (!hash) hash = cur.options.enterHash;
    ajax.post('al_events.php', {act:'a_enter', eid:eid, hash:hash, action:'undecided'});
    return false;
  },

  unSubscribePast: function(eid, hash) {
    if (!hash) hash = cur.options.enterHash;
    ajax.post('al_events.php', {act:'a_enter', eid:eid, hash:hash, action:'decline'});
    hide('event_decline_past_event');
    show('event_restore_past_event');
    return false;
  },
  subscribePast: function(eid, type, hash) {
    if (!hash) hash = cur.options.enterHash;
    ajax.post('al_events.php', {act:'a_enter', eid:eid, hash:hash, action:type});
    show('event_decline_past_event');
    hide('event_restore_past_event');
    return false;
  },

  subscribe: function(eid, action, hash, el) {
    lockButton(el);
    if (cur.processSubscribe) return;
    cur.processSubscribe = true;
    var getModules = hash ? 0 : 1;
    if (!hash) hash = cur.options.enterHash;
    ajax.post('al_events.php', {act:'a_enter', eid:eid, hash:hash, action:action, modules:getModules}, {
      onDone: function(followersModule, unsureModule, likeModule, js) {
        debugLog(el);
        unlockButton(el);
        cur.processSubscribe = false;
        if (getModules) {
          ge('event_like_module_wrap').innerHTML = likeModule;
          ge('event_followers_module_wrap').innerHTML = followersModule;
          ge('event_unsure_module_wrap').innerHTML = unsureModule;
          if (js) {
            eval(js);
          }
          show('event_unsubscribe');
          hide('event_subscribe');
        } else if (!cur.convert) {
          var count = unsureModule;
          ge('invitations_count').innerHTML = count ? '('+count+')' : '';
        }
      }, onFail: function() {
        unlockButton(el);
      }
    });

    var followersModule = ge('public_followers');
    if (followersModule) {
      var subscDiv = geByClass('header_top', followersModule)[0];
      var count = subscDiv.innerHTML;
      subscDiv.innerHTML = cur.otherCount;
      if (cur.otherCount != '') {
        show(followersModule);
      }
      cur.otherCount = count;
    }
    return false;
  },
  friendsBox: function() {
    showBox('al_events.php', {act: 'a_get_friends', pid:cur.options.event_id}, {params:{width:467, dark: 1}});
  },

  showEdit:function(tab) {
    nav.go('/event' + cur.options.event_id + '?act=edit');
    return false;
  },
  switchTab:function(tab, onEnd, onHeader) {
    if (!cur.tab) cur.tab = 'info_module_tab';
    if (cur.tab == tab) return;
    var w = ge('info_module_wrap'), c = ge('info_module_cont');
    if (tab == 'info_module_tab') setStyle(w, {borderBottomWidth:'0px'});
    var hideTabs = browser.msie7 || browser.msie6;

    var pos = {'info_module_tab':0, 'edit_module_tab':-397, 'list_module_tab':-794};
    var urls = {'info_module_tab':'', 'edit_module_tab':'?act=edit', 'list_module_tab':'?act=edit&list='+cur.options.list};
    var t1 = ge(cur.tab), t2 = ge(tab), back = (pos[tab] > pos[cur.tab]);
    var h1 = getSize(t1)[1];

    if (tab == 'list_module_tab') {
      setStyle(t2, {height:h1-1});
    }

    //setStyle(w, {height:h1});
    //if (!back) setStyle(t2, {height:'auto'});
    if (hideTabs) {
      setStyle(c, {height:getSize(w)[1]});
      setStyle(w, {position:'absolute'});
      setStyle(t2, {visibility:'visible'});
    }
    var h2 = getSize(t2)[1];
    //setStyle(t2, {height:h1});
    //setStyle(w, {height:'auto'});

    //setStyle(ge('info_module_header'), {height:getSize(ge('info_module_header'))[1]});
    ge('info_module_header_content').innerHTML = cur.tabHeaders[tab];
    //var hh = getSize(ge('info_module_header_content'))[1];

    ge('public_manage_page_link').innerHTML = cur.tabActions[tab];

    var to = (tab == 'info_module_tab' || cur.tab == 'info_module_tab') ? 0 : 300;

    if (onHeader) onHeader();
    animate(ge('info_tabs'), {left:pos[tab]}, to, function() {
      //animate(ge('info_module_header'), {height:hh}, 100);
      var inc = h2 > h1;
      //if (back) setStyle(t1, {height:1});
      if (hideTabs) {
        setStyle(t1, {visibility:'hidden'});
        setStyle(w, {position:'static'});
        setStyle(c, {height:'auto'});
      }
      if (inc == !back && h1 != h2) {
        //animate(t2, {height:h2}, 150, function() {
          //setStyle(t2, {height:'auto'});
          if (onEnd) onEnd();
          /*
          if (browser.chrome) { //weird bug
            setStyle(t2, {paddingTop:1});
            setTimeout(setStyle.pbind(t2, {paddingTop:0}), 0);
          }
          */
        //});
      } else {
        if (back && tab == 'edit_module_tab') {
          //setStyle(t2, {height:'auto'});
        }
        if (onEnd) onEnd();
      }
      cur.tab = tab;
      nav.setLoc((cur.options.public_link.replace(/^\//, ''))+urls[tab]);
    });
    return false;
  },
  showInput:function(el) {
    el = el.parentNode;
    addClass(el, 'unshown');
    var input_wrap = geByClass('input_wrap', el.parentNode)[0];
    removeClass(input_wrap, 'unshown');
    geByClass('text', input_wrap)[0].focus();
  },
  hideInput: function(el, val) {
    return;
  },
  shareEvent: function(eid, hash) {
    show('share_event_progress');
    hide('share_event_link');
    ajax.post('al_events.php', {act:'a_share', eid:eid, hash: hash}, {onDone:function(res) {
      hide('share_event_progress');
      hide('event_unsubscribe');
      ge('event_unshare').innerHTML = res;
      show('share_event_link');
      show('event_unshare');
    }});
  },
  unshareEvent: function(eid, post_id, hash) {
    show('unshare_event_progress');
    hide('unshare_event_link');
    ajax.post('al_events.php', {act: 'a_unshare', eid:eid, post_id:post_id, hash: hash}, {onDone:function(res) {
      hide('unshare_event_progress');
      hide('event_unshare');
      show('unshare_event_link');
      show('event_unsubscribe');
    }});
  },

  init: function(options) {
    extend(cur, {
      oid: -options.event_id,
      module: 'event',
      options: options,
      postTo: -options.event_id,
      mid: -options.event_id,
      editing: false,
      hideOther: events.hideOther,
      otherActs: events.otherActs,
      tabHeaders: options.info_headers,
      tabActions: options.tab_actions,
      otherCount: options.otherCount,
      _back: {show: [], hide: [], text: options.back}
    });

    if (ge('event_wall')) {
      wall.init(extend(options, {automore: 1}));
    }
    if (ge('join_button')) {
      this.initLike(options.event_id);
    }
  },
  initLike: function(event_id) {
    createButton('join_button', events.subscribe.pbind(event_id, 'join', null));
    createButton('unsure_button', events.subscribe.pbind(event_id, 'unsure', null));
    createButton('leave_button', events.subscribe.pbind(event_id, 'decline', null));
  }

};


window.showMapBox = events.showMapBox;
window.showAddressBox = events.showAddressBox;

function initCalendar(month, year, events, holidays) {

extend(cur, {
  calEvents: events,
  calHolidays: holidays,
  calMon: month,
  calYear: year,
  calEventsById: {},
  calGetCurEvents: function(day) {
    if (!cur.calEvents[cur.calMon]) return [];
    var events = cur.calEvents[cur.calMon][day], curEvents = [];
    var now = new Date(), nowYear = now.getFullYear();
    for (var i in events) {
      var year = (new Date(events[i][3] * 1000)).getFullYear();
      if ((events[i][0] > 0 && (cur.calYear > year || year == nowYear)) || (events[i][0] < 0 && cur.calYear == year)) {
        curEvents.push(events[i]);
      }
    }
    return curEvents;
  },
  calShowMore: function(el, i, day) {
    var p = el.parentNode;
    var e = geByClass('day_events', p.parentNode)[0];
    var items = cur.calGetCurEvents(day);
    var item = items[i];
    if (!item || !e) return;
    i = (i + 1 >= items.length) ? 0 : i + 1;
    p.innerHTML = '<a href="" onclick="cur.calShowMore(this, ' + i + ', ' + day + ');return false;">' + getLang('events_calendar_show_more') + '</a>';
    e.innerHTML = '<a href="' + item[2] + '" onclick="return nav.go(this, event);"><img src="' + item[4] + '" onmouseover="cur.calTrailOn(this, ' + item[0] + ', ' + day + ');" onmouseout="cur.calTrailOff(this, ' + item[0] + ');"/></a>';
  },
  calTrailOn: function(el, fid, day) {
    var item = cur.calEventsById[fid];
    var bDay = new Date(item[3] * 1000);
    var curDay = new Date(cur.calYear, cur.calMon-1, day);
    var nowDay = new Date();
    nowDay = new Date(nowDay.getFullYear(), nowDay.getMonth(), nowDay.getDate());
    var text = '';
    if (fid < 0) {
      var hours = bDay.getHours();
      var minutes = bDay.getMinutes();
      if (minutes < 10) minutes = '0' + minutes;
      var time = hours + ':' + minutes;
      text = getLang('events_calendar_future_event').replace('{time}', time);
    } else {
      if (bDay.getFullYear() != nowDay.getFullYear()) {
        var years = curDay.getFullYear() - bDay.getFullYear();
        text = getLang((nowDay > curDay) ? 'events_calendar_past_birthday' : ((nowDay.toString() == curDay.toString()) ? 'events_calendar_recent_birthday' : 'events_calendar_future_birthday'), years);
      }
    }
    if (text) text = '<div class="text">' + text + '</div>';
    var name = '<a href="' + item[2] + '" onclick="return nav.go(this, event);">' + item[1] + '</a>';
    var im = vkImage();
    var showTT = function () {
      if (window.tooltips) tooltips.hideAll();
      showTooltip(el, {content:'<div class="wrap"><div class="content"><a href="'+item[2]+'" onclick="return nav.go(this, event);"><img src="'+item[5]+'"/></a><div class="name">' + name + '</div>'+text+'</div></div>',className: 'rich wall_tt cal_tt', slide:15, shift: [40, 3, 3], toup: true});
    };
    im.src = item[5];
    im.onload = function() {
      im.loaded = true;
    }
    clearTimeout(cur.calTO);
    var to = function() {
      if (im.loaded) {
        showTT();
        clearTimeout(cur.calTO);
        return;
      }
      cur.calTO = setTimeout(to, 50);
    };
    cur.calTO = setTimeout(to, 200);
    return false;
  },
  calTrailOff: function(fid) {
    clearTimeout(cur.calTO);
    return false;
  },
  calGetMonth: function(shift) {
    if (window.tooltips) tooltips.hideAll();
    cur.calMon += shift;
    if (cur.calMon > 12) {
      cur.calMon = 1;
      cur.calYear++;
    } else if (cur.calMon < 1) {
      cur.calMon = 12;
      cur.calYear--;
    }
    ge('calendar_header').innerHTML = getLang('Month'+cur.calMon)+' '+cur.calYear;


    var days = (new Date(cur.calYear, cur.calMon, 0)).getDate();
    var date = new Date(cur.calYear, cur.calMon - 1, 1);

    var start = (date.getDay() + 6) % 7;
    var offset = days + start;
    var weeksCount = Math.ceil(offset / 6);
    var rows = '';
    var nowDay = new Date();
    nowDay = new Date(nowDay.getFullYear(), nowDay.getMonth(), nowDay.getDate());

    for (var week = 0; week < weeksCount; week++) {
      var rowHTML = '';
      for (var weekDay = 0; weekDay < 7; weekDay++) {
        var day = week * 7 + weekDay - start + 1;
        var dayClass = (weekDay == 0) ? 'left ' : '';
        if (day > 0 && day <= days) {
          var holidays = cur.calHolidays[cur.calMon];
          var curDay = new Date(cur.calYear, cur.calMon - 1, day);

          if (holidays && holidays[day] || weekDay > 4) {
            dayClass += 'holiday ';
          }

          var dayText = '';
          if (nowDay.toString() == curDay.toString()) {
            dayText = getLang('Today');
            dayClass += 'today ';
          }

          var dayEvents = '', showMore = '';
          var calEvents = cur.calGetCurEvents(day);
          if (calEvents[0]) {
            var photo = calEvents[0][4];
            var href = calEvents[0][2];
            var fid = calEvents[0][0];
            dayEvents = '<a href="' + href + '" onclick="return nav.go(this, event);"><img src="' + photo + '" onmouseover="cur.calTrailOn(this, ' + fid + ', ' + day + ');\" onmouseout="cur.calTrailOff(this, ' + fid + ');"/></a>';

            if (calEvents.length > 1) {
              showMore = '<a href="" onclick="cur.calShowMore(this, 1, ' + day + ');return false;">' + getLang('events_calendar_show_more') + '</a>';
            }
          }

          rowHTML += '<td class="day_cell day' + (weekDay+1) + ' ' + dayClass + '">\
            <div class="day_num fl_l">' + day + '</div><div class="day_text fl_l">' + dayText + '</div>\
            <div class="day_events clear">' + dayEvents + '</div>\
            <div class="day_more">' + showMore + '</div>\
          </td>';

        } else {
          rowHTML += '<td class="day_cell day' + (weekDay+1) + ' ' + dayClass + '"></td>';
        }
      }

      rows += '<tr class="day_row">' + rowHTML + '</tr>';
    }

    ge('calendar_table_wrap').innerHTML = '<table class="day_table" cellpadding="0" cellspacing="0" align="center">\
      <tr>\
       <td class="day_head day1">' + getLang('events_mon') + '</td>\
       <td class="day_head day2">' + getLang('events_tue') + '</td>\
       <td class="day_head day3">' + getLang('events_wed') + '</td>\
       <td class="day_head day4">' + getLang('events_thu') + '</td>\
       <td class="day_head day5">' + getLang('events_fri') + '</td>\
       <td class="day_head day6">' + getLang('events_sat') + '</td>\
       <td class="day_head day7">' + getLang('events_sun') + '</td>\
      </tr>' + rows + '</table>';

    return false;
  }
});

each(cur.calEvents, function(i,m) {
  each(m, function(j, d) {
    each(d, function(k, item) {
      cur.calEventsById[item[0]] = item;
    });
  });
});

}

var PagedList = function(container, data, options) {
  var isEqual = function(a, b){
    if (!isArray(a) || !isArray(b)) return a == b;
    for (var i = 0; i < a.length; ++i) {
      if(a[i] != b[i])return false;
    }
    return true;
  }

  var isEmpty = function(a){
    if(!a)return true;
    for(var i = 0; i < a.length; ++i){
      if(a[i])return false;
    }
    return true;
  }

  function cloneAr(a) {
    var b = [];
    for (var i = 0; i < a.length; ++i) {
      b[i] = a[i];
    }
    return b;
  }

  var defaults = {
    getRow: function(row) { return ''; },
    setPages: function(page, pages, side) { },
    filter: function(search, row) { return true; },
    perPage: 30,
    emptyRow: function(search){return '<div>no rows</div>';}
  };
  options = options ? extend(defaults, options) : defaults;

  this.data = data;
  var filtered_data = [];
  for (var i = 0; i < data.length; ++i) {
    filtered_data.push(data[i]);
  }

  var current_search = [];
  var current_page = 0;

  this.setData = function(data){
    this.data = data;
    this.getPage(0, current_search, true);
  }

  var getRow = options.getRow.bind(this);

  this.getPage = function(page, search, force) {
    if (search === undefined) search = current_search;
    if (current_page == page && isEqual(search, current_search) && !force) return;
    current_page = page;
    if (options.onStart) options.onStart();
    if (!isEqual(search, current_search)) {
      current_search = cloneAr(search);
      filtered_data = [];
      for (var i = 0; i < this.data.length; ++i) {
        if(!search || options.filter(search, this.data[i]))filtered_data.push(this.data[i]);
      }
    }
    if (!filtered_data.length) {
      ge(container).innerHTML = options.emptyRow(search);
      options.setPages(0, 0, 'top');
      options.setPages(0, 0, 'bottom');
      return;
    }
    var html = [];
    for (var i = page * options.perPage; i < Math.min(filtered_data.length, (page + 1) * options.perPage); ++i) {
      var row = filtered_data[i];
      html.push(getRow(row, current_search));
    }
    var h = getSize(ge(container))[1];
    ge(container).innerHTML = html.join('');
    setStyle(ge(container), {height:(page) ? h : 'auto'});
    if (options.onShow) {
      for (var i = page * options.perPage; i < Math.min(filtered_data.length, (page + 1) * options.perPage); ++i) {
        var row = filtered_data[i];
        options.onShow(row, i);
      }
    }
    var pages = Math.ceil(filtered_data.length / options.perPage);
    options.setPages(page, pages, 'top');
    options.setPages(page, pages, 'bottom');
    if (options.onEnd) options.onEnd();
  }

  this.highlight = function(label, term) {
    term = trim(term);
    if(!term)return label;
    label = term.indexOf(' ') == -1 ? label.split(' ') : [label];
    var tmp = '';
    var termRus = parseLatin(term);

    if (termRus != null) {
      term = term + '|' + termRus;
    }
    var re = new RegExp("(?![^&;]+;)(?!<[^<>]*)((\\(*)(" + term.replace('+', '\\+') + "))(?![^<>]*>)(?![^&;]+;)", "gi");
    for (var i in label) {
      tmp += (i > 0 ? ' ' : '') + label[i].replace(re, "$2<em>$3</em>");
    }
    return tmp;
  }
}

window.replaceChars = function(text, nobr) {
  var res = "";
  for (var i = 0; i<text.length; i++) {
    var c = text.charCodeAt(i);
    switch(c) {
      case 0x26: res += "&amp;"; break;
      case 0x3C: res += "&lt;"; break;
      case 0x3E: res += "&gt;"; break;
      case 0x22: res += "&quot;"; break;
      case 0x0D: res += ""; break;
      case 0x0A: res += nobr?"\t":"<br>"; break;
      case 0x21: res += "&#33;"; break;
      case 0x27: res += "&#39;"; break;
      default:   res += ((c > 0x80 && c < 0xC0) || c > 0x500) ? "&#"+c+";" : text.charAt(i); break;
    }
  }
  return res;
};

var AutoLoadList = function(container, data, options) {
  var isEqual = function(a, b) {
    if (!isArray(a) || !isArray(b)) return a == b;
    return a.toString() == b.toString();
  }

  var isEmpty = function(a) {
    if (!a) return true;
    for (var i = 0; i < a.length; ++i) {
      if(a[i]) return false;
    }
    return true;
  }

  function cloneAr(a) {
    var b = [];
    for (var i = 0; i < a.length; ++i) {
      b[i] = a[i];
    }
    return b;
  }

  var defaults = {
    getRow: function(row) { return ''; },
    filter: function(search, row) { return true; },
    perPage: 30,
    emptyRow: function(search) { return '<div>no rows</div>'; },
    shift: 600
  };
  options = options ? extend(defaults, options) : defaults;

  var filtered_data = [], current_search = [], offset = 0;
  var self = this;

  this.setData = function(data) {
    this.data = data;
    this.showMore(current_search, true);
  }

  container = ge(container);
  var getRow = options.getRow.bind(this), id = container.id;
  var showMoreBox = ge(id+'_show_more'), showMoreLink = ge(id+'_show_more_link');

  this.data = data;
  if (data) {
    filtered_data = cloneAr(data);
  }

  this.loaded = function(res) {
    if (self.data = res) {
      filtered_data = cloneAr(self.data);
    }
    if (self.disabled) {
      return;
    }

    if (self.data) {
      self.showMore(self.loading[1] || null, true, options.perPage * 2);
    } else {
      self.data = false;
      container.innerHTML = options.emptyRow(self.loading[1]);
      hide(showMoreBox);
    }
    self.loading = false;
  }

  this.preload = function() {
    if (self.data !== null || !options.url || self.loading) return;
    self.loading = [false];
    ajax.post(options.url, options.query, {onDone: self.loaded});
  }

  this.showMore = function(search, force, listLen) {
    if (!isVisible(container)) {
      return;
    }
    if(options.onStart) options.onStart();

    var refresh = false;
    if (self.data === null && options.url) {
      if (self.loading) {
        self.loading = [true, search];
        return;
      }
      self.loading = [true, search];
      ajax.post(options.url, options.query, {onDone: self.loaded});
      return;
    }

    if (!listLen) listLen = options.perPage;
    if (search == null) search = current_search;

    if (force) refresh = true;
    if (!isEqual(search, current_search)) {
      current_search = cloneAr(search);
      filtered_data = [];
      var j = 0;
      for (var i = 0; i < this.data.length; ++i) {
        if (!search || options.filter(search, this.data[i])) {
          filtered_data[j] = this.data[i];
          j++;
        }
      }
      refresh = true;
    }

    if (refresh) offset = 0;

    var fLen = filtered_data.length;
    if (!fLen) {
      container.innerHTML = options.emptyRow(search);
      hide(showMoreBox);
      if(options.onEnd) options.onEnd(search, 0);
      return;
    }

    var len = Math.min(fLen, offset + listLen), j = 0, html = [], start = refresh ? 0 : offset;
    for (var i = start; i < len; ++i) {
      html[j] = getRow(filtered_data[i], current_search);
      j++;
    }
    if (refresh) {
      debugLog('full', offset);
      container.innerHTML = html.join('');
    } else {
      container.innerHTML += html.join('');
    }

    if (offset + listLen >= fLen) {
      hide(showMoreBox);
    } else {
      show(showMoreBox);
    }

    if(options.onShow) {
      for (var i = 0; i < len; ++i) {
        options.onShow(filtered_data[i], i);
      }
    }

    offset += listLen;
    if(options.onEnd) options.onEnd(search, fLen);
  };

  var scrollCheck = function() {
    if (browser.mobile || cur.disableAutoMore || self.disabled) return;
    if (!isVisible(showMoreBox) || !isVisible(showMoreLink) || !isVisible(container)) return;

    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY();

    if (st + ch + options.shift > showMoreLink.offsetTop) {
      self.showMore();
    }
  };

  var scrollNode = browser.msie6 ? pageNode : window;

  var addScrollEvents = function() {
    addEvent(scrollNode, 'scroll', scrollCheck);
    addEvent(window, 'resize', scrollCheck);
  }
  cur._back.hide.push(function() {
    removeEvent(scrollNode, 'scroll', scrollCheck);
    removeEvent(window, 'resize', scrollCheck);
  });
  cur._back.show.push(addScrollEvents);
  addScrollEvents();

  this.highlight = function(label, term) {
    term = trim(term);
    if(!term) return label;
    label = term.indexOf(' ') == -1 ? label.split(' ') : [label];
    var tmp = '';
    var termRus = parseLatin(term);

    if (termRus != null) {
      term = term + '|' + termRus;
    }
    var re = new RegExp("(?![^&;]+;)(?!<[^<>]*)((\\(*)(" + term.replace('+', '\\+') + "))(?![^<>]*>)(?![^&;]+;)", "gi");
    for (var i in label) {
      tmp += (i > 0 ? ' ' : '') + label[i].replace(re, "$2<em>$3</em>");
    }
    return tmp;
  };
}

try{stManager.done('events.js');}catch(e){}
