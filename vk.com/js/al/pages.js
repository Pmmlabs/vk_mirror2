var Pages = {

    init: function(curExtend) {
        cur.module = 'pages';
        cur.contentCache = {};
        extend(cur, curExtend);
        cur.nav.push((function(changed, old, n) {
            if (changed[0] === undefined && changed['section']) {
                this.switchSection(n['section'], changed, old, n);
                return false;
            }
        }).bind(this));
        Pages.initDraft();
    },

    switchTab: function(tab, ev, params) {
        if (ev && (ev.button == 2 || ev.ctrlKey)) {
            return false;
        }
        var el = ge('tab_' + tab);
        if (el) {
            var tabs = geByClass('active_link', ge('pages_tabs'));
            for (var i in tabs) {
                removeClass(tabs[i], 'active_link');
            }
            addClass(el, 'active_link');
        }
        show('pages_progress');
        hide('pages_right_link');
        nav.change(extend({
            section: tab
        }, params));
        return false;
    },

    switchUiTab: function(tab, ev, params) {
        if (checkEvent(ev)) return true;

        var el = geByClass1('_pages_tab_' + tab);
        el = el && geByClass1('ui_tab', el);
        var tabs = gpeByClass('ui_tabs', el);
        uiTabs.switchTab(el);
        uiTabs.showProgress(tabs);
        nav.change(extend({
            section: tab
        }, params));
        return false;
    },

    switchSection: function(section, changed, old, n, draft) {
        if (section == 'history') {
            delete n.hid;
            delete n.hid2;
        }
        var params = clone(n);
        extend(params, {
            section: section,
            act: 'edit',
            load: 1
        });
        if (cur.page) {
            params['page'] = cur.page;
        } else {
            params['oid'] = cur.oid;
            params['id'] = cur.pid;
        }

        var curSection = nav.objLoc.section;
        if (!curSection) {
            if (isVisible('pages_cont_cache_source')) {
                curSection = 'source';
            } else if (isVisible('pages_cont_cache_edit')) {
                curSection = 'edit';
            } else {
                curSection = 'view';
            }
            old.section = curSection;
        }

        var wrap = ge('pages_wrap');
        var childs = wrap.childNodes;
        var cacheId = 'pages_cont_cache_' + section;
        var callback = function() {
            Pages.hideError();
            var loc = extend(n, {
                section: section
            })
            nav.setLoc(loc);
            return;
        }

        var cache = ge(cacheId);

        if (draft) {
            params['draft'] = 1;
        } else if (cache) {
            for (var i in childs) {
                hide(childs[i]);
            }
            show(cache);
            callback();

            if (section != 'view') {
                uiTabs.hideProgress('pages_tabs');
                return;
            }
        }

        if ((section == 'source' || section == 'view') && (curSection == 'edit' || curSection == 'source')) {
            if (section != 'source') {
                params['Body'] = cur.editor.val();
            }
            params['draft'] = 1;
        }
        ajax.post('al_pages.php', params, {
            onDone: function(content, script, info) {
                uiTabs.hideProgress('pages_tabs');
                hide('pages_bottom_preview');
                if (curSection != (old.section || 'view')) {
                    return;
                }
                for (var i in childs) {
                    hide(childs[i]);
                }
                if (cache) {
                    cache.innerHTML = content;
                    show(cache);
                } else {
                    wrap.appendChild(ce('div', {
                        id: cacheId,
                        className: 'pages_cont_cache',
                        innerHTML: content
                    }));
                }

                if (script) eval(script);
                return callback();
            },
            onFail: Pages.showError
        });
    },


    pageAccess: function(layer) {
        var c = (layer) ? wkcur : cur;
        showBox('al_pages.php', {
            act: 'page_access',
            id: c.pid,
            oid: c.oid
        }, {});
    },

    viewVersion: function(hid) {
        re('pages_cont_cache_edit');
        re('pages_cont_cache_source');
        return Pages.switchUiTab('view', event, {
            hid: hid
        });
    },

    compare: function(hid) {
        var row = ge('pages_row' + hid);
        var obj = Array.prototype.slice.apply(geByClass('pages_diff' + hid, row));
        var obj2 = geByClass1('pages_diff' + hid, ge('pages_compare_cont'));
        if (obj2) {
            obj.push(obj2);
        }
        if (hasClass(row, 'pages_compare')) {
            for (var i in obj) {
                obj[i].innerHTML = cur.lang['pages_compare'];
            }
            removeClass(row, 'pages_compare');
            if (cur.compare2 === undefined) {
                Pages.disableCompare();
                slideUp('pages_compare_cont', 100);
                delete cur.compare1;
            } else {
                if (hid == cur.compare2) {
                    ge('pages_compare2').innerHTML = cur.compareEmptyCont;
                    Pages.disableCompare();
                    delete cur.compare2;
                } else {
                    ge('pages_compare1').innerHTML = ge('pages_compare2').innerHTML;
                    ge('pages_compare2').innerHTML = cur.compareEmptyCont;
                    cur.compare1 = cur.compare2;
                    Pages.disableCompare();
                    delete cur.compare2;
                }
            }
        } else {
            for (var i in obj) {
                obj[i].innerHTML = cur.lang['pages_cancel2'];
            }
            addClass(row, 'pages_compare');
            if (cur.compare1 === undefined) {
                cur.compare1 = hid;
                ge('pages_compare1').innerHTML = row.innerHTML;
                slideDown('pages_compare_cont', 100);
                Pages.disableCompare();
            } else {
                if (cur.compare2 !== undefined) {
                    Pages.compare(cur.compare2);
                }
                if (!cur.compareEmptyCont) {
                    cur.compareEmptyCont = ge('pages_compare2').innerHTML;
                }
                cur.compare2 = hid;
                ge('pages_compare2').innerHTML = row.innerHTML;
                Pages.enableCompare();
            }
        }
    },

    compareView: function() {
        var hid = cur.compare1,
            hid2 = cur.compare2;
        return Pages.switchUiTab('view', false, {
            hid: hid,
            hid2: hid2
        });
    },


    disableCompare: function() {
        disableButton('pages_compare_button', true);
    },

    enableCompare: function() {
        disableButton('pages_compare_button', false);
    },


    showError: function(error) {
        if (!error) {
            error = 'Check Internet connection';
        }
        uiTabs.hideProgress('pages_tabs');
        val('pages_error', error);
        show('pages_error_wrap');
        scrollToTop(200);
        return true;
    },

    hideError: function() {
        hide('pages_error_wrap');
    },

    onScroll: function(resize) {
        var y = scrollGetY();

        var buttons = ge('pages_buttons_panel'),
            buttonsCont = ge('pages_buttons_cont'),
            editorCont = ge('pages_wrap');
        if (!buttons) return;

        var py = getXY(buttonsCont)[1];
        if (!cur.bottomSize) {
            cur.bottomSize = getSize(buttons);
        }
        var ph = cur.bottomSize[1],
            wndHeight = window.innerHeight || document.documentElement.clientHeight;

        if (resize && !cur.fixedBottom && wndHeight - ph < py + 20) {
            scrollToY(y + py + 20 - (wndHeight - ph), 0);
        } else if (wndHeight + y - ph < py) {
            if (!cur.fixedBottom || resize) {
                cur.fixedBottom = true;
                var buttonsSize = getSize(buttonsCont);
                addClass(editorCont, 'wke_bottom_fixed');
                setStyle(buttons, {
                    width: buttonsSize[0],
                    height: buttonsSize[1]
                });
                setStyle(buttonsCont, {
                    paddingTop: buttonsSize[1]
                });
            }
        } else {
            if (cur.fixedBottom || resize) {
                cur.fixedBottom = false;
                removeClass(editorCont, 'wke_bottom_fixed');
                setStyle(buttons, {
                    width: null,
                    height: null
                });
                setStyle(buttonsCont, {
                    paddingTop: 0
                });
            }
        }

        var controls = ge('wke_controls'),
            controlsCont = ge('wke_controls_cont');
        if (controlsCont && isVisible('pages_cont_cache_edit')) {
            var pos = getXY(controlsCont);
            if (pos[1] < y + getSize('page_header')[1]) {
                if (!cur.fixedTop) {
                    cur.fixedTop = true;
                    var controlsSize = getSize(controlsCont);
                    addClass(editorCont, 'wke_top_fixed');
                    setStyle(controls, {
                        width: controlsSize[0],
                        height: controlsSize[1]
                    });
                    setStyle(controlsCont, {
                        paddingTop: controlsSize[1]
                    });
                }
            } else {
                if (cur.fixedTop) {
                    cur.fixedTop = false;
                    removeClass(editorCont, 'wke_top_fixed');
                    setStyle(controls, {
                        width: null,
                        height: null
                    });
                    setStyle(controlsCont, {
                        paddingTop: 0
                    });
                }
            }
        }
    },

    saveInfo: function() {
        var curSection = nav.objLoc.section;
        if (!curSection) {
            if (isVisible('pages_cont_cache_edit')) {
                curSection = 'edit';
            } else {
                curSection = 'view';
            }
        }
        var body = cur.editor.val();
        if (!body) {
            return false;
        }
        var params = {
            act: 'save',
            page: cur.page,
            oid: cur.oid,
            id: cur.pid,
            hash: cur.hash,
            'Body': body,
            plain: cur.editor.plainMode ? 1 : 0,
            view: 2
        }
        var titleEl = ge('pages_edit_title');
        if (titleEl) {
            params['title'] = titleEl.value;
        }
        Pages.draftCancel();
        ajax.post('al_pages.php', params, {
            onDone: function(text) {
                var saveEl = ge('pages_save_info_wysiwyg');
                saveEl.innerHTML = text;
                show(saveEl);
                setTimeout(function() {
                    fadeOut(saveEl, 200);
                }, 1500);

                Pages.hideError();

                if (nav.objLoc.hid) {
                    var loc = clone(nav.objLoc);
                    delete loc.hid;
                    delete loc.hid2;
                    nav.setLoc(loc);
                    hide(geByClass1('_pages_header_info', ge('pages_cont_cache_' + (nav.objLoc.section || 'view'))));
                }

                Pages.clearCache();
            },
            showProgress: function() {
                lockButton(ge('pages_save_wysiwyg'));
            },
            hideProgress: function() {
                unlockButton(ge('pages_save_wysiwyg'));
            },
            onFail: Pages.showError
        })
    },

    clearCache: function() {
        var childs = ge('pages_wrap').childNodes;
        for (var i in childs) {
            if (childs[i].className == 'pages_cont_cache' && !isVisible(childs[i])) {
                re(childs[i]);
            }
        }
    },

    getScrollWidth: function() {
        if (!window.scrollbarWidth) {
            text = ce('div', {
                innerHTML: '<div style="height:200px;">1<br/>1<br/>1<br/>1<br/></div>'
            }, {
                overflowY: 'scroll',
                position: 'absolute',
                height: '100px',
                width: '100px'
            });
            var body = geByTag('BODY')[0];
            body.appendChild(test);
            window.scrollbarWidth = test.offsetWidth - geByTag('div', test)[0].offsetWidth - 1;
            body.removeChild(test);
            delete test;
        }
    },

    banUser: function(data, obj, page, hash) {
        obj.innerHTML = '<img src="/images/upload.gif" />';
        var unban = hasClass(obj, 'banned') ? 1 : 0;
        ajax.post('al_pages.php', extend(data, {
            act: 'ban_user',
            page: page || cur.page,
            hash: hash || cur.hash,
            unban: unban
        }), {
            onDone: function(text) {
                obj.innerHTML = text;
                addClass(obj, 'banned');
                if (unban) {
                    removeClass(obj, 'banned');
                } else {
                    addClass(obj, 'banned');
                }
            }
        });
    },

    _animDelX: function(aid, opacity, set_active) {
        var el = ge('pages_delete_row' + aid);
        if (!el) return;
        if (set_active !== undefined) {
            el.active = set_active;
        } else if (el.active) {
            return;
        }
        animate(el, {
            opacity: opacity
        }, 200);
    },

    rowActive: function(nid, tt) {
        Pages._animDelX(nid, 1, 1);
        if (tt) showTooltip(ge('pages_delete_row' + nid), {
            text: tt,
            showdt: 500
        });
    },

    rowInactive: function(nid) {
        Pages._animDelX(nid, 0.5, 0);
    },

    rowOver: function(nid) {
        Pages._animDelX(nid, 0.5);
    },

    rowOut: function(nid) {
        Pages._animDelX(nid, 0);
    },

    deleteNotification: function(nid, hash) {
        var row = ge('pages_notification' + nid);
        //cur['restore'+nid] = row.innerHTML;
        ajax.post('al_pages.php', {
            act: 'a_delete_notification',
            nid: nid,
            hash: hash
        }, {
            onDone: function(text) {
                row.innerHTML = text;
            },
            showProgress: function() {
                setStyle(row, {
                    opacity: 0.5
                });
            },
            hideProgress: function() {
                setStyle(row, {
                    opacity: 1
                });
            }
        })
    },

    preview: function() {
        var curSection = nav.objLoc.section;
        if (!curSection) {
            if (isVisible('pages_cont_cache_source')) {
                curSection = 'source';
            } else if (isVisible('pages_cont_cache_edit')) {
                curSection = 'edit';
            } else {
                curSection = 'view';
            }
        }
        var body = (curSection == 'edit') ? cur.editor.val() : '';

        ajax.post('al_pages.php', {
            Body: body,
            act: 'edit',
            id: cur.pid,
            oid: cur.oid,
            section: 'view',
            'load': 1
        }, {
            onDone: function(content, js, info) {
                var prev = ge('pages_bottom_preview');
                prev.innerHTML = content;
                show(prev);
                scrollToY(getXY(prev)[1] - 104);
            },
            showProgress: lockButton.pbind('pages_preview_edit_link'),
            hideProgress: unlockButton.pbind('pages_preview_edit_link')
        });
    },

    initDraft: function() {
        cur.destroy.push(function() {
            if (cur.editor) {
                clearTimeout(cur.draftTimeout);
                Pages.saveDraft(cur.editor.val());
            }
        });
    },

    draftChanged: function(val, wysiwyg, force) {
        clearTimeout(cur.draftTimeout);
        cur.draftTimeout = setTimeout(function() {
            if (!val && wysiwyg) {
                val = cur.editor.val();
            }
            Pages.saveDraft(val);
        }, 5000);
    },

    saveDraft: function(val) {
        if (val == cur.lastSavedWiki) return;
        var draftCont = geByClass('pages_draft_info', ge('pages_wrap'))[0];
        if (draftCont && isVisible(draftCont)) return;
        var params = {
            act: 'save_draft',
            page: cur.page,
            oid: cur.oid,
            id: cur.pid,
            hash: cur.drafthash,
            'Body': val
        }
        cur.lastSavedWiki = val;
        ajax.post('al_pages.php', params, {
            onFail: function() {
                return true;
            }
        });
    },

    draftCancel: function(save) {
        var draftCont = ge('pages_draft_info');
        if (draftCont && isVisible(draftCont)) {
            slideUp(draftCont, 100);
        }
        if (save) {
            var params = {
                act: 'clear_draft',
                page: cur.page,
                oid: cur.oid,
                id: cur.pid,
                hash: cur.drafthash
            }
            ajax.post('al_pages.php', params);
        }
    },

    restoreDraft: function(btn) {
        lockButton(btn);
        Pages.switchSection(nav.objLoc.section, {}, nav.objLoc, nav.objLoc, true);
    },

    applyVersion: function(hid, oid, pid, mid, hash, obj, callback) {
        var params = {
            act: 'apply_version',
            oid: oid,
            pid: pid,
            hid: hid,
            hash: hash,
            mid: mid
        }
        ajax.post('al_pages.php', params, {
            onDone: function(text) {
                if (callback) return callback(pid, text);
                var loc = clone(nav.objLoc)
                delete loc.hid;
                nav.go(loc);
            },
            showProgress: uiTabs.showProgress.pbind('pages_tabs')
        })
    },

    versionApplied: function(pid, text) {
        var obj = ge('pages_notification' + pid);
        obj.innerHTML = text;
    },

    abuseBox: function(oid, pid, hash) {
        showBox('al_pages.php', {
            act: 'report_box',
            oid: oid,
            pid: pid,
            hash: hash
        });
    },

    actReport: function(report_id, hash, obj, act) {
        ajax.post('al_pages.php', {
            act: act,
            report_id: report_id,
            hash: hash
        }, {
            onDone: function(text) {
                var obj = ge('pages_abuse' + report_id);
                obj.innerHTML = text;
            },
            showProgress: function() {
                if (obj.tagName == 'BUTTON') return lockButton(obj);
                if (!cur.applyVersionCont) {
                    cur.applyVersionCont = obj.innerHTML;
                }
                obj.innerHTML = '<img src="/images/upload.gif"/>';
            },
            hideProgress: function() {
                if (obj.tagName == 'BUTTON') return unlockButton(obj);
                if (cur.applyVersionCont) {
                    obj.innerHTML = cur.applyVersionCont;
                }
            }
        });
    },

    sendReport: function(oid, pid, hid, hid2, mid, hash, obj) {
        ajax.post('al_reports.php', {
            act: 'report',
            item_type: 5,
            oid: oid,
            pid: pid,
            place_id: hid,
            hid: hid,
            hid2: hid2,
            hash: hash,
            type: 4,
            item_id: mid,
            comment: ''
        }, {
            onDone: function(text) {
                obj.parentNode.innerHTML = text;
            },
            showProgress: function() {
                if (!cur.applyVersionCont) {
                    cur.applyVersionCont = obj.innerHTML;
                }
                obj.innerHTML = '<img src="/images/upload.gif"/>';
            },
            hideProgress: function() {
                if (cur.applyVersionCont) {
                    obj.innerHTML = cur.applyVersionCont;
                }
            }
        });
    },

    _eof: 1
};
try {
    stManager.done('pages.js');
} catch (e) {}