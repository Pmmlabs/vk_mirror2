var Pagination = {
  init: function(toBottom) {
    cur.initScrollFn = Pagination.initScroll.pbind(toBottom);

    cur.pgFixed = ce('div', {id: 'pg_fixed', className: 'fixed', innerHTML: '\
<div class="pg_fixed_back"></div>\
<div class="pg_fixed_pages">\
    '});
    cur.pgFixedBack = cur.pgFixed.firstChild;
    cur.pgFixedPages = cur.pgFixedBack.nextSibling;

    if (cur.pgUrl) {
      Pagination.clearPreload();
      if (cur.pgPreload) {
        ajax.preload(cur.pgUrl, extend({offset: cur.pgOffset, part: 1}, cur.pgParams || {}), cur.pgPreload);
        delete(cur.pgPreload);
      }
    }

    Pagination.reinit(true);
    Pagination.pageReady(true);

    cur.nav.push(Pagination.nav);
  },

  scrollnode: function() {
    return browser.msie6 ? pageNode : window;
  },
  initScroll: function(toBottom, start) {
    var st = (toBottom === true) ? (getXY(cur.pgCont.lastChild || cur.pgCont)[1] + (browser.msie6 ? scrollGetY() : 0)) : intval(toBottom);
    if (start === true) {
      if (!vk.loaded) {
        addEvent(window, 'load', function() {
          Pagination.setScroll(st);
        });
      } else {
        setTimeout(Pagination.setScroll.pbind(st), 0);
      }
    }

    addEvent(Pagination.scrollnode(), 'scroll', Pagination.scrollResize);
    addEvent(window, 'resize', Pagination.scrollResize);
  },
  setScroll: function(st) {
    scrollToY(st, 0);
  },
  reinit: function(start) {
    cur.initScrollFn(start);
    bodyNode.appendChild(cur.pgFixed);
    if (!browser.mobile) {
      addEvent(cur.pgFixed, 'mouseover', Pagination.fixedOver);
      addEvent(cur.pgFixed, 'mouseout', Pagination.fixedOut);
      addEvent(window, 'keydown', Pagination.keyNav);
    }
  },
  pageTopUpdated: function() {
    cur.pgFixedStart = getXY(cur.pgCont)[1] + (browser.msie6 ? scrollGetY() : 0);
    if (cur.pgNodesCount) {
      cur.pgFixedDelta = cur.pgFixedStart - cur.pgCont.childNodes[0].offsetTop;
    }
  },
  pageReady: function(start) {
    if (start) {
      cur.pgPage = cur.pgStartPage = Math.floor(cur.pgStart / cur.pgPerPage);
    }
    cur.pgNodesCount = cur.pgCont.childNodes.length;
    Pagination.pageTopUpdated();

    setTimeout(Pagination.genFixed, 0);
  },
  deinit: function() {
    removeEvent(Pagination.scrollnode(), 'scroll', Pagination.scrollResize);
    removeEvent(window, 'resize', Pagination.scrollResize);
    removeEvent(window, 'keydown', Pagination.keyNav);
    removeEvent(cur.pgFixed, 'mouseover', Pagination.fixedOver);
    removeEvent(cur.pgFixed, 'mouseout', Pagination.fixedOut);
    re(cur.pgFixed);
  },
  genFixed: function() {
    if (cur.pgStart + cur.pgCount <= cur.pgPerPage) return;
    var href = cur.pgHref ? (' href="' + cur.pgHref + '%d"') : '';
    var onclick = ' onclick="' + (cur.pgOnClick || 'return nav.go(this, event, {pgFromFixed: true})') + '"';
    var page = cur.pgPage, per = cur.pgPerPage, delta = cur.pgDelta || 2;
    var count = Math.ceil(cur.pgCount / per), offset, symbol, cls, sz, html = [];
    if (page > delta) {
      if (cur.pgByOne) {
        offset = (page - 1) * per;
        symbol = '&lsaquo;'
      } else {
        offset = 0;
        symbol = '&laquo;'
      }
      html.push('<a class="pg_flnk_nb"' + href.replace('%d', offset) + onclick.replace('%d', offset) + '>' + symbol + '</a>');
    }
    for (var i = Math.max(0, page - delta); i < page; ++i) {
      offset = i * per;
      cls = (i >= cur.pgStartPage) ? 'pg_flnk_rd' : 'pg_flnk';
      html.push('<a class="' + cls + '"' + href.replace('%d', offset) + onclick.replace('%d', offset) + '>' + (i + 1) + '</a>');
    }
    html.push('<a class="pg_flnk_sel"' + href.replace('%d', page * per) + onclick.replace('%d', page * per) + '>' + (page + 1) + '</a>');
    for (var i = page + 1; i < page + delta + 1 && i < count; ++i) {
      offset = i * per;
      cls = (offset >= cur.pgStart + cur.pgNodesCount) ? 'pg_flnk' : 'pg_flnk_rd';
      html.push('<a class="' + cls + '"' + href.replace('%d', offset) + onclick.replace('%d', offset) + '>' + (i + 1) + '</a>');
    }
    if (page < count - delta - 1) {
      if (cur.pgByOne) {
        offset = (page + 1) * per;
        symbol = '&rsaquo;'
      } else {
        offset = (count - 1) * per;
        symbol = '&raquo;'
      }
      html.push('<a class="pg_flnk_nb"' + href.replace('%d', offset) + onclick.replace('%d', offset) + '>' + symbol + '</a>');
    }

    cur.pgFixedPages.innerHTML = html.join('');
    if (isVisible(cur.pgFixed)) {
      sz = getSize(cur.pgFixedPages);
    } else {
      show(cur.pgFixed);
      sz = getSize(cur.pgFixedPages);
      hide(cur.pgFixed);
    }
    setStyle(cur.pgFixedBack, {width: sz[0], height: sz[1]});

    Pagination.updateFixed({type: 'all'});
  },
  keyNav: function(event) {
    if (layers.visible || cur.pgNoArrowNav && cur.pgNoArrowNav() || !event.ctrlKey && !event.metaKey) {
      return;
    }

    var newpage = cur.pgPage, per = cur.pgPerPage;
    if (event.keyCode == KEY.RIGHT) {
      ++newpage;
    } else if (event.keyCode == KEY.LEFT) {
      --newpage;
    }
    if (newpage == cur.pgPage || newpage < 0 || newpage >= Math.ceil(cur.pgCount / per)) {
      return;
    }
    var newLoc = nav.objLoc;
    if (newpage) {
      newLoc.offset = newpage * per;
    } else {
      delete(newLoc.offset);
    }
    nav.go(newLoc, false, {pgFromFixed: isVisible(cur.pgFixed)});
    return cancelEvent(event);
  },
  nav: function(changed, oldLoc, newLoc, opts) {
    if (isEmpty(changed)) return;
    var offset = intval(changed.offset === undefined ? oldLoc.offset : changed.offset), fix = opts.pgFromFixed;
    delete(changed.offset);
    if (!isEmpty(changed)) return;

    if ((fix || opts.hist) && (
        offset > cur.pgStart && offset < cur.pgStart + cur.pgNodesCount ||
        offset == cur.pgStart && scrollGetY() >= cur.pgFixedStart)) {
      var scrollOffset = cur.pgCont.childNodes[offset - cur.pgStart].offsetTop + cur.pgFixedDelta;
      var newPage = Math.floor(offset / cur.pgPerPage);
      nav.setLoc(newLoc);
      cur.pgPage = newPage;
      setTimeout(function() {
        Pagination.setScroll(scrollOffset);
        Pagination.genFixed();
      }, 0);
      return false;
    }
    if (!cur.pgUrl) return;

    ajax.post(cur.pgUrl, extend({offset: offset, local: 1}, cur.pgParams || {}), {onDone: function() {
      Pagination.loaded.apply(window, arguments);
      nav.setLoc(newLoc);
      setTimeout(function() {
        Pagination.setScroll(fix ? cur.pgFixedStart : 0);
      }, 0);
    }, frame: 1, canReload: true, showProgress: showTitleProgress, hideProgress: hideTitleProgress});
    return false;
  },
  fixedOver: function() {
    cur.pgOver = true;
    clearTimeout(cur.pgTimer);
    cur.pgTimer = setTimeout(Pagination.updateFixed, 1000);
  },
  fixedOut: function() {
    cur.pgOver = false;
    clearTimeout(cur.pgTimer);
    cur.pgTimer = setTimeout(Pagination.updateFixed, 1000);
  },
  updateFixedLeft: function(e) {
    if (!e || e.type != 'resize' && e.type != 'all') return;
    if (vk.rtl) {
      cur.pgFixed.style.left = (ge('page_layout').offsetLeft + 16) + 'px';
    } else {
      cur.pgFixed.style.left = (ge('page_layout').offsetLeft + vk.width - 16 - getSize(cur.pgFixed)[0]) + 'px';
    }
  },
  updateFixed: function(e, st) {
    if (st === undefined) st = scrollGetY();
    Pagination.updateFixedLeft(e);
    if (!cur.pgOver && st < cur.pgFixedStart) {
      if (isVisible(cur.pgFixed) && !cur.pgHiding) {
        cur.pgHiding = true;
        cur.pgShowing = false;
        fadeOut(cur.pgFixed, 300, function() {
          cur.pgHiding = false;
        });
      }
      return;
    }
    if (!cur.pgShowing && (cur.pgHiding || !isVisible(cur.pgFixed))) {
      if (cur.pgHiding) {
        data(cur.pgFixed, 'tween').stop(true);
      }
      cur.pgShowing = true;
      fadeIn(cur.pgFixed, 300, function() {
        cur.pgShowing = false;
      });
    }
  },
  scrollResize: function(e) {
    if (browser.mobile && !browser.safari_mobile || cur.pgPaused) return;

    var de = document.documentElement, st = scrollGetY();

    if (e.type == 'scroll') {
      if (!cur.pgCont) {
        Pagination.deinit();
      }
      var children = cur.pgCont.childNodes, l = Math.ceil(cur.pgNodesCount / cur.pgPerPage);

      var i = cur.pgPage - cur.pgStartPage;
      if (st > 50 && (i >= l || st < children[i * cur.pgPerPage].offsetTop + cur.pgFixedDelta)) {
        for (i = Math.min(i, l - 1); i >= 0; --i) {
          if (st >= children[i * cur.pgPerPage].offsetTop + cur.pgFixedDelta) {
            break;
          }
        }
        ++i;
      } else {
        if (st <= 50) i = 0;
        for (; i < l; ++i) {
          if (st < children[i * cur.pgPerPage].offsetTop + cur.pgFixedDelta) {
            break;
          }
        }
      }
      if (i == l - 1 && st + lastWindowHeight > children[cur.pgNodesCount - 1].offsetTop + cur.pgFixedDelta) {
        ++i;
      }
      if (i > 0) --i;

      if (cur.pgPage != cur.pgStartPage + i) {
        cur.pgPage = cur.pgStartPage + i;
        Pagination.genFixed();
      } else {
        Pagination.updateFixed(e);
      }
    } else if (e.type == 'resize') {
      Pagination.updateFixed(e);
    }
    if (cur.pgOnScroll) cur.pgOnScroll(e, st);

    if (!cur.pgMore || cur.pgIgnore && cur.pgIgnore()) return;

    var ch = window.innerHeight || de.clientHeight || bodyNode.clientHeight;

    if (!isVisible(cur.pgMore)) return;
    var custom_offset = cur.pgCustomOffset || 0;
    if (st + custom_offset + ch > cur.pgMore.offsetTop) {
      Pagination.showMore();
    }
  },
  prepare: function(count, from, rows) {
    return ce('div', {innerHTML: rows});
  },
  clearPreload: function() {
    var params = extend({offset: '', part: 1}, cur.pgParams || {});
    var key = (cur.pgUrl.substr(0, 1) == '/' ? '' : '/') + cur.pgUrl + '#' + ajx2q(params);
    var re = new RegExp('^' + escapeRE(key).replace(/([&#]offset=)/, '$1\\d+') + '$', 'i');
    for (var i in ajaxCache) {
      if (re.test(i)) {
        delete ajaxCache[i];
      }
    }
  },
  recache: function(delta) {
    if (cur.pgLoading) {
      cur.pgLoading = 1;
      setTimeout(Pagination.recache.pbind(delta), 100);
      return;
    }
    var params = extend({offset: cur.pgOffset, part: 1}, cur.pgParams || {});
    var url = (cur.pgUrl.substr(0, 1) == '/' ? '' : '/') + cur.pgUrl;
    var keyOld = url + '#' + ajx2q(params), a = ajaxCache[keyOld];
    if (a) {
      a[0] += delta; a[1] += delta;
      var keyNew = url + '#' + ajx2q(extend(params, {offset: cur.pgOffset + delta}));
      ajaxCache[keyNew] = a;
      delete ajaxCache[keyOld];
    }
    cur.pgOffset += delta;
    cur.pgCount += delta;
  },
  loaded: function(count, from, rows, offset, pages, preload) {
    extend(cur, {
      pgOffset: from,
      pgCount: count
    });
    var gotNewPage = preload ? true : false;
    if (gotNewPage) { // got new page
      cur.pgStart = offset;
      cur.pgCont.innerHTML = rows;
      cur.pgPages.innerHTML = pages;
    } else {
      var cont = ge(cur.pgCont), d = (cur.pgPrepare || Pagination.prepare).apply(window, arguments);
      while (d.firstChild) {
        cont.appendChild(d.firstChild);
      }
    }
    toggle(cur.pgMore, from < cur.pgCount && rows);
    Pagination.clearPreload();
    if (preload) {
      ajax.preload(cur.pgUrl, extend({offset: cur.pgOffset, part: 1}, cur.pgParams || {}), preload);
    } else if (from < cur.pgCount && rows) {
      var params = extend({offset: cur.pgOffset, part: 1}, cur.pgParams || {});
      var key = (cur.pgUrl.substr(0, 1) == '/' ? '' : '/') + cur.pgUrl + '#' + ajx2q(params);

      cur.pgLoading = 1;
      ajax.post(cur.pgUrl, params, {cache: 1, onDone: function() {
        if (cur.pgLoading == 2) {
          Pagination.loaded.apply(window, arguments);
          delete ajaxCache[key];
        } else {
          cur.pgLoading = false;
        }
      }, onFail: function() {
        cur.pgLoading = 0;
        return true;
      }});
    }
    Pagination.pageReady(gotNewPage);
    if (cur.pgPostProcess) cur.pgPostProcess.apply(window, arguments);
  },
  showMore: function() {
    if (!cur.pgUrl) {
      cur.pgShow();
    }
    if (!isVisible(cur.pgMore) || isVisible(cur.pgMorePrg)) return;
    if (cur.pgLoading) {
      cur.pgLoading = 2;
      return;
    }

    ajax.post(cur.pgUrl, extend({offset: cur.pgOffset, part: 1}, cur.pgParams || {}), {onDone: Pagination.loaded, onFail: function() {
      cur.pgLoading = 0;
      return true;
    }, showProgress: function() {
      show(cur.pgMorePrg);
      hide(cur.pgMore.firstChild);
    }, hideProgress: function() {
      show(cur.pgMore.firstChild);
      hide(cur.pgMorePrg);
    }, cache: 3});
  }
}

try{stManager.done('pagination.js');}catch(e){}
