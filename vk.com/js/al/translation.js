window.translation = window.translation || {
  menu: function(ev, sections, admin_href, admin_name, hash) {
    if (checkEvent(ev)) return true;

    var inline_translation = translation.enabled() ? 'Disable inline translation' : 'Enable inline translation';
    var show_all_phrases = '', invitation = '';
    var section_id = (sections || '').split(',');
    section_id = section_id[0] || 0;
    if (section_id) {
      show_all_phrases = '';//'<div class="flat_button secondary" id="translation_show_all">Show all phrases</div>';
    }
    if (admin_href == 'super') {
      invitation = 'You are super user. <a href="/translation?act=translators">Add translators &raquo;</a>';
    } else if (admin_href == 'coordinator') {
      invitation = 'You are coordinator. <a href="/translation?act=translators">Add translators &raquo;</a>';
    } else if (admin_href) {
      invitation = '<a href="' + admin_href + '">' + admin_name + '</a> has invited you to translate this page. <a onclick="return translation.invite();">Invite friend &raquo;</a>';
    }

    if (invitation) {
      invitation = '\
        <div id="translation_inv_wrap">\
          <div id="translation_inv_text">' + invitation + '</div>\
        </div>';
    }

    var box = showFastBox({
      title: 'Select option',
      width: 300,
      bodyStyle: 'padding: 0px',
      dark: 1,
      flatButtons: true,
      onClean: function() {
        cleanElems('translation_toggle', 'translation_to_page', 'translation_show_all');
        if (translation.uiFriends) {
          translation.uiFriends.destroy();
          translation.uiFriends = false;
        }
      }
    }, invitation + '\
      <div class="translation_box">\
        <div class="button_blue flat_button" id="translation_toggle">' + inline_translation + '</div>\
        ' + show_all_phrases + '\
        <a class="button_link" href="/translation">\
          <div class="flat_button secondary" id="translation_to_page">Go to translation page</div>\
        </a>\
        <a id="show_untranslated" class="button_link" href="/translation?section_id=untranslated">\
          <div class="flat_button secondary" id="">Show untranslated phrases</div>\
        </a>\
        <div class="help">\
          <a href="/club16000">Help</a> \
        </div>\
      </div>');
    ge('translation_toggle').onclick = translation.toggle;
    ge('translation_to_page').onclick = function() {};
    if (section_id) {
      //ge('translation_show_all').onclick = translation.showAll.pbind(sections, box);
    }
    return false;
  },
  update: function(box) {
    var nativeText = ge('native_text'), history = ge('historyWrap');
    var items = geByTag('textarea', ge('translation_form')), tokens;
    if (getSize(nativeText)[1] > 160) {
      setStyle(nativeText, {height: '160px', overflow: 'auto'});
    } else {
      setStyle(nativeText, {height: 'auto', overflow: 'visible'});
    }

    var options = ge('inlineAdditional'), opVisible = isVisible(options);
    if (!opVisible) show(options);
    if (history) {
      if (getSize(history)[1] > 160) {
        setStyle(history, {height: '160px', overflow: 'auto'});
      }
    }
    each(items, function() {
      autosizeSetup(this, {height: 180});
      addEvent(this, 'keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.keyCode == 13) {
          translation.save(box);
        }
      });
      tokens = ge('tokens_' + this.id.substr(9));
      if (tokens && tokens.childNodes.length) {
        AutoTokens(this, tokens);
      } else if (tokens) {
        hide(tokens);
      }
    });
    if (!opVisible) hide(options);
  },
  invite: function() {
    var inviteBox = ge('translation_inv_box');
    hide('translation_inv_text');
    show(inviteBox);
    if (!translation.uiFriends) {
      ajax.post('friends_ajax.php', {from: 'inline', filter: 'tiny'}, {onDone: function(response) {
        var result = eval('(' + response + ')');
        if (result.friends && result.friends.length) {
          stManager.add(['ui_controls.css', 'ui_controls.js'], function() {
            translation.uiFriends = new Dropdown(ge('translation_inv_id'), result.friends, {width: 150, autocomplete: true, placeholder: 'Start typing friend\'s name'});
            show('translation_inv_controls');
          });
          return;
        }
        var invitationText = ge('translation_inv_text');
        invitationText.innerHTML = '<div style="text-align:center;padding-top:8px">You have no friends.</div>';
        hide('translation_inv_box');
        show(invitationText);
      }, progress: 'translation_inv_progress', stat: ['ui_controls.css', 'ui_controls.js']});
    } else {
      hide('translation_inv_progress');
      show('translation_inv_controls');
      translation.uiFriends.clear();
    }
  },
  cookie_key: 'remixinline_trans',
  toggle: function() {
    setCookie(translation.cookie_key, translation.enabled() ? '' : '1', 360);
    nav.reload({force: true});
  },
  enabled: function() {
    return getCookie(translation.cookie_key) ? true : false;
  },
  hideAll: function() {
    var el = ge('translation_all');
    if (!el) return;
    el.innerHTML = '';
    hide(el);
    scrollToTop();
  },

  _updateKeysList: function(sectionId, keysHtml, untranslatedCounts, totalUntranslatedCount) {
    translation._progress = false;
    hide('progress-spinner');

    ge("key-rows").innerHTML = keysHtml;

    each(geByClass('untranslated-badge'), function() {
      if (hasClass(this, 'tran_no_update')) return;
      this.innerHTML = '';
      hide(this);
    });

    untranslatedCounts = JSON.parse(untranslatedCounts);
    each(untranslatedCounts, function(sid, count) {
      var badgeEl = geByClass1('untranslated-badge', ge('section_' + sid));
      badgeEl.innerHTML = count;
      toggle(badgeEl, count > 0);
    });

    var badgeEl = geByClass1("untranslated-badge", ge("section_untranslated"));
    badgeEl.innerHTML = totalUntranslatedCount;
    toggle(badgeEl, totalUntranslatedCount > 0);

    var sectionTotal = 0;
    if (sectionId == "untranslated") {
      sectionTotal = totalUntranslatedCount;
    } else if (!isEmpty(untranslatedCounts) && untranslatedCounts[sectionId]) {
      sectionTotal = untranslatedCounts[sectionId];
    }
    if (sectionTotal > 0) {
      ge("keys-summary-text").innerHTML = langNumeric(sectionTotal, cur.lang.tran_untranslated_keys_summary);
    } else {
      ge("keys-summary-text").innerHTML = getLang('tran_no_untranslated_keys_summary');
    }
  },

  onSearchUpdate: function() {
    if (translation._progress) return;

    var searchStr = trim(val('quick-search-input'));
    searchStr = searchStr ? searchStr : null

    nav.setLoc(extend(nav.objLoc, { search: searchStr, section_id: null }));

    if (!searchStr) {
      // select last selected section
      this.selectSection(ls.get('tran_last_sectionid'));
      return;
    }

    translation._progress = true;

    translation._selectSectionItemUI();
    scrollToTop();

    ge('keys-summary-text').innerHTML = '';
    show('progress-spinner');
    var self = this;
    ajax.post('al_translation.php', {act: 'get_section_keys', section_id: 'search', search_str: searchStr, lang_id: nav.objLoc.lang_id }, {
      onDone: self._updateKeysList.bind(this)
    });
  },

  initKeysTab: function(languagesList) {
    var self = this;

    var languageSelect = new InlineDropdown(ge('lang-chooser'), {
      items: languagesList,
      onSelect: function(langId) {
        self.selectSection(null, langId);
      }
    });

    translation.checkKeyExistsDebounced = _debounce(translation.checkKeyExists, 200);

    if (nav.objLoc.key) {
      this.editKey(nav.objLoc.key);
    }
    if (nav.objLoc.search) {
      //debugger;
      val('quick-search-input', nav.objLoc.search);
      this.onSearchUpdate();
    }
    else {
      this.selectSection(nav.objLoc.section_id || ls.get('tran_last_sectionid') || 0);
    }
  },

  _selectSectionItemUI: function(sectionId) {
    var selectedSections = geByClass("selected", geByClass1("keys-menu"));
    for (var i = 0; i < selectedSections.length; i++) {
      removeClass(selectedSections[i], 'selected');
    }

    addClass("section_" + sectionId, "selected");

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (isNumber(sectionId)) {
      ls.set('tran_last_sectionid', sectionId);
    }

    if (sectionId)
      val(ge('quick-search-input'), '');
  },

  // no params needed for just update
  selectSection: function(sectionId, langId, noScroll) {
    nav.setLoc(extend(nav.objLoc, { lang_id: langId }));

    if (sectionId !== undefined && sectionId !== null) {
      nav.setLoc(extend(nav.objLoc, { section_id: sectionId, search: null }));
    } else if (nav.objLoc.search) {
      this.onSearchUpdate();
      return;
    }

    sectionId = sectionId || nav.objLoc.section_id;

    if (translation._progress) return;
    translation._progress = true;

    var query = {};
    query.section_id = sectionId;
    query.lang_id = langId || nav.objLoc.lang_id;

    this._selectSectionItemUI(sectionId);

    if (!noScroll) {
      scrollToTop();
    }

    ge('keys-summary-text').innerHTML = '';
    show('progress-spinner');
    var self = this;
    ajax.post('al_translation.php', extend({act: 'get_section_keys'}, query), {
      onDone: self._updateKeysList.bind(this)
    });
  },

  t: function(ev, el, leftBtn) {
    if (ev.type == 'click' && (!ev.altKey && !leftBtn)) return;

    var cb = curBox();
    if (cb && cb.bodyNode.children[0].id == "key-edit-dialog") {
      cb.hide();
    }

    var langKey = (el.id.substr(0, 5) == 'lang_') ? el.id.substr(5) : el.id;
    var box = showBox('al_translation.php', {act: 'edit_key_dialog', key: langKey}, {params: {width: 600, dark: true, bodyStyle: 'padding: 0', flatButtons: true, forceNoBtn: true}, stat: ['ui_controls.css', 'ui_controls.js']});
    box.el = el;
    return cancelEvent(ev);
  },

  editKey: function(key, langId) {
    nav.setLoc(extend(nav.objLoc, { key: key }));

    var box = showBox('al_translation.php', {act: 'edit_key_dialog', key: key, section_id: nav.objLoc.section_id, lang_id: langId ? langId : nav.objLoc.lang_id }, {params: {dark: true, bodyStyle: 'padding: 0', width: 600, flatButtons: true, buttonsAtLeft: true, forceNoBtn: true}, noreload: true});

    box.setOptions({
      onHide: function() {
        nav.setLoc(extend(nav.objLoc, { key: null }));
      }
    });
  },

  _getTextareaValueIndex: function(id) {
    return id.split('-')[2];
  },

  _getTextareaLanguageId: function(id) {
    return id.split('-')[1];
  },

  _initTextareasSMSCounter: function () {
    function _updateSMSCounter(textarea) {
      ge('sms-count-text').innerHTML = 'SMS count: ' + translation._getSMSCount(val(textarea));
    }
    var textareas = geByTag("textarea");
    for (var i = 0; i < textareas.length; i++) {
      var ta = textareas[i];
      if (this._getTextareaValueIndex(ta.id) == 0) {
        removeEvent(ta, 'keyup input');
        addEvent(ta, 'keyup input', function(event) {
          _updateSMSCounter(event.target);
        });
        _updateSMSCounter(ta);
      }
    }
  },

  _initAutotokens: function (dialogBody) {
    function _autoTokens(textarea, tokens) {
      var timeout, pattern = /{[^}]+}|%[a-z]/gi;
      addEvent(textarea, 'keyup', function() {
        clearTimeout(timeout);
        setTimeout(function(){
          onEnterText();
        }, 200);
      });
      each(tokens.childNodes, function(i, x){
        if (x.nodeType == 1) {
          addEvent(x, 'click', function(){return insertToken(x, x.innerHTML)});
        }
      });
      function onEnterText(e) {
        var matches = textarea.value.match(pattern);
        var index, token;
        each (tokens.childNodes, function(i, x) {
          if (x.nodeType != 1)
            return;
          token = x.innerHTML;
          index = matches != null ? indexOf(matches, token) : -1;
          if (index != -1) {
            matches.splice(index, 1);
            x.style.display = 'none';
          } else {
            x.style.display = '';
          }
        });
      }
      function insertToken(el, token) {
        if (textarea.selectionStart != textarea.selectionEnd) {
          textarea.value += token;
        } else {
          var sel = textarea.selectionStart + token.length;
          textarea.value = textarea.value.substring(0, textarea.selectionStart) + token + textarea.value.substr(textarea.selectionStart);
        }
        hide(el);
        if (sel > 0) {
          textarea.selectionStart = textarea.selectionEnd = sel;
        }
        textarea.focus();
        return false;
      }
    }

    each(geByTag("textarea", dialogBody), function(i, ta) {
      if (!hasClass(ta, 'code-font')) return;

      var tokensEl = ge('tokens_' + translation._getTextareaValueIndex(ta.id));
      if (tokensEl && tokensEl.childNodes.length) {
        _autoTokens(ta, tokensEl);
      }
    });
  },

  _initTextareasAutofill: function (dialogBody) {
    var textareas = geByTag("textarea", dialogBody);

    for (var i = 0; i < textareas.length; i++) {
      var ta = textareas[i];
      if (!hasClass(ta, 'code-font')) continue;

      if (translation._getTextareaLanguageId(ta.id) == 0) { // rus translation
        removeEvent(ta, 'keyup input');
        addEvent(ta, 'keyup input', function(event) {
          var index = translation._getTextareaValueIndex(event.target.id);
          for (var i = 0; i < textareas.length; i++) {
            var ta = textareas[i];
            var index2 = translation._getTextareaValueIndex(ta.id);
            var langId = translation._getTextareaLanguageId(ta.id);
            if (langId == 3 && index == index2 && ta.getAttribute('data-do-not-change') != '1') {
              val(ta, val(event.target));
              translation._updateTextareaHeight(ta);
            }
          }
        });
      } else {
        removeEvent(ta, 'keypress');
        addEvent(ta, 'keypress', function(event) {
          event.target.setAttribute('data-do-not-change', '1');
        });
      }
    }
  },

  checkKeyExists: function(key, callback) {
    ajax.post('al_translation.php', { act: 'a_key_exists', key: key }, { onDone: function(res) {
      callback(res);
    }});
  },

  /*
  updateJSLangpack: function(button, hash) {
    if (!nav.objLoc.section_id) {
      return;
    }

    ajax.post('al_translation.php', { act: 'update_js_langpack', section_id: nav.objLoc.section_id, lang_id: nav.objLoc.lang_id || 0, hash: hash }, {
      showProgress: lockButton.pbind(button),
      hideProgress: unlockButton.pbind(button),
      onDone: function() {

      }
    });
  },*/

  _initHistoryResize: function() {
    show('history_and_parameters');

    var dialogBody = curBox().bodyNode;
    var historyEl = geByClass1('history-items', bodyNode);
    var handle = geByClass1('history_section_resizer', bodyNode);
    var initialY = 0, initialHeight, maxSize = getSize(historyEl)[1];

    function onMouseMove(event) {
      var newHeight = initialHeight + (event.pageY - initialY);
      newHeight = Math.max(newHeight, 60);
      newHeight = Math.min(newHeight, maxSize);
      setStyle(historyEl, { height: newHeight });
      cancelEvent(event);
    }
    function onMouseUp(event) {
      removeEvent(window, 'mousemove', onMouseMove);
      removeEvent(window, 'mouseup', onMouseUp);
    }

    addEvent(handle, 'mousedown', function(event) {
      initialY = event.pageY;
      initialHeight = getSize(historyEl)[1];
      addEvent(window, 'mousemove', onMouseMove);
      addEvent(window, 'mouseup', onMouseUp);
      cancelEvent(event);
    });

    setStyle(historyEl, { height: Math.min(maxSize, 80) });

    hide('history_and_parameters');
  },

  _updateTextareaHeight: function (ta, initial) {
    if (!curBox()) {
      return;
    }

    var dialogBody = curBox().bodyNode;

    var taSize = getSize(ta);
    var value = val(ta).split('\n').join('<br>');
    var sampleEl = se('<div class="text code-font" style="width: ' + taSize[0] + 'px; opacity: 1">' + value + '&nbsp;</div>');
    dialogBody.appendChild(sampleEl);

    var height = getSize(sampleEl)[1];
    height = Math.max(30, height + 20);
    if (initial) {
      height = Math.min(300, height);
    }
    setStyle(ta, { height: height });

    re(sampleEl);
  },

  _initTextAreasAutoHeight: function() {
    var dialogBody = curBox().bodyNode;

    each(geByClass('code-font'), function(i, ta) {
      translation._updateTextareaHeight(ta, true);

      addEvent(ta, 'input change keypress', function(event) {
        translation._updateTextareaHeight(event.currentTarget);
      })
    });
  },

  initEditKeyDialog: function(key, sectionId, hash, sectionsList, isDeletedKey, canSave) {
    var dialogBody = curBox().bodyNode;

    sectionId = sectionId || 0;

    var isAddingNewKey = !key;
    var newKeySectionDropdown;

    if (isAddingNewKey) {
      var input = ge('sections');
      input.value = sectionId || 0;

      var keyInput = ge('key');

      function _onSectionSelect(sectionId) {
        var prefix = '';
        for (var i = 0; i < sectionsList.length; i++) {
          if (sectionsList[i][0] == sectionId) {
            prefix = sectionsList[i][3];
            break;
          }
        }

        if (isArray(prefix)) prefix = prefix[0];

        var curValue = val(ge('key'));
        var tokens = curValue.split('_');
        tokens.shift();
        curValue = tokens.join('_');
        val(keyInput, prefix + '_' + curValue);
      }

      function _onKeyInputChange() {
        var key = val(keyInput);
        if (!key) return;

        var sectionPrefix = key.split('_')[0];
        if (sectionPrefix) {
          for (var i = 0; i < sectionsList.length; i++) {
            if (sectionsList[i][3] == sectionPrefix) {
              newKeySectionDropdown.val(sectionsList[i][0]);
              break;
            }
          }
        }

        translation.checkKeyExistsDebounced(key, function(exists) {
          var keyExistsHint = geByClass1('dialog_key_already_exists', dialogBody);
          keyExistsHint.innerHTML = getLang('tran_key_already_exists');
          (exists ? show : hide)(keyExistsHint);
        });
      }

      newKeySectionDropdown = new Dropdown(input, sectionsList, {
        width: 208,
        onChange: _onSectionSelect
      });

      addEvent(keyInput, 'input change', _onKeyInputChange);

      _onSectionSelect(sectionId);

      translation._initTextareasAutofill(dialogBody);
    } else {
      var toggleLink = geByClass1('ru_en_toggle', dialogBody);
      addEvent(toggleLink, 'click', function() {
        toggle('ru_en_phrases_wrap');
        toggleLink.innerHTML = isVisible('ru_en_phrases_wrap') ? toggleLink.getAttribute("data-hide-text") : toggleLink.getAttribute("data-show-text");
      });

      var descriptionInfo = ge('row_description_info');
      if (!geByClass1('value', descriptionInfo).innerHTML) {
        re(descriptionInfo);
      }

      var toggleBtn = ge('toggle_history_and_parameters');
      addEvent(toggleBtn, 'click', function() {
        slideToggle('history_and_parameters', 100);
      });

      translation._initAutotokens(dialogBody);
    }

    translation._initTextAreasAutoHeight();

    // Function types
    var functionTypeDD;
    function _onFunctionTypeChange(functionType) {
      var query, translationFields;

      if (isAddingNewKey) {
        query = serializeForm(ge('section-ru-translation'));
      } else {
        query = serializeForm(ge('section-translation'));
      }
      query.act = 'inline_fields';
      query.function_type = functionType;
      query.adding_new_key = isAddingNewKey;

      show('dialog-progress-spinner');

      re('function_type_dd');
      ajax.post('al_translation.php', query, {
        onDone: function (html1, html2) {
          if (html2 && ge('section-en-translation')) {
            ge('section-ru-translation').innerHTML = html1;
            ge('section-en-translation').innerHTML = html2;
          } else {
            ge('section-translation').innerHTML = html1;
          }

          translation._initTextAreasAutoHeight();
          translation._initTextareasAutofill(dialogBody);

          _initFunctionTypeDropdown();

          hide('dialog-progress-spinner');
        }
      });
    }
    function _initFunctionTypeDropdown() {
      functionTypeDD = ge('function_type_dd');
      if (functionTypeDD) {
        functionTypeDD = new InlineDropdown(functionTypeDD, {
          onSelect: _onFunctionTypeChange
        });
      }
    }
    _initFunctionTypeDropdown();

    // History
    translation._initHistoryResize();

    // Extended controls
    var disableInlineCheckbox = new Checkbox(ge('disable_inline'), {label: 'Disable inline translating'});
    var extendedWikiCheckbox = new Checkbox(ge('extended_wiki'), {label: 'Extended Wiki markup', onChange: function(value) {
      var el = geByClass1('extended-wiki-enabled');
      if (value) {
        addClass(el, 'enabled');
      } else {
        removeClass(el, 'enabled');
      }
    }});
    var hasCaseCheckbox = new Checkbox(ge('has_case'), { label: 'Depends on case', onChange: function(value) {
      toggle('translation-case', !!value);
    }});
    var markUntranslatedCheckbox = new Checkbox(ge('mark_untranslated'), { label: 'Mark as untranslated'});
    var exportToJSCheckbox = new Checkbox(ge('export'), { label: 'Export to JS'});

    // Case controls ...
    input = ge('case');
    if (input) {
      var caseDropdown = new Dropdown(input, eval(input.getAttribute('data-types')), {
        width: 208,
        onChange: function(value) {
        }
      });
      input = ge('case_token');
      var tokens = eval(input.getAttribute('data-tokens-list'));
      var caseTokenDropdown = new Dropdown(input, tokens || [], {
        width: 208,
        onChange: function(value) {
        }
      });
    }

    if (!isAddingNewKey && !isDeletedKey) {
      this._initActions(key, sectionId, hash, sectionsList);
    }

    if (sectionId == 37) {
      translation._initTextareasSMSCounter();
    }

    if (isAddingNewKey) {
      elfocus('key');
    } else {
      var ta = geByTag("textarea", dialogBody);
      if (ta && ta[0]) ta[0].select();
    }

    curBox().removeButtons().addButton(getLang('box_cancel'), function() {
      curBox().hide();
    }, "no");

    curBox().setOptions({
      onHideAttempt: function() {
        clearTimeout(translation.updateSectionTO);
        if (translation.needSectionUpdate) {
          translation.updateSectionTO = setTimeout(function() {
            if (!curBox()) {
              translation.selectSection();
              translation.needSectionUpdate = false;
            } else {
            }
          }, 300);
        }

        return true;
      }
    });

    if (canSave) {
      if (isDeletedKey) {
        curBox().addButton(getLang('tran_restore_key_button_label'), function(button) {
          var query = serializeForm(geByClass1('edit-sections-wrap'));
          query.act = "restore_key";
          query.key = key;

          hide('key-save-error');
          lockButton(button);

          ajax.post('al_translation.php', query, {
            onDone: function(error) {
              unlockButton(button);
              if (error) {
                ge('key-save-error').innerHTML = error;
                show('key-save-error');
              } else {
                curBox().hide();
                translation.selectSection();
              }
            }
          });
        });
      } else {
        // Init shortkey for Save
        function _onDialogKeyPress(event) {
          if ((event.ctrlKey || event.metaKey) && event.which == 13) {
            var nextKey = false;

            { // find next key
              var rowEl = ge('key_' + key);
              rowEl = rowEl ? rowEl.nextSibling : false;
              while (rowEl && hasClass(rowEl, 'translated')) {
                rowEl = rowEl.nextSibling;
              }
              if (rowEl) {
                nextKey = rowEl.getAttribute('id').slice(4); // remove first 'key_' prefix
              }
            }

            var button = geByTag1('button', geByClass1('box_controls')); // very hacky
            _onSave(geByTag1('button', geByClass1('box_controls')), function(savedKey) {
              if (nextKey) {
                translation.editKey(nextKey);
              }
            });
          }
        }
        var box = curBox();

        addEvent(box.bodyNode, 'keydown', _onDialogKeyPress);

        function _onSave(button, callback) {
          hide('key-save-error');

          var query = serializeForm(geByClass1('edit-sections-wrap'));

          var validator = new RegExp(/%s\b/gi), isError = false;
          each(query, function(k, v) {
            if (k.indexOf('Value_') == 0) {
              var match = v.match(validator);
              if (match && match.length > 1) {
                ge('key-save-error').innerHTML = 'More than one %s tag is forbidden';
                show('key-save-error');
                isError = true;
                return false;
              }
            }
          });
          if (isError) return;

          query.act = "save_key";
          query.lang_id = nav.objLoc.lang_id;
          if (isAddingNewKey) {
            query.is_new_key = true;
            query.section_id = newKeySectionDropdown.val();
          } else {
            query.key = key;
          }
          lockButton(button);
          ajax.post('al_translation.php', query, {
            onDone: function(error, value) {
              console.log('set need update');
              translation.needSectionUpdate = true;

              curBox().hide(100);

              unlockButton(button);
              if (error) {
                ge('key-save-error').innerHTML = error;
                show('key-save-error');
              } else {
                if (callback && isFunction(callback)) {
                  var ret = callback(query.key);
                } else if (box.el) { // inline translations
                  box.el.innerHTML = value;
                  box.el.className = 'translated';
                } else {
                  //translation.selectSection(undefined, undefined, true);
                }
              }
            }
          });
        }

        curBox().addButton(isAddingNewKey ? getLang('tran_create_key') : getLang('box_save'), _onSave);
      }

      setStyle(geByClass1('popup_box_container'), 'marginTop', 80);
    }
  },

  _initActions: function(key, sectionId, hash, sectionsList) {
    var keyWOPrefix = key.split('_');
    keyWOPrefix.shift();
    keyWOPrefix = keyWOPrefix.join('_');

    function selectAction(actionId) {
      hide('action_delete_controls', 'action_move_controls', 'action_clone_controls');

      if (actionId == 0) {
        show('action_delete_controls');
      } else if (actionId == 1) {
        show('action_clone_controls');
      } else if (actionId == 2) {
        show('action_move_controls');
      }
    }

    new Dropdown(ge('key_actions'), [[-1, getLang('tran_choose_key_action')], [0, getLang('tran_delete_key')], [1, getLang('tran_copy_key')], [2, getLang('tran_move_key')]], {
      width: 160,
      selectedItems: '-1',
      multiselect: false,
      onChange: selectAction
    });

    var cloneButton = ge('key_action_clone_button');
    var moveButton = ge('key_action_move_button');
    var deleteButton = ge('key_action_delete_button');

    if (cloneButton && moveButton && deleteButton) {
      cloneButton.onclick = translation.doCloneKey.bind(this, key, hash, false);
      moveButton.onclick = translation.doCloneKey.bind(this, key, hash, true);
      deleteButton.onclick = translation.doDeleteKey.bind(this, key, sectionId, hash);
    }
  },

  _toggleActionLoader: function (id, isShow) {
    this.replacedButtonsMap = this.replacedButtonsMap || {};
    if (isShow) {
      var buttonEl = ge(id);
      this.replacedButtonsMap[id] = buttonEl;
      var spinner = ce("img", { src: "/images/upload.gif", width:"32", height:"8", id: "actionProgressSpinned" });
      buttonEl.parentNode.replaceChild(spinner, buttonEl);
    } else {
      buttonEl = this.replacedButtonsMap[id];
      var spinner = ge('actionProgressSpinned');
      spinner.parentNode.replaceChild(buttonEl, spinner);
    }
  },

  doCloneKey: function(curKey, hash, isMove) {
    var newKey = ge((isMove ? 'move' : 'clone') + '_key_name').value;
    var self = this;

    if (!newKey || this.saveInProgress) return;

    this.saveInProgress = true;
    hide('key-save-error');

    translation._toggleActionLoader('key_action_clone_button', true);
    translation._toggleActionLoader('key_action_move_button', true);

    ajax.post('al_translation.php', { act: 'clone_key', key: curKey, new_key: newKey, move: isMove, hash: hash }, {
      onDone: function(error) {
        self.saveInProgress = false;
        translation._toggleActionLoader('key_action_clone_button', false);
        translation._toggleActionLoader('key_action_move_button', false);
        if (error) {
          ge('key-save-error').innerHTML = error;
          show('key-save-error');
        }
      }
    });
  },

  doDeleteKey: function(key, sectionId, hash) {
    if (translation.saveInProgress) return false;
    translation.saveInProgress = true;

    hide('key-save-error');
    translation._toggleActionLoader('key_action_delete_button', true);

    var query = { act: 'delete_key', key: key, section_id: sectionId, hash: hash };
    ajax.post('al_translation.php', query, {
      onDone: function(error) {
        translation.saveInProgress = false;
        if (error) {
          ge('key-save-error').innerHTML = error;
          show('key-save-error');
        } else {
          curBox().hide();
          translation.selectSection(sectionId);
        }
      }
    });
  },

  _getSMSCount: function (text) {
    return SmsCounter.count(text).messages;
  },

  initLangChooser: function() {
    var langChooser = ge('lang-chooser');
    var items = [[1, 'Russian'], [3, 'English'], [4, 'Portuguese']];

    var classes = langChooser.classList;

    var itemsHTML = '<div class="mdd-item-selected-wrap"><div class="mdd-item-selected" id="' + items[0][0] + '">' + items[0][1] + '</div></div>';
    for (var i = 0; i < items.length; i++) {
      itemsHTML += '<div class="mdd-item" id="' + items[i][0] + '">' + items[i][1] + '</div>';
    }

    var ddEl = ce('div', { innerHTML:
      '<div class="mdd-value">' + items[0][1] + '</div>' +
      '<div class="mdd-items-wrap" style="display: none">' + itemsHTML + '</div>'
      , className: 'mdd-wrap', id: langChooser.id });

    langChooser.parentNode.replaceChild(ddEl, langChooser);

    var matches = function(el, selector) {
      return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    };

    var itemsWrap = geByClass1('mdd-items-wrap', ddEl);

    addEvent(ddEl, 'click', function() {
      var valueEl = geByClass1('mdd-value', ddEl);
      show(itemsWrap);
      var size = getSize(valueEl);
      setStyle(itemsWrap, { 'margin-top': -size[1] - 6, 'margin-left': -11 });
    });
    setTimeout(function() {
      addEvent(window, 'click', function(event) {
        var node = event.target;
        var inDD = false;
        var limit = 100;
        while (limit-- && node != document) {
          if (matches(node, '.mdd-wrap')) {
            inDD = true;
            break;
          }
          node = node.parentNode;
        }

        if (!inDD) {
          hide(itemsWrap);
        }
      });
    }, 10);
  },

  go: function(el, ev) {
    var tabbedPaneEl = el.parentElement;
    var selectedTab = geByClass1('selected', tabbedPaneEl);
    removeClass(selectedTab, 'selected');

    addClass(el, 'selected');

    return nav.go(el, ev);
  },

  translatorsTab: {

    onLangStatLangChoose: function(ref, langId) {
      var statsPageEl = ge('lang_stats_page');

      removeClass(geByClass1('selected', geByClass1('langs_menu', statsPageEl)), 'selected');
      addClass(ref, 'selected');

      ajax.post('al_translation.php', { act: 'a_lang_stat_info', lang_id: langId }, {
        onDone: function(html) {
          geByClass1('lang_stat_info').innerHTML = html;
        }
      });
    },

    _toggleEditProgress: function(editEl, toShow) {
      if (toShow) {
        hide(editEl);
        var progress = se('<div class="tran_action_progress"></div>');
        editEl.parentNode.appendChild(progress);
        data(editEl, 'progress', progress);
      } else {
        var progress = data(editEl, 'progress');
        re(progress);
        show(editEl);
      }
    },

    _translatorAction: function(act, translatorId, hash, editEl) {
      this._toggleEditProgress(editEl, true);

      var _this = this;
      ajax.post('al_translation.php', { act: act, translator_id: translatorId, hash: hash }, {
        onDone: function() {
          _this._toggleEditProgress(editEl, false);
          translation.translatorsTab.translatorsTableFilter(true, true);
        }
      });
    },

    _deleteTranslator: function(translatorId, hash, editEl) {
      this._translatorAction('a_delete_translator', translatorId, hash, editEl);
    },

    _removeCoordinator: function(translatorId, hash, editEl) {
      this._translatorAction('a_delete_coordinator', translatorId, hash, editEl);
    },

    _setAsCoordinator: function(translatorId, hash, editEl) {
      this._translatorAction('a_set_as_coordinator', translatorId, hash, editEl);
    },

    _showTranslations: function(translatorId) {
      var selectedDate = this._getCurrentSelectedStatDate();
      showBox('al_translation.php', {act: 'show_translations_box', translator_id: translatorId, date: selectedDate}, {params: {dark: true, bodyStyle: 'padding: 0', width: 600, flatButtons: true, buttonsAtLeft: true, forceNoBtn: true}, noreload: true});
    },

    _initTranslatorsTable: function() {
      each(geByClass('translator_edit'), function(i, editEl) {

        (function(_editEl) {
          var dropdown = new InlineDropdown(_editEl, {
            keepTitle: true,
            onSelect: function(action) {
              var translatorId = dropdown._iddEl.getAttribute('id').split('id')[1];
              var hash = dropdown._iddEl.getAttribute('data-action-hash');
              translation.translatorsTab['_' + action](translatorId, hash, dropdown._iddEl);
            }
          });
        })(editEl);

      });
    },

    initTab: function(languages, parentLangs, targetLangs) {
      this.translatorsLangChooser = new InlineDropdown('translators_lang_chooser', {
        selected: languages[0][0],
        items: languages,
        withArrow: true,
        onSelect: function (langId) {
          translation.translatorsTab.translatorsTableFilter(true);
        }
      });

      var now = new Date(), _this = this;
      this.tranStatMonthPicker = new Datepicker(ge('translators_stat_date'), {
        mode: 'm',
        width: 130,
        month: now.getMonth() + 1,
        day: now.getDate(),
        year: now.getFullYear(),
        pastActive: true,
        onUpdate: function(date) {
          _this.tranSelectedStatDate = date.m + '.' + date.y;
          translation.translatorsTab.translatorsTableFilter();
        }
      });

      cur.translatorParentLang = new Dropdown(ge('translator_parent_lang'), parentLangs, {
        big: true,
        width: 180,
        placeholder: parentLangs[0][1]
      });

      cur.translatorTargetLang = new Dropdown(ge('translator_target_lang'), targetLangs, {
        big: true,
        width: 180,
        placeholder: targetLangs[0][1],
        autocomplete: true,
      });

      var translatorMemlinkInput = ge('translator_memlink'), phEl = geByClass1('translator_photo');;
      addEvent(translatorMemlinkInput, 'input change', function() {
        var link = trim(val(translatorMemlinkInput));

        if (!link) {
          setStyle(phEl, {backgroundImage: ''});
          phEl.setAttribute('title', '');
          return;
        }

        setStyle(phEl, {
          backgroundImage: 'url(/images/upload.gif)',
          width: 32,
          height: 8,
          marginTop: 8
        });

        ajax.post('al_translation.php', { act: 'a_get_mem_data', link: link }, {
          onDone: function(photo, name) {
            setStyle(phEl, {
              backgroundImage: 'url(' + photo + ')',
              width: 22,
              height: 22,
              marginTop: 0
            });
            phEl.setAttribute('title', name);
          }
        });
      });

      this._initTranslatorsTable();
    },

    onAddTranslator: function(button, hash) {
      var memLink = trim(val('translator_memlink'));
      var parentLang = +cur.translatorParentLang.val();
      var targetLang = +cur.translatorTargetLang.val();

      if (!memLink || !parentLang || !targetLang) {
        return;
      }

      if (parentLang == 1) { // hack for Dropdown good work
        parentLang = 0;
      }

      lockButton(button);

      ajax.post('al_translation.php', { act: 'a_add_translator', hash: hash, mem_link: memLink, parent_lang: parentLang, target_lang: targetLang }, {
        onDone: function() {
          unlockButton(button);
          translation.translatorsTab.translatorsTableFilter(true, true);
        }
      });
    },

    translatorsTableFilter: function(immediate, force) {
      var _this = this;
      this.currTranslatorsFilters = this.currTranslatorsFilters || '';
      var tableEl = ge('translators_table_cont');

      this.updateTranslatorsTable = this.updateTranslatorsTable || function(showCoordsFilter, textFilter, langId, selectedStatDate, force) {
        var fstr = '' + (+showCoordsFilter) + textFilter + langId + selectedStatDate;
        if (!force && _this.currTranslatorsFilters == fstr) {
          return;
        }
        _this.currTranslatorsFilters = fstr;

        showMask(tableEl, true);

        ajax.post('al_translation.php', { act: 'get_translators_table', show_coords_filter: +showCoordsFilter, text_filter: textFilter, lang_id: langId, stat_date: selectedStatDate }, {
          onDone: function(html) {
            hideMask(tableEl);
            tableEl.innerHTML = html;
            _this._initTranslatorsTable();
          }
        });
      };
      this.updateTranslatorsTableDebounced = this.updateTranslatorsTableDebounced || _debounce(this.updateTranslatorsTable, 300);

      var showCoordsFilter = hasClass('toggle_coordinators', 'on');
      var textFilter = val('translators_filter');
      var langId = this.translatorsLangChooser.getSelected()[0];
      var selectedStatDate = this._getCurrentSelectedStatDate();

      if (immediate) {
        this.updateTranslatorsTable(showCoordsFilter, textFilter, langId, selectedStatDate, force);
      } else {
        this.updateTranslatorsTableDebounced(showCoordsFilter, textFilter, langId, selectedStatDate, force);
      }
    },

    _getCurrentSelectedStatDate: function() {
      var now = new Date();
      return this.tranSelectedStatDate ? this.tranSelectedStatDate : ((now.getMonth() + 1) + '.' + now.getFullYear());
    }
  },

  batchEditTab: {
    initTab: function() {
      if (nav.objLoc.key) {
        var input = ge('batch_key_search_input');
        val(input, nav.objLoc.key);
        this.searchKey(input, true);
      }
    },

    searchKey: function(input, force) {
      if (this._saveInProgress) {
        return;
      }

      var key = trim(val(input));
      if (!force && this.prevBatchSearchKey == key) {
        return;
      }

      nav.setLoc(extend(nav.objLoc, { key: key }));

      var spinner = ge('batch_key_search_spinner');
      this.batchKeysValues = {};

      var self = this;
      ajax.post('al_translation.php', { act: 'batch_edit_search_key', key: key }, {
        showProgress: show.pbind(spinner),
        hideProgress: hide.pbind(spinner),
        onDone: function(values) {
          var resultsEl = ge('batch_edit_results');
          var resultHTML = '';
          for(var i = 0; i < values.length; i++) {
            var lang = values[i];

            resultHTML += '<div class="batch_edit_item">';
            resultHTML += '  <div class="batch_edit_item_lang">' + lang.lang + '</div>';
            resultHTML += '  <div class="batch_edit_item_value" data-language-id="' + lang.language_id + '">' + lang.value + '</div>';
            resultHTML += '  <div class="batch_edit_item_result" data-language-id="' + lang.language_id + '">' + lang.value + '</div>';
            resultHTML += '</div>';

            self.batchKeysValues[lang.language_id] = lang.value;
          }

          resultsEl.innerHTML = resultHTML;

          self.updatePreview();
        }
      });

      this.prevBatchSearchKey = key;
    },

    updatePreview: function() {
      if (this._saveInProgress) {
        return;
      }

      var subst = trim(val('batch_pattern_subst'));
      var patt = trim(val('batch_pattern'));
      var regexp, regexpForHL;

      var globalFlag = hasClass('regexp_global', 'on') ? 'g' : '';

      if (patt) {
        try {
          regexp = new RegExp(patt, globalFlag);
          regexpForHL = new RegExp('(' + patt + ')', globalFlag);
        } catch(e) {
          return;
        }
      }

      var self = this;
      each(geByClass('batch_edit_item_value'), function(i, el) {
        var value = self.batchKeysValues[el.getAttribute('data-language-id')];
        value = ce('div', {innerHTML: value}).innerHTML;

        if (regexp) {
          var hl = value.replace(regexpForHL, '<span class="hl">$1</span>');
          el.innerHTML = hl;

          value = value.replace(regexp, subst);
        } else {
          el.innerHTML = value;
        }

        geByClass1('batch_edit_item_result', el.parentNode).innerHTML = value;
      });
    },

    saveChanged: function(button, hash) {
      var itemsCount = geByClass('batch_edit_item_result').length, ChunkSize = 4;

      this._saveInProgress = true;
      this._saveCompleteRef = 0;
      var self = this;

      function onCompleteAll() {
        self._saveInProgress = false;
        unlockButton(button);
        self.searchKey(ge('batch_key_search_input'), true);
      }

      function onSaveChunk() {
        self._saveCompleteRef ++;
        if (self._saveCompleteRef == Math.ceil(itemsCount / ChunkSize)) {
          onCompleteAll();
        }
      }

      lockButton(button);
      for (var i = 0; i < itemsCount; i += ChunkSize) {
        if (this._save(i, ChunkSize, onSaveChunk, hash) === false) {
          onSaveChunk(); // if no request was sent, so simulate complete chunk
        }
      }
    },

    _save: function(offset, limit, callback, hash) {
      var query = {}, counter = 0, self = this;

      each(geByClass('batch_edit_item_result'), function(i, el) {
        if (i >= offset + limit) {
          return false;
        }

        if (i < offset) { // offset skip
          return;
        }

        var value = el.innerHTML, langId = el.getAttribute('data-language-id');
        var originalValue = self.batchKeysValues[langId];
        originalValue = ce('div', {innerHTML: originalValue}).innerHTML;

        if (value == originalValue) {
          return;
        }

        query['value_' + langId] = el.innerHTML.replace(/<br>/g, '\n');
      });

      if (isEmpty(query)) {
        return false;
      }

      query.key = trim(val('batch_key_search_input'));
      query.act = 'batch_save';
      query.hash = hash;

      ajax.post('al_translation.php', query, {
        onDone: function(response) {
          callback();
        }
      });
    }
  },

  glossaryTab: {
    initTab: function() {
      this._resortItems();

      var searchInput = ge('glossary_search_input');
      addEvent(searchInput, 'change input', function() {
        var searchStr = trim(val(searchInput)).toLowerCase();;
        var regex = searchStr ? new RegExp(searchStr, 'g') : null;

        each(geByClass('item', geByClass1('glossary_items')), function(i, itemEl) {
          if (regex) {
            var str = geByClass1('original', itemEl).innerHTML;
            str += geByClass1('alternative_original', itemEl).innerHTML;
            str += geByClass1('translation', itemEl).innerHTML;
            str += geByClass1('comments', itemEl).innerHTML;
            str = str.toLowerCase();

            toggle(itemEl, regex.test(str));
          } else {
            show(itemEl);
          }
        })
      });
    },

    _reload: function(itemsHtml) {
      var newItems = se(itemsHtml);
      var oldItems = geByClass1('glossary_items');
      oldItems.parentNode.replaceChild(newItems, oldItems);
      this._resortItems();
    },

    _resortItems: function() {
      var list = geByClass1('glossary_items');

      var items = list.childNodes;
      var itemsArr = [];
      for (var i in items) {
        if (items[i].nodeType == 1) {
          itemsArr.push(items[i]);
        }
      }

      itemsArr.sort(function(a, b) {
        var ta = geByClass1('original', a).innerHTML;
        var tb = geByClass1('original', b).innerHTML;
        return ta == tb ? 0 : (ta > tb ? 1 : -1);
      });

      for (i = 0; i < itemsArr.length; ++i) {
        list.appendChild(itemsArr[i]);
      }
    },

    editItem: function(ref) {
      this.cancelSaveItem();

      ref = ge(ref);

      var ruPhrase = '', enPhrase = '', tranPhrase = '', comments = '', id = '';
      if (ref) {
        ruPhrase = geByClass1('original', ref).innerHTML;
        enPhrase = geByClass1('alternative_original', ref).innerHTML;
        tranPhrase = geByClass1('translation', ref).innerHTML;
        comments = geByClass1('comments', ref).innerHTML.split('<br>').join('\n');

        id = ref.id.split('item')[1];
      } else {
        ref = ge('add_new_place');
        id = 0;
      }

      var noDeleteStyle = ref && !!ref.getAttribute('data-no-delete') || id == 0 ? 'display: none' : '';

      var editEl = se(
        '<div class="edit_item">' +
          '<div class="original_phrases">' +
            '<input id="glossary_edit_ru_phrase" type="text" class="text cmdenter" placeholder="Russian phrase" value="' + ruPhrase + '">' +
            '<input id="glossary_edit_en_phrase" type="text" class="text cmdenter" placeholder="English phrase" value="' + enPhrase + '">' +
          '</div>' +
          '<input id="glossary_edit_phrase" type="text" class="text cmdenter" placeholder="Translation" value="' + tranPhrase + '">' +
          '<div class="glossary_translation_wrap">' +
          ' <textarea id="glossary_edit_comments" type="text" class="text cmdenter" placeholder="Comments">' + comments + '</textarea>' +
          '</div>' +
          '<div class="glossary_edit_delete" style="' + noDeleteStyle + '" onclick="translation.glossaryTab.deleteItem(this, ' + id + ')">Delete</div>' +
          '<div id="glossary_edit_delete_progress" style="display: none"></div>' +
          '<div class="edit_buttons"><button id="glossary_save_item" class="flat_button" onclick="translation.glossaryTab.saveItem(this, ' + id + ')">Save</button><button id="cancel" class="flat_button secondary" onclick="translation.glossaryTab.cancelSaveItem()">Cancel</button></div>' +
        '</div>');

      ref.parentNode.insertBefore(editEl, ref.nextSibling);
      hide(ref);

      var self = this;
      each(geByClass('cmdenter', editEl), function(i, input) {
        addEvent(input, 'keydown', function(event) {
          if ((event.ctrlKey || event.metaKey) && event.which == 13) {
            translation.glossaryTab.saveItem(ge('glossary_save_item'), id, true);
          }
          if (event.which == 27) {
            translation.glossaryTab.cancelSaveItem();
          }
        })
      });

      ge('glossary_edit_ru_phrase').select();

      this._hiddenRef = ref;
    },

    cancelSaveItem: function() {
      var editEl = geByClass1('edit_item', ge('translation_glossary_page'));
      re(editEl);
      show(this._hiddenRef);
    },

    deleteItem: function(ref, itemId) {
      show('glossary_edit_delete_progress');
      hide(ref);
      var self = this;
      ajax.post('al_translation.php', {act: 'glossary_delete_item', item_id: itemId}, {
        onDone: function (itemsHtml) {
          hide('glossary_edit_delete_progress');
          show(ref);
          self._reload(itemsHtml);
        }
      });
    },

    saveItem: function(button, itemId, withOpenNext) {
      var editEl = geByClass1('edit_item', ge('translation_glossary_page'));
      var ruPhrase = val('glossary_edit_ru_phrase');
      var enPhrase = val('glossary_edit_en_phrase');
      var tranPhrase = val('glossary_edit_phrase');
      var comments = val('glossary_edit_comments');

      if (!ruPhrase && !enPhrase) {
        return;
      }

      lockButton(button);

      var self = this;
      ajax.post('al_translation.php', { act: 'glossary_save_item', item_id: itemId, ru_phrase: ruPhrase, en_phrase: enPhrase, tran_phrase: tranPhrase, comments: comments }, {
        onDone: function(itemsHtml) {
          unlockButton(button);
          self.cancelSaveItem();
          self._reload(itemsHtml);

          if (withOpenNext) {
            var itemEl = ge('item' + itemId);
            if (itemEl && (itemEl = itemEl.nextSibling)) {
              self.editItem(itemEl);
            } else {
              translation.glossaryTab.editItem();
            }
          }
        }
      });
    },

    onMouseOverItem: function(itemEl) {
      if (geByClass1('edit_button', itemEl)) {
        return;
      }

      var editEl = se('<div class="edit_button" onclick="translation.glossaryTab.editItem(\'' + itemEl.id + '\')">edit</div>');
      itemEl.insertBefore(editEl, itemEl.firstChild);
    },

    onMouseLeaveItem: function(itemEl) {
      re(geByClass1('edit_button', itemEl));
    }
  }
}

