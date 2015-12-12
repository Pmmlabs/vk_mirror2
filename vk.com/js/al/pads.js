var Pads = {
  coords: {
    fr: {w: 378},
    ph: {w: 378},
    vid: {w: 378},
    msg: {w: 470},
    gr: {w: 470},
    nws: {w: 470},
    ap: {w: 378},
    mus: {w: 629},
    game: {w: 456, bottom: 1}
  },
  getCache: function(id, set) {
    var c = _pads.cache[id], t = vkNow();
    if ((c || {}).tim && (t - c.tim) < 86400000 || (t - intval(c)) < 20000) return c;
    if (set) _pads.cache[id] = t;
    return false;
  },
  preload: function(id) {
    if (_pads.shown == id || Pads.getCache(id, true) || vk.isBanned) return;
    if (id == 'msg') stManager.add(['pads_im.css', 'pads_im.js', 'page.css', 'page.js']);
    var query = {act: 'pad', pad_id: id};
    if (id == 'mus') {
      if (!padAudioPlaylist()) query.playlist = 1;
      if (!Pads.audioInited) query.init = 1;
    }
    ajax.post('pads.php', query, {onDone: function(html, script, data, cnt) {
      if (cnt !== void(0) && cnt !== null && cnt > -1) handlePageCount(id, cnt);
      if (data.onLoadScript) {
        eval(data.onLoadScript);
        delete data.onLoadScript;
      }
      _pads.cache[id] = {html: html, script: script, data: data, tim: vkNow()};
      if (_pads.shown == id && hasClass(_pads.cont, 'pad_loading')) Pads.show(id, true);
    }});
  },
  go: function(el, ev) {
    if (checkEvent(ev) === false) Pads.hide();
    return nav.go(el, ev);
  },
  decr: function(id, toZero) {
    if (vk.counts[id] <= 0) return;
    var mp = {fr: 'friends', ph: 'albums' + vk.id, vid: 'video', gr: 'groups'};
    handlePageCount(id, toZero ? 0 : (vk.counts[id] - 1), mp[id], 1);
  },
  reposition: function() {
    if (!_pads.shown) return;
    setStyle(_pads.wrap, {left: getXY(ge('l_' + _pads.shown), true)[0] + (vk.rtl ? (-Pads.coords[_pads.shown].w - 7) : 143)});
  },
  getEl: function(id) {
    var el;
    switch (id) {
      case 'mus':
        el = ge('head_play_btn');
        break;
      case 'game':
        el = ge('head_games');
        break;
      default:
        el = ge('l_' + id);
    }
    return el;
  },
  setPos: function(id) {
    var d = Pads.coords[id], c = _pads.cache[id], el = Pads.getEl(id), xy = getXY(el, true),
        barHeight = getXY('page_layout')[1], topOffset = 33 + barHeight, topPad = getSize(ge('page_header'))[1] + 6;
    if (id == 'mus') {
      var w3 = ge('wrap3'), posStyle = getStyle(ge('page_header'), 'position'), y = scrollGetY(),
          playBtn = ge('head_play_btn'), gp = ge('gp'), reverse = isVisible(gp) && hasClass(gp, 'reverse'),
          fixed = (posStyle == 'fixed' || posStyle != 'fixed' && y >= topOffset && isVisible(gp) || reverse || !ge('head_play_btn')), l, r, t, b;
      if (cur.module == 'im' || cur.module == 'audio') {
        fixed = 1;
      }
      if (vk.rtl) {
        l = reverse ? getXY(w3)[0] + getSize(w3)[0] - d.w - 1 : getXY(w3)[0] + 1;
      } else {
        l = reverse ? getXY(w3)[0] + 1 : getXY(w3)[0] + getSize(w3)[0] - d.w - 1;
      }
      t = reverse ? 'auto' : ((y >= topOffset && isVisible(gp) || !playBtn) ? 12 : topPad) + barHeight;
      b = reverse ? 15 : 'auto';
      setStyle(_pads.wrap, {left: l, top: t, bottom: b});
      toggleClass(_pads.wrap, 'fixed', fixed);
      toggleClass(_pads.wrap, 'pad_no_fixed', !fixed);
      if (!fixed && !reverse && browser.mac) { // :(
        setTimeout(function() {
          var nt = intval(_pads.wrap.style.top);
          _pads.wrap.style.top = (nt - scrollGetY()) + 'px';
          _pads.wrap.style.position = 'fixed';
          setTimeout(function() { _pads.wrap.style.position = ''; _pads.wrap.style.top = nt + 'px'; }, 0);
        }, 0);
      }

      toggleClass(_pads.arrow, 'head', (y < topOffset || !isVisible(gp)) && playBtn && !_pads.gpClicked);
      toggleClass(gp, 'head', (y < topOffset || !isVisible(gp)) && playBtn && !_pads.gpClicked);
      toggleClass(_pads.arrow, 'right', (y >= topOffset && isVisible(gp) || !playBtn) && !hasClass(gp, 'reverse'));
      toggleClass(_pads.arrow, 'left', (y >= topOffset && isVisible(gp) || !playBtn) && hasClass(gp, 'reverse'));
      var toup = (y < topOffset || !isVisible(gp)) && playBtn && !_pads.gpClicked;
      if (vk.rtl) {
        l = reverse ? 'auto' : (toup ? getXY(playBtn)[0] - getXY(w3)[0] + 1 : -10);
        r = reverse ? -10 : 'auto';
      } else {
        l = reverse ? -10 : 'auto';
        r = reverse ? 'auto' : (toup ? getSize(w3)[0] + getXY(w3)[0] - getXY(playBtn)[0] - 20 : -10);
      }
      t = reverse ? 'auto' : (toup ? -10 : 17);
      b = reverse ? 15 : 'auto';
      setStyle(_pads.arrow, {top: t, bottom: b, left: l, right: r});
    } else {
      var c = {}, wasvis = isVisible(_stlSide), obj = Pads.coords[id];
      if (!wasvis) show(_stlSide);
      c.fixpos = intval((_fMenuLnks[id] || {}).offsetTop + (_fMenu || {}).offsetTop);
      if (!wasvis) hide(_stlSide);
      c.menuh = el.offsetHeight;
      c.middle = Math.floor((_pads.restrict[1] + _pads.restrict[0] - c.menuh) / 2);
      c.fixtop = Math.max(c.fixpos - c.middle, 4);
      c.fixbot = 7;
      c.justarrtop = xy[1];
      c.basearrtop = xy[1] - c.fixtop;
      c.basetop = xy[1] - c.middle;

      extend(_pads.cur, c);

      removeClass(_pads.arrow, 'left');
      removeClass(_pads.arrow, 'right');

      if (obj.bottom) {
        var w3 = ge('wrap3');
        addClass(_pads.arrow, 'head');
        addClass(gp, 'head');
        var w = el.offsetWidth;
        var cntr = obj.w / 2;
        var rightPos = getXY(w3)[0] + getSize(w3)[0] - 1;
        var diff = (xy[0] + w / 2 + cntr) - rightPos;
        if (diff > 0) {
          //cntr += diff;
        }
        cntr -= topPad + barHeight;
        var l = (xy[0] + w / 2 - cntr);
        _pads.wrap.style.left = l + 'px';
        _pads.wrap.style.top = (topPad + barHeight) + 'px';
        setStyle(_pads.arrow, {top: '-10px', left: (cntr - 8)+'px'});
        if (cur.module == 'im' || cur.module == 'audio') {
          fixed = 1;
        }
        toggleClass(_pads.wrap, 'fixed', fixed);
        toggleClass(_pads.wrap, 'pad_no_fixed', !fixed);
      } else {
        removeClass(_pads.arrow, 'head');
        removeClass(gp, 'head');
        _pads.wrap.style.left = (xy[0] + (vk.rtl ? (-d.w - 7) : 143)) + 'px';
        _pads.wrap.style.bottom = 'auto';
      }
    }
    Pads.onScroll(true, id);
  },
  onScroll: function(cacheFix, id) {
    var y = scrollGetY(), barHeight = getXY('page_layout')[1], topOffset = 33 + barHeight, topPad = getSize(ge('page_header'))[1] + 6;
    if ((id || _pads.shown) == 'mus') {
      var playBtn = ge('head_play_btn'), gp = ge('gp'),
          fixed = getStyle(ge('page_header'), 'position') == 'fixed' || !playBtn,
          reverse = isVisible(gp) && hasClass(gp, 'reverse');
      if (reverse) {
        var fixed = getStyle(_pads.wrap, 'position') == 'fixed';
        toggleClass(_pads.arrow, 'left', fixed);
        removeClass(_pads.arrow, 'right');
        toggleClass(_pads.arrow, 'head', !fixed && !_pads.gpClicked);
        toggleClass(gp, 'head', !fixed && !_pads.gpClicked);
        setStyle(_pads.wrap, {bottom: fixed ? '15px' : 'auto', top: fixed ? 'auto' : topPad + barHeight});
        toggleClass(_pads.wrap, 'fixed', fixed);
        toggleClass(_pads.wrap, 'pad_no_fixed', !fixed);
      } else if (y >= topOffset && isVisible(gp) && !fixed || !playBtn) {
        addClass(_pads.arrow, 'right');
        removeClass(_pads.arrow, 'left');
        removeClass(_pads.arrow, 'head');
        removeClass(gp, 'head');
        setStyle(_pads.wrap, {top: '12px', bottom: 'auto'});
        addClass(_pads.wrap, 'fixed');
        removeClass(_pads.wrap, 'pad_no_fixed');
        if (vk.rtl) {
          setStyle(_pads.arrow, {top: '17px', left: '-10px'});
        } else {
          setStyle(_pads.arrow, {top: '17px', right: '-10px'});
        }
      } else {
        removeClass(_pads.arrow, 'left');
        toggleClass(_pads.arrow, 'right', _pads.gpClicked);
        toggleClass(_pads.arrow, 'head', !_pads.gpClicked);
        toggleClass(gp, 'head', !_pads.gpClicked);
        toggleClass(_pads.wrap, 'fixed', fixed);
        toggleClass(_pads.wrap, 'pad_no_fixed', !fixed);
        setStyle(_pads.wrap, {top: topPad + barHeight, bottom: 'auto'});
        if (_pads.gpClicked) {
          if (vk.rtl) {
            setStyle(_pads.arrow, {top: '17px', left: '-10px'});
          } else {
            setStyle(_pads.arrow, {top: '17px', right: '-10px'});
          }
        } else {
          var w3 = ge('wrap3');
          if (vk.rtl) {
            var l = getXY(playBtn)[0] - getXY(w3)[0] + 1;
            setStyle(_pads.arrow, {top: '-10px', left: l + 'px', right: 'auto'});
          } else {
            var r = getSize(w3)[0] + getXY(w3)[0] - getXY(playBtn)[0] - 20;
            setStyle(_pads.arrow, {top: '-10px', right: r + 'px'});
          }
        }
      }
    } else if (Pads.coords[id || _pads.shown].bottom) {
      return false;
    } else {
      if (_fixedNav) y = 0;
      var top = _pads.cur.fixtop, arrtop = _pads.cur.basearrtop - y, cf = (cacheFix === true);
      if (arrtop > _pads.cur.middle) {
        top += arrtop - _pads.cur.middle;
        arrtop = _pads.cur.middle;
      }
      if (arrtop > _pads.restrict[1] - _pads.cur.menuh) {
        top = _pads.cur.basetop - y;
      }
      if (top + _pads.height > lastWindowHeight - _pads.cur_fixbot) {
        top = lastWindowHeight - _pads.cur_fixbot - _pads.height;
        if (top < 4) top = 4;
      }
      if (top + y < 7) top = 7 - y;

      arrtop = _pads.cur.justarrtop - y - top;
      if (arrtop < _pads.restrict[0]) {
        if (_pads.cur.fixpos && _fMenuShown && !_fMenuHidden) {
          arrtop = _stlSideTop + _pads.cur.fixpos - top;
        }
      }

      if (top > _pads.cur.fixtop && top > 7 && cur.module != 'im' && cur.module != 'audio') {
        top += y;
        if (cf || _pads.cur.fixed !== false) {
          removeClass(_pads.wrap, 'fixed');
          addClass(_pads.wrap, 'pad_no_fixed');
          _pads.cur.fixed = false;
        }
      } else {
        if (cf || _pads.cur.fixed !== true) {
          removeClass(_pads.wrap, 'pad_no_fixed');
          addClass(_pads.wrap, 'fixed');
          _pads.cur.fixed = true;
        }
      }
      _pads.wrap.style.top = top + 'px';
      if (arrtop < _pads.restrict[0] - _pads.cur.menuh && arrtop > 0) {
        if (cf || _pads.cur.arrshown !== 'blue') {
          show(_pads.arrow);
          addClass(_pads.arrow, 'blue');
          _pads.cur.arrshown = 'blue';
        }
      } else if (arrtop > _pads.restrict[1] - _pads.cur.menuh || arrtop < _pads.restrict[0]) {
        if (cf || _pads.cur.arrshown !== false) {
          hide(_pads.arrow);
          _pads.cur.arrshown = false;
        }
      } else {
        if (cf || _pads.cur.arrshown !== true) {
          show(_pads.arrow);
          removeClass(_pads.arrow, 'blue');
          _pads.cur.arrshown = true;
        }
      }
      if (_pads.cur.arrshown) {
        _pads.arrow.style.top = Math.ceil(arrtop + (_pads.cur.menuh - 17) / 2) + 'px';
      }
    }
  },
  show: function(id, ev) {
    if (checkEvent(ev) === true || browser.msie6 || vk.isBanned) return;
    if (_pads.shown == id && ev !== true) {
      Pads.hide();
      return cancelEvent(ev);
    }
    if (_pads.shown && _pads.topLoad) {
      removeClass(ge('head_'+(_pads.shown == 'mus' ? 'music' : 'games')), 'over');
    }
    _pads.topLoad = false;

    if (id == 'msg') stManager.add(['pads_im.css', 'pads_im.js', 'page.css', 'page.js']);
    if (id == 'mus' && !padAudioPlaylist()) {
      Pads.invalidate(id);
    }
    if (id != 'mus' && _pads.gpClicked) {
      _pads.gpClicked = false;
    }
    _pads.gpClicked = !!_pads.gpClicked;
    var d = Pads.coords[id], el = Pads.getEl(id), c = _pads.cache[id], bd = (browser.msie && browser.version < 9), playBtn = ge('head_play_btn');
    if (!c) {
      Pads.preload(id);
    } else if (!c.tim) {
      c = 0;
    }

    if (!_pads.wrap) {
      _pads.cont = domLC((_pads.wrap = bodyNode.appendChild(ce('div', {
        id: 'pad_wrap',
        className: 'fixed',
        innerHTML: '<div id="pad_arrow"></div><div id="pad_cont"></div>'
      }, {opacity: bd ? '' : 0}))));
      _pads.arrow = ge('pad_arrow');
    }

    if (ge('gp')) {
      var topOffset = 33 + getXY('page_layout')[1];
      toggleClass(ge('gp'), 'head', id == 'mus' && scrollGetY() < topOffset && !hasClass(ge('gp'), 'reverse') && !_pads.gpClicked);
      toggleClass(ge('gp').firstChild, 'active', id == 'mus');
    }
    if (id == 'mus') {
      if (!c) addClass(_pads.arrow, 'no_data');
    }
    if (id == 'game' || id == 'mus' && !_pads.gpClicked) {
      if (id == 'mus') {
        var wDiff = 0;
        var loadEl = ge('head_music_text');
      } else {
        var wDiff = -20;
        var loadEl = el;
      }
      if (loadEl) {
        if (c) {
          if (loadEl.padLoad) {
            loadEl.innerHTML = loadEl.padLoad;
            delete loadEl.padLoad;
          }
          animate(_pads.wrap, {opacity: 1}, 200);
        } else {
          var s = getSize(loadEl);
          setStyle(loadEl, {width: s[0] + wDiff, display: 'inline-block'})
          loadEl.padLoad = loadEl.innerHTML;
          loadEl.innerHTML = '<img style="position: absolute; margin-top: 3px; margin-left: '+((s[0] + wDiff) / 2 - 16)+'px;" src="/images/upload_inv'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.gif" width="32" height="8"/>&nbsp;';
        }
      }
      addClass(ge('head_'+(id == 'mus' ? 'music' : 'games')), 'over');
      _pads.topLoad = true;
    }

    setStyle(_pads.cont, {width: c ? d.w : d.w - 2});

    (c ? removeClass : addClass)(_pads.cont, 'pad_loading');
    val(_pads.cont, (c || {}).html || '');

    if (!_pads.shown) {
      if (bd) {
        show(_pads.wrap);
      } else {
        if (!isVisible(_pads.wrap)) {
          setStyle(_pads.wrap, {opacity: 0});
          show(_pads.wrap);
        }
        if (!_pads.topLoad) {
          animate(_pads.wrap, {opacity: 1}, 200);
        }
      }
    } else if (_pads.shown != id) {
      var lnk = ge('l_' + _pads.shown), flnk = _fMenuLnks[_pads.shown];
      removeClass(domFC(lnk), 'left_nav_over');
      removeClass(flnk, 'fmenu_item_over');
      if (vk.counts[_pads.shown] < 0) {
        hide(lnk, flnk);
      } else if (vk.counts[_pads.shown] == 0 && !geByClass1('left_count_persist', lnk)) {
        hide(flnk);
      }
    }
    if (cur.hideGifts) {
      cur.hideGifts();
    }
    addClass(domFC(el), 'left_nav_over');
    addClass(_fMenuLnks[id], 'fmenu_item_over');

    Pads.deinit();
    _pads.wrap.style.position = _pads.arrow.style.left = _pads.arrow.style.right = _pads.arrow.style.bottom = '';
    removeClass(_pads.arrow, 'blue');
    _pads.cur = {};
    _pads.content = ge('pad_content');
    if (c && c.script) eval('(function(id){' + c.script + '})(\'' + id + '\')');
    if (id == 'msg' && window.PadsIm && ge('pad_im_hrows')) {
      PadsIm.init();
    } else if (_pads.content) {
      var scrollElements = [];
      if (id == 'mus') {
        scrollElements.push(ge('pad_side_filters_wrap'));
      }
      _pads.scroll = new Scrollbar(_pads.content, {
        prefix: 'pad_',
        shadows: (id == 'game'),
        nomargin: true,
        global: true,
        nokeys: true,
        right: vk.rtl ? 'auto' : (id == 'mus' ? 0 : 1),
        left: !vk.rtl ? 'auto' : (id == 'mus' ? 0 : 1),
        forceCancelEvent: (id == 'mus'),
        scrollElements: scrollElements,
        wheelObj: _pads.content
      });
      _pads.content.onscroll = Pads.scroll;
      _pads.scroll.scrollTop(0);
    } else {
      _pads.scroll = 0;
    }

    var row = domFC(ge('pad_rows')), needClean = (id == 'nws' && vk.counts[id] > 0);

    Pads.init(id);
    Pads.setPos(id);

    _pads.shown = id;

    if (row) {
      if (vkNow() - c.tim > 3000) {
        ajax.post('pads.php', {act: 'pad', offset: 0, pad_id: id, till: row.id.replace('pad_' + id, '')}, {
          onDone: function(rows, all, cnt) {
            if (cnt !== void(0) && cnt !== null && cnt > -1) handlePageCount(id, cnt);
            if (_pads.shown != id) return;
            if (!rows) Pads.invalidate();
            Pads.feed(rows, all, true);
            if (needClean) {
              ajax.post('pads.php', {act: 'clean', pad_id: id, hash: _pads.hash});
            }
          }
        });
      } else if (needClean) {
        ajax.post('pads.php', {act: 'clean', pad_id: id, hash: _pads.hash});
      }
//      var mp = {fr: 'friends', ph: 'albums' + vk.id, vid: 'video', gr: 'groups', nws: 'feed'};
//      handlePageCount(id, 0, mp[id], 1);
    } else {
      Pads.invalidate();
    }

    return ev ? cancelEvent(ev) : false;
  },
  deinit: function() {
    if (!_pads.cur) return;

    if (_pads.shown == 'msg' && window.PadsIm && ge('pad_im_hrows')) PadsIm.destroy();
    if (((_pads.cur.tipEl || {}).tt || {}).destroy) _pads.cur.tipEl.tt.destroy();
    _pads.cur = 0;
  },
  hide: function() {
    if (!_pads.shown || _pads.cont && hasClass(_pads.cont, 'pad_loading')) return true;

    if (_pads.shown == 'mus') {
      if (ge('gp')) {
        removeClass(ge('gp').firstChild, 'active');
        _pads.gpClicked = false;
      }
      if (window.audioPlayer && audioPlayer.controls && audioPlayer.controls.pd && audioPlayer.controls.pd.status && audioPlayer.controls.pd.status.tt) {
        hide(audioPlayer.controls.pd.status.tt.container);
      }
      if (window.Audio) {
        Audio.stopPadEvents();
      }
    }
    if (_pads.topLoad) {
      removeClass(ge('head_'+(_pads.shown == 'mus' ? 'music' : 'games')), 'over');
    }

    if (_pads.layerBG) {
      re(_pads.layerBG);
      _pads.layerBG = 0;
    }

    var lnk = ge('l_' + _pads.shown), flnk = _fMenuLnks[_pads.shown];
    removeClass(domFC(lnk), 'left_nav_over');
    removeClass(flnk, 'fmenu_item_over');
    if (vk.counts[_pads.shown] < 0) {
      hide(lnk, flnk);
    } else if (vk.counts[_pads.shown] == 0 && !geByClass1('left_count_persist', lnk)) {
      hide(flnk);
    }

    _pads.shown = 0;
    updGlobalPlayer();
    if (browser.msie && browser.version < 9) {
      Pads.hidden();
    } else {
      animate(_pads.wrap, {opacity: 0}, 200, Pads.hidden);
    }

    return true;
  },
  boxHide: function() {
    curBox().hide();
    Pads.hide();
  },
  hidden: function() {
    Pads.deinit();
    re(_pads.wrap);
    if (_pads.scroll) _pads.scroll.destroy();
    _pads.scroll = _pads.cont = _pads.content = _pads.wrap = 0;
  },

  lock: function(el) {
    if (el.tagName == 'A') {
      el.saved = val(el);
      val(el, '<span class="progress_inline"></span>');
    } else if (el.className == 'button') {
      addClass(domPN(el), 'pad_btn_prg');
    } else {
      lockButton(el);
    }
  },
  unlock: function(el) {
    if (el.saved) {
      val(el, el.saved);
      el.saved = false;
    } else if (el.className == 'button') {
      removeClass(domPN(el), 'pad_btn_prg');
    } else {
      unlockButton(el);
    }
  },
  invalidate: function(id) {
    delete(_pads.cache[id || _pads.shown]);
  },
  preloadMore: function() {
    if (_pads.cur.more !== undefined || !isVisible('pad_more')) return;
    _pads.cur.more = 'load';
    var id = _pads.shown;
    ajax.post('pads.php', {act: 'pad', offset: _pads.cur.offset, pad_id: _pads.shown, pad_section: _pads.cur.sect || 0}, {
      onDone: function(rows, all, cnt) {
        if (cnt !== void(0) && cnt !== null && cnt > -1) handlePageCount(id, cnt);
        var sh = (_pads.cur.more == 'show');
        _pads.cur.more = rows;
        _pads.cur.all = all;
        if (sh) Pads.more();
      }
    });
  },
  feed: function(rows, all, up) {
    var c = ce('div', {innerHTML: rows}), ids = [], r = ge('pad_rows'), f = r.firstChild;
    if (!rows || all) hide('pad_more');
    if (up && !ge(domLC(c).id)) {
      val(r, rows);
      Pads.init(_pads.shown);
      return;
    }
    for (var el = domFC(c); el; el = domFC(c)) {
      ++_pads.cur.offset;
      if (ge(el.id)) {
        if (up) {
          --_pads.cur.offset;
          break;
        }
        re(el);
        continue;
      }
      if (up) {
        r.insertBefore(el, f);
        Pads.invalidate();
      } else {
        r.appendChild(el);
      }
      if (hasClass(el, 'pad_msg_new')) {
        ids.push(el.id.replace('pad_msg', ''));
      } else if (hasClass(el, 'pad_ap_new')) {
        ids.push(el.id.replace(/pad_apn_\d+_/, ''));
      }
    }
    Pads.updateHeight();
    if (_pads.shown == 'msg') {
      Pads.msgMark(ids);
    } else if (_pads.shown == 'ap') {
      Pads.apMark(ids);
    }
  },
  more: function(ev) {
    if (checkEvent(ev) === true) return;
    if (_pads.cur.more !== undefined) {
      if (_pads.cur.more == 'load') {
        _pads.cur.more = 'show';
      } else if (_pads.cur.more != 'show') {
        Pads.feed(_pads.cur.more, _pads.cur.all);
        delete(_pads.cur.more);
        Pads.preloadMore();
      }
    } else {
      _pads.cur.more = 'show';
      Pads.preloadMore();
    }
    return ev ? cancelEvent(ev) : false;
  },
  handleFilterPos: function() {
    var filters = ge('pad_side_filters'), filtersWrap = ge('pad_side_filters_wrap'),
        lastPos = _pads.cur.filterLastPos || 0, lastSt = _pads.cur.lastSt || 0, pos,
        st = _pads.content.scrollTop, fSz = getSize(filters)[1], fwSz = getSize(filtersWrap)[1];
    pos = Math.min(0, Math.max(lastPos + lastSt - st, fwSz - fSz - 10));
    setStyle(filters, {top: pos});
    _pads.cur.filterLastPos = pos;
    _pads.cur.lastSt = st;
  },
  scroll: function() {
    if (_pads.shown == 'mus') {
      var more = ge('pad_more_audio'), searchMore = ge('pad_more_search_link');
      Pads.handleFilterPos();
      if (!window.Audio || !Audio.showRows) return;

      if (more && isVisible(more) && _pads.content.scrollTop + _pads.content.offsetHeight + 400 > more.offsetTop) {
        Audio.showRows({from_pad: true});
      }

      if (searchMore && isVisible(searchMore) && _pads.content.scrollTop + _pads.content.offsetHeight + 400 > searchMore.offsetTop) {
        Audio.loadRows(true);
      }
      return;
    }
    var more = ge('pad_more');
    if (!more || !isVisible(more)) return;
    if (_pads.content.scrollTop > 0) {
      Pads.preloadMore();
    }
    if (_pads.content.scrollTop + _pads.content.offsetHeight > more.offsetTop) {
      Pads.more();
    }
  },

  init: function(id) {
    var el = ge('pad_rows');
    if (el && domFC(el)) {
      extend(_pads.cur, {
        processed: {},
        savedcnts: {},
        offset: el.childNodes.length
      });
      extend(_pads, {
        editing: {}
      });
    }
    Pads.updateHeight(id);
  },
  update: function() {
    if (_pads.scroll) _pads.scroll.update(false, true);
  },

  showTip: function(id, over) {
    var place = geByClass1('pad_' + _pads.shown + '_btns'), el = _pads.cur.tipEl;

    if (!place || !el) return;

    if (!over) {
      if (((el || {}).tt || {}).hide) el.tt.hide();
      return;
    }

    if (domPN(el) != place) {
      place.insertBefore(el, domFC(el));
    }

    if ((el.tt || {}).show) {
      el.tt.show();
      return;
    }

    showTooltip(el, {
      text: _pads.cur.tip,
      className: 'pad_submit_tt rich wall_tt',
      shift: [3, 15, 13],
      forcetodown: 1,
      slide: 15,
      showdt: 400,
      hidedt: 400,
      hasover: 1,
      onCreate: function () {
        var els = Array.prototype.slice.apply(geByClass('radiobtn', ge('pad_submit_hint_opts'))), val = _pads.cur.subm ? 1 : 0;
        addClass(els[val], 'on');
        removeClass(els[1 - val], 'on');
        radioBtns.pad_submit = {
          els: els,
          val: val
        };
      }
    });
  },
  submitChange: function(newval) {
    _pads.cur.subm = newval;
    if (_pads.cache[_pads.shown]) {
      _pads.cache[_pads.shown].subm = newval;
    }
    var url = (_pads.shown == 'msg') ? 'al_im.php' : 'al_wall.php';
    ajax.post(url, {act: 'a_save_ctrl_submit', value: newval, hash: _pads.hash});
  },
  onSubmit: function(rf, e, cb) {
    e = e || window.event;
    if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
      if (_pads.cur.subm && (e.ctrlKey || browser.mac && e.metaKey) ||
          !_pads.cur.subm && !e.shiftKey && !(e.ctrlKey || browser.mac && e.metaKey)) {
        cb();
        return cancelEvent(e);
      }
    }
    if (e.ctrlKey && e.keyCode == KEY.RETURN) {
      var v = val(rf);
      if (typeof rf.selectionStart == 'number' && typeof rf.selectionEnd == 'number') {
        var start = rf.selectionStart;
        rf.value = v.slice(0, start) + "\n" + v.slice(rf.selectionEnd);
        rf.selectionStart = rf.selectionEnd = start + 1;
      } else if (document.selection && document.selection.createRange) {
        rf.focus();
        var range = document.selection.createRange();
        range.text = "\r\n";
        range.collapse(false);
        if (browser.opera) {
          range.moveEnd('character', 0);
          range.moveStart('character', 0);
        }
        range.select();
      }
      rf.autosize.update();
      setTimeout(function () {
        rf.autosize.update();
      }, 0);
      return false;
    }
  },

  updateHeight: function(id) {
    var el = ge('pad_rows'), lh = intval(window.lastWindowHeight);
    if (!el) {
      _pads.restrict = [0, (_pads.height = _pads.wrap.offsetHeight)];
      return;
    }

    var wh, ct = _pads.content.offsetTop, oh = _pads.content.offsetHeight;
    switch (id || _pads.shown) {
    case 'fr':
    case 'gr':
      var ch = el.childNodes, l = ch.length, i = Math.min(2, l - 1);
      wh = ch[i].offsetTop + ch[i].offsetHeight - (l > 3 ? 1 : 0);
    break;

    case 'ph':
    case 'vid':
      wh = 520;
    break;

    case 'mus':
      wh = 430;
      var barHeight = getXY('page_layout')[1], topPad = getSize(ge('page_header'))[1] + 6;
      if (lh) wh = Math.max(Math.min(wh, lh - 104 - topPad + barHeight), 200);
    break;

    case 'msg':
      wh = 520;

      extend(_pads, {
        editing: _pads.editing || {}
      });
      var ids = [];
      for (var i = domFC(el); i; i = domNS(i)) {
        if (hasClass(i, 'pad_msg_new')) {
          ids.push(i.id.replace('pad_msg', ''));
        }
      }
      Pads.msgMark(ids);
    break;

    case 'nws':
      wh = 520;

      extend(_pads, {
        editing: _pads.editing || {}
      });
      handlePageCount('nws', 0, 'feed' + (ge('l_nwsf') ? '?section=notifications' : ''), ge('l_nwsf') ? '' : 'section=notifications');
    break;

    case 'ap':
      var ch = el.childNodes, l = ch.length, i = Math.min(3, l - 1);
      wh = ch[i].offsetTop + ch[i].offsetHeight - (l > 4 ? 1 : 0);

      var ids = [];
      for (var i = domFC(el); i; i = domNS(i)) {
        if (hasClass(i, 'pad_ap_new')) {
          ids.push(i.id.replace(/pad_apn_\d+_/, ''));
        }
      }
      Pads.apMark(ids);
    break;
    }
    _pads.height = _pads.wrap.offsetHeight;
    if (lh && (id || _pads.shown) != 'mus') {
      wh = Math.max(Math.min(wh, lh - (_pads.height - oh) - 11), 150);
    }
    wh = Math.min(el.offsetHeight, wh);
    setStyle(_pads.content, {height: wh});
    _pads.height += wh - oh;
    _pads.restrict = [ct, ct + wh];

    Pads.update();
  },

  frDone: function(uid, fail, text) {
    if (fail) {
      text = '<span class="pad_error">' + text + '</span>';
      if (_pads.cur.processed[uid] > 0) {
        delete(_pads.cur.processed[uid]);
      }
    } else if (_pads.cur.processed[uid] > 0 && vk.counts.fr >= _pads.cur.savedcnts[uid]) {
      Pads.decr('fr');
      for (var i in _pads.cur.savedcnts) {
        --_pads.cur.savedcnts[i];
      }
    }
    delete(_pads.cur.savedcnts[uid]);
    var el = ge('pad_fr' + uid), btns = geByClass1('pad_fr_btns', el) || geByClass1('pad_fr_result', el);
    domPN(btns).replaceChild(ce('div', {
      innerHTML: text,
      className: 'pad_fr_result'
    }), btns);
    return true;
  },
  frProcess: function(el, uid, res) {
    if (!_pads.cur.processed[uid]) {
      _pads.cur.processed[uid] = 1;
      _pads.cur.savedcnts[uid] = vk.counts.fr;
      --_pads.cur.offset;
    } else if (res != -2) {
      return;
    } else {
      _pads.cur.processed[uid] = -1;
    }
    var act = (res == -2 ? 'report_spam' : (res == -1 ? 'hide_suggestion' : (res ? 'add' : 'remove')));
    ajax.post('al_friends.php', {act: act, mid: uid, from: 'pad', hash: _pads.hash}, {
      onDone: Pads.frDone.pbind(uid, false),
      onFail: Pads.frDone.pbind(uid, true),
      showProgress: Pads.lock.pbind(el),
      hideProgress: Pads.unlock.pbind(el)
    });
    Pads.invalidate();
  },
  frPhotoOut: function(el) {
    var o = domFC(el);
    if (!o || o.tagName != 'A' || o.className != 'pad_fr_phbig') return;

    clearTimeout(o.hideTO);
    o.hideTO = setTimeout(function() {
      animate(o, {marginTop: 75}, 200);
      delete(_pads.frPhotoShown[o._uid]);
    }, 150);
  },
  frPhotoClick: function(uid, ev) {
    if (checkEvent(ev) !== false) return;

    var ch = _pads.frPhotoCache[uid];
    if (ch == 'load' || ch == 'show') {
      _pads.frPhotoCache[uid] = 'show';
      return cancelEvent(ev);
    }
    if (!ch) return;
    return showPhoto(ch._id, 'album' + uid + '_0/rev', extend({jumpTo: {z: 'albums' + uid}}, ch), ev);
  },
  frPhotoOver: function(el, uid) {
    if (!window.lang || !lang.global_photo_full_size || browser.mobile) return;

    if (!_pads.frPhotoCache) extend(_pads, {frPhotoCache: {}, frPhotoShown: {}});

    var o = domFC(el), ch = _pads.frPhotoCache[uid];
    if (o.tagName != 'A' || o.className != 'pad_fr_phbig') {
      (o = el.insertBefore(ce('a', {className: 'pad_fr_phbig', href: ch && ch._id ? ('/photo' + ch._id + '?all=1') : ('/albums' + uid), innerHTML: '<span class="pad_fr_phlabel">' + getLang('global_photo_full_size') + '</span>'}), el.firstChild)).onclick = Pads.frPhotoClick.pbind(uid);
      o._uid = uid;
    }

    clearTimeout(o.hideTO);
    animate(o, {marginTop: 50}, {duration: 200, transition: Fx.Transitions.easeOutCirc});
    _pads.frPhotoShown[uid] = o;

    if (ch === undefined) {
      _pads.frPhotoCache[uid] = 'load';
      ajax.post('al_photos.php', {act: 'fast_get_photo', oid: uid}, {onDone: function(res) {
        if (!res) {
          el.onmouseover = function() {};
          re(el.firstChild);
          return;
        }
        var sh = (_pads.frPhotoCache[uid] == 'show');
        _pads.frPhotoCache[uid] = res;
        o.href = '/photo' + res._id + '?all=1';
        if (sh) Pads.frPhotoClick(uid);
      }, onFail: function() {
        el.onmouseover = function() {};
        re(el.firstChild);
        return true;
      }});
    }

    if (!el.onmouseout) el.onmouseout = Pads.frPhotoOut.pbind(el);
  },

  // called in photoview.js
  phDone: function(ph, fail, text) {
    if (fail) {
      text = '<span class="pad_error">' + text + '</span>';
      if (_pads.cur.processed[ph] > 0) {
        delete(_pads.cur.processed[ph]);
      }
    } else if (_pads.cur.processed[ph] > 0 && vk.counts.ph >= _pads.cur.savedcnts[ph]) {
      Pads.decr('ph');
      for (var i in _pads.cur.savedcnts) {
        --_pads.cur.savedcnts[i];
      }
    }
    delete(_pads.cur.savedcnts[ph]);

    var el = ge('pad_ph' + ph), btns = geByClass1('pad_ph_btns', el) || geByClass1('pad_ph_result', el);
    if (!el) return;

    geByClass1('pad_ph_lnk', el).href = '/photo' + ph;
    domPN(btns).replaceChild(ce('div', {
      innerHTML: text,
      className: 'pad_ph_result'
    }), btns);
    return true;
  },
  phProcess: function(el, ph, res) {
    if (!_pads.cur.processed[ph]) {
      _pads.cur.processed[ph] = 1;
      _pads.cur.savedcnts[ph] = vk.counts.ph;
      --_pads.cur.offset;
    } else if (res != -2) {
      return;
    } else {
      _pads.cur.processed[ph] = -1;
    }
    var act = (res == -2 ? 'spam_photo' : (res ? 'confirm_tag' : 'delete_tag'));
    ajax.post('al_photos.php', {act: act, photo: ph, from: 'pad', hash: _pads.hash}, {
      onDone: Pads.phDone.pbind(ph, false),
      onFail: Pads.phDone.pbind(ph, true),
      showProgress: Pads.lock.pbind(el),
      hideProgress: Pads.unlock.pbind(el)
    });
    Pads.invalidate();
    for (var i in cur.pvData || {}) {
      if (i.match(/^[a-f0-9]+$/)) {
        delete(cur.pvData[i]);
      }
    }
    for (var i in ajaxCache) {
      if (i.match(/\/al_photos\.php\#act\=show\&list=[a-f0-9]+\&/)) {
        delete(ajaxCache[i]);
      }
    }
  },


  // called in videoview.js
  vidDone: function(vid, fail, text) {
    if (fail) {
      text = '<span class="pad_error">' + text + '</span>';
      if (_pads.cur.processed[vid] > 0) {
        delete(_pads.cur.processed[vid]);
      }
    } else if (_pads.cur.processed[vid] > 0 && vk.counts.vid >= _pads.cur.savedcnts[vid]) {
      Pads.decr('vid');
      for (var i in _pads.cur.savedcnts) {
        --_pads.cur.savedcnts[i];
      }
    }
    delete(_pads.cur.savedcnts[vid]);

    var el = ge('pad_vid' + vid), btns = geByClass1('pad_vid_btns', el) || geByClass1('pad_vid_result', el);
    if (!el) return;

    domPN(btns).replaceChild(ce('div', {
      innerHTML: text,
      className: 'pad_vid_result'
    }), btns);
    return true;
  },
  vidProcess: function(el, vid, res) {
    if (!_pads.cur.processed[vid]) {
      _pads.cur.processed[vid] = 1;
      _pads.cur.savedcnts[vid] = vk.counts.vid;
      --_pads.cur.offset;
    } else if (res != -2) {
      return;
    } else {
      _pads.cur.processed[vid] = -1;
    }
    var act = (res == -2 ? 'spam_video' : (res ? 'confirm_tag' : 'delete_tag'));
    ajax.post('al_video.php', {act: act, video: vid, from: 'pad', hash: _pads.hash}, {
      onDone: Pads.vidDone.pbind(vid, false),
      onFail: Pads.vidDone.pbind(vid, true),
      showProgress: Pads.lock.pbind(el),
      hideProgress: Pads.unlock.pbind(el)
    });
    Pads.invalidate();
    if (window.mvcur && !mvcur.mvShown) {
      mvcur.mvData = false;
    }
    for (var i in ajaxCache) {
      if (i.match(/\/al_video\.php\#act\=show\&autoplay=1\&list=[a-f0-9]+\&/)) {
        delete(ajaxCache[i]);
      }
    }
  },

  grShowMapBox: function(place) {
    if (window.showZeroZoneBox && showZeroZoneBox('places', function() {
      Pads.grShowMapBox(place);
    })) return;

    showTabbedBox('places.php', {act: 'a_get_place_box', id: place}, {stat: ['places.css', 'map.css', 'maps.js', 'ui_controls.css', 'ui_controls.js']});
  },
  grDone: function(gid, fail, res, block, text) {
    if (fail) {
      text = '<span class="pad_error">' + text + '</span>';
      if (_pads.cur.processed[gid] > 0) {
        delete(_pads.cur.processed[gid]);
      }
    } else {
      if (_pads.cur.processed[gid] > 0 && vk.counts.gr >= _pads.cur.savedcnts[gid]) {
        Pads.decr('gr');
        for (var i in _pads.cur.savedcnts) {
          --_pads.cur.savedcnts[i];
        }
      }
      if (block > 0) {
        text = '<div class="pads_gr_clubinv_block">' + text.replace('{club}', '<b>' + val(domPS(ge('pads_clubinv' + gid))) + '</b>') + '</div>';
        text += '<div class="pads_gr_clubinv_block"><a onclick="Pads.grProcess(this, ' + gid + ', -2, -1)">' + getLang('global_cancel') + '</a></div>';
      } else if (!block && res < 0 && ge('pads_clubinv' + gid)) {
        text += '<div class="pads_gr_clubinv_block"><a onclick="Pads.grProcess(this, ' + gid + ', -2, 1)">' + val('groups_block_clubinv').replace('{club}', '<b>' + val(domPS(ge('pads_clubinv' + gid))) + '</b>') + '</a></div>';
      }
    }
    delete(_pads.cur.savedcnts[gid]);

    var el = ge('pad_gr' + gid), btns = geByClass1('pad_gr_btns', el) || geByClass1('pad_gr_result', el);
    if (!fail && block < 0) {
      text = btns.oldtext;
    }
    domPN(btns).replaceChild(ce('div', {
      innerHTML: text,
      className: 'pad_gr_result',
      oldtext: val(btns)
    }), btns);
    return true;
  },
  grProcess: function(el, gid, res, block) {
    if (!_pads.cur.processed[gid]) {
      _pads.cur.processed[gid] = 1;
      _pads.cur.savedcnts[gid] = vk.counts.gr;
      --_pads.cur.offset;
    } else if (res != -2) {
      return;
    } else {
      _pads.cur.processed[gid] = -1;
    }
    var act = (res == -2) ? 'spam' : (res ? 'enter' : 'leave'), context = (res == -1) ? '_decline' : ((res == 2) ? '_unsure' : '');
    ajax.post('al_groups.php', {act: act, gid: gid, from: 'pad', context: context, hash: _pads.hash, block: block}, {
      onDone: Pads.grDone.pbind(gid, false, res, block),
      onFail: Pads.grDone.pbind(gid, true, res, block),
      showProgress: Pads.lock.pbind(el),
      hideProgress: Pads.unlock.pbind(el)
    });
    Pads.invalidate();
  },

  msgAnswer: function(el, msg, ev) {
    var t = ge('pad_msg_field' + msg), d = val('pad_msgd' + msg).split('/'), rcpts = '';
    if (ev === false || ev === true) {
      if (!t) return;
    } else {
      ev = ev || window.event;
      for (var tg = ev.target || ev.srcElement; tg; tg = domPN(tg)) {
        if (tg.tagName == 'A' || (tg.className || '').match(/(\s|^)pad_msgr(\s|$)/)) return;
      }
      if (trim((
        window.getSelection && window.getSelection() ||
        document.getSelection && document.getSelection() ||
        document.selection && document.selection.createRange().text || ''
      ).toString()).length) {
        return;
      }
    }
    if (t) {
      if (ev !== false && trim(val(t))) return (ev === true) ? true : elfocus(t);
      re(geByClass1('pad_msgr', el));
      removeClass(el, 'pad_msg_reply');
      delete(_pads.editing[msg]);
      if (ev !== true) {
        if (isEmpty(_pads.editing) && _pads.layerBG) {
          re(_pads.layerBG);
          _pads.layerBG = 0;
        }
        Pads.update();
      }
    } else {
      for (var i in _pads.editing) {
        Pads.msgAnswer(ge('pad_msg' + i), i, true);
      }
      if (d[1]) {
        rcpts = '<a onclick="showBox(\'al_im.php\', {act: \'a_show_members_box\', chat: ' + (intval(d[0]) - 2e9) + '}, {stat: [\'im.css\', \'boxes.css\'], params: {dark: 1}})" class="pad_msg_rcpts fl_l">' + getLang('mail_chat_X_rcpts', intval(d[1])) + '</a>';
      }
      var c = geByClass1('pad_msg_wrap', el).appendChild(ce('div', {
        className: 'pad_msga pad_msgr',
        innerHTML: val('pad_msg_reply_tpl').replace('{field}', '\
<textarea onkeydown="Pads.onSubmit(this, event, Pads.msgSend.pbind(geByTag1(\'button\', this.parentNode), ' + msg + '))" id="pad_msg_field' + msg + '" class="pad_msg_field"></textarea>\
<div class="pad_msg_btns clear_fix">\
  <div class="pad_msg_btn button_blue fl_l">\
    <button onclick="Pads.msgSend(this, ' + msg + ')" onmouseover="Pads.showTip(' + msg + ', 1)" onmouseout="Pads.showTip(' + msg + ', 0)">' + getLang('global_send') + '</button>\
  </div>' + rcpts + '\
</div>')
      }));
      t = ge('pad_msg_field' + msg);
      addClass(el, 'pad_msg_reply');
      autosizeSetup(t, {minHeight: 31, onResize: Pads.update});
      _pads.editing[msg] = 1;

      if (!_pads.layerBG) {
        _pads.layerBG = bodyNode.appendChild(ce('div', {id: 'pad_layer_bg', className: 'fixed', onclick: Pads.msgHide}));
      }

      var dy = c.offsetTop + c.offsetHeight - _pads.content.scrollTop - _pads.content.offsetHeight + 15, d = function() {
        Pads.update();
        elfocus(t);
      };
      if (dy > 0) {
        animate(_pads.content, {scrollTop: (_pads.content.scrollTop + dy)}, 200, d);
      }  else {
        d();
      }
    }
  },
  msgHide: function(e) {
    e = e || window.event;
    if (e.target != ge('pad_layer_bg')) return;
    for (var i in _pads.editing) {
      if (trim(val('pad_msg_field' + i))) {
        return showFastBox(getLang('global_warning'), getLang('mail_are_sure_close'), getLang('mail_pad_cancel'), Pads.boxHide, getLang('global_cancel'));
      }
    }
    Pads.hide();
  },
  msgMark: function(ids) {
    if (!ids.length) return;
    ajax.post('al_mail.php', {act: 'a_mark', mark: 'read', msgs_ids: ids.join(','), hash: _pads.hash}, {
      onDone: function(res, cnt) {
        handlePageCount('msg', cnt);
      }
    });
  },
  msgDone: function(msg, fail, text) {
    var c = ge('pad_msg' + msg);
    if (fail) {
      var f = geByClass1('pad_msg_error', c), h = 0;
      if (f) {
        h -= f.offsetHeight;
      } else {
        var w = geByClass1('pad_msga_wrap', geByClass1('pad_msgr', c));
        if (!w) return;
        f = w.insertBefore(ce('div', {className: 'pad_msg_error msg'}), domFC(w));
        h = 8;
      }
      val(f, text);
      h += f.offsetHeight;
      if (h) {
        _pads.content.scrollTop += h;
        Pads.update();
      }

      setStyle(f, {backgroundColor: '#F4EBBD'});
      animate(f, {backgroundColor: '#F9F6E7'}, 2000);
      setTimeout(elfocus.pbind('pad_msg_field' + msg), 0);
    } else {
      if (ge('pad_msg_field' + msg)) {
        Pads.msgAnswer(ge('pad_msg' + msg), msg, false);
      }
      var w = geByClass1('pad_msg_wrap', c), a = geByClass1('pad_msga', c), n = se(text);
      if (a) {
        w.replaceChild(n, a);
      } else {
        w.appendChild(n);
      }
    }
    return true;
  },
  msgSend: function(el, msg) {
    if (buttonLocked(el)) return;

    var text = trim(val('pad_msg_field' + msg));
    if (!text) return elfocus('pad_msg_field' + msg);
    ajax.post('al_mail.php', {
      act: 'a_send',
      to_id: intval(val('pad_msgd' + msg)),
      from: 'pad',
      hash: _pads.hash,
      message: text
    }, {
      onDone: Pads.msgDone.pbind(msg, false),
      onFail: Pads.msgDone.pbind(msg, true),
      showProgress: Pads.lock.pbind(el),
      hideProgress: Pads.unlock.pbind(el)
    })
    Pads.invalidate();
  },

  nwsAnswer: function(nws, ev, opts) {
    var op = _pads.editing[nws], t = ge('pad_nws_field' + nws), d = val('pad_nwsd' + nws).split('/'), el = ge('pad_nws' + nws);
    if (ev === false || ev === true) {
      if (!op) return;
    } else {
      ev = ev || window.event;
      for (var tg = ev.target || ev.srcElement; tg; tg = domPN(tg)) {
        if (tg.tagName == 'A' || (tg.className || '').match(/(\s|^)pad_nwsr(\s|$)/)) return;
      }
      if (trim((
        window.getSelection && window.getSelection() ||
        document.getSelection && document.getSelection() ||
        document.selection && document.selection.createRange().text || ''
      ).toString()).length) {
        return;
      }
    }
    if (op) {
      if (ev !== false) {
        var v = t ? val(t) : '';
        if (trim(v) && op.greet.indexOf(v) !== 0) return (ev === true) ? true : elfocus(t);
      }
      if (t) cleanElems(t);
      re(geByClass1('pad_nwsr', el));
      removeClass(el, 'pad_nws_reply');
      delete(_pads.editing[nws]);
      if (ev !== true) {
        if (isEmpty(_pads.editing) && _pads.layerBG) {
          re(_pads.layerBG);
          _pads.layerBG = 0;
        }
        Pads.update();
      }
    } else {
      for (var i in _pads.editing) {
        Pads.nwsAnswer(i, true, _pads.editing[i]);
      }
      addClass(el, 'pad_nws_reply');
      _pads.editing[nws] = opts;
      if (opts.disabled) {
        var c = geByClass1('pad_nws_cont', el).appendChild(ce('div', {
          className: 'pad_nwsa pad_nwsr',
          innerHTML: val('pad_nws_dis_tpl').replace('{text}', opts.disabled)
        }));
      } else {
        var c = geByClass1('pad_nws_cont', el).appendChild(ce('div', {
          className: 'pad_nwsa pad_nwsr',
          innerHTML: val('pad_nws_reply_tpl').replace('{field}', '\
<textarea onkeydown="Pads.onSubmit(this, event, Pads.nwsSend.pbind(geByTag1(\'button\', this.parentNode), \'' + nws + '\'))" id="pad_nws_field' + nws + '" class="pad_nws_field" placeholder="' + opts.ph + '">' + opts.greet + '</textarea>\
<div class="pad_nws_btns clear_fix">\
  <div class="pad_nws_btn button_blue fl_l">\
    <button onclick="Pads.nwsSend(this, \'' + nws + '\')" onmouseover="Pads.showTip(\'' + nws + '\', 1)" onmouseout="Pads.showTip(\'' + nws + '\', 0)">' + opts.btn + '</button>\
  </div>\
</div>')
        }));
        t = ge('pad_nws_field' + nws);
        placeholderSetup(t, {back: true});
        autosizeSetup(t, {minHeight: 31, onResize: Pads.update});
      }
      // if (window.Wall) {
      //   Wall.initComposer(t, {
      //     lang: {
      //       introText: getLang('profile_mention_start_typing'),
      //       noResult: getLang('profile_mention_not_found')
      //     }
      //   });
      // }

      if (!_pads.layerBG) {
        _pads.layerBG = bodyNode.appendChild(ce('div', {id: 'pad_layer_bg', className: 'fixed', onclick: Pads.nwsHide}));
      }

      var dy = c.offsetTop + c.offsetHeight - _pads.content.scrollTop - _pads.content.offsetHeight + 15, d = function() {
        Pads.update();
        if (t) elfocus(t);
      };
      if (dy > 0) {
        animate(_pads.content, {scrollTop: (_pads.content.scrollTop + dy)}, 200, d);
      }  else {
        d();
      }
    }
  },
  nwsHide: function(e) {
    e = e || window.event;
    if (e.target != ge('pad_layer_bg')) return;
    for (var i in _pads.editing) {
      var v = val('pad_nws_field' + i);
      if (trim(v) && _pads.editing[i].greet.indexOf(v) !== 0) {
        return showFastBox(getLang('global_warning'), getLang('news_are_sure_close'), getLang('news_pad_cancel'), Pads.boxHide, getLang('global_cancel'));
      }
    }
    Pads.hide();
  },
  nwsDone: function(nws, fail, text) {
    var c = ge('pad_nws' + nws);
    if (fail) {
      var f = geByClass1('pad_nws_error', c), h = 0;
      if (f) {
        h -= f.offsetHeight;
      } else {
        var w = geByClass1('pad_nwsa_wrap', geByClass1('pad_nwsr', c));
        if (!w) return;
        f = w.insertBefore(ce('div', {className: 'pad_nws_error nws'}), domFC(w));
        h = 8;
      }
      val(f, text);
      h += f.offsetHeight;
      if (h) {
        _pads.content.scrollTop += h;
        Pads.update();
      }

      setStyle(f, {backgroundColor: '#F4EBBD'});
      animate(f, {backgroundColor: '#F9F6E7'}, 2000);
      setTimeout(elfocus.pbind('pad_nws_field' + nws), 0);
    } else {
      if (ge('pad_nws_field' + nws)) {
        Pads.nwsAnswer(nws, false);
      }
      var w = geByClass1('pad_nws_cont', c), a = geByClass1('pad_nwsa', c), n = se(text);
      if (a) {
        w.replaceChild(n, a);
      } else {
        w.appendChild(n);
      }
    }
    return true;
  },
  nwsSend: function(el, nws) {
    if (buttonLocked(el)) return;

    var opts = _pads.editing[nws], item = val('pad_nwsd' + nws), text = trim(val('pad_nws_field' + nws));
    if (!text || opts.greet.indexOf(text) === 0) return elfocus('pad_nws_field' + nws);

    var params = extend({
      act: 'post',
      message: text,
      from: 'pad',
      item: item
    }, opts.params || {});
    ajax.post('al_wall.php', params, {
      onDone: Pads.nwsDone.pbind(nws, false),
      onFail: Pads.nwsDone.pbind(nws, true),
      showProgress: Pads.lock.pbind(el),
      hideProgress: Pads.unlock.pbind(el)
    });
    Pads.invalidate();
  },
  nwsTooltip: function(el, post) {
    var url = 'al_wall.php';

    if (!post.indexOf('topic_comment')) {
      url = 'al_board.php';
      post = post.replace('topic_comment', '');
    } else {
      post = post.replace('wall_reply', '').replace('wall', '');
    }

    showTooltip(el, {
      url: url,
      params: extend({act: 'post_tt', post: post, self: 1, from: 'pad'}),
      slide: 15,
      shift: [35, -3, 0],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      className: 'rich wall_tt'
    });
  },

  showAppStandalone: function(event, aid, need_install, ref_num, from_id, data, hash) {
    data && data.request_id && this.apMark([data.request_id], hash);
    showApp.apply(null, Array.prototype.slice.call(arguments));
    return false;
  },

  apMark: function(ids, hash) {
    if (!ids.length) return;
    ajax.post('al_apps.php', {act: 'a_mark', mark: 'read', notif_ids: ids.join(','), hash: hash || _pads.hash}, {
      onDone: function(res, cnt) {
        handlePageCount('ap', cnt);
      }
    });
  },
  apDone: function(nid, fail, text, cnt) {
    if (fail) {
      text = '<span class="pad_error">' + text + '</span>';
      if (_pads.cur.processed[nid] > 0) {
        delete(_pads.cur.processed[nid]);
      }
    } else if (_pads.cur.processed[nid] > 0 && vk.counts.ap >= _pads.cur.savedcnts[nid]) {
      if (cnt !== void(0) && cnt !== null && cnt > -1) {
        handlePageCount('ap', cnt);
      } else {
        Pads.decr('ap');
      }
      for (var i in _pads.cur.savedcnts) {
        --_pads.cur.savedcnts[i];
      }
    }
    delete(_pads.cur.savedcnts[nid]);
    var el = ge('pad_ap' + nid), btns = geByClass1('pad_ap_btns', el) || geByClass1('pad_ap_result', el);
    domPN(btns).replaceChild(ce('div', {
      innerHTML: text,
      className: 'pad_ap_result'
    }), btns);
    return true;
  },
  apProcess: function(el, nid, res) {
    if (!_pads.cur.processed[nid]) {
      _pads.cur.processed[nid] = 1;
      _pads.cur.savedcnts[nid] = vk.counts.ap;
      --_pads.cur.offset;
    } else if (res != -3 && res != -4) {
      return;
    } else {
      _pads.cur.processed[nid] = -1;
    }
    var act = (res == -1 ? 'a_reject_request' : (res == -3 ? 'a_request_ban_user' : (res == -4 ? 'deny_notifications' : 'delete_notif')));
    ajax.post('al_apps.php', {act: act, nid: nid, from: 'pad', hash: _pads.hash}, {
      onDone: Pads.apDone.pbind(nid, false),
      onFail: Pads.apDone.pbind(nid, true),
      showProgress: Pads.lock.pbind(el),
      hideProgress: Pads.unlock.pbind(el)
    });
    Pads.invalidate();
  },
  apRemoveAll: function(hash) {
    ajax.post('apps', {act: 'a_remove_all_notifies', hash: hash, requests: 1}, {
      onDone: function() {
        Pads.decr('ap', true);
      }
    });
  },
  loadAudioRecommendations: function(el, aid) {
    if (el.tt) el.tt.hide();
    stManager.add('audioplayer.js', function() {
      if (!window.audioPlayer) return;
      audioPlayer.showRec(aid, true);
    });
  },
  addAudio: function(el, aid, oid) {
    if (cur.addedIds && cur.addedIds[oid+'_'+aid]) return false;
    if (el.tt) el.tt.hide();
    if (window.Audio) {
      var oldEl = el;
      el = Audio.animateAdded(el, 200);
      var addEl = ge('audio'+oid+'_'+aid) && geByClass1('audio_add_wrap', ge('audio'+oid+'_'+aid));
      if (addEl && !hasClass(addEl, 'anim')) {
        Audio.animateAdded(addEl, 200);
      }
    } else {
      var c = se('<div class="audio_add_wrap added fl_r" onclick="return cancelEvent(event);"><div class="audio_add"></div></div>');
      el.parentNode.replaceChild(c, el);
    }
    var _a = window.audioPlayer;
    var query = {act: 'add', aid: aid, oid: oid, hash: (window._pads && _pads.addHash || _a && _a.addHash)};
    if (_a && (_a.top || _a.playbackParams && (_a.playbackParams.top_audio || _a.playbackParams.top))) {
      query.top = 1;
    }
    ajax.post(Audio.address, query, {
      onDone: function (data, res) {
        if (data && window.Audio) {
          var aobj = eval('('+data+')'), all_list;
          aobj = aobj['all'][0];
          setTimeout(function(){
            if (cur.id == vk.id && cur.audiosIndex && cur.audiosList && cur.audiosList['all'] && cur.aSearch) {
              all_list = cur.audiosList['all'];
              if (all_list && all_list.length) {
                aobj._order = all_list[0]._order - 1;
                cur.audiosList['all'].splice(0,0,aobj);
              } else {
                aobj._order = 0;
                cur.audiosList['all'] = [aobj];
              }
              cur.audios[aobj[1]] = aobj;
              cur.audiosIndex.add(aobj);
            }
            if (window._pads && _pads.cur && _pads.cur.audiosIndex && _pads.cur.audiosList) {
              all_list = _pads.cur.audiosList['all'];
              if (all_list && all_list.length) {
                aobj._order = all_list[0]._order - 1;
                _pads.cur.audiosList['all'].splice(0,0,aobj);
              } else {
                aobj._order = 0;
                _pads.cur.audiosList['all'] = [aobj];
              }
              if (_pads.cur.audios) {
                _pads.cur.audios[aobj[1]] = aobj;
              }
              if (_pads.cur.allAudiosIndex == 'all') {
                _pads.cur.audiosIndex.add(aobj);
              }
            }
            Pads.clearAudioLoadCache();
          }, 0);
          if (!cur.addedAudios) cur.addedAudios = [];
          cur.addedAudios[res.audio] = oldEl;

          addEvent(el, 'click', function(event) {
            Audio.deleteAddedAudio({id: res.audio, added_oid: oid, added_aid: aid, el: el, hash: res.delete_hash});
            return cancelEvent(event);
          });
          addEvent(el, 'mouseover', showTooltip.pbind(el, {
            text: res.delete_msg,
            showdt: 0,
            black: 1,
            shift: [11, 5, 0],
          }));
        }
        cur.addedIds = cur.addedIds || {};
        cur.addedIds[oid+'_'+aid] = 1;
        if (window.audioPlayer && currentAudioId()) {
          var cur_aids = currentAudioId().split('_');
          if (cur_aids[0] == oid && cur_aids[1] == aid) {
            audioPlayer.showCurrentAdded();
          }
        }
      }
    });
  },
  onAudioReorder: function(audio, before, after) {
    var aid = audio.id.substr(5);
    var before_id = (before && before.id || '').substr(5);
    var after_id = (after && after.id || '').substr(5);
    var padPlist = padAudioPlaylist();
    if (aid && padPlist && !padPlist[aid]) {
      aid = aid.replace('_pad', '');
      before_id = before_id.replace('_pad', '');
      after_id = after_id.replace('_pad', '');
    }
    if (aid && padPlist && padPlist[aid]) {
      if (!before_id && after_id && padPlist[after_id]) {
        before_id = padPlist[after_id]._next;
      } else if (!after_id && before_id && padPlist[before_id]) {
        after_id = padPlist[before_id]._prev;
      }
      var pl = ge('pad_playlist');
      if (pl && pl.sorter && pl.sorter.elems) {
        var newStart = (pl.sorter.elems[0].id || '').substr(5);
        if (newStart && !padPlist[newStart]) {
          newStart = newStart.replace('_pad', '');
        }
        padPlist.start = newStart;
      }
      var prev_id = padPlist[aid]._prev, next_id = padPlist[aid]._next;
      if (prev_id && padPlist[prev_id] && next_id && padPlist[next_id] &&
        before_id && padPlist[before_id] && after_id && padPlist[after_id] && after_id != aid && before_id != aid) {
        padPlist[prev_id]._next = next_id;
        padPlist[next_id]._prev = prev_id;
        padPlist[aid]._prev = after_id;
        padPlist[after_id]._next = aid;
        padPlist[aid]._next = before_id;
        padPlist[before_id]._prev = aid;
      }
      if (window.audioPlaylist && audioPlaylist[aid]) {
        window.audioPlaylist = padPlist;
      }
      ls.set('pad_playlist', padPlist);
      ls.set('pad_pltime', vkNow());
    }
  },
  setAudioCurPos: function(speed) {
    var _a = window.audioPlayer, audio_id = (_a && _a.isPlaylistGlobal()) ? ls.get('audio_id') || currentAudioId() : currentAudioId(), topPad = getSize(ge('page_header'))[1] + 6;
    if (!audio_id) return;
    if (audio_id.substr(-4) != '_pad') {
      audio_id += '_pad';
    }
    if (ge('audio'+audio_id)) {
      var h = 430;
      if (window.lastWindowHeight) {
        h = Math.min(h, lastWindowHeight - 104 - (hasClass(ge('pad_arrow'), 'right') ? 13 : topPad));
        if (h < 200) h = 200;
      }
      var sTop = ge('audio'+audio_id).offsetTop + ge('pad_playlist').offsetTop - Math.min(ge('pad_cont').offsetHeight, h) / 2 + 17;
      if (ge('pad_content') && sTop > 0) {
        if (speed) {
          animate(ge('pad_content'), {scrollTop: sTop}, speed, function() {
            Pads.update();
          })
        } else {
          ge('pad_content').scrollTop = sTop;
          Pads.update();
        }
      }
    }
  },
  playLastStatus: function() {
    var _a = audioPlayer, pl = ge('pad_playlist');
    if (cur.nextPlaylist && cur.nextPlaylist.start) {
      var m = cur.nextPlaylist.start.match(/^-?\d+_\d+_s(-?\d+)(?:_|$)/);
      if (m && m[1] && _a.statusData && _a.statusData[m[1]]) {
        var data = _a.statusData[m[1]];
        window.audioPlaylist = clone(cur.nextPlaylist);
        if (window.audioPlayer) {
          audioPlayer.setPadPlaylist(audioPlaylist);
        }
        playAudioNew(audioPlaylist.start);
        pl.innerHTML = '<div class="pad_audio_status">'+data.audio_litening_to_user+'</div>';
        ge('pad_footer_text').innerHTML = data.audio_goto_user;
        hide('pad_more_audio');
      }
    }
  },
  audioRow: function(audio, opts) {
    opts = opts || {};
    var aid = audio.full_id || audio[0]+'_'+audio[1], actions = '';
    var performer = audio[5].replace(/\\$/g, "\\&#36;");
    var _a = window.audioPlayer, cur_aid = (_a && _a.isPlaylistGlobal()) ? ls.get('audio_id') || currentAudioId() : currentAudioId();
    if (vk.id != audio[0] || audio[9] && intval(audio[9])) {
      if (cur.addedIds && cur.addedIds[audio[0]+'_'+audio[1]]) {
        actions += '<div class="audio_add_wrap added fl_r" onclick="return cancelEvent(event);"><div class="audio_add"></div></div>';
      } else {
        var onclick = "Pads.addAudio(this, "+ audio[1] +", "+ audio[0] +"); return cancelEvent(event);";
        actions += rs(_pads.addBtnTpl, {aid: aid, label: getLang('audio_add_to_audio'), onclick: onclick});
      }
    }

    actions += rs(_pads.recommendBtnTpl, {aid: aid, from_pad: 1});

    return rs(_pads.audioPadTpl, {
      audio_id: (aid.substr(-4) == '_pad') ? aid : aid+'_pad',
      performer: performer,
      title: audio[6].replace(/\\$/g, "\\&#36;"),
      url: audio[2],
      playtime: audio[3],
      duration: audio[4],
      attr: 'href="/search?c[q]='+encodeURIComponent(performer.replace(/(<span>|<\/span>)/g, ''))+'&c[section]=audio&c[performer]=1" onclick="if (checkEvent(event)) return; Audio.selectPerformer({from_pad: true, event: event, name: \''+clean(performer.replace(/(<span>|<\/span>)/g, ''))+'\'}); return false"',
      actions: actions,
      author: '',
      onclick: 'window.padPlClicked = true; playAudioNew(\''+aid+'\')',
      rowclass: (actions ? '' : 'no_actions') + (cur_aid == aid ? (opts.thisTab && currentAudioId() == aid ? ' current' : ' tab_current') : '')
    });
  },
  showAudios: function() {
    var self = this, __cur = window._pads && _pads.cur, pl = ge('pad_playlist'),
        _a = window.audioPlayer, pList = _a.recsLoaded && cur.nextPlaylist ? cur.nextPlaylist || {} : ((!window.audioPlaylist || window.curNotifier && (padPlData = ls.get('pad_pldata')) && padPlData.source == curNotifier.instance_id) ? ls.get('pad_playlist') || window.audioPlaylist : padAudioPlaylist());
    if (__cur.allLoading) return;
    if (pList) {
      var el = domLC(pl), aid = '', first_id = '', showRowsCnt = 25, rowsCnt = geByClass('audio', pl).length, _a, audio_id = ((_a = window.audioPlayer) && _a.isPlaylistGlobal()) ? ls.get('audio_id') || currentAudioId() : currentAudioId();

      if (el) {
        first_id = geByClass1('audio', pl).id.substr(5).replace('_pad', '');
        var last_id = el.id.substr(5).replace('_pad', '');
        if (pList[last_id] && pList[last_id]._next) {
          aid = pList[last_id]._next;
        }
      } else if (audio_id && pList[audio_id]) {
        aid = audio_id;
        for (var i = 0; i < 100; i++) {
          if (!aid || aid == pList.start) break;
          aid = pList[aid]._prev;
          showRowsCnt++;
        }
        first_id = aid;
      } else {
        aid = first_id = pList.start;
      }
      if (!first_id) {
        if (audio_id) {
          var m = audio_id.match(/^-?\d+_\d+_s(-?\d+)(?:_|$)/);
          if (m && m[1] && (pList.statusData || _a.statusData && _a.statusData[m[1]])) {
            var data = pList.statusData || _a.statusData[m[1]];
            var el = se('<div class="pad_audio_status">' + (first_id != audio_id ? data.audio_listen_to_user : data.audio_litening_to_user) + '</div>');
            pl.appendChild(el);
            setTimeout(function() {
              setStyle(el, {height: getSize(_pads.content)[1] - 110 - ge('pad_playlist').offsetTop});
            }, 0)
            ge('pad_footer_text').innerHTML = data.audio_goto_user;
          }
        }
        hide('pad_more_audio');
      } else {
        if (first_id) {
          var m = first_id.match(/^-?\d+_\d+_s(-?\d+)(?:_|$)/);
          if (m && m[1] && (pList.statusData || _a.statusData && _a.statusData[m[1]]) && !pList[first_id]._next) {
            var data = pList.statusData || _a.statusData[m[1]];
            var el = se('<div class="pad_audio_status">' + (first_id != audio_id ? data.audio_listen_to_user : data.audio_litening_to_user) + '</div>');
            pl.appendChild(el);
            setTimeout(function() {
              setStyle(el, {height: getSize(_pads.content)[1] - 110 - ge('pad_playlist').offsetTop});
            }, 0)
            ge('pad_footer_text').innerHTML = data.audio_goto_user;
            hide('pad_more_audio');
            return;
          }
        }
        var k = 0;
        if (aid) {
          var thisTab = pList && window.curNotifier && pList.instance == curNotifier.instance_id;
          do {
            var rowEl = se(Pads.audioRow(pList[aid], {thisTab: thisTab}));
            pl.appendChild(rowEl);
            if (pList[aid]._next) aid = pList[aid]._next;
            k++;
          } while (aid && aid !== first_id && k < showRowsCnt);
        }
        if (aid == first_id) {
          var more = ge('pad_more_audio');
          if (pList.has_more) {
            __cur.allLoading = true;
            __cur.allLoadedCallback = function() {
              __cur.allLoading = false;
              Audio.showRows({from_pad: true});
            }
            Audio.loadFriendsAudios({from_pad: true, id: vk.id, index: 'all'});
          } else {
            hide(more);
          }
        }
        if (window._pads && _pads.currentShown && !browser.mobile) {
          if (el && pl.sorter) {
            setTimeout(sorter.added.pbind(pl), 0);
          } else {
            setTimeout(function(){
              sorter.init(pl, {scrollNode: ge('pad_content'), onReorder: Pads.onAudioReorder, noMoveCursor: 1});
              if (!el && !_a.recsLoaded) Pads.setAudioCurPos();
            }, 0);
          }
        }
        if (pList.htitle) {
          ge('pad_footer_text').innerHTML = '<span class="audio_album_length">'+pList.htitle+'</span>';
        }
        if (!el && !_a.recsLoaded) Pads.setAudioCurPos();
      }
      Pads.update();
    }
  },
  clearAudioLoadCache: function() {
    if (!window._pads) {
      return;
    }
    Pads.invalidate();
    if (!window.ajaxCache) {
      return;
    }
    for (var i in window.ajaxCache) {
      var h = i.split('#'), params = h[1] && q2ajx(h[1]);
      if ((h[0] == '/audio' || h[0] == 'audio') && params.act == 'load_audios_silent' && intval(params.id) == vk.id) {
        delete ajaxCache[i];
      }
    }
  }
};

try{stManager.done('pads.js');}catch(e){}
