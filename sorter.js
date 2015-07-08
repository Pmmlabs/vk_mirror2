var sorter = {
  sqr: function(x) {
    return x * x;
  },
  evCoords: function(ev, s) {
    return browser.android ? [ev.touches[0].pageX + (ev.pageX || 0), ev.touches[0].pageY + (ev.pageY || 0) + (s.scrollNode && s.scrollNode.scrollTop || 0)] : [ev.pageX, ev.pageY + (s.scrollNode && s.scrollNode.scrollTop || 0)];
  },

  animstop: function() {
    clearInterval(sorter.animtimer);
    sorter.animtimer = false;
  },
  animcache: {},
  animstep: function() {
    var finished = [], all = true;
    for (var i in sorter.animcache) {
      if (i == 0) {
        all = false;
        scrollNode.scrollTop += Math.ceil(sorter.animcache[i] / 5);
        continue;
      }
      var a = sorter.animcache[i], e = a.el, f = Fx.Transitions.easeOutQuint, dt = 200;
      var prev = vkNow();
      a.t += prev - a.prev;
      a.prev = prev;
      if (a.t < dt) {
        all = false;
        e.style.left = f(a.t, a.sx, a.dx, dt) + 'px';
        e.style.top = f(a.t, a.sy, a.dy, dt) + 'px';
        continue;
      }
      e.style.left = (a.sx + a.dx) + 'px';
      e.style.top = (a.sy + a.dy) + 'px';
      clearInterval(a.timer);
      finished.push(e.id);
      if (a.h) a.h();
    }
    for (var i in finished) {
      delete(sorter.animcache[finished[i]]);
    }
    if (all) {
      sorter.animstop();
    }
  },
  animate: function(e, x, y, handler) {
    if (browser.msie8) {
      setStyle(e, {left: x, top: y});
      if (handler) handler();
      return;
    }
    var sx = intval(getStyle(e, 'left')), sy = intval(getStyle(e, 'top'));
    var anim = {t: 0, sx: sx, sy: sy, dx: x - sx, dy: y - sy, h: handler, prev: vkNow()};
    if (sorter.animcache[e.id]) {
      extend(sorter.animcache[e.id], anim);
      return;
    }
    sorter.animcache[e.id] = extend(anim, {el: e});
    if (!sorter.animtimer) {
      sorter.animtimer = setInterval(sorter.animstep, 13);
    }
  },

  mousedown: function(ev) {
    var touch = ev && ev.touches && ev.touches.length == 1;
    if (ev && (ev.button == 2 || ev.which == 3 || ev.ctrlKey || ev.metaKey) && !touch) {
      return true;
    }
    if (sorter.current) return;

    var el = this, s = el.parentNode.sorter, evc = sorter.evCoords(ev, s);
    if (ev.target.tagName == 'A' || ev.target.tagName == 'INPUT' || ev.target.tagName == 'TEXTAREA' || ev.target.getAttribute('nosorthandle')) return;
    if (ev.target.parentNode && ev.target.parentNode.tagName == 'A') return;

    sorter.current = s;
    s.drag = el;

    addEvent(document, 'mousemove drag touchmove', sorter.mousemove);
    addEvent(document, 'mouseup touchend touchcancel', sorter.mouseup);
    if (!browser.opera && !browser.msie && !browser.mozilla && !browser.safari_mobile && !browser.android && !s.noscroll) {
      addEvent(sorter.scrollNode, 'scroll', sorter.mousemove);
      if (s.scrollNode && s.scrollNode.scrollHeight > s.scrollNode.offsetHeight) {
        addEvent(s.scrollNode, 'scroll', sorter.mousemove);
      }
    }
    extend(s, {
      startX: evc[0],
      startY: evc[1] + (browser.msie6 ? pageNode.scrollTop + (s.scrollNode && s.scrollNode.scrollTop || 0) : 0),
      before: (el.nextSibling ? el.nextSibling.nextSibling : false),
      after: el.helper.previousSibling,
      startIndex: el.index
    });
    extend(sorter, {lastX: evc[0], lastY: evc[1], lastS: scrollNode.scrollTop + (s.scrollNode && s.scrollNode.scrollTop || 0)});
    setStyle(el, {zIndex: 150});
    addClass(el, 'sort_taken');

    if (window.Privacy) Privacy.hide(-1);
    if (s.onMouseDown) {
      s.onMouseDown(el);
    }

    cur.cancelClick = false;

    return touch || cancelEvent(ev);
  },
  mousemove: function(ev) {
    if (!sorter.current) return;

    var s = sorter.current;
    var cancel = true, evc = (ev.type == 'scroll') ? [sorter.lastX, sorter.lastY + scrollNode.scrollTop + (s.scrollNode && s.scrollNode.scrollTop || 0) - sorter.lastS] : sorter.evCoords(ev, s);
    if (ev.type == 'scroll') {
      cancel = false;
    } else {
      sorter.lastX = evc[0];
      sorter.lastY = evc[1];
      sorter.lastS = scrollNode.scrollTop + (s.scrollNode && s.scrollNode.scrollTop || 0);
      var my = evc[1] - (browser.msie6 ? 0 : scrollNode.scrollTop + (s.scrollNode && s.scrollNode.scrollTop || 0));
      if (!browser.safari_mobile && !browser.android && !s.noscroll) {
        if (my < 100) {
          sorter.animcache[0] = my - 100;
        } else if (my > lastWindowHeight - 100) {
          sorter.animcache[0] = my + 100 - lastWindowHeight;
        } else if (sorter.animcache[0]) {
          delete(sorter.animcache[0]);
        }
        if (sorter.animcache[0] && !sorter.animtimer) {
          sorter.animtimer = setInterval(sorter.animstep, 13);
        }
      }
    }
    var el = s.drag, dx = evc[0] - s.startX, dy = evc[1] + (browser.msie6 ? pageNode.scrollTop : 0) - s.startY;
    var x = el.helper.offsetLeft, y = el.helper.offsetTop, nx = x + dx, ny = y + dy;

    if (dx > 10 || dx < -10 || dy > 10 || dy < -10) {
      cur.cancelClick = true;
    }

    if (s._dragtargets) {
      for (var i in s._dragtargets.nodes) {
        var dragtarget = s._dragtargets.nodes[i];
        var xy = getXY(dragtarget), sz = getSize(dragtarget);
        var p1 = {x: (evc[0] - xy[0]), y: (evc[1] - xy[1])};
        if (p1.x > 0 && p1.x < sz[0] && p1.y > 0 && p1.y < sz[1]) {
          if (!dragtarget._dragover) {
            if (s._dragtargets.onDragOver) {
              s._dragtargets.onDragOver(el, dragtarget);
            }
            dragtarget._dragover = true;
            s._dragtarget = dragtarget;
          }
        } else if (dragtarget._dragover) {
          if (s._dragtargets.onDragOut) {
            s._dragtargets.onDragOut(el, dragtarget);
          }
          dragtarget._dragover = false;
          s._dragtarget = null;
        }
      }
    }

    setStyle(el, {left: nx, top: ny});
    if (browser.msie8) { // force redraw
      var temp = el.offsetLeft;
    }
    if (nx + el.w / 2 > x && ny + el.h / 2 > y && nx - el.w / 2 < x && ny - el.h / 2 < y) return cancel ? cancelEvent(ev) : true;

    for (var i = 0, newind = 0, newdist = 1e9; i < s.elems.length; ++i) {
      var e = s.elems[i], dist = sorter.sqr(e.x - nx) + sorter.sqr(e.y - ny);
      if (newdist > dist) {
        newind = i;
        newdist = dist;
      }
    }
    if (newind == el.index) return cancel ? cancelEvent(ev) : true;

    var d;
    if (newind < el.index) {
      s.parent.insertBefore(el, s.elems[newind].helper);
      d = -1;
    } else if (newind > el.index) {
      if (s.elems[newind].nextSibling) {
        s.parent.insertBefore(el, s.elems[newind].nextSibling);
      } else {
        s.parent.appendChild(el);
      }
      d = 1;
    }
    s.parent.insertBefore(el.helper, el);
    (newind == s.elems.length - 1 ? addClass : removeClass)(el.helper, 'sort_helper_last');

    for (var i = el.index; i != newind; i += d) {
      var e = s.elems[i] = s.elems[i + d], x = e.helper.offsetLeft, y = e.helper.offsetTop;
      extend(e, {
        index: e.index - d,
        x: x + e.w / 2,
        y: y + e.h / 2
      });
      sorter.animate(e, x, y);
    }
    s.elems[newind] = el;
    extend(el, {
      index: newind,
      x: el.helper.offsetLeft + el.w / 2,
      y: el.helper.offsetTop + el.h / 2
    });
    s.startX = evc[0] - nx + el.helper.offsetLeft;
    s.startY = evc[1] + (browser.msie6 ? pageNode.scrollTop : 0) - ny + el.helper.offsetTop;

    return cancel ? cancelEvent(ev) : true;
  },
  mouseup: function(ev) {
    if (!sorter.current) return;

    var s = sorter.current, el = s.drag;
    setStyle(el, {zIndex: 125});
    sorter.animate(el, el.previousSibling.offsetLeft, el.previousSibling.offsetTop, function() {
      setStyle(el, {zIndex: 100});
      removeClass(el, 'sort_taken');
    });

    sorter.stop();

    if (sorter.animcache[0]) {
      delete(sorter.animcache[0]);
      if (isEmpty(sorter.animcache)) {
        sorter.animstop();
      }
    }

    if (s.onMouseUp) {
      var target = s._dragtarget;
      if (target) {
        if(s._dragtargets.onDragOut) s._dragtargets.onDragOut(el, target);
        sorter.restore(s, el);
      }
      s.onMouseUp(el, target);
      delete(s._dragtarget);
      if (target) {
        return cancelEvent(ev);
      }
    }
    var before = (el.nextSibling ? el.nextSibling.nextSibling : false), after = el.helper.previousSibling;
    if ((before != s.before || after != s.after) && s.onReorder) {
      s.onReorder(el, before, after);
    }
    delete(s.startIndex);
    delete(s.before);
    delete(s.after);

    return cancelEvent(ev);
  },
  stop: function() {
    var s = sorter.current;
    removeEvent(document, 'mousemove drag touchmove', sorter.mousemove);
    removeEvent(document, 'mouseup touchend touchcancel', sorter.mouseup);
    s.drag = sorter.current = false;
  },
  restore: function(s, el) {
    var d, oldind = s.startIndex;
    if (oldind < el.index) {
      s.parent.insertBefore(el, s.elems[oldind].helper);
      d = -1;
    } else if (oldind > el.index) {
      if (s.elems[oldind].nextSibling) {
        s.parent.insertBefore(el, s.elems[oldind].nextSibling);
      } else {
        s.parent.appendChild(el);
      }
      d = 1;
    }
    s.parent.insertBefore(el.helper, el);

    for (var i = el.index; i != oldind; i += d) {
      var e = s.elems[i] = s.elems[i + d], x = e.helper.offsetLeft, y = e.helper.offsetTop;
      extend(e, {
        index: e.index - d,
        x: x + e.w / 2,
        y: y + e.h / 2
      });
      sorter.animate(e, x, y);
    }
    s.elems[oldind] = el;
    extend(el, {
      index: oldind,
      x: el.helper.offsetLeft + el.w / 2,
      y: el.helper.offsetTop + el.h / 2
    });
    sorter.animate(el, el.helper.offsetLeft, el.helper.offsetTop);
    delete(s.startIndex);
    delete(s.before);
    delete(s.after);
  },
  shift: function(parent) { // move last to first place
    var s = parent.sorter, el = s.elems[s.elems.length - 1], newind = 0, d;

    s.parent.insertBefore(el, s.elems[newind].helper);
    d = -1;

    s.parent.insertBefore(el.helper, el);

    for (var i = el.index; i != newind; i += d) {
      var e = s.elems[i] = s.elems[i + d], x = e.helper.offsetLeft, y = e.helper.offsetTop;
      extend(e, {
        index: e.index - d,
        x: x + e.w / 2,
        y: y + e.h / 2
      });
      e.style.left = x + 'px';
      e.style.top = y + 'px';
    }

    var x = el.helper.offsetLeft, y = el.helper.offsetTop;
    s.elems[newind] = el;
    extend(el, {
      index: newind,
      x: x + el.w / 2,
      y: y + el.h / 2
    });
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  },
  added: function(parent) {
    var s = parent.sorter, l = s.elems.length;
    var el = l ? parent.sorter.elems[l - 1].nextSibling : parent.firstChild;
    for (var i = l; el && !el.getAttribute('stopsort'); el = el.nextSibling, ++i) {
      if (el.getAttribute('skipsort')) continue;
      s.elems.push(el);

      var x = el.offsetLeft, y = el.offsetTop, sz = getSize(el);
      var st = {
        width: sz[0],
        height: sz[1] - s.dh
      }
      extend(el, {
        helper: ce('div', {className: 'sort_helper'}, st),
        x: x + sz[0] / 2, w: sz[0],
        y: y + sz[1] / 2, h: sz[1],
        index: i
      });
      var styles = {
        zIndex: 100,
        left: x,
        top: y,
        width: getStyle(el, 'width'),
        position: 'absolute'
      };
      if (!s.noMoveCursor) styles.cursor = 'move'

      setStyle(el, styles);
      parent.insertBefore(el.helper, el);
      addEvent(el, 'mousedown touchstart', sorter.mousedown);
    }
  },

  update: function(obj) {
    if (!obj) return;
    var parent = obj.parentNode, s = parent.sorter;
    var started = false;
    for (var i in s.elems) {
      var el = s.elems[i];
      if (el == obj) {
        started = true;
      }
      if (started) {
        var x = el.helper.offsetLeft, y = el.helper.offsetTop, sz = getSize(el);
        setStyle(el.helper, {
          height: sz[1] - s.dh
        });
        extend(el, {
          x: x + sz[0] / 2, w: sz[0],
          y: y + sz[1] / 2, h: sz[1]
        });
        var styles = {
          zIndex: 100,
          left: x,
          top: y,
          position: 'absolute'
        }
        if (!s.noMoveCursor) styles.cursor = 'move'

        setStyle(el, styles);
      }
    }
  },

  init: function(parent, opts) {
    if (browser.mobile && !browser.safari_mobile && !browser.android) return;

    sorter.scrollNode = browser.msie6 ? pageNode : window;
    parent = ge(parent);

    var result = {
      parent: parent,
      dh: opts.dh || 0,
      scrollNode: opts.scrollNode,
      noMoveCursor: opts.noMoveCursor || 0,
      elems: [],
      stop: function() {
        if (sorter.current == result) {
          sorter.stop();
        }
        for (var i in result.elems) {
          var ch = result.elems[i];
          if (sorter.animcache[ch.id]) {
            delete(sorter.animcache[ch.id]);
          }
        }
      },
      destroy: function() {
        result.stop();
        var el = result.parent;
        removeAttr(el, 'sorter');
        for (var i in result.elems) {
          var ch = result.elems[i];
          el.removeChild(ch.helper);
          removeEvent(ch, 'mousedown touchstart', sorter.mousedown);
          setStyle(ch, {position: '', margin: ''});
          removeAttr(ch, 'helper');
        }
        sorter.animstop();
      },
      onReorder: opts.onReorder,
      noscroll: opts.noscroll
    }
    if (opts.onMouseDown) result.onMouseDown = opts.onMouseDown;
    if (opts.onMouseUp) result.onMouseUp = opts.onMouseUp;
    var dragtargets = {nodes: []};
      if (opts && opts.target) {
        var nodes = opts.target.childNodes;
        each(nodes, function(i,v) {
        if (v.nodeType == 1) {
          dragtargets.nodes.push(v);
        }
      });
      dragtargets.onDragOver = opts.onDragOver;
      dragtargets.onDragOut = opts.onDragOut;
      if (dragtargets.nodes.length > 0) {
        result._dragtargets = dragtargets;
      }
    }
    parent.sorter = result;
    sorter.added(parent);
    return result;
  }
}

try{stManager.done('sorter.js');}catch(e){}
