var WkView = {

init: function() {
  if (window.wkLayer) {
    return;
  }
  window.wkLayer = ce('div', {
    id: 'wk_layer'
  });

  window.wkLayerWrap = ce('div', {
    id: 'wk_layer_wrap',
    className: 'scroll_fix_wrap fixed'
  });


  wkLayerWrap.appendChild(window.wkLayer);

  bodyNode.appendChild(wkLayerWrap);

  window.wkLayer.style.width = (lastWindowWidth - sbWidth() - 2) + 'px';
},

showLayer: function() {
//  if (!wkcur.previousLayer) {
//    wkcur.previousLayer = isVisible(layerWrap) || (isVisible(ge('mv_layer_wrap')) && !mvcur.minimized);
//  }
//  layers.fullhide && layers.fullhide(true);

  debugLog('layerqueue.hide from wkview');
  layerQueue.hide();

  layers.wrapshow(wkLayerWrap, 0.7);
  layers.fullhide = WkView.hide;
  WkView.onScroll();
  wkcur.showT = setTimeout(function() {
    layers.wrapshow(wkLayerWrap, 0.7);
    layers.fullhide = WkView.hide;
  }, 0);
  onBodyResize();
},
restoreLayer: function(opts) {
  WkView.showLayer();
  if (wkcur.root) {
    if (opts.myLoc) nav.setLoc(opts.myLoc);
  } else {
    WkView.setLocation();
  }
  if (opts.prevLoc) wkcur.prevLoc = opts.prevLoc;
  WkView.updateSize();
},

wikiClick: function(obj, ev) {
  if (checkEvent(ev)) {
    return true
  }
  var el = ev.target;
  while(el && el.tagName != 'A') {
    el = el.parentNode;
  }
  if (el && el.tagName == 'A') {
    var href = el.href;
    var m = href.match(/^\/(page[^?]*)(\?.*)?$/);
    if (m) {
      var path = m[1];
      var query = (m[4]) ? q2ajx(m[4].substr(1)) : {};
    } else {
      var m = href.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)\/([^?]*)(\?.*)?$/i);
      if (!m || !m[3]) {
        return true;
      }

      var path = m[3].split('/');
      var query = (m[4]) ? q2ajx(m[4].substr(1)) : {};
    }

    var params = {};
    switch(path[0]) {
      case 'pages':
        params['oid'] = query.oid || query.o;
        params['id'] = query['id'];
        params['p'] = query['p'];
        break;
      case 'ru':
      case 'en':
        params['p'] = path[1];
        params['global'] = path[0];
        break;
      default:
        if (path[0].match(/^page-?\d+_\d+$/)) {
          var query = path[0].substr(4).split('_');
          params['oid'] = query[0];
          params['id'] = query[1];
        } else if (path[0].match(/^note\d+_\d+$/)) {
          var query = path[0].substr(4).split('_');
          params['w'] = path[0];
        }
        break;
    }
    if (params.w || (params.oid && (params.id || params.p))) {
      showWiki(params);
      return cancelEvent(ev);
    }
  }
},

edit: function() {
  if (!wkcur.canEdit) {
    return true;
  }
  var link = ge('wk_edit_link');
  if (!wkcur.editLang) {
    wkcur.editLang = val(link);
  }

  val(link, '<img src="images/upload.gif" />');

  if (wkcur.type == 'wall') {
    if (wkcur.edit) {
      Wall.cancelEdit();
    } else {
      Wall.editPost(wkcur.post, {from: 'wkview'}, function () {
        val(link, wkcur.editLang);
      });
    }
    return true;
  }

  if (wkcur.edit) {
    if (wkcur.note) {
      var params = {
        w: 'note' + wkcur.oid + '_' + wkcur.nid
      };
    } else {
      var params = {
        oid: wkcur.oid,
        id: wkcur.pid,
        p: wkcur.p
      };
    }
    window.wkcur = false;
    showWiki(params, false, false, {noloader: true});
    return true;
  }
  wkcur.edit = true;
  var params = {
    act: 'edit',
    oid: wkcur.oid,
    load: 1,
    section: 'edit'
  };
  if (wkcur.note) {
    params['nid'] = wkcur.nid;
    params['note'] = 1;
  } else {
    params['id'] = wkcur.pid;
  }
  ajax.post('wkview.php', params, {
    stat: ['pages.js','wysiwyg.js', 'wysiwyg.css'],
    onDone: function(content, js, info, options) {
      wkcur.wkContent.innerHTML = content;
      ge('wk_layer_title').innerHTML = options.lang['pages_edit_title'];
      show('wk_summary');
      eval(js);
      addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
      addEvent(window, 'resize', WkView.onResize);
      val(link, options.lang['pages_view']);
      WkView.onScroll();
      WkView.updateSize();
    },
    onFail: function() {
      val(link, wkcur.editLang);
    }
  });
},

onScroll: function(ev, resize) {
  if (wkcur.lSTL) {
    WkView.stlOnScroll(resize);
  }

  switch (wkcur.type) {
    case 'wall':
      return WkView.wallUpdateRepliesOnScroll(resize);

    case 'likes':
      return WkView.likesOnScroll(resize);

    case 'history':
      return WkView.historyOnScroll(resize);
  }

  var y = wkLayerWrap.scrollTop;
  var panel = ge('wk_buttons_panel');
  if (!panel) return;
  var py = getXY(ge('wk_buttons_cont'), true)[1];
  if (!wkcur.bottomSize) {
    wkcur.bottomSize = getSize(panel);
  }

  var ph = wkcur.bottomSize[1];

  var wndHeight = window.innerHeight || document.documentElement.clientHeight;

  if (resize && !wkcur.fixedBottom && wndHeight - ph < py + 20) {
    wkLayerWrap.scrollTop += py + 20 - (wndHeight - ph);
  } else if (wndHeight - ph < py) {
    if (!wkcur.fixedBottom || resize) {
      wkcur.fixedBottom = true;
      setStyle(panel, {
        position: 'fixed',
        top: (wndHeight - ph) + 'px'
      });
      addClass(panel, 'wk_panel_fixed');
    }
  } else {
    if (wkcur.fixedBottom || resize) {
      wkcur.fixedBottom = false;
      setStyle(panel, {
        position: 'static',
        top: '0px'
      });
      removeClass(panel, 'wk_panel_fixed');
    }
  }

  if (resize && wkcur.fixedBottom) {
    setStyle(panel, {left: getXY(wkcur.wkContent)[0]+'px'})
  }

  if (!wkcur.editorLayer) {
    wkCont = wkcur.wkContent;//ge('wk_content');
    wkcur.editorLayer = ge('wke_buttons_cont') || geByClass('editor_layer', wkCont)[0];
  } else {
    var pos = getXY(wkcur.editorLayer, true);
    if (pos[1] < 0) {
      if (!wkcur.fixedTop) {
        wkcur.fixedTop = true;
        addClass(wkcur.wkContent, 'wk_top_fixed');
        WkView.updateShadow();
        wkcur.editor.floatPanel = true;
      }
    } else {
      if (wkcur.fixedTop) {
        wkcur.fixedTop = false;
        removeClass(wkcur.wkContent, 'wk_top_fixed');
        wkcur.editorLayer.style.paddingTop = '0px';
        wkcur.editor.floatPanel = false;
      }
    }
  }
},

updateShadow: function() {
  if (!wkcur.editorLayer) {
    wkCont = wkcur.wkContent;//ge('wk_content');
    wkcur.editorLayer = geByClass('editor_layer', wkCont)[0];
  }
  var toolbox = ge('wke_buttons') || geByClass('editor_toolbar', wkCont)[0];
  if (toolbox) {
    if (wkcur.fixedTop) {
      var size = getSize(toolbox);
      wkcur.editorLayer.style.paddingTop = size[1]+'px';
      ge('wk_top_toolbox_shadow').style.top = (size[1] - 1)+'px';
    }
  }
},

