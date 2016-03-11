if (vk.al == 1) {
  if (location['search'] || location.pathname != '/') {
    location.replace('/');
  }
} else {
  if (vk.al == 3 && !history.pushState) vk.al = 2;
  if (!location['search'] && location.pathname == '/index.php') {
    location.replace('/');
  }
  vk.version = false;
}
if (!window.stVersions) {
  window.navMap = window.stVersions = window.stTypes = {};window._rnd = 1;
}

window.__debugMode = true; // Don't turn it off
window._wf = 0; // window focused

if (!window._ua) {
  var _ua = navigator.userAgent.toLowerCase();
}
if (!window.locDomain) {
  var locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0];
}
if (!window.StaticFiles) {
  var StaticFiles = {};
}
var parseJSON = (window.JSON && JSON.parse) ? function (obj) {
  try { return JSON.parse(obj); } catch (e) {
    topError('<b>parseJSON:</b> ' + e.message, {dt: -1, type: 5, answer: obj});
    return eval('('+obj+')');
  }
} : function(obj) {
  return eval('('+obj+')');
}

var cur = {destroy: [], nav: []}; // Current page variables and navigation map.
var browser = {
  version: (_ua.match( /.+(?:me|ox|on|rv|it|era|opr|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
  opera: (/opera/i.test(_ua) || /opr/i.test(_ua)),
  msie: (/msie/i.test(_ua) && !/opera/i.test(_ua) || /trident\//i.test(_ua)) || /edge/i.test(_ua),
  msie6: (/msie 6/i.test(_ua) && !/opera/i.test(_ua)),
  msie7: (/msie 7/i.test(_ua) && !/opera/i.test(_ua)),
  msie8: (/msie 8/i.test(_ua) && !/opera/i.test(_ua)),
  msie9: (/msie 9/i.test(_ua) && !/opera/i.test(_ua)),
  mozilla: /firefox/i.test(_ua),
  chrome: /chrome/i.test(_ua) && !/edge/i.test(_ua),
  safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
  iphone: /iphone/i.test(_ua),
  ipod: /ipod/i.test(_ua),
  iphone4: /iphone.*OS 4/i.test(_ua),
  ipod4: /ipod.*OS 4/i.test(_ua),
  ipad: /ipad/i.test(_ua),
  android: /android/i.test(_ua),
  bada: /bada/i.test(_ua),
  mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(_ua),
  msie_mobile: /iemobile/i.test(_ua),
  safari_mobile: /iphone|ipod|ipad/i.test(_ua),
  opera_mobile: /opera mini|opera mobi/i.test(_ua),
  opera_mini: /opera mini/i.test(_ua),
  mac: /mac/i.test(_ua),
  search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(_ua)
};
var mobPlatforms = {1:1,2:1,3:1,4:1,5:1};

(function() {
  var flash = [0, 0, 0], axon = 'ShockwaveFlash.ShockwaveFlash';
  var wrapType = 'embed', wrapParam = 'type="application/x-shockwave-flash" ';
  var escapeAttr = function(v) {
    return v.toString().replace('&', '&amp;').replace('"', '&quot;');
  }
  if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
    var x = navigator.plugins['Shockwave Flash'];
    if (x && x.description) {
      var ver = x.description.replace(/([a-zA-Z]|\s)+/, '').replace(/(\s+r|\s+b[0-9]+)/, '.').split('.');
      for (var i = 0; i < 3; ++i) flash[i] = ver[i] || 0;
    }
  } else {
    if (_ua.indexOf('Windows CE') >= 0) {
      var axo = true, ver = 6;
      while (axo) {
        try {
          ++ver;
          axo = new ActiveXObject(axon + '.' + ver);
          flash[0] = ver;
        } catch(e) {}
      }
    } else {
      try {
        var axo = new ActiveXObject(axon + '.7');
        flash = axo.GetVariable('$version').split(' ')[1].split(',');
      } catch (e) {}
    }
    wrapType = 'object';
    wrapParam = 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
  }
  browser.flashwrap = (wrapType == 'embed') ? function(opts, params) {
    params = extend({
      id: opts.id,
      name: opts.id,
      width: opts.width,
      height: opts.height,
      style: opts.style,
      preventhide: opts.preventhide
    }, params);
    if (browser.flash >= opts.version) {
      params.src = opts.url;
    } else {
      params.src = opts.express;
    }
    var paramsStr = [];
    for (var i in params) {
      var p = params[i];
      if (p !== undefined && p !== null) {
        paramsStr.push(i + '="' + escapeAttr(p) + '" ');
      }
    }
    return '<embed ' + wrapParam + paramsStr.join('') + '/>';
  } : function(opts, params) {
    if (browser.flash >= opts.version) {
      params.movie = opts.url;
    } else {
      params.movie = opts.express;
    }
    var attr = {
      id: opts.id,
      width: opts.width,
      height: opts.height,
      style: opts.style,
      preventhide: opts.preventhide
    }
    var attrStr = [];
    for (var i in attr) {
      var p = attr[i];
      if (p !== undefined && p !== null) {
        attrStr.push(i + '="' + escapeAttr(p) + '" ');
      }
    }
    var paramsStr = [];
    for (var i in params) {
      var p = params[i];
      if (p !== undefined && p !== null) {
        paramsStr.push('<param name="' + i + '" value="' + escapeAttr(p) + '" />');
      }
    }
    return '<object ' + wrapParam + attrStr.join('') +'>' + paramsStr.join('') + '</object>';
  }
  if (flash[0] < 7) flash = [0, 0, 0];
  browser.flash = intval(flash[0]);
  browser.flashfull = {
    major: browser.flash,
    minor: intval(flash[1]),
    rev: intval(flash[2])
  }
  setCookie('remixflash', intval(flash[0]) + '.' + intval(flash[1]) + '.' + intval(flash[2]), 30);
})();

if (browser.android) {
  setCookie('remixscreen_width', window.screen.width, 365);
  setCookie('remixscreen_height', window.screen.height, 365);
  setCookie('remixscreen_dpr', window.devicePixelRatio || 1, 365);
}
setCookie('remixscreen_depth', screen.pixelDepth ? screen.pixelDepth : screen.colorDepth, 365);

if (!browser.msie6) {
  delete StaticFiles['ie6.css'];
}
if (!browser.msie7) {
  delete StaticFiles['ie7.css'];
}
for (var i in StaticFiles) {
  var f = StaticFiles[i];
  f.t = (i.indexOf('.css') != -1) ? 'css' : 'js';
  f.n = i.replace(/[\/\.]/g, '_');
  f.l = 0;
  f.c = 0;
}

window.locHost = location.host;
window.locProtocol = location.protocol;
window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost);
if (!__dev) __debugMode = false;
window.locHash = location.hash.replace('#/', '').replace('#!', '');
window.locBase = location.toString().replace(/#.+$/, '');

function topMsg(text, seconds, color) {
  if (!color) color = '#D6E5F7';
  if (!text) {
    hide('system_msg');
  } else {
    clearTimeout(window.topMsgTimer);
    var el = ge('system_msg');
    el.style.backgroundColor = color;
    el.innerHTML = text;
    show(el);
    if (seconds) {
      window.topMsgTimer = setTimeout(topMsg.pbind(false), seconds * 1000);
    }
  }
}

function topError(text, opts) {
  if (!opts) opts = {};
  if (text.message) {
    var e = text;
    text = '<b>JavaScript error:</b> ' + e.message;
    opts.stack = e.stack;
    if (e.stack && __debugMode) text += '<br/>' + e.stack.replace(/\n/g, '<br/>');
    try { console.log(e.stack); } catch (e2) {};
  }
  if (!opts.stack) {
    try {eval('0 = 1');} catch(e) {
      opts.stack = e.stack;
    }
  }

  if (opts.dt != -1) {
    topMsg(text, opts.dt, '#FFB4A3');
  }
  if (!__dev && !ge('debuglogwrap')) {
    delete(opts.dt);
    ajax.plainpost('/errors.php', extend(opts, {msg: opts.msg || text, module: (window.cur || {}).module, id: vk.id, host: locHost, lang: vk.lang, loc: (window.nav || {}).strLoc, realloc: location.toString()}));
  }
}

function langNumeric(count, vars, formatNum) {
  if (!vars || !window.langConfig) { return count; }
  var res;
  if (!isArray(vars)) {
    res = vars;
  } else {
    res = vars[1];
    if(count != Math.floor(count)) {
      res = vars[langConfig.numRules['float']];
    } else {
      each(langConfig.numRules['int'], function(i,v){
        if (v[0] == '*') { res = vars[v[2]]; return false; }
        var c = v[0] ? count % v[0] : count;
        if(indexOf(v[1], c) != -1) { res = vars[v[2]]; return false; }
      });
    }
  }
  if (formatNum) {
    var n = count.toString().split('.'), c = [];
    for(var i = n[0].length - 3; i > -3; i -= 3) {
      c.unshift(n[0].slice(i > 0 ? i : 0, i + 3));
    }
    n[0] = c.join(langConfig.numDel);
    count = n.join(langConfig.numDec);
  }
  res = (res || '%s').replace('%s', count);
  return res;
}

function langSex(sex, vars) {
  if (!isArray(vars)) return vars;
  var res = vars[1];
  if (!window.langConfig) return res;
  each(langConfig.sexRules, function(i,v){
    if (v[0] == '*') { res = vars[v[1]]; return false; }
    if (sex == v[0] && vars[v[1]]) { res = vars[v[1]]; return false; }
  });
  return res;
}

function getLang() {
  try {
    var args = Array.prototype.slice.call(arguments);
    var key = args.shift();
    if (!key) return '...';
    var val = (window.cur.lang && window.cur.lang[key]) || (window.lang && window.lang[key]) || (window.langpack && window.langpack[key]) || window[key];
    if (!val) {
      var res = key.split('_');
      res.shift();
      return res.join(' ');
    }
    if (isFunction(val)) {
      return val.apply(null, args);
    } else if (args[0] !== undefined || isArray(val)) {
      return langNumeric(args[0], val, args[1]);
    } else {
      return val;
    }
  } catch(e) {
    debugLog('lang error:' + e.message + '(' + Array.prototype.slice.call(arguments).join(', ') + ')');
  }
}

// Debug Log

var _logTimer = (new Date()).getTime();
function debugLog(msg) {
  try {
    window.debuglogClient && debuglogClient(msg);
    var t = '[' + (((new Date()).getTime() - _logTimer) / 1000) + '] ';
    if (window.console && console.log) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(t);
      if (browser.msie || browser.mobile) {
        console.log(args.join(' '));
      } else {
        console.log.apply(console, args);
      }
    }
  } catch (e) {
  }
}
function debugEl(el) {
  return el && (((el.tagName || '').toLowerCase() + (el.className ? '.' + el.className.replace(/\s+/g, '.') : '') + (el.id && !/^__vk/.test(el.id) ? '#' + el.id : '')) || el.toString()) || '[NULL]';
}
function __bf() {}

// DOM

function ge(el) {
  return (typeof el == 'string' || typeof el == 'number') ? document.getElementById(el) : el;
}
function geByTag(searchTag, node) {
  node = ge(node) || document;
  return node.getElementsByTagName(searchTag);
}
function geByTag1(searchTag, node) {
  node = ge(node) || document;
  return node.querySelector && node.querySelector(searchTag) || geByTag(searchTag, node)[0];
}
function geByClass(searchClass, node, tag) {
  node = ge(node) || document;
  tag = tag || '*';
  var classElements = [];

  if (!browser.msie8 && node.querySelectorAll && tag != '*') {
    return node.querySelectorAll(tag + '.' + searchClass);
  }
  if (node.getElementsByClassName) {
    var nodes = node.getElementsByClassName(searchClass);
    if (tag != '*') {
      tag = tag.toUpperCase();
      for (var i = 0, l = nodes.length; i < l; ++i) {
        if (nodes[i].tagName.toUpperCase() == tag) {
          classElements.push(nodes[i]);
        }
      }
    } else {
      classElements = Array.prototype.slice.call(nodes);
    }
    return classElements;
  }

  var els = geByTag(tag, node);
  var pattern = new RegExp('(^|\\s)' + searchClass + '(\\s|$)');
  for (var i = 0, l = els.length; i < l; ++i) {
    if (pattern.test(els[i].className)) {
      classElements.push(els[i]);
    }
  }
  return classElements;
}
function geByClass1(searchClass, node, tag) {
  node = ge(node) || document;
  tag = tag || '*';
  return !browser.msie8 && node.querySelector && node.querySelector(tag + '.' + searchClass) || geByClass(searchClass, node, tag)[0];
}
function gpeByClass(className, elem) {
  elem = ge(elem);
  if (!elem) return null;
  while (elem = elem.parentNode) {
    if (hasClass(elem, className)) return elem;
  }
  return null;
}
function ce(tagName, attr, style) {
  var el = document.createElement(tagName);
  if (attr) extend(el, attr);
  if (style) setStyle(el, style);
  return el;
}

window.cf = (function(doc) {
  var frag = doc.createDocumentFragment(),
      elem = doc.createElement('div'),
      range = doc.createRange && doc.createRange();
  frag.appendChild(elem);
  range && range.selectNodeContents(elem);

  return range && range.createContextualFragment ?
    function (html) {
      if (!html) return doc.createDocumentFragment();
      return range.createContextualFragment(html);
    } :
    function (html) {
      if (!html) return doc.createDocumentFragment();
      elem.innerHTML = html;
      var frag = doc.createDocumentFragment();
      while (elem.firstChild) {
        frag.appendChild(elem.firstChild);
      }
      return frag;
    };
})(document);

function re(el) {
  el = ge(el);
  if (el && el.parentNode) el.parentNode.removeChild(el);
  return el;
}

function se(html) {return ce('div', {innerHTML: html}).firstChild;}
function rs(html, repl) {
  each (repl, function(k, v) {
    html = html.replace(new RegExp('%' + k + '%', 'g'), v);
  });
  return html;
}
function psr(html) {
  if (locProtocol != 'https:') return html;
  html = html.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, 'https://$1');
  html = html.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, 'https://pp.vk.me/c$3/$4');
  html = html.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, 'https://pp.vk.me/c$1/$3');
  html = html.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, 'https://ps.vk.me/c$1/');
  html = html.replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, 'https://ps.vk.me/v$1/');
  return html;
}

function domEL(el, p) {
  p = p ? 'previousSibling' : 'nextSibling';
  while (el && !el.tagName) el = el[p];
  return el;
}
function domNS(el) {
  return domEL((el || {}).nextSibling);
}
function domPS(el) {
  return domEL((el || {}).previousSibling, 1);
}
function domFC(el) {
  return domEL((el || {}).firstChild);
}
function domLC(el) {
  return domEL((el || {}).lastChild, 1);
}
function domPN(el) {
  return (el || {}).parentNode;
}

// Closest ansector matching given selector
function domCA(el, selector) {
  var matches = selector ?
                (el.matches ||
                el.matchesSelector ||
                el.msMatchesSelector ||
                el.mozMatchesSelector ||
                el.webkitMatchesSelector ||
                el.oMatchesSelector) :
                function() { return true; };
  do {
    el = domPN(el);
  } while(el && !matches.call(el, selector));
  return el;
}

function isAncestor(el, ancestor) {
  var current = ge(el);
  ancestor = ge(ancestor);
  if (!el || !ancestor) {
    return false;
  }
  while (current = current.parentNode) {
    if (current == ancestor) {
      return true;
    }
  }
  return false;
}

function show(elem) {
  var l = arguments.length;
  if (l > 1) {
    for (var i = 0; i < l; i++) {
      show(arguments[i]);
    }
    return;
  }

  elem = ge(elem);
  if (!elem || !elem.style) return;

  var old = elem.olddisplay;
  var newStyle = 'block';
  var tag = elem.tagName.toLowerCase();
  elem.style.display = old || '';

  if (getStyle(elem, 'display') !== 'none') {
    return;
  }

  if (hasClass(elem, 'inline')) {
    newStyle = 'inline';
  } else if (tag === 'tr' && !browser.msie) {
    newStyle = 'table-row';
  } else if (tag === 'table' && !browser.msie) {
    newStyle = 'table';
  } else {
    newStyle = 'block';
  }
  elem.style.display = elem.olddisplay = newStyle;
}

function hide(elem) {
  var l = arguments.length;
  if (l > 1) {
    for (var i = 0; i < l; i++) {
      hide(arguments[i]);
    }
    return;
  }

  elem = ge(elem);
  if (!elem || !elem.style) return;

  var display = getStyle(elem, 'display');
  elem.olddisplay = ((display != 'none') ? display : '');
  elem.style.display = 'none';
}

function isVisible(elem) {
  elem = ge(elem);
  if (!elem || !elem.style) return false;
  return getStyle(elem, 'display') != 'none';
}

function toggle(elem, v) {
  if (v === undefined) {
    v = !isVisible(elem);
  }
  if (v) {
    show(elem);
  } else {
    hide(elem);
  }
}

var hfTimeout = 0;
function toggleFlash(show, timeout) {
  //if (/mac/i.test(navigator.userAgent)) return;
  clearTimeout(hfTimeout);
  if (timeout > 0) {
    hfTimeout = setTimeout(function() {toggleFlash(show, 0)}, timeout);
    return;
  }

  var vis = show ? 'visible' : 'hidden';

  triggerEvent(document, show ? 'unblock' : 'block');

  var f = function() {
    if (this.getAttribute('preventhide')) {
      return;
    } else if (this.id == 'flash_app' && browser.msie) {

      show ? setStyle(this, {position: 'static', top: 0}) : setStyle(this, {position: 'absolute', top: '-5000px'});
    } else {
      this.style.visibility = vis;
    }
  };
  each(geByTag('embed'), f);
  each(geByTag('object'), f);
}

function getXY(obj, forFixed) {
  obj = ge(obj);
  if (!obj) return [0,0];

  var left = 0, top = 0, pos, lastLeft;
  if (obj.offsetParent) {
    do {
      left += (lastLeft = obj.offsetLeft);
      top += obj.offsetTop;
      pos = getStyle(obj, 'position');
      if (pos == 'fixed' || pos == 'absolute' || (pos == 'relative')) {
        left -= obj.scrollLeft;
        top -= obj.scrollTop;
        if (pos == 'fixed' && !forFixed) {
          left += ((obj.offsetParent || {}).scrollLeft || bodyNode.scrollLeft || htmlNode.scrollLeft);
          top += ((obj.offsetParent || {}).scrollTop || bodyNode.scrollTop || htmlNode.scrollTop);
        }
      }
    } while (obj = obj.offsetParent);
  }
  if (forFixed && browser.msie && intval(browser.version) < 9) {
    if (lastLeft) {
      left += ge('page_layout').offsetLeft;
    }
  }
  return [left,top];
}

function getSize(elem, withoutBounds) {
  elem = ge(elem);
  var s = [0, 0], de = document.documentElement;
  if (elem == document) {
    s =  [Math.max(
        de.clientWidth,
        bodyNode.scrollWidth, de.scrollWidth,
        bodyNode.offsetWidth, de.offsetWidth
      ), Math.max(
        de.clientHeight,
        bodyNode.scrollHeight, de.scrollHeight,
        bodyNode.offsetHeight, de.offsetHeight
      )];
  } else if (elem){
    function getWH() {
      s = [elem.offsetWidth, elem.offsetHeight];
      if (!withoutBounds) return;
      var padding = 0, border = 0;
      each(s, function(i, v) {
        var which = i ? ['Top', 'Bottom'] : ['Left', 'Right'];
        each(which, function(){
          s[i] -= parseFloat(getStyle(elem, 'padding' + this)) || 0;
          s[i] -= parseFloat(getStyle(elem, 'border' + this + 'Width')) || 0;
        });
      });
      s = [Math.round(s[0]), Math.round(s[1])];
    }
    if (!isVisible(elem)) {
      var props = {position: 'absolute', visibility: 'hidden', display: 'block'};
      var old = {};
      each(props, function(i, v) {
        old[i] = elem.style[i];
        elem.style[i] = v;
      });
      getWH();
      each(props, function(i, v) {
        elem.style[i] = old[i];
      });
    } else getWH();

  }
  return s;
}

function getZoom() {
  var r1 = ge('zoom_test_1') || document.body.appendChild(ce('div', {id: 'zoom_test_1'}, {left: '10%', position: 'absolute', visibility: 'hidden'})),
      r2 = ge('zoom_test_2') || document.body.appendChild(ce('div', {id: 'zoom_test_2'}, {left: r1.offsetLeft + 'px', position: 'absolute', visibility: 'hidden'}));
  return r2.offsetLeft / r1.offsetLeft;
}

//
//  Useful utils
//

Function.prototype.pbind = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(window);
  return this.bind.apply(this, args);
};
Function.prototype.rpbind = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(window);
  return this.rbind.apply(this, args);
}
Function.prototype.bind = function() {
  var func = this;
  var args = Array.prototype.slice.call(arguments);
  var obj = args.shift();
  return function() {
    var curArgs = Array.prototype.slice.call(arguments);
    return func.apply(obj, args.concat(curArgs));
  }
}
Function.prototype.rbind = function() {
  var func = this;
  var args = Array.prototype.slice.call(arguments);
  var obj = args.shift();
  var result = args.shift();
  return function() {
    var curArgs = Array.prototype.slice.call(arguments);
    func.apply(obj, args.concat(curArgs));
    return result;
  }
}

function rand(mi, ma) { return Math.random() * (ma - mi + 1) + mi; }
function irand(mi, ma) { return Math.floor(rand(mi, ma)); }
function isFunction(obj) {return Object.prototype.toString.call(obj) === '[object Function]'; }
function isArray(obj) { return Object.prototype.toString.call(obj) === '[object Array]'; }
function isObject(obj) { return Object.prototype.toString.call(obj) === '[object Object]' && !(browser.msie8 && obj && obj.item !== 'undefined' && obj.namedItem !== 'undefined'); }
function isEmpty(o) { if(Object.prototype.toString.call(o) !== '[object Object]') {return false;} for(var i in o){ if(o.hasOwnProperty(i)){return false;} } return true; }
function vkNow() { return +new Date; }
function vkImage() { return window.Image ? (new Image()) : ce('img'); } // IE8 workaround
function trim(text) { return (text || '').replace(/^\s+|\s+$/g, ''); }
function stripHTML(text) { return text ? text.replace(/<(?:.|\s)*?>/g, '') : ''; }
function escapeRE(s) { return s ? s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1') : ''; }
function intval(value) {
  if (value === true) return 1;
  return parseInt(value) || 0;
}
function floatval(value) {
  if (value === true) return 1;
  return parseFloat(value) || 0;
}
function positive(value) {
  value = intval(value);
  return value < 0 ? 0 : value;
}

function winToUtf(text) {
  return text.replace(/&#(\d\d+);/g, function(s, c) {
    c = intval(c);
    return (c >= 32) ? String.fromCharCode(c) : s;
  }).replace(/&quot;/gi, '"').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&amp;/gi, '&');
}
function replaceEntities(str) {
  return se('<textarea>' + ((str || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')) + '</textarea>').value;
}
function clean(str) {
  return str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : '';
}
function unclean(str) {
  return replaceEntities(str.replace(/\t/g, "\n"));
}

//
//  Arrays, objects
//

function each(object, callback) {
  if (!isObject(object) && typeof object.length !== 'undefined') {
    for (var i = 0, length = object.length; i < length; i++) {
      var value = object[i];
      if (callback.call(value, i, value) === false) break;
    }
  } else {
    for (var name in object) {
      if (!Object.prototype.hasOwnProperty.call(object, name)) continue;
      if (callback.call(object[name], name, object[name]) === false)
        break;
    }
  }

  return object;
}

function indexOf(arr, value, from) {
  for (var i = from || 0, l = (arr || []).length; i < l; i++) {
    if (arr[i] == value) return i;
  }
  return -1;
}
function inArray(value, arr) {
  return indexOf(arr, value) != -1;
}
function clone(obj, req) {
  var newObj = !isObject(obj) && typeof obj.length !== 'undefined' ? [] : {};
  for (var i in obj) {
    if (/webkit/i.test(_ua) && (i == 'layerX' || i == 'layerY')) continue;
    if (req && typeof(obj[i]) === 'object' && i !== 'prototype') {
      newObj[i] = clone(obj[i]);
    } else {
      newObj[i] = obj[i];
    }

  }
  return newObj;
}

function arrayKeyDiff(a) {   // Computes the difference of arrays by keys and values
  var arr_dif = {}, i = 1, argc = arguments.length, argv = arguments, key, found;
  for (key in a){
    found = false;
    for (i = 1; i < argc; i++){
      if (argv[i][key] && (argv[i][key] == a[key])){
        found = true;
      }
    }
    if (!found) {
      arr_dif[key] = a[key];
    }
  }
  return arr_dif;
}

// Extending object by another
function extend() {
  var a = arguments, target = a[0] || {}, i = 1, l = a.length, deep = false, options;

  if (typeof target === 'boolean') {
    deep = target;
    target = a[1] || {};
    i = 2;
  }

  if (typeof target !== 'object' && !isFunction(target)) target = {};

  for (; i < l; ++i) {
    if ((options = a[i]) != null) {
      for (var name in options) {
        var src = target[name], copy = options[name];

        if (target === copy) continue;

        if (deep && copy && typeof copy === 'object' && !copy.nodeType) {
          target[name] = extend(deep, src || (copy.length != null ? [] : {}), copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}


//
// CSS classes
//
window.whitespaceRegex = /[\t\r\n\f]/g;
function hasClass(obj, name ) {
  obj = ge(obj);
  if (obj &&
    obj.nodeType === 1 &&
    (" " + obj.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + name + " ") >= 0) {
    return true;
  }

  return false;
}
function addClass(obj, name) {
  if ((obj = ge(obj)) && !hasClass(obj, name)) {
    obj.className = (obj.className ? obj.className + ' ' : '') + name;
  }
}
function removeClass(obj, name) {
  if (obj = ge(obj)) {
    obj.className = trim((obj.className || '').replace((new RegExp('(\\s|^)' + name + '(\\s|$)')), ' '));
  }
}
function toggleClass(obj, name, v) {
  if (v === undefined) {
    v = !hasClass(obj, name);
  }
  (v ? addClass : removeClass)(obj, name);
  return v;
}
function replaceClass(obj, oldName, newName) {
  removeClass(obj, oldName);
  addClass(obj, newName);
}

// Get computed style
function getStyle(elem, name, force) {
  elem = ge(elem);
  if (isArray(name)) { var res = {}; each(name, function(i,v){res[v] = getStyle(elem, v);}); return res; }
  if (!elem) return '';
  if (force === undefined) {
    force = true;
  }
  if (!force && name == 'opacity' && browser.msie) {
    var filter = elem.style['filter'];
    return filter ? (filter.indexOf('opacity=') >= 0 ?
      (parseFloat(filter.match(/opacity=([^)]*)/)[1] ) / 100) + '' : '1') : '';
  }
  if (!force && elem.style && (elem.style[name] || name == 'height')) {
    return elem.style[name];
  }

  var ret, defaultView = document.defaultView || window;
  if (defaultView.getComputedStyle) {
    name = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    var computedStyle = defaultView.getComputedStyle(elem, null);
    if (computedStyle) {
      ret = computedStyle.getPropertyValue(name);
    }
  } else if (elem.currentStyle) {
    if (name == 'opacity' && browser.msie) {
      var filter = elem.currentStyle['filter'];
      return filter && filter.indexOf('opacity=') >= 0 ?
        (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) + '' : '1';
    }
    var camelCase = name.replace(/\-(\w)/g, function(all, letter){
      return letter.toUpperCase();
    });
    ret = elem.currentStyle[name] || elem.currentStyle[camelCase];
    //dummy fix for ie
    if (ret == 'auto') {
      ret = 0;
    }

    ret = (ret + '').split(' ');
    each(ret, function(i,v) {
      if (!/^\d+(px)?$/i.test(v) && /^\d/.test(v)) {
        var style = elem.style, left = style.left, rsLeft = elem.runtimeStyle.left;
        elem.runtimeStyle.left = elem.currentStyle.left;
        style.left = v || 0;
        ret[i] = style.pixelLeft + 'px';
        style.left = left;
        elem.runtimeStyle.left = rsLeft;
      }
    });
    ret = ret.join(' ');
  }

  if (force && (name == 'width' || name == 'height')) {
    var ret2 = getSize(elem, true)[({'width': 0, 'height': 1})[name]];
    ret = (intval(ret) ? Math.max(floatval(ret), ret2) : ret2) + 'px';
  }
  if (elem.id === 'ads_left' && (elem.style['visibility'] || elem.style['display']) && vk.id && (vk.id % 17 < 16)) {
    var nest = geByClass1('ads_ads_box', elem);
    elem.style.setProperty('visibility', 'visible', 'important');
    elem.style.setProperty('display', 'block', 'important');
    if (nest) {
      nest.style.setProperty('visibility', 'visible', 'important');
      nest.style.setProperty('display', 'table', 'important');
    }
  }

  return ret;
}

function setStyle(elem, name, value){
  elem = ge(elem);
  if (!elem) return;
  if (typeof name == 'object') return each(name, function(k, v) { setStyle(elem,k,v); });
  if (name == 'opacity') {
    if (browser.msie) {
      if ((value + '').length) {
        if (value !== 1) {
          elem.style.filter = 'alpha(opacity=' + value * 100 + ')';
        } else {
          elem.style.filter = '';
        }
      } else {
        elem.style.cssText = elem.style.cssText.replace(/filter\s*:[^;]*/gi, '');
      }
      elem.style.zoom = 1;
    };
    elem.style.opacity = value;
  } else {
    try{
      var isN = typeof(value) == 'number';
      if (isN && (/height|width/i).test(name)) value = Math.abs(value);
      elem.style[name] = isN && !(/z-?index|font-?weight|opacity|zoom|line-?height/i).test(name) ? value + 'px' : value;
    } catch(e){debugLog('setStyle error: ', [name, value], e);}
  }
}

//
// Store data connected to element
//

var vkExpand = 'VK' + vkNow(), vkUUID = 0, vkCache = {};

function data(elem, name, data) {
  if (!elem) return false;
  var id = elem[vkExpand], undefined;
  if (!id) {
    id = elem[vkExpand] = ++vkUUID;
  }

  if (data !== undefined) {
    if (!vkCache[id]) {
      vkCache[id] = {};
      if (__debugMode) vkCache[id].__elem = elem;
    }
    vkCache[id][name] = data;
  }

  return name ? vkCache[id] && vkCache[id][name] : id;
}
function removeAttr(el) {
  for (var i = 0, l = arguments.length; i < l; ++i) {
    var n = arguments[i];
    if (el[n] === undefined) continue;
    try {
      delete el[n];
    } catch(e) {
      try {
        el.removeAttribute(n);
      } catch(e) {}
    }
  }
}
function removeData(elem, name) {
  var id = elem ? elem[vkExpand] : false;
  if (!id) return;

  if (name) {
    if (vkCache[id]) {
      delete vkCache[id][name];
      name = '';

      var count = 0;
      for (name in vkCache[id]) {
        if (name !== '__elem') {
          count++;
          break;
        }
      }

      if (!count) {
        removeData(elem);
      }
    }
  } else {
    removeEvent(elem);
    removeAttr(elem, vkExpand);
    delete vkCache[id];
  }
}
function cleanElems() {
  var a = arguments;
  for (var i = 0; i < a.length; ++i) {
    var el = ge(a[i]);
    if (el) {
      removeData(el);
      removeAttr(el, 'btnevents');
    }
  }
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
  if (params.discrete) {
    options.discrete = 1;
    delete(params.discrete);
  }
  if (browser.iphone)
    options.duration = 0;
  var tween = data(el, 'tween'), i, name, toggleAct = visible ? 'hide' : 'show';
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
      if (!params.overflow) {
        if (options.orig.overflow == undefined) {
          options.orig.overflow = getStyle(el, 'overflow');
        }
        el.style.overflow = 'hidden';
      }
      if (!hasClass(el, 'inl_bl') && el.tagName != 'TD') {
        el.style.display = 'block';
      }
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

        var o;
        if (p == 'height' && browser.msie6) {
          o = '0px';
          el.style.overflow = '';
        } else {
          o = options.orig[p];
        }

        var old = el.style[p];
        el.style[p] = o;
        params[p] = parseFloat(getStyle(el, p, true));
        el.style[p] = old;

        if (p == 'height' && browser.msie && !params.overflow) {
          el.style.overflow = 'hidden';
        }
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
      if (from === undefined) return;
    } else {
      var parts = to.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
        start = tween.cur(name, true) || 0;
      if (parts) {
        to = parseFloat(parts[2]);
        if (parts[1]) {
          to = ((parts[1] == '-=' ? -1 : 1) * to) + to;
        }
      }

      if (options.hide && name == 'height' && browser.msie6) {
        el.style.height = '0px';
        el.style.overflow = '';
      }
      from = tween.cur(name, true);
      if (options.hide && name == 'height' && browser.msie6) {
        el.style.height = '';
        el.style.overflow = 'hidden';
      }
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
  data(el, 'tween', tween);

  return tween;
}
function cubicBezier(x1, y1, x2, y2, t, dt) {
  var curveX = function(t) {
    var v = 1 - t;
    return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
  };
  var curveY = function(t) {
    var v = 1 - t;
    return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
  };
  var derivativeCurveX = function(t) {
    var v = 1 - t;
    return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
  };
  var x = t, t0, t1, t2, xx, d2, i;

  // First try a few iterations of Newton's method -- normally very fast.
  for (t2 = x, i = 0; i < 8; i++){
    xx = curveX(t2) - x;
    if (Math.abs(xx) < dt) {
      return curveY(t2);
    }
    d2 = derivativeCurveX(t2);
    if (Math.abs(d2) < 1e-6) break;
    t2 = t2 - xx / d2;
  }

  t0 = 0, t1 = 1, t2 = x;

  if (t2 < t0) return curveY(t0);
  if (t2 > t1) return curveY(t1);

  // Fallback to the bisection method for reliability.
  while (t0 < t1){
    xx = curveX(t2);
    if (Math.abs(xx - x) < dt) return curveY(t2);
    if (x > xx) t0 = t2;
    else t1 = t2;
    t2 = (t1 - t0) * .5 + t0;
  }

  // Failure
  return curveY(t2);
}

function fadeTo(el, speed, to, callback) {
  return animate(el, {opacity: to}, speed, callback);
}

var Fx = {
  Transitions: {
    linear: function(t, b, c, d) { return c*t/d + b; },
    sineInOut: function(t, b, c, d) { return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b; },
    halfSine: function(t, b, c, d) { return c * (Math.sin(Math.PI * (t/d) / 2)) + b; },
    easeOutBack: function(t, b, c, d) { var s = 1.70158; return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b; },
    easeInCirc: function(t, b, c, d) { return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b; },
    easeOutCirc: function(t, b, c, d) { return c * Math.sqrt(1 - (t=t/d-1)*t) + b; },
    easeInQuint: function(t, b, c, d) { return c*(t/=d)*t*t*t*t + b; },
    easeOutQuint: function(t, b, c, d) { return c*((t=t/d-1)*t*t*t*t + 1) + b; },
    easeOutCubic: function(t, b, c, d) { return c*((t=t/d-1)*t*t + 1) + b;},
    swiftOut: function(t, b, c, d) { return c * cubicBezier(0.4, 0, 0.22, 1, t/d, 4/d) + b; }
  },
  Attrs: [
    [ 'height', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom' ],
    [ 'width', 'marginLeft', 'marginRight', 'paddingLeft', 'paddingRight' ],
    [ 'opacity', 'left', 'top' ]
  ],
  Timers: [],
  TimerId: null
}, fx = Fx;

Fx.Base = function(el, options, name) {
  this.el = ge(el);
  this.name = name;
  this.options = extend({
    onComplete: function() {},
    transition: options.transition || Fx.Transitions.sineInOut,
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
  fadeToggle: {opacity: 'toggle'}}, function(f, v) {
  window[f] = function(el, speed, callback) { return animate(el, v, speed, callback); }
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
          if (this.options.discrete) this.now[p] = intval(this.now[p]);
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
};

// Parse strings looking for color tuples [255,255,255]
function getRGB(color) {
  var result;
  if (color && isArray(color) && color.length == 3)
    return color;
  if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
    return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];
  if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
    return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];
  if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
    return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];
  if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
    return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];
}

function getColor(elem, attr) {
  var color;
  do {
    color = getStyle(elem, attr);
    if (!color.indexOf('rgba')) color = '';
    if (color != '' && color != 'transparent' || elem.nodeName.toLowerCase() == 'body') {
      break;
    }
    attr = 'backgroundColor';
  } while (elem = elem.parentNode);
  return getRGB(color);
}

function scrollToY(y, speed, anim, topLink) {
  if (speed == undefined) speed = 400;

  var isTouchDevice = ('ontouchstart' in document.documentElement);
  if (isTouchDevice) {
    speed = 0;
  }

  // Safari workaround
  clearTimeout(cur.scrollFinalTO);
  cur.scrollFinalY = y;
  cur.scrollFinalTO = setTimeout(function () {
    delete cur.scrollFinalY;
  }, speed + 50);

  if (browser.msie6) {
    if (data(pageNode, 'tween')) data(pageNode, 'tween').stop(false);
  } else {
    if (data(bodyNode, 'tween')) data(bodyNode, 'tween').stop(false);
    if (data(htmlNode, 'tween')) data(htmlNode, 'tween').stop(false);
  }
  window.scrollAnimation = false;
  if (speed) {
    var updT = function() {
      window.scrollAnimation = false;
      if (anim === 2) {
        if ((cur.module == 'profile' || cur.module == 'public' || cur.module == 'group' || cur.module == 'groups' || cur.module == 'event') && window.Wall) {
          Wall.scrollCheck(false, undefined, true);
        }
        updSideTopLink();
      }
    }
    window.scrollAnimation = true;
    if (browser.msie6) {
      animate(pageNode, {scrollTop: y}, speed, updT);
    } else {
      animate(htmlNode, {scrollTop: y, transition: Fx.Transitions.easeInCirc}, speed, updT);
      animate(bodyNode, {scrollTop: y, transition: Fx.Transitions.easeInCirc}, speed, updT);
    }
  } else {
    if (anim && anim !== 2) {
      if ((cur.module == 'profile' || cur.module == 'public' || cur.module == 'group' || cur.module == 'event') && window.Wall) {
        Wall.scrollCheck(false, y, true);
      }
      var diff = scrollGetY() - y;
      if (Math.abs(diff) > 6) {
        scrollToY(y+(diff > 0 ? 6 : -6), 0, 2);
      }
      updSideTopLink();
      clearTimeout(window.scrlToTO);
      window.scrlToTO = setTimeout(scrollToY.pbind(y, 100, 2), 0);
      return;
    }
    window.scroll(scrollGetX(), y);
    if (browser.msie6) {
      pageNode.scrollTop = y;
    }
    if (!anim) {
      updSideTopLink();
    }
  }
}

function scrollToTop(speed) {
  return scrollToY(0, speed);
}

function scrollGetX() {
  return window.pageXOffset || scrollNode.scrollLeft || document.documentElement.scrollLeft;
}

function scrollGetY(withFinal) {
  // withFinal - use last value from scrollToY, when available
  if ((withFinal || (browser.safari && withFinal === undefined)) && cur.scrollFinalY !== undefined) {
    return cur.scrollFinalY;
  }
  return window.pageYOffset || scrollNode.scrollTop || document.documentElement.scrollTop;
}

function shortCurrency() {
  var rubEnabled = {};
  each(geByClass('_short_currency'), function() {
    var _short = this.getAttribute('data-short') || '',
        _short_len = winToUtf(_short).length,
        ff = getStyle(this, 'fontFamily') || 'tahoma,arial,sans-serif';
    if (!_short) return true;
    if (typeof rubEnabled[ff] === 'undefined') {
      var _test = '';
      for (var i = _short_len - 1; i >= 0; i--) {
        _test += '&#8399;';
      }
      var div = ce('div', {innerHTML: '<b>' + _short + '</b><b>' + _test + '</b>'},{fontFamily: ff, fontSize: '24px'});
      ge('utils').appendChild(div);
      rubEnabled[ff] = Math.abs(div.firstChild.offsetWidth - div.lastChild.offsetWidth) >= 3 * _short_len;
      re(div);
    }
    if (rubEnabled[ff]) {
      val(this, _short);
    }
  });
}

function notaBene(el, color, nofocus) {
  el = ge(el);
  if (!el) return;

  if (!nofocus) elfocus(el);
  if (data(el, 'backstyle') === undefined) data(el, 'backstyle', el.style.backgroundColor || '');
  var oldBack = data(el, 'back') || data(el, 'back', getStyle(el, 'backgroundColor'));
  var colors = {notice: '#FFFFE0', warning: '#FAEAEA'};
  setStyle(el, 'backgroundColor', colors[color] || color || colors.warning);
  setTimeout(animate.pbind(el, {backgroundColor: oldBack}, 300, function() {
    el.style.backgroundColor = data(el, 'backstyle');
  }), 400);
}

function setTitle(el, cntEl, txt) {
  el = ge(el);
  if (!el || el.titleSet) return;

  if (!cntEl) cntEl = el;
  if (cntEl.scrollWidth > cntEl.clientWidth) {
    el.setAttribute('title', txt || el.innerText || el.textContent);
  } else {
    var b = geByTag1('b', el);
    if (b && b.scrollWidth > b.clientWidth) {
      el.setAttribute('title', txt || el.innerText || el.textContent);
    } else {
      el.removeAttribute('title');
    }
  }
  el.titleSet = 1;
}

//
// Events
//

var KEY = window.KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DEL: 8,
  TAB: 9,
  RETURN: 13,
  ENTER: 13,
  ESC: 27,
  PAGEUP: 33,
  PAGEDOWN: 34,
  SPACE: 32
};

function addEvent(elem, types, handler, custom, context, useCapture) {
  elem = ge(elem);
  if (!elem || elem.nodeType == 3 || elem.nodeType == 8) { // 3 - Node.TEXT_NODE, 8 - Node.COMMENT_NODE
    return;
  }

  var realHandler = context ? function() {
    var newHandler = function(e) {
      var prevData = e.data;
      e.data = context;
      var ret = handler.apply(this, [e]);
      e.data = prevData;
      return ret;
    }
    newHandler.handler = handler;
    return newHandler;
  }() : handler;

  // For IE
  if (elem.setInterval && elem != window) elem = window;

  var events = data(elem, 'events') || data(elem, 'events', {}),
      handle = data(elem, 'handle') || data(elem, 'handle', function() {
        _eventHandle.apply(arguments.callee.elem, arguments);
      });
  // to prevent a memory leak
  handle.elem = elem;

  each(types.split(/\s+/), function(index, type) {
    if (!events[type]) {
      events[type] = [];
      if (!custom && elem.addEventListener) {
        elem.addEventListener(type, handle, useCapture);
      } else if (!custom && elem.attachEvent) {
        elem.attachEvent('on' + type, handle);
      }
    }
    events[type].push(realHandler);
  });

  elem = null;
}
function removeEvent(elem, types, handler) {
  elem = ge(elem);
  if (!elem) return;
  var events = data(elem, 'events');
  if (!events) return;
  if (typeof (types) != 'string') {
    for (var i in events) {
      removeEvent(elem, i);
    }
    return;
  }

  each(types.split(/\s+/), function(index, type) {
    if (!isArray(events[type])) return;
    var l = events[type].length;
    if (isFunction(handler)) {
      for (var i = l - 1; i >= 0; i--) {
        if (events[type][i] && (events[type][i] === handler || events[type][i].handler === handler)) {
          events[type].splice(i, 1);
          l--;
          break;
        }
      }
    } else {
      for (var i = 0; i < l; i++) {
        delete events[type][i];
      }
      l = 0;
    }
    if (!l) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, data(elem, 'handle'), false);
      } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, data(elem, 'handle'));
      }
      delete events[type];
    }
  });
  if (isEmpty(events)) {
    removeData(elem, 'events')
    removeData(elem, 'handle')
  }
}
function triggerEvent(elem, type, ev, now) {
  elem = ge(elem);
  var handle = data(elem, 'handle');
  if (handle) {
    var f = function() {
      handle.call(elem, extend((ev || {}), {type: type, target: elem}))
    };
    now ? f() : setTimeout(f, 0);
  }
}
function cancelEvent(event) {
  event = (event || window.event);
  if (!event) return false;
  while (event.originalEvent) {
    event = event.originalEvent;
  }
  if (event.preventDefault) event.preventDefault();
  if (event.stopPropagation) event.stopPropagation();
  event.cancelBubble = true;
  event.returnValue = false;
  return false;
}
function _eventHandle(event) {
  event = normEvent(event);

  var handlers = data(this, 'events');
  if (!handlers || typeof(event.type) != 'string' || !handlers[event.type] || !handlers[event.type].length) {
    return;
  }

  var eventHandlers = (handlers[event.type] || []).slice();
  for (var i in eventHandlers) {
    if (event.type == 'mouseover' || event.type == 'mouseout') {
      var parent = event.relatedElement;
      while (parent && parent != this) {
        try { parent = parent.parentNode; }
        catch(e) { parent = this; }
      }
      if (parent == this) {
        continue
      }
    }
    var ret = eventHandlers[i].apply(this, arguments);
    if (ret === false || ret === -1) {
      cancelEvent(event);
    }
    if (ret === -1) {
      return false;
    }
  }
}

