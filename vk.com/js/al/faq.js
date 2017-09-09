FAQ = {
    getSectionExtend: function() {
        if (nav.objLoc.hasOwnProperty("section")) return {
            section: nav.objLoc.section
        };
        var e = ge("current_section");
        return e ? {
            section: val(e)
        } : {}
    },
    showError: function(e) {
        var t = ge("faq_error");
        if (!t) {
            var a;
            switch (cur.page) {
                case "all":
                    a = ge("faq_list");
                    break;
                case "new":
                case "edit":
                    a = ge("faq_msg_p"), show("faq_msg_p")
            }
            t = a.insertBefore(ce("div", {
                id: "faq_error",
                className: "error"
            }), a.firstChild)
        }
        return re("faq_msg"), hide("faq_progress"), t.innerHTML = e, t.style.backgroundColor = "#FACEBB", animate(t, {
            backgroundColor: "#FFEFE8"
        }, 2e3), scrollToTop(200), !0
    },
    checkTextLength: function(e, t, a) {
        var o = trim(e.value).replace(/\n\n\n+/g, "\n\n");
        if (e.lastLen !== o.length) {
            var i = e.lastLen = o.length,
                r = i - o.replace(/\n/g, "").length;
            a = ge(a), i > t - 100 || r > 10 ? (show(a), i > t ? a.innerHTML = getLang("global_recommended_exceeded", i - t) : r > 10 ? a.innerHTML = getLang("global_recommended_lines", r - 10) : a.innerHTML = getLang("text_N_symbols_remain", t - i)) : hide(a)
        }
    },
    appendExtraField: function(e) {
        var t = ge("faq_optional_extra_fields_list");
        ge("faq_optional_extra_field_example");
        if (t) {
            for (var a = 0; ge("faq_optional_extra_field_" + a);) a++;
            var o = se(getTemplate("faqExtraField", {
                index: a
            }));
            t.appendChild(o), t.children.length >= 10 && hide(e), FAQ.prepareExtraField(o)
        }
    },
    prepareExtraField: function(e) {
        var t = new Dropdown(geByClass1("_type", e), cur.selData.extra_field_types, {
            width: 191,
            introText: "",
            noResult: "",
            multiselect: !1,
            autocomplete: !1,
            big: 1,
            onChange: function(t) {
                toggle(geByClass1("_face_block", e), cur.selData.extra_field_face_check[t])
            }
        });
        data(e, "typeSelector", t), placeholderSetup(geByClass1("_title", e), {
            back: !0
        }), placeholderSetup(geByClass1("_note", e), {
            back: !0
        });
        var a = new Dropdown(geByClass1("_required", e), cur.selData.extra_field_required_types, {
            width: 191,
            introText: "",
            noResult: "",
            multiselect: !1,
            autocomplete: !1,
            big: 1
        });
        data(e, "requiredSelector", a);
        var o = geByClass1("faq_optional_extra_field__close", e);
        addEvent(o, "click", FAQ.removeExtraField.pbind(e))
    },
    removeExtraField: function(e) {
        var t = data(e, "typeSelector");
        t.destroy.bind(t)(), re(e), show("faq_optional_extra_field_add")
    },
    destroyExtraFields: function() {
        for (var e = 0; 10 > e; e++) {
            var t = ge("faq_optional_extra_field_" + e);
            if (t) {
                var a = data(t, "typeSelector"),
                    o = data(t, "requiredSelector");
                a.destroy.bind(a)(), o.destroy.bind(o)()
            }
        }
    },
    checkContentChanged: function() {
        cur.faqText != val("faq_text") || cur.faqTitle != val("faq_title") ? show("faq_ed_notify_translators") : hide("faq_ed_notify_translators")
    },
    saveFAQText: function(e) {
        for (var t = e, a = "", o = {}; t;) o["text" + a] = t.substring(0, 4e3), t = t.substring(4e3), a = "" === a ? "1" : parseInt(a) + 1;
        return o
    },
    saveFAQ: function(e, t, a) {
        var o = trim(val("faq_title")),
            i = trim(val("faq_text")),
            r = trim(val("faq_keywords")),
            s = trim(val("faq_description"));
        if (!o) return notaBene("faq_title");
        var n = [];
        if (cur.screens)
            for (var l in cur.screens) n.push(cur.screens[l][0]);
        if (!i && !n.length) return notaBene("faq_text");
        var d = cur.langsDD && cur.langsDD.val() || 0,
            _ = {
                act: "a_save",
                title: o,
                keywords: r,
                description: s,
                hash: t,
                imgs: n,
                faq_id: cur.id,
                fixed: isChecked("fix_faq"),
                urgent: isChecked("urgent_faq"),
                server: trim(val("faq_server")),
                id_mask: trim(val("faq_id_mask")),
                cdn: trim(val("faq_cdn")),
                language: d,
                parent_id: d ? cur.parentId : 0,
                about_phone: isChecked("faq_about_phone"),
                about_profile: isChecked("faq_about_profile"),
                about_group: isChecked("faq_about_group"),
                about_email: isChecked("faq_about_email"),
                hidden: isChecked("hidden_faq"),
                disable_have_question: isChecked("disable_have_question_faq"),
                save_exit: a ? 1 : 0,
                notify_translators: isChecked("faq_ed_notify_translators") ? 1 : 0,
                is_wiki: isChecked("faq_is_wiki") ? 1 : 0,
                landing: cur.adsCategoryLandingSelector.val()
            },
            c = FAQ.saveFAQText(i);
        if (each(c, function(e, t) {
                _[e] = t
            }), _.section = intval(cur.sectionSelector.val()), cur.selData.supportsCategories[_.section] && (_.categories = cur.categorySelector.val(), !_.categories && 1 != _.section)) return elfocus(cur.categorySelector.input), notaBene(cur.categorySelector.selector);
        if (cur.selData.supportsPlatforms[_.section] && (_.platforms = cur.platformSelector.val(), !_.platforms)) return elfocus(cur.platformSelector.input), notaBene(cur.platformSelector.selector);
        if (39 == _.section && (_.spec_section = cur.specSectionSelector.val()), cur.actionButtonSelector && (_.action_id = intval(cur.actionButtonSelector.val()), 0 != _.action_id && 10 != _.action_id && (_.action_label = trim(val("faq_action_btn_label"))), 7 == _.action_id)) {
            if (!_.action_label) return elfocus("faq_action_btn_label"), notaBene("faq_action_btn_label");
            if (_.action_url = trim(val("faq_action_btn_url")), !_.action_url) return elfocus("faq_action_btn_url"), notaBene("faq_action_btn_url")
        }
        if (ge("faq_optional_extra_field_add") && cur.selData.supportsCustomButtons[_.section]) {
            var u = {},
                f = domChildren(ge("faq_optional_extra_fields_list"));
            each(f, function(e, t) {
                u["ef_" + e + "_type"] = data(t, "typeSelector").val(), u["ef_" + e + "_title"] = val(geByClass1("_title", t)), u["ef_" + e + "_note"] = val(geByClass1("_note", t)), u["ef_" + e + "_required"] = data(t, "requiredSelector").val(), u["ef_" + e + "_face"] = isChecked(geByClass1("_face", t)) ? 1 : 0, u["ef_" + e + "_face_fail"] = val(geByClass1("_face_fail", t))
            }), _ = extend(_, u)
        }
        ge("description_not_needed") && (_.descr_not_needed = isChecked("description_not_needed")), ge("description_placeholder_key") && (_.description_placeholder_key = val("description_placeholder_key")), ge("description_tooltip_key") && (_.description_tooltip_key = val("description_tooltip_key"));
        var p = [],
            g = isChecked("faq_from_chb__all") ? "_all" : 0;
        g ? p.push(g) : each(geByClass("checkbox", "faq_from_chb_list_other"), function(e, t) {
            isChecked(t) && p.push(attr(t, "v"))
        }), _.from_list = p.join(","), e || (e = ge("faq_send")), ajax.post(nav.objLoc[0], _, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    toggleUrgent: function(e) {
        checkbox(e), slideToggle("faq_urgent_details", 300, isChecked(e))
    },
    addScreen: function(e) {
        showFastBox({
            title: getLang("support_adding_screen"),
            width: 440,
            bodyStyle: "padding: 0px"
        }, '<div class="fis_box">  <div class="info_msg fis_about msg_multiline">' + getLang("support_screen_you_can") + '</div>  <div id="fis_add_data"></div>  <div class="fis_warn_text">' + getLang("support_screen_warn") + '</div>  <div id="fis_dropbox" class="dropbox">    <div class="dropbox_wrap">      <div class="dropbox_area">' + getLang("drop_files_here") + "</div>    </div>  </div></div>  "), stManager.add("upload.js", FAQ.initUpload.pbind(e))
    },
    attachCount: function(e) {
        var t = ge("fis_preview" + (e ? "_edit" : "")),
            a = ge("fis_prg_preview" + (e ? "_edit" : ""));
        return t.childNodes.length + a.childNodes.length
    },
    unchoose: function(e, t, a) {
        e && e.tt && tooltips && tooltips.destroy(e), re("fis_preview" + t), a ? delete cur.screensEdit[t] : delete cur.screens[t], toggle("fis_add_lnk" + (a ? "_edit" : ""), FAQ.attachCount(a) < 5)
    },
    choose: function(e, t, a, o) {
        var i = "",
            r = ge("fis_preview" + (t ? "_edit" : ""));
        ge("fis_prg_preview" + (t ? "_edit" : ""));
        isObject(o) || (o = {
            thumb_m: o[0] || "",
            thumb_s: o[1] || "",
            list: o[2] || "",
            view_opts: o[3] || "",
            upload_ind: o.upload_ind || void 0
        }), vkImage().src = o.thumb_s, i = "<div onclick=\"return showPhoto('" + a + "', '" + o.list + "', " + o.view_opts.replace(/"/g, "&quot;") + ');" class="fl_l fis_preview"><img class="fis_photo" src="' + o.thumb_s + '" /></div>';
        var s = ce("div", {
            innerHTML: '<div id="fis_preview' + e + '" class="fis_preview_wrap">' + i + '<div class="fis_x fl_l" ' + (browser.msie ? "title" : "tooltip") + '="' + getLang("dont_attach") + "\" onmouseover=\"if (browser.msie) return; showTooltip(this, {text: this.getAttribute('tooltip'), shift: [12, 5, 3], dir:'bottom', typeClass:'tt_black'})\" onclick=\"FAQ.unchoose(this, '" + e + "'" + (t ? ", 1" : "") + ')"></div></div>'
        }).firstChild;
        addClass(s, "fl_l"), re("upload" + e + "_progress_wrap"), r.appendChild(s), t ? cur.screensEdit[e] = [a, s] : cur.screens[e] = [a, s], cur.fileApiUploadStarted || boxQueue.hideLast(), toggle("fis_add_lnk" + (t ? "_edit" : ""), FAQ.attachCount(t) < 5)
    },
    chooseUploaded: function(e, t) {
        var a = void 0 !== e.ind ? e.ind : e,
            o = (e.fileName ? e.fileName : e, e.fileName ? a + "_" + e.fileName : e);
        if (ge("upload" + o + "_progress_wrap")) {
            var i = geByClass1("fis_prg_x", ge("upload" + o + "_progress_wrap"));
            i && hide(i)
        }
        ajax.post("al_photos.php", extend({
            act: "choose_uploaded_support"
        }, t), {
            onDone: FAQ.choose.pbind(o, Upload.options[a].forEdit),
            onFail: FAQ.chooseFail.pbind(e),
            progress: "form" == Upload.types[a] && curBox() ? curBox().progress : null
        })
    },
    chooseFail: function(e, t) {
        var a = void 0 !== e.ind ? e.ind : e,
            o = (e.fileName ? e.fileName : e, Upload.options[a].forEdit);
        if ("fileApi" == Upload.types[a]) {
            var i = e.fileName ? a + "_" + e.fileName : e;
            re("upload" + i + "_progress_wrap"), FAQ.unchoose(null, i, o)
        }
        curBox() && hide(curBox().progress), topError("Upload failed", {
            dt: -1,
            type: 102,
            url: (ge("file_uploader_form" + a) || {}).action
        }), Upload.embed(a), toggle("fis_add_lnk" + (o ? "_edit" : ""), FAQ.attachCount(o) < 5)
    },
    showScreenProgress: function(e, t) {
        var a = Upload.options[e].forEdit,
            o = ge("fis_prg_preview" + (a ? "_edit" : "")),
            i = intval(t.loaded / t.total * 100),
            r = t.fileName || t.name || "",
            s = r ? e + "_" + r : e,
            n = r ? r.length > 33 ? r.substr(0, 30) + "..." : r : "";
        if (o) {
            if (ge("upload" + s + "_progress_wrap")) setStyle(ge("upload" + s + "_progress"), {
                width: i + "%"
            }), show("upload" + s + "_progress");
            else {
                var l = '<div class="fis_progress_wrap">  <div id="upload' + s + '_progress" class="fis_progress" style="width: ' + i + '%;"></div></div></div>',
                    d = ce("div", {
                        id: "upload" + s + "_progress_wrap",
                        innerHTML: '<div class="fl_l">' + l + "</div>" + (n ? '<div class="fis_label fl_l">' + n + "</div>" : "") + '<div class="fis_prg_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang("dont_attach") + '\', shift: [6, 3, 3]})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + e + ", '" + (r || e) + "');\"></div>",
                        className: "clear_fix"
                    }, {
                        marginTop: "6px"
                    });
                o.appendChild(d), show(o), toggle("fis_add_lnk" + (a ? "_edit" : ""), FAQ.attachCount(a) < 5), i || hide("upload" + s + "_progress")
            }
            return !1
        }
    },
    initUpload: function(forEdit) {
        if (ge("fis_add_data")) {
            cur.screens || (cur.screens = {});
            var opts = cur.uploadData.options;
            Upload.init("fis_add_data", cur.uploadData.url, cur.uploadData.vars, {
                file_name: "photo",
                file_size_limit: 5242880,
                file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
                file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF",
                accept: "image/jpeg,image/png,image/gif",
                file_match: ".(gif|jpg|png)$",
                lang: opts.lang,
                onUploadStart: function(e, t) {
                    var a = void 0 !== e.ind ? e.ind : e,
                        o = Upload.options[a];
                    "form" == Upload.types[a] && (curBox() && show(curBox().progress), geByClass1("file", ge("fis_add_data")).disabled = !0), "fileApi" == Upload.types[a] && (cur.notStarted && (curBox().hide(), delete cur.notStarted), o.multi_progress && this.onUploadProgress(e, 0, 0))
                },
                onUploadComplete: function(info, res) {
                    var params, i = void 0 !== info.ind ? info.ind : info,
                        fileName = info.fileName ? info.fileName : info;
                    try {
                        params = eval("(" + res + ")")
                    } catch (e) {
                        params = q2ajx(res)
                    }
                    if (!params.photos) return void Upload.onUploadError(info);
                    var options = Upload.options[i];
                    FAQ.chooseUploaded(info, params)
                },
                onUploadProgress: function(e, t, a) {
                    var o = void 0 !== e.ind ? e.ind : e;
                    if ("fileApi" == Upload.types[o]) {
                        var i = {
                            loaded: t,
                            total: a
                        };
                        e.fileName && (i.fileName = e.fileName), FAQ.showScreenProgress(o, i)
                    }
                },
                onUploadError: FAQ.chooseFail,
                noFlash: 1,
                multiple: 1,
                multi_progress: 1,
                max_files: 5 - FAQ.attachCount(forEdit),
                clear: 1,
                type: "photo",
                max_attempts: 3,
                server: opts.server,
                error: opts.default_error,
                error_hash: opts.error_hash,
                dropbox: "fis_dropbox",
                forEdit: forEdit
            })
        }
    },
    deleteFAQ: function(e, t) {
        var a = showFastBox({
            title: getLang("support_delete_title"),
            width: 430
        }, getLang("support_delete_confirm"), getLang("support_delete_button"), function() {
            ajax.post(nav.objLoc[0], {
                act: "delete",
                faq_id: e,
                hash: t
            }, {
                progress: a.progress,
                onFail: function(e) {
                    return a.hide(), FAQ.showError(e), !0
                }
            })
        }, getLang("global_cancel"));
        return !1
    },
    toggleRow: function(e, t, a) {
        return a.target || (a.target = a.srcElement || document), "a" == a.target.tagName.toLowerCase() ? !0 : (toggle("faq_short_text" + e, !isVisible("faq_short_text" + e)), toggle("faq_full_text" + e, !isVisible("faq_full_text" + e)), isVisible("faq_full_text" + e) ? addClass(t, "detailed") : removeClass(t, "detailed"), !1)
    },
    setSearchString: function(e, t, a) {
        FAQ.updateSearchString(t, a, !0)
    },
    updateSearchString: function(e, t, a) {
        cur.prevSearch = cur.prevSearch || "", e = trim(e), (cur.prevSearch != e || !e || a) && (clearTimeout(cur.searchTimeout), a ? (cur.prevSearch = e, FAQ.updateSearch(e)) : cur.searchTimeout = setTimeout(function() {
            cur.prevSearch = e, FAQ.updateSearch(e)
        }, 350))
    },
    updateSearchCheckbox: function() {
        FAQ.updateSearch(trim(val("faq_content_search__text")))
    },
    updateSearch: function(e) {
        var t = nav.objLoc;
        e ? t.q = e : delete t.q, isChecked("search_disabled") ? t.disabled = 1 : delete t.disabled, isChecked("search_expired") ? t.expired = 1 : delete t.expired, isChecked("search_with_action") ? t.with_action = 1 : delete t.with_action, isChecked("search_with_ef") ? t.with_ef = 1 : delete t.with_ef, nav.setLoc(t);
        var a = extend({}, t);
        a.act = "load_list", delete a[0], ajax.post(nav.objLoc[0], a, {
            showProgress: uiSearch.showProgress.pbind("faq_content_search__text"),
            hideProgress: uiSearch.hideProgress.pbind("faq_content_search__text"),
            onDone: function(e) {
                var t = se(e),
                    a = ge("faq_list");
                a.parentNode.replaceChild(t, a)
            }
        })
    },
    saveTilesTop: function(e, t, a) {
        var o = {
            act: "save_tiles",
            lang: t,
            hash: a,
            section: cur.section
        };
        each(geByClass("faq_tiles_editor_tile__questions", ge("faq_tiles_editor__tiles")), function(e, t) {
            var a = [];
            each(t.children, function(e, t) {
                a.push(t.id.replace("faq_tiles_editor_tile_question", ""))
            });
            var i = t.id.replace("faq_tiles_editor_tile__questions", "");
            o["faq" + i] = a.join(",")
        }), ajax.post(nav.objLoc[0], o, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    tilesShowSearch: function(e, t) {
        hide(e.target);
        var a = ge("faq_tiles_editor_tile_search__input" + t);
        return show(a), geByClass1("selector_input", a).focus(), !1
    },
    tilesQuestionRemove: function(e, t) {
        var a = ge("faq_tiles_editor_tile_question" + e),
            o = a.parentNode,
            i = o.id.replace("faq_tiles_editor_tile__questions", "");
        FAQ.tilesSorterDestroy(o), re(a), sorter.init(o, {}), o.hasChildNodes() || hide(o), geByClass("faq_tiles_editor_tile_question", o).length < cur.perCategoryLimit && show("faq_tiles_editor_tile_search" + i), t && t.stopPropagation()
    },
    tilesQuestionAdd: function(e, t, a) {
        if (t) {
            var o = ge("faq_tiles_editor_tile_question" + t);
            o && FAQ.tilesQuestionRemove(t);
            var o = ce("div", {
                className: "faq_tiles_editor_tile_question",
                id: "faq_tiles_editor_tile_question" + t
            });
            o.innerHTML = '<span class="faq_tiles_editor_tile_question__title">' + a + '</span>    <span class="faq_tiles_editor_tile_question__remove" onclick="FAQ.tilesQuestionRemove(' + t + ', event);"></span>';
            var i = ge("faq_tiles_editor_tile__questions" + e);
            show(i), FAQ.tilesSorterDestroy(i), i.appendChild(o), sorter.init(i, {}), geByClass("faq_tiles_editor_tile_question", i).length >= cur.perCategoryLimit && hide("faq_tiles_editor_tile_search" + e)
        }
    },
    tilesSorterDestroy: function(e) {
        e.sorter.destroy(), each(geByClass("faq_tiles_editor_tile_question", e), function(e, t) {
            t.removeAttribute("style")
        })
    },
    saveQuestionsSort: function(e, t, a, o, i) {
        var r = {
                act: "save_sort",
                lang: t,
                category: a,
                hash: o,
                section: cur.section
            },
            s = [];
        i || each(geByClass("faq_sort_editor_question", ge("faq_sort_editor__questions")), function(e, t) {
            s.push(t.id.replace("faq", ""))
        }), r.ids = s.join(","), ajax.post(nav.objLoc[0], r, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    sortQuestionsReorder: function(e) {
        var t = e.getAttribute("position"),
            a = FAQ.sortQuestionsGetPosition(e);
        t != a ? addClass(e, "faq_sort_editor_question_moved") : removeClass(e, "faq_sort_editor_question_moved"), each(geByClass("faq_sort_editor_question_moved", ge("faq_sort_editor_question")), function(e, t) {
            var a = t.getAttribute("position"),
                o = FAQ.sortQuestionsGetPosition(t);
            a == o && removeClass(t, "faq_sort_editor_question_moved")
        })
    },
    sortQuestionsGetPosition: function(e) {
        for (var t = 0, a = e; a;) t++, a = a.previousSibling;
        return Math.floor(t / 2) - 1
    },
    saveDictionary: function(e, t, a) {
        hide("faq_dictionary__submit_note"), ajax.post(nav.objLoc[0], {
            act: "dictionary_save",
            lang: t,
            hash: a,
            beginning_words: val("faq_dictionary__beginning_words"),
            middle_words: val("faq_dictionary__middle_words")
        }, {
            onDone: function(e, t) {
                val("faq_dictionary__beginning_words", e), val("faq_dictionary__middle_words", t), show("faq_dictionary__submit_note"), setTimeout(function() {
                    fadeOut("faq_dictionary__submit_note", 500)
                }, 3e3)
            },
            showProgress: function() {
                addClass(e, "processing")
            },
            hideProgress: function() {
                removeClass(e, "processing")
            }
        })
    },
    showHistory: function(e, t, a) {
        return !showBox(nav.objLoc[0], {
            act: "show_history",
            id: e,
            faq_id: t,
            hash: a
        }, {
            params: {
                bodyStyle: "padding: 0px",
                width: 650
            }
        })
    },
    updateFAQ: function(e, t) {
        clearTimeout(cur.faqTimeout), cur.faqTimeout = setTimeout(function() {
            var e = t.value,
                a = trim(e),
                o = a.split(" "),
                i = ge("tickets_text");
            e.length >= 70 && i && !i.value && !cur.flood && (isVisible("tickets_detailed_form") || FAQ.toggleDetailedForm(), t.value = "", i.focus(), i.value = e), isVisible("tickets_detailed_form") || a == cur.searchStr && (o.length < 4 || 4 == o.length && " " != e[e.length - 1]) || (a ? addClass(ge("tickets_search_reset"), "shown") : removeClass(ge("tickets_search_reset"), "shown"), cur.searchStr = a, clearTimeout(cur.searchFAQTimeout), cur.searchFAQTimeout = setTimeout(function() {
                FAQ.searchFAQ(cur.searchStr)
            }.bind(this), 300), browser.mobile || scrollToTop())
        }.bind(this), 10)
    },
    searchFAQ: function(e) {
        " " == e[e.length - 1] && (e[e.length - 1] = "_"), addClass(ge("tickets_search"), "loading"), setStyle(ge("tickets_search_reset"), {
            opacity: .6
        });
        var t = {
            act: "get_faq",
            q: e,
            from: nav.objLoc.act
        };
        nav.objLoc.gid && (t.gid = nav.objLoc.gid), nav.objLoc.app_id && (t.app_id = nav.objLoc.app_id), nav.objLoc.union_id && (t.union_id = nav.objLoc.union_id), ajax.post("tlmd", t, {
            cache: 1,
            hideProgress: removeClass.pbind("tickets_search", "loading"),
            onDone: function(e, t) {
                var a = ge("tickets_title").value,
                    o = trim(a).split(" "),
                    i = o.length > 4 || 4 == o.length && " " == a[a.length - 1];
                e ? ge("tlmd_found_list").innerHTML = se(e).innerHTML : (t && (ge("tickets_faq_button").innerHTML = t), i && (cur.toggled = !0, FAQ.toggleDetailedForm()))
            }
        })
    },
    toggleDetailedForm: function(e) {
        var t = ge("tickets_title");
        if (toggleClass(ge("tickets_content"), "detailed"), isVisible("tickets_detailed_form")) t.setAttribute("placeholder", cur.lang.placeholder_title), removeClass(ge("tickets_search_reset"), "shown"), e && ge("tickets_text").focus();
        else {
            t.setAttribute("placeholder", cur.lang.placeholder_default);
            var a = trim(ge("tickets_title").value);
            a && addClass(ge("tickets_search_reset"), "shown"), cur.toggleCanceled = !0, delete cur.toggled, FAQ.searchFAQ(a), t.focus()
        }
        placeholderSetup(ge("tickets_title"), {
            back: !0,
            reload: !0
        })
    },
    clearSearch: function(e, t) {
        var a = ge("tickets_title");
        setStyle(e, {
            opacity: .6
        }), a.value = "", ge("tickets_title").focus(), FAQ.updateFAQ(t, a)
    },
    goSectionTab: function(e, t) {
        var a = geByClass1("ui_tab_sel", gpeByClass("ui_tabs", e));
        return uiTabs.switchTab(e, {
            noAnim: 1
        }), addClass(a, "ui_tab_sel"), removeClass(gpeByClass("ui_tab_group", e), "ui_tab_group_sel"), nav.go(e, t), !1
    },
    acUrl: function(e, t) {
        return "faq?act=get_faq&section=" + e + (void 0 !== t ? "&ignore_id=" + t : "")
    },
    editorBlockToggle: function(e, t) {
        var a = gpeByClass("_slide_block", e),
            o = geByClass1("_slide_content", a);
        slideToggle(o, 300, t), toggleClass(a, "faq_ed_block_unslided", t)
    },
    addTutorial: function(e) {
        cur.addTutorialHash = e, cur.addTutorialBox = new MessageBox({
            title: getLang("support_faq_add_tutorial")
        }), cur.addTutorialBox.content(cur.addTutorialBoxContent), cur.addTutorialBox.addButton(getLang("global_add"), FAQ.doAddTutorial, "ok", !1, "faq_add_tutorial__save"), cur.addTutorialBox.show(), elfocus("faq_add_tutorial__name")
    },
    doAddTutorial: function() {
        var e = ge("faq_add_tutorial__name"),
            t = val(e),
            a = ge("faq_add_tutorial__save");
        return t ? void ajax.post("faq", {
            act: "a_add_tutorial",
            tutorial: t,
            hash: cur.addTutorialHash
        }, {
            showProgress: lockButton.pbind(a),
            hideProgress: unlockButton.pbind(a),
            onDone: function() {
                cur.addTutorialBox.hide()
            }
        }) : notaBene(e)
    },
    addTutorialTester: function(e, t) {
        cur.addTutorialTesterHash = t, cur.addTutorialTesterTutorial = e, cur.addTutorialTesterBox = new MessageBox({
            title: getLang("support_faq_add_tutorial_tester_title")
        }), cur.addTutorialTesterBox.content(cur.addTutorialTesterBoxContent), cur.addTutorialTesterBox.addButton(getLang("global_add"), FAQ.doAddTutorialTester, "ok", !1, "faq_add_tutorial_tester__save"), cur.addTutorialTesterBox.show(), elfocus("faq_add_tutorial_tester__link")
    },
    doAddTutorialTester: function() {
        var e = ge("faq_add_tutorial_tester__link"),
            t = val(e),
            a = ge("faq_add_tutorial_tester__save");
        return t ? void ajax.post("faq", {
            act: "a_add_tutorial_tester",
            tutorial: cur.addTutorialTesterTutorial,
            hash: cur.addTutorialTesterHash,
            link: t
        }, {
            showProgress: lockButton.pbind(a),
            hideProgress: unlockButton.pbind(a),
            onDone: function() {
                cur.addTutorialBox.hide()
            }
        }) : notaBene(e)
    },
    removeTutorialTester: function(e, t, a, o) {
        ajax.post("faq", {
            act: "a_remove_tutorial_tester",
            uid: t,
            tutorial: a,
            hash: o
        }, {
            onDone: function() {
                var t = gpeByClass("_tester", e);
                re(t)
            }
        })
    },
    toggleTutorial: function(e, t, a, o) {
        ajax.post("faq", {
            act: "a_toggle_tutorial",
            tutorial: t,
            hash: a,
            enabled: o
        }, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            onDone: toggleClass.pbind(ge("faq_tutorials_row__" + t), "faq_tutorials_row_disabled", !o)
        })
    },
    deleteTutorial: function(e, t, a) {
        var o = showFastBox(getLang("global_warning"), getLang("support_faq_confirm_tutorial_delete"), getLang("global_delete"), function() {
            o.hide(), ajax.post("faq", {
                act: "a_remove_tutorial",
                tutorial: t,
                hash: a
            }, {
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e),
                onDone: re.pbind("faq_tutorials_row__" + t)
            })
        }, getLang("global_cancel"))
    },
    showDiff: function(e, t) {
        showBox("faq", {
            act: "a_show_diff",
            id: e,
            hash: t
        }, {})
    },
    _eof: 1
};
try {
    stManager.done("faq.js")
} catch (e) {}