var tooltips = {
  show: function(el, options) {
    if (el.hidetimer) {
      if (el.hidetimer) clearTimeout(el.hidetimer);
      el.hidetimer = 0;
      return;
    }
    if (!el.tt) return;
    el.tt.shown = false;
    if (el.ttimer) clearTimeout(el.ttimer);
    if (isFunction(options.text)) {
      var tt_text = geByClass1('tt_text', el.tt.container);
      if (tt_text) {
        tt_text.innerHTML = options.text();
      }
    }

    var opts = extend(el.tt.opts ? clone(el.tt.opts) : {}, options || {});
    if (!el.tt.el) {
      el.tt = 'show';
      el.ttimer = setTimeout(function() {
        if (el.tt.el) {
          opts.showdt = 0;
          tooltips.show(el, opts);
          return;
        }
        el.tt = 'shownow';
      }, opts.showdt || 0);
      return;
    }
    var canshow = opts.js ? (eval('(function(){return function(){var tip=this;' + opts.js + '};})()').apply(el.tt) !== false) : true;
    if (!canshow) {
      return;
    }
    if (isVisible(el.tt.container)) {
      if (!el.tt.showing) {
        animate(el.tt.container, {opacity: 1}, opts.showsp !== undefined ? opts.showsp : 200);
      }
      return;
    }
    el.ttimer = setTimeout(function() {
      var container = el.tt.container;
      if (isVisible(container)) return;

      var fix = el.tt.isFixed || false, xy = opts.forcexy ? opts.forcexy : getXY(el, fix),
          elsize = opts.forcesize ? opts.forcesize : getSize(el),
          toup = opts.toup,
          asrtl = vk.rtl && !opts.asrtl || opts.asrtl && !vk.rtl;

      if (!elsize[0] && !elsize[1]) {
        hide(el.tt.container);
        return;
      }

      container.style.opacity = 0;
      show(container);
      container.firstChild.className = 'toup' + (opts.toup ? 1 : '');
      var shift = opts.shift;
      if (isFunction(shift)) {
        shift = shift();
      }
      var st = fix ? 0 : (bodyNode.scrollTop || htmlNode.scrollTop || 0), ttsize = getSize(container), needDown = (xy[1] - ttsize[1] - shift[1]) < st, needUp = (xy[1] + elsize[1] + ttsize[1] + shift[2] - lastWindowHeight) > st;
      if (browser.msie7) {
        setStyle(container, {width: ttsize[0]});
      }

      var needLeft = (opts.black && lastWindowWidth && lastWindowWidth - (xy[0] + (asrtl ? elsize[0] : ttsize[0])) < 1);

      if (toup && needDown) {
        toup = false;
      } else if (!toup && needUp && !needDown) {
        toup = true;
      }
      if (opts.forcetodown) toup = false;
      if (opts.forcetoup) toup = true;
      if (toup != opts.toup || needLeft) {
        container.firstChild.className = 'toup' + (toup ? 1 : '') + (needLeft ? ' toleft' : '');
        ttsize = getSize(container);
      }
      var newtop = xy[1] + (toup ? -(ttsize[1] + shift[1]) : (elsize[1] + shift[2]));
      var starttop = newtop + intval(opts.slide) * (toup ? -1 : 1);
      var newleft = xy[0] + (asrtl ? (shift[0] + elsize[0] - ttsize[0]) : (toup ? -shift[0] : -(shift[3] || shift[0])));
      if (needLeft) {
        newleft -= ttsize[0] - 39;
      }

      if (opts.center && ttsize[0] != elsize[0]) {
        newleft -= asrtl ? 0 : (ttsize[0] - elsize[0]) / 2;
        var pointer = geByClass1(toup ? 'bottom_pointer' : 'top_pointer', container)
        if (pointer) {
          var marginLeft;
          if(newleft < 0) {
            marginLeft = (ttsize[0] - getSize(pointer)[0]) / 2 + newleft || 0;
            newleft = 0;
          } else {
            marginLeft = (ttsize[0] - getSize(pointer)[0]) / 2 || 0;
          }
          setStyle(pointer, {marginLeft: marginLeft + 'px'});
        }
      }

      addClass(container, toup ? 'tt_toup' : '');
      var startleft = newleft + intval(opts.slideX);

      el.tt.showing = true;
      setStyle(container, {top: starttop, left: startleft});
      animate(container, {top: newtop, left: newleft, opacity: 1}, opts.showsp !== undefined ? opts.showsp : 200, function() {
        el.tt && el.tt.showing && (el.tt.showing = false);
        if (opts.onShowEnd) opts.onShowEnd();
        el.tt && (el.tt.shown = true);
      });
      if (opts.onShowStart) opts.onShowStart(el.tt);
    }, opts.showdt || 0);
  },
  hide: function(el, options) {
    if (el.tt) {
      el.tt.shown = false;
    }
    if ((options || {}).fasthide) {
      clearTimeout(el.hidetimer);
      clearTimeout(el.ttimer);
      el.hidetimer = 0;
      if (el.tt && el.tt.el) hide(el.tt.container);
      return;
    }
    if (el.hidetimer) return;
    el.hidetimer = setTimeout(function() {
      el.hidetimer = 0;
      clearTimeout(el.ttimer);
      if (!el.tt || el.tt == 'hide' || el.tt.el && !isVisible(el.tt.container)) return;

      var opts = extend(el.tt.opts ? clone(el.tt.opts) : {}, options || {});
      if (!el.tt.el) {
        el.tt = 'hide';
        return;
      }
      el.ttimer = setTimeout(function() {
        if (!opts.hasover) {
          setStyle(el.tt.container, {pointerEvents: 'none'});
        }
        fadeOut(el.tt.container, opts.showsp !== undefined ? opts.showsp : 200, function() {
          if (el.tt && el.tt.container) {
            setStyle(el.tt.container, {pointerEvents: 'auto'});
          }
        });
        if (opts.onHide) {
          opts.onHide();
        }
      }, opts.hidedt || 0);
    }, 1);
  },
  hideAll: function() {
    if (!cur.tooltips) return;
    for (var i = 0; i < cur.tooltips.length; ++i) {
      if (cur.tooltips[i].el && cur.tooltips[i].el.ttimer) {
        clearTimeout(cur.tooltips[i].el.ttimer);
      }
      cur.tooltips[i].hide({fasthide: true});
    }
  },
  rePositionAll: function() {
    if (!cur.tooltips) return;
    for (var i = 0; i < cur.tooltips.length; ++i) {
      var opts = cur.tooltips[i].opts;
      if (!opts || !opts.nohideover && !opts.nohide) continue;

      var el = cur.tooltips[i].el,
          tt = cur.tooltips[i],
          container = tt.container;

      var fix = tt.isFixed || false, xy = getXY(el, fix),
          elsize = getSize(el),
          asrtl = vk.rtl && !opts.asrtl || opts.asrtl && !vk.rtl;
      if (!elsize[0] && !elsize[1]) continue;

      var ttsize = getSize(container);
      var needLeft = (opts.black && lastWindowWidth && lastWindowWidth - (xy[0] + ttsize[0]) < 1);
      var toup = hasClass(container.firstChild, 'toup1');
      var shift = opts.shift;
      if (isFunction(shift)) {
        shift = shift();
      }
      var newleft = xy[0] + (asrtl ? (shift[0] + elsize[0] - ttsize[0]) : (toup ? -shift[0] : -(shift[3] || shift[0])));
      if (needLeft) {
        newleft -= ttsize[0] - 39;
      }
      if (opts.center && ttsize[0] != elsize[0]) {
        newleft -= (ttsize[0] - elsize[0]) / 2;
      }
      var startleft = newleft; // + intval(opts.slideX);
      setStyle(container, {left: startleft});
    }
  },
  destroy: function(el) {
    if (!el) return;

    clearTimeout(el.ttimer);
    clearTimeout(el.hidetimer);

    if (el.tt && el.tt.el) {
      if (el.tt.onClean) el.tt.onClean();

      cleanElems(el.tt.container);
      removeEvent(el, 'mouseout', el.tthide);
      if (el.tt.container) { // somehow ?? it can be undefined here
        bodyNode.removeChild(el.tt.container);
      }

      el.tt.el = false;
    }
    removeAttr(el, 'tt', 'tthide', 'ttimer', 'hidetimer');
  },
  destroyAll: function(ancestor) {
    if (!cur.tooltips) return;

    for (var i = 0; i < cur.tooltips.length; ++i) {
      if (ancestor && !isAncestor(cur.tooltips[i].el, ancestor)) {
        continue;
      }
      cur.tooltips[i].destroy();
    }
    if (!ancestor) {
      delete cur.tooltips;
    }
  },

  create: function(el, options) {
    var opts = extend({
      shift: (options.black ? [11, 3, 3] : [2, 3, 3]), // [leftShift, toupTopShift, notToupTopShift]
      toup: true
    }, options);
    if (!el.tthide) {
      el.tthide = tooltips.hide.pbind(el);
      if (!options.nohide) addEvent(el, 'mouseout', el.tthide);
    }
    var no_shadow = opts.no_shadow ? ' no_shadow' : '';
    if (!opts.content) {
      if (el.tt && !opts.force) {
        if (el.hidetimer) {
          clearTimeout(el.hidetimer);
          el.hidetimer = 0;
          return;
        }
        return;
      }
      if (!opts.text) {
        if (!opts.url) return;
        clearTimeout(el.ttimer);
        el.ttimer = setTimeout(function() {
          el.tt = 'show';
          ajax.post(opts.url, opts.params || {}, {onDone: function(html, js) {
            var old = el.tt, options = clone(opts);
            extend(options, {content: html || '', js: js});
            tooltips.create(el, options);
            if (old == 'shownow') {
              tooltips.show(el, extend(options, {showdt: 0}));
            }
          }, onFail: function() { return true; }, cache: opts.cache || 0});
          tooltips.show(el, opts);
        }, opts.ajaxdt || 0);
        return;
      }
      opts.content = '<div class="tt_text">' + opts.text + '</div>';
    }
    var cls = (opts.black ? 'ttb ' : 'tt ') + (opts.className || '');
    if (el.tt && el.tt.el) {
      var cont = el.tt.container;
      if (el.tt.onClean) el.tt.onClean();
      geByClass1('wrapped', cont).innerHTML = opts.content;
      extend(el.tt, {
        opts: opts,
        show: tooltips.show.pbind(el, options)
      });
      cont.className = cls;
      hide(cont);
    } else {
      if (opts.black) {
        var c = ce('div', {
          innerHTML: '<div><div class="top_pointer"></div><div class="ttb_cont">'+opts.content+'</div><div class="bottom_pointer"></div></div>',
          className: cls
        }, {display: 'none'});
      } else {
        var c = ce('div', {
          innerHTML: '<table cellspacing="0" cellpadding="0">\
    <tr><td colspan="3" class="tt_top"><div class="top_pointer"></div></td></tr>\
    <tr>\
      <td class="side_sh"></td>\
      <td class="outer"><table cellspacing="0" cellpadding="0">\
        <tr><td class="side_sh"></td>\
          <td class="wrapped">' + opts.content + '</td>\
        <td class="side_sh"></td></tr>\
        <tr><td colspan="3"><div class="bottom_sh"></div></td></tr>\
      </table></td>\
      <td class="side_sh"></td>\
    </tr>\
    <tr><td colspan="3" class="tt_bottom"><div class="bottom_sh"></div><div class="bottom_pointer'+no_shadow+'"></div></td></tr>\
  </table>',
          className: cls
        }, {display: 'none'});
      }
      bodyNode.appendChild(c);
      var res = extend({
        el: el,
        opts: opts,
        show: tooltips.show.pbind(el, options),
        hide: el.tthide,
        destroy: tooltips.destroy.pbind(el),
        container: c
      }, opts.tip || {});
      if (!opts.nohideover && (!opts.text || opts.hasover)) {
        addEvent(c, 'mouseover', res.show);
        addEvent(c, 'mouseout' , res.hide);
      }
      var isFixed = false, pel = el;
      while (pel) {
        if (getStyle(pel, 'position') == 'fixed') {
          isFixed = true;
          break;
        }
        pel = pel.offsetParent;
      }
      if (isFixed) {
        addClass(res.container, 'fixed');
        setStyle(res.container, {position: 'fixed'});
      } else {
        removeClass(res.container, 'fixed');
        setStyle(res.container, {position: 'absolute'});
      }
      res.isFixed = isFixed;
      el.tt = res;
      if (!cur.tooltips) {
        cur.tooltips = [];
      }
      cur.tooltips.push(res);
    }
    if (opts.init) opts.init(res);
  },
  pollFastShare: function(post, url, hash, aid, poll_id) {
    ajax.post('widget_poll.php', {
      act: 'a_share',
      sid: post,
      url: url,
      hash: hash,
      app: aid,
      poll_id: poll_id,
      no_widget: 1
    }, {
      onDone: function(t) {
        el.innerHTML = t;
      },
      showProgress: function() {
        show(el.previousSibling);
        hide(el);
      },
      hideProgress: function() {
        hide(el.previousSibling);
        show(el);
      }
    });
  },

  pollVote: function(post, option, attachI) {
    var pr = ge('poll_bottom' + post);
    ajax.post('widget_poll.php', {
      act: 'a_vote',
      option_id: option,
      hash: cur.polls[post].hash,
      app: cur.polls[post].aid,
      poll_id: cur.polls[post].id,
      no_widget: 1,
      url: cur.polls[post].url,
      sid: post,
      i: attachI
    }, {
      onDone: function(html, js) {
        var lnk = ge('post_media_lnk' + post + '_' + attachI), opts = extend(lnk.tt.opts, {
          className: 'wall_tt',
          content: html || ' ',
          showdt: 0,
          js: js
        });
        tooltips.create(lnk, opts);
        lnk.tt.show();
      },
      showProgress: function() {
        show(pr.nextSibling);
        hide(pr);
      },
      hideProgress: function() {
        show(pr);
        hide(pr.nextSibling);
      }
    });
  },

  addAudio: function(el, oid, aid, hash) {
    ajax.post('audio.php', {
      act: 'a_add',
      oid: oid,
      aid: aid,
      hash: hash
    }, {
      onDone: function() {
        el.parentNode.replaceChild(ce('div', {className: 'fl_r add_audio_plus done'}), el);
      },
      onFail: function() {
        return true;
      },
      showProgress: function() {
        hide(el.nextSibling);
        show(el.previousSibling);
      },
      hideProgress: function() {
        hide(el.previousSibling);
        show(el.nextSibling);
      }
    });
  }
}

try{stManager.done('tooltips.js');}catch(e){}