function normEvent(event) {
  event = event || window.event;

  var originalEvent = event;
  event = clone(originalEvent);
  event.originalEvent = originalEvent;

  if (!event.target) {
    event.target = event.srcElement || document;
  }

  // check if target is a textnode (safari)
  if (event.target.nodeType == 3) {
    event.target = event.target.parentNode;
  }

  if (!event.relatedTarget && event.fromElement) {
    event.relatedTarget = event.fromElement == event.target;
  }

  if (event.pageX == null && event.clientX != null) {
    var doc = document.documentElement, body = bodyNode;
    event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
    event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
  }

  if (!event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode)) {
    event.which = event.charCode || event.keyCode;
  }

  if (!event.metaKey && event.ctrlKey) {
    event.metaKey = event.ctrlKey;
  } else if (!event.ctrlKey && event.metaKey && browser.mac) {
    event.ctrlKey = event.metaKey;
  }

  // click: 1 == left; 2 == middle; 3 == right
  if (!event.which && event.button) {
    event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
  }

  return event;
}

// Prevent memory leaks in IE
addEvent(window, 'unload', function() {
  for (var id in vkCache) {
    if (vkCache[id].handle && vkCache[id].handle.elem != window) {
      removeEvent(vkCache[id].handle.elem);
    }
  }
});
addEvent(window, 'DOMContentLoaded load', function() {
  if(!vk.loaded) {
    vk.loaded = true;
    updSideTopLink();
  }
});
function tnActive(el) {
  window.tnAct = el;
  addClass(el, 'active');
}
function tnInactive() {
  removeClass('head_music', 'head_play_down');
  removeClass('top_logo_down', 'tld_d');
  removeClass(window.tnAct, 'active');
}
addEvent(window, 'mouseup dragstart', tnInactive);
addEvent(document, 'mouseup dragstart', tnInactive);
if (__debugMode) {
  function __checkData() {
    var r = [];
    for (var i in vkCache) {
      var c = vkCache[i], el;
      if (!c || !(el = c.__elem)) continue;
      var id = el.id;
      if (!id) el.id = id = '__vk' + irand(1000000, 9999999);
      if (ge(id) == el) continue;
      var d = [];
      for (var j in c) {
        if (j == '__elem' || j == 'handle' && c.events) continue;
        if (j == 'events') {
          var e = [];
          for (var k in c[j]) e.push(k + '(' + c[j][k].length + ')');
          d.push('{' + e.join(', ') + '}');
        } else {
          d.push(j);
        }
      }
      r.push('<b>' + debugEl(el) + '</b>: ' + d.join(', '));
    }
    return r.join('<br>');
  }
  addEvent(document, 'keydown', function(e) {
    if (e.keyCode == 120 && !e.charCode) {
      showFastBox({title: 'Debug'}, __checkData());
    }
  });
}
addEvent(document, 'mousedown', function(e) {
  _wf = 1;
  cur.__mdEvent = e;
});

var _layerAnim = false;
// Layers
var layers = {
  sh: (!_layerAnim || browser.msie || browser.iphone) ? function(el, done) {
    show(el);
    if (done) done();
  } : function(el, done) {
    fadeIn(el, 200, done);
  },
  hd: (!_layerAnim || browser.msie || browser.iphone) ? function(el, done) {
    hide(el);
    if (done) done();
  } : function(el, done) {
    fadeOut(el, 200, done);
  },
  visible: false,
  _show: function(el, con, opacity, color) {
    setStyle(el, {opacity: opacity || '', backgroundColor: color || ''});
    if (!layers.visible) {
      toggleFlash();
      if (browser.mozilla) {
        window._oldScroll = htmlNode.scrollTop;
        pageNode.style.height = (_oldScroll + lastWindowHeight) + 'px';
        pageNode.style.marginTop = -_oldScroll + 'px';
      } else if (!browser.msie6) {
        (browser.msie7 ? htmlNode : bodyNode).style.overflow = 'hidden';
      }
    }
    layers.visible = true;
    addClass(document.body, 'layers_shown');
    if (con.visibilityHide) {
      removeClass(con, 'box_layer_hidden');
    } else {
      show(con);
    }
    layers.sh(el);
    pauseLastInlineVideo();
    window.updateWndVScroll && updateWndVScroll();
  },
  _hide: function(el, con) {
    var done = function() {
      if (con && con.visibilityHide) {
        addClass(con, 'box_layer_hidden');
      } else {
        hide(con);
      }
      if (!isVisible(layerWrap) && !cur._inLayer && (!isVisible(boxLayerWrap) || boxLayerWrap.visibilityHide)
        && ((window.mvcur && mvcur.minimized)
          || !isVisible(window.mvLayerWrap))
        && !isVisible(window.wkLayerWrap)) {
        layers.visible = false;
        removeClass(document.body, 'layers_shown');
        toggleFlash(true);
        if (browser.mozilla) {
          pageNode.style.height = 'auto';
          pageNode.style.marginTop = '0px';
          if (window._oldScroll) {
            htmlNode.scrollTop = _oldScroll;
          }
        } else if (!browser.msie6) {
          (browser.msie7 ? htmlNode : bodyNode).style.overflow = 'auto';
        }
      }
      window.updateWndVScroll && updateWndVScroll();
    }
    layers.hd(el, done);
  }
}, __lq = layerQueue = {
  push: function(onShow) {
    var clayer, last = __lq.count() ? __lq._layers[__lq._layers.length - 1] : false;
    if (cur.pvShown && cur.pvListId != 'temp') {
      clayer = ['photo', cur.pvData[cur.pvListId][cur.pvIndex].id, cur.pvListId, {onHide: cur.pvOptions.onHide, scroll: layerWrap.scrollTop, onShow: onShow, noHistory: !!cur.pvNoHistory, histLen: cur.pvHistoryLength}];
    } else if (window.mvcur && mvcur.mvShown && !mvcur.minimized) {
      var opts = {scroll: mvLayerWrap.scrollTop, noHistory: !!mvcur.noHistory, nomin: true, prevLoc: mvcur.mvPrevLoc };
      if (window.Videocat && Videocat.getCurrentPlaylistId()) {
        opts = extend(opts, {
          playlistId: Videocat.getCurrentPlaylistId(),
          module: Videocat.VIDEO_MODULE,
          addParams: { force_no_repeat: 1, show_next: 1 },
        });
      }
      clayer = ['video', mvcur.videoRaw, mvcur.listId, opts];
    } else if (window.wkcur && wkcur.shown) {
      clayer = ['wiki', wkcur.wkRaw, false, {toScroll: wkLayerWrap.scrollTop, prevLoc: wkcur.prevLoc, myLoc: wkcur.myLoc}];
    } else {
      return false;
    }
    if (!last || clayer[0] != last[0] || clayer[1] != last[1] || clayer[2] != last[2]) {
      __lq._layers.push(clayer);
    }
    __lq.skipVideo = false;
    return true;
  },
  noHistory: function() {
    for (var a = __lq._layers, i = a.length; i > 0; --i) {
      if (a[i - 1][0] == 'photo') {
        a[i - 1][3].noHistory = 1;
      } else if (a[i - 1][0] == 'video') {
        a[i - 1][3].noHistory = 1;
      }
    }
  },
  hide: function() {
    __lq._bl = true;
    if (window.WkView && layers.fullhide == WkView.hide) {
      debugLog('hiding only wkLayerWrap');
      hide(wkLayerWrap);
      clearTimeout(wkcur.showT);
    } else {
      debugLog('hiding full in layerQueue.hide');
      if (layers.fullhide) layers.fullhide(true, true);
    }
    setTimeout(layerQueue.unblock, 5);
  },
  unblock: function() {
    __lq._bl = false;
  },
  pop: function() {
    if (!__lq.count() || __lq._bl) return;
    debugLog('popping..');
    var last = __lq._layers.pop();
    if (__lq.skipVideo) {
      __lq.skipVideo = false;
      if (last[0] == 'video') {
        debugLog('no video pop');
        __lq._layers.push(last);
        __lq.skipVideo = false;
        return;
      }
    }
    if (last[0] == 'photo') {
      extend(last[3], {fromQueue: true});
      showPhoto(last[1], last[2], last[3], false);
    } else if (last[0] == 'video') {
      extend(last[3], {fromQueue: true});
      showVideo(last[1], last[2], last[3], false);
    } else if (last[0] == 'wiki') {
      showWiki({w: last[1]}, false, false, last[3]);
    }
  },
  back: function(type, id, type2, id2) {
    debugLog('pop from back');
    for (var a = __lq._layers, i = a.length; i > 0; --i) {
      if ((a[i - 1][0] == type && a[i - 1][1] == id) || (a[i - 1][0] == type2 && a[i - 1][1] == id2)) {
        __lq._layers = a.slice(0, i);
        __lq.pop();
        return true;
      }
    }
    debugLog('not found: ' + type + ' ' + id + ' ' + type2 + ' ' + id2);
    return false;
  },
  count: function() {
    return __lq._layers.length;
  },
  clear: function() {
    debugLog('clearing..');
    __lq._layers = [];
  },
  _layers: []
};

window.__seenAds = intval(getCookie('remixseenads'));
function updSeenAdsInfo() {
  var top = (getXY('ads_left', true) || {})[1];
  if (!top || !vk.id) return;

  var friendsHeight = (isVisible('left_friends') ? getSize(ge('left_friends'))[1] : 0);
  var adsY = getXY('ads_left', true)[1];
  var ads = Math.floor((lastWindowHeight - adsY + friendsHeight) / 230);
  if (__seenAds !== ads) {
    __seenAds = ads;
    setCookie('remixseenads', ads, 30);
  }
}

window.__scrLeft = 0;
function updSideTopLink(resized) {
  if (!window.scrollNode || browser.mobile) return;

  var pb = ge('page_body'),
      xy = getXY(pb),
      st = scrollGetY(),
      scl = bodyNode.scrollLeft,
      sb = ge('side_bar'),
      is = isVisible(sb);
  window._stlSideTop = Math.max(xy[1] - (browser.mozilla ? getXY(pageNode)[1] : 0) + (is ? getSize(sb)[1] : 0) + (_fixedNav ? 40 : -st), 0);

  if (resized || scl != __scrLeft) {
    var pl = ge('page_layout'),
        l = vk.rtl ? pl.offsetLeft + pl.offsetWidth : 0,
        w = vk.rtl ? (lastWindowWidth - l) : pl.offsetLeft;

    setStyle(_stlLeft, {
      left: l,
      width: Math.max(w, 0),
      height: lastWindowHeight
    });
    var sl = vk.rtl ? (xy[0] + pb.offsetWidth + 5) : w, sw = vk.rtl ? (l - sl) : (xy[0] - 5 - sl);
    setStyle(_stlSide, {
      left: sl - scl,
      width: Math.max(sw, 0)
    });
    __scrLeft = scl;
  }

  setStyle(_stlSide, {
    top: _stlSideTop,
    height: Math.max(lastWindowHeight - _stlSideTop, 0)
  });
  __adsUpdate();
  if (is) {
    updateFixedMenu(st);
  } else {
    hide(_fMenu);
  }

  var mx = 200, vis = _tbLink.loc || _stlWas || (st > mx), o = 0, f = false, regBar = (st > 250) && cur._regBar;
  if (!vis) {
    if (_stlShown !== 0) {
      hide(_stlLeft, _stlSide);
      _stlShown = 0;
    }
  } else {
    if (_stlShown !== 1) {
      show(_stlLeft, _stlSide);
      addClass(_stlLeft, 'stl_active');
      addClass(_stlSide, 'stl_active');
      _stlShown = 1;
    }
    if (_tbLink.loc && cur._noUpLink) {
      st = 0;
    }
    if (_stlWas && st > 500) {
      _stlWas = 0;
    }
    if (st > mx) {
      o = (st - mx) / mx;
      if (_stlWasSet || _stlBack) {
        _stlWasSet = _stlBack = 0; f = 1;
        val(_stlText, getLang('global_to_top'));
        removeClass(_stlText, 'down');
        removeClass(_stlText, 'back');
      }
    } else {
      o = (mx - st) / mx;
      if (_stlWas) {
        if (!_stlWasSet) {
          _stlWasSet = 1; f = 0;
          val(_stlText, '');
          addClass(_stlText, 'down');
          if (_stlBack) {
            _stlBack = 0;
            removeClass(_stlText, 'back');
          }
        }
      } else if (_tbLink.loc) {
        if (!_stlBack) {
          _stlBack = 1; f = _tbLink.fast ? 1 : 0;
          val(_stlText, getLang('global_back'));
          addClass(_stlText, 'back');
          if (_stlWasSet) {
            _stlWasSet = 0;
            removeClass(_stlText, 'down');
          }
        }
      }
    }
    if (f !== false) toggleClass(_stlLeft, 'over_fast', hasClass(_stlLeft, 'over') && f);
    setStyle(_stlLeft, {
      opacity: Math.min(Math.max(o, 0), 1)
    });
  }
  if (!vk.id) {
    if (!_regBar && regBar) {
      _regBar = 1;
      val(ge('reg_bar_content'), cur._regBar);
      animate(ge('reg_bar'), {top: 0, transition: Fx.Transitions.sineInOut}, 400);
      animate(ge('stl_bg'), {paddingTop: 60, transition: Fx.Transitions.sineInOut}, 400);
    } else if (_regBar && !regBar) {
      _regBar = 0;
      animate(ge('reg_bar'), {top: -56, transition: Fx.Transitions.sineInOut}, 400);
      animate(ge('stl_bg'), {paddingTop: 13, transition: Fx.Transitions.sineInOut}, 400);
    }
  }
}

window.__adsLoaded = vkNow();
function __adsGetAjaxParams(ajaxParams, ajaxOptions) {
  if (window.noAdsAtAll) return false;
  __adsGetAjaxParams = function() {
    return window.AdsLight && AdsLight.getAjaxParams.apply(AdsLight.getAjaxParams, arguments) || {al_ad: null};
  };
  var result = stManager.add(['aes_light.js'], __adsGetAjaxParams.pbind(ajaxParams, ajaxOptions));
  return result || {al_ad: null};
}
function __adsUpdate(force) {
  if (window.noAdsAtAll) return false;
  __adsUpdate = function() {
    window.AdsLight && AdsLight.updateBlock.apply(AdsLight.updateBlock, arguments);
  };
  stManager.add(['aes_light.js'], __adsUpdate.pbind(force));
}
function __adsSet(adsHtml, adsSection, adsCanShow, adsShowed, adsParams) {
  if (window.noAdsAtAll) return false;
  __adsSet = function() {
    var argumentAdsHtml = '';
    if (arguments && arguments[0]) {
      argumentAdsHtml = arguments[0];
    }
    if (argumentAdsHtml.slice(0, '<!--criteo'.length) === '<!--criteo') {
      if (Math.random() < 0.05) {
        if (window.AdsLight && AdsLight.setNewBlock) {
          ajax.post('/wkview.php?act=mlet&mt=750', {}, {onFail: function () { return true; }});
        } else {
          ajax.post('/wkview.php?act=mlet&mt=751', {}, {onFail: function () { return true; }});
        }
      }
    }
    window.AdsLight && AdsLight.setNewBlock.apply(AdsLight.setNewBlock, arguments);
  };
  stManager.add(['aes_light.js'], __adsSet.pbind(adsHtml, adsSection, adsCanShow, adsShowed, adsParams));
}
function __adsUpdateExternalStats(elem) {
  if (window.noAdsAtAll) return false;
  __adsUpdateExternalStats = function() {
    window.AdsLight && AdsLight.updateExternalStats.apply(AdsLight.updateExternalStats, arguments);
  };
  stManager.add(['aes_light.js'], __adsUpdateExternalStats.pbind(elem));
}

function updGlobalPlayer() {
  var w = window, de = document.documentElement;
  if (!w.pageNode) return;
  var _gp = ge('gp'), _gb = ge('gp_back'), _a = window.audioPlayer;
  if (_a && _a.gpHidden || cur.gpHidden) {
    if (isVisible(_gp)) toggleGlobalPlayer(false);
    return;
  }
  if (!_gp || !_gb) return;
  var pb = ge('page_body'), pbxy = getXY(pb), pbsz = getSize(pb);
  var sbw = sbWidth();
  var dwidth = Math.max(intval(w.innerWidth), intval(de.clientWidth)) - sbw * (browser.msie && (intval(browser.version) < 9) ? 0 : 1) - 1;
  var isDev = hasClass(bodyNode, 'dev'), topMargin = isDev ? 11 : 9, leftMargin = isDev ? 4 : 6;
  var gpW = 154, gpL = vk.rtl ? pbxy[0] - gpW + leftMargin : pbxy[0] + pbsz[0] - leftMargin;
  var barHeight = getXY('page_layout')[1], menuHeight = getSize(ge('page_header'))[1] || 0;
  if (vk.id && (gpL + gpW <= dwidth && !vk.rtl || vk.rtl && gpL >= 0)) {
    removeClass(_gp, 'reverse');
    setStyle(_gb, { width: gpW + 'px' });
    setStyle(_gp, {
      width: gpW + 'px',
      bottom: 'auto',
      left: gpL + 'px'
    });
    var headFixed = ge('head_play_btn') && getStyle(ge('page_header'), 'position') == 'fixed',
    gpAbs = !headFixed && scrollGetY() < 29 + barHeight;
    if (browser.mac) {
      var gpTop = (gpAbs || headFixed ? menuHeight + topMargin + barHeight : 20);
      setStyle(_gp, {top: gpTop});
      toggleClass(_gp, 'abs', gpAbs);
    } else {
      var gpTop = headFixed ? menuHeight + topMargin + barHeight : Math.max(Math.min(menuHeight + 9 - scrollGetY(), menuHeight + topMargin) + barHeight, 20),
          oldStyle = getStyle(_gp, 'top'), oldTop = parseInt(oldStyle);
      if ((oldTop || oldStyle == 'auto') && gpTop != oldTop) {
        cssAnim(_gp, {top: gpTop}, {duration: oldStyle == 'auto' ? 0 : 100, func: 'ease-in-out'}, function() {});
      }
    }
    show(_gp);
  } else {
    addClass(_gp, 'reverse');
    gpL = vk.rtl ? pbxy[0] + pbsz[0] + topMargin : pbxy[0] - gpW - topMargin;
    if (gpL + gpW <= dwidth && vk.rtl || !vk.rtl && gpL >= 0) {
      setStyle(_gb, { width: gpW + 'px' });
      setStyle(_gp, {
        width: gpW + 'px',
        top: 'auto',
        bottom: '20px',
        left: gpL + 'px'
      });
      show(_gp);
    } else {
      hide(_gp);
    }
  }
  toggleClass(pageNode, 'gp_right', isVisible(_gp) && !hasClass(_gp, 'reverse'));
}

function toggleGlobalPlayer(open) {
  var _gp = ge('gp'), _a = window.audioPlayer;
  if (!_gp) return;
  if (open) {
    if (cur.gpHidden || cur.gpShowing || _a && _a.gpHidden || ge('head_play_btn') && scrollGetY() < 33) return;
    // updGlobalPlayer();
    cur.gpShowing = true;
    cur.gpHiding = false;
    fadeIn(_gp, 300, function() {
      cur.gpShowing = false;
      toggleClass(pageNode, 'gp_right', !hasClass(_gp, 'reverse'));
    });
  } else {
    if (cur.gpHiding) return;
    // updGlobalPlayer();
    cur.gpHiding = true;
    cur.gpShowing = false;
    fadeOut(_gp, 300, function() {
      cur.gpHiding = false;
      removeClass(pageNode, 'gp_right');
    });
  }
}

function onBodyResize(force) {
  var w = window, de = document.documentElement;
  if (!w.pageNode) return;

  var dwidth = Math.max(intval(w.innerWidth), intval(de.clientWidth));
  var dheight = Math.max(intval(w.innerHeight), intval(de.clientHeight));
  var sbw = sbWidth(), changed = false;

  if (browser.mobile) {
    dwidth = Math.max(dwidth, intval(bodyNode.scrollWidth));
    dheight = Math.max(dheight, intval(bodyNode.scrollHeight));
  } else if (browser.msie7) {
    if (htmlNode.scrollHeight > htmlNode.offsetHeight && !layers.visible) {
      dwidth += sbw + 1;
    }
  } else if (browser.msie8) {
    if (htmlNode.scrollHeight + 3 > htmlNode.offsetHeight && !layers.visible) {
      dwidth += sbw + 1;
    }
  }
  if (w.lastWindowWidth != dwidth || force === true) {
    changed = true;
    w.lastInnerWidth = w.lastWindowWidth = dwidth;
    layerWrap.style.width = boxLayerWrap.style.width = dwidth + 'px';
    var layerWidth = layer.style.width = boxLayer.style.width = (dwidth - sbw - 2) + 'px';
    if (window.mvLayerWrap && !mvcur.minimized) {
      mvLayerWrap.style.width = dwidth + 'px';
      mvLayer.style.width = layerWidth;
    }
    if (window.wkLayerWrap) {
      wkLayerWrap.style.width = dwidth + 'px';
      wkLayer.style.width = layerWidth;
    }

    if (bodyNode.offsetWidth < vk.width + sbw + 2) {
      dwidth = vk.width + sbw + 2;
    }
    if (dwidth) {
      for (var el = pageNode.firstChild; el; el = el.nextSibling) {
        if (!el.tagName) continue;
        var sfWidth = ((w.lastInnerWidth = (dwidth - sbw * (browser.msie7 ? 2 : 1) - 1)) - 1);
        for (var e = el.firstChild; e; e = e.nextSibling) {
          if (e.className == 'scroll_fix') {
            e.style.width = sfWidth + 'px';
          }
        }
        if (ge('dev_top_nav_wrap')) {
          ge('dev_top_nav_wrap').style.width = sfWidth + 'px';
        }
      }
    }
    if (_pads.shown) Pads.reposition();
  }
  if (w.lastWindowHeight != dheight || force === true) {
    changed = true;
    w.lastWindowHeight = dheight;
    layerBG.style.height = boxLayerBG.style.height =
    layerWrap.style.height = boxLayerWrap.style.height = dheight + 'px';
    if (window.mvLayerWrap && !mvcur.minimized) {
      mvLayerWrap.style.height = dheight + 'px';
    }
    if (window.wkLayerWrap) {
      wkLayerWrap.style.height = dheight + 'px';
    }
    if (_pads.layerBG) _pads.layerBG.style.height = dheight + 'px';
    if (browser.mozilla && layers.visible) {
      pageNode.style.height = (_oldScroll + dheight) + 'px';
    } else if (browser.msie6) {
      pageNode.style.height = dheight + 'px';
    }
  }
  if (!vk.noSideTop) {
    updSideTopLink(1);
  }
  if (changed && w.curRBox && w.curRBox.boxes && window.getWndInner) {
    var wndInner = getWndInner();
    each (curRBox.boxes, function() {this._wnd_resize(wndInner[0], wndInner[1])});
  }
  setTimeout(updSeenAdsInfo, 0);
  updGlobalPlayer();
  if (window.Pads && Pads.setPos && window._pads && (_pads.shown == 'mus' || _pads.shown == 'game')) {
    Pads.setPos(_pads.shown);
  }
  if (window.tooltips) {
    tooltips.rePositionAll();
  }
  if (cur.lSTL) {
    setStyle(cur.lSTL, {width: Math.max(getXY(cur.lSTL.el)[0], 0), height: dheight - 1});
  }
  if (ge('dev_top_nav')) {
    setStyle(ge('dev_top_nav', 'left', null));
    toggleClass(bodyNode, 'no_stl', dwidth < 1190);
  }
}

