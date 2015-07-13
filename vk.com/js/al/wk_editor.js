function WkEditor(cont, opts) {
  this.cont = ge(cont);
  this.imgWidth = 400;
  extend(this, opts);

  cur._wkeId = (cur._wkeId || 0) + 1;
  cur._wke = cur._wke || {};
  cur._wke[cur._wkeId] = this;
  if (!cur.imagesInfo) {
    cur.imagesInfo = {};
  }

  this.cont.setAttribute('contenteditable', 'true');
  addClass(this.cont, 'wke_cont');
  this.cont.setAttribute('spellcheck', 'true');

  var acts = 'keydown mouseup keyup focus blur click copy cut paste';
  addEvent(cont, acts, (function(ev) {
    this.textEvent(ev);
  }).bind(this));
  cur.destroy.push(function() {
    removeEvent(cont, acts);
  });

  this.plainMode = false;

  this.inst = 'cur._wke['+cur._wkeId+']';

  var modeBtn = '';
  if (opts.mode) {
    this.mode = 0;
    this.modeBtn = opts.mode;
    modeBtn = '<a id="wke_b_mode" class="fl_r wke_b" wiki="mode" tooltip="'+opts.mode[2]+'" onmousedown="'+this.inst+'.button(this, event);" onmouseup="'+this.inst+'.buttonUp(this);" onmouseover="'+this.inst+'.ttOver(this, true);" onmouseout="'+this.inst+'.ttOut(this);" style="background-position: '+opts.mode[0]+'px '+opts.mode[1]+'px;"></a>';
  }

  var panel = '<div id="wke_buttons" class="clear_fix"><div class="wke_tt"><div class="wke_tt_tb"></div><div class="wke_tt_t"></div><div class="wke_tt_b"></div></div>'+
              '<div class="wke_loader"></div>'+modeBtn+'<div class="wke_panel clear_fix">';

  for (var i in this.buttons) {
    var itm = this.buttons[i];
    panel += '<a id="wke_b_'+i+'" class="fl_l wke_b" wiki="'+i+'" tooltip="'+itm[2]+'" onmousedown="'+this.inst+'.button(this, event);" onmouseup="'+this.inst+'.buttonUp(this);" onmouseover="'+this.inst+'.ttOver(this);" onmouseout="'+this.inst+'.ttOut(this);" style="background-position: '+itm[0]+'px '+itm[1]+'px;"></a>';
  }
  panel += '</div></div>';

  if (this.panelCont) {
    this.panelCont.innerHTML = panel;
  } else {
    this.panelCont = ce('div', {
      innerHTML: panel,
      id: 'wke_buttons_cont',
    });
    this.cont.parentNode.insertBefore(this.panelCont, this.source || this.cont);
  }
  addClass(this.panelCont, 'wke_pcont');

  this.panel = ge('wke_buttons');

  this.tt = geByClass1('wke_tt', this.panel);
  this.ttText = geByClass1('wke_tt_t', this.tt);
  this.loader = geByClass1('wke_loader', this.panel);

  this.mode = 1;
  this.state = {};

  this.panelXY = getXY(this.panel, this.isLayer);

  var contSize = getSize(this.cont.parentNode);
  if (opts.source) {
    this.textarea = this.source;
  } else {
    this.textarea = this.cont.parentNode.insertBefore(ce('textarea'), this.cont);
  }
  addClass(this.textarea, 'wke_textarea');
  var pl = getStyle(this.textarea, 'paddingLeft');
  var pr = getStyle(this.textarea, 'paddingRight');
  setStyle(this.textarea, {
    width: contSize[0] - intval(pl) - intval(pr),
  });
  autosizeSetup(this.textarea, {minHeight: opts.minHeight || 400});

  addEvent(this.textarea, 'keydown', (function(ev) {
    this.textEvent(ev);
  }).bind(this));

  var lastCursor = this.saveLastCursor.bind(this);
  addEvent(document, 'mousedown', lastCursor);

  cur.destroy.push(function() {
    removeEvent(this.textarea, 'keydown');
    removeEvent(document, 'mousedown', lastCursor);
  });

  this.checkBrowser();
  setTimeout((function() {
    this.prepareCont(this.cont);
  }).bind(this));
}


