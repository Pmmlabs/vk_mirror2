var FansBox = {
  init: function(box, opts) {
    if (cur.lSTL) re(cur.lSTL);
    extend(cur, {
      fnbxOffsets: cur.fnbxOffsets || {},
      fnbxPhCache: cur.fnbxPhCache || {},
      fnbxPhShown: cur.fnbxPhShown || {},
      fnbxIdolsList: cur.fnbxIdolsList || {},
      fnbxIdolsCache: cur.fnbxIdolsCache || {},
      fnbxIdolsIndex: cur.fnbxIdolsIndex || {},
      fnbxIdolsProcessed: cur.fnbxIdolsProcessed || {},
      fnbxIdolsQuery: cur.fnbxIdolsQuery || '',

      fnbxAutoload: true,
      fnbxWasScroll: false,
      fnbxHash: opts.hash,
      fnbxOwnerId: opts.ownerId,
      fnbxId: box.tbId,
      fnbxSearchLink: opts.searchLink || '',
      fnbxPage: opts.address || 'al_fans.php',

      lSTL: boxLayerWrap.appendChild(ce('div', {id: 'layer_stl', innerHTML: '<div id="layer_stl_bg" class="fixed"></div><div id="layer_stl_cl"></div><nobr id="layer_stl_text" class="fixed">' + getLang('global_to_top') + '</nobr>', el: box.bodyNode, onclick: cancelEvent, onmousedown: FansBox.lSTLDown, sc: FansBox.onScroll})),
      lSTLShown: 0,
      lSTLWas: 0,
      lSTLWasSet: 0
    });
    cur.fnbxOffsets[opts.tab] = opts.offset;

    ajax.preload(cur.fnbxPage, {
      act: cur.fnbxAct || 'box',
      tab: opts.tab,
      oid: opts.ownerId,
      offset: opts.offset
    }, opts.preload);

    box.setOptions({width: opts.intro ? 630 : 620, bodyStyle: opts.intro ? 'padding: 0px' : 'margin-top: 50px', onShow: function() {
      if (cur.fnbxWasScroll) {
        boxLayerWrap.scrollTop = cur.fnbxWasScroll;
        cur.fnbxWasScroll = false;
      }
      addEvent(boxLayerWrap, 'scroll', FansBox.onScroll);
      setTimeout(FansBox.onScroll, 0);
    }, onHide: function() {
      removeEvent(boxLayerWrap, 'scroll', FansBox.onScroll);
      hide(cur.lSTL);
      cur.lSTLShown = 0;
      if (opts.onHide) {
        opts.onHide();
      }
    }});

    if (!box.tbDeinit) {
      extend(box, {
        tbDeinit: function() {
          cur.fnbxOwnerId = cur.fnbxOffsets = cur.fnbxPhShown = false;
          re(cur.lSTL);
          removeEvent(boxLayerWrap, 'scroll', FansBox.onScroll);
        },
        tbcShowProgress: function() {
          hide('fans_idol_search');
          if (cur.fnbxSearchLink) hide(cur.fnbxSearchLink);
        },
        tbcOnLoad: function() {
          if (curBox().tbVis == 'idols') {
            if (ge('fans_rowsidols') && ge('fans_rowsidols').childNodes.length > 10) {
              show('fans_idol_search');
              var oid = cur.fnbxOwnerId;
              if (!cur.fnbxIdolsList[oid]) {
                cur.fnbxIdolsList[oid] = 'loading';
                ajax.post(cur.fnbxPage, {act: 'load_idols', oid: oid}, {onDone: function(result) {
                  if (!cur.fnbxIdolsList) return;

                  var rf = (cur.fnbxIdolsList[oid] == 'update'), upd = rf || (cur.fnbxIdolsList[oid] == 'more');
                  cur.fnbxIdolsCache[oid] = {all: []};
                  var processed = cur.fnbxIdolsProcessed;
                  for (var i = 0, count = result.length; i < count; ++i) {
                    if (processed[result[i][0]] !== undefined) {
                      result[i][1] = processed[result[i][0]];
                    }
                    cur.fnbxIdolsCache[oid].all.push(i);
                  }
                  cur.fnbxIdolsList[oid] = result;

                  cur.fnbxIdolsIndex[oid] = new vkIndexer(cur.fnbxIdolsCache[oid].all, function(obj) {
                    return cur.fnbxIdolsList[oid][obj][2];
                  }, upd ? function() {
                    if (cur.fnbxOwnerId == oid && curBox().tbId == cur.fnbxId && curBox().tbVis == 'idols') {
                      FansBox.moreIdols(rf);
                    }
                  } : function() {});
                }});
              } else if (cur.fnbxIdolsQuery) {
                FansBox.moreIdols(true);
              }
            }
          } else {
            hide('fans_idol_search');
            if (cur.fnbxSearchLink) show(cur.fnbxSearchLink);
          }
        }
      });
      addEvent(boxLayerWrap, 'scroll', FansBox.onScroll);
    }

    placeholderSetup('fans_idol_search_inp', {back: true});
    box.tbcOnLoad();

    if (cur.fnbxLoaded) cur.fnbxLoaded();
    onBodyResize();
    FansBox.onScroll();
  },
  getHighlight: function(q) {
    var indxr = cur.fnbxIdolsIndex[cur.fnbxOwnerId], delimiter = indxr.delimiter, trimmer = indxr.trimmer;

    q += ' ' + (parseLatin(q) || '');
    q = escapeRE(q).replace(/&/g, '&amp;');
    q = q.replace(trimmer, '').replace(delimiter, '|');
    return {
      re: new RegExp('(' + q + ')', 'gi'),
      val: '<span class="fans_row_highlight">$1</span>'
    }
  },
  moreIdols: function(force) {
    var oid = cur.fnbxOwnerId, list = cur.fnbxIdolsList[oid];
    if (curBox().tbId != cur.fnbxId) return;

    if (!list || list == 'loading' || list == 'update' || list == 'more') {
      if (list == 'loading') cur.fnbxIdolsList[oid] = 'more';
      return;
    }

    var list = cur.fnbxIdolsCache[oid].all, q = trim(val('fans_idol_search_inp'));
    toggle('fans_reset_search', !!q);

    if (!isVisible('fans_idol_search')) {
      q = '';
    }

    var refresh = (force || q != cur.fnbxIdolsQuery), highlight = false;
    cur.fnbxIdolsQuery = q;
    if (q) {
      list = cur.fnbxIdolsCache[oid]['_' + q];
      if (list === undefined) {
        var tmp = cur.fnbxIdolsIndex[oid].search(q), mp = {};
        list = [];
        for (var i = 0, l = tmp.length; i < l; ++i) {
          if (!mp[tmp[i]]) {
            mp[tmp[i]] = true;
            list.push(tmp[i]);
          }
        }
        list.sort(function(a,b){return a-b;});
        cur.fnbxIdolsCache[oid]['_' + q] = list;
      }
      highlight = FansBox.getHighlight(q);
    }

    var len = list.length, cont = ge('fans_rowsidols'), more = ge('fans_more_linkidols');
    if (!len) {
      hide(more);
      val(cont, FansBox.genIdolEmpty(val('fans_idol_search_inp')));
      return;
    }

    var start = refresh ? 0 : cont.childNodes.length, end = Math.min(len, start + 32), html = [];
    for (var i = start; i < end; ++i) {
      var row = cur.fnbxIdolsList[oid][list[i]], name = row[2];
      if (!row) continue;
      row = FansBox.genIdolRow(row, highlight ? name.replace(highlight.re, highlight.val) : name);
      if (refresh) {
        html.push(row);
      } else {
        cont.appendChild(se(row));
      }
    }
    if (refresh) {
      val(cont, html.join(''));
      curBox().tbToTop();
    }
    toggle(more, end < len);
  },
  genIdolEmpty: function(q) {
    var lnk = '<a href="/search?c[section]=groups&c[q]=' + encodeURIComponent(q) + '">';
    var text = trim(q) ? (getLang('fans_idols_not_found') + '<br><br>' + getLang('groups_you_can_find').replace('{term}', lnk + clean(q) + '</a>').replace('{link}', lnk).replace('{/link}', '</a>')) : getLang('fans_no_idols');
    return '<div class="fans_no_rows">' + text + '</div>';
  },
  genIdolRow: function(row, name) {
    var oid = row[0], evs = row[6] ? ' onmouseover="FansBox.bigphOver(this, ' + oid + ')"' : '', href = '/' + (row[4] ? row[4] : (oid > 0 ? 'id' + oid : 'public' + (-oid))), photo = row[3], size = getLang('public_N_followers', row[5], true), non = ' style="display: none"', status = row[7].length ? row[7] : getLang(oid > 0 ? 'profile_own_profile' : 'groups_type_public'), btns = vk.id && vk.id != oid;
    var feed_act = row[8] ? '<a onclick="FansBox.feedToggle(this, ' + oid + ')">'+getLang('public_feedunblock')+'</a>' : '';
    return ['\
<div class="fans_idol_row inl_bl">\
  <div class="fans_idolph_wrap fl_l"', evs, '>\
    <a class="fans_idol_ph" href="', href, '">\
      <img class="fans_idol_img" src="', photo, '" />\
    </a>\
  </div>\
  <div class="fans_idol_info fl_l">\
    <div class="fans_idol_name"><a class="fans_idol_lnk" href="', href, '">', name, '</a></div>\
    <div class="fans_idol_status">', status, '</div><div class="fans_idol_size">', size, '</div>\
    <div id="fans_idol_sub', oid, '" class="button_blue fans_idol_sub"', ((row[1] || !btns) ? non : ''), '>\
      <button onclick="FansBox.subscribe(this, ', oid, ')">', getLang('public_subscribe'), '</button>\
    </div>\
    <div id="fans_idol_feedact', oid, '" class="fans_idol_space"', (row[1] && btns ? '' : non), '>', feed_act,'</div>\
    <div id="fans_idol_unsub', oid, '" class="fans_idol_unsub"', (row[1] && btns ? '' : non), '>\
      <a onclick="FansBox.unsubscribe(this, ', oid, ')">', getLang('public_unsubscribe'), '</a>\
    </div>\
  </div>\
</div>'].join('');
  },

  resetSearch: function() {
    val('fans_idol_search_inp', '');
    FansBox.moreIdols(true);
    setTimeout(elfocus.pbind('fans_idol_search_inp'), 0);
  },
  more: function() {
    var t = curBox().tbCur;
    if (t == 'idols') return FansBox.moreIdols();
    if (isVisible('fans_more_prg' + t)) return;
    ajax.post(cur.fnbxPage, {act: cur.fnbxAct || 'box', tab: t, oid: cur.fnbxOwnerId, offset: cur.fnbxOffsets[t]}, {
      onDone: function(rows, newOffset, needMore) {
        var el = ce('div', {innerHTML: rows}), cnt = ge('fans_rows' + t);
        if (!cnt) return;

        for (var e = domFC(el); e; e = domFC(el)) {
          cnt.appendChild(e);
        }
        cur.fnbxOffsets[t] = newOffset;
        if (needMore) {
          FansBox.preload();
        } else {
          hide('fans_more_link' + t);
        }
      }, showProgress: function() {
        hide('fans_more_link' + t);
        show('fans_more_prg' + t);
      }, hideProgress: function() {
        show('fans_more_link' + t);
        hide('fans_more_prg' + t);
      }, cache: 1
    });
    cur.fnbxAutoload = true;
  },
  preload: function() {
    var t = curBox().tbCur;
    ajax.post(cur.fnbxPage, {act: cur.fnbxAct || 'box', tab: t, oid: cur.fnbxOwnerId, offset: cur.fnbxOffsets[t]}, {
      cache: 1
    });
  },
  markSubsc: function(oid, v) {
    cur.fnbxIdolsProcessed[oid] = v;
    var lst = cur.fnbxIdolsList[cur.fnbxOwnerId];
    if (lst && lst.length) {
      for (var i = 0, l = lst.length; i < l; ++i) {
        if (lst[i][0] == oid) {
          cur.fnbxIdolsList[cur.fnbxOwnerId][i][1] = v;
          break;
        }
      }
    }
  },

  subscribe: function(el, oid) {
    ajax.post('al_feed.php', {act: 'subscr', oid: oid, hash: cur.fnbxHash}, {
      onDone: function() {
        hide('fans_idol_sub' + oid);
        show('fans_idol_unsub' + oid);
        show('fans_idol_feedact' + oid);
        if (cur.fnbxOwnerId == vk.id) {
          FansBox.recache(1);
        }
        FansBox.markSubsc(oid, 1);
      },
      showProgress: lockButton.pbind(el),
      hideProgress: unlockButton.pbind(el)
    });
  },
  blacklistTip: function(el) {
    showTooltip(el, {
      text: getLang('fans_block_fan'),
      shift: [13, 1, 1],
      black: 1
    });
  },
  blacklist: function(el, oid, ev) {
    if (el.tt && el.tt.destroy) el.tt.destroy();
    cur.fnbxWasScroll = boxLayerWrap.scrollTop;
    showBox(cur.fnbxPage, {act: 'block', oid: oid});
    return cancelEvent(ev);
  },
  unsubscribe: function(el, oid) {
    ajax.post(cur.fnbxPage, {act: 'unsub', oid: oid, hash: cur.fnbxHash, from: 'box'}, {
      onDone: function() {
        show('fans_idol_sub' + oid);
        hide('fans_idol_unsub' + oid);
        hide('fans_idol_feedact' + oid);
        if (cur.fnbxOwnerId == vk.id) {
          FansBox.recache(-1);
        }
        FansBox.markSubsc(oid, 0);
      },
      showProgress: function() {
        hide(el);
        show(domNS(el) || domPN(el).appendChild(ce('span', {className: 'progress_inline fans_idol_unsub_p'})));
      },
      hideProgress: function() {
        show(el);
        re(domNS(el));
      }
    })
  },
  feedToggle: function(el, oid) {
    ajax.post(cur.fnbxPage, {act: 'feedtgl', oid: oid, hash: cur.fnbxHash, from: 'box'}, {
      onDone: function(val, str) {
        el.innerHTML = str;
        if (cur.fnbxOwnerId == vk.id) {
          FansBox.recache(-1);
        }
        var lst = cur.fnbxIdolsList[cur.fnbxOwnerId];
        if (lst && lst.length) {
          for (var i = 0, l = lst.length; i < l; ++i) {
            if (lst[i][0] == oid) {
              cur.fnbxIdolsList[cur.fnbxOwnerId][i][0] = val;
              break;
            }
          }
        }
      },
      showProgress: function() {
        el.innerHTML = '<span class="progress_inline"></span>';
      }
    });
  },
  lSTLDown: function(e) {
    e = e || window.event;
    if (checkEvent(e)) return;

    if (!__afterFocus) {
      var to = 0, st = boxLayerWrap.scrollTop;
      if (cur.lSTLWasSet && cur.lSTLWas) {
        to = cur.lSTLWas;
        cur.lSTLWas = 0;
      } else {
        cur.lSTLWas = st;
      }
      boxLayerWrap.scrollTop = to;
/*      var diff = st - to;
      if (Math.abs(diff) > 6) {
        boxLayerWrap.scrollTop = (to + (diff > 0 ? 6 : -6));
      }
      setTimeout(function() {
        animate(boxLayerWrap, {scrollTop: to, transition: Fx.Transitions.easeInCirc}, 100);
      }, 0);/**/
    }
    return cancelEvent(e);
  },
  onScroll: function() {
    var st = boxLayerWrap.scrollTop, mx = 200, vis = cur.lSTLWas || (st > mx), o = 0;
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
    if (!cur.fnbxAutoload) return;
    var bt = lastWindowHeight, objMore = ge('fans_more_link' + curBox().tbCur);
    if (isVisible(objMore) && (bt > getXY(objMore, true)[1])) {
      objMore.click();
    }
  },
  recache: function(d) {
    cur.fnbxOffsets[curBox().tbCur] += d;
    for (var i in ajaxCache) {
      if (i.match(new RegExp('^\\/' + cur.fnbxPage + '\\#act=' + (cur.fnbxAct || 'box'), ''))) {
        delete(ajaxCache[i]);
      }
    }
  },
  remove: function(oid) {
    re('fans_fan_row' + oid);
    FansBox.recache(-1);
    FansBox.onScroll();
    if (!domFC(ge('fans_rowsfans'))) {
      oid = cur.fnbxOwnerId;
      curBox().hide();
      showBox(cur.fnbxPage, {act: cur.fnbxAct || 'box', tab: 'fans', oid: oid});
    }
  },

  bigphOver: function(obj, uid) {
    if (!cur.lang || !cur.lang.global_photo_full_size || !cur.fnbxPhShown || browser.mobile) return;
    var o = obj.firstChild, ch = cur.fnbxPhCache[uid];
    if (o.tagName != 'A' || o.className != 'fans_fanph') {
      (o = obj.insertBefore(ce('a', {className: 'fans_fanph', href: ch && ch._id ? ('/photo' + ch._id + '?all=1') : ('/albums' + uid), innerHTML: '<span class="fans_fanph_label">' + getLang('global_photo_full_size') + '</span>'}), obj.firstChild)).onclick = FansBox.bigphClick.pbind(uid);
      o._uid = uid;
    }

    clearTimeout(o.hideTO);
    animate(o, {marginTop: 75}, {duration: 200, transition: Fx.Transitions.easeOutCirc});
    cur.fnbxPhShown[uid] = o;

    if (!obj.onmouseout) obj.onmouseout = FansBox.bigphOut.pbind(obj);
  },
  bigphOut: function(obj) {
    var o = obj.firstChild;
    if (!o || o.tagName != 'A' || o.className != 'fans_fanph') return;

    clearTimeout(o.hideTO);
    o.hideTO = setTimeout(function() {
      animate(o, {marginTop: 100}, 200);
      delete(cur.fnbxPhShown[o._uid]);
    }, 150);
  },
  bigphClick: function(uid, ev) {
    if (checkEvent(ev) !== false) return;

    var ch = cur.fnbxPhCache[uid], t = curBox().tbCur, o = cur.fnbxPhShown[uid], obj = domPN(o);
    if (!o || !obj) return;
    if (ch === undefined) {
      ch = cur.fnbxPhCache[uid] = 'show';
      ajax.post('al_photos.php', {act: 'fast_get_photo', oid: uid}, {onDone: function(res) {
        if (!res) {
          obj.onmouseover = function() {};
          re(o);
          return;
        }
        var sh = (cur.fnbxPhCache[uid] == 'show');
        cur.fnbxPhCache[uid] = res;
        o.href = '/photo' + res._id + '?all=1';
        if (sh) FansBox.bigphClick(uid);
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

    for (var i in cur.fnbxPhShown) {
      animate(cur.fnbxPhShown[i], {marginTop: 100}, 0);
    }
    cur.fnbxPhShown = false;
    extend(cur, {
      fnbxBack: {
        tab: t,
        initial: curBox().tbInitial,
        oid: cur.fnbxOwnerId,
        offsets: cur.fnbxOffsets,
        scroll: boxLayerWrap.scrollTop,
        query: cur.fnbxIdolsQuery,
        vis: isVisible('fans_more_link' + t) || isVisible('fans_more_prg' + t),
        cont: ge('fans_rows' + t)
      }
    });
    extend(ch, {
      jumpTo: {z: 'albums' + uid},
      onHide: function() {
        cur.fnbxLoaded = function() {
          var t = curBox().tbVis, cont = ge('fans_rows' + t), s = cur.fnbxBack.scroll;
          if (t != cur.fnbxBack.tab) {
            curBox().tbTab(cur.fnbxBack.tab);
            return;
          }
          extend(cur, {
            fnbxOffsets: cur.fnbxBack.offsets,
            fnbxIdolsQuery: cur.fnbxBack.query
          });
          domPN(cont).replaceChild(cur.fnbxBack.cont, cont);
          toggle('fans_more_link' + t, !!cur.fnbxBack.vis);
          hide('fans_more_prg' + t);
          cur.fnbxLoaded = cur.fnbxBack = false;

          boxLayerWrap.scrollTop = s;
          val('fans_idol_search_inp', cur.fnbxIdolsQuery);
          if (t == 'idols' && cur.fnbxIdolsQuery) {
            elfocus('fans_idol_search_inp');
            show('fans_reset_search');
          }
          setTimeout(function() { boxLayerWrap.scrollTop = s; onBodyResize(); FansBox.onScroll(); }, 0);
        }
        showBox(cur.fnbxPage, {act: cur.fnbxAct || 'box', tab: cur.fnbxBack.initial, oid: cur.fnbxBack.oid}, {cache: 1});
      }
    });
    cur.fnbxAutoload = false;
    return showPhoto(ch._id, 'album' + uid + '_0/rev', ch, ev);
  }
};

try{stManager.done('fansbox.js');}catch(e){}
