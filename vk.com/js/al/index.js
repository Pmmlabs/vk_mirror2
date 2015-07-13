function initIndexSection(opts) {

extend(cur, {
  section: 'index',
  options: opts,

  updateCount: function() {
    var del = cur.options.del;
    var next = -(1000 / cur.options.memPerSec) * Math.log(Math.random());

    var memCountString = cur.options.memCount.toString();
    var len = memCountString.length;
    memCountString = memCountString.substr(0, len - 6) + del + memCountString.substr(len - 6, 3) + del + memCountString.substr(len - 3, 3);
    ge('memCount').innerHTML = memCountString;

    ++cur.options.memCount;
    cur.updateTimer = setTimeout(cur.updateCount, next);
  }
});
cur.destroy.push(function() {
  clearTimeout(cur.updateTimer);
});

stManager.add(['prereg.js', 'ui_controls.css', 'ui_controls.js'], function() {
  initReg('index_', opts.reg);
  cur.indexRegButton = ge('index_reg_button');
  cur.indexRegButton.onclick = cur.register.pbind('index_');
  cur.destroy.push(function(c) {
    cur.index_reg_destroy(c);
    cleanElems(c.indexRegButton);
  });
});

if (opts.main) {
  window.onReLoginDone = function(href) {
    location.href = href;
  }
  window.onReLoginFailed = function(code) {
    if (code === -1) {
      location.href = location.href.replace(/^http:/, 'https:');
    }
  };
  cur.updateCount();
}

}

