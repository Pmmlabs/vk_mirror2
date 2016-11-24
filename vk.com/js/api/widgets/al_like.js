var WLike = {

  loading: false,
  hideCallback: null,
  nextStats: false,
  checkboxEl: null,
  mainEl: null,

  init: function() {
    if (!window.fastXDM) return;

    this.override('lite.js');

    this.checkboxEl = ge('checkbox');
    this.mainEl = ge('main');

    var tooltipInited = false;
    addEvent(this.mainEl, 'mouseover', function (e) {
      if (noAuthVal || !cur.Rpc) return;
      if (!tooltipInited) {
        tooltipInited = true;
        setTimeout(cur.Rpc.callMethod.bind(cur.Rpc, 'initTooltip', counter), 100);
      } else if (counter) {
        setTimeout(cur.Rpc.callMethod.bind(cur.Rpc, 'showTooltip'), 100);
      }
    });

    addEvent(this.checkboxEl, 'mouseup mousedown mouseover mouseout click', function (e) {
      if (e.type == 'mouseup' || e.type == 'mousedown') {
        window[e.type == 'mousedown' ? 'addClass' : 'removeClass'](this.checkboxEl, 'checkbox_pressed');
        return;
      }
      if (e.type == 'mouseover' || e.type == 'mouseout') {
        var isOver = e.type == 'mouseover';
        window[isOver ? 'addClass' : 'removeClass'](this, 'checkbox_over');
        if (!isOver) removeClass(this.checkboxEl, 'checkbox_pressed');
        return;
      }
      if (window.noAuthVal) return Widgets.oauth();
      var val = !hasClass(this.checkboxEl, 'checked');
      if (!WLike.saveLike(val)) return;
      val ? addClass(this.checkboxEl, 'checked') : removeClass(this.checkboxEl, 'checked');
      return cancelEvent(e);
    }.bind(this));

    cur.Rpc = new fastXDM.Client({
      onInit: function() {},
      share: WLike.shareThisPage,
      shared: WLike.sharedThisPage,
      hide: function () {
        if (this.hideCallback) this.hideCallback();
      }.bind(this)
    }, {safe: true});

    setTimeout(function () {
      this.resizeWidget();
      setStyle('stats_text', 'visibility', 'visible');
      setInterval(this.resizeWidget.bind(this), 1000);
    }.bind(this), 0);
  },

  saveLike: function(val) {
    if (this.loading) return false;
    this.loading = true;
    cur.captchaHide = cur.recaptchaHide = function() {
      this.loading = false;
    }.bind(this);

    counter += val ? 1 : -1;

    cur.Rpc.callMethod('proxy', val ? 'showUser' : 'hideUser');
    if (val && counter == 1) {
      cur.Rpc.callMethod('showTooltip', true);
    } else if (!counter) {
      cur.Rpc.callMethod('hideTooltip', true);
    }
    !val && cur.Rpc.callMethod('proxy', 'unpublish');

    ajax.post('widget_like.php', {
      act: 'a_like',
      value: val ? 1 : 0,
      hash: likeHash,
      app: _aid,
      pageQuery: _pageQuery,
      s: cur.shorter ? 1 : 0,
      verb: cur.verb
    }, {
      onDone: function(resp) {
        this.loading = false;
        delete cur.captchaHide;
        delete cur.recaptchaHide;
        WLike.updateStats(resp, true);
        cur.Rpc.callMethod('proxy', 'update', resp);
        this.nextStats = extend({}, resp, {stats: resp.next_stats});
        cur.Rpc.callMethod('publish', (val ? 'widgets.like.liked' : 'widgets.like.unliked'), resp.num);
      }.bind(this),
      onFail: function() {
        this.loading = false;
        delete cur.captchaHide;
        delete cur.recaptchaHide;
      }.bind(this),
      hideProgress: function () {
        hide('loading');
      }
    });

    if (hasClass(this.mainEl, 'like_dived') && ge('stats_text')) {
      if (this.hideCallback !== null) {
        this.hideCallback = null;
      } else {
        this.hideCallback = function () {
          this.hideCallback = null;
          if (this.nextStats) {
            WLike.updateStats(this.nextStats);
            this.resizeWidget();
          }
          this.nextStats = false;
        }.bind(this);
      }
      if (!val && this.hideCallback) {
        setTimeout(this.hideCallback, 200);
        this.hideCallback = null;
      }
    }

    return true;
  },

  updateStats: function(stats, noAnim) {
    var statsNum = ge('stats_num');
    statsNum && animateCount(statsNum, (stats.num ? stats.num_text || '' : '+1'), {str: 1, leftOnly: 1, onDone: function() {
      cur.autoWidth && this.resizeWidget();
    }.bind(this)});
    counter = stats.num;
    if (ge('stats_text') && stripHTML(ge('stats_text').innerHTML).toLowerCase() != stripHTML(stats.stats).toLowerCase()) {
      var el = ge('stats_text');
      if (noAnim) {
        el.innerHTML = stats.stats || '';
        this.resizeWidget();
        return;
      }
      if (!el.innerHTML) {
        setStyle(el, {opacity: 0});
        el.innerHTML = stats.stats;
        animate(el, {opacity: 1}, 100);
      } else {
        animate(el, {opacity: 0}, 100, function () {
          if (!(el.innerHTML = stats.stats)) return;
          animate(el, {opacity: 1}, 100);
        });
      }
      setTimeout(this.resizeWidget.bind(this), 150);
    }
  },

  shareThisPage: function(val, hash) {
    if (hash != shareData.wall_hash) return;

    ajax.post('widget_like.php', {
      act: 'a_recommend',
      hash: shareData.wall_hash,
      description: shareData.description,
      title: shareData.title,
      url: likeURL,
      text: shareData.text,
      val: val ? 1 : 0,
      app: _aid,
      pageQuery: _pageQuery,
      s: cur.shorter ? 1 : 0
    }, {
      onDone: function (text) {
        WLike.sharedThisPage(text, val);
      }
    });
    if (val && !hasClass(this.checkboxEl, 'checked')) {
      addClass(this.checkboxEl, 'checked');
      counter++;
    }
  },

  sharedThisPage: function(resp, val) {
    if (val && !hasClass(this.checkboxEl, 'checked')) {
      addClass(this.checkboxEl, 'checked');
      counter++;
    }
    cur.Rpc.callMethod('publish', (val ? 'widgets.like.shared' : 'widgets.like.unshared'), resp.num);
  },

  showMore: function() {
    if (cur.loadingMore) return false;
    cur.loadingMore = true;

    ajax.post('widget_like.php', {
      act: 'a_stats_box',
      offset: cur.shown,
      app: cur.aid,
      url: cur.url,
      page: cur.page,
      obj: cur.obj,
      from: cur.from,
      tab: cur.tab || '',
      check_hash: cur.likeCheckHash || ''
    }, {
      onDone: function(rows, shown, more) {
        ge('like_users_cont').appendChild(cf(rows));
        cur.shown = shown;
        more ? show('like_more_link') : hide('like_more_link');
        cur.loadingMore = false;
      },
      showProgress: function() {
        lockButton('like_more_link');
        addClass('like_more_link', 'flat_button_loading');
      },
      hideProgress: function() {
        unlockButton('like_more_link');
        removeClass('like_more_link', 'flat_button_loading');
      }
    });
  },

  switchTab: function(tabName, tabEl) {
    if (cur.loadingTab) return false;
    cur.loadingTab = true;

    ajax.post('widget_like.php', {
      act: 'a_stats_box',
      offset: 0,
      app: cur.aid,
      url: cur.url,
      page: cur.page,
      obj: cur.obj,
      from: cur.from,
      tab: tabName,
      check_hash:
      cur.likeCheckHash || ''
    }, {
      onDone: function(rows, shown, more) {
        var cont = ge('like_users_cont');
        cont.innerHTML = '';
        cont.appendChild(cf(rows))
        cur.shown = shown;
        more ? show('like_more_link') : hide('like_more_link');
        cur.loadingTab = false;
        cur.loadingMore = false;
        tabEl && uiTabs.switchTab(tabEl);
        cur.tab = tabName;
      },
      showProgress: function() {
        var box = curBox();
        box && addClass(box.bodyNode, 'box_loading');
      },
      hideProgress: function() {
        var box = curBox();
        box && removeClass(box.bodyNode, 'box_loading');
      }
    });
  },

  resizeWidget: function() {
    if (!cur.Rpc) return;
    if (cur.autoWidth && ge('main')) {
      cur.Rpc.callMethod('resizeWidget', Math.round(getSize(ge('main'))[0]), cur.height);
    } else if (ge('like_table')) {
      cur.Rpc.callMethod('resize', getSize(ge('like_table'))[1]);
    }
  },

  override: function(file, force) {
    if ((!StaticFiles[file] && force !== true) || file !== 'lite.js') return;
    extend(window, {

      showTooltip: Widgets.showTooltip,

      showBox: Widgets.showBox(null, function() {
        cur.Rpc.callMethod('hideTooltip', true);
      }),

      showCaptchaBox: Widgets.showCaptchaBox,

      showReCaptchaBox: Widgets.showReCaptchaBox,

      openFullList: function() {
        cur.Rpc.callMethod('statsBox', 'show');
      },

      goAway: function(url) {
        return true;
      },

      gotSession: function(session_data) {
        setTimeout(function () {
          location.reload();
        }, 1000);
        location.href = location.href + '&1';
      },

      animateCount: function(el, newCount, opts) {
        el = ge(el);
        opts = opts || {};

        if (opts.str) {
          newCount = trim(newCount.toString()) || '';
        } else {
          newCount = positive(newCount);
        }
        if (!el) return;
        if (browser.mobile && !browser.safari_mobile && !browser.android) {
          val(el, newCount || '');
          return;
        }

        var curCount = data(el, 'curCount'),
            nextCount = data(el, 'nextCount');

        if (typeof nextCount == 'number' || opts.str && typeof nextCount == 'string') {
          if (newCount != nextCount) {
            data(el, 'nextCount', newCount);
          }
          return;
        }
        if (typeof curCount == 'number' || opts.str && typeof curCount == 'string') {
          if (newCount != curCount) {
            data(el, 'nextCount', newCount);
          }
          return;
        }
        if (opts.str) {
          curCount = trim(val(el).toString()) || '';
        } else {
          curCount = positive(val(el));
        }
        if (opts.str === 'auto') {
          opts.str = !curCount.match(/^\d+$/) || !newCount.match(/^\d+$/);
          if (!opts.str) {
            curCount = positive(curCount);
            newCount = positive(newCount);
          }
        }
        if (curCount == newCount) {
          return;
        }
        data(el, 'curCount', newCount);
        var incr = opts.str ? (curCount.length == newCount.length ? curCount < newCount : curCount.length < newCount.length) : curCount < newCount,
            big = (incr ? newCount : curCount).toString(),
            small = (incr ? curCount : newCount).toString(),
            constPart = [],
            constEndPart = [],
            bigPart = '',
            smallPart = '',
            i, l, j;

        if (!opts.str) {
          small = ((new Array(big.length - small.length + 1)).join('0')) + small;
        }
        for (i = 0, l = big.length; i < l; i++) {
          if ((j = big.charAt(i)) !== small.charAt(i)) {
            break;
          }
          constPart.push(j);
        }
        bigPart = big.substr(i);
        smallPart = small.substr(i);

        if (opts.str) {
          for (i = bigPart.length; i > 0; i--) {
            if ((j = bigPart.charAt(i)) !== smallPart.charAt(i)) {
              break;
            }
            constEndPart.unshift(j);
          }
          if (constEndPart.length) {
            bigPart = bigPart.substr(0, i + 1);
            smallPart = smallPart.substr(0, i + 1);
          }
        }

        constPart = constPart.join('').replace(/\s$/, '&nbsp;');
        constEndPart = constEndPart.join('').replace(/^\s/, '&nbsp;');

        if (!trim(val(el))) {
          val(el, '&nbsp;');
        }
        var h = el.clientHeight || el.offsetHeight;
        val(el, '<div class="counter_wrap inl_bl"></div>');
        var wrapEl = el.firstChild,
            constEl1, constEl2, animwrapEl, animEl,
            vert = true;

        if (constPart.length) {
          wrapEl.appendChild(constEl1 = ce('div', {className: 'counter_const inl_bl', innerHTML: constPart}));
        }
        if (!constPart.length) {
          smallPart = smallPart.replace(/^0+/, '');
        }
        if (!smallPart || smallPart == '0' && !constPart.length) {
          smallPart = '&nbsp;';
          vert = constPart.length ? true : false;
        }

        wrapEl.appendChild(animwrapEl = ce('div', {className: 'counter_anim_wrap inl_bl'}));
        animwrapEl.appendChild(animEl = ce('div', {
          className: 'counter_anim ' + (incr ? 'counter_anim_inc' : 'counter_anim_dec'),
          innerHTML: '<div class="counter_anim_big"><span class="counter_anim_big_c">' + bigPart + '</span></div>' +
                     (vert ? '<div class="counter_anim_small"><span class="counter_anim_small_c">' + smallPart + '</span></div>' : '')
        }, vert ? {marginTop: incr ? -h : 0} : {right: 0}));
        if (opts.str) {
          setStyle(animEl, {textAlign: 'right', right: 0});
        }

        var bigW = getSize(geByClass1('counter_anim_big_c', animEl, 'span'))[0],
            smallW = vert ? (smallPart == '&nbsp;' ? bigW : getSize(geByClass1('counter_anim_small_c', animEl, 'span'))[0]) : 0;

        if (constEndPart.length) {
          wrapEl.appendChild(constEl2 = ce('div', {className: 'counter_const inl_bl', innerHTML: constEndPart}));
        }

        setStyle(wrapEl, {width: (constEl1 && getSize(constEl1)[0] || 0) + (constEl2 && getSize(constEl2)[0] || 0) + bigW + 0})

        if (browser.csstransitions === undefined) {
          var b = browser, bv = floatval(b.version);
          browser.csstransitions =
            (b.chrome && bv >= 9.0) ||
           (b.mozilla && bv >= 4.0) ||
           (b.opera && bv >= 10.5) ||
           (b.safari && bv >= 3.2) ||
           (b.safari_mobile) ||
           (b.android);
        }
        var css3 = browser.csstransitions;
        setStyle(animwrapEl, {width: incr ? smallW : bigW});

        var onDone = function () {
          val(el, newCount || ' ');
          var next = data(el, 'nextCount');
          data(el, 'curCount', false);
          data(el, 'nextCount', false);
          if (typeof next == 'number' || opts.str && typeof next == 'string') {
            setTimeout(animateCount.pbind(el, next, opts), 0);
          }
          opts.onDone && opts.onDone();
        }, margin = vert ? {marginTop: incr ? 0 : -h} : {marginRight: incr ? -smallW : 0};
        if (css3) {
          getStyle(animwrapEl, 'width');
          addClass(animwrapEl, 'counter_css_anim_wrap');
          if (bigW != smallW) {
            setStyle(animwrapEl, {width: incr ? bigW : smallW});
          }
          if (vert) setStyle(animEl, margin);
          setTimeout(onDone, 300);

          if (opts.fadeMode) {
            setStyle(geByClass1('counter_anim_big', el), 'opacity', 1);
            setStyle(geByClass1('counter_anim_small', el), 'opacity', 0);
          }
        } else {
          if (bigW != smallW) {
            animate(animwrapEl, {width: incr ? bigW : smallW}, {duration: 100});
          }
          if (vert) {
            animate(animEl, margin, {duration: 300, transition: Fx.Transitions.easeOutCirc, onComplete: onDone});
          } else {
            setTimeout(onDone, 300);
          }
        }
      }

    });
  }
}

try{stManager.done('api/widgets/al_like.js');}catch(e){}
