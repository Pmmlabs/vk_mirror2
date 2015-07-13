var qsorter = {
  sqr: function(x) {
    return x * x;
  },
  evCoords: function(ev) {
    return browser.android ? [ev.touches[0].pageX + (ev.pageX || 0), ev.touches[0].pageY + (ev.pageY || 0)] : [ev.pageX, ev.pageY];
  },

  animstop: function() {
    clearInterval(qsorter.animtimer);
    qsorter.animtimer = false;
  },
  animcache: {},
  animstep: function() {
    var finished = [], all = true, temp;
    for (var i in qsorter.animcache) {
      if (i == 0) {
        all = false;
        scrollNode.scrollTop += Math.ceil(qsorter.animcache[i] / 5);
        continue;
      }
      var a = qsorter.animcache[i], e = a.el, f = Fx.Transitions.easeOutQuint, dt = 200;
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
      delete(qsorter.animcache[finished[i]]);
    }
    if (all) {
      qsorter.animstop();
    }
  },
  animdone: function(s) {
    if (s.cls) {
      domPN(this).className = s.cls;
    } else {
      removeClass(domPN(this), s.clsUp);
    }
    this.style.left = this.style.top = '';
    if (cur.qsorterSetSize) {
      setStyle(this.parentNode, {width: '', height: ''});
    }
  },
  animate: function(e, sx, sy, x, y, handler, s) {
    if (browser.msie8) {
      if (s.cls) {
        domPN(e).className = s.cls;
      } else {
        removeClass(domPN(e), s.clsUp);
      }
      e.style.left = e.style.top = '';
      if (cur.qsorterSetSize) {
        setStyle(e.parentNode, {width: '', height: ''});
      }
      return;
    }
    var anim = {t: 0, sx: sx, sy: sy, dx: x - sx, dy: y - sy, h: handler, prev: vkNow()};
    if (qsorter.animcache[e.parentNode.id]) {
      extend(qsorter.animcache[e.parentNode.id], anim);
      return;
    }
    qsorter.animcache[e.parentNode.id] = extend(anim, {el: e});
    if (!qsorter.animtimer) {
      qsorter.animtimer = setInterval(qsorter.animstep, 13);
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
    if (qsorter.current) return;
    cur.qsorterOver = false;

    var el = this, inner = qsorter.first(el), s = el.parentNode.qsorter, evc = qsorter.evCoords(ev), size;
    if (s.canDrag) {
      if (!s.canDrag(el)) return;
    } else if (ev.target.getAttribute('nosorthandle') || el.getAttribute('nodrag')) return;

    qsorter.current = s;
    qsorter.nextEl = el.nextSibling;
    extend(s, {drag: el});
    setStyle(inner, {left: el.x + 'px', top: el.y + s.offset + 'px', zIndex: 150});
    if (cur.qsorterSetSize) {
      size = getSize(inner);
    }
    if (s.cls) {
      el.className = s.clsUp;
    } else {
      addClass(el, s.clsUp);
    }
    if (cur.qsorterSetSize) {
      setStyle(el, {width: size[0], height: size[1]});
    }

    addEvent(document, 'mousemove drag touchmove', qsorter.mousemove);
    addEvent(document, 'mouseup touchend touchcancel', qsorter.mouseup);
    if (!browser.opera && !browser.msie && !browser.mozilla && !browser.safari_mobile && !browser.android && !s.noscroll) {
      addEvent(qsorter.scrollNode, 'scroll', qsorter.mousemove);
    }
    extend(s, {
      startX: evc[0],
      startY: evc[1] + (browser.msie6 ? pageNode.scrollTop : 0),
      before: el.nextSibling,
      after: el.previousSibling
    });
    extend(qsorter, {lastX: evc[0], lastY: evc[1], lastS: scrollNode.scrollTop});

    if (window.Privacy) Privacy.hide(-1);
    if (el.tthide) el.tthide();

    cur.cancelClick = false;

    return touch || cancelEvent(ev);
  },

  checkOver: function(s, evc) {
    for (var i in s.dragEls) {
      var d = s.dragEls[i];
      if (!d.xy || d.xy[0] == 0) {
        d.xy = getXY(d);
        d.sz = getSize(d);
      }
      if (evc[0] > d.xy[0] && evc[1] > d.xy[1] && evc[0] < d.xy[0]+d.sz[0] && evc[1] < d.xy[1]+d.sz[1]) {
        if (cur.qsorterOver != d) {
          if (cur.qsorterOver) {
            s.onDragOut(cur.qsorterOver);
          }
          cur.qsorterOver = d;
          s.onDragOver(d);
        }
      } else if (cur.qsorterOver && cur.qsorterOver == d) {
        cur.qsorterOver = false;
        s.onDragOut(d);
      }
    }
  },

  mousemove: function(ev) {
    if (!qsorter.current) return;

    var cancel = true, evc = (ev.type == 'scroll') ? [qsorter.lastX, qsorter.lastY + scrollNode.scrollTop - qsorter.lastS] : qsorter.evCoords(ev);
    var s = qsorter.current;
    if (ev.type == 'scroll') {
      cancel = false;
    } else {
      qsorter.lastX = evc[0];
      qsorter.lastY = evc[1];
      qsorter.lastS = scrollNode.scrollTop;
      if (!browser.safari_mobile && !browser.android && !s.noscroll) {
        var my = evc[1] - (browser.msie6 ? 0 : scrollNode.scrollTop);
        if (my < 100) {
          qsorter.animcache[0] = my - 100;
        } else if (my > lastWindowHeight - 100) {
          qsorter.animcache[0] = my + 100 - lastWindowHeight;
        } else if (qsorter.animcache[0]) {
          delete(qsorter.animcache[0]);
        }
        if (qsorter.animcache[0] && !qsorter.animtimer) {
          qsorter.animtimer = setInterval(qsorter.animstep, 13);
        }
      }
    }

    var el = s.drag;
    var dx = evc[0] - s.startX;
    var dy = evc[1] + (browser.msie6 ? pageNode.scrollTop : 0) - s.startY;
    var pageSize = getSize(scrollNode), elPos = getXY(el),
        pageW = pageSize[0], pageH = Math.max(window.lastWindowHeight || 0, pageSize[1]);
    if (elPos[0] < pageW - s.width && elPos[0] + dx > pageW - s.width) {
      dx = pageW - elPos[0] - s.width;
    }
    if (elPos[1] < pageH - s.height && elPos[1] + dy > pageH - s.height) {
      dy = pageH - elPos[1] - s.height;
    }
    var x = el.x, nx = x + dx, y = el.y, ny = y + dy, w = s.width, h = s.height, temp;
    var i = el.i, xsize = s.xsize, p = i % xsize, q = Math.floor((i + 0.1) / xsize);

    if (dx > 10 || dx < -10 || dy > 10 || dy < -10) {
      addClass(el, 'qs_drag_started');
      cur.cancelClick = true;
    }

    if (s.noMoveCursorFirst && !el.cursor_changed) {
      el.cursor_changed = true;
      el.old_cursor = el.style.cursor;
      el.style.cursor = 'move';
    }

    setStyle(qsorter.first(el), {left: nx, top: ny + s.offset});
    if (browser.msie8) { // force redraw
      temp = el.offsetLeft;
    }

    if (s.dragCont && s.dragCont.visible) {
      if (evc[0] > s.dragCont.x1 && evc[1] > s.dragCont.y1 && evc[0] < s.dragCont.x2 && evc[1] < s.dragCont.y2) {
        if (!cur.sorterDragIn) {
          cur.sorterDragIn = 1;
          animate(el, {opacity: 0.2}, 400);
        }
        qsorter.checkOver(s, evc);
        return;
      } else if (cur.sorterDragIn) {
        cur.sorterDragIn = 0;
        animate(el, {opacity: 1}, 400);
      }
      if (cur.qsorterOver) {
        qsorter.checkOver(s, evc);
      }
    }

    var newp = Math.floor(p + 0.5 + (dx / w)),
        newq = Math.floor(q + 0.5 + (dy / h)),
        nodragq = Math.floor(s.noDragCount / xsize),
        nodragp = s.noDragCount - nodragq * xsize;
    newp = Math.min(Math.max(newp, 0), xsize - 1); newq = Math.max(newq, 0);
    if (newq < nodragq) newq = nodragq;
    if (newq == Math.ceil(s.noDragCount / xsize) - 1 && newp < nodragp) newp = nodragp;
    var newi = newq * xsize + newp;
    if (newi > s.count - 1) {
      var newd = newi - (s.count - 1);
      newq -= Math.floor((newd + 0.1) / xsize);
      newp -= newd % xsize;
      if (newp < 0) {
        newp += xsize;
        --newq;
      }
      newi = s.count - 1;
    }
    if (newi == i) return cancel ? cancelEvent(ev) : true;

    var op = p, oq = q, e = false, d = (newi < i) ? -1 : 1;

    for (var j = i; j != newi; j += d) {
      var np = p + d, nq = q;
      if (np == xsize) {
        np = 0;
        ++nq;
      } else if (np < 0) {
        np = xsize - 1;
        --nq;
      }

      e = s.elems[np][nq];

      var sx = e.x;
      var sy = e.y;
      var x = sx + (p - np) * w;
      var y = sy + (q - nq) * h;
      setStyle(qsorter.first(e), {left: sx, top: sy + s.offset});
      if (s.cls) {
        e.className = s.clsUp + ' qs_moving_obj';
      } else {
        addClass(e, s.clsUp);
        addClass(e, 'qs_moving_obj2');
      }
      if (cur.qsorterSetSize) {
        var size = getSize(qsorter.first(e));
        setStyle(e, {width: size[0], height: size[1]});
      }

      extend(e, {
        i: j,
        x: x,
        y: y
      });
      s.elems[p][q] = e;
      qsorter.animate(qsorter.first(e), sx, sy+s.offset, x, y+s.offset, qsorter.animdone.bind(qsorter.first(e), s), s);

      p = np; q = nq;
    }

    if (d < 0) {
      s.parent.insertBefore(el, e);
    } else {
      if (e.nextSibling) {
        s.parent.insertBefore(el, e.nextSibling);
      } else {
        s.parent.appendChild(el);
      }
    }

    dx = (p - op) * w;
    dy = (q - oq) * h;
    s.elems[newp][newq] = el;
    extend(el, {
      i: newi,
      x: el.x + dx,
      y: el.y + dy
    });

    s.startX += dx; s.startY += dy;

    if (browser.msie8) { // force redraw
      temp = el.offsetLeft;
    }

    return cancel ? cancelEvent(ev) : true;
  },
  mouseup: function(ev) {
    if (!qsorter.current) return;

    var s = qsorter.current;
    var el = s.drag, evc = qsorter.evCoords(ev);
    var dx = (evc[0] || qsorter.lastX) - s.startX;
    var dy = (evc[1] || qsorter.lastY) + (browser.msie6 ? pageNode.scrollTop : 0) - s.startY + s.offset;
    setStyle(qsorter.first(el), {zIndex: 125});

    if (s.noMoveCursorFirst) {
      el.style.cursor = el.old_cursor;
      delete el.old_cursor;
      delete el.cursor_changed;
    }

    qsorter.current = s.drag = false;
    if (cur.qsorterOver) {
      if (s.onDrop(cur.qsorterOver, el)) {
        var f = qsorter.first(el);
        setStyle(f, {top: 0, left: 0})
        if (qsorter.nextEl) {
          el.parentNode.insertBefore(el, qsorter.nextEl);
        } else {
          el.parentNode.appendChild(el);
        }
        qsorter.animdone.bind(f)(s);
        qsorter.stop();
        if (qsorter.animcache[0]) {
          delete(qsorter.animcache[0]);
          if (isEmpty(qsorter.animcache)) {
            qsorter.animstop();
          }
        }
        if (cur.sorterDragIn) {
          cur.sorterDragIn = 0;
          setStyle(el, {opacity: 1});
        }
        return cancelEvent(ev);
      }
    }

    qsorter.animate(qsorter.first(el), el.x + dx, el.y + dy, el.x, el.y + s.offset, qsorter.animdone.bind(qsorter.first(el), s), s);

    qsorter.stop();

    if (qsorter.animcache[0]) {
      delete(qsorter.animcache[0]);
      if (isEmpty(qsorter.animcache)) {
        qsorter.animstop();
      }
    }

    if (cur.sorterDragIn) {
      cur.sorterDragIn = 0;
      animate(el, {opacity: 1}, 100);
    }

    var before = el.nextSibling, after = el.previousSibling;
    if ((before != s.before || after != s.after) && s.onReorder) {
      s.onReorder(el, before, after);
    }
    delete(s.before);
    delete(s.after);

    return cancelEvent(ev);
  },
  stop: function() {
    var s = qsorter.current;
    removeEvent(document, 'mousemove drag touchmove', qsorter.mousemove);
    removeEvent(document, 'mouseup touchend touchcancel', qsorter.mouseup);
    s.drag = qsorter.current = false;
  },
  update: function(parent, opts) {
    if (browser.mobile && !browser.safari_mobile && !browser.android) return;
    var s = parent.qsorter;
    extend(s, opts);
    s.count = 0;
    s.elems = [];
    s.noDragCount = 0;
    if (s.dragCont) {
      s.updateDragCont();
    }
    this.added(parent);
  },
  added: function(parent) {
    if (browser.mobile && !browser.safari_mobile && !browser.android) return;
    var s = parent.qsorter, l = s.count, xsize = s.xsize, to = l % xsize;
    var el = l ? s.elems[(l - 1) % xsize][Math.floor((l - 0.9) / xsize)].nextSibling : qsorter.first(parent);
    s.noDragCount = s.noDragCount || 0;
    for (var i = l, cnt = 0; el; el = el.nextSibling, ++i) {
      if (el.nodeType == 3) continue;
      if (el.getAttribute('nodragend')) continue;
      cnt++;
      var noDrag = el.getAttribute('nodrag');
      if (noDrag) s.noDragCount++;
      if (!s.elems[to]) {
        s.elems[to] = [];
      }
      s.elems[to].push(el);

      var first = qsorter.first(el);
      var x = first.offsetLeft, y = first.offsetTop;
      if (browser.msie7 || browser.msie6) {
        x += el.offsetLeft;
        y += el.offsetTop;
      }
      extend(el, {x: x, y: y, i: i});
      addEvent(el, 'mousedown touchstart', qsorter.mousedown);
      if (browser.opera && !cur.qsorterNoOperaStyle) {
        el.style.display = 'block';
        el.style.cssFloat = 'left';
      }
      if (!noDrag && !s.noMoveCursor && !s.noMoveCursorFirst) el.style.cursor = 'move';

      ++to;
      if (to >= xsize) to -= xsize;
    }
    s.count += cnt;
  },
  remove: function(parent, obj) {
    var s = parent.qsorter, l = s.count, xsize = s.xsize, to = l % xsize;
    debugLog('x', obj.x, obj.y);

    if (!s.elems.length) return;
    var row = s.elems[0].length;

    var lastEl = false;
    debugLog('startRow', row);
    while(row) {
      row -= 1;
      var col = s.xsize;
      while(col) {
        col -= 1;
        var tEl = (s.elems[col] || [])[row];

        debugLog('col: ', col, ' row: ', row, ' el: ', tEl);
        if (!tEl) {
          continue;
        }

        if (lastEl) {
          s.elems[col][row] = extend(lastEl, {
            x: tEl.x,
            y: tEl.y,
            i: tEl.i
          });
          debugLog('G', col, row, tEl.i);
        } else {
          s.elems[col].pop();
        }

        if (tEl == obj) {
          row = 0;
          break;
        }

        lastEl = tEl;
      }
    }

    re(obj);
    s.count -= 1;
    return lastEl;
  },

// needs width,height,xsize
  init: function(parent, opts) {
    if (browser.mobile && !browser.safari_mobile && !browser.android) return;

    qsorter.scrollNode = browser.msie6 ? pageNode : window;
    parent = ge(parent);

    if (browser.msie7 || browser.msie6) parent.style.position = 'relative';

    var result = {
      parent: parent,
      xsize: opts.xsize,
      width: opts.width,
      height: opts.height,
      canDrag: opts.canDrag,
      cls: opts.clsUp ? false : (cur.qsorterRowClass || 'photo_row'),
      clsUp: opts.clsUp ? opts.clsUp : (cur.qsorterRowUpClass || 'photo_row photo_row_up'),
      count: 0,
      offset: 0,
      elems: new Array(opts.xsize),
      stop: function() {
        if (qsorter.current == result) {
          qsorter.stop();
        }
        for (var i in result.elems) {
          var els = result.elems[i];
          for (var j = 0, n = ((els || {}).length || 0); j < n; ++j) {
            var ch = els[j];
            if (qsorter.animcache[ch.id]) {
              delete(qsorter.animcache[ch.id]);
            }
          }
        }
      },
      destroy: function() {
        result.stop();
        var el = result.parent;
        removeAttr(el, 'qsorter');
        for (var i = 0, l = result.elems.length; i < l; ++i) {
          var els = result.elems[i];
          for (var j = 0, n = ((els || {}).length || 0); j < n; ++j) {
            var ch = els[j];
            removeEvent(ch, 'mousedown touchstart', qsorter.mousedown);
          }
        }
      },
      updateDragCont: function() {
        var xy = getXY(opts.dragCont);
        var size= getSize(opts.dragCont);
        this.dragCont = {
          visible: isVisible(opts.dragCont),
          el: opts.dragCont,
          x1: xy[0],
          y1: xy[1],
          x2: xy[0] + size[0],
          y2: xy[1] + size[1],
        };
      },
      onReorder: opts.onReorder,
      noscroll: opts.noscroll,
      dragEls: opts.dragEls,
      onDragOver: opts.onDragOver,
      onDragOut: opts.onDragOut,
      onDrop: opts.onDrop,
      noMoveCursor: opts.noMoveCursor,
      noMoveCursorFirst: opts.noMoveCursorFirst
    }

    if (opts.dragCont) {
      result.updateDragCont();
    }
    parent.qsorter = result;
    qsorter.added(parent);
    return result;
  }
}

try{stManager.done('qsorter.js');}catch(e){}
