var Docs = {
    init: function() {
        if (extend(cur, {
                module: "docs",
                rmenu: ge("docs_rmenu"),
                menuTypesList: ge("ui_rmenu_all_list"),
                menuTagsList: ge("ui_rmenu_tag_list"),
                menuTagsToggle: ge("ui_rmenu_tag_toggle"),
                searchInput: ge("docs_search"),
                searchReset: ge("docs_reset"),
                listCont: ge("docs_list"),
                summary: ge("docs_summary"),
                titleEl: ge("docs_title"),
                listMore: ge("docs_more"),
                searchCont: ge("docs_search_list"),
                searchSummary: ge("docs_search_summary"),
                searchMore: ge("docs_search_more"),
                searchBlock: ge("docs_search_list_block")
            }), Docs.indexDocs(), setTimeout(elfocus.pbind(cur.searchInput), 0), extend(cur, {
                list: {
                    all: cur.docs
                },
                cache: {}
            }), cur.nav.push(function(e, o, r, c) {
                return o[0] != r[0] || (r.section == o.section || e.id) && r.type == o.type ? void 0 : (Docs.changed(r.section, r.type), nav.setLoc(r), !1)
            }), addEvent(window, "scroll", Docs.scrollResize), cur.tpl.office365Notice) {
            var e = intval(ls.get("docs_office_notice_shown"));
            if (3 > e) {
                var o = se(cur.tpl.office365Notice);
                domInsertBefore(o, ge("docs_list")), ls.set("docs_office_notice_shown", e + 1)
            }
        }
    },
    changed: function(e, o) {
        cur.section = e || "all", cur.type = o || "", Docs.getList(), cur.searchInput.setValue(""), uiSearch.onChanged(cur.searchInput, !0), Docs.updateList("", {
            force: !0
        }), cur.searchShown = 0
    },
    scrollResize: function() {
        if (!browser.mobile) {
            var e = cur.listMore,
                o = cur.searchMore;
            if (isVisible(e) || (e = o, isVisible(e))) {
                var r = document.documentElement,
                    c = window.innerHeight || r.clientHeight || bodyNode.clientHeight,
                    s = scrollGetY(),
                    t = getXY(e)[1];
                (s + c > t || cur.searchOffset && s + 2 * c > t) && Docs.showMore()
            }
        }
    },
    getList: function(e) {
        var o;
        if (e = e || cur.section, cur.searchStr ? (o = e + "_" + cur.type + "_" + cur.searchStr, cur.selection = {
                re: new RegExp("(" + cur.searchStr.replace(cur.index.delimiter, "|").replace(/[\/\\\(\)\[\]\{\}\*,]/g, "").replace(/^\||\|$/g, "") + ")", "gi"),
                val: '<span class="highlight">$1</span>'
            }) : o = cur.type ? e + "_" + cur.type : e, cur.list[o]) return cur.found = cur.list[o].length, cur.list[o];
        var r = cur.searchStr ? cur.index.search(cur.searchStr) : cur.docs;
        return cur.list[o] = Docs.filterList(r), cur.found = cur.list[o].length, cur.list[o]
    },
    filterList: function(e) {
        for (var o = [], r = e.length, c = 0; r > c; c++) {
            var s = e[c];
            ("all" == cur.section && (!cur.type || cur.type == s[9]) || "sent" == cur.section && 1 == s[5]) && o.push(s)
        }
        return o
    },
    indexDocs: function() {
        cur.docs && (cur.index = new vkIndexer(cur.docs, function(e) {
            return e[2] + " " + e[6]
        }))
    },
    updateTypes: function() {
        cur.docs && cur.typesChanged && (each(geByClass("_ui_rmenu_subitem", cur.menuTypesList), function() {
            addClass(this, "ui_rmenu_item_hidden")
        }), each(cur.docs, function() {
            removeClass(geByClass1("_docs_type_" + this[9], cur.menuTypesList), "ui_rmenu_item_hidden")
        }), delete cur.typesChanged)
    },
    updateTags: function(e) {
        if (cur.tags && e) {
            e = e.split(",");
            for (var o in e) {
                var r = trim(e[o]);
                cur.tags[r] || (cur.tags[r] = !0, cur.menuTagsList.appendChild(se(rs(cur.tpl.tagItem, {
                    label: r
                }))), removeClass(cur.menuTagsToggle, "ui_rmenu_item_hidden"))
            }
        }
    },
    addDocBox: function() {
        showBox("/docs.php", {
            act: "add_box",
            oid: cur.oid
        }, {
            params: {
                bodyStyle: "padding: 0px; position: relative;"
            }
        })
    },
    addDoc: function(e) {
        cur.docs && (e._order = (cur.docs[0] && cur.docs[0]._order || 0) - 1, cur.docs.unshift(e), Docs.showList(cur.docs.slice(0, cur.perPage)), scrollToTop(200), cur.index.add(e), Docs.updateTags(e[6]), cur.count += 1, cur.found += 1, cur.menuProgress = cur.typesChanged = !0, nav.go(nav.objLoc[0]))
    },
    drawList: function(e, o) {
        o = o || cur.listCont;
        for (var r in e) {
            var c = e[r];
            o.appendChild(se(Docs.getDocHTML(c)))
        }
        checkPageBlocks()
    },
    getDocHTML: function(e) {
        var o = e[0],
            r = e[1],
            c = e[2],
            s = c,
            t = e[3],
            a = e[4],
            i = e[6],
            n = e[7],
            d = e[9] || 0,
            u = e[10] ? e[10] : "",
            l = "/doc" + a + "_" + o,
            h = a == vk.id || n == vk.id || a == cur.oid && 0 > a && cur.groupAdmin,
            p = "";
        _ = "", cur.selection && (s = s.replace(cur.selection.re, cur.selection.val));
        var i = e[6];
        if (i) {
            i = i.split(",");
            for (var g in i) cur.selection && (i[g] = i[g].replace(cur.selection.re, cur.selection.val)), i[g] = rs(cur.tpl.tag, {
                title: i[g]
            });
            i = rs(cur.tpl.tags, {
                tags: i.join(", ")
            })
        }
        var _ = e[8],
            f = " docs_icon_type" + d,
            p = rs(h ? cur.tpl.edit : cur.tpl.add, {
                oid: a,
                item_id: o
            });
        _ = rs(_ ? cur.tpl.thumb : cur.tpl.icon, {
            oid: a,
            item_id: o,
            ext: r,
            url: l,
            thumb: _,
            title: clean(s),
            icon_class: f
        });
        var m = rs(cur.tpl.itemAdditionalInfo, {
            date: t,
            actions: u,
            tags: i
        });
        return rs(cur.tpl.item, {
            oid: a,
            item_id: o,
            thumb: _,
            actions: p,
            title: s,
            title_clean: c,
            url: l,
            additional_info: m
        })
    },
    showList: function(e) {
        if (cur.shown = e.length, cur.shown) {
            if (!cur.listCont) return;
            cur.listCont.innerHTML = "", Docs.drawList(e)
        }
        cur.searchShown = 0
    },
    showMore: function() {
        var e = Docs.getList();
        if (e.length && cur.shown < e.length) {
            var o = e.slice(cur.shown, cur.shown + cur.perPage);
            cur.shown += o.length;
            Docs.drawList(o);
            cur.shown >= cur.found && addClass(cur.listMore, "unshown")
        } else cur.searchStr && Docs.globalSearch(!!cur.searchShown)
    },
    globalSearch: function(more) {
        if (clearTimeout(cur.searchTimeout), !cur.searchStr || cur.loadingDocs) return !1;
        var searchStr = cur.searchStr;
        if (!more && cur.cache[cur.searchStr]) {
            var cache = cur.cache[cur.searchStr];
            return Docs.processGlobalSearch(searchStr, !0, cache[0], cache[1], cache[2])
        }
        return cur.searchTimeout = setTimeout(function() {
            if (searchStr == cur.searchStr) {
                var options = {
                    onDone: function(list, shown, count) {
                        try {
                            var list = eval("(" + list + ")")
                        } catch (e) {
                            return !1
                        }
                        return Docs.processGlobalSearch(searchStr, !more, list, shown, count)
                    },
                    showProgress: function() {
                        cur.loadingDocs = !0, more ? lockButton(cur.searchMore) : uiSearch.showProgress(cur.searchInput)
                    },
                    hideProgress: function() {
                        cur.loadingDocs = !1, more ? unlockButton(cur.searchMore) : uiSearch.hideProgress(cur.searchInput)
                    }
                };
                ajax.post("/docs.php", {
                    act: "search_docs",
                    q: cur.searchStr,
                    offset: more && cur.searchShown || 0,
                    oid: cur.oid
                }, options)
            }
        }, more ? 10 : 300), !0
    },
    processGlobalSearch: function(e, o, r, c, s) {
        return e != cur.searchStr ? !1 : (cur.searchCount = s, toggle(cur.searchBlock, !o || c && r), c && r && (o && (cur.searchCont.innerHTML = "", cur.searchShown = 0), Docs.drawList(r, cur.searchCont), cur.searchShown = cur.searchShown + c), toggleClass(cur.searchMore, "unshown", cur.searchShown >= s || cur.searchShown >= 1e3 || !c || !r), Docs.drawSummary(!0), cur.cache[cur.searchStr] = [r, c, s], !0)
    },
    drawSummary: function(e) {
        var o = Docs.getList().length,
            r = cur.type ? "type" + cur.type : cur.section;
        if (val(cur.summary, o ? langNumeric(o, "%s", !0) : ""), cur.sectionLabels[r] && val(cur.titleEl, cur.sectionLabels[r]), e) {
            var c = cur.searchShown && cur.searchCount;
            val(cur.searchSummary, c ? langNumeric(c, "%s", !0) : "")
        }
    },
    updateList: function(e, o) {
        if (o = o || {}, e == cur.searchStr && !o.force) return !1;
        if (cur.menuProgress && "menu" !== o.from) {
            var r = geByClass1("_docs_section_" + cur.section, cur.rmenu);
            uiRightMenu.switchMenu(r), uiRightMenu.showProgress(r), delete cur.menuProgress
        }
        Docs.updateTypes(), cur.searchStr = e, cur.selection = !1;
        var c = Docs.getList();
        return listLen = c.length, Docs.hideLoadProgress(), cur.searchStr || hide(cur.searchBlock), listLen || (cur.shown = 0, addClass(cur.listMore, "unshown"), cur.listCont.innerHTML = rs(cur.tpl.empty, {
            text: cur.searchStr ? getLang("docs_empty_search").replace("%s", "<b>" + clean(cur.searchStr) + "</b>") : cur.oid < 0 ? getLang("docs_no_group_docs") : getLang("docs_no_user_docs")
        })), (cur.searchStr || listLen) && (Docs.showList(c.slice(0, cur.perPage)), listLen && toggleClass(cur.listMore, "unshown", cur.found <= cur.shown), listLen < cur.perPage) ? (cur.searchStr && Docs.globalSearch(), Docs.drawSummary(), !0) : (hide(cur.searchBlock), Docs.drawSummary(), !0)
    },
    hideLoadProgress: function() {
        window.uiRightMenu && uiRightMenu.hideProgress(domFC(ge("narrow_column")))
    },
    editItem: function(e, o, r) {
        return !showBox("/docs.php", {
            act: "edit_box",
            oid: o,
            did: r
        })
    },
    downloadItem: function(e, o, r, c, s) {
        if (checkEvent(s)) return !0;
        var t = domClosest("_docs_item", e);
        if (!t) return domClosest("_feed_notification", e) && cur && "notifications" == cur.section ? !1 : !0;
        var a = geByClass1("docs_item_icon", t) || geByClass1("docs_item_thumb", t),
            i = a.href,
            n = trim(a.getAttribute("ext"));
        return -1 == "jpg|gif|png|pdf|doc|docx|xls|xlsx|rtf|ppt|pptx".indexOf(n) ? location.href = i + (i.match(/\?/) ? "&" : "?") + "wnd=1&fragment=" + intval(c) : (c && (i = i + (i.match(/\?/) ? "&" : "?") + "fragment=1"), window.open(i)), cancelEvent(s)
    },
    addItem: function(e, o, r, c) {
        cur._addedDocsInfo = cur._addedDocsInfo || {};
        var s = o + "_" + r,
            t = cur._addedDocsInfo[s],
            a = domClosest("_docs_item", e);
        if (t) {
            var i = {
                act: "a_delete",
                hash: c,
                did: t[0],
                oid: t[4]
            };
            ajax.post("/docs.php", i, {
                onDone: function() {
                    if (delete cur._addedDocsInfo[s], i.to_id == cur.oid) {
                        for (var e = cur.docs.length; e--;) {
                            var o = cur.docs[e];
                            o[0] == t[0] && (cur["item_restore" + t[0]] = [cur.docs.splice(e, 1)[0], e], cur.index.remove(cur["item_restore" + t[0]][0]), cur.typesChanged = !0)
                        }
                        cur.count -= 1, cur.found -= 1, cur.list = {}
                    }
                }
            })
        } else {
            var i = {
                act: "a_add",
                doc: s,
                hash: c,
                to_id: cur.groupAdmin ? cur.oid : vk.id
            };
            ajax.post("/docs.php", i, {
                onDone: function(e, o, r) {
                    showDoneBox(e), cur._addedDocsInfo[s] = r, i.to_id == cur.oid && (r._order = (cur.docs[0] && cur.docs[0]._order || 0) - 1, cur.docs.unshift(r), cur.index.add(r), Docs.updateTags(r[6]), cur.typesChanged = !0, _tbLink && _tbLink.loc && (cur.__phinputs = cur.__phinputs || [], globalHistoryDestroy(_tbLink.loc)))
                }
            })
        }
        return toggleClass(a, "doc_added", !t), Docs.rowActive(e, "add"), !1
    },
    deleteItem: function(e, o, r, c) {
        var s = domClosest("_docs_item", e);
        if (s) return e && tooltips.destroy(e), ajax.post("/docs.php", {
            act: "a_delete",
            hash: c,
            did: r,
            oid: o
        }, {
            onDone: function(e) {
                addClass(s, "docs_item_deleted");
                var c = ge("docs_restore_row" + o + "_" + r);
                c && (c.innerHTML = e);
                for (var t = cur.docs.length; t--;) {
                    var a = cur.docs[t];
                    a[0] == r && (cur["item_restore" + r] = [cur.docs.splice(t, 1)[0], t], cur.index.remove(cur["item_restore" + r][0]), cur.typesChanged = !0)
                }
                cur.count -= 1, cur.found -= 1, cur.list = {}
            },
            showProgress: addClass.pbind(s, "docs_item_loading"),
            hideProgress: removeClass.pbind(s, "docs_item_loading")
        }), !1
    },
    restoreItem: function(e, o, r, c) {
        var s = domClosest("_docs_item", e);
        if (s) return ajax.post("/docs.php", {
            act: "a_restore",
            hash: c,
            did: r,
            oid: o
        }, {
            onDone: function(e) {
                removeClass(s, "docs_item_deleted");
                var o = cur["item_restore" + r];
                o && (cur.docs.splice(o[1], 0, o[0]), cur.index.add(o[0]), cur.typesChanged = !0, cur.count += 1, cur.found += 1)
            },
            showProgress: addClass.pbind(s, "docs_item_loading"),
            hideProgress: removeClass.pbind(s, "docs_item_loading")
        }), !1
    },
    tagSearch: function(e, o) {
        var r = trim(e.innerText || e.textContent);
        return cur.searchInput.setValue(r), uiSearch.onChanged(cur.searchInput, !0), Docs.updateList(r, o), elfocus(cur.searchInput), scrollToTop(100), !1
    },
    selectTag: function(e) {
        return geByClass1("ui_rmenu_item_sel", cur.rmenu) == e ? !1 : (uiRightMenu.switchMenu(e), uiRightMenu.showProgress(e), cur.menuProgress = !0, cur.section = "all", cur.type = "", Docs.tagSearch(e, {
            from: "menu"
        }))
    },
    addTag: function(e, o) {
        var r = trim(e.innerText || e.textContent);
        return o.selectItem([r, r])
    },
    rowActive: function(e, o) {
        var r, c = [12, 5, 5],
            s = domClosest("_docs_item", e);
        r = "delete" == o || s && hasClass(s, "doc_added") && "add" == o ? getLang("docs_remove_tt") : "edit" == o ? getLang("docs_edit_tt") : cur.groupAdmin ? getLang("docs_add_to_group_tt") : getLang("docs_add_tt"), r && showTooltip(e, {
            text: function() {
                return r
            },
            showdt: 500,
            black: 1,
            shift: c
        })
    },
    filterMP3: function(e, o) {
        var r = [];
        return each(o, function() {
            if ("mp3" !== this.name.substr(-3).toLowerCase()) r.push(this);
            else {
                var e = ge("docs_upload_error");
                e ? (e.innerHTML = getLang("docs_upload_mp3_fail"), show(domPN(e))) : setTimeout(showFastBox({
                    title: getLang("global_error")
                }, getLang("docs_upload_mp3_fail")).hide, 4e3)
            }
        }), r
    },
    showFileTT: function(e, o, r) {
        return clearTimeout(cur.fileTT), e && o && r ? void("gif" == o && (cur.fileTT = setTimeout(function() {
            var o = r + "?wnd=1";
            cur.fileTTImage = new vkImage, cur.fileTTImage.src = o, cur.fileTTImage.onload = function() {
                cur.fileTTImage && cur.fileTTImage.getAttribute("src") == o && (cur.prevTT && cur.prevTT != e && cur.prevTT.tt && cur.prevTT.tt.hide(), clearTimeout(e.hidetimer), e.hidetimer = !1, cur.prevTT = e, showTooltip(e, {
                    content: '<img class="docs_tt_image" src="' + o + '" align="center"/>',
                    shift: [14, 7, 7],
                    slide: 15,
                    className: "docs_tt",
                    dir: "auto",
                    hasover: !1,
                    nohideover: !0,
                    showdt: 0
                }))
            }, stManager.add(["tooltips.js", "tooltips.css"])
        }, 500))) : !1
    },
    hideFileTT: function() {
        clearTimeout(cur.fileTT), delete cur.fileTTImage
    },
    chooseSwitchTT: function(e) {
        return showTooltip(e, {
            text: function() {
                return e.getAttribute("data-tt")
            },
            black: 1,
            showdt: 500,
            shift: [3, 0, 0]
        })
    },
    chooseSwitch: function(e) {
        return hasClass(curBox().titleWrap, "box_loading") ? !1 : (cur.docsChooseInput.setValue(""), uiSearch.onChanged(cur.docsChooseInput, !0), cur.docsTab = "user_docs" == cur.docsTab ? "group_docs" : "user_docs", void ajax.post("/docs.php", {
            act: "a_choose_doc_box",
            offset: 0,
            to_id: cur.docsToId,
            tab: cur.docsTab,
            switch_tab: 1
        }, {
            onDone: function(o, r, c, s, t) {
                cur.docsChooseRows.innerHTML = o, cur.docsChooseMore.innerHTML = s, toggle(cur.docsChooseMore, !c), cur.docsOffset = r, e.innerHTML = t
            },
            showProgress: curBox().showCloseProgress,
            hideProgress: curBox().hideCloseProgress
        }))
    },
    chooseUpdateList: function(e, o) {
        o != cur.chooseDocsQuery && (clearTimeout(this.searchTimeout), this.searchTimeout = setTimeout(Docs.chooseDocsSearch.pbind(e), o ? 300 : 0))
    },
    chooseDocsSearch: function(e) {
        var o = trim(val(e));
        o != cur.docsSearchStr && (cur.docsSearchStr = o, o ? (cur.docsOffset = 0, Docs.chooseMore()) : (cur.docsOffset = cur.docsStartOffset, cur.docsChooseRows.innerHTML = cur.docsStartHTML))
    },
    chooseMore: function() {
        return cur.docsChooseLoading ? !1 : void ajax.post("/docs.php", {
            act: "a_choose_doc_box",
            offset: cur.docsOffset,
            to_id: cur.docsToId,
            tab: cur.docsTab,
            q: cur.docsSearchStr,
            more: 1
        }, {
            onDone: function(e, o, r) {
                0 == cur.docsOffset ? cur.docsChooseRows.innerHTML = e : cur.docsChooseRows.appendChild(cf(e)), cur.docsOffset = o, r && hide(cur.docsChooseMore)
            },
            showProgress: function() {
                cur.docsChooseLoading = !0, cur.docsOffset ? addClass(cur.docsChooseMore, "choose_loading") : uiSearch.showProgress(cur.docsChooseInput)
            },
            hideProgress: function() {
                cur.docsChooseLoading = !1, cur.docsOffset ? removeClass(cur.docsChooseMore, "choose_loading") : uiSearch.hideProgress(cur.docsChooseInput)
            }
        })
    },
    chooseScroll: function() {
        var e = lastWindowHeight;
        isVisible(cur.docsChooseMore) && e > getXY(cur.docsChooseMore, !0)[1] - (browser.msie6 ? 0 : scrollGetY()) - e && cur.docsChooseMore.click()
    },
    chooseDoc: function(e, o, r, c) {
        if ("A" == c.target.tagName || "A" == c.target.parentNode.tagName) return !0;
        var s = e && geByClass1("_docs_choose_attach", e);
        if (void 0 !== e.selected) cur.lastAddMedia && (cur.lastAddMedia.unchooseMedia(e.selected), e.selected = void 0, removeClass(e, "docs_item_selected"), s && (s.innerHTML = getLang("global_add_media")));
        else {
            var t = cur.attachCount && cur.attachCount() || 0;
            r.lang = {
                profile_choose_doc: getLang("profile_choose_doc")
            }, window.event = window.event || c, cur.chooseMedia("doc", o, r), window.event = void 0, (!cur.attachCount || cur.attachCount() > t) && cur.lastAddMedia && (e.selected = cur.lastAddMedia.chosenMedias.length - 1, addClass(e, "docs_item_selected"), s && (s.innerHTML = getLang("global_cancel")))
        }
        return cancelEvent(c)
    },
    upload: function(e, o) {
        return void 0 !== cur.uplId && window.Upload && Upload.checkFileApi() && Upload.checked && Upload.checked[cur.uplId] ? (cur.docsChooseUpload.click(), !1) : !0
    },
    chooseUploaded: function(e, o) {
        var r = void 0 !== e.ind ? e.ind : e,
            c = ((e.fileName ? e.fileName : e.filename || e).replace(/[&<>"']/g, ""), (e.fileName || e.filename).replace(/[&<>"']/g, "")),
            s = c ? r + "_" + c : e;
        ge("upload" + s + "_progress_wrap") && hide(geByClass1("progress_x", ge("upload" + s + "_progress_wrap"))), ajax.post("/docs.php", extend({
            act: "a_save_doc",
            from: "choose",
            from_place: cur.docsChooseFrom,
            imhash: cur.docsChooseImHash,
            blockPersonal: cur.docsChooseBlockPersonal,
            mail_add: cur.docsChooseMailAdd
        }, o), {
            onDone: function(e, o, r) {
                cur.chooseMedia("doc", e + "_" + o, extend(r, {
                    upload_ind: s
                }))
            },
            onFail: Docs.chooseUploadFailed.pbind(e),
            progress: "form" == Upload.types[r] ? box.progress : null
        })
    },
    chooseUploadFailed: function(e, o) {
        var r = void 0 !== e.ind ? e.ind : e,
            c = (e.fileName ? e.fileName : e.filename || e).replace(/[&<>"']/g, "");
        if ("fileApi" == Upload.types[r] && !Upload.options[r].wiki_editor) {
            var s, t, a = (e.fileName || e.filename).replace(/[&<>"']/g, ""),
                i = a ? r + "_" + a : e;
            cur.imMedia || cur.imwMedia ? (re("upload" + i + "_progress_wrap"), s = (-3 == cur.peer ? cur.imwMedia : cur.imMedia).lnkId, cur.addMedia[s].unchooseMedia(!1)) : cur.addMedia && (re("upload" + i + "_progress_wrap"), s = (cur.attachMediaIndexes || {})[c], s && cur.addMedia[s].unchooseMedia(!1));
            var n = !0;
            o && "string" == typeof o.error && o.error.match(/ERR_UPLOAD_TERMINATED/) && (n = !1), t = o && "wrong_arch_file" == o.error ? getLang("docs_upload_arch_fail") : o && "wrong_mp3_file" == o.error ? getLang("docs_upload_mp3_fail") : getLang("docs_upload_fail"), n && setTimeout(showFastBox({
                title: getLang("global_error")
            }, t).hide, 4e3)
        }
        curBox() && hide(curBox().progress), topError("Upload failed", {
            dt: -1,
            type: 102,
            url: (ge("file_uploader_form" + r) || {}).action
        }), Upload.embed(r)
    },
    chooseUploadStart: function(e, o) {
        var r = void 0 !== e.ind ? e.ind : e,
            c = Upload.options[r],
            s = Upload.types[r];
        cur.docsChooseFiles[r] = o || e, "form" == s && (show(curBox().progress), curBox().changed = !0, geByClass1("file", cur.docsChooseUpload).disabled = !0), "flash" == s && (boxLayerWrap.visibilityHide = !0, cur.docsChooseIsFlash = !0), c.wiki_editor || (cur.notStarted && (boxQueue.hideLast(), delete cur.notStarted), Docs.chooseUploadProgress(e, 0, 0)), removeClass(boxLayerWrap, "dropbox_over")
    },
    chooseUploadProgress: function(e, o, r) {
        var c = void 0 !== e.ind ? e.ind : e;
        if (void 0 === e.ind && (e = cur.docsChooseFiles[c]), Upload.options[c].wiki_editor) cur.docsChooseUploadArea.innerHTML = '<img src="/images/upload.gif"/>';
        else {
            var s = (cur.attachMediaIndexes || {})[c];
            if (void 0 === s || s && cur.addMedia[s].chosenMedia || cur.imMedia) {
                var t = {
                    loaded: o,
                    total: r
                };
                (e.fileName || e.filename) && (t.fileName = (e.fileName || e.filename).replace(/[&<>"']/g, "")), cur.showMediaProgress("photo", c, t)
            }
        }
    },
    chooseUploadComplete: function(info, res) {
        var params, i = void 0 !== info.ind ? info.ind : info,
            fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, "");
        if (res) {
            try {
                params = eval("(" + res + ")")
            } catch (e) {
                params = q2ajx(res)
            }
            if (!params.file) return void Upload.onUploadError(info, params);
            var options = Upload.options[i];
            options && options.bugcomments_editor && (params.bugcomments_editor = options.bugcomments_editor), Docs.chooseUploaded(info, params)
        }
    },
    chooseHideFlashUploader: function() {
        hasClass(boxLayerWrap, "box_layer_hidden") && (removeClass(boxLayerWrap, "box_layer_hidden"), hide(boxLayerWrap)), boxLayerWrap.visibilityHide = !1
    },
    onChooseDragEnter: function(e) {
        boxLayerWrap.scrollTop = 0;
        var o = curBox(),
            r = o.bodyNode;
        if (isVisible(cur.docsChooseRows)) o.bodyH = getSize(r)[1];
        else if (void 0 !== o.bodyH) {
            var c = getXY(r, !0)[1],
                s = getSize(cur.docsChooseDropbox)[1],
                t = getSize(domPN(cur.docsChooseDropbox))[1] - s;
            setStyle(cur.docsChooseDropbox, "height", Math.min(lastWindowHeight - c - t, o.bodyH - t))
        }
        return cancelEvent(e)
    },
    onDragEnter: function() {
        addClass(cur.docsChooseWrap, "dropbox_over"), addClass("box_layer_wrap", "box_layer_wrap--docs_upload")
    },
    onDragOut: function() {
        removeClass(cur.docsChooseWrap, "dropbox_over"), removeClass("box_layer_wrap", "box_layer_wrap--docs_upload")
    },
    hideOfficeNotice: function(e) {
        ls.set("docs_office_notice_shown", 999), hide(domPN(e))
    },
    claimHint: function(e) {
        showTooltip(e, {
            text: getLang("docs_claimed_doc_hint"),
            shift: [24, 3],
            black: 1,
            className: "claim_hint_tooltip",
            dir: "bottom"
        })
    },
    _eof: 1
};
try {
    stManager.done("docs.js")
} catch (e) {}