saveInfo: function(autosave) {
  var params = {
    page: wkcur.p,
    hash: wkcur.hash
  }
  if (wkcur.newEditor) {
    params['Body'] = wkcur.editor.val();
    if (params['Body'] === false) {
      return false;
    }
  } else {
    params['Body'] = wkcur.editor.convertToWiki(true);
  }
  if (wkcur.note) {
    params = extend(params, {
      act: 'save',
      oid: wkcur.oid,
      nid: wkcur.nid,
      wysiwyg: 1,
      note: wkcur.note
    });
  } else {
    params = extend(params, {
      act: 'save',
      oid: wkcur.oid,
      id: wkcur.pid
    });
  }
  if (wkcur.pageTitle) {
    params['title'] = val(wkcur.pageTitle);
    /*if (!params['title']) {
      notaBene(wkcur.pageTitle);
      return false;
    }*/
  }
  if (autosave && wkcur.lockAutoSave) {
    return false;
  }
  wkcur.lockAutoSave = true;
  ajax.post(wkcur.note ? 'wkview.php' : 'al_pages.php', params, {
    onDone: function(text, data) {
      wkcur.lockAutoSave = false;
      wkcur.editor.changed = false;
      if (!autosave) {
        var saveEl = ge('pages_save_info_wysiwyg');
        saveEl.innerHTML = text;
        show(saveEl);
      }
      if (data) {
        if (data.nid) {
          wkcur.nid = data.nid;
        }
        if (data.raw) {
          wkcur.wkRaw = data.raw;
        }
        if (data.created && cur.chooseMedia) {
          nav.setLoc(extend(nav.objLoc, {w:'note'+data.raw}));
          if (!autosave) {
            WkView.hide(false, true);
          }
          cur.pbNoteAdded = data;
          cur.chooseMedia('note', data.raw, data);
          return true;
        } else {
          var title = ge('share_note_title'+data['raw']);
          if (title && !autosave) {
            title.innerHTML = data['title'];
          }
          if (wkcur.note && wkcur.toStatus && !autosave) {
            WkView.hide(false, true);
            if (wkcur.reloadOnSave) {
              boxRefreshCoords(boxLoader);
              show(boxLoader);
              show(boxLayerWrap);
              nav.reload({
                onDone: function() {
                  hide(boxLoader);
                  hide(boxLayerWrap);
                }
              });
            }
            return true;
          }
        }
      }
      if (autosave) return true;
      setTimeout(function() {
        fadeOut(saveEl, 200);
      }, 1500);
    },
    showProgress: function() {
      !autosave && lockButton(ge('wk_layer_save'));
    },
    hideProgress: function() {
      !autosave && unlockButton(ge('wk_layer_save'));
    },
    onFail: WkView.showError
  })
},

show: function(title, html, options, script, ev) {
  // var previous = false;
  var arrowOver = window.wkcur && wkcur.arrowOver;
  if (!window.wkcur) {
    this.init();
  } else {
    if (wkcur.shown && !isVisible(wkLayerWrap)) {
      debugLog('hiding old wkview');
      WkView.hide(true, true);
    }
    each (wkcur._hide || [], function (k, hideCallback) {
      if (isFunction(hideCallback)) hideCallback();
    });
    // previous = {
    //   scrollTop: wkLayer.scrollTop,
    //   cont: wkcur.wkCont,
    //   cur: wkcur
    // };
  }
  var hlen = (window.wkcur && wkcur.historyLen) ? wkcur.historyLen : 0;
  if (!window.wkcur || !wkcur.doBack && !options.fromlist) {
    hlen += 1;
  }

  var toQueue = options.queue;
  if (toQueue) {
    layerQueue.push();
    options.queue = false;
  }
  if ((window.wkcur || {}).shown && wkcur.root) {
    nav.setLoc(wkcur.prevLoc);
  }

  window.wkcur = {
    historyLen: hlen,
    _hide: [],
    _show: []
  };

  if (browser.iphone || browser.ipad) {
    cur.wkStartScroll = scrollGetY();
  }

  if (options.edit) {
    cur._editMode = function() {
      return true;
    }
    if (!window.WkEditor) {
      stManager.add(['wk_editor.js', 'wk_editor.css'], WkView.show.pbind(title, html, options, script, ev));
      return false;
    }
  }

  cur.cancelTooltip = true;
  if (window.tooltips) {
    tooltips.hideAll();
  }

  if (!isVisible(wkLayerWrap)) {
    otherList = true;
    addEvent(window, 'resize', WkView.onResize);
    addEvent(wkLayerWrap, 'click', WkView.onClick);
    boxQueue.hideAll();
    WkView.showLayer();
  }

  wkcur.noLocChange = 0; // do return location
  wkcur.noHistory = options.noLocChange;
  wkcur.hideTitle = options.hide_title ? 1 : 0;

  wkcur.shown = true;

  if (wkcur.edit) {
    wkcur.edit = false;
    ge('wk_edit_link').innerHTML = wkcur.editLang;
  }
  extend(wkcur, options);

  if (wkcur.root) {
    cur.nav.push(function(ch, old, nw, opts) {
      nw = nav.toStr(nw);
      if (nw == wkcur.prevLoc) {
        WkView.hide(true);
        return false;
      }
    });
    if (!options.noLocChange && options.myLoc) nav.setLoc(options.myLoc);
  } else {
    var referrer = document.URL;
    WkView.setLocation(options.noLocChange, toQueue);
    if (referrer == document.URL) referrer = '';
    setTimeout(window.comScoreUDM && comScoreUDM.pbind(locProtocol+'//'+location.host+'/wkview.php?comscorekw=pageview_candidate', referrer), 10);
    if (options.prevLoc) wkcur.prevLoc = options.prevLoc;
  }

  if (ev && ev.pageX && ev.pageY) {
    extend(wkcur, {oldX: ev.pageX, oldY: ev.pageY, oldT: vkNow()});
  }

  var colorClass = wkcur.layerLight ? 'wk_light' : 'wk_dark';

  addClass(wkLayerWrap, colorClass);
  addClass(layerBG, colorClass);

  var content = html,
      editLink = getLang('global_edit'),
      hideLeft = wkcur.historyLen > 1 ? '' : 'display: none;';
  if (options.type == 'wall') {
    addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
    addEvent(window, 'resize', WkView.onResize);
    WkView.wallBeforeInitPost(options);
  } else if (options.edit) {
    addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
    addEvent(window, 'resize', WkView.onResize);
    editLink = options.lang['pages_view'];
    wkcur.editLang = getLang('global_edit');
  } else {
    if (options) {
      content = '<div class="wk_text wk_wiki_content' + (options.className ? ' '+options.className : '') + '" onclick="return WkView.wikiClick(this, event);">' + content + '</div>';
    }
  }

  if (wkcur.wkCont) {
    wkcur.wkContent.innerHTML = content;
  } else {
    wkLayer.innerHTML = '<div class="wk_cont">\
  <table cellspacing="0" cellpadding="0" class="wk_cont_t wk_cont_top_t">\
  <tr><td class="sidesh s1"><div class="sidesh_filler"></div></td><td>\
  <table cellspacing="0" cellpadding="0" class="wk_cont_t">\
  <tr><td>\
  <table cellspacing="0" cellpadding="0" class="wk_cont_t">\
  <tr><td colspan="3" class="bottomsh s3"><div></div></td></tr>\
  <tr><td class="sidesh s3"><div class="sidesh_filler"></div></td><td>\
  \
  <div id="wk_box" onclick="wkcur.wkClicked = true;">\
    <div id="wk_loader"></div>\
    <a id="wk_close_link" href="javascript: return false;" class="fl_r wk_close_link" onclick="return WkView.hide(false, true, event);">\
      '+getLang('global_close')+'\
    </a>\
    <div class="fl_r divide wk_edit_divide">|</div>\
    <a class="fl_r wk_edit_link" id="wk_edit_link" onclick="return WkView.edit();">\
      '+editLink+'\
    </a>\
    <div id="wk_summary" class="fl_l"><span class="summary" id="wk_layer_title">'+title+'</span></div>\
    <div id="wk_content">'+content+'</div>\
    <div class="clear"></div>\
  </div>\
  \
  </td><td class="sidesh s3"><div class="sidesh_filler"></div></td></tr>\
  <tr><td colspan="3" class="bottomsh s3"><div></div></td></tr></table>\
  </td></tr>\
  <tr><td colspan="3" class="bottomsh s2"><div></div></td></tr></table>\
  </td><td class="sidesh s1"><div class="sidesh_filler"></div></td></tr>\
  <tr><td colspan="3" class="bottomsh s1"><div></div></td></tr></table>\
  </div>\
<div id="wk_left_wrap"><div id="wk_left" style="'+hideLeft+'" class="wk_left no_select"></div></div>\
<div id="wk_right" class="wk_close no_select"></div>\
<div id="wk_left_arrow" class="no_select"></div>\
<div id="wk_right_arrow" class="no_select"></div>\
<div class="no_select" id="wk_left_nav" style="'+hideLeft+'" '+'onmouseover="WkView.activate(wkcur.wkLeft)" onmouseout="WkView.deactivate(wkcur.wkLeft)" onmousedown="wkcur.wkClicked = true; WkView.back();" onselectstart="return cancelEvent(event);"></div>\
<div class="no_select" id="wk_right_nav" '+'onmouseover="WkView.activate(wkcur.wkRight)" onmouseout="WkView.deactivate(wkcur.wkRight)" onmousedown="if (!wkcur.noClickHide) { wkcur.wkClicked = true; WkView.hide(); }"></div>\
<div id="wk_left_arrow_bg" class="no_select" onclick="return WkView.navigate(this, event, -1);" onmouseover="WkView.activateArrow(false, event)" onmouseout="WkView.deactivateArrow(false, event)"><div class="wk_arrow_bg_inner"></div></div>\
<div id="wk_right_arrow_bg" class="no_select" onclick="return WkView.navigate(this, event, 1);" onmouseover="WkView.activateArrow(true, event)" onmouseout="WkView.deactivateArrow(true, event)"><div class="wk_arrow_bg_inner"></div></div>';

    extend(wkcur, {
      wkCont: wkLayer.firstChild,
      wkBox: ge('wk_box'),

      mvLoader: ge('wk_loader'),
      wkContent: ge('wk_content'),

      wkLeftNav: ge('wk_left_nav'),
      wkRightNav: ge('wk_right_nav'),
      wkLeft: ge('wk_left'),
      wkLeftWrap: ge('wk_left_wrap'),
      wkRight: ge('wk_right'),
      wkLeftArrow: ge('wk_left_arrow'),
      wkRightArrow: ge('wk_right_arrow'),
      wkLeftArrowBg: ge('wk_left_arrow_bg'),
      wkRightArrowBg: ge('wk_right_arrow_bg')
    });
  }
  toggle('wk_summary', title);

  if (wkcur.commonClass) {
    addClass(wkcur.wkBox, wkcur.commonClass);
  } else {
    wkcur.wkBox.className = '';
  }

  if (wkcur.oid && wkcur.pid) {
    WkView.initSTL();
    if (!options.edit) {
      addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
      addEvent(window, 'resize', WkView.onResize);
    }
  }
  if (options.overflow) {
    addClass(wkcur.wkBox, 'wk_overflow_hidden');
  } else {
    removeClass(wkcur.wkBox, 'wk_overflow_hidden');
  }

  if (wkcur.canEdit && !wkcur.toStatus && wkcur.type != 'wall') {
    addClass(wkcur.wkBox, 'wk_view_edit_link');
  } else {
    removeClass(wkcur.wkBox, 'wk_view_edit_link');
  }

  if (browser.mobile) {
    wkcur.wkYOffset = intval(window.pageYOffset);
    wkcur.wkCont.style.paddingTop = (wkcur.wkYOffset + 10) + 'px';
    wkcur.wkRightNav.style.top = (wkcur.wkYOffset + 10) + 'px';
  }

  if (script) {
    eval(script);
  }
  WkView.updateSize();

  removeEvent(document, 'keydown', WkView.onKeyDown);
  addEvent(document, 'keydown', WkView.onKeyDown);

  options.onLoaded && options.onLoaded();

  shortCurrency();

  var closeLink = ge('wk_close_link');
  if (closeLink) {
    closeLink.focus();
  }

  WkView.updateArrows();

  if (options.type == 'wall') {
    WkView.wallAfterInitPost();
  } else if (options.toScroll) {
    wkLayerWrap.scrollTop = options.toScroll;
    wkcur.toScroll = 0;
  }

  if (arrowOver !== undefined) {
    WkView.activateArrow(arrowOver);
  }
  if (options.fromlist) {
    WkView.preloadArrow(options.fromlist == 1);
  }
  var _a = window.audioPlayer, aid = currentAudioId();
  if (_a && aid && _a.showCurrentTrack) _a.showCurrentTrack();

  return false;
},

