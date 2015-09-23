var slide_show = function(elem) {
  if (!isVisible(elem)) slideDown(elem, 150);
};

var slide_hide = function(elem) {
  if (isVisible(elem)) slideUp(elem, 150);
};


var searcher = {
  getSectionParams: function(section) {
    var form = ge('filter_form'), params = {};
    if (!form || section && section != cur.section || cur.section == 'quick') {
      params = {'c[section]': section || cur.section, 'c[q]': val('search_query')};
    } else {
      params = serializeForm(form) || {};
    }
    params['c[q]'] = val('search_query');
    for (var i in params) {
      if (!params[i] || params[i] == '0') delete params[i];
    }
    if (cur.section == 'video' && !params['c[sort]']) {
      params['c[sort]'] = '0';
    }
    if (cur.section == 'people' && ge('c[name]') && !params['c[name]']) {
      params['c[name]'] = '0';
    }
    if (cur.section == 'people' && ge('c[photo]') && !params['c[photo]']) {
      params['c[photo]'] = '0';
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
    opts = opts || {};
    var params = searcher.getSectionParams(newSection);
    if (newSection != 'auto' && newSection != 'quick' && opts.updateStats) {
      params.swt = 1;
    }
    if (opts.tab) {
      params.tab = 1;
    }
    if (ge('search_section_tabs')) {
      each(geByClass('active', ge('search_section_tabs')), function(i, v) {
        removeClass(v, 'active');
      });
      if (ge('search_'+newSection+'_tab')) addClass(ge('search_'+newSection+'_tab'), 'active');
    }
    searcher.setSection(newSection);
    searcher.sendSearchReq(params, true);
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
    return searcher.switchSection(section, {updateStats: true}, event);
  },
  updResults: function(data) {
    var params = searcher.getSectionParams();
    if (searcher.sameParams(params) || params['c[section]'] == 'video' && !params['c[q]'] && !nav.objLoc['c[q]']) return false;
    if (cur.onSearchChange) {
      cur.onSearchChange(params);
    }
    if (ge('search_communities_filters')) {
      toggle('search_communities_filters', !!params['c[q]']);
        each(geByClass('search_catalog_row', ge('search_catalog_filters')), function() {
          removeClass(this, 'selected');
        });
        var curSel = params['c[q]'] ? ge('search_results_filter') : ge('search_category_' + intval(params['c[category]']));
        addClass(curSel, 'selected');
    }
    searcher.sendSearchReq(params, cur.section == 'auto' && !params.offset);
    if (hasClass(ge('search_filters'), 'fixed')) {
      scrollToTop();
    }
  },
  onInputChange: function (e) {
    clearTimeout(cur.requestTimeout);
    if (e && (e.type != 'keydown' || e.keyCode == 13)) {
      searcher.updResults();
    } else {
      cur.requestTimeout = setTimeout(function () {searcher.updResults()}, 1000);
    }
  },
  onKey: function () {
    var v = val('search_query'), reset_el = ge('search_query_reset')
    setStyle(reset_el, {opacity: 0.5});
    toggleClass(reset_el, 'shown', v);
    if (cur.section != 'quick') return;
    clearTimeout(cur.requestTimeout);
    cur.requestTimeout = setTimeout(function () {searcher.updResults()}, 300);
  },
  sendSearchReq: function (params, changeSection) {
    if (cur.searchReq) {
      try {
        cur.searchReq.abort();
      } catch (e) {debugLog(e);}
    }
    if (changeSection && !params.offset) {
      vk.no_ads = inArray(params['c[section]'], ['audio']);
      extend(params, {uf: 1});
    }
    if (cur.useRec !== undefined) {
      params.rec = cur.useRec;
      delete cur.useRec;
    }
    params.edit = nav.objLoc.edit;
    params.sign = nav.objLoc.sign;
    params.all = nav.objLoc.all;
    params.change = 1;
    if (cur.topType !== undefined) {
      params.type = cur.topType;
      delete cur.topType;
    }
    if (window.iSearch && iSearch.select) {
      iSearch.select.hide();
      delete cur.setISearch;
    }
    if (!cur.loadingMedia) {
      addClass(ge('search_query_wrap'), 'loading');
    }
    cur.params = params;
    cur.searchReq = ajax.post('al_search.php', params, {
      onDone: function (options, rows, sections, filters) {
        var res = (params.uf && ge('results_wrap')) ? ge('results_wrap') : ge('results'),
            filters_el = ge('sections_filter') ? ge('search_filters') : ge('filters');
        res.innerHTML = rows || '';
        if (ge('sections_filter')) {
          ge('sections_filter').innerHTML = sections || '';
        }
        if (changeSection) {
          filters_el.innerHTML = filters || '';
          ge('search_query').focus();
          if (options.loc) {
            var currentURL = locProtocol+'//'+location.host+'/'+options.loc;
            var referrer = (document.URL == currentURL) ? '' : document.URL;
            setTimeout(updateOtherCounters.pbind(currentURL, referrer), 10);
          }
        }
        searcher.applyOptions(options, changeSection);
        if (changeSection && ge('search_section_tabs')) {
          each(geByClass('active', ge('search_section_tabs')), function(i, v) {
            removeClass(v, 'active');
          });
          if (ge('search_'+cur.section+'_tab')) addClass(ge('search_'+cur.section+'_tab'), 'active');
        }
        if (TopSearch && TopSearch.tsNeedsClear) {
          TopSearch.clear();
          TopSearch.toggleInput(false, true);
          delete TopSearch.tsNeedsClear;
        }
        removeClass(ge('search_query_wrap'), 'loading');
        var _a = window.audioPlayer;
        if (_a && _a.showCurrentTrack) _a.showCurrentTrack();
        if (cur.onSearchFinish) {
          cur.onSearchFinish();
        }
        if (params['c[section]'] == 'video') {
          toggleClass(ge('results_wrap'), 'no_query', !params['c[q]']);
        } else {
          removeClass(ge('results_wrap'), 'no_query');
        }
        shortCurrency();
      },
      onFail: function () {
        removeClass(ge('search_query_wrap'), 'loading');
        return true;
      },
      showProgress: function () {
        addClass(ge('filter_'+cur.section), 'loading');
        cur.isSearchLoading = true;
      },
      hideProgress: function () {
        removeClass(ge('filter_'+cur.section), 'loading');
        cur.isSearchLoading = false;
        cur.loadingMedia = false;
      },
      ads: !!(changeSection && !params.offset)
    });
  },
  setSection: function (newSection) {
    if (newSection == cur.section || newSection == 'auto' || !newSection) return;
    if (ge('filter_' + cur.section)) {
      removeClass(ge('filter_' + cur.section), 'cur_section');
      removeClass(ge('filter_' + cur.section), 'loading');
    }
    cur.section = newSection;
    addClass(ge('filter_' + cur.section), 'cur_section');
  },
  applyOptions: function(options, changeSection) {
    iSearch.initSelect();
    searcher.setSection(options.section);
    if (options.reply_names) {
      extend(cur.options.reply_names, options.reply_names);
      delete options.reply_names;
    }
    extend(cur, options);
    if (options.summary) {
      ge('summary').innerHTML = options.summary;
    }
    if (options.auto_rows !== undefined) {
      ge('search_auto_rows').innerHTML = options.auto_rows || '';
    }
    clearTimeout(cur.setLocTO);
    if (options.loc) {
      if (changeSection) {
        try {
        nav.setLoc(options.loc);
        } catch (e) {debugLog(e);}
      } else {
        cur.setLocTO = setTimeout(function () {
          if (nav.objLoc[0] != 'search' && nav.objLoc[0] != 'communities' && nav.objLoc[0] != 'brands' && !nav.objLoc[0].match(/^people($|\/)/)) return;
          try {
          nav.setLoc(options.loc);
          } catch (e) {debugLog(e);}
        }, 100);
      }
    }
    if (options.htitle) {
      document.title = replaceEntities(stripHTML(options.htitle));
    }
    if (options.q !== undefined) {
      val('search_query', replaceEntities(stripHTML(options.q)) || '');
      var reset_el = ge('search_query_reset');
      setStyle('search_query_reset', {opacity: 0.5});
      toggleClass(reset_el, 'shown', options.q);
    }
    if (options.tabs && ge('search_section_tabs')) {
      ge('search_section_tabs').innerHTML = options.tabs;
    }
    if (options.script) {
      eval(options.script);
    }
    var res = ge('results'), sc = ge('search_content'), lighted = hasClass(sc, 'highlight');
    res.className = 'results ' + cur.section + '_results' + (cur.section == 'statuses' || cur.section == 'auto' ? ' wall_module wide_wall_module' : '');
    if (lighted) addClass(sc, 'highlight')
    var more_results = ge('search_more_results');
    if (cur.has_more || more_results && more_results.firstChild) {
      hide('seach_pages');
      show('show_more_link');
    } else {
      hide('show_more_link')
    }
  },
  toggleFilter: function (obj, target) {
    if (hasClass(obj, 'filter_shut') || !isVisible(target)) {
     addClass(obj, 'filter_open');
     removeClass(obj, 'filter_shut');
     var extraH = slideDown(target, 200).to.height;
     searcher.checkFiltersHeight(extraH);
    } else {
     slideUp(target, 200, function(){
       addClass(obj, 'filter_shut');
       removeClass(obj, 'filter_open');
     });
    }
  },
  switchFilter: function(param, value, el, event) {
    if (checkEvent(event)) return false;
    if (el && hasClass(el, 'active')) return;
    if (ge('c['+param+']')) ge('c['+param+']').value = value;
    if (cur.section == 'video' && param == 'quality') {
      if (ge('c[hd]')) ge('c[hd]').value = value < 0 ? 0 : 1;
    }
    if (el) {
      each(geByClass(param, el.parentNode), function(i, v) {
        if (hasClass(v, 'active')) removeClass(v, 'active');
      });
      addClass(el, 'active');
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
    var show_more_link = ge('show_more_link'), nextRows = ge('search_more_results');
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
      hide('show_more_link');
      return;
    }
    cur.disableAutoMore = false;
    cur.isSearchLoading = true;
    hide('show_more');
    show('show_more_progress');
    var params = extend(searcher.getSectionParams(), {offset: cur.offset});
    params.edit = nav.objLoc.edit;
    params.sign = nav.objLoc.sign;
    params.all = nav.objLoc.all;
    ajax.post('al_search.php', params, {
      onDone: function (options, rows) {
        cur.isSearchLoading = false;
        if (rows) {
          if (ge('no_results')) re('no_results');
          ge('results').insertBefore(ce('div', {innerHTML: rows, id: 'search_more_results'}), show_more_link);
        }
        show('show_more');
        hide('show_more_progress');
        searcher.applyOptions(options);
        searcher.scrollCheck();
      },
      showProgress: function () {
      },
      hideProgress: function () {
      },
      cache: (params['c[section]'] == 'audio' && !params['c[q]']) ? 0 : 1
    });
  },
  close: function () {
    return nav.go(cur.search_return_to, {}, {back: true});
  },
  checkFiltersHeight: function(extraH) {
    if (!ge('filters_td')) return false;
    var st = scrollGetY(),
        filt = ge('filters_td'), filtPos = getXY(filt)[1], filtY = getSize(filt)[1],
        sf = ge('search_filters'), sfY = getSize(sf)[1],
        lastPos = cur.filterLastPos || 0, filtPad = filtY + filtPos - sfY - lastPos - st;
    if  (hasClass(sf, 'fixed') && filtPad < extraH) {
      animate(sf, {top: (lastPos - extraH + filtPad) + 'px'}, 200, function() {
        cur.filterLastPos += filtPad - extraH;
      })
    }
  },
  handleFilterPos: function() {
    if (!ge('filters_td')) return false;
    var st = scrollGetY(), wh = window.lastWindowHeight || 0, pos = 0,
        filt = ge('filters_td'), filtPos = getXY(filt)[1], filtY = getSize(filt)[1],
        sf = ge('search_filters'), sfPos = getXY(sf)[1], sfY = getSize(sf)[1],
        bottomPad = Math.max(0, st + wh - filtY - filtPos),
        tooBig = (filtY - sfY < 20),
        lastPos = cur.filterLastPos || 0, lastSt = cur.lastSt || 0;
    if  (st > filtPos && !tooBig) {
      addClass(sf, 'fixed');
      searcher.fixPositionFixed();
      pos = (wh > sfY) ? Math.min(0, wh - sfY - bottomPad) : Math.max(Math.min(0, lastPos + lastSt - st), wh - sfY - bottomPad);
      if (cur.onSearchPosChange) {
        cur.onSearchPosChange(true, pos);
      }
    } else {
      removeClass(sf, 'fixed');
      searcher.fixPositionFixed();
      pos = 0;
      if (cur.onSearchPosChange) {
        cur.onSearchPosChange(false, pos);
      }
    }
    cur.filterLastPos = pos;
    cur.lastSt = st;
    setStyle(sf, {top: pos + 'px'});
  },
  subscribe: function(el, oid, hash, sub, from, confirm) {
    var address, params;
    cur.unsubscribed = cur.unsubscribed || {};
    if (!sub && confirm && !cur.unsubscribed[oid]) {
      var box = showFastBox({title: getLang('global_warning'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang(confirm), getLang('search_group_leave'), function() {
        box.hide();
        searcher.subscribe(el, oid, hash, sub, from);
      }, getLang('global_cancel'));
      return false;
    }
    if (sub) {
      address = 'al_feed.php';
      params = {act: 'subscr', oid: oid, hash: hash, from: from || 'search'};
    } else {
      address = 'al_fans.php';
      params = {act: 'unsub', oid: oid, hash: hash, from: 'search'};
    }
    ajax.post(address, params, {
      onDone: function() {
        toggle('search_sub' + oid, !sub);
        toggle('search_unsub' + oid, !!sub);
        if (!sub) {
          cur.unsubscribed[oid] = 1;
        }
      },
      showProgress: function() {
        lockButton(el);
      },
      hideProgress: function() {
        unlockButton(el);
      }
    });
  },

  onResize: function() {
    searcher.fixPositionFixed();
    searcher.scrollCheck();
  },

  fixPositionFixed: function() {
    var sf = ge('search_filters');
    if (sf && isVisible(sf)) {
      if (hasClass(sf, 'fixed')) {
        sf.style.marginLeft = (vk.rtl ? -379.5 : 207.5) - document.body.scrollLeft + 'px';
      } else {
        sf.style.marginLeft = 0;
      }
    }
  },

  // scrollTop check
  scrollCheck: function () {
    searcher.handleFilterPos();
    if (browser.mobile || cur.isSearchLoading || cur.disableAutoMore) return;
    var el = ge('show_more_link')
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

  init: function (options) {
    extend(cur, {
      oid: options.user_id,
      module: 'search',
      bigphCache: {},
      bigphShown: {}
      // Decomment
      // disableAutoMore: true,
    });
    var hist_len = globalHistory.length;
    if (hist_len && globalHistory[hist_len - 1] && globalHistory[hist_len - 1].loc.indexOf('search')) {
      cur.search_return_to = globalHistory[hist_len - 1].loc;
    } else {
      cur.search_return_to = '/';
    }
    hide('header');
    var el = ge('search_query'), reset_el = ge('search_query_reset');
    placeholderSetup(el, {back: true});
    iSearch.destroy();
    if (vk.id) {
      iSearch.init(el);
    }
    addEvent(el, 'focus', function() {addClass(ge('search_content'), 'highlight');});
    addEvent(el, 'blur', function() {removeClass(ge('search_content'), 'highlight');});
    if (browser.opera_mobile) {
      addEvent(el, 'blur', function (e) {
        if (val(el)) {
          searcher.updResults(true);
          clearTimeout(cur.requestTimeout);
          return cancelEvent(e);
        }
      });
    } else {
      addEvent(el, 'keyup', searcher.onKey);
      addEvent(el, 'keydown', function (e) {
        if (val(el) && e.keyCode == KEY.RETURN && (!iSearch.select || iSearch.select.active < 0)) {
          searcher.updResults(true);
          el.blur();
          clearTimeout(cur.requestTimeout);
          return cancelEvent(e);
        }
      });
    }
    el.focus();
    toggleClass(reset_el, 'shown', val(el));
    addEvent(reset_el, 'mouseover mouseout click', function (e) {
      if (e.type != 'click') {
        if (isVisible(reset_el))
          animate(reset_el, {opacity: e.type == 'mouseover' ? 1 : 0.5}, 100);
        return;
      }
      val(el, '');
      el.focus();
      triggerEvent(el, 'keyup');
      searcher.updResults();
    });

    cur.nav.push(function(changed, old, n) {
      if (changed[0] !== undefined) {
        clearTimeout(cur.setLocTO);
        if (nav.strLoc != cur.loc && cur.loc) {
          hab.setLoc(cur.loc);
        }
        return;
      }
      var params = clone(n);
      delete(params[0]);
      searcher.setSection(params['c[section]'] || params.section || 'quick');
      searcher.sendSearchReq(params, true);
      return false;
    });

    if (!cur.options) {
      cur.options = {reply_names: {}};
    }
    extend(cur.options, options);
    searcher.applyOptions(options);

    // Scroll check routine
    searcher.scrollnode = browser.msie6 ? pageNode : window;
    window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0;
    addEvent(searcher.scrollnode, 'scroll', searcher.scrollCheck);
    addEvent(window, 'resize', searcher.onResize);
    setTimeout(searcher.scrollCheck, 50);

    var _a = window.audioPlayer;
    if (_a && _a.showCurrentTrack) _a.showCurrentTrack();

    cur._back = {
      text: getLang('search_back_to'),
      show: [function () {
        hide('header');
        var hist_len = globalHistory.length;
        if (hist_len && globalHistory[hist_len - 1] && globalHistory[hist_len - 1].loc.indexOf('search')) {
          cur.search_return_to = globalHistory[hist_len - 1].loc;
        }
        addEvent(searcher.scrollnode, 'scroll', searcher.scrollCheck);
        addEvent(window, 'resize', searcher.onResize);
        iSearch.destroy();
        if (vk.id) {
          iSearch.init(ge('search_query'));
        }
      }],
      hide: [function () {
        removeEvent(searcher.scrollnode, 'scroll', searcher.scrollCheck);
        removeEvent(window, 'resize', searcher.onResize);
        iSearch.destroy();
        for (var i in cur.bigphShown) {
          animate(cur.bigphShown[i], {marginTop: 100}, 0);
        }
        cur.bigphShown = {};
      }]
    }
  },

  bigphOver: function(obj, uid) {
    if (!window.lang || !lang.global_photo_full_size) return;
    var o = obj.firstChild, ch = cur.bigphCache[uid];
    if (o.tagName != 'A' || o.className != 'search_bigph') {
      (o = obj.insertBefore(ce('a', {className: 'search_bigph', href: ch && ch._id ? ('/photo' + ch._id + '?all=1') : ('/albums' + uid), innerHTML: '<span class="search_bigph_label">' + getLang('global_photo_full_size') + '</span>'}), obj.firstChild)).onclick = Searcher.bigphClick.pbind(uid);
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
        if (sh) Searcher.bigphClick(uid);
      }, onFail: function() {
        obj.onmouseover = function() {};
        re(obj.firstChild);
        return true;
      }});
    }

    if (!obj.onmouseout) obj.onmouseout = Searcher.bigphOut.pbind(obj);
  },
  bigphOut: function(obj) {
    var o = obj.firstChild;
    if (!o || o.tagName != 'A' || o.className != 'search_bigph') return;

    clearTimeout(o.hideTO);
    o.hideTO = setTimeout(function() {
      animate(o, {marginTop: 100}, 200);
      delete(cur.bigphShown[o._uid]);
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
  }

}, Searcher = searcher;

if (window.iSearch === undefined) {
iSearch = {
  init: function (input, options) {
    if (this.inited) {
      return;
    }
    var self = this;
    this.inited = true;
    this.input = input;
    this.cont = input.parentNode.parentNode;
    var resultContainer = ce('div', {className: 'results_container', innerHTML: '<div class="result_list"></div><div class="result_list_shadow"><div class="shadow1"></div><div class="shadow2"></div></div>'});
    this.cont.appendChild(resultContainer);
    this.resultList = geByClass('result_list', resultContainer)[0];
    this.resultListShadow = geByClass('result_list_shadow', resultContainer)[0];
    hide(this.resultList, this.resultListShadow);

    if (browser.chrome) this.resultList.style.opacity = 1;
    else if (!browser.safari) setStyle(this.resultListShadow, 'top', browser.mozilla ? 0 : (browser.msie && browser.version < 8) ? 0 : -1);
    this.resultList.style.width = this.resultListShadow.style.width = resultContainer.style.width = hasClass(ge('search_query_wrap'), 'wide') ? '512px' : '451px';

    this.onShowCallback = options ? options.onShow : false;

    this.initSelect(options);

    addEvent(input, 'keyup click mouseup', self.inputUpHandler);
    addEvent(document, 'click', self.documentClick);
    addEvent(input, 'keypress keydown', self.inputDownHandler);

    if (ge('top_search')) ge('top_search').onclick = function (e) {
      if (hab.getLoc().indexOf('search')) {
        return nav.go('search', e, {search: true, noframe: true});
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
      ajax.post('/hints.php?act=a_gsearch_hints', {q: term, section: section}, {
        onDone: function (data) {
          if (self.currentTerm == term && cur.setISearch) self.showSelectList(term, data);
          delete cur.setISearch;
        }, cache: 1
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

    if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
      if (self.select && self.select.isVisible()) {
        triggerEvent(document, e.type, e);
        return cancelEvent(e);
      }
    } else if (e.keyCode == KEY.SPACE) {
      var el = self.select.list.childNodes[self.select.active], id = el ? el.getAttribute('val') : '', item;
      each(self.lastItems, function () {
        if (this[0] == id) {
          item = this;
        }
      });
      if (!item) return;
      val(input, item[3] + ' ');
      focusAtEnd(input);
      return cancelEvent(e);
    }
    return true;
  },

  initSelect: function(options) {
    if (this.select || !window.Select || !window._ui) return;
    if (!this.resultList || !this.resultListShadow) {
      return;
    }
    this.guid = _ui.reg(this);
    var _this = this;
    this.select = new Select(this.resultList, this.resultListShadow, {
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
  showSelectList: function (term, items) {
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
    each(this.lastItems, function () {
      if (this[0] == id) {
        item = this;
      }
    });
    if (!item) return;
    var el = ce('div', {innerHTML: item[3]});
    val(this.input, el.innerText || el.textContent);
    this.input.blur();
    searcher.updResults();
  },
  onEvent: function(e) {
    if (e.type == (browser.opera || browser.mozilla ? 'keypress' : 'keydown')) {
      this.select.handleKeyEvent(e);
    }
  },
  destroy: function (prevCur) {
    cleanElems(this.resultList, this.resultListShadow);
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
    this.resultList.style.width = this.resultListShadow.style.width = width;
  }
}
}

// Extra functions for sections
window.searchActions = {
  peopleMessage: function (mid) {
    showWriteMessageBox(window.event || {}, mid);
  },
  peopleAction: function (link, url, params) {
    ajax.post(url, params, {onDone: function(text) {
      link.parentNode.replaceChild(ce('span', {innerHTML: text}).firstChild, link);
    }});
  },
  ownerAction: function (link, url, params) {
    ajax.post(url, params, {onDone: function(text) {
      link.parentNode.innerHTML = text;
    }});
  },
  groupAction: function(link, action, gid, mid, hash) {
    ajax.post('al_groups.php', {
      act: 'member_action',
      action: action,
      gid: gid,
      mid: mid,
      hash: hash,
      context: 'search'
    }, {onDone: function(text) {
      link.parentNode.replaceChild(ce('span', {innerHTML: text}).firstChild, link);
      var loc = _tbLink.loc;
      if (loc) globalHistoryDestroy(loc);
    }});
  },
  groupAddOfficer: function(link, params) {
      stManager.add('groups_edit.css');
    ajax.post('al_groups.php', {act: 'assign_box', name: 'id' + params.mid, gid: params.gid}, {onDone: function(title, html, mid, hash, btn) {
      cur.doAddOfficer = function() {
        ajax.post('al_groups.php', {
          act: 'assign',
          gid: params.gid,
          mid: mid,
          hash: hash,
          admin: isChecked('group_p_is_admin'),
          position: ge('group_p_admin_position').value,
          context: 'search'
        }, {progress: cur.addOfficerBox.progress});
      };
      cur.addOfficerBox = showFastBox(title, html, btn, cur.doAddOfficer, getLang('global_cancel'));
      cur.addOfficerBox.setOptions({width: 430});
      elfocus('group_p_admin_position');
    }});
  },
  animateAdded: function(el, speed) {
    var c = se('<div class="audio_add_wrap anim fl_r"><div class="audio_add_anim_wrap"><div class="audio_add_anim clear_fix"><div class="audio_add fl_l"></div><div class="audio_add done fl_l"></div></div></div></div>');
    el.parentNode.replaceChild(c, el);
    el = c;
    var anim = geByClass1('audio_add_anim', el), add = anim.firstChild, added = add.nextSibling;
    animate(anim, {left: '-15px'}, {duration: speed, onComplete: function() {
      setStyle(anim.parentNode, {width: '15px'});
      setStyle(anim.parentNode.parentNode, {paddingLeft: '2px'});
      setStyle(anim, {left: '-13px'});
    }});
    animate(add, {opacity: 0}, {duration: speed});
    animate(added, {opacity: 1}, {duration: speed});
    return el;
  },
  cancelAnimateAdded: function(el, oldEl, speed) {
    var anim = geByClass1('audio_add_anim', el), add = anim.firstChild, added = add.nextSibling;
    animate(anim, {left: '0px'}, {duration: speed, onComplete: function() {
      setStyle(anim.parentNode, {width: '13px'});
      setStyle(anim.parentNode.parentNode, {paddingLeft: '4px'});
      el.parentNode.replaceChild(oldEl, el);
      removeClass(oldEl, 'over');
      var i = 8, audioRow = oldEl;
      while (audioRow && audioRow != bodyNode && !hasClass(audioRow, 'audio') && i--) {
        audioRow = audioRow.parentNode;
      }
      if (hasClass(audioRow, 'audio')) {
        removeClass(audioRow, 'over');
      }
    }});
    animate(add, {opacity: 0.4}, {duration: speed});
    animate(added, {opacity: 0}, {duration: speed});
  },
  addAudio: function (link, params) {
    if (link.tt) link.tt.hide();
    var oldLink = link;
    link = searchActions.animateAdded(link, 200);
    ajax.post('al_audio.php', params, {
      onDone: function() {
        if (!cur.addedIds) cur.addedIds = {};
        cur.addedIds[params.oid+'_'+params.aid] = 1;
        if (window.audioPlayer) {
          var cur_aids = currentAudioId().split('_');
          if (cur_aids[0] == params.oid && cur_aids[1] == params.aid) {
            audioPlayer.showCurrentAdded();
          }
        }
      },
      onFail: function() {
        searchActions.cancelAnimateAdded(link, oldLink, 200);
      }
    });
  },
  addVideo: function (params, ev) {
    var videoCont = ge('search_video_cont'+params.video);
    if (hasClass(videoCont, 'search_video_row_added')) {
      return cancelEvent(ev);
    }
    ajax.post('al_video.php', params, {onDone: function(text) {
      if (videoCont) {
        addClass(videoCont, 'search_video_row_added');
      }
      showDoneBox(text);
    }});
    var videoEl = geByClass1('search_video_row_icon_add', videoCont);
    if (videoEl && videoEl.tt) {
      videoEl.tt.hide();
    }
    return cancelEvent(ev);
  },
  addApp: function (link, params) {
    ajax.post('al_apps.php?act=join', params, {onDone: function(loc, label) {
      location.href = loc;
      return;
      var label = ce('span', {innerHTML: label, className: 'added'});
      link.parentNode.replaceChild(label, link);
    }});
  },
  showLyrics: function(audio_id, lyrics_id, top) {
    var lEl = ge('lyrics'+audio_id);
    if (!lEl) {
      lEl = ce('div', {id: 'lyrics' + audio_id, className: 'lyrics_wrap', innerHTML: '<div class="loading"></div>'});
      ge('audio' + audio_id).appendChild(lEl);
      ajax.post('/al_audio.php', {act: 'get_lyrics', lid: lyrics_id, aid: audio_id, top: top}, {onDone: function(lyrics_text) {
        lEl.innerHTML = '<div class="lyrics ta_l">' + lyrics_text + '</div>';
      }});
    } else if (isVisible(lEl)) {
      hide(lEl);
    } else {
      show(lEl);
    }
  },
  toggleBanInGroup: function(el, mid, gid, hash) {
    showBox('al_groups.php', {act: 'bl_edit', name: 'id' + mid, gid: gid}, {stat: ['page.css', 'ui_controls.js', 'ui_controls.css'], dark: 1});
  },
  addCommunity: function() {
    showBox('al_search.php', {act: 'suggest_community'}, {
      params: {
        bodyStyle: 'padding: 20px;',
        dark: 1
      },
      onFail: function(msg) {
        if (msg) {
          showDoneBox('<b>' + msg + '</b>');
        }
        return true;
      }
    });
  },
  uShowMessage: function(txt) {
    showDoneBox(txt);
  },
  uEditAdmin: function(u) {
    showBox('groupsedit.php', {
      act: 'edit_admin', id: nav.objLoc.gid, addr: u, from: 'search'
    }, {stat: 'groups_edit.css'});
  },
  uRemoveAdmin: function(u) {
    return showBox('groupsedit.php', {
      act: 'edit_admin', id: nav.objLoc.gid, addr: u, from: 'search', remove: 1
    }, {stat: 'groups_edit.css'});
  },
  uDoneAdmin: function(mid, hash) {
    var level = intval(radioBtns['admlevel'].val);
    if (cur.notSureAdmin && level >= 3) {
      return showFastBox(getLang('groups_admin_warning_title'), cur.notSureAdmin, getLang('groups_admin_do_add'), function() {
        curBox().hide();
        cur.notSureAdmin = false;
        searchActions.uDoneAdmin(mid, hash);
      }, getLang('global_back'));
    }
    ajax.post('groupsedit.php', {
      act: 'done_admin',
      id: nav.objLoc.gid,
      addr: mid,
      level: level,
      contact: isChecked('gedit_admbox_check'),
      position: val('gedit_admbox_position'),
      email: val('gedit_admbox_email'),
      phone: val('gedit_admbox_phone'),
      hash: hash,
      from: 'search'
    }, {onDone: function(msg, acts, lev) {
      globalHistoryDestroy(_tbLink.loc);
      var tabs = ['members', 'unsure', 'admins'], i;

      var rem = curBox().uRemove;
      if (!rem) {
        curBox().hide();
        if (msg) searchActions.uShowMessage(msg);
      }
      if (!acts) return;

      val(ge('sgedit_acts' + mid), acts);
      val(ge('sgedit_lev' + mid), lev);
      toggle('sgedit_lev' + mid, !!lev);

      if (rem) searchActions.uAction(false, rem[0], rem[1], rem[2]);
    }, showProgress: curBox().showProgress, hideProgress: curBox().hideProgress});
  },
  uAction: function(el, mid, hash, act) {
    if (!curBox() && ((domFC(el) || {}).className == 'progress_inline')) return;
    var tab = cur.tab;
    ajax.post('groupsedit.php', {
      act: 'user_action', id: nav.objLoc.gid, addr: mid, hash: hash, action: act, from: 'search'
    }, {
      onDone: function(acts, lev) {
        globalHistoryDestroy(_tbLink.loc);
        if (curBox()) curBox().hide();
        if (lev || lev === '') {
          val(ge('sgedit_acts' + mid), acts);
          val(ge('sgedit_lev' + mid), lev);
          toggle('sgedit_lev' + mid, !!lev);
        } else if (acts) {
          searchActions.uShowMessage(acts);
        } else {
          searchActions.uRemoveAdmin(mid).uRemove = [mid, hash, act];
        }
      },
      showProgress: function() {
        if (curBox()) {
          curBox().showProgress();
        } else {
          if (!el._s) el._s = val(el);
          val(el, '<span class="progress_inline"></span>');
        }
      },
      hideProgress: function() {
        if (curBox()) {
          curBox().hideProgress();
        } else {
          if (el._s) {
            val(el, el._s);
            el._s = false;
          }
        }
      }
    });
  },
  rowOver: function(obj) {
    var animEl = geByClass1('search_video_row_add', obj);
    searchActions.activate(animEl);
    if (hasClass(obj, 'search_video_row_overed')) {
      return;
    }
    addClass(obj, 'search_video_row_overed')
    var line = geByClass1('search_video_row_info_line', obj);
    var name = geByClass1('search_video_raw_info_name', obj);
    var size = getSize(name);
    var height = Math.max(16, Math.min(size[1], 54));
    cssAnim(line, {height: height, marginTop: 150 - (height - 16)}, {duration: 200, transition: Fx.Transitions.easeOutCubic});
  },
  rowOut: function(obj) {
    var animEl = geByClass1('search_video_row_add', obj);
    searchActions.deactivate(animEl, 0);
    var line = geByClass1('search_video_row_info_line', obj);
    removeClass(obj, 'search_video_row_overed')
    cssAnim(line, {height: 16, marginTop: 150}, {duration: 200, transition: Fx.Transitions.easeOutCubic});
  },
  activate: function(obj, ttText, check) {
    animate(obj, {opacity: 1}, 100);
    if (ttText) {
      if (check == 1 && hasClass(obj.parentNode.parentNode.parentNode.parentNode, 'search_video_row_added')) {
        return false;
      }
      showTooltip(obj, {
        black: 1,
        center: 1,
        shift: [0,1,0],
        text: ttText
      });
    }
  },
  deactivate: function(obj, value) {
    animate(obj, {opacity: value === undefined ? 0.8 : value}, 100);
  },
  selectCategory: function(el, id, isSubcategory) {
    ge('c[category]').value = id;
    each(geByClass('search_catalog_row', ge('search_catalog_filters')), function() {
      removeClass(this, 'selected');
    });
    each(geByClass('search_catalog_subrow', ge('search_catalog_filters')), function() {
      removeClass(this, 'selected');
    });
    if (!isSubcategory) {
      each(geByClass('search_subcategory_wrap', 'search_catalog_filters'), hide);
      show('search_subcategory_wrap_'+id);
    }
    addClass(el, 'selected');
    var el = ge('search_query');
    if (val(el)) {
      val(el, '');
      el.focus();
      triggerEvent(el, 'keyup');
    }

    searcher.updResults();
    return false;
  }
};

function legacyPlaceholderSetup(id) {
  var el = ge(id);
  if (!el) return;
  if (browser.opera && browser.mobile) {
    el.getValue = function(){return el.value;}
    el.setValue = function(v){el.value = v;}
    return;
  }
  var ph = el.getAttribute("placeholder");
  if (!el['phevents'] && ph && ph != "") {
    el['active'] = 1;
    if ((!el.value || el.value == ph) && !el.focused) {
      el.style.color = '#777';
      el.value = ph;
      el['active'] = 0;
    }
    addEvent(el, 'focus', function(){
      if (el['active']) return;
      el['active'] = 1;
      el.value = '';
      el.style.color = '#000';
    });
    addEvent(el, 'blur', function(){
      if( !el['active'] || !ph || el.value != "" ) return;
      el['active'] = 0;
      el.style.color = '#777';
      el.value = ph;
    });
    el.getValue = function() {
      return (el['active'] || el.value != ph) ? el.value : '';
    }
    el.setValue = function(val) {
      el.active = val ? 1 : 0;
      el.value = val ? val : ph;
      el.style.color = val ? '#000' : '#777';
    }
    el['phevents'] = 1;
  }
}

try{stManager.done('search.js');}catch(e){}
