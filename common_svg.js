/*
 *  Common.js lite version for svg scripts with some common svg stuff
 */

var xmlns = 'http://www.w3.org/2000/svg',
    root,
    _svgUid,
    ret = {},
    __debugMode = true,
    postMsg = false;

function initSvg(evt) {

  root = document.documentElement;
  // Search url query for svg id!
  var q = document.URL.indexOf('?');
  var newDomain = undefined;
  if (q != -1) {
    var s = document.URL.substring(q + 1);
    var urlData = s.split('&');
    for (var i in urlData) {
      var kv = urlData[i].split('=');
      if (kv[0] == 'svgid') {
        _svgUid = kv[1];
      } else if (kv[0] == 'dmn') {
        newDomain = kv[1];
      } else if (kv[0] == 'pst') {
        postMsg = kv[1] > 0;
      }
    }
  }

  if (postMsg) {
    window.addEventListener('message', function(e) {
      if (!e.origin.match(/^https?:\/\/([a-zA-Z0-9\-\.]+\.)?vk\.com$/)) {
        return false;
      }
      processMessage(e.data);
    }, false);
    setTimeout(function() {
    top.postMessage({
        act: 'init',
        svgUid: _svgUid
      }, '*');
    }, 500);
  } else {
    if (newDomain !== undefined && newDomain.match(/(\.|\/|^)vk\.com$/)) {
      document.domain = newDomain;
    }
    topObj = top;
    doInit();
  }
}

function parentInvoke(method, args) {
  if (postMsg) {
    top.postMessage({
      act: 'invoke',
      method: method,
      args: args
      }, '*');
  } else {
    var parts = method.split('.');
    var ref = top;
    for (var i = 0; i < parts.length - 1; i++) {
      ref = ref[parts[i]];
    }
    ref[parts.pop()].apply({}, args);
  }
}

function doInit() {
  if (!('cur' in top)) {
    top.cur = {};
  }
  if (!('svgData' in top.cur) || top.cur.svgData === undefined) {
    top.cur.svgData = {};
  }
  if (!_svgUid) {
    for (var i = 0; i in top.cur.svgData; i++) ;
    _svgUid = i;
  }

  extend(ret, {
    svgUid: _svgUid,
    container: document
  });

  top.cur.svgData[_svgUid] = ret;
}

Function.prototype.pbind = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(window);
  return this.bind.apply(this, args);
};
Function.prototype.bind = function() {
  var func = this, args = Array.prototype.slice.call(arguments);
  var obj = args.shift();
  return function() {
    var curArgs = Array.prototype.slice.call(arguments);
    return func.apply(obj, args.concat(curArgs));
  }
}
function intval(value) {
  if (value === true) return 1;
  return isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10);
}
function rand(mi, ma) { return Math.random() * (ma - mi + 1) + mi; }
function irand(mi, ma) { return Math.floor(rand(mi, ma)); }
function isFunction(obj) {return Object.prototype.toString.call(obj) === '[object Function]'; }
function isArray(obj) { return Object.prototype.toString.call(obj) === '[object Array]'; }
function isEmpty(o) { if(Object.prototype.toString.call(o) !== '[object Object]') {return false;} for(var i in o){ if(o.hasOwnProperty(i)){return false;} } return true; }
function vkNow() { return +new Date; }

function ce(tag, attr) {
  var el = document.createElementNS(xmlns, tag);
  for (var i in attr) {
    el.setAttribute(i, attr[i]);
  }
  return el;
}

function ge(id) {
  if (typeof id == 'string' || typeof id == 'number') return document.getElementById(id);
  return id;
}

function extendAttr(el, o) {
  for (var i in o) {
    el.setAttribute(i, o[i]);
  }
}

function each(object, callback) {
  var name, i = 0, length = object.length;

  if (length === undefined) {
    for (name in object)
      if (callback.call(object[name], name, object[name]) === false)
        break;
  } else {
    for (var value = object[0];
      i < length && callback.call(value, i, value) !== false;
        value = object[++i]) {}
  }

  return object;
}

// Extending object by another
function extend() {
  var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }

  if (typeof target !== "object" && !isFunction(target))
    target = {};

  if (length == i) {
    return target;
  }

  for (; i < length; i++)
    if ((options = arguments[i]) != null)
      for (var name in options) {
        var src = target[name], copy = options[name];

        if (target === copy)
          continue;

        if (deep && copy && typeof copy === "object" && !copy.nodeType)
          target[name] = extend(deep,
            src || (copy.length != null ? [] : { })
          , copy);

        else if (copy !== undefined)
            target[name] = copy;
      }
  return target;
}

