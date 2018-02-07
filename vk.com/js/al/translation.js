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
            a = geByClass("_tr_text_value", geByClass("_tr_key_edit_wrap")[1]),
            t = !1;
        each(e, function(e) {
            addEvent(this, "input change", function(n) {
                var o = val(this);
                t || val(a[e], o)
            })
        }), each(a, function() {
            addEvent(this, "input change", function() {
                t = !0
            }), addEvent(this, "focus", function() {
                t || this.select()
            })
        })
    }

    function _box_changeKeyFunctionType(e) {
        ajax.post(TR_ADDRESS, {
            act: "function_type",
            function_type: e
        }, {
            onDone: function(e, a) {
                var t = curBox().bodyNode,
                    n = geByClass("_tr_key_edit_wrap", t),
                    o = [],
                    s = [];
                each(geByClass("_tr_text_value", n[0]), function() {
                    o.push(val(this))
                }), each(geByClass("_tr_text_value", n[1]), function() {
                    s.push(val(this))
                }), e = se(e), a = se(a), each(geByClass("_tr_text_value", e), function(e) {
                    val(this, e < o.length ? o[e] : "")
                }), each(geByClass("_tr_text_value", a), function(e) {
                    val(this, e < s.length ? s[e] : "")
                }), domReplaceEl(n[0], e), n[1] && domReplaceEl(n[1], a), _box_initAutosizeTexts()
            }
        })
    }

    function saveKey(e, a, t, n) {
        var o = {
            act: "save_key",
            hash: a
        };
        if (o.lang_id = intval((void 0 !== nav.objLoc.lang_id ? nav.objLoc.lang_id : cur.langId) || 0), o.key = val("tr_new_key") || val("tr_key_input"), _functionTypeDropdown && "object" == typeof _functionTypeDropdown && (o.function_type = _functionTypeDropdown.getSelected()[0]), o.lang_ids = [], each(geByClass("_tr_key_edit_wrap"), function() {
                var e = domData(this, "lang-id"),
                    a = [];
                each(geByClass("_tr_text_value", this), function() {
                    a.push(val(this))
                }), a = a.length > 1 ? "@@" + a.join("@") : a[0], o["Value_" + e] = a, o.lang_ids.push(e)
            }), o.lang_ids = o.lang_ids.join(","), cur.isSuperTranslator && (o.description = val("tr_description_edit"), o.description_english = val("tr_description_edit_english"), o.extended_wiki = intval(hasClass("tr_extra_wiki", "on")), o.disable_inline = intval(hasClass("tr_extra_disable_inline", "on")), o["export"] = intval(hasClass("tr_extra_export_to_js", "on")), o.has_case = intval(hasClass("tr_extra_case", "on")), o.mark_untranslated = intval(hasClass("tr_extra_mark_as_untranslated", "on")), o.screens = _box_getScreens(), o.has_case)) {
            o["case"] = _caseDropdown.selectedItems()[0][0];
            var s = _caseTokenDropdown.selectedItems();
            s.length && (o.case_token = _caseTokenDropdown.selectedItems()[0][1])
        }
        ajax.post(TR_ADDRESS, o, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e, a, s) {
                if (s) {
                    each(s[0], function(e, a) {
                        var t = ge("tr_section_counter_" + e);
                        t && (a[0] ? t.innerHTML = "+" + a[0] : t.innerHTML = "")
                    });
                    var r = ge("tr_section_counter_total");
                    s[1] ? r.innerHTML = "+" + s[1] : r.innerHTML = ""
                }
                if (e && o.key) {
                    var i = document.querySelector(".tr_key[data-key=" + o.key + "]");
                    i && (removeClass(i, "tr_untranslated"), geByClass1("_tr_key_inner", i).innerHTML = e), n && (n.innerHTML = a, n.className = "translated")
                } else nav.reload();
                boxQueue.hideAll(), t && t(e), o.mark_untranslated && nav.reload()
            }
        })
    }

    function _box_hasCaseChanged(e) {
        if (toggle(geByClass1("_tr_case_controls"), e), e) {
            var a = geByClass("_tr_text_value", geByClass("_tr_key_edit_wrap")[0]);
            a.length && triggerEvent(a[0], "change")
        }
    }

    function newKey() {
        openKey("")
    }

    function openNextKey(e) {
        var a = document.querySelector(".tr_key[data-key=" + e + "]");
        a = a ? domNS(a) : !1, a && (e = domData(a, "key"), openKey(e))
    }

    function _box_showFormsTabs(e) {
        var a = ge("translations_key_forms");
        a && a.offsetHeight >= 300 && 1 != e && (show("translations_key_form_tabs"), hide("translations_key_param_tab_translation_3"), each(geByClass("subheader", a), function(e, a) {
            hide(a)
        }))
    }

    function _box_hideFormsTabs() {
        var e = ge("translations_key_forms");
        e && (hide("translations_key_form_tabs"), show("translations_key_param_tab_translation_0", "translations_key_param_tab_translation_3"), each(geByClass("subheader", e), function(e, a) {
            show(a)
        }))
    }

    function _box_initExtendedForms(e) {
        if (nav.objLoc.tab) {
            var a = nav.objLoc.tab,
                t = ge("translation_key_param_" + a);
            switchTab(domFC(t), a)
        }
        if (nav.objLoc.key_lang_id) {
            var n = nav.objLoc.key_lang_id,
                o = ge("translation_key_value_" + n);
            switchLangTab(domFC(o), n)
        }
        setTimeout(function() {
            if (_box_showFormsTabs(e), nav.objLoc.key_tr_id && isVisible("translations_key_form_tabs")) {
                var a = nav.objLoc.key_tr_id,
                    t = ge("translations_key_translation_" + a);
                switchTranslationTab(domFC(t), a)
            }
        }, 10);
        var s = 940;
        1 == e && (s = 540), curBox() && (curBox().setOptions({
            title: !1,
            width: s,
            bodyStyle: "padding: 0;overflow: visible;"
        }), addClass(curBox().bodyNode, "tr_box_edit_key_extended_body"))
    }

    function switchBoxType(e, a) {
        if (!hasClass(e, "active")) {
            if (1 == a) {
                addClass("translations_box_edit_key", "tr_box_edit_key_simple"), _box_hideFormsTabs();
                var t = 540,
                    n = 238,
                    o = 120
            } else if (2 == a) {
                removeClass("translations_box_edit_key", "tr_box_edit_key_simple");
                var t = 940,
                    n = 438;
                _box_showFormsTabs(a)
            }
            cur.keySectionsDD && cur.keySectionsDD.setOptions({
                width: n
            }), each(geByClass("_tr_translation_box_icon", "translation_box_types"), function(e, a) {
                removeClass(a, "active")
            }), addClass(e, "active"), curBox().setOptions({
                width: t
            }), window.tooltips && tooltips.hideAll(), _box_initOtherLangsScroll(o), _box_initAutosizeTexts(), cur.translationBoxType = a, ajax.post(TR_ADDRESS, {
                act: "a_change_box_type",
                box_type: a
            })
        }
    }

    function _box_initScrollHeight(e, a) {
        var t = ge(e);
        if (t) {
            var n = geByClass1("_tr_history_rows", t),
                o = geByClass1("_tr_history_resizer", t);
            if (getSize(n)[1] >= n.scrollHeight) hide(o), setStyle(n, "height", "inherit");
            else {
                show(o);
                var s;
                addEvent(o, "mousedown", function(e) {
                    var a = getXY(n);
                    return s && removeEvent(window, "mousemove", s), addEvent(window, "mousemove", s = function(e) {
                        setStyle(n, {
                            height: Math.min(n.scrollHeight, Math.max(50, e.pageY - a[1]))
                        })
                    }), addEvent(window, "mouseup", function(e) {
                        removeEvent(window, "mousemove", s)
                    }), cancelEvent(e)
                })
            }
            a && setStyle(n, {
                height: a
            })
        }
    }

    function _box_initCases() {
        _caseDropdown = _caseTokenDropdown = !1;
        var e = ge("tr_case");
        if (e) {
            var a = domData(e, "selected");
            _caseDropdown = new Dropdown(e, JSON.parse(domData(e, "cases")), {
                big: !0,
                width: 200,
                selectedItems: a,
                onChange: function(e, a) {}
            })
        }
        var t = ge("tr_case_token");
        if (t) {
            var a = domData(t, "selected");
            _caseTokenDropdown = new Dropdown(t, [], {
                big: !0,
                width: 200,
                selectedItems: a,
                onChange: function(e, a) {}
            })
        }
    }

    function _box_initOtherLangsScroll(e) {
        if (ge("translations_lang_value_-1") && isVisible("translations_lang_value_-1")) {
            var a = ge("translations_other_langs_block"),
                t = geByClass("_tr_history_row_value", a);
            each(t, function(e, t) {
                var n = parseInt(getStyle(t, "height"));
                n > 300 && (addClass(t, "tr_row_value_text_short"), addEvent(t, "click", function(e) {
                    cancelEvent(e), toggleClass(this, "active"), hasClass("translations_box_edit_key", "tr_box_edit_key_simple") ? otherLangsHeight = 120 : otherLangsHeight = parseInt(getStyle("translations_key_forms", "height")), _box_initScrollHeight(a, otherLangsHeight)
                }))
            }), setTimeout(function() {
                e || (e = parseInt(getStyle("translations_key_forms", "height"))), _box_initScrollHeight(a, e)
            }, 10)
        }
    }

    function _box_setValueSize(e) {
        var a = geByClass1("_tr_value_rows_wrap", "translations_lang_value_" + e),
            t = parseInt(getStyle(a, "height"));
        cur.keyBoxValueHeight && cur.keyBoxValueHeight > t && setStyle(a, {
            height: cur.keyBoxValueHeight
        }), cur.keyBoxValueHeight = t
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
            var a = new MediaSelector("tr_add_lnk", "tr_preview", [
                ["photo", getLang("tran_select_screenshot")]
            ], {
                mediaHandlers: {
                    photo: _box_chooseScreenHandler
                }
            });
            cur.addScreens = a, setTimeout(function() {
                if (cur.translationsScreensList && cur.translationsScreensList.length > 0 && (each(cur.translationsScreensList, function(e, t) {
                        a.chooseMedia(t[0], t[1], t[2], "", !0)
                    }), hide("translations_box_no_screenshots")), cur.addScreens.lnkId) {
                    cur.addMedia[cur.addScreens.lnkId].showPhoto = showScreen;
                    var e = cur.addMedia[cur.addScreens.lnkId].unchooseMedia;
                    cur.addMedia[cur.addScreens.lnkId].unchooseMedia = function(a) {
                        var t = this.chosenMedias[a];
                        e(a);
                        var n = !1;
                        cur.translationsScreensList.map(function(e) {
                            return e == t[1] ? !1 : void 0
                        }), this.chosenMedias.map(function(e) {
                            return 0 != e && (n = !0), e
                        }), 0 == n && show("translations_box_no_screenshots")
                    }
                }
            }, 10)
        }
    }

    function chooseUplaodedScreen(e, a, t, n) {
        a.uploadNum = t, console.log(arguments), cur.chooseMedia("photo", e, extend(a, {
            upload_ind: t + "_" + n
        }), null, !0), cur.translationsScreensList.push(["photo", e, a]), hide("translations_box_no_screenshots")
    }

    function _box_getScreens() {
        var e = [];
        if (cur.isSuperTranslator && cur.addScreens) {
            var a = cur.addScreens.getMedias();
            a.length && each(a, function(a, t) {
                "photo" == t[0] && e.push(t[1])
            })
        }
        return e
    }

    function chooseScreen(e, a, t) {
        hide("translations_box_no_screenshots"), cur.chooseMedia("photo", e, a, ""), cur.translationsScreensList.push(["photo", e, a]), cancelEvent(t)
    }

    function _box_backupValues() {
        var e = geByClass("_tr_text_value", "translations_box_edit_key"),
            a = [];
        each(e, function(e, t) {
            a[e] = val(t)
        }), cur.translationsBoxBackupedValues = a;
        var t = ge("translations_extra_params");
        if (t) {
            var n = [],
                o = geByClass("checkbox", t);
            each(o, function(e, a) {
                n[e] = hasClass(a, "on") ? 1 : 0
            }), cur.translationsBoxBackupedExtra = n
        }
    }

    function _box_restoreValues() {
        if (cur.translationsBoxBackupedValues && cur.translationsBoxBackupedValues.length) {
            var e = geByClass("_tr_text_value", "translations_box_edit_key");
            each(e, function(e, a) {
                var t = "";
                cur.translationsBoxBackupedValues[e] && (t = cur.translationsBoxBackupedValues[e]), val(a, t)
            }), delete cur.translationsBoxBackupedValues
        }
        if (cur.translationsBoxBackupedExtra && cur.translationsBoxBackupedExtra.length) {
            var a = ge("translations_extra_params");
            if (a) {
                var t = geByClass("checkbox", a);
                each(t, function(e, a) {
                    var t = cur.translationsBoxBackupedExtra[e],
                        n = attr(a, "id");
                    t ? addClass(a, "on") : removeClass(a, "on"), "tr_extra_export_to_js" == n ? TR.toggleExportWarning(t) : "tr_extra_case" == n && TR.hasCaseChanged(t)
                }), delete cur.translationsBoxBackupedExtra
            }
        }
    }

    function showScreen(e, a, t) {
        cur.showedScreen = 1, cur.translationBoxParams && (_box_backupValues(), t.onHide = function() {
            delete cur.showedScreen, openKey(cur.translationBoxParams[0], cur.translationBoxParams[1], cur.translationBoxParams[2])
        }), showPhoto(e, a, t)
    }

    function openKey(e, a, t) {
        if (a) var n = vk.lang;
        else var n = void 0 !== nav.objLoc.lang_id ? nav.objLoc.lang_id : cur.langId;
        t && (cur.translatorsLogBoxOffset = ge("box_layer_wrap").scrollTop);
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
                    cur.showedAttachScreenBox || (a || cur.showedScreen || nav.setLoc(extend({}, nav.objLoc, {
                        key: null,
                        key_tr_id: null,
                        key_lang_id: null,
                        tab: null
                    })), t && setTimeout(function() {
                        ge("box_layer_wrap").scrollTop = cur.translatorsLogBoxOffset, delete cur.translatorsLogBoxOffset
                    }, 150), cur.onBoxKeyDownEvent && removeEvent(window, "keydown", cur.onBoxKeyDownEvent), delete cur.keySectionsDD, delete cur.keyBoxValueHeight, cur.showedScreen || (delete cur.translationBoxParams, delete cur.translationsScreensList, delete ajaxCache["/" + TR_ADDRESS + "#" + ajx2q(o)], delete cur.translationBoxType), delete cur.translationBoxOpened)
                },
                onShow: function() {
                    cur.translationBoxParams = [e, a, t], cur.translationsScreensList || (cur.translationsScreensList = []), delete cur.showedAttachScreenBox
                }
            },
            onDone: function(t, n) {
                t.removeButtons(), cur.translationBoxOpened = !0;
                var o = domData(ge("translation_box_types"), "boxType");
                if (cur.translationBoxType != o) {
                    var s = ge("translation_box_type_" + cur.translationBoxType);
                    s && setTimeout(switchBoxType.pbind(s, cur.translationBoxType), 1)
                }
                if (extend(cur, n.cur), _box_initAutosizeTexts(), e || _box_initValuesChangeEvents(), _box_initScreens(n.isDeleted), _box_initExtendedForms(n.boxType), _box_restoreValues(), e) {
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
                            var a = l.match(/(\{[a-zA-Z_]+\})/g) || [],
                                t = [];
                            each(a, function(e, a) {
                                t.push([e, a])
                            }), clearTimeout(c), c = setTimeout(function() {
                                _caseTokenDropdown.setData(_caseTokenDropdown._selectedItems = t)
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
                    onChange: function(e, a) {
                        var t = ge("tr_new_key"),
                            n = val(t).split("_").slice(1).join("_");
                        val(t, a[3] + "_" + n)
                    }
                })), _box_initCases();
                var d = ge("tr_new_key"),
                    u = ge("tr_new_key_error");
                if (d) {
                    var g = "";
                    addEvent(d, "change input", function() {
                        var e = val(d);
                        each(n.sections, function(a, t) {
                            0 === e.indexOf(t[3]) && cur.keySectionsDD.selectItem(t[0])
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
                if (n.isDeleted) t.addButton(getLang("box_restore"), function(a) {
                    restoreKey(a, e, n.editHash)
                }, "yes");
                else {
                    var v = t.addButton(e ? getLang("global_save") : getLang("tran_create_key"), function(e) {
                        saveKey(e, n.editHash, !1, a)
                    }, "yes", !0);
                    if (e && cur.isSuperTranslator) {
                        cur.sections = n.sections;
                        var p = "<a onclick=\"TR.deleteKey('" + e + "', '" + n.editHash + "')\">" + getLang("tran_delete_key") + '</a><span class="divider">|</span><a onclick="TR.cloneKey(\'' + e + "', '" + n.editHash + "')\">" + getLang("tran_copy_key") + "</a>";
                        t.setControlsText(p)
                    }
                    addEvent(window, "keydown", cur.onBoxKeyDownEvent = function(t) {
                        t.ctrlKey && t.keyCode == KEY.ENTER && saveKey(v, n.editHash, function() {
                            boxQueue.hideAll(), openNextKey(e)
                        }, a)
                    })
                }
                t.addButton(getLang("global_cancel"), t.hide, "no")
            }
        });
        e && !a && nav.setLoc(extend({}, nav.objLoc, {
            key: e
        }))
    }

    function initTranslationsPage() {
        var e = ge("tr_keys_lang_selector"),
            a = JSON.parse(domData(e, "langs"));
        _keysLangSelectorDropdown = new Dropdown(e, a, {
            big: !0,
            width: 190,
            placeholder: a[0][1],
            autocomplete: !0,
            selectedItems: nav.objLoc.lang_id || cur.langId,
            onChange: function(e) {
                e = e || 0, nav.change({
                    lang_id: e
                })
            }
        }), nav.objLoc.key && openKey(nav.objLoc.key), "deleted" == nav.objLoc.section && new AutoList(geByClass1("_tr_keys"), {
            onNeedRows: function(e, a) {
                ajax.post(TR_ADDRESS, {
                    act: "get_deleted",
                    offset: a
                }, {
                    onDone: function(a) {
                        a = [].map.call(se(a).children, function(e) {
                            return e
                        }), e(a)
                    }
                })
            }
        }), ge("tr_keys_search").select()
    }

    function restoreKey(e, a, t) {
        lockButton(e), ajax.post(TR_ADDRESS, {
            act: "restore_key",
            hash: t,
            key: a
        }, {
            onDone: function() {
                boxQueue.hideAll(), re("key_" + a)
            }
        })
    }

    function deleteKey(e, a) {
        showFastBox({
            title: getLang("tran_delete_box_title"),
            bodyStyle: "padding: 20px; line-height: 160%;",
            dark: 1,
            forceNoBtn: 1
        }, getLang("tran_delete_key_text").replace(/{key}/, e), getLang("box_yes"), function(t) {
            lockButton(t), ajax.post(TR_ADDRESS, {
                act: "delete_key",
                hash: a,
                key: e
            }, {
                onDone: function() {
                    boxQueue.hideAll(), re("key_" + e)
                }
            })
        }, getLang("box_no"))
    }

    function cloneKey(e, a) {
        var t = '<div class="tr_clone_box"><h4 class="subheader">' + getLang("tran_clone_box_new_key_label") + '</h4><input id="tr_clone_box_section_sel" /><input class="tr_clone_box_key dark text" id="tr_clone_box_key" type="text" /><div id="tr_clone_box_move_checkbox" class="checkbox" onclick="checkbox(this)">' + getLang("tran_move_key_checkbox") + '</div><div id="tr_clone_box_save_log_checkbox" class="checkbox" onclick="checkbox(this)">' + getLang("tran_save_log_key_checkbox") + "</div></div>";
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
                    onChange: function(e, a) {
                        var t = ge("tr_clone_box_key"),
                            n = val(t).split("_").slice(1).join("_");
                        val(t, a[3] + "_" + n)
                    }
                })
            }
        }, t, getLang("box_save"), function(t) {
            var n = val("tr_clone_box_key");
            trim(n) && (lockButton(t), ajax.post(TR_ADDRESS, {
                act: "clone_key",
                hash: a,
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

    function searchKey(e, a) {
        a = trim(a);
        var t = {
            search: a ? a : null
        };
        a && (t.section = !1), nav.change(t)
    }

    function editTranslator(e) {
        var a = showBox(TR_ADDRESS, {
            act: "edit_translator_box",
            translator_id: e
        }, {
            params: {
                bodyStyle: "padding: 25px; overflow: hidden;",
                width: 430
            },
            onDone: function(a, t) {
                function n(e) {
                    ajax.post(TR_ADDRESS, {
                        act: "check_mem_link",
                        link: e
                    }, {
                        onDone: function(e, a, t) {
                            re(geByClass1("tr_mem_ava")), e ? (domPN(_).appendChild(se('<a href="' + t + '" class="tr_mem_ava ow_ava ow_ava_small" style="background-image: url(\'' + a + "')\"></a>")), domData(_, "user-id", e)) : domData(_, "user-id", null)
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
                a.addButton(getLang("global_save"), function(a) {
                    var n = {
                        act: "save_translator",
                        hash: t.hash
                    };
                    _ ? (n.translator_id = domData(_, "user-id"), n.is_add = 1) : n.translator_id = e, n.translator_id && (n.lang_id = i.selectedItems()[0][0], n.parent_lang_id = o.selectedItems()[0][0], n.is_coordinator = intval(hasClass(geByClass1("tr_translator_is_coordinator"), "on")), ajax.post(TR_ADDRESS, n, {
                        showProgress: lockButton.pbind(a),
                        hideProgress: unlockButton.pbind(a),
                        onDone: function() {
                            var e = curBox();
                            e && e.hide(), nav.reload()
                        }
                    }))
                }, "yes", !0);
                a.addButton(getLang("global_cancel"), a.hide, "no"), e && a.setControlsText('<a onclick="TR.deleteTranslator(this, ' + e + ", '" + t.hash + "')\">" + getLang("global_delete") + "</a>")
            }
        });
        a.removeButtons()
    }

    function deleteTranslator(e, a, t) {
        showProgress(domPN(e), "", "tr_translator_bottom_progress"), hide(e), ajax.post(TR_ADDRESS, {
            act: "delete_translator",
            translator_id: a,
            hash: t
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
        var a = ge("tr_translators_stat_date_selector"),
            t = JSON.parse(domData(a, "dates")),
            n = domData(a, "selected"),
            o = ge("tr_translators_language_selector"),
            s = JSON.parse(domData(o, "langs")),
            r = domData(o, "selected");
        _translatorsDateSelector = new Dropdown(a, t, {
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
        var a = toggleClass(domFC(e), "on");
        setTimeout(function() {
            nav.change({
                coordinators: a ? 1 : null
            })
        })
    }

    function searchTranslators(e) {
        e = trim(e).replace(/(:?https?\:\/\/)?(m.)?vk.com\//g, "https://vk.com/"), searchStrIsLink = e.match(/https:\/\/vk.com\//gi);
        var a = cur.translatorsList;
        e && (a = cur.translatorsIndex.search(e));
        var t = "";
        each(a, function(a, n) {
            (!searchStrIsLink || searchStrIsLink && (n.user_link == e || n.user_link_orig == e)) && (t += getTemplate("translator_row", n))
        }), geByClass1("tr_translators").innerHTML = t, nav.objLoc.q && nav.objLoc.q == e || (nav.objLoc.q = e, nav.setLoc(nav.objLoc))
    }

    function initLanguagesPage(e) {
        cur.languages = e, cur.languagesIndex = new vkIndexer(e, function(e) {
            return e.name_rus + " " + e.name_eng + " " + e.name_native
        }, function() {
            var e = trim(val("tr_lang_search"));
            e && searchLang(e)
        });
        var a = ge("tr_languages_sort_selector"),
            t = JSON.parse(domData(a, "sorts"));
        _languagesSortDropdown = new Dropdown(a, t, {
            big: !0,
            width: 200,
            selectedItems: nav.objLoc.sort_by || 0,
            onChange: function(e) {
                nav.objLoc.sort_by = e, nav.change(nav.objLoc)
            }
        })
    }

    function searchLang(e) {
        var a = cur.languages;
        e && (a = cur.languagesIndex.search(e));
        var t = "";
        each(a, function(e, a) {
            t += getTemplate("lang_row", a)
        }), val("tr_languages_result", t), nav.objLoc.q && nav.objLoc.q == e || (nav.objLoc.q = e, nav.setLoc(nav.objLoc))
    }

    function openInlineKey(e, a, t) {
        if ("click" != e.type || e.altKey || t) {
            var n = curBox();
            n && "key-edit-dialog" == n.bodyNode.children[0].id && n.hide();
            var o = "lang_" == a.id.substr(0, 5) ? a.id.substr(5) : a.id;
            return openKey(o, a), cancelEvent(e)
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

    function menu(e, a, t, n, o) {
        if (checkEvent(e)) return !0;
        var s = isEnabledInline() ? "Disable inline translation" : "Enable inline translation",
            r = "",
            i = "",
            l = (a || "").split(",");
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
        var a = _translatorsDateSelector.selectedItems()[0][0];
        showBox(TR_ADDRESS, {
            act: "show_translator_log",
            translator_id: e,
            date: a
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
            a = !1;
        return each(["native", "russian", "english", "abbr", "iso", "version"], function(t, n) {
            var o = ge("tr_add_lang__" + n),
                s = trim(val(o));
            return "" == s ? (notaBene(o), a = !0, !1) : void(e[n] = s)
        }), a ? !1 : e
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

    function editLanguageBox(e, a) {
        showBox(TR_ADDRESS, {
            act: "edit_language_box",
            lang_id: a
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

    function switchTab(e, a) {
        uiTabs.switchTab(e), each(geByClass("_tr_key_param_tab", "translations_edit_key_params"), function(e, a) {
            hide(a)
        }), nav.setLoc(extend({}, nav.objLoc, {
            tab: a
        })), show("translations_key_param_tab_" + a), "history" == a && _box_initScrollHeight("translation_history_block")
    }

    function switchLangTab(e, a) {
        if (uiTabs.switchTab(e), each(geByClass("_tr_lang_value", "translations_lang_values"), function(e, a) {
                hide(a)
            }), nav.setLoc(extend({}, nav.objLoc, {
                key_lang_id: a
            })), show("translations_lang_value_" + a), -1 == a) {
            var t;
            hasClass("translations_box_edit_key", "tr_box_edit_key_simple") && (t = 120), _box_initOtherLangsScroll(t)
        } else setTimeout(function() {
            _box_setValueSize(a)
        }, 100)
    }

    function switchTranslationTab(e, a) {
        uiTabs.switchTab(e), each(geByClass("_tr_key_param_tab", "translations_key_forms"), function(e, a) {
            hide(a)
        }), nav.setLoc(extend({}, nav.objLoc, {
            key_tr_id: a
        })), show("translations_key_param_tab_translation_" + a)
    }

    function initSettingsPage() {
        var e = [];
        each(cur.languagesList, function(a, t) {
            e.push([t[0], replaceEntities(t[1]), t[2]])
        }), cur.translatorLanguages = new Dropdown(ge("translations_settings_other_languages"), e, {
            multiselect: !0,
            autocomplete: !0,
            selectedItems: cur.selectedLangs,
            indexkeys: [1, 2],
            placeholder: getLang("tran_other_languages_placheloder"),
            dark: 1,
            width: 200
        })
    }

    function saveTransatorSettings(e, a) {
        ajax.post(TR_ADDRESS, {
            act: "a_save_settings",
            hash: a,
            languages: cur.translatorLanguages.val()
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e) {
                val("translations_settings_msg", e), show("translations_settings_msg")
            }
        })
    }
    var TR_ADDRESS = "translation",
        _caseDropdown, _caseTokenDropdown, _functionTypeDropdown, _keysLangSelectorDropdown, _translatorsDateSelector, _languagesSortDropdown, _translatorsSortDropdown, COOKIE_KEY = "remixinline_trans";
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
        chooseUplaodedScreen: chooseUplaodedScreen
    }
}(window);
try {
    stManager.done("translation.js")
} catch (e) {}