var Docs = {

    init: function() {
        extend(cur, {
            module: 'docs',
            rmenu: ge('docs_rmenu'),
            menuTypesList: ge('ui_rmenu_all_list'),
            menuTagsList: ge('ui_rmenu_tag_list'),
            menuTagsToggle: ge('ui_rmenu_tag_toggle'),
            searchInput: ge('docs_search'),
            searchReset: ge('docs_reset'),
            listCont: ge('docs_list'),
            summary: ge('docs_summary'),
            titleEl: ge('docs_title'),
            listMore: ge('docs_more'),
            searchCont: ge('docs_search_list'),
            searchSummary: ge('docs_search_summary'),
            searchMore: ge('docs_search_more'),
            searchBlock: ge('docs_search_list_block')
        });

        Docs.indexDocs();
        setTimeout(elfocus.pbind(cur.searchInput), 0);

        extend(cur, {
            list: {
                all: cur.docs
            },
            cache: {}
        });

        cur.nav.push(function(changed, old, n, opts) {
            if (old[0] == n[0]) {
                if (n.section != old.section && !changed.id || n.type != old.type) {
                    Docs.changed(n.section, n.type);
                    nav.setLoc(n);
                    return false;
                }
            }
        });

        addEvent(window, 'scroll', Docs.scrollResize);


        if (cur.tpl.office365Notice) {
            var noticeShown = intval(ls.get('docs_office_notice_shown'));
            if (noticeShown < 3) {
                var noticeEl = se(cur.tpl.office365Notice);
                domInsertBefore(noticeEl, ge('docs_list'));
                ls.set('docs_office_notice_shown', noticeShown + 1);
            }
        }
    },

    changed: function(section, type) {
        cur.section = section || 'all';
        cur.type = type || '';
        Docs.getList();

        cur.searchInput.setValue('');
        uiSearch.onChanged(cur.searchInput, true);
        Docs.updateList('', {
            force: true
        });
        cur.searchShown = 0;
    },

    scrollResize: function() {
        if (browser.mobile) return;

        var lnk = cur.listMore,
            searchLnk = cur.searchMore;
        if (!isVisible(lnk)) {
            lnk = searchLnk;
            if (!isVisible(lnk)) return;
        }

        var docEl = document.documentElement,
            ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight,
            st = scrollGetY(),
            lnkY = getXY(lnk)[1];

        if (st + ch > lnkY || cur.searchOffset && (st + 2 * ch > lnkY)) {
            Docs.showMore();
        }
    },

    getList: function(section) {
        var key;
        section = section || cur.section;
        if (cur.searchStr) {
            key = section + '_' + cur.type + '_' + cur.searchStr;
            cur.selection = {
                re: new RegExp('(' + cur.searchStr.replace(cur.index.delimiter, '|').replace(/[\/\\\(\)\[\]\{\}\*,]/g, '').replace(/^\||\|$/g, '') + ')', 'gi'),
                val: '<span class="highlight">$1</span>'
            };
        } else if (cur.type) {
            key = section + '_' + cur.type;
        } else {
            key = section;
        }

        if (cur.list[key]) {
            cur.found = cur.list[key].length;
            return cur.list[key];
        }

        var list = (cur.searchStr) ? cur.index.search(cur.searchStr) : cur.docs;

        cur.list[key] = Docs.filterList(list);
        cur.found = cur.list[key].length;
        return cur.list[key];
    },

    filterList: function(input) {
        var list = [];
        var len = input.length;
        for (var i = 0; i < len; i++) {
            var doc = input[i];
            if (cur.section == 'all' && (!cur.type || cur.type == doc[9]) || cur.section == 'sent' && doc[5] == 1) {
                list.push(doc);
            }
        }
        return list;
    },

    indexDocs: function() {
        if (!cur.docs) return;

        cur.index = new vkIndexer(cur.docs, function(obj) {
            return obj[2] + ' ' + obj[6];
        });
    },

    updateTypes: function() {
        if (!cur.docs || !cur.typesChanged) return;

        each(geByClass('_ui_rmenu_subitem', cur.menuTypesList), function() {
            addClass(this, 'ui_rmenu_item_hidden');
        });
        each(cur.docs, function() {
            removeClass(geByClass1('_docs_type_' + this[9], cur.menuTypesList), 'ui_rmenu_item_hidden');
        });
        delete cur.typesChanged;
    },

    updateTags: function(tags) {
        if (!cur.tags || !tags) return;

        tags = tags.split(',');
        for (var i in tags) {
            var tag = trim(tags[i]);
            if (!cur.tags[tag]) {
                cur.tags[tag] = true;
                cur.menuTagsList.appendChild(se(rs(cur.tpl.tagItem, {
                    label: tag
                })));
                removeClass(cur.menuTagsToggle, 'ui_rmenu_item_hidden');
            }
        }
    },

    addDocBox: function() {
        showBox('/docs.php', {
            act: 'add_box',
            oid: cur.oid,
        });
    },

    addDoc: function(doc) {
        if (!cur.docs) {
            return;
        }

        doc._order = (cur.docs[0] && cur.docs[0]._order || 0) - 1;
        cur.docs.unshift(doc);
        Docs.showList(cur.docs.slice(0, cur.perPage));
        scrollToTop(200);
        cur.index.add(doc);
        Docs.updateTags(doc[6]);
        cur.count += 1;
        cur.found += 1;
        cur.menuProgress = cur.typesChanged = true;
        nav.go(nav.objLoc[0]);
    },

    drawList: function(list, cont) {
        cont = cont || cur.listCont;
        for (var i in list) {
            var item = list[i];

            cont.appendChild(se(Docs.getDocHTML(item)));
        }
        checkPageBlocks();
    },

    getDocHTML: function(item) {
        // ��������� ���� �������� � hDocsList
        var id = item[0],
            ext = item[1],
            titleAttr = item[2],
            title = titleAttr,
            dateStr = item[3],
            oid = item[4],
            tags = item[6],
            mid = item[7],
            type = (item[9] || 0),
            licensedActions = item[10] ? item[10] : '',
            url = '/doc' + oid + '_' + id,
            canEdit = (oid == vk.id || mid == vk.id || (oid == cur.oid && oid < 0 && cur.groupAdmin)),
            actions = '';
        thumb = '';

        if (cur.selection) {
            title = title.replace(cur.selection.re, cur.selection.val);
        }

        var tags = item[6];
        if (tags) {
            tags = tags.split(',');
            for (var i in tags) {
                if (cur.selection) {
                    tags[i] = tags[i].replace(cur.selection.re, cur.selection.val);
                }
                tags[i] = rs(cur.tpl.tag, {
                    title: tags[i]
                });
            }
            tags = rs(cur.tpl.tags, {
                tags: tags.join(', ')
            });
        }
        var thumb = item[8],
            iconClass = ' docs_icon_type' + type,
            actions = rs((canEdit ? cur.tpl.edit : cur.tpl.add), {
                oid: oid,
                item_id: id
            });
        thumb = rs((thumb ? cur.tpl.thumb : cur.tpl.icon), {
            oid: oid,
            item_id: id,
            ext: ext,
            url: url,
            thumb: thumb,
            title: clean(title),
            icon_class: iconClass
        });


        var docAdditionalInfo = rs(cur.tpl.itemAdditionalInfo, {
            date: dateStr,
            actions: licensedActions,
            tags: tags,
        });

        return rs(cur.tpl.item, {
            oid: oid,
            item_id: id,
            thumb: thumb,
            actions: actions,
            title: title,
            title_clean: titleAttr,
            url: url,
            additional_info: docAdditionalInfo
        });
    },

    showList: function(list) {
        cur.shown = list.length;
        if (cur.shown) {
            if (!cur.listCont) return;
            cur.listCont.innerHTML = '';
            Docs.drawList(list);
        }

        cur.searchShown = 0;
    },

    showMore: function() {
        var list = Docs.getList();
        if (list.length && cur.shown < list.length) {
            var insert = list.slice(cur.shown, cur.shown + cur.perPage);
            cur.shown += insert.length;
            var html = Docs.drawList(insert);
            if (cur.shown >= cur.found) {
                addClass(cur.listMore, 'unshown');
            }
        } else if (cur.searchStr) {
            Docs.globalSearch(!!cur.searchShown);
        }
    },

    globalSearch: function(more) {
        clearTimeout(cur.searchTimeout);
        if (!cur.searchStr || cur.loadingDocs) return false;

        var ts = +new Date();

        if (!more && cur.found) {
            saveSearchAttemptStats('docs', ts, cur.found, cur.searchStr);
        }

        var searchStr = cur.searchStr;
        if (!more && cur.cache[cur.searchStr]) {
            var cache = cur.cache[cur.searchStr];

            if (!cur.found) {
                saveSearchAttemptStats('docs', ts, cache[2], cur.searchStr);
            }

            return Docs.processGlobalSearch(searchStr, true, cache[0], cache[1], cache[2]);
        }

        cur.searchTimeout = setTimeout(function() {
            if (searchStr != cur.searchStr) return;

            var options = {
                onDone: function(list, shown, count) {
                    try {
                        var list = eval('(' + list + ')');
                    } catch (e) {
                        return false;
                    }
                    if (!more && !cur.found) {
                        saveSearchAttemptStats('docs', ts, count, cur.searchStr);
                    }
                    return Docs.processGlobalSearch(searchStr, !more, list, shown, count)
                },
                showProgress: function() {
                    cur.loadingDocs = true;
                    if (more) {
                        lockButton(cur.searchMore);
                    } else {
                        uiSearch.showProgress(cur.searchInput);
                    }
                },
                hideProgress: function() {
                    cur.loadingDocs = false;
                    if (more) {
                        unlockButton(cur.searchMore);
                    } else {
                        uiSearch.hideProgress(cur.searchInput);
                    }
                }
            };

            ajax.post('/docs.php', {
                act: 'search_docs',
                q: cur.searchStr,
                offset: more && cur.searchShown || 0,
                oid: cur.oid
            }, options);
        }, more ? 10 : 300);

        return true;
    },

    processGlobalSearch: function(searchStr, clear, list, shown, count) {
        if (searchStr != cur.searchStr) return false;

        cur.searchCount = count;
        toggle(cur.searchBlock, !clear || shown && list);
        if (shown && list) {
            if (clear) {
                cur.searchCont.innerHTML = '';
                cur.searchShown = 0;
            }
            Docs.drawList(list, cur.searchCont);
            cur.searchShown = cur.searchShown + shown;
        }
        toggleClass(cur.searchMore, 'unshown', cur.searchShown >= count || cur.searchShown >= 1000 || !shown || !list);
        Docs.drawSummary(true);
        cur.cache[cur.searchStr] = [list, shown, count];

        return true;
    },

    drawSummary: function(updateSearch) {
        var listCount = Docs.getList().length,
            section = cur.type ? 'type' + cur.type : cur.section;
        val(cur.summary, listCount ? langNumeric(listCount, '%s', true) : '');
        if (cur.sectionLabels[section]) {
            val(cur.titleEl, cur.sectionLabels[section]);
        }
        if (updateSearch) {
            var searchCount = cur.searchShown && cur.searchCount;
            val(cur.searchSummary, searchCount ? langNumeric(searchCount, '%s', true) : '');
        }
    },

    updateList: function(str, opts) {
        opts = opts || {};
        if (str == cur.searchStr && !opts.force) return false;

        if (cur.menuProgress && opts.from !== 'menu') {
            var item = geByClass1('_docs_section_' + cur.section, cur.rmenu);
            uiRightMenu.switchMenu(item);
            uiRightMenu.showProgress(item);
            delete cur.menuProgress;
        }

        Docs.updateTypes();
        cur.searchStr = str;
        cur.selection = false;

        var list = Docs.getList()
        listLen = list.length;

        Docs.hideLoadProgress();
        if (!cur.searchStr) {
            hide(cur.searchBlock);
        }

        if (!listLen) {
            cur.shown = 0;
            addClass(cur.listMore, 'unshown');
            cur.listCont.innerHTML = rs(cur.tpl.empty, {
                text: (cur.searchStr ? getLang('docs_empty_search').replace('%s', '<b>' + clean(cur.searchStr) + '</b>') : (cur.oid < 0 ? getLang('docs_no_group_docs') : getLang('docs_no_user_docs')))
            });
        }
        if (cur.searchStr || listLen) {
            Docs.showList(list.slice(0, cur.perPage));
            if (listLen) {
                toggleClass(cur.listMore, 'unshown', cur.found <= cur.shown);
            }
            if (listLen < cur.perPage) {
                if (cur.searchStr) {
                    Docs.globalSearch();
                }
                Docs.drawSummary();
                return true;
            }
        }
        hide(cur.searchBlock);
        Docs.drawSummary();

        return true;
    },

    hideLoadProgress: function() {
        window.uiRightMenu && uiRightMenu.hideProgress(domFC(ge('narrow_column')));
    },

    editItem: function(el, oid, did) {
        return !showBox('/docs.php', {
            act: 'edit_box',
            oid: oid,
            did: did
        });
    },

    /**
     *
     * @param el
     * @param oid
     * @param did
     * @param fragment bool - ����������� �� �������� ����-�����, ���� ��� ������������ ����
     * @param event
     * @returns {*}
     */
    downloadItem: function(el, oid, did, fragment, event) {
        if (checkEvent(event)) {
            return true;
        }
        var item = domClosest('_docs_item', el);
        if (!item) {
            if (domClosest('_feed_notification', el) && cur && cur.section == 'notifications') { // ���, ����������� � ������� �� ����������� ����� � ������ ������������
                return false;
            }
            return true;
        }

        var icon = geByClass1('docs_item_icon', item) || geByClass1('docs_item_thumb', item);
        var href = icon.href;
        var ext = trim(icon.getAttribute('ext'));
        if ('jpg|gif|png|pdf|doc|docx|xls|xlsx|rtf|ppt|pptx'.indexOf(ext) == -1) {
            location.href = href + (href.match(/\?/) ? '&' : '?') + 'wnd=1&fragment=' + intval(fragment);
        } else {
            if (fragment) {
                href = href + (href.match(/\?/) ? '&' : '?') + 'fragment=1';
            }
            window.open(href);
        }
        return cancelEvent(event);
    },

    addItem: function(el, oid, did, hash) {
        cur._addedDocsInfo = cur._addedDocsInfo || {};
        var fullId = oid + '_' + did,
            info = cur._addedDocsInfo[fullId],
            docRow = domClosest('_docs_item', el);

        if (!info) {
            var params = {
                act: 'a_add',
                doc: fullId,
                hash: hash,
                to_id: (cur.groupAdmin ? cur.oid : vk.id)
            };
            ajax.post('/docs.php', params, {
                onDone: function(text, tooltip, doc) {
                    showDoneBox(text);
                    cur._addedDocsInfo[fullId] = doc;

                    if (params.to_id == cur.oid) {
                        doc._order = (cur.docs[0] && cur.docs[0]._order || 0) - 1;
                        cur.docs.unshift(doc)
                        cur.index.add(doc);
                        Docs.updateTags(doc[6]);
                        cur.typesChanged = true;
                        if (_tbLink && _tbLink.loc) {
                            cur.__phinputs = cur.__phinputs || [];
                            globalHistoryDestroy(_tbLink.loc);
                        }
                    }
                }
            });
        } else {
            var params = {
                act: 'a_delete',
                hash: hash,
                did: info[0],
                oid: info[4]
            };
            ajax.post('/docs.php', params, {
                onDone: function() {
                    delete cur._addedDocsInfo[fullId];

                    if (params.to_id == cur.oid) {
                        var len = cur.docs.length;
                        while (len--) {
                            var item = cur.docs[len];
                            if (item[0] == info[0]) {
                                cur['item_restore' + info[0]] = [cur.docs.splice(len, 1)[0], len];
                                cur.index.remove(cur['item_restore' + info[0]][0]);
                                cur.typesChanged = true;
                            }
                        }

                        cur.count -= 1;
                        cur.found -= 1;
                        cur.list = {};
                    }
                }
            });
        }
        toggleClass(docRow, 'doc_added', !info);
        Docs.rowActive(el, 'add');
        return false;
    },

    //������������ �������� ������������, ��� ����� ����� sure � comment
    deleteItem: function(el, oid, did, hash, sure, comment) {
        var doc = domClosest('_docs_item', el);
        if (!doc) return;

        // ����� ��������� ������� window.tooltips. �.� �������� ����� ���� ������������� �� ������-�������, ��� �� �����
        // ������ showTooltip � �� ���������� ���������� ������� ����� stManager.
        el && window.tooltips && tooltips.destroy(el);
        ajax.post('/docs.php', {
            act: 'a_delete',
            hash: hash,
            did: did,
            oid: oid,
            sure: sure,
            comment: comment
        }, {
            onDone: function(text) {
                if (!text) {
                    stManager.add([jsc('internal/group_info.js'), 'groupinfo.css'], function() {
                        window.createConfirmBox(Docs.deleteItem.bind(null, el, oid, did, hash, 1), "��������");
                    });

                    return;
                }
                addClass(doc, 'docs_item_deleted');
                var restoreEl = ge('docs_restore_row' + oid + '_' + did);
                if (restoreEl) {
                    restoreEl.innerHTML = text;
                }

                var len = cur.docs.length;
                while (len--) {
                    var item = cur.docs[len];
                    if (item[0] == did) {
                        cur['item_restore' + did] = [cur.docs.splice(len, 1)[0], len];
                        cur.index.remove(cur['item_restore' + did][0]);
                        cur.typesChanged = true;
                    }
                }

                cur.count -= 1;
                cur.found -= 1;
                cur.list = {};
            },
            showProgress: addClass.pbind(doc, 'docs_item_loading'),
            hideProgress: removeClass.pbind(doc, 'docs_item_loading')
        });
        return false;
    },

    restoreItem: function(el, oid, did, hash) {
        var doc = domClosest('_docs_item', el);
        if (!doc) return;

        ajax.post('/docs.php', {
            act: 'a_restore',
            hash: hash,
            did: did,
            oid: oid
        }, {
            onDone: function(text) {
                removeClass(doc, 'docs_item_deleted');
                var restore = cur['item_restore' + did];
                if (restore) {
                    cur.docs.splice(restore[1], 0, restore[0]);
                    cur.index.add(restore[0]);
                    cur.typesChanged = true;
                    cur.count += 1;
                    cur.found += 1;
                }
            },
            showProgress: addClass.pbind(doc, 'docs_item_loading'),
            hideProgress: removeClass.pbind(doc, 'docs_item_loading')
        });
        return false;
    },

    tagSearch: function(obj, opts) {
        var str = trim(obj.innerText || obj.textContent);
        cur.searchInput.setValue(str);
        uiSearch.onChanged(cur.searchInput, true);
        Docs.updateList(str, opts);
        elfocus(cur.searchInput);
        scrollToTop(100);

        return false;
    },

    selectTag: function(obj) {
        if (geByClass1('ui_rmenu_item_sel', cur.rmenu) == obj) return false;

        uiRightMenu.switchMenu(obj);
        uiRightMenu.showProgress(obj);
        cur.menuProgress = true;
        cur.section = 'all';
        cur.type = '';
        return Docs.tagSearch(obj, {
            from: 'menu'
        });
    },

    addTag: function(obj, dd) {
        var text = trim(obj.innerText || obj.textContent);
        return dd.selectItem([text, text]);
    },

    rowActive: function(obj, type) {
        var shift = [12, 5, 5],
            ttText,
            row = domClosest('_docs_item', obj);
        if (type == 'delete' || row && hasClass(row, 'doc_added') && type == 'add') {
            ttText = getLang('docs_remove_tt');
        } else if (type == 'edit') {
            ttText = getLang('docs_edit_tt');
        } else {
            ttText = cur.groupAdmin ? getLang('docs_add_to_group_tt') : getLang('docs_add_tt');
        }
        if (ttText) {
            showTooltip(obj, {
                text: function() {
                    return ttText;
                },
                showdt: 500,
                black: 1,
                shift: shift
            });
        }
    },

    filterMP3: function(i, files) {
        var filteredFiles = [];
        each(files, function() {
            if (this.name.substr(-3).toLowerCase() !== 'mp3') {
                filteredFiles.push(this);
            } else {
                var errCont = ge('docs_upload_error');
                if (errCont) {
                    errCont.innerHTML = getLang('docs_upload_mp3_fail');
                    show(domPN(errCont));
                } else {
                    setTimeout(showFastBox({
                        title: getLang('global_error')
                    }, getLang('docs_upload_mp3_fail')).hide, 4000);
                }
            }
        });
        return filteredFiles;
    },

    showFileTT: function(obj, ext, url) {
        clearTimeout(cur.fileTT);
        if (!obj || !ext || !url) return false;

        if (ext == 'gif') {
            cur.fileTT = setTimeout(function() {
                var href = url + '?wnd=1';

                cur.fileTTImage = vkImage();
                cur.fileTTImage.src = href;
                cur.fileTTImage.onload = function() {
                    if (!cur.fileTTImage || cur.fileTTImage.getAttribute('src') != href) {
                        return;
                    }

                    if (cur.prevTT && cur.prevTT != obj && cur.prevTT.tt) {
                        cur.prevTT.tt.hide();
                    }
                    clearTimeout(obj.hidetimer);
                    obj.hidetimer = false;
                    cur.prevTT = obj;
                    showTooltip(obj, {
                        content: '<img class="docs_tt_image" src="' + href + '" align="center"/>',
                        shift: [14, 7, 7],
                        slide: 15,
                        className: 'docs_tt',
                        dir: 'auto',
                        hasover: false,
                        nohideover: true,
                        showdt: 0
                    });
                }
                stManager.add(['tooltips.js', 'tooltips.css']);
            }, 500);
        }
    },

    hideFileTT: function() {
        clearTimeout(cur.fileTT);
        delete cur.fileTTImage;
    },

    chooseSwitchTT: function(el) {
        return showTooltip(el, {
            text: function() {
                return el.getAttribute('data-tt');
            },
            black: 1,
            showdt: 500,
            shift: [3, 0, 0]
        });
    },

    chooseSwitch: function(obj) {
        if (hasClass(curBox().titleWrap, 'box_loading')) return false;

        cur.docsChooseInput.setValue('');
        uiSearch.onChanged(cur.docsChooseInput, true);
        cur.docsTab = (cur.docsTab == 'user_docs') ? 'group_docs' : 'user_docs';
        var extFilter = cur.docsCurFilter
        ajax.post('/docs.php', {
            act: 'a_choose_doc_box',
            offset: 0,
            to_id: cur.docsToId,
            tab: cur.docsTab,
            switch_tab: 1,
            ext_filter: extFilter || ''
        }, {
            onDone: function(rows, newOffset, hideMore, moreStr, switchStr) {
                cur.docsChooseRows.innerHTML = rows;
                cur.docsChooseMore.innerHTML = moreStr;
                toggle(cur.docsChooseMore, !hideMore);
                cur.docsOffset = newOffset;
                obj.innerHTML = switchStr;
            },
            showProgress: curBox().showCloseProgress,
            hideProgress: curBox().hideCloseProgress
        });
    },

    chooseUpdateList: function(obj, str) {
        if (str == cur.chooseDocsQuery) {
            return;
        }
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(Docs.chooseDocsSearch.pbind(obj), str ? 300 : 0);
    },

    chooseDocsSearch: function(obj) {
        var str = trim(val(obj));
        if (str == cur.docsSearchStr) {
            return;
        }
        cur.docsSearchStr = str;
        if (str) {
            cur.docsOffset = 0;
            Docs.chooseMore();
        } else {
            cur.docsOffset = cur.docsStartOffset;
            cur.docsChooseRows.innerHTML = cur.docsStartHTML;
            toggle(cur.docsChooseMore, cur.docsStartMore);
        }
    },

    chooseMore: function() {
        if (cur.docsChooseLoading) {
            return false;
        }
        ajax.post('/docs.php', {
            act: 'a_choose_doc_box',
            offset: cur.docsOffset,
            to_id: cur.docsToId,
            tab: cur.docsTab,
            q: cur.docsSearchStr,
            more: 1,
            ext_filter: cur.docsCurFilter
        }, {
            onDone: function(rows, newOffset, hideMore) {
                if (cur.docsOffset == 0) {
                    cur.docsChooseRows.innerHTML = rows;
                } else {
                    cur.docsChooseRows.appendChild(cf(rows));
                }
                cur.docsOffset = newOffset;
                if (hideMore) {
                    hide(cur.docsChooseMore);
                }
            },
            showProgress: function() {
                cur.docsChooseLoading = true;
                if (cur.docsOffset) {
                    addClass(cur.docsChooseMore, 'choose_loading');
                } else {
                    uiSearch.showProgress(cur.docsChooseInput);
                }
            },
            hideProgress: function() {
                cur.docsChooseLoading = false;
                if (cur.docsOffset) {
                    removeClass(cur.docsChooseMore, 'choose_loading');
                } else {
                    uiSearch.hideProgress(cur.docsChooseInput);
                }
            }
        });
    },

    chooseScroll: function() {
        var bt = lastWindowHeight;

        if (isVisible(cur.docsChooseMore) && (bt > getXY(cur.docsChooseMore, true)[1] - (browser.msie6 ? 0 : scrollGetY()) - bt)) {
            cur.docsChooseMore.click();
        }
    },

    chooseDoc: function(el, id, data, ev) {
        if (ev.target.tagName == 'A' || ev.target.parentNode.tagName == 'A') {
            return true;
        }
        var link = el && geByClass1('_docs_choose_attach', el);
        if (el.selected !== undefined) {
            if (cur.lastAddMedia) {
                cur.lastAddMedia.unchooseMedia(el.selected);
                el.selected = undefined;
                removeClass(el, 'docs_item_selected');
                link && (link.innerHTML = getLang('global_add_media'));
            }
        } else {
            var cnt = cur.attachCount && cur.attachCount() || 0;
            window.event = window.event || ev;
            cur.chooseMedia('doc', id, data);
            window.event = undefined;
            if (!cur.attachCount || cur.attachCount() > cnt) {
                if (cur.lastAddMedia) {
                    el.selected = cur.lastAddMedia.chosenMedias.length - 1;
                    addClass(el, 'docs_item_selected');
                    link && (link.innerHTML = getLang('global_cancel'));
                }
            }
        }
        return cancelEvent(ev);
    },

    upload: function(obj, ev) {
        if (cur.uplId !== undefined && window.Upload && Upload.checkFileApi() && Upload.checked && Upload.checked[cur.uplId]) {
            cur.docsChooseUpload.click();
            return false;
        }
        return true;
    },

    chooseUploaded: function(info, params) {
        var i = info.ind !== undefined ? info.ind : info,
            fileName = (info.fileName ? info.fileName : info.filename || info).replace(/[&<>"']/g, '');

        var fname = (info.fileName || info.filename).replace(/[&<>"']/g, '');
        var ind = fname ? i + '_' + fname : info;
        if (ge('upload' + ind + '_progress_wrap')) {
            hide(geByClass1('progress_x', ge('upload' + ind + '_progress_wrap')));
        }

        ajax.post('/docs.php', extend({
            act: 'a_save_doc',
            from: 'choose',
            from_place: cur.docsChooseFrom,
            imhash: cur.docsChooseImHash,
            blockPersonal: cur.docsChooseBlockPersonal,
            mail_add: cur.docsChooseMailAdd
        }, params), {
            onDone: function(oid, id, data) {
                cur.chooseMedia('doc', oid + '_' + id, extend(data, {
                    upload_ind: ind
                }));
            },
            onFail: Docs.chooseUploadFailed.pbind(info),
            progress: (Upload.types[i] == 'form') ? box.progress : null
        });
    },

    chooseUploadFailed: function(info, code) {
        var i = info.ind !== undefined ? info.ind : info,
            fileName = (info.fileName ? info.fileName : info.filename || info).replace(/[&<>"']/g, '');
        if (Upload.types[i] == 'fileApi' && !Upload.options[i].wiki_editor) {
            var fname = (info.fileName || info.filename).replace(/[&<>"']/g, '');
            var lnkId, errMsg, ind = fname ? i + '_' + fname : info;
            if (cur.imMedia || cur.imwMedia) {
                re('upload' + ind + '_progress_wrap');
                lnkId = (cur.peer == -3 ? cur.imwMedia : cur.imMedia).lnkId;
                cur.addMedia[lnkId].unchooseMedia(false);
            } else if (cur.addMedia) {
                re('upload' + ind + '_progress_wrap');
                lnkId = (cur.attachMediaIndexes || {})[fileName];
                if (lnkId) cur.addMedia[lnkId].unchooseMedia(false);
            }
            var showBox = true;

            if (code && typeof code.error === 'string' && code.error.match(/ERR_UPLOAD_TERMINATED/)) {
                showBox = false;
            }

            if (code && code.error == 'wrong_arch_file') {
                errMsg = getLang('docs_upload_arch_fail');
            } else if (code && code.error == 'wrong_mp3_file') {
                errMsg = getLang('docs_upload_mp3_fail');
            } else {
                errMsg = getLang('docs_upload_fail');
            }
            if (showBox) {
                setTimeout(showFastBox({
                    title: getLang('global_error')
                }, errMsg).hide, 4000);
            }
        }
        if (curBox()) {
            hide(curBox().progress);
        }
        topError('Upload failed', {
            dt: -1,
            type: 102,
            url: (ge('file_uploader_form' + i) || {}).action
        });
        Upload.embed(i);
    },

    chooseUploadStart: function(info, res) {
        var i = info.ind !== undefined ? info.ind : info,
            options = Upload.options[i];
        var type = Upload.types[i];
        cur.docsChooseFiles[i] = res || info;
        if (type == 'form') {
            show(curBox().progress);
            curBox().changed = true;
            geByClass1('file', cur.docsChooseUpload).disabled = true;
        }
        if (type == 'flash') {
            boxLayerWrap.visibilityHide = true;
            cur.docsChooseIsFlash = true;
        }

        if (!options.wiki_editor) {
            if (cur.notStarted) {
                boxQueue.hideLast();
                delete cur.notStarted;
            }
            Docs.chooseUploadProgress(info, 0, 0);
        }

        removeClass(boxLayerWrap, 'dropbox_over');
    },

    chooseUploadProgress: function(info, bytesLoaded, bytesTotal) {
        var i = info.ind !== undefined ? info.ind : info;
        if (info.ind === undefined) {
            info = cur.docsChooseFiles[i];
        }
        if (Upload.options[i].wiki_editor) {
            cur.docsChooseUploadArea.innerHTML = '<img src="/images/upload.gif"/>';
        } else {
            var lnkId = (cur.attachMediaIndexes || {})[i];
            if (lnkId === undefined || lnkId && cur.addMedia[lnkId].chosenMedia || cur.imMedia) {
                var data = {
                    loaded: bytesLoaded,
                    total: bytesTotal
                };
                if (info.fileName || info.filename) {
                    data.fileName = (info.fileName || info.filename).replace(/[&<>"']/g, '');
                }
                cur.showMediaProgress('photo', i, data);
            }
        }
    },

    chooseUploadComplete: function(info, res) {
        var params, i = info.ind !== undefined ? info.ind : info,
            fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, '');
        if (!res) return;
        try {
            params = eval('(' + res + ')');
        } catch (e) {
            params = AjaxConvert.fromQueryString(res);
        }
        if (!params.file) {
            Upload.onUploadError(info, params);
            return;
        }
        var options = Upload.options[i];
        if (options && options.bugcomments_editor) {
            params.bugcomments_editor = options.bugcomments_editor;
        }
        Docs.chooseUploaded(info, params);
    },

    chooseHideFlashUploader: function() {
        if (hasClass(boxLayerWrap, 'box_layer_hidden')) {
            removeClass(boxLayerWrap, 'box_layer_hidden');
            hide(boxLayerWrap);
        }
        boxLayerWrap.visibilityHide = false;
    },

    onChooseDragEnter: function(ev) {
        boxLayerWrap.scrollTop = 0;
        var box = curBox(),
            body = box.bodyNode;
        if (isVisible(cur.docsChooseRows)) {
            box.bodyH = getSize(body)[1];
        } else if (box.bodyH !== undefined) {
            var bodyY = getXY(body, true)[1],
                dropboxH = getSize(cur.docsChooseDropbox)[1],
                dropboxPad = getSize(domPN(cur.docsChooseDropbox))[1] - dropboxH;
            setStyle(cur.docsChooseDropbox, 'height', Math.min(lastWindowHeight - bodyY - dropboxPad, box.bodyH - dropboxPad));
        }
        return cancelEvent(ev);
    },

    onDragEnter: function() {
        addClass(cur.docsChooseWrap, 'dropbox_over');
        addClass('box_layer_wrap', 'box_layer_wrap--docs_upload');
    },

    onDragOut: function() {
        removeClass(cur.docsChooseWrap, 'dropbox_over');
        removeClass('box_layer_wrap', 'box_layer_wrap--docs_upload');
    },

    hideOfficeNotice: function(btn) {
        ls.set('docs_office_notice_shown', 999);
        hide(domPN(btn));
    },

    claimHint: function(btn) {
        showTooltip(btn, {
            text: getLang('docs_claimed_doc_hint'),
            shift: [24, 3],
            black: 1,
            className: 'claim_hint_tooltip',
            dir: 'bottom'
        });
    },

    _eof: 1
};
try {
    stManager.done('docs.js');
} catch (e) {}