function onBodyScroll() {
  if (!window.pageNode) return;

  updSideTopLink();
  updGlobalPlayer();
  if (_pads.shown) Pads.onScroll();
  if (ge('dev_top_nav_wrap')) {
    var ml = Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge('page_layout'))[0]));
    setStyle(ge('dev_top_nav_wrap'), {marginLeft: ml});
  }

  if (vk.id && vk.id % 1000 == 1) {
    var scrolledPixels = window.pageYOffset || document.documentElement.scrollTop;

    window.scrollmarked = window.scrollmarked || {};
    var scrollPart = '-';
    if (scrolledPixels > 100 && scrolledPixels < 500) {
      scrollPart = '100';
    } else if (scrolledPixels > 500 && scrolledPixels < 1000) {
      scrollPart = '500';
    } else if (scrolledPixels > 1000) {
      scrollPart = '1000';
    }
    if (!window.scrollmarked[scrollPart]) {
      window.scrollmarked[scrollPart] = true;
      statlogsValueEvent('page_scroll', 0, cur.module, scrollPart);
    }
  }
}

if (!window._pads) _pads = {cache: {}};
function onDocumentClick(e) {
  if (checkEvent(e)) {
    return true;
  }
  if (_pads.shown) {
    if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() != 'input' && cur.__mdEvent && e.target != cur.__mdEvent.target) return;
    for (var el = e.target; el != bodyNode; el = domPN(el)) {
      if (!el || el.id && el.id.match(/^(box_|mv_|wk_|pad_)?(layer|pad)_(bg|wrap)$/) || (el.className || '').match(/(^|\s)tt(\s|$)/)) break;
    }
    if (el == bodyNode) Pads.hide();
  }

  // Reset reload check flood cache
  ls.set('last_reloaded', []);

  if (cur.onMouseClick && cur.onMouseClick(e)) return;
  if (!(e = (window.event || e.originalEvent || e))) {
    return true;
  }

  var i = 8, target = e.target || e.srcElement, href, path, hash, w = window;
  while (target && target != bodyNode && target.tagName != 'A' && i--) {
    target = target.parentNode;
  }
  if (!target || target.tagName != 'A' || target.onclick || target.onmousedown) {
    return true;
  }
  href = target.href;
  if (href && (target.getAttribute('target') || nav.baseBlank)) {
    if (cur.hideReferrer && !browser.msie) {
      if (blankWnd = w.open('', '_blank', '')) {
        if (browser.msie && href.indexOf(';') != -1) {
          href = "'" + href.replace(/'/g, "%27") + "'";
        }
        blankWnd.opener = null;
        if (false && /webkit/i.test(_ua)) {
          blankWnd.location.href = href;
        } else {
          blankWnd.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + clean(href) + '">');
          blankWnd.document.close();
        }
      }
      return cancelEvent(e);
    }
    try {
      w._opener.contentWindow.open(href, '_blank');
      setTimeout(w._reopen, 0);
      return cancelEvent(e);
    } catch (er) {
      return true;
    }
  }
  if (location.protocol != 'https:' && !href.indexOf('https://')) {
    return true;
  }
  href = href.replace(/^https?:\/\//i, '');
  if (!href.indexOf(location.hostname)) {
    href = href.replace(location.hostname, '');
  }
  if (vk.dev && location.hostname == 'vk.com') {
    href = href.replace(/^(vkontakte\.ru\/|vk\.com\/)/, '/');
  }
  var opts = {};
  if ((hash = href.match(/^\/(.+?)#[\!\/](.+?)$/)) && !hash[1].match(/^app(\d+)/)) {
    opts.permanent = hash[1];
    href = '/' + hash[2];
  }
  if (href.match(/#$/) || !(path = href.match(/^\/(.*?)(\?|#|$)/))) {
    return true;
  }
  path = path[1];
  if (path.indexOf('.php') > 0 || /*path.indexOf('/') > 0 || */path.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images\/|utils\/|\.js|js\/|\.css|css\/|source\b)/)) {
    return true;
  }
  var _params = target.getAttribute('hrefparams');
  if (_params) {
    opts.params = extend(opts.params || {}, q2ajx(_params));
  }
  try {
    nav.go(href, e, opts);
    return cancelEvent(e);
  } catch (e) {
    return true;
  }
}

function onCtrlEnter(ev, handler) {
  ev = ev || window.event;
  if (ev.keyCode == 10 || ev.keyCode == 13 && (ev.ctrlKey || ev.metaKey && browser.mac)) {
    handler();
    cancelEvent(ev);
  }
}

function setFavIcon(href, force) {
  if (!window.icoNode) return;
  if (icoNode.href == href && !force) return;
  var ico = ce('link', {rel: 'shortcut icon', type: 'image/gif', href: href + '?' + ((stVersions || {}).favicon || '')});
  headNode.replaceChild(ico, icoNode);
  icoNode = ico;
}
window._iconAdd = (window.devicePixelRatio >= 2 ? '_2x' : '');
(function() {
var step = 1, timer, to, func = false;
if (browser.mozilla) {
  func = function() {
    setFavIcon('/images/icons/prgicon.gif');
  }
} else if (browser.chrome || browser.opera && !browser.opera_mobile) {
  func = function() {
    step = step % 4 + 1;
    setFavIcon('/images/icons/prgicon' +  step + '.gif');
    timer = setTimeout(arguments.callee, 250);
  }
}
window.showTitleProgress = function(timeout) {
  if (browser.mozilla || browser.chrome) return;
  if (timeout > 0) {
    to = setTimeout(showTitleProgress.pbind(false), timeout);
    return;
  }
  if (timer) {
    return;
  }
  if (document.body) {
    document.body.style.cursor = 'progress';
  }
  if (func) func();
}
window.hideTitleProgress = function() {
  if (browser.mozilla || browser.chrome) return;
  clearTimeout(to);
  document.body.style.cursor = 'default';
  if (timer) {
    clearTimeout(timer);
    timer = false;
  }
  if (browser.mozilla || browser.chrome || browser.opera && !browser.opera_mobile) {
    setFavIcon('/images/favicon' + (vk.intnat ? '_vk' : 'new') + _iconAdd + '.ico?' + stVersions.favicon);
  }
}
})();

function _stlClick(e) {
  return checkEvent(e) || cancelEvent(e);
}
function _stlMousedown(e) {
  e = e || window.event;
  if (checkEvent(e)) {
    return;
  }
  if (!__afterFocus) {
    if (_stlWasSet && _stlWas) {
      var to = _stlWas;
      _stlWas = 0;
      scrollToY(to, 0, true);
    } else if (_stlBack === 1) {
      _tbLink.onclick();
    } else {
      _stlWas = scrollGetY();
      scrollToY(0, 0, true);
    }
  }
  return cancelEvent(e);
}
function _stlMouseover(e) {
  var ev = (e ? e.originalEvent || e : window.event || {}),
      over = (ev.type == 'mouseover') && (ev.pageX > 0 || ev.clientX > 0) && !hasClass(_fMenu, 'over');

  toggleClass(_stlLeft, 'over', over);
  toggleClass(_stlLeft, 'over_fast', over && (_stlBack === 0 || _tbLink.fast) && _stlWasSet === 0);
  toggleClass(_stlSide, 'over', over);
}

vk.width = 791;
function domStarted() {
  window.headNode = geByTag1('head');
  extend(window, {
    icoNode:  geByTag1('link', headNode),
    bodyNode: geByTag1('body'),
    htmlNode: geByTag1('html'),
    utilsNode: ge('utils'),
    _fixedNav: false,
    _tbLink: {}
  });
  bodyNode.onresize = onBodyResize.pbind(false);
  debugLog('dom started');
  if (!utilsNode) return;

  if (browser.mozilla) {
    addClass(bodyNode, 'firefox');
  } else if (browser.msie6) {
    addClass(bodyNode, 'nofixed');
  } else if (browser.mobile) {
    addClass(bodyNode, 'mobfixed');
  }

  for (var i in StaticFiles) {
    var f = StaticFiles[i];
    f.l = 1;
    if (f.t == 'css') {
      utilsNode.appendChild(ce('div', {id: f.n}));
    }
  }

  var l = ge('layer_bg'), lw = l.nextSibling, bl = ge('box_layer_bg'), blw = bl.nextSibling;
  extend(window, {
    _reopen: function() {
      re(window._opener);
      window._opener = utilsNode.appendChild(ce('iframe'));
    },
    layerBG: l,
    boxLayerBG: bl,
    layerWrap: lw,
    layer: lw.firstChild,
    boxLayerWrap: blw,
    boxLayer: blw.firstChild,
    boxLoader: blw.firstChild.firstChild,
    _stlSide: ge('stl_side'),
    _stlLeft: ge('stl_left'),
    _stlShown: 0,
    _stlWas: 0,
    _stlWasSet: 0,
    _stlBack: 0,
    _regBar: 0,
    __afterFocus: false,
    __needBlur: false
  });
  _reopen();
  if (!browser.mobile) {
    var s = {
      className: 'fixed',
      onclick: _stlClick,
      onmousedown: _stlMousedown,
      onmouseover: _stlMouseover,
      onmouseout: _stlMouseover
    };
    val(_stlLeft, '<div id="stl_bg"><nobr id="stl_text">' + getLang('global_to_top') + '</nobr></div>');
    extend(_stlLeft, s);
    extend(_stlSide, s);
    window._stlBg = _stlLeft.firstChild;
    window._stlText = _stlBg.firstChild;
    addEvent(window, 'blur', function(e) {
      _wf = -1;
      __needBlur = false;
    });
    var firstFocus = true;
    addEvent(window, 'focus', function(e) {
      _wf = 1;
      if (__needBlur/* || browser.mac*/) { // also need __afterFocus = true on mac, e.g. in IM.onWindowFocus
        return; // opera fix
      }
      __afterFocus = __needBlur = true;
      setTimeout(function() {
        __afterFocus = false;
      }, 10);


      //recalculate scroll width
      if (firstFocus) {
        sbWidth(true);
        onBodyResize(true);
        firstFocus = false;
      }
    });
  }

  addEvent(boxLayerWrap, 'click', __bq.hideLastCheck);

  extend(layers, {
    show: layers._show.pbind(l, lw),
    boxshow: layers._show.pbind(bl, blw),
    wrapshow: layers._show.pbind(l),
    hide: layers._hide.pbind(l, lw),
    boxhide: layers._hide.pbind(bl, blw),
    wraphide: layers._hide.pbind(l)
  });

  hab.init();
  if (window._retinaInit) {
    window._retinaInit();
  } else {
    window._initedCheck = 1;
  }
}

window._fMenu = window._fMenuShown = false;
window._fMenuHidden = true;
window._fMenuLnks = {};
function initFixedMenu() {
  var lnks = {fr: '/friends?section=requests', ph: '/albums?act=added', vid: '/video?section=tagged', msg: '/im', gr: '/groups', nws: '/feed?section=notifications', ap: '/apps'}, text = [], i, el;
  for (i in lnks) {
    text.push('<a class="fmenu_item fl_r" onmouseover="Pads.preload(\'' + i + '\')" onmousedown="return Pads.show(\'' + i + '\', event)" href="' + lnks[i] + '"><span class="fmenu_text inl_bl"></span><span id="fmenu_' + i + '" class="fmenu_icon inl_bl"></span></a>');
  }
  re(_fMenu);
  extend(window, {
    _fMenu: _stlSide.appendChild(ce('div', {id: 'fmenu', innerHTML: text.join(''), onmousedown: function(e) {
      e = e || window.event;
      return (checkEvent(e) || browser.msie6) ? true : cancelEvent(e);
    }})),
    _fMenuLnks: {}
  });
  _fMenu.onmouseover = addClass.pbind(_fMenu, 'over');
  _fMenu.onmouseout = removeClass.pbind(_fMenu, 'over');
  el = domFC(_fMenu);
  for (i in lnks) {
    _fMenuLnks[i] = el;
    el = domNS(el);
  }
  updateFixedMenu(false, true);
}
function updateFixedMenu(st, refr) {
  if (!window._fMenu) return;

  var os = _fMenuShown, oh = _fMenuHidden;
  if (refr) {
    if (!(_fMenuShown = !!(vk.id > 0 && isVisible('side_bar')))) {
      _fMenuHidden = true;
      hide(_fMenu);
      if (_pads.shown) Pads.setPos(_pads.shown);
    }
  }
  if (!_fMenuShown) return;

  if (refr) {
    for (var i in _fMenuLnks) {
      var c = intval(vk.counts[i]), el = _fMenuLnks[i];
      toggle(el, (c > 0) || !c && (i == 'msg' || i == 'nws'));
      val(domFC(el), c > 1000 ? ('..' + (c % 1000) + '&nbsp;') : (c > 0 ? ('+' + c + '&nbsp;') : ''));
    }
    if (!os) {
      show(_fMenu);
      setStyle(_fMenu, {visibility: 'hidden', opacity: 0});
      if (_pads.shown) Pads.setPos(_pads.shown);
    }
  }
  if (st === false) st = scrollGetY();
  if ((_fMenuHidden = (_stlSideTop > 10)) != oh) {
    if (oh) {
      setStyle(_fMenu, {visibility: ''});
      animate(_fMenu, {opacity: 1}, 100);
    } else {
      if (st < 30) setStyle(_fMenu, {visibility: 'hidden'});
      animate(_fMenu, {opacity: 0}, 100, function() { setStyle(_fMenu, {visibility: 'hidden'}); });
    }
  }
}

vk.started = vkNow();
function domReady() {
  if (!utilsNode) return;

  var sb = ge('side_bar');
  extend(window, {
    pageNode: ge('page_wrap'),
    _fixedNav: (sb && getStyle(sb, 'position') === 'fixed'),
    _tbLink: ge('top_back_link')
  });

  window.scrollNode = browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode);

  if (vk.al == 1) {
    showTitleProgress();
  }

  var dt = Math.max(vkNow() - vk.started, 10), speed = intval((vk.contlen || 1) / dt * 1000);
  if (browser.mozilla && browser.version >= 4) {
    speed /= 2.5;
  } else if (browser.mozilla) {
    speed *= 1.5;
  } else if (browser.msie && browser.version >= 7) {
    speed /= 1.5;
  } else if (browser.msie) {
    speed *= 2.5;
  }
  __stm.lowlimit = intval(Math.max(2000000 / speed, 1) * 150);
  __stm.highlimit = __stm.lowlimit * 6;
  __stm.lowlimit = Math.min(__stm.lowlimit, 600);

  onBodyResize();
  setTimeout(onBodyResize.pbind(false), 0);
  setInterval(function() { // some strange chrome bug..
    if (!bodyNode.onresize) {
      bodyNode.onresize = onBodyResize.pbind(false);
    }
  }, 1000);

  if (_pads.shown) Pads.updateHeight();

  var scrolledNode = browser.msie6 ? pageNode : window;
  addEvent(scrolledNode, 'scroll', onBodyScroll);

  window.debuglogInit && debuglogInit();
  if (!vk.id && ls.checkVersion() && ls.get('last_reloaded')) {
    try {
      var permanent = ['sound_notify_off'], lsData = {};
      each(permanent, function() {
        var lsVal = ls.get(this);
        if (lsVal !== null) {
          lsData[this] = lsVal;
        }
      });
      window.localStorage.clear();
      each(lsData, function(lsKey, lsVal) {
        ls.set(lsKey, lsVal);
      })
    } catch (e) {}
  }

  setTimeout(initFixedMenu, 0);

  if (Math.random() < 0.0001 && window.performance && performance.timing && performance.timing.navigationStart) {
    var page_load_time = (new Date().getTime()) - performance.timing.navigationStart;
    statlogsValueEvent('page_load', page_load_time, 'domReady');
  }

}
function onDomReady(f) {
  f();
}

// Ajax
function serializeForm(form) {
  if (typeof(form) != 'object') {
    return false;
  }
  var result = {};
  var g = function(n) {
    return geByTag(n, form);
  };
  var nv = function(i, e){
    if (!e.name) return;
    if (e.type == 'text' || !e.type) {
      result[e.name] = val(e);
    } else {
      result[e.name] = (browser.msie && !e.value && form[e.name]) ? form[e.name].value : e.value;
    }
  };
  each(g('input'), function(i, e) {
    if ((e.type != 'radio' && e.type != 'checkbox') || e.checked) return nv(i, e);
  });
  each(g('select'), nv);
  each(g('textarea'), nv);

  return result;
}

function ajx2q(qa) {
  var query = [], enc = function(str) {
    if (window._decodeEr && _decodeEr[str]) {
      return str;
    }
    try {
      return encodeURIComponent(str);
    } catch (e) { return str; }
  };

  for (var key in qa) {
    if (qa[key] == null || isFunction(qa[key])) continue;
    if (isArray(qa[key])) {
      for (var i = 0, c = 0, l = qa[key].length; i < l; ++i) {
        if (qa[key][i] == null || isFunction(qa[key][i])) {
          continue;
        }
        query.push(enc(key) + '[' + c + ']=' + enc(qa[key][i]));
        ++c;
      }
    } else {
      query.push(enc(key) + '=' + enc(qa[key]));
    }
  }
  query.sort();
  return query.join('&');
}
function q2ajx(qa) {
  if (!qa) return {};
  var query = {}, dec = function(str) {
    try {
      return decodeURIComponent(str);
    } catch (e) {
      window._decodeEr = window._decodeEr || {};
      _decodeEr[str] = 1;
      return str;
    }
  };
  qa = qa.split('&');
  each(qa, function(i, a) {
    var t = a.split('=');
    if (t[0]) {
      var v = dec(t[1] + '');
      if (t[0].substr(t.length - 2) == '[]') {
        var k = dec(t[0].substr(0, t.length - 2));
        if (!query[k]) {
          query[k] = [];
        }
        query[k].push(v);
      } else {
        query[dec(t[0])] = v;
      }
    }
  });
  return query;
}

var PageID = 1, NextPageID = 1;
function vkLocal(f) {
  var pid = PageID;
  return function() {
    if (pid != PageID) return;
    f.apply(this, arguments);
  }
}
function lTimeout(f, t) {
  return setTimeout(vkLocal(f), t);
}
var stManager = {
  _waiters: [],
  _wait: function() {
    var l = __stm._waiters.length, checked = {}, handlers = [];
    if (!l) {
      clearInterval(__stm._waitTimer);
      __stm._waitTimer = false;
      return;
    }
    for (var j = 0; j < l; ++j) {
      var wait = __stm._waiters[j][0];
      for (var i = 0, ln = wait.length; i < ln; ++i) {
        var f = wait[i];
        if (!checked[f]) {
          if (!StaticFiles[f].l && StaticFiles[f].t == 'css' && getStyle(StaticFiles[f].n, 'display') == 'none') {
            __stm.done(f);
          }
          if (StaticFiles[f].l) {
            checked[f] = 1;
          } else {
            checked[f] = -1;
            if (vk.loaded) {
              var c = ++StaticFiles[f].c;
              if (c > __stm.lowlimit && stVersions[f] > 0 || c > __stm.highlimit) {
                if (stVersions[f] < 0) {
                  topError('<b>Error:</b> Could not load <b>' + f + '</b>.', {dt: 5, type: 1, msg: 'Failed to load with ' + __stm.lowlimit + '/' + __stm.highlimit + ' limits (' + ((vkNow() - vk.started) / 100) + ' ticks passed)', file: f});
                  StaticFiles[f].l = 1;
                  checked[f] = 1;
                } else {
                  topMsg('Some problems with loading <b>' + f + '</b>...', 5);
                  stVersions[f] = irand(-10000, -1);
                  __stm._add(f, StaticFiles[f]);
                }
              }
            }
          }
        }
        if (checked[f] > 0) {
          wait.splice(i, 1);
          --i; --ln;
        }
      }
      if (!wait.length) {
        handlers.push(__stm._waiters.splice(j, 1)[0][1]);
        --j; --l;
      }
    }
    for (var j = 0, l = handlers.length; j < l; ++j) {
      handlers[j]();
    }
  },
  _addCss: function(text) {
    var elem = headNode.appendChild(ce('style', {
      type: 'text/css',
      media: 'screen'
    }));
    if (elem.sheet) {
      elem.sheet.insertRule(text, 0);
    } else if (elem.styleSheet) {
      elem.styleSheet.cssText = text;
    }
  },
  _srcPrefix: function (f, v) {
    if (!vk.stDomains ||
        __dev ||
        f.indexOf('.js') == -1 && f.indexOf('.css') == -1 ||
        f.indexOf('lang') != -1 ||
        f.indexOf('dyn-') != -1 ||
        f.indexOf('loader_nav') != -1 ||
        location.protocol == 'https:') {
      return '';
    }
    if (f.indexOf('.css') != -1) {
      return 'http://st0.vk.me';
    }
    f = f.replace(/[^a-z\d\.\-_]/ig, '');
    var src = intval(v), n = f.length, i;
    for (i = 0; i < n; i++) {
      src += f.charCodeAt(i);
    }
    // debugLog(f, src, vk.stDomains);
    return 'http://st' + ((src % vk.stDomains) + 1) + '.vk.me';
  },
  _add: function(f, old) {
    var name = f.replace(/[\/\.]/g, '_'),
        f_ver = stVersions[f],
        f_full = f + '?' + f_ver,
        f_prefix = stManager._srcPrefix(f, f_ver);

//    f_prefix = ''; // tmp fix userapi problems // turned to vk.me

    if (old && old.l && old.t == 'css') {
      __stm._addCss('#' + name + ' {display: block; }');
    }
    StaticFiles[f] = {v: f_ver, n: name, l: 0, c: 0};
    if (f.indexOf('.js') != -1) {
      var p = '/js/';
      if (stTypes.fromLib[f]) {
        p += 'lib/';
      } else if (!/^lang\d/i.test(f) && !stTypes.fromRoot[f] && f.indexOf('/') == -1) {
        p += 'al/';
      }
      StaticFiles[f].t = 'js';

      if (f == 'common.js') {
        setTimeout(stManager.done.bind(stManager).pbind('common.js'), 0);
      } else {
        headNode.appendChild(ce('script', {
          type: 'text/javascript',
          src: f_prefix + p + f_full
        }));
      }
    } else if (f.indexOf('.css') != -1) {
      var p = '/css/' + ((stTypes.fromRoot[f] || f.indexOf('/') != -1) ? '' : 'al/');
      headNode.appendChild(ce('link', {
        type: 'text/css',
        rel: 'stylesheet',
        href: f_prefix + p + f_full
      }));

      StaticFiles[f].t = 'css';

      if (!ge(name)) {
        utilsNode.appendChild(ce('div', {id: name}));
      }
    }
  },

  add: function(files, callback, async) {
    var wait = [], de = document.documentElement;
    if (!isArray(files)) files = [files];
    for (var i in files) {
      var f = files[i];
      if (f.indexOf('?') != -1) {
        f = f.split('?')[0];
      }
      if (/^lang\d/i.test(f)) {
        stVersions[f] = stVersions['lang'];
      } else if (!stVersions[f]) {
        stVersions[f] = 1;
      }
// Opera Speed Dial fix
      var opSpeed = browser.opera && de.clientHeight == 768 && de.clientWidth == 1024;
      if ((opSpeed || __debugMode) && !(browser.iphone || browser.ipad) && f != 'common.js' && f != 'common.css' && stVersions[f] > 0 && stVersions[f] < 1000000000) stVersions[f] += irand(1000000000, 2000000000);
      var old = StaticFiles[f];
      if (!old || old.v != stVersions[f]) {
        __stm._add(f, old);
      }
      if (callback && !StaticFiles[f].l) {
        wait.push(f);
      }
    }
    if (!callback) return;
    if (!wait.length) {
      return (async === true) ? setTimeout(callback, 0) : callback();
    }
    __stm._waiters.push([wait, callback]);
    if (!__stm._waitTimer) {
      __stm._waitTimer = setInterval(__stm._wait, 100);
    }
  },
  done: function(f) {
    if (stVersions[f] < 0) {
      topMsg('<b>Warning:</b> Something is bad, please <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.', 10);
    }
    StaticFiles[f].l = 1;
  }
}, __stm = stManager;

function requestBox(box, onDone, onFail) {
  box.setOptions({onDestroy: onFail});
  box.onDone = function() {
    onDone.apply(null, arguments);
  }
  return box;
}
function activateMobileBox(opts) {
  return requestBox(showBox('activation.php', {
    act: 'activate_mobile_box',
    hash: opts.hash
  }, {params: {dark: 1, bodyStyle: 'padding: 20px'}}), function() {
    vk.nophone = 0;
    opts.onDone();
  }, opts.onFail);
}
function validateMobileBox(opts) {
  return requestBox(showBox('activation.php', {
    act: 'validate_box',
    captcha: opts.acceptCaptcha ? 1 : '',
    skip_push: opts.skip_push ? opts.skip_push : '',
    hash: opts.hash
  }, {stat: ['uncommon.css'], params: {dark: 1, bodyStyle: 'padding: 20px'}}), opts.onDone, opts.onFail);
}
function validatePassBox(opts) {
  return requestBox(showBox('activation.php', {
    act: 'pass_validate_box',
    hash: opts.hash
  }, {stat: ['uncommon.css'], params: {dark: 1, bodyStyle: 'padding: 20px'}}), opts.onDone, opts.onFail);
}
function photoCaptchaBox(opts) {
  return requestBox(showBox('pcaptcha.php', {
    act: 'box'
  }, {stat: ['pcaptcha.css', 'pcaptcha.js']}), opts.onDone, opts.onFail);
}

