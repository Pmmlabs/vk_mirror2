if (!window.Emoji) {
var Emoji = {

opts: {},
last: 0,
shownId: false,
hasNewStickers: false,
preventMouseOver: false,

ttShift: 45,

stickers: {},

init: function(txt, opts) {
  var optId = Emoji.last;
  opts.txt = txt;
  opts.id = optId;
  txt.emojiId = optId;
  if (opts.forceTxt) {
    opts.editable = 0;
    placeholderSetup(txt);
  } else {
    opts.editable = 1;
    setTimeout(function() {
      placeholderSetup(txt, {editable: 1, editableFocus: Emoji.editableFocus});
      if (opts.shouldFocus) {
        Emoji.editableFocus(txt, false, true);
      }
    }, 0);
    if (browser.mozilla) {
      try {
        document.execCommand("enableObjectResizing", false, false);
        cur.destroy.push(function() {
          document.execCommand("enableObjectResizing", false, true);
        });
      } catch(e) {
      }

    }

    addEvent(window, 'mousemove', function(e) {
      Emoji.preventMouseOver = false;
    });

    addEvent(txt, browser.opera ? 'click' : 'mousedown', function(e) {
      if (e.target && e.target.tagName == 'IMG') {
        if (Emoji.getCode(e.target)) {
          Emoji.editableFocus(txt, e.target, e.offsetX > 8);
          return cancelEvent(e);
        }
      }
      if (Emoji.shown) {
        Emoji.ttClick(optId, geByClass1('emoji_smile', opts.controlsCont), true);
      }
    });

    addEvent(txt, 'keypress keydown keyup paste', function(e) {
      if (e.type == 'keydown') {
        var noEnter = opts.ctrlSend ? opts.ctrlSend() : opts.noEnterSend;
        if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
          var ctrlSubm = (cur.ctrl_submit && !opts.noCtrlSend);
          if ((ctrlSubm || noEnter) && (e.ctrlKey || browser.mac && e.metaKey) ||
              !ctrlSubm && !e.shiftKey && !(e.ctrlKey || browser.mac && e.metaKey)) {
            if (!Emoji.emojiEnter(optId, e)) {
              return false;
            }
            if (!noEnter || (e.ctrlKey || browser.mac && e.metaKey)) {
              Emoji.ttClick(optId, geByClass1('emoji_smile', opts.controlsCont), true);
              opts.onSend();
              return cancelEvent(e);
            }
          }
        }
        if (e.ctrlKey && e.keyCode == KEY.RETURN) {
          var val = this.value;
          if (opts.editable) {
            Emoji.insertHTML('<div><br/></div>');
          } else {
            if (typeof this.selectionStart == "number" && typeof this.selectionEnd == "number") {
              var start = this.selectionStart;
              this.value = val.slice(0, start) + "\n" + val.slice(this.selectionEnd);
              this.selectionStart = this.selectionEnd = start + 1;
            } else if (document.selection && document.selection.createRange) {
              this.focus();
              var range = document.selection.createRange();
              range.text = "\r\n";
              range.collapse(false);
              if (browser.opera) {
                range.moveEnd('character', 0);
                range.moveStart('character', 0);
              }
              range.select();
            }
            txt.autosize.update();
            setTimeout(function () {
              txt.autosize.update();
            }, 0);
          }
          return false;
        }
        if (e.keyCode == KEY.TAB && !(e.ctrlKey || browser.mac && e.metaKey)) {
          if (Emoji.shown) {
            Emoji.editableFocus(txt, false, true, void(0), true);
            Emoji.ttClick(optId, geByClass1('emoji_smile', opts.controlsCont), true);
          } else {
            Emoji.ttClick(optId, geByClass1('emoji_smile', opts.controlsCont), false, true, void(0), true);
          }
          return cancelEvent(e);
        }
        if (e.keyCode == KEY.ESC) {
          if (Emoji.shown) {
            Emoji.editableFocus(txt, false, true, void(0), true);
            Emoji.ttClick(optId, geByClass1('emoji_smile', opts.controlsCont), true);
            return cancelEvent(e);
          }
          if (opts.onEsc) {
            return opts.onEsc(e);
          }
        }
      }

      if (e.type == 'paste') {
        Emoji.onEditablePaste(txt, opts, optId, e);
        if (opts.checkEditable) {
          setTimeout(opts.checkEditable.pbind(optId, txt), 0);
        }
      } else if (e.type == 'keyup') {
        if (opts.checkEditable) {
          opts.checkEditable(optId, txt);
        }
      } else if (e.type == 'keydown') {
        if (opts.checkEditable) {
          setTimeout(opts.checkEditable.pbind(optId, txt), 0);
        }
      }
      if (opts.onKeyAction) {
        opts.onKeyAction(e);
      }
      return true;
    });
  }

  if (!opts.noStickers && window.emojiStickers && (hasClass(txt, 'im_editable') || hasClass(txt, 'fc_editable'))) {
    for (var i in window.emojiStickers) {
      if (window.emojiStickers[i][2]) {
        Emoji.hasNewStickers = window.emojiStickers[i][2];
        break;
      }
    }
    if (Emoji.hasNewStickers < 0 && !Emoji.noNewStickers) {
      setTimeout(function() {
        each(geByClass('emoji_smile_icon'), function(i, el) {
          if (!geByClass1('emoji_smile_icon_promo', el.parentNode.parentNode)) {
            el.parentNode.parentNode.appendChild(ce('div', {className: 'emoji_smile_icon_promo'}));
            addEvent(el, 'mouseover', function() {
              showTooltip(this, {text: getLang('global_store_stickers_new_available'), shift: [7,1,4], showdt: 0, black: 1});
            });
          }
        });
      }, hasClass(txt, 'fc_editable') ? 200 : 0);
    }
  }


  window.Notifier && Notifier.addRecvClbk('emoji', 0, Emoji.lcRecv, true);

  Emoji.opts[Emoji.last] = opts;
  return Emoji.last++;
},

lcRecv: function(data) {
  switch(data.act) {
    case 'updateTabs':
      Emoji.updateTabs(data.newStickers);
      break;
  }
},

correctCaret: function(txt) {
  var bottom = getCaretBoundingRect(txt).bottom;
  if(bottom < 0 || bottom > txt.offsetHeight) {
    txt.scrollTop += bottom - txt.offsetHeight;
  }
},

insertWithBr: function (range, text) {
  if (text) {
    Emoji.insertHTML(clean(text).replace(/\n/g, '<br/>'));
  }
},

focusTrick: function (txt, insert, finalize, range, cont) {
  if (!cont) {
    cont = txt;
  }
  var textarea = ce('TEXTAREA', {className: 'emoji_tmp_textarea'});
  txt.parentNode.appendChild(textarea);
  textarea.focus();
  setTimeout(function() {
    var scroll = cont.scrollTop;
    re(textarea);
    txt.focus();
    cont.scrollTop = scroll;
    Emoji.setRange(range);
    insert(val(textarea));
    finalize(txt);
  }, 0);
},

finalizeInsert: function(txt) {
  Emoji.cleanCont(txt);
  setTimeout(Emoji.correctCaret.pbind(txt), 10);
},

getClipboard: function(e) {
  if (e.clipboardData) {
    return e.clipboardData.getData("text");
  } else if (window.clipboardData) {
    return window.clipboardData.getData("Text")
  } else {
    return false;
  }
},

onEditablePaste: function(txt, opts, optId, e, onlyFocus) {
  var range = false;

  if (txt.getAttribute('contenteditable') === 'true') {
    range = Emoji.getRange();
  }

  var text = this.getClipboard(e);
  if (text && range && !onlyFocus) {
    this.insertWithBr(range, text);
    setTimeout(this.finalizeInsert.bind(this, txt), 0);
    return cancelEvent(e);
  } else if (range) {
    this.focusTrick(txt, this.insertWithBr.pbind(range), this.finalizeInsert.bind(this, txt), range);
  }
},

cleanCont: function(cont) {
  var el = cont.firstChild;
  while (el) {
    var next = el.nextSibling;
    switch (el.nodeType) {
      case 1:
        if (el.id == 'tmp_paste_cont') break;
        if (el.tagName == 'DIV' || el.tagName == 'P' || el.tagName == 'SPAN') {
          el.setAttribute('style', '');
          el.className = '';
          el.id = '';
          Emoji.cleanCont(el);
        } else if (el.tagName == 'IMG') {
          if (!Emoji.getCode(el)) {
            re(el);
          }
        } else if (el.tagName != 'BR' ){
          var text = Emoji.editableVal(el, {saveEmoji: true});
          var f = cf(clean(text).replace(/\n/g, '<br/>'));
          var last = f.lastChild;
          el.parentNode.replaceChild(f, el);
          //if (last) {
          //  Emoji.editableFocus(cont, last, true);
          //}
        }
        break;
      case 3:
        var str = clean(el.textContent || el.innerText);

        if (str && str.match(Emoji.emojiRegEx)) { // emoji pasted
          str = str.replace(Emoji.emojiRegEx, Emoji.emojiReplace).replace(/\uFE0F/g, '');
          el.parentNode.replaceChild(cf(str), el);
        }
        break;
    }
    el = next;
  }
},

focus: function(cont, shouldScroll) {
  Emoji.editableFocus(cont, false, true);
  var el = cont.parentNode;

  if (shouldScroll) {
    var y = getXY(el)[1];
    var sc = scrollGetY();
    var height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight);
    var elSize = getSize(el)[1];
    if (sc+height < y + elSize) {
      scrollToY(y - height + elSize + 60, 100);
    } else if (sc > y) {
      scrollToY(y - 60, 100);
    }
  }
},