hide: function(noLoc, force, ev) {
  if (!window.wkcur || !force && !wkcur.shown) return;
  var doUpdAds = !wkcur.wkRaw.match(/^recom_apps\d+$/) && !wkcur.wkRaw.match(/^app\d+$/);

  clearTimeout(wkcur.autosaveTimeout);
  clearTimeout(wkcur.showT);

  /*if (!wkcur.noHistory && !noLoc) {
    wkcur.noHistory = 1;
    wkcur.forceHistoryHide = force;
    __adsUpdate('lazy');
    return history.go(-1);
  }
  if (wkcur.forceHistoryHide) {
    force = wkcur.forceHistoryHide;
    wkcur.forceHistoryHide = false;
  }*/

  if (!force && wkcur.edit && wkcur.editor) {
    if (wkcur.editor.changed) {
      if (wkcur.note && wkcur.toStatus) {
        WkView.saveInfo();
        return;
      } else {
        var box = showFastBox(wkcur.lang['pages_close_title'], wkcur.lang['pages_close_text'], getLang('box_yes'), function() {
          box.hide();
          WkView.hide(noLoc, true);
        }, getLang('box_no'))
        return;
      }
    }
  }

  each (wkcur._hide || [], function (k, hideCallback) {
    if (isFunction(hideCallback)) hideCallback();
  });

  var donthide = false;
  if (isVisible(wkLayerWrap)) {
    setTimeout(layerQueue.pop, 0);
    donthide = layerQueue.count() && layerQueue._layers[layerQueue._layers.length - 1][0] == 'wiki' && !layerQueue._bl;
    if (!donthide) {
      layers.wraphide(wkLayerWrap);
      layers.fullhide = false;
    }
  }

  if (window.tooltips) {
    tooltips.destroy(this);
  }

  removeEvent(document, 'keydown', WkView.onKeyDown);

  wkcur.editorLayer = false;
  removeClass(wkcur.wkContent, 'wk_top_fixed');
  wkcur.fixedTop = wkcur.fixedBottom = false;

  if (!donthide) {
    var colorClass = wkcur.layerLight ? 'wk_light' : 'wk_dark';
    removeClass(wkLayerWrap, colorClass);
    removeClass(layerBG, colorClass);

    wkcur.shown = false;
    removeEvent(wkLayerWrap, 'click', WkView.onClick);
    removeEvent(wkLayerWrap, 'scroll', WkView.onScroll);
    wkcur.wkContent.innerHTML = '';
  }
  wkcur.wkClicked = false;
  wkcur.hideTitle = false;

  wkcur.changeCanvasSize = false;

  if (wkcur.onHide && isFunction(wkcur.onHide)) {
    wkcur.onHide();
  }

  cur._editMode = false;

  if (wkcur.root && noLoc !== true) {
    WkView.backLocation();
  } else if (!wkcur.noLocChange && noLoc !== true) {
    if (noLoc === 2) {
      nav.setLoc(hab.getLoc());
    } else {
      WkView.backLocation();
    }
    if (doUpdAds) {
      __adsUpdate('lazy');
    }
  } else if (doUpdAds) {
    __adsUpdate();
  }

  if (browser.iphone || browser.ipad) {
    var scroll = scrollGetY();
    if (Math.abs(scroll - cur.wkStartScroll) > 500) {
      scrollToY(cur.wkStartScroll, 0);
    }
  }
  delete wkcur.historyLen;
  var _a = window.audioPlayer, aid = currentAudioId();
  if (_a && aid && _a.showCurrentTrack) _a.showCurrentTrack();
  return false;
},

cmp: function(id1, id2) {
  var l1 = id1.length, l2 = id2.length;
  if (l1 < l2) {
    return -1;
  } else if (l1 > l2) {
    return 1;
  } else if (id1 < id2) {
    return -1;
  } else if (id1 > id2) {
    return 1;
  }
  return 0;
},


onClick: function(e) {
  if (wkcur.wkClicked || wkcur.noClickHide || e && cur.__mdEvent && e.target != cur.__mdEvent.target) {
    wkcur.wkClicked = false;
    return;
  }
  var dx = Math.abs(e.pageX - intval(wkcur.oldX));
  var dy = Math.abs(e.pageY - intval(wkcur.oldY));
  if (dx > 3 || dy > 3) {
    if (vkNow() - intval(wkcur.oldT) > 300) {
      WkView.hide();
    }
  }
},

onKeyDown: function(e) {
  e = e || window.event;
  // debugLog(e.type, e.returnValue, e.keyCode, e, WkView.edit);
  if (e.returnValue === false) return false;
  if (!cur.pvShown && e.keyCode == KEY.ESC) {
    WkView.hide();
    return cancelEvent(e);
  }
  if (!cur.pvShown && (!wkcur.edit && (e.keyCode == KEY.LEFT || e.keyCode == KEY.RIGHT))) {
    var target = e && e.target || e.srcElement;
    if (target && (target.tagName == 'TEXTAREA' || target.tagName == 'INPUT' || target.tagName == 'DIV' && target.contentEditable)) {
      return true;
    }
    WkView.navigate(null, e, e.keyCode == KEY.RIGHT ? 1 : -1);
    return cancelEvent(e);
  }
  if (WkView.canEdit) {
    if (e.keyCode == 83 && (e.ctrlKey || e.metaKey && browser.mac)) {
      WkView.saveInfo();
      return cancelEvent(e);
    } else if (e.keyCode == 10 || e.keyCode == 13 && (e.ctrlKey || e.metaKey && browser.mac)) {
      WkView.saveInfo();
    }
    if (cur.updTimeout) return;
    cur.updTimeout = setTimeout(function() {
      WkView.onResize()
      cur.updTimeout = false;
    }, 200);
  }
},

