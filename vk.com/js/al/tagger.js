function photoTagger(elem, opts) {
  elem = ge(elem);
  if (!elem) return false;
  var inittries = 0, node = elem.parentNode;

  var mabs = Math.abs, mmin = Math.min, mmax = Math.max, mfloor = Math.floor, mceil = Math.ceil, mround = Math.round, msign = function(v) {
    return v < 0 ? -1 : 1;
  }

  var zstart = intval(opts.zstart), square = intval(opts.square), rot = 0;
  var minw = intval(opts.minw) || 30, minh = intval(opts.minh) || 30;
  var defw = intval(opts.defw) || mmax(minw, 100), defh = intval(opts.defh) || mmax(minh, 100), defw2, defh2;
  var addX, addY, preview50, preview100, bg, img = vkImage();
  var swidth, sheight, srect, mina = square ? 1 : floatval(opts.mina), maxa = square ? 1 : floatval(opts.maxa);
  if (mina > 0 && maxa > 0 && mina > maxa) maxa = mina;
  if (elem.src) {
    img.src = elem.src;
  }

  var tagframe, tagimg, tagfaded, taghandles = {};
  var width = 0, height = 0, rect = {}

  var showRect = function(r, noUpdate) {
    rect = extend(rect, r);
    each(r, function(i) {
      var v = this + (i == 'left' ? addX : (i == 'top' ? addY : 0));
      tagframe.style[i] = v + 'px';
    });
    tagimg.style.marginLeft = -r.left + 'px';
    tagimg.style.marginTop = -r.top + 'px';
    each(taghandles, function(i) {
      if (i.length < 2) { // n, w, e, s
        if (i == 'n' || i == 's') {
          this.style.left = (addX + r.left + intval(r.width / 2) - 5) + 'px';
          this.style.top = (addY + r.top + (i == 'n' ? 0 : r.height) - 5) + 'px';
        } else {
          this.style.left = (addX + r.left + (i == 'w' ? 0 : r.width) - 5) + 'px';
          this.style.top = (addY + r.top + intval(r.height / 2) - 5) + 'px';
        }
      } else { // nw, ne, sw, se
        var a = i.charAt(0), b = i.charAt(1);
        this.style.left = (addX + r.left + ((b == 'w') ? 0 : r.width) - 5) + 'px';
        this.style.top = (addY + r.top + ((a == 'n') ? 0 : r.height) - 5) + 'px';
      }
    });
    if (!noUpdate) {
      if (preview50) {
        preview50.style.width = mceil(width * 50 / r.width) + 'px';
        preview50.style.height = mceil(height * 50 / r.height) + 'px';
        preview50.style.marginLeft = -mfloor(r.left * 50 / r.width) + 'px';
        preview50.style.marginTop = -mfloor(r.top * 50 / r.width) + 'px';
      }
      if (preview100) {
        preview100.style.width = mceil(width * 100 / r.width) + 'px';
        preview100.style.height = mceil(height * 100 / r.height) + 'px';
        preview100.style.marginLeft = -mfloor(r.left * 100 / r.width) + 'px';
        preview100.style.marginTop = -mfloor(r.top * 100 / r.width) + 'px';
      }
    }
  }

  var action = 0, start, adjX, adjY, startRect, elemXY;

  var adjustPos = function(x, y) {
    return [mmin(width, mmax(0, x - elemXY[0])), mmin(height, mmax(0, y - elemXY[1]))];
  }

  var winResize = function() {
    var dwidth = Math.max(intval(window.innerWidth), intval(document.documentElement.clientWidth));
    var dheight = Math.max(intval(window.innerHeight), intval(document.documentElement.clientHeight));
    bg.style.width = dwidth + 'px';
    bg.style.height = dheight + 'px';
  }

  var cursorAct = function(a) {
    if (!a) a = action;
    var dirs = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
    switch (rot) {
      case 1: return dirs[(dirs.indexOf(a) + 2) % 8];
      case 2: return dirs[(dirs.indexOf(a) + 4) % 8];
      case 3: return dirs[(dirs.indexOf(a) + 6) % 8];
      default: return a;
    }
  }

  var updateCursor = function(c) {
    if (action) {
      if (action == 1 || action == preview50 || action == preview100) {
        c = 'move';
      } else if (action == 2) {
        c = 'crosshair';
      } else if (action.length) {
        c = cursorAct() + '-resize';
      }
      bg.style.cursor = c;
    }
  }

  var cursorXY = function(e) {
    switch (rot) {
      case 1:
        return [
          elemXY[0] + e.pageY - elemXY[1] + mfloor((width - height) / 2),
          elemXY[1] - e.pageX + elemXY[0] + mfloor((width + height) / 2)
        ];
      case 2:
        return [
          elemXY[0] + (elemXY[0] + width - e.pageX),
          elemXY[1] + (elemXY[1] + height - e.pageY)
        ];
      case 3:
        return [
          elemXY[0] - e.pageY + elemXY[1] + mfloor((width + height) / 2),
          elemXY[1] + e.pageX - elemXY[0] - mfloor((width - height) / 2)
        ];
      default: return [e.pageX, e.pageY];
    }
  }

  var mouseDown = function(e) {
    elemXY = getXY(elem);
    elemWH = getSize(elem);
    start = cursorXY(e);
    startRect = extend({}, rect);
    swidth = sheight = srect = false;

    if (e.target == tagimg) {
      action = 1;
    } else if (e.target == tagfaded || e.target == elem) {
      action = 2;
    } else if (e.target == preview50 || e.target == preview100) {
      action = e.target;
      if (!rect.width || !rect.height) {
        showRect({left: 0, top: 0, width: mmin(100, mmin(width, height)), height: mmin(100, mmin(width, height))});
      }
    } else {
      each(taghandles, function(i) {
        if (e.target == this) {
          action = i;
          var x = start[0] - elemXY[0], y = start[1] - elemXY[1];
          var vh = [i.charAt(0), (i.length > 1) ? i.charAt(1) : i.charAt(0)];
          start[0] = rect.left + (vh[1] == 'w' ? 0 : rect.width);
          start[1] = rect.top + (vh[0] == 'n' ? 0 : rect.height);
          adjX = start[0] - x;
          adjY = start[1] - y;
        }
      });
    }
    if (action) {
      if (opts.onStart) opts.onStart();
      if (action != 2 && action != preview50 && action != preview100) {
        each(taghandles, function() {
          setStyle(this, 'opacity', 0.7);
        });
      }
      show(bg);
      updateCursor();
      removeEvent(elem, 'mousedown', mouseDown);
      addEvent(bodyNode, 'mouseup dragend', mouseUp);
      addEvent(bodyNode, 'mousemove', mouseMove);
      return cancelEvent(e);
    }
  }

  var mouseMove = function(e) {
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.removeAllRanges) sel.removeAllRanges();
    }
    var c = cursorXY(e);
    if (action == 1) {
      var nx = startRect.left + (c[0] - start[0]);
      var ny = startRect.top + (c[1] - start[1]);
      nx = mmin(width - rect.width, mmax(0, nx));
      ny = mmin(height - rect.height, mmax(0, ny));
      showRect(extend(rect, {left: nx, top: ny}));
    } else if (action == 2) {
      if (mabs(c[0] - start[0]) > 3 && mabs(c[1] - start[1]) > 3) {
        action = 3;
        updateCursor();
        elemXY = getXY(elem);
        elemWH = getSize(elem);
        start[0] -= elemXY[0]; start[1] -= elemXY[1];
        show(tagframe, tagfaded);
        each(taghandles, function() { show(this); setStyle(this, 'opacity', 0.7); });
      }
    } else if (action == preview50 || action == preview100) {
      var s = (action == preview50) ? 50 : 100;
      var nx = startRect.left - mfloor((c[0] - start[0]) * rect.width / s);
      var ny = startRect.top - mfloor((c[1] - start[1]) * rect.height / s);
      nx = mmin(width - rect.width, mmax(0, nx));
      ny = mmin(height - rect.height, mmax(0, ny));
      showRect(extend(rect, {left: nx, top: ny}));
    } else if (action.length) {
      var xy = adjustPos(c[0] + adjX, c[1] + adjY);
      c[0] = xy[0]; c[1] = xy[1];
      var dx = c[0] - start[0], dy = c[1] - start[1];
      if (!dx && !dy) return cancelEvent(e);

      var nx = rect.left, ny = rect.top, nw = rect.width, nh = rect.height;

      var ver = 0, hor = 0; // Where are we moving
      if (action.length == 2) {
        ver = (action.charAt(0) == 'n') ? -1 : 1;
        hor = (action.charAt(1) == 'w') ? -1 : 1;
      } else {
        ver = (action == 'n' ? -1 : (action == 's' ? 1 : 0));
        hor = (action == 'w' ? -1 : (action == 'e' ? 1 : 0));
      }
      if (ver && (nh + msign(ver) * dy < minh / 2)) { // If we change verti direction
        ver = -ver;
        start[1] = rect.top + (ver > 0 ? rect.height : 0);
        dy = c[1] - start[1];
      }
      if (hor && (nw + msign(hor) * dx < minw / 2)) { // If we change horiz direction
        hor = -hor;
        start[0] = rect.left + (hor > 0 ? rect.width : 0);
        dx = c[0] - start[0];
      }
      vsign = ver ? msign(ver) : 0;
      hsign = hor ? msign(hor) : 0;

      if (mina > 0 && (nw + hsign * dx) < (nh + vsign * dy) * mina) { // min and max aspect
        if (hor) {
          dx = hsign * mceil((nh + vsign * dy) * mina - nw);
        } else {
          dy = vsign * mfloor(nw / mina - nh);
        }
      }
      if (maxa > 0 && (nw + hsign * dx) > (nh + vsign * dy) * maxa) {
        if (ver) {
          dy = vsign * mceil((nw + hsign * dx) / maxa - nh);
        } else {
          dx = hsign * mfloor(nh * maxa - nw);
        }
      }
      if (ver) {
        nh += msign(ver) * dy;
        if (nh < minh) { // If trying to get less, than minimum
          ny -= (ver > 0) ? 0 : (minh - nh - dy);
          nh = minh;
        } else {
          ny += (ver > 0) ? 0 : dy;
        }
      }
      if (hor) {
        nw += msign(hor) * dx;
        if (nw < minw) { // If trying to get less, than minimum
          nx -= (hor > 0) ? 0 : (minw - nw - dx);
          nw = minw;
        } else {
          nx += (hor > 0) ? 0 : dx;
        }
      }
      var corx = 0, cory = 0, corax = 0, coray = 0;
      if (nx < 0) { // What is the amount of correction
        corx = nx;
        nx = 0;
      } else if (nw > width - nx) {
        corx = width - nx - nw;
      }
      if (corx) {
        nw += corx;
        if (mina > 0 && nw < mina * nh) { // min and max aspect (width / height)
          coray = mfloor(nw / mina) - nh;
          nh += coray;
          ny -= (ver > 0) ? 0 : coray;
        }
      }
      if (ny < 0) { // What is the amount of correction
        cory = ny;
        ny = 0;
      } else if (nh > height - ny) {
        cory = height - ny - nh;
      }
      if (cory) {
        nh += cory;
        if (maxa > 0 && nw > maxa * nh) { // min and max aspect (width / height)
          corax = mfloor(nh * maxa) - nw;
          nw += corax;
          nx -= (hor > 0) ? 0 : corax;
        }
      }

      showRect({left: nx, top: ny, width: nw, height: nh});

      start[0] = rect.left + (hor > 0 ? rect.width : 0);
      start[1] = rect.top + (ver > 0 ? rect.height : 0);

      ver = (ver > 0 ? 's' : (ver < 0 ? 'n' : ''));
      hor = (hor > 0 ? 'e' : (hor < 0 ? 'w' : ''));
      if (action != ver + hor) {
        action = ver + hor;
        updateCursor();
      }
    }
    if (action == 3) {
      c[0] -= elemXY[0];
      c[1] -= elemXY[1];
      c[0] = mmin(width, mmax(0, c[0]));
      c[1] = mmin(height, mmax(0, c[1]));
      updateCursor((msign((start[0] - c[0]) * (start[1] - c[1]) * (0.5 - rot % 2)) > 0 ? 'nw' : 'ne') + '-resize');
      showRect({left: start[0] > c[0] ? c[0] : start[0], top: start[1] > c[1] ? c[1] : start[1], width: mabs(start[0] - c[0]), height: mabs(start[1] - c[1])}, true);
    }
    return cancelEvent(e);
  }

  var mouseUp = function(e) {
    elemXY = getXY(elem);
    elemWH = getSize(elem);
    var c = cursorXY(e), t;
    if (action == 2) {
      c[0] -= elemXY[0];
      c[1] -= elemXY[1];
      var x = mmin(width - defw, mmax(0, c[0] - defw2));
      var y = mmin(height - defh, mmax(0, c[1] - defh2));
      showRect({left: x, top: y, width: defw, height: defh});
    } else if (action == 3) {
      c[0] -= elemXY[0];
      c[1] -= elemXY[1];
      if (c[0] > start[0]) {
        t = c[0]; c[0] = start[0]; start[0] = t;
      }
      if (c[1] > start[1]) {
        t = c[1]; c[1] = start[1]; start[1] = t;
      }
      var w = start[0] - c[0], h = start[1] - c[1];
      if (c[0] < 0) {
        w += c[0];
        c[0] = 0;
      }
      if (c[1] < 0) {
        h += c[1];
        c[1] = 0;
      }
      w = mmin(w, width - c[0]); h = mmin(h, height - c[1]);
      if (mina > 0 && w < h * mina) { // min and max aspect (width / height)
        var d = mceil(h * mina) - w, d2 = intval(d / 2), corx, cory;
        c[0] -= d2;
        w += d;

        corx = (c[0] < 0 ? c[0] : 0);
        c[0] -= corx;
        if (c[0] + w + corx > width) {
          corx = width - w - c[0];
        }
        if (corx) {
          cory = mfloor(corx / mina);
          w += corx;
          c[1] -= intval(cory / 2);
          h += cory;
        }
      } else if (maxa > 0 && w > h * maxa) {
        var d = mceil(w / maxa) - h, d2 = intval(d / 2), corx, cory;
        c[1] -= d2;
        h += d;

        cory = (c[1] < 0 ? c[1] : 0);
        c[1] -= cory;
        if (c[1] + h + cory > height) {
          cory = height - h - c[1];
        }
        if (cory) {
          corx = mfloor(cory * maxa);
          h += cory;
          c[0] -= intval(corx / 2);
          w += corx;
        }
      }
      if (w < minw) {
        var d = minw - w, d2 = intval(d / 2);
        c[0] -= d2;
        w += d;

        c[0] = mmin(width - w, mmax(0, c[0]));
      }
      if (h < minh) {
        var d = minh - h, d2 = intval(d / 2);
        c[1] -= d2;
        h = minh;

        c[1] = mmin(height - h, mmax(0, c[1]));
      }
      showRect({left: c[0], top: c[1], width: w, height: h});
    }
    show(tagframe, tagfaded);
    each(taghandles, function() {
      fadeTo(this, 200, 0.3);
    });
    hide(bg);
    action = 0;

    removeEvent(bodyNode, 'mousemove', mouseMove);
    removeEvent(bodyNode, 'mouseup', mouseUp);
    removeEvent(bodyNode, 'dragend', mouseUp);

    if (opts.onFinish) opts.onFinish();

    return cancelEvent(e);
  };

  (function() {
    width = img.width;
    height = img.height;

    if (!width || !height) {
      if (++inittries < 50) setTimeout(arguments.callee, 100);
      return;
    }
    var s = getSize(elem);
    width = s[0]; height = s[1];

    node.style.position = 'relative';

    addX = elem.offsetLeft;
    addY = elem.offsetTop;

    defw = mmin(width, defw); defw2 = intval(defw / 2);
    defh = mmin(height, defh); defh2 = intval(defh / 2);
    minw = mmin(minw, defw); minh = mmin(minh, defh);
    if (mina > 0 && minw < minh * mina) { // min and max aspect (width / height)
      minw = mceil(minh * mina);
    } else if (maxa > 0 && minw > minh * maxa) {
      minh = mceil(minw / maxa);
    }
    if (square) {
      if (opts.preview50) {
        preview50 = ge(opts.preview50).appendChild(ce('img', {src: elem.src}));
        addEvent(preview50, 'mousedown', mouseDown);
      }
      if (opts.preview100) {
        preview100 = ge(opts.preview100).appendChild(ce('img', {src: elem.src}));
        addEvent(preview100, 'mousedown', mouseDown);
      }
    }

    bg = bodyNode.appendChild(ce('div', {className: 'tag_bg fixed'}));
    addEvent(window, 'resize', winResize);
    winResize();

    elem.style.zIndex = zstart + 20;

    tagframe = node.appendChild(ce('div', {
      className: 'tag_frame',
      innerHTML: '<img src="' + elem.src + '" style="width: ' + width + 'px; height: ' + height + 'px;" />'
    }, {
      cursor : 'move',
      zIndex : zstart + 40,
      left: 0,
      top: 0
    }));
    tagimg = tagframe.firstChild;
    tagfaded = node.appendChild(ce('div', {className: 'tag_faded'}, {
      cursor : 'crosshair',
      left   : addX,
      top    : addY,
      width  : width,
      height : height,
      zIndex : zstart + 30
    }));

    each(['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'], function() {
      var s = this.toString();
      if (opts.square && s.length < 2) return;
      taghandles[s] = node.appendChild(ce('div', {className: 'tag_frame_handle ' + s}, {
        cursor : s + '-resize',
        zIndex : zstart + 50
      }));
    });

    addEvent(node, 'mousedown', mouseDown);

    if (square && opts.crop) {
      var d = opts.crop.split(',');
      for (var i = 0; i < 3; ++i) {
        d[i] = intval(d[i]);
      }
      if (d[2] < minw) {
        d[2] = minw;
      }
      opts.rect = {left: d[0], top: d[1], width: d[2], height: d[2]};
    }

    if (opts.rect) {
      showRect(opts.rect);
      show(tagfaded, tagframe);
      each(taghandles, function() { show(this); });
    } else {
      elem.style.cursor = 'crosshair';
      addEvent(elem, 'mousedown', mouseDown);
    }
  })();

  return {
    destroy: function() {
      cleanElems(node, elem, tagframe, tagfaded, preview50, preview100);
      bodyNode.removeChild(bg);
      node.removeChild(tagframe);
      node.removeChild(tagfaded);
      each(['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'], function() {
        var s = this.toString();
        if (taghandles[s]) {
          node.removeChild(taghandles[s]);
        }
      });
      elem.style.cursor = 'default';
      removeEvent(elem, 'mousedown', mouseDown);
      removeEvent(window, 'resize', winResize);
      each(taghandles, function() { cleanElems(this); });
    },
    reset: function() {
      rect = {};
      hide(tagfaded, tagframe);
      each(taghandles, function() { hide(this); });
      elem.style.cursor = 'crosshair';
      removeEvent(elem, 'mousedown', mouseDown);
      addEvent(elem, 'mousedown', mouseDown);
    },
    resize: function(w, h) {
      if (!swidth) {
        swidth = width;
        sheight = height;
        srect = clone(rect);
      }
      var cx = w / swidth, cy = h / sheight;
      width = w;
      height = h;
      defw = mmin(width, defw); defw2 = intval(defw / 2);
      defh = mmin(height, defh); defh2 = intval(defh / 2);
      minw = mmin(minw, defw); minh = mmin(minh, defh);
      if (mina > 0 && minw < minh * mina) { // min and max aspect (width / height)
        minw = mceil(minh * mina);
      } else if (maxa > 0 && minw > minh * maxa) {
        minh = mceil(minw / maxa);
      }
      addX = elem.offsetLeft;
      addY = elem.offsetTop;

      setStyle(tagfaded, {left: addX, top: addY, width: w, height: h});
      setStyle(tagimg, {width: w, height: h});
      if (rect.width) {
        rect.left = mfloor(cx * srect.left);
        rect.width = mfloor(cx * srect.width);
        rect.top = mfloor(cy * srect.top);
        rect.height = mfloor(cy * srect.height);
        if (rect.width < minw) {
          rect.width = minw;
        }
        if (rect.height < minh) {
          rect.height = minh;
        }
        showRect(rect);
      }
    },
    rotate: function(c) {
      if (c % 2) {
        var tmp = mina;
        mina = 1 / maxa;
        maxa = 1 / tmp;
        tmp = minw;
        minw = minh;
        minh = tmp;
        if (rect.width) {
          if (rect.width < minw) {
            rect.left = mmax(0, rect.left - mfloor((minw - rect.width) / 2));
            rect.width = minw;
          }
          if (rect.height < minh) {
            rect.top = mmax(0, rect.top - mfloor((minh - rect.height) / 2));
            rect.height = minh;
          }
          if (rect.width < rect.height * mina) {
            rect.height = mfloor(rect.width / mina);
          }
          if (rect.width > rect.height * maxa) {
            rect.width = mfloor(rect.height * maxa);
          }
          showRect(rect);
        }
      }
      rot = (rot + c) % 4;
      each(taghandles, function(i) { this.style.cursor = cursorAct(i) + '-resize'; });
    },
    result: function() {
      var w = width, h = height;
      switch (rot) {
        case 1: return [h - rect.top - rect.height, rect.left, rect.height, rect.width];
        case 2: return [w - rect.left - rect.width, h - rect.top - rect.height, rect.width, rect.height];
        case 3: return [rect.top, w - rect.left - rect.width, rect.height, rect.width];
        default: return [rect.left, rect.top, rect.width, rect.height];
      }
    }
  }
}

try{stManager.done('tagger.js');}catch(e){}