destroy: function(optId) {
  Emoji.opts[optId].txt.blur();
  if (Emoji.opts[optId].imagesLoader) {
    Emoji.opts[optId].imagesLoader.destroy();
  }
  delete Emoji.opts[optId];
},

editableFocus: function(editable, obj, after, noCollapse, noForce) {
  if (!editable || (noForce && document.activeElement === editable)) {
    return false;
  }
  editable = ge(editable);
  editable.focus();
  if (editable.phonfocus) {
    editable.phonfocus();
  }
  if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
    var sel = window.getSelection();
    if (browser.opera && !after) {
      sel.collapse(obj || editable, 0);
    } else {
      var range = document.createRange();
      if (obj) {
        range.selectNode(obj);
      } else {
        range.selectNodeContents(editable);
      }
      if (!noCollapse) {
        range.collapse(after ? false : true);
      }
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  } else if (typeof document.body.createTextRange != 'undefined') {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(obj || editable);
    textRange.collapse(after ? false : true);
    textRange.select();
  }
},

getRange: function() {
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  } else if (document.selection && document.selection.createRange) {
    return document.selection.createRange();
  }
  return null;
},

setRange: function(range) {
  if (window.getSelection) {
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (document.selection && range.select) {
    range.select();
  }
},

val: function(cont, value) {
  if (value === undefined) {
    return Emoji.editableVal(cont);
  } else {
    value = Emoji.emojiToHTML(value, true);
    value = value.replace(/ $/, '&nbsp;');
    if (cont.setValue) {
      cont.setValue(value);
      cont.phonblur && cont.phonblur();
    } else {
      cont.innerHTML = value;
    }
    return true;
  }
},

editableVal: function(cont, opts) {
  if (!cont) return '';
  if (cont.tagName == 'TEXTAREA') return val(cont);
  var el = cont.firstChild;
  var v = '';
  var contTag = new RegExp('^(DIV|P|LI|OL|TR|TD|BLOCKQUOTE)$');
  while (el) {
    switch (el.nodeType) {
      case 3:
        var str = el.data.replace(/^\n|\n$/g, ' ').replace(/[\n\xa0]/g, ' ').replace(/[ ]+/g, ' ');
        v += str;
        break;
      case 1:
        var str = Emoji.editableVal(el);
        if (el.tagName && el.tagName.match(contTag) && str) {
          if (str.substr(-1) != '\n') {
            str += '\n';
          }

          var prev = el.previousSibling;
          while(prev && prev.nodeType == 3 && trim(prev.nodeValue) == '') {
            prev = prev.previousSibling;
          }
          if (prev && !(prev.tagName && prev.tagName.match(contTag))) {
            str = '\n' + str;
          }

        } else if (el.tagName == 'IMG') {
          var code = Emoji.getCode(el);
          if (code) {
            if (opts && opts.saveEmoji) {
              str += Emoji.getEmojiHTML(code);
            } else {
              str += Emoji.codeToChr(code);
            }
          }
        } else if (el.tagName == 'BR') {
          str += '\n';
        }
        v += str;
        break;
    }
    el = el.nextSibling;
  }
  return v;
},

cssEmoji: {
  'D83DDE0A': [0, ':-)'], 'D83DDE03': [1, ':-D'], 'D83DDE09': [2, ';-)'], 'D83DDE06': [3, 'xD'], 'D83DDE1C': [4, ';-P'], 'D83DDE0B': [5, ':-p'], 'D83DDE0D': [6, '8-)'], 'D83DDE0E': [7, 'B-)'], 'D83DDE12': [8, ':-('], 'D83DDE0F': [9, ';-]'], 'D83DDE14': [10, '3('], 'D83DDE22': [11, ':\'('], 'D83DDE2D': [12, ':_('], 'D83DDE29': [13, ':(('], 'D83DDE28': [14, ':o'], 'D83DDE10': [15, ':|'], 'D83DDE0C': [16, '3-)'], 'D83DDE20': [17, '>('], 'D83DDE21': [18, '>(('], 'D83DDE07': [19, 'O:)'], 'D83DDE30': [20, ';o'], 'D83DDE33': [21, '8|'], 'D83DDE32': [22, '8o'], 'D83DDE37': [23, ':X'], 'D83DDE1A': [24, ':-*'], 'D83DDE08': [25, '}:)'], '2764': [26 , '<3'], 'D83DDC4D': [27, ':like:'], 'D83DDC4E': [28, ':dislike:'], '261D': [29, ':up:'], '270C': [30, ':v:'], 'D83DDC4C': [31, ':ok:']
},
imgEmoji: {'D83DDE15': 1, 'D83DDE1F': 1, 'D83DDE2E': 1, 'D83DDE34': 1},

getEmojiHTML: function(code, symbol, enabled, is_tab) {
  var editable = (browser.msie && intval(browser.version) > 8) ? ' contenteditable="false"' : '';
  if (Emoji.cssEmoji[code] != undefined) {
    var num = -Emoji.cssEmoji[code][0] * 17;
    return '<img'+editable+' src="/images/blank.gif" emoji="'+code+'" '+(symbol ? 'alt="'+symbol+'"' : symbol)+' class="emoji_css" style="background-position: 0px '+num+'px;" />';
  } else {
    if (!Emoji.imgEmoji[code] && symbol && !enabled) {
      return symbol;
    } else if (is_tab) {
      return '<img class="emoji emoji_need_load" '+(symbol ? 'alt="'+symbol+'"' : '')+' src="/images/blank.gif" data-src="/images/emoji/'+code+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.png" />';
    } else {
      return '<img class="emoji" '+(symbol ? 'alt="'+symbol+'"' : '')+' src="/images/emoji/'+code+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.png" />';
    }
  }
},

codeToChr: function(code) {
  var len = Math.round(code.length / 4);
  var chr = '';
  var i = 0;
  while(len--) {
    chr += String.fromCharCode(parseInt(code.substr(i, 4), 16))
    i += 4;
  }
  return chr;
},

checkEditable: function(optId, obj, options) {
  var scH = obj.scrollHeight;
  var opts = Emoji.opts[optId];
  if (!opts) {
    return false;
  }
  if (!opts.scPaddings) {
    opts.scPaddings = intval(getStyle(obj, 'paddingTop')) + intval(getStyle(obj, 'paddingBottom'));
  }
  scH -= opts.scPaddings;
  var bl = opts.tt;
  if (scH > options.height + (browser.mozilla && opts.isChat ? 0 : 5)) {
    if (!opts.isSized) {
      setStyle(obj, {height: options.height+'px', overflowY: 'auto'});
      var sm = geByClass1('emoji_smile', opts.controlsCont);
      var pt = geByClass1('emoji_smile_icon_promo', opts.controlsCont);
      var ph = ge('im_upload');
      var diff = sbWidth();
      setStyle(sm, vk.rtl ? {left: 1 + diff} : {right: 1 + diff});
      if (pt) {
        setStyle(pt, vk.rtl ? {left: 2 + diff} : {right: 2 + diff});
      }
      if (ph) {
        setStyle(ph.parentNode, vk.rtl ? {left: 1 + diff} : {right: 1 + diff});
      }
      if (bl) setStyle(bl, vk.rtl ? {left: (opts.ttDiff || 31) + diff} : {right: (opts.ttDiff || 31) + diff})
      opts.isSized = true;
    }
  } else if (opts.isSized) {
    setStyle(obj, {height: 'auto', overflowY: 'hidden'});
    var sm = geByClass1('emoji_smile', opts.controlsCont);
    var pt = geByClass1('emoji_smile_icon_promo', opts.controlsCont);
    var ph = ge('im_upload');
    setStyle(sm, vk.rtl ? {left: 1} : {right: 1});
    if (pt) {
      setStyle(pt, vk.rtl ? {left: 2} : {right: 2});
    }
    if (ph) {
      setStyle(ph.parentNode, vk.rtl ? {left: 1}: {right: 1});
    }
    if (bl) setStyle(bl, vk.rtl ? {left: (opts.ttDiff || 31)} : {right: (opts.ttDiff || 31)})
    opts.isSized = false;
  }
  if (opts.onResize) {
    opts.onResize();
  }
},

emojiEnter: function(optId, e) {
  var opts = Emoji.opts[optId],
    ctrlSend = (opts.ctrlSend ? opts.ctrlSend() : opts.noEnterSend) || (cur.ctrl_submit && !opts.noCtrlSend);
  if (
    opts.emojiFocused &&
    opts.emojiOvered &&
    opts.openedByTabKey &&
    (ctrlSend ? !(e.ctrlKey || browser.mac && e.metaKey) : !e.shiftKey)
  ) {
    if (opts.curTab === 0) {
      var img = geByTag1('img', opts.emojiOvered);
      Emoji.addEmoji(optId, Emoji.getCode(img), opts.emojiOvered);
    }
    return cancelEvent(e);
  }
  return true;
},

insertHTML: function(html) {
  if (browser.msie && parseInt(browser.version) < 12) {
    if (document.selection) {
      var r = document.selection.createRange();
      if (r.pasteHTML) {
        r.pasteHTML(html);
      }
    } else {
      var r = document.getSelection().getRangeAt(0);
      var n = document.createElement("span");
      r.surroundContents(n);
      n.innerHTML = html;
      r.collapse(false);
    }
  } else {
    if (html) {
      document.execCommand('insertHTML', false, html);
    }
  }
},

addEmoji: function(optId, code, obj) {
  if (optId === false || code === false) {
    return false;
  }
  var opts = Emoji.opts[optId];
  if (opts.editable) {
    var img = Emoji.getEmojiHTML(code);
    var editable = opts.txt;
    var sel = window.getSelection ? window.getSelection() : false;
    if (sel && sel.rangeCount) {
      r = sel.getRangeAt(0);
      if (r.commonAncestorContainer) {
        var rCont = r.commonAncestorContainer;
      } else {
        var rCont = r.parentElement ? r.parentElement() : r.item(0);
      }
    } else {
      var rCont = false;
    }
    el = rCont;
    while(el && el != editable) {
      el = el.parentNode;
    }
    var edLast = (editable.lastChild || {});
    if (browser.mozilla && edLast.tagName == 'BR' && !edLast.previousSibling) {
      re(editable.lastChild);
    }
    if (!el) {
      Emoji.editableFocus(editable, false, true);
    }
    Emoji.insertHTML(img);
    var emojies = geByClass('emoji', editable);
    emojies.push.apply(emojies, geByClass('emoji_css', editable));
    for (i in emojies) {
      var prev = emojies[i].previousSibling;
      if (prev && prev.nodeType == 3 && prev.textContent && prev.textContent.charCodeAt(0) == 32) {
        var p = prev.previousSibling;
        if (p && p.nodeType == 3 && p.textContent && p.textContent.charCodeAt(p.textContent.length - 1) == 160) {
          re(prev);
        }
      }
    }
    if (editable.check) editable.check();
    setTimeout(Emoji.correctCaret.pbind(editable), 5);
  } else {
    var textArea = opts.txt;
    var val = textArea.value;
    if (browser.iphone || browser.ipad) {
      var text = Emoji.codeToChr(code);
    } else {
      var text = Emoji.cssEmoji[code][1]+' ';
    }
    var endIndex, range;
    if (textArea.selectionStart != undefined && textArea.selectionEnd != undefined) {
      endIndex = textArea.selectionEnd;
      textArea.value = val.slice(0, textArea.selectionStart) + text + val.slice(endIndex);
      textArea.selectionStart = textArea.selectionEnd = endIndex + text.length;
    } else if (typeof document.selection != 'undefined' && typeof document.selection.createRange != 'undefined') {
      textArea.focus();
      range = document.selection.createRange();
      range.text = text;
      range.select();
    }
  }
  if (opts.saveDraft) {
    opts.saveDraft();
  }
},

showShadow: function() {
  return !(browser.msie && browser.version < 10);
},

scrollToggleArrow: function(isShow, side, opts, noAnim) {
  var s = geByClass1('emoji_tabs_'+side+'_s', opts.tt)
  if (noAnim) {
    (isShow ? show : hide)(s);
  } else if (isShow) {
    fadeIn(s, 200);
  } else {
    fadeOut(s, 200);
  }
  opts[side+'Shown'] = isShow;
},

scrollTabs: function(optId, right) {
  var opts = Emoji.opts[optId];
  if (!opts) {
    return;
  }
  var cont = geByClass1('emoji_tabs_wrap', opts.tt);
  var maxScroll = cont.firstChild.clientWidth - cont.clientWidth;
  if (right) {
    var mPos = cont.scrollLeft + 5*34;
    if (mPos >= maxScroll) {
      mPos = maxScroll;
      var rs = geByClass1('emoji_tabs_r_s', opts.tt)
      fadeOut(rs, 200);
      opts.rShown = false;
      Emoji.scrollToggleArrow(false, 'r', opts);
    }
    if (mPos && !opts.lShown) {
      Emoji.scrollToggleArrow(true, 'l', opts);
    }
  } else {
    var mPos = Math.max(cont.scrollLeft - 5*34, 0);
    if (mPos <= 0) {
      mPos = 0;
      Emoji.scrollToggleArrow(false, 'l', opts);
    }
    if (mPos < maxScroll && !opts.rShown) {
      Emoji.scrollToggleArrow(true, 'r', opts);
    }
  }
  //addClass(opts.tt, 'emoji_tabs_anim');
  opts.scrollLeft = mPos;
  animate(cont, {scrollLeft: mPos}, 300, function() {
    //removeClass(opts.tt, 'emoji_tabs_anim');
    // dfasdfasdf
  });
},

ttShow: function(optId, obj, ev) {
  var opts = Emoji.opts[optId];
  clearTimeout(opts.ctt);
  clearTimeout(opts.stt);
  if (opts.scrolling) {
    opts.afterScrollFn = false;
  }
  if (opts.ttShown) return;
  if (obj) opts.obj = obj;
  else obj = opts.obj;

  Emoji.ttClick(optId, obj, false, true, ev);
},

ttHide: function(optId, obj, ev, force) {
  var opts = Emoji.opts[optId];
  clearTimeout(opts.stt);
  if (!opts.ttShown) return;
  if (opts.scrolling) {
    opts.afterScrollFn = Emoji.ttHide.pbind(optId, obj, ev, force);
    return;
  }
  obj = obj || opts.obj || geByClass1('emoji_smile', opts.controlsCont);
  var hideTT = function() {
    Emoji.ttClick(optId, obj, true, false, ev);
  }
  var showT = opts.ttShowT || 0;
  if (force || vkNow() - showT < 200) {
    hideTT();
  } else {
    opts.ctt = setTimeout(hideTT, 300);
  }
},

ttClick: function(optId, obj, needHide, needShow, ev, tabKey) {
  var opts = Emoji.opts[optId];
  if (!opts) {
    return;
  }
  if ((needHide && !Emoji.shown) || (needShow && Emoji.shown)) {
    return;
  }
  if (!obj) {
    obj = Emoji.shown || ge((cur.peer == -3) ? 'imw_smile' : 'im_smile');
    if (!obj) return;
  }
  if (obj.tt && obj.tt.destroy) {
    obj.tt.destroy();
  }
  if (!opts.tt && opts.sharedTT && opts.sharedTT.emojiTT) {
    opts.tt = opts.sharedTT.emojiTT;
    opts.emojiScroll = opts.sharedTT.emojiScroll;
    opts.allEmojiId = opts.sharedTT.emojiAllId;
  }
  var tt = opts.tt;
  if (!tt) {
    var pointerClass = '';
    if (opts.rPointer) {
      pointerClass = ' emoji_rpointer';
    }
    var prevTab = ls.get('stickers_tab');
    opts.curTab = cur.stickersTab = 0;
    if (prevTab === -1 && !opts.noStickers) {
      var recent = ls.get('recent_stickers');
      if (recent) {
        Emoji.stickers[-1] = recent;
        opts.curTab = cur.stickersTab = -1;
      }
    }
    var tabs = '<div class="emoji_tabs_l_s" onclick="Emoji.scrollTabs('+optId+', 0);"><div class="emoji_sprite emoji_tabs_l_sc"></div><div class="emoji_sprite emoji_tabs_l_si"></div></div><div class="emoji_tabs_r_s" onclick="Emoji.scrollTabs('+optId+', 1);"><div class="emoji_sprite emoji_tabs_r_sc"></div><div class="emoji_sprite emoji_tabs_r_si"></div></div>';
    tabs += Emoji.getTabsCode([[0, 1]], optId);
    tabs += '<span class="emoji_tabs_wrap"><span id="emoji_tabs_cont_'+optId+'" class="emoji_tabs_cont">';
    if (!opts.noStickers && window.emojiStickers !== false && window.emojiStickers !== undefined) {
      tabs += Emoji.getTabsCode(window.emojiStickers, optId);
    }
    var classAddr = '';
    var shopEvents = 'onclick="Emoji.showStickersStore('+optId+');"';
    var shopHint = 'showTooltip(this, {text: \''+getLang('global_store_stickers')+'\', shift: [2,2,4], showdt: 0, black: 1});';
    if (opts.rPointer) {
      shopEvents += ' onmouseover="addClass(this.parentNode.parentNode.parentNode, \'emoji_shop_over\');'+shopHint+'"  onmouseout="removeClass(this.parentNode.parentNode.parentNode, \'emoji_shop_over\');"';
    } else {
      shopEvents += ' onmouseover="'+shopHint+'"';
    }
    tabs += '</span></span>';
    if (!opts.noStickers) {
      tabs += '<a class="fl_r emoji_shop" '+shopEvents+'><div class="emoji_sprite emoji_shop_icon">'+(Emoji.hasNewStickers ? '<div class="emoji_shop_icon_badge">'+Math.abs(Emoji.hasNewStickers)+'</div>' : '')+'</div></a>';
    }
    var tabContent = Emoji.getTabCont(optId, cur.stickersTab);
    var tt = ce('div', {
      id: 'emoji_block_'+optId,
      className: 'emoji_tt_wrap'+(!Emoji.showShadow() ? ' emoji_no_opacity' : '')+classAddr,
      innerHTML: '<div class="emoji_sprite emoji_pointer'+pointerClass+'"></div><div class="emoji_block_cont"><div class="emoji_block_rel"><div class="emoji_sprite emoji_expand_shadow"></div><div class="emoji_sprite emoji_expand_shadow_top"></div><div class="emoji_list_cont"><div class="emoji_list"><div class="emoji_scroll">'+tabContent+'</div></div></div></div><div class="emoji_tabs clear_fix">'+tabs+'</div></div>',
      onmouseover: function(e) {
        if (!hasClass(tt, 'emoji_animated')) Emoji.ttShow(optId, false, e);
      },
      onmouseout: function(e) {
        if (!hasClass(tt, 'emoji_animated')) Emoji.ttHide(optId, false, e);
      }
    });
    opts.tt = tt;
    Emoji.reappendEmoji(optId, tt);
    Emoji.emojiOver(optId, geByClass1('emoji_scroll', tt).firstChild);

    if (opts.sharedTT) {
      opts.sharedTT.emojiTT = tt;
    }
    Emoji.checkEmojiSlider(opts);
    opts.imagesLoader = imagesLoader(geByClass1('emoji_list', tt), {use_iframe: true, need_load_class: 'emoji_need_load'});
  }
  clearTimeout(opts.ttEmojiHide);

  if (Emoji.shownId !== false && Emoji.shownId != optId) {
    Emoji.ttClick(Emoji.shownId, geByClass1('emoji_smile', Emoji.opts[Emoji.shownId].controlsCont), true);
  }
  Emoji.preventMouseOver = false;
  if (Emoji.shown) {
    var toParams = {opacity: 0};
    setTimeout(function() {
      var tt_cont = geByClass1('emoji_block_cont', tt);
      addClass(tt, 'emoji_animated');
      animate(tt, toParams, 200, function() {
        removeClass(tt, 'emoji_animated');
        hide(tt);
      });
    }, 10);
    Emoji.shown = false;
    Emoji.shownId = false;
    opts.ttShown = false;
    opts.emojiFocused = false;
    cur.onMouseClick = false;
    removeEvent(document, 'keydown', Emoji.emojiMove);
    removeClass(obj, 'emoji_smile_on');
    if (opts.onHide) {
      opts.onHide();
    }
  } else {
    opts.openedByTabKey = !!tabKey;
    show(tt);
    var toParams = {opacity: 1};
    Emoji.repositionEmoji(optId, obj, tt);

    setTimeout(function() {
      show(tt);
      addClass(tt, 'emoji_animated');
      animate(tt, toParams, 200, function() {
        removeClass(tt, 'emoji_animated');
      });
    }, 10);
    Emoji.shownId = optId;
    Emoji.shown = obj;
    cur.emojiList = geByClass1('emoji_list', tt);
    opts.ttShown = true;
    opts.ttShowT = vkNow();
    opts.emojiFocused = true;
    removeEvent(document, 'keydown', Emoji.emojiMove);
    setTimeout(function() {
      cur.onMouseClick = function(e) {
        var el = e.target;
        while(el) {
          if (el.id == 'im_texts' || hasClass(el, 'emoji_tt_wrap') || hasClass(el, 'imw_emoji_wrap')) {
            return false;
          }
          el = el.parentNode;
        }
        Emoji.ttClick(optId, false, true);
      }

      addEvent(document, 'keydown', Emoji.emojiMove);
    }, 0);
    addClass(obj, 'emoji_smile_on');
    if (opts.emojiScroll && opts.emojiExpanded) {
      opts.emojiScroll.update(false, true);
      if (browser.msie && opts.curTab === 0 && opts.emojiOvered) {
        Emoji.scrollToListEl(optId, opts.emojiOvered);
      }
    }
    if (opts.onShow) {
      opts.onShow();
    }
  }
  if (!opts.emojiExpanded) {
    Emoji.emojiExpand(optId, tt);
  }
  if (opts.curTab === -1 && opts.recentSticker) {
    var obj = ge('emoji_sticker_item'+optId+'_-1_'+opts.recentSticker);
    if (obj) {
      obj.parentNode.insertBefore(obj, obj.parentNode.firstChild);
    }
  }
  each(geByClass('emoji_smile_icon_promo'), function(i, el) {
    removeEvent(geByClass1('emoji_smile_icon', el.parentNode), 'mouseover');
    re(el);
    Emoji.noNewStickers = true;
  });
  return cancelEvent(ev);
},
curEmojiSet: ['D83DDE0A', 'D83DDE03', 'D83DDE09', 'D83DDE06', 'D83DDE1C', 'D83DDE0B', 'D83DDE0D', 'D83DDE0E', 'D83DDE12', 'D83DDE0F', 'D83DDE14', 'D83DDE22', 'D83DDE2D', 'D83DDE29', 'D83DDE28', 'D83DDE10', 'D83DDE0C', 'D83DDE04', 'D83DDE07', 'D83DDE30', 'D83DDE32', 'D83DDE33', 'D83DDE37', 'D83DDE02', '2764', 'D83DDE1A', 'D83DDE15', 'D83DDE2F', 'D83DDE26', 'D83DDE35', 'D83DDE20',  'D83DDE21', 'D83DDE1D', 'D83DDE34', 'D83DDE18', 'D83DDE1F', 'D83DDE2C', 'D83DDE36', 'D83DDE2A', 'D83DDE2B', '263A', 'D83DDE00', 'D83DDE25', 'D83DDE1B', 'D83DDE16', 'D83DDE24', 'D83DDE23', 'D83DDE27', 'D83DDE11', 'D83DDE05', 'D83DDE2E', 'D83DDE1E', 'D83DDE19', 'D83DDE13', 'D83DDE01', 'D83DDE31', 'D83DDE08', 'D83DDC7F', 'D83DDC7D', 'D83DDC4D', 'D83DDC4E', '261D', '270C', 'D83DDC4C', 'D83DDC4F', 'D83DDC4A', '270B', 'D83DDE4F', 'D83DDC43', 'D83DDC46', 'D83DDC47', 'D83DDC48', 'D83DDCAA', 'D83DDC42', 'D83DDC8B', 'D83DDCA9', '2744', 'D83CDF4A', 'D83CDF77', 'D83CDF78', 'D83CDF85', 'D83DDCA6', 'D83DDC7A', 'D83DDC28', 'D83DDD1E', 'D83DDC79', '26BD', '26C5', 'D83CDF1F', 'D83CDF4C', 'D83CDF7A', 'D83CDF7B', 'D83CDF39', 'D83CDF45', 'D83CDF52', 'D83CDF81', 'D83CDF82', 'D83CDF84', 'D83CDFC1', 'D83CDFC6', 'D83DDC0E', 'D83DDC0F', 'D83DDC1C', 'D83DDC2B', 'D83DDC2E', 'D83DDC03', 'D83DDC3B', 'D83DDC3C', 'D83DDC05', 'D83DDC13', 'D83DDC18', 'D83DDC94', 'D83DDCAD', 'D83DDC36', 'D83DDC31', 'D83DDC37', 'D83DDC11', '23F3', '26BE', '26C4', '2600', 'D83CDF3A', 'D83CDF3B', 'D83CDF3C', 'D83CDF3D', 'D83CDF4B', 'D83CDF4D', 'D83CDF4E', 'D83CDF4F', 'D83CDF6D', 'D83CDF37', 'D83CDF38', 'D83CDF46', 'D83CDF49', 'D83CDF50', 'D83CDF51', 'D83CDF53', 'D83CDF54', 'D83CDF55', 'D83CDF56', 'D83CDF57', 'D83CDF69', 'D83CDF83', 'D83CDFAA', 'D83CDFB1', 'D83CDFB2', 'D83CDFB7', 'D83CDFB8', 'D83CDFBE', 'D83CDFC0', 'D83CDFE6', 'D83DDE38'],
curEmojiKeys: {},
emojiShowMore: function(optId) {
  var opts = Emoji.opts[optId];
  if (opts.curTab) {
    return;
  }
  if (Emoji.allEmojiCodes) {
    var code;
    var shown = 0;
    var cont = geByClass1('emoji_scroll', opts.tt);
    var str = '';
    re('im_emoji_progress');
    while(code = Emoji.allEmojiCodes[opts.allEmojiId]) {
      opts.allEmojiId += 1;
      if (opts.sharedTT) {
        opts.sharedTT.emojiAllId = opts.allEmojiId;
      }
      if (Emoji.curEmojiKeys[code]) {
        continue;
      }
      str += Emoji.emojiWrapItem(optId, code);
      shown += 1;
      if (shown > 128) {
        break;
      }
    }
    if (str) {
      cont.appendChild(cf(str));
      opts.emojiScroll.update(false, true)
    }
  } else {
    cur.onEmojiLoad = Emoji.emojiShowMore.pbind(optId);
  }
},

emojiLoadMore: function(optId) {
  var opts = Emoji.opts[optId];
  opts.emojiMoreSt = 1;
  if (Emoji.allEmojiCodes) {
    opts.allEmojiId = 0;
    if (opts.sharedTT) {
      opts.sharedTT.emojiAllId = 0;
    }
    if (cur.onEmojiLoad) {
      cur.onEmojiLoad();
    }
  } else {
    var params = {act: 'get_emoji_list'};
    if (Emoji.hasNewStickers < 0) params.new_shown = 1;
    ajax.post('al_im.php', params, {
      onDone: function(codes, stickers) {
        Emoji.stickers = stickers;
        if (Emoji.stickers[-1]) {
          ls.set('recent_stickers', Emoji.stickers[-1]);
        }
        opts.allEmojiId = 0;
        if (opts.sharedTT) {
          opts.sharedTT.emojiAllId = 0;
        }
        Emoji.allEmojiCodes = codes;
        if (cur.onEmojiLoad) {
          cur.onEmojiLoad();
        }
        if (Emoji.onStickersLoad) {
          Emoji.onStickersLoad();
          Emoji.onStickersLoad = false;
        }
      }
    })
  }
},

ttEmojiList: function(optId) {
  var list = [];
  var ems = Emoji.curEmojiSet;
  var recent = [];
  var recentList = {};

  for (var i in ems) {
    var code = ems[i];
    Emoji.curEmojiKeys[code] = 1;
    var str = Emoji.emojiWrapItem(optId, code, i);
    list.push(str);
  }
  if (recent.length) {
    list.unshift.apply(list, recent);
  }
  var loadingEl = '<div align="center" id="im_emoji_progress"><span class="progress_inline progress_gray"></span></div>';

  return list.join('')+loadingEl;
},

emojiWrapItem: function(optId, code, i) {
  var info = Emoji.cssEmoji[code];
  if (info) {
    var titleStr = ' title="'+info[1]+'"';
  } else {
    var titleStr = '';
  }
  if (browser.mobile) {
    var overEvent = '';
  } else {
    var overEvent = ' onmouseover="return Emoji.emojiOver('+optId+', this, true);"';
  }
  return '<a class="emoji_smile_cont '+((code != '2764' && i && (i < 54)) ? 'emoji_smile_shadow' : '')+'" '+titleStr+' onmousedown="Emoji.addEmoji(Emoji.shownId, \''+code+'\', this); return cancelEvent(event);" onclick="return cancelEvent(event);"'+overEvent+'><div class="emoji_bg"></div><div class="emoji_shadow"></div>'+Emoji.getEmojiHTML(code, false, false, true)+'</a>'
},

reappendEmoji: function(optId, tt) {
  var opts = Emoji.opts[optId];
  if (opts && opts.rceCont) {
    if (!opts.addMediaBtn) {
      opts.sendWrap.appendChild(opts.rceCont);
    } else {
      opts.sendWrap.insertBefore(opts.rceCont, opts.addMediaBtn);
    }
  }
  if (!tt) return;
  var controls = opts.controlsCont;
  var diff = opts.isSized ? sbWidth() : 0;

  controls.insertBefore(tt, domFC(controls));
  diff += opts.ttDiff + Emoji.ttShift;
  setStyle(tt, vk.rtl ? {left: diff} : {right: diff});
  clearTimeout(cur.ttEmojiHide);
  hide(tt);
},
ttMarginTop: function(optId, obj, tt) {
  window.headH = window.headH || ge('page_header') && getSize(ge('page_header'))[1] || 50;
  var wh = (window.pageNode && window.browser.mozilla ? Math.min(getSize(pageNode)[1], window.lastWindowHeight) : window.lastWindowHeight) || getScroll()[3],
      scrollY = window.scrollGetY ? scrollGetY() : getScroll()[1],
      objY = getXY(obj)[1], objH = getSize(obj)[1],
      list = geByClass1('emoji_list', tt),
      smileH = Emoji.opts[optId].emojiSmileHeigh,
      headSpace = headH, rowsCnt = Emoji.opts[optId].emojiRowsCount, offsetH = 9, listPadding = 8;

  if (ge('page_header') && getStyle(ge('page_header'), 'position') != 'fixed') {
    headSpace = Math.max(0, headH - scrollY);
  }
  setStyle(list, {height: rowsCnt * smileH + listPadding});
  var ttH = getSize(tt)[1], mTop, toUp, space,
      upSpace = objY - offsetH - headSpace - scrollY,
      downSpace = wh + scrollY - objY - objH - offsetH;
  if (upSpace < ttH && downSpace < ttH) {
    toUp = (upSpace >= downSpace);
  } else {
    toUp = (upSpace >= ttH);
  }
  space = (toUp ? upSpace : downSpace);
  while (space < ttH && rowsCnt > 4) {
    rowsCnt--;
    ttH -= smileH;
  }
  Emoji.opts[optId].emojiRowsCount = rowsCnt;
  Emoji.opts[optId].emojiSmileHeigh = smileH;
  setStyle(list, {height: rowsCnt * smileH + listPadding});
  toggleClass(tt, 'pointer_up', !toUp);

  if (toUp) {
    mTop = -ttH - offsetH;
  } else {
    mTop = objH + offsetH;
  }
  return mTop;
},
repositionEmoji: function(optId, obj, tt) {
  var opts = Emoji.opts[optId], arrow;
  if (!opts) {
    return;
  }
  if (tt.parentNode && getXY && getStyle && setStyle && geByClass && (arrow = geByClass1("emoji_rpointer", tt))) {
    var width = parseInt(getStyle(tt, "width")),
        arrowLeft = 266,
        arrowCenter = 7,
        needOffset = 10,
        needX = getXY(obj)[0],
        objWidth = parseInt(getStyle(obj, "width")),
        parentLeft = getXY(tt.parentNode)[0];

    if (needX + objWidth / 2 < arrowLeft + arrowCenter + needOffset) {
      setStyle(tt, 'left', -width - parentLeft);
      setStyle(arrow, 'left', (needX + objWidth / 2 - needOffset * 2) + "px");
    } else {
      setStyle(tt, 'left', '');
      setStyle(arrow, 'left', '');
    }
  } else {
    setStyle(tt, 'left', '');
  }
  var list = geByClass1('emoji_list', tt),
    firstSmile = geByClass1('emoji_smile_cont', list);
  Emoji.opts[optId].emojiSmileHeigh = firstSmile && getSize(firstSmile)[1] || 26;
  Emoji.opts[optId].emojiRowsCount = 9;
  var topShift = (opts.topShift || -Emoji.ttMarginTop(optId, obj, tt));
  setStyle(tt, {marginTop: -topShift});
},
emojiOver: function(optId, obj, withMouse) {
  if (browser.mobile || withMouse && Emoji.preventMouseOver) {
    return true;
  }
  var opts = Emoji.opts[optId]
  addClass(obj, 'emoji_over');
  if (opts.emojiOvered && opts.emojiOvered != obj) {
    removeClass(opts.emojiOvered, 'emoji_over');
  }
  opts.emojiOvered = obj;
},
emojiExpand: function(optId, block) {
  var opts = Emoji.opts[optId];
  var list = geByClass1('emoji_list', block);
  addClass(block, 'emoji_expanded');

  Emoji.emojiLoadMore(optId);

  if (opts.emojiScroll) {
    opts.emojiScroll.enable()
  } else {
    var topShown = false;
    var bottomShown = false;
    opts.emojiScroll = new Scrollbar(list, {
      prefix: 'emoji_',
      nomargin: true,
      global: true,
      nokeys: true,
      right: vk.rtl ? 'auto' : 9,
      left: !vk.rtl ? 'auto' : 9,
      startDrag: function() {
        opts.scrolling = true;
      },
      stopDrag: function() {
        opts.scrolling = false;
        if (opts.afterScrollFn) {
          opts.afterScrollFn();
        }
      },
      scrollChange: function(top) {
        if (window.tooltips) {
          tooltips.destroyAll();
          cur.ttScrollTime = new Date().getTime();
        }
        if (Emoji.showShadow()) {
          if (top && !topShown) {
            show(geByClass1('emoji_expand_shadow_top', opts.tt));
            topShown = true;
          } else if (!top && topShown) {
            topShown = false;
            hide(geByClass1('emoji_expand_shadow_top', opts.tt));
          }
        }
        /*if (top > 10 && !opts.emojiMoreSt) {
          Emoji.emojiLoadMore(optId);
        }*/
        if (opts.imagesLoader) {
          opts.imagesLoader.processLoad();
        }
      },
      more: Emoji.emojiShowMore.pbind(optId)
    });

    if (opts.sharedTT) {
      opts.sharedTT.emojiScroll = opts.emojiScroll;
    }
  }
  opts.emojiExpanded = true;
},

emojiMove: function(e) {
  var optId = Emoji.shownId;
  var opts = Emoji.opts[optId];
  if (Emoji.shown && opts.emojiFocused && opts.openedByTabKey) {
    var el = null;
    switch (e.keyCode) {
      case KEY.LEFT:
        el = opts.emojiOvered.previousSibling;
        cancelEvent(e);
        break;
      case KEY.RIGHT:
        el = opts.emojiOvered.nextSibling;
        cancelEvent(e);
        break;
      case KEY.UP:
        var i = 11;
        el = opts.emojiOvered;
        while (el.previousSibling && --i > 0) {
          el = el.previousSibling;
        }
        cancelEvent(e);
        if (i > 1) {
          return false;
        }
        break;
      case KEY.DOWN:
        var i = 11;
        el = opts.emojiOvered;
        while (el.nextSibling && --i > 0) {
          el = el.nextSibling;
        }
        cancelEvent(e);
        if (i > 1) {
          return false;
        }
        break;
      case KEY.ENTER:
        if (!Emoji.emojiEnter(optId, e)) {
          cancelEvent(e);
          return false;
        }
        break;
      default:
        return true;
    }
    if (el) {
      Emoji.scrollToListEl(optId, el);
      Emoji.preventMouseOver = true;
      Emoji.emojiOver(optId, el);
      return false;
    }
  }
  return true;
},

scrollToListEl: function(optId, el) {
  if (!cur.emojiList.contains(el)) return;
  var opts = Emoji.opts[optId],
    diff = el.offsetTop - cur.emojiList.scrollTop;
  if (diff >= opts.emojiSmileHeigh * opts.emojiRowsCount) {
    animate(cur.emojiList, {scrollTop: cur.emojiList.scrollTop + (diff - opts.emojiSmileHeigh * (opts.emojiRowsCount - 1))}, 80, function() {
      opts.emojiScroll.update(true, true)
    });
  } else if (diff < 0) {
    animate(cur.emojiList, {scrollTop: cur.emojiList.scrollTop + diff}, 80, function() {
      opts.emojiScroll.update(true, true)
    });
  }
},

anim: function(el, to) {
  clearInterval(cur._imAnim);
  var dt = 300, dStep = 45 / (dt / 13), oStep = 1 / (dt / 13), steps = Math.floor(dt / 13), i = 0;
  var el1 = domLC(el), el2 = domFC(el);
  var dFrom1 = to ? 0 : 45, dTo1 = to ? 45 : 0, oFrom1 = to ? 1 : 0, oTo1 = to ? 0 : 1;
  cur._imAnim = setInterval(function() {
    ++i;
    var d1 = (i >= steps) ? dTo1 : (dFrom1 + dStep * i * (to ? 1 : -1)), d2 = d1 - 45;
    var o1 = (i >= steps) ? oTo1 : (oFrom1 + oStep * i * (to ? -1 : 1)), o2 = 1 - o1;
    el1.style.WebkitTransform = el1.style.OTransform = el1.style.transform = 'rotate(' + d1 + 'deg)';
    el2.style.WebkitTransform = el2.style.OTransform = el2.style.transform = 'rotate(' + d2 + 'deg)';
    el1.style.opacity = o1;
    el2.style.opacity = o2;
    if (i >= steps) {
      clearInterval(cur._imAnim);
      (to ? addClass : removeClass)(el, 'emoji_smile_on');
      el1.style.WebkitTransform = el1.style.OTransform = el1.style.transform = el2.style.WebkitTransform = el2.style.OTransform = el2.style.transform = el1.style.opacity = el2.style.opacity = '';
    }
  }, 13);
},
ttOver: function(obj) {
  animate(obj, {opacity: 1}, 200);
},
ttOut: function(obj) {
  animate(obj, {opacity: 0.7}, 200);
},
tplSmile: function(optId, placeholder, classAddr) {
  return '<div title="'+placeholder+'" class="fl_l emoji_smile'+classAddr+'" onmouseover="Emoji.ttShow('+optId+', this);" onmouseout="Emoji.ttHide('+optId+', this);" onclick="return cancelEvent(event);"><div class="emoji_smile_icon_on"></div><div class="emoji_smile_icon"></div></div>'
},

emojiToHTML: function(str, replaceSymbols, noBr) {
  if (browser.ipad || browser.iphone) {
    return str;
  }
  str = str.replace(/&nbsp;/g, ' ').replace(/<br>/g, "\n");
  var regs = {
    'D83DDE07': /(\s|^)([0OÎ]:\))([\s\.,]|$)/g,
    'D83DDE09': /(\s|^)(;-\)+)([\s\.,]|$)/g,
    'D83DDE06': /(\s|^)([XÕxõ]-?D)([\s\.,]|$)/g,
    'D83DDE0E': /(\s|^)(B-\))([\s\.,]|$)/g,
    'D83DDE0C': /(\s|^)(3-\))([\s\.,]|$)/g,
    'D83DDE20': /(\s|^)(&gt;\()([\s\.,]|$)/g,
    'D83DDE30': /(\s|^)(;[oîOÎ])([\s\.,]|$)/g,
    'D83DDE33': /(\s|^)(8\|)([\s\.,]|$)/g,
    'D83DDE32': /(\s|^)(8-?[oîOÎ])([\s\.,]|$)/g,
    'D83DDE0D': /(\s|^)(8-\))([\s\.,]|$)/g,
    'D83DDE37': /(\s|^)(:[XÕ])([\s\.,]|$)/g,
    'D83DDE28': /(\s|^)(:[oîOÎ])([\s\.,]|$)/g,
    '2764': /(\s|^)(&lt;3)([\s\.,]|$)/g
  };

  for (var i = 0; i < 2; i++) {
    for (var code in regs) {
      str = str.replace(regs[code], function(match, pre, smile, space) {
        return (pre || '') + Emoji.getEmojiHTML(code)+(space || '');
      });
    }
  }

  var regs = {
    'D83DDE0A': /(:-\))([\s\.,]|$)/g,
    'D83DDE03': /(:-D)([\s\.,]|$)/g,
    'D83DDE1C': /(;-[PÐ])([\s\.,]|$)/g,
    'D83DDE0B': /(:-[pð])([\s\.,]|$)/g,
    'D83DDE12': /(:-\()([\s\.,]|$)/g,
    '263A': /(:-?\])([\s\.,]|$)/g,
    'D83DDE0F': /(;-\])([\s\.,]|$)/g,
    'D83DDE14': /(3-?\()([\s\.,]|$)/g,
    'D83DDE22': /(:&#039;\()([\s\.,]|$)/g,
    'D83DDE2D': /(:_\()([\s\.,]|$)/g,
    'D83DDE29': /(:\(\()([\s\.,]|$)/g,
    //'D83DDE15': /(:\\)([\s\.,]|$)/g,
    'D83DDE10': /(:\|)([\s\.,]|$)/g,
    'D83DDE21': /(&gt;\(\()([\s\.,]|$)/g,
    'D83DDE1A': /(:-\*)([\s\.,]|$)/g,
    'D83DDE08': /(\}:\))([\s\.,]|$)/g,
    'D83DDC4D': /(:like:)([\s\.,]|$)/g,
    'D83DDC4E': /(:dislike:)([\s\.,]|$)/g,
    '261D': /(:up:)([\s\.,]|$)/g,
    '270C': /(:v:)([\s\.,]|$)/g,
    'D83DDC4C': /(:ok:|:îê:)([\s\.,]|$)/g
  };
  for (var code in regs) {
    str = str.replace(regs[code], function(match, smile, space) {
      return Emoji.getEmojiHTML(code)+(space || '');
    });
  }

  str = str.replace(/\n/g, '<br>');

  if (replaceSymbols) {
    str = str.replace(Emoji.emojiRegEx, Emoji.emojiReplace);
  }

  return str;
},

emojiReplace: function(symbolstr) {
  var i = 0;
  var buffer = '';
  var altBuffer = '';
  var num = '';
  var symbols = [];
  var codes = [];
  var collectCodes = true;

  if (symbolstr.match(/\uFE0F\u20E3/g)) {
    symbolstr = symbolstr.replace(/\uFE0F/g, '');
  }

  do {
    var num = symbolstr.charCodeAt(i++);

    if (!num) {
      collectCodes = false;
      continue;
    }

    var code = num.toString(16).toUpperCase();
    var symbol = symbolstr.charAt(i - 1);

    if (num == 8419) {
      var numPrevPos = i - 2;
      var numPrevChar = symbolstr.charAt(numPrevPos);

      codes.push('003' + numPrevChar + '20E3');
      symbols.push(numPrevChar);

      buffer = '';
      altBuffer = '';
      continue;
    }

    buffer += code;
    altBuffer += symbol;

    if (!symbol.match(Emoji.emojiCharSeq)) {
      codes.push(buffer);
      symbols.push(altBuffer);
      buffer = '';
      altBuffer = '';
    }

  } while (collectCodes)

  if (buffer) {
    codes.push(buffer);
    symbols.push(altBuffer);
  }

  var out = '';
  var joiner = false;
  var isFlag = false;

  i = 0;
  buffer = '';
  altBuffer = '';

  for (var i in codes) {
    var code = codes[i];
    var symbol = symbols[i];
    if (symbol.match(/\uD83C[\uDFFB-\uDFFF]/)) { // colors
      buffer += code;
      altBuffer += symbol;
      continue;
    }
    if (joiner) {
      buffer += code;
      altBuffer += symbol;
      joiner = false;
      continue;
    }
    if (code == '200C' || code == '200D') { // joiners
      if (buffer) {
        joiner = true;
        continue;
      } else {
        out += symbol;
      }
    }
    if (symbol.match(/\uD83C[\uDDE6-\uDDFF]/)) { // flags
      if (isFlag) {
        buffer += code;
        altBuffer += symbol;
        isFlag = false;
        continue;
      }
      isFlag = true;
    } else if (isFlag) {
      isFlag = false;
    }

    if (buffer) {
      out += Emoji.getEmojiHTML(buffer, altBuffer, true);
    }
    buffer = code;
    altBuffer = symbol;
  }

  if (buffer) {
    out += Emoji.getEmojiHTML(buffer, altBuffer, true);
  }

  return out;
},

emojiCharSeq: /[0-9\uD83D\uD83C\uD83E]/,

emojiRegEx: /((?:[\u203C\u2049\u2122\u2328\u2601\u260E\u261d\u2626\u262A\u2638\u2639\u263a\u267B\u267F\u2702\u2708]|[\u2600\u26C4\u26BE\u2705\u2764]|[\u2194-\u2199\u21AA\u21A9]|[\u231A-\u231B]|[\u23E9-\u23EF]|[\u23F0-\u23F4]|[\u23F8-\u23FA]|[\u24C2]|[\u25AA-\u25AB]|[\u25B6\u25C0]|[\u25FB-\u25FE]|[\u2602-\u2618]|[\u2648-\u2653]|[\u2660-\u2668]|[\u26A0-\u26FA]|[\u2692-\u269C]|[\u262E-\u262F]|[\u2622-\u2623]|[\u2709-\u2764]|[\u2795-\u2797]|[\u27A1]|[\u27BF]|[\u2934-\u2935]|[\u2B05-\u2B07]|[\u2B1B]|[\u2B50\u2B55]|[\u303D]|[\u3297\u3299]|[\uE000-\uF8FF]|[\uD83D\uD83C\uD83E][\uDC00-\uDFFF]|[0-9]\u20E3|[\u0023-\u0039\u203C-\u21AA]\uFE0F\u20E3|[\u200C\u200D])+)/g,

emojiFlagRegEx: /\uD83C\uDDE8\uD83C\uDDF3|\uD83C\uDDE9\uD83C\uDDEA|\uD83C\uDDEA\uD83C\uDDF8|\uD83C\uDDEB\uD83C\uDDF7|\uD83C\uDDEC\uD83C\uDDE7|\uD83C\uDDEE\uD83C\uDDF9|\uD83C\uDDEF\uD83C\uDDF5|\uD83C\uDDF0\uD83C\uDDF7|\uD83C\uDDF7\uD83C\uDDFA|\uD83C\uDDFA\uD83C\uDDF8/,

getCode: function(obj) {
  var code = false;
  if (obj.className == 'emoji') {
    var m = obj.src.match(/\/([a-zA-Z0-9]+)(_2x)?.png/);
    if (m) {
      var code = m[1];
    }
  } else if (obj.className == 'emoji_css') {
    var code = obj.getAttribute('emoji');
  }
  return code;
},

getTabCont: function(optId, selId) {
  var stickerSize = (window.devicePixelRatio >= 2) ? '128' : '64';
  if (selId) {
    var html = '';
    var pack = Emoji.stickers[selId];
    if (!pack) {
      return '';
    }
    var list = pack.stickers;
    var size = 64;
    var sizeDiv = 256 / size;
    for (var i in list) {
      html += '<a id="emoji_sticker_item'+optId+'_'+selId+'_'+list[i][0]+'" class="emoji_sticker_item" onclick="Emoji.stickerClick('+optId+', '+list[i][0]+', '+list[i][1]+', this);"><img class="emoji_need_load" width="'+parseInt(list[i][1] / sizeDiv)+'" height="'+size+'" src="/images/blank.gif" data-src="/images/stickers/'+list[i][0]+'/'+stickerSize+'.png" /></a>';
    }
  } else {
    var html = Emoji.ttEmojiList(optId);
  }
  return html;
},

tabSwitch: function(obj, selId, optId) {
  if (!Emoji.stickers || isEmpty(Emoji.stickers)) {
    Emoji.onStickersLoad = Emoji.tabSwitch.pbind(obj, selId, optId);
    return false;
  }
  var opts = Emoji.opts[optId];
  var tt = opts.tt;

  var tabsCont = geByClass1('emoji_tabs', tt);
  var selEl = geByClass1('emoji_tab_sel', tabsCont);
  if (selEl == obj) {
    return;
  }
  if (opts.imagesLoader) {
    opts.imagesLoader.iloader && opts.imagesLoader.iloader.abort();
    opts.imagesLoader.destroy();
  }
  removeClass(selEl, 'emoji_tab_sel');
  addClass(obj, 'emoji_tab_sel');
  opts.curTab = selId;
  cur.stickersTab = selId;
  ls.set('stickers_tab', selId)

  opts.allEmojiId = 0;
  var html = Emoji.getTabCont(optId, selId);
  var cont = geByClass1('emoji_scroll', tt);
  cont.innerHTML = html;
  if (opts.imagesLoader) {
    opts.imagesLoader.processLoad();
  }
  if (opts.emojiOvered && opts.curTab === 0) {
    Emoji.emojiOver(optId, geByClass1('emoji_scroll', tt).firstChild);
  }
  opts.emojiScroll.scrollTop();
  opts.emojiScroll.update();
},

stickerClick: function(optId, stickerNum, width, obj) {
  var opts = Emoji.opts[optId];
  if (!Emoji.stickers[-1]) {
    Emoji.stickers[-1] = {stickers:[]};
  }
  for(var i in Emoji.stickers[-1].stickers) {
    if (Emoji.stickers[-1].stickers[i][0] == stickerNum) {
      Emoji.stickers[-1].stickers.splice(i, 1);
    }
  }
  Emoji.stickers[-1].stickers.unshift([stickerNum, width]);
  ls.set('recent_stickers', Emoji.stickers[-1]);

  if (opts.onStickerSend) {
    opts.onStickerSend(stickerNum);
  }
  Emoji.ttHide(optId, false, false, true);

  opts.recentSticker = stickerNum;
},

stickerOver: function(stickerNum, el) {
  var params = {act: 'a_stickers_hover', sticker_id: stickerNum, from: cur.module};
  var tt_index = (cur.tooltips || []).length;

  if (isObject(el.tt) && el.firstChild.nodeName === 'IMG') {
    return el.tt.show();
  }

  var opt = {
    url: 'al_im.php',
    params: params,
    index: tt_index,
    className: 'subscribe_post_tt sticker_extra_tt sticker_extra_tt' + tt_index,
    shift: function() {
      if (browser.mozilla || browser.opera && browser.version.match(/(\d+)/)[0] <= 12) {
        return [-138, 0, -190];
      }
      return [-138, 0, -70];
    },
    hasover: 1,
    slideX: 15,
    showsp: 150,
    cache: 1,
    forcetodown: true,
    no_shadow: true
  };

  return showTooltip(el, opt);
},

selectPeer: function(optId) {
  if (optId !== undefined) {
    var opts = Emoji.opts[optId];
    if (opts.peer) {
      return opts.peer;
    }
  }
  var peer = cur.peer || (cur.mbTo ? cur.mbTo[0] : '');
  if (peer == -3) {
    if (cur.wdd['imw_dd']) {
      var cnt = 0;
      for(var i in cur.wdd['imw_dd'].selected){
        peer = cur.wdd['imw_dd'].selected[i][0];
        cnt += 1;
      }
      if (cnt > 1) {
        peer = '';
      }
    }
  }
  return peer;
},

showMyStickers: function() {
  cur.boxMyStickers = showBox('al_im.php', {act: 'stickers_my'}, {dark: 1, stat: ['im.css', 'im.js', 'sorter.js']});
},

showStickersStore: function(optId) {
  var peer = Emoji.selectPeer(optId);
  cur.boxStickersStore = showBox('al_im.php', {act: 'stickers_store', peer: peer, box: 1}, {dark: 1, stat: ['im.css', 'im.js', 'page_help.css', 'sorter.js']});
  each(geByClass('emoji_smile_icon_promo'), function(i, el) { geByClass1('emoji_smile_icon', el.parentNode); re(el); });
  each(geByClass('emoji_shop_icon_badge'), function(i, el) { re(el); });
  Emoji.hasNewStickers = false;
},

previewSticker: function(packId, obj, opts, ev) {
  opts = opts || {};
  if (ev && checkEvent(ev)) return true;
  var params = {act: 'sticker_preview', pack_id: packId};
  var peer = Emoji.selectPeer();
  if (opts.peer) {
    params.peer = opts.peer;
  } else if (peer) {
    params.peer = peer;
  }
  if (opts.preview) {
    params.preview = 1;
  }
  if (opts.name) {
    var query = nav.objLoc[0].split('/');
    if (query[0] == 'stickers' && query[1] != opts.name) {
      nav.setLoc({0: 'stickers/' + opts.name});
    }
  }
  cur.boxStickersPreview = showBox('al_im.php', params, {dark: 1, stat: ['im.css', 'im.js'], onFail: function(e) {
    if (!window.emojiStickersDisabled) window.emojiStickersDisabled = {};
    window.emojiStickersDisabled[packId] = true;
    if (e) return true;
  }});
  cancelEvent(ev);
  return false;
},

isStickerPackEnabled: function(packId, onStickersLoad) {
  var en = false;
  if (!window.emojiStickers && onStickersLoad) {
    ajax.post('al_im.php', {act: 'a_stickers_list'}, {
      onDone: function(data) {
        window.emojiStickers = data;
        onStickersLoad();
      }
    })
    return 0;
  } else if (!window.emojiStickers) {
    return false;
  }
  for (var i in window.emojiStickers) {
    if (window.emojiStickers[i][0] == packId) {
      en = window.emojiStickers[i][1] ? true : false;
      break;
    }
  }
  return en;
},

clickSticker: function(packId, obj, ev) {
  if (window.emojiStickersDisabled && window.emojiStickersDisabled[packId]) {
    return true;
  }
  if (packId == 82) {
    return showWiki({w: 'vk2016'}, false, ev);
  }
  if (obj) {
    var en = Emoji.isStickerPackEnabled(packId, Emoji.clickSticker.pbind(packId, obj, ev));
    if (en === 0) {
      return false;
    }
    if (en) {
      var txt = false;
      if (obj.getAttribute('contenteditable')) {
        txt = obj;
      } else {
        var el = obj.parentNode;
        var mini = false;
        while (el = el.parentNode) {
          if (hasClass(el, 'im_rows')) {
            break;
          }
          if (hasClass(el, 'fc_tab')) {
            mini = true;
            break;
          }
        }
        if (!el) return false;
        if (!mini) {
          var m = el.id.match(/im_rows(\d+)/);
          if (m[1]) {
            txt = ge('im_editable'+m[1]);
          }
        } else {
          txt = geByClass1('fc_editable', el);
        }
      }

      if (txt) {
        var opts = Emoji.opts[txt.emojiId];

        Emoji.ttClick(txt.emojiId, geByClass1('emoji_smile', txt.parentNode.parentNode), false, true);

        var tab_cont = geByClass1('emoji_tabs_wrap', opts.tt),
            tab = geByClass1('emoji_tab_'+packId, tab_cont),
            mPos = tab_cont.scrollLeft,
            maxScroll = tab_cont.firstChild.clientWidth - tab_cont.clientWidth;
        if (tab.offsetLeft > mPos) {
          while (mPos + 5 * tab.clientWidth < tab.offsetLeft) {
            mPos += 5 * tab.clientWidth;
          }
          if (mPos >= maxScroll) {
            mPos = maxScroll;
            hide(geByClass1('emoji_tabs_r_s', opts.tt));
            opts.rShown = false;
            Emoji.scrollToggleArrow(false, 'r', opts);
          }
          if (mPos && !opts.lShown) {
            Emoji.scrollToggleArrow(true, 'l', opts);
          }
        } else {
          while (mPos > tab.offsetLeft) {
            mPos = Math.max(mPos - 5 * tab.clientWidth, 0);
          }
          if (mPos <= 0) {
            mPos = 0;
            Emoji.scrollToggleArrow(false, 'l', opts);
          }
          if (mPos < maxScroll && !opts.rShown) {
            Emoji.scrollToggleArrow(true, 'r', opts);
          }
        }
        opts.scrollLeft = mPos;
        tab_cont.scrollLeft = mPos;

        if (!Emoji.stickers || isEmpty(Emoji.stickers)) {
          Emoji.onStickersLoad = Emoji.tabSwitch.pbind(tab, packId, txt.emojiId);

          removeClass(geByClass1('emoji_tab_sel', tab_cont), 'emoji_tab_sel');
          addClass(tab, 'emoji_tab_sel');
          geByClass1('emoji_scroll', opts.tt).innerHTML = '<div class="emojo_scroll_progress"></div>';
        } else {
          Emoji.tabSwitch(tab, packId, txt.emojiId);
        }
      }
    }
  }
  if (!obj || !en) {
    Emoji.previewSticker(packId);
  }
  ev && cancelEvent(ev);
  return false;
},

buyStickers: function(packId, ev, obj, hash, fromBtn) {
  if (obj) {
    var back = obj.innerHTML;
    if (hasClass(obj, 'im_stickers_act_done')) {
      return true;
    }
  }
  var peer = Emoji.selectPeer();
  ajax.post('/al_im.php', {act: 'a_stickers_buy', pack_id: packId, hash: hash, peer: peer}, {
    onDone: function(text, newStickers, btnText) {
      each(geByClass('_sticker_btn_' + packId), function() {
        this.innerHTML = btnText;
        this.onmouseover = '';
        this.onclick = '';
        addClass(this, 'im_stickers_act_done');
      });
      if (cur.boxStickersPreview) {
        cur.boxStickersPreview.hide();
      }
      showDoneBox(text);
      if (newStickers) {
        Emoji.updateTabs(newStickers, true);
      }
      var box = cur.tabbedStickersBox;
      if (box && box.tbUpdate) {
        for (var i in box.tbUpdate) {
          box.tbUpdate[i] = 1;
        }
      }

      var optId = cur.emojiId[cur.peer];
      if (optId) {
        var tabEl = geByClass1('emoji_tab_'+packId, Emoji.opts[optId].tt);
        if (tabEl) {
          Emoji.tabSwitch(tabEl, packId, optId);
        }
      }
    },
    showProgress: lockButton.pbind(obj),
    hideProgress: unlockButton.pbind(obj),
    onFail: function(text) {
      if (text) {
        setTimeout(showFastBox(getLang('global_error'), text).hide, 3000);
      }
      return true;
    }
  });
  return cancelEvent(ev);
},

stickerAct: function(obj, packId, hash, ev, fromBtn) {
  if (fromBtn && hasClass(obj, 'im_stickers_act_done')) {
    return true;
  }
  var back = obj.innerHTML;
  var act = fromBtn ? hasClass(obj, 'im_stickers_act_done') : hasClass(obj, 'im_sticker_activated');
  if (act) {
    state = 1;
  } else {
    state = 0;
  }
  var box = cur.tabbedStickersBox;
  if (box) {
    for (var i in box.tbUpdate) {
      box.tbUpdate[i] = 1;
    }
  }
  ajax.post('/al_im.php', {act: 'a_stickers_switch', pack_id: packId, hash: hash, state: state, from_btn: fromBtn ? 1 : 0}, {
    onDone: function(text, newStickers, btnText) {
      if (!fromBtn) {
        obj.innerHTML = text;
        obj.onmouseover = '';
        setStyle(obj, {width: 'auto'});
        toggleClass(obj, 'im_sticker_activated', !state);
      }
      each(geByClass('_sticker_btn_' + packId), function() {
        this.innerHTML = btnText;
        this.onmouseover = '';
        toggleClass(this, 'im_stickers_act_done', !state);
      });
      Emoji.updateTabs(newStickers, true);
      var el = obj.parentNode.parentNode;
      if (fromBtn) {
        return;
      }
      cur.stickersSorter.destroy();
      if (state) {
        show('im_stickers_deact');
        var newCont = ge('im_stickers_deact_wrap');
        if (newCont.firstChild) {
          newCont.insertBefore(el, newCont.firstChild)
        } else {
          newCont.appendChild(el);
        }
        setStyle(el, {cursor: 'default'})
      } else {
        var newCont = ge('im_stickers_my_wrap');
        newCont.appendChild(el);
        var oldCont = ge('im_stickers_deact_wrap');
        if (!oldCont.childNodes.length) {
          hide('im_stickers_deact');
        }
      }
      Emoji.fixFirstEl(ge('im_stickers_deact_wrap'));
      Emoji.fixFirstEl(ge('im_stickers_my_wrap'));
      cur.stickersSorterInit();
    },
    showProgress: lockButton.pbind(obj),
    hideProgress: unlockButton.pbind(obj)
  });
  return cancelEvent(ev);
},

getTabsCode: function(newStickers, optId) {
  var html = '';
  //var stickers = [[0, 1]];
  var stickers = [];
  if (newStickers) {
    stickers.push.apply(stickers, newStickers);
  }
  if (stickers.length > 1) {
    Emoji.hasNewStickers = false;
  }
  for (var i in stickers) {
    var stNum = stickers[i][0];
    var isActive = stickers[i][1];
    if (isActive) {
      var act = 'return Emoji.tabSwitch(this, '+stNum+', '+optId+');';
    } else {
      var act = 'return Emoji.previewSticker('+stNum+');';
    }
    if (stickers[i][2]) {
      Emoji.hasNewStickers = stickers[i][2];
    }
    if (stNum === -1) {
      html += '<a class="emoji_tab emoji_tab_img_cont emoji_tab_recent emoi_tab_'+stNum+' emoji_tab_' + stNum + (cur.stickersTab == stNum ? ' emoji_tab_sel' : '')+'" onclick="'+act+'"><span class="emoji_tab_icon emoji_sprite emoji_tab_icon_recent"></span></a>';
    } else if (stNum) {
      html += '<a class="emoji_tab emoji_tab_img_cont emoi_tab_'+stNum+' emoji_tab_' + stNum + (cur.stickersTab == stNum ? ' emoji_tab_sel' : '')+(isActive ? '' : ' emoji_tab_promo')+'" onclick="'+act+'"><img width="22" height="22" src="/images/store/stickers/'+stNum+'/thumb_'+(window.devicePixelRatio >= 2 ? '44' : '22')+'.png" class="emoji_tab_img"/></a>';
    } else {
      html += '<a class="emoji_tab emoji_tab_'+stNum+(cur.stickersTab == stNum ? ' emoji_tab_sel' : '')+(isActive ? '' : ' emoji_tab_promo')+'" onclick="'+act+'"><div class="emoji_tab_icon emoji_sprite emoji_tab_icon_'+stNum+'"></div></a>';
    }
  }
  return html;
},

updateTabs: function(newStickers, update) {
  if (newStickers && update && window.Notifier) {
    Notifier.lcSend('emoji', {act: 'updateTabs', newStickers: newStickers});
  }
  if (newStickers === undefined) {
    if (!window.emojiStickers) {
      ajax.post('al_im.php', {act: 'a_stickers_list'}, {
        onDone: Emoji.updateTabs
      })
    }
  } else {
    window.emojiStickers = newStickers;
  }
  for (var i in Emoji.opts) {
    var opts = Emoji.opts[i];
    if (opts.noStickers) {
      return false;
    }
    var html = '';
    html += Emoji.getTabsCode(window.emojiStickers, i);
    var tabsCont = ge('emoji_tabs_cont_'+i);
    if (tabsCont) {
      tabsCont.innerHTML = html;
    }
    Emoji.checkEmojiSlider(opts);
  }
},

checkEmojiSlider: function(opts) {
  var cont = geByClass1('emoji_tabs_wrap', opts.tt);
  var shouldShow = false;
  if (!cont) {
    return;
  }
  if (cont.firstChild.clientWidth && (cont.firstChild.clientWidth > cont.clientWidth + cont.scrollLeft)) {
    shouldShow = true;
  } else {
    var cats = cont.firstChild.childNodes;
    if (cats.length > 6) {
      if ((opts.scrollLeft || 0) < (cats.length - 6) * 34 - 16) {
        shouldShow = true;
      }
    }
  }

  var rdir = vk.rtl ? 'l' : 'r';
  if (shouldShow) {
    opts.sliderShown = true;
    Emoji.scrollToggleArrow(true, rdir, opts, true);
  } else if (opts.sliderShown) {
    opts.sliderShown = false;
    Emoji.scrollToggleArrow(false, rdir, opts, true);
  }
},

fixFirstEl: function(cont) {
  var firstClassEls = geByClass('im_stickers_my_first', cont);
  for (var i in firstClassEls) {
    removeClass(firstClassEls[i], 'im_stickers_my_first');
  }
  var newFirstEl = geByClass1('im_stickers_my_row', cont);
  addClass(newFirstEl, 'im_stickers_my_first');
},

giftSticker: function(packId, peersIds, ev, opts) {
  opts = opts || {};
  var params = {
    act: 'stickers_gift_box',
    pack_id: packId,
    peers: peersIds
  };
  if (opts.from) {
    params.from = opts.from;
  }
  boxLayerWrap.scrollTop = 0;
  showBox('/al_im.php', params, {
    stat: ['wide_dd.js', 'wide_dd.css', 'notifier.css', 'notifier.js'],
    dark: 1
  });
  return cancelEvent(ev);
},

showStickerTT: function(el) {
  var text = el.getAttribute('data-title');
  if (!text) return;
  showTooltip(el, {
    text: text,
    slide: 15,
    shift: [74 - getSize(el)[0] / 2, 120, 5],
    className: 'sticker_hint_tt',
    hasover: 1
  });
},

__eof: 1}}
try{stManager.done('emoji.js');}catch(e){}