onResize: function() {
  var dwidth = lastWindowWidth, dheight = lastWindowHeight, sbw = sbWidth();

  var w = dwidth - sbw - 2 - 120 - 34 - 50, h = dheight - 31 - 28 - 72;
  if (w > 1280) { // less than full hd - not size > 2
    w = 1280;
  } else if (w > 807 && w < 907) { // 1024x768 - not size > 1
    w = 807;
  } else if (w < 604) {
    w = 604;
  }
  if (h < 453) {
    h = 453;
  }
  wkcur.mvWidth = w;
  wkcur.mvHeight = h;

  var sizeChanged = false, oldverybig = wkcur.mvVeryBig;
  wkcur.mvVeryBig = (w > 1280) ? 2 : (w > 807 ? 1 : false);
  sizeChanged = (oldverybig != wkcur.mvVeryBig);
  WkView.onScroll(false, true);

  WkView.updateHeight();
  WkView.updateArrows();
},


updateArrows: function() {
  var sbw = sbWidth() + 2;
  if (wkcur.wkLeft) {
    wkcur.wkLeft.style.left = '20px';
  }
  var size = getSize(wkcur.wkBox),
      width = size[0],
      height = size[1];
  wkcur.wkLeftNav.style.width = Math.floor((lastWindowWidth - sbw - width - 2) / 2) + 'px';
  wkcur.wkRightNav.style.left = Math.floor((lastWindowWidth - sbw + width + 2) / 2) + 'px';
  wkcur.wkRightNav.style.width = Math.floor((lastWindowWidth - sbw - width - 2) / 2) + 'px';
  if (wkcur.wkClose) {
    wkcur.wkClose.style.left = (lastWindowWidth - sbw - 2 - 37) + 'px';
  }

  var arrowActions = WkView.getNextWkRaws();
  if (arrowActions[0] || arrowActions[1]) {
    var arrowTop = (wkcur.wkCont.offsetHeight < lastWindowHeight ? wkcur.wkCont.offsetTop + 10 + (height / 2) : lastWindowHeight / 2) - 8;
    if (arrowActions[0]) {
      show(wkcur.wkLeftArrow);
      show(wkcur.wkLeftArrowBg);

      setStyle(wkcur.wkLeftArrowBg, {left: (lastWindowWidth - sbw - width) / 2 - 90});
      setStyle(wkcur.wkLeftArrow, {left: (lastWindowWidth - sbw - width) / 2 - 52, top: arrowTop});
    } else {
      hide(wkcur.wkLeftArrow, wkcur.wkLeftArrowBg);
    }

    if (arrowActions[1]) {
      show(wkcur.wkRightArrow);
      show(wkcur.wkRightArrowBg);
      setStyle(wkcur.wkRightArrowBg, {left: (lastWindowWidth - sbw - width) / 2 + width});
      setStyle(wkcur.wkRightArrow, {left: (lastWindowWidth - sbw - width) / 2 + width + 36, top: arrowTop});
    } else {
      hide(wkcur.wkRightArrow, wkcur.wkRightArrowBg);
    }
  } else {
    hide(wkcur.wkLeftArrow, wkcur.wkLeftArrowBg, wkcur.wkRightArrow, wkcur.wkRightArrowBg);
  }
},
getNextWkRaws: function () {
  var wkRawPrevious = wkRawNext = false;
  if (isArray(wkcur.wkRawList) && wkcur.historyLen <= 1 && !wkcur.wkRawLoading) {
    var len = wkcur.wkRawList.length,
        pos = indexOf(wkcur.wkRawList, wkcur.wkRaw);
    if (pos > 0) {
      wkRawPrevious = wkcur.wkRawList[pos - 1];
    }
    if (pos >= 0 && pos < len - 1) {
      wkRawNext = wkcur.wkRawList[pos + 1];
    }
  }
  return [wkRawPrevious, wkRawNext];
},
navigate: function (el, event, delta) {
  if (event && event.type == 'click') {
    wkcur.arrowOver = (delta == 1);
    wkcur.arrowClicked = vkNow();
  }
  var actions = WkView.getNextWkRaws();
  if (delta > 0 && actions[1]) {
    wkcur.wkRawLoading = true;
    addClass(wkcur.wkRightArrow, 'wk_arrow_progress');
    // debugLog(wkcur.wkRightArrow, wkcur.wkRightArrow.className);
    showWiki({w: actions[1]}, false, false, {fromlist: 1, noloader: true, preload: {cache: 1}});
    cancelEvent(event);
  }
  if (delta < 0 && actions[0]) {
    wkcur.wkRawLoading = true;
    addClass(wkcur.wkLeftArrow, 'wk_arrow_progress');
    showWiki({w: actions[0]}, false, false, {fromlist: -1, noloader: true, preload: {cache: 1}});
    cancelEvent(event);
  }
},

updateHeight: function() {
  window.updateWndVScroll && updateWndVScroll();

  var h = Math.max(wkcur.wkCont.offsetHeight, lastWindowHeight);
  wkcur.wkLeftNav.style.height = wkcur.wkRightNav.style.height = h + 'px';

  var boxH = wkcur.wkBox.offsetHeight + 2;
  setStyle(wkcur.wkLeftArrowBg.firstChild, {height: boxH});
  setStyle(wkcur.wkRightArrowBg.firstChild, {height: boxH});
},

updateSize: function() {
  var size = getSize(wkcur.wkCont);

  var docEl = document.documentElement,
      ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight,
      top = Math.max(positive((ch - size[1] - 5) / 2), 14),
      paddingTop = top + 10,
      paddingBottom = wkLayer.offsetHeight - size[1] + top + 90;

  wkcur.wkCont.style.top = top + 'px';
  wkcur.wkLeftArrowBg.style.paddingTop = wkcur.wkRightArrowBg.style.paddingTop = paddingTop + 'px';
  wkcur.wkLeftArrowBg.style.paddingBottom = wkcur.wkRightArrowBg.style.paddingBottom = paddingBottom + 'px';

  onBodyResize();
  WkView.onResize();
},


setLocation: function(noLocChange, toQueue) {
  wkcur.prevLoc = {};
  for (var i in nav.objLoc) {
    if (i != 'w' || nav.objLoc[i] != wkcur.wkRaw && toQueue) {
      wkcur.prevLoc[i] = nav.objLoc[i];
    }
  }
  if (noLocChange) {
    return;
  }

  var nl = extend(nav.objLoc, {'w': wkcur.wkRaw});
  delete(nl.z);
  if (nav.strLoc != nav.toStr(nl)) {
    nav.setLoc(nl);
  }

  //wkcur.noHistory = 0;
},

backLocation: function() {
  var loc = hab.getLoc();
  if (wkcur.prevLoc && wkcur.prevLoc != loc) {
//    if (wkcur.previousLayer) {
//      nav.go(wkcur.prevLoc);
//    } else {
      nav.setLoc(wkcur.prevLoc);
//    }
//    if (wkcur.previousLayer && wkcur.prevLoc.z) {
//      zNav({z: wkcur.prevLoc.z});
//    }
  } else {
    var locParts = loc.split('/');
    if (locParts.length > 1) {
      nav.setLoc(locParts[0]);
    }
  }
  layerQueue.noHistory();
},

showError: function(txt) {
  if (window.wkcur) {
    delete wkcur.wkRawLoading;
    addClass(wkcur.wkRightArrow, 'wk_arrow_progress');
    addClass(wkcur.wkLeftArrow, 'wk_arrow_progress');
  }
  var box = showFastBox({title: getLang('global_error')}, txt, getLang('global_close'));
  setTimeout(box.hide, 2000);
  return true;
},

wysiwygInit: function() {
  if (browser.ipod || browser.ipad || browser.iphone) return;
  var simpleToolBar = 'bold,italic,gray,underline,strike,left,center,right,marker_list,numeric_list,h1,h2,h3,image,video,audio,link,unlink';
  var extendedToolBar = 'bold,italic,gray,underline,strike,left,center,right,marker_list,numeric_list,h1,h2,h3,image,video,audio,doc,link,unlink,break,';
  extendedToolBar += 'table,table_delete,insert_row_before,insert_row_after,insert_col_before,insert_col_after,delete_row,delete_col,col_width,sub,sup,citate,outdent,indent,pre,character,hider';
  window.editorName = 'pageWysiwyg';
  var editorParams = {
    editorName: editorName,
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
    photoMaxSize: { w: 607, h: 500 },
    userID: 0,
    userName: '',
    groupID: 0,
    oid: wkcur.oid,
    debug: false,
    layer: 1,
    toolWidth: 654,
    width: 608,
    note: wkcur.note ? wkcur.wkRaw : 0,
    onHeightChange: function() {
      WkView.onScroll();
    },
    onChange: WkView.onChange
  };
  window[editorName] = wkcur.editor = new Wysiwyg(editorParams);
},

