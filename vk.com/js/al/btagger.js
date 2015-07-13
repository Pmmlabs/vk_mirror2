function BTagger(obj, opts) {
  obj = ge(obj);
  var f = function() {}
  opts = extend({padding: 50, size: getSize(obj), s: {}, onMove: f, onStart: f, onMoveStart: f}, opts);
  opts.s = extend({
    t: opts.padding,
    l: opts.padding,
    w: opts.size[0] - opts.padding * 2,
    h: opts.size[1] - opts.padding * 2
  }, opts.s);
  if (!opts.s.b) {
    opts.s.b = opts.size[1] - opts.s.t - opts.s.h;
  }
  if (!opts.s.r) {
    opts.s.r = opts.size[0] - opts.s.l - opts.s.w;
  }

  BTagger._inst[BTagger._i] = this;

  var html = '';
  var corners = ['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br'];
  for (var i in corners) {
    html += '<div onmousedown="return BTagger._inst['+BTagger._i+'].move(this, \''+corners[i]+'\', event)" class="btagger_pin btagger_'+corners[i]+'"></div>';
  }
  this.border = ce('div', {
    className: 'btagger_border'
  }, {
    width: opts.s.w,
    height: opts.s.h,
    borderWidth: opts.s.t+'px '+opts.s.r+'px '+opts.s.b+'px '+opts.s.l+'px'
  })
  this.corners = ce('div', {
    className: 'btagger_corners',
    innerHTML: html
  }, {
    width: opts.s.w,
    height: opts.s.h,
    margin: opts.s.t+'px '+opts.s.r+'px 0px '+opts.s.l+'px'
  })
  this.opts = opts;
  obj.parentNode.insertBefore(this.border, obj);
  obj.parentNode.insertBefore(this.corners, obj);
  addEvent(this.corners, 'mousedown', (function(ev) {
    this.move(this.corners, 'mm', ev);
  }).bind(this));
  opts.onStart(opts.s);
}

extend(BTagger, { _inst: {}, _i: 0, prototype: {

move: function(obj, corner, evMove) {
  var cursor = getStyle(obj, 'cursor');
  var bg = bodyNode.appendChild(ce('div', {className: 'btagger_bg fixed'}, {
    cursor: cursor,
    width: Math.max(intval(window.innerWidth), intval(document.documentElement.clientWidth)),
    height: Math.max(intval(window.innerHeight), intval(document.documentElement.clientHeight))
  }));

  addClass(this.corners, 'btagger_active');
  var pos = [evMove.pageX, evMove.pageY];
  var o = this.opts.s;
  this.opts.onMoveStart(o);
  var s = clone(o);
  var c2 = corner.substr(1);
  var c1 = corner.substr(0, 1);
  var m, up;
  up = (function(ev) {
    removeClass(this.corners, 'btagger_active');
    removeEvent(bg, 'mousemove', m)
    removeEvent(bg, 'mouseup', up)
    re(bg);
    extend(this.opts.s, s);
    this.opts.onMove(s);
  }).bind(this);
  m = (function (ev) {
    var diff = [ev.pageX - pos[0], ev.pageY - pos[1]];
    var diffw = (c2 == 'l' ? diff[0] : -diff[0]);
    var diffh = (c1 == 't' ? diff[1] : -diff[1]);

    var helfh = o.h - diffh;
    var helfw = o.w - diffw;
    if (helfh < 80 || helfw < 80) {
      var newc1 = c1, newc2 = c2;
      if (c1 != 'm') {
        if (helfh < 80) {
          ev.pageY += (c1 == 't') ? helfh : -helfh;
          newc1 = (c1 == 't' ? 'b' : 't');
        } else if (helfh < 160) {
          ev.pageY += (c1 == 't') ? helfh - 160 : -(helfh-160);
          debugLog('case here');
        } else if (diffh + o[c1] < 0) {
          ev.pageY += (c1 == 'b') ? diffh + o[c1] : -(diffh + o[c1]);
        }
      }
      if (c2 != 'm') {
        if (helfw < 80) {
          ev.pageX += (c2 == 'l') ? helfw : -helfw;
          newc2 = (c2 == 'l' ? 'r' : 'l');
        } else if (helfw < 160) {
          debugLog(helfw, diffw, o.w);
          ev.pageX += (c2 == 'l') ? helfw - 160 : -(helfw-160);
        } else if (diffw + o[c2] < 0) {
          ev.pageX += (c2 == 'r') ? diffw + o[c2] : -(diffw + o[c2]);
        }
      }
      setTimeout((function() {
        var obj = geByClass1('btagger_'+newc1 + newc2, ge('pv_filter_under'))
        up();
        return this.move(obj, newc1 + newc2, ev);
      }).bind(this), 0);
    }

    if (c1 != 'm') {
      diffh -= Math.min(diffh + o[c1], 0);
      diffh -= Math.max(160 - o.h + diffh, 0);
    }
    if (c2 != 'm') {
      diffw -= Math.min(diffw + o[c2], 0);
      diffw -= Math.max(160 - o.w + diffw, 0);
    }
    if (c2 == 'm' && c1 == 'm') {
      diffh += Math.min(-diffh + o['t'], 0);
      diffh -= Math.min(diffh + o['b'], 0);
      diffw += Math.min(-diffw + o['l'], 0);
      diffw -= Math.min(diffw + o['r'], 0);
      s['t'] = o['t'] - diffh;
      s['b'] = o['b'] + diffh;
      s['l'] = o['l'] - diffw;
      s['r'] = o['r'] + diffw;
      s.w = o.w;
      s.h = o.h;
    } else if (c2 == 'm') {
      s[c1] = o[c1] + diffh;
      s.h = o.h - diffh;
      s.w = o.w;
    } else if (c1 == 'm') {
      s[c2] = o[c2] + diffw;
      s.w = o.w - diffw;
      s.h = o.h;
    } else {
      s[c2] = o[c2] + diffw;
      s[c1] = o[c1] + diffh;
      s.w = o.w - diffw;
      s.h = o.h - diffh;
    }
    var rect = s.t +'px '+s.r+'px '+s.b+'px '+s.l+'px';
    setStyle(this.border, {
      width: s.w,
      height: s.h,
      borderWidth: rect
    });
    setStyle(this.corners, {
      width: s.w,
      height: s.h,
      margin: s.t+'px '+s.r+'px 0px '+s.l+'px'
    });
    return cancelEvent(ev);
  }).bind(this);
  addEvent(bg, 'mousemove', m);
  addEvent(bg, 'mouseup', up);
  return cancelEvent(evMove);
},

hide: function() {
  re(this.corners);
  re(this.border);
},

getOpts: function() {
  return this.opts.s;
}

}});try{stManager.done('btagger.js');}catch(e){}
