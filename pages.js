var Pages = {

init: function(curExtend) {
  cur.module = 'pages';
  cur.contentCache = {};
  extend(cur, curExtend);
  cur.nav.push((function(changed, old, n) {
    if (changed[0] === undefined && changed['section']) {
      this.switchSection(n['section'], changed, old, n);
      return false;
    }
  }).bind(this));
},

switchTab: function(tab, ev, params) {
  if (ev && (ev.button == 2 || ev.ctrlKey)) {
    return false;
  }
  var el = ge('tab_' + tab);
  if (el) {
    var tabs = geByClass('active_link', ge('pages_tabs'));
    for (var i in tabs) {
      removeClass(tabs[i], 'active_link');
    }
    addClass(el, 'active_link');
  }
  show('pages_progress');
  hide('pages_right_link');
  nav.change(extend({section: tab}, params));
  return false;
},

switchSection: function(section, changed, old, n, draft) {
  if (section == 'history') {
    delete n.hid;
    delete n.hid2;
  }
  var params = clone(n);
  extend(params, {section: section, act: 'edit', load: 1});
  if (cur.page) {
    params['page'] = cur.page;
  } else {
    params['oid']  = cur.oid;
    params['id'] = cur.pid;
  }

  var curSection = nav.objLoc.section;
  if (!curSection) {
    if (isVisible('pages_cont_cache_source')) {
      curSection = 'source';
    } else if (isVisible('pages_cont_cache_edit')) {
      curSection = 'edit';
    } else {
      curSection = 'view';
    }
    old.section = curSection;
  }

  var wrap = ge('pages_wrap');
  var childs = wrap.childNodes;
  var cacheId = 'pages_cont_cache_' + section;
  var callback = function() {
    ge('pages').className = 'pages_section_'+section;
    Pages.hideError();
    var loc = extend(n, {section: section})
    nav.setLoc(loc);
    return;
  }

  var cache = ge(cacheId);

  if (draft) {
    params['draft'] = 1;
  } else if (cache) {
    for (var i in childs) {
      hide(childs[i]);
    }
    show(cache);
    callback();

    if (section != 'view') {
      hide('pages_progress');
      show('pages_right_link');
      return;
    }
  }

  /*if ((section == 'edit' || section == 'view') && curSection == 'source') {
    params['Body'] = ge('pages_body_source').value;
    params['draft'] = 1;
  }*/
  if ((section == 'source' || section == 'view') && (curSection == 'edit' || curSection == 'source')) {
    if (section != 'source') {
      //params['Body'] = cur.editor.convertToWiki();
      params['Body'] = cur.editor.val();
    }
    params['draft'] = 1;
  }
  ajax.post('al_pages.php', params, {
    onDone: function(content, script, info) {
      hide('pages_progress');
      hide('pages_bottom_preview');
      show('pages_right_link');
      if (curSection != (old.section || 'view')) {
        return;
      }
      for (var i in childs) {
        hide(childs[i]);
      }
      if (cache) {
        cache.innerHTML = content;
        show(cache);
      } else {
        wrap.appendChild(ce('div', {
          id: cacheId,
          className: 'pages_cont_cache',
          innerHTML: content
        }));
      }

      if (script) eval(script);
      return callback();
    },
    onFail: Pages.showError
  });
},


pageAccess: function(layer) {
  var c = (layer) ? wkcur : cur;
  showBox('al_pages.php', {act: 'page_access', id: c.pid, oid: c.oid}, {
  });
},

viewVersion: function(hid) {
  re('pages_cont_cache_edit');
  re('pages_cont_cache_source');
  return Pages.switchTab('view', event, {hid: hid});
},

compare: function(hid) {
  var row = ge('pages_row'+hid);
  var obj = Array.prototype.slice.apply(geByClass('pages_diff'+hid, row));
  var obj2 = geByClass1('pages_diff'+hid, ge('pages_compare_cont'));
  if (obj2) {
    obj.push(obj2);
  }
  if (hasClass(row, 'pages_compare')) {
    for (var i in obj) {
      obj[i].innerHTML = cur.lang['pages_compare'];
    }
    removeClass(row, 'pages_compare');
    if (cur.compare2 === undefined) {
      Pages.disableCompare();
      slideUp('pages_compare_cont', 100);
      delete cur.compare1;
    } else {
      if (hid == cur.compare2) {
        ge('pages_compare2').innerHTML = cur.compareEmptyCont;
        Pages.disableCompare();
        delete cur.compare2;
      } else {
        ge('pages_compare1').innerHTML = ge('pages_compare2').innerHTML;
        ge('pages_compare2').innerHTML = cur.compareEmptyCont;
        cur.compare1 = cur.compare2;
        Pages.disableCompare();
        delete cur.compare2;
      }
    }
  } else {
    for (var i in obj) {
      obj[i].innerHTML = cur.lang['pages_cancel2'];
    }
    addClass(row, 'pages_compare');
    if (cur.compare1 === undefined) {
      cur.compare1 = hid;
      ge('pages_compare1').innerHTML = row.innerHTML;
      slideDown('pages_compare_cont', 100);
      Pages.disableCompare();
    } else {
      if (cur.compare2 !== undefined) {
        Pages.compare(cur.compare2);
      }
      if (!cur.compareEmptyCont) {
        cur.compareEmptyCont = ge('pages_compare2').innerHTML;
      }
      cur.compare2 = hid;
      ge('pages_compare2').innerHTML = row.innerHTML;
      Pages.enableCompare();
    }
  }
},

compareView: function() {
  /*if (cur.compare1 > cur.compare2) {*/
    var hid = cur.compare1;
    var hid2 = cur.compare2;
  /*} else {
    var hid = cur.compare2;
    var hid2 = cur.compare1;
  };*/
  return Pages.switchTab('view', false, {hid: hid, hid2: hid2});
},


disableCompare: function() {
  if (!cur.compareDisabler) {
    cur.compareDisabler = ge('pages_compare_disabler');
    cur.compareButton = ge('pages_compare_button');
    var size = getSize(cur.compareButton);
    setStyle(cur.compareDisabler, {width: size[0]+'px', height: size[1]+'px'});
  }
  show(cur.compareDisabler);
},

enableCompare: function() {
  hide(cur.compareDisabler);
},


showError: function(error) {
  if (!error) {
    error = 'Check Internet connection';
  }
  hide('pages_progress');
  show('pages_right_link');
  var editError = ge('pages_error');
  show(ge('pages_error_wrap'));
  cur.errorShown = true;
  editError.innerHTML = error;
  scrollToTop(200);
  return true;
},

hideError: function() {
  if (cur.errorShown) {
    hide('pages_error_wrap');
    cur.errorShown = false;
  }
},

onScroll: function(resize) {
  var y = scrollGetY();
  var panel = ge('pages_buttons_panel');
  if (!panel) return;
  var py = getXY(ge('pages_buttons_cont'))[1];
  if (!cur.bottomSize) {
    cur.bottomSize = getSize(panel);
  }

  var ph = cur.bottomSize[1];

  var wndHeight = window.innerHeight || document.documentElement.clientHeight;

  if (resize && !cur.fixedBottom && wndHeight - ph < py + 20) {
    scrollToY(y + py + 20 - (wndHeight - ph), 0);
  } else if (wndHeight - ph + y < py) {
    if (!cur.fixedBottom || resize) {
      cur.fixedBottom = true;
      setStyle(panel, {
        position: 'fixed',
        top: (wndHeight - ph) + 'px'
      });
      addClass(panel, 'pages_panel_fixed');
    }
  } else {
    if (cur.fixedBottom || resize) {
      cur.fixedBottom = false;
      setStyle(panel, {
        position: 'static',
        top: '0px'
      });
      removeClass(panel, 'pages_panel_fixed');
    }
  }

  if (resize && cur.fixedBottom) {
    setStyle(panel, {left: getXY(ge('pages_cont_cache_edit'))[0]+'px'})
  }

  if (!cur.editorLayer) {
    cur.editorLayer = ge('wke_buttons_cont');
  }

  var bottomPos = y + ph - 14;
  if (py < bottomPos) {
    setStyle(ge('wke_buttons'), {top: py - bottomPos});
    hide('pages_top_toolbox_shadow');
    cur.hiddenTop = true;
  } else {
    if (cur.hiddenTop) {
      setStyle(ge('wke_buttons'), {top: 0});
      show('pages_top_toolbox_shadow');
      cur.hiddenTop = false;
    }
  }
  var pos = getXY(cur.editorLayer);
  if (y > pos[1]) {
    if (!cur.fixedTop) {
      cur.fixedTop = true;
      addClass(ge('pages_cont_cache_edit'), 'pages_top_fixed');
      cur.editor.floatPanel = true;
    }
  } else {
    if (cur.fixedTop) {
      cur.fixedTop = false;
      removeClass(ge('pages_cont_cache_edit'), 'pages_top_fixed');
      cur.editorLayer.style.paddingTop = '0px';
      cur.editor.floatPanel = false;
    }
  }
},

saveInfo: function(from) {
  var curSection = nav.objLoc.section;
  if (!curSection) {
    if (isVisible('pages_cont_cache_edit')) {
      curSection = 'edit';
    } else {
      curSection = 'view';
    }
  }
  var body = cur.editor.val();
  if (!body) {
    return false;
  }
  var params = {
    act: 'save',
    page: cur.page,
    oid: cur.oid,
    id: cur.pid,
    hash: cur.hash,
    'Body': body,
    plain: cur.editor.plainMode ? 1 : 0,
    view: (from == 'wysiwyg') ? 2 : 1
  }
  var titleEl = ge('pages_edit_title');
  if (titleEl) {
    params['title'] = titleEl.value;
  }
  Pages.draftCancel();
  ajax.post('al_pages.php', params, {
    onDone: function(text) {
      var saveEl = ge('pages_save_info_'+from);
      saveEl.innerHTML = text;
      show(saveEl);
      hide('pages_preview_'+curSection+'_link');
      setTimeout(function() {
        fadeOut(saveEl, 200, function() {
          fadeIn(ge('pages_preview_'+curSection+'_link'), 200);
        });
      }, 1500);

      Pages.hideError();

      if (nav.objLoc.hid) {
        var loc = clone(nav.objLoc);
        delete loc.hid;
        delete loc.hid2;
        nav.setLoc(loc);
        hide(geByClass1('pages_info_line', ge('pages_cont_cache_'+(nav.objLoc.section || 'view'))));
      }

      Pages.clearCache();
    },
    showProgress: function() {
      lockButton(ge('pages_save_'+from));
    },
    hideProgress: function() {
      unlockButton(ge('pages_save_'+from));
    },
    onFail: Pages.showError
  })
},

clearCache: function() {
  var childs = ge('pages_wrap').childNodes;
  for (var i in childs) {
    if (childs[i].className == 'pages_cont_cache' && !isVisible(childs[i])) {
      re(childs[i]);
    }
  }
},

getScrollWidth: function() {
  if (!window.scrollbarWidth) {
    text = ce('div', {innerHTML: '<div style="height:200px;">1<br/>1<br/>1<br/>1<br/></div>'}, {
      overflowY: 'scroll',
      position: 'absolute',
      height: '100px',
      width: '100px'
    });
    var body = geByTag('BODY')[0];
    body.appendChild(test);
    window.scrollbarWidth = test.offsetWidth - geByTag('div', test)[0].offsetWidth - 1;
    body.removeChild(test);
    delete test;
  }
},

revert: function(data, obj) {
  obj.innerHTML = '<img src="/images/upload.gif" />';
  ajax.post('al_pages.php', extend(data, {act: 'revert', page: cur.page, hash: cur.hash}), {
    onDone: function(res) {
      if (parseInt(res) == -1) {
        return re(obj);
      } else {
        nav.reload();
      }
    }
  });
},

banUser: function(data, obj, page, hash) {
  obj.innerHTML = '<img src="/images/upload.gif" />';
  var unban = hasClass(obj, 'banned') ? 1 : 0;
  ajax.post('al_pages.php', extend(data, {
    act: 'ban_user',
    page: page || cur.page,
    hash: hash || cur.hash,
    unban: unban
  }), {
    onDone: function(text) {
      obj.innerHTML = text;
      addClass(obj, 'banned');
      if (unban) {
        removeClass(obj, 'banned');
      } else {
        addClass(obj, 'banned');
      }
    }
  });
},

wysiwygInit: function(options) {
  if (browser.ipod || browser.ipad || browser.iphone) return;
  this.getScrollWidth();
  var simpleToolBar = 'bold,italic,gray,underline,strike,sub,sup,left,center,right,marker_list,numeric_list,outdent,indent,h1,h2,h3,image,link,unlink';
  var extendedToolBar = 'bold,italic,gray,underline,strike,sub,sup,left,center,right,marker_list,numeric_list,outdent,indent,pre,h1,h2,h3,image,break,';
  extendedToolBar += 'table,table_delete,insert_row_before,insert_row_after,insert_col_before,insert_col_after,delete_row,delete_col,col_width,link,unlink,citate,character,video,audio,doc,hider';
  var editorParams = extend({
    editorName: 'pageWysiwyg',
    replaceElemID: 'pages_html',
    contentCSS: '/css/al/wysiwyg.css',
    html: ge('pages_html').value,
    wiki: ge('pages_body') ? ge('pages_body').value : '',
    height: 326,
    simpleToolBar: simpleToolBar,
    extendedToolBar: extendedToolBar,
    defaultMode: 'simple',
    skinFile: 'pages',
    photoMinSize: { w: 50, h: 50 },
    photoMaxSize: { w: 500, h: 400 },
    userID: 0,
    userName: '',
    groupID: 0,
    debug: false,
    onChange: function() {
      Pages.draftChanged(false, true);
    }
  }, options || {});

  if (options && options.layer) {
    editorParams.onHeightChange = function() {
      WkView.onScroll();
    }
  }

  window.editorName = editorParams.editorName;
  var editor = window[editorParams.editorName] = new Wysiwyg(editorParams);
  if (options && options.layer) {
    wkcur.editor = editor;
  } else {
    cur.editor = editor;
  }
},

_animDelX: function(aid, opacity, set_active) {
  var el = ge('pages_delete_row' + aid);
  if (!el) return;
  if (set_active !== undefined) {
    el.active = set_active;
  } else if (el.active) {
    return;
  }
  animate(el, {opacity: opacity}, 200);
},

rowActive: function(nid, tt) {
  Pages._animDelX(nid, 1, 1);
  if (tt) showTooltip(ge('pages_delete_row' + nid), {text: tt, showdt: 500});
},

rowInactive: function(nid) {
  Pages._animDelX(nid, 0.5, 0);
},

rowOver: function(nid) {
  Pages._animDelX(nid, 0.5);
},

rowOut: function(nid) {
  Pages._animDelX(nid, 0);
},

deleteNotification: function(nid, hash) {
  var row = ge('pages_notification'+nid);
  //cur['restore'+nid] = row.innerHTML;
  ajax.post('al_pages.php', {act: 'a_delete_notification', nid: nid, hash: hash}, {
    onDone: function(text) {
      row.innerHTML = text;
    },
    showProgress: function() {
      setStyle(row, {opacity: 0.5});
    },
    hideProgress: function() {
      setStyle(row, {opacity: 1});
    }
  })
},

preview: function() {
  var curSection = nav.objLoc.section;
  if (!curSection) {
    if (isVisible('pages_cont_cache_source')) {
      curSection = 'source';
    } else if (isVisible('pages_cont_cache_edit')) {
      curSection = 'edit';
    } else {
      curSection = 'view';
    }
  }
  if (curSection == 'edit') {
    var body = cur.editor.val();
  }
  /*if (curSection == 'source') {
    var body = ge('pages_body_source').value;
  }*/

  var prevBtn = ge('pages_preview_'+curSection+'_link');
  if (!cur.previewTextBackup) {
    cur.previewTextBackup = prevBtn.innerHTML;
  }
  prevBtn.innerHTML = '<img src="/images/upload.gif" />';

  ajax.post('al_pages.php', {Body: body,  act: 'edit', id: cur.pid, oid: cur.oid, section: 'view', 'load': 1}, {
    onDone: function(content, js, info) {
      prevBtn.innerHTML = cur.previewTextBackup;
      var prev = ge('pages_bottom_preview');
      show(prev);
      prev.innerHTML = content;
      scrollToY(getXY(prev)[1] - 45);
    },
    onFail: function() {
      prevBtn.innerHTML = cur.previewTextBackup;
      hide('pages_bottom_preview');
    }
  });
},

isWysiwyg: function() {
  var curSection = nav.objLoc.section;
  return curSection ? (curSection == 'edit') : isVisible('pages_cont_cache_edit');
},

initDraft: function() {
  var textfield = ge('pages_body');
  cur.destroy.push(function() {
    clearTimeout(cur.draftTimeout);
    if (Pages.isWysiwyg()) {
      Pages.saveDraft(cur.editor.convertToWiki(true));
    } else {
      Pages.saveDraft(val('pages_body_source'));
    }
  });
},

draftChanged: function(val, wysiwyg, force) {
  clearTimeout(cur.draftTimeout);
  cur.draftTimeout = setTimeout(function() {
    if (!val && wysiwyg) {
      val = cur.editor.val();
    }
    Pages.saveDraft(val);
  }, 5000);
},

saveDraft: function(val) {
  if (val == cur.lastSavedWiki) return;
  var draftCont = geByClass('pages_draft_info', ge('pages_wrap'))[0];
  if (draftCont && isVisible(draftCont)) return;
  var params = {
    act: 'save_draft',
    page: cur.page,
    oid: cur.oid,
    id: cur.pid,
    hash: cur.drafthash,
    'Body': val
  }
  cur.lastSavedWiki = val;
  ajax.post('al_pages.php', params, {
    onFail: function() {
      return true;
    }
  });
},

draftCancel: function(save) {
  var draftCont = geByClass('pages_draft_info', ge('pages_wrap'));
  if (draftCont) {
    for (var i in draftCont) {
      if (isVisible(draftCont[i])) {
        slideUp(draftCont[i], 100);
      } else {
        hide(draftCont[i]);
      }
    }
  }
  if (save) {
    var params = {
      act: 'clear_draft',
      page: cur.page,
      oid: cur.oid,
      id: cur.pid,
      hash: cur.drafthash
    }
    ajax.post('al_pages.php', params);
  }
},

restoreDraft: function(btn) {
  lockButton(btn);
  Pages.switchSection(nav.objLoc.section, {}, nav.objLoc, nav.objLoc, true);
},

applyVersion: function(hid, oid, pid, mid, hash, obj, callback) {
  var params = {
    act: 'apply_version',
    oid: oid,
    pid: pid,
    hid: hid,
    hash: hash,
    mid: mid
  }
  ajax.post('al_pages.php', params, {
    onDone: function(text) {
      if (callback) return callback(pid, text);
      obj.innerHTML = '<img src="/images/upload.gif"/>';
      var loc = clone(nav.objLoc)
      delete loc.hid;
      nav.go(loc);
    },
    showProgress: function() {
      if (!cur.applyVersionCont) {
        cur.applyVersionCont = obj.innerHTML;
      }
      obj.innerHTML = '<img src="/images/upload.gif"/>';
    },
    hideProgress: function() {
      if (cur.applyVersionCont) {
        obj.innerHTML = cur.applyVersionCont;
      }
    }
  })
},

versionApplied: function(pid, text) {
  var obj = ge('pages_notification'+pid);
  obj.innerHTML = text;
},

abuseBox: function(oid, pid, hash) {
  showBox('al_pages.php', {
    act: 'report_box',
    oid: oid,
    pid: pid,
    hash: hash
  });
},

actReport: function(report_id, hash, obj, act) {
  ajax.post('al_pages.php', {
    act: act,
    report_id: report_id,
    hash: hash
  }, {
    onDone: function(text) {
      var obj = ge('pages_abuse'+report_id);
      obj.innerHTML = text;
    },
    showProgress: function() {
      if (obj.tagName == 'BUTTON') return lockButton(obj);
      if (!cur.applyVersionCont) {
        cur.applyVersionCont = obj.innerHTML;
      }
      obj.innerHTML = '<img src="/images/upload.gif"/>';
    },
    hideProgress: function() {
      if (obj.tagName == 'BUTTON') return unlockButton(obj);
      if (cur.applyVersionCont) {
        obj.innerHTML = cur.applyVersionCont;
      }
    }
  });
},

sendReport: function(oid, pid, hid, hid2, mid, hash, obj) {
  ajax.post('al_reports.php', {
    act: 'report',
    item_type: 5,
    oid: oid,
    pid: pid,
    place_id: hid,
    hid: hid,
    hid2: hid2,
    hash: hash,
    type: 4,
    item_id: mid,
    comment: ''
  }, {
    onDone: function(text) {
      obj.parentNode.innerHTML = text;
    },
    showProgress: function() {
      if (!cur.applyVersionCont) {
        cur.applyVersionCont = obj.innerHTML;
      }
      obj.innerHTML = '<img src="/images/upload.gif"/>';
    },
    hideProgress: function() {
      if (cur.applyVersionCont) {
        obj.innerHTML = cur.applyVersionCont;
      }
    }
  });
},

_eof: 1};try{stManager.done('pages.js');}catch(e){}