onChange: function() {
  if (!wkcur.shown) return false;
  clearTimeout(wkcur.autosaveTimeout);
  wkcur.autosaveTimeout = setTimeout(function() {
    if (wkcur.note && wkcur.toStatus) {
      WkView.saveInfo(true);
    }
  }, 4000);
},

likeOver: function() {
  var icon = ge('wk_like_icon');
  if (!wkcur.liked) {
    setTimeout(animate.pbind(icon, {opacity: 1}, 200, false), 1);
  } else {
    setStyle(icon, {opacity: 1});
  }
  var linkSize = getSize(ge('wk_like_link'));
  var linkW = linkSize ? linkSize[0] : 20;

  showTooltip(icon.parentNode, {
    url: 'like.php',
    params: {act: 'a_get_stats', object: wkcur.like_obj || wkcur.wkRaw, from: 'wkview'},
    slide: 15,
    shift: [0, 8, 9],
    ajaxdt: 100,
    showdt: 400,
    hidedt: 200,
    className: 'rich like_tt',
    init: function (tt) {
      if (!tt.container) return;
      var bp = geByClass1('bottom_pointer', tt.container, 'div');
      var tp = geByClass1('top_pointer', tt.container, 'div');
      setStyle(bp, {marginLeft: linkW + 2});
      setStyle(tp, {marginLeft: linkW + 2});
    }
  });
},

likeOut: function() {
  if (!wkcur.liked) {
    setTimeout(animate.pbind(ge('wk_like_icon'), {opacity: 0.4}, 200, false), 1);
  }
},

like: function() {
  if (!vk.id) return;
  var my = !wkcur.liked;

  ajax.post('like.php', {act: 'a_do_' + (my ? '' : 'un') + 'like', object: wkcur.like_obj || wkcur.wkRaw, hash: wkcur.likehash, from: 'wkview'}, {
    onDone: function(count, title) {
      return WkView.likeUpdate(my, count, title);
      wkcur.likes = count;
      wkcur.liked = my;
    }
  });
  WkView.likeUpdate(my, wkcur.likes + (my ? 1 : -1));
},
likeShare: function(hash) {
  var like_obj = wkcur.like_obj || wkcur.wkRaw,
      el = ge('like_share_' + like_obj),
      was = isChecked(el);
  checkbox(el);
  ajax.post('like.php', {act: 'a_do_' + (was ? 'un' : '') + 'publish', object: like_obj, hash: hash}, {
    onDone: WkView.likeUpdate.pbind(true)
  });
  if (ge('wk_like_link')) {
    var countInput = ge('wk_like_real_count'),
        count = countInput ? countInput.value : val('wk_like_count'),
        my = hasClass(ge('wk_like_icon'), 'my_like');
  } else {
    var countInput = ge('like_real_count_' + like_obj),
        count = countInput ? countInput.value : val('like_count' + like_obj),
        my = hasClass(ge('like_icon' + like_obj), 'my_like');
  }

  WkView.likeUpdate(true, intval(count) + (my ? 0 : 1));
},
likeShareCustom: function () {
  if (vk.id) {
    showBox('like.php', {act: 'publish_box', object: wkcur.like_obj || wkcur.wkRaw, list: '', from: 'wkview'});
  }
},

likeUpdate: function(my, count, title) {
  count = intval(count);

  var rows = ge('like_table_' + (wkcur.like_obj || wkcur.wkRaw));
  var titleNode = ge('like_title_' + (wkcur.like_obj || wkcur.wkRaw)),
      countNode = ge('wk_like_count');
  var icon = ge('wk_like_icon');
  var tt = icon.parentNode.tt || {}, opts = clone(tt.opts || {}), newleft = (my ? 0 : -36);

  if (title && titleNode) {
    val(titleNode, title);
  }
  wkcur.likes = count;
  animateCount(countNode, count);

  wkcur.liked = my;
  toggleClass(icon, 'my_like', my);
  if (my) {
    setStyle(icon, {opacity: 1});
  }
  if (count) {
    var styleName = wkcur.rtl ? 'right' : 'left';
    if (tt.el && !isVisible(tt.container) && !title) {
      rows.style[styleName] = newleft + 'px';
      tooltips.show(tt.el, extend(opts, {showdt: 0}));
    } else if (rows) {
      var params = {};
      params[styleName] = newleft;
      animate(rows, params, 200);
    }
    removeClass(icon, 'no_likes');
  } else {
    if (tt.el) tt.hide();
    addClass(icon, 'no_likes');
  }
},

showLikesPage: function(like_obj, published, offset) {
  cur.likesBox.loadTabContent('like.php', {act: 'a_get_members', object: like_obj, published: published, offset: offset, wall: 1}, published);
},

extPageSubscribe: function(btn, oid, hash, msg) {
  var reqOptions = {
    showProgress: lockButton.pbind(btn),
    hideProgress: unlockButton.pbind(btn),
    onDone: function () {
      showDoneBox(msg, {w: 500, out: 5000});
      removeClass(btn.parentNode.parentNode.parentNode.parentNode, 'wk_extpage_head_unsubscribed');
    }
  };
  if (oid > 0) {
    ajax.post('al_friends.php', {act: 'add', mid: oid, hash: hash, from: 'wkview_extpage'}, reqOptions);
  } else {
    ajax.post('al_groups.php', {act: 'a_enter', gid: -oid, hash: hash, from: 'wkview_extpage'}, reqOptions);
  }
},