// Simple FX
function animate(el, params, speed, callback) {
  el = ge(el);
  if (!el) return;
  var _cb = isFunction(callback) ? callback : function() {};
  var options = extend({}, typeof speed == 'object' ? speed : {duration: speed, onComplete: _cb});
  var fromArr = {}, toArr = {}, visible = isVisible(el), self = this, p;
  options.orig = {};
  params = clone(params);
  var tween = sData(el, 'tween'), i, name, toggleAct = visible ? 'hide' : 'show';
  if (tween && tween.isTweening) {
    options.orig = extend(options.orig, tween.options.orig);
    tween.stop(false);
    if (tween.options.show) toggleAct = 'hide';
    else if (tween.options.hide) toggleAct = 'show';
  }
  for (p in params)  {
    if (!tween && (params[p] == 'show' && visible || params[p] == 'hide' && !visible)) {
      return options.onComplete.call(this, el);
    }
    if ((p == 'height' || p == 'width') && el.style) {
      if (options.orig.overflow == undefined) {
        options.orig.overflow = getStyle(el, 'overflow');
      }
      el.style.overflow = 'hidden';
      el.style.display = 'block';
    }
    if (/show|hide|toggle/.test(params[p])) {
      if (params[p] == 'toggle') {
        params[p] = toggleAct;
      }
      if (params[p] == 'show') {
        var from = 0;
        options.show = true;
        if (options.orig[p] == undefined) {
          options.orig[p] = getStyle(el, p, false) || '';
          setStyle(el, p, 0);
        }

        var o = options.orig[p];

        var old = el.style[p];
        el.style[p] = o;
        params[p] = parseFloat(getStyle(el, p, true));
        el.style[p] = old;

      } else {
        if (options.orig[p] == undefined) {
          options.orig[p] = getStyle(el, p, false) || '';
        }
        options.hide = true;
        params[p] = 0;
      }
    }
  }
  if (options.show && !visible) {
    show(el);
  }
  tween = new Fx.Base(el, options);
  each(params, function(name, to) {
    if (/backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|borderColor|outlineColor/.test(name)) {
      var p = (name == 'borderColor') ? 'borderTopColor' : name;
      from = getColor(el, p);
      to = getRGB(to);
    } else {
      var parts = to.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
        start = tween.cur(name, true) || 0;
      if (parts) {
        to = parseFloat(parts[2]);
        if (parts[1]) {
          to = ((parts[1] == '-=' ? -1 : 1) * to) + to;
        }
      }

      from = tween.cur(name, true);
      if (from == 0 && (name == 'width' || name == 'height'))
        from = 1;

      if (name == 'opacity' && to > 0 && !visible) {
        setStyle(el, 'opacity', 0);
        from = 0;
        show(el);
      }
    }
    if (from != to || (isArray(from) && from.join(',') == to.join(','))) {
      fromArr[name] = from;
      toArr[name] = to;
    }
  });
  tween.start(fromArr, toArr);
  sData(el, 'tween', tween);

  return tween;
}

function fadeTo(el, speed, to, callback) {
  return animate(el, {opacity: to}, speed, callback);
}

