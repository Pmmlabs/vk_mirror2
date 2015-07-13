(function(self, w) {

var options = w.s_options ? w.s_options : {};
var k = 0;
var selMenuNum = 0;

options = extend({
  elemID: 'search_input',
  value: '',
  hideMenuDelay: 500,
  showPopularHints: true
}, options);

var opt = self.opt = extend(options, self.opt);

self.inputVal = '';

var elem = ge(self.opt.elemID),
  allowKeyUp = true,
  open = elem.getAttribute('open'),
  par = elem.parentNode,
  curr = null,
  lastMenu = null,
  lastNum = 0,
  currNum = 0,
  subItemNum = -1,
  subMenuItems = null,
  currSubMenu = null,
  startEvent = false,
  qsCurrItem = false,
  last = null,
  first = null,
  timer = null;

self.searchFunc = function(inputStr, array, key, showCount, caseSensitive, lat, startWords) {
  var arrayLength = array.length,
      resultArray = new Array(),
      k = 0,
      regAdd = startWords ? '^' : '';
  inputStr = inputStr.replace(/ñ/gi, '¥');
  var searchRegExp = new RegExp(regAdd + inputStr, caseSensitive ? 'gi' : 'g'),
      replaceStr = '';
  var searchLatRegExp = new RegExp(regAdd + parseLatin(inputStr.toLowerCase()),
      caseSensitive ? 'gi' : 'g');
  var rusLat = parseLatin(inputStr.toLowerCase(), true);
  var searchRusLatRegExp = new RegExp(regAdd + (rusLat ? rusLat : ''),
      caseSensitive ? 'gi' : 'g');
  var defaultEqual = function(regExp) {
    replaceStr = keyStr.replace(/ñ/gi, '¥').replace(regExp, rChars);
    return (keyStr != replaceStr);
  }
  var startWordsEqual = function(regExp) {
    keyStr = keyStr.replace(/ñ/gi, '¥').split(/\s/);
    replaceStr = new Array();
    each(keyStr, function(i, obj) { replaceStr.push(keyStr[i].replace(regExp, rChars)) });
    replaceStr = replaceStr.join(' ');
    keyStr = keyStr.join(' ');
    var result = keyStr != replaceStr;
    if (!result) result = defaultEqual(regExp);
    return result;
  }

  for (var i = 0; i < arrayLength; i++) {
    var keyStr = array[i][key], rChars = '<span>$&</span>';
    var equalVal = startWords ? startWordsEqual(searchRegExp) : defaultEqual(searchRegExp);
    if (!equalVal && lat) equalVal = startWords ? startWordsEqual(searchLatRegExp) : defaultEqual(searchLatRegExp);
    if (!equalVal && lat && rusLat) equalVal = startWords ? startWordsEqual(searchRusLatRegExp) : defaultEqual(searchRusLatRegExp);
    if (equalVal) {
      if (k > showCount) break;
      resultArray[k] = clone(array[i]);
      resultArray[k][key] = replaceStr; k++;
    };
  }
  return resultArray;
};

// Hints part
var hints = {
  get: function() {
    hints.val = elem.value;
    if (hints.val) {
      if (hints.val[hints.val.length - 1] == ' ') {
        hints.val[hints.val.length - 1] = '_';
      }
      ajax.post('hints.php', {act: 'a_hints', q: hints.val, section: ''}, {cache: 1, onDone: hints.show});
    }
  },
  show: function(text, section) {
    if (hints.val == '' || !self.on) return;
    self.last_section = section;
    text = trim(text);
    qsCurrItem = false;
    self.qsearch_cont.innerHTML = text;
  }
}

placeholderSetup(elem, {back: true});
addEvent(elem, 'focus', hints.get);

if (trim(self.opt.value) != '') {
  elem.value = self.opt.value;
}

function sFocus() {
  try { elem.focus(); elem.select(); } catch(e) { };
}

self.showStartHints = function() {
  if (/\/((g|ad)search|translation)\.php(\?|$)/i.test(location.toString())) {
    return;
  }
  if (!self.startHintsText) {
    return;
  }
  self.qsearch_cont.innerHTML = self.startHintsText;
  hints.val = '';
}

function keyDown(e) {
  var subMenuCont = ge('search_sub_menu');
  if (e.keyCode == KEY.ENTER) {
    if (!self.empty) {
      if (qsCurrItem && km) {
        // Check onclick event
        window.location = qsCurrItem.href;
      } else {
        return self.go(e);
      }
    } else {
      return self.go(e);
    }
    return cancelEvent(e);
  };
  if (e.keyCode == KEY.TAB) {
    if (browser.opera && e.keyCode == KEY.TAB || !elem.value) return false;
    elem.value = trim(geByClass('s_title', (qsCurrItem) ? qsCurrItem : subMenuCont)[0].innerHTML.replace(/<\/?span>/g, '').replace(/<.*\/.*>/g, ''));
    return false;
  }
  var i = (e.keyCode == KEY.UP) ? -1 : ((e.keyCode == KEY.DOWN) ? 1 : 0);
  if (i && !self.empty) {
    km = true;
    if (e.keyCode == KEY.UP) {
      if (qsCurrItem) {
        if (qsCurrItem.previousSibling) {
          self.qsOver(qsCurrItem.previousSibling);
        } else {
          self.qsOut(qsCurrItem);
          qsCurrItem = false;
        }
      } else {
        if (subMenuCont.lastChild) {
          self.qsOver(subMenuCont.lastChild);
        }
      }
    } else {
      if (!qsCurrItem) {
        if (subMenuCont.firstChild) {
          self.qsOver(subMenuCont.firstChild);
        }
      } else {
        if (qsCurrItem.nextSibling) {
          self.qsOver(qsCurrItem.nextSibling);
        } else {
          self.qsOut(qsCurrItem);
          qsCurrItem = false;
        }
      }
    }
    return cancelEvent(e);
  }
  self.qsOut(qsCurrItem);
  qsCurrItem = false;
  km = false;
}

function keyUp(e) {
  var sVal = trim(elem.value);
  if (e.keyCode == KEY.ESC) {
    self.active = false;
    return self.hide(e);
  }
  if (sVal == self.inputVal) return;
  self.inputVal = sVal;
  if (self.inputVal == '') {
    self.on = 1;
    self.showStartHints();
  } else {
    clearTimeout(hints.timer);
    if (self.inputVal.length == 1) {
      hints.get(self.inputVal);
    } else {
      hints.timer = setTimeout(hints.get, 100);
    }
  }
}

self.beforeHide = function() {
  removeEvent(document, 'keydown', keyDown);
  removeEvent(document, 'keyup', keyUp);
}

self.onShow = function() {
  sFocus();
  addEvent(document, 'keydown', keyDown);
  addEvent(document, 'keyup', keyUp);
  hints.get();
}
self.qsOver = function(el) {
  if (qsCurrItem) {
    self.qsOut(qsCurrItem);
  }
  addClass(el, 'over');
  qsCurrItem = el;
}

self.qsOut = function(el) {
  if (!el || el != qsCurrItem ) {
    return;
  }
  removeClass(el, 'over');
  qsCurrItem = false;
}
}(gSearch, window));

try{jsDispatcher.triggerOnload('al/qsearch');}catch(e){}
if (window.stManager) stManager.done('qsearch.js');
