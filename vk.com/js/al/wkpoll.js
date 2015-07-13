var WkPoll = {

init: function(opts, params, tabData, privacyData, lng) {
  setStyle(ge('wk_content'), {width: 620});

  re(cur.lSTL);
  extend(cur, {
    lang: extend(cur.lang || {}, lng),

    wkPollOpts: opts,
    wkPollParams: params,

    wkPollOpt: 0,
    wkPollInd: 0,

    wkPollGraph: false,
    wkPollCriteria: {},
    wkPollCache: {},
    wkPollQuery: {},
    wkPollPhCache: {},
    wkPollPhShown: {},

    wkPollTabsWrap: ge('wk_poll_tabs_wrap'),
    wkPollTabs: ge('wk_poll_tabs'),

    lSTL: wkLayerWrap.appendChild(ce('div', {id: 'layer_stl', innerHTML: '<div id="layer_stl_bg" class="fixed"></div><div id="layer_stl_cl"></div><nobr id="layer_stl_text" class="fixed">' + getLang('global_to_top') + '</nobr>', el: ge('wk_box'), onclick: cancelEvent, onmousedown: WkPoll.lSTLDown, sc: WkPoll.scroll})),
    lSTLShown: 0,
    lSTLWas: 0,
    lSTLWasSet: 0
  });

  wkcur._hide.push(re.pbind(cur.lSTL));
  if (isVisible(cur.wkPollTabsWrap)) {
    if (!browser.msie || browser.version > 7) {
      addEvent(wkLayerWrap, 'scroll', WkPoll.scroll);
    }
    wkcur._hide.push(function () {
      removeEvent(wkLayerWrap, 'scroll', WkPoll.scroll);
    });
  }

  cur.__oldOnPrivacyChanged = cur.onPrivacyChanged;
  cur.onPrivacyChanged = WkPoll.privacyChanged;

  if (tabData) {
    cur.wkPollCache[tabData[0]] = [[tabData[1], tabData[2]], [tabData[3], tabData[4]]];
    cur.wkPollQuery[tabData[0]] = extend({
      act: 'poll_voters',
      post_raw: cur.wkPollParams.post_raw,
      opt_id: tabData[0]
    }, cur.wkPollCriteria);
    WkPoll.tab(tabData[0]);
  }
  cur.privacy = extend(cur.privacy || {}, privacyData);
  onBodyResize();
  WkPoll.scroll();
},

tab: function(opt, one) {
  if (!isVisible(cur.wkPollTabsWrap) || one && !opt) return;
  var act = geByClass1('summary_tab_sel', ge('wk_poll_tabs')), cnt = domPN(ge('wk_poll_opt' + opt));
  if (cnt != act) {
    removeClass(act, 'summary_tab_sel');
    addClass(act, 'summary_tab');
    removeClass(cnt, 'summary_tab');
    addClass(cnt, 'summary_tab_sel');
  }
  for (var i in cur.wkPollCache) {
    if (cur.wkPollCache[i] == 'show') {
      cur.wkPollCache[i] = 'load';
    }
  }
  if (opt) {
    if (!cur.wkPollCache[opt]) cur.wkPollCache[opt] = [];
    if (cur.wkPollCache[opt][0]) {
      if (cur.wkPollCache[opt][0] == 'load') {
        cur.wkPollCache[opt][0] = 'show';
      } else {
        return WkPoll.tabShow(opt);
      }
    }
    cur.wkPollCache[opt] = ['show'];
    cur.wkPollQuery[opt] = extend({
      act: 'poll_voters',
      post_raw: cur.wkPollParams.post_raw,
      opt_id: opt
    }, cur.wkPollCriteria);
    each (['country', 'city', 'age', 'gender'], function(k, param) {
      if (isChecked('wk_poll_extra_' + param)) {
        cur.wkPollQuery[opt][param] = cur.privacy['poll_dmgr_' + param][0].substr(1);
      }
    });
    ajax.post('al_wall.php', cur.wkPollQuery[opt], {onDone: function(html, offset, pHtml, pOffset) {
      var sh = cur.wkPollCache[opt][0];
      if (!sh) return;
      cur.wkPollCache[opt] = [[html, offset], [pHtml, pOffset]];
      if (sh == 'show') {
        WkPoll.tabShow(opt);
//        if (pHtml) WkView.updateSize();
      }
    }, onFail: function() {
      cur.wkPollCache[opt] = cur.wkPollQuery[opt] = false;
      WkPoll.tab(0);
      return true;
    }});
  } else {
    show('wk_poll_stats', 'wk_poll_stats_total', 'wk_poll_dmgr');
    hide('wk_poll_people');
    cur.wkPollOpt = 0;
    WkPoll.update();
  }
},
tabLoaded: function() {
  var opt = cur.wkPollOpt, ind = cur.wkPollInd;
  if (cur.wkPollCache[opt][ind + 1]) return;
  cur.wkPollQuery[opt].offset = cur.wkPollCache[opt][ind][1];
  if (!cur.wkPollQuery[opt].offset) return hide('wk_poll_more', 'wk_poll_more_prg');
  cur.wkPollCache[opt][ind + 1] = 'load';
  ajax.post('al_wall.php', cur.wkPollQuery[opt], {
    onDone: function(html, offset) {
      var opt = cur.wkPollOpt, ind = cur.wkPollInd, sh = cur.wkPollCache[opt][ind + 1];
      if (!cur.wkPollCache[opt] || !cur.wkPollCache[opt][ind] || !cur.wkPollCache[opt][ind][1]) return;
      cur.wkPollCache[opt][ind + 1] = [html, offset];
      if (sh == 'show') WkPoll.more();
    }
  });
},
tabShow: function(opt) {
  cur.wkPollOpt = opt;
  cur.wkPollInd = 0;
  hide('wk_poll_stats', 'wk_poll_stats_total', 'wk_poll_dmgr');
  show('wk_poll_people');
  val('wk_poll_people', cur.wkPollCache[opt][0][0]);
  WkPoll.update();
  cur.wkPollQuery[opt].offset = cur.wkPollCache[opt][0][1];
  WkPoll.tabLoaded();
},

update: function() {
  if (cur.lSTL) {
    cur.lSTLWas = 0;
  }
  WkView.updateHeight();
  if (isVisible(cur.wkPollTabsWrap) && isVisible(cur.wkPollTabs)) {
    var ds = getXY(cur.wkPollTabsWrap, true)[1];
    if (ds < 0) {
      wkLayerWrap.scrollTop += ds + 1;
    }
  }
  WkPoll.scroll();
},

graph: function() {
  if (!cur.wkPollGraph) {
    hide('wk_poll_tabs_wrap');
    show('wk_poll_grtabs');
    cur.wkPollGraph = true;
    var showGraphLabel = ge('wk_poll_show_graph');
    var back = showGraphLabel.innerHTML;
    showGraphLabel.innerHTML = '<img src="/images/upload.gif" />';
    WkPoll.updateDemography(function() {
      addClass(ge('wk_content'), 'wk_poll_graph');
      hide('wk_poll_stats');
      hide(showGraphLabel);
      showGraphLabel.innerHTML = back;
      show('wk_poll_hide_graph');
      show('wk_poll_graph');
    });
  }
},
graphUpdate: function(criteria, callback) {
  var progress = ge('wk_poll_stat_load');
  var cont = ge('wk_poll_graph');
  ajax.post('widget_poll.php', extend({act: 'show_graph'}, cur.wkPollOpts, criteria || {}), {
    onDone: function(html, js, options) {
      var size = getSize(cont);
      size[1] -= intval(getStyle(cont, 'paddingTop')) + intval(getStyle(cont, 'paddingBottom'))
      if (size[1] > 200) {
        setStyle(cont, {height: size[1]});
      }
      cont.innerHTML = html;
      eval(js);
      if (callback) {
        callback(options);
      }
    },
    showProgress: show.pbind(progress),
    hideProgress: hide.pbind(progress)
  });
},
graphFilter: function(obj, percent, amount) {
  var act = geByClass1('summary_tab_sel', ge('wk_poll_grtabs')), cnt = domPN(obj);
  if (cnt != act) {
    removeClass(act, 'summary_tab_sel');
    addClass(act, 'summary_tab');
    removeClass(cnt, 'summary_tab');
    addClass(cnt, 'summary_tab_sel');
  }
  cur.wkPollCriteria['percent'] = percent;
  cur.wkPollCriteria['amount'] = amount;
  WkPoll.updateDemography();
},
graphHide: function() {
  show('wk_poll_stats');
  hide('wk_poll_graph')
  show('wk_poll_show_graph');
  hide('wk_poll_hide_graph');
  if (domFC(domFC(ge('wk_poll_tabs')))) show('wk_poll_tabs_wrap');
  hide('wk_poll_grtabs');
  cur.wkPollGraph = false;
  removeClass(ge('wk_content'), 'wk_poll_graph');
},

updatedDemography: function(type) {
  cur.wkPollCache = {};
  clearTimeout(cur.wkPollUpdateTO);
  cur.wkPollUpdateTO = setTimeout(WkPoll.updateDemography, 500);
  if (type == 'country') {
    var cityId = false,
        cityName = false,
        citiesLen = 0;
    if (isChecked('wk_poll_extra_country')) {
      var country = cur.privacy.poll_dmgr_country[0],
          cities = cur.privacy.poll_dmgr_city_counties[country];

      if (cities) {
        each (cities, function (k, v) {
          citiesLen++;
          if (cityId || cityName) return;
          cityId = k;
          cityName = v;
        });
      }
      // debugLog(citiesLen, cityId, cityName);
      if (citiesLen > 1) {
        cur.privacy.poll_dmgr_city_types = cities;
        val('privacy_edit_poll_dmgr_city_wrap', '<a id="privacy_edit_poll_dmgr_city" href="#" onclick="if (checkEvent(event) === false) Privacy.show(this, event, \'poll_dmgr_city\'); return false;">' + cityName + '</a>');
      } else if (citiesLen) {
        val('privacy_edit_poll_dmgr_city_wrap', cityName);
      }
    }
    cur.privacy.poll_dmgr_city[0] = cityId;
    toggle('wk_poll_extra_city', citiesLen);
    checkbox('wk_poll_extra_city', 0);
  }
},
updateDemography: function(callback) {
  var criteria = clone(cur.wkPollCriteria);
  each (['country', 'city', 'age', 'gender'], function (k, param) {
    if (isChecked('wk_poll_extra_' + param)) {
      criteria[param] = cur.privacy['poll_dmgr_' + param][0].substr(1); // remove prepending underscore
    }
  });

  var onUpdate = function (options) {
    var total = 0;
    each(options, function (optId, optData) {
      total += parseInt(optData.countRaw || optData.count);
      animate(ge('wk_poll_row' + optId), {width: (optData.width * 534 / 100)}, 200, function () {
        val('wk_poll_row_percent' + optId, optData.percent + '%');
        val('wk_poll_row_count' + optId, optData.count);
      });
      if (ge('wk_poll_usrs' + optId)) {
        val('wk_poll_usrs' + optId, optData.people);
      }
    })
    if (total) {
      var totalLng = cur.wkPollParams.lang['wall_X_people_voted_X'];
      var l = langNumeric(total, totalLng, true);
      var totalStr = '';
      if (criteria['country']) {
        var from = '';
        var c = cur.privacy['poll_dmgr_city_counties']['_'+criteria['country']];
        if (c && criteria['city'] && c['_'+criteria['city']]) {
          from = c['_'+criteria['city']];
        } else {
          from = cur.privacy['poll_dmgr_country_types']['_'+criteria['country']];
        }
        totalStr += cur.wkPollParams.lang['wall_X_people_voted_from'].replace('%s', from);
      }
      if (criteria['age']) {
        var c = cur.privacy['poll_dmgr_age_types']['_'+criteria['age']];
        if (c) {
          totalStr += cur.wkPollParams.lang['wall_X_people_voted_by_age'].replace('%s', c);
        }
      }
      if (criteria['gender']) {
        totalStr += ' '+cur.wkPollParams.lang['wall_voted_gender_'+intval(criteria['gender'])];
      }
      l = l.replace(/%s|{criteria}/, totalStr);
    } else {
      var l = cur.wkPollParams.lang['wall_X_people_voted_empty'];
    }
    if (ge('wk_poll_total').innerHTML != l) {
      animate(ge('wk_poll_total'), {opacity: 0}, 100, function() {
        ge('wk_poll_total').innerHTML = l;
        animate(ge('wk_poll_total'), {opacity:1}, 100);
      });
    }
    if (callback) {
      callback();
    }
  }

  if (cur.wkPollGraph) {
    WkPoll.graphUpdate(criteria, onUpdate);
  } else {
    ajax.post('al_wall.php', extend({act: 'poll_demography'}, cur.wkPollOpts, criteria), {
      onDone: onUpdate
    });
  }
},

privacyChanged: function(key) {
  if (key.indexOf('poll_dmgr')) return cur.__oldOnPrivacyChanged(key);
  var param = key.substr(10);
  checkbox('wk_poll_extra_' + param, 1);
  WkPoll.updatedDemography(param);
},

more: function() {
  var opt = cur.wkPollOpt, ind = cur.wkPollInd, data = cur.wkPollCache[opt][ind + 1];
  show('wk_poll_more_prg');
  hide('wk_poll_more');
  if (!data) return WkPoll.tabLoaded();
  if (data == 'load' || data == 'show') {
    cur.wkPollCache[opt][ind + 1] = 'show';
    return;
  }
  var el = ce('div', {innerHTML: data[0]}), cont = ge('wk_poll_people_rows');
  while (domFC(el)) cont.appendChild(domFC(el));
  ++cur.wkPollInd;
  WkView.updateHeight();
  hide('wk_poll_more_prg');
  if (data[1]) {
    show('wk_poll_more');
    WkPoll.tabLoaded();
  } else {
    hide('wk_poll_more');
  }
},

lSTLDown: function(e) {
  e = e || window.event;
  if (checkEvent(e)) return;

  if (!__afterFocus) {
    var to = 0, st = wkLayerWrap.scrollTop;
    if (cur.lSTLWasSet && cur.lSTLWas) {
      to = cur.lSTLWas;
      cur.lSTLWas = 0;
    } else {
      cur.lSTLWas = st;
    }
    wkLayerWrap.scrollTop = to;
/*    var diff = st - to;
    if (Math.abs(diff) > 6) {
      wkLayerWrap.scrollTop = (to + (diff > 0 ? 6 : -6));
    }
    setTimeout(function() {
      animate(wkLayerWrap, {scrollTop: to, transition: Fx.Transitions.easeInCirc}, 100);
    }, 0);/**/
  }
  return cancelEvent(e);
},
scroll: function() {
  var st = wkLayerWrap.scrollTop, mx = 200, vis = cur.lSTLWas || (st > mx), o = 0;
  cur.lSTL.style.marginTop = st + 'px';
  if (!vis) {
    if (cur.lSTLShown !== 0) {
      hide(cur.lSTL);
      cur.lSTLShown = 0;
    }
  } else {
    if (cur.lSTLShown !== 1) {
      show(cur.lSTL);
      cur.lSTLShown = 1;
    }
    if (cur.lSTLWas && st > 500) {
      cur.lSTLWas = 0;
    }
    if (st > mx) {
      o = (st - mx) / mx;
      if (cur.lSTLWasSet) {
        cur.lSTLWasSet = 0;
        val(domLC(cur.lSTL), getLang('global_to_top'));
        removeClass(domLC(cur.lSTL), 'down');
      }
    } else {
      o = (mx - st) / mx;
      if (cur.lSTLWas) {
        if (!cur.lSTLWasSet) {
          cur.lSTLWasSet = 1;
          val(domLC(cur.lSTL), '');
          addClass(domLC(cur.lSTL), 'down');
        }
      }
    }
  }
  setStyle(cur.lSTL, {opacity: Math.min(Math.max(o, 0), 1)});
  var more = ge('wk_poll_more');
  if (cur.wkPollOpt && isVisible(more) && getXY(more, true)[1] < lastWindowHeight) {
    WkPoll.more();
  }
  if (isVisible(cur.wkPollTabs)) {
    if (getXY(cur.wkPollTabsWrap, true)[1] < 0) {
      if (!cur.wkPollFixed) {
        setStyle(cur.wkPollTabsWrap, 'height', domFC(cur.wkPollTabs).offsetHeight);
        setStyle(domFC(cur.wkPollTabs), 'width', intval(getStyle(domFC(cur.wkPollTabs), 'width')));
        addClass(cur.wkPollTabs, 'wk_poll_fixed');
        cur.wkPollFixed = true;
      }
    } else {
      if (cur.wkPollFixed) {
        removeClass(cur.wkPollTabs, 'wk_poll_fixed');
        cur.wkPollFixed = false;
      }
    }
  }
},

vote: function(option, params) {
  addClass(option, 'on');
  var progress = geByClass1('progress', option);
  ajax.post('widget_poll.php', extend({
    act: 'a_vote',
    no_widget: 1,
    wkpoll: 1
  }, params), {
    onDone: function(html) {
      var wkRaw = wkcur.wkRaw;
      WkView.hide(false, true, null);
      showWiki({w: wkRaw}, false, null);
    },
    showProgress: addClass.pbind(progress, 'progress_inline'),
    hideProgress: removeClass.pbind(progress, 'progress_inline')
  });
},

exportBox: function() {
  showBox('al_wall.php', extend({act: 'poll_export_box'}, cur.wkPollOpts));
},

bigphOver: function(obj, uid) {
  if (!cur.lang || !cur.lang.global_photo_full_size || !cur.wkPollPhShown || browser.mobile) return;
  var o = obj.firstChild, ch = cur.wkPollPhCache[uid];
  if (o.tagName != 'A' || o.className != 'wk_pollph') {
    (o = obj.insertBefore(ce('a', {className: 'wk_pollph', href: ch && ch._id ? ('/photo' + ch._id + '?all=1') : ('/albums' + uid), innerHTML: '<span class="wk_pollph_label">' + getLang('global_photo_full_size') + '</span>'}), obj.firstChild)).onclick = WkPoll.bigphClick.pbind(uid);
    o._uid = uid;
  }

  clearTimeout(o.hideTO);
  animate(o, {marginTop: 75}, {duration: 200, transition: Fx.Transitions.easeOutCirc});
  cur.wkPollPhShown[uid] = o;

  if (!obj.onmouseout) obj.onmouseout = WkPoll.bigphOut.pbind(obj);
},
bigphOut: function(obj) {
  var o = obj.firstChild;
  if (!o || o.tagName != 'A' || o.className != 'wk_pollph') return;

  clearTimeout(o.hideTO);
  o.hideTO = setTimeout(function() {
    animate(o, {marginTop: 100}, 200);
    delete(cur.wkPollPhShown[o._uid]);
  }, 150);
},
bigphClick: function(uid, ev) {
  if (checkEvent(ev) !== false) return;

  var ch = cur.wkPollPhCache[uid], o = cur.wkPollPhShown[uid], obj = domPN(o);
  if (!o || !obj) return;
  if (ch === undefined) {
    ch = cur.wkPollPhCache[uid] = 'show';
    ajax.post('al_photos.php', {act: 'fast_get_photo', oid: uid}, {onDone: function(res) {
      if (!res) {
        obj.onmouseover = function() {};
        re(o);
        return;
      }
      var sh = (cur.wkPollPhCache[uid] == 'show');
      cur.wkPollPhCache[uid] = res;
      o.href = '/photo' + res._id + '?all=1';
      if (sh) WkPoll.bigphClick(uid);
    }, onFail: function() {
      obj.onmouseover = function() {};
      re(o);
      return true;
    }});
  }
  if (ch == 'show') {
    return cancelEvent(ev);
  }
  if (!ch) return;

  for (var i in cur.wkPollPhShown) {
    animate(cur.wkPollPhShown[i], {marginTop: 100}, 0);
  }
  cur.wkPollPhShown = {};
  extend(ch, {jumpTo: {z: 'albums' + uid}, queue: 1});
  return showPhoto(ch._id, 'album' + uid + '_0/rev', ch, ev);
}

};

try{stManager.done('wkpoll.js');}catch(e){}