var Fx = fx = {
  Transitions: {
    linear: function(t, b, c, d) { return c*t/d + b; },
    sineInOut: function(t, b, c, d) { return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b; },
    halfSine: function(t, b, c, d) { return c * (Math.sin(Math.PI * (t/d) / 2)) + b; },
    easeOutBack: function(t, b, c, d) { var s = 1.70158; return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b; },
    easeInCirc: function(t, b, c, d) { return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b; },
    easeOutCirc: function(t, b, c, d) { return c * Math.sqrt(1 - (t=t/d-1)*t) + b; },
    easeInQuint: function(t, b, c, d) { return c*(t/=d)*t*t*t*t + b; },
    easeOutQuint: function(t, b, c, d) { return c*((t=t/d-1)*t*t*t*t + 1) + b; }
  },
  Attrs: [
    [ 'height', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom' ],
    [ 'width', 'marginLeft', 'marginRight', 'paddingLeft', 'paddingRight' ],
    [ 'opacity', 'left', 'top' ]
  ],
  Timers: [],
  TimerId: null
}

Fx.Base = function(el, options, name) {
  this.el = ge(el);
  this.name = name;
  this.options = extend({
    onComplete: function() {},
    transition: Fx.Transitions.sineInOut,
    duration: 500
  }, options || {});
}

function genFx(type, num) {
  var obj = {};
  each(Fx.Attrs.concat.apply([], Fx.Attrs.slice(0, num)), function() {
    obj[this] = type;
  });
  return obj;
};

// Shortcuts for custom animations
each({slideDown: genFx('show', 1),
  slideUp: genFx('hide', 1),
  slideToggle: genFx('toggle', 1),
  fadeIn: {opacity: 'show'},
  fadeOut: {opacity: 'hide'},
  fadeToggle: {opacity: 'toggle'}}, function(f, val) {
  window[f] = function(el, speed, callback) { return animate(el, val, speed, callback); }
});

Fx.Base.prototype = {
  start: function(from, to){
    this.from = from;
    this.to = to;
    this.time = vkNow();
    this.isTweening = true;

    var self = this;
    function t(gotoEnd) {
      return self.step(gotoEnd);
    }
    t.el = this.el;
    if (t() && Fx.Timers.push(t) && !Fx.TimerId) {
      Fx.TimerId = setInterval(function() {
        var timers = Fx.Timers, l = timers.length;
        for (var i = 0; i < l; i++) {
          if (!timers[i]()) {
            timers.splice(i--, 1);
            l--;
          }
        }
        if (!l) {
          clearInterval(Fx.TimerId);
          Fx.TimerId = null;
        }
      }, 13);
    }
    return this;
  },

  stop: function(gotoEnd) {
    var timers = Fx.Timers;

    for (var i = timers.length - 1; i >= 0; i--) {
      if (timers[i].el == this.el ) {
        if (gotoEnd) {
          timers[i](true);
        }
        timers.splice(i, 1);
      }
    }
    this.isTweening = false;
  },

  step: function(gotoEnd) {
    var time = vkNow();
    if (!gotoEnd && time < this.time + this.options.duration) {
      this.cTime = time - this.time;
      this.now = {};
      for (p in this.to) {
        // color fx
        if (isArray(this.to[p])) {
          var color = [], j;
          for (j = 0; j < 3; j++) {
            if (this.from[p] === undefined || this.to[p] === undefined) {
              return false;
            }
            color.push(Math.min(parseInt(this.compute(this.from[p][j], this.to[p][j])), 255));
          }
          this.now[p] = color;
        } else {
          this.now[p] = this.compute(this.from[p], this.to[p]);
        }
      }
      this.update();
      return true;
    } else {
      setTimeout(this.options.onComplete.bind(this, this.el), 10);
      this.now = extend(this.to, this.options.orig);
      this.update();
      if (this.options.hide) hide(this.el);
      this.isTweening = false;
      return false;
    }
  },

  compute: function(from, to){
    var change = to - from;
    return this.options.transition(this.cTime, from, change, this.options.duration);
  },

  update: function(){
    for (var p in this.now) {
      if (isArray(this.now[p])) setStyle(this.el, p, 'rgb(' + this.now[p].join(',') + ')');
      else this.el[p] != undefined ? (this.el[p] = this.now[p]) : setStyle(this.el, p, this.now[p]);
    }
  },

  cur: function(name, force){
    if (this.el[name] != null && (!this.el.style || this.el.style[name] == null))
      return this.el[name];
    return parseFloat(getStyle(this.el, name, force)) || 0;
  }
}
/**
 * CSS classes
 **/

function hasClass(obj, name) {
  obj=ge(obj);
  return obj && (new RegExp('(\\s|^)' + name + '(\\s|$)')).test(obj.className);
}

function addClass(obj, name) {
  obj=ge(obj);
  if (obj && !hasClass(obj, name)) obj.className = trim(obj.className + ' ' + name);
}

function removeClass(obj, name) {
  obj=ge(obj);
  if (obj && hasClass(obj, name)) obj.className = trim(obj.className.replace((new RegExp('(\\s+|^)' + name + '(\\s+|$)')), ' '));
}

function isVisible(elem) {
  elem = ge(elem);
  if (!elem || !elem.style) return false;
  return getStyle(elem, 'display') != 'none';
}


// Get computed style
function getStyle(elem, name, force) {
  elem = ge(elem);
  if (isArray(name)) { var res = {}; each(name, function(i,v){res[v] = getStyle(elem, v);}); return res; }
  if (force === undefined) {
    force = true;
  }
  if (!force && elem.style && (elem.style[name] || name == 'height')) {
    return elem.style[name];
  }

  if (force && (name == 'width' || name == 'height')) {
    return getSize(elem, true)[({'width': 0, 'height': 1})[name]] + 'px';
  }

  var ret, defaultView = document.defaultView || window;
  if (defaultView.getComputedStyle) {
    name = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    var computedStyle = defaultView.getComputedStyle(elem, null);
    if (computedStyle) {
      ret = computedStyle.getPropertyValue(name);
    }
  } else if (elem.currentStyle) {
    var camelCase = name.replace(/\-(\w)/g, function(all, letter){
      return letter.toUpperCase();
    });
    ret = elem.currentStyle[name] || elem.currentStyle[camelCase];
    //dummy fix for ie
    if (ret == 'auto') {
      ret = 0;
    }

    if (!/^\d+(px)?$/i.test(ret) && /^\d/.test(ret)) {
      var style = elem.style, left = style.left, rsLeft = elem.runtimeStyle.left;

      elem.runtimeStyle.left = elem.currentStyle.left;
      style.left = ret || 0;
      ret = style.pixelLeft + 'px';

      style.left = left;
      elem.runtimeStyle.left = rsLeft;
    }
  }
  return ret;
}

function setStyle(elem, name, value){
  elem = ge(elem);
  if (!elem) return;
  if (typeof name == 'object') return each(name, function(k, v) { setStyle(elem,k,v); });
  if (name == 'opacity') {
    elem.style.opacity = value;
  } else {
    try{
    var isN = typeof(value) == 'number';
    if (isN && (/height|width/i).test(name)) value = Math.abs(value);
    elem.style[name] = isN && !(/z-?index|font-?weight|opacity|zoom|line-?height/i).test(name) ? value + 'px' : value;
    } catch(e){debugLog([name, value]);}
  }
}

//
// Store data connected to element
//

var vkExpand = 'VK' + vkNow(), vkUUID = 0, vkCache = {};

function sData(elem, name, data) {
  var id = elem[vkExpand], undefined;
  if (!id) {
    id = elem[vkExpand] = ++vkUUID;
  }

  if (name && !vkCache[id]) {
    vkCache[id] = {};
    if (__debugMode) vkCache[id].__elem = elem;
  }

  if (data !== undefined) {
    vkCache[id][name] = data;
  }

  return name ? vkCache[id][name] : id;
}

function clone(obj) {
  var newObj = isArray(obj) ? [] : {};
  for (var i in obj) {
    newObj[i] = obj[i];
  }
  return newObj;
}

// gets i-th color pair - method to get some distinct colors
function getIthColor(i) {
  if (i < 20) {
    var precalc = [
      '#597BA8',
      '#82A2CD',
      '#BF68A6',
      '#78B27C',
      '#E7E271',
      '#F3B200',
      '#D75C56',
      '#B6D15E',
      '#74D2B2',
      '#6BC3D3',
      '#586EA9',
      '#837FCF',
      '#8866C9',
      '#98CD9E',
      '#CECC8D',
      '#AE914C',
      '#A55D5A',
      '#8E9D5A',
      '#4BB48F',
      '#509FAE'
    ];
    return [precalc[i]];
  }

  var first;
  if (i < 3) {
    var ans = ['00', '00', '00'];
    ans[i] = 'FF';
    first =  '#' + ans.join('');
  } else if (i < 6) {
    var ans = ['FF', 'FF', 'FF'];
    ans[5 - i] = '00';
    first =  '#' + ans.join('');
  } else {
    i -= 6;
    for (var level = 0;; level++) {
      var curn = 1 << level;
      if (i >= 6 * curn) {
        i -= 6 * curn;
        continue;
      }
      var curi = intval(i / 6),
          step = 1 / (1 << (level + 1)),
          curstep = (1 + 2 * curi) * step;
      var nn = intval(256 * curstep).toString(16);
      while (nn.length < 2) nn = '0' + nn;
      switch (i % 6) {
        case 0: first = '#' + ['FF', '00', nn].join(''); break;
        case 1: first = '#' + ['FF', nn, '00'].join(''); break;
        case 2: first = '#' + ['00', 'FF', nn].join(''); break;
        case 3: first = '#' + ['00', nn, 'FF'].join(''); break;
        case 4: first = '#' + [nn, 'FF', '00'].join(''); break;
        case 5: first = '#' + [nn, '00', 'FF'].join(''); break;
      }
      break;
    }
  }

  var second = '#',
      third = '#',
      fourth = '#';
  for (var i = 0; i < 3; i++) {
    var cur = parseInt(first.substring(1 + i * 2, 3 + i * 2), 16);

    var nw = (intval(cur * 0.3)).toString(16);
    while (nw.length < 2) nw = '0' + nw;
    second += nw;

    nw = cur;
    nw *= 0.9;
    nw = nw + (255 - nw) * 0.6;
    nw = intval(nw).toString(16);
    while (nw.length < 2) nw = '0' + nw;
    third += nw;

    nw = cur;
    nw *= 0.8;
    nw = nw + (255 - nw) * 0.3
    nw = intval(nw).toString(16);
    while (nw.length < 2) nw = '0' + nw;
    fourth += nw;
  }
  return [third, second, fourth];
}