window.t = translation.t;

try{stManager.done('translation.js');}catch(e){}

function AutoTokens(textarea, tokens) {
  var timeout, pattern = /{[^}]+}|%[a-z]/gi;
  addEvent(textarea, 'keyup', function() {
    clearTimeout(timeout);
    setTimeout(function(){
      onEnterText();
    }, 200);
  });
  each(tokens.childNodes, function(i, x){
    if (x.nodeType == 1) {
      addEvent(x, 'click', function(){return insertToken(x, x.innerHTML)});
    }
  });
  function onEnterText(e) {
    var matches = textarea.value.match(pattern);
    var index, token;
    each (tokens.childNodes, function(i, x) {
      if (x.nodeType != 1)
        return;
      token = x.innerHTML;
      index = matches != null ? indexOf(matches, token) : -1;
      if (index != -1) {
        matches.splice(index, 1);
        x.style.display = 'none';
      } else {
        x.style.display = '';
      }
    });
  }
  function insertToken(el, token) {
    if (textarea.selectionStart != textarea.selectionEnd) {
      textarea.value += token;
    } else {
      var sel = textarea.selectionStart + token.length;
      textarea.value = textarea.value.substring(0, textarea.selectionStart) + token + textarea.value.substr(textarea.selectionStart);
    }
    hide(el);
    if (sel > 0) {
      textarea.selectionStart = textarea.selectionEnd = sel;
    }
    textarea.focus();
    return false;
  }
}