var ajaxCache = {};
var globalAjaxCache = {};
var iframeTO = 0;
var ajax = {
  _init: function() {
    var r = false;
    try {
      if (r = new XMLHttpRequest()) {
        ajax._req = function() { return new XMLHttpRequest(); }
        return;
      }
    } catch(e) {}
    each(['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'], function() {
      try {
        var t = '' + this;
        if (r = new ActiveXObject(t)) {
          (function(n) {
            ajax._req = function() { return new ActiveXObject(n); }
          })(t);
          return false;
        }
      } catch(e) {}
    });
    if (!ajax._req && !browser.search_bot) {
      location.replace('/badbrowser.php');
    }
  },
  _getreq: function() {
    if (!ajax._req) ajax._init();
    return ajax._req();
  },
  _frameover: function(js, params) {
    var node = iframeTransport.parentNode;
    node.innerHTML = '';
    utilsNode.removeChild(node);
    iframeTransport = false;
    if (js || params) {
      ajax.framegot(false, false, js, params);
    }
    ajax.framegot(false);
    if (cur.onFrameBlocksDone) {
      cur.onFrameBlocksDone();
    }
    ajax.tOver = new Date().getTime();
  },
  _receive: function(cont, html, js, bench, params) {
    var c = cont && ge(cont);
    if (c && html) {
      if (!c.firstChild) {
        val(c, html);
      } else {
        c.appendChild(cf(html));
      }
    }
    if (js) {
      var scr = '(function(){' + js + ';})()';
      if (__debugMode) {
        eval(scr);
      } else try {
        eval(scr);
      } catch (e) {
        topError(e, {dt: 15, type: 8, url: ajax._frameurl, js: js, answer: Array.prototype.slice.call(arguments).join('<!>')});
      }
      if (bench) {
        ajax.tModule = cur.module;
      }
    }
    if (params && 'leftads' in params) {
      __adsSet(params.leftads, params.ads_section || '', params.ads_can_show, params.ads_showed);
    }
    ajax._framenext();
  },
  framedata: false,
  _framenext: function() {
    if (!(ajax.framedata || {}).length) return;
    var d = ajax.framedata.shift();
    if (d === true) {
      ajax._framenext();
    } else if (d === false) {
      ajax.framedata = false;
    } else {
      iframeTO = lTimeout(ajax._receive.pbind(d[0], d[1], d[2], true, d[3]), 0);
    }
  },
  framegot: function(c, h, j, p) {
    if (!ajax.framedata) return;
    ajax.framedata.push((h === undefined && j === undefined && p === undefined) ? c : [c, h, j, p]);
    if (ajax.framedata.length == 1) {
      ajax._framenext();
    }
  },
  framepost: function(url, query, done) {
    clearTimeout(iframeTO);
    if (window.iframeTransport) {
      ajax._frameover();
    }
    window.iframeTransport = utilsNode.appendChild(ce('div', {innerHTML: '<iframe></iframe>'})).firstChild;
    ajax._framedone = done;
    ajax.framedata = [true];
    url += '?' + ((typeof(query) != 'string') ? ajx2q(query) : query);
    url += (url.charAt(url.length - 1) != '?' ? '&' : '') + '_rndVer=' + irand(0, 99999);
    ajax._frameurl = iframeTransport.src = url;
  },
  plainpost: function(url, query, done, fail, urlonly) {
    var r = ajax._getreq();
    var q = (typeof(query) != 'string') ? ajx2q(query) : query;
    r.onreadystatechange = function() {
      if (r.readyState == 4) {
        if (r.status >= 200 && r.status < 300) {
          if (done) done(r.responseText, r);
        } else { // e.g sleep
          if (fail) fail(r.responseText, r);
        }
      }
    }
    try {
      r.open('POST', url, true);
    } catch(e) {
      return false;
    }
    if (!urlonly) {
      r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      r.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
    r.send(q);
    return r;
  },
  post: function(url, query, options) {
    if (url.substr(0, 1) != '/' && url.substr(0, 4) != 'http') url = '/' + url;
    var o = extend({_captcha: false, _box: false}, options || {}), q = extend({al: o.frame ? -1 : 1}, query), now = vkNow();
    var timeSpent = vk.spentLastSendTS ? Math.round((now - vk.spentLastSendTS) / 1000) : 0;
    if (vk.sampleUser >= 0 && cur.module && timeSpent >= 1) {
      if (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle) {
        q = extend({_smt: cur.module + ':' + timeSpent}, q);
      }
      vk.spentLastSendTS = now;
    }
    if (o.progress) {
      if (!o.showProgress) {
        o.showProgress = show.pbind(o.progress);
      }
      if (!o.hideProgress) {
        o.hideProgress = hide.pbind(o.progress);
      }
    }
    if (o.loader) {
      o.showProgress = function() {
        boxRefreshCoords(boxLoader);
        show(boxLoader);
        show(boxLayerWrap);
      }
      o.hideProgress = function() {
        hide(boxLoader);
        hide(boxLayerWrap);
      }
    }
    return ajax._post(url, q, o);
  },
  preload: function(url, query, data) {
    if (url.substr(0, 1) != '/') url = '/' + url;
    ajaxCache[url + '#' + ajx2q(query)] = data;
  },
  _debugLog: function(text, _reqid) {
    window.debuglogGot && debuglogGot(_reqid, text);
  },
  _parseRes: function(answer, _reqid) {
    window._updateDebug = false;
    for (var i = answer.length - 1; i >= 0; --i) {
      var ans = answer[i];
      if (ans.substr(0, 2) == '<!') {
        var from = ans.indexOf('>');
        var type = ans.substr(2, from - 2);
        ans = ans.substr(from + 1);
        switch (type) {
        case 'json' :
          answer[i] = parseJSON(ans);
          break;
        case 'int'  : answer[i] = intval(ans); break;
        case 'float': answer[i] = floatval(ans); break;
        case 'bool' : answer[i] = intval(ans) ? true : false; break;
        case 'null' : answer[i] = null; break;
        case 'pageview_candidate':
          answer.pop(); // <!pageview> must be last one or before <!debug>
          break;
        case 'debug':
          ajax._debugLog(ans, _reqid);
          answer.pop(); // <!debug> must be last one
        break;
        }
      }
    }
  },
  _post: function(url, q, o) {
    if (!q.captcha_sid && o.showProgress) o.showProgress();
    var cacheKey = false;
    extend(q, __adsGetAjaxParams(q, o));
    if (o.cache) {
      var boldq = clone(q);
      delete boldq.al;
      delete boldq.al_ad;
      delete boldq.ads_section;
      delete boldq.ads_showed;
      delete boldq.captcha_sid;
      delete boldq.captcha_key;
      delete boldq._smt;
      cacheKey = url + '#' + ajx2q(boldq);
    }
    var hideBoxes = function() {
      for (var i = 0, l = arguments.length; i < l; ++i) {
        var box = arguments[i];
        if (box && box.isVisible()) {
          box.setOptions({onHide: false, onDestroy: false});
          box.hide();
        }
      }
      return false;
    }
    var fail = function(text, r) {
      if (o.hideProgress) o.hideProgress();
      if (o._suggest) cleanElems(o._suggest);
      o._suggest = o._captcha = o._box = hideBoxes(o._captcha, o._box);

      if (text.indexOf('The page is temporarily unavailable') != -1 && __dev) {
        ajax._post(url, q, o);
        return false;
      }
      if (!o.onFail || o.onFail(text) !== true) {
        topError(text, {dt: 5, type: 3, status: r.status, url: url, query: q && ajx2q(q)});
      }
    }
    if (o.local) fail = vkLocal(fail);
    if (o.stat) {
      var statAct = false;
      stManager.add(o.stat, function() {
        if (statAct) {
          statAct();
        }
        o.stat = false;
      });
    }
    // Process response function
    var processResponse = function(code, answer) {
      if (o.cache) {
        var answ = ajaxCache[cacheKey];
        if (answ && answ._loading) {
          setTimeout(function() {
            for (var i in answ._callbacks) {
              answ._callbacks[i](code, answer);
            }
          }, 0);
          delete ajaxCache[cacheKey];
        }
      }
      if (o.stat) {
        o.stat = false;
        statAct = processResponse.pbind(code, answer);
        return false;
      }
      if (o.cache && !o.forceGlobalCache) {
        if (!code) {
          ajaxCache[cacheKey] = answer;
        }
      }

      // Parse response
      if (o.hideProgress) o.hideProgress();
      if (code != 2) {
        if (o._captcha) {
          if (o._suggest) cleanElems(o._suggest);
          o._suggest = o._captcha = hideBoxes(o._captcha);
        }
        o._box = hideBoxes(o._box);
      }
      switch (code) {
      case 1: // email not confirmed
        if (ge('confirm_mail')) {
          showFastBox({
            width: 430,
            title: ge('confirm_mail_title').value,
            dark: 1,
            bodyStyle: 'padding: 20px;',
            onDestroy: o.onFail
          }, '<div class="confirm_mail">' + ge('confirm_mail').innerHTML + '</div>');
        } else {
          topMsg('<b>Error!</b> Email is not confirmed!');
        }
        break;
      case 2: // captcha
        var resend = function(sid, key) {
          var nq = extend(q, {captcha_sid: sid, captcha_key: key});
          var no = o.cache ? extend(o, {cache: -1}) : o;
          ajax._post(url, nq, no);
        }
        var addText = '';
        // if (vk.nophone == 1 && !vk.nomail) {
        //   addText = getLang('global_try_to_activate').replace('{link}', '<a class="phone_validation_link">').replace('{/link}', '</a>');
        //   addText = '<div class="phone_validation_suggest">' + addText + '</div>';
        // }
        o._captcha = showCaptchaBox(answer[0], intval(answer[1]), o._captcha, {
          onSubmit: resend,
          addText: addText,
          onDestroy: function() {
            if (o.onFail) o.onFail();
          }
        });
        o._suggest = geByClass1('phone_validation_link', o._captcha.bodyNode);
        if (o._suggest) {
          addEvent(o._suggest, 'click', function() {
            o._box = validateMobileBox({onDone: o._captcha.submit});
          });
        }
        break;
      case 11: // mobile validation needed
      case 12:
        var no = o.cache ? extend(o, {cache: -1}) : o;
        o._box = validateMobileBox({acceptCaptcha: (code == 11), onDone: function(sid, key) {
          vk.nophone = 0;
          if (sid) o._captcha = curBox();
          ajax._post(url, sid ? extend(q, {captcha_sid: sid, captcha_key: key}) : q, no);
        }, onFail: o.onFail, hash: answer[0]});
        break;
      case 14:
        var no = o.cache ? extend(o, {cache: -1}) : o;
        o._box = photoCaptchaBox({onDone: ajax._post.pbind(url, q, no), onFail: o.onFail});
        break;
      case 15:
        var no = o.cache ? extend(o, {cache: -1}) : o;
        o._box = validatePassBox({onDone: ajax._post.pbind(url, q, no), onFail: o.onFail, hash: answer[0]});
        break;
      case 3: // auth failed
        var no = o.cache ? extend(o, {cache: -1}) : o;
        window.onReLoginDone = ajax._post.pbind(url, q, no);
        window.onReLoginFailed = function(toRoot) {
          if (toRoot === -1) {
            location.href = location.href.replace(/^http:/, 'https:');
          } else if (toRoot) {
            nav.go('/');
          } else {
            window.onReLoginDone();
          }
        }

        utilsNode.appendChild(ce('iframe', {src: vk.loginscheme + '://login.vk.com/?' + ajx2q({role: 'al_frame', _origin: locProtocol + '//' + locHost, ip_h: (answer[0] || vk.ip_h)})}));
        break;
      case 4: // redirect
        if (intval(answer[1])) { // ajax layout redirect
          nav.go(answer[0], false, {nocur: (answer[1] === '2'), noback: (answer[1] === true) ? true : false, showProgress: o.showProgress, hideProgress: o.hideProgress});
        } else {
          hab.stop();
          location.href = answer[0];
        }
        break;
      case 5: // reload
        nav.reload({force: intval(answer[0]), from: 1, url: url, query: q && ajx2q(q)}); // force reload
        break;
      case 6: // mobile activation needed
        var no = o.cache ? extend(o, {cache: -1}) : o;
        o._box = activateMobileBox({onDone: ajax._post.pbind(url, q, no), onFail: o.onFail, hash: answer[0]});
        break;
      case 7: // message
        if (o.onFail) o.onFail();
        topMsg(answer[0], 10);
        break;
      case 8: // error
        if (o.onFail) {
          if (o.onFail(answer[0])) {
            return;
          }
        }
        topError(answer[0] + (answer[2] ? ' #'+answer[2] : ''), {dt: answer[1] ? 0 : 10, type: 4, url: url, query: q && ajx2q(q)});
        break;
      case 9: // votes payment
        if (o.fromBox || o.forceDone) {
          if (o.onDone) { // page, box or other
            o.onDone.apply(window, answer);
          }
          if (o.fromBox) {
            break;
          }
        }
        o._box = showFastBox({title: trim(answer[0]), dark: (answer[0].substr(0, 1) == ' ' ? 1 : 0)}, answer[1]);
        var no = extend(clone(o), {showProgress: o._box.showProgress, hideProgress: o._box.hideProgress});
        if (o.cache) {
          no.cache = -1;
        }
        o._box = requestBox(o._box, function(params) {
          if (isVisible(o._box.progress)) return;
          if (!params) {
            params = {_votes_ok: 1};
          }
          ajax._post(url, extend(q, params), no);
        }, o.onFail);
        o._box.evalBox(answer[2]);
        break;
      case 10: //zero zone
        o._box = showFastBox({
          title: answer[0] || getLang('global_charged_zone_title'),
          dark: 1,
          bodyStyle: 'padding: 20px;',
          onHide: o.onFail
        }, answer[1], getLang('global_charged_zone_continue'), function() {
          var nq = extend(q, {charged_confirm: answer[3]});
          ajax._post(url, nq, o);
        }, getLang('global_cancel'));
        break;
      case 13: // eval code
        eval('(function(){' + answer[0] + ';})()');
        break;
      default:
        if (code == -1 || code == -2) {
          var adsShowed  = answer.pop();
          var adsCanShow = answer.pop();
          var adsHtml    = answer.pop();
          __adsSet(adsHtml, null, adsCanShow, adsShowed);
        }
        if (o.onDone) { // page, box or other
          o.onDone.apply(window, answer);
        }
        break;
      }
      if (window._updateDebug) _updateDebug();
    }
    if (o.local) processResponse = vkLocal(processResponse);
    var done = function(text, data) { // data - for iframe transport post
      if (o.bench) {
        ajax.tDone = new Date().getTime();
      }
      text = text.replace(/^<!--/, '').replace(/-<>-(!?)>/g, '--$1>');
      if (!trim(text).length) {
        data = [8, getLang('global_unknown_error')];
        text = stVersions['nav'] + '<!><!>' + vk.lang + '<!>' + stVersions['lang'] + '<!>8<!>' + data[1];
      }
      var answer = text.split('<!>');

      var navVersion = intval(answer.shift());
      if (!navVersion) {
        return fail('<pre>' + text + '</pre>', {status: -1});
      }

      // First strict check for index.php reloading, in vk.al == 1 mode.
      if (vk.version && vk.version != navVersion) {
        if (navVersion && answer.length > 4) {
          nav.reload({force: true, from: 2, url: url, query: q && ajx2q(q)});
        } else {
          if (nav.strLoc) {
            location.replace(locBase);
          } else {
            topError('Server error.', {type: 100});
          }
        }
        return;
      }
      vk.version = false;

      // Common response fields
      var newStatic = answer.shift();
      var langId = intval(answer.shift());
      var langVer = intval(answer.shift());

      if (o.frame) answer = data;

      var code = intval(answer.shift());
      if (vk.lang != langId && o.canReload) { // Lang changed
        nav.reload({force: true, from: 3, url: url, query: q && ajx2q(q)});
        return;
      }

      // Wait for attached static files
      var waitResponseStatic = function() {
        var st = ['common.css'];
        if (browser.msie6) {
          st.push('ie6.css');
        } else if (browser.msie7) {
          st.push('ie7.css');
        }
        if (newStatic) {
          newStatic = newStatic.split(',');
          for (var i = 0, l = newStatic.length; i < l; ++i) {
            st.push(newStatic[i]);
          }
        }
        if (stVersions['lang'] < langVer) {
          stVersions['lang'] = langVer;
          for (var i in StaticFiles) {
            if (/^lang\d/i.test(i)) {
              st.push(i);
            }
          }
        }

        if (!o.frame) {
          try {
            ajax._parseRes(answer, o._reqid);
          } catch(e) {
            topError('<b>JSON Error:</b> ' + e.message, {type: 5, answer: answer.join('<!>'), url: url, query: q && ajx2q(q)});
          }
        }
        stManager.add(st, processResponse.pbind(code, answer));
      }

      // Static managing function
      if (navVersion <= stVersions['nav']) {
        return waitResponseStatic();
      }
      headNode.appendChild(ce('script', {
        type: 'text/javascript',
        src: '/js/loader_nav' + navVersion + '_' + vk.lang + '.js'
      }));
      setTimeout(function() {
        if (navVersion <= stVersions['nav']) {
          return waitResponseStatic();
        }
        setTimeout(arguments.callee, 100);
      }, 0);
    }
    if (o.local) done = vkLocal(done);
    if (o.cache > 0 || o.forceGlobalCache) {
      var answer = ajaxCache[cacheKey];
      if (answer && answer._loading) {
        answer._callbacks.push(processResponse);
        return;
      } else {
        if (answer && !o.forceGlobalCache) {
          processResponse(0, answer);
          if (o.cache === 3) delete ajaxCache[cacheKey];
          return;
        } else if (answer = globalAjaxCache[cacheKey]) {
          if (answer == -1 || isFunction(answer)) {
            globalAjaxCache[cacheKey] = o.onDone;
          } else {
            o.onDone.apply(window, answer);
          }
          if (o.hideProgress) o.hideProgress();
          return;
        }
      }
    }
    ajaxCache[cacheKey] = {_loading: 1, _callbacks: []};
    if (window.debuglogSent) {
      o._reqid = debuglogSent(url + (q ? ': ' + ajx2q(q).replace(/&/g, '&amp;') : ''));
      if (o.frame) {
        window._lfrid = o._reqid;
      }
    } else {
      o._reqid = 0;
    }
    return o.frame ? ajax.framepost(url, q, done) : ajax.plainpost(url, q, done, fail);
  },
  tGetParam: function() {
    if (!ajax.tStart || !ajax.tModule) return;
    var d = ajax.tDone - ajax.tStart;
    var p = ajax.tProcess - ajax.tDone;
    var r = ajax.tRender - ajax.tProcess;
    var o = ajax.tOver - ajax.tStart;
    var res = [d, p, r, o, ajax.tModule];
    for (var i in res) {
      if (res[i] < 0) return false;
      if (!res[i] && res[i] !== 0) return false;
    }
    ajax.tStart = false;
    return res.join(',');
  }
}

function HistoryAndBookmarks(params) {
  // strict check for cool hash display in ff.
  var fixEncode = function(loc) {
    var h = loc.split('#');
    var l = h[0].split('?');
    return l[0] + (l[1] ? ('?' + ajx2q(q2ajx(l[1]))) : '') + (h[1] ? ('#' + h[1]) : '');
  }

  var frame = null, withFrame = browser.msie6 || browser.msie7;
  var frameDoc = function() {
    return frame.contentDocument || (frame.contentWindow ? frame.contentWindow.document : frame.document);
  }

  var options = extend({onLocChange: function() {}}, params);

  var getLoc = function(skipFrame) {
    var loc = '';
    if (vk.al == 3) {
      loc = (location.pathname || '') + (location.search || '') + (location.hash || '');
    } else {
      if (withFrame && !skipFrame) {
        try {
          loc = frameDoc().getElementById('loc').innerHTML.replace(/&lt;/ig, '<').replace(/&gt;/ig, '>').replace(/&quot;/ig, '"').replace(/&amp;/ig, '&');
        } catch(e) {
          loc = curLoc;
        }
      } else {
        loc = (location.toString().match(/#(.*)/) || {})[1] || '';
        if (loc.substr(0, 1) != vk.navPrefix) {
          loc = (location.pathname || '') + (location.search || '') + (location.hash || '');
        }
      }
    }
    if (!loc && vk.al > 1) {
      loc = (location.pathname || '') + (location.search || '');
    }
    return fixEncode(loc.replace(/^(\/|!)/, ''));
  }

  var curLoc = getLoc(true);

  var setFrameContent = function(loc) {
    try {
      var d = frameDoc();
      d.open();

      d.write('<script type="text/javascript">var u=navigator.userAgent,d=location.host.toString().match(/[a-zA-Z]+\\.[a-zA-Z]+$/)[0];if(/opera/i.test(u)||!/msie 6/i.test(u)||document.domain!=d)document.domain=d;</script>' +
        '<div id="loc">' +
          loc.replace('&', '&amp;').replace('"', '&quot;').replace('>', '&gt;').replace('<', '&lt;') +
        '</div>'
      );

      d.close();
    } catch(e) {}
  }

  var setLoc = function(loc) {
    //curLoc = fixEncode(loc.replace(/#(\/|!)?/, ''));
    curLoc = fixEncode(loc);
    var l = (location.toString().match(/#(.*)/) || {})[1] || '';
    if (!l && vk.al > 1) {
      l = (location.pathname || '') + (location.search || '');
    }
    l = fixEncode(l);
    if (l.replace(/^(\/|!)/, '') != curLoc) {
      if (vk.al == 3) {
        try {
          history.pushState({}, '', '/' + curLoc);
          return;
        } catch(e) {}
      }
      window.chHashFlag = true;
      location.hash = '#' + vk.navPrefix + curLoc;
      if (withFrame && getLoc() != curLoc) {
        setFrameContent(curLoc);
      }
    }
  }

  var locChecker = function() {
    var loc = getLoc(true);
    if (loc != curLoc) {
      if (browser.msie6) {
        if (reloadCheckFlood({force: true, from: 6})) return;
        location.reload(true);
      } else {
        setFrameContent(loc);
      }
    }
  }

  var checker = function(force) {
    var l = getLoc();
    if (l == curLoc && force !== true) {
      return;
    }
    options.onLocChange(l);

    curLoc = l;
    if (withFrame && location.hash.replace('#' + vk.navPrefix, '') != l) {
      location.hash = '#' + vk.navPrefix + l;
    }
  }
  var checkTimer;
  var frameChecker = function() {
    try {
      if (frame.contentWindow.document.readyState != 'complete') {
        return;
      }
    } catch(e) {
      return;
    }
    checker();
  }
  var init = function() {
    if (vk.al == 1) {
      checker(true);
    }
    if (vk.al == 3) {
      addEvent(window, 'popstate', checker);
      if (browser.safari) {
        addEvent(window, 'hashchange', checker);
      }
    } else if (withFrame) {
      frame = ce('iframe', {id: 'hab_frame'});
      frame.attachEvent('onreadystatechange', frameChecker);
      frame.src = '/al_loader.php?act=hab_frame&loc=' + encodeURIComponent(curLoc);

      utilsNode.appendChild(frame);

      checkTimer = setInterval(locChecker, 200);
    } else if ('onhashchange' in window) {
      addEvent(window, 'hashchange', function() {
        if (window.chHashFlag) {
          window.chHashFlag = false;
        } else {
          checker();
        }
      });
    } else {
      checkTimer = setInterval(checker, 200);
    }
  }
  return {
    setLoc: setLoc,
    getLoc: getLoc,
    init: init,
    setOptions: function(params) {
      options = extend(options, params);
    },
    checker: checker,
    stop: function() {
      if (vk.al < 3) {
        clearInterval(checkTimer);
        if (withFrame) {
          frame.detachEvent('onreadystatechange', frameChecker);
        }
      } else if (vk.al == 3) {
        removeEvent(window, 'popstate', checker);
      }
    }
  }
}

window.hab = new HistoryAndBookmarks({onLocChange: function(loc) {
  nav.go('/' + loc, undefined, {back: true, hist: true});
}});

function checkEvent(e) {
  return ((e = (e || window.event)) && (e.type == 'click' || e.type == 'mousedown' || e.type == 'mouseup') && (e.which > 1 || e.button > 1 || e.ctrlKey || e.shiftKey || browser.mac && e.metaKey)) || false;
}
function checkOver(e, target) {
  if (!e) return true;
  e = e.originalEvent || e;
  target = target || e.target;
  var related = e.fromElement || e.relatedTarget;
  if (!related || related == target || related == target.parentNode) {
    return true;
  }
  while (related != target && related.parentNode && related.parentNode != bodyNode) {
    related = related.parentNode;
  }
  return (related != target);
}

function leftBlockOver(block) {
  var timer = 'timer'
  var over = 1;
  if (!block.id) {
    block = ge('left_hide' + block);
    over = 0;
  }
  if (over || !block.timer) {
    if (block.showing) {
      removeAttr(block, 'showing');
    } else {
      animate(block, {opacity: over ? 1 : 0.5}, 200);
      if (over) {
        block.showing = 1;
      }
    }
  }
  if (block.timer) {
    clearTimeout(block.timer);
    removeAttr(block, 'timer');
  }
}
function leftBlockOut(block) {
  var opacity = 0.5;
  if (!block.id) {
    block = ge('left_hide' + block);
    opacity = 0;
  }
  block.timer = setTimeout(function() {
    animate(block, {opacity: opacity}, 200);
    removeAttr(block, 'timer');
  }, 1);
}
function leftBlockHide(block, hash, blockData) {
  var query = {act: 'hide_block', block: block, hash: hash};
  if (blockData) {
    query.block = blockData;
  }
  ajax.post('al_index.php', query, {onDone: updSeenAdsInfo});
  hide('left_block' + block);
}

function leftAdBlockClose(blockIdSuffix, closeLink) {

  setStyle('left_hide' + blockIdSuffix, {visibility: 'hidden'});

  ajax.post(closeLink, {}, {noAds: true, onDone: onDone});

  function onDone(response) {
    if (!response.done) return;

    if (blockIdSuffix == 'ya_direct') {
      animate(blockIdSuffix, {opacity: 0}, 200, function () {
        re('ya_direct');
        setTimeout(function () {
          AdsLight.updateBlock('force_hard', 2);
        }, 5000);
      });
      vk__adsLight.yaDirectAdActive = false;
      return;
    }
    var elemInfo  = ge('ads_ad_close_info_' + blockIdSuffix);

    if (!elemInfo) return false;

    setStyle(elemInfo, {display: 'block', opacity: 0})

    setTimeout(onClose, 0);
  }
  function onClose() {
    animate('ads_ad_close_info_' + blockIdSuffix, {opacity: 1}, 200, onCloseComplete);
  }
  function onCloseComplete() {
    setStyle('ads_ad_box2_' + blockIdSuffix, {visibility: 'hidden'});
  }
}

function leftBlockFriendHide(blockId, blockData, hash) {
  var container = ge('left_friends');
  if (!container) { return; }
  var blocks = geByClass('left_friend_block', container);
  var showedIds = [];
  for (var i in blocks) {
    var t = blocks[i].id.split('_');
    showedIds.push(t[2]);
  }
  var query = {act: 'hide_block', block: blockData, showed: showedIds.join(','), hash: hash};
  ajax.post('al_index.php', query, {onDone: function(html) {
    if (html) {
      var block = se(html);
      if (geByClass('left_friend_block', container).length >= 2) {
        hide(block);
      }
      container.insertBefore(block, geByClass1('left_friend_all_link', container));
    }
    if (!geByClass('left_friend_block', container).length) {
      hide('left_friend_all_link');
    }
  }});

  var hideBl = ge('left_block' + blockId);
  var newBl = blocks.pop();
  if (newBl && !isVisible(newBl)) {
    show(newBl)
    hideBl.parentNode.replaceChild(newBl, hideBl);
  } else {
    re(hideBl);
  }
}
function leftBlockToggleFriend(mid, type, hash, act, ev) {
  if (act) {
    stManager.add(['tooltips.css', 'tooltips.js']);
  }
  cur.mfid = mid;

  ajax.post('al_friends.php', {act: act ? 'add' : 'remove', mid: mid, mf_type: type, hash: hash, from: 'leftblock'}, {
    onDone: function(text, ttText, ttScript) {
      if (!text) return nav.reload();
      var fs = ge('left_friend_status_'+mid);
      cleanElems(fs.firstChild);
      if (text) {
        show(fs);
        val(fs, text);
      } else {
        hide(fs);
      }
      if (ttText) {
        ajax.preload('al_friends.php', {act: 'friend_tt', mid: mid}, [ttText, ttScript])
        setTimeout(leftBlockFriendTooltip, 0);
      }
    },
    showProgress: function() {
      var tt = (ge('left_friend_subscribed') || {}).tt;
      if (tt) {
        tt.hide({fasthide: 1});
        tt.destroy();
      }
      ge('left_friend_status_'+mid).innerHTML = '<img src="/images/upload'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.gif" width="32" />';
    },
    hideProgress: function() { hide('left_friend_status_'+mid); },
    onFail: function(text) {
      if (!text) return;

      showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text);
      return true;
    }
  });
  cancelEvent(ev);
}
function leftBlockFriendTooltip() {
  return showTooltip(ge('left_friend_subscribed'), {
    url: 'al_friends.php',
    params: {act: 'friend_tt', mid: cur.mfid, from: 'leftblock'},
    slide: 15,
    hidedt: 500,
    shift: [40, -1, 3],
    className: 'preq_tt',
    forcetodown: true
  });
}

function leftBlockUnpaidGiftsHide(blockId, hash) {
  return showFastBox({title: getLang('left_delete_unpaid_gifts_title'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('left_delete_unpaid_gifts_text'), getLang('global_delete'), function() { leftBlockHide(blockId, hash); re('payments_box_unpaid_gifts_info'); curBox().hide(); }, getLang('global_cancel'));
}

function comScoreUDM(url, referrer) {
  if (vk.zero) return;
  referrer = referrer || document.referrer;
  vkImage().src = locProtocol + '//' + (locProtocol == 'https:' ? 'sb' : 'b') + '.scorecardresearch.com/p?c1=2&c2=13765216&c3=&c4=' + escape(url) + '&c5=&c7=' + escape(url) + '&c9=' + escape(referrer) + '&c15=&cv=2.0&cj=1&rn=' + Math.random();
}

function updateOtherCounters(url, referrer) {
  if (vk.zero) return;
  referrer = referrer || document.referrer;
  var cleanRe = [
    [new RegExp('(\\/(?:write|mail|im|al_im.php))(\\?[a-z0-9&=\\-_]*)?$'), '$1'],
    [new RegExp('(\\/write)(\\d*)(\\?[a-zA-Z0-9&=\\-_]*)?$'), '$1']
  ], toClean = {
    referrer: referrer,
    url: url
  };
  each(toClean, function(i, k) {
    each (cleanRe, function() {
      toClean[i] = toClean[i].replace(this[0], this[1]);
    });
  });
  referrer = toClean.referrer;
  url = toClean.url;
  vkImage().src = locProtocol + '//counter.yadro.ru/hit?r' + escape(referrer) + (window.screen === undefined ? '' : ';s' + screen.width + '*' + screen.height + '*' + (screen.colorDepth ? screen.colorDepth : screen.pixelDepth)) + ';u' + escape(url) + ';' + Math.random() + '';
  vkImage().src = locProtocol + '//www.tns-counter.ru/V13a***R>' + referrer.replace(/\*/g,'%2a') + '*vk_com/ru/UTF-8/tmsec=vksite_total/' + Math.round(Math.random()*1E9);
  comScoreUDM(url, referrer);
  window._tmr = window._tmr || [];
  window._tmr.push({id: "2579437", url: url, referrer: referrer, type: "pageView", start: (new Date()).getTime(), pid: vk.id ? vk.id : 0});
}

function handlePageView(params) {
  var footer = ge('footer_wrap');

  var width          = (params.width === undefined) ? vk.width : params.width;
  var widthDec       = (params.width_dec === undefined) ? vk.width_dec : params.width_dec;
  var widthDecFooter = (params.width_dec_footer === undefined) ? vk.width_dec_footer : params.width_dec_footer;

  if (vk.noleftmenu != params.noleftmenu || vk.nobottommenu != params.nobottommenu || vk.width != params.width || vk.width_dec_footer != params.width_dec_footer) {
    if (vk.noleftmenu != params.noleftmenu && params.noleftmenu) {
      hide('side_bar');
    }
    if (vk.nobottommenu != params.nobottommenu) {
      if (params.nobottommenu) {
        hide('bottom_nav');
      } else {
        show('bottom_nav');
      }
    }
    if (params.noleftmenu && params.nobottommenu) {
      ge('page_body').className = 'simple';
      if (footer) {
        footer.className = 'simple';
        footer.style.width = 'auto';
      }
    } else {
      ge('page_body').className = 'fl_r';
      if (footer) {
        footer.className = 'fl_r';
        footer.style.width = (width - widthDecFooter) + 'px';
      }
    }
  }

  if (vk.notopmenu != params.notopmenu) {
    if (params.notopmenu) {
      hide('quick_search', 'qsearch_border', 'top_search', 'top_invite_link', 'top_menu_wrap');
    } else {
      show('quick_search', 'qsearch_border', 'top_search', 'top_invite_link', 'top_menu_wrap');
    }
  }

  if (width != vk.width || widthDec != vk.width_dec) {
    ge('page_layout').style.width = width + 'px';
    ge('page_body').style.width = (width - widthDec) + 'px';
    if (ge('ts_wrap') && hasClass(ge('ts_wrap'), 'vk')) ge('ts_wrap').style.width = (width - 191) + 'px';
    setTimeout(updSideTopLink.pbind(true), 0);

    try {
      _tbLink.style.maxWidth = (_tbLink.parentNode.offsetWidth - 35) + 'px';
    } catch (e) {}
  }

  if (vk.noleftmenu != params.noleftmenu && !params.noleftmenu) {
    show('side_bar');
  }

  vk.noleftmenu       = params.noleftmenu;
  vk.nobottommenu     = params.nobottommenu;
  vk.notopmenu        = params.notopmenu;
  vk.width            = width;
  vk.width_dec        = widthDec;
  vk.width_dec_footer = widthDecFooter;
  vk.body_class       = params.body_class;

  vk.no_ads           = params.no_ads;
  vk.ad_preview       = params.ad_preview;
}

function handleSetCount(e, v, id) {
  var newCnt = '+', attr = '', maxCntLen = (id == 'spr') ? 5 : ((vk.fs > 11) ? 2 : 3),
      plus = '+',
      newCntWrap = '<span class="inl_bl left_count">+</span>',
      curCntWp = geByClass1('left_count_wrap', e, 'span'),
      curOver = hasClass(geByClass1('left_row', e, 'a'), 'left_nav_over'),
      curCntEl = geByClass1('left_count', e, 'span'), curCntV = val(curCntEl);
  if (v) {
    newCnt = v.toString();
    if (newCnt.length > maxCntLen) {
      attr = ' title="' + stripHTML(langNumeric(v, '%s', true)) + '"';
      newCnt = '..' + newCnt.substr(newCnt.length - maxCntLen);
      plus = '';
    } else if (v <= 0) {
      plus = '';
    }
    newCnt = plus + newCnt;
    newCntWrap = '<span class="inl_bl left_count" ' + attr + '>' + newCnt + '</span>';
  }
  var onDone = function () {
    val(curCntWp, newCntWrap);
    (!v ? addClass : removeClass)(curCntWp, 'left_void');
    setStyle(curCntWp, {opacity: ''});
  }, el = domFC(_fMenuLnks[id]);
  if (id && newCnt != val(curCntEl) && (newCnt || curCntEl)) {
    Pads.invalidate(id);
  }
  if (curCntV && (curCntV != '+' || curOver)) {
    if (newCnt && newCnt != '+') {
      animateCount(curCntEl, newCnt, {str: 'auto', onDone: onDone});
      if (el) animateCount(el, newCnt + '&nbsp;', {str: 'auto'});
    } else if (curOver) {
      var fakeEl = bodyNode.appendChild(se('<span class="left_count_wrap"><span class="inl_bl left_count">+</span></span>'));
      plusWidth = getSize(domFC(fakeEl))[0];
      re(fakeEl);
      if (curCntV.charAt(0) != '+') val(curCntEl, curCntV.replace('..', '+'));
      animate(curCntEl, {width: plusWidth}, 100, onDone);
      if (el) animate(el, {width: 0, discrete: 1}, 100, function() { val(el, el.style.width = ''); });
    } else {
      animate(curCntWp, {opacity: 0}, 100, onDone);
      if (el) animate(el, {width: 0, discrete: 1}, 100, function() { val(el, el.style.width = ''); });
    }
  } else {
    onDone();
    setStyle(curCntWp, {opacity: 0});
    animate(curCntWp, {opacity: 1}, 100);
    if (el && newCnt && newCnt != '+') {
      val(el, newCnt + '&nbsp');
      var to = el.offsetWidth;
      el.style.width = '1px';
      animate(el, {width: to, discrete: 1}, 100, function() { el.style.width = ''; });
    }
  }
}

vk.counts = {};
function handlePageParams(params) {
  vk.id = params.id;
  if (params.body_class !== bodyNode.className) {
    bodyNode.className = params.body_class || '';
  }
  if (params.pvbig !== undefined) vk.pvbig = params.pvbig;
  if (params.pvdark !== undefined) vk.pvdark = params.pvdark;
  cur._level = params.level;

  if (vk.id && vk.id % 1000 == 1) {
    setTimeout(function () {
      window.scrollmarked = {};
      statlogsValueEvent('page_scroll', 0, cur.module, '0');
    }, 300);
  }

  handlePageView(params);

  var confMail = ge('confirm_mail_wrap'), chPhone = ge('change_phone_wrap'), mv = ge('mvk_footer_lnk');
  if (mv) {
    mv.firstChild.href = params.mvklnk || 'http://m.vk.com/';
  }
  if (confMail) {
    if (!params.nomail) {
      confMail.parentNode.removeChild(confMail);
    } else if (params.notopbars) {
      hide(confMail);
    } else {
      show(confMail);
    }
  }
  vk.nomail = params.nomail;
  if (chPhone) {
    if (!params.chphone) {
      re(chPhone);
    } else if (params.notopbars) {
      hide(chPhone);
    } else {
      show(chPhone);
    }
  }

  vk.nophone = intval(params.nophone);

  if (vk.id) {
    var leftBlocksElem = ge('left_blocks');
    if (leftBlocksElem) {
      leftBlocksElem.innerHTML = (params.leftblocks || '');
    }
  }
  if ('leftads' in params && params.leftads !== 0) {
    __adsSet(params.leftads, params.ads_section || '', params.ads_can_show, params.ads_showed);
  }

  var currentURL = locProtocol+'//'+location.host+'/';
  if (params.loc) {
    if (params.loc.charAt(0) == '?') {
      currentURL += nav.strLoc;
    } else {
      currentURL += params.loc;
    }
  }
  var referrer = (document.URL == currentURL) ? '' : document.URL;
  setTimeout(updateOtherCounters.pbind(currentURL, referrer), 10);

  if (!params.counters) return;
  var cnts = (params.counters || '').split(',');

  var ads_menu_link = '';
  var ads_menu_add = '';

  if (intval(cnts[9]) > 0) {
    ads_menu_link = 'exchange';
    ads_menu_add = 'act=overview&status=-1';
  } else if (intval(cnts[9]) < -1){
    cnts[9] = 1;
    ads_menu_link = 'ads';
    ads_menu_add = 'act=a_comeback_office_redirect';
  } else {
    ads_menu_link = 'ads?act=office&last=1';
  }

  var i = 0, setEl = ge('l_set'), sep = setEl && setEl.nextSibling || false, sh = false, ids = ['fr', 'ph', 'vid', 'msg', 'nts', 'gr', 'ev', 'wsh', 'ap', 'ads', 'nws', 'wk', 'docs'];
  var lnks = ['friends', 'albums' + vk.id, 'video', '', 'notes', 'groups', 'events', 'gifts.php?act=wishlist', 'apps', ads_menu_link, 'feed' + (ge('l_nwsf') ? '?section=notifications' : ''), 'pages', 'docs'];
  var adds = ['', 'act=added', 'section=tagged', '', 'act=comments', '', 'tab=invitations', '', '', ads_menu_add, ge('l_nwsf') ? '' : 'section=notifications'];

  if (!params.handlecnts) {
    for (; i < 13; ++i) {
      vk.counts[ids[i]] = cnts[i];
    }
    return;
  }

  for (; i < 13; ++i) {
    handlePageCount(ids[i], cnts[i], lnks[i], adds[i]);
  }

  for (var e = sep.nextSibling; e; e = e.nextSibling) {
    if (e.tagName && e.tagName.toLowerCase() == 'li' && isVisible(e)) {
      sh = true;
      break;
    } else if (hasClass(e, 'more_div')) {
      break;
    }
  }
  (sh ? show : hide)(sep);
  for (var l = cnts.length; i < l; ++i) {
    var id_v = cnts[i].split(':'), e = ge('l_app' + intval(id_v[0]));
    if (!e) continue;

    handleSetCount(e, intval(id_v[1]));
  }
  setTimeout(updSeenAdsInfo, 0);
}
function handlePageCount(id, value, lnk, add) {
  var v = intval(value);
  if (vk.counts === undefined) vk.counts = {};
  if (vk.counts[id] === v) return;
  vk.counts[id] = v;

  var e = ge('l_' + id), toAdd, hc = hasClass(domFC(e), 'left_nav_over');
  if (e) {
    handleSetCount(e, (v > 0) ? v : 0, id);

    if (add && lnk) {
      toAdd = (v > 0 && add) ? ('?' + add) : '';
      e.firstChild.href = '/' + lnk + toAdd;
    }
  }
  if (v >= 0 || !hc) {
    toggle(e, v >= 0);
    toggle(_fMenuLnks[id], !!((v > 0) || (v == 0) && geByClass1('left_count_persist', e) || hc));
  }
}

function processDestroy(c) {
  if (c._back && c._back.hide && c == cur) {
    for (var i in c._back.hide) {
      try {
        c._back.hide[i]();
      } catch(e) {
        try { console.log(e.stack); } catch (e2) {}
      }
    }
  }
  if (!c.destroy || !c.destroy.length) return;
  for (var i in c.destroy) {
    try {
      c.destroy[i](c);
    } catch(e) {
      try { console.log(e.stack); } catch (e2) {}
    }
  }
}

var globalHistory = [];
function globalHistoryDestroy(loc) {
  for (var i = 0, l = globalHistory.length; i < l; ++i) {
    if (globalHistory[i].loc == loc) {
      var h = globalHistory.splice(i, 1)[0];
      processDestroy(h.cur);
      h.content.innerHTML = '';
      --i; --l;
    }
  }
}
function showBackLink(loc, text, fast) {
  var l = loc;
  loc = (loc || '').replace(/^\//, '');
  _tbLink.loc = loc;
  if (fast === undefined) {
    fast = 0;
    if (loc) {
      for (var i = 0, len = globalHistory.length; i < len; ++i) {
        if (globalHistory[i].loc == loc) {
          fast = 1;
          break;
        }
      }
    }
  }
  if (l) {
    try {
      _tbLink.style.maxWidth = (_tbLink.parentNode.offsetWidth - 35) + 'px';
    } catch (e) {}
    extend(_tbLink, {href: '/' + loc, innerHTML: text, fast: fast});
    show(_tbLink);
    _stlWas = 0;
  } else {
    hide(_tbLink);
  }
  if (!hasClass(ge('ts_wrap'), 'vk')) TopSearch.toggleTsWrap(!l);
  updSideTopLink(1);
}

function reloadCheckFlood(opts) {
  opts = opts || {};
  var reloaded = ls.get('last_reloaded') || [],
      reloadedLen = 1,
      reloadLimit = 5,
      reloadStop;

  reloaded.unshift(vkNow());
  if ((reloadedLen = reloaded.length) > reloadLimit) {
    reloaded.splice(reloadLimit, reloadedLen - reloadLimit);
    reloadedLen = reloadLimit;
  }
  ls.set('last_reloaded', reloaded);
  reloadStop = (reloadedLen == reloadLimit && reloaded[0] - reloaded[reloadLimit - 1] < 20000);

  debugLog('reload check flood', reloadStop, reloaded, reloadedLen, reloadLimit, reloaded[0] - reloaded[reloadLimit - 1]);
  if (reloadStop) {
    topError(
      '<b>Reloading error</b>, please check internet connection, <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.<br>If problem remains, please <a href="/support?act=new">report it here</a>.',
      {dt: 15, type: 6, msg: 'Reload error, from ' + (opts.from || 0) + ', forced ' + (opts.force || 0) + ', url ' + (opts.url || '') + ', query ' + (opts.query || '') }
    );
    return true;
  }
  return false;
}

var nav = {
  getData: function(loc) {
    if (loc.length) {
      for (var i in navMap) {
        if (i[0] == '<') continue;
        var m = loc.match(new RegExp('^' + i, 'i'));
        if (m) {
          return {url: navMap[i][0], files: navMap[i][1]};
        }
      }
      var m = loc.match(/^[a-z0-9\-_]+\.php$/i);
      if (m) {
        return {url: loc};
      }
      return {url: navMap['<other>'][0], files: navMap['<other>'][1]};
    }
    return {url: navMap['<void>'][0], files: navMap['<void>'][1]};


  },
  reload: function(opts) {
    if (reloadCheckFlood(opts)) return;
    opts = opts || {};
    if (opts.force) {
      hab.stop();
      location.href = '/' + nav.strLoc;
    } else {
      nav.go('/' + nav.strLoc, undefined, extend({nocur: true}, opts));
    }
  },

  link: function(loc, ev) {
    if (checkEvent(ev) || cur.noAjaxNav) {
      var loc = loc.replace(new RegExp('^(' + locProtocol + '//' + locHost + ')?/?', 'i'), '');
      window.open(loc)
    } else {
      nav.go(loc);
    }
  },

  go: function(loc, ev, opts) {
    if (checkEvent(ev) || cur.noAjaxNav) return;
    opts = opts || {};
    if (loc.tagName && loc.tagName.toLowerCase() == 'a') {
      if (loc.target == '_blank' || nav.baseBlank) {
        return;
      }
      var _params = loc.getAttribute('hrefparams');
      if (_params) {
        opts.params = extend(opts.params || {}, q2ajx(_params));
      }
      loc = loc.href || '';
      if (ev && !(loc || '').match(new RegExp('^' + locProtocol + '//' + locHost, 'i'))) {
        return;
      }
    }
    var strLoc = '', objLoc = {}, changed = {};
    if (typeof(loc) == 'string') {
      loc = loc.replace(new RegExp('^(' + locProtocol + '//' + locHost + ')?/?', 'i'), '');
      strLoc = loc;
      objLoc = nav.fromStr(loc);
    } else {
      if (!loc[0]) loc[0] = '';
      strLoc = nav.toStr(loc);
      objLoc = loc;
    }
    statDurationsLoadImage();
    statNavigationTiming();
    var _a = window.audioPlayer, aid = currentAudioId();
    if (_a && aid && (_a.gpDisabled || !ge('gp')) && !opts.back) _a.stop();
    if (_a && (_a.player && _a.player.paused() || !_a.player)) {
      _a.gpHidden = true;
      if (!opts.back && window.audioPlaylist && ls.get('pad_pltime')) {
        delete window.audioPlaylist;
        if (_a.id) _a.id = null;
      }
      updGlobalPlayer();
    }
    if (!opts.nocur) {
      changed = clone(objLoc);
      for (var i in nav.objLoc) {
        if (nav.objLoc[i] == changed[i]) {
          delete(changed[i]);
        } else if (changed[i] === undefined) {
          changed[i] = false;
        }
      }
      if (zNav(clone(changed), {hist: opts.hist}, objLoc) === false) {
        nav.setLoc(strLoc);
        return false;
      }
    }
    if (!opts.nocur && (vk.loaded || !changed['0'])) {
      for (var i in (cur.nav || {})) {
        var oldUrl = document.URL;
        if (cur.nav[i](clone(changed), nav.objLoc, objLoc, opts) === false) {
          var currentURL = locProtocol+'//'+location.host+'/'+strLoc,
              referrer = (oldUrl == currentURL) ? '' : oldUrl;
          setTimeout(updateOtherCounters.pbind(currentURL, referrer), 10);
          return false;
        }
      }
    }
    if (vk.al == 4 || (!vk.loaded && (!window.audioPlayer || !audioPlayer.player) && changed['0'])) {
      setTimeout(function() {
        location.href = '/' + (strLoc || '').replace('%23', '#');
      }, 0);
      return false;
    }

    if (opts.back) {
      if (cur._back && cur._back.onBack) {
        return cur._back.onBack();
      }
      for (var i = 0, l = globalHistory.length; i < l; ++i) {
        if (globalHistory[i].loc == strLoc) {
          var h = globalHistory.splice(i, 1)[0];
          var wNode = ge('wrap3'), tNode = ge('title');
          var onback = cur._onback;

          if (window.tooltips) tooltips.destroyAll();
          hide('audio_tip_wrap');
          processDestroy(cur);
          radioBtns = h.radioBtns;
          ajaxCache = h.ajaxCache;
          PageID = h.pid;
          boxQueue.hideAll();
          layerQueue.clear();
          if (layers.fullhide) layers.fullhide(true);

          showBackLink();

          if (!hasClass(ge('ts_wrap'), 'vk')) TopSearch.toggleTsWrap(true);

          cur = h.cur;
          if (gSearch.on) gSearch.hide();
          setTimeout(function() {
            wNode.innerHTML = '';
            wNode.parentNode.replaceChild(h.content, wNode);
            if (vk.width != h.width || vk.width_dec_footer != h.width_dec_footer) {
              handlePageView(h);
            }
            scrollToY(h.scrollTop, 0);
            document.title = h.htitle;
            tNode.innerHTML = h.title;
            if (h.bodyClass !== bodyNode.className) {
              bodyNode.className = h.bodyClass || '';
              vk.body_class = h.bodyClass || '';
            }
            setStyle(tNode.parentNode, 'display', h.hideHeader ? 'none' : 'block');
            for (var i = 0, l = cur._back.show.length; i < l; ++i) cur._back.show[i]();
            if (onback) {
              for (var i = 0, l = onback.length; i < l; ++i) onback[i]();
            }
            nav.setLoc(strLoc);
            var b = h.back || {};
            setTimeout(function() {
              showBackLink(b[0], b[1], b[2]);
              if (nav.objLoc.z || nav.objLoc.w) {
                zNav({z: nav.objLoc.z, w: nav.objLoc.w}, {});
              }
            }, 10);
            var _a = window.audioPlayer, aid = currentAudioId();
            if (_a && aid && _a.hideCurrentTrack && _a.showCurrentTrack) {
              _a.hideCurrentTrack();
              _a.showCurrentTrack();
            }
          }, 10);
          return false;
        }
      }
    }

    var dest = objLoc[0];
    delete(objLoc[0]);

    var where = nav.getData(dest);
    if (!opts.noframe) {
      opts.tstat = ajax.tGetParam();
      ajax.tStart = new Date().getTime();
      opts.bench = true;
    }
    if (!opts.params || !opts.params._ref) {
      opts.params = extend(opts.params || {}, {_ref: nav.objLoc[0] || ''});
    }
    if (where.files) {
      stManager.add(where.files);
    }
    where.params = extend({__query: dest, al_id: vk.id}, objLoc, opts.params || {});

    var post_id = (ev && ev.target && ev.target.getAttribute) ? ev.target.getAttribute('data-post-id') : '';
    var parent_post_id = post_id ? ev.target.getAttribute('data-parent-post-id') : '';
    if (!where.params['_post'] && post_id) {
      where.params['_post'] = post_id;
    }
    if (!where.params['_parent_post'] && parent_post_id) {
      where.params['_parent_post'] = parent_post_id;
    }
    if (opts.cl_id) {
      where.params.fr_click = cur.oid+','+opts.cl_id+','+cur.options.fr_click;
    }
    if (opts.tstat) {
      where.params._tstat = opts.tstat;
    }
    if (opts.permanent) {
      where.params._permanent = opts.permanent;
    }
    var curNavVersion = ++NextPageID;
    var done = function(title, html, js, params) {
      if (curNavVersion !== NextPageID) {
        return;
      }
      try {
        params._id = params.id;
      } catch(e) {
        return topError(e, {dt: 15, type: 6, msg: 'Error: ' + e.message + ', (params undefined?), title: ' + title + ', html: ' + html + ', js: ' + js, url: where.url, query: ajx2q(where.params), answer: arguments.length});
      }

      if (opts.bench) {
        ajax.tProcess = new Date().getTime();
      }

      if (stVersions['common.js'] > StaticFiles['common.js'].v) {
        nav.setLoc(params.loc || nav.strLoc);
        if (reloadCheckFlood({force: true, from: 4})) return;
        location.reload(true);
        return;
      }
      var newPage = (where.params.al_id === undefined) || (where.params.al_id != params.id) || params.fullPage;
      var _back = cur._back, wNode = ge('wrap3'), tNode = ge('title'), hist = false;
      if (strLoc == (cur._back || {}).loc || newPage || opts.back) {
        _back = false;
      }
      if (opts.noback || params.level && (!cur._level || params.level <= cur._level) && opts.noback !== false) {
        _back = false;
        if (opts.noback || (cur._level && params.level < cur._level)) {
          showBackLink();
        }
      }
      if (window.tooltips) tooltips.destroyAll();
      hide('audio_tip_wrap');
      if (gSearch.on) gSearch.hide();
      if (_back) {
        revertLastInlineVideo();
        hist = {
          loc: _back.loc || nav.strLoc,
          cur: cur,
          radioBtns: radioBtns,
          ajaxCache: ajaxCache,
          pid: PageID,
          scrollTop: scrollGetY(),
          htitle: document.title.toString(),
          width: vk.width,
          width_dec: vk.width_dec,
          width_dec_footer: vk.width_dec_footer,
          noleftmenu: vk.noleftmenu,
          notopmenu: vk.notopmenu,
          nobottommenu: vk.nobottommenu,
          bodyClass: vk.body_class,
          back: _tbLink.loc ? [_tbLink.loc, val(_tbLink), _tbLink.fast] : false
        };
        if (tNode && tNode.parentNode && !isVisible(tNode.parentNode)) {
          hist.hideHeader = true;
        }
        globalHistoryDestroy(hist.loc);
        if (globalHistory.length > 2) {
          var h = globalHistory.shift();
          processDestroy(h.cur);
          h.content.innerHTML = '';
        }
        for (var i = 0, l = cur._back.hide.length; i < l; ++i) cur._back.hide[i]();
        showBackLink(hist.loc, _back.text, 1);
      } else {
        _tbLink.fast = 0;
        processDestroy(cur);
      }
      PageID = NextPageID;
      radioBtns = {};
      ajaxCache = {};
      boxQueue.hideAll();
      layerQueue.clear();
      if (layers.fullhide) layers.fullhide(true);

      cur = {destroy: [], nav: []};
      _stlWas = 0;
      if (newPage) {
        cleanElems('quick_login_button', 'quick_expire', 'search_form', 'top_links', 'bottom_nav')
        while (globalHistory.length) {
          var h = globalHistory.shift();
          processDestroy(h.cur);
          h.content.innerHTML = '';
        }
        var oldTopW = ge('dev_top_nav_wrap') && getSize('dev_top_nav_wrap')[0] || 0;
        pageNode.innerHTML = html;
        if (ge('dev_top_nav_wrap') && oldTopW) {
          setStyle(ge('dev_top_nav_wrap'), 'width', oldTopW);
        }
        _tbLink = ge('top_back_link');
        try {
          _tbLink.style.maxWidth = (_tbLink.parentNode.offsetWidth - 35) + 'px';
        } catch (e) {}
        if (!browser.mobile) onBodyResize(true);
      } else {
        if (_back) {
          var newW = ce('div', {id: 'wrap3'});
          extend(hist, {
            content: wNode.parentNode.replaceChild(newW, wNode),
            title: tNode.innerHTML
          });
          globalHistory.push(hist);
          wNode = newW;
        }
        var oldTopW = ge('dev_top_nav_wrap') && getSize('dev_top_nav_wrap')[0] || 0;
        wNode.innerHTML = html;
        if (ge('dev_top_nav_wrap') && oldTopW) {
          setStyle(ge('dev_top_nav_wrap'), 'width', oldTopW);
        }
        tNode.innerHTML = title;
        (title ? show : hide)(tNode.parentNode);
      }

      handlePageParams(params);
      if (newPage) {
        initFixedMenu();
      }

      if (!opts.noscroll && !params.noscroll) scrollToTop(0);

      if (opts.bench) {
        ajax.tRender = new Date().getTime();
      }

      nav.curLoc = params.loc;
      if (js) {
        eval('(function(){' + js + ';})()');
      }
      ajax._framenext();

      if (opts.onDone) opts.onDone();

      if (browser.mobile) onBodyResize();

      if (changed.f) {
        handleScroll(changed.f);
      }

      lTimeout(function() {
        nav.setLoc(params.loc || '');
        var _a = window.audioPlayer, aid = currentAudioId();
        if (_a && aid && _a.showCurrentTrack) _a.showCurrentTrack();
        if (!isVisible('ts_wrap') && hasClass(ge('ts_wrap'), 'vk')) TopSearch.toggleSettings();
        if (TopSearch && TopSearch.tsNeedsClear) {
          TopSearch.clear();
          TopSearch.toggleInput(false);
          delete TopSearch.tsNeedsClear;
        }
      }, browser.chrome ? 100 : 50);
    }

    if (window.Page) {
      Page.postsSave();
      Page.postsSend();
      Page.postsClearTimeouts();
    }

    updSeenAdsInfo();
    __adsUpdate('already');
    if (_pads.shown) Pads.hide();
    ajax.post(where.url, where.params, {onDone: function() {
      var a = arguments;
      if (__debugMode) {
        done.apply(null, a);
      } else try {
        done.apply(null, a);
      } catch (e) {
        topError(e, {dt: 15, type: 6, url: where.url, query: ajx2q(where.params), js: a[2], answer: Array.prototype.slice.call(arguments).join('<!>')});
      }
    }, onFail: opts.onFail || function(text) {
      if (!text) return;

      setTimeout(showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text).hide, __debugMode ? 30000 : 3000);
      return true;
    }, frame: opts.noframe ? 0 : 1, canReload: true, showProgress: opts.showProgress || showTitleProgress, hideProgress: opts.hideProgress || hideTitleProgress, cache: opts.search ? 1 : '', bench: opts.bench});
    //setTimeout(nav.showPreload.pbind(ev, where), 0);
    return false;
  },
  setLoc: function(loc) {
    if (typeof(loc) == 'string') {
      nav.strLoc = loc;
      nav.objLoc = nav.fromStr(loc);
    } else {
      nav.strLoc = nav.toStr(loc);
      nav.objLoc = loc;
    }
    hab.setLoc(nav.strLoc);
  },
  change: function(loc, ev, opts) {
    var params = clone(nav.objLoc);
    each(loc, function(i,v) {
      if (v === false) {
        delete params[i];
      } else {
        params[i] = v;
      }
    });
    return nav.go(params, ev, opts);
  },
  fromStr: function(str) {
    str = str.split('#');
    var res = str[0].split('?');
    var param = {'0': res[0] || ''}
    if (str[1]) {
      param['#'] = str[1];
    }
    return extend(q2ajx(res[1] || ''), param);
  },
  toStr: function(obj) {
    obj = clone(obj);
    var hash = obj['#'] || '';
    var res = obj[0] || '';
    delete(obj[0]);
    delete(obj['#']);
    var str = ajx2q(obj);
    return (str ? (res + '?' + str) : res) + (hash ? ('#' + hash) : '');
  },
  init: function() {
    nav.strLoc = hab.getLoc();
    nav.objLoc = nav.fromStr(nav.strLoc);
  }
}

nav.init();

//
// Cookies
//

var _cookies;
function _initCookies() {
  _cookies = {};
  var ca = document.cookie.split(';');
  var re = /^[\s]*([^\s]+?)$/i;
  for (var i = 0, l = ca.length; i < l; i++) {
    var c = ca[i].split('=');
    if (c.length == 2) {
     _cookies[c[0].match(re)[1]] = unescape(c[1].match(re) ? c[1].match(re)[1] : '');
    }
  }
}
function getCookie(name) {
  _initCookies();
  return _cookies[name];
}
function setCookie(name, value, days, secure) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = '; expires='+date.toGMTString();
  }
  var domain = locDomain;
  document.cookie = name + '='+escape(value) + expires + '; path=/' + (domain ? '; domain=.' + domain : '') + ((secure && locProtocol == 'https:') ? '; secure' : '');
}

//
// Time offset stuff
//
if (vk.time && !browser.opera_mobile) setTimeout(function() {
  var t = new Date(), time = [0, t.getMonth() + 1, t.getDate(), t.getHours(), t.getMinutes()];
  if (time[1] == 1 && vk.time[1] == 12) {
    vk.time[1] = 0;
  } else if (time[1] == 12 && vk.time[1] == 1) {
    time[1] = 0;
  } else if (time[1] > vk.time[1] + 1 || vk.time[1] > time[1] + 1) {
    time[1] = vk.time[1] = time[2] = vk.time[2] = 0;
  }
  if (time[1] > vk.time[1] && time[2] == 1) {
    if (vk.time[2] == 31 || (vk.time[1] == 4 || vk.time[1] == 6 || vk.time[1] == 9 || vk.time[1] == 11) && vk.time[2] == 30 || vk.time[1] == 2 && (vk.time[2] == 29 || vk.time[2] == 28 && (vk.time[0] % 4))) {
      vk.time[2] = 0;
    } else {
      vk.time[2] = time[2] = 0;
    }
  } else if (vk.time[1] > time[1] && vk.time[2] == 1) {
    if (time[2] == 31 || (time[1] == 4 || time[1] == 6 || time[1] == 9 || time[1] == 11) && time[2] == 30 || time[1] == 2 && (time[2] == 29 || time[2] == 28 && (vk.time[0] % 4))) {
      time[2] = 0;
    } else {
      time[2] = vk.time[2] = 0;
    }
  }
  if (time[2] > vk.time[2] + 1 || vk.time[2] > time[2] + 1) {
    time[2] = vk.time[2] = 0;
  }

  var realDt = (((time[2] - vk.time[2]) * 24 + (time[3] - vk.time[3])) * 60 + (time[4] - vk.time[4])) * 60;
  if (realDt < -15.5 * 3600) {
    realDt += 24 * 3600;
  } else if (realDt > 10.5 * 3600) {
    realDt -= 24 * 3600;
  }
  var finalDt = 0, minDt = Math.abs(realDt), dts = [-12, -11, -10, -9, -8, -7, -6, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1, 0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 12, 13];
  for (var i in dts) {
    var dt = Math.round((dts[i] - 3) * 3600), checkDt = Math.abs(realDt - dt);
    if (checkDt < minDt) {
      minDt = checkDt;
      finalDt = dt;
    }
  }
  debugLog('Real time offset: ' + (realDt / 3600) + ', minDt: ' + minDt + ', final time offset: ' + (finalDt / 3600));
  vk.dt = finalDt;
  if (getCookie('remixdt') != vk.dt) {
    setCookie('remixdt', vk.dt, 365);
  }
  var rtc = intval(getCookie('remixrt'));
  if (window.devicePixelRatio >= 2 && (!browser.iphone || getCookie('remixme'))) {
    if (!(rtc & 1)) {
      setCookie('remixrt', rtc | 1, 365);
      window._retinaInit = function() {
        stManager.add(['retina.css']);
        addClass(document.body, 'is_2x');
      };
      if (window._initedCheck) {
        window._retinaInit();
      }
    }
  } else {
    if (rtc & 1) {
      setCookie('remixrt', rtc ^ 1, 365);
    }
  }
}, 0);
//
// Other stuff
//

function dispatchIntro(step, params) {
  if (typeof dispatchIntroEvent != 'undefined') {dispatchIntroEvent(step, params);}
}

function parseLatin(text){
  var outtext = text;
  var lat1 = ['yo','zh','kh','ts','ch','sch','shch','sh','eh','yu','ya','YO','ZH','KH','TS','CH','SCH','SHCH','SH','EH','YU','YA',"'"];
  var rus1 = ['¸', 'æ', 'õ', 'ö', '÷', 'ù',  'ù',   'ø', 'ý', 'þ', 'ÿ', '¨', 'Æ', 'Õ', 'Ö', '×', 'Ù',  'Ù',   'Ø', 'Ý', 'Þ', 'ß', 'ü'];
  for (var i = 0, l = lat1.length; i < l; i++) {
    outtext = outtext.split(lat1[i]).join(rus1[i]);
  }
  var lat2 = 'abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCY¸¨';
  var rus2 = 'àáâãäåçèéêëìíîïðñòóôõöûÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÛåÅ';
  for (var i = 0, l = lat2.length; i < l; i++) {
    outtext = outtext.split(lat2.charAt(i)).join(rus2.charAt(i));
  }
  return (outtext == text) ? null : outtext;
}

function parseCyr(text) {
  var outtext = text, i,
      lat1 = ['yo','zh','kh','ts','ch','sch','shch','sh','eh','yu','ya','YO','ZH','KH','TS','CH','SCH','SHCH','SH','EH','YU','YA',"'"],
      rus1 = ['¸', 'æ', 'õ', 'ö', '÷', 'ù',  'ù',   'ø', 'ý', 'þ', 'ÿ', '¨', 'Æ', 'Õ', 'Ö', '×', 'Ù',  'Ù',   'Ø', 'Ý', 'Þ', 'ß', 'ü'],
      lat2 = 'abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCY¸¨',
      rus2 = 'àáâãäåçèéêëìíîïðñòóôõöûÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÛåÅ';
  for (i = 0; i < rus1.length; i++) {
    outtext = outtext.split(rus1[i]).join(lat1[i]);
  }
  for (i = 0; i < rus2.length; i++) {
    outtext = outtext.split(rus2.charAt(i)).join(lat2.charAt(i));
  }
  return (outtext == text) ? null : outtext;
}

function parseLatKeys(text) {
  var outtext = text, i;
      lat = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`",
      rus = "éöóêåíãøùçõúôûâàïðîëäæýÿ÷ñìèòüáþ.¸";
  for (i = 0; i < lat.length; i++) {
    outtext = outtext.split(lat.charAt(i)).join(rus.charAt(i));
  }
  return (outtext == text) ? null : outtext;
}

function __phCheck(el, opts, focus, blur) {
  opts = opts || {};
  var shown = el.phshown, ph = el.phcont,
      back = opts.back, editable = opts.editable,
      phColor = opts.phColor || '#8C8E91',
      activeColor = opts.activeColor || '#C0C8D0';
  if (editable) {
    var v = (el.textContent !== undefined ? el.textContent : el.innerText) || geByTag('img', el).length;
  } else {
    var v = el.value;
  }
  if (shown && (back && v || !back && (focus && !focus.type || v))) {
    hide(ph);
    el.phshown = false;
  } else if (!shown && !v && (back || blur)) {
    show(ph);
    el.phshown = true;
    if (browser.opera && blur) {
      el.setAttribute('placeholder', ''); el.removeAttribute('placeholder', '');
    }
  }
  if (back && !v) {
    if (focus && !focus.type) {
      clearTimeout(el.phanim);
      el.phanim = setTimeout(function() {
        animate(ph.firstChild.firstChild, {color: activeColor}, 200);
      }, 100);
    }
    if (blur) {
      clearTimeout(el.phanim);
      el.phanim = setTimeout(function() {
        animate(ph.firstChild.firstChild, {color: phColor}, 200);
      }, 100);
    }
  }
}

function placeholderSetup(id, opts) {
  var el = ge(id);
  var disabled = false;
  var ph;
  var o = opts ? clone(opts) : {};
  if (!el || (el.phevents && !o.reload) || !(ph = (el.getAttribute ? el.getAttribute('placeholder') : el.placeholder))) {
    return;
  }

  el.removeAttribute('placeholder');

  var pad = {};
  var dirs = ['Top', 'Bottom', 'Left', 'Right'];
  if (o.pad) {
    pad = o.pad;
  } else {
    if (o.fast) {
      for (var i = 0; i < 4; ++i) {
        pad['padding' + dirs[i]] = 3;
        pad['margin' + dirs[i]] = 0;
      }
      extend(pad, o.styles || {});
    } else {
      var prop = [];
      for (var i = 0; i < 4; ++i) {
        prop.push('margin' + dirs[i]);
        prop.push('padding' + dirs[i]);
      }
      pad = getStyle(el, prop);
    }
    for (var i = 0; i < 4; ++i) { // add border 1px
      var key = 'margin' + dirs[i];
      pad[key] = (intval(pad[key]) + 1) + 'px';
    }
  }

  if (o.reload) {
    var prel = el.previousSibling;
    if (prel && hasClass(prel, 'input_back_wrap')) re(prel);
  }
  var b1 = el.phcont = el.parentNode.insertBefore(ce('div', {
    className: 'input_back_wrap no_select',
    innerHTML: '<div class="input_back"><div class="input_back_content' + (o.big ? ' big' : '') + '" style="width: ' + (getSize(el)[0] - 20) + 'px;">' + ph + '</div></div>'
  }), el);
  var b = domFC(b1);
  var c = domFC(b);
  setStyle(b, pad);

  var cv = __phCheck.pbind(el, o), checkValue = browser.mobile ? cv : function(f, b) {
    setTimeout(cv.pbind(f, b), 0);
  }

  if (browser.msie && browser.version < 8) {
    setStyle(b, {marginTop: 1});
  }
  el.phonfocus = function(hid) {
    if (disabled) {
      return;
    }
    el.focused = true;
    cur.__focused = el;
    if (hid === true) {
      setStyle(el, {backgroundColor: '#FFF'});
      hide(b);
    }
    checkValue(true, false);
  }
  el.phonblur = function() {
    if (disabled) {
      return;
    }
    cur.__focused = el.focused = false;
    show(b);
    checkValue(false, true);
  }
  el.phshown = true, el.phanim = null;

  if (el.value || (o.editable && ((el.textContent !== undefined ? el.textContent : el.innerText) || geByTag('img', el).length))) {
    el.phshown = false;
    hide(b1);
  }

  if (!browser.opera_mobile) {
    addEvent(b1, 'focus click', function(ev) {
      if (disabled) {
        return;
      }
      if (o.editableFocus) {
        setTimeout(o.editableFocus.pbind(el), 0);
        el.phonfocus();
      } else {
        el.blur(); el.focus();
      }
    });
    addEvent(el, 'focus'+(o.editable ? ' click' : ''), el.phonfocus);
    addEvent(el, 'keydown paste cut input', checkValue);
  }
  addEvent(el, 'blur', el.phonblur);
  el.check = checkValue;

  el.getValue = function() {
    return o.editable ? el.innerHTML : el.value;
  }

  el.setPlaceholder = function(ph) {
    geByClass1('input_back_content', b1).textContent = ph;
  },

  el.setDisabled = function(dis) {
    disabled = dis;
  },

  el.setValue = function(v) {
    if (o.editable) {
      el.innerHTML = v;
    } else {
      el.value = v;
    }
    __phCheck(el, o);
  }
  el.phevents = true;
  el.phonsize = function() {};

  if (o.global) return;

  if (!o.reload) {
    if (!cur.__phinputs) {
      cur.__phinputs = [];
      cur.destroy.push(function(__phinputs) {
        for (var i = 0, l = __phinputs.length; i < l; ++i) {
          removeData(__phinputs[i]);
        }
      }.pbind(cur.__phinputs));
    }
    cur.__phinputs.push(el);
  }
}

function val(input, value, nofire) {
  input = ge(input);
  if (!input) return;

  if (value !== undefined) {
    if (input.setValue) {
      input.setValue(value);
      !nofire && input.phonblur && input.phonblur();
    } else if (input.tagName == 'INPUT' || input.tagName == 'TEXTAREA') {
      input.value = value
    } else if (input.emojiId !== undefined && window.Emoji) {
      Emoji.val(input, value);
    } else {
      input.innerHTML = value
    }
  }
  return input.getValue ? input.getValue() :
         (((input.tagName == 'INPUT' || input.tagName == 'TEXTAREA') ? input.value : input.innerHTML) || '');
}

function elfocus(el, from, to) {
  el = ge(el);
  try {
    el.focus();
    if (from === undefined || from === false) from = el.value.length;
    if (to === undefined || to === false) to = from;
    if (el.createTextRange) {
      var range = el.createTextRange();
      range.collapse(true);
      range.moveEnd('character', to);
      range.moveStart('character', from);
      range.select();
    } else if (el.setSelectionRange) {
      el.setSelectionRange(from, to);
    }
  } catch(e) {}
}

// Message box
var _message_box_guid = 0, _message_boxes = [], _show_flash_timeout = 0;

var __bq = boxQueue = {
  hideAll: function() {
    if (__bq.count()) {
      var box = _message_boxes[__bq._boxes.pop()];
      box._in_queue = false;
      box._hide();
    }
    while (__bq.count()) {
      var box = _message_boxes[__bq._boxes.pop()];
      box._in_queue = false;
    }
  },
  hideLast: function(check, e) {
    if (__bq.count()) {
      var box = _message_boxes[__bq._boxes[__bq.count() - 1]];
      if (check === true && (box.changed || __bq.skip || e && e.target && e.target.tagName && e.target.tagName.toLowerCase() != 'input' && cur.__mdEvent && e.target != cur.__mdEvent.target)) {
        __bq.skip = false;
        return;
      }
      box.hide();
    }
    if (e && e.type == 'click') return cancelEvent(e);
  },
  hideBGClick: function(e) {
    if (e && e.target && /^box_layer/.test(e.target.id)) {
      __bq.hideLast();
    }
  },
  count: function() {
    return __bq._boxes.length;
  },
  _show: function(guid) {
    var box = _message_boxes[guid];
    if (!box || box._in_queue) return;
    if (__bq.count()) {
      _message_boxes[__bq._boxes[__bq.count() - 1]]._hide(true, true);
    } else if (window.tooltips) {
      tooltips.hideAll();
    }
    box._in_queue = true;
    var notFirst = __bq.count() ? true : false;
    __bq.curBox = guid;
    box._show(notFirst || __bq.currHiding, notFirst);
    __bq._boxes.push(guid);
  },
  _hide: function(guid) {
    var box = _message_boxes[guid];
    if (!box || !box._in_queue || __bq._boxes[__bq.count() - 1] != guid || !box.isVisible()) return;
    box._in_queue = false;
    __bq._boxes.pop();
    box._hide(__bq.count() ? true : false);
    if (__bq.count()) {
      var prev_guid = __bq._boxes[__bq.count() - 1];
      __bq.curBox = prev_guid;
      _message_boxes[prev_guid]._show(true, true, true);
    }
  },
  _boxes: [],
  curBox: 0
}

__bq.hideLastCheck = __bq.hideLast.pbind(true);
function curBox() { var b = _message_boxes[__bq.curBox]; return (b && b.isVisible()) ? b : null; }

if (!browser.mobile) {
  addEvent(document, 'keydown', function(e) {
    _wf = 1;
    if (e.keyCode == KEY.ESC && __bq.count() && !cur._noEscHide) {
      __bq.hideLast();
      return -1;
    }
    var mediaKeys = [176, 177, 178, 179], isMedia = false;
    if (window.audioPlayer) {
      mediaKeys.push(KEY.LEFT);
      mediaKeys.push(KEY.RIGHT);
    }
    each(mediaKeys, function(k, v){
      if (e.keyCode == v) {
        isMedia = true;
        return false;
      }
    });
    if (isMedia) {
      if (window.audioPlayer) {
        audioPlayer.keyPressed(false, e);
      } else {
        stManager.add(['audioplayer.js'], function() {
          audioPlayer.keyPressed(false, e);
        });
      }
    }
    if (Chat.inited) {
      if (e.keyCode == 191 && (e.ctrlKey || (e.metaKey && browser.mac))) {
        Chat.showFriends();
      }
    }
  });
}

function boxRefreshCoords(cont) {
  var height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight);
  var top = browser.mobile ? intval(window.pageYOffset) : 0;
  containerSize = getSize(cont);
  cont.style.marginTop = Math.max(10, top + (height - containerSize[1]) / 3) + 'px';
}

function MessageBox(options, dark) {
  var defaults = {
    title: false,
    width: 410,
    height: 'auto',
    animSpeed: 0,
    bodyStyle: '',
    dark: false,
    selfDestruct: true,
    progress: false,
    hideOnBGClick: false,
    hideButtons: false,
    onShow: false,
    onHideAttempt: false,
    onBeforeHide: false,
    onHide: false,
    onClean: false,
    onDestroy: false
  };

  options = extend(defaults, options);
  if (dark) {
    options.dark = 1;
  }

  var buttonsCount = 0,
      boxContainer, boxBG, boxLayout;
  var boxTitleWrap, boxTitle, boxCloseButton, boxBody;
  var boxControlsWrap, boxControls, boxButtons, boxProgress, boxControlsText;
  var guid = _message_box_guid++, visible = false;

  if (!options.progress) options.progress = 'box_progress' + guid;

  var controlsStyle = options.hideButtons ? ' style="display: none"' : '';
  boxContainer = ce('div', {
    className: 'popup_box_container'+(options.dark ? ' box_dark' : '')+(options.containerClass ? ' '+options.containerClass : ''),
    innerHTML: '\
<div class="box_layout" onclick="__bq.skip=true;">\
<div class="box_title_wrap"><div class="box_x_button">'+(options.dark ? getLang('global_close') : '')+'</div><div class="box_title"></div></div>\
<div class="box_body" style="' + options.bodyStyle + '"></div>\
<div class="box_controls_wrap"' + controlsStyle + '><div class="box_controls">\
<table cellspacing="0" cellpadding="0" class="fl_r"><tr></tr></table>\
<div class="progress" id="' + options.progress + '"></div>\
<div class="box_controls_text"></div>\
</div></div>\
</div>'
  }, {
    display: 'none'
  });
  hide(boxContainer);

  boxLayout = domFC(boxContainer);

  boxTitleWrap = domFC(boxLayout);
  boxCloseButton = domFC(boxTitleWrap);
  boxTitle = domNS(boxCloseButton);

  if (options.noCloseButton) hide(boxCloseButton);

  boxBody = domNS(boxTitleWrap);

  boxControlsWrap = domNS(boxBody);
  boxControls = domFC(boxControlsWrap);
  boxButtons = domFC(boxControls);
  boxProgress = domNS(boxButtons);
  boxControlsText = domNS(boxProgress);

  boxLayer.appendChild(boxContainer);

  refreshBox();
  boxRefreshCoords(boxContainer);

  // Refresh box properties
  function refreshBox() {
    // Set title
    if (options.title) {
      boxTitle.innerHTML = options.title;
      removeClass(boxBody, 'box_no_title');
      show(boxTitleWrap);
    } else {
      addClass(boxBody, 'box_no_title');
      hide(boxTitleWrap);
    }

    // Set box dimensions
    boxContainer.style.width = typeof(options.width) == 'string' ? options.width : options.width + 'px';
    boxContainer.style.height = typeof(options.height) == 'string' ? options.height : options.height + 'px';
  }

  // Add button
  function addButton(label, onclick, type) {
    if (options.dark && type == 'no' && !options.forceNoBtn) {
      return false;
    }
    ++buttonsCount;
    var btnClass = 'flat_button';
    if (type == 'no' || type == 'gray') {
      btnClass += ' secondary';
    }
    var buttonWrap = ce('button', {
      className: btnClass,
      innerHTML: label
    }), row = boxButtons.rows[0], cell = row.insertCell(0);
    cell.appendChild(buttonWrap);
    createButton(buttonWrap, onclick);
    return buttonWrap;
  }

  // Add custom controls text
  function setControlsText(text) {
    boxControlsText.innerHTML = text;
  }

  // Remove buttons
  function removeButtons() {
    var row = boxButtons.rows[0];
    while (row.cells.length) {
      cleanElems(row.cells[0]);
      row.deleteCell(0);
    }
  }

  var destroyMe = function() {
    if (isFunction(options.onClean)) options.onClean();
    if (isFunction(options.onDestroy)) options.onDestroy();
    removeButtons();
    cleanElems(boxContainer, boxCloseButton, boxTitleWrap, boxControlsWrap);
    boxLayer.removeChild(boxContainer);
    delete _message_boxes[guid];
  }

  // Hide box
  var hideMe = function(showingOther, tempHiding) {
    if (!visible) return;
    visible = false;

    var speed = (showingOther === true) ? 0 : options.animSpeed;

    if (options.hideOnBGClick) {
      removeEvent(document, 'click', __bq.hideBGClick);
    }

    if (isFunction(options.onBeforeHide)) {
      options.onBeforeHide();
    }

    if (_layerAnim && !showingOther) {
      layers.boxhide();
    }

    var onHide = function() {
      if (__bq.currHiding == _message_boxes[guid]) {
        __bq.currHiding = false;
      }
      if (!_layerAnim && !_message_boxes[guid].shOther && !showingOther) {
        layers.boxhide();
      }
      if (!tempHiding && options.selfDestruct) {
        destroyMe();
      } else {
        hide(boxContainer);
      }
      if (isFunction(options.onHide)) {
        options.onHide();
      }
    }
    if (speed > 0) {
      __bq.currHiding = _message_boxes[guid];
      fadeOut(boxContainer, speed, onHide);
    } else {
      onHide();
    }
  }

  // Show box
  function showMe(noAnim, notFirst, isReturned) {
    if (visible || !_message_boxes[guid]) return;
    visible = true;

    var speed = (noAnim === true || notFirst) ? 0 : options.animSpeed;

    if (options.hideOnBGClick) {
      addEvent(document, 'click', __bq.hideBGClick);
    }

    // Show blocking background
    if (!notFirst) {
      layers.boxshow();
    }

    if (__bq.currHiding) {
      __bq.currHiding.shOther = true;
      var cont = __bq.currHiding.bodyNode.parentNode.parentNode;
      data(cont, 'tween').stop(true);
    }

    // Show box
    if (speed > 0) {
      fadeIn(boxContainer, speed);
    } else {
      show(boxContainer);
    }

    boxRefreshCoords(boxContainer);
    if (options.onShow) {
      options.onShow(isReturned);
    }

    _message_box_shown = true;

    if (options.dark) {
      addClass(boxLayerBG, 'bg_dark');
    }
  }

  var fadeToColor = function(color) {
    return function() {
      animate(this, {backgroundColor: color}, 200);
    }
  }
  if (!options.dark) {
    addEvent(boxCloseButton, 'mouseover', fadeToColor('#FFFFFF'));
    addEvent(boxCloseButton, 'mouseout', fadeToColor('#9DB7D4'));
  }
  addEvent(boxCloseButton, 'click', __bq.hideLast);

  var retBox = _message_boxes[guid] = {
    guid: guid,
    _show: showMe,
    _hide: hideMe,

    bodyNode: boxBody,

    dark: options.dark,

    // Show box
    show: function() {
      __bq._show(guid);
      return this;
    },
    progress: boxProgress,
    showProgress: function() {
      hide(boxControlsText);
      show(boxProgress);
    },
    hideProgress: function() {
      hide(boxProgress);
      show(boxControlsText);
    },

    // Hide box
    hide: function(attemptParam) {
      if (isFunction(options.onHideAttempt) && !options.onHideAttempt(attemptParam)) return false;
      if (options.dark) {
        removeClass(boxLayerBG, 'bg_dark');
      }
      __bq._hide(guid);
      return true;
    },

    isVisible: function() {
      return visible;
    },
    bodyHeight: function() {
      return getStyle(boxBody, 'height');
    },

    // Insert html content into the box
    content: function(html) {
      if (options.onClean) options.onClean();
      boxBody.innerHTML = html;
      boxRefreshCoords(boxContainer);
      refreshBox();
      return this;
    },

    // Add button
    addButton: function(label, onclick, type, returnBtn) {
      var btn = addButton(label, onclick ? onclick : this.hide, type);
      return (returnBtn) ? btn : this;
    },

    setButtons: function(yes, onYes, no, onNo) {
      var b = this.removeButtons();
      if (!yes) return b.addButton(box_close);
      if (no) b.addButton(no, onNo, 'no');
      return b.addButton(yes, onYes);
    },

    // Set controls text
    setControlsText: setControlsText,

    // Remove buttons
    removeButtons: function() {
      removeButtons();
      return this;
    },

    destroy: destroyMe,

    // Update box options
    setOptions: function(newOptions) {
      if (options.hideOnBGClick) {
        removeEvent(document, 'click', __bq.hideBGClick);
      }
      options = extend(options, newOptions);
      if ('bodyStyle' in newOptions) {
        var items = options.bodyStyle.split(';');
        for (var i = 0, l = items.length; i < l; ++i) {
          var name_value = items[i].split(':');
          if (name_value.length > 1 && name_value[0].length) {
            boxBody.style[trim(name_value[0])] = trim(name_value[1]);
            if (boxBody.style.setProperty) {
              boxBody.style.setProperty(trim(name_value[0]), trim(name_value[1]), '');
            }
          }
        }
      }
      if (options.hideOnBGClick) {
        addEvent(document, 'click', __bq.hideBGClick);
      }
      toggle(boxControlsWrap, !options.hideButtons);
      refreshBox();
      boxRefreshCoords(boxContainer);
      return this;
    },
    evalBox: function(js, url, params) {
      var scr = '((function() { return function() { var box = this; ' + (js || '') + ';}; })())'; // IE :(
      if (__debugMode) {
        var fn = eval(scr);
        fn.apply(this, [url, params]);
      } else try {
        var fn = eval(scr);
        fn.apply(this, [url, params]);
      } catch (e) {
        topError(e, {dt: 15, type: 7, url: url, query: params ? ajx2q(params) : undefined, js: js});
      }
    }
  }
  return retBox;
}

function showBox(url, params, options, e) {
  if (checkEvent(e)) return false;

  var opts = options || {};
  var boxParams = opts.params || {};
  if (opts.dark) {
    boxParams.dark = opts.dark;
  }
  if (opts.containerClass) {
    boxParams.containerClass = opts.containerClass;
  }
  var box = new MessageBox(boxParams);
  var p = {
    onDone: function(title, html, js, data) {
      if (opts.onDone) {
        opts.onDone(box);
      }
      if (!box.isVisible()) return;
      try {
        show(boxLayerBG);
        box.setOptions({title: title, hideButtons: boxParams.hideButtons || false});
        if (opts.showProgress) {
          box.show();
        } else {
          show(box.bodyNode);
        }
        box.content(html);
        box.evalBox(js, url, params);
        if (opts.onDone) opts.onDone(box, data);
      } catch(e) {
        topError(e, {dt: 15, type: 103, url: url, query: ajx2q(params), answer: Array.prototype.slice.call(arguments).join('<!>')});
        if (box.isVisible()) box.hide();
      }
    },
    onFail: function(error) {
      box.failed = true;
      setTimeout(box.hide, 0);
      if (isFunction(opts.onFail)) return opts.onFail(error);
    },
    cache: opts.cache,
    stat: opts.stat,
    fromBox: true
  };

  if (opts.prgEl) {
    opts.showProgress = showGlobalPrg.pbind(opts.prgEl, {cls: opts.prgClass, w: opts.prgW, h: opts.prgH, hide: true});
    opts.hideProgress = hide.pbind('global_prg');
  }
  if (opts.showProgress) {
    extend(p, {
      showProgress: opts.showProgress,
      hideProgress: opts.hideProgress
    });
  } else {
    box.setOptions({title: false, hideButtons: true}).show();
    if (__bq.count() < 2) {
      hide(boxLayerBG);
    }
    hide(box.bodyNode);
    p.showProgress = function() {
      show(boxLoader);
      boxRefreshCoords(boxLoader);
    }
    p.hideProgress = hide.pbind(boxLoader);
  }
  box.removeButtons().addButton(getLang('global_close'));

  ajax.post(url, params, p);
  return box;
}

function showTabbedBox(url, params, options, e) {
  options = options || {};
  options.stat = options.stat || [];
  options.stat.push('box.js', 'boxes.css');
  return showBox(url, params, options, e)
}

function showFastBox(o, c, yes, onYes, no, onNo) {
  return (new MessageBox(typeof(o) == 'string' ? {title: o} : o)).content(c).setButtons(yes, onYes, no, onNo).show();
}

function showCaptchaBox(sid, dif, box, o) {
  var done = function(e) {
    if (e && e.keyCode !== undefined && e.keyCode != 10 && e.keyCode != 13) return;
    var key = geByTag1('input', box.bodyNode);
    if (!trim(key.value) && e !== true) {
      elfocus(key);
      return;
    }
    var imgs = geByTag1('img', box.bodyNode);
    var captcha = imgs[0], loader = imgs[1];
    removeEvent(key);
    removeEvent(captcha);
    show(geByClass1('progress', box.bodyNode));
    hide(key);
    o.onSubmit(sid, key.value);
  }
  var was_box = box ? true : false;
  var difficulty = intval(dif) ? '' : '&s=1';
  var imgSrc = o.imgSrc || '/captcha.php?sid=' + sid + difficulty;
  if (!was_box) {
    var content = '\
<div class="captcha">\
  <div><img src="' + imgSrc + '"/></div>\
  <div><input type="text" class="big_text" maxlength="7" placeholder="' + getLang('global_captcha_input_here') + '" /><div class="progress" /></div></div>\
</div>' + (o.addText || '');
    box = showFastBox({
      title: getLang('captcha_enter_code'),
      dark: 1,
      width: 305,
      onHide: o.onHide,
      onDestroy: o.onDestroy || false
    }, content, getLang('captcha_send'), function() {
      box.submit();
    }, getLang('captcha_cancel'), function() {
      var key = geByTag1('input', box.bodyNode);
      var captcha = geByTag1('img', box.bodyNode);
      removeEvent(key);
      removeEvent(captcha);
      box.hide();
    });
  }
  box.submit = done.pbind(true);
  box.changed = true;
  var key = geByTag1('input', box.bodyNode);
  var captcha = geByTag1('img', box.bodyNode);
  if (was_box) {
    key.value = '';
    captcha.src = '/captcha.php?sid=' + sid + difficulty;
    hide(geByClass1('progress', box.bodyNode));
  }
  show(key);
  addEvent(key, 'keypress', done);
  addEvent(captcha, 'click', function() {
    this.src = '/captcha.php?sid=' + sid + difficulty + '&v=' + irand(1000000, 2000000);
  });
  elfocus(key);
  return box;
}

// Three-state button

function createButton(el, onClick) {
  el = ge(el);
  if (!el || el.btnevents) return;
  if (hasClass(el, 'flat_button')) {
    if (isFunction(onClick)) {
      el.onclick = onClick.pbind(el);
    }
    return;
  }
  var p = el.parentNode;
  if (hasClass(p, 'button_blue') || hasClass(p, 'button_gray')) {
    if (isFunction(onClick)) {
      el.onclick = onClick.pbind(el);
    }
    return;
  }
  var hover = false;
  addEvent(el, 'click mousedown mouseover mouseout', function(e) {
    if (hasClass(p, 'locked')) return;
    switch (e.type) {
    case 'click':
      if (!hover) return;
      el.className = 'button_hover';
      onClick(el);
      return cancelEvent(e);
    break;
    case 'mousedown':
      el.className = 'button_down';
    break;
    case 'mouseover':
      hover = true;
      el.className = 'button_hover';
    break;
    case 'mouseout':
      el.className = 'button';
      hover = false;
    break;
    }
  });
  el.btnevents = true;
}

function lockButton(el) {
  if (!(el = ge(el))) return;
  if (hasClass(el, 'flat_button')) {
    lockFlatButton(el);
    return;
  }
  var btn = (el.tagName.toLowerCase() === 'button');
  if (!btn && !hasClass(el, 'file_button')) {
    var elButton = geByTag1('button', el);
    if (!elButton || elButton.parentNode != el) return;
    el = elButton;
    btn = true;
  }
  if (buttonLocked(el)) return;
  var d = btn ? 0 : ((browser.msie6 || browser.msie7) ? 2 : 4);
  var tEl = btn ? el : geByClass1('file_button_text', el);
  var lock = ce('span', {className: 'button_lock'});
  el.parentNode.insertBefore(lock, el);
  el['old_width'] = el.style.width;
  el['old_height'] = el.style.height;
  var s = getSize(el.parentNode);
  setStyle(el, {width: s[0] - d, height: s[1] - d});
  if (browser.msie6 || browser.msie7) {
    tEl['old_html'] = tEl.innerHTML;
    tEl.innerHTML = '';
  } else {
    tEl.style.textIndent = '-9999px';
  }
}
function unlockButton(el) {
  if (!(el = ge(el))) return;
  if (hasClass(el, 'flat_button')) {
    unlockFlatButton(el);
    return;
  }
  var btn = (el.tagName.toLowerCase() === 'button');
  if (!btn && !hasClass(el, 'file_button')) {
    var elButton = geByTag1('button', el);
    if (!elButton || elButton.parentNode != el) return;
    el = elButton;
    btn = true;
  }
  var lock = geByClass1('button_lock', el.parentNode, 'span');
  var tEl = btn ? el : geByClass1('file_button_text', el);
  if (!lock) return;
  el.parentNode.removeChild(lock);
  el.style.width = el['old_width'];
  el.style.height = el['old_height'];
  if (browser.msie6 || browser.msie7) tEl.innerHTML = tEl['old_html'];
  tEl.style.textIndent = '';
}
function buttonLocked(el) {
  if (!(el = ge(el))) return;
  if (hasClass(el, 'flat_button')) {
    return isButtonLocked(el);
  }
  return geByClass1('button_lock', el.parentNode, 'span') ? true : false;
}

function lockFlatButton(el) {
  if (!el || el.tagName.toLowerCase() != 'button' || isButtonLocked(el)) return;
  addClass(el, 'flat_btn_lock');
  el.innerHTML = '<span class="flat_btn_h">'+el.innerHTML+'</span>';
}
function unlockFlatButton(el) {
  if (!isButtonLocked(el)) return;
  el.innerHTML = el.firstChild.innerHTML;
  removeClass(el, 'flat_btn_lock');
}
function isButtonLocked(el) {
  if (!(el = ge(el))) return;
  return hasClass(el, 'flat_btn_lock');
}

function disableButton(el, disable) {
  if (!(el = ge(el)) || el.tagName.toLowerCase() !== 'button') return;
  if (hasClass(el, 'flat_button')) {
    return disableFlatButton(el, disable);
  }

  toggleClass(el.parentNode, 'button_disabled', !!disable);
  if (disable) {
    el.parentNode.insertBefore(ce('button', {innerHTML: el.innerHTML, className: 'disabled'}), el);
    hide(el);
  } else {
    var disabledEl = geByClass1('disabled', el.parentNode);
    if (disabledEl) re(disabledEl);
    show(el);
  }
}

function disableFlatButton(el, disable) {
  if (!(el = ge(el)) || el.tagName.toLowerCase() !== 'button') return;

  if (disable) {
    el.parentNode.insertBefore(ce('button', {innerHTML: el.innerHTML, className: el.className + ' button_disabled'}), el);
    hide(el);
  } else {
    var disabledEl = domPS(el);
    if (disabledEl && hasClass(disabledEl, 'button_disabled')) re(disabledEl);
    show(el);
  }
}

function sbWidth(force) {
  if (window._sbWidth === undefined || force) {
    var t = ce('div', {innerHTML: '<div style="height: 75px;">1<br>1</div>'}, {
      overflowY: 'scroll',
      position: 'absolute',
      width: '50px',
      height: '50px'
    });
    bodyNode.appendChild(t);
    window._sbWidth = Math.max(0, t.offsetWidth - t.firstChild.offsetWidth - 1);
    bodyNode.removeChild(t);
  }
  return window._sbWidth;
}

function checkTextLength(maxLen, inp, warn, nobr, cut, force, utf) {
  var value = (inp.getValue) ? inp.getValue() : inp.value,
      lastLen = inp.lastLen || 0;
  if (inp.lastLen === value.length && !force) return;
  inp.lastLen = value.length;
  var spec = {'&':5,'<':4,'>':4,'"':6,"\n":(nobr?1:4),"\r":0,'!':5,"'":5,'$':6,'\\':6},
      good = {0x490:1,0x491:1,0x2013:1,0x2014:1,0x2018:1,0x2019:1,0x201a:1,0x2026:1,0x2030:1,0x2039:1,0x203a:1,0x20ac:1,0x2116:1,0x2122:1,0xfffd:1},
      bad = {0x40d:1,0x450:1,0x45d:1};
  if (cut) spec[','] = 5;
  var countRealLen = function(text, nobr) {
    var res = 0;
    for (var i = 0, l = text.length; i < l; i++) {
      var k = spec[text.charAt(i)], c = text.charCodeAt(i);
      if (k !== undefined) {
        res += k;
      } else if (!utf && c >= 0x80 && (c < 0x401 || bad[c] || c > 0x45f) && !good[c] && (c < 0x201c || c > 0x201e) && (c < 0x2020 || c > 0x2022)) {
        res += ('&#' + c + ';').length;
      } else {
        res += 1;
      }
    }
    return res;
  };
  var realCut = function(text, len) {
    var curLen = 0, res = '';
    for (var i = 0, l = text.length; i < l; i++) {
      var symbol = text.charAt(i), k = spec[symbol], c = text.charCodeAt(i);
      if (k !== undefined) {
        curLen += k;
      } else if (!utf && c >= 0x80 && (c < 0x401 || bad[c] || c > 0x45f) && !good[c] && (c < 0x201c || c > 0x201e) && (c < 0x2020 || c > 0x2022)) {
        curLen += ('&#' + c + ';').length;
      } else {
        curLen += 1;
      }
      if (curLen > len) break;
      res += symbol;
    }
    return res;
  }
  var realLen = countRealLen(value, nobr);
  warn = ge(warn);
  if (realLen > maxLen - 100) {
    show(warn);
    if (realLen > maxLen) {
      if (cut) {
        var cutVal = val(inp, realCut(value, Math.min(maxLen, lastLen)));
        inp.lastLen = cutVal.length;
        warn.innerHTML = getLang('text_N_symbols_remain', 0);
      } else {
        warn.innerHTML = getLang('text_exceeds_symbol_limit', realLen - maxLen);
      }
    } else {
      warn.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
    }
  } else {
    hide(warn);
  }
}

function autosizeSetup(el, options) {
  el = ge(el);
  if (!el) return;
  if (el.autosize) {
    el.autosize.update();
    return;
  }

  options.minHeight = intval(options.minHeight) || intval(getStyle(el, 'height'));
  options.maxHeight = intval(options.maxHeight);

  var elwidth = intval(getStyle(el, 'width')),
      fs = getStyle(el, 'fontSize'),
      lh;
  if (elwidth < 1) {
    elwidth = intval(getStyle(el, 'width', false));
  }
  if (fs.indexOf('em') > 0) {
    fs = floatval(fs) * vk.fs;
  }
  fs = intval(fs);
  el.autosize = {
    options: options,
    helper: ce('textarea', {className: 'ashelper'}, {
      width: elwidth,
      height: 10,
      fontFamily: getStyle(el, 'fontFamily'),
      fontSize: fs + 'px',
      lineHeight: (lh = getStyle(el, 'lineHeight'))
    }),
    handleEvent: function(v, e) {
      var ch = e.charCode ? String.fromCharCode(e.charCode) : e.charCode;
      if (ch === undefined) {
        ch = String.fromCharCode(e.keyCode);
        if (e.keyCode == 10 || e.keyCode == 13) {
          ch = '\n';
        } else if (!browser.msie && e.keyCode <= 40) {
          ch = '';
        }
      }
      if (!ch) {
        return v;
      }
      if (!browser.msie) {
        return v.substr(0, el.selectionStart) + ch + v.substr(el.selectionEnd);
      }
      var r = document.selection.createRange();
      if (r.text) {
        v = v.replace(r.text, '');
      }
      return v + ch;
    },
    update: function(e) {
      var value = el.value;
      if (e && e.type != 'blur' && e.type != 'keyup' && (!browser.msie || e.type == 'keypress')) {
        if (!e.ctrlKey && !e.altKey && !e.metaKey) {
          value = el.autosize.handleEvent(value, e);
        }
      }
      if (!value) {
        value = ' ';
      }
      if (el.autosize.helper.value != value) {
        el.autosize.helper.value = value;
      }
      var opts = el.autosize.options;

      var oldHeight = getSize(el, true)[1];
      var newHeight = el.autosize.helper.scrollHeight, df;
      if (opts.exact && (df = newHeight % lh) > 2) {
        newHeight -= (df - 2);
      }
      if (newHeight < opts.minHeight) {
        newHeight = opts.minHeight;
      }
      var newStyle = {overflow: 'hidden'}, curOverflow = getStyle(el, 'overflow').indexOf('auto') > -1 ? 'auto' : 'hidden';
      if (opts.maxHeight && newHeight > opts.maxHeight) {
        newHeight = opts.maxHeight;
        extend(newStyle, {overflow: 'auto', overflowX: 'hidden'});
      }
      if (oldHeight != newHeight || curOverflow != newStyle.overflow) {
        newStyle.height = newHeight;
        setStyle(el, newStyle);
        if (isFunction(opts.onResize)) {
          opts.onResize(newHeight);
        }
      }
    }
  }
  if (options.exact) {
    if (lh == 'normal') lh = '120%';
    lh = intval((lh.indexOf('%') > 0) ? fs * intval(lh) / 100 : lh);
  }
  utilsNode.appendChild(el.autosize.helper);
  if (browser.opera_mobile) {
    setStyle(el, {overflow: 'hidden'});
    el.autosize.update();
    addEvent(el, 'blur', el.autosize.update);
  } else {
    addEvent(el, 'keydown keyup keypress', el.autosize.update);
    setTimeout(function() {
      setStyle(el, {overflow: 'hidden', resize: 'none'});
      el.autosize.update();
      var t = val(el); val(el, ' ', true); val(el, t, true);
    }, 0);
  }
}

function goAway(lnk, prms, e) {
  if ((prms || {}).h != -1 || checkEvent(e)) {
    return true;
  }
  if ((prms || {}).h != -1) {
    var m = lnk.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i);
    if (m && m[1].toLowerCase() != 'api.') {
      location.href = lnk;
      return false;
    }
    var no_warning = intval(getCookie('remixsettings_bits'));
    if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(locBase) || no_warning & 1) {
      window.open('/away.php?to=' + encodeURIComponent(lnk) + ((prms && prms.h !== undefined) ? '&h=' + prms.h : ''), '_blank');
      return false;
    }
  }
  var params = extend({act: 'a_go', to: lnk}, prms || {});
  return !showBox('away.php', params, {dark: true}, e);
}

function isChecked(el) {
  el = ge(el);
  return hasClass(el, 'on') ? 1 : '';
}
function checkbox(el, v) {
  el = ge(el);
  if (!el || hasClass(el, 'disabled')) return;

  if (v === undefined) {
    v = !isChecked(el);
  }
  toggleClass(el, 'on', v);
  return false;
}

function disable(el, v) {
  el = ge(el);

  if (v === undefined) {
    v = !hasClass(el, 'disabled');
  }
  toggleClass(el, 'disabled', v);
  return false;
}

var radioBtns = {};
function radioval(name) {
  return radioBtns[name] ? radioBtns[name].val : false;
}
function radiobtn(el, v, name) {
  if (!radioBtns[name]) return;
  each(radioBtns[name].els, function() {
    if (this == el) {
      addClass(this, 'on');
    } else {
      removeClass(this, 'on');
    }
  });
  return radioBtns[name].val = v;
}

function renderFlash(cont, opts, params, vars) {
  if (!opts.url || !opts.id) {
    return false;
  }
  opts = extend({
    version: 9,
    width: 1,
    height: 1
  }, opts);
  var f = opts.url;
  if (!stVersions[f]) {
    stVersions[f] = '';
  }
  if (__debugMode && stVersions[f] < 1000000) stVersions[f] += irand(1000000, 2000000);

  if (stVersions[f]) {
    opts.url += ((opts.url.indexOf('?') == -1) ? '?' : '&') + '_stV=' + stVersions[f];
  }

  params = extend({
    quality: 'high',
    flashvars: ajx2q(vars)
  }, params);
  if (browser.flash < opts.version) {
//    if (opts.express) {
//      params.flashvars += '&MMplayerType=PlugIn&MMredirectURL=' + encodeURIComponent(locBase + location.hash);
//    } else {
      return false;
//    }
  }
  ge(cont).innerHTML = browser.flashwrap(opts, params);
  return true;
}

function playAudioNew() {
  var args = arguments;
  if (args[args.length - 1] !== false) args = Array.prototype.slice.apply(arguments).concat([true]);
  stManager.add(['audioplayer.js', 'audioplayer.css'], function() {
    audioPlayer.operate.apply(null, args);
  });
}

function addAudio(opts) {
  stManager.add(['audio.js'], function() {
    Audio.addShareAudio(opts);
  });
}

function showAudioClaimWarning(owner_id, id, delete_hash, claim_id, title, reason) {
  var claimText, claimTitle;
  if (reason == 'crap') {
    claimText = getLang(claim_id >= 0 ? 'audio_crap_warning_text' : 'audio_crap_warning') || getLang(claim_id > 0 ? 'audio_claim_warning_objection' : (claim_id == 0 ? 'audio_claim_warning_text' : 'audio_claim_warning'));
    claimTitle = getLang('audio_crap_warning_title') || getLang('audio_claim_warning_title');
  } else {
    claimText = getLang(claim_id > 0 ? 'audio_claim_warning_objection' : (claim_id == 0 ? 'audio_claim_warning_text' : 'audio_claim_warning'));
    claimTitle = getLang('audio_claim_warning_title');
  }
  claimText = claimText.split('{audio}').join('<b>' + title + '</b>');
  claimText = claimText.split('{objection_link}').join('<a href="/help?act=cc_objection&claim=' + claim_id + '&content=audio' + owner_id + '_' + id + '">' + getLang('audio_claim_objection') + '</a>');
  claimText = claimText.split('{delete_link}').join('<a href="#" onclick="deleteAudioOnClaim(' + owner_id + ',' + id + ',\'' + delete_hash + '\'); return false;">' + getLang('audio_claim_delete') + '</a>');
  cur.claimWarning = showFastBox({title: claimTitle, dark: 1, bodyStyle: 'padding: 20px;'}, claimText);
}

function deleteAudioOnClaim(owner_id, id, delete_hash) {
  if (cur.silent) {
    cur.onSilentLoad = function() {
      deleteAudioOnClaim(owner_id, id, delete_hash);
    };
    return;
  }
  if (cur.deleting) {
    return false;
  }
  cur.deleting = true;
  var el = ge('audio' + id);
  var h = getSize(geByClass1('play_btn', el))[1];
  ajax.post('/audio', {act: 'delete_audio', oid: owner_id, aid: id, hash: delete_hash, restore: 1}, {
    onDone: function(text, delete_all) {
      if (cur.claimWarning) {
        cur.claimWarning.hide();
      }
      cur.deleting = false;
      if (!cur.deletedAudios) cur.deletedAudios = [];
      cur.deletedAudios[id] = ge('audio'+id).innerHTML;
      el.innerHTML = text;
      setStyle(geByClass1('dld', el), {height: h+'px'});
      el.style.cursor = 'auto';
      el.setAttribute('nosorthandle', '1');
      if (delete_all) {
        cur.summaryLang.delete_all = delete_all;
      }
      if (cur.audios && cur.audiosIndex) {
        cur.audiosIndex.remove(cur.audios[id]);
        cur.audios[id].deleted = true;
      }
      cur.sectionCount--;
      if (Audio) {
        Audio.changeSummary();
      }
    }
  });
  return false;
}

window.__qlTimer = null;
window.__qlClear = function() { clearTimeout(__qlTimer); setTimeout(function() { clearTimeout(__qlTimer); }, 2000); }
window.onLoginDone = function () {
  __qlClear();
  nav.reload({force: true, from: 6});
}
window.onLogout = function() {
  __qlClear();
  if (window.audioPlayer) {
    audioPlayer.stop();
    toggleGlobalPlayer(false);
  }
  window.Notifier && Notifier.standby();
  window.FastChat && FastChat.standby();
  window.Page && Page.postsClear();
  if (ls.checkVersion()) {
    try {
      window.localStorage.clear();
    } catch (e) {}
  }
  nav.reload({from: 5});
}

function onLoginFailed(code, opts) {
  __qlClear();
  switch (code) {
    case -1: location.href = location.href.replace(/^http:/, 'https:'); break;
    case 4: location.href = '/login.php?m=1&email=' + opts.email; break;
    default: location.href = '/login.php'; break;
  }
}
function onLoginCaptcha(sid, dif) {
  __qlClear();
  unlockButton(window.__qfBtn);
  window.qloginBox = showCaptchaBox(sid, dif, window.qloginBox, {onSubmit: function(sid, key) {
    ge('quick_captcha_sid').value = sid;
    ge('quick_captcha_key').value = key;
    ge('quick_login_form').submit();
  }, onHide: function() { window.qloginBox = false; }});
}

function callHub(func, count) {
  this.count = count || 1;
  this.done = function(c) {
    this.count -= c || 1;
    if (this.count <= 0) {
      func();
    }
  };
}

function showWriteMessageBox(e, id) {
  gSearch.hide(e, true);
  if (cur.onFreindMessage) cur.onFreindMessage();
  stManager.add(['page.js', 'wide_dd.js']);
  var box = showBox('al_mail.php', {act: 'write_box', to: id}, {stat: ['writebox.js', 'writebox.css', 'wide_dd.css', 'page.css', 'emoji.js', 'notifier.css'], cache: 1}, e);
  if (box) cancelEvent(e);
  return !box;
}

function startVideocall(e, id, with_video) {
  if (checkEvent(e)) return true;
  gSearch.hide(e, true);
  var tt = (ge('videocall_btn') || {}).tt;
  if (tt && tt.hide && tt.destroy) {
    tt.hide({fasthide: 1});
    tt.destroy();
  }
  tt = (ge('profile_am_subscribed') || {}).tt;
  if (tt && tt.hide && tt.destroy) {
    tt.hide({fasthide: 1});
    tt.destroy();
  }

  var stat = ['call.js', 'call.css', 'notifier.js', 'notifier.css'];

  var hub = new callHub(function() {
    Call.rtmpServer = hub.data[0];
    Call.rtmfpServer = hub.data[1];
    window.langpack = extend(window.langpack || {}, hub.data[2]);
    vk.vc_h = hub.data[3];
    Call.start(id, with_video);
  }, 2);

  stManager.add(stat, function() {
    hub.done();
  });

  var options = {onDone: function() {
    hub.data = arguments;
    hub.done();
  }, params: {act: 'init'}, loader: true};

  ajax.post('call.php', options.params, options);
  return false;
}

var gSearch = new (function() {
  this.on = 0;
  var self = this;
  this.hub = new callHub(function() {
    if (self.onShow) self.onShow();
  }, 2);
  this.hintsHub = new callHub(function() {
    self.showStartHints();
  }, 2);
  this.load = function() {
    if (!ge('quick_search')) return;
    if (this.loading) return;
    this.loading = true;
    stManager.add('qsearch.js', function() {
      self.hub.done();
    });
    ajax.post('hints.php', {act: 'a_start_hints'}, {onDone: function(text) {
      self.startHintsText = trim(text);
      self.hintsHub.done();
    }});
  },
  this.show = function(e, noAnim) {
    if (!ge('quick_search')) return;
    if (this.on) {
      return this.go(e);
    }
    this.on = 1;
    show(self.sCont);
    placeholderSetup('search_input');
    ge('search_input').setAttribute('autocomplete', 'off');
    addClass(ge('qsearch_link'), 'active');
    this.prev_content = ge('content');
    if (!this.qsearch_cont) {
      this.qsearch_cont = ce('div', {id: 'content', innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'});
    }
    // hide('header');
    this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content);
    if (!this.loading) this.load();
    self.hub.done();
    self.hintsHub.done();
    if (e) return cancelEvent(e);
  };
  this.go = function(e) {
    var url = '/gsearch.php?section=' + (self.last_section || 'people') + '&q=' + trim(ge('search_input').value) + '&name=1';
    cancelEvent(e || window.event);
    location.href = url;
    return false;
  };

  this.hide = function(e, force) {
    if (!ge('quick_search')) return;
    if ((self.active && !force) || !self.on) return;
    self.on = 0;
    toggleFlash();
    if (self.beforeHide && self.beforeHide()) {
      return true;
    }
    if (ge('search_input').setValue) {
      ge('search_input').setValue('');
    } else {
      ge('search_input').value = '';
    }
    // show('header');
    hide(self.sCont);
    removeClass(ge('qsearch_link'), 'active');
    self.qsearch_cont.parentNode.replaceChild(self.prev_content, self.qsearch_cont);
  };
  this.init = function(options) {
    this.sCont = ge('quick_search');
    this.opt = options || {};
  };
  var qsearch_start = false, qsearch_requested = false;
  this.preload = function() {}; // For backward compatibility
})();

// opts: {url: '...', params: {}} or {text: '...'} or {content: '...'}
var _cleanHide = function(el) {
  if (el.temphide) {
    removeEvent(el, 'mouseout', el.temphide);
    removeAttr(el, 'temphide');
    removeAttr(el, 'showing');
  }
}

function showTooltip(el, opts) {
  if (!vk.loaded && !opts.noload) return;

  if (!el) return;
  if (!el.temphide) {
    el.temphide = function() {
      el.showing = false;
    }
    addEvent(el, 'mouseout', el.temphide);
  }
  el.showing = true;
  if (el.tt == 'loadingstat') return;

  if (!el.tt) {
    el.tt = 'loadingstat';
  }

  cur.cancelTooltip = false;

  if (opts.stat) stManager.add(opts.stat);
  stManager.add(['tooltips.js', 'tooltips.css'], function() {
    if (el.tt == 'loadingstat') el.tt = false;

    if (!el.showing || cur.cancelTooltip) return;
    _cleanHide(el);

    if (!el.tt || !el.tt.el || opts.force) {
      tooltips.create(el, opts);
      if (opts.onCreate) opts.onCreate();
    }
    tooltips.show(el, opts);
  });
}
function reportAd(ad_id) {
  showBox('/reports.php?act=a_report_ad_box', {ad_id: ad_id}, {params: {width: 370, dark: 1, bodyStyle: 'padding: 20px;'}, stat: ['ui_controls.js', 'ui_controls.css']});
}

function updateMoney(balance) {
  if (balance === undefined || balance === false) return;
  vk.balance = balance;
  var els = geByClass('votes_balance_nom');
  for (var i in els) {
    els[i].innerHTML = balance+' '+getLang('votes_flex', balance);
  }
  var money = balance * (vk.vcost || 7.0);
  var els = geByClass('money_balance_nom');
  for (var i in els) {
    els[i].innerHTML = getLang('global_money_amount_rub', money, true);
  }
}

function zNav(changed, opts, fin) {
  var z = changed.z, f = changed.f, w = changed.w, zt = (z || '').match(/^([a-z_]+)(-?\d+(?:_\d+)?)\/?(.*)/i);

  delete changed.z;
  delete changed.f;
  delete changed.w;

  if (!opts) opts = {};
  if (!isEmpty(changed)) return;
  if (f) {
    handleScroll(f);
    if (z === undefined) {
      return false;
    }
  }
  if (opts.hist) {
    if (z || w) {
      if (layerQueue.back('wiki', w, (zt || {})[1], (zt || {})[2])) {
        return false;
      }
    } else if (z === false && fin.w) {
      if (layerQueue.back('wiki', fin.w)) {
        return false;
      }
    }
  }
  if (w) {
    if (z === false) {
      layers.fullhide(opts.hist ? 2 : false);
    } else {
      if (!fin) fin = clone(nav.objLoc);
      if (w) fin.w = w;
      if (f) fin.f = f;
      delete(fin.z);
      nav.setLoc(fin);
    }
    showWiki({w: w}, w == 'note_new', false, {onLoaded: z && zNav.pbind({z: z}, extend(opts, {queue: 1}))});
    return false;
  } else if (z == 'giftbox') {
    return !showBox('/al_gifts.php', {act: 'get_gift_box', mid: opts.id || 0, fr: (opts.is && opts.id != vk.id ? 0 : 1), link: nav.objLoc[0]}, {stat: ['gifts.css', 'ui_controls.js', 'ui_controls.css'], cache: 1, dark: 1}, window.event);
  } else if (z == 'validatebox') {
    return !validateMobileBox({closeLink: 1, onDone:function(){ge('change_phone_wrap').parentNode.removeChild(ge('change_phone_wrap'));}})
  } else if (z == 'upload_video') {
    return VideoUpload.showBox();
  }
  if (z === false || w === false) {
    var wkHide = (!window.wkcur || !wkcur.shown || layers.fullhide != WkView.hide);
    if (layers.fullhide && (wkHide || w === false)) {
      if (opts.hist && !fin.z && !fin.w && fin[0].indexOf('/') === -1 && !fin[0].match(/^(photo|video)(-?\d+_\d+)$/)) {
        debugLog('clearing: no z or w in location by history');
        layerQueue.clear();
      }
      layers.fullhide(opts.hist ? 2 : false);
    }
    return false;
  }

  if (!z) return;
  if (zt) {
    var onFail = function() {
      delete nav.objLoc.z;
      nav.setLoc(nav.objLoc);
      return true;
    };
    switch (zt[1]) {
      case 'photo':
        showPhoto(zt[2], zt[3], extend(opts, {onFail: onFail, noHistory: true}));
        return false;
        break;
      case 'albums':
        showAlbums(zt[2], extend(opts, {onFail: onFail, noHistory: true}));
        return false;
        break;
      case 'album':
        showAlbum(zt[2], extend(opts, {onFail: onFail, noHistory: true}));
        return false;
        break;
      case 'photo_tag':
        showPhotoTags(zt[2], extend(opts, {onFail: onFail, noHistory: true}));
        return false;
        break;
      case 'video_tag':
        showVideoTags(zt[2], extend(opts, {onFail: onFail, noHistory: true}));
        return false;
        break;
      case 'video':
        var listId = zt[3], options = extend(opts, {onFail: onFail, noLocChange: 1});
        if (listId) {
          var parts = [], playlistId = '';
          each(listId.split('/'), function(i, part) {
            if (part.indexOf('pl_') == 0) {
              playlistId = part;
            } else {
              parts.push(part);
            }
          });
          listId = parts.join('/');

          if (playlistId && window.Videocat) {
            playlistId = playlistId.substr('pl_'.length);

            if (Videocat.initFullPlaylist(playlistId, zt[2]) || Videocat.isTop3Playlist(playlistId)) {
              var autoplay = intval(nav.objLoc.autoplay);
              var needLoad = intval(playlistId.indexOf('_') > 0);
              var module = window.Video && Video.isInCatalogue() ? Videocat.VIDEO_MODULE : cur.module;
              var focusPlay = autoplay ? 0 : 1;
              options = extend(options, {playlistId: playlistId, module: module, focusPlay: focusPlay, addParams: { force_no_repeat: 1, show_next: 1, playlist_id: playlistId, autoplay: autoplay, load_playlist: needLoad }});
            }
          }
        }
        showVideo(zt[2], listId, options);
        return false;
        break;
      case 'screen':
        stManager.add(['index.js'], function() { setTimeout(JoinPhotoview.show.pbind(intval(zt[2])), 0); });
        return false;
        break;
      case 'single':
        if (w === undefined) {
          stManager.add(['single_pv.css', 'single_pv.js'], ge(z).onclick);
        }
        return false;
        break;
    }
  }
}

function handleScroll(scroll) {
  scroll = scroll.split(',');
  var named = cur.named || {},
      scrollEl = scroll[0] && (named[scroll[0]] || ge(scroll[0])) || false,
      focusEl = scroll[1] && (named[scroll[1]] || ge(scroll[1])) || false;

  if (!scrollEl && !focusEl) {
    scrollEl = document.getElementsByName(scroll[0])[0];
    if (scrollEl) {
      scrollEl = scrollEl.nextSibling;
    } else {
      return;
    }
  }

  var head = ge('page_header_wrap') || ge('dev_top_nav_wrap');
  setTimeout(function() {
    scrollEl && scrollToY(getXY(scrollEl)[1] - (head ? getSize(head)[1] : 0), 0);
    focusEl && elfocus(focusEl);
  }, 300);
}

function showGlobalPrg(img, opts) {
  var xy = getXY(img), sz = getSize(img), o = opts || {}, w = o.w || 32, h = o.h || 13, el = ge('global_prg');
  el.className = o.cls || 'progress';
  setStyle(el, {
    left: xy[0] + Math.floor((sz[0] - w) / 2),
    top: xy[1] + Math.floor((sz[1] - h) / 2),
    width: w, height: h,
    display: 'block'
  });
  if (o.hide) {
    img.style.visibility = 'hidden';
  }
}
function showManyPhoto(el, photoId, listId, options) {
  Page.showManyPhoto(el, photoId, listId, options);
}
function showPhoto(photoId, listId, options, ev) {
  if (cur.viewAsBox) return cur.viewAsBox();
  if (checkEvent(ev) || (cur._editMode && cur._editMode(ev))) return;
  var stat = ['photoview.js', 'photoview.css', 'page.js', 'page.css'], phv = window.Photoview;
  if (options.img) {
    options.showProgress = showGlobalPrg.pbind(options.img, {cls: 'progress_inv_img', w: 46, h: 16});
    options.hideProgress = hide.pbind('global_prg');
  }
  if (phv && (phv.showPhoto(photoId, listId, options) === false)) {
    return false;
  }
  var doShow = true;
  if (options.temp && !(cur.pvNoTemp || {})[photoId]) {
    stManager.add(stat, function() {
      extend(cur, {
        pvCancelLoad: function() {
          doShow = false;
        },
        pvData: cur.pvData || {},
        pvOptions: cur.pvOptions || {}
      });
      cur.pvData.temp = [options.temp];
      cur.pvOptions.temp_final = options.temp_final;
      cur.pvOptions.temp_summary = options.temp_summary;
      cur.pvOptions.queue = options.queue;
      Photoview.show('temp', 0);
    });
  }
  extend(options, {onDone: function(lst) {
    Photoview.list(photoId, listId, lst);
    Photoview.loaded.apply(window, arguments);
    if (!doShow) return;
    if (lst == 'deleted') {
      Photoview.showDeleted.apply(window, arguments);
    } else {
      Photoview.showPhoto(photoId, listId, options, true);
    }
  }, stat: stat, cache: 1});

  if (options.temp_final) {
    return false;
  }

  ajax.post('al_photos.php', extend({act: 'show', gid: cur.gid, photo: photoId, list: listId, module: cur.module || ''}, options.additional), options);

  return false;
}
function showAlbums(ownerId, options, ev) {
  if (cur.viewAsBox) return cur.viewAsBox();
  if (checkEvent(ev)) return;
  stManager.add(['photoview.js', 'photoview.css'], function() {
    Photoview.showAlbums(ownerId, options);
  });
  return false;
}
function showAlbum(albumRaw, options, ev) {
  if (cur.viewAsBox) return cur.viewAsBox();
  if (checkEvent(ev)) return;
  stManager.add(['photoview.js', 'photoview.css'], function() {
    Photoview.showAlbum(albumRaw, options);
  });
  return false;
}
function showPhotoTags(ownerId, options, ev) {
  if (cur.viewAsBox) return cur.viewAsBox();
  if (checkEvent(ev)) return;
  stManager.add(['photoview.js', 'photoview.css'], function() {
    Photoview.showTagged(ownerId, options);
  });
  return false;
}

function showVideoTags(ownerId, options, ev) {
  if (cur.viewAsBox) return cur.viewAsBox();
  if (checkEvent(ev)) return;
  stManager.add(['video.js', 'video.css', 'photoview.js', 'photoview.css'], function() {
    Photoview.showVideoTags(ownerId, options);
  });
  return false;
}

window._videoLastInlined = false;
function showVideo(videoId, listId, options, ev) {
  if (cur.viewAsBox) return cur.viewAsBox();
  if (checkEvent(ev)) return true;

  if (window.mvcur && mvcur.mvShown && mvcur.minimized && mvcur.videoRaw == videoId) {
    videoview.unminimize();
    return false;
  }

  if (!options) {
    options = {};
  }

  var claim = nav.objLoc.claim;

  var stat = ['videoview.js', 'videoview.css', 'page.js', 'page.css'];

  var fromWallPost = options.addParams && /^-?\d+_\d+$/.test(options.addParams.post_id) && options.addParams.post_id;
  if (!options.playlistId && fromWallPost) {
    if (/^public|groups|profile$/.test(cur.module) && hasClass('post'+fromWallPost, 'own')) {
      options.playlistId = 'wall_' + cur.oid;
    } else {
      options.playlistId = 'post_' + options.addParams.post_id;
    }
  }

  if (options.playlistId) {
    stat.push('videocat.js', 'videocat.css', 'notifier.js');
    options.addParams = extend({}, options.addParams, {playlist_id: options.playlistId});

    if (!window.Videocat || !Videocat.initFullPlaylist(options.playlistId, videoId)) {
      if (/^wall_/.test(options.playlistId)) {
        var wallVideosList = cur.wallVideos && cur.wallVideos[options.playlistId];
        options.addParams.load_playlist = wallVideosList && wallVideosList.list.length >= 50 ? 0 : 1;
        options.addParams.load_playlist_tpl = 1;
      } else {
        options.addParams.load_playlist = 1;
      }
    }
  }

  var hub = new callHub(function() {
    if (!options.hidden) {
      revertLastInlineVideo();
      videoview.showVideo.apply(videoview, hub.data);
    } else {
      options.hidden(hub.data, options, listId, videoId);
    }
  }, 2);

  stManager.add(stat, function() {
    if (!options.hidden) {
      videoview.show(ev, videoId, listId, options);
    }
    hub.done();
  });

  extend(options, {onDone: function() {
    hub.data = arguments;
    hub.done();
  }, cache: (listId != 'status')});
  //}, cache: false});

  var actParams = options.params;

  if (!actParams) {
    actParams = {
      act: 'show',
      video: videoId,
      list: listId,
      autoplay: (options.autoplay) ? 1 : 0,
      ad_video: options.ad_video,
      module: options.module || cur.module || '',
      svids: options.svids,
    };
  }
  if (options.addParams) {
    actParams = extend(actParams, options.addParams);
  }
  if (!trim(actParams.module)) {
    extend(actParams, { _nol: JSON.stringify(nav.objLoc) });
  }
  if (claim) {
    actParams.claim = claim;
  }
  ajax.post('al_video.php', actParams, options);

  vkImage().src = locProtocol + '//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-';

  return false;
}

function showInlineVideo(videoId, listId, options, ev, thumb) {
  if (checkEvent(ev)) return true;

  if (window.mvcur && mvcur.mvShown) {
    return showVideo(videoId, listId, options, ev);
  }

  options = options || {};
  options.params = options.params || {act: 'show_inline', video: videoId, list: listId, autoplay: (options.autoplay) ? 1 : 0, module: options.module || cur.module || ''};
  if (!trim(options.params.module)) {
    extend(options.params, { _nol: JSON.stringify(nav.objLoc) });
  }
  var h = thumb.clientHeight,
      w = thumb.clientWidth,
      btn = geByClass1('video_play_inline', thumb, 'div');

  extend(options.params, {width: w, height: h});
  extend(options.params, options.addParams);

  options.onDone = function (title, html, js, opts) {
    revertLastInlineVideo();
    hide(thumb);
    var videoWrap = ce('div', {id: 'page_video_inline_wrap' + videoId, className: 'page_video_inline_wrap', innerHTML: html}, {width: w, height: h}),
        videoBg = ge('video_background' + videoId);
    _videoLastInlined = [videoWrap, thumb]
    thumb.parentNode.appendChild(videoWrap);
    videoBg && setStyle(geByTag1('img', videoBg), {width: w, height: h});
    cur.mvOpts = opts && opts.mvData ? opts.mvData : false;
    try {
      eval('(function () {' + js + '})();');
    } catch (e) {
      debugLog('video inline error', e.message, e.stack, e, js);
    }

    if (!options.params.mute) {
      var _n = window.Notifier, _a = window.audioPlayer;
      if (_n) setTimeout(function() { _n.lcSend('video_start'); }, 0);
      if (_a && _a.player && !_a.player.paused()) {
        _a.pauseTrack();
        _a.pausedByVideo = 1;
      }
    }
  };
  options.onFail = function(text) {
    setTimeout(showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text).hide, 2000);
    return true;
  }
  options.showProgress = function () {
    addClass(btn, 'video_play_inline_loading');
  };
  options.hideProgress = function () {
    removeClass(btn, 'video_play_inline_loading');
  };
  stManager.add('videoview.js', function() {
    ajax.post('al_video.php', options.params, options);
    vkImage().src = locProtocol + '//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-';
  });
  return false;
}

function revertLastInlineVideo(ancestor) {
  if (!_videoLastInlined) {
    return;
  }
  var current, found = false;
  if ((ancestor = ge(ancestor)) &&
      (current = _videoLastInlined[0])) {
    while (current = current.parentNode) {
      if (current == ancestor) {
        found = true;
        break;
      }
    }
    if (!found) {
      return;
    }
  }
  re(_videoLastInlined[0]);
  show(_videoLastInlined[1]);
  _videoLastInlined = false;
  delete cur.mvOpts;
}

function pauseLastInlineVideo() {
  if (!_videoLastInlined) {
    return;
  }
  var player = ge('video_player') || window.html5video || null;
  if (player && player.playVideo) {
    player.playVideo(false);
  }
}

function showWiki(page, edit, e, opts) {
  if (checkEvent(e)) return true;
  var opts = opts || {};

  if (cur.gid !== 0) {
    page.gid = cur.gid;
  }

  if (window.wkcur && wkcur.shown && wkcur.wkRaw == page.w && page.w && !page.reply) {
    WkView.restoreLayer(opts);
    return cancelEvent(e);
  }
  if ((window.wkcur && wkcur.hideTitle) || page.hide_title) {
    opts.hide_title = page.hide_title = 1;
  }
  var stat = opts.stat || ['wkview.js' ,'wkview.css', 'wk.css', 'wk.js'];
  edit && stat.push('wysiwyg.js', 'wysiwyg.css');
  var params = {
    stat: stat,
    loader: !opts.noloader,
    onDone: function(title, html, options, script) {
      WkView.show(title, html, extend(options, opts), script, e);
    },
    onFail: function(text) {
      return WkView.showError(text);
    }
  };
  if (nav.objLoc.claim) {
    page.claim = nav.objLoc.claim;
  }
  if (page.w && page.w.substr(-6) == '/query') {
    var loc = clone(nav.objLoc);
    delete loc[0];
    delete loc.w;
    page.query = JSON.stringify(loc);
  }
  if (opts.preload) {
    extend(params, opts.preload);
  }

  ajax.post('wkview.php', extend({act: 'show', loc: nav.objLoc[0]}, page), params);
  return cancelEvent(e);
}

function videoCallback(params) {
  var method = params.shift();
  if (window.videoview && videoview.playerCallback[method]) {
    videoview.playerCallback[method].apply(videoview, params);
  } else {
    throw Error('Unregistered player callback: ' + method);
  }
}

function showApp(ev, aid, needInstall, ref, mid, options) {
  if (!options) {
    options = {};
  }
  var params = extend({w: 'app'+aid}, options);
  if (ref) {
    if (isObject(ref)) {
      params = extend(params, ref);
    } else {
      params['ref'] = ref;
    }
  }
  if (cur.apps && cur.apps[aid] || !needInstall) {
    delete params['w'];
    var loc = 'app' + aid + (mid ? '_' + mid : ''),
      nocur = nav.objLoc && !nav.objLoc[1] && nav.objLoc[0] === loc;
    return nav.go('/' + loc + nav.toStr(params), ev, {nocur: nocur});
  }
  if (mid) {
    params['mid'] = mid;
  }
  var wikiOptions = {stat: ['wkview.js' ,'wkview.css', 'apps.js', 'apps.css']};
  return showWiki(params, false, ev, wikiOptions);
}

function showDoneBox(msg, opts) {
  opts = opts || {};
  var l = (opts.w || 380) + 20;
  var style = opts.w ? ' style="width: ' + opts.w + 'px;"' : '';
  var pageW = bodyNode.offsetWidth,
      resEl = ce('div', {
      className: 'top_result_baloon_wrap fixed',
      innerHTML: '<div class="top_result_baloon"' + style + '>' + msg + '</div>'
  }, {left: (pageW - l) / 2});
  bodyNode.insertBefore(resEl, pageNode);
  var height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight);
  var top = browser.mobile ? intval(window.pageYOffset) : 0;
  containerSize = getSize(resEl);
  resEl.style.top = Math.max(10, top + (height - containerSize[1]) / 3) + 'px';
  var out = opts.out || 2000;
  var _fadeOut = function() {
    setTimeout(function() {
      if (opts.permit && !opts.permit()) {
        _fadeOut();
        return;
      }
      fadeOut(resEl.firstChild, 500, function() {
        re(resEl);
        if (opts.callback) {
          opts.callback();
        }
      });
    }, out);
  }
  _fadeOut();
}

function animateCount(el, newCount, opts) {
  el = ge(el);
  opts = opts || {};

  if (opts.str) {
    newCount = trim(newCount.toString()) || '';
  } else {
    newCount = positive(newCount);
  }
  if (!el) return;
  if (browser.msie6 || browser.mobile && !browser.safari_mobile && !browser.android) {
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
  }, vert ? {marginTop: incr ? -h : 0} : {right: 'auto', left: 0}));
  if (opts.str) {
    setStyle(animEl, {textAlign: 'left', right: 'auto', left: 0});
  }

  var bigW = geByClass1('counter_anim_big_c', animEl, 'span').offsetWidth,
      smallW = vert ? (smallPart == '&nbsp;' ? bigW : geByClass1('counter_anim_small_c', animEl, 'span').offsetWidth) : 0;

  if (constEndPart.length) {
    wrapEl.appendChild(constEl2 = ce('div', {className: 'counter_const inl_bl', innerHTML: constEndPart}));
  }

  setStyle(wrapEl, {width: (constEl1 && constEl1.offsetWidth || 0) + (constEl2 && constEl2.offsetWidth || 0) + bigW + 0})

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

  // return debugLog(css3, incr, curCount, newCount, animwrapEl, animEl, geByClass1('counter_anim_big_c', animEl, 'span'), geByClass1('counter_anim_small_c', animEl, 'span'), h, bigW, smallW);
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

var Chat = {
  maxHeight: 300,
  tabs: {},
  counters: {},
  showFriends: function() {
    if (curFastChat.clistBox.visible) {
      if (curFastChat.clistBox.options.fixed) {
        FastChat.clistHide();
      } else {
        curFastChat.clistBox.show();
      }
    } else {
      FastChat.clistShow();
      if (Chat.cont.tt && Chat.cont.tt.destroy) {
        Chat.cont.tt.destroy();
      }
    }
  },
  showTT: function() {
      if (!hasClass(Chat.wrap, 'chat_active') && !hasClass(Chat.wrap, 'chat_expand')) {
        showTooltip(Chat.cont, {text: getLang('head_fr_online_tip')+' ('+(browser.mac ? 'Cmd':'Ctrl')+'+?)', shift: [-2,4,0], showdt: 0, black: 1});
      }
  },
  init: function() {
    Chat.wrap = ce('div', {id: 'chat_onl_wrap', className: 'chat_onl_wrap', innerHTML: '<div class="chats_sp chat_cont_sh_top"></div><div class="chat_cont_scrolling"><div class="chat_onl_height"></div></div><div class="chats_sp chat_cont_sh_bottom"></div><a class="chat_tab_wrap" id="chat_tab_wrap" onclick="Chat.showFriends()" onmouseover="Chat.showTT();"><div class="chat_onl_cont"><div class="chat_onl" id="chat_onl"></div><div class="chats_sp chat_onl_icon"></div></div></a>'});
    utilsNode.appendChild(Chat.wrap);
    Chat.scrollNode = geByClass1('chat_cont_scrolling', Chat.wrap);
    Chat.itemsCont = Chat.scrollNode.firstChild;
    Chat.onl = ge('chat_onl');
    Chat.cont = Chat.onl.parentNode.parentNode;

    hide(Chat.wrap);
    Chat.inited = true;
    stManager._addCss('.layers_shown .chat_onl_wrap {margin-right: '+sbWidth()+'px;}');
  }
}

TopSearch = {
  cache: {},
  lists: {},
  init: function(){
    if (this.inited) return false;
    var tsInput = ge('ts_input'),
        tsInputWrap = ge('ts_input_wrap'),
        tsWrap = ge('ts_wrap'),
        tsCont = ge('ts_cont_wrap');

    Chat.init();

    if (!tsInput) return false;
    addEvent(tsInput, 'focus', function() {
      TopSearch.deselect();
      if (trim(val(this))) addClass(tsCont.firstChild, 'active');
      TopSearch.toggleInput(true);
    });
    addEvent(tsInput, 'keydown', function(e) {
      switch (e.keyCode) {
        case KEY.DOWN:
        case KEY.UP:
          TopSearch.moveSelection(e.keyCode);
          cancelEvent(e);
          break;
        case KEY.ENTER:
          var curLink = geByClass1('active', tsCont);
          if (curLink) TopSearch.select(curLink, e);
          else {
            var q = trim(val(this));
            if (q) {
              tsInput.blur();
              hide(tsWrap);
              TopSearch.tsNeedsClear = true;
              nav.go('/search?c[section]=auto&c[q]='+encodeURIComponent(q));
            }
          }
          cancelEvent(e);
          break;
        case KEY.ESC:
          TopSearch.clear();
          TopSearch.toggleInput(false);
          break;
      }
    });
    addEvent(tsInput, 'keyup', function(e) {
      switch (e.keyCode) {
        case KEY.DOWN:
        case KEY.UP:
        case KEY.ENTER:
        case KEY.ESC:
          cancelEvent(e);
          break;
        default:
          TopSearch.prepareRows(trim(val(this)));
          break;
      }
    });
    addEvent(tsInput, 'paste', function() {
      setTimeout(function() {
        TopSearch.prepareRows(trim(val(tsInput)));
      }, 10);
    });
    addEvent(document, 'mousedown', function(e) { // removed touchstart because of feed lags @izhukov
      if (!isVisible('ts_wrap') && hasClass(ge('ts_wrap'), 'vk')) TopSearch.toggleSettings();
      tsInput.blur();
      TopSearch.toggleInput(false);
    });
    this.inited = true;
  },
  clear: function() {
    var tsInput = ge('ts_input');
    tsInput.setValue('');
    tsInput.blur();
    tsInput.phonblur();
    this.prepareRows();
  },
  select: function(el, event, peer) {
    if (checkEvent(event)) return true;
    var tsWrap = ge('ts_cont_wrap'),
        tsInput = ge('ts_input'),
        tsInputWrap = ge('ts_input_wrap'),
        tsInputLength = trim(val(tsInput)).length,
        hintType = el.getAttribute('hinttype');
    if (!tsInputLength) {
      tsInput.blur();
      this.toggleInput(false);
    }
    if (peer && hasClass(event.target, 'ts_contact_status')) {
      ajax.post('al_search.php', {act: 'save_metrics', ql: tsInputLength, mk: 'chat_box'});
      this.writeBox(peer);
      this.clear();
      this.toggleInput(false);
      return false;
    }
    hide(tsWrap);
    this.tsNeedsClear = true;

    var res = nav.go(el, event);
    ajax.post('al_search.php', {act: 'save_metrics', ql: tsInputLength, mk: hintType});
    return res;
  },
  deselect: function() {
    var tsWrap = ge('ts_cont_wrap');
    each(geByClass('active', tsWrap), function(i, v) {removeClass(v, 'active')});
  },
  itemOver: function(el, state, event) {
    if (state == 1) TopSearch.deselect();
    var canWrite = inArray(el.getAttribute('hintType'), ['h_friends', 'h_correspondents', 'h_chats']);
    toggleClass(el, 'write', canWrite);
    if (state) addClass(el, 'active');
  },
  moveSelection: function(key) {
    var tsWrap = ge('ts_cont_wrap'), curLink = geByClass1('active', tsWrap), newLink;
    switch (key) {
      case KEY.UP:
        newLink = curLink ? this.getNextNode(curLink, -1, 'a') || curLink : false;
        break;
      case KEY.DOWN:
        newLink = curLink ? this.getNextNode(curLink, 1, 'a') || curLink : tsWrap.firstChild;
        break;
    }
    this.deselect();
    if (newLink) {
      addClass(newLink, 'active');
    }
    return false;
  },
  getNextNode: function(node, dir, tag) {
    var curNode = node, par = domPN(node);
    while (1) {
      curNode = dir > 0 ? curNode.nextSibling : curNode.previousSibling;
      if (!curNode) {
        curNode = dir > 0 ? par.firstChild : par.lastChild;
      }
      if (tag && curNode.tagName && curNode.tagName.toLowerCase() == tag || !tag && curNode) {
        return curNode;
      } else if (curNode === node) {
        return false;
      }
    }
  },
  highlightInput: function(s) {
    if (true || !hasClass(ge('ts_wrap'), 'vk')) return false;
    var tsCont = ge('ts_cont_wrap'),
        tsInput = ge('ts_input'),
        tsInputWrap = ge('ts_input_wrap');
    if (!isVisible(tsCont) && !trim(val(tsInput)) && !TopSearch.animationStarted) {
      if (s) {
        animate(tsInputWrap, {opacity: 0.65}, {duration: 300, transition: Fx.Transitions.easeOutCubic});
      } else {
        animate(tsInputWrap, {opacity: 0.5}, {duration: 300, transition: Fx.Transitions.easeOutCubic});
      }
    }
  },
  toggleInput: function(s, noAnimation) {
    if (!hasClass(ge('ts_wrap'), 'vk')) {
      toggle('ts_cont_wrap', s);
      // toggleClass(geByClass1('ts', ge('ts_input_wrap')), 'dark', !s);
      return;
    }
    var tsCont = ge('ts_cont_wrap'),
        tsInput = ge('ts_input'),
        tsInputWrap = ge('ts_input_wrap'),
        duration = noAnimation ? 0 : 150;
    TopSearch.animationStarted = 1;
    if (s) {
      animate(tsInputWrap, {opacity: 1, width: '170px'}, {duration: duration, transition: Fx.Transitions.easeOutCubic, onComplete: function() {
        show(tsCont);
        delete TopSearch.animationStarted;
      }});
      if (vk.rtl) {
        var newBG = browser.msie8 || browser.msie7 ? {backgroundPositionX: '152px'} : {backgroundPosition: '152px 5px'};
        animate(tsInput, newBG, {duration: duration, transition: Fx.Transitions.easeOutCubic});
      }
      if (cur.onTsShow) {
        cur.onTsShow();
      }
    } else {
      hide(tsCont);
      if (!trim(val(tsInput))) {
        animate(tsInputWrap, {width: '130px'}, {duration: duration, transition: Fx.Transitions.easeOutCubic, onComplete: function() {
          delete TopSearch.animationStarted;
        }});
        if (vk.rtl) {
          var newBG = browser.msie8 || browser.msie7 ? {backgroundPositionX: '112px'} : {backgroundPosition: '112px 5px'};
          animate(tsInput, newBG, {duration: duration, transition: Fx.Transitions.easeOutCubic});
        }
        if (cur.onTsHide) {
          cur.onTsHide();
        }
      }
    }
  },
  toggleSettings: function() {
    var tsSet = ge('ts_settings'),
        tsWrap = ge('ts_wrap'),
        tsInput = ge('ts_input'),
        s = isVisible(tsWrap),
        oldIE = browser.msie && (intval(browser.version) < 9);
    if (s) {
      addClass(tsSet, 'active');
      if (oldIE) {
        setStyle(tsSet, {opacity: 1});
        hide(tsWrap);
        cur.tsUpdated && cur.tsUpdated();
      } else {
        animate(tsSet, {opacity: 1}, 200);
        fadeOut(tsWrap, 200, cur.tsUpdated);
      }
      tsInput.blur();
      this.toggleInput(false);
    } else {
      removeClass(tsSet, 'active');
      if (oldIE) {
        setStyle(tsSet, {opacity: 0.7});
        show(tsWrap);
        cur.tsUpdated && cur.tsUpdated();
      } else {
        animate(tsSet, {opacity: 0.7}, 200);
        fadeIn(tsWrap, 200, cur.tsUpdated);
      }
    }
  },
  toggleTsWrap: function(s) {
    var tsWrap = ge('ts_wrap'), isVis = isVisible(tsWrap);
    clearTimeout(window.toggleTsWrapTO);
    if (s && !isVis) {
      window.toggleTsWrapTO = setTimeout(fadeIn.pbind(tsWrap, 100), 150);
    } else if (!s && isVis) {
      window.toggleTsWrapTO = setTimeout(fadeOut.pbind(tsWrap, 100), 150);
    }
  },
  settingsOver: function() {
    var tsSet = ge('ts_settings');
    if (!hasClass(tsSet, 'active')) {
      animate(tsSet, {opacity: 1}, 200);
    }
  },
  settingsOut: function() {
    var tsSet = ge('ts_settings');
    if (!hasClass(tsSet, 'active')) {
      animate(tsSet, {opacity: 0.7}, 200);
    }
  },
  getList: function(type) {
    switch (type) {
      case 'friends':
        return (this.lists['friends'] || /*window.curFastChat && curFastChat.friends||*/ this.topFriends || {});
      case 'publics':
      case 'events':
      case 'groups':
      case 'apps':
      case 'search':
        return this.lists[type] || {};
    }
    return {};
  },
  onlines: function() {
    return (window.curFastChat && curFastChat.onlines || this.lists['onlines'] || {});
  },
  initFriendsList: function() {
    if (this.friendsLoaded) return false;
    if (cur.initingFL || vk.isBanned) return false;
    var isEmpty = function(obj){
      for(var i in obj){return false;}
      return true;
    }
    var getTopFriends = function() {
      cur.initingFL = true;
      ajax.post('al_search.php', {act: 'get_top_friends'}, {
        cache: 1,
        onDone: function(friends) {
          delete cur.initingFL;
          TopSearch.topFriends = friends;
          TopSearch.updateCache('friends');
          if (!cur.tsStr) TopSearch.prepareRows();
          getAllPages();
        },
        onFail: function() {
          delete cur.initingFL;
        }
      });
    }
    var getAllPages = function() {
      if (TopSearch.friendsLoaded) return false;
      cur.initingFL = true;
      ajax.post('al_search.php', {act: 'get_pages'}, {
        cache: 1,
        onDone: function(res) {
          delete cur.initingFL;
          if (!TopSearch.friendsLoaded) {
            each(res, function(i, v) {
              TopSearch.lists[i] = v;
              if (i != 'onlines') TopSearch.updateCache(i);
            });
            TopSearch.friendsLoaded = true;
          }
        },
        onFail: function() {
          delete cur.initingFL;
        }
      });
    }
    var fr = this.getList('friends');
    if (isEmpty(fr)) getTopFriends();
    else {
      TopSearch.updateCache('friends');
      if (!cur.tsStr) TopSearch.prepareRows();
      getAllPages();
    }
  },

  getSimilarQueries: function(q) {
    q = q.toLowerCase();
    var queries = [q], t;
    if (t = parseLatin(q)) queries.push(t);
    if (t = parseLatKeys(q)) queries.push(t);
    if (t = parseCyr(q)) queries.push(t);
    return queries;
  },
  searchCache: function(listName, q) {
    var list = TopSearch.getList(listName);
    if (!q) return false;
    var queries = this.getSimilarQueries(q), query, t, i, j, cached, name, re, fr, cache;
    if (this.cache[listName][q] !== undefined) return queries;
    cache = this.cache[listName][q] = {};
    for (i in queries) {
      query = queries[i];
      if (cached = this.cache[listName][' ' + query.charAt(0).toLowerCase()]) {
        re = new RegExp('(^|\\s|\\()' + escapeRE(query), 'gi');
        for (j in cached) {
          fr = list[j + '_'];
          if (!isArray(fr)) continue;
          if (fr[0].match(re) !== null) cache[j] = 1;
        }
      }
    }
    j = 0;
    for (i in cache) j++;
    cache._num = j;
    return queries;
  },
  updateCache: function(listName, items) {
    var list = items || this.getList(listName);
    var name, cursor, letter;
    this.cache[listName] = this.cache[listName] || {};
    for (i in list) {
      name = list[i][0];
      i = intval(i);
      cursor = 0;
      while (1) {
        letter = ' ' + name.charAt(cursor).toLowerCase();
        this.cache[listName][letter] = this.cache[listName][letter] || {};
        this.cache[listName][letter][i] = 1;
        cursor = name.indexOf(' ', cursor + 1);
        if (cursor == -1) break;
        ++cursor;
      }
    }
  },
  listSearch: function(listName, q, limit, excludeIds) {
    var results = [], re = false, filterList = {}, listCache = listName + 'Cache';
    if (q) {
      TopSearch.searchCache(listName, q);
      filterList = this.cache[listName] && this.cache[listName][q] || {};
    } else {
      each (this.getList(listName), function(k) {
        var mid = intval(k); filterList[mid] = 1;
      });
    }
    // Why should we walk through the whole list?
    each (this.getList(listName), function(k) {
      var mid = intval(k), matches = filterList[mid];
      if (excludeIds && excludeIds[mid]) return;
      if (!matches) return;
      if (!(limit--)) return false;
      results.push([mid, this]);
    });
    return results;
  },
  row: function(mid, href, photo, name, online, re, hintType, info) {
    var peer = 0, typeAttr = '';
    if (re) name = name.replace(re, '$1<em class="ts_clist_hl">$2</em>');
    if (inArray(hintType, ['h_friends', 'h_correspondents', 'h_chats'])) {
      peer = mid;
    }
    if (!info) info = '';
    return '<a href="' + href + '" class="ts_contact ' + (online ? (mobPlatforms[online] ? 'ts_contact_mobile' : 'ts_contact_online') : '') +' clear_fix" id="ts_contact' + mid + '" onclick="return TopSearch.select(this, event, '+peer+');" onmousedown="event.cancelBubble = true;" onmouseover="TopSearch.itemOver(this, 1, event);"  onmouseout="TopSearch.itemOver(this, 0, event);" hinttype="'+hintType+'"><span class="ts_contact_photo fl_l"><img src="' + photo + '"/></span><span class="ts_contact_name fl_l">' + name + '<div class="ts_contact_info">'+info+'</div></span><div class="ts_contact_status"></div></a>';
  },
  rowSearchSep: function() {
    return '<div id="ts_search_sep">'+getLang('head_search_results')+'</div>';
  },
  prepareRows: function(q) {
    var html = [],
        limit = total = 8,
        filterList = {},
        tsWrap = ge('ts_cont_wrap'),
        curLink = geByClass1('active', tsWrap),
        activeId = curLink ? curLink.id  : '', searchLists = {}, noSep = false;
    if (!tsWrap) return false;
    if (cur.tsStr && cur.tsStr == q) return false;

    var rowsNum = 0, excludeIds = {}, re;
    if (q) {
      re = [];
      each(this.getSimilarQueries(q), function() {
        re.push(escapeRE(this));
      });
      re = new RegExp("([ \-]|^|\s|&nbsp;|\b)(" + re.join('|') + ")", "gi");
      cur.lastRe = re;
      limit--;
      searchLists = {apps: 1, events: 1, publics: 2, groups: 4, friends: 10, search: 10};
    } else {
      searchLists = {friends: 10};
    }

    each(searchLists, function(i, v) {
      if (!TopSearch.cache[i]) {
        return;
      }
      var results = TopSearch.listSearch(i, q, v, excludeIds), items = [], row;
      if (isEmpty(results)) return;
      for (var j in results) {
        if (!limit || limit < total - v) break;
        items.push(results[j]);
        limit--;
        rowsNum++;
      }
      if (!items.length) return;
      if (i != 'search') items.reverse();

      for (var j in items) {
        var item = items[j][1], mid = intval(items[j][0]);
        if (i == 'search' && !noSep && (item[3].substr(0, 2) == 's_' || item[3] == 'h_mutual_friends') && html.length > 0) {
          html.push(TopSearch.rowSearchSep());
          noSep = true;
        } else if (i == 'search' && !html.length) {
          noSep = true;
        }

        var online = mid > 0 ? TopSearch.onlines()[mid] : false,
          name = item[0], href = item[2],
          info = item[4],
          type = (i == 'search') ? item[3] : 'h_'+i;
          excludeIds[mid] = 1;

        row = TopSearch.row(mid, href, item[1], name, online, re, type, info);

        (i == 'search') ? html.push(row) : html.unshift(row);
      }

    });
    if (q) {
      if (!html.length) {
        noSep = true;
      }
      var show_q = (q.length > 27) ? q.substr(0, 25) + '..' : q,
          langKey = (q[0] == '#') ? getLang('top_search_news') : getLang('top_search');
      html.unshift('<a href="/search?c[section]=auto&c[q]='+encodeURIComponent(q)+'" class="ts_search_link clear_fix active" id="ts_search_link" onclick="return TopSearch.select(this, event);" onmousedown="event.cancelBubble = true;" onmouseover="TopSearch.itemOver(this, 1, event);"><span class="ts_contact_name fl_l">'+langKey.replace('{query}', '<span class="ts_query">'+clean(show_q)+'</span>')+'</span><div class="ts_contact_status "></div></a>');
    }

    TopSearch.friendsRows = tsWrap.innerHTML = html.join('');
    if (window.tsHintsEnabled) {
      if (limit && q && q[0] != '#') {
        this.hintsSearch(q, cur.lastRe || false, limit, noSep);
      }
    }
    if (html || q) cur.tsStr = q;
    if (activeId && ge(activeId)) addClass(ge(activeId), 'active');
  },
  hintsSearch: function(q, re, limit, noSep) {
    var tsInput = ge('ts_input'), tsWrap = ge('ts_cont_wrap'), curLink, activeId;
    ajax.post('al_search.php', {act: 'get_pages_hints', q: q}, {
      cache: 1,
      onDone: function(pages) {
        if (trim(val(tsInput)) != q) {
          return false;
        }
        if (!pages) {
          return false;
        }
        var rows = [], hasSep = ge('ts_search_sep') ? true : false;

        TopSearch.lists['search'] = TopSearch.lists['search'] || {};
        each (pages, function(k) {
          TopSearch.lists['search'][k] = this;
          var mid = intval(k), name = this[0], href = this[2], hintType = this[3], info = this[4];
          if (ge('ts_contact'+mid)) return true;
          if (!(limit--)) return false;
          if (!noSep && (hintType.substr(0, 2) == 's_' || hintType == 'h_mutual_friends')) {
            rows.push(TopSearch.rowSearchSep());
            noSep = true;
          }
          rows.push(TopSearch.row(mid, href, this[1], name, false, re, hintType, info));
          return true;
        });
        TopSearch.updateCache('search', pages);
        if (rows.length) {
          curLink = geByClass1('active', tsWrap);
          activeId = curLink ? curLink.id  : '';
          tsWrap.innerHTML += rows.join('');
          if (activeId && ge(activeId)) addClass(ge(activeId), 'active');
        }
      }
    });
  },
  writeBox: function(peer) {
    if (window.curFastChat && curFastChat.inited && window.FastChat) { // black movable rbox
      FastChat.selectPeer(peer);
    } else if (peer > 0 && peer < 2e9) {
      showWriteMessageBox(false, peer);
    } else { // no box for multichats or emails
      nav.go('/im?sel=' + peer);
    }
  }
}

function mentionOver(el, opts) {
  opts = opts || {};
  showTooltip(el, {
    url: 'al_wall.php',
    params: {act: 'mention_tt', mention: el.getAttribute('mention_id'), from: 'wall'},
    shift: opts.shift || [65, 7, 7],
    hidedt: 500,
    showdt: 500,
    slide: 15
  });
}

function mentionClick(el, ev, opts) {
  if (el && el.tt && el.tt.hide) {
    el.tt.hide({fasthide: 1});
  }
  var loc = el;
  if (loc.tagName && loc.tagName.toLowerCase() == 'a' && !(loc.getAttribute('target') || nav.baseBlank)) {
    opts = opts || {};
    var _params = loc.getAttribute('hrefparams');
    if (_params) {
      opts.params = extend(opts.params || {}, q2ajx(_params));
    }
    loc = loc.href || '';
    loc = loc.replace(/^https?:\/\//i, '');
    if (!loc.indexOf(location.hostname)) {
      loc = loc.replace(location.hostname, '');
    }
    loc = loc.replace(/^(vkontakte\.ru\/|vk\.com\/)/, '/');
    var path;
    if (loc.match(/#$/) || !(path = loc.match(/^\/(.*?)(\?|#|$)/))) {
      return true;
    }
    path = path[1];
    if (path.indexOf('.php') > 0 || path.match(/^(doc\-?\d+_\d+|graffiti\d+|reg\d+|images|utils|\.js|js\/|\.css|css\/)/)) {
      return true;
    }
  }
  return nav.go(loc, ev, opts);
}

function headPlayPause(event) {
  var aid = currentAudioId();
  if (!window.audioPadShown && !aid) Pads.show('mus');
  if (!aid) {
    aid = ls.get('audio_id');
    if (aid) {
      window.padPlClicked = true;
    }
  }
  if (aid) {
    playAudioNew(aid);
  } else {
    var plist = padAudioPlaylist();
    if (plist && plist.start) {
      playAudioNew(plist.start);
    } else {
      addClass(ge('head_play_btn'), 'playing');
      window.onPlaylistLoaded = function() {
        var plist = padAudioPlaylist();
        if (plist && plist.start) {
          playAudioNew(plist.start);
        }
      }
    }
  }
  if (event) cancelEvent(event);
}

function currentAudioId() {
  // return ls.get('audio_id') || window.audioPlayer && audioPlayer.id;
  return window.audioPlayer && audioPlayer.id;
}

function padAudioPlaylist() {
  return window.audioPlaylist || ls.get('pad_playlist');
}

var _postsSeen = {}, _postsSaved = {}, _postsSaveTimer, _postsSendTimer, _postsCleanTimer, _postsSeenModules = {}, _postsExtras = {};
var ls = {
  checkVersion: function() {
    return (window.localStorage !== undefined && window.JSON !== undefined);
  },
  set: function(k, v) {
    this.remove(k);
    try {
      return (ls.checkVersion()) ? localStorage.setItem(k, JSON.stringify(v)) : false;
    } catch (e) {
      return false;
    }
  },
  get: function(k) {
    if (!ls.checkVersion()) {
      return false;
    }
    try {
      return JSON.parse(localStorage.getItem(k));
    } catch (e) {
      return false;
    };
  },
  remove: function(k) {
    try { localStorage.removeItem(k); } catch(e) {};
  }
}

var mobilePromo = showBox.pbind('al_login.php', {act: 'mobile', box: 1});
function mobileOnlineTip(el, opts) {
  var sh = (opts.right ? 278 : 35) + (browser.opera ? 1 : 0);
  return showTooltip(el, {
    url: 'al_login.php',
    params: {act: 'mobile_tt', mid: opts.mid, was: opts.was},
    slide: 15,
    ajxdt: 200,
    showdt: 200,
    hidedt: 200,
    toup: false,
    shift: [sh, 0, 0],
    className: 'mobile_tt' + (opts.right ? ' mobile_tt_right' : '')
  });
}

function pageVerifiedTip(el, opts) {
  var sh = 94 + (browser.opera || opts.s ? 1 : 0);
  return showTooltip(el, {
    url: opts.gid ? 'al_groups.php' : 'al_profile.php',
    params: {act: 'verified_tt', mid: opts.mid || 0, gid: opts.gid || 0},
    slide: 15,
    ajxdt: 200,
    showdt: 200,
    hidedt: 200,
    toup: false,
    shift: [sh, 1, 1],
    className: 'verified_tt' + (opts.gid ? ' verified_group_tt' : '')
  });
}

var Pads = {
  preload: function(id) {
    var st = ['pads.css', 'pads.js', 'notifier.js'];
    if (id == 'msg') st.push('pads_im.css', 'pads_im.js', 'page.css', 'page.js');
    stManager.add(st, function() { Pads.preload(id); });
  },
  show: function(id, ev) {
    if (checkEvent(ev) === true || browser.msie6) return;
    var st = ['pads.css', 'pads.js', 'notifier.js'];
    if (id == 'msg') st.push('pads_im.css', 'pads_im.js', 'page.css', 'page.js');
    stManager.add(st, function() { Pads.show(id); });
    return cancelEvent(ev);
  },
  invalidate: __bf
};

function cssAnim(obj, prep, opts, callb) {
  var v = intval(browser.version);
  if (obj && ((browser.chrome && v > 14) || (browser.mozilla && v > 13) || (browser.opera && v > 2))) {
    var callbWrap;
    var st = 'all '+opts.duration+'ms '+(opts.func || 'ease-out');
    obj.style.WebkitTransition = st;
    obj.style.MozTransition = st;
    obj.style.OTransition = st;
    obj.style.transition = st;
    var callbWrap = function() {
      if (browser.opera && intval(browser.version) <= 12) {
        obj.removeEventListener('oTransitionEnd', callbWrap);
      } else {
        removeEvent(obj, 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', callbWrap);
      }
      obj.style.WebkitTransition = '';
      obj.style.MozTransition = '';
      obj.style.OTransition = '';
      obj.style.transition = '';
      if (callb) callb();
      return false;
    }
    if (callb) {
      if (browser.opera && intval(browser.version) <= 12) {
        obj.addEventListener('oTransitionEnd', callbWrap)
      } else {
        addEvent(obj, 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', callbWrap);
      }
    }
    setTimeout(setStyle.pbind(obj, prep), 0);
  } else {
    animate(obj, prep, extend(opts, {onComplete: callb}));
  }
}

function imagesLoader(cont, options) {
  var default_options = {
        top_load: 0,
        bottom_load: 2,
        load_limit: 10,
        need_load_class: '__need_load',
        skip_process_load: false,
        use_iframe: false
      },
      loading_times = [],
      loading_cnt = 0,
      loading_to = null,
      opts = extend(default_options, options)
      obj = {};

  function giftLoaded(src, no_force) {
    if (loading_times[src]) {
      --loading_cnt;
      delete loading_times[src];
    }
    if (!no_force) {
      obj.processLoad();
    }
  }

  function getImgY(img) {
    var top = 0, obj = img;
    if (obj && obj.offsetParent) {
      do {
        top += obj.offsetTop;
        if (cont && obj.offsetParent === cont) break;
      } while (obj = obj.offsetParent);
    }
    return top;
  }

  obj.processLoad = function() {
    for (var src in loading_times) {
      var arr = loading_times[src], loading_time = arr[0], img = arr[1];
      if (img.width || img.height || vkNow() - loading_time > 20000) {
        if (loading_times[src]) {
          giftLoaded.call(img, src, true);
        }
      }
    }
    clearTimeout(loading_to);
    if (loading_cnt) {
      loading_to = setTimeout(obj.processLoad, 500);
    }
    if (loading_cnt >= opts.load_limit) return;

    var images = geByClass(opts.need_load_class, cont || bodyNode),
        changed_images = [];
    if (cont) {
      var cont_h = cont.offsetHeight,
          cont_top = cont.scrollTop - cont_h * opts.top_load,
          cont_bottom = cont.scrollTop + cont_h * opts.bottom_load;
    }
    for (var i = 0, l = images.length; i < l && loading_cnt < opts.load_limit; i++) {
      var img = images[i];
      if (img.tagName != 'IMG') continue;

      var src = img.getAttribute('data-src');
      if (src) {
        if (cont) {
          var imgY = getImgY(img);
          var imgB = imgY + img.parentNode.offsetHeight;
          if (imgY > cont_bottom) continue;
          if (imgB < cont_top) continue;
        }

        changed_images.push([img, src]);
      }
    }

    each(changed_images, function() {
      var img = this[0], src = this[1];
      obj.iloader && obj.iloader.add(src, giftLoaded, img);
      img.src = src;
      img.removeAttribute('data-src');
      removeClass(img, opts.need_load_class);
      if (!loading_times[src]) {
        ++loading_cnt;
        loading_times[src] = [vkNow(), img];
      }
    });

    clearTimeout(loading_to);
    if (loading_cnt) {
      loading_to = setTimeout(obj.processLoad, 500);
    }
  }

  obj.destroy = function() {
    loading_times = [];
    loading_cnt = 0;
    clearTimeout(loading_to);
  }

  if (opts.use_iframe && window.IframeLoader) {
    obj.iloader = new IframeLoader();
  }
  if (!opts.skip_process_load) {
    obj.processLoad();
  }
  return obj;
}

function IframeLoader() {
  var iframe, doc, body, index, sources, aborted_sources;

  function iframeDoc(i) {
    try {
      if (i.contentDocument) return i.contentDocument;
      if (i.contentWindow && i.contentWindow.document) return i.contentWindow.document;
      return i.document;
    } catch (e) {};
    return false;
  }
  function getImgHtml(i) {
    if (doc && doc.body) return '<img id="___img' + i + '" />';
    else return '<img class="___img' + i + '" />';
  }
  function getImg(i) {
    if (doc && doc.body) return doc.getElementById('___img' + i);
    else return geByClass1('___img' + i, body);
  }
  function init() {
    iframe = utilsNode.appendChild(ce('iframe'));
    doc = iframeDoc(iframe);
    if (doc && doc.body) {
      body = doc.body;
    } else {
      body = utilsNode.appendChild(ce('div', {}, {display: 'none'}));
    }
    index = 0;
    sources = [];
  }
  function add(src, onLoad, that) {
    var i = index++;
    sources[i] = {src: src, onLoad: onLoad, that: that};
    body.appendChild(ce('div', {innerHTML: getImgHtml(i)}));
    var img = getImg(i);
    img.src = src;
    img.onload = function() {
      var obj = sources[i];
      if (!obj) return;
      obj.onLoad && obj.onLoad.call(obj.that || window, obj.src);
      delete sources[i];
      body.removeChild(getImg(i).parentNode);
    }
  }
  function abort() {
    re(iframe);
    aborted_sources = [];
    for (var k in sources) {
      aborted_sources.push(sources[k]);
    }
    init();
  }
  function repeat(need_redraw) {
    if (!aborted_sources) return [];
    var objs = [];
    for (var k in aborted_sources) {
      var obj = aborted_sources[k];
      add(obj.src, obj.onLoad, obj.that);
      objs.push(obj.that);
    }
    aborted_sources = null;
    if (need_redraw) {
      var redraw_data = [];
      each(objs, function() {
        redraw_data.push([this, this.src]);
        this.src = '';
        hide(this);
      });
      setTimeout(function(){
        each(redraw_data, function() {
          var img = this[0], src = this[1];
          img.src = src;
          show(img);
        });
      }, 10);
    }
    return objs;
  }

  init();

  return {
    add: add,
    abort: abort,
    repeat: repeat
  }
}

function getCaretBoundingRect(node) {
    var rectNode = node.getBoundingClientRect(),
      rectCaret = null,
      range = null;
    if (rectNode.top === rectNode.bottom) return {left: 0, top: 0, bottom: 0};
    if (document.selection) { // using textRange
      range = document.selection.createRange();
      rectCaret = range.getClientRects();
      if (!rectCaret.length) { // fix empty range
        range.text = '_';
        range.moveStart('character', -1);
        rectCaret = range.getClientRects();
        range.text = '';
      }
      rectCaret = rectCaret[rectCaret.length - 1];
    } else if (window.getSelection) { // using Range
      var sel = getSelection();
      range = sel.getRangeAt(0);
      if (range.collapsed) { // fix empty range
        var offset = range.startOffset;
        range.setStart(range.startContainer, 0);
        rectCaret = range.getClientRects();
        range.setStart(range.startContainer, offset);
      }
      rectCaret = rectCaret.length ? rectCaret[rectCaret.length - 1] : {right: rectNode.left, top: rectNode.top, bottom: rectNode.top};
    }
    return {
      left: rectCaret.right - rectNode.left,
      top: rectCaret.top - rectNode.top,
      bottom: rectCaret.bottom - rectNode.top
    };
};

function aquireLock(name, fn, noretry) {
  var lockKey = 'lockkk_' + name;
  if (ls.get(lockKey) !== true) {
    ls.set(lockKey, true);
    try {
      fn();
    } catch(e) {}
    ls.set(lockKey, false);
    return;
  }
  if (ls.checkVersion()) {
    if (!noretry) {
      setTimeout(aquireLock.pbind(name, fn, true), 100);
    }
  } else {
    fn();
  }
}

function statNavigationTiming () {
  if (window.clientStatsInitedNT) return false;
  if (Math.random() < 0.001 && window.performance && performance.timing) {

    var perTiming = {};
    if (performance.timing.redirectStart && performance.timing.redirectEnd) {
      perTiming['redirect'] = performance.timing.redirectEnd - performance.timing.redirectStart;
    }
    if (performance.timing.domainLookupStart && performance.timing.domainLookupEnd) {
      perTiming['domainLookup'] = performance.timing.domainLookupEnd - performance.timing.domainLookupStart;
    }
    if (performance.timing.connectStart && performance.timing.connectEnd) {
      perTiming['connect'] = performance.timing.connectEnd - performance.timing.connectStart;
      if (performance.timing.secureConnectionStart) {
        perTiming['secureConnection'] = performance.timing.connectEnd - performance.timing.secureConnectionStart;
      }
    }
    if (performance.timing.requestStart && performance.timing.responseStart) {
      perTiming['request'] = performance.timing.responseStart - performance.timing.requestStart;
      if (performance.timing.responseEnd) {
        perTiming['response'] = performance.timing.responseEnd - performance.timing.responseStart;
      }
    }
    if (performance.timing.unloadEventStart && performance.timing.unloadEventEnd) {
      perTiming['unloadEvent'] = performance.timing.unloadEventEnd - performance.timing.unloadEventStart;
    }
    if (performance.timing.domLoading && performance.timing.domComplete) {
      perTiming['processing'] = performance.timing.domComplete - performance.timing.domLoading;
    }
    if (performance.timing.domContentLoadedEventStart && performance.timing.domContentLoadedEventEnd) {
      perTiming['domContentLoadedEvent'] = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart;
    }
    if (performance.timing.loadEventStart && performance.timing.loadEventEnd) {
      perTiming['loadEvent'] = performance.timing.loadEventEnd - performance.timing.loadEventStart;
    }
    for (var key in perTiming) {
      statlogsValueEvent('navigation_timing', perTiming[key], key);
    }
    window.clientStatsInitedNT = true;
  }
}

function statDurationsLoadImage() {
  if (Math.random() < 0.001 && window.performance && window.performance.getEntriesByType) {
    if (window.clientStatsInited) return false;

    var resourceList = window.performance.getEntriesByType('resource');
    if (!resourceList) return false;
    var countImg = {};
    var slowServers = {};
    for (var i = 0; i < resourceList.length; i++) {
      if (resourceList[i] && resourceList[i].initiatorType == 'img') {
        if (resourceList[i].duration < 100) {
          countImg['<100'] = (countImg['<100'] || 0) + 1;
        } else if (resourceList[i].duration < 250) {
          countImg['100-250'] = (countImg['100-250'] || 0) + 1;
        } else if (resourceList[i].duration < 500) {
          countImg['250-500'] = (countImg['250-500'] || 0) + 1;
        } else if (resourceList[i].duration < 1000) {
          countImg['500-1000'] = (countImg['500-1000'] || 0) + 1;
        } else if (resourceList[i].duration < 2000) {
          countImg['1000-2000'] = (countImg['1000-2000'] || 0) + 1;
        } else if (resourceList[i].duration < 5000) {
          countImg['2000-5000'] = (countImg['2000-5000'] || 0) + 1;
        } else {
          countImg['>5000'] = (countImg['>5000'] || 0) + 1;
          if (resourceList[i]['name'] && resourceList[i]['name'].indexOf('pp.vk.me') > 0) {
            var slowImgSrc = '';
            slowImgSrc = resourceList[i]['name'];
            slowImgSrc = slowImgSrc.substr(slowImgSrc.indexOf('pp.vk.me') + 9);
            if (slowImgSrc.indexOf('/') > 0) {
              slowImgSrc = slowImgSrc.substr(0, slowImgSrc.indexOf('/'));
              slowServers[slowImgSrc] = (slowServers[slowImgSrc] || 0) + 1;
            }
          }
        }
      }
    }
    for (var key in countImg) {
      statlogsValueEvent('img_load', countImg[key], key);
    }
    for (var key in slowServers) {
      statlogsValueEvent('img_slow', slowServers[key], key);
    }
    window.clientStatsInited = true;
  }
}

function statlogsValueEvent(statName, value, key1, key2, key3) {
  if (typeof(statName) === 'undefined' || typeof(value) === 'undefined') {
    return;
  }
  var stats,
      cookieName = 'remixsts',
      keys = [].slice.apply(arguments, [2, 5]);
  aquireLock('stats_cookie_lock', function() {
    try {
      stats = JSON.parse(getCookie(cookieName));
      stats = stats.data;
    } catch(e) {
      stats = [];
    }
    stats.push([
      Math.round(Date.now()/1000),
      statName,
      value
    ].concat(keys));
    while (stats.length > 100) {
      stats.shift();
    }
    var uniqueId = Math.round(rand(0, 1000000000)); // unique id
    setCookie(cookieName, JSON.stringify({data: stats, uniqueId: uniqueId}), 0.01)
  });
}

function onLoaded(fn) {
  if (vk.loaded) {
    fn();
  } else {
    addEvent(window, 'load', fn);
  }
}


try{stManager.done('common.js');}catch(e){}
