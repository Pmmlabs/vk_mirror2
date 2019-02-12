var TR_ADDRESS = 'translation';

(function(exports) {
    var _caseDropdown, _caseTokenDropdown, _functionTypeDropdown;
    var _keysLangSelectorDropdown;

    var _translatorsDateSelector;
    var _languagesSortDropdown;
    var _translatorsSortDropdown;

    var _SPECIAL_CODES_REGEX = /((\%[a-z]+)|\{([a-zA-Z0-9\.\-\_\/]+)\})/gi;

    var _KEY_SETTINGS_STATUS_TRANSLATE_TO_ALL = 0,
        _KEY_SETTINGS_STATUS_DONT_TRANSLATE = 1,
        _KEY_SETTINGS_STATUS_TRANSLATE_CUSTOM_LANGUAGES = 2,
        _KEY_SETTINGS_STATUS_TRANSLATE_ONLY_CIS = 3,
        _KEY_SETTINGS_STATUS_ONLY_MAIN_LANGUAGES = 4;
    _KEY_SETTINGS_STATUS_VK_APP = 5,
        _KEY_SETTINGS_STATUS_EVERYONE_BUT = 6;

    function _box_initTextareas() {
        var maxHeight;
        if (hasClass('translations_box_edit_key', 'tr_box_edit_key_simple')) {
            maxHeight = 450;
        }
        each(geByClass('_tr_text_value'), function() {
            var config = domData(this, 'config');
            if (config) {
                config = JSON.parse(config);
                if (config.langId && !isMainSupportedLanguage(config.langId)) {
                    var counterEl = geByClass1('tr_key_edit_counter', domPN(this));
                    if (config.parentValue) {
                        val(geByClass1('_tr_counter_parent', counterEl), config.parentValue.length);
                        val(geByClass1('_tr_counter', counterEl), val(this).length);
                        show(counterEl);
                        _formKeyDownCheck(this);
                    }
                }
            }
            if (this.autosize) {
                this.autosize.options.maxHeight = maxHeight;
                this.autosize.update();
            } else {
                autosizeSetup(this, {
                    minHeight: 50,
                    maxHeight: maxHeight
                });
            }
        });
    }

    function _box_initValuesChangeEvents() {
        var rusValues = geByClass('_tr_text_value', geByClass('_tr_key_edit_wrap')[0]);
        var engValues = geByClass('_tr_text_value', geByClass('_tr_key_edit_wrap')[1]);

        var engWasChanged = false;
        var prevValue = '';

        each(rusValues, function(i) {
            addEvent(this, 'input change', function(e) {
                var v = val(this);
                if (!engWasChanged) {
                    val(engValues[i], v);
                }
            });
        });

        each(engValues, function() {
            addEvent(this, 'input change', function() {
                engWasChanged = true;
            });
            addEvent(this, 'focus', function() {
                if (!engWasChanged) {
                    this.select();
                }
            });
        });
    }

    function _box_changeKeyFunctionType(functionType) {
        ajax.post(TR_ADDRESS, {
            act: 'function_type',
            function_type: functionType
        }, {
            onDone: function(rusEditor, engEditor) {
                var boxNode = curBox().bodyNode;

                var editorsEls = geByClass('_tr_key_edit_wrap', boxNode);

                // save previous values
                var rusValue = [],
                    engValue = [];
                each(geByClass('_tr_text_value', editorsEls[0]), function() {
                    rusValue.push(val(this));
                });
                each(geByClass('_tr_text_value', editorsEls[1]), function() {
                    engValue.push(val(this));
                });

                rusEditor = se(rusEditor);
                engEditor = se(engEditor);

                // restore previous values
                each(geByClass('_tr_text_value', rusEditor), function(i) {
                    val(this, i < rusValue.length ? rusValue[i] : '');
                });
                each(geByClass('_tr_text_value', engEditor), function(i) {
                    val(this, i < engValue.length ? engValue[i] : '');
                });

                domReplaceEl(editorsEls[0], rusEditor);
                if (editorsEls[1]) {
                    domReplaceEl(editorsEls[1], engEditor);
                }

                _box_initTextareas();
            }
        });
    }

    function saveKey(btn, hash, onDone) {
        if (hasClass(btn, 'button_disabled')) {
            return false;
        }
        var query = {
            act: 'save_key',
            hash: hash
        };

        query.lang_id = intval((nav.objLoc.lang_id !== undefined ? nav.objLoc.lang_id : cur.langId) || 0);

        // key name
        query.key = val('tr_new_key') || val('tr_key_input');
        if (_functionTypeDropdown && typeof _functionTypeDropdown == 'object') {
            query.function_type = _functionTypeDropdown.getSelected()[0];
        }

        query.lang_ids = [];

        each(geByClass('_tr_key_edit_wrap'), function() {
            var langId = domData(this, 'lang-id');
            var values = [];

            each(geByClass('_tr_text_value', this), function() {
                values.push(val(this));
            });

            if (values.length > 1) {
                values = '@@' + values.join('@');
            } else {
                values = values[0];
            }

            query['Value_' + langId] = values;
            query.lang_ids.push(langId);
        });

        query.lang_ids = query.lang_ids.join(',');

        query.open_ts = cur.openTs;

        if (cur.isSuperTranslator) {
            // description
            query.description = val('tr_description_edit');
            query.description_english = val('tr_description_edit_english');

            // params
            query.extended_wiki = intval(hasClass('tr_extra_wiki', 'on'));
            query.disable_inline = intval(hasClass('tr_extra_disable_inline', 'on'));
            query.export = intval(hasClass('tr_extra_export_to_js', 'on'));
            query.has_case = intval(hasClass('tr_extra_case', 'on'));
            query.mark_untranslated = intval(hasClass('tr_extra_mark_as_untranslated', 'on'));
            query.screens = _box_getScreens();
            // case
            if (query.has_case) {
                query.case = _caseDropdown.selectedItems()[0][0];
                var caseTokenSelected = _caseTokenDropdown.selectedItems();

                if (caseTokenSelected.length) {
                    query.case_token = _caseTokenDropdown.selectedItems()[0][1];
                }
            }
            query.key_status = radioval('tr_key_settings_status');
            if (query.key_status === _KEY_SETTINGS_STATUS_TRANSLATE_CUSTOM_LANGUAGES ||
                query.key_status === _KEY_SETTINGS_STATUS_EVERYONE_BUT) {
                query.selected_languages = cur.translationKeyLanguagesDD.val();
                if (!query.selected_languages) {
                    return notaBene(cur.translationKeyLanguagesDD.input);
                }
            }
        }

        ajax.post(TR_ADDRESS, query, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(keyValueHtml, inlineHtmlValue, counters, icons) {
                // update counters
                if (counters) {
                    each(counters[0], function(sid, cnt) {
                        var cntEl = ge('tr_section_counter_' + sid);
                        if (cntEl) {
                            var value = cnt[0] ? '+' + cnt[0] : '';
                            val(cntEl, value);
                        }
                    });
                    var cntEl = ge('tr_section_counter_total');
                    if (cntEl) {
                        var value = counters[1] ? '+' + counters[1] : '';
                        val(cntEl, value);
                    }
                }
                if (icons) {
                    each(icons, function(icon, status) {
                        toggle('translation_' + query.key + '_' + icon, status);
                    });
                }

                if (keyValueHtml && query.key) {
                    var rowEl = document.querySelector('.tr_key[data-key=' + query.key + ']');
                    if (rowEl) {
                        removeClass(rowEl, 'tr_untranslated');
                        geByClass1('_tr_key_inner', rowEl).innerHTML = keyValueHtml;
                    }
                    var currentInlineElement = cur.translationBoxIsInlineTranslation;
                    delete cur.translationBoxIsInlineTranslation;
                    if (currentInlineElement) {
                        val(currentInlineElement, inlineHtmlValue);
                        addClass(currentInlineElement, 'translated');
                    }

                } else {
                    nav.reload();
                }

                boxQueue.hideAll();

                onDone && onDone(keyValueHtml);

                if (query.mark_untranslated) {
                    nav.reload();
                }
            }
        })
    }

    function _box_hasCaseChanged(hasCase) {
        toggle(geByClass1('_tr_case_controls'), hasCase);

        if (hasCase) {
            var rusValue = geByClass('_tr_text_value', geByClass('_tr_key_edit_wrap')[0]);
            rusValue.length && triggerEvent(rusValue[0], 'change');
        }
    }

    function newKey() {
        openKey('');
    }

    function openNextKey(key) {
        var rowEl = document.querySelector('.tr_key[data-key=' + key + ']');
        rowEl = rowEl ? domNS(rowEl) : false;

        if (rowEl) {
            key = domData(rowEl, 'key');
            openKey(key);
        }
    }

    function _box_showFormsTabs(boxType) {
        var formsEl = ge('translations_key_forms');
        if (formsEl && formsEl.offsetHeight >= 300 && boxType != 1) {
            show('translations_key_form_tabs');
            hide('translations_key_param_tab_translation_3'); //english
            each(geByClass('subheader', formsEl), function(k, el) {
                hide(el);
            });
        }
    }

    function _box_hideFormsTabs() {
        var formsEl = ge('translations_key_forms');
        if (!formsEl) {
            return;
        }
        hide('translations_key_form_tabs');
        show('translations_key_param_tab_translation_0', 'translations_key_param_tab_translation_3');
        each(geByClass('subheader', formsEl), function(k, el) {
            show(el);
        });
    }

    function _box_initExtendedForms(boxType) {
        if (nav.objLoc.tab) {
            var tabName = nav.objLoc.tab,
                tabEl = ge('translation_key_param_' + tabName);
            switchTab(domFC(tabEl), tabName);
        }
        if (nav.objLoc.key_lang_id) {
            var langId = nav.objLoc.key_lang_id,
                langEl = ge('translation_key_value_' + langId);
            switchLangTab(domFC(langEl), langId)
        }
        setTimeout(function() {
            _box_showFormsTabs(boxType);

            if (nav.objLoc.key_tr_id && isVisible('translations_key_form_tabs')) {
                var translationId = nav.objLoc.key_tr_id,
                    translationEl = ge('translations_key_translation_' + translationId);
                switchTranslationTab(domFC(translationEl), translationId)
            }
        }, 10);
        var boxWidth = 940;
        if (boxType == 1) {
            boxWidth = 540;
        }

        if (curBox()) {
            curBox().setOptions({
                title: false,
                width: boxWidth,
                bodyStyle: 'padding: 0;overflow: visible;'
            });
            addClass(curBox().bodyNode, 'tr_box_edit_key_extended_body');
        }
    }

    function switchBoxType(el, boxType) {
        if (hasClass(el, 'active')) {
            return;
        }
        if (boxType == 1) {
            addClass('translations_box_edit_key', 'tr_box_edit_key_simple');
            _box_hideFormsTabs();
            var boxWidth = 540,
                sectionsDDWidth = 238,
                otherLangsHeight = 120,
                translationKeyDDWidth = 500;
        } else if (boxType == 2) {
            removeClass('translations_box_edit_key', 'tr_box_edit_key_simple');
            var boxWidth = 940,
                sectionsDDWidth = 438,
                translationKeyDDWidth = 900;
            _box_showFormsTabs(boxType);
        }
        if (cur.keySectionsDD) {
            cur.keySectionsDD.setOptions({
                width: sectionsDDWidth
            });
        }
        if (cur.translationKeyLanguagesDD) {
            cur.translationKeyLanguagesDD.setOptions({
                width: translationKeyDDWidth
            });
        }
        each(geByClass('_tr_translation_box_icon', 'translation_box_types'), function(k, v) {
            removeClass(v, 'active');
        });
        addClass(el, 'active');
        curBox().setOptions({
            width: boxWidth
        });
        if (window.tooltips) {
            tooltips.hideAll()
        }
        _box_initOtherLangsScroll(otherLangsHeight);
        _box_initTextareas();
        cur.translationBoxType = boxType;
        ajax.post(TR_ADDRESS, {
            act: 'a_change_box_type',
            box_type: boxType
        });
    }

    function _box_initScrollHeight(blockId, blockHeight) {
        var block = ge(blockId);
        if (!block) {
            return;
        }
        var resizeContainerEl = geByClass1('_tr_history_rows', block),
            resizerEl = geByClass1('_tr_history_resizer', block);
        if (getSize(resizeContainerEl)[1] >= resizeContainerEl.scrollHeight) {
            hide(resizerEl);
            setStyle(resizeContainerEl, 'height', 'inherit');
        } else {
            show(resizerEl);
            var resizeMouseMove;
            addEvent(resizerEl, 'mousedown', function(e) {
                var resizeContainerPos = getXY(resizeContainerEl);
                resizeMouseMove && removeEvent(window, 'mousemove', resizeMouseMove);
                addEvent(window, 'mousemove', resizeMouseMove = function(e) {
                    setStyle(resizeContainerEl, {
                        height: Math.min(resizeContainerEl.scrollHeight, Math.max(50, e.pageY - resizeContainerPos[1]))
                    })
                });

                addEvent(window, 'mouseup', function(e) {
                    removeEvent(window, 'mousemove', resizeMouseMove);
                });

                return cancelEvent(e);
            });
        }
        if (blockHeight) {
            setStyle(resizeContainerEl, {
                height: blockHeight
            });
        }
    }

    function _box_initCases() {
        _caseDropdown = _caseTokenDropdown = false;
        var caseInput = ge('tr_case');
        if (caseInput) {
            var selected = domData(caseInput, 'selected');
            _caseDropdown = new Dropdown(caseInput, JSON.parse(domData(caseInput, 'cases')), {
                big: true,
                width: 200,
                selectedItems: selected,
                onChange: function(id, item) {}
            });
        }

        var caseTokenInput = ge('tr_case_token');
        if (caseTokenInput) {
            var selected = domData(caseTokenInput, 'selected');
            _caseTokenDropdown = new Dropdown(caseTokenInput, [], {
                big: true,
                width: 200,
                selectedItems: selected,
                onChange: function(id, item) {}
            });
        }
    }

    function _box_initOtherLangsScroll(blockHeight) {
        if (ge('translations_lang_value_-1') && isVisible('translations_lang_value_-1')) {
            var otherLangsBlock = ge('translations_other_langs_block'),
                langsList = geByClass('_tr_history_row_value', otherLangsBlock);
            each(langsList, function(k, v) {
                var textHeight = parseInt(getStyle(v, 'height'));
                if (textHeight > 300) {
                    addClass(v, 'tr_row_value_text_short');
                    addEvent(v, 'click', function(event) {
                        cancelEvent(event);
                        toggleClass(this, 'active');
                        if (hasClass('translations_box_edit_key', 'tr_box_edit_key_simple')) {
                            otherLangsHeight = 120;
                        } else {
                            otherLangsHeight = parseInt(getStyle('translations_key_forms', 'height'));
                        }
                        _box_initScrollHeight(otherLangsBlock, otherLangsHeight);
                    });
                }
            });
            setTimeout(function() {
                if (!blockHeight) {
                    blockHeight = parseInt(getStyle('translations_key_forms', 'height'));
                }
                _box_initScrollHeight(otherLangsBlock, blockHeight);
            }, 10);
        }
    }

    function _box_setValueSize(langId) {
        var valueBlock = geByClass1('_tr_value_rows_wrap', 'translations_lang_value_' + langId),
            height = parseInt(getStyle(valueBlock, 'height'));
        if (cur.keyBoxValueHeight && cur.keyBoxValueHeight > height) {
            setStyle(valueBlock, {
                height: cur.keyBoxValueHeight
            });
        }
        cur.keyBoxValueHeight = height;
    }

    function _box_chooseScreenHandler() {
        cur.showedAttachScreenBox = true;
        showBox(TR_ADDRESS, {
            act: 'choose_photo',
            section: cur.selectedSection
        }, {
            params: {
                onShow: function() {
                    addClass(curBox().titleWrap, 'translations_screen_attach_box_title');
                    addClass(curBox().bodyNode, 'translations_screen_attach_box');
                },
                onHide: function() {
                    delete cur.showedAttachScreenBox;
                }
            }
        });
    }

    function _box_initScreens(isDeleted) {
        if (cur.isSuperTranslator && !isDeleted) {
            var addMedia = new MediaSelector('tr_add_lnk', 'tr_preview', [
                ['photo', getLang('tran_select_screenshot')],
            ], {
                mediaHandlers: {
                    photo: _box_chooseScreenHandler
                }
            });
            cur.addScreens = addMedia;
            setTimeout(function() {
                if (cur.translationsScreensList && cur.translationsScreensList.length > 0) {
                    each(cur.translationsScreensList, function(k, item) {
                        if (item) {
                            addMedia.chooseMedia(item[0], item[1], item[2], '', true);
                        }
                    });
                    hide('translations_box_no_screenshots');
                }
                if (!cur.addScreens.lnkId) {
                    return;
                }
                cur.addMedia[cur.addScreens.lnkId].showPhoto = showScreen;
                var unChooseMedia = cur.addMedia[cur.addScreens.lnkId].unchooseMedia;
                cur.addMedia[cur.addScreens.lnkId].unchooseMedia = function(ind) {
                    cur.showedAttachScreenBox = true;
                    var _media = this,
                        _deleteCallback = function() {
                            var media = _media.chosenMedias[ind];
                            unChooseMedia(ind);
                            var hasItems = false;
                            cur.translationsScreensList = cur.translationsScreensList.map(function(item) {
                                if (item && item[1] == media[1]) {
                                    return false;
                                }
                                return item;
                            });
                            _media.chosenMedias.map(function(item) {
                                if (item != false) {
                                    hasItems = true;
                                }
                                return item;
                            });
                            if (hasItems == false) {
                                show('translations_box_no_screenshots');
                            }
                            curBox().hide();
                        };
                    return showFastBox(getLang('global_warning'), getLang('tran_sure_want_delete_screen'), getLang('global_delete'), _deleteCallback, getLang('global_cancel'));
                };
            }, 10);
        }
    }

    function chooseUplaodedScreen(media, data, i, fileName) {
        data.uploadNum = i;
        cur.chooseMedia('photo', media, extend(data, {
            upload_ind: i + '_' + fileName
        }), null, true);
        cur.translationsScreensList.push(['photo', media, data]);
        hide('translations_box_no_screenshots');
    }

    function _box_getScreens() {
        var screensList = [];
        if (cur.isSuperTranslator && cur.addScreens) {
            var mediasList = cur.addScreens.getMedias();
            if (mediasList.length) {
                each(mediasList, function(k, row) {
                    if (row[0] == 'photo') {
                        screensList.push(row[1]);
                    }
                });
            }
        }
        return screensList;
    }

    function chooseScreen(photoRaw, data, event) {
        hide('translations_box_no_screenshots');
        cur.chooseMedia('photo', photoRaw, data, '');
        cur.translationsScreensList.push(['photo', photoRaw, data]);
        cancelEvent(event);
    }

    function _box_backupValues() {
        var values = geByClass('_tr_text_value', 'translations_box_edit_key'),
            backupData = [];
        each(values, function(k, v) {
            backupData[k] = val(v);
        });
        cur.translationsBoxBackupedValues = backupData;
        var extraParams = ge('translations_extra_params');
        if (extraParams) {
            var extraParamsData = [],
                extraParamsList = geByClass('checkbox', extraParams);
            each(extraParamsList, function(k, v) {
                extraParamsData[k] = hasClass(v, 'on') ? 1 : 0;
            });
            cur.translationsBoxBackupedExtra = extraParamsData;
        }
    }

    function _box_restoreValues() {
        if (cur.translationsBoxBackupedValues && cur.translationsBoxBackupedValues.length) {
            var values = geByClass('_tr_text_value', 'translations_box_edit_key');
            each(values, function(k, v) {
                var text = '';
                if (cur.translationsBoxBackupedValues[k]) {
                    text = cur.translationsBoxBackupedValues[k];
                }
                val(v, text);
            });
            delete cur.translationsBoxBackupedValues;
        }
        if (cur.translationsBoxBackupedExtra && cur.translationsBoxBackupedExtra.length) {
            var extraParams = ge('translations_extra_params');
            if (extraParams) {
                var extraParamsList = geByClass('checkbox', extraParams);
                each(extraParamsList, function(k, v) {
                    var isEnabled = cur.translationsBoxBackupedExtra[k],
                        id = attr(v, 'id');
                    if (isEnabled) {
                        addClass(v, 'on');
                    } else {
                        removeClass(v, 'on');
                    }
                    if (id == 'tr_extra_case') {
                        TR.hasCaseChanged(isEnabled);
                    }
                });
                delete cur.translationsBoxBackupedExtra;
            }
        }
    }

    function showScreen(photoRaw, listId, opts, event) {
        cur.showedScreen = 1;
        if (cur.translationBoxParams) {
            _box_backupValues();
            opts.onHide = function() {
                delete cur.showedScreen;
                openKey(cur.translationBoxParams[0], cur.translationBoxParams[1], cur.translationBoxParams[2]);
            };
        }
        if (cur.addScreens) {
            var m = cur.addScreens.getMedias(),
                allPhotos = [];
            each(m, function(k, v) {
                if (v && v[0] == 'photo') {
                    allPhotos.push(v[1] + '/' + (cur.addScreens.phLists[v[1]] || ''));
                }
            });
            if (!opts.additional) {
                opts.additional = {};
            }
            opts.additional.draft_photos = allPhotos.join(';');
        }
        if (event) {
            cancelEvent(event);
        }
        if (window.TranslationDiscussions && nav.objLoc.tab == 'discussions') {
            TranslationDiscussions.backupDataShowPhoto();
        }
        opts.onShow = function() {
            cur.pvNoHistory = true;
        };
        showPhoto(photoRaw, listId, opts);
    }

    function openKey(key, currentInlineElement, fromTranslatorLogBox) {
        if (currentInlineElement) {
            var langId = vk.lang;
        } else {
            var langId = nav.objLoc.lang_id !== (void 0) ? nav.objLoc.lang_id : cur.langId;
        }
        if (fromTranslatorLogBox) {
            cur.translatorsLogBoxOffset = ge('box_layer_wrap').scrollTop;
        }
        var query = {
            act: 'open_key',
            key: key,
            lang_id: langId,
            section_id: intval(nav.objLoc.section),
            is_deleted: key ? intval(nav.objLoc.section == 'deleted') : 0,
        };
        if (nav.objLoc.cid) {
            query.comment_id = nav.objLoc.cid;
        }
        var box = showBox(TR_ADDRESS, query, {
            cache: 1,
            params: {
                bodyStyle: 'padding: 20px 0 0; overflow: hidden;',
                width: 550,
                hideButtons: true,
                onHide: function() {
                    if (cur.showedAttachScreenBox) {
                        return;
                    }
                    if (cur.isSuperTranslator) {
                        cur.translationBoxSelectedStatus = radioval('tr_key_settings_status');
                        if ((cur.translationBoxSelectedStatus == _KEY_SETTINGS_STATUS_TRANSLATE_CUSTOM_LANGUAGES ||
                                cur.translationBoxSelectedStatus == _KEY_SETTINGS_STATUS_EVERYONE_BUT) && cur.translationKeyLanguagesDD) {
                            cur.translationBoxKeySelectedLang = cur.translationKeyLanguagesDD.val();
                        }
                    }
                    if (!currentInlineElement && !cur.showedScreen) {
                        nav.setLoc(extend({}, nav.objLoc, {
                            key: null,
                            key_tr_id: null,
                            key_lang_id: null,
                            tab: null,
                            cid: null
                        }));
                    }
                    if (fromTranslatorLogBox) {
                        setTimeout(function() {
                            ge('box_layer_wrap').scrollTop = cur.translatorsLogBoxOffset;
                            delete cur.translatorsLogBoxOffset;
                        }, 150);
                    }
                    if (cur.onBoxKeyDownEvent) {
                        removeEvent(window, 'keydown', cur.onBoxKeyDownEvent);
                        delete cur.onBoxKeyDownEvent;
                    }
                    delete cur.keySectionsDD;
                    delete cur.keyBoxValueHeight;
                    if (!cur.showedScreen) {
                        delete cur.translationBoxParams;
                        delete cur.translationsScreensList;
                        delete ajaxCache['/' + TR_ADDRESS + '#' + ajx2q(query)];
                        delete cur.translationBoxType;
                        delete cur.translationsScreensListAll;
                        delete cur.translationBoxKeySelectedLang;
                        delete cur.translationBoxKeySelectedLangList;
                        delete cur.translationBoxSelectedStatus;
                        delete cur.translationKeyLanguagesDD;
                        if (window.TranslationDiscussions) {
                            TranslationDiscussions.destroy();
                        }
                    }
                    delete cur.translationBoxOpened;
                    delete cur.translationBoxFocusedForm;
                    delete cur.translationBoxIsInlineTranslation;
                    delete cur.translationBoxNeedHideBox;
                    delete cur.openTs;
                },
                onShow: function() {
                    cur.translationBoxParams = [key, currentInlineElement, fromTranslatorLogBox];
                    if (!cur.translationsScreensList) {
                        cur.translationsScreensList = [];
                    }
                    delete cur.showedAttachScreenBox;
                    if (cur.translationBoxNeedHideBox) {
                        curBox().hide();
                    }
                }
            },
            onDone: function(box, data) {
                cur.translationBoxIsInlineTranslation = currentInlineElement;
                cur.translationBoxOpened = true;
                var oldBoxType = domData(ge('translation_box_types'), 'boxType');
                if (cur.translationBoxType != oldBoxType) {
                    var el = ge('translation_box_type_' + cur.translationBoxType);
                    if (el) {
                        setTimeout(switchBoxType.pbind(el, cur.translationBoxType), 1);
                    }
                }

                extend(cur, data.cur);
                _box_initTextareas();

                if (!key) {
                    _box_initValuesChangeEvents();
                }
                if (cur.isSuperTranslator) {
                    if (!cur.translationBoxKeySelectedLang) {
                        cur.translationBoxKeySelectedLang = [];
                    }
                    if (!cur.translationBoxKeySelectedLang.length) {
                        cur.translationBoxKeySelectedLang = cur.translationBoxKeySelectedLangList;
                    }
                    _box_initOptionsLanguages();
                    if (typeof cur.translationBoxSelectedStatus !== 'undefined' && ge('tr_key_settings_options')) {
                        var selectedEl = ge('translation_key_status_' + key + '_' + cur.translationBoxSelectedStatus);
                        if (selectedEl) {
                            radiobtn(selectedEl, cur.translationBoxSelectedStatus, 'tr_key_settings_status');
                            TR.updateKeySettingsOptions(selectedEl);
                        }
                    }
                }
                if (!cur.translationsScreensList) {
                    cur.translationsScreensList = [];
                }
                if (!cur.translationsScreensList.length) {
                    cur.translationsScreensList = cur.translationsScreensListAll;
                }
                _box_initScreens(data.isDeleted);
                _box_initExtendedForms(data.boxType);
                _box_restoreValues();
                if (key) {
                    if (isVisible('translations_key_param_tab_history')) {
                        _box_initScrollHeight('translation_history_block');
                    }
                    var otherLangsHeight;
                    if (hasClass('translations_box_edit_key', 'tr_box_edit_key_simple')) {
                        otherLangsHeight = 120;
                    }
                    _box_initOtherLangsScroll(otherLangsHeight);
                    _box_setValueSize(0); // russian
                }

                var rusValues = geByClass('_tr_text_value', geByClass('_tr_key_edit_wrap')[0]);
                var prevValue = '',
                    to = false;
                each(rusValues, function(i) {
                    addEvent(this, 'input change', function(e) {
                        if (!cur.isSuperTranslator) {
                            return;
                        }
                        if (prevValue != val(rusValues[0])) {
                            prevValue = val(rusValues[0]);

                            var tokens = prevValue.match(/(\{[a-zA-Z_]+\})/g) || [];
                            var tokensItems = [];
                            each(tokens, function(i, token) {
                                tokensItems.push([i, token]);
                            });

                            clearTimeout(to);
                            to = setTimeout(function() {
                                _caseTokenDropdown.setData(_caseTokenDropdown._selectedItems = tokensItems);
                            }, 100);
                        }
                    });
                });

                _functionTypeDropdown = false;
                if (ge('tr_function_chooser')) {
                    _functionTypeDropdown = new InlineDropdown('tr_function_chooser', {
                        withArrow: true,
                        onSelect: _box_changeKeyFunctionType
                    });
                }

                var newKeySectionInput = ge('tr_section_chooser');
                if (newKeySectionInput) {
                    cur.keySectionsDD = new Dropdown(newKeySectionInput, data.sections, {
                        big: true,
                        selectedItems: intval(nav.objLoc.section),
                        onChange: function(id, item) {
                            var keyInputEl = ge('tr_new_key');
                            var key = val(keyInputEl).split('_').slice(1).join('_');
                            val(keyInputEl, item[3] + '_' + key);
                        }
                    });
                }

                _box_initCases();

                var newKeyInputEl = ge('tr_new_key');
                var errorEl = ge('tr_new_key_error');

                if (newKeyInputEl) {
                    var lastCheckedKey = '';

                    addEvent(newKeyInputEl, 'change input', function() {
                        var key = val(newKeyInputEl);
                        each(data.sections, function(i, section) {
                            if (key.indexOf(section[3]) === 0) {
                                cur.keySectionsDD.selectItem(section[0]);
                            }
                        });
                    });

                    addEvent(newKeyInputEl, 'change input', debounce(function() {
                        var key = trim(val(newKeyInputEl));
                        if (lastCheckedKey == key) {
                            return;
                        }
                        lastCheckedKey = key;

                        if (!key) {
                            return
                        }

                        ajax.post(TR_ADDRESS, {
                            act: 'check_new_key',
                            key: key
                        }, {
                            onDone: function(isExists) {
                                toggle(errorEl, !!isExists);
                            }
                        });
                    }, 200));
                }

                if (newKeyInputEl) {
                    elfocus(newKeyInputEl);
                } else {
                    var inputEl = geByClass1('_tr_text_value');
                    setTimeout(function() {
                        if (!inputEl) {
                            return;
                        }
                        elfocus(inputEl);
                        inputEl.select();
                    });
                }
                if (!data.isDeleted) {
                    if (key && cur.isSuperTranslator) {
                        cur.sections = data.sections;
                    }
                    addEvent(window, 'keydown', cur.onBoxKeyDownEvent = function(event) {
                        if (event.ctrlKey && event.keyCode == KEY.ENTER) {
                            saveKey(ge('translation_box_save'), data.editHash, function() {
                                boxQueue.hideAll();
                                openNextKey(key);
                            });
                        }
                    })
                }
            }
        });

        if (key && !currentInlineElement) {
            nav.setLoc(extend({}, nav.objLoc, {
                key: key
            }));
        }
    }

    function initTranslationsPage() {
        var keysLangSelectorEl = ge('tr_keys_lang_selector');
        var availableLangs = JSON.parse(domData(keysLangSelectorEl, 'langs'));
        _keysLangSelectorDropdown = new Dropdown(keysLangSelectorEl, availableLangs, {
            big: true,
            width: 190,
            placeholder: availableLangs[0][1],
            autocomplete: true,
            selectedItems: nav.objLoc.lang_id || cur.langId,
            onChange: function(langId) {
                langId = langId || 0;
                nav.change({
                    lang_id: langId
                });
            }
        });

        if (nav.objLoc.key) {
            openKey(nav.objLoc.key);
        }

        if (nav.objLoc.section == 'deleted' || isNumeric(nav.objLoc.section)) {
            var loc = clone(nav.objLoc);
            delete loc[0];
            var moreBlock = new AutoList(geByClass1('_tr_keys'), {
                onNeedRows: function(cb, offset) {
                    ajax.post(TR_ADDRESS, extend(loc, {
                        offset: offset
                    }), {
                        onDone: function(rows) {
                            rows = [].map.call(se(rows).children, function(el) {
                                return el
                            });
                            cb(rows);
                        }
                    });
                }
            });
            cur.destroy.push(function() {
                moreBlock.destroy();
            });
        }

        if (nav.objLoc.section != 'discussions') {
            ge('tr_keys_search').select();
        }
    }

    function restoreKey(btn, key, hash) {
        lockButton(btn);
        ajax.post(TR_ADDRESS, {
            act: 'restore_key',
            hash: hash,
            key: key
        }, {
            onDone: function() {
                cur.translationBoxNeedHideBox = true;
                curBox().hide();
                re('key_' + key);
            }
        })
    }

    function deleteKey(key, hash) {
        var box = showFastBox({
                title: getLang('tran_delete_box_title'),
                bodyStyle: 'padding: 20px; line-height: 160%;',
                dark: 1,
                forceNoBtn: 1
            },
            getLang('tran_delete_key_text').replace(/{key}/, key),
            getLang('box_yes'),
            function(btn) {
                lockButton(btn);
                ajax.post(TR_ADDRESS, {
                    act: 'delete_key',
                    hash: hash,
                    key: key
                }, {
                    onDone: function() {
                        re('key_' + key);
                        var keysLen = geByClass('tr_key', geByClass1('_tr_keys')).length;
                        cur.translationBoxNeedHideBox = true;
                        curBox().hide();
                        if (!keysLen) {
                            setTimeout(nav.reload, 100);
                        }
                    }
                })
            },
            getLang('box_no')
        );
    }

    function cloneKey(key, hash) {
        var content =
            '<div class="tr_clone_box">' +
            '<h4 class="subheader">' + getLang('tran_clone_box_new_key_label') + '</h4>' +
            '<input id="tr_clone_box_section_sel" />' +
            '<input class="tr_clone_box_key dark text" id="tr_clone_box_key" type="text" />' +
            '<div id="tr_clone_box_move_checkbox" class="checkbox" onclick="checkbox(this)">' + getLang('tran_move_key_checkbox') + '</div>' +
            '<div id="tr_clone_box_save_log_checkbox" class="checkbox" onclick="checkbox(this)">' + getLang('tran_save_log_key_checkbox') + '</div>' +
            '</div>';

        var box = showFastBox({
                title: getLang('tran_clone_key_box_title'),
                bodyStyle: 'padding: 20px; line-height: 160%;',
                dark: 1,
                forceNoBtn: 1,
                width: 450,
                onShow: function() {
                    var keyInputEl = ge('tr_clone_box_key');
                    cur.keySectionsDD = new Dropdown(ge('tr_clone_box_section_sel'), cur.sections, {
                        big: true,
                        autocomplete: true,
                        onChange: function(id, item) {
                            var keyInputEl = ge('tr_clone_box_key');
                            var key = val(keyInputEl).split('_').slice(1).join('_');
                            val(keyInputEl, item[3] + '_' + key);
                        }
                    });
                    addEvent(keyInputEl, 'change input', function() {
                        var key = val(keyInputEl);
                        each(cur.sections, function(i, section) {
                            if (key.indexOf(section[3]) === 0) {
                                cur.keySectionsDD.selectItem(section[0]);
                            }
                        });
                    });
                }
            },
            content,
            getLang('box_save'),
            function(btn) {
                var newKey = val('tr_clone_box_key');
                if (!trim(newKey)) {
                    return;
                }

                lockButton(btn);
                ajax.post(TR_ADDRESS, {
                    act: 'clone_key',
                    hash: hash,
                    key: key,
                    new_key: newKey,
                    move: intval(hasClass(ge('tr_clone_box_move_checkbox'), 'on')),
                    with_log: intval(hasClass(ge('tr_clone_box_save_log_checkbox'), 'on'))
                }, {
                    onDone: function() {
                        cur.translationBoxNeedHideBox = true;
                        curBox().hide();
                        setTimeout(openKey.pbind(newKey), 100);
                    }
                })
            },
            getLang('box_cancel')
        );
    }

    function searchKey(searchInputEl, searchText) {
        searchText = trim(searchText);

        var changes = {
            search: searchText ? searchText : null
        }

        if (searchText) {
            changes.section = false;
        }

        nav.change(changes);
    }

    function editTranslator(translatorId) {
        var box = showBox(TR_ADDRESS, {
            act: 'edit_translator_box',
            translator_id: translatorId,
        }, {
            params: {
                bodyStyle: 'padding: 25px; overflow: hidden;',
                width: 430
            },
            onDone: function(box, data) {
                var fromLangSelector = ge('tr_from_lang_selector');
                var fromLangs = JSON.parse(domData(fromLangSelector, 'langs'));
                var fromLangSelected = domData(fromLangSelector, 'selected');

                var toLangSelector = ge('tr_to_lang_selector');
                var toLangs = JSON.parse(domData(toLangSelector, 'langs'));
                var toLangSelected = domData(toLangSelector, 'selected');

                fromLangSelector = new Dropdown(fromLangSelector, fromLangs, {
                    big: true,
                    width: 130,
                    autocomplete: true,
                    selectedItems: fromLangSelected,
                    onChange: function(langId) {}
                });

                fromLangSelector.disable(!!translatorId);

                toLangSelector = new Dropdown(toLangSelector, toLangs, {
                    big: true,
                    width: 180,
                    autocomplete: true,
                    selectedItems: toLangSelected,
                    onChange: function(langId) {}
                });

                toLangSelector.disable(!!translatorId);

                var linkInput = geByClass1('tr_translator_link');
                if (linkInput) {
                    function checkLink(link) {
                        ajax.post(TR_ADDRESS, {
                            act: 'check_mem_link',
                            link: link
                        }, {
                            onDone: function(userId, photo, href) {
                                re(geByClass1('tr_mem_ava'));

                                if (userId) {
                                    domPN(linkInput).appendChild(se('<a href="' + href + '" class="tr_mem_ava ow_ava ow_ava_small" style="background-image: url(\'' + photo + '\')"></a>'));
                                    domData(linkInput, 'user-id', userId);
                                } else {
                                    domData(linkInput, 'user-id', null);
                                }
                            }
                        })
                    }
                    checkLink = debounce(checkLink, 200);

                    var prevVal = '';
                    addEvent(linkInput, 'change input', function() {
                        var link = val(linkInput);
                        if (link != prevVal) {
                            prevVal = link;

                            checkLink(link);
                        }
                    });
                }

                var saveButton = box.addButton(getLang('global_save'), function(btn) {
                    var query = {
                        act: 'save_translator',
                        hash: data.hash
                    };

                    if (linkInput) {
                        query.translator_id = domData(linkInput, 'user-id');
                        query.is_add = 1;
                    } else {
                        query.translator_id = translatorId;
                    }

                    if (!query.translator_id) {
                        return;
                    }

                    query.lang_id = toLangSelector.selectedItems()[0][0];
                    query.parent_lang_id = fromLangSelector.selectedItems()[0][0];

                    query.is_coordinator = intval(hasClass(geByClass1('tr_translator_is_coordinator'), 'on'));
                    var isVolunteerEl = geByClass1('tr_translator_is_volunteer');
                    if (isVolunteerEl) {
                        query.is_volunteer = intval(hasClass(isVolunteerEl, 'on'));
                    }
                    ajax.post(TR_ADDRESS, query, {
                        showProgress: lockButton.pbind(btn),
                        hideProgress: unlockButton.pbind(btn),
                        onDone: function() {
                            var box = curBox();
                            box && box.hide();

                            nav.reload();
                        }
                    });

                }, 'yes', true);

                box.addButton(getLang('global_cancel'), box.hide, 'no');

                if (translatorId) {
                    box.setControlsText('<a onclick="TR.deleteTranslator(this, ' + translatorId + ', \'' + data.hash + '\')">' + getLang('global_delete') + '</a>');
                }
            }
        });

        box.removeButtons();
    }

    function deleteTranslator(btn, translatorId, hash) {
        showProgress(domPN(btn), '', 'tr_translator_bottom_progress');
        hide(btn);

        ajax.post(TR_ADDRESS, {
            act: 'delete_translator',
            translator_id: translatorId,
            hash: hash
        }, {
            onDone: function() {
                var box = curBox();
                box && box.hide();

                nav.reload();
            }
        })
    }

    function addTranslator() {
        editTranslator();
    }

    function initTranslatorsPage(translators) {
        cur.translatorsList = translators;
        cur.translatorsIndex = new vkIndexer(translators, function(item) {
            return item.raw_search_data;
        }, function() {
            var searchStr = trim(val('translators_search'));
            if (searchStr) {
                searchTranslators(searchStr);
            }
        });

        var dateSelector = ge('tr_translators_stat_date_selector');
        var dates = JSON.parse(domData(dateSelector, 'dates'));
        var dateSelected = domData(dateSelector, 'selected');

        var langSelector = ge('tr_translators_language_selector');
        var langs = JSON.parse(domData(langSelector, 'langs'));
        var langSelected = domData(langSelector, 'selected');

        _translatorsDateSelector = new Dropdown(dateSelector, dates, {
            big: true,
            width: 200,
            selectedItems: dateSelected,
            onChange: function(date) {
                nav.objLoc.stat_date = date;
                nav.change(nav.objLoc);
            }
        });

        langSelector = new Dropdown(langSelector, langs, {
            big: true,
            width: 200,
            autocomplete: true,
            placeholder: langs[0][1],
            selectedItems: langSelected,
            onChange: function(lang) {
                if (lang === '') {
                    return;
                }
                if (lang == -1) {
                    delete nav.objLoc.lang_id;
                } else {
                    nav.objLoc.lang_id = lang;
                }

                nav.change(nav.objLoc);
            }
        });

        var translatorsSortInput = ge('tr_translators_sort_selector');
        var sorts = JSON.parse(domData(translatorsSortInput, 'sorts'));
        _translatorsSortDropdown = new Dropdown(translatorsSortInput, sorts, {
            big: true,
            width: 200,
            selectedItems: nav.objLoc.sort_by || 0,
            onChange: function(sortBy) {
                nav.objLoc.sort_by = sortBy;
                nav.change(nav.objLoc);
            }
        });
    }

    function toggleCoordinatorsOnly(toggle) {
        var onlyCoordinators = toggleClass(domFC(toggle), 'on');
        setTimeout(function() {
            nav.change({
                coordinators: onlyCoordinators ? 1 : null
            });
        });
    }

    function toggleDiscussionFilter(el, type) {
        var status = toggleClass(domFC(el), 'on'),
            filter = 'only_' + type,
            result = {};
        result[filter] = status ? 1 : null;
        setTimeout(function() {
            nav.change(result);
        });
    }

    function searchTranslators(searchStr) {
        searchStr = trim(searchStr).replace(/(:?https?\:\/\/)?(m.)?vk.com\//g, 'https://vk.com/'),
            searchStrIsLink = searchStr.match(/https:\/\/vk.com\//gi);
        var res = cur.translatorsList;

        if (searchStr) {
            res = cur.translatorsIndex.search(searchStr);
        }
        var html = '';
        each(res, function(i, obj) {
            if (!searchStrIsLink || searchStrIsLink && (obj.user_link == searchStr || obj.user_link_orig == searchStr)) {
                html += getTemplate('translator_row', obj);
            }
        });

        geByClass1('tr_translators').innerHTML = html;

        if (!nav.objLoc.q || nav.objLoc.q != searchStr) {
            nav.objLoc.q = searchStr;
            nav.setLoc(nav.objLoc);
        }
    }

    function initLanguagesPage(languages) {
        cur.languages = languages;

        cur.languagesIndex = new vkIndexer(languages, function(item) {
            return item.name_rus + ' ' + item.name_eng + ' ' + item.name_native;
        }, function() {
            var searchStr = trim(val('tr_lang_search'));
            if (searchStr) {
                searchLang(searchStr);
            }
        });
        var languagesSortInput = ge('tr_languages_sort_selector');
        var sorts = JSON.parse(domData(languagesSortInput, 'sorts'));
        _languagesSortDropdown = new Dropdown(languagesSortInput, sorts, {
            big: true,
            width: 200,
            selectedItems: nav.objLoc.sort_by || 0,
            onChange: function(sortBy) {
                nav.objLoc.sort_by = sortBy;
                nav.change(nav.objLoc);
            }
        });
    }

    function searchLang(searchStr) {
        var res = cur.languages;

        if (searchStr) {
            res = cur.languagesIndex.search(searchStr);
        }

        var html = '';
        each(res, function(i, obj) {
            html += getTemplate('lang_row', obj);
        });

        val('tr_languages_result', html);

        if (!nav.objLoc.q || nav.objLoc.q != searchStr) {
            nav.objLoc.q = searchStr;
            nav.setLoc(nav.objLoc);
        }
    }

    function openInlineKey(event, el, leftBtn) {
        if (event.type == 'click' && (!event.altKey && !leftBtn)) return;

        var cb = curBox();
        if (cb && cb.bodyNode.children[0].id == 'key-edit-dialog') {
            cb.hide();
        }

        var langKey = (el.id.substr(0, 5) == 'lang_') ? el.id.substr(5) : el.id;

        openKey(langKey, el);

        return cancelEvent(event);
    }

    var COOKIE_KEY = 'remixinline_trans';

    function toggleInline() {
        setCookie(COOKIE_KEY, isEnabledInline() ? '' : '1', 360);
        nav.reload({
            force: true
        });
    }

    function isEnabledInline() {
        return !!getCookie(COOKIE_KEY);
    }

    function menu(ev, sections, admin_href, admin_name, hash) {
        if (checkEvent(ev)) return true;

        var inline_translation = isEnabledInline() ? 'Disable inline translation' : 'Enable inline translation';
        var show_all_phrases = '',
            invitation = '';
        var section_id = (sections || '').split(',');
        section_id = section_id[0] || 0;
        if (section_id) {
            show_all_phrases = ''; //'<div class="flat_button secondary" id="translation_show_all">Show all phrases</div>';
        }

        var box = showFastBox({
            title: 'Select option',
            width: 300,
            bodyStyle: 'padding: 0px',
            dark: 1,
            flatButtons: true,
            onClean: function() {
                cleanElems('translation_toggle', 'translation_to_page', 'translation_show_all');
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
        ge('translation_toggle').onclick = toggleInline;
        ge('translation_to_page').onclick = function() {};
        if (section_id) {
            //ge('translation_show_all').onclick = translation.showAll.pbind(sections, box);
        }
        return false;
    }

    function showTranslatorTranslations(translatorId) {
        var date = _translatorsDateSelector.selectedItems()[0][0];

        var box = showBox(TR_ADDRESS, {
            act: 'show_translator_log',
            translator_id: translatorId,
            date: date,
        }, {
            params: {
                width: 550,
                bodyStyle: 'padding: 20px 0 0; overflow: hidden;'
            }
        })
    }

    function recalcCounters(btn) {
        lockButton(btn)
        ajax.post('translation', {
            act: 'recalc_counters',
            lang_id: cur.langId
        }, {
            onDone: function() {
                unlockButton(btn)
            }
        })
    }

    function _getLanguageData() {
        var data = {},
            err = false;
        each(['native', 'russian', 'english', 'abbr', 'iso', 'version'], function(i, id) {
            var el = ge('tr_add_lang__' + id),
                v = trim(val(el));
            if (v == '') {
                notaBene(el);
                err = true;
                return false;
            }
            data[id] = v;
        });
        if (err) {
            return false;
        }
        return data;
    }

    function addLanguageBox() {
        cur.addLangBox = new MessageBox({
            title: getLang('tran_add_lang_title')
        });
        cur.addLangBox.content(getTemplate('add_lang_box'));
        cur.addLangBox.addButton(getLang('tran_add_lang_title'), addLanguage, 'ok', false, 'tr_add_lang__save');
        cur.addLangBox.show();

        cur.addLangBoxCountryDD = new Dropdown(ge('tr_add_lang__country'), cur.addLangBoxCountries, {
            big: 1,
            width: 195,
            autocomplete: true,
            multiselect: false,
            placeholder: getLang('tran_add_lang_no_country')
        });
    }

    function addLanguage() {
        var p = {
                act: 'a_add_language',
                country_id: cur.addLangBoxCountryDD.val()
            },
            btn = ge('tr_add_lang__save'),
            data = _getLanguageData();
        if (typeof data != 'object' && data == false) {
            return;
        }
        p = extend(p, data);
        ajax.post(TR_ADDRESS, p, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(html, js) {
                cur.addLangBox.hide();
                var l = ge('tr_languages_list');
                l.parentNode.replaceChild(se(html), l);
                eval(js);
                showDoneBox(getLang('tran_add_lang_added'));
            }
        });
    }

    function editLanguageBox(el, langId) {
        showBox(TR_ADDRESS, {
            act: 'edit_language_box',
            lang_id: langId
        });
    }

    function saveLanguage(langId, hash) {
        var status = cur.editLangBoxDD.val(),
            params = {
                act: 'a_save_language',
                lang_id: langId,
                hash: hash,
                status: status,
                country_id: cur.editLangBoxCountryDD.val()
            },
            data = _getLanguageData();
        if (typeof data != 'object' && data == false) {
            return;
        }
        params = extend(params, data);
        ajax.post(TR_ADDRESS, params, {
            progress: curBox().progress,
            onDone: function(html, js) {
                curBox().hide();
                var l = ge('tr_languages_list');
                l.parentNode.replaceChild(se(html), l);
                eval(js);
                showDoneBox(getLang('tran_add_lang_added'));
            }
        });
    }

    function switchTab(el, tabName) {
        uiTabs.switchTab(el);
        each(geByClass('_tr_key_param_tab', 'translations_edit_key_params'), function(k, v) {
            hide(v);
        });
        nav.setLoc(extend({}, nav.objLoc, {
            tab: tabName
        }));
        show('translations_key_param_tab_' + tabName);
        if (tabName == 'history') {
            _box_initScrollHeight('translation_history_block');
        }
        var isDiscussionsTab = (tabName == 'discussions');
        if (isDiscussionsTab) {
            if (window.TranslationDiscussions) {
                TranslationDiscussions.init();
            }
        }
        toggleClass(curBox().bodyNode, 'tr_box_discussions_form_opened', isDiscussionsTab);
        toggleClass(ge('translation_box_controls_main'), 'unshown', isDiscussionsTab);
    }

    function switchLangTab(el, langId) {
        uiTabs.switchTab(el);
        each(geByClass('_tr_lang_value', 'translations_lang_values'), function(k, v) {
            hide(v);
        });
        nav.setLoc(extend({}, nav.objLoc, {
            key_lang_id: langId
        }));
        show('translations_lang_value_' + langId);
        if (langId == -1) {
            var otherLangsHeight;
            if (hasClass('translations_box_edit_key', 'tr_box_edit_key_simple')) {
                otherLangsHeight = 120;
            }
            _box_initOtherLangsScroll(otherLangsHeight);
        } else {
            setTimeout(function() {
                _box_setValueSize(langId);
            }, 100);
        }
    }

    function switchTranslationTab(el, langId) {
        uiTabs.switchTab(el);
        each(geByClass('_tr_key_param_tab', 'translations_key_forms'), function(k, v) {
            hide(v);
        });
        nav.setLoc(extend({}, nav.objLoc, {
            key_tr_id: langId
        }));
        show('translations_key_param_tab_translation_' + langId);
    }

    function initSettingsPage() {
        var languages = [];
        each(cur.languagesList, function(k, v) {
            var title = v[1];
            if (title) {
                languages.push([v[0], replaceEntities(title), v[2]]);
            }
        });
        cur.translatorLanguages = new Dropdown(ge('translations_settings_other_languages'), languages, {
            multiselect: true,
            autocomplete: true,
            selectedItems: cur.selectedLangs,
            indexkeys: [1, 2],
            placeholder: getLang('tran_other_languages_placeholder'),
            dark: 1,
            width: 200
        });
    }

    function saveTransatorSettings(el, hash) {
        ajax.post(TR_ADDRESS, {
            act: 'a_save_settings',
            hash: hash,
            languages: cur.translatorLanguages.val()
        }, {
            showProgress: lockButton.pbind(el),
            hideProgress: unlockButton.pbind(el),
            onDone: function(msg) {
                val('translations_settings_msg', msg);
                show('translations_settings_msg');
            }
        });
    }

    function showDescriptionTooltip(el, type) {
        switch (type) {
            case 'export':
                var message = getLang('tran_export_js_tooltip_msg');
                break;
            default:
                return false;
        }
        showTooltip(el, {
            text: message,
            slide: 15,
            dir: 'top',
            shift: [24, 10, 10],
            className: 'tr_box_extra_param_tooltip'
        });
    }

    function insertSpecSymbol(el, ev, destroyTT) {
        cancelEvent(ev);
        if (!cur.translationBoxFocusedForm) {
            return false;
        }
        var specCode = replaceEntities(val(el)),
            form = cur.translationBoxFocusedForm,
            start = form.selectionStart,
            end = form.selectionEnd,
            text = val(form),
            before = text.substring(0, start),
            after = text.substring(end, text.length);

        val(form, before + specCode + after);
        form.selectionStart = form.selectionEnd = start + specCode.length;
        form.focus();
        if (destroyTT) {
            window.tooltips && window.tooltips.destroy(el);
        }
        if (form.timeout) {
            clearTimeout(form.timeout);
            _formKeyDownCheck(form);
        }
    }

    function removeFocusedForm(el) {
        if (el.timeout) {
            clearTimeout(el.timeout);
            delete el.timeout;
        }
        el.timeout = setTimeout(function() {
            delete cur.translationBoxFocusedForm;
        }, 200);
    }

    function isMainSupportedLanguage(langId) {
        return intval(langId) === 0 || intval(langId) == 3;
    }

    function _formUpdateCounter(el) {
        var len = val(el).length,
            counterEl = geByClass1('_tr_counter', domPN(el));
        if (counterEl) {
            val(counterEl, len);
        }
    }

    function _formSpecialCodeNotFound(el, code) {
        var parentEl = domPN(el),
            iconEl = geByClass1('_tr_missing_key_icon', parentEl);
        if (!code) {
            removeClass(parentEl, 'tr_key_edit_missing_special_code');
            val(iconEl, '');
            domData(iconEl, 'title', '');
            removeClass('translation_box_save', 'button_disabled');
        } else {
            addClass(parentEl, 'tr_key_edit_missing_special_code');
            var title = getLang('tran_special_code_not_found').replace('{variable}', code);
            domData(iconEl, 'title', title);
            val(iconEl, code);
            addClass('translation_box_save', 'button_disabled');
        }
    }

    function _formKeyDownCheck(el) {
        if (el.timeout) {
            clearTimeout(el.timeout);
            delete el.timeout;
        }
        _formUpdateCounter(el);
        el.timeout = setTimeout(function() {
            delete el.timeout;
            var config = JSON.parse(domData(el, 'config'));
            if (!config || isMainSupportedLanguage(config.langId)) {
                return;
            }
            if (config.specialCodes) {
                var matches = val(el).match(_SPECIAL_CODES_REGEX);
                if (!matches) {
                    matches = [];
                }
                matches = matches.map(trim);
                var errors = false;
                each(config.specialCodes.map(trim), function(k, v) {
                    var found = matches.indexOf(v);
                    if (found === -1) {
                        errors = true;
                        return _formSpecialCodeNotFound(el, v);
                    }
                });
                if (!errors) {
                    _formSpecialCodeNotFound(el);
                }
            }
        }, 100);
    }

    function setFocusedForm(el) {
        if (!el.eventsInited) {
            addEvent(el, 'change input', _formKeyDownCheck.pbind(el));
            el.eventsInited = true;
        }
        cur.translationBoxFocusedForm = el;
    }

    function updateKeySettingsOptions(el) {
        var keyStatus = domData(el, 'status'),
            isShowed = isVisible('translations_settings_languages_wrap');
        if (keyStatus == _KEY_SETTINGS_STATUS_TRANSLATE_CUSTOM_LANGUAGES || keyStatus == _KEY_SETTINGS_STATUS_EVERYONE_BUT) {
            if (!isShowed) {
                show('translations_settings_languages_wrap');
            }
        } else if (isShowed) {
            hide('translations_settings_languages_wrap');
        }
    }

    function _box_initOptionsLanguages() {
        var languages = [],
            boxType = domData(ge('translation_box_types'), 'boxType');
        each(cur.languagesList, function(k, v) {
            languages.push([v[0], replaceEntities(v[1]), v[2]]);
        });
        cur.translationKeyLanguagesDD = new Dropdown(ge('translations_settings_languages_list'), languages, {
            multiselect: true,
            autocomplete: true,
            selectedItems: cur.translationBoxKeySelectedLang,
            indexkeys: [1, 2],
            placeholder: getLang('tran_other_languages_placeholder'),
            dark: 1,
            width: (boxType == 1 ? 500 : 900)
        });
        var keyStatus = radioval('tr_key_settings_status');
        if (keyStatus === _KEY_SETTINGS_STATUS_TRANSLATE_CUSTOM_LANGUAGES || keyStatus === _KEY_SETTINGS_STATUS_EVERYONE_BUT) {
            show('translations_settings_languages_wrap');
        }
    }

    function updateStatsPeriod(el) {
        var period = domData(el, 'period'),
            loc = clone(nav.objLoc);
        radiobtn(el, period, 'statsPeriod');
        loc['period'] = period;
        nav.go(loc);
    }

    exports.TR = {
        showTranslatorTranslations: showTranslatorTranslations,
        openKey: openKey,
        newKey: newKey,
        hasCaseChanged: _box_hasCaseChanged,
        initTranslationsPage: initTranslationsPage,
        initTranslatorsPage: initTranslatorsPage,
        searchKey: searchKey,
        deleteKey: deleteKey,
        cloneKey: cloneKey,
        editTranslator: editTranslator,
        deleteTranslator: deleteTranslator,
        addTranslator: addTranslator,
        toggleCoordinatorsOnly: toggleCoordinatorsOnly,
        searchTranslators: debounce(searchTranslators, 50),
        initLanguagesPage: initLanguagesPage,
        searchLang: debounce(searchLang, 50),
        t: openInlineKey,
        menu: menu,
        recalcCounters: recalcCounters,
        addLanguageBox: addLanguageBox,
        editLanguageBox: editLanguageBox,
        saveLanguage: saveLanguage,
        switchLangTab: switchLangTab,
        switchTab: switchTab,
        switchTranslationTab: switchTranslationTab,
        initSettingsPage: initSettingsPage,
        saveTransatorSettings: saveTransatorSettings,
        switchBoxType: switchBoxType,
        showScreen: showScreen,
        chooseScreen: chooseScreen,
        chooseUplaodedScreen: chooseUplaodedScreen,
        showDescriptionTooltip: showDescriptionTooltip,
        insertSpecSymbol: insertSpecSymbol,
        removeFocusedForm: removeFocusedForm,
        setFocusedForm: setFocusedForm,
        updateKeySettingsOptions: updateKeySettingsOptions,
        restoreKey: restoreKey,
        saveKey: saveKey,
        toggleDiscussionFilter: toggleDiscussionFilter,
        updateStatsPeriod: updateStatsPeriod,
    };

})(window);

try {
    stManager.done('translation.js');
} catch (e) {}