wallBeforeInitPost: function (opts) {
  if (window.tooltips) tooltips.destroyAll();

  if (wkcur.postInited) {
    return false;
  }
  wkcur.pageReplaced = [];
  var post = wkcur.post,
      postEl, size, postPlaceholder;
  while (true) {
    postEl = ge('post' + post);
    if (!postEl && cur.onepost && post == (cur.oid + '_' + cur.pid)) {
      postEl = ge('fw_post');
    }
    postEl = postEl || ge('reply_fakebox' + post) || ge('reply_box' + post) || ge('replies' + post) || ge('feedback_row_wall' + post) || (wkcur.hl_reply && (ge('post' + wkcur.hl_reply) || ge('feedback_row_wall_reply' + wkcur.hl_reply))) || ge('feed_rows');
    if (!postEl) {
      break;
    }
    size = getSize(postEl);
    postPlaceholder = ce('div', {className: 'wk_wall_post_placeholder', id: 'wk_wall_post_placeholder_' + postEl.id}, {width: size[0], height: size[1]});
    postEl.parentNode.replaceChild(postPlaceholder, postEl);
    wkcur.pageReplaced.push([postEl, postPlaceholder]);
  }

  cur.wallLayer = post;
  cur.wallLayerLike = wkcur.post_like;

  if (opts.options.wall_tpl) {
    extend(window.lang, opts.lang, opts.options.wall_tpl.lang);
    extend(wkcur, {
      wallType: opts.options.wall_type,
      wallTpl: opts.options.wall_tpl,
      wallMyDeleted: {},
      tsDiff: opts.options.wall_tpl && opts.options.wall_tpl.abs_timestamp ? Math.round((vkNow() / 1000 - opts.options.wall_tpl.abs_timestamp) / 900.0) * 900 : 0,
      wallMyOpened: {},
      wallMyReplied: {},
      wallMyRepliesCnt: 0
    });
    WkView.wallInitUpdates();
    wkcur.timeUpdateInt = setInterval(function () {Wall.updateTimes(wkcur.wkContent);}, 10000);
  }

  wkcur._hide.push(WkView.wallDeinitPost);

  wkcur.postInited = true;
},
wallAfterInitPost: function () {
  // debugLog('wall init', clone(wkcur));
  var post = wkcur.post,
      rf = ge('reply_field' + post);

  if (rf) {
    placeholderSetup(rf, {pad: {margin: 0, padding: 0}, editable: 1})
  }
  WkView.wallUpdateReplies();
  if (wkcur.hl_reply) {
    setTimeout(Wall.highlightReply.pbind('post' + wkcur.hl_reply), 0);
  } else {
    setTimeout(function () {
      wkLayerWrap.scrollTop = wkcur.toScroll || 0;
      wkcur.toScroll = 0;
    }, 0);
  }
},
wallDeinitPost: function () {
  // debugLog('wall deinit', clone(wkcur));
  if (!wkcur.postInited) {
    return false;
  }
  cur.wallLayer = false;
  cur.wallLayerLike = false;
  if (wkcur.edit) {
    Wall.cancelEdit();
  }
  each (wkcur.pageReplaced, function () {
    var postEl = this[0],
        postPlaceholder = this[1];
    if (postEl && postPlaceholder) {
      postPlaceholder.parentNode.replaceChild(postEl, postPlaceholder);
    }
  })

  clearInterval(wkcur.updatesCheckInt);
  clearInterval(wkcur.timeUpdateInt);

  if (window.tooltips) tooltips.destroyAll();

  delete cur.editing;
  delete wkcur.postInited;
},
wallOnEdit: function (post, options) {
  wkcur.edit = true;
  val('wk_edit_link', options.lang.pages_view);
  wkcur.editor = {changed: true};
},
wallOnEdited: function (post) {
  wkcur.edit = false;
  val('wk_edit_link', wkcur.editLang);
},
wallFixPost: function (link, hash, value) {
  var post = wkcur.post;
  ajax.post('al_wall.php', {act: 'a_fix_post', post: post, hash: hash, value: value}, {
    progress: ge('wpe_prg' + post),
    onDone: function () {
      val(link, wkcur.lang[value ? 'wall_unfix_post' : 'wall_fix_post']);
      link.onclick = function () {
        return WkView.wallFixPost(link, hash, value ? 0 : 1);
      }
    }
  });
  return false;
},
wallPostDelete: function(act, hash, force) {
  var post = wkcur.post;
  if (cur.wallMyDeleted) {
    cur.wallMyDeleted[post] = 1;
  }
  ajax.post('al_wall.php', {act: act, post: post, hash: hash, confirm: force ? 1 : 0, from: 'wkview'}, {onDone: function(msg, additional, need_confirm) {
    if (need_confirm) {
      var box = showFastBox(msg, need_confirm, getLang('global_delete'), function() { box.hide(); WkView.wallPostDelete(act, hash, 1); }, getLang('box_cancel'));
      return;
    }
    var p = ge('wl_post_body');
    if (!p) return;
    cur.pgPaused = true;
    hide('wl_replies_wrap', 'wl_post_actions_wrap', 'wl_reply_form_wrap');
    var del = p.nextSibling;
    if (del && hasClass(del, 'wl_post_deleted')) {
      val(del, msg);
    } else {
      p.parentNode.insertBefore(ce('div', {id: 'post_del' + post, innerHTML: msg, className: 'wl_post_deleted'}), p.nextSibling);
      hide(p);
    }
    wkLayerWrap.scrollTop = 0;
    if (act == 'spam') {
      eval(additional);
    }
  }, progress: ge('wpe_prg' + post)});
},
wallPostRestore: function(hash) {
  var post = wkcur.post;
  if (cur.wallMyDeleted) {
    cur.wallMyDeleted[post] = 0;
  }
  ajax.post('al_wall.php', {act: 'restore', post: post, hash: hash, from: 'wkview'}, {onDone: function() {
    var p = ge('wl_post_body');
    if (!p || isVisible(p)) return;
    cur.pgPaused = false;
    show('wl_replies_wrap', 'wl_post_actions_wrap', 'wl_reply_form_wrap');
    var del = p.nextSibling;
    show(p);
    if (del && hasClass(del, 'wl_post_deleted')) {
      re(del);
    }
  }});
},
wallUpdateRepliesOnScroll: function (resize) {
  if (!wkcur.postInited) return;
  var wndHeight = window.innerHeight || document.documentElement.clientHeight;

  var moreLink = ge('wl_replies_more_link');
  if (moreLink && isVisible(moreLink)) {
    var moreLinkY = getXY(moreLink, true)[1];
    if (wndHeight + 500 > moreLinkY) {
      moreLink.onclick();
    }
  }

  var replyForm = ge('wl_reply_form');
  if (!replyForm || hasClass(replyForm, 'wl_post_reply_form_forbidden')) {
    return;
  }
  var formWrap = ge('wl_reply_form_wrap'),
      formY = getXY(formWrap, true)[1],
      formSize = getSize(replyForm);
      formH = formSize[1];

  if (resize && wkcur.fixedBottom === false && wndHeight - formH < formY + 20) {
    wkLayerWrap.scrollTop += formY + 20 - (wndHeight - formH);
  } else if (isVisible(formWrap) && wndHeight - formH < formY) {
    if (!wkcur.fixedBottom || resize) {
      wkcur.fixedBottom = true;
      addClass(replyForm, 'wl_reply_form_fixed');
    }
    setStyle('wl_reply_form_wrap', {width: formSize[0], height: formSize[1], bottom: bottom});
    var bottom = Math.min(0, wndHeight - getXY('wl_replies_wrap', true)[1] - formH);
    setStyle(replyForm, {bottom: bottom});
  } else {
    if (wkcur.fixedBottom || resize) {
      wkcur.fixedBottom = false;
      removeClass(replyForm, 'wl_reply_form_fixed');
      setStyle('wl_reply_form_wrap', {width: '', height: ''});
    }
  }
  if (resize && wkcur.fixedBottom) {
    setStyle(replyForm, {left: getXY(wkcur.wkContent)[0] + 'px'})
  }
},
wallShowMoreReplies: function () {
  if (wkcur.loadingReplies) {
    return false;
  }
  var newOffset = wkcur.offset + wkcur.loaded,
      limit = wkcur.limit,
      repliesWrap = ge('replies' + wkcur.post);

  if (wkcur.count <= newOffset || !repliesWrap) {
    return false;
  }
  wkcur.loadingReplies = true;
  Wall.moreReplies(wkcur.post, (wkcur.reverse ? -1 : 1) * newOffset, limit, {
    from: 'wkview',
    append: true,
    rev: wkcur.reverse ? 1 : 0,
    onDone: function (replies, names, data) {
      // debugLog((wkcur.reverse ? -1 : 1) * newOffset, limit, data);
      extend(wkcur, {
        count: data.count,
        loaded: wkcur.loaded + data.num
      });
      WkView.wallUpdateReplies();
      wkcur.loadingReplies = false;
    },
    onFail: function () {
      wkcur.loadingReplies = false;
    },
    showProgress: function () {
      hide('wl_replies_more_link');
      show('wl_replies_more_progress');
    },
    hideProgress: function () {
      show('wl_replies_more_link');
      hide('wl_replies_more_progress');
    }
  });
  return false;
},
wallShowPreviousReplies: function (hlReply) {
  if (wkcur.loadingReplies || wkcur.reverse) {
    return false;
  }
  var maxLimit = 100,
      newOffset = Math.max(0, wkcur.offset - maxLimit),
      limit = Math.min(maxLimit, wkcur.offset - newOffset),
      repliesWrap = ge('replies' + wkcur.post);

  if (limit <= 0 || !repliesWrap) {
    return false;
  }
  wkcur.loadingReplies = true;
  var prevH = repliesWrap.offsetHeight;
  Wall.moreReplies(wkcur.post, newOffset, limit, {
    from: 'wkview',
    onDone: function (replies, names, data) {
      extend(wkcur, {
        count: data.count,
        offset: data.offset,
        loaded: wkcur.loaded + data.num
      });
      if (hlReply) {
        wkLayerWrap.scrollTop += repliesWrap.offsetHeight - prevH;
        setTimeout(Wall.highlightReply.pbind('post' + hlReply), 0);
      }
      WkView.wallUpdateReplies();
      wkcur.loadingReplies = false;
    },
    onFail: function () {
      wkcur.loadingReplies = false;
    },
    showProgress: function () {
      hide('wl_replies_header', 'wl_replies_header_toggler');
      show('wl_replies_previous_progress');
    },
    hideProgress: function () {
      show('wl_replies_header', 'wl_replies_header_toggler');
      hide('wl_replies_previous_progress');
    }
  });
},
wallUpdateReplies: function () {
  toggle('wl_replies_more_link', wkcur.offset + wkcur.loaded < wkcur.count);

  var header = ge('wl_replies_header'),
      label = langNumeric(wkcur.count, wkcur.lang.wall_N_replies),
      hasPrevious = false;

  if (!wkcur.reverse && wkcur.offset > 0) {
    if (wkcur.offset > 100) {
      label = langNumeric(100, wkcur.lang.wall_show_n_of_m_last).replace('{count}', wkcur.count);
    } else {
      label = langNumeric(wkcur.count, wkcur.lang.wall_show_all_n_replies);
    }
    hasPrevious = true;
  }
  val('wl_replies_header_label', label);
  toggleClass(header, 'wl_replies_header_clickable', hasPrevious);

  var repliesWrap = ge('wl_replies_wrap'),
      form = ge('wl_reply_form');
  if (wkcur.count && repliesWrap && !isVisible(repliesWrap.firstChild)) {
    show(repliesWrap.firstChild);
  }
  if (form) {
    var formPlace1 = ge('wl_reply_form_reverse_wrap'),
        formPlace2 = ge('wl_reply_form_wrap'),
        formPlace = wkcur.reverse && repliesWrap && isVisible(repliesWrap.firstChild) && formPlace1 || formPlace2;

    toggle(formPlace1, formPlace == formPlace1);
    toggle(formPlace2, formPlace == formPlace2);
    toggleClass(form, 'wl_reply_form_reversed', formPlace == formPlace1);
    if (form.parentNode != formPlace) {
      formPlace.appendChild(form);
    }
  }

  WkView.wallUpdateRepliesOnScroll();
  WkView.updateSize();
},
wallInitUpdates: function () {
  var key = wkcur.options.add_queue_key;
  if (!key || !window.Notifier) {
    return;
  }
  var wasKey = wkcur.wallAddQueue,
      checkCb = function () {
        if (wkcur.wallAddQueue) Notifier.addKey(wkcur.wallAddQueue, Wall.updated.pbind(true));
      };

  wkcur.wallAddQueue = key;
  checkCb();
  wkcur.updatesCheckInt = setInterval(checkCb, 10000);
},
wallCancelEditReply: function () {
  var post = wkcur.post,
      rf = ge('reply_field' + post),
      composer = rf && data(rf, 'composer');
  if (composer) {
    Composer.reset(composer);
  } else {
    val(rf, '');
  }
  Wall.hideEditReply(post);
  WkView.wallUpdateReplies();
},
wallInverseReplies: function () {
  if (wkcur.loadingReplies) {
    return false;
  }
  wkcur.loadingReplies = true;
  wkcur.reverse = !wkcur.reverse;
  wkcur.offset = 0;

  Wall.moreReplies(wkcur.post, wkcur.offset, wkcur.limit, {
    from: 'wkview',
    clear: true,
    rev: wkcur.reverse ? 1 : 0,
    onDone: function (replies, names, data) {
      toggleClass('wl_replies_header_toggler', 'wl_replies_header_toggler_inversed', wkcur.reverse);
      extend(wkcur, {
        count: data.count,
        loaded: data.num
      });
      WkView.wallUpdateReplies();
      wkcur.loadingReplies = false;
    },
    onFail: function () {
      wkcur.reverse = !wkcur.reverse;
      wkcur.loadingReplies = false;
    },
    showProgress: function () {
      hide('wl_replies_header', 'wl_replies_header_toggler');
      show('wl_replies_previous_progress');
    },
    hideProgress: function () {
      show('wl_replies_header', 'wl_replies_header_toggler');
      hide('wl_replies_previous_progress');
    }
  });
},