var Index = {
  init: function() {
    window.onReLoginDone = function(href) {
      location.href = href;
    }
    window.onReLoginFailed = function(code) {
      if (code === -1) {
        location.href = location.href.replace(/^http:/, 'https:');
      }
    };
    cur.nav.push(function(ch) {
      var newroot = ch[0];
      delete(ch[0]);
      if (!isEmpty(ch) || newroot !== '' && newroot !== 'join') {
        return;
      }
      if (newroot === '') {
        hide('ij_block');
        show('index');
        nav.setLoc('');
        hide(_tbLink);
      } else {
        hide('index');
        show('ij_block');
        elfocus('ijp_input');
        nav.setLoc('join');
        showBackLink('/', getLang('index_to_main'));
      }
      return false;
    });
  },
  submitJoin: function() {
    var btn = ge('ij_submit'), phone = trim(val('ijp_input').replace(/[^\d]/g, ''));
    if (phone.length < 5) {
      return elfocus('ijp_input');
    }
    hide('ij_error');
    ajax.post('al_register.php', {act: 'join_phone', phone: phone, hash: cur.hash}, {
      onFail: function(text) {
        if (!text) return;
        ge('ij_error').innerHTML = text;
        show('ij_error');
        return true;
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
  },
  resend: function() {
    showBox('al_register.php', {act: 'join_resend', mid: cur.mid, hash: cur.hash});
  },
  initNew: function() {
    window.onReLoginDone = function(href) {
      location.href = href;
    }
    window.onReLoginFailed = function(code) {
      if (code === -1) {
        location.href = location.href.replace(/^http:/, 'https:');
      }
    };
    cur.destroy.push(function(c) {
      if (c.uiSex) c.uiSex.destroy();
    })
  },
  initSexDD: function(data) {
    cur.uiSex = new Dropdown(ge('ij_sex'), data, {
      width: 160,
      placeholder: getLang('index_choose_sex'),
      placeholderColor: '#8C8E91',
      zeroPlaceholder: true
    });
    cur.uiSex.val([0, getLang('index_choose_sex')]);
    cur.uiSex.val([0, getLang('index_choose_sex')]);
    show('ij_sex_row');
  },
  submitJoinStart: function() {
    var fname = trim(val('ij_first_name')), lname = trim(val('ij_last_name')), sex;
    if (isVisible('ij_sex_row')) {
      sex = intval(cur.uiSex.val());
      if (!sex && fname.length && lname.length) return cur.uiSex.showDefaultList();
    }

    ajax.post('join.php', {act: 'start', fname: fname, lname: lname, sex: sex}, {onDone: function(result, data) {
      if (result == 1 || result == 2) {
        if (data) {
          val('ij_msg', data);
          if (!isVisible('ij_msg')) {
            slideDown('ij_msg', 100);
          } else {
            animate('ij_msg', {backgroundColor: '#F4EBBD'}, 100, animate.pbind('ij_msg', {backgroundColor: '#F9F6E7'}, 2000));
          }
        }
        if (result == 1) return notaBene('ij_first_name');
        return notaBene('ij_last_name');
      } else if (result == 3) {
        if (cur.uiSex) return cur.uiSex.showDefaultList();

        lockButton('ij_submit');
        stManager.add(['ui_controls.css', 'ui_controls.js'], function() {
          Index.initSexDD(data);
          cur.uiSex.showDefaultList();
          unlockButton('ij_submit');
        });
      }
    }, showProgress: lockButton.pbind('ij_submit'), hideProgress: unlockButton.pbind('ij_submit')});
  },
  fbCheck: function(appId, context) {

    stManager.add(['fbsign.js'], function() {Fbsign.init();});
    var indexDiv = ge('index_fbsign' + (context || ''));
    setStyle(indexDiv, {opacity:1, height:54});
    show(indexDiv);
    /*window.fbAsyncInit = function() {
      FB.init({
        appId      : appId,
        channelUrl : '//vk.com//api/fb_channel.html',
        status     : true,
        cookie     : true
      });
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected' || response.status === 'not_authorized') {
          stManager.add(['fbsign.js'], function() {Fbsign.init();});
          var indexDiv = ge('index_fbsign' + (context || ''));
          setStyle(indexDiv, {opacity:0, height:0});
          show(indexDiv);
          animate(indexDiv, {height: 54, opacity: 1}, 200)
          setCookie('remixfbuser', 1, 30);
        } else {
          debugLog('no fb user');
        }
      });
    };
    if (window.FB && window.FB.init) {
      window.fbAsyncInit();
    } else {
      (function(d){
         var js, id = 'facebook-jssdk', ref = geByTag1('script');
         if (ge(id)) {return;}
         js = ce('script', {id: id, async: true, src: '//connect.facebook.net/en_US/all.js'})
         ref.parentNode.insertBefore(js, ref);
      }(document));
    }*/
  },
  fbJoin: function(context) {
    cur.fbContext = context;
    setCookie('remixfbstate', cur.fbState, 30);
    var redirectUri = location.protocol+'//'+location.host+'/join?act=fb_sign';
    var oauthUrl = 'https://graph.facebook.com/oauth/authorize?client_id='+cur.fbApp+'&redirect_uri='+encodeURIComponent(redirectUri)+'&scope=email,user_birthday&display=popup&state='+cur.fbState;
    var screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
        screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
        outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
        outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
        width = 640,
        height = 340,
        left = parseInt(screenX + ((outerWidth - width) / 2), 10),
        top = parseInt(screenY + ((outerHeight - height) / 2.5), 10);
    var wnd = window.open(oauthUrl, 'fb_sign', 'width='+width+',height='+height+',left='+left+',top='+top);
  },
  fbFinish: function(data) {
    lockButton(ge('index_fb' + (cur.fbContext || '')));
    nav.go('/join?act=fb_start');
  }
}

var JoinPhotoview = {
  blank: '/images/blank.gif',
  blankf: function() {},
  cacheSize: 3,

  init: function(imgs) {
    cur.jpvData = [];
    for (var i = 0, l = imgs.length; i < l; ++i) {
      var img = imgs[i];
      cur.jpvData.push({id: i, src: img.src, desc: img.desc, w: img.width, h: img.height});
    }
  },

  updateArrows: function() {
    var sbw = sbWidth() + 2;
    cur.jpvLeft.style.left = '20px';//(Math.floor((lastWindowWidth - sbw - cur.jpvActualWidth - 52) / 2) - 39) + 'px';
    cur.jpvLeftNav.style.width = Math.floor((lastWindowWidth - sbw - cur.jpvActualWidth - 52) / 2) + 'px';
    cur.jpvRightNav.style.left = Math.floor((lastWindowWidth - sbw + cur.jpvActualWidth + 52) / 2) + 'px';
    cur.jpvRightNav.style.width = Math.floor((lastWindowWidth - sbw - cur.jpvActualWidth - 52) / 2) + 'px';
    cur.jpvClose.style.left = (lastWindowWidth - sbw - 2 - 37) + 'px';//(Math.floor((lastWindowWidth - sbw + cur.jpvActualWidth + 52) / 2) + 22) + 'px';
  },
  updateHeight: function() {
    var h = cur.jpvBox.offsetHeight + 110, sbw = Math.floor(sbWidth() / 2);
    cur.jpvLeftNav.style.height = cur.jpvRightNav.style.height = (h - 110) + 'px';
    if (!browser.mobile) return;
    var skipTop = 10 + cur.jpvYOffset;
    cur.jpvLeft.style.top = cur.jpvClose.style.top = (cur.jpvYOffset + 25) + 'px';
    if (lastWindowHeight < cur.jpvYOffset + h) {
      setTimeout(function() {
        var f = ge('footer');
        f.style.height = (intval(getStyle(f, 'height')) + (cur.jpvYOffset + h - lastWindowHeight)) + 'px';
        onBodyResize();
        JoinPhotoview.onResize();
      }, 1);
    }
  },

  locNav: function(ch, old, nw, opts) {
    var z = ch.z;
    delete(ch.z);
    if (!isEmpty(ch) || z === undefined) return;

    if (z == false && cur.jpvShown) {
      JoinPhotoview.hide();
      return false;
    }
    var m = z.match(/^screen(\d+)$/);
    if (!m) return;

    var data = cur.jpvData;
    if (!data) return;

    for (var i = 0, l = data.length; i < l; ++i) {
      if (data[i] && data[i].id == m[1]) {
        JoinPhotoview.show(i);
        return false;
      }
    }
  },
  updateLocNav: function() {
    for (var i = 0, l = cur.nav.length; i < l; ++i) {
      if (cur.nav[i] == JoinPhotoview.locNav) return;
    }
    cur.nav.push(JoinPhotoview.locNav);
  },
  show: function(index, ev) {
    if (ev && (ev.button == 2 || ev.which == 3)) return;

    if (__afterFocus) {
      return ev ? cancelEvent(ev) : false;
    }
    var count = (cur.jpvData || {}).length, otherList = false;

    if (!count) return;

    index += (index < 0 ? count : (index >= count ? (-count) : 0));

    var ph = cur.jpvData[index];

    if (!ph || !ph.src) return;

    if (!isVisible(layerWrap)) {
      otherList = true;
      addEvent(window, 'resize', JoinPhotoview.onResize);
      addEvent(document, 'keydown', JoinPhotoview.onKeyDown);
      addEvent(layerWrap, 'click', JoinPhotoview.onClick);
      boxQueue.hideAll();
      setStyle(layerBG, {opacity: ''});
      layers.show();
      layers.fullhide = JoinPhotoview.hide;
    } else if (count == 1 && !otherList && index != cur.jpvIndex) {
      JoinPhotoview.hide();
      return ev ? cancelEvent(ev) : false;
    }

    JoinPhotoview.updateLocNav();

    if (ev && ev.pageX && ev.pageY) {
      extend(cur, {jpvOldX: ev.pageX, jpvOldY: ev.pageY, jpvOldT: vkNow()});
    }

    var direction = otherList ? 1 : (cur.jpvIndex > index ? -1 : 1);

    cur.jpvIndex = index;
    cur.jpvShown = true;
    if (!cur.jpvFixed) {
      cur.jpvFixed = bodyNode.appendChild(ce('div', {className: 'jpv_fixed fixed jpv_dark', innerHTML: '\
<div class="jpv_left no_select" onmousedown="JoinPhotoview.show(cur.jpvIndex - 1 + vk.rtl * 2, event);" onmouseover="JoinPhotoview.activate(this)" onmouseout="JoinPhotoview.deactivate(this)"><div></div></div>\
<div class="jpv_close no_select" onmouseover="JoinPhotoview.activate(this)" onmouseout="JoinPhotoview.deactivate(this)" onmousedown="JoinPhotoview.onClick(event);cur.jpvClicked=true;"><div></div></div>\
      '}));

      cur.jpvLeft = cur.jpvFixed.firstChild;
      cur.jpvClose = cur.jpvLeft.nextSibling;

      addClass(layerWrap, 'jpv_dark');
      addClass(layerBG, 'jpv_dark');
      vkImage().src = '/images/upload.gif';

      layer.innerHTML = '\
<div class="jpv_cont">\
\
<table cellspacing="0" cellpadding="0">\
<tr><td class="sidesh s1"><div></div></td><td>\
<table cellspacing="0" cellpadding="0">\
<tr><td class="sidesh s2"><div></div></td><td>\
<table cellspacing="0" cellpadding="0">\
<tr><td colspan="3" class="bottomsh s3"><div></div></td></tr>\
<tr><td class="sidesh s3"><div></div></td><td>\
\
<div id="jpv_box" onclick="cur.jpvClicked = true;">\
  <a class="fl_r jpv_close_link" onclick="JoinPhotoview.hide()">' + getLang('global_close') + '</a>\
  <div id="jpv_summary"><span class="summary"></span></div>\
  <div class="no_select jpv_data">\
    <a onmousedown="if (checkEvent(event) === false) return JoinPhotoview.show(cur.jpvIndex + 1, event);" onselectstart="return cancelEvent(event);" onclick="return checkEvent(event)" id="jpv_photo"></a>\
  </div>\
  <div class="clear_fix select_fix" id="jpv_comments_data">\
    <div id="jpv_wide"></div>\
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
<div class="no_select" id="jpv_left_nav" '+'onmouseover="JoinPhotoview.activate(cur.jpvLeft)" onmouseout="JoinPhotoview.deactivate(cur.jpvLeft)" onmousedown="JoinPhotoview.show(cur.jpvIndex - 1 + vk.rtl * 2, event); cur.jpvClicked = true;" onselectstart="return cancelEvent(event);"></div>\
<div class="no_select" id="jpv_right_nav" '+'onmouseover="JoinPhotoview.activate(cur.jpvClose)" onmouseout="JoinPhotoview.deactivate(cur.jpvClose)" onmousedown="JoinPhotoview.onClick(event); cur.jpvClicked = true;"></div>\
      ';

      extend(cur, {
        jpvCont: layer.firstChild,
        jpvBox: ge('jpv_box'),

        jpvLeftNav: ge('jpv_left_nav'),
        jpvRightNav: ge('jpv_right_nav'),

        jpvSummary: ge('jpv_summary').firstChild,
        jpvPhoto: ge('jpv_photo'),
        jpvCommentsData: ge('jpv_comments_data'),

        jpvWide: ge('jpv_wide')
      });

      show(cur.jpvCommentsData);
      if (browser.mobile) {
        cur.jpvYOffset = intval(window.pageYOffset);

        cur.jpvCont.style.paddingTop = cur.jpvLeftNav.style.top =
        cur.jpvRightNav.style.top = (cur.jpvYOffset + 10) + 'px';
      }
      addEvent(layerBG, 'mouseover', JoinPhotoview.activate.pbind(cur.jpvClose));
      addEvent(layerBG, 'mouseout', JoinPhotoview.deactivate.pbind(cur.jpvClose));
    }
    if (cur.jpvCurrent) {
      cur.jpvCurrent.onload = JoinPhotoview.blankf;
      cur.jpvCurrent.src = JoinPhotoview.blank;
    }
    delete cur.jpvCurrent;
    cur.jpvCurrent = vkImage();
    cur.jpvCurrent.onload = JoinPhotoview.preload.pbind(index, direction);
    cur.jpvCurrent.src = ph.src;

    if (otherList) {
      (count > 1 ? show : hide)(cur.jpvLeft, cur.jpvLeftNav, cur.jpvRightNav, cur.jpvClose);
    }
    cur.jpvSummary.innerHTML = ((count > 1) ? getLang('index_screen_m_of_n').replace('{num}', cur.jpvIndex + 1).replace('{count}', count) : getLang('photos_view_one_photo'));
    cur.jpvCurPhoto = ph;
    JoinPhotoview.doShow();

    return ev ? cancelEvent(ev) : false;
  },
  doShow: function() {
    var img = cur.jpvCurrent;
    if (!cur.jpvShown) return;

    var ph = cur.jpvCurPhoto;
    var lnk = cur.jpvPhoto, c = 1, marginTop = 0, w = img.width || ph.w, h = img.height || ph.h;
    cur.jpvPhWidth = Math.floor(w * c);
    cur.jpvPhHeight = Math.floor(h * c);
    if (window.devicePixelRatio >= 2 && cur.jpvPhWidth > 790) {
      cur.jpvPhWidth = (cur.jpvPhWidth > 790) ? cur.jpvPhWidth / 2 : cur.jpvPhWidth > 790;
      cur.jpvPhHeight = (cur.jpvPhHeight > 600) ? cur.jpvPhHeight / 2 : cur.jpvPhHeight > 600;
    }
    marginTop = positive(Math.floor((453 - cur.jpvPhHeight) / 2));
    if (cur.jpvPhHeight >= 453) {
      lnk.style.height = cur.jpvPhHeight + 'px';
    } else {
      lnk.style.height = '453px';
    }

    cur.jpvActualWidth = Math.max(cur.jpvPhWidth, 604);

    cur.jpvCont.style.width = (cur.jpvActualWidth + 154) + 'px';
    cur.jpvSummary.parentNode.style.width = (cur.jpvActualWidth - 4) + 'px';

    lnk.innerHTML = '<img style="width: ' + cur.jpvPhWidth + 'px; height: ' + cur.jpvPhHeight + 'px; margin-top: ' + marginTop + 'px;" src="' + img.src + '" />';
    layerWrap.scrollTop = 0;

    cur.jpvWide.innerHTML = '\
<div id="jpv_desc" style="' + (ph.desc ? '' : 'display: none') + '">' + (ph.desc || '') + '</div>';

    JoinPhotoview.updateArrows();

    setTimeout(JoinPhotoview.afterShow, 2);
  },
  afterShow: function() {
    JoinPhotoview.updateSize();
    JoinPhotoview.updateHeight();

    cur.jpvPhoto.focus();

    var nl = extend(nav.objLoc, {z: 'screen' + cur.jpvCurPhoto.id});
    if (nav.strLoc != nav.toStr(nl)) {
      nav.setLoc(nl);
    }
  },

  preload: function(from, direction) {
    var count = (cur.jpvData || {}).length;
    if (!count) return;

    cur.jpvLastFrom = from;
    cur.jpvLastDirection = direction;

    // remove preloaded ones without touching preloading ones
    for (var i = 0; i < Math.min(JoinPhotoview.cacheSize, count - JoinPhotoview.cacheSize); ++i) {
      var ind = from + (i + 1) * (-direction);
      while (ind >= count) ind -= count;
      while (ind < 0) ind += count;

      var p = cur.jpvData[ind];
      if (!p || !p.img || !p.img.src) continue;

      p.img.src = JoinPhotoview.blank;
      delete(p.img);
    }
    for (var i = 0; i < JoinPhotoview.cacheSize; ++i) {
      var ind = from + (i + 1) * direction;
      while (ind >= count) ind -= count;
      while (ind < 0) ind += count;

      var p = cur.jpvData[ind];
      if (!p || p.img) continue;

      p.img = vkImage();
      p.img.src = p.src;
    }
  },
  hide: function(noLoc) {
    if (!cur.jpvShown || __afterFocus) return;

    if (noLoc !== true) {
      var newLoc = clone(nav.objLoc);
      delete(newLoc.z);
      nav.setLoc(newLoc);
    }

    setTimeout(JoinPhotoview.doHide, 0);
  },
  doHide: function() {
    cur.jpvHistoryLength = 0;

    // remove preloaded
    var count = (cur.jpvData || {}).length;
    if (cur.jpvLastDirection && count) {
      for (var i = 0; i < JoinPhotoview.cacheSize; ++i) {
        var ind = cur.jpvLastFrom + (i + 1) * cur.jpvLastDirection;
        while (ind >= count) ind -= count;
        while (ind < 0) ind += count;

        var p = cur.jpvData[ind];
        if (p && p.img && p.img.src) {
          p.img.src = JoinPhotoview.blank;
          delete(p.img);
        }
      }
      cur.jpvLastDirection = cur.jpvLastFrom = false;
    }
    layers.hide();
    layers.fullhide = false;

    each(['jpvLeft', 'jpvClose', 'jpvFixed'], function() {
      var n = this + '';
      re(cur[n]);
      cur[n] = false;
    });

    if (browser.mobile) {
      ge('footer').style.height = '';
    }

    removeClass(layerWrap, 'jpv_dark');
    removeClass(layerBG, 'jpv_dark');
    layerBG.style.opacity = '';

    cur.jpvShown = cur.jpvClicked = false;
    removeEvent(window, 'resize', JoinPhotoview.onResize);
    removeEvent(document, 'keydown', JoinPhotoview.onKeyDown);
    removeEvent(layerWrap, 'click', JoinPhotoview.onClick);

    if (cur.jpvOnHide) cur.jpvOnHide();
  },

  onClick: function(e) {
    e = e || window.event;
    if (cur.jpvClicked || __afterFocus) {
      cur.jpvClicked = false;
      return;
    }
    if (e && (e.button == 2 || e.which == 3)) return;
    var dx = Math.abs(e.pageX - intval(cur.jpvOldX));
    var dy = Math.abs(e.pageY - intval(cur.jpvOldY));
    if (e.pageX === undefined || e.pageY === undefined || dx > 3 || dy > 3) {
      if (vkNow() - intval(cur.jpvOldT) > 300) {
        JoinPhotoview.hide();
      }
    }
  },
  onKeyDown: function(e) {
    if (e.returnValue === false) return false;
    if (e.keyCode == KEY.ESC) {
      JoinPhotoview.hide();
      return cancelEvent(e);
    } else if (!boxQueue.count()) {
      if (e.keyCode == KEY.RIGHT) {
        JoinPhotoview.show(cur.jpvIndex + 1);
      } else if (e.keyCode == KEY.LEFT) {
        JoinPhotoview.show(cur.jpvIndex - 1);
      }
    }
  },
  onResize: function() {
    cur.jpvActualWidth = Math.max(intval(cur.jpvPhWidth), 604);
    JoinPhotoview.updateArrows();
    JoinPhotoview.updateHeight();
  },
  updateSize: function() {
    onBodyResize();
    JoinPhotoview.onResize();
  },

  activate: function(arrow) {
    if (arrow.timeout) {
      clearTimeout(arrow.timeout);
      removeAttr(arrow, 'timeout');
    } else {
      fadeTo(arrow, 200, cur.jpvDark ? 1 : 0.7);
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

try{stManager.done('index.js');}catch(e){}
