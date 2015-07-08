function adsPhotoTagger(elem, options) {
  elem = ge(elem);
  if (!elem || !elem.src) return false;
  var initTries = 0, node = elem.parentNode;

  var mabs = Math.abs, mmin = Math.min, mmax = Math.max, mfloor = Math.floor, mceil = Math.ceil, msign = function(v) {
    return v < 0 ? -1 : 1;
  };
  var dblcmp = (function() {
    var eps = 1e-8;
    return function(a, b) {
      if (mabs(a-b) < eps) return 0;
      return a < b ? -1 : 1;
    }
  })();

  var bodyNode = document.body;

  var zstart = intval(options.zstart);
  var minw = intval(options.minw) || 30, minh = intval(options.minh) || 30;
  var maxw = intval(options.maxw) || 100, maxh = intval(options.maxh) || 100;
  var minr = Number(options.minr) || 1, maxr = Number(options.maxr) || 1; // min/max ratio
  var defw = intval(options.defw) || 100, defh = intval(options.defh) || 100, defw2, defh2;
  var addX, addY, bg, img = vkImage();
  var icons = [], iconParams = [];
  img.src = elem.src;

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
      for (var i in icons) {
        if (!icons[i]) continue;
        var icon = icons[i],
            iconw = iconParams[i].width,
            iconh = iconParams[i].height;
        var bbox = icon.parentNode,
            ratio = r.width / r.height,
            boxw = mmin(iconw, intval(iconh * ratio)),
            boxh = mmin(iconh, intval(boxw / ratio));

        bbox.style.width = boxw + 'px';
        bbox.style.height = boxh + 'px';
        bbox.style.marginRight = mceil((iconw - boxw) / 2.0) + 'px';
        bbox.style.marginLeft = mfloor((iconw - boxw) / 2.0) + 'px';

        icon.style.width = mceil(width * boxw / r.width) + 'px';
        icon.style.height = mceil(height * boxh / r.height) + 'px';
        icon.style.marginLeft = -mfloor(r.left * boxw / r.width) + 'px';
        icon.style.marginTop = -mfloor(r.top * boxh / r.height) + 'px';
      }
    }
  }

  var action = 0, startX, startY, adjX, adjY, startRect, elemXY;

  var adjustPos = function(x, y) {
    return [mmin(width, mmax(0, x - elemXY[0])), mmin(height, mmax(0, y - elemXY[1]))];
  }

  var resize = function() {
    var dwidth = Math.max(intval(window.innerWidth), intval(document.documentElement.clientWidth));
    var dheight = Math.max(intval(window.innerHeight), intval(document.documentElement.clientHeight));
    bg.style.width = dwidth + 'px';
    bg.style.height = dheight + 'px';
  }

  var updateCursor = function(cur) {
    if (action) {
      if (action == 1 || action < 0) {
        cur = 'move';
      } else if (action == 2) {
        cur = 'crosshair';
      } else if (action.length) {
        cur = action + '-resize';
      }
      bg.style.cursor = cur;
    }
  }

  var mouseDown = function(e) {
    startX = e.pageX;
    startY = e.pageY;
    elemXY = getXY(elem);
    startRect = extend({}, rect);
    var cur = false;

    if (e.target == tagimg) {
      action = 1;
    } else if (e.target == tagfaded || e.target == elem) {
      action = 2;
    } else if (e.target.className == 'preview') {
      action = -1 - e.target.id.substring(4); // id is 'icon<#id>'
    } else {
      each(taghandles, function(i) {
        if (e.target == this) {
          action = i;
          var x = startX - elemXY[0], y = startY - elemXY[1];
          var vh = [i.charAt(0), (i.length > 1) ? i.charAt(1) : i.charAt(0)];
          startX = rect.left + (vh[1] == 'w' ? 0 : rect.width);
          startY = rect.top + (vh[0] == 'n' ? 0 : rect.height);
          var tagX = startX,
              tagY = startY;
          if (i.length == 1) {
            if (i == 's' || i == 'n') {
              tagX -= mceil(rect.width / 2.0);
            } else {
              tagY -= mceil(rect.height / 2.0);
            }
          }
          adjX = tagX - x;
          adjY = tagY - y;
        }
      });
    }
    if (action) {
      if ((action != 2 && action >= 0) || action.length) {
        each(taghandles, function() {
          setStyle(this, 'opacity', 0.7);
        });
      }
      show(bg);
      updateCursor();
      addEvent(bodyNode, 'mousemove', mouseMove);
      addEvent(bodyNode, 'mouseup', mouseUp);
      addEvent(bodyNode, 'dragend', mouseUp);
      return cancelEvent(e);
    }
  }

  var mouseMove = function(e) {
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.removeAllRanges) sel.removeAllRanges();
    }
    var cx = e.pageX, cy = e.pageY;
    if (action == 1) {
      var nx = startRect.left + (cx - startX);
      var ny = startRect.top + (cy - startY);
      nx = mmin(width - rect.width, mmax(0, nx));
      ny = mmin(height - rect.height, mmax(0, ny));
      showRect(extend(rect, {left: nx, top: ny}));
    } else if (action == 2) {
      if (mabs(cx - startX) > 3 && mabs(cy - startY) > 3) {
        action = 3;
        updateCursor();
        elemXY = getXY(elem);
        startX -= elemXY[0]; startY -= elemXY[1];
        show(tagframe, tagfaded);
        each(taghandles, function() { show(this); setStyle(this, 'opacity', 0.7); });
      }
    } else if (action < 0) {
      var iconn = -(action + 1),
          cw = iconParams[iconn].width,
          ch = iconParams[iconn].height;
      var nx = startRect.left - mfloor((cx - startX) * rect.width / cw);
      var ny = startRect.top - mfloor((cy - startY) * rect.height / ch);
      nx = mmin(width - rect.width, mmax(0, nx));
      ny = mmin(height - rect.height, mmax(0, ny));
      showRect(extend(rect, {left: nx, top: ny}));
    } else if (action.length) {
      var xy = adjustPos(cx + adjX, cy + adjY);
      cx = xy[0]; cy = xy[1];

      var nx = rect.left, ny = rect.top, nw = rect.width, nh = rect.height;

      var ver = 0, hor = 0; // Where are we moving
      if (action.length == 2) {
        ver = (action.charAt(0) == 'n') ? -1 : 1;
        hor = (action.charAt(1) == 'w') ? -1 : 1;
      } else {
        ver = (action == 'n' ? -1 : (action == 's' ? 1 : 0));
        hor = (action == 'w' ? -1 : (action == 'e' ? 1 : 0));
      }

      startX = nx + nw * (hor < 0);
      startY = ny + nh * (ver < 0);

      if ((cx < nx || cx > nx + nw) && mabs(cx - startX) < mabs(cx - (nx + nw * (hor >= 0)))) {
        startX = startX + mmax(minw, intval(nh * minr)) * hor;
        hor *= -1;
      }
      if ((cy < ny || cy > ny + nh) && mabs(cy - startY) < mabs(cy - (ny + nh * (ver >= 0)))) {
        startY = startY + mmax(minh, intval(nw / maxr)) * ver;
        ver *= -1;
      }

      var dx = mabs(hor) * mabs(cx - startX), dy = mabs(ver) * mabs(cy - startY);
      if (!hor) dx = rect.width;
      if (!ver) dy = rect.height;
      if (!dx && !dy) return cancelEvent(e);

      dx = mmax(dx, minw);
      dy = mmax(dy, minh);

      var curmaxw = mmin(maxw, hor >= 0 ? width - startX : startX),
          curmaxh = mmin(maxh, ver >= 0 ? height - startY : startY);

      dx = mmin(dx, curmaxw);
      dy = mmin(dy, curmaxh);

      nx = hor >= 0 ? startX : startX - dx;
      ny = ver >= 0 ? startY : startY - dy;

      var movex = 0, movey = 0, tmp;
      var maxmvx = mmin(nx, width - nx - dx), maxmvy = mmin(ny, height - ny - dy);

      var curRatio = dx / dy;
      if (dblcmp(curRatio, minr) < 0) {
        if (hor == 0) {
          tmp = mmin(curmaxw, dy * minr);
          movex = (dx - tmp) / 2;
          movex = msign(movex) * mmin(mceil(mabs(movex)), maxmvx);
          dx = mmin(dx - 2 * movex, curmaxw);
          dy = dx / minr;
        } else if (ver == 0) {
          tmp = mmax(dx / minr, minh);
          movey = (dy - tmp) / 2;
          movey = msign(movey) * mceil(mabs(movey));
          dy = mmax(dy - 2 * movey, minh);
          dx = dy * minr;
        } else {
          dx = mmin(dy * minr, curmaxw);
          dy = dx / minr;
        }
      } else if (dblcmp(curRatio, maxr) > 0) {
        if (hor == 0) {
          tmp = mmax(dy * maxr, minw);
          movex = (dx - tmp) / 2;
          movex = msign(movex) * mceil(mabs(movex));
          dx = mmax(dx - 2 * movex, minw);
          dy = dx / maxr;
        } else if (ver == 0) {
          tmp = mmin(curmaxh, dx / maxr);
          movey = (dy - tmp) / 2;
          movey = msign(movey) * mmin(mceil(mabs(movey)), maxmvy);
          dy = mmin(dy - 2 * movey, curmaxh);
          dx = dy * maxr;
        } else {
          dy = mmin(dx / maxr, curmaxh);
          dx = dy * maxr;
        }
      }
      dx = intval(dx);
      dy = intval(dy);

      nx = hor >= 0 ? startX : startX - dx;
      ny = ver >= 0 ? startY : startY - dy;

      nx += movex;
      ny += movey;

      showRect({left: nx, top: ny, width: dx, height: dy});

      ver = (ver > 0 ? 's' : (ver < 0 ? 'n' : ''));
      hor = (hor > 0 ? 'e' : (hor < 0 ? 'w' : ''));
      if (action != ver + hor) {
        action = ver + hor;
        updateCursor();
      }
    }
    if (action == 3) {
      cx -= elemXY[0];
      cy -= elemXY[1];
      cx = mmin(width, mmax(0, cx));
      cy = mmin(height, mmax(0, cy));
      updateCursor(msign((startX - cx) * (startY - cy)) > 0 ? 'nw-resize' : 'ne-resize');
      showRect({left: startX > cx ? cx : startX, top: startY > cy ? cy : startY, width: mabs(startX - cx), height: mabs(startY - cy)}, true);
    }
    return cancelEvent(e);
  }

  var mouseUp = function(e) {
    var cx = e.pageX, cy = e.pageY, t;
    elemXY = getXY(elem);
    if (action == 2) {
      cx -= elemXY[0];
      cy -= elemXY[1];
      var x = mmin(width - defw, mmax(0, cx - defw2));
      var y = mmin(height - defh, mmax(0, cy - defh2));
      showRect({left: x, top: y, width: defw, height: defh});
    } else if (action == 3) {
      cx -= elemXY[0];
      cy -= elemXY[1];
      if (cx > startX) {
        t = cx; cx = startX; startX = t;
      }
      if (cy > startY) {
        t = cy; cy = startY; startY = t;
      }
      var w = startX - cx, h = startY - cy;
      if (cx < 0) {
        w += cx;
        cx = 0;
      }
      if (cy < 0) {
        h += cy;
        cy = 0;
      }
      w = mmin(w, width - cx); h = mmin(h, height - cy);

      if (w < minw) {
        var d = minw - w, d2 = intval(d / 2);
        cx -= d2;
        w = minw;
        cx = mmin(width - w, mmax(0, cx));
      }
      if (h < minh) {
        var d = minh - h, d2 = intval(d / 2);
        cy -= d2;
        h = minh;
        cy = mmin(height - h, mmax(0, cy));
      }

      var curmaxw = width - cx, curmaxh = height - cy;
      var curRatio = w / h;
      if (dblcmp(curRatio, minr) < 0) {
        w = mmin(h * minr, curmaxw);
        h = w / minr;
      } else if (dblcmp(curRatio, maxr) > 0) {
        h = mmin(w / maxr, curmaxh);
        w = h * maxr;
      }
      showRect({left: cx, top: cy, width: w, height: h});
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
    return cancelEvent(e);
  };

  (function() {
    if (initTries < 0) {
      return;
    }

    width = img.width;
    height = img.height;

    if (!width || !height) {
      if (++initTries < 3000) setTimeout(arguments.callee, 100);
      return;
    }

    node.style.position = 'relative';

    addX = elem.offsetLeft;
    addY = elem.offsetTop;

    defw = mmin(width, defw); defw2 = intval(defw / 2);
    defh = mmin(height, defh); defh2 = intval(defh / 2);
    minw = mmin(minw, defw); minh = mmin(minh, defh);

    if (options.icons) {
      for (var i in options.icons) {
        if (!options.icons[i] || !options.icons[i].width || !options.icons[i].height || !options.icons[i].box) continue;
        iconParams.push({width: options.icons[i].width, height: options.icons[i].height});
        icons.push(ge(options.icons[i].box).appendChild(ce('img', {src: elem.src, className: 'preview'})));

        ge(options.icons[i].box).style.overflow = 'hidden';
        icons[icons.length - 1].style.cursor = 'move';
        addEvent(icons[icons.length - 1], 'mousedown', mouseDown);
      }
    }

    bg = bodyNode.appendChild(ce('div', {className: 'tag_bg'}, {position: 'fixed'}));
    addEvent(window, 'resize', resize);
    resize();

    node.style.zIndex = zstart + 10;
    elem.style.zIndex = zstart + 20;

    tagframe = node.appendChild(ce('div', {
      className: 'tag_frame',
      innerHTML: '<img src="' + elem.src + '" />'
    }, {
      cursor : 'move',
      zIndex : zstart + 40
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
      if (minr == maxr && s.length < 2) return;
      taghandles[s] = node.appendChild(ce('div', {className: 'tag_frame_handle ' + s}, {
        cursor : s + '-resize',
        zIndex : zstart + 50
      }));
    });

    addEvent(node, 'mousedown', mouseDown);

    if (options.crop) {
      var d = options.crop.split(',');
      for (var i = 0; i < d.length; ++i) {
        d[i] = intval(d[i]);
      }
      if (!d[3]) {
        d[3] = d[2];
      }
      if (d[2] < minw) {
        d[2] = minw;
      }
      if (d[3] < minh) {
        d[3] = minh;
      }
      options.rect = {left: d[0], top: d[1], width: d[2], height: d[3]};
    }

    if (options.rect) {
      showRect(options.rect);
      show(tagfaded, tagframe);
      each(taghandles, function() { show(this); });
    } else {
      elem.style.cursor = 'crosshair';
      addEvent(elem, 'mousedown', mouseDown);
    }

    if (isFunction(options.onInit)) {
      options.onInit();
    }
  })();

  return {
    destroy: function() {
      initTries = -1;
      elem.style.cursor = 'default';
      cleanElems(node, elem);
      for (var i in icons) {
        if (icons[i]) {
          cleanElems(icons[i]);
        }
      }
      each(taghandles, function() { cleanElems(this); });
      removeEvent(window, 'resize', resize);
    },
    result: function() {
      return [rect.left, rect.top, rect.width, rect.height];
    }
  }
}

try{stManager.done('ads_tagger.js');}catch(e){}