extend(WkEditor.prototype, {
  textEvent: function(e) {
    var d = document;
    if (e.type == 'keydown') {
      var lastKey = this.lastKey;
      this.lastKey = e.keyCode;
      switch (e.keyCode) {
        case KEY.ENTER:
          this.onChangeHandler();
          if (this.plainMode) {
            break;
          }
          if (this.state.pre) {
            var n = document.createTextNode('\n');
            this.replaceSelected([n]);
            var next = n.nextSibling;
            while(next && next.nodeValue == '') {
              next = next.nextSibling;
            }
            if (!next) {
              n.parentNode.insertBefore(document.createTextNode('\n'), n);
            }
            this.setFocus(n);
            return cancelEvent(e);
          }
          var r  = this.getRange();
          var rangeEl = this.getState(r);
          if (rangeEl && rangeEl[1] == 2) {
            var el = rangeEl[0];
            var br = ce('br');
            if (!r.endOffset && this.getText(el)) {
              var prev = this.prevNode(el);
              if (prev && prev.tagName != 'BR' && (prev.nodeType != 3 || prev.data)) {
                el.parentNode.insertBefore(ce('br'), el);
              }
              el.parentNode.insertBefore(br, el);
              this.setFocus(el, {toStart: true});
            } else {
              this.insertBreak(e, el);
            }
            return cancelEvent(e);
          }
          break;
        case KEY.LEFT:
        case KEY.RIGHT:
        case KEY.UP:
        case KEY.DOWN:
        case KEY.ESC:
        case 17:
        case 16:
        case 18:
        case 91:
          break;
        case 66:
          if (e.ctrlKey || e.metaKey) {
            this.button(ge('wke_b_bold'), e)
          }
          break;
        case 73:
          if (e.ctrlKey || e.metaKey) {
            this.button(ge('wke_b_italic'), e)
          }
          break;

        default:
          this.onChangeHandler();
      }
    } else if (e.type == 'mouseup' || e.type == 'keyup') {
      this.checkEditPlace();
    } else if (e.type == 'focus') {
      this.checkEditPlace();
    } else if (e.type == 'blur') {
      this.switchMode(0);
    } else if (e.type == 'click') {
      var el = e.target;
      if (this.isLink(el)) {
        this.showUrlBox([el, 3]);
        return cancelEvent(e);
      }
      var photoEl = this.isPhoto(el);
      if (photoEl) {
        this.showPhotoBox(photoEl);
        return cancelEvent(e);
      }
      if (el == this.cont && browser.opera) {
        //return this.insertBreak(e);
        this.setFocus(this.cont);
        return cancelEvent(e);
      }
    } else if ((e.type == 'cut' || e.type == 'copy') && !this.plainMode) {
      var imgs = geByTag('img', this.cont);
      imgs = Array.prototype.slice.apply(imgs);
      for (var i in imgs) {
        var imageWrap = imgs[i].parentNode;
        if (imageWrap && imageWrap.tagName == 'A') {
          cur.imagesInfo[imgs[i].src] = [imageWrap.getAttribute('onclick'), imageWrap.getAttribute('wiki'), imageWrap.getAttribute('href')];
        }
      }
    } else if (e.type == 'paste' && !this.plainMode) {
      setTimeout((function() {
        var imgs = geByTag('img', this.cont);
        imgs = Array.prototype.slice.apply(imgs);
        for (var i in imgs) {
          var imageWrap = imgs[i].parentNode;
          if (imageWrap.tagName != 'A' || !imageWrap.getAttribute('wiki')) {
            var info = cur.imagesInfo[imgs[i].src];
            debugLog('info', info);
            if (imageWrap.tagName != 'A') {
              var size = getSize(imgs[i]);
              if (!size[0]) {
                continue;
              }
              var newWrap = ce('a', {innerHTML: '<img width="'+size[0]+'" height="'+size[1]+'" src="'+imgs[i].src+'" />', contentEditable: 'false', className: 'wk_photo'});
              imageWrap.replaceChild(newWrap, imgs[i]);
              imageWrap = newWrap;
            }
            imageWrap.setAttribute('onclick', info[0]);
            imageWrap.setAttribute('wiki', info[1]);
            imageWrap.setAttribute('href', info[2]);
          }
        }

      }).bind(this), 0)
    }


  },

  insertBreak: function(e, el) {
    var div = ce('div', {innerHTML: '<br/>'});
    if (el) {
      if (el.nextSibling) {
        el.parentNode.insertBefore(div, el.nextSibling);
      } else {
        el.parentNode.appendChild(div);
      }
    } else {
      this.cont.appendChild(div);
    }
    this.setFocus(div, {toStart: true});
    return cancelEvent(e);
  },

  showBox: function() {
    if (this.plainMode) {
      cur.wkBoxRange = this.plainGetSel();
    } else {
      cur.wkBoxRange = this.getRange();
    }
    var box = showBox.apply(window, arguments);
    if (!box) {
      return false;
    }
    box.setOptions({onHide: (function() {
      if (cur.wkBoxRange) {
        this.setSelectionRange(cur.wkBoxRange);
      }
    }).bind(this)})
    return box;
  },

  checkFocus: function() {
    if (!browser.chrome) {
      return false;
    }
    var s = this.getSel();
    if (s && s.type != "None") {
      var node = s.focusNode;
      if (node != this.cont) {
        while (node) {
          if (node == this.cont) {
            return false;
          }
          node = node.parentNode;
        }
      }
    }
    this.setFocus(this.cont);
  },

  toggleEditable: function(on) {
    var objs = geByClass('wk_photo', this.cont);
    objs.push.apply(objs, geByClass('wk_photo_no_padding', this.cont))
    for (var i in objs) {
      objs[i].setAttribute('contenteditable', on ? 'false' : 'true');
    }
  },

  button: function(obj, e) {
    if (hasClass(obj, 'wke_b_disabled')) {
      return cancelEvent(e);
    }
    addClass(obj, 'wke_b_down');
    var n = obj.getAttribute('wiki');
    var btn = this.buttons[n];
    var d = document;
    if (!this.plainMode) {
      this.checkFocus();
    }
    switch(n) {
      case 'bold':
        if (this.plainMode) {
          this.plainInsert("'''", "'''")
        } else {
          d.execCommand('bold', false, null);
          this.toggleState(n);
        }
        break;
      case 'italic':
        if (this.plainMode) {
          this.plainInsert("''", "''")
        } else {
          d.execCommand('italic', false, null);
          this.toggleState(n);
        }
        break;
      case 'image':
        this.pbox = this.showBox('al_photos.php', {
          act: 'choose_photo',
          al_wiki_editor: 1,
          to_id: cur.oid,
          scrollbar_width: window.sbWidth()
        }, {
          stat: ['page.css', 'page.js'],
          cache: 1,
          dark: 1
        });
        window.editorChoosePhoto = this.insertPhoto.bind(this);
        break;
      case 'video':
        this.vbox = this.showBox('video.php', {
          act: 'a_choose_video_box',
          al_wiki_editor: 1,
          to_id: cur.oid,
          scrollbar_width: window.sbWidth()
        }, {
          stat: ['page.css', 'page.js'],
          cache: 1
        });
        window.editorChooseVideo = this.insertVideo.bind(this);
        break;
      case 'audio':
        this.abox = this.showBox('audio.php', {
          act: 'a_choose_audio_box',
          al_wiki_editor: 1,
          to_id: cur.oid,
          scrollbar_width: window.sbWidth()
        }, {
          stat: ['page.css', 'page.js'],
          cache: 1
        });
        window.editorChooseAudio = this.insertAudio.bind(this);
        break;
      case 'left':
        if (this.plainMode) {
          this.plainInsert("<left>", "</left>")
        } else {
          this.toggleEditable(false);
          d.execCommand('justifyLeft', false, true)
          this.toggleEditable(true);
          this.toggleState(n);
        }
        break;
      case 'center':
        if (this.plainMode) {
          this.plainInsert("<center>", "</center>")
        } else {
          this.toggleEditable(false);
          d.execCommand('justifyCenter', false, true)
          this.toggleEditable(true);
          this.toggleState(n);
        }
        break;
      case 'right':
        if (this.plainMode) {
          this.plainInsert("<right>", "</right>")
        } else {
          this.toggleEditable(false);
          d.execCommand('justifyRight', false, true)
          this.toggleEditable(true);
          this.toggleState(n);
        }
        break;
      case 'h1':
        if (this.plainMode) {
          this.plainInsert("== ", " ==", {newline: 1})
        } else {
          this.wrapHeader('wk_header', btn);
        }
        break;
      case 'h2':
        if (this.plainMode) {
          this.plainInsert("=== ", " ===", {newline: 1})
        } else {
          this.wrapHeader('wk_sub_header', btn);
        }
        break;
      case 'h3':
        if (this.plainMode) {
          this.plainInsert("==== ", " ====", {newline: 1})
        } else {
          this.wrapHeader('wk_sub_sub_header', btn);
        }
        break;
      case 'url':
        var rangeEl = this.getState(this.getRange());
        this.showUrlBox(rangeEl, true);
        break;
      case 'list':
        if (this.plainMode) {
          this.plainInsert("* ", "", {newline: 1})
        } else {
          this.wrapList('ul', btn);
        }
        break;
      case 'blockquote':
        if (this.plainMode) {
          this.plainInsert("<blockquote>", "</blockquote>", {newline: 1})
        } else {
          this.wrapEl('blockquote', btn, '<div>', '</div>');
        }
        break;
      case 'mode':
        this.togglePlainMode();
        this.toggleState(n);
        break;
    }
    if (n != 'mode') {
      this.onChangeHandler();
    }
    return cancelEvent(e);
  },

  checkBrowser: function() {
    var v = intval(browser.version)
    var support = false;
    if (browser.chrome && v > 11) {
      support = 1;
    }
    if (browser.mozilla && v >= 4) {
      support = 1;
    }
    if (browser.opera && v > 10) {
      support = 1;
    }
    if (browser.safari && v > 4) {
      support = 1;
    }
    if (browser.msie && v >= 9) {
      support = 1;
    }

    if (support && !this.plain) {
      show(this.cont);
      hide(this.textarea);
      this.plainMode = false;
      ge('wke_b_mode').setAttribute('tooltip', this.modeBtn[2]);
    } else {
      hide(this.cont);
      show(this.textarea);
      this.plainMode = true;
      ge('wke_b_mode').setAttribute('tooltip', this.modeBtn[3]);
      if (!support) {
        hide('wke_b_mode');
      }
    }
    if (this.onPlainToggle) {
      this.onPlainToggle(!support, false);
    }
    this.checkEditPlace();
  },

  togglePlainMode: function(on) {
    if ((on == undefined) ? this.plainMode : on) {
      // switch to normal
      wiki = this.textarea.value;
      if (wiki == this.prevWiki) {
        show(this.cont);
        hide(this.textarea);
        this.plainMode = false;
      } else {
        ajax.post('al_pages.php', {act: 'convert_wiki', Body: wiki}, {
          onDone: (function(html, wikiPref) {
            this.wikiPref = wikiPref;
            this.cont.innerHTML = html;
            show(this.cont);
            hide(this.textarea);
            this.plainMode = false;
            if (this.onPlainToggle) {
              this.onPlainToggle(this.plainMode, true);
            }
            return;
          }).bind(this),
          loader: true
        });
      }
      ge('wke_b_mode').setAttribute('tooltip', this.modeBtn[2]);
    } else {
      if (this.changed) {
        var wiki = this.val();
        this.prevWiki = wiki;
        val(this.textarea, wiki);
        if (this.textarea.autosize) {
          this.textarea.autosize.update()
        }
      } else {
        this.prevWiki = this.textarea.value;
      }
      hide(this.cont);
      show(this.textarea);
      this.plainMode = true;
      ge('wke_b_mode').setAttribute('tooltip', this.modeBtn[3]);
    }
    if (this.onPlainToggle) {
      this.onPlainToggle(this.plainMode, true);
    }
    if (window.WkView) {
      WkView.onResize();
    }
  },

  prepareCont: function(cont) {
    var quotes = geByTag('blockquote', cont);
    var len = quotes.length;
    while (len--) {
      var el = quotes[len];
      if (!el.firstChild || el.firstChild.tagName != 'DIV') {
        var f = document.createDocumentFragment();
        while (el.firstChild) {
          f.appendChild(el.firstChild);
        }
        var c = ce('div');
        c.appendChild(f);

        el.appendChild(c);
      }
    }
    var els = geByClass('wk_photo', cont);
    els.push.apply(els, geByClass('wk_photo_no_padding', cont))
    els.push.apply(els, geByClass('wk_video', cont))
    els.push.apply(els, geByClass('audio', cont))
    var len = els.length;
    while (len--) {
      els[len].setAttribute('contenteditable', 'false');
    }
  },

  plainGetSel: function() {
    var startPos = 0, endPos = 0, ieSel;
    if (document.selection) {
      ieSel = true;

      range = document.selection.createRange();

      if (range && range.parentElement() == this.textarea) {
        var val = this.textarea.value;
        var len = val.length;
        var normalizedValue = val.replace(/\r\n/g, "\n");

        var textInputRange = this.textarea.createTextRange();
        textInputRange.moveToBookmark(range.getBookmark());

        var endRange = this.textarea.createTextRange();
        endRange.collapse(false);

        if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
          startPos = endPos = len;
        } else {
          startPos = -textInputRange.moveStart("character", -len);
          if (browser.msie && intval(browser.version) < 9) {
            startPos += normalizedValue.slice(0, startPos).split("\n").length - 1;
          }

          if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
            endPos = len;
          } else {
            endPos = -textInputRange.moveEnd("character", -len);
            if (browser.msie && intval(browser.version) < 9) {
              endPos += normalizedValue.slice(0, endPos).split("\n").length - 1;
            }
          }
        }
      }
    } else if (this.textarea.selectionStart || this.textarea.selectionStart == '0') {
      startPos = this.textarea.selectionStart;
      endPos = this.textarea.selectionEnd;
    } else {
      endPos = startPos = this.textarea.value.length;
    }

    return [startPos, endPos, ieSel];
  },

  plainInsert: function(start, end, opts) {
    this.textarea.focus();
    start = start || '';
    end = end || '';
    opts = opts || {};
    var stl = start.length, endl = end.length;
    var curSel = this.plainGetSel()
    var startPos = curSel[0];
    var endPos = curSel[1];
    var ieSel = curSel[2];

    var before = this.textarea.value.substr(0, startPos);
    var cont = this.textarea.value.substr(startPos, endPos - startPos);
    var after = this.textarea.value.substr(endPos, this.textarea.value.length - endPos);

    var sp = cont.match(this.re.endSp);
    if (sp) {
      len = sp[0].length;
      cont = cont.substr(0, cont.length - len);
      endPos -= len;
      after = sp[0] + after;
    }

    if (opts.replace) {
      cont = '';
    }

    if (startPos >= stl && before.substr(startPos - stl, startPos) == start && after.substr(0, endl) == end) {
      start = '';
      end = '';
      before = before.substr(0, startPos - stl);
      after = after.substr(endl);
      startPos -= stl;
      endPos -= stl;
    } else {
      startPos += stl;
      endPos += stl;
      if (opts.newline) {
        if (before.substr(-1) != '\n') {
          before += '\n';
          startPos += 1;
          endPos += 1;
        }
        var afterSymbol = after.substr(0, 1);
        if (afterSymbol != '\n' && afterSymbol != '\r') {
          after = '\n' + after;
        }
      }
    }

    var val = this.textarea.value = before + start + cont + end + after;
    setTimeout((function() {
      this.plainFocus(this.textarea, startPos, endPos);
    }).bind(this), 0);
  },

  wrapHeader: function(hCl, btn) {
    var range = this.getRange();
    var rangeEl = this.getState(range);
    var el = rangeEl[0];
    if (el.className == hCl) {
      this.unsurround(el);
    } else {
      if (rangeEl[1] == 2) {
        this.unsurround(el);
      }
      this.surround(ce('div', {className: hCl}), btn[3]);
    }
    this.checkEditPlace();
  },

  wrapEl: function(tag, btn, before, after) {
    var range = this.getRange();
    var rangeEl = this.getState(range);
    var el = rangeEl[0];
    if (el.tagName == tag.toUpperCase()) {
      this.unsurround(el);
    } else {
      if (rangeEl[1] == 6) {
        this.unsurround(el);
      }
      this.surround(ce(tag), btn[3], before, after);
    }
    this.checkEditPlace();
  },

  wrapList: function(tag, btn) {
    var range = this.getRange();
    var rangeEl = this.getState(range);
    var el = rangeEl[0];
    if (rangeEl[1] == 5 && geByTag('li', el).length) {
      var obj = el.firstChild;
      var f = document.createDocumentFragment();
      while(obj) {
        if (obj.tagName == 'LI') {
          var div = ce('div');
          while (obj.firstChild) {
            div.appendChild(obj.firstChild);
          }
          f.appendChild(div);
        }
        obj = obj.nextSibling;
      }
      var start = f.firstChild;
      var end = f.lastChild;
      el.parentNode.replaceChild(f, el);
      this.setSelection(start, end);
    } else {
      this.surround(ce(tag, {className: 'listing'}), btn[3], '<li><span class="l">', '</span></li>', true);
    }
    this.checkEditPlace();
  },

  fixHeader: function(el) {
    el.parentNode.replaceChild(ce('div', {className: el.className, innerHTML: clean(this.getText(el))}), el);
  },

  fixList: function(el) {
    var obj = el.firstChild;
    while(obj) {
      var child = obj;
      obj = obj.nextSibling;
      if (child.nodeType == 1 && child.tagName != 'SPAN' || child.nodeType == 3) {
        var span = ce('span', {className: 'l'});
        child.parentNode.replaceChild(span, child);
        span.appendChild(child);
      }
    }
  },

  showUrlBox: function(rangeEl, btn) {
    if (this.plainMode) {
      cur.wkBoxRange = this.plainGetSel();
      var text = this.textarea.value.substr(cur.wkBoxRange[0], cur.wkBoxRange[1] - cur.wkBoxRange[0]);
    } else if (rangeEl[1] == 3) {
      var el = rangeEl[0];
      var text = this.getText(el);
      cur.wkLinkHref = el.getAttribute('href');
      cur.wkLinkNote = cur.wkLinkHref.match(this.re.noteHref);
      cur.wkLinkPage = cur.wkLinkHref.match(this.re.pageWikiHref);
      cur.wkLinkCustomPage = cur.wkLinkHref.match(this.re.pageHref);
      cur.wkBoxRange = this.setFocus(el, {noCollapse: true});
      cur.wkLinkEl = el;
      if (btn) {
        this.unsurround(el, true);
        this.checkEditPlace();
        return false;
      }
    } else {
      if (document.getSelection) {
        var text = document.getSelection()+'';
      } else if (document.selection) {
        var text = document.selection.createRange().text+'';
      } else {
        var text = '';
      }
      cur.wkBoxRange = this.getRange();
    }
    cur.wkLinkName = text;

    var box = showBox('wiki.php', {act: 'link_box_new', note: this.note | '', page: this.page || '', oid: this.oid}, {cache: 1})
    box.editor = this;
    box.setOptions({onHide: (function() {
      if (cur.wkBoxRange) {
        this.setSelectionRange(cur.wkBoxRange);
      }
    }).bind(this)})
  },

  showPhotoBox: function(el) {
    var url = el.getAttribute('href');
    var link = '';
    var photo = (url || '').match(this.re.photoHref);
    if (photo) {
      var oid = photo[1];
      var pid = (photo[2] || '').substr(1);
    } else {
      var wiki = el.getAttribute('wiki');
      if (wiki) {
        photo = wiki.split('_');
        var oid = photo[0];
        var pid = photo[1];
      }
      var away;
      link = url;
      if (away = url.match(this.re.away)) {
        link = decodeURIComponent(away[1]);
      } else {
        link = url;
      }
    }
    if (!oid || !pid) {
      return false;
    }
    var text = el.getAttribute('title');
    var img = geByTag1('img', el);
    cur.wkPhotoEditParams = {
      el: img,
      oid: oid,
      pid: pid,
      text: text || '',
      url: link,
      boxView: false,
      useBorder: false,
      saveRatio: true,
      useLink: false
    };
    cur.wkSavePhoto = (function(oid, pid, bThumb, w, h, photoUrl, text) {
      var newPhoto = this.getPhotoHTML(oid, pid, bThumb, w, h, photoUrl, text);
      el.parentNode.replaceChild(se(newPhoto), el);
    }).bind(this)
    cur.wkBoxRange = this.getRange();
    var box = showBox('wiki.php', {act: 'photo_box_new'}, {cache: 1});
    box.setOptions({onHide: (function() {
      if (cur.wkBoxRange) {
        this.setSelectionRange(cur.wkBoxRange);
      }
    }).bind(this)})
  },

  getLinkWiki: function(url, name, el) {
    var away, page;
    if (url[0] == '/') {
      url = 'http://vk.com'+url;
    }
    var openBracket = '[';
    var closeBracket = ']';

    if (away = url.match(this.re.away)) {
      url = decodeURIComponent(away[1]);
    } else if (page = url.match(this.re.pageHref)) {
      try {
        url = decodeURIComponent(page[1]);
      } catch(e) {
        url = page[1];
      }
      openBracket = '[[';
      closeBracket = ']]';
    } else if (page = url.match(this.re.devHref)) {
      try {
        url = decodeURIComponent(page[1]);
      } catch(e) {
        url = page[1];
      }
      openBracket = '[[';
      closeBracket = ']]';
    } else if (page = url.match(this.re.pageId)) {
      url = page[1];
      openBracket = '[[';
      closeBracket = ']]';
    }
    var opts = '';
    if (el) {
      var clAttr = el.getAttribute('onclick');
      if (clAttr) {
        if (clAttr.indexOf('inBox') != -1) {
          opts += 'box|';
        }
      }
    }
    if (opts || url != name) {
      opts += name;
    }
    return openBracket + url + (opts ? '|' + opts : '') + closeBracket;
  },

  insertLink: function(name, url, outer) {
    if (this.plainMode) {
      this.plainInsert(this.getLinkWiki(url, name), '', {replace: 1});
      return false;
    }

    var link = ce('a', {
      className: outer ? 'wk_ext_link' : '',
      innerHTML: clean(name),
      href: url
    });
    if (cur.wkLinkEl && cur.wkLinkEl.parentNode) {
      cur.wkLinkEl.parentNode.replaceChild(link, cur.wkLinkEl);
    } else {
      if (cur.wkBoxRange) {
        this.setSelectionRange(cur.wkBoxRange);
      }
      this.insert([link], true);
    }
    delete cur.wkLinkRange;
    delete cur.wkLinkEl;
    this.changed = true;
  },

  checkEditPlace: function() {
    setTimeout((function() {
      var rangeEl = this.getState(this.getRange());
      this.switchMode(rangeEl[1]);
    }).bind(this), 0)
  },

  toggleState: function(key) {
    var state = clone(this.state);
    state[key] = !state[key];
    if (key == 'left' && state[key]) {
      state['center'] = 0;
      state['left'] = 0;
      state['right'] = 0;
    }
    if (key == 'right' && state[key]) {
      state['center'] = 0;
    }
    if (key == 'center' && state[key]) {
      state['right'] = 0;
    }
    this.setState(state);
  },

  setState: function(state) {
    if (this.plainMode) {
      state.mode = 1;
    }
    var states = ['bold', 'italic', 'right', 'center', 'url', 'mode', 'h1', 'h2', 'h3', 'list', 'blockquote'];
    for (var i in states) {
      var i = states[i];
      if (state[i] && !this.state[i]) {
        addClass(ge('wke_b_'+i), 'wke_b_active');
      } else if (!state[i] && this.state[i]) {
        removeClass(ge('wke_b_'+i), 'wke_b_active');
      }
    }
    this.state = state;
  },

  saveLastCursor: function() {
    var lastCursor = this.getRange(false, true);
    if (lastCursor) {
      cur.lastCursor = lastCursor;
    }
  },
  switchMode: function(newMode) {
    if (this.mode == newMode) {
      return false;
    }
    var enable = false;
    if (newMode == 2) {
      enable = {'h1':1, 'h2':1, 'h3':1};
    } else if (newMode == 3) {
      enable = {'url':1};
    } else if (newMode == 4) {
      enable = {}
    } else if (newMode == 5) {
      enable = {'bold':1, 'italic':1, 'list':1, 'url':1};
    }

    if (enable) {
      for (var i in this.buttons) {
        var btnEl = ge('wke_b_'+i);
        if (enable[i]) {
          removeClass(btnEl, 'wke_b_disabled');
        } else {
          addClass(btnEl, 'wke_b_disabled');
        }
      }
    } else if (this.mode >=2) {
      for (var i in this.buttons) {
        var btnEl = ge('wke_b_'+i);
        removeClass(btnEl, 'wke_b_disabled');
      }
    }

    if (newMode == 3) {
      var urlEl = ge('wke_b_url');
      setStyle(urlEl, {backgroundPosition: '0px -317px'});
      urlEl.setAttribute('tooltip', this.buttons.url[3]);
    } else if (this.mode == 3) {
      var urlEl = ge('wke_b_url');
      setStyle(urlEl, {backgroundPosition: this.buttons.url[0]+'px '+this.buttons.url[1]+'px'});
      urlEl.setAttribute('tooltip', this.buttons.url[2]);
    }
    this.mode = newMode;
    if (this.onSwitchMode) {
      this.onSwitchMode();
    }
  },

  buttonUp: function(obj) {
    removeClass(obj, 'wke_b_down');
  },

  getAlign: function(n) {
    var a = n.style.textAlign || n.getAttribute('align');
  },

  getSel: function() {
    return window.getSelection ? window.getSelection() : false;
  },

  getRangeCont: function(r) {
    if (r == null) {
      return null;
    }
    if (r.commonAncestorContainer) {
      return r.commonAncestorContainer;
    } else {
      return r.parentElement ? r.parentElement() : r.item(0);
    }
  },

  /*getRange: function() {
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.rangeCount != 0) {
        return sel.getRangeAt(0);
      } else {
        document.createRange();
      }
    } else {
      if (document.selection) {
        return document.selection.createRange();
      }
    }
    return null;
  },*/

  getRange: function(end, onlyExist) { // unused
    var sel = end ? false : this.getSel(), r;
    if (sel && sel.rangeCount) {
      r = sel.getRangeAt(0);
      var n = this.getRangeCont(r);
      while(n) {
        if (n == this.cont) {
          return r;
        }
        n = n.parentNode;
      }
    }
    if (onlyExist) {
      return false;
    }
    if (document.createRange) {
      r = document.createRange();
      r.selectNodeContents(this.cont);
    } else { // ie
      r = document.body.createTextRange();
      r.moveToElementText(this.cont);
    }
    r.collapse(false);
    return r;
  },

  unsurround: function(obj, noSelection) {
    var f = document.createDocumentFragment();
    var start = obj.firstChild;
    var end = obj.lastChild;
    while (obj.firstChild) {
      f.appendChild(obj.firstChild);
    }
    obj.parentNode.replaceChild(f, obj);
    if (!noSelection) {
      this.setSelection(start, end);
    }
    this.getState();
    return false;
  },

  getRangeText: function(r, multi) {
    if (browser.msie) {
      sel = document.selection.createRange();
      sel.text;
    } else {
      if (multi && r.cloneContents) {
        var els = r.cloneContents();
        var text = this.getText(els, true);
        return text;
      }
      return r+'';
    }
  },

  surround: function(obj, defText, before, after, multi) {
    var r = this.getRange();
    var text = this.getRangeText(r, multi);
    before = before || '';
    after = after || '';

    if (r.collapsed || !text) {
      if (defText) {
        obj.innerHTML = before + (defText || 'header') + after;
      }
    } else {
      var html = '';
      if (multi) {
        text = text.split('\n');
        for (var i in text) {
          if (!text[i]) {
            continue;
          }
          html += before + text[i] + after;
        }
        if (!html) {
          html = before + (defText || 'header') + after;
        }
      } else {
        html = before + (text || '') + after;
      }
      obj.innerHTML = html;
    }

    if (this.replaceSelected([obj])) {
      this.cleanContent(this.getRangeCont(r));
      this.setFocus(obj, {noCollapse: true});
    }
  },

  cleanContent: function(cont) {
    if (cont.nodeType != 1) {
      return;
    }
    var elems = [];
    elems.push.apply(elems, geByClass('wk_header', cont));
    elems.push.apply(elems, geByClass('wk_sub_header', cont));
    elems.push.apply(elems, geByClass('wk_sub_sub_header', cont));
    for (var i in elems) {
      if (this.getText(elems[i]) === '') {
        re(elems[i]);
      }
    }
  },

  isLink: function(el) {
    if (el.tagName == 'A' && !hasClass(el, 'wk_photo') && !hasClass(el, 'wk_photo_no_padding')) {
      return true;
    }
    return false;
  },

  isPhoto: function(el) {
    while(el && el != this.cont) {
      if (this.isPhotoEl(el)) {
        return el;
      }
      el = el.parentNode;
    }
    return false;
  },

  isPhotoEl: function(el) {
    return (hasClass(el, 'wk_photo') || hasClass(el, 'wk_photo_no_padding') || hasClass(el, 'wikiPhoto'));
  },

  isVideo: function(el) {
    return (hasClass(el, 'wk_video'));
  },

  isAudio: function(el) {
    return (hasClass(el, 'audio'));
  },

  /* Carret states:
   * 1 - cont level
   * 2 - header
   * 3 - link
   * 4 - no wiki mode
   */
  getState: function(r) {
    var cont = this.getRangeCont(r);
    if (r) {
      var start = r.startContainer;
      var end = r.endContainer;
    }
    var el = false;
    var type = 0;
    var curCont = start;
    state = {};
    while(curCont) {
      if (start && curCont == cont || curCont == end) {
        start = false;
        curCont = end;
      }
      var tag = curCont.tagName;
      if (curCont.nodeType == 1) {
        switch(tag) {
          case 'B':
          case 'STRONG':
            state.bold = 1;
            break;
          case 'I':
          case 'EM':
            state.italic = 1;
            break;
          case 'PRE':
            state.pre = 1;
            break;
        }
        if (this.testRight(curCont)) {
          state.right = 1;
        }
        if (this.testCenter(curCont)) {
          state.center = 1;
        }
      }
      if (tag == 'LI') {
        this.fixList(curCont);
      }
      if (!type) {
        if (curCont.className) {
          var headerLn = curCont.className.match(this.re.header);
        }
        if (headerLn) {
          if (headerLn[2]) {
            state.h3 = 1;
          } else if (headerLn[1]) {
            state.h2 = 1;
          } else if (headerLn[0]) {
            state.h1 = 1;
          }
          el = curCont;
          type = 2;
          if (state.right || state.center) {
            this.fixHeader(curCont);
          }
        } else if (this.isLink(curCont)) {
          el = curCont;
          type = 3;
        } else if (tag == 'PRE') {
          el = curCont;
          type = 4;
        } else if (tag == 'UL' || tag == 'OL') {
          el = curCont;
          type = 5;
          state.list = 1;
        } else if (tag == 'BLOCKQUOTE') {
          el = curCont;
          type = 6;
          state.blockquote = 1;
        }
      }

      if (curCont == this.cont) {
        break;
      }
      curCont = curCont.parentNode;
    }
    this.setState(state);
    return [el, type];
  },

  replaceSelected: function(elems) {
    this.checkFocus();
    var r = this.getRange();

    if (r.deleteContents && !browser.msie) { // msie need hack
      r.deleteContents();
      if (browser.opera) {
        //r.insertNode(ce('span', {id: 'wke_tmp_el'}));
        document.execCommand('insertHTML', false, '<span id="wke_tmp_el"></span>');
        var tmp = ge('wke_tmp_el');
        for (var i in elems) {
          tmp.parentNode.insertBefore(elems[i], tmp);
        }
        re(tmp);
      } else {
        for (var i in elems) {
          r.insertNode(elems[i]);
        }
      }
      return true;
    } else {
      var r = document.selection.createRange();
      var html = '';
      for (var i in elems) {
        html += elems[i].outerHTML;
      }
      r.pasteHTML(html);
      r.collapse(false);
      r.select();
      return false;
    }
  },

  insert: function(elems, noBr, focusEnd) {
    var node;

    if (this.replaceSelected(elems)) {
      var n = elems[0];
      if (!noBr && (!n.previousSibling || n.previousSibling.nodeName != 'BR')) {
        n.parentNode.insertBefore(ce('br'), n);
      }
      var n = elems[elems.length - 1];
      if (!n.nextSibling || (n.nextSibling.nodeName != 'BR' && n.nodeType == 1 && (!n.nextSibling.data || !n.nextSibling.data.match(this.re.letter)))) {
        var br = ce('br');
        n.parentNode.appendChild(br)
      }
      //this.setFocus(br || n.nextSibling);
      if (focusEnd) {
        this.setFocus(n);
      } else {
        this.setFocus(n.nextSibling, {toStart: true});
      }
    }
  },

  editable: function(el) {
    return (el && el.nodeType != 3 && el.getAttribute && el.getAttribute('contenteditable') == 'true');
  },

  setSelection: function(start, end) {
    var r = this.getRange();
    r.setStartBefore(start);
    r.setEndAfter(end);
    this.setSelectionRange(r);
  },

  plainFocus: function(el, start, end) {
    if (browser.msie && document.selection) {
      var value = el.value;
      var stop = start;
      for (i=0; i < stop; i++) {
        if (value[i] == '\r') {
          start -= 1;
          end -= 1;
        }
      }
      stop = end;
      for (; i < stop; i++) {
        if (value[i] == '\r') {
          end -= 1;
        }
      }
    }
    elfocus(el, start, end);
  },

  setSelectionRange: function(r) {
    if (this.plainMode) {
      this.plainFocus(this.textarea, r[0], r[1]);
      return;
    }
    var sel = this.getSel();
    sel.removeAllRanges();
    sel.addRange(r);
  },

  setFocus: function(obj, opts) {
    var sel = this.getSel();
    var r = this.getRange();
    if (!opts) {
      opts = {};
    }
    if (sel) {
      sel.removeAllRanges();
      if (cur.lastCursor) {
        r = cur.lastCursor;
        r.collapse(false);
      } else {
        if (opts.offset != undefined) {
          r.setStart(obj, 0);
          r.setEnd(obj, 0);
        } else {
          r.selectNodeContents(obj);
        }
        if (!opts.noCollapse) {
          r.collapse(opts.toStart || false);
        }
      }
      sel.addRange(r);
    } else {
      var r = document.body.createTextRange();
      if (obj.nodeType != 3) {
        try {
          r.moveToElementText(obj);
          if (!opts.noCollapse) {
            r.collapse(opts.toStart || false);
          }
          r.select();
        } catch (error) { }
      }
    }
    return r;
  },

  insertAudio: function(performer, title, duration, aid, url, durationInt) {
    this.abox.hide();

    if (this.plainMode) {
      this.plainInsert('[[audio'+aid+']]', '', {replace: 1});
      return false;
    }

    var html = '<div class="audio" id="audio'+aid+'" onmouseover="addClass(this, \'over\');" onmouseout="removeClass(this, \'over\');" contenteditable="false">\
  <a name="'+aid+'"></a>\
  <div class="area clear_fix" onclick="playAudioNew(\''+aid+'\')">\
    <table cellspacing="0" cellpadding="0" width="100%">\
      <tr>\
        <td>\
          <div class="play_btn_wrap"><div class="sp_main play_new" id="play'+aid+'"></div></div>\
          <input type="hidden" id="audio_info'+aid+'" value="'+url+','+durationInt+'" />\
        </td>\
        <td class="info">\
          <div class="title_wrap fl_l" onmouseover="setTitle(this)"><b onclick="event.cancelBubble = true;"><a>'+performer+'</a></b> &ndash; <span class="title" id="title'+aid+'">'+title+'</span></div>\
          <div class="duration fl_r" onmousedown="if (window.audioPlayer) audioPlayer.switchTimeFormat(\''+aid+'\', event);" onclick="cancelEvent(event)">'+duration+'</div>\
        </td>\
      </tr>\
    </table>\
    <div id="player'+aid+'" class="player" ondragstart="return false;" onselectstart="return false;" onclick="event.cancelBubble = true;">\
      <table cellspacing="0" cellpadding="0" border="0" width="100%">\
        <tbody><tr>\
          <td style="width: 100%;">\
            <div id="audio_pr'+aid+'" class="audio_pr" onmouseover="addClass(this, \'over\')" onmouseout="removeClass(this, \'over\'); removeClass(this, \'down\')" onmousedown="addClass(this, \'down\'); audioPlayer.prClick(event);" onmouseup="removeClass(this, \'down\')">\
              <div id="audio_white_line'+aid+'" class="audio_white_line" onmousedown="audioPlayer.prClick(event);"></div>\
              <div id="audio_back_line'+aid+'" class="audio_back_line" onmousedown="audioPlayer.prClick(event);"><!-- --></div>\
              <div id="audio_load_line'+aid+'" class="audio_load_line" onmousedown="audioPlayer.prClick(event);"><!-- --></div>\
              <div id="audio_pr_line'+aid+'" class="audio_progress_line" onmousedown="audioPlayer.prClick(event);">\
                <div id="audio_pr_slider'+aid+'" class="audio_slider"><!-- --></div>\
              </div>\
            </div>\
          </td>\
          <td>\
            <div id="audio_vol'+aid+'" class="audio_vol" onmouseover="addClass(this, \'over\')" onmouseout="removeClass(this, \'over\'); removeClass(this, \'down\')" onmousedown="addClass(this, \'down\'); audioPlayer.volClick(event)" onmouseup="removeClass(this, \'down\')">\
              <div id="audio_vol_white_line'+aid+'" class="audio_vol_white_line" onmousedown="audioPlayer.volClick(event);"><!-- --></div>\
              <div id="audio_vol_back_line'+aid+'" class="audio_load_line" onmousedown="audioPlayer.volClick(event);"><!-- --></div>\
              <div id="audio_vol_line'+aid+'" class="audio_progress_line" onmousedown="audioPlayer.volClick(event);">\
                <div id="audio_vol_slider'+aid+'" class="audio_slider" onmousedown="audioPlayer.volClick(event);"><!-- --></div>\
              </div>\
            </div>\
          </td>\
        </tr>\
      </tbody></table>\
    </div>\
  </div>\
</div>';

    this.insert([se(html)]);
  },

  insertVideo: function(thumb, name, duration, link, videoId) {
    this.vbox.hide();

    if (this.plainMode) {
      this.plainInsert('[[video'+videoId+']]', '', {replace: 1});
      return false;
    }

    this.getImgSize(thumb, (function(w, h) {

      if (w > this.imgWidth + 20) {
        var dx = this.imgWidth / w;
        w = this.imgWidth;
        h = Math.floor(h * dx);
      }
      if (h > this.imgWidth + 20) {
        var dy = this.imgWidth / h;
        h = this.imgWidth;
        w = Math.floor(w * dy);
      }

      var style = 'width: '+w+'px; height: '+h+'px;';

      var videoEl = se('<a class="wk_video" href="'+link+'" contentEditable="false" onclick="return showVideo(\''+videoId+'\', \'\', {autoplay: 1}, event)"><img alt="'+name+'" title="'+name+'" src="/images/play_video_wide.png?3" style="background-image: url('+thumb+');">');
      this.insert([videoEl]);

    }).bind(this));

    return false;
  },

  getPhotoHTML: function(oid, pid, bThumb, w, h, photoUrl, text) {
    var st = 'width: '+w+'px; height: '+h+'px;';
    if (!photoUrl) {
      photoUrl = '/photo'+oid+'_'+pid;
      act = 'return '+this.inst+'.editPhoto(this);';
    } else {
      photoUrl = clean(photoUrl);
      act = 'return goAway(\''+photoUrl+'\')';
    }
    var preps = '';
    if (text) {
      preps = ' title="'+clean(text)+'"';
    }
    return '<a contenteditable="false"'+preps+' class="wk_photo" wiki="'+oid+'_'+pid+'" href="'+photoUrl+'" onclick="'+act+'">'+
      '<img src="'+bThumb+'" style="'+st+'" />'+
      '</a>';
  },

  insertPhoto: function(oid, pid, thumb, bThumb) {
    this.pbox.showProgress();

    this.getImgSize(bThumb, (function(w, h) {
      this.pbox.hide();

      if (w > this.imgWidth + 20) {
        var dx = this.imgWidth / w;
        w = this.imgWidth;
        h = Math.floor(h * dx);
      }
      if (h > this.imgWidth + 20) {
        var dy = this.imgWidth / h;
        h = this.imgWidth;
        w = Math.floor(w * dy);
      }

      if (this.plainMode) {
        this.plainInsert('[[photo'+oid+'_'+pid+'|'+w+'x'+h+'px;noborder| ]]', '', {replace: 1});
        return false;
      }
      // set focus here

      this.insert([ce('div', {
        align: 'center',
        innerHTML: this.getPhotoHTML(oid, pid, bThumb, w, h)
      })]);

    }).bind(this));

    return false;
  },

  getImgSize: function(src, callback) {
    var img = ce('img', {src: src});
    img.onload = (function() {
      var size = getSize(img);
      callback(size[0], size[1]);
      re(img);
    }).bind(this);
    this.loader.appendChild(img);
  },

  editPhoto: function() {
    return false;
  },

  ttOver: function(obj, right) {
    removeClass(obj, 'wke_b_down');
    if (hasClass(obj, 'wke_b_disabled')) {
      return false;
    }
    var text = obj.getAttribute('tooltip');
    if (!text) return;
    this.ttText.innerHTML = '<nobr>'+text+'</nobr>';
    var p = getXY(obj, this.isLayer);
    if (this.floatPanel) {
      var panel = getXY(this.panelCont, this.isLayer);
      panel[1] = 0;
    } else {
      var panel = getXY(this.panel, this.isLayer);
    }
    var pl = intval(getStyle(this.panel, 'paddingLeft'));

    if (this.floatPanel) {
      var t = 32;
      addClass(this.tt, 'wke_tt_bottom');
    } else {
      var t = p[1] - 29 - panel[1];
      removeClass(this.tt, 'wke_tt_bottom');
    }
    var l = p[0] - panel[0] - pl;
    if (right) {
      var size = getSize(this.tt);
      l -= size[0] - 22;
      cur.wkRightTT = true;
      setStyle(geByClass1('wke_tt_b', this.tt), {marginLeft: size[0] - 16});
      setStyle(geByClass1('wke_tt_tb', this.tt), {marginLeft: size[0] - 16});
    } else if (cur.wkRightTT) {
      cur.wkRightTT = false;
      setStyle(geByClass1('wke_tt_b', this.tt), {marginLeft: 7});
      setStyle(geByClass1('wke_tt_tb', this.tt), {marginLeft: 7});
    }

    setStyle(this.tt, {
       marginLeft: l + 'px',
       marginTop: t + 'px',
    });
    fadeIn(this.tt, 100);
  },

  ttOut: function(obj) {
    fadeOut(this.tt);
  },

  isCont: function(el) {
    if (!el) return false;
    var name = el.nodeName;
    if (name == 'DIV' || name == 'TABLE' || name == 'UL' || name == 'OL' || name == 'PRE' || name == 'BLOCKQUOTE' || this.editable(el)) {
      return true;
    }
    return false;
  },

  inBold: function(el) {
    while(el) {
      var tag = el.nodeName;
      if (tag == 'B' || tag == 'STRONG') {
        return true;
      }
      if (el == this.cont) {
        return false;
      }
      el = el.parentNode;
    }
    return false;
  },

  inItalic: function(el) {
    while(el) {
      var tag = el.nodeName;
      if (tag == 'I' || tag == 'EM') {
        return true;
      }
      if (el == this.cont) {
        return false;
      }
      el = el.parentNode;
    }
    return false;
  },

  cleanPrep: function(text) {
    return text.replace(this.re.notWords, '');
  },

  lastNode: function(el) {
    var prev = el.lastChild;
    while(prev && prev.nodeType == 3 && trim(prev.nodeValue) == '') {
      prev = prev.previousSibling;
    }
    return prev;
  },

  prevNode: function(el) {
    var prev = el.previousSibling;
    while(prev && prev.nodeType == 3 && trim(prev.nodeValue) == '') {
      prev = prev.previousSibling;
    }
    return prev;
  },

  getWikiHref: function(el) {
    var h = el.getAttribute('href');
    var page = h.match(this.re.pageId);
    if (page) {
      return page[1];
    }
    return h;
  },

  getPhotoOpts: function(el, opts) {
    if (!opts) {
      opts = [];
    }
    if (hasClass(el, 'wk_photo_right')) {
      opts.unshift('right');
    }
    if (hasClass(el, 'wk_photo_left')) {
      opts.unshift('left');
    }
    if (hasClass(el, 'wk_photo_center')) {
      opts.unshift('center');
    }
    //opts.unshift('noborder');
    var img = (el.tagName == 'IMG') ? el : geByTag1('img', el);
    var size = getSize(img);
    opts.unshift(size[0] + 'x' + size[1] + 'px');
    return opts.join(';');
  },

  getElementWiki: function(el, mask) {
    var before = '', after = '', replace = false;
    var tag = el.nodeName;
    if (tag == 'TD' || tag == 'TH') {
      mask |= 1;
    }
    if (tag == 'PRE') {
      mask |= 2;
    }
    if (tag == 'LI') {
      mask |= 3;
    }
    var cont = this.getContent(el, mask);
    switch(tag) {
      case 'P':
        cont = cont.replace(this.re.trimSp, '');
        var prev = el.previousSibling;
        if (prev && !this.isCont(prev) && prev.nodeName != 'BR') {
          before = '\n';
        }
        if (cont) {
          if (this.testLeft(el)) {
            before = '<left>';
            after = '</left>\n';
          } else if (this.testRight(el)) {
            before = '<right>';
            after = '</right>\n';
          } else if (this.testCenter(el)) {
            before = '<center>';
            after = '</center>\n';
          }
        } else {
          replace = '\n';
        }
        break;
      case 'DIV':
        cont = cont.replace(this.re.trimSp, '');
        var match = el.className.match(this.re.header);

        if (match) {
          var wr;
          if (match[2]) {
            wr = '====';
          } else if (match[1]) {
            wr = '===';
          } else {
            wr = '==';
          }
          replace = wr+this.getText(el).replace('\n', '')+wr+'\n';
        } else if (hasClass(el, 'audio')) {
          match = el.id.match(this.re.audio);
          if (match) {
            replace = '[[audio'+match[1]+'_'+match[2]+']]';
          }
        } else {
          if (cont == '') {
            break;
          }
          if (cont.substr(-1) != '\n') {
            var last = this.lastNode(el);
            if (!last || last.tagName != 'PRE') {
              after = '\n';
            }
          }
          var prev = this.prevNode(el);
          if (prev && !this.isCont(prev) && prev.tagName != 'BR') { // ?
            before = '\n';
          }

          if (cont) {
            if (this.testLeft(el)) {
              before += '<left>';
              after = '</left>\n';
            } else if (this.testRight(el)) {
              before += '<right>';
              after = '</right>\n';
            } else if (this.testCenter(el)) {
              before += '<center>';
              after = '</center>\n';
            }
          } else {
            after = '\n';
          }
        }
        break;
      case 'CENTER':
        cont = cont.replace(this.re.trimSp, '');
        if (cont.substr(-1) != '\n') {
          after = '\n';
        }
        before += '<center>';
        after = '</center>'+after;
        break;
      case 'BR':
        after = '\n';
        if (mask & 1) { // in table
          after += '<br/>';
        } else if (mask & 3) {
          after = '<br/>'+after;
        }
        break;
      case 'B':
      case 'STRONG':
        var lines = cont.split('\n');
        var out = [];
        var inBold = this.inBold(el.parentNode);
        for (var i in lines) {
          var l = lines[i];
          if (l.substr(0, 2) == '==') {
            out.push(l);
            continue;
          }
          if (l.match(this.re.letter) && !inBold) {
            out.push("'''"+l+"'''");
          } else {
            out.push(l);
          }
        }
        replace = out.join('\n')
        break;
      case 'I':
      case 'EM':
        var lines = cont.split('\n');
        var out = [];
        var inItalic = this.inItalic(el.parentNode);
        for (var i in lines) {
          var l = lines[i];
          if (l.substr(0, 2) == '==') {
            out.push(l);
            continue;
          }
          if (l.match(this.re.letter) && !inItalic) {
            out.push("''"+l+"''");
          } else {
            out.push(l);
          }
        }
        replace = out.join('\n')
        break;
      case 'IMG':
        if (this.isPhotoEl(el)) {
          var text = this.cleanPrep(el.getAttribute('title') || ' ');
          var wiki = el.getAttribute('wiki');
          if (wiki) {
            wiki = wiki.split('_');
            replace = '[[photo' + wiki[0] + '_' + (wiki[1] || '') + '|' + this.getPhotoOpts(el, ['nolink']) + '|'+text+']]';
          }
        }
        break;
      case 'A':
        if (this.isPhotoEl(el)) {
          var photo = el.href.match(this.re.photoHref);
          var text = this.cleanPrep(el.getAttribute('title') || ' ');
          if (photo) {
            replace = '[[photo' + photo[1] + (photo[2] || '') + '|' + this.getPhotoOpts(el) + '|' + text + ']]';
          } else {
            var wiki = el.getAttribute('wiki');
            if (wiki) {
              wiki = wiki.split('_');
              replace = '[[photo' + wiki[0] + '_' + (wiki[1] || '') + '|' + this.getPhotoOpts(el) + '|' + this.getWikiHref(el) + ']]';
            }
          }
        } else if (hasClass(el, 'wk_video')) {
          var video = el.href.match(this.re.videoHref);
          if (video) {
            replace = '[[video'+video[1] + (video[2] || '') +']]'
          }
        } else {
          var h = el.getAttribute('href');
          if (!h) {
            break;
          }
          var note = h.match(this.re.noteHref);
          if (note) {
            replace = '[[note'+note[1]+'_'+note[2]+'|'+this.getText(el)+']]';
            break;
          }
          var page = h.match(this.re.pageWikiHref);
          if (page) {
            replace = '[[page'+page[1]+'_'+page[2]+'|'+this.getText(el)+']]';
            break;
          }
          var topic = h.match(this.re.topicHref);
          if (topic) {
            replace = '[[topic'+topic[1]+'_'+topic[2]+'|'+this.getText(el)+']]';
            break;
          }
          var photo = h.match(this.re.photoHref);
          if (photo) {
            var img = geByTag1('img', el);
            if (img) {
              cur.ii = img;
              var text = this.cleanPrep(el.getAttribute('title') || ' ');
              replace = '[[photo' + photo[1] + (photo[2] || '') + '|' + this.getPhotoOpts(el) + '|' + text + ']]';
              break;
            }
          }
          replace = this.getLinkWiki(h, this.getText(el), el);
        }
        break;
      case 'PRE':
        var text = this.getText(el);
        text = text.replace(this.re.n, '\r\n'); // avoid multiline issue
        replace = '<pre>'+text+'</pre>';
        break;
      case 'BLOCKQUOTE':
        cont = cont.replace(this.re.trimSp, '');
        /*if (cont.substr(-1) != '\n') { // fix two brs
          after = '\n';
        }*/
        before = '<blockquote>';
        var firstSym = cont.substr(0, 1);
        if (firstSym == '*' || firstSym == '#') {
          before += '\n';
        }
        after = '</blockquote>'+after;
        break;
      case 'CODE':
        cont = cont.replace(this.re.trimSp, '');
        before = '<code>';
        after = '</code>';
        break;
      case 'UL':
        cont = cont.replace(this.re.trimSp, '');
        var prev = this.prevNode(el);
        if (prev && !this.isCont(prev) && prev.nodeName != 'BR') { // ?
          before = '\n';
        }
        break;
      case 'OL':
        cont = cont.replace(this.re.trimSp, '');
        var prev = this.prevNode(el);
        if (prev && !this.isCont(prev) && prev.nodeName != 'BR') { // ?
          before = '\n';
        }
        break;
      case 'LI':
        var contSt = cont.substr(0, 1);
        if (contSt != '*' && contSt != '#') {
          var p = el.parentNode;
          before = '* ';
          while(p && p != this.cont) {
            if (p.tagName == 'OL') {
              before = '# ';
              break;
            }
            if (p.tagName == 'Ul') {
              break;
            }
            p = p.parentNode;
          }
        }
        after = '\n';
        cont = cont.split('\n');
        var html = '';
        for (var i in cont) {
          var m = cont[i].match(this.re.wikiLi);
          if (m) {
            html += (i > 0 ? '\n' : '')+m[1]+cont[i];
          } else if (!cont[i]) {
            html += '<br/><br/>';
          } else {
            html += (i > 0 ? '\n:' : '')+cont[i];
          }
        }
        cont = html;
        //cont = cont.replace(this.re.nn, '<br/>');
        break;
      case 'DD':
        cont = cont.replace(this.re.trimSp, '');
        before = ':';
        break;
      case 'SPAN':
        if (hasClass(el, 'wk_gray')) {
          before = '<gray>';
          after = '</gray>'
        }
        break;
      case 'U':
        before = '<u>';
        after = '</u>';
        break;
      case 'S':
      case 'STRIKE':
        before = '<s>';
        after = '</s>';
        break;
      case 'SUB':
        before = '<sub>';
        after = '</sub>';
        break;
      case 'SUP':
        before = '<sup>';
        after = '</sup>';
        break;
      case 'TABLE':
        before = '{|';
        var beforeParams = [];
        if (hasClass(el, 'wk_table_no_border')) {
          beforeParams.push('noborder');
        }
        if (hasClass(el, 'wk_table_no_margin')) {
          beforeParams.push('nomargin');
        }
        var td = geByTag1('td', el);
        if (hasClass(td, 'wk_cell_no_padding')) {
          beforeParams.push('nopadding');
        }
        if (beforeParams.length) {
          before += beforeParams.join(';');
        }

        var col = el.firstChild;
        var colsW = [];
        while(col) {
          var ctag = col.tagName;
          if (ctag == 'COLGROUP') {
            col = col.firstChild;
            continue;
          }
          if (ctag == 'COL') {
            var w = col.getAttribute('style').match(this.re.colWidth);
            if (w) {
              colsW.push(intval(w[1]));
            }
          }
          col = col.nextSibling;
        }
        if (colsW.length) {
          before += '\n|~ '+colsW.join(' ');
        }
        after = '|}';
        break;
      case 'TR':
        before = '|-\n';
        break;
      case 'TD':
      case 'TH':
        cont = cont.replace(this.re.trimSp, '');
        before = (tag == 'TH') ? '! ' :  '| ';
        if (cont.substr(-1) != '\n') {
          after = '\n';
        }
        cont = cont.replace(this.re.nn, '<br/>');
        break;
    }
    if (replace) {
      return replace;
    } else {
      return before + this.getWikiBreak(before, cont) + cont + this.getWikiBreak(cont, after)  + after;
    }
  },

  strToWiki: function(c) {
    var c =  c.replace(this.re.trimN, ' ');
    c = c.replace(this.re.n, ' ');
    c = c.replace(this.re.sp, ' ');
    c = c.replace(/^#/g, '&#35;').replace(/^\*/g, '&#42;');
    c = c.replace(/</g, '&#60;').replace(/>/g, '&#62;');
    c = c.replace(/\[/g, '&#91;').replace(/]/g, '&#93;');
    c = c.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
    c = c.replace(/==/g, '&#61;&#61;').replace(/~/g, '&#126;');
    c = c.replace(/\|/g, '&#124;').replace(/!/g, '&#33;');
    //c = c.replace(/&#91;&#91;/g, '[[').replace(/&#93;&#93;/g, ']]');
    return c;
  },

  getContent: function(cont, mask) {
    var el = cont.firstChild;
    var wiki = '';
    while (el) {
      switch (el.nodeType) {
        case 3:
          c = this.strToWiki(el.data);
          if (wiki.substr(-1) == '\n') {
            c = c.replace(this.re.startSp, '');
          }
          wiki += c;
          break;
        case 1:
          var c = this.getElementWiki(el, mask || 0);
          //wiki = wiki.replace(this.re.endSp, ''); // couse sp bug
          wiki += this.getWikiBreak(wiki, c) + c;
          break;
        case 8:
          // comment
          break;
        default:
          debugLog('Node type', el.nodeType);
          break;
      }
      el = el.nextSibling;
    }
    return wiki;
  },

  getWikiBreak: function(before, after) {
    if (before && before.substr(-1) != '\n') {
      var lineSt = after.substr(0, 2);
      if (lineSt == '==' || lineSt == '|-' || lineSt == '|}' || lineSt == '{|') {
        return '\n';
      }
      if (before.substr(-2) == '|}' && after == '\n') {
        return '\n';
      }
    }
    return '';
  },

  getText: function(cont, multi) {
    if (!cont) {
      return '';
    }
    if (multi) {
      var el = cont.firstChild;
      var text = '';
      while (el) {
        switch (el.nodeType) {
          case 3:
            var c = el.data.replace(this.re.n, ' ').replace(this.re.sp, ' ');
            text += c;
            break;
          case 1:
            var tag = el.tagName;
            if (tag == 'DIV' || tag == 'P' || tag == 'PRE' || tag == 'BLOCKQUOTE'
                || tag == 'CENTER' || tag == 'RIGHT' || tag == 'LEFT' || tag == 'BR') {
              text += '\n';
            }
            if (tag == 'B' || tag == 'STRONG') {
              text += '<b>'+this.getText(el, true)+'</b>';
            } else if (tag == 'I' || tag == 'EM') {
              text += '<i>'+this.getText(el, true)+'</i>';
            } else {
              text += this.getText(el, true);
            }
            break;
        }
        el = el.nextSibling;
      }
      return text;
    }
    if (cont.innerText) {
      return cont.innerText;
    } else if (cont.textContent) {
      return cont.textContent;
    } else {
      return '';
    }
  },

  testLeft: function(node) {
    if ((node.getAttribute('align') == 'left') || (node.style.textAlign == 'left')) return true;
    return false;
  },
  testCenter: function(node) {
    if ((node.getAttribute('align') == 'center') || (node.style.textAlign == 'center')) return true;
    return false;
  },
  testRight: function(node) {
    if ((node.getAttribute('align') == 'right') || (node.style.textAlign == 'right') || (hasClass(node, 'wk_right') && !node.style.textAlign)) return true;
    return false;
  },

  showLengthMsg: function() {
    if (!this.lengthMsg) {
      setTimeout(showFastBox({title: getLang('global_error')}, this.lang['too_long'] || 'text too long', getLang('global_close')).hide, 2000);
    }
  },

  onChangeHandler: function() {
    this.changed = true;
    if (this.onChange) {
      this.onChange();
    }
  },

  val: function() {
    if (this.plainMode) {
      wiki = this.textarea.value;
    } else {
      if (!this.cont) {
        return false;
      }
      var wiki = this.getContent(this.cont, 0);
      wiki = wiki.replace(this.re.lineBr, function(str) {
        var len = str.length - 2;
        var lines = '';
        while (len--) {
          lines += '<br/>';
        }
        return '\n'+lines+'\n';
      });
      if (this.wikiPref) {
        wiki = this.wikiPref+wiki;
      }
    }
    if (wiki.length > 19000) {
      this.showLengthMsg();
      return false;
    }
    this.textarea.value = wiki;
    return wiki;
  },

  re: {
    n: new RegExp('\n', 'g'),
    nn: new RegExp('\n\n', 'g'),
    sp: new RegExp('[ ]+', 'g'),
    endSp: new RegExp('[  ]+$'),
    startSp: new RegExp('^[  ]+'),
    trimSp: new RegExp('^ | $', 'g'),
    trimN: new RegExp('^\n|\n$', 'g'),
    letter: new RegExp('[^\\s\n]'),
    photoHref: new RegExp('photo([\-0-9]+)(_[\-0-9]+)?'),
    videoHref: new RegExp('video([\-0-9]+)(_[\-0-9]+)?'),
    lineBr: new RegExp('\n([\n]+)\n', 'g'),
    header: new RegExp('wk(_sub)?(_sub)?_header'),
    noteHref: new RegExp('^/?note([0-9]+)_([0-9]+)'),
    topicHref: new RegExp('^/?topic([\-0-9]+)_([0-9]+)'),
    pageWikiHref: new RegExp('^/?page([\00-9]+)_([0-9]+)'),
    away: new RegExp('/away\\.php\\?to=([^&]+)'),
    pageHref: new RegExp('(?:[/|\.]vk.com|^)/(?:pages|developers)\?(?:.*&)?p=([^&]+)'),
    devHref: new RegExp('(?:[/|\.]vk.com|^)/dev/([^?#]+)'),
    pageId: new RegExp('[/|\.]vk.com/(page[\-0-9]+_[\-0-9]+)'),
    audio: new RegExp('audio([\-0-9]+)_([\-0-9]+)(_[0-9]+)?'),
    wikiLi: new RegExp('^([*#])'),
    notWords: new RegExp('([\\[\\]\\(\\)\\|\\\/\'"\\*<>]+)','g'),
    colWidth: new RegExp('width: ([0-9]+)%'),
  }

});
try{stManager.done('wk_editor.js');}catch(e){}
