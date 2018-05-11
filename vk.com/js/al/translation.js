! function(exports) {
    function _box_initAutosizeTexts() {
        var e;
        hasClass("translations_box_edit_key", "tr_box_edit_key_simple") && (e = 450), each(geByClass("_tr_text_value"), function() {
            this.autosize ? (this.autosize.options.maxHeight = e, this.autosize.update()) : autosizeSetup(this, {
                minHeight: 50,
                maxHeight: e
            })
        })
    }

    function _box_initValuesChangeEvents() {
        var e = geByClass("_tr_text_value", geByClass("_tr_key_edit_wrap")[0]),
            t = geByClass("_tr_text_value", geByClass("_tr_key_edit_wrap")[1]),
            a = !1;
        each(e, function(e) {
            addEvent(this, "input change", function(n) {
                var o = val(this);
                a || val(t[e], o)
            })
        }), each(t, function() {
            addEvent(this, "input change", function() {
                a = !0
            }), addEvent(this, "focus", function() {
                a || this.select()
            })
        })
    }

    function _box_changeKeyFunctionType(e) {
        ajax.post(TR_ADDRESS, {
            act: "function_type",
            function_type: e
        }, {
            onDone: function(e, t) {
                var a = curBox().bodyNode,
                    n = geByClass("_tr_key_edit_wrap", a),
                    o = [],
                    s = [];
                each(geByClass("_tr_text_value", n[0]), function() {
                    o.push(val(this))
                }), each(geByClass("_tr_text_value", n[1]), function() {
                    s.push(val(this))
                }), e = se(e), t = se(t), each(geByClass("_tr_text_value", e), function(e) {
                    val(this, e < o.length ? o[e] : "")
                }), each(geByClass("_tr_text_value", t), function(e) {
                    val(this, e < s.length ? s[e] : "")
                }), domReplaceEl(n[0], e), n[1] && domReplaceEl(n[1], t), _box_initAutosizeTexts()
            }
        })
    }

    function saveKey(e, t, a, n) {
        var o = {
            act: "save_key",
            hash: t
        };
        if (o.lang_id = intval((void 0 !== nav.objLoc.lang_id ? nav.objLoc.lang_id : cur.langId) || 0), o.key = val("tr_new_key") || val("tr_key_input"), _functionTypeDropdown && "object" == typeof _functionTypeDropdown && (o.function_type = _functionTypeDropdown.getSelected()[0]), o.lang_ids = [], each(geByClass("_tr_key_edit_wrap"), function() {
                var e = domData(this, "lang-id"),
                    t = [];
                each(geByClass("_tr_text_value", this), function() {
                    t.push(val(this))
                }), t = t.length > 1 ? "@@" + t.join("@") : t[0], o["Value_" + e] = t, o.lang_ids.push(e)
            }), o.lang_ids = o.lang_ids.join(","), cur.isSuperTranslator) {
            if (o.description = val("tr_description_edit"), o.description_english = val("tr_description_edit_english"), o.extended_wiki = intval(hasClass("tr_extra_wiki", "on")), o.disable_inline = intval(hasClass("tr_extra_disable_inline", "on")), o["export"] = intval(hasClass("tr_extra_export_to_js", "on")), o.has_case = intval(hasClass("tr_extra_case", "on")), o.mark_untranslated = intval(hasClass("tr_extra_mark_as_untranslated", "on")), o.screens = _box_getScreens(), o.has_case) {
                o["case"] = _caseDropdown.selectedItems()[0][0];
                var s = _caseTokenDropdown.selectedItems();
                s.length && (o.case_token = _caseTokenDropdown.selectedItems()[0][1])
            }
            if (o.key_status = radioval("tr_key_settings_status"), o.key_status === _KEY_SETTINGS_STATUS_TRANSLATE_CUSTOM_LANGUAGES && (o.selected_languages = cur.translationKeyLanguagesDD.val(), !o.selected_languages)) return notaBene(cur.translationKeyLanguagesDD.input)
        }
        ajax.post(TR_ADDRESS, o, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e, t, s, r) {
                if (s) {
                    each(s[0], function(e, t) {
                        var a = ge("tr_section_counter_" + e);
                        a && (t[0] ? a.innerHTML = "+" + t[0] : a.innerHTML = "")
                    });
                    var i = ge("tr_section_counter_total");
                    s[1] ? i.innerHTML = "+" + s[1] : i.innerHTML = ""
                }
                if (r && each(r, function(e, t) {
                        toggle("translation_" + o.key + "_" + e, t)
                    }), e && o.key) {
                    var l = document.querySelector(".tr_key[data-key=" + o.key + "]");
                    l && (removeClass(l, "tr_untranslated"), geByClass1("_tr_key_inner", l).innerHTML = e), n && (n.innerHTML = t, n.className = "translated")
                } else nav.reload();
                boxQueue.hideAll(), a && a(e), o.mark_untranslated && nav.reload()
            }
        })
    }

    function _box_hasCaseChanged(e) {
        if (toggle(geByClass1("_tr_case_controls"), e), e) {
            var t = geByClass("_tr_text_value", geByClass("_tr_key_edit_wrap")[0]);
            t.length && triggerEvent(t[0], "change")
        }
    }

    function newKey() {
        openKey("")
    }

    function openNextKey(e) {
        var t = document.querySelector(".tr_key[data-key=" + e + "]");
        t = t ? domNS(t) : !1, t && (e = domData(t, "key"), openKey(e))
    }

    function _box_showFormsTabs(e) {
        var t = ge("translations_key_forms");
        t && t.offsetHeight >= 300 && 1 != e && (show("translations_key_form_tabs"), hide("translations_key_param_tab_translation_3"), each(geByClass("subheader", t), function(e, t) {
            hide(t)
        }))
    }

    function _box_hideFormsTabs() {
        var e = ge("translations_key_forms");
        e && (hide("translations_key_form_tabs"), show("translations_key_param_tab_translation_0", "translations_key_param_tab_translation_3"), each(geByClass("subheader", e), function(e, t) {
            show(t)
        }))
    }

    function _box_initExtendedForms(e) {
        if (nav.objLoc.tab) {
            var t = nav.objLoc.tab,
                a = ge("translation_key_param_" + t);
            switchTab(domFC(a), t)
        }
        if (nav.objLoc.key_lang_id) {
            var n = nav.objLoc.key_lang_id,
                o = ge("translation_key_value_" + n);
            switchLangTab(domFC(o), n)
        }
        setTimeout(function() {
            if (_box_showFormsTabs(e), nav.objLoc.key_tr_id && isVisible("translations_key_form_tabs")) {
                var t = nav.objLoc.key_tr_id,
                    a = ge("translations_key_translation_" + t);
                switchTranslationTab(domFC(a), t)
            }
        }, 10);
        var s = 940;
        1 == e && (s = 540), curBox() && (curBox().setOptions({
            title: !1,
            width: s,
            bodyStyle: "padding: 0;overflow: visible;"
        }), addClass(curBox().bodyNode, "tr_box_edit_key_extended_body"))
    }

    function switchBoxType(e, t) {
        if (!hasClass(e, "active")) {
            if (1 == t) {
                addClass("translations_box_edit_key", "tr_box_edit_key_simple"), _box_hideFormsTabs();
                var a = 540,
                    n = 238,
                    o = 120,
                    s = 500
            } else if (2 == t) {
                removeClass("translations_box_edit_key", "tr_box_edit_key_simple");
                var a = 940,
                    n = 438,
                    s = 900;
                _box_showFormsTabs(t)
            }
            cur.keySectionsDD && cur.keySectionsDD.setOptions({
                width: n
            }), cur.translationKeyLanguagesDD && cur.translationKeyLanguagesDD.setOptions({
                width: s
            }), each(geByClass("_tr_translation_box_icon", "translation_box_types"), function(e, t) {
                removeClass(t, "active")
            }), addClass(e, "active"), curBox().setOptions({
                width: a
            }), window.tooltips && tooltips.hideAll(), _box_initOtherLangsScroll(o), _box_initAutosizeTexts(), cur.translationBoxType = t, ajax.post(TR_ADDRESS, {
                act: "a_change_box_type",
                box_type: t
            })
        }
    }

    function _box_initScrollHeight(e, t) {
        var a = ge(e);
        if (a) {
            var n = geByClass1("_tr_history_rows", a),
                o = geByClass1("_tr_history_resizer", a);
            if (getSize(n)[1] >= n.scrollHeight) hide(o), setStyle(n, "height", "inherit");
            else {
                show(o);
                var s;
                addEvent(o, "mousedown", function(e) {
                    var t = getXY(n);
                    return s && removeEvent(window, "mousemove", s), addEvent(window, "mousemove", s = function(e) {
                        setStyle(n, {
                            height: Math.min(n.scrollHeight, Math.max(50, e.pageY - t[1]))
                        })
                    }), addEvent(window, "mouseup", function(e) {
                        removeEvent(window, "mousemove", s)
                    }), cancelEvent(e)
                })
            }
            t && setStyle(n, {
                height: t
            })
        }
    }

    function _box_initCases() {
        _caseDropdown = _caseTokenDropdown = !1;
        var e = ge("tr_case");
        if (e) {
            var t = domData(e, "selected");
            _caseDropdown = new Dropdown(e, JSON.parse(domData(e, "cases")), {
                big: !0,
                width: 200,
                selectedItems: t,
                onChange: function(e, t) {}
            })
        }
        var a = ge("tr_case_token");
        if (a) {
            var t = domData(a, "selected");
            _caseTokenDropdown = new Dropdown(a, [], {
                big: !0,
                width: 200,
                selectedItems: t,
                onChange: function(e, t) {}
            })
        }
    }

    function _box_initOtherLangsScroll(e) {
        if (ge("translations_lang_value_-1") && isVisible("translations_lang_value_-1")) {
            var t = ge("translations_other_langs_block"),
                a = geByClass("_tr_history_row_value", t);
            each(a, function(e, a) {
                var n = parseInt(getStyle(a, "height"));
                n > 300 && (addClass(a, "tr_row_value_text_short"), addEvent(a, "click", function(e) {
                    cancelEvent(e), toggleClass(this, "active"), hasClass("translations_box_edit_key", "tr_box_edit_key_simple") ? otherLangsHeight = 120 : otherLangsHeight = parseInt(getStyle("translations_key_forms", "height")), _box_initScrollHeight(t, otherLangsHeight)
                }))
            }), setTimeout(function() {
                e || (e = parseInt(getStyle("translations_key_forms", "height"))), _box_initScrollHeight(t, e)
            }, 10)
        }
    }

    function _box_setValueSize(e) {
        var t = geByClass1("_tr_value_rows_wrap", "translations_lang_value_" + e),
            a = parseInt(getStyle(t, "height"));
        cur.keyBoxValueHeight && cur.keyBoxValueHeight > a && setStyle(t, {
            height: cur.keyBoxValueHeight
        }), cur.keyBoxValueHeight = a
    }

    function _box_chooseScreenHandler() {
        cur.showedAttachScreenBox = !0, showBox(TR_ADDRESS, {
            act: "choose_photo",
            section: cur.selectedSection
        }, {
            params: {
                onShow: function() {
                    addClass(curBox().titleWrap, "translations_screen_attach_box_title"), addClass(curBox().bodyNode, "translations_screen_attach_box")
                },
                onHide: function() {
                    delete cur.showedAttachScreenBox
                }
            }
        })
    }

    function _box_initScreens(e) {
        if (cur.isSuperTranslator && !e) {
            var t = new MediaSelector("tr_add_lnk", "tr_preview", [
                ["photo", getLang("tran_select_screenshot")]
            ], {
                mediaHandlers: {
                    photo: _box_chooseScreenHandler
                }
            });
            cur.addScreens = t, setTimeout(function() {
                if (cur.translationsScreensList && cur.translationsScreensList.length > 0 && (each(cur.translationsScreensList, function(e, a) {
                        a && t.chooseMedia(a[0], a[1], a[2], "", !0)
                    }), hide("translations_box_no_screenshots")), cur.addScreens.lnkId) {
                    cur.addMedia[cur.addScreens.lnkId].showPhoto = showScreen;
                    var e = cur.addMedia[cur.addScreens.lnkId].unchooseMedia;
                    cur.addMedia[cur.addScreens.lnkId].unchooseMedia = function(t) {
                        cur.showedAttachScreenBox = !0;
                        var a = this,
                            n = function() {
                                var n = a.chosenMedias[t];
                                e(t);
                                var o = !1;
                                cur.translationsScreensList = cur.translationsScreensList.map(function(e) {
                                    return e && e[1] == n[1] ? !1 : e
                                }), a.chosenMedias.map(function(e) {
                                    return 0 != e && (o = !0), e
                                }), 0 == o && show("translations_box_no_screenshots"), curBox().hide()
                            };
                        return showFastBox(getLang("global_warning"), getLang("tran_sure_want_delete_screen"), getLang("global_delete"), n, getLang("global_cancel"))
                    }
                }
            }, 10)
        }
    }

    function chooseUplaodedScreen(e, t, a, n) {
        t.uploadNum = a, cur.chooseMedia("photo", e, extend(t, {
            upload_ind: a + "_" + n
        }), null, !0), cur.translationsScreensList.push(["photo", e, t]), hide("translations_box_no_screenshots")
    }

    function _box_getScreens() {
        var e = [];
        if (cur.isSuperTranslator && cur.addScreens) {
            var t = cur.addScreens.getMedias();
            t.length && each(t, function(t, a) {
                "photo" == a[0] && e.push(a[1])
            })
        }
        return e
    }

    function chooseScreen(e, t, a) {
        hide("translations_box_no_screenshots"), cur.chooseMedia("photo", e, t, ""), cur.translationsScreensList.push(["photo", e, t]), cancelEvent(a)
    }

    function _box_backupValues() {
        var e = geByClass("_tr_text_value", "translations_box_edit_key"),
            t = [];
        each(e, function(e, a) {
            t[e] = val(a)
        }), cur.translationsBoxBackupedValues = t;
        var a = ge("translations_extra_params");
        if (a) {
            var n = [],
                o = geByClass("checkbox", a);
            each(o, function(e, t) {
                n[e] = hasClass(t, "on") ? 1 : 0
            }), cur.translationsBoxBackupedExtra = n
        }
    }

    function _box_restoreValues() {
        if (cur.translationsBoxBackupedValues && cur.translationsBoxBackupedValues.length) {
            var e = geByClass("_tr_text_value", "translations_box_edit_key");
            each(e, function(e, t) {
                var a = "";
                cur.translationsBoxBackupedValues[e] && (a = cur.translationsBoxBackupedValues[e]), val(t, a)
            }), delete cur.translationsBoxBackupedValues
        }
        if (cur.translationsBoxBackupedExtra && cur.translationsBoxBackupedExtra.length) {
            var t = ge("translations_extra_params");
            if (t) {
                var a = geByClass("checkbox", t);
                each(a, function(e, t) {
                    var a = cur.translationsBoxBackupedExtra[e],
                        n = attr(t, "id");
                    a ? addClass(t, "on") : removeClass(t, "on"), "tr_extra_export_to_js" == n ? TR.toggleExportWarning(a) : "tr_extra_case" == n && TR.hasCaseChanged(a)
                }), delete cur.translationsBoxBackupedExtra
            }
        }
    }

    function showScreen(e, t, a) {
        if (cur.showedScreen = 1, cur.translationBoxParams && (_box_backupValues(), a.onHide = function() {
                delete cur.showedScreen, openKey(cur.translationBoxParams[0], cur.translationBoxParams[1], cur.translationBoxParams[2])
            }), cur.addScreens) {
            var n = cur.addScreens.getMedias(),
                o = [];
            each(n, function(e, t) {
                t && "photo" == t[0] && o.push(t[1] + "/" + (cur.addScreens.phLists[t[1]] || ""))
            }), a.additional || (a.additional = {}), a.additional.draft_photos = o.join(";")
        }
        showPhoto(e, t, a)
    }

    function openKey(e, t, a) {
        if (t) var n = vk.lang;
        else var n = void 0 !== nav.objLoc.lang_id ? nav.objLoc.lang_id : cur.langId;
        a && (cur.translatorsLogBoxOffset = ge("box_layer_wrap").scrollTop);
        var o = {
            act: "open_key",
            key: e,
            lang_id: n,
            section_id: intval(nav.objLoc.section),
            is_deleted: e ? intval("deleted" == nav.objLoc.section) : 0
        };
        showBox(TR_ADDRESS, o, {
            cache: 1,
            params: {
                bodyStyle: "padding: 20px 0 0; overflow: hidden;",
                width: 550,
                onHide: function() {
                    cur.showedAttachScreenBox || (t || cur.showedScreen || nav.setLoc(extend({}, nav.objLoc, {
                        key: null,
                        key_tr_id: null,
                        key_lang_id: null,
                        tab: null
                    })), a && setTimeout(function() {
                        ge("box_layer_wrap").scrollTop = cur.translatorsLogBoxOffset, delete cur.translatorsLogBoxOffset
                    }, 150), cur.onBoxKeyDownEvent && removeEvent(window, "keydown", cur.onBoxKeyDownEvent), delete cur.keySectionsDD, delete cur.keyBoxValueHeight, cur.showedScreen || (delete cur.translationBoxParams, delete cur.translationsScreensList, delete ajaxCache["/" + TR_ADDRESS + "#" + ajx2q(o)], delete cur.translationBoxType, delete cur.translationsScreensListAll), delete cur.translationBoxOpened, delete cur.translationBoxFocusedForm, delete cur.translationBoxKeySelectedLang)
                },
                onShow: function() {
                    cur.translationBoxParams = [e, t, a], cur.translationsScreensList || (cur.translationsScreensList = []), delete cur.showedAttachScreenBox
                }
            },
            onDone: function(a, n) {
                a.removeButtons(), cur.translationBoxOpened = !0;
                var o = domData(ge("translation_box_types"), "boxType");
                if (cur.translationBoxType != o) {
                    var s = ge("translation_box_type_" + cur.translationBoxType);
                    s && setTimeout(switchBoxType.pbind(s, cur.translationBoxType), 1)
                }
                if (extend(cur, n.cur), _box_initAutosizeTexts(), e || _box_initValuesChangeEvents(), cur.isSuperTranslator && _box_initOptionsLanguages(), cur.translationsScreensList || (cur.translationsScreensList = []), cur.translationsScreensList.length || (cur.translationsScreensList = cur.translationsScreensListAll), _box_initScreens(n.isDeleted), _box_initExtendedForms(n.boxType), _box_restoreValues(), e) {
                    isVisible("translations_key_param_tab_history") && _box_initScrollHeight("translation_history_block");
                    var r;
                    hasClass("translations_box_edit_key", "tr_box_edit_key_simple") && (r = 120), _box_initOtherLangsScroll(r), _box_setValueSize(0)
                }
                var i = geByClass("_tr_text_value", geByClass("_tr_key_edit_wrap")[0]),
                    l = "",
                    c = !1;
                each(i, function(e) {
                    addEvent(this, "input change", function(e) {
                        if (l != val(i[0])) {
                            l = val(i[0]);
                            var t = l.match(/(\{[a-zA-Z_]+\})/g) || [],
                                a = [];
                            each(t, function(e, t) {
                                a.push([e, t])
                            }), clearTimeout(c), c = setTimeout(function() {
                                _caseTokenDropdown.setData(_caseTokenDropdown._selectedItems = a)
                            }, 100)
                        }
                    })
                }), _functionTypeDropdown = !1, ge("tr_function_chooser") && (_functionTypeDropdown = new InlineDropdown("tr_function_chooser", {
                    withArrow: !0,
                    onSelect: _box_changeKeyFunctionType
                }));
                var _ = ge("tr_section_chooser");
                _ && (cur.keySectionsDD = new Dropdown(_, n.sections, {
                    big: !0,
                    selectedItems: intval(nav.objLoc.section),
                    onChange: function(e, t) {
                        var a = ge("tr_new_key"),
                            n = val(a).split("_").slice(1).join("_");
                        val(a, t[3] + "_" + n)
                    }
                })), _box_initCases();
                var d = ge("tr_new_key"),
                    u = ge("tr_new_key_error");
                if (d) {
                    var g = "";
                    addEvent(d, "change input", function() {
                        var e = val(d);
                        each(n.sections, function(t, a) {
                            0 === e.indexOf(a[3]) && cur.keySectionsDD.selectItem(a[0])
                        })
                    }), addEvent(d, "change input", debounce(function() {
                        var e = trim(val(d));
                        g != e && (g = e, e && ajax.post(TR_ADDRESS, {
                            act: "check_new_key",
                            key: e
                        }, {
                            onDone: function(e) {
                                toggle(u, !!e)
                            }
                        }))
                    }, 200))
                }
                if (d) elfocus(d);
                else {
                    var h = geByClass1("_tr_text_value");
                    setTimeout(function() {
                        h && (elfocus(h), h.select())
                    })
                }
                if (n.isDeleted) a.addButton(getLang("box_restore"), function(t) {
                    restoreKey(t, e, n.editHash)
                }, "yes");
                else {
                    var v = a.addButton(e ? getLang("global_save") : getLang("tran_create_key"), function(e) {
                        saveKey(e, n.editHash, !1, t)
                    }, "yes", !0);
                    if (e && cur.isSuperTranslator) {
                        cur.sections = n.sections;
                        var p = "<a onclick=\"TR.deleteKey('" + e + "', '" + n.editHash + "')\">" + getLang("tran_delete_key") + '</a><span class="divider">|</span><a onclick="TR.cloneKey(\'' + e + "', '" + n.editHash + "')\">" + getLang("tran_copy_key") + "</a>";
                        a.setControlsText(p)
                    }
                    addEvent(window, "keydown", cur.onBoxKeyDownEvent = function(a) {
                        a.ctrlKey && a.keyCode == KEY.ENTER && saveKey(v, n.editHash, function() {
                            boxQueue.hideAll(), openNextKey(e)
                        }, t)
                    })
                }
                a.addButton(getLang("global_cancel"), a.hide, "no")
            }
        });
        e && !t && nav.setLoc(extend({}, nav.objLoc, {
            key: e
        }))
    }

    function initTranslationsPage() {
        var e = ge("tr_keys_lang_selector"),
            t = JSON.parse(domData(e, "langs"));
        _keysLangSelectorDropdown = new Dropdown(e, t, {
            big: !0,
            width: 190,
            placeholder: t[0][1],
            autocomplete: !0,
            selectedItems: nav.objLoc.lang_id || cur.langId,
            onChange: function(e) {
                e = e || 0, nav.change({
                    lang_id: e
                })
            }
        }), nav.objLoc.key && openKey(nav.objLoc.key), "deleted" == nav.objLoc.section && new AutoList(geByClass1("_tr_keys"), {
            onNeedRows: function(e, t) {
                ajax.post(TR_ADDRESS, {
                    act: "get_deleted",
                    offset: t
                }, {
                    onDone: function(t) {
                        t = [].map.call(se(t).children, function(e) {
                            return e
                        }), e(t)
                    }
                })
            }
        }), ge("tr_keys_search").select()
    }

    function restoreKey(e, t, a) {
        lockButton(e), ajax.post(TR_ADDRESS, {
            act: "restore_key",
            hash: a,
            key: t
        }, {
            onDone: function() {
                boxQueue.hideAll(), re("key_" + t)
            }
        })
    }

    function deleteKey(e, t) {
        showFastBox({
            title: getLang("tran_delete_box_title"),
            bodyStyle: "padding: 20px; line-height: 160%;",
            dark: 1,
            forceNoBtn: 1
        }, getLang("tran_delete_key_text").replace(/{key}/, e), getLang("box_yes"), function(a) {
            lockButton(a), ajax.post(TR_ADDRESS, {
                act: "delete_key",
                hash: t,
                key: e
            }, {
                onDone: function() {
                    boxQueue.hideAll(), re("key_" + e)
                }
            })
        }, getLang("box_no"))
    }

    function cloneKey(e, t) {
        var a = '<div class="tr_clone_box"><h4 class="subheader">' + getLang("tran_clone_box_new_key_label") + '</h4><input id="tr_clone_box_section_sel" /><input class="tr_clone_box_key dark text" id="tr_clone_box_key" type="text" /><div id="tr_clone_box_move_checkbox" class="checkbox" onclick="checkbox(this)">' + getLang("tran_move_key_checkbox") + '</div><div id="tr_clone_box_save_log_checkbox" class="checkbox" onclick="checkbox(this)">' + getLang("tran_save_log_key_checkbox") + "</div></div>";
        showFastBox({
            title: getLang("tran_clone_key_box_title"),
            bodyStyle: "padding: 20px; line-height: 160%;",
            dark: 1,
            forceNoBtn: 1,
            width: 450,
            onShow: function() {
                new Dropdown(ge("tr_clone_box_section_sel"), cur.sections, {
                    big: !0,
                    autocomplete: !0,
                    onChange: function(e, t) {
                        var a = ge("tr_clone_box_key"),
                            n = val(a).split("_").slice(1).join("_");
                        val(a, t[3] + "_" + n)
                    }
                })
            }
        }, a, getLang("box_save"), function(a) {
            var n = val("tr_clone_box_key");
            trim(n) && (lockButton(a), ajax.post(TR_ADDRESS, {
                act: "clone_key",
                hash: t,
                key: e,
                new_key: n,
                move: intval(hasClass(ge("tr_clone_box_move_checkbox"), "on")),
                with_log: intval(hasClass(ge("tr_clone_box_save_log_checkbox"), "on"))
            }, {
                onDone: function() {
                    boxQueue.hideAll(), openKey(n)
                }
            }))
        }, getLang("box_cancel"))
    }

    function searchKey(e, t) {
        t = trim(t);
        var a = {
            search: t ? t : null
        };
        t && (a.section = !1), nav.change(a)
    }

    function editTranslator(e) {
        var t = showBox(TR_ADDRESS, {
            act: "edit_translator_box",
            translator_id: e
        }, {
            params: {
                bodyStyle: "padding: 25px; overflow: hidden;",
                width: 430
            },
            onDone: function(t, a) {
                function n(e) {
                    ajax.post(TR_ADDRESS, {
                        act: "check_mem_link",
                        link: e
                    }, {
                        onDone: function(e, t, a) {
                            re(geByClass1("tr_mem_ava")), e ? (domPN(_).appendChild(se('<a href="' + a + '" class="tr_mem_ava ow_ava ow_ava_small" style="background-image: url(\'' + t + "')\"></a>")), domData(_, "user-id", e)) : domData(_, "user-id", null)
                        }
                    })
                }
                var o = ge("tr_from_lang_selector"),
                    s = JSON.parse(domData(o, "langs")),
                    r = domData(o, "selected"),
                    i = ge("tr_to_lang_selector"),
                    l = JSON.parse(domData(i, "langs")),
                    c = domData(i, "selected");
                o = new Dropdown(o, s, {
                    big: !0,
                    width: 130,
                    autocomplete: !0,
                    selectedItems: r,
                    onChange: function(e) {}
                }), o.disable(!!e), i = new Dropdown(i, l, {
                    big: !0,
                    width: 180,
                    autocomplete: !0,
                    selectedItems: c,
                    onChange: function(e) {}
                }), i.disable(!!e);
                var _ = geByClass1("tr_translator_link");
                if (_) {
                    n = debounce(n, 200);
                    var d = "";
                    addEvent(_, "change input", function() {
                        var e = val(_);
                        e != d && (d = e, n(e))
                    })
                }
                t.addButton(getLang("global_save"), function(t) {
                    var n = {
                        act: "save_translator",
                        hash: a.hash
                    };
                    _ ? (n.translator_id = domData(_, "user-id"), n.is_add = 1) : n.translator_id = e, n.translator_id && (n.lang_id = i.selectedItems()[0][0], n.parent_lang_id = o.selectedItems()[0][0], n.is_coordinator = intval(hasClass(geByClass1("tr_translator_is_coordinator"), "on")), ajax.post(TR_ADDRESS, n, {
                        showProgress: lockButton.pbind(t),
                        hideProgress: unlockButton.pbind(t),
                        onDone: function() {
                            var e = curBox();
                            e && e.hide(), nav.reload()
                        }
                    }))
                }, "yes", !0);
                t.addButton(getLang("global_cancel"), t.hide, "no"), e && t.setControlsText('<a onclick="TR.deleteTranslator(this, ' + e + ", '" + a.hash + "')\">" + getLang("global_delete") + "</a>")
            }
        });
        t.removeButtons()
    }

    function deleteTranslator(e, t, a) {
        showProgress(domPN(e), "", "tr_translator_bottom_progress"), hide(e), ajax.post(TR_ADDRESS, {
            act: "delete_translator",
            translator_id: t,
            hash: a
        }, {
            onDone: function() {
                var e = curBox();
                e && e.hide(), nav.reload()
            }
        })
    }

    function addTranslator() {
        editTranslator()
    }

    function initTranslatorsPage(e) {
        cur.translatorsList = e, cur.translatorsIndex = new vkIndexer(e, function(e) {
            return e.raw_search_data
        }, function() {
            var e = trim(val("translators_search"));
            e && searchTranslators(e)
        });
        var t = ge("tr_translators_stat_date_selector"),
            a = JSON.parse(domData(t, "dates")),
            n = domData(t, "selected"),
            o = ge("tr_translators_language_selector"),
            s = JSON.parse(domData(o, "langs")),
            r = domData(o, "selected");
        _translatorsDateSelector = new Dropdown(t, a, {
            big: !0,
            width: 200,
            selectedItems: n,
            onChange: function(e) {
                nav.objLoc.stat_date = e, nav.change(nav.objLoc)
            }
        }), o = new Dropdown(o, s, {
            big: !0,
            width: 200,
            autocomplete: !0,
            placeholder: s[0][1],
            selectedItems: r,
            onChange: function(e) {
                "" !== e && (-1 == e ? delete nav.objLoc.lang_id : nav.objLoc.lang_id = e, nav.change(nav.objLoc))
            }
        });
        var i = ge("tr_translators_sort_selector"),
            l = JSON.parse(domData(i, "sorts"));
        _translatorsSortDropdown = new Dropdown(i, l, {
            big: !0,
            width: 200,
            selectedItems: nav.objLoc.sort_by || 0,
            onChange: function(e) {
                nav.objLoc.sort_by = e, nav.change(nav.objLoc)
            }
        })
    }

    function toggleCoordinatorsOnly(e) {
        var t = toggleClass(domFC(e), "on");
        setTimeout(function() {
            nav.change({
                coordinators: t ? 1 : null
            })
        })
    }

    function searchTranslators(e) {
        e = trim(e).replace(/(:?https?\:\/\/)?(m.)?vk.com\//g, "https://vk.com/"), searchStrIsLink = e.match(/https:\/\/vk.com\//gi);
        var t = cur.translatorsList;
        e && (t = cur.translatorsIndex.search(e));
        var a = "";
        each(t, function(t, n) {
            (!searchStrIsLink || searchStrIsLink && (n.user_link == e || n.user_link_orig == e)) && (a += getTemplate("translator_row", n))
        }), geByClass1("tr_translators").innerHTML = a, nav.objLoc.q && nav.objLoc.q == e || (nav.objLoc.q = e, nav.setLoc(nav.objLoc))
    }

    function initLanguagesPage(e) {
        cur.languages = e, cur.languagesIndex = new vkIndexer(e, function(e) {
            return e.name_rus + " " + e.name_eng + " " + e.name_native
        }, function() {
            var e = trim(val("tr_lang_search"));
            e && searchLang(e)
        });
        var t = ge("tr_languages_sort_selector"),
            a = JSON.parse(domData(t, "sorts"));
        _languagesSortDropdown = new Dropdown(t, a, {
            big: !0,
            width: 200,
            selectedItems: nav.objLoc.sort_by || 0,
            onChange: function(e) {
                nav.objLoc.sort_by = e, nav.change(nav.objLoc)
            }
        })
    }

    function searchLang(e) {
        var t = cur.languages;
        e && (t = cur.languagesIndex.search(e));
        var a = "";
        each(t, function(e, t) {
            a += getTemplate("lang_row", t)
        }), val("tr_languages_result", a), nav.objLoc.q && nav.objLoc.q == e || (nav.objLoc.q = e, nav.setLoc(nav.objLoc))
    }

    function openInlineKey(e, t, a) {
        if ("click" != e.type || e.altKey || a) {
            var n = curBox();
            n && "key-edit-dialog" == n.bodyNode.children[0].id && n.hide();
            var o = "lang_" == t.id.substr(0, 5) ? t.id.substr(5) : t.id;
            return openKey(o, t), cancelEvent(e)
        }
    }

    function toggleInline() {
        setCookie(COOKIE_KEY, isEnabledInline() ? "" : "1", 360), nav.reload({
            force: !0
        })
    }

    function isEnabledInline() {
        return !!getCookie(COOKIE_KEY)
    }

    function menu(e, t, a, n, o) {
        if (checkEvent(e)) return !0;
        var s = isEnabledInline() ? "Disable inline translation" : "Enable inline translation",
            r = "",
            i = "",
            l = (t || "").split(",");
        l = l[0] || 0, l && (r = "");
        showFastBox({
            title: "Select option",
            width: 300,
            bodyStyle: "padding: 0px",
            dark: 1,
            flatButtons: !0,
            onClean: function() {
                cleanElems("translation_toggle", "translation_to_page", "translation_show_all")
            }
        }, i + '      <div class="translation_box">        <div class="button_blue flat_button" id="translation_toggle">' + s + "</div>        " + r + '        <a class="button_link" href="/translation">          <div class="flat_button secondary" id="translation_to_page">Go to translation page</div>        </a>        <a id="show_untranslated" class="button_link" href="/translation?section_id=untranslated">          <div class="flat_button secondary" id="">Show untranslated phrases</div>        </a>        <div class="help">          <a href="/club16000">Help</a>         </div>      </div>');
        return ge("translation_toggle").onclick = toggleInline, ge("translation_to_page").onclick = function() {}, !1
    }

    function showTranslatorTranslations(e) {
        var t = _translatorsDateSelector.selectedItems()[0][0];
        showBox(TR_ADDRESS, {
            act: "show_translator_log",
            translator_id: e,
            date: t
        }, {
            params: {
                width: 550,
                bodyStyle: "padding: 20px 0 0; overflow: hidden;"
            }
        })
    }

    function toggleExportWarning(e) {
        toggle("tr_export_warning", e)
    }

    function recalcCounters(e) {
        lockButton(e), ajax.post("translation", {
            act: "recalc_counters",
            lang_id: cur.langId
        }, {
            onDone: function() {
                unlockButton(e)
            }
        })
    }

    function _getLanguageData() {
        var e = {},
            t = !1;
        return each(["native", "russian", "english", "abbr", "iso", "version"], function(a, n) {
            var o = ge("tr_add_lang__" + n),
                s = trim(val(o));
            return "" == s ? (notaBene(o), t = !0, !1) : void(e[n] = s)
        }), t ? !1 : e
    }

    function addLanguageBox() {
        cur.addLangBox = new MessageBox({
            title: getLang("tran_add_lang_title")
        }), cur.addLangBox.content(getTemplate("add_lang_box")), cur.addLangBox.addButton(getLang("tran_add_lang_title"), addLanguage, "ok", !1, "tr_add_lang__save"), cur.addLangBox.show(), cur.addLangBoxCountryDD = new Dropdown(ge("tr_add_lang__country"), cur.addLangBoxCountries, {
            big: 1,
            width: 195,
            autocomplete: !0,
            multiselect: !1,
            placeholder: getLang("tran_add_lang_no_country")
        })
    }

    function addLanguage() {
        var p = {
                act: "a_add_language",
                country_id: cur.addLangBoxCountryDD.val()
            },
            btn = ge("tr_add_lang__save"),
            data = _getLanguageData();
        ("object" == typeof data || 0 != data) && (p = extend(p, data), ajax.post(TR_ADDRESS, p, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(html, js) {
                cur.addLangBox.hide();
                var l = ge("tr_languages_list");
                l.parentNode.replaceChild(se(html), l), eval(js), showDoneBox(getLang("tran_add_lang_added"))
            }
        }))
    }

    function editLanguageBox(e, t) {
        showBox(TR_ADDRESS, {
            act: "edit_language_box",
            lang_id: t
        })
    }

    function saveLanguage(langId, hash) {
        var status = cur.editLangBoxDD.val(),
            params = {
                act: "a_save_language",
                lang_id: langId,
                hash: hash,
                status: status,
                country_id: cur.editLangBoxCountryDD.val()
            },
            data = _getLanguageData();
        ("object" == typeof data || 0 != data) && (params = extend(params, data), ajax.post(TR_ADDRESS, params, {
            progress: curBox().progress,
            onDone: function(html, js) {
                curBox().hide();
                var l = ge("tr_languages_list");
                l.parentNode.replaceChild(se(html), l), eval(js), showDoneBox(getLang("tran_add_lang_added"))
            }
        }))
    }

    function switchTab(e, t) {
        uiTabs.switchTab(e), each(geByClass("_tr_key_param_tab", "translations_edit_key_params"), function(e, t) {
            hide(t)
        }), nav.setLoc(extend({}, nav.objLoc, {
            tab: t
        })), show("translations_key_param_tab_" + t), "history" == t && _box_initScrollHeight("translation_history_block")
    }

    function switchLangTab(e, t) {
        if (uiTabs.switchTab(e), each(geByClass("_tr_lang_value", "translations_lang_values"), function(e, t) {
                hide(t)
            }), nav.setLoc(extend({}, nav.objLoc, {
                key_lang_id: t
            })), show("translations_lang_value_" + t), -1 == t) {
            var a;
            hasClass("translations_box_edit_key", "tr_box_edit_key_simple") && (a = 120), _box_initOtherLangsScroll(a)
        } else setTimeout(function() {
            _box_setValueSize(t)
        }, 100)
    }

    function switchTranslationTab(e, t) {
        uiTabs.switchTab(e), each(geByClass("_tr_key_param_tab", "translations_key_forms"), function(e, t) {
            hide(t)
        }), nav.setLoc(extend({}, nav.objLoc, {
            key_tr_id: t
        })), show("translations_key_param_tab_translation_" + t)
    }

    function initSettingsPage() {
        var e = [];
        each(cur.languagesList, function(t, a) {
            e.push([a[0], replaceEntities(a[1]), a[2]])
        }), cur.translatorLanguages = new Dropdown(ge("translations_settings_other_languages"), e, {
            multiselect: !0,
            autocomplete: !0,
            selectedItems: cur.selectedLangs,
            indexkeys: [1, 2],
            placeholder: getLang("tran_other_languages_placeholder"),
            dark: 1,
            width: 200
        })
    }

    function saveTransatorSettings(e, t) {
        ajax.post(TR_ADDRESS, {
            act: "a_save_settings",
            hash: t,
            languages: cur.translatorLanguages.val()
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                val("translations_settings_msg", e), show("translations_settings_msg")
            }
        })
    }

    function showDescriptionTooltip(e, t) {
        switch (t) {
            case "export":
                var a = getLang("tran_export_js_tooltip_msg");
                break;
            default:
                return !1
        }
        showTooltip(e, {
            text: a,
            slide: 15,
            dir: "top",
            shift: [24, 10, 10],
            className: "tr_box_extra_param_tooltip"
        })
    }

    function insertSpecSymbol(e, t) {
        if (cancelEvent(t), !cur.translationBoxFocusedForm) return !1;
        var a = replaceEntities(val(e)),
            n = cur.translationBoxFocusedForm,
            o = n.selectionStart,
            s = n.selectionEnd,
            r = val(n),
            i = r.substring(0, o),
            l = r.substring(s, r.length);
        val(n, i + a + l), n.selectionStart = n.selectionEnd = o + a.length, n.focus(), n.timeout && clearTimeout(n.timeout)
    }

    function removeFocusedForm(e) {
        e.timeout && (clearTimeout(e.timeout), delete e.timeout), e.timeout = setTimeout(function() {
            delete cur.translationBoxFocusedForm
        }, 200)
    }

    function setFocusedForm(e) {
        cur.translationBoxFocusedForm = e
    }

    function updateKeySettingsOptions(e) {
        var t = domData(e, "status"),
            a = isVisible("translations_settings_languages_wrap");
        t == _KEY_SETTINGS_STATUS_TRANSLATE_CUSTOM_LANGUAGES ? a || show("translations_settings_languages_wrap") : a && hide("translations_settings_languages_wrap")
    }

    function _box_initOptionsLanguages() {
        var e = [],
            t = domData(ge("translation_box_types"), "boxType");
        each(cur.languagesList, function(t, a) {
            e.push([a[0], replaceEntities(a[1]), a[2]])
        }), cur.translationKeyLanguagesDD = new Dropdown(ge("translations_settings_languages_list"), e, {
            multiselect: !0,
            autocomplete: !0,
            selectedItems: cur.translationBoxKeySelectedLang,
            indexkeys: [1, 2],
            placeholder: getLang("tran_other_languages_placeholder"),
            dark: 1,
            width: 1 == t ? 500 : 900
        }), radioval("tr_key_settings_status") === _KEY_SETTINGS_STATUS_TRANSLATE_CUSTOM_LANGUAGES && show("translations_settings_languages_wrap")
    }
    var TR_ADDRESS = "translation",
        _caseDropdown, _caseTokenDropdown, _functionTypeDropdown, _keysLangSelectorDropdown, _translatorsDateSelector, _languagesSortDropdown, _translatorsSortDropdown, _KEY_SETTINGS_STATUS_TRANSLATE_TO_ALL = 0,
        _KEY_SETTINGS_STATUS_DONT_TRANSLATE = 1,
        _KEY_SETTINGS_STATUS_TRANSLATE_CUSTOM_LANGUAGES = 2,
        _KEY_SETTINGS_STATUS_TRANSLATE_ONLY_CIS = 3,
        _KEY_SETTINGS_STATUS_ONLY_MAIN_LANGUAGES = 4,
        COOKIE_KEY = "remixinline_trans";
    exports.TR = {
        toggleExportWarning: toggleExportWarning,
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
        updateKeySettingsOptions: updateKeySettingsOptions
    }
}(window);
try {
    stManager.done("translation.js")
} catch (e) {}