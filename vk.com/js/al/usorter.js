var usorter = {
  sqr: function(x) {
    return x * x;
  },
  evCoords: function(ev) {
    return browser.android ? [ev.touches[0].pageX + (ev.pageX || 0), ev.touches[0].pageY + (ev.pageY || 0)] : [ev.pageX, ev.pageY];
  },

  animstop: function() {
    clearInterval(usorter.animtimer);
    usorter.animtimer = false;
  },
  animcache: {},
  animstep: function() {
    var finished = [], all = true, temp;
    for (var i in usorter.animcache) {
      if (i == 0) {
        all = false;
        scrollNode.scrollTop += Math.ceil(usorter.animcache[i] / 5);
        continue;
      }
      var a = usorter.animcache[i], e = a.el, f = Fx.Transitions.easeOutQuint, dt = 200;
      var prev = vkNow();
      a.t += prev - a.prev;
      a.prev = prev;
      if (a.t < dt) {
        all = false;
        e.style.left = f(a.t, a.sx, a.dx, dt) + 'px';
        e.style.top = f(a.t, a.sy, a.dy, dt) + 'px';
        if (browser.msie8) { // force redraw
          temp = e.offsetLeft;
        }
        continue;
      }
      e.style.left = (a.sx + a.dx) + 'px';
      e.style.top = (a.sy + a.dy) + 'px';
      if (browser.msie8) { // force redraw
        temp = e.offsetLeft;
      }
      clearInterval(a.timer);
      finished.push(e.parentNode.id);
      if (a.h) a.h.apply(e);
    }
    for (var i in finished) {
      delete(usorter.animcache[finished[i]]);
    }
    if (all) {
      usorter.animstop();
    }
  },
  animdone: function(s) {
    removeClass(domPN(this), s.clsUp);
    setStyle(this, {left: 0, top: 0});
    if (cur.usorterSetSize) {
      setStyle(this.parentNode, {width: '', height: ''});
    }
  },
  animate: function(e, sx, sy, x, y, handler, s) {
    if (data(e, 'tween')) data(e, 'tween').stop(true);
    if (browser.msie8 || sx == x && sy == y) {
      removeClass(domPN(e), s.clsUp);
      setStyle(e, {left: 0, top: 0});
      if (cur.usorterSetSize) {
        setStyle(e.parentNode, {width: '', height: ''});
      }
      return;
    }
    var anim = {t: 0, sx: sx, sy: sy, dx: x - sx, dy: y - sy, h: handler, prev: vkNow()};
    if (usorter.animcache[e.parentNode.id]) {
      extend(usorter.animcache[e.parentNode.id], anim);
      return;
    }
    usorter.animcache[e.parentNode.id] = extend(anim, {el: e});
    if (!usorter.animtimer) {
      usorter.animtimer = setInterval(usorter.animstep, 13);
    }
  },

  first: function(obj) {
    el = obj.firstChild;
    while(el && el.nodeType == 3) {
      el = el.nextSibling;
    }
    return el;
  },

  mousedown: function(ev) {
    var touch = ev && ev.touches && ev.touches.length == 1;
    if (ev && (ev.button == 2 || ev.which == 3 || ev.ctrlKey || ev.metaKey) && !touch) {
      return true;
    }
    if (usorter.current) return;
    cur.usorterOver = false;

    var el = this, inner = usorter.first(el), s = el.parentNode.usorter, evc = usorter.evCoords(ev);
    if (ev.target.getAttribute('nosorthandle') || el.getAttribute('nodrag')) return;

    usorter.current = s;
    usorter.nextEl = el.nextSibling;
    extend(s, {drag: el});
    setStyle(inner, {left: el.x + 'px', top: el.y + 'px', zIndex: 150});
    addClass(el, s.clsUp);

    var size = getSize(inner);
    setStyle(el, {width: size[0], height: size[1]});

    addEvent(document, 'mousemove drag touchmove', usorter.mousemove);
    addEvent(document, 'mouseup touchend touchcancel', usorter.mouseup);
    if (false) {
      addEvent(usorter.scrollNode, 'scroll', usorter.mousemove);
    }
    extend(s, {
      startX: evc[0],
      startY: evc[1] + (browser.msie6 ? pageNode.scrollTop : 0),
      before: domNS(el),
      newbef: domNS(el),
      after: domPS(el)
    });
    extend(usorter, {lastX: evc[0], lastY: evc[1], lastS: scrollNode.scrollTop});

    if (window.Privacy) Privacy.hide(-1);

    cur.cancelClick = false;

    return touch || cancelEvent(ev);
  },

  mousemove: function(ev) {
    if (!usorter.current) return;

    var cancel = true, evc = (ev.type == 'scroll') ? [usorter.lastX, usorter.lastY + scrollNode.scrollTop - usorter.lastS] : usorter.evCoords(ev);
    if (ev.type == 'scroll') {
      cancel = false;
    } else {
      usorter.lastX = evc[0];
      usorter.lastY = evc[1];
      usorter.lastS = scrollNode.scrollTop;
      if (!browser.safari_mobile && !browser.android && false) {
        var my = evc[1] - (browser.msie6 ? 0 : scrollNode.scrollTop);
        if (my < 100) {
          usorter.animcache[0] = my - 100;
        } else if (my > lastWindowHeight - 100) {
          usorter.animcache[0] = my + 100 - lastWindowHeight;
        } else if (usorter.animcache[0]) {
          delete(usorter.animcache[0]);
        }
        if (usorter.animcache[0] && !usorter.animtimer) {
          usorter.animtimer = setInterval(usorter.animstep, 13);
        }
      }
    }

    var s = usorter.current;
    var el = s.drag;
    var dx = evc[0] - s.startX;
    var dy = evc[1] + (browser.msie6 ? pageNode.scrollTop : 0) - s.startY;
    var x = el.x, nx = x + dx, y = el.y, ny = y + dy, temp;

    if (dx > 10 || dx < -10 || dy > 10 || dy < -10) {
      cur.cancelClick = true;
    }

    setStyle(usorter.first(el), {left: nx, top: ny});
    if (browser.msie8) { // force redraw
      temp = el.offsetLeft;
    }

    var best = false, besty, found = false;
    var els = domPN(el).childNodes, elem = els[0], curr = elem.x, prev;
    var cx = nx + el.w, cy = ny + el.h;

    for (var i = 0, l = els.length; i < l; ++i) {
      var next = (i + 1 < l) ? els[i + 1] : {id: false, x: curr - 1}, curry = elem.y + elem.h;
      if (found === false && curr + elem.w >= cx) {
        found = elem;
        if (best === false || Math.abs(besty - cy) > Math.abs(curry - cy)) {
          best = elem;
          besty = curry;
        }
      }
      prev = curr;

      elem = next;
      curr = elem.x;
      if (curr < prev) {
        if (found === false && (best === false || Math.abs(besty - cy) > Math.abs(curry - cy))) {
          best = elem;
          besty = curry;
        }
        found = false;
      }
    }
    if (best.id === false) {
      best = null;
    }

    if (best === s.newbef) return;

    if (s.newbef !== el && s.newbef !== s.before) {
      animate(domFC(s.newbef ? domPS(s.newbef) : els[l - 1]), {left: 0}, 200);
      animate(domFC(s.newbef), {left: 0}, 200);
    }
    s.newbef = best;
    if (s.newbef !== el && s.newbef !== s.before) {
      if (!s.newbef || s.newbef.x > el.x) {
        animate(domFC(s.newbef ? domPS(s.newbef) : els[l - 1]), {left: -5}, 200);
      } else {
        var newbefps = domPS(s.newbef);
        if (newbefps && newbefps.x > s.newbef.x && Math.abs(newbefps.y + newbefps.h - cy) < Math.abs(s.newbef.y + s.newbef.h - cy)) {
          animate(domFC(s.newbef ? domPS(s.newbef) : els[l - 1]), {left: -5}, 200);
        } else {
          animate(domFC(s.newbef), {left: 5}, 200);
        }
      }
    }

    return cancel ? cancelEvent(ev) : true;
  },
  mouseup: function(ev) {
    if (!usorter.current) return;

    var s = usorter.current;
    var el = s.drag, evc = usorter.evCoords(ev), els = domPN(el).childNodes;
    var dx = (evc[0] || usorter.lastX) - s.startX;
    var dy = (evc[1] || usorter.lastY) + (browser.msie6 ? pageNode.scrollTop : 0) - s.startY;
    setStyle(usorter.first(el), {zIndex: 99});
    usorter.current = s.drag = false;

    if (s.newbef !== el && s.newbef !== s.before) {
      for (var i = 0, l = els.length; i < l; ++i) {
        var elem = els[i], first = usorter.first(elem);
        if (elem != el) {
          addClass(elem, s.clsUp);
          setStyle(elem, {width: 2 * elem.w, height: 2 * elem.h});
          setStyle(first, {zIndex: 90, left: elem.x, top: elem.y});
        }
      }
      if (s.newbef) {
        domPN(el).insertBefore(el, s.newbef);
      } else if (els[els.length - 1].getAttribute('nodrag')) {
        domPN(el).insertBefore(el, els[els.length - 1]);
      } else {
        domPN(el).appendChild(el);
      }
      for (var i = 0, l = els.length; i < l; ++i) {
        var elem = els[i], first = usorter.first(elem), x = elem.offsetLeft, y = elem.offsetTop;
        if (elem == el) {
          usorter.animate(first, elem.x + dx, elem.y + dy, x, y, usorter.animdone.bind(first, s), s);
        } else {
          usorter.animate(first, elem.x, elem.y, x, y, usorter.animdone.bind(first, s), s);
        }
        elem.x = x;
        elem.y = y;
      }
    } else {
      usorter.animate(usorter.first(el), el.x + dx, el.y + dy, el.x, el.y, usorter.animdone.bind(usorter.first(el), s), s);
    }

    usorter.stop();

    if (usorter.animcache[0]) {
      delete(usorter.animcache[0]);
      if (isEmpty(usorter.animcache)) {
        usorter.animstop();
      }
    }

    var before = domNS(el), after = domPS(el);
    if ((before !== s.before || after !== s.after) && s.onReorder) {
      s.onReorder(el, before, after);
    }
    delete(s.before);
    delete(s.newbef);
    delete(s.after);

    return cancelEvent(ev);
  },
  stop: function() {
    var s = usorter.current;
    removeEvent(document, 'mousemove drag touchmove', usorter.mousemove);
    removeEvent(document, 'mouseup touchend touchcancel', usorter.mouseup);
    s.drag = usorter.current = false;
  },
  added: function(parent) {
    if (browser.mobile && !browser.safari_mobile && !browser.android) return;
    var s = parent.usorter, l = s.count, el = domFC(parent), d = 0;
    for (var i = 0; el; el = domNS(el), ++i) {
      if (el.getAttribute('nodrag')) {
        d++;
        continue;
      }
      var first = usorter.first(el);
      var x = el.offsetLeft, y = el.offsetTop, sz = getSize(first);
      extend(el, {x: x, y: y, w: sz[0] / 2, h: sz[1] / 2, index: i});

      if (i >= l) {
        addEvent(el, 'mousedown touchstart', usorter.mousedown);
        setStyle(el, {cursor: 'move'});
      }
    }
    s.count += (i - l - d);
  },

  init: function(parent, opts) {
    if (browser.mobile && !browser.safari_mobile && !browser.android) return;

    usorter.scrollNode = browser.msie6 ? pageNode : window;
    parent = ge(parent);

    if (browser.msie7 || browser.msie6) parent.style.position = 'relative';

    var result = {
      parent: parent,
      canDrag: opts.canDrag,
      clsUp: opts.clsUp,
      count: 0,
      stop: function() {
        if (usorter.current == result) {
          usorter.stop();
        }
        for (var els = result.parent.childNodes, i = 0, l = els.length; i < l; ++i) {
          var ch = els[i];
          if (ch.getAttribute('nodrag')) continue;
          if (usorter.animcache[ch.id]) {
            delete(usorter.animcache[ch.id]);
          }
        }
      },
      destroy: function() {
        result.stop();
        var el = result.parent, els = el.childNodes;
        removeAttr(el, 'usorter');
        for (var i = 0, l = els.length; i < l; ++i) {
          var ch = els[i];
          removeEvent(ch, 'mousedown touchstart', usorter.mousedown);
        }
      },
      onReorder: opts.onReorder
    }

    parent.usorter = result;
    usorter.added(parent);
    return result;
  }
}

try{stManager.done('usorter.js');}catch(e){}
