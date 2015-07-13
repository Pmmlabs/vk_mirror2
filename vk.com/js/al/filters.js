var Filters = {

init: function(opts, vars, filterSaveOptions, filterParams, customOpts, photo, hash) {
  stManager.add(['btagger.css', 'btagger.js']);
  cur.settingsMoreShown = false;

  if (cur.pvTagger && window.Phototag) {
    Phototag.stopTag();
  }

  cur.cropActs = ge('pv_crop_actions');
  var params = {
    'allowScriptAccess': 'always',
    'bgcolor': '#FFFFFF',
    'wmode': 'opaque',
    'scale': 'noscale',
    'quality': 'best',
    'salign': 'tl'
  };
  var box = curBox();
  if (box) {
    box.setOptions({
      onHideAttempt: function() {
        cur.startedCrop = false;
        cur.filtersBlur = 0;
        cur.blurShown = false;
        cur.lastCrop = false;
        cur.filtersAmount = false;
        cur.amountSize = false;
        return true;
      }
    });
  }
  cur.filterPhoto = photo;
  cur.filterHash = hash;

  var res = renderFlash('pv_filter_cont', opts, params, vars);
  if (!res) {
    hide('pv_filter_wrap');
    hide('pv_filter_roll');
    show('pv_other_settings');
    hide(geByClass1('pv_change_setting', box.bodyNode));
    setStyle(ge('pv_filter_panel'), {marginTop: 10});
    return;
  }
  cur.filtersFont = ls.get('filter_font');
  if (cur.filtersFont == undefined) {
    cur.filtersFont = 1;
  } else {
    ge('pv_filter_font').className = 'pv_filter_font pv_filter_font'+cur.filtersFont;
  }
  cur.filterFl = ge('pv_filter_embed');
  cur.filterApplied = 0;
  cur.filterSaveOptions = filterSaveOptions;
  cur.filterParams = filterParams;
  cur.customOpts = customOpts;
  cur.filterUnderLeft = 0;

  if (cur.filterParams.disableCrop) {
    var cr = geByClass1('pv_filter_crop', ge('pv_filters_cont'));
    hide(cr);
    addClass(cr.parentNode, 'pv_filter_no_crop');
  }

  var callbacks = {
    onComplete: function(str) {
      if (!str) {
        return;
      }
      var info = parseJSON(str);
      if (!info) {
        return;
      }
      if (info.bwact == 'album_photo') { // signed
        Filters.save(str);
      } else {
        Filters.save(info);
      }
    },
    setSize: function(width, height) {
      cur.preventCrop = (width < 200 || height < 200);
      setStyle(cur.filterFl, {height: height+'px'});
      cur.filterUnderLeft = ((604 - width) / 2);
      setStyle(ge('pv_filter_under'), {height: height+'px', padding: '0px '+cur.filterUnderLeft+'px', width: width+'px'});
      setStyle(ge('pv_filter_photo_inner'), {width: width+'px', height: height+'px'});
      if (height < 150) {
        hide('pv_filters_cont');
      } else {
        show('pv_filters_cont');
      }
    },
    startCrop: function() {
      if (cur.preventCrop) {
        showDoneBox('<center>'+getLang('photos_too_small')+'</center>');
        return false;
      }
      var move = function(s) {
        var params = {marginTop: s.t + (s.h / 2) - 25};
        if (vk.rtl) {
          params.marginRight = s.r + (s.w / 2) - 50 + cur.filterUnderLeft;
        } else {
          params.marginLeft = s.l + (s.w / 2) - 50 + cur.filterUnderLeft;
        }
        setStyle(cur.cropActs, params);
        fadeIn(cur.cropActs, 150);
      }
      var taggerOpts = {
        onStart: move,
        onMove: move,
        onMoveStart: function(s) {
          var params = {marginTop: s.t + (s.h / 2) - 25};
          if (vk.rtl) {
            params.marginRight = s.r + (s.w / 2) - 50 + cur.filterUnderLeft;
          } else {
            params.marginLeft = s.l + (s.w / 2) - 50 + cur.filterUnderLeft;
          }
          setStyle(cur.cropActs, params);
          fadeOut(cur.cropActs, 150);
        }
      }
      if (cur.lastCrop) {
        taggerOpts.s = cur.lastCrop;
      }
      cur.btagger = new BTagger('pv_filter_photo_inner', taggerOpts)
      fadeOut(ge('pv_filters_cont'), 150);
    },
    textSize: function(w, h) {
      cur.textHeight = h;
      Filters.onTextResize();
    },
    onInit: function() {
      if (filterParams.settings) {
        Filters.fromStr(filterParams.settings);
      }
    }
  };
  if (cur.pvPhoto && cur.pvPhoto.firstChild) {
    var size = getSize(cur.pvPhoto.firstChild);
    if (size[0] > 604) {
      size[1] = size[1] * 604 / size[0];
      size[0] = 604;
    }
    callbacks.setSize(size[0], size[1]);
  }

  cur.filtersCallback = function(args) {
    method = args.shift();
    if (callbacks[method]) {
      callbacks[method].apply(this, args);
    } else {
      debugLog('method '+method+' not found');
    }
  }

  autosizeSetup('pv_filter_text_ta', {maxHeight: 300, onResize: Filters.onTextResize})
},

filtersAct: function(obj, state) {
  cssAnim(obj, {opacity: state ? 1 : 0.85}, {duration: 100});
},

showMoreSettings: function(obj) {
  if (!cur.settingsMoreShown) {
    slideDown('pv_other_settings', 200);
    cur.settingsMoreShown = true;
    obj.innerHTML = getLang('photos_hide_change_setting');
  } else {
    slideUp('pv_other_settings', 200);
    cur.settingsMoreShown = false;
    obj.innerHTML = getLang('photos_change_setting');
  }
},

filterCrop: function(ev) {
  if (cur.startedCrop) {
    return;
  }
  cur.startedCrop = true;
  if (cur.filterParams.disableCrop) return;
  stManager.add(['btagger.css', 'btagger.js'], function() {
    cur.filterFl.originalCrop();
    cur.filterCropped = false;
  });
  return cancelEvent(ev);
},

doCrop: function() {
  cur.startedCrop = false;
  cur.lastCrop = cur.btagger.getOpts();
  Filters.cancelCrop();
  cur.filterFl.crop(cur.lastCrop);
  cur.fBlurPos = false;
  cur.filterCropped = true;
},

cancelCrop: function() {
  cur.startedCrop = false;
  fadeOut(cur.cropActs, 150);
  cur.lastCrop = cur.btagger.getOpts();
  cur.btagger.hide();
  fadeIn(ge('pv_filters_cont'), 150);
},

hideBlur: function() {
  debugLog('hideBlur');
  var blurCont = ge('pv_filter_blur_sl');
  var under = ge('pv_filter_under');
  setTimeout(function() {
    debugLog('hideBlurDoing');
    if (!cur.blurShown) {
      return true;
    }
    var params = {opacity: 0, width: 0};
    params[vk.rtl ? 'marginRight' : 'marginLeft'] = 24;
    if (isVisible(ge('pv_filters_cont'))) {
      cssAnim(blurCont, params, {duration: 100}, function() {
        hide(blurCont);
      });
    } else {
      setStyle(blurCont, params);
    }
    /*cur.filtersBlur = 0;
    cur.filterFl.setBlur(cur.blurType || 1, cur.filtersBlur, 0, 0);*/
    cur.blurShown = false;
    removeClass(under, 'pv_filter_pointer');
    removeEvent(under, 'click mousemove', Filters.setBlurPos);
    removeEvent(under, 'mousedown');
  }, 0);
},

showBlur: function(ev) {
  var blurCont = ge('pv_filter_blur_sl');
  var under = ge('pv_filter_under');
  if (cur.blurShown) {
    return true;
  }
  show(blurCont);
  var params = {width: 100, opacity: 1}
  params[vk.rtl ? 'marginRight' : 'marginLeft'] = 40;
  cssAnim(blurCont, params, {duration: 100}, function() {});
  cur.blurShown = true;
  Filters.setBlur();
  addClass(under, 'pv_filter_pointer');
  addEvent(under, 'mousedown mousemove', Filters.setBlurPos);
  var onMouseUp = function(){
    cur.mouseDown = false;
    removeEvent(window, 'mouseup', onMouseUp);
  };
  addEvent(under, 'mousedown', function(){
    cur.mouseDown = true;
    addEvent(window, 'mouseup', onMouseUp);
  });
  addEvent(under, 'mouseup', function(){
    cur.mouseDown = false;
  });
  elfocus('pv_focus_blur');
  return cancelEvent(ev);
},

hideText: function() {
  var textCont = ge('pv_filter_text_sl')
  setTimeout(function() {
    if (!cur.textShown) {
      return false;
    }
    var params = {opacity: 0, width: 0};
    params[vk.rtl ? 'marginRight' : 'marginLeft'] = 24;
    if (isVisible(ge('pv_filters_cont'))) {
      cssAnim(textCont, params, {duration: 100}, function() {
        hide(textCont);
      });
    } else {
      setStyle(textCont, params);
    }
    cur.textShown = false;
  }, 0);
},

showText: function(ev) {
  if (cur.textShown) {
    Filters.hideText();
    return true;
  }
  var textCont = ge('pv_filter_text_sl')
  show(textCont);
  var params = {width: 215, opacity: 1}
  params[vk.rtl ? 'marginRight' : 'marginLeft'] = 40;
  cssAnim(textCont, params, {duration: 100}, function() {
    elfocus('pv_filter_text_ta');
  });
  cur.textShown = true;
  return cancelEvent(ev);
},

switchFont: function(btn, ev) {
  cur.filtersFont = parseInt(cur.filtersFont) ? 0 : 1;
  Filters.updateText(false, ev);
  ls.set('filter_font', cur.filtersFont);
  btn.className = 'pv_filter_font pv_filter_font'+cur.filtersFont;
  return cancelEvent(ev);
},

updateText: function(force, ev) {
  if (ev && ev.keyCode == KEY.RETURN && (ev.ctrlKey || ev.metaKey)) {
    Filters.showText(ev);
  }
  setTimeout(function() {
    var ta = ge('pv_filter_text_ta');
    var txt = val(ta) || '';
    if (txt.length > 140) {
      txt = txt.substr(0, 140);
      val(ta, txt);
    }
    cur.filterText = txt;
    if (!cur.filterFl.setText) {
      return false;
    }
    cur.filterFl.setText(txt, cur.filtersFont, force || 0);
  }, 0);
},

onTextResize: function() {
  var textCont = ge('pv_filter_text_sl');
  var size = getSize(textCont);
  var minTop = cur.filterParams.disableCrop ? 34 : 4;
  setStyle(textCont, {marginTop: Math.min(105 - cur.textHeight - size[1], minTop)});
},

showSetts: function() {
  /*if (cur.blurShown) {
    cssAnim(ge('pv_filter_blur_sl'), {opacity: 1}, {duration: 200});
  }*/
},

hideSetts: function() {
  /*if (cur.blurShown && !cur.fBg) {
    cssAnim(ge('pv_filter_blur_sl'), {opacity: 0}, {duration: 200});
  }*/
},

startSlideEdit: function(obj, type, evSt) {
  var line = geByClass1('pv_blur_line', obj);
  var x = evSt.pageX - getXY(geByClass1('pv_blur_back', obj))[0];
  if (vk.rtl) {
    x = 86 - x;
  }
  var posx = evSt.pageX;
  if (type == 1) {
    var lineMin = 0;
    var lineMax = 82;
    if (x > 86) {
      return Filters.changeBlurType(ge('pv_blur_switch'), evSt);
    }
  } else {
    if (!hasClass(obj, 'pv_level_shown')) {
      return true;
    }
    var lineMin = 3;
    var lineMax = 66;
  }
  cur.fBg = bodyNode.appendChild(ce('div', {className: 'pv_filter_bg no_select'}, {
    width: Math.max(intval(window.innerWidth), intval(document.documentElement.clientWidth)),
    height: Math.max(intval(window.innerHeight), intval(document.documentElement.clientHeight)),
    cursor: 'pointer'
  }));
  setStyle(line, {width: Math.min(Math.max(x, lineMin), lineMax)});
  addClass(obj, 'pv_filter_down');
  var stW = intval(getStyle(line, 'width'));
  addEvent(cur.fBg, 'mousemove', function(ev) {
    var diffx = posx - ev.pageX;
    if (vk.rtl) {
      diffx = -diffx;
    }
    setStyle(line, {width: Math.max(Math.min(stW - diffx, lineMax), lineMin)});
    if (type == 1) {
      Filters.setBlur();
    } else if (type == 2) {
      Filters.setAmount(obj);
    }
    return cancelEvent(ev);
  });
  addEvent(cur.fBg, 'mouseup', function(ev) {
    removeEvent(cur.fBg, 'mouseup');
    removeEvent(cur.fBg, 'mousemove');
    re(cur.fBg);
    cur.fBg = false;
    removeClass(obj, 'pv_filter_down');
  });
  if (type == 1) {
    Filters.setBlur();
  } else if (type == 2) {
    Filters.setAmount(obj);
  }
  return cancelEvent(evSt);
},

changeBlurType: function(ev) {
  cur.blurType = (cur.blurType || 1) + 1;
  if (cur.blurType > 2) {
    cur.blurType = 1;
  }
  setStyle(ge('pv_blur_switch'), {backgroundPosition: '0px '+(-34 - cur.blurType * 9)+ 'px'});
  Filters.setBlur();
  return cancelEvent(ev);
},

setBlur: function() {
  var maxSize = getSize('pv_blur_back')[0];
  var size = getSize('pv_blur_line')[0];
  cur.filtersBlur = (size / maxSize) * 100;
  var underSize = getSize(ge('pv_filter_under'));
  if (!cur.fBlurPos) {
    cur.fBlurPos = [0.5, 0.5];
  }

  debugLog('set blur', cur.fBlurPos);
  if (cur.blurTimeout) {
    return;
  }
  cur.blurTimeout = setTimeout(function() {
    cur.filterFl.setBlur(cur.blurType || 1, cur.filtersBlur, cur.fBlurPos[0], cur.fBlurPos[1]);
    cur.blurTimeout = false;
  }, 5);
},

setAmount: function(obj, fast) {
  var maxSize = getSize(geByClass1('pv_blur_back', obj))[0];
  cur.amountSize = getSize(geByClass1('pv_blur_line', obj))[0];
  cur.filtersAmount = cur.amountSize / maxSize;
  cur.filtersAmount = 0.8 - cur.filtersAmount * 0.8;
  if (fast) {
    cur.filterFl.setAmount(cur.filtersAmount);
    return;
  }
  if (cur.amountTimeout) {
    return;
  }
  cur.amountTimeout = setTimeout(function() {
    cur.filterFl.setAmount(cur.filtersAmount);
    cur.amountTimeout = false;
  }, 5);
},

setBlurPos: function(ev) {
  if (ev.type == 'mousemove' && !cur.mouseDown) {
    return cancelEvent(ev);
  }
  var under = ge('pv_filter_under');
  var offset = getXY(under);
  var underSize = getSize(under);
  cur.fBlurPos = [(ev.pageX - offset[0]) / underSize[0], (ev.pageY - offset[1]) / underSize[1]];
  Filters.setBlur();
  elfocus('pv_focus_blur');
  return cancelEvent(ev);
},

applyCustom: function() {
  if (cur.filterApplied || cur.filtersBlur) {
    cur.filterFl.restoreOriginal();
    cur.filterApplied = 0;
  }
  cur.customOpts[cur.customNum][0] = val('pv_fl_brightness')
  cur.customOpts[cur.customNum][1] = val('pv_fl_contrast')
  cur.customOpts[cur.customNum][2] = val('pv_fl_saturation')
  cur.customOpts[cur.customNum][3] = val('pv_fl_sepia')
  cur.customOpts[cur.customNum][4] = val('pv_fl_vig1')
  cur.customOpts[cur.customNum][5] = val('pv_fl_vig2')
  cur.customOpts[cur.customNum][6] = val('pv_fl_color1')
  cur.customOpts[cur.customNum][7] = val('pv_fl_color2')
  cur.customOpts[cur.customNum][8] = val('pv_fl_color3')
  var flOpts = cur.customOpts[cur.customNum];
  cur.filterFl.addFilter('brightness', flOpts[0]);
  cur.filterFl.addFilter('contrast', flOpts[1]);
  cur.filterFl.addFilter('saturation', flOpts[2]);
  cur.filterFl.addFilter('sepia', flOpts[3]);
  cur.filterFl.addFilter('vignette', flOpts[4], flOpts[5]);
  cur.filterFl.addFilter('color', flOpts[6], flOpts[7], flOpts[8]);

  cur.filterApplied = -1;
  cur.filterFl.applyFilter(true);

  clearTimeout(cur.saveCustomTimeout);
  cur.saveCustomTimeout = setTimeout(Filters.saveCustom, 1000);
},

saveCustom: function(share) {
  var saveParams = {act: 'save_custom_filters', share: share ? 1 : 0, num: cur.customNum};
  for (i in cur.customOpts) {
    saveParams['filter_'+i] = cur.customOpts[i].join(',');
  }
  ajax.post('al_photos.php', saveParams, {})
},

hideLevels: function(obj) {
  var filterLevel = geByClass('pv_filter_level', ge('pv_filter_roll'))
  for(var i in filterLevel) {
    if (!hasClass(filterLevel[i], 'pv_level_shown') && filterLevel[i].parentNode != obj) {
      cssAnim(filterLevel[i], {height: 0, marginTop: 0, opacity: 0}, {duration: 200});
    }
  }
},

getLevelCont: function(obj, txt) {
  var filterLevel = geByClass1('pv_filter_level', obj)
  if (!filterLevel) {
    var filterLevel = ce('div', {
      className: 'pv_filter_level',
      innerHTML: '<div class="pv_filter_level_txt"></div><div class="pv_blur_back"><div class="pv_blur_line" style="width: 36px;"><div class="pv_blur_slider"></div></div></div>'
    });
    obj.appendChild(filterLevel);
    addEvent(filterLevel, 'mousedown', Filters.startSlideEdit.pbind(filterLevel, 2));
  }
  var filterLevelText = geByClass1('pv_filter_level_txt', obj)
  filterLevelText.innerHTML = txt;
  return filterLevel;
},

showLevel: function(obj) {
  var filterLevel = Filters.getLevelCont(obj);
  removeClass(filterLevel, 'pv_level_before_hide');
  show(filterLevel);
  addClass(filterLevel, 'pv_level_shown');
  var line = geByClass1('pv_blur_line', obj);
  setStyle(line, {width: cur.amountSize});
  cssAnim(filterLevel, {height: 15, marginTop: -15, opacity: 1}, {duration: 250});
},

fromStr: function(str) {
  var params = str.split('/');

  if (params[0] == 'f' || params[0] == 'p') {
    return;
  }

  var fl = params[0].split(',');
  var filterNum = intval(fl[0]);
  var amount = intval(fl[1]);
  cur.filtersAmount = amount / 100;

  var cr = params[2].split(',');
  if (params[2] && cr && cr.length) {
    cur.lastCrop = {t: intval(cr[0]), l: intval(cr[1]), w: intval(cr[2]), h: intval(cr[3])};
    cur.filterFl.crop(cur.lastCrop);
    cur.filterCropped = true;
  }

  var t = params[3];
  if (t) {
    cur.filterText = replaceEntities(t);
    if (params[4] == undefined) {
      params[4] = '1';
    }
    cur.filtersFont = params[4];
    ge('pv_filter_font').className = 'pv_filter_font pv_filter_font'+cur.filtersFont;
    val('pv_filter_text_ta', cur.filterText);
    ge('pv_filter_text_ta').autosize.update();
    Filters.updateText(1);
  }

  var bl = params[1].split(',');
  if (params[1] && bl) {
    cur.filtersBlur = intval(bl[0]);
    cur.blurType = intval(bl[1]);
    cur.fBlurPos = [intval(bl[2]) / 100, intval(bl[3]) / 100];
    debugLog('blur here', cur.filtersBlur, cur.fBlurPos);
    cur.filterFl.setBlur(cur.blurType || 1, cur.filtersBlur, cur.fBlurPos[0], cur.fBlurPos[1]);
  }

  if (filterNum && amount) {
    cur.amountSize = 66 * (0.8 - cur.filtersAmount) / 0.8;
    debugLog('amount', cur.filtersAmount);
    Filters.applyFilter(filterNum, true);
    cur.filterFl.setAmount(cur.filtersAmount);
  }
},

toStr: function() {
  var str = (cur.filterApplied ? cur.filterApplied+','+intval(cur.filtersAmount * 100) : '')+'/';
  if (cur.filtersBlur) {
    str += intval(cur.filtersBlur)+','+intval(cur.blurType || 1)+','+intval(cur.fBlurPos[0]*100)+','+intval(cur.fBlurPos[1]*100);
  }
  str += '/';
  if (cur.filterCropped && cur.lastCrop && cur.lastCrop.w && cur.lastCrop.h) {
    str += cur.lastCrop.t+','+cur.lastCrop.l+','+cur.lastCrop.w+','+cur.lastCrop.h;
  }
  if (cur.filterText) {
    str += '/'+cur.filterText.replace('/', '&#47;')+'/'+cur.filtersFont;
  }
  if (str.match(/^\/*$/)) {
    str = '';
  }
  return str;
},

applyFilter: function(num, noAnim) {
  var obj = ge('pv_filter_btn_'+num);
  debugLog('applyFilter', num, obj);
  var prev = geByClass1('pv_filter_sel', ge('pv_filter_panel'));
  if (prev != obj) {
    removeClass(prev, 'pv_filter_sel');
    addClass(obj, 'pv_filter_sel');
    var prev_lev = geByClass1('pv_level_shown', ge('pv_filter_panel'));
    if (prev_lev) {
      addClass(prev_lev, 'pv_level_before_hide');
      removeClass(prev_lev, 'pv_level_shown');
    }
    Filters.hideLevels(obj);
    if (num) {
      Filters.showLevel(obj);
      if (!cur.filtersAmount) {
        Filters.setAmount(obj, true);
      }
    }
  }
  if (cur.filterApplied == num) {
    return false;
  }
  if (cur.filterApplied || cur.filtersBlur) {
    cur.filterFl.restoreOriginal();
    cur.filterApplied = 0;
  }
  switch (num) {
    case 0:
      // do nothing
      break;
    case 8: // 90-th style
      cur.filterFl.addFilter('pro');
      cur.filterFl.addFilter('vignette', 20, 70);
      break;
    case 10: // Toasts
      cur.filterFl.addFilter('sepia', 30);
      cur.filterFl.addFilter('vignette', 25, 80);
      cur.filterFl.addFilter('saturation', -30);
      cur.filterFl.addFilter('contrast', 30);
      break;
    case 13:
      cur.filterFl.addFilter('color', 95, 105, 145);
      cur.filterFl.addFilter('sepia', 30);
      cur.filterFl.addFilter('contrast', 20);
      cur.filterFl.addFilter('vignette', 15, 60);
      break;
    case 21:
      cur.filterFl.addFilter('color', 125, 115, 95);
      cur.filterFl.addFilter('sepia', 40);
      cur.filterFl.addFilter('saturation', -20);
      cur.filterFl.addFilter('vignette', 40, 70);
      cur.filterFl.addFilter('contrast', -10);
      break;
    case 22:
      cur.filterFl.addFilter('color', 125, 110, 95);
      cur.filterFl.addFilter('vignette', 30, 80);
      cur.filterFl.addFilter('contrast', 15);
      cur.filterFl.addFilter('saturation', -100);
      cur.filterFl.addFilter('sepia', 100);
      break;
    case 23: // Toasts
      cur.filterFl.addFilter('color', 110, 95, 105);
      cur.filterFl.addFilter('sepia', 50);
      cur.filterFl.addFilter('vignette', 30, 65);
      cur.filterFl.addFilter('saturation', -60);
      cur.filterFl.addFilter('contrast', 40);
      break;
    case 24:
      cur.filterFl.addFilter('pro', 2);
      cur.filterFl.addFilter('vignette', 20, 65);
      cur.filterFl.addFilter('contrast', 15);
      cur.filterFl.addFilter('brightness', 15);
      cur.filterFl.addFilter('vignette', 30, 65);
      break;
    case 25:
      cur.filterFl.addFilter('pro', 3);
      cur.filterFl.addFilter('vignette', 20, 65);
      //cur.filterFl.addFilter('vignette', 20, 65);
      break;
    case 26:
      cur.filterFl.addFilter('pro', 4);
      cur.filterFl.addFilter('vignette', 20, 60);
      break;
  }

  cur.filterApplied = num;
  cur.filterFl.applyFilter(!noAnim);
},

savePhotoFilter: function(obj) {
  lockButton(obj);
  if (cur.filterApplied || cur.filterCropped || cur.filtersBlur || cur.filterText) {
    cur.filterFl.saveBigPhoto(cur.filterSaveOptions);
  } else {
    Filters.save();
  }
},

changeThumbs: function(thumb, sizes) {
  if (thumb) {
    var rows = [ge('photo_row'+cur.filterPhoto), ge('photos_add_thumb'+cur.filterPhoto)];
    var childs = geByClass('page_post_thumb_wrap')
    childs.push.apply(childs, geByClass('page_preview_photo'));
    childs.push.apply(childs, geByClass('im_preview_photo'));
    childs.push.apply(childs, geByClass('photo'));
    for (var i in childs) {
      var oncl = childs[i].getAttribute('onclick');
      if (oncl && oncl.indexOf("'"+cur.filterPhoto+"'") != -1) {
        rows.push(childs[i]);
      }
    }
    for(var i in rows) {
      if (rows[i]) {
        var img = geByTag1('img', rows[i]);
        if (img) {
          img.src = thumb;
          setStyle(img, {height: 'auto'});
        }
      }
    }
    if (!cur.pvNoTemp) cur.pvNoTemp = {};
    cur.pvNoTemp[cur.filterPhoto] = true;
    if (window.ThumbsEdit && sizes) {
      var c = ThumbsEdit.cache();
      for (var i in c) {
        var p = c[i].previews || [], found = false;
        for (var j in p) {
          if (p[j].type == 'photo' && p[j].photo.id == 'photo' + cur.filterPhoto) {
            p[j].photo.sizes = sizes;
            found = true;
          }
        }
        if (found) ThumbsEdit.refresh(i);
      }
    }
  }
},

save: function(info) {
  var query = {
    act: 'save_desc',
    photo: cur.filterPhoto,
    hash: cur.filterHash,
    aid: cur.pvMoveToAlbum.val(),
    cover: isChecked('pv_cover_check'),
    text: ge('pv_sett_desc').value,
    filter_num: cur.filterApplied,
    conf: Filters.toStr()
  };
  if (info) {
    if (info.hash) {
      extend(query, {
        filter_hash: info['hash'],
        filter_aid: info['aid'],
        filter_server: info['server'],
        filter_photo: info['photos_list']
      });
    } else {
      query._query = info;
    }
  }
  ajax.post('al_photos.php', query, {
    onDone: function(text, album, photoObj, thumb, sizes) {
      if (cur.webcamPhotoMedia) {
        if (thumb && sizes) {
          cur.uploadPhotoData.editable.sizes = sizes;
          cur.uploadPhotoData.thumb_m = cur.uploadPhotoData.thumb_s = thumb;
        }
        photos.onFiltersSave();
        var box = curBox();
        if (box) {
          box.hide();
        }
        return;
      }

      var listId = cur.pvListId, index = cur.pvIndex;
      var listRow = cur.pvData[listId];
      if (!listRow) {
        return nav.reload();
      }
      var ph = listRow[index];
      unlockButton(ge('pv_filter_save'));
      var box = curBox();
      if (box) {
        box.hide();
      }

      ph.desc = text;
      if (album) ph.album = album;
      if (listId.substr(0, 5) == 'album') {
        var listAid = intval(listId.split('_')[1]);
        ph.moved = (query.aid != listAid);
      }

      var shown = cur.pvShown && listId == cur.pvListId && index == cur.pvIndex;
      if (photoObj && thumb) {
        Filters.changeThumbs(thumb, sizes);
        delete ph.x_;
        delete ph.x_src;
        delete ph.y_;
        delete ph.y_src;
        delete ph.z_;
        delete ph.z_src;
        extend(ph, photoObj);
      }
      if (shown) {
        var d = domFC(cur.pvDesc);
        val(d, text || ('<span class="pv_desc_edit">' + getLang('photos_edit_desc') + '</span>'));
        d.onmouseover = text ? Photoview.descTT.pbind(d) : function() {};
        if (album && ge('pv_album')) ge('pv_album').innerHTML = album;

        cur.pvCurData = Photoview.genData(ph, vk.pvbig ? (cur.pvVeryBig ? (cur.pvVeryBig > 1 ? 'z' : 'z') : 'y') : 'x');
        domFC(cur.pvPhoto).src = Photoview.blank;

        setTimeout(Photoview.show.pbind(cur.pvListId, cur.pvIndex), 0);
      }
    }
  });
},

restoreOriginal: function(obj, oid, pid, hash) {
  ajax.post('al_photos.php', {act: 'restore_original', oid: oid, pid: pid, hash: hash}, {
    onDone: function(photoObj, thumb, sizes) {
      var listId = cur.pvListId, index = cur.pvIndex, ph = cur.pvData[listId][index];
      var shown = cur.pvShown && listId == cur.pvListId && index == cur.pvIndex;
      extend(ph, photoObj);
      var box = curBox();
      if (box) {
        box.hide();
      }
      Filters.changeThumbs(thumb, sizes);
      if (shown) {
        cur.pvCurData = Photoview.genData(ph, vk.pvbig ? (cur.pvVeryBig ? (cur.pvVeryBig > 1 ? 'z' : 'z') : 'y') : 'x');
        cur.pvPhoto.firstChild.src = cur.pvCurData.src;

        setTimeout(Photoview.show.pbind(cur.pvListId, cur.pvIndex), 0);
      }
    },
    loader: 1
  });
},

showName: function(obj, txt) {
  if (cur.tooltipObj && cur.tooltipObj) {
    Filters.hideLevels(obj);
  }
  cur.tooltipObj = obj;

  var filterLevel = Filters.getLevelCont(obj, txt);
  show(filterLevel);
  removeClass(filterLevel, 'pv_level_before_hide');
  cssAnim(filterLevel, {height: 15, marginTop: -15, opacity: 1}, {duration: 300, func: 'ease-out'});
},

eof: 1};try{stManager.done('filters.js');}catch(e){}
