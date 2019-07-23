var Settings = {

    MAX_LEFT_GROUPS: 5,

    go: function(el, ev) {
        var current = Settings.getsect();
        var result = checkEvent(ev);
        if (result === false) {
            current.className = '';
            el.parentNode.className = 'active_link';
        }
        return nav.go(el, ev);
    },
    getsect: function() {
        var current = ge('settings_filters').firstChild
        for (; !hasClass(current, 'active_link');) {
            current = current.nextSibling;
        }
        return current;
    },
    showMsg: function(msg, el) {
        if (!el) el = ge('settings_result');
        if (!msg) {
            hide(el);
        } else {
            showMsg(el, msg, 'ok_msg', true);
            show(el);
        }
        scrollToTop(0);
    },
    showError: function(msg, section) {
        msg = msg || getLang('global_unknown_error');
        var el = section ? ge('settings_error_' + section) : ge('settings_result');
        showMsg(el, msg, 'error', true);
        show(el);
        if (!section) {
            scrollToTop(0);
        }
    },
    toggleBlock: function(ev, input) {
        if (ev && ev.target) {
            var el = ev.target;
            bl = hasClass(el, 'settings_line') ? el : gpeByClass('settings_line', el);
        } else {
            ev = ge(ev);
            var el = geByClass1('settings_right_control', ev),
                bl = hasClass(ev, 'settings_line') ? ev : gpeByClass('settings_line', ev);
        }
        if (!bl || !geByClass1('settings_change_block', bl) || hasClass(bl, 'unfolded') && !hasClass(el, 'settings_right_control')) {
            return;
        }
        if (cur.changingSetting && cur.changingSetting != bl) {
            removeClass(cur.changingSetting, 'unfolded');
            if (window.tooltips) {
                tooltips.hideAll();
            }
        }
        toggleClass(bl, 'unfolded');
        cur.changingSetting = bl;
        if (input) {
            elfocus(input);
        }
    },

    savePrivacyKey: function(key) {
        if (key == 'friends') {
            window.uiPageBlock && uiPageBlock.showSaved('privacy_friends_hide');
            return;
        }
        var url, params = {
            key: key,
            val: Privacy.getValue(key),
            hash: cur.options.hash
        };

        if (key == 'search_access' || key == 'updates' || key == 'company_messages' || key == 'profile_closed') {
            if (key == 'updates') {
                var val = Privacy.getValue(key);
                if (val.substr(0, 1) != '0') {
                    var items = val.substr(2);
                    if (!items.length) {
                        ge('privacy_header').innerHTML = ge('privacy_edit_updates').innerHTML = getLang('settings_updates_no_news');
                    }
                }
            }
            url = 'al_settings.php';
            params.act = 'a_save_special';
        } else {
            url = 'al_friends.php';
            params.act = 'save_privacy';
        }

        clearTimeout(cur['privacy_timer_' + key]);
        cur['privacy_timer_' + key] = setTimeout(ajax.post.pbind(url, params, {
            onDone: function(needReload) {
                if (needReload) {
                    return nav.reload({
                        preventScroll: true,
                        onDone: function(key) {
                            Settings.savePrivacyShowSaved(key);
                            updateNarrow();
                        }.pbind(key)
                    });
                }
                Settings.savePrivacyShowSaved(key);
            }
        }), 500);
    },
    savePrivacyShowSaved: function(key) {
        window.uiPageBlock && uiPageBlock.showSaved('privacy_edit_' + key);
    },
    initPrivacy: function() {
        cur.onPrivacyChanged = Settings.savePrivacyKey;
        cur.privacyNeedConfirm = function(key, val, cb) {
            if (key === 'profile_closed' && intval(val)) {
                var box = new MessageBox({
                    title: getLang('settings_closed_profile_confirm_title')
                });
                box.content(getLang('settings_closed_profile_confirm_text'));
                box.removeButtons().addButton(getLang('settings_closed_profile_confirm_btn'), function() {
                    cb();
                    box.hide();
                });
                box.addButton(getLang('global_cancel'), box.hide, 'no');
                box.show();
                return;
            } else {
                cb();
            }
        };
        if (nav.objLoc.hl) {
            var hl = geByClass1('_' + nav.objLoc.hl);
            Settings.scrollHighlightPrivacy(hl);
        }
    },
    highlightPrivacy: function(el) {
        el = ge(el);
        if (!el) return;

        addClass(el, 'setting_row_selected');
        setTimeout(function() {
            addClass(el, 'setting_row_animated');
            setTimeout(function() {
                removeClass(el, 'setting_row_selected');
                removeClass(el, 'setting_row_animated');
            }, 1000);
        }, 1500);
    },
    scrollHighlightPrivacy: function(el) {
        el = ge(el);

        if (!el) return;

        setTimeout(function() {
            var top = getXY(el)[1];
            var head = getSize('page_header')[1];
            var st = scrollGetY();
            var client = clientHeight();

            if (top < head + st || top > st + client) {
                scrollToY(top);
                setTimeout(Settings.highlightPrivacy.pbind(el), 300);
            } else {
                Settings.highlightPrivacy(el);
            }
        }, 0);
    },

    initSearchBox: function(box, params, preload) {
        extend(cur, params);
        if (preload) {
            ajax.preload(cur.searchBoxAddress, cur.searchBoxParams, preload);
        }

        window.uiScrollBox && uiScrollBox.init(box, {
            onShow: function() {
                addEvent(boxLayerWrap, 'scroll', Settings.boxScrollResize);
                setTimeout(Settings.boxScrollResize, 0);
            },
            onHide: function() {
                removeEvent(boxLayerWrap, 'scroll', Settings.boxScrollResize);
            }
        });
        addEvent(boxLayerWrap, 'scroll', Settings.boxScrollResize);
        Settings.boxScrollResize();
    },
    boxScrollResize: function() {
        if (browser.mobile) {
            return;
        }

        var bt = lastWindowHeight;
        var moreLink = ge(cur.boxMoreLink);

        if (moreLink && isVisible(moreLink) && (bt > getXY(moreLink, true)[1])) {
            cur.boxShowMore();
        }
    },
    moreSearchBoxLoaded: function(rows, offset, showMore) {
        cur.loading = false;
        cur.searchBoxParams.offset = offset;

        var cont = cur.boxRows;
        var rowsContainer = ce('div', {
            innerHTML: rows
        });

        toggle(cur.boxMoreLink, showMore);
        while (rowsContainer.firstChild) {
            cont.appendChild(rowsContainer.firstChild);
        }
    },
    moreSearchBox: function(force, input, str) {
        var more = cur.boxMoreLink;
        if (!force && (!isVisible(more) || hasClass(more, 'loading')) || force && str == cur.searchBoxParams.q) return;
        if (cur.loading) {
            cur.loading = 2;
            return;
        }

        if (force) {
            cur.oldBoxParams = {
                q: cur.searchBoxParams.q,
                offset: cur.searchBoxParams.offset
            };
            extend(cur.searchBoxParams, {
                q: str,
                offset: 0
            });
        }
        ajax.post(cur.searchBoxAddress, cur.searchBoxParams, {
            onDone: function(rows, offset, showMore, mid) {
                if (force) {
                    if (mid) {
                        extend(cur.searchBoxParams, cur.oldBoxParams);
                        val(input, cur.oldBoxParams.q);
                        cur.searchBoxFound && cur.searchBoxFound(mid);;
                        return;
                    }
                    cur.boxRows.innerHTML = rows ? '' : cur.boxNoRowsTpl;
                    curBox().tbToTop();
                }
                Settings.moreSearchBoxLoaded.apply(window, arguments);
            },
            onFail: function() {
                cur.loading = 0;
                return true;
            },
            showProgress: function() {
                addClass(more, 'loading')
            },
            hideProgress: function() {
                removeClass(more, 'loading');
            }
        });
    },
    moreSearchBoxChange: function(q, ev) {
        if (ev && ev.type == 'paste') {
            Settings.moreSearchBox(true, curBox().tbSearchField, q);
        } else if (!q.length) {
            Settings.moreSearchBox(true, curBox().tbSearchField, '');
        }
    },

    initBlacklist: function() {
        if (ge('settings_bl_msg')) {
            setTimeout(removeClass.pbind(ge('settings_bl_msg'), 'msg_appear'), 0);
        }
        elfocus('settings_bl_search');
    },
    searchBlacklist: function(str) {
        if (str) {
            str = str.toLowerCase();
        }
        var emptyCont = ge('settings_bl_empty'),
            notFoundMsg = getLang('settings_blacklist_not_found_by_query'),
            cont = ge('settings_bl_list'),
            rows = geByClass('settings_bl_row', cont),
            shownCount = 0;
        for (var i in rows) {
            var row = rows[i];
            if (str) {
                var nameElement = geByClass1('settings_bl_name', row);
                var name = val(geByTag1('a', nameElement)) || val(geByClass1('name_label'));
                if (name.toLowerCase().indexOf(str) > -1) {
                    show(row);
                    shownCount++;
                } else {
                    hide(row);
                }
            } else {
                show(row);
                shownCount++;
            }
        }
        if (str && !shownCount) {
            var msg = notFoundMsg.split('{query}').join('<b>' + str.replace(/([<>&#]*)/g, '') + '</b>');
            emptyCont.innerHTML = msg;
            show(emptyCont);
            hide('settings_bl_noempty');
        } else {
            hide(emptyCont);
            show('settings_bl_noempty');
        }
    },
    doAddToBlacklist: function(query, input) {
        ajax.post('al_settings.php', {
            act: 'search_blacklist',
            query: query,
            hash: cur.options.blacklist_hash
        }, {
            onDone: function(summary, row, result) {
                curBox().emit('success', result);
                curBox().hide();
                var el = ge('settings_bl_summary');
                if (summary && summary != -1 && el) {
                    el.innerHTML = langNumeric(summary, '%s', true);
                }
                var rowEl = ce('div', {
                        innerHTML: row
                    }).firstChild,
                    listEl = ge('settings_bl_list');
                re(rowEl.id);
                if (listEl) {
                    listEl.insertBefore(rowEl, listEl.firstChild);
                    show('settings_bl_noempty');
                    hide('settings_bl_empty');
                    showMsg('settings_bl_result', result, 'ok_msg', true);
                }
            },
            onFail: function(msg) {
                showMsg('settings_search_rows', msg, 'error', true);
                return true;
            },
            showProgress: function() {
                if (input.tagName == 'BUTTON') {
                    lockButton(input);
                } else {
                    uiSearch.showProgress(input);
                }
            },
            hideProgress: function() {
                if (input.tagName == 'BUTTON') {
                    unlockButton(input);
                } else {
                    uiSearch.hideProgress(input);
                }
            }
        });
    },
    addToBlacklist: function() {
        showBox('al_settings.php', {
            act: 'blacklist_box'
        }, {
            params: {
                dark: true
            }
        });
        return false;
    },
    addToBl: function(mid, hash, link) {
        ajax.post('al_settings.php', {
            act: 'a_add_to_bl',
            id: mid,
            hash: hash,
            from: 'settings'
        }, {
            onDone: function(summary) {
                if (summary) {
                    ge('settings_bl_summary').innerHTML = langNumeric(summary, '%s', true);
                }
                hide('settings_bl_label' + mid);
                link.onclick = function() {
                    Settings.delFromBl(mid, hash, link);
                    return false;
                };
                link.innerHTML = getLang('settings_remove');
            },
            onFail: function(msg) {
                setTimeout(showFastBox({
                    title: getLang('global_error'),
                    dark: 1,
                    bodyStyle: 'padding: 20px; line-height: 160%;'
                }, msg).hide, 2000);
                return true;
            },
            showProgress: function() {
                hide(link);
                show('settings_progress' + mid);
            },
            hideProgress: function() {
                show(link);
                hide('settings_progress' + mid);
            }
        });
    },
    delFromBl: function(mid, hash, link) {
        ajax.post('al_settings.php', {
            act: 'a_del_from_bl',
            id: mid,
            hash: hash,
            from: 'settings'
        }, {
            onDone: function(summary) {
                ge('settings_bl_summary').innerHTML = summary ? langNumeric(summary, '%s', true) : '';
                setStyle('settings_bl_label' + mid, 'display', 'inline');
                link.onclick = function() {
                    Settings.addToBl(mid, hash, link);
                    return false;
                };
                link.innerHTML = getLang('settings_restore_blacklist');
            },
            onFail: function(msg) {
                setTimeout(showFastBox({
                    title: getLang('global_error'),
                    dark: 1,
                    bodyStyle: 'padding: 20px; line-height: 160%;'
                }, msg).hide, 2000);
                return true;
            },
            showProgress: function() {
                hide(link);
                show('settings_progress' + mid);
            },
            hideProgress: function() {
                show(link);
                hide('settings_progress' + mid);
            }
        });
    },
    delTopFromBl: function(mid, hash, link) {
        var progress = ce('img', {
            src: '/images/upload.gif'
        });
        ajax.post('al_settings.php', {
            act: 'a_del_from_bl',
            id: mid,
            hash: hash,
            from: 'settings'
        }, {
            onDone: function(summary) {
                if (summary) {
                    ge('settings_bl_summary').innerHTML = summary ? langNumeric(summary, '%s', true) : '';;
                }
                setStyle('settings_bl_label' + mid, 'display', 'inline');
                var rightLnk = geByTag1('a', geByClass1('settings_bl_action', ge('settings_bl_row' + mid)));
                rightLnk.onclick = function() {
                    Settings.addToBl(mid, hash, rightLnk);
                    return false;
                };
                rightLnk.innerHTML = getLang('settings_restore_blacklist');
                hide('settings_bl_result');
            },
            showProgress: function() {
                link.parentNode.replaceChild(progress, link);
            },
            hideProgress: function() {
                progress.parentNode.replaceChild(link, progress);
            }
        });
    },

    saveSmsNotify: function(btn) {
        lockButton(btn);

        var params = {
            act: 'a_save_sms_notify',
            hash: cur.options.notify_hash
        };
        each(cur.options.notify_sms_keys, function(k, v) {
            params[v] = Privacy.getValue(v);
        });
        params.smsenabled = isChecked('smsenabled') ? 1 : 0;
        if (isChecked('daytime')) {
            params.daytime_from = ge("daytime_from").value;
            params.daytime_to = ge("daytime_to").value;
        } else {
            params.daytime_from = 0;
            params.daytime_to = 0;
        }
        val('settings_notify_sms_result', '');
        ajax.post('al_settings.php', params, {
            onDone: function(result, html, href) {
                unlockButton(btn);
                if (html && href) {
                    showFastBox({
                        title: result,
                        dark: 1,
                        bodyStyle: 'padding: 20px; line-height: 160%;'
                    }, html, getLang('settings_subscribe_to_service_btn'), function() {
                        window.open(href);
                        curBox().hide();
                    }, getLang('box_cancel'), function() {
                        checkbox('smsenabled', 0);
                        Settings.smsNotifyCheck();
                        Settings.saveSmsNotify();
                        curBox().hide();
                    });
                } else {
                    showMsg('settings_notify_sms_result', result, 'ok_msg', true);
                }
            },
            onFail: function(msg) {
                unlockButton(btn);
                checkbox('smsenabled', 0);
                Settings.smsNotifyCheck();
                Settings.saveSmsNotify();
            }
        });
    },

    updateInstantSounds: function(el) {
        toggleClass(geByClass1('_ui_toggler', el), 'on');
        ls.set('sound_notify_off', hasClass(geByClass1('_settings_isounds'), 'on') ? 0 : 1);
        uiPageBlock.showSaved(el);
    },

    saveSiteNotify: function(el) {
        toggleClass(geByClass1('_ui_toggler', el), 'on');

        var params = {
            act: 'a_save_site_notify',
            hash: cur.options.notify_hash,
            ienable: hasClass(geByClass1('_settings_ienable'), 'on') ? 1 : 0,
            itexts: hasClass(geByClass1('_settings_itexts'), 'on') ? 1 : 0
        };

        each(geByClass('_settings_nf_bt'), function(i, v) {
            params['nf_bt_' + v.getAttribute('data-id')] = +hasClass(v, 'on');
        });

        cur.options.notify_privacy_keys && cur.options.notify_privacy_keys.forEach(function(v) {
            params['nf_' + v] = Privacy.getValue(v) | 0;
        });

        clearTimeout(cur.instantNotifyTO);
        clearTimeout(cur.instantNotifySaveTO);
        cur.instantNotifyTO = setTimeout(ajax.post.pbind('al_settings.php', params, {
            onDone: function() {
                cur.instantNotifySaveTO = setTimeout(window.uiPageBlock && uiPageBlock.showSaved.pbind(el), 1000);
            }
        }), 500);
        TopNotifier && TopNotifier.invalidate();
    },

    /**
     * @param {Array} oldValue
     */
    saveBrowserNotify: function(oldValue) {
        var key = 'browser_notification';
        var el = ge('privacy_edit_' + key);
        var state = Number(Privacy.getValue(key));

        addClass(el, 'privacy_link_disabled');

        pushNotifier.canBeEnabled().then(function(canEnable) {
            if (canEnable) {
                pushNotifier.setupSubscription().then(function() {
                    removeClass(el, 'privacy_link_disabled');

                    return pushNotifier.setState(state, cur.options.push_notify_hash);
                }).catch(function(error) {
                    if (PushNotifier.PUSH_NOTIFIER_BLOCKED_BY_BROWSER_SETTINGS === error) {
                        pushNotifier.showPopupAllowNotification();
                    } else {
                        showFastBox(getLang('global_error'), getLang('notifications_native_common_error'));
                    }

                    Privacy.setValue(key, oldValue);
                    removeClass(el, 'privacy_link_disabled');
                });
            } else {
                Privacy.setValue(key, oldValue);
                removeClass(el, 'privacy_link_disabled');
                showFastBox(getLang('global_error'), getLang('notifications_native_common_error'));
            }
        });
    },

    saveGroupNotify: function(el, gid) {
        if (hasClass(geByClass1('_ui_toggler', el), 'ui_toggler_disable')) {
            return false;
        }
        toggleClass(geByClass1('_ui_toggler', el), 'on');

        var params = {
            act: 'a_save_group_notify',
            hash: cur.options.notify_hash,
            gid: gid,
        };

        each(geByClass('ui_toggler', domClosest('wide_column', el)), function(i, v) {
            params[v.getAttribute('data-id')] = +hasClass(v, 'on');
        });

        clearTimeout(cur.instantNotifyTO);
        clearTimeout(cur.instantNotifySaveTO);
        cur.instantNotifyTO = setTimeout(ajax.post.pbind('al_settings.php', params, {
            onDone: function() {
                cur.instantNotifySaveTO = setTimeout(window.uiPageBlock && uiPageBlock.showSaved.pbind(el), 1000);
            }
        }), 500);
        TopNotifier && TopNotifier.invalidate();
    },
    checkboxSiteNotify: function(el, ev) {
        if (ev.target && hasClass(ev.target, 'item_sel')) {
            return;
        }
        checkbox(el);
        Settings.saveSiteNotify(el);
    },

    saveMailNotify: function(el) {
        var params = {
            act: 'a_save_mail_notify',
            hash: cur.options.notify_hash
        };
        params.mail_period = Privacy.getValue('mail_period');
        each(cur.options.notify_mail_keys, function(k, v) {
            params[v] = isChecked(v) ? 1 : 0;
        });

        clearTimeout(cur.mailNotifyTO);
        cur.mailNotifyTO = setTimeout(ajax.post.pbind('al_settings.php', params, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind(el)
        }), 500);
    },

    /**
     * @param {String} key
     * @param {Array} oldValue
     */
    saveNotifyPrivacyKey: function(key, oldValue) {
        if (key === 'browser_notification') {
            Settings.saveBrowserNotify(oldValue);
        } else if (key === 'mail_period') {
            Settings.saveMailNotify('privacy_edit_' + key);
            if (Privacy.getValue(key) == 3) {
                hide('mail_options');
            } else {
                show('mail_options');
            }
        } else if (cur.options.notify_privacy_keys && ~cur.options.notify_privacy_keys.indexOf(key)) {
            Settings.saveSiteNotify('privacy_edit_' + key);
        } else if (key === 'sms_pm_notify') {
            if (Privacy.getValue(key) != 0) {
                hide('sms_pm_privacy_row');
            } else {
                show('sms_pm_privacy_row');
            }
        }
    },

    initNotify: function() {
        cur.options.msg && Settings.showMsg(cur.options.msg);

        var isounds_toggler = geByClass1('_settings_isounds');
        toggleClass(isounds_toggler, 'on', !ls.get('sound_notify_off'));
        removeClassDelayed(isounds_toggler, 'no_transition');

        cur.reloadOnMailBind = true;
        cur.onPrivacyChanged = Settings.saveNotifyPrivacyKey;

        var daytime_options = [],
            daytime_hour = 24;
        while (daytime_hour--) {
            daytime_options.unshift((daytime_hour < 10 ? '0' : '') + daytime_hour + ':00');
        }

        cur.options.time_from !== void 0 && new Dropdown(ge("daytime_from"), daytime_options, {
            selectedItems: cur.options.time_from,
        });
        cur.options.time_to !== void 0 && new Dropdown(ge("daytime_to"), daytime_options, {
            selectedItems: cur.options.time_to,
        });
    },
    smsNotifyCheck: function() {
        if (isChecked('smsenabled')) {
            slideDown(ge("sms_options"), 200);
            show('sms_options_msg');
        } else {
            if (isVisible('sms_options')) {
                hide('sms_options_msg');
                slideUp(ge("sms_options"), 200);
            }
        }
    },
    smsDayTimeCheck: function() {
        if (isChecked('daytime')) {
            slideDown(ge("daytime_from_to"), 200);
        } else {
            slideUp(ge("daytime_from_to"), 200);
        }
    },

    checkPIN: function(o) {
        var v = o.value.replace(/[^0-9]/g, "");
        if (o.value != v) o.value = v;
    },
    updatePIN: function(hash) {
        lockButton(ge('pin_btn'));
        val('settings_pin_result', '');
        var params = {
            act: 'a_change_pin',
            pin: ge('pin').value,
            hash: hash
        };
        ajax.post('al_settings.php', params, {
            onDone: function(result) {
                unlockButton(ge('pin_btn'));
                val('settings_pin_value', params.pin);
                showMsg('settings_pin_result', result, 'ok_msg', true);
            },
            onFail: function(result) {
                unlockButton(ge('pin_btn'));
                showMsg('settings_pin_result', result, 'error', true);
                return true;
            }
        });
    },

    getAdminSelectShowCt: function(data) {
        return Object.keys(data).filter(function(key) {
            return data[key];
        }).length;
    },

    initMenuBox: function(box, type, settings) {
        this.initMenuEvents(box);
        box.setOptions({
            onHide: function() {
                if (cur.adminGroupsDirty) {
                    if (window.Notifier) {
                        Notifier.resetCommConnection();
                    }
                    ajax.post('al_settings.php', {
                        act: 'a_get_left_menu'
                    }, {
                        onDone: function(lm) {
                            geByTag1('ol', ge('side_bar')).innerHTML = lm;
                        }
                    });
                }
                type == 2 && isFunction(cur.settingsBoxSetLeftMenuAppCallback) && cur.settingsBoxSetLeftMenuAppCallback(false);
            }
        });

        cur.menuSettings = settings;
        this.updateMenuBoxCount(type);
    },

    initMenuEvents: function(box) {
        var scrollNode = geByClass1('olist', box.bodyNode),
            tabs = geByClass1('summary_tabs', box.bodyNode);

        setStyle(tabs, 'display', 'inline-block');
        var w = getSize(tabs)[0] + parseInt(getStyle(tabs, 'marginLeft')) + parseInt(getStyle(tabs, 'marginRight'));
        if (w > 450) {
            box.setOptions({
                width: Math.ceil(w)
            });
        }
        setStyle(tabs, 'display', null);
        addEvent(scrollNode, 'scroll', this.onMenuBoxScroll.pbind(box, scrollNode));
        this.onMenuBoxScroll(box, scrollNode);
    },

    onMenuBoxScroll: function(box, scrollNode) {
        var bodyWrap = domPN(box.bodyNode),
            sh = scrollNode.scrollHeight,
            st = scrollNode.scrollTop,
            h = scrollNode.offsetHeight || scrollNode.clientHeight;

        toggleClass(bodyWrap, 'olist_topsh', st > 0);
        toggleClass(bodyWrap, 'olist_botsh', st + h < sh);
    },

    updateMenuBoxCount: function(type) {
        var box = curBox(),
            settings = cur.menuSettings[type] || {},
            ct = Settings.getAdminSelectShowCt(settings),
            text = '';

        if (type == 1 || type == 2) {
            text = '<span class="settings_menu_box_counter">' + getLang('settings_admin_groups_left').replace('{count}', ct).replace('{amt}', Settings.MAX_LEFT_GROUPS) + '</span>';
        }
        box.setControlsText(text);
    },

    toggleMenuBoxRow: function(el, type, id) {
        var settings = cur.menuSettings[type] || {},
            ct = Settings.getAdminSelectShowCt(settings),
            value = settings[id];

        // cur.adminGroupsDirty = true;
        curBox().changed = true;

        if (type == 1 || type == 2) {
            toggleClass(gpeByClass('olist_section', el), 'settings_menu_rows_disabled', !value && ct >= Settings.MAX_LEFT_GROUPS - 1);

            if (!value && ct >= Settings.MAX_LEFT_GROUPS) {
                return false;
            }
        }

        toggleClass(el, 'olist_item_wrap_on', !value);
        settings[id] = value ? 0 : 1;
        Settings.updateMenuBoxCount(type);
        return false;
    },

    switchMenuBoxSection: function(el, section) {
        var box = curBox();
        each(geByClass('olist_section', box.bodyNode), function() {
            hide(this);
        });
        show('settings_menu_' + section);
        geByClass1('olist', box.bodyNode).scrollTop = 0;
        Settings.updateMenuBoxCount(section);
    },

    saveMenu: function(hash, btn) {
        var box = curBox(),
            apps = [],
            groups = [],
            apps_all = [],
            service_hidden = [],
            params = {
                hash: hash,
                act: 'a_change_services'
            },
            app_is_added = false;
        for (var type = 0; type <= 3; type++) {
            var settings = cur.menuSettings[type] || {};
            each(settings, function(name, selected) {
                switch (type) {
                    case 1:
                        if (selected) {
                            groups.push(name);
                        }
                        break;
                    case 2:
                        apps_all.push(name);
                        if (selected) {
                            if (cur.aid == name) app_is_added = true;
                            apps.push(name);
                        }
                        break;
                    case 3:
                        if (!selected) {
                            service_hidden.push(name);
                        }
                        break;
                    default:
                        params[name] = selected;
                }
            });
        };
        if (apps_all.length) {
            params.apps_all = apps_all.join(',');
            params.apps_on = apps.join(',');
        }
        params.groups_list = groups.join(',');
        params.service_hidden = service_hidden.join(',');
        ajax.post('al_settings.php', params, {
            onDone: function(html) {
                geByTag1('ol', ge('side_bar')).innerHTML = html;
                window.uiPageBlock && uiPageBlock.showSaved('settings_services');
                isFunction(cur.settingsBoxSetLeftMenuAppCallback) && cur.settingsBoxSetLeftMenuAppCallback(app_is_added);
                box.hide();
                window.Apps && Apps.updateAddToMenuAction();
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },

    giftsCheck: function() {
        clearTimeout(cur.giftsUpdateTO);
        cur.giftsUpdateTO = setTimeout(Settings.giftsSubmit, 200);
    },
    giftsSubmit: function() {
        ajax.post('/al_profile.php', {
            act: 'hide_gifts',
            hash: cur.options.hide_gifts_hash,
            shown: ge('settings_hide_gifts').checked ? 0 : 1
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind('cposts')
        });
    },

    gifCheck: function() {
        clearTimeout(cur.gifUpdateTO);
        cur.gifUpdateTO = setTimeout(Settings.gifSubmit, 200);
    },
    gifSubmit: function() {
        ajax.post('/al_settings.php', {
            act: 'a_change_autoplay_gif',
            hash: cur.options.gif_autoplay_hash,
            no_autoplay: ge('settings_gif_autoplay').checked ? 0 : 1
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind('cposts')
        });
    },

    accessCheck: function() {
        clearTimeout(cur.accessUpdateTO);
        cur.accessUpdateTO = setTimeout(Settings.accessSubmit, 200);
    },
    accessSubmit: function() {
        ajax.post('/al_settings.php', {
            act: 'a_toggle_access_mode',
            hash: cur.options.a11y_hash,
            mode: intval(ge('settings_a11y').checked)
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind('settings_a11y')
        });
    },

    stickersHintsCheck: function() {
        clearTimeout(cur.stickersHintsTO);
        cur.stickersHintsTO = setTimeout(Settings.stickersHintsSubmit, 200);
    },
    stickersHintsSubmit: function() {
        ajax.post('/al_settings.php', {
            act: 'a_change_stickers_hints',
            hash: cur.options.stickers_hints_hash,
            hints: ge('settings_stickers_hints').checked ? 1 : 0
        }, {
            onDone: function() {
                window.uiPageBlock && uiPageBlock.showSaved('cposts');
                window.Emoji && Emoji.updateTabs.apply(window, arguments);
            }
        });
    },

    videoCheck: function() {
        clearTimeout(cur.videoUpdateTO);
        cur.videoUpdateTO = setTimeout(Settings.videoSubmit, 200);
    },
    videoSubmit: function() {
        ajax.post('/al_settings.php', {
            act: 'a_change_autoplay_video',
            hash: cur.options.video_autoplay_hash,
            video_autoplay: ge('settings_video_autoplay').checked ? 1 : 0
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind('cposts')
        });
    },

    videostartCheck: function() {
        clearTimeout(cur.videostartUpdateTO);
        cur.videostartUpdateTO = setTimeout(Settings.videostartSubmit, 200);
    },
    videostartSubmit: function() {
        ajax.post('/al_settings.php', {
            act: 'a_change_autostart_video',
            hash: cur.options.video_autostart_hash,
            video_autostart: ge('settings_video_autostart').checked ? 1 : 0
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind('cposts')
        });
    },

    drCheck: function() { // disable rights
        clearTimeout(cur.drUpdateTO);
        cur.drUpdateTO = setTimeout(Settings.drSubmit, 200);
    },
    drSubmit: function() { // disable rights
        ajax.post('/al_settings.php', {
            act: 'a_change_dr',
            hash: cur.options.dr_hash,
            dr: ge('settings_dr').checked ? 1 : 0
        }, {
            onDone: nav.reload.pbind()
        });
    },

    externalAuthCheck: function() {
        clearTimeout(cur.externalAuthUpdateTO);
        cur.externalAuthUpdateTO = setTimeout(function() {
            ajax.post('al_settings.php', {
                act: 'a_change_external_auth',
                hash: cur.options.external_auth_hash,
                state: ge('settings_external_auth').checked ? 1 : 0
            }, {
                onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind('cposts')
            });
        }, 200);
    },
    videoadsCheck: function() {
        clearTimeout(cur.videoadsUpdateTO);
        cur.videoadsUpdateTO = setTimeout(Settings.videoadsSubmit, 200);
    },
    videoadsSubmit: function() {
        ajax.post('/al_settings.php', {
            act: 'a_change_ads_video',
            hash: cur.options.video_ads_hash,
            video_ads: ge('settings_video_ads').checked ? 1 : 0
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind('cposts')
        });
    },

    vkPayEndpointCheck: function() {
        clearTimeout(cur.vkPayEndpointUpdateTO);
        cur.vkPayEndpointUpdateTO = setTimeout(Settings.vkPayEndpointSubmit, 200);
    },
    vkPayEndpointSubmit: function() {
        ajax.post('/al_settings.php', {
            act: 'a_change_vk_pay_endpoint',
            hash: cur.options.vk_pay_endpoint_hash,
            vk_pay_endpoint: ge('settings_vk_pay_endpoint').checked ? 1 : 0
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind('cposts')
        });
    },

    microblogCheck: function(id) {
        if (hasClass(ge('settings_' + id), 'disabled') || ge('settings_' + id).disabled) return;

        clearTimeout(cur.microblogUpdateTO);
        cur.microblogUpdateTO = setTimeout(Settings.microblogSubmit, 200);
    },
    microblogSubmit: function() {
        var params = {
            act: 'a_change_microblog',
            hash: cur.options.microblog_hash
        };
        each(['status_default', 'no_wall_replies'], function(k, v) {
            var el = ge('settings_' + v);
            if (el) {
                params[v] = el.checked ? 1 : 0;
            }
        });
        ajax.post('/al_settings.php', params, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind('cposts')
        });
    },

    photoTagFriendsCheck: function() {
        clearTimeout(cur.photoAutoTagFriendsUpdateTO);
        cur.photoAutoTagFriendsUpdateTO = setTimeout(Settings.photoTagFriendsSubmit, 200);
    },
    photoTagFriendsSubmit: function() {
        ajax.post('/al_settings.php', {
            act: 'a_change_autotag_friends',
            hash: cur.options.autotag_friends_hash,
            autotag_friends: ge('settings_autotag_friends').checked ? 1 : 0
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind('cposts')
        });
    },

    OTPAuthEnable: function(confirm) {
        showBox('al_settings.php', {
            act: 'otp_auth_box',
            confirm: confirm,
            hash: cur.options.otp_hash
        }, {
            params: {
                dark: true
            }
        });
        return false;
    },
    OTPAuthAppSet: function(hash) {
        var params = {
            act: 'otp_auth_app_box'
        };
        if (hash) {
            curBox().hide();
            params.force = 1;
            params.hash = hash;
        } else {
            params.hash = cur.options.otp_hash;
        }
        showBox('al_settings.php', params);
        return false;
    },
    OTPAuthDisable: function(btn) {
        if (buttonLocked(btn)) {
            return false;
        }
        var params = {
            act: 'a_otp_auth_save',
            type: 'otp_auth',
            hash: cur.options.otp_hash
        };
        ajax.post('al_settings.php', params, {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    OTPAuthAppDisable: function() {
        if (Settings.otpAuthAppDisabling) return false;
        Settings.otpAuthAppDisabling = true;

        curBox().showProgress();
        var params = {
            act: 'a_otp_auth_save',
            type: 'otp_auth_by_app',
            hash: cur.options.otp_hash
        };
        ajax.post('al_settings.php', params, {
            onDone: function() {
                Settings.otpAuthAppDisabling = false;
                addClass('settings_otp_auth_app_set', 'settings_otp_app_disabled');
                val('settings_otp_auth_app_set_link', getLang('settings_otp_auth_by_app_enable'));
                curBox().hide();
            }
        });
    },
    OTPAuthShowReserveCodes: function(hash, forceNew) {
        showBox('al_settings.php', {
            act: 'otp_auth_reserve_codes_box',
            hash: hash,
            force_new: forceNew ? 1 : 0
        }, {
            params: {
                dark: true
            }
        });
        return false;
    },
    OTPAuthGetTrusted: function(force) {
        var el = ge('settings_otp_auth_trusted');
        if (!el || !isVisible(el)) return;
        if (force || geByTag1('img', el)) {
            var _frm = vk.loginscheme != location.protocol.substr(0, location.protocol.length - 1) ? 1 : 0;
            ajax.post(vk.loginscheme + '://' + location.host + '/al_login.php', {
                act: 'is_trusted_browser',
                _http: _frm
            }, {
                frame: _frm,
                onDone: function(msg) {
                    el.innerHTML = msg;
                }
            });
        }
    },
    OTPAuthClearTrusted: function(link, onlyCur, hash) {
        var box = false;
        var confirm = link.getAttribute('confirm');
        if (confirm) {
            confirm = confirm.split('<!!>');
            box = showFastBox({
                title: confirm[0],
                dark: 1,
                bodyStyle: 'padding: 20px;'
            }, confirm[1], (confirm.length > 2 ? confirm[2] : getLang('box_yes')), doClear);
        } else {
            doClear();
        }

        function doClear() {
            if (!onlyCur && cur.options.otp_reset_hash) {
                cur.onReLoginDoneCallback = function() {
                    ge('settings_reset_sessions_link').parentNode.innerHTML = '<div class="settings_labeled_notice">' + getLang('setting_all_sessions_reset') + '</div>';
                }
                Settings.reset_sessions = false;
                Settings.resetAllSessions(link, '<input name="otp_reset_hash" value="' + cur.options.otp_reset_hash + '" type="hidden" />', link.getAttribute('complete'), cur.options.logout_hash);
                if (box) box.hide();
                return;
            }

            var progress = ce('img', {
                src: '/images/upload' + (window.devicePixelRatio >= 2 ? '_2x' : '') + '.gif'
            }, {
                width: 32
            });
            var _frm = vk.loginscheme != location.protocol.substr(0, location.protocol.length - 1) ? 1 : 0;
            ajax.post(vk.loginscheme + '://' + location.host + '/al_login.php', {
                act: 'clear_trusted_browsers',
                only_cur: onlyCur,
                hash: hash,
                _http: _frm
            }, {
                frame: _frm,
                onDone: function(msg) {
                    if (box) box.hide();
                    link.parentNode.innerHTML = '<div class="settings_labeled_notice">' + link.getAttribute('complete') + '</div>';
                },
                showProgress: function() {
                    if (box) box.showProgress();
                    else link.parentNode.replaceChild(progress, link);
                },
                hideProgress: function() {
                    if (box) box.hideProgress();
                    else progress.parentNode.replaceChild(link, progress);
                }
            });
        }
    },
    OTPAppPasswords: function() {
        showBox('al_settings.php', {
            act: 'otp_auth_app_passwords_box'
        }, {
            params: {
                dark: true
            }
        });
        return false;
    },
    OTPCreateAppPassword: function(btn, hash) {
        if (isButtonLocked(btn)) {
            return;
        }
        var name = val('settings_app_password_name');
        if (!name.length) {
            notaBene('settings_app_password_name');
            return;
        }
        val('settings_app_passwords_error', '');
        ajax.post('al_settings.php', {
            act: 'a_otp_auth_create_app_password',
            name: name,
            hash: hash
        }, {
            onDone: function(title, html, table) {
                showFastBox({
                    title: title,
                    width: 450
                }, html);
                ge('settings_app_passwords_table_wrap').innerHTML = table;
                hide('settings_app_passwords_empty');
                val('settings_app_password_name', '');
            },
            onFail: function(msg) {
                if (msg) {
                    showMsg('settings_app_passwords_error', msg, 'error', true);
                }
                return true;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    OTPRemoveAppPassword: function(link, id, hash) {
        ajax.post('al_settings.php', {
            act: 'a_otp_auth_remove_app_password',
            id: id,
            hash: hash
        }, {
            onDone: function() {
                re('settings_app_password' + id);
                if (geByTag('tr', 'settings_app_passwords_table_wrap').length <= 1) {
                    ge('settings_app_passwords_table_wrap').innerHTML = '';
                    show('settings_app_passwords_empty');
                }
            },
            showProgress: function() {
                showProgress(link.parentNode);
                hide(link);
            },
            hideProgress: function() {
                hideProgress(link.parentNode);
                show(link);
            }
        });
        return false;
    },

    /**
     * ������ ������������ ������ PassChangeErrors.
     *
     * @param r
     * @param csid
     */
    passwordDone: function(r, csid) {
        re(cur.pwchFrame);
        unlockButton(cur.pwchDestroy);
        cur.pwchFrame = false;

        var err, inp = 'settings_new_pwd';
        switch (r) {
            case 1:
                err = 'settings_cant_set_this_password';
                break;
            case -2:
                err = 'settings_oldpwd_notcorr';
                inp = 'settings_old_pwd';
                break;
            case -3:
                err = 'settings_newpwd_not_good';
                inp = 'settings_new_pwd';
                break;
            case 2:
                hide('settings_error_pwd');
                val(geByClass1('settings_labeled_text', 'chgpass'), getLang('settings_pass_update_just_now'));
                val('settings_old_pwd', '');
                val('settings_new_pwd', '');
                val('settings_confirm_pwd', '');
                Settings.toggleBlock('chgpass');
                Settings.showMsg(getLang('settings_pass_success'));
                if (cur.pwchCaptchaBox) {
                    cur.pwchCaptchaBox.hide();
                    cur.pwchCaptchaBox = false;
                }
                return;
                break;
            case -1:
                cur.pwchCaptchaBox = showCaptchaBox(csid, 1, cur.pwchCaptchaBox, {
                    onSubmit: Settings.passwordSubmit.pbind(cur.pwchDestroy),
                    onDestroy: function() {}
                });
                return;
                break;
            default:
                err = 'settings_cant_change_password';
                break;
        }
        if (cur.pwchCaptchaBox) {
            cur.pwchCaptchaBox.hide();
            cur.pwchCaptchaBox = false;
        }
        Settings.showError(getLang(err), 'pwd');
        notaBene(inp);
    },
    passwordSubmit: function(btn, sid, key) {
        var oldPwd = val('settings_old_pwd'),
            newPwd = val('settings_new_pwd'),
            confPwd = val('settings_confirm_pwd'),
            tt = ge('settings_pwd_tt_place').tt;
        if (cur.pwchFrame) return;
        if (!oldPwd) {
            notaBene('settings_old_pwd');
            return;
        }
        if (!newPwd) {
            notaBene('settings_new_pwd');
            return;
        }
        if (!confPwd) {
            notaBene('settings_confirm_pwd');
            return;
        }
        if (tt) tt.hide({
            fasthide: true
        });
        if (newPwd.match(/\s/)) {
            Settings.showError(getLang('settings_pwd_bad'), 'pwd');
            notaBene('settings_new_pwd');
            if (tt) setTimeout(tt.show, 10);
            return;
        }
        if (newPwd.length < 6) {
            Settings.showError(getLang('settings_pwd_bad'), 'pwd');
            notaBene('settings_new_pwd');
            if (tt) setTimeout(tt.show, 10);
            return;
        }
        if (confPwd != newPwd) {
            Settings.showError(getLang('settings_newpwd_notcorr'), 'pwd');
            notaBene('settings_confirm_pwd');
            if (tt) setTimeout(tt.show, 10);
            return;
        }

        if (!cur.pwchDestroy) {
            cur.destroy.push(function(c) {
                re(c.pwchFrame);
            });
        }
        cur.pwchDestroy = btn;
        if (!curBox()) {
            lockButton(cur.pwchDestroy);
        }

        var params = {
            act: 'changepass',
            _origin: locProtocol + '//' + locHost,
            pass: oldPwd,
            new_pass: newPwd
        };
        if (sid && key) {
            params.captcha_sid = sid;
            params.captcha_key = key;
        }
        params.phash = cur.options.phash;
        cur.pwchDone = Settings.passwordDone;
        cur.pwchFrame = utilsNode.appendChild(ce('iframe', {
            src: vk.loginscheme + '://login.vk.com/?' + ajx2q(params)
        }));
    },

    mailSubmit: function(btn, resend) {
        var newMail;
        if (!resend) {
            newMail = trim(val('settings_new_mail'));
            if (!newMail) {
                notaBene('settings_new_mail');
                return;
            }
            lockButton(btn);
        } else {
            newMail = '';
            re(btn);
        }
        var params = {
            act: 'a_bind_mail',
            email: newMail,
            is_new: 1,
            hash: cur.options.mail_hash
        };
        ge('settings_new_mail').blur();
        hide('settings_error_mail');
        ajax.post('al_settings.php', params, {
            onDone: function(msg, html) {
                unlockButton(btn);
                if (html) {
                    var oldBl = ge('chgmail');
                    oldBl.parentNode.replaceChild(se(html), oldBl);
                }
                ge('settings_new_mail').value = '';
                showDoneBox(msg, {
                    out: 4000,
                    w: 400
                });
            },
            onFail: function(msg) {
                unlockButton(btn);

                if (!isUndefined(msg)) {
                    Settings.showError(msg, 'mail');
                }

                return true;
            }
        });
        return false;
    },

    phoneSubmit: function() {
        var params = {
            act: 'change_phone_box',
            hash: cur.options.phone_hash
        };
        showBox('activation.php', params);
    },

    regionalSubmit: function(btn) {
        var tz = (ge('timezone') || {}).value; //cur.uiTZ.val();
        var params = {
            act: 'a_change_regional',
            timeoffset: tz,
            hash: cur.options.regional_hash || cur.options.regional_hashes[tz]
        };
        lockButton(btn);
        ajax.post('al_settings.php', params, {
            onDone: function(msg) {
                unlockButton(btn);
                Settings.showMsg(msg);
            },
            onFail: function(msg) {
                unlockButton(btn);
                Settings.showError(msg);
                return true;
            }
        });
    },

    reset_sessions: false,
    resetAllSessions: function(not_history_box_lnk, addParams, doneMsg, logoutHash) {
        if (Settings.reset_sessions) return false;
        Settings.reset_sessions = true;

        var cont = bodyNode.appendChild(ce('div', {
            innerHTML: '\
<form action="' + vk.loginscheme + '://login.vk.com/" method="POST" target="reset_sessions_frame">\
  <input name="_origin" value="' + (locProtocol + '//' + locHost) + '" type="hidden" />\
  <input name="role" value="al_frame" type="hidden" />\
  <input name="ip_h" value="' + vk.ip_h + '" type="hidden" />\
  <input name="reset_hash" value="' + cur.options.reset_hash + '" type="hidden" />' + (addParams !== undefined ? addParams : '') + '\
</form><iframe class="upload_frame" name="reset_sessions_frame"></iframe>'
        }));
        var iform = cont.firstChild,
            iframe = iform.nextSibling,
            to = 0;
        var progress = ce('img', {
            src: '/images/upload' + (window.devicePixelRatio >= 2 ? '_2x' : '') + '.gif'
        }, {
            width: 32
        });
        window.onReLoginDone = function(data, reset_hash) {
            try {
                var href = iframe.contentWindow.location.href;
                if (href.match(/&hash=/)) {
                    if (!href.match(/&hash=[a-z0-9_]+/)) {
                        location.href = base_domain + 'login.php?op=logout&hash=' + logoutHash;
                        return false;
                    }
                }
                re(cont);
            } catch (e) {
                return;
            }
            cur.options.reset_hash = reset_hash;
            if (!not_history_box_lnk) {
                box = curBox();
                if (box) {
                    box.hideProgress();
                    box.setControlsText(getLang('setting_all_sessions_reset'));
                }
                j = 0;
                each(ge('activity_history').childNodes, function(i, el) {
                    if (el.nodeType == 1) {
                        if (j > 0 && !hasClass(el, 'settings_old_session')) {
                            addClass(el, 'settings_old_session');
                            re(geByClass1('settings_cur_session', el));
                        }
                        j++;
                    }
                });
            } else if (not_history_box_lnk !== true) {
                progress.parentNode.replaceChild(ce('div', {
                    className: 'settings_labeled_notice',
                    innerHTML: (doneMsg ? doneMsg : getLang('setting_all_sessions_reset'))
                }), progress);
            }
            if (isFunction(cur.onReLoginDoneCallback)) {
                cur.onReLoginDoneCallback();
            }
            Settings.reset_sessions = false;
        }
        /*
        if (browser.msie) {
          to = setInterval(function(){
            if (iframe.firstChild.nextSibling.document.readyState == 'complete') {
              onload();
            }
          }, 200);
        } else {
          iframe.onload = onload;
        }
        */
        if (!not_history_box_lnk) {
            curBox().showProgress();
        } else if (not_history_box_lnk !== true) {
            not_history_box_lnk.parentNode.replaceChild(progress, not_history_box_lnk);
        }
        iform.submit();
        return false;
    },
    resetSession: function(sessionId, resetData, hash) {
        var ajaxParams = {
            'reset_data': resetData,
            'hash': hash
        };
        var onDone = function(message) {
            var el = document.querySelector('.settings_history_row[data-id="' + sessionId + '"]');
            addClass(el, 'settings_old_session');

            re(document.querySelector('._settings_reset_session' + sessionId));
            showDoneBox(message);
        };

        var title = getLang('settings_activity_session_reset_box_title');
        var text = getLang('settings_activity_session_reset_box_text');
        var button = getLang('settings_activity_session_reset_box_button');
        var boxFn = function() {
            ajax.post('/settings?act=a_reset_session', ajaxParams, {
                onDone: onDone
            });
            curBox().hide();
        };

        showFastBox(title, text, button, boxFn, getLang('global_cancel'))
    },
    ipTTClick: function(el, e) {
        cancelEvent(e);

        var range = document.createRange();
        range.selectNodeContents(el);

        var selection = getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');

        selection.removeAllRanges();
    },
    showUserClientTT: function(el, i) {
        var text = '';
        if (hasClass(el.parentNode.parentNode, 'settings_old_session')) text = '<div style="font-weight:bold; margin-bottom:5px;">' + getLang('settings_session_terminated') + '</div>';
        if (cur.options.ua_tooltips[i]) {
            text += cur.options.ua_tooltips[i];
        }
        if (!text) return;
        showTooltip(el, {
            text: text,
            dir: 'auto',
            slide: 15,
            className: 'settings_user_client_tt',
            hasover: 1
        });
    },
    disabledPrivacy: function() {
        var el = geByClass1('settings_privacy_add_replies_view', ge('content'));
        if (el) showTooltip(el, {
            black: true,
            hasover: 1,
            className: 'settings_comments_disabled_tt',
            shift: [0, 5],
            text: getLang('settings_comments_disabled_tt').replace('{link}', '<a href="/settings?f=cposts" onclick="return nav.go(this, event, {nocur: true})">').replace('{/link}', '</a>')
        });
    },

    checkAddress: function(timeout) {
        cur.addrUnchecked = 0;
        clearTimeout(cur.addressCheckTO);
        if (cur.lastAddress == val('settings_addr')) return;
        cur.addressCheckTO = setTimeout(Settings.doCheckAddress, timeout || 0);
    },
    doCheckAddress: function() {
        var btnWEl = ge('settings_address_submit'),
            btnEl = btnWEl;

        cur.lastAddress = val('settings_addr');
        ajax.post('al_settings.php', {
            act: 'a_check_address',
            name: cur.lastAddress
        }, {
            onDone: function(msg) {
                cur.addrChecked = 1;
                disableButton(btnEl, false);
                btnEl.innerHTML = msg;
            },
            onFail: function(msg) {
                cur.addrChecked = -1;
                btnEl.innerHTML = msg;
                disableButton(btnEl, true);
                return true;
            },
            showProgress: function() {
                lockButton(btnEl);
                disableButton(btnEl, false);
            },
            hideProgress: function() {
                unlockButton(btnEl);
            }
        });
    },
    addressSubmit: function(btn) {
        if (cur.addrChecked != 1) {
            notaBene('settings_addr');
            return;
        }
        var params = {
            act: 'a_change_address',
            hash: cur.options.address_hash,
            name: val('settings_addr')
        };
        lockButton(btn);
        ajax.post('al_settings.php', params, {
            onDone: function(msg) {
                unlockButton(btn);
                Settings.showMsg(msg);
            },
            onFail: function(msg) {
                unlockButton(btn);
                if (msg) {
                    Settings.showError(msg, 'addr');
                }
                return true;
            }
        });
    },

    /* General options*/
    init: function() {
        cur.checkboxResultsTOs = {};
        cur.module = 'settings';
        if (cur.options.msg) {
            Settings.showMsg(cur.options.msg);
        }
        each({
            'settings_status_default': getLang('settings_status_default_about'),
            'settings_no_wall_replies': getLang('settings_no_wall_replies_about'),
            'settings_video_autoplay': getLang('settings_video_autoplay')
        }, function(el, text) {
            el = domQuery1('label[for="' + el + '"]');
            if (!el) return;
            el.onmouseover = function() {
                showTooltip(this, {
                    shift: [-20, 8, 8],
                    dir: 'auto',
                    text: text,
                    slide: 15,
                    className: 'settings_tt',
                    hasover: 1
                });
            };
        });

        var pwdTtEl = ge('settings_pwd_tt_place');
        each([ge('settings_new_pwd'), ge('settings_confirm_pwd')], function() {
            if (!this) return;
            this.onfocus = function() {
                showTooltip(pwdTtEl, {
                    text: getLang('settings_password_about'),
                    dir: 'left',
                    slideX: 15,
                    className: 'settings_pwd_tt',
                    shift: [-12, -15, 0],
                    onCreate: function() {
                        removeEvent(pwdTtEl, 'mouseout');
                    }
                });
            };
            this.onblur = function() {
                if (!pwdTtEl.tt || !pwdTtEl.tt.hide) return;
                pwdTtEl.tt.hide();
            }
        });

        /* Change address hint */
        var addrEl = ge('settings_addr');
        addrEl.onfocus = function() {
            showTooltip(addrEl, {
                text: getLang('settings_addr_intro'),
                dir: 'auto',
                slide: 15,
                className: 'settings_toup_tt',
                shift: [getSize('prefix_input_prefix')[0], 10],
                onCreate: function() {
                    removeEvent(addrEl, 'mouseout');
                    addrEl.onblur = function() {
                        addrEl.tt.hide();
                    }
                }
            });
        };
        cur.lastAddress = val(addrEl);

        /* Change email hint */
        var mailEl = ge('settings_new_mail');
        if (mailEl) mailEl.onfocus = function() {
            showTooltip(mailEl, {
                text: getLang('settings_email_about'),
                dir: 'auto',
                slide: 15,
                className: 'settings_toup_tt',
                shift: [0, 10],
                onCreate: function() {
                    removeEvent(mailEl, 'mouseout');
                    mailEl.onblur = function() {
                        mailEl.tt.hide();
                    }
                }
            });
        };

        extend(cur, {
            validationLastCallback: function(res) {
                if (curBox()) curBox().hide();
                if (res) {
                    Settings.phoneSubmit();
                } else {
                    elfocus('settings_new_phone');
                }
            }
        });

        Settings.initRepliesOrder();

        setTimeout(function() {
            if (nav.objLoc.f) {
                var blockEl = ge(nav.objLoc.f.split(',')[0]);
                if (blockEl && hasClass(blockEl, 'settings_line')) {
                    Settings.toggleBlock(domFC(blockEl));
                }
            }
        }, 100);

        cur.destroy.push(function() {
            window.onLoginDone = nav.reload;
        });
    },

    emailPosts: function(hash, obj) {

        ajax.post('al_settings.php', {
            act: 'send_email_post',
            hash: hash
        }, {
            onDone: function(text, label) {
                ge('settings_email_post_msg').innerHTML = text;
                setStyle(ge('settings_email_post_msg'), {
                    borderColor: '#D4BC4C',
                    backgroundColor: '#F9F6E7'
                });
                animate(ge('settings_email_post_msg'), {
                    borderColor: '#B9C4DA',
                    backgroundColor: '#FFFFFF'
                }, 3000);
                obj.innerHTML = label;
            },
            showProgress: function() {
                lockButton(obj);
            },
            hideProgress: function() {
                unlockButton(obj);
            }
        });
    },

    showPaymentsMethods: function(lnk, hash, isMoneyTransfer) {
        ajax.post('al_settings.php', {
            act: 'a_payments_methods',
            money_transfer: isMoneyTransfer ? 1 : 0,
            hash: hash
        }, {
            onDone: function(response) {
                if (isMoneyTransfer) {
                    cur.autoacceptCards = response.cards;
                    cur.autoacceptCardSelected = response.cardSeleceted;
                    Settings.initAutoAcceptDD(response.cards, response.cardSeleceted);
                    return;
                }
                var el = ce('div', {
                    innerHTML: response,
                    className: 'unshown'
                });
                lnk.parentNode.replaceChild(el, lnk);
                slideDown(el, 100);
            },
            stat: isMoneyTransfer ? ['ui_controls.js', 'ui_controls.css'] : []
        });
        return false;
    },
    initAutoAcceptDD: function(cards, cardSeleceted) {
        cur.autoacceptCardDD = new InlineDropdown('settings_p2p_receive_card', {
            items: cards,
            selected: cardSeleceted,
            withArrow: true,
            onSelect: function(v) {
                if (v == -1) {
                    Settings.bindMoneyTransferCard();
                } else if (v != cur.autoacceptCardSelected) {
                    hash = cur.autoacceptCardDD.getSelected()[2];
                    Settings.saveMoneyTransferCard(v, hash);
                    cur.autoacceptCardSelected = v;
                }
            }
        });
    },
    saveMoneyTransferCard: function(card, hash) {
        ajax.post('al_payments.php', {
            act: 'a_remember_money_transfer_accept_card',
            card_id: card,
            hash: hash,
            from: 'settings'
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind('settings_p2p_receive_card')
        });
    },
    bindMoneyTransferCard: function() {
        showBox('al_payments.php', {
            act: 'promo_box',
            type: 'card_bind'
        }, {
            stat: ['ui_controls.js', 'ui_controls.css']
        });
        return false;
    },
    deletePaymentMethod: function(lnk, type, hash, force) {
        if (!force) {
            cur.confirmBox = showFastBox({
                title: cur.lang['global_action_confirmation'],
                dark: 1,
                forceNoBtn: 1,
                bodyStyle: 'padding: 20px; line-height: 160%;'
            }, cur.lang['settings_delete_payment_method_confirm'], getLang('global_delete'), function() {
                Settings.deletePaymentMethod(lnk, type, hash, true);
            }, getLang('global_cancel'));
            return;
        }
        var row = lnk.parentNode;
        ajax.post('al_payments.php', {
            act: 'a_del_instant_method',
            type: type,
            hash: hash
        }, {
            onDone: function(msg) {
                row.innerHTML = msg;
            },
            onFail: function(msg) {
                row.innerHTML = msg;
                return true;
            },
            showProgress: function() {
                cur.confirmBox.showProgress();
            },
            hideProgress: function() {
                cur.confirmBox.hide();
            }
        });
        return false;
    },
    showNextPaymentsHistory: function(btn, section) {
        if (buttonLocked(btn)) return;
        lockButton(btn);
        if (!section) section = 'votes';
        if (cur.historyOffset[section] === undefined) {
            cur.historyOffset[section] = 5;
        }
        var offset = cur.historyOffset[section];
        var params, table;
        if (section === 'transfer') {
            params = {
                act: 'a_transfer_history',
                offset: offset
            };
            table = 'settings_transfer_history';
        } else if (section === 'subscriptions') {
            params = {
                act: 'a_payments_subsciptions',
                offset: offset
            };
            table = 'settings_payments_subscriptions';
        } else {
            params = {
                act: 'a_votes_history',
                offset: offset
            };
            table = 'settings_votes_history';
        }
        ajax.post('al_settings.php', params, {
            onDone: function(html, last) {
                var tbl = ge(table).tBodies[0];
                if (html) {
                    unlockButton(btn);
                    if (!cur.historyOffset[section]) {
                        tbl.innerHTML = '';
                        cur.historyOffset[section] = 5;
                    } else {
                        cur.historyOffset[section] += 100;
                    }
                    if (!browser.msie) {
                        tbl.insertAdjacentHTML('beforeEnd', html);
                    } else {
                        var t = se('<table>' + html + '</table>');
                        var rows = geByTag('tr', t);
                        for (i in rows) {
                            if (rows[i].nodeType == 1) tbl.appendChild(rows[i]);
                        }
                    }
                    //tbl.innerHTML += html;
                }
                if (!html || last) {
                    addClass(tbl.lastChild, 'settings_votes_history_last');
                    hide(btn);
                }
            }
        });
        return false;
    },
    switchPaymentsHistoryTab: function(el, section, ev) {
        if (checkEvent(ev)) {
            return true;
        }
        var loc = clone(nav.objLoc);
        uiTabs.switchTab(el);
        Settings.hideMoneyLinksTooltip();
        if (section === 'transfer') {
            hide('settings_votes_history_wrap', 'settings_payments_subscriptions_wrap');
            show('settings_transfer_history_wrap', 'settings_payments_transfer_msg');
            loc.section = section;
            Settings.showMoneyLinksTooltip();
        } else if (section === 'subscriptions') {
            hide('settings_votes_history_wrap', 'settings_transfer_history_wrap', 'settings_payments_transfer_msg');
            show('settings_payments_subscriptions_wrap');
            loc.section = section;
        } else {
            hide('settings_transfer_history_wrap', 'settings_payments_subscriptions_wrap', 'settings_payments_transfer_msg');
            show('settings_votes_history_wrap');
            delete loc.section;
        }
        nav.setLoc(loc);
        return false;
    },
    moneyTransferCancel: function(elem, txId, hash, decline, force) {
        var tr = domClosest('_row', elem),
            status = geByClass1('_status', tr),
            confirmText, confirmBtn;
        if (!force) {
            if (decline) {
                confirmText = getLang('settings_transfer_decline_confirm');
                confirmBtn = getLang('settings_transfer_decline_btn');
            } else {
                confirmText = getLang('settings_transfer_cancel_confirm');
                confirmBtn = getLang('settings_transfer_cancel_btn');
            }
            cur.confirmBox = showFastBox(getLang('global_action_confirmation'), confirmText, confirmBtn, Settings.moneyTransferCancel.pbind(elem, txId, hash, decline, 1), getLang('global_cancel'));
            return;
        }
        if (force !== 2) {
            addClass(tr, 'settings_history_row_progress');
            if (cur.confirmBox) cur.confirmBox.hide();
        }
        ajax.post('al_payments.php?act=a_cancel_money_transfer', {
            tx_id: txId,
            hash: hash
        }, {
            onDone: function(result, text) {
                if (result === 0) {
                    if (force !== 2) {
                        val(status, getLang('settings_transfer_status_cancelling'));
                        removeClass(status, 'settings_transfer_receive')
                    }
                    setTimeout(Settings.moneyTransferCancel.pbind(tr, txId, hash, decline, 2), 2000);
                    return;
                }
                removeClass(tr, 'settings_history_row_progress');
                val(status, getLang('settings_transfer_status_cancelled'));
                removeClass(status, 'settings_transfer_receive')
                addClass(status, 'settings_transfer_status_cancelled');
                TopNotifier.invalidate();
            },
            onFail: function(msg) {
                removeClass(tr, 'settings_history_row_progress');
                setTimeout(showFastBox(getLang('global_error'), msg).hide, 2000);
                return true;
            }
        });
    },
    moneyTransferRepeat: function(txId, hash) {
        showBox('al_payments.php?act=money_transfer_box', {
            repeat_id: txId,
            hash: hash
        });
        return false;
    },
    paymentsSubscriptionBox: function(aid, item, hash, elem) {
        if (elem) {
            var tr = domClosest('_row', elem);
            cur.onSubscriptionDone = function(data) {
                var field = geByClass1('settings_history_amount', tr);
                val(field, data.status);
                removeClass(field, 'settings_history_btn');
                val(geByClass1('settings_history_actions', tr), data.actions);
            }
        }

        showBox('al_apps.php?act=show_subscription_box', {
            aid: aid,
            item: item,
            action: 'create',
            hash: hash
        }, {
            onFail: function(msg) {
                setTimeout(showFastBox(getLang('global_error'), msg).hide, 2000);
                return true;
            }
        });
    },
    paymentsSubscriptionCancel: function(elem, aid, subscriptionId, hash, force) {
        var tr = domClosest('_row', elem);
        if (!force) {
            cur.confirmBox = showFastBox(getLang('global_action_confirmation'), getLang('settings_subscription_cancel_confirm'), getLang('settings_subscription_cancel_btn'), Settings.paymentsSubscriptionCancel.pbind(elem, aid, subscriptionId, hash, 1), getLang('global_cancel'));
            return;
        }
        addClass(tr, 'settings_history_row_progress');
        if (cur.confirmBox) cur.confirmBox.hide();
        ajax.post('al_apps.php?act=a_cancel_subscription', {
            aid: aid,
            subscription_id: subscriptionId,
            hash: hash,
            from: 'settings'
        }, {
            onDone: function(status, actions) {
                removeClass(tr, 'settings_history_row_progress');
                if (!status) {
                    addClass(tr, 'settings_history_row_deleted')
                    return;
                }
                val(geByClass1('settings_history_amount', tr), status);
                val(geByClass1('settings_history_actions', tr), actions);
            },
            onFail: function(msg) {
                removeClass(tr, 'settings_history_row_progress');
                setTimeout(showFastBox(getLang('global_error'), msg).hide, 2000);
                return true;
            }
        });
    },
    paymentsSubscriptionReactivate: function(elem, aid, subscriptionId, hash) {
        var tr = domClosest('_row', elem);
        cur.onSubscriptionDone = function(data) {
            val(geByClass1('settings_history_amount', tr), data.status);
            val(geByClass1('settings_history_actions', tr), data.actions);
        }

        showBox('al_apps.php?act=show_subscription_box', {
            aid: aid,
            subscription_id: subscriptionId,
            action: 'resume',
            hash: hash
        }, {
            onFail: function(msg) {
                setTimeout(showFastBox(getLang('global_error'), msg).hide, 2000);
                return true;
            }
        });
    },
    initAppOrdersDD: function(items, selected, hash) {
        cur.appOrdersDD = new InlineDropdown('settings_app_orders', {
            items: items,
            selected: selected,
            onShow: function() {
                if (!cur.appOrdersDD) return;
                var ttWidth = 250;
                showTooltip(cur.appOrdersDD._els.popupHeader, {
                    text: getLang('settings_payments_app_orders_tt'),
                    width: ttWidth,
                    slideX: -15,
                    className: 'pedit_tt',
                    nohide: true,
                    asrtl: true,
                    shift: [ttWidth + 13, -15, -15],
                    dir: 'left'
                });
            },
            onHide: function() {
                if (!cur.appOrdersDD) return;
                cur.appOrdersDD._els.popupHeader.tt && cur.appOrdersDD._els.popupHeader.tt.destroy();
            },
            onSelect: function(val) {
                Settings.toggleAppOrders(val && val !== '0', hash)
            }
        });
    },
    toggleAppOrders: function(val, hash) {
        ajax.post('al_payments.php?act=a_toggle_app_orders', {
            autoconfirm: val,
            hash: hash
        }, {
            onDone: window.uiPageBlock && uiPageBlock.showSaved.pbind('settings_app_orders')
        });
    },

    initApps: function(opts, appTpl) {
        extend(cur, {
            aSearch: ge('s_search'),
            lShowMoreButton: ge('ui_apps_load_more'),
            lContent: ge('settings_apps_list'),
            aEmptyCont: ge('settings_apps_empty'),
            aSummaryCounter: geByClass1('page_block_header_count', 'wide_column'),

            onSilentLoad: {},
            apps: {}, // indexed apps
            deletedApps: {},
            appTpl: appTpl || function() {
                return ''
            }
        });
        extend(cur, opts);
        cur.defaultCount = cur.shownApps;
        cur.appTpl = appTpl || function() {
            return ''
        };

        Settings.scrollNode = browser.msie6 ? pageNode : window;
        addEvent(Settings.scrollNode, 'scroll', Settings.scrollCheckApps.bind(this));
        setTimeout(function() {
            cur.destroy.push(function() {
                removeEvent(Settings.scrollNode, 'scroll', Settings.scrollCheckApps.bind(this));
            });
        }, 0);

        cur.silent = true;
        ajax.post('/al_settings.php', {
            act: 'load_apps_silent'
        }, {
            cache: 1,
            local: 1,
            onDone: function(data) {
                data = eval('(' + data + ')');
                if (!data) return cur.silent = false;
                if (cur.searchOffset === void(0)) cur.searchOffset = 0;
                cur.curList = 'all';
                cur.appsList = data[cur.curList] ? data : {
                    all: []
                };
                cur.appsCount = cur.appsList.all.length;

                this.indexApp(function() {
                    cur.silent = false;
                    if (cur.onSilentLoad)
                        for (var i in cur.onSilentLoad) isFunction(cur.onSilentLoad[i]) && cur.onSilentLoad[i]();
                });
            }.bind(this)
        });
    },
    isDelayedOnSilentLoad: function mem(key, handler) {
        if (!cur.silent) return;
        mem.count = mem.count || 0;
        mem.count++;
        cur.onSilentLoad[key || 'key_' + mem.count] = handler;
        return true;
    },
    indexApp: function(callback) {
        cur.appsIndex = new vkIndexer(cur.appsList['all'], function(obj) {
            try {
                cur.apps[parseInt(obj[0])] = obj;
                return obj[3];
            } catch (e) {
                return '';
            }
        }, callback);
    },
    scrollCheckApps: function() {
        if (this.isDelayedOnSilentLoad('scrollCheck', this.scrollCheckApps.bind(this))) return;
        if (!browser.mobile &&
            !cur.isAppsLoading &&
            !cur.disableAutoMore &&
            isVisible(cur.lShowMoreButton) &&
            (window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight) + scrollGetY() + 400 >= cur.lShowMoreButton.offsetTop
        ) this.showAppsRows();
    },
    showAppsRows: function() {
        if (this.isDelayedOnSilentLoad('showAppsRows', this.showAppsRows.bind(this))) return;
        if (cur.defaultCount && cur.shownApps < cur.appsCount) {
            var query = clean(cur.searchStr),
                html = '',
                list = cur.appsList[cur.curList] || [];
            var total = list.length;
            list = this.filterApps(list.slice(cur.shownApps)).slice(0, cur.defaultCount);
            if (list.length && cur.appTpl) {
                var apps = [];
                each(list, function(i, app) {
                    app = clone(app);

                    // highlight search query in app name
                    if (cur.selection) app[3] = app[3].replace(cur.selection.re, cur.selection.val);
                    apps.push(cur.appTpl(app, i == list.length - 1, false));
                }.bind(this));
                html = apps.join('');
            }
            if (!cur.shownApps) { // first request
                if (html) { // normal result
                    cur.lContent.innerHTML = html;
                    if (cur.aSummaryCounter) cur.aSummaryCounter.innerHTML = langNumeric(total, '%s', true);
                    show('settings_apps_noempty');
                    hide(cur.aEmptyCont);
                } else { // empty result
                    var msg = getLang('settings_apps_not_found_by_query').split('{query}').join('<b>' + query.replace(/([<>&#]*)/g, '') + '</b>');
                    cur.aEmptyCont.innerHTML = msg;
                    if (cur.aSummaryCounter) cur.aSummaryCounter.innerHTML = '';
                    show(cur.aEmptyCont);
                    hide('settings_apps_noempty');
                }
            } else if (html) { // futrher requests
                cur.lContent.appendChild(cf(html));
            }
            cur.shownApps += cur.defaultCount;
            if (cur.shownApps >= cur.appsCount) { // done
                hide(cur.lShowMoreButton);
            } else {
                show(cur.lShowMoreButton);
                this.scrollCheckApps();
            }
            cur.aSearch && uiSearch.hideProgress(cur.aSearch);
        }
    },
    filterApps: function(arr) {
        var len = arr.length,
            res = [];
        for (var i = 0; i < len; i++) {
            var t = arr[i];
            if (cur.apps && cur.apps[t[0]] && !cur.apps[t[0]].deleted) {
                res.push(t);
            }
        }
        return res;
    },
    searchApps: function(query) {
        if (this.isDelayedOnSilentLoad('searchApps', this.searchApps.bind(this, query))) return;

        if (query && query[query.length - 1] == ' ') {
            query[query.length - 1] = '_';
        }

        // add query minimum size
        if (query.length < 2) query = '';

        if (cur.ignoreEqual || cur.searchStr !== query) {
            cur.searchStr = query || '';

            if (query) {
                var res = cur.appsIndex.search(clean(query));
                cur.curList = 'all_search_' + query;
                cur.appsList[cur.curList] = res;
                query += ' ' + (parseLatin(query) || '');
                query = trim(escapeRE(query).split('&').join('&amp;'));
                cur.selection = {
                    re: new RegExp('(' + query.replace(cur.appsIndex.delimiter, '|') + ')', 'gi'),
                    val: '<em class="highlight">$1</em>'
                };
            } else {
                cur.curList = 'all';
                cur.selection = false;
            }

            // start preparing new content
            window.tooltips && tooltips.hideAll();
            cur.aSearch && uiSearch.showProgress(cur.aSearch);
            this.scrollToSearch();
            hide(cur.lShowMoreButton);
            cur.loadMore = 1;
            cur.shownApps = cur.searchOffset = 0;
            this.showAppsRows();
        }
        delete cur.ignoreEqual;
    },
    showAppSettings: function(aid) {
        window.tooltips && tooltips.hideAll();
        showBox('/al_apps.php', {
            act: 'settings_box_info',
            aid: aid,
            from: 'profile_settings'
        }, {
            stat: ['apps.css'],
            dark: 1
        });
    },
    removeApp: function(aid, hash, recent, event) {
        event && cancelEvent(event);
        if (this.removingApp) return false;
        if (this.isDelayedOnSilentLoad('removeApp' + aid, this.removeApp.bind(this, aid, hash, recent))) return false;
        window.tooltips && tooltips.hideAll();
        var wrap = ge('app' + aid),
            from = 'profile_settings',
            doRemoveApp = function() {
                ajax.post(
                    '/al_apps.php', {
                        act: 'quit',
                        id: aid,
                        hash: hash,
                        from: from
                    }, {
                        onDone: function(result) {
                            window.appsListChanged = true;
                            if (cur.apps[aid]) {
                                cur.appsIndex.remove(cur.apps[aid]);
                                cur.apps[aid].deleted = true;
                            }
                            cur.deletedApps[aid] = {
                                from: from,
                                html: wrap.innerHTML
                            };
                            wrap && wrap.appendChild(cf(result.html));
                            addClass(wrap, 'deleted');
                        }.bind(this),
                        showProgress: function() {
                            addClass(wrap, 'loading');
                            this.removingApp = true;
                        }.bind(this),
                        hideProgress: function() {
                            removeClass(wrap, 'loading');
                            this.removingApp = false;
                        }.bind(this)
                    });
            }.bind(this);

        doRemoveApp();
    },
    restoreApp: function(aid, hash) {
        if (this.restoringApp) return false;
        var wrap = ge('app' + aid);
        ajax.post('/al_apps.php', {
            act: 'join',
            id: aid,
            hash: hash,
            restore: 1,
            from: 'al_apps',
            section: 'settings'
        }, {
            onDone: function(result) {
                if (cur.deletedApps[aid]) {
                    wrap.innerHTML = cur.deletedApps[aid].html;
                    delete cur.deletedApps[aid];
                }
                if (cur.apps[aid]) {
                    delete cur.apps[aid].deleted;
                    cur.appsIndex.add(cur.apps[aid]);
                }
                removeClass(wrap, 'deleted');
            }.bind(this),
            showProgress: function() {
                this.restoringApp = true;
                addClass(wrap, 'loading');
            }.bind(this),
            hideProgress: function() {
                this.restoringApp = false;
                removeClass(wrap, 'loading');
            }.bind(this)
        });
        return false;
    },

    ttCommon: function(obj, text, center, event, shift) {
        event && cancelEvent(event);
        if (center) {
            return showTooltip(obj, {
                center: center,
                shift: shift || [0, 8, 8],
                black: 1,
                text: text
            });
        } else {
            return showTitle(obj, text, shift);
        }
    },
    scrollToSearch: function() {
        var pHeader = ge('page_header_cont'),
            searchWrap = ge('settings_search_wrap');
        if (searchWrap && pHeader) {
            var top = getXY(domPN(searchWrap))[1] - getSize(pHeader)[1];
            scrollNode.scrollTop > top && scrollToY(top, 200);
        }
    },

    deactivateBox: function() {
        showBox('al_settings.php', {
            act: 'deactivate_box'
        }, {
            params: {
                dark: true
            }
        });
        return false;
    },

    showValidateDevices: function(lnk, hash) {
        ajax.post('al_settings.php', {
            act: 'a_validate_devices',
            hash: hash
        }, {
            onDone: function(html) {
                tooltips.hideAll();
                var el = ce('div', {
                    innerHTML: html,
                    className: 'unshown'
                });
                lnk.parentNode.replaceChild(el, lnk);
                slideDown(el, 100);
            }
        });
        return false;
    },
    deleteValidateDevice: function(lnk, deviceHash, hash, force) {
        if (!force) {
            cur.confirmBox = showFastBox({
                title: cur.lang['global_action_confirmation'],
                dark: 1,
                forceNoBtn: 1,
                bodyStyle: 'padding: 20px; line-height: 160%;'
            }, cur.lang['settings_delete_validate_device_confirm'], getLang('global_delete'), function() {
                Settings.deleteValidateDevice(lnk, deviceHash, hash, true);
            }, getLang('global_cancel'));
            return;
        }
        var row = lnk.parentNode;
        ajax.post('al_settings.php', {
            act: 'a_del_validate_device',
            dhash: deviceHash,
            hash: hash
        }, {
            onDone: function(msg) {
                row.innerHTML = msg;
            },
            showProgress: function() {
                cur.confirmBox.showProgress();
            },
            hideProgress: function() {
                cur.confirmBox.hide();
            }
        });
        return false;
    },

    showNotifySubscriptions: function(el) {
        if (hasClass(el, 'settings_no_subscriptions')) return false;
        showBox('al_settings.php', {
            act: 'notify_subscriptions_box'
        }, {
            stat: ['indexer.js']
        });
        return false;
    },
    notifySubscriptionsInit: function(box, owners, options) {
        options.onListClick = Settings.notifySubscriptionToggle;

        cur.subsOList = new OList(box, owners, {}, options);
        box.removeButtons().addButton(getLang('global_close'), function() {
            box.hide(200);
        }, 'yes');
    },
    notifySubscriptionToggle: function(target, checked) {
        var id = target.id.match(/-?\d+/)[0],
            hash = false,
            count = 0,
            countNode = geByClass1('_subscriptions_count');

        each(cur.subsOList.owners, function(k, v) {
            if (!cur.subsOList.selected[v[0]]) count++;
            if (hash === false && this[0] == id) {
                hash = this[4];
            }
        });

        if (countNode) {
            toggleClass(countNode, 'settings_no_subscriptions', !count);
            val(countNode, count ? getLang('settings_notify_subscriptions_count', count) : getLang('settings_notify_no_subscriptions'));
        }

        ajax.post('/al_wall.php', {
            act: 'a_toggle_posts_subscription',
            subscribe: checked ? 1 : 0,
            oid: id,
            hash: hash
        }, {
            showProgress: addClass.pbind(target, 'olist_item_loading'),
            hideProgress: removeClass.pbind(target, 'olist_item_loading')
        });
    },
    showGroupNotifySources: function(e, source) {
        cancelEvent(e);
        showBox('al_settings.php', {
            act: 'group_notify_sources_box',
            source: source
        }, {
            params: {
                dark: 1,
                width: 450,
                bodyStyle: 'padding: 0',
                containerClass: 'group_notify_sources_box flist_list_radio'
            }
        });
        return false;
    },
    initShowGroupNotifySourcesBox: function(box, settings) {
        cur = cur || {};
        extend(cur, settings);
        box.removeButtons();
        box.addButton(settings.okBtnText, this.groupNotifyPopupSubmit.bind(this));
        extend(cur, {
            popupSubmitBtnEl: curBox().btns.ok[0],
            popupSelectedGroup: 0,
            popupGroupsWrapperEl: geByClass1('_add_community_app_groups'),
            popupContentEl: geByClass1('_add_community_app_content')
        });

        disableButton(cur.popupSubmitBtnEl, true);
        cur.popupGroupsEls = geByClass('flist_item', cur.popupGroupsWrapperEl, 'div');
        cur.popupGroupsEls.length === 1 && this.groupNotifyPopup(cur.popupGroupsEls[0]);
        each(cur.popupGroupsEls, function(k, v) {
            addEvent(v, 'click', this.groupNotifyPopup.bind(this, v));
        }.bind(this));
    },
    groupNotifyPopup: function(el) {
        var checkedClass = 'flist_item_checked',
            gid = intval(el.getAttribute('data-id')),
            link = trim(el.getAttribute('data-link'));
        cur.popupSelectedGroup = gid;
        each(cur.popupGroupsEls, function(k, v) {
            (v === el ? addClass : removeClass)(v.parentNode, checkedClass);
        });
        disableButton(cur.popupSubmitBtnEl, cur.popupSelectedGroup === 0);
    },
    groupNotifyPopupSubmit: function() {
        var gid = cur.popupSelectedGroup;
        if (isVisible(cur.popupSubmitBtnEl) && !buttonLocked(cur.popupSubmitBtnEl) && gid !== 0) {
            TopNotifier.addNewSource(gid, cur.popup_hash, 2);
        }
    },
    delGroupNotifySource: function(event, gid, hash, selected_gid) {
        cancelEvent(event);
        var delGroupNotifySourceConfirmBox = showFastBox(
            getLang('settings_group_notify_disable_title'),
            getLang('settings_group_notify_disable_text'),
            getLang('settings_group_notify_disable_yes'),
            function() {
                delGroupNotifySourceConfirmBox.hide();
                ajax.post('al_settings.php', {
                    act: 'a_group_notify_del_source',
                    gid: gid,
                    hash: hash,
                }, {
                    onDone: function(html) {
                        if (gid == selected_gid) {
                            TopNotifier && TopNotifier.changeSource('', null, null);
                            nav.go('/settings?act=notify');
                        } else {
                            nav.reload();
                        }
                    },
                    showProgress: lockButton.pbind(cur.popupSubmitBtnEl),
                    hideProgress: unlockButton.pbind(cur.popupSubmitBtnEl)
                });
            }, getLang('global_cancel'));
    },
    addSourcePopup: function(event) {
        hide(geByClass1('notify_sources'));
        TopNotifier && TopNotifier.hide();
        this.showGroupNotifySources(event, 'popup')
    },
    groupNotify_disabledSetting: function(elem) {
        showTitle(elem, getLang('settings_group_notify_disable_tooltip'), null, {
            shift: [-17, 14],
            className: 'settings_group_notifications_disable_tooltip',
            needLeft: 1,
        });
    },

    initRepliesOrder: function() {
        var repliesOrderSettingsEl = ge('settings_replies_order');

        if (!repliesOrderSettingsEl || !cur.options.replies_order_items) {
            return;
        }

        cur.repliesReorderDD = new InlineDropdown(repliesOrderSettingsEl, {
            items: cur.options.replies_order_items,
            selected: cur.options.replies_order_cur || cur.options.replies_order_items[0][0],
            onSelect: function(value) {
                ajax.post('al_settings.php', {
                    act: 'change_replies_order',
                    order: value,
                    hash: cur.options.replies_order_hash,
                }, {
                    onDone: function() {
                        window.uiPageBlock && window.uiPageBlock.showSaved('settings_replies_order');
                    },
                });
            }
        });

        if (cur.options.order_settings_feature_tooltip) {
            setTimeout(function() {
                if (cur.options && cur.options.order_settings_feature_tooltip_hash) {
                    Settings.showOrderSettingsTooltip(cur.options.order_settings_feature_tooltip_hash);
                }
            }, 800);
        }
    },

    showOrderSettingsTooltip: function(hash) {
        var orderSettings = ge('settings_replies_order');

        if (orderSettings) {
            cur.orderSettingsFeatureTT = new ElementTooltip(orderSettings, {
                content: '<div class="feature_tooltip__close" onclick="cur.orderSettingsFeatureTT.hide();"></div>' + getLang('wall_order_settings_feature_text'),
                forceSide: 'top',
                cls: 'feature_intro_tt feature_info_tooltip order_settings_feature_tooltip',
                autoShow: false,
                noHideOnClick: true,
                noAutoHideOnWindowClick: true,
                appendToParent: true,
                offset: [0, -4],
                onHide: function() {
                    ajax.post('al_index.php', {
                        act: 'hide_feature_tt',
                        hash: hash,
                        type: 'order_settings_web',
                    });
                    cur.orderSettingsFeatureTT.destroy();
                    delete cur.orderSettingsFeatureTT;
                },
            });

            cur.orderSettingsFeatureTT.show();
        }
    },

    showMoneyLinksTooltip: function() {
        var btn = geByClass1('_money_request_btn', 'wide_column');
        if (!cur.moneylinks_feature_tooltip || !btn) {
            return;
        }

        setTimeout(function() {
            cur.moneyLinksTooltip = new ElementTooltip(btn, {
                content: '<div class="feature_tooltip__close" onclick="cur.moneyLinksTooltip.hide();"></div>' + getLang('settings_payments_moneylinks_feature_text'),
                cls: 'feature_intro_tt feature_info_tooltip moneylinks_feature_tooltip',
                forceSide: 'top',
                width: 270,
                autoShow: false,
                noHideOnClick: true,
                noAutoHideOnWindowClick: true,
                appendToParent: true,
                offset: [0, -4],
                onHide: function() {
                    ajax.post('al_index.php', {
                        act: 'hide_feature_tt',
                        hash: cur.moneylinks_feature_tooltip_hash,
                        type: 'moneylinks'
                    });
                    Settings.hideMoneyLinksTooltip();
                }
            });
            cur.moneyLinksTooltip.show();
            cur.destroy.push(Settings.hideMoneyLinksTooltip);
        }, 1000);
    },
    hideMoneyLinksTooltip: function() {
        if (cur.moneyLinksTooltip) {
            cur.moneyLinksTooltip.destroy();
            delete cur.moneyLinksTooltip;
        }
    }
};

try {
    stManager.done('settings.js');
} catch (e) {}