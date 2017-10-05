! function(exports) {
    function _box_initAutosizeTexts() {
        each(geByClass("_tr_text_value"), function() {
            autosizeSetup(this, {
                minHeight: 50,
                maxHeight: 450
            })
        })
    }

    function _box_initValuesChangeEvents() {
        var e = geByClass("_tr_text_value", geByClass("_tr_key_edit_wrap")[0]),
            n = geByClass("_tr_text_value", geByClass("_tr_key_edit_wrap")[1]),
            t = !1;
        each(e, function(e) {
            addEvent(this, "input change", function(a) {
                var o = val(this);
                t || val(n[e], o)
            })
        }), each(n, function() {
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
            onDone: function(e, n) {
                var t = curBox().bodyNode,
                    a = geByClass("_tr_key_edit_wrap", t),
                    o = [],
                    s = [];
                each(geByClass("_tr_text_value", a[0]), function() {
                    o.push(val(this))
                }), each(geByClass("_tr_text_value", a[1]), function() {
                    s.push(val(this))
                }), e = se(e), n = se(n), each(geByClass("_tr_text_value", e), function(e) {
                    val(this, e < o.length ? o[e] : "")
                }), each(geByClass("_tr_text_value", n), function(e) {
                    val(this, e < s.length ? s[e] : "")
                }), domReplaceEl(a[0], e), domReplaceEl(a[1], n), _box_initAutosizeTexts()
            }
        })
    }

    function saveKey(e, n, t, a) {
        var o = {
            act: "save_key",
            hash: n
        };
        if (o.lang_id = intval((void 0 !== nav.objLoc.lang_id ? nav.objLoc.lang_id : cur.langId) || 0), o.key = val("tr_new_key") || val("tr_key_input"), _functionTypeDropdown && (o.function_type = _functionTypeDropdown.getSelected()[0]), o.lang_ids = [], each(geByClass("_tr_key_edit_wrap"), function() {
                var e = domData(this, "lang-id"),
                    n = [];
                each(geByClass("_tr_text_value", this), function() {
                    n.push(val(this))
                }), n = n.length > 1 ? "@@" + n.join("@") : n[0], o["Value_" + e] = n, o.lang_ids.push(e)
            }), o.lang_ids = o.lang_ids.join(","), cur.isSuperTranslator && (o.description = val("tr_description_edit"), o.extended_wiki = intval(hasClass("tr_extra_wiki", "on")), o.disable_inline = intval(hasClass("tr_extra_disable_inline", "on")), o["export"] = intval(hasClass("tr_extra_export_to_js", "on")), o.has_case = intval(hasClass("tr_extra_case", "on")), o.mark_untranslated = intval(hasClass("tr_extra_mark_as_untranslated", "on")), o.has_case)) {
            o["case"] = _caseDropdown.selectedItems()[0][0];
            var s = _caseTokenDropdown.selectedItems();
            s.length && (o.case_token = _caseTokenDropdown.selectedItems()[0][1])
        }
        ajax.post(TR_ADDRESS, o, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: function(e, n, s) {
                if (s) {
                    each(s[0], function(e, n) {
                        var t = ge("tr_section_counter_" + e);
                        t && (n[0] ? t.innerHTML = "+" + n[0] : t.innerHTML = "")
                    });
                    var r = ge("tr_section_counter_total");
                    s[1] ? r.innerHTML = "+" + s[1] : r.innerHTML = ""
                }
                if (e && o.key) {
                    var i = document.querySelector(".tr_key[data-key=" + o.key + "]");
                    i && (removeClass(i, "tr_untranslated"), geByClass1("_tr_key_inner", i).innerHTML = e), a && (a.innerHTML = n, a.className = "translated")
                } else nav.reload();
                boxQueue.hideAll(), t && t(e), o.mark_untranslated && nav.reload()
            }
        })
    }

    function _box_hasCaseChanged(e) {
        if (toggle(geByClass1("_tr_case_controls"), e), e) {
            var n = geByClass("_tr_text_value", geByClass("_tr_key_edit_wrap")[0]);
            n.length && triggerEvent(n[0], "change")
        }
    }

    function newKey() {
        openKey("")
    }

    function openNextKey(e) {
        var n = document.querySelector(".tr_key[data-key=" + e + "]");
        n = n ? domNS(n) : !1, n && (e = domData(n, "key"), openKey(e))
    }

    function openKey(e, n) {
        if (n) var t = vk.lang;
        else var t = void 0 !== nav.objLoc.lang_id ? nav.objLoc.lang_id : cur.langId;
        var a = showBox(TR_ADDRESS, {
            act: "open_key",
            key: e,
            lang_id: t,
            section_id: intval(nav.objLoc.section),
            is_deleted: e ? intval("deleted" == nav.objLoc.section) : 0
        }, {
            params: {
                bodyStyle: "padding: 20px 0 0; overflow: hidden;",
                width: 550,
                onHide: function() {
                    n || nav.setLoc(extend({}, nav.objLoc, {
                        key: null
                    })), cur.onBoxKeyDownEvent && removeEvent(window, "keydown", cur.onBoxKeyDownEvent)
                }
            },
            onDone: function(t, a) {
                if (extend(cur, a.cur), _box_initAutosizeTexts(), e || _box_initValuesChangeEvents(), e) {
                    var o = geByClass1("_tr_history_rows"),
                        s = geByClass1("_tr_history_resizer");
                    if (getSize(o)[1] >= o.scrollHeight) re(s), setStyle(geByClass1("_tr_history_rows"), "height", "inherit");
                    else {
                        var r, s = geByClass1("_tr_history_resizer");
                        addEvent(s, "mousedown", function(e) {
                            var n = getXY(o);
                            return r && removeEvent(window, "mousemove", r), addEvent(window, "mousemove", r = function(e) {
                                setStyle(o, {
                                    height: Math.min(o.scrollHeight, Math.max(50, e.pageY - n[1]))
                                })
                            }), addEvent(window, "mouseup", function(e) {
                                removeEvent(window, "mousemove", r)
                            }), cancelEvent(e)
                        })
                    }
                }
                var i = geByClass("_tr_text_value", geByClass("_tr_key_edit_wrap")[0]),
                    l = "",
                    c = !1;
                each(i, function(e) {
                    addEvent(this, "input change", function(e) {
                        if (l != val(i[0])) {
                            l = val(i[0]);
                            var n = l.match(/(\{[a-zA-Z_]+\})/g) || [],
                                t = [];
                            each(n, function(e, n) {
                                t.push([e, n])
                            }), clearTimeout(c), c = setTimeout(function() {
                                _caseTokenDropdown.setData(_caseTokenDropdown._selectedItems = t)
                            }, 100)
                        }
                    })
                }), _functionTypeDropdown = !1, ge("tr_function_chooser") && (_functionTypeDropdown = new InlineDropdown("tr_function_chooser", {
                    withArrow: !0,
                    onSelect: _box_changeKeyFunctionType
                }));
                var _, d = ge("tr_section_chooser");
                d && (_ = new Dropdown(d, a.sections, {
                    big: !0,
                    selectedItems: intval(nav.objLoc.section),
                    onChange: function(e, n) {
                        var t = ge("tr_new_key"),
                            a = val(t).split("_").slice(1).join("_");
                        val(t, n[3] + "_" + a)
                    }
                })), _caseDropdown = _caseTokenDropdown = !1;
                var g = ge("tr_case");
                if (g) {
                    var u = domData(g, "selected");
                    _caseDropdown = new Dropdown(g, JSON.parse(domData(g, "cases")), {
                        big: !0,
                        width: 200,
                        selectedItems: u,
                        onChange: function(e, n) {}
                    })
                }
                var h = ge("tr_case_token");
                if (h) {
                    var u = domData(h, "selected");
                    _caseTokenDropdown = new Dropdown(h, [], {
                        big: !0,
                        width: 200,
                        selectedItems: u,
                        onChange: function(e, n) {}
                    })
                }
                var v = ge("tr_new_key"),
                    y = ge("tr_new_key_error");
                if (v) {
                    var p = "";
                    addEvent(v, "change input", function() {
                        var e = val(v);
                        each(a.sections, function(n, t) {
                            0 === e.indexOf(t[3]) && _.selectItem(t[0])
                        })
                    }), addEvent(v, "change input", debounce(function() {
                        var e = trim(val(v));
                        p != e && (p = e, e && ajax.post(TR_ADDRESS, {
                            act: "check_new_key",
                            key: e
                        }, {
                            onDone: function(e) {
                                toggle(y, !!e)
                            }
                        }))
                    }, 200))
                }
                if (v) elfocus(v);
                else {
                    var f = geByClass1("_tr_text_value");
                    setTimeout(function() {
                        elfocus(f), f.select()
                    })
                }
                if (a.isDeleted) t.addButton(getLang("box_restore"), function(n) {
                    restoreKey(n, e, a.editHash)
                }, "yes");
                else {
                    var x = t.addButton(e ? getLang("global_save") : getLang("tran_create_key"), function(e) {
                        saveKey(e, a.editHash, !1, n)
                    }, "yes", !0);
                    if (e && cur.isSuperTranslator) {
                        cur.sections = a.sections;
                        var b = "<a onclick=\"TR.deleteKey('" + e + "', '" + a.editHash + "')\">" + getLang("tran_delete_key") + '</a><span class="divider">|</span><a onclick="TR.cloneKey(\'' + e + "', '" + a.editHash + "')\">" + getLang("tran_copy_key") + "</a>";
                        t.setControlsText(b)
                    }
                    addEvent(window, "keydown", cur.onBoxKeyDownEvent = function(t) {
                        t.ctrlKey && t.keyCode == KEY.ENTER && saveKey(x, a.editHash, function() {
                            boxQueue.hideAll(), openNextKey(e)
                        }, n)
                    })
                }
                t.addButton(getLang("global_cancel"), t.hide, "no")
            }
        });
        a.removeButtons(), e && !n && nav.setLoc(extend({}, nav.objLoc, {
            key: e
        }))
    }

    function initTranslationsPage() {
        var e = ge("tr_keys_lang_selector"),
            n = JSON.parse(domData(e, "langs"));
        _keysLangSelectorDropdown = new Dropdown(e, n, {
            big: !0,
            width: 190,
            placeholder: n[0][1],
            autocomplete: !0,
            selectedItems: nav.objLoc.lang_id || cur.langId,
            onChange: function(e) {
                e = e || 0, nav.change({
                    lang_id: e
                })
            }
        }), nav.objLoc.key && openKey(nav.objLoc.key), "deleted" == nav.objLoc.section && new AutoList(geByClass1("_tr_keys"), {
            onNeedRows: function(e, n) {
                ajax.post(TR_ADDRESS, {
                    act: "get_deleted",
                    offset: n
                }, {
                    onDone: function(n) {
                        n = [].map.call(se(n).children, function(e) {
                            return e
                        }), e(n)
                    }
                })
            }
        }), ge("tr_keys_search").select()
    }

    function restoreKey(e, n, t) {
        lockButton(e), ajax.post(TR_ADDRESS, {
            act: "restore_key",
            hash: t,
            key: n
        }, {
            onDone: function() {
                boxQueue.hideAll(), re("key_" + n)
            }
        })
    }

    function deleteKey(e, n) {
        showFastBox({
            title: getLang("tran_delete_box_title"),
            bodyStyle: "padding: 20px; line-height: 160%;",
            dark: 1,
            forceNoBtn: 1
        }, getLang("tran_delete_key_text").replace(/{key}/, e), getLang("box_yes"), function(t) {
            lockButton(t), ajax.post(TR_ADDRESS, {
                act: "delete_key",
                hash: n,
                key: e
            }, {
                onDone: function() {
                    boxQueue.hideAll(), re("key_" + e)
                }
            })
        }, getLang("box_no"))
    }

    function cloneKey(e, n) {
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
                    onChange: function(e, n) {
                        var t = ge("tr_clone_box_key"),
                            a = val(t).split("_").slice(1).join("_");
                        val(t, n[3] + "_" + a)
                    }
                })
            }
        }, t, getLang("box_save"), function(t) {
            var a = val("tr_clone_box_key");
            trim(a) && (lockButton(t), ajax.post(TR_ADDRESS, {
                act: "clone_key",
                hash: n,
                key: e,
                new_key: a,
                move: intval(hasClass(ge("tr_clone_box_move_checkbox"), "on")),
                with_log: intval(hasClass(ge("tr_clone_box_save_log_checkbox"), "on"))
            }, {
                onDone: function() {
                    boxQueue.hideAll(), openKey(a)
                }
            }))
        }, getLang("box_cancel"))
    }

    function searchKey(e, n) {
        n = trim(n);
        var t = {
            search: n ? n : null
        };
        n && (t.section = !1), nav.change(t)
    }

    function editTranslator(e) {
        var n = showBox(TR_ADDRESS, {
            act: "edit_translator_box",
            translator_id: e
        }, {
            params: {
                bodyStyle: "padding: 25px; overflow: hidden;",
                width: 430
            },
            onDone: function(n, t) {
                function a(e) {
                    ajax.post(TR_ADDRESS, {
                        act: "check_mem_link",
                        link: e
                    }, {
                        onDone: function(e, n, t) {
                            re(geByClass1("tr_mem_ava")), e ? (domPN(_).appendChild(se('<a href="' + t + '" class="tr_mem_ava ow_ava ow_ava_small" style="background-image: url(\'' + n + "')\"></a>")), domData(_, "user-id", e)) : domData(_, "user-id", null)
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
                    a = debounce(a, 200);
                    var d = "";
                    addEvent(_, "change input", function() {
                        var e = val(_);
                        e != d && (d = e, a(e))
                    })
                }
                n.addButton(getLang("global_save"), function(n) {
                    var a = {
                        act: "save_translator",
                        hash: t.hash
                    };
                    _ ? (a.translator_id = domData(_, "user-id"), a.is_add = 1) : a.translator_id = e, a.translator_id && (a.lang_id = i.selectedItems()[0][0], a.parent_lang_id = o.selectedItems()[0][0], a.is_coordinator = intval(hasClass(geByClass1("tr_translator_is_coordinator"), "on")), ajax.post(TR_ADDRESS, a, {
                        showProgress: lockButton.pbind(n),
                        hideProgress: unlockButton.pbind(n),
                        onDone: function() {
                            var e = curBox();
                            e && e.hide(), nav.reload()
                        }
                    }))
                }, "yes", !0);
                n.addButton(getLang("global_cancel"), n.hide, "no"), e && n.setControlsText('<a onclick="TR.deleteTranslator(this, ' + e + ", '" + t.hash + "')\">" + getLang("global_delete") + "</a>")
            }
        });
        n.removeButtons()
    }

    function deleteTranslator(e, n, t) {
        showProgress(domPN(e), "", "tr_translator_bottom_progress"), hide(e), ajax.post(TR_ADDRESS, {
            act: "delete_translator",
            translator_id: n,
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
            return e.raw_name
        });
        var n = ge("tr_translators_stat_date_selector"),
            t = JSON.parse(domData(n, "dates")),
            a = domData(n, "selected"),
            o = ge("tr_translators_language_selector"),
            s = JSON.parse(domData(o, "langs")),
            r = domData(o, "selected"),
            i = trim(val("translators_search"));
        i && setTimeout(searchTranslators.pbind(i), 50), _translatorsDateSelector = new Dropdown(n, t, {
            big: !0,
            width: 200,
            selectedItems: a,
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
        })
    }

    function toggleCoordinatorsOnly(e) {
        var n = toggleClass(domFC(e), "on");
        setTimeout(function() {
            nav.change({
                coordinators: n ? 1 : null
            })
        })
    }

    function searchTranslators(e) {
        e = trim(e);
        var n = cur.translatorsList;
        e && (n = cur.translatorsIndex.search(e));
        var t = "";
        each(n, function(e, n) {
            t += getTemplate("translator_row", n)
        }), geByClass1("tr_translators").innerHTML = t, nav.objLoc.q && nav.objLoc.q == e || (nav.objLoc.q = e, nav.setLoc(nav.objLoc))
    }

    function initLanguagesPage(e) {
        cur.languages = e, cur.languagesIndex = new vkIndexer(e, function(e) {
            return e.name_rus + " " + e.name_eng + " " + e.name_native
        })
    }

    function searchLang(e) {
        var n = cur.languages;
        e && (n = cur.languagesIndex.search(e));
        var t = "";
        each(n, function(e, n) {
            t += getTemplate("lang_row", n)
        }), geByClass1("tr_languages_list").innerHTML = t
    }

    function openInlineKey(e, n, t) {
        if ("click" != e.type || e.altKey || t) {
            var a = curBox();
            a && "key-edit-dialog" == a.bodyNode.children[0].id && a.hide();
            var o = "lang_" == n.id.substr(0, 5) ? n.id.substr(5) : n.id;
            return openKey(o, n), cancelEvent(e)
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

    function menu(e, n, t, a, o) {
        if (checkEvent(e)) return !0;
        var s = isEnabledInline() ? "Disable inline translation" : "Enable inline translation",
            r = "",
            i = "",
            l = (n || "").split(",");
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
        var n = _translatorsDateSelector.selectedItems()[0][0];
        showBox(TR_ADDRESS, {
            act: "show_translator_log",
            translator_id: e,
            date: n
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

    function addLanguageBox() {
        cur.addLangBox = new MessageBox({
            title: getLang("tran_add_lang_title")
        }), cur.addLangBox.content(getTemplate("add_lang_box")), cur.addLangBox.addButton(getLang("tran_add_lang_button"), addLanguage, "ok", !1, "tr_add_lang__save"), cur.addLangBox.show(), cur.addLangBoxCountryDD = new Dropdown(ge("tr_add_lang__country"), cur.addLangBoxCountries, {
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
            err = !1,
            btn = ge("tr_add_lang__save");
        each(["native", "russian", "english", "abbr", "iso", "version"], function(e, n) {
            var t = ge("tr_add_lang__" + n),
                a = trim(val(t));
            "" == a && (notaBene(t), err = !0)
        }), err || ajax.post(TR_ADDRESS, p, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function(html, js) {
                cur.addLangBox.hide();
                var l = ge("tr_languages_list");
                l.parentNode.replaceChild(se(html), l), eval(js), showDoneBox(getLang("tran_add_lang_added"))
            }
        })
    }
    var TR_ADDRESS = "translation",
        _caseDropdown, _caseTokenDropdown, _functionTypeDropdown, _keysLangSelectorDropdown, _translatorsDateSelector, COOKIE_KEY = "remixinline_trans";
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
        addLanguageBox: addLanguageBox
    }
}(window);
try {
    stManager.done("translation.js")
} catch (e) {}