likesInit: function () {
  extend(wkcur, {
    phCache: {},
    phShown: {},
    historyLen: wkcur.historyLen || 0
  });
  WkView.initSTL();
  WkView.likesTabInit();

  addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
  addEvent(window, 'resize', WkView.onResize);
  onBodyResize();

  if (!cur.wallInited) {
    Wall.initWallOptions(wkcur.wall_opts);
  } else {
    wkcur._oldReplyForm = cur.wallTpl.reply_form;
    cur.wallTpl.reply_form = wkcur.wall_opts.wall_tpl.reply_form;
  }

  if (cur.options === undefined) {
    cur.options = {reply_names: {}};
  } else if (cur.options.reply_names === undefined) {
    cur.options.reply_names = {};
  }
  extend(cur.options.reply_names, wkcur.reply_names);

  wkcur._hide.push(function () {
    removeEvent(wkLayerWrap, 'scroll', WkView.onScroll);
    removeEvent(window, 'resize', WkView.onResize);
    if (wkcur._oldReplyForm) {
      cur.wallTpl.reply_form = wkcur._oldReplyForm;
      wkcur._oldReplyForm = false;
    }
  });
},
likesTabInit: function () {
  if (wkcur.preload) {
    ajax.preload('wkview.php', {
      act: 'show',
      w: wkcur.wkRaw,
      offset: wkcur.offset
    }, wkcur.preload);
  }
},
likesTab: function (tab) {
  ajax.post('wkview.php', {act: 'show', w: tab + '/' + wkcur.like_obj, part: 1}, {
    cache: 1,
    showProgress: setStyle.pbind('wk_likes_tabs_prg', {visibility: 'visible'}),
    hideProgress: setStyle.pbind('wk_likes_tabs_prg', {visibility: 'hidden'}),
    onDone: function (title, content, options) {
      val('wk_likes_title', title);
      val('wk_likes_content', content);
      extend(wkcur, options);
      WkView.likesTabInit();

      var oldTab = geByClass1('summary_tab_sel', ge('wk_likes_tabs')),
          newTab = ge('wk_likes_tab' + tab);
      replaceClass(oldTab, 'summary_tab_sel', 'summary_tab');
      replaceClass(newTab.parentNode, 'summary_tab', 'summary_tab_sel');

      WkView.setLocation();
      WkView.updateHeight();
      WkView.likesOnScroll();
    }
  });
},
likesPreload: function () {
  ajax.post('wkview.php', {act: 'show', w: wkcur.wkRaw, offset: wkcur.offset}, {cache: 1});
},
likesMore: function() {
  if (isVisible('wk_likes_more_prg')) return;
  ajax.post('wkview.php', {act: 'show', w: wkcur.wkRaw, offset: wkcur.offset}, {
    onDone: function(rows, newOffset, needMore, names, noReplies) {
      var cnt = ge('wk_likes_rows');
      if (!cnt) return;

      if (noReplies) { // show all posts with hidden replies
        var hidden = geByClass('wk_likes_hidden', cnt);
        for (var i = 0, l = hidden.length; i < l; ++i) {
          cnt.appendChild(hidden[i]);
          removeClass(hidden[i], 'wk_likes_hidden');
        }
      }

      cnt.appendChild(cf(rows));
      wkcur.offset = newOffset;
      if (needMore) {
        WkView.likesPreload();
      } else {
        hide('wk_likes_more_link');
      }
      WkView.updateHeight();
      if (names) {
        extend(cur.options.reply_names, names);
      }
    }, showProgress: function() {
      hide('wk_likes_more_link');
      show('wk_likes_more_prg');
    }, hideProgress: function() {
      show('wk_likes_more_link');
      hide('wk_likes_more_prg');
    }, cache: 1
  });
},
likesBigphOver: function(obj, uid) {
  if (!wkcur.lang || !wkcur.lang.global_photo_full_size || browser.mobile) return;
  var o = obj.firstChild,
      ch = wkcur.phCache[uid];
  if (o.tagName != 'A' || o.className != 'wk_likes_likerph') {
    o = obj.insertBefore(ce('a', {className: 'wk_likes_likerph', href: ch && ch._id ? ('/photo' + ch._id + '?all=1') : ('/albums' + uid), innerHTML: '<span class="wk_likes_likerph_label">' + wkcur.lang.global_photo_full_size + '</span>'}), obj.firstChild);
    o.onclick = WkView.likesBigphClick.pbind(uid);
    o._uid = uid;
  }

  clearTimeout(o.hideTO);
  animate(o, {marginTop: 75}, {duration: 200, transition: Fx.Transitions.easeOutCirc});
  wkcur.phShown[uid] = o;

  if (!obj.onmouseout) obj.onmouseout = WkView.likesBigphOut.pbind(obj);
},
likesBigphOut: function(obj) {
  var o = obj.firstChild;
  if (!o || o.tagName != 'A' || o.className != 'wk_likes_likerph') return;

  clearTimeout(o.hideTO);
  o.hideTO = setTimeout(function() {
    animate(o, {marginTop: 100}, 200);
    delete(wkcur.phShown[o._uid]);
  }, 150);
},
likesBigphClick: function(uid, ev) {
  if (checkEvent(ev) !== false) return;

  var ch = wkcur.phCache[uid]
      o = wkcur.phShown[uid],
      obj = domPN(o);

  if (!o || !obj) return;
  if (ch === undefined) {
    ch = wkcur.phCache[uid] = 'show';
    ajax.post('al_photos.php', {act: 'fast_get_photo', oid: uid}, {onDone: function(res) {
      if (!res) {
        obj.onmouseover = function() {};
        re(o);
        return;
      }
      var sh = (wkcur.phCache[uid] == 'show');
      wkcur.phCache[uid] = res;
      o.href = '/photo' + res._id + '?all=1';
      if (sh) WkView.likesBigphClick(uid);
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
  extend(ch, {
    jumpTo: {z: 'albums' + uid},
    queue: 1
  });
  return showPhoto(ch._id, 'album' + uid + '_0/rev', ch, ev);
},
likesOnScroll: function (resize) {
  var bt = lastWindowHeight,
      objMore = ge('wk_likes_more_link');
  if (isVisible(objMore) && (bt > getXY(objMore, true)[1])) {
    objMore.click();
  }
},
likesBlacklistTip: function (el) {
  showTooltip(el, {
    text: wkcur.lang.like_block_liker,
    shift: [13, 1, 1],
    black: 1
  });
},
likesBlacklist: function (el, oid, event) {
  if (el.tt && el.tt.destroy) el.tt.destroy();
  showBox('like.php', {act: 'spam', mid: oid, object: wkcur.like_obj});
  return cancelEvent(event);
},
likesRecache: function(d) {
  wkcur.offset += d;
  for (var i in ajaxCache) {
    if (i.match(new RegExp('^\\/wkview\.php\\#act=show', ''))) {
      delete(ajaxCache[i]);
    }
  }
},
likesRemove: function(oid) {
  re('wk_likes_liker_row' + oid);
  WkView.likesRecache(-1);
  WkView.onScroll();
  if (!domFC(ge('wk_likes_rows'))) {
    location.reload();
  }
},

historyInit: function () {
  addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
  addEvent(window, 'resize', WkView.onResize);
  onBodyResize();

  wkcur._hide.push(function () {
    removeEvent(wkLayerWrap, 'scroll', WkView.onScroll);
    removeEvent(window, 'resize', WkView.onResize);
  });
},
historyOnScroll: function () {
  if (wkcur.loadingHistory) {
    return false;
  }
  var wndHeight = window.innerHeight || document.documentElement.clientHeight;

  var moreLink = ge('wk_history_more_link');
  if (moreLink && isVisible(moreLink)) {
    var moreLinkY = getXY(moreLink, true)[1];
    if (wndHeight + 500 > moreLinkY) {
      moreLink.onclick();
    }
  }
},
historyShowMore: function () {
  if (wkcur.loadingHistory) {
    return false;
  }
  var newOffset = wkcur.offset;
  wkcur.loadingHistory = true;
  ajax.post('wkview.php', {act: 'show', w: wkcur.wkRaw, offset: newOffset, part: 1}, {
    onDone: function (options, rows) {
      extend(wkcur, options);
      ge('wk_history_rows').appendChild(cf(rows));
      setTimeout(WkView.historyOnScroll, 500);

      toggle('wk_history_more_link', wkcur.offset < wkcur.count);
      toggle('wk_history_empty', wkcur.offset >= wkcur.count && !domFC(ge('wk_history_rows')));
      toggleClass('wk_history_more', 'wk_history_more_loading', wkcur.offset < wkcur.count && !domFC(ge('wk_history_rows')));
      wkcur.loadingHistory = false;
    },
    onFail: function () {
      wkcur.loadingHistory = false;
    },
    showProgress: function () {
      hide('wk_history_more_link');
      show('wk_history_more_progress');
    },
    hideProgress: function () {
      show('wk_history_more_link');
      hide('wk_history_more_progress');
    }
  });

  return false;
},

activate: function(arrow) {
  if (arrow && arrow.timeout) {
    clearTimeout(arrow.timeout);
    removeAttr(arrow, 'timeout');
  } else if (isVisible(arrow)) {
    fadeTo(arrow, 200, vk.pvdark ? 1 : 0.7);
  }
},

deactivate: function(arrow) {
  if (!arrow || !isVisible(arrow) || arrow.timeout) {
    return;
  }
  arrow.timeout = setTimeout(function() {
    removeAttr(arrow, 'timeout');
    fadeTo(arrow, 200, 0.4);
  }, 1);
},

activateArrow: function (next, event) {
  var arrow = wkcur[next ? 'wkRightArrow' : 'wkLeftArrow'],
      bg = wkcur[next ? 'wkRightArrowBg' : 'wkLeftArrowBg'].firstChild;

  if (arrow && arrow.timeout) {
    clearTimeout(arrow.timeout);
    removeAttr(arrow, 'timeout');
  } else if (isVisible(arrow)) {
    wkcur.arrowOver = next;
    fadeTo(arrow, 200, vk.pvdark ? 1 : 0.7);
    fadeTo(bg, 200, 0.15);
  }
  WkView.preloadArrow(next);
  cancelEvent(event);
},
preloadArrow: function (next) {
  var arrow = wkcur[next ? 'wkRightArrow' : 'wkLeftArrow'];

  if (!arrow.cached) {
    arrow.cached = true;
    var actions = WkView.getNextWkRaws(),
        preloadWkRaw = actions[next ? 1 : 0];

    if (preloadWkRaw) {
      ajax.post('wkview.php', extend({act: 'show', loc: nav.objLoc[0]}, {w: preloadWkRaw}), {cache: 1});
    }
  }
},
deactivateArrow: function (next, event) {
  var arrow = wkcur[next ? 'wkRightArrow' : 'wkLeftArrow'],
      bg = wkcur[next ? 'wkRightArrowBg' : 'wkLeftArrowBg'].firstChild;

  if (!arrow || !isVisible(arrow) || arrow.timeout || (wkcur.arrowClicked && (vkNow() - wkcur.arrowClicked < 100))) {
    return;
  }

  delete wkcur.arrowOver;
  arrow.timeout = setTimeout(function() {
    removeAttr(arrow, 'timeout');
    fadeTo(arrow, 200, 0.4);
    fadeTo(bg, 200, 0);
  }, 1);
  cancelEvent(event);
},

back: function() {
  if (wkcur.historyLen > 1) {
    wkcur.doBack = 1;
    wkcur.historyLen -= 1;
    history.go(-1);
    return true;
  } else {
    WkView.hide();
  }
},

initSTL: function() {
  re(cur.lSTL);
  extend(wkcur, {
    lSTL: wkLayerWrap.appendChild(ce('div', {id: 'layer_stl', innerHTML: '<div id="layer_stl_bg" class="fixed"></div><div id="layer_stl_cl"></div><nobr id="layer_stl_text" class="fixed">' + getLang('global_to_top') + '</nobr>', el: ge('wk_box'), onclick: cancelEvent, onmousedown: WkView.stlDown, sc: WkView.stlOnScroll})),
    lSTLShown: 0,
    lSTLWas: 0,
    lSTLWasSet: 0
  });
  cur.lSTL = wkcur.lSTL;

  wkcur._hide.push(function () {
    re(wkcur.lSTL, cur.lSTL);
  });
},
stlDown: function(e) {
  e = e || window.event;
  if (checkEvent(e)) return;

  if (!__afterFocus) {
    if (wkcur.lSTLWasSet && wkcur.lSTLWas) {
      var to = wkcur.lSTLWas;
      wkcur.lSTLWas = 0;
      wkLayerWrap.scrollTop = to;
    } else {
      wkcur.lSTLWas = wkLayerWrap.scrollTop;
      wkLayerWrap.scrollTop = 0;
    }
  }
  return cancelEvent(e);
},
stlOnScroll: function (resize) {
  var st = wkLayerWrap.scrollTop,
      mx = 200,
      vis = wkcur.lSTLWas || (st > mx),
      o = 0;

  wkcur.lSTL.style.marginTop = st + 'px';
  if (!vis) {
    if (wkcur.lSTLShown !== 0) {
      hide(wkcur.lSTL);
      wkcur.lSTLShown = 0;
    }
  } else {
    if (wkcur.lSTLShown !== 1) {
      show(wkcur.lSTL);
      wkcur.lSTLShown = 1;
    }
    if (wkcur.lSTLWas && st > 500) {
      wkcur.lSTLWas = 0;
    }
    if (st > mx) {
      o = (st - mx) / mx;
      if (wkcur.lSTLWasSet) {
        wkcur.lSTLWasSet = 0;
        val(domLC(wkcur.lSTL), getLang('global_to_top'));
        removeClass(domLC(wkcur.lSTL), 'down');
      }
    } else {
      o = (mx - st) / mx;
      if (wkcur.lSTLWas) {
        if (!wkcur.lSTLWasSet) {
          wkcur.lSTLWasSet = 1;
          val(domLC(wkcur.lSTL), '');
          addClass(domLC(wkcur.lSTL), 'down');
        }
      }
    }
  }
  if (wkcur.wkLeft && wkcur.wkLeftNav) {
    var showLeft = wkcur.historyLen > 1 && !vis;
    toggle(wkcur.wkLeft, showLeft);
    toggle(wkcur.wkLeftNav, showLeft);
    setStyle(wkcur.wkLeftWrap, {opacity: 1 - Math.min(Math.max(st / mx, 0), 1)});
    if (!showLeft) {
      setStyle(wkcur.wkLeft, {opacity: 0.4});
    }
  }
  setStyle(wkcur.lSTL, {opacity: Math.min(Math.max(o, 0), 1)});
},


_eof: 1};try{stManager.done('wkview.js');}catch(e){}