function _debounce(func, wait) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    var last = new Date().getTime() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    if (!timeout) timeout = setTimeout(later, wait);
    return result;
  };
};


(function() {
  var $, SmsCounter;

  window.SmsCounter = SmsCounter = (function() {
    function SmsCounter() {}

    SmsCounter.gsm7bitChars = "@£$¥èéùìòÇ\\nØø\\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\\\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";
    SmsCounter.gsm7bitExChar = "\\^{}\\\\\\[~\\]|€";
    SmsCounter.gsm7bitRegExp = RegExp("^[" + SmsCounter.gsm7bitChars + "]*$");
    SmsCounter.gsm7bitExRegExp = RegExp("^[" + SmsCounter.gsm7bitChars + SmsCounter.gsm7bitExChar + "]*$");
    SmsCounter.gsm7bitExOnlyRegExp = RegExp("^[\\" + SmsCounter.gsm7bitExChar + "]*$");
    SmsCounter.GSM_7BIT = 'GSM_7BIT';
    SmsCounter.GSM_7BIT_EX = 'GSM_7BIT_EX';
    SmsCounter.UTF16 = 'UTF16';
    SmsCounter.messageLength = {
      GSM_7BIT: 160,
      GSM_7BIT_EX: 160,
      UTF16: 70
    };
    SmsCounter.multiMessageLength = {
      GSM_7BIT: 153,
      GSM_7BIT_EX: 153,
      UTF16: 67
    };

    SmsCounter.count = function(text) {
      var count, encoding, length, messages, per_message, remaining;
      encoding = this.detectEncoding(text);
      length = text.length;

      // treat '{code}' as 8 characters
      var codeCount = (text.match(/\{count\}/g) || []).length;
      length += codeCount * 2;

      if (encoding === this.GSM_7BIT_EX) {
        length += this.countGsm7bitEx(text);
      }
      per_message = this.messageLength[encoding];
      if (length > per_message) {
        per_message = this.multiMessageLength[encoding];
      }
      messages = Math.ceil(length / per_message);
      remaining = (per_message * messages) - length;
      return count = {
        encoding: encoding,
        length: length,
        per_message: per_message,
        remaining: remaining,
        messages: messages
      };
    };

    SmsCounter.detectEncoding = function(text) {
      switch (false) {
        case text.match(this.gsm7bitRegExp) == null:
          return this.GSM_7BIT;
        case text.match(this.gsm7bitExRegExp) == null:
          return this.GSM_7BIT_EX;
        default:
          return this.UTF16;
      }
    };

    SmsCounter.countGsm7bitEx = function(text) {
      var char2, chars;
      chars = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = text.length; _i < _len; _i++) {
          char2 = text[_i];
          if (char2.match(this.gsm7bitExOnlyRegExp) != null) {
            _results.push(char2);
          }
        }
        return _results;
      }).call(this);
      return chars.length;
    };

    return SmsCounter;

  })();

}).call(this);
