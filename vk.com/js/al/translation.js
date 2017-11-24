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
            a = geByClass("_tr_text_value", geByClass("_tr_key_edit_wrap")[1]),
            n = !1;
        each(e, function(e) {
            addEvent(this, "input change", function(t) {
                var o = val(this);
                n || val(a[e], o)
            })
        }), each(a, function() {
            addEvent(this, "input change", function() {
                n = !0
            }), addEvent(this, "focus", function() {
                n || this.select()
            })
        })
    }

    function _box_changeKeyFunctionType(e) {
        ajax.post(TR_ADDRESS, {
            act: "function_type",
            function_type: e
        }, {
            onDone: function(e, a) {
                var n = curBox().bodyNode,
                    t = geByClass("_tr_key_edit_wrap", n),
                    o = [],
                    s = [];
                each(geByClass("_tr_text_value", t[0]), function() {
                    o.push(val(this))
                }), each(geByClass("_tr_text_value", t[1]), function() {
                    s.push(val(this))
                }), e = se(e), a = se(a), each(geByClass("_tr_text_value", e), function(e) {
                    val(this, e < o.length ? o[e] : "")
                }), each(geByClass("_tr_text_value", a), function(e) {
                    val(this, e < s.length ? s[e] : "")
                }), domReplaceEl(t[0], e), domReplaceEl(t[1], a), _box_initAutosizeTexts()
            }
        })
    }

    function saveKey(e, a, n, t) {
        var o = {
            act: "save_key",
            hash: a
        };
        if (o.lang_id = intval((void 0 !== nav.objLoc.lang_id ? nav.objLoc.lang_id : cur.langId) || 0), o.key = val("tr_new_key") || val("tr_key_input"), _functionTypeDropdown && (o.function_type = _functionTypeDropdown.getSelected()[0]), o.lang_ids = [], each(geByClass("_tr_key_edit_wrap"), function() {
                var e = domData(this, "lang-id"),
                    a = [];
                each(geByClass("_tr_text_value", this), function() {
                    a.push(val(this))
                }), a = a.length > 1 ? "@@" + a.join("@") : a[0], o["Value_" + e] = a, o.lang_ids.push(e)
            }), o.lang_ids = o.lang_ids.join(","), cur.isSuperTranslator && (o.description = val("tr_description_edit"), o.extended_wiki = intval(hasClass("tr_extra_wiki", "on")), o.disable_inline = intval(hasClass("tr_extra_disable_inline", "on")), o["export"] = intval(hasClass("tr_extra_export_to_js", "on")), o.has_case = intval(hasClass("tr_extra_case", "on")), o.mark_untranslated = intval(hasClass("tr_extra_mark_as_untranslated", "on")), o.has_case)) {
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
                        var n = ge("tr_section_counter_" + e);
                        n && (a[0] ? n.innerHTML = "+" + a[0] : n.innerHTML = "")
                    });
                    var r = ge("tr_section_counter_total");
                    s[1] ? r.innerHTML = "+" + s[1] : r.innerHTML = ""
                }
                if (e && o.key) {
                    var l = document.querySelector(".tr_key[data-key=" + o.key + "]");
                    l && (removeClass(l, "tr_untranslated"), geByClass1("_tr_key_inner", l).innerHTML = e), t && (t.innerHTML = a, t.className = "translated")
                } else nav.reload();
                boxQueue.hideAll(), n && n(e), o.mark_untranslated && nav.reload()
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

    function openKey(e, a, n) {
        if (a) var t = vk.lang;
        else var t = void 0 !== nav.objLoc.lang_id ? nav.objLoc.lang_id : cur.langId;
        n && (cur.translatorsLogBoxOffset = ge("box_layer_wrap").scrollTop);
        var o = showBox(TR_ADDRESS, {
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
                    a || nav.setLoc(extend({}, nav.objLoc, {
                        key: null
                    })), n && setTimeout(function() {
                        ge("box_layer_wrap").scrollTop = cur.translatorsLogBoxOffset, delete cur.translatorsLogBoxOffset
                    }, 150), cur.onBoxKeyDownEvent && removeEvent(window, "keydown", cur.onBoxKeyDownEvent)
                }
            },
            onDone: function(n, t) {
                if (extend(cur, t.cur), _box_initAutosizeTexts(), e || _box_initValuesChangeEvents(), e) {
                    var o = geByClass1("_tr_history_rows"),
                        s = geByClass1("_tr_history_resizer");
                    if (getSize(o)[1] >= o.scrollHeight) re(s), setStyle(geByClass1("_tr_history_rows"), "height", "inherit");
                    else {
                        var r, s = geByClass1("_tr_history_resizer");
                        addEvent(s, "mousedown", function(e) {
                            var a = getXY(o);
                            return r && removeEvent(window, "mousemove", r), addEvent(window, "mousemove", r = function(e) {
                                setStyle(o, {
                                    height: Math.min(o.scrollHeight, Math.max(50, e.pageY - a[1]))
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
                            var a = i.match(/(\{[a-zA-Z_]+\})/g) || [],
                                n = [];
                            each(a, function(e, a) {
                                n.push([e, a])
                            }), clearTimeout(c), c = setTimeout(function() {
                                _caseTokenDropdown.setData(_caseTokenDropdown._selectedItems = n)
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
                    onChange: function(e, a) {
                        var n = ge("tr_new_key"),
                            t = val(n).split("_").slice(1).join("_");
                        val(n, a[3] + "_" + t)
                    }
                })), _caseDropdown = _caseTokenDropdown = !1;
                var g = ge("tr_case");
                if (g) {
                    var u = domData(g, "selected");
                    _caseDropdown = new Dropdown(g, JSON.parse(domData(g, "cases")), {
                        big: !0,
                        width: 200,
                        selectedItems: u,
                        onChange: function(e, a) {}
                    })
                }
                var h = ge("tr_case_token");
                if (h) {
                    var u = domData(h, "selected");
                    _caseTokenDropdown = new Dropdown(h, [], {
                        big: !0,
                        width: 200,
                        selectedItems: u,
                        onChange: function(e, a) {}
                    })
                }
                var v = ge("tr_new_key"),
                    p = ge("tr_new_key_error");
                if (v) {
                    var y = "";
                    addEvent(v, "change input", function() {
                        var e = val(v);
                        each(t.sections, function(a, n) {
                            0 === e.indexOf(n[3]) && _.selectItem(n[0])
                        })
                    }), addEvent(v, "change input", debounce(function() {
                        var e = trim(val(v));
                        y != e && (y = e, e && ajax.post(TR_ADDRESS, {
                            act: "check_new_key",
                            key: e
                        }, {
                            onDone: function(e) {
                                toggle(p, !!e)
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
                if (t.isDeleted) n.addButton(getLang("box_restore"), function(a) {
                    restoreKey(a, e, t.editHash)
                }, "yes");
                else {
                    var x = n.addButton(e ? getLang("global_save") : getLang("tran_create_key"), function(e) {
                        saveKey(e, t.editHash, !1, a)
                    }, "yes", !0);
                    if (e && cur.isSuperTranslator) {
                        cur.sections = t.sections;
                        var b = "<a onclick=\"TR.deleteKey('" + e + "', '" + t.editHash + "')\">" + getLang("tran_delete_key") + '</a><span class="divider">|</span><a onclick="TR.cloneKey(\'' + e + "', '" + t.editHash + "')\">" + getLang("tran_copy_key") + "</a>";
                        n.setControlsText(b)
                    }
                    addEvent(window, "keydown", cur.onBoxKeyDownEvent = function(n) {
                        n.ctrlKey && n.keyCode == KEY.ENTER && saveKey(x, t.editHash, function() {
                            boxQueue.hideAll(), openNextKey(e)
                        }, a)
                    })
                }
                n.addButton(getLang("global_cancel"), n.hide, "no")
            }
        });
        o.removeButtons(), e && !a && nav.setLoc(extend({}, nav.objLoc, {
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

    function restoreKey(e, a, n) {
        lockButton(e), ajax.post(TR_ADDRESS, {
            act: "restore_key",
            hash: n,
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
        }, getLang("tran_delete_key_text").replace(/{key}/, e), getLang("box_yes"), function(n) {
            lockButton(n), ajax.post(TR_ADDRESS, {
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
        var n = '<div class="tr_clone_box"><h4 class="subheader">' + getLang("tran_clone_box_new_key_label") + '</h4><input id="tr_clone_box_section_sel" /><input class="tr_clone_box_key dark text" id="tr_clone_box_key" type="text" /><div id="tr_clone_box_move_checkbox" class="checkbox" onclick="checkbox(this)">' + getLang("tran_move_key_checkbox") + '</div><div id="tr_clone_box_save_log_checkbox" class="checkbox" onclick="checkbox(this)">' + getLang("tran_save_log_key_checkbox") + "</div></div>";
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
                        var n = ge("tr_clone_box_key"),
                            t = val(n).split("_").slice(1).join("_");
                        val(n, a[3] + "_" + t)
                    }
                })
            }
        }, n, getLang("box_save"), function(n) {
            var t = val("tr_clone_box_key");
            trim(t) && (lockButton(n), ajax.post(TR_ADDRESS, {
                act: "clone_key",
                hash: a,
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

    function searchKey(e, a) {
        a = trim(a);
        var n = {
            search: a ? a : null
        };
        a && (n.section = !1), nav.change(n)
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
            onDone: function(a, n) {
                function t(e) {
                    ajax.post(TR_ADDRESS, {
                        act: "check_mem_link",
                        link: e
                    }, {
                        onDone: function(e, a, n) {
                            re(geByClass1("tr_mem_ava")), e ? (domPN(_).appendChild(se('<a href="' + n + '" class="tr_mem_ava ow_ava ow_ava_small" style="background-image: url(\'' + a + "')\"></a>")), domData(_, "user-id", e)) : domData(_, "user-id", null)
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
                a.addButton(getLang("global_save"), function(a) {
                    var t = {
                        act: "save_translator",
                        hash: n.hash
                    };
                    _ ? (t.translator_id = domData(_, "user-id"), t.is_add = 1) : t.translator_id = e, t.translator_id && (t.lang_id = l.selectedItems()[0][0], t.parent_lang_id = o.selectedItems()[0][0], t.is_coordinator = intval(hasClass(geByClass1("tr_translator_is_coordinator"), "on")), ajax.post(TR_ADDRESS, t, {
                        showProgress: lockButton.pbind(a),
                        hideProgress: unlockButton.pbind(a),
                        onDone: function() {
                            var e = curBox();
                            e && e.hide(), nav.reload()
                        }
                    }))
                }, "yes", !0);
                a.addButton(getLang("global_cancel"), a.hide, "no"), e && a.setControlsText('<a onclick="TR.deleteTranslator(this, ' + e + ", '" + n.hash + "')\">" + getLang("global_delete") + "</a>")
            }
        });
        a.removeButtons()
    }

    function deleteTranslator(e, a, n) {
        showProgress(domPN(e), "", "tr_translator_bottom_progress"), hide(e), ajax.post(TR_ADDRESS, {
            act: "delete_translator",
            translator_id: a,
            hash: n
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
            n = JSON.parse(domData(a, "dates")),
            t = domData(a, "selected"),
            o = ge("tr_translators_language_selector"),
            s = JSON.parse(domData(o, "langs")),
            r = domData(o, "selected");
        _translatorsDateSelector = new Dropdown(a, n, {
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
        var n = "";
        each(a, function(a, t) {
            (!searchStrIsLink || searchStrIsLink && (t.user_link == e || t.user_link_orig == e)) && (n += getTemplate("translator_row", t))
        }), geByClass1("tr_translators").innerHTML = n, nav.objLoc.q && nav.objLoc.q == e || (nav.objLoc.q = e, nav.setLoc(nav.objLoc))
    }

    function initLanguagesPage(e) {
        cur.languages = e, cur.languagesIndex = new vkIndexer(e, function(e) {
            return e.name_rus + " " + e.name_eng + " " + e.name_native
        }, function() {
            var e = trim(val("tr_lang_search"));
            e && searchLang(e)
        });
        var a = ge("tr_languages_sort_selector"),
            n = JSON.parse(domData(a, "sorts"));
        _languagesSortDropdown = new Dropdown(a, n, {
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
        var n = "";
        each(a, function(e, a) {
            n += getTemplate("lang_row", a)
        }), val("tr_languages_result", n), nav.objLoc.q && nav.objLoc.q == e || (nav.objLoc.q = e, nav.setLoc(nav.objLoc))
    }

    function openInlineKey(e, a, n) {
        if ("click" != e.type || e.altKey || n) {
            var t = curBox();
            t && "key-edit-dialog" == t.bodyNode.children[0].id && t.hide();
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

    function menu(e, a, n, t, o) {
        if (checkEvent(e)) return !0;
        var s = isEnabledInline() ? "Disable inline translation" : "Enable inline translation",
            r = "",
            l = "",
            i = (a || "").split(",");
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
        return each(["native", "russian", "english", "abbr", "iso", "version"], function(n, t) {
            var o = ge("tr_add_lang__" + t),
                s = trim(val(o));
            return "" == s ? (notaBene(o), a = !0, !1) : void(e[t] = s)
        }), a ? !1 : e
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