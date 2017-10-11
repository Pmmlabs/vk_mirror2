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
            a = !1;
        each(e, function(e) {
            addEvent(this, "input change", function(t) {
                var o = val(this);
                a || val(n[e], o)
            })
        }), each(n, function() {
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
            onDone: function(e, n) {
                var a = curBox().bodyNode,
                    t = geByClass("_tr_key_edit_wrap", a),
                    o = [],
                    s = [];
                each(geByClass("_tr_text_value", t[0]), function() {
                    o.push(val(this))
                }), each(geByClass("_tr_text_value", t[1]), function() {
                    s.push(val(this))
                }), e = se(e), n = se(n), each(geByClass("_tr_text_value", e), function(e) {
                    val(this, e < o.length ? o[e] : "")
                }), each(geByClass("_tr_text_value", n), function(e) {
                    val(this, e < s.length ? s[e] : "")
                }), domReplaceEl(t[0], e), domReplaceEl(t[1], n), _box_initAutosizeTexts()
            }
        })
    }

    function saveKey(e, n, a, t) {
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
                        var a = ge("tr_section_counter_" + e);
                        a && (n[0] ? a.innerHTML = "+" + n[0] : a.innerHTML = "")
                    });
                    var r = ge("tr_section_counter_total");
                    s[1] ? r.innerHTML = "+" + s[1] : r.innerHTML = ""
                }
                if (e && o.key) {
                    var l = document.querySelector(".tr_key[data-key=" + o.key + "]");
                    l && (removeClass(l, "tr_untranslated"), geByClass1("_tr_key_inner", l).innerHTML = e), t && (t.innerHTML = n, t.className = "translated")
                } else nav.reload();
                boxQueue.hideAll(), a && a(e), o.mark_untranslated && nav.reload()
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
        if (n) var a = vk.lang;
        else var a = void 0 !== nav.objLoc.lang_id ? nav.objLoc.lang_id : cur.langId;
        var t = showBox(TR_ADDRESS, {
            act: "open_key",
            key: e,
            lang_id: a,
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
            onDone: function(a, t) {
                if (extend(cur, t.cur), _box_initAutosizeTexts(), e || _box_initValuesChangeEvents(), e) {
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
                var l = geByClass("_tr_text_value", geByClass("_tr_key_edit_wrap")[0]),
                    i = "",
                    c = !1;
                each(l, function(e) {
                    addEvent(this, "input change", function(e) {
                        if (i != val(l[0])) {
                            i = val(l[0]);
                            var n = i.match(/(\{[a-zA-Z_]+\})/g) || [],
                                a = [];
                            each(n, function(e, n) {
                                a.push([e, n])
                            }), clearTimeout(c), c = setTimeout(function() {
                                _caseTokenDropdown.setData(_caseTokenDropdown._selectedItems = a)
                            }, 100)
                        }
                    })
                }), _functionTypeDropdown = !1, ge("tr_function_chooser") && (_functionTypeDropdown = new InlineDropdown("tr_function_chooser", {
                    withArrow: !0,
                    onSelect: _box_changeKeyFunctionType
                }));
                var _, d = ge("tr_section_chooser");
                d && (_ = new Dropdown(d, t.sections, {
                    big: !0,
                    selectedItems: intval(nav.objLoc.section),
                    onChange: function(e, n) {
                        var a = ge("tr_new_key"),
                            t = val(a).split("_").slice(1).join("_");
                        val(a, n[3] + "_" + t)
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
                var v = ge("tr_case_token");
                if (v) {
                    var u = domData(v, "selected");
                    _caseTokenDropdown = new Dropdown(v, [], {
                        big: !0,
                        width: 200,
                        selectedItems: u,
                        onChange: function(e, n) {}
                    })
                }
                var h = ge("tr_new_key"),
                    y = ge("tr_new_key_error");
                if (h) {
                    var p = "";
                    addEvent(h, "change input", function() {
                        var e = val(h);
                        each(t.sections, function(n, a) {
                            0 === e.indexOf(a[3]) && _.selectItem(a[0])
                        })
                    }), addEvent(h, "change input", debounce(function() {
                        var e = trim(val(h));
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
                if (h) elfocus(h);
                else {
                    var f = geByClass1("_tr_text_value");
                    setTimeout(function() {
                        elfocus(f), f.select()
                    })
                }
                if (t.isDeleted) a.addButton(getLang("box_restore"), function(n) {
                    restoreKey(n, e, t.editHash)
                }, "yes");
                else {
                    var b = a.addButton(e ? getLang("global_save") : getLang("tran_create_key"), function(e) {
                        saveKey(e, t.editHash, !1, n)
                    }, "yes", !0);
                    if (e && cur.isSuperTranslator) {
                        cur.sections = t.sections;
                        var x = "<a onclick=\"TR.deleteKey('" + e + "', '" + t.editHash + "')\">" + getLang("tran_delete_key") + '</a><span class="divider">|</span><a onclick="TR.cloneKey(\'' + e + "', '" + t.editHash + "')\">" + getLang("tran_copy_key") + "</a>";
                        a.setControlsText(x)
                    }
                    addEvent(window, "keydown", cur.onBoxKeyDownEvent = function(a) {
                        a.ctrlKey && a.keyCode == KEY.ENTER && saveKey(b, t.editHash, function() {
                            boxQueue.hideAll(), openNextKey(e)
                        }, n)
                    })
                }
                a.addButton(getLang("global_cancel"), a.hide, "no")
            }
        });
        t.removeButtons(), e && !n && nav.setLoc(extend({}, nav.objLoc, {
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

    function restoreKey(e, n, a) {
        lockButton(e), ajax.post(TR_ADDRESS, {
            act: "restore_key",
            hash: a,
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
        }, getLang("tran_delete_key_text").replace(/{key}/, e), getLang("box_yes"), function(a) {
            lockButton(a), ajax.post(TR_ADDRESS, {
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
                    onChange: function(e, n) {
                        var a = ge("tr_clone_box_key"),
                            t = val(a).split("_").slice(1).join("_");
                        val(a, n[3] + "_" + t)
                    }
                })
            }
        }, a, getLang("box_save"), function(a) {
            var t = val("tr_clone_box_key");
            trim(t) && (lockButton(a), ajax.post(TR_ADDRESS, {
                act: "clone_key",
                hash: n,
                key: e,
                new_key: t,
                move: intval(hasClass(ge("tr_clone_box_move_checkbox"), "on")),
                with_log: intval(hasClass(ge("tr_clone_box_save_log_checkbox"), "on"))
            }, {
                onDone: function() {
                    boxQueue.hideAll(), openKey(t)
                }
            }))
        }, getLang("box_cancel"))
    }

    function searchKey(e, n) {
        n = trim(n);
        var a = {
            search: n ? n : null
        };
        n && (a.section = !1), nav.change(a)
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
            onDone: function(n, a) {
                function t(e) {
                    ajax.post(TR_ADDRESS, {
                        act: "check_mem_link",
                        link: e
                    }, {
                        onDone: function(e, n, a) {
                            re(geByClass1("tr_mem_ava")), e ? (domPN(_).appendChild(se('<a href="' + a + '" class="tr_mem_ava ow_ava ow_ava_small" style="background-image: url(\'' + n + "')\"></a>")), domData(_, "user-id", e)) : domData(_, "user-id", null)
                        }
                    })
                }
                var o = ge("tr_from_lang_selector"),
                    s = JSON.parse(domData(o, "langs")),
                    r = domData(o, "selected"),
                    l = ge("tr_to_lang_selector"),
                    i = JSON.parse(domData(l, "langs")),
                    c = domData(l, "selected");
                o = new Dropdown(o, s, {
                    big: !0,
                    width: 130,
                    autocomplete: !0,
                    selectedItems: r,
                    onChange: function(e) {}
                }), o.disable(!!e), l = new Dropdown(l, i, {
                    big: !0,
                    width: 180,
                    autocomplete: !0,
                    selectedItems: c,
                    onChange: function(e) {}
                }), l.disable(!!e);
                var _ = geByClass1("tr_translator_link");
                if (_) {
                    t = debounce(t, 200);
                    var d = "";
                    addEvent(_, "change input", function() {
                        var e = val(_);
                        e != d && (d = e, t(e))
                    })
                }
                n.addButton(getLang("global_save"), function(n) {
                    var t = {
                        act: "save_translator",
                        hash: a.hash
                    };
                    _ ? (t.translator_id = domData(_, "user-id"), t.is_add = 1) : t.translator_id = e, t.translator_id && (t.lang_id = l.selectedItems()[0][0], t.parent_lang_id = o.selectedItems()[0][0], t.is_coordinator = intval(hasClass(geByClass1("tr_translator_is_coordinator"), "on")), ajax.post(TR_ADDRESS, t, {
                        showProgress: lockButton.pbind(n),
                        hideProgress: unlockButton.pbind(n),
                        onDone: function() {
                            var e = curBox();
                            e && e.hide(), nav.reload()
                        }
                    }))
                }, "yes", !0);
                n.addButton(getLang("global_cancel"), n.hide, "no"), e && n.setControlsText('<a onclick="TR.deleteTranslator(this, ' + e + ", '" + a.hash + "')\">" + getLang("global_delete") + "</a>")
            }
        });
        n.removeButtons()
    }

    function deleteTranslator(e, n, a) {
        showProgress(domPN(e), "", "tr_translator_bottom_progress"), hide(e), ajax.post(TR_ADDRESS, {
            act: "delete_translator",
            translator_id: n,
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
            return e.raw_name
        }, function() {
            var e = trim(val("translators_search"));
            e && searchTranslators(e)
        });
        var n = ge("tr_translators_stat_date_selector"),
            a = JSON.parse(domData(n, "dates")),
            t = domData(n, "selected"),
            o = ge("tr_translators_language_selector"),
            s = JSON.parse(domData(o, "langs")),
            r = domData(o, "selected");
        _translatorsDateSelector = new Dropdown(n, a, {
            big: !0,
            width: 200,
            selectedItems: t,
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
        var l = ge("tr_translators_sort_selector"),
            i = JSON.parse(domData(l, "sorts"));
        _translatorsSortDropdown = new Dropdown(l, i, {
            big: !0,
            width: 200,
            selectedItems: nav.objLoc.sort_by || 0,
            onChange: function(e) {
                nav.objLoc.sort_by = e, nav.change(nav.objLoc)
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
        var a = "";
        each(n, function(e, n) {
            a += getTemplate("translator_row", n)
        }), geByClass1("tr_translators").innerHTML = a, nav.objLoc.q && nav.objLoc.q == e || (nav.objLoc.q = e, nav.setLoc(nav.objLoc))
    }

    function initLanguagesPage(e) {
        cur.languages = e, cur.languagesIndex = new vkIndexer(e, function(e) {
            return e.name_rus + " " + e.name_eng + " " + e.name_native
        }, function() {
            var e = trim(val("tr_lang_search"));
            e && searchLang(e)
        });
        var n = ge("tr_languages_sort_selector"),
            a = JSON.parse(domData(n, "sorts"));
        _languagesSortDropdown = new Dropdown(n, a, {
            big: !0,
            width: 200,
            selectedItems: nav.objLoc.sort_by || 0,
            onChange: function(e) {
                nav.objLoc.sort_by = e, nav.change(nav.objLoc)
            }
        })
    }

    function searchLang(e) {
        var n = cur.languages;
        e && (n = cur.languagesIndex.search(e));
        var a = "";
        each(n, function(e, n) {
            a += getTemplate("lang_row", n)
        }), val("tr_languages_result", a), nav.objLoc.q && nav.objLoc.q == e || (nav.objLoc.q = e, nav.setLoc(nav.objLoc))
    }

    function openInlineKey(e, n, a) {
        if ("click" != e.type || e.altKey || a) {
            var t = curBox();
            t && "key-edit-dialog" == t.bodyNode.children[0].id && t.hide();
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

    function menu(e, n, a, t, o) {
        if (checkEvent(e)) return !0;
        var s = isEnabledInline() ? "Disable inline translation" : "Enable inline translation",
            r = "",
            l = "",
            i = (n || "").split(",");
        i = i[0] || 0, i && (r = "");
        showFastBox({
            title: "Select option",
            width: 300,
            bodyStyle: "padding: 0px",
            dark: 1,
            flatButtons: !0,
            onClean: function() {
                cleanElems("translation_toggle", "translation_to_page", "translation_show_all")
            }
        }, l + '      <div class="translation_box">        <div class="button_blue flat_button" id="translation_toggle">' + s + "</div>        " + r + '        <a class="button_link" href="/translation">          <div class="flat_button secondary" id="translation_to_page">Go to translation page</div>        </a>        <a id="show_untranslated" class="button_link" href="/translation?section_id=untranslated">          <div class="flat_button secondary" id="">Show untranslated phrases</div>        </a>        <div class="help">          <a href="/club16000">Help</a>         </div>      </div>');
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
            var a = ge("tr_add_lang__" + n),
                t = trim(val(a));
            "" == t && (notaBene(a), err = !0)
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

    function editLanguageBox(e, n) {
        showBox(TR_ADDRESS, {
            act: "edit_language_box",
            lang_id: n
        })
    }

    function saveLanguage(e, n) {
        var a = cur.editLangBoxDD.val();
        ajax.post(TR_ADDRESS, {
            act: "a_save_language",
            lang_id: e,
            hash: n,
            status: a
        }, {
            progress: curBox().progress,
            onDone: function() {
                curBox().hide()
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
        saveLanguage: saveLanguage
    }
}(window);
try {
    stManager.done("translation.js")
} catch (e) {}