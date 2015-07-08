var SinglePhotoview = {
  blank: '/images/blank.gif',
  blankf: function() {},
  cacheSize: 3,

  init: function(imgs) {
    cur.spvData = [];
    for (var i = 0, l = imgs.length; i < l; ++i) {
      var img = imgs[i];
      cur.spvData.push({id: img.id, src: img.src, desc: img.desc, w: img.width, h: img.height});
    }
  },

  updateArrows: function() {
    var sbw = sbWidth() + 2;
    cur.spvLeft.style.left = '20px';//(Math.floor((lastWindowWidth - sbw - cur.spvActualWidth - 52) / 2) - 39) + 'px';
    cur.spvLeftNav.style.width = Math.floor((lastWindowWidth - sbw - cur.spvActualWidth - 52) / 2) + 'px';
    cur.spvRightNav.style.left = Math.floor((lastWindowWidth - sbw + cur.spvActualWidth + 52) / 2) + 'px';
    cur.spvRightNav.style.width = Math.floor((lastWindowWidth - sbw - cur.spvActualWidth - 52) / 2) + 'px';
    cur.spvClose.style.left = (lastWindowWidth - sbw - 2 - 37) + 'px';//(Math.floor((lastWindowWidth - sbw + cur.spvActualWidth + 52) / 2) + 22) + 'px';
  },
  updateHeight: function() {
    var h = cur.spvBox.offsetHeight + 110, sbw = Math.floor(sbWidth() / 2);
    cur.spvLeftNav.style.height = cur.spvRightNav.style.height = (h - 110) + 'px';
    if (!browser.mobile) return;
    var skipTop = 10 + cur.spvYOffset;
    cur.spvLeft.style.top = cur.spvClose.style.top = (cur.spvYOffset + 25) + 'px';
    if (lastWindowHeight < cur.spvYOffset + h) {
      setTimeout(function() {
        var f = ge('footer');
        f.style.height = (intval(getStyle(f, 'height')) + (cur.spvYOffset + h - lastWindowHeight)) + 'px';
        onBodyResize();
        SinglePhotoview.onResize();
      }, 1);
    }
  },

  locNav: function(ch, old, nw, opts) {
    var z = ch.z;
    delete(ch.z);
    if (!isEmpty(ch) || z === undefined) return;

    if (z == false && cur.spvShown) {
      SinglePhotoview.hide();
      return false;
    }
    return;

    var m = z.match(/^screen(\d+)$/);
    if (!m) return;

    var data = cur.spvData;
    if (!data) return;

    for (var i = 0, l = data.length; i < l; ++i) {
      if (data[i] && data[i].id == m[1]) {
        SinglePhotoview.showByIndex(i);
        return false;
      }
    }
  },
  updateLocNav: function() {
    for (var i = 0, l = cur.nav.length; i < l; ++i) {
      if (cur.nav[i] == SinglePhotoview.locNav) return;
    }
    cur.nav.push(SinglePhotoview.locNav);
  },
  show: function(el, width, height, ev, desc, title) {
    var img = el.tagName ? {src: el.href, id: el.id} : {src: el};
    cur.spvTitle = title;
    SinglePhotoview.init([extend(img, {desc: desc, width: width, height: height})]);
    return SinglePhotoview.showByIndex(0, ev);
  },
  showByIndex: function(index, ev) {
    if (ev && (ev.button == 2 || ev.which == 3)) return;

    if (__afterFocus) {
      return ev ? cancelEvent(ev) : false;
    }
    var count = (cur.spvData || {}).length, otherList = false;

    if (!count) return;

    if (window.wkLayerWrap && isVisible(window.wkLayerWrap)) {
      wkcur.scrollTop = window.wkLayerWrap.scrollTop;
      hide(wkLayerWrap);
    }

    if (!isVisible(layerWrap)) {
      otherList = true;
      addEvent(window, 'resize', SinglePhotoview.onResize);
      addEvent(document, 'keydown', SinglePhotoview.onKeyDown);
      addEvent(layerWrap, 'click', SinglePhotoview.onClick);
      boxQueue.hideAll();
      setStyle(layerBG, {opacity: ''});
      layers.show();
      layers.fullhide = SinglePhotoview.hide;
    } else if (count == 1 && !otherList && index != cur.spvIndex) {
      SinglePhotoview.hide();
      return ev ? cancelEvent(ev) : false;
    }

    index += (index < 0 ? count : (index >= count ? (-count) : 0));

    var ph = cur.spvData[index];

    if (!ph || !ph.src) return;

    SinglePhotoview.updateLocNav();

    if (ev && ev.pageX && ev.pageY) {
      extend(cur, {spvOldX: ev.pageX, spvOldY: ev.pageY, spvOldT: vkNow()});
    }

    var direction = otherList ? 1 : (cur.spvIndex > index ? -1 : 1);

    cur.spvIndex = index;
    cur.spvShown = true;
    if (!cur.spvFixed) {
      cur.spvFixed = bodyNode.appendChild(ce('div', {className: 'spv_fixed fixed spv_dark', innerHTML: '\
<div class="spv_left no_select" onmousedown="SinglePhotoview.showByIndex(cur.spvIndex - 1 + vk.rtl * 2, event);" onmouseover="SinglePhotoview.activate(this)" onmouseout="SinglePhotoview.deactivate(this)"><div></div></div>\
<div class="spv_close no_select" onmouseover="SinglePhotoview.activate(this)" onmouseout="SinglePhotoview.deactivate(this)" onmousedown="SinglePhotoview.onClick(event);cur.spvClicked=true;"><div></div></div>\
      '}));

      cur.spvLeft = cur.spvFixed.firstChild;
      cur.spvClose = cur.spvLeft.nextSibling;

      addClass(layerWrap, 'spv_dark');
      addClass(layerBG, 'spv_dark');
      vkImage().src = '/images/upload.gif';

      layer.innerHTML = '\
<div class="spv_cont">\
\
<table cellspacing="0" cellpadding="0">\
<tr><td class="sidesh s1"><div></div></td><td>\
<table cellspacing="0" cellpadding="0">\
<tr><td class="sidesh s2"><div></div></td><td>\
<table cellspacing="0" cellpadding="0">\
<tr><td colspan="3" class="bottomsh s3"><div></div></td></tr>\
<tr><td class="sidesh s3"><div></div></td><td>\
\
<div id="spv_box" onclick="cur.spvClicked = true;">\
  <a class="fl_r spv_close_link" onclick="SinglePhotoview.hide()">' + getLang('global_close') + '</a>\
  <div id="spv_summary"><span class="summary"></span></div>\
  <div class="no_select spv_data">\
    <a onmousedown="if (checkEvent(event) === false) return SinglePhotoview.showByIndex(cur.spvIndex + 1, event);" onselectstart="return cancelEvent(event);" onclick="return checkEvent(event)" id="spv_photo"></a>\
  </div>\
  <div class="clear_fix select_fix" id="spv_comments_data">\
    <div id="spv_wide"></div>\
  </div>\
</div>\
\
</td><td class="sidesh s3"><div></div></td></tr>\
<tr><td colspan="3" class="bottomsh s3"><div></div></td></tr></table>\
</td><td class="sidesh s2"><div></div></td></tr>\
<tr><td colspan="3" class="bottomsh s2"><div></div></td></tr></table>\
</td><td class="sidesh s1"><div></div></td></tr>\
<tr><td colspan="3" class="bottomsh s1"><div></div></td></tr></table>\
</div>\
<div class="no_select" id="spv_left_nav" '+'onmouseover="SinglePhotoview.activate(cur.spvLeft)" onmouseout="SinglePhotoview.deactivate(cur.spvLeft)" onmousedown="SinglePhotoview.showByIndex(cur.spvIndex - 1 + vk.rtl * 2, event); cur.spvClicked = true;" onselectstart="return cancelEvent(event);"></div>\
<div class="no_select" id="spv_right_nav" '+'onmouseover="SinglePhotoview.activate(cur.spvClose)" onmouseout="SinglePhotoview.deactivate(cur.spvClose)" onmousedown="SinglePhotoview.onClick(event); cur.spvClicked = true;"></div>\
      ';

      extend(cur, {
        spvCont: layer.firstChild,
        spvBox: ge('spv_box'),

        spvLeftNav: ge('spv_left_nav'),
        spvRightNav: ge('spv_right_nav'),

        spvSummary: ge('spv_summary').firstChild,
        spvPhoto: ge('spv_photo'),
        spvCommentsData: ge('spv_comments_data'),

        spvWide: ge('spv_wide')
      });
      if (window.wkcur && wkcur.wkCont && nav.objLoc.w) {
        cur.spvCont.style.top = wkcur.wkCont.style.top;
      }

      show(cur.spvCommentsData);
      if (browser.mobile) {
        cur.spvYOffset = intval(window.pageYOffset);

        cur.spvCont.style.paddingTop = cur.spvLeftNav.style.top =
        cur.spvRightNav.style.top = (cur.spvYOffset + 10) + 'px';
      }
      addEvent(layerBG, 'mouseover', SinglePhotoview.activate.pbind(cur.spvClose));
      addEvent(layerBG, 'mouseout', SinglePhotoview.deactivate.pbind(cur.spvClose));
    }
    if (cur.spvCurrent) {
      cur.spvCurrent.onload = SinglePhotoview.blankf;
      cur.spvCurrent.src = SinglePhotoview.blank;
    }
    delete cur.spvCurrent;
    cur.spvCurrent = vkImage();
    cur.spvCurrent.onload = SinglePhotoview.preload.pbind(index, direction);
    cur.spvCurrent.src = ph.src;

    if (otherList) {
      (count > 1 ? show : hide)(cur.spvLeft, cur.spvLeftNav, cur.spvRightNav, cur.spvClose);
    }
    cur.spvSummary.innerHTML = cur.spvTitle || '';
    cur.spvCurPhoto = ph;
    SinglePhotoview.doShow();

    return ev ? cancelEvent(ev) : false;
  },
  doShow: function() {
    var img = cur.spvCurrent;
    if (!cur.spvShown) return;

    var ph = cur.spvCurPhoto;
    var lnk = cur.spvPhoto, c = 1, marginTop = 0, w = img.width || ph.w, h = img.height || ph.h;
    if (h * c >= 453) {
      lnk.style.height = Math.floor(h * c) + 'px';
    } else {
      lnk.style.height = '453px';
    }
    marginTop = positive(Math.floor((453 - h * c) / 2));
    cur.spvPhWidth = Math.floor(w * c);
    cur.spvPhHeight = Math.floor(h * c);
    cur.spvActualWidth = Math.max(cur.spvPhWidth, 604);

    cur.spvCont.style.width = (cur.spvActualWidth + 154) + 'px';
    cur.spvSummary.parentNode.style.width = (cur.spvActualWidth - 4) + 'px';

    lnk.innerHTML = '<img style="width: ' + cur.spvPhWidth + 'px; height: ' + cur.spvPhHeight + 'px; margin-top: ' + marginTop + 'px;" src="' + img.src + '" />';
    layerWrap.scrollTop = 0;

    if (ph.desc) {
      cur.spvWide.innerHTML = '<div id="spv_desc">' + ph.desc + '</div>';
      show(cur.spvCommentsData);
    } else {
      hide(cur.spvCommentsData);
    }

    SinglePhotoview.updateArrows();

    setTimeout(SinglePhotoview.afterShow, 2);
  },
  afterShow: function() {
    SinglePhotoview.updateSize();
    SinglePhotoview.updateHeight();

    cur.spvPhoto.focus();

    if (cur.spvCurPhoto.id) {
      var nl = extend(nav.objLoc, {z: cur.spvCurPhoto.id});
      if (nav.strLoc != nav.toStr(nl)) {
        nav.setLoc(nl);
      }
    }
  },

  preload: function(from, direction) {
    var count = (cur.spvData || {}).length;
    if (!count) return;

    cur.spvLastFrom = from;
    cur.spvLastDirection = direction;

    // remove preloaded ones without touching preloading ones
    for (var i = 0; i < Math.min(SinglePhotoview.cacheSize, count - SinglePhotoview.cacheSize); ++i) {
      var ind = from + (i + 1) * (-direction);
      while (ind >= count) ind -= count;
      while (ind < 0) ind += count;

      var p = cur.spvData[ind];
      if (!p || !p.img || !p.img.src) continue;

      p.img.src = SinglePhotoview.blank;
      delete(p.img);
    }
    for (var i = 0; i < SinglePhotoview.cacheSize; ++i) {
      var ind = from + (i + 1) * direction;
      while (ind >= count) ind -= count;
      while (ind < 0) ind += count;

      var p = cur.spvData[ind];
      if (!p || p.img) continue;

      p.img = vkImage();
      p.img.src = p.src;
    }
  },
  hide: function(noLoc) {
    if (!cur.spvShown || __afterFocus) return;

    if (noLoc !== true && nav.objLoc.z) {
      var newLoc = clone(nav.objLoc);
      delete(newLoc.z);
      nav.setLoc(newLoc);
    }

    setTimeout(SinglePhotoview.doHide, 0);

    if (window.wkcur && wkcur.scrollTop) {
      setTimeout(function() {
        window.wkLayerWrap.scrollTop = wkcur.scrollTop;
        wkcur.scrollTop = false;
      }, 0);
    }
  },
  doHide: function() {
    cur.spvHistoryLength = 0;

    // remove preloaded
    var count = (cur.spvData || {}).length;
    if (cur.spvLastDirection && count) {
      for (var i = 0; i < SinglePhotoview.cacheSize; ++i) {
        var ind = cur.spvLastFrom + (i + 1) * cur.spvLastDirection;
        while (ind >= count) ind -= count;
        while (ind < 0) ind += count;

        var p = cur.spvData[ind];
        if (p && p.img && p.img.src) {
          p.img.src = SinglePhotoview.blank;
          delete(p.img);
        }
      }
      cur.spvLastDirection = cur.spvLastFrom = false;
    }
    layers.hide();
    layers.fullhide = false;

    each(['spvLeft', 'spvClose', 'spvFixed'], function() {
      var n = this + '';
      re(cur[n]);
      cur[n] = false;
    });

    if (browser.mobile) {
      ge('footer').style.height = '';
    }

    removeClass(layerWrap, 'spv_dark');
    removeClass(layerBG, 'spv_dark');
    layerBG.style.opacity = '';

    cur.spvShown = cur.spvClicked = false;
    removeEvent(window, 'resize', SinglePhotoview.onResize);
    removeEvent(document, 'keydown', SinglePhotoview.onKeyDown);
    removeEvent(layerWrap, 'click', SinglePhotoview.onClick);

    if (cur.spvOnHide) cur.spvOnHide();

    if (window.wkcur && wkcur.shown) {
      WkView.showLayer();
    }
  },

  onClick: function(e) {
    e = e || window.event;
    if (cur.spvClicked || __afterFocus) {
      cur.spvClicked = false;
      return;
    }
    if (e && (e.button == 2 || e.which == 3)) return;
    var dx = Math.abs(e.pageX - intval(cur.spvOldX));
    var dy = Math.abs(e.pageY - intval(cur.spvOldY));
    if (e.pageX === undefined || e.pageY === undefined || dx > 3 || dy > 3) {
      if (vkNow() - intval(cur.spvOldT) > 300) {
        SinglePhotoview.hide();
      }
    }
  },
  onKeyDown: function(e) {
    if (e.returnValue === false) return false;
    if (e.keyCode == KEY.ESC) {
      SinglePhotoview.hide();
      return cancelEvent(e);
    } else if (!boxQueue.count()) {
      if (e.keyCode == KEY.RIGHT) {
        SinglePhotoview.showByIndex(cur.spvIndex + 1);
      } else if (e.keyCode == KEY.LEFT) {
        SinglePhotoview.showByIndex(cur.spvIndex - 1);
      }
    }
  },
  onResize: function() {
    cur.spvActualWidth = Math.max(intval(cur.spvPhWidth), 604);
    SinglePhotoview.updateArrows();
    SinglePhotoview.updateHeight();
  },
  updateSize: function() {
    onBodyResize();
    SinglePhotoview.onResize();
  },

  activate: function(arrow) {
    if (arrow.timeout) {
      clearTimeout(arrow.timeout);
      removeAttr(arrow, 'timeout');
    } else {
      fadeTo(arrow, 200, cur.spvDark ? 1 : 0.7);
    }
  },
  deactivate: function(arrow) {
    if (arrow.timeout) {
      return;
    }
    arrow.timeout = setTimeout(function() {
      removeAttr(arrow, 'timeout');
      fadeTo(arrow, 200, 0.4);
    }, 1);
  }

}

try{stManager.done('single_pv.js');}catch(e){}