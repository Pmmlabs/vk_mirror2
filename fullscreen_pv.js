var FullscreenPV = {
  init: function() {
    if (!cur.pvCanvas || cur.pvFSControls) return;

    var ss = positive(getCookie('remixfsss')), ssd = Math.min(positive(getCookie('remixfsdt')) || 5, 15);
    cur.pvFSControls = cur.pvCanvas.appendChild(ce('div', {
      id: 'pv_fs_controls',
      innerHTML: '\
<div id="pv_fs_topright" class="pv_fs_controls">\
  <table cellspacing="0" cellpadding="0"><tr>\
    <td><div id="pv_fs_num"></div></td>\
    <td><div id="pv_fs_close" onclick="Photoview.fullscreenStop()">\
      <div id="pv_fs_close_btn"></div>\
    </div></td>\
  </tr></table>\
</div>\
<div id="pv_fs_bottomleft" class="pv_fs_controls">\
  <table cellspacing="0" cellpadding="0"><tr>\
    <td><div id="pv_fs_slide_check" onclick="FullscreenPV.startSlide()">\
      ' + getLang('photos_slideshow') + '\
    </div></td>\
    <td><div id="pv_fs_slide_speed_wrap">\
      <div id="pv_fs_slide_about"></div>\
      <div id="pv_fs_slide_speed" onmousedown="FullscreenPV.startSlideEdit(event)">\
        <div id="pv_fs_slide_speed_back"></div>\
        <div id="pv_fs_slide_speed_line"><div id="pv_fs_slide_speed_ctrl"></div></div>\
      </div>\
    </div></td>\
  </tr></table>\
</div>\
<div id="pv_fs_left_wrap" class="pv_fs_controls"><div id="pv_fs_left"></div></div>\
<div id="pv_fs_right_wrap" class="pv_fs_controls"><div id="pv_fs_right"></div></div>',
      onmouseover: FullscreenPV.over,
      onmouseout: FullscreenPV.out
    }));
    extend(cur, {
      pvFSInfo: ge('pv_fs_num'),
      pvFSSlideCheck: ge('pv_fs_slide_check'),
      pvFSSlideSpeedWrap: ge('pv_fs_slide_speed_wrap'),
      pvFSSlideLine: ge('pv_fs_slide_speed_line'),
      pvFSSlideAbout: ge('pv_fs_slide_about'),
      pvFSSlideCont: ge('pv_fs_bottomleft'),
      pvFSSlideDelta: ssd,
      pvFSLeft: ge('pv_fs_left'),
      pvFSRight: ge('pv_fs_right')
    });

    cur.pvFSSlideLine.style.width = Math.floor((ssd - 1) * 100 / 14) + '%';
    val(cur.pvFSSlideAbout, getLang('photos_seconds', ssd));
    if (ss) addClass(cur.pvFSSlideCont, 'pv_fs_slide_on');
    FullscreenPV.slide();

    addEvent(cur.pvCanvas, 'mousemove', FullscreenPV.showControls);
    addEvent(cur.pvCanvas, 'mousedown', FullscreenPV.onClick);
    addEvent(cur.pvCanvas, 'mouseup', FullscreenPV.endSlideEdit);
    FullscreenPV.showControls(true);

    cur.pvPhoto.blur();

    FullscreenPV.updateInfo();
  },
  over: function(ev) {
    var e = ev || window.event, t = e.target || e.srcElement || document;
    cur.pvFSOver = !t.id.match(/^pv_fs_(left|right)(_wrap)?$/);
  },
  out: function() {
    cur.pvFSOver = false;
  },

  onClick: function(ev) {
    if (!__afterFocus && (!ev || ev.button != 2 && ev.which != 3) && !hasClass(cur.pvCanvas, 'pv_fs_one')) {
      if (cur.pvFSLeftShown) {
        Photoview.show(cur.pvListId, cur.pvIndex - 1);
      } else if (cur.pvFSRightShown) {
        Photoview.show(cur.pvListId, cur.pvIndex + 1);
      }
    }
    return ev ? cancelEvent(ev) : false;
  },

  showControls: function(ev) {
    var x = cur.pvFSrX = ev.pageX, y = cur.pvFSrY = ev.pageY, l, r;
    if (cur.pvFSSlideEdit) FullscreenPV.updateSlide();
    if (cur.pvFSX !== undefined && cur.pvFSY !== undefined && (Math.abs(x - cur.pvFSX) + Math.abs(y - cur.pvFSY) < 4)) return;

    if (!cur.pvFSControlsTimer) {
      removeClass(cur.pvCanvas, 'pv_fs_nocursor');
      clearTimeout(cur.pvFSHideControlsTimer);
      show(cur.pvFSControls);
      addClass(cur.pvFSControls, 'pv_fs_shown');
    }
    clearTimeout(cur.pvFSControlsTimer);
    if (!cur.pvFSOver && !cur.pvFSSlideEdit) {
      cur.pvFSControlsTimer = setTimeout(FullscreenPV.hideControls, 3000);
    }

    l = !cur.pvFSOver && (x < 100 || cur.pvFSWidth && x < (cur.pvScrWidth - cur.pvFSWidth) / 2);
    if (l && !cur.pvFSLeftShown) {
      addClass(cur.pvFSLeft, 'pv_fs_over');
    } else if (!l && cur.pvFSLeftShown) {
      removeClass(cur.pvFSLeft, 'pv_fs_over');
    }
    cur.pvFSLeftShown = l;

    r = !cur.pvFSOver && !l;
    if (r && !cur.pvFSRightShown) {
      addClass(cur.pvFSRight, 'pv_fs_over');
    } else if (!r && cur.pvFSRightShown) {
      removeClass(cur.pvFSRight, 'pv_fs_over');
    }
    cur.pvFSRightShown = r;

    cur.pvFSX = x;
    cur.pvFSY = y;
  },
  hideControls: function() {
    addClass(cur.pvCanvas, 'pv_fs_nocursor');
    removeClass(cur.pvFSControls, 'pv_fs_shown');
    clearTimeout(cur.pvFSHideControlsTimer);
    cur.pvFSHideControlsTimer = setTimeout(hide.pbind(cur.pvFSControls), 300);
    cur.pvFSControlsTimer = false;
  },

  startSlide: function() {
    if (hasClass(cur.pvFSSlideCont, 'pv_fs_slide_on')) {
      clearTimeout(cur.pvFSTimer);
      removeClass(cur.pvFSSlideCont, 'pv_fs_slide_on');
      setCookie('remixfsss', 0);
    } else {
      addClass(cur.pvFSSlideCont, 'pv_fs_slide_on');
      FullscreenPV.slide();
      setCookie('remixfsss', 1);
      clearTimeout(cur.hideAboutTO);
      cur.hideAboutTO = setTimeout(function() {removeClass(cur.pvFSSlideAbout, 'highlighted');}, 3000);
      addClass(cur.pvFSSlideAbout, 'highlighted');
    }
  },
  updateSlide: function() {
    var dt = Math.floor(Math.max(Math.min((vk.rtl ? cur.pvFSrLeft + cur.pvFSrWidth - cur.pvFSrX :  cur.pvFSrX - cur.pvFSrLeft) / cur.pvFSrWidth, 0.99), 0) * 15) + 1;
    if (cur.pvFSSlideDelta != dt) {
      setCookie('remixfsdt', cur.pvFSSlideDelta = dt);
      cur.pvFSSlideLine.style.width = Math.floor((dt - 1) * 100 / 14) + '%';
      val(cur.pvFSSlideAbout, getLang('photos_seconds', dt));
    }
  },
  startSlideEdit: function(ev) {
    if (!cur.pvFSrX || !cur.pvFSrY) return;
    extend(cur, {
      pvFSSlideEdit: true,
      pvFSrLeft: getXY(domPN(cur.pvFSSlideLine))[0],
      pvFSrWidth: getSize(domPN(cur.pvFSSlideLine))[0]
    });
    addClass(cur.pvFSSlideCont, 'pv_fs_slide_edit');
    FullscreenPV.updateSlide();
    clearTimeout(cur.pvFSTimer);
    return cancelEvent(ev || window.event);
  },
  endSlideEdit: function() {
    if (!cur.pvFSSlideEdit) return;
    cur.pvFSSlideEdit = false;
    removeClass(cur.pvFSSlideCont, 'pv_fs_slide_edit');
    FullscreenPV.slide();
    if (!cur.pvFSOver) {
      clearTimeout(cur.pvFSControlsTimer);
      cur.pvFSControlsTimer = setTimeout(FullscreenPV.hideControls, 3000);
    }
  },
  slide: function() {
    clearTimeout(cur.pvFSTimer);
    if (!hasClass(cur.pvFSSlideCont, 'pv_fs_slide_on') || cur.pvFSSlideEdit || hasClass(cur.pvCanvas, 'pv_fs_one')) return;
    cur.pvFSTimer = setTimeout(function() {
      cur.pvSlideNeedAnimation = true;
      Photoview.show(cur.pvListId, cur.pvIndex + 1);
    }, cur.pvFSSlideDelta * 1000);
  },

  updateInfo: function() {
    var cnt = ((cur.pvData || {})[cur.pvListId] || []).length, ind = cur.pvIndex + 1, topright, bottomleft;
    val(cur.pvFSInfo, ind + ' / ' + cnt);
    toggle(cur.pvFSInfo, cnt > 1);
    (cnt > 1 ? removeClass : addClass)(cur.pvCanvas, 'pv_fs_one');
  }
};

try{stManager.done('fullscreen_pv.js');}catch(e){}