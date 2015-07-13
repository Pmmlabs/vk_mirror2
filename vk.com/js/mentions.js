if (!window.Node) {
  Node = {'ELEMENT_NODE': 1, 'TEXT_NODE': 3};
}

function initMentionClass() {
  /* Mini wysiwyg editor for statuses */
  createChildClass('MentionAutocomplete', UiControl, {
    /* Standart object fields */
    CSS: {
    },
    defaultOptions: {
      height: 0,
      minHeight: 0,
      padding: 0
    },
    controlName: 'MentionAutocomplete',

    /* Standart object methods */
    beforeInit: function (textarea) {
      this.guid = _ui.reg(this);
    },
    initOptions: function (textarea, options) {
      this.options = options;
    },
    init: function (textarea) {
      this.textareaEl = ge(textarea);
      this.width = this.options.width || getSize(this.textareaEl, true)[0];
      this.cache = new Cache({cacheLength: 100});
    },
    initDOM: function (input) {
      this.textareaEl.parentNode.insertBefore(
        this.cont = ce('div', {className: 'mini_editor_cont selector_container'}),
        this.textareaEl.nextSibling
      );
      this.cont.appendChild(
        this.rtaEl = ce('div', {className: 'mention_rich_ta', contentEditable: true}, {'width': this.width, 'minHeight': this.options.minHeight})
      );
      if (browser.msie6) {
        setStyle(this.rtaEl, 'height', this.options.minHeight);
      }

      var resultContainer = ce('div', {className: 'results_container', innerHTML: '<div class="result_list"></div><div class="result_list_shadow"><div class="shadow1"></div><div class="shadow2"></div></div>'});
      this.cont.appendChild(resultContainer);
      this.resultList = geByClass('result_list', resultContainer)[0];
      this.resultListShadow = geByClass('result_list_shadow', resultContainer)[0];

      if (browser.chrome) this.resultList.style.opacity = 1;
      else if (!browser.safari) setStyle(this.resultListShadow, 'top', browser.mozilla ? 0 : (browser.msie && browser.version < 8)  ? 0 : -1);
      this.resultList.style.width = this.resultListShadow.style.width = resultContainer.style.width = this.textareaEl.offsetWidth + 'px';
      this.select = new Select(this.resultList, this.resultListShadow, {
        selectFirst: false,
        height: this.options.listHeight,
        onItemSelect: this.onFriendSelect.bind(this),
        onShow: _ui.sel.pbind(this.guid),
        onHide: _ui.sel.pbind(false)
      });
    },
    initEvents: function () {
      var self = this;
      var keyev = browser.opera || browser.mozilla ? 'keypress' : 'keydown';
      this.onEvent = function(e) {
        if (e.type == keyev) {
          self.select.handleKeyEvent(e);
        }
      }
      /* Initial TA click results new rich textarea open */
      removeEvent(this.textareaEl, 'focus');
      removeEvent(this.textareaEl, 'blur');
      if (this.textareaEl.onfocus) addEvent(this.textareaEl, 'focus', this.textareaEl.onfocus);
      if (this.textareaEl.onblur) addEvent(this.textareaEl, 'blur', this.textareaEl.onblur);
      this.textareaEl.onfocus = null;
      var blurTO;
      addEvent(this.textareaEl, 'focus', function (e) {
        clearTimeout(blurTO);
        hide(this);
        show(self.cont);
        this.style.color = '#777';
        var v = trim(self.textareaEl.value);
        if (self.options.startVal) {
          v = self.options.startVal;
          self.options.startVal = false;
        }
        self.rtaEl.innerHTML = v ? v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '<br/>').replace(/\[((?:id|club)[1-9]\d*)\|([^\]]+)\]/g, '<a href="/$1">$2</a>') : (browser.mozilla ? '<br/>' : ' ');
        setTimeout(function () {
          if (self.textareaEl.phonfocus) {
            self.textareaEl.phonfocus(true);
          }
          self.rtaEl.focus();
          if (!browser.msie) {
            if (v) {
              var spaceNode = document.createTextNode('\u00A0'), sel = window.getSelection();
              self.rtaEl.appendChild(spaceNode);
              sel.collapse(spaceNode, 1);
            } else {
              window.getSelection().collapse(self.rtaEl, 0);
            }
          } else {
            var range = document.selection.createRange();
            range.moveToElementText(self.rtaEl);
            range.collapse(v ? false : true);
            range.select();
          }
          if (v) {
            self.updateWikiValue();
          }
        }, 50);

        cancelEvent(e);
        return false;
      });
      addEvent(this.rtaEl, 'keypress keydown', function (e) {
        if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
          if (!self.select || !self.select.isVisible()) {
            if (!self.blurred && e.ctrlKey && isFunction(self.options.onSubmit)) {
              self.rtaEl.blur();
              self.options.onSubmit();
            }
          } else {
            triggerEvent(document, e.type, e);
            return cancelEvent(e);
          }
        }
        return true;
      });
      addEvent(this.rtaEl, 'keyup mouseup', function (e) {
        if (!self.select) return;
        if (self.select.isVisible() && e.type == 'keyup') {
          if (inArray(e.keyCode, [KEY.UP, KEY.DOWN, KEY.PAGEUP, KEY.PAGEDOWN, KEY.RETURN])) return;
          else if (indexOf([KEY.SPACE, KEY.HOME, 190, 191, 78, 55, 49], e.keyCode) != -1) self.select.hide();
        }
        if (!browser.msie) self.updateWikiValue();

        clearTimeout(this.requestTimeout);
        self.currentTerm = null;
        var sel, range, focusNode, focusValue, focusOffset, matches;

        // fixing anchors beginnings - only opera and mozilla
        if (browser.opera || browser.mozilla) {
          sel = window.getSelection();
          range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
          focusNode = range && range.endContainer;
          focusOffset = range.endOffset || 0;

          var anchor = focusNode;
          while (anchor && anchor.tagName != 'A' && anchor != self.rtaEl && anchor.tagName != 'BODY') anchor = anchor.parentNode;
          if (anchor && anchor.tagName == 'A' && !focusOffset) {
            //debugLog('exiting from anchor');
            self.rtaEl.normalize();
            var a = anchor.previousSibling;
            //if (a) debugLog([a, a.nodeType == Node.TEXT_NODE, a.nodeValue, a.nodeValue.charAt(a.nodeValue.length - 1), a.nodeValue.charAt(a.nodeValue.length - 2), a.nodeValue.charAt(a.nodeValue.length - 1) == ' ']);
            if (a && a.nodeType == Node.TEXT_NODE && (a.nodeValue.charAt(a.nodeValue.length - 1) == '\u00A0' || a.nodeValue.charAt(a.nodeValue.length - 1) == ' ')) a.nodeValue = a.nodeValue.substr(0, a.nodeValue.length - 1);
            a = document.createTextNode('\u00A0');
            anchor.parentNode.insertBefore(a, anchor);
            window.getSelection().collapse(a, 0);
            return;
          }
        }

        // fixing anchors endings - actual for all browsers
        if (window.getSelection) { // normal browsers
          sel = window.getSelection();
          range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
          focusNode = range && range.endContainer || null;
          focusOffset = range && range.endOffset || 0;

          if (focusNode) {
            if (focusNode == self.rtaEl && self.rtaEl.childNodes) {
              //debugLog('case 1');
              var anchor = self.rtaEl.childNodes[focusOffset];
              anchor.normalize();
              if (anchor.tagName == 'A') window.getSelection().collapse(anchor, 1);
            } else if (focusNode.nodeType == Node.TEXT_NODE && focusNode.parentNode == self.rtaEl) {
              //debugLog('case 2');
              var anchor = focusNode.previousSibling;
              if (anchor && anchor.tagName == 'A') {
                if (focusOffset) {
                  //debugLog('case 2 with offset');
                  focusValue = focusNode.nodeValue.substr(0, focusOffset);
                  if ((matches = focusValue.match(/^([^&\s,.:?! ]+)/))) {
                    //debugLog('case 2 with offset matches');
                    focusNode.nodeValue = focusNode.nodeValue.substr(matches[1].length);
                    anchor.innerHTML += matches[1];
                    anchor.normalize();
                    window.getSelection().collapse(anchor, 1);
                  }
                } else {
                  anchor.normalize();
                  window.getSelection().collapse(anchor, 1);
                }
              }
            } else if (focusNode.tagName == 'A' || (focusNode.parentNode && focusNode.parentNode.tagName == 'A')) {
              //debugLog('case 3');
              var anchor = focusNode.tagName == 'A' ? focusNode : focusNode.parentNode;
              clearTimeout(self.anchorCheckTimeout);
              self.anchorCheckTimeout = setTimeout(function () {
                if ((matches = anchor.innerHTML.match(/(([\s,.:?! ]|&nbsp;)+)$/))) {
                  //debugLog('case 3 matches');
                  anchor.innerHTML = anchor.innerHTML.substr(0, anchor.innerHTML.length - matches[1].length);
                  var nextText = document.createTextNode(matches[1].replace('&nbsp;', ' '));
                  anchor.parentNode.insertBefore(nextText, anchor.nextSibling);
                  window.getSelection().collapse(nextText, 1);
                }
              }, 5);
            }
          }
        } else if (document.selection) { // ie
          range = document.selection.createRange();
          focusNode = range.parentElement();
          if (focusNode == self.rtaEl) {
            var matches = null;
            while (!matches) {
              range.moveStart('character', -1);
              if (range.htmlText.match(/^[\s,.:?! &]+/i)) {matches = null; break;}
              matches = range.htmlText.match(/<a.+?>(.)<\/a>([^\s,.:?! &]+)$/i);
            }
            if (matches) {
              range.moveStart('character');
              range.pasteHTML('');
              range.moveStart('character', -1);
              range.pasteHTML(matches[1]+matches[2]);
              range.collapse(false);
              range.select();
            }
          }
        }
        clearTimeout(self.getTermTimeout);
        self.getTermTimeout = setTimeout(self.getTerm.bind(self), 200);
      });
      addEvent(this.rtaEl, 'blur', function (e) {
        self.blurred = true;
        if (!stripHTML(this.innerHTML).replace(/(&nbsp;|[\s\n \u00A0])+/gi, '')) {
          blurTO = setTimeout(function () {
            hide(self.cont);
            setStyle(self.textareaEl, 'height', self.options.minHeight);
            show(self.textareaEl);
            if (self.textareaEl.phonblur) {
              setTimeout(self.textareaEl.phonblur, 70);
            }
          }, 40);
        }
        setTimeout(function() { self.blurred = false; }, 1);
        self.rtaEl.normalize();
        self.fixContents();
        self.rtaEl.normalize();
        self.updateWikiValue(true, false, true);
        self.select.hide();
      });
      addEvent(this.rtaEl, 'paste', function (e) {
        setTimeout(function () {
          self.fixContents();
          self.updateWikiValue(true);
        } , 20);
      });
      if (!self.options.startVal) {
        self.options.startVal = val(self.textareaEl);
      }
      this.textareaEl.getValue = function () { return self.updateWikiValue(true, true);};
      var oldSV = this.textareaEl.setValue;
      this.textareaEl.setValue = function (v) {self.rtaEl.innerHTML = v ? v : (browser.mozilla ? '<br/>' : ' '); self.updateWikiValue(true); if(oldSV)oldSV(v);}
    },
    afterInit: function() {
      data(this.textareaEl, 'mention', this);
    },

    getTerm: function() {
      if (browser.msie) this.updateWikiValue();
      if (!this.rtaEl.innerHTML.match(/\*|@/)) return this.select.hide();
      var sel, range, focusNode, focusValue, focusOffset, self = this;
      if (window.getSelection) { // normal browsers
        sel = window.getSelection();
        range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
        focusNode = range && range.endContainer;
        if (!focusNode) return;
        focusValue = focusNode.data;
        focusOffset = range.endOffset || 0;
      } else if (document.selection) { // ie
        range = document.selection.createRange();
        focusNode = range.parentElement()//; || this.rtaEl;
        if (!focusNode) return;
        var a = focusNode;
        while (a.tagName != 'BODY' && a != this.rtaEl) {
          a = a.parentNode;
        }
        if (a.tagName == 'BODY') return '';
        focusValue = focusNode.innerText;
        a = focusNode;
        while (a == focusNode) {
          range.moveStart('character', -1);
          a = range.parentElement();
        }
        focusOffset = range.text.length;
      }
      if (!range || range.collapsed === false || focusNode.tagName == 'A' || focusNode.parentNode.tagName == 'A') return self.select.hide();
      this.lastNode = focusNode;
      this.lastOffset = focusOffset;
      if (focusNode == this.rtaEl && !browser.msie) {
        focusNode = focusNode.childNodes[Math.max(focusOffset-1, 0)];
        focusValue = focusNode ? ((focusNode.nodeValue ? focusNode.nodeValue : focusNode.innerText) || '') : '';
        focusOffset = focusValue.length;
      }
      this.lastNode = focusNode;
      this.lastOffset = focusOffset;
      var a = focusNode;
      if (!a || !focusValue) return self.select.hide();
      while ((a = a.previousSibling) && a.nodeType == Node.TEXT_NODE && Math.max(focusValue.indexOf('*'), focusValue.indexOf('@')) < 0) {
        focusValue = a.nodeValue + focusValue;
        focusOffset += a.nodeValue.length;
      }
      if (focusNode.nodeType == Node.TEXT_NODE && focusNode.previousSibling && focusNode.previousSibling.nodeType == Node.TEXT_NODE) {
        focusValue = focusNode.previousSibling.nodeValue + focusValue;
        focusOffset += focusNode.previousSibling.nodeValue.length;
      }
      if (!focusNode || !focusValue || !focusOffset || focusNode.tagName == 'A') return self.select.hide();

      var pos = Math.max(focusValue.lastIndexOf('*', focusOffset), focusValue.lastIndexOf('@', focusOffset));
      if (pos < 0 || focusValue.substr(pos, focusOffset - pos).match(/([\s,.:?! ]|&nbsp;)/)) return self.select.hide();

      var term = trim(focusValue.slice(pos, focusOffset)).substr(1).toLowerCase();
      this.currentTerm = term;
      if (!term) {
        this.showSelectList(term, data);
      } else {
        var data = this.cache.getData(term);
        if (!term) data = [];
        if (data == null) {
          this.requestTimeout = setTimeout(function() {
            ajax.post('hints.php', {act: 'a_json_friends', str: term, from: 'mentions'}, {onDone: function(data) {
              self.cache.setData(term, data);
              if (self.currentTerm == term) self.showSelectList(term, data);
            }});
          }, 150);
        } else if (data != null) {
          this.showSelectList(term, data);
        }
      }
    },
    showSelectList: function (term, items) {
      var self = this;
      if (!this.select) return;
      items = isArray(items) && items.length ? items : [];
      var adding = [];
      this.select.clear();
      this.lastItems = items;
      if (term && items.length) {
        var itemsToShow = 5;
        var re = new RegExp("(^|[\\s\-])(" + term + ")", "i");
        for (var i = 0; i < items.length; ++i) {
          var it = items[i];
          if (!itemsToShow) break;
          var formatted = it[1];
          if (term) {
            var termRus = parseLatin(term);
            if (termRus != null) {
              term = term + '|' + termRus;
            }
            try {
              formatted = formatted.replace(re, '$1<em>$2</em>');
            } catch (e) {}
          }
          if (!formatted) continue;
          --itemsToShow;
          adding.push([it[0], formatted]);
        }
      } else {
        adding.push(['', term ? this.options.noResult : this.options.introText, true]);
      }
      this.select.content(adding);
      this.select.show();
    },
    onFriendSelect: function(friendId) {
      if (!this.lastNode || !this.select) return;
      var focusNode = this.lastNode, focusOffset = this.lastOffset, focusValue = focusNode.data ? focusNode.data : focusNode.innerText;
      if (!focusValue.substr) focusValue = '';
      var friendName = (friendId > 0) ? ('id' + friendId) : ('club' + (-friendId)), href = friendName;
      each(this.lastItems, function(i) {
        if (this[0] == friendId) {
          friendName = this[1];
          return false;
        }
      });
      if (!browser.msie) {
        if (focusNode == this.rtaEl) {
          focusNode = focusNode.childNodes[focusOffset-1];
          focusValue = focusNode.nodeValue;
          focusOffset = focusValue.length;
        }
        var nextNode, prevNode;
        if (focusOffset != focusValue.length) {
          nextNode = document.createTextNode(focusValue.substr(focusOffset));
          focusNode.parentNode.insertBefore(nextNode, focusNode.nextSibling);
        } else {
          nextNode = focusNode.nextSibling;
        }
        var a = focusNode;
        while (a && a.nodeType == Node.TEXT_NODE) {
          if (Math.max(a.nodeValue.indexOf('*'), a.nodeValue.indexOf('@')) >= 0) {
            prevNode = a;
            a.nodeValue = a.nodeValue.substr(0, Math.max(a.nodeValue.lastIndexOf('*'), a.nodeValue.lastIndexOf('@')));
            break;
          }
          a = a.previousSibling;
        }
        if (!prevNode) {
          debugLog('asterisk was not found');
          return;
        }
        while (prevNode.nextSibling && prevNode.nextSibling != nextNode) {
          prevNode.parentNode.removeChild(prevNode.nextSibling);
        }
        var anchor = document.createElement('A'), spaceNode = document.createTextNode('\u00A0'), sel = window.getSelection();
        anchor.href = href;
        anchor.innerHTML = friendName;
        anchor.onclick = cancelEvent;
        prevNode.parentNode.insertBefore(anchor, nextNode);
        prevNode.parentNode.insertBefore(spaceNode, nextNode);
        sel.collapse(spaceNode, 1);
      } else {
        var range = document.selection.createRange();
        focusNode = range.parentElement() || this.rtaEl;
        if (focusNode.tagName == 'A') return;
        var a = focusNode;
        while (range.text.charAt(0) != '*' && range.text.charAt(0) != '@' && a == focusNode) {
          range.moveStart('character', -1);
          a = range.parentElement();
        }
        range.pasteHTML('<a href="' + href + '">' + friendName + '</a>\u00A0');
        range.collapse(false);
        setTimeout(function () {
          this.rtaEl.focus();
          range.select();
        }.bind(this), 10);
      }
      this.select.hide();
      this.updateWikiValue();
    },
    fixContents: function () {
      var self = this;
      var extractChilds = function (el) {
        debugLog('extracting childs, ' + el.tagName + ', ' + el.parentNode.tagName);
        while (el.firstChild) {
          el.parentNode.insertBefore(el.firstChild, el);
        }
        if (el.parentNode) el.parentNode.removeChild(el);
      }
      var fixEl = function () {
        if (this.nodeType == Node.TEXT_NODE || this == window) return;
        if (this.nodeType != Node.ELEMENT_NODE) {
          this.parentNode.removeChild(this);
          return;
        }
        if (!inArray(this.tagName, ['A', 'P', 'BR', 'DIV']) || this.parentNode != self.rtaEl && this.parentNode.tagName != 'P' && this.parentNode.parentNode != self.rtaEl) {
          extractChilds(this);
          counter++;
        }
        // resetting styles for pasted content
        if (this.tagName == 'A' || this.tagName == 'P') for (var s in this.style) {try {this[s] = '';} catch (e) {debugLog(e);}}
        var repeat = false;
        each(this.childNodes, fixEl);
      }
      var counter = 1;
      while (counter > 0) {
        each(this.rtaEl.childNodes, fixEl);
        counter--;
      }
    },
    updateWikiValue: function(noFocus, noCb, force) {
      var sel, range, focusNode, focusValue, focusOffset, self = this, wikiValue = '', wikiValueWithCursor = '', mid, findCursor = false, cursorPos = false;
      if (!noCb && !noFocus && this.options.onValueChange) {
        if (window.getSelection) { // normal browsers
          sel = window.getSelection();
          range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
          focusNode = range && range.endContainer;
          focusOffset = range && range.endOffset || 0;
        } else if (document.selection) { // ie
          range = document.selection.createRange();
          if (!range.text.length) {
            focusNode = range.parentElement()//; || this.rtaEl;
            var a = focusNode;
            while (a.tagName != 'BODY' && a != this.rtaEl) {
              a = a.parentNode;
            }
            if (a.tagName == 'BODY') return '';
            a = focusNode;
            while (a == focusNode) {
              range.moveStart('character', -1);
              a = range.parentElement();
            }
            focusOffset = range.text.length;
          } else {
            focusNode = this.rtaEl;
            range = null;
            focusOffset = 0;
          }
        }
        if (!range || range.collapsed === false || focusNode.tagName == 'A' || (focusNode.parentNode && focusNode.parentNode.tagName == 'A')) focusNode = null;
        findCursor = true;
      }

      var parseWikiValue = function() {
        var html = this.innerHTML;
        if (this.nodeType == Node.TEXT_NODE) {
          if (focusNode == this) {
            cursorPos = wikiValue.length + focusOffset;
          }
          wikiValue += this.nodeValue.replace(/\n/g, ' ');
        } else if (this.tagName == 'A' && trim(html)) {
          var data;
          if ((data = this.href.match(/^https?:\/\/(?:[a-z0-9\.]+\.)?(vkontakte\.ru|vk\.com)\/(.*)/i)) && html) {
            var query = (data[2] || '').toLowerCase();

            if (mid = query.match(/^id(\d+)/)) {
              if (html.match(/((https?:\/\/)?)(?:[a-z0-9\.]+\.)?(vkontakte\.ru|vk\.com)\/id(\d+)/ig)) {
                wikiValue += html;
              } else {
                wikiValue += '[id' + mid[1] + '|' + stripHTML(html).replace(/\]/g, '').replace(/\n/g, ' ') + ']';
              }
              return;
            } else if (gid = query.match(/^(?:club|event|public)(\d+)/)) {
              if (html.match(/((https?:\/\/)?)(?:[a-z0-9\.]+\.)?(vkontakte\.ru|vk\.com)\/(?:club|event|public)(\d+)/ig)) {
                wikiValue += html;
              } else {
                wikiValue += '[club' + gid[1] + '|' + stripHTML(html).replace(/\]/g, '').replace(/\n/g, ' ') + ']';
              }
              return;
            } else if (page = query.match(/^(page\-?\d+|pages\?|ru\/|en\/|dev\/)/)) {
              var actHtml = replaceEntities(html);
              actHtml = actHtml.replace(/(&[a-zA-Z0-9]*)?\.+$/, '');
              actHtml = actHtml.replace(/^http:\/\//, '');
              wikiValue += ' '+actHtml;
              //setTimeout(re.pbind(this), 0);
              return;
            }
          }

          var href = this.href,
              act_html = replaceEntities(html).replace(/(&[a-zA-Z0-9]*)?\.+$/, '').replace(/^http:\/\//, ''),
              away = href.match(/away\.php\?to=(.*?)(&|$)/);
          if (away) {
            try {
              href = decodeURIComponent(away[1]);
            } catch(e) {
              href = '';
            }
          }
          href = replaceEntities(href).replace(/^http:\/\//, '');
          if (href && act_html && act_html != href && !href.indexOf(act_html)) {
            wikiValue += ' ' + href;
          } else {
            wikiValue += ' ' + act_html;
          }

        } else if (this.tagName == 'BR') {
          wikiValue += '\n';
        } else {
          if (focusNode == this) {
            cursorPos = wikiValue.length + focusOffset;
          }
          if (this.tagName == 'DIV' || this.tagName == 'P') {
            if (wikiValue.substr(-1) != '\n') {
              wikiValue += '\n';
            }
          }
          each(this.childNodes, arguments.callee);
        }
      };
      each(this.rtaEl.childNodes, parseWikiValue);
      wikiValue = trim(wikiValue);

      if (findCursor || noFocus && this.options.onValueChange && !noCb) {
        this.options.onValueChange(cursorPos ? wikiValue.substr(0, cursorPos) : wikiValue, noFocus);
      }
      wikiValue = trim(wikiValue.replace(/(&nbsp;|&#160;|[ \t\r \u00A0])+/gi, ' ')); // &nbsp; -> space
      this.textareaEl.value = wikiValue || this.textareaEl.getAttribute('placeholder') || '';
      if (isFunction(this.options.checkLen)) this.options.checkLen(wikiValue, force);
      if (this.textareaEl.phonsize) this.textareaEl.phonsize();

      return wikiValue;
    }
  });
}

try{jsDispatcher.triggerOnload('mentions',initMentionClass);}catch(e){}
try{stManager.done('mentions.js');}catch(e){}
